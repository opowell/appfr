import { ref as H, computed as f, inject as sn, provide as ln, getCurrentInstance as Gn, shallowRef as pe, toValue as Ee, watch as ae, onScopeDispose as xt, getCurrentScope as Xn, defineComponent as K, onMounted as lt, onBeforeUnmount as ge, openBlock as u, createBlock as I, Teleport as St, createElementVNode as S, mergeProps as qe, unref as w, renderSlot as Y, createCommentVNode as T, nextTick as Qe, createElementBlock as h, withKeys as Me, useSlots as Ct, useId as Pt, withCtx as G, toDisplayString as L, createTextVNode as te, Fragment as D, renderList as J, withModifiers as Le, normalizeClass as oe, withDirectives as Wt, normalizeStyle as le, vModelText as Ya, createVNode as j, reactive as bn, toHandlers as rn, resolveDynamicComponent as Ye, createSlots as zt, useModel as $n, onBeforeUpdate as Ga, normalizeProps as qt, guardReactiveProps as Xa, mergeModels as xn, vShow as Sn, Comment as Ja, Text as Za, readonly as es, watchEffect as ts } from "vue";
import { MenuList as ns } from "menu-bar";
const on = ["list", "cards", "grid", "images", "table", "links", "preview"], je = ["ok", "running", "queued", "review", "failed"], au = [...je, "neutral", "accent"], su = [
  "identity",
  "reference",
  "metric",
  "state",
  "updated",
  "image",
  "tint"
], lu = [480, 620, 760, 900, 1100], Jn = Symbol("dc.routeAdapter");
function ue(e) {
  if (!e) return "";
  const t = e.replace(/^[?]/, "");
  return t ? `?${t}` : "";
}
function as() {
  const e = typeof window < "u", t = H(e ? ue(window.location.search) : ""), n = H(e ? window.location.pathname : "/"), a = () => {
    t.value = ue(window.location.search), n.value = window.location.pathname;
  };
  e && window.addEventListener("popstate", a);
  const s = (l, o, i) => {
    const r = ue(l);
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
      return e ? o !== void 0 && o !== window.location.pathname ? `${o}${ue(l)}` : `${window.location.pathname}${ue(l)}${window.location.hash}` : `${o ?? n.value}${ue(l)}`;
    },
    push: (l, o) => s(l, "push", o),
    replace: (l, o) => s(l, "replace", o),
    dispose: () => {
      e && window.removeEventListener("popstate", a);
    }
  };
}
function ss(e, t) {
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
      return e.href ? e.href(l, i) : `${i ?? e.path.value}${ue(l)}`;
    }
  };
}
function Ue(e) {
  let t = 2166136261;
  for (let n = 0; n < e.length; n++)
    t ^= e.charCodeAt(n), t = Math.imul(t, 16777619);
  return Math.abs(t);
}
function ls(e) {
  if (!Number.isFinite(e)) return "—";
  const t = Math.abs(e);
  return t >= 1e6 ? `${(e / 1e6).toFixed(1)}m` : t >= 1e3 ? `${(e / 1e3).toFixed(1)}k` : String(Math.round(e));
}
function pt(e) {
  if (!Number.isFinite(e)) return "—";
  const t = Math.round(e), n = Math.abs(t);
  return n < 1e3 ? String(t) : n < 9950 ? `${(t / 1e3).toFixed(1)}k` : n < 999500 ? `${Math.round(t / 1e3)}k` : `${(t / 1e6).toFixed(1)}m`;
}
function He(e) {
  return Number.isFinite(e) ? Math.round(e).toLocaleString("en-US") : "—";
}
function rs(e) {
  const t = new Date(e);
  if (Number.isNaN(t.getTime())) return "—";
  const n = String(t.getUTCDate()).padStart(2, "0"), a = String(t.getUTCMonth() + 1).padStart(2, "0");
  return `${n}.${a}.${t.getUTCFullYear()}`;
}
function os(e) {
  return String(e + 1);
}
function ru(e, t) {
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
function is(e) {
  if (e == null || !Number.isFinite(e) || e < 0) return "—";
  if (e < 1e3) return `${e} B`;
  const t = ["kB", "MB", "GB", "TB"];
  let n = e, a = -1;
  for (; n >= 1e3 && a < t.length - 1; )
    n /= 1e3, a += 1;
  return `${n < 100 ? n.toFixed(1) : Math.round(n)} ${t[a]}`;
}
function cs(e) {
  if (!e || !Number.isFinite(e)) return "—";
  if (e < 1e3) return `${Math.round(e)}ms`;
  const t = e / 1e3;
  return t < 60 ? `${t.toFixed(1)}s` : `${Math.floor(t / 60)}m ${Math.round(t % 60)}s`;
}
function us(e) {
  if (e == null || !Number.isFinite(e) || e <= 0)
    return "—";
  const t = Math.floor(e / 60);
  return t ? `${t}:${String(e % 60).padStart(2, "0")}` : `${e}s`;
}
function ds(e) {
  return e == null || !Number.isFinite(e) ? "—" : `${Math.round(e * 100)}%`;
}
function fs(e) {
  return e.replace(/\x1b\[[0-9;?]*[ -/]*[@-~]/g, "");
}
const Zn = "cards", vs = "table";
function Ge(e, t = {}) {
  const n = (s) => s && ea(s) ? s : void 0;
  if (e === null) return n(t.view) ?? Zn;
  const a = t.landing === "entity" ? n(t.view) : void 0;
  return n(t.entityView) ?? a ?? vs;
}
function Cn(e, t, n, a = {}) {
  return a.viewAcrossTypes !== "default" && e !== Ge(t, a) ? e : Ge(n, a);
}
const jt = "updated";
function ea(e) {
  return typeof e == "string" && (e === "record" || on.includes(e));
}
const Pn = {
  list: "List",
  cards: "Cards",
  grid: "Grid",
  images: "Images",
  table: "Table",
  links: "Links",
  preview: "Preview",
  record: "Record"
}, ps = {
  list: "M6 4h7.5M6 8h7.5M6 12h7.5M2.5 4h.01M2.5 8h.01M2.5 12h.01",
  cards: "M2.5 2.5h11v4.5h-11zM2.5 9h11v4.5h-11z",
  grid: "M2.5 2.5h4.5v4.5h-4.5zM9 2.5h4.5v4.5H9zM2.5 9h4.5v4.5h-4.5zM9 9h4.5v4.5H9z",
  images: "M2.5 3h11v10h-11zM2.5 11l3.5-3.5 2.5 2.5 2-2 3 3M10.5 5.75h.01",
  table: "M2.5 3h11v10h-11zM2.5 6.5h11M2.5 9.75h11M6.5 6.5V13",
  links: "M6.75 9.25a2.5 2.5 0 0 0 3.54 0l2.12-2.12a2.5 2.5 0 0 0-3.54-3.54l-.7.7M9.25 6.75a2.5 2.5 0 0 0-3.54 0L3.59 8.87a2.5 2.5 0 0 0 3.54 3.54l.7-.7",
  preview: "M1.5 8S4 3.5 8 3.5 14.5 8 14.5 8 12 12.5 8 12.5 1.5 8 1.5 8zM6 8a2 2 0 1 0 4 0 2 2 0 1 0-4 0",
  record: "M4 2h5.5L12 4.5V14H4zM9.5 2v2.5H12M6 8h4M6 10.5h4"
};
function Fe(e, t) {
  if (e === "record" && !t?.includes(e)) return t?.[0] ?? Zn;
  const [n] = t ?? [];
  return n === void 0 || t?.includes(e) ? e : n;
}
function Ut(e) {
  return typeof e.count == "number" ? pt(e.count) : e.count;
}
function Xe(e, t) {
  return t ? e.entities.find((n) => n.key === t) ?? null : null;
}
function ta(e, t = {}) {
  const n = Xe(e, t.entity), a = e.entities[0];
  if (!n && !a) throw new Error(`Schema "${e.key}" declares no entities`);
  return n ?? a;
}
function na(e, t = null) {
  return e?.columns ?? t?.columns ?? [];
}
function Et(e, t = null) {
  if (e?.sorts?.length) return e.sorts;
  const n = /* @__PURE__ */ new Set(), a = [];
  for (const s of na(e, t))
    !s.sort || n.has(s.sort) || (n.add(s.sort), a.push({ key: s.sort, label: (s.label ?? s.sort).toLowerCase() }));
  return a;
}
const hs = { key: jt, label: jt };
function Ce(e, t, n = null) {
  const a = Et(e, n);
  return (t ? a.find((l) => l.key === t) : void 0) ?? a.find((l) => l.key === jt) ?? a[0] ?? hs;
}
function ms(e) {
  switch (e.kind) {
    case "chips":
      return { kind: "chips", selected: [] };
    case "range":
      return { kind: "range", min: null, max: null };
    case "toggle":
      return { kind: "toggle", on: !1 };
  }
}
function ys(e) {
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
function cn(e) {
  return e.entity === null && e.expr.trim() === "";
}
function ou(e) {
  return e.entity !== null;
}
function aa(e, t) {
  return e.entity === null && Fe(e.view, t) === "cards";
}
function gs(e, t) {
  return t <= 0 ? 1 : Math.max(1, Math.ceil(e / t));
}
function ht(e, t = {}) {
  const a = t.landing === "entity" ? ta(e, t) : null;
  return {
    entity: a?.key ?? null,
    view: Ge(a?.key ?? null, t),
    sort: Ce(a, t.sort).key,
    dir: t.dir === "asc" ? "asc" : "desc",
    expr: "",
    page: 1
  };
}
const un = ["entity", "sort", "dir", "expr"];
function Ft(e) {
  return un.some((t) => t in e);
}
const _e = "—";
function ve(e, t) {
  return e.find((n) => n.role === t);
}
function sa(e, t) {
  return e.filter((n) => n.role === t);
}
function _s(e, t) {
  const n = (t ? t.columns : e?.columns) ?? [], a = t ? "scoped" : "everything";
  return n.filter(
    (s) => s.role !== "tint" && ((s.when ?? "always") === "always" || s.when === a)
  );
}
const ws = ["id", "entityKey", "entityLabel"];
function ie(e, t) {
  if (e.value) return e.value(t);
  const n = e.field ?? e.key;
  if (n !== void 0) {
    if (t.fields && n in t.fields) return t.fields[n];
    if (ws.includes(n))
      return t[n];
  }
}
function En(e, t) {
  const n = e.key ?? e.field ?? e.label;
  return n?.trim() ? n.trim() : `column-${t}`;
}
function ks(e, t) {
  return e.id?.trim() ? e.id : `${e.entityKey || "row"}-${t}`;
}
function bs(e, t) {
  if (e == null || e === "") return _e;
  if (t === "number") {
    const n = typeof e == "number" ? e : Number(e);
    return Number.isFinite(n) ? ls(n) : String(e);
  }
  return t === "date" ? rs(String(e)) : Array.isArray(e) ? e.length ? e.join(", ") : _e : String(e);
}
function Te(e, t) {
  const n = ie(e, t);
  return e.format ? e.format(n, t) : bs(n, e.kind);
}
function $s(e) {
  return typeof e == "number" ? Number.isFinite(e) ? String(e) : "" : typeof e == "string" ? e : Array.isArray(e) ? e.join(", ") : "";
}
function la(e, t) {
  const n = Te(e, t), a = $s(ie(e, t));
  return a && a !== n ? a : n;
}
function vt(e, t) {
  return e ? Te(e, t) : "";
}
function Mn(e) {
  return e.align ? e.align : e.kind === "number" || e.kind === "ordinal" ? "right" : "left";
}
const xs = {
  ordinal: "dc-table__num",
  number: "dc-table__number",
  date: "dc-table__date",
  status: "dc-table__state"
};
function Ln(e) {
  return [xs[e.kind ?? "text"], e.class].filter(Boolean).join(" ");
}
function Qt(e) {
  if (e.truncate !== void 0) return e.truncate;
  const t = e.kind ?? "text";
  return t === "text" || t === "number" || t === "date";
}
const Ss = /^([A-Za-z_][\w.-]*)\s*(>=|<=|:|=|>|<)\s*(.*)$/, Tn = "-?(?:\\d+\\.?\\d*|\\.\\d+)", Cs = new RegExp(`^(${Tn})?\\.\\.(${Tn})?$`);
function Mt(e) {
  const t = Cs.exec(e.trim());
  if (!t || t[1] === void 0 && t[2] === void 0) return null;
  const n = t[1] === void 0 ? null : Number(t[1]), a = t[2] === void 0 ? null : Number(t[2]);
  return n !== null && a !== null && n > a ? { min: a, max: n } : { min: n, max: a };
}
function Ps(e) {
  return `${e.min ?? ""}..${e.max ?? ""}`;
}
function Je(e) {
  return e.kind === "field" && (e.comparator === ":" || e.comparator === "=") && Mt(e.value) !== null;
}
function Es(e) {
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
function re(e) {
  const t = e.trim();
  if (!t) return [];
  const n = [];
  let a = [];
  for (const s of Es(t)) {
    const l = s.toUpperCase();
    if (l === "AND" || l === "&&") continue;
    if (l === "OR" || l === "||") {
      a.length && n.push(a), a = [];
      continue;
    }
    const o = s.length > 1 && s.startsWith("-"), i = o ? s.slice(1) : s, r = o ? { negated: !0 } : {}, c = Ss.exec(i);
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
const Pe = (e) => e.toLowerCase().replace(/\s+/g, ""), ra = [
  ["status", "state"],
  ["state", "state"],
  ["updated", "updated"],
  ["date", "updated"],
  ["name", "identity"],
  ["ref", "reference"]
];
function Ms(e, t, n) {
  const a = Pe(e), s = n.columns ?? [];
  if (a === "entity") return t.entityKey;
  if (e in t.fields) return t.fields[e];
  const l = s.find(
    (c) => c.key?.toLowerCase() === e.toLowerCase() || c.field?.toLowerCase() === e.toLowerCase() || c.label !== void 0 && Pe(c.label) === a
  );
  if (l) return ie(l, t);
  const o = n.facets.find(
    (c) => c.key.toLowerCase() === a || Pe(c.label) === a
  );
  if (o && o.key in t.fields) return t.fields[o.key];
  const i = ra.find(([c]) => c === a)?.[1];
  if (i) {
    const c = ve(s, i);
    if (c) return ie(c, t);
  }
  const r = /^metric(\d+)$/.exec(a);
  if (r) {
    const c = sa(s, "metric")[Number(r[1]) - 1];
    if (c) return ie(c, t);
  }
}
function rt(e) {
  return (e.toLowerCase().match(/[\p{L}\p{N}]+/gu) ?? []).map((t) => t.charAt(0)).join("");
}
const On = /^[a-z_][\w.-]*$/;
function Lt(e) {
  const t = (e.key ?? e.field)?.toLowerCase();
  if (t !== void 0) return On.test(t) ? t : void 0;
  const n = e.label === void 0 ? void 0 : Pe(e.label);
  return n !== void 0 && On.test(n) ? n : void 0;
}
function dn(e, t) {
  const n = Pe(e);
  return !!t?.entities.some((a) => a.scope && Pe(a.scope) === n);
}
function Ls(e, t, n) {
  const a = Pe(e);
  if (a === "entity" || ra.some(([l]) => l === a) || /^metric\d+$/.test(a) || dn(e, n)) return !0;
  const s = (l) => l !== void 0 && Pe(l) === a;
  return (t.columns ?? []).some(
    (l) => s(l.key) || s(l.field) || s(l.label)
  ) || t.facets.some((l) => s(l.key) || s(l.label));
}
function Ze(e, t, n) {
  return t ? ia(e, (a) => {
    const s = ca(a, t, n);
    return s && Lt(s);
  }) : e;
}
function oa(e, t, n) {
  return t ? ia(e, (a) => {
    if (dn(a, n)) return;
    const s = (t.columns ?? []).find((l) => Lt(l) === a);
    return s && ua(s, t, n);
  }) : e;
}
function Ts(e, t, n) {
  if (!t || dn(e, n)) return;
  const a = t.facets.find((s) => s.key.toLowerCase() === e);
  return a ? a.label : (t.columns ?? []).find((s) => Lt(s) === e)?.label;
}
function ia(e, t) {
  let n = !1;
  const a = re(e).map(
    (s) => s.map((l) => {
      if (l.kind !== "field") return l;
      const o = t(l.field);
      return !o || o === l.field ? l : (n = !0, { ...l, field: o });
    })
  );
  return n ? ye(a) : e;
}
function ca(e, t, n) {
  if (!(!e || Ls(e, t, n)))
    return (t.columns ?? []).find(
      (a) => a.label !== void 0 && rt(a.label) === e
    );
}
function ua(e, t, n) {
  if (!t || e.label === void 0 || !Lt(e)) return;
  const a = rt(e.label);
  return ca(a, t, n) === e ? a : void 0;
}
function Vt(e, t) {
  const n = e.toLowerCase(), a = t.toLowerCase();
  if (!a.includes("*")) return n.includes(a);
  const s = a.replace(/[.+?^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*");
  return new RegExp(s).test(n);
}
function Nn(e, t) {
  return e.toLowerCase() === t.toLowerCase();
}
function Os(e, t, n, a) {
  if (e.kind === "text") {
    const r = n.columns ?? [];
    return ["identity", "reference"].some((c) => {
      const d = ve(r, c), v = d ? ie(d, t) : void 0;
      return typeof v == "string" && Vt(v, e.value);
    });
  }
  const s = Ms(e.field, t, n);
  if (s === void 0) return a?.has(e.field) ? !1 : null;
  const l = Je(e) ? Mt(e.value) : null;
  if (l) {
    if (Array.isArray(s) || typeof s == "boolean") return null;
    const r = typeof s == "number" ? s : Number(s);
    return Number.isFinite(r) ? (l.min === null || r >= l.min) && (l.max === null || r <= l.max) : null;
  }
  if (Array.isArray(s))
    return e.comparator === ":" || e.comparator === "=" ? s.some(
      (c) => e.comparator === "=" ? Nn(String(c), e.value) : Vt(String(c), e.value)
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
    return e.comparator === "=" ? Nn(String(s), e.value) : Vt(String(s), e.value);
  }
  const o = Number(e.value), i = typeof s == "number" ? s : Number(s);
  return !Number.isFinite(o) || !Number.isFinite(i) ? null : Ns(e.comparator, i, o);
}
function An(e, t, n, a) {
  const s = Os(e, t, n, a);
  return s === null ? !0 : e.negated ? !s : s;
}
function Ns(e, t, n) {
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
function In(e) {
  return e.kind === "field" && !e.negated && (e.comparator === ":" || e.comparator === "=") && !Je(e);
}
const Rn = /* @__PURE__ */ new WeakMap();
function As(e) {
  if (!e?.strictScopes) return null;
  let t = Rn.get(e);
  return t || (t = new Set(
    e.entities.flatMap((n) => n.scope ? [n.scope.toLowerCase()] : [])
  ), Rn.set(e, t)), t;
}
function Is(e, t, n, a) {
  if (!e.length) return !0;
  const s = As(a);
  return e.some((l) => {
    const o = /* @__PURE__ */ new Map();
    for (const i of l)
      In(i) && o.set(
        i.field,
        (o.get(i.field) ?? !1) || An(i, t, n, s)
      );
    return l.every(
      (i) => In(i) ? o.get(i.field) === !0 : An(i, t, n, s)
    );
  });
}
function Bn(e) {
  return /[\s"']/.test(e) ? `"${e.replace(/["']/g, "")}"` : e;
}
function we(e) {
  const t = e.negated ? "-" : "";
  return e.kind === "text" ? t + Bn(e.value) : `${t}${e.field}${e.comparator}${Bn(e.value)}`;
}
function Rs(e) {
  if (!e.negated) return { ...e, negated: !0 };
  const { negated: t, ...n } = e;
  return n;
}
function ye(e) {
  return e.filter((t) => t.length).map((t) => t.map(we).join(" ")).join(" OR ");
}
function Bs(e, t, n) {
  return e.map((a, s) => s === t ? a.filter((l, o) => o !== n) : a).filter((a) => a.length);
}
function iu(e) {
  const t = re(e);
  if (t.length > 1) return { parts: [], text: e.trim() };
  const n = t[0] ?? [];
  return {
    parts: n.filter((a) => a.kind === "field"),
    text: n.filter((a) => a.kind === "text").map(we).join(" ")
  };
}
function cu(e, t) {
  return [...e.map(we), t.trim()].filter(Boolean).join(" ");
}
const Hn = (e, t) => e.toLowerCase() === t.toLowerCase();
function Yt(e, t) {
  return !!e.negated == !!t.negated && da(e, t);
}
function Hs(e, t) {
  return !!e.negated != !!t.negated && da(e, t);
}
function da(e, t) {
  return e.kind === "field" ? t.kind === "field" && e.field === t.field && e.comparator === t.comparator && Hn(e.value, t.value) : t.kind === "text" && Hn(e.value, t.value);
}
function qs(e, t) {
  return t.filter((n) => !e.some((a) => Yt(a, n)));
}
function fn(e, t) {
  return fa(e, t, (n) => n);
}
function et(e, t) {
  return fa(
    e,
    t,
    (n, a) => n.filter((s) => !a.some((l) => Hs(s, l)))
  );
}
const Fs = /^[A-Za-z_][\w.-]*\s*(?:>=|<=|:|=|>|<)$/;
function Vs(e) {
  return ye(
    re(e).map(
      (t) => t.filter(
        (n) => n.kind !== "text" || n.value !== "-" && !Fs.test(n.value)
      )
    ).filter((t) => t.length > 0)
  );
}
function fa(e, t, n) {
  const a = re(e), s = re(t);
  return a.length ? s.length ? ye(
    a.flatMap(
      (l) => s.map((o) => [...n(l, o), ...qs(l, o)])
    )
  ) : ye(a) : ye(s);
}
const va = (e) => e.kind === "date" || e.role === "updated";
function Ds(e) {
  if (!e) return () => 0;
  const n = (e.kind ?? "text") === "number" || e.role === "metric", a = va(e);
  return (s, l) => {
    const o = ie(e, s), i = ie(e, l);
    return n ? Number(i ?? 0) - Number(o ?? 0) : a ? Date.parse(String(i ?? "")) - Date.parse(String(o ?? "")) : String(i ?? "").localeCompare(String(o ?? ""));
  };
}
function qn(e, t) {
  return !t || !va(t) ? !1 : !Number.isFinite(Date.parse(String(ie(t, e) ?? "")));
}
function pa({ query: e, schema: t, entity: n, limit: a, offset: s }, l, o) {
  const i = re(e.expr), r = n ? [n] : t.entities;
  let c = 0;
  const d = [];
  for (const k of r)
    for (const P of l(k))
      c += 1, Is(i, P, k, t) && d.push(P);
  const v = Ce(n, e.sort, t), _ = na(n, t).find((k) => k.sort === v.key), y = o.undatedLast ? d.filter((k) => !qn(k, _)) : d, g = o.undatedLast ? d.filter((k) => qn(k, _)) : [];
  y.sort(Ds(_)), e.dir === "asc" && y.reverse();
  const p = g.length ? [...y, ...g] : y;
  return {
    // One page out of the middle. `total` stays the whole match, which is what
    // the shell counts pages with.
    rows: o.zeroIsAll && a <= 0 ? p.slice(s) : p.slice(s, s + a),
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
function uu(e) {
  return mt[Ue(e) % mt.length];
}
function ha(e, t) {
  return `${e}_${1e4 + t * 7}`;
}
const Ks = 7, Ws = 3;
function zs(e, t, n, a) {
  const s = (t * Ks + Ue(n)) % a, l = [];
  for (let o = 0; o < Math.min(Ws, a); o++)
    l.push(ha(e, (s + o) % a));
  return l;
}
function js(e, t) {
  switch (e.kind) {
    case "chips":
      return e.multiple ? Us(e.options, t) : e.options[t % e.options.length] ?? "";
    case "range": {
      const n = Math.max(0, e.max - e.min);
      return e.min + (n === 0 ? 0 : t % (n + 1));
    }
    case "toggle":
      return t % 3 === 0;
  }
}
function Us(e, t) {
  if (!e.length) return [];
  const n = 1 + (t >> 5) % Math.min(3, e.length), a = t % e.length, s = /* @__PURE__ */ new Set();
  for (let l = 0; l < n; l++) s.add((a + l) % e.length);
  return [...s].sort((l, o) => l - o).map((l) => e[l]);
}
function Qs(e, t) {
  const { hash: n, sample: a, revision: s, updatedAt: l } = t, o = s ? ` · rev ${s + 1}` : "";
  switch (e.role) {
    case "identity":
      return `${a[0]}${o}`;
    case "reference":
      return s ? `${a[1]}-${s + 1}` : a[1];
    case "state":
      return je[n % je.length];
    case "updated":
      return l;
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
      return l;
    default:
      return;
  }
}
function Ys(e, t = {}) {
  const n = t.population ?? 48, a = t.seed ?? "", s = t.now ?? /* @__PURE__ */ new Date("2026-08-25T00:00:00Z"), l = e.samples, o = t.scopes ?? [];
  if (!l.length) return [];
  const i = [];
  for (let r = 0; r < n; r++) {
    const c = l[r % l.length], d = Math.floor(r / l.length), v = Ue(`${a}:${e.key}:${c[0]}:${r}`), _ = ha(e.key, r), y = new Date(s.getTime() - v % 900 * 36e5).toISOString(), g = {};
    for (const p of e.columns ?? []) {
      const k = p.field ?? p.key;
      if (!k || p.value) continue;
      const P = Qs(p, {
        hash: Ue(`${v}:${k}`),
        sample: c,
        revision: d,
        updatedAt: y
      });
      P !== void 0 && (g[k] = P);
    }
    for (const p of e.facets)
      g[p.key] = js(p, Ue(`${v}:${p.key}`));
    for (const [p, k] of o)
      g[p] = k === e.key ? _ : zs(k, r, p, n);
    i.push({ id: _, entityKey: e.key, entityLabel: e.label, fields: g });
  }
  return i;
}
function Gs(e = {}) {
  const t = /* @__PURE__ */ new Map(), n = (a, s) => {
    const l = t.get(a.key);
    if (l) return l;
    const o = e.scopes ?? s.entities.flatMap(
      (r) => r.scope ? [[r.scope, r.key]] : []
    ), i = Ys(a, { ...e, scopes: o });
    return t.set(a.key, i), i;
  };
  return {
    query(a) {
      return pa(a, (s) => n(s, a.schema), {
        undatedLast: !1,
        zeroIsAll: !1
      });
    }
  };
}
const De = "e", Tt = "v", vn = "s", pn = "d", Oe = "q", Ot = "p", ma = "*", Xs = [
  De,
  Tt,
  vn,
  pn,
  Oe,
  Ot
], Js = [
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
  for (const [n, a] of Js) t = t.replace(n, a);
  return t;
}
function me(e) {
  try {
    return decodeURIComponent(e.replace(/\+/g, " "));
  } catch {
    return e.replace(/\+/g, " ");
  }
}
function hn(e) {
  const t = e.replace(/^[?]/, "");
  if (!t) return [];
  const n = [];
  for (const a of t.split("&")) {
    if (!a) continue;
    const s = a.indexOf("="), l = s === -1 ? a : a.slice(0, s), o = s === -1 ? "" : a.slice(s + 1);
    n.push([me(l), o]);
  }
  return n;
}
function Zs(e) {
  return Xs.includes(e);
}
function Nt(e, t) {
  if (!(!t || e.some((n) => n.key === t)))
    return e.find((n) => rt(n.label) === t);
}
function el(e, t) {
  const n = rt(e.label);
  return Nt(t.entities, n)?.key === e.key ? n : e.key;
}
function ya(e, t) {
  return t ? Xe(e, t) ?? Nt(e.entities, t) ?? null : null;
}
function tl(e, t) {
  const n = rt(e.label);
  return Nt(t, n)?.key === e.key ? n : e.key;
}
function nl(e, t) {
  return t.some((n) => n.key === e) ? e : Nt(t, e)?.key ?? e;
}
function al(e, t, n = {}) {
  const a = ht(t, n), s = new Map(hn(e)), l = s.get(De), o = l === void 0 ? a.entity : me(l), i = o === ma ? null : ya(t, o), r = s.get(Tt), c = r && ea(me(r)) ? me(r) : Ge(i?.key ?? null, n), d = s.get(vn), v = Ce(
    i,
    d ? nl(me(d), Et(i, t)) : n.sort,
    t
  ), _ = s.get(pn), y = _ ? me(_) === "asc" ? "asc" : "desc" : a.dir, g = s.get(Oe), p = s.get(Ot), k = p === void 0 ? 1 : Number(me(p)), P = Number.isFinite(k) ? Math.max(1, Math.floor(k)) : 1;
  return {
    entity: i?.key ?? null,
    view: c,
    sort: v.key,
    dir: y,
    expr: g === void 0 ? "" : Ze(me(g), i, t),
    page: P
  };
}
function Fn(e, t, n = {}, a = "") {
  const s = ht(t, n), l = Xe(t, e.entity), o = hn(a).filter(([v]) => !Zs(v)), i = [], r = (v, _) => i.push([v, yt(_)]), c = l?.key ?? null;
  if (c !== s.entity && r(De, l ? el(l, t) : ma), e.view !== Ge(c, n) && r(Tt, e.view), e.sort !== s.sort) {
    const v = Et(l, t), _ = v.find((y) => y.key === e.sort);
    r(vn, _ ? tl(_, v) : e.sort);
  }
  e.dir !== s.dir && r(pn, e.dir), e.expr.trim() !== "" && r(Oe, oa(e.expr, l, t)), e.page > 1 && r(Ot, String(e.page));
  const d = [
    ...o.map(([v, _]) => [yt(v), _]),
    ...i
  ];
  return d.length ? `?${d.map(([v, _]) => _ === "" ? v : `${v}=${_}`).join("&")}` : "";
}
function du(e) {
  const t = [];
  for (const [n, a] of Object.entries(e))
    for (const s of Array.isArray(a) ? a : [a]) {
      if (typeof s != "string") continue;
      const l = yt(n);
      t.push(s === "" ? l : `${l}=${yt(s)}`);
    }
  return t.length ? `?${t.join("&")}` : "";
}
function fu(e, t) {
  const n = new Map(hn(e)), a = n.get(Oe), s = a === void 0 ? "" : me(a);
  if (!t) return s;
  const l = n.get(De);
  return Ze(
    s,
    l === void 0 ? null : ya(t, me(l)),
    t
  );
}
function ot(e, t) {
  return ga(e, t.id);
}
function ga(e, t) {
  const n = e?.scope;
  return n ? _a(n, t) : null;
}
function _a(e, t) {
  return `${e}="${t.replace(/"/g, "")}"`;
}
function vu(e, t) {
  const n = typeof e == "string" ? e : e?.scope;
  if (!n) return null;
  const a = t.filter((s) => s.replace(/"/g, "") !== "").map((s) => _a(n, s));
  return a.length ? a.join(" ") : null;
}
function At(e, t) {
  if (e.kind !== "field" || t.kind !== "field") return Yt(e, t);
  const n = (a) => a.comparator === ":" || a.comparator === "=";
  return Yt(e, { ...t, comparator: n(e) && n(t) ? e.comparator : t.comparator });
}
function gt(e, t) {
  return At(e, Rs(t));
}
function _t(e, t) {
  return ot(
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
  return s.some((i) => i.some((r) => At(r, a))) ? n : s.some((i) => i.some((r) => gt(r, a))) ? ye(
    s.map(
      (i) => i.map((r) => gt(r, a) ? a : r)
    )
  ) : `${n} ${t}`;
}
function wa(e) {
  if (!e) return null;
  const t = e.trim();
  return t ? t.startsWith("-") ? t.slice(1) : `-${t}` : null;
}
function mn(e, t) {
  if (!t || !e.trim()) return null;
  const [n] = re(t).flat();
  if (!n) return null;
  const a = re(e).flat();
  return a.some((s) => At(s, n)) ? n.negated ? "out" : "in" : a.some((s) => gt(s, n)) ? n.negated ? "in" : "out" : null;
}
function ka(e, t) {
  if (!t || !e.trim()) return e;
  const [n] = re(t).flat();
  if (!n) return e;
  const a = re(e), s = a.map(
    (l) => l.filter((o) => !At(o, n) && !gt(o, n))
  );
  return s.every((l, o) => l.length === a[o]?.length) ? e : ye(s);
}
function Gt(e, t, n) {
  return t ? n === null ? ka(e, t) : it(e, n === "out" ? wa(t) : t) : e;
}
function Xt(e, t) {
  const n = t.shiftKey ? `noopener,popup,width=${window.outerWidth},height=${window.outerHeight}` : "noopener";
  window.open(e, "_blank", n);
}
function ba() {
  const e = window.getSelection?.();
  return !!e && !e.isCollapsed;
}
function Jt(e) {
  return e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0;
}
function tt(e) {
  return e.altKey ? { exclude: !0 } : {};
}
function Dt(e, t, n, a = {}) {
  const s = _t(e, n);
  return it(t.expr, a.exclude ? wa(s) : s);
}
function $a(e, t) {
  const n = e?.scope?.toLowerCase();
  if (!n || e?.keepsScope || !t.trim()) return t;
  const a = re(t), s = a.map(
    (l) => l.filter((o) => o.kind !== "field" || o.field !== n)
  );
  return s.every((l, o) => l.length === a[o]?.length) ? t : ye(s);
}
function xa(e, t) {
  const n = t.toLowerCase();
  return e.entities.find((a) => a.scope?.toLowerCase() === n) ?? null;
}
function Sa(e, t, n) {
  if (!t || !n) return null;
  const a = xa(e, t);
  return a ? { entity: a, id: n } : null;
}
function sl(e, t) {
  const n = [], a = /* @__PURE__ */ new Set();
  for (const s of t)
    for (const l of re(s).flat()) {
      if (l.kind !== "field" || l.negated) continue;
      const o = Sa(e, l.field, l.value);
      if (!o) continue;
      const i = `${o.entity.key}:${o.id.toLowerCase()}`;
      a.has(i) || (a.add(i), n.push({ entityKey: o.entity.key, id: o.id }));
    }
  return n;
}
function pu(e, t, n = "cards") {
  return {
    // An expression with nothing in it is no parameter, as the shell writes it.
    [Oe]: it(e, t) || void 0,
    [De]: void 0,
    [Tt]: n,
    [Ot]: void 0
  };
}
const Ca = Symbol("dc.shellContext");
function ll(e) {
  const t = e.liveQuery ? e : rl(e);
  return ln(Ca, t), t;
}
function rl(e) {
  const t = e.draft ?? H("");
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
function ne() {
  const e = sn(Ca, null);
  if (!e)
    throw new Error(
      "[appfr] No shell context found. Render this component inside <DataShell>."
    );
  return e;
}
const wt = Symbol("dc-shell-theme");
function Zt(e) {
  return {
    read: () => ({
      theme: Ee(e.theme),
      accent: Ee(e.accent),
      tokens: Ee(e.tokens)
    })
  };
}
function ol(e, t) {
  t ? t.provide(wt, Zt(e)) : ln(wt, Zt(e));
}
function il(e) {
  const t = Gn();
  ln(wt, {
    ...Zt(e),
    element: () => t?.proxy?.$el ?? null
  });
}
function yn(e) {
  const t = Gn(), n = sn(wt, null), a = pe(null);
  function s() {
    const r = t?.proxy?.$el, d = (r instanceof Element ? r : r?.parentElement)?.closest(".dc-shell");
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
function nt(e) {
  return e.key.toLowerCase();
}
const cl = /* @__PURE__ */ new Set([">", ">=", "<", "<="]);
function Pa(e, t) {
  if (e.kind !== "field" || e.negated || e.field !== nt(t)) return !1;
  const n = e.comparator === ":" || e.comparator === "=";
  switch (t.kind) {
    case "range":
      return Je(e) || cl.has(e.comparator);
    case "chips":
      return n && !Je(e) && Ea(t.options, e.value) !== void 0;
    case "toggle":
      return n && ul(e.value);
  }
}
function Ea(e, t) {
  const n = t.toLowerCase();
  return e.find((a) => a.toLowerCase() === n);
}
function ul(e) {
  const t = e.toLowerCase();
  return t === "true" || t === "yes";
}
function Ma(e, t) {
  const n = (re(e)[0] ?? []).filter((a) => Pa(a, t));
  switch (t.kind) {
    case "range": {
      let a = null, s = null;
      for (const l of n) {
        const o = Mt(l.value), i = Number(l.value);
        o ? (o.min !== null && (a = o.min), o.max !== null && (s = o.max)) : Number.isFinite(i) && (l.comparator.startsWith(">") ? a = i : s = i);
      }
      return { kind: "range", min: a, max: s };
    }
    case "chips": {
      const a = new Set(n.map((s) => Ea(t.options, s.value)));
      return { kind: "chips", selected: t.options.filter((s) => a.has(s)) };
    }
    case "toggle":
      return { kind: "toggle", on: n.length > 0 };
  }
}
function dl(e, t) {
  const n = nt(e);
  switch (t.kind) {
    case "range":
      return t.min === null && t.max === null ? [] : [{ kind: "field", field: n, comparator: ":", value: Ps(t) }];
    case "chips":
      return t.selected.map((a) => ({ kind: "field", field: n, comparator: "=", value: a }));
    case "toggle":
      return t.on ? [{ kind: "field", field: n, comparator: ":", value: "true" }] : [];
  }
}
function La(e, t, n) {
  const a = dl(t, n), s = re(e), l = (s.length ? s : [[]]).map((o) => [
    ...o.filter((i) => !Pa(i, t)),
    ...a
  ]);
  return ye(l);
}
function hu(e, t) {
  return La(e, t, ms(t));
}
function fl(e, t) {
  return (t?.facets ?? []).some((n) => ys(Ma(e, n)));
}
const kt = "entity", at = "expr", vl = { ">=": "≥", "<=": "≤", ">": ">", "<": "<" };
function pl(e, t, n) {
  if (e.kind !== "field") return we(e);
  const a = Ts(e.field, t, n);
  if (a === void 0) return we(e);
  const s = e.negated ? "-" : "", l = Je(e) ? Mt(e.value) : null;
  if (l) {
    const i = l.min !== null && l.max !== null ? `${l.min} ≤ ${a} ≤ ${l.max}` : l.max !== null ? `${a} ≤ ${l.max}` : `${a} ≥ ${l.min}`;
    return s + i;
  }
  const o = vl[e.comparator];
  return o ? `${s}${a} ${o} ${e.value}` : we({ ...e, field: a });
}
function bt(e, t, n = null) {
  const a = [];
  return t && a.push({
    id: kt,
    label: `entity:${t.key}`,
    facetKey: kt
  }), re(e.expr).forEach((s, l) => {
    s.forEach((o, i) => {
      a.push({
        id: `${at}:${l}:${i}`,
        label: pl(o, t, n),
        address: oa(we(o), t, n),
        facetKey: at,
        group: l,
        index: i,
        ...o.kind === "field" ? { field: o.field, value: o.value } : {},
        ...o.negated ? { negated: !0 } : {}
      });
    });
  }), a;
}
function hl(e, t, n = null) {
  if (cn(e)) {
    const l = Ce(t, e.sort, n);
    return `everything · ${e.view} · ${l.label}`;
  }
  const a = bt(e, t).filter((l) => l.facetKey !== at).map((l) => l.label), s = e.expr.trim();
  return s && a.push(`"${s}"`), a.join(" · ");
}
function ml(e) {
  const { adapter: t } = e, n = f(() => Ee(e.schema)), a = f(() => Ee(e.defaults) ?? {}), s = f(() => al(t.search.value, n.value, a.value)), l = f(() => Xe(n.value, s.value.entity)), o = f(() => l.value ?? ta(n.value, a.value)), i = f(() => Et(l.value, n.value)), r = f(() => Ce(l.value, s.value.sort, n.value)), c = (x, m) => {
    const b = Fn(x, n.value, a.value, t.search.value);
    return b === t.search.value && !t.elsewhere?.value ? !1 : (m === "push" ? t.push(b) : t.replace(b), !0);
  }, d = () => Ee(e.navigationMode) ?? "push", v = () => Ee(e.facetNavigationMode) ?? "replace", _ = (x, m) => {
    const b = x.page ?? (Ft(x) ? 1 : s.value.page);
    return c({ ...s.value, ...x, page: b }, m);
  }, y = (x) => {
    const m = x.page ?? (Ft(x) ? 1 : s.value.page);
    return g({ ...s.value, ...x, page: m });
  }, g = (x) => {
    const m = Fn(x, n.value, a.value, t.search.value);
    return t.href ? t.href(m) : `${t.path.value}${m}`;
  }, p = (x, m) => {
    const b = l.value?.facets.find((O) => O.key === x);
    if (!b) return;
    const E = La(s.value.expr, b, m(Ma(s.value.expr, b)));
    _({ expr: E }, v());
  }, k = (x) => {
    const m = x === null ? null : Xe(n.value, x);
    return (m?.key ?? null) === s.value.entity ? {} : {
      entity: m?.key ?? null,
      view: Cn(s.value.view, s.value.entity, m?.key ?? null, a.value),
      sort: Ce(m, s.value.sort, n.value).key
    };
  }, P = (x) => {
    const m = k(x);
    Object.keys(m).length && _(m, d());
  };
  return {
    query: s,
    entity: l,
    focus: o,
    sort: r,
    sorts: i,
    summary: f(() => hl(s.value, l.value, n.value)),
    terms: f(() => bt(s.value, l.value, n.value)),
    isPristine: f(() => cn(s.value)),
    isEverything: f(() => s.value.entity === null),
    hasFacets: f(() => fl(s.value.expr, l.value)),
    setEntity: P,
    entityHref: (x) => y(k(x)),
    clearEntity: () => P(null),
    setView(x, m) {
      _(m === void 0 ? { view: x } : { view: x, page: Math.max(1, Math.floor(m)) }, d());
    },
    setSort(x) {
      _({ sort: Ce(l.value, x, n.value).key }, d());
    },
    toggleDirection() {
      _({ dir: s.value.dir === "desc" ? "asc" : "desc" }, d());
    },
    setExpression(x) {
      return _({ expr: x }, d());
    },
    narrow(x, m, b) {
      return _({ expr: x, ...k(m), ...b ? { view: b } : {} }, d());
    },
    narrowHref(x, m, b) {
      return y({ expr: x, ...k(m), ...b ? { view: b } : {} });
    },
    setPage(x, m) {
      _({ page: Math.max(1, Math.floor(x)) }, m ?? d());
    },
    setFacet(x, m) {
      p(x, () => m);
    },
    toggleChip(x, m) {
      p(x, (b) => b.kind !== "chips" ? b : { kind: "chips", selected: b.selected.includes(m) ? b.selected.filter((O) => O !== m) : [...b.selected, m] });
    },
    setRange(x, m, b) {
      p(x, (E) => E.kind === "range" ? { kind: "range", min: m, max: b } : E);
    },
    toggleFlag(x) {
      p(
        x,
        (m) => m.kind === "toggle" ? { kind: "toggle", on: !m.on } : m
      );
    },
    removeTerm(x) {
      if (x.facetKey === kt) {
        P(null);
        return;
      }
      if (x.facetKey === at) {
        const m = Bs(re(s.value.expr), x.group ?? 0, x.index ?? 0);
        _({ expr: ye(m) }, d());
      }
    },
    clearFilters() {
      _({ ...k(null), expr: "" }, d());
    },
    clearHref: () => y({ ...k(null), expr: "" }),
    reset() {
      c(ht(n.value, a.value), d());
    },
    homeHref: () => g(ht(n.value, a.value)),
    hrefFor(x) {
      const m = { ...s.value, ...x };
      return "entity" in x && !("view" in x) && (m.view = Cn(s.value.view, s.value.entity, m.entity, a.value)), m.page = x.page ?? (Ft(x) ? 1 : s.value.page), g(m);
    }
  };
}
const Vn = 50;
function yl(e) {
  const t = pe([]), n = H(0), a = H(!1), s = H(!1), l = pe(null);
  let o = 0, i = null, r = null;
  const c = f(() => (e.query.value.page - 1) * e.limit.value), d = f(() => gs(n.value, e.limit.value)), v = () => {
    const E = e.query.value, O = e.within?.value.trim(), X = $a(e.entity.value, E.expr);
    return O ? { ...E, expr: fn(O, X) } : X === E.expr ? E : { ...E, expr: X };
  }, _ = (E, O) => {
    t.value = E.rows, n.value = E.total, l.value = null, y(O);
  }, y = (E) => {
    i = { key: E, total: n.value }, s.value = !1;
  }, g = (E) => {
    l.value = E, t.value = [], n.value = 0, i = null, s.value = !1;
  }, p = (E, O, X, q) => {
    let V = !0;
    const U = () => E === o;
    let ee = 0, de = !1;
    const ce = (M) => {
      ee = M, de = !0, q === void 0 && (n.value = M);
    }, ke = () => {
      V && (V = !1, t.value = [], ce(0)), l.value = null;
    };
    return {
      get open() {
        return U();
      },
      insert(M, Q) {
        if (!U()) return;
        const N = Array.isArray(M) ? M : [M];
        if (!N.length) return;
        ke();
        const Z = [...t.value];
        Z.splice(Q ?? Z.length, 0, ...N), t.value = O > 0 ? Z.slice(0, O) : Z, ce(ee + N.length);
      },
      set(M) {
        U() && (M.rows && (ke(), t.value = O > 0 ? M.rows.slice(0, O) : M.rows, ce(M.rows.length)), M.total !== void 0 && ce(M.total));
      },
      close() {
        U() && (a.value = !1, de && (n.value = ee), y(X));
      },
      fail(M) {
        U() && (g(M), a.value = !1);
      }
    };
  }, k = () => {
    const E = r;
    r = null, E?.();
  }, P = () => {
    const E = ++o;
    k();
    const O = x.value, X = i?.key === O ? i.total : void 0;
    s.value = X === void 0;
    const q = {
      query: v(),
      schema: e.schema.value,
      entity: e.entity.value,
      limit: e.limit.value,
      offset: c.value
    }, V = e.source.value;
    if (V.stream) {
      a.value = !0;
      try {
        r = V.stream(q, p(E, q.limit, O, X)) ?? null;
      } catch (ee) {
        g(ee), a.value = !1;
      }
      return;
    }
    let U;
    try {
      U = V.query(q);
    } catch (ee) {
      g(ee);
      return;
    }
    if (!(U instanceof Promise)) {
      _(U, O), a.value = !1;
      return;
    }
    a.value = !0, U.then((ee) => {
      E === o && _(ee, O);
    }).catch((ee) => {
      E === o && g(ee);
    }).finally(() => {
      E === o && (a.value = !1);
    });
  }, x = f(() => {
    const E = v();
    return `${e.entity.value?.key ?? e.schema.value.entities[0]?.key ?? ""}|${JSON.stringify(un.map((X) => E[X]))}`;
  }), m = f(() => `${x.value}|${e.query.value.page}`);
  return ae([e.source, m, e.limit], P, {
    immediate: !0
  }), xt(() => {
    o++, k();
  }, !0), { rows: t, total: n, offset: c, pageCount: d, pending: a, counting: s, error: l, refresh: P, locate: async (E, O) => {
    const X = Math.max(0, O - 1 - Vn);
    try {
      const { rows: q } = await e.source.value.query({
        query: v(),
        schema: e.schema.value,
        entity: e.entity.value,
        limit: Vn * 2 + 1,
        offset: X
      }), V = q.findIndex((U) => U.id === E);
      return V === -1 ? null : X + V + 1;
    } catch {
      return null;
    }
  } };
}
function gl(e) {
  const t = pe(null);
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
  return ae([e.active, e.rows, e.pending, e.page, e.list], s, {
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
const _l = 150;
function wl(e) {
  const t = e.delay ?? _l, n = H(""), a = H("");
  let s = !1, l;
  const o = () => {
    clearTimeout(l), l = void 0;
  }, i = f(() => Ze(Vs(a.value), e.entity.value, e.schema?.value)), r = f(() => i.value.trim() !== ""), c = f(
    () => JSON.stringify([i.value, ...un.map((y) => e.query.value[y])])
  ), d = pe(null), v = f(() => {
    const y = e.query.value;
    if (!r.value) return y;
    const g = d.value?.of === c.value ? d.value.page : 1;
    return { ...y, expr: et(y.expr, i.value), page: g };
  });
  ae(n, (y) => {
    if (o(), !y.trim()) {
      s || (a.value = "");
      return;
    }
    s = !1, l = setTimeout(() => {
      l = void 0, a.value = n.value;
    }, t);
  }), ae(
    e.query,
    () => {
      s && (s = !1, a.value = "");
    },
    { flush: "sync" }
  );
  const _ = (y) => {
    o(), s = !0, n.value = "", !y() && s && (s = !1, a.value = "");
  };
  return Xn() && xt(o), {
    text: n,
    live: v,
    drafting: r,
    setPage(y) {
      d.value = { of: c.value, page: Math.max(1, Math.floor(y)) };
    },
    commit() {
      const y = n.value.trim();
      if (!y) return;
      const g = et(
        e.query.value.expr,
        Ze(y, e.entity.value, e.schema?.value)
      );
      a.value = y, _(() => e.setExpression(g));
    },
    abandon() {
      o(), s = !1, n.value = "", a.value = "";
    },
    release: _
  };
}
const kl = 25, Ta = (e, t) => e.toLowerCase() === t.toLowerCase();
function bl(e, t) {
  return e.find((n) => Ta(n.id, t));
}
function $l(e) {
  const t = pe(/* @__PURE__ */ new Map()), n = /* @__PURE__ */ new Set(), a = (i) => {
    if (i.facetKey !== at) return null;
    const r = Sa(e.schema.value, i.field, i.value);
    return r ? { ...r, key: `${r.entity.key}:${r.id}` } : null;
  }, s = (i) => {
    const { entity: r, id: c } = i, d = e.query.value;
    return e.source.value.query({
      query: {
        ...d,
        entity: r.key,
        // The reference on its own. The rest of the query is about the rows on
        // screen, which are of another type entirely.
        expr: ga(r, c) ?? "",
        sort: Ce(r, d.sort, e.schema.value).key,
        page: 1
      },
      schema: e.schema.value,
      entity: r,
      limit: kl,
      offset: 0
    });
  }, l = (i, r) => {
    const c = vt(ve(i.columns ?? [], "identity"), r);
    return c === _e || Ta(c, r.id) ? "" : c;
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
      d.forEach((_, y) => {
        const { reference: g } = r[y], p = bl(_.rows, g.id);
        v.set(g.key, p ? l(g.entity, p) : "");
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
  return ae([e.source, e.schema, e.terms, e.loading], () => {
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
const xl = 4, Sl = 8, Cl = 180;
function Pl(e, t, n, a = {}) {
  const s = a.gap ?? xl, l = a.margin ?? Sl, o = a.flipBelow ?? Cl, i = a.side ?? "below", r = {
    below: n.height - e.bottom - s - l,
    above: e.top - s - l
  }, c = i === "below" ? "above" : "below", d = r[i] < o && r[c] > r[i] ? c : i, v = Math.min(a.maxHeight ?? 1 / 0, Math.max(0, r[d])), _ = Math.max(0, n.width - l * 2), y = Math.min(a.minWidth ?? e.width, _), g = Math.min(Math.max(t, y), _), p = a.align === "end" ? e.right - g : e.left, k = Math.max(l, Math.min(p, n.width - g - l));
  return d === "below" ? { side: d, left: k, top: e.bottom + s, maxHeight: v, minWidth: y, maxWidth: _ } : { side: d, left: k, bottom: n.height - e.top + s, maxHeight: v, minWidth: y, maxWidth: _ };
}
const El = ["data-dc-theme", "data-dc-side"], Se = [], Ml = /* @__PURE__ */ K({
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
    const n = e, a = t, { theme: s, style: l, adopt: o } = yn(n), i = H(null), r = H(null), c = { root: () => i.value };
    function d() {
      const m = n.anchor;
      m && (r.value = Pl(
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
    function _() {
      a("update:open", !1), a("close");
    }
    function y(m) {
      return i.value?.contains(m) || n.anchor?.contains(m) ? !0 : Se.slice(Se.indexOf(c) + 1).some((E) => E.root()?.contains(m));
    }
    function g(m) {
      const b = m.target;
      b && !y(b) && _();
    }
    function p(m) {
      m.key !== "Escape" || m.defaultPrevented || Se[Se.length - 1] === c && (m.preventDefault(), i.value?.contains(document.activeElement) && n.anchor?.focus(), _());
    }
    let k = null;
    async function P() {
      Se.includes(c) || (Se.push(c), o(), r.value = null, await Qe(), d(), window.addEventListener("pointerdown", g, !0), document.addEventListener("keydown", p, !0), window.addEventListener("resize", d), window.addEventListener("scroll", d, !0), typeof ResizeObserver < "u" && i.value && (k = new ResizeObserver(() => d()), k.observe(i.value)));
    }
    function x() {
      const m = Se.indexOf(c);
      m !== -1 && (Se.splice(m, 1), window.removeEventListener("pointerdown", g, !0), document.removeEventListener("keydown", p, !0), window.removeEventListener("resize", d), window.removeEventListener("scroll", d, !0), k?.disconnect(), k = null);
    }
    return lt(() => {
      n.open && P();
    }), ae(
      () => n.open,
      (m) => {
        m ? P() : x();
      }
    ), ae(() => n.anchor, () => {
      n.open && d();
    }), ge(x), (m, b) => e.open ? (u(), I(St, {
      key: 0,
      to: e.to
    }, [
      S("div", qe({
        ref_key: "root",
        ref: i
      }, m.$attrs, {
        class: "dc-shell dc-layer dc-popover",
        "data-dc-theme": w(s),
        "data-dc-side": r.value?.side,
        style: v.value
      }), [
        Y(m.$slots, "default", {}, void 0, !0)
      ], 16, El)
    ], 8, ["to"])) : T("", !0);
  }
}), z = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [a, s] of t)
    n[a] = s;
  return n;
}, Ll = /* @__PURE__ */ z(Ml, [["__scopeId", "data-v-a688f2f7"]]), Tl = ["href"], Ol = /* @__PURE__ */ K({
  __name: "PressLink",
  props: {
    href: {},
    selectable: { type: Boolean }
  },
  emits: ["press"],
  setup(e, { emit: t }) {
    const n = e, a = t;
    function s(i) {
      i.stopPropagation(), !ba() && (n.href && Jt(i) ? Xt(n.href, i) : a("press", tt(i), i));
    }
    function l(i) {
      n.href && i.button === 1 && Xt(n.href, i);
    }
    function o(i) {
      if (n.href && Jt(i)) {
        i.stopPropagation();
        return;
      }
      i.preventDefault(), a("press", tt(i), i);
    }
    return (i, r) => e.selectable ? (u(), h("span", {
      key: 0,
      role: "link",
      tabindex: "0",
      class: "dc-press",
      onClick: s,
      onAuxclick: l,
      onKeydown: r[0] || (r[0] = Me((c) => c.currentTarget.click(), ["enter"]))
    }, [
      Y(i.$slots, "default", {}, void 0, !0)
    ], 32)) : e.href ? (u(), h("a", {
      key: 1,
      href: e.href,
      class: "dc-press",
      onClick: o
    }, [
      Y(i.$slots, "default", {}, void 0, !0)
    ], 8, Tl)) : (u(), h("button", {
      key: 2,
      type: "button",
      class: "dc-press",
      onClick: o
    }, [
      Y(i.$slots, "default", {}, void 0, !0)
    ]));
  }
}), se = /* @__PURE__ */ z(Ol, [["__scopeId", "data-v-e5165a68"]]), $t = (e) => e.toLowerCase().replace(/\s+/g, ""), Nl = /(?:[^\s"]|"[^"]*"?)*$/, Al = /^(-?)([^:=<>"\s-][^:=<>"\s]*)([:=])(.*)$/, Dn = 4;
function Il(e, t) {
  const n = $t(t);
  return e.find((a) => nt(a) === n || $t(a.label) === n);
}
function Rl(e) {
  switch (e.kind) {
    case "toggle":
      return e.text;
    case "range":
      return `${e.min}..${e.max}`;
    case "chips": {
      const t = e.options.slice(0, Dn).join(" · "), n = e.options.length - Dn;
      return n > 0 ? `${t} · +${n}` : t;
    }
  }
}
function Bl(e) {
  switch (e.kind) {
    case "toggle":
      return [{ value: "true", hint: e.text }, { value: "false" }];
    case "chips":
      return e.options.map((t) => ({ value: t }));
    case "range":
      return [];
  }
}
function Kn(e, t) {
  return $t(e).includes($t(t));
}
function Hl(e, t) {
  const n = Nl.exec(e)?.[0] ?? "", a = e.slice(0, e.length - n.length), s = [], l = Al.exec(n);
  if (l) {
    const [, o, i, r, c] = l, d = Il(t, i);
    if (!d) return [];
    const v = c.replace(/"/g, "").toLowerCase();
    for (const { value: _, hint: y } of Bl(d)) {
      if (!_.toLowerCase().includes(v)) continue;
      const g = we({
        kind: "field",
        field: nt(d),
        comparator: r,
        value: _,
        ...o ? { negated: !0 } : {}
      });
      s.push({ draft: a + g, label: g, ...y ? { hint: y } : {}, complete: !0 });
    }
  } else {
    if (/[<>"]/.test(n)) return [];
    const o = n.startsWith("-") ? "-" : "", i = n.slice(o.length);
    for (const r of t) {
      if (i && !Kn(r.key, i) && !Kn(r.label, i)) continue;
      const c = `${o}${nt(r)}:`;
      s.push({ draft: a + c, label: c, hint: Rl(r), complete: !1 });
    }
  }
  return s.filter((o) => o.draft !== e);
}
const ql = { class: "dc-header" }, Fl = { class: "dc-header__main" }, Vl = {
  class: "dc-header__brand",
  "aria-hidden": "true"
}, Dl = { class: "dc-header__sr" }, Kl = {
  key: 2,
  class: "dc-header__within"
}, Wl = ["title"], zl = { class: "dc-header__query" }, jl = ["data-dc-more", "title"], Ul = { class: "dc-header__run" }, Ql = {
  key: 0,
  class: "dc-header__or dc-mono",
  "aria-hidden": "true"
}, Yl = ["title", "aria-label", "onClick"], Gl = ["placeholder", "aria-expanded", "aria-activedescendant", "onKeydown"], Xl = ["id", "aria-selected", "onClick"], Jl = { class: "dc-completion__term dc-mono" }, Zl = {
  key: 0,
  class: "dc-completion__hint"
}, er = {
  key: 0,
  class: "dc-header__actions"
}, tr = /* @__PURE__ */ K({
  __name: "ShellHeader",
  setup(e) {
    const t = Ct(), n = ne(), a = f(() => n.schema.value), s = f(() => {
      const C = n.within.value.trim();
      return C ? bt({ ...n.query.value, expr: C }, null) : [];
    }), l = f(() => {
      const C = n.entity.value, A = C?.keepsScope ? void 0 : C?.scope?.toLowerCase();
      return n.terms.value.filter((B) => B.facetKey !== kt).map((B, F, Re) => {
        const Be = Re[F - 1];
        return {
          term: B,
          or: Be?.group !== void 0 && B.group !== void 0 && B.group !== Be.group,
          idle: !!A && B.field?.toLowerCase() === A
        };
      });
    }), o = $l({
      source: n.source,
      schema: n.schema,
      query: n.query,
      loading: n.loading,
      // The scope's parts as well as the query's: it names a record more often
      // than a typed term does, being what a record's own page is built on.
      terms: f(() => [...s.value, ...n.terms.value])
    });
    function i(C) {
      const A = xa(a.value, C)?.scopeLabel ?? C;
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
      const A = c(C.term), B = C.idle ? `Not applied to ${n.entity.value?.label} — remove ${A}` : `Remove ${A}`, F = C.term.address;
      return F && F !== A ? `${B}
Written ${F} in the address and the search box` : B;
    }
    const v = f(() => {
      const C = n.pressPreview?.value;
      if (!C) return [];
      const A = n.query.value, B = new Set(n.terms.value.map((F) => F.address));
      return bt(
        { ...A, expr: et(A.expr, C.term) },
        n.entity.value,
        n.schema.value
      ).filter((F) => F.address !== void 0 && !B.has(F.address)).map(
        (F) => C.name ? `${i(F.field)}: ${r(C.name)}` : F.label
      );
    }), _ = H(null);
    function y(C) {
      _.value = C instanceof HTMLInputElement ? C : null;
    }
    function g() {
      n.abandonDraft(), _.value?.blur();
    }
    function p() {
      const C = x.value[P.value];
      if (m.value && C) {
        E(C);
        return;
      }
      q.value = null, k.value = !1, n.commitDraft();
    }
    const k = H(!1), P = H(-1), x = f(() => {
      const C = n.entity.value?.facets ?? [];
      return C.length ? Hl(n.draft.value, C) : [];
    }), m = f(() => k.value && x.value.length > 0);
    ae(x, () => {
      P.value = -1;
    });
    const b = `${Pt() ?? "dc-header"}-completions`;
    function E(C) {
      n.draft.value = C.draft, k.value = !C.complete, P.value = -1, Qe(() => {
        const A = _.value;
        A?.focus(), A?.setSelectionRange(C.draft.length, C.draft.length);
      });
    }
    function O(C, A) {
      if (C.isComposing || !x.value.length) return;
      if (C.preventDefault(), !k.value) {
        k.value = !0;
        return;
      }
      const B = x.value.length + 1;
      P.value = (P.value + 1 + A + B) % B - 1;
    }
    function X(C) {
      return `${b}-${C}`;
    }
    const q = H(null), V = f(() => Math.min(q.value ?? 1 / 0, l.value.length)), U = f(() => [
      { key: "before", entries: l.value.slice(0, V.value) },
      { key: "after", entries: l.value.slice(V.value) }
    ]), ee = f(() => V.value < l.value.length);
    ae(l, (C) => {
      q.value !== null && q.value >= C.length && (q.value = null);
    });
    function de(C, A) {
      q.value = C >= l.value.length ? null : Math.max(0, C), Qe(() => {
        const B = _.value;
        if (!B) return;
        const F = A === "start" ? 0 : B.value.length;
        B.setSelectionRange(F, F), B.scrollIntoView({ block: "nearest", inline: "nearest" }), $e();
      });
    }
    function ce(C) {
      const A = _.value;
      return !A || A.selectionStart !== A.selectionEnd ? !1 : A.selectionStart === (C === "start" ? 0 : A.value.length);
    }
    function ke(C) {
      V.value === 0 || !ce("start") || (C.preventDefault(), de(C.key === "Home" ? 0 : V.value - 1, "start"));
    }
    function M(C) {
      !ee.value || !ce("end") || (C.preventDefault(), de(C.key === "End" ? l.value.length : V.value + 1, "end"));
    }
    function Q(C) {
      V.value === 0 || !ce("start") || (C.preventDefault(), fe(l.value[V.value - 1].term, !0));
    }
    function N(C) {
      !ee.value || !ce("end") || (C.preventDefault(), fe(l.value[V.value].term, !1));
    }
    function Z(C) {
      C.isComposing || C.altKey || C.ctrlKey || C.metaKey || C.shiftKey || (C.key === "ArrowLeft" || C.key === "Home" ? ke(C) : C.key === "ArrowRight" || C.key === "End" ? M(C) : C.key === "Backspace" ? Q(C) : C.key === "Delete" && N(C));
    }
    function fe(C, A) {
      A && q.value !== null && (q.value = Math.max(0, q.value - 1)), n.removeTerm(C);
    }
    function Ke(C) {
      C.target?.closest("button, input") || (C.preventDefault(), _.value?.focus(), de(l.value.length, "end"));
    }
    function We() {
      k.value = !1, n.draft.value || (q.value = null);
    }
    const Ie = H(null), be = H("");
    function $e() {
      const C = Ie.value;
      if (!C) {
        be.value = "";
        return;
      }
      const A = C.scrollLeft > 1, B = C.scrollWidth - C.clientWidth - C.scrollLeft > 1;
      be.value = A && B ? "both" : A ? "start" : B ? "end" : "";
    }
    let xe = null;
    return ae(
      Ie,
      (C) => {
        xe?.disconnect(), xe = null, $e(), !(!C || typeof ResizeObserver > "u") && (xe = new ResizeObserver($e), xe.observe(C));
      },
      { flush: "post" }
    ), ae([l, V], $e, { flush: "post" }), ge(() => xe?.disconnect()), (C, A) => (u(), h("div", ql, [
      S("div", Fl, [
        a.value.label && t.brand ? (u(), I(se, {
          key: 0,
          class: "dc-header__domain",
          "data-dc-brand": "",
          title: "Home",
          href: w(n).homeHref(),
          onPress: A[0] || (A[0] = (B) => w(n).reset())
        }, {
          default: G(() => [
            S("span", Vl, [
              Y(C.$slots, "brand", {
                label: a.value.label
              }, void 0, !0)
            ]),
            S("span", Dl, L(a.value.label), 1)
          ]),
          _: 3
        }, 8, ["href"])) : a.value.label ? (u(), I(se, {
          key: 1,
          class: "dc-header__domain",
          title: "Home",
          href: w(n).homeHref(),
          onPress: A[1] || (A[1] = (B) => w(n).reset())
        }, {
          default: G(() => [
            te(L(a.value.label), 1)
          ]),
          _: 1
        }, 8, ["href"])) : T("", !0),
        Y(C.$slots, "lead", {}, void 0, !0),
        s.value.length ? (u(), h("span", Kl, [
          A[10] || (A[10] = S("span", { class: "dc-header__sr" }, "Within", -1)),
          (u(!0), h(D, null, J(s.value, (B) => (u(), h("span", {
            key: `scope:${B.id}`,
            class: "dc-within dc-mono dc-truncate",
            title: c(B)
          }, L(c(B)), 9, Wl))), 128))
        ])) : T("", !0),
        S("div", zl, [
          S("div", {
            class: "dc-header__field",
            onMousedown: Ke
          }, [
            S("div", {
              ref_key: "termBar",
              ref: Ie,
              class: "dc-header__terms",
              "data-dc-more": be.value,
              title: w(n).summary.value,
              onScroll: $e
            }, [
              (u(!0), h(D, null, J(U.value, (B) => (u(), h(D, {
                key: B.key
              }, [
                S("span", Ul, [
                  (u(!0), h(D, null, J(B.entries, (F) => (u(), h(D, {
                    key: F.term.id
                  }, [
                    F.or ? (u(), h("span", Ql, "or")) : T("", !0),
                    S("button", {
                      type: "button",
                      class: oe(["dc-term dc-mono", { "dc-term--idle": F.idle }]),
                      title: d(F),
                      "aria-label": `Remove ${c(F.term)}`,
                      onMousedown: A[2] || (A[2] = Le(() => {
                      }, ["prevent"])),
                      onClick: (Re) => fe(F.term, B.key === "before")
                    }, L(c(F.term)), 43, Yl)
                  ], 64))), 128)),
                  B.key === "before" ? (u(!0), h(D, { key: 0 }, J(v.value, (F) => (u(), h("span", {
                    key: F,
                    class: "dc-term dc-term--preview dc-mono",
                    "aria-hidden": "true"
                  }, L(F), 1))), 128)) : T("", !0)
                ]),
                B.key === "before" ? Wt((u(), h("input", {
                  key: 0,
                  ref_for: !0,
                  ref: y,
                  "onUpdate:modelValue": A[3] || (A[3] = (F) => w(n).draft.value = F),
                  class: oe(["dc-header__search dc-mono", { "dc-header__search--between": ee.value }]),
                  style: le({ "--dc-typed": String(Math.max(1, w(n).draft.value.length)) }),
                  type: "text",
                  autocomplete: "off",
                  spellcheck: "false",
                  placeholder: ee.value ? "" : "Search…",
                  "aria-label": "Search",
                  role: "combobox",
                  "aria-autocomplete": "list",
                  "aria-expanded": m.value,
                  "aria-controls": b,
                  "aria-activedescendant": m.value && P.value >= 0 ? X(P.value) : void 0,
                  onKeydown: [
                    Me(Le(p, ["prevent"]), ["enter"]),
                    Me(Le(g, ["prevent"]), ["esc"]),
                    A[4] || (A[4] = Me((F) => O(F, 1), ["down"])),
                    A[5] || (A[5] = Me((F) => O(F, -1), ["up"])),
                    Z
                  ],
                  onFocus: A[6] || (A[6] = (F) => k.value = !0),
                  onInput: A[7] || (A[7] = (F) => k.value = !0),
                  onBlur: We
                }, null, 46, Gl)), [
                  [Ya, w(n).draft.value]
                ]) : T("", !0)
              ], 64))), 128))
            ], 40, jl)
          ], 32)
        ])
      ]),
      j(Ll, {
        id: b,
        open: m.value,
        anchor: _.value,
        "min-width": 0,
        "max-height": 320,
        class: "dc-completions",
        role: "listbox",
        "aria-label": "Completions",
        onClose: A[9] || (A[9] = (B) => k.value = !1)
      }, {
        default: G(() => [
          (u(!0), h(D, null, J(x.value, (B, F) => (u(), h("div", {
            id: X(F),
            key: B.label,
            class: oe(["dc-completion", { "dc-completion--active": F === P.value }]),
            role: "option",
            "aria-selected": F === P.value,
            onMousedown: A[8] || (A[8] = Le(() => {
            }, ["prevent"])),
            onClick: (Re) => E(B)
          }, [
            S("span", Jl, L(B.label), 1),
            B.hint ? (u(), h("span", Zl, L(B.hint), 1)) : T("", !0)
          ], 42, Xl))), 128))
        ]),
        _: 1
      }, 8, ["open", "anchor"]),
      t.actions ? (u(), h("div", er, [
        Y(C.$slots, "actions", {}, void 0, !0)
      ])) : T("", !0)
    ]));
  }
}), Oa = /* @__PURE__ */ z(tr, [["__scopeId", "data-v-421d89d4"]]), nr = ["checked", "indeterminate"], Na = /* @__PURE__ */ K({
  __name: "PageTick",
  setup(e) {
    const t = ne(), n = f(() => t.rows.value.filter((l) => t.isSelected(l)).length), a = f(
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
    }, null, 40, nr));
  }
}), ar = { class: "dc-pick" }, sr = ["id"], lr = ["id", "aria-expanded", "aria-labelledby", "data-dc-value"], rr = {
  key: 0,
  class: "dc-pick__icon",
  viewBox: "0 0 16 16",
  "aria-hidden": "true"
}, or = ["d"], ir = { class: "dc-pick__label" }, cr = /* @__PURE__ */ K({
  __name: "PickControl",
  props: {
    modelValue: {},
    options: {},
    label: {},
    mono: { type: Boolean }
  },
  emits: ["update:modelValue", "open", "close"],
  setup(e, { emit: t }) {
    const n = e, a = t, s = Pt() ?? "dc-pick", l = H(null), o = H(null), i = H(null), r = H(!1), c = f(() => i.value !== null), d = H(null), v = f(
      () => n.options.find((b) => b.key === n.modelValue) ?? n.options[0]
    ), _ = f(
      () => n.options.map((b) => ({
        id: b.key,
        label: b.label,
        icon: b.icon,
        checked: b.key === n.modelValue
      }))
    ), y = f(
      () => i.value ? { maxHeight: `${window.innerHeight - i.value.y - 8}px` } : void 0
    );
    function g(b) {
      const E = l.value?.getBoundingClientRect();
      E && (d.value = l.value?.closest(".dc-shell") ?? document.body, i.value = { x: E.left, y: E.bottom + 4, mirrorX: E.right }, r.value = b, a("open"));
    }
    function p(b) {
      i.value && a("close"), i.value = null, b && l.value?.focus();
    }
    function k() {
      c.value ? p(!0) : g(!1);
    }
    function P(b) {
      b.key !== "ArrowDown" && b.key !== "ArrowUp" || c.value || (b.preventDefault(), g(!0));
    }
    function x(b) {
      const E = b.target;
      E && (l.value?.contains(E) || o.value?.root?.contains(E) || p(!1));
    }
    ae(c, (b) => {
      b ? window.addEventListener("pointerdown", x, !0) : window.removeEventListener("pointerdown", x, !0);
    }), ge(() => window.removeEventListener("pointerdown", x, !0));
    function m(b) {
      p(!0), !(b.id === void 0 || b.id === n.modelValue) && a("update:modelValue", b.id);
    }
    return (b, E) => (u(), h("span", ar, [
      S("span", {
        id: `${w(s)}-name`,
        class: "dc-pick__name"
      }, L(e.label), 9, sr),
      S("button", {
        id: `${w(s)}-value`,
        ref_key: "trigger",
        ref: l,
        type: "button",
        class: oe(["dc-pick__button", { "dc-mono": e.mono }]),
        "aria-haspopup": "menu",
        "aria-expanded": c.value,
        "aria-labelledby": `${w(s)}-name ${w(s)}-value`,
        "data-dc-value": e.modelValue,
        onClick: k,
        onKeydown: P
      }, [
        v.value?.icon ? (u(), h("svg", rr, [
          S("path", {
            d: v.value.icon
          }, null, 8, or)
        ])) : T("", !0),
        S("span", ir, L(v.value?.label), 1)
      ], 42, lr),
      E[1] || (E[1] = S("svg", {
        class: "dc-pick__mark",
        viewBox: "0 0 16 16",
        "aria-hidden": "true"
      }, [
        S("path", { d: "M4 6l4 4 4-4" })
      ], -1)),
      i.value && d.value ? (u(), I(St, {
        key: 0,
        to: d.value
      }, [
        j(w(ns), {
          ref_key: "menu",
          ref: o,
          class: "dc-pick__list",
          style: le(y.value),
          items: _.value,
          at: i.value,
          label: e.label,
          autofocus: r.value,
          onChoose: m,
          onDismiss: E[0] || (E[0] = (O) => p(!0))
        }, null, 8, ["style", "items", "at", "label", "autofocus"])
      ], 8, ["to"])) : T("", !0)
    ]));
  }
}), en = /* @__PURE__ */ z(cr, [["__scopeId", "data-v-7e5be459"]]), ur = {
  class: "dc-pager",
  "aria-label": "Pages"
}, dr = ["title"], fr = ["value", "onKeydown"], vr = {
  class: "dc-pager__total",
  "aria-hidden": "true"
}, pr = {
  class: "dc-pager__sr",
  "aria-live": "polite"
}, hr = /* @__PURE__ */ K({
  __name: "ShellPager",
  props: {
    pagesNote: {}
  },
  setup(e) {
    const t = e, n = ne(), a = f(() => n.liveQuery.value.page), s = f(
      () => `${n.counting.value ? "~" : ""}${He(n.pageCount.value)}`
    ), l = f(() => {
      if (n.limit.value === 1) {
        const p = `Record ${He(a.value)} of ${s.value}`;
        return t.pagesNote ? `${p}
${t.pagesNote}` : p;
      }
      let y = `Page ${He(a.value)} of ${s.value}`;
      const g = n.rows.value.length;
      if (g) {
        const p = n.offset.value + 1, k = `${n.counting.value ? "~" : ""}${He(n.total.value)}`;
        y += ` — rows ${He(p)} to ${He(p + g - 1)} of ${k}`;
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
      const g = y.target, p = g.value.replace(/[^0-9]/g, "");
      g.value !== p && (g.value = p), o.value = p;
    }
    function v(y) {
      const g = y.target, p = Number(o.value);
      o.value = null;
      const k = Number.isFinite(p) && p >= 1 ? Math.min(Math.trunc(p), Math.max(1, n.pageCount.value)) : a.value;
      g.value = String(k), k !== a.value && n.setPage(k);
    }
    function _(y) {
      const g = y.target;
      o.value = null, g.value = String(a.value), g.blur();
    }
    return (y, g) => (u(), h("nav", ur, [
      j(se, {
        class: "dc-pager__step",
        "aria-label": "Previous page",
        href: a.value > 1 ? w(n).hrefFor({ page: a.value - 1 }) : null,
        disabled: a.value <= 1,
        onPress: g[0] || (g[0] = (p) => w(n).setPage(a.value - 1))
      }, {
        default: G(() => [...g[2] || (g[2] = [
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
          style: le({ width: r.value }),
          value: i.value,
          onFocus: c,
          onInput: d,
          onKeydown: [
            Me(Le(v, ["prevent"]), ["enter"]),
            Me(Le(_, ["prevent"]), ["esc"])
          ],
          onBlur: v
        }, null, 44, fr),
        S("span", vr, "/ " + L(s.value), 1)
      ], 8, dr),
      S("span", pr, L(l.value), 1),
      j(se, {
        class: "dc-pager__step",
        "aria-label": "Next page",
        href: a.value < w(n).pageCount.value ? w(n).hrefFor({ page: a.value + 1 }) : null,
        disabled: a.value >= w(n).pageCount.value,
        onPress: g[1] || (g[1] = (p) => w(n).setPage(a.value + 1))
      }, {
        default: G(() => [...g[3] || (g[3] = [
          S("span", { "aria-hidden": "true" }, "›", -1)
        ])]),
        _: 1
      }, 8, ["href", "disabled"])
    ]));
  }
}), mr = /* @__PURE__ */ z(hr, [["__scopeId", "data-v-94fea4d7"]]), yr = {
  key: 0,
  class: "dc-actions__order"
}, gr = {
  key: 1,
  class: "dc-actions__select"
}, _r = {
  key: 0,
  class: "dc-actions__all"
}, wr = {
  class: "dc-actions__count",
  "aria-live": "polite"
}, kr = {
  key: 1,
  class: "dc-actions__count dc-actions__all",
  "aria-live": "polite"
}, br = { class: "dc-actions__ops" }, $r = ["disabled"], xr = ["data-dc-operation", "disabled", "onClick"], Sr = ["disabled"], Cr = /* @__PURE__ */ K({
  __name: "RecordActions",
  props: {
    views: {},
    selectionPlacement: {},
    pagesNote: {}
  },
  setup(e) {
    const t = e, n = ne(), a = f(() => Fe(n.query.value.view, t.views)), s = f(
      () => (d.value || v.value) && a.value !== "table" && n.sorts.value.length > 0
    ), l = f(
      () => n.sorts.value.map((b) => ({ key: b.key, label: b.label }))
    ), o = f(() => s.value && l.value.length > 1), i = f(() => n.query.value.dir === "desc"), r = f(
      () => `Sorted by ${n.sort.value.label}, ${i.value ? "descending" : "ascending"}`
    ), c = f(() => n.entity.value), d = f(
      () => !aa(n.query.value, t.views) && a.value !== "record"
    ), v = f(() => a.value === "record" && n.query.value.entity !== null), _ = f(
      () => (d.value || v.value) && !n.loading.value && (n.pageCount.value > 1 || !!t.pagesNote)
    ), y = f(() => n.selection.value.ids.length), g = f(
      () => d.value && n.selectable.value && (n.rows.value.length > 0 || y.value > 0)
    ), p = f(() => a.value === "table"), k = f(
      () => s.value || _.value || d.value && (g.value || !!(c.value?.create || c.value?.duplicate || c.value?.delete || c.value?.operations?.length))
    ), P = f(() => y.value ? `${y.value} selected` : p.value ? "" : "Select all"), x = f(() => t.selectionPlacement === "end");
    function m(b) {
      return y.value ? b.endsWith("…") ? `${b.slice(0, -1)} ${y.value}…` : `${b} ${y.value}` : b;
    }
    return (b, E) => k.value ? (u(), h("div", {
      key: 0,
      class: oe(["dc-actions", { "dc-actions--selection-end": x.value }])
    }, [
      s.value ? (u(), h("span", yr, [
        o.value ? (u(), I(en, {
          key: 0,
          class: "dc-actions__pick dc-actions__sort",
          label: "Sort",
          "model-value": w(n).sort.value.key,
          options: l.value,
          "onUpdate:modelValue": w(n).setSort
        }, null, 8, ["model-value", "options", "onUpdate:modelValue"])) : T("", !0),
        j(se, {
          class: "dc-actions__dir",
          "aria-label": r.value,
          title: r.value,
          href: w(n).hrefFor({ dir: i.value ? "asc" : "desc" }),
          onPress: E[0] || (E[0] = (O) => w(n).toggleDirection())
        }, {
          default: G(() => [
            te(L(i.value ? "↓" : "↑"), 1)
          ]),
          _: 1
        }, 8, ["aria-label", "title", "href"])
      ])) : T("", !0),
      g.value && P.value ? (u(), h("div", gr, [
        p.value ? (u(), h("span", kr, L(P.value), 1)) : (u(), h("label", _r, [
          j(Na),
          S("span", wr, L(P.value), 1)
        ])),
        y.value ? (u(), h("button", {
          key: 2,
          type: "button",
          class: oe(["dc-actions__clear", { "dc-actions__clear--op": x.value }]),
          onClick: E[1] || (E[1] = (O) => w(n).clearSelection())
        }, " Clear ", 2)) : T("", !0)
      ])) : T("", !0),
      S("div", br, [
        c.value?.create ? (u(), I(se, {
          key: 0,
          class: "dc-actions__op dc-actions__new",
          href: w(n).createHref?.(c.value),
          onPress: E[2] || (E[2] = (O) => w(n).create(c.value))
        }, {
          default: G(() => [
            E[5] || (E[5] = S("span", {
              class: "dc-actions__plus",
              "aria-hidden": "true"
            }, "+", -1)),
            te(" " + L(c.value.create), 1)
          ]),
          _: 1
        }, 8, ["href"])) : T("", !0),
        c.value?.duplicate ? (u(), h("button", {
          key: 1,
          type: "button",
          class: "dc-actions__op",
          disabled: !y.value,
          onClick: E[3] || (E[3] = (O) => w(n).duplicate())
        }, L(m(c.value.duplicate)), 9, $r)) : T("", !0),
        (u(!0), h(D, null, J(c.value?.operations ?? [], (O) => (u(), h("button", {
          key: O.key,
          type: "button",
          class: "dc-actions__op",
          "data-dc-operation": O.key,
          disabled: !y.value && O.selection !== !1,
          onClick: (X) => w(n).operate(O.key)
        }, L(O.selection === !1 ? O.label : m(O.label)), 9, xr))), 128)),
        c.value?.delete ? (u(), h("button", {
          key: 2,
          type: "button",
          class: "dc-actions__op dc-actions__danger",
          disabled: !y.value,
          onClick: E[4] || (E[4] = (O) => w(n).delete())
        }, L(m(c.value.delete)), 9, Sr)) : T("", !0)
      ]),
      _.value ? (u(), I(mr, {
        key: 2,
        class: "dc-actions__pages",
        "pages-note": e.pagesNote
      }, null, 8, ["pages-note"])) : T("", !0)
    ], 2)) : T("", !0);
  }
}), tn = /* @__PURE__ */ z(Cr, [["__scopeId", "data-v-4921c240"]]);
function Pr(e) {
  const t = pe(/* @__PURE__ */ new Map()), n = H(!0);
  let a = 0, s;
  const l = () => {
    a++, s?.abort(), s = void 0;
  }, o = () => {
    l();
    const i = a, { signal: r } = s = new AbortController(), c = e.query.value, d = e.schema.value, v = e.entities.value, _ = e.within?.value.trim() ?? "";
    n.value = c.expr.trim() === "" && !_;
    const y = /* @__PURE__ */ new Map();
    let g = !0;
    for (const p of v) {
      const k = $a(p, c.expr), P = _ ? fn(_, k) : k;
      let x = !1;
      const m = (E) => {
        if (i !== a) return;
        if (g) {
          y.set(p.key, E);
          return;
        }
        const O = new Map(t.value);
        O.set(p.key, E), t.value = O;
      }, b = e.source.value.query({
        query: { ...c, entity: p.key, expr: P, page: 1 },
        schema: d,
        entity: p,
        limit: 0,
        offset: 0,
        signal: r,
        progress: (E) => {
          x || m({ total: E, pending: !0, counted: !0 });
        }
      });
      b instanceof Promise ? (y.has(p.key) || y.set(p.key, { total: 0, pending: !0, counted: !1 }), b.then((E) => {
        x = !0, m({ total: E.total, pending: !1, counted: !0 });
      })) : (x = !0, y.set(p.key, { total: b.total, pending: !1, counted: !0 }));
    }
    g = !1, t.value = y;
  };
  return Xn() && xt(l), { counts: t, pristine: n, refresh: o, cancel: l };
}
const Er = {
  key: 0,
  class: "dc-choosers"
}, Mr = "…", Lr = /* @__PURE__ */ K({
  __name: "RecordChoosers",
  props: {
    views: {},
    typeChooser: {}
  },
  setup(e) {
    const t = e, n = ne(), a = f(
      () => n.hasFacets.value || !!n.liveQuery.value.expr.trim() || !!n.within.value
    ), s = Pr({
      source: n.source,
      schema: n.schema,
      // What each type holds of what is on screen, the draft's results included:
      // a count of the committed query would disagree with the rows under it.
      query: n.liveQuery,
      entities: n.entities,
      within: n.within
    });
    function l(y) {
      if (y.key === n.query.value.entity && a.value) return pt(n.total.value);
      if (s.pristine.value) return Ut(y);
      const p = s.counts.value.get(y.key);
      return p ? p.counted ? `${p.pending ? "~" : ""}${pt(p.total)}` : Mr : Ut(y);
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
      () => (t.views ?? [...on]).map((y) => ({
        key: y,
        label: y === "record" ? n.recordView.value?.label ?? Pn.record : Pn[y],
        icon: ps[y]
      }))
    ), d = f(() => Fe(n.query.value.view, t.views)), v = f(() => c.value.length > 1);
    function _(y) {
      n.setView(y);
    }
    return (y, g) => i.value || v.value ? (u(), h("div", Er, [
      i.value ? (u(), I(en, {
        key: 0,
        class: "dc-actions__pick dc-actions__type",
        label: "Type",
        "model-value": w(n).query.value.entity ?? "",
        options: o.value,
        onOpen: w(s).refresh,
        onClose: w(s).cancel,
        "onUpdate:modelValue": r
      }, null, 8, ["model-value", "options", "onOpen", "onClose"])) : T("", !0),
      v.value ? (u(), I(en, {
        key: 1,
        class: "dc-actions__pick dc-actions__view",
        label: "View",
        "model-value": d.value,
        options: c.value,
        "onUpdate:modelValue": _
      }, null, 8, ["model-value", "options"])) : T("", !0)
    ])) : T("", !0);
  }
}), Tr = /* @__PURE__ */ z(Lr, [["__scopeId", "data-v-5a44a2f3"]]);
function Or(e, t) {
  if (!e) return null;
  const n = ie(e, t);
  return typeof n == "string" && n.trim() ? n : null;
}
const Nr = (e) => e == null || typeof e == "string" && !e.trim();
function Ar(e, t) {
  const n = ve(t, "state"), a = ve(t, "tint");
  return {
    identity: vt(ve(t, "identity"), e),
    reference: vt(ve(t, "reference"), e),
    metrics: sa(t, "metric").map((s) => ({
      column: s,
      label: s.label ?? "",
      text: Te(s, e)
    })),
    facts: t.filter((s) => s.cardLabel && !Nr(ie(s, e))).map((s) => ({
      column: s,
      label: s.cardLabel,
      title: [s.label, s.hint].filter(Boolean).join(" — "),
      text: Te(s, e)
    })),
    state: n ? ie(n, e) ?? null : null,
    updated: vt(ve(t, "updated"), e),
    image: Or(ve(t, "image"), e),
    tint: a ? ie(a, e) ?? null : null
  };
}
function Aa(e, t, n, a, s = !1) {
  const l = n?.columns ?? [];
  return {
    row: e,
    key: ks(e, t),
    entityLabel: e.entityLabel,
    entity: n,
    columns: l,
    ordinal: os(t),
    parts: Ar(e, l),
    pinned: a,
    selected: s
  };
}
function Ne() {
  const e = ne(), t = f(
    () => new Map(e.entities.value.map((n) => [n.key, n]))
  );
  return f(
    () => e.rows.value.map(
      (n, a) => Aa(
        n,
        e.offset.value + a,
        t.value.get(n.entityKey) ?? null,
        e.isPinned(n),
        e.isSelected(n)
      )
    )
  );
}
const Ir = ["data-dc-status", "data-dc-tone"], Rr = /* @__PURE__ */ K({
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
    }, L(n.value), 9, Ir));
  }
}), Ve = /* @__PURE__ */ z(Rr, [["__scopeId", "data-v-686eb9b6"]]), Br = { key: 1 }, Hr = /* @__PURE__ */ K({
  __name: "MetricDrill",
  props: {
    entry: {},
    column: {}
  },
  setup(e) {
    const t = e, n = ne(), a = f(() => !t.entry.entity?.scope || !t.column.drill ? null : n.entities.value.find((c) => c.key === t.column.drill) ?? null), s = f(() => t.column.label ?? ""), l = f(() => Te(t.column, t.entry.row)), o = f(() => a.value ? n.drillHref(t.entry.row, a.value) : null);
    function i(r, c) {
      c.stopPropagation(), a.value && n.drill(t.entry.row, a.value, r);
    }
    return (r, c) => a.value ? (u(), I(se, {
      key: 0,
      class: "dc-drill",
      href: o.value,
      title: `${s.value} of ${e.entry.parts.identity} — show the ${a.value.label.toLowerCase()}`,
      onPress: i
    }, {
      default: G(() => [
        Y(r.$slots, "default", {}, () => [
          te(L(l.value), 1)
        ], !0)
      ]),
      _: 3
    }, 8, ["href", "title"])) : (u(), h("span", Br, [
      Y(r.$slots, "default", {}, () => [
        te(L(l.value), 1)
      ], !0)
    ]));
  }
}), ct = /* @__PURE__ */ z(Hr, [["__scopeId", "data-v-d3e7f4e0"]]), qr = ["data-dc-active", "aria-pressed", "aria-label"], Fr = /* @__PURE__ */ K({
  __name: "PinStar",
  props: {
    row: {},
    pinned: { type: Boolean },
    name: {}
  },
  setup(e) {
    const t = e, n = ne();
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
    }, L(e.pinned ? "★" : "☆"), 9, qr));
  }
}), gn = /* @__PURE__ */ z(Fr, [["__scopeId", "data-v-ef63d763"]]), Vr = ["src"], Dr = /* @__PURE__ */ K({
  __name: "RowPicture",
  props: {
    src: {}
  },
  setup(e) {
    const t = e, n = H(!1);
    return ae(
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
    }, null, 40, Vr)) : T("", !0);
  }
}), It = /* @__PURE__ */ z(Dr, [["__scopeId", "data-v-afaab300"]]), Kr = ["data-dc-standing", "title", "aria-label"], Wr = /* @__PURE__ */ K({
  __name: "QueryMark",
  props: {
    entry: {}
  },
  setup(e) {
    const t = e, n = ne(), a = f(() => ot(t.entry.entity, t.entry.row)), s = f(() => mn(n.query.value.expr, a.value)), l = f(
      () => s.value === "in" ? `The query narrows to ${t.entry.parts.identity} — press to lift that` : `The query leaves out ${t.entry.parts.identity} — press to lift that`
    );
    function o(i) {
      i.stopPropagation(), n.setExpression(ka(n.query.value.expr, a.value));
    }
    return (i, r) => s.value ? (u(), h("button", {
      key: 0,
      type: "button",
      class: "dc-standing",
      "data-dc-standing": s.value,
      title: l.value,
      "aria-label": l.value,
      onClick: o
    }, L(s.value === "in" ? "+" : "−"), 9, Kr)) : T("", !0);
  }
}), _n = /* @__PURE__ */ z(Wr, [["__scopeId", "data-v-4b8d4166"]]), zr = ["aria-label"], jr = ["data-dc-standing", "data-dc-active", "aria-checked", "title", "aria-label", "onClick"], Ur = /* @__PURE__ */ K({
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
      (u(!0), h(D, null, J(s.value, (c) => (u(), h("button", {
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
      }, L(c.sign), 9, jr))), 128))
    ], 8, zr));
  }
}), nn = /* @__PURE__ */ z(Ur, [["__scopeId", "data-v-5524dca6"]]), Ia = /* @__PURE__ */ K({
  __name: "RowStanding",
  props: {
    entry: {}
  },
  setup(e) {
    const t = e, n = ne(), a = f(() => ot(t.entry.entity, t.entry.row)), s = f(() => mn(n.query.value.expr, a.value));
    function l(o) {
      n.setExpression(Gt(n.query.value.expr, a.value, o));
    }
    return (o, i) => a.value !== null ? (u(), I(nn, {
      key: 0,
      class: "dc-row-standing",
      standing: s.value,
      name: e.entry.parts.identity,
      onSet: l
    }, null, 8, ["standing", "name"])) : T("", !0);
  }
}), Qr = ["href", "title", "aria-label"], Yr = /* @__PURE__ */ K({
  __name: "OpenMark",
  props: {
    entry: {}
  },
  setup(e) {
    const t = e, n = ne(), a = f(() => {
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
      onClick: l[0] || (l[0] = Le(() => {
      }, ["stop"]))
    }, "↗", 8, Qr)) : T("", !0);
  }
}), ut = /* @__PURE__ */ z(Yr, [["__scopeId", "data-v-b00f390d"]]), Gr = /* @__PURE__ */ K({
  __name: "ScopeMark",
  props: {
    entry: {}
  },
  setup(e) {
    const t = e, n = ne(), a = f(
      () => n.narrowsOnPress.value ? null : t.entry.entity?.scope ?? null
    ), s = H(null);
    function l(d) {
      s.value = tt(d).exclude ? "out" : "in";
    }
    function o(d) {
      l(d), window.addEventListener("keydown", l), window.addEventListener("keyup", l);
    }
    function i() {
      s.value = null, window.removeEventListener("keydown", l), window.removeEventListener("keyup", l);
    }
    ge(i);
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
      default: G(() => [...v[0] || (v[0] = [
        te(" → ", -1)
      ])]),
      _: 1
    }, 8, ["href", "data-dc-pending", "title", "aria-label"])) : T("", !0);
  }
}), dt = /* @__PURE__ */ z(Gr, [["__scopeId", "data-v-05d2c233"]]), Xr = ["checked", "aria-label"], Ae = /* @__PURE__ */ K({
  __name: "SelectTick",
  props: {
    row: {},
    selected: { type: Boolean },
    name: {}
  },
  setup(e) {
    const t = e, n = ne();
    function a(s) {
      s.stopPropagation(), n.toggleSelect(t.row);
    }
    return (s, l) => (u(), h("input", {
      class: "dc-tick",
      type: "checkbox",
      checked: e.selected,
      "aria-label": `Select ${e.name}`,
      onClick: a
    }, null, 8, Xr));
  }
}), Jr = { class: "dc-card__top dc-mono" }, Zr = { class: "dc-card__lead" }, eo = {
  key: 2,
  class: "dc-card__entity"
}, to = { class: "dc-card__top-right" }, no = { class: "dc-card__names" }, ao = { class: "dc-card__primary" }, so = {
  key: 0,
  class: "dc-card__secondary dc-mono"
}, lo = {
  key: 1,
  class: "dc-card__facts dc-mono"
}, ro = ["title"], oo = { class: "dc-card__fact-label" }, io = {
  key: 0,
  class: "dc-card__metrics dc-mono"
}, co = {
  key: 0,
  class: "dc-card__date"
}, uo = /* @__PURE__ */ K({
  __name: "CardsView",
  setup(e) {
    const t = ne(), n = Ne(), a = f(() => t.isEverything.value), s = (o) => o.entity?.card === "picture", l = f(() => n.value.length > 0 && n.value.every(s));
    return (o, i) => (u(), h("div", {
      class: oe(["dc-cards", { "dc-cards--pictures": l.value }])
    }, [
      (u(!0), h(D, null, J(w(n), (r) => (u(), h("div", {
        key: r.key,
        class: oe(["dc-card", { "dc-card--picture": s(r) }])
      }, [
        S("div", Jr, [
          S("span", Zr, [
            w(t).selectable.value ? (u(), I(Ae, {
              key: 0,
              row: r.row,
              selected: r.selected,
              name: r.parts.identity
            }, null, 8, ["row", "selected", "name"])) : T("", !0),
            s(r) ? T("", !0) : (u(), h(D, { key: 1 }, [
              te(L(r.ordinal), 1)
            ], 64)),
            a.value ? (u(), h("span", eo, L(r.entityLabel), 1)) : T("", !0)
          ]),
          S("span", to, [
            r.parts.state && !s(r) ? (u(), I(Ve, {
              key: 0,
              status: r.parts.state
            }, null, 8, ["status"])) : T("", !0),
            s(r) ? (u(), I(_n, {
              key: 1,
              entry: r
            }, null, 8, ["entry"])) : (u(), I(Ia, {
              key: 2,
              entry: r
            }, null, 8, ["entry"])),
            j(dt, { entry: r }, null, 8, ["entry"]),
            j(ut, { entry: r }, null, 8, ["entry"]),
            w(t).pinnable.value ? (u(), I(gn, {
              key: 3,
              row: r.row,
              name: r.parts.identity,
              pinned: r.pinned
            }, null, 8, ["row", "name", "pinned"])) : T("", !0)
          ])
        ]),
        j(se, {
          class: "dc-card__open",
          href: w(t).pressHref(r.row),
          onPress: (c) => w(t).activate(r.row, c)
        }, {
          default: G(() => [
            r.parts.image ? (u(), I(It, {
              key: 0,
              class: "dc-card__image",
              src: r.parts.image
            }, null, 8, ["src"])) : T("", !0),
            S("span", no, [
              S("span", ao, L(r.parts.identity), 1),
              s(r) ? T("", !0) : (u(), h("span", so, L(r.parts.reference), 1)),
              r.parts.facts.length ? (u(), h("span", lo, [
                (u(!0), h(D, null, J(r.parts.facts, (c) => (u(), h("span", {
                  key: c.column.key ?? c.label,
                  class: "dc-card__fact",
                  title: c.title || void 0
                }, [
                  S("span", oo, L(c.label), 1),
                  te(" " + L(c.text), 1)
                ], 8, ro))), 128))
              ])) : T("", !0)
            ])
          ]),
          _: 2
        }, 1032, ["href", "onPress"]),
        s(r) ? T("", !0) : (u(), h("div", io, [
          (u(!0), h(D, null, J(r.parts.metrics.slice(0, 2), (c) => (u(), I(ct, {
            key: c.column.key ?? c.label,
            entry: r,
            column: c.column
          }, {
            default: G(() => [
              te(L(c.label) + " " + L(c.text), 1)
            ]),
            _: 2
          }, 1032, ["entry", "column"]))), 128)),
          r.parts.updated ? (u(), h("span", co, L(r.parts.updated), 1)) : T("", !0)
        ]))
      ], 2))), 128))
    ], 2));
  }
}), Ra = /* @__PURE__ */ z(uo, [["__scopeId", "data-v-fd252138"]]), fo = { class: "dc-grid" }, vo = { class: "dc-tile__scrim" }, po = { class: "dc-tile__top dc-mono" }, ho = { class: "dc-tile__chip" }, mo = { class: "dc-tile__caption" }, yo = { class: "dc-tile__secondary dc-truncate" }, go = { class: "dc-tile__primary" }, _o = /* @__PURE__ */ K({
  __name: "GridView",
  setup(e) {
    const t = ne(), n = Ne();
    return (a, s) => (u(), h("div", fo, [
      (u(!0), h(D, null, J(w(n), (l) => (u(), h("div", {
        key: l.key,
        class: "dc-grid__cell"
      }, [
        j(se, {
          class: "dc-tile",
          style: le({ "--dc-tile-tint": l.parts.tint ?? void 0 }),
          href: w(t).pressHref(l.row),
          onPress: (o) => w(t).activate(l.row, o)
        }, {
          default: G(() => [
            l.parts.image ? (u(), I(It, {
              key: 0,
              class: "dc-tile__image",
              src: l.parts.image
            }, null, 8, ["src"])) : T("", !0),
            S("span", vo, [
              S("span", po, [
                S("span", ho, L(l.ordinal), 1)
              ]),
              S("span", mo, [
                S("span", yo, L(l.parts.reference), 1),
                S("span", go, L(l.parts.identity), 1)
              ])
            ])
          ]),
          _: 2
        }, 1032, ["style", "href", "onPress"]),
        w(t).selectable.value ? (u(), I(Ae, {
          key: 0,
          class: "dc-grid__tick",
          row: l.row,
          selected: l.selected,
          name: l.parts.identity
        }, null, 8, ["row", "selected", "name"])) : T("", !0)
      ]))), 128))
    ]));
  }
}), Ba = /* @__PURE__ */ z(_o, [["__scopeId", "data-v-89c40a9e"]]);
function Wn(e, t, n, a) {
  return (n - a * (t - 1)) / e;
}
function Kt(e, t) {
  return e > 0 ? Math.min(t, e) : t;
}
function wo(e) {
  return e > 0 ? e : 1 / 0;
}
function ko(e, t, n) {
  const { width: a, height: s, gap: l = 0 } = n;
  if (!e.length) return [];
  if (!(a > 0) || !(s > 0)) return [{ items: [...e], height: s, filled: !1 }];
  const o = [];
  let i = [], r = 0, c = 0;
  for (const d of e) {
    const v = t(d), _ = Math.max(v.ratio, Number.EPSILON), y = v.height && v.height > 0 ? Math.max(c, v.height) : c, g = Kt(y, s), p = Wn(r + _, i.length + 1, a, l);
    if (p > g) {
      i.push(d), r += _, c = y;
      continue;
    }
    const k = Kt(c, s), P = i.length ? Wn(r, i.length, a, l) : 1 / 0;
    P <= wo(c) && P - k < g - p ? (o.push({ items: i, height: P, filled: !0 }), i = [d], r = _, c = v.height && v.height > 0 ? v.height : 0) : (o.push({ items: [...i, d], height: p, filled: !0 }), i = [], r = 0, c = 0);
  }
  return i.length && o.push({ items: i, height: Kt(c, s), filled: !1 }), o;
}
const bo = { class: "dc-images" }, $o = {
  key: 1,
  class: "dc-images__blank",
  "aria-hidden": "true"
}, xo = 240, ft = 8, So = 1, Co = /* @__PURE__ */ K({
  __name: "ImagesView",
  setup(e) {
    const t = ne(), n = Ne(), a = bn(/* @__PURE__ */ new Map()), s = bn(/* @__PURE__ */ new Set());
    function l(g, p) {
      const k = p.target;
      k.naturalWidth > 0 && k.naturalHeight > 0 && a.set(g, { width: k.naturalWidth, height: k.naturalHeight });
    }
    function o(g) {
      const p = g.parts.image;
      return p && !s.has(p) ? p : null;
    }
    function i(g) {
      const p = o(g);
      return p ? a.get(p) : void 0;
    }
    function r(g) {
      const p = i(g);
      return p ? { ratio: p.width / p.height, height: p.height } : { ratio: So };
    }
    const c = H(null), d = H(0);
    let v = null;
    function _() {
      d.value = c.value?.clientWidth ?? 0;
    }
    lt(() => {
      _(), !(!c.value || typeof ResizeObserver > "u") && (v = new ResizeObserver(_), v.observe(c.value));
    }), ge(() => {
      v?.disconnect(), v = null;
    });
    const y = f(() => {
      const g = ko(n.value, r, {
        width: d.value,
        height: xo,
        gap: ft
      }), p = [];
      let k = 0;
      for (const P of g) {
        let x = 0;
        for (const m of P.items) {
          const b = r(m).ratio * P.height, E = i(m), O = E !== void 0 && E.height < P.height;
          p.push({
            entry: m,
            style: {
              top: `${k}px`,
              left: `${x}px`,
              width: `${b}px`,
              height: `${P.height}px`
            },
            picture: O ? { width: `${E.width}px`, height: `${E.height}px` } : { width: "100%", height: "100%" }
          }), x += b + ft;
        }
        k += P.height + ft;
      }
      return { boxes: p, height: g.length ? k - ft : 0 };
    });
    return (g, p) => (u(), h("div", bo, [
      S("div", {
        ref_key: "wall",
        ref: c,
        class: "dc-images__wall",
        style: le({ height: `${y.value.height}px` })
      }, [
        (u(!0), h(D, null, J(y.value.boxes, ({ entry: k, style: P, picture: x }) => (u(), h("div", {
          key: k.key,
          class: "dc-images__cell",
          style: le(P)
        }, [
          j(se, {
            class: "dc-images__open",
            title: k.parts.identity,
            "aria-label": k.parts.identity,
            href: w(t).pressHref(k.row),
            onPress: (m) => w(t).activate(k.row, m)
          }, {
            default: G(() => [
              o(k) ? (u(), I(It, {
                key: 0,
                class: "dc-images__picture",
                style: le(x),
                src: o(k),
                onLoad: (m) => l(o(k), m),
                onError: (m) => s.add(o(k))
              }, null, 8, ["style", "src", "onLoad", "onError"])) : (u(), h("span", $o, L(k.parts.identity), 1))
            ]),
            _: 2
          }, 1032, ["title", "aria-label", "href", "onPress"]),
          w(t).selectable.value ? (u(), I(Ae, {
            key: 0,
            class: "dc-images__tick",
            row: k.row,
            selected: k.selected,
            name: k.parts.identity
          }, null, 8, ["row", "selected", "name"])) : T("", !0)
        ], 4))), 128))
      ], 4)
    ]));
  }
}), Ha = /* @__PURE__ */ z(Co, [["__scopeId", "data-v-2d267370"]]), Po = { class: "dc-links" }, Eo = { class: "dc-link__primary dc-truncate" }, Mo = { class: "dc-link__secondary dc-mono dc-truncate" }, Lo = /* @__PURE__ */ K({
  __name: "LinksView",
  setup(e) {
    const t = ne(), n = Ne();
    return (a, s) => (u(), h("div", Po, [
      (u(!0), h(D, null, J(w(n), (l) => (u(), h("span", {
        key: l.key,
        class: "dc-links__item"
      }, [
        w(t).selectable.value ? (u(), I(Ae, {
          key: 0,
          row: l.row,
          selected: l.selected,
          name: l.parts.identity
        }, null, 8, ["row", "selected", "name"])) : T("", !0),
        j(se, {
          class: "dc-link",
          href: w(t).pressHref(l.row),
          onPress: (o) => w(t).activate(l.row, o)
        }, {
          default: G(() => [
            S("span", Eo, L(l.parts.identity), 1),
            S("span", Mo, L(l.parts.reference), 1)
          ]),
          _: 2
        }, 1032, ["href", "onPress"])
      ]))), 128))
    ]));
  }
}), qa = /* @__PURE__ */ z(Lo, [["__scopeId", "data-v-de6c9a0f"]]), To = {
  class: "dc-list",
  role: "list"
}, Oo = { class: "dc-list__ordinal dc-mono" }, No = { class: "dc-list__identity" }, Ao = { class: "dc-list__primary dc-truncate" }, Io = { class: "dc-list__secondary dc-mono dc-truncate" }, Ro = {
  key: 1,
  class: "dc-list__entity dc-mono"
}, Bo = { class: "dc-list__metrics dc-mono" }, Ho = { class: "dc-list__trailing" }, qo = /* @__PURE__ */ K({
  __name: "ListView",
  setup(e) {
    const t = ne(), n = Ne(), a = f(() => t.isEverything.value);
    return (s, l) => (u(), h("div", To, [
      (u(!0), h(D, null, J(w(n), (o) => (u(), h("div", {
        key: o.key,
        class: "dc-list__row",
        role: "listitem"
      }, [
        w(t).selectable.value ? (u(), I(Ae, {
          key: 0,
          class: "dc-list__tick",
          row: o.row,
          selected: o.selected,
          name: o.parts.identity
        }, null, 8, ["row", "selected", "name"])) : T("", !0),
        j(Ia, {
          class: "dc-list__standing",
          entry: o
        }, null, 8, ["entry"]),
        j(se, {
          class: "dc-list__open",
          href: w(t).pressHref(o.row),
          onPress: (i) => w(t).activate(o.row, i)
        }, {
          default: G(() => [
            S("span", Oo, L(o.ordinal), 1),
            S("span", No, [
              S("span", Ao, L(o.parts.identity), 1),
              S("span", Io, L(o.parts.reference), 1)
            ])
          ]),
          _: 2
        }, 1032, ["href", "onPress"]),
        a.value ? (u(), h("span", Ro, L(o.entityLabel), 1)) : T("", !0),
        S("span", Bo, [
          (u(!0), h(D, null, J(o.parts.metrics.slice(0, 2), (i) => (u(), I(ct, {
            key: i.column.key ?? i.label,
            entry: o,
            column: i.column
          }, null, 8, ["entry", "column"]))), 128))
        ]),
        S("span", Ho, [
          o.parts.state ? (u(), I(Ve, {
            key: 0,
            status: o.parts.state
          }, null, 8, ["status"])) : T("", !0),
          j(dt, { entry: o }, null, 8, ["entry"]),
          j(ut, { entry: o }, null, 8, ["entry"]),
          w(t).pinnable.value ? (u(), I(gn, {
            key: 1,
            row: o.row,
            name: o.parts.identity,
            pinned: o.pinned
          }, null, 8, ["row", "name", "pinned"])) : T("", !0)
        ])
      ]))), 128))
    ]));
  }
}), an = /* @__PURE__ */ z(qo, [["__scopeId", "data-v-3d349a10"]]), Fo = { class: "dc-preview" }, Vo = { class: "dc-preview__pager dc-mono" }, Do = ["disabled"], Ko = { "aria-live": "polite" }, Wo = ["disabled"], zo = {
  key: 0,
  class: "dc-preview__card"
}, jo = ["src"], Uo = { class: "dc-preview__body" }, Qo = { class: "dc-preview__top" }, Yo = { class: "dc-preview__badges" }, Go = { class: "dc-preview__entity dc-mono" }, Xo = { class: "dc-preview__marks" }, Jo = { class: "dc-preview__primary" }, Zo = { class: "dc-preview__secondary dc-mono" }, ei = { class: "dc-preview__fields" }, ti = { class: "dc-preview__key" }, ni = { class: "dc-preview__value dc-mono" }, ai = /* @__PURE__ */ K({
  __name: "PreviewView",
  setup(e) {
    const t = ne(), n = Ne(), a = H(0);
    ae(n, (r) => {
      a.value > r.length - 1 && (a.value = Math.max(0, r.length - 1));
    });
    const s = f(() => n.value[a.value]), l = f(() => {
      const r = s.value;
      if (!r) return [];
      const c = ve(r.columns, "reference"), d = ve(r.columns, "updated");
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
    return (r, c) => (u(), h("div", Fo, [
      S("div", Vo, [
        S("button", {
          type: "button",
          class: "dc-preview__step",
          "aria-label": "Previous result",
          disabled: a.value === 0,
          onClick: c[0] || (c[0] = (d) => i(-1))
        }, " ‹ ", 8, Do),
        S("span", Ko, L(o.value), 1),
        S("button", {
          type: "button",
          class: "dc-preview__step",
          "aria-label": "Next result",
          disabled: a.value >= w(n).length - 1,
          onClick: c[1] || (c[1] = (d) => i(1))
        }, " › ", 8, Wo)
      ]),
      s.value ? (u(), h("div", zo, [
        S("div", {
          class: "dc-preview__media",
          style: le({ background: s.value.parts.tint ?? void 0 }),
          "aria-hidden": "true"
        }, [
          s.value.parts.image ? (u(), h("img", {
            key: 0,
            class: "dc-preview__image",
            src: s.value.parts.image,
            alt: ""
          }, null, 8, jo)) : (u(), h(D, { key: 1 }, [
            te(" preview ")
          ], 64))
        ], 4),
        S("div", Uo, [
          S("div", Qo, [
            S("span", Yo, [
              w(t).selectable.value ? (u(), I(Ae, {
                key: 0,
                row: s.value.row,
                selected: s.value.selected,
                name: s.value.parts.identity
              }, null, 8, ["row", "selected", "name"])) : T("", !0),
              s.value.parts.state ? (u(), I(Ve, {
                key: 1,
                status: s.value.parts.state
              }, null, 8, ["status"])) : T("", !0),
              S("span", Go, L(s.value.entityLabel), 1)
            ]),
            S("span", Xo, [
              j(_n, { entry: s.value }, null, 8, ["entry"]),
              j(dt, { entry: s.value }, null, 8, ["entry"]),
              j(ut, { entry: s.value }, null, 8, ["entry"]),
              w(t).pinnable.value ? (u(), I(gn, {
                key: 0,
                row: s.value.row,
                name: s.value.parts.identity,
                pinned: s.value.pinned
              }, null, 8, ["row", "name", "pinned"])) : T("", !0)
            ])
          ]),
          S("div", null, [
            S("div", Jo, L(s.value.parts.identity), 1),
            S("div", Zo, L(s.value.parts.reference), 1)
          ]),
          S("dl", ei, [
            (u(!0), h(D, null, J(l.value, (d) => (u(), h("div", {
              key: d.key,
              class: "dc-preview__field"
            }, [
              S("dt", ti, L(d.key), 1),
              S("dd", ni, [
                d.column && s.value ? (u(), I(ct, {
                  key: 0,
                  entry: s.value,
                  column: d.column
                }, null, 8, ["entry", "column"])) : (u(), h(D, { key: 1 }, [
                  te(L(d.value), 1)
                ], 64))
              ])
            ]))), 128))
          ]),
          j(se, {
            class: "dc-preview__open",
            href: s.value ? w(t).pressHref(s.value.row) : null,
            onPress: c[2] || (c[2] = (d) => s.value && w(t).activate(s.value.row, d))
          }, {
            default: G(() => [...c[3] || (c[3] = [
              te(" Open record → ", -1)
            ])]),
            _: 1
          }, 8, ["href"])
        ])
      ])) : T("", !0)
    ]));
  }
}), Fa = /* @__PURE__ */ z(ai, [["__scopeId", "data-v-59e0d33b"]]);
function si() {
  const e = ne();
  return f(() => _s(e.schema.value, e.entity.value));
}
function wn(e, t) {
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
function Va(e, t) {
  const n = e.narrowsOnPress.value ? ot(t.entity, t.row) : null;
  return n ? { term: n, name: t.parts.identity } : null;
}
const li = /* @__PURE__ */ K({
  __name: "CellNarrow",
  props: {
    entry: {},
    column: {},
    narrowings: {},
    truncates: { type: Boolean }
  },
  setup(e) {
    const t = e, n = ne(), a = f(() => Te(t.column, t.entry.row));
    function s(v, _ = !1) {
      return v.entity !== void 0 ? `entity:${v.entity}` : we({ ...v.term, ..._ ? { negated: !0 } : {} });
    }
    function l(v, _ = !1) {
      return v.entity !== void 0 ? n.query.value.expr : et(n.query.value.expr, s(v, _));
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
    function d(v, _, y) {
      y.stopPropagation(), n.narrow(l(v, _.exclude), o(v));
    }
    return (v, _) => (u(), h("span", {
      class: oe(["dc-cell__text", { "dc-truncate": e.truncates }])
    }, [
      (u(!0), h(D, null, J(e.narrowings, (y, g) => (u(), h(D, {
        key: s(y)
      }, [
        g > 0 ? (u(), h(D, { key: 0 }, [
          te(", ")
        ], 64)) : T("", !0),
        j(se, qe({
          class: "dc-narrow",
          href: i(y),
          title: r(y),
          selectable: ""
        }, rn(w(wn)(w(n), c(y))), {
          onPress: (p, k) => d(y, p, k)
        }), {
          default: G(() => [
            Y(v.$slots, "default", {}, () => [
              te(L(y.label ?? a.value), 1)
            ], !0)
          ]),
          _: 2
        }, 1040, ["href", "title", "onPress"])
      ], 64))), 128))
    ], 2));
  }
}), zn = /* @__PURE__ */ z(li, [["__scopeId", "data-v-6e649daa"]]), ri = /* @__PURE__ */ new Set(["entitykey", "entitylabel"]), oi = /* @__PURE__ */ new Set(["ordinal", "image", "component", "date"]), ii = 4;
function Da(e) {
  return (e.field ?? e.key)?.toLowerCase();
}
function Ka(e) {
  return e.narrow === !1 || e.role === "identity" || e.activate || e.click || e.drill ? !1 : !oi.has(e.kind ?? "text") && Da(e) !== void 0;
}
function ci(e, t) {
  if (Number.isInteger(e)) return e;
  const n = 10 ** ii;
  return (t ? Math.ceil(e * n - 1e-6) : Math.floor(e * n + 1e-6)) / n;
}
function ui(e, t) {
  let n = 1 / 0, a = -1 / 0;
  for (const s of t) {
    const l = ie(e, s);
    typeof l != "number" || !Number.isFinite(l) || (l < n && (n = l), l > a && (a = l));
  }
  return n <= a ? { min: n, max: a } : null;
}
function di(e, t, n, a = null) {
  if (!Ka(e)) return [];
  const s = Da(e);
  if (ri.has(s) && !e.value)
    return t.entityKey ? [{ label: null, entity: t.entityKey }] : [];
  if (e.flags)
    return Object.entries(e.flags).filter(([r]) => t.fields[r] === !0).map(([r, c]) => ({
      label: c,
      term: { kind: "field", field: r.toLowerCase(), comparator: ":", value: "true" }
    }));
  const l = ie(e, t), o = n?.facets.find((r) => r.key.toLowerCase() === s);
  if (typeof l == "number") {
    if (!Number.isFinite(l)) return [];
    const r = o?.kind === "range" ? { min: o.min, max: o.max } : a, c = !r || l - r.min <= r.max - l;
    return [{
      label: null,
      term: { kind: "field", field: s, comparator: c ? "<=" : ">=", value: String(ci(l, c)) }
    }];
  }
  return (Array.isArray(l) ? l : [l]).filter(
    (r) => typeof r == "string" && r !== ""
  ).map((r) => ({
    label: Array.isArray(l) ? r : null,
    term: { kind: "field", field: s, comparator: "=", value: r }
  }));
}
const jn = /* @__PURE__ */ new WeakMap();
function fi(e, t) {
  let n = jn.get(e);
  return n || jn.set(e, n = /* @__PURE__ */ new Map()), n.has(t) || n.set(t, ui(t, e)), n.get(t);
}
const vi = /* @__PURE__ */ K({
  __name: "ColumnCell",
  props: {
    column: {},
    entry: {}
  },
  setup(e) {
    const t = e, n = ne(), a = f(() => t.column.kind ?? "text"), s = f(() => ie(t.column, t.entry.row)), l = f(
      () => a.value === "ordinal" ? t.entry.ordinal : Te(t.column, t.entry.row)
    ), o = f(() => s.value), i = f(() => t.column.activate === !0 || !!t.column.click), r = f(() => Qt(t.column)), c = f(() => la(t.column, t.entry.row)), d = f(() => {
      if (!Ka(t.column)) return [];
      const g = typeof s.value == "number" ? fi(n.rows.value, t.column) : null;
      return di(t.column, t.entry.row, t.entry.entity ?? null, g);
    });
    function v(g) {
      i.value && (g.stopPropagation(), _(tt(g)));
    }
    function _(g) {
      t.column.click?.(t.entry.row, g), t.column.activate && n.activate(t.entry.row, g);
    }
    const y = f(
      () => t.column.activate && !t.column.click ? n.pressHref(t.entry.row) : null
    );
    return (g, p) => a.value === "component" && e.column.component ? (u(), I(Ye(e.column.component), {
      key: 0,
      row: e.entry.row,
      entry: e.entry,
      value: s.value,
      column: e.column
    }, null, 8, ["row", "entry", "value", "column"])) : a.value === "status" && d.value.length ? (u(), I(zn, {
      key: 1,
      entry: e.entry,
      column: e.column,
      narrowings: d.value,
      truncates: !1
    }, {
      default: G(() => [
        j(Ve, { status: o.value }, null, 8, ["status"])
      ]),
      _: 1
    }, 8, ["entry", "column", "narrowings"])) : a.value === "status" ? (u(), I(Ve, {
      key: 2,
      status: o.value
    }, null, 8, ["status"])) : a.value === "image" ? (u(), I(It, {
      key: 3,
      class: "dc-cell__image",
      src: typeof s.value == "string" ? s.value : "",
      style: le({ maxHeight: e.column.height }),
      onClick: v
    }, null, 8, ["src", "style"])) : e.column.drill ? (u(), I(ct, {
      key: 4,
      entry: e.entry,
      column: e.column
    }, null, 8, ["entry", "column"])) : i.value ? (u(), I(se, qe({
      key: 5,
      class: ["dc-table__open", { "dc-truncate": r.value }],
      href: y.value,
      title: c.value
    }, rn(e.column.activate ? w(wn)(w(n), w(Va)(w(n), e.entry)) : {}), {
      onPress: p[0] || (p[0] = (k, P) => {
        P.stopPropagation(), _(k);
      })
    }), {
      default: G(() => [
        te(L(l.value), 1)
      ]),
      _: 1
    }, 16, ["class", "href", "title"])) : d.value.length ? (u(), I(zn, {
      key: 6,
      entry: e.entry,
      column: e.column,
      narrowings: d.value,
      truncates: r.value
    }, null, 8, ["entry", "column", "narrowings", "truncates"])) : (u(), h("span", {
      key: 7,
      class: oe(["dc-cell__text", { "dc-truncate": r.value }])
    }, L(l.value), 3));
  }
}), Un = /* @__PURE__ */ z(vi, [["__scopeId", "data-v-4b81f005"]]), pi = {
  key: 0,
  class: "dc-table__none"
}, hi = { class: "dc-table__detail" }, mi = ["data-dc-wrap", "data-dc-row-links"], yi = {
  key: 0,
  class: "dc-table__pick",
  scope: "col"
}, gi = {
  key: 1,
  class: "dc-table__standing",
  scope: "col"
}, _i = ["data-dc-align", "data-dc-hide", "aria-sort", "title"], wi = {
  key: 2,
  class: "dc-table__head"
}, ki = ["onClick"], bi = {
  key: 0,
  class: "dc-table__pick"
}, $i = {
  key: 1,
  class: "dc-table__standing"
}, xi = ["data-dc-align", "data-dc-hide", "title"], Si = {
  key: 1,
  class: "dc-table__name"
}, Ci = /* @__PURE__ */ K({
  __name: "TableView",
  setup(e) {
    const t = ne(), n = Ne(), a = si();
    function s(M, Q) {
      if (!t.rowLinks?.value || ba()) return;
      const N = t.pressHref(M);
      if (N && Jt(Q)) {
        Xt(N, Q);
        return;
      }
      t.activate(M, tt(Q));
    }
    const l = f(() => t.rowLinks?.value ? new Map(n.value.map((M) => [M.key, t.pressHref(M.row)])) : /* @__PURE__ */ new Map()), o = f(
      () => a.value.find((M) => M.role === "identity") ?? a.value[0]
    );
    function i(M, Q, N) {
      N.stopPropagation(), t.activate(M, Q);
    }
    function r(M) {
      const Q = ua(M, t.entity.value, t.schema.value), N = Q ? `Shortcut: ${Q}` : void 0;
      return [M.hint, N].filter(Boolean).join(`
`) || void 0;
    }
    const c = f(() => {
      const M = a.value.find((N) => N.scope);
      return M || ((t.entity.value ? !!t.entity.value.href : t.entities.value.some((N) => N.href)) ? a.value.find((N) => N.activate) : void 0);
    }), d = f(
      () => t.entity.value ? !!t.entity.value.scope : t.entities.value.some((M) => M.scope)
    ), v = (M) => ot(M.entity, M.row), _ = (M) => mn(t.query.value.expr, v(M));
    function y(M, Q) {
      t.setExpression(Gt(t.query.value.expr, v(M), Q));
    }
    const g = f(() => {
      const M = n.value.filter((N) => v(N) !== null), Q = M.filter((N) => N.selected);
      return Q.length ? Q : M;
    }), p = f(() => g.value.some((M) => M.selected)), k = f(() => {
      const M = g.value[0];
      return M ? _(M) : null;
    }), P = f(
      () => g.value.some((M) => _(M) !== k.value)
    ), x = f(
      () => p.value ? "the ticked rows" : "every row on this page"
    );
    function m(M) {
      t.setExpression(
        g.value.reduce(
          (Q, N) => Gt(Q, v(N), M),
          t.query.value.expr
        )
      );
    }
    const b = f(
      () => a.value.some((M) => M.kind === "image" || M.height !== void 0)
    );
    function E(M) {
      M && (t.query.value.sort === M ? t.toggleDirection() : t.setSort(M));
    }
    function O(M) {
      return M ? t.query.value.sort === M ? t.hrefFor({ dir: t.query.value.dir === "desc" ? "asc" : "desc" }) : t.hrefFor({ sort: M }) : null;
    }
    const X = f(() => t.entity.value?.label ?? "The result set"), q = f(() => new Set(t.sorts.value.map((M) => M.key))), V = (M) => M.sort !== void 0 && q.value.has(M.sort), U = (M) => {
      if (V(M))
        return t.query.value.sort !== M.sort ? "none" : t.query.value.dir === "desc" ? "descending" : "ascending";
    };
    function ee(M) {
      return [
        Ln(M),
        M.muted ? "dc-table__muted" : "",
        M.mono ? "dc-mono" : "",
        Qt(M) ? "dc-truncate" : ""
      ].filter(Boolean).join(" ");
    }
    function de(M, Q) {
      if (!(!Qt(M) || M.activate || M.click))
        return la(M, Q.row);
    }
    const ce = H(null);
    function ke(M) {
      ce.value && (ce.value.scrollLeft = M.target.scrollLeft);
    }
    return (M, Q) => w(a).length ? (u(), h("table", {
      key: 1,
      class: "dc-table",
      "data-dc-wrap": b.value ? "" : void 0,
      "data-dc-row-links": w(t).rowLinks?.value ? "" : void 0
    }, [
      S("thead", {
        ref_key: "head",
        ref: ce,
        "data-dc-stuck": ""
      }, [
        S("tr", null, [
          w(t).selectable.value ? (u(), h("th", yi, [
            j(Na)
          ])) : T("", !0),
          d.value ? (u(), h("th", gi, [
            g.value.length ? (u(), I(nn, {
              key: 0,
              standing: k.value,
              mixed: P.value,
              name: x.value,
              onSet: m
            }, null, 8, ["standing", "mixed", "name"])) : T("", !0)
          ])) : T("", !0),
          (u(!0), h(D, null, J(w(a), (N, Z) => (u(), h("th", {
            key: w(En)(N, Z),
            scope: "col",
            class: oe(w(Ln)(N)),
            style: le({ width: N.width }),
            "data-dc-align": w(Mn)(N),
            "data-dc-hide": N.hideBelow,
            "aria-sort": U(N),
            title: r(N)
          }, [
            V(N) ? (u(), I(se, {
              key: 0,
              class: "dc-table__sort",
              href: O(N.sort),
              onPress: (fe) => E(N.sort)
            }, {
              default: G(() => [
                te(L(N.label), 1)
              ]),
              _: 2
            }, 1032, ["href", "onPress"])) : (u(), h(D, { key: 1 }, [
              te(L(N.label), 1)
            ], 64)),
            N.header ? (u(), h("span", wi, [
              (u(), I(Ye(N.header), {
                column: N,
                entity: w(t).entity.value
              }, null, 8, ["column", "entity"]))
            ])) : T("", !0)
          ], 14, _i))), 128))
        ])
      ], 512),
      S("tbody", {
        "data-dc-scroll": "",
        onScroll: ke
      }, [
        (u(!0), h(D, null, J(w(n), (N) => (u(), h("tr", {
          key: N.key,
          class: "dc-table__row",
          onClick: (Z) => s(N.row, Z)
        }, [
          w(t).selectable.value ? (u(), h("td", bi, [
            j(Ae, {
              row: N.row,
              selected: N.selected,
              name: N.parts.identity
            }, null, 8, ["row", "selected", "name"])
          ])) : T("", !0),
          d.value ? (u(), h("td", $i, [
            v(N) !== null ? (u(), I(nn, {
              key: 0,
              standing: _(N),
              name: N.parts.identity,
              onSet: (Z) => y(N, Z)
            }, null, 8, ["standing", "name", "onSet"])) : T("", !0)
          ])) : T("", !0),
          (u(!0), h(D, null, J(w(a), (Z, fe) => (u(), h("td", {
            key: w(En)(Z, fe),
            class: oe(ee(Z)),
            style: le({ width: Z.width }),
            "data-dc-align": w(Mn)(Z),
            "data-dc-hide": Z.hideBelow,
            title: de(Z, N)
          }, [
            l.value.get(N.key) ? (u(), I(se, qe({
              key: 0,
              class: "dc-table__cell-link",
              href: l.value.get(N.key),
              tabindex: Z === o.value ? void 0 : -1,
              "aria-hidden": Z === o.value ? void 0 : "true",
              "aria-label": Z === o.value ? N.parts.identity : void 0
            }, rn(w(wn)(w(t), w(Va)(w(t), N))), {
              onPress: (Ke, We) => i(N.row, Ke, We)
            }), null, 16, ["href", "tabindex", "aria-hidden", "aria-label", "onPress"])) : T("", !0),
            Z === c.value ? (u(), h("span", Si, [
              j(Un, {
                column: Z,
                entry: N
              }, null, 8, ["column", "entry"]),
              j(dt, { entry: N }, null, 8, ["entry"]),
              j(ut, { entry: N }, null, 8, ["entry"])
            ])) : (u(), I(Un, {
              key: 2,
              column: Z,
              entry: N
            }, null, 8, ["column", "entry"]))
          ], 14, xi))), 128))
        ], 8, ki))), 128))
      ], 32)
    ], 8, mi)) : (u(), h("p", pi, [
      Q[2] || (Q[2] = S("span", { class: "dc-table__headline" }, "No columns declared", -1)),
      S("span", hi, [
        te(L(X.value) + " has no ", 1),
        Q[0] || (Q[0] = S("code", null, "columns", -1)),
        Q[1] || (Q[1] = te(" in the schema, so there is no table to draw. ", -1))
      ])
    ]));
  }
}), Wa = /* @__PURE__ */ z(Ci, [["__scopeId", "data-v-8a634047"]]);
function Pi(e) {
  const t = pe([]), n = H(!1), a = pe(null);
  let s = 0;
  const l = (r, c, d, v, _) => ({
    entity: r,
    rows: e.limit.value > 0 ? c.rows.map((y, g) => Aa(y, g, r, e.isPinned(y.id))) : [],
    total: c.total,
    count: d ? Ut(r) : pt(c.total),
    pinned: Ei(v, c, _)
  }), o = () => {
    const r = ++s, c = e.query.value, d = e.schema.value, v = e.entities.value, _ = e.limit.value, y = e.within?.value.trim() ?? "", g = cn(c) && !y, p = y ? fn(y, c.expr) : c.expr, k = v.map((P) => ({
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
        limit: Math.max(_, 1),
        offset: 0
      })
    }));
    if (k.every(({ outcome: P }) => !(P instanceof Promise))) {
      t.value = k.map(
        ({ entity: P, outcome: x }) => l(P, x, g, d, p)
      ), a.value = null, n.value = !1;
      return;
    }
    n.value = !0, Promise.all(k.map(({ outcome: P }) => Promise.resolve(P))).then((P) => {
      r === s && (t.value = P.map(
        (x, m) => l(k[m].entity, x, g, d, p)
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
function Ei(e, t, n) {
  const a = t.rows[0];
  if (t.total !== 1 || t.rows.length !== 1 || !a)
    return !1;
  const s = n.trim();
  if (!s)
    return !1;
  const l = _t(e, a);
  return !!l && it(s, l) === s;
}
const Mi = ["data-dc-pending", "data-dc-heads-only"], Li = {
  key: 0,
  class: "dc-types__state",
  role: "alert"
}, Ti = {
  key: 1,
  class: "dc-types__state",
  "aria-live": "polite"
}, Oi = {
  key: 2,
  class: "dc-types__state"
}, Ni = ["data-dc-empty"], Ai = { class: "dc-type__name" }, Ii = { class: "dc-type__count dc-mono" }, Ri = { class: "dc-type__sr" }, Bi = {
  key: 0,
  class: "dc-type__description"
}, Hi = {
  key: 0,
  class: "dc-type__empty"
}, qi = { class: "dc-type__identity" }, Fi = { class: "dc-type__primary dc-truncate" }, Vi = { class: "dc-type__secondary dc-mono dc-truncate" }, Di = { class: "dc-type__trailing dc-mono" }, Ki = { class: "dc-type__metric-value" }, Wi = { class: "dc-type__metric-label" }, zi = {
  key: 0,
  class: "dc-type__date"
}, ji = /* @__PURE__ */ K({
  __name: "TypeCardsView",
  setup(e) {
    const t = ne(), { previews: n, pending: a, error: s } = Pi({
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
      w(s) ? (u(), h("p", Li, " Could not load results: " + L(w(s) instanceof Error ? w(s).message : "the data source failed."), 1)) : !i.value.length && w(a) ? (u(), h("p", Ti, " Running query… ")) : i.value.length ? T("", !0) : (u(), h("p", Oi, L(l.value ? "Nothing matches this query" : "Nothing here yet"), 1)),
      (u(!0), h(D, null, J(i.value, (d) => (u(), h("section", {
        key: d.entity.key,
        class: "dc-type",
        "data-dc-empty": d.total ? "false" : "true"
      }, [
        j(se, {
          class: "dc-type__head",
          href: w(t).entityHref(d.entity.key),
          onPress: (v) => w(t).setEntity(d.entity.key)
        }, {
          default: G(() => [
            S("span", Ai, L(d.entity.label), 1),
            S("span", Ii, L(d.count), 1),
            c[0] || (c[0] = S("span", {
              class: "dc-type__go",
              "aria-hidden": "true"
            }, "→", -1)),
            S("span", Ri, "Show only " + L(d.entity.label.toLowerCase()), 1),
            d.entity.description ? (u(), h("span", Bi, L(d.entity.description), 1)) : T("", !0)
          ]),
          _: 2
        }, 1032, ["href", "onPress"]),
        d.total ? T("", !0) : (u(), h("p", Hi, L(l.value ? "No matches" : "Nothing here yet"), 1)),
        (u(!0), h(D, null, J(d.rows, (v) => (u(), h("div", {
          key: v.key,
          class: "dc-type__row"
        }, [
          j(se, {
            class: "dc-type__open",
            href: w(t).pressHref(v.row),
            onPress: (_) => w(t).activate(v.row, _)
          }, {
            default: G(() => [
              S("span", qi, [
                S("span", Fi, L(v.parts.identity), 1),
                S("span", Vi, L(v.parts.reference), 1)
              ])
            ]),
            _: 2
          }, 1032, ["href", "onPress"]),
          S("span", Di, [
            (u(!0), h(D, null, J(v.parts.metrics.slice(0, 1), (_) => (u(), I(ct, {
              key: _.column.key ?? _.label,
              class: "dc-type__metric",
              entry: v,
              column: _.column
            }, {
              default: G(() => [
                S("span", Ki, L(_.text), 1),
                S("span", Wi, L(_.label), 1)
              ]),
              _: 2
            }, 1032, ["entry", "column"]))), 128)),
            v.parts.updated ? (u(), h("span", zi, L(v.parts.updated), 1)) : T("", !0),
            j(_n, { entry: v }, null, 8, ["entry"]),
            j(dt, { entry: v }, null, 8, ["entry"]),
            j(ut, { entry: v }, null, 8, ["entry"])
          ])
        ]))), 128)),
        d.entity.create && !o.value ? (u(), I(se, {
          key: 1,
          class: "dc-type__new",
          href: w(t).createHref?.(d.entity),
          onPress: (v) => w(t).create(d.entity)
        }, {
          default: G(() => [
            c[1] || (c[1] = S("span", {
              class: "dc-type__plus",
              "aria-hidden": "true"
            }, "+", -1)),
            te(" " + L(d.entity.create), 1)
          ]),
          _: 2
        }, 1032, ["href", "onPress"])) : T("", !0)
      ], 8, Ni))), 128)),
      Y(r.$slots, "after", {}, void 0, !0)
    ], 8, Mi));
  }
}), za = /* @__PURE__ */ z(ji, [["__scopeId", "data-v-d73c6777"]]), Ui = ["data-dc-pending", "data-dc-more"], Qi = {
  key: 0,
  class: "dc-results__state dc-results__state--loading",
  "aria-live": "polite"
}, Yi = {
  key: 3,
  class: "dc-results__state",
  role: "alert"
}, Gi = { class: "dc-results__detail" }, Xi = {
  key: 4,
  class: "dc-results__state",
  "aria-live": "polite"
}, Ji = {
  key: 5,
  class: "dc-results__state"
}, Zi = { class: "dc-results__detail" }, ec = /* @__PURE__ */ K({
  __name: "ResultsArea",
  props: {
    views: {},
    loading: { type: Boolean }
  },
  setup(e) {
    const t = e, n = ne(), a = Ct(), s = {
      list: an,
      cards: Ra,
      grid: Ba,
      images: Ha,
      table: Wa,
      links: qa,
      preview: Fa
    }, l = f(() => aa(n.query.value, t.views)), o = f(() => Fe(n.query.value.view, t.views)), i = f(() => (o.value === "record" ? null : s[o.value]) ?? an), r = f(() => o.value === "record" ? n.recordView.value : null), c = f(() => n.rows.value.length > 0), d = f(() => n.error.value !== null), v = H(null);
    function _(m) {
      return m.querySelector("[data-dc-scroll]") ?? m;
    }
    ae(
      // The page on screen, which is the draft's own while one is being typed.
      () => n.liveQuery.value.page,
      () => {
        v.value && (_(v.value).scrollTop = 0);
      }
    );
    const y = H(""), g = H({ x: 0, y: 0 }), p = H(0);
    function k() {
      const m = v.value;
      if (!m) {
        y.value = "";
        return;
      }
      const b = _(m), E = {
        top: b.scrollTop > 1,
        right: b.scrollWidth - b.clientWidth - b.scrollLeft > 1,
        bottom: b.scrollHeight - b.clientHeight - b.scrollTop > 1,
        left: b.scrollLeft > 1
      };
      y.value = Object.entries(E).filter(([, O]) => O).map(([O]) => O).join(" "), g.value = {
        x: b.offsetHeight - b.clientHeight,
        y: b.offsetWidth - b.clientWidth
      }, p.value = m.querySelector("[data-dc-stuck]")?.offsetHeight ?? 0;
    }
    let P = null, x = null;
    return ae(
      v,
      (m, b) => {
        if (b?.removeEventListener("scroll", k, { capture: !0 }), P?.disconnect(), x?.disconnect(), P = null, x = null, k(), !m || (m.addEventListener("scroll", k, { passive: !0, capture: !0 }), typeof ResizeObserver > "u")) return;
        const E = new ResizeObserver(k), O = typeof MutationObserver > "u" ? null : new MutationObserver(() => {
          X(), k();
        }), X = () => {
          E.disconnect(), O?.disconnect();
          for (const q of /* @__PURE__ */ new Set([m, _(m)])) {
            E.observe(q);
            for (const V of q.children) E.observe(V);
            O?.observe(q, { childList: !0 });
          }
        };
        X(), P = E, x = O;
      },
      { flush: "post" }
    ), ge(() => {
      v.value?.removeEventListener("scroll", k, { capture: !0 }), P?.disconnect(), x?.disconnect();
    }), (m, b) => (u(), h("div", {
      ref_key: "scroller",
      ref: v,
      class: "dc-results",
      "data-dc-pending": w(n).pending.value ? "true" : "false",
      "data-dc-more": y.value,
      style: le({
        "--dc-results-gutter-x": `${g.value.x}px`,
        "--dc-results-gutter-y": `${g.value.y}px`,
        "--dc-results-stuck": `${p.value}px`
      })
    }, [
      e.loading ? (u(), h("p", Qi, [...b[1] || (b[1] = [
        S("span", { class: "dc-results__detail" }, "Loading…", -1)
      ])])) : l.value ? (u(), I(za, { key: 1 }, zt({ _: 2 }, [
        a["cards-before"] ? {
          name: "before",
          fn: G(() => [
            Y(m.$slots, "cards-before", {}, void 0, !0)
          ]),
          key: "0"
        } : void 0,
        a["cards-after"] ? {
          name: "after",
          fn: G(() => [
            Y(m.$slots, "cards-after", {}, void 0, !0)
          ]),
          key: "1"
        } : void 0
      ]), 1024)) : r.value?.id ? (u(), I(Ye(r.value.component), {
        key: 2,
        id: r.value.id
      }, null, 8, ["id"])) : d.value ? (u(), h("p", Yi, [
        b[2] || (b[2] = S("span", { class: "dc-results__headline" }, "Could not load results", -1)),
        S("span", Gi, L(w(n).error.value instanceof Error ? w(n).error.value.message : "The data source failed."), 1)
      ])) : !c.value && w(n).pending.value ? (u(), h("p", Xi, [...b[3] || (b[3] = [
        S("span", { class: "dc-results__detail" }, "Running query…", -1)
      ])])) : c.value ? (u(), I(Ye(i.value), { key: 6 })) : (u(), h("div", Ji, [
        b[4] || (b[4] = S("span", { class: "dc-results__headline" }, "Nothing matches this query", -1)),
        S("span", Zi, L(w(n).summary.value), 1),
        w(n).isPristine.value ? T("", !0) : (u(), I(se, {
          key: 0,
          class: "dc-results__clear",
          href: w(n).clearHref(),
          onPress: b[0] || (b[0] = (E) => w(n).clearFilters())
        }, {
          default: G(() => [
            te(L(w(n).isEverything.value ? "Clear filters" : "Search everything instead"), 1)
          ]),
          _: 1
        }, 8, ["href"]))
      ]))
    ], 12, Ui));
  }
}), ja = /* @__PURE__ */ z(ec, [["__scopeId", "data-v-4484c328"]]), tc = ["data-dc-theme", "data-dc-value-press"], nc = {
  key: 0,
  class: "dc-shell__page"
}, ac = /* @__PURE__ */ K({
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
  emits: /* @__PURE__ */ xn(["activate", "create", "duplicate", "delete", "operate", "drill", "query-change", "toggle-pin"], ["update:pinned", "update:selected"]),
  setup(e, { expose: t, emit: n }) {
    const a = e, s = n, l = $n(e, "pinned"), o = $n(e, "selected"), i = Ct(), r = sn(Jn, null), c = a.route || r ? null : as(), d = a.route ?? r ?? c;
    ge(() => c?.dispose?.());
    const v = H(!!i.page);
    Ga(() => {
      v.value = !!i.page;
    });
    const _ = ss(d, {
      detached: () => v.value && a.pageQuery === "detached",
      path: () => a.listPath
    }), y = f(() => Gs({ seed: a.schema.key })), g = f(() => a.source ?? y.value), p = ml({
      schema: () => a.schema,
      adapter: _,
      defaults: () => a.defaults,
      navigationMode: () => a.navigationMode,
      facetNavigationMode: () => a.facetNavigationMode
    }), k = f(() => a.within?.trim() ?? ""), P = wl({
      query: p.query,
      entity: p.entity,
      schema: f(() => a.schema),
      setExpression: p.setExpression
    });
    ae(p.query, ($) => s("query-change", $));
    const x = f(() => sl(a.schema, [p.query.value.expr])), m = f(
      () => x.value.flatMap(($) => {
        const R = a.schema.entities.find((W) => W.key === $.entityKey);
        return R ? [{ ...$, entity: R }] : [];
      })
    );
    function b() {
      if (i.record) return m.value;
      const $ = a.recordCards;
      return $ ? m.value.filter((R) => $[R.entityKey]) : [];
    }
    const E = f(() => {
      const [$, ...R] = m.value;
      if (!$ || R.length || p.entity.value !== null) return null;
      const W = a.recordViews?.[$.entityKey];
      return W ? { ...W, id: $.id } : null;
    }), O = f(() => {
      const $ = p.entity.value?.key;
      return $ && a.recordViews?.[$] || null;
    }), X = f(() => {
      const $ = a.views, R = typeof $ == "function" ? $({ entity: p.entity.value, records: x.value }) : $;
      return E.value || O.value ? [...(R ?? on).filter((W) => W !== "record"), "record"] : R?.filter((W) => W !== "record");
    }), q = f(
      () => O.value !== null && Fe(p.query.value.view, X.value) === "record"
    ), V = f(() => q.value ? 1 : a.limit), U = yl({
      source: g,
      query: P.live,
      schema: f(() => a.schema),
      entity: p.entity,
      limit: V,
      within: k
    }), ee = gl({
      // Not before the data has landed: what is there until then is no place to hold.
      active: f(() => q.value && !a.loading),
      rows: U.rows,
      pending: U.pending,
      page: f(() => P.live.value.page),
      list: f(() => {
        const { entity: $, expr: R, sort: W, dir: he } = P.live.value;
        return JSON.stringify([$, R, W, he]);
      }),
      locate: U.locate,
      moveTo: ($) => {
        P.drafting.value ? P.setPage($) : p.setPage($, "replace");
      }
    }), de = f(() => U.pageCount.value + (ee.gone.value ? 1 : 0)), ce = f(() => {
      if (E.value) return E.value;
      const $ = O.value;
      return $ ? { ...$, id: ee.id.value ?? U.rows.value[0]?.id ?? null } : null;
    });
    function ke($) {
      const R = O.value !== null && Fe($, X.value) === "record";
      if (R === q.value) {
        p.setView($);
        return;
      }
      const W = P.live.value.page, he = R ? (W - 1) * a.limit + 1 : Math.ceil(W / a.limit);
      P.drafting.value ? (p.setView($), P.setPage(he)) : p.setView($, he);
    }
    function M($) {
      if (!O.value || q.value) return null;
      const R = U.rows.value.indexOf($);
      return R === -1 ? null : U.offset.value + R + 1;
    }
    ae(
      [de, U.pending, p.query, P.drafting, () => a.loading, v, ee.holding],
      () => {
        if (U.pending.value || P.drafting.value || a.loading || v.value) return;
        const $ = de.value;
        p.query.value.page <= $ || (ee.gone.value ? ee.moveTo($) : ee.holding.value || p.setPage($, "replace"));
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
    const Z = f(() => {
      if (a.selectable === !0) return !0;
      const $ = p.entity.value;
      return !!($?.duplicate || $?.delete || $?.operations?.some((R) => R.selection !== !1));
    }), fe = f(() => new Set(o.value));
    function Ke($) {
      const R = new Set(fe.value);
      R.has($.id) ? R.delete($.id) : R.add($.id), o.value = [...R];
    }
    function We($) {
      const R = new Set(fe.value);
      for (const W of U.rows.value)
        $ ? R.add(W.id) : R.delete(W.id);
      o.value = [...R];
    }
    function Ie() {
      o.value.length && (o.value = []);
    }
    const be = f(() => ({
      ids: [...o.value],
      rows: U.rows.value.filter(($) => fe.value.has($.id)),
      entity: p.entity.value
    }));
    ae(() => p.query.value.entity, Ie);
    function $e($, R, W = {}) {
      const he = Dt(a.schema, p.query.value, $, W);
      W.exclude ? p.narrow(he, R?.key ?? p.query.value.entity) : P.release(() => p.narrow(he, R?.key ?? null, R ? void 0 : "cards")), s("drill", $, R, W);
    }
    function xe($) {
      return a.rowPress === "narrow" && _t(a.schema, $) !== null;
    }
    function C($) {
      return a.schema.entities.find((W) => W.key === $.entityKey)?.href?.($) || null;
    }
    const A = pe(null);
    ae(p.query, () => {
      A.value = null;
    });
    const B = ll({
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
        const W = ee.step($);
        W !== null && (P.drafting.value ? P.setPage(W) : p.setPage(W, R));
      },
      setView: ke,
      schema: f(() => a.schema),
      entities: f(() => a.schema.entities),
      rows: U.rows,
      total: U.total,
      limit: V,
      offset: U.offset,
      pageCount: de,
      pending: U.pending,
      counting: U.counting,
      error: U.error,
      source: g,
      previewsPerType: f(() => a.previewsPerType),
      within: k,
      loading: f(() => a.loading),
      recordView: ce,
      pinnable: f(() => a.pinnable === !0),
      isPinned: ($) => Q.value.has($.id),
      isPinnedId: ($) => Q.value.has($),
      togglePin: N,
      selectable: Z,
      selection: be,
      isSelected: ($) => fe.value.has($.id),
      toggleSelect: Ke,
      selectPage: We,
      clearSelection: Ie,
      narrowsOnPress: f(() => a.rowPress === "narrow"),
      rowLinks: f(() => a.rowLinks),
      pressPreview: A,
      /*
       * The one place a press is read, so every view gets the same answer without
       * knowing which of the two it is: they all call this.
       */
      activate: ($, R = {}) => {
        if (xe($)) {
          $e($, null, R);
          return;
        }
        const W = M($);
        if (W !== null) {
          P.drafting.value ? (p.setView("record"), P.setPage(W)) : p.setView("record", W);
          return;
        }
        const he = C($);
        if (he) {
          window.open(he, "_blank", "noopener");
          return;
        }
        s("activate", $);
      },
      pressHref: ($) => {
        if (xe($)) return p.narrowHref(Dt(a.schema, p.query.value, $), null, "cards");
        const R = M($);
        return R !== null ? p.hrefFor({ view: "record", page: R }) : C($) ?? a.activateHref?.($) ?? null;
      },
      recordHref: C,
      drillHref: ($, R) => _t(a.schema, $) ? p.narrowHref(
        Dt(a.schema, p.query.value, $),
        R?.key ?? null,
        R ? void 0 : "cards"
      ) : null,
      create: ($) => s("create", $),
      createHref: ($) => a.createHref?.($) ?? null,
      duplicate: () => s("duplicate", be.value),
      delete: () => s("delete", be.value),
      operate: ($) => s("operate", $, be.value),
      drill: $e
    });
    il({ theme: () => a.theme, accent: () => a.accent, tokens: () => a.tokens });
    const F = f(() => {
      if (!(!a.accent && !a.tokens))
        return { ...a.tokens, ...a.accent ? { "--dc-accent": a.accent } : {} };
    }), Re = H(null), Be = H(0);
    let Bt = null;
    lt(() => {
      const $ = Re.value;
      $ && (Be.value = $.getBoundingClientRect().width, !(typeof ResizeObserver > "u") && (Bt = new ResizeObserver(([R]) => {
        Be.value = R.contentRect.width;
      }), Bt.observe($)));
    }), ge(() => Bt?.disconnect());
    const Ht = f(() => a.oneStripFrom !== !1 && Be.value >= a.oneStripFrom), kn = f(() => ({
      views: X.value,
      selectionPlacement: a.selectionPlacement,
      pagesNote: a.pagesNote
    }));
    return t({
      query: p.query
    }), ($, R) => (u(), h("div", {
      ref_key: "root",
      ref: Re,
      class: "dc-shell",
      "data-dc-theme": e.theme,
      "data-dc-value-press": e.valuePress,
      style: le(F.value)
    }, [
      S("div", {
        class: oe(["dc-shell__head", { "dc-shell__head--one-strip": Ht.value }])
      }, [
        j(Oa, null, zt({ _: 2 }, [
          i.page ? void 0 : {
            name: "lead",
            fn: G(() => [
              j(Tr, {
                views: X.value,
                "type-chooser": e.typeChooser
              }, null, 8, ["views", "type-chooser"])
            ]),
            key: "0"
          },
          i.brand ? {
            name: "brand",
            fn: G((W) => [
              Y($.$slots, "brand", qt(Xa(W)), void 0, !0)
            ]),
            key: "1"
          } : void 0,
          i.actions ? {
            name: "actions",
            fn: G(() => [
              Y($.$slots, "actions", {}, void 0, !0)
            ]),
            key: "2"
          } : void 0
        ]), 1024),
        Ht.value && !i.page ? (u(), I(tn, qt(qe({ key: 0 }, kn.value)), null, 16)) : T("", !0)
      ], 2),
      i.page ? (u(), h("div", nc, [
        Y($.$slots, "page", {
          query: w(B).query.value
        }, void 0, !0)
      ])) : T("", !0),
      !Ht.value && !i.page ? (u(), I(tn, qt(qe({ key: 1 }, kn.value)), null, 16)) : T("", !0),
      i.page ? T("", !0) : Y($.$slots, "results", {
        rows: w(B).rows.value,
        total: w(B).total.value,
        offset: w(B).offset.value,
        pageCount: w(B).pageCount.value,
        query: w(B).liveQuery.value,
        pending: w(B).pending.value,
        loading: e.loading
      }, () => [
        j(ja, {
          views: X.value,
          loading: e.loading
        }, zt({ _: 2 }, [
          i["cards-before"] || b().length ? {
            name: "cards-before",
            fn: G(() => [
              (u(!0), h(D, null, J(b(), (W) => (u(), h(D, {
                key: `${W.entityKey}:${W.id}`
              }, [
                i.record ? Y($.$slots, "record", {
                  id: W.id,
                  entity: W.entity
                }, void 0, !0, 0) : (u(), I(Ye(e.recordCards?.[W.entityKey]), {
                  key: 1,
                  id: W.id
                }, null, 8, ["id"]))
              ], 64))), 128)),
              Y($.$slots, "cards-before", {}, void 0, !0)
            ]),
            key: "0"
          } : void 0,
          i["cards-after"] ? {
            name: "cards-after",
            fn: G(() => [
              Y($.$slots, "cards-after", {}, void 0, !0)
            ]),
            key: "1"
          } : void 0
        ]), 1032, ["views", "loading"])
      ], !0, 2)
    ], 12, tc));
  }
}), sc = /* @__PURE__ */ z(ac, [["__scopeId", "data-v-896dc5a8"]]), lc = ["data-dc-muted", "data-dc-collapsed"], rc = ["data-dc-collapsible"], oc = ["aria-expanded", "aria-controls"], ic = { class: "dc-shell-card__sr" }, cc = {
  key: 0,
  class: "dc-shell-card__identity"
}, uc = { class: "dc-shell-card__title dc-shell-card__name" }, dc = {
  key: 0,
  class: "dc-shell-card__ref dc-mono"
}, fc = {
  key: 1,
  class: "dc-shell-card__title"
}, vc = {
  key: 2,
  class: "dc-shell-card__count dc-mono"
}, pc = {
  key: 1,
  class: "dc-shell-card__aside"
}, hc = ["data-dc-flush"], mc = /* @__PURE__ */ K({
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
    const n = e, a = t, s = H(n.defaultCollapsed === !0), l = f(() => n.span === "all" ? { gridColumn: "1 / -1" } : void 0), o = Ct();
    function i(q) {
      return r(q?.() ?? []);
    }
    function r(q) {
      return q.some((V) => V.type === Ja ? !1 : V.type === Za ? String(V.children ?? "").trim().length > 0 : V.type === D ? r(V.children ?? []) : !0);
    }
    const c = f(
      () => !!n.title || !!n.name || d.value || i(o.head)
    ), d = f(() => i(o.aside)), v = f(() => i(o.default)), _ = f(() => i(o.foot)), y = f(
      () => !!n.name && (!!n.reference || i(o.reference))
    ), g = f(() => n.collapsible === !0 && c.value), p = f(() => g.value && (n.collapsed ?? s.value));
    function k() {
      const q = !p.value;
      s.value = q, a("update:collapsed", q);
    }
    const P = Pt() ?? "dc-shell-card", x = `${P}-body`, m = `${P}-foot`, b = f(
      () => [v.value ? x : "", _.value ? m : ""].filter(Boolean).join(" ") || void 0
    ), E = [
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
    ].join(", "), O = H(null);
    function X(q) {
      if (!g.value) return;
      const V = q.target?.closest(E);
      V && O.value?.contains(V) || typeof window < "u" && window.getSelection()?.toString() || k();
    }
    return (q, V) => (u(), h("section", {
      class: "dc-shell-card",
      style: le(l.value),
      "data-dc-muted": e.muted ? "true" : "false",
      "data-dc-collapsed": p.value ? "true" : "false"
    }, [
      c.value ? (u(), h("header", {
        key: 0,
        ref_key: "head",
        ref: O,
        class: "dc-shell-card__head",
        "data-dc-collapsible": g.value ? "true" : "false",
        onClick: X
      }, [
        g.value ? (u(), h("button", {
          key: 0,
          type: "button",
          class: "dc-shell-card__toggle",
          "aria-expanded": p.value ? "false" : "true",
          "aria-controls": b.value,
          onClick: k
        }, [
          V[0] || (V[0] = S("svg", {
            class: "dc-shell-card__chevron",
            viewBox: "0 0 10 10",
            "aria-hidden": "true"
          }, [
            S("path", { d: "M2 3.5 5 6.5 8 3.5" })
          ], -1)),
          S("span", ic, L(e.name || e.title || "Card"), 1)
        ], 8, oc)) : T("", !0),
        Y(q.$slots, "head", {}, () => [
          e.name ? (u(), h("div", cc, [
            S("h2", uc, L(e.name), 1),
            y.value ? (u(), h("span", dc, [
              Y(q.$slots, "reference", {}, () => [
                te(L(e.reference), 1)
              ], !0)
            ])) : T("", !0)
          ])) : (u(), h("h2", fc, L(e.title), 1)),
          e.count !== void 0 ? (u(), h("span", vc, L(e.count), 1)) : T("", !0)
        ], !0),
        d.value ? (u(), h("span", pc, [
          Y(q.$slots, "aside", {}, void 0, !0)
        ])) : T("", !0)
      ], 8, rc)) : T("", !0),
      v.value ? Wt((u(), h("div", {
        key: 1,
        id: x,
        class: "dc-shell-card__body",
        "data-dc-flush": e.flush ? "true" : "false"
      }, [
        Y(q.$slots, "default", {}, void 0, !0)
      ], 8, hc)), [
        [Sn, !p.value]
      ]) : T("", !0),
      _.value ? Wt((u(), h("footer", {
        key: 2,
        id: m,
        class: "dc-shell-card__foot"
      }, [
        Y(q.$slots, "foot", {}, void 0, !0)
      ], 512)), [
        [Sn, !p.value]
      ]) : T("", !0)
    ], 12, lc));
  }
}), mu = /* @__PURE__ */ z(mc, [["__scopeId", "data-v-073304c8"]]), yc = ["aria-label"], gc = ["aria-checked", "data-dc-active", "tabindex", "onClick", "onKeydown"], _c = /* @__PURE__ */ K({
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
      (u(!0), h(D, null, J(e.options, (r, c) => (u(), h("button", {
        key: r.key,
        ref_for: !0,
        ref_key: "buttons",
        ref: s,
        type: "button",
        role: "radio",
        class: oe(["dc-segmented__item", { "dc-segmented__item--mono": e.mono }]),
        "aria-checked": r.key === e.modelValue,
        "data-dc-active": r.key === e.modelValue ? "true" : "false",
        tabindex: r.key === e.modelValue ? 0 : -1,
        onClick: (d) => a("update:modelValue", r.key),
        onKeydown: (d) => l(d, c)
      }, L(r.label), 43, gc))), 128))
    ], 8, yc));
  }
}), wc = /* @__PURE__ */ z(_c, [["__scopeId", "data-v-63fb5482"]]), kc = { class: "dc-fact__label" }, bc = ["title"], $c = /* @__PURE__ */ K({
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
      if (s == null || s === "") return [_e];
      if (Array.isArray(s)) {
        const l = s.filter((o) => o != null && o !== "");
        return l.length ? l.map(String) : [_e];
      }
      return [String(s)];
    }), a = f(() => t.wide ? { gridColumn: "1 / -1" } : void 0);
    return (s, l) => (u(), h("div", {
      class: "dc-fact",
      style: le(a.value)
    }, [
      S("dt", kc, [
        Y(s.$slots, "label", {}, () => [
          te(L(e.label), 1)
        ], !0)
      ]),
      S("dd", {
        class: "dc-fact__value dc-mono",
        title: e.title
      }, [
        Y(s.$slots, "default", {}, () => [
          n.value.length === 1 ? (u(), h(D, { key: 0 }, [
            te(L(n.value[0]), 1)
          ], 64)) : (u(!0), h(D, { key: 1 }, J(n.value, (o, i) => (u(), h("span", {
            key: i,
            class: "dc-fact__line"
          }, L(o), 1))), 128))
        ], !0)
      ], 8, bc)
    ], 4));
  }
}), xc = /* @__PURE__ */ z($c, [["__scopeId", "data-v-1f6d25e6"]]), Sc = /* @__PURE__ */ K({
  __name: "ShellFacts",
  props: {
    items: { default: () => [] },
    min: { default: "200px" }
  },
  setup(e) {
    const t = e, n = f(() => ({ "--dc-facts-min": t.min }));
    return (a, s) => (u(), h("dl", {
      class: "dc-facts",
      style: le(n.value)
    }, [
      (u(!0), h(D, null, J(e.items, (l, o) => (u(), I(xc, {
        key: `${o}:${l.label}`,
        label: l.label,
        value: l.value,
        title: l.title,
        wide: l.wide
      }, null, 8, ["label", "value", "title", "wide"]))), 128)),
      Y(a.$slots, "default", {}, void 0, !0)
    ], 4));
  }
}), yu = /* @__PURE__ */ z(Sc, [["__scopeId", "data-v-17455afa"]]), Cc = { class: "dc-counts" }, Pc = ["data-dc-tone"], Ec = {
  key: 0,
  class: "dc-counts__empty"
}, Mc = /* @__PURE__ */ K({
  __name: "StatusCounts",
  props: {
    counts: {},
    empty: { default: _e }
  },
  setup(e) {
    const t = e, n = f(() => t.counts.filter((a) => a.count > 0));
    return (a, s) => (u(), h("span", Cc, [
      (u(!0), h(D, null, J(n.value, (l) => (u(), h("span", {
        key: l.label,
        class: "dc-counts__count",
        "data-dc-tone": l.tone ?? "neutral"
      }, L(l.count) + " " + L(l.label), 9, Pc))), 128)),
      n.value.length === 0 ? (u(), h("span", Ec, L(e.empty), 1)) : T("", !0)
    ]));
  }
}), gu = /* @__PURE__ */ z(Mc, [["__scopeId", "data-v-5553a9e2"]]), Lc = ["data-dc-copied", "title", "aria-label"], Tc = {
  key: 0,
  class: "dc-copy__mark",
  viewBox: "0 0 16 16",
  "aria-hidden": "true"
}, Oc = {
  key: 1,
  class: "dc-copy__mark",
  viewBox: "0 0 16 16",
  "aria-hidden": "true"
}, Nc = 1500, Ac = /* @__PURE__ */ K({
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
      }, Nc), a("copied", i);
    }
    return ge(() => clearTimeout(l)), (i, r) => (u(), h("button", {
      type: "button",
      class: "dc-copy",
      "data-dc-copied": s.value ? "true" : "false",
      title: s.value ? "Copied" : e.label,
      "aria-label": e.label,
      onClick: o
    }, [
      s.value ? (u(), h("svg", Oc, [...r[1] || (r[1] = [
        S("path", { d: "M3 8.5l3.2 3L13 4.5" }, null, -1)
      ])])) : (u(), h("svg", Tc, [...r[0] || (r[0] = [
        S("rect", {
          x: "5.5",
          y: "5.5",
          width: "8",
          height: "9",
          rx: "1.5"
        }, null, -1),
        S("path", { d: "M10.5 3.5v-1a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h1" }, null, -1)
      ])]))
    ], 8, Lc));
  }
}), Ic = /* @__PURE__ */ z(Ac, [["__scopeId", "data-v-f4249d7f"]]), Rc = ["data-dc-copy", "data-dc-wrap", "data-dc-tone"], Bc = /* @__PURE__ */ K({
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
        style: le(l.value)
      }, [
        Y(i.$slots, "default", {}, () => [
          te(L(e.code), 1)
        ], !0)
      ], 4),
      e.copy ? (u(), I(Ic, {
        key: 0,
        class: "dc-code__copy",
        text: o,
        label: e.copyLabel,
        onCopied: r[0] || (r[0] = (c) => a("copied", c)),
        onError: r[1] || (r[1] = (c) => a("error", c))
      }, null, 8, ["label"])) : T("", !0)
    ], 8, Rc));
  }
}), _u = /* @__PURE__ */ z(Bc, [["__scopeId", "data-v-67b371dd"]]), Hc = 24, qc = /* @__PURE__ */ K({
  __name: "ShellLog",
  props: {
    fetchChunk: {},
    stripAnsi: { type: Boolean },
    maxHeight: { default: "460px" }
  },
  setup(e, { expose: t }) {
    const n = e, a = H(""), s = f(() => n.stripAnsi ? fs(a.value) : a.value), l = H(null);
    let o = 0, i = null;
    function r() {
      return i ??= c().finally(() => {
        i = null;
      }), i;
    }
    async function c() {
      const { chunk: _, offset: y } = await n.fetchChunk(o);
      if (o = y, !_) return;
      const g = l.value, p = !g || g.scrollTop + g.clientHeight >= g.scrollHeight - Hc;
      a.value += _, p && (await Qe(), l.value && (l.value.scrollTop = l.value.scrollHeight));
    }
    function d() {
      a.value = "", o = 0;
    }
    const v = f(() => n.maxHeight === void 0 ? void 0 : { maxHeight: typeof n.maxHeight == "number" ? `${n.maxHeight}px` : n.maxHeight });
    return t({ poll: r, reset: d }), (_, y) => (u(), h("pre", {
      ref_key: "pane",
      ref: l,
      class: "dc-log dc-mono",
      style: le(v.value)
    }, L(s.value), 5));
  }
}), wu = /* @__PURE__ */ z(qc, [["__scopeId", "data-v-2c86947e"]]), Fc = ["data-dc-theme"], Vc = ["aria-labelledby", "aria-label"], Dc = {
  key: 1,
  class: "dc-dialog__actions"
}, ze = [], Kc = /* @__PURE__ */ K({
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
    const n = e, a = t, { theme: s, style: l, adopt: o } = yn(n), i = `${Pt() ?? "dc-dialog"}-title`, r = H(null);
    function c() {
      a("close"), a("update:open", !1);
    }
    const d = Symbol("dc-dialog");
    function v(m) {
      m.key !== "Escape" || m.defaultPrevented || ze[ze.length - 1] === d && (m.preventDefault(), c());
    }
    let _ = !1;
    function y(m) {
      _ = m.target === m.currentTarget;
    }
    function g(m) {
      m.target === m.currentTarget && _ && c(), _ = !1;
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
      ze.push(d), document.addEventListener("keydown", v), k = document.activeElement instanceof HTMLElement ? document.activeElement : null, o(), await Qe(), (r.value?.querySelector("[autofocus]") ?? r.value?.querySelector(p) ?? r.value)?.focus();
    }
    function x() {
      const m = ze.indexOf(d);
      m !== -1 && (ze.splice(m, 1), document.removeEventListener("keydown", v), k?.isConnected && k.focus(), k = null);
    }
    return lt(() => {
      n.open && P();
    }), ae(
      () => n.open,
      (m) => {
        m ? P() : x();
      }
    ), ge(x), (m, b) => e.open ? (u(), I(St, {
      key: 0,
      to: e.to
    }, [
      S("div", {
        class: "dc-shell dc-layer dc-dialog",
        "data-dc-theme": w(s),
        style: le(w(l)),
        onPointerdown: y,
        onClick: g
      }, [
        S("div", {
          ref_key: "panel",
          ref: r,
          class: oe(["dc-dialog__panel", e.panelClass]),
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
          }, L(e.title), 1)) : T("", !0),
          S("div", {
            class: oe(["dc-dialog__body", e.bodyClass])
          }, [
            Y(m.$slots, "default", {}, void 0, !0)
          ], 2),
          m.$slots.actions ? (u(), h("div", Dc, [
            Y(m.$slots, "actions", {}, void 0, !0)
          ])) : T("", !0)
        ], 10, Vc)
      ], 44, Fc)
    ], 8, ["to"])) : T("", !0);
  }
}), ku = /* @__PURE__ */ z(Kc, [["__scopeId", "data-v-0cccf313"]]), Wc = 4500, zc = 9e3, st = H([]);
let Qn = 0;
function Ua(e) {
  st.value = st.value.filter((t) => t.id !== e);
}
function Qa(e, t = "ok") {
  Qn += 1;
  const n = Qn;
  st.value = [...st.value, { id: n, message: e, kind: t }], setTimeout(() => Ua(n), t === "err" ? zc : Wc);
}
function jc(e) {
  Qa(e instanceof Error ? e.message : String(e), "err");
}
function Uc() {
  return { toasts: es(st), toast: Qa, toastError: jc, dismiss: Ua };
}
const Qc = ["data-dc-theme"], Yc = ["data-dc-kind", "role"], Gc = /* @__PURE__ */ K({
  __name: "ShellToasts",
  props: {
    to: { default: "body" },
    theme: { default: void 0 },
    accent: { default: void 0 },
    tokens: { default: void 0 }
  },
  setup(e) {
    const t = e, { toasts: n } = Uc(), { theme: a, style: s, adopt: l } = yn(t);
    return lt(l), (o, i) => (u(), I(St, { to: e.to }, [
      S("div", {
        class: "dc-shell dc-layer dc-toasts",
        "data-dc-theme": w(a),
        style: le(w(s)),
        "aria-live": "polite"
      }, [
        (u(!0), h(D, null, J(w(n), (r) => (u(), h("div", {
          key: r.id,
          class: "dc-toast",
          "data-dc-kind": r.kind,
          role: r.kind === "err" ? "alert" : void 0
        }, L(r.message), 9, Yc))), 128))
      ], 12, Qc)
    ], 8, ["to"]));
  }
}), bu = /* @__PURE__ */ z(Gc, [["__scopeId", "data-v-d970211c"]]);
function $u(e, t) {
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
  return xt(() => {
    s = !0, o();
  }, !0), { start: c, stop: o, polling: n };
}
function xu(e, t = {}) {
  const n = t.key ?? ((l) => JSON.stringify(l)), a = pe();
  let s = null;
  return ts(() => {
    const l = e(), o = n(l);
    o !== s && (s = o, a.value = l);
  }), a;
}
function Su(e = {}) {
  return { key: "ordinal", kind: "ordinal", label: "#", width: "52px", ...e };
}
function Cu(e = {}) {
  return { key: "status", role: "state", kind: "status", label: "State", sort: "state", width: "104px", ...e };
}
function Pu(e = {}) {
  return { key: "tint", role: "tint", ...e };
}
function Eu(e = {}) {
  return { key: "picture", role: "image", kind: "image", width: "56px", height: "40px", ...e };
}
function Mu(e, t = {}) {
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
function Lu(e, t = {}) {
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
function Tu(e, t, n = {}) {
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
function Ou(e, t, n = {}) {
  return { key: e, kind: "date", label: t, sort: e, width: "104px", mono: !0, muted: !0, ...n };
}
function Nu(e = {}) {
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
function Au(e, t, n = {}) {
  return { key: e, label: t, sort: e, truncate: !0, hideBelow: 900, ...n };
}
function Iu(e, t, n, a = {}) {
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
function Rt(e) {
  return typeof e == "number" ? e : typeof e == "string" && e.trim() !== "" ? Number(e) : Number.NaN;
}
function Ru(e) {
  const t = Rt(e);
  return Number.isFinite(t) && t > 0 ? is(t) : _e;
}
function Bu(e) {
  const t = Rt(e);
  return Number.isFinite(t) && t > 0 ? cs(t) : _e;
}
function Hu(e) {
  const t = Rt(e);
  return Number.isFinite(t) && t > 0 ? us(t) : _e;
}
function qu(e) {
  const t = Rt(e);
  return Number.isFinite(t) ? ds(t) : _e;
}
function Xc(e) {
  if (e <= 0) return 0;
  const t = 10 ** Math.floor(Math.log10(e));
  for (const n of [1, 2, 5])
    if (e <= n * t) return n * t;
  return 10 * t;
}
function Jc(e, t) {
  const n = /* @__PURE__ */ new Set();
  for (const a of e) {
    const s = a.fields[t];
    for (const l of Array.isArray(s) ? s : [s])
      typeof l == "string" && l && n.add(l);
  }
  return [...n].sort((a, s) => a.localeCompare(s));
}
function Zc(e, t) {
  let n = 0;
  for (const a of e) {
    const s = a.fields[t];
    typeof s == "number" && s > n && (n = s);
  }
  return n;
}
function Fu(e, t, n, a = {}) {
  return {
    kind: "chips",
    key: t,
    label: n,
    options: Jc(e, t),
    ...a.multiple ? { multiple: !0 } : {}
  };
}
function Vu(e, t, n) {
  return { kind: "range", key: t, label: n, min: 0, max: Xc(Zc(e, t)) };
}
function Du(e, t, n) {
  return { kind: "toggle", key: e, label: t, text: n };
}
function Ku(e) {
  return e.filter((t) => t.kind === "chips" ? t.options.length > 1 : t.kind === "range" ? t.max > 0 : !0);
}
function Wu(e = "", t = "/") {
  const n = H(ue(e)), a = H(t), s = [`${a.value}${n.value}`];
  return {
    search: n,
    path: a,
    history: s,
    href(l, o) {
      return `${o ?? a.value}${ue(l)}`;
    },
    push(l, o) {
      o !== void 0 && (a.value = o), n.value = ue(l), s.push(`${a.value}${n.value}`);
    },
    replace(l, o) {
      o !== void 0 && (a.value = o), n.value = ue(l), s[s.length - 1] = `${a.value}${n.value}`;
    }
  };
}
function Yn(e) {
  const t = e.indexOf("?");
  if (t === -1) return "";
  const n = e.slice(t), a = n.indexOf("#");
  return ue(a === -1 ? n : n.slice(0, a));
}
function zu(e) {
  const t = H(Yn(e.currentRoute.value.fullPath)), n = f(() => e.currentRoute.value.path), a = ae(
    () => e.currentRoute.value.fullPath,
    (s) => {
      t.value = Yn(s);
    }
  );
  return {
    search: t,
    path: n,
    push: (s, l) => e.push(`${l ?? n.value}${ue(s)}`),
    replace: (s, l) => e.replace(`${l ?? n.value}${ue(s)}`),
    href: (s, l) => {
      const o = `${l ?? n.value}${ue(s)}`;
      return e.resolve?.(o).href ?? o;
    },
    dispose: a
  };
}
function ju(e, t, n = "/") {
  return (a) => {
    const s = a.params[t], l = Array.isArray(s) ? s.join("/") : s ?? "", o = a.query[Oe], i = typeof o == "string" ? o : "", r = `${e}="${l.replace(/"/g, "")}"`;
    return { path: n, query: { ...a.query, [Oe]: it(i, r) } };
  };
}
function Uu(e, t = "/") {
  return (n) => ({ path: t, query: { ...n.query, [De]: e } });
}
function Qu(e) {
  const t = /* @__PURE__ */ new Map();
  for (const n of e) {
    const a = t.get(n.entityKey);
    a ? a.push(n) : t.set(n.entityKey, [n]);
  }
  return {
    query(n) {
      return pa(n, (a) => t.get(a.key) ?? [], {
        undatedLast: !0,
        zeroIsAll: !0
      });
    }
  };
}
function Yu(e, t) {
  return e.query({ ...t, limit: Number.MAX_SAFE_INTEGER, offset: 0 }).rows;
}
const eu = {
  DataShell: sc,
  ShellHeader: Oa,
  RecordActions: tn,
  ResultsArea: ja,
  SegmentedControl: wc,
  StatusPill: Ve,
  ListView: an,
  CardsView: Ra,
  GridView: Ba,
  ImagesView: Ha,
  TableView: Wa,
  LinksView: qa,
  PreviewView: Fa,
  TypeCardsView: za
}, Gu = {
  install(e, t = {}) {
    const n = t.prefix ?? "";
    for (const [a, s] of Object.entries(eu))
      e.component(`${n}${a}`, s);
    t.route && e.provide(Jn, t.route), (t.theme || t.accent || t.tokens) && ol({ theme: t.theme, accent: t.accent, tokens: t.tokens }, e);
  }
};
export {
  lu as COLUMN_BREAKPOINTS,
  su as COLUMN_ROLES,
  Ra as CardsView,
  Un as ColumnCell,
  Ic as CopyButton,
  vs as DEFAULT_ENTITY_VIEW,
  jt as DEFAULT_SORT,
  Zn as DEFAULT_VIEW,
  _l as DRAFT_DELAY,
  sc as DataShell,
  _e as EMPTY_CELL,
  ma as ENTITY_ALL,
  kt as ENTITY_TERM,
  at as EXPRESSION_TERM,
  Ba as GridView,
  Gu as HeaderContentLayoutPlugin,
  Ha as ImagesView,
  qa as LinksView,
  an as ListView,
  mt as MOCK_TINTS,
  ct as MetricDrill,
  ut as OpenMark,
  pn as PARAM_DIR,
  De as PARAM_ENTITY,
  Oe as PARAM_EXPR,
  Ot as PARAM_PAGE,
  vn as PARAM_SORT,
  Tt as PARAM_VIEW,
  au as PILL_TONES,
  Cl as POPOVER_FLIP_BELOW,
  xl as POPOVER_GAP,
  Sl as POPOVER_MARGIN,
  gn as PinStar,
  Fa as PreviewView,
  _n as QueryMark,
  je as RECORD_STATUSES,
  un as RESULT_FIELDS,
  Jn as ROUTE_ADAPTER_KEY,
  tn as RecordActions,
  Tr as RecordChoosers,
  ja as ResultsArea,
  Ca as SHELL_CONTEXT_KEY,
  wt as SHELL_THEME_KEY,
  dt as ScopeMark,
  wc as SegmentedControl,
  Ae as SelectTick,
  mu as ShellCard,
  _u as ShellCode,
  ku as ShellDialog,
  xc as ShellFact,
  yu as ShellFacts,
  Oa as ShellHeader,
  wu as ShellLog,
  mr as ShellPager,
  Ll as ShellPopover,
  bu as ShellToasts,
  nn as StandingControl,
  gu as StatusCounts,
  Ve as StatusPill,
  zc as TOAST_ERROR_MS,
  Wc as TOAST_MS,
  Wa as TableView,
  za as TypeCardsView,
  ps as VIEW_ICONS,
  on as VIEW_KINDS,
  Pn as VIEW_LABELS,
  it as addTerm,
  fn as andExpression,
  Ru as bytesCell,
  la as cellFull,
  di as cellNarrowings,
  Te as cellText,
  vt as cellTextOf,
  ie as cellValue,
  Ft as changesResults,
  Fu as chipsFrom,
  Mn as columnAlign,
  Ln as columnClass,
  En as columnKey,
  Ka as columnNarrows,
  rt as columnShortcut,
  ua as columnShortcutOf,
  Qt as columnTruncates,
  _s as columnsFor,
  oa as compactShortcuts,
  Hl as completeDraft,
  gs as countPages,
  as as createHistoryAdapter,
  Wu as createMemoryAdapter,
  Qu as createMemoryDataSource,
  Gs as createMockDataSource,
  zu as createVueRouterAdapter,
  Ou as dateColumn,
  bs as defaultCellText,
  ht as defaultQuery,
  Ge as defaultViewFor,
  ss as detachableAdapter,
  Dt as drillExpression,
  Bu as durationCell,
  Hu as elapsedCell,
  ms as emptyFacetValue,
  el as entityAddress,
  Nu as entityColumn,
  Ut as entityCount,
  Uu as entityRedirect,
  wa as excludingTerm,
  Ze as expandShortcuts,
  Au as facetColumn,
  nt as facetField,
  Ma as facetValue,
  Ts as fieldHeading,
  _a as fieldTerm,
  Xe as findEntity,
  ya as findEntityByAddress,
  Ce as findSort,
  Iu as flagColumn,
  Ue as fnv1a,
  ta as focusEntity,
  is as formatBytes,
  pt as formatCount,
  rs as formatDate,
  ru as formatDateTime,
  cs as formatDuration,
  us as formatElapsed,
  ye as formatExpression,
  He as formatInteger,
  ls as formatMetric,
  os as formatOrdinal,
  ds as formatPercent,
  Ps as formatRange,
  we as formatTerm,
  Ys as generateRows,
  fl as hasActiveFacets,
  Mu as identityColumn,
  vu as idsExpression,
  ou as isEntityScoped,
  ys as isFacetActive,
  cn as isPristineQuery,
  Je as isRangeTerm,
  aa as isTypeCardsQuery,
  ea as isViewKind,
  cu as joinExpression,
  ka as liftTerm,
  Is as matchesExpression,
  Tu as metricColumn,
  pu as narrowPatch,
  Rs as negateTerm,
  Xc as niceMax,
  ue as normalizeSearch,
  ui as numberRange,
  Hs as oppositeTerm,
  Su as ordinalColumn,
  re as parseExpression,
  al as parseQuery,
  qu as percentCell,
  Eu as pictureColumn,
  Pl as placePopover,
  Ar as presentParts,
  Aa as presentRow,
  tt as pressOptions,
  ll as provideShellContext,
  ol as provideShellTheme,
  Yu as queryAll,
  Vu as rangeFrom,
  Mt as rangeOf,
  Vs as readDraft,
  fu as readExpression,
  ju as recordRedirect,
  ga as recordTerm,
  sl as recordsIn,
  Lu as referenceColumn,
  et as refineExpression,
  Fe as resolveView,
  ve as roleColumn,
  sa as roleColumns,
  ks as rowKey,
  Yt as sameTerm,
  ot as scopeTerm,
  _t as scopeTermFor,
  xa as scopedEntity,
  du as searchFromQuery,
  Fn as serializeQuery,
  tl as sortAddress,
  Et as sortsFor,
  iu as splitExpression,
  Cu as stateColumn,
  fs as stripAnsi,
  hl as summarizeQuery,
  bt as summaryTerms,
  mn as termStanding,
  Pu as tintColumn,
  uu as tintFor,
  Du as toggleFacet,
  si as useColumns,
  wl as useDraft,
  Pr as useEntityCounts,
  Pi as useEntityPreviews,
  yn as useLayerTheme,
  $u as usePoll,
  Ne as usePresentedRows,
  ml as useQueryState,
  $l as useRecordNames,
  yl as useResults,
  ne as useShellContext,
  xu as useStableSchema,
  Uc as useToasts,
  Ku as usefulFacets,
  Cn as viewAcross,
  La as withFacetValue,
  Gt as withStanding,
  hu as withoutFacet,
  $a as withoutOwnScope,
  Bs as withoutTerm
};
