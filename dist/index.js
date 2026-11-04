import { ref as B, computed as f, inject as nn, provide as an, getCurrentInstance as Un, shallowRef as me, toValue as Me, watch as ae, onScopeDispose as xt, getCurrentScope as Qn, defineComponent as K, onMounted as ot, onBeforeUnmount as ye, openBlock as u, createBlock as A, Teleport as St, createElementVNode as S, mergeProps as Ve, unref as k, renderSlot as G, createCommentVNode as L, nextTick as Qe, createElementBlock as p, withKeys as Le, useSlots as Ct, useId as Pt, withCtx as Y, toDisplayString as E, createTextVNode as J, Fragment as D, renderList as X, withModifiers as Te, normalizeClass as le, withDirectives as Dt, normalizeStyle as oe, vModelText as ja, createVNode as z, reactive as wn, toHandlers as sn, resolveDynamicComponent as Ge, createSlots as Kt, useModel as kn, onBeforeUpdate as Ua, normalizeProps as Bt, guardReactiveProps as Qa, mergeModels as bn, vShow as $n, Comment as Ga, Text as Ya, readonly as Xa, watchEffect as Ja } from "vue";
import { MenuList as Za } from "menu-bar";
const on = ["list", "cards", "grid", "images", "table", "links", "preview"], je = ["ok", "running", "queued", "review", "failed"], Jc = [...je, "neutral", "accent"], Zc = [
  "identity",
  "reference",
  "metric",
  "state",
  "updated",
  "image",
  "tint"
], eu = [480, 620, 760, 900, 1100], Gn = Symbol("dc.routeAdapter");
function ce(e) {
  if (!e) return "";
  const t = e.replace(/^[?]/, "");
  return t ? `?${t}` : "";
}
function es() {
  const e = typeof window < "u", t = B(e ? ce(window.location.search) : ""), n = B(e ? window.location.pathname : "/"), a = () => {
    t.value = ce(window.location.search), n.value = window.location.pathname;
  };
  e && window.addEventListener("popstate", a);
  const s = (o, l, i) => {
    const r = ce(o);
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
      return e ? l !== void 0 && l !== window.location.pathname ? `${l}${ce(o)}` : `${window.location.pathname}${ce(o)}${window.location.hash}` : `${l ?? n.value}${ce(o)}`;
    },
    push: (o, l) => s(o, "push", l),
    replace: (o, l) => s(o, "replace", l),
    dispose: () => {
      e && window.removeEventListener("popstate", a);
    }
  };
}
function ts(e, t) {
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
      return e.href ? e.href(o, i) : `${i ?? e.path.value}${ce(o)}`;
    }
  };
}
function Ue(e) {
  let t = 2166136261;
  for (let n = 0; n < e.length; n++)
    t ^= e.charCodeAt(n), t = Math.imul(t, 16777619);
  return Math.abs(t);
}
function ns(e) {
  if (!Number.isFinite(e)) return "—";
  const t = Math.abs(e);
  return t >= 1e6 ? `${(e / 1e6).toFixed(1)}m` : t >= 1e3 ? `${(e / 1e3).toFixed(1)}k` : String(Math.round(e));
}
function pt(e) {
  if (!Number.isFinite(e)) return "—";
  const t = Math.round(e), n = Math.abs(t);
  return n < 1e3 ? String(t) : n < 9950 ? `${(t / 1e3).toFixed(1)}k` : n < 999500 ? `${Math.round(t / 1e3)}k` : `${(t / 1e6).toFixed(1)}m`;
}
function qe(e) {
  return Number.isFinite(e) ? Math.round(e).toLocaleString("en-US") : "—";
}
function as(e) {
  const t = new Date(e);
  if (Number.isNaN(t.getTime())) return "—";
  const n = String(t.getUTCDate()).padStart(2, "0"), a = String(t.getUTCMonth() + 1).padStart(2, "0");
  return `${n}.${a}.${t.getUTCFullYear()}`;
}
function ss(e) {
  return String(e + 1);
}
function tu(e, t) {
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
function os(e) {
  if (e == null || !Number.isFinite(e) || e < 0) return "—";
  if (e < 1e3) return `${e} B`;
  const t = ["kB", "MB", "GB", "TB"];
  let n = e, a = -1;
  for (; n >= 1e3 && a < t.length - 1; )
    n /= 1e3, a += 1;
  return `${n < 100 ? n.toFixed(1) : Math.round(n)} ${t[a]}`;
}
function rs(e) {
  if (!e || !Number.isFinite(e)) return "—";
  if (e < 1e3) return `${Math.round(e)}ms`;
  const t = e / 1e3;
  return t < 60 ? `${t.toFixed(1)}s` : `${Math.floor(t / 60)}m ${Math.round(t % 60)}s`;
}
function ls(e) {
  if (e == null || !Number.isFinite(e) || e <= 0)
    return "—";
  const t = Math.floor(e / 60);
  return t ? `${t}:${String(e % 60).padStart(2, "0")}` : `${e}s`;
}
function is(e) {
  return e == null || !Number.isFinite(e) ? "—" : `${Math.round(e * 100)}%`;
}
function cs(e) {
  return e.replace(/\x1b\[[0-9;?]*[ -/]*[@-~]/g, "");
}
const Yn = "cards", us = "table";
function Ye(e, t = {}) {
  const n = (s) => s && Xn(s) ? s : void 0;
  if (e === null) return n(t.view) ?? Yn;
  const a = t.landing === "entity" ? n(t.view) : void 0;
  return n(t.entityView) ?? a ?? us;
}
function xn(e, t, n, a = {}) {
  return a.viewAcrossTypes !== "default" && e !== Ye(t, a) ? e : Ye(n, a);
}
const Wt = "updated";
function Xn(e) {
  return typeof e == "string" && (e === "record" || on.includes(e));
}
const Sn = {
  list: "List",
  cards: "Cards",
  grid: "Grid",
  images: "Images",
  table: "Table",
  links: "Links",
  preview: "Preview",
  record: "Record"
}, ds = {
  list: "M6 4h7.5M6 8h7.5M6 12h7.5M2.5 4h.01M2.5 8h.01M2.5 12h.01",
  cards: "M2.5 2.5h11v4.5h-11zM2.5 9h11v4.5h-11z",
  grid: "M2.5 2.5h4.5v4.5h-4.5zM9 2.5h4.5v4.5H9zM2.5 9h4.5v4.5h-4.5zM9 9h4.5v4.5H9z",
  images: "M2.5 3h11v10h-11zM2.5 11l3.5-3.5 2.5 2.5 2-2 3 3M10.5 5.75h.01",
  table: "M2.5 3h11v10h-11zM2.5 6.5h11M2.5 9.75h11M6.5 6.5V13",
  links: "M6.75 9.25a2.5 2.5 0 0 0 3.54 0l2.12-2.12a2.5 2.5 0 0 0-3.54-3.54l-.7.7M9.25 6.75a2.5 2.5 0 0 0-3.54 0L3.59 8.87a2.5 2.5 0 0 0 3.54 3.54l.7-.7",
  preview: "M1.5 8S4 3.5 8 3.5 14.5 8 14.5 8 12 12.5 8 12.5 1.5 8 1.5 8zM6 8a2 2 0 1 0 4 0 2 2 0 1 0-4 0",
  record: "M4 2h5.5L12 4.5V14H4zM9.5 2v2.5H12M6 8h4M6 10.5h4"
};
function De(e, t) {
  if (e === "record" && !t?.includes(e)) return t?.[0] ?? Yn;
  const [n] = t ?? [];
  return n === void 0 || t?.includes(e) ? e : n;
}
function zt(e) {
  return typeof e.count == "number" ? pt(e.count) : e.count;
}
function Xe(e, t) {
  return t ? e.entities.find((n) => n.key === t) ?? null : null;
}
function Jn(e, t = {}) {
  const n = Xe(e, t.entity), a = e.entities[0];
  if (!n && !a) throw new Error(`Schema "${e.key}" declares no entities`);
  return n ?? a;
}
function Zn(e, t = null) {
  return e?.columns ?? t?.columns ?? [];
}
function Et(e, t = null) {
  if (e?.sorts?.length) return e.sorts;
  const n = /* @__PURE__ */ new Set(), a = [];
  for (const s of Zn(e, t))
    !s.sort || n.has(s.sort) || (n.add(s.sort), a.push({ key: s.sort, label: (s.label ?? s.sort).toLowerCase() }));
  return a;
}
const fs = { key: Wt, label: Wt };
function Ce(e, t, n = null) {
  const a = Et(e, n);
  return (t ? a.find((o) => o.key === t) : void 0) ?? a.find((o) => o.key === Wt) ?? a[0] ?? fs;
}
function vs(e) {
  switch (e.kind) {
    case "chips":
      return { kind: "chips", selected: [] };
    case "range":
      return { kind: "range", min: null, max: null };
    case "toggle":
      return { kind: "toggle", on: !1 };
  }
}
function ps(e) {
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
function rn(e) {
  return e.entity === null && e.expr.trim() === "";
}
function nu(e) {
  return e.entity !== null;
}
function ea(e, t) {
  return e.entity === null && De(e.view, t) === "cards";
}
function hs(e, t) {
  return t <= 0 ? 1 : Math.max(1, Math.ceil(e / t));
}
function ht(e, t = {}) {
  const a = t.landing === "entity" ? Jn(e, t) : null;
  return {
    entity: a?.key ?? null,
    view: Ye(a?.key ?? null, t),
    sort: Ce(a, t.sort).key,
    dir: t.dir === "asc" ? "asc" : "desc",
    expr: "",
    page: 1
  };
}
const ln = ["entity", "sort", "dir", "expr"];
function Ht(e) {
  return ln.some((t) => t in e);
}
const ge = "—";
function ve(e, t) {
  return e.find((n) => n.role === t);
}
function ta(e, t) {
  return e.filter((n) => n.role === t);
}
function ms(e, t) {
  const n = (t ? t.columns : e?.columns) ?? [], a = t ? "scoped" : "everything";
  return n.filter(
    (s) => s.role !== "tint" && ((s.when ?? "always") === "always" || s.when === a)
  );
}
const ys = ["id", "entityKey", "entityLabel"];
function ie(e, t) {
  if (e.value) return e.value(t);
  const n = e.field ?? e.key;
  if (n !== void 0) {
    if (t.fields && n in t.fields) return t.fields[n];
    if (ys.includes(n))
      return t[n];
  }
}
function Cn(e, t) {
  const n = e.key ?? e.field ?? e.label;
  return n?.trim() ? n.trim() : `column-${t}`;
}
function gs(e, t) {
  return e.id?.trim() ? e.id : `${e.entityKey || "row"}-${t}`;
}
function _s(e, t) {
  if (e == null || e === "") return ge;
  if (t === "number") {
    const n = typeof e == "number" ? e : Number(e);
    return Number.isFinite(n) ? ns(n) : String(e);
  }
  return t === "date" ? as(String(e)) : Array.isArray(e) ? e.length ? e.join(", ") : ge : String(e);
}
function Oe(e, t) {
  const n = ie(e, t);
  return e.format ? e.format(n, t) : _s(n, e.kind);
}
function ws(e) {
  return typeof e == "number" ? Number.isFinite(e) ? String(e) : "" : typeof e == "string" ? e : Array.isArray(e) ? e.join(", ") : "";
}
function na(e, t) {
  const n = Oe(e, t), a = ws(ie(e, t));
  return a && a !== n ? a : n;
}
function vt(e, t) {
  return e ? Oe(e, t) : "";
}
function Pn(e) {
  return e.align ? e.align : e.kind === "number" || e.kind === "ordinal" ? "right" : "left";
}
const ks = {
  ordinal: "dc-table__num",
  number: "dc-table__number",
  date: "dc-table__date",
  status: "dc-table__state"
};
function En(e) {
  return [ks[e.kind ?? "text"], e.class].filter(Boolean).join(" ");
}
function jt(e) {
  if (e.truncate !== void 0) return e.truncate;
  const t = e.kind ?? "text";
  return t === "text" || t === "number" || t === "date";
}
const bs = /^([A-Za-z_][\w.-]*)\s*(>=|<=|:|=|>|<)\s*(.*)$/, Mn = "-?(?:\\d+\\.?\\d*|\\.\\d+)", $s = new RegExp(`^(${Mn})?\\.\\.(${Mn})?$`);
function Mt(e) {
  const t = $s.exec(e.trim());
  if (!t || t[1] === void 0 && t[2] === void 0) return null;
  const n = t[1] === void 0 ? null : Number(t[1]), a = t[2] === void 0 ? null : Number(t[2]);
  return n !== null && a !== null && n > a ? { min: a, max: n } : { min: n, max: a };
}
function xs(e) {
  return `${e.min ?? ""}..${e.max ?? ""}`;
}
function Je(e) {
  return e.kind === "field" && (e.comparator === ":" || e.comparator === "=") && Mt(e.value) !== null;
}
function Ss(e) {
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
function re(e) {
  const t = e.trim();
  if (!t) return [];
  const n = [];
  let a = [];
  for (const s of Ss(t)) {
    const o = s.toUpperCase();
    if (o === "AND" || o === "&&") continue;
    if (o === "OR" || o === "||") {
      a.length && n.push(a), a = [];
      continue;
    }
    const l = s.length > 1 && s.startsWith("-"), i = l ? s.slice(1) : s, r = l ? { negated: !0 } : {}, c = bs.exec(i);
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
const Pe = (e) => e.toLowerCase().replace(/\s+/g, ""), aa = [
  ["status", "state"],
  ["state", "state"],
  ["updated", "updated"],
  ["date", "updated"],
  ["name", "identity"],
  ["ref", "reference"]
];
function Cs(e, t, n) {
  const a = Pe(e), s = n.columns ?? [];
  if (a === "entity") return t.entityKey;
  if (e in t.fields) return t.fields[e];
  const o = s.find(
    (c) => c.key?.toLowerCase() === e.toLowerCase() || c.field?.toLowerCase() === e.toLowerCase() || c.label !== void 0 && Pe(c.label) === a
  );
  if (o) return ie(o, t);
  const l = n.facets.find(
    (c) => c.key.toLowerCase() === a || Pe(c.label) === a
  );
  if (l && l.key in t.fields) return t.fields[l.key];
  const i = aa.find(([c]) => c === a)?.[1];
  if (i) {
    const c = ve(s, i);
    if (c) return ie(c, t);
  }
  const r = /^metric(\d+)$/.exec(a);
  if (r) {
    const c = ta(s, "metric")[Number(r[1]) - 1];
    if (c) return ie(c, t);
  }
}
function rt(e) {
  return (e.toLowerCase().match(/[\p{L}\p{N}]+/gu) ?? []).map((t) => t.charAt(0)).join("");
}
const Ln = /^[a-z_][\w.-]*$/;
function Lt(e) {
  const t = (e.key ?? e.field)?.toLowerCase();
  if (t !== void 0) return Ln.test(t) ? t : void 0;
  const n = e.label === void 0 ? void 0 : Pe(e.label);
  return n !== void 0 && Ln.test(n) ? n : void 0;
}
function cn(e, t) {
  const n = Pe(e);
  return !!t?.entities.some((a) => a.scope && Pe(a.scope) === n);
}
function Ps(e, t, n) {
  const a = Pe(e);
  if (a === "entity" || aa.some(([o]) => o === a) || /^metric\d+$/.test(a) || cn(e, n)) return !0;
  const s = (o) => o !== void 0 && Pe(o) === a;
  return (t.columns ?? []).some(
    (o) => s(o.key) || s(o.field) || s(o.label)
  ) || t.facets.some((o) => s(o.key) || s(o.label));
}
function Ze(e, t, n) {
  return t ? oa(e, (a) => {
    const s = ra(a, t, n);
    return s && Lt(s);
  }) : e;
}
function sa(e, t, n) {
  return t ? oa(e, (a) => {
    if (cn(a, n)) return;
    const s = (t.columns ?? []).find((o) => Lt(o) === a);
    return s && la(s, t, n);
  }) : e;
}
function Es(e, t, n) {
  if (!t || cn(e, n)) return;
  const a = t.facets.find((s) => s.key.toLowerCase() === e);
  return a ? a.label : (t.columns ?? []).find((s) => Lt(s) === e)?.label;
}
function oa(e, t) {
  let n = !1;
  const a = re(e).map(
    (s) => s.map((o) => {
      if (o.kind !== "field") return o;
      const l = t(o.field);
      return !l || l === o.field ? o : (n = !0, { ...o, field: l });
    })
  );
  return n ? he(a) : e;
}
function ra(e, t, n) {
  if (!(!e || Ps(e, t, n)))
    return (t.columns ?? []).find(
      (a) => a.label !== void 0 && rt(a.label) === e
    );
}
function la(e, t, n) {
  if (!t || e.label === void 0 || !Lt(e)) return;
  const a = rt(e.label);
  return ra(a, t, n) === e ? a : void 0;
}
function Ft(e, t) {
  const n = e.toLowerCase(), a = t.toLowerCase();
  if (!a.includes("*")) return n.includes(a);
  const s = a.replace(/[.+?^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*");
  return new RegExp(s).test(n);
}
function Tn(e, t) {
  return e.toLowerCase() === t.toLowerCase();
}
function Ms(e, t, n, a) {
  if (e.kind === "text") {
    const r = n.columns ?? [];
    return ["identity", "reference"].some((c) => {
      const d = ve(r, c), m = d ? ie(d, t) : void 0;
      return typeof m == "string" && Ft(m, e.value);
    });
  }
  const s = Cs(e.field, t, n);
  if (s === void 0) return a?.has(e.field) ? !1 : null;
  const o = Je(e) ? Mt(e.value) : null;
  if (o) {
    if (Array.isArray(s) || typeof s == "boolean") return null;
    const r = typeof s == "number" ? s : Number(s);
    return Number.isFinite(r) ? (o.min === null || r >= o.min) && (o.max === null || r <= o.max) : null;
  }
  if (Array.isArray(s))
    return e.comparator === ":" || e.comparator === "=" ? s.some(
      (c) => e.comparator === "=" ? Tn(String(c), e.value) : Ft(String(c), e.value)
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
    return e.comparator === "=" ? Tn(String(s), e.value) : Ft(String(s), e.value);
  }
  const l = Number(e.value), i = typeof s == "number" ? s : Number(s);
  return !Number.isFinite(l) || !Number.isFinite(i) ? null : Ls(e.comparator, i, l);
}
function On(e, t, n, a) {
  const s = Ms(e, t, n, a);
  return s === null ? !0 : e.negated ? !s : s;
}
function Ls(e, t, n) {
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
function Nn(e) {
  return e.kind === "field" && !e.negated && (e.comparator === ":" || e.comparator === "=") && !Je(e);
}
const An = /* @__PURE__ */ new WeakMap();
function Ts(e) {
  if (!e?.strictScopes) return null;
  let t = An.get(e);
  return t || (t = new Set(
    e.entities.flatMap((n) => n.scope ? [n.scope.toLowerCase()] : [])
  ), An.set(e, t)), t;
}
function Os(e, t, n, a) {
  if (!e.length) return !0;
  const s = Ts(a);
  return e.some((o) => {
    const l = /* @__PURE__ */ new Map();
    for (const i of o)
      Nn(i) && l.set(
        i.field,
        (l.get(i.field) ?? !1) || On(i, t, n, s)
      );
    return o.every(
      (i) => Nn(i) ? l.get(i.field) === !0 : On(i, t, n, s)
    );
  });
}
function In(e) {
  return /[\s"']/.test(e) ? `"${e.replace(/["']/g, "")}"` : e;
}
function we(e) {
  const t = e.negated ? "-" : "";
  return e.kind === "text" ? t + In(e.value) : `${t}${e.field}${e.comparator}${In(e.value)}`;
}
function Ns(e) {
  if (!e.negated) return { ...e, negated: !0 };
  const { negated: t, ...n } = e;
  return n;
}
function he(e) {
  return e.filter((t) => t.length).map((t) => t.map(we).join(" ")).join(" OR ");
}
function As(e, t, n) {
  return e.map((a, s) => s === t ? a.filter((o, l) => l !== n) : a).filter((a) => a.length);
}
function au(e) {
  const t = re(e);
  if (t.length > 1) return { parts: [], text: e.trim() };
  const n = t[0] ?? [];
  return {
    parts: n.filter((a) => a.kind === "field"),
    text: n.filter((a) => a.kind === "text").map(we).join(" ")
  };
}
function su(e, t) {
  return [...e.map(we), t.trim()].filter(Boolean).join(" ");
}
const Rn = (e, t) => e.toLowerCase() === t.toLowerCase();
function Ut(e, t) {
  return !!e.negated == !!t.negated && ia(e, t);
}
function Is(e, t) {
  return !!e.negated != !!t.negated && ia(e, t);
}
function ia(e, t) {
  return e.kind === "field" ? t.kind === "field" && e.field === t.field && e.comparator === t.comparator && Rn(e.value, t.value) : t.kind === "text" && Rn(e.value, t.value);
}
function Rs(e, t) {
  return t.filter((n) => !e.some((a) => Ut(a, n)));
}
function un(e, t) {
  return ca(e, t, (n) => n);
}
function et(e, t) {
  return ca(
    e,
    t,
    (n, a) => n.filter((s) => !a.some((o) => Is(s, o)))
  );
}
const Bs = /^[A-Za-z_][\w.-]*\s*(?:>=|<=|:|=|>|<)$/;
function Hs(e) {
  return he(
    re(e).map(
      (t) => t.filter(
        (n) => n.kind !== "text" || n.value !== "-" && !Bs.test(n.value)
      )
    ).filter((t) => t.length > 0)
  );
}
function ca(e, t, n) {
  const a = re(e), s = re(t);
  return a.length ? s.length ? he(
    a.flatMap(
      (o) => s.map((l) => [...n(o, l), ...Rs(o, l)])
    )
  ) : he(a) : he(s);
}
const ua = (e) => e.kind === "date" || e.role === "updated";
function Fs(e) {
  if (!e) return () => 0;
  const n = (e.kind ?? "text") === "number" || e.role === "metric", a = ua(e);
  return (s, o) => {
    const l = ie(e, s), i = ie(e, o);
    return n ? Number(i ?? 0) - Number(l ?? 0) : a ? Date.parse(String(i ?? "")) - Date.parse(String(l ?? "")) : String(i ?? "").localeCompare(String(l ?? ""));
  };
}
function Bn(e, t) {
  return !t || !ua(t) ? !1 : !Number.isFinite(Date.parse(String(ie(t, e) ?? "")));
}
function da({ query: e, schema: t, entity: n, limit: a, offset: s }, o, l) {
  const i = re(e.expr), r = n ? [n] : t.entities;
  let c = 0;
  const d = [];
  for (const b of r)
    for (const P of o(b))
      c += 1, Os(i, P, b, t) && d.push(P);
  const m = Ce(n, e.sort, t), w = Zn(n, t).find((b) => b.sort === m.key), g = l.undatedLast ? d.filter((b) => !Bn(b, w)) : d, _ = l.undatedLast ? d.filter((b) => Bn(b, w)) : [];
  g.sort(Fs(w)), e.dir === "asc" && g.reverse();
  const v = _.length ? [...g, ..._] : g;
  return {
    // One page out of the middle. `total` stays the whole match, which is what
    // the shell counts pages with.
    rows: l.zeroIsAll && a <= 0 ? v.slice(s) : v.slice(s, s + a),
    total: d.length,
    unfiltered: d.length === c
  };
}
const mt = [
  "oklch(0.36 0.06 240)",
  "oklch(0.34 0.07 290)",
  "oklch(0.36 0.06 160)",
  "oklch(0.38 0.06 80)",
  "oklch(0.35 0.07 30)",
  "oklch(0.34 0.05 200)"
];
function ou(e) {
  return mt[Ue(e) % mt.length];
}
function fa(e, t) {
  return `${e}_${1e4 + t * 7}`;
}
const qs = 7, Vs = 3;
function Ds(e, t, n, a) {
  const s = (t * qs + Ue(n)) % a, o = [];
  for (let l = 0; l < Math.min(Vs, a); l++)
    o.push(fa(e, (s + l) % a));
  return o;
}
function Ks(e, t) {
  switch (e.kind) {
    case "chips":
      return e.multiple ? Ws(e.options, t) : e.options[t % e.options.length] ?? "";
    case "range": {
      const n = Math.max(0, e.max - e.min);
      return e.min + (n === 0 ? 0 : t % (n + 1));
    }
    case "toggle":
      return t % 3 === 0;
  }
}
function Ws(e, t) {
  if (!e.length) return [];
  const n = 1 + (t >> 5) % Math.min(3, e.length), a = t % e.length, s = /* @__PURE__ */ new Set();
  for (let o = 0; o < n; o++) s.add((a + o) % e.length);
  return [...s].sort((o, l) => o - l).map((o) => e[o]);
}
function zs(e, t) {
  const { hash: n, sample: a, revision: s, updatedAt: o } = t, l = s ? ` · rev ${s + 1}` : "";
  switch (e.role) {
    case "identity":
      return `${a[0]}${l}`;
    case "reference":
      return s ? `${a[1]}-${s + 1}` : a[1];
    case "state":
      return je[n % je.length];
    case "updated":
      return o;
    case "tint":
      return mt[n % mt.length];
    case "metric":
      return 1 + n % 940;
  }
  switch (e.kind) {
    case "number":
      return 1 + n % 940;
    case "status":
      return je[n % je.length];
    case "date":
      return o;
    default:
      return;
  }
}
function js(e, t = {}) {
  const n = t.population ?? 48, a = t.seed ?? "", s = t.now ?? /* @__PURE__ */ new Date("2026-08-25T00:00:00Z"), o = e.samples, l = t.scopes ?? [];
  if (!o.length) return [];
  const i = [];
  for (let r = 0; r < n; r++) {
    const c = o[r % o.length], d = Math.floor(r / o.length), m = Ue(`${a}:${e.key}:${c[0]}:${r}`), w = fa(e.key, r), g = new Date(s.getTime() - m % 900 * 36e5).toISOString(), _ = {};
    for (const v of e.columns ?? []) {
      const b = v.field ?? v.key;
      if (!b || v.value) continue;
      const P = zs(v, {
        hash: Ue(`${m}:${b}`),
        sample: c,
        revision: d,
        updatedAt: g
      });
      P !== void 0 && (_[b] = P);
    }
    for (const v of e.facets)
      _[v.key] = Ks(v, Ue(`${m}:${v.key}`));
    for (const [v, b] of l)
      _[v] = b === e.key ? w : Ds(b, r, v, n);
    i.push({ id: w, entityKey: e.key, entityLabel: e.label, fields: _ });
  }
  return i;
}
function Us(e = {}) {
  const t = /* @__PURE__ */ new Map(), n = (a, s) => {
    const o = t.get(a.key);
    if (o) return o;
    const l = e.scopes ?? s.entities.flatMap(
      (r) => r.scope ? [[r.scope, r.key]] : []
    ), i = js(a, { ...e, scopes: l });
    return t.set(a.key, i), i;
  };
  return {
    query(a) {
      return da(a, (s) => n(s, a.schema), {
        undatedLast: !1,
        zeroIsAll: !1
      });
    }
  };
}
const We = "e", Tt = "v", dn = "s", fn = "d", Ne = "q", Ot = "p", va = "*", Qs = [
  We,
  Tt,
  dn,
  fn,
  Ne,
  Ot
], Gs = [
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
function yt(e) {
  let t = encodeURIComponent(e);
  for (const [n, a] of Gs) t = t.replace(n, a);
  return t;
}
function pe(e) {
  try {
    return decodeURIComponent(e.replace(/\+/g, " "));
  } catch {
    return e.replace(/\+/g, " ");
  }
}
function vn(e) {
  const t = e.replace(/^[?]/, "");
  if (!t) return [];
  const n = [];
  for (const a of t.split("&")) {
    if (!a) continue;
    const s = a.indexOf("="), o = s === -1 ? a : a.slice(0, s), l = s === -1 ? "" : a.slice(s + 1);
    n.push([pe(o), l]);
  }
  return n;
}
function Ys(e) {
  return Qs.includes(e);
}
function Nt(e, t) {
  if (!(!t || e.some((n) => n.key === t)))
    return e.find((n) => rt(n.label) === t);
}
function Xs(e, t) {
  const n = rt(e.label);
  return Nt(t.entities, n)?.key === e.key ? n : e.key;
}
function pa(e, t) {
  return t ? Xe(e, t) ?? Nt(e.entities, t) ?? null : null;
}
function Js(e, t) {
  const n = rt(e.label);
  return Nt(t, n)?.key === e.key ? n : e.key;
}
function Zs(e, t) {
  return t.some((n) => n.key === e) ? e : Nt(t, e)?.key ?? e;
}
function eo(e, t, n = {}) {
  const a = ht(t, n), s = new Map(vn(e)), o = s.get(We), l = o === void 0 ? a.entity : pe(o), i = l === va ? null : pa(t, l), r = s.get(Tt), c = r && Xn(pe(r)) ? pe(r) : Ye(i?.key ?? null, n), d = s.get(dn), m = Ce(
    i,
    d ? Zs(pe(d), Et(i, t)) : n.sort,
    t
  ), w = s.get(fn), g = w ? pe(w) === "asc" ? "asc" : "desc" : a.dir, _ = s.get(Ne), v = s.get(Ot), b = v === void 0 ? 1 : Number(pe(v)), P = Number.isFinite(b) ? Math.max(1, Math.floor(b)) : 1;
  return {
    entity: i?.key ?? null,
    view: c,
    sort: m.key,
    dir: g,
    expr: _ === void 0 ? "" : Ze(pe(_), i, t),
    page: P
  };
}
function Hn(e, t, n = {}, a = "") {
  const s = ht(t, n), o = Xe(t, e.entity), l = vn(a).filter(([m]) => !Ys(m)), i = [], r = (m, w) => i.push([m, yt(w)]), c = o?.key ?? null;
  if (c !== s.entity && r(We, o ? Xs(o, t) : va), e.view !== Ye(c, n) && r(Tt, e.view), e.sort !== s.sort) {
    const m = Et(o, t), w = m.find((g) => g.key === e.sort);
    r(dn, w ? Js(w, m) : e.sort);
  }
  e.dir !== s.dir && r(fn, e.dir), e.expr.trim() !== "" && r(Ne, sa(e.expr, o, t)), e.page > 1 && r(Ot, String(e.page));
  const d = [
    ...l.map(([m, w]) => [yt(m), w]),
    ...i
  ];
  return d.length ? `?${d.map(([m, w]) => w === "" ? m : `${m}=${w}`).join("&")}` : "";
}
function ru(e) {
  const t = [];
  for (const [n, a] of Object.entries(e))
    for (const s of Array.isArray(a) ? a : [a]) {
      if (typeof s != "string") continue;
      const o = yt(n);
      t.push(s === "" ? o : `${o}=${yt(s)}`);
    }
  return t.length ? `?${t.join("&")}` : "";
}
function lu(e, t) {
  const n = new Map(vn(e)), a = n.get(Ne), s = a === void 0 ? "" : pe(a);
  if (!t) return s;
  const o = n.get(We);
  return Ze(
    s,
    o === void 0 ? null : pa(t, pe(o)),
    t
  );
}
function lt(e, t) {
  return ha(e, t.id);
}
function ha(e, t) {
  const n = e?.scope;
  return n ? ma(n, t) : null;
}
function ma(e, t) {
  return `${e}="${t.replace(/"/g, "")}"`;
}
function iu(e, t) {
  const n = typeof e == "string" ? e : e?.scope;
  if (!n) return null;
  const a = t.filter((s) => s.replace(/"/g, "") !== "").map((s) => ma(n, s));
  return a.length ? a.join(" ") : null;
}
function At(e, t) {
  if (e.kind !== "field" || t.kind !== "field") return Ut(e, t);
  const n = (a) => a.comparator === ":" || a.comparator === "=";
  return Ut(e, { ...t, comparator: n(e) && n(t) ? e.comparator : t.comparator });
}
function gt(e, t) {
  return At(e, Ns(t));
}
function _t(e, t) {
  return lt(
    e.entities.find((n) => n.key === t.entityKey),
    t
  );
}
function it(e, t) {
  if (!t) return e;
  const n = e.trim();
  if (!n) return t;
  const [a] = re(t).flat();
  if (!a) return n;
  const s = re(n);
  return s.some((i) => i.some((r) => At(r, a))) ? n : s.some((i) => i.some((r) => gt(r, a))) ? he(
    s.map(
      (i) => i.map((r) => gt(r, a) ? a : r)
    )
  ) : `${n} ${t}`;
}
function ya(e) {
  if (!e) return null;
  const t = e.trim();
  return t ? t.startsWith("-") ? t.slice(1) : `-${t}` : null;
}
function pn(e, t) {
  if (!t || !e.trim()) return null;
  const [n] = re(t).flat();
  if (!n) return null;
  const a = re(e).flat();
  return a.some((s) => At(s, n)) ? n.negated ? "out" : "in" : a.some((s) => gt(s, n)) ? n.negated ? "in" : "out" : null;
}
function ga(e, t) {
  if (!t || !e.trim()) return e;
  const [n] = re(t).flat();
  if (!n) return e;
  const a = re(e), s = a.map(
    (o) => o.filter((l) => !At(l, n) && !gt(l, n))
  );
  return s.every((o, l) => o.length === a[l]?.length) ? e : he(s);
}
function Qt(e, t, n) {
  return t ? n === null ? ga(e, t) : it(e, n === "out" ? ya(t) : t) : e;
}
function Gt(e, t) {
  const n = t.shiftKey ? `noopener,popup,width=${window.outerWidth},height=${window.outerHeight}` : "noopener";
  window.open(e, "_blank", n);
}
function _a() {
  const e = window.getSelection?.();
  return !!e && !e.isCollapsed;
}
function Yt(e) {
  return e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0;
}
function tt(e) {
  return e.altKey ? { exclude: !0 } : {};
}
function qt(e, t, n, a = {}) {
  const s = _t(e, n);
  return it(t.expr, a.exclude ? ya(s) : s);
}
function wa(e, t) {
  const n = e?.scope?.toLowerCase();
  if (!n || e?.keepsScope || !t.trim()) return t;
  const a = re(t), s = a.map(
    (o) => o.filter((l) => l.kind !== "field" || l.field !== n)
  );
  return s.every((o, l) => o.length === a[l]?.length) ? t : he(s);
}
function ka(e, t) {
  const n = t.toLowerCase();
  return e.entities.find((a) => a.scope?.toLowerCase() === n) ?? null;
}
function ba(e, t, n) {
  if (!t || !n) return null;
  const a = ka(e, t);
  return a ? { entity: a, id: n } : null;
}
function to(e, t) {
  const n = [], a = /* @__PURE__ */ new Set();
  for (const s of t)
    for (const o of re(s).flat()) {
      if (o.kind !== "field" || o.negated) continue;
      const l = ba(e, o.field, o.value);
      if (!l) continue;
      const i = `${l.entity.key}:${l.id.toLowerCase()}`;
      a.has(i) || (a.add(i), n.push({ entityKey: l.entity.key, id: l.id }));
    }
  return n;
}
function cu(e, t, n = "cards") {
  return {
    // An expression with nothing in it is no parameter, as the shell writes it.
    [Ne]: it(e, t) || void 0,
    [We]: void 0,
    [Tt]: n,
    [Ot]: void 0
  };
}
const $a = Symbol("dc.shellContext");
function no(e) {
  const t = e.liveQuery ? e : ao(e);
  return an($a, t), t;
}
function ao(e) {
  const t = e.draft ?? B("");
  return {
    draft: t,
    liveQuery: e.query,
    drafting: f(() => !1),
    commitDraft() {
      const n = t.value.trim();
      n && (e.setExpression(
        et(e.query.value.expr, Ze(n, e.entity.value, e.schema.value))
      ), t.value = "");
    },
    abandonDraft() {
      t.value = "";
    },
    ...e
  };
}
function Z() {
  const e = nn($a, null);
  if (!e)
    throw new Error(
      "[appfr] No shell context found. Render this component inside <DataShell>."
    );
  return e;
}
const wt = Symbol("dc-shell-theme");
function Xt(e) {
  return {
    read: () => ({
      theme: Me(e.theme),
      accent: Me(e.accent),
      tokens: Me(e.tokens)
    })
  };
}
function so(e, t) {
  t ? t.provide(wt, Xt(e)) : an(wt, Xt(e));
}
function oo(e) {
  const t = Un();
  an(wt, {
    ...Xt(e),
    element: () => t?.proxy?.$el ?? null
  });
}
function hn(e) {
  const t = Un(), n = nn(wt, null), a = me(null);
  function s() {
    const r = t?.proxy?.$el, d = (r instanceof Element ? r : r?.parentElement)?.closest(".dc-shell");
    if (!d) {
      a.value = null;
      return;
    }
    const m = {};
    for (const w of Array.from(d.style))
      w.startsWith("--") && (m[w] = d.style.getPropertyValue(w));
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
function nt(e) {
  return e.key.toLowerCase();
}
const ro = /* @__PURE__ */ new Set([">", ">=", "<", "<="]);
function xa(e, t) {
  if (e.kind !== "field" || e.negated || e.field !== nt(t)) return !1;
  const n = e.comparator === ":" || e.comparator === "=";
  switch (t.kind) {
    case "range":
      return Je(e) || ro.has(e.comparator);
    case "chips":
      return n && !Je(e) && Sa(t.options, e.value) !== void 0;
    case "toggle":
      return n && lo(e.value);
  }
}
function Sa(e, t) {
  const n = t.toLowerCase();
  return e.find((a) => a.toLowerCase() === n);
}
function lo(e) {
  const t = e.toLowerCase();
  return t === "true" || t === "yes";
}
function Ca(e, t) {
  const n = (re(e)[0] ?? []).filter((a) => xa(a, t));
  switch (t.kind) {
    case "range": {
      let a = null, s = null;
      for (const o of n) {
        const l = Mt(o.value), i = Number(o.value);
        l ? (l.min !== null && (a = l.min), l.max !== null && (s = l.max)) : Number.isFinite(i) && (o.comparator.startsWith(">") ? a = i : s = i);
      }
      return { kind: "range", min: a, max: s };
    }
    case "chips": {
      const a = new Set(n.map((s) => Sa(t.options, s.value)));
      return { kind: "chips", selected: t.options.filter((s) => a.has(s)) };
    }
    case "toggle":
      return { kind: "toggle", on: n.length > 0 };
  }
}
function io(e, t) {
  const n = nt(e);
  switch (t.kind) {
    case "range":
      return t.min === null && t.max === null ? [] : [{ kind: "field", field: n, comparator: ":", value: xs(t) }];
    case "chips":
      return t.selected.map((a) => ({ kind: "field", field: n, comparator: "=", value: a }));
    case "toggle":
      return t.on ? [{ kind: "field", field: n, comparator: ":", value: "true" }] : [];
  }
}
function Pa(e, t, n) {
  const a = io(t, n), s = re(e), o = (s.length ? s : [[]]).map((l) => [
    ...l.filter((i) => !xa(i, t)),
    ...a
  ]);
  return he(o);
}
function uu(e, t) {
  return Pa(e, t, vs(t));
}
function co(e, t) {
  return (t?.facets ?? []).some((n) => ps(Ca(e, n)));
}
const kt = "entity", at = "expr", uo = { ">=": "≥", "<=": "≤", ">": ">", "<": "<" };
function fo(e, t, n) {
  if (e.kind !== "field") return we(e);
  const a = Es(e.field, t, n);
  if (a === void 0) return we(e);
  const s = e.negated ? "-" : "", o = Je(e) ? Mt(e.value) : null;
  if (o) {
    const i = o.min !== null && o.max !== null ? `${o.min} ≤ ${a} ≤ ${o.max}` : o.max !== null ? `${a} ≤ ${o.max}` : `${a} ≥ ${o.min}`;
    return s + i;
  }
  const l = uo[e.comparator];
  return l ? `${s}${a} ${l} ${e.value}` : we({ ...e, field: a });
}
function bt(e, t, n = null) {
  const a = [];
  return t && a.push({
    id: kt,
    label: `entity:${t.key}`,
    facetKey: kt
  }), re(e.expr).forEach((s, o) => {
    s.forEach((l, i) => {
      a.push({
        id: `${at}:${o}:${i}`,
        label: fo(l, t, n),
        address: sa(we(l), t, n),
        facetKey: at,
        group: o,
        index: i,
        ...l.kind === "field" ? { field: l.field, value: l.value } : {},
        ...l.negated ? { negated: !0 } : {}
      });
    });
  }), a;
}
function vo(e, t, n = null) {
  if (rn(e)) {
    const o = Ce(t, e.sort, n);
    return `everything · ${e.view} · ${o.label}`;
  }
  const a = bt(e, t).filter((o) => o.facetKey !== at).map((o) => o.label), s = e.expr.trim();
  return s && a.push(`"${s}"`), a.join(" · ");
}
function po(e) {
  const { adapter: t } = e, n = f(() => Me(e.schema)), a = f(() => Me(e.defaults) ?? {}), s = f(() => eo(t.search.value, n.value, a.value)), o = f(() => Xe(n.value, s.value.entity)), l = f(() => o.value ?? Jn(n.value, a.value)), i = f(() => Et(o.value, n.value)), r = f(() => Ce(o.value, s.value.sort, n.value)), c = (x, h) => {
    const y = Hn(x, n.value, a.value, t.search.value);
    return y === t.search.value && !t.elsewhere?.value ? !1 : (h === "push" ? t.push(y) : t.replace(y), !0);
  }, d = () => Me(e.navigationMode) ?? "push", m = () => Me(e.facetNavigationMode) ?? "replace", w = (x, h) => {
    const y = x.page ?? (Ht(x) ? 1 : s.value.page);
    return c({ ...s.value, ...x, page: y }, h);
  }, g = (x) => {
    const h = x.page ?? (Ht(x) ? 1 : s.value.page);
    return _({ ...s.value, ...x, page: h });
  }, _ = (x) => {
    const h = Hn(x, n.value, a.value, t.search.value);
    return t.href ? t.href(h) : `${t.path.value}${h}`;
  }, v = (x, h) => {
    const y = o.value?.facets.find((I) => I.key === x);
    if (!y) return;
    const M = Pa(s.value.expr, y, h(Ca(s.value.expr, y)));
    w({ expr: M }, m());
  }, b = (x) => {
    const h = x === null ? null : Xe(n.value, x);
    return (h?.key ?? null) === s.value.entity ? {} : {
      entity: h?.key ?? null,
      view: xn(s.value.view, s.value.entity, h?.key ?? null, a.value),
      sort: Ce(h, s.value.sort, n.value).key
    };
  }, P = (x) => {
    const h = b(x);
    Object.keys(h).length && w(h, d());
  };
  return {
    query: s,
    entity: o,
    focus: l,
    sort: r,
    sorts: i,
    summary: f(() => vo(s.value, o.value, n.value)),
    terms: f(() => bt(s.value, o.value, n.value)),
    isPristine: f(() => rn(s.value)),
    isEverything: f(() => s.value.entity === null),
    hasFacets: f(() => co(s.value.expr, o.value)),
    setEntity: P,
    entityHref: (x) => g(b(x)),
    clearEntity: () => P(null),
    setView(x, h) {
      w(h === void 0 ? { view: x } : { view: x, page: Math.max(1, Math.floor(h)) }, d());
    },
    setSort(x) {
      w({ sort: Ce(o.value, x, n.value).key }, d());
    },
    toggleDirection() {
      w({ dir: s.value.dir === "desc" ? "asc" : "desc" }, d());
    },
    setExpression(x) {
      return w({ expr: x }, d());
    },
    narrow(x, h, y) {
      return w({ expr: x, ...b(h), ...y ? { view: y } : {} }, d());
    },
    narrowHref(x, h, y) {
      return g({ expr: x, ...b(h), ...y ? { view: y } : {} });
    },
    setPage(x, h) {
      w({ page: Math.max(1, Math.floor(x)) }, h ?? d());
    },
    setFacet(x, h) {
      v(x, () => h);
    },
    toggleChip(x, h) {
      v(x, (y) => y.kind !== "chips" ? y : { kind: "chips", selected: y.selected.includes(h) ? y.selected.filter((I) => I !== h) : [...y.selected, h] });
    },
    setRange(x, h, y) {
      v(x, (M) => M.kind === "range" ? { kind: "range", min: h, max: y } : M);
    },
    toggleFlag(x) {
      v(
        x,
        (h) => h.kind === "toggle" ? { kind: "toggle", on: !h.on } : h
      );
    },
    removeTerm(x) {
      if (x.facetKey === kt) {
        P(null);
        return;
      }
      if (x.facetKey === at) {
        const h = As(re(s.value.expr), x.group ?? 0, x.index ?? 0);
        w({ expr: he(h) }, d());
      }
    },
    clearFilters() {
      w({ ...b(null), expr: "" }, d());
    },
    clearHref: () => g({ ...b(null), expr: "" }),
    reset() {
      c(ht(n.value, a.value), d());
    },
    homeHref: () => _(ht(n.value, a.value)),
    hrefFor(x) {
      const h = { ...s.value, ...x };
      return "entity" in x && !("view" in x) && (h.view = xn(s.value.view, s.value.entity, h.entity, a.value)), h.page = x.page ?? (Ht(x) ? 1 : s.value.page), _(h);
    }
  };
}
function ho(e) {
  const t = me([]), n = B(0), a = B(!1), s = B(!1), o = me(null);
  let l = 0, i = null, r = null;
  const c = f(() => (e.query.value.page - 1) * e.limit.value), d = f(() => hs(n.value, e.limit.value)), m = () => {
    const y = e.query.value, M = e.within?.value.trim(), I = wa(e.entity.value, y.expr);
    return M ? { ...y, expr: un(M, I) } : I === y.expr ? y : { ...y, expr: I };
  }, w = (y, M) => {
    t.value = y.rows, n.value = y.total, o.value = null, g(M);
  }, g = (y) => {
    i = { key: y, total: n.value }, s.value = !1;
  }, _ = (y) => {
    o.value = y, t.value = [], n.value = 0, i = null, s.value = !1;
  }, v = (y, M, I, te) => {
    let q = !0;
    const V = () => y === l;
    let Q = 0, fe = !1;
    const de = (ee) => {
      Q = ee, fe = !0, te === void 0 && (n.value = ee);
    }, ue = () => {
      q && (q = !1, t.value = [], de(0)), o.value = null;
    };
    return {
      get open() {
        return V();
      },
      insert(ee, T) {
        if (!V()) return;
        const j = Array.isArray(ee) ? ee : [ee];
        if (!j.length) return;
        ue();
        const O = [...t.value];
        O.splice(T ?? O.length, 0, ...j), t.value = M > 0 ? O.slice(0, M) : O, de(Q + j.length);
      },
      set(ee) {
        V() && (ee.rows && (ue(), t.value = M > 0 ? ee.rows.slice(0, M) : ee.rows, de(ee.rows.length)), ee.total !== void 0 && de(ee.total));
      },
      close() {
        V() && (a.value = !1, fe && (n.value = Q), g(I));
      },
      fail(ee) {
        V() && (_(ee), a.value = !1);
      }
    };
  }, b = () => {
    const y = r;
    r = null, y?.();
  }, P = () => {
    const y = ++l;
    b();
    const M = x.value, I = i?.key === M ? i.total : void 0;
    s.value = I === void 0;
    const te = {
      query: m(),
      schema: e.schema.value,
      entity: e.entity.value,
      limit: e.limit.value,
      offset: c.value
    }, q = e.source.value;
    if (q.stream) {
      a.value = !0;
      try {
        r = q.stream(te, v(y, te.limit, M, I)) ?? null;
      } catch (Q) {
        _(Q), a.value = !1;
      }
      return;
    }
    let V;
    try {
      V = q.query(te);
    } catch (Q) {
      _(Q);
      return;
    }
    if (!(V instanceof Promise)) {
      w(V, M), a.value = !1;
      return;
    }
    a.value = !0, V.then((Q) => {
      y === l && w(Q, M);
    }).catch((Q) => {
      y === l && _(Q);
    }).finally(() => {
      y === l && (a.value = !1);
    });
  }, x = f(() => {
    const y = m();
    return `${e.entity.value?.key ?? e.schema.value.entities[0]?.key ?? ""}|${JSON.stringify(ln.map((I) => y[I]))}`;
  }), h = f(() => `${x.value}|${e.query.value.page}`);
  return ae([e.source, h, e.limit], P, {
    immediate: !0
  }), xt(() => {
    l++, b();
  }, !0), { rows: t, total: n, offset: c, pageCount: d, pending: a, counting: s, error: o, refresh: P };
}
const mo = 150;
function yo(e) {
  const t = e.delay ?? mo, n = B(""), a = B("");
  let s = !1, o;
  const l = () => {
    clearTimeout(o), o = void 0;
  }, i = f(() => Ze(Hs(a.value), e.entity.value, e.schema?.value)), r = f(() => i.value.trim() !== ""), c = f(
    () => JSON.stringify([i.value, ...ln.map((g) => e.query.value[g])])
  ), d = me(null), m = f(() => {
    const g = e.query.value;
    if (!r.value) return g;
    const _ = d.value?.of === c.value ? d.value.page : 1;
    return { ...g, expr: et(g.expr, i.value), page: _ };
  });
  ae(n, (g) => {
    if (l(), !g.trim()) {
      s || (a.value = "");
      return;
    }
    s = !1, o = setTimeout(() => {
      o = void 0, a.value = n.value;
    }, t);
  }), ae(
    e.query,
    () => {
      s && (s = !1, a.value = "");
    },
    { flush: "sync" }
  );
  const w = (g) => {
    l(), s = !0, n.value = "", !g() && s && (s = !1, a.value = "");
  };
  return Qn() && xt(l), {
    text: n,
    live: m,
    drafting: r,
    setPage(g) {
      d.value = { of: c.value, page: Math.max(1, Math.floor(g)) };
    },
    commit() {
      const g = n.value.trim();
      if (!g) return;
      const _ = et(
        e.query.value.expr,
        Ze(g, e.entity.value, e.schema?.value)
      );
      a.value = g, w(() => e.setExpression(_));
    },
    abandon() {
      l(), s = !1, n.value = "", a.value = "";
    },
    release: w
  };
}
const go = 25, Ea = (e, t) => e.toLowerCase() === t.toLowerCase();
function _o(e, t) {
  return e.find((n) => Ea(n.id, t));
}
function wo(e) {
  const t = me(/* @__PURE__ */ new Map()), n = /* @__PURE__ */ new Set(), a = (i) => {
    if (i.facetKey !== at) return null;
    const r = ba(e.schema.value, i.field, i.value);
    return r ? { ...r, key: `${r.entity.key}:${r.id}` } : null;
  }, s = (i) => {
    const { entity: r, id: c } = i, d = e.query.value;
    return e.source.value.query({
      query: {
        ...d,
        entity: r.key,
        // The reference on its own. The rest of the query is about the rows on
        // screen, which are of another type entirely.
        expr: ha(r, c) ?? "",
        sort: Ce(r, d.sort, e.schema.value).key,
        page: 1
      },
      schema: e.schema.value,
      entity: r,
      limit: go,
      offset: 0
    });
  }, o = (i, r) => {
    const c = vt(ve(i.columns ?? [], "identity"), r);
    return c === ge || Ea(c, r.id) ? "" : c;
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
      d.forEach((w, g) => {
        const { reference: _ } = r[g], v = _o(w.rows, _.id);
        m.set(_.key, v ? o(_.entity, v) : "");
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
  return ae([e.source, e.schema, e.terms, e.loading], () => {
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
const ko = 4, bo = 8, $o = 180;
function xo(e, t, n, a = {}) {
  const s = a.gap ?? ko, o = a.margin ?? bo, l = a.flipBelow ?? $o, i = a.side ?? "below", r = {
    below: n.height - e.bottom - s - o,
    above: e.top - s - o
  }, c = i === "below" ? "above" : "below", d = r[i] < l && r[c] > r[i] ? c : i, m = Math.min(a.maxHeight ?? 1 / 0, Math.max(0, r[d])), w = Math.max(0, n.width - o * 2), g = Math.min(a.minWidth ?? e.width, w), _ = Math.min(Math.max(t, g), w), v = a.align === "end" ? e.right - _ : e.left, b = Math.max(o, Math.min(v, n.width - _ - o));
  return d === "below" ? { side: d, left: b, top: e.bottom + s, maxHeight: m, minWidth: g, maxWidth: w } : { side: d, left: b, bottom: n.height - e.top + s, maxHeight: m, minWidth: g, maxWidth: w };
}
const So = ["data-dc-theme", "data-dc-side"], Se = [], Co = /* @__PURE__ */ K({
  inheritAttrs: !1,
  __name: "ShellPopover",
  props: {
    open: { type: Boolean, default: !1 },
    anchor: { default: null },
    side: { default: "below" },
    align: { default: "start" },
    maxHeight: { default: void 0 },
    minWidth: { default: void 0 },
    to: { default: "body" },
    theme: { default: void 0 },
    accent: { default: void 0 },
    tokens: { default: void 0 }
  },
  emits: ["update:open", "close"],
  setup(e, { emit: t }) {
    const n = e, a = t, { theme: s, style: o, adopt: l } = hn(n), i = B(null), r = B(null), c = { root: () => i.value };
    function d() {
      const h = n.anchor;
      h && (r.value = xo(
        h.getBoundingClientRect(),
        i.value?.offsetWidth ?? 0,
        { width: window.innerWidth, height: window.innerHeight },
        { side: n.side, align: n.align, maxHeight: n.maxHeight, minWidth: n.minWidth }
      ));
    }
    const m = f(() => {
      const h = r.value, y = h ? {
        position: "fixed",
        left: `${h.left}px`,
        ...h.top !== void 0 ? { top: `${h.top}px` } : {},
        ...h.bottom !== void 0 ? { bottom: `${h.bottom}px` } : {},
        minWidth: `${h.minWidth}px`,
        maxWidth: `${h.maxWidth}px`,
        maxHeight: `${h.maxHeight}px`,
        overflowY: "auto"
      } : { position: "fixed", visibility: "hidden" };
      return { ...o.value, ...y };
    });
    function w() {
      a("update:open", !1), a("close");
    }
    function g(h) {
      return i.value?.contains(h) || n.anchor?.contains(h) ? !0 : Se.slice(Se.indexOf(c) + 1).some((M) => M.root()?.contains(h));
    }
    function _(h) {
      const y = h.target;
      y && !g(y) && w();
    }
    function v(h) {
      h.key !== "Escape" || h.defaultPrevented || Se[Se.length - 1] === c && (h.preventDefault(), i.value?.contains(document.activeElement) && n.anchor?.focus(), w());
    }
    let b = null;
    async function P() {
      Se.includes(c) || (Se.push(c), l(), r.value = null, await Qe(), d(), window.addEventListener("pointerdown", _, !0), document.addEventListener("keydown", v, !0), window.addEventListener("resize", d), window.addEventListener("scroll", d, !0), typeof ResizeObserver < "u" && i.value && (b = new ResizeObserver(() => d()), b.observe(i.value)));
    }
    function x() {
      const h = Se.indexOf(c);
      h !== -1 && (Se.splice(h, 1), window.removeEventListener("pointerdown", _, !0), document.removeEventListener("keydown", v, !0), window.removeEventListener("resize", d), window.removeEventListener("scroll", d, !0), b?.disconnect(), b = null);
    }
    return ot(() => {
      n.open && P();
    }), ae(
      () => n.open,
      (h) => {
        h ? P() : x();
      }
    ), ae(() => n.anchor, () => {
      n.open && d();
    }), ye(x), (h, y) => e.open ? (u(), A(St, {
      key: 0,
      to: e.to
    }, [
      S("div", Ve({
        ref_key: "root",
        ref: i
      }, h.$attrs, {
        class: "dc-shell dc-layer dc-popover",
        "data-dc-theme": k(s),
        "data-dc-side": r.value?.side,
        style: m.value
      }), [
        G(h.$slots, "default", {}, void 0, !0)
      ], 16, So)
    ], 8, ["to"])) : L("", !0);
  }
}), W = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [a, s] of t)
    n[a] = s;
  return n;
}, Po = /* @__PURE__ */ W(Co, [["__scopeId", "data-v-a688f2f7"]]), Eo = ["href"], Mo = /* @__PURE__ */ K({
  __name: "PressLink",
  props: {
    href: {},
    selectable: { type: Boolean }
  },
  emits: ["press"],
  setup(e, { emit: t }) {
    const n = e, a = t;
    function s(i) {
      i.stopPropagation(), !_a() && (n.href && Yt(i) ? Gt(n.href, i) : a("press", tt(i), i));
    }
    function o(i) {
      n.href && i.button === 1 && Gt(n.href, i);
    }
    function l(i) {
      if (n.href && Yt(i)) {
        i.stopPropagation();
        return;
      }
      i.preventDefault(), a("press", tt(i), i);
    }
    return (i, r) => e.selectable ? (u(), p("span", {
      key: 0,
      role: "link",
      tabindex: "0",
      class: "dc-press",
      onClick: s,
      onAuxclick: o,
      onKeydown: r[0] || (r[0] = Le((c) => c.currentTarget.click(), ["enter"]))
    }, [
      G(i.$slots, "default", {}, void 0, !0)
    ], 32)) : e.href ? (u(), p("a", {
      key: 1,
      href: e.href,
      class: "dc-press",
      onClick: l
    }, [
      G(i.$slots, "default", {}, void 0, !0)
    ], 8, Eo)) : (u(), p("button", {
      key: 2,
      type: "button",
      class: "dc-press",
      onClick: l
    }, [
      G(i.$slots, "default", {}, void 0, !0)
    ]));
  }
}), se = /* @__PURE__ */ W(Mo, [["__scopeId", "data-v-e5165a68"]]), $t = (e) => e.toLowerCase().replace(/\s+/g, ""), Lo = /(?:[^\s"]|"[^"]*"?)*$/, To = /^(-?)([^:=<>"\s-][^:=<>"\s]*)([:=])(.*)$/, Fn = 4;
function Oo(e, t) {
  const n = $t(t);
  return e.find((a) => nt(a) === n || $t(a.label) === n);
}
function No(e) {
  switch (e.kind) {
    case "toggle":
      return e.text;
    case "range":
      return `${e.min}..${e.max}`;
    case "chips": {
      const t = e.options.slice(0, Fn).join(" · "), n = e.options.length - Fn;
      return n > 0 ? `${t} · +${n}` : t;
    }
  }
}
function Ao(e) {
  switch (e.kind) {
    case "toggle":
      return [{ value: "true", hint: e.text }, { value: "false" }];
    case "chips":
      return e.options.map((t) => ({ value: t }));
    case "range":
      return [];
  }
}
function qn(e, t) {
  return $t(e).includes($t(t));
}
function Io(e, t) {
  const n = Lo.exec(e)?.[0] ?? "", a = e.slice(0, e.length - n.length), s = [], o = To.exec(n);
  if (o) {
    const [, l, i, r, c] = o, d = Oo(t, i);
    if (!d) return [];
    const m = c.replace(/"/g, "").toLowerCase();
    for (const { value: w, hint: g } of Ao(d)) {
      if (!w.toLowerCase().includes(m)) continue;
      const _ = we({
        kind: "field",
        field: nt(d),
        comparator: r,
        value: w,
        ...l ? { negated: !0 } : {}
      });
      s.push({ draft: a + _, label: _, ...g ? { hint: g } : {}, complete: !0 });
    }
  } else {
    if (/[<>"]/.test(n)) return [];
    const l = n.startsWith("-") ? "-" : "", i = n.slice(l.length);
    for (const r of t) {
      if (i && !qn(r.key, i) && !qn(r.label, i)) continue;
      const c = `${l}${nt(r)}:`;
      s.push({ draft: a + c, label: c, hint: No(r), complete: !1 });
    }
  }
  return s.filter((l) => l.draft !== e);
}
const Ro = { class: "dc-header" }, Bo = { class: "dc-header__main" }, Ho = {
  class: "dc-header__brand",
  "aria-hidden": "true"
}, Fo = { class: "dc-header__sr" }, qo = {
  key: 2,
  class: "dc-header__within"
}, Vo = ["title"], Do = { class: "dc-header__query" }, Ko = ["data-dc-more", "title"], Wo = { class: "dc-header__run" }, zo = {
  key: 0,
  class: "dc-header__or dc-mono",
  "aria-hidden": "true"
}, jo = ["title", "aria-label", "onClick"], Uo = ["placeholder", "aria-expanded", "aria-activedescendant", "onKeydown"], Qo = ["id", "aria-selected", "onClick"], Go = { class: "dc-completion__term dc-mono" }, Yo = {
  key: 0,
  class: "dc-completion__hint"
}, Xo = {
  key: 0,
  class: "dc-header__actions"
}, Jo = /* @__PURE__ */ K({
  __name: "ShellHeader",
  setup(e) {
    const t = Ct(), n = Z(), a = f(() => n.schema.value), s = f(() => {
      const $ = n.within.value.trim();
      return $ ? bt({ ...n.query.value, expr: $ }, null) : [];
    }), o = f(() => {
      const $ = n.entity.value, N = $?.keepsScope ? void 0 : $?.scope?.toLowerCase();
      return n.terms.value.filter((H) => H.facetKey !== kt).map((H, F, Ee) => {
        const Fe = Ee[F - 1];
        return {
          term: H,
          or: Fe?.group !== void 0 && H.group !== void 0 && H.group !== Fe.group,
          idle: !!N && H.field?.toLowerCase() === N
        };
      });
    }), l = wo({
      source: n.source,
      schema: n.schema,
      query: n.query,
      loading: n.loading,
      // The scope's parts as well as the query's: it names a record more often
      // than a typed term does, being what a record's own page is built on.
      terms: f(() => [...s.value, ...n.terms.value])
    });
    function i($) {
      const N = ka(a.value, $)?.scopeLabel ?? $;
      return N.charAt(0).toUpperCase() + N.slice(1);
    }
    function r($) {
      return $.replace(/\s*\([^()]*\)\s*$/, "");
    }
    function c($) {
      const N = l.nameOf($);
      return N ? `${$.negated ? "-" : ""}${i($.field)}: ${r(N)}` : $.label;
    }
    function d($) {
      const N = c($.term), H = $.idle ? `Not applied to ${n.entity.value?.label} — remove ${N}` : `Remove ${N}`, F = $.term.address;
      return F && F !== N ? `${H}
Written ${F} in the address and the search box` : H;
    }
    const m = f(() => {
      const $ = n.pressPreview?.value;
      if (!$) return [];
      const N = n.query.value, H = new Set(n.terms.value.map((F) => F.address));
      return bt(
        { ...N, expr: et(N.expr, $.term) },
        n.entity.value,
        n.schema.value
      ).filter((F) => F.address !== void 0 && !H.has(F.address)).map(
        (F) => $.name ? `${i(F.field)}: ${r($.name)}` : F.label
      );
    }), w = B(null);
    function g($) {
      w.value = $ instanceof HTMLInputElement ? $ : null;
    }
    function _() {
      n.abandonDraft(), w.value?.blur();
    }
    function v() {
      const $ = x.value[P.value];
      if (h.value && $) {
        M($);
        return;
      }
      q.value = null, b.value = !1, n.commitDraft();
    }
    const b = B(!1), P = B(-1), x = f(() => {
      const $ = n.entity.value?.facets ?? [];
      return $.length ? Io(n.draft.value, $) : [];
    }), h = f(() => b.value && x.value.length > 0);
    ae(x, () => {
      P.value = -1;
    });
    const y = `${Pt() ?? "dc-header"}-completions`;
    function M($) {
      n.draft.value = $.draft, b.value = !$.complete, P.value = -1, Qe(() => {
        const N = w.value;
        N?.focus(), N?.setSelectionRange($.draft.length, $.draft.length);
      });
    }
    function I($, N) {
      if ($.isComposing || !x.value.length) return;
      if ($.preventDefault(), !b.value) {
        b.value = !0;
        return;
      }
      const H = x.value.length + 1;
      P.value = (P.value + 1 + N + H) % H - 1;
    }
    function te($) {
      return `${y}-${$}`;
    }
    const q = B(null), V = f(() => Math.min(q.value ?? 1 / 0, o.value.length)), Q = f(() => [
      { key: "before", entries: o.value.slice(0, V.value) },
      { key: "after", entries: o.value.slice(V.value) }
    ]), fe = f(() => V.value < o.value.length);
    ae(o, ($) => {
      q.value !== null && q.value >= $.length && (q.value = null);
    });
    function de($, N) {
      q.value = $ >= o.value.length ? null : Math.max(0, $), Qe(() => {
        const H = w.value;
        if (!H) return;
        const F = N === "start" ? 0 : H.value.length;
        H.setSelectionRange(F, F), H.scrollIntoView({ block: "nearest", inline: "nearest" }), _e();
      });
    }
    function ue($) {
      const N = w.value;
      return !N || N.selectionStart !== N.selectionEnd ? !1 : N.selectionStart === ($ === "start" ? 0 : N.value.length);
    }
    function ee($) {
      V.value === 0 || !ue("start") || ($.preventDefault(), de($.key === "Home" ? 0 : V.value - 1, "start"));
    }
    function T($) {
      !fe.value || !ue("end") || ($.preventDefault(), de($.key === "End" ? o.value.length : V.value + 1, "end"));
    }
    function j($) {
      V.value === 0 || !ue("start") || ($.preventDefault(), ke(o.value[V.value - 1].term, !0));
    }
    function O($) {
      !fe.value || !ue("end") || ($.preventDefault(), ke(o.value[V.value].term, !1));
    }
    function ne($) {
      $.isComposing || $.altKey || $.ctrlKey || $.metaKey || $.shiftKey || ($.key === "ArrowLeft" || $.key === "Home" ? ee($) : $.key === "ArrowRight" || $.key === "End" ? T($) : $.key === "Backspace" ? j($) : $.key === "Delete" && O($));
    }
    function ke($, N) {
      N && q.value !== null && (q.value = Math.max(0, q.value - 1)), n.removeTerm($);
    }
    function Re($) {
      $.target?.closest("button, input") || ($.preventDefault(), w.value?.focus(), de(o.value.length, "end"));
    }
    function be() {
      b.value = !1, n.draft.value || (q.value = null);
    }
    const Be = B(null), He = B("");
    function _e() {
      const $ = Be.value;
      if (!$) {
        He.value = "";
        return;
      }
      const N = $.scrollLeft > 1, H = $.scrollWidth - $.clientWidth - $.scrollLeft > 1;
      He.value = N && H ? "both" : N ? "start" : H ? "end" : "";
    }
    let $e = null;
    return ae(
      Be,
      ($) => {
        $e?.disconnect(), $e = null, _e(), !(!$ || typeof ResizeObserver > "u") && ($e = new ResizeObserver(_e), $e.observe($));
      },
      { flush: "post" }
    ), ae([o, V], _e, { flush: "post" }), ye(() => $e?.disconnect()), ($, N) => (u(), p("div", Ro, [
      S("div", Bo, [
        a.value.label && t.brand ? (u(), A(se, {
          key: 0,
          class: "dc-header__domain",
          "data-dc-brand": "",
          title: "Home",
          href: k(n).homeHref(),
          onPress: N[0] || (N[0] = (H) => k(n).reset())
        }, {
          default: Y(() => [
            S("span", Ho, [
              G($.$slots, "brand", {
                label: a.value.label
              }, void 0, !0)
            ]),
            S("span", Fo, E(a.value.label), 1)
          ]),
          _: 3
        }, 8, ["href"])) : a.value.label ? (u(), A(se, {
          key: 1,
          class: "dc-header__domain",
          title: "Home",
          href: k(n).homeHref(),
          onPress: N[1] || (N[1] = (H) => k(n).reset())
        }, {
          default: Y(() => [
            J(E(a.value.label), 1)
          ]),
          _: 1
        }, 8, ["href"])) : L("", !0),
        G($.$slots, "lead", {}, void 0, !0),
        s.value.length ? (u(), p("span", qo, [
          N[10] || (N[10] = S("span", { class: "dc-header__sr" }, "Within", -1)),
          (u(!0), p(D, null, X(s.value, (H) => (u(), p("span", {
            key: `scope:${H.id}`,
            class: "dc-within dc-mono dc-truncate",
            title: c(H)
          }, E(c(H)), 9, Vo))), 128))
        ])) : L("", !0),
        S("div", Do, [
          S("div", {
            class: "dc-header__field",
            onMousedown: Re
          }, [
            S("div", {
              ref_key: "termBar",
              ref: Be,
              class: "dc-header__terms",
              "data-dc-more": He.value,
              title: k(n).summary.value,
              onScroll: _e
            }, [
              (u(!0), p(D, null, X(Q.value, (H) => (u(), p(D, {
                key: H.key
              }, [
                S("span", Wo, [
                  (u(!0), p(D, null, X(H.entries, (F) => (u(), p(D, {
                    key: F.term.id
                  }, [
                    F.or ? (u(), p("span", zo, "or")) : L("", !0),
                    S("button", {
                      type: "button",
                      class: le(["dc-term dc-mono", { "dc-term--idle": F.idle }]),
                      title: d(F),
                      "aria-label": `Remove ${c(F.term)}`,
                      onMousedown: N[2] || (N[2] = Te(() => {
                      }, ["prevent"])),
                      onClick: (Ee) => ke(F.term, H.key === "before")
                    }, E(c(F.term)), 43, jo)
                  ], 64))), 128)),
                  H.key === "before" ? (u(!0), p(D, { key: 0 }, X(m.value, (F) => (u(), p("span", {
                    key: F,
                    class: "dc-term dc-term--preview dc-mono",
                    "aria-hidden": "true"
                  }, E(F), 1))), 128)) : L("", !0)
                ]),
                H.key === "before" ? Dt((u(), p("input", {
                  key: 0,
                  ref_for: !0,
                  ref: g,
                  "onUpdate:modelValue": N[3] || (N[3] = (F) => k(n).draft.value = F),
                  class: le(["dc-header__search dc-mono", { "dc-header__search--between": fe.value }]),
                  style: oe({ "--dc-typed": String(Math.max(1, k(n).draft.value.length)) }),
                  type: "text",
                  autocomplete: "off",
                  spellcheck: "false",
                  placeholder: fe.value ? "" : "Search…",
                  "aria-label": "Search",
                  role: "combobox",
                  "aria-autocomplete": "list",
                  "aria-expanded": h.value,
                  "aria-controls": y,
                  "aria-activedescendant": h.value && P.value >= 0 ? te(P.value) : void 0,
                  onKeydown: [
                    Le(Te(v, ["prevent"]), ["enter"]),
                    Le(Te(_, ["prevent"]), ["esc"]),
                    N[4] || (N[4] = Le((F) => I(F, 1), ["down"])),
                    N[5] || (N[5] = Le((F) => I(F, -1), ["up"])),
                    ne
                  ],
                  onFocus: N[6] || (N[6] = (F) => b.value = !0),
                  onInput: N[7] || (N[7] = (F) => b.value = !0),
                  onBlur: be
                }, null, 46, Uo)), [
                  [ja, k(n).draft.value]
                ]) : L("", !0)
              ], 64))), 128))
            ], 40, Ko)
          ], 32)
        ])
      ]),
      z(Po, {
        id: y,
        open: h.value,
        anchor: w.value,
        "min-width": 0,
        "max-height": 320,
        class: "dc-completions",
        role: "listbox",
        "aria-label": "Completions",
        onClose: N[9] || (N[9] = (H) => b.value = !1)
      }, {
        default: Y(() => [
          (u(!0), p(D, null, X(x.value, (H, F) => (u(), p("div", {
            id: te(F),
            key: H.label,
            class: le(["dc-completion", { "dc-completion--active": F === P.value }]),
            role: "option",
            "aria-selected": F === P.value,
            onMousedown: N[8] || (N[8] = Te(() => {
            }, ["prevent"])),
            onClick: (Ee) => M(H)
          }, [
            S("span", Go, E(H.label), 1),
            H.hint ? (u(), p("span", Yo, E(H.hint), 1)) : L("", !0)
          ], 42, Qo))), 128))
        ]),
        _: 1
      }, 8, ["open", "anchor"]),
      t.actions ? (u(), p("div", Xo, [
        G($.$slots, "actions", {}, void 0, !0)
      ])) : L("", !0)
    ]));
  }
}), Ma = /* @__PURE__ */ W(Jo, [["__scopeId", "data-v-421d89d4"]]), Zo = ["checked", "indeterminate"], La = /* @__PURE__ */ K({
  __name: "PageTick",
  setup(e) {
    const t = Z(), n = f(() => t.rows.value.filter((o) => t.isSelected(o)).length), a = f(
      () => t.rows.value.length > 0 && n.value === t.rows.value.length
    ), s = f(() => n.value > 0 && !a.value);
    return (o, l) => (u(), p("input", {
      class: "dc-tick",
      type: "checkbox",
      checked: a.value,
      indeterminate: s.value,
      "aria-label": "Select every row on this page",
      title: "Select every row on this page",
      onChange: l[0] || (l[0] = (i) => k(t).selectPage(!a.value))
    }, null, 40, Zo));
  }
}), er = { class: "dc-pick" }, tr = ["id"], nr = ["id", "aria-expanded", "aria-labelledby", "data-dc-value"], ar = {
  key: 0,
  class: "dc-pick__icon",
  viewBox: "0 0 16 16",
  "aria-hidden": "true"
}, sr = ["d"], or = { class: "dc-pick__label" }, rr = /* @__PURE__ */ K({
  __name: "PickControl",
  props: {
    modelValue: {},
    options: {},
    label: {},
    mono: { type: Boolean }
  },
  emits: ["update:modelValue", "open", "close"],
  setup(e, { emit: t }) {
    const n = e, a = t, s = Pt() ?? "dc-pick", o = B(null), l = B(null), i = B(null), r = B(!1), c = f(() => i.value !== null), d = B(null), m = f(
      () => n.options.find((y) => y.key === n.modelValue) ?? n.options[0]
    ), w = f(
      () => n.options.map((y) => ({
        id: y.key,
        label: y.label,
        icon: y.icon,
        checked: y.key === n.modelValue
      }))
    ), g = f(
      () => i.value ? { maxHeight: `${window.innerHeight - i.value.y - 8}px` } : void 0
    );
    function _(y) {
      const M = o.value?.getBoundingClientRect();
      M && (d.value = o.value?.closest(".dc-shell") ?? document.body, i.value = { x: M.left, y: M.bottom + 4, mirrorX: M.right }, r.value = y, a("open"));
    }
    function v(y) {
      i.value && a("close"), i.value = null, y && o.value?.focus();
    }
    function b() {
      c.value ? v(!0) : _(!1);
    }
    function P(y) {
      y.key !== "ArrowDown" && y.key !== "ArrowUp" || c.value || (y.preventDefault(), _(!0));
    }
    function x(y) {
      const M = y.target;
      M && (o.value?.contains(M) || l.value?.root?.contains(M) || v(!1));
    }
    ae(c, (y) => {
      y ? window.addEventListener("pointerdown", x, !0) : window.removeEventListener("pointerdown", x, !0);
    }), ye(() => window.removeEventListener("pointerdown", x, !0));
    function h(y) {
      v(!0), !(y.id === void 0 || y.id === n.modelValue) && a("update:modelValue", y.id);
    }
    return (y, M) => (u(), p("span", er, [
      S("span", {
        id: `${k(s)}-name`,
        class: "dc-pick__name"
      }, E(e.label), 9, tr),
      S("button", {
        id: `${k(s)}-value`,
        ref_key: "trigger",
        ref: o,
        type: "button",
        class: le(["dc-pick__button", { "dc-mono": e.mono }]),
        "aria-haspopup": "menu",
        "aria-expanded": c.value,
        "aria-labelledby": `${k(s)}-name ${k(s)}-value`,
        "data-dc-value": e.modelValue,
        onClick: b,
        onKeydown: P
      }, [
        m.value?.icon ? (u(), p("svg", ar, [
          S("path", {
            d: m.value.icon
          }, null, 8, sr)
        ])) : L("", !0),
        S("span", or, E(m.value?.label), 1)
      ], 42, nr),
      M[1] || (M[1] = S("svg", {
        class: "dc-pick__mark",
        viewBox: "0 0 16 16",
        "aria-hidden": "true"
      }, [
        S("path", { d: "M4 6l4 4 4-4" })
      ], -1)),
      i.value && d.value ? (u(), A(St, {
        key: 0,
        to: d.value
      }, [
        z(k(Za), {
          ref_key: "menu",
          ref: l,
          class: "dc-pick__list",
          style: oe(g.value),
          items: w.value,
          at: i.value,
          label: e.label,
          autofocus: r.value,
          onChoose: h,
          onDismiss: M[0] || (M[0] = (I) => v(!0))
        }, null, 8, ["style", "items", "at", "label", "autofocus"])
      ], 8, ["to"])) : L("", !0)
    ]));
  }
}), Jt = /* @__PURE__ */ W(rr, [["__scopeId", "data-v-7e5be459"]]), lr = {
  class: "dc-pager",
  "aria-label": "Pages"
}, ir = ["title"], cr = ["value", "onKeydown"], ur = {
  class: "dc-pager__total",
  "aria-hidden": "true"
}, dr = {
  class: "dc-pager__sr",
  "aria-live": "polite"
}, fr = /* @__PURE__ */ K({
  __name: "ShellPager",
  props: {
    pagesNote: {}
  },
  setup(e) {
    const t = e, n = Z(), a = f(() => n.liveQuery.value.page), s = f(
      () => `${n.counting.value ? "~" : ""}${qe(n.pageCount.value)}`
    ), o = f(() => {
      if (n.limit.value === 1) {
        const v = `Record ${qe(a.value)} of ${s.value}`;
        return t.pagesNote ? `${v}
${t.pagesNote}` : v;
      }
      let g = `Page ${qe(a.value)} of ${s.value}`;
      const _ = n.rows.value.length;
      if (_) {
        const v = n.offset.value + 1, b = `${n.counting.value ? "~" : ""}${qe(n.total.value)}`;
        g += ` — rows ${qe(v)} to ${qe(v + _ - 1)} of ${b}`;
      }
      return t.pagesNote ? `${g}
${t.pagesNote}` : g;
    }), l = B(null), i = f(() => l.value ?? String(a.value)), r = f(
      () => `calc(${Math.max(2, String(n.pageCount.value).length)}ch + 10px)`
    );
    function c(g) {
      g.target.select();
    }
    function d(g) {
      const _ = g.target, v = _.value.replace(/[^0-9]/g, "");
      _.value !== v && (_.value = v), l.value = v;
    }
    function m(g) {
      const _ = g.target, v = Number(l.value);
      l.value = null;
      const b = Number.isFinite(v) && v >= 1 ? Math.min(Math.trunc(v), Math.max(1, n.pageCount.value)) : a.value;
      _.value = String(b), b !== a.value && n.setPage(b);
    }
    function w(g) {
      const _ = g.target;
      l.value = null, _.value = String(a.value), _.blur();
    }
    return (g, _) => (u(), p("nav", lr, [
      z(se, {
        class: "dc-pager__step",
        "aria-label": "Previous page",
        href: a.value > 1 ? k(n).hrefFor({ page: a.value - 1 }) : null,
        disabled: a.value <= 1,
        onPress: _[0] || (_[0] = (v) => k(n).setPage(a.value - 1))
      }, {
        default: Y(() => [..._[2] || (_[2] = [
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
            Le(Te(m, ["prevent"]), ["enter"]),
            Le(Te(w, ["prevent"]), ["esc"])
          ],
          onBlur: m
        }, null, 44, cr),
        S("span", ur, "/ " + E(s.value), 1)
      ], 8, ir),
      S("span", dr, E(o.value), 1),
      z(se, {
        class: "dc-pager__step",
        "aria-label": "Next page",
        href: a.value < k(n).pageCount.value ? k(n).hrefFor({ page: a.value + 1 }) : null,
        disabled: a.value >= k(n).pageCount.value,
        onPress: _[1] || (_[1] = (v) => k(n).setPage(a.value + 1))
      }, {
        default: Y(() => [..._[3] || (_[3] = [
          S("span", { "aria-hidden": "true" }, "›", -1)
        ])]),
        _: 1
      }, 8, ["href", "disabled"])
    ]));
  }
}), vr = /* @__PURE__ */ W(fr, [["__scopeId", "data-v-94fea4d7"]]), pr = {
  key: 0,
  class: "dc-actions__order"
}, hr = {
  key: 1,
  class: "dc-actions__select"
}, mr = {
  key: 0,
  class: "dc-actions__all"
}, yr = {
  class: "dc-actions__count",
  "aria-live": "polite"
}, gr = {
  key: 1,
  class: "dc-actions__count dc-actions__all",
  "aria-live": "polite"
}, _r = { class: "dc-actions__ops" }, wr = ["disabled"], kr = ["data-dc-operation", "disabled", "onClick"], br = ["disabled"], $r = /* @__PURE__ */ K({
  __name: "RecordActions",
  props: {
    views: {},
    selectionPlacement: {},
    pagesNote: {}
  },
  setup(e) {
    const t = e, n = Z(), a = f(() => De(n.query.value.view, t.views)), s = f(
      () => (d.value || m.value) && a.value !== "table" && n.sorts.value.length > 0
    ), o = f(
      () => n.sorts.value.map((y) => ({ key: y.key, label: y.label }))
    ), l = f(() => s.value && o.value.length > 1), i = f(() => n.query.value.dir === "desc"), r = f(
      () => `Sorted by ${n.sort.value.label}, ${i.value ? "descending" : "ascending"}`
    ), c = f(() => n.entity.value), d = f(
      () => !ea(n.query.value, t.views) && a.value !== "record"
    ), m = f(() => a.value === "record" && n.query.value.entity !== null), w = f(
      () => (d.value || m.value) && !n.loading.value && (n.pageCount.value > 1 || !!t.pagesNote)
    ), g = f(() => n.selection.value.ids.length), _ = f(
      () => d.value && n.selectable.value && (n.rows.value.length > 0 || g.value > 0)
    ), v = f(() => a.value === "table"), b = f(
      () => s.value || w.value || d.value && (_.value || !!(c.value?.create || c.value?.duplicate || c.value?.delete || c.value?.operations?.length))
    ), P = f(() => g.value ? `${g.value} selected` : v.value ? "" : "Select all"), x = f(() => t.selectionPlacement === "end");
    function h(y) {
      return g.value ? y.endsWith("…") ? `${y.slice(0, -1)} ${g.value}…` : `${y} ${g.value}` : y;
    }
    return (y, M) => b.value ? (u(), p("div", {
      key: 0,
      class: le(["dc-actions", { "dc-actions--selection-end": x.value }])
    }, [
      s.value ? (u(), p("span", pr, [
        l.value ? (u(), A(Jt, {
          key: 0,
          class: "dc-actions__pick dc-actions__sort",
          label: "Sort",
          "model-value": k(n).sort.value.key,
          options: o.value,
          "onUpdate:modelValue": k(n).setSort
        }, null, 8, ["model-value", "options", "onUpdate:modelValue"])) : L("", !0),
        z(se, {
          class: "dc-actions__dir",
          "aria-label": r.value,
          title: r.value,
          href: k(n).hrefFor({ dir: i.value ? "asc" : "desc" }),
          onPress: M[0] || (M[0] = (I) => k(n).toggleDirection())
        }, {
          default: Y(() => [
            J(E(i.value ? "↓" : "↑"), 1)
          ]),
          _: 1
        }, 8, ["aria-label", "title", "href"])
      ])) : L("", !0),
      _.value && P.value ? (u(), p("div", hr, [
        v.value ? (u(), p("span", gr, E(P.value), 1)) : (u(), p("label", mr, [
          z(La),
          S("span", yr, E(P.value), 1)
        ])),
        g.value ? (u(), p("button", {
          key: 2,
          type: "button",
          class: le(["dc-actions__clear", { "dc-actions__clear--op": x.value }]),
          onClick: M[1] || (M[1] = (I) => k(n).clearSelection())
        }, " Clear ", 2)) : L("", !0)
      ])) : L("", !0),
      S("div", _r, [
        c.value?.create ? (u(), A(se, {
          key: 0,
          class: "dc-actions__op dc-actions__new",
          href: k(n).createHref?.(c.value),
          onPress: M[2] || (M[2] = (I) => k(n).create(c.value))
        }, {
          default: Y(() => [
            M[5] || (M[5] = S("span", {
              class: "dc-actions__plus",
              "aria-hidden": "true"
            }, "+", -1)),
            J(" " + E(c.value.create), 1)
          ]),
          _: 1
        }, 8, ["href"])) : L("", !0),
        c.value?.duplicate ? (u(), p("button", {
          key: 1,
          type: "button",
          class: "dc-actions__op",
          disabled: !g.value,
          onClick: M[3] || (M[3] = (I) => k(n).duplicate())
        }, E(h(c.value.duplicate)), 9, wr)) : L("", !0),
        (u(!0), p(D, null, X(c.value?.operations ?? [], (I) => (u(), p("button", {
          key: I.key,
          type: "button",
          class: "dc-actions__op",
          "data-dc-operation": I.key,
          disabled: !g.value && I.selection !== !1,
          onClick: (te) => k(n).operate(I.key)
        }, E(I.selection === !1 ? I.label : h(I.label)), 9, kr))), 128)),
        c.value?.delete ? (u(), p("button", {
          key: 2,
          type: "button",
          class: "dc-actions__op dc-actions__danger",
          disabled: !g.value,
          onClick: M[4] || (M[4] = (I) => k(n).delete())
        }, E(h(c.value.delete)), 9, br)) : L("", !0)
      ]),
      w.value ? (u(), A(vr, {
        key: 2,
        class: "dc-actions__pages",
        "pages-note": e.pagesNote
      }, null, 8, ["pages-note"])) : L("", !0)
    ], 2)) : L("", !0);
  }
}), Zt = /* @__PURE__ */ W($r, [["__scopeId", "data-v-4921c240"]]);
function xr(e) {
  const t = me(/* @__PURE__ */ new Map()), n = B(!0);
  let a = 0, s;
  const o = () => {
    a++, s?.abort(), s = void 0;
  }, l = () => {
    o();
    const i = a, { signal: r } = s = new AbortController(), c = e.query.value, d = e.schema.value, m = e.entities.value, w = e.within?.value.trim() ?? "";
    n.value = c.expr.trim() === "" && !w;
    const g = /* @__PURE__ */ new Map();
    let _ = !0;
    for (const v of m) {
      const b = wa(v, c.expr), P = w ? un(w, b) : b;
      let x = !1;
      const h = (M) => {
        if (i !== a) return;
        if (_) {
          g.set(v.key, M);
          return;
        }
        const I = new Map(t.value);
        I.set(v.key, M), t.value = I;
      }, y = e.source.value.query({
        query: { ...c, entity: v.key, expr: P, page: 1 },
        schema: d,
        entity: v,
        limit: 0,
        offset: 0,
        signal: r,
        progress: (M) => {
          x || h({ total: M, pending: !0, counted: !0 });
        }
      });
      y instanceof Promise ? (g.has(v.key) || g.set(v.key, { total: 0, pending: !0, counted: !1 }), y.then((M) => {
        x = !0, h({ total: M.total, pending: !1, counted: !0 });
      })) : (x = !0, g.set(v.key, { total: y.total, pending: !1, counted: !0 }));
    }
    _ = !1, t.value = g;
  };
  return Qn() && xt(o), { counts: t, pristine: n, refresh: l, cancel: o };
}
const Sr = {
  key: 0,
  class: "dc-choosers"
}, Cr = "…", Pr = /* @__PURE__ */ K({
  __name: "RecordChoosers",
  props: {
    views: {},
    typeChooser: {}
  },
  setup(e) {
    const t = e, n = Z(), a = f(
      () => n.hasFacets.value || !!n.liveQuery.value.expr.trim() || !!n.within.value
    ), s = xr({
      source: n.source,
      schema: n.schema,
      // What each type holds of what is on screen, the draft's results included:
      // a count of the committed query would disagree with the rows under it.
      query: n.liveQuery,
      entities: n.entities,
      within: n.within
    });
    function o(g) {
      if (g.key === n.query.value.entity && a.value) return pt(n.total.value);
      if (s.pristine.value) return zt(g);
      const v = s.counts.value.get(g.key);
      return v ? v.counted ? `${v.pending ? "~" : ""}${pt(v.total)}` : Cr : zt(g);
    }
    const l = f(() => [
      { key: "", label: "Everything" },
      ...n.entities.value.map((g) => ({
        key: g.key,
        label: `${g.label} · ${o(g)}`
      }))
    ]), i = f(
      () => t.typeChooser === "always" || n.query.value.entity !== null
    );
    function r(g) {
      n.setEntity(g || null);
    }
    const c = f(
      () => (t.views ?? [...on]).map((g) => ({
        key: g,
        label: g === "record" ? n.recordView.value?.label ?? Sn.record : Sn[g],
        icon: ds[g]
      }))
    ), d = f(() => De(n.query.value.view, t.views)), m = f(() => c.value.length > 1);
    function w(g) {
      n.setView(g);
    }
    return (g, _) => i.value || m.value ? (u(), p("div", Sr, [
      i.value ? (u(), A(Jt, {
        key: 0,
        class: "dc-actions__pick dc-actions__type",
        label: "Type",
        "model-value": k(n).query.value.entity ?? "",
        options: l.value,
        onOpen: k(s).refresh,
        onClose: k(s).cancel,
        "onUpdate:modelValue": r
      }, null, 8, ["model-value", "options", "onOpen", "onClose"])) : L("", !0),
      m.value ? (u(), A(Jt, {
        key: 1,
        class: "dc-actions__pick dc-actions__view",
        label: "View",
        "model-value": d.value,
        options: c.value,
        "onUpdate:modelValue": w
      }, null, 8, ["model-value", "options"])) : L("", !0)
    ])) : L("", !0);
  }
}), Er = /* @__PURE__ */ W(Pr, [["__scopeId", "data-v-5a44a2f3"]]);
function Mr(e, t) {
  if (!e) return null;
  const n = ie(e, t);
  return typeof n == "string" && n.trim() ? n : null;
}
const Lr = (e) => e == null || typeof e == "string" && !e.trim();
function Tr(e, t) {
  const n = ve(t, "state"), a = ve(t, "tint");
  return {
    identity: vt(ve(t, "identity"), e),
    reference: vt(ve(t, "reference"), e),
    metrics: ta(t, "metric").map((s) => ({
      column: s,
      label: s.label ?? "",
      text: Oe(s, e)
    })),
    facts: t.filter((s) => s.cardLabel && !Lr(ie(s, e))).map((s) => ({
      column: s,
      label: s.cardLabel,
      title: [s.label, s.hint].filter(Boolean).join(" — "),
      text: Oe(s, e)
    })),
    state: n ? ie(n, e) ?? null : null,
    updated: vt(ve(t, "updated"), e),
    image: Mr(ve(t, "image"), e),
    tint: a ? ie(a, e) ?? null : null
  };
}
function Ta(e, t, n, a, s = !1) {
  const o = n?.columns ?? [];
  return {
    row: e,
    key: gs(e, t),
    entityLabel: e.entityLabel,
    entity: n,
    columns: o,
    ordinal: ss(t),
    parts: Tr(e, o),
    pinned: a,
    selected: s
  };
}
function Ae() {
  const e = Z(), t = f(
    () => new Map(e.entities.value.map((n) => [n.key, n]))
  );
  return f(
    () => e.rows.value.map(
      (n, a) => Ta(
        n,
        e.offset.value + a,
        t.value.get(n.entityKey) ?? null,
        e.isPinned(n),
        e.isSelected(n)
      )
    )
  );
}
const Or = ["data-dc-status", "data-dc-tone"], Nr = /* @__PURE__ */ K({
  __name: "StatusPill",
  props: {
    status: {},
    tone: {},
    label: {}
  },
  setup(e) {
    const t = e, n = f(() => t.label ?? t.status ?? "");
    return (a, s) => (u(), p("span", {
      class: "dc-pill",
      "data-dc-status": e.status,
      "data-dc-tone": e.tone
    }, E(n.value), 9, Or));
  }
}), Ke = /* @__PURE__ */ W(Nr, [["__scopeId", "data-v-686eb9b6"]]), Ar = { key: 1 }, Ir = /* @__PURE__ */ K({
  __name: "MetricDrill",
  props: {
    entry: {},
    column: {}
  },
  setup(e) {
    const t = e, n = Z(), a = f(() => !t.entry.entity?.scope || !t.column.drill ? null : n.entities.value.find((c) => c.key === t.column.drill) ?? null), s = f(() => t.column.label ?? ""), o = f(() => Oe(t.column, t.entry.row)), l = f(() => a.value ? n.drillHref(t.entry.row, a.value) : null);
    function i(r, c) {
      c.stopPropagation(), a.value && n.drill(t.entry.row, a.value, r);
    }
    return (r, c) => a.value ? (u(), A(se, {
      key: 0,
      class: "dc-drill",
      href: l.value,
      title: `${s.value} of ${e.entry.parts.identity} — show the ${a.value.label.toLowerCase()}`,
      onPress: i
    }, {
      default: Y(() => [
        G(r.$slots, "default", {}, () => [
          J(E(o.value), 1)
        ], !0)
      ]),
      _: 3
    }, 8, ["href", "title"])) : (u(), p("span", Ar, [
      G(r.$slots, "default", {}, () => [
        J(E(o.value), 1)
      ], !0)
    ]));
  }
}), ct = /* @__PURE__ */ W(Ir, [["__scopeId", "data-v-d3e7f4e0"]]), Rr = ["data-dc-active", "aria-pressed", "aria-label"], Br = /* @__PURE__ */ K({
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
    return (s, o) => (u(), p("button", {
      type: "button",
      class: "dc-star",
      "data-dc-active": e.pinned ? "true" : "false",
      "aria-pressed": e.pinned,
      "aria-label": e.pinned ? `Unpin ${e.name}` : `Pin ${e.name}`,
      onClick: a
    }, E(e.pinned ? "★" : "☆"), 9, Rr));
  }
}), mn = /* @__PURE__ */ W(Br, [["__scopeId", "data-v-ef63d763"]]), Hr = ["src"], Fr = /* @__PURE__ */ K({
  __name: "RowPicture",
  props: {
    src: {}
  },
  setup(e) {
    const t = e, n = B(!1);
    return ae(
      () => t.src,
      () => {
        n.value = !1;
      }
    ), (a, s) => e.src.trim() && !n.value ? (u(), p("img", {
      key: 0,
      class: "dc-picture",
      src: e.src,
      alt: "",
      loading: "lazy",
      decoding: "async",
      onError: s[0] || (s[0] = (o) => n.value = !0)
    }, null, 40, Hr)) : L("", !0);
  }
}), It = /* @__PURE__ */ W(Fr, [["__scopeId", "data-v-afaab300"]]), qr = ["data-dc-standing", "title", "aria-label"], Vr = /* @__PURE__ */ K({
  __name: "QueryMark",
  props: {
    entry: {}
  },
  setup(e) {
    const t = e, n = Z(), a = f(() => lt(t.entry.entity, t.entry.row)), s = f(() => pn(n.query.value.expr, a.value)), o = f(
      () => s.value === "in" ? `The query narrows to ${t.entry.parts.identity} — press to lift that` : `The query leaves out ${t.entry.parts.identity} — press to lift that`
    );
    function l(i) {
      i.stopPropagation(), n.setExpression(ga(n.query.value.expr, a.value));
    }
    return (i, r) => s.value ? (u(), p("button", {
      key: 0,
      type: "button",
      class: "dc-standing",
      "data-dc-standing": s.value,
      title: o.value,
      "aria-label": o.value,
      onClick: l
    }, E(s.value === "in" ? "+" : "−"), 9, qr)) : L("", !0);
  }
}), yn = /* @__PURE__ */ W(Vr, [["__scopeId", "data-v-4b8d4166"]]), Dr = ["aria-label"], Kr = ["data-dc-standing", "data-dc-active", "aria-checked", "title", "aria-label", "onClick"], Wr = /* @__PURE__ */ K({
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
    return (i, r) => (u(), p("span", {
      class: "dc-standing-control",
      role: "radiogroup",
      "aria-label": `Where the query stands on ${e.name}`
    }, [
      (u(!0), p(D, null, X(s.value, (c) => (u(), p("button", {
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
      }, E(c.sign), 9, Kr))), 128))
    ], 8, Dr));
  }
}), en = /* @__PURE__ */ W(Wr, [["__scopeId", "data-v-5524dca6"]]), Oa = /* @__PURE__ */ K({
  __name: "RowStanding",
  props: {
    entry: {}
  },
  setup(e) {
    const t = e, n = Z(), a = f(() => lt(t.entry.entity, t.entry.row)), s = f(() => pn(n.query.value.expr, a.value));
    function o(l) {
      n.setExpression(Qt(n.query.value.expr, a.value, l));
    }
    return (l, i) => a.value !== null ? (u(), A(en, {
      key: 0,
      class: "dc-row-standing",
      standing: s.value,
      name: e.entry.parts.identity,
      onSet: o
    }, null, 8, ["standing", "name"])) : L("", !0);
  }
}), zr = ["href", "title", "aria-label"], jr = /* @__PURE__ */ K({
  __name: "OpenMark",
  props: {
    entry: {}
  },
  setup(e) {
    const t = e, n = Z(), a = f(() => {
      const s = t.entry.row, o = n.recordHref?.(s) ?? null;
      return o ? n.pressHref(s) === o ? null : o : null;
    });
    return (s, o) => a.value ? (u(), p("a", {
      key: 0,
      class: "dc-open",
      href: a.value,
      target: "_blank",
      rel: "noopener noreferrer",
      title: a.value,
      "aria-label": `Open ${e.entry.parts.identity} in a new tab`,
      onClick: o[0] || (o[0] = Te(() => {
      }, ["stop"]))
    }, "↗", 8, zr)) : L("", !0);
  }
}), ut = /* @__PURE__ */ W(jr, [["__scopeId", "data-v-b00f390d"]]), Ur = /* @__PURE__ */ K({
  __name: "ScopeMark",
  props: {
    entry: {}
  },
  setup(e) {
    const t = e, n = Z(), a = f(
      () => n.narrowsOnPress.value ? null : t.entry.entity?.scope ?? null
    ), s = B(null);
    function o(d) {
      s.value = tt(d).exclude ? "out" : "in";
    }
    function l(d) {
      o(d), window.addEventListener("keydown", o), window.addEventListener("keyup", o);
    }
    function i() {
      s.value = null, window.removeEventListener("keydown", o), window.removeEventListener("keyup", o);
    }
    ye(i);
    const r = f(() => a.value ? n.drillHref(t.entry.row, null) : null);
    function c(d, m) {
      m.stopPropagation(), n.drill(t.entry.row, null, d);
    }
    return (d, m) => a.value ? (u(), A(se, {
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
      default: Y(() => [...m[0] || (m[0] = [
        J(" → ", -1)
      ])]),
      _: 1
    }, 8, ["href", "data-dc-pending", "title", "aria-label"])) : L("", !0);
  }
}), dt = /* @__PURE__ */ W(Ur, [["__scopeId", "data-v-05d2c233"]]), Qr = ["checked", "aria-label"], Ie = /* @__PURE__ */ K({
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
    return (s, o) => (u(), p("input", {
      class: "dc-tick",
      type: "checkbox",
      checked: e.selected,
      "aria-label": `Select ${e.name}`,
      onClick: a
    }, null, 8, Qr));
  }
}), Gr = { class: "dc-card__top dc-mono" }, Yr = { class: "dc-card__lead" }, Xr = {
  key: 2,
  class: "dc-card__entity"
}, Jr = { class: "dc-card__top-right" }, Zr = { class: "dc-card__names" }, el = { class: "dc-card__primary" }, tl = {
  key: 0,
  class: "dc-card__secondary dc-mono"
}, nl = {
  key: 1,
  class: "dc-card__facts dc-mono"
}, al = ["title"], sl = { class: "dc-card__fact-label" }, ol = {
  key: 0,
  class: "dc-card__metrics dc-mono"
}, rl = {
  key: 0,
  class: "dc-card__date"
}, ll = /* @__PURE__ */ K({
  __name: "CardsView",
  setup(e) {
    const t = Z(), n = Ae(), a = f(() => t.isEverything.value), s = (l) => l.entity?.card === "picture", o = f(() => n.value.length > 0 && n.value.every(s));
    return (l, i) => (u(), p("div", {
      class: le(["dc-cards", { "dc-cards--pictures": o.value }])
    }, [
      (u(!0), p(D, null, X(k(n), (r) => (u(), p("div", {
        key: r.key,
        class: le(["dc-card", { "dc-card--picture": s(r) }])
      }, [
        S("div", Gr, [
          S("span", Yr, [
            k(t).selectable.value ? (u(), A(Ie, {
              key: 0,
              row: r.row,
              selected: r.selected,
              name: r.parts.identity
            }, null, 8, ["row", "selected", "name"])) : L("", !0),
            s(r) ? L("", !0) : (u(), p(D, { key: 1 }, [
              J(E(r.ordinal), 1)
            ], 64)),
            a.value ? (u(), p("span", Xr, E(r.entityLabel), 1)) : L("", !0)
          ]),
          S("span", Jr, [
            r.parts.state && !s(r) ? (u(), A(Ke, {
              key: 0,
              status: r.parts.state
            }, null, 8, ["status"])) : L("", !0),
            s(r) ? (u(), A(yn, {
              key: 1,
              entry: r
            }, null, 8, ["entry"])) : (u(), A(Oa, {
              key: 2,
              entry: r
            }, null, 8, ["entry"])),
            z(dt, { entry: r }, null, 8, ["entry"]),
            z(ut, { entry: r }, null, 8, ["entry"]),
            k(t).pinnable.value ? (u(), A(mn, {
              key: 3,
              row: r.row,
              name: r.parts.identity,
              pinned: r.pinned
            }, null, 8, ["row", "name", "pinned"])) : L("", !0)
          ])
        ]),
        z(se, {
          class: "dc-card__open",
          href: k(t).pressHref(r.row),
          onPress: (c) => k(t).activate(r.row, c)
        }, {
          default: Y(() => [
            r.parts.image ? (u(), A(It, {
              key: 0,
              class: "dc-card__image",
              src: r.parts.image
            }, null, 8, ["src"])) : L("", !0),
            S("span", Zr, [
              S("span", el, E(r.parts.identity), 1),
              s(r) ? L("", !0) : (u(), p("span", tl, E(r.parts.reference), 1)),
              r.parts.facts.length ? (u(), p("span", nl, [
                (u(!0), p(D, null, X(r.parts.facts, (c) => (u(), p("span", {
                  key: c.column.key ?? c.label,
                  class: "dc-card__fact",
                  title: c.title || void 0
                }, [
                  S("span", sl, E(c.label), 1),
                  J(" " + E(c.text), 1)
                ], 8, al))), 128))
              ])) : L("", !0)
            ])
          ]),
          _: 2
        }, 1032, ["href", "onPress"]),
        s(r) ? L("", !0) : (u(), p("div", ol, [
          (u(!0), p(D, null, X(r.parts.metrics.slice(0, 2), (c) => (u(), A(ct, {
            key: c.column.key ?? c.label,
            entry: r,
            column: c.column
          }, {
            default: Y(() => [
              J(E(c.label) + " " + E(c.text), 1)
            ]),
            _: 2
          }, 1032, ["entry", "column"]))), 128)),
          r.parts.updated ? (u(), p("span", rl, E(r.parts.updated), 1)) : L("", !0)
        ]))
      ], 2))), 128))
    ], 2));
  }
}), Na = /* @__PURE__ */ W(ll, [["__scopeId", "data-v-fd252138"]]), il = { class: "dc-grid" }, cl = { class: "dc-tile__scrim" }, ul = { class: "dc-tile__top dc-mono" }, dl = { class: "dc-tile__chip" }, fl = { class: "dc-tile__caption" }, vl = { class: "dc-tile__secondary dc-truncate" }, pl = { class: "dc-tile__primary" }, hl = /* @__PURE__ */ K({
  __name: "GridView",
  setup(e) {
    const t = Z(), n = Ae();
    return (a, s) => (u(), p("div", il, [
      (u(!0), p(D, null, X(k(n), (o) => (u(), p("div", {
        key: o.key,
        class: "dc-grid__cell"
      }, [
        z(se, {
          class: "dc-tile",
          style: oe({ "--dc-tile-tint": o.parts.tint ?? void 0 }),
          href: k(t).pressHref(o.row),
          onPress: (l) => k(t).activate(o.row, l)
        }, {
          default: Y(() => [
            o.parts.image ? (u(), A(It, {
              key: 0,
              class: "dc-tile__image",
              src: o.parts.image
            }, null, 8, ["src"])) : L("", !0),
            S("span", cl, [
              S("span", ul, [
                S("span", dl, E(o.ordinal), 1)
              ]),
              S("span", fl, [
                S("span", vl, E(o.parts.reference), 1),
                S("span", pl, E(o.parts.identity), 1)
              ])
            ])
          ]),
          _: 2
        }, 1032, ["style", "href", "onPress"]),
        k(t).selectable.value ? (u(), A(Ie, {
          key: 0,
          class: "dc-grid__tick",
          row: o.row,
          selected: o.selected,
          name: o.parts.identity
        }, null, 8, ["row", "selected", "name"])) : L("", !0)
      ]))), 128))
    ]));
  }
}), Aa = /* @__PURE__ */ W(hl, [["__scopeId", "data-v-89c40a9e"]]);
function Vn(e, t, n, a) {
  return (n - a * (t - 1)) / e;
}
function Vt(e, t) {
  return e > 0 ? Math.min(t, e) : t;
}
function ml(e) {
  return e > 0 ? e : 1 / 0;
}
function yl(e, t, n) {
  const { width: a, height: s, gap: o = 0 } = n;
  if (!e.length) return [];
  if (!(a > 0) || !(s > 0)) return [{ items: [...e], height: s, filled: !1 }];
  const l = [];
  let i = [], r = 0, c = 0;
  for (const d of e) {
    const m = t(d), w = Math.max(m.ratio, Number.EPSILON), g = m.height && m.height > 0 ? Math.max(c, m.height) : c, _ = Vt(g, s), v = Vn(r + w, i.length + 1, a, o);
    if (v > _) {
      i.push(d), r += w, c = g;
      continue;
    }
    const b = Vt(c, s), P = i.length ? Vn(r, i.length, a, o) : 1 / 0;
    P <= ml(c) && P - b < _ - v ? (l.push({ items: i, height: P, filled: !0 }), i = [d], r = w, c = m.height && m.height > 0 ? m.height : 0) : (l.push({ items: [...i, d], height: v, filled: !0 }), i = [], r = 0, c = 0);
  }
  return i.length && l.push({ items: i, height: Vt(c, s), filled: !1 }), l;
}
const gl = { class: "dc-images" }, _l = {
  key: 1,
  class: "dc-images__blank",
  "aria-hidden": "true"
}, wl = 240, ft = 8, kl = 1, bl = /* @__PURE__ */ K({
  __name: "ImagesView",
  setup(e) {
    const t = Z(), n = Ae(), a = wn(/* @__PURE__ */ new Map()), s = wn(/* @__PURE__ */ new Set());
    function o(_, v) {
      const b = v.target;
      b.naturalWidth > 0 && b.naturalHeight > 0 && a.set(_, { width: b.naturalWidth, height: b.naturalHeight });
    }
    function l(_) {
      const v = _.parts.image;
      return v && !s.has(v) ? v : null;
    }
    function i(_) {
      const v = l(_);
      return v ? a.get(v) : void 0;
    }
    function r(_) {
      const v = i(_);
      return v ? { ratio: v.width / v.height, height: v.height } : { ratio: kl };
    }
    const c = B(null), d = B(0);
    let m = null;
    function w() {
      d.value = c.value?.clientWidth ?? 0;
    }
    ot(() => {
      w(), !(!c.value || typeof ResizeObserver > "u") && (m = new ResizeObserver(w), m.observe(c.value));
    }), ye(() => {
      m?.disconnect(), m = null;
    });
    const g = f(() => {
      const _ = yl(n.value, r, {
        width: d.value,
        height: wl,
        gap: ft
      }), v = [];
      let b = 0;
      for (const P of _) {
        let x = 0;
        for (const h of P.items) {
          const y = r(h).ratio * P.height, M = i(h), I = M !== void 0 && M.height < P.height;
          v.push({
            entry: h,
            style: {
              top: `${b}px`,
              left: `${x}px`,
              width: `${y}px`,
              height: `${P.height}px`
            },
            picture: I ? { width: `${M.width}px`, height: `${M.height}px` } : { width: "100%", height: "100%" }
          }), x += y + ft;
        }
        b += P.height + ft;
      }
      return { boxes: v, height: _.length ? b - ft : 0 };
    });
    return (_, v) => (u(), p("div", gl, [
      S("div", {
        ref_key: "wall",
        ref: c,
        class: "dc-images__wall",
        style: oe({ height: `${g.value.height}px` })
      }, [
        (u(!0), p(D, null, X(g.value.boxes, ({ entry: b, style: P, picture: x }) => (u(), p("div", {
          key: b.key,
          class: "dc-images__cell",
          style: oe(P)
        }, [
          z(se, {
            class: "dc-images__open",
            title: b.parts.identity,
            "aria-label": b.parts.identity,
            href: k(t).pressHref(b.row),
            onPress: (h) => k(t).activate(b.row, h)
          }, {
            default: Y(() => [
              l(b) ? (u(), A(It, {
                key: 0,
                class: "dc-images__picture",
                style: oe(x),
                src: l(b),
                onLoad: (h) => o(l(b), h),
                onError: (h) => s.add(l(b))
              }, null, 8, ["style", "src", "onLoad", "onError"])) : (u(), p("span", _l, E(b.parts.identity), 1))
            ]),
            _: 2
          }, 1032, ["title", "aria-label", "href", "onPress"]),
          k(t).selectable.value ? (u(), A(Ie, {
            key: 0,
            class: "dc-images__tick",
            row: b.row,
            selected: b.selected,
            name: b.parts.identity
          }, null, 8, ["row", "selected", "name"])) : L("", !0)
        ], 4))), 128))
      ], 4)
    ]));
  }
}), Ia = /* @__PURE__ */ W(bl, [["__scopeId", "data-v-2d267370"]]), $l = { class: "dc-links" }, xl = { class: "dc-link__primary dc-truncate" }, Sl = { class: "dc-link__secondary dc-mono dc-truncate" }, Cl = /* @__PURE__ */ K({
  __name: "LinksView",
  setup(e) {
    const t = Z(), n = Ae();
    return (a, s) => (u(), p("div", $l, [
      (u(!0), p(D, null, X(k(n), (o) => (u(), p("span", {
        key: o.key,
        class: "dc-links__item"
      }, [
        k(t).selectable.value ? (u(), A(Ie, {
          key: 0,
          row: o.row,
          selected: o.selected,
          name: o.parts.identity
        }, null, 8, ["row", "selected", "name"])) : L("", !0),
        z(se, {
          class: "dc-link",
          href: k(t).pressHref(o.row),
          onPress: (l) => k(t).activate(o.row, l)
        }, {
          default: Y(() => [
            S("span", xl, E(o.parts.identity), 1),
            S("span", Sl, E(o.parts.reference), 1)
          ]),
          _: 2
        }, 1032, ["href", "onPress"])
      ]))), 128))
    ]));
  }
}), Ra = /* @__PURE__ */ W(Cl, [["__scopeId", "data-v-de6c9a0f"]]), Pl = {
  class: "dc-list",
  role: "list"
}, El = { class: "dc-list__ordinal dc-mono" }, Ml = { class: "dc-list__identity" }, Ll = { class: "dc-list__primary dc-truncate" }, Tl = { class: "dc-list__secondary dc-mono dc-truncate" }, Ol = {
  key: 1,
  class: "dc-list__entity dc-mono"
}, Nl = { class: "dc-list__metrics dc-mono" }, Al = { class: "dc-list__trailing" }, Il = /* @__PURE__ */ K({
  __name: "ListView",
  setup(e) {
    const t = Z(), n = Ae(), a = f(() => t.isEverything.value);
    return (s, o) => (u(), p("div", Pl, [
      (u(!0), p(D, null, X(k(n), (l) => (u(), p("div", {
        key: l.key,
        class: "dc-list__row",
        role: "listitem"
      }, [
        k(t).selectable.value ? (u(), A(Ie, {
          key: 0,
          class: "dc-list__tick",
          row: l.row,
          selected: l.selected,
          name: l.parts.identity
        }, null, 8, ["row", "selected", "name"])) : L("", !0),
        z(Oa, {
          class: "dc-list__standing",
          entry: l
        }, null, 8, ["entry"]),
        z(se, {
          class: "dc-list__open",
          href: k(t).pressHref(l.row),
          onPress: (i) => k(t).activate(l.row, i)
        }, {
          default: Y(() => [
            S("span", El, E(l.ordinal), 1),
            S("span", Ml, [
              S("span", Ll, E(l.parts.identity), 1),
              S("span", Tl, E(l.parts.reference), 1)
            ])
          ]),
          _: 2
        }, 1032, ["href", "onPress"]),
        a.value ? (u(), p("span", Ol, E(l.entityLabel), 1)) : L("", !0),
        S("span", Nl, [
          (u(!0), p(D, null, X(l.parts.metrics.slice(0, 2), (i) => (u(), A(ct, {
            key: i.column.key ?? i.label,
            entry: l,
            column: i.column
          }, null, 8, ["entry", "column"]))), 128))
        ]),
        S("span", Al, [
          l.parts.state ? (u(), A(Ke, {
            key: 0,
            status: l.parts.state
          }, null, 8, ["status"])) : L("", !0),
          z(dt, { entry: l }, null, 8, ["entry"]),
          z(ut, { entry: l }, null, 8, ["entry"]),
          k(t).pinnable.value ? (u(), A(mn, {
            key: 1,
            row: l.row,
            name: l.parts.identity,
            pinned: l.pinned
          }, null, 8, ["row", "name", "pinned"])) : L("", !0)
        ])
      ]))), 128))
    ]));
  }
}), tn = /* @__PURE__ */ W(Il, [["__scopeId", "data-v-3d349a10"]]), Rl = { class: "dc-preview" }, Bl = { class: "dc-preview__pager dc-mono" }, Hl = ["disabled"], Fl = { "aria-live": "polite" }, ql = ["disabled"], Vl = {
  key: 0,
  class: "dc-preview__card"
}, Dl = ["src"], Kl = { class: "dc-preview__body" }, Wl = { class: "dc-preview__top" }, zl = { class: "dc-preview__badges" }, jl = { class: "dc-preview__entity dc-mono" }, Ul = { class: "dc-preview__marks" }, Ql = { class: "dc-preview__primary" }, Gl = { class: "dc-preview__secondary dc-mono" }, Yl = { class: "dc-preview__fields" }, Xl = { class: "dc-preview__key" }, Jl = { class: "dc-preview__value dc-mono" }, Zl = /* @__PURE__ */ K({
  __name: "PreviewView",
  setup(e) {
    const t = Z(), n = Ae(), a = B(0);
    ae(n, (r) => {
      a.value > r.length - 1 && (a.value = Math.max(0, r.length - 1));
    });
    const s = f(() => n.value[a.value]), o = f(() => {
      const r = s.value;
      if (!r) return [];
      const c = ve(r.columns, "reference"), d = ve(r.columns, "updated");
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
    return (r, c) => (u(), p("div", Rl, [
      S("div", Bl, [
        S("button", {
          type: "button",
          class: "dc-preview__step",
          "aria-label": "Previous result",
          disabled: a.value === 0,
          onClick: c[0] || (c[0] = (d) => i(-1))
        }, " ‹ ", 8, Hl),
        S("span", Fl, E(l.value), 1),
        S("button", {
          type: "button",
          class: "dc-preview__step",
          "aria-label": "Next result",
          disabled: a.value >= k(n).length - 1,
          onClick: c[1] || (c[1] = (d) => i(1))
        }, " › ", 8, ql)
      ]),
      s.value ? (u(), p("div", Vl, [
        S("div", {
          class: "dc-preview__media",
          style: oe({ background: s.value.parts.tint ?? void 0 }),
          "aria-hidden": "true"
        }, [
          s.value.parts.image ? (u(), p("img", {
            key: 0,
            class: "dc-preview__image",
            src: s.value.parts.image,
            alt: ""
          }, null, 8, Dl)) : (u(), p(D, { key: 1 }, [
            J(" preview ")
          ], 64))
        ], 4),
        S("div", Kl, [
          S("div", Wl, [
            S("span", zl, [
              k(t).selectable.value ? (u(), A(Ie, {
                key: 0,
                row: s.value.row,
                selected: s.value.selected,
                name: s.value.parts.identity
              }, null, 8, ["row", "selected", "name"])) : L("", !0),
              s.value.parts.state ? (u(), A(Ke, {
                key: 1,
                status: s.value.parts.state
              }, null, 8, ["status"])) : L("", !0),
              S("span", jl, E(s.value.entityLabel), 1)
            ]),
            S("span", Ul, [
              z(yn, { entry: s.value }, null, 8, ["entry"]),
              z(dt, { entry: s.value }, null, 8, ["entry"]),
              z(ut, { entry: s.value }, null, 8, ["entry"]),
              k(t).pinnable.value ? (u(), A(mn, {
                key: 0,
                row: s.value.row,
                name: s.value.parts.identity,
                pinned: s.value.pinned
              }, null, 8, ["row", "name", "pinned"])) : L("", !0)
            ])
          ]),
          S("div", null, [
            S("div", Ql, E(s.value.parts.identity), 1),
            S("div", Gl, E(s.value.parts.reference), 1)
          ]),
          S("dl", Yl, [
            (u(!0), p(D, null, X(o.value, (d) => (u(), p("div", {
              key: d.key,
              class: "dc-preview__field"
            }, [
              S("dt", Xl, E(d.key), 1),
              S("dd", Jl, [
                d.column && s.value ? (u(), A(ct, {
                  key: 0,
                  entry: s.value,
                  column: d.column
                }, null, 8, ["entry", "column"])) : (u(), p(D, { key: 1 }, [
                  J(E(d.value), 1)
                ], 64))
              ])
            ]))), 128))
          ]),
          z(se, {
            class: "dc-preview__open",
            href: s.value ? k(t).pressHref(s.value.row) : null,
            onPress: c[2] || (c[2] = (d) => s.value && k(t).activate(s.value.row, d))
          }, {
            default: Y(() => [...c[3] || (c[3] = [
              J(" Open record → ", -1)
            ])]),
            _: 1
          }, 8, ["href"])
        ])
      ])) : L("", !0)
    ]));
  }
}), Ba = /* @__PURE__ */ W(Zl, [["__scopeId", "data-v-59e0d33b"]]);
function ei() {
  const e = Z();
  return f(() => ms(e.schema.value, e.entity.value));
}
function gn(e, t) {
  const n = (a) => {
    e.pressPreview && (e.pressPreview.value = a);
  };
  return {
    mouseenter: () => n(t),
    mouseleave: () => n(null),
    focus: () => n(t),
    blur: () => n(null)
  };
}
function Ha(e, t) {
  const n = e.narrowsOnPress.value ? lt(t.entity, t.row) : null;
  return n ? { term: n, name: t.parts.identity } : null;
}
const ti = /* @__PURE__ */ K({
  __name: "CellNarrow",
  props: {
    entry: {},
    column: {},
    narrowings: {},
    truncates: { type: Boolean }
  },
  setup(e) {
    const t = e, n = Z(), a = f(() => Oe(t.column, t.entry.row));
    function s(c, d = !1) {
      return we({ ...c.term, ...d ? { negated: !0 } : {} });
    }
    function o(c, d = !1) {
      return et(n.query.value.expr, s(c, d));
    }
    function l(c) {
      return n.narrowHref(o(c), n.query.value.entity);
    }
    function i(c) {
      return `Narrow to ${s(c)}
⌥-press to leave these out`;
    }
    function r(c, d, m) {
      m.stopPropagation(), n.narrow(o(c, d.exclude), n.query.value.entity);
    }
    return (c, d) => (u(), p("span", {
      class: le(["dc-cell__text", { "dc-truncate": e.truncates }])
    }, [
      (u(!0), p(D, null, X(e.narrowings, (m, w) => (u(), p(D, {
        key: s(m)
      }, [
        w > 0 ? (u(), p(D, { key: 0 }, [
          J(", ")
        ], 64)) : L("", !0),
        z(se, Ve({
          class: "dc-narrow",
          href: l(m),
          title: i(m),
          selectable: ""
        }, sn(k(gn)(k(n), { term: s(m) })), {
          onPress: (g, _) => r(m, g, _)
        }), {
          default: Y(() => [
            G(c.$slots, "default", {}, () => [
              J(E(m.label ?? a.value), 1)
            ], !0)
          ]),
          _: 2
        }, 1040, ["href", "title", "onPress"])
      ], 64))), 128))
    ], 2));
  }
}), Dn = /* @__PURE__ */ W(ti, [["__scopeId", "data-v-32edb69e"]]), ni = /* @__PURE__ */ new Set(["ordinal", "image", "component", "date"]), ai = 4;
function Fa(e) {
  return (e.field ?? e.key)?.toLowerCase();
}
function qa(e) {
  return e.narrow === !1 || e.role === "identity" || e.activate || e.click || e.drill ? !1 : !ni.has(e.kind ?? "text") && Fa(e) !== void 0;
}
function si(e, t) {
  if (Number.isInteger(e)) return e;
  const n = 10 ** ai;
  return (t ? Math.ceil(e * n - 1e-6) : Math.floor(e * n + 1e-6)) / n;
}
function oi(e, t) {
  let n = 1 / 0, a = -1 / 0;
  for (const s of t) {
    const o = ie(e, s);
    typeof o != "number" || !Number.isFinite(o) || (o < n && (n = o), o > a && (a = o));
  }
  return n <= a ? { min: n, max: a } : null;
}
function ri(e, t, n, a = null) {
  if (!qa(e)) return [];
  const s = Fa(e);
  if (e.flags)
    return Object.entries(e.flags).filter(([r]) => t.fields[r] === !0).map(([r, c]) => ({
      label: c,
      term: { kind: "field", field: r.toLowerCase(), comparator: ":", value: "true" }
    }));
  const o = ie(e, t), l = n?.facets.find((r) => r.key.toLowerCase() === s);
  if (typeof o == "number") {
    if (!Number.isFinite(o)) return [];
    const r = l?.kind === "range" ? { min: l.min, max: l.max } : a, c = !r || o - r.min <= r.max - o;
    return [{
      label: null,
      term: { kind: "field", field: s, comparator: c ? "<=" : ">=", value: String(si(o, c)) }
    }];
  }
  return (Array.isArray(o) ? o : [o]).filter(
    (r) => typeof r == "string" && r !== ""
  ).map((r) => ({
    label: Array.isArray(o) ? r : null,
    term: { kind: "field", field: s, comparator: "=", value: r }
  }));
}
const Kn = /* @__PURE__ */ new WeakMap();
function li(e, t) {
  let n = Kn.get(e);
  return n || Kn.set(e, n = /* @__PURE__ */ new Map()), n.has(t) || n.set(t, oi(t, e)), n.get(t);
}
const ii = /* @__PURE__ */ K({
  __name: "ColumnCell",
  props: {
    column: {},
    entry: {}
  },
  setup(e) {
    const t = e, n = Z(), a = f(() => t.column.kind ?? "text"), s = f(() => ie(t.column, t.entry.row)), o = f(
      () => a.value === "ordinal" ? t.entry.ordinal : Oe(t.column, t.entry.row)
    ), l = f(() => s.value), i = f(() => t.column.activate === !0 || !!t.column.click), r = f(() => jt(t.column)), c = f(() => na(t.column, t.entry.row)), d = f(() => {
      if (!qa(t.column)) return [];
      const _ = typeof s.value == "number" ? li(n.rows.value, t.column) : null;
      return ri(t.column, t.entry.row, t.entry.entity ?? null, _);
    });
    function m(_) {
      i.value && (_.stopPropagation(), w(tt(_)));
    }
    function w(_) {
      t.column.click?.(t.entry.row, _), t.column.activate && n.activate(t.entry.row, _);
    }
    const g = f(
      () => t.column.activate && !t.column.click ? n.pressHref(t.entry.row) : null
    );
    return (_, v) => a.value === "component" && e.column.component ? (u(), A(Ge(e.column.component), {
      key: 0,
      row: e.entry.row,
      entry: e.entry,
      value: s.value,
      column: e.column
    }, null, 8, ["row", "entry", "value", "column"])) : a.value === "status" && d.value.length ? (u(), A(Dn, {
      key: 1,
      entry: e.entry,
      column: e.column,
      narrowings: d.value,
      truncates: !1
    }, {
      default: Y(() => [
        z(Ke, { status: l.value }, null, 8, ["status"])
      ]),
      _: 1
    }, 8, ["entry", "column", "narrowings"])) : a.value === "status" ? (u(), A(Ke, {
      key: 2,
      status: l.value
    }, null, 8, ["status"])) : a.value === "image" ? (u(), A(It, {
      key: 3,
      class: "dc-cell__image",
      src: typeof s.value == "string" ? s.value : "",
      style: oe({ maxHeight: e.column.height }),
      onClick: m
    }, null, 8, ["src", "style"])) : e.column.drill ? (u(), A(ct, {
      key: 4,
      entry: e.entry,
      column: e.column
    }, null, 8, ["entry", "column"])) : i.value ? (u(), A(se, Ve({
      key: 5,
      class: ["dc-table__open", { "dc-truncate": r.value }],
      href: g.value,
      title: c.value
    }, sn(e.column.activate ? k(gn)(k(n), k(Ha)(k(n), e.entry)) : {}), {
      onPress: v[0] || (v[0] = (b, P) => {
        P.stopPropagation(), w(b);
      })
    }), {
      default: Y(() => [
        J(E(o.value), 1)
      ]),
      _: 1
    }, 16, ["class", "href", "title"])) : d.value.length ? (u(), A(Dn, {
      key: 6,
      entry: e.entry,
      column: e.column,
      narrowings: d.value,
      truncates: r.value
    }, null, 8, ["entry", "column", "narrowings", "truncates"])) : (u(), p("span", {
      key: 7,
      class: le(["dc-cell__text", { "dc-truncate": r.value }])
    }, E(o.value), 3));
  }
}), Wn = /* @__PURE__ */ W(ii, [["__scopeId", "data-v-4b81f005"]]), ci = {
  key: 0,
  class: "dc-table__none"
}, ui = { class: "dc-table__detail" }, di = ["data-dc-wrap", "data-dc-row-links"], fi = {
  key: 0,
  class: "dc-table__pick",
  scope: "col"
}, vi = {
  key: 1,
  class: "dc-table__standing",
  scope: "col"
}, pi = ["data-dc-align", "data-dc-hide", "aria-sort", "title"], hi = {
  key: 2,
  class: "dc-table__head"
}, mi = ["onClick"], yi = {
  key: 0,
  class: "dc-table__pick"
}, gi = {
  key: 1,
  class: "dc-table__standing"
}, _i = ["data-dc-align", "data-dc-hide", "title"], wi = {
  key: 1,
  class: "dc-table__name"
}, ki = /* @__PURE__ */ K({
  __name: "TableView",
  setup(e) {
    const t = Z(), n = Ae(), a = ei();
    function s(T, j) {
      if (!t.rowLinks?.value || _a()) return;
      const O = t.pressHref(T);
      if (O && Yt(j)) {
        Gt(O, j);
        return;
      }
      t.activate(T, tt(j));
    }
    const o = f(() => t.rowLinks?.value ? new Map(n.value.map((T) => [T.key, t.pressHref(T.row)])) : /* @__PURE__ */ new Map()), l = f(
      () => a.value.find((T) => T.role === "identity") ?? a.value[0]
    );
    function i(T, j, O) {
      O.stopPropagation(), t.activate(T, j);
    }
    function r(T) {
      const j = la(T, t.entity.value, t.schema.value), O = j ? `Shortcut: ${j}` : void 0;
      return [T.hint, O].filter(Boolean).join(`
`) || void 0;
    }
    const c = f(() => {
      const T = a.value.find((O) => O.scope);
      return T || ((t.entity.value ? !!t.entity.value.href : t.entities.value.some((O) => O.href)) ? a.value.find((O) => O.activate) : void 0);
    }), d = f(
      () => t.entity.value ? !!t.entity.value.scope : t.entities.value.some((T) => T.scope)
    ), m = (T) => lt(T.entity, T.row), w = (T) => pn(t.query.value.expr, m(T));
    function g(T, j) {
      t.setExpression(Qt(t.query.value.expr, m(T), j));
    }
    const _ = f(() => {
      const T = n.value.filter((O) => m(O) !== null), j = T.filter((O) => O.selected);
      return j.length ? j : T;
    }), v = f(() => _.value.some((T) => T.selected)), b = f(() => {
      const T = _.value[0];
      return T ? w(T) : null;
    }), P = f(
      () => _.value.some((T) => w(T) !== b.value)
    ), x = f(
      () => v.value ? "the ticked rows" : "every row on this page"
    );
    function h(T) {
      t.setExpression(
        _.value.reduce(
          (j, O) => Qt(j, m(O), T),
          t.query.value.expr
        )
      );
    }
    const y = f(
      () => a.value.some((T) => T.kind === "image" || T.height !== void 0)
    );
    function M(T) {
      T && (t.query.value.sort === T ? t.toggleDirection() : t.setSort(T));
    }
    function I(T) {
      return T ? t.query.value.sort === T ? t.hrefFor({ dir: t.query.value.dir === "desc" ? "asc" : "desc" }) : t.hrefFor({ sort: T }) : null;
    }
    const te = f(() => t.entity.value?.label ?? "The result set"), q = f(() => new Set(t.sorts.value.map((T) => T.key))), V = (T) => T.sort !== void 0 && q.value.has(T.sort), Q = (T) => {
      if (V(T))
        return t.query.value.sort !== T.sort ? "none" : t.query.value.dir === "desc" ? "descending" : "ascending";
    };
    function fe(T) {
      return [
        En(T),
        T.muted ? "dc-table__muted" : "",
        T.mono ? "dc-mono" : "",
        jt(T) ? "dc-truncate" : ""
      ].filter(Boolean).join(" ");
    }
    function de(T, j) {
      if (!(!jt(T) || T.activate || T.click))
        return na(T, j.row);
    }
    const ue = B(null);
    function ee(T) {
      ue.value && (ue.value.scrollLeft = T.target.scrollLeft);
    }
    return (T, j) => k(a).length ? (u(), p("table", {
      key: 1,
      class: "dc-table",
      "data-dc-wrap": y.value ? "" : void 0,
      "data-dc-row-links": k(t).rowLinks?.value ? "" : void 0
    }, [
      S("thead", {
        ref_key: "head",
        ref: ue,
        "data-dc-stuck": ""
      }, [
        S("tr", null, [
          k(t).selectable.value ? (u(), p("th", fi, [
            z(La)
          ])) : L("", !0),
          d.value ? (u(), p("th", vi, [
            _.value.length ? (u(), A(en, {
              key: 0,
              standing: b.value,
              mixed: P.value,
              name: x.value,
              onSet: h
            }, null, 8, ["standing", "mixed", "name"])) : L("", !0)
          ])) : L("", !0),
          (u(!0), p(D, null, X(k(a), (O, ne) => (u(), p("th", {
            key: k(Cn)(O, ne),
            scope: "col",
            class: le(k(En)(O)),
            style: oe({ width: O.width }),
            "data-dc-align": k(Pn)(O),
            "data-dc-hide": O.hideBelow,
            "aria-sort": Q(O),
            title: r(O)
          }, [
            V(O) ? (u(), A(se, {
              key: 0,
              class: "dc-table__sort",
              href: I(O.sort),
              onPress: (ke) => M(O.sort)
            }, {
              default: Y(() => [
                J(E(O.label), 1)
              ]),
              _: 2
            }, 1032, ["href", "onPress"])) : (u(), p(D, { key: 1 }, [
              J(E(O.label), 1)
            ], 64)),
            O.header ? (u(), p("span", hi, [
              (u(), A(Ge(O.header), {
                column: O,
                entity: k(t).entity.value
              }, null, 8, ["column", "entity"]))
            ])) : L("", !0)
          ], 14, pi))), 128))
        ])
      ], 512),
      S("tbody", {
        "data-dc-scroll": "",
        onScroll: ee
      }, [
        (u(!0), p(D, null, X(k(n), (O) => (u(), p("tr", {
          key: O.key,
          class: "dc-table__row",
          onClick: (ne) => s(O.row, ne)
        }, [
          k(t).selectable.value ? (u(), p("td", yi, [
            z(Ie, {
              row: O.row,
              selected: O.selected,
              name: O.parts.identity
            }, null, 8, ["row", "selected", "name"])
          ])) : L("", !0),
          d.value ? (u(), p("td", gi, [
            m(O) !== null ? (u(), A(en, {
              key: 0,
              standing: w(O),
              name: O.parts.identity,
              onSet: (ne) => g(O, ne)
            }, null, 8, ["standing", "name", "onSet"])) : L("", !0)
          ])) : L("", !0),
          (u(!0), p(D, null, X(k(a), (ne, ke) => (u(), p("td", {
            key: k(Cn)(ne, ke),
            class: le(fe(ne)),
            style: oe({ width: ne.width }),
            "data-dc-align": k(Pn)(ne),
            "data-dc-hide": ne.hideBelow,
            title: de(ne, O)
          }, [
            o.value.get(O.key) ? (u(), A(se, Ve({
              key: 0,
              class: "dc-table__cell-link",
              href: o.value.get(O.key),
              tabindex: ne === l.value ? void 0 : -1,
              "aria-hidden": ne === l.value ? void 0 : "true",
              "aria-label": ne === l.value ? O.parts.identity : void 0
            }, sn(k(gn)(k(t), k(Ha)(k(t), O))), {
              onPress: (Re, be) => i(O.row, Re, be)
            }), null, 16, ["href", "tabindex", "aria-hidden", "aria-label", "onPress"])) : L("", !0),
            ne === c.value ? (u(), p("span", wi, [
              z(Wn, {
                column: ne,
                entry: O
              }, null, 8, ["column", "entry"]),
              z(dt, { entry: O }, null, 8, ["entry"]),
              z(ut, { entry: O }, null, 8, ["entry"])
            ])) : (u(), A(Wn, {
              key: 2,
              column: ne,
              entry: O
            }, null, 8, ["column", "entry"]))
          ], 14, _i))), 128))
        ], 8, mi))), 128))
      ], 32)
    ], 8, di)) : (u(), p("p", ci, [
      j[2] || (j[2] = S("span", { class: "dc-table__headline" }, "No columns declared", -1)),
      S("span", ui, [
        J(E(te.value) + " has no ", 1),
        j[0] || (j[0] = S("code", null, "columns", -1)),
        j[1] || (j[1] = J(" in the schema, so there is no table to draw. ", -1))
      ])
    ]));
  }
}), Va = /* @__PURE__ */ W(ki, [["__scopeId", "data-v-8a634047"]]);
function bi(e) {
  const t = me([]), n = B(!1), a = me(null);
  let s = 0;
  const o = (r, c, d, m, w) => ({
    entity: r,
    rows: e.limit.value > 0 ? c.rows.map((g, _) => Ta(g, _, r, e.isPinned(g.id))) : [],
    total: c.total,
    count: d ? zt(r) : pt(c.total),
    pinned: $i(m, c, w)
  }), l = () => {
    const r = ++s, c = e.query.value, d = e.schema.value, m = e.entities.value, w = e.limit.value, g = e.within?.value.trim() ?? "", _ = rn(c) && !g, v = g ? un(g, c.expr) : c.expr, b = m.map((P) => ({
      entity: P,
      // Scope the query to this entity, keeping the expression and ordering.
      outcome: e.source.value.query({
        // Each card is the top few of its type, wherever the shell's own
        // result set has been paged to — so this asks for the first page.
        query: { ...c, entity: P.key, expr: v, page: 1 },
        schema: d,
        entity: P,
        /*
         * One row where none are shown, not none: to a source a limit of 0 is
         * no limit, which would fetch every record of every type to draw a
         * count. The one row is still read — it is what says whether the type
         * holds nothing but the record the query named.
         */
        limit: Math.max(w, 1),
        offset: 0
      })
    }));
    if (b.every(({ outcome: P }) => !(P instanceof Promise))) {
      t.value = b.map(
        ({ entity: P, outcome: x }) => o(P, x, _, d, v)
      ), a.value = null, n.value = !1;
      return;
    }
    n.value = !0, Promise.all(b.map(({ outcome: P }) => Promise.resolve(P))).then((P) => {
      r === s && (t.value = P.map(
        (x, h) => o(b[h].entity, x, _, d, v)
      ), a.value = null);
    }).catch((P) => {
      r === s && (a.value = P, t.value = []);
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
  return ae(
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
function $i(e, t, n) {
  const a = t.rows[0];
  if (t.total !== 1 || t.rows.length !== 1 || !a)
    return !1;
  const s = n.trim();
  if (!s)
    return !1;
  const o = _t(e, a);
  return !!o && it(s, o) === s;
}
const xi = ["data-dc-pending", "data-dc-heads-only"], Si = {
  key: 0,
  class: "dc-types__state",
  role: "alert"
}, Ci = {
  key: 1,
  class: "dc-types__state",
  "aria-live": "polite"
}, Pi = {
  key: 2,
  class: "dc-types__state"
}, Ei = ["data-dc-empty"], Mi = { class: "dc-type__name" }, Li = { class: "dc-type__count dc-mono" }, Ti = { class: "dc-type__sr" }, Oi = {
  key: 0,
  class: "dc-type__description"
}, Ni = {
  key: 0,
  class: "dc-type__empty"
}, Ai = { class: "dc-type__identity" }, Ii = { class: "dc-type__primary dc-truncate" }, Ri = { class: "dc-type__secondary dc-mono dc-truncate" }, Bi = { class: "dc-type__trailing dc-mono" }, Hi = { class: "dc-type__metric-value" }, Fi = { class: "dc-type__metric-label" }, qi = {
  key: 0,
  class: "dc-type__date"
}, Vi = /* @__PURE__ */ K({
  __name: "TypeCardsView",
  setup(e) {
    const t = Z(), { previews: n, pending: a, error: s } = bi({
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
    return (r, c) => (u(), p("div", {
      class: "dc-types",
      "data-dc-pending": k(a) ? "true" : "false",
      "data-dc-heads-only": l.value ? "true" : "false"
    }, [
      G(r.$slots, "before", {}, void 0, !0),
      k(s) ? (u(), p("p", Si, " Could not load results: " + E(k(s) instanceof Error ? k(s).message : "the data source failed."), 1)) : !i.value.length && k(a) ? (u(), p("p", Ci, " Running query… ")) : i.value.length ? L("", !0) : (u(), p("p", Pi, E(o.value ? "Nothing matches this query" : "Nothing here yet"), 1)),
      (u(!0), p(D, null, X(i.value, (d) => (u(), p("section", {
        key: d.entity.key,
        class: "dc-type",
        "data-dc-empty": d.total ? "false" : "true"
      }, [
        z(se, {
          class: "dc-type__head",
          href: k(t).entityHref(d.entity.key),
          onPress: (m) => k(t).setEntity(d.entity.key)
        }, {
          default: Y(() => [
            S("span", Mi, E(d.entity.label), 1),
            S("span", Li, E(d.count), 1),
            c[0] || (c[0] = S("span", {
              class: "dc-type__go",
              "aria-hidden": "true"
            }, "→", -1)),
            S("span", Ti, "Show only " + E(d.entity.label.toLowerCase()), 1),
            d.entity.description ? (u(), p("span", Oi, E(d.entity.description), 1)) : L("", !0)
          ]),
          _: 2
        }, 1032, ["href", "onPress"]),
        d.total ? L("", !0) : (u(), p("p", Ni, E(o.value ? "No matches" : "Nothing here yet"), 1)),
        (u(!0), p(D, null, X(d.rows, (m) => (u(), p("div", {
          key: m.key,
          class: "dc-type__row"
        }, [
          z(se, {
            class: "dc-type__open",
            href: k(t).pressHref(m.row),
            onPress: (w) => k(t).activate(m.row, w)
          }, {
            default: Y(() => [
              S("span", Ai, [
                S("span", Ii, E(m.parts.identity), 1),
                S("span", Ri, E(m.parts.reference), 1)
              ])
            ]),
            _: 2
          }, 1032, ["href", "onPress"]),
          S("span", Bi, [
            (u(!0), p(D, null, X(m.parts.metrics.slice(0, 1), (w) => (u(), A(ct, {
              key: w.column.key ?? w.label,
              class: "dc-type__metric",
              entry: m,
              column: w.column
            }, {
              default: Y(() => [
                S("span", Hi, E(w.text), 1),
                S("span", Fi, E(w.label), 1)
              ]),
              _: 2
            }, 1032, ["entry", "column"]))), 128)),
            m.parts.updated ? (u(), p("span", qi, E(m.parts.updated), 1)) : L("", !0),
            z(yn, { entry: m }, null, 8, ["entry"]),
            z(dt, { entry: m }, null, 8, ["entry"]),
            z(ut, { entry: m }, null, 8, ["entry"])
          ])
        ]))), 128)),
        d.entity.create && !l.value ? (u(), A(se, {
          key: 1,
          class: "dc-type__new",
          href: k(t).createHref?.(d.entity),
          onPress: (m) => k(t).create(d.entity)
        }, {
          default: Y(() => [
            c[1] || (c[1] = S("span", {
              class: "dc-type__plus",
              "aria-hidden": "true"
            }, "+", -1)),
            J(" " + E(d.entity.create), 1)
          ]),
          _: 2
        }, 1032, ["href", "onPress"])) : L("", !0)
      ], 8, Ei))), 128)),
      G(r.$slots, "after", {}, void 0, !0)
    ], 8, xi));
  }
}), Da = /* @__PURE__ */ W(Vi, [["__scopeId", "data-v-d73c6777"]]), Di = ["data-dc-pending", "data-dc-more"], Ki = {
  key: 0,
  class: "dc-results__state dc-results__state--loading",
  "aria-live": "polite"
}, Wi = {
  key: 3,
  class: "dc-results__state",
  role: "alert"
}, zi = { class: "dc-results__detail" }, ji = {
  key: 4,
  class: "dc-results__state",
  "aria-live": "polite"
}, Ui = {
  key: 5,
  class: "dc-results__state"
}, Qi = { class: "dc-results__detail" }, Gi = /* @__PURE__ */ K({
  __name: "ResultsArea",
  props: {
    views: {},
    loading: { type: Boolean }
  },
  setup(e) {
    const t = e, n = Z(), a = Ct(), s = {
      list: tn,
      cards: Na,
      grid: Aa,
      images: Ia,
      table: Va,
      links: Ra,
      preview: Ba
    }, o = f(() => ea(n.query.value, t.views)), l = f(() => De(n.query.value.view, t.views)), i = f(() => (l.value === "record" ? null : s[l.value]) ?? tn), r = f(() => l.value === "record" ? n.recordView.value : null), c = f(() => n.rows.value.length > 0), d = f(() => n.error.value !== null), m = B(null);
    function w(h) {
      return h.querySelector("[data-dc-scroll]") ?? h;
    }
    ae(
      // The page on screen, which is the draft's own while one is being typed.
      () => n.liveQuery.value.page,
      () => {
        m.value && (w(m.value).scrollTop = 0);
      }
    );
    const g = B(""), _ = B({ x: 0, y: 0 }), v = B(0);
    function b() {
      const h = m.value;
      if (!h) {
        g.value = "";
        return;
      }
      const y = w(h), M = {
        top: y.scrollTop > 1,
        right: y.scrollWidth - y.clientWidth - y.scrollLeft > 1,
        bottom: y.scrollHeight - y.clientHeight - y.scrollTop > 1,
        left: y.scrollLeft > 1
      };
      g.value = Object.entries(M).filter(([, I]) => I).map(([I]) => I).join(" "), _.value = {
        x: y.offsetHeight - y.clientHeight,
        y: y.offsetWidth - y.clientWidth
      }, v.value = h.querySelector("[data-dc-stuck]")?.offsetHeight ?? 0;
    }
    let P = null, x = null;
    return ae(
      m,
      (h, y) => {
        if (y?.removeEventListener("scroll", b, { capture: !0 }), P?.disconnect(), x?.disconnect(), P = null, x = null, b(), !h || (h.addEventListener("scroll", b, { passive: !0, capture: !0 }), typeof ResizeObserver > "u")) return;
        const M = new ResizeObserver(b), I = typeof MutationObserver > "u" ? null : new MutationObserver(() => {
          te(), b();
        }), te = () => {
          M.disconnect(), I?.disconnect();
          for (const q of /* @__PURE__ */ new Set([h, w(h)])) {
            M.observe(q);
            for (const V of q.children) M.observe(V);
            I?.observe(q, { childList: !0 });
          }
        };
        te(), P = M, x = I;
      },
      { flush: "post" }
    ), ye(() => {
      m.value?.removeEventListener("scroll", b, { capture: !0 }), P?.disconnect(), x?.disconnect();
    }), (h, y) => (u(), p("div", {
      ref_key: "scroller",
      ref: m,
      class: "dc-results",
      "data-dc-pending": k(n).pending.value ? "true" : "false",
      "data-dc-more": g.value,
      style: oe({
        "--dc-results-gutter-x": `${_.value.x}px`,
        "--dc-results-gutter-y": `${_.value.y}px`,
        "--dc-results-stuck": `${v.value}px`
      })
    }, [
      e.loading ? (u(), p("p", Ki, [...y[1] || (y[1] = [
        S("span", { class: "dc-results__detail" }, "Loading…", -1)
      ])])) : o.value ? (u(), A(Da, { key: 1 }, Kt({ _: 2 }, [
        a["cards-before"] ? {
          name: "before",
          fn: Y(() => [
            G(h.$slots, "cards-before", {}, void 0, !0)
          ]),
          key: "0"
        } : void 0,
        a["cards-after"] ? {
          name: "after",
          fn: Y(() => [
            G(h.$slots, "cards-after", {}, void 0, !0)
          ]),
          key: "1"
        } : void 0
      ]), 1024)) : r.value?.id ? (u(), A(Ge(r.value.component), {
        key: 2,
        id: r.value.id
      }, null, 8, ["id"])) : d.value ? (u(), p("p", Wi, [
        y[2] || (y[2] = S("span", { class: "dc-results__headline" }, "Could not load results", -1)),
        S("span", zi, E(k(n).error.value instanceof Error ? k(n).error.value.message : "The data source failed."), 1)
      ])) : !c.value && k(n).pending.value ? (u(), p("p", ji, [...y[3] || (y[3] = [
        S("span", { class: "dc-results__detail" }, "Running query…", -1)
      ])])) : c.value ? (u(), A(Ge(i.value), { key: 6 })) : (u(), p("div", Ui, [
        y[4] || (y[4] = S("span", { class: "dc-results__headline" }, "Nothing matches this query", -1)),
        S("span", Qi, E(k(n).summary.value), 1),
        k(n).isPristine.value ? L("", !0) : (u(), A(se, {
          key: 0,
          class: "dc-results__clear",
          href: k(n).clearHref(),
          onPress: y[0] || (y[0] = (M) => k(n).clearFilters())
        }, {
          default: Y(() => [
            J(E(k(n).isEverything.value ? "Clear filters" : "Search everything instead"), 1)
          ]),
          _: 1
        }, 8, ["href"]))
      ]))
    ], 12, Di));
  }
}), Ka = /* @__PURE__ */ W(Gi, [["__scopeId", "data-v-4484c328"]]), Yi = ["data-dc-theme", "data-dc-value-press"], Xi = {
  key: 0,
  class: "dc-shell__page"
}, Ji = /* @__PURE__ */ K({
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
    valuePress: { default: "button" },
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
  emits: /* @__PURE__ */ bn(["activate", "create", "duplicate", "delete", "operate", "drill", "query-change", "toggle-pin"], ["update:pinned", "update:selected"]),
  setup(e, { expose: t, emit: n }) {
    const a = e, s = n, o = kn(e, "pinned"), l = kn(e, "selected"), i = Ct(), r = nn(Gn, null), c = a.route || r ? null : es(), d = a.route ?? r ?? c;
    ye(() => c?.dispose?.());
    const m = B(!!i.page);
    Ua(() => {
      m.value = !!i.page;
    });
    const w = ts(d, {
      detached: () => m.value && a.pageQuery === "detached",
      path: () => a.listPath
    }), g = f(() => Us({ seed: a.schema.key })), _ = f(() => a.source ?? g.value), v = po({
      schema: () => a.schema,
      adapter: w,
      defaults: () => a.defaults,
      navigationMode: () => a.navigationMode,
      facetNavigationMode: () => a.facetNavigationMode
    }), b = f(() => a.within?.trim() ?? ""), P = yo({
      query: v.query,
      entity: v.entity,
      schema: f(() => a.schema),
      setExpression: v.setExpression
    });
    ae(v.query, (C) => s("query-change", C));
    const x = f(() => to(a.schema, [v.query.value.expr])), h = f(
      () => x.value.flatMap((C) => {
        const R = a.schema.entities.find((U) => U.key === C.entityKey);
        return R ? [{ ...C, entity: R }] : [];
      })
    );
    function y() {
      if (i.record) return h.value;
      const C = a.recordCards;
      return C ? h.value.filter((R) => C[R.entityKey]) : [];
    }
    const M = f(() => {
      const [C, ...R] = h.value;
      if (!C || R.length || v.entity.value !== null) return null;
      const U = a.recordViews?.[C.entityKey];
      return U ? { ...U, id: C.id } : null;
    }), I = f(() => {
      const C = v.entity.value?.key;
      return C && a.recordViews?.[C] || null;
    }), te = f(() => {
      const C = a.views, R = typeof C == "function" ? C({ entity: v.entity.value, records: x.value }) : C;
      return M.value || I.value ? [...(R ?? on).filter((U) => U !== "record"), "record"] : R?.filter((U) => U !== "record");
    }), q = f(
      () => I.value !== null && De(v.query.value.view, te.value) === "record"
    ), V = f(() => q.value ? 1 : a.limit), Q = ho({
      source: _,
      query: P.live,
      schema: f(() => a.schema),
      entity: v.entity,
      limit: V,
      within: b
    }), fe = f(() => {
      if (M.value) return M.value;
      const C = I.value;
      return C ? { ...C, id: Q.rows.value[0]?.id ?? null } : null;
    });
    function de(C) {
      const R = I.value !== null && De(C, te.value) === "record";
      if (R === q.value) {
        v.setView(C);
        return;
      }
      const U = P.live.value.page, xe = R ? (U - 1) * a.limit + 1 : Math.ceil(U / a.limit);
      P.drafting.value ? (v.setView(C), P.setPage(xe)) : v.setView(C, xe);
    }
    function ue(C) {
      if (!I.value || q.value) return null;
      const R = Q.rows.value.indexOf(C);
      return R === -1 ? null : Q.offset.value + R + 1;
    }
    ae(
      [Q.pageCount, Q.pending, v.query, P.drafting, () => a.loading, m],
      () => {
        if (Q.pending.value || P.drafting.value || a.loading || m.value) return;
        const C = Q.pageCount.value;
        v.query.value.page > C && v.setPage(C, "replace");
      },
      // Immediately, since a pasted URL is past the end before anything changes;
      // and after the render, so the correction is a navigation the mounted shell
      // makes rather than one it makes on the way up. An async source is still
      // pending here and corrects itself when its count lands.
      { immediate: !0, flush: "post" }
    );
    const ee = f(() => new Set(o.value));
    function T(C) {
      const R = new Set(ee.value);
      R.has(C.id) ? R.delete(C.id) : R.add(C.id), o.value = [...R], s("toggle-pin", C);
    }
    const j = f(() => {
      if (a.selectable === !0) return !0;
      const C = v.entity.value;
      return !!(C?.duplicate || C?.delete || C?.operations?.some((R) => R.selection !== !1));
    }), O = f(() => new Set(l.value));
    function ne(C) {
      const R = new Set(O.value);
      R.has(C.id) ? R.delete(C.id) : R.add(C.id), l.value = [...R];
    }
    function ke(C) {
      const R = new Set(O.value);
      for (const U of Q.rows.value)
        C ? R.add(U.id) : R.delete(U.id);
      l.value = [...R];
    }
    function Re() {
      l.value.length && (l.value = []);
    }
    const be = f(() => ({
      ids: [...l.value],
      rows: Q.rows.value.filter((C) => O.value.has(C.id)),
      entity: v.entity.value
    }));
    ae(() => v.query.value.entity, Re);
    function Be(C, R, U = {}) {
      const xe = qt(a.schema, v.query.value, C, U);
      U.exclude ? v.narrow(xe, R?.key ?? v.query.value.entity) : P.release(() => v.narrow(xe, R?.key ?? null, R ? void 0 : "cards")), s("drill", C, R, U);
    }
    function He(C) {
      return a.rowPress === "narrow" && _t(a.schema, C) !== null;
    }
    function _e(C) {
      return a.schema.entities.find((U) => U.key === C.entityKey)?.href?.(C) || null;
    }
    const $e = me(null);
    ae(v.query, () => {
      $e.value = null;
    });
    const $ = no({
      ...v,
      draft: P.text,
      liveQuery: P.live,
      drafting: P.drafting,
      commitDraft: P.commit,
      abandonDraft: P.abandon,
      /*
       * A page of what is on screen: the draft's, while one is live, which are
       * held beside it rather than in the URL — see `liveQuery`.
       */
      setPage: (C, R) => {
        P.drafting.value ? P.setPage(C) : v.setPage(C, R);
      },
      setView: de,
      schema: f(() => a.schema),
      entities: f(() => a.schema.entities),
      rows: Q.rows,
      total: Q.total,
      limit: V,
      offset: Q.offset,
      pageCount: Q.pageCount,
      pending: Q.pending,
      counting: Q.counting,
      error: Q.error,
      source: _,
      previewsPerType: f(() => a.previewsPerType),
      within: b,
      loading: f(() => a.loading),
      recordView: fe,
      pinnable: f(() => a.pinnable === !0),
      isPinned: (C) => ee.value.has(C.id),
      isPinnedId: (C) => ee.value.has(C),
      togglePin: T,
      selectable: j,
      selection: be,
      isSelected: (C) => O.value.has(C.id),
      toggleSelect: ne,
      selectPage: ke,
      clearSelection: Re,
      narrowsOnPress: f(() => a.rowPress === "narrow"),
      rowLinks: f(() => a.rowLinks),
      pressPreview: $e,
      /*
       * The one place a press is read, so every view gets the same answer without
       * knowing which of the two it is: they all call this.
       */
      activate: (C, R = {}) => {
        if (He(C)) {
          Be(C, null, R);
          return;
        }
        const U = ue(C);
        if (U !== null) {
          P.drafting.value ? (v.setView("record"), P.setPage(U)) : v.setView("record", U);
          return;
        }
        const xe = _e(C);
        if (xe) {
          window.open(xe, "_blank", "noopener");
          return;
        }
        s("activate", C);
      },
      pressHref: (C) => {
        if (He(C)) return v.narrowHref(qt(a.schema, v.query.value, C), null, "cards");
        const R = ue(C);
        return R !== null ? v.hrefFor({ view: "record", page: R }) : _e(C) ?? a.activateHref?.(C) ?? null;
      },
      recordHref: _e,
      drillHref: (C, R) => _t(a.schema, C) ? v.narrowHref(
        qt(a.schema, v.query.value, C),
        R?.key ?? null,
        R ? void 0 : "cards"
      ) : null,
      create: (C) => s("create", C),
      createHref: (C) => a.createHref?.(C) ?? null,
      duplicate: () => s("duplicate", be.value),
      delete: () => s("delete", be.value),
      operate: (C) => s("operate", C, be.value),
      drill: Be
    });
    oo({ theme: () => a.theme, accent: () => a.accent, tokens: () => a.tokens });
    const N = f(() => {
      if (!(!a.accent && !a.tokens))
        return { ...a.tokens, ...a.accent ? { "--dc-accent": a.accent } : {} };
    }), H = B(null), F = B(0);
    let Ee = null;
    ot(() => {
      const C = H.value;
      C && (F.value = C.getBoundingClientRect().width, !(typeof ResizeObserver > "u") && (Ee = new ResizeObserver(([R]) => {
        F.value = R.contentRect.width;
      }), Ee.observe(C)));
    }), ye(() => Ee?.disconnect());
    const Fe = f(() => a.oneStripFrom !== !1 && F.value >= a.oneStripFrom), _n = f(() => ({
      views: te.value,
      selectionPlacement: a.selectionPlacement,
      pagesNote: a.pagesNote
    }));
    return t({
      query: v.query
    }), (C, R) => (u(), p("div", {
      ref_key: "root",
      ref: H,
      class: "dc-shell",
      "data-dc-theme": e.theme,
      "data-dc-value-press": e.valuePress,
      style: oe(N.value)
    }, [
      S("div", {
        class: le(["dc-shell__head", { "dc-shell__head--one-strip": Fe.value }])
      }, [
        z(Ma, null, Kt({ _: 2 }, [
          i.page ? void 0 : {
            name: "lead",
            fn: Y(() => [
              z(Er, {
                views: te.value,
                "type-chooser": e.typeChooser
              }, null, 8, ["views", "type-chooser"])
            ]),
            key: "0"
          },
          i.brand ? {
            name: "brand",
            fn: Y((U) => [
              G(C.$slots, "brand", Bt(Qa(U)), void 0, !0)
            ]),
            key: "1"
          } : void 0,
          i.actions ? {
            name: "actions",
            fn: Y(() => [
              G(C.$slots, "actions", {}, void 0, !0)
            ]),
            key: "2"
          } : void 0
        ]), 1024),
        Fe.value && !i.page ? (u(), A(Zt, Bt(Ve({ key: 0 }, _n.value)), null, 16)) : L("", !0)
      ], 2),
      i.page ? (u(), p("div", Xi, [
        G(C.$slots, "page", {
          query: k($).query.value
        }, void 0, !0)
      ])) : L("", !0),
      !Fe.value && !i.page ? (u(), A(Zt, Bt(Ve({ key: 1 }, _n.value)), null, 16)) : L("", !0),
      i.page ? L("", !0) : G(C.$slots, "results", {
        rows: k($).rows.value,
        total: k($).total.value,
        offset: k($).offset.value,
        pageCount: k($).pageCount.value,
        query: k($).liveQuery.value,
        pending: k($).pending.value,
        loading: e.loading
      }, () => [
        z(Ka, {
          views: te.value,
          loading: e.loading
        }, Kt({ _: 2 }, [
          i["cards-before"] || y().length ? {
            name: "cards-before",
            fn: Y(() => [
              (u(!0), p(D, null, X(y(), (U) => (u(), p(D, {
                key: `${U.entityKey}:${U.id}`
              }, [
                i.record ? G(C.$slots, "record", {
                  id: U.id,
                  entity: U.entity
                }, void 0, !0, 0) : (u(), A(Ge(e.recordCards?.[U.entityKey]), {
                  key: 1,
                  id: U.id
                }, null, 8, ["id"]))
              ], 64))), 128)),
              G(C.$slots, "cards-before", {}, void 0, !0)
            ]),
            key: "0"
          } : void 0,
          i["cards-after"] ? {
            name: "cards-after",
            fn: Y(() => [
              G(C.$slots, "cards-after", {}, void 0, !0)
            ]),
            key: "1"
          } : void 0
        ]), 1032, ["views", "loading"])
      ], !0, 2)
    ], 12, Yi));
  }
}), Zi = /* @__PURE__ */ W(Ji, [["__scopeId", "data-v-b703ded4"]]), ec = ["data-dc-muted", "data-dc-collapsed"], tc = ["data-dc-collapsible"], nc = ["aria-expanded", "aria-controls"], ac = { class: "dc-shell-card__sr" }, sc = {
  key: 0,
  class: "dc-shell-card__identity"
}, oc = { class: "dc-shell-card__title dc-shell-card__name" }, rc = {
  key: 0,
  class: "dc-shell-card__ref dc-mono"
}, lc = {
  key: 1,
  class: "dc-shell-card__title"
}, ic = {
  key: 2,
  class: "dc-shell-card__count dc-mono"
}, cc = {
  key: 1,
  class: "dc-shell-card__aside"
}, uc = ["data-dc-flush"], dc = /* @__PURE__ */ K({
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
    const n = e, a = t, s = B(n.defaultCollapsed === !0), o = f(() => n.span === "all" ? { gridColumn: "1 / -1" } : void 0), l = Ct();
    function i(q) {
      return r(q?.() ?? []);
    }
    function r(q) {
      return q.some((V) => V.type === Ga ? !1 : V.type === Ya ? String(V.children ?? "").trim().length > 0 : V.type === D ? r(V.children ?? []) : !0);
    }
    const c = f(
      () => !!n.title || !!n.name || d.value || i(l.head)
    ), d = f(() => i(l.aside)), m = f(() => i(l.default)), w = f(() => i(l.foot)), g = f(
      () => !!n.name && (!!n.reference || i(l.reference))
    ), _ = f(() => n.collapsible === !0 && c.value), v = f(() => _.value && (n.collapsed ?? s.value));
    function b() {
      const q = !v.value;
      s.value = q, a("update:collapsed", q);
    }
    const P = Pt() ?? "dc-shell-card", x = `${P}-body`, h = `${P}-foot`, y = f(
      () => [m.value ? x : "", w.value ? h : ""].filter(Boolean).join(" ") || void 0
    ), M = [
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
    ].join(", "), I = B(null);
    function te(q) {
      if (!_.value) return;
      const V = q.target?.closest(M);
      V && I.value?.contains(V) || typeof window < "u" && window.getSelection()?.toString() || b();
    }
    return (q, V) => (u(), p("section", {
      class: "dc-shell-card",
      style: oe(o.value),
      "data-dc-muted": e.muted ? "true" : "false",
      "data-dc-collapsed": v.value ? "true" : "false"
    }, [
      c.value ? (u(), p("header", {
        key: 0,
        ref_key: "head",
        ref: I,
        class: "dc-shell-card__head",
        "data-dc-collapsible": _.value ? "true" : "false",
        onClick: te
      }, [
        _.value ? (u(), p("button", {
          key: 0,
          type: "button",
          class: "dc-shell-card__toggle",
          "aria-expanded": v.value ? "false" : "true",
          "aria-controls": y.value,
          onClick: b
        }, [
          V[0] || (V[0] = S("svg", {
            class: "dc-shell-card__chevron",
            viewBox: "0 0 10 10",
            "aria-hidden": "true"
          }, [
            S("path", { d: "M2 3.5 5 6.5 8 3.5" })
          ], -1)),
          S("span", ac, E(e.name || e.title || "Card"), 1)
        ], 8, nc)) : L("", !0),
        G(q.$slots, "head", {}, () => [
          e.name ? (u(), p("div", sc, [
            S("h2", oc, E(e.name), 1),
            g.value ? (u(), p("span", rc, [
              G(q.$slots, "reference", {}, () => [
                J(E(e.reference), 1)
              ], !0)
            ])) : L("", !0)
          ])) : (u(), p("h2", lc, E(e.title), 1)),
          e.count !== void 0 ? (u(), p("span", ic, E(e.count), 1)) : L("", !0)
        ], !0),
        d.value ? (u(), p("span", cc, [
          G(q.$slots, "aside", {}, void 0, !0)
        ])) : L("", !0)
      ], 8, tc)) : L("", !0),
      m.value ? Dt((u(), p("div", {
        key: 1,
        id: x,
        class: "dc-shell-card__body",
        "data-dc-flush": e.flush ? "true" : "false"
      }, [
        G(q.$slots, "default", {}, void 0, !0)
      ], 8, uc)), [
        [$n, !v.value]
      ]) : L("", !0),
      w.value ? Dt((u(), p("footer", {
        key: 2,
        id: h,
        class: "dc-shell-card__foot"
      }, [
        G(q.$slots, "foot", {}, void 0, !0)
      ], 512)), [
        [$n, !v.value]
      ]) : L("", !0)
    ], 12, ec));
  }
}), du = /* @__PURE__ */ W(dc, [["__scopeId", "data-v-073304c8"]]), fc = ["aria-label"], vc = ["aria-checked", "data-dc-active", "tabindex", "onClick", "onKeydown"], pc = /* @__PURE__ */ K({
  __name: "SegmentedControl",
  props: {
    modelValue: {},
    options: {},
    label: {},
    mono: { type: Boolean }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const n = e, a = t, s = B([]);
    function o(l, i) {
      const r = n.options.length;
      let c = null;
      if (l.key === "ArrowRight" || l.key === "ArrowDown" ? c = (i + 1) % r : l.key === "ArrowLeft" || l.key === "ArrowUp" ? c = (i - 1 + r) % r : l.key === "Home" ? c = 0 : l.key === "End" && (c = r - 1), c === null) return;
      l.preventDefault();
      const d = n.options[c];
      d && (a("update:modelValue", d.key), s.value[c]?.focus());
    }
    return (l, i) => (u(), p("div", {
      class: "dc-segmented",
      role: "radiogroup",
      "aria-label": e.label
    }, [
      (u(!0), p(D, null, X(e.options, (r, c) => (u(), p("button", {
        key: r.key,
        ref_for: !0,
        ref_key: "buttons",
        ref: s,
        type: "button",
        role: "radio",
        class: le(["dc-segmented__item", { "dc-segmented__item--mono": e.mono }]),
        "aria-checked": r.key === e.modelValue,
        "data-dc-active": r.key === e.modelValue ? "true" : "false",
        tabindex: r.key === e.modelValue ? 0 : -1,
        onClick: (d) => a("update:modelValue", r.key),
        onKeydown: (d) => o(d, c)
      }, E(r.label), 43, vc))), 128))
    ], 8, fc));
  }
}), hc = /* @__PURE__ */ W(pc, [["__scopeId", "data-v-63fb5482"]]), mc = { class: "dc-fact__label" }, yc = ["title"], gc = /* @__PURE__ */ K({
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
      if (s == null || s === "") return [ge];
      if (Array.isArray(s)) {
        const o = s.filter((l) => l != null && l !== "");
        return o.length ? o.map(String) : [ge];
      }
      return [String(s)];
    }), a = f(() => t.wide ? { gridColumn: "1 / -1" } : void 0);
    return (s, o) => (u(), p("div", {
      class: "dc-fact",
      style: oe(a.value)
    }, [
      S("dt", mc, [
        G(s.$slots, "label", {}, () => [
          J(E(e.label), 1)
        ], !0)
      ]),
      S("dd", {
        class: "dc-fact__value dc-mono",
        title: e.title
      }, [
        G(s.$slots, "default", {}, () => [
          n.value.length === 1 ? (u(), p(D, { key: 0 }, [
            J(E(n.value[0]), 1)
          ], 64)) : (u(!0), p(D, { key: 1 }, X(n.value, (l, i) => (u(), p("span", {
            key: i,
            class: "dc-fact__line"
          }, E(l), 1))), 128))
        ], !0)
      ], 8, yc)
    ], 4));
  }
}), _c = /* @__PURE__ */ W(gc, [["__scopeId", "data-v-1f6d25e6"]]), wc = /* @__PURE__ */ K({
  __name: "ShellFacts",
  props: {
    items: { default: () => [] },
    min: { default: "200px" }
  },
  setup(e) {
    const t = e, n = f(() => ({ "--dc-facts-min": t.min }));
    return (a, s) => (u(), p("dl", {
      class: "dc-facts",
      style: oe(n.value)
    }, [
      (u(!0), p(D, null, X(e.items, (o, l) => (u(), A(_c, {
        key: `${l}:${o.label}`,
        label: o.label,
        value: o.value,
        title: o.title,
        wide: o.wide
      }, null, 8, ["label", "value", "title", "wide"]))), 128)),
      G(a.$slots, "default", {}, void 0, !0)
    ], 4));
  }
}), fu = /* @__PURE__ */ W(wc, [["__scopeId", "data-v-17455afa"]]), kc = { class: "dc-counts" }, bc = ["data-dc-tone"], $c = {
  key: 0,
  class: "dc-counts__empty"
}, xc = /* @__PURE__ */ K({
  __name: "StatusCounts",
  props: {
    counts: {},
    empty: { default: ge }
  },
  setup(e) {
    const t = e, n = f(() => t.counts.filter((a) => a.count > 0));
    return (a, s) => (u(), p("span", kc, [
      (u(!0), p(D, null, X(n.value, (o) => (u(), p("span", {
        key: o.label,
        class: "dc-counts__count",
        "data-dc-tone": o.tone ?? "neutral"
      }, E(o.count) + " " + E(o.label), 9, bc))), 128)),
      n.value.length === 0 ? (u(), p("span", $c, E(e.empty), 1)) : L("", !0)
    ]));
  }
}), vu = /* @__PURE__ */ W(xc, [["__scopeId", "data-v-5553a9e2"]]), Sc = ["data-dc-copied", "title", "aria-label"], Cc = {
  key: 0,
  class: "dc-copy__mark",
  viewBox: "0 0 16 16",
  "aria-hidden": "true"
}, Pc = {
  key: 1,
  class: "dc-copy__mark",
  viewBox: "0 0 16 16",
  "aria-hidden": "true"
}, Ec = 1500, Mc = /* @__PURE__ */ K({
  __name: "CopyButton",
  props: {
    text: {},
    label: { default: "Copy to clipboard" }
  },
  emits: ["copied", "error"],
  setup(e, { emit: t }) {
    const n = e, a = t, s = B(!1);
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
      }, Ec), a("copied", i);
    }
    return ye(() => clearTimeout(o)), (i, r) => (u(), p("button", {
      type: "button",
      class: "dc-copy",
      "data-dc-copied": s.value ? "true" : "false",
      title: s.value ? "Copied" : e.label,
      "aria-label": e.label,
      onClick: l
    }, [
      s.value ? (u(), p("svg", Pc, [...r[1] || (r[1] = [
        S("path", { d: "M3 8.5l3.2 3L13 4.5" }, null, -1)
      ])])) : (u(), p("svg", Cc, [...r[0] || (r[0] = [
        S("rect", {
          x: "5.5",
          y: "5.5",
          width: "8",
          height: "9",
          rx: "1.5"
        }, null, -1),
        S("path", { d: "M10.5 3.5v-1a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h1" }, null, -1)
      ])]))
    ], 8, Sc));
  }
}), Lc = /* @__PURE__ */ W(Mc, [["__scopeId", "data-v-f4249d7f"]]), Tc = ["data-dc-copy", "data-dc-wrap", "data-dc-tone"], Oc = /* @__PURE__ */ K({
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
    const n = e, a = t, s = B(null), o = f(() => n.maxHeight === void 0 ? void 0 : { maxHeight: typeof n.maxHeight == "number" ? `${n.maxHeight}px` : n.maxHeight });
    function l() {
      return n.code ?? s.value?.textContent ?? "";
    }
    return (i, r) => (u(), p("div", {
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
        G(i.$slots, "default", {}, () => [
          J(E(e.code), 1)
        ], !0)
      ], 4),
      e.copy ? (u(), A(Lc, {
        key: 0,
        class: "dc-code__copy",
        text: l,
        label: e.copyLabel,
        onCopied: r[0] || (r[0] = (c) => a("copied", c)),
        onError: r[1] || (r[1] = (c) => a("error", c))
      }, null, 8, ["label"])) : L("", !0)
    ], 8, Tc));
  }
}), pu = /* @__PURE__ */ W(Oc, [["__scopeId", "data-v-67b371dd"]]), Nc = 24, Ac = /* @__PURE__ */ K({
  __name: "ShellLog",
  props: {
    fetchChunk: {},
    stripAnsi: { type: Boolean },
    maxHeight: { default: "460px" }
  },
  setup(e, { expose: t }) {
    const n = e, a = B(""), s = f(() => n.stripAnsi ? cs(a.value) : a.value), o = B(null);
    let l = 0, i = null;
    function r() {
      return i ??= c().finally(() => {
        i = null;
      }), i;
    }
    async function c() {
      const { chunk: w, offset: g } = await n.fetchChunk(l);
      if (l = g, !w) return;
      const _ = o.value, v = !_ || _.scrollTop + _.clientHeight >= _.scrollHeight - Nc;
      a.value += w, v && (await Qe(), o.value && (o.value.scrollTop = o.value.scrollHeight));
    }
    function d() {
      a.value = "", l = 0;
    }
    const m = f(() => n.maxHeight === void 0 ? void 0 : { maxHeight: typeof n.maxHeight == "number" ? `${n.maxHeight}px` : n.maxHeight });
    return t({ poll: r, reset: d }), (w, g) => (u(), p("pre", {
      ref_key: "pane",
      ref: o,
      class: "dc-log dc-mono",
      style: oe(m.value)
    }, E(s.value), 5));
  }
}), hu = /* @__PURE__ */ W(Ac, [["__scopeId", "data-v-2c86947e"]]), Ic = ["data-dc-theme"], Rc = ["aria-labelledby", "aria-label"], Bc = {
  key: 1,
  class: "dc-dialog__actions"
}, ze = [], Hc = /* @__PURE__ */ K({
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
    const n = e, a = t, { theme: s, style: o, adopt: l } = hn(n), i = `${Pt() ?? "dc-dialog"}-title`, r = B(null);
    function c() {
      a("close"), a("update:open", !1);
    }
    const d = Symbol("dc-dialog");
    function m(h) {
      h.key !== "Escape" || h.defaultPrevented || ze[ze.length - 1] === d && (h.preventDefault(), c());
    }
    let w = !1;
    function g(h) {
      w = h.target === h.currentTarget;
    }
    function _(h) {
      h.target === h.currentTarget && w && c(), w = !1;
    }
    const v = [
      "[autofocus]",
      'input:not([disabled]):not([type="hidden"])',
      "select:not([disabled])",
      "textarea:not([disabled])",
      "button:not([disabled])",
      "a[href]",
      '[tabindex]:not([tabindex="-1"])'
    ].join(", ");
    let b = null;
    async function P() {
      ze.push(d), document.addEventListener("keydown", m), b = document.activeElement instanceof HTMLElement ? document.activeElement : null, l(), await Qe(), (r.value?.querySelector("[autofocus]") ?? r.value?.querySelector(v) ?? r.value)?.focus();
    }
    function x() {
      const h = ze.indexOf(d);
      h !== -1 && (ze.splice(h, 1), document.removeEventListener("keydown", m), b?.isConnected && b.focus(), b = null);
    }
    return ot(() => {
      n.open && P();
    }), ae(
      () => n.open,
      (h) => {
        h ? P() : x();
      }
    ), ye(x), (h, y) => e.open ? (u(), A(St, {
      key: 0,
      to: e.to
    }, [
      S("div", {
        class: "dc-shell dc-layer dc-dialog",
        "data-dc-theme": k(s),
        style: oe(k(o)),
        onPointerdown: g,
        onClick: _
      }, [
        S("div", {
          ref_key: "panel",
          ref: r,
          class: le(["dc-dialog__panel", e.panelClass]),
          role: "dialog",
          "aria-modal": "true",
          tabindex: "-1",
          "aria-labelledby": e.title ? i : void 0,
          "aria-label": e.title ? void 0 : e.label
        }, [
          e.title ? (u(), p("h2", {
            key: 0,
            id: i,
            class: "dc-dialog__title"
          }, E(e.title), 1)) : L("", !0),
          S("div", {
            class: le(["dc-dialog__body", e.bodyClass])
          }, [
            G(h.$slots, "default", {}, void 0, !0)
          ], 2),
          h.$slots.actions ? (u(), p("div", Bc, [
            G(h.$slots, "actions", {}, void 0, !0)
          ])) : L("", !0)
        ], 10, Rc)
      ], 44, Ic)
    ], 8, ["to"])) : L("", !0);
  }
}), mu = /* @__PURE__ */ W(Hc, [["__scopeId", "data-v-0cccf313"]]), Fc = 4500, qc = 9e3, st = B([]);
let zn = 0;
function Wa(e) {
  st.value = st.value.filter((t) => t.id !== e);
}
function za(e, t = "ok") {
  zn += 1;
  const n = zn;
  st.value = [...st.value, { id: n, message: e, kind: t }], setTimeout(() => Wa(n), t === "err" ? qc : Fc);
}
function Vc(e) {
  za(e instanceof Error ? e.message : String(e), "err");
}
function Dc() {
  return { toasts: Xa(st), toast: za, toastError: Vc, dismiss: Wa };
}
const Kc = ["data-dc-theme"], Wc = ["data-dc-kind", "role"], zc = /* @__PURE__ */ K({
  __name: "ShellToasts",
  props: {
    to: { default: "body" },
    theme: { default: void 0 },
    accent: { default: void 0 },
    tokens: { default: void 0 }
  },
  setup(e) {
    const t = e, { toasts: n } = Dc(), { theme: a, style: s, adopt: o } = hn(t);
    return ot(o), (l, i) => (u(), A(St, { to: e.to }, [
      S("div", {
        class: "dc-shell dc-layer dc-toasts",
        "data-dc-theme": k(a),
        style: oe(k(s)),
        "aria-live": "polite"
      }, [
        (u(!0), p(D, null, X(k(n), (r) => (u(), p("div", {
          key: r.id,
          class: "dc-toast",
          "data-dc-kind": r.kind,
          role: r.kind === "err" ? "alert" : void 0
        }, E(r.message), 9, Wc))), 128))
      ], 12, Kc)
    ], 8, ["to"]));
  }
}), yu = /* @__PURE__ */ W(zc, [["__scopeId", "data-v-d970211c"]]);
function gu(e, t) {
  const n = B(!1);
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
  return xt(() => {
    s = !0, l();
  }, !0), { start: c, stop: l, polling: n };
}
function _u(e, t = {}) {
  const n = t.key ?? ((o) => JSON.stringify(o)), a = me();
  let s = null;
  return Ja(() => {
    const o = e(), l = n(o);
    l !== s && (s = l, a.value = o);
  }), a;
}
function wu(e = {}) {
  return { key: "ordinal", kind: "ordinal", label: "#", width: "52px", ...e };
}
function ku(e = {}) {
  return { key: "status", role: "state", kind: "status", label: "State", sort: "state", width: "104px", ...e };
}
function bu(e = {}) {
  return { key: "tint", role: "tint", ...e };
}
function $u(e = {}) {
  return { key: "picture", role: "image", kind: "image", width: "56px", height: "40px", ...e };
}
function xu(e, t = {}) {
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
function Su(e, t = {}) {
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
function Cu(e, t, n = {}) {
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
function Pu(e, t, n = {}) {
  return { key: e, kind: "date", label: t, sort: e, width: "104px", mono: !0, muted: !0, ...n };
}
function Eu(e = {}) {
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
function Mu(e, t, n = {}) {
  return { key: e, label: t, sort: e, truncate: !0, hideBelow: 900, ...n };
}
function Lu(e, t, n, a = {}) {
  return {
    key: e,
    label: t,
    value: (s) => Object.entries(n).filter(([o]) => s.fields[o] === !0).map(([, o]) => o),
    flags: n,
    sort: e,
    muted: !0,
    truncate: !0,
    hideBelow: 1100,
    ...a
  };
}
function Rt(e) {
  return typeof e == "number" ? e : typeof e == "string" && e.trim() !== "" ? Number(e) : Number.NaN;
}
function Tu(e) {
  const t = Rt(e);
  return Number.isFinite(t) && t > 0 ? os(t) : ge;
}
function Ou(e) {
  const t = Rt(e);
  return Number.isFinite(t) && t > 0 ? rs(t) : ge;
}
function Nu(e) {
  const t = Rt(e);
  return Number.isFinite(t) && t > 0 ? ls(t) : ge;
}
function Au(e) {
  const t = Rt(e);
  return Number.isFinite(t) ? is(t) : ge;
}
function jc(e) {
  if (e <= 0) return 0;
  const t = 10 ** Math.floor(Math.log10(e));
  for (const n of [1, 2, 5])
    if (e <= n * t) return n * t;
  return 10 * t;
}
function Uc(e, t) {
  const n = /* @__PURE__ */ new Set();
  for (const a of e) {
    const s = a.fields[t];
    for (const o of Array.isArray(s) ? s : [s])
      typeof o == "string" && o && n.add(o);
  }
  return [...n].sort((a, s) => a.localeCompare(s));
}
function Qc(e, t) {
  let n = 0;
  for (const a of e) {
    const s = a.fields[t];
    typeof s == "number" && s > n && (n = s);
  }
  return n;
}
function Iu(e, t, n, a = {}) {
  return {
    kind: "chips",
    key: t,
    label: n,
    options: Uc(e, t),
    ...a.multiple ? { multiple: !0 } : {}
  };
}
function Ru(e, t, n) {
  return { kind: "range", key: t, label: n, min: 0, max: jc(Qc(e, t)) };
}
function Bu(e, t, n) {
  return { kind: "toggle", key: e, label: t, text: n };
}
function Hu(e) {
  return e.filter((t) => t.kind === "chips" ? t.options.length > 1 : t.kind === "range" ? t.max > 0 : !0);
}
function Fu(e = "", t = "/") {
  const n = B(ce(e)), a = B(t), s = [`${a.value}${n.value}`];
  return {
    search: n,
    path: a,
    history: s,
    href(o, l) {
      return `${l ?? a.value}${ce(o)}`;
    },
    push(o, l) {
      l !== void 0 && (a.value = l), n.value = ce(o), s.push(`${a.value}${n.value}`);
    },
    replace(o, l) {
      l !== void 0 && (a.value = l), n.value = ce(o), s[s.length - 1] = `${a.value}${n.value}`;
    }
  };
}
function jn(e) {
  const t = e.indexOf("?");
  if (t === -1) return "";
  const n = e.slice(t), a = n.indexOf("#");
  return ce(a === -1 ? n : n.slice(0, a));
}
function qu(e) {
  const t = B(jn(e.currentRoute.value.fullPath)), n = f(() => e.currentRoute.value.path), a = ae(
    () => e.currentRoute.value.fullPath,
    (s) => {
      t.value = jn(s);
    }
  );
  return {
    search: t,
    path: n,
    push: (s, o) => e.push(`${o ?? n.value}${ce(s)}`),
    replace: (s, o) => e.replace(`${o ?? n.value}${ce(s)}`),
    href: (s, o) => {
      const l = `${o ?? n.value}${ce(s)}`;
      return e.resolve?.(l).href ?? l;
    },
    dispose: a
  };
}
function Vu(e, t, n = "/") {
  return (a) => {
    const s = a.params[t], o = Array.isArray(s) ? s.join("/") : s ?? "", l = a.query[Ne], i = typeof l == "string" ? l : "", r = `${e}="${o.replace(/"/g, "")}"`;
    return { path: n, query: { ...a.query, [Ne]: it(i, r) } };
  };
}
function Du(e, t = "/") {
  return (n) => ({ path: t, query: { ...n.query, [We]: e } });
}
function Ku(e) {
  const t = /* @__PURE__ */ new Map();
  for (const n of e) {
    const a = t.get(n.entityKey);
    a ? a.push(n) : t.set(n.entityKey, [n]);
  }
  return {
    query(n) {
      return da(n, (a) => t.get(a.key) ?? [], {
        undatedLast: !0,
        zeroIsAll: !0
      });
    }
  };
}
function Wu(e, t) {
  return e.query({ ...t, limit: Number.MAX_SAFE_INTEGER, offset: 0 }).rows;
}
const Gc = {
  DataShell: Zi,
  ShellHeader: Ma,
  RecordActions: Zt,
  ResultsArea: Ka,
  SegmentedControl: hc,
  StatusPill: Ke,
  ListView: tn,
  CardsView: Na,
  GridView: Aa,
  ImagesView: Ia,
  TableView: Va,
  LinksView: Ra,
  PreviewView: Ba,
  TypeCardsView: Da
}, zu = {
  install(e, t = {}) {
    const n = t.prefix ?? "";
    for (const [a, s] of Object.entries(Gc))
      e.component(`${n}${a}`, s);
    t.route && e.provide(Gn, t.route), (t.theme || t.accent || t.tokens) && so({ theme: t.theme, accent: t.accent, tokens: t.tokens }, e);
  }
};
export {
  eu as COLUMN_BREAKPOINTS,
  Zc as COLUMN_ROLES,
  Na as CardsView,
  Wn as ColumnCell,
  Lc as CopyButton,
  us as DEFAULT_ENTITY_VIEW,
  Wt as DEFAULT_SORT,
  Yn as DEFAULT_VIEW,
  mo as DRAFT_DELAY,
  Zi as DataShell,
  ge as EMPTY_CELL,
  va as ENTITY_ALL,
  kt as ENTITY_TERM,
  at as EXPRESSION_TERM,
  Aa as GridView,
  zu as HeaderContentLayoutPlugin,
  Ia as ImagesView,
  Ra as LinksView,
  tn as ListView,
  mt as MOCK_TINTS,
  ct as MetricDrill,
  ut as OpenMark,
  fn as PARAM_DIR,
  We as PARAM_ENTITY,
  Ne as PARAM_EXPR,
  Ot as PARAM_PAGE,
  dn as PARAM_SORT,
  Tt as PARAM_VIEW,
  Jc as PILL_TONES,
  $o as POPOVER_FLIP_BELOW,
  ko as POPOVER_GAP,
  bo as POPOVER_MARGIN,
  mn as PinStar,
  Ba as PreviewView,
  yn as QueryMark,
  je as RECORD_STATUSES,
  ln as RESULT_FIELDS,
  Gn as ROUTE_ADAPTER_KEY,
  Zt as RecordActions,
  Er as RecordChoosers,
  Ka as ResultsArea,
  $a as SHELL_CONTEXT_KEY,
  wt as SHELL_THEME_KEY,
  dt as ScopeMark,
  hc as SegmentedControl,
  Ie as SelectTick,
  du as ShellCard,
  pu as ShellCode,
  mu as ShellDialog,
  _c as ShellFact,
  fu as ShellFacts,
  Ma as ShellHeader,
  hu as ShellLog,
  vr as ShellPager,
  Po as ShellPopover,
  yu as ShellToasts,
  en as StandingControl,
  vu as StatusCounts,
  Ke as StatusPill,
  qc as TOAST_ERROR_MS,
  Fc as TOAST_MS,
  Va as TableView,
  Da as TypeCardsView,
  ds as VIEW_ICONS,
  on as VIEW_KINDS,
  Sn as VIEW_LABELS,
  it as addTerm,
  un as andExpression,
  Tu as bytesCell,
  na as cellFull,
  ri as cellNarrowings,
  Oe as cellText,
  vt as cellTextOf,
  ie as cellValue,
  Ht as changesResults,
  Iu as chipsFrom,
  Pn as columnAlign,
  En as columnClass,
  Cn as columnKey,
  qa as columnNarrows,
  rt as columnShortcut,
  la as columnShortcutOf,
  jt as columnTruncates,
  ms as columnsFor,
  sa as compactShortcuts,
  Io as completeDraft,
  hs as countPages,
  es as createHistoryAdapter,
  Fu as createMemoryAdapter,
  Ku as createMemoryDataSource,
  Us as createMockDataSource,
  qu as createVueRouterAdapter,
  Pu as dateColumn,
  _s as defaultCellText,
  ht as defaultQuery,
  Ye as defaultViewFor,
  ts as detachableAdapter,
  qt as drillExpression,
  Ou as durationCell,
  Nu as elapsedCell,
  vs as emptyFacetValue,
  Xs as entityAddress,
  Eu as entityColumn,
  zt as entityCount,
  Du as entityRedirect,
  ya as excludingTerm,
  Ze as expandShortcuts,
  Mu as facetColumn,
  nt as facetField,
  Ca as facetValue,
  Es as fieldHeading,
  ma as fieldTerm,
  Xe as findEntity,
  pa as findEntityByAddress,
  Ce as findSort,
  Lu as flagColumn,
  Ue as fnv1a,
  Jn as focusEntity,
  os as formatBytes,
  pt as formatCount,
  as as formatDate,
  tu as formatDateTime,
  rs as formatDuration,
  ls as formatElapsed,
  he as formatExpression,
  qe as formatInteger,
  ns as formatMetric,
  ss as formatOrdinal,
  is as formatPercent,
  xs as formatRange,
  we as formatTerm,
  js as generateRows,
  co as hasActiveFacets,
  xu as identityColumn,
  iu as idsExpression,
  nu as isEntityScoped,
  ps as isFacetActive,
  rn as isPristineQuery,
  Je as isRangeTerm,
  ea as isTypeCardsQuery,
  Xn as isViewKind,
  su as joinExpression,
  ga as liftTerm,
  Os as matchesExpression,
  Cu as metricColumn,
  cu as narrowPatch,
  Ns as negateTerm,
  jc as niceMax,
  ce as normalizeSearch,
  oi as numberRange,
  Is as oppositeTerm,
  wu as ordinalColumn,
  re as parseExpression,
  eo as parseQuery,
  Au as percentCell,
  $u as pictureColumn,
  xo as placePopover,
  Tr as presentParts,
  Ta as presentRow,
  tt as pressOptions,
  no as provideShellContext,
  so as provideShellTheme,
  Wu as queryAll,
  Ru as rangeFrom,
  Mt as rangeOf,
  Hs as readDraft,
  lu as readExpression,
  Vu as recordRedirect,
  ha as recordTerm,
  to as recordsIn,
  Su as referenceColumn,
  et as refineExpression,
  De as resolveView,
  ve as roleColumn,
  ta as roleColumns,
  gs as rowKey,
  Ut as sameTerm,
  lt as scopeTerm,
  _t as scopeTermFor,
  ka as scopedEntity,
  ru as searchFromQuery,
  Hn as serializeQuery,
  Js as sortAddress,
  Et as sortsFor,
  au as splitExpression,
  ku as stateColumn,
  cs as stripAnsi,
  vo as summarizeQuery,
  bt as summaryTerms,
  pn as termStanding,
  bu as tintColumn,
  ou as tintFor,
  Bu as toggleFacet,
  ei as useColumns,
  yo as useDraft,
  xr as useEntityCounts,
  bi as useEntityPreviews,
  hn as useLayerTheme,
  gu as usePoll,
  Ae as usePresentedRows,
  po as useQueryState,
  wo as useRecordNames,
  ho as useResults,
  Z as useShellContext,
  _u as useStableSchema,
  Dc as useToasts,
  Hu as usefulFacets,
  xn as viewAcross,
  Pa as withFacetValue,
  Qt as withStanding,
  uu as withoutFacet,
  wa as withoutOwnScope,
  As as withoutTerm
};
