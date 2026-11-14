import { ref as H, computed as f, inject as rn, provide as on, getCurrentInstance as na, shallowRef as me, toValue as Oe, watch as te, onScopeDispose as Pt, getCurrentScope as aa, defineComponent as z, onMounted as ct, onBeforeUnmount as we, openBlock as u, createBlock as A, Teleport as Et, createElementVNode as S, mergeProps as De, unref as w, renderSlot as G, createCommentVNode as L, nextTick as Xe, createElementBlock as m, withKeys as Ne, useSlots as Mt, useId as Lt, withCtx as Y, toDisplayString as E, createTextVNode as Z, Fragment as W, renderList as X, withModifiers as Ae, normalizeClass as de, withDirectives as Ut, normalizeStyle as le, vModelText as ts, createVNode as U, reactive as Cn, toHandlers as cn, resolveDynamicComponent as Je, createSlots as Qt, useModel as Pn, onBeforeUpdate as ns, normalizeProps as Dt, guardReactiveProps as as, mergeModels as En, vShow as Mn, Comment as ss, Text as ls, readonly as rs, watchEffect as os } from "vue";
import { MenuList as is } from "menu-bar";
const un = ["list", "cards", "grid", "images", "table", "links", "preview"], Ge = ["ok", "running", "queued", "review", "failed"], hu = [...Ge, "neutral", "accent"], mu = [
  "identity",
  "reference",
  "metric",
  "state",
  "updated",
  "image",
  "tint"
], yu = [480, 620, 760, 900, 1100], sa = Symbol("dc.routeAdapter");
function fe(e) {
  if (!e) return "";
  const t = e.replace(/^[?]/, "");
  return t ? `?${t}` : "";
}
function cs() {
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
function us(e, t) {
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
const ds = new Intl.NumberFormat("en-US", {
  minimumSignificantDigits: 2,
  maximumSignificantDigits: 2,
  useGrouping: !1
});
function Tt(e) {
  return Number.isFinite(e) ? Math.abs(e) < 100 ? ds.format(e) : String(Math.round(e)) : "—";
}
function fs(e) {
  return Number.isFinite(e) ? Number.isInteger(e) || Math.abs(e) >= 100 ? Ze(e) : Tt(e) : "—";
}
function Ze(e) {
  if (!Number.isFinite(e)) return "—";
  const t = Math.round(e), n = Math.abs(t);
  return n < 1e3 ? String(t) : n < 9950 ? `${(t / 1e3).toFixed(1)}k` : n < 999500 ? `${Math.round(t / 1e3)}k` : n < 995e4 ? `${(t / 1e6).toFixed(1)}m` : `${Math.round(t / 1e6)}m`;
}
function Ve(e) {
  return Number.isFinite(e) ? Math.round(e).toLocaleString("en-US") : "—";
}
function vs(e) {
  const t = new Date(e);
  if (Number.isNaN(t.getTime())) return "—";
  const n = String(t.getUTCDate()).padStart(2, "0"), a = String(t.getUTCMonth() + 1).padStart(2, "0");
  return `${n}.${a}.${t.getUTCFullYear()}`;
}
function ps(e) {
  return String(e + 1);
}
function gu(e, t) {
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
function hs(e) {
  if (e == null || !Number.isFinite(e) || e < 0) return "—";
  if (e < 1e3) return `${e} B`;
  const t = ["kB", "MB", "GB", "TB"];
  let n = e, a = -1;
  for (; n >= 1e3 && a < t.length - 1; )
    n /= 1e3, a += 1;
  return `${Tt(n)} ${t[a]}`;
}
function ms(e) {
  if (!e || !Number.isFinite(e)) return "—";
  if (e < 1e3) return `${Math.round(e)}ms`;
  const t = e / 1e3;
  return t < 60 ? `${Tt(t)}s` : `${Math.floor(t / 60)}m ${Math.round(t % 60)}s`;
}
function ys(e) {
  if (e == null || !Number.isFinite(e) || e <= 0)
    return "—";
  const t = Math.floor(e / 60);
  return t ? `${t}:${String(e % 60).padStart(2, "0")}` : `${e}s`;
}
function gs(e) {
  return e == null || !Number.isFinite(e) ? "—" : `${Math.round(e * 100)}%`;
}
function _s(e) {
  return e.replace(/\x1b\[[0-9;?]*[ -/]*[@-~]/g, "");
}
const la = "cards", ws = "table";
function et(e, t = {}) {
  const n = (s) => s && ra(s) ? s : void 0;
  if (e === null) return n(t.view) ?? la;
  const a = t.landing === "entity" ? n(t.view) : void 0;
  return n(t.entityView) ?? a ?? ws;
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
}, ks = {
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
function Ot(e, t = null) {
  if (e?.sorts?.length) return e.sorts;
  const n = /* @__PURE__ */ new Set(), a = [];
  for (const s of ia(e, t))
    !s.sort || n.has(s.sort) || (n.add(s.sort), a.push({ key: s.sort, label: (s.label ?? s.sort).toLowerCase() }));
  return a;
}
const bs = { key: Gt, label: Gt };
function Ee(e, t, n = null) {
  const a = Ot(e, n);
  return (t ? a.find((l) => l.key === t) : void 0) ?? a.find((l) => l.key === Gt) ?? a[0] ?? bs;
}
function $s(e) {
  switch (e.kind) {
    case "chips":
      return { kind: "chips", selected: [] };
    case "range":
      return { kind: "range", min: null, max: null };
    case "toggle":
      return { kind: "toggle", on: !1 };
  }
}
function xs(e) {
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
function _u(e) {
  return e.entity !== null;
}
function ca(e, t) {
  return e.entity === null && Ie(e.view, t) === "cards";
}
function Ss(e, t) {
  return t <= 0 ? 1 : Math.max(1, Math.ceil(e / t));
}
function gt(e, t = {}) {
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
function Cs(e, t) {
  const n = (t ? t.columns : e?.columns) ?? [], a = t ? "scoped" : "everything";
  return n.filter(
    (s) => s.role !== "tint" && ((s.when ?? "always") === "always" || s.when === a)
  );
}
const Ps = ["id", "entityKey", "entityLabel"];
function ue(e, t) {
  if (e.value) return e.value(t);
  const n = e.field ?? e.key;
  if (n !== void 0) {
    if (t.fields && n in t.fields) return t.fields[n];
    if (Ps.includes(n))
      return t[n];
  }
}
function On(e, t) {
  const n = e.key ?? e.field ?? e.label;
  return n?.trim() ? n.trim() : `column-${t}`;
}
function Es(e, t) {
  return e.id?.trim() ? e.id : `${e.entityKey || "row"}-${t}`;
}
function Ms(e, t) {
  if (e == null || e === "") return ke;
  if (t === "number") {
    const n = typeof e == "number" ? e : Number(e);
    return Number.isFinite(n) ? fs(n) : String(e);
  }
  return t === "date" ? vs(String(e)) : Array.isArray(e) ? e.length ? e.join(", ") : ke : String(e);
}
function Le(e, t) {
  const n = ue(e, t);
  return e.format ? e.format(n, t) : Ms(n, e.kind);
}
function Ls(e) {
  return typeof e == "number" ? Number.isFinite(e) ? String(e) : "" : typeof e == "string" ? e : Array.isArray(e) ? e.join(", ") : "";
}
function da(e, t) {
  const n = Le(e, t), a = Ls(ue(e, t));
  return a && a !== n ? a : n;
}
function yt(e, t) {
  return e ? Le(e, t) : "";
}
function Nn(e) {
  return e.align ? e.align : e.kind === "number" || e.kind === "ordinal" ? "right" : "left";
}
const Ts = {
  ordinal: "dc-table__num",
  number: "dc-table__number",
  date: "dc-table__date",
  status: "dc-table__state"
};
function An(e) {
  return [Ts[e.kind ?? "text"], e.class].filter(Boolean).join(" ");
}
function Xt(e) {
  if (e.truncate !== void 0) return e.truncate;
  const t = e.kind ?? "text";
  return t === "text" || t === "number" || t === "date";
}
const Os = /^([A-Za-z_][\w.-]*)\s*(>=|<=|:|=|>|<)\s*(.*)$/, In = "-?(?:\\d+\\.?\\d*|\\.\\d+)", Ns = new RegExp(`^(${In})?\\.\\.(${In})?$`);
function Nt(e) {
  const t = Ns.exec(e.trim());
  if (!t || t[1] === void 0 && t[2] === void 0) return null;
  const n = t[1] === void 0 ? null : Number(t[1]), a = t[2] === void 0 ? null : Number(t[2]);
  return n !== null && a !== null && n > a ? { min: a, max: n } : { min: n, max: a };
}
function As(e) {
  return `${e.min ?? ""}..${e.max ?? ""}`;
}
function Ke(e) {
  return e.kind === "field" && (e.comparator === ":" || e.comparator === "=") && Nt(e.value) !== null;
}
function Is(e) {
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
  for (const s of Is(t)) {
    const l = s.toUpperCase();
    if (l === "AND" || l === "&&") continue;
    if (l === "OR" || l === "||") {
      a.length && n.push(a), a = [];
      continue;
    }
    const r = s.length > 1 && s.startsWith("-"), i = r ? s.slice(1) : s, o = r ? { negated: !0 } : {}, c = Os.exec(i);
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
function Rs(e, t, n) {
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
function At(e) {
  const t = (e.key ?? e.field)?.toLowerCase();
  if (t !== void 0) return Rn.test(t) ? t : void 0;
  const n = e.label === void 0 ? void 0 : Me(e.label);
  return n !== void 0 && Rn.test(n) ? n : void 0;
}
function vn(e, t) {
  const n = Me(e);
  return !!t?.entities.some((a) => a.scope && Me(a.scope) === n);
}
function Bs(e, t, n) {
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
    return s && At(s);
  }) : e;
}
function va(e, t, n) {
  return t ? pa(e, (a) => {
    if (vn(a, n)) return;
    const s = (t.columns ?? []).find((l) => At(l) === a);
    return s && ma(s, t, n);
  }) : e;
}
function Hs(e, t, n) {
  if (!t || vn(e, n)) return;
  const a = t.facets.find((s) => s.key.toLowerCase() === e);
  return a ? a.label : (t.columns ?? []).find((s) => At(s) === e)?.label;
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
  if (!(!e || Bs(e, t, n)))
    return (t.columns ?? []).find(
      (a) => a.label !== void 0 && ut(a.label) === e
    );
}
function ma(e, t, n) {
  if (!t || e.label === void 0 || !At(e)) return;
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
function qs(e, t, n, a) {
  if (e.kind === "text") {
    const o = n.columns ?? [];
    return ["identity", "reference"].some((c) => {
      const d = pe(o, c), v = d ? ue(d, t) : void 0;
      return typeof v == "string" && Wt(v, e.value);
    });
  }
  const s = Rs(e.field, t, n);
  if (s === void 0) return a?.has(e.field) ? !1 : null;
  const l = Ke(e) ? Nt(e.value) : null;
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
  return !Number.isFinite(r) || !Number.isFinite(i) ? null : Fs(e.comparator, i, r);
}
function Hn(e, t, n, a) {
  const s = qs(e, t, n, a);
  return s === null ? !0 : e.negated ? !s : s;
}
function Fs(e, t, n) {
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
function Vs(e) {
  if (!e?.strictScopes) return null;
  let t = Fn.get(e);
  return t || (t = new Set(
    e.entities.flatMap((n) => n.scope ? [n.scope.toLowerCase()] : [])
  ), Fn.set(e, t)), t;
}
function Ds(e, t, n, a) {
  if (!e.length) return !0;
  const s = Vs(a);
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
function Ks(e) {
  if (!e.negated) return { ...e, negated: !0 };
  const { negated: t, ...n } = e;
  return n;
}
function he(e) {
  return e.filter((t) => t.length).map((t) => t.map(_e).join(" ")).join(" OR ");
}
function Ws(e, t, n) {
  return e.map((a, s) => s === t ? a.filter((l, r) => r !== n) : a).filter((a) => a.length);
}
function wu(e) {
  const t = re(e);
  if (t.length > 1) return { parts: [], text: e.trim() };
  const n = t[0] ?? [];
  return {
    parts: n.filter((a) => a.kind === "field"),
    text: n.filter((a) => a.kind === "text").map(_e).join(" ")
  };
}
function ku(e, t) {
  return [...e.map(_e), t.trim()].filter(Boolean).join(" ");
}
const Dn = (e, t) => e.toLowerCase() === t.toLowerCase();
function at(e, t) {
  return !!e.negated == !!t.negated && ya(e, t);
}
function zs(e, t) {
  return !!e.negated != !!t.negated && ya(e, t);
}
function ya(e, t) {
  return e.kind === "field" ? t.kind === "field" && e.field === t.field && e.comparator === t.comparator && Dn(e.value, t.value) : t.kind === "text" && Dn(e.value, t.value);
}
function js(e, t) {
  return t.filter((n) => !e.some((a) => at(a, n)));
}
function pn(e, t) {
  return ga(e, t, (n) => n);
}
function st(e, t) {
  return ga(
    e,
    t,
    (n, a) => n.filter((s) => !a.some((l) => zs(s, l)))
  );
}
const Us = /^[A-Za-z_][\w.-]*\s*(?:>=|<=|:|=|>|<)$/;
function Qs(e) {
  return he(
    re(e).map(
      (t) => t.filter(
        (n) => n.kind !== "text" || n.value !== "-" && !Us.test(n.value)
      )
    ).filter((t) => t.length > 0)
  );
}
function ga(e, t, n) {
  const a = re(e), s = re(t);
  return a.length ? s.length ? he(
    a.flatMap(
      (l) => s.map((r) => [...n(l, r), ...js(l, r)])
    )
  ) : he(a) : he(s);
}
const _a = (e) => e.kind === "date" || e.role === "updated";
function Gs(e) {
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
      c += 1, Ds(i, P, b, t) && d.push(P);
  const v = Ee(n, e.sort, t), _ = ia(n, t).find((b) => b.sort === v.key), p = r.undatedLast ? d.filter((b) => !Kn(b, _)) : d, g = r.undatedLast ? d.filter((b) => Kn(b, _)) : [];
  p.sort(Gs(_)), e.dir === "asc" && p.reverse();
  const h = g.length ? [...p, ...g] : p;
  return {
    // One page out of the middle. `total` stays the whole match, which is what
    // the shell counts pages with.
    rows: r.zeroIsAll && a <= 0 ? h.slice(s) : h.slice(s, s + a),
    total: d.length,
    unfiltered: d.length === c
  };
}
const _t = [
  "oklch(0.36 0.06 240)",
  "oklch(0.34 0.07 290)",
  "oklch(0.36 0.06 160)",
  "oklch(0.38 0.06 80)",
  "oklch(0.35 0.07 30)",
  "oklch(0.34 0.05 200)"
];
function bu(e) {
  return _t[Ye(e) % _t.length];
}
function ka(e, t) {
  return `${e}_${1e4 + t * 7}`;
}
const Ys = 7, Xs = 3;
function Js(e, t, n, a) {
  const s = (t * Ys + Ye(n)) % a, l = [];
  for (let r = 0; r < Math.min(Xs, a); r++)
    l.push(ka(e, (s + r) % a));
  return l;
}
function Zs(e, t) {
  switch (e.kind) {
    case "chips":
      return e.multiple ? el(e.options, t) : e.options[t % e.options.length] ?? "";
    case "range": {
      const n = Math.max(0, e.max - e.min);
      return e.min + (n === 0 ? 0 : t % (n + 1));
    }
    case "toggle":
      return t % 3 === 0;
  }
}
function el(e, t) {
  if (!e.length) return [];
  const n = 1 + (t >> 5) % Math.min(3, e.length), a = t % e.length, s = /* @__PURE__ */ new Set();
  for (let l = 0; l < n; l++) s.add((a + l) % e.length);
  return [...s].sort((l, r) => l - r).map((l) => e[l]);
}
function tl(e, t) {
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
      return _t[n % _t.length];
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
function nl(e, t = {}) {
  const n = t.population ?? 48, a = t.seed ?? "", s = t.now ?? /* @__PURE__ */ new Date("2026-08-25T00:00:00Z"), l = e.samples, r = t.scopes ?? [];
  if (!l.length) return [];
  const i = [];
  for (let o = 0; o < n; o++) {
    const c = l[o % l.length], d = Math.floor(o / l.length), v = Ye(`${a}:${e.key}:${c[0]}:${o}`), _ = ka(e.key, o), p = new Date(s.getTime() - v % 900 * 36e5).toISOString(), g = {};
    for (const h of e.columns ?? []) {
      const b = h.field ?? h.key;
      if (!b || h.value) continue;
      const P = tl(h, {
        hash: Ye(`${v}:${b}`),
        sample: c,
        revision: d,
        updatedAt: p
      });
      P !== void 0 && (g[b] = P);
    }
    for (const h of e.facets)
      g[h.key] = Zs(h, Ye(`${v}:${h.key}`));
    for (const [h, b] of r)
      g[h] = b === e.key ? _ : Js(b, o, h, n);
    i.push({ id: _, entityKey: e.key, entityLabel: e.label, fields: g });
  }
  return i;
}
function al(e = {}) {
  const t = /* @__PURE__ */ new Map(), n = (a, s) => {
    const l = t.get(a.key);
    if (l) return l;
    const r = e.scopes ?? s.entities.flatMap(
      (o) => o.scope ? [[o.scope, o.key]] : []
    ), i = nl(a, { ...e, scopes: r });
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
const je = "e", It = "v", hn = "s", mn = "d", Re = "q", Rt = "p", ba = "*", sl = [
  je,
  It,
  hn,
  mn,
  Re,
  Rt
], ll = [
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
function wt(e) {
  let t = encodeURIComponent(e);
  for (const [n, a] of ll) t = t.replace(n, a);
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
function rl(e) {
  return sl.includes(e);
}
function Bt(e, t) {
  if (!(!t || e.some((n) => n.key === t)))
    return e.find((n) => ut(n.label) === t);
}
function ol(e, t) {
  const n = ut(e.label);
  return Bt(t.entities, n)?.key === e.key ? n : e.key;
}
function $a(e, t) {
  return t ? tt(e, t) ?? Bt(e.entities, t) ?? null : null;
}
function il(e, t) {
  const n = ut(e.label);
  return Bt(t, n)?.key === e.key ? n : e.key;
}
function cl(e, t) {
  return t.some((n) => n.key === e) ? e : Bt(t, e)?.key ?? e;
}
function ul(e, t, n = {}) {
  const a = gt(t, n), s = new Map(yn(e)), l = s.get(je), r = l === void 0 ? a.entity : ge(l), i = r === ba ? null : $a(t, r), o = s.get(It), c = o && ra(ge(o)) ? ge(o) : et(i?.key ?? null, n), d = s.get(hn), v = Ee(
    i,
    d ? cl(ge(d), Ot(i, t)) : n.sort,
    t
  ), _ = s.get(mn), p = _ ? ge(_) === "asc" ? "asc" : "desc" : a.dir, g = s.get(Re), h = s.get(Rt), b = h === void 0 ? 1 : Number(ge(h)), P = Number.isFinite(b) ? Math.max(1, Math.floor(b)) : 1;
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
  const s = gt(t, n), l = tt(t, e.entity), r = yn(a).filter(([v]) => !rl(v)), i = [], o = (v, _) => i.push([v, wt(_)]), c = l?.key ?? null;
  if (c !== s.entity && o(je, l ? ol(l, t) : ba), e.view !== et(c, n) && o(It, e.view), e.sort !== s.sort) {
    const v = Ot(l, t), _ = v.find((p) => p.key === e.sort);
    o(hn, _ ? il(_, v) : e.sort);
  }
  e.dir !== s.dir && o(mn, e.dir), e.expr.trim() !== "" && o(Re, va(e.expr, l, t)), e.page > 1 && o(Rt, String(e.page));
  const d = [
    ...r.map(([v, _]) => [wt(v), _]),
    ...i
  ];
  return d.length ? `?${d.map(([v, _]) => _ === "" ? v : `${v}=${_}`).join("&")}` : "";
}
function $u(e) {
  const t = [];
  for (const [n, a] of Object.entries(e))
    for (const s of Array.isArray(a) ? a : [a]) {
      if (typeof s != "string") continue;
      const l = wt(n);
      t.push(s === "" ? l : `${l}=${wt(s)}`);
    }
  return t.length ? `?${t.join("&")}` : "";
}
function xu(e, t) {
  const n = new Map(yn(e)), a = n.get(Re), s = a === void 0 ? "" : ge(a);
  if (!t) return s;
  const l = n.get(je);
  return nt(
    s,
    l === void 0 ? null : $a(t, ge(l)),
    t
  );
}
function dt(e, t) {
  return xa(e, t.id);
}
function xa(e, t) {
  const n = e?.scope;
  return n ? Sa(n, t) : null;
}
function Sa(e, t) {
  return `${e}="${t.replace(/"/g, "")}"`;
}
function Su(e, t) {
  const n = typeof e == "string" ? e : e?.scope;
  if (!n) return null;
  const a = t.filter((s) => s.replace(/"/g, "") !== "").map((s) => Sa(n, s));
  return a.length ? a.join(" ") : null;
}
function Ht(e, t) {
  if (e.kind !== "field" || t.kind !== "field") return at(e, t);
  const n = (a) => a.comparator === ":" || a.comparator === "=";
  return at(e, { ...t, comparator: n(e) && n(t) ? e.comparator : t.comparator });
}
function kt(e, t) {
  return Ht(e, Ks(t));
}
function bt(e, t) {
  return dt(
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
  return s.some((i) => i.some((o) => Ht(o, a))) ? n : s.some((i) => i.some((o) => kt(o, a))) ? he(
    s.map(
      (i) => i.map((o) => kt(o, a) ? a : o)
    )
  ) : `${n} ${t}`;
}
function Ca(e) {
  if (!e) return null;
  const t = e.trim();
  return t ? t.startsWith("-") ? t.slice(1) : `-${t}` : null;
}
function gn(e, t) {
  if (!t || !e.trim()) return null;
  const [n] = re(t).flat();
  if (!n) return null;
  const a = re(e).flat();
  return a.some((s) => Ht(s, n)) ? n.negated ? "out" : "in" : a.some((s) => kt(s, n)) ? n.negated ? "in" : "out" : null;
}
function Pa(e, t) {
  if (!t || !e.trim()) return e;
  const [n] = re(t).flat();
  if (!n) return e;
  const a = re(e), s = a.map(
    (l) => l.filter((r) => !Ht(r, n) && !kt(r, n))
  );
  return s.every((l, r) => l.length === a[r]?.length) ? e : he(s);
}
function Jt(e, t, n) {
  return t ? n === null ? Pa(e, t) : We(e, n === "out" ? Ca(t) : t) : e;
}
function Zt(e, t) {
  const n = t.shiftKey ? `noopener,popup,width=${window.outerWidth},height=${window.outerHeight}` : "noopener";
  window.open(e, "_blank", n);
}
function Ea() {
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
  const l = bt(e, n);
  if (a.exclude) return zn(We(t.expr, Ca(l)), s);
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
function Ma(e, t) {
  const n = e?.scope?.toLowerCase();
  if (!n || e?.keepsScope || !t.trim()) return t;
  const a = re(t), s = a.map(
    (l) => l.filter((r) => r.kind !== "field" || r.field !== n)
  );
  return s.every((l, r) => l.length === a[r]?.length) ? t : he(s);
}
function La(e, t) {
  const n = t.toLowerCase();
  return e.entities.find((a) => a.scope?.toLowerCase() === n) ?? null;
}
function Ta(e, t, n) {
  if (!t || !n) return null;
  const a = La(e, t);
  return a ? { entity: a, id: n } : null;
}
function dl(e, t) {
  const n = [], a = /* @__PURE__ */ new Set();
  for (const s of t)
    for (const l of re(s).flat()) {
      if (l.kind !== "field" || l.negated) continue;
      const r = Ta(e, l.field, l.value);
      if (!r) continue;
      const i = `${r.entity.key}:${r.id.toLowerCase()}`;
      a.has(i) || (a.add(i), n.push({ entityKey: r.entity.key, id: r.id }));
    }
  return n;
}
function Cu(e, t, n = "cards") {
  return {
    // An expression with nothing in it is no parameter, as the shell writes it.
    [Re]: We(e, t) || void 0,
    [je]: void 0,
    [It]: n,
    [Rt]: void 0
  };
}
const Oa = Symbol("dc.shellContext");
function fl(e) {
  const t = e.liveQuery ? e : vl(e);
  return on(Oa, t), t;
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
  const e = rn(Oa, null);
  if (!e)
    throw new Error(
      "[appfr] No shell context found. Render this component inside <DataShell>."
    );
  return e;
}
const $t = Symbol("dc-shell-theme");
function tn(e) {
  return {
    read: () => ({
      theme: Oe(e.theme),
      accent: Oe(e.accent),
      tokens: Oe(e.tokens)
    })
  };
}
function pl(e, t) {
  t ? t.provide($t, tn(e)) : on($t, tn(e));
}
function hl(e) {
  const t = na();
  on($t, {
    ...tn(e),
    element: () => t?.proxy?.$el ?? null
  });
}
function _n(e) {
  const t = na(), n = rn($t, null), a = me(null);
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
const ml = /* @__PURE__ */ new Set([">", ">=", "<", "<="]);
function Na(e, t) {
  if (e.kind !== "field" || e.negated || e.field !== rt(t)) return !1;
  const n = e.comparator === ":" || e.comparator === "=";
  switch (t.kind) {
    case "range":
      return Ke(e) || ml.has(e.comparator);
    case "chips":
      return n && !Ke(e) && Aa(t.options, e.value) !== void 0;
    case "toggle":
      return n && yl(e.value);
  }
}
function Aa(e, t) {
  const n = t.toLowerCase();
  return e.find((a) => a.toLowerCase() === n);
}
function yl(e) {
  const t = e.toLowerCase();
  return t === "true" || t === "yes";
}
function Ia(e, t) {
  const n = (re(e)[0] ?? []).filter((a) => Na(a, t));
  switch (t.kind) {
    case "range": {
      let a = null, s = null;
      for (const l of n) {
        const r = Nt(l.value), i = Number(l.value);
        r ? (r.min !== null && (a = r.min), r.max !== null && (s = r.max)) : Number.isFinite(i) && (l.comparator.startsWith(">") ? a = i : s = i);
      }
      return { kind: "range", min: a, max: s };
    }
    case "chips": {
      const a = new Set(n.map((s) => Aa(t.options, s.value)));
      return { kind: "chips", selected: t.options.filter((s) => a.has(s)) };
    }
    case "toggle":
      return { kind: "toggle", on: n.length > 0 };
  }
}
function gl(e, t) {
  const n = rt(e);
  switch (t.kind) {
    case "range":
      return t.min === null && t.max === null ? [] : [{ kind: "field", field: n, comparator: ":", value: As(t) }];
    case "chips":
      return t.selected.map((a) => ({ kind: "field", field: n, comparator: "=", value: a }));
    case "toggle":
      return t.on ? [{ kind: "field", field: n, comparator: ":", value: "true" }] : [];
  }
}
function Ra(e, t, n) {
  const a = gl(t, n), s = re(e), l = (s.length ? s : [[]]).map((r) => [
    ...r.filter((i) => !Na(i, t)),
    ...a
  ]);
  return he(l);
}
function Pu(e, t) {
  return Ra(e, t, $s(t));
}
function _l(e, t) {
  return (t?.facets ?? []).some((n) => xs(Ia(e, n)));
}
const xt = "entity", ot = "expr", wl = { ">=": "≥", "<=": "≤", ">": ">", "<": "<" };
function Ue(e) {
  const t = Number(e);
  return Number.isFinite(t) && !Number.isInteger(t) ? Tt(t) : String(e);
}
function kl(e, t, n) {
  if (e.kind !== "field") return _e(e);
  const a = Hs(e.field, t, n);
  if (a === void 0) return _e(e);
  const s = e.negated ? "-" : "", l = Ke(e) ? Nt(e.value) : null;
  if (l) {
    const i = l.min !== null && l.max !== null ? `${Ue(l.min)} ≤ ${a} ≤ ${Ue(l.max)}` : l.max !== null ? `${a} ≤ ${Ue(l.max)}` : `${a} ≥ ${Ue(l.min)}`;
    return s + i;
  }
  const r = wl[e.comparator];
  return r ? `${s}${a} ${r} ${Ue(e.value)}` : _e({ ...e, field: a });
}
function St(e, t, n = null) {
  const a = [];
  return t && a.push({
    id: xt,
    label: `entity:${t.key}`,
    facetKey: xt
  }), re(e.expr).forEach((s, l) => {
    s.forEach((r, i) => {
      a.push({
        id: `${ot}:${l}:${i}`,
        label: kl(r, t, n),
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
function bl(e, t, n = null) {
  if (dn(e)) {
    const l = Ee(t, e.sort, n);
    return `everything · ${e.view} · ${l.label}`;
  }
  const a = St(e, t).filter((l) => l.facetKey !== ot).map((l) => l.label), s = e.expr.trim();
  return s && a.push(`"${s}"`), a.join(" · ");
}
function $l(e) {
  const { adapter: t } = e, n = f(() => Oe(e.schema)), a = f(() => Oe(e.defaults) ?? {}), s = f(() => ul(t.search.value, n.value, a.value)), l = f(() => tt(n.value, s.value.entity)), r = f(() => l.value ?? oa(n.value, a.value)), i = f(() => Ot(l.value, n.value)), o = f(() => Ee(l.value, s.value.sort, n.value)), c = ($, y) => {
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
    const T = Ra(s.value.expr, k, y(Ia(s.value.expr, k)));
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
    summary: f(() => bl(s.value, l.value, n.value)),
    terms: f(() => St(s.value, l.value, n.value)),
    isPristine: f(() => dn(s.value)),
    isEverything: f(() => s.value.entity === null),
    hasFacets: f(() => _l(s.value.expr, l.value)),
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
      if ($.facetKey === xt) {
        P(null);
        return;
      }
      if ($.facetKey === ot) {
        const y = Ws(re(s.value.expr), $.group ?? 0, $.index ?? 0);
        _({ expr: he(y) }, d());
      }
    },
    clearFilters() {
      _({ ...b(null), expr: "" }, d());
    },
    clearHref: () => p({ ...b(null), expr: "" }),
    reset() {
      c(gt(n.value, a.value), d());
    },
    homeHref: () => g(gt(n.value, a.value)),
    hrefFor($) {
      const y = { ...s.value, ...$ };
      return "entity" in $ && !("view" in $) && (y.view = Ln(s.value.view, s.value.entity, y.entity, a.value)), y.page = $.page ?? (Kt($) ? 1 : s.value.page), g(y);
    }
  };
}
const jn = 50;
function xl(e) {
  const t = me([]), n = H(0), a = H(0), s = H(!1), l = H(!1), r = me(null);
  let i = 0, o = null, c = null;
  const d = f(() => (e.query.value.page - 1) * e.limit.value), v = f(() => Ss(n.value, e.limit.value)), _ = f(() => Math.max(0, n.value - a.value)), p = () => {
    const I = e.query.value, B = e.within?.value.trim(), q = Ma(e.entity.value, I.expr);
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
    let M = 0, Q = !1;
    const O = (ne) => {
      M = ne, Q = !0, ie === void 0 && (n.value = ne);
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
        se() && (s.value = !1, Q && (n.value = M), h(q));
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
  }), Pt(() => {
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
const Cl = 150;
function Pl(e) {
  const t = e.delay ?? Cl, n = H(""), a = H("");
  let s = !1, l;
  const r = () => {
    clearTimeout(l), l = void 0;
  }, i = f(() => nt(Qs(a.value), e.entity.value, e.schema?.value)), o = f(() => i.value.trim() !== ""), c = f(
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
  return aa() && Pt(r), {
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
const El = 25, Ba = (e, t) => e.toLowerCase() === t.toLowerCase();
function Ml(e, t) {
  return e.find((n) => Ba(n.id, t));
}
function Ll(e) {
  const t = me(/* @__PURE__ */ new Map()), n = /* @__PURE__ */ new Set(), a = (i) => {
    if (i.facetKey !== ot) return null;
    const o = Ta(e.schema.value, i.field, i.value);
    return o ? { ...o, key: `${o.entity.key}:${o.id}` } : null;
  }, s = (i) => {
    const { entity: o, id: c } = i, d = e.query.value;
    return e.source.value.query({
      query: {
        ...d,
        entity: o.key,
        // The reference on its own. The rest of the query is about the rows on
        // screen, which are of another type entirely.
        expr: xa(o, c) ?? "",
        sort: Ee(o, d.sort, e.schema.value).key,
        page: 1
      },
      schema: e.schema.value,
      entity: o,
      limit: El,
      offset: 0
    });
  }, l = (i, o) => {
    const c = yt(pe(i.columns ?? [], "identity"), o);
    return c === ke || Ba(c, o.id) ? "" : c;
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
        const { reference: g } = o[p], h = Ml(_.rows, g.id);
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
const Tl = 4, Ol = 8, Nl = 180;
function Al(e, t, n, a = {}) {
  const s = a.gap ?? Tl, l = a.margin ?? Ol, r = a.flipBelow ?? Nl, i = a.side ?? "below", o = {
    below: n.height - e.bottom - s - l,
    above: e.top - s - l
  }, c = i === "below" ? "above" : "below", d = o[i] < r && o[c] > o[i] ? c : i, v = Math.min(a.maxHeight ?? 1 / 0, Math.max(0, o[d])), _ = Math.max(0, n.width - l * 2), p = Math.min(a.minWidth ?? e.width, _), g = Math.min(Math.max(t, p), _), h = a.align === "end" ? e.right - g : e.left, b = Math.max(l, Math.min(h, n.width - g - l));
  return d === "below" ? { side: d, left: b, top: e.bottom + s, maxHeight: v, minWidth: p, maxWidth: _ } : { side: d, left: b, bottom: n.height - e.top + s, maxHeight: v, minWidth: p, maxWidth: _ };
}
const Il = ["data-dc-theme", "data-dc-side"], Pe = [], Rl = /* @__PURE__ */ z({
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
      y && (o.value = Al(
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
    }), we($), (y, k) => e.open ? (u(), A(Et, {
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
      ], 16, Il)
    ], 8, ["to"])) : L("", !0);
  }
}), j = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [a, s] of t)
    n[a] = s;
  return n;
}, Bl = /* @__PURE__ */ j(Rl, [["__scopeId", "data-v-a688f2f7"]]), Hl = ["href"], ql = /* @__PURE__ */ z({
  __name: "PressLink",
  props: {
    href: {},
    selectable: { type: Boolean }
  },
  emits: ["press"],
  setup(e, { emit: t }) {
    const n = e, a = t;
    function s(i) {
      i.stopPropagation(), !Ea() && (n.href && en(i) ? Zt(n.href, i) : a("press", lt(i), i));
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
    ], 8, Hl)) : (u(), m("button", {
      key: 2,
      type: "button",
      class: "dc-press",
      onClick: r
    }, [
      G(i.$slots, "default", {}, void 0, !0)
    ]));
  }
}), ae = /* @__PURE__ */ j(ql, [["__scopeId", "data-v-e5165a68"]]), Ct = (e) => e.toLowerCase().replace(/\s+/g, ""), Fl = /(?:[^\s"]|"[^"]*"?)*$/, Vl = /^(-?)([^:=<>"\s-][^:=<>"\s]*)([:=])(.*)$/, Un = 4;
function Dl(e, t) {
  const n = Ct(t);
  return e.find((a) => rt(a) === n || Ct(a.label) === n);
}
function Kl(e) {
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
function Qn(e, t) {
  return Ct(e).includes(Ct(t));
}
function zl(e, t) {
  const n = Fl.exec(e)?.[0] ?? "", a = e.slice(0, e.length - n.length), s = [], l = Vl.exec(n);
  if (l) {
    const [, r, i, o, c] = l, d = Dl(t, i);
    if (!d) return [];
    const v = c.replace(/"/g, "").toLowerCase();
    for (const { value: _, hint: p } of Wl(d)) {
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
      s.push({ draft: a + c, label: c, hint: Kl(o), complete: !1 });
    }
  }
  return s.filter((r) => r.draft !== e);
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
}, ir = /* @__PURE__ */ z({
  __name: "ShellHeader",
  setup(e) {
    const t = Mt(), n = ee(), a = f(() => n.schema.value), s = f(() => {
      const C = n.within.value.trim();
      return C ? St({ ...n.query.value, expr: C }, null) : [];
    }), l = f(() => {
      const C = n.entity.value, N = C?.keepsScope ? void 0 : C?.scope?.toLowerCase();
      return n.terms.value.filter((V) => V.facetKey !== xt).map((V, D, Te) => {
        const Fe = Te[D - 1];
        return {
          term: V,
          or: Fe?.group !== void 0 && V.group !== void 0 && V.group !== Fe.group,
          idle: !!N && V.field?.toLowerCase() === N
        };
      });
    }), r = Ll({
      source: n.source,
      schema: n.schema,
      query: n.query,
      loading: n.loading,
      // The scope's parts as well as the query's: it names a record more often
      // than a typed term does, being what a record's own page is built on.
      terms: f(() => [...s.value, ...n.terms.value])
    });
    function i(C) {
      const N = La(a.value, C)?.scopeLabel ?? C;
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
      return St(
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
      return C.length ? zl(n.draft.value, C) : [];
    }), k = f(() => P.value && y.value.length > 0);
    te(y, () => {
      $.value = -1;
    });
    const T = `${Lt() ?? "dc-header"}-completions`;
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
    function Q(C) {
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
      C.isComposing || C.altKey || C.ctrlKey || C.metaKey || C.shiftKey || (C.key === "ArrowLeft" || C.key === "Home" ? Q(C) : C.key === "ArrowRight" || C.key === "End" ? O(C) : C.key === "Backspace" ? J(C) : C.key === "Delete" && ne(C));
    }
    function ve(C, N) {
      N && B.value !== null && (B.value = Math.max(0, B.value - 1)), n.removeTerm(C);
    }
    function xe(C) {
      C.target?.closest("button, input") || (C.preventDefault(), p.value?.focus(), se(l.value.length, "end"));
    }
    function ht() {
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
    ), te([l, q], Ce, { flush: "post" }), we(() => be?.disconnect()), (C, N) => (u(), m("div", jl, [
      S("div", Ul, [
        a.value.label && t.brand ? (u(), A(ae, {
          key: 0,
          class: "dc-header__domain",
          "data-dc-brand": "",
          title: "Home",
          href: w(n).homeHref(),
          onPress: N[0] || (N[0] = (V) => w(n).reset())
        }, {
          default: Y(() => [
            S("span", Ql, [
              G(C.$slots, "brand", {
                label: a.value.label
              }, void 0, !0)
            ]),
            S("span", Gl, E(a.value.label), 1)
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
        s.value.length ? (u(), m("span", Yl, [
          N[10] || (N[10] = S("span", { class: "dc-header__sr" }, "Within", -1)),
          (u(!0), m(W, null, X(s.value, (V) => (u(), m("span", {
            key: `scope:${V.id}`,
            class: "dc-within dc-mono dc-truncate",
            title: c(V)
          }, E(c(V)), 9, Xl))), 128))
        ])) : L("", !0),
        S("div", Jl, [
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
                S("span", er, [
                  (u(!0), m(W, null, X(V.entries, (D) => (u(), m(W, {
                    key: D.term.id
                  }, [
                    D.or ? (u(), m("span", tr, "or")) : L("", !0),
                    S("button", {
                      type: "button",
                      class: de(["dc-term dc-mono", { "dc-term--idle": D.idle, "dc-term--leaving": _.value }]),
                      title: d(D),
                      "aria-label": `Remove ${c(D.term)}`,
                      onMousedown: N[2] || (N[2] = Ae(() => {
                      }, ["prevent"])),
                      onClick: (Te) => ve(D.term, V.key === "before")
                    }, E(c(D.term)), 43, nr)
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
                  placeholder: oe.value ? "" : "Search…",
                  "aria-label": "Search",
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
                  onBlur: ht
                }, null, 46, ar)), [
                  [ts, w(n).draft.value]
                ]) : L("", !0)
              ], 64))), 128))
            ], 40, Zl)
          ], 32)
        ])
      ]),
      U(Bl, {
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
            S("span", lr, E(V.label), 1),
            V.hint ? (u(), m("span", rr, E(V.hint), 1)) : L("", !0)
          ], 42, sr))), 128))
        ]),
        _: 1
      }, 8, ["open", "anchor"]),
      t.actions ? (u(), m("div", or, [
        G(C.$slots, "actions", {}, void 0, !0)
      ])) : L("", !0)
    ]));
  }
}), Ha = /* @__PURE__ */ j(ir, [["__scopeId", "data-v-33d16be3"]]), cr = ["checked", "indeterminate"], qa = /* @__PURE__ */ z({
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
    }, null, 40, cr));
  }
}), ur = { class: "dc-pick" }, dr = ["id"], fr = ["id", "aria-expanded", "aria-labelledby", "data-dc-value"], vr = {
  key: 0,
  class: "dc-pick__icon",
  viewBox: "0 0 16 16",
  "aria-hidden": "true"
}, pr = ["d"], hr = { class: "dc-pick__label" }, mr = /* @__PURE__ */ z({
  __name: "PickControl",
  props: {
    modelValue: {},
    options: {},
    label: {},
    mono: { type: Boolean }
  },
  emits: ["update:modelValue", "open", "close"],
  setup(e, { emit: t }) {
    const n = e, a = t, s = Lt() ?? "dc-pick", l = H(null), r = H(null), i = H(null), o = H(!1), c = f(() => i.value !== null), d = H(null), v = f(
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
    return (k, T) => (u(), m("span", ur, [
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
        onClick: b,
        onKeydown: P
      }, [
        v.value?.icon ? (u(), m("svg", vr, [
          S("path", {
            d: v.value.icon
          }, null, 8, pr)
        ])) : L("", !0),
        S("span", hr, E(v.value?.label), 1)
      ], 42, fr),
      T[1] || (T[1] = S("svg", {
        class: "dc-pick__mark",
        viewBox: "0 0 16 16",
        "aria-hidden": "true"
      }, [
        S("path", { d: "M4 6l4 4 4-4" })
      ], -1)),
      i.value && d.value ? (u(), A(Et, {
        key: 0,
        to: d.value
      }, [
        U(w(is), {
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
}), nn = /* @__PURE__ */ j(mr, [["__scopeId", "data-v-0e31a711"]]), yr = {
  class: "dc-pager",
  "aria-label": "Pages"
}, gr = ["title"], _r = ["value", "onKeydown"], wr = {
  class: "dc-pager__total",
  "aria-hidden": "true"
}, kr = {
  class: "dc-pager__sr",
  "aria-live": "polite"
}, br = /* @__PURE__ */ z({
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
    return (p, g) => (u(), m("nav", yr, [
      U(ae, {
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
        }, null, 44, _r),
        S("span", wr, "/ " + E(s.value), 1)
      ], 8, gr),
      S("span", kr, E(l.value), 1),
      U(ae, {
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
}), $r = /* @__PURE__ */ j(br, [["__scopeId", "data-v-bdec7640"]]), xr = {
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
}, Mr = { class: "dc-actions__ops" }, Lr = ["disabled"], Tr = ["data-dc-operation", "disabled", "onClick"], Or = ["disabled"], Nr = /* @__PURE__ */ z({
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
      s.value ? (u(), m("span", xr, [
        r.value ? (u(), A(nn, {
          key: 0,
          class: "dc-actions__pick dc-actions__sort",
          label: "Sort",
          "model-value": w(n).sort.value.key,
          options: l.value,
          "onUpdate:modelValue": w(n).setSort
        }, null, 8, ["model-value", "options", "onUpdate:modelValue"])) : L("", !0),
        U(ae, {
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
      g.value && P.value ? (u(), m("div", Sr, [
        h.value ? (u(), m("span", Er, E(P.value), 1)) : (u(), m("label", Cr, [
          U(qa),
          S("span", Pr, E(P.value), 1)
        ])),
        p.value ? (u(), m("button", {
          key: 2,
          type: "button",
          class: de(["dc-actions__clear", { "dc-actions__clear--op": $.value }]),
          onClick: T[1] || (T[1] = (F) => w(n).clearSelection())
        }, " Clear ", 2)) : L("", !0)
      ])) : L("", !0),
      S("div", Mr, [
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
        }, E(y(c.value.duplicate)), 9, Lr)) : L("", !0),
        (u(!0), m(W, null, X(c.value?.operations ?? [], (F) => (u(), m("button", {
          key: F.key,
          type: "button",
          class: "dc-actions__op",
          "data-dc-operation": F.key,
          disabled: !p.value && F.selection !== !1,
          onClick: (ce) => w(n).operate(F.key)
        }, E(F.selection === !1 ? F.label : y(F.label)), 9, Tr))), 128)),
        c.value?.delete ? (u(), m("button", {
          key: 2,
          type: "button",
          class: "dc-actions__op dc-actions__danger",
          disabled: !p.value,
          onClick: T[4] || (T[4] = (F) => w(n).delete())
        }, E(y(c.value.delete)), 9, Or)) : L("", !0)
      ]),
      _.value ? (u(), A($r, {
        key: 2,
        class: "dc-actions__pages",
        "pages-note": e.pagesNote
      }, null, 8, ["pages-note"])) : L("", !0)
    ], 2)) : L("", !0);
  }
}), an = /* @__PURE__ */ j(Nr, [["__scopeId", "data-v-95bd2f88"]]);
function Gn(e) {
  return Math.max(0, e.total - (e.kept ?? 0));
}
function Ar(e) {
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
      const b = Ma(h, c.expr), P = _ ? pn(_, b) : b;
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
  return aa() && Pt(l), { counts: t, pristine: n, refresh: r, cancel: l };
}
const Ir = {
  key: 0,
  class: "dc-choosers"
}, Rr = "…", Br = /* @__PURE__ */ z({
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
    function l(p) {
      if (p.key === n.query.value.entity && a.value) return Ze((n.matched ?? n.total).value);
      if (s.pristine.value) return Yt(p);
      const h = s.counts.value.get(p.key);
      return h ? h.counted ? `${h.pending ? "~" : ""}${Ze(h.total)}` : Rr : Yt(p);
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
        icon: ks[p]
      }))
    ), d = f(() => Ie(n.query.value.view, t.views)), v = f(() => c.value.length > 1);
    function _(p) {
      n.setView(p);
    }
    return (p, g) => i.value || v.value ? (u(), m("div", Ir, [
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
}), Hr = /* @__PURE__ */ j(Br, [["__scopeId", "data-v-ac04b6df"]]);
function qr(e, t) {
  if (!e) return null;
  const n = ue(e, t);
  return typeof n == "string" && n.trim() ? n : null;
}
const Fr = (e) => e == null || typeof e == "string" && !e.trim();
function Vr(e, t) {
  const n = pe(t, "state"), a = pe(t, "tint");
  return {
    identity: yt(pe(t, "identity"), e),
    reference: yt(pe(t, "reference"), e),
    metrics: ua(t, "metric").map((s) => ({
      column: s,
      label: s.label ?? "",
      text: Le(s, e)
    })),
    facts: t.filter((s) => s.cardLabel && !Fr(ue(s, e))).map((s) => ({
      column: s,
      label: s.cardLabel,
      title: [s.label, s.hint].filter(Boolean).join(" — "),
      text: Le(s, e)
    })),
    state: n ? ue(n, e) ?? null : null,
    updated: yt(pe(t, "updated"), e),
    image: qr(pe(t, "image"), e),
    tint: a ? ue(a, e) ?? null : null
  };
}
function Fa(e, t, n, a, s = !1) {
  const l = n?.columns ?? [];
  return {
    row: e,
    key: Es(e, t),
    entityLabel: e.entityLabel,
    entity: n,
    columns: l,
    ordinal: ps(t),
    parts: Vr(e, l),
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
      (n, a) => Fa(
        n,
        e.offset.value + a,
        t.value.get(n.entityKey) ?? null,
        e.isPinned(n),
        e.isSelected(n)
      )
    )
  );
}
const Dr = ["data-dc-status", "data-dc-tone"], Kr = /* @__PURE__ */ z({
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
    }, E(n.value), 9, Dr));
  }
}), ze = /* @__PURE__ */ j(Kr, [["__scopeId", "data-v-686eb9b6"]]), Wr = { key: 1 }, zr = /* @__PURE__ */ z({
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
    }, 8, ["href", "title"])) : (u(), m("span", Wr, [
      G(d.$slots, "default", {}, () => [
        Z(E(r.value), 1)
      ], !0)
    ]));
  }
}), ft = /* @__PURE__ */ j(zr, [["__scopeId", "data-v-bbbd334b"]]), jr = ["data-dc-active", "aria-pressed", "aria-label"], Ur = /* @__PURE__ */ z({
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
    }, E(e.pinned ? "★" : "☆"), 9, jr));
  }
}), wn = /* @__PURE__ */ j(Ur, [["__scopeId", "data-v-ef63d763"]]), Qr = ["src"], Gr = /* @__PURE__ */ z({
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
    }, null, 40, Qr)) : L("", !0);
  }
}), qt = /* @__PURE__ */ j(Gr, [["__scopeId", "data-v-afaab300"]]), Yr = ["data-dc-standing", "title", "aria-label"], Xr = /* @__PURE__ */ z({
  __name: "QueryMark",
  props: {
    entry: {}
  },
  setup(e) {
    const t = e, n = ee(), a = f(() => dt(t.entry.entity, t.entry.row)), s = f(() => gn(n.query.value.expr, a.value)), l = f(
      () => s.value === "in" ? `The query narrows to ${t.entry.parts.identity} — press to lift that` : `The query leaves out ${t.entry.parts.identity} — press to lift that`
    );
    function r(i) {
      i.stopPropagation(), n.setExpression(Pa(n.query.value.expr, a.value));
    }
    return (i, o) => s.value ? (u(), m("button", {
      key: 0,
      type: "button",
      class: "dc-standing",
      "data-dc-standing": s.value,
      title: l.value,
      "aria-label": l.value,
      onClick: r
    }, E(s.value === "in" ? "+" : "−"), 9, Yr)) : L("", !0);
  }
}), kn = /* @__PURE__ */ j(Xr, [["__scopeId", "data-v-4b8d4166"]]), Jr = ["aria-label"], Zr = ["data-dc-standing", "data-dc-active", "aria-checked", "title", "aria-label", "onClick"], eo = /* @__PURE__ */ z({
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
      }, E(c.sign), 9, Zr))), 128))
    ], 8, Jr));
  }
}), sn = /* @__PURE__ */ j(eo, [["__scopeId", "data-v-5524dca6"]]), Va = /* @__PURE__ */ z({
  __name: "RowStanding",
  props: {
    entry: {}
  },
  setup(e) {
    const t = e, n = ee(), a = f(() => dt(t.entry.entity, t.entry.row)), s = f(() => gn(n.query.value.expr, a.value));
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
}), to = ["href", "title", "aria-label"], no = /* @__PURE__ */ z({
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
    }, "↗", 8, to)) : L("", !0);
  }
}), vt = /* @__PURE__ */ j(no, [["__scopeId", "data-v-b00f390d"]]), ao = /* @__PURE__ */ z({
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
}), pt = /* @__PURE__ */ j(ao, [["__scopeId", "data-v-05d2c233"]]), so = ["checked", "aria-label"], He = /* @__PURE__ */ z({
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
}, go = /* @__PURE__ */ z({
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
        S("div", lo, [
          S("span", ro, [
            w(t).selectable.value ? (u(), A(He, {
              key: 0,
              row: o.row,
              selected: o.selected,
              name: o.parts.identity
            }, null, 8, ["row", "selected", "name"])) : L("", !0),
            s(o) ? L("", !0) : (u(), m(W, { key: 1 }, [
              Z(E(o.ordinal), 1)
            ], 64)),
            a.value ? (u(), m("span", oo, E(o.entityLabel), 1)) : L("", !0)
          ]),
          S("span", io, [
            o.parts.state && !s(o) ? (u(), A(ze, {
              key: 0,
              status: o.parts.state
            }, null, 8, ["status"])) : L("", !0),
            s(o) ? (u(), A(kn, {
              key: 1,
              entry: o
            }, null, 8, ["entry"])) : (u(), A(Va, {
              key: 2,
              entry: o
            }, null, 8, ["entry"])),
            U(pt, { entry: o }, null, 8, ["entry"]),
            U(vt, { entry: o }, null, 8, ["entry"]),
            w(t).pinnable.value ? (u(), A(wn, {
              key: 3,
              row: o.row,
              name: o.parts.identity,
              pinned: o.pinned
            }, null, 8, ["row", "name", "pinned"])) : L("", !0)
          ])
        ]),
        U(ae, {
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
            S("span", co, [
              S("span", uo, E(o.parts.identity), 1),
              s(o) ? L("", !0) : (u(), m("span", fo, E(o.parts.reference), 1)),
              o.parts.facts.length ? (u(), m("span", vo, [
                (u(!0), m(W, null, X(o.parts.facts, (c) => (u(), m("span", {
                  key: c.column.key ?? c.label,
                  class: "dc-card__fact",
                  title: c.title || void 0
                }, [
                  S("span", ho, E(c.label), 1),
                  Z(" " + E(c.text), 1)
                ], 8, po))), 128))
              ])) : L("", !0)
            ])
          ]),
          _: 2
        }, 1032, ["href", "onPress"]),
        s(o) ? L("", !0) : (u(), m("div", mo, [
          (u(!0), m(W, null, X(o.parts.metrics.slice(0, 2), (c) => (u(), A(ft, {
            key: c.column.key ?? c.label,
            entry: o,
            column: c.column
          }, {
            default: Y(() => [
              Z(E(c.label) + " " + E(c.text), 1)
            ]),
            _: 2
          }, 1032, ["entry", "column"]))), 128)),
          o.parts.updated ? (u(), m("span", yo, E(o.parts.updated), 1)) : L("", !0)
        ]))
      ], 2))), 128))
    ], 2));
  }
}), Da = /* @__PURE__ */ j(go, [["__scopeId", "data-v-fd252138"]]), _o = { class: "dc-grid" }, wo = { class: "dc-tile__scrim" }, ko = { class: "dc-tile__top dc-mono" }, bo = { class: "dc-tile__chip" }, $o = { class: "dc-tile__caption" }, xo = { class: "dc-tile__secondary dc-truncate" }, So = { class: "dc-tile__primary" }, Co = /* @__PURE__ */ z({
  __name: "GridView",
  setup(e) {
    const t = ee(), n = Be();
    return (a, s) => (u(), m("div", _o, [
      (u(!0), m(W, null, X(w(n), (l) => (u(), m("div", {
        key: l.key,
        class: "dc-grid__cell"
      }, [
        U(ae, {
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
}), Ka = /* @__PURE__ */ j(Co, [["__scopeId", "data-v-89c40a9e"]]);
function Yn(e, t, n, a) {
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
  const r = [];
  let i = [], o = 0, c = 0;
  for (const d of e) {
    const v = t(d), _ = Math.max(v.ratio, Number.EPSILON), p = v.height && v.height > 0 ? Math.max(c, v.height) : c, g = jt(p, s), h = Yn(o + _, i.length + 1, a, l);
    if (h > g) {
      i.push(d), o += _, c = p;
      continue;
    }
    const b = jt(c, s), P = i.length ? Yn(o, i.length, a, l) : 1 / 0;
    P <= Po(c) && P - b < g - h ? (r.push({ items: i, height: P, filled: !0 }), i = [d], o = _, c = v.height && v.height > 0 ? v.height : 0) : (r.push({ items: [...i, d], height: h, filled: !0 }), i = [], o = 0, c = 0);
  }
  return i.length && r.push({ items: i, height: jt(c, s), filled: !1 }), r;
}
const Mo = { class: "dc-images" }, Lo = {
  key: 1,
  class: "dc-images__blank",
  "aria-hidden": "true"
}, To = 240, mt = 8, Oo = 1, No = /* @__PURE__ */ z({
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
      return h ? { ratio: h.width / h.height, height: h.height } : { ratio: Oo };
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
      const g = Eo(n.value, o, {
        width: d.value,
        height: To,
        gap: mt
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
          }), $ += k + mt;
        }
        b += P.height + mt;
      }
      return { boxes: h, height: g.length ? b - mt : 0 };
    });
    return (g, h) => (u(), m("div", Mo, [
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
          U(ae, {
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
              }, null, 8, ["style", "src", "onLoad", "onError"])) : (u(), m("span", Lo, E(b.parts.identity), 1))
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
}), Wa = /* @__PURE__ */ j(No, [["__scopeId", "data-v-2d267370"]]), Ao = { class: "dc-links" }, Io = { class: "dc-link__primary dc-truncate" }, Ro = { class: "dc-link__secondary dc-mono dc-truncate" }, Bo = /* @__PURE__ */ z({
  __name: "LinksView",
  setup(e) {
    const t = ee(), n = Be();
    return (a, s) => (u(), m("div", Ao, [
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
        U(ae, {
          class: "dc-link",
          href: w(t).pressHref(l.row),
          onPress: (r) => w(t).activate(l.row, r)
        }, {
          default: Y(() => [
            S("span", Io, E(l.parts.identity), 1),
            S("span", Ro, E(l.parts.reference), 1)
          ]),
          _: 2
        }, 1032, ["href", "onPress"])
      ]))), 128))
    ]));
  }
}), za = /* @__PURE__ */ j(Bo, [["__scopeId", "data-v-de6c9a0f"]]), Ho = {
  class: "dc-list",
  role: "list"
}, qo = { class: "dc-list__ordinal dc-mono" }, Fo = { class: "dc-list__identity" }, Vo = ["title"], Do = ["title"], Ko = {
  key: 1,
  class: "dc-list__entity dc-mono"
}, Wo = { class: "dc-list__metrics dc-mono" }, zo = { class: "dc-list__trailing" }, jo = /* @__PURE__ */ z({
  __name: "ListView",
  setup(e) {
    const t = ee(), n = Be(), a = f(() => t.isEverything.value);
    return (s, l) => (u(), m("div", Ho, [
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
        U(Va, {
          class: "dc-list__standing",
          entry: r
        }, null, 8, ["entry"]),
        U(ae, {
          class: "dc-list__open",
          href: w(t).pressHref(r.row),
          onPress: (i) => w(t).activate(r.row, i)
        }, {
          default: Y(() => [
            S("span", qo, E(r.ordinal), 1),
            S("span", Fo, [
              S("span", {
                class: "dc-list__primary dc-truncate",
                title: r.parts.identity
              }, E(r.parts.identity), 9, Vo),
              S("span", {
                class: "dc-list__secondary dc-mono dc-truncate",
                title: r.parts.reference || void 0
              }, E(r.parts.reference), 9, Do)
            ])
          ]),
          _: 2
        }, 1032, ["href", "onPress"]),
        a.value ? (u(), m("span", Ko, E(r.entityLabel), 1)) : L("", !0),
        S("span", Wo, [
          (u(!0), m(W, null, X(r.parts.metrics.slice(0, 2), (i) => (u(), A(ft, {
            key: i.column.key ?? i.label,
            entry: r,
            column: i.column
          }, null, 8, ["entry", "column"]))), 128))
        ]),
        S("span", zo, [
          r.parts.state ? (u(), A(ze, {
            key: 0,
            status: r.parts.state
          }, null, 8, ["status"])) : L("", !0),
          U(pt, { entry: r }, null, 8, ["entry"]),
          U(vt, { entry: r }, null, 8, ["entry"]),
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
}), ln = /* @__PURE__ */ j(jo, [["__scopeId", "data-v-a2cb9c3f"]]), Uo = { class: "dc-preview" }, Qo = { class: "dc-preview__pager dc-mono" }, Go = ["disabled"], Yo = { "aria-live": "polite" }, Xo = ["disabled"], Jo = {
  key: 0,
  class: "dc-preview__card"
}, Zo = ["src"], ei = { class: "dc-preview__body" }, ti = { class: "dc-preview__top" }, ni = { class: "dc-preview__badges" }, ai = { class: "dc-preview__entity dc-mono" }, si = { class: "dc-preview__marks" }, li = { class: "dc-preview__primary" }, ri = { class: "dc-preview__secondary dc-mono" }, oi = { class: "dc-preview__fields" }, ii = { class: "dc-preview__key" }, ci = { class: "dc-preview__value dc-mono" }, ui = /* @__PURE__ */ z({
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
    return (o, c) => (u(), m("div", Uo, [
      S("div", Qo, [
        S("button", {
          type: "button",
          class: "dc-preview__step",
          "aria-label": "Previous result",
          disabled: a.value === 0,
          onClick: c[0] || (c[0] = (d) => i(-1))
        }, " ‹ ", 8, Go),
        S("span", Yo, E(r.value), 1),
        S("button", {
          type: "button",
          class: "dc-preview__step",
          "aria-label": "Next result",
          disabled: a.value >= w(n).length - 1,
          onClick: c[1] || (c[1] = (d) => i(1))
        }, " › ", 8, Xo)
      ]),
      s.value ? (u(), m("div", Jo, [
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
          }, null, 8, Zo)) : (u(), m(W, { key: 1 }, [
            Z(" preview ")
          ], 64))
        ], 4),
        S("div", ei, [
          S("div", ti, [
            S("span", ni, [
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
              S("span", ai, E(s.value.entityLabel), 1)
            ]),
            S("span", si, [
              U(kn, { entry: s.value }, null, 8, ["entry"]),
              U(pt, { entry: s.value }, null, 8, ["entry"]),
              U(vt, { entry: s.value }, null, 8, ["entry"]),
              w(t).pinnable.value ? (u(), A(wn, {
                key: 0,
                row: s.value.row,
                name: s.value.parts.identity,
                pinned: s.value.pinned
              }, null, 8, ["row", "name", "pinned"])) : L("", !0)
            ])
          ]),
          S("div", null, [
            S("div", li, E(s.value.parts.identity), 1),
            S("div", ri, E(s.value.parts.reference), 1)
          ]),
          S("dl", oi, [
            (u(!0), m(W, null, X(l.value, (d) => (u(), m("div", {
              key: d.key,
              class: "dc-preview__field"
            }, [
              S("dt", ii, E(d.key), 1),
              S("dd", ci, [
                d.column && s.value ? (u(), A(ft, {
                  key: 0,
                  entry: s.value,
                  column: d.column
                }, null, 8, ["entry", "column"])) : (u(), m(W, { key: 1 }, [
                  Z(E(d.value), 1)
                ], 64))
              ])
            ]))), 128))
          ]),
          U(ae, {
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
}), ja = /* @__PURE__ */ j(ui, [["__scopeId", "data-v-59e0d33b"]]);
function di(e) {
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
function fi(e, t, n) {
  const a = di(t);
  return a.size ? e.filter((s) => {
    const l = (s.key ?? s.field)?.toLowerCase();
    return l === void 0 || !a.has(l) || s.role === "identity" || n.some((r) => Array.isArray(ue(s, r))) ? !0 : new Set(n.map((r) => Le(s, r))).size > 1;
  }) : e;
}
function vi() {
  const e = ee();
  return f(
    () => fi(
      Cs(e.schema.value, e.entity.value),
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
function Ua(e, t) {
  const n = e.narrowsOnPress.value ? dt(t.entity, t.row) : null;
  return n ? { term: n, name: t.parts.identity, alone: t.entity?.narrowsAlone === !0 } : null;
}
const pi = /* @__PURE__ */ z({
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
        U(ae, De({
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
}), Xn = /* @__PURE__ */ j(pi, [["__scopeId", "data-v-6e649daa"]]), hi = /* @__PURE__ */ new Set(["entitykey", "entitylabel"]), mi = /* @__PURE__ */ new Set(["ordinal", "image", "component", "date"]), yi = 4;
function Qa(e) {
  return (e.field ?? e.key)?.toLowerCase();
}
function Ga(e) {
  return e.narrow === !1 || e.role === "identity" || e.activate || e.click || e.drill ? !1 : !mi.has(e.kind ?? "text") && Qa(e) !== void 0;
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
  if (!Ga(e)) return [];
  const s = Qa(e);
  if (hi.has(s) && !e.value)
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
      term: { kind: "field", field: s, comparator: c ? "<=" : ">=", value: String(gi(l, c)) }
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
function ki(e, t) {
  let n = Jn.get(e);
  return n || Jn.set(e, n = /* @__PURE__ */ new Map()), n.has(t) || n.set(t, _i(t, e)), n.get(t);
}
const bi = /* @__PURE__ */ z({
  __name: "ColumnCell",
  props: {
    column: {},
    entry: {}
  },
  setup(e) {
    const t = e, n = ee(), a = f(() => t.column.kind ?? "text"), s = f(() => ue(t.column, t.entry.row)), l = f(
      () => a.value === "ordinal" ? t.entry.ordinal : Le(t.column, t.entry.row)
    ), r = f(() => s.value), i = f(() => t.column.activate === !0 || !!t.column.click), o = f(() => Xt(t.column)), c = f(() => da(t.column, t.entry.row)), d = f(() => {
      if (!Ga(t.column)) return [];
      const g = typeof s.value == "number" ? ki(n.rows.value, t.column) : null;
      return wi(t.column, t.entry.row, t.entry.entity ?? null, g);
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
        U(ze, { status: r.value }, null, 8, ["status"])
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
    }, null, 8, ["src", "style"])) : e.column.drill || e.column.click && e.column.role === "metric" ? (u(), A(ft, {
      key: 4,
      entry: e.entry,
      column: e.column
    }, null, 8, ["entry", "column"])) : i.value ? (u(), A(ae, De({
      key: 5,
      class: ["dc-table__open", { "dc-truncate": o.value }],
      href: p.value,
      title: c.value
    }, cn(e.column.activate ? w(bn)(w(n), w(Ua)(w(n), e.entry)) : {}), {
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
}), Zn = /* @__PURE__ */ j(bi, [["__scopeId", "data-v-d07057a1"]]), $i = {
  key: 0,
  class: "dc-table__none"
}, xi = { class: "dc-table__detail" }, Si = ["data-dc-wrap", "data-dc-row-links"], Ci = { "data-dc-stuck": "" }, Pi = {
  key: 0,
  class: "dc-table__pick",
  scope: "col"
}, Ei = {
  key: 1,
  class: "dc-table__standing",
  scope: "col"
}, Mi = ["data-dc-align", "data-dc-hide", "aria-sort", "title"], Li = {
  key: 2,
  class: "dc-table__head"
}, Ti = { "data-dc-scroll": "" }, Oi = ["onClick"], Ni = {
  key: 0,
  class: "dc-table__pick"
}, Ai = {
  key: 1,
  class: "dc-table__standing"
}, Ii = ["data-dc-align", "data-dc-hide", "title"], Ri = {
  key: 1,
  class: "dc-table__name"
}, Bi = /* @__PURE__ */ z({
  __name: "TableView",
  setup(e) {
    const t = ee(), n = Be(), a = vi();
    function s(M, Q) {
      if (!t.rowLinks?.value || Ea()) return;
      const O = t.pressHref(M);
      if (O && en(Q)) {
        Zt(O, Q);
        return;
      }
      t.activate(M, lt(Q));
    }
    const l = f(() => t.rowLinks?.value ? new Map(n.value.map((M) => [M.key, t.pressHref(M.row)])) : /* @__PURE__ */ new Map()), r = f(
      () => a.value.find((M) => M.role === "identity") ?? a.value[0]
    );
    function i(M, Q, O) {
      O.stopPropagation(), t.activate(M, Q);
    }
    function o(M) {
      const Q = ma(M, t.entity.value, t.schema.value), O = Q ? `Shortcut: ${Q}` : void 0;
      return [M.hint, O].filter(Boolean).join(`
`) || void 0;
    }
    const c = f(() => {
      const M = a.value.find((O) => O.scope);
      return M || ((t.entity.value ? !!t.entity.value.href : t.entities.value.some((O) => O.href)) ? a.value.find((O) => O.activate) : void 0);
    }), d = f(
      () => t.entity.value ? !!t.entity.value.scope : t.entities.value.some((M) => M.scope)
    ), v = (M) => dt(M.entity, M.row), _ = (M) => gn(t.query.value.expr, v(M));
    function p(M, Q) {
      t.setExpression(Jt(t.query.value.expr, v(M), Q));
    }
    const g = f(() => {
      const M = n.value.filter((O) => v(O) !== null), Q = M.filter((O) => O.selected);
      return Q.length ? Q : M;
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
          (Q, O) => Jt(Q, v(O), M),
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
    function oe(M, Q) {
      if (!(!Xt(M) || M.activate || M.click))
        return da(M, Q.row);
    }
    const se = f(
      () => a.value.length + (t.selectable.value ? 1 : 0) + (d.value ? 1 : 0)
    );
    return (M, Q) => w(a).length ? (u(), m("table", {
      key: 1,
      class: "dc-table",
      "data-dc-wrap": k.value ? "" : void 0,
      "data-dc-row-links": w(t).rowLinks?.value ? "" : void 0,
      style: le({ "--dc-table-tracks": se.value })
    }, [
      S("thead", Ci, [
        S("tr", null, [
          w(t).selectable.value ? (u(), m("th", Pi, [
            U(qa)
          ])) : L("", !0),
          d.value ? (u(), m("th", Ei, [
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
            O.header ? (u(), m("span", Li, [
              (u(), A(Je(O.header), {
                column: O,
                entity: w(t).entity.value
              }, null, 8, ["column", "entity"]))
            ])) : L("", !0)
          ], 14, Mi))), 128))
        ])
      ]),
      S("tbody", Ti, [
        (u(!0), m(W, null, X(w(n), (O) => (u(), m("tr", {
          key: O.key,
          class: "dc-table__row",
          onClick: (J) => s(O.row, J)
        }, [
          w(t).selectable.value ? (u(), m("td", Ni, [
            U(He, {
              row: O.row,
              selected: O.selected,
              name: O.parts.identity
            }, null, 8, ["row", "selected", "name"])
          ])) : L("", !0),
          d.value ? (u(), m("td", Ai, [
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
            }, cn(w(bn)(w(t), w(Ua)(w(t), O))), {
              onPress: (ye, ve) => i(O.row, ye, ve)
            }), null, 16, ["href", "tabindex", "aria-hidden", "aria-label", "onPress"])) : L("", !0),
            J === c.value ? (u(), m("span", Ri, [
              U(Zn, {
                column: J,
                entry: O
              }, null, 8, ["column", "entry"]),
              U(pt, { entry: O }, null, 8, ["entry"]),
              U(vt, { entry: O }, null, 8, ["entry"])
            ])) : (u(), A(Zn, {
              key: 2,
              column: J,
              entry: O
            }, null, 8, ["column", "entry"]))
          ], 14, Ii))), 128))
        ], 8, Oi))), 128))
      ])
    ], 12, Si)) : (u(), m("p", $i, [
      Q[2] || (Q[2] = S("span", { class: "dc-table__headline" }, "No columns declared", -1)),
      S("span", xi, [
        Z(E(ce.value) + " has no ", 1),
        Q[0] || (Q[0] = S("code", null, "columns", -1)),
        Q[1] || (Q[1] = Z(" in the schema, so there is no table to draw. ", -1))
      ])
    ]));
  }
}), Ya = /* @__PURE__ */ j(Bi, [["__scopeId", "data-v-285b3cf2"]]);
function Hi(e) {
  const t = me([]), n = H(!1), a = me(null);
  let s = 0;
  const l = (o, c, d, v, _) => ({
    entity: o,
    rows: e.limit.value > 0 ? c.rows.map((p, g) => Fa(p, g, o, e.isPinned(p.id))) : [],
    total: c.total,
    count: d ? Yt(o) : Ze(c.total),
    pinned: qi(v, c, _)
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
function qi(e, t, n) {
  const a = t.rows[0];
  if (t.total !== 1 || t.rows.length !== 1 || !a)
    return !1;
  const s = n.trim();
  if (!s)
    return !1;
  const l = bt(e, a);
  return !!l && We(s, l) === s;
}
const Fi = ["data-dc-pending", "data-dc-heads-only"], Vi = {
  key: 0,
  class: "dc-types__state",
  role: "alert"
}, Di = {
  key: 1,
  class: "dc-types__state",
  "aria-live": "polite"
}, Ki = {
  key: 2,
  class: "dc-types__state"
}, Wi = ["data-dc-empty"], zi = { class: "dc-type__name" }, ji = { class: "dc-type__count dc-mono" }, Ui = {
  key: 0,
  class: "dc-type__note dc-mono"
}, Qi = { class: "dc-type__sr" }, Gi = {
  key: 1,
  class: "dc-type__description"
}, Yi = {
  key: 0,
  class: "dc-type__empty"
}, Xi = { class: "dc-type__identity" }, Ji = { class: "dc-type__primary dc-truncate" }, Zi = { class: "dc-type__secondary dc-mono dc-truncate" }, ec = { class: "dc-type__trailing dc-mono" }, tc = { class: "dc-type__metric-value" }, nc = { class: "dc-type__metric-label" }, ac = {
  key: 0,
  class: "dc-type__date"
}, sc = /* @__PURE__ */ z({
  __name: "TypeCardsView",
  setup(e) {
    const t = ee(), { previews: n, pending: a, error: s } = Hi({
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
        (d) => !d.pinned && (d.total > 0 || o(d.entity) || !r.value && d.entity.create)
      )
    );
    return (d, v) => (u(), m("div", {
      class: "dc-types",
      "data-dc-pending": w(a) ? "true" : "false",
      "data-dc-heads-only": r.value ? "true" : "false"
    }, [
      G(d.$slots, "before", {}, void 0, !0),
      w(s) ? (u(), m("p", Vi, " Could not load results: " + E(w(s) instanceof Error ? w(s).message : "the data source failed."), 1)) : !c.value.length && w(a) ? (u(), m("p", Di, " Running query… ")) : c.value.length ? L("", !0) : (u(), m("p", Ki, E(l.value ? "Nothing matches this query" : "Nothing here yet"), 1)),
      (u(!0), m(W, null, X(c.value, (_) => (u(), m("section", {
        key: _.entity.key,
        class: "dc-type",
        "data-dc-empty": _.total ? "false" : "true"
      }, [
        U(ae, {
          class: "dc-type__head",
          href: w(t).entityHref(_.entity.key),
          onPress: (p) => w(t).setEntity(_.entity.key)
        }, {
          default: Y(() => [
            S("span", zi, E(_.entity.label), 1),
            S("span", ji, E(_.count), 1),
            _.entity.note ? (u(), m("span", Ui, E(_.entity.note), 1)) : L("", !0),
            v[0] || (v[0] = S("span", {
              class: "dc-type__go",
              "aria-hidden": "true"
            }, "→", -1)),
            S("span", Qi, "Show only " + E(_.entity.label.toLowerCase()), 1),
            _.entity.description ? (u(), m("span", Gi, E(_.entity.description), 1)) : L("", !0)
          ]),
          _: 2
        }, 1032, ["href", "onPress"]),
        _.total ? L("", !0) : (u(), m("p", Yi, E(l.value ? "No matches" : "Nothing here yet"), 1)),
        (u(!0), m(W, null, X(_.rows, (p) => (u(), m("div", {
          key: p.key,
          class: "dc-type__row"
        }, [
          U(ae, {
            class: "dc-type__open",
            href: w(t).pressHref(p.row),
            onPress: (g) => w(t).activate(p.row, g)
          }, {
            default: Y(() => [
              S("span", Xi, [
                S("span", Ji, E(p.parts.identity), 1),
                S("span", Zi, E(p.parts.reference), 1)
              ])
            ]),
            _: 2
          }, 1032, ["href", "onPress"]),
          S("span", ec, [
            (u(!0), m(W, null, X(p.parts.metrics.slice(0, 1), (g) => (u(), A(ft, {
              key: g.column.key ?? g.label,
              class: "dc-type__metric",
              entry: p,
              column: g.column
            }, {
              default: Y(() => [
                S("span", tc, E(g.text), 1),
                S("span", nc, E(g.label), 1)
              ]),
              _: 2
            }, 1032, ["entry", "column"]))), 128)),
            p.parts.updated ? (u(), m("span", ac, E(p.parts.updated), 1)) : L("", !0),
            U(kn, { entry: p }, null, 8, ["entry"]),
            U(pt, { entry: p }, null, 8, ["entry"]),
            U(vt, { entry: p }, null, 8, ["entry"])
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
      ], 8, Wi))), 128)),
      G(d.$slots, "after", {}, void 0, !0)
    ], 8, Fi));
  }
}), Xa = /* @__PURE__ */ j(sc, [["__scopeId", "data-v-154f2f3a"]]), lc = ["data-dc-pending", "data-dc-more"], rc = {
  key: 0,
  class: "dc-results__state dc-results__state--loading",
  "aria-live": "polite"
}, oc = {
  key: 3,
  class: "dc-results__state",
  role: "alert"
}, ic = { class: "dc-results__detail" }, cc = {
  key: 4,
  class: "dc-results__state",
  "aria-live": "polite"
}, uc = {
  key: 5,
  class: "dc-results__state"
}, dc = { class: "dc-results__detail" }, fc = /* @__PURE__ */ z({
  __name: "ResultsArea",
  props: {
    views: {},
    loading: { type: Boolean }
  },
  setup(e) {
    const t = e, n = ee(), a = Mt(), s = {
      list: ln,
      cards: Da,
      grid: Ka,
      images: Wa,
      table: Ya,
      links: za,
      preview: ja
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
      e.loading ? (u(), m("p", rc, [...k[1] || (k[1] = [
        S("span", { class: "dc-results__detail" }, "Loading…", -1)
      ])])) : l.value ? (u(), A(Xa, { key: 1 }, Qt({ _: 2 }, [
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
      }, null, 8, ["id"])) : d.value ? (u(), m("p", oc, [
        k[2] || (k[2] = S("span", { class: "dc-results__headline" }, "Could not load results", -1)),
        S("span", ic, E(w(n).error.value instanceof Error ? w(n).error.value.message : "The data source failed."), 1)
      ])) : !c.value && w(n).pending.value ? (u(), m("p", cc, [...k[3] || (k[3] = [
        S("span", { class: "dc-results__detail" }, "Running query…", -1)
      ])])) : c.value ? (u(), A(Je(i.value), { key: 6 })) : (u(), m("div", uc, [
        k[4] || (k[4] = S("span", { class: "dc-results__headline" }, "Nothing matches this query", -1)),
        S("span", dc, E(w(n).summary.value), 1),
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
    ], 12, lc));
  }
}), Ja = /* @__PURE__ */ j(fc, [["__scopeId", "data-v-bc18f2f9"]]), vc = ["data-dc-theme", "data-dc-value-press"], pc = {
  key: 0,
  class: "dc-shell__page"
}, hc = /* @__PURE__ */ z({
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
    const a = e, s = n, l = Pn(e, "pinned"), r = Pn(e, "selected"), i = Mt(), o = rn(sa, null), c = a.route || o ? null : cs(), d = a.route ?? o ?? c;
    we(() => c?.dispose?.());
    const v = H(!!i.page);
    ns(() => {
      v.value = !!i.page;
    });
    const _ = us(d, {
      detached: () => v.value && a.pageQuery === "detached",
      path: () => a.listPath
    }), p = f(() => al({ seed: a.schema.key })), g = f(() => a.source ?? p.value), h = $l({
      schema: () => a.schema,
      adapter: _,
      defaults: () => a.defaults,
      navigationMode: () => a.navigationMode,
      facetNavigationMode: () => a.facetNavigationMode
    }), b = f(() => a.within?.trim() ?? ""), P = Pl({
      query: h.query,
      entity: h.entity,
      schema: f(() => a.schema),
      setExpression: h.setExpression
    });
    te(h.query, (x) => s("query-change", x));
    const $ = f(() => dl(a.schema, [h.query.value.expr])), y = f(
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
    ), B = f(() => I.value ? 1 : a.limit), q = xl({
      source: g,
      query: P.live,
      schema: f(() => a.schema),
      entity: h.entity,
      limit: B,
      within: b
    }), ie = Sl({
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
    function Q(x) {
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
    function ht() {
      r.value.length && (r.value = []);
    }
    const Se = f(() => ({
      ids: [...r.value],
      rows: q.rows.value.filter((x) => ye.value.has(x.id)),
      entity: h.entity.value
    }));
    te(() => h.query.value.entity, ht);
    function qe(x, R, K = {}, $e) {
      const Sn = zt(a.schema, h.query.value, x, K, $e);
      K.exclude ? h.narrow(Sn, R?.key ?? h.query.value.entity) : P.release(() => h.narrow(Sn, R?.key ?? null, R ? void 0 : "cards")), s("drill", x, R, K);
    }
    function Ce(x) {
      return a.rowPress === "narrow" && bt(a.schema, x) !== null;
    }
    function be(x) {
      return a.schema.entities.find((K) => K.key === x.entityKey)?.href?.(x) || null;
    }
    const C = me(null);
    te(h.query, () => {
      C.value = null;
    });
    const N = fl({
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
      clearSelection: ht,
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
        const K = Q(x);
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
        const R = Q(x);
        return R !== null ? h.hrefFor({ view: "record", page: R }) : be(x) ?? a.activateHref?.(x) ?? null;
      },
      recordHref: be,
      drillHref: (x, R, K) => bt(a.schema, x) ? h.narrowHref(
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
    hl({ theme: () => a.theme, accent: () => a.accent, tokens: () => a.tokens });
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
        U(Ha, null, Qt({ _: 2 }, [
          i.page ? void 0 : {
            name: "lead",
            fn: Y(() => [
              U(Hr, {
                views: ce.value,
                "type-chooser": e.typeChooser
              }, null, 8, ["views", "type-chooser"])
            ]),
            key: "0"
          },
          i.brand ? {
            name: "brand",
            fn: Y((K) => [
              G(x.$slots, "brand", Dt(as(K)), void 0, !0)
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
      i.page ? (u(), m("div", pc, [
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
        U(Ja, {
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
    ], 12, vc));
  }
}), mc = /* @__PURE__ */ j(hc, [["__scopeId", "data-v-7ae0f737"]]), yc = ["data-dc-muted", "data-dc-collapsed"], gc = ["data-dc-collapsible"], _c = ["aria-expanded", "aria-controls"], wc = { class: "dc-shell-card__sr" }, kc = {
  key: 0,
  class: "dc-shell-card__identity"
}, bc = { class: "dc-shell-card__title dc-shell-card__name" }, $c = {
  key: 0,
  class: "dc-shell-card__ref dc-mono"
}, xc = {
  key: 1,
  class: "dc-shell-card__title"
}, Sc = {
  key: 2,
  class: "dc-shell-card__count dc-mono"
}, Cc = {
  key: 1,
  class: "dc-shell-card__aside"
}, Pc = ["data-dc-flush"], Ec = /* @__PURE__ */ z({
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
    const n = e, a = t, s = H(n.defaultCollapsed === !0), l = f(() => n.span === "all" ? { gridColumn: "1 / -1" } : void 0), r = Mt();
    function i(I) {
      return o(I?.() ?? []);
    }
    function o(I) {
      return I.some((B) => B.type === ss ? !1 : B.type === ls ? String(B.children ?? "").trim().length > 0 : B.type === W ? o(B.children ?? []) : !0);
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
    const P = Lt() ?? "dc-shell-card", $ = `${P}-body`, y = `${P}-foot`, k = f(
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
          S("span", wc, E(e.name || e.title || "Card"), 1)
        ], 8, _c)) : L("", !0),
        G(I.$slots, "head", {}, () => [
          e.name ? (u(), m("div", kc, [
            S("h2", bc, E(e.name), 1),
            p.value ? (u(), m("span", $c, [
              G(I.$slots, "reference", {}, () => [
                Z(E(e.reference), 1)
              ], !0)
            ])) : L("", !0)
          ])) : (u(), m("h2", xc, E(e.title), 1)),
          e.count !== void 0 ? (u(), m("span", Sc, E(e.count), 1)) : L("", !0)
        ], !0),
        d.value ? (u(), m("span", Cc, [
          G(I.$slots, "aside", {}, void 0, !0)
        ])) : L("", !0)
      ], 8, gc)) : L("", !0),
      v.value ? Ut((u(), m("div", {
        key: 1,
        id: $,
        class: "dc-shell-card__body",
        "data-dc-flush": e.flush ? "true" : "false"
      }, [
        G(I.$slots, "default", {}, void 0, !0)
      ], 8, Pc)), [
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
    ], 12, yc));
  }
}), Eu = /* @__PURE__ */ j(Ec, [["__scopeId", "data-v-073304c8"]]), Mc = ["aria-label"], Lc = ["aria-checked", "data-dc-active", "tabindex", "onClick", "onKeydown"], Tc = /* @__PURE__ */ z({
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
      }, E(o.label), 43, Lc))), 128))
    ], 8, Mc));
  }
}), Oc = /* @__PURE__ */ j(Tc, [["__scopeId", "data-v-63fb5482"]]), Nc = { class: "dc-fact__label" }, Ac = ["title"], Ic = /* @__PURE__ */ z({
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
      S("dt", Nc, [
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
      ], 8, Ac)
    ], 4));
  }
}), Rc = /* @__PURE__ */ j(Ic, [["__scopeId", "data-v-1f6d25e6"]]), Bc = /* @__PURE__ */ z({
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
      (u(!0), m(W, null, X(e.items, (l, r) => (u(), A(Rc, {
        key: `${r}:${l.label}`,
        label: l.label,
        value: l.value,
        title: l.title,
        wide: l.wide
      }, null, 8, ["label", "value", "title", "wide"]))), 128)),
      G(a.$slots, "default", {}, void 0, !0)
    ], 4));
  }
}), Mu = /* @__PURE__ */ j(Bc, [["__scopeId", "data-v-17455afa"]]), Hc = { class: "dc-counts" }, qc = ["data-dc-tone"], Fc = {
  key: 0,
  class: "dc-counts__empty"
}, Vc = /* @__PURE__ */ z({
  __name: "StatusCounts",
  props: {
    counts: {},
    empty: { default: ke }
  },
  setup(e) {
    const t = e, n = f(() => t.counts.filter((a) => a.count > 0));
    return (a, s) => (u(), m("span", Hc, [
      (u(!0), m(W, null, X(n.value, (l) => (u(), m("span", {
        key: l.label,
        class: "dc-counts__count",
        "data-dc-tone": l.tone ?? "neutral"
      }, E(l.count) + " " + E(l.label), 9, qc))), 128)),
      n.value.length === 0 ? (u(), m("span", Fc, E(e.empty), 1)) : L("", !0)
    ]));
  }
}), Lu = /* @__PURE__ */ j(Vc, [["__scopeId", "data-v-5553a9e2"]]), Dc = ["data-dc-copied", "title", "aria-label"], Kc = {
  key: 0,
  class: "dc-copy__mark",
  viewBox: "0 0 16 16",
  "aria-hidden": "true"
}, Wc = {
  key: 1,
  class: "dc-copy__mark",
  viewBox: "0 0 16 16",
  "aria-hidden": "true"
}, zc = 1500, jc = /* @__PURE__ */ z({
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
      }, zc), a("copied", i);
    }
    return we(() => clearTimeout(l)), (i, o) => (u(), m("button", {
      type: "button",
      class: "dc-copy",
      "data-dc-copied": s.value ? "true" : "false",
      title: s.value ? "Copied" : e.label,
      "aria-label": e.label,
      onClick: r
    }, [
      s.value ? (u(), m("svg", Wc, [...o[1] || (o[1] = [
        S("path", { d: "M3 8.5l3.2 3L13 4.5" }, null, -1)
      ])])) : (u(), m("svg", Kc, [...o[0] || (o[0] = [
        S("rect", {
          x: "5.5",
          y: "5.5",
          width: "8",
          height: "9",
          rx: "1.5"
        }, null, -1),
        S("path", { d: "M10.5 3.5v-1a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h1" }, null, -1)
      ])]))
    ], 8, Dc));
  }
}), Uc = /* @__PURE__ */ j(jc, [["__scopeId", "data-v-f4249d7f"]]), Qc = ["data-dc-copy", "data-dc-wrap", "data-dc-tone"], Gc = /* @__PURE__ */ z({
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
      e.copy ? (u(), A(Uc, {
        key: 0,
        class: "dc-code__copy",
        text: r,
        label: e.copyLabel,
        onCopied: o[0] || (o[0] = (c) => a("copied", c)),
        onError: o[1] || (o[1] = (c) => a("error", c))
      }, null, 8, ["label"])) : L("", !0)
    ], 8, Qc));
  }
}), Tu = /* @__PURE__ */ j(Gc, [["__scopeId", "data-v-67b371dd"]]), Yc = 24, Xc = /* @__PURE__ */ z({
  __name: "ShellLog",
  props: {
    fetchChunk: {},
    stripAnsi: { type: Boolean },
    maxHeight: { default: "460px" }
  },
  setup(e, { expose: t }) {
    const n = e, a = H(""), s = f(() => n.stripAnsi ? _s(a.value) : a.value), l = H(null);
    let r = 0, i = null;
    function o() {
      return i ??= c().finally(() => {
        i = null;
      }), i;
    }
    async function c() {
      const { chunk: _, offset: p } = await n.fetchChunk(r);
      if (r = p, !_) return;
      const g = l.value, h = !g || g.scrollTop + g.clientHeight >= g.scrollHeight - Yc;
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
}), Ou = /* @__PURE__ */ j(Xc, [["__scopeId", "data-v-2c86947e"]]), Jc = ["data-dc-theme"], Zc = ["aria-labelledby", "aria-label"], eu = {
  key: 1,
  class: "dc-dialog__actions"
}, Qe = [], tu = /* @__PURE__ */ z({
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
    const n = e, a = t, { theme: s, style: l, adopt: r } = _n(n), i = `${Lt() ?? "dc-dialog"}-title`, o = H(null);
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
    ), we($), (y, k) => e.open ? (u(), A(Et, {
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
          y.$slots.actions ? (u(), m("div", eu, [
            G(y.$slots, "actions", {}, void 0, !0)
          ])) : L("", !0)
        ], 10, Zc)
      ], 44, Jc)
    ], 8, ["to"])) : L("", !0);
  }
}), Nu = /* @__PURE__ */ j(tu, [["__scopeId", "data-v-0cccf313"]]), nu = 4500, au = 9e3, it = H([]);
let ea = 0;
function Za(e) {
  it.value = it.value.filter((t) => t.id !== e);
}
function es(e, t = "ok") {
  ea += 1;
  const n = ea;
  it.value = [...it.value, { id: n, message: e, kind: t }], setTimeout(() => Za(n), t === "err" ? au : nu);
}
function su(e) {
  es(e instanceof Error ? e.message : String(e), "err");
}
function lu() {
  return { toasts: rs(it), toast: es, toastError: su, dismiss: Za };
}
const ru = ["data-dc-theme"], ou = ["data-dc-kind", "role"], iu = /* @__PURE__ */ z({
  __name: "ShellToasts",
  props: {
    to: { default: "body" },
    theme: { default: void 0 },
    accent: { default: void 0 },
    tokens: { default: void 0 }
  },
  setup(e) {
    const t = e, { toasts: n } = lu(), { theme: a, style: s, adopt: l } = _n(t);
    return ct(l), (r, i) => (u(), A(Et, { to: e.to }, [
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
        }, E(o.message), 9, ou))), 128))
      ], 12, ru)
    ], 8, ["to"]));
  }
}), Au = /* @__PURE__ */ j(iu, [["__scopeId", "data-v-d970211c"]]);
function Iu(e, t) {
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
  return Pt(() => {
    s = !0, r();
  }, !0), { start: c, stop: r, polling: n };
}
function Ru(e, t = {}) {
  const n = t.key ?? ((l) => JSON.stringify(l)), a = me();
  let s = null;
  return os(() => {
    const l = e(), r = n(l);
    r !== s && (s = r, a.value = l);
  }), a;
}
function Bu(e = {}) {
  return { key: "ordinal", kind: "ordinal", label: "#", width: "52px", ...e };
}
function Hu(e = {}) {
  return { key: "status", role: "state", kind: "status", label: "State", sort: "state", width: "104px", ...e };
}
function qu(e = {}) {
  return { key: "tint", role: "tint", ...e };
}
function Fu(e = {}) {
  return { key: "picture", role: "image", kind: "image", width: "56px", height: "40px", ...e };
}
function Vu(e, t = {}) {
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
function Du(e, t = {}) {
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
function Ku(e, t, n = {}) {
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
function Wu(e, t, n = {}) {
  return { key: e, kind: "date", label: t, sort: e, mono: !0, muted: !0, ...n };
}
function zu(e = {}) {
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
function ju(e, t, n = {}) {
  return { key: e, label: t, sort: e, truncate: !0, hideBelow: 900, ...n };
}
function Uu(e, t, n, a = {}) {
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
function Qu(e) {
  const t = Ft(e);
  return Number.isFinite(t) && t > 0 ? hs(t) : ke;
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
  return Number.isFinite(t) ? gs(t) : ke;
}
function cu(e) {
  if (e <= 0) return 0;
  const t = 10 ** Math.floor(Math.log10(e));
  for (const n of [1, 2, 5])
    if (e <= n * t) return n * t;
  return 10 * t;
}
function uu(e, t) {
  const n = /* @__PURE__ */ new Set();
  for (const a of e) {
    const s = a.fields[t];
    for (const l of Array.isArray(s) ? s : [s])
      typeof l == "string" && l && n.add(l);
  }
  return [...n].sort((a, s) => a.localeCompare(s));
}
function du(e, t) {
  let n = 0;
  for (const a of e) {
    const s = a.fields[t];
    typeof s == "number" && s > n && (n = s);
  }
  return n;
}
function Ju(e, t, n, a = {}) {
  return {
    kind: "chips",
    key: t,
    label: n,
    options: uu(e, t),
    ...a.multiple ? { multiple: !0 } : {}
  };
}
function Zu(e, t, n) {
  return { kind: "range", key: t, label: n, min: 0, max: cu(du(e, t)) };
}
function ed(e, t, n) {
  return { kind: "toggle", key: e, label: t, text: n };
}
function td(e) {
  return e.filter((t) => t.kind === "chips" ? t.options.length > 1 : t.kind === "range" ? t.max > 0 : !0);
}
function nd(e = "", t = "/") {
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
function ad(e) {
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
function sd(e, t, n = "/") {
  return (a) => {
    const s = a.params[t], l = Array.isArray(s) ? s.join("/") : s ?? "", r = a.query[Re], i = typeof r == "string" ? r : "", o = `${e}="${l.replace(/"/g, "")}"`;
    return { path: n, query: { ...a.query, [Re]: We(i, o) } };
  };
}
function ld(e, t = "/") {
  return (n) => ({ path: t, query: { ...n.query, [je]: e } });
}
function rd(e) {
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
function od(e, t) {
  return e.query({ ...t, limit: Number.MAX_SAFE_INTEGER, offset: 0 }).rows;
}
const fu = {
  DataShell: mc,
  ShellHeader: Ha,
  RecordActions: an,
  ResultsArea: Ja,
  SegmentedControl: Oc,
  StatusPill: ze,
  ListView: ln,
  CardsView: Da,
  GridView: Ka,
  ImagesView: Wa,
  TableView: Ya,
  LinksView: za,
  PreviewView: ja,
  TypeCardsView: Xa
}, id = {
  install(e, t = {}) {
    const n = t.prefix ?? "";
    for (const [a, s] of Object.entries(fu))
      e.component(`${n}${a}`, s);
    t.route && e.provide(sa, t.route), (t.theme || t.accent || t.tokens) && pl({ theme: t.theme, accent: t.accent, tokens: t.tokens }, e);
  }
};
export {
  yu as COLUMN_BREAKPOINTS,
  mu as COLUMN_ROLES,
  Da as CardsView,
  Zn as ColumnCell,
  Uc as CopyButton,
  ws as DEFAULT_ENTITY_VIEW,
  Gt as DEFAULT_SORT,
  la as DEFAULT_VIEW,
  Cl as DRAFT_DELAY,
  mc as DataShell,
  ke as EMPTY_CELL,
  ba as ENTITY_ALL,
  xt as ENTITY_TERM,
  ot as EXPRESSION_TERM,
  Ka as GridView,
  id as HeaderContentLayoutPlugin,
  Wa as ImagesView,
  za as LinksView,
  ln as ListView,
  _t as MOCK_TINTS,
  ft as MetricDrill,
  vt as OpenMark,
  mn as PARAM_DIR,
  je as PARAM_ENTITY,
  Re as PARAM_EXPR,
  Rt as PARAM_PAGE,
  hn as PARAM_SORT,
  It as PARAM_VIEW,
  hu as PILL_TONES,
  Nl as POPOVER_FLIP_BELOW,
  Tl as POPOVER_GAP,
  Ol as POPOVER_MARGIN,
  wn as PinStar,
  ja as PreviewView,
  kn as QueryMark,
  Ge as RECORD_STATUSES,
  fn as RESULT_FIELDS,
  sa as ROUTE_ADAPTER_KEY,
  an as RecordActions,
  Hr as RecordChoosers,
  Ja as ResultsArea,
  Oa as SHELL_CONTEXT_KEY,
  $t as SHELL_THEME_KEY,
  pt as ScopeMark,
  Oc as SegmentedControl,
  He as SelectTick,
  Eu as ShellCard,
  Tu as ShellCode,
  Nu as ShellDialog,
  Rc as ShellFact,
  Mu as ShellFacts,
  Ha as ShellHeader,
  Ou as ShellLog,
  $r as ShellPager,
  Bl as ShellPopover,
  Au as ShellToasts,
  sn as StandingControl,
  Lu as StatusCounts,
  ze as StatusPill,
  au as TOAST_ERROR_MS,
  nu as TOAST_MS,
  Ya as TableView,
  Xa as TypeCardsView,
  ks as VIEW_ICONS,
  un as VIEW_KINDS,
  Tn as VIEW_LABELS,
  We as addTerm,
  pn as andExpression,
  Qu as bytesCell,
  da as cellFull,
  wi as cellNarrowings,
  Le as cellText,
  yt as cellTextOf,
  ue as cellValue,
  Kt as changesResults,
  Ju as chipsFrom,
  Nn as columnAlign,
  An as columnClass,
  On as columnKey,
  Ga as columnNarrows,
  ut as columnShortcut,
  ma as columnShortcutOf,
  Xt as columnTruncates,
  Cs as columnsFor,
  va as compactShortcuts,
  zl as completeDraft,
  Ss as countPages,
  cs as createHistoryAdapter,
  nd as createMemoryAdapter,
  rd as createMemoryDataSource,
  al as createMockDataSource,
  ad as createVueRouterAdapter,
  Wu as dateColumn,
  Ms as defaultCellText,
  gt as defaultQuery,
  et as defaultViewFor,
  us as detachableAdapter,
  zt as drillExpression,
  Gu as durationCell,
  Yu as elapsedCell,
  $s as emptyFacetValue,
  ol as entityAddress,
  zu as entityColumn,
  Yt as entityCount,
  ld as entityRedirect,
  Ca as excludingTerm,
  nt as expandShortcuts,
  ju as facetColumn,
  rt as facetField,
  Ia as facetValue,
  Hs as fieldHeading,
  Sa as fieldTerm,
  tt as findEntity,
  $a as findEntityByAddress,
  Ee as findSort,
  Uu as flagColumn,
  Ye as fnv1a,
  oa as focusEntity,
  hs as formatBytes,
  Ze as formatCount,
  vs as formatDate,
  gu as formatDateTime,
  Tt as formatDigits,
  ms as formatDuration,
  ys as formatElapsed,
  he as formatExpression,
  Ve as formatInteger,
  fs as formatMetric,
  ps as formatOrdinal,
  gs as formatPercent,
  As as formatRange,
  _e as formatTerm,
  nl as generateRows,
  _l as hasActiveFacets,
  Vu as identityColumn,
  Su as idsExpression,
  _u as isEntityScoped,
  xs as isFacetActive,
  dn as isPristineQuery,
  Ke as isRangeTerm,
  ca as isTypeCardsQuery,
  ra as isViewKind,
  ku as joinExpression,
  Pa as liftTerm,
  Ds as matchesExpression,
  Ku as metricColumn,
  Cu as narrowPatch,
  Ks as negateTerm,
  cu as niceMax,
  fe as normalizeSearch,
  _i as numberRange,
  zs as oppositeTerm,
  Bu as ordinalColumn,
  re as parseExpression,
  ul as parseQuery,
  Xu as percentCell,
  Fu as pictureColumn,
  Al as placePopover,
  Vr as presentParts,
  Fa as presentRow,
  lt as pressOptions,
  fl as provideShellContext,
  pl as provideShellTheme,
  od as queryAll,
  Zu as rangeFrom,
  Nt as rangeOf,
  Qs as readDraft,
  xu as readExpression,
  sd as recordRedirect,
  xa as recordTerm,
  dl as recordsIn,
  Du as referenceColumn,
  st as refineExpression,
  Ie as resolveView,
  pe as roleColumn,
  ua as roleColumns,
  Es as rowKey,
  at as sameTerm,
  dt as scopeTerm,
  bt as scopeTermFor,
  La as scopedEntity,
  $u as searchFromQuery,
  Wn as serializeQuery,
  il as sortAddress,
  Ot as sortsFor,
  wu as splitExpression,
  Hu as stateColumn,
  _s as stripAnsi,
  bl as summarizeQuery,
  St as summaryTerms,
  gn as termStanding,
  qu as tintColumn,
  bu as tintFor,
  ed as toggleFacet,
  vi as useColumns,
  Pl as useDraft,
  Ar as useEntityCounts,
  Hi as useEntityPreviews,
  _n as useLayerTheme,
  Iu as usePoll,
  Be as usePresentedRows,
  $l as useQueryState,
  Ll as useRecordNames,
  xl as useResults,
  ee as useShellContext,
  Ru as useStableSchema,
  lu as useToasts,
  td as usefulFacets,
  Ln as viewAcross,
  Ra as withFacetValue,
  Jt as withStanding,
  zn as withWhere,
  Pu as withoutFacet,
  Ma as withoutOwnScope,
  Ws as withoutTerm
};
