import { ref as D, inject as Ot, provide as za, computed as p, toValue as Lt, shallowRef as ct, watch as Ce, onScopeDispose as Kt, getCurrentScope as Dn, defineComponent as te, onMounted as qn, onBeforeUnmount as Ve, resolveComponent as Qs, openBlock as d, createElementBlock as v, normalizeStyle as Me, Fragment as Z, renderList as fe, toDisplayString as R, createCommentVNode as A, createElementVNode as x, createBlock as G, nextTick as vt, useId as on, unref as P, normalizeClass as ht, Teleport as Fa, createVNode as oe, useSlots as Vt, renderSlot as _e, withDirectives as mt, withKeys as st, withModifiers as He, vModelText as An, createTextVNode as Te, withCtx as Pe, reactive as ws, resolveDynamicComponent as Hn, createSlots as xn, useModel as Yt, onBeforeUpdate as Rl, normalizeProps as zl, guardReactiveProps as Fl, mergeModels as Tn, vShow as Ln, Comment as Il, Text as Nl, getCurrentInstance as Bl, readonly as Ol, h as Dl, watchEffect as ql } from "vue";
const Ys = Symbol("dc.routeAdapter");
function We(e) {
  if (!e) return "";
  const t = e.replace(/^[?]/, "");
  return t ? `?${t}` : "";
}
function Hl() {
  const e = typeof window < "u", t = D(e ? We(window.location.search) : ""), n = D(e ? window.location.pathname : "/"), a = () => {
    t.value = We(window.location.search), n.value = window.location.pathname;
  };
  e && window.addEventListener("popstate", a);
  const s = (r, i) => {
    const o = We(r);
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
      return e ? `${window.location.pathname}${We(r)}${window.location.hash}` : `${n.value}${We(r)}`;
    },
    push: (r) => s(r, "push"),
    replace: (r) => s(r, "replace"),
    dispose: () => {
      e && window.removeEventListener("popstate", a);
    }
  };
}
const Zs = ["list", "cards", "grid", "images", "table", "links", "preview"], Mv = [
  "minimal",
  "mono-size",
  "dark",
  "light",
  "auto",
  "macos",
  "windows",
  "inherit"
], Xt = ["ok", "running", "queued", "review", "failed"], Ev = [...Xt, "neutral", "accent"], Pv = [
  "identity",
  "reference",
  "metric",
  "state",
  "updated",
  "image",
  "tint"
], Av = [480, 620, 760, 900, 1100], Kl = "cards", Vl = "table";
function sn(e, t = {}) {
  const n = (s) => s && Js(s) ? s : void 0;
  if (e === null) return n(t.view) ?? Kl;
  const a = t.landing === "entity" ? n(t.view) : void 0;
  return n(t.entityView) ?? a ?? Vl;
}
function ks(e, t, n, a = {}) {
  return e === sn(t, a) ? sn(n, a) : e;
}
const ya = "updated";
function Js(e) {
  return typeof e == "string" && Zs.includes(e);
}
const Wl = {
  list: "List",
  cards: "Cards",
  grid: "Grid",
  images: "Images",
  table: "Table",
  links: "Links",
  preview: "Preview"
};
function Kn(e, t) {
  const [n] = t ?? [];
  return n === void 0 || t?.includes(e) ? e : n;
}
function Rt(e, t) {
  return t ? e.entities.find((n) => n.key === t) ?? null : null;
}
function er(e, t = {}) {
  const n = Rt(e, t.entity), a = e.entities[0];
  if (!n && !a) throw new Error(`Schema "${e.key}" declares no entities`);
  return n ?? a;
}
function tr(e, t = null) {
  return e?.columns ?? t?.columns ?? [];
}
function nr(e, t = null) {
  if (e?.sorts?.length) return e.sorts;
  const n = /* @__PURE__ */ new Set(), a = [];
  for (const s of tr(e, t))
    !s.sort || n.has(s.sort) || (n.add(s.sort), a.push({ key: s.sort, label: (s.label ?? s.sort).toLowerCase() }));
  return a;
}
const jl = { key: ya, label: ya };
function ft(e, t, n = null) {
  const a = nr(e, n);
  return (t ? a.find((r) => r.key === t) : void 0) ?? a.find((r) => r.key === ya) ?? a[0] ?? jl;
}
function Ia(e) {
  switch (e.kind) {
    case "chips":
      return { kind: "chips", selected: [] };
    case "range":
      return { kind: "range", min: null, max: null };
    case "toggle":
      return { kind: "toggle", on: !1 };
  }
}
function Dt(e) {
  const t = {};
  for (const n of e?.facets ?? []) t[n.key] = Ia(n);
  return t;
}
function ar(e) {
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
function sr(e) {
  return Object.values(e).some(ar);
}
function Na(e) {
  return e.entity === null && e.expr.trim() === "" && !sr(e.facets);
}
function Tv(e) {
  return e.entity !== null;
}
function Ba(e, t) {
  return e.entity === null && Kn(e.view, t) === "cards";
}
function Ul(e, t) {
  return t <= 0 ? 1 : Math.max(1, Math.ceil(e / t));
}
function Oa(e, t = {}) {
  const a = t.landing === "entity" ? er(e, t) : null;
  return {
    entity: a?.key ?? null,
    view: sn(a?.key ?? null, t),
    sort: ft(a, t.sort).key,
    dir: t.dir === "asc" ? "asc" : "desc",
    expr: "",
    facets: Dt(a),
    page: 1
  };
}
const Da = ["entity", "sort", "dir", "expr", "facets"];
function sa(e) {
  return Da.some((t) => t in e);
}
function rr(e, t) {
  const n = {};
  for (const a of e?.facets ?? []) {
    const s = t[a.key];
    n[a.key] = s && s.kind === a.kind ? s : Ia(a);
  }
  return n;
}
function Zt(e) {
  let t = 2166136261;
  for (let n = 0; n < e.length; n++)
    t ^= e.charCodeAt(n), t = Math.imul(t, 16777619);
  return Math.abs(t);
}
function Gl(e) {
  if (!Number.isFinite(e)) return "—";
  const t = Math.abs(e);
  return t >= 1e6 ? `${(e / 1e6).toFixed(1)}m` : t >= 1e3 ? `${(e / 1e3).toFixed(1)}k` : String(Math.round(e));
}
function Pt(e) {
  return Number.isFinite(e) ? Math.round(e).toLocaleString("en-US") : "—";
}
function Xl(e) {
  const t = new Date(e);
  if (Number.isNaN(t.getTime())) return "—";
  const n = String(t.getUTCDate()).padStart(2, "0"), a = String(t.getUTCMonth() + 1).padStart(2, "0");
  return `${n}.${a}.${t.getUTCFullYear()}`;
}
function Ql(e) {
  return String(e + 1).padStart(2, "0");
}
function Lv(e, t) {
  if (!e) return "—";
  const n = new Date(e);
  return Number.isNaN(n.getTime()) ? "—" : n.toLocaleString(t, {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  });
}
function Yl(e) {
  if (e == null || !Number.isFinite(e) || e < 0) return "—";
  if (e < 1e3) return `${e} B`;
  const t = ["kB", "MB", "GB", "TB"];
  let n = e, a = -1;
  for (; n >= 1e3 && a < t.length - 1; )
    n /= 1e3, a += 1;
  return `${n < 100 ? n.toFixed(1) : Math.round(n)} ${t[a]}`;
}
function Zl(e) {
  if (!e || !Number.isFinite(e)) return "—";
  if (e < 1e3) return `${Math.round(e)}ms`;
  const t = e / 1e3;
  return t < 60 ? `${t.toFixed(1)}s` : `${Math.floor(t / 60)}m ${Math.round(t % 60)}s`;
}
function Jl(e) {
  if (e == null || !Number.isFinite(e) || e <= 0)
    return "—";
  const t = Math.floor(e / 60);
  return t ? `${t}:${String(e % 60).padStart(2, "0")}` : `${e}s`;
}
function eo(e) {
  return e == null || !Number.isFinite(e) ? "—" : `${Math.round(e * 100)}%`;
}
function to(e) {
  return e.replace(/\x1b\[[0-9;?]*[ -/]*[@-~]/g, "");
}
const rt = "—";
function Ze(e, t) {
  return e.find((n) => n.role === t);
}
function lr(e, t) {
  return e.filter((n) => n.role === t);
}
function no(e, t) {
  const n = (t ? t.columns : e?.columns) ?? [], a = t ? "scoped" : "everything";
  return n.filter(
    (s) => s.role !== "tint" && ((s.when ?? "always") === "always" || s.when === a)
  );
}
const ao = ["id", "entityKey", "entityLabel"];
function Ke(e, t) {
  if (e.value) return e.value(t);
  const n = e.field ?? e.key;
  if (n !== void 0) {
    if (t.fields && n in t.fields) return t.fields[n];
    if (ao.includes(n))
      return t[n];
  }
}
function bs(e, t) {
  const n = e.key ?? e.field ?? e.label;
  return n?.trim() ? n.trim() : `column-${t}`;
}
function so(e, t) {
  return e.id?.trim() ? e.id : `${e.entityKey || "row"}-${t}`;
}
function ro(e, t) {
  if (e == null || e === "") return rt;
  if (t === "number") {
    const n = typeof e == "number" ? e : Number(e);
    return Number.isFinite(n) ? Gl(n) : String(e);
  }
  return t === "date" ? Xl(String(e)) : Array.isArray(e) ? e.length ? e.join(", ") : rt : String(e);
}
function qt(e, t) {
  const n = Ke(e, t);
  return e.format ? e.format(n, t) : ro(n, e.kind);
}
function lo(e) {
  return typeof e == "number" ? Number.isFinite(e) ? String(e) : "" : typeof e == "string" ? e : Array.isArray(e) ? e.join(", ") : "";
}
function or(e, t) {
  const n = qt(e, t), a = lo(Ke(e, t));
  return a && a !== n ? a : n;
}
function Cn(e, t) {
  return e ? qt(e, t) : "";
}
function $s(e) {
  return e.align ? e.align : e.kind === "number" || e.kind === "ordinal" ? "right" : "left";
}
const oo = {
  ordinal: "dc-table__num",
  number: "dc-table__number",
  date: "dc-table__date",
  status: "dc-table__state"
};
function xs(e) {
  return [oo[e.kind ?? "text"], e.class].filter(Boolean).join(" ");
}
function _a(e) {
  if (e.truncate !== void 0) return e.truncate;
  const t = e.kind ?? "text";
  return t === "text" || t === "number" || t === "date";
}
const io = /^([A-Za-z_][\w.-]*)\s*(>=|<=|:|=|>|<)\s*(.*)$/;
function co(e) {
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
  for (const s of co(t)) {
    const r = s.toUpperCase();
    if (r === "AND" || r === "&&") continue;
    if (r === "OR" || r === "||") {
      a.length && n.push(a), a = [];
      continue;
    }
    const i = s.length > 1 && s.startsWith("-"), o = i ? s.slice(1) : s, l = i ? { negated: !0 } : {}, c = io.exec(o);
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
const zt = (e) => e.toLowerCase().replace(/\s+/g, ""), ir = [
  ["status", "state"],
  ["state", "state"],
  ["updated", "updated"],
  ["date", "updated"],
  ["name", "identity"],
  ["ref", "reference"]
];
function uo(e, t, n) {
  const a = zt(e), s = n.columns ?? [];
  if (a === "entity") return t.entityKey;
  if (e in t.fields) return t.fields[e];
  const r = s.find(
    (c) => c.key?.toLowerCase() === e.toLowerCase() || c.field?.toLowerCase() === e.toLowerCase() || c.label !== void 0 && zt(c.label) === a
  );
  if (r) return Ke(r, t);
  const i = n.facets.find((c) => zt(c.label) === a);
  if (i && i.key in t.fields) return t.fields[i.key];
  const o = ir.find(([c]) => c === a)?.[1];
  if (o) {
    const c = Ze(s, o);
    if (c) return Ke(c, t);
  }
  const l = /^metric(\d+)$/.exec(a);
  if (l) {
    const c = lr(s, "metric")[Number(l[1]) - 1];
    if (c) return Ke(c, t);
  }
}
function cr(e) {
  return (e.toLowerCase().match(/[\p{L}\p{N}]+/gu) ?? []).map((t) => t.charAt(0)).join("");
}
const Cs = /^[a-z_][\w.-]*$/;
function ur(e) {
  const t = (e.key ?? e.field)?.toLowerCase();
  if (t !== void 0) return Cs.test(t) ? t : void 0;
  const n = e.label === void 0 ? void 0 : zt(e.label);
  return n !== void 0 && Cs.test(n) ? n : void 0;
}
function fo(e, t) {
  const n = zt(e);
  if (n === "entity" || ir.some(([s]) => s === n) || /^metric\d+$/.test(n)) return !0;
  const a = (s) => s !== void 0 && zt(s) === n;
  return (t.columns ?? []).some(
    (s) => a(s.key) || a(s.field) || a(s.label)
  ) || t.facets.some((s) => a(s.key) || a(s.label));
}
function Rn(e, t) {
  if (!t) return e;
  let n = !1;
  const a = Ne(e).map(
    (s) => s.map((r) => {
      if (r.kind !== "field") return r;
      const i = dr(r.field, t), o = i && ur(i);
      return o ? (n = !0, { ...r, field: o }) : r;
    })
  );
  return n ? ot(a) : e;
}
function dr(e, t) {
  if (!(!e || fo(e, t)))
    return (t.columns ?? []).find(
      (n) => n.label !== void 0 && cr(n.label) === e
    );
}
function po(e, t) {
  if (!t || e.label === void 0 || !ur(e)) return;
  const n = cr(e.label);
  return dr(n, t) === e ? n : void 0;
}
function ra(e, t) {
  const n = e.toLowerCase(), a = t.toLowerCase();
  if (!a.includes("*")) return n.includes(a);
  const s = a.replace(/[.+?^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*");
  return new RegExp(s).test(n);
}
function Ss(e, t) {
  return e.toLowerCase() === t.toLowerCase();
}
function vo(e, t, n, a) {
  if (e.kind === "text") {
    const o = n.columns ?? [];
    return ["identity", "reference"].some((l) => {
      const c = Ze(o, l), u = c ? Ke(c, t) : void 0;
      return typeof u == "string" && ra(u, e.value);
    });
  }
  const s = uo(e.field, t, n);
  if (s === void 0) return a?.has(e.field) ? !1 : null;
  if (Array.isArray(s))
    return e.comparator === ":" || e.comparator === "=" ? s.some(
      (l) => e.comparator === "=" ? Ss(String(l), e.value) : ra(String(l), e.value)
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
    return e.comparator === "=" ? Ss(String(s), e.value) : ra(String(s), e.value);
  }
  const r = Number(e.value), i = typeof s == "number" ? s : Number(s);
  return !Number.isFinite(r) || !Number.isFinite(i) ? null : ho(e.comparator, i, r);
}
function Ms(e, t, n, a) {
  const s = vo(e, t, n, a);
  return s === null ? !0 : e.negated ? !s : s;
}
function ho(e, t, n) {
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
function Es(e) {
  return e.kind === "field" && !e.negated && (e.comparator === ":" || e.comparator === "=");
}
const Ps = /* @__PURE__ */ new WeakMap();
function mo(e) {
  if (!e?.strictScopes) return null;
  let t = Ps.get(e);
  return t || (t = new Set(
    e.entities.flatMap((n) => n.scope ? [n.scope.toLowerCase()] : [])
  ), Ps.set(e, t)), t;
}
function go(e, t, n, a) {
  if (!e.length) return !0;
  const s = mo(a);
  return e.some((r) => {
    const i = /* @__PURE__ */ new Map();
    for (const o of r)
      Es(o) && i.set(
        o.field,
        (i.get(o.field) ?? !1) || Ms(o, t, n, s)
      );
    return r.every(
      (o) => Es(o) ? i.get(o.field) === !0 : Ms(o, t, n, s)
    );
  });
}
function As(e) {
  return /[\s"']/.test(e) ? `"${e.replace(/["']/g, "")}"` : e;
}
function cn(e) {
  const t = e.negated ? "-" : "";
  return e.kind === "text" ? t + As(e.value) : `${t}${e.field}${e.comparator}${As(e.value)}`;
}
function yo(e) {
  if (!e.negated) return { ...e, negated: !0 };
  const { negated: t, ...n } = e;
  return n;
}
function ot(e) {
  return e.filter((t) => t.length).map((t) => t.map(cn).join(" ")).join(" OR ");
}
function _o(e, t, n) {
  return e.map((a, s) => s === t ? a.filter((r, i) => i !== n) : a).filter((a) => a.length);
}
function wo(e) {
  const t = Ne(e);
  if (t.length > 1) return { parts: [], text: e.trim() };
  const n = t[0] ?? [];
  return {
    parts: n.filter((a) => a.kind === "field"),
    text: n.filter((a) => a.kind === "text").map(cn).join(" ")
  };
}
function Ts(e, t) {
  return [...e.map(cn), t.trim()].filter(Boolean).join(" ");
}
const Ls = (e, t) => e.toLowerCase() === t.toLowerCase();
function wa(e, t) {
  return !!e.negated == !!t.negated && fr(e, t);
}
function ko(e, t) {
  return !!e.negated != !!t.negated && fr(e, t);
}
function fr(e, t) {
  return e.kind === "field" ? t.kind === "field" && e.field === t.field && e.comparator === t.comparator && Ls(e.value, t.value) : t.kind === "text" && Ls(e.value, t.value);
}
function bo(e, t) {
  return t.filter((n) => !e.some((a) => wa(a, n)));
}
function qa(e, t) {
  return pr(e, t, (n) => n);
}
function ka(e, t) {
  return pr(
    e,
    t,
    (n, a) => n.filter((s) => !a.some((r) => ko(s, r)))
  );
}
const $o = /^[A-Za-z_][\w.-]*\s*(?:>=|<=|:|=|>|<)$/;
function xo(e) {
  return ot(
    Ne(e).map(
      (t) => t.filter(
        (n) => n.kind !== "text" || n.value !== "-" && !$o.test(n.value)
      )
    ).filter((t) => t.length > 0)
  );
}
function pr(e, t, n) {
  const a = Ne(e), s = Ne(t);
  return a.length ? s.length ? ot(
    a.flatMap(
      (r) => s.map((i) => [...n(r, i), ...bo(r, i)])
    )
  ) : ot(a) : ot(s);
}
function Co(e, t) {
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
const vr = (e) => e.kind === "date" || e.role === "updated";
function So(e) {
  if (!e) return () => 0;
  const n = (e.kind ?? "text") === "number" || e.role === "metric", a = vr(e);
  return (s, r) => {
    const i = Ke(e, s), o = Ke(e, r);
    return n ? Number(o ?? 0) - Number(i ?? 0) : a ? Date.parse(String(o ?? "")) - Date.parse(String(i ?? "")) : String(o ?? "").localeCompare(String(i ?? ""));
  };
}
function Rs(e, t) {
  return !t || !vr(t) ? !1 : !Number.isFinite(Date.parse(String(Ke(t, e) ?? "")));
}
function hr({ query: e, schema: t, entity: n, limit: a, offset: s }, r, i) {
  const o = Ne(e.expr), l = n ? [n] : t.entities;
  let c = 0;
  const u = [];
  for (const $ of l)
    for (const k of r($))
      c += 1, (n ? Co(k, e.facets) : !0) && go(o, k, $, t) && u.push(k);
  const y = ft(n, e.sort, t), b = tr(n, t).find(($) => $.sort === y.key), g = i.undatedLast ? u.filter(($) => !Rs($, b)) : u, m = i.undatedLast ? u.filter(($) => Rs($, b)) : [];
  g.sort(So(b)), e.dir === "asc" && g.reverse();
  const _ = m.length ? [...g, ...m] : g;
  return {
    // One page out of the middle. `total` stays the whole match, which is what
    // the shell counts pages with.
    rows: i.zeroIsAll && a <= 0 ? _.slice(s) : _.slice(s, s + a),
    total: u.length,
    unfiltered: u.length === c
  };
}
const zn = [
  "oklch(0.36 0.06 240)",
  "oklch(0.34 0.07 290)",
  "oklch(0.36 0.06 160)",
  "oklch(0.38 0.06 80)",
  "oklch(0.35 0.07 30)",
  "oklch(0.34 0.05 200)"
];
function Rv(e) {
  return zn[Zt(e) % zn.length];
}
function mr(e, t) {
  return `${e}_${1e4 + t * 7}`;
}
const Mo = 7, Eo = 3;
function Po(e, t, n, a) {
  const s = (t * Mo + Zt(n)) % a, r = [];
  for (let i = 0; i < Math.min(Eo, a); i++)
    r.push(mr(e, (s + i) % a));
  return r;
}
function Ao(e, t) {
  switch (e.kind) {
    case "chips":
      return e.multiple ? To(e.options, t) : e.options[t % e.options.length] ?? "";
    case "range": {
      const n = Math.max(0, e.max - e.min);
      return e.min + (n === 0 ? 0 : t % (n + 1));
    }
    case "toggle":
      return t % 3 === 0;
  }
}
function To(e, t) {
  if (!e.length) return [];
  const n = 1 + (t >> 5) % Math.min(3, e.length), a = t % e.length, s = /* @__PURE__ */ new Set();
  for (let r = 0; r < n; r++) s.add((a + r) % e.length);
  return [...s].sort((r, i) => r - i).map((r) => e[r]);
}
function Lo(e, t) {
  const { hash: n, sample: a, revision: s, updatedAt: r } = t, i = s ? ` · rev ${s + 1}` : "";
  switch (e.role) {
    case "identity":
      return `${a[0]}${i}`;
    case "reference":
      return s ? `${a[1]}-${s + 1}` : a[1];
    case "state":
      return Xt[n % Xt.length];
    case "updated":
      return r;
    case "tint":
      return zn[n % zn.length];
    case "metric":
      return 1 + n % 940;
  }
  switch (e.kind) {
    case "number":
      return 1 + n % 940;
    case "status":
      return Xt[n % Xt.length];
    case "date":
      return r;
    default:
      return;
  }
}
function Ro(e, t = {}) {
  const n = t.population ?? 48, a = t.seed ?? "", s = t.now ?? /* @__PURE__ */ new Date("2026-08-25T00:00:00Z"), r = e.samples, i = t.scopes ?? [];
  if (!r.length) return [];
  const o = [];
  for (let l = 0; l < n; l++) {
    const c = r[l % r.length], u = Math.floor(l / r.length), y = Zt(`${a}:${e.key}:${c[0]}:${l}`), b = mr(e.key, l), g = new Date(s.getTime() - y % 900 * 36e5).toISOString(), m = {};
    for (const _ of e.columns ?? []) {
      const $ = _.field ?? _.key;
      if (!$ || _.value) continue;
      const k = Lo(_, {
        hash: Zt(`${y}:${$}`),
        sample: c,
        revision: u,
        updatedAt: g
      });
      k !== void 0 && (m[$] = k);
    }
    for (const _ of e.facets)
      m[_.key] = Ao(_, Zt(`${y}:${_.key}`));
    for (const [_, $] of i)
      m[_] = $ === e.key ? b : Po($, l, _, n);
    o.push({ id: b, entityKey: e.key, entityLabel: e.label, fields: m });
  }
  return o;
}
function zo(e = {}) {
  const t = /* @__PURE__ */ new Map(), n = (a, s) => {
    const r = t.get(a.key);
    if (r) return r;
    const i = e.scopes ?? s.entities.flatMap(
      (l) => l.scope ? [[l.scope, l.key]] : []
    ), o = Ro(a, { ...e, scopes: i });
    return t.set(a.key, o), o;
  };
  return {
    query(a) {
      return hr(a, (s) => n(s, a.schema), {
        undatedLast: !1,
        zeroIsAll: !1
      });
    }
  };
}
const un = "e", Vn = "v", Ha = "s", Ka = "d", xt = "q", Wn = "p", Va = "f_", gr = "*", Fo = [
  un,
  Vn,
  Ha,
  Ka,
  xt,
  Wn
], ba = "..", yr = ",", Io = [
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
function Jt(e) {
  let t = encodeURIComponent(e);
  for (const [n, a] of Io) t = t.replace(n, a);
  return t;
}
function at(e) {
  try {
    return decodeURIComponent(e.replace(/\+/g, " "));
  } catch {
    return e.replace(/\+/g, " ");
  }
}
function Wa(e) {
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
function No(e) {
  return Fo.includes(e) || e.startsWith(Va);
}
function zs(e, t, n) {
  return Math.min(n, Math.max(t, e));
}
function Bo(e, t) {
  const n = at(t);
  switch (e.kind) {
    case "chips": {
      const a = new Set(
        n.split(yr).map((r) => r.trim()).filter(Boolean)
      );
      return { kind: "chips", selected: e.options.filter((r) => a.has(r)) };
    }
    case "range": {
      const a = n.indexOf(ba), s = (a === -1 ? n : n.slice(0, a)).trim(), r = (a === -1 ? "" : n.slice(a + ba.length)).trim(), i = s === "" ? null : Number(s), o = r === "" ? null : Number(r);
      let l = i !== null && Number.isFinite(i) ? zs(i, e.min, e.max) : null, c = o !== null && Number.isFinite(o) ? zs(o, e.min, e.max) : null;
      return l !== null && c !== null && l > c && ([l, c] = [c, l]), { kind: "range", min: l, max: c };
    }
    case "toggle":
      return { kind: "toggle", on: n === "1" || n === "true" };
  }
}
function Oo(e, t) {
  switch (e.kind) {
    case "chips":
      return e.selected.length ? (t.kind === "chips" ? t.options.filter((a) => e.selected.includes(a)) : e.selected).join(yr) : null;
    case "range":
      return e.min === null && e.max === null ? null : `${e.min ?? ""}${ba}${e.max ?? ""}`;
    case "toggle":
      return e.on ? "1" : null;
  }
}
function Do(e, t, n = {}) {
  const a = Oa(t, n), s = new Map(Wa(e)), r = s.get(un), i = r === void 0 ? a.entity : at(r), o = i === gr ? null : Rt(t, i), l = s.get(Vn), c = l && Js(at(l)) ? at(l) : sn(o?.key ?? null, n), u = s.get(Ha), y = ft(o, u ? at(u) : n.sort, t), b = s.get(Ka), g = b ? at(b) === "asc" ? "asc" : "desc" : a.dir, m = s.get(xt), _ = s.get(Wn), $ = _ === void 0 ? 1 : Number(at(_)), k = Number.isFinite($) ? Math.max(1, Math.floor($)) : 1, E = {};
  for (const S of o?.facets ?? []) {
    const C = s.get(`${Va}${S.key}`);
    E[S.key] = C === void 0 ? Ia(S) : Bo(S, C);
  }
  return {
    entity: o?.key ?? null,
    view: c,
    sort: y.key,
    dir: g,
    expr: m === void 0 ? "" : at(m),
    facets: rr(o, E),
    page: k
  };
}
function la(e, t, n = {}, a = "") {
  const s = Oa(t, n), r = Rt(t, e.entity), i = Wa(a).filter(([y]) => !No(y)), o = [], l = (y, b) => o.push([y, Jt(b)]), c = r?.key ?? null;
  c !== s.entity && l(un, c ?? gr), e.view !== sn(c, n) && l(Vn, e.view), e.sort !== s.sort && l(Ha, e.sort), e.dir !== s.dir && l(Ka, e.dir), e.expr.trim() !== "" && l(xt, e.expr);
  for (const y of r?.facets ?? []) {
    const b = e.facets[y.key];
    if (!b) continue;
    const g = Oo(b, y);
    g !== null && o.push([`${Va}${y.key}`, Jt(g)]);
  }
  e.page > 1 && l(Wn, String(e.page));
  const u = [
    ...i.map(([y, b]) => [Jt(y), b]),
    ...o
  ];
  return u.length ? `?${u.map(([y, b]) => b === "" ? y : `${y}=${b}`).join("&")}` : "";
}
function zv(e) {
  const t = [];
  for (const [n, a] of Object.entries(e))
    for (const s of Array.isArray(a) ? a : [a]) {
      if (typeof s != "string") continue;
      const r = Jt(n);
      t.push(s === "" ? r : `${r}=${Jt(s)}`);
    }
  return t.length ? `?${t.join("&")}` : "";
}
function Fv(e) {
  const t = new Map(Wa(e)).get(xt);
  return t === void 0 ? "" : at(t);
}
function jn(e, t) {
  return _r(e, t.id);
}
function _r(e, t) {
  const n = e?.scope;
  return n ? wr(n, t) : null;
}
function wr(e, t) {
  return `${e}="${t.replace(/"/g, "")}"`;
}
function Iv(e, t) {
  const n = typeof e == "string" ? e : e?.scope;
  if (!n) return null;
  const a = t.filter((s) => s.replace(/"/g, "") !== "").map((s) => wr(n, s));
  return a.length ? a.join(" ") : null;
}
function Un(e, t) {
  if (e.kind !== "field" || t.kind !== "field") return wa(e, t);
  const n = (a) => a.comparator === ":" || a.comparator === "=";
  return wa(e, { ...t, comparator: n(e) && n(t) ? e.comparator : t.comparator });
}
function Fn(e, t) {
  return Un(e, yo(t));
}
function In(e, t) {
  return jn(
    e.entities.find((n) => n.key === t.entityKey),
    t
  );
}
function dn(e, t) {
  if (!t) return e;
  const n = e.trim();
  if (!n) return t;
  const [a] = Ne(t).flat();
  if (!a) return n;
  const s = Ne(n);
  return s.some((o) => o.some((l) => Un(l, a))) ? n : s.some((o) => o.some((l) => Fn(l, a))) ? ot(
    s.map(
      (o) => o.map((l) => Fn(l, a) ? a : l)
    )
  ) : `${n} ${t}`;
}
function kr(e) {
  if (!e) return null;
  const t = e.trim();
  return t ? t.startsWith("-") ? t.slice(1) : `-${t}` : null;
}
function ja(e, t) {
  if (!t || !e.trim()) return null;
  const [n] = Ne(t).flat();
  if (!n) return null;
  const a = Ne(e).flat();
  return a.some((s) => Un(s, n)) ? n.negated ? "out" : "in" : a.some((s) => Fn(s, n)) ? n.negated ? "in" : "out" : null;
}
function br(e, t) {
  if (!t || !e.trim()) return e;
  const [n] = Ne(t).flat();
  if (!n) return e;
  const a = Ne(e), s = a.map(
    (r) => r.filter((i) => !Un(i, n) && !Fn(i, n))
  );
  return s.every((r, i) => r.length === a[i]?.length) ? e : ot(s);
}
function $a(e, t, n) {
  return t ? n === null ? br(e, t) : dn(e, n === "out" ? kr(t) : t) : e;
}
function $r(e) {
  return e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0;
}
function Gn(e) {
  return e.altKey ? { exclude: !0 } : {};
}
function oa(e, t, n, a = {}) {
  const s = In(e, n);
  return dn(t.expr, a.exclude ? kr(s) : s);
}
function xr(e, t) {
  const n = e?.scope?.toLowerCase();
  if (!n || e?.keepsScope || !t.trim()) return t;
  const a = Ne(t), s = a.map(
    (r) => r.filter((i) => i.kind !== "field" || i.field !== n)
  );
  return s.every((r, i) => r.length === a[i]?.length) ? t : ot(s);
}
function Cr(e, t) {
  const n = t.toLowerCase();
  return e.entities.find((a) => a.scope?.toLowerCase() === n) ?? null;
}
function Sr(e, t, n) {
  if (!t || !n) return null;
  const a = Cr(e, t);
  return a ? { entity: a, id: n } : null;
}
function qo(e, t) {
  const n = [], a = /* @__PURE__ */ new Set();
  for (const s of t)
    for (const r of Ne(s).flat()) {
      if (r.kind !== "field" || r.negated) continue;
      const i = Sr(e, r.field, r.value);
      if (!i) continue;
      const o = `${i.entity.key}:${i.id.toLowerCase()}`;
      a.has(o) || (a.add(o), n.push({ entityKey: i.entity.key, id: i.id }));
    }
  return n;
}
function Nv(e, t, n = "cards") {
  return {
    // An expression with nothing in it is no parameter, as the shell writes it.
    [xt]: dn(e, t) || void 0,
    [un]: void 0,
    [Vn]: n,
    [Wn]: void 0
  };
}
const Mr = Symbol("dc.shellContext");
function Ho(e) {
  const t = e.liveQuery ? e : Ko(e);
  return za(Mr, t), t;
}
function Ko(e) {
  const t = e.draft ?? D("");
  return {
    draft: t,
    liveQuery: e.query,
    drafting: p(() => !1),
    commitDraft() {
      const n = t.value.trim();
      n && (e.setExpression(
        ka(e.query.value.expr, Rn(n, e.entity.value))
      ), t.value = "");
    },
    abandonDraft() {
      t.value = "";
    },
    ...e
  };
}
function Ee() {
  const e = Ot(Mr, null);
  if (!e)
    throw new Error(
      "[header-content-layout] No shell context found. Render this component inside <DataShell>."
    );
  return e;
}
const Nn = "entity", rn = "expr";
function Vo(e, t) {
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
function Ua(e, t) {
  const n = [];
  t && n.push({
    id: Nn,
    label: `entity:${t.key}`,
    facetKey: Nn
  });
  for (const a of t?.facets ?? []) {
    const s = e.facets[a.key];
    s && ar(s) && n.push(...Vo(a, s));
  }
  return Ne(e.expr).forEach((a, s) => {
    a.forEach((r, i) => {
      n.push({
        id: `${rn}:${s}:${i}`,
        label: cn(r),
        facetKey: rn,
        group: s,
        index: i,
        ...r.kind === "field" ? { field: r.field, value: r.value } : {},
        ...r.negated ? { negated: !0 } : {}
      });
    });
  }), n;
}
function Wo(e, t, n = null) {
  if (Na(e)) {
    const r = ft(t, e.sort, n);
    return `everything · ${e.view} · ${r.label}`;
  }
  const a = Ua(e, t).filter((r) => r.facetKey !== rn).map((r) => r.label), s = e.expr.trim();
  return s && a.push(`"${s}"`), a.join(" · ");
}
function jo(e) {
  const { adapter: t } = e, n = p(() => Lt(e.schema)), a = p(() => Lt(e.defaults) ?? {}), s = p(() => Do(t.search.value, n.value, a.value)), r = p(() => Rt(n.value, s.value.entity)), i = p(() => r.value ?? er(n.value, a.value)), o = p(() => nr(r.value, n.value)), l = p(() => ft(r.value, s.value.sort, n.value)), c = (k, E) => {
    const S = la(k, n.value, a.value, t.search.value);
    return S === t.search.value ? !1 : (E === "push" ? t.push(S) : t.replace(S), !0);
  }, u = () => Lt(e.navigationMode) ?? "push", y = () => Lt(e.facetNavigationMode) ?? "replace", b = (k, E) => {
    const S = k.page ?? (sa(k) ? 1 : s.value.page);
    return c({ ...s.value, ...k, page: S }, E);
  }, g = (k) => {
    const E = k.page ?? (sa(k) ? 1 : s.value.page), S = la({ ...s.value, ...k, page: E }, n.value, a.value, t.search.value);
    return t.href ? t.href(S) : `${t.path.value}${S}`;
  }, m = (k, E) => {
    const S = s.value.facets[k];
    if (!S) return;
    const C = { ...s.value.facets, [k]: E(S) };
    b({ facets: C }, y());
  }, _ = (k) => {
    const E = k === null ? null : Rt(n.value, k);
    return (E?.key ?? null) === s.value.entity ? {} : {
      entity: E?.key ?? null,
      view: ks(s.value.view, s.value.entity, E?.key ?? null, a.value),
      sort: ft(E, s.value.sort, n.value).key,
      facets: Dt(E)
    };
  }, $ = (k) => {
    const E = _(k);
    Object.keys(E).length && b(E, u());
  };
  return {
    query: s,
    entity: r,
    focus: i,
    sort: l,
    sorts: o,
    summary: p(() => Wo(s.value, r.value, n.value)),
    terms: p(() => Ua(s.value, r.value)),
    isPristine: p(() => Na(s.value)),
    isEverything: p(() => s.value.entity === null),
    hasFacets: p(() => sr(s.value.facets)),
    setEntity: $,
    entityHref: (k) => g(_(k)),
    clearEntity: () => $(null),
    setView(k) {
      b({ view: k }, u());
    },
    setSort(k) {
      b({ sort: ft(r.value, k, n.value).key }, u());
    },
    toggleDirection() {
      b({ dir: s.value.dir === "desc" ? "asc" : "desc" }, u());
    },
    setExpression(k) {
      return b({ expr: k }, u());
    },
    narrow(k, E, S) {
      return b({ expr: k, ..._(E), ...S ? { view: S } : {} }, u());
    },
    narrowHref(k, E, S) {
      return g({ expr: k, ..._(E), ...S ? { view: S } : {} });
    },
    setPage(k, E) {
      b({ page: Math.max(1, Math.floor(k)) }, E ?? u());
    },
    setFacet(k, E) {
      m(k, () => E);
    },
    toggleChip(k, E) {
      m(k, (S) => S.kind !== "chips" ? S : { kind: "chips", selected: S.selected.includes(E) ? S.selected.filter((T) => T !== E) : [...S.selected, E] });
    },
    setRange(k, E, S) {
      m(k, (C) => C.kind === "range" ? { kind: "range", min: E, max: S } : C);
    },
    toggleFlag(k) {
      m(
        k,
        (E) => E.kind === "toggle" ? { kind: "toggle", on: !E.on } : E
      );
    },
    removeTerm(k) {
      if (k.facetKey === Nn) {
        $(null);
        return;
      }
      if (k.facetKey === rn) {
        const E = _o(Ne(s.value.expr), k.group ?? 0, k.index ?? 0);
        b({ expr: ot(E) }, u());
        return;
      }
      m(k.facetKey, (E) => E.kind === "chips" && k.option ? { kind: "chips", selected: E.selected.filter((S) => S !== k.option) } : E.kind === "range" ? { kind: "range", min: null, max: null } : E.kind === "toggle" ? { kind: "toggle", on: !1 } : E);
    },
    clearFilters() {
      b({ ..._(null), expr: "", facets: Dt(null) }, u());
    },
    reset() {
      c(Oa(n.value, a.value), u());
    },
    hrefFor(k) {
      const E = { ...s.value, ...k };
      return "entity" in k && !("view" in k) && (E.view = ks(s.value.view, s.value.entity, E.entity, a.value)), E.page = k.page ?? (sa(k) ? 1 : s.value.page), E.facets = rr(Rt(n.value, E.entity), E.facets), `${t.path.value}${la(E, n.value, a.value, t.search.value)}`;
    }
  };
}
function Uo(e) {
  const t = ct([]), n = D(0), a = D(!1), s = D(!1), r = ct(null);
  let i = 0, o = null, l = null;
  const c = p(() => (e.query.value.page - 1) * e.limit.value), u = p(() => Ul(n.value, e.limit.value)), y = () => {
    const C = e.query.value, T = e.within?.value.trim(), B = xr(e.entity.value, C.expr);
    return T ? { ...C, expr: qa(T, B) } : B === C.expr ? C : { ...C, expr: B };
  }, b = (C, T) => {
    t.value = C.rows, n.value = C.total, r.value = null, g(T);
  }, g = (C) => {
    o = { key: C, total: n.value }, s.value = !1;
  }, m = (C) => {
    r.value = C, t.value = [], n.value = 0, o = null, s.value = !1;
  }, _ = (C, T, B, L) => {
    let z = !0;
    const M = () => C === i;
    let q = 0, V = !1;
    const X = (he) => {
      q = he, V = !0, L === void 0 && (n.value = he);
    }, de = () => {
      z && (z = !1, t.value = [], X(0)), r.value = null;
    };
    return {
      get open() {
        return M();
      },
      insert(he, Be) {
        if (!M()) return;
        const O = Array.isArray(he) ? he : [he];
        if (!O.length) return;
        de();
        const j = [...t.value];
        j.splice(Be ?? j.length, 0, ...O), t.value = T > 0 ? j.slice(0, T) : j, X(q + O.length);
      },
      set(he) {
        M() && (he.rows && (de(), t.value = T > 0 ? he.rows.slice(0, T) : he.rows, X(he.rows.length)), he.total !== void 0 && X(he.total));
      },
      close() {
        M() && (a.value = !1, V && (n.value = q), g(B));
      },
      fail(he) {
        M() && (m(he), a.value = !1);
      }
    };
  }, $ = () => {
    const C = l;
    l = null, C?.();
  }, k = () => {
    const C = ++i;
    $();
    const T = E.value, B = o?.key === T ? o.total : void 0;
    s.value = B === void 0;
    const L = {
      query: y(),
      schema: e.schema.value,
      entity: e.entity.value,
      limit: e.limit.value,
      offset: c.value
    }, z = e.source.value;
    if (z.stream) {
      a.value = !0;
      try {
        l = z.stream(L, _(C, L.limit, T, B)) ?? null;
      } catch (q) {
        m(q), a.value = !1;
      }
      return;
    }
    let M;
    try {
      M = z.query(L);
    } catch (q) {
      m(q);
      return;
    }
    if (!(M instanceof Promise)) {
      b(M, T), a.value = !1;
      return;
    }
    a.value = !0, M.then((q) => {
      C === i && b(q, T);
    }).catch((q) => {
      C === i && m(q);
    }).finally(() => {
      C === i && (a.value = !1);
    });
  }, E = p(() => {
    const C = y();
    return `${e.entity.value?.key ?? e.schema.value.entities[0]?.key ?? ""}|${JSON.stringify(Da.map((B) => C[B]))}`;
  }), S = p(() => `${E.value}|${e.query.value.page}`);
  return Ce([e.source, S, e.limit], k, {
    immediate: !0
  }), Kt(() => {
    i++, $();
  }, !0), { rows: t, total: n, offset: c, pageCount: u, pending: a, counting: s, error: r, refresh: k };
}
const Go = 150;
function Xo(e) {
  const t = e.delay ?? Go, n = D(""), a = D("");
  let s = !1, r;
  const i = () => {
    clearTimeout(r), r = void 0;
  }, o = p(() => Rn(xo(a.value), e.entity.value)), l = p(() => o.value.trim() !== ""), c = p(
    () => JSON.stringify([o.value, ...Da.map((g) => e.query.value[g])])
  ), u = ct(null), y = p(() => {
    const g = e.query.value;
    if (!l.value) return g;
    const m = u.value?.of === c.value ? u.value.page : 1;
    return { ...g, expr: ka(g.expr, o.value), page: m };
  });
  Ce(n, (g) => {
    if (i(), !g.trim()) {
      s || (a.value = "");
      return;
    }
    s = !1, r = setTimeout(() => {
      r = void 0, a.value = n.value;
    }, t);
  }), Ce(
    e.query,
    () => {
      s && (s = !1, a.value = "");
    },
    { flush: "sync" }
  );
  const b = (g) => {
    i(), s = !0, n.value = "", !g() && s && (s = !1, a.value = "");
  };
  return Dn() && Kt(i), {
    text: n,
    live: y,
    drafting: l,
    setPage(g) {
      u.value = { of: c.value, page: Math.max(1, Math.floor(g)) };
    },
    commit() {
      const g = n.value.trim();
      if (!g) return;
      const m = ka(
        e.query.value.expr,
        Rn(g, e.entity.value)
      );
      a.value = g, b(() => e.setExpression(m));
    },
    abandon() {
      i(), s = !1, n.value = "", a.value = "";
    },
    release: b
  };
}
const en = (e) => e.separator !== !0 && e.heading !== !0 && e.disabled !== !0, Qo = ["aria-label"], Yo = ["role", "aria-label"], Zo = ["data-dc-item"], Jo = {
  key: 0,
  class: "dc-menu__rule",
  role: "separator"
}, ei = ["role", "aria-checked", "aria-haspopup", "aria-expanded", "aria-disabled", "disabled", "data-dc-item", "onClick", "onMouseenter"], ti = {
  class: "dc-menu__mark",
  "aria-hidden": "true"
}, ni = { class: "dc-menu__label dc-truncate" }, ai = {
  key: 0,
  class: "dc-menu__key dc-mono"
}, si = {
  key: 1,
  class: "dc-menu__more",
  "aria-hidden": "true"
}, ri = /* @__PURE__ */ te({
  __name: "MenuList",
  props: {
    items: {},
    at: {},
    label: {},
    autofocus: { type: Boolean }
  },
  emits: ["choose", "dismiss"],
  setup(e, { expose: t, emit: n }) {
    const a = e, s = n, r = D(null), i = D([]), o = D(null), l = D(null), c = D(null), u = D(!1), y = p(
      () => a.items.flatMap((L, z) => en(L) ? [z] : [])
    ), b = p(() => {
      const L = [{ entries: [] }];
      return a.items.forEach((z, M) => {
        z.heading ? L.push({ heading: z, entries: [] }) : L[L.length - 1]?.entries.push({ item: z, index: M });
      }), L.filter((z) => z.entries.length > 0);
    }), g = D({ x: a.at.x, y: a.at.y });
    async function m() {
      g.value = { x: a.at.x, y: a.at.y }, await vt();
      const L = r.value?.getBoundingClientRect();
      if (!L) return;
      const z = 8;
      let M = a.at.x, q = a.at.y;
      if (M + L.width > window.innerWidth - z) {
        const V = a.at.mirrorX === void 0 ? null : a.at.mirrorX - L.width;
        M = V !== null && V >= z ? V : window.innerWidth - L.width - z;
      }
      q + L.height > window.innerHeight - z && (q = window.innerHeight - L.height - z), g.value = { x: Math.max(z, M), y: Math.max(z, q) };
    }
    const _ = p(() => ({ left: `${g.value.x}px`, top: `${g.value.y}px` }));
    function $(L) {
      o.value = L, L !== null && vt(() => i.value[L]?.focus());
    }
    function k(L, z) {
      const M = y.value;
      if (M.length === 0) return null;
      if (L === null) return z === 1 ? M[0] ?? null : M[M.length - 1] ?? null;
      const q = M.indexOf(L);
      return q === -1 ? M[0] ?? null : M[(q + z + M.length) % M.length] ?? null;
    }
    function E(L, z) {
      if (!a.items[L]?.items?.length) return;
      const q = i.value[L]?.getBoundingClientRect(), V = r.value?.getBoundingClientRect();
      !q || !V || (c.value = { x: V.right - 4, y: q.top - 4, mirrorX: V.left + 4 }, l.value = L, u.value = z);
    }
    function S(L) {
      const z = l.value;
      l.value = null, c.value = null, L && z !== null && $(z);
    }
    function C(L) {
      const z = a.items[L];
      if (!(!z || !en(z))) {
        if (z.items?.length) {
          E(L, !0);
          return;
        }
        s("choose", z);
      }
    }
    function T(L) {
      const z = L.key;
      if (z === "Escape") {
        L.preventDefault(), L.stopPropagation(), l.value !== null ? S(!0) : s("dismiss");
        return;
      }
      if (z === "ArrowDown" || z === "ArrowUp") {
        L.preventDefault(), L.stopPropagation(), S(!1), $(k(o.value, z === "ArrowDown" ? 1 : -1));
        return;
      }
      if (z === "Home" || z === "End") {
        L.preventDefault(), L.stopPropagation(), S(!1), $(k(null, z === "Home" ? 1 : -1));
        return;
      }
      if (z === "ArrowRight") {
        const M = o.value;
        M !== null && a.items[M]?.items?.length && (L.preventDefault(), L.stopPropagation(), E(M, !0));
        return;
      }
      if (z === "ArrowLeft") {
        l.value !== null && (L.preventDefault(), L.stopPropagation(), S(!0));
        return;
      }
      if (z === "Enter" || z === " ") {
        const M = o.value;
        if (M === null) return;
        L.preventDefault(), L.stopPropagation(), C(M);
      }
    }
    function B(L) {
      const z = a.items[L];
      !z || !en(z) || (l.value !== null && l.value !== L && S(!1), $(L), z.items?.length && E(L, !1));
    }
    return qn(() => {
      m(), a.autofocus && $(k(null, 1));
    }), Ce(() => a.at, m, { deep: !0 }), Ce(() => a.items, () => void m(), { deep: !0 }), Ve(() => {
      l.value = null;
    }), t({ root: r }), (L, z) => {
      const M = Qs("MenuList", !0);
      return d(), v("div", {
        ref_key: "root",
        ref: r,
        class: "dc-menu",
        role: "menu",
        "aria-label": e.label,
        style: Me(_.value),
        onKeydown: T
      }, [
        (d(!0), v(Z, null, fe(b.value, (q, V) => (d(), v("div", {
          key: `${V}-${q.heading?.label ?? ""}`,
          class: "dc-menu__group",
          role: q.heading ? "group" : "none",
          "aria-label": q.heading?.label
        }, [
          q.heading ? (d(), v("div", {
            key: 0,
            class: "dc-menu__heading dc-truncate",
            "aria-hidden": "true",
            "data-dc-item": q.heading.id
          }, R(q.heading.label), 9, Zo)) : A("", !0),
          (d(!0), v(Z, null, fe(q.entries, ({ item: X, index: de }) => (d(), v(Z, {
            key: X.id ?? `${de}-${X.label ?? ""}`
          }, [
            X.separator ? (d(), v("div", Jo)) : (d(), v("button", {
              key: 1,
              ref_for: !0,
              ref: (he) => {
                he && (i.value[de] = he);
              },
              type: "button",
              class: "dc-menu__item",
              role: X.checked === void 0 ? "menuitem" : "menuitemcheckbox",
              "aria-checked": X.checked === void 0 ? void 0 : X.checked,
              "aria-haspopup": X.items?.length ? "menu" : void 0,
              "aria-expanded": X.items?.length ? l.value === de : void 0,
              "aria-disabled": X.disabled ? "true" : void 0,
              disabled: X.disabled,
              "data-dc-item": X.id,
              tabindex: "-1",
              onClick: (he) => C(de),
              onMouseenter: (he) => B(de)
            }, [
              x("span", ti, R(X.checked ? "✓" : ""), 1),
              x("span", ni, R(X.label), 1),
              X.shortcut ? (d(), v("span", ai, R(X.shortcut), 1)) : X.items?.length ? (d(), v("span", si, "›")) : A("", !0)
            ], 40, ei))
          ], 64))), 128))
        ], 8, Yo))), 128)),
        l.value !== null && c.value ? (d(), G(M, {
          key: l.value,
          items: e.items[l.value]?.items ?? [],
          at: c.value,
          label: e.items[l.value]?.label,
          autofocus: u.value,
          onChoose: z[0] || (z[0] = (q) => s("choose", q)),
          onDismiss: z[1] || (z[1] = (q) => S(!0))
        }, null, 8, ["items", "at", "label", "autofocus"])) : A("", !0)
      ], 44, Qo);
    };
  }
}), re = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [a, s] of t)
    n[a] = s;
  return n;
}, Ga = /* @__PURE__ */ re(ri, [["__scopeId", "data-v-9b1413fa"]]), li = { class: "dc-pick" }, oi = ["id"], ii = ["id", "aria-expanded", "aria-labelledby", "data-dc-value"], ci = { class: "dc-pick__label" }, ui = /* @__PURE__ */ te({
  __name: "PickControl",
  props: {
    modelValue: {},
    options: {},
    label: {},
    mono: { type: Boolean }
  },
  emits: ["update:modelValue", "open", "close"],
  setup(e, { emit: t }) {
    const n = e, a = t, s = on() ?? "dc-pick", r = D(null), i = D(null), o = D(null), l = D(!1), c = p(() => o.value !== null), u = D(null), y = p(
      () => n.options.find((C) => C.key === n.modelValue) ?? n.options[0]
    ), b = p(
      () => n.options.map((C) => ({
        id: C.key,
        label: C.label,
        checked: C.key === n.modelValue
      }))
    ), g = p(
      () => o.value ? { maxHeight: `${window.innerHeight - o.value.y - 8}px` } : void 0
    );
    function m(C) {
      const T = r.value?.getBoundingClientRect();
      T && (u.value = r.value?.closest(".dc-shell") ?? document.body, o.value = { x: T.left, y: T.bottom + 4, mirrorX: T.right }, l.value = C, a("open"));
    }
    function _(C) {
      o.value && a("close"), o.value = null, C && r.value?.focus();
    }
    function $() {
      c.value ? _(!0) : m(!1);
    }
    function k(C) {
      C.key !== "ArrowDown" && C.key !== "ArrowUp" || c.value || (C.preventDefault(), m(!0));
    }
    function E(C) {
      const T = C.target;
      T && (r.value?.contains(T) || i.value?.root?.contains(T) || _(!1));
    }
    Ce(c, (C) => {
      C ? window.addEventListener("pointerdown", E, !0) : window.removeEventListener("pointerdown", E, !0);
    }), Ve(() => window.removeEventListener("pointerdown", E, !0));
    function S(C) {
      _(!0), !(C.id === void 0 || C.id === n.modelValue) && a("update:modelValue", C.id);
    }
    return (C, T) => (d(), v("span", li, [
      x("span", {
        id: `${P(s)}-name`,
        class: "dc-pick__name"
      }, R(e.label), 9, oi),
      x("button", {
        id: `${P(s)}-value`,
        ref_key: "trigger",
        ref: r,
        type: "button",
        class: ht(["dc-pick__button", { "dc-mono": e.mono }]),
        "aria-haspopup": "menu",
        "aria-expanded": c.value,
        "aria-labelledby": `${P(s)}-name ${P(s)}-value`,
        "data-dc-value": e.modelValue,
        onClick: $,
        onKeydown: k
      }, [
        x("span", ci, R(y.value?.label), 1)
      ], 42, ii),
      T[1] || (T[1] = x("span", {
        class: "dc-pick__mark",
        "aria-hidden": "true"
      }, "▾", -1)),
      o.value && u.value ? (d(), G(Fa, {
        key: 0,
        to: u.value
      }, [
        oe(Ga, {
          ref_key: "menu",
          ref: i,
          class: "dc-pick__list",
          style: Me(g.value),
          items: b.value,
          at: o.value,
          label: e.label,
          autofocus: l.value,
          onChoose: S,
          onDismiss: T[0] || (T[0] = (B) => _(!0))
        }, null, 8, ["style", "items", "at", "label", "autofocus"])
      ], 8, ["to"])) : A("", !0)
    ]));
  }
}), Fs = /* @__PURE__ */ re(ui, [["__scopeId", "data-v-d21ebf1b"]]);
function di(e) {
  const t = ct(/* @__PURE__ */ new Map()), n = D(!0);
  let a = 0, s;
  const r = () => {
    a++, s?.abort(), s = void 0;
  }, i = () => {
    r();
    const o = a, { signal: l } = s = new AbortController(), c = e.query.value, u = e.schema.value, y = e.entities.value, b = e.within?.value.trim() ?? "";
    n.value = c.expr.trim() === "" && !b;
    const g = /* @__PURE__ */ new Map();
    let m = !0;
    for (const _ of y) {
      const $ = xr(_, c.expr), k = b ? qa(b, $) : $;
      let E = !1;
      const S = (T) => {
        if (o !== a) return;
        if (m) {
          g.set(_.key, T);
          return;
        }
        const B = new Map(t.value);
        B.set(_.key, T), t.value = B;
      }, C = e.source.value.query({
        query: { ...c, entity: _.key, expr: k, facets: Dt(_), page: 1 },
        schema: u,
        entity: _,
        limit: 0,
        offset: 0,
        signal: l,
        progress: (T) => {
          E || S({ total: T, pending: !0, counted: !0 });
        }
      });
      C instanceof Promise ? (g.has(_.key) || g.set(_.key, { total: 0, pending: !0, counted: !1 }), C.then((T) => {
        E = !0, S({ total: T.total, pending: !1, counted: !0 });
      })) : (E = !0, g.set(_.key, { total: C.total, pending: !1, counted: !0 }));
    }
    m = !1, t.value = g;
  };
  return Dn() && Kt(r), { counts: t, pristine: n, refresh: i, cancel: r };
}
const fi = 25, Er = (e, t) => e.toLowerCase() === t.toLowerCase();
function pi(e, t) {
  return e.find((n) => Er(n.id, t));
}
function vi(e) {
  const t = ct(/* @__PURE__ */ new Map()), n = /* @__PURE__ */ new Set(), a = (o) => {
    if (o.facetKey !== rn) return null;
    const l = Sr(e.schema.value, o.field, o.value);
    return l ? { ...l, key: `${l.entity.key}:${l.id}` } : null;
  }, s = (o) => {
    const { entity: l, id: c } = o, u = e.query.value;
    return e.source.value.query({
      query: {
        ...u,
        entity: l.key,
        // The reference on its own. The rest of the query is about the rows on
        // screen, which are of another type entirely.
        expr: _r(l, c) ?? "",
        facets: Dt(l),
        sort: ft(l, u.sort, e.schema.value).key,
        page: 1
      },
      schema: e.schema.value,
      entity: l,
      limit: fi,
      offset: 0
    });
  }, r = (o, l) => {
    const c = Cn(Ze(o.columns ?? [], "identity"), l);
    return c === rt || Er(c, l.id) ? "" : c;
  }, i = () => {
    const o = /* @__PURE__ */ new Map();
    for (const u of e.terms.value) {
      const y = a(u);
      y && !t.value.has(y.key) && !n.has(y.key) && o.set(y.key, y);
    }
    if (!o.size) return;
    const l = [...o.values()].map((u) => ({
      reference: u,
      outcome: s(u)
    })), c = (u) => {
      const y = new Map(t.value);
      u.forEach((b, g) => {
        const { reference: m } = l[g], _ = pi(b.rows, m.id);
        y.set(m.key, _ ? r(m.entity, _) : "");
      }), t.value = y;
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
  return Ce([e.source, e.schema, e.terms], () => {
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
const hi = ["data-dc-expanded"], mi = {
  key: 0,
  class: "dc-header__domain",
  "data-dc-brand": ""
}, gi = {
  class: "dc-header__brand",
  "aria-hidden": "true"
}, yi = { class: "dc-header__sr" }, _i = {
  key: 1,
  class: "dc-header__domain"
}, wi = {
  key: 2,
  class: "dc-header__within"
}, ki = ["title"], bi = ["data-dc-more", "title"], $i = {
  key: 0,
  class: "dc-header__or dc-mono",
  "aria-hidden": "true"
}, xi = ["title", "aria-label", "onClick"], Ci = ["onKeydown"], Si = ["aria-expanded", "aria-controls"], Mi = {
  class: "dc-header__chevron",
  "aria-hidden": "true"
}, Ei = { class: "dc-header__sr" }, Pi = {
  key: 0,
  class: "dc-header__pages",
  "aria-label": "Pages"
}, Ai = ["disabled"], Ti = ["title"], Li = ["value", "onKeydown"], Ri = {
  class: "dc-header__page-total",
  "aria-hidden": "true"
}, zi = {
  class: "dc-header__sr",
  "aria-live": "polite"
}, Fi = ["disabled"], Ii = {
  key: 1,
  class: "dc-header__actions"
}, Ni = "…", Bi = /* @__PURE__ */ te({
  __name: "ShellHeader",
  props: {
    expanded: { type: Boolean },
    panelId: {},
    hideCount: { type: Boolean },
    views: {},
    typeChooser: {},
    pagesNote: {},
    hidePages: { type: Boolean },
    hideViews: { type: Boolean }
  },
  emits: ["toggle"],
  setup(e, { emit: t }) {
    const n = e, a = t, s = Vt(), r = Ee(), i = p(() => r.schema.value), o = p(
      () => r.hasFacets.value || !!r.liveQuery.value.expr.trim() || !!r.within.value
    ), l = p(() => i.value.formatCount ?? Pt), c = di({
      source: r.source,
      schema: r.schema,
      // What each type holds of what is on screen, the draft's results included:
      // a count of the committed query would disagree with the rows under it.
      query: r.liveQuery,
      entities: r.entities,
      within: r.within
    });
    function u(H) {
      if (n.hideCount) return H.count;
      if (H.key === r.query.value.entity && o.value) return l.value(r.total.value);
      if (c.pristine.value) return H.count;
      const Y = c.counts.value.get(H.key);
      return Y ? Y.counted ? `${Y.pending ? "~" : ""}${l.value(Y.total)}` : Ni : H.count;
    }
    function y(H) {
      return `${H.label} · ${u(H)}`;
    }
    const b = p(() => [
      { key: "", label: "Everything" },
      ...r.entities.value.map((H) => ({ key: H.key, label: y(H) }))
    ]), g = p(() => {
      const H = r.within.value.trim();
      return H ? Ua({ ...r.query.value, expr: H, facets: {} }, null) : [];
    }), m = p(
      () => (n.views ?? [...Zs]).map((H) => ({ key: H, label: Wl[H] }))
    ), _ = p(() => Kn(r.query.value.view, n.views)), $ = p(() => !n.hideViews && m.value.length > 1), k = p(() => n.typeChooser === "always" || r.query.value.entity !== null);
    function E(H) {
      r.setView(H);
    }
    const S = p(() => {
      const H = r.entity.value, J = H?.keepsScope ? void 0 : H?.scope?.toLowerCase();
      return r.terms.value.filter((Y) => Y.facetKey !== Nn).map((Y, Ue, K) => {
        const Q = K[Ue - 1];
        return {
          term: Y,
          or: Q?.group !== void 0 && Y.group !== void 0 && Y.group !== Q.group,
          idle: !!J && Y.field?.toLowerCase() === J
        };
      });
    }), C = vi({
      source: r.source,
      schema: r.schema,
      query: r.query,
      // The scope's parts as well as the query's: it names a record more often
      // than a typed term does, being what a record's own page is built on.
      terms: p(() => [...g.value, ...r.terms.value])
    });
    function T(H) {
      return Cr(i.value, H)?.scopeLabel ?? H;
    }
    function B(H) {
      return H.replace(/\s*\([^()]*\)\s*$/, "");
    }
    function L(H) {
      const J = C.nameOf(H);
      return J ? `${H.negated ? "-" : ""}${T(H.field)}: ${B(J)}` : H.label;
    }
    function z(H) {
      r.setEntity(H || null);
    }
    const M = D(null);
    function q() {
      r.abandonDraft(), M.value?.blur();
    }
    function V(H) {
      if (r.draft.value) return;
      const J = S.value.at(-1);
      J && (H.preventDefault(), r.removeTerm(J.term));
    }
    function X(H) {
      H.target?.closest("button, select, label, input") || a("toggle");
    }
    const de = D(null), he = D("");
    function Be() {
      const H = de.value;
      if (!H) {
        he.value = "";
        return;
      }
      const J = H.scrollLeft > 1, Y = H.scrollWidth - H.clientWidth - H.scrollLeft > 1;
      he.value = J && Y ? "both" : J ? "start" : Y ? "end" : "";
    }
    let O = null;
    Ce(
      de,
      (H) => {
        O?.disconnect(), O = null, Be(), !(!H || typeof ResizeObserver > "u") && (O = new ResizeObserver(Be), O.observe(H));
      },
      { flush: "post" }
    ), Ce(S, Be, { flush: "post" }), Ve(() => O?.disconnect());
    const j = p(() => r.liveQuery.value.page), we = p(
      () => !n.hidePages && (r.pageCount.value > 1 || !!n.pagesNote) && !Ba(r.query.value, n.views)
    ), le = p(
      () => `${r.counting.value ? "~" : ""}${Pt(r.pageCount.value)}`
    ), be = p(() => {
      let H = `Page ${Pt(j.value)} of ${le.value}`;
      const J = r.rows.value.length;
      if (J) {
        const Y = r.offset.value + 1, Ue = `${r.counting.value ? "~" : ""}${Pt(r.total.value)}`;
        H += ` — rows ${Pt(Y)} to ${Pt(Y + J - 1)} of ${Ue}`;
      }
      return n.pagesNote ? `${H}
${n.pagesNote}` : H;
    }), xe = D(null), je = p(() => xe.value ?? String(j.value)), I = p(
      () => `calc(${Math.max(2, String(r.pageCount.value).length)}ch + 10px)`
    );
    function ae(H) {
      H.target.select();
    }
    function ve(H) {
      const J = H.target, Y = J.value.replace(/[^0-9]/g, "");
      J.value !== Y && (J.value = Y), xe.value = Y;
    }
    function Oe(H) {
      const J = H.target, Y = Number(xe.value);
      xe.value = null;
      const Ue = Number.isFinite(Y) && Y >= 1 ? Math.min(Math.trunc(Y), Math.max(1, r.pageCount.value)) : j.value;
      J.value = String(Ue), Ue !== j.value && r.setPage(Ue);
    }
    function Ye(H) {
      const J = H.target;
      xe.value = null, J.value = String(j.value), J.blur();
    }
    return (H, J) => (d(), v("div", {
      class: "dc-header",
      "data-dc-expanded": e.expanded ? "true" : "false"
    }, [
      x("div", {
        class: "dc-header__trigger",
        onClick: X
      }, [
        s.brand ? (d(), v("span", mi, [
          x("span", gi, [
            _e(H.$slots, "brand", {
              label: i.value.label
            }, void 0, !0)
          ]),
          x("span", yi, R(i.value.label), 1)
        ])) : (d(), v("span", _i, R(i.value.label), 1)),
        g.value.length ? (d(), v("span", wi, [
          J[5] || (J[5] = x("span", { class: "dc-header__sr" }, "Within", -1)),
          (d(!0), v(Z, null, fe(g.value, (Y) => (d(), v("span", {
            key: `scope:${Y.id}`,
            class: "dc-within dc-mono dc-truncate",
            title: L(Y)
          }, R(L(Y)), 9, ki))), 128))
        ])) : A("", !0),
        x("div", {
          ref_key: "termBar",
          ref: de,
          class: "dc-header__query dc-header__terms",
          "data-dc-more": he.value,
          title: P(r).summary.value,
          onScroll: Be
        }, [
          k.value ? (d(), G(Fs, {
            key: 0,
            class: "dc-header__pick dc-header__scope-select",
            label: "Type",
            "model-value": P(r).query.value.entity ?? "",
            options: b.value,
            onOpen: P(c).refresh,
            onClose: P(c).cancel,
            "onUpdate:modelValue": z
          }, null, 8, ["model-value", "options", "onOpen", "onClose"])) : A("", !0),
          $.value ? (d(), G(Fs, {
            key: 1,
            class: "dc-header__pick dc-header__view-select",
            label: "View",
            "model-value": _.value,
            options: m.value,
            "onUpdate:modelValue": E
          }, null, 8, ["model-value", "options"])) : A("", !0),
          (d(!0), v(Z, null, fe(S.value, (Y) => (d(), v(Z, {
            key: Y.term.id
          }, [
            Y.or ? (d(), v("span", $i, "or")) : A("", !0),
            x("button", {
              type: "button",
              class: ht(["dc-term dc-mono", { "dc-term--idle": Y.idle }]),
              title: Y.idle ? `Not applied to ${P(r).entity.value?.label} — remove ${L(Y.term)}` : `Remove ${L(Y.term)}`,
              "aria-label": `Remove ${L(Y.term)}`,
              onClick: (Ue) => P(r).removeTerm(Y.term)
            }, R(L(Y.term)), 11, xi)
          ], 64))), 128)),
          mt(x("input", {
            ref_key: "searchBox",
            ref: M,
            "onUpdate:modelValue": J[0] || (J[0] = (Y) => P(r).draft.value = Y),
            class: "dc-header__search dc-mono",
            type: "text",
            autocomplete: "off",
            spellcheck: "false",
            placeholder: "Search…",
            "aria-label": "Search",
            onKeydown: [
              J[1] || (J[1] = st(He(
                //@ts-ignore
                (...Y) => P(r).commitDraft && P(r).commitDraft(...Y),
                ["prevent"]
              ), ["enter"])),
              st(He(q, ["prevent"]), ["esc"]),
              st(V, ["backspace"])
            ]
          }, null, 40, Ci), [
            [An, P(r).draft.value]
          ])
        ], 40, bi),
        x("button", {
          type: "button",
          class: "dc-header__toggle",
          "aria-expanded": e.expanded,
          "aria-controls": e.panelId,
          onClick: J[2] || (J[2] = (Y) => a("toggle"))
        }, [
          x("span", Mi, R(e.expanded ? "▲" : "▼"), 1),
          x("span", Ei, R(e.expanded ? "Hide query panel" : "Edit query"), 1)
        ], 8, Si)
      ]),
      we.value ? (d(), v("nav", Pi, [
        x("button", {
          type: "button",
          class: "dc-header__step",
          "aria-label": "Previous page",
          disabled: j.value <= 1,
          onClick: J[3] || (J[3] = (Y) => P(r).setPage(j.value - 1))
        }, [...J[6] || (J[6] = [
          x("span", { "aria-hidden": "true" }, "‹", -1)
        ])], 8, Ai),
        x("span", {
          class: "dc-header__page dc-mono",
          title: be.value
        }, [
          x("input", {
            class: "dc-header__page-box dc-mono",
            type: "text",
            inputmode: "numeric",
            autocomplete: "off",
            "aria-label": "Page",
            style: Me({ width: I.value }),
            value: je.value,
            onFocus: ae,
            onInput: ve,
            onKeydown: [
              st(He(Oe, ["prevent"]), ["enter"]),
              st(He(Ye, ["prevent"]), ["esc"])
            ],
            onBlur: Oe
          }, null, 44, Li),
          x("span", Ri, "/ " + R(le.value), 1)
        ], 8, Ti),
        x("span", zi, R(be.value), 1),
        x("button", {
          type: "button",
          class: "dc-header__step",
          "aria-label": "Next page",
          disabled: j.value >= P(r).pageCount.value,
          onClick: J[4] || (J[4] = (Y) => P(r).setPage(j.value + 1))
        }, [...J[7] || (J[7] = [
          x("span", { "aria-hidden": "true" }, "›", -1)
        ])], 8, Fi)
      ])) : A("", !0),
      s.actions ? (d(), v("div", Ii, [
        _e(H.$slots, "actions", {}, void 0, !0)
      ])) : A("", !0)
    ], 8, hi));
  }
}), Pr = /* @__PURE__ */ re(Bi, [["__scopeId", "data-v-866943d8"]]), Oi = { class: "dc-facet" }, Di = ["id"], qi = { class: "dc-facet__body" }, Hi = ["aria-labelledby", "data-dc-max-rows", "data-dc-truncate"], Ki = ["aria-pressed", "data-dc-active", "title", "onClick"], Vi = ["aria-labelledby"], Wi = ["aria-label", "placeholder", "onKeydown"], ji = ["aria-label", "placeholder", "onKeydown"], Ui = ["aria-checked"], Gi = { class: "dc-switch__text" }, Xi = ["data-dc-active"], Qi = /* @__PURE__ */ te({
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
    function r(g) {
      if (n.value.kind !== "chips") return;
      const m = s.value.has(g) ? n.value.selected.filter((_) => _ !== g) : [...n.value.selected, g];
      a("update", { kind: "chips", selected: m });
    }
    const i = D(""), o = D("");
    Ce(
      () => n.value,
      (g) => {
        g.kind === "range" && (i.value = g.min === null ? "" : g.min, o.value = g.max === null ? "" : g.max);
      },
      { immediate: !0, deep: !0 }
    );
    function l(g) {
      if (typeof g == "number") return Number.isFinite(g) ? g : null;
      const m = g.trim();
      if (!m) return null;
      const _ = Number(m);
      return Number.isFinite(_) ? _ : null;
    }
    function c() {
      if (n.value.kind !== "range") return;
      const g = l(i.value), m = l(o.value);
      g === n.value.min && m === n.value.max || a("update", { kind: "range", min: g, max: m });
    }
    const u = p(() => {
      if (n.facet.kind !== "chips" || n.facet.maxRows === void 0) return null;
      const g = Math.floor(n.facet.maxRows);
      return Number.isFinite(g) && g >= 1 ? g : null;
    }), y = p(() => n.facet.kind === "chips" ? n.facet.truncate : void 0);
    function b() {
      n.value.kind === "toggle" && a("update", { kind: "toggle", on: !n.value.on });
    }
    return (g, m) => (d(), v("div", Oi, [
      x("span", {
        id: `dc-facet-${e.facet.key}`,
        class: "dc-facet__label"
      }, R(e.facet.label), 9, Di),
      x("div", qi, [
        e.facet.kind === "chips" && e.value.kind === "chips" ? (d(), v("div", {
          key: 0,
          class: "dc-facet__chips",
          role: "group",
          "aria-labelledby": `dc-facet-${e.facet.key}`,
          "data-dc-max-rows": u.value ?? void 0,
          "data-dc-truncate": y.value,
          style: Me(u.value ? { "--dc-facet-rows": u.value } : void 0)
        }, [
          (d(!0), v(Z, null, fe(e.facet.options, (_) => (d(), v("button", {
            key: _,
            type: "button",
            class: "dc-chip",
            "aria-pressed": s.value.has(_),
            "data-dc-active": s.value.has(_) ? "true" : "false",
            title: y.value ? _ : void 0,
            onClick: ($) => r(_)
          }, R(_), 9, Ki))), 128))
        ], 12, Hi)) : e.facet.kind === "range" && e.value.kind === "range" ? (d(), v("div", {
          key: 1,
          class: "dc-facet__range",
          role: "group",
          "aria-labelledby": `dc-facet-${e.facet.key}`
        }, [
          mt(x("input", {
            "onUpdate:modelValue": m[0] || (m[0] = (_) => i.value = _),
            class: "dc-input dc-mono",
            type: "number",
            inputmode: "numeric",
            "aria-label": `${e.facet.label} minimum`,
            placeholder: String(e.facet.min),
            onChange: c,
            onBlur: c,
            onKeydown: st(He(c, ["prevent"]), ["enter"])
          }, null, 40, Wi), [
            [An, i.value]
          ]),
          m[2] || (m[2] = x("span", {
            class: "dc-facet__dash",
            "aria-hidden": "true"
          }, "–", -1)),
          mt(x("input", {
            "onUpdate:modelValue": m[1] || (m[1] = (_) => o.value = _),
            class: "dc-input dc-mono",
            type: "number",
            inputmode: "numeric",
            "aria-label": `${e.facet.label} maximum`,
            placeholder: String(e.facet.max),
            onChange: c,
            onBlur: c,
            onKeydown: st(He(c, ["prevent"]), ["enter"])
          }, null, 40, ji), [
            [An, o.value]
          ])
        ], 8, Vi)) : e.facet.kind === "toggle" && e.value.kind === "toggle" ? (d(), v("button", {
          key: 2,
          type: "button",
          class: "dc-switch",
          role: "switch",
          "aria-checked": e.value.on,
          onClick: b
        }, [
          x("span", Gi, R(e.facet.text), 1),
          x("span", {
            class: "dc-switch__track",
            "data-dc-active": e.value.on ? "true" : "false",
            "aria-hidden": "true"
          }, [...m[3] || (m[3] = [
            x("span", { class: "dc-switch__knob" }, null, -1)
          ])], 8, Xi)
        ], 8, Ui)) : A("", !0)
      ])
    ]));
  }
}), Ar = /* @__PURE__ */ re(Qi, [["__scopeId", "data-v-9fa4911a"]]), Yi = ["id"], Zi = { class: "dc-panel__section dc-panel__rows" }, Ji = { class: "dc-panel__row" }, ec = ["for"], tc = ["title", "aria-label", "onClick"], nc = ["id", "placeholder", "onKeydown"], ac = { class: "dc-panel__actions" }, sc = ["disabled"], rc = {
  key: 0,
  class: "dc-panel__section"
}, lc = /* @__PURE__ */ te({
  __name: "QueryPanel",
  props: {
    panelId: {}
  },
  emits: ["close"],
  setup(e, { emit: t }) {
    const n = t, a = Vt(), s = Ee(), r = p(() => wo(s.query.value.expr)), i = p(() => r.value.parts.map(cn)), o = D(r.value.text), l = D(null);
    Ce(
      () => r.value.text,
      (_) => {
        o.value = _;
      }
    );
    const c = p(() => o.value !== r.value.text);
    function u() {
      if (c.value) {
        const _ = Rn(o.value, s.entity.value);
        s.setExpression(Ts(r.value.parts, _));
      }
      n("close");
    }
    function y(_) {
      const { parts: $, text: k } = r.value;
      s.setExpression(Ts($.filter((E, S) => S !== _), k));
    }
    function b(_) {
      const { parts: $ } = r.value;
      o.value || !$.length || (_.preventDefault(), y($.length - 1));
    }
    function g() {
      o.value = "", s.clearFilters();
    }
    function m(_, $) {
      s.setFacet(_, $);
    }
    return vt(() => l.value?.focus()), (_, $) => (d(), v("div", {
      id: e.panelId,
      class: "dc-panel",
      role: "dialog",
      "aria-label": "Query",
      onKeydown: $[2] || ($[2] = st(He((k) => n("close"), ["stop"]), ["esc"]))
    }, [
      x("section", Zi, [
        x("div", Ji, [
          x("label", {
            class: "dc-panel__field-label",
            for: `${e.panelId}-expr`
          }, "Expression", 8, ec),
          x("div", {
            class: "dc-field",
            onMousedown: $[1] || ($[1] = He((k) => l.value?.focus(), ["self", "prevent"]))
          }, [
            (d(!0), v(Z, null, fe(i.value, (k, E) => (d(), v("button", {
              key: `${E}:${k}`,
              type: "button",
              class: "dc-part dc-mono",
              title: `Remove ${k}`,
              "aria-label": `Remove ${k}`,
              onClick: (S) => y(E)
            }, R(k), 9, tc))), 128)),
            mt(x("input", {
              id: `${e.panelId}-expr`,
              ref_key: "expressionField",
              ref: l,
              "onUpdate:modelValue": $[0] || ($[0] = (k) => o.value = k),
              class: "dc-expression dc-mono",
              type: "text",
              autocomplete: "off",
              spellcheck: "false",
              placeholder: i.value.length ? "" : P(s).schema.value.placeholder,
              onKeydown: [
                st(He(u, ["prevent"]), ["enter"]),
                st(b, ["backspace"])
              ]
            }, null, 40, nc), [
              [An, o.value]
            ])
          ], 32)
        ]),
        P(s).entity.value ? (d(!0), v(Z, { key: 0 }, fe(P(s).entity.value.facets, (k) => (d(), G(Ar, {
          key: k.key,
          facet: k,
          value: P(s).query.value.facets[k.key],
          onUpdate: (E) => m(k.key, E)
        }, null, 8, ["facet", "value", "onUpdate"]))), 128)) : A("", !0),
        x("div", ac, [
          x("button", {
            type: "button",
            class: "dc-button dc-button--primary",
            onClick: u
          }, " Run query "),
          x("button", {
            type: "button",
            class: "dc-button",
            disabled: P(s).isPristine.value && !c.value,
            onClick: g
          }, " Reset ", 8, sc)
        ])
      ]),
      a["panel-section"] ? (d(), v("section", rc, [
        _e(_.$slots, "panel-section", {}, void 0, !0)
      ])) : A("", !0)
    ], 40, Yi));
  }
}), Tr = /* @__PURE__ */ re(lc, [["__scopeId", "data-v-640ae2f5"]]), oc = ["checked", "indeterminate"], Lr = /* @__PURE__ */ te({
  __name: "PageTick",
  setup(e) {
    const t = Ee(), n = p(() => t.rows.value.filter((r) => t.isSelected(r)).length), a = p(
      () => t.rows.value.length > 0 && n.value === t.rows.value.length
    ), s = p(() => n.value > 0 && !a.value);
    return (r, i) => (d(), v("input", {
      class: "dc-tick",
      type: "checkbox",
      checked: a.value,
      indeterminate: s.value,
      "aria-label": "Select every row on this page",
      title: "Select every row on this page",
      onChange: i[0] || (i[0] = (o) => P(t).selectPage(!a.value))
    }, null, 40, oc));
  }
}), ic = {
  key: 0,
  class: "dc-actions"
}, cc = {
  key: 0,
  class: "dc-actions__select"
}, uc = {
  key: 0,
  class: "dc-actions__all"
}, dc = {
  class: "dc-actions__count",
  "aria-live": "polite"
}, fc = {
  key: 1,
  class: "dc-actions__count dc-actions__all",
  "aria-live": "polite"
}, pc = { class: "dc-actions__ops" }, vc = ["disabled"], hc = ["data-dc-operation", "disabled", "onClick"], mc = ["disabled"], gc = /* @__PURE__ */ te({
  __name: "RecordActions",
  props: {
    views: {}
  },
  setup(e) {
    const t = e, n = Ee(), a = p(() => n.entity.value), s = p(() => !Ba(n.query.value, t.views)), r = p(() => s.value && n.selectable.value), i = p(
      () => Kn(n.query.value.view, t.views) === "table"
    ), o = p(
      () => s.value && (r.value || !!(a.value?.create || a.value?.duplicate || a.value?.delete || a.value?.operations?.length))
    ), l = p(() => n.selection.value.ids.length), c = p(() => l.value ? `${l.value} selected` : i.value ? "None selected" : "Select all");
    function u(y) {
      return l.value ? `${y} ${l.value}` : y;
    }
    return (y, b) => o.value ? (d(), v("div", ic, [
      r.value ? (d(), v("div", cc, [
        i.value ? (d(), v("span", fc, R(c.value), 1)) : (d(), v("label", uc, [
          oe(Lr),
          x("span", dc, R(c.value), 1)
        ])),
        l.value ? (d(), v("button", {
          key: 2,
          type: "button",
          class: "dc-actions__clear",
          onClick: b[0] || (b[0] = (g) => P(n).clearSelection())
        }, " Clear ")) : A("", !0)
      ])) : A("", !0),
      x("div", pc, [
        a.value?.create ? (d(), v("button", {
          key: 0,
          type: "button",
          class: "dc-actions__op dc-actions__new",
          onClick: b[1] || (b[1] = (g) => P(n).create(a.value))
        }, [
          b[4] || (b[4] = x("span", {
            class: "dc-actions__plus",
            "aria-hidden": "true"
          }, "+", -1)),
          Te(" " + R(a.value.create), 1)
        ])) : A("", !0),
        a.value?.duplicate ? (d(), v("button", {
          key: 1,
          type: "button",
          class: "dc-actions__op",
          disabled: !l.value,
          onClick: b[2] || (b[2] = (g) => P(n).duplicate())
        }, R(u(a.value.duplicate)), 9, vc)) : A("", !0),
        (d(!0), v(Z, null, fe(a.value?.operations ?? [], (g) => (d(), v("button", {
          key: g.key,
          type: "button",
          class: "dc-actions__op",
          "data-dc-operation": g.key,
          disabled: !l.value,
          onClick: (m) => P(n).operate(g.key)
        }, R(u(g.label)), 9, hc))), 128)),
        a.value?.delete ? (d(), v("button", {
          key: 2,
          type: "button",
          class: "dc-actions__op dc-actions__danger",
          disabled: !l.value,
          onClick: b[3] || (b[3] = (g) => P(n).delete())
        }, R(u(a.value.delete)), 9, mc)) : A("", !0)
      ])
    ])) : A("", !0);
  }
}), Rr = /* @__PURE__ */ re(gc, [["__scopeId", "data-v-8548a5bf"]]), yc = ["href"], _c = /* @__PURE__ */ te({
  __name: "PressLink",
  props: {
    href: {}
  },
  emits: ["press"],
  setup(e, { emit: t }) {
    const n = e, a = t;
    function s(r) {
      if (n.href && $r(r)) {
        r.stopPropagation();
        return;
      }
      r.preventDefault(), a("press", Gn(r), r);
    }
    return (r, i) => e.href ? (d(), v("a", {
      key: 0,
      href: e.href,
      class: "dc-press",
      onClick: s
    }, [
      _e(r.$slots, "default", {}, void 0, !0)
    ], 8, yc)) : (d(), v("button", {
      key: 1,
      type: "button",
      class: "dc-press",
      onClick: s
    }, [
      _e(r.$slots, "default", {}, void 0, !0)
    ]));
  }
}), et = /* @__PURE__ */ re(_c, [["__scopeId", "data-v-a9383f64"]]);
function wc(e, t) {
  if (!e) return null;
  const n = Ke(e, t);
  return typeof n == "string" && n.trim() ? n : null;
}
const kc = (e) => e == null || typeof e == "string" && !e.trim();
function bc(e, t) {
  const n = Ze(t, "state"), a = Ze(t, "tint");
  return {
    identity: Cn(Ze(t, "identity"), e),
    reference: Cn(Ze(t, "reference"), e),
    metrics: lr(t, "metric").map((s) => ({
      column: s,
      label: s.label ?? "",
      text: qt(s, e)
    })),
    facts: t.filter((s) => s.cardLabel && !kc(Ke(s, e))).map((s) => ({
      column: s,
      label: s.cardLabel,
      title: [s.label, s.hint].filter(Boolean).join(" — "),
      text: qt(s, e)
    })),
    state: n ? Ke(n, e) ?? null : null,
    updated: Cn(Ze(t, "updated"), e),
    image: wc(Ze(t, "image"), e),
    tint: a ? Ke(a, e) ?? null : null
  };
}
function zr(e, t, n, a, s = !1) {
  const r = n?.columns ?? [];
  return {
    row: e,
    key: so(e, t),
    entityLabel: e.entityLabel,
    entity: n,
    columns: r,
    ordinal: Ql(t),
    parts: bc(e, r),
    pinned: a,
    selected: s
  };
}
function St() {
  const e = Ee(), t = p(
    () => new Map(e.entities.value.map((n) => [n.key, n]))
  );
  return p(
    () => e.rows.value.map(
      (n, a) => zr(
        n,
        e.offset.value + a,
        t.value.get(n.entityKey) ?? null,
        e.isPinned(n),
        e.isSelected(n)
      )
    )
  );
}
const $c = ["data-dc-status", "data-dc-tone"], xc = /* @__PURE__ */ te({
  __name: "StatusPill",
  props: {
    status: {},
    tone: {},
    label: {}
  },
  setup(e) {
    const t = e, n = p(() => t.label ?? t.status ?? "");
    return (a, s) => (d(), v("span", {
      class: "dc-pill",
      "data-dc-status": e.status,
      "data-dc-tone": e.tone
    }, R(n.value), 9, $c));
  }
}), fn = /* @__PURE__ */ re(xc, [["__scopeId", "data-v-686eb9b6"]]), Cc = { key: 1 }, Sc = /* @__PURE__ */ te({
  __name: "MetricDrill",
  props: {
    entry: {},
    column: {}
  },
  setup(e) {
    const t = e, n = Ee(), a = p(() => !t.entry.entity?.scope || !t.column.drill ? null : n.entities.value.find((c) => c.key === t.column.drill) ?? null), s = p(() => t.column.label ?? ""), r = p(() => qt(t.column, t.entry.row)), i = p(() => a.value ? n.drillHref(t.entry.row, a.value) : null);
    function o(l, c) {
      c.stopPropagation(), a.value && n.drill(t.entry.row, a.value, l);
    }
    return (l, c) => a.value ? (d(), G(et, {
      key: 0,
      class: "dc-drill",
      href: i.value,
      title: `${s.value} of ${e.entry.parts.identity} — show the ${a.value.label.toLowerCase()}`,
      onPress: o
    }, {
      default: Pe(() => [
        _e(l.$slots, "default", {}, () => [
          Te(R(r.value), 1)
        ], !0)
      ]),
      _: 3
    }, 8, ["href", "title"])) : (d(), v("span", Cc, [
      _e(l.$slots, "default", {}, () => [
        Te(R(r.value), 1)
      ], !0)
    ]));
  }
}), pn = /* @__PURE__ */ re(Sc, [["__scopeId", "data-v-d3e7f4e0"]]), Mc = ["data-dc-active", "aria-pressed", "aria-label"], Ec = /* @__PURE__ */ te({
  __name: "PinStar",
  props: {
    row: {},
    pinned: { type: Boolean },
    name: {}
  },
  setup(e) {
    const t = e, n = Ee();
    function a(s) {
      s.stopPropagation(), n.togglePin(t.row);
    }
    return (s, r) => (d(), v("button", {
      type: "button",
      class: "dc-star",
      "data-dc-active": e.pinned ? "true" : "false",
      "aria-pressed": e.pinned,
      "aria-label": e.pinned ? `Unpin ${e.name}` : `Pin ${e.name}`,
      onClick: a
    }, R(e.pinned ? "★" : "☆"), 9, Mc));
  }
}), Xa = /* @__PURE__ */ re(Ec, [["__scopeId", "data-v-ef63d763"]]), Pc = ["src"], Ac = /* @__PURE__ */ te({
  __name: "RowPicture",
  props: {
    src: {}
  },
  setup(e) {
    const t = e, n = D(!1);
    return Ce(
      () => t.src,
      () => {
        n.value = !1;
      }
    ), (a, s) => e.src.trim() && !n.value ? (d(), v("img", {
      key: 0,
      class: "dc-picture",
      src: e.src,
      alt: "",
      loading: "lazy",
      decoding: "async",
      onError: s[0] || (s[0] = (r) => n.value = !0)
    }, null, 40, Pc)) : A("", !0);
  }
}), Xn = /* @__PURE__ */ re(Ac, [["__scopeId", "data-v-afaab300"]]), Tc = ["data-dc-standing", "title", "aria-label"], Lc = /* @__PURE__ */ te({
  __name: "QueryMark",
  props: {
    entry: {}
  },
  setup(e) {
    const t = e, n = Ee(), a = p(() => jn(t.entry.entity, t.entry.row)), s = p(() => ja(n.query.value.expr, a.value)), r = p(
      () => s.value === "in" ? `The query narrows to ${t.entry.parts.identity} — press to lift that` : `The query leaves out ${t.entry.parts.identity} — press to lift that`
    );
    function i(o) {
      o.stopPropagation(), n.setExpression(br(n.query.value.expr, a.value));
    }
    return (o, l) => s.value ? (d(), v("button", {
      key: 0,
      type: "button",
      class: "dc-standing",
      "data-dc-standing": s.value,
      title: r.value,
      "aria-label": r.value,
      onClick: i
    }, R(s.value === "in" ? "+" : "−"), 9, Tc)) : A("", !0);
  }
}), Qa = /* @__PURE__ */ re(Lc, [["__scopeId", "data-v-4b8d4166"]]), Rc = ["aria-label"], zc = ["data-dc-standing", "data-dc-active", "aria-checked", "title", "aria-label", "onClick"], Fc = /* @__PURE__ */ te({
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
    return (o, l) => (d(), v("span", {
      class: "dc-standing-control",
      role: "radiogroup",
      "aria-label": `Where the query stands on ${e.name}`
    }, [
      (d(!0), v(Z, null, fe(s.value, (c) => (d(), v("button", {
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
      }, R(c.sign), 9, zc))), 128))
    ], 8, Rc));
  }
}), xa = /* @__PURE__ */ re(Fc, [["__scopeId", "data-v-adaa8412"]]), Fr = /* @__PURE__ */ te({
  __name: "RowStanding",
  props: {
    entry: {}
  },
  setup(e) {
    const t = e, n = Ee(), a = p(() => jn(t.entry.entity, t.entry.row)), s = p(() => ja(n.query.value.expr, a.value));
    function r(i) {
      n.setExpression($a(n.query.value.expr, a.value, i));
    }
    return (i, o) => a.value !== null ? (d(), G(xa, {
      key: 0,
      class: "dc-row-standing",
      standing: s.value,
      name: e.entry.parts.identity,
      onSet: r
    }, null, 8, ["standing", "name"])) : A("", !0);
  }
}), Ic = ["href", "title", "aria-label"], Nc = /* @__PURE__ */ te({
  __name: "OpenMark",
  props: {
    entry: {}
  },
  setup(e) {
    const t = e, n = Ee(), a = p(() => {
      const s = t.entry.row, r = n.recordHref?.(s) ?? null;
      return r ? n.pressHref(s) === r ? null : r : null;
    });
    return (s, r) => a.value ? (d(), v("a", {
      key: 0,
      class: "dc-open",
      href: a.value,
      target: "_blank",
      rel: "noopener noreferrer",
      title: a.value,
      "aria-label": `Open ${e.entry.parts.identity} in a new tab`,
      onClick: r[0] || (r[0] = He(() => {
      }, ["stop"]))
    }, "↗", 8, Ic)) : A("", !0);
  }
}), vn = /* @__PURE__ */ re(Nc, [["__scopeId", "data-v-b00f390d"]]), Bc = /* @__PURE__ */ te({
  __name: "ScopeMark",
  props: {
    entry: {}
  },
  setup(e) {
    const t = e, n = Ee(), a = p(
      () => n.narrowsOnPress.value ? null : t.entry.entity?.scope ?? null
    ), s = D(null);
    function r(u) {
      s.value = Gn(u).exclude ? "out" : "in";
    }
    function i(u) {
      r(u), window.addEventListener("keydown", r), window.addEventListener("keyup", r);
    }
    function o() {
      s.value = null, window.removeEventListener("keydown", r), window.removeEventListener("keyup", r);
    }
    Ve(o);
    const l = p(() => a.value ? n.drillHref(t.entry.row, null) : null);
    function c(u, y) {
      y.stopPropagation(), n.drill(t.entry.row, null, u);
    }
    return (u, y) => a.value ? (d(), G(et, {
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
      default: Pe(() => [...y[0] || (y[0] = [
        Te(" → ", -1)
      ])]),
      _: 1
    }, 8, ["href", "data-dc-pending", "title", "aria-label"])) : A("", !0);
  }
}), hn = /* @__PURE__ */ re(Bc, [["__scopeId", "data-v-05d2c233"]]), Oc = ["checked", "aria-label"], Mt = /* @__PURE__ */ te({
  __name: "SelectTick",
  props: {
    row: {},
    selected: { type: Boolean },
    name: {}
  },
  setup(e) {
    const t = e, n = Ee();
    function a(s) {
      s.stopPropagation(), n.toggleSelect(t.row);
    }
    return (s, r) => (d(), v("input", {
      class: "dc-tick",
      type: "checkbox",
      checked: e.selected,
      "aria-label": `Select ${e.name}`,
      onClick: a
    }, null, 8, Oc));
  }
}), Dc = { class: "dc-card__top dc-mono" }, qc = { class: "dc-card__lead" }, Hc = {
  key: 2,
  class: "dc-card__entity"
}, Kc = { class: "dc-card__top-right" }, Vc = { class: "dc-card__names" }, Wc = { class: "dc-card__primary" }, jc = {
  key: 0,
  class: "dc-card__secondary dc-mono"
}, Uc = {
  key: 1,
  class: "dc-card__facts dc-mono"
}, Gc = ["title"], Xc = { class: "dc-card__fact-label" }, Qc = {
  key: 0,
  class: "dc-card__metrics dc-mono"
}, Yc = {
  key: 0,
  class: "dc-card__date"
}, Zc = /* @__PURE__ */ te({
  __name: "CardsView",
  setup(e) {
    const t = Ee(), n = St(), a = p(() => t.isEverything.value), s = (i) => i.entity?.card === "picture", r = p(() => n.value.length > 0 && n.value.every(s));
    return (i, o) => (d(), v("div", {
      class: ht(["dc-cards", { "dc-cards--pictures": r.value }])
    }, [
      (d(!0), v(Z, null, fe(P(n), (l) => (d(), v("div", {
        key: l.key,
        class: ht(["dc-card", { "dc-card--picture": s(l) }])
      }, [
        x("div", Dc, [
          x("span", qc, [
            P(t).selectable.value ? (d(), G(Mt, {
              key: 0,
              row: l.row,
              selected: l.selected,
              name: l.parts.identity
            }, null, 8, ["row", "selected", "name"])) : A("", !0),
            s(l) ? A("", !0) : (d(), v(Z, { key: 1 }, [
              Te(R(l.ordinal), 1)
            ], 64)),
            a.value ? (d(), v("span", Hc, R(l.entityLabel), 1)) : A("", !0)
          ]),
          x("span", Kc, [
            l.parts.state && !s(l) ? (d(), G(fn, {
              key: 0,
              status: l.parts.state
            }, null, 8, ["status"])) : A("", !0),
            s(l) ? (d(), G(Qa, {
              key: 1,
              entry: l
            }, null, 8, ["entry"])) : (d(), G(Fr, {
              key: 2,
              entry: l
            }, null, 8, ["entry"])),
            oe(hn, { entry: l }, null, 8, ["entry"]),
            oe(vn, { entry: l }, null, 8, ["entry"]),
            P(t).pinnable.value ? (d(), G(Xa, {
              key: 3,
              row: l.row,
              name: l.parts.identity,
              pinned: l.pinned
            }, null, 8, ["row", "name", "pinned"])) : A("", !0)
          ])
        ]),
        oe(et, {
          class: "dc-card__open",
          href: P(t).pressHref(l.row),
          onPress: (c) => P(t).activate(l.row, c)
        }, {
          default: Pe(() => [
            l.parts.image ? (d(), G(Xn, {
              key: 0,
              class: "dc-card__image",
              src: l.parts.image
            }, null, 8, ["src"])) : A("", !0),
            x("span", Vc, [
              x("span", Wc, R(l.parts.identity), 1),
              s(l) ? A("", !0) : (d(), v("span", jc, R(l.parts.reference), 1)),
              l.parts.facts.length ? (d(), v("span", Uc, [
                (d(!0), v(Z, null, fe(l.parts.facts, (c) => (d(), v("span", {
                  key: c.column.key ?? c.label,
                  class: "dc-card__fact",
                  title: c.title || void 0
                }, [
                  x("span", Xc, R(c.label), 1),
                  Te(" " + R(c.text), 1)
                ], 8, Gc))), 128))
              ])) : A("", !0)
            ])
          ]),
          _: 2
        }, 1032, ["href", "onPress"]),
        s(l) ? A("", !0) : (d(), v("div", Qc, [
          (d(!0), v(Z, null, fe(l.parts.metrics.slice(0, 2), (c) => (d(), G(pn, {
            key: c.column.key ?? c.label,
            entry: l,
            column: c.column
          }, {
            default: Pe(() => [
              Te(R(c.label) + " " + R(c.text), 1)
            ]),
            _: 2
          }, 1032, ["entry", "column"]))), 128)),
          l.parts.updated ? (d(), v("span", Yc, R(l.parts.updated), 1)) : A("", !0)
        ]))
      ], 2))), 128))
    ], 2));
  }
}), Ir = /* @__PURE__ */ re(Zc, [["__scopeId", "data-v-e9bd4d6c"]]), Jc = { class: "dc-grid" }, eu = { class: "dc-tile__scrim" }, tu = { class: "dc-tile__top dc-mono" }, nu = { class: "dc-tile__chip" }, au = { class: "dc-tile__caption" }, su = { class: "dc-tile__secondary dc-truncate" }, ru = { class: "dc-tile__primary" }, lu = /* @__PURE__ */ te({
  __name: "GridView",
  setup(e) {
    const t = Ee(), n = St();
    return (a, s) => (d(), v("div", Jc, [
      (d(!0), v(Z, null, fe(P(n), (r) => (d(), v("div", {
        key: r.key,
        class: "dc-grid__cell"
      }, [
        oe(et, {
          class: "dc-tile",
          style: Me({ "--dc-tile-tint": r.parts.tint ?? void 0 }),
          href: P(t).pressHref(r.row),
          onPress: (i) => P(t).activate(r.row, i)
        }, {
          default: Pe(() => [
            r.parts.image ? (d(), G(Xn, {
              key: 0,
              class: "dc-tile__image",
              src: r.parts.image
            }, null, 8, ["src"])) : A("", !0),
            x("span", eu, [
              x("span", tu, [
                x("span", nu, R(r.ordinal), 1)
              ]),
              x("span", au, [
                x("span", su, R(r.parts.reference), 1),
                x("span", ru, R(r.parts.identity), 1)
              ])
            ])
          ]),
          _: 2
        }, 1032, ["style", "href", "onPress"]),
        P(t).selectable.value ? (d(), G(Mt, {
          key: 0,
          class: "dc-grid__tick",
          row: r.row,
          selected: r.selected,
          name: r.parts.identity
        }, null, 8, ["row", "selected", "name"])) : A("", !0)
      ]))), 128))
    ]));
  }
}), Nr = /* @__PURE__ */ re(lu, [["__scopeId", "data-v-12dd4d94"]]);
function Is(e, t, n, a) {
  return (n - a * (t - 1)) / e;
}
function ia(e, t) {
  return e > 0 ? Math.min(t, e) : t;
}
function ou(e) {
  return e > 0 ? e : 1 / 0;
}
function iu(e, t, n) {
  const { width: a, height: s, gap: r = 0 } = n;
  if (!e.length) return [];
  if (!(a > 0) || !(s > 0)) return [{ items: [...e], height: s, filled: !1 }];
  const i = [];
  let o = [], l = 0, c = 0;
  for (const u of e) {
    const y = t(u), b = Math.max(y.ratio, Number.EPSILON), g = y.height && y.height > 0 ? Math.max(c, y.height) : c, m = ia(g, s), _ = Is(l + b, o.length + 1, a, r);
    if (_ > m) {
      o.push(u), l += b, c = g;
      continue;
    }
    const $ = ia(c, s), k = o.length ? Is(l, o.length, a, r) : 1 / 0;
    k <= ou(c) && k - $ < m - _ ? (i.push({ items: o, height: k, filled: !0 }), o = [u], l = b, c = y.height && y.height > 0 ? y.height : 0) : (i.push({ items: [...o, u], height: _, filled: !0 }), o = [], l = 0, c = 0);
  }
  return o.length && i.push({ items: o, height: ia(c, s), filled: !1 }), i;
}
const cu = { class: "dc-images" }, uu = {
  key: 1,
  class: "dc-images__blank",
  "aria-hidden": "true"
}, du = 240, kn = 8, fu = 1, pu = /* @__PURE__ */ te({
  __name: "ImagesView",
  setup(e) {
    const t = Ee(), n = St(), a = ws(/* @__PURE__ */ new Map()), s = ws(/* @__PURE__ */ new Set());
    function r(m, _) {
      const $ = _.target;
      $.naturalWidth > 0 && $.naturalHeight > 0 && a.set(m, { width: $.naturalWidth, height: $.naturalHeight });
    }
    function i(m) {
      const _ = m.parts.image;
      return _ && !s.has(_) ? _ : null;
    }
    function o(m) {
      const _ = i(m);
      return _ ? a.get(_) : void 0;
    }
    function l(m) {
      const _ = o(m);
      return _ ? { ratio: _.width / _.height, height: _.height } : { ratio: fu };
    }
    const c = D(null), u = D(0);
    let y = null;
    function b() {
      u.value = c.value?.clientWidth ?? 0;
    }
    qn(() => {
      b(), !(!c.value || typeof ResizeObserver > "u") && (y = new ResizeObserver(b), y.observe(c.value));
    }), Ve(() => {
      y?.disconnect(), y = null;
    });
    const g = p(() => {
      const m = iu(n.value, l, {
        width: u.value,
        height: du,
        gap: kn
      }), _ = [];
      let $ = 0;
      for (const k of m) {
        let E = 0;
        for (const S of k.items) {
          const C = l(S).ratio * k.height, T = o(S), B = T !== void 0 && T.height < k.height;
          _.push({
            entry: S,
            style: {
              top: `${$}px`,
              left: `${E}px`,
              width: `${C}px`,
              height: `${k.height}px`
            },
            picture: B ? { width: `${T.width}px`, height: `${T.height}px` } : { width: "100%", height: "100%" }
          }), E += C + kn;
        }
        $ += k.height + kn;
      }
      return { boxes: _, height: m.length ? $ - kn : 0 };
    });
    return (m, _) => (d(), v("div", cu, [
      x("div", {
        ref_key: "wall",
        ref: c,
        class: "dc-images__wall",
        style: Me({ height: `${g.value.height}px` })
      }, [
        (d(!0), v(Z, null, fe(g.value.boxes, ({ entry: $, style: k, picture: E }) => (d(), v("div", {
          key: $.key,
          class: "dc-images__cell",
          style: Me(k)
        }, [
          oe(et, {
            class: "dc-images__open",
            title: $.parts.identity,
            "aria-label": $.parts.identity,
            href: P(t).pressHref($.row),
            onPress: (S) => P(t).activate($.row, S)
          }, {
            default: Pe(() => [
              i($) ? (d(), G(Xn, {
                key: 0,
                class: "dc-images__picture",
                style: Me(E),
                src: i($),
                onLoad: (S) => r(i($), S),
                onError: (S) => s.add(i($))
              }, null, 8, ["style", "src", "onLoad", "onError"])) : (d(), v("span", uu, R($.parts.identity), 1))
            ]),
            _: 2
          }, 1032, ["title", "aria-label", "href", "onPress"]),
          P(t).selectable.value ? (d(), G(Mt, {
            key: 0,
            class: "dc-images__tick",
            row: $.row,
            selected: $.selected,
            name: $.parts.identity
          }, null, 8, ["row", "selected", "name"])) : A("", !0)
        ], 4))), 128))
      ], 4)
    ]));
  }
}), Br = /* @__PURE__ */ re(pu, [["__scopeId", "data-v-d77205b8"]]), vu = { class: "dc-links" }, hu = { class: "dc-link__primary dc-truncate" }, mu = { class: "dc-link__secondary dc-mono dc-truncate" }, gu = /* @__PURE__ */ te({
  __name: "LinksView",
  setup(e) {
    const t = Ee(), n = St();
    return (a, s) => (d(), v("div", vu, [
      (d(!0), v(Z, null, fe(P(n), (r) => (d(), v("span", {
        key: r.key,
        class: "dc-links__item"
      }, [
        P(t).selectable.value ? (d(), G(Mt, {
          key: 0,
          row: r.row,
          selected: r.selected,
          name: r.parts.identity
        }, null, 8, ["row", "selected", "name"])) : A("", !0),
        oe(et, {
          class: "dc-link",
          href: P(t).pressHref(r.row),
          onPress: (i) => P(t).activate(r.row, i)
        }, {
          default: Pe(() => [
            x("span", hu, R(r.parts.identity), 1),
            x("span", mu, R(r.parts.reference), 1)
          ]),
          _: 2
        }, 1032, ["href", "onPress"])
      ]))), 128))
    ]));
  }
}), Or = /* @__PURE__ */ re(gu, [["__scopeId", "data-v-f47b75cf"]]), yu = {
  class: "dc-list",
  role: "list"
}, _u = { class: "dc-list__ordinal dc-mono" }, wu = { class: "dc-list__identity" }, ku = { class: "dc-list__primary dc-truncate" }, bu = { class: "dc-list__secondary dc-mono dc-truncate" }, $u = {
  key: 1,
  class: "dc-list__entity dc-mono"
}, xu = { class: "dc-list__metrics dc-mono" }, Cu = { class: "dc-list__trailing" }, Su = /* @__PURE__ */ te({
  __name: "ListView",
  setup(e) {
    const t = Ee(), n = St(), a = p(() => t.isEverything.value);
    return (s, r) => (d(), v("div", yu, [
      (d(!0), v(Z, null, fe(P(n), (i) => (d(), v("div", {
        key: i.key,
        class: "dc-list__row",
        role: "listitem"
      }, [
        P(t).selectable.value ? (d(), G(Mt, {
          key: 0,
          class: "dc-list__tick",
          row: i.row,
          selected: i.selected,
          name: i.parts.identity
        }, null, 8, ["row", "selected", "name"])) : A("", !0),
        oe(Fr, {
          class: "dc-list__standing",
          entry: i
        }, null, 8, ["entry"]),
        oe(et, {
          class: "dc-list__open",
          href: P(t).pressHref(i.row),
          onPress: (o) => P(t).activate(i.row, o)
        }, {
          default: Pe(() => [
            x("span", _u, R(i.ordinal), 1),
            x("span", wu, [
              x("span", ku, R(i.parts.identity), 1),
              x("span", bu, R(i.parts.reference), 1)
            ])
          ]),
          _: 2
        }, 1032, ["href", "onPress"]),
        a.value ? (d(), v("span", $u, R(i.entityLabel), 1)) : A("", !0),
        x("span", xu, [
          (d(!0), v(Z, null, fe(i.parts.metrics.slice(0, 2), (o) => (d(), G(pn, {
            key: o.column.key ?? o.label,
            entry: i,
            column: o.column
          }, null, 8, ["entry", "column"]))), 128))
        ]),
        x("span", Cu, [
          i.parts.state ? (d(), G(fn, {
            key: 0,
            status: i.parts.state
          }, null, 8, ["status"])) : A("", !0),
          oe(hn, { entry: i }, null, 8, ["entry"]),
          oe(vn, { entry: i }, null, 8, ["entry"]),
          P(t).pinnable.value ? (d(), G(Xa, {
            key: 1,
            row: i.row,
            name: i.parts.identity,
            pinned: i.pinned
          }, null, 8, ["row", "name", "pinned"])) : A("", !0)
        ])
      ]))), 128))
    ]));
  }
}), Ca = /* @__PURE__ */ re(Su, [["__scopeId", "data-v-21065d56"]]), Mu = { class: "dc-preview" }, Eu = { class: "dc-preview__pager dc-mono" }, Pu = ["disabled"], Au = { "aria-live": "polite" }, Tu = ["disabled"], Lu = {
  key: 0,
  class: "dc-preview__card"
}, Ru = ["src"], zu = { class: "dc-preview__body" }, Fu = { class: "dc-preview__top" }, Iu = { class: "dc-preview__badges" }, Nu = { class: "dc-preview__entity dc-mono" }, Bu = { class: "dc-preview__marks" }, Ou = { class: "dc-preview__primary" }, Du = { class: "dc-preview__secondary dc-mono" }, qu = { class: "dc-preview__fields" }, Hu = { class: "dc-preview__key" }, Ku = { class: "dc-preview__value dc-mono" }, Vu = /* @__PURE__ */ te({
  __name: "PreviewView",
  setup(e) {
    const t = Ee(), n = St(), a = D(0);
    Ce(n, (l) => {
      a.value > l.length - 1 && (a.value = Math.max(0, l.length - 1));
    });
    const s = p(() => n.value[a.value]), r = p(() => {
      const l = s.value;
      if (!l) return [];
      const c = Ze(l.columns, "reference"), u = Ze(l.columns, "updated");
      return [
        ...c ? [{ key: c.label ?? "Reference", value: l.parts.reference, column: null }] : [],
        ...l.parts.metrics.map((y) => ({
          key: y.label,
          value: y.text,
          column: y.column
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
    return (l, c) => (d(), v("div", Mu, [
      x("div", Eu, [
        x("button", {
          type: "button",
          class: "dc-preview__step",
          "aria-label": "Previous result",
          disabled: a.value === 0,
          onClick: c[0] || (c[0] = (u) => o(-1))
        }, " ‹ ", 8, Pu),
        x("span", Au, R(i.value), 1),
        x("button", {
          type: "button",
          class: "dc-preview__step",
          "aria-label": "Next result",
          disabled: a.value >= P(n).length - 1,
          onClick: c[1] || (c[1] = (u) => o(1))
        }, " › ", 8, Tu)
      ]),
      s.value ? (d(), v("div", Lu, [
        x("div", {
          class: "dc-preview__media",
          style: Me({ background: s.value.parts.tint ?? void 0 }),
          "aria-hidden": "true"
        }, [
          s.value.parts.image ? (d(), v("img", {
            key: 0,
            class: "dc-preview__image",
            src: s.value.parts.image,
            alt: ""
          }, null, 8, Ru)) : (d(), v(Z, { key: 1 }, [
            Te(" preview ")
          ], 64))
        ], 4),
        x("div", zu, [
          x("div", Fu, [
            x("span", Iu, [
              P(t).selectable.value ? (d(), G(Mt, {
                key: 0,
                row: s.value.row,
                selected: s.value.selected,
                name: s.value.parts.identity
              }, null, 8, ["row", "selected", "name"])) : A("", !0),
              s.value.parts.state ? (d(), G(fn, {
                key: 1,
                status: s.value.parts.state
              }, null, 8, ["status"])) : A("", !0),
              x("span", Nu, R(s.value.entityLabel), 1)
            ]),
            x("span", Bu, [
              oe(Qa, { entry: s.value }, null, 8, ["entry"]),
              oe(hn, { entry: s.value }, null, 8, ["entry"]),
              oe(vn, { entry: s.value }, null, 8, ["entry"]),
              P(t).pinnable.value ? (d(), G(Xa, {
                key: 0,
                row: s.value.row,
                name: s.value.parts.identity,
                pinned: s.value.pinned
              }, null, 8, ["row", "name", "pinned"])) : A("", !0)
            ])
          ]),
          x("div", null, [
            x("div", Ou, R(s.value.parts.identity), 1),
            x("div", Du, R(s.value.parts.reference), 1)
          ]),
          x("dl", qu, [
            (d(!0), v(Z, null, fe(r.value, (u) => (d(), v("div", {
              key: u.key,
              class: "dc-preview__field"
            }, [
              x("dt", Hu, R(u.key), 1),
              x("dd", Ku, [
                u.column && s.value ? (d(), G(pn, {
                  key: 0,
                  entry: s.value,
                  column: u.column
                }, null, 8, ["entry", "column"])) : (d(), v(Z, { key: 1 }, [
                  Te(R(u.value), 1)
                ], 64))
              ])
            ]))), 128))
          ]),
          oe(et, {
            class: "dc-preview__open",
            href: s.value ? P(t).pressHref(s.value.row) : null,
            onPress: c[2] || (c[2] = (u) => s.value && P(t).activate(s.value.row, u))
          }, {
            default: Pe(() => [...c[3] || (c[3] = [
              Te(" Open record → ", -1)
            ])]),
            _: 1
          }, 8, ["href"])
        ])
      ])) : A("", !0)
    ]));
  }
}), Dr = /* @__PURE__ */ re(Vu, [["__scopeId", "data-v-59e0d33b"]]);
function Wu() {
  const e = Ee();
  return p(() => no(e.schema.value, e.entity.value));
}
const ju = {
  key: 5,
  class: "dc-cell__text"
}, Uu = /* @__PURE__ */ te({
  __name: "ColumnCell",
  props: {
    column: {},
    entry: {}
  },
  setup(e) {
    const t = e, n = Ee(), a = p(() => t.column.kind ?? "text"), s = p(() => Ke(t.column, t.entry.row)), r = p(
      () => a.value === "ordinal" ? t.entry.ordinal : qt(t.column, t.entry.row)
    ), i = p(() => s.value), o = p(() => t.column.activate === !0 || !!t.column.click), l = p(() => _a(t.column)), c = p(() => or(t.column, t.entry.row));
    function u(g) {
      o.value && (g.stopPropagation(), y(Gn(g)));
    }
    function y(g) {
      t.column.click?.(t.entry.row, g), t.column.activate && n.activate(t.entry.row, g);
    }
    const b = p(
      () => t.column.activate && !t.column.click ? n.pressHref(t.entry.row) : null
    );
    return (g, m) => a.value === "component" && e.column.component ? (d(), G(Hn(e.column.component), {
      key: 0,
      row: e.entry.row,
      entry: e.entry,
      value: s.value,
      column: e.column
    }, null, 8, ["row", "entry", "value", "column"])) : a.value === "status" ? (d(), G(fn, {
      key: 1,
      status: i.value
    }, null, 8, ["status"])) : a.value === "image" ? (d(), G(Xn, {
      key: 2,
      class: "dc-cell__image",
      src: typeof s.value == "string" ? s.value : "",
      style: Me({ maxHeight: e.column.height }),
      onClick: u
    }, null, 8, ["src", "style"])) : e.column.drill ? (d(), G(pn, {
      key: 3,
      entry: e.entry,
      column: e.column
    }, null, 8, ["entry", "column"])) : o.value ? (d(), G(et, {
      key: 4,
      class: ht(["dc-table__open", { "dc-truncate": l.value }]),
      href: b.value,
      title: c.value,
      onPress: m[0] || (m[0] = (_, $) => {
        $.stopPropagation(), y(_);
      })
    }, {
      default: Pe(() => [
        Te(R(r.value), 1)
      ]),
      _: 1
    }, 8, ["class", "href", "title"])) : (d(), v("span", ju, R(r.value), 1));
  }
}), Ns = /* @__PURE__ */ re(Uu, [["__scopeId", "data-v-af24c370"]]), Gu = {
  key: 0,
  class: "dc-table__none"
}, Xu = { class: "dc-table__detail" }, Qu = ["data-dc-wrap"], Yu = {
  key: 0,
  class: "dc-table__pick",
  scope: "col"
}, Zu = {
  key: 1,
  class: "dc-table__standing",
  scope: "col"
}, Ju = ["data-dc-align", "data-dc-hide", "aria-sort", "title"], ed = ["onClick"], td = {
  key: 2,
  class: "dc-table__head"
}, nd = ["onClick"], ad = {
  key: 0,
  class: "dc-table__pick"
}, sd = {
  key: 1,
  class: "dc-table__standing"
}, rd = ["data-dc-align", "data-dc-hide", "title"], ld = {
  key: 0,
  class: "dc-table__name"
}, od = /* @__PURE__ */ te({
  __name: "TableView",
  setup(e) {
    const t = Ee(), n = St(), a = Wu();
    function s(M, q) {
      const V = t.pressHref(M);
      if (V && $r(q)) {
        const X = q.shiftKey ? `noopener,popup,width=${window.outerWidth},height=${window.outerHeight}` : "noopener";
        window.open(V, "_blank", X);
        return;
      }
      t.activate(M, Gn(q));
    }
    function r(M) {
      const q = po(M, t.entity.value), V = q ? `Shortcut: ${q}` : void 0;
      return [M.hint, V].filter(Boolean).join(`
`) || void 0;
    }
    const i = p(() => {
      const M = a.value.find((V) => V.scope);
      return M || ((t.entity.value ? !!t.entity.value.href : t.entities.value.some((V) => V.href)) ? a.value.find((V) => V.activate) : void 0);
    }), o = p(
      () => t.entity.value ? !!t.entity.value.scope : t.entities.value.some((M) => M.scope)
    ), l = (M) => jn(M.entity, M.row), c = (M) => ja(t.query.value.expr, l(M));
    function u(M, q) {
      t.setExpression($a(t.query.value.expr, l(M), q));
    }
    const y = p(() => {
      const M = n.value.filter((V) => l(V) !== null), q = M.filter((V) => V.selected);
      return q.length ? q : M;
    }), b = p(() => y.value.some((M) => M.selected)), g = p(() => {
      const M = y.value[0];
      return M ? c(M) : null;
    }), m = p(
      () => y.value.some((M) => c(M) !== g.value)
    ), _ = p(
      () => b.value ? "the ticked rows" : "every row on this page"
    );
    function $(M) {
      t.setExpression(
        y.value.reduce(
          (q, V) => $a(q, l(V), M),
          t.query.value.expr
        )
      );
    }
    const k = p(
      () => a.value.some((M) => M.kind === "image" || M.height !== void 0)
    );
    function E(M) {
      M && (t.query.value.sort === M ? t.toggleDirection() : t.setSort(M));
    }
    const S = p(() => t.entity.value?.label ?? "The result set"), C = p(() => new Set(t.sorts.value.map((M) => M.key))), T = (M) => M.sort !== void 0 && C.value.has(M.sort), B = (M) => {
      if (T(M))
        return t.query.value.sort !== M.sort ? "none" : t.query.value.dir === "desc" ? "descending" : "ascending";
    };
    function L(M) {
      return [
        xs(M),
        M.muted ? "dc-table__muted" : "",
        M.mono ? "dc-mono" : "",
        _a(M) ? "dc-truncate" : ""
      ].filter(Boolean).join(" ");
    }
    function z(M, q) {
      if (!(!_a(M) || M.activate || M.click))
        return or(M, q.row);
    }
    return (M, q) => P(a).length ? (d(), v("table", {
      key: 1,
      class: "dc-table",
      "data-dc-wrap": k.value ? "" : void 0
    }, [
      x("thead", null, [
        x("tr", null, [
          P(t).selectable.value ? (d(), v("th", Yu, [
            oe(Lr)
          ])) : A("", !0),
          o.value ? (d(), v("th", Zu, [
            y.value.length ? (d(), G(xa, {
              key: 0,
              standing: g.value,
              mixed: m.value,
              name: _.value,
              onSet: $
            }, null, 8, ["standing", "mixed", "name"])) : A("", !0)
          ])) : A("", !0),
          (d(!0), v(Z, null, fe(P(a), (V, X) => (d(), v("th", {
            key: P(bs)(V, X),
            scope: "col",
            class: ht(P(xs)(V)),
            style: Me({ width: V.width }),
            "data-dc-align": P($s)(V),
            "data-dc-hide": V.hideBelow,
            "aria-sort": B(V),
            title: r(V)
          }, [
            T(V) ? (d(), v("button", {
              key: 0,
              type: "button",
              class: "dc-table__sort",
              onClick: (de) => E(V.sort)
            }, R(V.label), 9, ed)) : (d(), v(Z, { key: 1 }, [
              Te(R(V.label), 1)
            ], 64)),
            V.header ? (d(), v("span", td, [
              (d(), G(Hn(V.header), {
                column: V,
                entity: P(t).entity.value
              }, null, 8, ["column", "entity"]))
            ])) : A("", !0)
          ], 14, Ju))), 128))
        ])
      ]),
      x("tbody", null, [
        (d(!0), v(Z, null, fe(P(n), (V) => (d(), v("tr", {
          key: V.key,
          class: "dc-table__row",
          onClick: (X) => s(V.row, X)
        }, [
          P(t).selectable.value ? (d(), v("td", ad, [
            oe(Mt, {
              row: V.row,
              selected: V.selected,
              name: V.parts.identity
            }, null, 8, ["row", "selected", "name"])
          ])) : A("", !0),
          o.value ? (d(), v("td", sd, [
            l(V) !== null ? (d(), G(xa, {
              key: 0,
              standing: c(V),
              name: V.parts.identity,
              onSet: (X) => u(V, X)
            }, null, 8, ["standing", "name", "onSet"])) : A("", !0)
          ])) : A("", !0),
          (d(!0), v(Z, null, fe(P(a), (X, de) => (d(), v("td", {
            key: P(bs)(X, de),
            class: ht(L(X)),
            "data-dc-align": P($s)(X),
            "data-dc-hide": X.hideBelow,
            title: z(X, V)
          }, [
            X === i.value ? (d(), v("span", ld, [
              oe(Ns, {
                column: X,
                entry: V
              }, null, 8, ["column", "entry"]),
              oe(hn, { entry: V }, null, 8, ["entry"]),
              oe(vn, { entry: V }, null, 8, ["entry"])
            ])) : (d(), G(Ns, {
              key: 1,
              column: X,
              entry: V
            }, null, 8, ["column", "entry"]))
          ], 10, rd))), 128))
        ], 8, nd))), 128))
      ])
    ], 8, Qu)) : (d(), v("p", Gu, [
      q[2] || (q[2] = x("span", { class: "dc-table__headline" }, "No columns declared", -1)),
      x("span", Xu, [
        Te(R(S.value) + " has no ", 1),
        q[0] || (q[0] = x("code", null, "columns", -1)),
        q[1] || (q[1] = Te(" in the schema, so there is no table to draw. ", -1))
      ])
    ]));
  }
}), qr = /* @__PURE__ */ re(od, [["__scopeId", "data-v-3c4caecf"]]);
function id(e) {
  const t = ct([]), n = D(!1), a = ct(null);
  let s = 0;
  const r = (l, c, u, y, b) => ({
    entity: l,
    rows: e.limit.value > 0 ? c.rows.map((g, m) => zr(g, m, l, e.isPinned(g.id))) : [],
    total: c.total,
    count: u ? l.count : String(c.total),
    pinned: cd(y, c, b)
  }), i = () => {
    const l = ++s, c = e.query.value, u = e.schema.value, y = e.entities.value, b = e.limit.value, g = e.within?.value.trim() ?? "", m = Na(c) && !g, _ = g ? qa(g, c.expr) : c.expr, $ = y.map((k) => ({
      entity: k,
      // Scope the query to this entity, keeping the expression and ordering
      // but dropping facets, which belong to whichever entity is selected.
      outcome: e.source.value.query({
        // Each card is the top few of its type, wherever the shell's own
        // result set has been paged to — so this asks for the first page.
        query: { ...c, entity: k.key, expr: _, facets: Dt(k), page: 1 },
        schema: u,
        entity: k,
        /*
         * One row where none are shown, not none: to a source a limit of 0 is
         * no limit, which would fetch every record of every type to draw a
         * count. The one row is still read — it is what says whether the type
         * holds nothing but the record the query named.
         */
        limit: Math.max(b, 1),
        offset: 0
      })
    }));
    if ($.every(({ outcome: k }) => !(k instanceof Promise))) {
      t.value = $.map(
        ({ entity: k, outcome: E }) => r(k, E, m, u, _)
      ), a.value = null, n.value = !1;
      return;
    }
    n.value = !0, Promise.all($.map(({ outcome: k }) => Promise.resolve(k))).then((k) => {
      l === s && (t.value = k.map(
        (E, S) => r($[S].entity, E, m, u, _)
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
  return Ce(
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
function cd(e, t, n) {
  const a = t.rows[0];
  if (t.total !== 1 || t.rows.length !== 1 || !a)
    return !1;
  const s = n.trim();
  if (!s)
    return !1;
  const r = In(e, a);
  return !!r && dn(s, r) === s;
}
const ud = ["data-dc-pending", "data-dc-heads-only"], dd = {
  key: 0,
  class: "dc-types__state",
  role: "alert"
}, fd = {
  key: 1,
  class: "dc-types__state",
  "aria-live": "polite"
}, pd = {
  key: 2,
  class: "dc-types__state"
}, vd = ["data-dc-empty"], hd = { class: "dc-type__name" }, md = { class: "dc-type__count dc-mono" }, gd = { class: "dc-type__sr" }, yd = {
  key: 0,
  class: "dc-type__description"
}, _d = {
  key: 0,
  class: "dc-type__empty"
}, wd = { class: "dc-type__identity" }, kd = { class: "dc-type__primary dc-truncate" }, bd = { class: "dc-type__secondary dc-mono dc-truncate" }, $d = { class: "dc-type__trailing dc-mono" }, xd = { class: "dc-type__metric-value" }, Cd = { class: "dc-type__metric-label" }, Sd = {
  key: 0,
  class: "dc-type__date"
}, Md = ["onClick"], Ed = /* @__PURE__ */ te({
  __name: "TypeCardsView",
  setup(e) {
    const t = Ee(), { previews: n, pending: a, error: s } = id({
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
    return (l, c) => (d(), v("div", {
      class: "dc-types",
      "data-dc-pending": P(a) ? "true" : "false",
      "data-dc-heads-only": i.value ? "true" : "false"
    }, [
      _e(l.$slots, "before", {}, void 0, !0),
      P(s) ? (d(), v("p", dd, " Could not load results: " + R(P(s) instanceof Error ? P(s).message : "the data source failed."), 1)) : !o.value.length && P(a) ? (d(), v("p", fd, " Running query… ")) : o.value.length ? A("", !0) : (d(), v("p", pd, R(r.value ? "Nothing matches this query" : "Nothing here yet"), 1)),
      (d(!0), v(Z, null, fe(o.value, (u) => (d(), v("section", {
        key: u.entity.key,
        class: "dc-type",
        "data-dc-empty": u.total ? "false" : "true"
      }, [
        oe(et, {
          class: "dc-type__head",
          href: P(t).entityHref(u.entity.key),
          onPress: (y) => P(t).setEntity(u.entity.key)
        }, {
          default: Pe(() => [
            x("span", hd, R(u.entity.label), 1),
            x("span", md, R(u.count), 1),
            c[0] || (c[0] = x("span", {
              class: "dc-type__go",
              "aria-hidden": "true"
            }, "→", -1)),
            x("span", gd, "Show only " + R(u.entity.label.toLowerCase()), 1),
            u.entity.description ? (d(), v("span", yd, R(u.entity.description), 1)) : A("", !0)
          ]),
          _: 2
        }, 1032, ["href", "onPress"]),
        u.total ? A("", !0) : (d(), v("p", _d, R(r.value ? "No matches" : "Nothing here yet"), 1)),
        (d(!0), v(Z, null, fe(u.rows, (y) => (d(), v("div", {
          key: y.key,
          class: "dc-type__row"
        }, [
          oe(et, {
            class: "dc-type__open",
            href: P(t).pressHref(y.row),
            onPress: (b) => P(t).activate(y.row, b)
          }, {
            default: Pe(() => [
              x("span", wd, [
                x("span", kd, R(y.parts.identity), 1),
                x("span", bd, R(y.parts.reference), 1)
              ])
            ]),
            _: 2
          }, 1032, ["href", "onPress"]),
          x("span", $d, [
            (d(!0), v(Z, null, fe(y.parts.metrics.slice(0, 1), (b) => (d(), G(pn, {
              key: b.column.key ?? b.label,
              class: "dc-type__metric",
              entry: y,
              column: b.column
            }, {
              default: Pe(() => [
                x("span", xd, R(b.text), 1),
                x("span", Cd, R(b.label), 1)
              ]),
              _: 2
            }, 1032, ["entry", "column"]))), 128)),
            y.parts.updated ? (d(), v("span", Sd, R(y.parts.updated), 1)) : A("", !0),
            oe(Qa, { entry: y }, null, 8, ["entry"]),
            oe(hn, { entry: y }, null, 8, ["entry"]),
            oe(vn, { entry: y }, null, 8, ["entry"])
          ])
        ]))), 128)),
        u.entity.create && !i.value ? (d(), v("button", {
          key: 1,
          type: "button",
          class: "dc-type__new",
          onClick: (y) => P(t).create(u.entity)
        }, [
          c[1] || (c[1] = x("span", {
            class: "dc-type__plus",
            "aria-hidden": "true"
          }, "+", -1)),
          Te(" " + R(u.entity.create), 1)
        ], 8, Md)) : A("", !0)
      ], 8, vd))), 128)),
      _e(l.$slots, "after", {}, void 0, !0)
    ], 8, ud));
  }
}), Hr = /* @__PURE__ */ re(Ed, [["__scopeId", "data-v-91923a83"]]), Pd = ["data-dc-pending"], Ad = {
  key: 0,
  class: "dc-results__state dc-results__state--loading",
  "aria-live": "polite"
}, Td = {
  key: 2,
  class: "dc-results__state",
  role: "alert"
}, Ld = { class: "dc-results__detail" }, Rd = {
  key: 3,
  class: "dc-results__state",
  "aria-live": "polite"
}, zd = {
  key: 4,
  class: "dc-results__state"
}, Fd = { class: "dc-results__detail" }, Id = /* @__PURE__ */ te({
  __name: "ResultsArea",
  props: {
    views: {},
    loading: { type: Boolean }
  },
  setup(e) {
    const t = e, n = Ee(), a = Vt(), s = {
      list: Ca,
      cards: Ir,
      grid: Nr,
      images: Br,
      table: qr,
      links: Or,
      preview: Dr
    }, r = p(() => Ba(n.query.value, t.views)), i = p(() => Kn(n.query.value.view, t.views)), o = p(() => s[i.value] ?? Ca), l = p(() => n.rows.value.length > 0), c = p(() => n.error.value !== null), u = D(null);
    return Ce(
      // The page on screen, which is the draft's own while one is being typed.
      () => n.liveQuery.value.page,
      () => {
        u.value && (u.value.scrollTop = 0);
      }
    ), (y, b) => (d(), v("div", {
      ref_key: "scroller",
      ref: u,
      class: "dc-results",
      "data-dc-pending": P(n).pending.value ? "true" : "false"
    }, [
      e.loading ? (d(), v("p", Ad, [...b[1] || (b[1] = [
        x("span", { class: "dc-results__detail" }, "Loading…", -1)
      ])])) : r.value ? (d(), G(Hr, { key: 1 }, xn({ _: 2 }, [
        a["cards-before"] ? {
          name: "before",
          fn: Pe(() => [
            _e(y.$slots, "cards-before", {}, void 0, !0)
          ]),
          key: "0"
        } : void 0,
        a["cards-after"] ? {
          name: "after",
          fn: Pe(() => [
            _e(y.$slots, "cards-after", {}, void 0, !0)
          ]),
          key: "1"
        } : void 0
      ]), 1024)) : c.value ? (d(), v("p", Td, [
        b[2] || (b[2] = x("span", { class: "dc-results__headline" }, "Could not load results", -1)),
        x("span", Ld, R(P(n).error.value instanceof Error ? P(n).error.value.message : "The data source failed."), 1)
      ])) : !l.value && P(n).pending.value ? (d(), v("p", Rd, [...b[3] || (b[3] = [
        x("span", { class: "dc-results__detail" }, "Running query…", -1)
      ])])) : l.value ? (d(), G(Hn(o.value), { key: 5 })) : (d(), v("div", zd, [
        b[4] || (b[4] = x("span", { class: "dc-results__headline" }, "Nothing matches this query", -1)),
        x("span", Fd, R(P(n).summary.value), 1),
        P(n).isPristine.value ? A("", !0) : (d(), v("button", {
          key: 0,
          type: "button",
          class: "dc-results__clear",
          onClick: b[0] || (b[0] = (g) => P(n).clearFilters())
        }, R(P(n).isEverything.value ? "Clear filters" : "Search everything instead"), 1))
      ]))
    ], 8, Pd));
  }
}), Kr = /* @__PURE__ */ re(Id, [["__scopeId", "data-v-eef33cd7"]]), Nd = ["data-dc-theme"], Bd = ["data-dc-width", "data-dc-align"], Od = { class: "dc-shell__panel" }, Dd = {
  key: 0,
  class: "dc-shell__page"
}, qd = /* @__PURE__ */ te({
  __name: "DataShell",
  props: /* @__PURE__ */ Tn({
    schema: {},
    source: {},
    route: {},
    defaults: {},
    within: {},
    limit: { default: 50 },
    previewsPerType: { default: 3 },
    views: {},
    loading: { type: Boolean, default: !1 },
    recordCards: {},
    typeChooser: { default: "scoped" },
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
  emits: /* @__PURE__ */ Tn(["activate", "create", "duplicate", "delete", "operate", "drill", "query-change", "toggle-pin"], ["update:open", "update:pinned", "update:selected"]),
  setup(e, { expose: t, emit: n }) {
    const a = e, s = n, r = Yt(e, "open"), i = Yt(e, "pinned"), o = Yt(e, "selected"), l = Vt(), c = Ot(Ys, null), u = a.route || c ? null : Hl(), y = a.route ?? c ?? u;
    Ve(() => u?.dispose?.());
    const b = p(() => zo({ seed: a.schema.key })), g = p(() => a.source ?? b.value), m = jo({
      schema: () => a.schema,
      adapter: y,
      defaults: () => a.defaults,
      navigationMode: () => a.navigationMode,
      facetNavigationMode: () => a.facetNavigationMode
    }), _ = p(() => a.within?.trim() ?? ""), $ = Xo({
      query: m.query,
      entity: m.entity,
      setExpression: m.setExpression
    }), k = Uo({
      source: g,
      query: $.live,
      schema: p(() => a.schema),
      entity: m.entity,
      limit: p(() => a.limit),
      within: _
    });
    Ce(m.query, (I) => s("query-change", I));
    const E = p(() => qo(a.schema, [m.query.value.expr])), S = p(
      () => E.value.flatMap((I) => {
        const ae = a.schema.entities.find((ve) => ve.key === I.entityKey);
        return ae ? [{ ...I, entity: ae }] : [];
      })
    );
    function C() {
      if (l.record) return S.value;
      const I = a.recordCards;
      return I ? S.value.filter((ae) => I[ae.entityKey]) : [];
    }
    const T = p(() => {
      const I = a.views;
      return typeof I != "function" ? I : I({ entity: m.entity.value, records: E.value });
    }), B = D(!!l.page);
    Rl(() => {
      B.value = !!l.page;
    }), Ce(
      [k.pageCount, k.pending, m.query, $.drafting, () => a.loading, B],
      () => {
        if (k.pending.value || $.drafting.value || a.loading || B.value) return;
        const I = k.pageCount.value;
        m.query.value.page > I && m.setPage(I, "replace");
      },
      // Immediately, since a pasted URL is past the end before anything changes;
      // and after the render, so the correction is a navigation the mounted shell
      // makes rather than one it makes on the way up. An async source is still
      // pending here and corrects itself when its count lands.
      { immediate: !0, flush: "post" }
    );
    const L = on() ?? "dc-query-panel", z = D(null);
    function M() {
      r.value && (r.value = !1, vt(() => {
        z.value?.$el?.querySelector(".dc-header__toggle")?.focus();
      }));
    }
    const q = p(() => new Set(i.value));
    function V(I) {
      const ae = new Set(q.value);
      ae.has(I.id) ? ae.delete(I.id) : ae.add(I.id), i.value = [...ae], s("toggle-pin", I);
    }
    const X = p(() => {
      if (a.selectable === !0) return !0;
      const I = m.entity.value;
      return !!(I?.duplicate || I?.delete || I?.operations?.length);
    }), de = p(() => new Set(o.value));
    function he(I) {
      const ae = new Set(de.value);
      ae.has(I.id) ? ae.delete(I.id) : ae.add(I.id), o.value = [...ae];
    }
    function Be(I) {
      const ae = new Set(de.value);
      for (const ve of k.rows.value)
        I ? ae.add(ve.id) : ae.delete(ve.id);
      o.value = [...ae];
    }
    function O() {
      o.value.length && (o.value = []);
    }
    const j = p(() => ({
      ids: [...o.value],
      rows: k.rows.value.filter((I) => de.value.has(I.id)),
      entity: m.entity.value
    }));
    Ce(() => m.query.value.entity, O);
    function we(I, ae, ve = {}) {
      const Oe = oa(a.schema, m.query.value, I, ve);
      ve.exclude ? m.narrow(Oe, ae?.key ?? m.query.value.entity) : $.release(() => m.narrow(Oe, ae?.key ?? null, ae ? void 0 : "cards")), s("drill", I, ae, ve);
    }
    function le(I) {
      return a.rowPress === "narrow" && In(a.schema, I) !== null;
    }
    function be(I) {
      return a.schema.entities.find((ve) => ve.key === I.entityKey)?.href?.(I) || null;
    }
    const xe = Ho({
      ...m,
      draft: $.text,
      liveQuery: $.live,
      drafting: $.drafting,
      commitDraft: $.commit,
      abandonDraft: $.abandon,
      /*
       * A page of what is on screen: the draft's, while one is live, which are
       * held beside it rather than in the URL — see `liveQuery`.
       */
      setPage: (I, ae) => {
        $.drafting.value ? $.setPage(I) : m.setPage(I, ae);
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
      within: _,
      pinnable: p(() => a.pinnable === !0),
      isPinned: (I) => q.value.has(I.id),
      isPinnedId: (I) => q.value.has(I),
      togglePin: V,
      selectable: X,
      selection: j,
      isSelected: (I) => de.value.has(I.id),
      toggleSelect: he,
      selectPage: Be,
      clearSelection: O,
      narrowsOnPress: p(() => a.rowPress === "narrow"),
      /*
       * The one place a press is read, so every view gets the same answer without
       * knowing which of the two it is: they all call this.
       */
      activate: (I, ae = {}) => {
        if (le(I)) {
          we(I, null, ae);
          return;
        }
        const ve = be(I);
        if (ve) {
          window.open(ve, "_blank", "noopener");
          return;
        }
        s("activate", I);
      },
      pressHref: (I) => le(I) ? m.narrowHref(oa(a.schema, m.query.value, I), null, "cards") : be(I),
      recordHref: be,
      drillHref: (I, ae) => In(a.schema, I) ? m.narrowHref(
        oa(a.schema, m.query.value, I),
        ae?.key ?? null,
        ae ? void 0 : "cards"
      ) : null,
      create: (I) => s("create", I),
      duplicate: () => s("duplicate", j.value),
      delete: () => s("delete", j.value),
      operate: (I) => s("operate", I, j.value),
      drill: we
    }), je = p(() => {
      if (!(!a.accent && !a.tokens))
        return { ...a.tokens, ...a.accent ? { "--dc-accent": a.accent } : {} };
    });
    return t({
      query: m.query,
      openPanel: () => {
        r.value = !0;
      },
      closePanel: M
    }), (I, ae) => (d(), v("div", {
      class: "dc-shell",
      "data-dc-theme": e.theme,
      style: Me(je.value)
    }, [
      x("div", {
        class: "dc-shell__head",
        "data-dc-width": e.matchWidth,
        "data-dc-align": e.matchWidth === "shrink" ? e.headAlign : void 0
      }, [
        oe(Pr, {
          ref_key: "headerRef",
          ref: z,
          expanded: r.value,
          "panel-id": P(L),
          views: T.value,
          "type-chooser": e.typeChooser,
          "pages-note": e.pagesNote,
          "hide-pages": e.loading || B.value,
          "hide-views": B.value,
          onToggle: ae[0] || (ae[0] = (ve) => r.value = !r.value)
        }, xn({ _: 2 }, [
          l.brand ? {
            name: "brand",
            fn: Pe((ve) => [
              _e(I.$slots, "brand", zl(Fl(ve)), void 0, !0)
            ]),
            key: "0"
          } : void 0,
          l.actions ? {
            name: "actions",
            fn: Pe(() => [
              _e(I.$slots, "actions", {}, void 0, !0)
            ]),
            key: "1"
          } : void 0
        ]), 1032, ["expanded", "panel-id", "views", "type-chooser", "pages-note", "hide-pages", "hide-views"]),
        r.value ? (d(), v(Z, { key: 0 }, [
          x("div", {
            class: "dc-shell__scrim",
            onClick: M
          }),
          x("div", Od, [
            oe(Tr, {
              "panel-id": P(L),
              onClose: M
            }, xn({ _: 2 }, [
              l["panel-section"] ? {
                name: "panel-section",
                fn: Pe(() => [
                  _e(I.$slots, "panel-section", {}, void 0, !0)
                ]),
                key: "0"
              } : void 0
            ]), 1032, ["panel-id"])
          ])
        ], 64)) : A("", !0)
      ], 8, Bd),
      l.page ? (d(), v("div", Dd, [
        _e(I.$slots, "page", {
          query: P(xe).query.value
        }, void 0, !0)
      ])) : A("", !0),
      l.page ? A("", !0) : (d(), G(Rr, {
        key: 1,
        views: T.value
      }, null, 8, ["views"])),
      l.page ? A("", !0) : _e(I.$slots, "results", {
        rows: P(xe).rows.value,
        total: P(xe).total.value,
        offset: P(xe).offset.value,
        pageCount: P(xe).pageCount.value,
        query: P(xe).liveQuery.value,
        pending: P(xe).pending.value,
        loading: e.loading
      }, () => [
        oe(Kr, {
          views: T.value,
          loading: e.loading
        }, xn({ _: 2 }, [
          l["cards-before"] || C().length ? {
            name: "cards-before",
            fn: Pe(() => [
              (d(!0), v(Z, null, fe(C(), (ve) => (d(), v(Z, {
                key: `${ve.entityKey}:${ve.id}`
              }, [
                l.record ? _e(I.$slots, "record", {
                  id: ve.id,
                  entity: ve.entity
                }, void 0, !0, 0) : (d(), G(Hn(e.recordCards?.[ve.entityKey]), {
                  key: 1,
                  id: ve.id
                }, null, 8, ["id"]))
              ], 64))), 128)),
              _e(I.$slots, "cards-before", {}, void 0, !0)
            ]),
            key: "0"
          } : void 0,
          l["cards-after"] ? {
            name: "cards-after",
            fn: Pe(() => [
              _e(I.$slots, "cards-after", {}, void 0, !0)
            ]),
            key: "1"
          } : void 0
        ]), 1032, ["views", "loading"])
      ], !0, 2)
    ], 12, Nd));
  }
}), Hd = /* @__PURE__ */ re(qd, [["__scopeId", "data-v-266e3c9b"]]), Kd = ["data-dc-muted", "data-dc-collapsed"], Vd = ["data-dc-collapsible"], Wd = ["aria-expanded", "aria-controls"], jd = { class: "dc-shell-card__sr" }, Ud = {
  key: 0,
  class: "dc-shell-card__identity"
}, Gd = { class: "dc-shell-card__title dc-shell-card__name" }, Xd = {
  key: 0,
  class: "dc-shell-card__ref dc-mono"
}, Qd = {
  key: 1,
  class: "dc-shell-card__title"
}, Yd = {
  key: 2,
  class: "dc-shell-card__count dc-mono"
}, Zd = {
  key: 1,
  class: "dc-shell-card__aside"
}, Jd = ["data-dc-flush"], ef = /* @__PURE__ */ te({
  __name: "ShellCard",
  props: {
    title: {},
    name: {},
    reference: {},
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
    const n = e, a = t, s = D(n.defaultCollapsed === !0), r = p(() => n.span === "all" ? { gridColumn: "1 / -1" } : void 0), i = Vt();
    function o(z) {
      return l(z?.() ?? []);
    }
    function l(z) {
      return z.some((M) => M.type === Il ? !1 : M.type === Nl ? String(M.children ?? "").trim().length > 0 : M.type === Z ? l(M.children ?? []) : !0);
    }
    const c = p(
      () => !!n.title || !!n.name || u.value || o(i.head)
    ), u = p(() => o(i.aside)), y = p(() => o(i.default)), b = p(() => o(i.foot)), g = p(
      () => !!n.name && (!!n.reference || o(i.reference))
    ), m = p(() => n.collapsible === !0 && c.value), _ = p(() => m.value && (n.collapsed ?? s.value));
    function $() {
      const z = !_.value;
      s.value = z, a("update:collapsed", z);
    }
    const k = on() ?? "dc-shell-card", E = `${k}-body`, S = `${k}-foot`, C = p(
      () => [y.value ? E : "", b.value ? S : ""].filter(Boolean).join(" ") || void 0
    ), T = [
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
    ].join(", "), B = D(null);
    function L(z) {
      if (!m.value) return;
      const M = z.target?.closest(T);
      M && B.value?.contains(M) || typeof window < "u" && window.getSelection()?.toString() || $();
    }
    return (z, M) => (d(), v("section", {
      class: "dc-shell-card",
      style: Me(r.value),
      "data-dc-muted": e.muted ? "true" : "false",
      "data-dc-collapsed": _.value ? "true" : "false"
    }, [
      c.value ? (d(), v("header", {
        key: 0,
        ref_key: "head",
        ref: B,
        class: "dc-shell-card__head",
        "data-dc-collapsible": m.value ? "true" : "false",
        onClick: L
      }, [
        m.value ? (d(), v("button", {
          key: 0,
          type: "button",
          class: "dc-shell-card__toggle",
          "aria-expanded": _.value ? "false" : "true",
          "aria-controls": C.value,
          onClick: $
        }, [
          M[0] || (M[0] = x("svg", {
            class: "dc-shell-card__chevron",
            viewBox: "0 0 10 10",
            "aria-hidden": "true"
          }, [
            x("path", { d: "M2 3.5 5 6.5 8 3.5" })
          ], -1)),
          x("span", jd, R(e.name || e.title || "Card"), 1)
        ], 8, Wd)) : A("", !0),
        _e(z.$slots, "head", {}, () => [
          e.name ? (d(), v("div", Ud, [
            x("h2", Gd, R(e.name), 1),
            g.value ? (d(), v("span", Xd, [
              _e(z.$slots, "reference", {}, () => [
                Te(R(e.reference), 1)
              ], !0)
            ])) : A("", !0)
          ])) : (d(), v("h2", Qd, R(e.title), 1)),
          e.count !== void 0 ? (d(), v("span", Yd, R(e.count), 1)) : A("", !0)
        ], !0),
        u.value ? (d(), v("span", Zd, [
          _e(z.$slots, "aside", {}, void 0, !0)
        ])) : A("", !0)
      ], 8, Vd)) : A("", !0),
      y.value ? mt((d(), v("div", {
        key: 1,
        id: E,
        class: "dc-shell-card__body",
        "data-dc-flush": e.flush ? "true" : "false"
      }, [
        _e(z.$slots, "default", {}, void 0, !0)
      ], 8, Jd)), [
        [Ln, !_.value]
      ]) : A("", !0),
      b.value ? mt((d(), v("footer", {
        key: 2,
        id: S,
        class: "dc-shell-card__foot"
      }, [
        _e(z.$slots, "foot", {}, void 0, !0)
      ], 512)), [
        [Ln, !_.value]
      ]) : A("", !0)
    ], 12, Kd));
  }
}), Bv = /* @__PURE__ */ re(ef, [["__scopeId", "data-v-3a7425d2"]]), tf = ["aria-label"], nf = ["aria-checked", "data-dc-active", "tabindex", "onClick", "onKeydown"], af = /* @__PURE__ */ te({
  __name: "SegmentedControl",
  props: {
    modelValue: {},
    options: {},
    label: {},
    mono: { type: Boolean }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const n = e, a = t, s = D([]);
    function r(i, o) {
      const l = n.options.length;
      let c = null;
      if (i.key === "ArrowRight" || i.key === "ArrowDown" ? c = (o + 1) % l : i.key === "ArrowLeft" || i.key === "ArrowUp" ? c = (o - 1 + l) % l : i.key === "Home" ? c = 0 : i.key === "End" && (c = l - 1), c === null) return;
      i.preventDefault();
      const u = n.options[c];
      u && (a("update:modelValue", u.key), s.value[c]?.focus());
    }
    return (i, o) => (d(), v("div", {
      class: "dc-segmented",
      role: "radiogroup",
      "aria-label": e.label
    }, [
      (d(!0), v(Z, null, fe(e.options, (l, c) => (d(), v("button", {
        key: l.key,
        ref_for: !0,
        ref_key: "buttons",
        ref: s,
        type: "button",
        role: "radio",
        class: ht(["dc-segmented__item", { "dc-segmented__item--mono": e.mono }]),
        "aria-checked": l.key === e.modelValue,
        "data-dc-active": l.key === e.modelValue ? "true" : "false",
        tabindex: l.key === e.modelValue ? 0 : -1,
        onClick: (u) => a("update:modelValue", l.key),
        onKeydown: (u) => r(u, c)
      }, R(l.label), 43, nf))), 128))
    ], 8, tf));
  }
}), sf = /* @__PURE__ */ re(af, [["__scopeId", "data-v-63fb5482"]]), rf = ["data-dc-theme", "aria-label"], lf = ["aria-expanded", "aria-disabled", "disabled", "data-dc-menu", "tabindex", "onClick", "onMouseenter"], of = /* @__PURE__ */ te({
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
    }), s = t, r = D(null), i = D([]), o = D(null), l = D(null), c = D(!1), u = p(
      () => n.menus.flatMap((C, T) => en(C) ? [T] : [])
    );
    function y(C, T) {
      const B = i.value[C]?.getBoundingClientRect(), L = n.menus[C];
      !B || !L || !en(L) || (l.value = { x: B.left, y: B.bottom + 2, mirrorX: B.right }, o.value = C, c.value = T);
    }
    function b(C) {
      const T = o.value;
      o.value = null, l.value = null, C && T !== null && i.value[T]?.focus();
    }
    function g(C) {
      o.value === C ? b(!0) : y(C, !1);
    }
    function m(C) {
      o.value === null || o.value === C || y(C, !1);
    }
    function _(C, T) {
      const B = u.value;
      if (B.length === 0) return null;
      if (C === null) return T === 1 ? B[0] ?? null : B[B.length - 1] ?? null;
      const L = B.indexOf(C);
      return L === -1 ? B[0] ?? null : B[(L + T + B.length) % B.length] ?? null;
    }
    function $(C) {
      const T = C.key;
      if (T === "Escape") {
        if (o.value === null) return;
        C.preventDefault(), b(!0);
        return;
      }
      if (T === "ArrowDown" && o.value === null) {
        const z = k();
        if (z === null) return;
        C.preventDefault(), y(z, !0);
        return;
      }
      if (T !== "ArrowLeft" && T !== "ArrowRight") return;
      const B = o.value ?? k(), L = _(B, T === "ArrowRight" ? 1 : -1);
      L !== null && (C.preventDefault(), o.value !== null ? y(L, !0) : i.value[L]?.focus());
    }
    function k() {
      const C = i.value.findIndex((T) => T === document.activeElement);
      return C === -1 ? u.value[0] ?? null : C;
    }
    function E(C) {
      const T = C.target;
      !T || r.value?.contains(T) || b(!1);
    }
    Ce(o, (C) => {
      C !== null ? window.addEventListener("pointerdown", E, !0) : window.removeEventListener("pointerdown", E, !0);
    }), Ve(() => window.removeEventListener("pointerdown", E, !0));
    function S(C) {
      b(!0), C.action?.(), s("choose", C);
    }
    return (C, T) => (d(), v("div", {
      ref_key: "bar",
      ref: r,
      class: "dc-shell dc-menubar",
      role: "menubar",
      "data-dc-theme": e.theme,
      "aria-label": e.label ?? "Main menu",
      style: Me(a.value),
      onKeydown: $
    }, [
      (d(!0), v(Z, null, fe(e.menus, (B, L) => (d(), v("button", {
        key: B.id ?? B.label ?? L,
        ref_for: !0,
        ref: (z) => {
          z && (i.value[L] = z);
        },
        type: "button",
        class: "dc-menubar__item",
        role: "menuitem",
        "aria-haspopup": "menu",
        "aria-expanded": o.value === L,
        "aria-disabled": B.disabled ? "true" : void 0,
        disabled: B.disabled,
        "data-dc-menu": B.id ?? B.label,
        tabindex: L === (u.value[0] ?? 0) ? 0 : -1,
        onClick: (z) => g(L),
        onMouseenter: (z) => m(L)
      }, R(B.label), 41, lf))), 128)),
      o.value !== null && l.value ? (d(), G(Ga, {
        key: o.value,
        items: e.menus[o.value]?.items ?? [],
        at: l.value,
        label: e.menus[o.value]?.label,
        autofocus: c.value,
        onChoose: S,
        onDismiss: T[0] || (T[0] = (B) => b(!0))
      }, null, 8, ["items", "at", "label", "autofocus"])) : A("", !0)
    ], 44, rf));
  }
}), Ov = /* @__PURE__ */ re(of, [["__scopeId", "data-v-93dbd2e4"]]), cf = ["aria-label", "aria-expanded", "disabled"], uf = { "aria-hidden": "true" }, df = /* @__PURE__ */ te({
  __name: "MenuButton",
  props: {
    items: {},
    label: {},
    glyph: { default: "⋯" }
  },
  emits: ["choose"],
  setup(e, { emit: t }) {
    const n = t, a = D(null), s = D(null), r = D(null), i = D(!1), o = p(() => r.value !== null);
    function l(m) {
      const _ = a.value?.getBoundingClientRect();
      _ && (r.value = { x: _.left, y: _.bottom + 4, mirrorX: _.right }, i.value = m);
    }
    function c(m) {
      r.value = null, m && a.value?.focus();
    }
    function u() {
      o.value ? c(!0) : l(!1);
    }
    function y(m) {
      m.key !== "ArrowDown" || o.value || (m.preventDefault(), l(!0));
    }
    function b(m) {
      const _ = m.target;
      _ && (a.value?.contains(_) || s.value?.root?.contains(_) || c(!1));
    }
    Ce(o, (m) => {
      m ? window.addEventListener("pointerdown", b, !0) : window.removeEventListener("pointerdown", b, !0);
    }), Ve(() => window.removeEventListener("pointerdown", b, !0));
    function g(m) {
      c(!0), m.action?.(), n("choose", m);
    }
    return (m, _) => (d(), v(Z, null, [
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
        onKeydown: y
      }, [
        x("span", uf, R(e.glyph), 1)
      ], 40, cf),
      r.value ? (d(), G(Ga, {
        key: 0,
        ref_key: "menu",
        ref: s,
        items: e.items,
        at: r.value,
        label: e.label,
        autofocus: i.value,
        onChoose: g,
        onDismiss: _[0] || (_[0] = ($) => c(!0))
      }, null, 8, ["items", "at", "label", "autofocus"])) : A("", !0)
    ], 64));
  }
}), Ya = /* @__PURE__ */ re(df, [["__scopeId", "data-v-48f5ada5"]]), ff = { class: "dc-fact__label" }, pf = ["title"], vf = /* @__PURE__ */ te({
  __name: "ShellFact",
  props: {
    label: {},
    value: {},
    title: {},
    wide: { type: Boolean }
  },
  setup(e) {
    const t = e, n = p(() => {
      const s = t.value;
      if (s == null || s === "") return [rt];
      if (Array.isArray(s)) {
        const r = s.filter((i) => i != null && i !== "");
        return r.length ? r.map(String) : [rt];
      }
      return [String(s)];
    }), a = p(() => t.wide ? { gridColumn: "1 / -1" } : void 0);
    return (s, r) => (d(), v("div", {
      class: "dc-fact",
      style: Me(a.value)
    }, [
      x("dt", ff, [
        _e(s.$slots, "label", {}, () => [
          Te(R(e.label), 1)
        ], !0)
      ]),
      x("dd", {
        class: "dc-fact__value dc-mono",
        title: e.title
      }, [
        _e(s.$slots, "default", {}, () => [
          n.value.length === 1 ? (d(), v(Z, { key: 0 }, [
            Te(R(n.value[0]), 1)
          ], 64)) : (d(!0), v(Z, { key: 1 }, fe(n.value, (i, o) => (d(), v("span", {
            key: o,
            class: "dc-fact__line"
          }, R(i), 1))), 128))
        ], !0)
      ], 8, pf)
    ], 4));
  }
}), hf = /* @__PURE__ */ re(vf, [["__scopeId", "data-v-1f6d25e6"]]), mf = /* @__PURE__ */ te({
  __name: "ShellFacts",
  props: {
    items: { default: () => [] },
    min: { default: "200px" }
  },
  setup(e) {
    const t = e, n = p(() => ({ "--dc-facts-min": t.min }));
    return (a, s) => (d(), v("dl", {
      class: "dc-facts",
      style: Me(n.value)
    }, [
      (d(!0), v(Z, null, fe(e.items, (r, i) => (d(), G(hf, {
        key: `${i}:${r.label}`,
        label: r.label,
        value: r.value,
        title: r.title,
        wide: r.wide
      }, null, 8, ["label", "value", "title", "wide"]))), 128)),
      _e(a.$slots, "default", {}, void 0, !0)
    ], 4));
  }
}), Dv = /* @__PURE__ */ re(mf, [["__scopeId", "data-v-17455afa"]]), gf = { class: "dc-counts" }, yf = ["data-dc-tone"], _f = {
  key: 0,
  class: "dc-counts__empty"
}, wf = /* @__PURE__ */ te({
  __name: "StatusCounts",
  props: {
    counts: {},
    empty: { default: rt }
  },
  setup(e) {
    const t = e, n = p(() => t.counts.filter((a) => a.count > 0));
    return (a, s) => (d(), v("span", gf, [
      (d(!0), v(Z, null, fe(n.value, (r) => (d(), v("span", {
        key: r.label,
        class: "dc-counts__count",
        "data-dc-tone": r.tone ?? "neutral"
      }, R(r.count) + " " + R(r.label), 9, yf))), 128)),
      n.value.length === 0 ? (d(), v("span", _f, R(e.empty), 1)) : A("", !0)
    ]));
  }
}), qv = /* @__PURE__ */ re(wf, [["__scopeId", "data-v-5553a9e2"]]), kf = ["data-dc-copied", "title", "aria-label"], bf = {
  key: 0,
  class: "dc-copy__mark",
  viewBox: "0 0 16 16",
  "aria-hidden": "true"
}, $f = {
  key: 1,
  class: "dc-copy__mark",
  viewBox: "0 0 16 16",
  "aria-hidden": "true"
}, xf = 1500, Cf = /* @__PURE__ */ te({
  __name: "CopyButton",
  props: {
    text: {},
    label: { default: "Copy to clipboard" }
  },
  emits: ["copied", "error"],
  setup(e, { emit: t }) {
    const n = e, a = t, s = D(!1);
    let r;
    async function i() {
      const o = typeof n.text == "function" ? n.text() : n.text;
      try {
        if (!navigator.clipboard) throw new Error("The clipboard is not available here");
        await navigator.clipboard.writeText(o);
      } catch (l) {
        a("error", l);
        return;
      }
      s.value = !0, clearTimeout(r), r = setTimeout(() => {
        s.value = !1;
      }, xf), a("copied", o);
    }
    return Ve(() => clearTimeout(r)), (o, l) => (d(), v("button", {
      type: "button",
      class: "dc-copy",
      "data-dc-copied": s.value ? "true" : "false",
      title: s.value ? "Copied" : e.label,
      "aria-label": e.label,
      onClick: i
    }, [
      s.value ? (d(), v("svg", $f, [...l[1] || (l[1] = [
        x("path", { d: "M3 8.5l3.2 3L13 4.5" }, null, -1)
      ])])) : (d(), v("svg", bf, [...l[0] || (l[0] = [
        x("rect", {
          x: "5.5",
          y: "5.5",
          width: "8",
          height: "9",
          rx: "1.5"
        }, null, -1),
        x("path", { d: "M10.5 3.5v-1a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h1" }, null, -1)
      ])]))
    ], 8, kf));
  }
}), Sf = /* @__PURE__ */ re(Cf, [["__scopeId", "data-v-f4249d7f"]]), Mf = ["data-dc-copy", "data-dc-wrap", "data-dc-tone"], Ef = /* @__PURE__ */ te({
  __name: "ShellCode",
  props: {
    code: { default: void 0 },
    maxHeight: { default: void 0 },
    copy: { type: Boolean },
    copyLabel: { default: "Copy to clipboard" },
    wrap: { type: Boolean, default: !0 },
    tone: { default: void 0 }
  },
  emits: ["copied", "error"],
  setup(e, { emit: t }) {
    const n = e, a = t, s = D(null), r = p(() => n.maxHeight === void 0 ? void 0 : { maxHeight: typeof n.maxHeight == "number" ? `${n.maxHeight}px` : n.maxHeight });
    function i() {
      return n.code ?? s.value?.textContent ?? "";
    }
    return (o, l) => (d(), v("div", {
      class: "dc-code",
      "data-dc-copy": e.copy ? "true" : "false",
      "data-dc-wrap": e.wrap ? "true" : "false",
      "data-dc-tone": e.tone
    }, [
      x("pre", {
        ref_key: "pre",
        ref: s,
        class: "dc-code__text dc-mono",
        style: Me(r.value)
      }, [
        _e(o.$slots, "default", {}, () => [
          Te(R(e.code), 1)
        ], !0)
      ], 4),
      e.copy ? (d(), G(Sf, {
        key: 0,
        class: "dc-code__copy",
        text: i,
        label: e.copyLabel,
        onCopied: l[0] || (l[0] = (c) => a("copied", c)),
        onError: l[1] || (l[1] = (c) => a("error", c))
      }, null, 8, ["label"])) : A("", !0)
    ], 8, Mf));
  }
}), Hv = /* @__PURE__ */ re(Ef, [["__scopeId", "data-v-67b371dd"]]), Pf = 24, Af = /* @__PURE__ */ te({
  __name: "ShellLog",
  props: {
    fetchChunk: {},
    stripAnsi: { type: Boolean },
    maxHeight: { default: "460px" }
  },
  setup(e, { expose: t }) {
    const n = e, a = D(""), s = p(() => n.stripAnsi ? to(a.value) : a.value), r = D(null);
    let i = 0, o = null;
    function l() {
      return o ??= c().finally(() => {
        o = null;
      }), o;
    }
    async function c() {
      const { chunk: b, offset: g } = await n.fetchChunk(i);
      if (i = g, !b) return;
      const m = r.value, _ = !m || m.scrollTop + m.clientHeight >= m.scrollHeight - Pf;
      a.value += b, _ && (await vt(), r.value && (r.value.scrollTop = r.value.scrollHeight));
    }
    function u() {
      a.value = "", i = 0;
    }
    const y = p(() => n.maxHeight === void 0 ? void 0 : { maxHeight: typeof n.maxHeight == "number" ? `${n.maxHeight}px` : n.maxHeight });
    return t({ poll: l, reset: u }), (b, g) => (d(), v("pre", {
      ref_key: "pane",
      ref: r,
      class: "dc-log dc-mono",
      style: Me(y.value)
    }, R(s.value), 5));
  }
}), Kv = /* @__PURE__ */ re(Af, [["__scopeId", "data-v-2c86947e"]]);
function Vr(e) {
  const t = Bl(), n = ct(null);
  function a() {
    const i = t?.proxy?.$el, l = (i instanceof Element ? i : i?.parentElement)?.closest(".dc-shell");
    if (!l) {
      n.value = null;
      return;
    }
    const c = {};
    for (const u of Array.from(l.style))
      u.startsWith("--") && (c[u] = l.style.getPropertyValue(u));
    n.value = { theme: l.dataset.dcTheme, tokens: c };
  }
  const s = p(() => e.theme ?? n.value?.theme ?? "minimal"), r = p(() => {
    const i = {
      ...n.value?.tokens,
      ...e.tokens,
      ...e.accent ? { "--dc-accent": e.accent } : {}
    };
    return Object.keys(i).length ? i : void 0;
  });
  return { theme: s, style: r, adopt: a };
}
const Tf = ["data-dc-theme"], Lf = ["aria-labelledby", "aria-label"], Rf = { class: "dc-dialog__body" }, zf = {
  key: 1,
  class: "dc-dialog__actions"
}, Gt = [], Ff = /* @__PURE__ */ te({
  __name: "ShellDialog",
  props: {
    open: { type: Boolean, default: !0 },
    title: { default: void 0 },
    label: { default: void 0 },
    to: { default: "body" },
    theme: { default: void 0 },
    accent: { default: void 0 },
    tokens: { default: void 0 }
  },
  emits: ["close", "update:open"],
  setup(e, { emit: t }) {
    const n = e, a = t, { theme: s, style: r, adopt: i } = Vr(n), o = `${on() ?? "dc-dialog"}-title`, l = D(null);
    function c() {
      a("close"), a("update:open", !1);
    }
    const u = Symbol("dc-dialog");
    function y(S) {
      S.key !== "Escape" || S.defaultPrevented || Gt[Gt.length - 1] === u && (S.preventDefault(), c());
    }
    let b = !1;
    function g(S) {
      b = S.target === S.currentTarget;
    }
    function m(S) {
      S.target === S.currentTarget && b && c(), b = !1;
    }
    const _ = [
      "[autofocus]",
      'input:not([disabled]):not([type="hidden"])',
      "select:not([disabled])",
      "textarea:not([disabled])",
      "button:not([disabled])",
      "a[href]",
      '[tabindex]:not([tabindex="-1"])'
    ].join(", ");
    let $ = null;
    async function k() {
      Gt.push(u), document.addEventListener("keydown", y), $ = document.activeElement instanceof HTMLElement ? document.activeElement : null, i(), await vt(), (l.value?.querySelector("[autofocus]") ?? l.value?.querySelector(_) ?? l.value)?.focus();
    }
    function E() {
      const S = Gt.indexOf(u);
      S !== -1 && (Gt.splice(S, 1), document.removeEventListener("keydown", y), $?.isConnected && $.focus(), $ = null);
    }
    return qn(() => {
      n.open && k();
    }), Ce(
      () => n.open,
      (S) => {
        S ? k() : E();
      }
    ), Ve(E), (S, C) => e.open ? (d(), G(Fa, {
      key: 0,
      to: e.to
    }, [
      x("div", {
        class: "dc-shell dc-dialog",
        "data-dc-theme": P(s),
        style: Me(P(r)),
        onPointerdown: g,
        onClick: m
      }, [
        x("div", {
          ref_key: "panel",
          ref: l,
          class: "dc-dialog__panel",
          role: "dialog",
          "aria-modal": "true",
          tabindex: "-1",
          "aria-labelledby": e.title ? o : void 0,
          "aria-label": e.title ? void 0 : e.label
        }, [
          e.title ? (d(), v("h2", {
            key: 0,
            id: o,
            class: "dc-dialog__title"
          }, R(e.title), 1)) : A("", !0),
          x("div", Rf, [
            _e(S.$slots, "default", {}, void 0, !0)
          ]),
          S.$slots.actions ? (d(), v("div", zf, [
            _e(S.$slots, "actions", {}, void 0, !0)
          ])) : A("", !0)
        ], 8, Lf)
      ], 44, Tf)
    ], 8, ["to"])) : A("", !0);
  }
}), Vv = /* @__PURE__ */ re(Ff, [["__scopeId", "data-v-ea9488c0"]]), If = 4500, Nf = 9e3, ln = D([]);
let Bs = 0;
function Wr(e) {
  ln.value = ln.value.filter((t) => t.id !== e);
}
function jr(e, t = "ok") {
  Bs += 1;
  const n = Bs;
  ln.value = [...ln.value, { id: n, message: e, kind: t }], setTimeout(() => Wr(n), t === "err" ? Nf : If);
}
function Bf(e) {
  jr(e instanceof Error ? e.message : String(e), "err");
}
function Of() {
  return { toasts: Ol(ln), toast: jr, toastError: Bf, dismiss: Wr };
}
const Df = ["data-dc-theme"], qf = ["data-dc-kind", "role"], Hf = /* @__PURE__ */ te({
  __name: "ShellToasts",
  props: {
    to: { default: "body" },
    theme: { default: void 0 },
    accent: { default: void 0 },
    tokens: { default: void 0 }
  },
  setup(e) {
    const t = e, { toasts: n } = Of(), { theme: a, style: s, adopt: r } = Vr(t);
    return qn(r), (i, o) => (d(), G(Fa, { to: e.to }, [
      x("div", {
        class: "dc-shell dc-toasts",
        "data-dc-theme": P(a),
        style: Me(P(s)),
        "aria-live": "polite"
      }, [
        (d(!0), v(Z, null, fe(P(n), (l) => (d(), v("div", {
          key: l.id,
          class: "dc-toast",
          "data-dc-kind": l.kind,
          role: l.kind === "err" ? "alert" : void 0
        }, R(l.message), 9, qf))), 128))
      ], 12, Df)
    ], 8, ["to"]));
  }
}), Wv = /* @__PURE__ */ re(Hf, [["__scopeId", "data-v-e49c2e6c"]]), Wt = (e) => e.kind === "split", ee = (e) => e.kind === "group", ue = (e) => e.kind === "float", kt = { x: 16, y: 16, w: 360, h: 260 }, Bn = 28, Ur = 120, Sa = 220, Gr = 38, At = 6;
function mn(e, t) {
  let n = !1;
  const a = e.frames.map((s, r) => {
    const i = t(s.node, r);
    return i === s.node ? s : (n = !0, { ...s, node: i });
  });
  return n ? { ...e, frames: a } : e;
}
function Je(e) {
  return { kind: "group", panels: [e] };
}
function jv(e, t, n) {
  return {
    kind: "group",
    panels: e,
    ...t ? { active: t } : {},
    ...n ? { title: n } : {}
  };
}
const $e = (e) => typeof e == "string", Za = (e) => $e(e) ? Je(e) : e, gn = (e) => $e(e) ? [e] : Qe(e), Os = (e) => e.panels.filter($e), Kf = (e) => e.panels.filter((t) => !$e(t)), Xe = (e, t) => e.panels.includes(t);
function yn(e, t, n) {
  let a = !1;
  const s = e.panels.map((r) => {
    if ($e(r) || !ge(r, t)) return r;
    const i = n(r);
    return i !== r && (a = !0), i;
  });
  return a ? { ...e, panels: s } : e;
}
function Qn(e, t) {
  return { node: e, rect: { ...kt, ...t } };
}
function Ja(e, t) {
  return t ? { kind: "float", frames: e, title: t } : { kind: "float", frames: e };
}
function es(e, t) {
  const n = { ...kt, ...t };
  return Ja(
    e.map(
      (a, s) => Qn(a, {
        ...n,
        x: n.x + s * Bn,
        y: n.y + s * Bn
      })
    )
  );
}
function ts(e, t, n, a) {
  return {
    kind: "split",
    direction: e,
    children: t,
    ...n ? { sizes: n } : {},
    ...a ? { title: a } : {}
  };
}
const ns = (e, t, n) => ts("row", e, t, n), Uv = (e, t, n) => ts("column", e, t, n);
function Ae(e) {
  return {
    ...e.title ? { title: e.title } : {},
    ...e.fixedView ? { fixedView: !0 } : {},
    ...e.headless ? { headless: !0 } : {}
  };
}
const Ct = (e) => e.fixedView === !0 || e.headless === !0 || !!e.title, Vf = (e) => ({ ...e, headless: !0 }), Gv = (e) => ({ ...e, fixedView: !0 }), Wf = (e) => e === "left" || e === "right" ? "row" : "column";
function Qe(e) {
  return ee(e) ? e.panels.flatMap(gn) : ue(e) ? e.frames.flatMap((t) => Qe(t.node)) : e.children.flatMap(Qe);
}
function ge(e, t) {
  return ee(e) ? e.panels.some((n) => $e(n) ? n === t : ge(n, t)) : ue(e) ? e.frames.some((n) => ge(n.node, t)) : e.children.some((n) => ge(n, t));
}
const Xr = (e) => Qe(e).length === 0, Ma = (e) => !ee(e) && Ct(e), Ea = (e) => Xr(e) && !Ma(e);
function Yn(e) {
  return Wt(e) ? e.children.map((t, n) => ({ node: t, index: n })) : ue(e) ? e.frames.map((t, n) => ({ node: t.node, index: n })) : e.panels.flatMap((t, n) => $e(t) ? [] : [{ node: t, index: n }]);
}
const as = (e) => Yn(e).map((t) => t.node);
function Et(e) {
  const t = e.active;
  if (t) {
    const n = e.panels.findIndex(
      (a) => $e(a) ? a === t : ge(a, t)
    );
    if (n >= 0) return n;
  }
  return 0;
}
function Qr(e) {
  const t = e.panels[Et(e)];
  return t !== void 0 && $e(t) ? t : "";
}
function Ie(e) {
  if ($e(e)) return e;
  if (ee(e)) {
    const n = e.panels[Et(e)];
    return n === void 0 ? "" : Ie(n);
  }
  if (ue(e)) {
    const n = e.frames[e.frames.length - 1];
    return n ? Ie(n.node) : "";
  }
  const t = e.children[0];
  return t ? Ie(t) : "";
}
function Ft(e, t) {
  if (ee(e) && Xe(e, t)) return e;
  for (const n of as(e)) {
    const a = Ft(n, t);
    if (a) return a;
  }
  return null;
}
function jf(e) {
  const t = as(e).flatMap(jf);
  return ee(e) ? [e, ...t] : t;
}
function ze(e, t) {
  if (ee(e)) {
    for (const n of Kf(e)) {
      const a = ze(n, t);
      if (a) return a;
    }
    return null;
  }
  if (ue(e)) {
    for (const n of e.frames)
      if (ge(n.node, t))
        return ze(n.node, t) ?? n;
    return null;
  }
  for (const n of e.children) {
    const a = ze(n, t);
    if (a) return a;
  }
  return null;
}
function ca(e, t, n = Ur) {
  const a = (o, l) => l > 0 ? Math.max(Math.min(o, l), Math.min(n, l)) : Math.max(o, n), s = a(e.w, t.w), r = a(e.h, t.h), i = (o, l, c) => Math.min(Math.max(o, 0), Math.max(c - l, 0));
  return {
    x: Math.round(i(e.x, s, t.w)),
    y: Math.round(i(e.y, r, t.h)),
    w: Math.round(s),
    h: Math.round(r)
  };
}
function Ds(e, t, n, a, s = Ur) {
  let { x: r, y: i, w: o, h: l } = e;
  return t.includes("e") && (o = e.w + n), t.includes("w") && (o = e.w - n, r = e.x + n), t.includes("s") && (l = e.h + a), t.includes("n") && (l = e.h - a, i = e.y + a), o < s && (t.includes("w") && (r = e.x + e.w - s), o = s), l < s && (t.includes("n") && (i = e.y + e.h - s), l = s), { x: r, y: i, w: o, h: l };
}
const Yr = (e, t) => e.x === t.x && e.y === t.y && e.w === t.w && e.h === t.h;
function It(e, t, n) {
  if (ee(e)) return yn(e, t, (r) => It(r, t, n));
  if (ue(e)) {
    let r = !1;
    const i = e.frames.map((o) => {
      if (!ge(o.node, t)) return o;
      if (ze(o.node, t)) {
        const c = It(o.node, t, n);
        return c === o.node ? o : (r = !0, { ...o, node: c });
      }
      const l = n(o);
      return l === o ? o : (r = !0, l);
    });
    return r ? { ...e, frames: i } : e;
  }
  if (!ge(e, t)) return e;
  let a = !1;
  const s = e.children.map((r) => {
    const i = It(r, t, n);
    return i !== r && (a = !0), i;
  });
  return a ? { ...e, children: s } : e;
}
function Uf(e, t, n) {
  return It(e, t, (a) => Yr(a.rect, n) ? a : { ...a, rect: n });
}
const dt = (e) => e.maximized === !0, Zr = (e) => (t) => {
  if (dt(t) === e) return t;
  if (e) {
    const { minimized: s, ...r } = t;
    return { ...r, maximized: !0 };
  }
  const { maximized: n, ...a } = t;
  return a;
};
function Gf(e, t, n = !0) {
  return It(e, t, Zr(n));
}
function Xv(e, t) {
  const n = ze(e, t);
  return n ? Gf(e, t, !dt(n)) : e;
}
const wt = (e) => e.minimized === !0, Jr = (e) => (t) => {
  if (wt(t) === e) return t;
  if (e) {
    const { maximized: s, ...r } = t;
    return { ...r, minimized: !0 };
  }
  const { minimized: n, ...a } = t;
  return a;
};
function Xf(e, t, n = !0) {
  return It(e, t, Jr(n));
}
function Qv(e, t) {
  const n = ze(e, t);
  return n ? Xf(e, t, !wt(n)) : e;
}
function _t(e, t) {
  const n = t[t.length - 1];
  if (n === void 0) return null;
  const a = pt(e, t.slice(0, -1));
  return !a || !ue(a) ? null : a.frames[n] ?? null;
}
function Pa(e, t) {
  if (ue(e)) {
    for (const [n, a] of e.frames.entries()) {
      if (!ge(a.node, t)) continue;
      const s = Pa(a.node, t);
      return s ? [n, ...s] : [n];
    }
    return null;
  }
  for (const { node: n, index: a } of Yn(e)) {
    if (!ge(n, t)) continue;
    const s = Pa(n, t);
    return s ? [a, ...s] : null;
  }
  return null;
}
function ss(e, t, n) {
  const a = t[t.length - 1];
  if (a === void 0) return e;
  const s = t.slice(0, -1), r = pt(e, s);
  if (!r || !ue(r)) return e;
  const i = r.frames[a];
  if (!i) return e;
  const o = n(i);
  if (o === i) return e;
  const l = [...r.frames];
  return l[a] = o, $t(e, s, { ...r, frames: l });
}
function qs(e, t, n) {
  return ss(
    e,
    t,
    (a) => Yr(a.rect, n) ? a : { ...a, rect: n }
  );
}
function Qf(e, t, n = !0) {
  return ss(e, t, Zr(n));
}
function Yf(e, t, n = !0) {
  return ss(e, t, Jr(n));
}
function tn(e, t) {
  const [n, ...a] = t;
  if (n === void 0) return e;
  if (ue(e)) {
    const i = e.frames[n];
    if (!i) return e;
    const o = tn(i.node, a), l = o === i.node ? i : { ...i, node: o };
    if (n === e.frames.length - 1 && l === i) return e;
    const c = [...e.frames];
    return c.splice(n, 1), c.push(l), { ...e, frames: c };
  }
  const s = pt(e, [n]);
  if (!s) return e;
  const r = tn(s, a);
  return r === s ? e : $t(e, [n], r);
}
function Zf(e, t) {
  const n = [...t];
  let a = e;
  return t.forEach((s, r) => {
    a && (ue(a) && (n[r] = a.frames.length - 1), a = pt(a, [s]));
  }), n;
}
function Sn(e, t, n, a) {
  if (ee(e)) return yn(e, n, (i) => Sn(i, t, n, a));
  if (ue(e)) {
    const i = e.frames.findIndex((l) => ge(l.node, n)), o = e.frames[i];
    if (!o) return e;
    if (ze(o.node, n)) {
      const l = Sn(o.node, t, n, a);
      if (l === o.node) return e;
      const c = [...e.frames];
      return c[i] = { ...o, node: l }, { ...e, frames: c };
    }
    return { ...e, frames: [...e.frames, Qn(Je(t), a)] };
  }
  if (!ge(e, n)) return e;
  let s = !1;
  const r = e.children.map((i) => {
    const o = Sn(i, t, n, a);
    return o !== i && (s = !0), o;
  });
  return s ? { ...e, children: r } : e;
}
function Hs(e, t, n, a) {
  if (t === n || !ge(e, t) || !ge(e, n) || !ze(e, n)) return e;
  const s = bt(e, t);
  if (!s) return e;
  const r = Sn(s, t, n, a);
  return r === s ? e : Le(r);
}
function Jf(e, t, n) {
  return ue(e) ? { ...e, frames: [...e.frames, Qn(Je(t), n)] } : ee(e) ? tl(e, t) : {
    kind: "split",
    direction: e.direction,
    children: [...e.children, Je(t)],
    sizes: [...it(e), 1],
    ...Ae(e)
  };
}
function el(e, t, n, a) {
  const s = n[0];
  if (s === void 0) return Jf(e, t, a);
  const r = n.slice(1), i = (u, y) => y === s ? el(u, t, r, a) : bt(u, t);
  if (ue(e)) {
    const u = e.frames.flatMap((y, b) => {
      const g = i(y.node, b);
      return g ? [g === y.node ? y : { ...y, node: g }] : [];
    });
    return { ...e, frames: u };
  }
  if (ee(e)) {
    const u = Et(e), y = [];
    e.panels.forEach((m, _) => {
      if ($e(m)) {
        m !== t && y.push(m);
        return;
      }
      const $ = i(m, _);
      $ && y.push($);
    });
    const g = e.active && y.some((m) => gn(m).includes(e.active)) ? e.active : Ie(y[u] ?? y[y.length - 1]);
    return {
      kind: "group",
      panels: y,
      ...g ? { active: g } : {},
      ...Ae(e)
    };
  }
  const o = it(e), l = [], c = [];
  return e.children.forEach((u, y) => {
    const b = i(u, y);
    b && (l.push(b), c.push(o[y] ?? 0));
  }), { kind: "split", direction: e.direction, children: l, sizes: c, ...Ae(e) };
}
function Ks(e, t, n, a) {
  const s = pt(e, n);
  return !s || !Xr(s) || !ge(e, t) ? e : Le(el(e, t, n, a));
}
function ua(e, t) {
  if (ee(e)) return yn(e, t, (s) => ua(s, t));
  if (ue(e)) {
    const s = e.frames.findIndex((c) => ge(c.node, t)), r = e.frames[s];
    if (!r) return e;
    const i = ua(r.node, t), o = i === r.node ? r : { ...r, node: i };
    if (s === e.frames.length - 1 && o === r) return e;
    const l = [...e.frames];
    return l.splice(s, 1), l.push(o), { ...e, frames: l };
  }
  if (!ge(e, t)) return e;
  let n = !1;
  const a = e.children.map((s) => {
    const r = ua(s, t);
    return r !== s && (n = !0), r;
  });
  return n ? { ...e, children: a } : e;
}
function rs(e, t) {
  if (e <= 0) return [];
  const n = () => Array.from({ length: e }, () => 1 / e);
  if (!t || t.length !== e) return n();
  const a = t.map((r) => Number.isFinite(r) && r > 0 ? r : 0), s = a.reduce((r, i) => r + i, 0);
  return s <= 0 ? n() : a.map((r) => r / s);
}
const it = (e) => rs(e.children.length, e.sizes), tt = (e) => {
  const t = ee(e) ? e.panels.length : e.children.length;
  return e.places?.length === t ? e.places : void 0;
};
function Le(e) {
  if (ee(e)) return ep(e);
  if (ue(e)) {
    const o = e.frames.flatMap((l) => {
      const c = Le(l.node);
      return Ea(c) ? [] : [c === l.node ? l : { ...l, node: c }];
    });
    return o.length === e.frames.length && o.every((l, c) => l === e.frames[c]) ? e : { ...e, frames: o };
  }
  if (e.children.length === 0) return e;
  const t = it(e), n = tt(e), a = [], s = [], r = [];
  e.children.forEach((o, l) => {
    const c = Le(o), u = t[l] ?? 0;
    if (Ea(c)) return;
    if (!n && Wt(c) && c.direction === e.direction && !tt(c) && !Ct(c)) {
      const b = it(c);
      c.children.forEach((g, m) => {
        a.push(g), s.push(u * (b[m] ?? 0));
      });
      return;
    }
    a.push(c), s.push(u);
    const y = n?.[l];
    y && r.push(y);
  });
  const i = a[0];
  return a.length === 1 && i && !Ct(e) ? i : {
    kind: "split",
    direction: e.direction,
    children: a,
    sizes: rs(a.length, s),
    ...Ae(e),
    ...r.length === a.length && r.length > 0 ? { places: r } : {}
  };
}
function ep(e) {
  if (e.panels.every($e)) return e;
  const t = Ie(e), n = tt(e), a = [], s = [];
  e.panels.forEach((o, l) => {
    const c = n?.[l];
    if ($e(o)) {
      a.push(o), c && s.push(c);
      return;
    }
    const u = Le(o);
    if (!Ea(u)) {
      if (ee(u) && !Ct(u) && !tt(u)) {
        a.push(...u.panels);
        return;
      }
      a.push(u), c && s.push(c);
    }
  });
  const r = a[0];
  if (a.length === 1 && r !== void 0 && !$e(r) && !Ct(e))
    return r;
  if (a.length === e.panels.length && a.every((o, l) => o === e.panels[l]))
    return e;
  const i = t && a.some((o) => gn(o).includes(t)) ? t : void 0;
  return {
    kind: "group",
    panels: a,
    ...i ? { active: i } : {},
    ...Ae(e),
    ...s.length === a.length && s.length > 0 ? { places: s } : {}
  };
}
function bt(e, t) {
  if (ue(e)) {
    const i = e.frames.flatMap((o) => {
      const l = bt(o.node, t);
      return l ? [l === o.node ? o : { ...o, node: l }] : [];
    });
    return i.length === 0 && !Ma(e) ? null : { ...e, frames: i };
  }
  if (ee(e)) {
    if (!ge(e, t)) return e;
    const i = Et(e), o = [];
    for (const u of e.panels) {
      if ($e(u)) {
        u !== t && o.push(u);
        continue;
      }
      const y = bt(u, t);
      y && o.push(y);
    }
    if (o.length === 0) return null;
    const c = e.active && o.some((u) => gn(u).includes(e.active)) ? e.active : Ie(o[i] ?? o[o.length - 1]);
    return c ? { kind: "group", panels: o, active: c, ...Ae(e) } : { kind: "group", panels: o, ...Ae(e) };
  }
  const n = it(e), a = [], s = [];
  if (e.children.forEach((i, o) => {
    const l = bt(i, t);
    l && (a.push(l), s.push(n[o] ?? 0));
  }), a.length === 0)
    return Ma(e) ? { kind: "split", direction: e.direction, children: a, sizes: [], ...Ae(e) } : null;
  const r = a[0];
  return a.length === 1 && r && !Ct(e) ? r : Le({
    kind: "split",
    direction: e.direction,
    children: a,
    sizes: s,
    ...Ae(e)
  });
}
function tl(e, t, n) {
  const a = e.panels.filter((r) => r !== t), s = n === void 0 ? a.length : Math.max(0, Math.min(n, a.length));
  return a.splice(s, 0, t), { kind: "group", panels: a, active: t, ...Ae(e) };
}
function Qt(e, t, n, a, s) {
  const r = (g) => mn(
    g,
    (m) => ge(m, n) ? Qt(m, t, n, a, s) : m
  );
  if (a === "float") return e;
  const i = (g) => yn(g, n, (m) => Qt(m, t, n, a, s));
  if (a === "center")
    return ee(e) ? Xe(e, n) ? tl(e, t, s) : i(e) : ue(e) ? r(e) : {
      ...e,
      children: e.children.map(
        (g) => ge(g, n) ? Qt(g, t, n, a, s) : g
      )
    };
  const o = Wf(a), l = a === "left" || a === "top", c = (g) => ({
    kind: "split",
    direction: o,
    children: l ? [Je(t), g] : [g, Je(t)],
    sizes: [0.5, 0.5]
  });
  if (ee(e)) return Xe(e, n) ? c(e) : i(e);
  if (ue(e)) return r(e);
  const u = it(e), y = e.children.findIndex(
    (g) => ee(g) && Xe(g, n)
  );
  if (y >= 0 && e.direction === o) {
    const g = (u[y] ?? 0) / 2, m = [...e.children], _ = [...u];
    return m.splice(l ? y : y + 1, 0, Je(t)), _.splice(y, 1, g, g), {
      kind: "split",
      direction: o,
      children: m,
      sizes: _,
      ...Ae(e)
    };
  }
  const b = e.children.map((g) => ge(g, n) ? ee(g) && Xe(g, n) ? c(g) : Qt(g, t, n, a) : g);
  return {
    kind: "split",
    direction: e.direction,
    children: b,
    sizes: u,
    ...Ae(e)
  };
}
function Nt(e, t) {
  if (ee(e)) {
    if (Xe(e, t))
      return Qr(e) === t ? e : { ...e, active: t };
    const s = e.panels.findIndex((l) => !$e(l) && ge(l, t)), r = e.panels[s];
    if (r === void 0 || $e(r)) return e;
    const i = Nt(r, t);
    if (i === r && e.active === t) return e;
    const o = [...e.panels];
    return o[s] = i, { ...e, panels: o, active: t };
  }
  if (!ge(e, t)) return e;
  if (ue(e)) return mn(e, (s) => Nt(s, t));
  let n = !1;
  const a = e.children.map((s) => {
    const r = Nt(s, t);
    return r !== s && (n = !0), r;
  });
  return n ? { ...e, children: a } : e;
}
function nn(e, t, n) {
  if (ee(e)) {
    if (!Xe(e, t)) return yn(e, t, (c) => nn(c, t, n));
    const a = e.panels.indexOf(t), s = Math.max(0, Math.min(n, e.panels.length - 1));
    if (a === s) return e;
    const r = [...e.panels];
    r.splice(a, 1), r.splice(s, 0, t);
    const i = tt(e), o = i ? [...i] : void 0;
    o && o.splice(s, 0, ...o.splice(a, 1));
    const l = Ie(e);
    return {
      kind: "group",
      panels: r,
      ...l ? { active: l } : {},
      ...Ae(e),
      ...o ? { places: o } : {}
    };
  }
  return ge(e, t) ? ue(e) ? mn(e, (a) => nn(a, t, n)) : { ...e, children: e.children.map((a) => nn(a, t, n)) } : e;
}
function Mn(e, t, n) {
  if (t === n) return e;
  if (ee(e)) {
    if (!ge(e, t) && !ge(e, n)) return e;
    const a = (r) => r === t ? n : r === n ? t : r, s = e.panels.map((r) => $e(r) ? a(r) : Mn(r, t, n));
    return { ...e, panels: s, ...e.active ? { active: a(e.active) } : {} };
  }
  return ue(e) ? mn(e, (a) => Mn(a, t, n)) : { ...e, children: e.children.map((a) => Mn(a, t, n)) };
}
function bn(e, t, n, a, s) {
  if (a === "float" || !ge(e, t) || !ge(e, n)) return e;
  const r = Ft(e, t);
  if (a === "center" && r && Xe(r, n)) {
    if (s === void 0) return e;
    const o = r.panels.indexOf(t), l = s > o ? s - 1 : s;
    return l === o ? e : Nt(nn(e, t, l), t);
  }
  if (t === n) return e;
  const i = bt(e, t);
  return i ? Le(Qt(i, t, n, a, s)) : e;
}
function nl(e, t, n) {
  if (ee(e)) {
    const s = e.panels[t];
    if (s === void 0 || $e(s)) return e;
    const r = [...e.panels];
    return r[t] = n, { ...e, panels: r };
  }
  if (ue(e)) {
    const s = e.frames[t];
    if (!s) return e;
    const r = [...e.frames];
    return r[t] = { ...s, node: n }, { ...e, frames: r };
  }
  const a = [...e.children];
  return a[t] = n, { ...e, children: a };
}
function _n(e, t, n) {
  const a = Yn(e);
  if (!ee(e) && a.some(({ node: s }) => ee(s) && Xe(s, t))) {
    const s = n(e);
    return s === e ? null : s;
  }
  for (const { node: s, index: r } of a) {
    if (!ge(s, t)) continue;
    const i = _n(s, t, n);
    return i ? nl(e, r, i) : null;
  }
  return null;
}
function Yv(e, t, n) {
  const a = _n(
    e,
    t,
    (s) => Wt(s) && s.direction !== n ? { ...s, direction: n } : s
  );
  return a ? Le(a) : e;
}
function al(e) {
  return ue(e) ? [e] : tt(e) || Ct(e) ? [e] : ee(e) ? [...e.panels] : e.children.flatMap(al);
}
function sl(e, t) {
  if (ee(e)) return e;
  const n = as(e).map(al), a = n.flat(), s = t && a.some((i) => gn(i).includes(t)) ? t : void 0, r = tp(e, n);
  return Le({
    kind: "group",
    panels: a,
    ...s ? { active: s } : {},
    ...Ae(e),
    ...r ? { places: r } : {}
  });
}
function tp(e, t) {
  const n = ue(e) ? e.frames.map(({ node: a, ...s }) => s) : tt(e);
  if (n)
    return t.every((a) => a.length === 1) ? n : void 0;
}
function np(e, t) {
  const n = _n(e, t, (a) => sl(a, t));
  return n ? Le(n) : e;
}
function ls(e, t, n) {
  if (ee(e) && Xe(e, t)) {
    const a = n(e);
    return a === e ? null : a;
  }
  for (const { node: a, index: s } of Yn(e)) {
    if (!ge(a, t)) continue;
    const r = ls(a, t, n);
    return r ? nl(e, s, r) : null;
  }
  return null;
}
function Vs(e, t, n) {
  const a = ls(e, t, (s) => {
    if (s.panels.length < 2) return s;
    const r = tt(s);
    return {
      ...ts(n, s.panels.map(Za)),
      ...Ae(s),
      ...r ? { places: r } : {}
    };
  });
  return a ? Le(a) : e;
}
function Aa(e, t) {
  if (ee(e)) return e;
  if (ue(e)) {
    const s = e.frames.findIndex(
      (o) => ee(o.node) && o.node.panels.includes(t)
    ), r = e.frames[s], i = r && ee(r.node) ? r.node : null;
    if (r && i && i.panels.length > 1) {
      const o = es(i.panels.map(Za), r.rect).frames;
      return {
        ...e,
        frames: [...e.frames.slice(0, s), ...o, ...e.frames.slice(s + 1)]
      };
    }
    return mn(e, (o) => Aa(o, t));
  }
  if (!ge(e, t)) return e;
  let n = !1;
  const a = e.children.map((s) => {
    const r = Aa(s, t);
    return r !== s && (n = !0), r;
  });
  return n ? { ...e, children: a } : e;
}
function ap(e, t, n) {
  const a = Ft(e, t);
  if (!a || a.panels.length < 2) return e;
  if (ze(e, t)?.node === a) {
    const i = Aa(e, t);
    return i === e ? e : Le(i);
  }
  const r = ls(e, t, (i) => ({
    ...Ja(rl(i.panels.map(Za), tt(i), n)),
    ...Ae(i)
  }));
  return r ? Le(r) : e;
}
function rl(e, t, n) {
  return t ? e.map((a, s) => ({ ...t[s], node: a })) : es(e, n).frames;
}
function ll(e, t) {
  return { ...Ja(rl(e.children, tt(e), t)), ...Ae(e) };
}
function Zv(e, t, n) {
  const a = _n(
    e,
    t,
    (s) => ue(s) ? s : ll(s, n)
  );
  return a ? Le(a) : ee(e) && Xe(e, t) ? es([e], n) : e;
}
function sp(e, t) {
  const n = (s) => t === "column" ? s.rect.y : s.rect.x, a = (s) => t === "column" ? s.rect.x : s.rect.y;
  return [...e].sort((s, r) => n(s) - n(r) || a(s) - a(r));
}
function ol(e, t) {
  const n = sp(e.frames, t);
  return {
    kind: "split",
    direction: t,
    children: n.map((a) => a.node),
    ...Ae(e),
    places: n.map(({ node: a, ...s }) => s)
  };
}
function Jv(e, t, n = "row") {
  const a = _n(
    e,
    t,
    (s) => ue(s) ? ol(s, n) : s
  );
  return a ? Le(a) : e;
}
function il(e) {
  if (ue(e)) return null;
  const t = ee(e) ? e.panels.length === 1 ? e.panels[0] : void 0 : e.children.length === 1 ? e.children[0] : void 0;
  return t === void 0 || $e(t) || ee(t) && t.panels.length === 1 && $e(t.panels[0]) ? null : t;
}
const rp = (e) => {
  const { title: t, fixedView: n, headless: a, ...s } = e;
  return s;
};
function lp(e, t) {
  const n = il(e);
  return n ? t === "inner" ? n : { ...rp(n), ...Ae(e) } : e;
}
function Ht(e) {
  return e.title ? e.title : ee(e) ? "" : ue(e) ? "Desktop" : e.direction === "row" ? "Row" : "Column";
}
function an(e, t) {
  if (ee(e)) {
    const a = e.panels[Et(e)];
    return a === void 0 ? "" : $e(a) ? t(a) ?? a : Ht(a) || an(a, t);
  }
  if (e.title) return e.title;
  if (ue(e)) {
    const a = e.frames[e.frames.length - 1];
    return a ? a.title ?? an(a.node, t) : "";
  }
  const n = e.children[0];
  return n ? an(n, t) : "";
}
function pt(e, t) {
  let n = e;
  for (const a of t) {
    if (!n) return null;
    if (Wt(n)) n = n.children[a];
    else if (ue(n)) n = n.frames[a]?.node;
    else {
      const s = n.panels[a];
      n = s === void 0 || $e(s) ? void 0 : s;
    }
  }
  return n ?? null;
}
function $t(e, t, n) {
  if (t.length === 0) return n;
  const [a, ...s] = t;
  if (a === void 0) return e;
  if (ue(e)) {
    const l = e.frames[a];
    if (!l) return e;
    const c = $t(l.node, s, n);
    if (c === l.node) return e;
    const u = [...e.frames];
    return u[a] = { ...l, node: c }, { ...e, frames: u };
  }
  if (ee(e)) {
    const l = e.panels[a];
    if (l === void 0 || $e(l)) return e;
    const c = $t(l, s, n);
    if (c === l) return e;
    const u = [...e.panels];
    return u[a] = c, { ...e, panels: u };
  }
  const r = e.children[a];
  if (!r) return e;
  const i = $t(r, s, n);
  if (i === r) return e;
  const o = [...e.children];
  return o[a] = i, { ...e, children: o };
}
function En(e, t, n) {
  if (t.length === 0)
    return Wt(e) ? { ...e, sizes: rs(e.children.length, n) } : e;
  const [a, ...s] = t;
  if (a === void 0) return e;
  if (ue(e)) {
    const o = e.frames[a];
    if (!o) return e;
    const l = En(o.node, s, n);
    if (l === o.node) return e;
    const c = [...e.frames];
    return c[a] = { ...o, node: l }, { ...e, frames: c };
  }
  if (ee(e)) {
    const o = e.panels[a];
    if (o === void 0 || $e(o)) return e;
    const l = En(o, s, n);
    if (l === o) return e;
    const c = [...e.panels];
    return c[a] = l, { ...e, panels: c };
  }
  const r = e.children[a];
  if (!r) return e;
  const i = [...e.children];
  return i[a] = En(r, s, n), { ...e, children: i };
}
function Ws(e, t, n, a = 0.02) {
  const s = e[t], r = e[t + 1];
  if (s === void 0 || r === void 0) return e;
  const i = s + r;
  if (i < a * 2) return e;
  const o = [...e], l = Math.min(Math.max(s + n, a), i - a);
  return o[t] = l, o[t + 1] = i - l, o;
}
function On(e) {
  if (!ee(e) || e.panels.length >= 2) return e;
  const t = e.panels[0];
  return t !== void 0 && !$e(t) ? e : { ...ns([op(e)]), ...Ae(e) };
}
const op = (e) => {
  if (!e.title) return e;
  const { title: t, ...n } = e;
  return n;
};
function js(e) {
  return e.length === 0 ? null : ns(e.map(Je));
}
function ip(e, t) {
  if (!e) return js(t);
  const n = new Set(t), a = /* @__PURE__ */ new Set(), s = /* @__PURE__ */ new Set();
  for (const l of Qe(e))
    !n.has(l) || a.has(l) ? s.add(l) : a.add(l);
  let r = e;
  for (const l of s)
    r = r ? bt(r, l) : null;
  const i = new Set(r ? Qe(r) : []), o = t.filter((l) => !i.has(l));
  if (o.length === 0) return r ? On(Le(r)) : null;
  if (!r) return js(o);
  if (ue(r)) {
    const l = r.frames.length;
    return {
      ...r,
      frames: [
        ...r.frames,
        ...o.map(
          (c, u) => Qn(Je(c), {
            x: kt.x + (l + u) * Bn,
            y: kt.y + (l + u) * Bn
          })
        )
      ]
    };
  }
  return On(Le(ns([r, ...o.map(Je)])));
}
const os = Symbol("dc.windowContext");
function cp(e) {
  return za(os, e), e;
}
function Zn() {
  const e = Ot(os, null);
  if (!e)
    throw new Error(
      "[header-content-layout] No window context found. Render this component inside <WindowFrame>."
    );
  return e;
}
const up = 320, dp = 240;
function fp(e) {
  if (!e || typeof window > "u") return;
  const t = e.getBoundingClientRect();
  if (t.width <= 0 || t.height <= 0) return;
  const n = Math.max(0, window.outerHeight - window.innerHeight);
  return {
    width: Math.round(t.width),
    height: Math.round(t.height),
    left: Math.round(window.screenX + t.left),
    top: Math.round(window.screenY + n + t.top)
  };
}
function pp(e, t) {
  if (typeof window > "u") return null;
  const n = Math.max(up, Math.round(t?.width ?? window.innerWidth)), a = Math.max(dp, Math.round(t?.height ?? window.innerHeight)), s = ["popup", `width=${n}`, `height=${a}`];
  t?.left !== void 0 && s.push(`left=${t.left}`), t?.top !== void 0 && s.push(`top=${t.top}`);
  const r = window.open(e, "_blank", s.join(","));
  if (r)
    try {
      r.opener = null;
    } catch {
    }
  return r;
}
const vp = ["data-dc-glyph"], hp = { class: "dc-glyph__line" }, mp = ["d"], gp = {
  key: 0,
  class: "dc-glyph__aqua"
}, yp = ["d"], _p = /* @__PURE__ */ te({
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
    return (a, s) => (d(), v("svg", {
      class: "dc-glyph",
      "data-dc-glyph": e.kind,
      viewBox: "0 0 10 10",
      "aria-hidden": "true",
      focusable: "false"
    }, [
      x("g", hp, [
        (d(!0), v(Z, null, fe(t[e.kind], (r) => (d(), v("path", {
          key: r,
          d: r
        }, null, 8, mp))), 128))
      ]),
      n[e.kind] ? (d(), v("g", gp, [
        (d(!0), v(Z, null, fe(n[e.kind], (r) => (d(), v("path", {
          key: r,
          d: r
        }, null, 8, yp))), 128))
      ])) : A("", !0)
    ], 8, vp));
  }
}), Bt = /* @__PURE__ */ re(_p, [["__scopeId", "data-v-4d2872c0"]]), wp = ["data-dc-order", "data-dc-path", "data-dc-maximized", "data-dc-minimized", "data-dc-dragging"], kp = ["data-dc-movable"], bp = { class: "dc-float__title dc-truncate" }, $p = {
  key: 1,
  class: "dc-float__controls dc-controls"
}, xp = ["aria-label", "aria-pressed", "data-dc-minimize"], Cp = ["aria-label", "aria-pressed", "data-dc-maximize"], Sp = ["aria-label", "data-dc-close"], Mp = { class: "dc-float__content" }, Ep = ["data-dc-handle", "onPointerdown"], Pp = /* @__PURE__ */ te({
  __name: "WindowFloat",
  props: {
    frame: {},
    path: {},
    order: {},
    place: {}
  },
  setup(e) {
    const t = e, n = Zn(), a = p(() => Ie(t.frame.node)), s = p(() => n.panelFor(a.value)?.fixed === !0), r = p(() => dt(t.frame)), i = p(() => wt(t.frame)), o = p(() => r.value || i.value), l = p(() => n.resizable.value && !s.value && !o.value), c = p(() => n.movable.value && !s.value && !o.value), u = p(() => {
      const T = Qe(t.frame.node);
      return T.length === 1 ? T[0] ?? null : null;
    }), y = p(() => u.value !== null && n.closable(u.value)), b = p(() => t.frame.node.headless === !0), g = p(
      () => !b.value && (!ee(t.frame.node) || i.value)
    ), m = p(
      () => t.frame.title || Ht(t.frame.node) || an(t.frame.node, (T) => n.panelFor(T)?.title)
    ), _ = p(() => n.spaceMenu(t.path));
    function $(T) {
      T.target?.closest("button, a, input, select, textarea, label") || n.beginFrameDragAt(t.path, T, "move");
    }
    function k(T) {
      T.target?.closest("button, a, input, select, textarea, label") || (i.value ? n.toggleMinimizeAt(t.path) : n.toggleMaximizeAt(t.path));
    }
    const E = p(() => {
      const T = n.framing.value;
      return T !== null && ge(t.frame.node, T);
    }), S = p(() => ({
      // Neither maximizing nor rolling up overwrites the rect: it is where the
      // window goes back to, and both are a way of not being there for a while.
      ...r.value ? { inset: "0" } : i.value && t.place ? {
        left: `${t.place.x}px`,
        bottom: `${t.place.bottom}px`,
        width: `${Sa}px`,
        height: `${Gr}px`
      } : {
        left: `${t.frame.rect.x}px`,
        top: `${t.frame.rect.y}px`,
        width: `${t.frame.rect.w}px`,
        height: `${t.frame.rect.h}px`
      },
      // Back to front. The DOM order says the same thing, but a frame that paints
      // a shadow over its neighbour should not depend on that being noticed.
      zIndex: t.order + 1
    })), C = ["n", "s", "e", "w", "nw", "ne", "sw", "se"];
    return (T, B) => (d(), v("div", {
      class: "dc-float",
      style: Me(S.value),
      "data-dc-order": e.order,
      "data-dc-path": e.path.join("/"),
      "data-dc-maximized": r.value ? "true" : "false",
      "data-dc-minimized": i.value ? "true" : "false",
      "data-dc-dragging": E.value ? "true" : "false",
      onPointerdown: B[3] || (B[3] = (L) => P(n).raiseAt(e.path))
    }, [
      g.value ? (d(), v("header", {
        key: 0,
        class: "dc-float__bar",
        "data-dc-movable": c.value ? "true" : "false",
        onPointerdown: $,
        onDblclick: k
      }, [
        x("span", bp, R(m.value), 1),
        _.value.length ? (d(), G(Ya, {
          key: 0,
          items: _.value,
          label: `${m.value} menu`
        }, null, 8, ["items", "label"])) : A("", !0),
        !s.value || i.value && y.value && u.value ? (d(), v("div", $p, [
          s.value ? A("", !0) : (d(), v("button", {
            key: 0,
            type: "button",
            class: "dc-float__button dc-control",
            "aria-label": `${i.value ? "Unroll" : "Minimize"} ${m.value}`,
            "aria-pressed": i.value,
            "data-dc-minimize": a.value,
            onClick: B[0] || (B[0] = (L) => P(n).toggleMinimizeAt(e.path))
          }, [
            oe(Bt, {
              kind: i.value ? "unroll" : "minimize"
            }, null, 8, ["kind"])
          ], 8, xp)),
          s.value ? A("", !0) : (d(), v("button", {
            key: 1,
            type: "button",
            class: "dc-float__button dc-control",
            "aria-label": `${r.value ? "Restore" : "Maximize"} ${m.value}`,
            "aria-pressed": r.value,
            "data-dc-maximize": a.value,
            onClick: B[1] || (B[1] = (L) => P(n).toggleMaximizeAt(e.path))
          }, [
            oe(Bt, {
              kind: r.value ? "restore" : "maximize"
            }, null, 8, ["kind"])
          ], 8, Cp)),
          i.value && y.value && u.value ? (d(), v("button", {
            key: 2,
            type: "button",
            class: "dc-float__button dc-control",
            "aria-label": `Close ${m.value}`,
            "data-dc-close": u.value,
            onClick: B[2] || (B[2] = (L) => P(n).close(u.value))
          }, [
            oe(Bt, { kind: "close" })
          ], 8, Sp)) : A("", !0)
        ])) : A("", !0)
      ], 40, kp)) : A("", !0),
      x("div", Mp, [
        _e(T.$slots, "default", {}, void 0, !0)
      ]),
      (d(!0), v(Z, null, fe(l.value ? C : [], (L) => (d(), v("span", {
        key: L,
        class: "dc-float__grip",
        "data-dc-handle": L,
        "aria-hidden": "true",
        onPointerdown: He((z) => P(n).beginFrameDragAt(e.path, z, L), ["stop"])
      }, null, 40, Ep))), 128))
    ], 44, wp));
  }
}), Ap = /* @__PURE__ */ re(Pp, [["__scopeId", "data-v-f035684c"]]), is = Symbol("dc.paneContext");
function cl(e) {
  return za(is, e), e;
}
function eh() {
  return Ot(is, null);
}
function th(e) {
  const t = Ot(os, null), n = Ot(is, null);
  if (!t || !n) return () => {
  };
  const a = t.registerMenu(
    () => n.panel.value,
    () => Lt(e)
  );
  return Dn() && Kt(a), a;
}
const Tp = ["data-dc-panel"], Lp = /* @__PURE__ */ te({
  __name: "WindowPaneBody",
  props: {
    panel: {},
    active: { type: Boolean }
  },
  setup(e) {
    const t = e, n = Zn();
    cl({ panel: p(() => t.panel) });
    const a = () => {
      const s = n.panelFor(t.panel);
      return s ? n.renderContent(s, n.viewFor(t.panel), t.active) ?? null : null;
    };
    return (s, r) => (d(), v("div", {
      class: "dc-pane__content",
      "data-dc-panel": t.panel
    }, [
      oe(a)
    ], 8, Tp));
  }
}), Rp = /* @__PURE__ */ re(Lp, [["__scopeId", "data-v-31c655fd"]]), zp = ["data-dc-panel", "data-dc-panels", "data-dc-tabbed", "data-dc-floating", "data-dc-maximized", "data-dc-headless", "data-dc-active", "data-dc-dragging", "aria-label"], Fp = ["data-dc-movable"], Ip = ["aria-label", "aria-pressed"], Np = ["data-dc-space-name"], Bp = { class: "dc-truncate" }, Op = ["aria-label"], Dp = {
  key: 0,
  class: "dc-pane__insert",
  "aria-hidden": "true"
}, qp = ["id", "data-dc-panel", "data-dc-space", "aria-selected", "aria-controls", "tabindex", "onPointerdown", "onClick", "onKeydown"], Hp = { class: "dc-tab__name dc-truncate" }, Kp = {
  key: 0,
  class: "dc-pane__sub dc-mono dc-truncate"
}, Vp = ["aria-label", "data-dc-close", "onClick"], Wp = {
  key: 0,
  class: "dc-pane__insert",
  "aria-hidden": "true"
}, jp = { class: "dc-pane__tools" }, Up = {
  key: 2,
  class: "dc-pane__controls dc-controls"
}, Gp = ["aria-label", "data-dc-minimize"], Xp = ["aria-label", "aria-pressed", "data-dc-maximize"], Qp = ["aria-label", "data-dc-close"], Yp = ["id", "role", "aria-labelledby"], Zp = ["id", "role", "aria-labelledby"], Jp = ["data-dc-edge"], ev = /* @__PURE__ */ te({
  __name: "WindowPane",
  props: {
    group: {},
    path: {}
  },
  setup(e) {
    const t = e, n = Zn(), a = on() ?? "dc-pane", s = p(
      () => t.group.panels.flatMap((K, Q) => {
        if (!$e(K)) {
          const Fe = Ht(K) || an(K, (De) => n.panelFor(De)?.title);
          return [{ kind: "space", index: Q, id: `space-${Q}`, title: Fe, node: K }];
        }
        const ne = n.panelFor(K);
        return ne ? [{ kind: "panel", index: Q, id: K, title: ne.title, panel: ne }] : [];
      })
    ), r = p(() => s.value.length > 1), i = p(() => {
      const K = Et(t.group);
      return s.value.find((Q) => Q.index === K) ?? s.value[0] ?? null;
    }), o = p(() => i.value?.kind === "space" ? i.value.node : null), l = p(() => o.value ? "" : Qr(t.group)), c = p(() => o.value ? null : n.panelFor(l.value)), u = p(() => i.value?.title ?? ""), y = p(() => n.spaceNames.value ? t.group.title ?? "" : ""), b = p(() => [...t.path, i.value?.index ?? 0]), g = p(() => l.value || Os(t.group)[0] || ""), m = p(() => n.viewFor(l.value)), _ = p(() => t.group.headless === !0), $ = p(() => n.focused.value === l.value), k = p(() => n.dragging.value === l.value), E = p(() => n.moving.value === l.value), S = p(() => n.frameOf(g.value) !== null), C = p(() => n.panelFor(g.value)?.fixed === !0), T = p(
      () => !o.value && (n.canMove(l.value) || S.value && n.movable.value && !C.value)
    ), B = p(
      () => o.value ? n.spaceMenu(b.value) : n.menuFor(l.value)
    ), L = (K) => n.closable(K);
    cl({ panel: l });
    const z = p(() => n.maximized(g.value)), M = p(
      () => S.value && !C.value || !r.value && !!c.value && L(c.value.id)
    ), q = (K) => `${a}-tab-${K}`, V = p(() => `${a}-body`), X = p(() => {
      const K = n.dropTarget.value;
      return !K || !Xe(t.group, K.panel) || K.edge === "float" ? null : K;
    }), de = p(() => X.value?.index === void 0 ? X.value?.edge ?? null : null), he = p(() => X.value?.index ?? null), Be = p(
      () => s.value.flatMap(
        (K) => K.kind === "panel" && (K.id === l.value || K.panel.keepAlive === !0) ? [K.id] : []
      )
    ), O = D(null), j = /* @__PURE__ */ new Map();
    Ce(
      l,
      (K, Q) => {
        const ne = O.value;
        if (!ne || (Q && j.set(Q, ne.scrollTop), !n.panelFor(K)?.keepAlive || !j.has(K))) return;
        const Fe = j.get(K);
        vt(() => {
          O.value && (O.value.scrollTop = Fe);
        });
      },
      { flush: "pre" }
    );
    const we = () => c.value ? n.renderActions(c.value, m.value, $.value) ?? null : null;
    let le = null;
    function be(K) {
      const Q = le !== null && Math.hypot(K.clientX - le.x, K.clientY - le.y) >= 4;
      return le = null, Q;
    }
    const xe = (K) => K.kind === "panel" ? K.id : Ie(K.node);
    function je(K, Q) {
      Q.kind !== "space" && (n.focus(Q.id), le = { x: K.clientX, y: K.clientY }, n.beginDrag(Q.id, K));
    }
    function I(K, Q) {
      if (be(K)) return;
      const ne = xe(Q);
      ne && n.selectPanel(ne);
    }
    function ae(K) {
      l.value && n.focus(l.value), !K.target?.closest(".dc-tab, button, a, input, select, textarea, label") && (S.value ? n.beginFrameDrag(g.value, K, "move") : n.beginDrag(l.value, K));
    }
    function ve(K) {
      le = { x: K.clientX, y: K.clientY }, n.beginDrag(l.value, K);
    }
    function Oe(K) {
      be(K) || n.toggleMoveMode(l.value);
    }
    const Ye = {
      ArrowLeft: "left",
      ArrowRight: "right",
      ArrowUp: "up",
      ArrowDown: "down"
    };
    function H(K) {
      if (!E.value) return;
      if (K.key === "Escape") {
        K.preventDefault(), n.toggleMoveMode(l.value);
        return;
      }
      const Q = Ye[K.key];
      Q && (K.preventDefault(), S.value ? n.nudgeFrame(l.value, Q, K.shiftKey) : n.nudge(l.value, Q, K.shiftKey));
    }
    function J(K) {
      !S.value || K.target?.closest(".dc-tab, button, a, input, select, textarea, label") || n.toggleMaximize(g.value);
    }
    function Y(K, Q) {
      K.stopPropagation(), le = null, n.close(Q);
    }
    function Ue(K, Q) {
      const ne = s.value.length;
      let Fe = null;
      if (K.key === "ArrowRight" ? Fe = (Q + 1) % ne : K.key === "ArrowLeft" ? Fe = (Q - 1 + ne) % ne : K.key === "Home" ? Fe = 0 : K.key === "End" && (Fe = ne - 1), Fe === null) return;
      K.preventDefault();
      const De = s.value[Fe];
      if (!De) return;
      const jt = xe(De);
      jt && n.selectPanel(jt);
    }
    return (K, Q) => i.value ? (d(), v("section", {
      key: 0,
      class: "dc-pane",
      "data-dc-panel": l.value || void 0,
      "data-dc-panels": P(Os)(e.group).join(" ") || void 0,
      "data-dc-tabbed": r.value ? "true" : "false",
      "data-dc-floating": S.value ? "true" : "false",
      "data-dc-maximized": z.value ? "true" : "false",
      "data-dc-headless": _.value ? "true" : "false",
      "data-dc-active": $.value ? "true" : "false",
      "data-dc-dragging": k.value ? "true" : "false",
      "aria-label": u.value,
      onFocusin: Q[7] || (Q[7] = (ne) => l.value && P(n).focus(l.value))
    }, [
      _.value ? A("", !0) : (d(), v("header", {
        key: 0,
        class: "dc-pane__head",
        "data-dc-movable": T.value ? "true" : "false",
        onPointerdown: ae,
        onDblclick: J
      }, [
        T.value ? (d(), v("button", {
          key: 0,
          type: "button",
          class: "dc-pane__grip",
          "aria-label": `Move ${u.value}`,
          "aria-pressed": E.value,
          onPointerdown: ve,
          onClick: Oe,
          onKeydown: H
        }, [...Q[8] || (Q[8] = [
          x("span", { "aria-hidden": "true" }, "⠿", -1)
        ])], 40, Ip)) : A("", !0),
        y.value ? (d(), v("span", {
          key: 1,
          class: "dc-pane__name",
          "data-dc-space-name": y.value
        }, [
          x("span", Bp, R(y.value), 1)
        ], 8, Np)) : A("", !0),
        x("div", {
          class: "dc-pane__tabs",
          role: "tablist",
          "aria-label": `${u.value} panels`
        }, [
          (d(!0), v(Z, null, fe(s.value, (ne, Fe) => (d(), v(Z, {
            key: ne.id
          }, [
            he.value === Fe ? (d(), v("span", Dp)) : A("", !0),
            x("button", {
              id: q(ne.id),
              type: "button",
              role: "tab",
              class: "dc-tab",
              "data-dc-panel": ne.kind === "panel" ? ne.id : void 0,
              "data-dc-space": ne.kind === "space" ? ne.title : void 0,
              "aria-selected": ne.index === i.value.index,
              "aria-controls": V.value,
              tabindex: ne.index === i.value.index ? 0 : -1,
              onPointerdown: (De) => je(De, ne),
              onClick: (De) => I(De, ne),
              onKeydown: (De) => Ue(De, Fe)
            }, [
              x("span", Hp, R(ne.title), 1),
              ne.kind === "panel" && ne.panel.subtitle ? (d(), v("span", Kp, R(ne.panel.subtitle), 1)) : A("", !0),
              r.value && ne.kind === "panel" && L(ne.id) ? (d(), v("span", {
                key: 1,
                class: "dc-tab__close",
                role: "button",
                tabindex: "-1",
                "aria-label": `Close ${ne.title}`,
                "data-dc-close": ne.id,
                onPointerdown: Q[0] || (Q[0] = He(() => {
                }, ["stop"])),
                onClick: (De) => Y(De, ne.id)
              }, [...Q[9] || (Q[9] = [
                x("span", { "aria-hidden": "true" }, "×", -1)
              ])], 40, Vp)) : A("", !0)
            ], 40, qp)
          ], 64))), 128)),
          he.value === s.value.length ? (d(), v("span", Wp)) : A("", !0)
        ], 8, Op),
        x("div", jp, [
          oe(we),
          B.value.length ? (d(), G(Ya, {
            key: 0,
            items: B.value,
            label: `${u.value} menu`
          }, null, 8, ["items", "label"])) : A("", !0)
        ]),
        M.value ? (d(), v("div", Up, [
          S.value && !C.value ? (d(), v("button", {
            key: 0,
            type: "button",
            class: "dc-pane__button dc-control",
            "aria-label": `Minimize ${u.value}`,
            "data-dc-minimize": g.value,
            onPointerdown: Q[1] || (Q[1] = He(() => {
            }, ["stop"])),
            onClick: Q[2] || (Q[2] = (ne) => P(n).toggleMinimize(g.value))
          }, [
            oe(Bt, { kind: "minimize" })
          ], 40, Gp)) : A("", !0),
          S.value && !C.value ? (d(), v("button", {
            key: 1,
            type: "button",
            class: "dc-pane__button dc-control",
            "aria-label": `${z.value ? "Restore" : "Maximize"} ${u.value}`,
            "aria-pressed": z.value,
            "data-dc-maximize": g.value,
            onPointerdown: Q[3] || (Q[3] = He(() => {
            }, ["stop"])),
            onClick: Q[4] || (Q[4] = (ne) => P(n).toggleMaximize(g.value))
          }, [
            oe(Bt, {
              kind: z.value ? "restore" : "maximize"
            }, null, 8, ["kind"])
          ], 40, Xp)) : A("", !0),
          !r.value && c.value && L(c.value.id) ? (d(), v("button", {
            key: 2,
            type: "button",
            class: "dc-pane__close dc-control",
            "aria-label": `Close ${u.value}`,
            "data-dc-close": c.value.id,
            onPointerdown: Q[5] || (Q[5] = He(() => {
            }, ["stop"])),
            onClick: Q[6] || (Q[6] = (ne) => P(n).close(c.value.id))
          }, [
            oe(Bt, { kind: "close" })
          ], 40, Qp)) : A("", !0)
        ])) : A("", !0)
      ], 40, Fp)),
      o.value ? (d(), v("div", {
        key: 1,
        id: V.value,
        class: "dc-pane__space",
        role: _.value ? void 0 : "tabpanel",
        "aria-labelledby": _.value ? void 0 : q(i.value.id)
      }, [
        _e(K.$slots, "space", {
          node: o.value,
          path: b.value
        }, void 0, !0)
      ], 8, Yp)) : A("", !0),
      !o.value || Be.value.length ? mt((d(), v("div", {
        key: 2,
        id: o.value ? void 0 : V.value,
        ref_key: "body",
        ref: O,
        class: "dc-pane__body",
        role: _.value || o.value ? void 0 : "tabpanel",
        "aria-labelledby": _.value || o.value ? void 0 : q(l.value)
      }, [
        (d(!0), v(Z, null, fe(Be.value, (ne) => mt((d(), G(Rp, {
          key: ne,
          panel: ne,
          active: ne === l.value && $.value
        }, null, 8, ["panel", "active"])), [
          [Ln, ne === l.value]
        ])), 128))
      ], 8, Zp)), [
        [Ln, !o.value]
      ]) : A("", !0),
      de.value ? (d(), v("div", {
        key: 3,
        class: "dc-pane__drop",
        "data-dc-edge": de.value,
        "aria-hidden": "true"
      }, null, 8, Jp)) : A("", !0)
    ], 40, zp)) : A("", !0);
  }
}), ul = /* @__PURE__ */ re(ev, [["__scopeId", "data-v-2c3c5ecf"]]), tv = ["data-dc-space", "data-dc-path", "data-dc-bare", "aria-label"], nv = {
  key: 0,
  class: "dc-space__head"
}, av = { class: "dc-space__title dc-truncate" }, sv = ["data-dc-direction"], rv = {
  key: 0,
  class: "dc-space__drop",
  "aria-hidden": "true"
}, lv = ["aria-orientation", "aria-label", "aria-valuenow", "aria-disabled", "tabindex", "onPointerdown", "onKeydown"], ov = /* @__PURE__ */ te({
  __name: "WindowNode",
  props: {
    node: {},
    path: {},
    framed: { type: Boolean }
  },
  setup(e) {
    const t = e, n = Zn(), a = D(null), s = p(() => ee(t.node) ? t.node : null), r = p(() => Wt(t.node) ? t.node : null), i = p(() => ue(t.node) ? t.node : null), o = p(
      () => r.value ? r.value.children : i.value?.frames.map((O) => O.node) ?? []
    ), l = p(() => r.value ? it(r.value) : []), c = p(
      () => (i.value?.frames ?? []).map((O, j) => ({
        held: O,
        /** Place in the stack, counted from the back — what `z-index` follows. */
        order: j,
        key: z(O.node),
        path: [...t.path, j]
      })).sort((O, j) => O.key < j.key ? -1 : O.key > j.key ? 1 : 0)
    ), u = p(() => Ht(t.node)), y = p(() => n.spaceMenu(t.path)), b = p(() => t.node.headless === !0), g = p(() => t.path.length === 0 && !n.rootBar.value), m = p(() => i.value ? "desktop" : r.value?.direction ?? ""), _ = D(null), $ = D(0);
    let k = null;
    Ce(
      _,
      (O) => {
        k?.disconnect(), k = null, !(!O || typeof ResizeObserver > "u") && ($.value = O.clientWidth, k = new ResizeObserver(([j]) => {
          $.value = j?.contentRect.width ?? 0;
        }), k.observe(O));
      },
      { immediate: !0 }
    ), Ve(() => k?.disconnect());
    const E = p(() => {
      const O = Math.max(
        1,
        Math.floor(($.value + At) / (Sa + At))
      ), j = /* @__PURE__ */ new Map();
      let we = 0;
      for (const le of c.value)
        le.held.minimized === !0 && (j.set(le.key, {
          x: At + we % O * (Sa + At),
          bottom: At + Math.floor(we / O) * (Gr + At)
        }), we += 1);
      return j;
    }), S = (O) => !!O && O.join("/") === t.path.join("/"), C = p(() => {
      const O = n.dropTarget.value, j = i.value;
      if (!j || !O?.rect || O.edge !== "float") return null;
      if (O.space) return S(O.space) ? O.rect : null;
      const we = ze(j, O.panel);
      return we && j.frames.includes(we) ? O.rect : null;
    }), T = p(() => {
      const O = n.dropTarget.value;
      return !!O && !O.rect && S(O.space);
    }), B = p(() => r.value?.direction === "row"), L = p(() => o.value.map((O, j) => [...t.path, j])), z = (O) => [...Qe(O)].sort().join("/"), M = (O) => {
      const j = Qe(O)[0];
      return (j ? n.panelFor(j)?.title : null) ?? j ?? "panel";
    }, q = (O) => {
      const j = o.value[O], we = o.value[O + 1];
      return !j || !we ? "Resize panels" : `Resize ${M(j)} and ${M(we)}`;
    }, V = (O) => {
      const j = l.value[O] ?? 0, we = l.value[O + 1] ?? 0, le = j + we;
      return le > 0 ? Math.round(j / le * 100) : 50;
    };
    function X() {
      const O = a.value, j = O ? B.value ? O.clientWidth : O.clientHeight : 0;
      return j <= 0 ? 0.05 : Math.min(n.minPanelSize.value / j, 0.4);
    }
    let de = null;
    function he(O, j) {
      const we = r.value, le = a.value;
      if (!n.resizable.value || !we || !le || O.button !== 0) return;
      const be = B.value ? le.clientWidth : le.clientHeight;
      if (be <= 0) return;
      const xe = B.value ? O.clientX : O.clientY, je = it(we), I = Math.min(n.minPanelSize.value / be, 0.4);
      O.preventDefault();
      const ae = (Ye) => {
        const H = ((B.value ? Ye.clientX : Ye.clientY) - xe) / be;
        n.setSizes(t.path, Ws(je, j, H, I));
      }, ve = () => de?.(), Oe = (Ye) => {
        Ye.key === "Escape" && (n.setSizes(t.path, je), de?.());
      };
      de = () => {
        window.removeEventListener("pointermove", ae), window.removeEventListener("pointerup", ve), window.removeEventListener("pointercancel", ve), window.removeEventListener("keydown", Oe), de = null;
      }, window.addEventListener("pointermove", ae), window.addEventListener("pointerup", ve), window.addEventListener("pointercancel", ve), window.addEventListener("keydown", Oe);
    }
    Ve(() => de?.());
    function Be(O, j) {
      const we = r.value;
      if (!n.resizable.value || !we) return;
      const le = B.value ? "ArrowRight" : "ArrowDown", be = B.value ? "ArrowLeft" : "ArrowUp", xe = O.shiftKey ? 0.1 : 0.02;
      if (O.key !== le && O.key !== be) return;
      const je = O.key === le ? xe : -xe;
      O.preventDefault(), n.setSizes(t.path, Ws(it(we), j, je, X()));
    }
    return (O, j) => {
      const we = Qs("WindowNode", !0);
      return s.value ? (d(), G(ul, {
        key: 0,
        group: s.value,
        path: e.path
      }, {
        space: Pe(({ node: le, path: be }) => [
          oe(we, {
            node: le,
            path: be,
            framed: ""
          }, null, 8, ["node", "path"])
        ]),
        _: 1
      }, 8, ["group", "path"])) : (d(), v("section", {
        key: 1,
        class: "dc-space",
        "data-dc-space": m.value,
        "data-dc-path": e.path.join("/"),
        "data-dc-bare": g.value ? "true" : void 0,
        "aria-label": u.value
      }, [
        !e.framed && !b.value && !g.value ? (d(), v("header", nv, [
          x("span", av, R(u.value), 1),
          y.value.length ? (d(), G(Ya, {
            key: 0,
            items: y.value,
            label: `${u.value} menu`
          }, null, 8, ["items", "label"])) : A("", !0)
        ])) : A("", !0),
        i.value ? (d(), v("div", {
          key: 1,
          ref_key: "desktop",
          ref: _,
          class: "dc-window__desktop"
        }, [
          C.value ? (d(), v("div", {
            key: 0,
            class: "dc-window__drop",
            style: Me({
              left: `${C.value.x}px`,
              top: `${C.value.y}px`,
              width: `${C.value.w}px`,
              height: `${C.value.h}px`
            }),
            "aria-hidden": "true"
          }, null, 4)) : A("", !0),
          (d(!0), v(Z, null, fe(c.value, (le) => (d(), G(Ap, {
            key: le.key,
            frame: le.held,
            path: le.path,
            order: le.order,
            place: E.value.get(le.key) ?? null
          }, {
            default: Pe(() => [
              oe(we, {
                node: le.held.node,
                path: le.path,
                framed: le.held.node.kind !== "group"
              }, null, 8, ["node", "path", "framed"])
            ]),
            _: 2
          }, 1032, ["frame", "path", "order", "place"]))), 128))
        ], 512)) : r.value ? (d(), v("div", {
          key: 2,
          ref_key: "container",
          ref: a,
          class: "dc-window__split",
          "data-dc-direction": r.value.direction
        }, [
          T.value ? (d(), v("div", rv)) : A("", !0),
          (d(!0), v(Z, null, fe(o.value, (le, be) => (d(), v(Z, {
            key: z(le)
          }, [
            x("div", {
              class: "dc-window__cell",
              style: Me({ flexGrow: l.value[be] ?? 1 })
            }, [
              oe(we, {
                node: le,
                path: L.value[be] ?? []
              }, null, 8, ["node", "path"])
            ], 4),
            be < o.value.length - 1 ? (d(), v("div", {
              key: 0,
              class: "dc-window__gutter",
              role: "separator",
              "aria-orientation": B.value ? "vertical" : "horizontal",
              "aria-label": q(be),
              "aria-valuenow": V(be),
              "aria-valuemin": "0",
              "aria-valuemax": "100",
              "aria-disabled": P(n).resizable.value ? void 0 : "true",
              tabindex: P(n).resizable.value ? 0 : -1,
              onPointerdown: (xe) => he(xe, be),
              onKeydown: (xe) => Be(xe, be)
            }, null, 40, lv)) : A("", !0)
          ], 64))), 128))
        ], 8, sv)) : A("", !0)
      ], 8, tv));
    };
  }
}), iv = /* @__PURE__ */ re(ov, [["__scopeId", "data-v-0d942d5e"]]), cv = ["data-dc-theme", "data-dc-dragging", "data-dc-docking"], uv = {
  key: 1,
  class: "dc-window__empty"
}, dv = {
  class: "dc-window__live",
  "aria-live": "polite",
  role: "status"
}, $n = 16, fv = /* @__PURE__ */ te({
  __name: "WindowFrame",
  props: /* @__PURE__ */ Tn({
    panels: {},
    movable: { type: Boolean, default: !1 },
    resizable: { type: Boolean, default: !0 },
    minPanelSize: { default: 120 },
    closable: { type: Boolean, default: !1 },
    menu: { type: Boolean, default: !0 },
    spaceNames: { type: Boolean, default: !0 },
    rootBar: { type: Boolean, default: !0 },
    paneMenu: {},
    popOut: {},
    solo: { type: Boolean, default: !1 },
    accent: {},
    tokens: {},
    theme: { default: "minimal" }
  }, {
    layout: { default: null },
    layoutModifiers: {},
    views: { default: () => ({}) },
    viewsModifiers: {}
  }),
  emits: /* @__PURE__ */ Tn(["panel-move", "view-change", "panel-activate", "tab-select", "frame-change", "frame-maximize", "frame-minimize", "panel-close", "panel-pop-out"], ["update:layout", "update:views"]),
  setup(e, { expose: t, emit: n }) {
    const a = e, s = n, r = Yt(e, "layout"), i = Yt(e, "views"), o = Vt(), l = p(() => new Map(a.panels.map((f) => [f.id, f]))), c = p(() => a.panels.map((f) => f.id)), u = p(() => ip(r.value, y.value)), y = p(() => {
      if (!a.solo || !r.value) return c.value;
      const f = new Set(Qe(r.value)), h = c.value.filter((w) => f.has(w));
      return h.length ? h : c.value;
    }), b = D(null), g = D(null), m = D(null), _ = D(!0), $ = D(null), k = D(null), E = D(null), S = D(""), C = D(null);
    function T() {
      const f = C.value;
      return f ? [...f.querySelectorAll(".dc-pane[data-dc-panels]")].filter((w) => w.closest(".dc-window") === f).map((w) => ({ panels: (w.dataset.dcPanels ?? "").split(" "), element: w })) : [];
    }
    function B(f) {
      const h = [];
      let w = f.closest(".dc-float");
      for (; w; )
        h.unshift(Number(w.dataset.dcOrder ?? 0)), w = w.parentElement?.closest(".dc-float") ?? null;
      return h;
    }
    function L() {
      return T().map((f) => ({ pane: f, order: B(f.element) })).sort((f, h) => {
        const w = Math.max(f.order.length, h.order.length);
        for (let F = 0; F < w; F += 1) {
          const N = (f.order[F] ?? -1) - (h.order[F] ?? -1);
          if (N !== 0) return N;
        }
        return 0;
      }).map((f) => f.pane);
    }
    const z = (f) => T().find((h) => h.panels.includes(f)) ?? null;
    function M(f) {
      const h = l.value.get(f);
      if (!h) return "";
      const w = i.value[f];
      return w && h.views?.some((F) => F.key === w) ? w : h.defaultView ?? h.views?.[0]?.key ?? "";
    }
    function q(f, h) {
      i.value = { ...i.value, [f]: h }, s("view-change", { panel: f, view: h });
    }
    const V = p(
      () => a.panels.filter((f) => f.fixed !== !0).length
    );
    function X(f) {
      return !a.movable || V.value < 1 || a.panels.length < 2 ? !1 : l.value.get(f)?.fixed !== !0;
    }
    function de(f, h) {
      const w = u.value;
      !f || !w || f === w || (r.value = f, h && s("panel-move", h));
    }
    function he(f, h, w) {
      if (f.width <= 0 || f.height <= 0) return "center";
      const F = (h - f.left) / f.width, N = (w - f.top) / f.height, W = 0.3;
      return F > W && F < 1 - W && N > W && N < 1 - W ? "center" : [
        { edge: "left", distance: F },
        { edge: "right", distance: 1 - F },
        { edge: "top", distance: N },
        { edge: "bottom", distance: 1 - N }
      ].reduce(
        (pe, U) => U.distance < pe.distance ? U : pe
      ).edge;
    }
    function Be(f, h) {
      const w = [...f.querySelectorAll(".dc-tab")], F = w.findIndex((N) => {
        const W = N.getBoundingClientRect();
        return h < W.left + W.width / 2;
      });
      return F === -1 ? w.length : F;
    }
    function O(f, h, w) {
      for (const { panels: F, element: N } of L().reverse()) {
        const W = N.getBoundingClientRect();
        if (f < W.left || f > W.right || h < W.top || h > W.bottom) continue;
        const me = F.find((ie) => ie !== w), pe = N.querySelector(".dc-pane__tabs"), U = pe?.getBoundingClientRect();
        if (pe && U && h >= U.top && h <= U.bottom)
          return me ? { panel: me, edge: "center", index: Be(pe, f) } : null;
        const se = N.querySelector(":scope > .dc-pane__space");
        if (se) {
          const ie = se.getBoundingClientRect();
          if (f >= ie.left && f <= ie.right && h >= ie.top && h <= ie.bottom) continue;
        }
        return me ? { panel: me, edge: he(W, f, h) } : null;
      }
      return we(f, h, w) ?? xe(f, h);
    }
    function j() {
      const f = C.value;
      return f ? [...f.querySelectorAll(".dc-window__desktop")].filter((h) => h.closest(".dc-window") === f).reverse() : [];
    }
    function we(f, h, w) {
      const F = u.value;
      if (!F) return null;
      for (const N of j()) {
        const W = N.getBoundingClientRect();
        if (f < W.left || f > W.right || h < W.top || h > W.bottom) continue;
        const me = je(N), pe = me.flatMap((ye) => ye.panels).find((ye) => ye !== w);
        if (!pe && me.length > 0) return null;
        const U = ze(F, w)?.rect, se = ca(
          {
            x: f - W.left - 24,
            y: h - W.top - 12,
            w: U?.w ?? kt.w,
            h: U?.h ?? kt.h
          },
          { w: N.clientWidth, h: N.clientHeight },
          a.minPanelSize
        );
        if (pe) return { panel: pe, edge: "float", rect: se };
        const ie = le(N);
        return ie ? { panel: "", space: ie, edge: "float", rect: se } : null;
      }
      return null;
    }
    function le(f) {
      const h = f.closest(".dc-space")?.getAttribute("data-dc-path");
      return h == null ? null : h === "" ? [] : h.split("/").map(Number);
    }
    function be() {
      const f = C.value;
      return f ? [...f.querySelectorAll(".dc-space")].filter((h) => h.closest(".dc-window") === f).filter((h) => !h.querySelector(".dc-pane")).reverse().flatMap((h) => {
        const w = le(h);
        return w ? [{ element: h, path: w }] : [];
      }) : [];
    }
    function xe(f, h) {
      for (const { element: w, path: F } of be()) {
        if (w.dataset.dcSpace === "desktop") continue;
        const N = w.getBoundingClientRect();
        if (!(f < N.left || f > N.right || h < N.top || h > N.bottom))
          return { panel: "", space: F, edge: "center" };
      }
      return null;
    }
    function je(f) {
      return T().filter(
        (h) => h.element.closest(".dc-window__desktop") === f
      );
    }
    let I = null;
    const ae = (f) => f.altKey;
    function ve(f, h) {
      if (!X(f) || g.value || k.value || h.button !== 0) return;
      const w = h.clientX, F = h.clientY;
      let N = !1, W = ae(h);
      const me = () => {
        const ke = E.value;
        ke && (m.value = W ? we(ke.x, ke.y, f) : O(ke.x, ke.y, f));
      }, pe = (ke) => {
        if (!N) {
          if (Math.hypot(ke.clientX - w, ke.clientY - F) < 4) return;
          N = !0, g.value = f, $.value = null;
        }
        W = ae(ke), _.value = !W, E.value = { x: ke.clientX, y: ke.clientY }, me();
      }, U = (ke) => {
        ae(ke) !== W && (W = !W, _.value = !W, N && me());
      }, se = (ke) => {
        I?.();
        const ce = m.value, qe = u.value;
        if (ke && N && ce && qe) {
          const ut = ce.space ? Ks(qe, f, ce.space, ce.rect) : ce.edge === "float" && ce.rect ? Hs(qe, f, ce.panel, ce.rect) : bn(qe, f, ce.panel, ce.edge, ce.index);
          de(ut, {
            panel: f,
            target: ce.panel,
            edge: ce.edge,
            ...ce.space === void 0 ? {} : { space: ce.space },
            ...ce.index === void 0 ? {} : { index: ce.index },
            ...ce.rect === void 0 ? {} : { rect: ce.rect }
          });
        }
        g.value = null, m.value = null, E.value = null, _.value = !0;
      }, ie = () => se(!0), ye = () => se(!1), Se = (ke) => {
        if (ke.key === "Escape") {
          se(!1);
          return;
        }
        U(ke);
      };
      I = () => {
        window.removeEventListener("pointermove", pe), window.removeEventListener("pointerup", ie), window.removeEventListener("pointercancel", ye), window.removeEventListener("keydown", Se), window.removeEventListener("keyup", U), I = null;
      }, window.addEventListener("pointermove", pe), window.addEventListener("pointerup", ie), window.addEventListener("pointercancel", ye), window.addEventListener("keydown", Se), window.addEventListener("keyup", U);
    }
    Ve(() => I?.());
    let Oe = null;
    function Ye(f) {
      const h = C.value;
      return h ? [...h.querySelectorAll(
        `.dc-float[data-dc-path="${f.join("/")}"]`
      )].find((N) => N.closest(".dc-window") === h)?.parentElement ?? null : null;
    }
    function H(f) {
      const h = u.value;
      return h ? Pa(h, f) : null;
    }
    function J(f) {
      const h = u.value;
      if (!h) return;
      const w = tn(h, f);
      w !== h && (r.value = w);
    }
    function Y(f) {
      const h = H(f);
      h && J(h);
    }
    function Ue(f) {
      const h = u.value, w = h ? ze(h, f) : null;
      return w !== null && dt(w);
    }
    function K(f) {
      const h = u.value, w = h ? ze(h, f) : null;
      return w !== null && wt(w);
    }
    function Q(f) {
      const h = u.value, w = h ? _t(h, f) : null;
      return w ? Ie(w.node) : "";
    }
    function ne(f) {
      const h = u.value, w = h ? _t(h, f) : null;
      if (!h || !w) return;
      const F = Ie(w.node);
      if (l.value.get(F)?.fixed === !0) return;
      const N = !wt(w);
      let W = Yf(h, f, N);
      W !== h && (N || (W = tn(W, f)), r.value = W, s("frame-minimize", { panel: F, minimized: N }));
    }
    function Fe(f) {
      const h = H(f);
      h && ne(h);
    }
    function De(f) {
      const h = u.value, w = h ? _t(h, f) : null;
      if (!h || !w) return;
      const F = Ie(w.node);
      if (l.value.get(F)?.fixed === !0) return;
      const N = !dt(w);
      let W = Qf(h, f, N);
      W !== h && (N && (W = tn(W, f)), r.value = W, s("frame-maximize", { panel: F, maximized: N }));
    }
    function jt(f) {
      const h = H(f);
      h && De(h);
    }
    function ds(f, h, w) {
      const F = u.value, N = F ? _t(F, f) : null;
      if (!F || !N || h.button !== 0 || g.value || k.value) return;
      const W = Ie(N.node);
      if (l.value.get(W)?.fixed === !0 || dt(N) || wt(N) || (w === "move" ? !a.movable : !a.resizable)) return;
      const me = Ye(f), pe = Zf(F, f);
      J(f);
      const U = { w: me?.clientWidth ?? 0, h: me?.clientHeight ?? 0 }, se = { ...N.rect }, ie = h.clientX, ye = h.clientY, Se = a.minPanelSize;
      k.value = W;
      const ke = (Ge) => {
        const lt = u.value;
        if (!lt) return;
        const Ut = qs(lt, pe, ca(Ge, U, Se));
        Ut !== lt && (r.value = Ut);
      }, ce = (Ge) => {
        Ge.preventDefault();
        const lt = Ge.clientX - ie, Ut = Ge.clientY - ye;
        ke(
          w === "move" ? { ...se, x: se.x + lt, y: se.y + Ut } : Ds(se, w, lt, Ut, Se)
        );
      }, qe = (Ge) => {
        if (Oe?.(), k.value = null, !Ge) {
          ke(se);
          return;
        }
        const lt = u.value ? _t(u.value, pe) : null;
        lt && s("frame-change", { panel: Q(pe), rect: lt.rect });
      }, ut = () => qe(!0), gt = () => qe(!1), yt = (Ge) => {
        Ge.key === "Escape" && qe(!1);
      };
      Oe = () => {
        window.removeEventListener("pointermove", ce), window.removeEventListener("pointerup", ut), window.removeEventListener("pointercancel", gt), window.removeEventListener("keydown", yt), Oe = null;
      }, window.addEventListener("pointermove", ce), window.addEventListener("pointerup", ut), window.addEventListener("pointercancel", gt), window.addEventListener("keydown", yt);
    }
    function hl(f, h, w) {
      const F = H(f);
      F && ds(F, h, w);
    }
    function ml(f, h, w = !1) {
      const F = u.value, N = H(f), W = F && N ? _t(F, N) : null;
      if (!F || !N || !W || l.value.get(f)?.fixed === !0 || (w ? !a.resizable : !a.movable)) return;
      if (dt(W) || wt(W)) {
        S.value = `${nt(f)} is ${dt(W) ? "maximized" : "minimized"}, so it cannot be moved.`;
        return;
      }
      const me = h === "left" ? -$n : h === "right" ? $n : 0, pe = h === "up" ? -$n : h === "down" ? $n : 0, U = Ye(N), se = { w: U?.clientWidth ?? 0, h: U?.clientHeight ?? 0 }, ie = w ? Ds(W.rect, "se", me, pe, a.minPanelSize) : { ...W.rect, x: W.rect.x + me, y: W.rect.y + pe }, ye = qs(F, N, ca(ie, se, a.minPanelSize));
      if (ye === F) {
        S.value = w ? `${nt(f)} cannot be resized further.` : `${nt(f)} cannot move ${h}.`;
        return;
      }
      r.value = ye;
      const Se = _t(ye, N);
      Se && (s("frame-change", { panel: f, rect: Se.rect }), S.value = w ? `${nt(f)} resized to ${Se.rect.w} by ${Se.rect.h}.` : `${nt(f)} moved to ${Se.rect.x}, ${Se.rect.y}.`);
    }
    Ve(() => Oe?.());
    function gl(f, h) {
      const w = z(f), F = w?.element.getBoundingClientRect();
      if (!w || !F) return null;
      const N = h === "left" || h === "right", W = (U) => {
        if (!(N ? U.bottom > F.top + 1 && U.top < F.bottom - 1 : U.right > F.left + 1 && U.left < F.right - 1)) return null;
        const ie = h === "left" ? F.left - U.right : h === "right" ? U.left - F.right : h === "up" ? F.top - U.bottom : U.top - F.bottom;
        return ie < -1 ? null : ie;
      }, me = [];
      for (const U of T()) {
        if (U === w || U.element === w.element) continue;
        const se = W(U.element.getBoundingClientRect());
        if (se === null) continue;
        const ie = U.panels.find((ye) => ye !== f);
        ie && me.push({ to: { panel: ie }, distance: se });
      }
      for (const { element: U, path: se } of be()) {
        const ie = W(U.getBoundingClientRect());
        ie !== null && me.push({ to: { space: se }, distance: ie });
      }
      return me.reduce(
        (U, se) => U && U.distance <= se.distance ? U : se,
        null
      )?.to ?? null;
    }
    function yl(f) {
      const h = u.value ? ze(u.value, f) !== null : !1;
      if (!h && !X(f)) return;
      $.value = $.value === f ? null : f;
      const w = nt(f);
      if (!$.value) {
        S.value = `${w}: move mode off.`;
        return;
      }
      S.value = h ? `${w}: move mode on. Arrow keys move the window, shift and an arrow resize it, Escape leaves move mode.` : `${w}: move mode on. Arrow keys move the panel, shift and an arrow make it a tab of the panel that way, Escape leaves move mode.`;
    }
    const nt = (f) => l.value.get(f)?.title ?? f, _l = {
      left: "left",
      right: "right",
      up: "top",
      down: "bottom"
    };
    function wl(f, h, w = !1) {
      if (!X(f)) return;
      const F = u.value;
      if (!F) return;
      const N = nt(f), W = Ft(F, f);
      if (!w && W && (h === "left" || h === "right") && W.panels.length > 1) {
        const ye = W.panels.indexOf(f), Se = h === "left" ? ye - 1 : ye + 1;
        if (Se >= 0 && Se < W.panels.length) {
          de(nn(F, f, Se), { panel: f, target: f, edge: "center", index: Se }), S.value = `${N} moved ${h}, now tab ${Se + 1} of ${W.panels.length}.`, ea(f);
          return;
        }
      }
      const pe = gl(f, h);
      if (!pe || pe.panel !== void 0 && !X(pe.panel)) {
        S.value = `${N} cannot move ${h}.`;
        return;
      }
      const U = _l[h];
      if (pe.space) {
        const ye = pe.space, Se = pt(F, ye), ke = ze(F, f)?.rect, ce = { ...kt, ...ke ? { w: ke.w, h: ke.h } : {} };
        de(Ks(F, f, ye, ce), { panel: f, target: "", space: ye, edge: U }), S.value = `${N} moved ${h}, into ${Se ? Ht(Se) : "the space"}.`, ea(f);
        return;
      }
      const se = pe.panel, ie = W?.panels.length === 1 && Ft(F, se)?.panels.length === 1;
      w ? (de(bn(F, f, se, "center"), {
        panel: f,
        target: se,
        edge: "center"
      }), S.value = `${N} joined ${nt(se)} as a tab.`) : ie ? (de(Mn(F, f, se), { panel: f, target: se, edge: U }), S.value = `${N} moved ${h}, trading places with ${nt(se)}.`) : (de(bn(F, f, se, U), { panel: f, target: se, edge: U }), S.value = `${N} moved ${h}, beside ${nt(se)}.`), ea(f);
    }
    function ea(f) {
      vt(() => {
        z(f)?.element.querySelector(".dc-pane__grip")?.focus();
      });
    }
    function kl(f, h) {
      const w = u.value;
      w && (r.value = En(w, f, h));
    }
    function ta(f) {
      const h = u.value;
      if (!h) return;
      const w = Nt(h, f);
      w !== h && (r.value = w, s("tab-select", { panel: f }));
    }
    function na(f) {
      return l.value.get(f)?.closable ?? a.closable;
    }
    function fs(f) {
      na(f) && s("panel-close", f);
    }
    const aa = D(/* @__PURE__ */ new Map());
    let bl = 0;
    function $l(f, h) {
      const w = bl += 1;
      return aa.value.set(w, { panel: f, items: h }), () => {
        aa.value.delete(w);
      };
    }
    function xl(f) {
      const h = [];
      for (const w of aa.value.values())
        w.panel() === f && h.push(...w.items());
      return h;
    }
    function ps(f) {
      const h = f.filter((w) => w.items.length > 0);
      return h.length < 2 ? h.flatMap((w) => w.items) : h.flatMap((w) => [
        { id: w.id, heading: !0, label: w.title },
        ...w.items
      ]);
    }
    const vs = (f) => f.title || "These tabs";
    function hs(f, h) {
      const w = h.id, F = Ft(f, w), N = (F?.panels.length ?? 0) > 1, W = F?.fixedView === !0, me = (ie) => ({
        action: () => {
          ie !== f && (r.value = ie);
        }
      }), pe = [], U = [], se = h.views ?? [];
      if (se.length > 1 && !W) {
        const ie = M(w);
        pe.push({
          id: "view",
          label: "View",
          items: se.map((ye) => ({
            id: `view-${ye.key}`,
            label: ye.label,
            checked: ye.key === ie,
            action: () => q(w, ye.key)
          }))
        });
      }
      return N && !W && U.push(
        { id: "show-row", label: "Row", checked: !1, ...me(Vs(f, w, "row")) },
        {
          id: "show-column",
          label: "Column",
          checked: !1,
          ...me(Vs(f, w, "column"))
        },
        // Already true, and nothing to collapse: these panes are tabs. Ticked
        // and choosable all the same — collapsing a strip into a strip hands
        // back the tree it was given, so it is the no-op it looks like.
        {
          id: "show-tabs",
          label: "Tabs",
          checked: !0,
          ...me(np(f, w))
        },
        {
          id: "show-desktop",
          label: "Desktop",
          checked: !1,
          ...me(ap(f, w))
        }
      ), N && F && (U.length && U.push({ separator: !0 }), U.push(...ms(F, w))), { panel: pe, tabs: U, tabsTitle: F ? vs(F) : "" };
    }
    function ms(f, h) {
      const w = Et(f), F = (N) => {
        const W = f.panels[(w + N + f.panels.length) % f.panels.length];
        return (W === void 0 ? "" : Ie(W)) || h;
      };
      return [
        { id: "next-tab", label: "Next tab", action: () => ta(F(1)) },
        { id: "previous-tab", label: "Previous tab", action: () => ta(F(-1)) },
        ...Cl(f)
      ];
    }
    function Cl(f) {
      const h = Qe(f).filter(na);
      return h.length ? [
        { separator: !0 },
        { id: "close-all", label: "Close all", action: () => h.forEach(fs) }
      ] : [];
    }
    function wn(f) {
      return f.title ? f.title : ee(f) ? f.panels.length > 1 ? "these tabs" : "the strip" : Ht(f);
    }
    function gs(f) {
      if (!f || ue(f) || f.fixedView === !0 || !f.title && f.headless !== !0 || tt(f)) return null;
      const h = il(f);
      return h && h.fixedView !== !0 ? h : null;
    }
    function ys(f) {
      const h = u.value;
      if (!a.menu || !h) return [];
      const w = pt(h, f);
      if (!w || ee(w)) return [];
      if (w.fixedView) return [];
      const F = ue(w) ? "desktop" : w.direction, N = (ce, qe, ut) => ({
        id: `show-${ce}`,
        label: qe,
        checked: F === ce,
        action: () => {
          const gt = u.value, yt = ut();
          !gt || yt === w || (r.value = On(Le($t(gt, f, yt))));
        }
      }), W = () => {
        const ce = sl(w, Sl(w));
        if (ee(ce) && ce.panels.length === 0) return w;
        const qe = ee(ce) && ce.panels.length === 1 ? ce.panels[0] : void 0;
        return qe !== void 0 && $e(qe) ? w : ce;
      }, me = (ce) => () => ue(w) ? ol(w, ce) : w.direction === ce ? w : { ...w, direction: ce }, pe = f.slice(0, -1), U = f.length > 0 ? pt(h, pe) : null, se = U && ee(U) && U.panels.length > 1 ? U : null, ie = U && gs(U) === w ? U : null, ye = gs(w), Se = w.title || "this space", ke = (ce, qe, ut, gt, yt) => ({
        id: ce,
        label: yt,
        action: () => {
          const Ge = u.value;
          Ge && (r.value = On(Le($t(Ge, qe, lp(ut, gt)))));
        }
      });
      return ps([
        {
          id: "about-space",
          /*
           * Its own name, or what it is rather than how it is shown: `spaceTitle`
           * would answer "Row" for an unnamed row, which is the item directly
           * under it and the one already ticked.
           */
          title: w.title || "This space",
          items: [
            N("row", "Row", me("row")),
            N("column", "Column", me("column")),
            // Everything in this space in one strip: the panes as tabs, and a
            // desktop among them as a tab of its own, keeping the windows on it.
            N("tabs", "Tabs", () => W()),
            N("desktop", "Desktop", () => ue(w) ? w : ll(w))
          ]
        },
        {
          id: "about-around",
          title: ye ? `Around ${wn(ye)}` : "",
          items: ye ? [
            // Keeping this space's bar drops the one inside, so it is offered
            // only where the space inside has no name to be dropped with it.
            ...ye.title ? [] : [ke("merge-around-keep-this", f, w, "outer", `Keep ${Se}`)],
            ...w.title ? [] : [ke("merge-around-keep-that", f, w, "inner", `Keep ${wn(ye)}`)]
          ] : []
        },
        {
          id: "about-inside",
          title: ie ? `Inside ${wn(ie)}` : "",
          items: ie ? [
            ...w.title ? [] : [ke("merge-inside-keep-that", pe, ie, "outer", `Keep ${wn(ie)}`)],
            ...ie.title ? [] : [ke("merge-inside-keep-this", pe, ie, "inner", `Keep ${Se}`)]
          ] : []
        },
        {
          id: "about-tabs",
          title: se ? vs(se) : "",
          items: se ? ms(se, Ie(w)) : []
        }
      ]);
    }
    function Sl(f) {
      const h = b.value;
      return h && ge(f, h) ? h : void 0;
    }
    function Ml(f) {
      const h = u.value, w = l.value.get(f);
      if (!h || !w) return [];
      const F = a.menu ? hs(h, w) : null, N = xl(f);
      N.length && F?.panel.length && N.push({ separator: !0 }), F && N.push(...F.panel);
      const W = Pl(w);
      W && (N.length && N.push({ separator: !0 }), N.push(W));
      const me = ps([
        { id: "about-panel", title: w.title, items: N },
        { id: "about-tabs", title: F?.tabsTitle ?? "", items: F?.tabs ?? [] }
      ]);
      return a.paneMenu ? a.paneMenu(w, me) : me;
    }
    const El = p(() => {
      const f = u.value;
      if (!f) return [];
      if (!ee(f)) return ys([]);
      const h = l.value.get(Ie(f));
      return a.menu && h ? hs(f, h).tabs : [];
    });
    function Pl(f) {
      const h = a.popOut?.(f);
      return !h || a.solo && u.value && Qe(u.value).length <= 1 ? null : {
        id: "pop-out",
        label: "Pop out to new window",
        action: () => {
          const w = C.value?.querySelector(`.dc-pane[data-dc-panel="${CSS.escape(f.id)}"]`);
          pp(h, fp(w)) && s("panel-pop-out", { panel: f.id, href: h });
        }
      };
    }
    function Al(f, h) {
      return o[`${f}-${h}`] ?? o[f];
    }
    function _s(f, h, w, F) {
      return Al(f, h.id)?.({ panel: h, view: w, active: F });
    }
    cp({
      panelFor: (f) => l.value.get(f) ?? null,
      viewFor: M,
      setView: q,
      movable: p(() => a.movable),
      resizable: p(() => a.resizable),
      minPanelSize: p(() => a.minPanelSize),
      spaceNames: p(() => a.spaceNames),
      rootBar: p(() => a.rootBar),
      focused: b,
      dragging: g,
      dropTarget: m,
      moving: $,
      framing: k,
      canMove: X,
      focus(f) {
        b.value !== f && (b.value = f, s("panel-activate", f));
      },
      selectPanel: ta,
      beginDrag: ve,
      toggleMoveMode: yl,
      nudge: wl,
      setSizes: kl,
      frameOf: (f) => u.value ? ze(u.value, f) : null,
      beginFrameDrag: hl,
      nudgeFrame: ml,
      raise: Y,
      maximized: Ue,
      toggleMaximize: jt,
      minimized: K,
      toggleMinimize: Fe,
      beginFrameDragAt: ds,
      raiseAt: J,
      toggleMaximizeAt: De,
      toggleMinimizeAt: ne,
      menuFor: Ml,
      spaceMenu: ys,
      registerMenu: $l,
      closable: na,
      close: fs,
      renderContent: (f, h, w) => _s("panel", f, h, w),
      renderActions: (f, h, w) => _s("actions", f, h, w),
      layout: u
    });
    const Tl = p(() => {
      if (!(!a.accent && !a.tokens))
        return { ...a.tokens, ...a.accent ? { "--dc-accent": a.accent } : {} };
    }), Ll = () => {
      const f = g.value, h = E.value;
      return !f || !h ? null : Dl(
        "div",
        {
          class: "dc-window__ghost",
          style: { left: `${h.x}px`, top: `${h.y}px` },
          "aria-hidden": "true"
        },
        l.value.get(f)?.title ?? f
      );
    };
    return t({
      /** The layout as rendered, reconciled against the current panels. */
      layout: u,
      /** Moves a panel programmatically — the same operation a drag performs. */
      move(f, h, w, F) {
        const N = u.value;
        N && de(bn(N, f, h, w, F), {
          panel: f,
          target: h,
          edge: w,
          ...F === void 0 ? {} : { index: F }
        });
      },
      /** Brings a panel's tab to the top of its group. */
      select(f) {
        const h = u.value;
        h && (r.value = Nt(h, f));
      },
      /** Lifts a panel onto the float holding `near`, as a window of its own. */
      float(f, h, w) {
        const F = u.value;
        F && de(Hs(F, f, h, w), {
          panel: f,
          target: h,
          edge: "float",
          rect: w
        });
      },
      /** Puts a floating frame somewhere else, or makes it another size. */
      setRect(f, h) {
        const w = u.value;
        if (!w) return;
        const F = Uf(w, f, h);
        if (F === w) return;
        r.value = F;
        const N = ze(F, f);
        N && s("frame-change", { panel: f, rect: N.rect });
      },
      /**
       * Puts a panel on one of its views, the way its menu would — the way a pane
       * whose space fixed its view, or took its bar away, is switched at all.
       */
      setView: q,
      /**
       * The menu of the space at the root: how the whole window is shown. For a
       * host's menu bar, when `rootBar` takes away the bar it was on.
       */
      rootMenu: El,
      /** Brings a floating frame to the front of its stack. */
      raise: Y,
      /** Fills the float with a window, or puts it back where it was. */
      toggleMaximize: jt,
      /** Rolls a window up to its title bar, or unrolls it. */
      toggleMinimize: Fe
    }), (f, h) => (d(), v("div", {
      ref_key: "root",
      ref: C,
      class: "dc-shell dc-window",
      "data-dc-theme": e.theme,
      "data-dc-dragging": g.value ? "true" : "false",
      "data-dc-docking": _.value ? "true" : "false",
      style: Me(Tl.value)
    }, [
      u.value ? (d(), G(iv, {
        key: 0,
        node: u.value,
        path: []
      }, null, 8, ["node"])) : (d(), v("p", uv, " This window has no panels. ")),
      oe(Ll),
      x("p", dv, R(S.value), 1)
    ], 12, cv));
  }
}), pv = /* @__PURE__ */ re(fv, [["__scopeId", "data-v-a7bf2b5c"]]);
function nh(e, t) {
  const n = D(!1);
  let a = null, s = !1, r = 0;
  const i = () => {
    r++, n.value = !1, a !== null && (clearTimeout(a), a = null);
  };
  function o(u) {
    a = setTimeout(() => void l(u), t);
  }
  async function l(u) {
    if (s || u !== r) return;
    let y;
    try {
      y = await e();
    } catch {
      y = !1;
    }
    s || u !== r || (y ? o(u) : i());
  }
  const c = () => {
    n.value || (n.value = !0, l(++r));
  };
  return Kt(() => {
    s = !0, i();
  }, !0), { start: c, stop: i, polling: n };
}
function ah(e, t = {}) {
  const n = t.key ?? ((r) => JSON.stringify(r)), a = ct();
  let s = null;
  return ql(() => {
    const r = e(), i = n(r);
    i !== s && (s = i, a.value = r);
  }), a;
}
const vv = (e) => Math.round(e * 1e3) / 1e3;
function da(e, t) {
  return e.title && (t.t = e.title), e.headless && (t.h = !0), e.fixedView && (t.v = !0), t;
}
function hv(e) {
  return [Math.round(e.x), Math.round(e.y), Math.round(e.w), Math.round(e.h)];
}
function fa(e) {
  const t = { b: hv(e.rect) };
  return e.title && (t.t = e.title), e.maximized && (t.M = !0), e.minimized && (t.m = !0), t;
}
function mv(e) {
  if (e.kind !== "group" || e.panels.length !== 1) return null;
  const t = e.panels[0];
  return typeof t != "string" || e.title || e.headless || e.fixedView || e.places ? null : t;
}
function Ta(e) {
  const t = mv(e);
  return t !== null ? t : dl(e);
}
function dl(e) {
  if (e.kind === "group") {
    const n = { g: e.panels.map((a) => typeof a == "string" ? a : dl(a)) };
    return e.active !== void 0 && e.active !== e.panels[0] && (n.a = e.active), e.places && (n.p = e.places.map(fa)), da(e, n);
  }
  if (e.kind === "split") {
    const n = { [e.direction === "row" ? "r" : "c"]: e.children.map(Ta) };
    return e.sizes && (n.z = e.sizes.map(vv)), e.places && (n.p = e.places.map(fa)), da(e, n);
  }
  const t = {
    f: e.frames.map((n) => ({ n: Ta(n.node), ...fa(n) }))
  };
  return da(e, t);
}
class fl extends Error {
}
const Re = () => {
  throw new fl();
}, La = (e) => typeof e == "object" && e !== null && !Array.isArray(e), Tt = (e) => Array.isArray(e) ? e : Re(), cs = (e) => e === void 0 ? void 0 : typeof e == "string" ? e : Re(), pl = (e) => Tt(e).map((t) => typeof t == "number" && Number.isFinite(t) ? t : Re());
function gv(e) {
  const [t, n, a, s] = pl(e);
  return s === void 0 && Re(), { x: t, y: n, w: a, h: s };
}
function pa(e) {
  if (!La(e)) return Re();
  const t = { rect: gv(e.b) }, n = cs(e.t);
  return n && (t.title = n), e.M === !0 && (t.maximized = !0), e.m === !0 && (t.minimized = !0), t;
}
function va(e, t) {
  const n = cs(e.t);
  return n && (t.title = n), e.h === !0 && (t.headless = !0), e.v === !0 && (t.fixedView = !0), t;
}
function Pn(e) {
  if (typeof e == "string") return { kind: "group", panels: [e] };
  if (!La(e)) return Re();
  if (e.g !== void 0) {
    const n = Tt(e.g).map((r) => typeof r == "string" ? r : Pn(r));
    n.length === 0 && Re();
    const a = { kind: "group", panels: n }, s = cs(e.a);
    return s !== void 0 && (a.active = s), e.p !== void 0 && (a.places = Tt(e.p).map(pa)), va(e, a);
  }
  const t = e.r !== void 0 ? "row" : e.c !== void 0 ? "column" : null;
  if (t) {
    const n = Tt(t === "row" ? e.r : e.c).map(Pn), a = { kind: "split", direction: t, children: n };
    return e.z !== void 0 && (a.sizes = pl(e.z)), e.p !== void 0 && (a.places = Tt(e.p).map(pa)), va(e, a);
  }
  if (e.f !== void 0) {
    const a = { kind: "float", frames: Tt(e.f).map((s) => !La(s) || s.n === void 0 ? Re() : { node: Pn(s.n), ...pa(s) }) };
    return va(e, a);
  }
  return Re();
}
const vl = /[ '!:(),*@$]/, yv = /^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][-+]?\d+)?$/;
function Us(e) {
  return e !== "" && !vl.test(e) && !/^[-\d]/.test(e) ? e : `'${e.replace(/[!']/g, (n) => `!${n}`)}'`;
}
function Ra(e) {
  return e === null ? "!n" : e === !0 ? "!t" : e === !1 ? "!f" : typeof e == "number" ? Number.isFinite(e) ? String(e) : "!n" : typeof e == "string" ? Us(e) : Array.isArray(e) ? `!(${e.map(Ra).join(",")})` : `(${Object.entries(e).map(([t, n]) => `${Us(t)}:${Ra(n)}`).join(",")})`;
}
function _v(e) {
  let t = 0;
  const n = () => e[t], a = (o) => e[t++] === o ? void 0 : Re(), s = () => {
    if (n() === "'") {
      t++;
      let l = "";
      for (; ; ) {
        const c = e[t++];
        if (c === void 0) return Re();
        if (c === "'") return l;
        if (c === "!") {
          const u = e[t++];
          u !== "!" && u !== "'" && Re(), l += u;
        } else l += c;
      }
    }
    const o = t;
    for (; t < e.length && !vl.test(e[t]); ) t++;
    return t === o && Re(), e.slice(o, t);
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
        const y = e[t++];
        if (y === ")") return c;
        y !== "," && Re();
      }
    }
    if (o === "!") {
      t++;
      const c = e[t++];
      if (c === "t") return !0;
      if (c === "f") return !1;
      if (c === "n") return null;
      if (c !== "(") return Re();
      const u = [];
      if (n() === ")")
        return t++, u;
      for (; ; ) {
        u.push(r());
        const y = e[t++];
        if (y === ")") return u;
        y !== "," && Re();
      }
    }
    if (o === "'") return s();
    const l = s();
    return yv.test(l) ? Number(l) : l;
  }, i = r();
  return t !== e.length && Re(), i;
}
function ha(e) {
  return Ra(Ta(e));
}
function wv(e) {
  try {
    return Pn(_v(e));
  } catch (t) {
    if (t instanceof fl) return null;
    throw t;
  }
}
function ma(e, t) {
  for (const n of e.replace(/^[?]/, "").split("&")) {
    const a = n.indexOf("="), s = a === -1 ? n : n.slice(0, a);
    if (us(s) === t) return a === -1 ? "" : n.slice(a + 1);
  }
  return null;
}
function ga(e, t, n) {
  const a = e.replace(/^[?]/, "").split("&").filter(Boolean), s = a.findIndex((i) => {
    const o = i.indexOf("=");
    return us(o === -1 ? i : i.slice(0, o)) === t;
  }), r = n === null ? null : `${encodeURIComponent(t)}=${n}`;
  return s === -1 ? r && a.push(r) : r ? a[s] = r : a.splice(s, 1), a.length ? `?${a.join("&")}` : "";
}
function us(e) {
  try {
    return decodeURIComponent(e.replace(/\+/g, " "));
  } catch {
    return e;
  }
}
const kv = [
  [/%2C/g, ","],
  [/%3A/g, ":"],
  [/%2F/g, "/"],
  [/%40/g, "@"],
  [/%24/g, "$"],
  [/%20/g, "+"]
], Gs = (e) => {
  let t = encodeURIComponent(e);
  for (const [n, a] of kv) t = t.replace(n, a);
  return t;
};
function sh(e, t) {
  const { adapter: n } = t, a = t.param ?? "w", s = t.soloParam ?? "solo", r = t.delay ?? 200, i = () => Lt(t.home) ?? null;
  let o = ma(n.search.value, a), l = null;
  const c = () => {
    l !== null && clearTimeout(l), l = null;
  }, u = (m) => m === null ? i() : wv(us(m)) ?? i(), y = () => {
    c();
    const m = e.value, _ = i(), $ = m ? ha(m) : null, k = $ === null || _ && $ === ha(_) ? null : Gs($);
    o = k;
    const E = ga(n.search.value, a, k);
    E !== n.search.value && n.replace(E);
  }, b = u(o);
  return b && (e.value = b), Ce(e, () => {
    c(), l = setTimeout(y, r);
  }), Ce(n.search, (m) => {
    const _ = ma(m, a);
    if (_ === o) return;
    c(), o = _;
    const $ = u(_);
    $ && (e.value = $);
  }), Dn() && Kt(() => l !== null ? y() : void 0), {
    flush: () => l !== null ? y() : void 0,
    popOutHref: (m) => {
      let _ = ga(n.search.value, a, Gs(ha(Vf(Je(m)))));
      return _ = ga(_, s, "1"), n.href ? n.href(_) : `${n.path.value}${_}`;
    },
    solo: p(() => ma(n.search.value, s) !== null)
  };
}
function rh(e = {}) {
  return { key: "ordinal", kind: "ordinal", label: "#", width: "52px", ...e };
}
function lh(e = {}) {
  return { key: "status", role: "state", kind: "status", label: "State", width: "104px", ...e };
}
function oh(e = {}) {
  return { key: "tint", role: "tint", ...e };
}
function ih(e = {}) {
  return { key: "picture", role: "image", kind: "image", width: "56px", height: "40px", ...e };
}
function ch(e, t = {}) {
  return {
    key: "primary",
    role: "identity",
    label: e,
    sort: "name",
    activate: !0,
    truncate: !0,
    ...t
  };
}
function uh(e, t = {}) {
  return {
    key: "secondary",
    role: "reference",
    label: e,
    mono: !0,
    muted: !0,
    truncate: !0,
    ...t
  };
}
function dh(e, t, n = {}) {
  return {
    key: e,
    role: "metric",
    kind: "number",
    label: t,
    sort: e,
    width: "92px",
    hideBelow: 760,
    ...n
  };
}
function fh(e, t, n = {}) {
  return { key: e, kind: "date", label: t, sort: e, width: "104px", mono: !0, muted: !0, ...n };
}
function ph(e = {}) {
  return {
    key: "entityLabel",
    label: "Entity",
    width: "130px",
    mono: !0,
    truncate: !0,
    class: "dc-table__entity",
    ...e
  };
}
function vh(e, t, n = {}) {
  return { key: e, label: t, truncate: !0, hideBelow: 900, ...n };
}
function hh(e, t, n, a = {}) {
  return {
    key: e,
    label: t,
    value: (s) => Object.entries(n).filter(([r]) => s.fields[r] === !0).map(([, r]) => r),
    muted: !0,
    truncate: !0,
    hideBelow: 1100,
    ...a
  };
}
function Jn(e) {
  return typeof e == "number" ? e : typeof e == "string" && e.trim() !== "" ? Number(e) : Number.NaN;
}
function mh(e) {
  const t = Jn(e);
  return Number.isFinite(t) && t > 0 ? Yl(t) : rt;
}
function gh(e) {
  const t = Jn(e);
  return Number.isFinite(t) && t > 0 ? Zl(t) : rt;
}
function yh(e) {
  const t = Jn(e);
  return Number.isFinite(t) && t > 0 ? Jl(t) : rt;
}
function _h(e) {
  const t = Jn(e);
  return Number.isFinite(t) ? eo(t) : rt;
}
function bv(e) {
  if (e <= 0) return 0;
  const t = 10 ** Math.floor(Math.log10(e));
  for (const n of [1, 2, 5])
    if (e <= n * t) return n * t;
  return 10 * t;
}
function $v(e, t) {
  const n = /* @__PURE__ */ new Set();
  for (const a of e) {
    const s = a.fields[t];
    for (const r of Array.isArray(s) ? s : [s])
      typeof r == "string" && r && n.add(r);
  }
  return [...n].sort((a, s) => a.localeCompare(s));
}
function xv(e, t) {
  let n = 0;
  for (const a of e) {
    const s = a.fields[t];
    typeof s == "number" && s > n && (n = s);
  }
  return n;
}
function wh(e, t, n, a = {}) {
  return {
    kind: "chips",
    key: t,
    label: n,
    options: $v(e, t),
    ...a.multiple ? { multiple: !0 } : {}
  };
}
function kh(e, t, n) {
  return { kind: "range", key: t, label: n, min: 0, max: bv(xv(e, t)) };
}
function bh(e, t, n) {
  return { kind: "toggle", key: e, label: t, text: n };
}
function $h(e) {
  return e.filter((t) => t.kind === "chips" ? t.options.length > 1 : t.kind === "range" ? t.max > 0 : !0);
}
function xh(e = "", t = "/") {
  const n = D(We(e)), a = D(t), s = [`${a.value}${n.value}`];
  return {
    search: n,
    path: a,
    history: s,
    href(r) {
      return `${a.value}${We(r)}`;
    },
    push(r) {
      n.value = We(r), s.push(`${a.value}${n.value}`);
    },
    replace(r) {
      n.value = We(r), s[s.length - 1] = `${a.value}${n.value}`;
    }
  };
}
function Xs(e) {
  const t = e.indexOf("?");
  if (t === -1) return "";
  const n = e.slice(t), a = n.indexOf("#");
  return We(a === -1 ? n : n.slice(0, a));
}
function Ch(e) {
  const t = D(Xs(e.currentRoute.value.fullPath)), n = p(() => e.currentRoute.value.path), a = Ce(
    () => e.currentRoute.value.fullPath,
    (s) => {
      t.value = Xs(s);
    }
  );
  return {
    search: t,
    path: n,
    push: (s) => e.push(`${n.value}${We(s)}`),
    replace: (s) => e.replace(`${n.value}${We(s)}`),
    href: (s) => {
      const r = `${n.value}${We(s)}`;
      return e.resolve?.(r).href ?? r;
    },
    dispose: a
  };
}
function Sh(e, t, n = "/") {
  return (a) => {
    const s = a.params[t], r = Array.isArray(s) ? s.join("/") : s ?? "", i = a.query[xt], o = typeof i == "string" ? i : "", l = `${e}="${r.replace(/"/g, "")}"`;
    return { path: n, query: { ...a.query, [xt]: dn(o, l) } };
  };
}
function Mh(e, t = "/") {
  return (n) => ({ path: t, query: { ...n.query, [un]: e } });
}
function Eh(e) {
  const t = /* @__PURE__ */ new Map();
  for (const n of e) {
    const a = t.get(n.entityKey);
    a ? a.push(n) : t.set(n.entityKey, [n]);
  }
  return {
    query(n) {
      return hr(n, (a) => t.get(a.key) ?? [], {
        undatedLast: !0,
        zeroIsAll: !0
      });
    }
  };
}
function Ph(e, t) {
  return e.query({ ...t, limit: Number.MAX_SAFE_INTEGER, offset: 0 }).rows;
}
const Cv = {
  DataShell: Hd,
  ShellHeader: Pr,
  QueryPanel: Tr,
  RecordActions: Rr,
  ResultsArea: Kr,
  FacetControl: Ar,
  SegmentedControl: sf,
  StatusPill: fn,
  WindowFrame: pv,
  WindowPane: ul,
  ListView: Ca,
  CardsView: Ir,
  GridView: Nr,
  ImagesView: Br,
  TableView: qr,
  LinksView: Or,
  PreviewView: Dr,
  TypeCardsView: Hr
}, Ah = {
  install(e, t = {}) {
    const n = t.prefix ?? "";
    for (const [a, s] of Object.entries(Cv))
      e.component(`${n}${a}`, s);
    t.route && e.provide(Ys, t.route);
  }
};
export {
  Bn as CASCADE_STEP,
  Av as COLUMN_BREAKPOINTS,
  Pv as COLUMN_ROLES,
  Ir as CardsView,
  Ns as ColumnCell,
  Sf as CopyButton,
  Vl as DEFAULT_ENTITY_VIEW,
  kt as DEFAULT_FRAME,
  ya as DEFAULT_SORT,
  Kl as DEFAULT_VIEW,
  Go as DRAFT_DELAY,
  Hd as DataShell,
  rt as EMPTY_CELL,
  gr as ENTITY_ALL,
  Nn as ENTITY_TERM,
  rn as EXPRESSION_TERM,
  Va as FACET_PREFIX,
  Ar as FacetControl,
  Nr as GridView,
  Ah as HeaderContentLayoutPlugin,
  Br as ImagesView,
  Or as LinksView,
  Ca as ListView,
  At as MINIMIZED_GAP,
  Gr as MINIMIZED_HEIGHT,
  Sa as MINIMIZED_WIDTH,
  Ur as MIN_FRAME,
  zn as MOCK_TINTS,
  Ov as MenuBar,
  Ya as MenuButton,
  Ga as MenuList,
  pn as MetricDrill,
  vn as OpenMark,
  is as PANE_CONTEXT_KEY,
  Ka as PARAM_DIR,
  un as PARAM_ENTITY,
  xt as PARAM_EXPR,
  Wn as PARAM_PAGE,
  Ha as PARAM_SORT,
  Vn as PARAM_VIEW,
  Ev as PILL_TONES,
  Xa as PinStar,
  Dr as PreviewView,
  Qa as QueryMark,
  Tr as QueryPanel,
  Xt as RECORD_STATUSES,
  Da as RESULT_FIELDS,
  Ys as ROUTE_ADAPTER_KEY,
  Rr as RecordActions,
  Kr as ResultsArea,
  Mr as SHELL_CONTEXT_KEY,
  Mv as SHELL_THEMES,
  hn as ScopeMark,
  sf as SegmentedControl,
  Mt as SelectTick,
  Bv as ShellCard,
  Hv as ShellCode,
  Vv as ShellDialog,
  hf as ShellFact,
  Dv as ShellFacts,
  Pr as ShellHeader,
  Kv as ShellLog,
  Wv as ShellToasts,
  xa as StandingControl,
  qv as StatusCounts,
  fn as StatusPill,
  Nf as TOAST_ERROR_MS,
  If as TOAST_MS,
  qr as TableView,
  Hr as TypeCardsView,
  Zs as VIEW_KINDS,
  Wl as VIEW_LABELS,
  os as WINDOW_CONTEXT_KEY,
  pv as WindowFrame,
  ul as WindowPane,
  Qr as activePanel,
  Et as activeTab,
  dn as addTerm,
  qa as andExpression,
  Wf as axisOf,
  mh as bytesCell,
  es as cascade,
  or as cellFull,
  qt as cellText,
  Cn as cellTextOf,
  Ke as cellValue,
  sa as changesResults,
  wh as chipsFrom,
  ca as clampRect,
  sl as collapseSpace,
  np as collapseToTabs,
  Uv as column,
  $s as columnAlign,
  xs as columnClass,
  bs as columnKey,
  cr as columnShortcut,
  po as columnShortcutOf,
  _a as columnTruncates,
  no as columnsFor,
  Ul as countPages,
  Hl as createHistoryAdapter,
  xh as createMemoryAdapter,
  Eh as createMemoryDataSource,
  zo as createMockDataSource,
  Ch as createVueRouterAdapter,
  fh as dateColumn,
  wv as decodeLayout,
  ro as defaultCellText,
  js as defaultLayout,
  Oa as defaultQuery,
  sn as defaultViewFor,
  oa as drillExpression,
  Ks as dropIntoSpace,
  gh as durationCell,
  yh as elapsedCell,
  Dt as emptyFacetState,
  Ia as emptyFacetValue,
  ha as encodeLayout,
  ph as entityColumn,
  Mh as entityRedirect,
  kr as excludingTerm,
  Rn as expandShortcuts,
  vh as facetColumn,
  wr as fieldTerm,
  Rt as findEntity,
  ft as findSort,
  Gv as fixedView,
  hh as flagColumn,
  Ja as float,
  Hs as floatPanel,
  ll as floatSplit,
  ap as floatTabs,
  Zt as fnv1a,
  er as focusEntity,
  Yl as formatBytes,
  Pt as formatCount,
  Xl as formatDate,
  Lv as formatDateTime,
  Zl as formatDuration,
  Jl as formatElapsed,
  ot as formatExpression,
  Gl as formatMetric,
  Ql as formatOrdinal,
  eo as formatPercent,
  cn as formatTerm,
  Qn as frame,
  _t as frameAt,
  ze as frameOf,
  Pa as framePathOf,
  Ie as frontPanel,
  Ro as generateRows,
  jv as group,
  Ft as groupOf,
  jf as groups,
  sr as hasActiveFacets,
  ge as hasPanel,
  Vf as headless,
  ch as identityColumn,
  Iv as idsExpression,
  Qt as insertPanel,
  en as isChoosable,
  Tv as isEntityScoped,
  ar as isFacetActive,
  ue as isFloat,
  ee as isGroup,
  dt as isMaximized,
  wt as isMinimized,
  $e as isPanelTab,
  Na as isPristineQuery,
  Wt as isSplit,
  Xe as isTabOf,
  Ba as isTypeCardsQuery,
  Js as isViewKind,
  Ts as joinExpression,
  br as liftTerm,
  go as matchesExpression,
  Co as matchesFacets,
  Gf as maximizeFrame,
  Qf as maximizeFrameAt,
  lp as mergeSpace,
  dh as metricColumn,
  Xf as minimizeFrame,
  Yf as minimizeFrameAt,
  bn as movePanel,
  nn as moveTab,
  Nv as narrowPatch,
  yo as negateTerm,
  bv as niceMax,
  pt as nodeAt,
  an as nodeTitle,
  Le as normalizeLayout,
  We as normalizeSearch,
  rs as normalizeSizes,
  il as onlySpace,
  pp as openPopOut,
  ko as oppositeTerm,
  rh as ordinalColumn,
  Qe as panelIds,
  Je as panelNode,
  Os as panelTabs,
  Ne as parseExpression,
  Do as parseQuery,
  _h as percentCell,
  ih as pictureColumn,
  fp as popOutRect,
  bc as presentParts,
  zr as presentRow,
  Gn as pressOptions,
  cl as providePaneContext,
  Ho as provideShellContext,
  cp as provideWindowContext,
  Ph as queryAll,
  ua as raiseFrame,
  tn as raiseFrameAt,
  Zf as raisedPath,
  kh as rangeFrom,
  xo as readDraft,
  Fv as readExpression,
  rr as reconcileFacets,
  ip as reconcileLayout,
  Sh as recordRedirect,
  _r as recordTerm,
  qo as recordsIn,
  uh as referenceColumn,
  ka as refineExpression,
  bt as removePanel,
  $t as replaceAt,
  Ds as resizeRect,
  Ws as resizeSplit,
  Kn as resolveView,
  Ze as roleColumn,
  lr as roleColumns,
  On as rootSpace,
  ns as row,
  so as rowKey,
  wa as sameTerm,
  jn as scopeTerm,
  In as scopeTermFor,
  Cr as scopedEntity,
  zv as searchFromQuery,
  la as serializeQuery,
  Nt as setActivePanel,
  Uf as setFrameRect,
  qs as setFrameRectAt,
  En as setSizesAt,
  Yv as setSplitDirection,
  it as sizesOf,
  nr as sortsFor,
  Ae as spaceChrome,
  Ht as spaceTitle,
  ts as split,
  wo as splitExpression,
  Vs as spreadTabs,
  lh as stateColumn,
  to as stripAnsi,
  Wo as summarizeQuery,
  Ua as summaryTerms,
  Mn as swapPanels,
  Za as tabNode,
  gn as tabPanels,
  ja as termStanding,
  ol as tileFloat,
  oh as tintColumn,
  Rv as tintFor,
  Zv as toFloat,
  Jv as toTiled,
  bh as toggleFacet,
  Xv as toggleMaximized,
  Qv as toggleMinimized,
  Wu as useColumns,
  Xo as useDraft,
  di as useEntityCounts,
  id as useEntityPreviews,
  sh as useLayoutRoute,
  eh as usePaneContext,
  th as usePaneMenu,
  nh as usePoll,
  St as usePresentedRows,
  jo as useQueryState,
  vi as useRecordNames,
  Uo as useResults,
  Ee as useShellContext,
  ah as useStableSchema,
  Of as useToasts,
  Zn as useWindowContext,
  $h as usefulFacets,
  ks as viewAcross,
  $a as withStanding,
  xr as withoutOwnScope,
  _o as withoutTerm
};
