import { ref as H, computed as f, inject as rn, provide as on, getCurrentInstance as na, shallowRef as me, toValue as Oe, watch as te, onScopeDispose as Ct, getCurrentScope as aa, defineComponent as z, onMounted as ct, onBeforeUnmount as we, openBlock as u, createBlock as A, Teleport as Pt, createElementVNode as S, mergeProps as De, unref as w, renderSlot as G, createCommentVNode as L, nextTick as Xe, createElementBlock as m, withKeys as Ne, useSlots as Et, useId as Mt, withCtx as Y, toDisplayString as E, createTextVNode as Z, Fragment as W, renderList as X, withModifiers as Ae, normalizeClass as de, withDirectives as Ut, normalizeStyle as le, vModelText as ns, createVNode as Q, reactive as Cn, toHandlers as cn, resolveDynamicComponent as Je, createSlots as Qt, useModel as Pn, onBeforeUpdate as as, normalizeProps as Dt, guardReactiveProps as ss, mergeModels as En, vShow as Mn, Comment as ls, Text as rs, readonly as os, watchEffect as is } from "vue";
import { MenuList as cs } from "menu-bar";
const un = ["list", "cards", "grid", "images", "table", "links", "preview"], Ge = ["ok", "running", "queued", "review", "failed"], mu = [...Ge, "neutral", "accent"], yu = [
  "identity",
  "reference",
  "metric",
  "state",
  "updated",
  "image",
  "tint"
], gu = [480, 620, 760, 900, 1100], sa = Symbol("dc.routeAdapter");
function fe(e) {
  if (!e) return "";
  const t = e.replace(/^[?]/, "");
  return t ? `?${t}` : "";
}
function us() {
  const e = typeof window < "u", t = H(e ? fe(window.location.search) : ""), n = H(e ? window.location.pathname : "/"), a = () => {
    t.value = fe(window.location.search), n.value = window.location.pathname;
  };
  e && window.addEventListener("popstate", a);
  const s = (l, r, i) => {
    const o = fe(l);
    if (!e) {
      t.value = o, i !== void 0 && (n.value = i);
      return;
    }
    const c = i === void 0 || i === window.location.pathname ? `${window.location.pathname}${o}${window.location.hash}` : `${i}${o}`;
    r === "push" ? window.history.pushState(window.history.state, "", c) : window.history.replaceState(window.history.state, "", c), t.value = o, n.value = window.location.pathname;
  };
  return {
    search: t,
    path: n,
    href(l, r) {
      return e ? r !== void 0 && r !== window.location.pathname ? `${r}${fe(l)}` : `${window.location.pathname}${fe(l)}${window.location.hash}` : `${r ?? n.value}${fe(l)}`;
    },
    push: (l, r) => s(l, "push", r),
    replace: (l, r) => s(l, "replace", r),
    dispose: () => {
      e && window.removeEventListener("popstate", a);
    }
  };
}
function ds(e, t) {
  const n = f(t.detached), a = f(() => n.value ? "" : e.search.value), s = f(() => n.value ? t.path() : e.path.value);
  return {
    search: a,
    path: s,
    elsewhere: n,
    push(l, r) {
      n.value ? e.push(l, r ?? t.path()) : e.push(l, r);
    },
    replace(l, r) {
      n.value ? e.push(l, r ?? t.path()) : e.replace(l, r);
    },
    href(l, r) {
      const i = r ?? (n.value ? t.path() : void 0);
      return e.href ? e.href(l, i) : `${i ?? e.path.value}${fe(l)}`;
    }
  };
}
function Ye(e) {
  let t = 2166136261;
  for (let n = 0; n < e.length; n++)
    t ^= e.charCodeAt(n), t = Math.imul(t, 16777619);
  return Math.abs(t);
}
const fs = new Intl.NumberFormat("en-US", {
  minimumSignificantDigits: 2,
  maximumSignificantDigits: 2,
  useGrouping: !1
});
function Lt(e) {
  return Number.isFinite(e) ? Math.abs(e) < 100 ? fs.format(e) : String(Math.round(e)) : "—";
}
function vs(e) {
  return Number.isFinite(e) ? Number.isInteger(e) || Math.abs(e) >= 100 ? Ze(e) : Lt(e) : "—";
}
function Ze(e) {
  if (!Number.isFinite(e)) return "—";
  const t = Math.round(e), n = Math.abs(t);
  return n < 1e3 ? String(t) : n < 9950 ? `${(t / 1e3).toFixed(1)}k` : n < 999500 ? `${Math.round(t / 1e3)}k` : n < 995e4 ? `${(t / 1e6).toFixed(1)}m` : `${Math.round(t / 1e6)}m`;
}
function Ve(e) {
  return Number.isFinite(e) ? Math.round(e).toLocaleString("en-US") : "—";
}
function ps(e) {
  const t = new Date(e);
  if (Number.isNaN(t.getTime())) return "—";
  const n = String(t.getUTCDate()).padStart(2, "0"), a = String(t.getUTCMonth() + 1).padStart(2, "0");
  return `${n}.${a}.${t.getUTCFullYear()}`;
}
function hs(e) {
  return String(e + 1);
}
function _u(e, t) {
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
function ms(e) {
  if (e == null || !Number.isFinite(e) || e < 0) return "—";
  if (e < 1e3) return `${e} B`;
  const t = ["kB", "MB", "GB", "TB"];
  let n = e, a = -1;
  for (; n >= 1e3 && a < t.length - 1; )
    n /= 1e3, a += 1;
  return `${Lt(n)} ${t[a]}`;
}
function ys(e) {
  if (!e || !Number.isFinite(e)) return "—";
  if (e < 1e3) return `${Math.round(e)}ms`;
  const t = e / 1e3;
  return t < 60 ? `${Lt(t)}s` : `${Math.floor(t / 60)}m ${Math.round(t % 60)}s`;
}
function gs(e) {
  if (e == null || !Number.isFinite(e) || e <= 0)
    return "—";
  const t = Math.floor(e / 60);
  return t ? `${t}:${String(e % 60).padStart(2, "0")}` : `${e}s`;
}
function _s(e) {
  return e == null || !Number.isFinite(e) ? "—" : `${Math.round(e * 100)}%`;
}
function ws(e) {
  return e.replace(/\x1b\[[0-9;?]*[ -/]*[@-~]/g, "");
}
const la = "cards", ks = "table";
function et(e, t = {}) {
  const n = (s) => s && ra(s) ? s : void 0;
  if (e === null) return n(t.view) ?? la;
  const a = t.landing === "entity" ? n(t.view) : void 0;
  return n(t.entityView) ?? a ?? ks;
}
function Ln(e, t, n, a = {}) {
  return a.viewAcrossTypes !== "default" && e !== et(t, a) ? e : et(n, a);
}
const Gt = "updated";
function ra(e) {
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
}, bs = {
  list: "M6 4h7.5M6 8h7.5M6 12h7.5M2.5 4h.01M2.5 8h.01M2.5 12h.01",
  cards: "M2.5 2.5h11v4.5h-11zM2.5 9h11v4.5h-11z",
  grid: "M2.5 2.5h4.5v4.5h-4.5zM9 2.5h4.5v4.5H9zM2.5 9h4.5v4.5h-4.5zM9 9h4.5v4.5H9z",
  images: "M2.5 3h11v10h-11zM2.5 11l3.5-3.5 2.5 2.5 2-2 3 3M10.5 5.75h.01",
  table: "M2.5 3h11v10h-11zM2.5 6.5h11M2.5 9.75h11M6.5 6.5V13",
  links: "M6.75 9.25a2.5 2.5 0 0 0 3.54 0l2.12-2.12a2.5 2.5 0 0 0-3.54-3.54l-.7.7M9.25 6.75a2.5 2.5 0 0 0-3.54 0L3.59 8.87a2.5 2.5 0 0 0 3.54 3.54l.7-.7",
  preview: "M1.5 8S4 3.5 8 3.5 14.5 8 14.5 8 12 12.5 8 12.5 1.5 8 1.5 8zM6 8a2 2 0 1 0 4 0 2 2 0 1 0-4 0",
  record: "M4 2h5.5L12 4.5V14H4zM9.5 2v2.5H12M6 8h4M6 10.5h4"
};
function Ie(e, t) {
  if (e === "record" && !t?.includes(e)) return t?.[0] ?? la;
  const [n] = t ?? [];
  return n === void 0 || t?.includes(e) ? e : n;
}
function Yt(e) {
  return typeof e.count == "number" ? Ze(e.count) : e.count;
}
function tt(e, t) {
  return t ? e.entities.find((n) => n.key === t) ?? null : null;
}
function oa(e, t = {}) {
  const n = tt(e, t.entity), a = e.entities[0];
  if (!n && !a) throw new Error(`Schema "${e.key}" declares no entities`);
  return n ?? a;
}
function ia(e, t = null) {
  return e?.columns ?? t?.columns ?? [];
}
function Tt(e, t = null) {
  if (e?.sorts?.length) return e.sorts;
  const n = /* @__PURE__ */ new Set(), a = [];
  for (const s of ia(e, t))
    !s.sort || n.has(s.sort) || (n.add(s.sort), a.push({ key: s.sort, label: (s.label ?? s.sort).toLowerCase() }));
  return a;
}
const $s = { key: Gt, label: Gt };
function Ee(e, t, n = null) {
  const a = Tt(e, n);
  return (t ? a.find((l) => l.key === t) : void 0) ?? a.find((l) => l.key === Gt) ?? a[0] ?? $s;
}
function xs(e) {
  switch (e.kind) {
    case "chips":
      return { kind: "chips", selected: [] };
    case "range":
      return { kind: "range", min: null, max: null };
    case "toggle":
      return { kind: "toggle", on: !1 };
  }
}
function Ss(e) {
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
function wu(e) {
  return e.entity !== null;
}
function ca(e, t) {
  return e.entity === null && Ie(e.view, t) === "cards";
}
function Cs(e, t) {
  return t <= 0 ? 1 : Math.max(1, Math.ceil(e / t));
}
function yt(e, t = {}) {
  const a = t.landing === "entity" ? oa(e, t) : null;
  return {
    entity: a?.key ?? null,
    view: et(a?.key ?? null, t),
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
function ua(e, t) {
  return e.filter((n) => n.role === t);
}
function Ps(e, t) {
  const n = (t ? t.columns : e?.columns) ?? [], a = t ? "scoped" : "everything";
  return n.filter(
    (s) => s.role !== "tint" && ((s.when ?? "always") === "always" || s.when === a)
  );
}
const Es = ["id", "entityKey", "entityLabel"];
function ue(e, t) {
  if (e.value) return e.value(t);
  const n = e.field ?? e.key;
  if (n !== void 0) {
    if (t.fields && n in t.fields) return t.fields[n];
    if (Es.includes(n))
      return t[n];
  }
}
function On(e, t) {
  const n = e.key ?? e.field ?? e.label;
  return n?.trim() ? n.trim() : `column-${t}`;
}
function Ms(e, t) {
  return e.id?.trim() ? e.id : `${e.entityKey || "row"}-${t}`;
}
function Ls(e, t) {
  if (e == null || e === "") return ke;
  if (t === "number") {
    const n = typeof e == "number" ? e : Number(e);
    return Number.isFinite(n) ? vs(n) : String(e);
  }
  return t === "date" ? ps(String(e)) : Array.isArray(e) ? e.length ? e.join(", ") : ke : String(e);
}
function Le(e, t) {
  const n = ue(e, t);
  return e.format ? e.format(n, t) : Ls(n, e.kind);
}
function Ts(e) {
  return typeof e == "number" ? Number.isFinite(e) ? String(e) : "" : typeof e == "string" ? e : Array.isArray(e) ? e.join(", ") : "";
}
function da(e, t) {
  const n = Le(e, t), a = Ts(ue(e, t));
  return a && a !== n ? a : n;
}
function mt(e, t) {
  return e ? Le(e, t) : "";
}
function Nn(e) {
  return e.align ? e.align : e.kind === "number" || e.kind === "ordinal" ? "right" : "left";
}
const Os = {
  ordinal: "dc-table__num",
  number: "dc-table__number",
  date: "dc-table__date",
  status: "dc-table__state"
};
function An(e) {
  return [Os[e.kind ?? "text"], e.class].filter(Boolean).join(" ");
}
function Xt(e) {
  if (e.truncate !== void 0) return e.truncate;
  const t = e.kind ?? "text";
  return t === "text" || t === "number" || t === "date";
}
const Ns = /^([A-Za-z_][\w.-]*)\s*(>=|<=|:|=|>|<)\s*(.*)$/, In = "-?(?:\\d+\\.?\\d*|\\.\\d+)", As = new RegExp(`^(${In})?\\.\\.(${In})?$`);
function Ot(e) {
  const t = As.exec(e.trim());
  if (!t || t[1] === void 0 && t[2] === void 0) return null;
  const n = t[1] === void 0 ? null : Number(t[1]), a = t[2] === void 0 ? null : Number(t[2]);
  return n !== null && a !== null && n > a ? { min: a, max: n } : { min: n, max: a };
}
function Is(e) {
  return `${e.min ?? ""}..${e.max ?? ""}`;
}
function Ke(e) {
  return e.kind === "field" && (e.comparator === ":" || e.comparator === "=") && Ot(e.value) !== null;
}
function Rs(e) {
  const t = [];
  let n = "", a = null;
  const s = () => {
    n && t.push(n), n = "";
  };
  for (let l = 0; l < e.length; l++) {
    const r = e[l];
    if (a) {
      r === a ? a = null : n += r;
      continue;
    }
    if (r === '"' || r === "'") {
      a = r;
      continue;
    }
    if (/\s/.test(r)) {
      if (/(?:>=|<=|[:=><])$/.test(n) || e.slice(l + 1).match(/^\s*(>=|<=|[:=><])/) && n) continue;
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
  for (const s of Rs(t)) {
    const l = s.toUpperCase();
    if (l === "AND" || l === "&&") continue;
    if (l === "OR" || l === "||") {
      a.length && n.push(a), a = [];
      continue;
    }
    const r = s.length > 1 && s.startsWith("-"), i = r ? s.slice(1) : s, o = r ? { negated: !0 } : {}, c = Ns.exec(i);
    c && c[3] !== "" ? a.push({
      kind: "field",
      field: c[1].toLowerCase(),
      comparator: c[2],
      value: c[3],
      ...o
    }) : a.push({ kind: "text", value: i, ...o });
  }
  return a.length && n.push(a), n;
}
const Me = (e) => e.toLowerCase().replace(/\s+/g, ""), fa = [
  ["status", "state"],
  ["state", "state"],
  ["updated", "updated"],
  ["date", "updated"],
  ["name", "identity"],
  ["ref", "reference"]
];
function Bs(e, t, n) {
  const a = Me(e), s = n.columns ?? [];
  if (a === "entity") return t.entityKey;
  if (e in t.fields) return t.fields[e];
  const l = s.find(
    (c) => c.key?.toLowerCase() === e.toLowerCase() || c.field?.toLowerCase() === e.toLowerCase() || c.label !== void 0 && Me(c.label) === a
  );
  if (l) return ue(l, t);
  const r = n.facets.find(
    (c) => c.key.toLowerCase() === a || Me(c.label) === a
  );
  if (r && r.key in t.fields) return t.fields[r.key];
  const i = fa.find(([c]) => c === a)?.[1];
  if (i) {
    const c = pe(s, i);
    if (c) return ue(c, t);
  }
  const o = /^metric(\d+)$/.exec(a);
  if (o) {
    const c = ua(s, "metric")[Number(o[1]) - 1];
    if (c) return ue(c, t);
  }
}
function ut(e) {
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
function Hs(e, t, n) {
  const a = Me(e);
  if (a === "entity" || fa.some(([l]) => l === a) || /^metric\d+$/.test(a) || vn(e, n)) return !0;
  const s = (l) => l !== void 0 && Me(l) === a;
  return (t.columns ?? []).some(
    (l) => s(l.key) || s(l.field) || s(l.label)
  ) || t.facets.some((l) => s(l.key) || s(l.label));
}
function nt(e, t, n) {
  return t ? pa(e, (a) => {
    const s = ha(a, t, n);
    return s && Nt(s);
  }) : e;
}
function va(e, t, n) {
  return t ? pa(e, (a) => {
    if (vn(a, n)) return;
    const s = (t.columns ?? []).find((l) => Nt(l) === a);
    return s && ma(s, t, n);
  }) : e;
}
function qs(e, t, n) {
  if (!t || vn(e, n)) return;
  const a = t.facets.find((s) => s.key.toLowerCase() === e);
  return a ? a.label : (t.columns ?? []).find((s) => Nt(s) === e)?.label;
}
function pa(e, t) {
  let n = !1;
  const a = re(e).map(
    (s) => s.map((l) => {
      if (l.kind !== "field") return l;
      const r = t(l.field);
      return !r || r === l.field ? l : (n = !0, { ...l, field: r });
    })
  );
  return n ? he(a) : e;
}
function ha(e, t, n) {
  if (!(!e || Hs(e, t, n)))
    return (t.columns ?? []).find(
      (a) => a.label !== void 0 && ut(a.label) === e
    );
}
function ma(e, t, n) {
  if (!t || e.label === void 0 || !Nt(e)) return;
  const a = ut(e.label);
  return ha(a, t, n) === e ? a : void 0;
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
function Fs(e, t, n, a) {
  if (e.kind === "text") {
    const o = n.columns ?? [];
    return ["identity", "reference"].some((c) => {
      const d = pe(o, c), v = d ? ue(d, t) : void 0;
      return typeof v == "string" && Wt(v, e.value);
    });
  }
  const s = Bs(e.field, t, n);
  if (s === void 0) return a?.has(e.field) ? !1 : null;
  const l = Ke(e) ? Ot(e.value) : null;
  if (l) {
    if (Array.isArray(s) || typeof s == "boolean") return null;
    const o = typeof s == "number" ? s : Number(s);
    return Number.isFinite(o) ? (l.min === null || o >= l.min) && (l.max === null || o <= l.max) : null;
  }
  if (Array.isArray(s))
    return e.comparator === ":" || e.comparator === "=" ? s.some(
      (c) => e.comparator === "=" ? Bn(String(c), e.value) : Wt(String(c), e.value)
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
    return e.comparator === "=" ? Bn(String(s), e.value) : Wt(String(s), e.value);
  }
  const r = Number(e.value), i = typeof s == "number" ? s : Number(s);
  return !Number.isFinite(r) || !Number.isFinite(i) ? null : Vs(e.comparator, i, r);
}
function Hn(e, t, n, a) {
  const s = Fs(e, t, n, a);
  return s === null ? !0 : e.negated ? !s : s;
}
function Vs(e, t, n) {
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
function Ds(e) {
  if (!e?.strictScopes) return null;
  let t = Fn.get(e);
  return t || (t = new Set(
    e.entities.flatMap((n) => n.scope ? [n.scope.toLowerCase()] : [])
  ), Fn.set(e, t)), t;
}
function Ks(e, t, n, a) {
  if (!e.length) return !0;
  const s = Ds(a);
  return e.some((l) => {
    const r = /* @__PURE__ */ new Map();
    for (const i of l)
      qn(i) && r.set(
        i.field,
        (r.get(i.field) ?? !1) || Hn(i, t, n, s)
      );
    return l.every(
      (i) => qn(i) ? r.get(i.field) === !0 : Hn(i, t, n, s)
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
function Ws(e) {
  if (!e.negated) return { ...e, negated: !0 };
  const { negated: t, ...n } = e;
  return n;
}
function he(e) {
  return e.filter((t) => t.length).map((t) => t.map(_e).join(" ")).join(" OR ");
}
function zs(e, t, n) {
  return e.map((a, s) => s === t ? a.filter((l, r) => r !== n) : a).filter((a) => a.length);
}
function ku(e) {
  const t = re(e);
  if (t.length > 1) return { parts: [], text: e.trim() };
  const n = t[0] ?? [];
  return {
    parts: n.filter((a) => a.kind === "field"),
    text: n.filter((a) => a.kind === "text").map(_e).join(" ")
  };
}
function bu(e, t) {
  return [...e.map(_e), t.trim()].filter(Boolean).join(" ");
}
const Dn = (e, t) => e.toLowerCase() === t.toLowerCase();
function at(e, t) {
  return !!e.negated == !!t.negated && ya(e, t);
}
function js(e, t) {
  return !!e.negated != !!t.negated && ya(e, t);
}
function ya(e, t) {
  return e.kind === "field" ? t.kind === "field" && e.field === t.field && e.comparator === t.comparator && Dn(e.value, t.value) : t.kind === "text" && Dn(e.value, t.value);
}
function Us(e, t) {
  return t.filter((n) => !e.some((a) => at(a, n)));
}
function pn(e, t) {
  return ga(e, t, (n) => n);
}
function st(e, t) {
  return ga(
    e,
    t,
    (n, a) => n.filter((s) => !a.some((l) => js(s, l)))
  );
}
const Qs = /^[A-Za-z_][\w.-]*\s*(?:>=|<=|:|=|>|<)$/;
function Gs(e) {
  return he(
    re(e).map(
      (t) => t.filter(
        (n) => n.kind !== "text" || n.value !== "-" && !Qs.test(n.value)
      )
    ).filter((t) => t.length > 0)
  );
}
function ga(e, t, n) {
  const a = re(e), s = re(t);
  return a.length ? s.length ? he(
    a.flatMap(
      (l) => s.map((r) => [...n(l, r), ...Us(l, r)])
    )
  ) : he(a) : he(s);
}
const _a = (e) => e.kind === "date" || e.role === "updated";
function Ys(e) {
  if (!e) return () => 0;
  const n = (e.kind ?? "text") === "number" || e.role === "metric", a = _a(e);
  return (s, l) => {
    const r = ue(e, s), i = ue(e, l);
    return n ? Number(i ?? 0) - Number(r ?? 0) : a ? Date.parse(String(i ?? "")) - Date.parse(String(r ?? "")) : String(i ?? "").localeCompare(String(r ?? ""));
  };
}
function Kn(e, t) {
  return !t || !_a(t) ? !1 : !Number.isFinite(Date.parse(String(ue(t, e) ?? "")));
}
function wa({ query: e, schema: t, entity: n, limit: a, offset: s }, l, r) {
  const i = re(e.expr), o = n ? [n] : t.entities;
  let c = 0;
  const d = [];
  for (const b of o)
    for (const P of l(b))
      c += 1, Ks(i, P, b, t) && d.push(P);
  const v = Ee(n, e.sort, t), _ = ia(n, t).find((b) => b.sort === v.key), p = r.undatedLast ? d.filter((b) => !Kn(b, _)) : d, g = r.undatedLast ? d.filter((b) => Kn(b, _)) : [];
  p.sort(Ys(_)), e.dir === "asc" && p.reverse();
  const h = g.length ? [...p, ...g] : p;
  return {
    // One page out of the middle. `total` stays the whole match, which is what
    // the shell counts pages with.
    rows: r.zeroIsAll && a <= 0 ? h.slice(s) : h.slice(s, s + a),
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
function $u(e) {
  return gt[Ye(e) % gt.length];
}
function ka(e, t) {
  return `${e}_${1e4 + t * 7}`;
}
const Xs = 7, Js = 3;
function Zs(e, t, n, a) {
  const s = (t * Xs + Ye(n)) % a, l = [];
  for (let r = 0; r < Math.min(Js, a); r++)
    l.push(ka(e, (s + r) % a));
  return l;
}
function el(e, t) {
  switch (e.kind) {
    case "chips":
      return e.multiple ? tl(e.options, t) : e.options[t % e.options.length] ?? "";
    case "range": {
      const n = Math.max(0, e.max - e.min);
      return e.min + (n === 0 ? 0 : t % (n + 1));
    }
    case "toggle":
      return t % 3 === 0;
  }
}
function tl(e, t) {
  if (!e.length) return [];
  const n = 1 + (t >> 5) % Math.min(3, e.length), a = t % e.length, s = /* @__PURE__ */ new Set();
  for (let l = 0; l < n; l++) s.add((a + l) % e.length);
  return [...s].sort((l, r) => l - r).map((l) => e[l]);
}
function nl(e, t) {
  const { hash: n, sample: a, revision: s, updatedAt: l } = t, r = s ? ` · rev ${s + 1}` : "";
  switch (e.role) {
    case "identity":
      return `${a[0]}${r}`;
    case "reference":
      return s ? `${a[1]}-${s + 1}` : a[1];
    case "state":
      return Ge[n % Ge.length];
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
      return Ge[n % Ge.length];
    case "date":
      return l;
    default:
      return;
  }
}
function al(e, t = {}) {
  const n = t.population ?? 48, a = t.seed ?? "", s = t.now ?? /* @__PURE__ */ new Date("2026-08-25T00:00:00Z"), l = e.samples, r = t.scopes ?? [];
  if (!l.length) return [];
  const i = [];
  for (let o = 0; o < n; o++) {
    const c = l[o % l.length], d = Math.floor(o / l.length), v = Ye(`${a}:${e.key}:${c[0]}:${o}`), _ = ka(e.key, o), p = new Date(s.getTime() - v % 900 * 36e5).toISOString(), g = {};
    for (const h of e.columns ?? []) {
      const b = h.field ?? h.key;
      if (!b || h.value) continue;
      const P = nl(h, {
        hash: Ye(`${v}:${b}`),
        sample: c,
        revision: d,
        updatedAt: p
      });
      P !== void 0 && (g[b] = P);
    }
    for (const h of e.facets)
      g[h.key] = el(h, Ye(`${v}:${h.key}`));
    for (const [h, b] of r)
      g[h] = b === e.key ? _ : Zs(b, o, h, n);
    i.push({ id: _, entityKey: e.key, entityLabel: e.label, fields: g });
  }
  return i;
}
function sl(e = {}) {
  const t = /* @__PURE__ */ new Map(), n = (a, s) => {
    const l = t.get(a.key);
    if (l) return l;
    const r = e.scopes ?? s.entities.flatMap(
      (o) => o.scope ? [[o.scope, o.key]] : []
    ), i = al(a, { ...e, scopes: r });
    return t.set(a.key, i), i;
  };
  return {
    query(a) {
      return wa(a, (s) => n(s, a.schema), {
        undatedLast: !1,
        zeroIsAll: !1
      });
    }
  };
}
const je = "e", At = "v", hn = "s", mn = "d", Re = "q", It = "p", ba = "*", ll = [
  je,
  At,
  hn,
  mn,
  Re,
  It
], rl = [
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
  for (const [n, a] of rl) t = t.replace(n, a);
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
    const s = a.indexOf("="), l = s === -1 ? a : a.slice(0, s), r = s === -1 ? "" : a.slice(s + 1);
    n.push([ge(l), r]);
  }
  return n;
}
function ol(e) {
  return ll.includes(e);
}
function Rt(e, t) {
  if (!(!t || e.some((n) => n.key === t)))
    return e.find((n) => ut(n.label) === t);
}
function il(e, t) {
  const n = ut(e.label);
  return Rt(t.entities, n)?.key === e.key ? n : e.key;
}
function $a(e, t) {
  return t ? tt(e, t) ?? Rt(e.entities, t) ?? null : null;
}
function cl(e, t) {
  const n = ut(e.label);
  return Rt(t, n)?.key === e.key ? n : e.key;
}
function ul(e, t) {
  return t.some((n) => n.key === e) ? e : Rt(t, e)?.key ?? e;
}
function dl(e, t, n = {}) {
  const a = yt(t, n), s = new Map(yn(e)), l = s.get(je), r = l === void 0 ? a.entity : ge(l), i = r === ba ? null : $a(t, r), o = s.get(At), c = o && ra(ge(o)) ? ge(o) : et(i?.key ?? null, n), d = s.get(hn), v = Ee(
    i,
    d ? ul(ge(d), Tt(i, t)) : n.sort,
    t
  ), _ = s.get(mn), p = _ ? ge(_) === "asc" ? "asc" : "desc" : a.dir, g = s.get(Re), h = s.get(It), b = h === void 0 ? 1 : Number(ge(h)), P = Number.isFinite(b) ? Math.max(1, Math.floor(b)) : 1;
  return {
    entity: i?.key ?? null,
    view: c,
    sort: v.key,
    dir: p,
    expr: g === void 0 ? "" : nt(ge(g), i, t),
    page: P
  };
}
function Wn(e, t, n = {}, a = "") {
  const s = yt(t, n), l = tt(t, e.entity), r = yn(a).filter(([v]) => !ol(v)), i = [], o = (v, _) => i.push([v, _t(_)]), c = l?.key ?? null;
  if (c !== s.entity && o(je, l ? il(l, t) : ba), e.view !== et(c, n) && o(At, e.view), e.sort !== s.sort) {
    const v = Tt(l, t), _ = v.find((p) => p.key === e.sort);
    o(hn, _ ? cl(_, v) : e.sort);
  }
  e.dir !== s.dir && o(mn, e.dir), e.expr.trim() !== "" && o(Re, va(e.expr, l, t)), e.page > 1 && o(It, String(e.page));
  const d = [
    ...r.map(([v, _]) => [_t(v), _]),
    ...i
  ];
  return d.length ? `?${d.map(([v, _]) => _ === "" ? v : `${v}=${_}`).join("&")}` : "";
}
function xu(e) {
  const t = [];
  for (const [n, a] of Object.entries(e))
    for (const s of Array.isArray(a) ? a : [a]) {
      if (typeof s != "string") continue;
      const l = _t(n);
      t.push(s === "" ? l : `${l}=${_t(s)}`);
    }
  return t.length ? `?${t.join("&")}` : "";
}
function Su(e, t) {
  const n = new Map(yn(e)), a = n.get(Re), s = a === void 0 ? "" : ge(a);
  if (!t) return s;
  const l = n.get(je);
  return nt(
    s,
    l === void 0 ? null : $a(t, ge(l)),
    t
  );
}
function Bt(e, t) {
  return Sa(e, t.id);
}
function xa(e, t) {
  return e?.standing === !1 ? null : Bt(e, t);
}
function Sa(e, t) {
  const n = e?.scope;
  return n ? Ca(n, t) : null;
}
function Ca(e, t) {
  return `${e}="${t.replace(/"/g, "")}"`;
}
function Cu(e, t) {
  const n = typeof e == "string" ? e : e?.scope;
  if (!n) return null;
  const a = t.filter((s) => s.replace(/"/g, "") !== "").map((s) => Ca(n, s));
  return a.length ? a.join(" ") : null;
}
function Ht(e, t) {
  if (e.kind !== "field" || t.kind !== "field") return at(e, t);
  const n = (a) => a.comparator === ":" || a.comparator === "=";
  return at(e, { ...t, comparator: n(e) && n(t) ? e.comparator : t.comparator });
}
function wt(e, t) {
  return Ht(e, Ws(t));
}
function kt(e, t) {
  return Bt(
    e.entities.find((n) => n.key === t.entityKey),
    t
  );
}
function We(e, t) {
  if (!t) return e;
  const n = e.trim();
  if (!n) return t;
  const [a] = re(t).flat();
  if (!a) return n;
  const s = re(n);
  return s.some((i) => i.some((o) => Ht(o, a))) ? n : s.some((i) => i.some((o) => wt(o, a))) ? he(
    s.map(
      (i) => i.map((o) => wt(o, a) ? a : o)
    )
  ) : `${n} ${t}`;
}
function Pa(e) {
  if (!e) return null;
  const t = e.trim();
  return t ? t.startsWith("-") ? t.slice(1) : `-${t}` : null;
}
function gn(e, t) {
  if (!t || !e.trim()) return null;
  const [n] = re(t).flat();
  if (!n) return null;
  const a = re(e).flat();
  return a.some((s) => Ht(s, n)) ? n.negated ? "out" : "in" : a.some((s) => wt(s, n)) ? n.negated ? "in" : "out" : null;
}
function Ea(e, t) {
  if (!t || !e.trim()) return e;
  const [n] = re(t).flat();
  if (!n) return e;
  const a = re(e), s = a.map(
    (l) => l.filter((r) => !Ht(r, n) && !wt(r, n))
  );
  return s.every((l, r) => l.length === a[r]?.length) ? e : he(s);
}
function Jt(e, t, n) {
  return t ? n === null ? Ea(e, t) : We(e, n === "out" ? Pa(t) : t) : e;
}
function Zt(e, t) {
  const n = t.shiftKey ? `noopener,popup,width=${window.outerWidth},height=${window.outerHeight}` : "noopener";
  window.open(e, "_blank", n);
}
function Ma() {
  const e = window.getSelection?.();
  return !!e && !e.isCollapsed;
}
function en(e) {
  return e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0;
}
function lt(e) {
  return e.altKey ? { exclude: !0 } : {};
}
function zt(e, t, n, a = {}, s) {
  const l = kt(e, n);
  if (a.exclude) return zn(We(t.expr, Pa(l)), s);
  const r = l !== null && e.entities.find((i) => i.key === n.entityKey)?.narrowsAlone === !0;
  return zn(We(r ? "" : t.expr, l), s);
}
function zn(e, t) {
  const n = t?.trim() ? re(t).flat() : [];
  if (!n.length) return e;
  const a = new Set(n.flatMap((i) => i.kind === "field" ? [i.field] : [])), s = (i) => i.kind === "field" && !i.negated && (i.comparator === ":" || i.comparator === "=") && a.has(i.field), l = e.trim(), r = l ? re(l) : [[]];
  if (r.length === 1 && !r[0].some(s)) {
    const i = n.filter((o) => !r[0].some((c) => at(c, o)));
    return [l, ...i.map(_e)].filter(Boolean).join(" ");
  }
  return he(
    r.map((i) => {
      const o = i.filter((c) => !s(c));
      return [...o, ...n.filter((c) => !o.some((d) => at(d, c)))];
    })
  );
}
function La(e, t) {
  const n = e?.scope?.toLowerCase();
  if (!n || e?.keepsScope || !t.trim()) return t;
  const a = re(t), s = a.map(
    (l) => l.filter((r) => r.kind !== "field" || r.field !== n)
  );
  return s.every((l, r) => l.length === a[r]?.length) ? t : he(s);
}
function Ta(e, t) {
  const n = t.toLowerCase();
  return e.entities.find((a) => a.scope?.toLowerCase() === n) ?? null;
}
function Oa(e, t, n) {
  if (!t || !n) return null;
  const a = Ta(e, t);
  return a ? { entity: a, id: n } : null;
}
function fl(e, t) {
  const n = [], a = /* @__PURE__ */ new Set();
  for (const s of t)
    for (const l of re(s).flat()) {
      if (l.kind !== "field" || l.negated) continue;
      const r = Oa(e, l.field, l.value);
      if (!r) continue;
      const i = `${r.entity.key}:${r.id.toLowerCase()}`;
      a.has(i) || (a.add(i), n.push({ entityKey: r.entity.key, id: r.id }));
    }
  return n;
}
function Pu(e, t, n = "cards") {
  return {
    // An expression with nothing in it is no parameter, as the shell writes it.
    [Re]: We(e, t) || void 0,
    [je]: void 0,
    [At]: n,
    [It]: void 0
  };
}
const Na = Symbol("dc.shellContext");
function vl(e) {
  const t = e.liveQuery ? e : pl(e);
  return on(Na, t), t;
}
function pl(e) {
  const t = e.draft ?? H("");
  return {
    draft: t,
    liveQuery: e.query,
    drafting: f(() => !1),
    commitDraft() {
      const n = t.value.trim();
      n && (e.setExpression(
        st(e.query.value.expr, nt(n, e.entity.value, e.schema.value))
      ), t.value = "");
    },
    abandonDraft() {
      t.value = "";
    },
    ...e
  };
}
function ee() {
  const e = rn(Na, null);
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
      theme: Oe(e.theme),
      accent: Oe(e.accent),
      tokens: Oe(e.tokens)
    })
  };
}
function hl(e, t) {
  t ? t.provide(bt, tn(e)) : on(bt, tn(e));
}
function ml(e) {
  const t = na();
  on(bt, {
    ...tn(e),
    element: () => t?.proxy?.$el ?? null
  });
}
function _n(e) {
  const t = na(), n = rn(bt, null), a = me(null);
  function s() {
    const o = t?.proxy?.$el, d = (o instanceof Element ? o : o?.parentElement)?.closest(".dc-shell");
    if (!d) {
      a.value = null;
      return;
    }
    const v = {};
    for (const _ of Array.from(d.style))
      _.startsWith("--") && (v[_] = d.style.getPropertyValue(_));
    a.value = { shell: d, theme: d.dataset.dcTheme, tokens: v };
  }
  const l = f(() => {
    const o = a.value;
    if (!n) return o;
    const c = n.element?.();
    return o && c && o.shell !== c && c.contains(o.shell) ? o : n.read();
  }), r = f(() => e.theme ?? l.value?.theme ?? "minimal"), i = f(() => {
    const o = l.value, c = {
      ...o?.tokens,
      ...o?.accent ? { "--dc-accent": o.accent } : {},
      ...e.tokens,
      ...e.accent ? { "--dc-accent": e.accent } : {}
    };
    return Object.keys(c).length ? c : void 0;
  });
  return { theme: r, style: i, adopt: s };
}
function rt(e) {
  return e.key.toLowerCase();
}
const yl = /* @__PURE__ */ new Set([">", ">=", "<", "<="]);
function Aa(e, t) {
  if (e.kind !== "field" || e.negated || e.field !== rt(t)) return !1;
  const n = e.comparator === ":" || e.comparator === "=";
  switch (t.kind) {
    case "range":
      return Ke(e) || yl.has(e.comparator);
    case "chips":
      return n && !Ke(e) && Ia(t.options, e.value) !== void 0;
    case "toggle":
      return n && gl(e.value);
  }
}
function Ia(e, t) {
  const n = t.toLowerCase();
  return e.find((a) => a.toLowerCase() === n);
}
function gl(e) {
  const t = e.toLowerCase();
  return t === "true" || t === "yes";
}
function Ra(e, t) {
  const n = (re(e)[0] ?? []).filter((a) => Aa(a, t));
  switch (t.kind) {
    case "range": {
      let a = null, s = null;
      for (const l of n) {
        const r = Ot(l.value), i = Number(l.value);
        r ? (r.min !== null && (a = r.min), r.max !== null && (s = r.max)) : Number.isFinite(i) && (l.comparator.startsWith(">") ? a = i : s = i);
      }
      return { kind: "range", min: a, max: s };
    }
    case "chips": {
      const a = new Set(n.map((s) => Ia(t.options, s.value)));
      return { kind: "chips", selected: t.options.filter((s) => a.has(s)) };
    }
    case "toggle":
      return { kind: "toggle", on: n.length > 0 };
  }
}
function _l(e, t) {
  const n = rt(e);
  switch (t.kind) {
    case "range":
      return t.min === null && t.max === null ? [] : [{ kind: "field", field: n, comparator: ":", value: Is(t) }];
    case "chips":
      return t.selected.map((a) => ({ kind: "field", field: n, comparator: "=", value: a }));
    case "toggle":
      return t.on ? [{ kind: "field", field: n, comparator: ":", value: "true" }] : [];
  }
}
function Ba(e, t, n) {
  const a = _l(t, n), s = re(e), l = (s.length ? s : [[]]).map((r) => [
    ...r.filter((i) => !Aa(i, t)),
    ...a
  ]);
  return he(l);
}
function Eu(e, t) {
  return Ba(e, t, xs(t));
}
function wl(e, t) {
  return (t?.facets ?? []).some((n) => Ss(Ra(e, n)));
}
const $t = "entity", ot = "expr", kl = { ">=": "≥", "<=": "≤", ">": ">", "<": "<" };
function Ue(e) {
  const t = Number(e);
  return Number.isFinite(t) && !Number.isInteger(t) ? Lt(t) : String(e);
}
function bl(e, t, n) {
  if (e.kind !== "field") return _e(e);
  const a = qs(e.field, t, n);
  if (a === void 0) return _e(e);
  const s = e.negated ? "-" : "", l = Ke(e) ? Ot(e.value) : null;
  if (l) {
    const i = l.min !== null && l.max !== null ? `${Ue(l.min)} ≤ ${a} ≤ ${Ue(l.max)}` : l.max !== null ? `${a} ≤ ${Ue(l.max)}` : `${a} ≥ ${Ue(l.min)}`;
    return s + i;
  }
  const r = kl[e.comparator];
  return r ? `${s}${a} ${r} ${Ue(e.value)}` : _e({ ...e, field: a });
}
function xt(e, t, n = null) {
  const a = [];
  return t && a.push({
    id: $t,
    label: `entity:${t.key}`,
    facetKey: $t
  }), re(e.expr).forEach((s, l) => {
    s.forEach((r, i) => {
      a.push({
        id: `${ot}:${l}:${i}`,
        label: bl(r, t, n),
        address: va(_e(r), t, n),
        facetKey: ot,
        group: l,
        index: i,
        ...r.kind === "field" ? { field: r.field, value: r.value } : {},
        ...r.negated ? { negated: !0 } : {}
      });
    });
  }), a;
}
function $l(e, t, n = null) {
  if (dn(e)) {
    const l = Ee(t, e.sort, n);
    return `everything · ${e.view} · ${l.label}`;
  }
  const a = xt(e, t).filter((l) => l.facetKey !== ot).map((l) => l.label), s = e.expr.trim();
  return s && a.push(`"${s}"`), a.join(" · ");
}
function xl(e) {
  const { adapter: t } = e, n = f(() => Oe(e.schema)), a = f(() => Oe(e.defaults) ?? {}), s = f(() => dl(t.search.value, n.value, a.value)), l = f(() => tt(n.value, s.value.entity)), r = f(() => l.value ?? oa(n.value, a.value)), i = f(() => Tt(l.value, n.value)), o = f(() => Ee(l.value, s.value.sort, n.value)), c = ($, y) => {
    const k = Wn($, n.value, a.value, t.search.value);
    return k === t.search.value && !t.elsewhere?.value ? !1 : (y === "push" ? t.push(k) : t.replace(k), !0);
  }, d = () => Oe(e.navigationMode) ?? "push", v = () => Oe(e.facetNavigationMode) ?? "replace", _ = ($, y) => {
    const k = $.page ?? (Kt($) ? 1 : s.value.page);
    return c({ ...s.value, ...$, page: k }, y);
  }, p = ($) => {
    const y = $.page ?? (Kt($) ? 1 : s.value.page);
    return g({ ...s.value, ...$, page: y });
  }, g = ($) => {
    const y = Wn($, n.value, a.value, t.search.value);
    return t.href ? t.href(y) : `${t.path.value}${y}`;
  }, h = ($, y) => {
    const k = l.value?.facets.find((F) => F.key === $);
    if (!k) return;
    const T = Ba(s.value.expr, k, y(Ra(s.value.expr, k)));
    _({ expr: T }, v());
  }, b = ($) => {
    const y = $ === null ? null : tt(n.value, $);
    return (y?.key ?? null) === s.value.entity ? {} : {
      entity: y?.key ?? null,
      view: Ln(s.value.view, s.value.entity, y?.key ?? null, a.value),
      sort: Ee(y, s.value.sort, n.value).key
    };
  }, P = ($) => {
    const y = b($);
    Object.keys(y).length && _(y, d());
  };
  return {
    query: s,
    entity: l,
    focus: r,
    sort: o,
    sorts: i,
    summary: f(() => $l(s.value, l.value, n.value)),
    terms: f(() => xt(s.value, l.value, n.value)),
    isPristine: f(() => dn(s.value)),
    isEverything: f(() => s.value.entity === null),
    hasFacets: f(() => wl(s.value.expr, l.value)),
    setEntity: P,
    entityHref: ($) => p(b($)),
    clearEntity: () => P(null),
    setView($, y) {
      _(y === void 0 ? { view: $ } : { view: $, page: Math.max(1, Math.floor(y)) }, d());
    },
    setSort($) {
      _({ sort: Ee(l.value, $, n.value).key }, d());
    },
    toggleDirection() {
      _({ dir: s.value.dir === "desc" ? "asc" : "desc" }, d());
    },
    setExpression($) {
      return _({ expr: $ }, d());
    },
    narrow($, y, k) {
      return _({ expr: $, ...b(y), ...k ? { view: k } : {} }, d());
    },
    narrowHref($, y, k) {
      return p({ expr: $, ...b(y), ...k ? { view: k } : {} });
    },
    setPage($, y) {
      _({ page: Math.max(1, Math.floor($)) }, y ?? d());
    },
    setFacet($, y) {
      h($, () => y);
    },
    toggleChip($, y) {
      h($, (k) => k.kind !== "chips" ? k : { kind: "chips", selected: k.selected.includes(y) ? k.selected.filter((F) => F !== y) : [...k.selected, y] });
    },
    setRange($, y, k) {
      h($, (T) => T.kind === "range" ? { kind: "range", min: y, max: k } : T);
    },
    toggleFlag($) {
      h(
        $,
        (y) => y.kind === "toggle" ? { kind: "toggle", on: !y.on } : y
      );
    },
    removeTerm($) {
      if ($.facetKey === $t) {
        P(null);
        return;
      }
      if ($.facetKey === ot) {
        const y = zs(re(s.value.expr), $.group ?? 0, $.index ?? 0);
        _({ expr: he(y) }, d());
      }
    },
    clearFilters() {
      _({ ...b(null), expr: "" }, d());
    },
    clearHref: () => p({ ...b(null), expr: "" }),
    reset() {
      c(yt(n.value, a.value), d());
    },
    homeHref: () => g(yt(n.value, a.value)),
    hrefFor($) {
      const y = { ...s.value, ...$ };
      return "entity" in $ && !("view" in $) && (y.view = Ln(s.value.view, s.value.entity, y.entity, a.value)), y.page = $.page ?? (Kt($) ? 1 : s.value.page), g(y);
    }
  };
}
const jn = 50;
function Sl(e) {
  const t = me([]), n = H(0), a = H(0), s = H(!1), l = H(!1), r = me(null);
  let i = 0, o = null, c = null;
  const d = f(() => (e.query.value.page - 1) * e.limit.value), v = f(() => Cs(n.value, e.limit.value)), _ = f(() => Math.max(0, n.value - a.value)), p = () => {
    const I = e.query.value, B = e.within?.value.trim(), q = La(e.entity.value, I.expr);
    return B ? { ...I, expr: pn(B, q) } : q === I.expr ? I : { ...I, expr: q };
  }, g = (I, B) => {
    t.value = I.rows, n.value = I.total, a.value = I.kept ?? 0, r.value = null, h(B);
  }, h = (I) => {
    o = { key: I, total: n.value }, l.value = !1;
  }, b = (I) => {
    r.value = I, t.value = [], n.value = 0, a.value = 0, o = null, l.value = !1;
  }, P = (I, B, q, ie) => {
    let oe = !0;
    const se = () => I === i;
    let M = 0, U = !1;
    const O = (ne) => {
      M = ne, U = !0, ie === void 0 && (n.value = ne);
    }, J = () => {
      oe && (oe = !1, t.value = [], a.value = 0, O(0)), r.value = null;
    };
    return {
      get open() {
        return se();
      },
      insert(ne, ye) {
        if (!se()) return;
        const ve = Array.isArray(ne) ? ne : [ne];
        if (!ve.length) return;
        J();
        const xe = [...t.value];
        xe.splice(ye ?? xe.length, 0, ...ve), t.value = B > 0 ? xe.slice(0, B) : xe, O(M + ve.length);
      },
      set(ne) {
        se() && (ne.rows && (J(), t.value = B > 0 ? ne.rows.slice(0, B) : ne.rows, O(ne.rows.length)), ne.total !== void 0 && O(ne.total));
      },
      close() {
        se() && (s.value = !1, U && (n.value = M), h(q));
      },
      fail(ne) {
        se() && (b(ne), s.value = !1);
      }
    };
  }, $ = () => {
    const I = c;
    c = null, I?.();
  }, y = () => {
    const I = ++i;
    $();
    const B = k.value, q = o?.key === B ? o.total : void 0;
    l.value = q === void 0;
    const ie = {
      query: p(),
      schema: e.schema.value,
      entity: e.entity.value,
      limit: e.limit.value,
      offset: d.value
    }, oe = e.source.value;
    if (oe.stream) {
      s.value = !0;
      try {
        c = oe.stream(ie, P(I, ie.limit, B, q)) ?? null;
      } catch (M) {
        b(M), s.value = !1;
      }
      return;
    }
    let se;
    try {
      se = oe.query(ie);
    } catch (M) {
      b(M);
      return;
    }
    if (!(se instanceof Promise)) {
      g(se, B), s.value = !1;
      return;
    }
    s.value = !0, se.then((M) => {
      I === i && g(M, B);
    }).catch((M) => {
      I === i && b(M);
    }).finally(() => {
      I === i && (s.value = !1);
    });
  }, k = f(() => {
    const I = p();
    return `${e.entity.value?.key ?? e.schema.value.entities[0]?.key ?? ""}|${JSON.stringify(fn.map((q) => I[q]))}`;
  }), T = f(() => `${k.value}|${e.query.value.page}`);
  return te([e.source, T, e.limit], y, {
    immediate: !0
  }), Ct(() => {
    i++, $();
  }, !0), { rows: t, total: n, matched: _, offset: d, pageCount: v, pending: s, counting: l, error: r, refresh: y, locate: async (I, B) => {
    const q = Math.max(0, B - 1 - jn);
    try {
      const { rows: ie } = await e.source.value.query({
        query: p(),
        schema: e.schema.value,
        entity: e.entity.value,
        limit: jn * 2 + 1,
        offset: q
      }), oe = ie.findIndex((se) => se.id === I);
      return oe === -1 ? null : q + oe + 1;
    } catch {
      return null;
    }
  }, peek: async (I, B) => {
    if (B <= 0) return [];
    try {
      const { rows: q } = await e.source.value.query({
        query: p(),
        schema: e.schema.value,
        entity: e.entity.value,
        limit: B,
        offset: Math.max(0, I)
      });
      return q;
    } catch {
      return [];
    }
  } };
}
function Cl(e) {
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
    const o = e.rows.value[0];
    if (o?.id === i.id) {
      i.gone && (t.value = { ...i, gone: !1, next: void 0 });
      return;
    }
    (!i.gone || o?.id !== i.next) && l(i);
  }, l = async (i) => {
    const o = ++n, c = await e.locate(i.id, i.page), d = c === null && i.next ? await e.locate(i.next, i.page) : null;
    if (o !== n || t.value?.id !== i.id || t.value.page !== i.page) return;
    const v = e.rows.value[0]?.id;
    c !== null ? r(c, !1) : d === null ? t.value = { ...i, gone: !0, next: v } : d !== i.page && r(d);
  }, r = (i, o = t.value?.gone ?? !1) => {
    t.value && (t.value = { ...t.value, page: i, gone: o }, e.moveTo(i));
  };
  return te([e.active, e.rows, e.pending, e.page, e.list], s, {
    immediate: !0,
    flush: "post"
  }), {
    id: f(() => t.value?.id ?? null),
    gone: f(() => t.value?.gone === !0),
    holding: f(() => t.value !== null),
    step(i) {
      const o = t.value;
      return !o?.gone || i < o.page ? i : i - 1 > o.page ? i - 1 : (a(), null);
    },
    moveTo: r
  };
}
const Pl = 150;
function El(e) {
  const t = e.delay ?? Pl, n = H(""), a = H("");
  let s = !1, l;
  const r = () => {
    clearTimeout(l), l = void 0;
  }, i = f(() => nt(Gs(a.value), e.entity.value, e.schema?.value)), o = f(() => i.value.trim() !== ""), c = f(
    () => JSON.stringify([i.value, ...fn.map((p) => e.query.value[p])])
  ), d = me(null), v = f(() => {
    const p = e.query.value;
    if (!o.value) return p;
    const g = d.value?.of === c.value ? d.value.page : 1;
    return { ...p, expr: st(p.expr, i.value), page: g };
  });
  te(n, (p) => {
    if (r(), !p.trim()) {
      s || (a.value = "");
      return;
    }
    s = !1, l = setTimeout(() => {
      l = void 0, a.value = n.value;
    }, t);
  }), te(
    e.query,
    () => {
      s && (s = !1, a.value = "");
    },
    { flush: "sync" }
  );
  const _ = (p) => {
    r(), s = !0, n.value = "", !p() && s && (s = !1, a.value = "");
  };
  return aa() && Ct(r), {
    text: n,
    live: v,
    drafting: o,
    setPage(p) {
      d.value = { of: c.value, page: Math.max(1, Math.floor(p)) };
    },
    commit() {
      const p = n.value.trim();
      if (!p) return;
      const g = st(
        e.query.value.expr,
        nt(p, e.entity.value, e.schema?.value)
      );
      a.value = p, _(() => e.setExpression(g));
    },
    abandon() {
      r(), s = !1, n.value = "", a.value = "";
    },
    release: _
  };
}
const Ml = 25, Ha = (e, t) => e.toLowerCase() === t.toLowerCase();
function Ll(e, t) {
  return e.find((n) => Ha(n.id, t));
}
function Tl(e) {
  const t = me(/* @__PURE__ */ new Map()), n = /* @__PURE__ */ new Set(), a = (i) => {
    if (i.facetKey !== ot) return null;
    const o = Oa(e.schema.value, i.field, i.value);
    return o ? { ...o, key: `${o.entity.key}:${o.id}` } : null;
  }, s = (i) => {
    const { entity: o, id: c } = i, d = e.query.value;
    return e.source.value.query({
      query: {
        ...d,
        entity: o.key,
        // The reference on its own. The rest of the query is about the rows on
        // screen, which are of another type entirely.
        expr: Sa(o, c) ?? "",
        sort: Ee(o, d.sort, e.schema.value).key,
        page: 1
      },
      schema: e.schema.value,
      entity: o,
      limit: Ml,
      offset: 0
    });
  }, l = (i, o) => {
    const c = mt(pe(i.columns ?? [], "identity"), o);
    return c === ke || Ha(c, o.id) ? "" : c;
  }, r = () => {
    if (e.loading.value) return;
    const i = /* @__PURE__ */ new Map();
    for (const d of e.terms.value) {
      const v = a(d);
      v && !t.value.has(v.key) && !n.has(v.key) && i.set(v.key, v);
    }
    if (!i.size) return;
    const o = [...i.values()].map((d) => ({
      reference: d,
      outcome: s(d)
    })), c = (d) => {
      const v = new Map(t.value);
      d.forEach((_, p) => {
        const { reference: g } = o[p], h = Ll(_.rows, g.id);
        v.set(g.key, h ? l(g.entity, h) : "");
      }), t.value = v;
    };
    if (o.every(({ outcome: d }) => !(d instanceof Promise))) {
      c(o.map(({ outcome: d }) => d));
      return;
    }
    for (const { reference: d } of o) n.add(d.key);
    Promise.all(o.map(({ outcome: d }) => Promise.resolve(d))).then(c).catch(() => {
    }).finally(() => {
      for (const { reference: d } of o) n.delete(d.key);
    });
  };
  return te([e.source, e.schema, e.terms, e.loading], () => {
    try {
      r();
    } catch {
    }
  }, { immediate: !0 }), {
    names: t,
    nameOf(i) {
      const o = a(i);
      return o && t.value.get(o.key) || null;
    }
  };
}
const Ol = 4, Nl = 8, Al = 180;
function Il(e, t, n, a = {}) {
  const s = a.gap ?? Ol, l = a.margin ?? Nl, r = a.flipBelow ?? Al, i = a.side ?? "below", o = {
    below: n.height - e.bottom - s - l,
    above: e.top - s - l
  }, c = i === "below" ? "above" : "below", d = o[i] < r && o[c] > o[i] ? c : i, v = Math.min(a.maxHeight ?? 1 / 0, Math.max(0, o[d])), _ = Math.max(0, n.width - l * 2), p = Math.min(a.minWidth ?? e.width, _), g = Math.min(Math.max(t, p), _), h = a.align === "end" ? e.right - g : e.left, b = Math.max(l, Math.min(h, n.width - g - l));
  return d === "below" ? { side: d, left: b, top: e.bottom + s, maxHeight: v, minWidth: p, maxWidth: _ } : { side: d, left: b, bottom: n.height - e.top + s, maxHeight: v, minWidth: p, maxWidth: _ };
}
const Rl = ["data-dc-theme", "data-dc-side"], Pe = [], Bl = /* @__PURE__ */ z({
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
    const n = e, a = t, { theme: s, style: l, adopt: r } = _n(n), i = H(null), o = H(null), c = { root: () => i.value };
    function d() {
      const y = n.anchor;
      y && (o.value = Il(
        y.getBoundingClientRect(),
        i.value?.offsetWidth ?? 0,
        { width: window.innerWidth, height: window.innerHeight },
        { side: n.side, align: n.align, maxHeight: n.maxHeight, minWidth: n.minWidth }
      ));
    }
    const v = f(() => {
      const y = o.value, k = y ? {
        position: "fixed",
        left: `${y.left}px`,
        ...y.top !== void 0 ? { top: `${y.top}px` } : {},
        ...y.bottom !== void 0 ? { bottom: `${y.bottom}px` } : {},
        minWidth: `${y.minWidth}px`,
        maxWidth: `${y.maxWidth}px`,
        maxHeight: `${y.maxHeight}px`,
        overflowY: "auto"
      } : { position: "fixed", visibility: "hidden" };
      return { ...l.value, ...k };
    });
    function _() {
      a("update:open", !1), a("close");
    }
    function p(y) {
      return i.value?.contains(y) || n.anchor?.contains(y) ? !0 : Pe.slice(Pe.indexOf(c) + 1).some((T) => T.root()?.contains(y));
    }
    function g(y) {
      const k = y.target;
      k && !p(k) && _();
    }
    function h(y) {
      y.key !== "Escape" || y.defaultPrevented || Pe[Pe.length - 1] === c && (y.preventDefault(), i.value?.contains(document.activeElement) && n.anchor?.focus(), _());
    }
    let b = null;
    async function P() {
      Pe.includes(c) || (Pe.push(c), r(), o.value = null, await Xe(), d(), window.addEventListener("pointerdown", g, !0), document.addEventListener("keydown", h, !0), window.addEventListener("resize", d), window.addEventListener("scroll", d, !0), typeof ResizeObserver < "u" && i.value && (b = new ResizeObserver(() => d()), b.observe(i.value)));
    }
    function $() {
      const y = Pe.indexOf(c);
      y !== -1 && (Pe.splice(y, 1), window.removeEventListener("pointerdown", g, !0), document.removeEventListener("keydown", h, !0), window.removeEventListener("resize", d), window.removeEventListener("scroll", d, !0), b?.disconnect(), b = null);
    }
    return ct(() => {
      n.open && P();
    }), te(
      () => n.open,
      (y) => {
        y ? P() : $();
      }
    ), te(() => n.anchor, () => {
      n.open && d();
    }), we($), (y, k) => e.open ? (u(), A(Pt, {
      key: 0,
      to: e.to
    }, [
      S("div", De({
        ref_key: "root",
        ref: i
      }, y.$attrs, {
        class: "dc-shell dc-layer dc-popover",
        "data-dc-theme": w(s),
        "data-dc-side": o.value?.side,
        style: v.value
      }), [
        G(y.$slots, "default", {}, void 0, !0)
      ], 16, Rl)
    ], 8, ["to"])) : L("", !0);
  }
}), j = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [a, s] of t)
    n[a] = s;
  return n;
}, Hl = /* @__PURE__ */ j(Bl, [["__scopeId", "data-v-a688f2f7"]]), ql = ["href"], Fl = /* @__PURE__ */ z({
  __name: "PressLink",
  props: {
    href: {},
    selectable: { type: Boolean }
  },
  emits: ["press"],
  setup(e, { emit: t }) {
    const n = e, a = t;
    function s(i) {
      i.stopPropagation(), !Ma() && (n.href && en(i) ? Zt(n.href, i) : a("press", lt(i), i));
    }
    function l(i) {
      n.href && i.button === 1 && Zt(n.href, i);
    }
    function r(i) {
      if (n.href && en(i)) {
        i.stopPropagation();
        return;
      }
      i.preventDefault(), a("press", lt(i), i);
    }
    return (i, o) => e.selectable ? (u(), m("span", {
      key: 0,
      role: "link",
      tabindex: "0",
      class: "dc-press",
      onClick: s,
      onAuxclick: l,
      onKeydown: o[0] || (o[0] = Ne((c) => c.currentTarget.click(), ["enter"]))
    }, [
      G(i.$slots, "default", {}, void 0, !0)
    ], 32)) : e.href ? (u(), m("a", {
      key: 1,
      href: e.href,
      class: "dc-press",
      onClick: r
    }, [
      G(i.$slots, "default", {}, void 0, !0)
    ], 8, ql)) : (u(), m("button", {
      key: 2,
      type: "button",
      class: "dc-press",
      onClick: r
    }, [
      G(i.$slots, "default", {}, void 0, !0)
    ]));
  }
}), ae = /* @__PURE__ */ j(Fl, [["__scopeId", "data-v-e5165a68"]]), St = (e) => e.toLowerCase().replace(/\s+/g, ""), Vl = /(?:[^\s"]|"[^"]*"?)*$/, Dl = /^(-?)([^:=<>"\s-][^:=<>"\s]*)([:=])(.*)$/, Un = 4;
function Kl(e, t) {
  const n = St(t);
  return e.find((a) => rt(a) === n || St(a.label) === n);
}
function Wl(e) {
  switch (e.kind) {
    case "toggle":
      return e.text;
    case "range":
      return `${e.min}..${e.max}`;
    case "chips": {
      const t = e.options.slice(0, Un).join(" · "), n = e.options.length - Un;
      return n > 0 ? `${t} · +${n}` : t;
    }
  }
}
function zl(e) {
  switch (e.kind) {
    case "toggle":
      return [{ value: "true", hint: e.text }, { value: "false" }];
    case "chips":
      return e.options.map((t) => ({ value: t }));
    case "range":
      return [];
  }
}
function Qn(e, t) {
  return St(e).includes(St(t));
}
function jl(e, t) {
  const n = Vl.exec(e)?.[0] ?? "", a = e.slice(0, e.length - n.length), s = [], l = Dl.exec(n);
  if (l) {
    const [, r, i, o, c] = l, d = Kl(t, i);
    if (!d) return [];
    const v = c.replace(/"/g, "").toLowerCase();
    for (const { value: _, hint: p } of zl(d)) {
      if (!_.toLowerCase().includes(v)) continue;
      const g = _e({
        kind: "field",
        field: rt(d),
        comparator: o,
        value: _,
        ...r ? { negated: !0 } : {}
      });
      s.push({ draft: a + g, label: g, ...p ? { hint: p } : {}, complete: !0 });
    }
  } else {
    if (/[<>"]/.test(n)) return [];
    const r = n.startsWith("-") ? "-" : "", i = n.slice(r.length);
    for (const o of t) {
      if (i && !Qn(o.key, i) && !Qn(o.label, i)) continue;
      const c = `${r}${rt(o)}:`;
      s.push({ draft: a + c, label: c, hint: Wl(o), complete: !1 });
    }
  }
  return s.filter((r) => r.draft !== e);
}
const Ul = { class: "dc-header" }, Ql = { class: "dc-header__main" }, Gl = {
  class: "dc-header__brand",
  "aria-hidden": "true"
}, Yl = { class: "dc-header__sr" }, Xl = {
  key: 2,
  class: "dc-header__within"
}, Jl = ["title"], Zl = { class: "dc-header__query" }, er = ["data-dc-more", "title"], tr = { class: "dc-header__run" }, nr = {
  key: 0,
  class: "dc-header__or dc-mono",
  "aria-hidden": "true"
}, ar = ["title", "aria-label", "onClick"], sr = ["placeholder", "aria-expanded", "aria-activedescendant", "onKeydown"], lr = ["id", "aria-selected", "onClick"], rr = { class: "dc-completion__term dc-mono" }, or = {
  key: 0,
  class: "dc-completion__hint"
}, ir = {
  key: 0,
  class: "dc-header__actions"
}, cr = /* @__PURE__ */ z({
  __name: "ShellHeader",
  setup(e) {
    const t = Et(), n = ee(), a = f(() => n.schema.value), s = f(() => {
      const C = n.within.value.trim();
      return C ? xt({ ...n.query.value, expr: C }, null) : [];
    }), l = f(() => {
      const C = n.entity.value, N = C?.keepsScope ? void 0 : C?.scope?.toLowerCase();
      return n.terms.value.filter((V) => V.facetKey !== $t).map((V, D, Te) => {
        const Fe = Te[D - 1];
        return {
          term: V,
          or: Fe?.group !== void 0 && V.group !== void 0 && V.group !== Fe.group,
          idle: !!N && V.field?.toLowerCase() === N
        };
      });
    }), r = Tl({
      source: n.source,
      schema: n.schema,
      query: n.query,
      loading: n.loading,
      // The scope's parts as well as the query's: it names a record more often
      // than a typed term does, being what a record's own page is built on.
      terms: f(() => [...s.value, ...n.terms.value])
    });
    function i(C) {
      const N = Ta(a.value, C)?.scopeLabel ?? C;
      return N.charAt(0).toUpperCase() + N.slice(1);
    }
    function o(C) {
      return C.replace(/\s*\([^()]*\)\s*$/, "");
    }
    function c(C) {
      const N = r.nameOf(C);
      return N ? `${C.negated ? "-" : ""}${i(C.field)}: ${o(N)}` : C.label;
    }
    function d(C) {
      const N = c(C.term), V = C.idle ? `Not applied to ${n.entity.value?.label} — remove ${N}` : `Remove ${N}`, D = C.term.address;
      return D && D !== N ? `${V}
Written ${D} in the address and the search box` : V;
    }
    const v = f(() => {
      const C = n.pressPreview?.value;
      if (!C) return [];
      const N = n.query.value, V = new Set(n.terms.value.map((D) => D.address));
      return xt(
        { ...N, expr: C.alone ? C.term : st(N.expr, C.term) },
        n.entity.value,
        n.schema.value
      ).filter((D) => D.address !== void 0 && !V.has(D.address)).map(
        (D) => C.name ? `${i(D.field)}: ${o(C.name)}` : D.label
      );
    }), _ = f(() => n.pressPreview?.value?.alone === !0), p = H(null);
    function g(C) {
      p.value = C instanceof HTMLInputElement ? C : null;
    }
    function h() {
      n.abandonDraft(), p.value?.blur();
    }
    function b() {
      const C = y.value[$.value];
      if (k.value && C) {
        F(C);
        return;
      }
      B.value = null, P.value = !1, n.commitDraft();
    }
    const P = H(!1), $ = H(-1), y = f(() => {
      const C = n.entity.value?.facets ?? [];
      return C.length ? jl(n.draft.value, C) : [];
    }), k = f(() => P.value && y.value.length > 0);
    te(y, () => {
      $.value = -1;
    });
    const T = `${Mt() ?? "dc-header"}-completions`;
    function F(C) {
      n.draft.value = C.draft, P.value = !C.complete, $.value = -1, Xe(() => {
        const N = p.value;
        N?.focus(), N?.setSelectionRange(C.draft.length, C.draft.length);
      });
    }
    function ce(C, N) {
      if (C.isComposing || !y.value.length) return;
      if (C.preventDefault(), !P.value) {
        P.value = !0;
        return;
      }
      const V = y.value.length + 1;
      $.value = ($.value + 1 + N + V) % V - 1;
    }
    function I(C) {
      return `${T}-${C}`;
    }
    const B = H(null), q = f(() => Math.min(B.value ?? 1 / 0, l.value.length)), ie = f(() => [
      { key: "before", entries: l.value.slice(0, q.value) },
      { key: "after", entries: l.value.slice(q.value) }
    ]), oe = f(() => q.value < l.value.length);
    te(l, (C) => {
      B.value !== null && B.value >= C.length && (B.value = null);
    });
    function se(C, N) {
      B.value = C >= l.value.length ? null : Math.max(0, C), Xe(() => {
        const V = p.value;
        if (!V) return;
        const D = N === "start" ? 0 : V.value.length;
        V.setSelectionRange(D, D), V.scrollIntoView({ block: "nearest", inline: "nearest" }), Ce();
      });
    }
    function M(C) {
      const N = p.value;
      return !N || N.selectionStart !== N.selectionEnd ? !1 : N.selectionStart === (C === "start" ? 0 : N.value.length);
    }
    function U(C) {
      q.value === 0 || !M("start") || (C.preventDefault(), se(C.key === "Home" ? 0 : q.value - 1, "start"));
    }
    function O(C) {
      !oe.value || !M("end") || (C.preventDefault(), se(C.key === "End" ? l.value.length : q.value + 1, "end"));
    }
    function J(C) {
      q.value === 0 || !M("start") || (C.preventDefault(), ve(l.value[q.value - 1].term, !0));
    }
    function ne(C) {
      !oe.value || !M("end") || (C.preventDefault(), ve(l.value[q.value].term, !1));
    }
    function ye(C) {
      C.isComposing || C.altKey || C.ctrlKey || C.metaKey || C.shiftKey || (C.key === "ArrowLeft" || C.key === "Home" ? U(C) : C.key === "ArrowRight" || C.key === "End" ? O(C) : C.key === "Backspace" ? J(C) : C.key === "Delete" && ne(C));
    }
    function ve(C, N) {
      N && B.value !== null && (B.value = Math.max(0, B.value - 1)), n.removeTerm(C);
    }
    function xe(C) {
      C.target?.closest("button, input") || (C.preventDefault(), p.value?.focus(), se(l.value.length, "end"));
    }
    function pt() {
      P.value = !1, n.draft.value || (B.value = null);
    }
    const Se = H(null), qe = H("");
    function Ce() {
      const C = Se.value;
      if (!C) {
        qe.value = "";
        return;
      }
      const N = C.scrollLeft > 1, V = C.scrollWidth - C.clientWidth - C.scrollLeft > 1;
      qe.value = N && V ? "both" : N ? "start" : V ? "end" : "";
    }
    let be = null;
    return te(
      Se,
      (C) => {
        be?.disconnect(), be = null, Ce(), !(!C || typeof ResizeObserver > "u") && (be = new ResizeObserver(Ce), be.observe(C));
      },
      { flush: "post" }
    ), te([l, q], Ce, { flush: "post" }), we(() => be?.disconnect()), (C, N) => (u(), m("div", Ul, [
      S("div", Ql, [
        a.value.label && t.brand ? (u(), A(ae, {
          key: 0,
          class: "dc-header__domain",
          "data-dc-brand": "",
          title: "Home",
          href: w(n).homeHref(),
          onPress: N[0] || (N[0] = (V) => w(n).reset())
        }, {
          default: Y(() => [
            S("span", Gl, [
              G(C.$slots, "brand", {
                label: a.value.label
              }, void 0, !0)
            ]),
            S("span", Yl, E(a.value.label), 1)
          ]),
          _: 3
        }, 8, ["href"])) : a.value.label ? (u(), A(ae, {
          key: 1,
          class: "dc-header__domain",
          title: "Home",
          href: w(n).homeHref(),
          onPress: N[1] || (N[1] = (V) => w(n).reset())
        }, {
          default: Y(() => [
            Z(E(a.value.label), 1)
          ]),
          _: 1
        }, 8, ["href"])) : L("", !0),
        G(C.$slots, "lead", {}, void 0, !0),
        s.value.length ? (u(), m("span", Xl, [
          N[10] || (N[10] = S("span", { class: "dc-header__sr" }, "Within", -1)),
          (u(!0), m(W, null, X(s.value, (V) => (u(), m("span", {
            key: `scope:${V.id}`,
            class: "dc-within dc-mono dc-truncate",
            title: c(V)
          }, E(c(V)), 9, Jl))), 128))
        ])) : L("", !0),
        S("div", Zl, [
          S("div", {
            class: "dc-header__field",
            onMousedown: xe
          }, [
            S("div", {
              ref_key: "termBar",
              ref: Se,
              class: "dc-header__terms",
              "data-dc-more": qe.value,
              title: w(n).summary.value,
              onScroll: Ce
            }, [
              (u(!0), m(W, null, X(ie.value, (V) => (u(), m(W, {
                key: V.key
              }, [
                S("span", tr, [
                  (u(!0), m(W, null, X(V.entries, (D) => (u(), m(W, {
                    key: D.term.id
                  }, [
                    D.or ? (u(), m("span", nr, "or")) : L("", !0),
                    S("button", {
                      type: "button",
                      class: de(["dc-term dc-mono", { "dc-term--idle": D.idle, "dc-term--leaving": _.value }]),
                      title: d(D),
                      "aria-label": `Remove ${c(D.term)}`,
                      onMousedown: N[2] || (N[2] = Ae(() => {
                      }, ["prevent"])),
                      onClick: (Te) => ve(D.term, V.key === "before")
                    }, E(c(D.term)), 43, ar)
                  ], 64))), 128)),
                  V.key === "before" ? (u(!0), m(W, { key: 0 }, X(v.value, (D) => (u(), m("span", {
                    key: D,
                    class: "dc-term dc-term--preview dc-mono",
                    "aria-hidden": "true"
                  }, E(D), 1))), 128)) : L("", !0)
                ]),
                V.key === "before" ? Ut((u(), m("input", {
                  key: 0,
                  ref_for: !0,
                  ref: g,
                  "onUpdate:modelValue": N[3] || (N[3] = (D) => w(n).draft.value = D),
                  class: de(["dc-header__search dc-mono", { "dc-header__search--between": oe.value }]),
                  style: le({ "--dc-typed": String(Math.max(1, w(n).draft.value.length)) }),
                  type: "text",
                  autocomplete: "off",
                  spellcheck: "false",
                  placeholder: oe.value ? "" : "Filter…",
                  "aria-label": "Filter",
                  role: "combobox",
                  "aria-autocomplete": "list",
                  "aria-expanded": k.value,
                  "aria-controls": T,
                  "aria-activedescendant": k.value && $.value >= 0 ? I($.value) : void 0,
                  onKeydown: [
                    Ne(Ae(b, ["prevent"]), ["enter"]),
                    Ne(Ae(h, ["prevent"]), ["esc"]),
                    N[4] || (N[4] = Ne((D) => ce(D, 1), ["down"])),
                    N[5] || (N[5] = Ne((D) => ce(D, -1), ["up"])),
                    ye
                  ],
                  onFocus: N[6] || (N[6] = (D) => P.value = !0),
                  onInput: N[7] || (N[7] = (D) => P.value = !0),
                  onBlur: pt
                }, null, 46, sr)), [
                  [ns, w(n).draft.value]
                ]) : L("", !0)
              ], 64))), 128))
            ], 40, er)
          ], 32)
        ])
      ]),
      Q(Hl, {
        id: T,
        open: k.value,
        anchor: p.value,
        "min-width": 0,
        "max-height": 320,
        class: "dc-completions",
        role: "listbox",
        "aria-label": "Completions",
        onClose: N[9] || (N[9] = (V) => P.value = !1)
      }, {
        default: Y(() => [
          (u(!0), m(W, null, X(y.value, (V, D) => (u(), m("div", {
            id: I(D),
            key: V.label,
            class: de(["dc-completion", { "dc-completion--active": D === $.value }]),
            role: "option",
            "aria-selected": D === $.value,
            onMousedown: N[8] || (N[8] = Ae(() => {
            }, ["prevent"])),
            onClick: (Te) => F(V)
          }, [
            S("span", rr, E(V.label), 1),
            V.hint ? (u(), m("span", or, E(V.hint), 1)) : L("", !0)
          ], 42, lr))), 128))
        ]),
        _: 1
      }, 8, ["open", "anchor"]),
      t.actions ? (u(), m("div", ir, [
        G(C.$slots, "actions", {}, void 0, !0)
      ])) : L("", !0)
    ]));
  }
}), qa = /* @__PURE__ */ j(cr, [["__scopeId", "data-v-be5eed0e"]]), ur = ["checked", "indeterminate"], Fa = /* @__PURE__ */ z({
  __name: "PageTick",
  setup(e) {
    const t = ee(), n = f(() => t.rows.value.filter((l) => t.isSelected(l)).length), a = f(
      () => t.rows.value.length > 0 && n.value === t.rows.value.length
    ), s = f(() => n.value > 0 && !a.value);
    return (l, r) => (u(), m("input", {
      class: "dc-tick",
      type: "checkbox",
      checked: a.value,
      indeterminate: s.value,
      "aria-label": "Select every row on this page",
      title: "Select every row on this page",
      onChange: r[0] || (r[0] = (i) => w(t).selectPage(!a.value))
    }, null, 40, ur));
  }
}), dr = { class: "dc-pick" }, fr = ["id"], vr = ["id", "aria-expanded", "aria-labelledby", "data-dc-value"], pr = {
  key: 0,
  class: "dc-pick__icon",
  viewBox: "0 0 16 16",
  "aria-hidden": "true"
}, hr = ["d"], mr = { class: "dc-pick__label" }, yr = /* @__PURE__ */ z({
  __name: "PickControl",
  props: {
    modelValue: {},
    options: {},
    label: {},
    mono: { type: Boolean }
  },
  emits: ["update:modelValue", "open", "close"],
  setup(e, { emit: t }) {
    const n = e, a = t, s = Mt() ?? "dc-pick", l = H(null), r = H(null), i = H(null), o = H(!1), c = f(() => i.value !== null), d = H(null), v = f(
      () => n.options.find((k) => k.key === n.modelValue) ?? n.options[0]
    ), _ = f(
      () => n.options.map((k) => ({
        id: k.key,
        label: k.label,
        icon: k.icon,
        checked: k.key === n.modelValue
      }))
    ), p = f(
      () => i.value ? { maxHeight: `${window.innerHeight - i.value.y - 8}px` } : void 0
    );
    function g(k) {
      const T = l.value?.getBoundingClientRect();
      T && (d.value = l.value?.closest(".dc-shell") ?? document.body, i.value = { x: T.left, y: T.bottom + 4, mirrorX: T.right }, o.value = k, a("open"));
    }
    function h(k) {
      i.value && a("close"), i.value = null, k && l.value?.focus();
    }
    function b() {
      c.value ? h(!0) : g(!1);
    }
    function P(k) {
      k.key !== "ArrowDown" && k.key !== "ArrowUp" || c.value || (k.preventDefault(), g(!0));
    }
    function $(k) {
      const T = k.target;
      T && (l.value?.contains(T) || r.value?.root?.contains(T) || h(!1));
    }
    te(c, (k) => {
      k ? window.addEventListener("pointerdown", $, !0) : window.removeEventListener("pointerdown", $, !0);
    }), we(() => window.removeEventListener("pointerdown", $, !0));
    function y(k) {
      h(!0), !(k.id === void 0 || k.id === n.modelValue) && a("update:modelValue", k.id);
    }
    return (k, T) => (u(), m("span", dr, [
      S("span", {
        id: `${w(s)}-name`,
        class: "dc-pick__name"
      }, E(e.label), 9, fr),
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
        onClick: b,
        onKeydown: P
      }, [
        v.value?.icon ? (u(), m("svg", pr, [
          S("path", {
            d: v.value.icon
          }, null, 8, hr)
        ])) : L("", !0),
        S("span", mr, E(v.value?.label), 1)
      ], 42, vr),
      T[1] || (T[1] = S("svg", {
        class: "dc-pick__mark",
        viewBox: "0 0 16 16",
        "aria-hidden": "true"
      }, [
        S("path", { d: "M4 6l4 4 4-4" })
      ], -1)),
      i.value && d.value ? (u(), A(Pt, {
        key: 0,
        to: d.value
      }, [
        Q(w(cs), {
          ref_key: "menu",
          ref: r,
          class: "dc-pick__list",
          style: le(p.value),
          items: _.value,
          at: i.value,
          label: e.label,
          autofocus: o.value,
          onChoose: y,
          onDismiss: T[0] || (T[0] = (F) => h(!0))
        }, null, 8, ["style", "items", "at", "label", "autofocus"])
      ], 8, ["to"])) : L("", !0)
    ]));
  }
}), nn = /* @__PURE__ */ j(yr, [["__scopeId", "data-v-0e31a711"]]), gr = {
  class: "dc-pager",
  "aria-label": "Pages"
}, _r = ["title"], wr = ["value", "onKeydown"], kr = {
  class: "dc-pager__total",
  "aria-hidden": "true"
}, br = {
  class: "dc-pager__sr",
  "aria-live": "polite"
}, $r = /* @__PURE__ */ z({
  __name: "ShellPager",
  props: {
    pagesNote: {}
  },
  setup(e) {
    const t = e, n = ee(), a = f(() => n.liveQuery.value.page), s = f(
      () => `${n.counting.value ? "~" : ""}${Ve(n.pageCount.value)}`
    ), l = f(() => {
      if (n.limit.value === 1) {
        const h = `Record ${Ve(a.value)} of ${s.value}`;
        return t.pagesNote ? `${h}
${t.pagesNote}` : h;
      }
      let p = `Page ${Ve(a.value)} of ${s.value}`;
      const g = n.rows.value.length;
      if (g) {
        const h = n.offset.value + 1, b = `${n.counting.value ? "~" : ""}${Ve(n.total.value)}`;
        p += ` — rows ${Ve(h)} to ${Ve(h + g - 1)} of ${b}`;
      }
      return t.pagesNote ? `${p}
${t.pagesNote}` : p;
    }), r = H(null), i = f(() => r.value ?? String(a.value)), o = f(
      () => `calc(${Math.max(2, String(n.pageCount.value).length)}ch + 10px)`
    );
    function c(p) {
      p.target.select();
    }
    function d(p) {
      const g = p.target, h = g.value.replace(/[^0-9]/g, "");
      g.value !== h && (g.value = h), r.value = h;
    }
    function v(p) {
      const g = p.target, h = Number(r.value);
      r.value = null;
      const b = Number.isFinite(h) && h >= 1 ? Math.min(Math.trunc(h), Math.max(1, n.pageCount.value)) : a.value;
      g.value = String(b), b !== a.value && n.setPage(b);
    }
    function _(p) {
      const g = p.target;
      r.value = null, g.value = String(a.value), g.blur();
    }
    return (p, g) => (u(), m("nav", gr, [
      Q(ae, {
        class: "dc-pager__step",
        "aria-label": "Previous page",
        href: a.value > 1 ? w(n).hrefFor({ page: a.value - 1 }) : null,
        disabled: a.value <= 1,
        onPress: g[0] || (g[0] = (h) => w(n).setPage(a.value - 1))
      }, {
        default: Y(() => [...g[2] || (g[2] = [
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
          style: le({ width: o.value }),
          value: i.value,
          onFocus: c,
          onInput: d,
          onKeydown: [
            Ne(Ae(v, ["prevent"]), ["enter"]),
            Ne(Ae(_, ["prevent"]), ["esc"])
          ],
          onBlur: v
        }, null, 44, wr),
        S("span", kr, "/ " + E(s.value), 1)
      ], 8, _r),
      S("span", br, E(l.value), 1),
      Q(ae, {
        class: "dc-pager__step",
        "aria-label": "Next page",
        href: a.value < w(n).pageCount.value ? w(n).hrefFor({ page: a.value + 1 }) : null,
        disabled: a.value >= w(n).pageCount.value,
        onPress: g[1] || (g[1] = (h) => w(n).setPage(a.value + 1))
      }, {
        default: Y(() => [...g[3] || (g[3] = [
          S("span", { "aria-hidden": "true" }, "›", -1)
        ])]),
        _: 1
      }, 8, ["href", "disabled"])
    ]));
  }
}), xr = /* @__PURE__ */ j($r, [["__scopeId", "data-v-bdec7640"]]), Sr = {
  key: 0,
  class: "dc-actions__order"
}, Cr = {
  key: 1,
  class: "dc-actions__select"
}, Pr = {
  key: 0,
  class: "dc-actions__all"
}, Er = {
  class: "dc-actions__count",
  "aria-live": "polite"
}, Mr = {
  key: 1,
  class: "dc-actions__count dc-actions__all",
  "aria-live": "polite"
}, Lr = { class: "dc-actions__ops" }, Tr = ["disabled"], Or = ["data-dc-operation", "disabled", "onClick"], Nr = ["disabled"], Ar = /* @__PURE__ */ z({
  __name: "RecordActions",
  props: {
    views: {},
    selectionPlacement: {},
    pagesNote: {}
  },
  setup(e) {
    const t = e, n = ee(), a = f(() => Ie(n.query.value.view, t.views)), s = f(
      () => (d.value || v.value) && a.value !== "table" && n.sorts.value.length > 0
    ), l = f(
      () => n.sorts.value.map((k) => ({ key: k.key, label: k.label }))
    ), r = f(() => s.value && l.value.length > 1), i = f(() => n.query.value.dir === "desc"), o = f(
      () => `Sorted by ${n.sort.value.label}, ${i.value ? "descending" : "ascending"}`
    ), c = f(() => n.entity.value), d = f(
      () => !ca(n.query.value, t.views) && a.value !== "record"
    ), v = f(() => a.value === "record" && n.query.value.entity !== null), _ = f(
      () => (d.value || v.value) && !n.loading.value && (n.pageCount.value > 1 || !!t.pagesNote)
    ), p = f(() => n.selection.value.ids.length), g = f(
      () => d.value && n.selectable.value && (n.rows.value.length > 0 || p.value > 0)
    ), h = f(() => a.value === "table"), b = f(
      () => s.value || _.value || d.value && (g.value || !!(c.value?.create || c.value?.duplicate || c.value?.delete || c.value?.operations?.length))
    ), P = f(() => p.value ? `${p.value} selected` : h.value ? "" : "Select all"), $ = f(() => t.selectionPlacement === "end");
    function y(k) {
      return p.value ? k.endsWith("…") ? `${k.slice(0, -1)} ${p.value}…` : `${k} ${p.value}` : k;
    }
    return (k, T) => b.value ? (u(), m("div", {
      key: 0,
      class: de(["dc-actions", { "dc-actions--selection-end": $.value }])
    }, [
      s.value ? (u(), m("span", Sr, [
        r.value ? (u(), A(nn, {
          key: 0,
          class: "dc-actions__pick dc-actions__sort",
          label: "Sort",
          "model-value": w(n).sort.value.key,
          options: l.value,
          "onUpdate:modelValue": w(n).setSort
        }, null, 8, ["model-value", "options", "onUpdate:modelValue"])) : L("", !0),
        Q(ae, {
          class: "dc-actions__dir",
          "aria-label": o.value,
          title: o.value,
          href: w(n).hrefFor({ dir: i.value ? "asc" : "desc" }),
          onPress: T[0] || (T[0] = (F) => w(n).toggleDirection())
        }, {
          default: Y(() => [
            Z(E(i.value ? "↓" : "↑"), 1)
          ]),
          _: 1
        }, 8, ["aria-label", "title", "href"])
      ])) : L("", !0),
      g.value && P.value ? (u(), m("div", Cr, [
        h.value ? (u(), m("span", Mr, E(P.value), 1)) : (u(), m("label", Pr, [
          Q(Fa),
          S("span", Er, E(P.value), 1)
        ])),
        p.value ? (u(), m("button", {
          key: 2,
          type: "button",
          class: de(["dc-actions__clear", { "dc-actions__clear--op": $.value }]),
          onClick: T[1] || (T[1] = (F) => w(n).clearSelection())
        }, " Clear ", 2)) : L("", !0)
      ])) : L("", !0),
      S("div", Lr, [
        c.value?.create ? (u(), A(ae, {
          key: 0,
          class: "dc-actions__op dc-actions__new",
          href: w(n).createHref?.(c.value),
          onPress: T[2] || (T[2] = (F) => w(n).create(c.value))
        }, {
          default: Y(() => [
            T[5] || (T[5] = S("span", {
              class: "dc-actions__plus",
              "aria-hidden": "true"
            }, "+", -1)),
            Z(" " + E(c.value.create), 1)
          ]),
          _: 1
        }, 8, ["href"])) : L("", !0),
        c.value?.duplicate ? (u(), m("button", {
          key: 1,
          type: "button",
          class: "dc-actions__op",
          disabled: !p.value,
          onClick: T[3] || (T[3] = (F) => w(n).duplicate())
        }, E(y(c.value.duplicate)), 9, Tr)) : L("", !0),
        (u(!0), m(W, null, X(c.value?.operations ?? [], (F) => (u(), m("button", {
          key: F.key,
          type: "button",
          class: "dc-actions__op",
          "data-dc-operation": F.key,
          disabled: !p.value && F.selection !== !1,
          onClick: (ce) => w(n).operate(F.key)
        }, E(F.selection === !1 ? F.label : y(F.label)), 9, Or))), 128)),
        c.value?.delete ? (u(), m("button", {
          key: 2,
          type: "button",
          class: "dc-actions__op dc-actions__danger",
          disabled: !p.value,
          onClick: T[4] || (T[4] = (F) => w(n).delete())
        }, E(y(c.value.delete)), 9, Nr)) : L("", !0)
      ]),
      _.value ? (u(), A(xr, {
        key: 2,
        class: "dc-actions__pages",
        "pages-note": e.pagesNote
      }, null, 8, ["pages-note"])) : L("", !0)
    ], 2)) : L("", !0);
  }
}), an = /* @__PURE__ */ j(Ar, [["__scopeId", "data-v-95bd2f88"]]);
function Gn(e) {
  return Math.max(0, e.total - (e.kept ?? 0));
}
function Ir(e) {
  const t = me(/* @__PURE__ */ new Map()), n = H(!0);
  let a = 0, s;
  const l = () => {
    a++, s?.abort(), s = void 0;
  }, r = () => {
    l();
    const i = a, { signal: o } = s = new AbortController(), c = e.query.value, d = e.schema.value, v = e.entities.value, _ = e.within?.value.trim() ?? "";
    n.value = c.expr.trim() === "" && !_;
    const p = /* @__PURE__ */ new Map();
    let g = !0;
    for (const h of v) {
      const b = La(h, c.expr), P = _ ? pn(_, b) : b;
      let $ = !1;
      const y = (T) => {
        if (i !== a) return;
        if (g) {
          p.set(h.key, T);
          return;
        }
        const F = new Map(t.value);
        F.set(h.key, T), t.value = F;
      }, k = e.source.value.query({
        query: { ...c, entity: h.key, expr: P, page: 1 },
        schema: d,
        entity: h,
        limit: 0,
        offset: 0,
        signal: o,
        progress: (T) => {
          $ || y({ total: T, pending: !0, counted: !0 });
        }
      });
      k instanceof Promise ? (p.has(h.key) || p.set(h.key, { total: 0, pending: !0, counted: !1 }), k.then((T) => {
        $ = !0, y({ total: Gn(T), pending: !1, counted: !0 });
      })) : ($ = !0, p.set(h.key, { total: Gn(k), pending: !1, counted: !0 }));
    }
    g = !1, t.value = p;
  };
  return aa() && Ct(l), { counts: t, pristine: n, refresh: r, cancel: l };
}
const Rr = {
  key: 0,
  class: "dc-choosers"
}, Br = "…", Hr = /* @__PURE__ */ z({
  __name: "RecordChoosers",
  props: {
    views: {},
    typeChooser: {}
  },
  setup(e) {
    const t = e, n = ee(), a = f(
      () => n.hasFacets.value || !!n.liveQuery.value.expr.trim() || !!n.within.value
    ), s = Ir({
      source: n.source,
      schema: n.schema,
      // What each type holds of what is on screen, the draft's results included:
      // a count of the committed query would disagree with the rows under it.
      query: n.liveQuery,
      entities: n.entities,
      within: n.within
    });
    function l(p) {
      if (p.key === n.query.value.entity && a.value) return Ze((n.matched ?? n.total).value);
      if (s.pristine.value) return Yt(p);
      const h = s.counts.value.get(p.key);
      return h ? h.counted ? `${h.pending ? "~" : ""}${Ze(h.total)}` : Br : Yt(p);
    }
    const r = f(() => [
      { key: "", label: "Everything" },
      ...n.entities.value.map((p) => ({
        key: p.key,
        label: `${p.label} · ${l(p)}`
      }))
    ]), i = f(
      () => t.typeChooser === "always" || n.query.value.entity !== null
    );
    function o(p) {
      n.setEntity(p || null);
    }
    const c = f(
      () => (t.views ?? [...un]).map((p) => ({
        key: p,
        label: p === "record" ? n.recordView.value?.label ?? Tn.record : Tn[p],
        icon: bs[p]
      }))
    ), d = f(() => Ie(n.query.value.view, t.views)), v = f(() => c.value.length > 1);
    function _(p) {
      n.setView(p);
    }
    return (p, g) => i.value || v.value ? (u(), m("div", Rr, [
      i.value ? (u(), A(nn, {
        key: 0,
        class: "dc-actions__pick dc-actions__type",
        label: "Type",
        "model-value": w(n).query.value.entity ?? "",
        options: r.value,
        onOpen: w(s).refresh,
        onClose: w(s).cancel,
        "onUpdate:modelValue": o
      }, null, 8, ["model-value", "options", "onOpen", "onClose"])) : L("", !0),
      v.value ? (u(), A(nn, {
        key: 1,
        class: "dc-actions__pick dc-actions__view",
        label: "View",
        "model-value": d.value,
        options: c.value,
        "onUpdate:modelValue": _
      }, null, 8, ["model-value", "options"])) : L("", !0)
    ])) : L("", !0);
  }
}), qr = /* @__PURE__ */ j(Hr, [["__scopeId", "data-v-ac04b6df"]]);
function Fr(e, t) {
  if (!e) return null;
  const n = ue(e, t);
  return typeof n == "string" && n.trim() ? n : null;
}
const Vr = (e) => e == null || typeof e == "string" && !e.trim();
function Dr(e, t) {
  const n = pe(t, "state"), a = pe(t, "tint");
  return {
    identity: mt(pe(t, "identity"), e),
    reference: mt(pe(t, "reference"), e),
    metrics: ua(t, "metric").map((s) => ({
      column: s,
      label: s.label ?? "",
      text: Le(s, e)
    })),
    facts: t.filter((s) => s.cardLabel && !Vr(ue(s, e))).map((s) => ({
      column: s,
      label: s.cardLabel,
      title: [s.label, s.hint].filter(Boolean).join(" — "),
      text: Le(s, e)
    })),
    state: n ? ue(n, e) ?? null : null,
    updated: mt(pe(t, "updated"), e),
    image: Fr(pe(t, "image"), e),
    tint: a ? ue(a, e) ?? null : null
  };
}
function Va(e, t, n, a, s = !1) {
  const l = n?.columns ?? [];
  return {
    row: e,
    key: Ms(e, t),
    entityLabel: e.entityLabel,
    entity: n,
    columns: l,
    ordinal: hs(t),
    parts: Dr(e, l),
    pinned: a,
    selected: s
  };
}
function Be() {
  const e = ee(), t = f(
    () => new Map(e.entities.value.map((n) => [n.key, n]))
  );
  return f(
    () => e.rows.value.map(
      (n, a) => Va(
        n,
        e.offset.value + a,
        t.value.get(n.entityKey) ?? null,
        e.isPinned(n),
        e.isSelected(n)
      )
    )
  );
}
const Kr = ["data-dc-status", "data-dc-tone"], Wr = /* @__PURE__ */ z({
  __name: "StatusPill",
  props: {
    status: {},
    tone: {},
    label: {}
  },
  setup(e) {
    const t = e, n = f(() => t.label ?? t.status ?? "");
    return (a, s) => (u(), m("span", {
      class: "dc-pill",
      "data-dc-status": e.status,
      "data-dc-tone": e.tone
    }, E(n.value), 9, Kr));
  }
}), ze = /* @__PURE__ */ j(Wr, [["__scopeId", "data-v-686eb9b6"]]), zr = { key: 1 }, jr = /* @__PURE__ */ z({
  __name: "MetricDrill",
  props: {
    entry: {},
    column: {}
  },
  setup(e) {
    const t = e, n = ee(), a = f(() => !t.entry.entity?.scope || !t.column.drill ? null : n.entities.value.find((v) => v.key === t.column.drill) ?? null), s = f(() => !!t.column.click), l = f(() => t.column.label ?? ""), r = f(() => Le(t.column, t.entry.row)), i = f(() => s.value ? t.column.clickHref?.(t.entry.row) ?? null : a.value ? n.drillHref(t.entry.row, a.value, t.column.drillWhere) : null), o = f(() => a.value && !s.value ? `${l.value} of ${t.entry.parts.identity} — show the ${a.value.label.toLowerCase()}` : `${l.value} of ${t.entry.parts.identity}`);
    function c(d, v) {
      v.stopPropagation(), s.value ? t.column.click?.(t.entry.row, d) : a.value && n.drill(t.entry.row, a.value, d, t.column.drillWhere);
    }
    return (d, v) => a.value || s.value ? (u(), A(ae, {
      key: 0,
      class: "dc-drill",
      href: i.value,
      title: o.value,
      onPress: c
    }, {
      default: Y(() => [
        G(d.$slots, "default", {}, () => [
          Z(E(r.value), 1)
        ], !0)
      ]),
      _: 3
    }, 8, ["href", "title"])) : (u(), m("span", zr, [
      G(d.$slots, "default", {}, () => [
        Z(E(r.value), 1)
      ], !0)
    ]));
  }
}), dt = /* @__PURE__ */ j(jr, [["__scopeId", "data-v-bbbd334b"]]), Ur = ["data-dc-active", "aria-pressed", "aria-label"], Qr = /* @__PURE__ */ z({
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
    return (s, l) => (u(), m("button", {
      type: "button",
      class: "dc-star",
      "data-dc-active": e.pinned ? "true" : "false",
      "aria-pressed": e.pinned,
      "aria-label": e.pinned ? `Unpin ${e.name}` : `Pin ${e.name}`,
      onClick: a
    }, E(e.pinned ? "★" : "☆"), 9, Ur));
  }
}), wn = /* @__PURE__ */ j(Qr, [["__scopeId", "data-v-ef63d763"]]), Gr = ["src"], Yr = /* @__PURE__ */ z({
  __name: "RowPicture",
  props: {
    src: {}
  },
  setup(e) {
    const t = e, n = H(!1);
    return te(
      () => t.src,
      () => {
        n.value = !1;
      }
    ), (a, s) => e.src.trim() && !n.value ? (u(), m("img", {
      key: 0,
      class: "dc-picture",
      src: e.src,
      alt: "",
      loading: "lazy",
      decoding: "async",
      onError: s[0] || (s[0] = (l) => n.value = !0)
    }, null, 40, Gr)) : L("", !0);
  }
}), qt = /* @__PURE__ */ j(Yr, [["__scopeId", "data-v-afaab300"]]), Xr = ["data-dc-standing", "title", "aria-label"], Jr = /* @__PURE__ */ z({
  __name: "QueryMark",
  props: {
    entry: {}
  },
  setup(e) {
    const t = e, n = ee(), a = f(() => Bt(t.entry.entity, t.entry.row)), s = f(() => gn(n.query.value.expr, a.value)), l = f(
      () => s.value === "in" ? `The query narrows to ${t.entry.parts.identity} — press to lift that` : `The query leaves out ${t.entry.parts.identity} — press to lift that`
    );
    function r(i) {
      i.stopPropagation(), n.setExpression(Ea(n.query.value.expr, a.value));
    }
    return (i, o) => s.value ? (u(), m("button", {
      key: 0,
      type: "button",
      class: "dc-standing",
      "data-dc-standing": s.value,
      title: l.value,
      "aria-label": l.value,
      onClick: r
    }, E(s.value === "in" ? "+" : "−"), 9, Xr)) : L("", !0);
  }
}), kn = /* @__PURE__ */ j(Jr, [["__scopeId", "data-v-4b8d4166"]]), Zr = ["aria-label"], eo = ["data-dc-standing", "data-dc-active", "aria-checked", "title", "aria-label", "onClick"], to = /* @__PURE__ */ z({
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
    function r(i, o) {
      i.stopPropagation(), a("set", o);
    }
    return (i, o) => (u(), m("span", {
      class: "dc-standing-control",
      role: "radiogroup",
      "aria-label": `Where the query stands on ${e.name}`
    }, [
      (u(!0), m(W, null, X(s.value, (c) => (u(), m("button", {
        key: c.sign,
        type: "button",
        role: "radio",
        class: "dc-standing-control__choice",
        "data-dc-standing": c.standing ?? "none",
        "data-dc-active": l(c.standing) ? "true" : "false",
        "aria-checked": l(c.standing),
        title: c.hint,
        "aria-label": c.hint,
        onClick: (d) => r(d, c.standing)
      }, E(c.sign), 9, eo))), 128))
    ], 8, Zr));
  }
}), sn = /* @__PURE__ */ j(to, [["__scopeId", "data-v-5524dca6"]]), Da = /* @__PURE__ */ z({
  __name: "RowStanding",
  props: {
    entry: {}
  },
  setup(e) {
    const t = e, n = ee(), a = f(() => xa(t.entry.entity, t.entry.row)), s = f(() => gn(n.query.value.expr, a.value));
    function l(r) {
      n.setExpression(Jt(n.query.value.expr, a.value, r));
    }
    return (r, i) => a.value !== null ? (u(), A(sn, {
      key: 0,
      class: "dc-row-standing",
      standing: s.value,
      name: e.entry.parts.identity,
      onSet: l
    }, null, 8, ["standing", "name"])) : L("", !0);
  }
}), no = ["href", "title", "aria-label"], ao = /* @__PURE__ */ z({
  __name: "OpenMark",
  props: {
    entry: {}
  },
  setup(e) {
    const t = e, n = ee(), a = f(() => {
      const s = t.entry.row, l = n.recordHref?.(s) ?? null;
      return l ? n.pressHref(s) === l ? null : l : null;
    });
    return (s, l) => a.value ? (u(), m("a", {
      key: 0,
      class: "dc-open",
      href: a.value,
      target: "_blank",
      rel: "noopener noreferrer",
      title: a.value,
      "aria-label": `Open ${e.entry.parts.identity} in a new tab`,
      onClick: l[0] || (l[0] = Ae(() => {
      }, ["stop"]))
    }, "↗", 8, no)) : L("", !0);
  }
}), ft = /* @__PURE__ */ j(ao, [["__scopeId", "data-v-b00f390d"]]), so = /* @__PURE__ */ z({
  __name: "ScopeMark",
  props: {
    entry: {}
  },
  setup(e) {
    const t = e, n = ee(), a = f(
      () => n.narrowsOnPress.value ? null : t.entry.entity?.scope ?? null
    ), s = H(null);
    function l(d) {
      s.value = lt(d).exclude ? "out" : "in";
    }
    function r(d) {
      l(d), window.addEventListener("keydown", l), window.addEventListener("keyup", l);
    }
    function i() {
      s.value = null, window.removeEventListener("keydown", l), window.removeEventListener("keyup", l);
    }
    we(i);
    const o = f(() => a.value ? n.drillHref(t.entry.row, null) : null);
    function c(d, v) {
      v.stopPropagation(), n.drill(t.entry.row, null, d);
    }
    return (d, v) => a.value ? (u(), A(ae, {
      key: 0,
      class: "dc-scope",
      href: o.value,
      "data-dc-pending": s.value ?? void 0,
      title: `Narrow everything to ${a.value}: ${e.entry.row.id} — ⌥-click to leave it out`,
      "aria-label": `Narrow everything to ${e.entry.parts.identity}`,
      onPointerenter: r,
      onPointermove: l,
      onPointerleave: i,
      onPress: c
    }, {
      default: Y(() => [...v[0] || (v[0] = [
        Z(" → ", -1)
      ])]),
      _: 1
    }, 8, ["href", "data-dc-pending", "title", "aria-label"])) : L("", !0);
  }
}), vt = /* @__PURE__ */ j(so, [["__scopeId", "data-v-05d2c233"]]), lo = ["checked", "aria-label"], He = /* @__PURE__ */ z({
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
    return (s, l) => (u(), m("input", {
      class: "dc-tick",
      type: "checkbox",
      checked: e.selected,
      "aria-label": `Select ${e.name}`,
      onClick: a
    }, null, 8, lo));
  }
}), ro = { class: "dc-card__top dc-mono" }, oo = { class: "dc-card__lead" }, io = {
  key: 2,
  class: "dc-card__entity"
}, co = { class: "dc-card__top-right" }, uo = { class: "dc-card__names" }, fo = { class: "dc-card__primary" }, vo = {
  key: 0,
  class: "dc-card__secondary dc-mono"
}, po = {
  key: 1,
  class: "dc-card__facts dc-mono"
}, ho = ["title"], mo = { class: "dc-card__fact-label" }, yo = {
  key: 0,
  class: "dc-card__metrics dc-mono"
}, go = {
  key: 0,
  class: "dc-card__date"
}, _o = /* @__PURE__ */ z({
  __name: "CardsView",
  setup(e) {
    const t = ee(), n = Be(), a = f(() => t.isEverything.value), s = (r) => r.entity?.card === "picture", l = f(() => n.value.length > 0 && n.value.every(s));
    return (r, i) => (u(), m("div", {
      class: de(["dc-cards", { "dc-cards--pictures": l.value }])
    }, [
      (u(!0), m(W, null, X(w(n), (o) => (u(), m("div", {
        key: o.key,
        class: de(["dc-card", { "dc-card--picture": s(o) }])
      }, [
        S("div", ro, [
          S("span", oo, [
            w(t).selectable.value ? (u(), A(He, {
              key: 0,
              row: o.row,
              selected: o.selected,
              name: o.parts.identity
            }, null, 8, ["row", "selected", "name"])) : L("", !0),
            s(o) ? L("", !0) : (u(), m(W, { key: 1 }, [
              Z(E(o.ordinal), 1)
            ], 64)),
            a.value ? (u(), m("span", io, E(o.entityLabel), 1)) : L("", !0)
          ]),
          S("span", co, [
            o.parts.state && !s(o) ? (u(), A(ze, {
              key: 0,
              status: o.parts.state
            }, null, 8, ["status"])) : L("", !0),
            s(o) ? (u(), A(kn, {
              key: 1,
              entry: o
            }, null, 8, ["entry"])) : (u(), A(Da, {
              key: 2,
              entry: o
            }, null, 8, ["entry"])),
            Q(vt, { entry: o }, null, 8, ["entry"]),
            Q(ft, { entry: o }, null, 8, ["entry"]),
            w(t).pinnable.value ? (u(), A(wn, {
              key: 3,
              row: o.row,
              name: o.parts.identity,
              pinned: o.pinned
            }, null, 8, ["row", "name", "pinned"])) : L("", !0)
          ])
        ]),
        Q(ae, {
          class: "dc-card__open",
          href: w(t).pressHref(o.row),
          onPress: (c) => w(t).activate(o.row, c)
        }, {
          default: Y(() => [
            o.parts.image ? (u(), A(qt, {
              key: 0,
              class: "dc-card__image",
              src: o.parts.image
            }, null, 8, ["src"])) : L("", !0),
            S("span", uo, [
              S("span", fo, E(o.parts.identity), 1),
              s(o) ? L("", !0) : (u(), m("span", vo, E(o.parts.reference), 1)),
              o.parts.facts.length ? (u(), m("span", po, [
                (u(!0), m(W, null, X(o.parts.facts, (c) => (u(), m("span", {
                  key: c.column.key ?? c.label,
                  class: "dc-card__fact",
                  title: c.title || void 0
                }, [
                  S("span", mo, E(c.label), 1),
                  Z(" " + E(c.text), 1)
                ], 8, ho))), 128))
              ])) : L("", !0)
            ])
          ]),
          _: 2
        }, 1032, ["href", "onPress"]),
        s(o) ? L("", !0) : (u(), m("div", yo, [
          (u(!0), m(W, null, X(o.parts.metrics.slice(0, 2), (c) => (u(), A(dt, {
            key: c.column.key ?? c.label,
            entry: o,
            column: c.column
          }, {
            default: Y(() => [
              Z(E(c.label) + " " + E(c.text), 1)
            ]),
            _: 2
          }, 1032, ["entry", "column"]))), 128)),
          o.parts.updated ? (u(), m("span", go, E(o.parts.updated), 1)) : L("", !0)
        ]))
      ], 2))), 128))
    ], 2));
  }
}), Ka = /* @__PURE__ */ j(_o, [["__scopeId", "data-v-fd252138"]]), wo = { class: "dc-grid" }, ko = { class: "dc-tile__scrim" }, bo = { class: "dc-tile__top dc-mono" }, $o = { class: "dc-tile__chip" }, xo = { class: "dc-tile__caption" }, So = { class: "dc-tile__secondary dc-truncate" }, Co = { class: "dc-tile__primary" }, Po = /* @__PURE__ */ z({
  __name: "GridView",
  setup(e) {
    const t = ee(), n = Be();
    return (a, s) => (u(), m("div", wo, [
      (u(!0), m(W, null, X(w(n), (l) => (u(), m("div", {
        key: l.key,
        class: "dc-grid__cell"
      }, [
        Q(ae, {
          class: "dc-tile",
          style: le({ "--dc-tile-tint": l.parts.tint ?? void 0 }),
          href: w(t).pressHref(l.row),
          onPress: (r) => w(t).activate(l.row, r)
        }, {
          default: Y(() => [
            l.parts.image ? (u(), A(qt, {
              key: 0,
              class: "dc-tile__image",
              src: l.parts.image
            }, null, 8, ["src"])) : L("", !0),
            S("span", ko, [
              S("span", bo, [
                S("span", $o, E(l.ordinal), 1)
              ]),
              S("span", xo, [
                S("span", So, E(l.parts.reference), 1),
                S("span", Co, E(l.parts.identity), 1)
              ])
            ])
          ]),
          _: 2
        }, 1032, ["style", "href", "onPress"]),
        w(t).selectable.value ? (u(), A(He, {
          key: 0,
          class: "dc-grid__tick",
          row: l.row,
          selected: l.selected,
          name: l.parts.identity
        }, null, 8, ["row", "selected", "name"])) : L("", !0)
      ]))), 128))
    ]));
  }
}), Wa = /* @__PURE__ */ j(Po, [["__scopeId", "data-v-89c40a9e"]]);
function Yn(e, t, n, a) {
  return (n - a * (t - 1)) / e;
}
function jt(e, t) {
  return e > 0 ? Math.min(t, e) : t;
}
function Eo(e) {
  return e > 0 ? e : 1 / 0;
}
function Mo(e, t, n) {
  const { width: a, height: s, gap: l = 0 } = n;
  if (!e.length) return [];
  if (!(a > 0) || !(s > 0)) return [{ items: [...e], height: s, filled: !1 }];
  const r = [];
  let i = [], o = 0, c = 0;
  for (const d of e) {
    const v = t(d), _ = Math.max(v.ratio, Number.EPSILON), p = v.height && v.height > 0 ? Math.max(c, v.height) : c, g = jt(p, s), h = Yn(o + _, i.length + 1, a, l);
    if (h > g) {
      i.push(d), o += _, c = p;
      continue;
    }
    const b = jt(c, s), P = i.length ? Yn(o, i.length, a, l) : 1 / 0;
    P <= Eo(c) && P - b < g - h ? (r.push({ items: i, height: P, filled: !0 }), i = [d], o = _, c = v.height && v.height > 0 ? v.height : 0) : (r.push({ items: [...i, d], height: h, filled: !0 }), i = [], o = 0, c = 0);
  }
  return i.length && r.push({ items: i, height: jt(c, s), filled: !1 }), r;
}
const Lo = { class: "dc-images" }, To = {
  key: 1,
  class: "dc-images__blank",
  "aria-hidden": "true"
}, Oo = 240, ht = 8, No = 1, Ao = /* @__PURE__ */ z({
  __name: "ImagesView",
  setup(e) {
    const t = ee(), n = Be(), a = Cn(/* @__PURE__ */ new Map()), s = Cn(/* @__PURE__ */ new Set());
    function l(g, h) {
      const b = h.target;
      b.naturalWidth > 0 && b.naturalHeight > 0 && a.set(g, { width: b.naturalWidth, height: b.naturalHeight });
    }
    function r(g) {
      const h = g.parts.image;
      return h && !s.has(h) ? h : null;
    }
    function i(g) {
      const h = r(g);
      return h ? a.get(h) : void 0;
    }
    function o(g) {
      const h = i(g);
      return h ? { ratio: h.width / h.height, height: h.height } : { ratio: No };
    }
    const c = H(null), d = H(0);
    let v = null;
    function _() {
      d.value = c.value?.clientWidth ?? 0;
    }
    ct(() => {
      _(), !(!c.value || typeof ResizeObserver > "u") && (v = new ResizeObserver(_), v.observe(c.value));
    }), we(() => {
      v?.disconnect(), v = null;
    });
    const p = f(() => {
      const g = Mo(n.value, o, {
        width: d.value,
        height: Oo,
        gap: ht
      }), h = [];
      let b = 0;
      for (const P of g) {
        let $ = 0;
        for (const y of P.items) {
          const k = o(y).ratio * P.height, T = i(y), F = T !== void 0 && T.height < P.height;
          h.push({
            entry: y,
            style: {
              top: `${b}px`,
              left: `${$}px`,
              width: `${k}px`,
              height: `${P.height}px`
            },
            picture: F ? { width: `${T.width}px`, height: `${T.height}px` } : { width: "100%", height: "100%" }
          }), $ += k + ht;
        }
        b += P.height + ht;
      }
      return { boxes: h, height: g.length ? b - ht : 0 };
    });
    return (g, h) => (u(), m("div", Lo, [
      S("div", {
        ref_key: "wall",
        ref: c,
        class: "dc-images__wall",
        style: le({ height: `${p.value.height}px` })
      }, [
        (u(!0), m(W, null, X(p.value.boxes, ({ entry: b, style: P, picture: $ }) => (u(), m("div", {
          key: b.key,
          class: "dc-images__cell",
          style: le(P)
        }, [
          Q(ae, {
            class: "dc-images__open",
            title: b.parts.identity,
            "aria-label": b.parts.identity,
            href: w(t).pressHref(b.row),
            onPress: (y) => w(t).activate(b.row, y)
          }, {
            default: Y(() => [
              r(b) ? (u(), A(qt, {
                key: 0,
                class: "dc-images__picture",
                style: le($),
                src: r(b),
                onLoad: (y) => l(r(b), y),
                onError: (y) => s.add(r(b))
              }, null, 8, ["style", "src", "onLoad", "onError"])) : (u(), m("span", To, E(b.parts.identity), 1))
            ]),
            _: 2
          }, 1032, ["title", "aria-label", "href", "onPress"]),
          w(t).selectable.value ? (u(), A(He, {
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
}), za = /* @__PURE__ */ j(Ao, [["__scopeId", "data-v-2d267370"]]), Io = { class: "dc-links" }, Ro = { class: "dc-link__primary dc-truncate" }, Bo = { class: "dc-link__secondary dc-mono dc-truncate" }, Ho = /* @__PURE__ */ z({
  __name: "LinksView",
  setup(e) {
    const t = ee(), n = Be();
    return (a, s) => (u(), m("div", Io, [
      (u(!0), m(W, null, X(w(n), (l) => (u(), m("span", {
        key: l.key,
        class: "dc-links__item"
      }, [
        w(t).selectable.value ? (u(), A(He, {
          key: 0,
          row: l.row,
          selected: l.selected,
          name: l.parts.identity
        }, null, 8, ["row", "selected", "name"])) : L("", !0),
        Q(ae, {
          class: "dc-link",
          href: w(t).pressHref(l.row),
          onPress: (r) => w(t).activate(l.row, r)
        }, {
          default: Y(() => [
            S("span", Ro, E(l.parts.identity), 1),
            S("span", Bo, E(l.parts.reference), 1)
          ]),
          _: 2
        }, 1032, ["href", "onPress"])
      ]))), 128))
    ]));
  }
}), ja = /* @__PURE__ */ j(Ho, [["__scopeId", "data-v-de6c9a0f"]]), qo = {
  class: "dc-list",
  role: "list"
}, Fo = { class: "dc-list__ordinal dc-mono" }, Vo = { class: "dc-list__identity" }, Do = ["title"], Ko = ["title"], Wo = {
  key: 1,
  class: "dc-list__entity dc-mono"
}, zo = { class: "dc-list__metrics dc-mono" }, jo = { class: "dc-list__trailing" }, Uo = /* @__PURE__ */ z({
  __name: "ListView",
  setup(e) {
    const t = ee(), n = Be(), a = f(() => t.isEverything.value);
    return (s, l) => (u(), m("div", qo, [
      (u(!0), m(W, null, X(w(n), (r) => (u(), m("div", {
        key: r.key,
        class: "dc-list__row",
        role: "listitem"
      }, [
        w(t).selectable.value ? (u(), A(He, {
          key: 0,
          class: "dc-list__tick",
          row: r.row,
          selected: r.selected,
          name: r.parts.identity
        }, null, 8, ["row", "selected", "name"])) : L("", !0),
        Q(Da, {
          class: "dc-list__standing",
          entry: r
        }, null, 8, ["entry"]),
        Q(ae, {
          class: "dc-list__open",
          href: w(t).pressHref(r.row),
          onPress: (i) => w(t).activate(r.row, i)
        }, {
          default: Y(() => [
            S("span", Fo, E(r.ordinal), 1),
            S("span", Vo, [
              S("span", {
                class: "dc-list__primary dc-truncate",
                title: r.parts.identity
              }, E(r.parts.identity), 9, Do),
              S("span", {
                class: "dc-list__secondary dc-mono dc-truncate",
                title: r.parts.reference || void 0
              }, E(r.parts.reference), 9, Ko)
            ])
          ]),
          _: 2
        }, 1032, ["href", "onPress"]),
        a.value ? (u(), m("span", Wo, E(r.entityLabel), 1)) : L("", !0),
        S("span", zo, [
          (u(!0), m(W, null, X(r.parts.metrics.slice(0, 2), (i) => (u(), A(dt, {
            key: i.column.key ?? i.label,
            entry: r,
            column: i.column
          }, null, 8, ["entry", "column"]))), 128))
        ]),
        S("span", jo, [
          r.parts.state ? (u(), A(ze, {
            key: 0,
            status: r.parts.state
          }, null, 8, ["status"])) : L("", !0),
          Q(vt, { entry: r }, null, 8, ["entry"]),
          Q(ft, { entry: r }, null, 8, ["entry"]),
          w(t).pinnable.value ? (u(), A(wn, {
            key: 1,
            row: r.row,
            name: r.parts.identity,
            pinned: r.pinned
          }, null, 8, ["row", "name", "pinned"])) : L("", !0)
        ])
      ]))), 128))
    ]));
  }
}), ln = /* @__PURE__ */ j(Uo, [["__scopeId", "data-v-a2cb9c3f"]]), Qo = { class: "dc-preview" }, Go = { class: "dc-preview__pager dc-mono" }, Yo = ["disabled"], Xo = { "aria-live": "polite" }, Jo = ["disabled"], Zo = {
  key: 0,
  class: "dc-preview__card"
}, ei = ["src"], ti = { class: "dc-preview__body" }, ni = { class: "dc-preview__top" }, ai = { class: "dc-preview__badges" }, si = { class: "dc-preview__entity dc-mono" }, li = { class: "dc-preview__marks" }, ri = { class: "dc-preview__primary" }, oi = { class: "dc-preview__secondary dc-mono" }, ii = { class: "dc-preview__fields" }, ci = { class: "dc-preview__key" }, ui = { class: "dc-preview__value dc-mono" }, di = /* @__PURE__ */ z({
  __name: "PreviewView",
  setup(e) {
    const t = ee(), n = Be(), a = H(0);
    te(n, (o) => {
      a.value > o.length - 1 && (a.value = Math.max(0, o.length - 1));
    });
    const s = f(() => n.value[a.value]), l = f(() => {
      const o = s.value;
      if (!o) return [];
      const c = pe(o.columns, "reference"), d = pe(o.columns, "updated");
      return [
        ...c ? [{ key: c.label ?? "Reference", value: o.parts.reference, column: null }] : [],
        ...o.parts.metrics.map((v) => ({
          key: v.label,
          value: v.text,
          column: v.column
        })),
        ...d ? [{ key: d.label ?? "Updated", value: o.parts.updated, column: null }] : []
      ];
    }), r = f(() => {
      if (!n.value.length) return "0 / 0";
      const o = t.total.value > n.value.length ? ` of ${t.total.value}` : "";
      return `${a.value + 1} / ${n.value.length}${o}`;
    }), i = (o) => {
      const c = n.value.length;
      c && (a.value = Math.min(c - 1, Math.max(0, a.value + o)));
    };
    return (o, c) => (u(), m("div", Qo, [
      S("div", Go, [
        S("button", {
          type: "button",
          class: "dc-preview__step",
          "aria-label": "Previous result",
          disabled: a.value === 0,
          onClick: c[0] || (c[0] = (d) => i(-1))
        }, " ‹ ", 8, Yo),
        S("span", Xo, E(r.value), 1),
        S("button", {
          type: "button",
          class: "dc-preview__step",
          "aria-label": "Next result",
          disabled: a.value >= w(n).length - 1,
          onClick: c[1] || (c[1] = (d) => i(1))
        }, " › ", 8, Jo)
      ]),
      s.value ? (u(), m("div", Zo, [
        S("div", {
          class: "dc-preview__media",
          style: le({ background: s.value.parts.tint ?? void 0 }),
          "aria-hidden": "true"
        }, [
          s.value.parts.image ? (u(), m("img", {
            key: 0,
            class: "dc-preview__image",
            src: s.value.parts.image,
            alt: ""
          }, null, 8, ei)) : (u(), m(W, { key: 1 }, [
            Z(" preview ")
          ], 64))
        ], 4),
        S("div", ti, [
          S("div", ni, [
            S("span", ai, [
              w(t).selectable.value ? (u(), A(He, {
                key: 0,
                row: s.value.row,
                selected: s.value.selected,
                name: s.value.parts.identity
              }, null, 8, ["row", "selected", "name"])) : L("", !0),
              s.value.parts.state ? (u(), A(ze, {
                key: 1,
                status: s.value.parts.state
              }, null, 8, ["status"])) : L("", !0),
              S("span", si, E(s.value.entityLabel), 1)
            ]),
            S("span", li, [
              Q(kn, { entry: s.value }, null, 8, ["entry"]),
              Q(vt, { entry: s.value }, null, 8, ["entry"]),
              Q(ft, { entry: s.value }, null, 8, ["entry"]),
              w(t).pinnable.value ? (u(), A(wn, {
                key: 0,
                row: s.value.row,
                name: s.value.parts.identity,
                pinned: s.value.pinned
              }, null, 8, ["row", "name", "pinned"])) : L("", !0)
            ])
          ]),
          S("div", null, [
            S("div", ri, E(s.value.parts.identity), 1),
            S("div", oi, E(s.value.parts.reference), 1)
          ]),
          S("dl", ii, [
            (u(!0), m(W, null, X(l.value, (d) => (u(), m("div", {
              key: d.key,
              class: "dc-preview__field"
            }, [
              S("dt", ci, E(d.key), 1),
              S("dd", ui, [
                d.column && s.value ? (u(), A(dt, {
                  key: 0,
                  entry: s.value,
                  column: d.column
                }, null, 8, ["entry", "column"])) : (u(), m(W, { key: 1 }, [
                  Z(E(d.value), 1)
                ], 64))
              ])
            ]))), 128))
          ]),
          Q(ae, {
            class: "dc-preview__open",
            href: s.value ? w(t).pressHref(s.value.row) : null,
            onPress: c[2] || (c[2] = (d) => s.value && w(t).activate(s.value.row, d))
          }, {
            default: Y(() => [...c[3] || (c[3] = [
              Z(" Open record → ", -1)
            ])]),
            _: 1
          }, 8, ["href"])
        ])
      ])) : L("", !0)
    ]));
  }
}), Ua = /* @__PURE__ */ j(di, [["__scopeId", "data-v-59e0d33b"]]);
function fi(e) {
  const t = re(e);
  if (t.length !== 1) return /* @__PURE__ */ new Set();
  const n = /* @__PURE__ */ new Map();
  for (const a of t[0]) {
    if (a.kind !== "field" || a.negated || Ke(a) || a.comparator !== "=" && a.comparator !== ":") continue;
    const s = a.field.toLowerCase();
    n.set(s, [...n.get(s) ?? [], a]);
  }
  return new Set(
    [...n].flatMap(
      ([a, s]) => s.length === 1 && s[0].comparator === "=" ? [a] : []
    )
  );
}
function vi(e, t, n) {
  const a = fi(t);
  return a.size ? e.filter((s) => {
    const l = (s.key ?? s.field)?.toLowerCase();
    return l === void 0 || !a.has(l) || s.role === "identity" || n.some((r) => Array.isArray(ue(s, r))) ? !0 : new Set(n.map((r) => Le(s, r))).size > 1;
  }) : e;
}
function pi() {
  const e = ee();
  return f(
    () => vi(
      Ps(e.schema.value, e.entity.value),
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
function Qa(e, t) {
  const n = e.narrowsOnPress.value ? Bt(t.entity, t.row) : null;
  return n ? { term: n, name: t.parts.identity, alone: t.entity?.narrowsAlone === !0 } : null;
}
const hi = /* @__PURE__ */ z({
  __name: "CellNarrow",
  props: {
    entry: {},
    column: {},
    narrowings: {},
    truncates: { type: Boolean }
  },
  setup(e) {
    const t = e, n = ee(), a = f(() => Le(t.column, t.entry.row));
    function s(v, _ = !1) {
      return v.entity !== void 0 ? `entity:${v.entity}` : _e({ ...v.term, ..._ ? { negated: !0 } : {} });
    }
    function l(v, _ = !1) {
      return v.entity !== void 0 ? n.query.value.expr : st(n.query.value.expr, s(v, _));
    }
    function r(v) {
      return v.entity ?? n.query.value.entity;
    }
    function i(v) {
      return n.narrowHref(l(v), r(v));
    }
    function o(v) {
      return v.entity !== void 0 ? `Show ${n.schema.value.entities.find((p) => p.key === v.entity)?.label ?? a.value} only` : `Narrow to ${s(v)}
⌥-press to leave these out`;
    }
    function c(v) {
      return v.entity !== void 0 ? null : { term: s(v) };
    }
    function d(v, _, p) {
      p.stopPropagation(), n.narrow(l(v, _.exclude), r(v));
    }
    return (v, _) => (u(), m("span", {
      class: de(["dc-cell__text", { "dc-truncate": e.truncates }])
    }, [
      (u(!0), m(W, null, X(e.narrowings, (p, g) => (u(), m(W, {
        key: s(p)
      }, [
        g > 0 ? (u(), m(W, { key: 0 }, [
          Z(", ")
        ], 64)) : L("", !0),
        Q(ae, De({
          class: "dc-narrow",
          href: i(p),
          title: o(p),
          selectable: ""
        }, cn(w(bn)(w(n), c(p))), {
          onPress: (h, b) => d(p, h, b)
        }), {
          default: Y(() => [
            G(v.$slots, "default", {}, () => [
              Z(E(p.label ?? a.value), 1)
            ], !0)
          ]),
          _: 2
        }, 1040, ["href", "title", "onPress"])
      ], 64))), 128))
    ], 2));
  }
}), Xn = /* @__PURE__ */ j(hi, [["__scopeId", "data-v-6e649daa"]]), mi = /* @__PURE__ */ new Set(["entitykey", "entitylabel"]), yi = /* @__PURE__ */ new Set(["ordinal", "image", "component", "date"]), gi = 4;
function Ga(e) {
  return (e.field ?? e.key)?.toLowerCase();
}
function Ya(e) {
  return e.narrow === !1 || e.role === "identity" || e.activate || e.click || e.drill ? !1 : !yi.has(e.kind ?? "text") && Ga(e) !== void 0;
}
function _i(e, t) {
  if (Number.isInteger(e)) return e;
  const n = 10 ** gi;
  return (t ? Math.ceil(e * n - 1e-6) : Math.floor(e * n + 1e-6)) / n;
}
function wi(e, t) {
  let n = 1 / 0, a = -1 / 0;
  for (const s of t) {
    const l = ue(e, s);
    typeof l != "number" || !Number.isFinite(l) || (l < n && (n = l), l > a && (a = l));
  }
  return n <= a ? { min: n, max: a } : null;
}
function ki(e, t, n, a = null) {
  if (!Ya(e)) return [];
  const s = Ga(e);
  if (mi.has(s) && !e.value)
    return t.entityKey ? [{ label: null, entity: t.entityKey }] : [];
  if (e.flags)
    return Object.entries(e.flags).filter(([o]) => t.fields[o] === !0).map(([o, c]) => ({
      label: c,
      term: { kind: "field", field: o.toLowerCase(), comparator: ":", value: "true" }
    }));
  const l = ue(e, t), r = n?.facets.find((o) => o.key.toLowerCase() === s);
  if (typeof l == "number") {
    if (!Number.isFinite(l)) return [];
    const o = r?.kind === "range" ? { min: r.min, max: r.max } : a, c = e.narrow === "<=" || e.narrow !== ">=" && (!o || l - o.min <= o.max - l);
    return [{
      label: null,
      term: { kind: "field", field: s, comparator: c ? "<=" : ">=", value: String(_i(l, c)) }
    }];
  }
  return (Array.isArray(l) ? l : [l]).filter(
    (o) => typeof o == "string" && o !== ""
  ).map((o) => ({
    label: Array.isArray(l) ? o : null,
    term: { kind: "field", field: s, comparator: "=", value: o }
  }));
}
const Jn = /* @__PURE__ */ new WeakMap();
function bi(e, t) {
  let n = Jn.get(e);
  return n || Jn.set(e, n = /* @__PURE__ */ new Map()), n.has(t) || n.set(t, wi(t, e)), n.get(t);
}
const $i = /* @__PURE__ */ z({
  __name: "ColumnCell",
  props: {
    column: {},
    entry: {}
  },
  setup(e) {
    const t = e, n = ee(), a = f(() => t.column.kind ?? "text"), s = f(() => ue(t.column, t.entry.row)), l = f(
      () => a.value === "ordinal" ? t.entry.ordinal : Le(t.column, t.entry.row)
    ), r = f(() => s.value), i = f(() => t.column.activate === !0 || !!t.column.click), o = f(() => Xt(t.column)), c = f(() => da(t.column, t.entry.row)), d = f(() => {
      if (!Ya(t.column)) return [];
      const g = typeof s.value == "number" ? bi(n.rows.value, t.column) : null;
      return ki(t.column, t.entry.row, t.entry.entity ?? null, g);
    });
    function v(g) {
      i.value && (g.stopPropagation(), _(lt(g)));
    }
    function _(g) {
      t.column.click?.(t.entry.row, g), t.column.activate && n.activate(t.entry.row, g);
    }
    const p = f(() => t.column.click ? t.column.clickHref?.(t.entry.row) ?? null : t.column.activate ? n.pressHref(t.entry.row) : null);
    return (g, h) => a.value === "component" && e.column.component ? (u(), A(Je(e.column.component), {
      key: 0,
      row: e.entry.row,
      entry: e.entry,
      value: s.value,
      column: e.column
    }, null, 8, ["row", "entry", "value", "column"])) : a.value === "status" && d.value.length ? (u(), A(Xn, {
      key: 1,
      entry: e.entry,
      column: e.column,
      narrowings: d.value,
      truncates: !1
    }, {
      default: Y(() => [
        Q(ze, { status: r.value }, null, 8, ["status"])
      ]),
      _: 1
    }, 8, ["entry", "column", "narrowings"])) : a.value === "status" ? (u(), A(ze, {
      key: 2,
      status: r.value
    }, null, 8, ["status"])) : a.value === "image" ? (u(), A(qt, {
      key: 3,
      class: "dc-cell__image",
      src: typeof s.value == "string" ? s.value : "",
      style: le({ maxHeight: e.column.height }),
      onClick: v
    }, null, 8, ["src", "style"])) : e.column.drill || e.column.click && e.column.role === "metric" ? (u(), A(dt, {
      key: 4,
      entry: e.entry,
      column: e.column
    }, null, 8, ["entry", "column"])) : i.value ? (u(), A(ae, De({
      key: 5,
      class: ["dc-table__open", { "dc-truncate": o.value }],
      href: p.value,
      title: c.value
    }, cn(e.column.activate ? w(bn)(w(n), w(Qa)(w(n), e.entry)) : {}), {
      onPress: h[0] || (h[0] = (b, P) => {
        P.stopPropagation(), _(b);
      })
    }), {
      default: Y(() => [
        Z(E(l.value), 1)
      ]),
      _: 1
    }, 16, ["class", "href", "title"])) : d.value.length ? (u(), A(Xn, {
      key: 6,
      entry: e.entry,
      column: e.column,
      narrowings: d.value,
      truncates: o.value
    }, null, 8, ["entry", "column", "narrowings", "truncates"])) : (u(), m("span", {
      key: 7,
      class: de(["dc-cell__text", { "dc-truncate": o.value }])
    }, E(l.value), 3));
  }
}), Zn = /* @__PURE__ */ j($i, [["__scopeId", "data-v-d07057a1"]]), xi = {
  key: 0,
  class: "dc-table__none"
}, Si = { class: "dc-table__detail" }, Ci = ["data-dc-wrap", "data-dc-row-links"], Pi = { "data-dc-stuck": "" }, Ei = {
  key: 0,
  class: "dc-table__pick",
  scope: "col"
}, Mi = {
  key: 1,
  class: "dc-table__standing",
  scope: "col"
}, Li = ["data-dc-align", "data-dc-hide", "aria-sort", "title"], Ti = {
  key: 2,
  class: "dc-table__head"
}, Oi = { "data-dc-scroll": "" }, Ni = ["onClick"], Ai = {
  key: 0,
  class: "dc-table__pick"
}, Ii = {
  key: 1,
  class: "dc-table__standing"
}, Ri = ["data-dc-align", "data-dc-hide", "title"], Bi = {
  key: 1,
  class: "dc-table__name"
}, Hi = /* @__PURE__ */ z({
  __name: "TableView",
  setup(e) {
    const t = ee(), n = Be(), a = pi();
    function s(M, U) {
      if (!t.rowLinks?.value || Ma()) return;
      const O = t.pressHref(M);
      if (O && en(U)) {
        Zt(O, U);
        return;
      }
      t.activate(M, lt(U));
    }
    const l = f(() => t.rowLinks?.value ? new Map(n.value.map((M) => [M.key, t.pressHref(M.row)])) : /* @__PURE__ */ new Map()), r = f(
      () => a.value.find((M) => M.role === "identity") ?? a.value[0]
    );
    function i(M, U, O) {
      O.stopPropagation(), t.activate(M, U);
    }
    function o(M) {
      const U = ma(M, t.entity.value, t.schema.value), O = U ? `Shortcut: ${U}` : void 0;
      return [M.hint, O].filter(Boolean).join(`
`) || void 0;
    }
    const c = f(() => {
      const M = a.value.find((O) => O.scope);
      return M || ((t.entity.value ? !!t.entity.value.href : t.entities.value.some((O) => O.href)) ? a.value.find((O) => O.activate) : void 0);
    }), d = f(() => {
      const M = (U) => !!U.scope && U.standing !== !1;
      return t.entity.value ? M(t.entity.value) : t.entities.value.some(M);
    }), v = (M) => xa(M.entity, M.row), _ = (M) => gn(t.query.value.expr, v(M));
    function p(M, U) {
      t.setExpression(Jt(t.query.value.expr, v(M), U));
    }
    const g = f(() => {
      const M = n.value.filter((O) => v(O) !== null), U = M.filter((O) => O.selected);
      return U.length ? U : M;
    }), h = f(() => g.value.some((M) => M.selected)), b = f(() => {
      const M = g.value[0];
      return M ? _(M) : null;
    }), P = f(
      () => g.value.some((M) => _(M) !== b.value)
    ), $ = f(
      () => h.value ? "the ticked rows" : "every row on this page"
    );
    function y(M) {
      t.setExpression(
        g.value.reduce(
          (U, O) => Jt(U, v(O), M),
          t.query.value.expr
        )
      );
    }
    const k = f(
      () => a.value.some((M) => M.kind === "image" || M.height !== void 0)
    );
    function T(M) {
      M && (t.query.value.sort === M ? t.toggleDirection() : t.setSort(M));
    }
    function F(M) {
      return M ? t.query.value.sort === M ? t.hrefFor({ dir: t.query.value.dir === "desc" ? "asc" : "desc" }) : t.hrefFor({ sort: M }) : null;
    }
    const ce = f(() => t.entity.value?.label ?? "The result set"), I = f(() => new Set(t.sorts.value.map((M) => M.key))), B = (M) => M.sort !== void 0 && I.value.has(M.sort), q = (M) => {
      if (B(M))
        return t.query.value.sort !== M.sort ? "none" : t.query.value.dir === "desc" ? "descending" : "ascending";
    };
    function ie(M) {
      return [
        An(M),
        M.muted ? "dc-table__muted" : "",
        M.mono ? "dc-mono" : "",
        Xt(M) ? "dc-truncate" : ""
      ].filter(Boolean).join(" ");
    }
    function oe(M, U) {
      if (!(!Xt(M) || M.activate || M.click))
        return da(M, U.row);
    }
    const se = f(
      () => a.value.length + (t.selectable.value ? 1 : 0) + (d.value ? 1 : 0)
    );
    return (M, U) => w(a).length ? (u(), m("table", {
      key: 1,
      class: "dc-table",
      "data-dc-wrap": k.value ? "" : void 0,
      "data-dc-row-links": w(t).rowLinks?.value ? "" : void 0,
      style: le({ "--dc-table-tracks": se.value })
    }, [
      S("thead", Pi, [
        S("tr", null, [
          w(t).selectable.value ? (u(), m("th", Ei, [
            Q(Fa)
          ])) : L("", !0),
          d.value ? (u(), m("th", Mi, [
            g.value.length ? (u(), A(sn, {
              key: 0,
              standing: b.value,
              mixed: P.value,
              name: $.value,
              onSet: y
            }, null, 8, ["standing", "mixed", "name"])) : L("", !0)
          ])) : L("", !0),
          (u(!0), m(W, null, X(w(a), (O, J) => (u(), m("th", {
            key: w(On)(O, J),
            scope: "col",
            class: de(w(An)(O)),
            style: le({ width: O.width }),
            "data-dc-align": w(Nn)(O),
            "data-dc-hide": O.hideBelow,
            "aria-sort": q(O),
            title: o(O)
          }, [
            B(O) ? (u(), A(ae, {
              key: 0,
              class: "dc-table__sort",
              href: F(O.sort),
              onPress: (ne) => T(O.sort)
            }, {
              default: Y(() => [
                Z(E(O.label), 1)
              ]),
              _: 2
            }, 1032, ["href", "onPress"])) : (u(), m(W, { key: 1 }, [
              Z(E(O.label), 1)
            ], 64)),
            O.header ? (u(), m("span", Ti, [
              (u(), A(Je(O.header), {
                column: O,
                entity: w(t).entity.value
              }, null, 8, ["column", "entity"]))
            ])) : L("", !0)
          ], 14, Li))), 128))
        ])
      ]),
      S("tbody", Oi, [
        (u(!0), m(W, null, X(w(n), (O) => (u(), m("tr", {
          key: O.key,
          class: "dc-table__row",
          onClick: (J) => s(O.row, J)
        }, [
          w(t).selectable.value ? (u(), m("td", Ai, [
            Q(He, {
              row: O.row,
              selected: O.selected,
              name: O.parts.identity
            }, null, 8, ["row", "selected", "name"])
          ])) : L("", !0),
          d.value ? (u(), m("td", Ii, [
            v(O) !== null ? (u(), A(sn, {
              key: 0,
              standing: _(O),
              name: O.parts.identity,
              onSet: (J) => p(O, J)
            }, null, 8, ["standing", "name", "onSet"])) : L("", !0)
          ])) : L("", !0),
          (u(!0), m(W, null, X(w(a), (J, ne) => (u(), m("td", {
            key: w(On)(J, ne),
            class: de(ie(J)),
            style: le({ width: J.width }),
            "data-dc-align": w(Nn)(J),
            "data-dc-hide": J.hideBelow,
            title: oe(J, O)
          }, [
            l.value.get(O.key) ? (u(), A(ae, De({
              key: 0,
              class: "dc-table__cell-link",
              href: l.value.get(O.key),
              tabindex: J === r.value ? void 0 : -1,
              "aria-hidden": J === r.value ? void 0 : "true",
              "aria-label": J === r.value ? O.parts.identity : void 0
            }, cn(w(bn)(w(t), w(Qa)(w(t), O))), {
              onPress: (ye, ve) => i(O.row, ye, ve)
            }), null, 16, ["href", "tabindex", "aria-hidden", "aria-label", "onPress"])) : L("", !0),
            J === c.value ? (u(), m("span", Bi, [
              Q(Zn, {
                column: J,
                entry: O
              }, null, 8, ["column", "entry"]),
              Q(vt, { entry: O }, null, 8, ["entry"]),
              Q(ft, { entry: O }, null, 8, ["entry"])
            ])) : (u(), A(Zn, {
              key: 2,
              column: J,
              entry: O
            }, null, 8, ["column", "entry"]))
          ], 14, Ri))), 128))
        ], 8, Ni))), 128))
      ])
    ], 12, Ci)) : (u(), m("p", xi, [
      U[2] || (U[2] = S("span", { class: "dc-table__headline" }, "No columns declared", -1)),
      S("span", Si, [
        Z(E(ce.value) + " has no ", 1),
        U[0] || (U[0] = S("code", null, "columns", -1)),
        U[1] || (U[1] = Z(" in the schema, so there is no table to draw. ", -1))
      ])
    ]));
  }
}), Xa = /* @__PURE__ */ j(Hi, [["__scopeId", "data-v-9945aecc"]]);
function qi(e) {
  const t = me([]), n = H(!1), a = me(null);
  let s = 0;
  const l = (o, c, d, v, _) => ({
    entity: o,
    rows: e.limit.value > 0 ? c.rows.map((p, g) => Va(p, g, o, e.isPinned(p.id))) : [],
    total: c.total,
    count: d ? Yt(o) : Ze(c.total),
    pinned: Fi(v, c, _)
  }), r = () => {
    const o = ++s, c = e.query.value, d = e.schema.value, v = e.entities.value, _ = e.limit.value, p = e.within?.value.trim() ?? "", g = dn(c) && !p, h = p ? pn(p, c.expr) : c.expr, b = v.map((P) => ({
      entity: P,
      // Scope the query to this entity, keeping the expression and ordering.
      outcome: e.source.value.query({
        // Each card is the top few of its type, wherever the shell's own
        // result set has been paged to — so this asks for the first page.
        query: { ...c, entity: P.key, expr: h, page: 1 },
        schema: d,
        entity: P,
        /*
         * One row where none are shown, not none: to a source a limit of 0 is
         * no limit, which would fetch every record of every type to draw a
         * count. The one row is still read — it is what says whether the type
         * holds nothing but the record the query named.
         */
        limit: Math.max(_, 1),
        offset: 0
      })
    }));
    if (b.every(({ outcome: P }) => !(P instanceof Promise))) {
      t.value = b.map(
        ({ entity: P, outcome: $ }) => l(P, $, g, d, h)
      ), a.value = null, n.value = !1;
      return;
    }
    n.value = !0, Promise.all(b.map(({ outcome: P }) => Promise.resolve(P))).then((P) => {
      o === s && (t.value = P.map(
        ($, y) => l(b[y].entity, $, g, d, h)
      ), a.value = null);
    }).catch((P) => {
      o === s && (a.value = P, t.value = []);
    }).finally(() => {
      o === s && (n.value = !1);
    });
  }, i = () => {
    try {
      r();
    } catch (o) {
      a.value = o, t.value = [], n.value = !1;
    }
  };
  return te(
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
function Fi(e, t, n) {
  const a = t.rows[0];
  if (t.total !== 1 || t.rows.length !== 1 || !a)
    return !1;
  const s = n.trim();
  if (!s)
    return !1;
  const l = kt(e, a);
  return !!l && We(s, l) === s;
}
const Vi = ["data-dc-pending", "data-dc-heads-only"], Di = {
  key: 0,
  class: "dc-types__state",
  role: "alert"
}, Ki = {
  key: 1,
  class: "dc-types__state",
  "aria-live": "polite"
}, Wi = {
  key: 2,
  class: "dc-types__state"
}, zi = ["data-dc-empty"], ji = { class: "dc-type__name" }, Ui = { class: "dc-type__count dc-mono" }, Qi = {
  key: 0,
  class: "dc-type__note dc-mono"
}, Gi = { class: "dc-type__sr" }, Yi = {
  key: 1,
  class: "dc-type__description"
}, Xi = {
  key: 0,
  class: "dc-type__empty"
}, Ji = { class: "dc-type__identity" }, Zi = { class: "dc-type__primary dc-truncate" }, ec = { class: "dc-type__secondary dc-mono dc-truncate" }, tc = { class: "dc-type__trailing dc-mono" }, nc = { class: "dc-type__metric-value" }, ac = { class: "dc-type__metric-label" }, sc = {
  key: 0,
  class: "dc-type__date"
}, lc = /* @__PURE__ */ z({
  __name: "TypeCardsView",
  setup(e) {
    const t = ee(), { previews: n, pending: a, error: s } = qi({
      source: t.source,
      schema: t.schema,
      // The query as the results are read under it, so a word being typed in the
      // header narrows the cards as it narrows any list — see `liveQuery`.
      query: t.liveQuery,
      entities: t.entities,
      limit: t.previewsPerType,
      within: t.within,
      isPinned: (d) => t.isPinnedId(d)
    }), l = f(
      () => !t.isPristine.value || !!t.within.value || t.drafting.value
    ), r = f(() => t.previewsPerType.value <= 0), i = f(
      () => new Set(n.value.filter((d) => d.pinned).map((d) => d.entity.key))
    ), o = (d) => {
      const { keepsCard: v } = d;
      return Array.isArray(v) ? v.some((_) => i.value.has(_)) : !!v;
    }, c = f(
      () => n.value.filter(
        (d) => !d.pinned && (l.value || !d.entity.nested) && (d.total > 0 || o(d.entity) || !r.value && d.entity.create)
      )
    );
    return (d, v) => (u(), m("div", {
      class: "dc-types",
      "data-dc-pending": w(a) ? "true" : "false",
      "data-dc-heads-only": r.value ? "true" : "false"
    }, [
      G(d.$slots, "before", {}, void 0, !0),
      w(s) ? (u(), m("p", Di, " Could not load results: " + E(w(s) instanceof Error ? w(s).message : "the data source failed."), 1)) : !c.value.length && w(a) ? (u(), m("p", Ki, " Running query… ")) : c.value.length ? L("", !0) : (u(), m("p", Wi, E(l.value ? "Nothing matches this query" : "Nothing here yet"), 1)),
      (u(!0), m(W, null, X(c.value, (_) => (u(), m("section", {
        key: _.entity.key,
        class: "dc-type",
        "data-dc-empty": _.total ? "false" : "true"
      }, [
        Q(ae, {
          class: "dc-type__head",
          href: w(t).entityHref(_.entity.key),
          onPress: (p) => w(t).setEntity(_.entity.key)
        }, {
          default: Y(() => [
            S("span", ji, E(_.entity.label), 1),
            S("span", Ui, E(_.count), 1),
            _.entity.note ? (u(), m("span", Qi, E(_.entity.note), 1)) : L("", !0),
            v[0] || (v[0] = S("span", {
              class: "dc-type__go",
              "aria-hidden": "true"
            }, "→", -1)),
            S("span", Gi, "Show only " + E(_.entity.label.toLowerCase()), 1),
            _.entity.description ? (u(), m("span", Yi, E(_.entity.description), 1)) : L("", !0)
          ]),
          _: 2
        }, 1032, ["href", "onPress"]),
        _.total ? L("", !0) : (u(), m("p", Xi, E(l.value ? "No matches" : "Nothing here yet"), 1)),
        (u(!0), m(W, null, X(_.rows, (p) => (u(), m("div", {
          key: p.key,
          class: "dc-type__row"
        }, [
          Q(ae, {
            class: "dc-type__open",
            href: w(t).pressHref(p.row),
            onPress: (g) => w(t).activate(p.row, g)
          }, {
            default: Y(() => [
              S("span", Ji, [
                S("span", Zi, E(p.parts.identity), 1),
                S("span", ec, E(p.parts.reference), 1)
              ])
            ]),
            _: 2
          }, 1032, ["href", "onPress"]),
          S("span", tc, [
            (u(!0), m(W, null, X(p.parts.metrics.slice(0, 1), (g) => (u(), A(dt, {
              key: g.column.key ?? g.label,
              class: "dc-type__metric",
              entry: p,
              column: g.column
            }, {
              default: Y(() => [
                S("span", nc, E(g.text), 1),
                S("span", ac, E(g.label), 1)
              ]),
              _: 2
            }, 1032, ["entry", "column"]))), 128)),
            p.parts.updated ? (u(), m("span", sc, E(p.parts.updated), 1)) : L("", !0),
            Q(kn, { entry: p }, null, 8, ["entry"]),
            Q(vt, { entry: p }, null, 8, ["entry"]),
            Q(ft, { entry: p }, null, 8, ["entry"])
          ])
        ]))), 128)),
        _.entity.create && !r.value ? (u(), A(ae, {
          key: 1,
          class: "dc-type__new",
          href: w(t).createHref?.(_.entity),
          onPress: (p) => w(t).create(_.entity)
        }, {
          default: Y(() => [
            v[1] || (v[1] = S("span", {
              class: "dc-type__plus",
              "aria-hidden": "true"
            }, "+", -1)),
            Z(" " + E(_.entity.create), 1)
          ]),
          _: 2
        }, 1032, ["href", "onPress"])) : L("", !0)
      ], 8, zi))), 128)),
      G(d.$slots, "after", {}, void 0, !0)
    ], 8, Vi));
  }
}), Ja = /* @__PURE__ */ j(lc, [["__scopeId", "data-v-d60e56a6"]]), rc = ["data-dc-pending", "data-dc-more"], oc = {
  key: 0,
  class: "dc-results__state dc-results__state--loading",
  "aria-live": "polite"
}, ic = {
  key: 3,
  class: "dc-results__state",
  role: "alert"
}, cc = { class: "dc-results__detail" }, uc = {
  key: 4,
  class: "dc-results__state",
  "aria-live": "polite"
}, dc = {
  key: 5,
  class: "dc-results__state"
}, fc = { class: "dc-results__detail" }, vc = /* @__PURE__ */ z({
  __name: "ResultsArea",
  props: {
    views: {},
    loading: { type: Boolean }
  },
  setup(e) {
    const t = e, n = ee(), a = Et(), s = {
      list: ln,
      cards: Ka,
      grid: Wa,
      images: za,
      table: Xa,
      links: ja,
      preview: Ua
    }, l = f(() => ca(n.query.value, t.views)), r = f(() => Ie(n.query.value.view, t.views)), i = f(() => (r.value === "record" ? null : s[r.value]) ?? ln), o = f(() => r.value === "record" ? n.recordView.value : null), c = f(() => n.rows.value.length > 0), d = f(() => n.error.value !== null), v = H(null);
    function _(y) {
      return y.querySelector("[data-dc-scroll]") ?? y;
    }
    te(
      // The page on screen, which is the draft's own while one is being typed.
      () => n.liveQuery.value.page,
      () => {
        v.value && (_(v.value).scrollTop = 0);
      }
    );
    const p = H(""), g = H({ x: 0, y: 0 }), h = H(0);
    function b() {
      const y = v.value;
      if (!y) {
        p.value = "";
        return;
      }
      const k = _(y), T = {
        top: k.scrollTop > 1,
        right: k.scrollWidth - k.clientWidth - k.scrollLeft > 1,
        bottom: k.scrollHeight - k.clientHeight - k.scrollTop > 1,
        left: k.scrollLeft > 1
      };
      p.value = Object.entries(T).filter(([, F]) => F).map(([F]) => F).join(" "), g.value = {
        x: k.offsetHeight - k.clientHeight,
        y: k.offsetWidth - k.clientWidth
      }, h.value = y.querySelector("[data-dc-stuck]")?.offsetHeight ?? 0;
    }
    let P = null, $ = null;
    return te(
      v,
      (y, k) => {
        if (k?.removeEventListener("scroll", b, { capture: !0 }), P?.disconnect(), $?.disconnect(), P = null, $ = null, b(), !y || (y.addEventListener("scroll", b, { passive: !0, capture: !0 }), typeof ResizeObserver > "u")) return;
        const T = new ResizeObserver(b), F = typeof MutationObserver > "u" ? null : new MutationObserver(() => {
          ce(), b();
        }), ce = () => {
          T.disconnect(), F?.disconnect();
          for (const I of /* @__PURE__ */ new Set([y, _(y)])) {
            T.observe(I);
            for (const B of I.children) T.observe(B);
            F?.observe(I, { childList: !0 });
          }
        };
        ce(), P = T, $ = F;
      },
      { flush: "post" }
    ), we(() => {
      v.value?.removeEventListener("scroll", b, { capture: !0 }), P?.disconnect(), $?.disconnect();
    }), (y, k) => (u(), m("div", {
      ref_key: "scroller",
      ref: v,
      class: "dc-results",
      "data-dc-pending": w(n).pending.value ? "true" : "false",
      "data-dc-more": p.value,
      style: le({
        "--dc-results-gutter-x": `${g.value.x}px`,
        "--dc-results-gutter-y": `${g.value.y}px`,
        "--dc-results-stuck": `${h.value}px`
      })
    }, [
      e.loading ? (u(), m("p", oc, [...k[1] || (k[1] = [
        S("span", { class: "dc-results__detail" }, "Loading…", -1)
      ])])) : l.value ? (u(), A(Ja, { key: 1 }, Qt({ _: 2 }, [
        a["cards-before"] ? {
          name: "before",
          fn: Y(() => [
            G(y.$slots, "cards-before", {}, void 0, !0)
          ]),
          key: "0"
        } : void 0,
        a["cards-after"] ? {
          name: "after",
          fn: Y(() => [
            G(y.$slots, "cards-after", {}, void 0, !0)
          ]),
          key: "1"
        } : void 0
      ]), 1024)) : o.value?.id ? (u(), A(Je(o.value.component), {
        key: 2,
        id: o.value.id
      }, null, 8, ["id"])) : d.value ? (u(), m("p", ic, [
        k[2] || (k[2] = S("span", { class: "dc-results__headline" }, "Could not load results", -1)),
        S("span", cc, E(w(n).error.value instanceof Error ? w(n).error.value.message : "The data source failed."), 1)
      ])) : !c.value && w(n).pending.value ? (u(), m("p", uc, [...k[3] || (k[3] = [
        S("span", { class: "dc-results__detail" }, "Running query…", -1)
      ])])) : c.value ? (u(), A(Je(i.value), { key: 6 })) : (u(), m("div", dc, [
        k[4] || (k[4] = S("span", { class: "dc-results__headline" }, "Nothing matches this query", -1)),
        S("span", fc, E(w(n).summary.value), 1),
        w(n).isPristine.value ? L("", !0) : (u(), A(ae, {
          key: 0,
          class: "dc-results__clear",
          href: w(n).isEverything.value ? w(n).clearHref() : w(n).entityHref(null),
          onPress: k[0] || (k[0] = (T) => w(n).isEverything.value ? w(n).clearFilters() : w(n).clearEntity())
        }, {
          default: Y(() => [
            Z(E(w(n).isEverything.value ? "Clear filters" : "Search everything instead"), 1)
          ]),
          _: 1
        }, 8, ["href"]))
      ]))
    ], 12, rc));
  }
}), Za = /* @__PURE__ */ j(vc, [["__scopeId", "data-v-bc18f2f9"]]), pc = ["data-dc-theme", "data-dc-value-press"], hc = {
  key: 0,
  class: "dc-shell__page"
}, mc = /* @__PURE__ */ z({
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
    const a = e, s = n, l = Pn(e, "pinned"), r = Pn(e, "selected"), i = Et(), o = rn(sa, null), c = a.route || o ? null : us(), d = a.route ?? o ?? c;
    we(() => c?.dispose?.());
    const v = H(!!i.page);
    as(() => {
      v.value = !!i.page;
    });
    const _ = ds(d, {
      detached: () => v.value && a.pageQuery === "detached",
      path: () => a.listPath
    }), p = f(() => sl({ seed: a.schema.key })), g = f(() => a.source ?? p.value), h = xl({
      schema: () => a.schema,
      adapter: _,
      defaults: () => a.defaults,
      navigationMode: () => a.navigationMode,
      facetNavigationMode: () => a.facetNavigationMode
    }), b = f(() => a.within?.trim() ?? ""), P = El({
      query: h.query,
      entity: h.entity,
      schema: f(() => a.schema),
      setExpression: h.setExpression
    });
    te(h.query, (x) => s("query-change", x));
    const $ = f(() => fl(a.schema, [h.query.value.expr])), y = f(
      () => $.value.flatMap((x) => {
        const R = a.schema.entities.find((K) => K.key === x.entityKey);
        return R ? [{ ...x, entity: R }] : [];
      })
    );
    function k() {
      if (i.record) return y.value;
      const x = a.recordCards;
      return x ? y.value.filter((R) => x[R.entityKey]) : [];
    }
    const T = f(() => {
      const [x, ...R] = y.value;
      if (!x || R.length || h.entity.value !== null) return null;
      const K = a.recordViews?.[x.entityKey];
      return K ? { ...K, id: x.id } : null;
    }), F = f(() => {
      const x = h.entity.value?.key;
      return x && a.recordViews?.[x] || null;
    }), ce = f(() => {
      const x = a.views, R = typeof x == "function" ? x({ entity: h.entity.value, records: $.value }) : x;
      return T.value || F.value ? [...(R ?? un).filter((K) => K !== "record"), "record"] : R?.filter((K) => K !== "record");
    }), I = f(
      () => F.value !== null && Ie(h.query.value.view, ce.value) === "record"
    ), B = f(() => I.value ? 1 : a.limit), q = Sl({
      source: g,
      query: P.live,
      schema: f(() => a.schema),
      entity: h.entity,
      limit: B,
      within: b
    }), ie = Cl({
      // Not before the data has landed: what is there until then is no place to hold.
      active: f(() => I.value && !a.loading),
      rows: q.rows,
      pending: q.pending,
      page: f(() => P.live.value.page),
      list: f(() => {
        const { entity: x, expr: R, sort: K, dir: $e } = P.live.value;
        return JSON.stringify([x, R, K, $e]);
      }),
      locate: q.locate,
      moveTo: (x) => {
        P.drafting.value ? P.setPage(x) : h.setPage(x, "replace");
      }
    }), oe = f(() => q.pageCount.value + (ie.gone.value ? 1 : 0)), se = f(() => {
      if (T.value) return T.value;
      const x = F.value;
      return x ? { ...x, id: ie.id.value ?? q.rows.value[0]?.id ?? null } : null;
    });
    function M(x) {
      const R = F.value !== null && Ie(x, ce.value) === "record";
      if (R === I.value) {
        h.setView(x);
        return;
      }
      const K = P.live.value.page, $e = R ? (K - 1) * a.limit + 1 : Math.ceil(K / a.limit);
      P.drafting.value ? (h.setView(x), P.setPage($e)) : h.setView(x, $e);
    }
    function U(x) {
      if (!F.value || I.value) return null;
      const R = q.rows.value.indexOf(x);
      return R === -1 ? null : q.offset.value + R + 1;
    }
    te(
      [oe, q.pending, h.query, P.drafting, () => a.loading, v, ie.holding],
      () => {
        if (q.pending.value || P.drafting.value || a.loading || v.value) return;
        const x = oe.value;
        h.query.value.page <= x || (ie.gone.value ? ie.moveTo(x) : ie.holding.value || h.setPage(x, "replace"));
      },
      // Immediately, since a pasted URL is past the end before anything changes;
      // and after the render, so the correction is a navigation the mounted shell
      // makes rather than one it makes on the way up. An async source is still
      // pending here and corrects itself when its count lands.
      { immediate: !0, flush: "post" }
    );
    const O = f(() => new Set(l.value));
    function J(x) {
      const R = new Set(O.value);
      R.has(x.id) ? R.delete(x.id) : R.add(x.id), l.value = [...R], s("toggle-pin", x);
    }
    const ne = f(() => {
      if (a.selectable === !0) return !0;
      const x = h.entity.value;
      return !!(x?.duplicate || x?.delete || x?.operations?.some((R) => R.selection !== !1));
    }), ye = f(() => new Set(r.value));
    function ve(x) {
      const R = new Set(ye.value);
      R.has(x.id) ? R.delete(x.id) : R.add(x.id), r.value = [...R];
    }
    function xe(x) {
      const R = new Set(ye.value);
      for (const K of q.rows.value)
        x ? R.add(K.id) : R.delete(K.id);
      r.value = [...R];
    }
    function pt() {
      r.value.length && (r.value = []);
    }
    const Se = f(() => ({
      ids: [...r.value],
      rows: q.rows.value.filter((x) => ye.value.has(x.id)),
      entity: h.entity.value
    }));
    te(() => h.query.value.entity, pt);
    function qe(x, R, K = {}, $e) {
      const Sn = zt(a.schema, h.query.value, x, K, $e);
      K.exclude ? h.narrow(Sn, R?.key ?? h.query.value.entity) : P.release(() => h.narrow(Sn, R?.key ?? null, R ? void 0 : "cards")), s("drill", x, R, K);
    }
    function Ce(x) {
      return a.rowPress === "narrow" && kt(a.schema, x) !== null;
    }
    function be(x) {
      return a.schema.entities.find((K) => K.key === x.entityKey)?.href?.(x) || null;
    }
    const C = me(null);
    te(h.query, () => {
      C.value = null;
    });
    const N = vl({
      ...h,
      draft: P.text,
      liveQuery: P.live,
      drafting: P.drafting,
      commitDraft: P.commit,
      abandonDraft: P.abandon,
      /*
       * A page of what is on screen: the draft's, while one is live, which are
       * held beside it rather than in the URL — see `liveQuery`.
       */
      setPage: (x, R) => {
        const K = ie.step(x);
        K !== null && (P.drafting.value ? P.setPage(K) : h.setPage(K, R));
      },
      setView: M,
      schema: f(() => a.schema),
      entities: f(() => a.schema.entities),
      rows: q.rows,
      total: q.total,
      matched: q.matched,
      limit: B,
      offset: q.offset,
      pageCount: oe,
      peek: q.peek,
      pending: q.pending,
      counting: q.counting,
      error: q.error,
      source: g,
      previewsPerType: f(() => a.previewsPerType),
      within: b,
      loading: f(() => a.loading),
      recordView: se,
      pinnable: f(() => a.pinnable === !0),
      isPinned: (x) => O.value.has(x.id),
      isPinnedId: (x) => O.value.has(x),
      togglePin: J,
      selectable: ne,
      selection: Se,
      isSelected: (x) => ye.value.has(x.id),
      toggleSelect: ve,
      selectPage: xe,
      clearSelection: pt,
      narrowsOnPress: f(() => a.rowPress === "narrow"),
      rowLinks: f(() => a.rowLinks),
      pressPreview: C,
      /*
       * The one place a press is read, so every view gets the same answer without
       * knowing which of the two it is: they all call this.
       */
      activate: (x, R = {}) => {
        if (Ce(x)) {
          qe(x, null, R);
          return;
        }
        const K = U(x);
        if (K !== null) {
          P.drafting.value ? (h.setView("record"), P.setPage(K)) : h.setView("record", K);
          return;
        }
        const $e = be(x);
        if ($e) {
          window.open($e, "_blank", "noopener");
          return;
        }
        s("activate", x);
      },
      pressHref: (x) => {
        if (Ce(x)) return h.narrowHref(zt(a.schema, h.query.value, x), null, "cards");
        const R = U(x);
        return R !== null ? h.hrefFor({ view: "record", page: R }) : be(x) ?? a.activateHref?.(x) ?? null;
      },
      recordHref: be,
      drillHref: (x, R, K) => kt(a.schema, x) ? h.narrowHref(
        zt(a.schema, h.query.value, x, {}, K),
        R?.key ?? null,
        R ? void 0 : "cards"
      ) : null,
      create: (x) => s("create", x),
      createHref: (x) => a.createHref?.(x) ?? null,
      duplicate: () => s("duplicate", Se.value),
      delete: () => s("delete", Se.value),
      operate: (x) => s("operate", x, Se.value),
      drill: qe
    });
    ml({ theme: () => a.theme, accent: () => a.accent, tokens: () => a.tokens });
    const V = f(() => {
      if (!(!a.accent && !a.tokens))
        return { ...a.tokens, ...a.accent ? { "--dc-accent": a.accent } : {} };
    }), D = H(null), Te = H(0);
    let Fe = null;
    ct(() => {
      const x = D.value;
      x && (Te.value = x.getBoundingClientRect().width, !(typeof ResizeObserver > "u") && (Fe = new ResizeObserver(([R]) => {
        Te.value = R.contentRect.width;
      }), Fe.observe(x)));
    }), we(() => Fe?.disconnect());
    const Vt = f(() => a.oneStripFrom !== !1 && Te.value >= a.oneStripFrom), $n = f(
      () => Ie(h.query.value.view, ce.value) === "record" && se.value?.strip === !1
    ), xn = f(() => ({
      views: ce.value,
      selectionPlacement: a.selectionPlacement,
      pagesNote: a.pagesNote
    }));
    return t({
      query: h.query
    }), (x, R) => (u(), m("div", {
      ref_key: "root",
      ref: D,
      class: "dc-shell",
      "data-dc-theme": e.theme,
      "data-dc-value-press": e.valuePress,
      style: le(V.value)
    }, [
      S("div", {
        class: de(["dc-shell__head", { "dc-shell__head--one-strip": Vt.value }])
      }, [
        Q(qa, null, Qt({ _: 2 }, [
          i.page ? void 0 : {
            name: "lead",
            fn: Y(() => [
              Q(qr, {
                views: ce.value,
                "type-chooser": e.typeChooser
              }, null, 8, ["views", "type-chooser"])
            ]),
            key: "0"
          },
          i.brand ? {
            name: "brand",
            fn: Y((K) => [
              G(x.$slots, "brand", Dt(ss(K)), void 0, !0)
            ]),
            key: "1"
          } : void 0,
          i.actions ? {
            name: "actions",
            fn: Y(() => [
              G(x.$slots, "actions", {}, void 0, !0)
            ]),
            key: "2"
          } : void 0
        ]), 1024),
        Vt.value && !i.page && !$n.value ? (u(), A(an, Dt(De({ key: 0 }, xn.value)), null, 16)) : L("", !0)
      ], 2),
      i.page ? (u(), m("div", hc, [
        G(x.$slots, "page", {
          query: w(N).query.value
        }, void 0, !0)
      ])) : L("", !0),
      !Vt.value && !i.page && !$n.value ? (u(), A(an, Dt(De({ key: 1 }, xn.value)), null, 16)) : L("", !0),
      i.page ? L("", !0) : G(x.$slots, "results", {
        rows: w(N).rows.value,
        total: w(N).total.value,
        offset: w(N).offset.value,
        pageCount: w(N).pageCount.value,
        query: w(N).liveQuery.value,
        pending: w(N).pending.value,
        loading: e.loading
      }, () => [
        Q(Za, {
          views: ce.value,
          loading: e.loading
        }, Qt({ _: 2 }, [
          i["cards-before"] || k().length ? {
            name: "cards-before",
            fn: Y(() => [
              (u(!0), m(W, null, X(k(), (K) => (u(), m(W, {
                key: `${K.entityKey}:${K.id}`
              }, [
                i.record ? G(x.$slots, "record", {
                  id: K.id,
                  entity: K.entity
                }, void 0, !0, 0) : (u(), A(Je(e.recordCards?.[K.entityKey]), {
                  key: 1,
                  id: K.id
                }, null, 8, ["id"]))
              ], 64))), 128)),
              G(x.$slots, "cards-before", {}, void 0, !0)
            ]),
            key: "0"
          } : void 0,
          i["cards-after"] ? {
            name: "cards-after",
            fn: Y(() => [
              G(x.$slots, "cards-after", {}, void 0, !0)
            ]),
            key: "1"
          } : void 0
        ]), 1032, ["views", "loading"])
      ], !0, 2)
    ], 12, pc));
  }
}), yc = /* @__PURE__ */ j(mc, [["__scopeId", "data-v-7ae0f737"]]), gc = ["data-dc-span", "data-dc-muted", "data-dc-collapsed"], _c = ["data-dc-collapsible"], wc = ["aria-expanded", "aria-controls"], kc = { class: "dc-shell-card__sr" }, bc = {
  key: 0,
  class: "dc-shell-card__identity"
}, $c = { class: "dc-shell-card__title dc-shell-card__name" }, xc = {
  key: 0,
  class: "dc-shell-card__ref dc-mono"
}, Sc = {
  key: 1,
  class: "dc-shell-card__title"
}, Cc = {
  key: 2,
  class: "dc-shell-card__count dc-mono"
}, Pc = {
  key: 1,
  class: "dc-shell-card__aside"
}, Ec = ["data-dc-flush"], Mc = /* @__PURE__ */ z({
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
    const n = e, a = t, s = H(n.defaultCollapsed === !0), l = f(() => n.span === "all" ? { gridColumn: "1 / -1" } : void 0), r = Et();
    function i(I) {
      return o(I?.() ?? []);
    }
    function o(I) {
      return I.some((B) => B.type === ls ? !1 : B.type === rs ? String(B.children ?? "").trim().length > 0 : B.type === W ? o(B.children ?? []) : !0);
    }
    const c = f(
      () => !!n.title || !!n.name || d.value || i(r.head)
    ), d = f(() => i(r.aside)), v = f(() => i(r.default)), _ = f(() => i(r.foot)), p = f(
      () => !!n.name && (!!n.reference || i(r.reference))
    ), g = f(() => n.collapsible === !0 && c.value), h = f(() => g.value && (n.collapsed ?? s.value));
    function b() {
      const I = !h.value;
      s.value = I, a("update:collapsed", I);
    }
    const P = Mt() ?? "dc-shell-card", $ = `${P}-body`, y = `${P}-foot`, k = f(
      () => [v.value ? $ : "", _.value ? y : ""].filter(Boolean).join(" ") || void 0
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
    function ce(I) {
      if (!g.value) return;
      const B = I.target?.closest(T);
      B && F.value?.contains(B) || typeof window < "u" && window.getSelection()?.toString() || b();
    }
    return (I, B) => (u(), m("section", {
      class: "dc-shell-card",
      style: le(l.value),
      "data-dc-span": e.span,
      "data-dc-muted": e.muted ? "true" : "false",
      "data-dc-collapsed": h.value ? "true" : "false"
    }, [
      c.value ? (u(), m("header", {
        key: 0,
        ref_key: "head",
        ref: F,
        class: "dc-shell-card__head",
        "data-dc-collapsible": g.value ? "true" : "false",
        onClick: ce
      }, [
        g.value ? (u(), m("button", {
          key: 0,
          type: "button",
          class: "dc-shell-card__toggle",
          "aria-expanded": h.value ? "false" : "true",
          "aria-controls": k.value,
          onClick: b
        }, [
          B[0] || (B[0] = S("svg", {
            class: "dc-shell-card__chevron",
            viewBox: "0 0 10 10",
            "aria-hidden": "true"
          }, [
            S("path", { d: "M2 3.5 5 6.5 8 3.5" })
          ], -1)),
          S("span", kc, E(e.name || e.title || "Card"), 1)
        ], 8, wc)) : L("", !0),
        G(I.$slots, "head", {}, () => [
          e.name ? (u(), m("div", bc, [
            S("h2", $c, E(e.name), 1),
            p.value ? (u(), m("span", xc, [
              G(I.$slots, "reference", {}, () => [
                Z(E(e.reference), 1)
              ], !0)
            ])) : L("", !0)
          ])) : (u(), m("h2", Sc, E(e.title), 1)),
          e.count !== void 0 ? (u(), m("span", Cc, E(e.count), 1)) : L("", !0)
        ], !0),
        d.value ? (u(), m("span", Pc, [
          G(I.$slots, "aside", {}, void 0, !0)
        ])) : L("", !0)
      ], 8, _c)) : L("", !0),
      v.value ? Ut((u(), m("div", {
        key: 1,
        id: $,
        class: "dc-shell-card__body",
        "data-dc-flush": e.flush ? "true" : "false"
      }, [
        G(I.$slots, "default", {}, void 0, !0)
      ], 8, Ec)), [
        [Mn, !h.value]
      ]) : L("", !0),
      _.value ? Ut((u(), m("footer", {
        key: 2,
        id: y,
        class: "dc-shell-card__foot"
      }, [
        G(I.$slots, "foot", {}, void 0, !0)
      ], 512)), [
        [Mn, !h.value]
      ]) : L("", !0)
    ], 12, gc));
  }
}), Mu = /* @__PURE__ */ j(Mc, [["__scopeId", "data-v-c84525aa"]]), Lc = ["aria-label"], Tc = ["aria-checked", "data-dc-active", "tabindex", "onClick", "onKeydown"], Oc = /* @__PURE__ */ z({
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
    function l(r, i) {
      const o = n.options.length;
      let c = null;
      if (r.key === "ArrowRight" || r.key === "ArrowDown" ? c = (i + 1) % o : r.key === "ArrowLeft" || r.key === "ArrowUp" ? c = (i - 1 + o) % o : r.key === "Home" ? c = 0 : r.key === "End" && (c = o - 1), c === null) return;
      r.preventDefault();
      const d = n.options[c];
      d && (a("update:modelValue", d.key), s.value[c]?.focus());
    }
    return (r, i) => (u(), m("div", {
      class: "dc-segmented",
      role: "radiogroup",
      "aria-label": e.label
    }, [
      (u(!0), m(W, null, X(e.options, (o, c) => (u(), m("button", {
        key: o.key,
        ref_for: !0,
        ref_key: "buttons",
        ref: s,
        type: "button",
        role: "radio",
        class: de(["dc-segmented__item", { "dc-segmented__item--mono": e.mono }]),
        "aria-checked": o.key === e.modelValue,
        "data-dc-active": o.key === e.modelValue ? "true" : "false",
        tabindex: o.key === e.modelValue ? 0 : -1,
        onClick: (d) => a("update:modelValue", o.key),
        onKeydown: (d) => l(d, c)
      }, E(o.label), 43, Tc))), 128))
    ], 8, Lc));
  }
}), Nc = /* @__PURE__ */ j(Oc, [["__scopeId", "data-v-63fb5482"]]), Ac = { class: "dc-fact__label" }, Ic = ["title"], Rc = /* @__PURE__ */ z({
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
        const l = s.filter((r) => r != null && r !== "");
        return l.length ? l.map(String) : [ke];
      }
      return [String(s)];
    }), a = f(() => t.wide ? { gridColumn: "1 / -1" } : void 0);
    return (s, l) => (u(), m("div", {
      class: "dc-fact",
      style: le(a.value)
    }, [
      S("dt", Ac, [
        G(s.$slots, "label", {}, () => [
          Z(E(e.label), 1)
        ], !0)
      ]),
      S("dd", {
        class: "dc-fact__value dc-mono",
        title: e.title
      }, [
        G(s.$slots, "default", {}, () => [
          n.value.length === 1 ? (u(), m(W, { key: 0 }, [
            Z(E(n.value[0]), 1)
          ], 64)) : (u(!0), m(W, { key: 1 }, X(n.value, (r, i) => (u(), m("span", {
            key: i,
            class: "dc-fact__line"
          }, E(r), 1))), 128))
        ], !0)
      ], 8, Ic)
    ], 4));
  }
}), Bc = /* @__PURE__ */ j(Rc, [["__scopeId", "data-v-1f6d25e6"]]), Hc = /* @__PURE__ */ z({
  __name: "ShellFacts",
  props: {
    items: { default: () => [] },
    min: { default: "200px" }
  },
  setup(e) {
    const t = e, n = f(() => ({ "--dc-facts-min": t.min }));
    return (a, s) => (u(), m("dl", {
      class: "dc-facts",
      style: le(n.value)
    }, [
      (u(!0), m(W, null, X(e.items, (l, r) => (u(), A(Bc, {
        key: `${r}:${l.label}`,
        label: l.label,
        value: l.value,
        title: l.title,
        wide: l.wide
      }, null, 8, ["label", "value", "title", "wide"]))), 128)),
      G(a.$slots, "default", {}, void 0, !0)
    ], 4));
  }
}), Lu = /* @__PURE__ */ j(Hc, [["__scopeId", "data-v-17455afa"]]), qc = { class: "dc-counts" }, Fc = ["data-dc-tone"], Vc = {
  key: 0,
  class: "dc-counts__empty"
}, Dc = /* @__PURE__ */ z({
  __name: "StatusCounts",
  props: {
    counts: {},
    empty: { default: ke }
  },
  setup(e) {
    const t = e, n = f(() => t.counts.filter((a) => a.count > 0));
    return (a, s) => (u(), m("span", qc, [
      (u(!0), m(W, null, X(n.value, (l) => (u(), m("span", {
        key: l.label,
        class: "dc-counts__count",
        "data-dc-tone": l.tone ?? "neutral"
      }, E(l.count) + " " + E(l.label), 9, Fc))), 128)),
      n.value.length === 0 ? (u(), m("span", Vc, E(e.empty), 1)) : L("", !0)
    ]));
  }
}), Tu = /* @__PURE__ */ j(Dc, [["__scopeId", "data-v-5553a9e2"]]), Kc = ["data-dc-copied", "title", "aria-label"], Wc = {
  key: 0,
  class: "dc-copy__mark",
  viewBox: "0 0 16 16",
  "aria-hidden": "true"
}, zc = {
  key: 1,
  class: "dc-copy__mark",
  viewBox: "0 0 16 16",
  "aria-hidden": "true"
}, jc = 1500, Uc = /* @__PURE__ */ z({
  __name: "CopyButton",
  props: {
    text: {},
    label: { default: "Copy to clipboard" }
  },
  emits: ["copied", "error"],
  setup(e, { emit: t }) {
    const n = e, a = t, s = H(!1);
    let l;
    async function r() {
      const i = typeof n.text == "function" ? n.text() : n.text;
      try {
        if (!navigator.clipboard) throw new Error("The clipboard is not available here");
        await navigator.clipboard.writeText(i);
      } catch (o) {
        a("error", o);
        return;
      }
      s.value = !0, clearTimeout(l), l = setTimeout(() => {
        s.value = !1;
      }, jc), a("copied", i);
    }
    return we(() => clearTimeout(l)), (i, o) => (u(), m("button", {
      type: "button",
      class: "dc-copy",
      "data-dc-copied": s.value ? "true" : "false",
      title: s.value ? "Copied" : e.label,
      "aria-label": e.label,
      onClick: r
    }, [
      s.value ? (u(), m("svg", zc, [...o[1] || (o[1] = [
        S("path", { d: "M3 8.5l3.2 3L13 4.5" }, null, -1)
      ])])) : (u(), m("svg", Wc, [...o[0] || (o[0] = [
        S("rect", {
          x: "5.5",
          y: "5.5",
          width: "8",
          height: "9",
          rx: "1.5"
        }, null, -1),
        S("path", { d: "M10.5 3.5v-1a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h1" }, null, -1)
      ])]))
    ], 8, Kc));
  }
}), Qc = /* @__PURE__ */ j(Uc, [["__scopeId", "data-v-f4249d7f"]]), Gc = ["data-dc-copy", "data-dc-wrap", "data-dc-tone"], Yc = /* @__PURE__ */ z({
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
    function r() {
      return n.code ?? s.value?.textContent ?? "";
    }
    return (i, o) => (u(), m("div", {
      class: "dc-code",
      "data-dc-copy": e.copy ? "true" : "false",
      "data-dc-wrap": e.wrap ? "true" : "false",
      "data-dc-tone": e.tone
    }, [
      S("pre", {
        ref_key: "pre",
        ref: s,
        class: "dc-code__text dc-mono",
        style: le(l.value)
      }, [
        G(i.$slots, "default", {}, () => [
          Z(E(e.code), 1)
        ], !0)
      ], 4),
      e.copy ? (u(), A(Qc, {
        key: 0,
        class: "dc-code__copy",
        text: r,
        label: e.copyLabel,
        onCopied: o[0] || (o[0] = (c) => a("copied", c)),
        onError: o[1] || (o[1] = (c) => a("error", c))
      }, null, 8, ["label"])) : L("", !0)
    ], 8, Gc));
  }
}), Ou = /* @__PURE__ */ j(Yc, [["__scopeId", "data-v-67b371dd"]]), Xc = 24, Jc = /* @__PURE__ */ z({
  __name: "ShellLog",
  props: {
    fetchChunk: {},
    stripAnsi: { type: Boolean },
    maxHeight: { default: "460px" }
  },
  setup(e, { expose: t }) {
    const n = e, a = H(""), s = f(() => n.stripAnsi ? ws(a.value) : a.value), l = H(null);
    let r = 0, i = null;
    function o() {
      return i ??= c().finally(() => {
        i = null;
      }), i;
    }
    async function c() {
      const { chunk: _, offset: p } = await n.fetchChunk(r);
      if (r = p, !_) return;
      const g = l.value, h = !g || g.scrollTop + g.clientHeight >= g.scrollHeight - Xc;
      a.value += _, h && (await Xe(), l.value && (l.value.scrollTop = l.value.scrollHeight));
    }
    function d() {
      a.value = "", r = 0;
    }
    const v = f(() => n.maxHeight === void 0 ? void 0 : { maxHeight: typeof n.maxHeight == "number" ? `${n.maxHeight}px` : n.maxHeight });
    return t({ poll: o, reset: d }), (_, p) => (u(), m("pre", {
      ref_key: "pane",
      ref: l,
      class: "dc-log dc-mono",
      style: le(v.value)
    }, E(s.value), 5));
  }
}), Nu = /* @__PURE__ */ j(Jc, [["__scopeId", "data-v-2c86947e"]]), Zc = ["data-dc-theme"], eu = ["aria-labelledby", "aria-label"], tu = {
  key: 1,
  class: "dc-dialog__actions"
}, Qe = [], nu = /* @__PURE__ */ z({
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
    const n = e, a = t, { theme: s, style: l, adopt: r } = _n(n), i = `${Mt() ?? "dc-dialog"}-title`, o = H(null);
    function c() {
      a("close"), a("update:open", !1);
    }
    const d = Symbol("dc-dialog");
    function v(y) {
      y.key !== "Escape" || y.defaultPrevented || Qe[Qe.length - 1] === d && (y.preventDefault(), c());
    }
    let _ = !1;
    function p(y) {
      _ = y.target === y.currentTarget;
    }
    function g(y) {
      y.target === y.currentTarget && _ && c(), _ = !1;
    }
    const h = [
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
      Qe.push(d), document.addEventListener("keydown", v), b = document.activeElement instanceof HTMLElement ? document.activeElement : null, r(), await Xe(), (o.value?.querySelector("[autofocus]") ?? o.value?.querySelector(h) ?? o.value)?.focus();
    }
    function $() {
      const y = Qe.indexOf(d);
      y !== -1 && (Qe.splice(y, 1), document.removeEventListener("keydown", v), b?.isConnected && b.focus(), b = null);
    }
    return ct(() => {
      n.open && P();
    }), te(
      () => n.open,
      (y) => {
        y ? P() : $();
      }
    ), we($), (y, k) => e.open ? (u(), A(Pt, {
      key: 0,
      to: e.to
    }, [
      S("div", {
        class: "dc-shell dc-layer dc-dialog",
        "data-dc-theme": w(s),
        style: le(w(l)),
        onPointerdown: p,
        onClick: g
      }, [
        S("div", {
          ref_key: "panel",
          ref: o,
          class: de(["dc-dialog__panel", e.panelClass]),
          role: "dialog",
          "aria-modal": "true",
          tabindex: "-1",
          "aria-labelledby": e.title ? i : void 0,
          "aria-label": e.title ? void 0 : e.label
        }, [
          e.title ? (u(), m("h2", {
            key: 0,
            id: i,
            class: "dc-dialog__title"
          }, E(e.title), 1)) : L("", !0),
          S("div", {
            class: de(["dc-dialog__body", e.bodyClass])
          }, [
            G(y.$slots, "default", {}, void 0, !0)
          ], 2),
          y.$slots.actions ? (u(), m("div", tu, [
            G(y.$slots, "actions", {}, void 0, !0)
          ])) : L("", !0)
        ], 10, eu)
      ], 44, Zc)
    ], 8, ["to"])) : L("", !0);
  }
}), Au = /* @__PURE__ */ j(nu, [["__scopeId", "data-v-0cccf313"]]), au = 4500, su = 9e3, it = H([]);
let ea = 0;
function es(e) {
  it.value = it.value.filter((t) => t.id !== e);
}
function ts(e, t = "ok") {
  ea += 1;
  const n = ea;
  it.value = [...it.value, { id: n, message: e, kind: t }], setTimeout(() => es(n), t === "err" ? su : au);
}
function lu(e) {
  ts(e instanceof Error ? e.message : String(e), "err");
}
function ru() {
  return { toasts: os(it), toast: ts, toastError: lu, dismiss: es };
}
const ou = ["data-dc-theme"], iu = ["data-dc-kind", "role"], cu = /* @__PURE__ */ z({
  __name: "ShellToasts",
  props: {
    to: { default: "body" },
    theme: { default: void 0 },
    accent: { default: void 0 },
    tokens: { default: void 0 }
  },
  setup(e) {
    const t = e, { toasts: n } = ru(), { theme: a, style: s, adopt: l } = _n(t);
    return ct(l), (r, i) => (u(), A(Pt, { to: e.to }, [
      S("div", {
        class: "dc-shell dc-layer dc-toasts",
        "data-dc-theme": w(a),
        style: le(w(s)),
        "aria-live": "polite"
      }, [
        (u(!0), m(W, null, X(w(n), (o) => (u(), m("div", {
          key: o.id,
          class: "dc-toast",
          "data-dc-kind": o.kind,
          role: o.kind === "err" ? "alert" : void 0
        }, E(o.message), 9, iu))), 128))
      ], 12, ou)
    ], 8, ["to"]));
  }
}), Iu = /* @__PURE__ */ j(cu, [["__scopeId", "data-v-d970211c"]]);
function Ru(e, t) {
  const n = H(!1);
  let a = null, s = !1, l = 0;
  const r = () => {
    l++, n.value = !1, a !== null && (clearTimeout(a), a = null);
  };
  function i(d) {
    a = setTimeout(() => void o(d), t);
  }
  async function o(d) {
    if (s || d !== l) return;
    let v;
    try {
      v = await e();
    } catch {
      v = !1;
    }
    s || d !== l || (v ? i(d) : r());
  }
  const c = () => {
    n.value || (n.value = !0, o(++l));
  };
  return Ct(() => {
    s = !0, r();
  }, !0), { start: c, stop: r, polling: n };
}
function Bu(e, t = {}) {
  const n = t.key ?? ((l) => JSON.stringify(l)), a = me();
  let s = null;
  return is(() => {
    const l = e(), r = n(l);
    r !== s && (s = r, a.value = l);
  }), a;
}
function Hu(e = {}) {
  return { key: "ordinal", kind: "ordinal", label: "#", width: "52px", ...e };
}
function qu(e = {}) {
  return { key: "status", role: "state", kind: "status", label: "State", sort: "state", width: "104px", ...e };
}
function Fu(e = {}) {
  return { key: "tint", role: "tint", ...e };
}
function Vu(e = {}) {
  return { key: "picture", role: "image", kind: "image", width: "56px", height: "40px", ...e };
}
function Du(e, t = {}) {
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
function Ku(e, t = {}) {
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
function Wu(e, t, n = {}) {
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
function zu(e, t, n = {}) {
  return { key: e, kind: "date", label: t, sort: e, mono: !0, muted: !0, ...n };
}
function ju(e = {}) {
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
function Uu(e, t, n = {}) {
  return { key: e, label: t, sort: e, truncate: !0, hideBelow: 900, ...n };
}
function Qu(e, t, n, a = {}) {
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
function Ft(e) {
  return typeof e == "number" ? e : typeof e == "string" && e.trim() !== "" ? Number(e) : Number.NaN;
}
function Gu(e) {
  const t = Ft(e);
  return Number.isFinite(t) && t > 0 ? ms(t) : ke;
}
function Yu(e) {
  const t = Ft(e);
  return Number.isFinite(t) && t > 0 ? ys(t) : ke;
}
function Xu(e) {
  const t = Ft(e);
  return Number.isFinite(t) && t > 0 ? gs(t) : ke;
}
function Ju(e) {
  const t = Ft(e);
  return Number.isFinite(t) ? _s(t) : ke;
}
function uu(e) {
  if (e <= 0) return 0;
  const t = 10 ** Math.floor(Math.log10(e));
  for (const n of [1, 2, 5])
    if (e <= n * t) return n * t;
  return 10 * t;
}
function du(e, t) {
  const n = /* @__PURE__ */ new Set();
  for (const a of e) {
    const s = a.fields[t];
    for (const l of Array.isArray(s) ? s : [s])
      typeof l == "string" && l && n.add(l);
  }
  return [...n].sort((a, s) => a.localeCompare(s));
}
function fu(e, t) {
  let n = 0;
  for (const a of e) {
    const s = a.fields[t];
    typeof s == "number" && s > n && (n = s);
  }
  return n;
}
function Zu(e, t, n, a = {}) {
  return {
    kind: "chips",
    key: t,
    label: n,
    options: du(e, t),
    ...a.multiple ? { multiple: !0 } : {}
  };
}
function ed(e, t, n) {
  return { kind: "range", key: t, label: n, min: 0, max: uu(fu(e, t)) };
}
function td(e, t, n) {
  return { kind: "toggle", key: e, label: t, text: n };
}
function nd(e) {
  return e.filter((t) => t.kind === "chips" ? t.options.length > 1 : t.kind === "range" ? t.max > 0 : !0);
}
function ad(e = "", t = "/") {
  const n = H(fe(e)), a = H(t), s = [`${a.value}${n.value}`];
  return {
    search: n,
    path: a,
    history: s,
    href(l, r) {
      return `${r ?? a.value}${fe(l)}`;
    },
    push(l, r) {
      r !== void 0 && (a.value = r), n.value = fe(l), s.push(`${a.value}${n.value}`);
    },
    replace(l, r) {
      r !== void 0 && (a.value = r), n.value = fe(l), s[s.length - 1] = `${a.value}${n.value}`;
    }
  };
}
function ta(e) {
  const t = e.indexOf("?");
  if (t === -1) return "";
  const n = e.slice(t), a = n.indexOf("#");
  return fe(a === -1 ? n : n.slice(0, a));
}
function sd(e) {
  const t = H(ta(e.currentRoute.value.fullPath)), n = f(() => e.currentRoute.value.path), a = te(
    () => e.currentRoute.value.fullPath,
    (s) => {
      t.value = ta(s);
    }
  );
  return {
    search: t,
    path: n,
    push: (s, l) => e.push(`${l ?? n.value}${fe(s)}`),
    replace: (s, l) => e.replace(`${l ?? n.value}${fe(s)}`),
    href: (s, l) => {
      const r = `${l ?? n.value}${fe(s)}`;
      return e.resolve?.(r).href ?? r;
    },
    dispose: a
  };
}
function ld(e, t, n = "/") {
  return (a) => {
    const s = a.params[t], l = Array.isArray(s) ? s.join("/") : s ?? "", r = a.query[Re], i = typeof r == "string" ? r : "", o = `${e}="${l.replace(/"/g, "")}"`;
    return { path: n, query: { ...a.query, [Re]: We(i, o) } };
  };
}
function rd(e, t = "/") {
  return (n) => ({ path: t, query: { ...n.query, [je]: e } });
}
function od(e) {
  const t = /* @__PURE__ */ new Map();
  for (const n of e) {
    const a = t.get(n.entityKey);
    a ? a.push(n) : t.set(n.entityKey, [n]);
  }
  return {
    query(n) {
      return wa(n, (a) => t.get(a.key) ?? [], {
        undatedLast: !0,
        zeroIsAll: !0
      });
    }
  };
}
function id(e, t) {
  return e.query({ ...t, limit: Number.MAX_SAFE_INTEGER, offset: 0 }).rows;
}
const vu = {
  DataShell: yc,
  ShellHeader: qa,
  RecordActions: an,
  ResultsArea: Za,
  SegmentedControl: Nc,
  StatusPill: ze,
  ListView: ln,
  CardsView: Ka,
  GridView: Wa,
  ImagesView: za,
  TableView: Xa,
  LinksView: ja,
  PreviewView: Ua,
  TypeCardsView: Ja
}, cd = {
  install(e, t = {}) {
    const n = t.prefix ?? "";
    for (const [a, s] of Object.entries(vu))
      e.component(`${n}${a}`, s);
    t.route && e.provide(sa, t.route), (t.theme || t.accent || t.tokens) && hl({ theme: t.theme, accent: t.accent, tokens: t.tokens }, e);
  }
};
export {
  gu as COLUMN_BREAKPOINTS,
  yu as COLUMN_ROLES,
  Ka as CardsView,
  Zn as ColumnCell,
  Qc as CopyButton,
  ks as DEFAULT_ENTITY_VIEW,
  Gt as DEFAULT_SORT,
  la as DEFAULT_VIEW,
  Pl as DRAFT_DELAY,
  yc as DataShell,
  ke as EMPTY_CELL,
  ba as ENTITY_ALL,
  $t as ENTITY_TERM,
  ot as EXPRESSION_TERM,
  Wa as GridView,
  cd as HeaderContentLayoutPlugin,
  za as ImagesView,
  ja as LinksView,
  ln as ListView,
  gt as MOCK_TINTS,
  dt as MetricDrill,
  ft as OpenMark,
  mn as PARAM_DIR,
  je as PARAM_ENTITY,
  Re as PARAM_EXPR,
  It as PARAM_PAGE,
  hn as PARAM_SORT,
  At as PARAM_VIEW,
  mu as PILL_TONES,
  Al as POPOVER_FLIP_BELOW,
  Ol as POPOVER_GAP,
  Nl as POPOVER_MARGIN,
  wn as PinStar,
  Ua as PreviewView,
  kn as QueryMark,
  Ge as RECORD_STATUSES,
  fn as RESULT_FIELDS,
  sa as ROUTE_ADAPTER_KEY,
  an as RecordActions,
  qr as RecordChoosers,
  Za as ResultsArea,
  Na as SHELL_CONTEXT_KEY,
  bt as SHELL_THEME_KEY,
  vt as ScopeMark,
  Nc as SegmentedControl,
  He as SelectTick,
  Mu as ShellCard,
  Ou as ShellCode,
  Au as ShellDialog,
  Bc as ShellFact,
  Lu as ShellFacts,
  qa as ShellHeader,
  Nu as ShellLog,
  xr as ShellPager,
  Hl as ShellPopover,
  Iu as ShellToasts,
  sn as StandingControl,
  Tu as StatusCounts,
  ze as StatusPill,
  su as TOAST_ERROR_MS,
  au as TOAST_MS,
  Xa as TableView,
  Ja as TypeCardsView,
  bs as VIEW_ICONS,
  un as VIEW_KINDS,
  Tn as VIEW_LABELS,
  We as addTerm,
  pn as andExpression,
  Gu as bytesCell,
  da as cellFull,
  ki as cellNarrowings,
  Le as cellText,
  mt as cellTextOf,
  ue as cellValue,
  Kt as changesResults,
  Zu as chipsFrom,
  Nn as columnAlign,
  An as columnClass,
  On as columnKey,
  Ya as columnNarrows,
  ut as columnShortcut,
  ma as columnShortcutOf,
  Xt as columnTruncates,
  Ps as columnsFor,
  va as compactShortcuts,
  jl as completeDraft,
  Cs as countPages,
  us as createHistoryAdapter,
  ad as createMemoryAdapter,
  od as createMemoryDataSource,
  sl as createMockDataSource,
  sd as createVueRouterAdapter,
  zu as dateColumn,
  Ls as defaultCellText,
  yt as defaultQuery,
  et as defaultViewFor,
  ds as detachableAdapter,
  zt as drillExpression,
  Yu as durationCell,
  Xu as elapsedCell,
  xs as emptyFacetValue,
  il as entityAddress,
  ju as entityColumn,
  Yt as entityCount,
  rd as entityRedirect,
  Pa as excludingTerm,
  nt as expandShortcuts,
  Uu as facetColumn,
  rt as facetField,
  Ra as facetValue,
  qs as fieldHeading,
  Ca as fieldTerm,
  tt as findEntity,
  $a as findEntityByAddress,
  Ee as findSort,
  Qu as flagColumn,
  Ye as fnv1a,
  oa as focusEntity,
  ms as formatBytes,
  Ze as formatCount,
  ps as formatDate,
  _u as formatDateTime,
  Lt as formatDigits,
  ys as formatDuration,
  gs as formatElapsed,
  he as formatExpression,
  Ve as formatInteger,
  vs as formatMetric,
  hs as formatOrdinal,
  _s as formatPercent,
  Is as formatRange,
  _e as formatTerm,
  al as generateRows,
  wl as hasActiveFacets,
  Du as identityColumn,
  Cu as idsExpression,
  wu as isEntityScoped,
  Ss as isFacetActive,
  dn as isPristineQuery,
  Ke as isRangeTerm,
  ca as isTypeCardsQuery,
  ra as isViewKind,
  bu as joinExpression,
  Ea as liftTerm,
  Ks as matchesExpression,
  Wu as metricColumn,
  Pu as narrowPatch,
  Ws as negateTerm,
  uu as niceMax,
  fe as normalizeSearch,
  wi as numberRange,
  js as oppositeTerm,
  Hu as ordinalColumn,
  re as parseExpression,
  dl as parseQuery,
  Ju as percentCell,
  Vu as pictureColumn,
  Il as placePopover,
  Dr as presentParts,
  Va as presentRow,
  lt as pressOptions,
  vl as provideShellContext,
  hl as provideShellTheme,
  id as queryAll,
  ed as rangeFrom,
  Ot as rangeOf,
  Gs as readDraft,
  Su as readExpression,
  ld as recordRedirect,
  Sa as recordTerm,
  fl as recordsIn,
  Ku as referenceColumn,
  st as refineExpression,
  Ie as resolveView,
  pe as roleColumn,
  ua as roleColumns,
  Ms as rowKey,
  at as sameTerm,
  Bt as scopeTerm,
  kt as scopeTermFor,
  Ta as scopedEntity,
  xu as searchFromQuery,
  Wn as serializeQuery,
  cl as sortAddress,
  Tt as sortsFor,
  ku as splitExpression,
  xa as standingTerm,
  qu as stateColumn,
  ws as stripAnsi,
  $l as summarizeQuery,
  xt as summaryTerms,
  gn as termStanding,
  Fu as tintColumn,
  $u as tintFor,
  td as toggleFacet,
  pi as useColumns,
  El as useDraft,
  Ir as useEntityCounts,
  qi as useEntityPreviews,
  _n as useLayerTheme,
  Ru as usePoll,
  Be as usePresentedRows,
  xl as useQueryState,
  Tl as useRecordNames,
  Sl as useResults,
  ee as useShellContext,
  Bu as useStableSchema,
  ru as useToasts,
  nd as usefulFacets,
  Ln as viewAcross,
  Ba as withFacetValue,
  Jt as withStanding,
  zn as withWhere,
  Eu as withoutFacet,
  La as withoutOwnScope,
  zs as withoutTerm
};
