import { ref as B, computed as f, inject as Jt, provide as Zt, getCurrentInstance as Vn, shallowRef as ke, toValue as Ee, watch as se, onScopeDispose as _t, getCurrentScope as Dn, defineComponent as q, onMounted as et, onBeforeUnmount as ye, openBlock as u, createBlock as N, Teleport as wt, createElementVNode as $, mergeProps as Ft, unref as b, renderSlot as X, createCommentVNode as L, nextTick as ze, createElementBlock as h, useSlots as kt, useId as bt, withCtx as G, toDisplayString as E, createTextVNode as ee, Fragment as V, renderList as J, withModifiers as Me, normalizeClass as le, withDirectives as qt, withKeys as Fe, normalizeStyle as oe, vModelText as Fa, createVNode as W, reactive as hn, resolveDynamicComponent as je, createSlots as Vt, useModel as mn, onBeforeUpdate as qa, normalizeProps as At, guardReactiveProps as Va, mergeModels as yn, vShow as gn, Comment as Da, Text as Ka, readonly as Wa, watchEffect as za } from "vue";
import { MenuList as ja } from "menu-bar";
const en = ["list", "cards", "grid", "images", "table", "links", "preview"], Ke = ["ok", "running", "queued", "review", "failed"], jc = [...Ke, "neutral", "accent"], Uc = [
  "identity",
  "reference",
  "metric",
  "state",
  "updated",
  "image",
  "tint"
], Qc = [480, 620, 760, 900, 1100], Kn = Symbol("dc.routeAdapter");
function ce(e) {
  if (!e) return "";
  const t = e.replace(/^[?]/, "");
  return t ? `?${t}` : "";
}
function Ua() {
  const e = typeof window < "u", t = B(e ? ce(window.location.search) : ""), n = B(e ? window.location.pathname : "/"), a = () => {
    t.value = ce(window.location.search), n.value = window.location.pathname;
  };
  e && window.addEventListener("popstate", a);
  const s = (o, r, c) => {
    const l = ce(o);
    if (!e) {
      t.value = l, c !== void 0 && (n.value = c);
      return;
    }
    const i = c === void 0 || c === window.location.pathname ? `${window.location.pathname}${l}${window.location.hash}` : `${c}${l}`;
    r === "push" ? window.history.pushState(window.history.state, "", i) : window.history.replaceState(window.history.state, "", i), t.value = l, n.value = window.location.pathname;
  };
  return {
    search: t,
    path: n,
    href(o, r) {
      return e ? r !== void 0 && r !== window.location.pathname ? `${r}${ce(o)}` : `${window.location.pathname}${ce(o)}${window.location.hash}` : `${r ?? n.value}${ce(o)}`;
    },
    push: (o, r) => s(o, "push", r),
    replace: (o, r) => s(o, "replace", r),
    dispose: () => {
      e && window.removeEventListener("popstate", a);
    }
  };
}
function Qa(e, t) {
  const n = f(t.detached), a = f(() => n.value ? "" : e.search.value), s = f(() => n.value ? t.path() : e.path.value);
  return {
    search: a,
    path: s,
    elsewhere: n,
    push(o, r) {
      n.value ? e.push(o, r ?? t.path()) : e.push(o, r);
    },
    replace(o, r) {
      n.value ? e.push(o, r ?? t.path()) : e.replace(o, r);
    },
    href(o, r) {
      const c = r ?? (n.value ? t.path() : void 0);
      return e.href ? e.href(o, c) : `${c ?? e.path.value}${ce(o)}`;
    }
  };
}
function We(e) {
  let t = 2166136261;
  for (let n = 0; n < e.length; n++)
    t ^= e.charCodeAt(n), t = Math.imul(t, 16777619);
  return Math.abs(t);
}
function Ga(e) {
  if (!Number.isFinite(e)) return "—";
  const t = Math.abs(e);
  return t >= 1e6 ? `${(e / 1e6).toFixed(1)}m` : t >= 1e3 ? `${(e / 1e3).toFixed(1)}k` : String(Math.round(e));
}
function ct(e) {
  if (!Number.isFinite(e)) return "—";
  const t = Math.round(e), n = Math.abs(t);
  return n < 1e3 ? String(t) : n < 9950 ? `${(t / 1e3).toFixed(1)}k` : n < 999500 ? `${Math.round(t / 1e3)}k` : `${(t / 1e6).toFixed(1)}m`;
}
function He(e) {
  return Number.isFinite(e) ? Math.round(e).toLocaleString("en-US") : "—";
}
function Ya(e) {
  const t = new Date(e);
  if (Number.isNaN(t.getTime())) return "—";
  const n = String(t.getUTCDate()).padStart(2, "0"), a = String(t.getUTCMonth() + 1).padStart(2, "0");
  return `${n}.${a}.${t.getUTCFullYear()}`;
}
function Xa(e) {
  return String(e + 1);
}
function Gc(e, t) {
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
function Ja(e) {
  if (e == null || !Number.isFinite(e) || e < 0) return "—";
  if (e < 1e3) return `${e} B`;
  const t = ["kB", "MB", "GB", "TB"];
  let n = e, a = -1;
  for (; n >= 1e3 && a < t.length - 1; )
    n /= 1e3, a += 1;
  return `${n < 100 ? n.toFixed(1) : Math.round(n)} ${t[a]}`;
}
function Za(e) {
  if (!e || !Number.isFinite(e)) return "—";
  if (e < 1e3) return `${Math.round(e)}ms`;
  const t = e / 1e3;
  return t < 60 ? `${t.toFixed(1)}s` : `${Math.floor(t / 60)}m ${Math.round(t % 60)}s`;
}
function es(e) {
  if (e == null || !Number.isFinite(e) || e <= 0)
    return "—";
  const t = Math.floor(e / 60);
  return t ? `${t}:${String(e % 60).padStart(2, "0")}` : `${e}s`;
}
function ts(e) {
  return e == null || !Number.isFinite(e) ? "—" : `${Math.round(e * 100)}%`;
}
function ns(e) {
  return e.replace(/\x1b\[[0-9;?]*[ -/]*[@-~]/g, "");
}
const Wn = "cards", as = "table";
function Ue(e, t = {}) {
  const n = (s) => s && zn(s) ? s : void 0;
  if (e === null) return n(t.view) ?? Wn;
  const a = t.landing === "entity" ? n(t.view) : void 0;
  return n(t.entityView) ?? a ?? as;
}
function _n(e, t, n, a = {}) {
  return a.viewAcrossTypes !== "default" && e !== Ue(t, a) ? e : Ue(n, a);
}
const Dt = "updated";
function zn(e) {
  return typeof e == "string" && (e === "record" || en.includes(e));
}
const wn = {
  list: "List",
  cards: "Cards",
  grid: "Grid",
  images: "Images",
  table: "Table",
  links: "Links",
  preview: "Preview",
  record: "Record"
}, ss = {
  list: "M6 4h7.5M6 8h7.5M6 12h7.5M2.5 4h.01M2.5 8h.01M2.5 12h.01",
  cards: "M2.5 2.5h11v4.5h-11zM2.5 9h11v4.5h-11z",
  grid: "M2.5 2.5h4.5v4.5h-4.5zM9 2.5h4.5v4.5H9zM2.5 9h4.5v4.5h-4.5zM9 9h4.5v4.5H9z",
  images: "M2.5 3h11v10h-11zM2.5 11l3.5-3.5 2.5 2.5 2-2 3 3M10.5 5.75h.01",
  table: "M2.5 3h11v10h-11zM2.5 6.5h11M2.5 9.75h11M6.5 6.5V13",
  links: "M6.75 9.25a2.5 2.5 0 0 0 3.54 0l2.12-2.12a2.5 2.5 0 0 0-3.54-3.54l-.7.7M9.25 6.75a2.5 2.5 0 0 0-3.54 0L3.59 8.87a2.5 2.5 0 0 0 3.54 3.54l.7-.7",
  preview: "M1.5 8S4 3.5 8 3.5 14.5 8 14.5 8 12 12.5 8 12.5 1.5 8 1.5 8zM6 8a2 2 0 1 0 4 0 2 2 0 1 0-4 0",
  record: "M4 2h5.5L12 4.5V14H4zM9.5 2v2.5H12M6 8h4M6 10.5h4"
};
function qe(e, t) {
  if (e === "record" && !t?.includes(e)) return t?.[0] ?? Wn;
  const [n] = t ?? [];
  return n === void 0 || t?.includes(e) ? e : n;
}
function Kt(e) {
  return typeof e.count == "number" ? ct(e.count) : e.count;
}
function Qe(e, t) {
  return t ? e.entities.find((n) => n.key === t) ?? null : null;
}
function jn(e, t = {}) {
  const n = Qe(e, t.entity), a = e.entities[0];
  if (!n && !a) throw new Error(`Schema "${e.key}" declares no entities`);
  return n ?? a;
}
function Un(e, t = null) {
  return e?.columns ?? t?.columns ?? [];
}
function $t(e, t = null) {
  if (e?.sorts?.length) return e.sorts;
  const n = /* @__PURE__ */ new Set(), a = [];
  for (const s of Un(e, t))
    !s.sort || n.has(s.sort) || (n.add(s.sort), a.push({ key: s.sort, label: (s.label ?? s.sort).toLowerCase() }));
  return a;
}
const os = { key: Dt, label: Dt };
function Se(e, t, n = null) {
  const a = $t(e, n);
  return (t ? a.find((o) => o.key === t) : void 0) ?? a.find((o) => o.key === Dt) ?? a[0] ?? os;
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
function ls(e) {
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
function tn(e) {
  return e.entity === null && e.expr.trim() === "";
}
function Yc(e) {
  return e.entity !== null;
}
function Qn(e, t) {
  return e.entity === null && qe(e.view, t) === "cards";
}
function is(e, t) {
  return t <= 0 ? 1 : Math.max(1, Math.ceil(e / t));
}
function ut(e, t = {}) {
  const a = t.landing === "entity" ? jn(e, t) : null;
  return {
    entity: a?.key ?? null,
    view: Ue(a?.key ?? null, t),
    sort: Se(a, t.sort).key,
    dir: t.dir === "asc" ? "asc" : "desc",
    expr: "",
    page: 1
  };
}
const nn = ["entity", "sort", "dir", "expr"];
function It(e) {
  return nn.some((t) => t in e);
}
const ge = "—";
function fe(e, t) {
  return e.find((n) => n.role === t);
}
function Gn(e, t) {
  return e.filter((n) => n.role === t);
}
function cs(e, t) {
  const n = (t ? t.columns : e?.columns) ?? [], a = t ? "scoped" : "everything";
  return n.filter(
    (s) => s.role !== "tint" && ((s.when ?? "always") === "always" || s.when === a)
  );
}
const us = ["id", "entityKey", "entityLabel"];
function ie(e, t) {
  if (e.value) return e.value(t);
  const n = e.field ?? e.key;
  if (n !== void 0) {
    if (t.fields && n in t.fields) return t.fields[n];
    if (us.includes(n))
      return t[n];
  }
}
function kn(e, t) {
  const n = e.key ?? e.field ?? e.label;
  return n?.trim() ? n.trim() : `column-${t}`;
}
function ds(e, t) {
  return e.id?.trim() ? e.id : `${e.entityKey || "row"}-${t}`;
}
function fs(e, t) {
  if (e == null || e === "") return ge;
  if (t === "number") {
    const n = typeof e == "number" ? e : Number(e);
    return Number.isFinite(n) ? Ga(n) : String(e);
  }
  return t === "date" ? Ya(String(e)) : Array.isArray(e) ? e.length ? e.join(", ") : ge : String(e);
}
function Le(e, t) {
  const n = ie(e, t);
  return e.format ? e.format(n, t) : fs(n, e.kind);
}
function vs(e) {
  return typeof e == "number" ? Number.isFinite(e) ? String(e) : "" : typeof e == "string" ? e : Array.isArray(e) ? e.join(", ") : "";
}
function Yn(e, t) {
  const n = Le(e, t), a = vs(ie(e, t));
  return a && a !== n ? a : n;
}
function it(e, t) {
  return e ? Le(e, t) : "";
}
function bn(e) {
  return e.align ? e.align : e.kind === "number" || e.kind === "ordinal" ? "right" : "left";
}
const ps = {
  ordinal: "dc-table__num",
  number: "dc-table__number",
  date: "dc-table__date",
  status: "dc-table__state"
};
function $n(e) {
  return [ps[e.kind ?? "text"], e.class].filter(Boolean).join(" ");
}
function Wt(e) {
  if (e.truncate !== void 0) return e.truncate;
  const t = e.kind ?? "text";
  return t === "text" || t === "number" || t === "date";
}
const hs = /^([A-Za-z_][\w.-]*)\s*(>=|<=|:|=|>|<)\s*(.*)$/, xn = "-?(?:\\d+\\.?\\d*|\\.\\d+)", ms = new RegExp(`^(${xn})?\\.\\.(${xn})?$`);
function xt(e) {
  const t = ms.exec(e.trim());
  if (!t || t[1] === void 0 && t[2] === void 0) return null;
  const n = t[1] === void 0 ? null : Number(t[1]), a = t[2] === void 0 ? null : Number(t[2]);
  return n !== null && a !== null && n > a ? { min: a, max: n } : { min: n, max: a };
}
function ys(e) {
  return `${e.min ?? ""}..${e.max ?? ""}`;
}
function Ge(e) {
  return e.kind === "field" && (e.comparator === ":" || e.comparator === "=") && xt(e.value) !== null;
}
function gs(e) {
  const t = [];
  let n = "", a = null;
  const s = () => {
    n && t.push(n), n = "";
  };
  for (let o = 0; o < e.length; o++) {
    const r = e[o];
    if (a) {
      r === a ? a = null : n += r;
      continue;
    }
    if (r === '"' || r === "'") {
      a = r;
      continue;
    }
    if (/\s/.test(r)) {
      if (/(?:>=|<=|[:=><])$/.test(n) || e.slice(o + 1).match(/^\s*(>=|<=|[:=><])/) && n) continue;
      s();
      continue;
    }
    n += r;
  }
  return s(), t;
}
function re(e) {
  const t = e.trim();
  if (!t) return [];
  const n = [];
  let a = [];
  for (const s of gs(t)) {
    const o = s.toUpperCase();
    if (o === "AND" || o === "&&") continue;
    if (o === "OR" || o === "||") {
      a.length && n.push(a), a = [];
      continue;
    }
    const r = s.length > 1 && s.startsWith("-"), c = r ? s.slice(1) : s, l = r ? { negated: !0 } : {}, i = hs.exec(c);
    i && i[3] !== "" ? a.push({
      kind: "field",
      field: i[1].toLowerCase(),
      comparator: i[2],
      value: i[3],
      ...l
    }) : a.push({ kind: "text", value: c, ...l });
  }
  return a.length && n.push(a), n;
}
const Ce = (e) => e.toLowerCase().replace(/\s+/g, ""), Xn = [
  ["status", "state"],
  ["state", "state"],
  ["updated", "updated"],
  ["date", "updated"],
  ["name", "identity"],
  ["ref", "reference"]
];
function _s(e, t, n) {
  const a = Ce(e), s = n.columns ?? [];
  if (a === "entity") return t.entityKey;
  if (e in t.fields) return t.fields[e];
  const o = s.find(
    (i) => i.key?.toLowerCase() === e.toLowerCase() || i.field?.toLowerCase() === e.toLowerCase() || i.label !== void 0 && Ce(i.label) === a
  );
  if (o) return ie(o, t);
  const r = n.facets.find(
    (i) => i.key.toLowerCase() === a || Ce(i.label) === a
  );
  if (r && r.key in t.fields) return t.fields[r.key];
  const c = Xn.find(([i]) => i === a)?.[1];
  if (c) {
    const i = fe(s, c);
    if (i) return ie(i, t);
  }
  const l = /^metric(\d+)$/.exec(a);
  if (l) {
    const i = Gn(s, "metric")[Number(l[1]) - 1];
    if (i) return ie(i, t);
  }
}
function tt(e) {
  return (e.toLowerCase().match(/[\p{L}\p{N}]+/gu) ?? []).map((t) => t.charAt(0)).join("");
}
const Sn = /^[a-z_][\w.-]*$/;
function St(e) {
  const t = (e.key ?? e.field)?.toLowerCase();
  if (t !== void 0) return Sn.test(t) ? t : void 0;
  const n = e.label === void 0 ? void 0 : Ce(e.label);
  return n !== void 0 && Sn.test(n) ? n : void 0;
}
function an(e, t) {
  const n = Ce(e);
  return !!t?.entities.some((a) => a.scope && Ce(a.scope) === n);
}
function ws(e, t, n) {
  const a = Ce(e);
  if (a === "entity" || Xn.some(([o]) => o === a) || /^metric\d+$/.test(a) || an(e, n)) return !0;
  const s = (o) => o !== void 0 && Ce(o) === a;
  return (t.columns ?? []).some(
    (o) => s(o.key) || s(o.field) || s(o.label)
  ) || t.facets.some((o) => s(o.key) || s(o.label));
}
function Ye(e, t, n) {
  return t ? Zn(e, (a) => {
    const s = ea(a, t, n);
    return s && St(s);
  }) : e;
}
function Jn(e, t, n) {
  return t ? Zn(e, (a) => {
    if (an(a, n)) return;
    const s = (t.columns ?? []).find((o) => St(o) === a);
    return s && ta(s, t, n);
  }) : e;
}
function ks(e, t, n) {
  if (!t || an(e, n)) return;
  const a = t.facets.find((s) => s.key.toLowerCase() === e);
  return a ? a.label : (t.columns ?? []).find((s) => St(s) === e)?.label;
}
function Zn(e, t) {
  let n = !1;
  const a = re(e).map(
    (s) => s.map((o) => {
      if (o.kind !== "field") return o;
      const r = t(o.field);
      return !r || r === o.field ? o : (n = !0, { ...o, field: r });
    })
  );
  return n ? me(a) : e;
}
function ea(e, t, n) {
  if (!(!e || ws(e, t, n)))
    return (t.columns ?? []).find(
      (a) => a.label !== void 0 && tt(a.label) === e
    );
}
function ta(e, t, n) {
  if (!t || e.label === void 0 || !St(e)) return;
  const a = tt(e.label);
  return ea(a, t, n) === e ? a : void 0;
}
function Rt(e, t) {
  const n = e.toLowerCase(), a = t.toLowerCase();
  if (!a.includes("*")) return n.includes(a);
  const s = a.replace(/[.+?^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*");
  return new RegExp(s).test(n);
}
function Cn(e, t) {
  return e.toLowerCase() === t.toLowerCase();
}
function bs(e, t, n, a) {
  if (e.kind === "text") {
    const l = n.columns ?? [];
    return ["identity", "reference"].some((i) => {
      const d = fe(l, i), p = d ? ie(d, t) : void 0;
      return typeof p == "string" && Rt(p, e.value);
    });
  }
  const s = _s(e.field, t, n);
  if (s === void 0) return a?.has(e.field) ? !1 : null;
  const o = Ge(e) ? xt(e.value) : null;
  if (o) {
    if (Array.isArray(s) || typeof s == "boolean") return null;
    const l = typeof s == "number" ? s : Number(s);
    return Number.isFinite(l) ? (o.min === null || l >= o.min) && (o.max === null || l <= o.max) : null;
  }
  if (Array.isArray(s))
    return e.comparator === ":" || e.comparator === "=" ? s.some(
      (i) => e.comparator === "=" ? Cn(String(i), e.value) : Rt(String(i), e.value)
    ) : null;
  if (e.comparator === ":" || e.comparator === "=") {
    if (typeof s == "boolean") {
      const l = e.value.toLowerCase();
      return l === "true" || l === "yes" ? s : l === "false" || l === "no" ? !s : null;
    }
    if (typeof s == "number") {
      const l = Number(e.value);
      return Number.isFinite(l) ? s === l : null;
    }
    return e.comparator === "=" ? Cn(String(s), e.value) : Rt(String(s), e.value);
  }
  const r = Number(e.value), c = typeof s == "number" ? s : Number(s);
  return !Number.isFinite(r) || !Number.isFinite(c) ? null : $s(e.comparator, c, r);
}
function Pn(e, t, n, a) {
  const s = bs(e, t, n, a);
  return s === null ? !0 : e.negated ? !s : s;
}
function $s(e, t, n) {
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
function En(e) {
  return e.kind === "field" && !e.negated && (e.comparator === ":" || e.comparator === "=") && !Ge(e);
}
const Mn = /* @__PURE__ */ new WeakMap();
function xs(e) {
  if (!e?.strictScopes) return null;
  let t = Mn.get(e);
  return t || (t = new Set(
    e.entities.flatMap((n) => n.scope ? [n.scope.toLowerCase()] : [])
  ), Mn.set(e, t)), t;
}
function Ss(e, t, n, a) {
  if (!e.length) return !0;
  const s = xs(a);
  return e.some((o) => {
    const r = /* @__PURE__ */ new Map();
    for (const c of o)
      En(c) && r.set(
        c.field,
        (r.get(c.field) ?? !1) || Pn(c, t, n, s)
      );
    return o.every(
      (c) => En(c) ? r.get(c.field) === !0 : Pn(c, t, n, s)
    );
  });
}
function Ln(e) {
  return /[\s"']/.test(e) ? `"${e.replace(/["']/g, "")}"` : e;
}
function we(e) {
  const t = e.negated ? "-" : "";
  return e.kind === "text" ? t + Ln(e.value) : `${t}${e.field}${e.comparator}${Ln(e.value)}`;
}
function Cs(e) {
  if (!e.negated) return { ...e, negated: !0 };
  const { negated: t, ...n } = e;
  return n;
}
function me(e) {
  return e.filter((t) => t.length).map((t) => t.map(we).join(" ")).join(" OR ");
}
function Ps(e, t, n) {
  return e.map((a, s) => s === t ? a.filter((o, r) => r !== n) : a).filter((a) => a.length);
}
function Xc(e) {
  const t = re(e);
  if (t.length > 1) return { parts: [], text: e.trim() };
  const n = t[0] ?? [];
  return {
    parts: n.filter((a) => a.kind === "field"),
    text: n.filter((a) => a.kind === "text").map(we).join(" ")
  };
}
function Jc(e, t) {
  return [...e.map(we), t.trim()].filter(Boolean).join(" ");
}
const Tn = (e, t) => e.toLowerCase() === t.toLowerCase();
function zt(e, t) {
  return !!e.negated == !!t.negated && na(e, t);
}
function Es(e, t) {
  return !!e.negated != !!t.negated && na(e, t);
}
function na(e, t) {
  return e.kind === "field" ? t.kind === "field" && e.field === t.field && e.comparator === t.comparator && Tn(e.value, t.value) : t.kind === "text" && Tn(e.value, t.value);
}
function Ms(e, t) {
  return t.filter((n) => !e.some((a) => zt(a, n)));
}
function sn(e, t) {
  return aa(e, t, (n) => n);
}
function dt(e, t) {
  return aa(
    e,
    t,
    (n, a) => n.filter((s) => !a.some((o) => Es(s, o)))
  );
}
const Ls = /^[A-Za-z_][\w.-]*\s*(?:>=|<=|:|=|>|<)$/;
function Ts(e) {
  return me(
    re(e).map(
      (t) => t.filter(
        (n) => n.kind !== "text" || n.value !== "-" && !Ls.test(n.value)
      )
    ).filter((t) => t.length > 0)
  );
}
function aa(e, t, n) {
  const a = re(e), s = re(t);
  return a.length ? s.length ? me(
    a.flatMap(
      (o) => s.map((r) => [...n(o, r), ...Ms(o, r)])
    )
  ) : me(a) : me(s);
}
const sa = (e) => e.kind === "date" || e.role === "updated";
function Os(e) {
  if (!e) return () => 0;
  const n = (e.kind ?? "text") === "number" || e.role === "metric", a = sa(e);
  return (s, o) => {
    const r = ie(e, s), c = ie(e, o);
    return n ? Number(c ?? 0) - Number(r ?? 0) : a ? Date.parse(String(c ?? "")) - Date.parse(String(r ?? "")) : String(c ?? "").localeCompare(String(r ?? ""));
  };
}
function On(e, t) {
  return !t || !sa(t) ? !1 : !Number.isFinite(Date.parse(String(ie(t, e) ?? "")));
}
function oa({ query: e, schema: t, entity: n, limit: a, offset: s }, o, r) {
  const c = re(e.expr), l = n ? [n] : t.entities;
  let i = 0;
  const d = [];
  for (const k of l)
    for (const P of o(k))
      i += 1, Ss(c, P, k, t) && d.push(P);
  const p = Se(n, e.sort, t), w = Un(n, t).find((k) => k.sort === p.key), g = r.undatedLast ? d.filter((k) => !On(k, w)) : d, _ = r.undatedLast ? d.filter((k) => On(k, w)) : [];
  g.sort(Os(w)), e.dir === "asc" && g.reverse();
  const v = _.length ? [...g, ..._] : g;
  return {
    // One page out of the middle. `total` stays the whole match, which is what
    // the shell counts pages with.
    rows: r.zeroIsAll && a <= 0 ? v.slice(s) : v.slice(s, s + a),
    total: d.length,
    unfiltered: d.length === i
  };
}
const ft = [
  "oklch(0.36 0.06 240)",
  "oklch(0.34 0.07 290)",
  "oklch(0.36 0.06 160)",
  "oklch(0.38 0.06 80)",
  "oklch(0.35 0.07 30)",
  "oklch(0.34 0.05 200)"
];
function Zc(e) {
  return ft[We(e) % ft.length];
}
function ra(e, t) {
  return `${e}_${1e4 + t * 7}`;
}
const Ns = 7, As = 3;
function Is(e, t, n, a) {
  const s = (t * Ns + We(n)) % a, o = [];
  for (let r = 0; r < Math.min(As, a); r++)
    o.push(ra(e, (s + r) % a));
  return o;
}
function Rs(e, t) {
  switch (e.kind) {
    case "chips":
      return e.multiple ? Bs(e.options, t) : e.options[t % e.options.length] ?? "";
    case "range": {
      const n = Math.max(0, e.max - e.min);
      return e.min + (n === 0 ? 0 : t % (n + 1));
    }
    case "toggle":
      return t % 3 === 0;
  }
}
function Bs(e, t) {
  if (!e.length) return [];
  const n = 1 + (t >> 5) % Math.min(3, e.length), a = t % e.length, s = /* @__PURE__ */ new Set();
  for (let o = 0; o < n; o++) s.add((a + o) % e.length);
  return [...s].sort((o, r) => o - r).map((o) => e[o]);
}
function Hs(e, t) {
  const { hash: n, sample: a, revision: s, updatedAt: o } = t, r = s ? ` · rev ${s + 1}` : "";
  switch (e.role) {
    case "identity":
      return `${a[0]}${r}`;
    case "reference":
      return s ? `${a[1]}-${s + 1}` : a[1];
    case "state":
      return Ke[n % Ke.length];
    case "updated":
      return o;
    case "tint":
      return ft[n % ft.length];
    case "metric":
      return 1 + n % 940;
  }
  switch (e.kind) {
    case "number":
      return 1 + n % 940;
    case "status":
      return Ke[n % Ke.length];
    case "date":
      return o;
    default:
      return;
  }
}
function Fs(e, t = {}) {
  const n = t.population ?? 48, a = t.seed ?? "", s = t.now ?? /* @__PURE__ */ new Date("2026-08-25T00:00:00Z"), o = e.samples, r = t.scopes ?? [];
  if (!o.length) return [];
  const c = [];
  for (let l = 0; l < n; l++) {
    const i = o[l % o.length], d = Math.floor(l / o.length), p = We(`${a}:${e.key}:${i[0]}:${l}`), w = ra(e.key, l), g = new Date(s.getTime() - p % 900 * 36e5).toISOString(), _ = {};
    for (const v of e.columns ?? []) {
      const k = v.field ?? v.key;
      if (!k || v.value) continue;
      const P = Hs(v, {
        hash: We(`${p}:${k}`),
        sample: i,
        revision: d,
        updatedAt: g
      });
      P !== void 0 && (_[k] = P);
    }
    for (const v of e.facets)
      _[v.key] = Rs(v, We(`${p}:${v.key}`));
    for (const [v, k] of r)
      _[v] = k === e.key ? w : Is(k, l, v, n);
    c.push({ id: w, entityKey: e.key, entityLabel: e.label, fields: _ });
  }
  return c;
}
function qs(e = {}) {
  const t = /* @__PURE__ */ new Map(), n = (a, s) => {
    const o = t.get(a.key);
    if (o) return o;
    const r = e.scopes ?? s.entities.flatMap(
      (l) => l.scope ? [[l.scope, l.key]] : []
    ), c = Fs(a, { ...e, scopes: r });
    return t.set(a.key, c), c;
  };
  return {
    query(a) {
      return oa(a, (s) => n(s, a.schema), {
        undatedLast: !1,
        zeroIsAll: !1
      });
    }
  };
}
const Ve = "e", Ct = "v", on = "s", rn = "d", Te = "q", Pt = "p", la = "*", Vs = [
  Ve,
  Ct,
  on,
  rn,
  Te,
  Pt
], Ds = [
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
function vt(e) {
  let t = encodeURIComponent(e);
  for (const [n, a] of Ds) t = t.replace(n, a);
  return t;
}
function he(e) {
  try {
    return decodeURIComponent(e.replace(/\+/g, " "));
  } catch {
    return e.replace(/\+/g, " ");
  }
}
function ln(e) {
  const t = e.replace(/^[?]/, "");
  if (!t) return [];
  const n = [];
  for (const a of t.split("&")) {
    if (!a) continue;
    const s = a.indexOf("="), o = s === -1 ? a : a.slice(0, s), r = s === -1 ? "" : a.slice(s + 1);
    n.push([he(o), r]);
  }
  return n;
}
function Ks(e) {
  return Vs.includes(e);
}
function Et(e, t) {
  if (!(!t || e.some((n) => n.key === t)))
    return e.find((n) => tt(n.label) === t);
}
function Ws(e, t) {
  const n = tt(e.label);
  return Et(t.entities, n)?.key === e.key ? n : e.key;
}
function ia(e, t) {
  return t ? Qe(e, t) ?? Et(e.entities, t) ?? null : null;
}
function zs(e, t) {
  const n = tt(e.label);
  return Et(t, n)?.key === e.key ? n : e.key;
}
function js(e, t) {
  return t.some((n) => n.key === e) ? e : Et(t, e)?.key ?? e;
}
function Us(e, t, n = {}) {
  const a = ut(t, n), s = new Map(ln(e)), o = s.get(Ve), r = o === void 0 ? a.entity : he(o), c = r === la ? null : ia(t, r), l = s.get(Ct), i = l && zn(he(l)) ? he(l) : Ue(c?.key ?? null, n), d = s.get(on), p = Se(
    c,
    d ? js(he(d), $t(c, t)) : n.sort,
    t
  ), w = s.get(rn), g = w ? he(w) === "asc" ? "asc" : "desc" : a.dir, _ = s.get(Te), v = s.get(Pt), k = v === void 0 ? 1 : Number(he(v)), P = Number.isFinite(k) ? Math.max(1, Math.floor(k)) : 1;
  return {
    entity: c?.key ?? null,
    view: i,
    sort: p.key,
    dir: g,
    expr: _ === void 0 ? "" : Ye(he(_), c, t),
    page: P
  };
}
function Nn(e, t, n = {}, a = "") {
  const s = ut(t, n), o = Qe(t, e.entity), r = ln(a).filter(([p]) => !Ks(p)), c = [], l = (p, w) => c.push([p, vt(w)]), i = o?.key ?? null;
  if (i !== s.entity && l(Ve, o ? Ws(o, t) : la), e.view !== Ue(i, n) && l(Ct, e.view), e.sort !== s.sort) {
    const p = $t(o, t), w = p.find((g) => g.key === e.sort);
    l(on, w ? zs(w, p) : e.sort);
  }
  e.dir !== s.dir && l(rn, e.dir), e.expr.trim() !== "" && l(Te, Jn(e.expr, o, t)), e.page > 1 && l(Pt, String(e.page));
  const d = [
    ...r.map(([p, w]) => [vt(p), w]),
    ...c
  ];
  return d.length ? `?${d.map(([p, w]) => w === "" ? p : `${p}=${w}`).join("&")}` : "";
}
function eu(e) {
  const t = [];
  for (const [n, a] of Object.entries(e))
    for (const s of Array.isArray(a) ? a : [a]) {
      if (typeof s != "string") continue;
      const o = vt(n);
      t.push(s === "" ? o : `${o}=${vt(s)}`);
    }
  return t.length ? `?${t.join("&")}` : "";
}
function tu(e, t) {
  const n = new Map(ln(e)), a = n.get(Te), s = a === void 0 ? "" : he(a);
  if (!t) return s;
  const o = n.get(Ve);
  return Ye(
    s,
    o === void 0 ? null : ia(t, he(o)),
    t
  );
}
function Mt(e, t) {
  return ca(e, t.id);
}
function ca(e, t) {
  const n = e?.scope;
  return n ? ua(n, t) : null;
}
function ua(e, t) {
  return `${e}="${t.replace(/"/g, "")}"`;
}
function nu(e, t) {
  const n = typeof e == "string" ? e : e?.scope;
  if (!n) return null;
  const a = t.filter((s) => s.replace(/"/g, "") !== "").map((s) => ua(n, s));
  return a.length ? a.join(" ") : null;
}
function Lt(e, t) {
  if (e.kind !== "field" || t.kind !== "field") return zt(e, t);
  const n = (a) => a.comparator === ":" || a.comparator === "=";
  return zt(e, { ...t, comparator: n(e) && n(t) ? e.comparator : t.comparator });
}
function pt(e, t) {
  return Lt(e, Cs(t));
}
function ht(e, t) {
  return Mt(
    e.entities.find((n) => n.key === t.entityKey),
    t
  );
}
function nt(e, t) {
  if (!t) return e;
  const n = e.trim();
  if (!n) return t;
  const [a] = re(t).flat();
  if (!a) return n;
  const s = re(n);
  return s.some((c) => c.some((l) => Lt(l, a))) ? n : s.some((c) => c.some((l) => pt(l, a))) ? me(
    s.map(
      (c) => c.map((l) => pt(l, a) ? a : l)
    )
  ) : `${n} ${t}`;
}
function da(e) {
  if (!e) return null;
  const t = e.trim();
  return t ? t.startsWith("-") ? t.slice(1) : `-${t}` : null;
}
function cn(e, t) {
  if (!t || !e.trim()) return null;
  const [n] = re(t).flat();
  if (!n) return null;
  const a = re(e).flat();
  return a.some((s) => Lt(s, n)) ? n.negated ? "out" : "in" : a.some((s) => pt(s, n)) ? n.negated ? "in" : "out" : null;
}
function fa(e, t) {
  if (!t || !e.trim()) return e;
  const [n] = re(t).flat();
  if (!n) return e;
  const a = re(e), s = a.map(
    (o) => o.filter((r) => !Lt(r, n) && !pt(r, n))
  );
  return s.every((o, r) => o.length === a[r]?.length) ? e : me(s);
}
function jt(e, t, n) {
  return t ? n === null ? fa(e, t) : nt(e, n === "out" ? da(t) : t) : e;
}
function va(e) {
  return e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0;
}
function Tt(e) {
  return e.altKey ? { exclude: !0 } : {};
}
function Bt(e, t, n, a = {}) {
  const s = ht(e, n);
  return nt(t.expr, a.exclude ? da(s) : s);
}
function pa(e, t) {
  const n = e?.scope?.toLowerCase();
  if (!n || e?.keepsScope || !t.trim()) return t;
  const a = re(t), s = a.map(
    (o) => o.filter((r) => r.kind !== "field" || r.field !== n)
  );
  return s.every((o, r) => o.length === a[r]?.length) ? t : me(s);
}
function ha(e, t) {
  const n = t.toLowerCase();
  return e.entities.find((a) => a.scope?.toLowerCase() === n) ?? null;
}
function ma(e, t, n) {
  if (!t || !n) return null;
  const a = ha(e, t);
  return a ? { entity: a, id: n } : null;
}
function Qs(e, t) {
  const n = [], a = /* @__PURE__ */ new Set();
  for (const s of t)
    for (const o of re(s).flat()) {
      if (o.kind !== "field" || o.negated) continue;
      const r = ma(e, o.field, o.value);
      if (!r) continue;
      const c = `${r.entity.key}:${r.id.toLowerCase()}`;
      a.has(c) || (a.add(c), n.push({ entityKey: r.entity.key, id: r.id }));
    }
  return n;
}
function au(e, t, n = "cards") {
  return {
    // An expression with nothing in it is no parameter, as the shell writes it.
    [Te]: nt(e, t) || void 0,
    [Ve]: void 0,
    [Ct]: n,
    [Pt]: void 0
  };
}
const ya = Symbol("dc.shellContext");
function Gs(e) {
  const t = e.liveQuery ? e : Ys(e);
  return Zt(ya, t), t;
}
function Ys(e) {
  const t = e.draft ?? B("");
  return {
    draft: t,
    liveQuery: e.query,
    drafting: f(() => !1),
    commitDraft() {
      const n = t.value.trim();
      n && (e.setExpression(
        dt(e.query.value.expr, Ye(n, e.entity.value, e.schema.value))
      ), t.value = "");
    },
    abandonDraft() {
      t.value = "";
    },
    ...e
  };
}
function te() {
  const e = Jt(ya, null);
  if (!e)
    throw new Error(
      "[appfr] No shell context found. Render this component inside <DataShell>."
    );
  return e;
}
const mt = Symbol("dc-shell-theme");
function Ut(e) {
  return {
    read: () => ({
      theme: Ee(e.theme),
      accent: Ee(e.accent),
      tokens: Ee(e.tokens)
    })
  };
}
function Xs(e, t) {
  t ? t.provide(mt, Ut(e)) : Zt(mt, Ut(e));
}
function Js(e) {
  const t = Vn();
  Zt(mt, {
    ...Ut(e),
    element: () => t?.proxy?.$el ?? null
  });
}
function un(e) {
  const t = Vn(), n = Jt(mt, null), a = ke(null);
  function s() {
    const l = t?.proxy?.$el, d = (l instanceof Element ? l : l?.parentElement)?.closest(".dc-shell");
    if (!d) {
      a.value = null;
      return;
    }
    const p = {};
    for (const w of Array.from(d.style))
      w.startsWith("--") && (p[w] = d.style.getPropertyValue(w));
    a.value = { shell: d, theme: d.dataset.dcTheme, tokens: p };
  }
  const o = f(() => {
    const l = a.value;
    if (!n) return l;
    const i = n.element?.();
    return l && i && l.shell !== i && i.contains(l.shell) ? l : n.read();
  }), r = f(() => e.theme ?? o.value?.theme ?? "minimal"), c = f(() => {
    const l = o.value, i = {
      ...l?.tokens,
      ...l?.accent ? { "--dc-accent": l.accent } : {},
      ...e.tokens,
      ...e.accent ? { "--dc-accent": e.accent } : {}
    };
    return Object.keys(i).length ? i : void 0;
  });
  return { theme: r, style: c, adopt: s };
}
function Xe(e) {
  return e.key.toLowerCase();
}
const Zs = /* @__PURE__ */ new Set([">", ">=", "<", "<="]);
function ga(e, t) {
  if (e.kind !== "field" || e.negated || e.field !== Xe(t)) return !1;
  const n = e.comparator === ":" || e.comparator === "=";
  switch (t.kind) {
    case "range":
      return Ge(e) || Zs.has(e.comparator);
    case "chips":
      return n && !Ge(e) && _a(t.options, e.value) !== void 0;
    case "toggle":
      return n && eo(e.value);
  }
}
function _a(e, t) {
  const n = t.toLowerCase();
  return e.find((a) => a.toLowerCase() === n);
}
function eo(e) {
  const t = e.toLowerCase();
  return t === "true" || t === "yes";
}
function wa(e, t) {
  const n = (re(e)[0] ?? []).filter((a) => ga(a, t));
  switch (t.kind) {
    case "range": {
      let a = null, s = null;
      for (const o of n) {
        const r = xt(o.value), c = Number(o.value);
        r ? (r.min !== null && (a = r.min), r.max !== null && (s = r.max)) : Number.isFinite(c) && (o.comparator.startsWith(">") ? a = c : s = c);
      }
      return { kind: "range", min: a, max: s };
    }
    case "chips": {
      const a = new Set(n.map((s) => _a(t.options, s.value)));
      return { kind: "chips", selected: t.options.filter((s) => a.has(s)) };
    }
    case "toggle":
      return { kind: "toggle", on: n.length > 0 };
  }
}
function to(e, t) {
  const n = Xe(e);
  switch (t.kind) {
    case "range":
      return t.min === null && t.max === null ? [] : [{ kind: "field", field: n, comparator: ":", value: ys(t) }];
    case "chips":
      return t.selected.map((a) => ({ kind: "field", field: n, comparator: "=", value: a }));
    case "toggle":
      return t.on ? [{ kind: "field", field: n, comparator: ":", value: "true" }] : [];
  }
}
function ka(e, t, n) {
  const a = to(t, n), s = re(e), o = (s.length ? s : [[]]).map((r) => [
    ...r.filter((c) => !ga(c, t)),
    ...a
  ]);
  return me(o);
}
function su(e, t) {
  return ka(e, t, rs(t));
}
function no(e, t) {
  return (t?.facets ?? []).some((n) => ls(wa(e, n)));
}
const yt = "entity", Je = "expr", ao = { ">=": "≥", "<=": "≤", ">": ">", "<": "<" };
function so(e, t, n) {
  if (e.kind !== "field") return we(e);
  const a = ks(e.field, t, n);
  if (a === void 0) return we(e);
  const s = e.negated ? "-" : "", o = Ge(e) ? xt(e.value) : null;
  if (o) {
    const c = o.min !== null && o.max !== null ? `${o.min} ≤ ${a} ≤ ${o.max}` : o.max !== null ? `${a} ≤ ${o.max}` : `${a} ≥ ${o.min}`;
    return s + c;
  }
  const r = ao[e.comparator];
  return r ? `${s}${a} ${r} ${e.value}` : we({ ...e, field: a });
}
function dn(e, t, n = null) {
  const a = [];
  return t && a.push({
    id: yt,
    label: `entity:${t.key}`,
    facetKey: yt
  }), re(e.expr).forEach((s, o) => {
    s.forEach((r, c) => {
      a.push({
        id: `${Je}:${o}:${c}`,
        label: so(r, t, n),
        address: Jn(we(r), t, n),
        facetKey: Je,
        group: o,
        index: c,
        ...r.kind === "field" ? { field: r.field, value: r.value } : {},
        ...r.negated ? { negated: !0 } : {}
      });
    });
  }), a;
}
function oo(e, t, n = null) {
  if (tn(e)) {
    const o = Se(t, e.sort, n);
    return `everything · ${e.view} · ${o.label}`;
  }
  const a = dn(e, t).filter((o) => o.facetKey !== Je).map((o) => o.label), s = e.expr.trim();
  return s && a.push(`"${s}"`), a.join(" · ");
}
function ro(e) {
  const { adapter: t } = e, n = f(() => Ee(e.schema)), a = f(() => Ee(e.defaults) ?? {}), s = f(() => Us(t.search.value, n.value, a.value)), o = f(() => Qe(n.value, s.value.entity)), r = f(() => o.value ?? jn(n.value, a.value)), c = f(() => $t(o.value, n.value)), l = f(() => Se(o.value, s.value.sort, n.value)), i = (x, m) => {
    const y = Nn(x, n.value, a.value, t.search.value);
    return y === t.search.value && !t.elsewhere?.value ? !1 : (m === "push" ? t.push(y) : t.replace(y), !0);
  }, d = () => Ee(e.navigationMode) ?? "push", p = () => Ee(e.facetNavigationMode) ?? "replace", w = (x, m) => {
    const y = x.page ?? (It(x) ? 1 : s.value.page);
    return i({ ...s.value, ...x, page: y }, m);
  }, g = (x) => {
    const m = x.page ?? (It(x) ? 1 : s.value.page);
    return _({ ...s.value, ...x, page: m });
  }, _ = (x) => {
    const m = Nn(x, n.value, a.value, t.search.value);
    return t.href ? t.href(m) : `${t.path.value}${m}`;
  }, v = (x, m) => {
    const y = o.value?.facets.find((A) => A.key === x);
    if (!y) return;
    const M = ka(s.value.expr, y, m(wa(s.value.expr, y)));
    w({ expr: M }, p());
  }, k = (x) => {
    const m = x === null ? null : Qe(n.value, x);
    return (m?.key ?? null) === s.value.entity ? {} : {
      entity: m?.key ?? null,
      view: _n(s.value.view, s.value.entity, m?.key ?? null, a.value),
      sort: Se(m, s.value.sort, n.value).key
    };
  }, P = (x) => {
    const m = k(x);
    Object.keys(m).length && w(m, d());
  };
  return {
    query: s,
    entity: o,
    focus: r,
    sort: l,
    sorts: c,
    summary: f(() => oo(s.value, o.value, n.value)),
    terms: f(() => dn(s.value, o.value, n.value)),
    isPristine: f(() => tn(s.value)),
    isEverything: f(() => s.value.entity === null),
    hasFacets: f(() => no(s.value.expr, o.value)),
    setEntity: P,
    entityHref: (x) => g(k(x)),
    clearEntity: () => P(null),
    setView(x, m) {
      w(m === void 0 ? { view: x } : { view: x, page: Math.max(1, Math.floor(m)) }, d());
    },
    setSort(x) {
      w({ sort: Se(o.value, x, n.value).key }, d());
    },
    toggleDirection() {
      w({ dir: s.value.dir === "desc" ? "asc" : "desc" }, d());
    },
    setExpression(x) {
      return w({ expr: x }, d());
    },
    narrow(x, m, y) {
      return w({ expr: x, ...k(m), ...y ? { view: y } : {} }, d());
    },
    narrowHref(x, m, y) {
      return g({ expr: x, ...k(m), ...y ? { view: y } : {} });
    },
    setPage(x, m) {
      w({ page: Math.max(1, Math.floor(x)) }, m ?? d());
    },
    setFacet(x, m) {
      v(x, () => m);
    },
    toggleChip(x, m) {
      v(x, (y) => y.kind !== "chips" ? y : { kind: "chips", selected: y.selected.includes(m) ? y.selected.filter((A) => A !== m) : [...y.selected, m] });
    },
    setRange(x, m, y) {
      v(x, (M) => M.kind === "range" ? { kind: "range", min: m, max: y } : M);
    },
    toggleFlag(x) {
      v(
        x,
        (m) => m.kind === "toggle" ? { kind: "toggle", on: !m.on } : m
      );
    },
    removeTerm(x) {
      if (x.facetKey === yt) {
        P(null);
        return;
      }
      if (x.facetKey === Je) {
        const m = Ps(re(s.value.expr), x.group ?? 0, x.index ?? 0);
        w({ expr: me(m) }, d());
      }
    },
    clearFilters() {
      w({ ...k(null), expr: "" }, d());
    },
    clearHref: () => g({ ...k(null), expr: "" }),
    reset() {
      i(ut(n.value, a.value), d());
    },
    homeHref: () => _(ut(n.value, a.value)),
    hrefFor(x) {
      const m = { ...s.value, ...x };
      return "entity" in x && !("view" in x) && (m.view = _n(s.value.view, s.value.entity, m.entity, a.value)), m.page = x.page ?? (It(x) ? 1 : s.value.page), _(m);
    }
  };
}
function lo(e) {
  const t = ke([]), n = B(0), a = B(!1), s = B(!1), o = ke(null);
  let r = 0, c = null, l = null;
  const i = f(() => (e.query.value.page - 1) * e.limit.value), d = f(() => is(n.value, e.limit.value)), p = () => {
    const y = e.query.value, M = e.within?.value.trim(), A = pa(e.entity.value, y.expr);
    return M ? { ...y, expr: sn(M, A) } : A === y.expr ? y : { ...y, expr: A };
  }, w = (y, M) => {
    t.value = y.rows, n.value = y.total, o.value = null, g(M);
  }, g = (y) => {
    c = { key: y, total: n.value }, s.value = !1;
  }, _ = (y) => {
    o.value = y, t.value = [], n.value = 0, c = null, s.value = !1;
  }, v = (y, M, A, Y) => {
    let H = !0;
    const U = () => y === r;
    let K = 0, ve = !1;
    const ue = (ne) => {
      K = ne, ve = !0, Y === void 0 && (n.value = ne);
    }, de = () => {
      H && (H = !1, t.value = [], ue(0)), o.value = null;
    };
    return {
      get open() {
        return U();
      },
      insert(ne, T) {
        if (!U()) return;
        const z = Array.isArray(ne) ? ne : [ne];
        if (!z.length) return;
        de();
        const O = [...t.value];
        O.splice(T ?? O.length, 0, ...z), t.value = M > 0 ? O.slice(0, M) : O, ue(K + z.length);
      },
      set(ne) {
        U() && (ne.rows && (de(), t.value = M > 0 ? ne.rows.slice(0, M) : ne.rows, ue(ne.rows.length)), ne.total !== void 0 && ue(ne.total));
      },
      close() {
        U() && (a.value = !1, ve && (n.value = K), g(A));
      },
      fail(ne) {
        U() && (_(ne), a.value = !1);
      }
    };
  }, k = () => {
    const y = l;
    l = null, y?.();
  }, P = () => {
    const y = ++r;
    k();
    const M = x.value, A = c?.key === M ? c.total : void 0;
    s.value = A === void 0;
    const Y = {
      query: p(),
      schema: e.schema.value,
      entity: e.entity.value,
      limit: e.limit.value,
      offset: i.value
    }, H = e.source.value;
    if (H.stream) {
      a.value = !0;
      try {
        l = H.stream(Y, v(y, Y.limit, M, A)) ?? null;
      } catch (K) {
        _(K), a.value = !1;
      }
      return;
    }
    let U;
    try {
      U = H.query(Y);
    } catch (K) {
      _(K);
      return;
    }
    if (!(U instanceof Promise)) {
      w(U, M), a.value = !1;
      return;
    }
    a.value = !0, U.then((K) => {
      y === r && w(K, M);
    }).catch((K) => {
      y === r && _(K);
    }).finally(() => {
      y === r && (a.value = !1);
    });
  }, x = f(() => {
    const y = p();
    return `${e.entity.value?.key ?? e.schema.value.entities[0]?.key ?? ""}|${JSON.stringify(nn.map((A) => y[A]))}`;
  }), m = f(() => `${x.value}|${e.query.value.page}`);
  return se([e.source, m, e.limit], P, {
    immediate: !0
  }), _t(() => {
    r++, k();
  }, !0), { rows: t, total: n, offset: i, pageCount: d, pending: a, counting: s, error: o, refresh: P };
}
const io = 150;
function co(e) {
  const t = e.delay ?? io, n = B(""), a = B("");
  let s = !1, o;
  const r = () => {
    clearTimeout(o), o = void 0;
  }, c = f(() => Ye(Ts(a.value), e.entity.value, e.schema?.value)), l = f(() => c.value.trim() !== ""), i = f(
    () => JSON.stringify([c.value, ...nn.map((g) => e.query.value[g])])
  ), d = ke(null), p = f(() => {
    const g = e.query.value;
    if (!l.value) return g;
    const _ = d.value?.of === i.value ? d.value.page : 1;
    return { ...g, expr: dt(g.expr, c.value), page: _ };
  });
  se(n, (g) => {
    if (r(), !g.trim()) {
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
  const w = (g) => {
    r(), s = !0, n.value = "", !g() && s && (s = !1, a.value = "");
  };
  return Dn() && _t(r), {
    text: n,
    live: p,
    drafting: l,
    setPage(g) {
      d.value = { of: i.value, page: Math.max(1, Math.floor(g)) };
    },
    commit() {
      const g = n.value.trim();
      if (!g) return;
      const _ = dt(
        e.query.value.expr,
        Ye(g, e.entity.value, e.schema?.value)
      );
      a.value = g, w(() => e.setExpression(_));
    },
    abandon() {
      r(), s = !1, n.value = "", a.value = "";
    },
    release: w
  };
}
const uo = 25, ba = (e, t) => e.toLowerCase() === t.toLowerCase();
function fo(e, t) {
  return e.find((n) => ba(n.id, t));
}
function vo(e) {
  const t = ke(/* @__PURE__ */ new Map()), n = /* @__PURE__ */ new Set(), a = (c) => {
    if (c.facetKey !== Je) return null;
    const l = ma(e.schema.value, c.field, c.value);
    return l ? { ...l, key: `${l.entity.key}:${l.id}` } : null;
  }, s = (c) => {
    const { entity: l, id: i } = c, d = e.query.value;
    return e.source.value.query({
      query: {
        ...d,
        entity: l.key,
        // The reference on its own. The rest of the query is about the rows on
        // screen, which are of another type entirely.
        expr: ca(l, i) ?? "",
        sort: Se(l, d.sort, e.schema.value).key,
        page: 1
      },
      schema: e.schema.value,
      entity: l,
      limit: uo,
      offset: 0
    });
  }, o = (c, l) => {
    const i = it(fe(c.columns ?? [], "identity"), l);
    return i === ge || ba(i, l.id) ? "" : i;
  }, r = () => {
    if (e.loading.value) return;
    const c = /* @__PURE__ */ new Map();
    for (const d of e.terms.value) {
      const p = a(d);
      p && !t.value.has(p.key) && !n.has(p.key) && c.set(p.key, p);
    }
    if (!c.size) return;
    const l = [...c.values()].map((d) => ({
      reference: d,
      outcome: s(d)
    })), i = (d) => {
      const p = new Map(t.value);
      d.forEach((w, g) => {
        const { reference: _ } = l[g], v = fo(w.rows, _.id);
        p.set(_.key, v ? o(_.entity, v) : "");
      }), t.value = p;
    };
    if (l.every(({ outcome: d }) => !(d instanceof Promise))) {
      i(l.map(({ outcome: d }) => d));
      return;
    }
    for (const { reference: d } of l) n.add(d.key);
    Promise.all(l.map(({ outcome: d }) => Promise.resolve(d))).then(i).catch(() => {
    }).finally(() => {
      for (const { reference: d } of l) n.delete(d.key);
    });
  };
  return se([e.source, e.schema, e.terms, e.loading], () => {
    try {
      r();
    } catch {
    }
  }, { immediate: !0 }), {
    names: t,
    nameOf(c) {
      const l = a(c);
      return l && t.value.get(l.key) || null;
    }
  };
}
const po = 4, ho = 8, mo = 180;
function yo(e, t, n, a = {}) {
  const s = a.gap ?? po, o = a.margin ?? ho, r = a.flipBelow ?? mo, c = a.side ?? "below", l = {
    below: n.height - e.bottom - s - o,
    above: e.top - s - o
  }, i = c === "below" ? "above" : "below", d = l[c] < r && l[i] > l[c] ? i : c, p = Math.min(a.maxHeight ?? 1 / 0, Math.max(0, l[d])), w = Math.max(0, n.width - o * 2), g = Math.min(a.minWidth ?? e.width, w), _ = Math.min(Math.max(t, g), w), v = a.align === "end" ? e.right - _ : e.left, k = Math.max(o, Math.min(v, n.width - _ - o));
  return d === "below" ? { side: d, left: k, top: e.bottom + s, maxHeight: p, minWidth: g, maxWidth: w } : { side: d, left: k, bottom: n.height - e.top + s, maxHeight: p, minWidth: g, maxWidth: w };
}
const go = ["data-dc-theme", "data-dc-side"], xe = [], _o = /* @__PURE__ */ q({
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
    const n = e, a = t, { theme: s, style: o, adopt: r } = un(n), c = B(null), l = B(null), i = { root: () => c.value };
    function d() {
      const m = n.anchor;
      m && (l.value = yo(
        m.getBoundingClientRect(),
        c.value?.offsetWidth ?? 0,
        { width: window.innerWidth, height: window.innerHeight },
        { side: n.side, align: n.align, maxHeight: n.maxHeight, minWidth: n.minWidth }
      ));
    }
    const p = f(() => {
      const m = l.value, y = m ? {
        position: "fixed",
        left: `${m.left}px`,
        ...m.top !== void 0 ? { top: `${m.top}px` } : {},
        ...m.bottom !== void 0 ? { bottom: `${m.bottom}px` } : {},
        minWidth: `${m.minWidth}px`,
        maxWidth: `${m.maxWidth}px`,
        maxHeight: `${m.maxHeight}px`,
        overflowY: "auto"
      } : { position: "fixed", visibility: "hidden" };
      return { ...o.value, ...y };
    });
    function w() {
      a("update:open", !1), a("close");
    }
    function g(m) {
      return c.value?.contains(m) || n.anchor?.contains(m) ? !0 : xe.slice(xe.indexOf(i) + 1).some((M) => M.root()?.contains(m));
    }
    function _(m) {
      const y = m.target;
      y && !g(y) && w();
    }
    function v(m) {
      m.key !== "Escape" || m.defaultPrevented || xe[xe.length - 1] === i && (m.preventDefault(), c.value?.contains(document.activeElement) && n.anchor?.focus(), w());
    }
    let k = null;
    async function P() {
      xe.includes(i) || (xe.push(i), r(), l.value = null, await ze(), d(), window.addEventListener("pointerdown", _, !0), document.addEventListener("keydown", v, !0), window.addEventListener("resize", d), window.addEventListener("scroll", d, !0), typeof ResizeObserver < "u" && c.value && (k = new ResizeObserver(() => d()), k.observe(c.value)));
    }
    function x() {
      const m = xe.indexOf(i);
      m !== -1 && (xe.splice(m, 1), window.removeEventListener("pointerdown", _, !0), document.removeEventListener("keydown", v, !0), window.removeEventListener("resize", d), window.removeEventListener("scroll", d, !0), k?.disconnect(), k = null);
    }
    return et(() => {
      n.open && P();
    }), se(
      () => n.open,
      (m) => {
        m ? P() : x();
      }
    ), se(() => n.anchor, () => {
      n.open && d();
    }), ye(x), (m, y) => e.open ? (u(), N(wt, {
      key: 0,
      to: e.to
    }, [
      $("div", Ft({
        ref_key: "root",
        ref: c
      }, m.$attrs, {
        class: "dc-shell dc-layer dc-popover",
        "data-dc-theme": b(s),
        "data-dc-side": l.value?.side,
        style: p.value
      }), [
        X(m.$slots, "default", {}, void 0, !0)
      ], 16, go)
    ], 8, ["to"])) : L("", !0);
  }
}), D = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [a, s] of t)
    n[a] = s;
  return n;
}, wo = /* @__PURE__ */ D(_o, [["__scopeId", "data-v-a688f2f7"]]), ko = ["href"], bo = /* @__PURE__ */ q({
  __name: "PressLink",
  props: {
    href: {}
  },
  emits: ["press"],
  setup(e, { emit: t }) {
    const n = e, a = t;
    function s(o) {
      if (n.href && va(o)) {
        o.stopPropagation();
        return;
      }
      o.preventDefault(), a("press", Tt(o), o);
    }
    return (o, r) => e.href ? (u(), h("a", {
      key: 0,
      href: e.href,
      class: "dc-press",
      onClick: s
    }, [
      X(o.$slots, "default", {}, void 0, !0)
    ], 8, ko)) : (u(), h("button", {
      key: 1,
      type: "button",
      class: "dc-press",
      onClick: s
    }, [
      X(o.$slots, "default", {}, void 0, !0)
    ]));
  }
}), ae = /* @__PURE__ */ D(bo, [["__scopeId", "data-v-a9383f64"]]), gt = (e) => e.toLowerCase().replace(/\s+/g, ""), $o = /(?:[^\s"]|"[^"]*"?)*$/, xo = /^(-?)([^:=<>"\s-][^:=<>"\s]*)([:=])(.*)$/, An = 4;
function So(e, t) {
  const n = gt(t);
  return e.find((a) => Xe(a) === n || gt(a.label) === n);
}
function Co(e) {
  switch (e.kind) {
    case "toggle":
      return e.text;
    case "range":
      return `${e.min}..${e.max}`;
    case "chips": {
      const t = e.options.slice(0, An).join(" · "), n = e.options.length - An;
      return n > 0 ? `${t} · +${n}` : t;
    }
  }
}
function Po(e) {
  switch (e.kind) {
    case "toggle":
      return [{ value: "true", hint: e.text }, { value: "false" }];
    case "chips":
      return e.options.map((t) => ({ value: t }));
    case "range":
      return [];
  }
}
function In(e, t) {
  return gt(e).includes(gt(t));
}
function Eo(e, t) {
  const n = $o.exec(e)?.[0] ?? "", a = e.slice(0, e.length - n.length), s = [], o = xo.exec(n);
  if (o) {
    const [, r, c, l, i] = o, d = So(t, c);
    if (!d) return [];
    const p = i.replace(/"/g, "").toLowerCase();
    for (const { value: w, hint: g } of Po(d)) {
      if (!w.toLowerCase().includes(p)) continue;
      const _ = we({
        kind: "field",
        field: Xe(d),
        comparator: l,
        value: w,
        ...r ? { negated: !0 } : {}
      });
      s.push({ draft: a + _, label: _, ...g ? { hint: g } : {}, complete: !0 });
    }
  } else {
    if (/[<>"]/.test(n)) return [];
    const r = n.startsWith("-") ? "-" : "", c = n.slice(r.length);
    for (const l of t) {
      if (c && !In(l.key, c) && !In(l.label, c)) continue;
      const i = `${r}${Xe(l)}:`;
      s.push({ draft: a + i, label: i, hint: Co(l), complete: !1 });
    }
  }
  return s.filter((r) => r.draft !== e);
}
const Mo = { class: "dc-header" }, Lo = { class: "dc-header__main" }, To = {
  class: "dc-header__brand",
  "aria-hidden": "true"
}, Oo = { class: "dc-header__sr" }, No = {
  key: 2,
  class: "dc-header__within"
}, Ao = ["title"], Io = { class: "dc-header__query" }, Ro = ["data-dc-more", "title"], Bo = { class: "dc-header__run" }, Ho = {
  key: 0,
  class: "dc-header__or dc-mono",
  "aria-hidden": "true"
}, Fo = ["title", "aria-label", "onClick"], qo = ["placeholder", "aria-expanded", "aria-activedescendant", "onKeydown"], Vo = ["id", "aria-selected", "onClick"], Do = { class: "dc-completion__term dc-mono" }, Ko = {
  key: 0,
  class: "dc-completion__hint"
}, Wo = {
  key: 0,
  class: "dc-header__actions"
}, zo = /* @__PURE__ */ q({
  __name: "ShellHeader",
  setup(e) {
    const t = kt(), n = te(), a = f(() => n.schema.value), s = f(() => {
      const C = n.within.value.trim();
      return C ? dn({ ...n.query.value, expr: C }, null) : [];
    }), o = f(() => {
      const C = n.entity.value, I = C?.keepsScope ? void 0 : C?.scope?.toLowerCase();
      return n.terms.value.filter((F) => F.facetKey !== yt).map((F, Q, Pe) => {
        const Be = Pe[Q - 1];
        return {
          term: F,
          or: Be?.group !== void 0 && F.group !== void 0 && F.group !== Be.group,
          idle: !!I && F.field?.toLowerCase() === I
        };
      });
    }), r = vo({
      source: n.source,
      schema: n.schema,
      query: n.query,
      loading: n.loading,
      // The scope's parts as well as the query's: it names a record more often
      // than a typed term does, being what a record's own page is built on.
      terms: f(() => [...s.value, ...n.terms.value])
    });
    function c(C) {
      const I = ha(a.value, C)?.scopeLabel ?? C;
      return I.charAt(0).toUpperCase() + I.slice(1);
    }
    function l(C) {
      return C.replace(/\s*\([^()]*\)\s*$/, "");
    }
    function i(C) {
      const I = r.nameOf(C);
      return I ? `${C.negated ? "-" : ""}${c(C.field)}: ${l(I)}` : C.label;
    }
    function d(C) {
      const I = i(C.term), F = C.idle ? `Not applied to ${n.entity.value?.label} — remove ${I}` : `Remove ${I}`, Q = C.term.address;
      return Q && Q !== I ? `${F}
Written ${Q} in the address and the search box` : F;
    }
    const p = B(null);
    function w(C) {
      p.value = C instanceof HTMLInputElement ? C : null;
    }
    function g() {
      n.abandonDraft(), p.value?.blur();
    }
    function _() {
      const C = P.value[k.value];
      if (x.value && C) {
        y(C);
        return;
      }
      Y.value = null, v.value = !1, n.commitDraft();
    }
    const v = B(!1), k = B(-1), P = f(() => {
      const C = n.entity.value?.facets ?? [];
      return C.length ? Eo(n.draft.value, C) : [];
    }), x = f(() => v.value && P.value.length > 0);
    se(P, () => {
      k.value = -1;
    });
    const m = `${bt() ?? "dc-header"}-completions`;
    function y(C) {
      n.draft.value = C.draft, v.value = !C.complete, k.value = -1, ze(() => {
        const I = p.value;
        I?.focus(), I?.setSelectionRange(C.draft.length, C.draft.length);
      });
    }
    function M(C, I) {
      if (C.isComposing || !P.value.length) return;
      if (C.preventDefault(), !v.value) {
        v.value = !0;
        return;
      }
      const F = P.value.length + 1;
      k.value = (k.value + 1 + I + F) % F - 1;
    }
    function A(C) {
      return `${m}-${C}`;
    }
    const Y = B(null), H = f(() => Math.min(Y.value ?? 1 / 0, o.value.length)), U = f(() => [
      { key: "before", entries: o.value.slice(0, H.value) },
      { key: "after", entries: o.value.slice(H.value) }
    ]), K = f(() => H.value < o.value.length);
    se(o, (C) => {
      Y.value !== null && Y.value >= C.length && (Y.value = null);
    });
    function ve(C, I) {
      Y.value = C >= o.value.length ? null : Math.max(0, C), ze(() => {
        const F = p.value;
        if (!F) return;
        const Q = I === "start" ? 0 : F.value.length;
        F.setSelectionRange(Q, Q), F.scrollIntoView({ block: "nearest", inline: "nearest" }), be();
      });
    }
    function ue(C) {
      const I = p.value;
      return !I || I.selectionStart !== I.selectionEnd ? !1 : I.selectionStart === (C === "start" ? 0 : I.value.length);
    }
    function de(C) {
      H.value === 0 || !ue("start") || (C.preventDefault(), ve(C.key === "Home" ? 0 : H.value - 1, "start"));
    }
    function ne(C) {
      !K.value || !ue("end") || (C.preventDefault(), ve(C.key === "End" ? o.value.length : H.value + 1, "end"));
    }
    function T(C) {
      H.value === 0 || !ue("start") || (C.preventDefault(), Z(o.value[H.value - 1].term, !0));
    }
    function z(C) {
      !K.value || !ue("end") || (C.preventDefault(), Z(o.value[H.value].term, !1));
    }
    function O(C) {
      C.isComposing || C.altKey || C.ctrlKey || C.metaKey || C.shiftKey || (C.key === "ArrowLeft" || C.key === "Home" ? de(C) : C.key === "ArrowRight" || C.key === "End" ? ne(C) : C.key === "Backspace" ? T(C) : C.key === "Delete" && z(C));
    }
    function Z(C, I) {
      I && Y.value !== null && (Y.value = Math.max(0, Y.value - 1)), n.removeTerm(C);
    }
    function Ae(C) {
      C.target?.closest("button, input") || (C.preventDefault(), p.value?.focus(), ve(o.value.length, "end"));
    }
    function Ie() {
      v.value = !1, n.draft.value || (Y.value = null);
    }
    const pe = B(null), Re = B("");
    function be() {
      const C = pe.value;
      if (!C) {
        Re.value = "";
        return;
      }
      const I = C.scrollLeft > 1, F = C.scrollWidth - C.clientWidth - C.scrollLeft > 1;
      Re.value = I && F ? "both" : I ? "start" : F ? "end" : "";
    }
    let _e = null;
    return se(
      pe,
      (C) => {
        _e?.disconnect(), _e = null, be(), !(!C || typeof ResizeObserver > "u") && (_e = new ResizeObserver(be), _e.observe(C));
      },
      { flush: "post" }
    ), se([o, H], be, { flush: "post" }), ye(() => _e?.disconnect()), (C, I) => (u(), h("div", Mo, [
      $("div", Lo, [
        a.value.label && t.brand ? (u(), N(ae, {
          key: 0,
          class: "dc-header__domain",
          "data-dc-brand": "",
          title: "Home",
          href: b(n).homeHref(),
          onPress: I[0] || (I[0] = (F) => b(n).reset())
        }, {
          default: G(() => [
            $("span", To, [
              X(C.$slots, "brand", {
                label: a.value.label
              }, void 0, !0)
            ]),
            $("span", Oo, E(a.value.label), 1)
          ]),
          _: 3
        }, 8, ["href"])) : a.value.label ? (u(), N(ae, {
          key: 1,
          class: "dc-header__domain",
          title: "Home",
          href: b(n).homeHref(),
          onPress: I[1] || (I[1] = (F) => b(n).reset())
        }, {
          default: G(() => [
            ee(E(a.value.label), 1)
          ]),
          _: 1
        }, 8, ["href"])) : L("", !0),
        X(C.$slots, "lead", {}, void 0, !0),
        s.value.length ? (u(), h("span", No, [
          I[10] || (I[10] = $("span", { class: "dc-header__sr" }, "Within", -1)),
          (u(!0), h(V, null, J(s.value, (F) => (u(), h("span", {
            key: `scope:${F.id}`,
            class: "dc-within dc-mono dc-truncate",
            title: i(F)
          }, E(i(F)), 9, Ao))), 128))
        ])) : L("", !0),
        $("div", Io, [
          $("div", {
            class: "dc-header__field",
            onMousedown: Ae
          }, [
            $("div", {
              ref_key: "termBar",
              ref: pe,
              class: "dc-header__terms",
              "data-dc-more": Re.value,
              title: b(n).summary.value,
              onScroll: be
            }, [
              (u(!0), h(V, null, J(U.value, (F) => (u(), h(V, {
                key: F.key
              }, [
                $("span", Bo, [
                  (u(!0), h(V, null, J(F.entries, (Q) => (u(), h(V, {
                    key: Q.term.id
                  }, [
                    Q.or ? (u(), h("span", Ho, "or")) : L("", !0),
                    $("button", {
                      type: "button",
                      class: le(["dc-term dc-mono", { "dc-term--idle": Q.idle }]),
                      title: d(Q),
                      "aria-label": `Remove ${i(Q.term)}`,
                      onMousedown: I[2] || (I[2] = Me(() => {
                      }, ["prevent"])),
                      onClick: (Pe) => Z(Q.term, F.key === "before")
                    }, E(i(Q.term)), 43, Fo)
                  ], 64))), 128))
                ]),
                F.key === "before" ? qt((u(), h("input", {
                  key: 0,
                  ref_for: !0,
                  ref: w,
                  "onUpdate:modelValue": I[3] || (I[3] = (Q) => b(n).draft.value = Q),
                  class: le(["dc-header__search dc-mono", { "dc-header__search--between": K.value }]),
                  style: oe({ "--dc-typed": String(Math.max(1, b(n).draft.value.length)) }),
                  type: "text",
                  autocomplete: "off",
                  spellcheck: "false",
                  placeholder: K.value ? "" : "Search…",
                  "aria-label": "Search",
                  role: "combobox",
                  "aria-autocomplete": "list",
                  "aria-expanded": x.value,
                  "aria-controls": m,
                  "aria-activedescendant": x.value && k.value >= 0 ? A(k.value) : void 0,
                  onKeydown: [
                    Fe(Me(_, ["prevent"]), ["enter"]),
                    Fe(Me(g, ["prevent"]), ["esc"]),
                    I[4] || (I[4] = Fe((Q) => M(Q, 1), ["down"])),
                    I[5] || (I[5] = Fe((Q) => M(Q, -1), ["up"])),
                    O
                  ],
                  onFocus: I[6] || (I[6] = (Q) => v.value = !0),
                  onInput: I[7] || (I[7] = (Q) => v.value = !0),
                  onBlur: Ie
                }, null, 46, qo)), [
                  [Fa, b(n).draft.value]
                ]) : L("", !0)
              ], 64))), 128))
            ], 40, Ro)
          ], 32)
        ])
      ]),
      W(wo, {
        id: m,
        open: x.value,
        anchor: p.value,
        "min-width": 0,
        "max-height": 320,
        class: "dc-completions",
        role: "listbox",
        "aria-label": "Completions",
        onClose: I[9] || (I[9] = (F) => v.value = !1)
      }, {
        default: G(() => [
          (u(!0), h(V, null, J(P.value, (F, Q) => (u(), h("div", {
            id: A(Q),
            key: F.label,
            class: le(["dc-completion", { "dc-completion--active": Q === k.value }]),
            role: "option",
            "aria-selected": Q === k.value,
            onMousedown: I[8] || (I[8] = Me(() => {
            }, ["prevent"])),
            onClick: (Pe) => y(F)
          }, [
            $("span", Do, E(F.label), 1),
            F.hint ? (u(), h("span", Ko, E(F.hint), 1)) : L("", !0)
          ], 42, Vo))), 128))
        ]),
        _: 1
      }, 8, ["open", "anchor"]),
      t.actions ? (u(), h("div", Wo, [
        X(C.$slots, "actions", {}, void 0, !0)
      ])) : L("", !0)
    ]));
  }
}), $a = /* @__PURE__ */ D(zo, [["__scopeId", "data-v-12391658"]]), jo = ["checked", "indeterminate"], xa = /* @__PURE__ */ q({
  __name: "PageTick",
  setup(e) {
    const t = te(), n = f(() => t.rows.value.filter((o) => t.isSelected(o)).length), a = f(
      () => t.rows.value.length > 0 && n.value === t.rows.value.length
    ), s = f(() => n.value > 0 && !a.value);
    return (o, r) => (u(), h("input", {
      class: "dc-tick",
      type: "checkbox",
      checked: a.value,
      indeterminate: s.value,
      "aria-label": "Select every row on this page",
      title: "Select every row on this page",
      onChange: r[0] || (r[0] = (c) => b(t).selectPage(!a.value))
    }, null, 40, jo));
  }
}), Uo = { class: "dc-pick" }, Qo = ["id"], Go = ["id", "aria-expanded", "aria-labelledby", "data-dc-value"], Yo = {
  key: 0,
  class: "dc-pick__icon",
  viewBox: "0 0 16 16",
  "aria-hidden": "true"
}, Xo = ["d"], Jo = { class: "dc-pick__label" }, Zo = /* @__PURE__ */ q({
  __name: "PickControl",
  props: {
    modelValue: {},
    options: {},
    label: {},
    mono: { type: Boolean }
  },
  emits: ["update:modelValue", "open", "close"],
  setup(e, { emit: t }) {
    const n = e, a = t, s = bt() ?? "dc-pick", o = B(null), r = B(null), c = B(null), l = B(!1), i = f(() => c.value !== null), d = B(null), p = f(
      () => n.options.find((y) => y.key === n.modelValue) ?? n.options[0]
    ), w = f(
      () => n.options.map((y) => ({
        id: y.key,
        label: y.label,
        icon: y.icon,
        checked: y.key === n.modelValue
      }))
    ), g = f(
      () => c.value ? { maxHeight: `${window.innerHeight - c.value.y - 8}px` } : void 0
    );
    function _(y) {
      const M = o.value?.getBoundingClientRect();
      M && (d.value = o.value?.closest(".dc-shell") ?? document.body, c.value = { x: M.left, y: M.bottom + 4, mirrorX: M.right }, l.value = y, a("open"));
    }
    function v(y) {
      c.value && a("close"), c.value = null, y && o.value?.focus();
    }
    function k() {
      i.value ? v(!0) : _(!1);
    }
    function P(y) {
      y.key !== "ArrowDown" && y.key !== "ArrowUp" || i.value || (y.preventDefault(), _(!0));
    }
    function x(y) {
      const M = y.target;
      M && (o.value?.contains(M) || r.value?.root?.contains(M) || v(!1));
    }
    se(i, (y) => {
      y ? window.addEventListener("pointerdown", x, !0) : window.removeEventListener("pointerdown", x, !0);
    }), ye(() => window.removeEventListener("pointerdown", x, !0));
    function m(y) {
      v(!0), !(y.id === void 0 || y.id === n.modelValue) && a("update:modelValue", y.id);
    }
    return (y, M) => (u(), h("span", Uo, [
      $("span", {
        id: `${b(s)}-name`,
        class: "dc-pick__name"
      }, E(e.label), 9, Qo),
      $("button", {
        id: `${b(s)}-value`,
        ref_key: "trigger",
        ref: o,
        type: "button",
        class: le(["dc-pick__button", { "dc-mono": e.mono }]),
        "aria-haspopup": "menu",
        "aria-expanded": i.value,
        "aria-labelledby": `${b(s)}-name ${b(s)}-value`,
        "data-dc-value": e.modelValue,
        onClick: k,
        onKeydown: P
      }, [
        p.value?.icon ? (u(), h("svg", Yo, [
          $("path", {
            d: p.value.icon
          }, null, 8, Xo)
        ])) : L("", !0),
        $("span", Jo, E(p.value?.label), 1)
      ], 42, Go),
      M[1] || (M[1] = $("svg", {
        class: "dc-pick__mark",
        viewBox: "0 0 16 16",
        "aria-hidden": "true"
      }, [
        $("path", { d: "M4 6l4 4 4-4" })
      ], -1)),
      c.value && d.value ? (u(), N(wt, {
        key: 0,
        to: d.value
      }, [
        W(b(ja), {
          ref_key: "menu",
          ref: r,
          class: "dc-pick__list",
          style: oe(g.value),
          items: w.value,
          at: c.value,
          label: e.label,
          autofocus: l.value,
          onChoose: m,
          onDismiss: M[0] || (M[0] = (A) => v(!0))
        }, null, 8, ["style", "items", "at", "label", "autofocus"])
      ], 8, ["to"])) : L("", !0)
    ]));
  }
}), Qt = /* @__PURE__ */ D(Zo, [["__scopeId", "data-v-7e5be459"]]), er = {
  class: "dc-pager",
  "aria-label": "Pages"
}, tr = ["title"], nr = ["value", "onKeydown"], ar = {
  class: "dc-pager__total",
  "aria-hidden": "true"
}, sr = {
  class: "dc-pager__sr",
  "aria-live": "polite"
}, or = /* @__PURE__ */ q({
  __name: "ShellPager",
  props: {
    pagesNote: {}
  },
  setup(e) {
    const t = e, n = te(), a = f(() => n.liveQuery.value.page), s = f(
      () => `${n.counting.value ? "~" : ""}${He(n.pageCount.value)}`
    ), o = f(() => {
      if (n.limit.value === 1) {
        const v = `Record ${He(a.value)} of ${s.value}`;
        return t.pagesNote ? `${v}
${t.pagesNote}` : v;
      }
      let g = `Page ${He(a.value)} of ${s.value}`;
      const _ = n.rows.value.length;
      if (_) {
        const v = n.offset.value + 1, k = `${n.counting.value ? "~" : ""}${He(n.total.value)}`;
        g += ` — rows ${He(v)} to ${He(v + _ - 1)} of ${k}`;
      }
      return t.pagesNote ? `${g}
${t.pagesNote}` : g;
    }), r = B(null), c = f(() => r.value ?? String(a.value)), l = f(
      () => `calc(${Math.max(2, String(n.pageCount.value).length)}ch + 10px)`
    );
    function i(g) {
      g.target.select();
    }
    function d(g) {
      const _ = g.target, v = _.value.replace(/[^0-9]/g, "");
      _.value !== v && (_.value = v), r.value = v;
    }
    function p(g) {
      const _ = g.target, v = Number(r.value);
      r.value = null;
      const k = Number.isFinite(v) && v >= 1 ? Math.min(Math.trunc(v), Math.max(1, n.pageCount.value)) : a.value;
      _.value = String(k), k !== a.value && n.setPage(k);
    }
    function w(g) {
      const _ = g.target;
      r.value = null, _.value = String(a.value), _.blur();
    }
    return (g, _) => (u(), h("nav", er, [
      W(ae, {
        class: "dc-pager__step",
        "aria-label": "Previous page",
        href: a.value > 1 ? b(n).hrefFor({ page: a.value - 1 }) : null,
        disabled: a.value <= 1,
        onPress: _[0] || (_[0] = (v) => b(n).setPage(a.value - 1))
      }, {
        default: G(() => [..._[2] || (_[2] = [
          $("span", { "aria-hidden": "true" }, "‹", -1)
        ])]),
        _: 1
      }, 8, ["href", "disabled"]),
      $("span", {
        class: "dc-pager__page dc-mono",
        title: o.value
      }, [
        $("input", {
          class: "dc-pager__box dc-mono",
          type: "text",
          inputmode: "numeric",
          autocomplete: "off",
          "aria-label": "Page",
          style: oe({ width: l.value }),
          value: c.value,
          onFocus: i,
          onInput: d,
          onKeydown: [
            Fe(Me(p, ["prevent"]), ["enter"]),
            Fe(Me(w, ["prevent"]), ["esc"])
          ],
          onBlur: p
        }, null, 44, nr),
        $("span", ar, "/ " + E(s.value), 1)
      ], 8, tr),
      $("span", sr, E(o.value), 1),
      W(ae, {
        class: "dc-pager__step",
        "aria-label": "Next page",
        href: a.value < b(n).pageCount.value ? b(n).hrefFor({ page: a.value + 1 }) : null,
        disabled: a.value >= b(n).pageCount.value,
        onPress: _[1] || (_[1] = (v) => b(n).setPage(a.value + 1))
      }, {
        default: G(() => [..._[3] || (_[3] = [
          $("span", { "aria-hidden": "true" }, "›", -1)
        ])]),
        _: 1
      }, 8, ["href", "disabled"])
    ]));
  }
}), rr = /* @__PURE__ */ D(or, [["__scopeId", "data-v-94fea4d7"]]), lr = {
  key: 0,
  class: "dc-actions__order"
}, ir = {
  key: 1,
  class: "dc-actions__select"
}, cr = {
  key: 0,
  class: "dc-actions__all"
}, ur = {
  class: "dc-actions__count",
  "aria-live": "polite"
}, dr = {
  key: 1,
  class: "dc-actions__count dc-actions__all",
  "aria-live": "polite"
}, fr = { class: "dc-actions__ops" }, vr = ["disabled"], pr = ["data-dc-operation", "disabled", "onClick"], hr = ["disabled"], mr = /* @__PURE__ */ q({
  __name: "RecordActions",
  props: {
    views: {},
    selectionPlacement: {},
    pagesNote: {}
  },
  setup(e) {
    const t = e, n = te(), a = f(() => qe(n.query.value.view, t.views)), s = f(
      () => (d.value || p.value) && a.value !== "table" && n.sorts.value.length > 0
    ), o = f(
      () => n.sorts.value.map((y) => ({ key: y.key, label: y.label }))
    ), r = f(() => s.value && o.value.length > 1), c = f(() => n.query.value.dir === "desc"), l = f(
      () => `Sorted by ${n.sort.value.label}, ${c.value ? "descending" : "ascending"}`
    ), i = f(() => n.entity.value), d = f(
      () => !Qn(n.query.value, t.views) && a.value !== "record"
    ), p = f(() => a.value === "record" && n.query.value.entity !== null), w = f(
      () => (d.value || p.value) && !n.loading.value && (n.pageCount.value > 1 || !!t.pagesNote)
    ), g = f(() => n.selection.value.ids.length), _ = f(
      () => d.value && n.selectable.value && (n.rows.value.length > 0 || g.value > 0)
    ), v = f(() => a.value === "table"), k = f(
      () => s.value || w.value || d.value && (_.value || !!(i.value?.create || i.value?.duplicate || i.value?.delete || i.value?.operations?.length))
    ), P = f(() => g.value ? `${g.value} selected` : v.value ? "" : "Select all"), x = f(() => t.selectionPlacement === "end");
    function m(y) {
      return g.value ? y.endsWith("…") ? `${y.slice(0, -1)} ${g.value}…` : `${y} ${g.value}` : y;
    }
    return (y, M) => k.value ? (u(), h("div", {
      key: 0,
      class: le(["dc-actions", { "dc-actions--selection-end": x.value }])
    }, [
      s.value ? (u(), h("span", lr, [
        r.value ? (u(), N(Qt, {
          key: 0,
          class: "dc-actions__pick dc-actions__sort",
          label: "Sort",
          "model-value": b(n).sort.value.key,
          options: o.value,
          "onUpdate:modelValue": b(n).setSort
        }, null, 8, ["model-value", "options", "onUpdate:modelValue"])) : L("", !0),
        W(ae, {
          class: "dc-actions__dir",
          "aria-label": l.value,
          title: l.value,
          href: b(n).hrefFor({ dir: c.value ? "asc" : "desc" }),
          onPress: M[0] || (M[0] = (A) => b(n).toggleDirection())
        }, {
          default: G(() => [
            ee(E(c.value ? "↓" : "↑"), 1)
          ]),
          _: 1
        }, 8, ["aria-label", "title", "href"])
      ])) : L("", !0),
      _.value && P.value ? (u(), h("div", ir, [
        v.value ? (u(), h("span", dr, E(P.value), 1)) : (u(), h("label", cr, [
          W(xa),
          $("span", ur, E(P.value), 1)
        ])),
        g.value ? (u(), h("button", {
          key: 2,
          type: "button",
          class: le(["dc-actions__clear", { "dc-actions__clear--op": x.value }]),
          onClick: M[1] || (M[1] = (A) => b(n).clearSelection())
        }, " Clear ", 2)) : L("", !0)
      ])) : L("", !0),
      $("div", fr, [
        i.value?.create ? (u(), N(ae, {
          key: 0,
          class: "dc-actions__op dc-actions__new",
          href: b(n).createHref?.(i.value),
          onPress: M[2] || (M[2] = (A) => b(n).create(i.value))
        }, {
          default: G(() => [
            M[5] || (M[5] = $("span", {
              class: "dc-actions__plus",
              "aria-hidden": "true"
            }, "+", -1)),
            ee(" " + E(i.value.create), 1)
          ]),
          _: 1
        }, 8, ["href"])) : L("", !0),
        i.value?.duplicate ? (u(), h("button", {
          key: 1,
          type: "button",
          class: "dc-actions__op",
          disabled: !g.value,
          onClick: M[3] || (M[3] = (A) => b(n).duplicate())
        }, E(m(i.value.duplicate)), 9, vr)) : L("", !0),
        (u(!0), h(V, null, J(i.value?.operations ?? [], (A) => (u(), h("button", {
          key: A.key,
          type: "button",
          class: "dc-actions__op",
          "data-dc-operation": A.key,
          disabled: !g.value && A.selection !== !1,
          onClick: (Y) => b(n).operate(A.key)
        }, E(A.selection === !1 ? A.label : m(A.label)), 9, pr))), 128)),
        i.value?.delete ? (u(), h("button", {
          key: 2,
          type: "button",
          class: "dc-actions__op dc-actions__danger",
          disabled: !g.value,
          onClick: M[4] || (M[4] = (A) => b(n).delete())
        }, E(m(i.value.delete)), 9, hr)) : L("", !0)
      ]),
      w.value ? (u(), N(rr, {
        key: 2,
        class: "dc-actions__pages",
        "pages-note": e.pagesNote
      }, null, 8, ["pages-note"])) : L("", !0)
    ], 2)) : L("", !0);
  }
}), Gt = /* @__PURE__ */ D(mr, [["__scopeId", "data-v-4921c240"]]);
function yr(e) {
  const t = ke(/* @__PURE__ */ new Map()), n = B(!0);
  let a = 0, s;
  const o = () => {
    a++, s?.abort(), s = void 0;
  }, r = () => {
    o();
    const c = a, { signal: l } = s = new AbortController(), i = e.query.value, d = e.schema.value, p = e.entities.value, w = e.within?.value.trim() ?? "";
    n.value = i.expr.trim() === "" && !w;
    const g = /* @__PURE__ */ new Map();
    let _ = !0;
    for (const v of p) {
      const k = pa(v, i.expr), P = w ? sn(w, k) : k;
      let x = !1;
      const m = (M) => {
        if (c !== a) return;
        if (_) {
          g.set(v.key, M);
          return;
        }
        const A = new Map(t.value);
        A.set(v.key, M), t.value = A;
      }, y = e.source.value.query({
        query: { ...i, entity: v.key, expr: P, page: 1 },
        schema: d,
        entity: v,
        limit: 0,
        offset: 0,
        signal: l,
        progress: (M) => {
          x || m({ total: M, pending: !0, counted: !0 });
        }
      });
      y instanceof Promise ? (g.has(v.key) || g.set(v.key, { total: 0, pending: !0, counted: !1 }), y.then((M) => {
        x = !0, m({ total: M.total, pending: !1, counted: !0 });
      })) : (x = !0, g.set(v.key, { total: y.total, pending: !1, counted: !0 }));
    }
    _ = !1, t.value = g;
  };
  return Dn() && _t(o), { counts: t, pristine: n, refresh: r, cancel: o };
}
const gr = {
  key: 0,
  class: "dc-choosers"
}, _r = "…", wr = /* @__PURE__ */ q({
  __name: "RecordChoosers",
  props: {
    views: {},
    typeChooser: {}
  },
  setup(e) {
    const t = e, n = te(), a = f(
      () => n.hasFacets.value || !!n.liveQuery.value.expr.trim() || !!n.within.value
    ), s = yr({
      source: n.source,
      schema: n.schema,
      // What each type holds of what is on screen, the draft's results included:
      // a count of the committed query would disagree with the rows under it.
      query: n.liveQuery,
      entities: n.entities,
      within: n.within
    });
    function o(g) {
      if (g.key === n.query.value.entity && a.value) return ct(n.total.value);
      if (s.pristine.value) return Kt(g);
      const v = s.counts.value.get(g.key);
      return v ? v.counted ? `${v.pending ? "~" : ""}${ct(v.total)}` : _r : Kt(g);
    }
    const r = f(() => [
      { key: "", label: "Everything" },
      ...n.entities.value.map((g) => ({
        key: g.key,
        label: `${g.label} · ${o(g)}`
      }))
    ]), c = f(
      () => t.typeChooser === "always" || n.query.value.entity !== null
    );
    function l(g) {
      n.setEntity(g || null);
    }
    const i = f(
      () => (t.views ?? [...en]).map((g) => ({
        key: g,
        label: g === "record" ? n.recordView.value?.label ?? wn.record : wn[g],
        icon: ss[g]
      }))
    ), d = f(() => qe(n.query.value.view, t.views)), p = f(() => i.value.length > 1);
    function w(g) {
      n.setView(g);
    }
    return (g, _) => c.value || p.value ? (u(), h("div", gr, [
      c.value ? (u(), N(Qt, {
        key: 0,
        class: "dc-actions__pick dc-actions__type",
        label: "Type",
        "model-value": b(n).query.value.entity ?? "",
        options: r.value,
        onOpen: b(s).refresh,
        onClose: b(s).cancel,
        "onUpdate:modelValue": l
      }, null, 8, ["model-value", "options", "onOpen", "onClose"])) : L("", !0),
      p.value ? (u(), N(Qt, {
        key: 1,
        class: "dc-actions__pick dc-actions__view",
        label: "View",
        "model-value": d.value,
        options: i.value,
        "onUpdate:modelValue": w
      }, null, 8, ["model-value", "options"])) : L("", !0)
    ])) : L("", !0);
  }
}), kr = /* @__PURE__ */ D(wr, [["__scopeId", "data-v-5a44a2f3"]]);
function br(e, t) {
  if (!e) return null;
  const n = ie(e, t);
  return typeof n == "string" && n.trim() ? n : null;
}
const $r = (e) => e == null || typeof e == "string" && !e.trim();
function xr(e, t) {
  const n = fe(t, "state"), a = fe(t, "tint");
  return {
    identity: it(fe(t, "identity"), e),
    reference: it(fe(t, "reference"), e),
    metrics: Gn(t, "metric").map((s) => ({
      column: s,
      label: s.label ?? "",
      text: Le(s, e)
    })),
    facts: t.filter((s) => s.cardLabel && !$r(ie(s, e))).map((s) => ({
      column: s,
      label: s.cardLabel,
      title: [s.label, s.hint].filter(Boolean).join(" — "),
      text: Le(s, e)
    })),
    state: n ? ie(n, e) ?? null : null,
    updated: it(fe(t, "updated"), e),
    image: br(fe(t, "image"), e),
    tint: a ? ie(a, e) ?? null : null
  };
}
function Sa(e, t, n, a, s = !1) {
  const o = n?.columns ?? [];
  return {
    row: e,
    key: ds(e, t),
    entityLabel: e.entityLabel,
    entity: n,
    columns: o,
    ordinal: Xa(t),
    parts: xr(e, o),
    pinned: a,
    selected: s
  };
}
function Oe() {
  const e = te(), t = f(
    () => new Map(e.entities.value.map((n) => [n.key, n]))
  );
  return f(
    () => e.rows.value.map(
      (n, a) => Sa(
        n,
        e.offset.value + a,
        t.value.get(n.entityKey) ?? null,
        e.isPinned(n),
        e.isSelected(n)
      )
    )
  );
}
const Sr = ["data-dc-status", "data-dc-tone"], Cr = /* @__PURE__ */ q({
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
    }, E(n.value), 9, Sr));
  }
}), at = /* @__PURE__ */ D(Cr, [["__scopeId", "data-v-686eb9b6"]]), Pr = { key: 1 }, Er = /* @__PURE__ */ q({
  __name: "MetricDrill",
  props: {
    entry: {},
    column: {}
  },
  setup(e) {
    const t = e, n = te(), a = f(() => !t.entry.entity?.scope || !t.column.drill ? null : n.entities.value.find((i) => i.key === t.column.drill) ?? null), s = f(() => t.column.label ?? ""), o = f(() => Le(t.column, t.entry.row)), r = f(() => a.value ? n.drillHref(t.entry.row, a.value) : null);
    function c(l, i) {
      i.stopPropagation(), a.value && n.drill(t.entry.row, a.value, l);
    }
    return (l, i) => a.value ? (u(), N(ae, {
      key: 0,
      class: "dc-drill",
      href: r.value,
      title: `${s.value} of ${e.entry.parts.identity} — show the ${a.value.label.toLowerCase()}`,
      onPress: c
    }, {
      default: G(() => [
        X(l.$slots, "default", {}, () => [
          ee(E(o.value), 1)
        ], !0)
      ]),
      _: 3
    }, 8, ["href", "title"])) : (u(), h("span", Pr, [
      X(l.$slots, "default", {}, () => [
        ee(E(o.value), 1)
      ], !0)
    ]));
  }
}), st = /* @__PURE__ */ D(Er, [["__scopeId", "data-v-d3e7f4e0"]]), Mr = ["data-dc-active", "aria-pressed", "aria-label"], Lr = /* @__PURE__ */ q({
  __name: "PinStar",
  props: {
    row: {},
    pinned: { type: Boolean },
    name: {}
  },
  setup(e) {
    const t = e, n = te();
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
    }, E(e.pinned ? "★" : "☆"), 9, Mr));
  }
}), fn = /* @__PURE__ */ D(Lr, [["__scopeId", "data-v-ef63d763"]]), Tr = ["src"], Or = /* @__PURE__ */ q({
  __name: "RowPicture",
  props: {
    src: {}
  },
  setup(e) {
    const t = e, n = B(!1);
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
    }, null, 40, Tr)) : L("", !0);
  }
}), Ot = /* @__PURE__ */ D(Or, [["__scopeId", "data-v-afaab300"]]), Nr = ["data-dc-standing", "title", "aria-label"], Ar = /* @__PURE__ */ q({
  __name: "QueryMark",
  props: {
    entry: {}
  },
  setup(e) {
    const t = e, n = te(), a = f(() => Mt(t.entry.entity, t.entry.row)), s = f(() => cn(n.query.value.expr, a.value)), o = f(
      () => s.value === "in" ? `The query narrows to ${t.entry.parts.identity} — press to lift that` : `The query leaves out ${t.entry.parts.identity} — press to lift that`
    );
    function r(c) {
      c.stopPropagation(), n.setExpression(fa(n.query.value.expr, a.value));
    }
    return (c, l) => s.value ? (u(), h("button", {
      key: 0,
      type: "button",
      class: "dc-standing",
      "data-dc-standing": s.value,
      title: o.value,
      "aria-label": o.value,
      onClick: r
    }, E(s.value === "in" ? "+" : "−"), 9, Nr)) : L("", !0);
  }
}), vn = /* @__PURE__ */ D(Ar, [["__scopeId", "data-v-4b8d4166"]]), Ir = ["aria-label"], Rr = ["data-dc-standing", "data-dc-active", "aria-checked", "title", "aria-label", "onClick"], Br = /* @__PURE__ */ q({
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
    ]), o = (c) => !n.mixed && n.standing === c;
    function r(c, l) {
      c.stopPropagation(), a("set", l);
    }
    return (c, l) => (u(), h("span", {
      class: "dc-standing-control",
      role: "radiogroup",
      "aria-label": `Where the query stands on ${e.name}`
    }, [
      (u(!0), h(V, null, J(s.value, (i) => (u(), h("button", {
        key: i.sign,
        type: "button",
        role: "radio",
        class: "dc-standing-control__choice",
        "data-dc-standing": i.standing ?? "none",
        "data-dc-active": o(i.standing) ? "true" : "false",
        "aria-checked": o(i.standing),
        title: i.hint,
        "aria-label": i.hint,
        onClick: (d) => r(d, i.standing)
      }, E(i.sign), 9, Rr))), 128))
    ], 8, Ir));
  }
}), Yt = /* @__PURE__ */ D(Br, [["__scopeId", "data-v-5524dca6"]]), Ca = /* @__PURE__ */ q({
  __name: "RowStanding",
  props: {
    entry: {}
  },
  setup(e) {
    const t = e, n = te(), a = f(() => Mt(t.entry.entity, t.entry.row)), s = f(() => cn(n.query.value.expr, a.value));
    function o(r) {
      n.setExpression(jt(n.query.value.expr, a.value, r));
    }
    return (r, c) => a.value !== null ? (u(), N(Yt, {
      key: 0,
      class: "dc-row-standing",
      standing: s.value,
      name: e.entry.parts.identity,
      onSet: o
    }, null, 8, ["standing", "name"])) : L("", !0);
  }
}), Hr = ["href", "title", "aria-label"], Fr = /* @__PURE__ */ q({
  __name: "OpenMark",
  props: {
    entry: {}
  },
  setup(e) {
    const t = e, n = te(), a = f(() => {
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
      onClick: o[0] || (o[0] = Me(() => {
      }, ["stop"]))
    }, "↗", 8, Hr)) : L("", !0);
  }
}), ot = /* @__PURE__ */ D(Fr, [["__scopeId", "data-v-b00f390d"]]), qr = /* @__PURE__ */ q({
  __name: "ScopeMark",
  props: {
    entry: {}
  },
  setup(e) {
    const t = e, n = te(), a = f(
      () => n.narrowsOnPress.value ? null : t.entry.entity?.scope ?? null
    ), s = B(null);
    function o(d) {
      s.value = Tt(d).exclude ? "out" : "in";
    }
    function r(d) {
      o(d), window.addEventListener("keydown", o), window.addEventListener("keyup", o);
    }
    function c() {
      s.value = null, window.removeEventListener("keydown", o), window.removeEventListener("keyup", o);
    }
    ye(c);
    const l = f(() => a.value ? n.drillHref(t.entry.row, null) : null);
    function i(d, p) {
      p.stopPropagation(), n.drill(t.entry.row, null, d);
    }
    return (d, p) => a.value ? (u(), N(ae, {
      key: 0,
      class: "dc-scope",
      href: l.value,
      "data-dc-pending": s.value ?? void 0,
      title: `Narrow everything to ${a.value}: ${e.entry.row.id} — ⌥-click to leave it out`,
      "aria-label": `Narrow everything to ${e.entry.parts.identity}`,
      onPointerenter: r,
      onPointermove: o,
      onPointerleave: c,
      onPress: i
    }, {
      default: G(() => [...p[0] || (p[0] = [
        ee(" → ", -1)
      ])]),
      _: 1
    }, 8, ["href", "data-dc-pending", "title", "aria-label"])) : L("", !0);
  }
}), rt = /* @__PURE__ */ D(qr, [["__scopeId", "data-v-05d2c233"]]), Vr = ["checked", "aria-label"], Ne = /* @__PURE__ */ q({
  __name: "SelectTick",
  props: {
    row: {},
    selected: { type: Boolean },
    name: {}
  },
  setup(e) {
    const t = e, n = te();
    function a(s) {
      s.stopPropagation(), n.toggleSelect(t.row);
    }
    return (s, o) => (u(), h("input", {
      class: "dc-tick",
      type: "checkbox",
      checked: e.selected,
      "aria-label": `Select ${e.name}`,
      onClick: a
    }, null, 8, Vr));
  }
}), Dr = { class: "dc-card__top dc-mono" }, Kr = { class: "dc-card__lead" }, Wr = {
  key: 2,
  class: "dc-card__entity"
}, zr = { class: "dc-card__top-right" }, jr = { class: "dc-card__names" }, Ur = { class: "dc-card__primary" }, Qr = {
  key: 0,
  class: "dc-card__secondary dc-mono"
}, Gr = {
  key: 1,
  class: "dc-card__facts dc-mono"
}, Yr = ["title"], Xr = { class: "dc-card__fact-label" }, Jr = {
  key: 0,
  class: "dc-card__metrics dc-mono"
}, Zr = {
  key: 0,
  class: "dc-card__date"
}, el = /* @__PURE__ */ q({
  __name: "CardsView",
  setup(e) {
    const t = te(), n = Oe(), a = f(() => t.isEverything.value), s = (r) => r.entity?.card === "picture", o = f(() => n.value.length > 0 && n.value.every(s));
    return (r, c) => (u(), h("div", {
      class: le(["dc-cards", { "dc-cards--pictures": o.value }])
    }, [
      (u(!0), h(V, null, J(b(n), (l) => (u(), h("div", {
        key: l.key,
        class: le(["dc-card", { "dc-card--picture": s(l) }])
      }, [
        $("div", Dr, [
          $("span", Kr, [
            b(t).selectable.value ? (u(), N(Ne, {
              key: 0,
              row: l.row,
              selected: l.selected,
              name: l.parts.identity
            }, null, 8, ["row", "selected", "name"])) : L("", !0),
            s(l) ? L("", !0) : (u(), h(V, { key: 1 }, [
              ee(E(l.ordinal), 1)
            ], 64)),
            a.value ? (u(), h("span", Wr, E(l.entityLabel), 1)) : L("", !0)
          ]),
          $("span", zr, [
            l.parts.state && !s(l) ? (u(), N(at, {
              key: 0,
              status: l.parts.state
            }, null, 8, ["status"])) : L("", !0),
            s(l) ? (u(), N(vn, {
              key: 1,
              entry: l
            }, null, 8, ["entry"])) : (u(), N(Ca, {
              key: 2,
              entry: l
            }, null, 8, ["entry"])),
            W(rt, { entry: l }, null, 8, ["entry"]),
            W(ot, { entry: l }, null, 8, ["entry"]),
            b(t).pinnable.value ? (u(), N(fn, {
              key: 3,
              row: l.row,
              name: l.parts.identity,
              pinned: l.pinned
            }, null, 8, ["row", "name", "pinned"])) : L("", !0)
          ])
        ]),
        W(ae, {
          class: "dc-card__open",
          href: b(t).pressHref(l.row),
          onPress: (i) => b(t).activate(l.row, i)
        }, {
          default: G(() => [
            l.parts.image ? (u(), N(Ot, {
              key: 0,
              class: "dc-card__image",
              src: l.parts.image
            }, null, 8, ["src"])) : L("", !0),
            $("span", jr, [
              $("span", Ur, E(l.parts.identity), 1),
              s(l) ? L("", !0) : (u(), h("span", Qr, E(l.parts.reference), 1)),
              l.parts.facts.length ? (u(), h("span", Gr, [
                (u(!0), h(V, null, J(l.parts.facts, (i) => (u(), h("span", {
                  key: i.column.key ?? i.label,
                  class: "dc-card__fact",
                  title: i.title || void 0
                }, [
                  $("span", Xr, E(i.label), 1),
                  ee(" " + E(i.text), 1)
                ], 8, Yr))), 128))
              ])) : L("", !0)
            ])
          ]),
          _: 2
        }, 1032, ["href", "onPress"]),
        s(l) ? L("", !0) : (u(), h("div", Jr, [
          (u(!0), h(V, null, J(l.parts.metrics.slice(0, 2), (i) => (u(), N(st, {
            key: i.column.key ?? i.label,
            entry: l,
            column: i.column
          }, {
            default: G(() => [
              ee(E(i.label) + " " + E(i.text), 1)
            ]),
            _: 2
          }, 1032, ["entry", "column"]))), 128)),
          l.parts.updated ? (u(), h("span", Zr, E(l.parts.updated), 1)) : L("", !0)
        ]))
      ], 2))), 128))
    ], 2));
  }
}), Pa = /* @__PURE__ */ D(el, [["__scopeId", "data-v-fd252138"]]), tl = { class: "dc-grid" }, nl = { class: "dc-tile__scrim" }, al = { class: "dc-tile__top dc-mono" }, sl = { class: "dc-tile__chip" }, ol = { class: "dc-tile__caption" }, rl = { class: "dc-tile__secondary dc-truncate" }, ll = { class: "dc-tile__primary" }, il = /* @__PURE__ */ q({
  __name: "GridView",
  setup(e) {
    const t = te(), n = Oe();
    return (a, s) => (u(), h("div", tl, [
      (u(!0), h(V, null, J(b(n), (o) => (u(), h("div", {
        key: o.key,
        class: "dc-grid__cell"
      }, [
        W(ae, {
          class: "dc-tile",
          style: oe({ "--dc-tile-tint": o.parts.tint ?? void 0 }),
          href: b(t).pressHref(o.row),
          onPress: (r) => b(t).activate(o.row, r)
        }, {
          default: G(() => [
            o.parts.image ? (u(), N(Ot, {
              key: 0,
              class: "dc-tile__image",
              src: o.parts.image
            }, null, 8, ["src"])) : L("", !0),
            $("span", nl, [
              $("span", al, [
                $("span", sl, E(o.ordinal), 1)
              ]),
              $("span", ol, [
                $("span", rl, E(o.parts.reference), 1),
                $("span", ll, E(o.parts.identity), 1)
              ])
            ])
          ]),
          _: 2
        }, 1032, ["style", "href", "onPress"]),
        b(t).selectable.value ? (u(), N(Ne, {
          key: 0,
          class: "dc-grid__tick",
          row: o.row,
          selected: o.selected,
          name: o.parts.identity
        }, null, 8, ["row", "selected", "name"])) : L("", !0)
      ]))), 128))
    ]));
  }
}), Ea = /* @__PURE__ */ D(il, [["__scopeId", "data-v-89c40a9e"]]);
function Rn(e, t, n, a) {
  return (n - a * (t - 1)) / e;
}
function Ht(e, t) {
  return e > 0 ? Math.min(t, e) : t;
}
function cl(e) {
  return e > 0 ? e : 1 / 0;
}
function ul(e, t, n) {
  const { width: a, height: s, gap: o = 0 } = n;
  if (!e.length) return [];
  if (!(a > 0) || !(s > 0)) return [{ items: [...e], height: s, filled: !1 }];
  const r = [];
  let c = [], l = 0, i = 0;
  for (const d of e) {
    const p = t(d), w = Math.max(p.ratio, Number.EPSILON), g = p.height && p.height > 0 ? Math.max(i, p.height) : i, _ = Ht(g, s), v = Rn(l + w, c.length + 1, a, o);
    if (v > _) {
      c.push(d), l += w, i = g;
      continue;
    }
    const k = Ht(i, s), P = c.length ? Rn(l, c.length, a, o) : 1 / 0;
    P <= cl(i) && P - k < _ - v ? (r.push({ items: c, height: P, filled: !0 }), c = [d], l = w, i = p.height && p.height > 0 ? p.height : 0) : (r.push({ items: [...c, d], height: v, filled: !0 }), c = [], l = 0, i = 0);
  }
  return c.length && r.push({ items: c, height: Ht(i, s), filled: !1 }), r;
}
const dl = { class: "dc-images" }, fl = {
  key: 1,
  class: "dc-images__blank",
  "aria-hidden": "true"
}, vl = 240, lt = 8, pl = 1, hl = /* @__PURE__ */ q({
  __name: "ImagesView",
  setup(e) {
    const t = te(), n = Oe(), a = hn(/* @__PURE__ */ new Map()), s = hn(/* @__PURE__ */ new Set());
    function o(_, v) {
      const k = v.target;
      k.naturalWidth > 0 && k.naturalHeight > 0 && a.set(_, { width: k.naturalWidth, height: k.naturalHeight });
    }
    function r(_) {
      const v = _.parts.image;
      return v && !s.has(v) ? v : null;
    }
    function c(_) {
      const v = r(_);
      return v ? a.get(v) : void 0;
    }
    function l(_) {
      const v = c(_);
      return v ? { ratio: v.width / v.height, height: v.height } : { ratio: pl };
    }
    const i = B(null), d = B(0);
    let p = null;
    function w() {
      d.value = i.value?.clientWidth ?? 0;
    }
    et(() => {
      w(), !(!i.value || typeof ResizeObserver > "u") && (p = new ResizeObserver(w), p.observe(i.value));
    }), ye(() => {
      p?.disconnect(), p = null;
    });
    const g = f(() => {
      const _ = ul(n.value, l, {
        width: d.value,
        height: vl,
        gap: lt
      }), v = [];
      let k = 0;
      for (const P of _) {
        let x = 0;
        for (const m of P.items) {
          const y = l(m).ratio * P.height, M = c(m), A = M !== void 0 && M.height < P.height;
          v.push({
            entry: m,
            style: {
              top: `${k}px`,
              left: `${x}px`,
              width: `${y}px`,
              height: `${P.height}px`
            },
            picture: A ? { width: `${M.width}px`, height: `${M.height}px` } : { width: "100%", height: "100%" }
          }), x += y + lt;
        }
        k += P.height + lt;
      }
      return { boxes: v, height: _.length ? k - lt : 0 };
    });
    return (_, v) => (u(), h("div", dl, [
      $("div", {
        ref_key: "wall",
        ref: i,
        class: "dc-images__wall",
        style: oe({ height: `${g.value.height}px` })
      }, [
        (u(!0), h(V, null, J(g.value.boxes, ({ entry: k, style: P, picture: x }) => (u(), h("div", {
          key: k.key,
          class: "dc-images__cell",
          style: oe(P)
        }, [
          W(ae, {
            class: "dc-images__open",
            title: k.parts.identity,
            "aria-label": k.parts.identity,
            href: b(t).pressHref(k.row),
            onPress: (m) => b(t).activate(k.row, m)
          }, {
            default: G(() => [
              r(k) ? (u(), N(Ot, {
                key: 0,
                class: "dc-images__picture",
                style: oe(x),
                src: r(k),
                onLoad: (m) => o(r(k), m),
                onError: (m) => s.add(r(k))
              }, null, 8, ["style", "src", "onLoad", "onError"])) : (u(), h("span", fl, E(k.parts.identity), 1))
            ]),
            _: 2
          }, 1032, ["title", "aria-label", "href", "onPress"]),
          b(t).selectable.value ? (u(), N(Ne, {
            key: 0,
            class: "dc-images__tick",
            row: k.row,
            selected: k.selected,
            name: k.parts.identity
          }, null, 8, ["row", "selected", "name"])) : L("", !0)
        ], 4))), 128))
      ], 4)
    ]));
  }
}), Ma = /* @__PURE__ */ D(hl, [["__scopeId", "data-v-2d267370"]]), ml = { class: "dc-links" }, yl = { class: "dc-link__primary dc-truncate" }, gl = { class: "dc-link__secondary dc-mono dc-truncate" }, _l = /* @__PURE__ */ q({
  __name: "LinksView",
  setup(e) {
    const t = te(), n = Oe();
    return (a, s) => (u(), h("div", ml, [
      (u(!0), h(V, null, J(b(n), (o) => (u(), h("span", {
        key: o.key,
        class: "dc-links__item"
      }, [
        b(t).selectable.value ? (u(), N(Ne, {
          key: 0,
          row: o.row,
          selected: o.selected,
          name: o.parts.identity
        }, null, 8, ["row", "selected", "name"])) : L("", !0),
        W(ae, {
          class: "dc-link",
          href: b(t).pressHref(o.row),
          onPress: (r) => b(t).activate(o.row, r)
        }, {
          default: G(() => [
            $("span", yl, E(o.parts.identity), 1),
            $("span", gl, E(o.parts.reference), 1)
          ]),
          _: 2
        }, 1032, ["href", "onPress"])
      ]))), 128))
    ]));
  }
}), La = /* @__PURE__ */ D(_l, [["__scopeId", "data-v-de6c9a0f"]]), wl = {
  class: "dc-list",
  role: "list"
}, kl = { class: "dc-list__ordinal dc-mono" }, bl = { class: "dc-list__identity" }, $l = { class: "dc-list__primary dc-truncate" }, xl = { class: "dc-list__secondary dc-mono dc-truncate" }, Sl = {
  key: 1,
  class: "dc-list__entity dc-mono"
}, Cl = { class: "dc-list__metrics dc-mono" }, Pl = { class: "dc-list__trailing" }, El = /* @__PURE__ */ q({
  __name: "ListView",
  setup(e) {
    const t = te(), n = Oe(), a = f(() => t.isEverything.value);
    return (s, o) => (u(), h("div", wl, [
      (u(!0), h(V, null, J(b(n), (r) => (u(), h("div", {
        key: r.key,
        class: "dc-list__row",
        role: "listitem"
      }, [
        b(t).selectable.value ? (u(), N(Ne, {
          key: 0,
          class: "dc-list__tick",
          row: r.row,
          selected: r.selected,
          name: r.parts.identity
        }, null, 8, ["row", "selected", "name"])) : L("", !0),
        W(Ca, {
          class: "dc-list__standing",
          entry: r
        }, null, 8, ["entry"]),
        W(ae, {
          class: "dc-list__open",
          href: b(t).pressHref(r.row),
          onPress: (c) => b(t).activate(r.row, c)
        }, {
          default: G(() => [
            $("span", kl, E(r.ordinal), 1),
            $("span", bl, [
              $("span", $l, E(r.parts.identity), 1),
              $("span", xl, E(r.parts.reference), 1)
            ])
          ]),
          _: 2
        }, 1032, ["href", "onPress"]),
        a.value ? (u(), h("span", Sl, E(r.entityLabel), 1)) : L("", !0),
        $("span", Cl, [
          (u(!0), h(V, null, J(r.parts.metrics.slice(0, 2), (c) => (u(), N(st, {
            key: c.column.key ?? c.label,
            entry: r,
            column: c.column
          }, null, 8, ["entry", "column"]))), 128))
        ]),
        $("span", Pl, [
          r.parts.state ? (u(), N(at, {
            key: 0,
            status: r.parts.state
          }, null, 8, ["status"])) : L("", !0),
          W(rt, { entry: r }, null, 8, ["entry"]),
          W(ot, { entry: r }, null, 8, ["entry"]),
          b(t).pinnable.value ? (u(), N(fn, {
            key: 1,
            row: r.row,
            name: r.parts.identity,
            pinned: r.pinned
          }, null, 8, ["row", "name", "pinned"])) : L("", !0)
        ])
      ]))), 128))
    ]));
  }
}), Xt = /* @__PURE__ */ D(El, [["__scopeId", "data-v-3d349a10"]]), Ml = { class: "dc-preview" }, Ll = { class: "dc-preview__pager dc-mono" }, Tl = ["disabled"], Ol = { "aria-live": "polite" }, Nl = ["disabled"], Al = {
  key: 0,
  class: "dc-preview__card"
}, Il = ["src"], Rl = { class: "dc-preview__body" }, Bl = { class: "dc-preview__top" }, Hl = { class: "dc-preview__badges" }, Fl = { class: "dc-preview__entity dc-mono" }, ql = { class: "dc-preview__marks" }, Vl = { class: "dc-preview__primary" }, Dl = { class: "dc-preview__secondary dc-mono" }, Kl = { class: "dc-preview__fields" }, Wl = { class: "dc-preview__key" }, zl = { class: "dc-preview__value dc-mono" }, jl = /* @__PURE__ */ q({
  __name: "PreviewView",
  setup(e) {
    const t = te(), n = Oe(), a = B(0);
    se(n, (l) => {
      a.value > l.length - 1 && (a.value = Math.max(0, l.length - 1));
    });
    const s = f(() => n.value[a.value]), o = f(() => {
      const l = s.value;
      if (!l) return [];
      const i = fe(l.columns, "reference"), d = fe(l.columns, "updated");
      return [
        ...i ? [{ key: i.label ?? "Reference", value: l.parts.reference, column: null }] : [],
        ...l.parts.metrics.map((p) => ({
          key: p.label,
          value: p.text,
          column: p.column
        })),
        ...d ? [{ key: d.label ?? "Updated", value: l.parts.updated, column: null }] : []
      ];
    }), r = f(() => {
      if (!n.value.length) return "0 / 0";
      const l = t.total.value > n.value.length ? ` of ${t.total.value}` : "";
      return `${a.value + 1} / ${n.value.length}${l}`;
    }), c = (l) => {
      const i = n.value.length;
      i && (a.value = Math.min(i - 1, Math.max(0, a.value + l)));
    };
    return (l, i) => (u(), h("div", Ml, [
      $("div", Ll, [
        $("button", {
          type: "button",
          class: "dc-preview__step",
          "aria-label": "Previous result",
          disabled: a.value === 0,
          onClick: i[0] || (i[0] = (d) => c(-1))
        }, " ‹ ", 8, Tl),
        $("span", Ol, E(r.value), 1),
        $("button", {
          type: "button",
          class: "dc-preview__step",
          "aria-label": "Next result",
          disabled: a.value >= b(n).length - 1,
          onClick: i[1] || (i[1] = (d) => c(1))
        }, " › ", 8, Nl)
      ]),
      s.value ? (u(), h("div", Al, [
        $("div", {
          class: "dc-preview__media",
          style: oe({ background: s.value.parts.tint ?? void 0 }),
          "aria-hidden": "true"
        }, [
          s.value.parts.image ? (u(), h("img", {
            key: 0,
            class: "dc-preview__image",
            src: s.value.parts.image,
            alt: ""
          }, null, 8, Il)) : (u(), h(V, { key: 1 }, [
            ee(" preview ")
          ], 64))
        ], 4),
        $("div", Rl, [
          $("div", Bl, [
            $("span", Hl, [
              b(t).selectable.value ? (u(), N(Ne, {
                key: 0,
                row: s.value.row,
                selected: s.value.selected,
                name: s.value.parts.identity
              }, null, 8, ["row", "selected", "name"])) : L("", !0),
              s.value.parts.state ? (u(), N(at, {
                key: 1,
                status: s.value.parts.state
              }, null, 8, ["status"])) : L("", !0),
              $("span", Fl, E(s.value.entityLabel), 1)
            ]),
            $("span", ql, [
              W(vn, { entry: s.value }, null, 8, ["entry"]),
              W(rt, { entry: s.value }, null, 8, ["entry"]),
              W(ot, { entry: s.value }, null, 8, ["entry"]),
              b(t).pinnable.value ? (u(), N(fn, {
                key: 0,
                row: s.value.row,
                name: s.value.parts.identity,
                pinned: s.value.pinned
              }, null, 8, ["row", "name", "pinned"])) : L("", !0)
            ])
          ]),
          $("div", null, [
            $("div", Vl, E(s.value.parts.identity), 1),
            $("div", Dl, E(s.value.parts.reference), 1)
          ]),
          $("dl", Kl, [
            (u(!0), h(V, null, J(o.value, (d) => (u(), h("div", {
              key: d.key,
              class: "dc-preview__field"
            }, [
              $("dt", Wl, E(d.key), 1),
              $("dd", zl, [
                d.column && s.value ? (u(), N(st, {
                  key: 0,
                  entry: s.value,
                  column: d.column
                }, null, 8, ["entry", "column"])) : (u(), h(V, { key: 1 }, [
                  ee(E(d.value), 1)
                ], 64))
              ])
            ]))), 128))
          ]),
          W(ae, {
            class: "dc-preview__open",
            href: s.value ? b(t).pressHref(s.value.row) : null,
            onPress: i[2] || (i[2] = (d) => s.value && b(t).activate(s.value.row, d))
          }, {
            default: G(() => [...i[3] || (i[3] = [
              ee(" Open record → ", -1)
            ])]),
            _: 1
          }, 8, ["href"])
        ])
      ])) : L("", !0)
    ]));
  }
}), Ta = /* @__PURE__ */ D(jl, [["__scopeId", "data-v-59e0d33b"]]);
function Ul() {
  const e = te();
  return f(() => cs(e.schema.value, e.entity.value));
}
const Ql = /* @__PURE__ */ q({
  __name: "CellNarrow",
  props: {
    entry: {},
    column: {},
    narrowings: {},
    truncates: { type: Boolean }
  },
  setup(e) {
    const t = e, n = te(), a = f(() => Le(t.column, t.entry.row));
    function s(i, d = !1) {
      return we({ ...i.term, ...d ? { negated: !0 } : {} });
    }
    function o(i, d = !1) {
      return dt(n.query.value.expr, s(i, d));
    }
    function r(i) {
      return n.narrowHref(o(i), n.query.value.entity);
    }
    function c(i) {
      return `Narrow to ${s(i)}
⌥-press to leave these out`;
    }
    function l(i, d, p) {
      p.stopPropagation(), n.narrow(o(i, d.exclude), n.query.value.entity);
    }
    return (i, d) => (u(), h("span", {
      class: le(["dc-cell__text", { "dc-truncate": e.truncates }])
    }, [
      (u(!0), h(V, null, J(e.narrowings, (p, w) => (u(), h(V, {
        key: s(p)
      }, [
        w > 0 ? (u(), h(V, { key: 0 }, [
          ee(", ")
        ], 64)) : L("", !0),
        W(ae, {
          class: "dc-narrow",
          href: r(p),
          title: c(p),
          onPress: (g, _) => l(p, g, _)
        }, {
          default: G(() => [
            ee(E(p.label ?? a.value), 1)
          ]),
          _: 2
        }, 1032, ["href", "title", "onPress"])
      ], 64))), 128))
    ], 2));
  }
}), Gl = /* @__PURE__ */ D(Ql, [["__scopeId", "data-v-4805a234"]]), Yl = /* @__PURE__ */ new Set(["ordinal", "status", "image", "component", "date"]), Xl = 4;
function Oa(e) {
  return (e.field ?? e.key)?.toLowerCase();
}
function Na(e) {
  return e.narrow === !1 || e.activate || e.click || e.drill ? !1 : !Yl.has(e.kind ?? "text") && Oa(e) !== void 0;
}
function Jl(e, t) {
  if (Number.isInteger(e)) return e;
  const n = 10 ** Xl;
  return (t ? Math.ceil(e * n - 1e-6) : Math.floor(e * n + 1e-6)) / n;
}
function Zl(e, t) {
  let n = 1 / 0, a = -1 / 0;
  for (const s of t) {
    const o = ie(e, s);
    typeof o != "number" || !Number.isFinite(o) || (o < n && (n = o), o > a && (a = o));
  }
  return n <= a ? { min: n, max: a } : null;
}
function ei(e, t, n, a = null) {
  if (!Na(e)) return [];
  const s = Oa(e);
  if (e.flags)
    return Object.entries(e.flags).filter(([l]) => t.fields[l] === !0).map(([l, i]) => ({
      label: i,
      term: { kind: "field", field: l.toLowerCase(), comparator: ":", value: "true" }
    }));
  const o = ie(e, t), r = n?.facets.find((l) => l.key.toLowerCase() === s);
  if (typeof o == "number") {
    if (!Number.isFinite(o)) return [];
    const l = r?.kind === "range" ? { min: r.min, max: r.max } : a, i = !l || o - l.min <= l.max - o;
    return [{
      label: null,
      term: { kind: "field", field: s, comparator: i ? "<=" : ">=", value: String(Jl(o, i)) }
    }];
  }
  return r?.kind !== "chips" ? [] : (Array.isArray(o) ? o : [o]).filter(
    (l) => typeof l == "string" && l !== ""
  ).map((l) => ({
    label: Array.isArray(o) ? l : null,
    term: { kind: "field", field: s, comparator: "=", value: l }
  }));
}
const Bn = /* @__PURE__ */ new WeakMap();
function ti(e, t) {
  let n = Bn.get(e);
  return n || Bn.set(e, n = /* @__PURE__ */ new Map()), n.has(t) || n.set(t, Zl(t, e)), n.get(t);
}
const ni = /* @__PURE__ */ q({
  __name: "ColumnCell",
  props: {
    column: {},
    entry: {}
  },
  setup(e) {
    const t = e, n = te(), a = f(() => t.column.kind ?? "text"), s = f(() => ie(t.column, t.entry.row)), o = f(
      () => a.value === "ordinal" ? t.entry.ordinal : Le(t.column, t.entry.row)
    ), r = f(() => s.value), c = f(() => t.column.activate === !0 || !!t.column.click), l = f(() => Wt(t.column)), i = f(() => Yn(t.column, t.entry.row)), d = f(() => {
      if (!Na(t.column)) return [];
      const _ = typeof s.value == "number" ? ti(n.rows.value, t.column) : null;
      return ei(t.column, t.entry.row, t.entry.entity ?? null, _);
    });
    function p(_) {
      c.value && (_.stopPropagation(), w(Tt(_)));
    }
    function w(_) {
      t.column.click?.(t.entry.row, _), t.column.activate && n.activate(t.entry.row, _);
    }
    const g = f(
      () => t.column.activate && !t.column.click ? n.pressHref(t.entry.row) : null
    );
    return (_, v) => a.value === "component" && e.column.component ? (u(), N(je(e.column.component), {
      key: 0,
      row: e.entry.row,
      entry: e.entry,
      value: s.value,
      column: e.column
    }, null, 8, ["row", "entry", "value", "column"])) : a.value === "status" ? (u(), N(at, {
      key: 1,
      status: r.value
    }, null, 8, ["status"])) : a.value === "image" ? (u(), N(Ot, {
      key: 2,
      class: "dc-cell__image",
      src: typeof s.value == "string" ? s.value : "",
      style: oe({ maxHeight: e.column.height }),
      onClick: p
    }, null, 8, ["src", "style"])) : e.column.drill ? (u(), N(st, {
      key: 3,
      entry: e.entry,
      column: e.column
    }, null, 8, ["entry", "column"])) : c.value ? (u(), N(ae, {
      key: 4,
      class: le(["dc-table__open", { "dc-truncate": l.value }]),
      href: g.value,
      title: i.value,
      onPress: v[0] || (v[0] = (k, P) => {
        P.stopPropagation(), w(k);
      })
    }, {
      default: G(() => [
        ee(E(o.value), 1)
      ]),
      _: 1
    }, 8, ["class", "href", "title"])) : d.value.length ? (u(), N(Gl, {
      key: 5,
      entry: e.entry,
      column: e.column,
      narrowings: d.value,
      truncates: l.value
    }, null, 8, ["entry", "column", "narrowings", "truncates"])) : (u(), h("span", {
      key: 6,
      class: le(["dc-cell__text", { "dc-truncate": l.value }])
    }, E(o.value), 3));
  }
}), Hn = /* @__PURE__ */ D(ni, [["__scopeId", "data-v-0db32eb9"]]), ai = {
  key: 0,
  class: "dc-table__none"
}, si = { class: "dc-table__detail" }, oi = ["data-dc-wrap", "data-dc-row-links"], ri = {
  key: 0,
  class: "dc-table__pick",
  scope: "col"
}, li = {
  key: 1,
  class: "dc-table__standing",
  scope: "col"
}, ii = ["data-dc-align", "data-dc-hide", "aria-sort", "title"], ci = {
  key: 2,
  class: "dc-table__head"
}, ui = ["onClick"], di = {
  key: 0,
  class: "dc-table__pick"
}, fi = {
  key: 1,
  class: "dc-table__standing"
}, vi = ["data-dc-align", "data-dc-hide", "title"], pi = {
  key: 1,
  class: "dc-table__name"
}, hi = /* @__PURE__ */ q({
  __name: "TableView",
  setup(e) {
    const t = te(), n = Oe(), a = Ul();
    function s(T, z) {
      const O = t.pressHref(T);
      if (O && va(z)) {
        const Z = z.shiftKey ? `noopener,popup,width=${window.outerWidth},height=${window.outerHeight}` : "noopener";
        window.open(O, "_blank", Z);
        return;
      }
      t.activate(T, Tt(z));
    }
    const o = f(() => t.rowLinks?.value ? new Map(n.value.map((T) => [T.key, t.pressHref(T.row)])) : /* @__PURE__ */ new Map()), r = f(
      () => a.value.find((T) => T.role === "identity") ?? a.value[0]
    );
    function c(T, z, O) {
      O.stopPropagation(), t.activate(T, z);
    }
    function l(T) {
      const z = ta(T, t.entity.value, t.schema.value), O = z ? `Shortcut: ${z}` : void 0;
      return [T.hint, O].filter(Boolean).join(`
`) || void 0;
    }
    const i = f(() => {
      const T = a.value.find((O) => O.scope);
      return T || ((t.entity.value ? !!t.entity.value.href : t.entities.value.some((O) => O.href)) ? a.value.find((O) => O.activate) : void 0);
    }), d = f(
      () => t.entity.value ? !!t.entity.value.scope : t.entities.value.some((T) => T.scope)
    ), p = (T) => Mt(T.entity, T.row), w = (T) => cn(t.query.value.expr, p(T));
    function g(T, z) {
      t.setExpression(jt(t.query.value.expr, p(T), z));
    }
    const _ = f(() => {
      const T = n.value.filter((O) => p(O) !== null), z = T.filter((O) => O.selected);
      return z.length ? z : T;
    }), v = f(() => _.value.some((T) => T.selected)), k = f(() => {
      const T = _.value[0];
      return T ? w(T) : null;
    }), P = f(
      () => _.value.some((T) => w(T) !== k.value)
    ), x = f(
      () => v.value ? "the ticked rows" : "every row on this page"
    );
    function m(T) {
      t.setExpression(
        _.value.reduce(
          (z, O) => jt(z, p(O), T),
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
    function A(T) {
      return T ? t.query.value.sort === T ? t.hrefFor({ dir: t.query.value.dir === "desc" ? "asc" : "desc" }) : t.hrefFor({ sort: T }) : null;
    }
    const Y = f(() => t.entity.value?.label ?? "The result set"), H = f(() => new Set(t.sorts.value.map((T) => T.key))), U = (T) => T.sort !== void 0 && H.value.has(T.sort), K = (T) => {
      if (U(T))
        return t.query.value.sort !== T.sort ? "none" : t.query.value.dir === "desc" ? "descending" : "ascending";
    };
    function ve(T) {
      return [
        $n(T),
        T.muted ? "dc-table__muted" : "",
        T.mono ? "dc-mono" : "",
        Wt(T) ? "dc-truncate" : ""
      ].filter(Boolean).join(" ");
    }
    function ue(T, z) {
      if (!(!Wt(T) || T.activate || T.click))
        return Yn(T, z.row);
    }
    const de = B(null);
    function ne(T) {
      de.value && (de.value.scrollLeft = T.target.scrollLeft);
    }
    return (T, z) => b(a).length ? (u(), h("table", {
      key: 1,
      class: "dc-table",
      "data-dc-wrap": y.value ? "" : void 0,
      "data-dc-row-links": b(t).rowLinks?.value ? "" : void 0
    }, [
      $("thead", {
        ref_key: "head",
        ref: de,
        "data-dc-stuck": ""
      }, [
        $("tr", null, [
          b(t).selectable.value ? (u(), h("th", ri, [
            W(xa)
          ])) : L("", !0),
          d.value ? (u(), h("th", li, [
            _.value.length ? (u(), N(Yt, {
              key: 0,
              standing: k.value,
              mixed: P.value,
              name: x.value,
              onSet: m
            }, null, 8, ["standing", "mixed", "name"])) : L("", !0)
          ])) : L("", !0),
          (u(!0), h(V, null, J(b(a), (O, Z) => (u(), h("th", {
            key: b(kn)(O, Z),
            scope: "col",
            class: le(b($n)(O)),
            style: oe({ width: O.width }),
            "data-dc-align": b(bn)(O),
            "data-dc-hide": O.hideBelow,
            "aria-sort": K(O),
            title: l(O)
          }, [
            U(O) ? (u(), N(ae, {
              key: 0,
              class: "dc-table__sort",
              href: A(O.sort),
              onPress: (Ae) => M(O.sort)
            }, {
              default: G(() => [
                ee(E(O.label), 1)
              ]),
              _: 2
            }, 1032, ["href", "onPress"])) : (u(), h(V, { key: 1 }, [
              ee(E(O.label), 1)
            ], 64)),
            O.header ? (u(), h("span", ci, [
              (u(), N(je(O.header), {
                column: O,
                entity: b(t).entity.value
              }, null, 8, ["column", "entity"]))
            ])) : L("", !0)
          ], 14, ii))), 128))
        ])
      ], 512),
      $("tbody", {
        "data-dc-scroll": "",
        onScroll: ne
      }, [
        (u(!0), h(V, null, J(b(n), (O) => (u(), h("tr", {
          key: O.key,
          class: "dc-table__row",
          onClick: (Z) => s(O.row, Z)
        }, [
          b(t).selectable.value ? (u(), h("td", di, [
            W(Ne, {
              row: O.row,
              selected: O.selected,
              name: O.parts.identity
            }, null, 8, ["row", "selected", "name"])
          ])) : L("", !0),
          d.value ? (u(), h("td", fi, [
            p(O) !== null ? (u(), N(Yt, {
              key: 0,
              standing: w(O),
              name: O.parts.identity,
              onSet: (Z) => g(O, Z)
            }, null, 8, ["standing", "name", "onSet"])) : L("", !0)
          ])) : L("", !0),
          (u(!0), h(V, null, J(b(a), (Z, Ae) => (u(), h("td", {
            key: b(kn)(Z, Ae),
            class: le(ve(Z)),
            style: oe({ width: Z.width }),
            "data-dc-align": b(bn)(Z),
            "data-dc-hide": Z.hideBelow,
            title: ue(Z, O)
          }, [
            o.value.get(O.key) ? (u(), N(ae, {
              key: 0,
              class: "dc-table__cell-link",
              href: o.value.get(O.key),
              tabindex: Z === r.value ? void 0 : -1,
              "aria-hidden": Z === r.value ? void 0 : "true",
              "aria-label": Z === r.value ? O.parts.identity : void 0,
              onPress: (Ie, pe) => c(O.row, Ie, pe)
            }, null, 8, ["href", "tabindex", "aria-hidden", "aria-label", "onPress"])) : L("", !0),
            Z === i.value ? (u(), h("span", pi, [
              W(Hn, {
                column: Z,
                entry: O
              }, null, 8, ["column", "entry"]),
              W(rt, { entry: O }, null, 8, ["entry"]),
              W(ot, { entry: O }, null, 8, ["entry"])
            ])) : (u(), N(Hn, {
              key: 2,
              column: Z,
              entry: O
            }, null, 8, ["column", "entry"]))
          ], 14, vi))), 128))
        ], 8, ui))), 128))
      ], 32)
    ], 8, oi)) : (u(), h("p", ai, [
      z[2] || (z[2] = $("span", { class: "dc-table__headline" }, "No columns declared", -1)),
      $("span", si, [
        ee(E(Y.value) + " has no ", 1),
        z[0] || (z[0] = $("code", null, "columns", -1)),
        z[1] || (z[1] = ee(" in the schema, so there is no table to draw. ", -1))
      ])
    ]));
  }
}), Aa = /* @__PURE__ */ D(hi, [["__scopeId", "data-v-66fa1713"]]);
function mi(e) {
  const t = ke([]), n = B(!1), a = ke(null);
  let s = 0;
  const o = (l, i, d, p, w) => ({
    entity: l,
    rows: e.limit.value > 0 ? i.rows.map((g, _) => Sa(g, _, l, e.isPinned(g.id))) : [],
    total: i.total,
    count: d ? Kt(l) : ct(i.total),
    pinned: yi(p, i, w)
  }), r = () => {
    const l = ++s, i = e.query.value, d = e.schema.value, p = e.entities.value, w = e.limit.value, g = e.within?.value.trim() ?? "", _ = tn(i) && !g, v = g ? sn(g, i.expr) : i.expr, k = p.map((P) => ({
      entity: P,
      // Scope the query to this entity, keeping the expression and ordering.
      outcome: e.source.value.query({
        // Each card is the top few of its type, wherever the shell's own
        // result set has been paged to — so this asks for the first page.
        query: { ...i, entity: P.key, expr: v, page: 1 },
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
    if (k.every(({ outcome: P }) => !(P instanceof Promise))) {
      t.value = k.map(
        ({ entity: P, outcome: x }) => o(P, x, _, d, v)
      ), a.value = null, n.value = !1;
      return;
    }
    n.value = !0, Promise.all(k.map(({ outcome: P }) => Promise.resolve(P))).then((P) => {
      l === s && (t.value = P.map(
        (x, m) => o(k[m].entity, x, _, d, v)
      ), a.value = null);
    }).catch((P) => {
      l === s && (a.value = P, t.value = []);
    }).finally(() => {
      l === s && (n.value = !1);
    });
  }, c = () => {
    try {
      r();
    } catch (l) {
      a.value = l, t.value = [], n.value = !1;
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
    c,
    { immediate: !0 }
  ), { previews: t, pending: n, error: a, refresh: c };
}
function yi(e, t, n) {
  const a = t.rows[0];
  if (t.total !== 1 || t.rows.length !== 1 || !a)
    return !1;
  const s = n.trim();
  if (!s)
    return !1;
  const o = ht(e, a);
  return !!o && nt(s, o) === s;
}
const gi = ["data-dc-pending", "data-dc-heads-only"], _i = {
  key: 0,
  class: "dc-types__state",
  role: "alert"
}, wi = {
  key: 1,
  class: "dc-types__state",
  "aria-live": "polite"
}, ki = {
  key: 2,
  class: "dc-types__state"
}, bi = ["data-dc-empty"], $i = { class: "dc-type__name" }, xi = { class: "dc-type__count dc-mono" }, Si = { class: "dc-type__sr" }, Ci = {
  key: 0,
  class: "dc-type__description"
}, Pi = {
  key: 0,
  class: "dc-type__empty"
}, Ei = { class: "dc-type__identity" }, Mi = { class: "dc-type__primary dc-truncate" }, Li = { class: "dc-type__secondary dc-mono dc-truncate" }, Ti = { class: "dc-type__trailing dc-mono" }, Oi = { class: "dc-type__metric-value" }, Ni = { class: "dc-type__metric-label" }, Ai = {
  key: 0,
  class: "dc-type__date"
}, Ii = /* @__PURE__ */ q({
  __name: "TypeCardsView",
  setup(e) {
    const t = te(), { previews: n, pending: a, error: s } = mi({
      source: t.source,
      schema: t.schema,
      // The query as the results are read under it, so a word being typed in the
      // header narrows the cards as it narrows any list — see `liveQuery`.
      query: t.liveQuery,
      entities: t.entities,
      limit: t.previewsPerType,
      within: t.within,
      isPinned: (l) => t.isPinnedId(l)
    }), o = f(
      () => !t.isPristine.value || !!t.within.value || t.drafting.value
    ), r = f(() => t.previewsPerType.value <= 0), c = f(
      () => n.value.filter(
        (l) => !l.pinned && (l.total > 0 || !r.value && l.entity.create)
      )
    );
    return (l, i) => (u(), h("div", {
      class: "dc-types",
      "data-dc-pending": b(a) ? "true" : "false",
      "data-dc-heads-only": r.value ? "true" : "false"
    }, [
      X(l.$slots, "before", {}, void 0, !0),
      b(s) ? (u(), h("p", _i, " Could not load results: " + E(b(s) instanceof Error ? b(s).message : "the data source failed."), 1)) : !c.value.length && b(a) ? (u(), h("p", wi, " Running query… ")) : c.value.length ? L("", !0) : (u(), h("p", ki, E(o.value ? "Nothing matches this query" : "Nothing here yet"), 1)),
      (u(!0), h(V, null, J(c.value, (d) => (u(), h("section", {
        key: d.entity.key,
        class: "dc-type",
        "data-dc-empty": d.total ? "false" : "true"
      }, [
        W(ae, {
          class: "dc-type__head",
          href: b(t).entityHref(d.entity.key),
          onPress: (p) => b(t).setEntity(d.entity.key)
        }, {
          default: G(() => [
            $("span", $i, E(d.entity.label), 1),
            $("span", xi, E(d.count), 1),
            i[0] || (i[0] = $("span", {
              class: "dc-type__go",
              "aria-hidden": "true"
            }, "→", -1)),
            $("span", Si, "Show only " + E(d.entity.label.toLowerCase()), 1),
            d.entity.description ? (u(), h("span", Ci, E(d.entity.description), 1)) : L("", !0)
          ]),
          _: 2
        }, 1032, ["href", "onPress"]),
        d.total ? L("", !0) : (u(), h("p", Pi, E(o.value ? "No matches" : "Nothing here yet"), 1)),
        (u(!0), h(V, null, J(d.rows, (p) => (u(), h("div", {
          key: p.key,
          class: "dc-type__row"
        }, [
          W(ae, {
            class: "dc-type__open",
            href: b(t).pressHref(p.row),
            onPress: (w) => b(t).activate(p.row, w)
          }, {
            default: G(() => [
              $("span", Ei, [
                $("span", Mi, E(p.parts.identity), 1),
                $("span", Li, E(p.parts.reference), 1)
              ])
            ]),
            _: 2
          }, 1032, ["href", "onPress"]),
          $("span", Ti, [
            (u(!0), h(V, null, J(p.parts.metrics.slice(0, 1), (w) => (u(), N(st, {
              key: w.column.key ?? w.label,
              class: "dc-type__metric",
              entry: p,
              column: w.column
            }, {
              default: G(() => [
                $("span", Oi, E(w.text), 1),
                $("span", Ni, E(w.label), 1)
              ]),
              _: 2
            }, 1032, ["entry", "column"]))), 128)),
            p.parts.updated ? (u(), h("span", Ai, E(p.parts.updated), 1)) : L("", !0),
            W(vn, { entry: p }, null, 8, ["entry"]),
            W(rt, { entry: p }, null, 8, ["entry"]),
            W(ot, { entry: p }, null, 8, ["entry"])
          ])
        ]))), 128)),
        d.entity.create && !r.value ? (u(), N(ae, {
          key: 1,
          class: "dc-type__new",
          href: b(t).createHref?.(d.entity),
          onPress: (p) => b(t).create(d.entity)
        }, {
          default: G(() => [
            i[1] || (i[1] = $("span", {
              class: "dc-type__plus",
              "aria-hidden": "true"
            }, "+", -1)),
            ee(" " + E(d.entity.create), 1)
          ]),
          _: 2
        }, 1032, ["href", "onPress"])) : L("", !0)
      ], 8, bi))), 128)),
      X(l.$slots, "after", {}, void 0, !0)
    ], 8, gi));
  }
}), Ia = /* @__PURE__ */ D(Ii, [["__scopeId", "data-v-d73c6777"]]), Ri = ["data-dc-pending", "data-dc-more"], Bi = {
  key: 0,
  class: "dc-results__state dc-results__state--loading",
  "aria-live": "polite"
}, Hi = {
  key: 3,
  class: "dc-results__state",
  role: "alert"
}, Fi = { class: "dc-results__detail" }, qi = {
  key: 4,
  class: "dc-results__state",
  "aria-live": "polite"
}, Vi = {
  key: 5,
  class: "dc-results__state"
}, Di = { class: "dc-results__detail" }, Ki = /* @__PURE__ */ q({
  __name: "ResultsArea",
  props: {
    views: {},
    loading: { type: Boolean }
  },
  setup(e) {
    const t = e, n = te(), a = kt(), s = {
      list: Xt,
      cards: Pa,
      grid: Ea,
      images: Ma,
      table: Aa,
      links: La,
      preview: Ta
    }, o = f(() => Qn(n.query.value, t.views)), r = f(() => qe(n.query.value.view, t.views)), c = f(() => (r.value === "record" ? null : s[r.value]) ?? Xt), l = f(() => r.value === "record" ? n.recordView.value : null), i = f(() => n.rows.value.length > 0), d = f(() => n.error.value !== null), p = B(null);
    function w(m) {
      return m.querySelector("[data-dc-scroll]") ?? m;
    }
    se(
      // The page on screen, which is the draft's own while one is being typed.
      () => n.liveQuery.value.page,
      () => {
        p.value && (w(p.value).scrollTop = 0);
      }
    );
    const g = B(""), _ = B({ x: 0, y: 0 }), v = B(0);
    function k() {
      const m = p.value;
      if (!m) {
        g.value = "";
        return;
      }
      const y = w(m), M = {
        top: y.scrollTop > 1,
        right: y.scrollWidth - y.clientWidth - y.scrollLeft > 1,
        bottom: y.scrollHeight - y.clientHeight - y.scrollTop > 1,
        left: y.scrollLeft > 1
      };
      g.value = Object.entries(M).filter(([, A]) => A).map(([A]) => A).join(" "), _.value = {
        x: y.offsetHeight - y.clientHeight,
        y: y.offsetWidth - y.clientWidth
      }, v.value = m.querySelector("[data-dc-stuck]")?.offsetHeight ?? 0;
    }
    let P = null, x = null;
    return se(
      p,
      (m, y) => {
        if (y?.removeEventListener("scroll", k, { capture: !0 }), P?.disconnect(), x?.disconnect(), P = null, x = null, k(), !m || (m.addEventListener("scroll", k, { passive: !0, capture: !0 }), typeof ResizeObserver > "u")) return;
        const M = new ResizeObserver(k), A = typeof MutationObserver > "u" ? null : new MutationObserver(() => {
          Y(), k();
        }), Y = () => {
          M.disconnect(), A?.disconnect();
          for (const H of /* @__PURE__ */ new Set([m, w(m)])) {
            M.observe(H);
            for (const U of H.children) M.observe(U);
            A?.observe(H, { childList: !0 });
          }
        };
        Y(), P = M, x = A;
      },
      { flush: "post" }
    ), ye(() => {
      p.value?.removeEventListener("scroll", k, { capture: !0 }), P?.disconnect(), x?.disconnect();
    }), (m, y) => (u(), h("div", {
      ref_key: "scroller",
      ref: p,
      class: "dc-results",
      "data-dc-pending": b(n).pending.value ? "true" : "false",
      "data-dc-more": g.value,
      style: oe({
        "--dc-results-gutter-x": `${_.value.x}px`,
        "--dc-results-gutter-y": `${_.value.y}px`,
        "--dc-results-stuck": `${v.value}px`
      })
    }, [
      e.loading ? (u(), h("p", Bi, [...y[1] || (y[1] = [
        $("span", { class: "dc-results__detail" }, "Loading…", -1)
      ])])) : o.value ? (u(), N(Ia, { key: 1 }, Vt({ _: 2 }, [
        a["cards-before"] ? {
          name: "before",
          fn: G(() => [
            X(m.$slots, "cards-before", {}, void 0, !0)
          ]),
          key: "0"
        } : void 0,
        a["cards-after"] ? {
          name: "after",
          fn: G(() => [
            X(m.$slots, "cards-after", {}, void 0, !0)
          ]),
          key: "1"
        } : void 0
      ]), 1024)) : l.value?.id ? (u(), N(je(l.value.component), {
        key: 2,
        id: l.value.id
      }, null, 8, ["id"])) : d.value ? (u(), h("p", Hi, [
        y[2] || (y[2] = $("span", { class: "dc-results__headline" }, "Could not load results", -1)),
        $("span", Fi, E(b(n).error.value instanceof Error ? b(n).error.value.message : "The data source failed."), 1)
      ])) : !i.value && b(n).pending.value ? (u(), h("p", qi, [...y[3] || (y[3] = [
        $("span", { class: "dc-results__detail" }, "Running query…", -1)
      ])])) : i.value ? (u(), N(je(c.value), { key: 6 })) : (u(), h("div", Vi, [
        y[4] || (y[4] = $("span", { class: "dc-results__headline" }, "Nothing matches this query", -1)),
        $("span", Di, E(b(n).summary.value), 1),
        b(n).isPristine.value ? L("", !0) : (u(), N(ae, {
          key: 0,
          class: "dc-results__clear",
          href: b(n).clearHref(),
          onPress: y[0] || (y[0] = (M) => b(n).clearFilters())
        }, {
          default: G(() => [
            ee(E(b(n).isEverything.value ? "Clear filters" : "Search everything instead"), 1)
          ]),
          _: 1
        }, 8, ["href"]))
      ]))
    ], 12, Ri));
  }
}), Ra = /* @__PURE__ */ D(Ki, [["__scopeId", "data-v-4484c328"]]), Wi = ["data-dc-theme"], zi = {
  key: 0,
  class: "dc-shell__page"
}, ji = /* @__PURE__ */ q({
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
  emits: /* @__PURE__ */ yn(["activate", "create", "duplicate", "delete", "operate", "drill", "query-change", "toggle-pin"], ["update:pinned", "update:selected"]),
  setup(e, { expose: t, emit: n }) {
    const a = e, s = n, o = mn(e, "pinned"), r = mn(e, "selected"), c = kt(), l = Jt(Kn, null), i = a.route || l ? null : Ua(), d = a.route ?? l ?? i;
    ye(() => i?.dispose?.());
    const p = B(!!c.page);
    qa(() => {
      p.value = !!c.page;
    });
    const w = Qa(d, {
      detached: () => p.value && a.pageQuery === "detached",
      path: () => a.listPath
    }), g = f(() => qs({ seed: a.schema.key })), _ = f(() => a.source ?? g.value), v = ro({
      schema: () => a.schema,
      adapter: w,
      defaults: () => a.defaults,
      navigationMode: () => a.navigationMode,
      facetNavigationMode: () => a.facetNavigationMode
    }), k = f(() => a.within?.trim() ?? ""), P = co({
      query: v.query,
      entity: v.entity,
      schema: f(() => a.schema),
      setExpression: v.setExpression
    });
    se(v.query, (S) => s("query-change", S));
    const x = f(() => Qs(a.schema, [v.query.value.expr])), m = f(
      () => x.value.flatMap((S) => {
        const R = a.schema.entities.find((j) => j.key === S.entityKey);
        return R ? [{ ...S, entity: R }] : [];
      })
    );
    function y() {
      if (c.record) return m.value;
      const S = a.recordCards;
      return S ? m.value.filter((R) => S[R.entityKey]) : [];
    }
    const M = f(() => {
      const [S, ...R] = m.value;
      if (!S || R.length || v.entity.value !== null) return null;
      const j = a.recordViews?.[S.entityKey];
      return j ? { ...j, id: S.id } : null;
    }), A = f(() => {
      const S = v.entity.value?.key;
      return S && a.recordViews?.[S] || null;
    }), Y = f(() => {
      const S = a.views, R = typeof S == "function" ? S({ entity: v.entity.value, records: x.value }) : S;
      return M.value || A.value ? [...(R ?? en).filter((j) => j !== "record"), "record"] : R?.filter((j) => j !== "record");
    }), H = f(
      () => A.value !== null && qe(v.query.value.view, Y.value) === "record"
    ), U = f(() => H.value ? 1 : a.limit), K = lo({
      source: _,
      query: P.live,
      schema: f(() => a.schema),
      entity: v.entity,
      limit: U,
      within: k
    }), ve = f(() => {
      if (M.value) return M.value;
      const S = A.value;
      return S ? { ...S, id: K.rows.value[0]?.id ?? null } : null;
    });
    function ue(S) {
      const R = A.value !== null && qe(S, Y.value) === "record";
      if (R === H.value) {
        v.setView(S);
        return;
      }
      const j = P.live.value.page, $e = R ? (j - 1) * a.limit + 1 : Math.ceil(j / a.limit);
      P.drafting.value ? (v.setView(S), P.setPage($e)) : v.setView(S, $e);
    }
    function de(S) {
      if (!A.value || H.value) return null;
      const R = K.rows.value.indexOf(S);
      return R === -1 ? null : K.offset.value + R + 1;
    }
    se(
      [K.pageCount, K.pending, v.query, P.drafting, () => a.loading, p],
      () => {
        if (K.pending.value || P.drafting.value || a.loading || p.value) return;
        const S = K.pageCount.value;
        v.query.value.page > S && v.setPage(S, "replace");
      },
      // Immediately, since a pasted URL is past the end before anything changes;
      // and after the render, so the correction is a navigation the mounted shell
      // makes rather than one it makes on the way up. An async source is still
      // pending here and corrects itself when its count lands.
      { immediate: !0, flush: "post" }
    );
    const ne = f(() => new Set(o.value));
    function T(S) {
      const R = new Set(ne.value);
      R.has(S.id) ? R.delete(S.id) : R.add(S.id), o.value = [...R], s("toggle-pin", S);
    }
    const z = f(() => {
      if (a.selectable === !0) return !0;
      const S = v.entity.value;
      return !!(S?.duplicate || S?.delete || S?.operations?.some((R) => R.selection !== !1));
    }), O = f(() => new Set(r.value));
    function Z(S) {
      const R = new Set(O.value);
      R.has(S.id) ? R.delete(S.id) : R.add(S.id), r.value = [...R];
    }
    function Ae(S) {
      const R = new Set(O.value);
      for (const j of K.rows.value)
        S ? R.add(j.id) : R.delete(j.id);
      r.value = [...R];
    }
    function Ie() {
      r.value.length && (r.value = []);
    }
    const pe = f(() => ({
      ids: [...r.value],
      rows: K.rows.value.filter((S) => O.value.has(S.id)),
      entity: v.entity.value
    }));
    se(() => v.query.value.entity, Ie);
    function Re(S, R, j = {}) {
      const $e = Bt(a.schema, v.query.value, S, j);
      j.exclude ? v.narrow($e, R?.key ?? v.query.value.entity) : P.release(() => v.narrow($e, R?.key ?? null, R ? void 0 : "cards")), s("drill", S, R, j);
    }
    function be(S) {
      return a.rowPress === "narrow" && ht(a.schema, S) !== null;
    }
    function _e(S) {
      return a.schema.entities.find((j) => j.key === S.entityKey)?.href?.(S) || null;
    }
    const C = Gs({
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
      setPage: (S, R) => {
        P.drafting.value ? P.setPage(S) : v.setPage(S, R);
      },
      setView: ue,
      schema: f(() => a.schema),
      entities: f(() => a.schema.entities),
      rows: K.rows,
      total: K.total,
      limit: U,
      offset: K.offset,
      pageCount: K.pageCount,
      pending: K.pending,
      counting: K.counting,
      error: K.error,
      source: _,
      previewsPerType: f(() => a.previewsPerType),
      within: k,
      loading: f(() => a.loading),
      recordView: ve,
      pinnable: f(() => a.pinnable === !0),
      isPinned: (S) => ne.value.has(S.id),
      isPinnedId: (S) => ne.value.has(S),
      togglePin: T,
      selectable: z,
      selection: pe,
      isSelected: (S) => O.value.has(S.id),
      toggleSelect: Z,
      selectPage: Ae,
      clearSelection: Ie,
      narrowsOnPress: f(() => a.rowPress === "narrow"),
      rowLinks: f(() => a.rowLinks),
      /*
       * The one place a press is read, so every view gets the same answer without
       * knowing which of the two it is: they all call this.
       */
      activate: (S, R = {}) => {
        if (be(S)) {
          Re(S, null, R);
          return;
        }
        const j = de(S);
        if (j !== null) {
          P.drafting.value ? (v.setView("record"), P.setPage(j)) : v.setView("record", j);
          return;
        }
        const $e = _e(S);
        if ($e) {
          window.open($e, "_blank", "noopener");
          return;
        }
        s("activate", S);
      },
      pressHref: (S) => {
        if (be(S)) return v.narrowHref(Bt(a.schema, v.query.value, S), null, "cards");
        const R = de(S);
        return R !== null ? v.hrefFor({ view: "record", page: R }) : _e(S) ?? a.activateHref?.(S) ?? null;
      },
      recordHref: _e,
      drillHref: (S, R) => ht(a.schema, S) ? v.narrowHref(
        Bt(a.schema, v.query.value, S),
        R?.key ?? null,
        R ? void 0 : "cards"
      ) : null,
      create: (S) => s("create", S),
      createHref: (S) => a.createHref?.(S) ?? null,
      duplicate: () => s("duplicate", pe.value),
      delete: () => s("delete", pe.value),
      operate: (S) => s("operate", S, pe.value),
      drill: Re
    });
    Js({ theme: () => a.theme, accent: () => a.accent, tokens: () => a.tokens });
    const I = f(() => {
      if (!(!a.accent && !a.tokens))
        return { ...a.tokens, ...a.accent ? { "--dc-accent": a.accent } : {} };
    }), F = B(null), Q = B(0);
    let Pe = null;
    et(() => {
      const S = F.value;
      S && (Q.value = S.getBoundingClientRect().width, !(typeof ResizeObserver > "u") && (Pe = new ResizeObserver(([R]) => {
        Q.value = R.contentRect.width;
      }), Pe.observe(S)));
    }), ye(() => Pe?.disconnect());
    const Be = f(() => a.oneStripFrom !== !1 && Q.value >= a.oneStripFrom), pn = f(() => ({
      views: Y.value,
      selectionPlacement: a.selectionPlacement,
      pagesNote: a.pagesNote
    }));
    return t({
      query: v.query
    }), (S, R) => (u(), h("div", {
      ref_key: "root",
      ref: F,
      class: "dc-shell",
      "data-dc-theme": e.theme,
      style: oe(I.value)
    }, [
      $("div", {
        class: le(["dc-shell__head", { "dc-shell__head--one-strip": Be.value }])
      }, [
        W($a, null, Vt({ _: 2 }, [
          c.page ? void 0 : {
            name: "lead",
            fn: G(() => [
              W(kr, {
                views: Y.value,
                "type-chooser": e.typeChooser
              }, null, 8, ["views", "type-chooser"])
            ]),
            key: "0"
          },
          c.brand ? {
            name: "brand",
            fn: G((j) => [
              X(S.$slots, "brand", At(Va(j)), void 0, !0)
            ]),
            key: "1"
          } : void 0,
          c.actions ? {
            name: "actions",
            fn: G(() => [
              X(S.$slots, "actions", {}, void 0, !0)
            ]),
            key: "2"
          } : void 0
        ]), 1024),
        Be.value && !c.page ? (u(), N(Gt, At(Ft({ key: 0 }, pn.value)), null, 16)) : L("", !0)
      ], 2),
      c.page ? (u(), h("div", zi, [
        X(S.$slots, "page", {
          query: b(C).query.value
        }, void 0, !0)
      ])) : L("", !0),
      !Be.value && !c.page ? (u(), N(Gt, At(Ft({ key: 1 }, pn.value)), null, 16)) : L("", !0),
      c.page ? L("", !0) : X(S.$slots, "results", {
        rows: b(C).rows.value,
        total: b(C).total.value,
        offset: b(C).offset.value,
        pageCount: b(C).pageCount.value,
        query: b(C).liveQuery.value,
        pending: b(C).pending.value,
        loading: e.loading
      }, () => [
        W(Ra, {
          views: Y.value,
          loading: e.loading
        }, Vt({ _: 2 }, [
          c["cards-before"] || y().length ? {
            name: "cards-before",
            fn: G(() => [
              (u(!0), h(V, null, J(y(), (j) => (u(), h(V, {
                key: `${j.entityKey}:${j.id}`
              }, [
                c.record ? X(S.$slots, "record", {
                  id: j.id,
                  entity: j.entity
                }, void 0, !0, 0) : (u(), N(je(e.recordCards?.[j.entityKey]), {
                  key: 1,
                  id: j.id
                }, null, 8, ["id"]))
              ], 64))), 128)),
              X(S.$slots, "cards-before", {}, void 0, !0)
            ]),
            key: "0"
          } : void 0,
          c["cards-after"] ? {
            name: "cards-after",
            fn: G(() => [
              X(S.$slots, "cards-after", {}, void 0, !0)
            ]),
            key: "1"
          } : void 0
        ]), 1032, ["views", "loading"])
      ], !0, 2)
    ], 12, Wi));
  }
}), Ui = /* @__PURE__ */ D(ji, [["__scopeId", "data-v-c162d9f5"]]), Qi = ["data-dc-muted", "data-dc-collapsed"], Gi = ["data-dc-collapsible"], Yi = ["aria-expanded", "aria-controls"], Xi = { class: "dc-shell-card__sr" }, Ji = {
  key: 0,
  class: "dc-shell-card__identity"
}, Zi = { class: "dc-shell-card__title dc-shell-card__name" }, ec = {
  key: 0,
  class: "dc-shell-card__ref dc-mono"
}, tc = {
  key: 1,
  class: "dc-shell-card__title"
}, nc = {
  key: 2,
  class: "dc-shell-card__count dc-mono"
}, ac = {
  key: 1,
  class: "dc-shell-card__aside"
}, sc = ["data-dc-flush"], oc = /* @__PURE__ */ q({
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
    const n = e, a = t, s = B(n.defaultCollapsed === !0), o = f(() => n.span === "all" ? { gridColumn: "1 / -1" } : void 0), r = kt();
    function c(H) {
      return l(H?.() ?? []);
    }
    function l(H) {
      return H.some((U) => U.type === Da ? !1 : U.type === Ka ? String(U.children ?? "").trim().length > 0 : U.type === V ? l(U.children ?? []) : !0);
    }
    const i = f(
      () => !!n.title || !!n.name || d.value || c(r.head)
    ), d = f(() => c(r.aside)), p = f(() => c(r.default)), w = f(() => c(r.foot)), g = f(
      () => !!n.name && (!!n.reference || c(r.reference))
    ), _ = f(() => n.collapsible === !0 && i.value), v = f(() => _.value && (n.collapsed ?? s.value));
    function k() {
      const H = !v.value;
      s.value = H, a("update:collapsed", H);
    }
    const P = bt() ?? "dc-shell-card", x = `${P}-body`, m = `${P}-foot`, y = f(
      () => [p.value ? x : "", w.value ? m : ""].filter(Boolean).join(" ") || void 0
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
    ].join(", "), A = B(null);
    function Y(H) {
      if (!_.value) return;
      const U = H.target?.closest(M);
      U && A.value?.contains(U) || typeof window < "u" && window.getSelection()?.toString() || k();
    }
    return (H, U) => (u(), h("section", {
      class: "dc-shell-card",
      style: oe(o.value),
      "data-dc-muted": e.muted ? "true" : "false",
      "data-dc-collapsed": v.value ? "true" : "false"
    }, [
      i.value ? (u(), h("header", {
        key: 0,
        ref_key: "head",
        ref: A,
        class: "dc-shell-card__head",
        "data-dc-collapsible": _.value ? "true" : "false",
        onClick: Y
      }, [
        _.value ? (u(), h("button", {
          key: 0,
          type: "button",
          class: "dc-shell-card__toggle",
          "aria-expanded": v.value ? "false" : "true",
          "aria-controls": y.value,
          onClick: k
        }, [
          U[0] || (U[0] = $("svg", {
            class: "dc-shell-card__chevron",
            viewBox: "0 0 10 10",
            "aria-hidden": "true"
          }, [
            $("path", { d: "M2 3.5 5 6.5 8 3.5" })
          ], -1)),
          $("span", Xi, E(e.name || e.title || "Card"), 1)
        ], 8, Yi)) : L("", !0),
        X(H.$slots, "head", {}, () => [
          e.name ? (u(), h("div", Ji, [
            $("h2", Zi, E(e.name), 1),
            g.value ? (u(), h("span", ec, [
              X(H.$slots, "reference", {}, () => [
                ee(E(e.reference), 1)
              ], !0)
            ])) : L("", !0)
          ])) : (u(), h("h2", tc, E(e.title), 1)),
          e.count !== void 0 ? (u(), h("span", nc, E(e.count), 1)) : L("", !0)
        ], !0),
        d.value ? (u(), h("span", ac, [
          X(H.$slots, "aside", {}, void 0, !0)
        ])) : L("", !0)
      ], 8, Gi)) : L("", !0),
      p.value ? qt((u(), h("div", {
        key: 1,
        id: x,
        class: "dc-shell-card__body",
        "data-dc-flush": e.flush ? "true" : "false"
      }, [
        X(H.$slots, "default", {}, void 0, !0)
      ], 8, sc)), [
        [gn, !v.value]
      ]) : L("", !0),
      w.value ? qt((u(), h("footer", {
        key: 2,
        id: m,
        class: "dc-shell-card__foot"
      }, [
        X(H.$slots, "foot", {}, void 0, !0)
      ], 512)), [
        [gn, !v.value]
      ]) : L("", !0)
    ], 12, Qi));
  }
}), ou = /* @__PURE__ */ D(oc, [["__scopeId", "data-v-073304c8"]]), rc = ["aria-label"], lc = ["aria-checked", "data-dc-active", "tabindex", "onClick", "onKeydown"], ic = /* @__PURE__ */ q({
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
    function o(r, c) {
      const l = n.options.length;
      let i = null;
      if (r.key === "ArrowRight" || r.key === "ArrowDown" ? i = (c + 1) % l : r.key === "ArrowLeft" || r.key === "ArrowUp" ? i = (c - 1 + l) % l : r.key === "Home" ? i = 0 : r.key === "End" && (i = l - 1), i === null) return;
      r.preventDefault();
      const d = n.options[i];
      d && (a("update:modelValue", d.key), s.value[i]?.focus());
    }
    return (r, c) => (u(), h("div", {
      class: "dc-segmented",
      role: "radiogroup",
      "aria-label": e.label
    }, [
      (u(!0), h(V, null, J(e.options, (l, i) => (u(), h("button", {
        key: l.key,
        ref_for: !0,
        ref_key: "buttons",
        ref: s,
        type: "button",
        role: "radio",
        class: le(["dc-segmented__item", { "dc-segmented__item--mono": e.mono }]),
        "aria-checked": l.key === e.modelValue,
        "data-dc-active": l.key === e.modelValue ? "true" : "false",
        tabindex: l.key === e.modelValue ? 0 : -1,
        onClick: (d) => a("update:modelValue", l.key),
        onKeydown: (d) => o(d, i)
      }, E(l.label), 43, lc))), 128))
    ], 8, rc));
  }
}), cc = /* @__PURE__ */ D(ic, [["__scopeId", "data-v-63fb5482"]]), uc = { class: "dc-fact__label" }, dc = ["title"], fc = /* @__PURE__ */ q({
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
        const o = s.filter((r) => r != null && r !== "");
        return o.length ? o.map(String) : [ge];
      }
      return [String(s)];
    }), a = f(() => t.wide ? { gridColumn: "1 / -1" } : void 0);
    return (s, o) => (u(), h("div", {
      class: "dc-fact",
      style: oe(a.value)
    }, [
      $("dt", uc, [
        X(s.$slots, "label", {}, () => [
          ee(E(e.label), 1)
        ], !0)
      ]),
      $("dd", {
        class: "dc-fact__value dc-mono",
        title: e.title
      }, [
        X(s.$slots, "default", {}, () => [
          n.value.length === 1 ? (u(), h(V, { key: 0 }, [
            ee(E(n.value[0]), 1)
          ], 64)) : (u(!0), h(V, { key: 1 }, J(n.value, (r, c) => (u(), h("span", {
            key: c,
            class: "dc-fact__line"
          }, E(r), 1))), 128))
        ], !0)
      ], 8, dc)
    ], 4));
  }
}), vc = /* @__PURE__ */ D(fc, [["__scopeId", "data-v-1f6d25e6"]]), pc = /* @__PURE__ */ q({
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
      (u(!0), h(V, null, J(e.items, (o, r) => (u(), N(vc, {
        key: `${r}:${o.label}`,
        label: o.label,
        value: o.value,
        title: o.title,
        wide: o.wide
      }, null, 8, ["label", "value", "title", "wide"]))), 128)),
      X(a.$slots, "default", {}, void 0, !0)
    ], 4));
  }
}), ru = /* @__PURE__ */ D(pc, [["__scopeId", "data-v-17455afa"]]), hc = { class: "dc-counts" }, mc = ["data-dc-tone"], yc = {
  key: 0,
  class: "dc-counts__empty"
}, gc = /* @__PURE__ */ q({
  __name: "StatusCounts",
  props: {
    counts: {},
    empty: { default: ge }
  },
  setup(e) {
    const t = e, n = f(() => t.counts.filter((a) => a.count > 0));
    return (a, s) => (u(), h("span", hc, [
      (u(!0), h(V, null, J(n.value, (o) => (u(), h("span", {
        key: o.label,
        class: "dc-counts__count",
        "data-dc-tone": o.tone ?? "neutral"
      }, E(o.count) + " " + E(o.label), 9, mc))), 128)),
      n.value.length === 0 ? (u(), h("span", yc, E(e.empty), 1)) : L("", !0)
    ]));
  }
}), lu = /* @__PURE__ */ D(gc, [["__scopeId", "data-v-5553a9e2"]]), _c = ["data-dc-copied", "title", "aria-label"], wc = {
  key: 0,
  class: "dc-copy__mark",
  viewBox: "0 0 16 16",
  "aria-hidden": "true"
}, kc = {
  key: 1,
  class: "dc-copy__mark",
  viewBox: "0 0 16 16",
  "aria-hidden": "true"
}, bc = 1500, $c = /* @__PURE__ */ q({
  __name: "CopyButton",
  props: {
    text: {},
    label: { default: "Copy to clipboard" }
  },
  emits: ["copied", "error"],
  setup(e, { emit: t }) {
    const n = e, a = t, s = B(!1);
    let o;
    async function r() {
      const c = typeof n.text == "function" ? n.text() : n.text;
      try {
        if (!navigator.clipboard) throw new Error("The clipboard is not available here");
        await navigator.clipboard.writeText(c);
      } catch (l) {
        a("error", l);
        return;
      }
      s.value = !0, clearTimeout(o), o = setTimeout(() => {
        s.value = !1;
      }, bc), a("copied", c);
    }
    return ye(() => clearTimeout(o)), (c, l) => (u(), h("button", {
      type: "button",
      class: "dc-copy",
      "data-dc-copied": s.value ? "true" : "false",
      title: s.value ? "Copied" : e.label,
      "aria-label": e.label,
      onClick: r
    }, [
      s.value ? (u(), h("svg", kc, [...l[1] || (l[1] = [
        $("path", { d: "M3 8.5l3.2 3L13 4.5" }, null, -1)
      ])])) : (u(), h("svg", wc, [...l[0] || (l[0] = [
        $("rect", {
          x: "5.5",
          y: "5.5",
          width: "8",
          height: "9",
          rx: "1.5"
        }, null, -1),
        $("path", { d: "M10.5 3.5v-1a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h1" }, null, -1)
      ])]))
    ], 8, _c));
  }
}), xc = /* @__PURE__ */ D($c, [["__scopeId", "data-v-f4249d7f"]]), Sc = ["data-dc-copy", "data-dc-wrap", "data-dc-tone"], Cc = /* @__PURE__ */ q({
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
    function r() {
      return n.code ?? s.value?.textContent ?? "";
    }
    return (c, l) => (u(), h("div", {
      class: "dc-code",
      "data-dc-copy": e.copy ? "true" : "false",
      "data-dc-wrap": e.wrap ? "true" : "false",
      "data-dc-tone": e.tone
    }, [
      $("pre", {
        ref_key: "pre",
        ref: s,
        class: "dc-code__text dc-mono",
        style: oe(o.value)
      }, [
        X(c.$slots, "default", {}, () => [
          ee(E(e.code), 1)
        ], !0)
      ], 4),
      e.copy ? (u(), N(xc, {
        key: 0,
        class: "dc-code__copy",
        text: r,
        label: e.copyLabel,
        onCopied: l[0] || (l[0] = (i) => a("copied", i)),
        onError: l[1] || (l[1] = (i) => a("error", i))
      }, null, 8, ["label"])) : L("", !0)
    ], 8, Sc));
  }
}), iu = /* @__PURE__ */ D(Cc, [["__scopeId", "data-v-67b371dd"]]), Pc = 24, Ec = /* @__PURE__ */ q({
  __name: "ShellLog",
  props: {
    fetchChunk: {},
    stripAnsi: { type: Boolean },
    maxHeight: { default: "460px" }
  },
  setup(e, { expose: t }) {
    const n = e, a = B(""), s = f(() => n.stripAnsi ? ns(a.value) : a.value), o = B(null);
    let r = 0, c = null;
    function l() {
      return c ??= i().finally(() => {
        c = null;
      }), c;
    }
    async function i() {
      const { chunk: w, offset: g } = await n.fetchChunk(r);
      if (r = g, !w) return;
      const _ = o.value, v = !_ || _.scrollTop + _.clientHeight >= _.scrollHeight - Pc;
      a.value += w, v && (await ze(), o.value && (o.value.scrollTop = o.value.scrollHeight));
    }
    function d() {
      a.value = "", r = 0;
    }
    const p = f(() => n.maxHeight === void 0 ? void 0 : { maxHeight: typeof n.maxHeight == "number" ? `${n.maxHeight}px` : n.maxHeight });
    return t({ poll: l, reset: d }), (w, g) => (u(), h("pre", {
      ref_key: "pane",
      ref: o,
      class: "dc-log dc-mono",
      style: oe(p.value)
    }, E(s.value), 5));
  }
}), cu = /* @__PURE__ */ D(Ec, [["__scopeId", "data-v-2c86947e"]]), Mc = ["data-dc-theme"], Lc = ["aria-labelledby", "aria-label"], Tc = {
  key: 1,
  class: "dc-dialog__actions"
}, De = [], Oc = /* @__PURE__ */ q({
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
    const n = e, a = t, { theme: s, style: o, adopt: r } = un(n), c = `${bt() ?? "dc-dialog"}-title`, l = B(null);
    function i() {
      a("close"), a("update:open", !1);
    }
    const d = Symbol("dc-dialog");
    function p(m) {
      m.key !== "Escape" || m.defaultPrevented || De[De.length - 1] === d && (m.preventDefault(), i());
    }
    let w = !1;
    function g(m) {
      w = m.target === m.currentTarget;
    }
    function _(m) {
      m.target === m.currentTarget && w && i(), w = !1;
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
    let k = null;
    async function P() {
      De.push(d), document.addEventListener("keydown", p), k = document.activeElement instanceof HTMLElement ? document.activeElement : null, r(), await ze(), (l.value?.querySelector("[autofocus]") ?? l.value?.querySelector(v) ?? l.value)?.focus();
    }
    function x() {
      const m = De.indexOf(d);
      m !== -1 && (De.splice(m, 1), document.removeEventListener("keydown", p), k?.isConnected && k.focus(), k = null);
    }
    return et(() => {
      n.open && P();
    }), se(
      () => n.open,
      (m) => {
        m ? P() : x();
      }
    ), ye(x), (m, y) => e.open ? (u(), N(wt, {
      key: 0,
      to: e.to
    }, [
      $("div", {
        class: "dc-shell dc-layer dc-dialog",
        "data-dc-theme": b(s),
        style: oe(b(o)),
        onPointerdown: g,
        onClick: _
      }, [
        $("div", {
          ref_key: "panel",
          ref: l,
          class: le(["dc-dialog__panel", e.panelClass]),
          role: "dialog",
          "aria-modal": "true",
          tabindex: "-1",
          "aria-labelledby": e.title ? c : void 0,
          "aria-label": e.title ? void 0 : e.label
        }, [
          e.title ? (u(), h("h2", {
            key: 0,
            id: c,
            class: "dc-dialog__title"
          }, E(e.title), 1)) : L("", !0),
          $("div", {
            class: le(["dc-dialog__body", e.bodyClass])
          }, [
            X(m.$slots, "default", {}, void 0, !0)
          ], 2),
          m.$slots.actions ? (u(), h("div", Tc, [
            X(m.$slots, "actions", {}, void 0, !0)
          ])) : L("", !0)
        ], 10, Lc)
      ], 44, Mc)
    ], 8, ["to"])) : L("", !0);
  }
}), uu = /* @__PURE__ */ D(Oc, [["__scopeId", "data-v-0cccf313"]]), Nc = 4500, Ac = 9e3, Ze = B([]);
let Fn = 0;
function Ba(e) {
  Ze.value = Ze.value.filter((t) => t.id !== e);
}
function Ha(e, t = "ok") {
  Fn += 1;
  const n = Fn;
  Ze.value = [...Ze.value, { id: n, message: e, kind: t }], setTimeout(() => Ba(n), t === "err" ? Ac : Nc);
}
function Ic(e) {
  Ha(e instanceof Error ? e.message : String(e), "err");
}
function Rc() {
  return { toasts: Wa(Ze), toast: Ha, toastError: Ic, dismiss: Ba };
}
const Bc = ["data-dc-theme"], Hc = ["data-dc-kind", "role"], Fc = /* @__PURE__ */ q({
  __name: "ShellToasts",
  props: {
    to: { default: "body" },
    theme: { default: void 0 },
    accent: { default: void 0 },
    tokens: { default: void 0 }
  },
  setup(e) {
    const t = e, { toasts: n } = Rc(), { theme: a, style: s, adopt: o } = un(t);
    return et(o), (r, c) => (u(), N(wt, { to: e.to }, [
      $("div", {
        class: "dc-shell dc-layer dc-toasts",
        "data-dc-theme": b(a),
        style: oe(b(s)),
        "aria-live": "polite"
      }, [
        (u(!0), h(V, null, J(b(n), (l) => (u(), h("div", {
          key: l.id,
          class: "dc-toast",
          "data-dc-kind": l.kind,
          role: l.kind === "err" ? "alert" : void 0
        }, E(l.message), 9, Hc))), 128))
      ], 12, Bc)
    ], 8, ["to"]));
  }
}), du = /* @__PURE__ */ D(Fc, [["__scopeId", "data-v-d970211c"]]);
function fu(e, t) {
  const n = B(!1);
  let a = null, s = !1, o = 0;
  const r = () => {
    o++, n.value = !1, a !== null && (clearTimeout(a), a = null);
  };
  function c(d) {
    a = setTimeout(() => void l(d), t);
  }
  async function l(d) {
    if (s || d !== o) return;
    let p;
    try {
      p = await e();
    } catch {
      p = !1;
    }
    s || d !== o || (p ? c(d) : r());
  }
  const i = () => {
    n.value || (n.value = !0, l(++o));
  };
  return _t(() => {
    s = !0, r();
  }, !0), { start: i, stop: r, polling: n };
}
function vu(e, t = {}) {
  const n = t.key ?? ((o) => JSON.stringify(o)), a = ke();
  let s = null;
  return za(() => {
    const o = e(), r = n(o);
    r !== s && (s = r, a.value = o);
  }), a;
}
function pu(e = {}) {
  return { key: "ordinal", kind: "ordinal", label: "#", width: "52px", ...e };
}
function hu(e = {}) {
  return { key: "status", role: "state", kind: "status", label: "State", sort: "state", width: "104px", ...e };
}
function mu(e = {}) {
  return { key: "tint", role: "tint", ...e };
}
function yu(e = {}) {
  return { key: "picture", role: "image", kind: "image", width: "56px", height: "40px", ...e };
}
function gu(e, t = {}) {
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
function _u(e, t = {}) {
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
function wu(e, t, n = {}) {
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
function ku(e, t, n = {}) {
  return { key: e, kind: "date", label: t, sort: e, width: "104px", mono: !0, muted: !0, ...n };
}
function bu(e = {}) {
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
function $u(e, t, n = {}) {
  return { key: e, label: t, sort: e, truncate: !0, hideBelow: 900, ...n };
}
function xu(e, t, n, a = {}) {
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
function Nt(e) {
  return typeof e == "number" ? e : typeof e == "string" && e.trim() !== "" ? Number(e) : Number.NaN;
}
function Su(e) {
  const t = Nt(e);
  return Number.isFinite(t) && t > 0 ? Ja(t) : ge;
}
function Cu(e) {
  const t = Nt(e);
  return Number.isFinite(t) && t > 0 ? Za(t) : ge;
}
function Pu(e) {
  const t = Nt(e);
  return Number.isFinite(t) && t > 0 ? es(t) : ge;
}
function Eu(e) {
  const t = Nt(e);
  return Number.isFinite(t) ? ts(t) : ge;
}
function qc(e) {
  if (e <= 0) return 0;
  const t = 10 ** Math.floor(Math.log10(e));
  for (const n of [1, 2, 5])
    if (e <= n * t) return n * t;
  return 10 * t;
}
function Vc(e, t) {
  const n = /* @__PURE__ */ new Set();
  for (const a of e) {
    const s = a.fields[t];
    for (const o of Array.isArray(s) ? s : [s])
      typeof o == "string" && o && n.add(o);
  }
  return [...n].sort((a, s) => a.localeCompare(s));
}
function Dc(e, t) {
  let n = 0;
  for (const a of e) {
    const s = a.fields[t];
    typeof s == "number" && s > n && (n = s);
  }
  return n;
}
function Mu(e, t, n, a = {}) {
  return {
    kind: "chips",
    key: t,
    label: n,
    options: Vc(e, t),
    ...a.multiple ? { multiple: !0 } : {}
  };
}
function Lu(e, t, n) {
  return { kind: "range", key: t, label: n, min: 0, max: qc(Dc(e, t)) };
}
function Tu(e, t, n) {
  return { kind: "toggle", key: e, label: t, text: n };
}
function Ou(e) {
  return e.filter((t) => t.kind === "chips" ? t.options.length > 1 : t.kind === "range" ? t.max > 0 : !0);
}
function Nu(e = "", t = "/") {
  const n = B(ce(e)), a = B(t), s = [`${a.value}${n.value}`];
  return {
    search: n,
    path: a,
    history: s,
    href(o, r) {
      return `${r ?? a.value}${ce(o)}`;
    },
    push(o, r) {
      r !== void 0 && (a.value = r), n.value = ce(o), s.push(`${a.value}${n.value}`);
    },
    replace(o, r) {
      r !== void 0 && (a.value = r), n.value = ce(o), s[s.length - 1] = `${a.value}${n.value}`;
    }
  };
}
function qn(e) {
  const t = e.indexOf("?");
  if (t === -1) return "";
  const n = e.slice(t), a = n.indexOf("#");
  return ce(a === -1 ? n : n.slice(0, a));
}
function Au(e) {
  const t = B(qn(e.currentRoute.value.fullPath)), n = f(() => e.currentRoute.value.path), a = se(
    () => e.currentRoute.value.fullPath,
    (s) => {
      t.value = qn(s);
    }
  );
  return {
    search: t,
    path: n,
    push: (s, o) => e.push(`${o ?? n.value}${ce(s)}`),
    replace: (s, o) => e.replace(`${o ?? n.value}${ce(s)}`),
    href: (s, o) => {
      const r = `${o ?? n.value}${ce(s)}`;
      return e.resolve?.(r).href ?? r;
    },
    dispose: a
  };
}
function Iu(e, t, n = "/") {
  return (a) => {
    const s = a.params[t], o = Array.isArray(s) ? s.join("/") : s ?? "", r = a.query[Te], c = typeof r == "string" ? r : "", l = `${e}="${o.replace(/"/g, "")}"`;
    return { path: n, query: { ...a.query, [Te]: nt(c, l) } };
  };
}
function Ru(e, t = "/") {
  return (n) => ({ path: t, query: { ...n.query, [Ve]: e } });
}
function Bu(e) {
  const t = /* @__PURE__ */ new Map();
  for (const n of e) {
    const a = t.get(n.entityKey);
    a ? a.push(n) : t.set(n.entityKey, [n]);
  }
  return {
    query(n) {
      return oa(n, (a) => t.get(a.key) ?? [], {
        undatedLast: !0,
        zeroIsAll: !0
      });
    }
  };
}
function Hu(e, t) {
  return e.query({ ...t, limit: Number.MAX_SAFE_INTEGER, offset: 0 }).rows;
}
const Kc = {
  DataShell: Ui,
  ShellHeader: $a,
  RecordActions: Gt,
  ResultsArea: Ra,
  SegmentedControl: cc,
  StatusPill: at,
  ListView: Xt,
  CardsView: Pa,
  GridView: Ea,
  ImagesView: Ma,
  TableView: Aa,
  LinksView: La,
  PreviewView: Ta,
  TypeCardsView: Ia
}, Fu = {
  install(e, t = {}) {
    const n = t.prefix ?? "";
    for (const [a, s] of Object.entries(Kc))
      e.component(`${n}${a}`, s);
    t.route && e.provide(Kn, t.route), (t.theme || t.accent || t.tokens) && Xs({ theme: t.theme, accent: t.accent, tokens: t.tokens }, e);
  }
};
export {
  Qc as COLUMN_BREAKPOINTS,
  Uc as COLUMN_ROLES,
  Pa as CardsView,
  Hn as ColumnCell,
  xc as CopyButton,
  as as DEFAULT_ENTITY_VIEW,
  Dt as DEFAULT_SORT,
  Wn as DEFAULT_VIEW,
  io as DRAFT_DELAY,
  Ui as DataShell,
  ge as EMPTY_CELL,
  la as ENTITY_ALL,
  yt as ENTITY_TERM,
  Je as EXPRESSION_TERM,
  Ea as GridView,
  Fu as HeaderContentLayoutPlugin,
  Ma as ImagesView,
  La as LinksView,
  Xt as ListView,
  ft as MOCK_TINTS,
  st as MetricDrill,
  ot as OpenMark,
  rn as PARAM_DIR,
  Ve as PARAM_ENTITY,
  Te as PARAM_EXPR,
  Pt as PARAM_PAGE,
  on as PARAM_SORT,
  Ct as PARAM_VIEW,
  jc as PILL_TONES,
  mo as POPOVER_FLIP_BELOW,
  po as POPOVER_GAP,
  ho as POPOVER_MARGIN,
  fn as PinStar,
  Ta as PreviewView,
  vn as QueryMark,
  Ke as RECORD_STATUSES,
  nn as RESULT_FIELDS,
  Kn as ROUTE_ADAPTER_KEY,
  Gt as RecordActions,
  kr as RecordChoosers,
  Ra as ResultsArea,
  ya as SHELL_CONTEXT_KEY,
  mt as SHELL_THEME_KEY,
  rt as ScopeMark,
  cc as SegmentedControl,
  Ne as SelectTick,
  ou as ShellCard,
  iu as ShellCode,
  uu as ShellDialog,
  vc as ShellFact,
  ru as ShellFacts,
  $a as ShellHeader,
  cu as ShellLog,
  rr as ShellPager,
  wo as ShellPopover,
  du as ShellToasts,
  Yt as StandingControl,
  lu as StatusCounts,
  at as StatusPill,
  Ac as TOAST_ERROR_MS,
  Nc as TOAST_MS,
  Aa as TableView,
  Ia as TypeCardsView,
  ss as VIEW_ICONS,
  en as VIEW_KINDS,
  wn as VIEW_LABELS,
  nt as addTerm,
  sn as andExpression,
  Su as bytesCell,
  Yn as cellFull,
  ei as cellNarrowings,
  Le as cellText,
  it as cellTextOf,
  ie as cellValue,
  It as changesResults,
  Mu as chipsFrom,
  bn as columnAlign,
  $n as columnClass,
  kn as columnKey,
  Na as columnNarrows,
  tt as columnShortcut,
  ta as columnShortcutOf,
  Wt as columnTruncates,
  cs as columnsFor,
  Jn as compactShortcuts,
  Eo as completeDraft,
  is as countPages,
  Ua as createHistoryAdapter,
  Nu as createMemoryAdapter,
  Bu as createMemoryDataSource,
  qs as createMockDataSource,
  Au as createVueRouterAdapter,
  ku as dateColumn,
  fs as defaultCellText,
  ut as defaultQuery,
  Ue as defaultViewFor,
  Qa as detachableAdapter,
  Bt as drillExpression,
  Cu as durationCell,
  Pu as elapsedCell,
  rs as emptyFacetValue,
  Ws as entityAddress,
  bu as entityColumn,
  Kt as entityCount,
  Ru as entityRedirect,
  da as excludingTerm,
  Ye as expandShortcuts,
  $u as facetColumn,
  Xe as facetField,
  wa as facetValue,
  ks as fieldHeading,
  ua as fieldTerm,
  Qe as findEntity,
  ia as findEntityByAddress,
  Se as findSort,
  xu as flagColumn,
  We as fnv1a,
  jn as focusEntity,
  Ja as formatBytes,
  ct as formatCount,
  Ya as formatDate,
  Gc as formatDateTime,
  Za as formatDuration,
  es as formatElapsed,
  me as formatExpression,
  He as formatInteger,
  Ga as formatMetric,
  Xa as formatOrdinal,
  ts as formatPercent,
  ys as formatRange,
  we as formatTerm,
  Fs as generateRows,
  no as hasActiveFacets,
  gu as identityColumn,
  nu as idsExpression,
  Yc as isEntityScoped,
  ls as isFacetActive,
  tn as isPristineQuery,
  Ge as isRangeTerm,
  Qn as isTypeCardsQuery,
  zn as isViewKind,
  Jc as joinExpression,
  fa as liftTerm,
  Ss as matchesExpression,
  wu as metricColumn,
  au as narrowPatch,
  Cs as negateTerm,
  qc as niceMax,
  ce as normalizeSearch,
  Zl as numberRange,
  Es as oppositeTerm,
  pu as ordinalColumn,
  re as parseExpression,
  Us as parseQuery,
  Eu as percentCell,
  yu as pictureColumn,
  yo as placePopover,
  xr as presentParts,
  Sa as presentRow,
  Tt as pressOptions,
  Gs as provideShellContext,
  Xs as provideShellTheme,
  Hu as queryAll,
  Lu as rangeFrom,
  xt as rangeOf,
  Ts as readDraft,
  tu as readExpression,
  Iu as recordRedirect,
  ca as recordTerm,
  Qs as recordsIn,
  _u as referenceColumn,
  dt as refineExpression,
  qe as resolveView,
  fe as roleColumn,
  Gn as roleColumns,
  ds as rowKey,
  zt as sameTerm,
  Mt as scopeTerm,
  ht as scopeTermFor,
  ha as scopedEntity,
  eu as searchFromQuery,
  Nn as serializeQuery,
  zs as sortAddress,
  $t as sortsFor,
  Xc as splitExpression,
  hu as stateColumn,
  ns as stripAnsi,
  oo as summarizeQuery,
  dn as summaryTerms,
  cn as termStanding,
  mu as tintColumn,
  Zc as tintFor,
  Tu as toggleFacet,
  Ul as useColumns,
  co as useDraft,
  yr as useEntityCounts,
  mi as useEntityPreviews,
  un as useLayerTheme,
  fu as usePoll,
  Oe as usePresentedRows,
  ro as useQueryState,
  vo as useRecordNames,
  lo as useResults,
  te as useShellContext,
  vu as useStableSchema,
  Rc as useToasts,
  Ou as usefulFacets,
  _n as viewAcross,
  ka as withFacetValue,
  jt as withStanding,
  su as withoutFacet,
  pa as withoutOwnScope,
  Ps as withoutTerm
};
