import { ref as W, inject as Et, provide as Vn, computed as v, toValue as Nt, shallowRef as Pt, watch as be, onScopeDispose as Wn, defineComponent as oe, onMounted as is, onBeforeUnmount as De, resolveComponent as cs, openBlock as f, createElementBlock as h, normalizeStyle as Me, Fragment as ne, renderList as he, toDisplayString as I, createCommentVNode as R, createElementVNode as $, createBlock as J, nextTick as Vt, useId as Hn, unref as T, normalizeClass as At, Teleport as Il, createVNode as fe, getCurrentScope as us, withDirectives as vn, withKeys as Ye, withModifiers as ze, vModelText as hn, renderSlot as $e, useSlots as Ut, createTextVNode as We, withCtx as Qe, reactive as za, resolveDynamicComponent as Un, createSlots as on, useModel as Ot, mergeModels as mn, Comment as Ol, Text as Dl, h as Bl } from "vue";
const ds = Symbol("dc.routeAdapter");
function tt(e) {
  if (!e) return "";
  const t = e.replace(/^[?]/, "");
  return t ? `?${t}` : "";
}
function ql() {
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
const fs = ["list", "cards", "grid", "images", "table", "links", "preview"], uf = [
  "minimal",
  "mono-size",
  "dark",
  "light",
  "auto",
  "macos",
  "windows",
  "inherit"
], an = ["ok", "running", "queued", "review", "failed"], df = [
  "identity",
  "reference",
  "metric",
  "state",
  "updated",
  "image",
  "tint"
], ff = [480, 620, 760, 900, 1100], Kl = "cards", zn = "updated";
function ps(e) {
  return typeof e == "string" && fs.includes(e);
}
const Vl = {
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
const Wl = { key: zn, label: zn };
function rt(e, t, n = null) {
  const a = ms(e, n);
  return (t ? a.find((l) => l.key === t) : void 0) ?? a.find((l) => l.key === zn) ?? a[0] ?? Wl;
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
function pf(e) {
  return e.entity !== null;
}
function Yn(e) {
  return e.entity === null && e.view === "cards";
}
function Hl(e, t) {
  return t <= 0 ? 1 : Math.max(1, Math.ceil(e / t));
}
function Qn(e, t = {}) {
  const a = t.landing === "entity" ? vs(e, t) : null;
  return {
    entity: a?.key ?? null,
    view: t.view && ps(t.view) ? t.view : Kl,
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
function Ul(e) {
  if (!Number.isFinite(e)) return "—";
  const t = Math.abs(e);
  return t >= 1e6 ? `${(e / 1e6).toFixed(1)}m` : t >= 1e3 ? `${(e / 1e3).toFixed(1)}k` : String(Math.round(e));
}
function wt(e) {
  return Number.isFinite(e) ? Math.round(e).toLocaleString("en-US") : "—";
}
function jl(e) {
  const t = new Date(e);
  if (Number.isNaN(t.getTime())) return "—";
  const n = String(t.getUTCDate()).padStart(2, "0"), a = String(t.getUTCMonth() + 1).padStart(2, "0");
  return `${n}.${a}.${t.getUTCFullYear()}`;
}
function Gl(e) {
  return String(e + 1).padStart(2, "0");
}
const Rn = "—";
function Ve(e, t) {
  return e.find((n) => n.role === t);
}
function ks(e, t) {
  return e.filter((n) => n.role === t);
}
function Xl(e, t) {
  const n = (t ? t.columns : e?.columns) ?? [], a = t ? "scoped" : "everything";
  return n.filter(
    (s) => s.role !== "tint" && ((s.when ?? "always") === "always" || s.when === a)
  );
}
const Yl = ["id", "entityKey", "entityLabel"];
function Oe(e, t) {
  if (e.value) return e.value(t);
  const n = e.field ?? e.key;
  if (n !== void 0) {
    if (t.fields && n in t.fields) return t.fields[n];
    if (Yl.includes(n))
      return t[n];
  }
}
function Fa(e, t) {
  const n = e.key ?? e.field ?? e.label;
  return n?.trim() ? n.trim() : `column-${t}`;
}
function Ql(e, t) {
  return e.id?.trim() ? e.id : `${e.entityKey || "row"}-${t}`;
}
function Zl(e, t) {
  if (e == null || e === "") return Rn;
  if (t === "number") {
    const n = typeof e == "number" ? e : Number(e);
    return Number.isFinite(n) ? Ul(n) : String(e);
  }
  return t === "date" ? jl(String(e)) : Array.isArray(e) ? e.length ? e.join(", ") : Rn : String(e);
}
function jt(e, t) {
  const n = Oe(e, t);
  return e.format ? e.format(n, t) : Zl(n, e.kind);
}
function Jl(e) {
  return typeof e == "number" ? Number.isFinite(e) ? String(e) : "" : typeof e == "string" ? e : Array.isArray(e) ? e.join(", ") : "";
}
function bs(e, t) {
  const n = jt(e, t), a = Jl(Oe(e, t));
  return a && a !== n ? a : n;
}
function un(e, t) {
  return e ? jt(e, t) : "";
}
function Na(e) {
  return e.align ? e.align : e.kind === "number" || e.kind === "ordinal" ? "right" : "left";
}
const er = {
  ordinal: "dc-table__num",
  number: "dc-table__number",
  date: "dc-table__date",
  status: "dc-table__state"
};
function Ia(e) {
  return [er[e.kind ?? "text"], e.class].filter(Boolean).join(" ");
}
function Fn(e) {
  if (e.truncate !== void 0) return e.truncate;
  const t = e.kind ?? "text";
  return t === "text" || t === "number" || t === "date";
}
const tr = /^([A-Za-z_][\w.-]*)\s*(>=|<=|:|=|>|<)\s*(.*)$/;
function nr(e) {
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
  for (const s of nr(t)) {
    const l = s.toUpperCase();
    if (l === "AND" || l === "&&") continue;
    if (l === "OR" || l === "||") {
      a.length && n.push(a), a = [];
      continue;
    }
    const o = s.length > 1 && s.startsWith("-"), r = o ? s.slice(1) : s, i = o ? { negated: !0 } : {}, c = tr.exec(r);
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
function ar(e, t, n) {
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
function sr(e, t) {
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
  if (!(!e || sr(e, t)))
    return (t.columns ?? []).find(
      (n) => n.label !== void 0 && xs(n.label) === e
    );
}
function lr(e, t) {
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
function rr(e, t, n) {
  if (e.kind === "text") {
    const o = n.columns ?? [];
    return ["identity", "reference"].some((r) => {
      const i = Ve(o, r), c = i ? Oe(i, t) : void 0;
      return typeof c == "string" && En(c, e.value);
    });
  }
  const a = ar(e.field, t, n);
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
  return !Number.isFinite(s) || !Number.isFinite(l) ? null : or(e.comparator, l, s);
}
function Ba(e, t, n) {
  const a = rr(e, t, n);
  return a === null ? !0 : e.negated ? !a : a;
}
function or(e, t, n) {
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
function ir(e, t, n) {
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
function vf(e) {
  if (!e.negated) return { ...e, negated: !0 };
  const { negated: t, ...n } = e;
  return n;
}
function ot(e) {
  return e.filter((t) => t.length).map((t) => t.map(Gt).join(" ")).join(" OR ");
}
function cr(e, t, n) {
  return e.map((a, s) => s === t ? a.filter((l, o) => o !== n) : a).filter((a) => a.length);
}
function ur(e) {
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
function dr(e, t) {
  return t.filter((n) => !e.some((a) => wn(a, n)));
}
function Zn(e, t) {
  return Ps(e, t, (n) => n);
}
function fr(e, t) {
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
      (l) => s.map((o) => [...n(l, o), ...dr(l, o)])
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
const pr = 7, vr = 3;
function hr(e, t, n, a) {
  const s = (t * pr + cn(n)) % a, l = [];
  for (let o = 0; o < Math.min(vr, a); o++)
    l.push(As(e, (s + o) % a));
  return l;
}
function mr(e, t) {
  switch (e.kind) {
    case "chips":
      return e.multiple ? gr(e.options, t) : e.options[t % e.options.length] ?? "";
    case "range": {
      const n = Math.max(0, e.max - e.min);
      return e.min + (n === 0 ? 0 : t % (n + 1));
    }
    case "toggle":
      return t % 3 === 0;
  }
}
function gr(e, t) {
  if (!e.length) return [];
  const n = 1 + (t >> 5) % Math.min(3, e.length), a = t % e.length, s = /* @__PURE__ */ new Set();
  for (let l = 0; l < n; l++) s.add((a + l) % e.length);
  return [...s].sort((l, o) => l - o).map((l) => e[l]);
}
function _r(e, t) {
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
function yr(e, t = {}) {
  const n = t.population ?? 48, a = t.seed ?? "", s = t.now ?? /* @__PURE__ */ new Date("2026-08-25T00:00:00Z"), l = e.samples, o = t.scopes ?? [];
  if (!l.length) return [];
  const r = [];
  for (let i = 0; i < n; i++) {
    const c = l[i % l.length], d = Math.floor(i / l.length), m = cn(`${a}:${e.key}:${c[0]}:${i}`), y = As(e.key, i), k = new Date(s.getTime() - m % 900 * 36e5).toISOString(), x = {};
    for (const b of e.columns ?? []) {
      const _ = b.field ?? b.key;
      if (!_ || b.value) continue;
      const C = _r(b, {
        hash: cn(`${m}:${_}`),
        sample: c,
        revision: d,
        updatedAt: k
      });
      C !== void 0 && (x[_] = C);
    }
    for (const b of e.facets)
      x[b.key] = mr(b, cn(`${m}:${b.key}`));
    for (const [b, _] of o)
      x[b] = _ === e.key ? y : hr(_, i, b, n);
    r.push({ id: y, entityKey: e.key, entityLabel: e.label, fields: x });
  }
  return r;
}
function wr(e, t) {
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
function kr(e, t) {
  const n = e.find((o) => o.sort === t);
  if (!n) return () => 0;
  const a = n.kind ?? "text", s = a === "number" || n.role === "metric", l = a === "date" || n.role === "updated";
  return (o, r) => {
    const i = Oe(n, o), c = Oe(n, r);
    return s ? Number(c ?? 0) - Number(i ?? 0) : l ? Date.parse(String(c ?? "")) - Date.parse(String(i ?? "")) : String(c ?? "").localeCompare(String(i ?? ""));
  };
}
function br(e = {}) {
  const t = /* @__PURE__ */ new Map(), n = (a, s) => {
    const l = t.get(a.key);
    if (l) return l;
    const o = e.scopes ?? s.entities.flatMap(
      (i) => i.scope ? [[i.scope, i.key]] : []
    ), r = yr(a, { ...e, scopes: o });
    return t.set(a.key, r), r;
  };
  return {
    query({ query: a, schema: s, entity: l, limit: o, offset: r }) {
      const i = Re(a.expr), c = l ? [l] : s.entities, d = [], m = [];
      for (const x of c)
        for (const b of n(x, s))
          d.push(b), (l ? wr(b, a.facets) : !0) && ir(i, b, x) && m.push(b);
      const y = rt(l, a.sort, s), k = m.sort(kr(hs(l, s), y.key));
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
function $r(e, t, n, a = {}) {
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
function xr(e) {
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
const na = "e", aa = "v", sa = "s", la = "d", ra = "q", oa = "p", ia = "f_", Os = "*", Cr = [
  na,
  aa,
  sa,
  la,
  ra,
  oa
], Nn = "..", Ds = ",", Sr = [
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
  for (const [n, a] of Sr) t = t.replace(n, a);
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
function Mr(e) {
  return Cr.includes(e) || e.startsWith(ia);
}
function ja(e, t, n) {
  return Math.min(n, Math.max(t, e));
}
function Er(e, t) {
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
function Pr(e, t) {
  switch (e.kind) {
    case "chips":
      return e.selected.length ? (t.kind === "chips" ? t.options.filter((a) => e.selected.includes(a)) : e.selected).join(Ds) : null;
    case "range":
      return e.min === null && e.max === null ? null : `${e.min ?? ""}${Nn}${e.max ?? ""}`;
    case "toggle":
      return e.on ? "1" : null;
  }
}
function Ar(e, t, n = {}) {
  const a = Qn(t, n), s = new Map(Bs(e)), l = s.get(na), o = l === void 0 ? a.entity : et(l), r = o === Os ? null : bt(t, o), i = s.get(aa), c = i && ps(et(i)) ? et(i) : a.view, d = s.get(sa), m = rt(r, d ? et(d) : n.sort, t), y = s.get(la), k = y ? et(y) === "asc" ? "asc" : "desc" : a.dir, x = s.get(ra), b = s.get(oa), _ = b === void 0 ? 1 : Number(et(b)), C = Number.isFinite(_) ? Math.max(1, Math.floor(_)) : 1, z = {};
  for (const D of r?.facets ?? []) {
    const S = s.get(`${ia}${D.key}`);
    z[D.key] = S === void 0 ? Gn(D) : Er(D, S);
  }
  return {
    entity: r?.key ?? null,
    view: c,
    sort: m.key,
    dir: k,
    expr: x === void 0 ? "" : et(x),
    facets: ws(r, z),
    page: C
  };
}
function Ga(e, t, n = {}, a = "") {
  const s = Qn(t, n), l = bt(t, e.entity), o = Bs(a).filter(([m]) => !Mr(m)), r = [], i = (m, y) => r.push([m, Pn(y)]), c = l?.key ?? null;
  c !== s.entity && i(na, c ?? Os), e.view !== s.view && i(aa, e.view), e.sort !== s.sort && i(sa, e.sort), e.dir !== s.dir && i(la, e.dir), e.expr.trim() !== "" && i(ra, e.expr);
  for (const m of l?.facets ?? []) {
    const y = e.facets[m.key];
    if (!y) continue;
    const k = Pr(y, m);
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
function Tr(e, t) {
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
    s && gs(s) && n.push(...Tr(a, s));
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
function Lr(e, t, n = null) {
  if (Xn(e)) {
    const l = rt(t, e.sort, n);
    return `everything · ${e.view} · ${l.label}`;
  }
  const a = ca(e, t).filter((l) => l.facetKey !== Ht).map((l) => l.label), s = e.expr.trim();
  return s && a.push(`"${s}"`), a.join(" · ");
}
function zr(e) {
  const { adapter: t } = e, n = v(() => Nt(e.schema)), a = v(() => Nt(e.defaults) ?? {}), s = v(() => Ar(t.search.value, n.value, a.value)), l = v(() => bt(n.value, s.value.entity)), o = v(() => l.value ?? vs(n.value, a.value)), r = v(() => ms(l.value, n.value)), i = v(() => rt(l.value, s.value.sort, n.value)), c = (_, C) => {
    const z = Ga(_, n.value, a.value, t.search.value);
    z !== t.search.value && (C === "push" ? t.push(z) : t.replace(z));
  }, d = () => Nt(e.navigationMode) ?? "push", m = () => Nt(e.facetNavigationMode) ?? "replace", y = (_, C) => {
    const z = _.page ?? (Ra(_) ? 1 : s.value.page);
    c({ ...s.value, ..._, page: z }, C);
  }, k = (_, C) => {
    const z = s.value.facets[_];
    if (!z) return;
    const D = { ...s.value.facets, [_]: C(z) };
    y({ facets: D }, m());
  }, x = (_) => {
    const C = _ === null ? null : bt(n.value, _);
    return (C?.key ?? null) === s.value.entity ? {} : {
      entity: C?.key ?? null,
      sort: rt(C, s.value.sort, n.value).key,
      facets: Tt(C)
    };
  }, b = (_) => {
    const C = x(_);
    Object.keys(C).length && y(C, d());
  };
  return {
    query: s,
    entity: l,
    focus: o,
    sort: i,
    sorts: r,
    summary: v(() => Lr(s.value, l.value, n.value)),
    terms: v(() => ca(s.value, l.value)),
    isPristine: v(() => Xn(s.value)),
    isEverything: v(() => s.value.entity === null),
    hasFacets: v(() => _s(s.value.facets)),
    setEntity: b,
    clearEntity: () => b(null),
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
    narrow(_, C, z) {
      y({ expr: _, ...x(C), ...z ? { view: z } : {} }, d());
    },
    setPage(_, C) {
      y({ page: Math.max(1, Math.floor(_)) }, C ?? d());
    },
    setFacet(_, C) {
      k(_, () => C);
    },
    toggleChip(_, C) {
      k(_, (z) => z.kind !== "chips" ? z : { kind: "chips", selected: z.selected.includes(C) ? z.selected.filter((S) => S !== C) : [...z.selected, C] });
    },
    setRange(_, C, z) {
      k(_, (D) => D.kind === "range" ? { kind: "range", min: C, max: z } : D);
    },
    toggleFlag(_) {
      k(
        _,
        (C) => C.kind === "toggle" ? { kind: "toggle", on: !C.on } : C
      );
    },
    removeTerm(_) {
      if (_.facetKey === gn) {
        b(null);
        return;
      }
      if (_.facetKey === Ht) {
        const C = cr(Re(s.value.expr), _.group ?? 0, _.index ?? 0);
        y({ expr: ot(C) }, d());
        return;
      }
      k(_.facetKey, (C) => C.kind === "chips" && _.option ? { kind: "chips", selected: C.selected.filter((z) => z !== _.option) } : C.kind === "range" ? { kind: "range", min: null, max: null } : C.kind === "toggle" ? { kind: "toggle", on: !1 } : C);
    },
    clearFilters() {
      y({ entity: null, expr: "", facets: Tt(null) }, d());
    },
    reset() {
      c(Qn(n.value, a.value), d());
    },
    hrefFor(_) {
      const C = { ...s.value, ..._ };
      return C.page = _.page ?? (Ra(_) ? 1 : s.value.page), C.facets = ws(bt(n.value, C.entity), C.facets), `${t.path.value}${Ga(C, n.value, a.value, t.search.value)}`;
    }
  };
}
function Rr(e) {
  const t = Pt([]), n = W(0), a = W(!1), s = W(!1), l = Pt(null);
  let o = 0, r = null, i = null;
  const c = v(() => (e.query.value.page - 1) * e.limit.value), d = v(() => Hl(n.value, e.limit.value)), m = () => {
    const S = e.query.value, P = e.within?.value.trim(), K = Fs(e.entity.value, S.expr);
    return P ? { ...S, expr: Zn(P, K) } : K === S.expr ? S : { ...S, expr: K };
  }, y = (S, P) => {
    t.value = S.rows, n.value = S.total, l.value = null, k(P);
  }, k = (S) => {
    r = { key: S, total: n.value }, s.value = !1;
  }, x = (S) => {
    l.value = S, t.value = [], n.value = 0, r = null, s.value = !1;
  }, b = (S, P, K, A) => {
    let w = !0;
    const V = () => S === o;
    let F = 0, Y = !1;
    const G = (ie) => {
      F = ie, Y = !0, A === void 0 && (n.value = ie);
    }, ge = () => {
      w && (w = !1, t.value = [], G(0)), l.value = null;
    };
    return {
      get open() {
        return V();
      },
      insert(ie, M) {
        if (!V()) return;
        const O = Array.isArray(ie) ? ie : [ie];
        if (!O.length) return;
        ge();
        const j = [...t.value];
        j.splice(M ?? j.length, 0, ...O), t.value = P > 0 ? j.slice(0, P) : j, G(F + O.length);
      },
      set(ie) {
        V() && (ie.rows && (ge(), t.value = P > 0 ? ie.rows.slice(0, P) : ie.rows, G(ie.rows.length)), ie.total !== void 0 && G(ie.total));
      },
      close() {
        V() && (a.value = !1, Y && (n.value = F), k(K));
      },
      fail(ie) {
        V() && (x(ie), a.value = !1);
      }
    };
  }, _ = () => {
    const S = i;
    i = null, S?.();
  }, C = () => {
    const S = ++o;
    _();
    const P = z.value, K = r?.key === P ? r.total : void 0;
    s.value = K === void 0;
    const A = {
      query: m(),
      schema: e.schema.value,
      entity: e.entity.value,
      limit: e.limit.value,
      offset: c.value
    }, w = e.source.value;
    if (w.stream) {
      a.value = !0;
      try {
        i = w.stream(A, b(S, A.limit, P, K)) ?? null;
      } catch (F) {
        x(F), a.value = !1;
      }
      return;
    }
    let V;
    try {
      V = w.query(A);
    } catch (F) {
      x(F);
      return;
    }
    if (!(V instanceof Promise)) {
      y(V, P), a.value = !1;
      return;
    }
    a.value = !0, V.then((F) => {
      S === o && y(F, P);
    }).catch((F) => {
      S === o && x(F);
    }).finally(() => {
      S === o && (a.value = !1);
    });
  }, z = v(() => {
    const S = m();
    return `${e.entity.value?.key ?? e.schema.value.entities[0]?.key ?? ""}|${JSON.stringify(ys.map((K) => S[K]))}`;
  }), D = v(() => `${z.value}|${e.query.value.page}`);
  return be([e.source, D, e.limit], C, {
    immediate: !0
  }), Wn(() => {
    o++, _();
  }, !0), { rows: t, total: n, offset: c, pageCount: d, pending: a, counting: s, error: l, refresh: C };
}
const Dt = (e) => e.separator !== !0 && e.heading !== !0 && e.disabled !== !0, Fr = ["aria-label"], Nr = ["role", "aria-label"], Ir = ["data-dc-item"], Or = {
  key: 0,
  class: "dc-menu__rule",
  role: "separator"
}, Dr = ["role", "aria-checked", "aria-haspopup", "aria-expanded", "aria-disabled", "disabled", "data-dc-item", "onClick", "onMouseenter"], Br = {
  class: "dc-menu__mark",
  "aria-hidden": "true"
}, qr = { class: "dc-menu__label dc-truncate" }, Kr = {
  key: 0,
  class: "dc-menu__key dc-mono"
}, Vr = {
  key: 1,
  class: "dc-menu__more",
  "aria-hidden": "true"
}, Wr = /* @__PURE__ */ oe({
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
      () => a.items.flatMap((A, w) => Dt(A) ? [w] : [])
    ), y = v(() => {
      const A = [{ entries: [] }];
      return a.items.forEach((w, V) => {
        w.heading ? A.push({ heading: w, entries: [] }) : A[A.length - 1]?.entries.push({ item: w, index: V });
      }), A.filter((w) => w.entries.length > 0);
    }), k = W({ x: a.at.x, y: a.at.y });
    async function x() {
      k.value = { x: a.at.x, y: a.at.y }, await Vt();
      const A = l.value?.getBoundingClientRect();
      if (!A) return;
      const w = 8;
      let V = a.at.x, F = a.at.y;
      if (V + A.width > window.innerWidth - w) {
        const Y = a.at.mirrorX === void 0 ? null : a.at.mirrorX - A.width;
        V = Y !== null && Y >= w ? Y : window.innerWidth - A.width - w;
      }
      F + A.height > window.innerHeight - w && (F = window.innerHeight - A.height - w), k.value = { x: Math.max(w, V), y: Math.max(w, F) };
    }
    const b = v(() => ({ left: `${k.value.x}px`, top: `${k.value.y}px` }));
    function _(A) {
      r.value = A, A !== null && Vt(() => o.value[A]?.focus());
    }
    function C(A, w) {
      const V = m.value;
      if (V.length === 0) return null;
      if (A === null) return w === 1 ? V[0] ?? null : V[V.length - 1] ?? null;
      const F = V.indexOf(A);
      return F === -1 ? V[0] ?? null : V[(F + w + V.length) % V.length] ?? null;
    }
    function z(A, w) {
      if (!a.items[A]?.items?.length) return;
      const F = o.value[A]?.getBoundingClientRect(), Y = l.value?.getBoundingClientRect();
      !F || !Y || (c.value = { x: Y.right - 4, y: F.top - 4, mirrorX: Y.left + 4 }, i.value = A, d.value = w);
    }
    function D(A) {
      const w = i.value;
      i.value = null, c.value = null, A && w !== null && _(w);
    }
    function S(A) {
      const w = a.items[A];
      if (!(!w || !Dt(w))) {
        if (w.items?.length) {
          z(A, !0);
          return;
        }
        s("choose", w);
      }
    }
    function P(A) {
      const w = A.key;
      if (w === "Escape") {
        A.preventDefault(), A.stopPropagation(), i.value !== null ? D(!0) : s("dismiss");
        return;
      }
      if (w === "ArrowDown" || w === "ArrowUp") {
        A.preventDefault(), A.stopPropagation(), D(!1), _(C(r.value, w === "ArrowDown" ? 1 : -1));
        return;
      }
      if (w === "Home" || w === "End") {
        A.preventDefault(), A.stopPropagation(), D(!1), _(C(null, w === "Home" ? 1 : -1));
        return;
      }
      if (w === "ArrowRight") {
        const V = r.value;
        V !== null && a.items[V]?.items?.length && (A.preventDefault(), A.stopPropagation(), z(V, !0));
        return;
      }
      if (w === "ArrowLeft") {
        i.value !== null && (A.preventDefault(), A.stopPropagation(), D(!0));
        return;
      }
      if (w === "Enter" || w === " ") {
        const V = r.value;
        if (V === null) return;
        A.preventDefault(), A.stopPropagation(), S(V);
      }
    }
    function K(A) {
      const w = a.items[A];
      !w || !Dt(w) || (i.value !== null && i.value !== A && D(!1), _(A), w.items?.length && z(A, !1));
    }
    return is(() => {
      x(), a.autofocus && _(C(null, 1));
    }), be(() => a.at, x, { deep: !0 }), be(() => a.items, () => void x(), { deep: !0 }), De(() => {
      i.value = null;
    }), t({ root: l }), (A, w) => {
      const V = cs("MenuList", !0);
      return f(), h("div", {
        ref_key: "root",
        ref: l,
        class: "dc-menu",
        role: "menu",
        "aria-label": e.label,
        style: Me(b.value),
        onKeydown: P
      }, [
        (f(!0), h(ne, null, he(y.value, (F, Y) => (f(), h("div", {
          key: `${Y}-${F.heading?.label ?? ""}`,
          class: "dc-menu__group",
          role: F.heading ? "group" : "none",
          "aria-label": F.heading?.label
        }, [
          F.heading ? (f(), h("div", {
            key: 0,
            class: "dc-menu__heading dc-truncate",
            "aria-hidden": "true",
            "data-dc-item": F.heading.id
          }, I(F.heading.label), 9, Ir)) : R("", !0),
          (f(!0), h(ne, null, he(F.entries, ({ item: G, index: ge }) => (f(), h(ne, {
            key: G.id ?? `${ge}-${G.label ?? ""}`
          }, [
            G.separator ? (f(), h("div", Or)) : (f(), h("button", {
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
              onClick: (ie) => S(ge),
              onMouseenter: (ie) => K(ge)
            }, [
              $("span", Br, I(G.checked ? "✓" : ""), 1),
              $("span", qr, I(G.label), 1),
              G.shortcut ? (f(), h("span", Kr, I(G.shortcut), 1)) : G.items?.length ? (f(), h("span", Vr, "›")) : R("", !0)
            ], 40, Dr))
          ], 64))), 128))
        ], 8, Nr))), 128)),
        i.value !== null && c.value ? (f(), J(V, {
          key: i.value,
          items: e.items[i.value]?.items ?? [],
          at: c.value,
          label: e.items[i.value]?.label,
          autofocus: d.value,
          onChoose: w[0] || (w[0] = (F) => s("choose", F)),
          onDismiss: w[1] || (w[1] = (F) => D(!0))
        }, null, 8, ["items", "at", "label", "autofocus"])) : R("", !0)
      ], 44, Fr);
    };
  }
}), ue = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [a, s] of t)
    n[a] = s;
  return n;
}, ua = /* @__PURE__ */ ue(Wr, [["__scopeId", "data-v-9b1413fa"]]), Hr = { class: "dc-pick" }, Ur = ["id"], jr = ["id", "aria-expanded", "aria-labelledby", "data-dc-value"], Gr = { class: "dc-pick__label" }, Xr = /* @__PURE__ */ oe({
  __name: "PickControl",
  props: {
    modelValue: {},
    options: {},
    label: {},
    mono: { type: Boolean }
  },
  emits: ["update:modelValue", "open", "close"],
  setup(e, { emit: t }) {
    const n = e, a = t, s = Hn() ?? "dc-pick", l = W(null), o = W(null), r = W(null), i = W(!1), c = v(() => r.value !== null), d = W(null), m = v(
      () => n.options.find((S) => S.key === n.modelValue) ?? n.options[0]
    ), y = v(
      () => n.options.map((S) => ({
        id: S.key,
        label: S.label,
        checked: S.key === n.modelValue
      }))
    ), k = v(
      () => r.value ? { maxHeight: `${window.innerHeight - r.value.y - 8}px` } : void 0
    );
    function x(S) {
      const P = l.value?.getBoundingClientRect();
      P && (d.value = l.value?.closest(".dc-shell") ?? document.body, r.value = { x: P.left, y: P.bottom + 4, mirrorX: P.right }, i.value = S, a("open"));
    }
    function b(S) {
      r.value && a("close"), r.value = null, S && l.value?.focus();
    }
    function _() {
      c.value ? b(!0) : x(!1);
    }
    function C(S) {
      S.key !== "ArrowDown" && S.key !== "ArrowUp" || c.value || (S.preventDefault(), x(!0));
    }
    function z(S) {
      const P = S.target;
      P && (l.value?.contains(P) || o.value?.root?.contains(P) || b(!1));
    }
    be(c, (S) => {
      S ? window.addEventListener("pointerdown", z, !0) : window.removeEventListener("pointerdown", z, !0);
    }), De(() => window.removeEventListener("pointerdown", z, !0));
    function D(S) {
      b(!0), !(S.id === void 0 || S.id === n.modelValue) && a("update:modelValue", S.id);
    }
    return (S, P) => (f(), h("span", Hr, [
      $("span", {
        id: `${T(s)}-name`,
        class: "dc-pick__name"
      }, I(e.label), 9, Ur),
      $("button", {
        id: `${T(s)}-value`,
        ref_key: "trigger",
        ref: l,
        type: "button",
        class: At(["dc-pick__button", { "dc-mono": e.mono }]),
        "aria-haspopup": "menu",
        "aria-expanded": c.value,
        "aria-labelledby": `${T(s)}-name ${T(s)}-value`,
        "data-dc-value": e.modelValue,
        onClick: _,
        onKeydown: C
      }, [
        $("span", Gr, I(m.value?.label), 1)
      ], 42, jr),
      P[1] || (P[1] = $("span", {
        class: "dc-pick__mark",
        "aria-hidden": "true"
      }, "▾", -1)),
      r.value && d.value ? (f(), J(Il, {
        key: 0,
        to: d.value
      }, [
        fe(ua, {
          ref_key: "menu",
          ref: o,
          class: "dc-pick__list",
          style: Me(k.value),
          items: y.value,
          at: r.value,
          label: e.label,
          autofocus: i.value,
          onChoose: D,
          onDismiss: P[0] || (P[0] = (K) => b(!0))
        }, null, 8, ["style", "items", "at", "label", "autofocus"])
      ], 8, ["to"])) : R("", !0)
    ]));
  }
}), Xa = /* @__PURE__ */ ue(Xr, [["__scopeId", "data-v-d21ebf1b"]]);
function Yr(e) {
  const t = Pt(/* @__PURE__ */ new Map()), n = W(!0);
  let a = 0, s;
  const l = () => {
    a++, s?.abort(), s = void 0;
  }, o = () => {
    l();
    const r = a, { signal: i } = s = new AbortController(), c = e.query.value, d = e.schema.value, m = e.entities.value, y = e.within?.value.trim() ?? "";
    n.value = c.expr.trim() === "" && !y;
    const k = /* @__PURE__ */ new Map();
    let x = !0;
    for (const b of m) {
      const _ = Fs(b, c.expr), C = y ? Zn(y, _) : _;
      let z = !1;
      const D = (P) => {
        if (r !== a) return;
        if (x) {
          k.set(b.key, P);
          return;
        }
        const K = new Map(t.value);
        K.set(b.key, P), t.value = K;
      }, S = e.source.value.query({
        query: { ...c, entity: b.key, expr: C, facets: Tt(b), page: 1 },
        schema: d,
        entity: b,
        limit: 0,
        offset: 0,
        signal: i,
        progress: (P) => {
          z || D({ total: P, pending: !0, counted: !0 });
        }
      });
      S instanceof Promise ? (k.has(b.key) || k.set(b.key, { total: 0, pending: !0, counted: !1 }), S.then((P) => {
        z = !0, D({ total: P.total, pending: !1, counted: !0 });
      })) : (z = !0, k.set(b.key, { total: S.total, pending: !1, counted: !0 }));
    }
    x = !1, t.value = k;
  };
  return us() && Wn(l), { counts: t, pristine: n, refresh: o, cancel: l };
}
const Qr = 25, qs = (e, t) => e.toLowerCase() === t.toLowerCase();
function Zr(e, t) {
  return e.find((n) => qs(n.id, t));
}
function Jr(e) {
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
      limit: Qr,
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
        const { reference: x } = i[k], b = Zr(y.rows, x.id);
        m.set(x.key, b ? l(x.entity, b) : "");
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
const eo = ["data-dc-expanded"], to = { class: "dc-header__domain" }, no = {
  key: 0,
  class: "dc-header__within"
}, ao = ["title"], so = ["data-dc-more", "title"], lo = {
  key: 0,
  class: "dc-header__or dc-mono",
  "aria-hidden": "true"
}, ro = ["title", "aria-label", "onClick"], oo = ["onKeydown"], io = ["aria-expanded", "aria-controls"], co = {
  class: "dc-header__chevron",
  "aria-hidden": "true"
}, uo = { class: "dc-header__sr" }, fo = {
  key: 0,
  class: "dc-header__pages",
  "aria-label": "Pages"
}, po = ["disabled"], vo = ["title"], ho = ["value", "onKeydown"], mo = {
  class: "dc-header__page-total",
  "aria-hidden": "true"
}, go = {
  class: "dc-header__sr",
  "aria-live": "polite"
}, _o = ["disabled"], yo = {
  key: 1,
  class: "dc-header__actions"
}, wo = "…", ko = /* @__PURE__ */ oe({
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
    ), r = v(() => l.value.formatCount ?? wt), i = Yr({
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
      return E ? E.counted ? `${E.pending ? "~" : ""}${r.value(E.total)}` : wo : B.count;
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
      () => (n.views ?? [...fs]).map((B) => ({ key: B, label: Vl[B] }))
    ), x = v(() => jn(s.query.value.view, n.views)), b = v(() => s.query.value.entity !== null);
    function _(B) {
      s.setView(B);
    }
    const C = v(() => {
      const B = s.entity.value, Q = B?.keepsScope ? void 0 : B?.scope?.toLowerCase();
      return s.terms.value.filter((E) => E.facetKey !== gn).map((E, U, se) => {
        const Ce = se[U - 1];
        return {
          term: E,
          or: Ce?.group !== void 0 && E.group !== void 0 && E.group !== Ce.group,
          idle: !!Q && E.field?.toLowerCase() === Q
        };
      });
    }), z = Jr({
      source: s.source,
      schema: s.schema,
      query: s.query,
      // The scope's parts as well as the query's: it names a record more often
      // than a typed term does, being what a record's own page is built on.
      terms: v(() => [...y.value, ...s.terms.value])
    });
    function D(B) {
      return Ns(l.value, B)?.scopeLabel ?? B;
    }
    function S(B) {
      return B.replace(/\s*\([^()]*\)\s*$/, "");
    }
    function P(B) {
      const Q = z.nameOf(B);
      return Q ? `${B.negated ? "-" : ""}${D(B.field)}: ${S(Q)}` : B.label;
    }
    function K(B) {
      s.setEntity(B || null);
    }
    const A = W(""), w = W(null);
    function V() {
      const B = A.value.trim();
      B && (s.setExpression(
        fr(s.query.value.expr, Ss(B, s.entity.value))
      ), A.value = "");
    }
    function F() {
      A.value = "", w.value?.blur();
    }
    function Y(B) {
      if (A.value) return;
      const Q = C.value.at(-1);
      Q && (B.preventDefault(), s.removeTerm(Q.term));
    }
    function G(B) {
      B.target?.closest("button, select, label, input") || a("toggle");
    }
    const ge = W(null), ie = W("");
    function M() {
      const B = ge.value;
      if (!B) {
        ie.value = "";
        return;
      }
      const Q = B.scrollLeft > 1, E = B.scrollWidth - B.clientWidth - B.scrollLeft > 1;
      ie.value = Q && E ? "both" : Q ? "start" : E ? "end" : "";
    }
    let O = null;
    be(
      ge,
      (B) => {
        O?.disconnect(), O = null, M(), !(!B || typeof ResizeObserver > "u") && (O = new ResizeObserver(M), O.observe(B));
      },
      { flush: "post" }
    ), be(C, M, { flush: "post" }), De(() => O?.disconnect());
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
        $("span", to, I(l.value.label), 1),
        y.value.length ? (f(), h("span", no, [
          Q[4] || (Q[4] = $("span", { class: "dc-header__sr" }, "Within", -1)),
          (f(!0), h(ne, null, he(y.value, (E) => (f(), h("span", {
            key: `scope:${E.id}`,
            class: "dc-within dc-mono dc-truncate",
            title: P(E)
          }, I(P(E)), 9, ao))), 128))
        ])) : R("", !0),
        $("div", {
          ref_key: "termBar",
          ref: ge,
          class: "dc-header__query dc-header__terms",
          "data-dc-more": ie.value,
          title: T(s).summary.value,
          onScroll: M
        }, [
          b.value ? (f(), J(Xa, {
            key: 0,
            class: "dc-header__pick dc-header__scope-select",
            label: "Type",
            "model-value": T(s).query.value.entity ?? "",
            options: m.value,
            onOpen: T(i).refresh,
            onClose: T(i).cancel,
            "onUpdate:modelValue": K
          }, null, 8, ["model-value", "options", "onOpen", "onClose"])) : R("", !0),
          fe(Xa, {
            class: "dc-header__pick dc-header__view-select",
            label: "View",
            "model-value": x.value,
            options: k.value,
            "onUpdate:modelValue": _
          }, null, 8, ["model-value", "options"]),
          (f(!0), h(ne, null, he(C.value, (E) => (f(), h(ne, {
            key: E.term.id
          }, [
            E.or ? (f(), h("span", lo, "or")) : R("", !0),
            $("button", {
              type: "button",
              class: At(["dc-term dc-mono", { "dc-term--idle": E.idle }]),
              title: E.idle ? `Not applied to ${T(s).entity.value?.label} — remove ${P(E.term)}` : `Remove ${P(E.term)}`,
              "aria-label": `Remove ${P(E.term)}`,
              onClick: (U) => T(s).removeTerm(E.term)
            }, I(P(E.term)), 11, ro)
          ], 64))), 128)),
          vn($("input", {
            ref_key: "searchBox",
            ref: w,
            "onUpdate:modelValue": Q[0] || (Q[0] = (E) => A.value = E),
            class: "dc-header__search dc-mono",
            type: "text",
            autocomplete: "off",
            spellcheck: "false",
            placeholder: "Search…",
            "aria-label": "Search",
            onKeydown: [
              Ye(ze(V, ["prevent"]), ["enter"]),
              Ye(ze(F, ["prevent"]), ["esc"]),
              Ye(Y, ["backspace"])
            ]
          }, null, 40, oo), [
            [hn, A.value]
          ])
        ], 40, so),
        $("button", {
          type: "button",
          class: "dc-header__toggle",
          "aria-expanded": e.expanded,
          "aria-controls": e.panelId,
          onClick: Q[1] || (Q[1] = (E) => a("toggle"))
        }, [
          $("span", co, I(e.expanded ? "▲" : "▼"), 1),
          $("span", uo, I(e.expanded ? "Hide query panel" : "Edit query"), 1)
        ], 8, io)
      ]),
      le.value ? (f(), h("nav", fo, [
        $("button", {
          type: "button",
          class: "dc-header__step",
          "aria-label": "Previous page",
          disabled: j.value <= 1,
          onClick: Q[2] || (Q[2] = (E) => T(s).setPage(j.value - 1))
        }, [...Q[5] || (Q[5] = [
          $("span", { "aria-hidden": "true" }, "‹", -1)
        ])], 8, po),
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
          }, null, 44, ho),
          $("span", mo, "/ " + I(_e.value), 1)
        ], 8, vo),
        $("span", go, I(Ee.value), 1),
        $("button", {
          type: "button",
          class: "dc-header__step",
          "aria-label": "Next page",
          disabled: j.value >= T(s).pageCount.value,
          onClick: Q[3] || (Q[3] = (E) => T(s).setPage(j.value + 1))
        }, [...Q[6] || (Q[6] = [
          $("span", { "aria-hidden": "true" }, "›", -1)
        ])], 8, _o)
      ])) : R("", !0),
      B.$slots.actions ? (f(), h("div", yo, [
        $e(B.$slots, "actions", {}, void 0, !0)
      ])) : R("", !0)
    ], 8, eo));
  }
}), Ks = /* @__PURE__ */ ue(ko, [["__scopeId", "data-v-682f5b6d"]]), bo = { class: "dc-facet" }, $o = ["id"], xo = { class: "dc-facet__body" }, Co = ["aria-labelledby"], So = ["aria-pressed", "data-dc-active", "onClick"], Mo = ["aria-labelledby"], Eo = ["aria-label", "placeholder", "onKeydown"], Po = ["aria-label", "placeholder", "onKeydown"], Ao = ["aria-checked"], To = { class: "dc-switch__text" }, Lo = ["data-dc-active"], zo = /* @__PURE__ */ oe({
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
    return (m, y) => (f(), h("div", bo, [
      $("span", {
        id: `dc-facet-${e.facet.key}`,
        class: "dc-facet__label"
      }, I(e.facet.label), 9, $o),
      $("div", xo, [
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
            onClick: (x) => l(k)
          }, I(k), 9, So))), 128))
        ], 8, Co)) : e.facet.kind === "range" && e.value.kind === "range" ? (f(), h("div", {
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
          }, null, 40, Eo), [
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
          }, null, 40, Po), [
            [hn, r.value]
          ])
        ], 8, Mo)) : e.facet.kind === "toggle" && e.value.kind === "toggle" ? (f(), h("button", {
          key: 2,
          type: "button",
          class: "dc-switch",
          role: "switch",
          "aria-checked": e.value.on,
          onClick: d
        }, [
          $("span", To, I(e.facet.text), 1),
          $("span", {
            class: "dc-switch__track",
            "data-dc-active": e.value.on ? "true" : "false",
            "aria-hidden": "true"
          }, [...y[3] || (y[3] = [
            $("span", { class: "dc-switch__knob" }, null, -1)
          ])], 8, Lo)
        ], 8, Ao)) : R("", !0)
      ])
    ]));
  }
}), Vs = /* @__PURE__ */ ue(zo, [["__scopeId", "data-v-36d1334b"]]), Ro = ["id"], Fo = { class: "dc-panel__section dc-panel__rows" }, No = { class: "dc-panel__row" }, Io = ["for"], Oo = ["title", "aria-label", "onClick"], Do = ["id", "placeholder", "onKeydown"], Bo = { class: "dc-panel__actions" }, qo = ["disabled"], Ko = {
  key: 0,
  class: "dc-panel__section"
}, Vo = /* @__PURE__ */ oe({
  __name: "QueryPanel",
  props: {
    panelId: {}
  },
  emits: ["close"],
  setup(e, { emit: t }) {
    const n = t, a = Ut(), s = we(), l = v(() => ur(s.query.value.expr)), o = v(() => l.value.parts.map(Gt)), r = W(l.value.text), i = W(null);
    be(
      () => l.value.text,
      (b) => {
        r.value = b;
      }
    );
    const c = v(() => r.value !== l.value.text);
    function d() {
      if (c.value) {
        const b = Ss(r.value, s.entity.value);
        s.setExpression(Va(l.value.parts, b));
      }
      n("close");
    }
    function m(b) {
      const { parts: _, text: C } = l.value;
      s.setExpression(Va(_.filter((z, D) => D !== b), C));
    }
    function y(b) {
      const { parts: _ } = l.value;
      r.value || !_.length || (b.preventDefault(), m(_.length - 1));
    }
    function k() {
      r.value = "", s.clearFilters();
    }
    function x(b, _) {
      s.setFacet(b, _);
    }
    return Vt(() => i.value?.focus()), (b, _) => (f(), h("div", {
      id: e.panelId,
      class: "dc-panel",
      role: "dialog",
      "aria-label": "Query",
      onKeydown: _[2] || (_[2] = Ye(ze((C) => n("close"), ["stop"]), ["esc"]))
    }, [
      $("section", Fo, [
        $("div", No, [
          $("label", {
            class: "dc-panel__field-label",
            for: `${e.panelId}-expr`
          }, "Expression", 8, Io),
          $("div", {
            class: "dc-field",
            onMousedown: _[1] || (_[1] = ze((C) => i.value?.focus(), ["self", "prevent"]))
          }, [
            (f(!0), h(ne, null, he(o.value, (C, z) => (f(), h("button", {
              key: `${z}:${C}`,
              type: "button",
              class: "dc-part dc-mono",
              title: `Remove ${C}`,
              "aria-label": `Remove ${C}`,
              onClick: (D) => m(z)
            }, I(C), 9, Oo))), 128)),
            vn($("input", {
              id: `${e.panelId}-expr`,
              ref_key: "expressionField",
              ref: i,
              "onUpdate:modelValue": _[0] || (_[0] = (C) => r.value = C),
              class: "dc-expression dc-mono",
              type: "text",
              autocomplete: "off",
              spellcheck: "false",
              placeholder: o.value.length ? "" : T(s).schema.value.placeholder,
              onKeydown: [
                Ye(ze(d, ["prevent"]), ["enter"]),
                Ye(y, ["backspace"])
              ]
            }, null, 40, Do), [
              [hn, r.value]
            ])
          ], 32)
        ]),
        T(s).entity.value ? (f(!0), h(ne, { key: 0 }, he(T(s).entity.value.facets, (C) => (f(), J(Vs, {
          key: C.key,
          facet: C,
          value: T(s).query.value.facets[C.key],
          onUpdate: (z) => x(C.key, z)
        }, null, 8, ["facet", "value", "onUpdate"]))), 128)) : R("", !0),
        $("div", Bo, [
          $("button", {
            type: "button",
            class: "dc-button dc-button--primary",
            onClick: d
          }, " Run query "),
          $("button", {
            type: "button",
            class: "dc-button",
            disabled: T(s).isPristine.value && !c.value,
            onClick: k
          }, " Reset ", 8, qo)
        ])
      ]),
      a["panel-section"] ? (f(), h("section", Ko, [
        $e(b.$slots, "panel-section", {}, void 0, !0)
      ])) : R("", !0)
    ], 40, Ro));
  }
}), Ws = /* @__PURE__ */ ue(Vo, [["__scopeId", "data-v-640ae2f5"]]), Wo = ["checked", "indeterminate"], Hs = /* @__PURE__ */ oe({
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
      onChange: o[0] || (o[0] = (r) => T(t).selectPage(!a.value))
    }, null, 40, Wo));
  }
}), Ho = {
  key: 0,
  class: "dc-actions"
}, Uo = {
  key: 0,
  class: "dc-actions__select"
}, jo = {
  key: 0,
  class: "dc-actions__all"
}, Go = {
  class: "dc-actions__count",
  "aria-live": "polite"
}, Xo = {
  key: 1,
  class: "dc-actions__count dc-actions__all",
  "aria-live": "polite"
}, Yo = { class: "dc-actions__ops" }, Qo = ["disabled"], Zo = ["disabled"], Jo = /* @__PURE__ */ oe({
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
    return (m, y) => r.value ? (f(), h("div", Ho, [
      l.value ? (f(), h("div", Uo, [
        o.value ? (f(), h("span", Xo, I(c.value), 1)) : (f(), h("label", jo, [
          fe(Hs),
          $("span", Go, I(c.value), 1)
        ])),
        i.value ? (f(), h("button", {
          key: 2,
          type: "button",
          class: "dc-actions__clear",
          onClick: y[0] || (y[0] = (k) => T(n).clearSelection())
        }, " Clear ")) : R("", !0)
      ])) : R("", !0),
      $("div", Yo, [
        a.value?.create ? (f(), h("button", {
          key: 0,
          type: "button",
          class: "dc-actions__op dc-actions__new",
          onClick: y[1] || (y[1] = (k) => T(n).create(a.value))
        }, [
          y[4] || (y[4] = $("span", {
            class: "dc-actions__plus",
            "aria-hidden": "true"
          }, "+", -1)),
          We(" " + I(a.value.create), 1)
        ])) : R("", !0),
        a.value?.duplicate ? (f(), h("button", {
          key: 1,
          type: "button",
          class: "dc-actions__op",
          disabled: !i.value,
          onClick: y[2] || (y[2] = (k) => T(n).duplicate())
        }, I(d(a.value.duplicate)), 9, Qo)) : R("", !0),
        a.value?.delete ? (f(), h("button", {
          key: 2,
          type: "button",
          class: "dc-actions__op dc-actions__danger",
          disabled: !i.value,
          onClick: y[3] || (y[3] = (k) => T(n).delete())
        }, I(d(a.value.delete)), 9, Zo)) : R("", !0)
      ])
    ])) : R("", !0);
  }
}), Us = /* @__PURE__ */ ue(Jo, [["__scopeId", "data-v-03ff2a91"]]);
function ei(e, t) {
  if (!e) return null;
  const n = Oe(e, t);
  return typeof n == "string" && n.trim() ? n : null;
}
function ti(e, t) {
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
    image: ei(Ve(t, "image"), e),
    tint: a ? Oe(a, e) ?? null : null
  };
}
function js(e, t, n, a, s = !1) {
  const l = n?.columns ?? [];
  return {
    row: e,
    key: Ql(e, t),
    entityLabel: e.entityLabel,
    entity: n,
    columns: l,
    ordinal: Gl(t),
    parts: ti(e, l),
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
const ni = ["data-dc-status"], ai = /* @__PURE__ */ oe({
  __name: "StatusPill",
  props: {
    status: {}
  },
  setup(e) {
    return (t, n) => (f(), h("span", {
      class: "dc-pill",
      "data-dc-status": e.status
    }, I(e.status), 9, ni));
  }
}), Xt = /* @__PURE__ */ ue(ai, [["__scopeId", "data-v-23e59fbf"]]), si = ["title"], li = { key: 1 }, ri = /* @__PURE__ */ oe({
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
        We(I(l.value), 1)
      ], !0)
    ], 8, si)) : (f(), h("span", li, [
      $e(r.$slots, "default", {}, () => [
        We(I(l.value), 1)
      ], !0)
    ]));
  }
}), Yt = /* @__PURE__ */ ue(ri, [["__scopeId", "data-v-f2501b17"]]), oi = ["data-dc-active", "aria-pressed", "aria-label"], ii = /* @__PURE__ */ oe({
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
    }, I(e.pinned ? "★" : "☆"), 9, oi));
  }
}), da = /* @__PURE__ */ ue(ii, [["__scopeId", "data-v-ef63d763"]]), ci = ["src"], ui = /* @__PURE__ */ oe({
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
    }, null, 40, ci)) : R("", !0);
  }
}), kn = /* @__PURE__ */ ue(ui, [["__scopeId", "data-v-afaab300"]]), di = ["data-dc-standing", "title", "aria-label"], fi = /* @__PURE__ */ oe({
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
    }, I(s.value === "in" ? "+" : "−"), 9, di)) : R("", !0);
  }
}), bn = /* @__PURE__ */ ue(fi, [["__scopeId", "data-v-4b8d4166"]]), pi = ["data-dc-pending", "title", "aria-label"], vi = /* @__PURE__ */ oe({
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
    }, " → ", 40, pi)) : R("", !0);
  }
}), Qt = /* @__PURE__ */ ue(vi, [["__scopeId", "data-v-9efd42ac"]]), hi = ["checked", "aria-label"], _t = /* @__PURE__ */ oe({
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
    }, null, 8, hi));
  }
}), mi = { class: "dc-cards" }, gi = { class: "dc-card__top dc-mono" }, _i = { class: "dc-card__lead" }, yi = {
  key: 1,
  class: "dc-card__entity"
}, wi = { class: "dc-card__top-right" }, ki = ["onClick"], bi = { class: "dc-card__names" }, $i = { class: "dc-card__primary" }, xi = { class: "dc-card__secondary dc-mono" }, Ci = { class: "dc-card__metrics dc-mono" }, Si = {
  key: 0,
  class: "dc-card__date"
}, Mi = /* @__PURE__ */ oe({
  __name: "CardsView",
  setup(e) {
    const t = we(), n = gt(), a = v(() => t.isEverything.value);
    return (s, l) => (f(), h("div", mi, [
      (f(!0), h(ne, null, he(T(n), (o) => (f(), h("div", {
        key: o.key,
        class: "dc-card"
      }, [
        $("div", gi, [
          $("span", _i, [
            T(t).selectable.value ? (f(), J(_t, {
              key: 0,
              row: o.row,
              selected: o.selected,
              name: o.parts.identity
            }, null, 8, ["row", "selected", "name"])) : R("", !0),
            We(" " + I(o.ordinal) + " ", 1),
            a.value ? (f(), h("span", yi, I(o.entityLabel), 1)) : R("", !0)
          ]),
          $("span", wi, [
            o.parts.state ? (f(), J(Xt, {
              key: 0,
              status: o.parts.state
            }, null, 8, ["status"])) : R("", !0),
            fe(bn, { entry: o }, null, 8, ["entry"]),
            fe(Qt, { entry: o }, null, 8, ["entry"]),
            T(t).pinnable.value ? (f(), J(da, {
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
          onClick: (r) => T(t).activate(o.row, T(Be)(r))
        }, [
          o.parts.image ? (f(), J(kn, {
            key: 0,
            class: "dc-card__image",
            src: o.parts.image
          }, null, 8, ["src"])) : R("", !0),
          $("span", bi, [
            $("span", $i, I(o.parts.identity), 1),
            $("span", xi, I(o.parts.reference), 1)
          ])
        ], 8, ki),
        $("div", Ci, [
          (f(!0), h(ne, null, he(o.parts.metrics.slice(0, 2), (r) => (f(), J(Yt, {
            key: r.column.key ?? r.label,
            entry: o,
            column: r.column
          }, {
            default: Qe(() => [
              We(I(r.label) + " " + I(r.text), 1)
            ]),
            _: 2
          }, 1032, ["entry", "column"]))), 128)),
          o.parts.updated ? (f(), h("span", Si, I(o.parts.updated), 1)) : R("", !0)
        ])
      ]))), 128))
    ]));
  }
}), Gs = /* @__PURE__ */ ue(Mi, [["__scopeId", "data-v-28581543"]]), Ei = { class: "dc-grid" }, Pi = ["onClick"], Ai = { class: "dc-tile__scrim" }, Ti = { class: "dc-tile__top dc-mono" }, Li = { class: "dc-tile__chip" }, zi = { class: "dc-tile__caption" }, Ri = { class: "dc-tile__secondary dc-truncate" }, Fi = { class: "dc-tile__primary" }, Ni = /* @__PURE__ */ oe({
  __name: "GridView",
  setup(e) {
    const t = we(), n = gt();
    return (a, s) => (f(), h("div", Ei, [
      (f(!0), h(ne, null, he(T(n), (l) => (f(), h("div", {
        key: l.key,
        class: "dc-grid__cell"
      }, [
        $("button", {
          type: "button",
          class: "dc-tile",
          style: Me({ "--dc-tile-tint": l.parts.tint ?? void 0 }),
          onClick: (o) => T(t).activate(l.row, T(Be)(o))
        }, [
          l.parts.image ? (f(), J(kn, {
            key: 0,
            class: "dc-tile__image",
            src: l.parts.image
          }, null, 8, ["src"])) : R("", !0),
          $("span", Ai, [
            $("span", Ti, [
              $("span", Li, I(l.ordinal), 1)
            ]),
            $("span", zi, [
              $("span", Ri, I(l.parts.reference), 1),
              $("span", Fi, I(l.parts.identity), 1)
            ])
          ])
        ], 12, Pi),
        T(t).selectable.value ? (f(), J(_t, {
          key: 0,
          class: "dc-grid__tick",
          row: l.row,
          selected: l.selected,
          name: l.parts.identity
        }, null, 8, ["row", "selected", "name"])) : R("", !0)
      ]))), 128))
    ]));
  }
}), Xs = /* @__PURE__ */ ue(Ni, [["__scopeId", "data-v-7df25d40"]]);
function Ya(e, t, n, a) {
  return (n - a * (t - 1)) / e;
}
function An(e, t) {
  return e > 0 ? Math.min(t, e) : t;
}
function Ii(e) {
  return e > 0 ? e : 1 / 0;
}
function Oi(e, t, n) {
  const { width: a, height: s, gap: l = 0 } = n;
  if (!e.length) return [];
  if (!(a > 0) || !(s > 0)) return [{ items: [...e], height: s, filled: !1 }];
  const o = [];
  let r = [], i = 0, c = 0;
  for (const d of e) {
    const m = t(d), y = Math.max(m.ratio, Number.EPSILON), k = m.height && m.height > 0 ? Math.max(c, m.height) : c, x = An(k, s), b = Ya(i + y, r.length + 1, a, l);
    if (b > x) {
      r.push(d), i += y, c = k;
      continue;
    }
    const _ = An(c, s), C = r.length ? Ya(i, r.length, a, l) : 1 / 0;
    C <= Ii(c) && C - _ < x - b ? (o.push({ items: r, height: C, filled: !0 }), r = [d], i = y, c = m.height && m.height > 0 ? m.height : 0) : (o.push({ items: [...r, d], height: b, filled: !0 }), r = [], i = 0, c = 0);
  }
  return r.length && o.push({ items: r, height: An(c, s), filled: !1 }), o;
}
const Di = { class: "dc-images" }, Bi = ["title", "aria-label", "onClick"], qi = {
  key: 1,
  class: "dc-images__blank",
  "aria-hidden": "true"
}, Ki = 240, sn = 8, Vi = 1, Wi = /* @__PURE__ */ oe({
  __name: "ImagesView",
  setup(e) {
    const t = we(), n = gt(), a = za(/* @__PURE__ */ new Map()), s = za(/* @__PURE__ */ new Set());
    function l(x, b) {
      const _ = b.target;
      _.naturalWidth > 0 && _.naturalHeight > 0 && a.set(x, { width: _.naturalWidth, height: _.naturalHeight });
    }
    function o(x) {
      const b = x.parts.image;
      return b && !s.has(b) ? b : null;
    }
    function r(x) {
      const b = o(x);
      return b ? a.get(b) : void 0;
    }
    function i(x) {
      const b = r(x);
      return b ? { ratio: b.width / b.height, height: b.height } : { ratio: Vi };
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
      const x = Oi(n.value, i, {
        width: d.value,
        height: Ki,
        gap: sn
      }), b = [];
      let _ = 0;
      for (const C of x) {
        let z = 0;
        for (const D of C.items) {
          const S = i(D).ratio * C.height, P = r(D), K = P !== void 0 && P.height < C.height;
          b.push({
            entry: D,
            style: {
              top: `${_}px`,
              left: `${z}px`,
              width: `${S}px`,
              height: `${C.height}px`
            },
            picture: K ? { width: `${P.width}px`, height: `${P.height}px` } : { width: "100%", height: "100%" }
          }), z += S + sn;
        }
        _ += C.height + sn;
      }
      return { boxes: b, height: x.length ? _ - sn : 0 };
    });
    return (x, b) => (f(), h("div", Di, [
      $("div", {
        ref_key: "wall",
        ref: c,
        class: "dc-images__wall",
        style: Me({ height: `${k.value.height}px` })
      }, [
        (f(!0), h(ne, null, he(k.value.boxes, ({ entry: _, style: C, picture: z }) => (f(), h("div", {
          key: _.key,
          class: "dc-images__cell",
          style: Me(C)
        }, [
          $("button", {
            type: "button",
            class: "dc-images__open",
            title: _.parts.identity,
            "aria-label": _.parts.identity,
            onClick: (D) => T(t).activate(_.row, T(Be)(D))
          }, [
            o(_) ? (f(), J(kn, {
              key: 0,
              class: "dc-images__picture",
              style: Me(z),
              src: o(_),
              onLoad: (D) => l(o(_), D),
              onError: (D) => s.add(o(_))
            }, null, 8, ["style", "src", "onLoad", "onError"])) : (f(), h("span", qi, I(_.parts.identity), 1))
          ], 8, Bi),
          T(t).selectable.value ? (f(), J(_t, {
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
}), Ys = /* @__PURE__ */ ue(Wi, [["__scopeId", "data-v-f708d83f"]]), Hi = { class: "dc-links" }, Ui = ["onClick"], ji = { class: "dc-link__primary dc-truncate" }, Gi = { class: "dc-link__secondary dc-mono dc-truncate" }, Xi = /* @__PURE__ */ oe({
  __name: "LinksView",
  setup(e) {
    const t = we(), n = gt();
    return (a, s) => (f(), h("div", Hi, [
      (f(!0), h(ne, null, he(T(n), (l) => (f(), h("span", {
        key: l.key,
        class: "dc-links__item"
      }, [
        T(t).selectable.value ? (f(), J(_t, {
          key: 0,
          row: l.row,
          selected: l.selected,
          name: l.parts.identity
        }, null, 8, ["row", "selected", "name"])) : R("", !0),
        $("button", {
          type: "button",
          class: "dc-link",
          onClick: (o) => T(t).activate(l.row, T(Be)(o))
        }, [
          $("span", ji, I(l.parts.identity), 1),
          $("span", Gi, I(l.parts.reference), 1)
        ], 8, Ui)
      ]))), 128))
    ]));
  }
}), Qs = /* @__PURE__ */ ue(Xi, [["__scopeId", "data-v-08d0266c"]]), Yi = {
  class: "dc-list",
  role: "list"
}, Qi = ["onClick"], Zi = { class: "dc-list__ordinal dc-mono" }, Ji = { class: "dc-list__identity" }, ec = { class: "dc-list__primary dc-truncate" }, tc = { class: "dc-list__secondary dc-mono dc-truncate" }, nc = {
  key: 1,
  class: "dc-list__entity dc-mono"
}, ac = { class: "dc-list__metrics dc-mono" }, sc = { class: "dc-list__trailing" }, lc = /* @__PURE__ */ oe({
  __name: "ListView",
  setup(e) {
    const t = we(), n = gt(), a = v(() => t.isEverything.value);
    return (s, l) => (f(), h("div", Yi, [
      (f(!0), h(ne, null, he(T(n), (o) => (f(), h("div", {
        key: o.key,
        class: "dc-list__row",
        role: "listitem"
      }, [
        T(t).selectable.value ? (f(), J(_t, {
          key: 0,
          class: "dc-list__tick",
          row: o.row,
          selected: o.selected,
          name: o.parts.identity
        }, null, 8, ["row", "selected", "name"])) : R("", !0),
        $("button", {
          type: "button",
          class: "dc-list__open",
          onClick: (r) => T(t).activate(o.row, T(Be)(r))
        }, [
          $("span", Zi, I(o.ordinal), 1),
          $("span", Ji, [
            $("span", ec, I(o.parts.identity), 1),
            $("span", tc, I(o.parts.reference), 1)
          ])
        ], 8, Qi),
        a.value ? (f(), h("span", nc, I(o.entityLabel), 1)) : R("", !0),
        $("span", ac, [
          (f(!0), h(ne, null, he(o.parts.metrics.slice(0, 2), (r) => (f(), J(Yt, {
            key: r.column.key ?? r.label,
            entry: o,
            column: r.column
          }, null, 8, ["entry", "column"]))), 128))
        ]),
        $("span", sc, [
          o.parts.state ? (f(), J(Xt, {
            key: 0,
            status: o.parts.state
          }, null, 8, ["status"])) : R("", !0),
          fe(bn, { entry: o }, null, 8, ["entry"]),
          fe(Qt, { entry: o }, null, 8, ["entry"]),
          T(t).pinnable.value ? (f(), J(da, {
            key: 1,
            row: o.row,
            name: o.parts.identity,
            pinned: o.pinned
          }, null, 8, ["row", "name", "pinned"])) : R("", !0)
        ])
      ]))), 128))
    ]));
  }
}), In = /* @__PURE__ */ ue(lc, [["__scopeId", "data-v-11b9f46c"]]), rc = { class: "dc-preview" }, oc = { class: "dc-preview__pager dc-mono" }, ic = ["disabled"], cc = { "aria-live": "polite" }, uc = ["disabled"], dc = {
  key: 0,
  class: "dc-preview__card"
}, fc = ["src"], pc = { class: "dc-preview__body" }, vc = { class: "dc-preview__top" }, hc = { class: "dc-preview__badges" }, mc = { class: "dc-preview__entity dc-mono" }, gc = { class: "dc-preview__marks" }, _c = { class: "dc-preview__primary" }, yc = { class: "dc-preview__secondary dc-mono" }, wc = { class: "dc-preview__fields" }, kc = { class: "dc-preview__key" }, bc = { class: "dc-preview__value dc-mono" }, $c = /* @__PURE__ */ oe({
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
    return (i, c) => (f(), h("div", rc, [
      $("div", oc, [
        $("button", {
          type: "button",
          class: "dc-preview__step",
          "aria-label": "Previous result",
          disabled: a.value === 0,
          onClick: c[0] || (c[0] = (d) => r(-1))
        }, " ‹ ", 8, ic),
        $("span", cc, I(o.value), 1),
        $("button", {
          type: "button",
          class: "dc-preview__step",
          "aria-label": "Next result",
          disabled: a.value >= T(n).length - 1,
          onClick: c[1] || (c[1] = (d) => r(1))
        }, " › ", 8, uc)
      ]),
      s.value ? (f(), h("div", dc, [
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
          }, null, 8, fc)) : (f(), h(ne, { key: 1 }, [
            We(" preview ")
          ], 64))
        ], 4),
        $("div", pc, [
          $("div", vc, [
            $("span", hc, [
              T(t).selectable.value ? (f(), J(_t, {
                key: 0,
                row: s.value.row,
                selected: s.value.selected,
                name: s.value.parts.identity
              }, null, 8, ["row", "selected", "name"])) : R("", !0),
              s.value.parts.state ? (f(), J(Xt, {
                key: 1,
                status: s.value.parts.state
              }, null, 8, ["status"])) : R("", !0),
              $("span", mc, I(s.value.entityLabel), 1)
            ]),
            $("span", gc, [
              fe(bn, { entry: s.value }, null, 8, ["entry"]),
              fe(Qt, { entry: s.value }, null, 8, ["entry"]),
              T(t).pinnable.value ? (f(), J(da, {
                key: 0,
                row: s.value.row,
                name: s.value.parts.identity,
                pinned: s.value.pinned
              }, null, 8, ["row", "name", "pinned"])) : R("", !0)
            ])
          ]),
          $("div", null, [
            $("div", _c, I(s.value.parts.identity), 1),
            $("div", yc, I(s.value.parts.reference), 1)
          ]),
          $("dl", wc, [
            (f(!0), h(ne, null, he(l.value, (d) => (f(), h("div", {
              key: d.key,
              class: "dc-preview__field"
            }, [
              $("dt", kc, I(d.key), 1),
              $("dd", bc, [
                d.column && s.value ? (f(), J(Yt, {
                  key: 0,
                  entry: s.value,
                  column: d.column
                }, null, 8, ["entry", "column"])) : (f(), h(ne, { key: 1 }, [
                  We(I(d.value), 1)
                ], 64))
              ])
            ]))), 128))
          ]),
          $("button", {
            type: "button",
            class: "dc-preview__open",
            onClick: c[2] || (c[2] = (d) => T(t).activate(s.value.row, T(Be)(d)))
          }, " Open record → ")
        ])
      ])) : R("", !0)
    ]));
  }
}), Zs = /* @__PURE__ */ ue($c, [["__scopeId", "data-v-6be41155"]]);
function xc() {
  const e = we();
  return v(() => Xl(e.schema.value, e.entity.value));
}
const Cc = ["title"], Sc = {
  key: 5,
  class: "dc-cell__text"
}, Mc = /* @__PURE__ */ oe({
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
    }, I(l.value), 11, Cc)) : (f(), h("span", Sc, I(l.value), 1));
  }
}), Qa = /* @__PURE__ */ ue(Mc, [["__scopeId", "data-v-70ba8aa2"]]), Ec = ["aria-label"], Pc = ["data-dc-standing", "data-dc-active", "aria-checked", "title", "aria-label", "onClick"], Ac = /* @__PURE__ */ oe({
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
      }, I(c.sign), 9, Pc))), 128))
    ], 8, Ec));
  }
}), Za = /* @__PURE__ */ ue(Ac, [["__scopeId", "data-v-adaa8412"]]), Tc = {
  key: 0,
  class: "dc-table__none"
}, Lc = { class: "dc-table__detail" }, zc = ["data-dc-wrap"], Rc = {
  key: 0,
  class: "dc-table__pick",
  scope: "col"
}, Fc = {
  key: 1,
  class: "dc-table__standing",
  scope: "col"
}, Nc = ["data-dc-align", "data-dc-hide", "aria-sort", "title"], Ic = ["onClick"], Oc = {
  key: 2,
  class: "dc-table__head"
}, Dc = ["onClick"], Bc = {
  key: 0,
  class: "dc-table__pick"
}, qc = {
  key: 1,
  class: "dc-table__standing"
}, Kc = ["data-dc-align", "data-dc-hide", "title"], Vc = {
  key: 0,
  class: "dc-table__name"
}, Wc = /* @__PURE__ */ oe({
  __name: "TableView",
  setup(e) {
    const t = we(), n = gt(), a = xc();
    function s(w) {
      const V = lr(w, t.entity.value), F = V ? `Shortcut: ${V}` : void 0;
      return [w.hint, F].filter(Boolean).join(`
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
      const w = n.value.filter((F) => r(F) !== null), V = w.filter((F) => F.selected);
      return V.length ? V : w;
    }), m = v(() => d.value.some((w) => w.selected)), y = v(() => {
      const w = d.value[0];
      return w ? i(w) : null;
    }), k = v(
      () => d.value.some((w) => i(w) !== y.value)
    ), x = v(
      () => m.value ? "the ticked rows" : "every row on this page"
    );
    function b(w) {
      t.setExpression(
        d.value.reduce(
          (V, F) => Ua(V, r(F), w),
          t.query.value.expr
        )
      );
    }
    const _ = v(
      () => a.value.some((w) => w.kind === "image" || w.height !== void 0)
    );
    function C(w) {
      w && (t.query.value.sort === w ? t.toggleDirection() : t.setSort(w));
    }
    const z = v(() => t.entity.value?.label ?? "The result set"), D = v(() => new Set(t.sorts.value.map((w) => w.key))), S = (w) => w.sort !== void 0 && D.value.has(w.sort), P = (w) => {
      if (S(w))
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
    function A(w, V) {
      if (!(!Fn(w) || w.activate || w.click))
        return bs(w, V.row);
    }
    return (w, V) => T(a).length ? (f(), h("table", {
      key: 1,
      class: "dc-table",
      "data-dc-wrap": _.value ? "" : void 0
    }, [
      $("thead", null, [
        $("tr", null, [
          T(t).selectable.value ? (f(), h("th", Rc, [
            fe(Hs)
          ])) : R("", !0),
          o.value ? (f(), h("th", Fc, [
            d.value.length ? (f(), J(Za, {
              key: 0,
              standing: y.value,
              mixed: k.value,
              name: x.value,
              onSet: b
            }, null, 8, ["standing", "mixed", "name"])) : R("", !0)
          ])) : R("", !0),
          (f(!0), h(ne, null, he(T(a), (F, Y) => (f(), h("th", {
            key: T(Fa)(F, Y),
            scope: "col",
            class: At(T(Ia)(F)),
            style: Me({ width: F.width }),
            "data-dc-align": T(Na)(F),
            "data-dc-hide": F.hideBelow,
            "aria-sort": P(F),
            title: s(F)
          }, [
            S(F) ? (f(), h("button", {
              key: 0,
              type: "button",
              class: "dc-table__sort",
              onClick: (G) => C(F.sort)
            }, I(F.label), 9, Ic)) : (f(), h(ne, { key: 1 }, [
              We(I(F.label), 1)
            ], 64)),
            F.header ? (f(), h("span", Oc, [
              (f(), J(Un(F.header), {
                column: F,
                entity: T(t).entity.value
              }, null, 8, ["column", "entity"]))
            ])) : R("", !0)
          ], 14, Nc))), 128))
        ])
      ]),
      $("tbody", null, [
        (f(!0), h(ne, null, he(T(n), (F) => (f(), h("tr", {
          key: F.key,
          class: "dc-table__row",
          onClick: (Y) => T(t).activate(F.row, T(Be)(Y))
        }, [
          T(t).selectable.value ? (f(), h("td", Bc, [
            fe(_t, {
              row: F.row,
              selected: F.selected,
              name: F.parts.identity
            }, null, 8, ["row", "selected", "name"])
          ])) : R("", !0),
          o.value ? (f(), h("td", qc, [
            r(F) !== null ? (f(), J(Za, {
              key: 0,
              standing: i(F),
              name: F.parts.identity,
              onSet: (Y) => c(F, Y)
            }, null, 8, ["standing", "name", "onSet"])) : R("", !0)
          ])) : R("", !0),
          (f(!0), h(ne, null, he(T(a), (Y, G) => (f(), h("td", {
            key: T(Fa)(Y, G),
            class: At(K(Y)),
            "data-dc-align": T(Na)(Y),
            "data-dc-hide": Y.hideBelow,
            title: A(Y, F)
          }, [
            Y === l.value ? (f(), h("span", Vc, [
              fe(Qa, {
                column: Y,
                entry: F
              }, null, 8, ["column", "entry"]),
              fe(Qt, { entry: F }, null, 8, ["entry"])
            ])) : (f(), J(Qa, {
              key: 1,
              column: Y,
              entry: F
            }, null, 8, ["column", "entry"]))
          ], 10, Kc))), 128))
        ], 8, Dc))), 128))
      ])
    ], 8, zc)) : (f(), h("p", Tc, [
      V[2] || (V[2] = $("span", { class: "dc-table__headline" }, "No columns declared", -1)),
      $("span", Lc, [
        We(I(z.value) + " has no ", 1),
        V[0] || (V[0] = $("code", null, "columns", -1)),
        V[1] || (V[1] = We(" in the schema, so there is no table to draw. ", -1))
      ])
    ]));
  }
}), Js = /* @__PURE__ */ ue(Wc, [["__scopeId", "data-v-98495b60"]]);
function Hc(e) {
  const t = Pt([]), n = W(!1), a = Pt(null);
  let s = 0;
  const l = (i, c, d, m, y) => ({
    entity: i,
    rows: c.rows.map(
      (k, x) => js(k, x, i, e.isPinned(k.id))
    ),
    total: c.total,
    count: d ? i.count : String(c.total),
    pinned: Uc(m, c, y)
  }), o = () => {
    const i = ++s, c = e.query.value, d = e.schema.value, m = e.entities.value, y = e.limit.value, k = e.within?.value.trim() ?? "", x = Xn(c) && !k, b = k ? Zn(k, c.expr) : c.expr, _ = m.map((C) => ({
      entity: C,
      // Scope the query to this entity, keeping the expression and ordering
      // but dropping facets, which belong to whichever entity is selected.
      outcome: e.source.value.query({
        // Each card is the top few of its type, wherever the shell's own
        // result set has been paged to — so this asks for the first page.
        query: { ...c, entity: C.key, expr: b, facets: Tt(C), page: 1 },
        schema: d,
        entity: C,
        limit: y,
        offset: 0
      })
    }));
    if (_.every(({ outcome: C }) => !(C instanceof Promise))) {
      t.value = _.map(
        ({ entity: C, outcome: z }) => l(C, z, x, d, b)
      ), a.value = null, n.value = !1;
      return;
    }
    n.value = !0, Promise.all(_.map(({ outcome: C }) => Promise.resolve(C))).then((C) => {
      i === s && (t.value = C.map(
        (z, D) => l(_[D].entity, z, x, d, b)
      ), a.value = null);
    }).catch((C) => {
      i === s && (a.value = C, t.value = []);
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
function Uc(e, t, n) {
  const a = t.rows[0];
  if (t.total !== 1 || t.rows.length !== 1 || !a)
    return !1;
  const s = n.trim();
  if (!s)
    return !1;
  const l = ea(e, a);
  return !!l && ta(s, l) === s;
}
const jc = ["data-dc-pending"], Gc = {
  key: 0,
  class: "dc-types__state",
  role: "alert"
}, Xc = {
  key: 1,
  class: "dc-types__state",
  "aria-live": "polite"
}, Yc = {
  key: 2,
  class: "dc-types__state"
}, Qc = ["data-dc-empty"], Zc = ["onClick"], Jc = { class: "dc-type__name" }, eu = { class: "dc-type__count dc-mono" }, tu = { class: "dc-type__sr" }, nu = {
  key: 0,
  class: "dc-type__empty"
}, au = ["onClick"], su = { class: "dc-type__identity" }, lu = { class: "dc-type__primary dc-truncate" }, ru = { class: "dc-type__secondary dc-mono dc-truncate" }, ou = { class: "dc-type__trailing dc-mono" }, iu = { class: "dc-type__metric-value" }, cu = { class: "dc-type__metric-label" }, uu = {
  key: 0,
  class: "dc-type__date"
}, du = ["onClick"], fu = /* @__PURE__ */ oe({
  __name: "TypeCardsView",
  setup(e) {
    const t = we(), { previews: n, pending: a, error: s } = Hc({
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
      "data-dc-pending": T(a) ? "true" : "false"
    }, [
      $e(r.$slots, "before", {}, void 0, !0),
      T(s) ? (f(), h("p", Gc, " Could not load results: " + I(T(s) instanceof Error ? T(s).message : "the data source failed."), 1)) : !o.value.length && T(a) ? (f(), h("p", Xc, " Running query… ")) : o.value.length ? R("", !0) : (f(), h("p", Yc, I(l.value ? "Nothing matches this query" : "Nothing here yet"), 1)),
      (f(!0), h(ne, null, he(o.value, (c) => (f(), h("section", {
        key: c.entity.key,
        class: "dc-type",
        "data-dc-empty": c.rows.length ? "false" : "true"
      }, [
        $("button", {
          type: "button",
          class: "dc-type__head",
          onClick: (d) => T(t).setEntity(c.entity.key)
        }, [
          $("span", Jc, I(c.entity.label), 1),
          $("span", eu, I(c.count), 1),
          i[0] || (i[0] = $("span", {
            class: "dc-type__go",
            "aria-hidden": "true"
          }, "→", -1)),
          $("span", tu, "Show only " + I(c.entity.label.toLowerCase()), 1)
        ], 8, Zc),
        c.rows.length ? R("", !0) : (f(), h("p", nu, I(l.value ? "No matches" : "Nothing here yet"), 1)),
        (f(!0), h(ne, null, he(c.rows, (d) => (f(), h("div", {
          key: d.key,
          class: "dc-type__row"
        }, [
          $("button", {
            type: "button",
            class: "dc-type__open",
            onClick: (m) => T(t).activate(d.row, T(Be)(m))
          }, [
            $("span", su, [
              $("span", lu, I(d.parts.identity), 1),
              $("span", ru, I(d.parts.reference), 1)
            ])
          ], 8, au),
          $("span", ou, [
            (f(!0), h(ne, null, he(d.parts.metrics.slice(0, 1), (m) => (f(), J(Yt, {
              key: m.column.key ?? m.label,
              class: "dc-type__metric",
              entry: d,
              column: m.column
            }, {
              default: Qe(() => [
                $("span", iu, I(m.text), 1),
                $("span", cu, I(m.label), 1)
              ]),
              _: 2
            }, 1032, ["entry", "column"]))), 128)),
            d.parts.updated ? (f(), h("span", uu, I(d.parts.updated), 1)) : R("", !0),
            fe(bn, { entry: d }, null, 8, ["entry"]),
            fe(Qt, { entry: d }, null, 8, ["entry"])
          ])
        ]))), 128)),
        c.entity.create ? (f(), h("button", {
          key: 1,
          type: "button",
          class: "dc-type__new",
          onClick: (d) => T(t).create(c.entity)
        }, [
          i[1] || (i[1] = $("span", {
            class: "dc-type__plus",
            "aria-hidden": "true"
          }, "+", -1)),
          We(" " + I(c.entity.create), 1)
        ], 8, du)) : R("", !0)
      ], 8, Qc))), 128)),
      $e(r.$slots, "after", {}, void 0, !0)
    ], 8, jc));
  }
}), el = /* @__PURE__ */ ue(fu, [["__scopeId", "data-v-c7b8f990"]]), pu = ["data-dc-pending"], vu = {
  key: 1,
  class: "dc-results__state",
  role: "alert"
}, hu = { class: "dc-results__detail" }, mu = {
  key: 2,
  class: "dc-results__state",
  "aria-live": "polite"
}, gu = {
  key: 3,
  class: "dc-results__state"
}, _u = { class: "dc-results__detail" }, yu = /* @__PURE__ */ oe({
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
      "data-dc-pending": T(n).pending.value ? "true" : "false"
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
      ]), 1024)) : c.value ? (f(), h("p", vu, [
        y[1] || (y[1] = $("span", { class: "dc-results__headline" }, "Could not load results", -1)),
        $("span", hu, I(T(n).error.value instanceof Error ? T(n).error.value.message : "The data source failed."), 1)
      ])) : !i.value && T(n).pending.value ? (f(), h("p", mu, [...y[2] || (y[2] = [
        $("span", { class: "dc-results__detail" }, "Running query…", -1)
      ])])) : i.value ? (f(), J(Un(r.value), { key: 4 })) : (f(), h("div", gu, [
        y[3] || (y[3] = $("span", { class: "dc-results__headline" }, "Nothing matches this query", -1)),
        $("span", _u, I(T(n).summary.value), 1),
        T(n).isPristine.value ? R("", !0) : (f(), h("button", {
          key: 0,
          type: "button",
          class: "dc-results__clear",
          onClick: y[0] || (y[0] = (k) => T(n).clearFilters())
        }, I(T(n).isEverything.value ? "Clear filters" : "Search everything instead"), 1))
      ]))
    ], 8, pu));
  }
}), tl = /* @__PURE__ */ ue(yu, [["__scopeId", "data-v-c131c5c3"]]), wu = ["data-dc-theme"], ku = ["data-dc-width", "data-dc-align"], bu = { class: "dc-shell__panel" }, $u = /* @__PURE__ */ oe({
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
    const a = e, s = n, l = Ot(e, "open"), o = Ot(e, "pinned"), r = Ot(e, "selected"), i = Ut(), c = Et(ds, null), d = a.route || c ? null : ql(), m = a.route ?? c ?? d;
    De(() => d?.dispose?.());
    const y = v(() => br({ seed: a.schema.key })), k = v(() => a.source ?? y.value), x = zr({
      schema: () => a.schema,
      adapter: m,
      defaults: () => a.defaults,
      navigationMode: () => a.navigationMode,
      facetNavigationMode: () => a.facetNavigationMode
    }), b = v(() => a.within?.trim() ?? ""), _ = Rr({
      source: k,
      query: x.query,
      schema: v(() => a.schema),
      entity: x.entity,
      limit: v(() => a.limit),
      within: b
    });
    be(x.query, (M) => s("query-change", M)), be(
      [_.pageCount, _.pending, x.query],
      () => {
        if (_.pending.value) return;
        const M = _.pageCount.value;
        x.query.value.page > M && x.setPage(M, "replace");
      },
      // Immediately, since a pasted URL is past the end before anything changes;
      // and after the render, so the correction is a navigation the mounted shell
      // makes rather than one it makes on the way up. An async source is still
      // pending here and corrects itself when its count lands.
      { immediate: !0, flush: "post" }
    );
    const C = Hn() ?? "dc-query-panel", z = W(null);
    function D() {
      l.value && (l.value = !1, Vt(() => {
        z.value?.$el?.querySelector(".dc-header__toggle")?.focus();
      }));
    }
    const S = v(() => new Set(o.value));
    function P(M) {
      const O = new Set(S.value);
      O.has(M.id) ? O.delete(M.id) : O.add(M.id), o.value = [...O], s("toggle-pin", M);
    }
    const K = v(() => {
      if (a.selectable === !0) return !0;
      const M = x.entity.value;
      return !!(M?.duplicate || M?.delete);
    }), A = v(() => new Set(r.value));
    function w(M) {
      const O = new Set(A.value);
      O.has(M.id) ? O.delete(M.id) : O.add(M.id), r.value = [...O];
    }
    function V(M) {
      const O = new Set(A.value);
      for (const j of _.rows.value)
        M ? O.add(j.id) : O.delete(j.id);
      r.value = [...O];
    }
    function F() {
      r.value.length && (r.value = []);
    }
    const Y = v(() => ({
      ids: [...r.value],
      rows: _.rows.value.filter((M) => A.value.has(M.id)),
      entity: x.entity.value
    }));
    be(() => x.query.value.entity, F);
    function G(M, O, j = {}) {
      const le = $r(a.schema, x.query.value, M, j);
      j.exclude ? x.narrow(le, O?.key ?? x.query.value.entity) : x.narrow(le, O?.key ?? null, O ? void 0 : "cards"), s("drill", M, O, j);
    }
    const ge = xr({
      ...x,
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
      within: b,
      pinnable: v(() => a.pinnable === !0),
      isPinned: (M) => S.value.has(M.id),
      isPinnedId: (M) => S.value.has(M),
      togglePin: P,
      selectable: K,
      selection: Y,
      isSelected: (M) => A.value.has(M.id),
      toggleSelect: w,
      selectPage: V,
      clearSelection: F,
      narrowsOnPress: v(() => a.rowPress === "narrow"),
      /*
       * The one place a press is read, so every view gets the same answer without
       * knowing which of the two it is: they all call this.
       */
      activate: (M, O = {}) => {
        if (a.rowPress === "narrow" && ea(a.schema, M)) {
          G(M, null, O);
          return;
        }
        s("activate", M);
      },
      create: (M) => s("create", M),
      duplicate: () => s("duplicate", Y.value),
      delete: () => s("delete", Y.value),
      drill: G
    }), ie = v(() => {
      if (!(!a.accent && !a.tokens))
        return { ...a.tokens, ...a.accent ? { "--dc-accent": a.accent } : {} };
    });
    return t({
      query: x.query,
      openPanel: () => {
        l.value = !0;
      },
      closePanel: D
    }), (M, O) => (f(), h("div", {
      class: "dc-shell",
      "data-dc-theme": e.theme,
      style: Me(ie.value)
    }, [
      $("div", {
        class: "dc-shell__head",
        "data-dc-width": e.matchWidth,
        "data-dc-align": e.matchWidth === "shrink" ? e.headAlign : void 0
      }, [
        fe(Ks, {
          ref_key: "headerRef",
          ref: z,
          expanded: l.value,
          "panel-id": T(C),
          views: e.views,
          "pages-note": e.pagesNote,
          onToggle: O[0] || (O[0] = (j) => l.value = !l.value)
        }, on({ _: 2 }, [
          i.actions ? {
            name: "actions",
            fn: Qe(() => [
              $e(M.$slots, "actions", {}, void 0, !0)
            ]),
            key: "0"
          } : void 0
        ]), 1032, ["expanded", "panel-id", "views", "pages-note"]),
        l.value ? (f(), h(ne, { key: 0 }, [
          $("div", {
            class: "dc-shell__scrim",
            onClick: D
          }),
          $("div", bu, [
            fe(Ws, {
              "panel-id": T(C),
              onClose: D
            }, on({ _: 2 }, [
              i["panel-section"] ? {
                name: "panel-section",
                fn: Qe(() => [
                  $e(M.$slots, "panel-section", {}, void 0, !0)
                ]),
                key: "0"
              } : void 0
            ]), 1032, ["panel-id"])
          ])
        ], 64)) : R("", !0)
      ], 8, ku),
      fe(Us, { views: e.views }, null, 8, ["views"]),
      $e(M.$slots, "results", {
        rows: T(ge).rows.value,
        total: T(ge).total.value,
        offset: T(ge).offset.value,
        pageCount: T(ge).pageCount.value,
        query: T(ge).query.value,
        pending: T(ge).pending.value
      }, () => [
        fe(tl, { views: e.views }, on({ _: 2 }, [
          i["cards-before"] ? {
            name: "cards-before",
            fn: Qe(() => [
              $e(M.$slots, "cards-before", {}, void 0, !0)
            ]),
            key: "0"
          } : void 0,
          i["cards-after"] ? {
            name: "cards-after",
            fn: Qe(() => [
              $e(M.$slots, "cards-after", {}, void 0, !0)
            ]),
            key: "1"
          } : void 0
        ]), 1032, ["views"])
      ], !0)
    ], 12, wu));
  }
}), xu = /* @__PURE__ */ ue($u, [["__scopeId", "data-v-a366aa47"]]), Cu = ["data-dc-muted"], Su = {
  key: 0,
  class: "dc-shell-card__head"
}, Mu = { class: "dc-shell-card__title" }, Eu = {
  key: 0,
  class: "dc-shell-card__count dc-mono"
}, Pu = {
  key: 0,
  class: "dc-shell-card__aside"
}, Au = ["data-dc-flush"], Tu = {
  key: 2,
  class: "dc-shell-card__foot"
}, Lu = /* @__PURE__ */ oe({
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
      return d.some((m) => m.type === Ol ? !1 : m.type === Dl ? String(m.children ?? "").trim().length > 0 : m.type === ne ? l(m.children ?? []) : !0);
    }
    const o = v(() => !!t.title || r.value || s(a.head)), r = v(() => s(a.aside)), i = v(() => s(a.default)), c = v(() => s(a.foot));
    return (d, m) => (f(), h("section", {
      class: "dc-shell-card",
      style: Me(n.value),
      "data-dc-muted": e.muted ? "true" : "false"
    }, [
      o.value ? (f(), h("header", Su, [
        $e(d.$slots, "head", {}, () => [
          $("h2", Mu, I(e.title), 1),
          e.count !== void 0 ? (f(), h("span", Eu, I(e.count), 1)) : R("", !0)
        ], !0),
        r.value ? (f(), h("span", Pu, [
          $e(d.$slots, "aside", {}, void 0, !0)
        ])) : R("", !0)
      ])) : R("", !0),
      i.value ? (f(), h("div", {
        key: 1,
        class: "dc-shell-card__body",
        "data-dc-flush": e.flush ? "true" : "false"
      }, [
        $e(d.$slots, "default", {}, void 0, !0)
      ], 8, Au)) : R("", !0),
      c.value ? (f(), h("footer", Tu, [
        $e(d.$slots, "foot", {}, void 0, !0)
      ])) : R("", !0)
    ], 12, Cu));
  }
}), hf = /* @__PURE__ */ ue(Lu, [["__scopeId", "data-v-75f2ef0b"]]), zu = ["aria-label"], Ru = ["aria-checked", "data-dc-active", "tabindex", "onClick", "onKeydown"], Fu = /* @__PURE__ */ oe({
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
      }, I(i.label), 43, Ru))), 128))
    ], 8, zu));
  }
}), Nu = /* @__PURE__ */ ue(Fu, [["__scopeId", "data-v-63fb5482"]]), Iu = ["data-dc-theme", "aria-label"], Ou = ["aria-expanded", "aria-disabled", "disabled", "data-dc-menu", "tabindex", "onClick", "onMouseenter"], Du = /* @__PURE__ */ oe({
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
      () => n.menus.flatMap((S, P) => Dt(S) ? [P] : [])
    );
    function m(S, P) {
      const K = o.value[S]?.getBoundingClientRect(), A = n.menus[S];
      !K || !A || !Dt(A) || (i.value = { x: K.left, y: K.bottom + 2, mirrorX: K.right }, r.value = S, c.value = P);
    }
    function y(S) {
      const P = r.value;
      r.value = null, i.value = null, S && P !== null && o.value[P]?.focus();
    }
    function k(S) {
      r.value === S ? y(!0) : m(S, !1);
    }
    function x(S) {
      r.value === null || r.value === S || m(S, !1);
    }
    function b(S, P) {
      const K = d.value;
      if (K.length === 0) return null;
      if (S === null) return P === 1 ? K[0] ?? null : K[K.length - 1] ?? null;
      const A = K.indexOf(S);
      return A === -1 ? K[0] ?? null : K[(A + P + K.length) % K.length] ?? null;
    }
    function _(S) {
      const P = S.key;
      if (P === "Escape") {
        if (r.value === null) return;
        S.preventDefault(), y(!0);
        return;
      }
      if (P === "ArrowDown" && r.value === null) {
        const w = C();
        if (w === null) return;
        S.preventDefault(), m(w, !0);
        return;
      }
      if (P !== "ArrowLeft" && P !== "ArrowRight") return;
      const K = r.value ?? C(), A = b(K, P === "ArrowRight" ? 1 : -1);
      A !== null && (S.preventDefault(), r.value !== null ? m(A, !0) : o.value[A]?.focus());
    }
    function C() {
      const S = o.value.findIndex((P) => P === document.activeElement);
      return S === -1 ? d.value[0] ?? null : S;
    }
    function z(S) {
      const P = S.target;
      !P || l.value?.contains(P) || y(!1);
    }
    be(r, (S) => {
      S !== null ? window.addEventListener("pointerdown", z, !0) : window.removeEventListener("pointerdown", z, !0);
    }), De(() => window.removeEventListener("pointerdown", z, !0));
    function D(S) {
      y(!0), S.action?.(), s("choose", S);
    }
    return (S, P) => (f(), h("div", {
      ref_key: "bar",
      ref: l,
      class: "dc-shell dc-menubar",
      role: "menubar",
      "data-dc-theme": e.theme,
      "aria-label": e.label ?? "Main menu",
      style: Me(a.value),
      onKeydown: _
    }, [
      (f(!0), h(ne, null, he(e.menus, (K, A) => (f(), h("button", {
        key: K.id ?? K.label ?? A,
        ref_for: !0,
        ref: (w) => {
          w && (o.value[A] = w);
        },
        type: "button",
        class: "dc-menubar__item",
        role: "menuitem",
        "aria-haspopup": "menu",
        "aria-expanded": r.value === A,
        "aria-disabled": K.disabled ? "true" : void 0,
        disabled: K.disabled,
        "data-dc-menu": K.id ?? K.label,
        tabindex: A === (d.value[0] ?? 0) ? 0 : -1,
        onClick: (w) => k(A),
        onMouseenter: (w) => x(A)
      }, I(K.label), 41, Ou))), 128)),
      r.value !== null && i.value ? (f(), J(ua, {
        key: r.value,
        items: e.menus[r.value]?.items ?? [],
        at: i.value,
        label: e.menus[r.value]?.label,
        autofocus: c.value,
        onChoose: D,
        onDismiss: P[0] || (P[0] = (K) => y(!0))
      }, null, 8, ["items", "at", "label", "autofocus"])) : R("", !0)
    ], 44, Iu));
  }
}), mf = /* @__PURE__ */ ue(Du, [["__scopeId", "data-v-93dbd2e4"]]), Bu = ["aria-label", "aria-expanded", "disabled"], qu = { "aria-hidden": "true" }, Ku = /* @__PURE__ */ oe({
  __name: "MenuButton",
  props: {
    items: {},
    label: {},
    glyph: { default: "⋯" }
  },
  emits: ["choose"],
  setup(e, { emit: t }) {
    const n = t, a = W(null), s = W(null), l = W(null), o = W(!1), r = v(() => l.value !== null);
    function i(x) {
      const b = a.value?.getBoundingClientRect();
      b && (l.value = { x: b.left, y: b.bottom + 4, mirrorX: b.right }, o.value = x);
    }
    function c(x) {
      l.value = null, x && a.value?.focus();
    }
    function d() {
      r.value ? c(!0) : i(!1);
    }
    function m(x) {
      x.key !== "ArrowDown" || r.value || (x.preventDefault(), i(!0));
    }
    function y(x) {
      const b = x.target;
      b && (a.value?.contains(b) || s.value?.root?.contains(b) || c(!1));
    }
    be(r, (x) => {
      x ? window.addEventListener("pointerdown", y, !0) : window.removeEventListener("pointerdown", y, !0);
    }), De(() => window.removeEventListener("pointerdown", y, !0));
    function k(x) {
      c(!0), x.action?.(), n("choose", x);
    }
    return (x, b) => (f(), h(ne, null, [
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
        $("span", qu, I(e.glyph), 1)
      ], 40, Bu),
      l.value ? (f(), J(ua, {
        key: 0,
        ref_key: "menu",
        ref: s,
        items: e.items,
        at: l.value,
        label: e.label,
        autofocus: o.value,
        onChoose: k,
        onDismiss: b[0] || (b[0] = (_) => c(!0))
      }, null, 8, ["items", "at", "label", "autofocus"])) : R("", !0)
    ], 64));
  }
}), fa = /* @__PURE__ */ ue(Ku, [["__scopeId", "data-v-48f5ada5"]]), zt = (e) => e.kind === "split", X = (e) => e.kind === "group", ae = (e) => e.kind === "float", pt = { x: 16, y: 16, w: 360, h: 260 }, _n = 28, nl = 120, On = 220, al = 38, kt = 6;
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
function gf(e, t, n) {
  return {
    kind: "group",
    panels: e,
    ...t ? { active: t } : {},
    ...n ? { title: n } : {}
  };
}
const me = (e) => typeof e == "string", pa = (e) => me(e) ? Ze(e) : e, Jt = (e) => me(e) ? [e] : at(e), Ja = (e) => e.panels.filter(me), Vu = (e) => e.panels.filter((t) => !me(t)), Ie = (e, t) => e.panels.includes(t);
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
const ga = (e, t, n) => ma("row", e, t, n), _f = (e, t, n) => ma("column", e, t, n);
function ke(e) {
  return {
    ...e.title ? { title: e.title } : {},
    ...e.fixedView ? { fixedView: !0 } : {},
    ...e.headless ? { headless: !0 } : {}
  };
}
const mt = (e) => e.fixedView === !0 || e.headless === !0 || !!e.title, yf = (e) => ({ ...e, headless: !0 }), wf = (e) => ({ ...e, fixedView: !0 }), Wu = (e) => e === "left" || e === "right" ? "row" : "column";
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
function Hu(e) {
  const t = _a(e).flatMap(Hu);
  return X(e) ? [e, ...t] : t;
}
function Se(e, t) {
  if (X(e)) {
    for (const n of Vu(e)) {
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
function Uu(e, t, n) {
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
function ju(e, t, n = !0) {
  return Ct(e, t, ol(n));
}
function kf(e, t) {
  const n = Se(e, t);
  return n ? ju(e, t, !lt(n)) : e;
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
function Gu(e, t, n = !0) {
  return Ct(e, t, il(n));
}
function bf(e, t) {
  const n = Se(e, t);
  return n ? Gu(e, t, !ft(n)) : e;
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
function Xu(e, t, n = !0) {
  return ya(e, t, ol(n));
}
function Yu(e, t, n = !0) {
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
function Qu(e, t) {
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
function Zu(e, t, n) {
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
  if (s === void 0) return Zu(e, t, a);
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
    e.panels.forEach((x, b) => {
      if (me(x)) {
        x !== t && m.push(x);
        return;
      }
      const _ = o(x, b);
      _ && m.push(_);
    });
    const k = e.active && m.some((x) => Jt(x).includes(e.active)) ? e.active : Te(m[d] ?? m[m.length - 1]);
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
  if (X(e)) return Ju(e);
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
      c.children.forEach((k, x) => {
        a.push(k), s.push(d * (y[x] ?? 0));
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
function Ju(e) {
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
    (x) => ce(x, n) ? It(x, t, n, a, s) : x
  );
  if (a === "float") return e;
  const o = (k) => en(k, n, (x) => It(x, t, n, a, s));
  if (a === "center")
    return X(e) ? Ie(e, n) ? ul(e, t, s) : o(e) : ae(e) ? l(e) : {
      ...e,
      children: e.children.map(
        (k) => ce(k, n) ? It(k, t, n, a, s) : k
      )
    };
  const r = Wu(a), i = a === "left" || a === "top", c = (k) => ({
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
    const k = (d[m] ?? 0) / 2, x = [...e.children], b = [...d];
    return x.splice(i ? m : m + 1, 0, Ze(t)), b.splice(m, 1, k, k), {
      kind: "split",
      direction: r,
      children: x,
      sizes: b,
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
function $f(e, t, n) {
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
  const n = _a(e).map(fl), a = n.flat(), s = t && a.some((o) => Jt(o).includes(t)) ? t : void 0, l = ed(e, n);
  return xe({
    kind: "group",
    panels: a,
    ...s ? { active: s } : {},
    ...ke(e),
    ...l ? { places: l } : {}
  });
}
function ed(e, t) {
  const n = ae(e) ? e.frames.map(({ node: a, ...s }) => s) : He(e);
  if (n)
    return t.every((a) => a.length === 1) ? n : void 0;
}
function td(e, t) {
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
function nd(e, t, n) {
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
function xf(e, t, n) {
  const a = tn(
    e,
    t,
    (s) => ae(s) ? s : hl(s, n)
  );
  return a ? xe(a) : X(e) && Ie(e, t) ? ha([e], n) : e;
}
function ad(e, t) {
  const n = (s) => t === "column" ? s.rect.y : s.rect.x, a = (s) => t === "column" ? s.rect.x : s.rect.y;
  return [...e].sort((s, l) => n(s) - n(l) || a(s) - a(l));
}
function ml(e, t) {
  const n = ad(e.frames, t);
  return {
    kind: "split",
    direction: t,
    children: n.map((a) => a.node),
    ...ke(e),
    places: n.map(({ node: a, ...s }) => s)
  };
}
function Cf(e, t, n = "row") {
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
const sd = (e) => {
  const { title: t, fixedView: n, headless: a, ...s } = e;
  return s;
};
function ld(e, t) {
  const n = gl(e);
  return n ? t === "inner" ? n : { ...sd(n), ...ke(e) } : e;
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
  return t !== void 0 && !me(t) ? e : { ...ga([rd(e)]), ...ke(e) };
}
const rd = (e) => {
  if (!e.title) return e;
  const { title: t, ...n } = e;
  return n;
};
function rs(e) {
  return e.length === 0 ? null : ga(e.map(Ze));
}
function od(e, t) {
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
function id(e) {
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
const cd = ["data-dc-glyph"], ud = { class: "dc-glyph__line" }, dd = ["d"], fd = {
  key: 0,
  class: "dc-glyph__aqua"
}, pd = ["d"], vd = /* @__PURE__ */ oe({
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
      $("g", ud, [
        (f(!0), h(ne, null, he(t[e.kind], (l) => (f(), h("path", {
          key: l,
          d: l
        }, null, 8, dd))), 128))
      ]),
      n[e.kind] ? (f(), h("g", fd, [
        (f(!0), h(ne, null, he(n[e.kind], (l) => (f(), h("path", {
          key: l,
          d: l
        }, null, 8, pd))), 128))
      ])) : R("", !0)
    ], 8, cd));
  }
}), Mt = /* @__PURE__ */ ue(vd, [["__scopeId", "data-v-4d2872c0"]]), hd = ["data-dc-order", "data-dc-path", "data-dc-maximized", "data-dc-minimized", "data-dc-dragging"], md = ["data-dc-movable"], gd = { class: "dc-float__title dc-truncate" }, _d = {
  key: 1,
  class: "dc-float__controls dc-controls"
}, yd = ["aria-label", "aria-pressed", "data-dc-minimize"], wd = ["aria-label", "aria-pressed", "data-dc-maximize"], kd = ["aria-label", "data-dc-close"], bd = { class: "dc-float__content" }, $d = ["data-dc-handle", "onPointerdown"], xd = /* @__PURE__ */ oe({
  __name: "WindowFloat",
  props: {
    frame: {},
    path: {},
    order: {},
    place: {}
  },
  setup(e) {
    const t = e, n = $a(), a = v(() => Te(t.frame.node)), s = v(() => n.panelFor(a.value)?.fixed === !0), l = v(() => lt(t.frame)), o = v(() => ft(t.frame)), r = v(() => l.value || o.value), i = v(() => n.resizable.value && !s.value && !r.value), c = v(() => n.movable.value && !s.value && !r.value), d = v(() => {
      const P = at(t.frame.node);
      return P.length === 1 ? P[0] ?? null : null;
    }), m = v(() => d.value !== null && n.closable(d.value)), y = v(() => t.frame.node.headless === !0), k = v(
      () => !y.value && (!X(t.frame.node) || o.value)
    ), x = v(
      () => t.frame.title || Lt(t.frame.node) || Kt(t.frame.node, (P) => n.panelFor(P)?.title)
    ), b = v(() => n.spaceMenu(t.path));
    function _(P) {
      P.target?.closest("button, a, input, select, textarea, label") || n.beginFrameDragAt(t.path, P, "move");
    }
    function C(P) {
      P.target?.closest("button, a, input, select, textarea, label") || (o.value ? n.toggleMinimizeAt(t.path) : n.toggleMaximizeAt(t.path));
    }
    const z = v(() => {
      const P = n.framing.value;
      return P !== null && ce(t.frame.node, P);
    }), D = v(() => ({
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
    })), S = ["n", "s", "e", "w", "nw", "ne", "sw", "se"];
    return (P, K) => (f(), h("div", {
      class: "dc-float",
      style: Me(D.value),
      "data-dc-order": e.order,
      "data-dc-path": e.path.join("/"),
      "data-dc-maximized": l.value ? "true" : "false",
      "data-dc-minimized": o.value ? "true" : "false",
      "data-dc-dragging": z.value ? "true" : "false",
      onPointerdown: K[3] || (K[3] = (A) => T(n).raiseAt(e.path))
    }, [
      k.value ? (f(), h("header", {
        key: 0,
        class: "dc-float__bar",
        "data-dc-movable": c.value ? "true" : "false",
        onPointerdown: _,
        onDblclick: C
      }, [
        $("span", gd, I(x.value), 1),
        b.value.length ? (f(), J(fa, {
          key: 0,
          items: b.value,
          label: `${x.value} menu`
        }, null, 8, ["items", "label"])) : R("", !0),
        !s.value || o.value && m.value && d.value ? (f(), h("div", _d, [
          s.value ? R("", !0) : (f(), h("button", {
            key: 0,
            type: "button",
            class: "dc-float__button dc-control",
            "aria-label": `${o.value ? "Unroll" : "Minimize"} ${x.value}`,
            "aria-pressed": o.value,
            "data-dc-minimize": a.value,
            onClick: K[0] || (K[0] = (A) => T(n).toggleMinimizeAt(e.path))
          }, [
            fe(Mt, {
              kind: o.value ? "unroll" : "minimize"
            }, null, 8, ["kind"])
          ], 8, yd)),
          s.value ? R("", !0) : (f(), h("button", {
            key: 1,
            type: "button",
            class: "dc-float__button dc-control",
            "aria-label": `${l.value ? "Restore" : "Maximize"} ${x.value}`,
            "aria-pressed": l.value,
            "data-dc-maximize": a.value,
            onClick: K[1] || (K[1] = (A) => T(n).toggleMaximizeAt(e.path))
          }, [
            fe(Mt, {
              kind: l.value ? "restore" : "maximize"
            }, null, 8, ["kind"])
          ], 8, wd)),
          o.value && m.value && d.value ? (f(), h("button", {
            key: 2,
            type: "button",
            class: "dc-float__button dc-control",
            "aria-label": `Close ${x.value}`,
            "data-dc-close": d.value,
            onClick: K[2] || (K[2] = (A) => T(n).close(d.value))
          }, [
            fe(Mt, { kind: "close" })
          ], 8, kd)) : R("", !0)
        ])) : R("", !0)
      ], 40, md)) : R("", !0),
      $("div", bd, [
        $e(P.$slots, "default", {}, void 0, !0)
      ]),
      (f(!0), h(ne, null, he(i.value ? S : [], (A) => (f(), h("span", {
        key: A,
        class: "dc-float__grip",
        "data-dc-handle": A,
        "aria-hidden": "true",
        onPointerdown: ze((w) => T(n).beginFrameDragAt(e.path, w, A), ["stop"])
      }, null, 40, $d))), 128))
    ], 44, hd));
  }
}), Cd = /* @__PURE__ */ ue(xd, [["__scopeId", "data-v-f035684c"]]), xa = Symbol("dc.paneContext");
function Sd(e) {
  return Vn(xa, e), e;
}
function Sf() {
  return Et(xa, null);
}
function Mf(e) {
  const t = Et(ba, null), n = Et(xa, null);
  if (!t || !n) return () => {
  };
  const a = t.registerMenu(
    () => n.panel.value,
    () => Nt(e)
  );
  return us() && Wn(a), a;
}
const Md = ["data-dc-panel", "data-dc-panels", "data-dc-tabbed", "data-dc-floating", "data-dc-maximized", "data-dc-headless", "data-dc-active", "data-dc-dragging", "aria-label"], Ed = ["data-dc-movable"], Pd = ["aria-label", "aria-pressed"], Ad = ["data-dc-space-name"], Td = { class: "dc-truncate" }, Ld = ["aria-label"], zd = {
  key: 0,
  class: "dc-pane__insert",
  "aria-hidden": "true"
}, Rd = ["id", "data-dc-panel", "data-dc-space", "aria-selected", "aria-controls", "tabindex", "onPointerdown", "onClick", "onKeydown"], Fd = { class: "dc-tab__name dc-truncate" }, Nd = {
  key: 0,
  class: "dc-pane__sub dc-mono dc-truncate"
}, Id = ["aria-label", "data-dc-close", "onClick"], Od = {
  key: 0,
  class: "dc-pane__insert",
  "aria-hidden": "true"
}, Dd = { class: "dc-pane__tools" }, Bd = {
  key: 2,
  class: "dc-pane__controls dc-controls"
}, qd = ["aria-label", "data-dc-minimize"], Kd = ["aria-label", "aria-pressed", "data-dc-maximize"], Vd = ["aria-label", "data-dc-close"], Wd = ["id", "role", "aria-labelledby"], Hd = ["id", "role", "aria-labelledby"], Ud = ["data-dc-edge"], jd = /* @__PURE__ */ oe({
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
    }), r = v(() => o.value?.kind === "space" ? o.value.node : null), i = v(() => r.value ? "" : ll(t.group)), c = v(() => r.value ? null : n.panelFor(i.value)), d = v(() => o.value?.title ?? ""), m = v(() => n.spaceNames.value ? t.group.title ?? "" : ""), y = v(() => [...t.path, o.value?.index ?? 0]), k = v(() => i.value || Ja(t.group)[0] || ""), x = v(() => n.viewFor(i.value)), b = v(() => t.group.headless === !0), _ = v(() => n.focused.value === i.value), C = v(() => n.dragging.value === i.value), z = v(() => n.moving.value === i.value), D = v(() => n.frameOf(k.value) !== null), S = v(() => n.panelFor(k.value)?.fixed === !0), P = v(
      () => !r.value && (n.canMove(i.value) || D.value && n.movable.value && !S.value)
    ), K = v(
      () => r.value ? n.spaceMenu(y.value) : n.menuFor(i.value)
    ), A = (E) => n.closable(E);
    Sd({ panel: i });
    const w = v(() => n.maximized(k.value)), V = v(
      () => D.value && !S.value || !l.value && !!c.value && A(c.value.id)
    ), F = (E) => `${a}-tab-${E}`, Y = v(() => `${a}-body`), G = v(() => {
      const E = n.dropTarget.value;
      return !E || !Ie(t.group, E.panel) || E.edge === "float" ? null : E;
    }), ge = v(() => G.value?.index === void 0 ? G.value?.edge ?? null : null), ie = v(() => G.value?.index ?? null), M = () => c.value ? n.renderContent(c.value, x.value, _.value) ?? null : null, O = () => c.value ? n.renderActions(c.value, x.value, _.value) ?? null : null;
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
      i.value && n.focus(i.value), !E.target?.closest(".dc-tab, button, a, input, select, textarea, label") && (D.value ? n.beginFrameDrag(k.value, E, "move") : n.beginDrag(i.value, E));
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
      if (!z.value) return;
      if (E.key === "Escape") {
        E.preventDefault(), n.toggleMoveMode(i.value);
        return;
      }
      const U = qe[E.key];
      U && (E.preventDefault(), D.value ? n.nudgeFrame(i.value, U, E.shiftKey) : n.nudge(i.value, U, E.shiftKey));
    }
    function Ke(E) {
      !D.value || E.target?.closest(".dc-tab, button, a, input, select, textarea, label") || n.toggleMaximize(k.value);
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
      "data-dc-panels": T(Ja)(e.group).join(" ") || void 0,
      "data-dc-tabbed": l.value ? "true" : "false",
      "data-dc-floating": D.value ? "true" : "false",
      "data-dc-maximized": w.value ? "true" : "false",
      "data-dc-headless": b.value ? "true" : "false",
      "data-dc-active": _.value ? "true" : "false",
      "data-dc-dragging": C.value ? "true" : "false",
      "aria-label": d.value,
      onFocusin: U[7] || (U[7] = (se) => i.value && T(n).focus(i.value))
    }, [
      b.value ? R("", !0) : (f(), h("header", {
        key: 0,
        class: "dc-pane__head",
        "data-dc-movable": P.value ? "true" : "false",
        onPointerdown: Ue,
        onDblclick: Ke
      }, [
        P.value ? (f(), h("button", {
          key: 0,
          type: "button",
          class: "dc-pane__grip",
          "aria-label": `Move ${d.value}`,
          "aria-pressed": z.value,
          onPointerdown: je,
          onClick: Ge,
          onKeydown: Fe
        }, [...U[8] || (U[8] = [
          $("span", { "aria-hidden": "true" }, "⠿", -1)
        ])], 40, Pd)) : R("", !0),
        m.value ? (f(), h("span", {
          key: 1,
          class: "dc-pane__name",
          "data-dc-space-name": m.value
        }, [
          $("span", Td, I(m.value), 1)
        ], 8, Ad)) : R("", !0),
        $("div", {
          class: "dc-pane__tabs",
          role: "tablist",
          "aria-label": `${d.value} panels`
        }, [
          (f(!0), h(ne, null, he(s.value, (se, Ce) => (f(), h(ne, {
            key: se.id
          }, [
            ie.value === Ce ? (f(), h("span", zd)) : R("", !0),
            $("button", {
              id: F(se.id),
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
              $("span", Fd, I(se.title), 1),
              se.kind === "panel" && se.panel.subtitle ? (f(), h("span", Nd, I(se.panel.subtitle), 1)) : R("", !0),
              l.value && se.kind === "panel" && A(se.id) ? (f(), h("span", {
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
              ])], 40, Id)) : R("", !0)
            ], 40, Rd)
          ], 64))), 128)),
          ie.value === s.value.length ? (f(), h("span", Od)) : R("", !0)
        ], 8, Ld),
        $("div", Dd, [
          fe(O),
          K.value.length ? (f(), J(fa, {
            key: 0,
            items: K.value,
            label: `${d.value} menu`
          }, null, 8, ["items", "label"])) : R("", !0)
        ]),
        V.value ? (f(), h("div", Bd, [
          D.value && !S.value ? (f(), h("button", {
            key: 0,
            type: "button",
            class: "dc-pane__button dc-control",
            "aria-label": `Minimize ${d.value}`,
            "data-dc-minimize": k.value,
            onPointerdown: U[1] || (U[1] = ze(() => {
            }, ["stop"])),
            onClick: U[2] || (U[2] = (se) => T(n).toggleMinimize(k.value))
          }, [
            fe(Mt, { kind: "minimize" })
          ], 40, qd)) : R("", !0),
          D.value && !S.value ? (f(), h("button", {
            key: 1,
            type: "button",
            class: "dc-pane__button dc-control",
            "aria-label": `${w.value ? "Restore" : "Maximize"} ${d.value}`,
            "aria-pressed": w.value,
            "data-dc-maximize": k.value,
            onPointerdown: U[3] || (U[3] = ze(() => {
            }, ["stop"])),
            onClick: U[4] || (U[4] = (se) => T(n).toggleMaximize(k.value))
          }, [
            fe(Mt, {
              kind: w.value ? "restore" : "maximize"
            }, null, 8, ["kind"])
          ], 40, Kd)) : R("", !0),
          !l.value && c.value && A(c.value.id) ? (f(), h("button", {
            key: 2,
            type: "button",
            class: "dc-pane__close dc-control",
            "aria-label": `Close ${d.value}`,
            "data-dc-close": c.value.id,
            onPointerdown: U[5] || (U[5] = ze(() => {
            }, ["stop"])),
            onClick: U[6] || (U[6] = (se) => T(n).close(c.value.id))
          }, [
            fe(Mt, { kind: "close" })
          ], 40, Vd)) : R("", !0)
        ])) : R("", !0)
      ], 40, Ed)),
      r.value ? (f(), h("div", {
        key: 1,
        id: Y.value,
        class: "dc-pane__space",
        role: b.value ? void 0 : "tabpanel",
        "aria-labelledby": b.value ? void 0 : F(o.value.id)
      }, [
        $e(E.$slots, "space", {
          node: r.value,
          path: y.value
        }, void 0, !0)
      ], 8, Wd)) : (f(), h("div", {
        key: 2,
        id: Y.value,
        class: "dc-pane__body",
        role: b.value ? void 0 : "tabpanel",
        "aria-labelledby": b.value ? void 0 : F(i.value)
      }, [
        fe(M)
      ], 8, Hd)),
      ge.value ? (f(), h("div", {
        key: 3,
        class: "dc-pane__drop",
        "data-dc-edge": ge.value,
        "aria-hidden": "true"
      }, null, 8, Ud)) : R("", !0)
    ], 40, Md)) : R("", !0);
  }
}), _l = /* @__PURE__ */ ue(jd, [["__scopeId", "data-v-44fd2b2d"]]), Gd = ["data-dc-space", "data-dc-path", "aria-label"], Xd = {
  key: 0,
  class: "dc-space__head"
}, Yd = { class: "dc-space__title dc-truncate" }, Qd = ["data-dc-direction"], Zd = {
  key: 0,
  class: "dc-space__drop",
  "aria-hidden": "true"
}, Jd = ["aria-orientation", "aria-label", "aria-valuenow", "aria-disabled", "tabindex", "onPointerdown", "onKeydown"], ef = /* @__PURE__ */ oe({
  __name: "WindowNode",
  props: {
    node: {},
    path: {},
    framed: { type: Boolean }
  },
  setup(e) {
    const t = e, n = $a(), a = W(null), s = v(() => X(t.node) ? t.node : null), l = v(() => zt(t.node) ? t.node : null), o = v(() => ae(t.node) ? t.node : null), r = v(
      () => l.value ? l.value.children : o.value?.frames.map((M) => M.node) ?? []
    ), i = v(() => l.value ? nt(l.value) : []), c = v(
      () => (o.value?.frames ?? []).map((M, O) => ({
        held: M,
        /** Place in the stack, counted from the back — what `z-index` follows. */
        order: O,
        key: A(M.node),
        path: [...t.path, O]
      })).sort((M, O) => M.key < O.key ? -1 : M.key > O.key ? 1 : 0)
    ), d = v(() => Lt(t.node)), m = v(() => n.spaceMenu(t.path)), y = v(() => t.node.headless === !0), k = v(() => o.value ? "desktop" : l.value?.direction ?? ""), x = W(null), b = W(0);
    let _ = null;
    be(
      x,
      (M) => {
        _?.disconnect(), _ = null, !(!M || typeof ResizeObserver > "u") && (b.value = M.clientWidth, _ = new ResizeObserver(([O]) => {
          b.value = O?.contentRect.width ?? 0;
        }), _.observe(M));
      },
      { immediate: !0 }
    ), De(() => _?.disconnect());
    const C = v(() => {
      const M = Math.max(
        1,
        Math.floor((b.value + kt) / (On + kt))
      ), O = /* @__PURE__ */ new Map();
      let j = 0;
      for (const le of c.value)
        le.held.minimized === !0 && (O.set(le.key, {
          x: kt + j % M * (On + kt),
          bottom: kt + Math.floor(j / M) * (al + kt)
        }), j += 1);
      return O;
    }), z = (M) => !!M && M.join("/") === t.path.join("/"), D = v(() => {
      const M = n.dropTarget.value, O = o.value;
      if (!O || !M?.rect || M.edge !== "float") return null;
      if (M.space) return z(M.space) ? M.rect : null;
      const j = Se(O, M.panel);
      return j && O.frames.includes(j) ? M.rect : null;
    }), S = v(() => {
      const M = n.dropTarget.value;
      return !!M && !M.rect && z(M.space);
    }), P = v(() => l.value?.direction === "row"), K = v(() => r.value.map((M, O) => [...t.path, O])), A = (M) => [...at(M)].sort().join("/"), w = (M) => {
      const O = at(M)[0];
      return (O ? n.panelFor(O)?.title : null) ?? O ?? "panel";
    }, V = (M) => {
      const O = r.value[M], j = r.value[M + 1];
      return !O || !j ? "Resize panels" : `Resize ${w(O)} and ${w(j)}`;
    }, F = (M) => {
      const O = i.value[M] ?? 0, j = i.value[M + 1] ?? 0, le = O + j;
      return le > 0 ? Math.round(O / le * 100) : 50;
    };
    function Y() {
      const M = a.value, O = M ? P.value ? M.clientWidth : M.clientHeight : 0;
      return O <= 0 ? 0.05 : Math.min(n.minPanelSize.value / O, 0.4);
    }
    let G = null;
    function ge(M, O) {
      const j = l.value, le = a.value;
      if (!n.resizable.value || !j || !le || M.button !== 0) return;
      const _e = P.value ? le.clientWidth : le.clientHeight;
      if (_e <= 0) return;
      const Ee = P.value ? M.clientX : M.clientY, Le = nt(j), Ue = Math.min(n.minPanelSize.value / _e, 0.4);
      M.preventDefault();
      const je = (Fe) => {
        const Ke = ((P.value ? Fe.clientX : Fe.clientY) - Ee) / _e;
        n.setSizes(t.path, ls(Le, O, Ke, Ue));
      }, Ge = () => G?.(), qe = (Fe) => {
        Fe.key === "Escape" && (n.setSizes(t.path, Le), G?.());
      };
      G = () => {
        window.removeEventListener("pointermove", je), window.removeEventListener("pointerup", Ge), window.removeEventListener("pointercancel", Ge), window.removeEventListener("keydown", qe), G = null;
      }, window.addEventListener("pointermove", je), window.addEventListener("pointerup", Ge), window.addEventListener("pointercancel", Ge), window.addEventListener("keydown", qe);
    }
    De(() => G?.());
    function ie(M, O) {
      const j = l.value;
      if (!n.resizable.value || !j) return;
      const le = P.value ? "ArrowRight" : "ArrowDown", _e = P.value ? "ArrowLeft" : "ArrowUp", Ee = M.shiftKey ? 0.1 : 0.02;
      if (M.key !== le && M.key !== _e) return;
      const Le = M.key === le ? Ee : -Ee;
      M.preventDefault(), n.setSizes(t.path, ls(nt(j), O, Le, Y()));
    }
    return (M, O) => {
      const j = cs("WindowNode", !0);
      return s.value ? (f(), J(_l, {
        key: 0,
        group: s.value,
        path: e.path
      }, {
        space: Qe(({ node: le, path: _e }) => [
          fe(j, {
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
        !e.framed && !y.value ? (f(), h("header", Xd, [
          $("span", Yd, I(d.value), 1),
          m.value.length ? (f(), J(fa, {
            key: 0,
            items: m.value,
            label: `${d.value} menu`
          }, null, 8, ["items", "label"])) : R("", !0)
        ])) : R("", !0),
        o.value ? (f(), h("div", {
          key: 1,
          ref_key: "desktop",
          ref: x,
          class: "dc-window__desktop"
        }, [
          D.value ? (f(), h("div", {
            key: 0,
            class: "dc-window__drop",
            style: Me({
              left: `${D.value.x}px`,
              top: `${D.value.y}px`,
              width: `${D.value.w}px`,
              height: `${D.value.h}px`
            }),
            "aria-hidden": "true"
          }, null, 4)) : R("", !0),
          (f(!0), h(ne, null, he(c.value, (le) => (f(), J(Cd, {
            key: le.key,
            frame: le.held,
            path: le.path,
            order: le.order,
            place: C.value.get(le.key) ?? null
          }, {
            default: Qe(() => [
              fe(j, {
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
          S.value ? (f(), h("div", Zd)) : R("", !0),
          (f(!0), h(ne, null, he(r.value, (le, _e) => (f(), h(ne, {
            key: A(le)
          }, [
            $("div", {
              class: "dc-window__cell",
              style: Me({ flexGrow: i.value[_e] ?? 1 })
            }, [
              fe(j, {
                node: le,
                path: K.value[_e] ?? []
              }, null, 8, ["node", "path"])
            ], 4),
            _e < r.value.length - 1 ? (f(), h("div", {
              key: 0,
              class: "dc-window__gutter",
              role: "separator",
              "aria-orientation": P.value ? "vertical" : "horizontal",
              "aria-label": V(_e),
              "aria-valuenow": F(_e),
              "aria-valuemin": "0",
              "aria-valuemax": "100",
              "aria-disabled": T(n).resizable.value ? void 0 : "true",
              tabindex: T(n).resizable.value ? 0 : -1,
              onPointerdown: (Ee) => ge(Ee, _e),
              onKeydown: (Ee) => ie(Ee, _e)
            }, null, 40, Jd)) : R("", !0)
          ], 64))), 128))
        ], 8, Qd)) : R("", !0)
      ], 8, Gd));
    };
  }
}), tf = /* @__PURE__ */ ue(ef, [["__scopeId", "data-v-fb5b403f"]]), nf = ["data-dc-theme", "data-dc-dragging", "data-dc-docking"], af = {
  key: 1,
  class: "dc-window__empty"
}, sf = {
  class: "dc-window__live",
  "aria-live": "polite",
  role: "status"
}, rn = 16, lf = /* @__PURE__ */ oe({
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
    const a = e, s = n, l = Ot(e, "layout"), o = Ot(e, "views"), r = Ut(), i = v(() => new Map(a.panels.map((u) => [u.id, u]))), c = v(() => a.panels.map((u) => u.id)), d = v(() => od(l.value, c.value)), m = W(null), y = W(null), k = W(null), x = W(!0), b = W(null), _ = W(null), C = W(null), z = W(""), D = W(null);
    function S() {
      const u = D.value;
      return u ? [...u.querySelectorAll(".dc-pane[data-dc-panels]")].filter((g) => g.closest(".dc-window") === u).map((g) => ({ panels: (g.dataset.dcPanels ?? "").split(" "), element: g })) : [];
    }
    function P(u) {
      const p = [];
      let g = u.closest(".dc-float");
      for (; g; )
        p.unshift(Number(g.dataset.dcOrder ?? 0)), g = g.parentElement?.closest(".dc-float") ?? null;
      return p;
    }
    function K() {
      return S().map((u) => ({ pane: u, order: P(u.element) })).sort((u, p) => {
        const g = Math.max(u.order.length, p.order.length);
        for (let L = 0; L < g; L += 1) {
          const N = (u.order[L] ?? -1) - (p.order[L] ?? -1);
          if (N !== 0) return N;
        }
        return 0;
      }).map((u) => u.pane);
    }
    const A = (u) => S().find((p) => p.panels.includes(u)) ?? null;
    function w(u) {
      const p = i.value.get(u);
      if (!p) return "";
      const g = o.value[u];
      return g && p.views?.some((L) => L.key === g) ? g : p.defaultView ?? p.views?.[0]?.key ?? "";
    }
    function V(u, p) {
      o.value = { ...o.value, [u]: p }, s("view-change", { panel: u, view: p });
    }
    const F = v(
      () => a.panels.filter((u) => u.fixed !== !0).length
    );
    function Y(u) {
      return !a.movable || F.value < 1 || a.panels.length < 2 ? !1 : i.value.get(u)?.fixed !== !0;
    }
    function G(u, p) {
      const g = d.value;
      !u || !g || u === g || (l.value = u, p && s("panel-move", p));
    }
    function ge(u, p, g) {
      if (u.width <= 0 || u.height <= 0) return "center";
      const L = (p - u.left) / u.width, N = (g - u.top) / u.height, q = 0.3;
      return L > q && L < 1 - q && N > q && N < 1 - q ? "center" : [
        { edge: "left", distance: L },
        { edge: "right", distance: 1 - L },
        { edge: "top", distance: N },
        { edge: "bottom", distance: 1 - N }
      ].reduce(
        (re, H) => H.distance < re.distance ? H : re
      ).edge;
    }
    function ie(u, p) {
      const g = [...u.querySelectorAll(".dc-tab")], L = g.findIndex((N) => {
        const q = N.getBoundingClientRect();
        return p < q.left + q.width / 2;
      });
      return L === -1 ? g.length : L;
    }
    function M(u, p, g) {
      for (const { panels: L, element: N } of K().reverse()) {
        const q = N.getBoundingClientRect();
        if (u < q.left || u > q.right || p < q.top || p > q.bottom) continue;
        const pe = L.find((ee) => ee !== g), re = N.querySelector(".dc-pane__tabs"), H = re?.getBoundingClientRect();
        if (re && H && p >= H.top && p <= H.bottom)
          return pe ? { panel: pe, edge: "center", index: ie(re, u) } : null;
        const Z = N.querySelector(":scope > .dc-pane__space");
        if (Z) {
          const ee = Z.getBoundingClientRect();
          if (u >= ee.left && u <= ee.right && p >= ee.top && p <= ee.bottom) continue;
        }
        return pe ? { panel: pe, edge: ge(q, u, p) } : null;
      }
      return j(u, p, g) ?? Ee(u, p);
    }
    function O() {
      const u = D.value;
      return u ? [...u.querySelectorAll(".dc-window__desktop")].filter((p) => p.closest(".dc-window") === u).reverse() : [];
    }
    function j(u, p, g) {
      const L = d.value;
      if (!L) return null;
      for (const N of O()) {
        const q = N.getBoundingClientRect();
        if (u < q.left || u > q.right || p < q.top || p > q.bottom) continue;
        const pe = Le(N), re = pe.flatMap((de) => de.panels).find((de) => de !== g);
        if (!re && pe.length > 0) return null;
        const H = Se(L, g)?.rect, Z = Tn(
          {
            x: u - q.left - 24,
            y: p - q.top - 12,
            w: H?.w ?? pt.w,
            h: H?.h ?? pt.h
          },
          { w: N.clientWidth, h: N.clientHeight },
          a.minPanelSize
        );
        if (re) return { panel: re, edge: "float", rect: Z };
        const ee = le(N);
        return ee ? { panel: "", space: ee, edge: "float", rect: Z } : null;
      }
      return null;
    }
    function le(u) {
      const p = u.closest(".dc-space")?.getAttribute("data-dc-path");
      return p == null ? null : p === "" ? [] : p.split("/").map(Number);
    }
    function _e() {
      const u = D.value;
      return u ? [...u.querySelectorAll(".dc-space")].filter((p) => p.closest(".dc-window") === u).filter((p) => !p.querySelector(".dc-pane")).reverse().flatMap((p) => {
        const g = le(p);
        return g ? [{ element: p, path: g }] : [];
      }) : [];
    }
    function Ee(u, p) {
      for (const { element: g, path: L } of _e()) {
        if (g.dataset.dcSpace === "desktop") continue;
        const N = g.getBoundingClientRect();
        if (!(u < N.left || u > N.right || p < N.top || p > N.bottom))
          return { panel: "", space: L, edge: "center" };
      }
      return null;
    }
    function Le(u) {
      return S().filter(
        (p) => p.element.closest(".dc-window__desktop") === u
      );
    }
    let Ue = null;
    const je = (u) => u.altKey;
    function Ge(u, p) {
      if (!Y(u) || y.value || _.value || p.button !== 0) return;
      const g = p.clientX, L = p.clientY;
      let N = !1, q = je(p);
      const pe = () => {
        const ve = C.value;
        ve && (k.value = q ? j(ve.x, ve.y, u) : M(ve.x, ve.y, u));
      }, re = (ve) => {
        if (!N) {
          if (Math.hypot(ve.clientX - g, ve.clientY - L) < 4) return;
          N = !0, y.value = u, b.value = null;
        }
        q = je(ve), x.value = !q, C.value = { x: ve.clientX, y: ve.clientY }, pe();
      }, H = (ve) => {
        je(ve) !== q && (q = !q, x.value = !q, N && pe());
      }, Z = (ve) => {
        Ue?.();
        const te = k.value, Ae = d.value;
        if (ve && N && te && Ae) {
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
        y.value = null, k.value = null, C.value = null, x.value = !0;
      }, ee = () => Z(!0), de = () => Z(!1), ye = (ve) => {
        if (ve.key === "Escape") {
          Z(!1);
          return;
        }
        H(ve);
      };
      Ue = () => {
        window.removeEventListener("pointermove", re), window.removeEventListener("pointerup", ee), window.removeEventListener("pointercancel", de), window.removeEventListener("keydown", ye), window.removeEventListener("keyup", H), Ue = null;
      }, window.addEventListener("pointermove", re), window.addEventListener("pointerup", ee), window.addEventListener("pointercancel", de), window.addEventListener("keydown", ye), window.addEventListener("keyup", H);
    }
    De(() => Ue?.());
    let qe = null;
    function Fe(u) {
      const p = D.value;
      return p ? [...p.querySelectorAll(
        `.dc-float[data-dc-path="${u.join("/")}"]`
      )].find((N) => N.closest(".dc-window") === p)?.parentElement ?? null : null;
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
      const L = Te(g.node);
      if (i.value.get(L)?.fixed === !0) return;
      const N = !ft(g);
      let q = Yu(p, u, N);
      q !== p && (N || (q = Bt(q, u)), l.value = q, s("frame-minimize", { panel: L, minimized: N }));
    }
    function Pe(u) {
      const p = Ke(u);
      p && Ce(p);
    }
    function Rt(u) {
      const p = d.value, g = p ? dt(p, u) : null;
      if (!p || !g) return;
      const L = Te(g.node);
      if (i.value.get(L)?.fixed === !0) return;
      const N = !lt(g);
      let q = Xu(p, u, N);
      q !== p && (N && (q = Bt(q, u)), l.value = q, s("frame-maximize", { panel: L, maximized: N }));
    }
    function Ca(u) {
      const p = Ke(u);
      p && Rt(p);
    }
    function Sa(u, p, g) {
      const L = d.value, N = L ? dt(L, u) : null;
      if (!L || !N || p.button !== 0 || y.value || _.value) return;
      const q = Te(N.node);
      if (i.value.get(q)?.fixed === !0 || lt(N) || ft(N) || (g === "move" ? !a.movable : !a.resizable)) return;
      const pe = Fe(u), re = Qu(L, u);
      B(u);
      const H = { w: pe?.clientWidth ?? 0, h: pe?.clientHeight ?? 0 }, Z = { ...N.rect }, ee = p.clientX, de = p.clientY, ye = a.minPanelSize;
      _.value = q;
      const ve = (Ne) => {
        const Je = d.value;
        if (!Je) return;
        const Ft = ts(Je, re, Tn(Ne, H, ye));
        Ft !== Je && (l.value = Ft);
      }, te = (Ne) => {
        Ne.preventDefault();
        const Je = Ne.clientX - ee, Ft = Ne.clientY - de;
        ve(
          g === "move" ? { ...Z, x: Z.x + Je, y: Z.y + Ft } : es(Z, g, Je, Ft, ye)
        );
      }, Ae = (Ne) => {
        if (qe?.(), _.value = null, !Ne) {
          ve(Z);
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
      const L = Ke(u);
      L && Sa(L, p, g);
    }
    function wl(u, p, g = !1) {
      const L = d.value, N = Ke(u), q = L && N ? dt(L, N) : null;
      if (!L || !N || !q || i.value.get(u)?.fixed === !0 || (g ? !a.resizable : !a.movable)) return;
      if (lt(q) || ft(q)) {
        z.value = `${Xe(u)} is ${lt(q) ? "maximized" : "minimized"}, so it cannot be moved.`;
        return;
      }
      const pe = p === "left" ? -rn : p === "right" ? rn : 0, re = p === "up" ? -rn : p === "down" ? rn : 0, H = Fe(N), Z = { w: H?.clientWidth ?? 0, h: H?.clientHeight ?? 0 }, ee = g ? es(q.rect, "se", pe, re, a.minPanelSize) : { ...q.rect, x: q.rect.x + pe, y: q.rect.y + re }, de = ts(L, N, Tn(ee, Z, a.minPanelSize));
      if (de === L) {
        z.value = g ? `${Xe(u)} cannot be resized further.` : `${Xe(u)} cannot move ${p}.`;
        return;
      }
      l.value = de;
      const ye = dt(de, N);
      ye && (s("frame-change", { panel: u, rect: ye.rect }), z.value = g ? `${Xe(u)} resized to ${ye.rect.w} by ${ye.rect.h}.` : `${Xe(u)} moved to ${ye.rect.x}, ${ye.rect.y}.`);
    }
    De(() => qe?.());
    function kl(u, p) {
      const g = A(u), L = g?.element.getBoundingClientRect();
      if (!g || !L) return null;
      const N = p === "left" || p === "right", q = (H) => {
        if (!(N ? H.bottom > L.top + 1 && H.top < L.bottom - 1 : H.right > L.left + 1 && H.left < L.right - 1)) return null;
        const ee = p === "left" ? L.left - H.right : p === "right" ? H.left - L.right : p === "up" ? L.top - H.bottom : H.top - L.bottom;
        return ee < -1 ? null : ee;
      }, pe = [];
      for (const H of S()) {
        if (H === g || H.element === g.element) continue;
        const Z = q(H.element.getBoundingClientRect());
        if (Z === null) continue;
        const ee = H.panels.find((de) => de !== u);
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
    function bl(u) {
      const p = d.value ? Se(d.value, u) !== null : !1;
      if (!p && !Y(u)) return;
      b.value = b.value === u ? null : u;
      const g = Xe(u);
      if (!b.value) {
        z.value = `${g}: move mode off.`;
        return;
      }
      z.value = p ? `${g}: move mode on. Arrow keys move the window, shift and an arrow resize it, Escape leaves move mode.` : `${g}: move mode on. Arrow keys move the panel, shift and an arrow make it a tab of the panel that way, Escape leaves move mode.`;
    }
    const Xe = (u) => i.value.get(u)?.title ?? u, $l = {
      left: "left",
      right: "right",
      up: "top",
      down: "bottom"
    };
    function xl(u, p, g = !1) {
      if (!Y(u)) return;
      const L = d.value;
      if (!L) return;
      const N = Xe(u), q = xt(L, u);
      if (!g && q && (p === "left" || p === "right") && q.panels.length > 1) {
        const de = q.panels.indexOf(u), ye = p === "left" ? de - 1 : de + 1;
        if (ye >= 0 && ye < q.panels.length) {
          G(qt(L, u, ye), { panel: u, target: u, edge: "center", index: ye }), z.value = `${N} moved ${p}, now tab ${ye + 1} of ${q.panels.length}.`, Cn(u);
          return;
        }
      }
      const re = kl(u, p);
      if (!re || re.panel !== void 0 && !Y(re.panel)) {
        z.value = `${N} cannot move ${p}.`;
        return;
      }
      const H = $l[p];
      if (re.space) {
        const de = re.space, ye = it(L, de), ve = Se(L, u)?.rect, te = { ...pt, ...ve ? { w: ve.w, h: ve.h } : {} };
        G(as(L, u, de, te), { panel: u, target: "", space: de, edge: H }), z.value = `${N} moved ${p}, into ${ye ? Lt(ye) : "the space"}.`, Cn(u);
        return;
      }
      const Z = re.panel, ee = q?.panels.length === 1 && xt(L, Z)?.panels.length === 1;
      g ? (G(ln(L, u, Z, "center"), {
        panel: u,
        target: Z,
        edge: "center"
      }), z.value = `${N} joined ${Xe(Z)} as a tab.`) : ee ? (G(fn(L, u, Z), { panel: u, target: Z, edge: H }), z.value = `${N} moved ${p}, trading places with ${Xe(Z)}.`) : (G(ln(L, u, Z, H), { panel: u, target: Z, edge: H }), z.value = `${N} moved ${p}, beside ${Xe(Z)}.`), Cn(u);
    }
    function Cn(u) {
      Vt(() => {
        A(u)?.element.querySelector(".dc-pane__grip")?.focus();
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
      const g = p.id, L = xt(u, g), N = (L?.panels.length ?? 0) > 1, q = L?.fixedView === !0, pe = (ee) => ({
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
      return N && !q && H.push(
        { id: "show-row", label: "Row", checked: !1, ...pe(ss(u, g, "row")) },
        {
          id: "show-column",
          label: "Column",
          checked: !1,
          ...pe(ss(u, g, "column"))
        },
        // Already true, and nothing to collapse: these panes are tabs. Ticked
        // and choosable all the same — collapsing a strip into a strip hands
        // back the tree it was given, so it is the no-op it looks like.
        {
          id: "show-tabs",
          label: "Tabs",
          checked: !0,
          ...pe(td(u, g))
        },
        {
          id: "show-desktop",
          label: "Desktop",
          checked: !1,
          ...pe(nd(u, g))
        }
      ), N && L && (H.length && H.push({ separator: !0 }), H.push(...Aa(L, g))), { panel: re, tabs: H, tabsTitle: L ? Pa(L) : "" };
    }
    function Aa(u, p) {
      const g = yt(u), L = (N) => {
        const q = u.panels[(g + N + u.panels.length) % u.panels.length];
        return (q === void 0 ? "" : Te(q)) || p;
      };
      return [
        { id: "next-tab", label: "Next tab", action: () => Sn(L(1)) },
        { id: "previous-tab", label: "Previous tab", action: () => Sn(L(-1)) }
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
      const L = ae(g) ? "desktop" : g.direction, N = (te, Ae, st) => ({
        id: `show-${te}`,
        label: Ae,
        checked: L === te,
        action: () => {
          const ct = d.value, ut = st();
          !ct || ut === g || (l.value = yn(xe(ht(ct, u, ut))));
        }
      }), q = () => {
        const te = pl(g, Ll(g));
        if (X(te) && te.panels.length === 0) return g;
        const Ae = X(te) && te.panels.length === 1 ? te.panels[0] : void 0;
        return Ae !== void 0 && me(Ae) ? g : te;
      }, pe = (te) => () => ae(g) ? ml(g, te) : g.direction === te ? g : { ...g, direction: te }, re = u.slice(0, -1), H = u.length > 0 ? it(p, re) : null, Z = H && X(H) && H.panels.length > 1 ? H : null, ee = H && Ta(H) === g ? H : null, de = Ta(g), ye = g.title || "this space", ve = (te, Ae, st, ct, ut) => ({
        id: te,
        label: ut,
        action: () => {
          const Ne = d.value;
          Ne && (l.value = yn(xe(ht(Ne, Ae, ld(st, ct)))));
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
            N("row", "Row", pe("row")),
            N("column", "Column", pe("column")),
            // Everything in this space in one strip: the panes as tabs, and a
            // desktop among them as a tab of its own, keeping the windows on it.
            N("tabs", "Tabs", () => q()),
            N("desktop", "Desktop", () => ae(g) ? g : hl(g))
          ]
        },
        {
          id: "about-around",
          title: de ? `Around ${nn(de)}` : "",
          items: de ? [
            // Keeping this space's bar drops the one inside, so it is offered
            // only where the space inside has no name to be dropped with it.
            ...de.title ? [] : [ve("merge-around-keep-this", u, g, "outer", `Keep ${ye}`)],
            ...g.title ? [] : [ve("merge-around-keep-that", u, g, "inner", `Keep ${nn(de)}`)]
          ] : []
        },
        {
          id: "about-inside",
          title: ee ? `Inside ${nn(ee)}` : "",
          items: ee ? [
            ...g.title ? [] : [ve("merge-inside-keep-that", re, ee, "outer", `Keep ${nn(ee)}`)],
            ...ee.title ? [] : [ve("merge-inside-keep-this", re, ee, "inner", `Keep ${ye}`)]
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
      const L = a.menu ? Al(p, g) : null, N = Pl(u);
      N.length && L?.panel.length && N.push({ separator: !0 }), L && N.push(...L.panel);
      const q = Ea([
        { id: "about-panel", title: g.title, items: N },
        { id: "about-tabs", title: L?.tabsTitle ?? "", items: L?.tabs ?? [] }
      ]);
      return a.paneMenu ? a.paneMenu(g, q) : q;
    }
    function Rl(u, p) {
      return r[`${u}-${p}`] ?? r[u];
    }
    function La(u, p, g, L) {
      return Rl(u, p.id)?.({ panel: p, view: g, active: L });
    }
    id({
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
      moving: b,
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
      const u = y.value, p = C.value;
      return !u || !p ? null : Bl(
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
      move(u, p, g, L) {
        const N = d.value;
        N && G(ln(N, u, p, g, L), {
          panel: u,
          target: p,
          edge: g,
          ...L === void 0 ? {} : { index: L }
        });
      },
      /** Brings a panel's tab to the top of its group. */
      select(u) {
        const p = d.value;
        p && (l.value = St(p, u));
      },
      /** Lifts a panel onto the float holding `near`, as a window of its own. */
      float(u, p, g) {
        const L = d.value;
        L && G(ns(L, u, p, g), {
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
        const L = Uu(g, u, p);
        if (L === g) return;
        l.value = L;
        const N = Se(L, u);
        N && s("frame-change", { panel: u, rect: N.rect });
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
      ref: D,
      class: "dc-shell dc-window",
      "data-dc-theme": e.theme,
      "data-dc-dragging": y.value ? "true" : "false",
      "data-dc-docking": x.value ? "true" : "false",
      style: Me(Fl.value)
    }, [
      d.value ? (f(), J(tf, {
        key: 0,
        node: d.value,
        path: []
      }, null, 8, ["node"])) : (f(), h("p", af, " This window has no panels. ")),
      fe(Nl),
      $("p", sf, I(z.value), 1)
    ], 12, nf));
  }
}), rf = /* @__PURE__ */ ue(lf, [["__scopeId", "data-v-711565af"]]);
function Ef(e = "", t = "/") {
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
function Pf(e) {
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
const of = {
  DataShell: xu,
  ShellHeader: Ks,
  QueryPanel: Ws,
  RecordActions: Us,
  ResultsArea: tl,
  FacetControl: Vs,
  SegmentedControl: Nu,
  StatusPill: Xt,
  WindowFrame: rf,
  WindowPane: _l,
  ListView: In,
  CardsView: Gs,
  GridView: Xs,
  ImagesView: Ys,
  TableView: Js,
  LinksView: Qs,
  PreviewView: Zs,
  TypeCardsView: el
}, Af = {
  install(e, t = {}) {
    const n = t.prefix ?? "";
    for (const [a, s] of Object.entries(of))
      e.component(`${n}${a}`, s);
    t.route && e.provide(ds, t.route);
  }
};
export {
  _n as CASCADE_STEP,
  ff as COLUMN_BREAKPOINTS,
  df as COLUMN_ROLES,
  Gs as CardsView,
  Qa as ColumnCell,
  pt as DEFAULT_FRAME,
  zn as DEFAULT_SORT,
  Kl as DEFAULT_VIEW,
  xu as DataShell,
  Rn as EMPTY_CELL,
  Os as ENTITY_ALL,
  gn as ENTITY_TERM,
  Ht as EXPRESSION_TERM,
  ia as FACET_PREFIX,
  Vs as FacetControl,
  Xs as GridView,
  Af as HeaderContentLayoutPlugin,
  Ys as ImagesView,
  Qs as LinksView,
  In as ListView,
  kt as MINIMIZED_GAP,
  al as MINIMIZED_HEIGHT,
  On as MINIMIZED_WIDTH,
  nl as MIN_FRAME,
  Ha as MOCK_TINTS,
  mf as MenuBar,
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
  uf as SHELL_THEMES,
  Qt as ScopeMark,
  Nu as SegmentedControl,
  _t as SelectTick,
  hf as ShellCard,
  Ks as ShellHeader,
  Za as StandingControl,
  Xt as StatusPill,
  Js as TableView,
  el as TypeCardsView,
  fs as VIEW_KINDS,
  Vl as VIEW_LABELS,
  ba as WINDOW_CONTEXT_KEY,
  rf as WindowFrame,
  _l as WindowPane,
  ll as activePanel,
  yt as activeTab,
  ta as addTerm,
  Zn as andExpression,
  Wu as axisOf,
  ha as cascade,
  bs as cellFull,
  jt as cellText,
  un as cellTextOf,
  Oe as cellValue,
  Ra as changesResults,
  Tn as clampRect,
  pl as collapseSpace,
  td as collapseToTabs,
  _f as column,
  Na as columnAlign,
  Ia as columnClass,
  Fa as columnKey,
  xs as columnShortcut,
  lr as columnShortcutOf,
  Fn as columnTruncates,
  Xl as columnsFor,
  Hl as countPages,
  ql as createHistoryAdapter,
  Ef as createMemoryAdapter,
  br as createMockDataSource,
  Pf as createVueRouterAdapter,
  Zl as defaultCellText,
  rs as defaultLayout,
  Qn as defaultQuery,
  $r as drillExpression,
  as as dropIntoSpace,
  Tt as emptyFacetState,
  Gn as emptyFacetValue,
  Ls as excludingTerm,
  Ss as expandShortcuts,
  bt as findEntity,
  rt as findSort,
  wf as fixedView,
  va as float,
  ns as floatPanel,
  hl as floatSplit,
  nd as floatTabs,
  cn as fnv1a,
  vs as focusEntity,
  wt as formatCount,
  jl as formatDate,
  ot as formatExpression,
  Ul as formatMetric,
  Gl as formatOrdinal,
  Gt as formatTerm,
  $n as frame,
  dt as frameAt,
  Se as frameOf,
  qn as framePathOf,
  Te as frontPanel,
  yr as generateRows,
  gf as group,
  xt as groupOf,
  Hu as groups,
  _s as hasActiveFacets,
  ce as hasPanel,
  yf as headless,
  It as insertPanel,
  Dt as isChoosable,
  pf as isEntityScoped,
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
  ir as matchesExpression,
  wr as matchesFacets,
  ju as maximizeFrame,
  Xu as maximizeFrameAt,
  ld as mergeSpace,
  Gu as minimizeFrame,
  Yu as minimizeFrameAt,
  ln as movePanel,
  qt as moveTab,
  vf as negateTerm,
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
  Ar as parseQuery,
  ti as presentParts,
  js as presentRow,
  Be as pressOptions,
  Sd as providePaneContext,
  xr as provideShellContext,
  id as provideWindowContext,
  Ln as raiseFrame,
  Bt as raiseFrameAt,
  Qu as raisedPath,
  ws as reconcileFacets,
  od as reconcileLayout,
  Ts as recordTerm,
  fr as refineExpression,
  vt as removePanel,
  ht as replaceAt,
  es as resizeRect,
  ls as resizeSplit,
  jn as resolveView,
  Ve as roleColumn,
  ks as roleColumns,
  yn as rootSpace,
  ga as row,
  Ql as rowKey,
  wn as sameTerm,
  Jn as scopeTerm,
  ea as scopeTermFor,
  Ns as scopedEntity,
  Ga as serializeQuery,
  St as setActivePanel,
  Uu as setFrameRect,
  ts as setFrameRectAt,
  pn as setSizesAt,
  $f as setSplitDirection,
  nt as sizesOf,
  ms as sortsFor,
  ke as spaceChrome,
  Lt as spaceTitle,
  ma as split,
  ur as splitExpression,
  ss as spreadTabs,
  Lr as summarizeQuery,
  ca as summaryTerms,
  fn as swapPanels,
  pa as tabNode,
  Jt as tabPanels,
  zs as termStanding,
  ml as tileFloat,
  xf as toFloat,
  Cf as toTiled,
  kf as toggleMaximized,
  bf as toggleMinimized,
  xc as useColumns,
  Yr as useEntityCounts,
  Hc as useEntityPreviews,
  Sf as usePaneContext,
  Mf as usePaneMenu,
  gt as usePresentedRows,
  zr as useQueryState,
  Jr as useRecordNames,
  Rr as useResults,
  we as useShellContext,
  $a as useWindowContext,
  Ua as withStanding,
  Fs as withoutOwnScope,
  cr as withoutTerm
};
