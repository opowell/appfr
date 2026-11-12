import { ref as H, computed as f, inject as rn, provide as on, getCurrentInstance as ta, shallowRef as me, toValue as Le, watch as ne, onScopeDispose as Ct, getCurrentScope as na, defineComponent as W, onMounted as it, onBeforeUnmount as we, openBlock as u, createBlock as I, Teleport as Pt, createElementVNode as S, mergeProps as De, unref as w, renderSlot as Y, createCommentVNode as M, nextTick as Ye, createElementBlock as h, withKeys as Te, useSlots as Et, useId as Mt, withCtx as X, toDisplayString as E, createTextVNode as Z, Fragment as K, renderList as J, withModifiers as Oe, normalizeClass as de, withDirectives as Ut, normalizeStyle as re, vModelText as es, createVNode as G, reactive as Cn, toHandlers as cn, resolveDynamicComponent as Xe, createSlots as Qt, useModel as Pn, onBeforeUpdate as ts, normalizeProps as Dt, guardReactiveProps as ns, mergeModels as En, vShow as Mn, Comment as as, Text as ss, readonly as ls, watchEffect as rs } from "vue";
import { MenuList as os } from "menu-bar";
const un = ["list", "cards", "grid", "images", "table", "links", "preview"], Qe = ["ok", "running", "queued", "review", "failed"], vu = [...Qe, "neutral", "accent"], pu = [
  "identity",
  "reference",
  "metric",
  "state",
  "updated",
  "image",
  "tint"
], hu = [480, 620, 760, 900, 1100], aa = Symbol("dc.routeAdapter");
function fe(e) {
  if (!e) return "";
  const t = e.replace(/^[?]/, "");
  return t ? `?${t}` : "";
}
function is() {
  const e = typeof window < "u", t = H(e ? fe(window.location.search) : ""), n = H(e ? window.location.pathname : "/"), a = () => {
    t.value = fe(window.location.search), n.value = window.location.pathname;
  };
  e && window.addEventListener("popstate", a);
  const s = (l, o, i) => {
    const r = fe(l);
    if (!e) {
      t.value = r, i !== void 0 && (n.value = i);
      return;
    }
    const c = i === void 0 || i === window.location.pathname ? `${window.location.pathname}${r}${window.location.hash}` : `${i}${r}`;
    o === "push" ? window.history.pushState(window.history.state, "", c) : window.history.replaceState(window.history.state, "", c), t.value = r, n.value = window.location.pathname;
  };
  return {
    search: t,
    path: n,
    href(l, o) {
      return e ? o !== void 0 && o !== window.location.pathname ? `${o}${fe(l)}` : `${window.location.pathname}${fe(l)}${window.location.hash}` : `${o ?? n.value}${fe(l)}`;
    },
    push: (l, o) => s(l, "push", o),
    replace: (l, o) => s(l, "replace", o),
    dispose: () => {
      e && window.removeEventListener("popstate", a);
    }
  };
}
function cs(e, t) {
  const n = f(t.detached), a = f(() => n.value ? "" : e.search.value), s = f(() => n.value ? t.path() : e.path.value);
  return {
    search: a,
    path: s,
    elsewhere: n,
    push(l, o) {
      n.value ? e.push(l, o ?? t.path()) : e.push(l, o);
    },
    replace(l, o) {
      n.value ? e.push(l, o ?? t.path()) : e.replace(l, o);
    },
    href(l, o) {
      const i = o ?? (n.value ? t.path() : void 0);
      return e.href ? e.href(l, i) : `${i ?? e.path.value}${fe(l)}`;
    }
  };
}
function Ge(e) {
  let t = 2166136261;
  for (let n = 0; n < e.length; n++)
    t ^= e.charCodeAt(n), t = Math.imul(t, 16777619);
  return Math.abs(t);
}
const us = new Intl.NumberFormat("en-US", {
  minimumSignificantDigits: 2,
  maximumSignificantDigits: 2,
  useGrouping: !1
});
function Lt(e) {
  return Number.isFinite(e) ? Math.abs(e) < 100 ? us.format(e) : String(Math.round(e)) : "—";
}
function ds(e) {
  return Number.isFinite(e) ? Number.isInteger(e) || Math.abs(e) >= 100 ? Je(e) : Lt(e) : "—";
}
function Je(e) {
  if (!Number.isFinite(e)) return "—";
  const t = Math.round(e), n = Math.abs(t);
  return n < 1e3 ? String(t) : n < 9950 ? `${(t / 1e3).toFixed(1)}k` : n < 999500 ? `${Math.round(t / 1e3)}k` : n < 995e4 ? `${(t / 1e6).toFixed(1)}m` : `${Math.round(t / 1e6)}m`;
}
function Ve(e) {
  return Number.isFinite(e) ? Math.round(e).toLocaleString("en-US") : "—";
}
function fs(e) {
  const t = new Date(e);
  if (Number.isNaN(t.getTime())) return "—";
  const n = String(t.getUTCDate()).padStart(2, "0"), a = String(t.getUTCMonth() + 1).padStart(2, "0");
  return `${n}.${a}.${t.getUTCFullYear()}`;
}
function vs(e) {
  return String(e + 1);
}
function mu(e, t) {
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
function ps(e) {
  if (e == null || !Number.isFinite(e) || e < 0) return "—";
  if (e < 1e3) return `${e} B`;
  const t = ["kB", "MB", "GB", "TB"];
  let n = e, a = -1;
  for (; n >= 1e3 && a < t.length - 1; )
    n /= 1e3, a += 1;
  return `${Lt(n)} ${t[a]}`;
}
function hs(e) {
  if (!e || !Number.isFinite(e)) return "—";
  if (e < 1e3) return `${Math.round(e)}ms`;
  const t = e / 1e3;
  return t < 60 ? `${Lt(t)}s` : `${Math.floor(t / 60)}m ${Math.round(t % 60)}s`;
}
function ms(e) {
  if (e == null || !Number.isFinite(e) || e <= 0)
    return "—";
  const t = Math.floor(e / 60);
  return t ? `${t}:${String(e % 60).padStart(2, "0")}` : `${e}s`;
}
function ys(e) {
  return e == null || !Number.isFinite(e) ? "—" : `${Math.round(e * 100)}%`;
}
function gs(e) {
  return e.replace(/\x1b\[[0-9;?]*[ -/]*[@-~]/g, "");
}
const sa = "cards", _s = "table";
function Ze(e, t = {}) {
  const n = (s) => s && la(s) ? s : void 0;
  if (e === null) return n(t.view) ?? sa;
  const a = t.landing === "entity" ? n(t.view) : void 0;
  return n(t.entityView) ?? a ?? _s;
}
function Ln(e, t, n, a = {}) {
  return a.viewAcrossTypes !== "default" && e !== Ze(t, a) ? e : Ze(n, a);
}
const Gt = "updated";
function la(e) {
  return typeof e == "string" && (e === "record" || un.includes(e));
}
const Tn = {
  list: "List",
  cards: "Cards",
  grid: "Grid",
  images: "Images",
  table: "Table",
  links: "Links",
  preview: "Preview",
  record: "Record"
}, ws = {
  list: "M6 4h7.5M6 8h7.5M6 12h7.5M2.5 4h.01M2.5 8h.01M2.5 12h.01",
  cards: "M2.5 2.5h11v4.5h-11zM2.5 9h11v4.5h-11z",
  grid: "M2.5 2.5h4.5v4.5h-4.5zM9 2.5h4.5v4.5H9zM2.5 9h4.5v4.5h-4.5zM9 9h4.5v4.5H9z",
  images: "M2.5 3h11v10h-11zM2.5 11l3.5-3.5 2.5 2.5 2-2 3 3M10.5 5.75h.01",
  table: "M2.5 3h11v10h-11zM2.5 6.5h11M2.5 9.75h11M6.5 6.5V13",
  links: "M6.75 9.25a2.5 2.5 0 0 0 3.54 0l2.12-2.12a2.5 2.5 0 0 0-3.54-3.54l-.7.7M9.25 6.75a2.5 2.5 0 0 0-3.54 0L3.59 8.87a2.5 2.5 0 0 0 3.54 3.54l.7-.7",
  preview: "M1.5 8S4 3.5 8 3.5 14.5 8 14.5 8 12 12.5 8 12.5 1.5 8 1.5 8zM6 8a2 2 0 1 0 4 0 2 2 0 1 0-4 0",
  record: "M4 2h5.5L12 4.5V14H4zM9.5 2v2.5H12M6 8h4M6 10.5h4"
};
function Ne(e, t) {
  if (e === "record" && !t?.includes(e)) return t?.[0] ?? sa;
  const [n] = t ?? [];
  return n === void 0 || t?.includes(e) ? e : n;
}
function Yt(e) {
  return typeof e.count == "number" ? Je(e.count) : e.count;
}
function et(e, t) {
  return t ? e.entities.find((n) => n.key === t) ?? null : null;
}
function ra(e, t = {}) {
  const n = et(e, t.entity), a = e.entities[0];
  if (!n && !a) throw new Error(`Schema "${e.key}" declares no entities`);
  return n ?? a;
}
function oa(e, t = null) {
  return e?.columns ?? t?.columns ?? [];
}
function Tt(e, t = null) {
  if (e?.sorts?.length) return e.sorts;
  const n = /* @__PURE__ */ new Set(), a = [];
  for (const s of oa(e, t))
    !s.sort || n.has(s.sort) || (n.add(s.sort), a.push({ key: s.sort, label: (s.label ?? s.sort).toLowerCase() }));
  return a;
}
const ks = { key: Gt, label: Gt };
function Ee(e, t, n = null) {
  const a = Tt(e, n);
  return (t ? a.find((l) => l.key === t) : void 0) ?? a.find((l) => l.key === Gt) ?? a[0] ?? ks;
}
function bs(e) {
  switch (e.kind) {
    case "chips":
      return { kind: "chips", selected: [] };
    case "range":
      return { kind: "range", min: null, max: null };
    case "toggle":
      return { kind: "toggle", on: !1 };
  }
}
function $s(e) {
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
function dn(e) {
  return e.entity === null && e.expr.trim() === "";
}
function yu(e) {
  return e.entity !== null;
}
function ia(e, t) {
  return e.entity === null && Ne(e.view, t) === "cards";
}
function xs(e, t) {
  return t <= 0 ? 1 : Math.max(1, Math.ceil(e / t));
}
function yt(e, t = {}) {
  const a = t.landing === "entity" ? ra(e, t) : null;
  return {
    entity: a?.key ?? null,
    view: Ze(a?.key ?? null, t),
    sort: Ee(a, t.sort).key,
    dir: t.dir === "asc" ? "asc" : "desc",
    expr: "",
    page: 1
  };
}
const fn = ["entity", "sort", "dir", "expr"];
function Kt(e) {
  return fn.some((t) => t in e);
}
const ke = "—";
function pe(e, t) {
  return e.find((n) => n.role === t);
}
function ca(e, t) {
  return e.filter((n) => n.role === t);
}
function Ss(e, t) {
  const n = (t ? t.columns : e?.columns) ?? [], a = t ? "scoped" : "everything";
  return n.filter(
    (s) => s.role !== "tint" && ((s.when ?? "always") === "always" || s.when === a)
  );
}
const Cs = ["id", "entityKey", "entityLabel"];
function ue(e, t) {
  if (e.value) return e.value(t);
  const n = e.field ?? e.key;
  if (n !== void 0) {
    if (t.fields && n in t.fields) return t.fields[n];
    if (Cs.includes(n))
      return t[n];
  }
}
function On(e, t) {
  const n = e.key ?? e.field ?? e.label;
  return n?.trim() ? n.trim() : `column-${t}`;
}
function Ps(e, t) {
  return e.id?.trim() ? e.id : `${e.entityKey || "row"}-${t}`;
}
function Es(e, t) {
  if (e == null || e === "") return ke;
  if (t === "number") {
    const n = typeof e == "number" ? e : Number(e);
    return Number.isFinite(n) ? ds(n) : String(e);
  }
  return t === "date" ? fs(String(e)) : Array.isArray(e) ? e.length ? e.join(", ") : ke : String(e);
}
function Ae(e, t) {
  const n = ue(e, t);
  return e.format ? e.format(n, t) : Es(n, e.kind);
}
function Ms(e) {
  return typeof e == "number" ? Number.isFinite(e) ? String(e) : "" : typeof e == "string" ? e : Array.isArray(e) ? e.join(", ") : "";
}
function ua(e, t) {
  const n = Ae(e, t), a = Ms(ue(e, t));
  return a && a !== n ? a : n;
}
function mt(e, t) {
  return e ? Ae(e, t) : "";
}
function Nn(e) {
  return e.align ? e.align : e.kind === "number" || e.kind === "ordinal" ? "right" : "left";
}
const Ls = {
  ordinal: "dc-table__num",
  number: "dc-table__number",
  date: "dc-table__date",
  status: "dc-table__state"
};
function An(e) {
  return [Ls[e.kind ?? "text"], e.class].filter(Boolean).join(" ");
}
function Xt(e) {
  if (e.truncate !== void 0) return e.truncate;
  const t = e.kind ?? "text";
  return t === "text" || t === "number" || t === "date";
}
const Ts = /^([A-Za-z_][\w.-]*)\s*(>=|<=|:|=|>|<)\s*(.*)$/, In = "-?(?:\\d+\\.?\\d*|\\.\\d+)", Os = new RegExp(`^(${In})?\\.\\.(${In})?$`);
function Ot(e) {
  const t = Os.exec(e.trim());
  if (!t || t[1] === void 0 && t[2] === void 0) return null;
  const n = t[1] === void 0 ? null : Number(t[1]), a = t[2] === void 0 ? null : Number(t[2]);
  return n !== null && a !== null && n > a ? { min: a, max: n } : { min: n, max: a };
}
function Ns(e) {
  return `${e.min ?? ""}..${e.max ?? ""}`;
}
function Ke(e) {
  return e.kind === "field" && (e.comparator === ":" || e.comparator === "=") && Ot(e.value) !== null;
}
function As(e) {
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
function le(e) {
  const t = e.trim();
  if (!t) return [];
  const n = [];
  let a = [];
  for (const s of As(t)) {
    const l = s.toUpperCase();
    if (l === "AND" || l === "&&") continue;
    if (l === "OR" || l === "||") {
      a.length && n.push(a), a = [];
      continue;
    }
    const o = s.length > 1 && s.startsWith("-"), i = o ? s.slice(1) : s, r = o ? { negated: !0 } : {}, c = Ts.exec(i);
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
const Me = (e) => e.toLowerCase().replace(/\s+/g, ""), da = [
  ["status", "state"],
  ["state", "state"],
  ["updated", "updated"],
  ["date", "updated"],
  ["name", "identity"],
  ["ref", "reference"]
];
function Is(e, t, n) {
  const a = Me(e), s = n.columns ?? [];
  if (a === "entity") return t.entityKey;
  if (e in t.fields) return t.fields[e];
  const l = s.find(
    (c) => c.key?.toLowerCase() === e.toLowerCase() || c.field?.toLowerCase() === e.toLowerCase() || c.label !== void 0 && Me(c.label) === a
  );
  if (l) return ue(l, t);
  const o = n.facets.find(
    (c) => c.key.toLowerCase() === a || Me(c.label) === a
  );
  if (o && o.key in t.fields) return t.fields[o.key];
  const i = da.find(([c]) => c === a)?.[1];
  if (i) {
    const c = pe(s, i);
    if (c) return ue(c, t);
  }
  const r = /^metric(\d+)$/.exec(a);
  if (r) {
    const c = ca(s, "metric")[Number(r[1]) - 1];
    if (c) return ue(c, t);
  }
}
function ct(e) {
  return (e.toLowerCase().match(/[\p{L}\p{N}]+/gu) ?? []).map((t) => t.charAt(0)).join("");
}
const Rn = /^[a-z_][\w.-]*$/;
function Nt(e) {
  const t = (e.key ?? e.field)?.toLowerCase();
  if (t !== void 0) return Rn.test(t) ? t : void 0;
  const n = e.label === void 0 ? void 0 : Me(e.label);
  return n !== void 0 && Rn.test(n) ? n : void 0;
}
function vn(e, t) {
  const n = Me(e);
  return !!t?.entities.some((a) => a.scope && Me(a.scope) === n);
}
function Rs(e, t, n) {
  const a = Me(e);
  if (a === "entity" || da.some(([l]) => l === a) || /^metric\d+$/.test(a) || vn(e, n)) return !0;
  const s = (l) => l !== void 0 && Me(l) === a;
  return (t.columns ?? []).some(
    (l) => s(l.key) || s(l.field) || s(l.label)
  ) || t.facets.some((l) => s(l.key) || s(l.label));
}
function tt(e, t, n) {
  return t ? va(e, (a) => {
    const s = pa(a, t, n);
    return s && Nt(s);
  }) : e;
}
function fa(e, t, n) {
  return t ? va(e, (a) => {
    if (vn(a, n)) return;
    const s = (t.columns ?? []).find((l) => Nt(l) === a);
    return s && ha(s, t, n);
  }) : e;
}
function Bs(e, t, n) {
  if (!t || vn(e, n)) return;
  const a = t.facets.find((s) => s.key.toLowerCase() === e);
  return a ? a.label : (t.columns ?? []).find((s) => Nt(s) === e)?.label;
}
function va(e, t) {
  let n = !1;
  const a = le(e).map(
    (s) => s.map((l) => {
      if (l.kind !== "field") return l;
      const o = t(l.field);
      return !o || o === l.field ? l : (n = !0, { ...l, field: o });
    })
  );
  return n ? he(a) : e;
}
function pa(e, t, n) {
  if (!(!e || Rs(e, t, n)))
    return (t.columns ?? []).find(
      (a) => a.label !== void 0 && ct(a.label) === e
    );
}
function ha(e, t, n) {
  if (!t || e.label === void 0 || !Nt(e)) return;
  const a = ct(e.label);
  return pa(a, t, n) === e ? a : void 0;
}
function Wt(e, t) {
  const n = e.toLowerCase(), a = t.toLowerCase();
  if (!a.includes("*")) return n.includes(a);
  const s = a.replace(/[.+?^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*");
  return new RegExp(s).test(n);
}
function Bn(e, t) {
  return e.toLowerCase() === t.toLowerCase();
}
function Hs(e, t, n, a) {
  if (e.kind === "text") {
    const r = n.columns ?? [];
    return ["identity", "reference"].some((c) => {
      const d = pe(r, c), v = d ? ue(d, t) : void 0;
      return typeof v == "string" && Wt(v, e.value);
    });
  }
  const s = Is(e.field, t, n);
  if (s === void 0) return a?.has(e.field) ? !1 : null;
  const l = Ke(e) ? Ot(e.value) : null;
  if (l) {
    if (Array.isArray(s) || typeof s == "boolean") return null;
    const r = typeof s == "number" ? s : Number(s);
    return Number.isFinite(r) ? (l.min === null || r >= l.min) && (l.max === null || r <= l.max) : null;
  }
  if (Array.isArray(s))
    return e.comparator === ":" || e.comparator === "=" ? s.some(
      (c) => e.comparator === "=" ? Bn(String(c), e.value) : Wt(String(c), e.value)
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
    return e.comparator === "=" ? Bn(String(s), e.value) : Wt(String(s), e.value);
  }
  const o = Number(e.value), i = typeof s == "number" ? s : Number(s);
  return !Number.isFinite(o) || !Number.isFinite(i) ? null : qs(e.comparator, i, o);
}
function Hn(e, t, n, a) {
  const s = Hs(e, t, n, a);
  return s === null ? !0 : e.negated ? !s : s;
}
function qs(e, t, n) {
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
function qn(e) {
  return e.kind === "field" && !e.negated && (e.comparator === ":" || e.comparator === "=") && !Ke(e);
}
const Fn = /* @__PURE__ */ new WeakMap();
function Fs(e) {
  if (!e?.strictScopes) return null;
  let t = Fn.get(e);
  return t || (t = new Set(
    e.entities.flatMap((n) => n.scope ? [n.scope.toLowerCase()] : [])
  ), Fn.set(e, t)), t;
}
function Vs(e, t, n, a) {
  if (!e.length) return !0;
  const s = Fs(a);
  return e.some((l) => {
    const o = /* @__PURE__ */ new Map();
    for (const i of l)
      qn(i) && o.set(
        i.field,
        (o.get(i.field) ?? !1) || Hn(i, t, n, s)
      );
    return l.every(
      (i) => qn(i) ? o.get(i.field) === !0 : Hn(i, t, n, s)
    );
  });
}
function Vn(e) {
  return /[\s"']/.test(e) ? `"${e.replace(/["']/g, "")}"` : e;
}
function _e(e) {
  const t = e.negated ? "-" : "";
  return e.kind === "text" ? t + Vn(e.value) : `${t}${e.field}${e.comparator}${Vn(e.value)}`;
}
function Ds(e) {
  if (!e.negated) return { ...e, negated: !0 };
  const { negated: t, ...n } = e;
  return n;
}
function he(e) {
  return e.filter((t) => t.length).map((t) => t.map(_e).join(" ")).join(" OR ");
}
function Ks(e, t, n) {
  return e.map((a, s) => s === t ? a.filter((l, o) => o !== n) : a).filter((a) => a.length);
}
function gu(e) {
  const t = le(e);
  if (t.length > 1) return { parts: [], text: e.trim() };
  const n = t[0] ?? [];
  return {
    parts: n.filter((a) => a.kind === "field"),
    text: n.filter((a) => a.kind === "text").map(_e).join(" ")
  };
}
function _u(e, t) {
  return [...e.map(_e), t.trim()].filter(Boolean).join(" ");
}
const Dn = (e, t) => e.toLowerCase() === t.toLowerCase();
function nt(e, t) {
  return !!e.negated == !!t.negated && ma(e, t);
}
function Ws(e, t) {
  return !!e.negated != !!t.negated && ma(e, t);
}
function ma(e, t) {
  return e.kind === "field" ? t.kind === "field" && e.field === t.field && e.comparator === t.comparator && Dn(e.value, t.value) : t.kind === "text" && Dn(e.value, t.value);
}
function zs(e, t) {
  return t.filter((n) => !e.some((a) => nt(a, n)));
}
function pn(e, t) {
  return ya(e, t, (n) => n);
}
function at(e, t) {
  return ya(
    e,
    t,
    (n, a) => n.filter((s) => !a.some((l) => Ws(s, l)))
  );
}
const js = /^[A-Za-z_][\w.-]*\s*(?:>=|<=|:|=|>|<)$/;
function Us(e) {
  return he(
    le(e).map(
      (t) => t.filter(
        (n) => n.kind !== "text" || n.value !== "-" && !js.test(n.value)
      )
    ).filter((t) => t.length > 0)
  );
}
function ya(e, t, n) {
  const a = le(e), s = le(t);
  return a.length ? s.length ? he(
    a.flatMap(
      (l) => s.map((o) => [...n(l, o), ...zs(l, o)])
    )
  ) : he(a) : he(s);
}
const ga = (e) => e.kind === "date" || e.role === "updated";
function Qs(e) {
  if (!e) return () => 0;
  const n = (e.kind ?? "text") === "number" || e.role === "metric", a = ga(e);
  return (s, l) => {
    const o = ue(e, s), i = ue(e, l);
    return n ? Number(i ?? 0) - Number(o ?? 0) : a ? Date.parse(String(i ?? "")) - Date.parse(String(o ?? "")) : String(i ?? "").localeCompare(String(o ?? ""));
  };
}
function Kn(e, t) {
  return !t || !ga(t) ? !1 : !Number.isFinite(Date.parse(String(ue(t, e) ?? "")));
}
function _a({ query: e, schema: t, entity: n, limit: a, offset: s }, l, o) {
  const i = le(e.expr), r = n ? [n] : t.entities;
  let c = 0;
  const d = [];
  for (const k of r)
    for (const P of l(k))
      c += 1, Vs(i, P, k, t) && d.push(P);
  const v = Ee(n, e.sort, t), g = oa(n, t).find((k) => k.sort === v.key), y = o.undatedLast ? d.filter((k) => !Kn(k, g)) : d, _ = o.undatedLast ? d.filter((k) => Kn(k, g)) : [];
  y.sort(Qs(g)), e.dir === "asc" && y.reverse();
  const p = _.length ? [...y, ..._] : y;
  return {
    // One page out of the middle. `total` stays the whole match, which is what
    // the shell counts pages with.
    rows: o.zeroIsAll && a <= 0 ? p.slice(s) : p.slice(s, s + a),
    total: d.length,
    unfiltered: d.length === c
  };
}
const gt = [
  "oklch(0.36 0.06 240)",
  "oklch(0.34 0.07 290)",
  "oklch(0.36 0.06 160)",
  "oklch(0.38 0.06 80)",
  "oklch(0.35 0.07 30)",
  "oklch(0.34 0.05 200)"
];
function wu(e) {
  return gt[Ge(e) % gt.length];
}
function wa(e, t) {
  return `${e}_${1e4 + t * 7}`;
}
const Gs = 7, Ys = 3;
function Xs(e, t, n, a) {
  const s = (t * Gs + Ge(n)) % a, l = [];
  for (let o = 0; o < Math.min(Ys, a); o++)
    l.push(wa(e, (s + o) % a));
  return l;
}
function Js(e, t) {
  switch (e.kind) {
    case "chips":
      return e.multiple ? Zs(e.options, t) : e.options[t % e.options.length] ?? "";
    case "range": {
      const n = Math.max(0, e.max - e.min);
      return e.min + (n === 0 ? 0 : t % (n + 1));
    }
    case "toggle":
      return t % 3 === 0;
  }
}
function Zs(e, t) {
  if (!e.length) return [];
  const n = 1 + (t >> 5) % Math.min(3, e.length), a = t % e.length, s = /* @__PURE__ */ new Set();
  for (let l = 0; l < n; l++) s.add((a + l) % e.length);
  return [...s].sort((l, o) => l - o).map((l) => e[l]);
}
function el(e, t) {
  const { hash: n, sample: a, revision: s, updatedAt: l } = t, o = s ? ` · rev ${s + 1}` : "";
  switch (e.role) {
    case "identity":
      return `${a[0]}${o}`;
    case "reference":
      return s ? `${a[1]}-${s + 1}` : a[1];
    case "state":
      return Qe[n % Qe.length];
    case "updated":
      return l;
    case "tint":
      return gt[n % gt.length];
    case "metric":
      return 1 + n % 940;
  }
  switch (e.kind) {
    case "number":
      return 1 + n % 940;
    case "status":
      return Qe[n % Qe.length];
    case "date":
      return l;
    default:
      return;
  }
}
function tl(e, t = {}) {
  const n = t.population ?? 48, a = t.seed ?? "", s = t.now ?? /* @__PURE__ */ new Date("2026-08-25T00:00:00Z"), l = e.samples, o = t.scopes ?? [];
  if (!l.length) return [];
  const i = [];
  for (let r = 0; r < n; r++) {
    const c = l[r % l.length], d = Math.floor(r / l.length), v = Ge(`${a}:${e.key}:${c[0]}:${r}`), g = wa(e.key, r), y = new Date(s.getTime() - v % 900 * 36e5).toISOString(), _ = {};
    for (const p of e.columns ?? []) {
      const k = p.field ?? p.key;
      if (!k || p.value) continue;
      const P = el(p, {
        hash: Ge(`${v}:${k}`),
        sample: c,
        revision: d,
        updatedAt: y
      });
      P !== void 0 && (_[k] = P);
    }
    for (const p of e.facets)
      _[p.key] = Js(p, Ge(`${v}:${p.key}`));
    for (const [p, k] of o)
      _[p] = k === e.key ? g : Xs(k, r, p, n);
    i.push({ id: g, entityKey: e.key, entityLabel: e.label, fields: _ });
  }
  return i;
}
function nl(e = {}) {
  const t = /* @__PURE__ */ new Map(), n = (a, s) => {
    const l = t.get(a.key);
    if (l) return l;
    const o = e.scopes ?? s.entities.flatMap(
      (r) => r.scope ? [[r.scope, r.key]] : []
    ), i = tl(a, { ...e, scopes: o });
    return t.set(a.key, i), i;
  };
  return {
    query(a) {
      return _a(a, (s) => n(s, a.schema), {
        undatedLast: !1,
        zeroIsAll: !1
      });
    }
  };
}
const ze = "e", At = "v", hn = "s", mn = "d", Ie = "q", It = "p", ka = "*", al = [
  ze,
  At,
  hn,
  mn,
  Ie,
  It
], sl = [
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
function _t(e) {
  let t = encodeURIComponent(e);
  for (const [n, a] of sl) t = t.replace(n, a);
  return t;
}
function ge(e) {
  try {
    return decodeURIComponent(e.replace(/\+/g, " "));
  } catch {
    return e.replace(/\+/g, " ");
  }
}
function yn(e) {
  const t = e.replace(/^[?]/, "");
  if (!t) return [];
  const n = [];
  for (const a of t.split("&")) {
    if (!a) continue;
    const s = a.indexOf("="), l = s === -1 ? a : a.slice(0, s), o = s === -1 ? "" : a.slice(s + 1);
    n.push([ge(l), o]);
  }
  return n;
}
function ll(e) {
  return al.includes(e);
}
function Rt(e, t) {
  if (!(!t || e.some((n) => n.key === t)))
    return e.find((n) => ct(n.label) === t);
}
function rl(e, t) {
  const n = ct(e.label);
  return Rt(t.entities, n)?.key === e.key ? n : e.key;
}
function ba(e, t) {
  return t ? et(e, t) ?? Rt(e.entities, t) ?? null : null;
}
function ol(e, t) {
  const n = ct(e.label);
  return Rt(t, n)?.key === e.key ? n : e.key;
}
function il(e, t) {
  return t.some((n) => n.key === e) ? e : Rt(t, e)?.key ?? e;
}
function cl(e, t, n = {}) {
  const a = yt(t, n), s = new Map(yn(e)), l = s.get(ze), o = l === void 0 ? a.entity : ge(l), i = o === ka ? null : ba(t, o), r = s.get(At), c = r && la(ge(r)) ? ge(r) : Ze(i?.key ?? null, n), d = s.get(hn), v = Ee(
    i,
    d ? il(ge(d), Tt(i, t)) : n.sort,
    t
  ), g = s.get(mn), y = g ? ge(g) === "asc" ? "asc" : "desc" : a.dir, _ = s.get(Ie), p = s.get(It), k = p === void 0 ? 1 : Number(ge(p)), P = Number.isFinite(k) ? Math.max(1, Math.floor(k)) : 1;
  return {
    entity: i?.key ?? null,
    view: c,
    sort: v.key,
    dir: y,
    expr: _ === void 0 ? "" : tt(ge(_), i, t),
    page: P
  };
}
function Wn(e, t, n = {}, a = "") {
  const s = yt(t, n), l = et(t, e.entity), o = yn(a).filter(([v]) => !ll(v)), i = [], r = (v, g) => i.push([v, _t(g)]), c = l?.key ?? null;
  if (c !== s.entity && r(ze, l ? rl(l, t) : ka), e.view !== Ze(c, n) && r(At, e.view), e.sort !== s.sort) {
    const v = Tt(l, t), g = v.find((y) => y.key === e.sort);
    r(hn, g ? ol(g, v) : e.sort);
  }
  e.dir !== s.dir && r(mn, e.dir), e.expr.trim() !== "" && r(Ie, fa(e.expr, l, t)), e.page > 1 && r(It, String(e.page));
  const d = [
    ...o.map(([v, g]) => [_t(v), g]),
    ...i
  ];
  return d.length ? `?${d.map(([v, g]) => g === "" ? v : `${v}=${g}`).join("&")}` : "";
}
function ku(e) {
  const t = [];
  for (const [n, a] of Object.entries(e))
    for (const s of Array.isArray(a) ? a : [a]) {
      if (typeof s != "string") continue;
      const l = _t(n);
      t.push(s === "" ? l : `${l}=${_t(s)}`);
    }
  return t.length ? `?${t.join("&")}` : "";
}
function bu(e, t) {
  const n = new Map(yn(e)), a = n.get(Ie), s = a === void 0 ? "" : ge(a);
  if (!t) return s;
  const l = n.get(ze);
  return tt(
    s,
    l === void 0 ? null : ba(t, ge(l)),
    t
  );
}
function ut(e, t) {
  return $a(e, t.id);
}
function $a(e, t) {
  const n = e?.scope;
  return n ? xa(n, t) : null;
}
function xa(e, t) {
  return `${e}="${t.replace(/"/g, "")}"`;
}
function $u(e, t) {
  const n = typeof e == "string" ? e : e?.scope;
  if (!n) return null;
  const a = t.filter((s) => s.replace(/"/g, "") !== "").map((s) => xa(n, s));
  return a.length ? a.join(" ") : null;
}
function Bt(e, t) {
  if (e.kind !== "field" || t.kind !== "field") return nt(e, t);
  const n = (a) => a.comparator === ":" || a.comparator === "=";
  return nt(e, { ...t, comparator: n(e) && n(t) ? e.comparator : t.comparator });
}
function wt(e, t) {
  return Bt(e, Ds(t));
}
function kt(e, t) {
  return ut(
    e.entities.find((n) => n.key === t.entityKey),
    t
  );
}
function dt(e, t) {
  if (!t) return e;
  const n = e.trim();
  if (!n) return t;
  const [a] = le(t).flat();
  if (!a) return n;
  const s = le(n);
  return s.some((i) => i.some((r) => Bt(r, a))) ? n : s.some((i) => i.some((r) => wt(r, a))) ? he(
    s.map(
      (i) => i.map((r) => wt(r, a) ? a : r)
    )
  ) : `${n} ${t}`;
}
function Sa(e) {
  if (!e) return null;
  const t = e.trim();
  return t ? t.startsWith("-") ? t.slice(1) : `-${t}` : null;
}
function gn(e, t) {
  if (!t || !e.trim()) return null;
  const [n] = le(t).flat();
  if (!n) return null;
  const a = le(e).flat();
  return a.some((s) => Bt(s, n)) ? n.negated ? "out" : "in" : a.some((s) => wt(s, n)) ? n.negated ? "in" : "out" : null;
}
function Ca(e, t) {
  if (!t || !e.trim()) return e;
  const [n] = le(t).flat();
  if (!n) return e;
  const a = le(e), s = a.map(
    (l) => l.filter((o) => !Bt(o, n) && !wt(o, n))
  );
  return s.every((l, o) => l.length === a[o]?.length) ? e : he(s);
}
function Jt(e, t, n) {
  return t ? n === null ? Ca(e, t) : dt(e, n === "out" ? Sa(t) : t) : e;
}
function Zt(e, t) {
  const n = t.shiftKey ? `noopener,popup,width=${window.outerWidth},height=${window.outerHeight}` : "noopener";
  window.open(e, "_blank", n);
}
function Pa() {
  const e = window.getSelection?.();
  return !!e && !e.isCollapsed;
}
function en(e) {
  return e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0;
}
function st(e) {
  return e.altKey ? { exclude: !0 } : {};
}
function zt(e, t, n, a = {}, s) {
  const l = kt(e, n);
  return ul(dt(t.expr, a.exclude ? Sa(l) : l), s);
}
function ul(e, t) {
  const n = t?.trim() ? le(t).flat() : [];
  if (!n.length) return e;
  const a = new Set(n.flatMap((i) => i.kind === "field" ? [i.field] : [])), s = (i) => i.kind === "field" && !i.negated && (i.comparator === ":" || i.comparator === "=") && a.has(i.field), l = e.trim(), o = l ? le(l) : [[]];
  if (o.length === 1 && !o[0].some(s)) {
    const i = n.filter((r) => !o[0].some((c) => nt(c, r)));
    return [l, ...i.map(_e)].filter(Boolean).join(" ");
  }
  return he(
    o.map((i) => {
      const r = i.filter((c) => !s(c));
      return [...r, ...n.filter((c) => !r.some((d) => nt(d, c)))];
    })
  );
}
function Ea(e, t) {
  const n = e?.scope?.toLowerCase();
  if (!n || e?.keepsScope || !t.trim()) return t;
  const a = le(t), s = a.map(
    (l) => l.filter((o) => o.kind !== "field" || o.field !== n)
  );
  return s.every((l, o) => l.length === a[o]?.length) ? t : he(s);
}
function Ma(e, t) {
  const n = t.toLowerCase();
  return e.entities.find((a) => a.scope?.toLowerCase() === n) ?? null;
}
function La(e, t, n) {
  if (!t || !n) return null;
  const a = Ma(e, t);
  return a ? { entity: a, id: n } : null;
}
function dl(e, t) {
  const n = [], a = /* @__PURE__ */ new Set();
  for (const s of t)
    for (const l of le(s).flat()) {
      if (l.kind !== "field" || l.negated) continue;
      const o = La(e, l.field, l.value);
      if (!o) continue;
      const i = `${o.entity.key}:${o.id.toLowerCase()}`;
      a.has(i) || (a.add(i), n.push({ entityKey: o.entity.key, id: o.id }));
    }
  return n;
}
function xu(e, t, n = "cards") {
  return {
    // An expression with nothing in it is no parameter, as the shell writes it.
    [Ie]: dt(e, t) || void 0,
    [ze]: void 0,
    [At]: n,
    [It]: void 0
  };
}
const Ta = Symbol("dc.shellContext");
function fl(e) {
  const t = e.liveQuery ? e : vl(e);
  return on(Ta, t), t;
}
function vl(e) {
  const t = e.draft ?? H("");
  return {
    draft: t,
    liveQuery: e.query,
    drafting: f(() => !1),
    commitDraft() {
      const n = t.value.trim();
      n && (e.setExpression(
        at(e.query.value.expr, tt(n, e.entity.value, e.schema.value))
      ), t.value = "");
    },
    abandonDraft() {
      t.value = "";
    },
    ...e
  };
}
function ee() {
  const e = rn(Ta, null);
  if (!e)
    throw new Error(
      "[appfr] No shell context found. Render this component inside <DataShell>."
    );
  return e;
}
const bt = Symbol("dc-shell-theme");
function tn(e) {
  return {
    read: () => ({
      theme: Le(e.theme),
      accent: Le(e.accent),
      tokens: Le(e.tokens)
    })
  };
}
function pl(e, t) {
  t ? t.provide(bt, tn(e)) : on(bt, tn(e));
}
function hl(e) {
  const t = ta();
  on(bt, {
    ...tn(e),
    element: () => t?.proxy?.$el ?? null
  });
}
function _n(e) {
  const t = ta(), n = rn(bt, null), a = me(null);
  function s() {
    const r = t?.proxy?.$el, d = (r instanceof Element ? r : r?.parentElement)?.closest(".dc-shell");
    if (!d) {
      a.value = null;
      return;
    }
    const v = {};
    for (const g of Array.from(d.style))
      g.startsWith("--") && (v[g] = d.style.getPropertyValue(g));
    a.value = { shell: d, theme: d.dataset.dcTheme, tokens: v };
  }
  const l = f(() => {
    const r = a.value;
    if (!n) return r;
    const c = n.element?.();
    return r && c && r.shell !== c && c.contains(r.shell) ? r : n.read();
  }), o = f(() => e.theme ?? l.value?.theme ?? "minimal"), i = f(() => {
    const r = l.value, c = {
      ...r?.tokens,
      ...r?.accent ? { "--dc-accent": r.accent } : {},
      ...e.tokens,
      ...e.accent ? { "--dc-accent": e.accent } : {}
    };
    return Object.keys(c).length ? c : void 0;
  });
  return { theme: o, style: i, adopt: s };
}
function lt(e) {
  return e.key.toLowerCase();
}
const ml = /* @__PURE__ */ new Set([">", ">=", "<", "<="]);
function Oa(e, t) {
  if (e.kind !== "field" || e.negated || e.field !== lt(t)) return !1;
  const n = e.comparator === ":" || e.comparator === "=";
  switch (t.kind) {
    case "range":
      return Ke(e) || ml.has(e.comparator);
    case "chips":
      return n && !Ke(e) && Na(t.options, e.value) !== void 0;
    case "toggle":
      return n && yl(e.value);
  }
}
function Na(e, t) {
  const n = t.toLowerCase();
  return e.find((a) => a.toLowerCase() === n);
}
function yl(e) {
  const t = e.toLowerCase();
  return t === "true" || t === "yes";
}
function Aa(e, t) {
  const n = (le(e)[0] ?? []).filter((a) => Oa(a, t));
  switch (t.kind) {
    case "range": {
      let a = null, s = null;
      for (const l of n) {
        const o = Ot(l.value), i = Number(l.value);
        o ? (o.min !== null && (a = o.min), o.max !== null && (s = o.max)) : Number.isFinite(i) && (l.comparator.startsWith(">") ? a = i : s = i);
      }
      return { kind: "range", min: a, max: s };
    }
    case "chips": {
      const a = new Set(n.map((s) => Na(t.options, s.value)));
      return { kind: "chips", selected: t.options.filter((s) => a.has(s)) };
    }
    case "toggle":
      return { kind: "toggle", on: n.length > 0 };
  }
}
function gl(e, t) {
  const n = lt(e);
  switch (t.kind) {
    case "range":
      return t.min === null && t.max === null ? [] : [{ kind: "field", field: n, comparator: ":", value: Ns(t) }];
    case "chips":
      return t.selected.map((a) => ({ kind: "field", field: n, comparator: "=", value: a }));
    case "toggle":
      return t.on ? [{ kind: "field", field: n, comparator: ":", value: "true" }] : [];
  }
}
function Ia(e, t, n) {
  const a = gl(t, n), s = le(e), l = (s.length ? s : [[]]).map((o) => [
    ...o.filter((i) => !Oa(i, t)),
    ...a
  ]);
  return he(l);
}
function Su(e, t) {
  return Ia(e, t, bs(t));
}
function _l(e, t) {
  return (t?.facets ?? []).some((n) => $s(Aa(e, n)));
}
const $t = "entity", rt = "expr", wl = { ">=": "≥", "<=": "≤", ">": ">", "<": "<" };
function je(e) {
  const t = Number(e);
  return Number.isFinite(t) && !Number.isInteger(t) ? Lt(t) : String(e);
}
function kl(e, t, n) {
  if (e.kind !== "field") return _e(e);
  const a = Bs(e.field, t, n);
  if (a === void 0) return _e(e);
  const s = e.negated ? "-" : "", l = Ke(e) ? Ot(e.value) : null;
  if (l) {
    const i = l.min !== null && l.max !== null ? `${je(l.min)} ≤ ${a} ≤ ${je(l.max)}` : l.max !== null ? `${a} ≤ ${je(l.max)}` : `${a} ≥ ${je(l.min)}`;
    return s + i;
  }
  const o = wl[e.comparator];
  return o ? `${s}${a} ${o} ${je(e.value)}` : _e({ ...e, field: a });
}
function xt(e, t, n = null) {
  const a = [];
  return t && a.push({
    id: $t,
    label: `entity:${t.key}`,
    facetKey: $t
  }), le(e.expr).forEach((s, l) => {
    s.forEach((o, i) => {
      a.push({
        id: `${rt}:${l}:${i}`,
        label: kl(o, t, n),
        address: fa(_e(o), t, n),
        facetKey: rt,
        group: l,
        index: i,
        ...o.kind === "field" ? { field: o.field, value: o.value } : {},
        ...o.negated ? { negated: !0 } : {}
      });
    });
  }), a;
}
function bl(e, t, n = null) {
  if (dn(e)) {
    const l = Ee(t, e.sort, n);
    return `everything · ${e.view} · ${l.label}`;
  }
  const a = xt(e, t).filter((l) => l.facetKey !== rt).map((l) => l.label), s = e.expr.trim();
  return s && a.push(`"${s}"`), a.join(" · ");
}
function $l(e) {
  const { adapter: t } = e, n = f(() => Le(e.schema)), a = f(() => Le(e.defaults) ?? {}), s = f(() => cl(t.search.value, n.value, a.value)), l = f(() => et(n.value, s.value.entity)), o = f(() => l.value ?? ra(n.value, a.value)), i = f(() => Tt(l.value, n.value)), r = f(() => Ee(l.value, s.value.sort, n.value)), c = (x, m) => {
    const b = Wn(x, n.value, a.value, t.search.value);
    return b === t.search.value && !t.elsewhere?.value ? !1 : (m === "push" ? t.push(b) : t.replace(b), !0);
  }, d = () => Le(e.navigationMode) ?? "push", v = () => Le(e.facetNavigationMode) ?? "replace", g = (x, m) => {
    const b = x.page ?? (Kt(x) ? 1 : s.value.page);
    return c({ ...s.value, ...x, page: b }, m);
  }, y = (x) => {
    const m = x.page ?? (Kt(x) ? 1 : s.value.page);
    return _({ ...s.value, ...x, page: m });
  }, _ = (x) => {
    const m = Wn(x, n.value, a.value, t.search.value);
    return t.href ? t.href(m) : `${t.path.value}${m}`;
  }, p = (x, m) => {
    const b = l.value?.facets.find((F) => F.key === x);
    if (!b) return;
    const T = Ia(s.value.expr, b, m(Aa(s.value.expr, b)));
    g({ expr: T }, v());
  }, k = (x) => {
    const m = x === null ? null : et(n.value, x);
    return (m?.key ?? null) === s.value.entity ? {} : {
      entity: m?.key ?? null,
      view: Ln(s.value.view, s.value.entity, m?.key ?? null, a.value),
      sort: Ee(m, s.value.sort, n.value).key
    };
  }, P = (x) => {
    const m = k(x);
    Object.keys(m).length && g(m, d());
  };
  return {
    query: s,
    entity: l,
    focus: o,
    sort: r,
    sorts: i,
    summary: f(() => bl(s.value, l.value, n.value)),
    terms: f(() => xt(s.value, l.value, n.value)),
    isPristine: f(() => dn(s.value)),
    isEverything: f(() => s.value.entity === null),
    hasFacets: f(() => _l(s.value.expr, l.value)),
    setEntity: P,
    entityHref: (x) => y(k(x)),
    clearEntity: () => P(null),
    setView(x, m) {
      g(m === void 0 ? { view: x } : { view: x, page: Math.max(1, Math.floor(m)) }, d());
    },
    setSort(x) {
      g({ sort: Ee(l.value, x, n.value).key }, d());
    },
    toggleDirection() {
      g({ dir: s.value.dir === "desc" ? "asc" : "desc" }, d());
    },
    setExpression(x) {
      return g({ expr: x }, d());
    },
    narrow(x, m, b) {
      return g({ expr: x, ...k(m), ...b ? { view: b } : {} }, d());
    },
    narrowHref(x, m, b) {
      return y({ expr: x, ...k(m), ...b ? { view: b } : {} });
    },
    setPage(x, m) {
      g({ page: Math.max(1, Math.floor(x)) }, m ?? d());
    },
    setFacet(x, m) {
      p(x, () => m);
    },
    toggleChip(x, m) {
      p(x, (b) => b.kind !== "chips" ? b : { kind: "chips", selected: b.selected.includes(m) ? b.selected.filter((F) => F !== m) : [...b.selected, m] });
    },
    setRange(x, m, b) {
      p(x, (T) => T.kind === "range" ? { kind: "range", min: m, max: b } : T);
    },
    toggleFlag(x) {
      p(
        x,
        (m) => m.kind === "toggle" ? { kind: "toggle", on: !m.on } : m
      );
    },
    removeTerm(x) {
      if (x.facetKey === $t) {
        P(null);
        return;
      }
      if (x.facetKey === rt) {
        const m = Ks(le(s.value.expr), x.group ?? 0, x.index ?? 0);
        g({ expr: he(m) }, d());
      }
    },
    clearFilters() {
      g({ ...k(null), expr: "" }, d());
    },
    clearHref: () => y({ ...k(null), expr: "" }),
    reset() {
      c(yt(n.value, a.value), d());
    },
    homeHref: () => _(yt(n.value, a.value)),
    hrefFor(x) {
      const m = { ...s.value, ...x };
      return "entity" in x && !("view" in x) && (m.view = Ln(s.value.view, s.value.entity, m.entity, a.value)), m.page = x.page ?? (Kt(x) ? 1 : s.value.page), _(m);
    }
  };
}
const zn = 50;
function xl(e) {
  const t = me([]), n = H(0), a = H(0), s = H(!1), l = H(!1), o = me(null);
  let i = 0, r = null, c = null;
  const d = f(() => (e.query.value.page - 1) * e.limit.value), v = f(() => xs(n.value, e.limit.value)), g = f(() => Math.max(0, n.value - a.value)), y = () => {
    const O = e.query.value, B = e.within?.value.trim(), z = Ea(e.entity.value, O.expr);
    return B ? { ...O, expr: pn(B, z) } : z === O.expr ? O : { ...O, expr: z };
  }, _ = (O, B) => {
    t.value = O.rows, n.value = O.total, a.value = O.kept ?? 0, o.value = null, p(B);
  }, p = (O) => {
    r = { key: O, total: n.value }, l.value = !1;
  }, k = (O) => {
    o.value = O, t.value = [], n.value = 0, a.value = 0, r = null, l.value = !1;
  }, P = (O, B, z, ae) => {
    let oe = !0;
    const te = () => O === i;
    let ce = 0, L = !1;
    const Q = (j) => {
      ce = j, L = !0, ae === void 0 && (n.value = j);
    }, N = () => {
      oe && (oe = !1, t.value = [], a.value = 0, Q(0)), o.value = null;
    };
    return {
      get open() {
        return te();
      },
      insert(j, ve) {
        if (!te()) return;
        const be = Array.isArray(j) ? j : [j];
        if (!be.length) return;
        N();
        const ye = [...t.value];
        ye.splice(ve ?? ye.length, 0, ...be), t.value = B > 0 ? ye.slice(0, B) : ye, Q(ce + be.length);
      },
      set(j) {
        te() && (j.rows && (N(), t.value = B > 0 ? j.rows.slice(0, B) : j.rows, Q(j.rows.length)), j.total !== void 0 && Q(j.total));
      },
      close() {
        te() && (s.value = !1, L && (n.value = ce), p(z));
      },
      fail(j) {
        te() && (k(j), s.value = !1);
      }
    };
  }, x = () => {
    const O = c;
    c = null, O?.();
  }, m = () => {
    const O = ++i;
    x();
    const B = b.value, z = r?.key === B ? r.total : void 0;
    l.value = z === void 0;
    const ae = {
      query: y(),
      schema: e.schema.value,
      entity: e.entity.value,
      limit: e.limit.value,
      offset: d.value
    }, oe = e.source.value;
    if (oe.stream) {
      s.value = !0;
      try {
        c = oe.stream(ae, P(O, ae.limit, B, z)) ?? null;
      } catch (ce) {
        k(ce), s.value = !1;
      }
      return;
    }
    let te;
    try {
      te = oe.query(ae);
    } catch (ce) {
      k(ce);
      return;
    }
    if (!(te instanceof Promise)) {
      _(te, B), s.value = !1;
      return;
    }
    s.value = !0, te.then((ce) => {
      O === i && _(ce, B);
    }).catch((ce) => {
      O === i && k(ce);
    }).finally(() => {
      O === i && (s.value = !1);
    });
  }, b = f(() => {
    const O = y();
    return `${e.entity.value?.key ?? e.schema.value.entities[0]?.key ?? ""}|${JSON.stringify(fn.map((z) => O[z]))}`;
  }), T = f(() => `${b.value}|${e.query.value.page}`);
  return ne([e.source, T, e.limit], m, {
    immediate: !0
  }), Ct(() => {
    i++, x();
  }, !0), { rows: t, total: n, matched: g, offset: d, pageCount: v, pending: s, counting: l, error: o, refresh: m, locate: async (O, B) => {
    const z = Math.max(0, B - 1 - zn);
    try {
      const { rows: ae } = await e.source.value.query({
        query: y(),
        schema: e.schema.value,
        entity: e.entity.value,
        limit: zn * 2 + 1,
        offset: z
      }), oe = ae.findIndex((te) => te.id === O);
      return oe === -1 ? null : z + oe + 1;
    } catch {
      return null;
    }
  }, peek: async (O, B) => {
    if (B <= 0) return [];
    try {
      const { rows: z } = await e.source.value.query({
        query: y(),
        schema: e.schema.value,
        entity: e.entity.value,
        limit: B,
        offset: Math.max(0, O)
      });
      return z;
    } catch {
      return [];
    }
  } };
}
function Sl(e) {
  const t = me(null);
  let n = 0;
  const a = () => {
    const i = e.rows.value[0];
    t.value = i && !e.pending.value ? { id: i.id, page: e.page.value, list: e.list.value, gone: !1 } : null;
  }, s = () => {
    const i = t.value;
    if (!e.active.value) {
      t.value = null;
      return;
    }
    if (!i || i.page !== e.page.value || i.list !== e.list.value) {
      a();
      return;
    }
    if (e.pending.value) return;
    const r = e.rows.value[0];
    if (r?.id === i.id) {
      i.gone && (t.value = { ...i, gone: !1, next: void 0 });
      return;
    }
    (!i.gone || r?.id !== i.next) && l(i);
  }, l = async (i) => {
    const r = ++n, c = await e.locate(i.id, i.page), d = c === null && i.next ? await e.locate(i.next, i.page) : null;
    if (r !== n || t.value?.id !== i.id || t.value.page !== i.page) return;
    const v = e.rows.value[0]?.id;
    c !== null ? o(c, !1) : d === null ? t.value = { ...i, gone: !0, next: v } : d !== i.page && o(d);
  }, o = (i, r = t.value?.gone ?? !1) => {
    t.value && (t.value = { ...t.value, page: i, gone: r }, e.moveTo(i));
  };
  return ne([e.active, e.rows, e.pending, e.page, e.list], s, {
    immediate: !0,
    flush: "post"
  }), {
    id: f(() => t.value?.id ?? null),
    gone: f(() => t.value?.gone === !0),
    holding: f(() => t.value !== null),
    step(i) {
      const r = t.value;
      return !r?.gone || i < r.page ? i : i - 1 > r.page ? i - 1 : (a(), null);
    },
    moveTo: o
  };
}
const Cl = 150;
function Pl(e) {
  const t = e.delay ?? Cl, n = H(""), a = H("");
  let s = !1, l;
  const o = () => {
    clearTimeout(l), l = void 0;
  }, i = f(() => tt(Us(a.value), e.entity.value, e.schema?.value)), r = f(() => i.value.trim() !== ""), c = f(
    () => JSON.stringify([i.value, ...fn.map((y) => e.query.value[y])])
  ), d = me(null), v = f(() => {
    const y = e.query.value;
    if (!r.value) return y;
    const _ = d.value?.of === c.value ? d.value.page : 1;
    return { ...y, expr: at(y.expr, i.value), page: _ };
  });
  ne(n, (y) => {
    if (o(), !y.trim()) {
      s || (a.value = "");
      return;
    }
    s = !1, l = setTimeout(() => {
      l = void 0, a.value = n.value;
    }, t);
  }), ne(
    e.query,
    () => {
      s && (s = !1, a.value = "");
    },
    { flush: "sync" }
  );
  const g = (y) => {
    o(), s = !0, n.value = "", !y() && s && (s = !1, a.value = "");
  };
  return na() && Ct(o), {
    text: n,
    live: v,
    drafting: r,
    setPage(y) {
      d.value = { of: c.value, page: Math.max(1, Math.floor(y)) };
    },
    commit() {
      const y = n.value.trim();
      if (!y) return;
      const _ = at(
        e.query.value.expr,
        tt(y, e.entity.value, e.schema?.value)
      );
      a.value = y, g(() => e.setExpression(_));
    },
    abandon() {
      o(), s = !1, n.value = "", a.value = "";
    },
    release: g
  };
}
const El = 25, Ra = (e, t) => e.toLowerCase() === t.toLowerCase();
function Ml(e, t) {
  return e.find((n) => Ra(n.id, t));
}
function Ll(e) {
  const t = me(/* @__PURE__ */ new Map()), n = /* @__PURE__ */ new Set(), a = (i) => {
    if (i.facetKey !== rt) return null;
    const r = La(e.schema.value, i.field, i.value);
    return r ? { ...r, key: `${r.entity.key}:${r.id}` } : null;
  }, s = (i) => {
    const { entity: r, id: c } = i, d = e.query.value;
    return e.source.value.query({
      query: {
        ...d,
        entity: r.key,
        // The reference on its own. The rest of the query is about the rows on
        // screen, which are of another type entirely.
        expr: $a(r, c) ?? "",
        sort: Ee(r, d.sort, e.schema.value).key,
        page: 1
      },
      schema: e.schema.value,
      entity: r,
      limit: El,
      offset: 0
    });
  }, l = (i, r) => {
    const c = mt(pe(i.columns ?? [], "identity"), r);
    return c === ke || Ra(c, r.id) ? "" : c;
  }, o = () => {
    if (e.loading.value) return;
    const i = /* @__PURE__ */ new Map();
    for (const d of e.terms.value) {
      const v = a(d);
      v && !t.value.has(v.key) && !n.has(v.key) && i.set(v.key, v);
    }
    if (!i.size) return;
    const r = [...i.values()].map((d) => ({
      reference: d,
      outcome: s(d)
    })), c = (d) => {
      const v = new Map(t.value);
      d.forEach((g, y) => {
        const { reference: _ } = r[y], p = Ml(g.rows, _.id);
        v.set(_.key, p ? l(_.entity, p) : "");
      }), t.value = v;
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
  return ne([e.source, e.schema, e.terms, e.loading], () => {
    try {
      o();
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
const Tl = 4, Ol = 8, Nl = 180;
function Al(e, t, n, a = {}) {
  const s = a.gap ?? Tl, l = a.margin ?? Ol, o = a.flipBelow ?? Nl, i = a.side ?? "below", r = {
    below: n.height - e.bottom - s - l,
    above: e.top - s - l
  }, c = i === "below" ? "above" : "below", d = r[i] < o && r[c] > r[i] ? c : i, v = Math.min(a.maxHeight ?? 1 / 0, Math.max(0, r[d])), g = Math.max(0, n.width - l * 2), y = Math.min(a.minWidth ?? e.width, g), _ = Math.min(Math.max(t, y), g), p = a.align === "end" ? e.right - _ : e.left, k = Math.max(l, Math.min(p, n.width - _ - l));
  return d === "below" ? { side: d, left: k, top: e.bottom + s, maxHeight: v, minWidth: y, maxWidth: g } : { side: d, left: k, bottom: n.height - e.top + s, maxHeight: v, minWidth: y, maxWidth: g };
}
const Il = ["data-dc-theme", "data-dc-side"], Pe = [], Rl = /* @__PURE__ */ W({
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
    const n = e, a = t, { theme: s, style: l, adopt: o } = _n(n), i = H(null), r = H(null), c = { root: () => i.value };
    function d() {
      const m = n.anchor;
      m && (r.value = Al(
        m.getBoundingClientRect(),
        i.value?.offsetWidth ?? 0,
        { width: window.innerWidth, height: window.innerHeight },
        { side: n.side, align: n.align, maxHeight: n.maxHeight, minWidth: n.minWidth }
      ));
    }
    const v = f(() => {
      const m = r.value, b = m ? {
        position: "fixed",
        left: `${m.left}px`,
        ...m.top !== void 0 ? { top: `${m.top}px` } : {},
        ...m.bottom !== void 0 ? { bottom: `${m.bottom}px` } : {},
        minWidth: `${m.minWidth}px`,
        maxWidth: `${m.maxWidth}px`,
        maxHeight: `${m.maxHeight}px`,
        overflowY: "auto"
      } : { position: "fixed", visibility: "hidden" };
      return { ...l.value, ...b };
    });
    function g() {
      a("update:open", !1), a("close");
    }
    function y(m) {
      return i.value?.contains(m) || n.anchor?.contains(m) ? !0 : Pe.slice(Pe.indexOf(c) + 1).some((T) => T.root()?.contains(m));
    }
    function _(m) {
      const b = m.target;
      b && !y(b) && g();
    }
    function p(m) {
      m.key !== "Escape" || m.defaultPrevented || Pe[Pe.length - 1] === c && (m.preventDefault(), i.value?.contains(document.activeElement) && n.anchor?.focus(), g());
    }
    let k = null;
    async function P() {
      Pe.includes(c) || (Pe.push(c), o(), r.value = null, await Ye(), d(), window.addEventListener("pointerdown", _, !0), document.addEventListener("keydown", p, !0), window.addEventListener("resize", d), window.addEventListener("scroll", d, !0), typeof ResizeObserver < "u" && i.value && (k = new ResizeObserver(() => d()), k.observe(i.value)));
    }
    function x() {
      const m = Pe.indexOf(c);
      m !== -1 && (Pe.splice(m, 1), window.removeEventListener("pointerdown", _, !0), document.removeEventListener("keydown", p, !0), window.removeEventListener("resize", d), window.removeEventListener("scroll", d, !0), k?.disconnect(), k = null);
    }
    return it(() => {
      n.open && P();
    }), ne(
      () => n.open,
      (m) => {
        m ? P() : x();
      }
    ), ne(() => n.anchor, () => {
      n.open && d();
    }), we(x), (m, b) => e.open ? (u(), I(Pt, {
      key: 0,
      to: e.to
    }, [
      S("div", De({
        ref_key: "root",
        ref: i
      }, m.$attrs, {
        class: "dc-shell dc-layer dc-popover",
        "data-dc-theme": w(s),
        "data-dc-side": r.value?.side,
        style: v.value
      }), [
        Y(m.$slots, "default", {}, void 0, !0)
      ], 16, Il)
    ], 8, ["to"])) : M("", !0);
  }
}), U = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [a, s] of t)
    n[a] = s;
  return n;
}, Bl = /* @__PURE__ */ U(Rl, [["__scopeId", "data-v-a688f2f7"]]), Hl = ["href"], ql = /* @__PURE__ */ W({
  __name: "PressLink",
  props: {
    href: {},
    selectable: { type: Boolean }
  },
  emits: ["press"],
  setup(e, { emit: t }) {
    const n = e, a = t;
    function s(i) {
      i.stopPropagation(), !Pa() && (n.href && en(i) ? Zt(n.href, i) : a("press", st(i), i));
    }
    function l(i) {
      n.href && i.button === 1 && Zt(n.href, i);
    }
    function o(i) {
      if (n.href && en(i)) {
        i.stopPropagation();
        return;
      }
      i.preventDefault(), a("press", st(i), i);
    }
    return (i, r) => e.selectable ? (u(), h("span", {
      key: 0,
      role: "link",
      tabindex: "0",
      class: "dc-press",
      onClick: s,
      onAuxclick: l,
      onKeydown: r[0] || (r[0] = Te((c) => c.currentTarget.click(), ["enter"]))
    }, [
      Y(i.$slots, "default", {}, void 0, !0)
    ], 32)) : e.href ? (u(), h("a", {
      key: 1,
      href: e.href,
      class: "dc-press",
      onClick: o
    }, [
      Y(i.$slots, "default", {}, void 0, !0)
    ], 8, Hl)) : (u(), h("button", {
      key: 2,
      type: "button",
      class: "dc-press",
      onClick: o
    }, [
      Y(i.$slots, "default", {}, void 0, !0)
    ]));
  }
}), se = /* @__PURE__ */ U(ql, [["__scopeId", "data-v-e5165a68"]]), St = (e) => e.toLowerCase().replace(/\s+/g, ""), Fl = /(?:[^\s"]|"[^"]*"?)*$/, Vl = /^(-?)([^:=<>"\s-][^:=<>"\s]*)([:=])(.*)$/, jn = 4;
function Dl(e, t) {
  const n = St(t);
  return e.find((a) => lt(a) === n || St(a.label) === n);
}
function Kl(e) {
  switch (e.kind) {
    case "toggle":
      return e.text;
    case "range":
      return `${e.min}..${e.max}`;
    case "chips": {
      const t = e.options.slice(0, jn).join(" · "), n = e.options.length - jn;
      return n > 0 ? `${t} · +${n}` : t;
    }
  }
}
function Wl(e) {
  switch (e.kind) {
    case "toggle":
      return [{ value: "true", hint: e.text }, { value: "false" }];
    case "chips":
      return e.options.map((t) => ({ value: t }));
    case "range":
      return [];
  }
}
function Un(e, t) {
  return St(e).includes(St(t));
}
function zl(e, t) {
  const n = Fl.exec(e)?.[0] ?? "", a = e.slice(0, e.length - n.length), s = [], l = Vl.exec(n);
  if (l) {
    const [, o, i, r, c] = l, d = Dl(t, i);
    if (!d) return [];
    const v = c.replace(/"/g, "").toLowerCase();
    for (const { value: g, hint: y } of Wl(d)) {
      if (!g.toLowerCase().includes(v)) continue;
      const _ = _e({
        kind: "field",
        field: lt(d),
        comparator: r,
        value: g,
        ...o ? { negated: !0 } : {}
      });
      s.push({ draft: a + _, label: _, ...y ? { hint: y } : {}, complete: !0 });
    }
  } else {
    if (/[<>"]/.test(n)) return [];
    const o = n.startsWith("-") ? "-" : "", i = n.slice(o.length);
    for (const r of t) {
      if (i && !Un(r.key, i) && !Un(r.label, i)) continue;
      const c = `${o}${lt(r)}:`;
      s.push({ draft: a + c, label: c, hint: Kl(r), complete: !1 });
    }
  }
  return s.filter((o) => o.draft !== e);
}
const jl = { class: "dc-header" }, Ul = { class: "dc-header__main" }, Ql = {
  class: "dc-header__brand",
  "aria-hidden": "true"
}, Gl = { class: "dc-header__sr" }, Yl = {
  key: 2,
  class: "dc-header__within"
}, Xl = ["title"], Jl = { class: "dc-header__query" }, Zl = ["data-dc-more", "title"], er = { class: "dc-header__run" }, tr = {
  key: 0,
  class: "dc-header__or dc-mono",
  "aria-hidden": "true"
}, nr = ["title", "aria-label", "onClick"], ar = ["placeholder", "aria-expanded", "aria-activedescendant", "onKeydown"], sr = ["id", "aria-selected", "onClick"], lr = { class: "dc-completion__term dc-mono" }, rr = {
  key: 0,
  class: "dc-completion__hint"
}, or = {
  key: 0,
  class: "dc-header__actions"
}, ir = /* @__PURE__ */ W({
  __name: "ShellHeader",
  setup(e) {
    const t = Et(), n = ee(), a = f(() => n.schema.value), s = f(() => {
      const C = n.within.value.trim();
      return C ? xt({ ...n.query.value, expr: C }, null) : [];
    }), l = f(() => {
      const C = n.entity.value, A = C?.keepsScope ? void 0 : C?.scope?.toLowerCase();
      return n.terms.value.filter((q) => q.facetKey !== $t).map((q, V, qe) => {
        const Fe = qe[V - 1];
        return {
          term: q,
          or: Fe?.group !== void 0 && q.group !== void 0 && q.group !== Fe.group,
          idle: !!A && q.field?.toLowerCase() === A
        };
      });
    }), o = Ll({
      source: n.source,
      schema: n.schema,
      query: n.query,
      loading: n.loading,
      // The scope's parts as well as the query's: it names a record more often
      // than a typed term does, being what a record's own page is built on.
      terms: f(() => [...s.value, ...n.terms.value])
    });
    function i(C) {
      const A = Ma(a.value, C)?.scopeLabel ?? C;
      return A.charAt(0).toUpperCase() + A.slice(1);
    }
    function r(C) {
      return C.replace(/\s*\([^()]*\)\s*$/, "");
    }
    function c(C) {
      const A = o.nameOf(C);
      return A ? `${C.negated ? "-" : ""}${i(C.field)}: ${r(A)}` : C.label;
    }
    function d(C) {
      const A = c(C.term), q = C.idle ? `Not applied to ${n.entity.value?.label} — remove ${A}` : `Remove ${A}`, V = C.term.address;
      return V && V !== A ? `${q}
Written ${V} in the address and the search box` : q;
    }
    const v = f(() => {
      const C = n.pressPreview?.value;
      if (!C) return [];
      const A = n.query.value, q = new Set(n.terms.value.map((V) => V.address));
      return xt(
        { ...A, expr: at(A.expr, C.term) },
        n.entity.value,
        n.schema.value
      ).filter((V) => V.address !== void 0 && !q.has(V.address)).map(
        (V) => C.name ? `${i(V.field)}: ${r(C.name)}` : V.label
      );
    }), g = H(null);
    function y(C) {
      g.value = C instanceof HTMLInputElement ? C : null;
    }
    function _() {
      n.abandonDraft(), g.value?.blur();
    }
    function p() {
      const C = x.value[P.value];
      if (m.value && C) {
        T(C);
        return;
      }
      O.value = null, k.value = !1, n.commitDraft();
    }
    const k = H(!1), P = H(-1), x = f(() => {
      const C = n.entity.value?.facets ?? [];
      return C.length ? zl(n.draft.value, C) : [];
    }), m = f(() => k.value && x.value.length > 0);
    ne(x, () => {
      P.value = -1;
    });
    const b = `${Mt() ?? "dc-header"}-completions`;
    function T(C) {
      n.draft.value = C.draft, k.value = !C.complete, P.value = -1, Ye(() => {
        const A = g.value;
        A?.focus(), A?.setSelectionRange(C.draft.length, C.draft.length);
      });
    }
    function F(C, A) {
      if (C.isComposing || !x.value.length) return;
      if (C.preventDefault(), !k.value) {
        k.value = !0;
        return;
      }
      const q = x.value.length + 1;
      P.value = (P.value + 1 + A + q) % q - 1;
    }
    function ie(C) {
      return `${b}-${C}`;
    }
    const O = H(null), B = f(() => Math.min(O.value ?? 1 / 0, l.value.length)), z = f(() => [
      { key: "before", entries: l.value.slice(0, B.value) },
      { key: "after", entries: l.value.slice(B.value) }
    ]), ae = f(() => B.value < l.value.length);
    ne(l, (C) => {
      O.value !== null && O.value >= C.length && (O.value = null);
    });
    function oe(C, A) {
      O.value = C >= l.value.length ? null : Math.max(0, C), Ye(() => {
        const q = g.value;
        if (!q) return;
        const V = A === "start" ? 0 : q.value.length;
        q.setSelectionRange(V, V), q.scrollIntoView({ block: "nearest", inline: "nearest" }), Se();
      });
    }
    function te(C) {
      const A = g.value;
      return !A || A.selectionStart !== A.selectionEnd ? !1 : A.selectionStart === (C === "start" ? 0 : A.value.length);
    }
    function ce(C) {
      B.value === 0 || !te("start") || (C.preventDefault(), oe(C.key === "Home" ? 0 : B.value - 1, "start"));
    }
    function L(C) {
      !ae.value || !te("end") || (C.preventDefault(), oe(C.key === "End" ? l.value.length : B.value + 1, "end"));
    }
    function Q(C) {
      B.value === 0 || !te("start") || (C.preventDefault(), ve(l.value[B.value - 1].term, !0));
    }
    function N(C) {
      !ae.value || !te("end") || (C.preventDefault(), ve(l.value[B.value].term, !1));
    }
    function j(C) {
      C.isComposing || C.altKey || C.ctrlKey || C.metaKey || C.shiftKey || (C.key === "ArrowLeft" || C.key === "Home" ? ce(C) : C.key === "ArrowRight" || C.key === "End" ? L(C) : C.key === "Backspace" ? Q(C) : C.key === "Delete" && N(C));
    }
    function ve(C, A) {
      A && O.value !== null && (O.value = Math.max(0, O.value - 1)), n.removeTerm(C);
    }
    function be(C) {
      C.target?.closest("button, input") || (C.preventDefault(), g.value?.focus(), oe(l.value.length, "end"));
    }
    function ye() {
      k.value = !1, n.draft.value || (O.value = null);
    }
    const He = H(null), xe = H("");
    function Se() {
      const C = He.value;
      if (!C) {
        xe.value = "";
        return;
      }
      const A = C.scrollLeft > 1, q = C.scrollWidth - C.clientWidth - C.scrollLeft > 1;
      xe.value = A && q ? "both" : A ? "start" : q ? "end" : "";
    }
    let Ce = null;
    return ne(
      He,
      (C) => {
        Ce?.disconnect(), Ce = null, Se(), !(!C || typeof ResizeObserver > "u") && (Ce = new ResizeObserver(Se), Ce.observe(C));
      },
      { flush: "post" }
    ), ne([l, B], Se, { flush: "post" }), we(() => Ce?.disconnect()), (C, A) => (u(), h("div", jl, [
      S("div", Ul, [
        a.value.label && t.brand ? (u(), I(se, {
          key: 0,
          class: "dc-header__domain",
          "data-dc-brand": "",
          title: "Home",
          href: w(n).homeHref(),
          onPress: A[0] || (A[0] = (q) => w(n).reset())
        }, {
          default: X(() => [
            S("span", Ql, [
              Y(C.$slots, "brand", {
                label: a.value.label
              }, void 0, !0)
            ]),
            S("span", Gl, E(a.value.label), 1)
          ]),
          _: 3
        }, 8, ["href"])) : a.value.label ? (u(), I(se, {
          key: 1,
          class: "dc-header__domain",
          title: "Home",
          href: w(n).homeHref(),
          onPress: A[1] || (A[1] = (q) => w(n).reset())
        }, {
          default: X(() => [
            Z(E(a.value.label), 1)
          ]),
          _: 1
        }, 8, ["href"])) : M("", !0),
        Y(C.$slots, "lead", {}, void 0, !0),
        s.value.length ? (u(), h("span", Yl, [
          A[10] || (A[10] = S("span", { class: "dc-header__sr" }, "Within", -1)),
          (u(!0), h(K, null, J(s.value, (q) => (u(), h("span", {
            key: `scope:${q.id}`,
            class: "dc-within dc-mono dc-truncate",
            title: c(q)
          }, E(c(q)), 9, Xl))), 128))
        ])) : M("", !0),
        S("div", Jl, [
          S("div", {
            class: "dc-header__field",
            onMousedown: be
          }, [
            S("div", {
              ref_key: "termBar",
              ref: He,
              class: "dc-header__terms",
              "data-dc-more": xe.value,
              title: w(n).summary.value,
              onScroll: Se
            }, [
              (u(!0), h(K, null, J(z.value, (q) => (u(), h(K, {
                key: q.key
              }, [
                S("span", er, [
                  (u(!0), h(K, null, J(q.entries, (V) => (u(), h(K, {
                    key: V.term.id
                  }, [
                    V.or ? (u(), h("span", tr, "or")) : M("", !0),
                    S("button", {
                      type: "button",
                      class: de(["dc-term dc-mono", { "dc-term--idle": V.idle }]),
                      title: d(V),
                      "aria-label": `Remove ${c(V.term)}`,
                      onMousedown: A[2] || (A[2] = Oe(() => {
                      }, ["prevent"])),
                      onClick: (qe) => ve(V.term, q.key === "before")
                    }, E(c(V.term)), 43, nr)
                  ], 64))), 128)),
                  q.key === "before" ? (u(!0), h(K, { key: 0 }, J(v.value, (V) => (u(), h("span", {
                    key: V,
                    class: "dc-term dc-term--preview dc-mono",
                    "aria-hidden": "true"
                  }, E(V), 1))), 128)) : M("", !0)
                ]),
                q.key === "before" ? Ut((u(), h("input", {
                  key: 0,
                  ref_for: !0,
                  ref: y,
                  "onUpdate:modelValue": A[3] || (A[3] = (V) => w(n).draft.value = V),
                  class: de(["dc-header__search dc-mono", { "dc-header__search--between": ae.value }]),
                  style: re({ "--dc-typed": String(Math.max(1, w(n).draft.value.length)) }),
                  type: "text",
                  autocomplete: "off",
                  spellcheck: "false",
                  placeholder: ae.value ? "" : "Search…",
                  "aria-label": "Search",
                  role: "combobox",
                  "aria-autocomplete": "list",
                  "aria-expanded": m.value,
                  "aria-controls": b,
                  "aria-activedescendant": m.value && P.value >= 0 ? ie(P.value) : void 0,
                  onKeydown: [
                    Te(Oe(p, ["prevent"]), ["enter"]),
                    Te(Oe(_, ["prevent"]), ["esc"]),
                    A[4] || (A[4] = Te((V) => F(V, 1), ["down"])),
                    A[5] || (A[5] = Te((V) => F(V, -1), ["up"])),
                    j
                  ],
                  onFocus: A[6] || (A[6] = (V) => k.value = !0),
                  onInput: A[7] || (A[7] = (V) => k.value = !0),
                  onBlur: ye
                }, null, 46, ar)), [
                  [es, w(n).draft.value]
                ]) : M("", !0)
              ], 64))), 128))
            ], 40, Zl)
          ], 32)
        ])
      ]),
      G(Bl, {
        id: b,
        open: m.value,
        anchor: g.value,
        "min-width": 0,
        "max-height": 320,
        class: "dc-completions",
        role: "listbox",
        "aria-label": "Completions",
        onClose: A[9] || (A[9] = (q) => k.value = !1)
      }, {
        default: X(() => [
          (u(!0), h(K, null, J(x.value, (q, V) => (u(), h("div", {
            id: ie(V),
            key: q.label,
            class: de(["dc-completion", { "dc-completion--active": V === P.value }]),
            role: "option",
            "aria-selected": V === P.value,
            onMousedown: A[8] || (A[8] = Oe(() => {
            }, ["prevent"])),
            onClick: (qe) => T(q)
          }, [
            S("span", lr, E(q.label), 1),
            q.hint ? (u(), h("span", rr, E(q.hint), 1)) : M("", !0)
          ], 42, sr))), 128))
        ]),
        _: 1
      }, 8, ["open", "anchor"]),
      t.actions ? (u(), h("div", or, [
        Y(C.$slots, "actions", {}, void 0, !0)
      ])) : M("", !0)
    ]));
  }
}), Ba = /* @__PURE__ */ U(ir, [["__scopeId", "data-v-ecff2b99"]]), cr = ["checked", "indeterminate"], Ha = /* @__PURE__ */ W({
  __name: "PageTick",
  setup(e) {
    const t = ee(), n = f(() => t.rows.value.filter((l) => t.isSelected(l)).length), a = f(
      () => t.rows.value.length > 0 && n.value === t.rows.value.length
    ), s = f(() => n.value > 0 && !a.value);
    return (l, o) => (u(), h("input", {
      class: "dc-tick",
      type: "checkbox",
      checked: a.value,
      indeterminate: s.value,
      "aria-label": "Select every row on this page",
      title: "Select every row on this page",
      onChange: o[0] || (o[0] = (i) => w(t).selectPage(!a.value))
    }, null, 40, cr));
  }
}), ur = { class: "dc-pick" }, dr = ["id"], fr = ["id", "aria-expanded", "aria-labelledby", "data-dc-value"], vr = {
  key: 0,
  class: "dc-pick__icon",
  viewBox: "0 0 16 16",
  "aria-hidden": "true"
}, pr = ["d"], hr = { class: "dc-pick__label" }, mr = /* @__PURE__ */ W({
  __name: "PickControl",
  props: {
    modelValue: {},
    options: {},
    label: {},
    mono: { type: Boolean }
  },
  emits: ["update:modelValue", "open", "close"],
  setup(e, { emit: t }) {
    const n = e, a = t, s = Mt() ?? "dc-pick", l = H(null), o = H(null), i = H(null), r = H(!1), c = f(() => i.value !== null), d = H(null), v = f(
      () => n.options.find((b) => b.key === n.modelValue) ?? n.options[0]
    ), g = f(
      () => n.options.map((b) => ({
        id: b.key,
        label: b.label,
        icon: b.icon,
        checked: b.key === n.modelValue
      }))
    ), y = f(
      () => i.value ? { maxHeight: `${window.innerHeight - i.value.y - 8}px` } : void 0
    );
    function _(b) {
      const T = l.value?.getBoundingClientRect();
      T && (d.value = l.value?.closest(".dc-shell") ?? document.body, i.value = { x: T.left, y: T.bottom + 4, mirrorX: T.right }, r.value = b, a("open"));
    }
    function p(b) {
      i.value && a("close"), i.value = null, b && l.value?.focus();
    }
    function k() {
      c.value ? p(!0) : _(!1);
    }
    function P(b) {
      b.key !== "ArrowDown" && b.key !== "ArrowUp" || c.value || (b.preventDefault(), _(!0));
    }
    function x(b) {
      const T = b.target;
      T && (l.value?.contains(T) || o.value?.root?.contains(T) || p(!1));
    }
    ne(c, (b) => {
      b ? window.addEventListener("pointerdown", x, !0) : window.removeEventListener("pointerdown", x, !0);
    }), we(() => window.removeEventListener("pointerdown", x, !0));
    function m(b) {
      p(!0), !(b.id === void 0 || b.id === n.modelValue) && a("update:modelValue", b.id);
    }
    return (b, T) => (u(), h("span", ur, [
      S("span", {
        id: `${w(s)}-name`,
        class: "dc-pick__name"
      }, E(e.label), 9, dr),
      S("button", {
        id: `${w(s)}-value`,
        ref_key: "trigger",
        ref: l,
        type: "button",
        class: de(["dc-pick__button", { "dc-mono": e.mono }]),
        "aria-haspopup": "menu",
        "aria-expanded": c.value,
        "aria-labelledby": `${w(s)}-name ${w(s)}-value`,
        "data-dc-value": e.modelValue,
        onClick: k,
        onKeydown: P
      }, [
        v.value?.icon ? (u(), h("svg", vr, [
          S("path", {
            d: v.value.icon
          }, null, 8, pr)
        ])) : M("", !0),
        S("span", hr, E(v.value?.label), 1)
      ], 42, fr),
      T[1] || (T[1] = S("svg", {
        class: "dc-pick__mark",
        viewBox: "0 0 16 16",
        "aria-hidden": "true"
      }, [
        S("path", { d: "M4 6l4 4 4-4" })
      ], -1)),
      i.value && d.value ? (u(), I(Pt, {
        key: 0,
        to: d.value
      }, [
        G(w(os), {
          ref_key: "menu",
          ref: o,
          class: "dc-pick__list",
          style: re(y.value),
          items: g.value,
          at: i.value,
          label: e.label,
          autofocus: r.value,
          onChoose: m,
          onDismiss: T[0] || (T[0] = (F) => p(!0))
        }, null, 8, ["style", "items", "at", "label", "autofocus"])
      ], 8, ["to"])) : M("", !0)
    ]));
  }
}), nn = /* @__PURE__ */ U(mr, [["__scopeId", "data-v-0e31a711"]]), yr = {
  class: "dc-pager",
  "aria-label": "Pages"
}, gr = ["title"], _r = ["value", "onKeydown"], wr = {
  class: "dc-pager__total",
  "aria-hidden": "true"
}, kr = {
  class: "dc-pager__sr",
  "aria-live": "polite"
}, br = /* @__PURE__ */ W({
  __name: "ShellPager",
  props: {
    pagesNote: {}
  },
  setup(e) {
    const t = e, n = ee(), a = f(() => n.liveQuery.value.page), s = f(
      () => `${n.counting.value ? "~" : ""}${Ve(n.pageCount.value)}`
    ), l = f(() => {
      if (n.limit.value === 1) {
        const p = `Record ${Ve(a.value)} of ${s.value}`;
        return t.pagesNote ? `${p}
${t.pagesNote}` : p;
      }
      let y = `Page ${Ve(a.value)} of ${s.value}`;
      const _ = n.rows.value.length;
      if (_) {
        const p = n.offset.value + 1, k = `${n.counting.value ? "~" : ""}${Ve(n.total.value)}`;
        y += ` — rows ${Ve(p)} to ${Ve(p + _ - 1)} of ${k}`;
      }
      return t.pagesNote ? `${y}
${t.pagesNote}` : y;
    }), o = H(null), i = f(() => o.value ?? String(a.value)), r = f(
      () => `calc(${Math.max(2, String(n.pageCount.value).length)}ch + 10px)`
    );
    function c(y) {
      y.target.select();
    }
    function d(y) {
      const _ = y.target, p = _.value.replace(/[^0-9]/g, "");
      _.value !== p && (_.value = p), o.value = p;
    }
    function v(y) {
      const _ = y.target, p = Number(o.value);
      o.value = null;
      const k = Number.isFinite(p) && p >= 1 ? Math.min(Math.trunc(p), Math.max(1, n.pageCount.value)) : a.value;
      _.value = String(k), k !== a.value && n.setPage(k);
    }
    function g(y) {
      const _ = y.target;
      o.value = null, _.value = String(a.value), _.blur();
    }
    return (y, _) => (u(), h("nav", yr, [
      G(se, {
        class: "dc-pager__step",
        "aria-label": "Previous page",
        href: a.value > 1 ? w(n).hrefFor({ page: a.value - 1 }) : null,
        disabled: a.value <= 1,
        onPress: _[0] || (_[0] = (p) => w(n).setPage(a.value - 1))
      }, {
        default: X(() => [..._[2] || (_[2] = [
          S("span", { "aria-hidden": "true" }, "‹", -1)
        ])]),
        _: 1
      }, 8, ["href", "disabled"]),
      S("span", {
        class: "dc-pager__page dc-mono",
        title: l.value
      }, [
        S("input", {
          class: "dc-pager__box dc-mono",
          type: "text",
          inputmode: "numeric",
          autocomplete: "off",
          "aria-label": "Page",
          style: re({ width: r.value }),
          value: i.value,
          onFocus: c,
          onInput: d,
          onKeydown: [
            Te(Oe(v, ["prevent"]), ["enter"]),
            Te(Oe(g, ["prevent"]), ["esc"])
          ],
          onBlur: v
        }, null, 44, _r),
        S("span", wr, "/ " + E(s.value), 1)
      ], 8, gr),
      S("span", kr, E(l.value), 1),
      G(se, {
        class: "dc-pager__step",
        "aria-label": "Next page",
        href: a.value < w(n).pageCount.value ? w(n).hrefFor({ page: a.value + 1 }) : null,
        disabled: a.value >= w(n).pageCount.value,
        onPress: _[1] || (_[1] = (p) => w(n).setPage(a.value + 1))
      }, {
        default: X(() => [..._[3] || (_[3] = [
          S("span", { "aria-hidden": "true" }, "›", -1)
        ])]),
        _: 1
      }, 8, ["href", "disabled"])
    ]));
  }
}), $r = /* @__PURE__ */ U(br, [["__scopeId", "data-v-bdec7640"]]), xr = {
  key: 0,
  class: "dc-actions__order"
}, Sr = {
  key: 1,
  class: "dc-actions__select"
}, Cr = {
  key: 0,
  class: "dc-actions__all"
}, Pr = {
  class: "dc-actions__count",
  "aria-live": "polite"
}, Er = {
  key: 1,
  class: "dc-actions__count dc-actions__all",
  "aria-live": "polite"
}, Mr = { class: "dc-actions__ops" }, Lr = ["disabled"], Tr = ["data-dc-operation", "disabled", "onClick"], Or = ["disabled"], Nr = /* @__PURE__ */ W({
  __name: "RecordActions",
  props: {
    views: {},
    selectionPlacement: {},
    pagesNote: {}
  },
  setup(e) {
    const t = e, n = ee(), a = f(() => Ne(n.query.value.view, t.views)), s = f(
      () => (d.value || v.value) && a.value !== "table" && n.sorts.value.length > 0
    ), l = f(
      () => n.sorts.value.map((b) => ({ key: b.key, label: b.label }))
    ), o = f(() => s.value && l.value.length > 1), i = f(() => n.query.value.dir === "desc"), r = f(
      () => `Sorted by ${n.sort.value.label}, ${i.value ? "descending" : "ascending"}`
    ), c = f(() => n.entity.value), d = f(
      () => !ia(n.query.value, t.views) && a.value !== "record"
    ), v = f(() => a.value === "record" && n.query.value.entity !== null), g = f(
      () => (d.value || v.value) && !n.loading.value && (n.pageCount.value > 1 || !!t.pagesNote)
    ), y = f(() => n.selection.value.ids.length), _ = f(
      () => d.value && n.selectable.value && (n.rows.value.length > 0 || y.value > 0)
    ), p = f(() => a.value === "table"), k = f(
      () => s.value || g.value || d.value && (_.value || !!(c.value?.create || c.value?.duplicate || c.value?.delete || c.value?.operations?.length))
    ), P = f(() => y.value ? `${y.value} selected` : p.value ? "" : "Select all"), x = f(() => t.selectionPlacement === "end");
    function m(b) {
      return y.value ? b.endsWith("…") ? `${b.slice(0, -1)} ${y.value}…` : `${b} ${y.value}` : b;
    }
    return (b, T) => k.value ? (u(), h("div", {
      key: 0,
      class: de(["dc-actions", { "dc-actions--selection-end": x.value }])
    }, [
      s.value ? (u(), h("span", xr, [
        o.value ? (u(), I(nn, {
          key: 0,
          class: "dc-actions__pick dc-actions__sort",
          label: "Sort",
          "model-value": w(n).sort.value.key,
          options: l.value,
          "onUpdate:modelValue": w(n).setSort
        }, null, 8, ["model-value", "options", "onUpdate:modelValue"])) : M("", !0),
        G(se, {
          class: "dc-actions__dir",
          "aria-label": r.value,
          title: r.value,
          href: w(n).hrefFor({ dir: i.value ? "asc" : "desc" }),
          onPress: T[0] || (T[0] = (F) => w(n).toggleDirection())
        }, {
          default: X(() => [
            Z(E(i.value ? "↓" : "↑"), 1)
          ]),
          _: 1
        }, 8, ["aria-label", "title", "href"])
      ])) : M("", !0),
      _.value && P.value ? (u(), h("div", Sr, [
        p.value ? (u(), h("span", Er, E(P.value), 1)) : (u(), h("label", Cr, [
          G(Ha),
          S("span", Pr, E(P.value), 1)
        ])),
        y.value ? (u(), h("button", {
          key: 2,
          type: "button",
          class: de(["dc-actions__clear", { "dc-actions__clear--op": x.value }]),
          onClick: T[1] || (T[1] = (F) => w(n).clearSelection())
        }, " Clear ", 2)) : M("", !0)
      ])) : M("", !0),
      S("div", Mr, [
        c.value?.create ? (u(), I(se, {
          key: 0,
          class: "dc-actions__op dc-actions__new",
          href: w(n).createHref?.(c.value),
          onPress: T[2] || (T[2] = (F) => w(n).create(c.value))
        }, {
          default: X(() => [
            T[5] || (T[5] = S("span", {
              class: "dc-actions__plus",
              "aria-hidden": "true"
            }, "+", -1)),
            Z(" " + E(c.value.create), 1)
          ]),
          _: 1
        }, 8, ["href"])) : M("", !0),
        c.value?.duplicate ? (u(), h("button", {
          key: 1,
          type: "button",
          class: "dc-actions__op",
          disabled: !y.value,
          onClick: T[3] || (T[3] = (F) => w(n).duplicate())
        }, E(m(c.value.duplicate)), 9, Lr)) : M("", !0),
        (u(!0), h(K, null, J(c.value?.operations ?? [], (F) => (u(), h("button", {
          key: F.key,
          type: "button",
          class: "dc-actions__op",
          "data-dc-operation": F.key,
          disabled: !y.value && F.selection !== !1,
          onClick: (ie) => w(n).operate(F.key)
        }, E(F.selection === !1 ? F.label : m(F.label)), 9, Tr))), 128)),
        c.value?.delete ? (u(), h("button", {
          key: 2,
          type: "button",
          class: "dc-actions__op dc-actions__danger",
          disabled: !y.value,
          onClick: T[4] || (T[4] = (F) => w(n).delete())
        }, E(m(c.value.delete)), 9, Or)) : M("", !0)
      ]),
      g.value ? (u(), I($r, {
        key: 2,
        class: "dc-actions__pages",
        "pages-note": e.pagesNote
      }, null, 8, ["pages-note"])) : M("", !0)
    ], 2)) : M("", !0);
  }
}), an = /* @__PURE__ */ U(Nr, [["__scopeId", "data-v-95bd2f88"]]);
function Qn(e) {
  return Math.max(0, e.total - (e.kept ?? 0));
}
function Ar(e) {
  const t = me(/* @__PURE__ */ new Map()), n = H(!0);
  let a = 0, s;
  const l = () => {
    a++, s?.abort(), s = void 0;
  }, o = () => {
    l();
    const i = a, { signal: r } = s = new AbortController(), c = e.query.value, d = e.schema.value, v = e.entities.value, g = e.within?.value.trim() ?? "";
    n.value = c.expr.trim() === "" && !g;
    const y = /* @__PURE__ */ new Map();
    let _ = !0;
    for (const p of v) {
      const k = Ea(p, c.expr), P = g ? pn(g, k) : k;
      let x = !1;
      const m = (T) => {
        if (i !== a) return;
        if (_) {
          y.set(p.key, T);
          return;
        }
        const F = new Map(t.value);
        F.set(p.key, T), t.value = F;
      }, b = e.source.value.query({
        query: { ...c, entity: p.key, expr: P, page: 1 },
        schema: d,
        entity: p,
        limit: 0,
        offset: 0,
        signal: r,
        progress: (T) => {
          x || m({ total: T, pending: !0, counted: !0 });
        }
      });
      b instanceof Promise ? (y.has(p.key) || y.set(p.key, { total: 0, pending: !0, counted: !1 }), b.then((T) => {
        x = !0, m({ total: Qn(T), pending: !1, counted: !0 });
      })) : (x = !0, y.set(p.key, { total: Qn(b), pending: !1, counted: !0 }));
    }
    _ = !1, t.value = y;
  };
  return na() && Ct(l), { counts: t, pristine: n, refresh: o, cancel: l };
}
const Ir = {
  key: 0,
  class: "dc-choosers"
}, Rr = "…", Br = /* @__PURE__ */ W({
  __name: "RecordChoosers",
  props: {
    views: {},
    typeChooser: {}
  },
  setup(e) {
    const t = e, n = ee(), a = f(
      () => n.hasFacets.value || !!n.liveQuery.value.expr.trim() || !!n.within.value
    ), s = Ar({
      source: n.source,
      schema: n.schema,
      // What each type holds of what is on screen, the draft's results included:
      // a count of the committed query would disagree with the rows under it.
      query: n.liveQuery,
      entities: n.entities,
      within: n.within
    });
    function l(y) {
      if (y.key === n.query.value.entity && a.value) return Je((n.matched ?? n.total).value);
      if (s.pristine.value) return Yt(y);
      const p = s.counts.value.get(y.key);
      return p ? p.counted ? `${p.pending ? "~" : ""}${Je(p.total)}` : Rr : Yt(y);
    }
    const o = f(() => [
      { key: "", label: "Everything" },
      ...n.entities.value.map((y) => ({
        key: y.key,
        label: `${y.label} · ${l(y)}`
      }))
    ]), i = f(
      () => t.typeChooser === "always" || n.query.value.entity !== null
    );
    function r(y) {
      n.setEntity(y || null);
    }
    const c = f(
      () => (t.views ?? [...un]).map((y) => ({
        key: y,
        label: y === "record" ? n.recordView.value?.label ?? Tn.record : Tn[y],
        icon: ws[y]
      }))
    ), d = f(() => Ne(n.query.value.view, t.views)), v = f(() => c.value.length > 1);
    function g(y) {
      n.setView(y);
    }
    return (y, _) => i.value || v.value ? (u(), h("div", Ir, [
      i.value ? (u(), I(nn, {
        key: 0,
        class: "dc-actions__pick dc-actions__type",
        label: "Type",
        "model-value": w(n).query.value.entity ?? "",
        options: o.value,
        onOpen: w(s).refresh,
        onClose: w(s).cancel,
        "onUpdate:modelValue": r
      }, null, 8, ["model-value", "options", "onOpen", "onClose"])) : M("", !0),
      v.value ? (u(), I(nn, {
        key: 1,
        class: "dc-actions__pick dc-actions__view",
        label: "View",
        "model-value": d.value,
        options: c.value,
        "onUpdate:modelValue": g
      }, null, 8, ["model-value", "options"])) : M("", !0)
    ])) : M("", !0);
  }
}), Hr = /* @__PURE__ */ U(Br, [["__scopeId", "data-v-ac04b6df"]]);
function qr(e, t) {
  if (!e) return null;
  const n = ue(e, t);
  return typeof n == "string" && n.trim() ? n : null;
}
const Fr = (e) => e == null || typeof e == "string" && !e.trim();
function Vr(e, t) {
  const n = pe(t, "state"), a = pe(t, "tint");
  return {
    identity: mt(pe(t, "identity"), e),
    reference: mt(pe(t, "reference"), e),
    metrics: ca(t, "metric").map((s) => ({
      column: s,
      label: s.label ?? "",
      text: Ae(s, e)
    })),
    facts: t.filter((s) => s.cardLabel && !Fr(ue(s, e))).map((s) => ({
      column: s,
      label: s.cardLabel,
      title: [s.label, s.hint].filter(Boolean).join(" — "),
      text: Ae(s, e)
    })),
    state: n ? ue(n, e) ?? null : null,
    updated: mt(pe(t, "updated"), e),
    image: qr(pe(t, "image"), e),
    tint: a ? ue(a, e) ?? null : null
  };
}
function qa(e, t, n, a, s = !1) {
  const l = n?.columns ?? [];
  return {
    row: e,
    key: Ps(e, t),
    entityLabel: e.entityLabel,
    entity: n,
    columns: l,
    ordinal: vs(t),
    parts: Vr(e, l),
    pinned: a,
    selected: s
  };
}
function Re() {
  const e = ee(), t = f(
    () => new Map(e.entities.value.map((n) => [n.key, n]))
  );
  return f(
    () => e.rows.value.map(
      (n, a) => qa(
        n,
        e.offset.value + a,
        t.value.get(n.entityKey) ?? null,
        e.isPinned(n),
        e.isSelected(n)
      )
    )
  );
}
const Dr = ["data-dc-status", "data-dc-tone"], Kr = /* @__PURE__ */ W({
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
    }, E(n.value), 9, Dr));
  }
}), We = /* @__PURE__ */ U(Kr, [["__scopeId", "data-v-686eb9b6"]]), Wr = { key: 1 }, zr = /* @__PURE__ */ W({
  __name: "MetricDrill",
  props: {
    entry: {},
    column: {}
  },
  setup(e) {
    const t = e, n = ee(), a = f(() => !t.entry.entity?.scope || !t.column.drill ? null : n.entities.value.find((v) => v.key === t.column.drill) ?? null), s = f(() => !!t.column.click), l = f(() => t.column.label ?? ""), o = f(() => Ae(t.column, t.entry.row)), i = f(() => s.value ? t.column.clickHref?.(t.entry.row) ?? null : a.value ? n.drillHref(t.entry.row, a.value, t.column.drillWhere) : null), r = f(() => a.value && !s.value ? `${l.value} of ${t.entry.parts.identity} — show the ${a.value.label.toLowerCase()}` : `${l.value} of ${t.entry.parts.identity}`);
    function c(d, v) {
      v.stopPropagation(), s.value ? t.column.click?.(t.entry.row, d) : a.value && n.drill(t.entry.row, a.value, d, t.column.drillWhere);
    }
    return (d, v) => a.value || s.value ? (u(), I(se, {
      key: 0,
      class: "dc-drill",
      href: i.value,
      title: r.value,
      onPress: c
    }, {
      default: X(() => [
        Y(d.$slots, "default", {}, () => [
          Z(E(o.value), 1)
        ], !0)
      ]),
      _: 3
    }, 8, ["href", "title"])) : (u(), h("span", Wr, [
      Y(d.$slots, "default", {}, () => [
        Z(E(o.value), 1)
      ], !0)
    ]));
  }
}), ft = /* @__PURE__ */ U(zr, [["__scopeId", "data-v-bbbd334b"]]), jr = ["data-dc-active", "aria-pressed", "aria-label"], Ur = /* @__PURE__ */ W({
  __name: "PinStar",
  props: {
    row: {},
    pinned: { type: Boolean },
    name: {}
  },
  setup(e) {
    const t = e, n = ee();
    function a(s) {
      s.stopPropagation(), n.togglePin(t.row);
    }
    return (s, l) => (u(), h("button", {
      type: "button",
      class: "dc-star",
      "data-dc-active": e.pinned ? "true" : "false",
      "aria-pressed": e.pinned,
      "aria-label": e.pinned ? `Unpin ${e.name}` : `Pin ${e.name}`,
      onClick: a
    }, E(e.pinned ? "★" : "☆"), 9, jr));
  }
}), wn = /* @__PURE__ */ U(Ur, [["__scopeId", "data-v-ef63d763"]]), Qr = ["src"], Gr = /* @__PURE__ */ W({
  __name: "RowPicture",
  props: {
    src: {}
  },
  setup(e) {
    const t = e, n = H(!1);
    return ne(
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
      onError: s[0] || (s[0] = (l) => n.value = !0)
    }, null, 40, Qr)) : M("", !0);
  }
}), Ht = /* @__PURE__ */ U(Gr, [["__scopeId", "data-v-afaab300"]]), Yr = ["data-dc-standing", "title", "aria-label"], Xr = /* @__PURE__ */ W({
  __name: "QueryMark",
  props: {
    entry: {}
  },
  setup(e) {
    const t = e, n = ee(), a = f(() => ut(t.entry.entity, t.entry.row)), s = f(() => gn(n.query.value.expr, a.value)), l = f(
      () => s.value === "in" ? `The query narrows to ${t.entry.parts.identity} — press to lift that` : `The query leaves out ${t.entry.parts.identity} — press to lift that`
    );
    function o(i) {
      i.stopPropagation(), n.setExpression(Ca(n.query.value.expr, a.value));
    }
    return (i, r) => s.value ? (u(), h("button", {
      key: 0,
      type: "button",
      class: "dc-standing",
      "data-dc-standing": s.value,
      title: l.value,
      "aria-label": l.value,
      onClick: o
    }, E(s.value === "in" ? "+" : "−"), 9, Yr)) : M("", !0);
  }
}), kn = /* @__PURE__ */ U(Xr, [["__scopeId", "data-v-4b8d4166"]]), Jr = ["aria-label"], Zr = ["data-dc-standing", "data-dc-active", "aria-checked", "title", "aria-label", "onClick"], eo = /* @__PURE__ */ W({
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
    ]), l = (i) => !n.mixed && n.standing === i;
    function o(i, r) {
      i.stopPropagation(), a("set", r);
    }
    return (i, r) => (u(), h("span", {
      class: "dc-standing-control",
      role: "radiogroup",
      "aria-label": `Where the query stands on ${e.name}`
    }, [
      (u(!0), h(K, null, J(s.value, (c) => (u(), h("button", {
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
      }, E(c.sign), 9, Zr))), 128))
    ], 8, Jr));
  }
}), sn = /* @__PURE__ */ U(eo, [["__scopeId", "data-v-5524dca6"]]), Fa = /* @__PURE__ */ W({
  __name: "RowStanding",
  props: {
    entry: {}
  },
  setup(e) {
    const t = e, n = ee(), a = f(() => ut(t.entry.entity, t.entry.row)), s = f(() => gn(n.query.value.expr, a.value));
    function l(o) {
      n.setExpression(Jt(n.query.value.expr, a.value, o));
    }
    return (o, i) => a.value !== null ? (u(), I(sn, {
      key: 0,
      class: "dc-row-standing",
      standing: s.value,
      name: e.entry.parts.identity,
      onSet: l
    }, null, 8, ["standing", "name"])) : M("", !0);
  }
}), to = ["href", "title", "aria-label"], no = /* @__PURE__ */ W({
  __name: "OpenMark",
  props: {
    entry: {}
  },
  setup(e) {
    const t = e, n = ee(), a = f(() => {
      const s = t.entry.row, l = n.recordHref?.(s) ?? null;
      return l ? n.pressHref(s) === l ? null : l : null;
    });
    return (s, l) => a.value ? (u(), h("a", {
      key: 0,
      class: "dc-open",
      href: a.value,
      target: "_blank",
      rel: "noopener noreferrer",
      title: a.value,
      "aria-label": `Open ${e.entry.parts.identity} in a new tab`,
      onClick: l[0] || (l[0] = Oe(() => {
      }, ["stop"]))
    }, "↗", 8, to)) : M("", !0);
  }
}), vt = /* @__PURE__ */ U(no, [["__scopeId", "data-v-b00f390d"]]), ao = /* @__PURE__ */ W({
  __name: "ScopeMark",
  props: {
    entry: {}
  },
  setup(e) {
    const t = e, n = ee(), a = f(
      () => n.narrowsOnPress.value ? null : t.entry.entity?.scope ?? null
    ), s = H(null);
    function l(d) {
      s.value = st(d).exclude ? "out" : "in";
    }
    function o(d) {
      l(d), window.addEventListener("keydown", l), window.addEventListener("keyup", l);
    }
    function i() {
      s.value = null, window.removeEventListener("keydown", l), window.removeEventListener("keyup", l);
    }
    we(i);
    const r = f(() => a.value ? n.drillHref(t.entry.row, null) : null);
    function c(d, v) {
      v.stopPropagation(), n.drill(t.entry.row, null, d);
    }
    return (d, v) => a.value ? (u(), I(se, {
      key: 0,
      class: "dc-scope",
      href: r.value,
      "data-dc-pending": s.value ?? void 0,
      title: `Narrow everything to ${a.value}: ${e.entry.row.id} — ⌥-click to leave it out`,
      "aria-label": `Narrow everything to ${e.entry.parts.identity}`,
      onPointerenter: o,
      onPointermove: l,
      onPointerleave: i,
      onPress: c
    }, {
      default: X(() => [...v[0] || (v[0] = [
        Z(" → ", -1)
      ])]),
      _: 1
    }, 8, ["href", "data-dc-pending", "title", "aria-label"])) : M("", !0);
  }
}), pt = /* @__PURE__ */ U(ao, [["__scopeId", "data-v-05d2c233"]]), so = ["checked", "aria-label"], Be = /* @__PURE__ */ W({
  __name: "SelectTick",
  props: {
    row: {},
    selected: { type: Boolean },
    name: {}
  },
  setup(e) {
    const t = e, n = ee();
    function a(s) {
      s.stopPropagation(), n.toggleSelect(t.row);
    }
    return (s, l) => (u(), h("input", {
      class: "dc-tick",
      type: "checkbox",
      checked: e.selected,
      "aria-label": `Select ${e.name}`,
      onClick: a
    }, null, 8, so));
  }
}), lo = { class: "dc-card__top dc-mono" }, ro = { class: "dc-card__lead" }, oo = {
  key: 2,
  class: "dc-card__entity"
}, io = { class: "dc-card__top-right" }, co = { class: "dc-card__names" }, uo = { class: "dc-card__primary" }, fo = {
  key: 0,
  class: "dc-card__secondary dc-mono"
}, vo = {
  key: 1,
  class: "dc-card__facts dc-mono"
}, po = ["title"], ho = { class: "dc-card__fact-label" }, mo = {
  key: 0,
  class: "dc-card__metrics dc-mono"
}, yo = {
  key: 0,
  class: "dc-card__date"
}, go = /* @__PURE__ */ W({
  __name: "CardsView",
  setup(e) {
    const t = ee(), n = Re(), a = f(() => t.isEverything.value), s = (o) => o.entity?.card === "picture", l = f(() => n.value.length > 0 && n.value.every(s));
    return (o, i) => (u(), h("div", {
      class: de(["dc-cards", { "dc-cards--pictures": l.value }])
    }, [
      (u(!0), h(K, null, J(w(n), (r) => (u(), h("div", {
        key: r.key,
        class: de(["dc-card", { "dc-card--picture": s(r) }])
      }, [
        S("div", lo, [
          S("span", ro, [
            w(t).selectable.value ? (u(), I(Be, {
              key: 0,
              row: r.row,
              selected: r.selected,
              name: r.parts.identity
            }, null, 8, ["row", "selected", "name"])) : M("", !0),
            s(r) ? M("", !0) : (u(), h(K, { key: 1 }, [
              Z(E(r.ordinal), 1)
            ], 64)),
            a.value ? (u(), h("span", oo, E(r.entityLabel), 1)) : M("", !0)
          ]),
          S("span", io, [
            r.parts.state && !s(r) ? (u(), I(We, {
              key: 0,
              status: r.parts.state
            }, null, 8, ["status"])) : M("", !0),
            s(r) ? (u(), I(kn, {
              key: 1,
              entry: r
            }, null, 8, ["entry"])) : (u(), I(Fa, {
              key: 2,
              entry: r
            }, null, 8, ["entry"])),
            G(pt, { entry: r }, null, 8, ["entry"]),
            G(vt, { entry: r }, null, 8, ["entry"]),
            w(t).pinnable.value ? (u(), I(wn, {
              key: 3,
              row: r.row,
              name: r.parts.identity,
              pinned: r.pinned
            }, null, 8, ["row", "name", "pinned"])) : M("", !0)
          ])
        ]),
        G(se, {
          class: "dc-card__open",
          href: w(t).pressHref(r.row),
          onPress: (c) => w(t).activate(r.row, c)
        }, {
          default: X(() => [
            r.parts.image ? (u(), I(Ht, {
              key: 0,
              class: "dc-card__image",
              src: r.parts.image
            }, null, 8, ["src"])) : M("", !0),
            S("span", co, [
              S("span", uo, E(r.parts.identity), 1),
              s(r) ? M("", !0) : (u(), h("span", fo, E(r.parts.reference), 1)),
              r.parts.facts.length ? (u(), h("span", vo, [
                (u(!0), h(K, null, J(r.parts.facts, (c) => (u(), h("span", {
                  key: c.column.key ?? c.label,
                  class: "dc-card__fact",
                  title: c.title || void 0
                }, [
                  S("span", ho, E(c.label), 1),
                  Z(" " + E(c.text), 1)
                ], 8, po))), 128))
              ])) : M("", !0)
            ])
          ]),
          _: 2
        }, 1032, ["href", "onPress"]),
        s(r) ? M("", !0) : (u(), h("div", mo, [
          (u(!0), h(K, null, J(r.parts.metrics.slice(0, 2), (c) => (u(), I(ft, {
            key: c.column.key ?? c.label,
            entry: r,
            column: c.column
          }, {
            default: X(() => [
              Z(E(c.label) + " " + E(c.text), 1)
            ]),
            _: 2
          }, 1032, ["entry", "column"]))), 128)),
          r.parts.updated ? (u(), h("span", yo, E(r.parts.updated), 1)) : M("", !0)
        ]))
      ], 2))), 128))
    ], 2));
  }
}), Va = /* @__PURE__ */ U(go, [["__scopeId", "data-v-fd252138"]]), _o = { class: "dc-grid" }, wo = { class: "dc-tile__scrim" }, ko = { class: "dc-tile__top dc-mono" }, bo = { class: "dc-tile__chip" }, $o = { class: "dc-tile__caption" }, xo = { class: "dc-tile__secondary dc-truncate" }, So = { class: "dc-tile__primary" }, Co = /* @__PURE__ */ W({
  __name: "GridView",
  setup(e) {
    const t = ee(), n = Re();
    return (a, s) => (u(), h("div", _o, [
      (u(!0), h(K, null, J(w(n), (l) => (u(), h("div", {
        key: l.key,
        class: "dc-grid__cell"
      }, [
        G(se, {
          class: "dc-tile",
          style: re({ "--dc-tile-tint": l.parts.tint ?? void 0 }),
          href: w(t).pressHref(l.row),
          onPress: (o) => w(t).activate(l.row, o)
        }, {
          default: X(() => [
            l.parts.image ? (u(), I(Ht, {
              key: 0,
              class: "dc-tile__image",
              src: l.parts.image
            }, null, 8, ["src"])) : M("", !0),
            S("span", wo, [
              S("span", ko, [
                S("span", bo, E(l.ordinal), 1)
              ]),
              S("span", $o, [
                S("span", xo, E(l.parts.reference), 1),
                S("span", So, E(l.parts.identity), 1)
              ])
            ])
          ]),
          _: 2
        }, 1032, ["style", "href", "onPress"]),
        w(t).selectable.value ? (u(), I(Be, {
          key: 0,
          class: "dc-grid__tick",
          row: l.row,
          selected: l.selected,
          name: l.parts.identity
        }, null, 8, ["row", "selected", "name"])) : M("", !0)
      ]))), 128))
    ]));
  }
}), Da = /* @__PURE__ */ U(Co, [["__scopeId", "data-v-89c40a9e"]]);
function Gn(e, t, n, a) {
  return (n - a * (t - 1)) / e;
}
function jt(e, t) {
  return e > 0 ? Math.min(t, e) : t;
}
function Po(e) {
  return e > 0 ? e : 1 / 0;
}
function Eo(e, t, n) {
  const { width: a, height: s, gap: l = 0 } = n;
  if (!e.length) return [];
  if (!(a > 0) || !(s > 0)) return [{ items: [...e], height: s, filled: !1 }];
  const o = [];
  let i = [], r = 0, c = 0;
  for (const d of e) {
    const v = t(d), g = Math.max(v.ratio, Number.EPSILON), y = v.height && v.height > 0 ? Math.max(c, v.height) : c, _ = jt(y, s), p = Gn(r + g, i.length + 1, a, l);
    if (p > _) {
      i.push(d), r += g, c = y;
      continue;
    }
    const k = jt(c, s), P = i.length ? Gn(r, i.length, a, l) : 1 / 0;
    P <= Po(c) && P - k < _ - p ? (o.push({ items: i, height: P, filled: !0 }), i = [d], r = g, c = v.height && v.height > 0 ? v.height : 0) : (o.push({ items: [...i, d], height: p, filled: !0 }), i = [], r = 0, c = 0);
  }
  return i.length && o.push({ items: i, height: jt(c, s), filled: !1 }), o;
}
const Mo = { class: "dc-images" }, Lo = {
  key: 1,
  class: "dc-images__blank",
  "aria-hidden": "true"
}, To = 240, ht = 8, Oo = 1, No = /* @__PURE__ */ W({
  __name: "ImagesView",
  setup(e) {
    const t = ee(), n = Re(), a = Cn(/* @__PURE__ */ new Map()), s = Cn(/* @__PURE__ */ new Set());
    function l(_, p) {
      const k = p.target;
      k.naturalWidth > 0 && k.naturalHeight > 0 && a.set(_, { width: k.naturalWidth, height: k.naturalHeight });
    }
    function o(_) {
      const p = _.parts.image;
      return p && !s.has(p) ? p : null;
    }
    function i(_) {
      const p = o(_);
      return p ? a.get(p) : void 0;
    }
    function r(_) {
      const p = i(_);
      return p ? { ratio: p.width / p.height, height: p.height } : { ratio: Oo };
    }
    const c = H(null), d = H(0);
    let v = null;
    function g() {
      d.value = c.value?.clientWidth ?? 0;
    }
    it(() => {
      g(), !(!c.value || typeof ResizeObserver > "u") && (v = new ResizeObserver(g), v.observe(c.value));
    }), we(() => {
      v?.disconnect(), v = null;
    });
    const y = f(() => {
      const _ = Eo(n.value, r, {
        width: d.value,
        height: To,
        gap: ht
      }), p = [];
      let k = 0;
      for (const P of _) {
        let x = 0;
        for (const m of P.items) {
          const b = r(m).ratio * P.height, T = i(m), F = T !== void 0 && T.height < P.height;
          p.push({
            entry: m,
            style: {
              top: `${k}px`,
              left: `${x}px`,
              width: `${b}px`,
              height: `${P.height}px`
            },
            picture: F ? { width: `${T.width}px`, height: `${T.height}px` } : { width: "100%", height: "100%" }
          }), x += b + ht;
        }
        k += P.height + ht;
      }
      return { boxes: p, height: _.length ? k - ht : 0 };
    });
    return (_, p) => (u(), h("div", Mo, [
      S("div", {
        ref_key: "wall",
        ref: c,
        class: "dc-images__wall",
        style: re({ height: `${y.value.height}px` })
      }, [
        (u(!0), h(K, null, J(y.value.boxes, ({ entry: k, style: P, picture: x }) => (u(), h("div", {
          key: k.key,
          class: "dc-images__cell",
          style: re(P)
        }, [
          G(se, {
            class: "dc-images__open",
            title: k.parts.identity,
            "aria-label": k.parts.identity,
            href: w(t).pressHref(k.row),
            onPress: (m) => w(t).activate(k.row, m)
          }, {
            default: X(() => [
              o(k) ? (u(), I(Ht, {
                key: 0,
                class: "dc-images__picture",
                style: re(x),
                src: o(k),
                onLoad: (m) => l(o(k), m),
                onError: (m) => s.add(o(k))
              }, null, 8, ["style", "src", "onLoad", "onError"])) : (u(), h("span", Lo, E(k.parts.identity), 1))
            ]),
            _: 2
          }, 1032, ["title", "aria-label", "href", "onPress"]),
          w(t).selectable.value ? (u(), I(Be, {
            key: 0,
            class: "dc-images__tick",
            row: k.row,
            selected: k.selected,
            name: k.parts.identity
          }, null, 8, ["row", "selected", "name"])) : M("", !0)
        ], 4))), 128))
      ], 4)
    ]));
  }
}), Ka = /* @__PURE__ */ U(No, [["__scopeId", "data-v-2d267370"]]), Ao = { class: "dc-links" }, Io = { class: "dc-link__primary dc-truncate" }, Ro = { class: "dc-link__secondary dc-mono dc-truncate" }, Bo = /* @__PURE__ */ W({
  __name: "LinksView",
  setup(e) {
    const t = ee(), n = Re();
    return (a, s) => (u(), h("div", Ao, [
      (u(!0), h(K, null, J(w(n), (l) => (u(), h("span", {
        key: l.key,
        class: "dc-links__item"
      }, [
        w(t).selectable.value ? (u(), I(Be, {
          key: 0,
          row: l.row,
          selected: l.selected,
          name: l.parts.identity
        }, null, 8, ["row", "selected", "name"])) : M("", !0),
        G(se, {
          class: "dc-link",
          href: w(t).pressHref(l.row),
          onPress: (o) => w(t).activate(l.row, o)
        }, {
          default: X(() => [
            S("span", Io, E(l.parts.identity), 1),
            S("span", Ro, E(l.parts.reference), 1)
          ]),
          _: 2
        }, 1032, ["href", "onPress"])
      ]))), 128))
    ]));
  }
}), Wa = /* @__PURE__ */ U(Bo, [["__scopeId", "data-v-de6c9a0f"]]), Ho = {
  class: "dc-list",
  role: "list"
}, qo = { class: "dc-list__ordinal dc-mono" }, Fo = { class: "dc-list__identity" }, Vo = ["title"], Do = ["title"], Ko = {
  key: 1,
  class: "dc-list__entity dc-mono"
}, Wo = { class: "dc-list__metrics dc-mono" }, zo = { class: "dc-list__trailing" }, jo = /* @__PURE__ */ W({
  __name: "ListView",
  setup(e) {
    const t = ee(), n = Re(), a = f(() => t.isEverything.value);
    return (s, l) => (u(), h("div", Ho, [
      (u(!0), h(K, null, J(w(n), (o) => (u(), h("div", {
        key: o.key,
        class: "dc-list__row",
        role: "listitem"
      }, [
        w(t).selectable.value ? (u(), I(Be, {
          key: 0,
          class: "dc-list__tick",
          row: o.row,
          selected: o.selected,
          name: o.parts.identity
        }, null, 8, ["row", "selected", "name"])) : M("", !0),
        G(Fa, {
          class: "dc-list__standing",
          entry: o
        }, null, 8, ["entry"]),
        G(se, {
          class: "dc-list__open",
          href: w(t).pressHref(o.row),
          onPress: (i) => w(t).activate(o.row, i)
        }, {
          default: X(() => [
            S("span", qo, E(o.ordinal), 1),
            S("span", Fo, [
              S("span", {
                class: "dc-list__primary dc-truncate",
                title: o.parts.identity
              }, E(o.parts.identity), 9, Vo),
              S("span", {
                class: "dc-list__secondary dc-mono dc-truncate",
                title: o.parts.reference || void 0
              }, E(o.parts.reference), 9, Do)
            ])
          ]),
          _: 2
        }, 1032, ["href", "onPress"]),
        a.value ? (u(), h("span", Ko, E(o.entityLabel), 1)) : M("", !0),
        S("span", Wo, [
          (u(!0), h(K, null, J(o.parts.metrics.slice(0, 2), (i) => (u(), I(ft, {
            key: i.column.key ?? i.label,
            entry: o,
            column: i.column
          }, null, 8, ["entry", "column"]))), 128))
        ]),
        S("span", zo, [
          o.parts.state ? (u(), I(We, {
            key: 0,
            status: o.parts.state
          }, null, 8, ["status"])) : M("", !0),
          G(pt, { entry: o }, null, 8, ["entry"]),
          G(vt, { entry: o }, null, 8, ["entry"]),
          w(t).pinnable.value ? (u(), I(wn, {
            key: 1,
            row: o.row,
            name: o.parts.identity,
            pinned: o.pinned
          }, null, 8, ["row", "name", "pinned"])) : M("", !0)
        ])
      ]))), 128))
    ]));
  }
}), ln = /* @__PURE__ */ U(jo, [["__scopeId", "data-v-a2cb9c3f"]]), Uo = { class: "dc-preview" }, Qo = { class: "dc-preview__pager dc-mono" }, Go = ["disabled"], Yo = { "aria-live": "polite" }, Xo = ["disabled"], Jo = {
  key: 0,
  class: "dc-preview__card"
}, Zo = ["src"], ei = { class: "dc-preview__body" }, ti = { class: "dc-preview__top" }, ni = { class: "dc-preview__badges" }, ai = { class: "dc-preview__entity dc-mono" }, si = { class: "dc-preview__marks" }, li = { class: "dc-preview__primary" }, ri = { class: "dc-preview__secondary dc-mono" }, oi = { class: "dc-preview__fields" }, ii = { class: "dc-preview__key" }, ci = { class: "dc-preview__value dc-mono" }, ui = /* @__PURE__ */ W({
  __name: "PreviewView",
  setup(e) {
    const t = ee(), n = Re(), a = H(0);
    ne(n, (r) => {
      a.value > r.length - 1 && (a.value = Math.max(0, r.length - 1));
    });
    const s = f(() => n.value[a.value]), l = f(() => {
      const r = s.value;
      if (!r) return [];
      const c = pe(r.columns, "reference"), d = pe(r.columns, "updated");
      return [
        ...c ? [{ key: c.label ?? "Reference", value: r.parts.reference, column: null }] : [],
        ...r.parts.metrics.map((v) => ({
          key: v.label,
          value: v.text,
          column: v.column
        })),
        ...d ? [{ key: d.label ?? "Updated", value: r.parts.updated, column: null }] : []
      ];
    }), o = f(() => {
      if (!n.value.length) return "0 / 0";
      const r = t.total.value > n.value.length ? ` of ${t.total.value}` : "";
      return `${a.value + 1} / ${n.value.length}${r}`;
    }), i = (r) => {
      const c = n.value.length;
      c && (a.value = Math.min(c - 1, Math.max(0, a.value + r)));
    };
    return (r, c) => (u(), h("div", Uo, [
      S("div", Qo, [
        S("button", {
          type: "button",
          class: "dc-preview__step",
          "aria-label": "Previous result",
          disabled: a.value === 0,
          onClick: c[0] || (c[0] = (d) => i(-1))
        }, " ‹ ", 8, Go),
        S("span", Yo, E(o.value), 1),
        S("button", {
          type: "button",
          class: "dc-preview__step",
          "aria-label": "Next result",
          disabled: a.value >= w(n).length - 1,
          onClick: c[1] || (c[1] = (d) => i(1))
        }, " › ", 8, Xo)
      ]),
      s.value ? (u(), h("div", Jo, [
        S("div", {
          class: "dc-preview__media",
          style: re({ background: s.value.parts.tint ?? void 0 }),
          "aria-hidden": "true"
        }, [
          s.value.parts.image ? (u(), h("img", {
            key: 0,
            class: "dc-preview__image",
            src: s.value.parts.image,
            alt: ""
          }, null, 8, Zo)) : (u(), h(K, { key: 1 }, [
            Z(" preview ")
          ], 64))
        ], 4),
        S("div", ei, [
          S("div", ti, [
            S("span", ni, [
              w(t).selectable.value ? (u(), I(Be, {
                key: 0,
                row: s.value.row,
                selected: s.value.selected,
                name: s.value.parts.identity
              }, null, 8, ["row", "selected", "name"])) : M("", !0),
              s.value.parts.state ? (u(), I(We, {
                key: 1,
                status: s.value.parts.state
              }, null, 8, ["status"])) : M("", !0),
              S("span", ai, E(s.value.entityLabel), 1)
            ]),
            S("span", si, [
              G(kn, { entry: s.value }, null, 8, ["entry"]),
              G(pt, { entry: s.value }, null, 8, ["entry"]),
              G(vt, { entry: s.value }, null, 8, ["entry"]),
              w(t).pinnable.value ? (u(), I(wn, {
                key: 0,
                row: s.value.row,
                name: s.value.parts.identity,
                pinned: s.value.pinned
              }, null, 8, ["row", "name", "pinned"])) : M("", !0)
            ])
          ]),
          S("div", null, [
            S("div", li, E(s.value.parts.identity), 1),
            S("div", ri, E(s.value.parts.reference), 1)
          ]),
          S("dl", oi, [
            (u(!0), h(K, null, J(l.value, (d) => (u(), h("div", {
              key: d.key,
              class: "dc-preview__field"
            }, [
              S("dt", ii, E(d.key), 1),
              S("dd", ci, [
                d.column && s.value ? (u(), I(ft, {
                  key: 0,
                  entry: s.value,
                  column: d.column
                }, null, 8, ["entry", "column"])) : (u(), h(K, { key: 1 }, [
                  Z(E(d.value), 1)
                ], 64))
              ])
            ]))), 128))
          ]),
          G(se, {
            class: "dc-preview__open",
            href: s.value ? w(t).pressHref(s.value.row) : null,
            onPress: c[2] || (c[2] = (d) => s.value && w(t).activate(s.value.row, d))
          }, {
            default: X(() => [...c[3] || (c[3] = [
              Z(" Open record → ", -1)
            ])]),
            _: 1
          }, 8, ["href"])
        ])
      ])) : M("", !0)
    ]));
  }
}), za = /* @__PURE__ */ U(ui, [["__scopeId", "data-v-59e0d33b"]]);
function di(e) {
  const t = le(e);
  return t.length !== 1 ? /* @__PURE__ */ new Set() : new Set(
    t[0].flatMap(
      (n) => n.kind === "field" && n.comparator === "=" && !n.negated && !Ke(n) ? [n.field.toLowerCase()] : []
    )
  );
}
function fi(e, t, n) {
  const a = di(t);
  return a.size ? e.filter((s) => {
    const l = (s.key ?? s.field)?.toLowerCase();
    return l === void 0 || !a.has(l) || s.role === "identity" ? !0 : n.some((o) => Array.isArray(ue(s, o)));
  }) : e;
}
function vi() {
  const e = ee();
  return f(
    () => fi(
      Ss(e.schema.value, e.entity.value),
      e.liveQuery.value.expr,
      e.rows.value
    )
  );
}
function bn(e, t) {
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
function ja(e, t) {
  const n = e.narrowsOnPress.value ? ut(t.entity, t.row) : null;
  return n ? { term: n, name: t.parts.identity } : null;
}
const pi = /* @__PURE__ */ W({
  __name: "CellNarrow",
  props: {
    entry: {},
    column: {},
    narrowings: {},
    truncates: { type: Boolean }
  },
  setup(e) {
    const t = e, n = ee(), a = f(() => Ae(t.column, t.entry.row));
    function s(v, g = !1) {
      return v.entity !== void 0 ? `entity:${v.entity}` : _e({ ...v.term, ...g ? { negated: !0 } : {} });
    }
    function l(v, g = !1) {
      return v.entity !== void 0 ? n.query.value.expr : at(n.query.value.expr, s(v, g));
    }
    function o(v) {
      return v.entity ?? n.query.value.entity;
    }
    function i(v) {
      return n.narrowHref(l(v), o(v));
    }
    function r(v) {
      return v.entity !== void 0 ? `Show ${n.schema.value.entities.find((y) => y.key === v.entity)?.label ?? a.value} only` : `Narrow to ${s(v)}
⌥-press to leave these out`;
    }
    function c(v) {
      return v.entity !== void 0 ? null : { term: s(v) };
    }
    function d(v, g, y) {
      y.stopPropagation(), n.narrow(l(v, g.exclude), o(v));
    }
    return (v, g) => (u(), h("span", {
      class: de(["dc-cell__text", { "dc-truncate": e.truncates }])
    }, [
      (u(!0), h(K, null, J(e.narrowings, (y, _) => (u(), h(K, {
        key: s(y)
      }, [
        _ > 0 ? (u(), h(K, { key: 0 }, [
          Z(", ")
        ], 64)) : M("", !0),
        G(se, De({
          class: "dc-narrow",
          href: i(y),
          title: r(y),
          selectable: ""
        }, cn(w(bn)(w(n), c(y))), {
          onPress: (p, k) => d(y, p, k)
        }), {
          default: X(() => [
            Y(v.$slots, "default", {}, () => [
              Z(E(y.label ?? a.value), 1)
            ], !0)
          ]),
          _: 2
        }, 1040, ["href", "title", "onPress"])
      ], 64))), 128))
    ], 2));
  }
}), Yn = /* @__PURE__ */ U(pi, [["__scopeId", "data-v-6e649daa"]]), hi = /* @__PURE__ */ new Set(["entitykey", "entitylabel"]), mi = /* @__PURE__ */ new Set(["ordinal", "image", "component", "date"]), yi = 4;
function Ua(e) {
  return (e.field ?? e.key)?.toLowerCase();
}
function Qa(e) {
  return e.narrow === !1 || e.role === "identity" || e.activate || e.click || e.drill ? !1 : !mi.has(e.kind ?? "text") && Ua(e) !== void 0;
}
function gi(e, t) {
  if (Number.isInteger(e)) return e;
  const n = 10 ** yi;
  return (t ? Math.ceil(e * n - 1e-6) : Math.floor(e * n + 1e-6)) / n;
}
function _i(e, t) {
  let n = 1 / 0, a = -1 / 0;
  for (const s of t) {
    const l = ue(e, s);
    typeof l != "number" || !Number.isFinite(l) || (l < n && (n = l), l > a && (a = l));
  }
  return n <= a ? { min: n, max: a } : null;
}
function wi(e, t, n, a = null) {
  if (!Qa(e)) return [];
  const s = Ua(e);
  if (hi.has(s) && !e.value)
    return t.entityKey ? [{ label: null, entity: t.entityKey }] : [];
  if (e.flags)
    return Object.entries(e.flags).filter(([r]) => t.fields[r] === !0).map(([r, c]) => ({
      label: c,
      term: { kind: "field", field: r.toLowerCase(), comparator: ":", value: "true" }
    }));
  const l = ue(e, t), o = n?.facets.find((r) => r.key.toLowerCase() === s);
  if (typeof l == "number") {
    if (!Number.isFinite(l)) return [];
    const r = o?.kind === "range" ? { min: o.min, max: o.max } : a, c = e.narrow === "<=" || e.narrow !== ">=" && (!r || l - r.min <= r.max - l);
    return [{
      label: null,
      term: { kind: "field", field: s, comparator: c ? "<=" : ">=", value: String(gi(l, c)) }
    }];
  }
  return (Array.isArray(l) ? l : [l]).filter(
    (r) => typeof r == "string" && r !== ""
  ).map((r) => ({
    label: Array.isArray(l) ? r : null,
    term: { kind: "field", field: s, comparator: "=", value: r }
  }));
}
const Xn = /* @__PURE__ */ new WeakMap();
function ki(e, t) {
  let n = Xn.get(e);
  return n || Xn.set(e, n = /* @__PURE__ */ new Map()), n.has(t) || n.set(t, _i(t, e)), n.get(t);
}
const bi = /* @__PURE__ */ W({
  __name: "ColumnCell",
  props: {
    column: {},
    entry: {}
  },
  setup(e) {
    const t = e, n = ee(), a = f(() => t.column.kind ?? "text"), s = f(() => ue(t.column, t.entry.row)), l = f(
      () => a.value === "ordinal" ? t.entry.ordinal : Ae(t.column, t.entry.row)
    ), o = f(() => s.value), i = f(() => t.column.activate === !0 || !!t.column.click), r = f(() => Xt(t.column)), c = f(() => ua(t.column, t.entry.row)), d = f(() => {
      if (!Qa(t.column)) return [];
      const _ = typeof s.value == "number" ? ki(n.rows.value, t.column) : null;
      return wi(t.column, t.entry.row, t.entry.entity ?? null, _);
    });
    function v(_) {
      i.value && (_.stopPropagation(), g(st(_)));
    }
    function g(_) {
      t.column.click?.(t.entry.row, _), t.column.activate && n.activate(t.entry.row, _);
    }
    const y = f(() => t.column.click ? t.column.clickHref?.(t.entry.row) ?? null : t.column.activate ? n.pressHref(t.entry.row) : null);
    return (_, p) => a.value === "component" && e.column.component ? (u(), I(Xe(e.column.component), {
      key: 0,
      row: e.entry.row,
      entry: e.entry,
      value: s.value,
      column: e.column
    }, null, 8, ["row", "entry", "value", "column"])) : a.value === "status" && d.value.length ? (u(), I(Yn, {
      key: 1,
      entry: e.entry,
      column: e.column,
      narrowings: d.value,
      truncates: !1
    }, {
      default: X(() => [
        G(We, { status: o.value }, null, 8, ["status"])
      ]),
      _: 1
    }, 8, ["entry", "column", "narrowings"])) : a.value === "status" ? (u(), I(We, {
      key: 2,
      status: o.value
    }, null, 8, ["status"])) : a.value === "image" ? (u(), I(Ht, {
      key: 3,
      class: "dc-cell__image",
      src: typeof s.value == "string" ? s.value : "",
      style: re({ maxHeight: e.column.height }),
      onClick: v
    }, null, 8, ["src", "style"])) : e.column.drill || e.column.click && e.column.role === "metric" ? (u(), I(ft, {
      key: 4,
      entry: e.entry,
      column: e.column
    }, null, 8, ["entry", "column"])) : i.value ? (u(), I(se, De({
      key: 5,
      class: ["dc-table__open", { "dc-truncate": r.value }],
      href: y.value,
      title: c.value
    }, cn(e.column.activate ? w(bn)(w(n), w(ja)(w(n), e.entry)) : {}), {
      onPress: p[0] || (p[0] = (k, P) => {
        P.stopPropagation(), g(k);
      })
    }), {
      default: X(() => [
        Z(E(l.value), 1)
      ]),
      _: 1
    }, 16, ["class", "href", "title"])) : d.value.length ? (u(), I(Yn, {
      key: 6,
      entry: e.entry,
      column: e.column,
      narrowings: d.value,
      truncates: r.value
    }, null, 8, ["entry", "column", "narrowings", "truncates"])) : (u(), h("span", {
      key: 7,
      class: de(["dc-cell__text", { "dc-truncate": r.value }])
    }, E(l.value), 3));
  }
}), Jn = /* @__PURE__ */ U(bi, [["__scopeId", "data-v-d07057a1"]]), $i = {
  key: 0,
  class: "dc-table__none"
}, xi = { class: "dc-table__detail" }, Si = ["data-dc-wrap", "data-dc-row-links"], Ci = {
  key: 0,
  class: "dc-table__pick",
  scope: "col"
}, Pi = {
  key: 1,
  class: "dc-table__standing",
  scope: "col"
}, Ei = ["data-dc-align", "data-dc-hide", "aria-sort", "title"], Mi = {
  key: 2,
  class: "dc-table__head"
}, Li = ["onClick"], Ti = {
  key: 0,
  class: "dc-table__pick"
}, Oi = {
  key: 1,
  class: "dc-table__standing"
}, Ni = ["data-dc-align", "data-dc-hide", "title"], Ai = {
  key: 1,
  class: "dc-table__name"
}, Ii = /* @__PURE__ */ W({
  __name: "TableView",
  setup(e) {
    const t = ee(), n = Re(), a = vi();
    function s(L, Q) {
      if (!t.rowLinks?.value || Pa()) return;
      const N = t.pressHref(L);
      if (N && en(Q)) {
        Zt(N, Q);
        return;
      }
      t.activate(L, st(Q));
    }
    const l = f(() => t.rowLinks?.value ? new Map(n.value.map((L) => [L.key, t.pressHref(L.row)])) : /* @__PURE__ */ new Map()), o = f(
      () => a.value.find((L) => L.role === "identity") ?? a.value[0]
    );
    function i(L, Q, N) {
      N.stopPropagation(), t.activate(L, Q);
    }
    function r(L) {
      const Q = ha(L, t.entity.value, t.schema.value), N = Q ? `Shortcut: ${Q}` : void 0;
      return [L.hint, N].filter(Boolean).join(`
`) || void 0;
    }
    const c = f(() => {
      const L = a.value.find((N) => N.scope);
      return L || ((t.entity.value ? !!t.entity.value.href : t.entities.value.some((N) => N.href)) ? a.value.find((N) => N.activate) : void 0);
    }), d = f(
      () => t.entity.value ? !!t.entity.value.scope : t.entities.value.some((L) => L.scope)
    ), v = (L) => ut(L.entity, L.row), g = (L) => gn(t.query.value.expr, v(L));
    function y(L, Q) {
      t.setExpression(Jt(t.query.value.expr, v(L), Q));
    }
    const _ = f(() => {
      const L = n.value.filter((N) => v(N) !== null), Q = L.filter((N) => N.selected);
      return Q.length ? Q : L;
    }), p = f(() => _.value.some((L) => L.selected)), k = f(() => {
      const L = _.value[0];
      return L ? g(L) : null;
    }), P = f(
      () => _.value.some((L) => g(L) !== k.value)
    ), x = f(
      () => p.value ? "the ticked rows" : "every row on this page"
    );
    function m(L) {
      t.setExpression(
        _.value.reduce(
          (Q, N) => Jt(Q, v(N), L),
          t.query.value.expr
        )
      );
    }
    const b = f(
      () => a.value.some((L) => L.kind === "image" || L.height !== void 0)
    );
    function T(L) {
      L && (t.query.value.sort === L ? t.toggleDirection() : t.setSort(L));
    }
    function F(L) {
      return L ? t.query.value.sort === L ? t.hrefFor({ dir: t.query.value.dir === "desc" ? "asc" : "desc" }) : t.hrefFor({ sort: L }) : null;
    }
    const ie = f(() => t.entity.value?.label ?? "The result set"), O = f(() => new Set(t.sorts.value.map((L) => L.key))), B = (L) => L.sort !== void 0 && O.value.has(L.sort), z = (L) => {
      if (B(L))
        return t.query.value.sort !== L.sort ? "none" : t.query.value.dir === "desc" ? "descending" : "ascending";
    };
    function ae(L) {
      return [
        An(L),
        L.muted ? "dc-table__muted" : "",
        L.mono ? "dc-mono" : "",
        Xt(L) ? "dc-truncate" : ""
      ].filter(Boolean).join(" ");
    }
    function oe(L, Q) {
      if (!(!Xt(L) || L.activate || L.click))
        return ua(L, Q.row);
    }
    const te = H(null);
    function ce(L) {
      te.value && (te.value.scrollLeft = L.target.scrollLeft);
    }
    return (L, Q) => w(a).length ? (u(), h("table", {
      key: 1,
      class: "dc-table",
      "data-dc-wrap": b.value ? "" : void 0,
      "data-dc-row-links": w(t).rowLinks?.value ? "" : void 0
    }, [
      S("thead", {
        ref_key: "head",
        ref: te,
        "data-dc-stuck": ""
      }, [
        S("tr", null, [
          w(t).selectable.value ? (u(), h("th", Ci, [
            G(Ha)
          ])) : M("", !0),
          d.value ? (u(), h("th", Pi, [
            _.value.length ? (u(), I(sn, {
              key: 0,
              standing: k.value,
              mixed: P.value,
              name: x.value,
              onSet: m
            }, null, 8, ["standing", "mixed", "name"])) : M("", !0)
          ])) : M("", !0),
          (u(!0), h(K, null, J(w(a), (N, j) => (u(), h("th", {
            key: w(On)(N, j),
            scope: "col",
            class: de(w(An)(N)),
            style: re({ width: N.width }),
            "data-dc-align": w(Nn)(N),
            "data-dc-hide": N.hideBelow,
            "aria-sort": z(N),
            title: r(N)
          }, [
            B(N) ? (u(), I(se, {
              key: 0,
              class: "dc-table__sort",
              href: F(N.sort),
              onPress: (ve) => T(N.sort)
            }, {
              default: X(() => [
                Z(E(N.label), 1)
              ]),
              _: 2
            }, 1032, ["href", "onPress"])) : (u(), h(K, { key: 1 }, [
              Z(E(N.label), 1)
            ], 64)),
            N.header ? (u(), h("span", Mi, [
              (u(), I(Xe(N.header), {
                column: N,
                entity: w(t).entity.value
              }, null, 8, ["column", "entity"]))
            ])) : M("", !0)
          ], 14, Ei))), 128))
        ])
      ], 512),
      S("tbody", {
        "data-dc-scroll": "",
        onScroll: ce
      }, [
        (u(!0), h(K, null, J(w(n), (N) => (u(), h("tr", {
          key: N.key,
          class: "dc-table__row",
          onClick: (j) => s(N.row, j)
        }, [
          w(t).selectable.value ? (u(), h("td", Ti, [
            G(Be, {
              row: N.row,
              selected: N.selected,
              name: N.parts.identity
            }, null, 8, ["row", "selected", "name"])
          ])) : M("", !0),
          d.value ? (u(), h("td", Oi, [
            v(N) !== null ? (u(), I(sn, {
              key: 0,
              standing: g(N),
              name: N.parts.identity,
              onSet: (j) => y(N, j)
            }, null, 8, ["standing", "name", "onSet"])) : M("", !0)
          ])) : M("", !0),
          (u(!0), h(K, null, J(w(a), (j, ve) => (u(), h("td", {
            key: w(On)(j, ve),
            class: de(ae(j)),
            style: re({ width: j.width }),
            "data-dc-align": w(Nn)(j),
            "data-dc-hide": j.hideBelow,
            title: oe(j, N)
          }, [
            l.value.get(N.key) ? (u(), I(se, De({
              key: 0,
              class: "dc-table__cell-link",
              href: l.value.get(N.key),
              tabindex: j === o.value ? void 0 : -1,
              "aria-hidden": j === o.value ? void 0 : "true",
              "aria-label": j === o.value ? N.parts.identity : void 0
            }, cn(w(bn)(w(t), w(ja)(w(t), N))), {
              onPress: (be, ye) => i(N.row, be, ye)
            }), null, 16, ["href", "tabindex", "aria-hidden", "aria-label", "onPress"])) : M("", !0),
            j === c.value ? (u(), h("span", Ai, [
              G(Jn, {
                column: j,
                entry: N
              }, null, 8, ["column", "entry"]),
              G(pt, { entry: N }, null, 8, ["entry"]),
              G(vt, { entry: N }, null, 8, ["entry"])
            ])) : (u(), I(Jn, {
              key: 2,
              column: j,
              entry: N
            }, null, 8, ["column", "entry"]))
          ], 14, Ni))), 128))
        ], 8, Li))), 128))
      ], 32)
    ], 8, Si)) : (u(), h("p", $i, [
      Q[2] || (Q[2] = S("span", { class: "dc-table__headline" }, "No columns declared", -1)),
      S("span", xi, [
        Z(E(ie.value) + " has no ", 1),
        Q[0] || (Q[0] = S("code", null, "columns", -1)),
        Q[1] || (Q[1] = Z(" in the schema, so there is no table to draw. ", -1))
      ])
    ]));
  }
}), Ga = /* @__PURE__ */ U(Ii, [["__scopeId", "data-v-8a634047"]]);
function Ri(e) {
  const t = me([]), n = H(!1), a = me(null);
  let s = 0;
  const l = (r, c, d, v, g) => ({
    entity: r,
    rows: e.limit.value > 0 ? c.rows.map((y, _) => qa(y, _, r, e.isPinned(y.id))) : [],
    total: c.total,
    count: d ? Yt(r) : Je(c.total),
    pinned: Bi(v, c, g)
  }), o = () => {
    const r = ++s, c = e.query.value, d = e.schema.value, v = e.entities.value, g = e.limit.value, y = e.within?.value.trim() ?? "", _ = dn(c) && !y, p = y ? pn(y, c.expr) : c.expr, k = v.map((P) => ({
      entity: P,
      // Scope the query to this entity, keeping the expression and ordering.
      outcome: e.source.value.query({
        // Each card is the top few of its type, wherever the shell's own
        // result set has been paged to — so this asks for the first page.
        query: { ...c, entity: P.key, expr: p, page: 1 },
        schema: d,
        entity: P,
        /*
         * One row where none are shown, not none: to a source a limit of 0 is
         * no limit, which would fetch every record of every type to draw a
         * count. The one row is still read — it is what says whether the type
         * holds nothing but the record the query named.
         */
        limit: Math.max(g, 1),
        offset: 0
      })
    }));
    if (k.every(({ outcome: P }) => !(P instanceof Promise))) {
      t.value = k.map(
        ({ entity: P, outcome: x }) => l(P, x, _, d, p)
      ), a.value = null, n.value = !1;
      return;
    }
    n.value = !0, Promise.all(k.map(({ outcome: P }) => Promise.resolve(P))).then((P) => {
      r === s && (t.value = P.map(
        (x, m) => l(k[m].entity, x, _, d, p)
      ), a.value = null);
    }).catch((P) => {
      r === s && (a.value = P, t.value = []);
    }).finally(() => {
      r === s && (n.value = !1);
    });
  }, i = () => {
    try {
      o();
    } catch (r) {
      a.value = r, t.value = [], n.value = !1;
    }
  };
  return ne(
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
function Bi(e, t, n) {
  const a = t.rows[0];
  if (t.total !== 1 || t.rows.length !== 1 || !a)
    return !1;
  const s = n.trim();
  if (!s)
    return !1;
  const l = kt(e, a);
  return !!l && dt(s, l) === s;
}
const Hi = ["data-dc-pending", "data-dc-heads-only"], qi = {
  key: 0,
  class: "dc-types__state",
  role: "alert"
}, Fi = {
  key: 1,
  class: "dc-types__state",
  "aria-live": "polite"
}, Vi = {
  key: 2,
  class: "dc-types__state"
}, Di = ["data-dc-empty"], Ki = { class: "dc-type__name" }, Wi = { class: "dc-type__count dc-mono" }, zi = {
  key: 0,
  class: "dc-type__note dc-mono"
}, ji = { class: "dc-type__sr" }, Ui = {
  key: 1,
  class: "dc-type__description"
}, Qi = {
  key: 0,
  class: "dc-type__empty"
}, Gi = { class: "dc-type__identity" }, Yi = { class: "dc-type__primary dc-truncate" }, Xi = { class: "dc-type__secondary dc-mono dc-truncate" }, Ji = { class: "dc-type__trailing dc-mono" }, Zi = { class: "dc-type__metric-value" }, ec = { class: "dc-type__metric-label" }, tc = {
  key: 0,
  class: "dc-type__date"
}, nc = /* @__PURE__ */ W({
  __name: "TypeCardsView",
  setup(e) {
    const t = ee(), { previews: n, pending: a, error: s } = Ri({
      source: t.source,
      schema: t.schema,
      // The query as the results are read under it, so a word being typed in the
      // header narrows the cards as it narrows any list — see `liveQuery`.
      query: t.liveQuery,
      entities: t.entities,
      limit: t.previewsPerType,
      within: t.within,
      isPinned: (r) => t.isPinnedId(r)
    }), l = f(
      () => !t.isPristine.value || !!t.within.value || t.drafting.value
    ), o = f(() => t.previewsPerType.value <= 0), i = f(
      () => n.value.filter(
        (r) => !r.pinned && (r.total > 0 || !o.value && r.entity.create)
      )
    );
    return (r, c) => (u(), h("div", {
      class: "dc-types",
      "data-dc-pending": w(a) ? "true" : "false",
      "data-dc-heads-only": o.value ? "true" : "false"
    }, [
      Y(r.$slots, "before", {}, void 0, !0),
      w(s) ? (u(), h("p", qi, " Could not load results: " + E(w(s) instanceof Error ? w(s).message : "the data source failed."), 1)) : !i.value.length && w(a) ? (u(), h("p", Fi, " Running query… ")) : i.value.length ? M("", !0) : (u(), h("p", Vi, E(l.value ? "Nothing matches this query" : "Nothing here yet"), 1)),
      (u(!0), h(K, null, J(i.value, (d) => (u(), h("section", {
        key: d.entity.key,
        class: "dc-type",
        "data-dc-empty": d.total ? "false" : "true"
      }, [
        G(se, {
          class: "dc-type__head",
          href: w(t).entityHref(d.entity.key),
          onPress: (v) => w(t).setEntity(d.entity.key)
        }, {
          default: X(() => [
            S("span", Ki, E(d.entity.label), 1),
            S("span", Wi, E(d.count), 1),
            d.entity.note ? (u(), h("span", zi, E(d.entity.note), 1)) : M("", !0),
            c[0] || (c[0] = S("span", {
              class: "dc-type__go",
              "aria-hidden": "true"
            }, "→", -1)),
            S("span", ji, "Show only " + E(d.entity.label.toLowerCase()), 1),
            d.entity.description ? (u(), h("span", Ui, E(d.entity.description), 1)) : M("", !0)
          ]),
          _: 2
        }, 1032, ["href", "onPress"]),
        d.total ? M("", !0) : (u(), h("p", Qi, E(l.value ? "No matches" : "Nothing here yet"), 1)),
        (u(!0), h(K, null, J(d.rows, (v) => (u(), h("div", {
          key: v.key,
          class: "dc-type__row"
        }, [
          G(se, {
            class: "dc-type__open",
            href: w(t).pressHref(v.row),
            onPress: (g) => w(t).activate(v.row, g)
          }, {
            default: X(() => [
              S("span", Gi, [
                S("span", Yi, E(v.parts.identity), 1),
                S("span", Xi, E(v.parts.reference), 1)
              ])
            ]),
            _: 2
          }, 1032, ["href", "onPress"]),
          S("span", Ji, [
            (u(!0), h(K, null, J(v.parts.metrics.slice(0, 1), (g) => (u(), I(ft, {
              key: g.column.key ?? g.label,
              class: "dc-type__metric",
              entry: v,
              column: g.column
            }, {
              default: X(() => [
                S("span", Zi, E(g.text), 1),
                S("span", ec, E(g.label), 1)
              ]),
              _: 2
            }, 1032, ["entry", "column"]))), 128)),
            v.parts.updated ? (u(), h("span", tc, E(v.parts.updated), 1)) : M("", !0),
            G(kn, { entry: v }, null, 8, ["entry"]),
            G(pt, { entry: v }, null, 8, ["entry"]),
            G(vt, { entry: v }, null, 8, ["entry"])
          ])
        ]))), 128)),
        d.entity.create && !o.value ? (u(), I(se, {
          key: 1,
          class: "dc-type__new",
          href: w(t).createHref?.(d.entity),
          onPress: (v) => w(t).create(d.entity)
        }, {
          default: X(() => [
            c[1] || (c[1] = S("span", {
              class: "dc-type__plus",
              "aria-hidden": "true"
            }, "+", -1)),
            Z(" " + E(d.entity.create), 1)
          ]),
          _: 2
        }, 1032, ["href", "onPress"])) : M("", !0)
      ], 8, Di))), 128)),
      Y(r.$slots, "after", {}, void 0, !0)
    ], 8, Hi));
  }
}), Ya = /* @__PURE__ */ U(nc, [["__scopeId", "data-v-6f5fc1b0"]]), ac = ["data-dc-pending", "data-dc-more"], sc = {
  key: 0,
  class: "dc-results__state dc-results__state--loading",
  "aria-live": "polite"
}, lc = {
  key: 3,
  class: "dc-results__state",
  role: "alert"
}, rc = { class: "dc-results__detail" }, oc = {
  key: 4,
  class: "dc-results__state",
  "aria-live": "polite"
}, ic = {
  key: 5,
  class: "dc-results__state"
}, cc = { class: "dc-results__detail" }, uc = /* @__PURE__ */ W({
  __name: "ResultsArea",
  props: {
    views: {},
    loading: { type: Boolean }
  },
  setup(e) {
    const t = e, n = ee(), a = Et(), s = {
      list: ln,
      cards: Va,
      grid: Da,
      images: Ka,
      table: Ga,
      links: Wa,
      preview: za
    }, l = f(() => ia(n.query.value, t.views)), o = f(() => Ne(n.query.value.view, t.views)), i = f(() => (o.value === "record" ? null : s[o.value]) ?? ln), r = f(() => o.value === "record" ? n.recordView.value : null), c = f(() => n.rows.value.length > 0), d = f(() => n.error.value !== null), v = H(null);
    function g(m) {
      return m.querySelector("[data-dc-scroll]") ?? m;
    }
    ne(
      // The page on screen, which is the draft's own while one is being typed.
      () => n.liveQuery.value.page,
      () => {
        v.value && (g(v.value).scrollTop = 0);
      }
    );
    const y = H(""), _ = H({ x: 0, y: 0 }), p = H(0);
    function k() {
      const m = v.value;
      if (!m) {
        y.value = "";
        return;
      }
      const b = g(m), T = {
        top: b.scrollTop > 1,
        right: b.scrollWidth - b.clientWidth - b.scrollLeft > 1,
        bottom: b.scrollHeight - b.clientHeight - b.scrollTop > 1,
        left: b.scrollLeft > 1
      };
      y.value = Object.entries(T).filter(([, F]) => F).map(([F]) => F).join(" "), _.value = {
        x: b.offsetHeight - b.clientHeight,
        y: b.offsetWidth - b.clientWidth
      }, p.value = m.querySelector("[data-dc-stuck]")?.offsetHeight ?? 0;
    }
    let P = null, x = null;
    return ne(
      v,
      (m, b) => {
        if (b?.removeEventListener("scroll", k, { capture: !0 }), P?.disconnect(), x?.disconnect(), P = null, x = null, k(), !m || (m.addEventListener("scroll", k, { passive: !0, capture: !0 }), typeof ResizeObserver > "u")) return;
        const T = new ResizeObserver(k), F = typeof MutationObserver > "u" ? null : new MutationObserver(() => {
          ie(), k();
        }), ie = () => {
          T.disconnect(), F?.disconnect();
          for (const O of /* @__PURE__ */ new Set([m, g(m)])) {
            T.observe(O);
            for (const B of O.children) T.observe(B);
            F?.observe(O, { childList: !0 });
          }
        };
        ie(), P = T, x = F;
      },
      { flush: "post" }
    ), we(() => {
      v.value?.removeEventListener("scroll", k, { capture: !0 }), P?.disconnect(), x?.disconnect();
    }), (m, b) => (u(), h("div", {
      ref_key: "scroller",
      ref: v,
      class: "dc-results",
      "data-dc-pending": w(n).pending.value ? "true" : "false",
      "data-dc-more": y.value,
      style: re({
        "--dc-results-gutter-x": `${_.value.x}px`,
        "--dc-results-gutter-y": `${_.value.y}px`,
        "--dc-results-stuck": `${p.value}px`
      })
    }, [
      e.loading ? (u(), h("p", sc, [...b[1] || (b[1] = [
        S("span", { class: "dc-results__detail" }, "Loading…", -1)
      ])])) : l.value ? (u(), I(Ya, { key: 1 }, Qt({ _: 2 }, [
        a["cards-before"] ? {
          name: "before",
          fn: X(() => [
            Y(m.$slots, "cards-before", {}, void 0, !0)
          ]),
          key: "0"
        } : void 0,
        a["cards-after"] ? {
          name: "after",
          fn: X(() => [
            Y(m.$slots, "cards-after", {}, void 0, !0)
          ]),
          key: "1"
        } : void 0
      ]), 1024)) : r.value?.id ? (u(), I(Xe(r.value.component), {
        key: 2,
        id: r.value.id
      }, null, 8, ["id"])) : d.value ? (u(), h("p", lc, [
        b[2] || (b[2] = S("span", { class: "dc-results__headline" }, "Could not load results", -1)),
        S("span", rc, E(w(n).error.value instanceof Error ? w(n).error.value.message : "The data source failed."), 1)
      ])) : !c.value && w(n).pending.value ? (u(), h("p", oc, [...b[3] || (b[3] = [
        S("span", { class: "dc-results__detail" }, "Running query…", -1)
      ])])) : c.value ? (u(), I(Xe(i.value), { key: 6 })) : (u(), h("div", ic, [
        b[4] || (b[4] = S("span", { class: "dc-results__headline" }, "Nothing matches this query", -1)),
        S("span", cc, E(w(n).summary.value), 1),
        w(n).isPristine.value ? M("", !0) : (u(), I(se, {
          key: 0,
          class: "dc-results__clear",
          href: w(n).isEverything.value ? w(n).clearHref() : w(n).entityHref(null),
          onPress: b[0] || (b[0] = (T) => w(n).isEverything.value ? w(n).clearFilters() : w(n).clearEntity())
        }, {
          default: X(() => [
            Z(E(w(n).isEverything.value ? "Clear filters" : "Search everything instead"), 1)
          ]),
          _: 1
        }, 8, ["href"]))
      ]))
    ], 12, ac));
  }
}), Xa = /* @__PURE__ */ U(uc, [["__scopeId", "data-v-bc18f2f9"]]), dc = ["data-dc-theme", "data-dc-value-press"], fc = {
  key: 0,
  class: "dc-shell__page"
}, vc = /* @__PURE__ */ W({
  __name: "DataShell",
  props: /* @__PURE__ */ En({
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
  emits: /* @__PURE__ */ En(["activate", "create", "duplicate", "delete", "operate", "drill", "query-change", "toggle-pin"], ["update:pinned", "update:selected"]),
  setup(e, { expose: t, emit: n }) {
    const a = e, s = n, l = Pn(e, "pinned"), o = Pn(e, "selected"), i = Et(), r = rn(aa, null), c = a.route || r ? null : is(), d = a.route ?? r ?? c;
    we(() => c?.dispose?.());
    const v = H(!!i.page);
    ts(() => {
      v.value = !!i.page;
    });
    const g = cs(d, {
      detached: () => v.value && a.pageQuery === "detached",
      path: () => a.listPath
    }), y = f(() => nl({ seed: a.schema.key })), _ = f(() => a.source ?? y.value), p = $l({
      schema: () => a.schema,
      adapter: g,
      defaults: () => a.defaults,
      navigationMode: () => a.navigationMode,
      facetNavigationMode: () => a.facetNavigationMode
    }), k = f(() => a.within?.trim() ?? ""), P = Pl({
      query: p.query,
      entity: p.entity,
      schema: f(() => a.schema),
      setExpression: p.setExpression
    });
    ne(p.query, ($) => s("query-change", $));
    const x = f(() => dl(a.schema, [p.query.value.expr])), m = f(
      () => x.value.flatMap(($) => {
        const R = a.schema.entities.find((D) => D.key === $.entityKey);
        return R ? [{ ...$, entity: R }] : [];
      })
    );
    function b() {
      if (i.record) return m.value;
      const $ = a.recordCards;
      return $ ? m.value.filter((R) => $[R.entityKey]) : [];
    }
    const T = f(() => {
      const [$, ...R] = m.value;
      if (!$ || R.length || p.entity.value !== null) return null;
      const D = a.recordViews?.[$.entityKey];
      return D ? { ...D, id: $.id } : null;
    }), F = f(() => {
      const $ = p.entity.value?.key;
      return $ && a.recordViews?.[$] || null;
    }), ie = f(() => {
      const $ = a.views, R = typeof $ == "function" ? $({ entity: p.entity.value, records: x.value }) : $;
      return T.value || F.value ? [...(R ?? un).filter((D) => D !== "record"), "record"] : R?.filter((D) => D !== "record");
    }), O = f(
      () => F.value !== null && Ne(p.query.value.view, ie.value) === "record"
    ), B = f(() => O.value ? 1 : a.limit), z = xl({
      source: _,
      query: P.live,
      schema: f(() => a.schema),
      entity: p.entity,
      limit: B,
      within: k
    }), ae = Sl({
      // Not before the data has landed: what is there until then is no place to hold.
      active: f(() => O.value && !a.loading),
      rows: z.rows,
      pending: z.pending,
      page: f(() => P.live.value.page),
      list: f(() => {
        const { entity: $, expr: R, sort: D, dir: $e } = P.live.value;
        return JSON.stringify([$, R, D, $e]);
      }),
      locate: z.locate,
      moveTo: ($) => {
        P.drafting.value ? P.setPage($) : p.setPage($, "replace");
      }
    }), oe = f(() => z.pageCount.value + (ae.gone.value ? 1 : 0)), te = f(() => {
      if (T.value) return T.value;
      const $ = F.value;
      return $ ? { ...$, id: ae.id.value ?? z.rows.value[0]?.id ?? null } : null;
    });
    function ce($) {
      const R = F.value !== null && Ne($, ie.value) === "record";
      if (R === O.value) {
        p.setView($);
        return;
      }
      const D = P.live.value.page, $e = R ? (D - 1) * a.limit + 1 : Math.ceil(D / a.limit);
      P.drafting.value ? (p.setView($), P.setPage($e)) : p.setView($, $e);
    }
    function L($) {
      if (!F.value || O.value) return null;
      const R = z.rows.value.indexOf($);
      return R === -1 ? null : z.offset.value + R + 1;
    }
    ne(
      [oe, z.pending, p.query, P.drafting, () => a.loading, v, ae.holding],
      () => {
        if (z.pending.value || P.drafting.value || a.loading || v.value) return;
        const $ = oe.value;
        p.query.value.page <= $ || (ae.gone.value ? ae.moveTo($) : ae.holding.value || p.setPage($, "replace"));
      },
      // Immediately, since a pasted URL is past the end before anything changes;
      // and after the render, so the correction is a navigation the mounted shell
      // makes rather than one it makes on the way up. An async source is still
      // pending here and corrects itself when its count lands.
      { immediate: !0, flush: "post" }
    );
    const Q = f(() => new Set(l.value));
    function N($) {
      const R = new Set(Q.value);
      R.has($.id) ? R.delete($.id) : R.add($.id), l.value = [...R], s("toggle-pin", $);
    }
    const j = f(() => {
      if (a.selectable === !0) return !0;
      const $ = p.entity.value;
      return !!($?.duplicate || $?.delete || $?.operations?.some((R) => R.selection !== !1));
    }), ve = f(() => new Set(o.value));
    function be($) {
      const R = new Set(ve.value);
      R.has($.id) ? R.delete($.id) : R.add($.id), o.value = [...R];
    }
    function ye($) {
      const R = new Set(ve.value);
      for (const D of z.rows.value)
        $ ? R.add(D.id) : R.delete(D.id);
      o.value = [...R];
    }
    function He() {
      o.value.length && (o.value = []);
    }
    const xe = f(() => ({
      ids: [...o.value],
      rows: z.rows.value.filter(($) => ve.value.has($.id)),
      entity: p.entity.value
    }));
    ne(() => p.query.value.entity, He);
    function Se($, R, D = {}, $e) {
      const Sn = zt(a.schema, p.query.value, $, D, $e);
      D.exclude ? p.narrow(Sn, R?.key ?? p.query.value.entity) : P.release(() => p.narrow(Sn, R?.key ?? null, R ? void 0 : "cards")), s("drill", $, R, D);
    }
    function Ce($) {
      return a.rowPress === "narrow" && kt(a.schema, $) !== null;
    }
    function C($) {
      return a.schema.entities.find((D) => D.key === $.entityKey)?.href?.($) || null;
    }
    const A = me(null);
    ne(p.query, () => {
      A.value = null;
    });
    const q = fl({
      ...p,
      draft: P.text,
      liveQuery: P.live,
      drafting: P.drafting,
      commitDraft: P.commit,
      abandonDraft: P.abandon,
      /*
       * A page of what is on screen: the draft's, while one is live, which are
       * held beside it rather than in the URL — see `liveQuery`.
       */
      setPage: ($, R) => {
        const D = ae.step($);
        D !== null && (P.drafting.value ? P.setPage(D) : p.setPage(D, R));
      },
      setView: ce,
      schema: f(() => a.schema),
      entities: f(() => a.schema.entities),
      rows: z.rows,
      total: z.total,
      matched: z.matched,
      limit: B,
      offset: z.offset,
      pageCount: oe,
      peek: z.peek,
      pending: z.pending,
      counting: z.counting,
      error: z.error,
      source: _,
      previewsPerType: f(() => a.previewsPerType),
      within: k,
      loading: f(() => a.loading),
      recordView: te,
      pinnable: f(() => a.pinnable === !0),
      isPinned: ($) => Q.value.has($.id),
      isPinnedId: ($) => Q.value.has($),
      togglePin: N,
      selectable: j,
      selection: xe,
      isSelected: ($) => ve.value.has($.id),
      toggleSelect: be,
      selectPage: ye,
      clearSelection: He,
      narrowsOnPress: f(() => a.rowPress === "narrow"),
      rowLinks: f(() => a.rowLinks),
      pressPreview: A,
      /*
       * The one place a press is read, so every view gets the same answer without
       * knowing which of the two it is: they all call this.
       */
      activate: ($, R = {}) => {
        if (Ce($)) {
          Se($, null, R);
          return;
        }
        const D = L($);
        if (D !== null) {
          P.drafting.value ? (p.setView("record"), P.setPage(D)) : p.setView("record", D);
          return;
        }
        const $e = C($);
        if ($e) {
          window.open($e, "_blank", "noopener");
          return;
        }
        s("activate", $);
      },
      pressHref: ($) => {
        if (Ce($)) return p.narrowHref(zt(a.schema, p.query.value, $), null, "cards");
        const R = L($);
        return R !== null ? p.hrefFor({ view: "record", page: R }) : C($) ?? a.activateHref?.($) ?? null;
      },
      recordHref: C,
      drillHref: ($, R, D) => kt(a.schema, $) ? p.narrowHref(
        zt(a.schema, p.query.value, $, {}, D),
        R?.key ?? null,
        R ? void 0 : "cards"
      ) : null,
      create: ($) => s("create", $),
      createHref: ($) => a.createHref?.($) ?? null,
      duplicate: () => s("duplicate", xe.value),
      delete: () => s("delete", xe.value),
      operate: ($) => s("operate", $, xe.value),
      drill: Se
    });
    hl({ theme: () => a.theme, accent: () => a.accent, tokens: () => a.tokens });
    const V = f(() => {
      if (!(!a.accent && !a.tokens))
        return { ...a.tokens, ...a.accent ? { "--dc-accent": a.accent } : {} };
    }), qe = H(null), Fe = H(0);
    let Ft = null;
    it(() => {
      const $ = qe.value;
      $ && (Fe.value = $.getBoundingClientRect().width, !(typeof ResizeObserver > "u") && (Ft = new ResizeObserver(([R]) => {
        Fe.value = R.contentRect.width;
      }), Ft.observe($)));
    }), we(() => Ft?.disconnect());
    const Vt = f(() => a.oneStripFrom !== !1 && Fe.value >= a.oneStripFrom), $n = f(
      () => Ne(p.query.value.view, ie.value) === "record" && te.value?.strip === !1
    ), xn = f(() => ({
      views: ie.value,
      selectionPlacement: a.selectionPlacement,
      pagesNote: a.pagesNote
    }));
    return t({
      query: p.query
    }), ($, R) => (u(), h("div", {
      ref_key: "root",
      ref: qe,
      class: "dc-shell",
      "data-dc-theme": e.theme,
      "data-dc-value-press": e.valuePress,
      style: re(V.value)
    }, [
      S("div", {
        class: de(["dc-shell__head", { "dc-shell__head--one-strip": Vt.value }])
      }, [
        G(Ba, null, Qt({ _: 2 }, [
          i.page ? void 0 : {
            name: "lead",
            fn: X(() => [
              G(Hr, {
                views: ie.value,
                "type-chooser": e.typeChooser
              }, null, 8, ["views", "type-chooser"])
            ]),
            key: "0"
          },
          i.brand ? {
            name: "brand",
            fn: X((D) => [
              Y($.$slots, "brand", Dt(ns(D)), void 0, !0)
            ]),
            key: "1"
          } : void 0,
          i.actions ? {
            name: "actions",
            fn: X(() => [
              Y($.$slots, "actions", {}, void 0, !0)
            ]),
            key: "2"
          } : void 0
        ]), 1024),
        Vt.value && !i.page && !$n.value ? (u(), I(an, Dt(De({ key: 0 }, xn.value)), null, 16)) : M("", !0)
      ], 2),
      i.page ? (u(), h("div", fc, [
        Y($.$slots, "page", {
          query: w(q).query.value
        }, void 0, !0)
      ])) : M("", !0),
      !Vt.value && !i.page && !$n.value ? (u(), I(an, Dt(De({ key: 1 }, xn.value)), null, 16)) : M("", !0),
      i.page ? M("", !0) : Y($.$slots, "results", {
        rows: w(q).rows.value,
        total: w(q).total.value,
        offset: w(q).offset.value,
        pageCount: w(q).pageCount.value,
        query: w(q).liveQuery.value,
        pending: w(q).pending.value,
        loading: e.loading
      }, () => [
        G(Xa, {
          views: ie.value,
          loading: e.loading
        }, Qt({ _: 2 }, [
          i["cards-before"] || b().length ? {
            name: "cards-before",
            fn: X(() => [
              (u(!0), h(K, null, J(b(), (D) => (u(), h(K, {
                key: `${D.entityKey}:${D.id}`
              }, [
                i.record ? Y($.$slots, "record", {
                  id: D.id,
                  entity: D.entity
                }, void 0, !0, 0) : (u(), I(Xe(e.recordCards?.[D.entityKey]), {
                  key: 1,
                  id: D.id
                }, null, 8, ["id"]))
              ], 64))), 128)),
              Y($.$slots, "cards-before", {}, void 0, !0)
            ]),
            key: "0"
          } : void 0,
          i["cards-after"] ? {
            name: "cards-after",
            fn: X(() => [
              Y($.$slots, "cards-after", {}, void 0, !0)
            ]),
            key: "1"
          } : void 0
        ]), 1032, ["views", "loading"])
      ], !0, 2)
    ], 12, dc));
  }
}), pc = /* @__PURE__ */ U(vc, [["__scopeId", "data-v-7ae0f737"]]), hc = ["data-dc-muted", "data-dc-collapsed"], mc = ["data-dc-collapsible"], yc = ["aria-expanded", "aria-controls"], gc = { class: "dc-shell-card__sr" }, _c = {
  key: 0,
  class: "dc-shell-card__identity"
}, wc = { class: "dc-shell-card__title dc-shell-card__name" }, kc = {
  key: 0,
  class: "dc-shell-card__ref dc-mono"
}, bc = {
  key: 1,
  class: "dc-shell-card__title"
}, $c = {
  key: 2,
  class: "dc-shell-card__count dc-mono"
}, xc = {
  key: 1,
  class: "dc-shell-card__aside"
}, Sc = ["data-dc-flush"], Cc = /* @__PURE__ */ W({
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
    const n = e, a = t, s = H(n.defaultCollapsed === !0), l = f(() => n.span === "all" ? { gridColumn: "1 / -1" } : void 0), o = Et();
    function i(O) {
      return r(O?.() ?? []);
    }
    function r(O) {
      return O.some((B) => B.type === as ? !1 : B.type === ss ? String(B.children ?? "").trim().length > 0 : B.type === K ? r(B.children ?? []) : !0);
    }
    const c = f(
      () => !!n.title || !!n.name || d.value || i(o.head)
    ), d = f(() => i(o.aside)), v = f(() => i(o.default)), g = f(() => i(o.foot)), y = f(
      () => !!n.name && (!!n.reference || i(o.reference))
    ), _ = f(() => n.collapsible === !0 && c.value), p = f(() => _.value && (n.collapsed ?? s.value));
    function k() {
      const O = !p.value;
      s.value = O, a("update:collapsed", O);
    }
    const P = Mt() ?? "dc-shell-card", x = `${P}-body`, m = `${P}-foot`, b = f(
      () => [v.value ? x : "", g.value ? m : ""].filter(Boolean).join(" ") || void 0
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
    ].join(", "), F = H(null);
    function ie(O) {
      if (!_.value) return;
      const B = O.target?.closest(T);
      B && F.value?.contains(B) || typeof window < "u" && window.getSelection()?.toString() || k();
    }
    return (O, B) => (u(), h("section", {
      class: "dc-shell-card",
      style: re(l.value),
      "data-dc-muted": e.muted ? "true" : "false",
      "data-dc-collapsed": p.value ? "true" : "false"
    }, [
      c.value ? (u(), h("header", {
        key: 0,
        ref_key: "head",
        ref: F,
        class: "dc-shell-card__head",
        "data-dc-collapsible": _.value ? "true" : "false",
        onClick: ie
      }, [
        _.value ? (u(), h("button", {
          key: 0,
          type: "button",
          class: "dc-shell-card__toggle",
          "aria-expanded": p.value ? "false" : "true",
          "aria-controls": b.value,
          onClick: k
        }, [
          B[0] || (B[0] = S("svg", {
            class: "dc-shell-card__chevron",
            viewBox: "0 0 10 10",
            "aria-hidden": "true"
          }, [
            S("path", { d: "M2 3.5 5 6.5 8 3.5" })
          ], -1)),
          S("span", gc, E(e.name || e.title || "Card"), 1)
        ], 8, yc)) : M("", !0),
        Y(O.$slots, "head", {}, () => [
          e.name ? (u(), h("div", _c, [
            S("h2", wc, E(e.name), 1),
            y.value ? (u(), h("span", kc, [
              Y(O.$slots, "reference", {}, () => [
                Z(E(e.reference), 1)
              ], !0)
            ])) : M("", !0)
          ])) : (u(), h("h2", bc, E(e.title), 1)),
          e.count !== void 0 ? (u(), h("span", $c, E(e.count), 1)) : M("", !0)
        ], !0),
        d.value ? (u(), h("span", xc, [
          Y(O.$slots, "aside", {}, void 0, !0)
        ])) : M("", !0)
      ], 8, mc)) : M("", !0),
      v.value ? Ut((u(), h("div", {
        key: 1,
        id: x,
        class: "dc-shell-card__body",
        "data-dc-flush": e.flush ? "true" : "false"
      }, [
        Y(O.$slots, "default", {}, void 0, !0)
      ], 8, Sc)), [
        [Mn, !p.value]
      ]) : M("", !0),
      g.value ? Ut((u(), h("footer", {
        key: 2,
        id: m,
        class: "dc-shell-card__foot"
      }, [
        Y(O.$slots, "foot", {}, void 0, !0)
      ], 512)), [
        [Mn, !p.value]
      ]) : M("", !0)
    ], 12, hc));
  }
}), Cu = /* @__PURE__ */ U(Cc, [["__scopeId", "data-v-073304c8"]]), Pc = ["aria-label"], Ec = ["aria-checked", "data-dc-active", "tabindex", "onClick", "onKeydown"], Mc = /* @__PURE__ */ W({
  __name: "SegmentedControl",
  props: {
    modelValue: {},
    options: {},
    label: {},
    mono: { type: Boolean }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const n = e, a = t, s = H([]);
    function l(o, i) {
      const r = n.options.length;
      let c = null;
      if (o.key === "ArrowRight" || o.key === "ArrowDown" ? c = (i + 1) % r : o.key === "ArrowLeft" || o.key === "ArrowUp" ? c = (i - 1 + r) % r : o.key === "Home" ? c = 0 : o.key === "End" && (c = r - 1), c === null) return;
      o.preventDefault();
      const d = n.options[c];
      d && (a("update:modelValue", d.key), s.value[c]?.focus());
    }
    return (o, i) => (u(), h("div", {
      class: "dc-segmented",
      role: "radiogroup",
      "aria-label": e.label
    }, [
      (u(!0), h(K, null, J(e.options, (r, c) => (u(), h("button", {
        key: r.key,
        ref_for: !0,
        ref_key: "buttons",
        ref: s,
        type: "button",
        role: "radio",
        class: de(["dc-segmented__item", { "dc-segmented__item--mono": e.mono }]),
        "aria-checked": r.key === e.modelValue,
        "data-dc-active": r.key === e.modelValue ? "true" : "false",
        tabindex: r.key === e.modelValue ? 0 : -1,
        onClick: (d) => a("update:modelValue", r.key),
        onKeydown: (d) => l(d, c)
      }, E(r.label), 43, Ec))), 128))
    ], 8, Pc));
  }
}), Lc = /* @__PURE__ */ U(Mc, [["__scopeId", "data-v-63fb5482"]]), Tc = { class: "dc-fact__label" }, Oc = ["title"], Nc = /* @__PURE__ */ W({
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
      if (s == null || s === "") return [ke];
      if (Array.isArray(s)) {
        const l = s.filter((o) => o != null && o !== "");
        return l.length ? l.map(String) : [ke];
      }
      return [String(s)];
    }), a = f(() => t.wide ? { gridColumn: "1 / -1" } : void 0);
    return (s, l) => (u(), h("div", {
      class: "dc-fact",
      style: re(a.value)
    }, [
      S("dt", Tc, [
        Y(s.$slots, "label", {}, () => [
          Z(E(e.label), 1)
        ], !0)
      ]),
      S("dd", {
        class: "dc-fact__value dc-mono",
        title: e.title
      }, [
        Y(s.$slots, "default", {}, () => [
          n.value.length === 1 ? (u(), h(K, { key: 0 }, [
            Z(E(n.value[0]), 1)
          ], 64)) : (u(!0), h(K, { key: 1 }, J(n.value, (o, i) => (u(), h("span", {
            key: i,
            class: "dc-fact__line"
          }, E(o), 1))), 128))
        ], !0)
      ], 8, Oc)
    ], 4));
  }
}), Ac = /* @__PURE__ */ U(Nc, [["__scopeId", "data-v-1f6d25e6"]]), Ic = /* @__PURE__ */ W({
  __name: "ShellFacts",
  props: {
    items: { default: () => [] },
    min: { default: "200px" }
  },
  setup(e) {
    const t = e, n = f(() => ({ "--dc-facts-min": t.min }));
    return (a, s) => (u(), h("dl", {
      class: "dc-facts",
      style: re(n.value)
    }, [
      (u(!0), h(K, null, J(e.items, (l, o) => (u(), I(Ac, {
        key: `${o}:${l.label}`,
        label: l.label,
        value: l.value,
        title: l.title,
        wide: l.wide
      }, null, 8, ["label", "value", "title", "wide"]))), 128)),
      Y(a.$slots, "default", {}, void 0, !0)
    ], 4));
  }
}), Pu = /* @__PURE__ */ U(Ic, [["__scopeId", "data-v-17455afa"]]), Rc = { class: "dc-counts" }, Bc = ["data-dc-tone"], Hc = {
  key: 0,
  class: "dc-counts__empty"
}, qc = /* @__PURE__ */ W({
  __name: "StatusCounts",
  props: {
    counts: {},
    empty: { default: ke }
  },
  setup(e) {
    const t = e, n = f(() => t.counts.filter((a) => a.count > 0));
    return (a, s) => (u(), h("span", Rc, [
      (u(!0), h(K, null, J(n.value, (l) => (u(), h("span", {
        key: l.label,
        class: "dc-counts__count",
        "data-dc-tone": l.tone ?? "neutral"
      }, E(l.count) + " " + E(l.label), 9, Bc))), 128)),
      n.value.length === 0 ? (u(), h("span", Hc, E(e.empty), 1)) : M("", !0)
    ]));
  }
}), Eu = /* @__PURE__ */ U(qc, [["__scopeId", "data-v-5553a9e2"]]), Fc = ["data-dc-copied", "title", "aria-label"], Vc = {
  key: 0,
  class: "dc-copy__mark",
  viewBox: "0 0 16 16",
  "aria-hidden": "true"
}, Dc = {
  key: 1,
  class: "dc-copy__mark",
  viewBox: "0 0 16 16",
  "aria-hidden": "true"
}, Kc = 1500, Wc = /* @__PURE__ */ W({
  __name: "CopyButton",
  props: {
    text: {},
    label: { default: "Copy to clipboard" }
  },
  emits: ["copied", "error"],
  setup(e, { emit: t }) {
    const n = e, a = t, s = H(!1);
    let l;
    async function o() {
      const i = typeof n.text == "function" ? n.text() : n.text;
      try {
        if (!navigator.clipboard) throw new Error("The clipboard is not available here");
        await navigator.clipboard.writeText(i);
      } catch (r) {
        a("error", r);
        return;
      }
      s.value = !0, clearTimeout(l), l = setTimeout(() => {
        s.value = !1;
      }, Kc), a("copied", i);
    }
    return we(() => clearTimeout(l)), (i, r) => (u(), h("button", {
      type: "button",
      class: "dc-copy",
      "data-dc-copied": s.value ? "true" : "false",
      title: s.value ? "Copied" : e.label,
      "aria-label": e.label,
      onClick: o
    }, [
      s.value ? (u(), h("svg", Dc, [...r[1] || (r[1] = [
        S("path", { d: "M3 8.5l3.2 3L13 4.5" }, null, -1)
      ])])) : (u(), h("svg", Vc, [...r[0] || (r[0] = [
        S("rect", {
          x: "5.5",
          y: "5.5",
          width: "8",
          height: "9",
          rx: "1.5"
        }, null, -1),
        S("path", { d: "M10.5 3.5v-1a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h1" }, null, -1)
      ])]))
    ], 8, Fc));
  }
}), zc = /* @__PURE__ */ U(Wc, [["__scopeId", "data-v-f4249d7f"]]), jc = ["data-dc-copy", "data-dc-wrap", "data-dc-tone"], Uc = /* @__PURE__ */ W({
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
    const n = e, a = t, s = H(null), l = f(() => n.maxHeight === void 0 ? void 0 : { maxHeight: typeof n.maxHeight == "number" ? `${n.maxHeight}px` : n.maxHeight });
    function o() {
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
        style: re(l.value)
      }, [
        Y(i.$slots, "default", {}, () => [
          Z(E(e.code), 1)
        ], !0)
      ], 4),
      e.copy ? (u(), I(zc, {
        key: 0,
        class: "dc-code__copy",
        text: o,
        label: e.copyLabel,
        onCopied: r[0] || (r[0] = (c) => a("copied", c)),
        onError: r[1] || (r[1] = (c) => a("error", c))
      }, null, 8, ["label"])) : M("", !0)
    ], 8, jc));
  }
}), Mu = /* @__PURE__ */ U(Uc, [["__scopeId", "data-v-67b371dd"]]), Qc = 24, Gc = /* @__PURE__ */ W({
  __name: "ShellLog",
  props: {
    fetchChunk: {},
    stripAnsi: { type: Boolean },
    maxHeight: { default: "460px" }
  },
  setup(e, { expose: t }) {
    const n = e, a = H(""), s = f(() => n.stripAnsi ? gs(a.value) : a.value), l = H(null);
    let o = 0, i = null;
    function r() {
      return i ??= c().finally(() => {
        i = null;
      }), i;
    }
    async function c() {
      const { chunk: g, offset: y } = await n.fetchChunk(o);
      if (o = y, !g) return;
      const _ = l.value, p = !_ || _.scrollTop + _.clientHeight >= _.scrollHeight - Qc;
      a.value += g, p && (await Ye(), l.value && (l.value.scrollTop = l.value.scrollHeight));
    }
    function d() {
      a.value = "", o = 0;
    }
    const v = f(() => n.maxHeight === void 0 ? void 0 : { maxHeight: typeof n.maxHeight == "number" ? `${n.maxHeight}px` : n.maxHeight });
    return t({ poll: r, reset: d }), (g, y) => (u(), h("pre", {
      ref_key: "pane",
      ref: l,
      class: "dc-log dc-mono",
      style: re(v.value)
    }, E(s.value), 5));
  }
}), Lu = /* @__PURE__ */ U(Gc, [["__scopeId", "data-v-2c86947e"]]), Yc = ["data-dc-theme"], Xc = ["aria-labelledby", "aria-label"], Jc = {
  key: 1,
  class: "dc-dialog__actions"
}, Ue = [], Zc = /* @__PURE__ */ W({
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
    const n = e, a = t, { theme: s, style: l, adopt: o } = _n(n), i = `${Mt() ?? "dc-dialog"}-title`, r = H(null);
    function c() {
      a("close"), a("update:open", !1);
    }
    const d = Symbol("dc-dialog");
    function v(m) {
      m.key !== "Escape" || m.defaultPrevented || Ue[Ue.length - 1] === d && (m.preventDefault(), c());
    }
    let g = !1;
    function y(m) {
      g = m.target === m.currentTarget;
    }
    function _(m) {
      m.target === m.currentTarget && g && c(), g = !1;
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
    let k = null;
    async function P() {
      Ue.push(d), document.addEventListener("keydown", v), k = document.activeElement instanceof HTMLElement ? document.activeElement : null, o(), await Ye(), (r.value?.querySelector("[autofocus]") ?? r.value?.querySelector(p) ?? r.value)?.focus();
    }
    function x() {
      const m = Ue.indexOf(d);
      m !== -1 && (Ue.splice(m, 1), document.removeEventListener("keydown", v), k?.isConnected && k.focus(), k = null);
    }
    return it(() => {
      n.open && P();
    }), ne(
      () => n.open,
      (m) => {
        m ? P() : x();
      }
    ), we(x), (m, b) => e.open ? (u(), I(Pt, {
      key: 0,
      to: e.to
    }, [
      S("div", {
        class: "dc-shell dc-layer dc-dialog",
        "data-dc-theme": w(s),
        style: re(w(l)),
        onPointerdown: y,
        onClick: _
      }, [
        S("div", {
          ref_key: "panel",
          ref: r,
          class: de(["dc-dialog__panel", e.panelClass]),
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
          }, E(e.title), 1)) : M("", !0),
          S("div", {
            class: de(["dc-dialog__body", e.bodyClass])
          }, [
            Y(m.$slots, "default", {}, void 0, !0)
          ], 2),
          m.$slots.actions ? (u(), h("div", Jc, [
            Y(m.$slots, "actions", {}, void 0, !0)
          ])) : M("", !0)
        ], 10, Xc)
      ], 44, Yc)
    ], 8, ["to"])) : M("", !0);
  }
}), Tu = /* @__PURE__ */ U(Zc, [["__scopeId", "data-v-0cccf313"]]), eu = 4500, tu = 9e3, ot = H([]);
let Zn = 0;
function Ja(e) {
  ot.value = ot.value.filter((t) => t.id !== e);
}
function Za(e, t = "ok") {
  Zn += 1;
  const n = Zn;
  ot.value = [...ot.value, { id: n, message: e, kind: t }], setTimeout(() => Ja(n), t === "err" ? tu : eu);
}
function nu(e) {
  Za(e instanceof Error ? e.message : String(e), "err");
}
function au() {
  return { toasts: ls(ot), toast: Za, toastError: nu, dismiss: Ja };
}
const su = ["data-dc-theme"], lu = ["data-dc-kind", "role"], ru = /* @__PURE__ */ W({
  __name: "ShellToasts",
  props: {
    to: { default: "body" },
    theme: { default: void 0 },
    accent: { default: void 0 },
    tokens: { default: void 0 }
  },
  setup(e) {
    const t = e, { toasts: n } = au(), { theme: a, style: s, adopt: l } = _n(t);
    return it(l), (o, i) => (u(), I(Pt, { to: e.to }, [
      S("div", {
        class: "dc-shell dc-layer dc-toasts",
        "data-dc-theme": w(a),
        style: re(w(s)),
        "aria-live": "polite"
      }, [
        (u(!0), h(K, null, J(w(n), (r) => (u(), h("div", {
          key: r.id,
          class: "dc-toast",
          "data-dc-kind": r.kind,
          role: r.kind === "err" ? "alert" : void 0
        }, E(r.message), 9, lu))), 128))
      ], 12, su)
    ], 8, ["to"]));
  }
}), Ou = /* @__PURE__ */ U(ru, [["__scopeId", "data-v-d970211c"]]);
function Nu(e, t) {
  const n = H(!1);
  let a = null, s = !1, l = 0;
  const o = () => {
    l++, n.value = !1, a !== null && (clearTimeout(a), a = null);
  };
  function i(d) {
    a = setTimeout(() => void r(d), t);
  }
  async function r(d) {
    if (s || d !== l) return;
    let v;
    try {
      v = await e();
    } catch {
      v = !1;
    }
    s || d !== l || (v ? i(d) : o());
  }
  const c = () => {
    n.value || (n.value = !0, r(++l));
  };
  return Ct(() => {
    s = !0, o();
  }, !0), { start: c, stop: o, polling: n };
}
function Au(e, t = {}) {
  const n = t.key ?? ((l) => JSON.stringify(l)), a = me();
  let s = null;
  return rs(() => {
    const l = e(), o = n(l);
    o !== s && (s = o, a.value = l);
  }), a;
}
function Iu(e = {}) {
  return { key: "ordinal", kind: "ordinal", label: "#", width: "52px", ...e };
}
function Ru(e = {}) {
  return { key: "status", role: "state", kind: "status", label: "State", sort: "state", width: "104px", ...e };
}
function Bu(e = {}) {
  return { key: "tint", role: "tint", ...e };
}
function Hu(e = {}) {
  return { key: "picture", role: "image", kind: "image", width: "56px", height: "40px", ...e };
}
function qu(e, t = {}) {
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
function Fu(e, t = {}) {
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
function Vu(e, t, n = {}) {
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
function Du(e, t, n = {}) {
  return { key: e, kind: "date", label: t, sort: e, width: "104px", mono: !0, muted: !0, ...n };
}
function Ku(e = {}) {
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
function Wu(e, t, n = {}) {
  return { key: e, label: t, sort: e, truncate: !0, hideBelow: 900, ...n };
}
function zu(e, t, n, a = {}) {
  return {
    key: e,
    label: t,
    value: (s) => Object.entries(n).filter(([l]) => s.fields[l] === !0).map(([, l]) => l),
    flags: n,
    sort: e,
    muted: !0,
    truncate: !0,
    hideBelow: 1100,
    ...a
  };
}
function qt(e) {
  return typeof e == "number" ? e : typeof e == "string" && e.trim() !== "" ? Number(e) : Number.NaN;
}
function ju(e) {
  const t = qt(e);
  return Number.isFinite(t) && t > 0 ? ps(t) : ke;
}
function Uu(e) {
  const t = qt(e);
  return Number.isFinite(t) && t > 0 ? hs(t) : ke;
}
function Qu(e) {
  const t = qt(e);
  return Number.isFinite(t) && t > 0 ? ms(t) : ke;
}
function Gu(e) {
  const t = qt(e);
  return Number.isFinite(t) ? ys(t) : ke;
}
function ou(e) {
  if (e <= 0) return 0;
  const t = 10 ** Math.floor(Math.log10(e));
  for (const n of [1, 2, 5])
    if (e <= n * t) return n * t;
  return 10 * t;
}
function iu(e, t) {
  const n = /* @__PURE__ */ new Set();
  for (const a of e) {
    const s = a.fields[t];
    for (const l of Array.isArray(s) ? s : [s])
      typeof l == "string" && l && n.add(l);
  }
  return [...n].sort((a, s) => a.localeCompare(s));
}
function cu(e, t) {
  let n = 0;
  for (const a of e) {
    const s = a.fields[t];
    typeof s == "number" && s > n && (n = s);
  }
  return n;
}
function Yu(e, t, n, a = {}) {
  return {
    kind: "chips",
    key: t,
    label: n,
    options: iu(e, t),
    ...a.multiple ? { multiple: !0 } : {}
  };
}
function Xu(e, t, n) {
  return { kind: "range", key: t, label: n, min: 0, max: ou(cu(e, t)) };
}
function Ju(e, t, n) {
  return { kind: "toggle", key: e, label: t, text: n };
}
function Zu(e) {
  return e.filter((t) => t.kind === "chips" ? t.options.length > 1 : t.kind === "range" ? t.max > 0 : !0);
}
function ed(e = "", t = "/") {
  const n = H(fe(e)), a = H(t), s = [`${a.value}${n.value}`];
  return {
    search: n,
    path: a,
    history: s,
    href(l, o) {
      return `${o ?? a.value}${fe(l)}`;
    },
    push(l, o) {
      o !== void 0 && (a.value = o), n.value = fe(l), s.push(`${a.value}${n.value}`);
    },
    replace(l, o) {
      o !== void 0 && (a.value = o), n.value = fe(l), s[s.length - 1] = `${a.value}${n.value}`;
    }
  };
}
function ea(e) {
  const t = e.indexOf("?");
  if (t === -1) return "";
  const n = e.slice(t), a = n.indexOf("#");
  return fe(a === -1 ? n : n.slice(0, a));
}
function td(e) {
  const t = H(ea(e.currentRoute.value.fullPath)), n = f(() => e.currentRoute.value.path), a = ne(
    () => e.currentRoute.value.fullPath,
    (s) => {
      t.value = ea(s);
    }
  );
  return {
    search: t,
    path: n,
    push: (s, l) => e.push(`${l ?? n.value}${fe(s)}`),
    replace: (s, l) => e.replace(`${l ?? n.value}${fe(s)}`),
    href: (s, l) => {
      const o = `${l ?? n.value}${fe(s)}`;
      return e.resolve?.(o).href ?? o;
    },
    dispose: a
  };
}
function nd(e, t, n = "/") {
  return (a) => {
    const s = a.params[t], l = Array.isArray(s) ? s.join("/") : s ?? "", o = a.query[Ie], i = typeof o == "string" ? o : "", r = `${e}="${l.replace(/"/g, "")}"`;
    return { path: n, query: { ...a.query, [Ie]: dt(i, r) } };
  };
}
function ad(e, t = "/") {
  return (n) => ({ path: t, query: { ...n.query, [ze]: e } });
}
function sd(e) {
  const t = /* @__PURE__ */ new Map();
  for (const n of e) {
    const a = t.get(n.entityKey);
    a ? a.push(n) : t.set(n.entityKey, [n]);
  }
  return {
    query(n) {
      return _a(n, (a) => t.get(a.key) ?? [], {
        undatedLast: !0,
        zeroIsAll: !0
      });
    }
  };
}
function ld(e, t) {
  return e.query({ ...t, limit: Number.MAX_SAFE_INTEGER, offset: 0 }).rows;
}
const uu = {
  DataShell: pc,
  ShellHeader: Ba,
  RecordActions: an,
  ResultsArea: Xa,
  SegmentedControl: Lc,
  StatusPill: We,
  ListView: ln,
  CardsView: Va,
  GridView: Da,
  ImagesView: Ka,
  TableView: Ga,
  LinksView: Wa,
  PreviewView: za,
  TypeCardsView: Ya
}, rd = {
  install(e, t = {}) {
    const n = t.prefix ?? "";
    for (const [a, s] of Object.entries(uu))
      e.component(`${n}${a}`, s);
    t.route && e.provide(aa, t.route), (t.theme || t.accent || t.tokens) && pl({ theme: t.theme, accent: t.accent, tokens: t.tokens }, e);
  }
};
export {
  hu as COLUMN_BREAKPOINTS,
  pu as COLUMN_ROLES,
  Va as CardsView,
  Jn as ColumnCell,
  zc as CopyButton,
  _s as DEFAULT_ENTITY_VIEW,
  Gt as DEFAULT_SORT,
  sa as DEFAULT_VIEW,
  Cl as DRAFT_DELAY,
  pc as DataShell,
  ke as EMPTY_CELL,
  ka as ENTITY_ALL,
  $t as ENTITY_TERM,
  rt as EXPRESSION_TERM,
  Da as GridView,
  rd as HeaderContentLayoutPlugin,
  Ka as ImagesView,
  Wa as LinksView,
  ln as ListView,
  gt as MOCK_TINTS,
  ft as MetricDrill,
  vt as OpenMark,
  mn as PARAM_DIR,
  ze as PARAM_ENTITY,
  Ie as PARAM_EXPR,
  It as PARAM_PAGE,
  hn as PARAM_SORT,
  At as PARAM_VIEW,
  vu as PILL_TONES,
  Nl as POPOVER_FLIP_BELOW,
  Tl as POPOVER_GAP,
  Ol as POPOVER_MARGIN,
  wn as PinStar,
  za as PreviewView,
  kn as QueryMark,
  Qe as RECORD_STATUSES,
  fn as RESULT_FIELDS,
  aa as ROUTE_ADAPTER_KEY,
  an as RecordActions,
  Hr as RecordChoosers,
  Xa as ResultsArea,
  Ta as SHELL_CONTEXT_KEY,
  bt as SHELL_THEME_KEY,
  pt as ScopeMark,
  Lc as SegmentedControl,
  Be as SelectTick,
  Cu as ShellCard,
  Mu as ShellCode,
  Tu as ShellDialog,
  Ac as ShellFact,
  Pu as ShellFacts,
  Ba as ShellHeader,
  Lu as ShellLog,
  $r as ShellPager,
  Bl as ShellPopover,
  Ou as ShellToasts,
  sn as StandingControl,
  Eu as StatusCounts,
  We as StatusPill,
  tu as TOAST_ERROR_MS,
  eu as TOAST_MS,
  Ga as TableView,
  Ya as TypeCardsView,
  ws as VIEW_ICONS,
  un as VIEW_KINDS,
  Tn as VIEW_LABELS,
  dt as addTerm,
  pn as andExpression,
  ju as bytesCell,
  ua as cellFull,
  wi as cellNarrowings,
  Ae as cellText,
  mt as cellTextOf,
  ue as cellValue,
  Kt as changesResults,
  Yu as chipsFrom,
  Nn as columnAlign,
  An as columnClass,
  On as columnKey,
  Qa as columnNarrows,
  ct as columnShortcut,
  ha as columnShortcutOf,
  Xt as columnTruncates,
  Ss as columnsFor,
  fa as compactShortcuts,
  zl as completeDraft,
  xs as countPages,
  is as createHistoryAdapter,
  ed as createMemoryAdapter,
  sd as createMemoryDataSource,
  nl as createMockDataSource,
  td as createVueRouterAdapter,
  Du as dateColumn,
  Es as defaultCellText,
  yt as defaultQuery,
  Ze as defaultViewFor,
  cs as detachableAdapter,
  zt as drillExpression,
  Uu as durationCell,
  Qu as elapsedCell,
  bs as emptyFacetValue,
  rl as entityAddress,
  Ku as entityColumn,
  Yt as entityCount,
  ad as entityRedirect,
  Sa as excludingTerm,
  tt as expandShortcuts,
  Wu as facetColumn,
  lt as facetField,
  Aa as facetValue,
  Bs as fieldHeading,
  xa as fieldTerm,
  et as findEntity,
  ba as findEntityByAddress,
  Ee as findSort,
  zu as flagColumn,
  Ge as fnv1a,
  ra as focusEntity,
  ps as formatBytes,
  Je as formatCount,
  fs as formatDate,
  mu as formatDateTime,
  Lt as formatDigits,
  hs as formatDuration,
  ms as formatElapsed,
  he as formatExpression,
  Ve as formatInteger,
  ds as formatMetric,
  vs as formatOrdinal,
  ys as formatPercent,
  Ns as formatRange,
  _e as formatTerm,
  tl as generateRows,
  _l as hasActiveFacets,
  qu as identityColumn,
  $u as idsExpression,
  yu as isEntityScoped,
  $s as isFacetActive,
  dn as isPristineQuery,
  Ke as isRangeTerm,
  ia as isTypeCardsQuery,
  la as isViewKind,
  _u as joinExpression,
  Ca as liftTerm,
  Vs as matchesExpression,
  Vu as metricColumn,
  xu as narrowPatch,
  Ds as negateTerm,
  ou as niceMax,
  fe as normalizeSearch,
  _i as numberRange,
  Ws as oppositeTerm,
  Iu as ordinalColumn,
  le as parseExpression,
  cl as parseQuery,
  Gu as percentCell,
  Hu as pictureColumn,
  Al as placePopover,
  Vr as presentParts,
  qa as presentRow,
  st as pressOptions,
  fl as provideShellContext,
  pl as provideShellTheme,
  ld as queryAll,
  Xu as rangeFrom,
  Ot as rangeOf,
  Us as readDraft,
  bu as readExpression,
  nd as recordRedirect,
  $a as recordTerm,
  dl as recordsIn,
  Fu as referenceColumn,
  at as refineExpression,
  Ne as resolveView,
  pe as roleColumn,
  ca as roleColumns,
  Ps as rowKey,
  nt as sameTerm,
  ut as scopeTerm,
  kt as scopeTermFor,
  Ma as scopedEntity,
  ku as searchFromQuery,
  Wn as serializeQuery,
  ol as sortAddress,
  Tt as sortsFor,
  gu as splitExpression,
  Ru as stateColumn,
  gs as stripAnsi,
  bl as summarizeQuery,
  xt as summaryTerms,
  gn as termStanding,
  Bu as tintColumn,
  wu as tintFor,
  Ju as toggleFacet,
  vi as useColumns,
  Pl as useDraft,
  Ar as useEntityCounts,
  Ri as useEntityPreviews,
  _n as useLayerTheme,
  Nu as usePoll,
  Re as usePresentedRows,
  $l as useQueryState,
  Ll as useRecordNames,
  xl as useResults,
  ee as useShellContext,
  Au as useStableSchema,
  au as useToasts,
  Zu as usefulFacets,
  Ln as viewAcross,
  Ia as withFacetValue,
  Jt as withStanding,
  ul as withWhere,
  Su as withoutFacet,
  Ea as withoutOwnScope,
  Ks as withoutTerm
};
