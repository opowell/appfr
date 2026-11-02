import { ref as N, computed as f, inject as Vt, provide as Dt, getCurrentInstance as Tn, shallowRef as me, toValue as ke, watch as se, onScopeDispose as ot, getCurrentScope as Mn, defineComponent as q, openBlock as u, createElementBlock as h, renderSlot as Q, useSlots as lt, onBeforeUnmount as pe, createElementVNode as S, createBlock as A, unref as $, withCtx as G, toDisplayString as P, createTextVNode as J, createCommentVNode as M, Fragment as W, renderList as X, withModifiers as Pe, normalizeClass as ce, withDirectives as Et, withKeys as Ye, normalizeStyle as oe, vModelText as Pa, nextTick as rt, useId as Kt, Teleport as it, createVNode as j, reactive as ln, onMounted as Ve, resolveDynamicComponent as Ne, createSlots as Lt, useModel as rn, onBeforeUpdate as Ea, normalizeProps as bt, guardReactiveProps as La, mergeProps as Tt, mergeModels as cn, vShow as un, Comment as Ta, Text as Ma, readonly as Oa, watchEffect as Aa } from "vue";
import { MenuList as Na } from "menu-bar";
const Wt = ["list", "cards", "grid", "images", "table", "links", "preview"], Oe = ["ok", "running", "queued", "review", "failed"], uc = [...Oe, "neutral", "accent"], dc = [
  "identity",
  "reference",
  "metric",
  "state",
  "updated",
  "image",
  "tint"
], fc = [480, 620, 760, 900, 1100], On = Symbol("dc.routeAdapter");
function ie(e) {
  if (!e) return "";
  const t = e.replace(/^[?]/, "");
  return t ? `?${t}` : "";
}
function Ra() {
  const e = typeof window < "u", t = N(e ? ie(window.location.search) : ""), n = N(e ? window.location.pathname : "/"), a = () => {
    t.value = ie(window.location.search), n.value = window.location.pathname;
  };
  e && window.addEventListener("popstate", a);
  const s = (o, l, i) => {
    const r = ie(o);
    if (!e) {
      t.value = r, i !== void 0 && (n.value = i);
      return;
    }
    const c = i === void 0 || i === window.location.pathname ? `${window.location.pathname}${r}${window.location.hash}` : `${i}${r}`;
    l === "push" ? window.history.pushState(window.history.state, "", c) : window.history.replaceState(window.history.state, "", c), t.value = r, n.value = window.location.pathname;
  };
  return {
    search: t,
    path: n,
    href(o, l) {
      return e ? l !== void 0 && l !== window.location.pathname ? `${l}${ie(o)}` : `${window.location.pathname}${ie(o)}${window.location.hash}` : `${l ?? n.value}${ie(o)}`;
    },
    push: (o, l) => s(o, "push", l),
    replace: (o, l) => s(o, "replace", l),
    dispose: () => {
      e && window.removeEventListener("popstate", a);
    }
  };
}
function Ia(e, t) {
  const n = f(t.detached), a = f(() => n.value ? "" : e.search.value), s = f(() => n.value ? t.path() : e.path.value);
  return {
    search: a,
    path: s,
    elsewhere: n,
    push(o, l) {
      n.value ? e.push(o, l ?? t.path()) : e.push(o, l);
    },
    replace(o, l) {
      n.value ? e.push(o, l ?? t.path()) : e.replace(o, l);
    },
    href(o, l) {
      const i = l ?? (n.value ? t.path() : void 0);
      return e.href ? e.href(o, i) : `${i ?? e.path.value}${ie(o)}`;
    }
  };
}
function Ae(e) {
  let t = 2166136261;
  for (let n = 0; n < e.length; n++)
    t ^= e.charCodeAt(n), t = Math.imul(t, 16777619);
  return Math.abs(t);
}
function Ba(e) {
  if (!Number.isFinite(e)) return "—";
  const t = Math.abs(e);
  return t >= 1e6 ? `${(e / 1e6).toFixed(1)}m` : t >= 1e3 ? `${(e / 1e3).toFixed(1)}k` : String(Math.round(e));
}
function Xe(e) {
  if (!Number.isFinite(e)) return "—";
  const t = Math.round(e), n = Math.abs(t);
  return n < 1e3 ? String(t) : n < 9950 ? `${(t / 1e3).toFixed(1)}k` : n < 999500 ? `${Math.round(t / 1e3)}k` : `${(t / 1e6).toFixed(1)}m`;
}
function Te(e) {
  return Number.isFinite(e) ? Math.round(e).toLocaleString("en-US") : "—";
}
function Ha(e) {
  const t = new Date(e);
  if (Number.isNaN(t.getTime())) return "—";
  const n = String(t.getUTCDate()).padStart(2, "0"), a = String(t.getUTCMonth() + 1).padStart(2, "0");
  return `${n}.${a}.${t.getUTCFullYear()}`;
}
function Fa(e) {
  return String(e + 1);
}
function vc(e, t) {
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
function qa(e) {
  if (e == null || !Number.isFinite(e) || e < 0) return "—";
  if (e < 1e3) return `${e} B`;
  const t = ["kB", "MB", "GB", "TB"];
  let n = e, a = -1;
  for (; n >= 1e3 && a < t.length - 1; )
    n /= 1e3, a += 1;
  return `${n < 100 ? n.toFixed(1) : Math.round(n)} ${t[a]}`;
}
function Va(e) {
  if (!e || !Number.isFinite(e)) return "—";
  if (e < 1e3) return `${Math.round(e)}ms`;
  const t = e / 1e3;
  return t < 60 ? `${t.toFixed(1)}s` : `${Math.floor(t / 60)}m ${Math.round(t % 60)}s`;
}
function Da(e) {
  if (e == null || !Number.isFinite(e) || e <= 0)
    return "—";
  const t = Math.floor(e / 60);
  return t ? `${t}:${String(e % 60).padStart(2, "0")}` : `${e}s`;
}
function Ka(e) {
  return e == null || !Number.isFinite(e) ? "—" : `${Math.round(e * 100)}%`;
}
function Wa(e) {
  return e.replace(/\x1b\[[0-9;?]*[ -/]*[@-~]/g, "");
}
const An = "cards", za = "table";
function Re(e, t = {}) {
  const n = (s) => s && Nn(s) ? s : void 0;
  if (e === null) return n(t.view) ?? An;
  const a = t.landing === "entity" ? n(t.view) : void 0;
  return n(t.entityView) ?? a ?? za;
}
function dn(e, t, n, a = {}) {
  return e === Re(t, a) ? Re(n, a) : e;
}
const Mt = "updated";
function Nn(e) {
  return typeof e == "string" && (e === "record" || Wt.includes(e));
}
const fn = {
  list: "List",
  cards: "Cards",
  grid: "Grid",
  images: "Images",
  table: "Table",
  links: "Links",
  preview: "Preview",
  record: "Record"
};
function zt(e, t) {
  if (e === "record" && !t?.includes(e)) return t?.[0] ?? An;
  const [n] = t ?? [];
  return n === void 0 || t?.includes(e) ? e : n;
}
function Ot(e) {
  return typeof e.count == "number" ? Xe(e.count) : e.count;
}
function Ie(e, t) {
  return t ? e.entities.find((n) => n.key === t) ?? null : null;
}
function Rn(e, t = {}) {
  const n = Ie(e, t.entity), a = e.entities[0];
  if (!n && !a) throw new Error(`Schema "${e.key}" declares no entities`);
  return n ?? a;
}
function In(e, t = null) {
  return e?.columns ?? t?.columns ?? [];
}
function ct(e, t = null) {
  if (e?.sorts?.length) return e.sorts;
  const n = /* @__PURE__ */ new Set(), a = [];
  for (const s of In(e, t))
    !s.sort || n.has(s.sort) || (n.add(s.sort), a.push({ key: s.sort, label: (s.label ?? s.sort).toLowerCase() }));
  return a;
}
const ja = { key: Mt, label: Mt };
function _e(e, t, n = null) {
  const a = ct(e, n);
  return (t ? a.find((o) => o.key === t) : void 0) ?? a.find((o) => o.key === Mt) ?? a[0] ?? ja;
}
function Ua(e) {
  switch (e.kind) {
    case "chips":
      return { kind: "chips", selected: [] };
    case "range":
      return { kind: "range", min: null, max: null };
    case "toggle":
      return { kind: "toggle", on: !1 };
  }
}
function Qa(e) {
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
function jt(e) {
  return e.entity === null && e.expr.trim() === "";
}
function pc(e) {
  return e.entity !== null;
}
function Bn(e, t) {
  return e.entity === null && zt(e.view, t) === "cards";
}
function Ga(e, t) {
  return t <= 0 ? 1 : Math.max(1, Math.ceil(e / t));
}
function Je(e, t = {}) {
  const a = t.landing === "entity" ? Rn(e, t) : null;
  return {
    entity: a?.key ?? null,
    view: Re(a?.key ?? null, t),
    sort: _e(a, t.sort).key,
    dir: t.dir === "asc" ? "asc" : "desc",
    expr: "",
    page: 1
  };
}
const Ut = ["entity", "sort", "dir", "expr"];
function $t(e) {
  return Ut.some((t) => t in e);
}
const he = "—";
function de(e, t) {
  return e.find((n) => n.role === t);
}
function Hn(e, t) {
  return e.filter((n) => n.role === t);
}
function Ya(e, t) {
  const n = (t ? t.columns : e?.columns) ?? [], a = t ? "scoped" : "everything";
  return n.filter(
    (s) => s.role !== "tint" && ((s.when ?? "always") === "always" || s.when === a)
  );
}
const Xa = ["id", "entityKey", "entityLabel"];
function ue(e, t) {
  if (e.value) return e.value(t);
  const n = e.field ?? e.key;
  if (n !== void 0) {
    if (t.fields && n in t.fields) return t.fields[n];
    if (Xa.includes(n))
      return t[n];
  }
}
function vn(e, t) {
  const n = e.key ?? e.field ?? e.label;
  return n?.trim() ? n.trim() : `column-${t}`;
}
function Ja(e, t) {
  return e.id?.trim() ? e.id : `${e.entityKey || "row"}-${t}`;
}
function Za(e, t) {
  if (e == null || e === "") return he;
  if (t === "number") {
    const n = typeof e == "number" ? e : Number(e);
    return Number.isFinite(n) ? Ba(n) : String(e);
  }
  return t === "date" ? Ha(String(e)) : Array.isArray(e) ? e.length ? e.join(", ") : he : String(e);
}
function Ee(e, t) {
  const n = ue(e, t);
  return e.format ? e.format(n, t) : Za(n, e.kind);
}
function es(e) {
  return typeof e == "number" ? Number.isFinite(e) ? String(e) : "" : typeof e == "string" ? e : Array.isArray(e) ? e.join(", ") : "";
}
function Fn(e, t) {
  const n = Ee(e, t), a = es(ue(e, t));
  return a && a !== n ? a : n;
}
function Ge(e, t) {
  return e ? Ee(e, t) : "";
}
function pn(e) {
  return e.align ? e.align : e.kind === "number" || e.kind === "ordinal" ? "right" : "left";
}
const ts = {
  ordinal: "dc-table__num",
  number: "dc-table__number",
  date: "dc-table__date",
  status: "dc-table__state"
};
function hn(e) {
  return [ts[e.kind ?? "text"], e.class].filter(Boolean).join(" ");
}
function At(e) {
  if (e.truncate !== void 0) return e.truncate;
  const t = e.kind ?? "text";
  return t === "text" || t === "number" || t === "date";
}
const ns = /^([A-Za-z_][\w.-]*)\s*(>=|<=|:|=|>|<)\s*(.*)$/, mn = "-?(?:\\d+\\.?\\d*|\\.\\d+)", as = new RegExp(`^(${mn})?\\.\\.(${mn})?$`);
function ut(e) {
  const t = as.exec(e.trim());
  if (!t || t[1] === void 0 && t[2] === void 0) return null;
  const n = t[1] === void 0 ? null : Number(t[1]), a = t[2] === void 0 ? null : Number(t[2]);
  return n !== null && a !== null && n > a ? { min: a, max: n } : { min: n, max: a };
}
function ss(e) {
  return `${e.min ?? ""}..${e.max ?? ""}`;
}
function Be(e) {
  return e.kind === "field" && (e.comparator === ":" || e.comparator === "=") && ut(e.value) !== null;
}
function os(e) {
  const t = [];
  let n = "", a = null;
  const s = () => {
    n && t.push(n), n = "";
  };
  for (let o = 0; o < e.length; o++) {
    const l = e[o];
    if (a) {
      l === a ? a = null : n += l;
      continue;
    }
    if (l === '"' || l === "'") {
      a = l;
      continue;
    }
    if (/\s/.test(l)) {
      if (/(?:>=|<=|[:=><])$/.test(n) || e.slice(o + 1).match(/^\s*(>=|<=|[:=><])/) && n) continue;
      s();
      continue;
    }
    n += l;
  }
  return s(), t;
}
function le(e) {
  const t = e.trim();
  if (!t) return [];
  const n = [];
  let a = [];
  for (const s of os(t)) {
    const o = s.toUpperCase();
    if (o === "AND" || o === "&&") continue;
    if (o === "OR" || o === "||") {
      a.length && n.push(a), a = [];
      continue;
    }
    const l = s.length > 1 && s.startsWith("-"), i = l ? s.slice(1) : s, r = l ? { negated: !0 } : {}, c = ns.exec(i);
    c && c[3] !== "" ? a.push({
      kind: "field",
      field: c[1].toLowerCase(),
      comparator: c[2],
      value: c[3],
      ...r
    }) : a.push({ kind: "text", value: i, ...r });
  }
  return a.length && n.push(a), n;
}
const ge = (e) => e.toLowerCase().replace(/\s+/g, ""), qn = [
  ["status", "state"],
  ["state", "state"],
  ["updated", "updated"],
  ["date", "updated"],
  ["name", "identity"],
  ["ref", "reference"]
];
function ls(e, t, n) {
  const a = ge(e), s = n.columns ?? [];
  if (a === "entity") return t.entityKey;
  if (e in t.fields) return t.fields[e];
  const o = s.find(
    (c) => c.key?.toLowerCase() === e.toLowerCase() || c.field?.toLowerCase() === e.toLowerCase() || c.label !== void 0 && ge(c.label) === a
  );
  if (o) return ue(o, t);
  const l = n.facets.find(
    (c) => c.key.toLowerCase() === a || ge(c.label) === a
  );
  if (l && l.key in t.fields) return t.fields[l.key];
  const i = qn.find(([c]) => c === a)?.[1];
  if (i) {
    const c = de(s, i);
    if (c) return ue(c, t);
  }
  const r = /^metric(\d+)$/.exec(a);
  if (r) {
    const c = Hn(s, "metric")[Number(r[1]) - 1];
    if (c) return ue(c, t);
  }
}
function De(e) {
  return (e.toLowerCase().match(/[\p{L}\p{N}]+/gu) ?? []).map((t) => t.charAt(0)).join("");
}
const yn = /^[a-z_][\w.-]*$/;
function dt(e) {
  const t = (e.key ?? e.field)?.toLowerCase();
  if (t !== void 0) return yn.test(t) ? t : void 0;
  const n = e.label === void 0 ? void 0 : ge(e.label);
  return n !== void 0 && yn.test(n) ? n : void 0;
}
function Qt(e, t) {
  const n = ge(e);
  return !!t?.entities.some((a) => a.scope && ge(a.scope) === n);
}
function rs(e, t, n) {
  const a = ge(e);
  if (a === "entity" || qn.some(([o]) => o === a) || /^metric\d+$/.test(a) || Qt(e, n)) return !0;
  const s = (o) => o !== void 0 && ge(o) === a;
  return (t.columns ?? []).some(
    (o) => s(o.key) || s(o.field) || s(o.label)
  ) || t.facets.some((o) => s(o.key) || s(o.label));
}
function He(e, t, n) {
  return t ? Dn(e, (a) => {
    const s = Kn(a, t, n);
    return s && dt(s);
  }) : e;
}
function Vn(e, t, n) {
  return t ? Dn(e, (a) => {
    if (Qt(a, n)) return;
    const s = (t.columns ?? []).find((o) => dt(o) === a);
    return s && Wn(s, t, n);
  }) : e;
}
function is(e, t, n) {
  if (!t || Qt(e, n)) return;
  const a = t.facets.find((s) => s.key.toLowerCase() === e);
  return a ? a.label : (t.columns ?? []).find((s) => dt(s) === e)?.label;
}
function Dn(e, t) {
  let n = !1;
  const a = le(e).map(
    (s) => s.map((o) => {
      if (o.kind !== "field") return o;
      const l = t(o.field);
      return !l || l === o.field ? o : (n = !0, { ...o, field: l });
    })
  );
  return n ? ve(a) : e;
}
function Kn(e, t, n) {
  if (!(!e || rs(e, t, n)))
    return (t.columns ?? []).find(
      (a) => a.label !== void 0 && De(a.label) === e
    );
}
function Wn(e, t, n) {
  if (!t || e.label === void 0 || !dt(e)) return;
  const a = De(e.label);
  return Kn(a, t, n) === e ? a : void 0;
}
function xt(e, t) {
  const n = e.toLowerCase(), a = t.toLowerCase();
  if (!a.includes("*")) return n.includes(a);
  const s = a.replace(/[.+?^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*");
  return new RegExp(s).test(n);
}
function _n(e, t) {
  return e.toLowerCase() === t.toLowerCase();
}
function cs(e, t, n, a) {
  if (e.kind === "text") {
    const r = n.columns ?? [];
    return ["identity", "reference"].some((c) => {
      const d = de(r, c), m = d ? ue(d, t) : void 0;
      return typeof m == "string" && xt(m, e.value);
    });
  }
  const s = ls(e.field, t, n);
  if (s === void 0) return a?.has(e.field) ? !1 : null;
  const o = Be(e) ? ut(e.value) : null;
  if (o) {
    if (Array.isArray(s) || typeof s == "boolean") return null;
    const r = typeof s == "number" ? s : Number(s);
    return Number.isFinite(r) ? (o.min === null || r >= o.min) && (o.max === null || r <= o.max) : null;
  }
  if (Array.isArray(s))
    return e.comparator === ":" || e.comparator === "=" ? s.some(
      (c) => e.comparator === "=" ? _n(String(c), e.value) : xt(String(c), e.value)
    ) : null;
  if (e.comparator === ":" || e.comparator === "=") {
    if (typeof s == "boolean") {
      const r = e.value.toLowerCase();
      return r === "true" || r === "yes" ? s : r === "false" || r === "no" ? !s : null;
    }
    if (typeof s == "number") {
      const r = Number(e.value);
      return Number.isFinite(r) ? s === r : null;
    }
    return e.comparator === "=" ? _n(String(s), e.value) : xt(String(s), e.value);
  }
  const l = Number(e.value), i = typeof s == "number" ? s : Number(s);
  return !Number.isFinite(l) || !Number.isFinite(i) ? null : us(e.comparator, i, l);
}
function gn(e, t, n, a) {
  const s = cs(e, t, n, a);
  return s === null ? !0 : e.negated ? !s : s;
}
function us(e, t, n) {
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
function wn(e) {
  return e.kind === "field" && !e.negated && (e.comparator === ":" || e.comparator === "=") && !Be(e);
}
const kn = /* @__PURE__ */ new WeakMap();
function ds(e) {
  if (!e?.strictScopes) return null;
  let t = kn.get(e);
  return t || (t = new Set(
    e.entities.flatMap((n) => n.scope ? [n.scope.toLowerCase()] : [])
  ), kn.set(e, t)), t;
}
function fs(e, t, n, a) {
  if (!e.length) return !0;
  const s = ds(a);
  return e.some((o) => {
    const l = /* @__PURE__ */ new Map();
    for (const i of o)
      wn(i) && l.set(
        i.field,
        (l.get(i.field) ?? !1) || gn(i, t, n, s)
      );
    return o.every(
      (i) => wn(i) ? l.get(i.field) === !0 : gn(i, t, n, s)
    );
  });
}
function bn(e) {
  return /[\s"']/.test(e) ? `"${e.replace(/["']/g, "")}"` : e;
}
function be(e) {
  const t = e.negated ? "-" : "";
  return e.kind === "text" ? t + bn(e.value) : `${t}${e.field}${e.comparator}${bn(e.value)}`;
}
function vs(e) {
  if (!e.negated) return { ...e, negated: !0 };
  const { negated: t, ...n } = e;
  return n;
}
function ve(e) {
  return e.filter((t) => t.length).map((t) => t.map(be).join(" ")).join(" OR ");
}
function ps(e, t, n) {
  return e.map((a, s) => s === t ? a.filter((o, l) => l !== n) : a).filter((a) => a.length);
}
function hc(e) {
  const t = le(e);
  if (t.length > 1) return { parts: [], text: e.trim() };
  const n = t[0] ?? [];
  return {
    parts: n.filter((a) => a.kind === "field"),
    text: n.filter((a) => a.kind === "text").map(be).join(" ")
  };
}
function mc(e, t) {
  return [...e.map(be), t.trim()].filter(Boolean).join(" ");
}
const $n = (e, t) => e.toLowerCase() === t.toLowerCase();
function Nt(e, t) {
  return !!e.negated == !!t.negated && zn(e, t);
}
function hs(e, t) {
  return !!e.negated != !!t.negated && zn(e, t);
}
function zn(e, t) {
  return e.kind === "field" ? t.kind === "field" && e.field === t.field && e.comparator === t.comparator && $n(e.value, t.value) : t.kind === "text" && $n(e.value, t.value);
}
function ms(e, t) {
  return t.filter((n) => !e.some((a) => Nt(a, n)));
}
function Gt(e, t) {
  return jn(e, t, (n) => n);
}
function Rt(e, t) {
  return jn(
    e,
    t,
    (n, a) => n.filter((s) => !a.some((o) => hs(s, o)))
  );
}
const ys = /^[A-Za-z_][\w.-]*\s*(?:>=|<=|:|=|>|<)$/;
function _s(e) {
  return ve(
    le(e).map(
      (t) => t.filter(
        (n) => n.kind !== "text" || n.value !== "-" && !ys.test(n.value)
      )
    ).filter((t) => t.length > 0)
  );
}
function jn(e, t, n) {
  const a = le(e), s = le(t);
  return a.length ? s.length ? ve(
    a.flatMap(
      (o) => s.map((l) => [...n(o, l), ...ms(o, l)])
    )
  ) : ve(a) : ve(s);
}
const Un = (e) => e.kind === "date" || e.role === "updated";
function gs(e) {
  if (!e) return () => 0;
  const n = (e.kind ?? "text") === "number" || e.role === "metric", a = Un(e);
  return (s, o) => {
    const l = ue(e, s), i = ue(e, o);
    return n ? Number(i ?? 0) - Number(l ?? 0) : a ? Date.parse(String(i ?? "")) - Date.parse(String(l ?? "")) : String(i ?? "").localeCompare(String(l ?? ""));
  };
}
function xn(e, t) {
  return !t || !Un(t) ? !1 : !Number.isFinite(Date.parse(String(ue(t, e) ?? "")));
}
function Qn({ query: e, schema: t, entity: n, limit: a, offset: s }, o, l) {
  const i = le(e.expr), r = n ? [n] : t.entities;
  let c = 0;
  const d = [];
  for (const w of r)
    for (const L of o(w))
      c += 1, fs(i, L, w, t) && d.push(L);
  const m = _e(n, e.sort, t), b = In(n, t).find((w) => w.sort === m.key), x = l.undatedLast ? d.filter((w) => !xn(w, b)) : d, k = l.undatedLast ? d.filter((w) => xn(w, b)) : [];
  x.sort(gs(b)), e.dir === "asc" && x.reverse();
  const p = k.length ? [...x, ...k] : x;
  return {
    // One page out of the middle. `total` stays the whole match, which is what
    // the shell counts pages with.
    rows: l.zeroIsAll && a <= 0 ? p.slice(s) : p.slice(s, s + a),
    total: d.length,
    unfiltered: d.length === c
  };
}
const Ze = [
  "oklch(0.36 0.06 240)",
  "oklch(0.34 0.07 290)",
  "oklch(0.36 0.06 160)",
  "oklch(0.38 0.06 80)",
  "oklch(0.35 0.07 30)",
  "oklch(0.34 0.05 200)"
];
function yc(e) {
  return Ze[Ae(e) % Ze.length];
}
function Gn(e, t) {
  return `${e}_${1e4 + t * 7}`;
}
const ws = 7, ks = 3;
function bs(e, t, n, a) {
  const s = (t * ws + Ae(n)) % a, o = [];
  for (let l = 0; l < Math.min(ks, a); l++)
    o.push(Gn(e, (s + l) % a));
  return o;
}
function $s(e, t) {
  switch (e.kind) {
    case "chips":
      return e.multiple ? xs(e.options, t) : e.options[t % e.options.length] ?? "";
    case "range": {
      const n = Math.max(0, e.max - e.min);
      return e.min + (n === 0 ? 0 : t % (n + 1));
    }
    case "toggle":
      return t % 3 === 0;
  }
}
function xs(e, t) {
  if (!e.length) return [];
  const n = 1 + (t >> 5) % Math.min(3, e.length), a = t % e.length, s = /* @__PURE__ */ new Set();
  for (let o = 0; o < n; o++) s.add((a + o) % e.length);
  return [...s].sort((o, l) => o - l).map((o) => e[o]);
}
function Ss(e, t) {
  const { hash: n, sample: a, revision: s, updatedAt: o } = t, l = s ? ` · rev ${s + 1}` : "";
  switch (e.role) {
    case "identity":
      return `${a[0]}${l}`;
    case "reference":
      return s ? `${a[1]}-${s + 1}` : a[1];
    case "state":
      return Oe[n % Oe.length];
    case "updated":
      return o;
    case "tint":
      return Ze[n % Ze.length];
    case "metric":
      return 1 + n % 940;
  }
  switch (e.kind) {
    case "number":
      return 1 + n % 940;
    case "status":
      return Oe[n % Oe.length];
    case "date":
      return o;
    default:
      return;
  }
}
function Cs(e, t = {}) {
  const n = t.population ?? 48, a = t.seed ?? "", s = t.now ?? /* @__PURE__ */ new Date("2026-08-25T00:00:00Z"), o = e.samples, l = t.scopes ?? [];
  if (!o.length) return [];
  const i = [];
  for (let r = 0; r < n; r++) {
    const c = o[r % o.length], d = Math.floor(r / o.length), m = Ae(`${a}:${e.key}:${c[0]}:${r}`), b = Gn(e.key, r), x = new Date(s.getTime() - m % 900 * 36e5).toISOString(), k = {};
    for (const p of e.columns ?? []) {
      const w = p.field ?? p.key;
      if (!w || p.value) continue;
      const L = Ss(p, {
        hash: Ae(`${m}:${w}`),
        sample: c,
        revision: d,
        updatedAt: x
      });
      L !== void 0 && (k[w] = L);
    }
    for (const p of e.facets)
      k[p.key] = $s(p, Ae(`${m}:${p.key}`));
    for (const [p, w] of l)
      k[p] = w === e.key ? b : bs(w, r, p, n);
    i.push({ id: b, entityKey: e.key, entityLabel: e.label, fields: k });
  }
  return i;
}
function Ps(e = {}) {
  const t = /* @__PURE__ */ new Map(), n = (a, s) => {
    const o = t.get(a.key);
    if (o) return o;
    const l = e.scopes ?? s.entities.flatMap(
      (r) => r.scope ? [[r.scope, r.key]] : []
    ), i = Cs(a, { ...e, scopes: l });
    return t.set(a.key, i), i;
  };
  return {
    query(a) {
      return Qn(a, (s) => n(s, a.schema), {
        undatedLast: !1,
        zeroIsAll: !1
      });
    }
  };
}
const Le = "e", ft = "v", Yt = "s", Xt = "d", $e = "q", vt = "p", Yn = "*", Es = [
  Le,
  ft,
  Yt,
  Xt,
  $e,
  vt
], Ls = [
  [/%3D/g, "="],
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
function et(e) {
  let t = encodeURIComponent(e);
  for (const [n, a] of Ls) t = t.replace(n, a);
  return t;
}
function fe(e) {
  try {
    return decodeURIComponent(e.replace(/\+/g, " "));
  } catch {
    return e.replace(/\+/g, " ");
  }
}
function Jt(e) {
  const t = e.replace(/^[?]/, "");
  if (!t) return [];
  const n = [];
  for (const a of t.split("&")) {
    if (!a) continue;
    const s = a.indexOf("="), o = s === -1 ? a : a.slice(0, s), l = s === -1 ? "" : a.slice(s + 1);
    n.push([fe(o), l]);
  }
  return n;
}
function Ts(e) {
  return Es.includes(e);
}
function pt(e, t) {
  if (!(!t || e.some((n) => n.key === t)))
    return e.find((n) => De(n.label) === t);
}
function Ms(e, t) {
  const n = De(e.label);
  return pt(t.entities, n)?.key === e.key ? n : e.key;
}
function Xn(e, t) {
  return t ? Ie(e, t) ?? pt(e.entities, t) ?? null : null;
}
function Os(e, t) {
  const n = De(e.label);
  return pt(t, n)?.key === e.key ? n : e.key;
}
function As(e, t) {
  return t.some((n) => n.key === e) ? e : pt(t, e)?.key ?? e;
}
function Ns(e, t, n = {}) {
  const a = Je(t, n), s = new Map(Jt(e)), o = s.get(Le), l = o === void 0 ? a.entity : fe(o), i = l === Yn ? null : Xn(t, l), r = s.get(ft), c = r && Nn(fe(r)) ? fe(r) : Re(i?.key ?? null, n), d = s.get(Yt), m = _e(
    i,
    d ? As(fe(d), ct(i, t)) : n.sort,
    t
  ), b = s.get(Xt), x = b ? fe(b) === "asc" ? "asc" : "desc" : a.dir, k = s.get($e), p = s.get(vt), w = p === void 0 ? 1 : Number(fe(p)), L = Number.isFinite(w) ? Math.max(1, Math.floor(w)) : 1;
  return {
    entity: i?.key ?? null,
    view: c,
    sort: m.key,
    dir: x,
    expr: k === void 0 ? "" : He(fe(k), i, t),
    page: L
  };
}
function Sn(e, t, n = {}, a = "") {
  const s = Je(t, n), o = Ie(t, e.entity), l = Jt(a).filter(([m]) => !Ts(m)), i = [], r = (m, b) => i.push([m, et(b)]), c = o?.key ?? null;
  if (c !== s.entity && r(Le, o ? Ms(o, t) : Yn), e.view !== Re(c, n) && r(ft, e.view), e.sort !== s.sort) {
    const m = ct(o, t), b = m.find((x) => x.key === e.sort);
    r(Yt, b ? Os(b, m) : e.sort);
  }
  e.dir !== s.dir && r(Xt, e.dir), e.expr.trim() !== "" && r($e, Vn(e.expr, o, t)), e.page > 1 && r(vt, String(e.page));
  const d = [
    ...l.map(([m, b]) => [et(m), b]),
    ...i
  ];
  return d.length ? `?${d.map(([m, b]) => b === "" ? m : `${m}=${b}`).join("&")}` : "";
}
function _c(e) {
  const t = [];
  for (const [n, a] of Object.entries(e))
    for (const s of Array.isArray(a) ? a : [a]) {
      if (typeof s != "string") continue;
      const o = et(n);
      t.push(s === "" ? o : `${o}=${et(s)}`);
    }
  return t.length ? `?${t.join("&")}` : "";
}
function gc(e, t) {
  const n = new Map(Jt(e)), a = n.get($e), s = a === void 0 ? "" : fe(a);
  if (!t) return s;
  const o = n.get(Le);
  return He(
    s,
    o === void 0 ? null : Xn(t, fe(o)),
    t
  );
}
function ht(e, t) {
  return Jn(e, t.id);
}
function Jn(e, t) {
  const n = e?.scope;
  return n ? Zn(n, t) : null;
}
function Zn(e, t) {
  return `${e}="${t.replace(/"/g, "")}"`;
}
function wc(e, t) {
  const n = typeof e == "string" ? e : e?.scope;
  if (!n) return null;
  const a = t.filter((s) => s.replace(/"/g, "") !== "").map((s) => Zn(n, s));
  return a.length ? a.join(" ") : null;
}
function mt(e, t) {
  if (e.kind !== "field" || t.kind !== "field") return Nt(e, t);
  const n = (a) => a.comparator === ":" || a.comparator === "=";
  return Nt(e, { ...t, comparator: n(e) && n(t) ? e.comparator : t.comparator });
}
function tt(e, t) {
  return mt(e, vs(t));
}
function nt(e, t) {
  return ht(
    e.entities.find((n) => n.key === t.entityKey),
    t
  );
}
function Ke(e, t) {
  if (!t) return e;
  const n = e.trim();
  if (!n) return t;
  const [a] = le(t).flat();
  if (!a) return n;
  const s = le(n);
  return s.some((i) => i.some((r) => mt(r, a))) ? n : s.some((i) => i.some((r) => tt(r, a))) ? ve(
    s.map(
      (i) => i.map((r) => tt(r, a) ? a : r)
    )
  ) : `${n} ${t}`;
}
function ea(e) {
  if (!e) return null;
  const t = e.trim();
  return t ? t.startsWith("-") ? t.slice(1) : `-${t}` : null;
}
function Zt(e, t) {
  if (!t || !e.trim()) return null;
  const [n] = le(t).flat();
  if (!n) return null;
  const a = le(e).flat();
  return a.some((s) => mt(s, n)) ? n.negated ? "out" : "in" : a.some((s) => tt(s, n)) ? n.negated ? "in" : "out" : null;
}
function ta(e, t) {
  if (!t || !e.trim()) return e;
  const [n] = le(t).flat();
  if (!n) return e;
  const a = le(e), s = a.map(
    (o) => o.filter((l) => !mt(l, n) && !tt(l, n))
  );
  return s.every((o, l) => o.length === a[l]?.length) ? e : ve(s);
}
function It(e, t, n) {
  return t ? n === null ? ta(e, t) : Ke(e, n === "out" ? ea(t) : t) : e;
}
function na(e) {
  return e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0;
}
function yt(e) {
  return e.altKey ? { exclude: !0 } : {};
}
function St(e, t, n, a = {}) {
  const s = nt(e, n);
  return Ke(t.expr, a.exclude ? ea(s) : s);
}
function aa(e, t) {
  const n = e?.scope?.toLowerCase();
  if (!n || e?.keepsScope || !t.trim()) return t;
  const a = le(t), s = a.map(
    (o) => o.filter((l) => l.kind !== "field" || l.field !== n)
  );
  return s.every((o, l) => o.length === a[l]?.length) ? t : ve(s);
}
function sa(e, t) {
  const n = t.toLowerCase();
  return e.entities.find((a) => a.scope?.toLowerCase() === n) ?? null;
}
function oa(e, t, n) {
  if (!t || !n) return null;
  const a = sa(e, t);
  return a ? { entity: a, id: n } : null;
}
function Rs(e, t) {
  const n = [], a = /* @__PURE__ */ new Set();
  for (const s of t)
    for (const o of le(s).flat()) {
      if (o.kind !== "field" || o.negated) continue;
      const l = oa(e, o.field, o.value);
      if (!l) continue;
      const i = `${l.entity.key}:${l.id.toLowerCase()}`;
      a.has(i) || (a.add(i), n.push({ entityKey: l.entity.key, id: l.id }));
    }
  return n;
}
function kc(e, t, n = "cards") {
  return {
    // An expression with nothing in it is no parameter, as the shell writes it.
    [$e]: Ke(e, t) || void 0,
    [Le]: void 0,
    [ft]: n,
    [vt]: void 0
  };
}
const la = Symbol("dc.shellContext");
function Is(e) {
  const t = e.liveQuery ? e : Bs(e);
  return Dt(la, t), t;
}
function Bs(e) {
  const t = e.draft ?? N("");
  return {
    draft: t,
    liveQuery: e.query,
    drafting: f(() => !1),
    commitDraft() {
      const n = t.value.trim();
      n && (e.setExpression(
        Rt(e.query.value.expr, He(n, e.entity.value, e.schema.value))
      ), t.value = "");
    },
    abandonDraft() {
      t.value = "";
    },
    ...e
  };
}
function Z() {
  const e = Vt(la, null);
  if (!e)
    throw new Error(
      "[appfr] No shell context found. Render this component inside <DataShell>."
    );
  return e;
}
const at = Symbol("dc-shell-theme");
function Bt(e) {
  return {
    read: () => ({
      theme: ke(e.theme),
      accent: ke(e.accent),
      tokens: ke(e.tokens)
    })
  };
}
function Hs(e, t) {
  t ? t.provide(at, Bt(e)) : Dt(at, Bt(e));
}
function Fs(e) {
  const t = Tn();
  Dt(at, {
    ...Bt(e),
    element: () => t?.proxy?.$el ?? null
  });
}
function en(e) {
  const t = Tn(), n = Vt(at, null), a = me(null);
  function s() {
    const r = t?.proxy?.$el, d = (r instanceof Element ? r : r?.parentElement)?.closest(".dc-shell");
    if (!d) {
      a.value = null;
      return;
    }
    const m = {};
    for (const b of Array.from(d.style))
      b.startsWith("--") && (m[b] = d.style.getPropertyValue(b));
    a.value = { shell: d, theme: d.dataset.dcTheme, tokens: m };
  }
  const o = f(() => {
    const r = a.value;
    if (!n) return r;
    const c = n.element?.();
    return r && c && r.shell !== c && c.contains(r.shell) ? r : n.read();
  }), l = f(() => e.theme ?? o.value?.theme ?? "minimal"), i = f(() => {
    const r = o.value, c = {
      ...r?.tokens,
      ...r?.accent ? { "--dc-accent": r.accent } : {},
      ...e.tokens,
      ...e.accent ? { "--dc-accent": e.accent } : {}
    };
    return Object.keys(c).length ? c : void 0;
  });
  return { theme: l, style: i, adopt: s };
}
function ra(e) {
  return e.key.toLowerCase();
}
const qs = /* @__PURE__ */ new Set([">", ">=", "<", "<="]);
function ia(e, t) {
  if (e.kind !== "field" || e.negated || e.field !== ra(t)) return !1;
  const n = e.comparator === ":" || e.comparator === "=";
  switch (t.kind) {
    case "range":
      return Be(e) || qs.has(e.comparator);
    case "chips":
      return n && !Be(e) && ca(t.options, e.value) !== void 0;
    case "toggle":
      return n && Vs(e.value);
  }
}
function ca(e, t) {
  const n = t.toLowerCase();
  return e.find((a) => a.toLowerCase() === n);
}
function Vs(e) {
  const t = e.toLowerCase();
  return t === "true" || t === "yes";
}
function ua(e, t) {
  const n = (le(e)[0] ?? []).filter((a) => ia(a, t));
  switch (t.kind) {
    case "range": {
      let a = null, s = null;
      for (const o of n) {
        const l = ut(o.value), i = Number(o.value);
        l ? (l.min !== null && (a = l.min), l.max !== null && (s = l.max)) : Number.isFinite(i) && (o.comparator.startsWith(">") ? a = i : s = i);
      }
      return { kind: "range", min: a, max: s };
    }
    case "chips": {
      const a = new Set(n.map((s) => ca(t.options, s.value)));
      return { kind: "chips", selected: t.options.filter((s) => a.has(s)) };
    }
    case "toggle":
      return { kind: "toggle", on: n.length > 0 };
  }
}
function Ds(e, t) {
  const n = ra(e);
  switch (t.kind) {
    case "range":
      return t.min === null && t.max === null ? [] : [{ kind: "field", field: n, comparator: ":", value: ss(t) }];
    case "chips":
      return t.selected.map((a) => ({ kind: "field", field: n, comparator: "=", value: a }));
    case "toggle":
      return t.on ? [{ kind: "field", field: n, comparator: ":", value: "true" }] : [];
  }
}
function da(e, t, n) {
  const a = Ds(t, n), s = le(e), o = (s.length ? s : [[]]).map((l) => [
    ...l.filter((i) => !ia(i, t)),
    ...a
  ]);
  return ve(o);
}
function bc(e, t) {
  return da(e, t, Ua(t));
}
function Ks(e, t) {
  return (t?.facets ?? []).some((n) => Qa(ua(e, n)));
}
const st = "entity", Fe = "expr", Ws = { ">=": "≥", "<=": "≤", ">": ">", "<": "<" };
function zs(e, t, n) {
  if (e.kind !== "field") return be(e);
  const a = is(e.field, t, n);
  if (a === void 0) return be(e);
  const s = e.negated ? "-" : "", o = Be(e) ? ut(e.value) : null;
  if (o) {
    const i = o.min !== null && o.max !== null ? `${o.min} ≤ ${a} ≤ ${o.max}` : o.max !== null ? `${a} ≤ ${o.max}` : `${a} ≥ ${o.min}`;
    return s + i;
  }
  const l = Ws[e.comparator];
  return l ? `${s}${a} ${l} ${e.value}` : be({ ...e, field: a });
}
function tn(e, t, n = null) {
  const a = [];
  return t && a.push({
    id: st,
    label: `entity:${t.key}`,
    facetKey: st
  }), le(e.expr).forEach((s, o) => {
    s.forEach((l, i) => {
      a.push({
        id: `${Fe}:${o}:${i}`,
        label: zs(l, t, n),
        address: Vn(be(l), t, n),
        facetKey: Fe,
        group: o,
        index: i,
        ...l.kind === "field" ? { field: l.field, value: l.value } : {},
        ...l.negated ? { negated: !0 } : {}
      });
    });
  }), a;
}
function js(e, t, n = null) {
  if (jt(e)) {
    const o = _e(t, e.sort, n);
    return `everything · ${e.view} · ${o.label}`;
  }
  const a = tn(e, t).filter((o) => o.facetKey !== Fe).map((o) => o.label), s = e.expr.trim();
  return s && a.push(`"${s}"`), a.join(" · ");
}
function Us(e) {
  const { adapter: t } = e, n = f(() => ke(e.schema)), a = f(() => ke(e.defaults) ?? {}), s = f(() => Ns(t.search.value, n.value, a.value)), o = f(() => Ie(n.value, s.value.entity)), l = f(() => o.value ?? Rn(n.value, a.value)), i = f(() => ct(o.value, n.value)), r = f(() => _e(o.value, s.value.sort, n.value)), c = (g, v) => {
    const _ = Sn(g, n.value, a.value, t.search.value);
    return _ === t.search.value && !t.elsewhere?.value ? !1 : (v === "push" ? t.push(_) : t.replace(_), !0);
  }, d = () => ke(e.navigationMode) ?? "push", m = () => ke(e.facetNavigationMode) ?? "replace", b = (g, v) => {
    const _ = g.page ?? ($t(g) ? 1 : s.value.page);
    return c({ ...s.value, ...g, page: _ }, v);
  }, x = (g) => {
    const v = g.page ?? ($t(g) ? 1 : s.value.page);
    return k({ ...s.value, ...g, page: v });
  }, k = (g) => {
    const v = Sn(g, n.value, a.value, t.search.value);
    return t.href ? t.href(v) : `${t.path.value}${v}`;
  }, p = (g, v) => {
    const _ = o.value?.facets.find((I) => I.key === g);
    if (!_) return;
    const T = da(s.value.expr, _, v(ua(s.value.expr, _)));
    b({ expr: T }, m());
  }, w = (g) => {
    const v = g === null ? null : Ie(n.value, g);
    return (v?.key ?? null) === s.value.entity ? {} : {
      entity: v?.key ?? null,
      view: dn(s.value.view, s.value.entity, v?.key ?? null, a.value),
      sort: _e(v, s.value.sort, n.value).key
    };
  }, L = (g) => {
    const v = w(g);
    Object.keys(v).length && b(v, d());
  };
  return {
    query: s,
    entity: o,
    focus: l,
    sort: r,
    sorts: i,
    summary: f(() => js(s.value, o.value, n.value)),
    terms: f(() => tn(s.value, o.value, n.value)),
    isPristine: f(() => jt(s.value)),
    isEverything: f(() => s.value.entity === null),
    hasFacets: f(() => Ks(s.value.expr, o.value)),
    setEntity: L,
    entityHref: (g) => x(w(g)),
    clearEntity: () => L(null),
    setView(g) {
      b({ view: g }, d());
    },
    setSort(g) {
      b({ sort: _e(o.value, g, n.value).key }, d());
    },
    toggleDirection() {
      b({ dir: s.value.dir === "desc" ? "asc" : "desc" }, d());
    },
    setExpression(g) {
      return b({ expr: g }, d());
    },
    narrow(g, v, _) {
      return b({ expr: g, ...w(v), ..._ ? { view: _ } : {} }, d());
    },
    narrowHref(g, v, _) {
      return x({ expr: g, ...w(v), ..._ ? { view: _ } : {} });
    },
    setPage(g, v) {
      b({ page: Math.max(1, Math.floor(g)) }, v ?? d());
    },
    setFacet(g, v) {
      p(g, () => v);
    },
    toggleChip(g, v) {
      p(g, (_) => _.kind !== "chips" ? _ : { kind: "chips", selected: _.selected.includes(v) ? _.selected.filter((I) => I !== v) : [..._.selected, v] });
    },
    setRange(g, v, _) {
      p(g, (T) => T.kind === "range" ? { kind: "range", min: v, max: _ } : T);
    },
    toggleFlag(g) {
      p(
        g,
        (v) => v.kind === "toggle" ? { kind: "toggle", on: !v.on } : v
      );
    },
    removeTerm(g) {
      if (g.facetKey === st) {
        L(null);
        return;
      }
      if (g.facetKey === Fe) {
        const v = ps(le(s.value.expr), g.group ?? 0, g.index ?? 0);
        b({ expr: ve(v) }, d());
      }
    },
    clearFilters() {
      b({ ...w(null), expr: "" }, d());
    },
    clearHref: () => x({ ...w(null), expr: "" }),
    reset() {
      c(Je(n.value, a.value), d());
    },
    homeHref: () => k(Je(n.value, a.value)),
    hrefFor(g) {
      const v = { ...s.value, ...g };
      return "entity" in g && !("view" in g) && (v.view = dn(s.value.view, s.value.entity, v.entity, a.value)), v.page = g.page ?? ($t(g) ? 1 : s.value.page), k(v);
    }
  };
}
function Qs(e) {
  const t = me([]), n = N(0), a = N(!1), s = N(!1), o = me(null);
  let l = 0, i = null, r = null;
  const c = f(() => (e.query.value.page - 1) * e.limit.value), d = f(() => Ga(n.value, e.limit.value)), m = () => {
    const _ = e.query.value, T = e.within?.value.trim(), I = aa(e.entity.value, _.expr);
    return T ? { ..._, expr: Gt(T, I) } : I === _.expr ? _ : { ..._, expr: I };
  }, b = (_, T) => {
    t.value = _.rows, n.value = _.total, o.value = null, x(T);
  }, x = (_) => {
    i = { key: _, total: n.value }, s.value = !1;
  }, k = (_) => {
    o.value = _, t.value = [], n.value = 0, i = null, s.value = !1;
  }, p = (_, T, I, ae) => {
    let D = !0;
    const K = () => _ === l;
    let ee = 0, re = !1;
    const V = (R) => {
      ee = R, re = !0, ae === void 0 && (n.value = R);
    }, Y = () => {
      D && (D = !1, t.value = [], V(0)), o.value = null;
    };
    return {
      get open() {
        return K();
      },
      insert(R, E) {
        if (!K()) return;
        const F = Array.isArray(R) ? R : [R];
        if (!F.length) return;
        Y();
        const y = [...t.value];
        y.splice(E ?? y.length, 0, ...F), t.value = T > 0 ? y.slice(0, T) : y, V(ee + F.length);
      },
      set(R) {
        K() && (R.rows && (Y(), t.value = T > 0 ? R.rows.slice(0, T) : R.rows, V(R.rows.length)), R.total !== void 0 && V(R.total));
      },
      close() {
        K() && (a.value = !1, re && (n.value = ee), x(I));
      },
      fail(R) {
        K() && (k(R), a.value = !1);
      }
    };
  }, w = () => {
    const _ = r;
    r = null, _?.();
  }, L = () => {
    const _ = ++l;
    w();
    const T = g.value, I = i?.key === T ? i.total : void 0;
    s.value = I === void 0;
    const ae = {
      query: m(),
      schema: e.schema.value,
      entity: e.entity.value,
      limit: e.limit.value,
      offset: c.value
    }, D = e.source.value;
    if (D.stream) {
      a.value = !0;
      try {
        r = D.stream(ae, p(_, ae.limit, T, I)) ?? null;
      } catch (ee) {
        k(ee), a.value = !1;
      }
      return;
    }
    let K;
    try {
      K = D.query(ae);
    } catch (ee) {
      k(ee);
      return;
    }
    if (!(K instanceof Promise)) {
      b(K, T), a.value = !1;
      return;
    }
    a.value = !0, K.then((ee) => {
      _ === l && b(ee, T);
    }).catch((ee) => {
      _ === l && k(ee);
    }).finally(() => {
      _ === l && (a.value = !1);
    });
  }, g = f(() => {
    const _ = m();
    return `${e.entity.value?.key ?? e.schema.value.entities[0]?.key ?? ""}|${JSON.stringify(Ut.map((I) => _[I]))}`;
  }), v = f(() => `${g.value}|${e.query.value.page}`);
  return se([e.source, v, e.limit], L, {
    immediate: !0
  }), ot(() => {
    l++, w();
  }, !0), { rows: t, total: n, offset: c, pageCount: d, pending: a, counting: s, error: o, refresh: L };
}
const Gs = 150;
function Ys(e) {
  const t = e.delay ?? Gs, n = N(""), a = N("");
  let s = !1, o;
  const l = () => {
    clearTimeout(o), o = void 0;
  }, i = f(() => He(_s(a.value), e.entity.value, e.schema?.value)), r = f(() => i.value.trim() !== ""), c = f(
    () => JSON.stringify([i.value, ...Ut.map((x) => e.query.value[x])])
  ), d = me(null), m = f(() => {
    const x = e.query.value;
    if (!r.value) return x;
    const k = d.value?.of === c.value ? d.value.page : 1;
    return { ...x, expr: Rt(x.expr, i.value), page: k };
  });
  se(n, (x) => {
    if (l(), !x.trim()) {
      s || (a.value = "");
      return;
    }
    s = !1, o = setTimeout(() => {
      o = void 0, a.value = n.value;
    }, t);
  }), se(
    e.query,
    () => {
      s && (s = !1, a.value = "");
    },
    { flush: "sync" }
  );
  const b = (x) => {
    l(), s = !0, n.value = "", !x() && s && (s = !1, a.value = "");
  };
  return Mn() && ot(l), {
    text: n,
    live: m,
    drafting: r,
    setPage(x) {
      d.value = { of: c.value, page: Math.max(1, Math.floor(x)) };
    },
    commit() {
      const x = n.value.trim();
      if (!x) return;
      const k = Rt(
        e.query.value.expr,
        He(x, e.entity.value, e.schema?.value)
      );
      a.value = x, b(() => e.setExpression(k));
    },
    abandon() {
      l(), s = !1, n.value = "", a.value = "";
    },
    release: b
  };
}
const Xs = 25, fa = (e, t) => e.toLowerCase() === t.toLowerCase();
function Js(e, t) {
  return e.find((n) => fa(n.id, t));
}
function Zs(e) {
  const t = me(/* @__PURE__ */ new Map()), n = /* @__PURE__ */ new Set(), a = (i) => {
    if (i.facetKey !== Fe) return null;
    const r = oa(e.schema.value, i.field, i.value);
    return r ? { ...r, key: `${r.entity.key}:${r.id}` } : null;
  }, s = (i) => {
    const { entity: r, id: c } = i, d = e.query.value;
    return e.source.value.query({
      query: {
        ...d,
        entity: r.key,
        // The reference on its own. The rest of the query is about the rows on
        // screen, which are of another type entirely.
        expr: Jn(r, c) ?? "",
        sort: _e(r, d.sort, e.schema.value).key,
        page: 1
      },
      schema: e.schema.value,
      entity: r,
      limit: Xs,
      offset: 0
    });
  }, o = (i, r) => {
    const c = Ge(de(i.columns ?? [], "identity"), r);
    return c === he || fa(c, r.id) ? "" : c;
  }, l = () => {
    if (e.loading.value) return;
    const i = /* @__PURE__ */ new Map();
    for (const d of e.terms.value) {
      const m = a(d);
      m && !t.value.has(m.key) && !n.has(m.key) && i.set(m.key, m);
    }
    if (!i.size) return;
    const r = [...i.values()].map((d) => ({
      reference: d,
      outcome: s(d)
    })), c = (d) => {
      const m = new Map(t.value);
      d.forEach((b, x) => {
        const { reference: k } = r[x], p = Js(b.rows, k.id);
        m.set(k.key, p ? o(k.entity, p) : "");
      }), t.value = m;
    };
    if (r.every(({ outcome: d }) => !(d instanceof Promise))) {
      c(r.map(({ outcome: d }) => d));
      return;
    }
    for (const { reference: d } of r) n.add(d.key);
    Promise.all(r.map(({ outcome: d }) => Promise.resolve(d))).then(c).catch(() => {
    }).finally(() => {
      for (const { reference: d } of r) n.delete(d.key);
    });
  };
  return se([e.source, e.schema, e.terms, e.loading], () => {
    try {
      l();
    } catch {
    }
  }, { immediate: !0 }), {
    names: t,
    nameOf(i) {
      const r = a(i);
      return r && t.value.get(r.key) || null;
    }
  };
}
const eo = ["href"], to = /* @__PURE__ */ q({
  __name: "PressLink",
  props: {
    href: {}
  },
  emits: ["press"],
  setup(e, { emit: t }) {
    const n = e, a = t;
    function s(o) {
      if (n.href && na(o)) {
        o.stopPropagation();
        return;
      }
      o.preventDefault(), a("press", yt(o), o);
    }
    return (o, l) => e.href ? (u(), h("a", {
      key: 0,
      href: e.href,
      class: "dc-press",
      onClick: s
    }, [
      Q(o.$slots, "default", {}, void 0, !0)
    ], 8, eo)) : (u(), h("button", {
      key: 1,
      type: "button",
      class: "dc-press",
      onClick: s
    }, [
      Q(o.$slots, "default", {}, void 0, !0)
    ]));
  }
}), z = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [a, s] of t)
    n[a] = s;
  return n;
}, ne = /* @__PURE__ */ z(to, [["__scopeId", "data-v-a9383f64"]]), no = { class: "dc-header" }, ao = { class: "dc-header__main" }, so = {
  class: "dc-header__brand",
  "aria-hidden": "true"
}, oo = { class: "dc-header__sr" }, lo = {
  key: 2,
  class: "dc-header__within"
}, ro = ["title"], io = { class: "dc-header__query" }, co = ["data-dc-more", "title"], uo = { class: "dc-header__run" }, fo = {
  key: 0,
  class: "dc-header__or dc-mono",
  "aria-hidden": "true"
}, vo = ["title", "aria-label", "onClick"], po = ["placeholder", "onKeydown"], ho = {
  key: 0,
  class: "dc-header__actions"
}, mo = /* @__PURE__ */ q({
  __name: "ShellHeader",
  setup(e) {
    const t = lt(), n = Z(), a = f(() => n.schema.value), s = f(() => {
      const y = n.within.value.trim();
      return y ? tn({ ...n.query.value, expr: y }, null) : [];
    }), o = f(() => {
      const y = n.entity.value, O = y?.keepsScope ? void 0 : y?.scope?.toLowerCase();
      return n.terms.value.filter((H) => H.facetKey !== st).map((H, te, we) => {
        const Ce = we[te - 1];
        return {
          term: H,
          or: Ce?.group !== void 0 && H.group !== void 0 && H.group !== Ce.group,
          idle: !!O && H.field?.toLowerCase() === O
        };
      });
    }), l = Zs({
      source: n.source,
      schema: n.schema,
      query: n.query,
      loading: n.loading,
      // The scope's parts as well as the query's: it names a record more often
      // than a typed term does, being what a record's own page is built on.
      terms: f(() => [...s.value, ...n.terms.value])
    });
    function i(y) {
      const O = sa(a.value, y)?.scopeLabel ?? y;
      return O.charAt(0).toUpperCase() + O.slice(1);
    }
    function r(y) {
      return y.replace(/\s*\([^()]*\)\s*$/, "");
    }
    function c(y) {
      const O = l.nameOf(y);
      return O ? `${y.negated ? "-" : ""}${i(y.field)}: ${r(O)}` : y.label;
    }
    function d(y) {
      const O = c(y.term), H = y.idle ? `Not applied to ${n.entity.value?.label} — remove ${O}` : `Remove ${O}`, te = y.term.address;
      return te && te !== O ? `${H}
Written ${te} in the address and the search box` : H;
    }
    const m = N(null);
    function b(y) {
      m.value = y instanceof HTMLInputElement ? y : null;
    }
    function x() {
      n.abandonDraft(), m.value?.blur();
    }
    function k() {
      p.value = null, n.commitDraft();
    }
    const p = N(null), w = f(() => Math.min(p.value ?? 1 / 0, o.value.length)), L = f(() => [
      { key: "before", entries: o.value.slice(0, w.value) },
      { key: "after", entries: o.value.slice(w.value) }
    ]), g = f(() => w.value < o.value.length);
    se(o, (y) => {
      p.value !== null && p.value >= y.length && (p.value = null);
    });
    function v(y, O) {
      p.value = y >= o.value.length ? null : Math.max(0, y), rt(() => {
        const H = m.value;
        if (!H) return;
        const te = O === "start" ? 0 : H.value.length;
        H.setSelectionRange(te, te), H.scrollIntoView({ block: "nearest", inline: "nearest" }), E();
      });
    }
    function _(y) {
      const O = m.value;
      return !O || O.selectionStart !== O.selectionEnd ? !1 : O.selectionStart === (y === "start" ? 0 : O.value.length);
    }
    function T(y) {
      w.value === 0 || !_("start") || (y.preventDefault(), v(y.key === "Home" ? 0 : w.value - 1, "start"));
    }
    function I(y) {
      !g.value || !_("end") || (y.preventDefault(), v(y.key === "End" ? o.value.length : w.value + 1, "end"));
    }
    function ae(y) {
      w.value === 0 || !_("start") || (y.preventDefault(), ee(o.value[w.value - 1].term, !0));
    }
    function D(y) {
      !g.value || !_("end") || (y.preventDefault(), ee(o.value[w.value].term, !1));
    }
    function K(y) {
      y.isComposing || y.altKey || y.ctrlKey || y.metaKey || y.shiftKey || (y.key === "ArrowLeft" || y.key === "Home" ? T(y) : y.key === "ArrowRight" || y.key === "End" ? I(y) : y.key === "Backspace" ? ae(y) : y.key === "Delete" && D(y));
    }
    function ee(y, O) {
      O && p.value !== null && (p.value = Math.max(0, p.value - 1)), n.removeTerm(y);
    }
    function re(y) {
      y.target?.closest("button, input") || (y.preventDefault(), m.value?.focus(), v(o.value.length, "end"));
    }
    function V() {
      n.draft.value || (p.value = null);
    }
    const Y = N(null), R = N("");
    function E() {
      const y = Y.value;
      if (!y) {
        R.value = "";
        return;
      }
      const O = y.scrollLeft > 1, H = y.scrollWidth - y.clientWidth - y.scrollLeft > 1;
      R.value = O && H ? "both" : O ? "start" : H ? "end" : "";
    }
    let F = null;
    return se(
      Y,
      (y) => {
        F?.disconnect(), F = null, E(), !(!y || typeof ResizeObserver > "u") && (F = new ResizeObserver(E), F.observe(y));
      },
      { flush: "post" }
    ), se([o, w], E, { flush: "post" }), pe(() => F?.disconnect()), (y, O) => (u(), h("div", no, [
      S("div", ao, [
        a.value.label && t.brand ? (u(), A(ne, {
          key: 0,
          class: "dc-header__domain",
          "data-dc-brand": "",
          title: "Home",
          href: $(n).homeHref(),
          onPress: O[0] || (O[0] = (H) => $(n).reset())
        }, {
          default: G(() => [
            S("span", so, [
              Q(y.$slots, "brand", {
                label: a.value.label
              }, void 0, !0)
            ]),
            S("span", oo, P(a.value.label), 1)
          ]),
          _: 3
        }, 8, ["href"])) : a.value.label ? (u(), A(ne, {
          key: 1,
          class: "dc-header__domain",
          title: "Home",
          href: $(n).homeHref(),
          onPress: O[1] || (O[1] = (H) => $(n).reset())
        }, {
          default: G(() => [
            J(P(a.value.label), 1)
          ]),
          _: 1
        }, 8, ["href"])) : M("", !0),
        s.value.length ? (u(), h("span", lo, [
          O[4] || (O[4] = S("span", { class: "dc-header__sr" }, "Within", -1)),
          (u(!0), h(W, null, X(s.value, (H) => (u(), h("span", {
            key: `scope:${H.id}`,
            class: "dc-within dc-mono dc-truncate",
            title: c(H)
          }, P(c(H)), 9, ro))), 128))
        ])) : M("", !0),
        S("div", io, [
          S("div", {
            class: "dc-header__field",
            onMousedown: re
          }, [
            S("div", {
              ref_key: "termBar",
              ref: Y,
              class: "dc-header__terms",
              "data-dc-more": R.value,
              title: $(n).summary.value,
              onScroll: E
            }, [
              (u(!0), h(W, null, X(L.value, (H) => (u(), h(W, {
                key: H.key
              }, [
                S("span", uo, [
                  (u(!0), h(W, null, X(H.entries, (te) => (u(), h(W, {
                    key: te.term.id
                  }, [
                    te.or ? (u(), h("span", fo, "or")) : M("", !0),
                    S("button", {
                      type: "button",
                      class: ce(["dc-term dc-mono", { "dc-term--idle": te.idle }]),
                      title: d(te),
                      "aria-label": `Remove ${c(te.term)}`,
                      onMousedown: O[2] || (O[2] = Pe(() => {
                      }, ["prevent"])),
                      onClick: (we) => ee(te.term, H.key === "before")
                    }, P(c(te.term)), 43, vo)
                  ], 64))), 128))
                ]),
                H.key === "before" ? Et((u(), h("input", {
                  key: 0,
                  ref_for: !0,
                  ref: b,
                  "onUpdate:modelValue": O[3] || (O[3] = (te) => $(n).draft.value = te),
                  class: ce(["dc-header__search dc-mono", { "dc-header__search--between": g.value }]),
                  style: oe({ "--dc-typed": String(Math.max(1, $(n).draft.value.length)) }),
                  type: "text",
                  autocomplete: "off",
                  spellcheck: "false",
                  placeholder: g.value ? "" : "Search…",
                  "aria-label": "Search",
                  onKeydown: [
                    Ye(Pe(k, ["prevent"]), ["enter"]),
                    Ye(Pe(x, ["prevent"]), ["esc"]),
                    K
                  ],
                  onBlur: V
                }, null, 46, po)), [
                  [Pa, $(n).draft.value]
                ]) : M("", !0)
              ], 64))), 128))
            ], 40, co)
          ], 32)
        ])
      ]),
      t.actions ? (u(), h("div", ho, [
        Q(y.$slots, "actions", {}, void 0, !0)
      ])) : M("", !0)
    ]));
  }
}), va = /* @__PURE__ */ z(mo, [["__scopeId", "data-v-9fa2ca09"]]);
function yo(e) {
  const t = me(/* @__PURE__ */ new Map()), n = N(!0);
  let a = 0, s;
  const o = () => {
    a++, s?.abort(), s = void 0;
  }, l = () => {
    o();
    const i = a, { signal: r } = s = new AbortController(), c = e.query.value, d = e.schema.value, m = e.entities.value, b = e.within?.value.trim() ?? "";
    n.value = c.expr.trim() === "" && !b;
    const x = /* @__PURE__ */ new Map();
    let k = !0;
    for (const p of m) {
      const w = aa(p, c.expr), L = b ? Gt(b, w) : w;
      let g = !1;
      const v = (T) => {
        if (i !== a) return;
        if (k) {
          x.set(p.key, T);
          return;
        }
        const I = new Map(t.value);
        I.set(p.key, T), t.value = I;
      }, _ = e.source.value.query({
        query: { ...c, entity: p.key, expr: L, page: 1 },
        schema: d,
        entity: p,
        limit: 0,
        offset: 0,
        signal: r,
        progress: (T) => {
          g || v({ total: T, pending: !0, counted: !0 });
        }
      });
      _ instanceof Promise ? (x.has(p.key) || x.set(p.key, { total: 0, pending: !0, counted: !1 }), _.then((T) => {
        g = !0, v({ total: T.total, pending: !1, counted: !0 });
      })) : (g = !0, x.set(p.key, { total: _.total, pending: !1, counted: !0 }));
    }
    k = !1, t.value = x;
  };
  return Mn() && ot(o), { counts: t, pristine: n, refresh: l, cancel: o };
}
const _o = ["checked", "indeterminate"], pa = /* @__PURE__ */ q({
  __name: "PageTick",
  setup(e) {
    const t = Z(), n = f(() => t.rows.value.filter((o) => t.isSelected(o)).length), a = f(
      () => t.rows.value.length > 0 && n.value === t.rows.value.length
    ), s = f(() => n.value > 0 && !a.value);
    return (o, l) => (u(), h("input", {
      class: "dc-tick",
      type: "checkbox",
      checked: a.value,
      indeterminate: s.value,
      "aria-label": "Select every row on this page",
      title: "Select every row on this page",
      onChange: l[0] || (l[0] = (i) => $(t).selectPage(!a.value))
    }, null, 40, _o));
  }
}), go = { class: "dc-pick" }, wo = ["id"], ko = ["id", "aria-expanded", "aria-labelledby", "data-dc-value"], bo = { class: "dc-pick__label" }, $o = /* @__PURE__ */ q({
  __name: "PickControl",
  props: {
    modelValue: {},
    options: {},
    label: {},
    mono: { type: Boolean }
  },
  emits: ["update:modelValue", "open", "close"],
  setup(e, { emit: t }) {
    const n = e, a = t, s = Kt() ?? "dc-pick", o = N(null), l = N(null), i = N(null), r = N(!1), c = f(() => i.value !== null), d = N(null), m = f(
      () => n.options.find((_) => _.key === n.modelValue) ?? n.options[0]
    ), b = f(
      () => n.options.map((_) => ({
        id: _.key,
        label: _.label,
        checked: _.key === n.modelValue
      }))
    ), x = f(
      () => i.value ? { maxHeight: `${window.innerHeight - i.value.y - 8}px` } : void 0
    );
    function k(_) {
      const T = o.value?.getBoundingClientRect();
      T && (d.value = o.value?.closest(".dc-shell") ?? document.body, i.value = { x: T.left, y: T.bottom + 4, mirrorX: T.right }, r.value = _, a("open"));
    }
    function p(_) {
      i.value && a("close"), i.value = null, _ && o.value?.focus();
    }
    function w() {
      c.value ? p(!0) : k(!1);
    }
    function L(_) {
      _.key !== "ArrowDown" && _.key !== "ArrowUp" || c.value || (_.preventDefault(), k(!0));
    }
    function g(_) {
      const T = _.target;
      T && (o.value?.contains(T) || l.value?.root?.contains(T) || p(!1));
    }
    se(c, (_) => {
      _ ? window.addEventListener("pointerdown", g, !0) : window.removeEventListener("pointerdown", g, !0);
    }), pe(() => window.removeEventListener("pointerdown", g, !0));
    function v(_) {
      p(!0), !(_.id === void 0 || _.id === n.modelValue) && a("update:modelValue", _.id);
    }
    return (_, T) => (u(), h("span", go, [
      S("span", {
        id: `${$(s)}-name`,
        class: "dc-pick__name"
      }, P(e.label), 9, wo),
      S("button", {
        id: `${$(s)}-value`,
        ref_key: "trigger",
        ref: o,
        type: "button",
        class: ce(["dc-pick__button", { "dc-mono": e.mono }]),
        "aria-haspopup": "menu",
        "aria-expanded": c.value,
        "aria-labelledby": `${$(s)}-name ${$(s)}-value`,
        "data-dc-value": e.modelValue,
        onClick: w,
        onKeydown: L
      }, [
        S("span", bo, P(m.value?.label), 1)
      ], 42, ko),
      T[1] || (T[1] = S("svg", {
        class: "dc-pick__mark",
        viewBox: "0 0 16 16",
        "aria-hidden": "true"
      }, [
        S("path", { d: "M4 6l4 4 4-4" })
      ], -1)),
      i.value && d.value ? (u(), A(it, {
        key: 0,
        to: d.value
      }, [
        j($(Na), {
          ref_key: "menu",
          ref: l,
          class: "dc-pick__list",
          style: oe(x.value),
          items: b.value,
          at: i.value,
          label: e.label,
          autofocus: r.value,
          onChoose: v,
          onDismiss: T[0] || (T[0] = (I) => p(!0))
        }, null, 8, ["style", "items", "at", "label", "autofocus"])
      ], 8, ["to"])) : M("", !0)
    ]));
  }
}), Ct = /* @__PURE__ */ z($o, [["__scopeId", "data-v-9883dc22"]]), xo = {
  class: "dc-pager",
  "aria-label": "Pages"
}, So = ["title"], Co = ["value", "onKeydown"], Po = {
  class: "dc-pager__total",
  "aria-hidden": "true"
}, Eo = {
  class: "dc-pager__sr",
  "aria-live": "polite"
}, Lo = /* @__PURE__ */ q({
  __name: "ShellPager",
  props: {
    pagesNote: {}
  },
  setup(e) {
    const t = e, n = Z(), a = f(() => n.liveQuery.value.page), s = f(
      () => `${n.counting.value ? "~" : ""}${Te(n.pageCount.value)}`
    ), o = f(() => {
      let x = `Page ${Te(a.value)} of ${s.value}`;
      const k = n.rows.value.length;
      if (k) {
        const p = n.offset.value + 1, w = `${n.counting.value ? "~" : ""}${Te(n.total.value)}`;
        x += ` — rows ${Te(p)} to ${Te(p + k - 1)} of ${w}`;
      }
      return t.pagesNote ? `${x}
${t.pagesNote}` : x;
    }), l = N(null), i = f(() => l.value ?? String(a.value)), r = f(
      () => `calc(${Math.max(2, String(n.pageCount.value).length)}ch + 10px)`
    );
    function c(x) {
      x.target.select();
    }
    function d(x) {
      const k = x.target, p = k.value.replace(/[^0-9]/g, "");
      k.value !== p && (k.value = p), l.value = p;
    }
    function m(x) {
      const k = x.target, p = Number(l.value);
      l.value = null;
      const w = Number.isFinite(p) && p >= 1 ? Math.min(Math.trunc(p), Math.max(1, n.pageCount.value)) : a.value;
      k.value = String(w), w !== a.value && n.setPage(w);
    }
    function b(x) {
      const k = x.target;
      l.value = null, k.value = String(a.value), k.blur();
    }
    return (x, k) => (u(), h("nav", xo, [
      j(ne, {
        class: "dc-pager__step",
        "aria-label": "Previous page",
        href: a.value > 1 ? $(n).hrefFor({ page: a.value - 1 }) : null,
        disabled: a.value <= 1,
        onPress: k[0] || (k[0] = (p) => $(n).setPage(a.value - 1))
      }, {
        default: G(() => [...k[2] || (k[2] = [
          S("span", { "aria-hidden": "true" }, "‹", -1)
        ])]),
        _: 1
      }, 8, ["href", "disabled"]),
      S("span", {
        class: "dc-pager__page dc-mono",
        title: o.value
      }, [
        S("input", {
          class: "dc-pager__box dc-mono",
          type: "text",
          inputmode: "numeric",
          autocomplete: "off",
          "aria-label": "Page",
          style: oe({ width: r.value }),
          value: i.value,
          onFocus: c,
          onInput: d,
          onKeydown: [
            Ye(Pe(m, ["prevent"]), ["enter"]),
            Ye(Pe(b, ["prevent"]), ["esc"])
          ],
          onBlur: m
        }, null, 44, Co),
        S("span", Po, "/ " + P(s.value), 1)
      ], 8, So),
      S("span", Eo, P(o.value), 1),
      j(ne, {
        class: "dc-pager__step",
        "aria-label": "Next page",
        href: a.value < $(n).pageCount.value ? $(n).hrefFor({ page: a.value + 1 }) : null,
        disabled: a.value >= $(n).pageCount.value,
        onPress: k[1] || (k[1] = (p) => $(n).setPage(a.value + 1))
      }, {
        default: G(() => [...k[3] || (k[3] = [
          S("span", { "aria-hidden": "true" }, "›", -1)
        ])]),
        _: 1
      }, 8, ["href", "disabled"])
    ]));
  }
}), To = /* @__PURE__ */ z(Lo, [["__scopeId", "data-v-de0ab034"]]), Mo = {
  key: 2,
  class: "dc-actions__order"
}, Oo = {
  key: 3,
  class: "dc-actions__select"
}, Ao = {
  key: 0,
  class: "dc-actions__all"
}, No = {
  class: "dc-actions__count",
  "aria-live": "polite"
}, Ro = {
  key: 1,
  class: "dc-actions__count dc-actions__all",
  "aria-live": "polite"
}, Io = { class: "dc-actions__ops" }, Bo = ["disabled"], Ho = ["data-dc-operation", "disabled", "onClick"], Fo = ["disabled"], qo = "…", Vo = /* @__PURE__ */ q({
  __name: "RecordActions",
  props: {
    views: {},
    typeChooser: {},
    selectionPlacement: {},
    pagesNote: {}
  },
  setup(e) {
    const t = e, n = Z(), a = f(
      () => n.hasFacets.value || !!n.liveQuery.value.expr.trim() || !!n.within.value
    ), s = yo({
      source: n.source,
      schema: n.schema,
      // What each type holds of what is on screen, the draft's results included:
      // a count of the committed query would disagree with the rows under it.
      query: n.liveQuery,
      entities: n.entities,
      within: n.within
    });
    function o(V) {
      if (V.key === n.query.value.entity && a.value) return Xe(n.total.value);
      if (s.pristine.value) return Ot(V);
      const R = s.counts.value.get(V.key);
      return R ? R.counted ? `${R.pending ? "~" : ""}${Xe(R.total)}` : qo : Ot(V);
    }
    const l = f(() => [
      { key: "", label: "Everything" },
      ...n.entities.value.map((V) => ({
        key: V.key,
        label: `${V.label} · ${o(V)}`
      }))
    ]), i = f(
      () => t.typeChooser === "always" || n.query.value.entity !== null
    );
    function r(V) {
      n.setEntity(V || null);
    }
    const c = f(
      () => (t.views ?? [...Wt]).map((V) => ({
        key: V,
        label: V === "record" ? n.recordView.value?.label ?? fn.record : fn[V]
      }))
    ), d = f(() => zt(n.query.value.view, t.views)), m = f(() => c.value.length > 1);
    function b(V) {
      n.setView(V);
    }
    const x = f(
      () => v.value && d.value !== "table" && n.sorts.value.length > 0
    ), k = f(
      () => n.sorts.value.map((V) => ({ key: V.key, label: V.label }))
    ), p = f(() => x.value && k.value.length > 1), w = f(() => n.query.value.dir === "desc"), L = f(
      () => `Sorted by ${n.sort.value.label}, ${w.value ? "descending" : "ascending"}`
    ), g = f(() => n.entity.value), v = f(
      () => !Bn(n.query.value, t.views) && d.value !== "record"
    ), _ = f(
      () => v.value && !n.loading.value && (n.pageCount.value > 1 || !!t.pagesNote)
    ), T = f(() => n.selection.value.ids.length), I = f(
      () => v.value && n.selectable.value && (n.rows.value.length > 0 || T.value > 0)
    ), ae = f(() => d.value === "table"), D = f(
      () => i.value || m.value || x.value || _.value || v.value && (I.value || !!(g.value?.create || g.value?.duplicate || g.value?.delete || g.value?.operations?.length))
    ), K = f(() => T.value ? `${T.value} selected` : ae.value ? "" : "Select all"), ee = f(() => t.selectionPlacement === "end");
    function re(V) {
      return T.value ? V.endsWith("…") ? `${V.slice(0, -1)} ${T.value}…` : `${V} ${T.value}` : V;
    }
    return (V, Y) => D.value ? (u(), h("div", {
      key: 0,
      class: ce(["dc-actions", { "dc-actions--selection-end": ee.value }])
    }, [
      i.value ? (u(), A(Ct, {
        key: 0,
        class: "dc-actions__pick dc-actions__type",
        label: "Type",
        "model-value": $(n).query.value.entity ?? "",
        options: l.value,
        onOpen: $(s).refresh,
        onClose: $(s).cancel,
        "onUpdate:modelValue": r
      }, null, 8, ["model-value", "options", "onOpen", "onClose"])) : M("", !0),
      m.value ? (u(), A(Ct, {
        key: 1,
        class: "dc-actions__pick dc-actions__view",
        label: "View",
        "model-value": d.value,
        options: c.value,
        "onUpdate:modelValue": b
      }, null, 8, ["model-value", "options"])) : M("", !0),
      x.value ? (u(), h("span", Mo, [
        p.value ? (u(), A(Ct, {
          key: 0,
          class: "dc-actions__pick dc-actions__sort",
          label: "Sort",
          "model-value": $(n).sort.value.key,
          options: k.value,
          "onUpdate:modelValue": $(n).setSort
        }, null, 8, ["model-value", "options", "onUpdate:modelValue"])) : M("", !0),
        j(ne, {
          class: "dc-actions__dir",
          "aria-label": L.value,
          title: L.value,
          href: $(n).hrefFor({ dir: w.value ? "asc" : "desc" }),
          onPress: Y[0] || (Y[0] = (R) => $(n).toggleDirection())
        }, {
          default: G(() => [
            J(P(w.value ? "↓" : "↑"), 1)
          ]),
          _: 1
        }, 8, ["aria-label", "title", "href"])
      ])) : M("", !0),
      I.value && K.value ? (u(), h("div", Oo, [
        ae.value ? (u(), h("span", Ro, P(K.value), 1)) : (u(), h("label", Ao, [
          j(pa),
          S("span", No, P(K.value), 1)
        ])),
        T.value ? (u(), h("button", {
          key: 2,
          type: "button",
          class: ce(["dc-actions__clear", { "dc-actions__clear--op": ee.value }]),
          onClick: Y[1] || (Y[1] = (R) => $(n).clearSelection())
        }, " Clear ", 2)) : M("", !0)
      ])) : M("", !0),
      S("div", Io, [
        g.value?.create ? (u(), A(ne, {
          key: 0,
          class: "dc-actions__op dc-actions__new",
          href: $(n).createHref?.(g.value),
          onPress: Y[2] || (Y[2] = (R) => $(n).create(g.value))
        }, {
          default: G(() => [
            Y[5] || (Y[5] = S("span", {
              class: "dc-actions__plus",
              "aria-hidden": "true"
            }, "+", -1)),
            J(" " + P(g.value.create), 1)
          ]),
          _: 1
        }, 8, ["href"])) : M("", !0),
        g.value?.duplicate ? (u(), h("button", {
          key: 1,
          type: "button",
          class: "dc-actions__op",
          disabled: !T.value,
          onClick: Y[3] || (Y[3] = (R) => $(n).duplicate())
        }, P(re(g.value.duplicate)), 9, Bo)) : M("", !0),
        (u(!0), h(W, null, X(g.value?.operations ?? [], (R) => (u(), h("button", {
          key: R.key,
          type: "button",
          class: "dc-actions__op",
          "data-dc-operation": R.key,
          disabled: !T.value && R.selection !== !1,
          onClick: (E) => $(n).operate(R.key)
        }, P(R.selection === !1 ? R.label : re(R.label)), 9, Ho))), 128)),
        g.value?.delete ? (u(), h("button", {
          key: 2,
          type: "button",
          class: "dc-actions__op dc-actions__danger",
          disabled: !T.value,
          onClick: Y[4] || (Y[4] = (R) => $(n).delete())
        }, P(re(g.value.delete)), 9, Fo)) : M("", !0)
      ]),
      _.value ? (u(), A(To, {
        key: 4,
        class: "dc-actions__pages",
        "pages-note": e.pagesNote
      }, null, 8, ["pages-note"])) : M("", !0)
    ], 2)) : M("", !0);
  }
}), Ht = /* @__PURE__ */ z(Vo, [["__scopeId", "data-v-9ad7a44f"]]);
function Do(e, t) {
  if (!e) return null;
  const n = ue(e, t);
  return typeof n == "string" && n.trim() ? n : null;
}
const Ko = (e) => e == null || typeof e == "string" && !e.trim();
function Wo(e, t) {
  const n = de(t, "state"), a = de(t, "tint");
  return {
    identity: Ge(de(t, "identity"), e),
    reference: Ge(de(t, "reference"), e),
    metrics: Hn(t, "metric").map((s) => ({
      column: s,
      label: s.label ?? "",
      text: Ee(s, e)
    })),
    facts: t.filter((s) => s.cardLabel && !Ko(ue(s, e))).map((s) => ({
      column: s,
      label: s.cardLabel,
      title: [s.label, s.hint].filter(Boolean).join(" — "),
      text: Ee(s, e)
    })),
    state: n ? ue(n, e) ?? null : null,
    updated: Ge(de(t, "updated"), e),
    image: Do(de(t, "image"), e),
    tint: a ? ue(a, e) ?? null : null
  };
}
function ha(e, t, n, a, s = !1) {
  const o = n?.columns ?? [];
  return {
    row: e,
    key: Ja(e, t),
    entityLabel: e.entityLabel,
    entity: n,
    columns: o,
    ordinal: Fa(t),
    parts: Wo(e, o),
    pinned: a,
    selected: s
  };
}
function xe() {
  const e = Z(), t = f(
    () => new Map(e.entities.value.map((n) => [n.key, n]))
  );
  return f(
    () => e.rows.value.map(
      (n, a) => ha(
        n,
        e.offset.value + a,
        t.value.get(n.entityKey) ?? null,
        e.isPinned(n),
        e.isSelected(n)
      )
    )
  );
}
const zo = ["data-dc-status", "data-dc-tone"], jo = /* @__PURE__ */ q({
  __name: "StatusPill",
  props: {
    status: {},
    tone: {},
    label: {}
  },
  setup(e) {
    const t = e, n = f(() => t.label ?? t.status ?? "");
    return (a, s) => (u(), h("span", {
      class: "dc-pill",
      "data-dc-status": e.status,
      "data-dc-tone": e.tone
    }, P(n.value), 9, zo));
  }
}), We = /* @__PURE__ */ z(jo, [["__scopeId", "data-v-686eb9b6"]]), Uo = { key: 1 }, Qo = /* @__PURE__ */ q({
  __name: "MetricDrill",
  props: {
    entry: {},
    column: {}
  },
  setup(e) {
    const t = e, n = Z(), a = f(() => !t.entry.entity?.scope || !t.column.drill ? null : n.entities.value.find((c) => c.key === t.column.drill) ?? null), s = f(() => t.column.label ?? ""), o = f(() => Ee(t.column, t.entry.row)), l = f(() => a.value ? n.drillHref(t.entry.row, a.value) : null);
    function i(r, c) {
      c.stopPropagation(), a.value && n.drill(t.entry.row, a.value, r);
    }
    return (r, c) => a.value ? (u(), A(ne, {
      key: 0,
      class: "dc-drill",
      href: l.value,
      title: `${s.value} of ${e.entry.parts.identity} — show the ${a.value.label.toLowerCase()}`,
      onPress: i
    }, {
      default: G(() => [
        Q(r.$slots, "default", {}, () => [
          J(P(o.value), 1)
        ], !0)
      ]),
      _: 3
    }, 8, ["href", "title"])) : (u(), h("span", Uo, [
      Q(r.$slots, "default", {}, () => [
        J(P(o.value), 1)
      ], !0)
    ]));
  }
}), ze = /* @__PURE__ */ z(Qo, [["__scopeId", "data-v-d3e7f4e0"]]), Go = ["data-dc-active", "aria-pressed", "aria-label"], Yo = /* @__PURE__ */ q({
  __name: "PinStar",
  props: {
    row: {},
    pinned: { type: Boolean },
    name: {}
  },
  setup(e) {
    const t = e, n = Z();
    function a(s) {
      s.stopPropagation(), n.togglePin(t.row);
    }
    return (s, o) => (u(), h("button", {
      type: "button",
      class: "dc-star",
      "data-dc-active": e.pinned ? "true" : "false",
      "aria-pressed": e.pinned,
      "aria-label": e.pinned ? `Unpin ${e.name}` : `Pin ${e.name}`,
      onClick: a
    }, P(e.pinned ? "★" : "☆"), 9, Go));
  }
}), nn = /* @__PURE__ */ z(Yo, [["__scopeId", "data-v-ef63d763"]]), Xo = ["src"], Jo = /* @__PURE__ */ q({
  __name: "RowPicture",
  props: {
    src: {}
  },
  setup(e) {
    const t = e, n = N(!1);
    return se(
      () => t.src,
      () => {
        n.value = !1;
      }
    ), (a, s) => e.src.trim() && !n.value ? (u(), h("img", {
      key: 0,
      class: "dc-picture",
      src: e.src,
      alt: "",
      loading: "lazy",
      decoding: "async",
      onError: s[0] || (s[0] = (o) => n.value = !0)
    }, null, 40, Xo)) : M("", !0);
  }
}), _t = /* @__PURE__ */ z(Jo, [["__scopeId", "data-v-afaab300"]]), Zo = ["data-dc-standing", "title", "aria-label"], el = /* @__PURE__ */ q({
  __name: "QueryMark",
  props: {
    entry: {}
  },
  setup(e) {
    const t = e, n = Z(), a = f(() => ht(t.entry.entity, t.entry.row)), s = f(() => Zt(n.query.value.expr, a.value)), o = f(
      () => s.value === "in" ? `The query narrows to ${t.entry.parts.identity} — press to lift that` : `The query leaves out ${t.entry.parts.identity} — press to lift that`
    );
    function l(i) {
      i.stopPropagation(), n.setExpression(ta(n.query.value.expr, a.value));
    }
    return (i, r) => s.value ? (u(), h("button", {
      key: 0,
      type: "button",
      class: "dc-standing",
      "data-dc-standing": s.value,
      title: o.value,
      "aria-label": o.value,
      onClick: l
    }, P(s.value === "in" ? "+" : "−"), 9, Zo)) : M("", !0);
  }
}), an = /* @__PURE__ */ z(el, [["__scopeId", "data-v-4b8d4166"]]), tl = ["aria-label"], nl = ["data-dc-standing", "data-dc-active", "aria-checked", "title", "aria-label", "onClick"], al = /* @__PURE__ */ q({
  __name: "StandingControl",
  props: {
    standing: {},
    mixed: { type: Boolean },
    name: {}
  },
  emits: ["set"],
  setup(e, { emit: t }) {
    const n = e, a = t, s = f(() => [
      { standing: "in", sign: "+", hint: `Narrow the query to ${n.name}` },
      { standing: null, sign: "·", hint: `Let the query say nothing about ${n.name}` },
      { standing: "out", sign: "−", hint: `Leave ${n.name} out of the query` }
    ]), o = (i) => !n.mixed && n.standing === i;
    function l(i, r) {
      i.stopPropagation(), a("set", r);
    }
    return (i, r) => (u(), h("span", {
      class: "dc-standing-control",
      role: "radiogroup",
      "aria-label": `Where the query stands on ${e.name}`
    }, [
      (u(!0), h(W, null, X(s.value, (c) => (u(), h("button", {
        key: c.sign,
        type: "button",
        role: "radio",
        class: "dc-standing-control__choice",
        "data-dc-standing": c.standing ?? "none",
        "data-dc-active": o(c.standing) ? "true" : "false",
        "aria-checked": o(c.standing),
        title: c.hint,
        "aria-label": c.hint,
        onClick: (d) => l(d, c.standing)
      }, P(c.sign), 9, nl))), 128))
    ], 8, tl));
  }
}), Ft = /* @__PURE__ */ z(al, [["__scopeId", "data-v-5524dca6"]]), ma = /* @__PURE__ */ q({
  __name: "RowStanding",
  props: {
    entry: {}
  },
  setup(e) {
    const t = e, n = Z(), a = f(() => ht(t.entry.entity, t.entry.row)), s = f(() => Zt(n.query.value.expr, a.value));
    function o(l) {
      n.setExpression(It(n.query.value.expr, a.value, l));
    }
    return (l, i) => a.value !== null ? (u(), A(Ft, {
      key: 0,
      class: "dc-row-standing",
      standing: s.value,
      name: e.entry.parts.identity,
      onSet: o
    }, null, 8, ["standing", "name"])) : M("", !0);
  }
}), sl = ["href", "title", "aria-label"], ol = /* @__PURE__ */ q({
  __name: "OpenMark",
  props: {
    entry: {}
  },
  setup(e) {
    const t = e, n = Z(), a = f(() => {
      const s = t.entry.row, o = n.recordHref?.(s) ?? null;
      return o ? n.pressHref(s) === o ? null : o : null;
    });
    return (s, o) => a.value ? (u(), h("a", {
      key: 0,
      class: "dc-open",
      href: a.value,
      target: "_blank",
      rel: "noopener noreferrer",
      title: a.value,
      "aria-label": `Open ${e.entry.parts.identity} in a new tab`,
      onClick: o[0] || (o[0] = Pe(() => {
      }, ["stop"]))
    }, "↗", 8, sl)) : M("", !0);
  }
}), je = /* @__PURE__ */ z(ol, [["__scopeId", "data-v-b00f390d"]]), ll = /* @__PURE__ */ q({
  __name: "ScopeMark",
  props: {
    entry: {}
  },
  setup(e) {
    const t = e, n = Z(), a = f(
      () => n.narrowsOnPress.value ? null : t.entry.entity?.scope ?? null
    ), s = N(null);
    function o(d) {
      s.value = yt(d).exclude ? "out" : "in";
    }
    function l(d) {
      o(d), window.addEventListener("keydown", o), window.addEventListener("keyup", o);
    }
    function i() {
      s.value = null, window.removeEventListener("keydown", o), window.removeEventListener("keyup", o);
    }
    pe(i);
    const r = f(() => a.value ? n.drillHref(t.entry.row, null) : null);
    function c(d, m) {
      m.stopPropagation(), n.drill(t.entry.row, null, d);
    }
    return (d, m) => a.value ? (u(), A(ne, {
      key: 0,
      class: "dc-scope",
      href: r.value,
      "data-dc-pending": s.value ?? void 0,
      title: `Narrow everything to ${a.value}: ${e.entry.row.id} — ⌥-click to leave it out`,
      "aria-label": `Narrow everything to ${e.entry.parts.identity}`,
      onPointerenter: l,
      onPointermove: o,
      onPointerleave: i,
      onPress: c
    }, {
      default: G(() => [...m[0] || (m[0] = [
        J(" → ", -1)
      ])]),
      _: 1
    }, 8, ["href", "data-dc-pending", "title", "aria-label"])) : M("", !0);
  }
}), Ue = /* @__PURE__ */ z(ll, [["__scopeId", "data-v-05d2c233"]]), rl = ["checked", "aria-label"], Se = /* @__PURE__ */ q({
  __name: "SelectTick",
  props: {
    row: {},
    selected: { type: Boolean },
    name: {}
  },
  setup(e) {
    const t = e, n = Z();
    function a(s) {
      s.stopPropagation(), n.toggleSelect(t.row);
    }
    return (s, o) => (u(), h("input", {
      class: "dc-tick",
      type: "checkbox",
      checked: e.selected,
      "aria-label": `Select ${e.name}`,
      onClick: a
    }, null, 8, rl));
  }
}), il = { class: "dc-card__top dc-mono" }, cl = { class: "dc-card__lead" }, ul = {
  key: 2,
  class: "dc-card__entity"
}, dl = { class: "dc-card__top-right" }, fl = { class: "dc-card__names" }, vl = { class: "dc-card__primary" }, pl = {
  key: 0,
  class: "dc-card__secondary dc-mono"
}, hl = {
  key: 1,
  class: "dc-card__facts dc-mono"
}, ml = ["title"], yl = { class: "dc-card__fact-label" }, _l = {
  key: 0,
  class: "dc-card__metrics dc-mono"
}, gl = {
  key: 0,
  class: "dc-card__date"
}, wl = /* @__PURE__ */ q({
  __name: "CardsView",
  setup(e) {
    const t = Z(), n = xe(), a = f(() => t.isEverything.value), s = (l) => l.entity?.card === "picture", o = f(() => n.value.length > 0 && n.value.every(s));
    return (l, i) => (u(), h("div", {
      class: ce(["dc-cards", { "dc-cards--pictures": o.value }])
    }, [
      (u(!0), h(W, null, X($(n), (r) => (u(), h("div", {
        key: r.key,
        class: ce(["dc-card", { "dc-card--picture": s(r) }])
      }, [
        S("div", il, [
          S("span", cl, [
            $(t).selectable.value ? (u(), A(Se, {
              key: 0,
              row: r.row,
              selected: r.selected,
              name: r.parts.identity
            }, null, 8, ["row", "selected", "name"])) : M("", !0),
            s(r) ? M("", !0) : (u(), h(W, { key: 1 }, [
              J(P(r.ordinal), 1)
            ], 64)),
            a.value ? (u(), h("span", ul, P(r.entityLabel), 1)) : M("", !0)
          ]),
          S("span", dl, [
            r.parts.state && !s(r) ? (u(), A(We, {
              key: 0,
              status: r.parts.state
            }, null, 8, ["status"])) : M("", !0),
            s(r) ? (u(), A(an, {
              key: 1,
              entry: r
            }, null, 8, ["entry"])) : (u(), A(ma, {
              key: 2,
              entry: r
            }, null, 8, ["entry"])),
            j(Ue, { entry: r }, null, 8, ["entry"]),
            j(je, { entry: r }, null, 8, ["entry"]),
            $(t).pinnable.value ? (u(), A(nn, {
              key: 3,
              row: r.row,
              name: r.parts.identity,
              pinned: r.pinned
            }, null, 8, ["row", "name", "pinned"])) : M("", !0)
          ])
        ]),
        j(ne, {
          class: "dc-card__open",
          href: $(t).pressHref(r.row),
          onPress: (c) => $(t).activate(r.row, c)
        }, {
          default: G(() => [
            r.parts.image ? (u(), A(_t, {
              key: 0,
              class: "dc-card__image",
              src: r.parts.image
            }, null, 8, ["src"])) : M("", !0),
            S("span", fl, [
              S("span", vl, P(r.parts.identity), 1),
              s(r) ? M("", !0) : (u(), h("span", pl, P(r.parts.reference), 1)),
              r.parts.facts.length ? (u(), h("span", hl, [
                (u(!0), h(W, null, X(r.parts.facts, (c) => (u(), h("span", {
                  key: c.column.key ?? c.label,
                  class: "dc-card__fact",
                  title: c.title || void 0
                }, [
                  S("span", yl, P(c.label), 1),
                  J(" " + P(c.text), 1)
                ], 8, ml))), 128))
              ])) : M("", !0)
            ])
          ]),
          _: 2
        }, 1032, ["href", "onPress"]),
        s(r) ? M("", !0) : (u(), h("div", _l, [
          (u(!0), h(W, null, X(r.parts.metrics.slice(0, 2), (c) => (u(), A(ze, {
            key: c.column.key ?? c.label,
            entry: r,
            column: c.column
          }, {
            default: G(() => [
              J(P(c.label) + " " + P(c.text), 1)
            ]),
            _: 2
          }, 1032, ["entry", "column"]))), 128)),
          r.parts.updated ? (u(), h("span", gl, P(r.parts.updated), 1)) : M("", !0)
        ]))
      ], 2))), 128))
    ], 2));
  }
}), ya = /* @__PURE__ */ z(wl, [["__scopeId", "data-v-fd252138"]]), kl = { class: "dc-grid" }, bl = { class: "dc-tile__scrim" }, $l = { class: "dc-tile__top dc-mono" }, xl = { class: "dc-tile__chip" }, Sl = { class: "dc-tile__caption" }, Cl = { class: "dc-tile__secondary dc-truncate" }, Pl = { class: "dc-tile__primary" }, El = /* @__PURE__ */ q({
  __name: "GridView",
  setup(e) {
    const t = Z(), n = xe();
    return (a, s) => (u(), h("div", kl, [
      (u(!0), h(W, null, X($(n), (o) => (u(), h("div", {
        key: o.key,
        class: "dc-grid__cell"
      }, [
        j(ne, {
          class: "dc-tile",
          style: oe({ "--dc-tile-tint": o.parts.tint ?? void 0 }),
          href: $(t).pressHref(o.row),
          onPress: (l) => $(t).activate(o.row, l)
        }, {
          default: G(() => [
            o.parts.image ? (u(), A(_t, {
              key: 0,
              class: "dc-tile__image",
              src: o.parts.image
            }, null, 8, ["src"])) : M("", !0),
            S("span", bl, [
              S("span", $l, [
                S("span", xl, P(o.ordinal), 1)
              ]),
              S("span", Sl, [
                S("span", Cl, P(o.parts.reference), 1),
                S("span", Pl, P(o.parts.identity), 1)
              ])
            ])
          ]),
          _: 2
        }, 1032, ["style", "href", "onPress"]),
        $(t).selectable.value ? (u(), A(Se, {
          key: 0,
          class: "dc-grid__tick",
          row: o.row,
          selected: o.selected,
          name: o.parts.identity
        }, null, 8, ["row", "selected", "name"])) : M("", !0)
      ]))), 128))
    ]));
  }
}), _a = /* @__PURE__ */ z(El, [["__scopeId", "data-v-89c40a9e"]]);
function Cn(e, t, n, a) {
  return (n - a * (t - 1)) / e;
}
function Pt(e, t) {
  return e > 0 ? Math.min(t, e) : t;
}
function Ll(e) {
  return e > 0 ? e : 1 / 0;
}
function Tl(e, t, n) {
  const { width: a, height: s, gap: o = 0 } = n;
  if (!e.length) return [];
  if (!(a > 0) || !(s > 0)) return [{ items: [...e], height: s, filled: !1 }];
  const l = [];
  let i = [], r = 0, c = 0;
  for (const d of e) {
    const m = t(d), b = Math.max(m.ratio, Number.EPSILON), x = m.height && m.height > 0 ? Math.max(c, m.height) : c, k = Pt(x, s), p = Cn(r + b, i.length + 1, a, o);
    if (p > k) {
      i.push(d), r += b, c = x;
      continue;
    }
    const w = Pt(c, s), L = i.length ? Cn(r, i.length, a, o) : 1 / 0;
    L <= Ll(c) && L - w < k - p ? (l.push({ items: i, height: L, filled: !0 }), i = [d], r = b, c = m.height && m.height > 0 ? m.height : 0) : (l.push({ items: [...i, d], height: p, filled: !0 }), i = [], r = 0, c = 0);
  }
  return i.length && l.push({ items: i, height: Pt(c, s), filled: !1 }), l;
}
const Ml = { class: "dc-images" }, Ol = {
  key: 1,
  class: "dc-images__blank",
  "aria-hidden": "true"
}, Al = 240, Qe = 8, Nl = 1, Rl = /* @__PURE__ */ q({
  __name: "ImagesView",
  setup(e) {
    const t = Z(), n = xe(), a = ln(/* @__PURE__ */ new Map()), s = ln(/* @__PURE__ */ new Set());
    function o(k, p) {
      const w = p.target;
      w.naturalWidth > 0 && w.naturalHeight > 0 && a.set(k, { width: w.naturalWidth, height: w.naturalHeight });
    }
    function l(k) {
      const p = k.parts.image;
      return p && !s.has(p) ? p : null;
    }
    function i(k) {
      const p = l(k);
      return p ? a.get(p) : void 0;
    }
    function r(k) {
      const p = i(k);
      return p ? { ratio: p.width / p.height, height: p.height } : { ratio: Nl };
    }
    const c = N(null), d = N(0);
    let m = null;
    function b() {
      d.value = c.value?.clientWidth ?? 0;
    }
    Ve(() => {
      b(), !(!c.value || typeof ResizeObserver > "u") && (m = new ResizeObserver(b), m.observe(c.value));
    }), pe(() => {
      m?.disconnect(), m = null;
    });
    const x = f(() => {
      const k = Tl(n.value, r, {
        width: d.value,
        height: Al,
        gap: Qe
      }), p = [];
      let w = 0;
      for (const L of k) {
        let g = 0;
        for (const v of L.items) {
          const _ = r(v).ratio * L.height, T = i(v), I = T !== void 0 && T.height < L.height;
          p.push({
            entry: v,
            style: {
              top: `${w}px`,
              left: `${g}px`,
              width: `${_}px`,
              height: `${L.height}px`
            },
            picture: I ? { width: `${T.width}px`, height: `${T.height}px` } : { width: "100%", height: "100%" }
          }), g += _ + Qe;
        }
        w += L.height + Qe;
      }
      return { boxes: p, height: k.length ? w - Qe : 0 };
    });
    return (k, p) => (u(), h("div", Ml, [
      S("div", {
        ref_key: "wall",
        ref: c,
        class: "dc-images__wall",
        style: oe({ height: `${x.value.height}px` })
      }, [
        (u(!0), h(W, null, X(x.value.boxes, ({ entry: w, style: L, picture: g }) => (u(), h("div", {
          key: w.key,
          class: "dc-images__cell",
          style: oe(L)
        }, [
          j(ne, {
            class: "dc-images__open",
            title: w.parts.identity,
            "aria-label": w.parts.identity,
            href: $(t).pressHref(w.row),
            onPress: (v) => $(t).activate(w.row, v)
          }, {
            default: G(() => [
              l(w) ? (u(), A(_t, {
                key: 0,
                class: "dc-images__picture",
                style: oe(g),
                src: l(w),
                onLoad: (v) => o(l(w), v),
                onError: (v) => s.add(l(w))
              }, null, 8, ["style", "src", "onLoad", "onError"])) : (u(), h("span", Ol, P(w.parts.identity), 1))
            ]),
            _: 2
          }, 1032, ["title", "aria-label", "href", "onPress"]),
          $(t).selectable.value ? (u(), A(Se, {
            key: 0,
            class: "dc-images__tick",
            row: w.row,
            selected: w.selected,
            name: w.parts.identity
          }, null, 8, ["row", "selected", "name"])) : M("", !0)
        ], 4))), 128))
      ], 4)
    ]));
  }
}), ga = /* @__PURE__ */ z(Rl, [["__scopeId", "data-v-2d267370"]]), Il = { class: "dc-links" }, Bl = { class: "dc-link__primary dc-truncate" }, Hl = { class: "dc-link__secondary dc-mono dc-truncate" }, Fl = /* @__PURE__ */ q({
  __name: "LinksView",
  setup(e) {
    const t = Z(), n = xe();
    return (a, s) => (u(), h("div", Il, [
      (u(!0), h(W, null, X($(n), (o) => (u(), h("span", {
        key: o.key,
        class: "dc-links__item"
      }, [
        $(t).selectable.value ? (u(), A(Se, {
          key: 0,
          row: o.row,
          selected: o.selected,
          name: o.parts.identity
        }, null, 8, ["row", "selected", "name"])) : M("", !0),
        j(ne, {
          class: "dc-link",
          href: $(t).pressHref(o.row),
          onPress: (l) => $(t).activate(o.row, l)
        }, {
          default: G(() => [
            S("span", Bl, P(o.parts.identity), 1),
            S("span", Hl, P(o.parts.reference), 1)
          ]),
          _: 2
        }, 1032, ["href", "onPress"])
      ]))), 128))
    ]));
  }
}), wa = /* @__PURE__ */ z(Fl, [["__scopeId", "data-v-de6c9a0f"]]), ql = {
  class: "dc-list",
  role: "list"
}, Vl = { class: "dc-list__ordinal dc-mono" }, Dl = { class: "dc-list__identity" }, Kl = { class: "dc-list__primary dc-truncate" }, Wl = { class: "dc-list__secondary dc-mono dc-truncate" }, zl = {
  key: 1,
  class: "dc-list__entity dc-mono"
}, jl = { class: "dc-list__metrics dc-mono" }, Ul = { class: "dc-list__trailing" }, Ql = /* @__PURE__ */ q({
  __name: "ListView",
  setup(e) {
    const t = Z(), n = xe(), a = f(() => t.isEverything.value);
    return (s, o) => (u(), h("div", ql, [
      (u(!0), h(W, null, X($(n), (l) => (u(), h("div", {
        key: l.key,
        class: "dc-list__row",
        role: "listitem"
      }, [
        $(t).selectable.value ? (u(), A(Se, {
          key: 0,
          class: "dc-list__tick",
          row: l.row,
          selected: l.selected,
          name: l.parts.identity
        }, null, 8, ["row", "selected", "name"])) : M("", !0),
        j(ma, {
          class: "dc-list__standing",
          entry: l
        }, null, 8, ["entry"]),
        j(ne, {
          class: "dc-list__open",
          href: $(t).pressHref(l.row),
          onPress: (i) => $(t).activate(l.row, i)
        }, {
          default: G(() => [
            S("span", Vl, P(l.ordinal), 1),
            S("span", Dl, [
              S("span", Kl, P(l.parts.identity), 1),
              S("span", Wl, P(l.parts.reference), 1)
            ])
          ]),
          _: 2
        }, 1032, ["href", "onPress"]),
        a.value ? (u(), h("span", zl, P(l.entityLabel), 1)) : M("", !0),
        S("span", jl, [
          (u(!0), h(W, null, X(l.parts.metrics.slice(0, 2), (i) => (u(), A(ze, {
            key: i.column.key ?? i.label,
            entry: l,
            column: i.column
          }, null, 8, ["entry", "column"]))), 128))
        ]),
        S("span", Ul, [
          l.parts.state ? (u(), A(We, {
            key: 0,
            status: l.parts.state
          }, null, 8, ["status"])) : M("", !0),
          j(Ue, { entry: l }, null, 8, ["entry"]),
          j(je, { entry: l }, null, 8, ["entry"]),
          $(t).pinnable.value ? (u(), A(nn, {
            key: 1,
            row: l.row,
            name: l.parts.identity,
            pinned: l.pinned
          }, null, 8, ["row", "name", "pinned"])) : M("", !0)
        ])
      ]))), 128))
    ]));
  }
}), qt = /* @__PURE__ */ z(Ql, [["__scopeId", "data-v-3d349a10"]]), Gl = { class: "dc-preview" }, Yl = { class: "dc-preview__pager dc-mono" }, Xl = ["disabled"], Jl = { "aria-live": "polite" }, Zl = ["disabled"], er = {
  key: 0,
  class: "dc-preview__card"
}, tr = ["src"], nr = { class: "dc-preview__body" }, ar = { class: "dc-preview__top" }, sr = { class: "dc-preview__badges" }, or = { class: "dc-preview__entity dc-mono" }, lr = { class: "dc-preview__marks" }, rr = { class: "dc-preview__primary" }, ir = { class: "dc-preview__secondary dc-mono" }, cr = { class: "dc-preview__fields" }, ur = { class: "dc-preview__key" }, dr = { class: "dc-preview__value dc-mono" }, fr = /* @__PURE__ */ q({
  __name: "PreviewView",
  setup(e) {
    const t = Z(), n = xe(), a = N(0);
    se(n, (r) => {
      a.value > r.length - 1 && (a.value = Math.max(0, r.length - 1));
    });
    const s = f(() => n.value[a.value]), o = f(() => {
      const r = s.value;
      if (!r) return [];
      const c = de(r.columns, "reference"), d = de(r.columns, "updated");
      return [
        ...c ? [{ key: c.label ?? "Reference", value: r.parts.reference, column: null }] : [],
        ...r.parts.metrics.map((m) => ({
          key: m.label,
          value: m.text,
          column: m.column
        })),
        ...d ? [{ key: d.label ?? "Updated", value: r.parts.updated, column: null }] : []
      ];
    }), l = f(() => {
      if (!n.value.length) return "0 / 0";
      const r = t.total.value > n.value.length ? ` of ${t.total.value}` : "";
      return `${a.value + 1} / ${n.value.length}${r}`;
    }), i = (r) => {
      const c = n.value.length;
      c && (a.value = Math.min(c - 1, Math.max(0, a.value + r)));
    };
    return (r, c) => (u(), h("div", Gl, [
      S("div", Yl, [
        S("button", {
          type: "button",
          class: "dc-preview__step",
          "aria-label": "Previous result",
          disabled: a.value === 0,
          onClick: c[0] || (c[0] = (d) => i(-1))
        }, " ‹ ", 8, Xl),
        S("span", Jl, P(l.value), 1),
        S("button", {
          type: "button",
          class: "dc-preview__step",
          "aria-label": "Next result",
          disabled: a.value >= $(n).length - 1,
          onClick: c[1] || (c[1] = (d) => i(1))
        }, " › ", 8, Zl)
      ]),
      s.value ? (u(), h("div", er, [
        S("div", {
          class: "dc-preview__media",
          style: oe({ background: s.value.parts.tint ?? void 0 }),
          "aria-hidden": "true"
        }, [
          s.value.parts.image ? (u(), h("img", {
            key: 0,
            class: "dc-preview__image",
            src: s.value.parts.image,
            alt: ""
          }, null, 8, tr)) : (u(), h(W, { key: 1 }, [
            J(" preview ")
          ], 64))
        ], 4),
        S("div", nr, [
          S("div", ar, [
            S("span", sr, [
              $(t).selectable.value ? (u(), A(Se, {
                key: 0,
                row: s.value.row,
                selected: s.value.selected,
                name: s.value.parts.identity
              }, null, 8, ["row", "selected", "name"])) : M("", !0),
              s.value.parts.state ? (u(), A(We, {
                key: 1,
                status: s.value.parts.state
              }, null, 8, ["status"])) : M("", !0),
              S("span", or, P(s.value.entityLabel), 1)
            ]),
            S("span", lr, [
              j(an, { entry: s.value }, null, 8, ["entry"]),
              j(Ue, { entry: s.value }, null, 8, ["entry"]),
              j(je, { entry: s.value }, null, 8, ["entry"]),
              $(t).pinnable.value ? (u(), A(nn, {
                key: 0,
                row: s.value.row,
                name: s.value.parts.identity,
                pinned: s.value.pinned
              }, null, 8, ["row", "name", "pinned"])) : M("", !0)
            ])
          ]),
          S("div", null, [
            S("div", rr, P(s.value.parts.identity), 1),
            S("div", ir, P(s.value.parts.reference), 1)
          ]),
          S("dl", cr, [
            (u(!0), h(W, null, X(o.value, (d) => (u(), h("div", {
              key: d.key,
              class: "dc-preview__field"
            }, [
              S("dt", ur, P(d.key), 1),
              S("dd", dr, [
                d.column && s.value ? (u(), A(ze, {
                  key: 0,
                  entry: s.value,
                  column: d.column
                }, null, 8, ["entry", "column"])) : (u(), h(W, { key: 1 }, [
                  J(P(d.value), 1)
                ], 64))
              ])
            ]))), 128))
          ]),
          j(ne, {
            class: "dc-preview__open",
            href: s.value ? $(t).pressHref(s.value.row) : null,
            onPress: c[2] || (c[2] = (d) => s.value && $(t).activate(s.value.row, d))
          }, {
            default: G(() => [...c[3] || (c[3] = [
              J(" Open record → ", -1)
            ])]),
            _: 1
          }, 8, ["href"])
        ])
      ])) : M("", !0)
    ]));
  }
}), ka = /* @__PURE__ */ z(fr, [["__scopeId", "data-v-59e0d33b"]]);
function vr() {
  const e = Z();
  return f(() => Ya(e.schema.value, e.entity.value));
}
const pr = /* @__PURE__ */ q({
  __name: "ColumnCell",
  props: {
    column: {},
    entry: {}
  },
  setup(e) {
    const t = e, n = Z(), a = f(() => t.column.kind ?? "text"), s = f(() => ue(t.column, t.entry.row)), o = f(
      () => a.value === "ordinal" ? t.entry.ordinal : Ee(t.column, t.entry.row)
    ), l = f(() => s.value), i = f(() => t.column.activate === !0 || !!t.column.click), r = f(() => At(t.column)), c = f(() => Fn(t.column, t.entry.row));
    function d(x) {
      i.value && (x.stopPropagation(), m(yt(x)));
    }
    function m(x) {
      t.column.click?.(t.entry.row, x), t.column.activate && n.activate(t.entry.row, x);
    }
    const b = f(
      () => t.column.activate && !t.column.click ? n.pressHref(t.entry.row) : null
    );
    return (x, k) => a.value === "component" && e.column.component ? (u(), A(Ne(e.column.component), {
      key: 0,
      row: e.entry.row,
      entry: e.entry,
      value: s.value,
      column: e.column
    }, null, 8, ["row", "entry", "value", "column"])) : a.value === "status" ? (u(), A(We, {
      key: 1,
      status: l.value
    }, null, 8, ["status"])) : a.value === "image" ? (u(), A(_t, {
      key: 2,
      class: "dc-cell__image",
      src: typeof s.value == "string" ? s.value : "",
      style: oe({ maxHeight: e.column.height }),
      onClick: d
    }, null, 8, ["src", "style"])) : e.column.drill ? (u(), A(ze, {
      key: 3,
      entry: e.entry,
      column: e.column
    }, null, 8, ["entry", "column"])) : i.value ? (u(), A(ne, {
      key: 4,
      class: ce(["dc-table__open", { "dc-truncate": r.value }]),
      href: b.value,
      title: c.value,
      onPress: k[0] || (k[0] = (p, w) => {
        w.stopPropagation(), m(p);
      })
    }, {
      default: G(() => [
        J(P(o.value), 1)
      ]),
      _: 1
    }, 8, ["class", "href", "title"])) : (u(), h("span", {
      key: 5,
      class: ce(["dc-cell__text", { "dc-truncate": r.value }])
    }, P(o.value), 3));
  }
}), Pn = /* @__PURE__ */ z(pr, [["__scopeId", "data-v-3196ba40"]]), hr = {
  key: 0,
  class: "dc-table__none"
}, mr = { class: "dc-table__detail" }, yr = ["data-dc-wrap", "data-dc-row-links"], _r = {
  key: 0,
  class: "dc-table__pick",
  scope: "col"
}, gr = {
  key: 1,
  class: "dc-table__standing",
  scope: "col"
}, wr = ["data-dc-align", "data-dc-hide", "aria-sort", "title"], kr = {
  key: 2,
  class: "dc-table__head"
}, br = ["onClick"], $r = {
  key: 0,
  class: "dc-table__pick"
}, xr = {
  key: 1,
  class: "dc-table__standing"
}, Sr = ["data-dc-align", "data-dc-hide", "title"], Cr = {
  key: 1,
  class: "dc-table__name"
}, Pr = /* @__PURE__ */ q({
  __name: "TableView",
  setup(e) {
    const t = Z(), n = xe(), a = vr();
    function s(E, F) {
      const y = t.pressHref(E);
      if (y && na(F)) {
        const O = F.shiftKey ? `noopener,popup,width=${window.outerWidth},height=${window.outerHeight}` : "noopener";
        window.open(y, "_blank", O);
        return;
      }
      t.activate(E, yt(F));
    }
    const o = f(() => t.rowLinks?.value ? new Map(n.value.map((E) => [E.key, t.pressHref(E.row)])) : /* @__PURE__ */ new Map()), l = f(
      () => a.value.find((E) => E.role === "identity") ?? a.value[0]
    );
    function i(E, F, y) {
      y.stopPropagation(), t.activate(E, F);
    }
    function r(E) {
      const F = Wn(E, t.entity.value, t.schema.value), y = F ? `Shortcut: ${F}` : void 0;
      return [E.hint, y].filter(Boolean).join(`
`) || void 0;
    }
    const c = f(() => {
      const E = a.value.find((y) => y.scope);
      return E || ((t.entity.value ? !!t.entity.value.href : t.entities.value.some((y) => y.href)) ? a.value.find((y) => y.activate) : void 0);
    }), d = f(
      () => t.entity.value ? !!t.entity.value.scope : t.entities.value.some((E) => E.scope)
    ), m = (E) => ht(E.entity, E.row), b = (E) => Zt(t.query.value.expr, m(E));
    function x(E, F) {
      t.setExpression(It(t.query.value.expr, m(E), F));
    }
    const k = f(() => {
      const E = n.value.filter((y) => m(y) !== null), F = E.filter((y) => y.selected);
      return F.length ? F : E;
    }), p = f(() => k.value.some((E) => E.selected)), w = f(() => {
      const E = k.value[0];
      return E ? b(E) : null;
    }), L = f(
      () => k.value.some((E) => b(E) !== w.value)
    ), g = f(
      () => p.value ? "the ticked rows" : "every row on this page"
    );
    function v(E) {
      t.setExpression(
        k.value.reduce(
          (F, y) => It(F, m(y), E),
          t.query.value.expr
        )
      );
    }
    const _ = f(
      () => a.value.some((E) => E.kind === "image" || E.height !== void 0)
    );
    function T(E) {
      E && (t.query.value.sort === E ? t.toggleDirection() : t.setSort(E));
    }
    function I(E) {
      return E ? t.query.value.sort === E ? t.hrefFor({ dir: t.query.value.dir === "desc" ? "asc" : "desc" }) : t.hrefFor({ sort: E }) : null;
    }
    const ae = f(() => t.entity.value?.label ?? "The result set"), D = f(() => new Set(t.sorts.value.map((E) => E.key))), K = (E) => E.sort !== void 0 && D.value.has(E.sort), ee = (E) => {
      if (K(E))
        return t.query.value.sort !== E.sort ? "none" : t.query.value.dir === "desc" ? "descending" : "ascending";
    };
    function re(E) {
      return [
        hn(E),
        E.muted ? "dc-table__muted" : "",
        E.mono ? "dc-mono" : "",
        At(E) ? "dc-truncate" : ""
      ].filter(Boolean).join(" ");
    }
    function V(E, F) {
      if (!(!At(E) || E.activate || E.click))
        return Fn(E, F.row);
    }
    const Y = N(null);
    function R(E) {
      Y.value && (Y.value.scrollLeft = E.target.scrollLeft);
    }
    return (E, F) => $(a).length ? (u(), h("table", {
      key: 1,
      class: "dc-table",
      "data-dc-wrap": _.value ? "" : void 0,
      "data-dc-row-links": $(t).rowLinks?.value ? "" : void 0
    }, [
      S("thead", {
        ref_key: "head",
        ref: Y,
        "data-dc-stuck": ""
      }, [
        S("tr", null, [
          $(t).selectable.value ? (u(), h("th", _r, [
            j(pa)
          ])) : M("", !0),
          d.value ? (u(), h("th", gr, [
            k.value.length ? (u(), A(Ft, {
              key: 0,
              standing: w.value,
              mixed: L.value,
              name: g.value,
              onSet: v
            }, null, 8, ["standing", "mixed", "name"])) : M("", !0)
          ])) : M("", !0),
          (u(!0), h(W, null, X($(a), (y, O) => (u(), h("th", {
            key: $(vn)(y, O),
            scope: "col",
            class: ce($(hn)(y)),
            style: oe({ width: y.width }),
            "data-dc-align": $(pn)(y),
            "data-dc-hide": y.hideBelow,
            "aria-sort": ee(y),
            title: r(y)
          }, [
            K(y) ? (u(), A(ne, {
              key: 0,
              class: "dc-table__sort",
              href: I(y.sort),
              onPress: (H) => T(y.sort)
            }, {
              default: G(() => [
                J(P(y.label), 1)
              ]),
              _: 2
            }, 1032, ["href", "onPress"])) : (u(), h(W, { key: 1 }, [
              J(P(y.label), 1)
            ], 64)),
            y.header ? (u(), h("span", kr, [
              (u(), A(Ne(y.header), {
                column: y,
                entity: $(t).entity.value
              }, null, 8, ["column", "entity"]))
            ])) : M("", !0)
          ], 14, wr))), 128))
        ])
      ], 512),
      S("tbody", {
        "data-dc-scroll": "",
        onScroll: R
      }, [
        (u(!0), h(W, null, X($(n), (y) => (u(), h("tr", {
          key: y.key,
          class: "dc-table__row",
          onClick: (O) => s(y.row, O)
        }, [
          $(t).selectable.value ? (u(), h("td", $r, [
            j(Se, {
              row: y.row,
              selected: y.selected,
              name: y.parts.identity
            }, null, 8, ["row", "selected", "name"])
          ])) : M("", !0),
          d.value ? (u(), h("td", xr, [
            m(y) !== null ? (u(), A(Ft, {
              key: 0,
              standing: b(y),
              name: y.parts.identity,
              onSet: (O) => x(y, O)
            }, null, 8, ["standing", "name", "onSet"])) : M("", !0)
          ])) : M("", !0),
          (u(!0), h(W, null, X($(a), (O, H) => (u(), h("td", {
            key: $(vn)(O, H),
            class: ce(re(O)),
            style: oe({ width: O.width }),
            "data-dc-align": $(pn)(O),
            "data-dc-hide": O.hideBelow,
            title: V(O, y)
          }, [
            o.value.get(y.key) ? (u(), A(ne, {
              key: 0,
              class: "dc-table__cell-link",
              href: o.value.get(y.key),
              tabindex: O === l.value ? void 0 : -1,
              "aria-hidden": O === l.value ? void 0 : "true",
              "aria-label": O === l.value ? y.parts.identity : void 0,
              onPress: (te, we) => i(y.row, te, we)
            }, null, 8, ["href", "tabindex", "aria-hidden", "aria-label", "onPress"])) : M("", !0),
            O === c.value ? (u(), h("span", Cr, [
              j(Pn, {
                column: O,
                entry: y
              }, null, 8, ["column", "entry"]),
              j(Ue, { entry: y }, null, 8, ["entry"]),
              j(je, { entry: y }, null, 8, ["entry"])
            ])) : (u(), A(Pn, {
              key: 2,
              column: O,
              entry: y
            }, null, 8, ["column", "entry"]))
          ], 14, Sr))), 128))
        ], 8, br))), 128))
      ], 32)
    ], 8, yr)) : (u(), h("p", hr, [
      F[2] || (F[2] = S("span", { class: "dc-table__headline" }, "No columns declared", -1)),
      S("span", mr, [
        J(P(ae.value) + " has no ", 1),
        F[0] || (F[0] = S("code", null, "columns", -1)),
        F[1] || (F[1] = J(" in the schema, so there is no table to draw. ", -1))
      ])
    ]));
  }
}), ba = /* @__PURE__ */ z(Pr, [["__scopeId", "data-v-66fa1713"]]);
function Er(e) {
  const t = me([]), n = N(!1), a = me(null);
  let s = 0;
  const o = (r, c, d, m, b) => ({
    entity: r,
    rows: e.limit.value > 0 ? c.rows.map((x, k) => ha(x, k, r, e.isPinned(x.id))) : [],
    total: c.total,
    count: d ? Ot(r) : Xe(c.total),
    pinned: Lr(m, c, b)
  }), l = () => {
    const r = ++s, c = e.query.value, d = e.schema.value, m = e.entities.value, b = e.limit.value, x = e.within?.value.trim() ?? "", k = jt(c) && !x, p = x ? Gt(x, c.expr) : c.expr, w = m.map((L) => ({
      entity: L,
      // Scope the query to this entity, keeping the expression and ordering.
      outcome: e.source.value.query({
        // Each card is the top few of its type, wherever the shell's own
        // result set has been paged to — so this asks for the first page.
        query: { ...c, entity: L.key, expr: p, page: 1 },
        schema: d,
        entity: L,
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
    if (w.every(({ outcome: L }) => !(L instanceof Promise))) {
      t.value = w.map(
        ({ entity: L, outcome: g }) => o(L, g, k, d, p)
      ), a.value = null, n.value = !1;
      return;
    }
    n.value = !0, Promise.all(w.map(({ outcome: L }) => Promise.resolve(L))).then((L) => {
      r === s && (t.value = L.map(
        (g, v) => o(w[v].entity, g, k, d, p)
      ), a.value = null);
    }).catch((L) => {
      r === s && (a.value = L, t.value = []);
    }).finally(() => {
      r === s && (n.value = !1);
    });
  }, i = () => {
    try {
      l();
    } catch (r) {
      a.value = r, t.value = [], n.value = !1;
    }
  };
  return se(
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
  ), { previews: t, pending: n, error: a, refresh: i };
}
function Lr(e, t, n) {
  const a = t.rows[0];
  if (t.total !== 1 || t.rows.length !== 1 || !a)
    return !1;
  const s = n.trim();
  if (!s)
    return !1;
  const o = nt(e, a);
  return !!o && Ke(s, o) === s;
}
const Tr = ["data-dc-pending", "data-dc-heads-only"], Mr = {
  key: 0,
  class: "dc-types__state",
  role: "alert"
}, Or = {
  key: 1,
  class: "dc-types__state",
  "aria-live": "polite"
}, Ar = {
  key: 2,
  class: "dc-types__state"
}, Nr = ["data-dc-empty"], Rr = { class: "dc-type__name" }, Ir = { class: "dc-type__count dc-mono" }, Br = { class: "dc-type__sr" }, Hr = {
  key: 0,
  class: "dc-type__description"
}, Fr = {
  key: 0,
  class: "dc-type__empty"
}, qr = { class: "dc-type__identity" }, Vr = { class: "dc-type__primary dc-truncate" }, Dr = { class: "dc-type__secondary dc-mono dc-truncate" }, Kr = { class: "dc-type__trailing dc-mono" }, Wr = { class: "dc-type__metric-value" }, zr = { class: "dc-type__metric-label" }, jr = {
  key: 0,
  class: "dc-type__date"
}, Ur = /* @__PURE__ */ q({
  __name: "TypeCardsView",
  setup(e) {
    const t = Z(), { previews: n, pending: a, error: s } = Er({
      source: t.source,
      schema: t.schema,
      // The query as the results are read under it, so a word being typed in the
      // header narrows the cards as it narrows any list — see `liveQuery`.
      query: t.liveQuery,
      entities: t.entities,
      limit: t.previewsPerType,
      within: t.within,
      isPinned: (r) => t.isPinnedId(r)
    }), o = f(
      () => !t.isPristine.value || !!t.within.value || t.drafting.value
    ), l = f(() => t.previewsPerType.value <= 0), i = f(
      () => n.value.filter(
        (r) => !r.pinned && (r.total > 0 || !l.value && r.entity.create)
      )
    );
    return (r, c) => (u(), h("div", {
      class: "dc-types",
      "data-dc-pending": $(a) ? "true" : "false",
      "data-dc-heads-only": l.value ? "true" : "false"
    }, [
      Q(r.$slots, "before", {}, void 0, !0),
      $(s) ? (u(), h("p", Mr, " Could not load results: " + P($(s) instanceof Error ? $(s).message : "the data source failed."), 1)) : !i.value.length && $(a) ? (u(), h("p", Or, " Running query… ")) : i.value.length ? M("", !0) : (u(), h("p", Ar, P(o.value ? "Nothing matches this query" : "Nothing here yet"), 1)),
      (u(!0), h(W, null, X(i.value, (d) => (u(), h("section", {
        key: d.entity.key,
        class: "dc-type",
        "data-dc-empty": d.total ? "false" : "true"
      }, [
        j(ne, {
          class: "dc-type__head",
          href: $(t).entityHref(d.entity.key),
          onPress: (m) => $(t).setEntity(d.entity.key)
        }, {
          default: G(() => [
            S("span", Rr, P(d.entity.label), 1),
            S("span", Ir, P(d.count), 1),
            c[0] || (c[0] = S("span", {
              class: "dc-type__go",
              "aria-hidden": "true"
            }, "→", -1)),
            S("span", Br, "Show only " + P(d.entity.label.toLowerCase()), 1),
            d.entity.description ? (u(), h("span", Hr, P(d.entity.description), 1)) : M("", !0)
          ]),
          _: 2
        }, 1032, ["href", "onPress"]),
        d.total ? M("", !0) : (u(), h("p", Fr, P(o.value ? "No matches" : "Nothing here yet"), 1)),
        (u(!0), h(W, null, X(d.rows, (m) => (u(), h("div", {
          key: m.key,
          class: "dc-type__row"
        }, [
          j(ne, {
            class: "dc-type__open",
            href: $(t).pressHref(m.row),
            onPress: (b) => $(t).activate(m.row, b)
          }, {
            default: G(() => [
              S("span", qr, [
                S("span", Vr, P(m.parts.identity), 1),
                S("span", Dr, P(m.parts.reference), 1)
              ])
            ]),
            _: 2
          }, 1032, ["href", "onPress"]),
          S("span", Kr, [
            (u(!0), h(W, null, X(m.parts.metrics.slice(0, 1), (b) => (u(), A(ze, {
              key: b.column.key ?? b.label,
              class: "dc-type__metric",
              entry: m,
              column: b.column
            }, {
              default: G(() => [
                S("span", Wr, P(b.text), 1),
                S("span", zr, P(b.label), 1)
              ]),
              _: 2
            }, 1032, ["entry", "column"]))), 128)),
            m.parts.updated ? (u(), h("span", jr, P(m.parts.updated), 1)) : M("", !0),
            j(an, { entry: m }, null, 8, ["entry"]),
            j(Ue, { entry: m }, null, 8, ["entry"]),
            j(je, { entry: m }, null, 8, ["entry"])
          ])
        ]))), 128)),
        d.entity.create && !l.value ? (u(), A(ne, {
          key: 1,
          class: "dc-type__new",
          href: $(t).createHref?.(d.entity),
          onPress: (m) => $(t).create(d.entity)
        }, {
          default: G(() => [
            c[1] || (c[1] = S("span", {
              class: "dc-type__plus",
              "aria-hidden": "true"
            }, "+", -1)),
            J(" " + P(d.entity.create), 1)
          ]),
          _: 2
        }, 1032, ["href", "onPress"])) : M("", !0)
      ], 8, Nr))), 128)),
      Q(r.$slots, "after", {}, void 0, !0)
    ], 8, Tr));
  }
}), $a = /* @__PURE__ */ z(Ur, [["__scopeId", "data-v-d73c6777"]]), Qr = ["data-dc-pending", "data-dc-more"], Gr = {
  key: 0,
  class: "dc-results__state dc-results__state--loading",
  "aria-live": "polite"
}, Yr = {
  key: 3,
  class: "dc-results__state",
  role: "alert"
}, Xr = { class: "dc-results__detail" }, Jr = {
  key: 4,
  class: "dc-results__state",
  "aria-live": "polite"
}, Zr = {
  key: 5,
  class: "dc-results__state"
}, ei = { class: "dc-results__detail" }, ti = /* @__PURE__ */ q({
  __name: "ResultsArea",
  props: {
    views: {},
    loading: { type: Boolean }
  },
  setup(e) {
    const t = e, n = Z(), a = lt(), s = {
      list: qt,
      cards: ya,
      grid: _a,
      images: ga,
      table: ba,
      links: wa,
      preview: ka
    }, o = f(() => Bn(n.query.value, t.views)), l = f(() => zt(n.query.value.view, t.views)), i = f(() => (l.value === "record" ? null : s[l.value]) ?? qt), r = f(() => l.value === "record" ? n.recordView.value : null), c = f(() => n.rows.value.length > 0), d = f(() => n.error.value !== null), m = N(null);
    function b(v) {
      return v.querySelector("[data-dc-scroll]") ?? v;
    }
    se(
      // The page on screen, which is the draft's own while one is being typed.
      () => n.liveQuery.value.page,
      () => {
        m.value && (b(m.value).scrollTop = 0);
      }
    );
    const x = N(""), k = N({ x: 0, y: 0 }), p = N(0);
    function w() {
      const v = m.value;
      if (!v) {
        x.value = "";
        return;
      }
      const _ = b(v), T = {
        top: _.scrollTop > 1,
        right: _.scrollWidth - _.clientWidth - _.scrollLeft > 1,
        bottom: _.scrollHeight - _.clientHeight - _.scrollTop > 1,
        left: _.scrollLeft > 1
      };
      x.value = Object.entries(T).filter(([, I]) => I).map(([I]) => I).join(" "), k.value = {
        x: _.offsetHeight - _.clientHeight,
        y: _.offsetWidth - _.clientWidth
      }, p.value = v.querySelector("[data-dc-stuck]")?.offsetHeight ?? 0;
    }
    let L = null, g = null;
    return se(
      m,
      (v, _) => {
        if (_?.removeEventListener("scroll", w, { capture: !0 }), L?.disconnect(), g?.disconnect(), L = null, g = null, w(), !v || (v.addEventListener("scroll", w, { passive: !0, capture: !0 }), typeof ResizeObserver > "u")) return;
        const T = new ResizeObserver(w), I = typeof MutationObserver > "u" ? null : new MutationObserver(() => {
          ae(), w();
        }), ae = () => {
          T.disconnect(), I?.disconnect();
          for (const D of /* @__PURE__ */ new Set([v, b(v)])) {
            T.observe(D);
            for (const K of D.children) T.observe(K);
            I?.observe(D, { childList: !0 });
          }
        };
        ae(), L = T, g = I;
      },
      { flush: "post" }
    ), pe(() => {
      m.value?.removeEventListener("scroll", w, { capture: !0 }), L?.disconnect(), g?.disconnect();
    }), (v, _) => (u(), h("div", {
      ref_key: "scroller",
      ref: m,
      class: "dc-results",
      "data-dc-pending": $(n).pending.value ? "true" : "false",
      "data-dc-more": x.value,
      style: oe({
        "--dc-results-gutter-x": `${k.value.x}px`,
        "--dc-results-gutter-y": `${k.value.y}px`,
        "--dc-results-stuck": `${p.value}px`
      })
    }, [
      e.loading ? (u(), h("p", Gr, [..._[1] || (_[1] = [
        S("span", { class: "dc-results__detail" }, "Loading…", -1)
      ])])) : o.value ? (u(), A($a, { key: 1 }, Lt({ _: 2 }, [
        a["cards-before"] ? {
          name: "before",
          fn: G(() => [
            Q(v.$slots, "cards-before", {}, void 0, !0)
          ]),
          key: "0"
        } : void 0,
        a["cards-after"] ? {
          name: "after",
          fn: G(() => [
            Q(v.$slots, "cards-after", {}, void 0, !0)
          ]),
          key: "1"
        } : void 0
      ]), 1024)) : r.value ? (u(), A(Ne(r.value.component), {
        key: 2,
        id: r.value.id
      }, null, 8, ["id"])) : d.value ? (u(), h("p", Yr, [
        _[2] || (_[2] = S("span", { class: "dc-results__headline" }, "Could not load results", -1)),
        S("span", Xr, P($(n).error.value instanceof Error ? $(n).error.value.message : "The data source failed."), 1)
      ])) : !c.value && $(n).pending.value ? (u(), h("p", Jr, [..._[3] || (_[3] = [
        S("span", { class: "dc-results__detail" }, "Running query…", -1)
      ])])) : c.value ? (u(), A(Ne(i.value), { key: 6 })) : (u(), h("div", Zr, [
        _[4] || (_[4] = S("span", { class: "dc-results__headline" }, "Nothing matches this query", -1)),
        S("span", ei, P($(n).summary.value), 1),
        $(n).isPristine.value ? M("", !0) : (u(), A(ne, {
          key: 0,
          class: "dc-results__clear",
          href: $(n).clearHref(),
          onPress: _[0] || (_[0] = (T) => $(n).clearFilters())
        }, {
          default: G(() => [
            J(P($(n).isEverything.value ? "Clear filters" : "Search everything instead"), 1)
          ]),
          _: 1
        }, 8, ["href"]))
      ]))
    ], 12, Qr));
  }
}), xa = /* @__PURE__ */ z(ti, [["__scopeId", "data-v-9cb044b3"]]), ni = ["data-dc-theme"], ai = {
  key: 0,
  class: "dc-shell__page"
}, si = /* @__PURE__ */ q({
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
    loading: { type: Boolean, default: !1 },
    pageQuery: { default: "shell" },
    listPath: { default: "/" },
    recordCards: {},
    recordViews: {},
    typeChooser: { default: "scoped" },
    selectionPlacement: { default: "start" },
    oneStripFrom: { type: [Number, Boolean], default: 1200 },
    accent: {},
    tokens: {},
    theme: { default: "minimal" },
    pinnable: { type: Boolean },
    selectable: { type: Boolean },
    rowPress: { default: "narrow" },
    rowLinks: { type: Boolean, default: !1 },
    activateHref: {},
    createHref: {},
    pagesNote: {},
    navigationMode: { default: "push" },
    facetNavigationMode: { default: "replace" }
  }, {
    pinned: { default: () => [] },
    pinnedModifiers: {},
    selected: { default: () => [] },
    selectedModifiers: {}
  }),
  emits: /* @__PURE__ */ cn(["activate", "create", "duplicate", "delete", "operate", "drill", "query-change", "toggle-pin"], ["update:pinned", "update:selected"]),
  setup(e, { expose: t, emit: n }) {
    const a = e, s = n, o = rn(e, "pinned"), l = rn(e, "selected"), i = lt(), r = Vt(On, null), c = a.route || r ? null : Ra(), d = a.route ?? r ?? c;
    pe(() => c?.dispose?.());
    const m = N(!!i.page);
    Ea(() => {
      m.value = !!i.page;
    });
    const b = Ia(d, {
      detached: () => m.value && a.pageQuery === "detached",
      path: () => a.listPath
    }), x = f(() => Ps({ seed: a.schema.key })), k = f(() => a.source ?? x.value), p = Us({
      schema: () => a.schema,
      adapter: b,
      defaults: () => a.defaults,
      navigationMode: () => a.navigationMode,
      facetNavigationMode: () => a.facetNavigationMode
    }), w = f(() => a.within?.trim() ?? ""), L = Ys({
      query: p.query,
      entity: p.entity,
      schema: f(() => a.schema),
      setExpression: p.setExpression
    }), g = Qs({
      source: k,
      query: L.live,
      schema: f(() => a.schema),
      entity: p.entity,
      limit: f(() => a.limit),
      within: w
    });
    se(p.query, (C) => s("query-change", C));
    const v = f(() => Rs(a.schema, [p.query.value.expr])), _ = f(
      () => v.value.flatMap((C) => {
        const B = a.schema.entities.find((U) => U.key === C.entityKey);
        return B ? [{ ...C, entity: B }] : [];
      })
    );
    function T() {
      if (i.record) return _.value;
      const C = a.recordCards;
      return C ? _.value.filter((B) => C[B.entityKey]) : [];
    }
    const I = f(() => {
      const [C, ...B] = _.value;
      if (!C || B.length || p.entity.value !== null) return null;
      const U = a.recordViews?.[C.entityKey];
      return U ? { ...U, id: C.id } : null;
    }), ae = f(() => {
      const C = a.views, B = typeof C == "function" ? C({ entity: p.entity.value, records: v.value }) : C;
      return I.value ? [...(B ?? Wt).filter((U) => U !== "record"), "record"] : B?.filter((U) => U !== "record");
    });
    se(
      [g.pageCount, g.pending, p.query, L.drafting, () => a.loading, m],
      () => {
        if (g.pending.value || L.drafting.value || a.loading || m.value) return;
        const C = g.pageCount.value;
        p.query.value.page > C && p.setPage(C, "replace");
      },
      // Immediately, since a pasted URL is past the end before anything changes;
      // and after the render, so the correction is a navigation the mounted shell
      // makes rather than one it makes on the way up. An async source is still
      // pending here and corrects itself when its count lands.
      { immediate: !0, flush: "post" }
    );
    const D = f(() => new Set(o.value));
    function K(C) {
      const B = new Set(D.value);
      B.has(C.id) ? B.delete(C.id) : B.add(C.id), o.value = [...B], s("toggle-pin", C);
    }
    const ee = f(() => {
      if (a.selectable === !0) return !0;
      const C = p.entity.value;
      return !!(C?.duplicate || C?.delete || C?.operations?.some((B) => B.selection !== !1));
    }), re = f(() => new Set(l.value));
    function V(C) {
      const B = new Set(re.value);
      B.has(C.id) ? B.delete(C.id) : B.add(C.id), l.value = [...B];
    }
    function Y(C) {
      const B = new Set(re.value);
      for (const U of g.rows.value)
        C ? B.add(U.id) : B.delete(U.id);
      l.value = [...B];
    }
    function R() {
      l.value.length && (l.value = []);
    }
    const E = f(() => ({
      ids: [...l.value],
      rows: g.rows.value.filter((C) => re.value.has(C.id)),
      entity: p.entity.value
    }));
    se(() => p.query.value.entity, R);
    function F(C, B, U = {}) {
      const on = St(a.schema, p.query.value, C, U);
      U.exclude ? p.narrow(on, B?.key ?? p.query.value.entity) : L.release(() => p.narrow(on, B?.key ?? null, B ? void 0 : "cards")), s("drill", C, B, U);
    }
    function y(C) {
      return a.rowPress === "narrow" && nt(a.schema, C) !== null;
    }
    function O(C) {
      return a.schema.entities.find((U) => U.key === C.entityKey)?.href?.(C) || null;
    }
    const H = Is({
      ...p,
      draft: L.text,
      liveQuery: L.live,
      drafting: L.drafting,
      commitDraft: L.commit,
      abandonDraft: L.abandon,
      /*
       * A page of what is on screen: the draft's, while one is live, which are
       * held beside it rather than in the URL — see `liveQuery`.
       */
      setPage: (C, B) => {
        L.drafting.value ? L.setPage(C) : p.setPage(C, B);
      },
      schema: f(() => a.schema),
      entities: f(() => a.schema.entities),
      rows: g.rows,
      total: g.total,
      limit: f(() => a.limit),
      offset: g.offset,
      pageCount: g.pageCount,
      pending: g.pending,
      counting: g.counting,
      error: g.error,
      source: k,
      previewsPerType: f(() => a.previewsPerType),
      within: w,
      loading: f(() => a.loading),
      recordView: I,
      pinnable: f(() => a.pinnable === !0),
      isPinned: (C) => D.value.has(C.id),
      isPinnedId: (C) => D.value.has(C),
      togglePin: K,
      selectable: ee,
      selection: E,
      isSelected: (C) => re.value.has(C.id),
      toggleSelect: V,
      selectPage: Y,
      clearSelection: R,
      narrowsOnPress: f(() => a.rowPress === "narrow"),
      rowLinks: f(() => a.rowLinks),
      /*
       * The one place a press is read, so every view gets the same answer without
       * knowing which of the two it is: they all call this.
       */
      activate: (C, B = {}) => {
        if (y(C)) {
          F(C, null, B);
          return;
        }
        const U = O(C);
        if (U) {
          window.open(U, "_blank", "noopener");
          return;
        }
        s("activate", C);
      },
      pressHref: (C) => y(C) ? p.narrowHref(St(a.schema, p.query.value, C), null, "cards") : O(C) ?? a.activateHref?.(C) ?? null,
      recordHref: O,
      drillHref: (C, B) => nt(a.schema, C) ? p.narrowHref(
        St(a.schema, p.query.value, C),
        B?.key ?? null,
        B ? void 0 : "cards"
      ) : null,
      create: (C) => s("create", C),
      createHref: (C) => a.createHref?.(C) ?? null,
      duplicate: () => s("duplicate", E.value),
      delete: () => s("delete", E.value),
      operate: (C) => s("operate", C, E.value),
      drill: F
    });
    Fs({ theme: () => a.theme, accent: () => a.accent, tokens: () => a.tokens });
    const te = f(() => {
      if (!(!a.accent && !a.tokens))
        return { ...a.tokens, ...a.accent ? { "--dc-accent": a.accent } : {} };
    }), we = N(null), Ce = N(0);
    let wt = null;
    Ve(() => {
      const C = we.value;
      C && (Ce.value = C.getBoundingClientRect().width, !(typeof ResizeObserver > "u") && (wt = new ResizeObserver(([B]) => {
        Ce.value = B.contentRect.width;
      }), wt.observe(C)));
    }), pe(() => wt?.disconnect());
    const kt = f(() => a.oneStripFrom !== !1 && Ce.value >= a.oneStripFrom), sn = f(() => ({
      views: ae.value,
      typeChooser: a.typeChooser,
      selectionPlacement: a.selectionPlacement,
      pagesNote: a.pagesNote
    }));
    return t({
      query: p.query
    }), (C, B) => (u(), h("div", {
      ref_key: "root",
      ref: we,
      class: "dc-shell",
      "data-dc-theme": e.theme,
      style: oe(te.value)
    }, [
      S("div", {
        class: ce(["dc-shell__head", { "dc-shell__head--one-strip": kt.value }])
      }, [
        j(va, null, Lt({ _: 2 }, [
          i.brand ? {
            name: "brand",
            fn: G((U) => [
              Q(C.$slots, "brand", bt(La(U)), void 0, !0)
            ]),
            key: "0"
          } : void 0,
          i.actions ? {
            name: "actions",
            fn: G(() => [
              Q(C.$slots, "actions", {}, void 0, !0)
            ]),
            key: "1"
          } : void 0
        ]), 1024),
        kt.value && !i.page ? (u(), A(Ht, bt(Tt({ key: 0 }, sn.value)), null, 16)) : M("", !0)
      ], 2),
      i.page ? (u(), h("div", ai, [
        Q(C.$slots, "page", {
          query: $(H).query.value
        }, void 0, !0)
      ])) : M("", !0),
      !kt.value && !i.page ? (u(), A(Ht, bt(Tt({ key: 1 }, sn.value)), null, 16)) : M("", !0),
      i.page ? M("", !0) : Q(C.$slots, "results", {
        rows: $(H).rows.value,
        total: $(H).total.value,
        offset: $(H).offset.value,
        pageCount: $(H).pageCount.value,
        query: $(H).liveQuery.value,
        pending: $(H).pending.value,
        loading: e.loading
      }, () => [
        j(xa, {
          views: ae.value,
          loading: e.loading
        }, Lt({ _: 2 }, [
          i["cards-before"] || T().length ? {
            name: "cards-before",
            fn: G(() => [
              (u(!0), h(W, null, X(T(), (U) => (u(), h(W, {
                key: `${U.entityKey}:${U.id}`
              }, [
                i.record ? Q(C.$slots, "record", {
                  id: U.id,
                  entity: U.entity
                }, void 0, !0, 0) : (u(), A(Ne(e.recordCards?.[U.entityKey]), {
                  key: 1,
                  id: U.id
                }, null, 8, ["id"]))
              ], 64))), 128)),
              Q(C.$slots, "cards-before", {}, void 0, !0)
            ]),
            key: "0"
          } : void 0,
          i["cards-after"] ? {
            name: "cards-after",
            fn: G(() => [
              Q(C.$slots, "cards-after", {}, void 0, !0)
            ]),
            key: "1"
          } : void 0
        ]), 1032, ["views", "loading"])
      ], !0, 2)
    ], 12, ni));
  }
}), oi = /* @__PURE__ */ z(si, [["__scopeId", "data-v-af2fb824"]]), li = ["data-dc-muted", "data-dc-collapsed"], ri = ["data-dc-collapsible"], ii = ["aria-expanded", "aria-controls"], ci = { class: "dc-shell-card__sr" }, ui = {
  key: 0,
  class: "dc-shell-card__identity"
}, di = { class: "dc-shell-card__title dc-shell-card__name" }, fi = {
  key: 0,
  class: "dc-shell-card__ref dc-mono"
}, vi = {
  key: 1,
  class: "dc-shell-card__title"
}, pi = {
  key: 2,
  class: "dc-shell-card__count dc-mono"
}, hi = {
  key: 1,
  class: "dc-shell-card__aside"
}, mi = ["data-dc-flush"], yi = /* @__PURE__ */ q({
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
    const n = e, a = t, s = N(n.defaultCollapsed === !0), o = f(() => n.span === "all" ? { gridColumn: "1 / -1" } : void 0), l = lt();
    function i(D) {
      return r(D?.() ?? []);
    }
    function r(D) {
      return D.some((K) => K.type === Ta ? !1 : K.type === Ma ? String(K.children ?? "").trim().length > 0 : K.type === W ? r(K.children ?? []) : !0);
    }
    const c = f(
      () => !!n.title || !!n.name || d.value || i(l.head)
    ), d = f(() => i(l.aside)), m = f(() => i(l.default)), b = f(() => i(l.foot)), x = f(
      () => !!n.name && (!!n.reference || i(l.reference))
    ), k = f(() => n.collapsible === !0 && c.value), p = f(() => k.value && (n.collapsed ?? s.value));
    function w() {
      const D = !p.value;
      s.value = D, a("update:collapsed", D);
    }
    const L = Kt() ?? "dc-shell-card", g = `${L}-body`, v = `${L}-foot`, _ = f(
      () => [m.value ? g : "", b.value ? v : ""].filter(Boolean).join(" ") || void 0
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
    ].join(", "), I = N(null);
    function ae(D) {
      if (!k.value) return;
      const K = D.target?.closest(T);
      K && I.value?.contains(K) || typeof window < "u" && window.getSelection()?.toString() || w();
    }
    return (D, K) => (u(), h("section", {
      class: "dc-shell-card",
      style: oe(o.value),
      "data-dc-muted": e.muted ? "true" : "false",
      "data-dc-collapsed": p.value ? "true" : "false"
    }, [
      c.value ? (u(), h("header", {
        key: 0,
        ref_key: "head",
        ref: I,
        class: "dc-shell-card__head",
        "data-dc-collapsible": k.value ? "true" : "false",
        onClick: ae
      }, [
        k.value ? (u(), h("button", {
          key: 0,
          type: "button",
          class: "dc-shell-card__toggle",
          "aria-expanded": p.value ? "false" : "true",
          "aria-controls": _.value,
          onClick: w
        }, [
          K[0] || (K[0] = S("svg", {
            class: "dc-shell-card__chevron",
            viewBox: "0 0 10 10",
            "aria-hidden": "true"
          }, [
            S("path", { d: "M2 3.5 5 6.5 8 3.5" })
          ], -1)),
          S("span", ci, P(e.name || e.title || "Card"), 1)
        ], 8, ii)) : M("", !0),
        Q(D.$slots, "head", {}, () => [
          e.name ? (u(), h("div", ui, [
            S("h2", di, P(e.name), 1),
            x.value ? (u(), h("span", fi, [
              Q(D.$slots, "reference", {}, () => [
                J(P(e.reference), 1)
              ], !0)
            ])) : M("", !0)
          ])) : (u(), h("h2", vi, P(e.title), 1)),
          e.count !== void 0 ? (u(), h("span", pi, P(e.count), 1)) : M("", !0)
        ], !0),
        d.value ? (u(), h("span", hi, [
          Q(D.$slots, "aside", {}, void 0, !0)
        ])) : M("", !0)
      ], 8, ri)) : M("", !0),
      m.value ? Et((u(), h("div", {
        key: 1,
        id: g,
        class: "dc-shell-card__body",
        "data-dc-flush": e.flush ? "true" : "false"
      }, [
        Q(D.$slots, "default", {}, void 0, !0)
      ], 8, mi)), [
        [un, !p.value]
      ]) : M("", !0),
      b.value ? Et((u(), h("footer", {
        key: 2,
        id: v,
        class: "dc-shell-card__foot"
      }, [
        Q(D.$slots, "foot", {}, void 0, !0)
      ], 512)), [
        [un, !p.value]
      ]) : M("", !0)
    ], 12, li));
  }
}), $c = /* @__PURE__ */ z(yi, [["__scopeId", "data-v-073304c8"]]), _i = ["aria-label"], gi = ["aria-checked", "data-dc-active", "tabindex", "onClick", "onKeydown"], wi = /* @__PURE__ */ q({
  __name: "SegmentedControl",
  props: {
    modelValue: {},
    options: {},
    label: {},
    mono: { type: Boolean }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const n = e, a = t, s = N([]);
    function o(l, i) {
      const r = n.options.length;
      let c = null;
      if (l.key === "ArrowRight" || l.key === "ArrowDown" ? c = (i + 1) % r : l.key === "ArrowLeft" || l.key === "ArrowUp" ? c = (i - 1 + r) % r : l.key === "Home" ? c = 0 : l.key === "End" && (c = r - 1), c === null) return;
      l.preventDefault();
      const d = n.options[c];
      d && (a("update:modelValue", d.key), s.value[c]?.focus());
    }
    return (l, i) => (u(), h("div", {
      class: "dc-segmented",
      role: "radiogroup",
      "aria-label": e.label
    }, [
      (u(!0), h(W, null, X(e.options, (r, c) => (u(), h("button", {
        key: r.key,
        ref_for: !0,
        ref_key: "buttons",
        ref: s,
        type: "button",
        role: "radio",
        class: ce(["dc-segmented__item", { "dc-segmented__item--mono": e.mono }]),
        "aria-checked": r.key === e.modelValue,
        "data-dc-active": r.key === e.modelValue ? "true" : "false",
        tabindex: r.key === e.modelValue ? 0 : -1,
        onClick: (d) => a("update:modelValue", r.key),
        onKeydown: (d) => o(d, c)
      }, P(r.label), 43, gi))), 128))
    ], 8, _i));
  }
}), ki = /* @__PURE__ */ z(wi, [["__scopeId", "data-v-63fb5482"]]), bi = { class: "dc-fact__label" }, $i = ["title"], xi = /* @__PURE__ */ q({
  __name: "ShellFact",
  props: {
    label: {},
    value: {},
    title: {},
    wide: { type: Boolean }
  },
  setup(e) {
    const t = e, n = f(() => {
      const s = t.value;
      if (s == null || s === "") return [he];
      if (Array.isArray(s)) {
        const o = s.filter((l) => l != null && l !== "");
        return o.length ? o.map(String) : [he];
      }
      return [String(s)];
    }), a = f(() => t.wide ? { gridColumn: "1 / -1" } : void 0);
    return (s, o) => (u(), h("div", {
      class: "dc-fact",
      style: oe(a.value)
    }, [
      S("dt", bi, [
        Q(s.$slots, "label", {}, () => [
          J(P(e.label), 1)
        ], !0)
      ]),
      S("dd", {
        class: "dc-fact__value dc-mono",
        title: e.title
      }, [
        Q(s.$slots, "default", {}, () => [
          n.value.length === 1 ? (u(), h(W, { key: 0 }, [
            J(P(n.value[0]), 1)
          ], 64)) : (u(!0), h(W, { key: 1 }, X(n.value, (l, i) => (u(), h("span", {
            key: i,
            class: "dc-fact__line"
          }, P(l), 1))), 128))
        ], !0)
      ], 8, $i)
    ], 4));
  }
}), Si = /* @__PURE__ */ z(xi, [["__scopeId", "data-v-1f6d25e6"]]), Ci = /* @__PURE__ */ q({
  __name: "ShellFacts",
  props: {
    items: { default: () => [] },
    min: { default: "200px" }
  },
  setup(e) {
    const t = e, n = f(() => ({ "--dc-facts-min": t.min }));
    return (a, s) => (u(), h("dl", {
      class: "dc-facts",
      style: oe(n.value)
    }, [
      (u(!0), h(W, null, X(e.items, (o, l) => (u(), A(Si, {
        key: `${l}:${o.label}`,
        label: o.label,
        value: o.value,
        title: o.title,
        wide: o.wide
      }, null, 8, ["label", "value", "title", "wide"]))), 128)),
      Q(a.$slots, "default", {}, void 0, !0)
    ], 4));
  }
}), xc = /* @__PURE__ */ z(Ci, [["__scopeId", "data-v-17455afa"]]), Pi = { class: "dc-counts" }, Ei = ["data-dc-tone"], Li = {
  key: 0,
  class: "dc-counts__empty"
}, Ti = /* @__PURE__ */ q({
  __name: "StatusCounts",
  props: {
    counts: {},
    empty: { default: he }
  },
  setup(e) {
    const t = e, n = f(() => t.counts.filter((a) => a.count > 0));
    return (a, s) => (u(), h("span", Pi, [
      (u(!0), h(W, null, X(n.value, (o) => (u(), h("span", {
        key: o.label,
        class: "dc-counts__count",
        "data-dc-tone": o.tone ?? "neutral"
      }, P(o.count) + " " + P(o.label), 9, Ei))), 128)),
      n.value.length === 0 ? (u(), h("span", Li, P(e.empty), 1)) : M("", !0)
    ]));
  }
}), Sc = /* @__PURE__ */ z(Ti, [["__scopeId", "data-v-5553a9e2"]]), Mi = ["data-dc-copied", "title", "aria-label"], Oi = {
  key: 0,
  class: "dc-copy__mark",
  viewBox: "0 0 16 16",
  "aria-hidden": "true"
}, Ai = {
  key: 1,
  class: "dc-copy__mark",
  viewBox: "0 0 16 16",
  "aria-hidden": "true"
}, Ni = 1500, Ri = /* @__PURE__ */ q({
  __name: "CopyButton",
  props: {
    text: {},
    label: { default: "Copy to clipboard" }
  },
  emits: ["copied", "error"],
  setup(e, { emit: t }) {
    const n = e, a = t, s = N(!1);
    let o;
    async function l() {
      const i = typeof n.text == "function" ? n.text() : n.text;
      try {
        if (!navigator.clipboard) throw new Error("The clipboard is not available here");
        await navigator.clipboard.writeText(i);
      } catch (r) {
        a("error", r);
        return;
      }
      s.value = !0, clearTimeout(o), o = setTimeout(() => {
        s.value = !1;
      }, Ni), a("copied", i);
    }
    return pe(() => clearTimeout(o)), (i, r) => (u(), h("button", {
      type: "button",
      class: "dc-copy",
      "data-dc-copied": s.value ? "true" : "false",
      title: s.value ? "Copied" : e.label,
      "aria-label": e.label,
      onClick: l
    }, [
      s.value ? (u(), h("svg", Ai, [...r[1] || (r[1] = [
        S("path", { d: "M3 8.5l3.2 3L13 4.5" }, null, -1)
      ])])) : (u(), h("svg", Oi, [...r[0] || (r[0] = [
        S("rect", {
          x: "5.5",
          y: "5.5",
          width: "8",
          height: "9",
          rx: "1.5"
        }, null, -1),
        S("path", { d: "M10.5 3.5v-1a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h1" }, null, -1)
      ])]))
    ], 8, Mi));
  }
}), Ii = /* @__PURE__ */ z(Ri, [["__scopeId", "data-v-f4249d7f"]]), Bi = ["data-dc-copy", "data-dc-wrap", "data-dc-tone"], Hi = /* @__PURE__ */ q({
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
    const n = e, a = t, s = N(null), o = f(() => n.maxHeight === void 0 ? void 0 : { maxHeight: typeof n.maxHeight == "number" ? `${n.maxHeight}px` : n.maxHeight });
    function l() {
      return n.code ?? s.value?.textContent ?? "";
    }
    return (i, r) => (u(), h("div", {
      class: "dc-code",
      "data-dc-copy": e.copy ? "true" : "false",
      "data-dc-wrap": e.wrap ? "true" : "false",
      "data-dc-tone": e.tone
    }, [
      S("pre", {
        ref_key: "pre",
        ref: s,
        class: "dc-code__text dc-mono",
        style: oe(o.value)
      }, [
        Q(i.$slots, "default", {}, () => [
          J(P(e.code), 1)
        ], !0)
      ], 4),
      e.copy ? (u(), A(Ii, {
        key: 0,
        class: "dc-code__copy",
        text: l,
        label: e.copyLabel,
        onCopied: r[0] || (r[0] = (c) => a("copied", c)),
        onError: r[1] || (r[1] = (c) => a("error", c))
      }, null, 8, ["label"])) : M("", !0)
    ], 8, Bi));
  }
}), Cc = /* @__PURE__ */ z(Hi, [["__scopeId", "data-v-67b371dd"]]), Fi = 24, qi = /* @__PURE__ */ q({
  __name: "ShellLog",
  props: {
    fetchChunk: {},
    stripAnsi: { type: Boolean },
    maxHeight: { default: "460px" }
  },
  setup(e, { expose: t }) {
    const n = e, a = N(""), s = f(() => n.stripAnsi ? Wa(a.value) : a.value), o = N(null);
    let l = 0, i = null;
    function r() {
      return i ??= c().finally(() => {
        i = null;
      }), i;
    }
    async function c() {
      const { chunk: b, offset: x } = await n.fetchChunk(l);
      if (l = x, !b) return;
      const k = o.value, p = !k || k.scrollTop + k.clientHeight >= k.scrollHeight - Fi;
      a.value += b, p && (await rt(), o.value && (o.value.scrollTop = o.value.scrollHeight));
    }
    function d() {
      a.value = "", l = 0;
    }
    const m = f(() => n.maxHeight === void 0 ? void 0 : { maxHeight: typeof n.maxHeight == "number" ? `${n.maxHeight}px` : n.maxHeight });
    return t({ poll: r, reset: d }), (b, x) => (u(), h("pre", {
      ref_key: "pane",
      ref: o,
      class: "dc-log dc-mono",
      style: oe(m.value)
    }, P(s.value), 5));
  }
}), Pc = /* @__PURE__ */ z(qi, [["__scopeId", "data-v-2c86947e"]]), Vi = ["data-dc-theme"], Di = ["aria-labelledby", "aria-label"], Ki = {
  key: 1,
  class: "dc-dialog__actions"
}, Me = [], Wi = /* @__PURE__ */ q({
  __name: "ShellDialog",
  props: {
    open: { type: Boolean, default: !0 },
    title: { default: void 0 },
    label: { default: void 0 },
    to: { default: "body" },
    theme: { default: void 0 },
    accent: { default: void 0 },
    tokens: { default: void 0 },
    panelClass: { default: void 0 },
    bodyClass: { default: void 0 }
  },
  emits: ["close", "update:open"],
  setup(e, { emit: t }) {
    const n = e, a = t, { theme: s, style: o, adopt: l } = en(n), i = `${Kt() ?? "dc-dialog"}-title`, r = N(null);
    function c() {
      a("close"), a("update:open", !1);
    }
    const d = Symbol("dc-dialog");
    function m(v) {
      v.key !== "Escape" || v.defaultPrevented || Me[Me.length - 1] === d && (v.preventDefault(), c());
    }
    let b = !1;
    function x(v) {
      b = v.target === v.currentTarget;
    }
    function k(v) {
      v.target === v.currentTarget && b && c(), b = !1;
    }
    const p = [
      "[autofocus]",
      'input:not([disabled]):not([type="hidden"])',
      "select:not([disabled])",
      "textarea:not([disabled])",
      "button:not([disabled])",
      "a[href]",
      '[tabindex]:not([tabindex="-1"])'
    ].join(", ");
    let w = null;
    async function L() {
      Me.push(d), document.addEventListener("keydown", m), w = document.activeElement instanceof HTMLElement ? document.activeElement : null, l(), await rt(), (r.value?.querySelector("[autofocus]") ?? r.value?.querySelector(p) ?? r.value)?.focus();
    }
    function g() {
      const v = Me.indexOf(d);
      v !== -1 && (Me.splice(v, 1), document.removeEventListener("keydown", m), w?.isConnected && w.focus(), w = null);
    }
    return Ve(() => {
      n.open && L();
    }), se(
      () => n.open,
      (v) => {
        v ? L() : g();
      }
    ), pe(g), (v, _) => e.open ? (u(), A(it, {
      key: 0,
      to: e.to
    }, [
      S("div", {
        class: "dc-shell dc-layer dc-dialog",
        "data-dc-theme": $(s),
        style: oe($(o)),
        onPointerdown: x,
        onClick: k
      }, [
        S("div", {
          ref_key: "panel",
          ref: r,
          class: ce(["dc-dialog__panel", e.panelClass]),
          role: "dialog",
          "aria-modal": "true",
          tabindex: "-1",
          "aria-labelledby": e.title ? i : void 0,
          "aria-label": e.title ? void 0 : e.label
        }, [
          e.title ? (u(), h("h2", {
            key: 0,
            id: i,
            class: "dc-dialog__title"
          }, P(e.title), 1)) : M("", !0),
          S("div", {
            class: ce(["dc-dialog__body", e.bodyClass])
          }, [
            Q(v.$slots, "default", {}, void 0, !0)
          ], 2),
          v.$slots.actions ? (u(), h("div", Ki, [
            Q(v.$slots, "actions", {}, void 0, !0)
          ])) : M("", !0)
        ], 10, Di)
      ], 44, Vi)
    ], 8, ["to"])) : M("", !0);
  }
}), Ec = /* @__PURE__ */ z(Wi, [["__scopeId", "data-v-0cccf313"]]), zi = 4500, ji = 9e3, qe = N([]);
let En = 0;
function Sa(e) {
  qe.value = qe.value.filter((t) => t.id !== e);
}
function Ca(e, t = "ok") {
  En += 1;
  const n = En;
  qe.value = [...qe.value, { id: n, message: e, kind: t }], setTimeout(() => Sa(n), t === "err" ? ji : zi);
}
function Ui(e) {
  Ca(e instanceof Error ? e.message : String(e), "err");
}
function Qi() {
  return { toasts: Oa(qe), toast: Ca, toastError: Ui, dismiss: Sa };
}
const Gi = ["data-dc-theme"], Yi = ["data-dc-kind", "role"], Xi = /* @__PURE__ */ q({
  __name: "ShellToasts",
  props: {
    to: { default: "body" },
    theme: { default: void 0 },
    accent: { default: void 0 },
    tokens: { default: void 0 }
  },
  setup(e) {
    const t = e, { toasts: n } = Qi(), { theme: a, style: s, adopt: o } = en(t);
    return Ve(o), (l, i) => (u(), A(it, { to: e.to }, [
      S("div", {
        class: "dc-shell dc-layer dc-toasts",
        "data-dc-theme": $(a),
        style: oe($(s)),
        "aria-live": "polite"
      }, [
        (u(!0), h(W, null, X($(n), (r) => (u(), h("div", {
          key: r.id,
          class: "dc-toast",
          "data-dc-kind": r.kind,
          role: r.kind === "err" ? "alert" : void 0
        }, P(r.message), 9, Yi))), 128))
      ], 12, Gi)
    ], 8, ["to"]));
  }
}), Lc = /* @__PURE__ */ z(Xi, [["__scopeId", "data-v-d970211c"]]), Ji = 4, Zi = 8, ec = 180;
function tc(e, t, n, a = {}) {
  const s = a.gap ?? Ji, o = a.margin ?? Zi, l = a.flipBelow ?? ec, i = a.side ?? "below", r = {
    below: n.height - e.bottom - s - o,
    above: e.top - s - o
  }, c = i === "below" ? "above" : "below", d = r[i] < l && r[c] > r[i] ? c : i, m = Math.min(a.maxHeight ?? 1 / 0, Math.max(0, r[d])), b = Math.max(0, n.width - o * 2), x = Math.min(e.width, b), k = Math.min(Math.max(t, x), b), p = a.align === "end" ? e.right - k : e.left, w = Math.max(o, Math.min(p, n.width - k - o));
  return d === "below" ? { side: d, left: w, top: e.bottom + s, maxHeight: m, minWidth: x, maxWidth: b } : { side: d, left: w, bottom: n.height - e.top + s, maxHeight: m, minWidth: x, maxWidth: b };
}
const nc = ["data-dc-theme", "data-dc-side"], ye = [], ac = /* @__PURE__ */ q({
  inheritAttrs: !1,
  __name: "ShellPopover",
  props: {
    open: { type: Boolean, default: !1 },
    anchor: { default: null },
    side: { default: "below" },
    align: { default: "start" },
    maxHeight: { default: void 0 },
    to: { default: "body" },
    theme: { default: void 0 },
    accent: { default: void 0 },
    tokens: { default: void 0 }
  },
  emits: ["update:open", "close"],
  setup(e, { emit: t }) {
    const n = e, a = t, { theme: s, style: o, adopt: l } = en(n), i = N(null), r = N(null), c = { root: () => i.value };
    function d() {
      const v = n.anchor;
      v && (r.value = tc(
        v.getBoundingClientRect(),
        i.value?.offsetWidth ?? 0,
        { width: window.innerWidth, height: window.innerHeight },
        { side: n.side, align: n.align, maxHeight: n.maxHeight }
      ));
    }
    const m = f(() => {
      const v = r.value, _ = v ? {
        position: "fixed",
        left: `${v.left}px`,
        ...v.top !== void 0 ? { top: `${v.top}px` } : {},
        ...v.bottom !== void 0 ? { bottom: `${v.bottom}px` } : {},
        minWidth: `${v.minWidth}px`,
        maxWidth: `${v.maxWidth}px`,
        maxHeight: `${v.maxHeight}px`,
        overflowY: "auto"
      } : { position: "fixed", visibility: "hidden" };
      return { ...o.value, ..._ };
    });
    function b() {
      a("update:open", !1), a("close");
    }
    function x(v) {
      return i.value?.contains(v) || n.anchor?.contains(v) ? !0 : ye.slice(ye.indexOf(c) + 1).some((T) => T.root()?.contains(v));
    }
    function k(v) {
      const _ = v.target;
      _ && !x(_) && b();
    }
    function p(v) {
      v.key !== "Escape" || v.defaultPrevented || ye[ye.length - 1] === c && (v.preventDefault(), i.value?.contains(document.activeElement) && n.anchor?.focus(), b());
    }
    let w = null;
    async function L() {
      ye.includes(c) || (ye.push(c), l(), r.value = null, await rt(), d(), window.addEventListener("pointerdown", k, !0), document.addEventListener("keydown", p, !0), window.addEventListener("resize", d), window.addEventListener("scroll", d, !0), typeof ResizeObserver < "u" && i.value && (w = new ResizeObserver(() => d()), w.observe(i.value)));
    }
    function g() {
      const v = ye.indexOf(c);
      v !== -1 && (ye.splice(v, 1), window.removeEventListener("pointerdown", k, !0), document.removeEventListener("keydown", p, !0), window.removeEventListener("resize", d), window.removeEventListener("scroll", d, !0), w?.disconnect(), w = null);
    }
    return Ve(() => {
      n.open && L();
    }), se(
      () => n.open,
      (v) => {
        v ? L() : g();
      }
    ), se(() => n.anchor, () => {
      n.open && d();
    }), pe(g), (v, _) => e.open ? (u(), A(it, {
      key: 0,
      to: e.to
    }, [
      S("div", Tt({
        ref_key: "root",
        ref: i
      }, v.$attrs, {
        class: "dc-shell dc-layer dc-popover",
        "data-dc-theme": $(s),
        "data-dc-side": r.value?.side,
        style: m.value
      }), [
        Q(v.$slots, "default", {}, void 0, !0)
      ], 16, nc)
    ], 8, ["to"])) : M("", !0);
  }
}), Tc = /* @__PURE__ */ z(ac, [["__scopeId", "data-v-73fbd235"]]);
function Mc(e, t) {
  const n = N(!1);
  let a = null, s = !1, o = 0;
  const l = () => {
    o++, n.value = !1, a !== null && (clearTimeout(a), a = null);
  };
  function i(d) {
    a = setTimeout(() => void r(d), t);
  }
  async function r(d) {
    if (s || d !== o) return;
    let m;
    try {
      m = await e();
    } catch {
      m = !1;
    }
    s || d !== o || (m ? i(d) : l());
  }
  const c = () => {
    n.value || (n.value = !0, r(++o));
  };
  return ot(() => {
    s = !0, l();
  }, !0), { start: c, stop: l, polling: n };
}
function Oc(e, t = {}) {
  const n = t.key ?? ((o) => JSON.stringify(o)), a = me();
  let s = null;
  return Aa(() => {
    const o = e(), l = n(o);
    l !== s && (s = l, a.value = o);
  }), a;
}
function Ac(e = {}) {
  return { key: "ordinal", kind: "ordinal", label: "#", width: "52px", ...e };
}
function Nc(e = {}) {
  return { key: "status", role: "state", kind: "status", label: "State", sort: "state", width: "104px", ...e };
}
function Rc(e = {}) {
  return { key: "tint", role: "tint", ...e };
}
function Ic(e = {}) {
  return { key: "picture", role: "image", kind: "image", width: "56px", height: "40px", ...e };
}
function Bc(e, t = {}) {
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
function Hc(e, t = {}) {
  return {
    key: "secondary",
    role: "reference",
    label: e,
    sort: "reference",
    mono: !0,
    muted: !0,
    truncate: !0,
    ...t
  };
}
function Fc(e, t, n = {}) {
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
function qc(e, t, n = {}) {
  return { key: e, kind: "date", label: t, sort: e, width: "104px", mono: !0, muted: !0, ...n };
}
function Vc(e = {}) {
  return {
    key: "entityLabel",
    label: "Entity",
    sort: "entity",
    width: "130px",
    truncate: !0,
    class: "dc-table__entity",
    ...e
  };
}
function Dc(e, t, n = {}) {
  return { key: e, label: t, sort: e, truncate: !0, hideBelow: 900, ...n };
}
function Kc(e, t, n, a = {}) {
  return {
    key: e,
    label: t,
    value: (s) => Object.entries(n).filter(([o]) => s.fields[o] === !0).map(([, o]) => o),
    sort: e,
    muted: !0,
    truncate: !0,
    hideBelow: 1100,
    ...a
  };
}
function gt(e) {
  return typeof e == "number" ? e : typeof e == "string" && e.trim() !== "" ? Number(e) : Number.NaN;
}
function Wc(e) {
  const t = gt(e);
  return Number.isFinite(t) && t > 0 ? qa(t) : he;
}
function zc(e) {
  const t = gt(e);
  return Number.isFinite(t) && t > 0 ? Va(t) : he;
}
function jc(e) {
  const t = gt(e);
  return Number.isFinite(t) && t > 0 ? Da(t) : he;
}
function Uc(e) {
  const t = gt(e);
  return Number.isFinite(t) ? Ka(t) : he;
}
function sc(e) {
  if (e <= 0) return 0;
  const t = 10 ** Math.floor(Math.log10(e));
  for (const n of [1, 2, 5])
    if (e <= n * t) return n * t;
  return 10 * t;
}
function oc(e, t) {
  const n = /* @__PURE__ */ new Set();
  for (const a of e) {
    const s = a.fields[t];
    for (const o of Array.isArray(s) ? s : [s])
      typeof o == "string" && o && n.add(o);
  }
  return [...n].sort((a, s) => a.localeCompare(s));
}
function lc(e, t) {
  let n = 0;
  for (const a of e) {
    const s = a.fields[t];
    typeof s == "number" && s > n && (n = s);
  }
  return n;
}
function Qc(e, t, n, a = {}) {
  return {
    kind: "chips",
    key: t,
    label: n,
    options: oc(e, t),
    ...a.multiple ? { multiple: !0 } : {}
  };
}
function Gc(e, t, n) {
  return { kind: "range", key: t, label: n, min: 0, max: sc(lc(e, t)) };
}
function Yc(e, t, n) {
  return { kind: "toggle", key: e, label: t, text: n };
}
function Xc(e) {
  return e.filter((t) => t.kind === "chips" ? t.options.length > 1 : t.kind === "range" ? t.max > 0 : !0);
}
function Jc(e = "", t = "/") {
  const n = N(ie(e)), a = N(t), s = [`${a.value}${n.value}`];
  return {
    search: n,
    path: a,
    history: s,
    href(o, l) {
      return `${l ?? a.value}${ie(o)}`;
    },
    push(o, l) {
      l !== void 0 && (a.value = l), n.value = ie(o), s.push(`${a.value}${n.value}`);
    },
    replace(o, l) {
      l !== void 0 && (a.value = l), n.value = ie(o), s[s.length - 1] = `${a.value}${n.value}`;
    }
  };
}
function Ln(e) {
  const t = e.indexOf("?");
  if (t === -1) return "";
  const n = e.slice(t), a = n.indexOf("#");
  return ie(a === -1 ? n : n.slice(0, a));
}
function Zc(e) {
  const t = N(Ln(e.currentRoute.value.fullPath)), n = f(() => e.currentRoute.value.path), a = se(
    () => e.currentRoute.value.fullPath,
    (s) => {
      t.value = Ln(s);
    }
  );
  return {
    search: t,
    path: n,
    push: (s, o) => e.push(`${o ?? n.value}${ie(s)}`),
    replace: (s, o) => e.replace(`${o ?? n.value}${ie(s)}`),
    href: (s, o) => {
      const l = `${o ?? n.value}${ie(s)}`;
      return e.resolve?.(l).href ?? l;
    },
    dispose: a
  };
}
function eu(e, t, n = "/") {
  return (a) => {
    const s = a.params[t], o = Array.isArray(s) ? s.join("/") : s ?? "", l = a.query[$e], i = typeof l == "string" ? l : "", r = `${e}="${o.replace(/"/g, "")}"`;
    return { path: n, query: { ...a.query, [$e]: Ke(i, r) } };
  };
}
function tu(e, t = "/") {
  return (n) => ({ path: t, query: { ...n.query, [Le]: e } });
}
function nu(e) {
  const t = /* @__PURE__ */ new Map();
  for (const n of e) {
    const a = t.get(n.entityKey);
    a ? a.push(n) : t.set(n.entityKey, [n]);
  }
  return {
    query(n) {
      return Qn(n, (a) => t.get(a.key) ?? [], {
        undatedLast: !0,
        zeroIsAll: !0
      });
    }
  };
}
function au(e, t) {
  return e.query({ ...t, limit: Number.MAX_SAFE_INTEGER, offset: 0 }).rows;
}
const rc = {
  DataShell: oi,
  ShellHeader: va,
  RecordActions: Ht,
  ResultsArea: xa,
  SegmentedControl: ki,
  StatusPill: We,
  ListView: qt,
  CardsView: ya,
  GridView: _a,
  ImagesView: ga,
  TableView: ba,
  LinksView: wa,
  PreviewView: ka,
  TypeCardsView: $a
}, su = {
  install(e, t = {}) {
    const n = t.prefix ?? "";
    for (const [a, s] of Object.entries(rc))
      e.component(`${n}${a}`, s);
    t.route && e.provide(On, t.route), (t.theme || t.accent || t.tokens) && Hs({ theme: t.theme, accent: t.accent, tokens: t.tokens }, e);
  }
};
export {
  fc as COLUMN_BREAKPOINTS,
  dc as COLUMN_ROLES,
  ya as CardsView,
  Pn as ColumnCell,
  Ii as CopyButton,
  za as DEFAULT_ENTITY_VIEW,
  Mt as DEFAULT_SORT,
  An as DEFAULT_VIEW,
  Gs as DRAFT_DELAY,
  oi as DataShell,
  he as EMPTY_CELL,
  Yn as ENTITY_ALL,
  st as ENTITY_TERM,
  Fe as EXPRESSION_TERM,
  _a as GridView,
  su as HeaderContentLayoutPlugin,
  ga as ImagesView,
  wa as LinksView,
  qt as ListView,
  Ze as MOCK_TINTS,
  ze as MetricDrill,
  je as OpenMark,
  Xt as PARAM_DIR,
  Le as PARAM_ENTITY,
  $e as PARAM_EXPR,
  vt as PARAM_PAGE,
  Yt as PARAM_SORT,
  ft as PARAM_VIEW,
  uc as PILL_TONES,
  ec as POPOVER_FLIP_BELOW,
  Ji as POPOVER_GAP,
  Zi as POPOVER_MARGIN,
  nn as PinStar,
  ka as PreviewView,
  an as QueryMark,
  Oe as RECORD_STATUSES,
  Ut as RESULT_FIELDS,
  On as ROUTE_ADAPTER_KEY,
  Ht as RecordActions,
  xa as ResultsArea,
  la as SHELL_CONTEXT_KEY,
  at as SHELL_THEME_KEY,
  Ue as ScopeMark,
  ki as SegmentedControl,
  Se as SelectTick,
  $c as ShellCard,
  Cc as ShellCode,
  Ec as ShellDialog,
  Si as ShellFact,
  xc as ShellFacts,
  va as ShellHeader,
  Pc as ShellLog,
  To as ShellPager,
  Tc as ShellPopover,
  Lc as ShellToasts,
  Ft as StandingControl,
  Sc as StatusCounts,
  We as StatusPill,
  ji as TOAST_ERROR_MS,
  zi as TOAST_MS,
  ba as TableView,
  $a as TypeCardsView,
  Wt as VIEW_KINDS,
  fn as VIEW_LABELS,
  Ke as addTerm,
  Gt as andExpression,
  Wc as bytesCell,
  Fn as cellFull,
  Ee as cellText,
  Ge as cellTextOf,
  ue as cellValue,
  $t as changesResults,
  Qc as chipsFrom,
  pn as columnAlign,
  hn as columnClass,
  vn as columnKey,
  De as columnShortcut,
  Wn as columnShortcutOf,
  At as columnTruncates,
  Ya as columnsFor,
  Vn as compactShortcuts,
  Ga as countPages,
  Ra as createHistoryAdapter,
  Jc as createMemoryAdapter,
  nu as createMemoryDataSource,
  Ps as createMockDataSource,
  Zc as createVueRouterAdapter,
  qc as dateColumn,
  Za as defaultCellText,
  Je as defaultQuery,
  Re as defaultViewFor,
  Ia as detachableAdapter,
  St as drillExpression,
  zc as durationCell,
  jc as elapsedCell,
  Ua as emptyFacetValue,
  Ms as entityAddress,
  Vc as entityColumn,
  Ot as entityCount,
  tu as entityRedirect,
  ea as excludingTerm,
  He as expandShortcuts,
  Dc as facetColumn,
  ra as facetField,
  ua as facetValue,
  is as fieldHeading,
  Zn as fieldTerm,
  Ie as findEntity,
  Xn as findEntityByAddress,
  _e as findSort,
  Kc as flagColumn,
  Ae as fnv1a,
  Rn as focusEntity,
  qa as formatBytes,
  Xe as formatCount,
  Ha as formatDate,
  vc as formatDateTime,
  Va as formatDuration,
  Da as formatElapsed,
  ve as formatExpression,
  Te as formatInteger,
  Ba as formatMetric,
  Fa as formatOrdinal,
  Ka as formatPercent,
  ss as formatRange,
  be as formatTerm,
  Cs as generateRows,
  Ks as hasActiveFacets,
  Bc as identityColumn,
  wc as idsExpression,
  pc as isEntityScoped,
  Qa as isFacetActive,
  jt as isPristineQuery,
  Be as isRangeTerm,
  Bn as isTypeCardsQuery,
  Nn as isViewKind,
  mc as joinExpression,
  ta as liftTerm,
  fs as matchesExpression,
  Fc as metricColumn,
  kc as narrowPatch,
  vs as negateTerm,
  sc as niceMax,
  ie as normalizeSearch,
  hs as oppositeTerm,
  Ac as ordinalColumn,
  le as parseExpression,
  Ns as parseQuery,
  Uc as percentCell,
  Ic as pictureColumn,
  tc as placePopover,
  Wo as presentParts,
  ha as presentRow,
  yt as pressOptions,
  Is as provideShellContext,
  Hs as provideShellTheme,
  au as queryAll,
  Gc as rangeFrom,
  ut as rangeOf,
  _s as readDraft,
  gc as readExpression,
  eu as recordRedirect,
  Jn as recordTerm,
  Rs as recordsIn,
  Hc as referenceColumn,
  Rt as refineExpression,
  zt as resolveView,
  de as roleColumn,
  Hn as roleColumns,
  Ja as rowKey,
  Nt as sameTerm,
  ht as scopeTerm,
  nt as scopeTermFor,
  sa as scopedEntity,
  _c as searchFromQuery,
  Sn as serializeQuery,
  Os as sortAddress,
  ct as sortsFor,
  hc as splitExpression,
  Nc as stateColumn,
  Wa as stripAnsi,
  js as summarizeQuery,
  tn as summaryTerms,
  Zt as termStanding,
  Rc as tintColumn,
  yc as tintFor,
  Yc as toggleFacet,
  vr as useColumns,
  Ys as useDraft,
  yo as useEntityCounts,
  Er as useEntityPreviews,
  en as useLayerTheme,
  Mc as usePoll,
  xe as usePresentedRows,
  Us as useQueryState,
  Zs as useRecordNames,
  Qs as useResults,
  Z as useShellContext,
  Oc as useStableSchema,
  Qi as useToasts,
  Xc as usefulFacets,
  dn as viewAcross,
  da as withFacetValue,
  It as withStanding,
  bc as withoutFacet,
  aa as withoutOwnScope,
  ps as withoutTerm
};
