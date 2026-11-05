import { ref as H, computed as f, inject as rn, provide as on, getCurrentInstance as Jn, shallowRef as pe, toValue as Ee, watch as ae, onScopeDispose as St, getCurrentScope as Zn, defineComponent as K, onMounted as ot, onBeforeUnmount as ge, openBlock as u, createBlock as I, Teleport as Ct, createElementVNode as S, mergeProps as qe, unref as w, renderSlot as G, createCommentVNode as T, nextTick as Ge, createElementBlock as h, withKeys as Me, useSlots as Pt, useId as Et, withCtx as Y, toDisplayString as L, createTextVNode as te, Fragment as D, renderList as J, withModifiers as Le, normalizeClass as oe, withDirectives as Ut, normalizeStyle as le, vModelText as Xa, createVNode as U, reactive as xn, toHandlers as cn, resolveDynamicComponent as Ye, createSlots as jt, useModel as Sn, onBeforeUpdate as Ja, normalizeProps as Vt, guardReactiveProps as Za, mergeModels as Cn, vShow as Pn, Comment as es, Text as ts, readonly as ns, watchEffect as as } from "vue";
import { MenuList as ss } from "menu-bar";
const un = ["list", "cards", "grid", "images", "table", "links", "preview"], je = ["ok", "running", "queued", "review", "failed"], ru = [...je, "neutral", "accent"], ou = [
  "identity",
  "reference",
  "metric",
  "state",
  "updated",
  "image",
  "tint"
], iu = [480, 620, 760, 900, 1100], ea = Symbol("dc.routeAdapter");
function ue(e) {
  if (!e) return "";
  const t = e.replace(/^[?]/, "");
  return t ? `?${t}` : "";
}
function ls() {
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
function rs(e, t) {
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
function Qe(e) {
  let t = 2166136261;
  for (let n = 0; n < e.length; n++)
    t ^= e.charCodeAt(n), t = Math.imul(t, 16777619);
  return Math.abs(t);
}
const os = new Intl.NumberFormat("en-US", {
  minimumSignificantDigits: 2,
  maximumSignificantDigits: 2,
  useGrouping: !1
});
function Mt(e) {
  return Number.isFinite(e) ? Math.abs(e) < 100 ? os.format(e) : String(Math.round(e)) : "—";
}
function is(e) {
  return Number.isFinite(e) ? Number.isInteger(e) || Math.abs(e) >= 100 ? Xe(e) : Mt(e) : "—";
}
function Xe(e) {
  if (!Number.isFinite(e)) return "—";
  const t = Math.round(e), n = Math.abs(t);
  return n < 1e3 ? String(t) : n < 9950 ? `${(t / 1e3).toFixed(1)}k` : n < 999500 ? `${Math.round(t / 1e3)}k` : n < 995e4 ? `${(t / 1e6).toFixed(1)}m` : `${Math.round(t / 1e6)}m`;
}
function He(e) {
  return Number.isFinite(e) ? Math.round(e).toLocaleString("en-US") : "—";
}
function cs(e) {
  const t = new Date(e);
  if (Number.isNaN(t.getTime())) return "—";
  const n = String(t.getUTCDate()).padStart(2, "0"), a = String(t.getUTCMonth() + 1).padStart(2, "0");
  return `${n}.${a}.${t.getUTCFullYear()}`;
}
function us(e) {
  return String(e + 1);
}
function cu(e, t) {
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
function ds(e) {
  if (e == null || !Number.isFinite(e) || e < 0) return "—";
  if (e < 1e3) return `${e} B`;
  const t = ["kB", "MB", "GB", "TB"];
  let n = e, a = -1;
  for (; n >= 1e3 && a < t.length - 1; )
    n /= 1e3, a += 1;
  return `${Mt(n)} ${t[a]}`;
}
function fs(e) {
  if (!e || !Number.isFinite(e)) return "—";
  if (e < 1e3) return `${Math.round(e)}ms`;
  const t = e / 1e3;
  return t < 60 ? `${Mt(t)}s` : `${Math.floor(t / 60)}m ${Math.round(t % 60)}s`;
}
function vs(e) {
  if (e == null || !Number.isFinite(e) || e <= 0)
    return "—";
  const t = Math.floor(e / 60);
  return t ? `${t}:${String(e % 60).padStart(2, "0")}` : `${e}s`;
}
function ps(e) {
  return e == null || !Number.isFinite(e) ? "—" : `${Math.round(e * 100)}%`;
}
function hs(e) {
  return e.replace(/\x1b\[[0-9;?]*[ -/]*[@-~]/g, "");
}
const ta = "cards", ms = "table";
function Je(e, t = {}) {
  const n = (s) => s && na(s) ? s : void 0;
  if (e === null) return n(t.view) ?? ta;
  const a = t.landing === "entity" ? n(t.view) : void 0;
  return n(t.entityView) ?? a ?? ms;
}
function En(e, t, n, a = {}) {
  return a.viewAcrossTypes !== "default" && e !== Je(t, a) ? e : Je(n, a);
}
const Qt = "updated";
function na(e) {
  return typeof e == "string" && (e === "record" || un.includes(e));
}
const Mn = {
  list: "List",
  cards: "Cards",
  grid: "Grid",
  images: "Images",
  table: "Table",
  links: "Links",
  preview: "Preview",
  record: "Record"
}, ys = {
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
  if (e === "record" && !t?.includes(e)) return t?.[0] ?? ta;
  const [n] = t ?? [];
  return n === void 0 || t?.includes(e) ? e : n;
}
function Gt(e) {
  return typeof e.count == "number" ? Xe(e.count) : e.count;
}
function Ze(e, t) {
  return t ? e.entities.find((n) => n.key === t) ?? null : null;
}
function aa(e, t = {}) {
  const n = Ze(e, t.entity), a = e.entities[0];
  if (!n && !a) throw new Error(`Schema "${e.key}" declares no entities`);
  return n ?? a;
}
function sa(e, t = null) {
  return e?.columns ?? t?.columns ?? [];
}
function Lt(e, t = null) {
  if (e?.sorts?.length) return e.sorts;
  const n = /* @__PURE__ */ new Set(), a = [];
  for (const s of sa(e, t))
    !s.sort || n.has(s.sort) || (n.add(s.sort), a.push({ key: s.sort, label: (s.label ?? s.sort).toLowerCase() }));
  return a;
}
const gs = { key: Qt, label: Qt };
function Ce(e, t, n = null) {
  const a = Lt(e, n);
  return (t ? a.find((l) => l.key === t) : void 0) ?? a.find((l) => l.key === Qt) ?? a[0] ?? gs;
}
function _s(e) {
  switch (e.kind) {
    case "chips":
      return { kind: "chips", selected: [] };
    case "range":
      return { kind: "range", min: null, max: null };
    case "toggle":
      return { kind: "toggle", on: !1 };
  }
}
function ws(e) {
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
function uu(e) {
  return e.entity !== null;
}
function la(e, t) {
  return e.entity === null && Fe(e.view, t) === "cards";
}
function ks(e, t) {
  return t <= 0 ? 1 : Math.max(1, Math.ceil(e / t));
}
function mt(e, t = {}) {
  const a = t.landing === "entity" ? aa(e, t) : null;
  return {
    entity: a?.key ?? null,
    view: Je(a?.key ?? null, t),
    sort: Ce(a, t.sort).key,
    dir: t.dir === "asc" ? "asc" : "desc",
    expr: "",
    page: 1
  };
}
const fn = ["entity", "sort", "dir", "expr"];
function Dt(e) {
  return fn.some((t) => t in e);
}
const _e = "—";
function ve(e, t) {
  return e.find((n) => n.role === t);
}
function ra(e, t) {
  return e.filter((n) => n.role === t);
}
function bs(e, t) {
  const n = (t ? t.columns : e?.columns) ?? [], a = t ? "scoped" : "everything";
  return n.filter(
    (s) => s.role !== "tint" && ((s.when ?? "always") === "always" || s.when === a)
  );
}
const $s = ["id", "entityKey", "entityLabel"];
function ie(e, t) {
  if (e.value) return e.value(t);
  const n = e.field ?? e.key;
  if (n !== void 0) {
    if (t.fields && n in t.fields) return t.fields[n];
    if ($s.includes(n))
      return t[n];
  }
}
function Ln(e, t) {
  const n = e.key ?? e.field ?? e.label;
  return n?.trim() ? n.trim() : `column-${t}`;
}
function xs(e, t) {
  return e.id?.trim() ? e.id : `${e.entityKey || "row"}-${t}`;
}
function Ss(e, t) {
  if (e == null || e === "") return _e;
  if (t === "number") {
    const n = typeof e == "number" ? e : Number(e);
    return Number.isFinite(n) ? is(n) : String(e);
  }
  return t === "date" ? cs(String(e)) : Array.isArray(e) ? e.length ? e.join(", ") : _e : String(e);
}
function Te(e, t) {
  const n = ie(e, t);
  return e.format ? e.format(n, t) : Ss(n, e.kind);
}
function Cs(e) {
  return typeof e == "number" ? Number.isFinite(e) ? String(e) : "" : typeof e == "string" ? e : Array.isArray(e) ? e.join(", ") : "";
}
function oa(e, t) {
  const n = Te(e, t), a = Cs(ie(e, t));
  return a && a !== n ? a : n;
}
function ht(e, t) {
  return e ? Te(e, t) : "";
}
function Tn(e) {
  return e.align ? e.align : e.kind === "number" || e.kind === "ordinal" ? "right" : "left";
}
const Ps = {
  ordinal: "dc-table__num",
  number: "dc-table__number",
  date: "dc-table__date",
  status: "dc-table__state"
};
function On(e) {
  return [Ps[e.kind ?? "text"], e.class].filter(Boolean).join(" ");
}
function Yt(e) {
  if (e.truncate !== void 0) return e.truncate;
  const t = e.kind ?? "text";
  return t === "text" || t === "number" || t === "date";
}
const Es = /^([A-Za-z_][\w.-]*)\s*(>=|<=|:|=|>|<)\s*(.*)$/, Nn = "-?(?:\\d+\\.?\\d*|\\.\\d+)", Ms = new RegExp(`^(${Nn})?\\.\\.(${Nn})?$`);
function Tt(e) {
  const t = Ms.exec(e.trim());
  if (!t || t[1] === void 0 && t[2] === void 0) return null;
  const n = t[1] === void 0 ? null : Number(t[1]), a = t[2] === void 0 ? null : Number(t[2]);
  return n !== null && a !== null && n > a ? { min: a, max: n } : { min: n, max: a };
}
function Ls(e) {
  return `${e.min ?? ""}..${e.max ?? ""}`;
}
function et(e) {
  return e.kind === "field" && (e.comparator === ":" || e.comparator === "=") && Tt(e.value) !== null;
}
function Ts(e) {
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
  for (const s of Ts(t)) {
    const l = s.toUpperCase();
    if (l === "AND" || l === "&&") continue;
    if (l === "OR" || l === "||") {
      a.length && n.push(a), a = [];
      continue;
    }
    const o = s.length > 1 && s.startsWith("-"), i = o ? s.slice(1) : s, r = o ? { negated: !0 } : {}, c = Es.exec(i);
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
const Pe = (e) => e.toLowerCase().replace(/\s+/g, ""), ia = [
  ["status", "state"],
  ["state", "state"],
  ["updated", "updated"],
  ["date", "updated"],
  ["name", "identity"],
  ["ref", "reference"]
];
function Os(e, t, n) {
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
  const i = ia.find(([c]) => c === a)?.[1];
  if (i) {
    const c = ve(s, i);
    if (c) return ie(c, t);
  }
  const r = /^metric(\d+)$/.exec(a);
  if (r) {
    const c = ra(s, "metric")[Number(r[1]) - 1];
    if (c) return ie(c, t);
  }
}
function it(e) {
  return (e.toLowerCase().match(/[\p{L}\p{N}]+/gu) ?? []).map((t) => t.charAt(0)).join("");
}
const An = /^[a-z_][\w.-]*$/;
function Ot(e) {
  const t = (e.key ?? e.field)?.toLowerCase();
  if (t !== void 0) return An.test(t) ? t : void 0;
  const n = e.label === void 0 ? void 0 : Pe(e.label);
  return n !== void 0 && An.test(n) ? n : void 0;
}
function vn(e, t) {
  const n = Pe(e);
  return !!t?.entities.some((a) => a.scope && Pe(a.scope) === n);
}
function Ns(e, t, n) {
  const a = Pe(e);
  if (a === "entity" || ia.some(([l]) => l === a) || /^metric\d+$/.test(a) || vn(e, n)) return !0;
  const s = (l) => l !== void 0 && Pe(l) === a;
  return (t.columns ?? []).some(
    (l) => s(l.key) || s(l.field) || s(l.label)
  ) || t.facets.some((l) => s(l.key) || s(l.label));
}
function tt(e, t, n) {
  return t ? ua(e, (a) => {
    const s = da(a, t, n);
    return s && Ot(s);
  }) : e;
}
function ca(e, t, n) {
  return t ? ua(e, (a) => {
    if (vn(a, n)) return;
    const s = (t.columns ?? []).find((l) => Ot(l) === a);
    return s && fa(s, t, n);
  }) : e;
}
function As(e, t, n) {
  if (!t || vn(e, n)) return;
  const a = t.facets.find((s) => s.key.toLowerCase() === e);
  return a ? a.label : (t.columns ?? []).find((s) => Ot(s) === e)?.label;
}
function ua(e, t) {
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
function da(e, t, n) {
  if (!(!e || Ns(e, t, n)))
    return (t.columns ?? []).find(
      (a) => a.label !== void 0 && it(a.label) === e
    );
}
function fa(e, t, n) {
  if (!t || e.label === void 0 || !Ot(e)) return;
  const a = it(e.label);
  return da(a, t, n) === e ? a : void 0;
}
function Kt(e, t) {
  const n = e.toLowerCase(), a = t.toLowerCase();
  if (!a.includes("*")) return n.includes(a);
  const s = a.replace(/[.+?^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*");
  return new RegExp(s).test(n);
}
function In(e, t) {
  return e.toLowerCase() === t.toLowerCase();
}
function Is(e, t, n, a) {
  if (e.kind === "text") {
    const r = n.columns ?? [];
    return ["identity", "reference"].some((c) => {
      const d = ve(r, c), v = d ? ie(d, t) : void 0;
      return typeof v == "string" && Kt(v, e.value);
    });
  }
  const s = Os(e.field, t, n);
  if (s === void 0) return a?.has(e.field) ? !1 : null;
  const l = et(e) ? Tt(e.value) : null;
  if (l) {
    if (Array.isArray(s) || typeof s == "boolean") return null;
    const r = typeof s == "number" ? s : Number(s);
    return Number.isFinite(r) ? (l.min === null || r >= l.min) && (l.max === null || r <= l.max) : null;
  }
  if (Array.isArray(s))
    return e.comparator === ":" || e.comparator === "=" ? s.some(
      (c) => e.comparator === "=" ? In(String(c), e.value) : Kt(String(c), e.value)
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
    return e.comparator === "=" ? In(String(s), e.value) : Kt(String(s), e.value);
  }
  const o = Number(e.value), i = typeof s == "number" ? s : Number(s);
  return !Number.isFinite(o) || !Number.isFinite(i) ? null : Rs(e.comparator, i, o);
}
function Rn(e, t, n, a) {
  const s = Is(e, t, n, a);
  return s === null ? !0 : e.negated ? !s : s;
}
function Rs(e, t, n) {
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
function Bn(e) {
  return e.kind === "field" && !e.negated && (e.comparator === ":" || e.comparator === "=") && !et(e);
}
const Hn = /* @__PURE__ */ new WeakMap();
function Bs(e) {
  if (!e?.strictScopes) return null;
  let t = Hn.get(e);
  return t || (t = new Set(
    e.entities.flatMap((n) => n.scope ? [n.scope.toLowerCase()] : [])
  ), Hn.set(e, t)), t;
}
function Hs(e, t, n, a) {
  if (!e.length) return !0;
  const s = Bs(a);
  return e.some((l) => {
    const o = /* @__PURE__ */ new Map();
    for (const i of l)
      Bn(i) && o.set(
        i.field,
        (o.get(i.field) ?? !1) || Rn(i, t, n, s)
      );
    return l.every(
      (i) => Bn(i) ? o.get(i.field) === !0 : Rn(i, t, n, s)
    );
  });
}
function qn(e) {
  return /[\s"']/.test(e) ? `"${e.replace(/["']/g, "")}"` : e;
}
function we(e) {
  const t = e.negated ? "-" : "";
  return e.kind === "text" ? t + qn(e.value) : `${t}${e.field}${e.comparator}${qn(e.value)}`;
}
function qs(e) {
  if (!e.negated) return { ...e, negated: !0 };
  const { negated: t, ...n } = e;
  return n;
}
function ye(e) {
  return e.filter((t) => t.length).map((t) => t.map(we).join(" ")).join(" OR ");
}
function Fs(e, t, n) {
  return e.map((a, s) => s === t ? a.filter((l, o) => o !== n) : a).filter((a) => a.length);
}
function du(e) {
  const t = re(e);
  if (t.length > 1) return { parts: [], text: e.trim() };
  const n = t[0] ?? [];
  return {
    parts: n.filter((a) => a.kind === "field"),
    text: n.filter((a) => a.kind === "text").map(we).join(" ")
  };
}
function fu(e, t) {
  return [...e.map(we), t.trim()].filter(Boolean).join(" ");
}
const Fn = (e, t) => e.toLowerCase() === t.toLowerCase();
function Xt(e, t) {
  return !!e.negated == !!t.negated && va(e, t);
}
function Vs(e, t) {
  return !!e.negated != !!t.negated && va(e, t);
}
function va(e, t) {
  return e.kind === "field" ? t.kind === "field" && e.field === t.field && e.comparator === t.comparator && Fn(e.value, t.value) : t.kind === "text" && Fn(e.value, t.value);
}
function Ds(e, t) {
  return t.filter((n) => !e.some((a) => Xt(a, n)));
}
function pn(e, t) {
  return pa(e, t, (n) => n);
}
function nt(e, t) {
  return pa(
    e,
    t,
    (n, a) => n.filter((s) => !a.some((l) => Vs(s, l)))
  );
}
const Ks = /^[A-Za-z_][\w.-]*\s*(?:>=|<=|:|=|>|<)$/;
function Ws(e) {
  return ye(
    re(e).map(
      (t) => t.filter(
        (n) => n.kind !== "text" || n.value !== "-" && !Ks.test(n.value)
      )
    ).filter((t) => t.length > 0)
  );
}
function pa(e, t, n) {
  const a = re(e), s = re(t);
  return a.length ? s.length ? ye(
    a.flatMap(
      (l) => s.map((o) => [...n(l, o), ...Ds(l, o)])
    )
  ) : ye(a) : ye(s);
}
const ha = (e) => e.kind === "date" || e.role === "updated";
function zs(e) {
  if (!e) return () => 0;
  const n = (e.kind ?? "text") === "number" || e.role === "metric", a = ha(e);
  return (s, l) => {
    const o = ie(e, s), i = ie(e, l);
    return n ? Number(i ?? 0) - Number(o ?? 0) : a ? Date.parse(String(i ?? "")) - Date.parse(String(o ?? "")) : String(i ?? "").localeCompare(String(o ?? ""));
  };
}
function Vn(e, t) {
  return !t || !ha(t) ? !1 : !Number.isFinite(Date.parse(String(ie(t, e) ?? "")));
}
function ma({ query: e, schema: t, entity: n, limit: a, offset: s }, l, o) {
  const i = re(e.expr), r = n ? [n] : t.entities;
  let c = 0;
  const d = [];
  for (const k of r)
    for (const P of l(k))
      c += 1, Hs(i, P, k, t) && d.push(P);
  const v = Ce(n, e.sort, t), _ = sa(n, t).find((k) => k.sort === v.key), y = o.undatedLast ? d.filter((k) => !Vn(k, _)) : d, g = o.undatedLast ? d.filter((k) => Vn(k, _)) : [];
  y.sort(zs(_)), e.dir === "asc" && y.reverse();
  const p = g.length ? [...y, ...g] : y;
  return {
    // One page out of the middle. `total` stays the whole match, which is what
    // the shell counts pages with.
    rows: o.zeroIsAll && a <= 0 ? p.slice(s) : p.slice(s, s + a),
    total: d.length,
    unfiltered: d.length === c
  };
}
const yt = [
  "oklch(0.36 0.06 240)",
  "oklch(0.34 0.07 290)",
  "oklch(0.36 0.06 160)",
  "oklch(0.38 0.06 80)",
  "oklch(0.35 0.07 30)",
  "oklch(0.34 0.05 200)"
];
function vu(e) {
  return yt[Qe(e) % yt.length];
}
function ya(e, t) {
  return `${e}_${1e4 + t * 7}`;
}
const Us = 7, js = 3;
function Qs(e, t, n, a) {
  const s = (t * Us + Qe(n)) % a, l = [];
  for (let o = 0; o < Math.min(js, a); o++)
    l.push(ya(e, (s + o) % a));
  return l;
}
function Gs(e, t) {
  switch (e.kind) {
    case "chips":
      return e.multiple ? Ys(e.options, t) : e.options[t % e.options.length] ?? "";
    case "range": {
      const n = Math.max(0, e.max - e.min);
      return e.min + (n === 0 ? 0 : t % (n + 1));
    }
    case "toggle":
      return t % 3 === 0;
  }
}
function Ys(e, t) {
  if (!e.length) return [];
  const n = 1 + (t >> 5) % Math.min(3, e.length), a = t % e.length, s = /* @__PURE__ */ new Set();
  for (let l = 0; l < n; l++) s.add((a + l) % e.length);
  return [...s].sort((l, o) => l - o).map((l) => e[l]);
}
function Xs(e, t) {
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
      return yt[n % yt.length];
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
function Js(e, t = {}) {
  const n = t.population ?? 48, a = t.seed ?? "", s = t.now ?? /* @__PURE__ */ new Date("2026-08-25T00:00:00Z"), l = e.samples, o = t.scopes ?? [];
  if (!l.length) return [];
  const i = [];
  for (let r = 0; r < n; r++) {
    const c = l[r % l.length], d = Math.floor(r / l.length), v = Qe(`${a}:${e.key}:${c[0]}:${r}`), _ = ya(e.key, r), y = new Date(s.getTime() - v % 900 * 36e5).toISOString(), g = {};
    for (const p of e.columns ?? []) {
      const k = p.field ?? p.key;
      if (!k || p.value) continue;
      const P = Xs(p, {
        hash: Qe(`${v}:${k}`),
        sample: c,
        revision: d,
        updatedAt: y
      });
      P !== void 0 && (g[k] = P);
    }
    for (const p of e.facets)
      g[p.key] = Gs(p, Qe(`${v}:${p.key}`));
    for (const [p, k] of o)
      g[p] = k === e.key ? _ : Qs(k, r, p, n);
    i.push({ id: _, entityKey: e.key, entityLabel: e.label, fields: g });
  }
  return i;
}
function Zs(e = {}) {
  const t = /* @__PURE__ */ new Map(), n = (a, s) => {
    const l = t.get(a.key);
    if (l) return l;
    const o = e.scopes ?? s.entities.flatMap(
      (r) => r.scope ? [[r.scope, r.key]] : []
    ), i = Js(a, { ...e, scopes: o });
    return t.set(a.key, i), i;
  };
  return {
    query(a) {
      return ma(a, (s) => n(s, a.schema), {
        undatedLast: !1,
        zeroIsAll: !1
      });
    }
  };
}
const De = "e", Nt = "v", hn = "s", mn = "d", Oe = "q", At = "p", ga = "*", el = [
  De,
  Nt,
  hn,
  mn,
  Oe,
  At
], tl = [
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
function gt(e) {
  let t = encodeURIComponent(e);
  for (const [n, a] of tl) t = t.replace(n, a);
  return t;
}
function me(e) {
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
    n.push([me(l), o]);
  }
  return n;
}
function nl(e) {
  return el.includes(e);
}
function It(e, t) {
  if (!(!t || e.some((n) => n.key === t)))
    return e.find((n) => it(n.label) === t);
}
function al(e, t) {
  const n = it(e.label);
  return It(t.entities, n)?.key === e.key ? n : e.key;
}
function _a(e, t) {
  return t ? Ze(e, t) ?? It(e.entities, t) ?? null : null;
}
function sl(e, t) {
  const n = it(e.label);
  return It(t, n)?.key === e.key ? n : e.key;
}
function ll(e, t) {
  return t.some((n) => n.key === e) ? e : It(t, e)?.key ?? e;
}
function rl(e, t, n = {}) {
  const a = mt(t, n), s = new Map(yn(e)), l = s.get(De), o = l === void 0 ? a.entity : me(l), i = o === ga ? null : _a(t, o), r = s.get(Nt), c = r && na(me(r)) ? me(r) : Je(i?.key ?? null, n), d = s.get(hn), v = Ce(
    i,
    d ? ll(me(d), Lt(i, t)) : n.sort,
    t
  ), _ = s.get(mn), y = _ ? me(_) === "asc" ? "asc" : "desc" : a.dir, g = s.get(Oe), p = s.get(At), k = p === void 0 ? 1 : Number(me(p)), P = Number.isFinite(k) ? Math.max(1, Math.floor(k)) : 1;
  return {
    entity: i?.key ?? null,
    view: c,
    sort: v.key,
    dir: y,
    expr: g === void 0 ? "" : tt(me(g), i, t),
    page: P
  };
}
function Dn(e, t, n = {}, a = "") {
  const s = mt(t, n), l = Ze(t, e.entity), o = yn(a).filter(([v]) => !nl(v)), i = [], r = (v, _) => i.push([v, gt(_)]), c = l?.key ?? null;
  if (c !== s.entity && r(De, l ? al(l, t) : ga), e.view !== Je(c, n) && r(Nt, e.view), e.sort !== s.sort) {
    const v = Lt(l, t), _ = v.find((y) => y.key === e.sort);
    r(hn, _ ? sl(_, v) : e.sort);
  }
  e.dir !== s.dir && r(mn, e.dir), e.expr.trim() !== "" && r(Oe, ca(e.expr, l, t)), e.page > 1 && r(At, String(e.page));
  const d = [
    ...o.map(([v, _]) => [gt(v), _]),
    ...i
  ];
  return d.length ? `?${d.map(([v, _]) => _ === "" ? v : `${v}=${_}`).join("&")}` : "";
}
function pu(e) {
  const t = [];
  for (const [n, a] of Object.entries(e))
    for (const s of Array.isArray(a) ? a : [a]) {
      if (typeof s != "string") continue;
      const l = gt(n);
      t.push(s === "" ? l : `${l}=${gt(s)}`);
    }
  return t.length ? `?${t.join("&")}` : "";
}
function hu(e, t) {
  const n = new Map(yn(e)), a = n.get(Oe), s = a === void 0 ? "" : me(a);
  if (!t) return s;
  const l = n.get(De);
  return tt(
    s,
    l === void 0 ? null : _a(t, me(l)),
    t
  );
}
function ct(e, t) {
  return wa(e, t.id);
}
function wa(e, t) {
  const n = e?.scope;
  return n ? ka(n, t) : null;
}
function ka(e, t) {
  return `${e}="${t.replace(/"/g, "")}"`;
}
function mu(e, t) {
  const n = typeof e == "string" ? e : e?.scope;
  if (!n) return null;
  const a = t.filter((s) => s.replace(/"/g, "") !== "").map((s) => ka(n, s));
  return a.length ? a.join(" ") : null;
}
function Rt(e, t) {
  if (e.kind !== "field" || t.kind !== "field") return Xt(e, t);
  const n = (a) => a.comparator === ":" || a.comparator === "=";
  return Xt(e, { ...t, comparator: n(e) && n(t) ? e.comparator : t.comparator });
}
function _t(e, t) {
  return Rt(e, qs(t));
}
function wt(e, t) {
  return ct(
    e.entities.find((n) => n.key === t.entityKey),
    t
  );
}
function ut(e, t) {
  if (!t) return e;
  const n = e.trim();
  if (!n) return t;
  const [a] = re(t).flat();
  if (!a) return n;
  const s = re(n);
  return s.some((i) => i.some((r) => Rt(r, a))) ? n : s.some((i) => i.some((r) => _t(r, a))) ? ye(
    s.map(
      (i) => i.map((r) => _t(r, a) ? a : r)
    )
  ) : `${n} ${t}`;
}
function ba(e) {
  if (!e) return null;
  const t = e.trim();
  return t ? t.startsWith("-") ? t.slice(1) : `-${t}` : null;
}
function gn(e, t) {
  if (!t || !e.trim()) return null;
  const [n] = re(t).flat();
  if (!n) return null;
  const a = re(e).flat();
  return a.some((s) => Rt(s, n)) ? n.negated ? "out" : "in" : a.some((s) => _t(s, n)) ? n.negated ? "in" : "out" : null;
}
function $a(e, t) {
  if (!t || !e.trim()) return e;
  const [n] = re(t).flat();
  if (!n) return e;
  const a = re(e), s = a.map(
    (l) => l.filter((o) => !Rt(o, n) && !_t(o, n))
  );
  return s.every((l, o) => l.length === a[o]?.length) ? e : ye(s);
}
function Jt(e, t, n) {
  return t ? n === null ? $a(e, t) : ut(e, n === "out" ? ba(t) : t) : e;
}
function Zt(e, t) {
  const n = t.shiftKey ? `noopener,popup,width=${window.outerWidth},height=${window.outerHeight}` : "noopener";
  window.open(e, "_blank", n);
}
function xa() {
  const e = window.getSelection?.();
  return !!e && !e.isCollapsed;
}
function en(e) {
  return e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0;
}
function at(e) {
  return e.altKey ? { exclude: !0 } : {};
}
function Wt(e, t, n, a = {}) {
  const s = wt(e, n);
  return ut(t.expr, a.exclude ? ba(s) : s);
}
function Sa(e, t) {
  const n = e?.scope?.toLowerCase();
  if (!n || e?.keepsScope || !t.trim()) return t;
  const a = re(t), s = a.map(
    (l) => l.filter((o) => o.kind !== "field" || o.field !== n)
  );
  return s.every((l, o) => l.length === a[o]?.length) ? t : ye(s);
}
function Ca(e, t) {
  const n = t.toLowerCase();
  return e.entities.find((a) => a.scope?.toLowerCase() === n) ?? null;
}
function Pa(e, t, n) {
  if (!t || !n) return null;
  const a = Ca(e, t);
  return a ? { entity: a, id: n } : null;
}
function ol(e, t) {
  const n = [], a = /* @__PURE__ */ new Set();
  for (const s of t)
    for (const l of re(s).flat()) {
      if (l.kind !== "field" || l.negated) continue;
      const o = Pa(e, l.field, l.value);
      if (!o) continue;
      const i = `${o.entity.key}:${o.id.toLowerCase()}`;
      a.has(i) || (a.add(i), n.push({ entityKey: o.entity.key, id: o.id }));
    }
  return n;
}
function yu(e, t, n = "cards") {
  return {
    // An expression with nothing in it is no parameter, as the shell writes it.
    [Oe]: ut(e, t) || void 0,
    [De]: void 0,
    [Nt]: n,
    [At]: void 0
  };
}
const Ea = Symbol("dc.shellContext");
function il(e) {
  const t = e.liveQuery ? e : cl(e);
  return on(Ea, t), t;
}
function cl(e) {
  const t = e.draft ?? H("");
  return {
    draft: t,
    liveQuery: e.query,
    drafting: f(() => !1),
    commitDraft() {
      const n = t.value.trim();
      n && (e.setExpression(
        nt(e.query.value.expr, tt(n, e.entity.value, e.schema.value))
      ), t.value = "");
    },
    abandonDraft() {
      t.value = "";
    },
    ...e
  };
}
function ne() {
  const e = rn(Ea, null);
  if (!e)
    throw new Error(
      "[appfr] No shell context found. Render this component inside <DataShell>."
    );
  return e;
}
const kt = Symbol("dc-shell-theme");
function tn(e) {
  return {
    read: () => ({
      theme: Ee(e.theme),
      accent: Ee(e.accent),
      tokens: Ee(e.tokens)
    })
  };
}
function ul(e, t) {
  t ? t.provide(kt, tn(e)) : on(kt, tn(e));
}
function dl(e) {
  const t = Jn();
  on(kt, {
    ...tn(e),
    element: () => t?.proxy?.$el ?? null
  });
}
function _n(e) {
  const t = Jn(), n = rn(kt, null), a = pe(null);
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
function st(e) {
  return e.key.toLowerCase();
}
const fl = /* @__PURE__ */ new Set([">", ">=", "<", "<="]);
function Ma(e, t) {
  if (e.kind !== "field" || e.negated || e.field !== st(t)) return !1;
  const n = e.comparator === ":" || e.comparator === "=";
  switch (t.kind) {
    case "range":
      return et(e) || fl.has(e.comparator);
    case "chips":
      return n && !et(e) && La(t.options, e.value) !== void 0;
    case "toggle":
      return n && vl(e.value);
  }
}
function La(e, t) {
  const n = t.toLowerCase();
  return e.find((a) => a.toLowerCase() === n);
}
function vl(e) {
  const t = e.toLowerCase();
  return t === "true" || t === "yes";
}
function Ta(e, t) {
  const n = (re(e)[0] ?? []).filter((a) => Ma(a, t));
  switch (t.kind) {
    case "range": {
      let a = null, s = null;
      for (const l of n) {
        const o = Tt(l.value), i = Number(l.value);
        o ? (o.min !== null && (a = o.min), o.max !== null && (s = o.max)) : Number.isFinite(i) && (l.comparator.startsWith(">") ? a = i : s = i);
      }
      return { kind: "range", min: a, max: s };
    }
    case "chips": {
      const a = new Set(n.map((s) => La(t.options, s.value)));
      return { kind: "chips", selected: t.options.filter((s) => a.has(s)) };
    }
    case "toggle":
      return { kind: "toggle", on: n.length > 0 };
  }
}
function pl(e, t) {
  const n = st(e);
  switch (t.kind) {
    case "range":
      return t.min === null && t.max === null ? [] : [{ kind: "field", field: n, comparator: ":", value: Ls(t) }];
    case "chips":
      return t.selected.map((a) => ({ kind: "field", field: n, comparator: "=", value: a }));
    case "toggle":
      return t.on ? [{ kind: "field", field: n, comparator: ":", value: "true" }] : [];
  }
}
function Oa(e, t, n) {
  const a = pl(t, n), s = re(e), l = (s.length ? s : [[]]).map((o) => [
    ...o.filter((i) => !Ma(i, t)),
    ...a
  ]);
  return ye(l);
}
function gu(e, t) {
  return Oa(e, t, _s(t));
}
function hl(e, t) {
  return (t?.facets ?? []).some((n) => ws(Ta(e, n)));
}
const bt = "entity", lt = "expr", ml = { ">=": "≥", "<=": "≤", ">": ">", "<": "<" };
function ze(e) {
  const t = Number(e);
  return Number.isFinite(t) && !Number.isInteger(t) ? Mt(t) : String(e);
}
function yl(e, t, n) {
  if (e.kind !== "field") return we(e);
  const a = As(e.field, t, n);
  if (a === void 0) return we(e);
  const s = e.negated ? "-" : "", l = et(e) ? Tt(e.value) : null;
  if (l) {
    const i = l.min !== null && l.max !== null ? `${ze(l.min)} ≤ ${a} ≤ ${ze(l.max)}` : l.max !== null ? `${a} ≤ ${ze(l.max)}` : `${a} ≥ ${ze(l.min)}`;
    return s + i;
  }
  const o = ml[e.comparator];
  return o ? `${s}${a} ${o} ${ze(e.value)}` : we({ ...e, field: a });
}
function $t(e, t, n = null) {
  const a = [];
  return t && a.push({
    id: bt,
    label: `entity:${t.key}`,
    facetKey: bt
  }), re(e.expr).forEach((s, l) => {
    s.forEach((o, i) => {
      a.push({
        id: `${lt}:${l}:${i}`,
        label: yl(o, t, n),
        address: ca(we(o), t, n),
        facetKey: lt,
        group: l,
        index: i,
        ...o.kind === "field" ? { field: o.field, value: o.value } : {},
        ...o.negated ? { negated: !0 } : {}
      });
    });
  }), a;
}
function gl(e, t, n = null) {
  if (dn(e)) {
    const l = Ce(t, e.sort, n);
    return `everything · ${e.view} · ${l.label}`;
  }
  const a = $t(e, t).filter((l) => l.facetKey !== lt).map((l) => l.label), s = e.expr.trim();
  return s && a.push(`"${s}"`), a.join(" · ");
}
function _l(e) {
  const { adapter: t } = e, n = f(() => Ee(e.schema)), a = f(() => Ee(e.defaults) ?? {}), s = f(() => rl(t.search.value, n.value, a.value)), l = f(() => Ze(n.value, s.value.entity)), o = f(() => l.value ?? aa(n.value, a.value)), i = f(() => Lt(l.value, n.value)), r = f(() => Ce(l.value, s.value.sort, n.value)), c = (x, m) => {
    const b = Dn(x, n.value, a.value, t.search.value);
    return b === t.search.value && !t.elsewhere?.value ? !1 : (m === "push" ? t.push(b) : t.replace(b), !0);
  }, d = () => Ee(e.navigationMode) ?? "push", v = () => Ee(e.facetNavigationMode) ?? "replace", _ = (x, m) => {
    const b = x.page ?? (Dt(x) ? 1 : s.value.page);
    return c({ ...s.value, ...x, page: b }, m);
  }, y = (x) => {
    const m = x.page ?? (Dt(x) ? 1 : s.value.page);
    return g({ ...s.value, ...x, page: m });
  }, g = (x) => {
    const m = Dn(x, n.value, a.value, t.search.value);
    return t.href ? t.href(m) : `${t.path.value}${m}`;
  }, p = (x, m) => {
    const b = l.value?.facets.find((O) => O.key === x);
    if (!b) return;
    const E = Oa(s.value.expr, b, m(Ta(s.value.expr, b)));
    _({ expr: E }, v());
  }, k = (x) => {
    const m = x === null ? null : Ze(n.value, x);
    return (m?.key ?? null) === s.value.entity ? {} : {
      entity: m?.key ?? null,
      view: En(s.value.view, s.value.entity, m?.key ?? null, a.value),
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
    summary: f(() => gl(s.value, l.value, n.value)),
    terms: f(() => $t(s.value, l.value, n.value)),
    isPristine: f(() => dn(s.value)),
    isEverything: f(() => s.value.entity === null),
    hasFacets: f(() => hl(s.value.expr, l.value)),
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
      if (x.facetKey === bt) {
        P(null);
        return;
      }
      if (x.facetKey === lt) {
        const m = Fs(re(s.value.expr), x.group ?? 0, x.index ?? 0);
        _({ expr: ye(m) }, d());
      }
    },
    clearFilters() {
      _({ ...k(null), expr: "" }, d());
    },
    clearHref: () => y({ ...k(null), expr: "" }),
    reset() {
      c(mt(n.value, a.value), d());
    },
    homeHref: () => g(mt(n.value, a.value)),
    hrefFor(x) {
      const m = { ...s.value, ...x };
      return "entity" in x && !("view" in x) && (m.view = En(s.value.view, s.value.entity, m.entity, a.value)), m.page = x.page ?? (Dt(x) ? 1 : s.value.page), g(m);
    }
  };
}
const Kn = 50;
function wl(e) {
  const t = pe([]), n = H(0), a = H(!1), s = H(!1), l = pe(null);
  let o = 0, i = null, r = null;
  const c = f(() => (e.query.value.page - 1) * e.limit.value), d = f(() => ks(n.value, e.limit.value)), v = () => {
    const E = e.query.value, O = e.within?.value.trim(), X = Sa(e.entity.value, E.expr);
    return O ? { ...E, expr: pn(O, X) } : X === E.expr ? E : { ...E, expr: X };
  }, _ = (E, O) => {
    t.value = E.rows, n.value = E.total, l.value = null, y(O);
  }, y = (E) => {
    i = { key: E, total: n.value }, s.value = !1;
  }, g = (E) => {
    l.value = E, t.value = [], n.value = 0, i = null, s.value = !1;
  }, p = (E, O, X, q) => {
    let V = !0;
    const j = () => E === o;
    let ee = 0, de = !1;
    const ce = (M) => {
      ee = M, de = !0, q === void 0 && (n.value = M);
    }, ke = () => {
      V && (V = !1, t.value = [], ce(0)), l.value = null;
    };
    return {
      get open() {
        return j();
      },
      insert(M, Q) {
        if (!j()) return;
        const N = Array.isArray(M) ? M : [M];
        if (!N.length) return;
        ke();
        const Z = [...t.value];
        Z.splice(Q ?? Z.length, 0, ...N), t.value = O > 0 ? Z.slice(0, O) : Z, ce(ee + N.length);
      },
      set(M) {
        j() && (M.rows && (ke(), t.value = O > 0 ? M.rows.slice(0, O) : M.rows, ce(M.rows.length)), M.total !== void 0 && ce(M.total));
      },
      close() {
        j() && (a.value = !1, de && (n.value = ee), y(X));
      },
      fail(M) {
        j() && (g(M), a.value = !1);
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
    let j;
    try {
      j = V.query(q);
    } catch (ee) {
      g(ee);
      return;
    }
    if (!(j instanceof Promise)) {
      _(j, O), a.value = !1;
      return;
    }
    a.value = !0, j.then((ee) => {
      E === o && _(ee, O);
    }).catch((ee) => {
      E === o && g(ee);
    }).finally(() => {
      E === o && (a.value = !1);
    });
  }, x = f(() => {
    const E = v();
    return `${e.entity.value?.key ?? e.schema.value.entities[0]?.key ?? ""}|${JSON.stringify(fn.map((X) => E[X]))}`;
  }), m = f(() => `${x.value}|${e.query.value.page}`);
  return ae([e.source, m, e.limit], P, {
    immediate: !0
  }), St(() => {
    o++, k();
  }, !0), { rows: t, total: n, offset: c, pageCount: d, pending: a, counting: s, error: l, refresh: P, locate: async (E, O) => {
    const X = Math.max(0, O - 1 - Kn);
    try {
      const { rows: q } = await e.source.value.query({
        query: v(),
        schema: e.schema.value,
        entity: e.entity.value,
        limit: Kn * 2 + 1,
        offset: X
      }), V = q.findIndex((j) => j.id === E);
      return V === -1 ? null : X + V + 1;
    } catch {
      return null;
    }
  } };
}
function kl(e) {
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
const bl = 150;
function $l(e) {
  const t = e.delay ?? bl, n = H(""), a = H("");
  let s = !1, l;
  const o = () => {
    clearTimeout(l), l = void 0;
  }, i = f(() => tt(Ws(a.value), e.entity.value, e.schema?.value)), r = f(() => i.value.trim() !== ""), c = f(
    () => JSON.stringify([i.value, ...fn.map((y) => e.query.value[y])])
  ), d = pe(null), v = f(() => {
    const y = e.query.value;
    if (!r.value) return y;
    const g = d.value?.of === c.value ? d.value.page : 1;
    return { ...y, expr: nt(y.expr, i.value), page: g };
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
  return Zn() && St(o), {
    text: n,
    live: v,
    drafting: r,
    setPage(y) {
      d.value = { of: c.value, page: Math.max(1, Math.floor(y)) };
    },
    commit() {
      const y = n.value.trim();
      if (!y) return;
      const g = nt(
        e.query.value.expr,
        tt(y, e.entity.value, e.schema?.value)
      );
      a.value = y, _(() => e.setExpression(g));
    },
    abandon() {
      o(), s = !1, n.value = "", a.value = "";
    },
    release: _
  };
}
const xl = 25, Na = (e, t) => e.toLowerCase() === t.toLowerCase();
function Sl(e, t) {
  return e.find((n) => Na(n.id, t));
}
function Cl(e) {
  const t = pe(/* @__PURE__ */ new Map()), n = /* @__PURE__ */ new Set(), a = (i) => {
    if (i.facetKey !== lt) return null;
    const r = Pa(e.schema.value, i.field, i.value);
    return r ? { ...r, key: `${r.entity.key}:${r.id}` } : null;
  }, s = (i) => {
    const { entity: r, id: c } = i, d = e.query.value;
    return e.source.value.query({
      query: {
        ...d,
        entity: r.key,
        // The reference on its own. The rest of the query is about the rows on
        // screen, which are of another type entirely.
        expr: wa(r, c) ?? "",
        sort: Ce(r, d.sort, e.schema.value).key,
        page: 1
      },
      schema: e.schema.value,
      entity: r,
      limit: xl,
      offset: 0
    });
  }, l = (i, r) => {
    const c = ht(ve(i.columns ?? [], "identity"), r);
    return c === _e || Na(c, r.id) ? "" : c;
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
        const { reference: g } = r[y], p = Sl(_.rows, g.id);
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
const Pl = 4, El = 8, Ml = 180;
function Ll(e, t, n, a = {}) {
  const s = a.gap ?? Pl, l = a.margin ?? El, o = a.flipBelow ?? Ml, i = a.side ?? "below", r = {
    below: n.height - e.bottom - s - l,
    above: e.top - s - l
  }, c = i === "below" ? "above" : "below", d = r[i] < o && r[c] > r[i] ? c : i, v = Math.min(a.maxHeight ?? 1 / 0, Math.max(0, r[d])), _ = Math.max(0, n.width - l * 2), y = Math.min(a.minWidth ?? e.width, _), g = Math.min(Math.max(t, y), _), p = a.align === "end" ? e.right - g : e.left, k = Math.max(l, Math.min(p, n.width - g - l));
  return d === "below" ? { side: d, left: k, top: e.bottom + s, maxHeight: v, minWidth: y, maxWidth: _ } : { side: d, left: k, bottom: n.height - e.top + s, maxHeight: v, minWidth: y, maxWidth: _ };
}
const Tl = ["data-dc-theme", "data-dc-side"], Se = [], Ol = /* @__PURE__ */ K({
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
      m && (r.value = Ll(
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
      Se.includes(c) || (Se.push(c), o(), r.value = null, await Ge(), d(), window.addEventListener("pointerdown", g, !0), document.addEventListener("keydown", p, !0), window.addEventListener("resize", d), window.addEventListener("scroll", d, !0), typeof ResizeObserver < "u" && i.value && (k = new ResizeObserver(() => d()), k.observe(i.value)));
    }
    function x() {
      const m = Se.indexOf(c);
      m !== -1 && (Se.splice(m, 1), window.removeEventListener("pointerdown", g, !0), document.removeEventListener("keydown", p, !0), window.removeEventListener("resize", d), window.removeEventListener("scroll", d, !0), k?.disconnect(), k = null);
    }
    return ot(() => {
      n.open && P();
    }), ae(
      () => n.open,
      (m) => {
        m ? P() : x();
      }
    ), ae(() => n.anchor, () => {
      n.open && d();
    }), ge(x), (m, b) => e.open ? (u(), I(Ct, {
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
        G(m.$slots, "default", {}, void 0, !0)
      ], 16, Tl)
    ], 8, ["to"])) : T("", !0);
  }
}), z = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [a, s] of t)
    n[a] = s;
  return n;
}, Nl = /* @__PURE__ */ z(Ol, [["__scopeId", "data-v-a688f2f7"]]), Al = ["href"], Il = /* @__PURE__ */ K({
  __name: "PressLink",
  props: {
    href: {},
    selectable: { type: Boolean }
  },
  emits: ["press"],
  setup(e, { emit: t }) {
    const n = e, a = t;
    function s(i) {
      i.stopPropagation(), !xa() && (n.href && en(i) ? Zt(n.href, i) : a("press", at(i), i));
    }
    function l(i) {
      n.href && i.button === 1 && Zt(n.href, i);
    }
    function o(i) {
      if (n.href && en(i)) {
        i.stopPropagation();
        return;
      }
      i.preventDefault(), a("press", at(i), i);
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
      G(i.$slots, "default", {}, void 0, !0)
    ], 32)) : e.href ? (u(), h("a", {
      key: 1,
      href: e.href,
      class: "dc-press",
      onClick: o
    }, [
      G(i.$slots, "default", {}, void 0, !0)
    ], 8, Al)) : (u(), h("button", {
      key: 2,
      type: "button",
      class: "dc-press",
      onClick: o
    }, [
      G(i.$slots, "default", {}, void 0, !0)
    ]));
  }
}), se = /* @__PURE__ */ z(Il, [["__scopeId", "data-v-e5165a68"]]), xt = (e) => e.toLowerCase().replace(/\s+/g, ""), Rl = /(?:[^\s"]|"[^"]*"?)*$/, Bl = /^(-?)([^:=<>"\s-][^:=<>"\s]*)([:=])(.*)$/, Wn = 4;
function Hl(e, t) {
  const n = xt(t);
  return e.find((a) => st(a) === n || xt(a.label) === n);
}
function ql(e) {
  switch (e.kind) {
    case "toggle":
      return e.text;
    case "range":
      return `${e.min}..${e.max}`;
    case "chips": {
      const t = e.options.slice(0, Wn).join(" · "), n = e.options.length - Wn;
      return n > 0 ? `${t} · +${n}` : t;
    }
  }
}
function Fl(e) {
  switch (e.kind) {
    case "toggle":
      return [{ value: "true", hint: e.text }, { value: "false" }];
    case "chips":
      return e.options.map((t) => ({ value: t }));
    case "range":
      return [];
  }
}
function zn(e, t) {
  return xt(e).includes(xt(t));
}
function Vl(e, t) {
  const n = Rl.exec(e)?.[0] ?? "", a = e.slice(0, e.length - n.length), s = [], l = Bl.exec(n);
  if (l) {
    const [, o, i, r, c] = l, d = Hl(t, i);
    if (!d) return [];
    const v = c.replace(/"/g, "").toLowerCase();
    for (const { value: _, hint: y } of Fl(d)) {
      if (!_.toLowerCase().includes(v)) continue;
      const g = we({
        kind: "field",
        field: st(d),
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
      if (i && !zn(r.key, i) && !zn(r.label, i)) continue;
      const c = `${o}${st(r)}:`;
      s.push({ draft: a + c, label: c, hint: ql(r), complete: !1 });
    }
  }
  return s.filter((o) => o.draft !== e);
}
const Dl = { class: "dc-header" }, Kl = { class: "dc-header__main" }, Wl = {
  class: "dc-header__brand",
  "aria-hidden": "true"
}, zl = { class: "dc-header__sr" }, Ul = {
  key: 2,
  class: "dc-header__within"
}, jl = ["title"], Ql = { class: "dc-header__query" }, Gl = ["data-dc-more", "title"], Yl = { class: "dc-header__run" }, Xl = {
  key: 0,
  class: "dc-header__or dc-mono",
  "aria-hidden": "true"
}, Jl = ["title", "aria-label", "onClick"], Zl = ["placeholder", "aria-expanded", "aria-activedescendant", "onKeydown"], er = ["id", "aria-selected", "onClick"], tr = { class: "dc-completion__term dc-mono" }, nr = {
  key: 0,
  class: "dc-completion__hint"
}, ar = {
  key: 0,
  class: "dc-header__actions"
}, sr = /* @__PURE__ */ K({
  __name: "ShellHeader",
  setup(e) {
    const t = Pt(), n = ne(), a = f(() => n.schema.value), s = f(() => {
      const C = n.within.value.trim();
      return C ? $t({ ...n.query.value, expr: C }, null) : [];
    }), l = f(() => {
      const C = n.entity.value, A = C?.keepsScope ? void 0 : C?.scope?.toLowerCase();
      return n.terms.value.filter((B) => B.facetKey !== bt).map((B, F, Re) => {
        const Be = Re[F - 1];
        return {
          term: B,
          or: Be?.group !== void 0 && B.group !== void 0 && B.group !== Be.group,
          idle: !!A && B.field?.toLowerCase() === A
        };
      });
    }), o = Cl({
      source: n.source,
      schema: n.schema,
      query: n.query,
      loading: n.loading,
      // The scope's parts as well as the query's: it names a record more often
      // than a typed term does, being what a record's own page is built on.
      terms: f(() => [...s.value, ...n.terms.value])
    });
    function i(C) {
      const A = Ca(a.value, C)?.scopeLabel ?? C;
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
      return $t(
        { ...A, expr: nt(A.expr, C.term) },
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
      return C.length ? Vl(n.draft.value, C) : [];
    }), m = f(() => k.value && x.value.length > 0);
    ae(x, () => {
      P.value = -1;
    });
    const b = `${Et() ?? "dc-header"}-completions`;
    function E(C) {
      n.draft.value = C.draft, k.value = !C.complete, P.value = -1, Ge(() => {
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
    const q = H(null), V = f(() => Math.min(q.value ?? 1 / 0, l.value.length)), j = f(() => [
      { key: "before", entries: l.value.slice(0, V.value) },
      { key: "after", entries: l.value.slice(V.value) }
    ]), ee = f(() => V.value < l.value.length);
    ae(l, (C) => {
      q.value !== null && q.value >= C.length && (q.value = null);
    });
    function de(C, A) {
      q.value = C >= l.value.length ? null : Math.max(0, C), Ge(() => {
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
    ), ae([l, V], $e, { flush: "post" }), ge(() => xe?.disconnect()), (C, A) => (u(), h("div", Dl, [
      S("div", Kl, [
        a.value.label && t.brand ? (u(), I(se, {
          key: 0,
          class: "dc-header__domain",
          "data-dc-brand": "",
          title: "Home",
          href: w(n).homeHref(),
          onPress: A[0] || (A[0] = (B) => w(n).reset())
        }, {
          default: Y(() => [
            S("span", Wl, [
              G(C.$slots, "brand", {
                label: a.value.label
              }, void 0, !0)
            ]),
            S("span", zl, L(a.value.label), 1)
          ]),
          _: 3
        }, 8, ["href"])) : a.value.label ? (u(), I(se, {
          key: 1,
          class: "dc-header__domain",
          title: "Home",
          href: w(n).homeHref(),
          onPress: A[1] || (A[1] = (B) => w(n).reset())
        }, {
          default: Y(() => [
            te(L(a.value.label), 1)
          ]),
          _: 1
        }, 8, ["href"])) : T("", !0),
        G(C.$slots, "lead", {}, void 0, !0),
        s.value.length ? (u(), h("span", Ul, [
          A[10] || (A[10] = S("span", { class: "dc-header__sr" }, "Within", -1)),
          (u(!0), h(D, null, J(s.value, (B) => (u(), h("span", {
            key: `scope:${B.id}`,
            class: "dc-within dc-mono dc-truncate",
            title: c(B)
          }, L(c(B)), 9, jl))), 128))
        ])) : T("", !0),
        S("div", Ql, [
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
              (u(!0), h(D, null, J(j.value, (B) => (u(), h(D, {
                key: B.key
              }, [
                S("span", Yl, [
                  (u(!0), h(D, null, J(B.entries, (F) => (u(), h(D, {
                    key: F.term.id
                  }, [
                    F.or ? (u(), h("span", Xl, "or")) : T("", !0),
                    S("button", {
                      type: "button",
                      class: oe(["dc-term dc-mono", { "dc-term--idle": F.idle }]),
                      title: d(F),
                      "aria-label": `Remove ${c(F.term)}`,
                      onMousedown: A[2] || (A[2] = Le(() => {
                      }, ["prevent"])),
                      onClick: (Re) => fe(F.term, B.key === "before")
                    }, L(c(F.term)), 43, Jl)
                  ], 64))), 128)),
                  B.key === "before" ? (u(!0), h(D, { key: 0 }, J(v.value, (F) => (u(), h("span", {
                    key: F,
                    class: "dc-term dc-term--preview dc-mono",
                    "aria-hidden": "true"
                  }, L(F), 1))), 128)) : T("", !0)
                ]),
                B.key === "before" ? Ut((u(), h("input", {
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
                }, null, 46, Zl)), [
                  [Xa, w(n).draft.value]
                ]) : T("", !0)
              ], 64))), 128))
            ], 40, Gl)
          ], 32)
        ])
      ]),
      U(Nl, {
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
        default: Y(() => [
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
            S("span", tr, L(B.label), 1),
            B.hint ? (u(), h("span", nr, L(B.hint), 1)) : T("", !0)
          ], 42, er))), 128))
        ]),
        _: 1
      }, 8, ["open", "anchor"]),
      t.actions ? (u(), h("div", ar, [
        G(C.$slots, "actions", {}, void 0, !0)
      ])) : T("", !0)
    ]));
  }
}), Aa = /* @__PURE__ */ z(sr, [["__scopeId", "data-v-421d89d4"]]), lr = ["checked", "indeterminate"], Ia = /* @__PURE__ */ K({
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
    }, null, 40, lr));
  }
}), rr = { class: "dc-pick" }, or = ["id"], ir = ["id", "aria-expanded", "aria-labelledby", "data-dc-value"], cr = {
  key: 0,
  class: "dc-pick__icon",
  viewBox: "0 0 16 16",
  "aria-hidden": "true"
}, ur = ["d"], dr = { class: "dc-pick__label" }, fr = /* @__PURE__ */ K({
  __name: "PickControl",
  props: {
    modelValue: {},
    options: {},
    label: {},
    mono: { type: Boolean }
  },
  emits: ["update:modelValue", "open", "close"],
  setup(e, { emit: t }) {
    const n = e, a = t, s = Et() ?? "dc-pick", l = H(null), o = H(null), i = H(null), r = H(!1), c = f(() => i.value !== null), d = H(null), v = f(
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
    return (b, E) => (u(), h("span", rr, [
      S("span", {
        id: `${w(s)}-name`,
        class: "dc-pick__name"
      }, L(e.label), 9, or),
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
        v.value?.icon ? (u(), h("svg", cr, [
          S("path", {
            d: v.value.icon
          }, null, 8, ur)
        ])) : T("", !0),
        S("span", dr, L(v.value?.label), 1)
      ], 42, ir),
      E[1] || (E[1] = S("svg", {
        class: "dc-pick__mark",
        viewBox: "0 0 16 16",
        "aria-hidden": "true"
      }, [
        S("path", { d: "M4 6l4 4 4-4" })
      ], -1)),
      i.value && d.value ? (u(), I(Ct, {
        key: 0,
        to: d.value
      }, [
        U(w(ss), {
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
}), nn = /* @__PURE__ */ z(fr, [["__scopeId", "data-v-7e5be459"]]), vr = {
  class: "dc-pager",
  "aria-label": "Pages"
}, pr = ["title"], hr = ["value", "onKeydown"], mr = {
  class: "dc-pager__total",
  "aria-hidden": "true"
}, yr = {
  class: "dc-pager__sr",
  "aria-live": "polite"
}, gr = /* @__PURE__ */ K({
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
    return (y, g) => (u(), h("nav", vr, [
      U(se, {
        class: "dc-pager__step",
        "aria-label": "Previous page",
        href: a.value > 1 ? w(n).hrefFor({ page: a.value - 1 }) : null,
        disabled: a.value <= 1,
        onPress: g[0] || (g[0] = (p) => w(n).setPage(a.value - 1))
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
          style: le({ width: r.value }),
          value: i.value,
          onFocus: c,
          onInput: d,
          onKeydown: [
            Me(Le(v, ["prevent"]), ["enter"]),
            Me(Le(_, ["prevent"]), ["esc"])
          ],
          onBlur: v
        }, null, 44, hr),
        S("span", mr, "/ " + L(s.value), 1)
      ], 8, pr),
      S("span", yr, L(l.value), 1),
      U(se, {
        class: "dc-pager__step",
        "aria-label": "Next page",
        href: a.value < w(n).pageCount.value ? w(n).hrefFor({ page: a.value + 1 }) : null,
        disabled: a.value >= w(n).pageCount.value,
        onPress: g[1] || (g[1] = (p) => w(n).setPage(a.value + 1))
      }, {
        default: Y(() => [...g[3] || (g[3] = [
          S("span", { "aria-hidden": "true" }, "›", -1)
        ])]),
        _: 1
      }, 8, ["href", "disabled"])
    ]));
  }
}), _r = /* @__PURE__ */ z(gr, [["__scopeId", "data-v-94fea4d7"]]), wr = {
  key: 0,
  class: "dc-actions__order"
}, kr = {
  key: 1,
  class: "dc-actions__select"
}, br = {
  key: 0,
  class: "dc-actions__all"
}, $r = {
  class: "dc-actions__count",
  "aria-live": "polite"
}, xr = {
  key: 1,
  class: "dc-actions__count dc-actions__all",
  "aria-live": "polite"
}, Sr = { class: "dc-actions__ops" }, Cr = ["disabled"], Pr = ["data-dc-operation", "disabled", "onClick"], Er = ["disabled"], Mr = /* @__PURE__ */ K({
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
      () => !la(n.query.value, t.views) && a.value !== "record"
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
      s.value ? (u(), h("span", wr, [
        o.value ? (u(), I(nn, {
          key: 0,
          class: "dc-actions__pick dc-actions__sort",
          label: "Sort",
          "model-value": w(n).sort.value.key,
          options: l.value,
          "onUpdate:modelValue": w(n).setSort
        }, null, 8, ["model-value", "options", "onUpdate:modelValue"])) : T("", !0),
        U(se, {
          class: "dc-actions__dir",
          "aria-label": r.value,
          title: r.value,
          href: w(n).hrefFor({ dir: i.value ? "asc" : "desc" }),
          onPress: E[0] || (E[0] = (O) => w(n).toggleDirection())
        }, {
          default: Y(() => [
            te(L(i.value ? "↓" : "↑"), 1)
          ]),
          _: 1
        }, 8, ["aria-label", "title", "href"])
      ])) : T("", !0),
      g.value && P.value ? (u(), h("div", kr, [
        p.value ? (u(), h("span", xr, L(P.value), 1)) : (u(), h("label", br, [
          U(Ia),
          S("span", $r, L(P.value), 1)
        ])),
        y.value ? (u(), h("button", {
          key: 2,
          type: "button",
          class: oe(["dc-actions__clear", { "dc-actions__clear--op": x.value }]),
          onClick: E[1] || (E[1] = (O) => w(n).clearSelection())
        }, " Clear ", 2)) : T("", !0)
      ])) : T("", !0),
      S("div", Sr, [
        c.value?.create ? (u(), I(se, {
          key: 0,
          class: "dc-actions__op dc-actions__new",
          href: w(n).createHref?.(c.value),
          onPress: E[2] || (E[2] = (O) => w(n).create(c.value))
        }, {
          default: Y(() => [
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
        }, L(m(c.value.duplicate)), 9, Cr)) : T("", !0),
        (u(!0), h(D, null, J(c.value?.operations ?? [], (O) => (u(), h("button", {
          key: O.key,
          type: "button",
          class: "dc-actions__op",
          "data-dc-operation": O.key,
          disabled: !y.value && O.selection !== !1,
          onClick: (X) => w(n).operate(O.key)
        }, L(O.selection === !1 ? O.label : m(O.label)), 9, Pr))), 128)),
        c.value?.delete ? (u(), h("button", {
          key: 2,
          type: "button",
          class: "dc-actions__op dc-actions__danger",
          disabled: !y.value,
          onClick: E[4] || (E[4] = (O) => w(n).delete())
        }, L(m(c.value.delete)), 9, Er)) : T("", !0)
      ]),
      _.value ? (u(), I(_r, {
        key: 2,
        class: "dc-actions__pages",
        "pages-note": e.pagesNote
      }, null, 8, ["pages-note"])) : T("", !0)
    ], 2)) : T("", !0);
  }
}), an = /* @__PURE__ */ z(Mr, [["__scopeId", "data-v-4921c240"]]);
function Lr(e) {
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
      const k = Sa(p, c.expr), P = _ ? pn(_, k) : k;
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
  return Zn() && St(l), { counts: t, pristine: n, refresh: o, cancel: l };
}
const Tr = {
  key: 0,
  class: "dc-choosers"
}, Or = "…", Nr = /* @__PURE__ */ K({
  __name: "RecordChoosers",
  props: {
    views: {},
    typeChooser: {}
  },
  setup(e) {
    const t = e, n = ne(), a = f(
      () => n.hasFacets.value || !!n.liveQuery.value.expr.trim() || !!n.within.value
    ), s = Lr({
      source: n.source,
      schema: n.schema,
      // What each type holds of what is on screen, the draft's results included:
      // a count of the committed query would disagree with the rows under it.
      query: n.liveQuery,
      entities: n.entities,
      within: n.within
    });
    function l(y) {
      if (y.key === n.query.value.entity && a.value) return Xe(n.total.value);
      if (s.pristine.value) return Gt(y);
      const p = s.counts.value.get(y.key);
      return p ? p.counted ? `${p.pending ? "~" : ""}${Xe(p.total)}` : Or : Gt(y);
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
        label: y === "record" ? n.recordView.value?.label ?? Mn.record : Mn[y],
        icon: ys[y]
      }))
    ), d = f(() => Fe(n.query.value.view, t.views)), v = f(() => c.value.length > 1);
    function _(y) {
      n.setView(y);
    }
    return (y, g) => i.value || v.value ? (u(), h("div", Tr, [
      i.value ? (u(), I(nn, {
        key: 0,
        class: "dc-actions__pick dc-actions__type",
        label: "Type",
        "model-value": w(n).query.value.entity ?? "",
        options: o.value,
        onOpen: w(s).refresh,
        onClose: w(s).cancel,
        "onUpdate:modelValue": r
      }, null, 8, ["model-value", "options", "onOpen", "onClose"])) : T("", !0),
      v.value ? (u(), I(nn, {
        key: 1,
        class: "dc-actions__pick dc-actions__view",
        label: "View",
        "model-value": d.value,
        options: c.value,
        "onUpdate:modelValue": _
      }, null, 8, ["model-value", "options"])) : T("", !0)
    ])) : T("", !0);
  }
}), Ar = /* @__PURE__ */ z(Nr, [["__scopeId", "data-v-5a44a2f3"]]);
function Ir(e, t) {
  if (!e) return null;
  const n = ie(e, t);
  return typeof n == "string" && n.trim() ? n : null;
}
const Rr = (e) => e == null || typeof e == "string" && !e.trim();
function Br(e, t) {
  const n = ve(t, "state"), a = ve(t, "tint");
  return {
    identity: ht(ve(t, "identity"), e),
    reference: ht(ve(t, "reference"), e),
    metrics: ra(t, "metric").map((s) => ({
      column: s,
      label: s.label ?? "",
      text: Te(s, e)
    })),
    facts: t.filter((s) => s.cardLabel && !Rr(ie(s, e))).map((s) => ({
      column: s,
      label: s.cardLabel,
      title: [s.label, s.hint].filter(Boolean).join(" — "),
      text: Te(s, e)
    })),
    state: n ? ie(n, e) ?? null : null,
    updated: ht(ve(t, "updated"), e),
    image: Ir(ve(t, "image"), e),
    tint: a ? ie(a, e) ?? null : null
  };
}
function Ra(e, t, n, a, s = !1) {
  const l = n?.columns ?? [];
  return {
    row: e,
    key: xs(e, t),
    entityLabel: e.entityLabel,
    entity: n,
    columns: l,
    ordinal: us(t),
    parts: Br(e, l),
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
      (n, a) => Ra(
        n,
        e.offset.value + a,
        t.value.get(n.entityKey) ?? null,
        e.isPinned(n),
        e.isSelected(n)
      )
    )
  );
}
const Hr = ["data-dc-status", "data-dc-tone"], qr = /* @__PURE__ */ K({
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
    }, L(n.value), 9, Hr));
  }
}), Ve = /* @__PURE__ */ z(qr, [["__scopeId", "data-v-686eb9b6"]]), Fr = { key: 1 }, Vr = /* @__PURE__ */ K({
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
      default: Y(() => [
        G(r.$slots, "default", {}, () => [
          te(L(l.value), 1)
        ], !0)
      ]),
      _: 3
    }, 8, ["href", "title"])) : (u(), h("span", Fr, [
      G(r.$slots, "default", {}, () => [
        te(L(l.value), 1)
      ], !0)
    ]));
  }
}), dt = /* @__PURE__ */ z(Vr, [["__scopeId", "data-v-d3e7f4e0"]]), Dr = ["data-dc-active", "aria-pressed", "aria-label"], Kr = /* @__PURE__ */ K({
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
    }, L(e.pinned ? "★" : "☆"), 9, Dr));
  }
}), wn = /* @__PURE__ */ z(Kr, [["__scopeId", "data-v-ef63d763"]]), Wr = ["src"], zr = /* @__PURE__ */ K({
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
    }, null, 40, Wr)) : T("", !0);
  }
}), Bt = /* @__PURE__ */ z(zr, [["__scopeId", "data-v-afaab300"]]), Ur = ["data-dc-standing", "title", "aria-label"], jr = /* @__PURE__ */ K({
  __name: "QueryMark",
  props: {
    entry: {}
  },
  setup(e) {
    const t = e, n = ne(), a = f(() => ct(t.entry.entity, t.entry.row)), s = f(() => gn(n.query.value.expr, a.value)), l = f(
      () => s.value === "in" ? `The query narrows to ${t.entry.parts.identity} — press to lift that` : `The query leaves out ${t.entry.parts.identity} — press to lift that`
    );
    function o(i) {
      i.stopPropagation(), n.setExpression($a(n.query.value.expr, a.value));
    }
    return (i, r) => s.value ? (u(), h("button", {
      key: 0,
      type: "button",
      class: "dc-standing",
      "data-dc-standing": s.value,
      title: l.value,
      "aria-label": l.value,
      onClick: o
    }, L(s.value === "in" ? "+" : "−"), 9, Ur)) : T("", !0);
  }
}), kn = /* @__PURE__ */ z(jr, [["__scopeId", "data-v-4b8d4166"]]), Qr = ["aria-label"], Gr = ["data-dc-standing", "data-dc-active", "aria-checked", "title", "aria-label", "onClick"], Yr = /* @__PURE__ */ K({
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
      }, L(c.sign), 9, Gr))), 128))
    ], 8, Qr));
  }
}), sn = /* @__PURE__ */ z(Yr, [["__scopeId", "data-v-5524dca6"]]), Ba = /* @__PURE__ */ K({
  __name: "RowStanding",
  props: {
    entry: {}
  },
  setup(e) {
    const t = e, n = ne(), a = f(() => ct(t.entry.entity, t.entry.row)), s = f(() => gn(n.query.value.expr, a.value));
    function l(o) {
      n.setExpression(Jt(n.query.value.expr, a.value, o));
    }
    return (o, i) => a.value !== null ? (u(), I(sn, {
      key: 0,
      class: "dc-row-standing",
      standing: s.value,
      name: e.entry.parts.identity,
      onSet: l
    }, null, 8, ["standing", "name"])) : T("", !0);
  }
}), Xr = ["href", "title", "aria-label"], Jr = /* @__PURE__ */ K({
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
    }, "↗", 8, Xr)) : T("", !0);
  }
}), ft = /* @__PURE__ */ z(Jr, [["__scopeId", "data-v-b00f390d"]]), Zr = /* @__PURE__ */ K({
  __name: "ScopeMark",
  props: {
    entry: {}
  },
  setup(e) {
    const t = e, n = ne(), a = f(
      () => n.narrowsOnPress.value ? null : t.entry.entity?.scope ?? null
    ), s = H(null);
    function l(d) {
      s.value = at(d).exclude ? "out" : "in";
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
      default: Y(() => [...v[0] || (v[0] = [
        te(" → ", -1)
      ])]),
      _: 1
    }, 8, ["href", "data-dc-pending", "title", "aria-label"])) : T("", !0);
  }
}), vt = /* @__PURE__ */ z(Zr, [["__scopeId", "data-v-05d2c233"]]), eo = ["checked", "aria-label"], Ae = /* @__PURE__ */ K({
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
    }, null, 8, eo));
  }
}), to = { class: "dc-card__top dc-mono" }, no = { class: "dc-card__lead" }, ao = {
  key: 2,
  class: "dc-card__entity"
}, so = { class: "dc-card__top-right" }, lo = { class: "dc-card__names" }, ro = { class: "dc-card__primary" }, oo = {
  key: 0,
  class: "dc-card__secondary dc-mono"
}, io = {
  key: 1,
  class: "dc-card__facts dc-mono"
}, co = ["title"], uo = { class: "dc-card__fact-label" }, fo = {
  key: 0,
  class: "dc-card__metrics dc-mono"
}, vo = {
  key: 0,
  class: "dc-card__date"
}, po = /* @__PURE__ */ K({
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
        S("div", to, [
          S("span", no, [
            w(t).selectable.value ? (u(), I(Ae, {
              key: 0,
              row: r.row,
              selected: r.selected,
              name: r.parts.identity
            }, null, 8, ["row", "selected", "name"])) : T("", !0),
            s(r) ? T("", !0) : (u(), h(D, { key: 1 }, [
              te(L(r.ordinal), 1)
            ], 64)),
            a.value ? (u(), h("span", ao, L(r.entityLabel), 1)) : T("", !0)
          ]),
          S("span", so, [
            r.parts.state && !s(r) ? (u(), I(Ve, {
              key: 0,
              status: r.parts.state
            }, null, 8, ["status"])) : T("", !0),
            s(r) ? (u(), I(kn, {
              key: 1,
              entry: r
            }, null, 8, ["entry"])) : (u(), I(Ba, {
              key: 2,
              entry: r
            }, null, 8, ["entry"])),
            U(vt, { entry: r }, null, 8, ["entry"]),
            U(ft, { entry: r }, null, 8, ["entry"]),
            w(t).pinnable.value ? (u(), I(wn, {
              key: 3,
              row: r.row,
              name: r.parts.identity,
              pinned: r.pinned
            }, null, 8, ["row", "name", "pinned"])) : T("", !0)
          ])
        ]),
        U(se, {
          class: "dc-card__open",
          href: w(t).pressHref(r.row),
          onPress: (c) => w(t).activate(r.row, c)
        }, {
          default: Y(() => [
            r.parts.image ? (u(), I(Bt, {
              key: 0,
              class: "dc-card__image",
              src: r.parts.image
            }, null, 8, ["src"])) : T("", !0),
            S("span", lo, [
              S("span", ro, L(r.parts.identity), 1),
              s(r) ? T("", !0) : (u(), h("span", oo, L(r.parts.reference), 1)),
              r.parts.facts.length ? (u(), h("span", io, [
                (u(!0), h(D, null, J(r.parts.facts, (c) => (u(), h("span", {
                  key: c.column.key ?? c.label,
                  class: "dc-card__fact",
                  title: c.title || void 0
                }, [
                  S("span", uo, L(c.label), 1),
                  te(" " + L(c.text), 1)
                ], 8, co))), 128))
              ])) : T("", !0)
            ])
          ]),
          _: 2
        }, 1032, ["href", "onPress"]),
        s(r) ? T("", !0) : (u(), h("div", fo, [
          (u(!0), h(D, null, J(r.parts.metrics.slice(0, 2), (c) => (u(), I(dt, {
            key: c.column.key ?? c.label,
            entry: r,
            column: c.column
          }, {
            default: Y(() => [
              te(L(c.label) + " " + L(c.text), 1)
            ]),
            _: 2
          }, 1032, ["entry", "column"]))), 128)),
          r.parts.updated ? (u(), h("span", vo, L(r.parts.updated), 1)) : T("", !0)
        ]))
      ], 2))), 128))
    ], 2));
  }
}), Ha = /* @__PURE__ */ z(po, [["__scopeId", "data-v-fd252138"]]), ho = { class: "dc-grid" }, mo = { class: "dc-tile__scrim" }, yo = { class: "dc-tile__top dc-mono" }, go = { class: "dc-tile__chip" }, _o = { class: "dc-tile__caption" }, wo = { class: "dc-tile__secondary dc-truncate" }, ko = { class: "dc-tile__primary" }, bo = /* @__PURE__ */ K({
  __name: "GridView",
  setup(e) {
    const t = ne(), n = Ne();
    return (a, s) => (u(), h("div", ho, [
      (u(!0), h(D, null, J(w(n), (l) => (u(), h("div", {
        key: l.key,
        class: "dc-grid__cell"
      }, [
        U(se, {
          class: "dc-tile",
          style: le({ "--dc-tile-tint": l.parts.tint ?? void 0 }),
          href: w(t).pressHref(l.row),
          onPress: (o) => w(t).activate(l.row, o)
        }, {
          default: Y(() => [
            l.parts.image ? (u(), I(Bt, {
              key: 0,
              class: "dc-tile__image",
              src: l.parts.image
            }, null, 8, ["src"])) : T("", !0),
            S("span", mo, [
              S("span", yo, [
                S("span", go, L(l.ordinal), 1)
              ]),
              S("span", _o, [
                S("span", wo, L(l.parts.reference), 1),
                S("span", ko, L(l.parts.identity), 1)
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
}), qa = /* @__PURE__ */ z(bo, [["__scopeId", "data-v-89c40a9e"]]);
function Un(e, t, n, a) {
  return (n - a * (t - 1)) / e;
}
function zt(e, t) {
  return e > 0 ? Math.min(t, e) : t;
}
function $o(e) {
  return e > 0 ? e : 1 / 0;
}
function xo(e, t, n) {
  const { width: a, height: s, gap: l = 0 } = n;
  if (!e.length) return [];
  if (!(a > 0) || !(s > 0)) return [{ items: [...e], height: s, filled: !1 }];
  const o = [];
  let i = [], r = 0, c = 0;
  for (const d of e) {
    const v = t(d), _ = Math.max(v.ratio, Number.EPSILON), y = v.height && v.height > 0 ? Math.max(c, v.height) : c, g = zt(y, s), p = Un(r + _, i.length + 1, a, l);
    if (p > g) {
      i.push(d), r += _, c = y;
      continue;
    }
    const k = zt(c, s), P = i.length ? Un(r, i.length, a, l) : 1 / 0;
    P <= $o(c) && P - k < g - p ? (o.push({ items: i, height: P, filled: !0 }), i = [d], r = _, c = v.height && v.height > 0 ? v.height : 0) : (o.push({ items: [...i, d], height: p, filled: !0 }), i = [], r = 0, c = 0);
  }
  return i.length && o.push({ items: i, height: zt(c, s), filled: !1 }), o;
}
const So = { class: "dc-images" }, Co = {
  key: 1,
  class: "dc-images__blank",
  "aria-hidden": "true"
}, Po = 240, pt = 8, Eo = 1, Mo = /* @__PURE__ */ K({
  __name: "ImagesView",
  setup(e) {
    const t = ne(), n = Ne(), a = xn(/* @__PURE__ */ new Map()), s = xn(/* @__PURE__ */ new Set());
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
      return p ? { ratio: p.width / p.height, height: p.height } : { ratio: Eo };
    }
    const c = H(null), d = H(0);
    let v = null;
    function _() {
      d.value = c.value?.clientWidth ?? 0;
    }
    ot(() => {
      _(), !(!c.value || typeof ResizeObserver > "u") && (v = new ResizeObserver(_), v.observe(c.value));
    }), ge(() => {
      v?.disconnect(), v = null;
    });
    const y = f(() => {
      const g = xo(n.value, r, {
        width: d.value,
        height: Po,
        gap: pt
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
          }), x += b + pt;
        }
        k += P.height + pt;
      }
      return { boxes: p, height: g.length ? k - pt : 0 };
    });
    return (g, p) => (u(), h("div", So, [
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
          U(se, {
            class: "dc-images__open",
            title: k.parts.identity,
            "aria-label": k.parts.identity,
            href: w(t).pressHref(k.row),
            onPress: (m) => w(t).activate(k.row, m)
          }, {
            default: Y(() => [
              o(k) ? (u(), I(Bt, {
                key: 0,
                class: "dc-images__picture",
                style: le(x),
                src: o(k),
                onLoad: (m) => l(o(k), m),
                onError: (m) => s.add(o(k))
              }, null, 8, ["style", "src", "onLoad", "onError"])) : (u(), h("span", Co, L(k.parts.identity), 1))
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
}), Fa = /* @__PURE__ */ z(Mo, [["__scopeId", "data-v-2d267370"]]), Lo = { class: "dc-links" }, To = { class: "dc-link__primary dc-truncate" }, Oo = { class: "dc-link__secondary dc-mono dc-truncate" }, No = /* @__PURE__ */ K({
  __name: "LinksView",
  setup(e) {
    const t = ne(), n = Ne();
    return (a, s) => (u(), h("div", Lo, [
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
        U(se, {
          class: "dc-link",
          href: w(t).pressHref(l.row),
          onPress: (o) => w(t).activate(l.row, o)
        }, {
          default: Y(() => [
            S("span", To, L(l.parts.identity), 1),
            S("span", Oo, L(l.parts.reference), 1)
          ]),
          _: 2
        }, 1032, ["href", "onPress"])
      ]))), 128))
    ]));
  }
}), Va = /* @__PURE__ */ z(No, [["__scopeId", "data-v-de6c9a0f"]]), Ao = {
  class: "dc-list",
  role: "list"
}, Io = { class: "dc-list__ordinal dc-mono" }, Ro = { class: "dc-list__identity" }, Bo = { class: "dc-list__primary dc-truncate" }, Ho = { class: "dc-list__secondary dc-mono dc-truncate" }, qo = {
  key: 1,
  class: "dc-list__entity dc-mono"
}, Fo = { class: "dc-list__metrics dc-mono" }, Vo = { class: "dc-list__trailing" }, Do = /* @__PURE__ */ K({
  __name: "ListView",
  setup(e) {
    const t = ne(), n = Ne(), a = f(() => t.isEverything.value);
    return (s, l) => (u(), h("div", Ao, [
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
        U(Ba, {
          class: "dc-list__standing",
          entry: o
        }, null, 8, ["entry"]),
        U(se, {
          class: "dc-list__open",
          href: w(t).pressHref(o.row),
          onPress: (i) => w(t).activate(o.row, i)
        }, {
          default: Y(() => [
            S("span", Io, L(o.ordinal), 1),
            S("span", Ro, [
              S("span", Bo, L(o.parts.identity), 1),
              S("span", Ho, L(o.parts.reference), 1)
            ])
          ]),
          _: 2
        }, 1032, ["href", "onPress"]),
        a.value ? (u(), h("span", qo, L(o.entityLabel), 1)) : T("", !0),
        S("span", Fo, [
          (u(!0), h(D, null, J(o.parts.metrics.slice(0, 2), (i) => (u(), I(dt, {
            key: i.column.key ?? i.label,
            entry: o,
            column: i.column
          }, null, 8, ["entry", "column"]))), 128))
        ]),
        S("span", Vo, [
          o.parts.state ? (u(), I(Ve, {
            key: 0,
            status: o.parts.state
          }, null, 8, ["status"])) : T("", !0),
          U(vt, { entry: o }, null, 8, ["entry"]),
          U(ft, { entry: o }, null, 8, ["entry"]),
          w(t).pinnable.value ? (u(), I(wn, {
            key: 1,
            row: o.row,
            name: o.parts.identity,
            pinned: o.pinned
          }, null, 8, ["row", "name", "pinned"])) : T("", !0)
        ])
      ]))), 128))
    ]));
  }
}), ln = /* @__PURE__ */ z(Do, [["__scopeId", "data-v-3d349a10"]]), Ko = { class: "dc-preview" }, Wo = { class: "dc-preview__pager dc-mono" }, zo = ["disabled"], Uo = { "aria-live": "polite" }, jo = ["disabled"], Qo = {
  key: 0,
  class: "dc-preview__card"
}, Go = ["src"], Yo = { class: "dc-preview__body" }, Xo = { class: "dc-preview__top" }, Jo = { class: "dc-preview__badges" }, Zo = { class: "dc-preview__entity dc-mono" }, ei = { class: "dc-preview__marks" }, ti = { class: "dc-preview__primary" }, ni = { class: "dc-preview__secondary dc-mono" }, ai = { class: "dc-preview__fields" }, si = { class: "dc-preview__key" }, li = { class: "dc-preview__value dc-mono" }, ri = /* @__PURE__ */ K({
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
    return (r, c) => (u(), h("div", Ko, [
      S("div", Wo, [
        S("button", {
          type: "button",
          class: "dc-preview__step",
          "aria-label": "Previous result",
          disabled: a.value === 0,
          onClick: c[0] || (c[0] = (d) => i(-1))
        }, " ‹ ", 8, zo),
        S("span", Uo, L(o.value), 1),
        S("button", {
          type: "button",
          class: "dc-preview__step",
          "aria-label": "Next result",
          disabled: a.value >= w(n).length - 1,
          onClick: c[1] || (c[1] = (d) => i(1))
        }, " › ", 8, jo)
      ]),
      s.value ? (u(), h("div", Qo, [
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
          }, null, 8, Go)) : (u(), h(D, { key: 1 }, [
            te(" preview ")
          ], 64))
        ], 4),
        S("div", Yo, [
          S("div", Xo, [
            S("span", Jo, [
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
              S("span", Zo, L(s.value.entityLabel), 1)
            ]),
            S("span", ei, [
              U(kn, { entry: s.value }, null, 8, ["entry"]),
              U(vt, { entry: s.value }, null, 8, ["entry"]),
              U(ft, { entry: s.value }, null, 8, ["entry"]),
              w(t).pinnable.value ? (u(), I(wn, {
                key: 0,
                row: s.value.row,
                name: s.value.parts.identity,
                pinned: s.value.pinned
              }, null, 8, ["row", "name", "pinned"])) : T("", !0)
            ])
          ]),
          S("div", null, [
            S("div", ti, L(s.value.parts.identity), 1),
            S("div", ni, L(s.value.parts.reference), 1)
          ]),
          S("dl", ai, [
            (u(!0), h(D, null, J(l.value, (d) => (u(), h("div", {
              key: d.key,
              class: "dc-preview__field"
            }, [
              S("dt", si, L(d.key), 1),
              S("dd", li, [
                d.column && s.value ? (u(), I(dt, {
                  key: 0,
                  entry: s.value,
                  column: d.column
                }, null, 8, ["entry", "column"])) : (u(), h(D, { key: 1 }, [
                  te(L(d.value), 1)
                ], 64))
              ])
            ]))), 128))
          ]),
          U(se, {
            class: "dc-preview__open",
            href: s.value ? w(t).pressHref(s.value.row) : null,
            onPress: c[2] || (c[2] = (d) => s.value && w(t).activate(s.value.row, d))
          }, {
            default: Y(() => [...c[3] || (c[3] = [
              te(" Open record → ", -1)
            ])]),
            _: 1
          }, 8, ["href"])
        ])
      ])) : T("", !0)
    ]));
  }
}), Da = /* @__PURE__ */ z(ri, [["__scopeId", "data-v-59e0d33b"]]);
function oi() {
  const e = ne();
  return f(() => bs(e.schema.value, e.entity.value));
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
function Ka(e, t) {
  const n = e.narrowsOnPress.value ? ct(t.entity, t.row) : null;
  return n ? { term: n, name: t.parts.identity } : null;
}
const ii = /* @__PURE__ */ K({
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
      return v.entity !== void 0 ? n.query.value.expr : nt(n.query.value.expr, s(v, _));
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
        U(se, qe({
          class: "dc-narrow",
          href: i(y),
          title: r(y),
          selectable: ""
        }, cn(w(bn)(w(n), c(y))), {
          onPress: (p, k) => d(y, p, k)
        }), {
          default: Y(() => [
            G(v.$slots, "default", {}, () => [
              te(L(y.label ?? a.value), 1)
            ], !0)
          ]),
          _: 2
        }, 1040, ["href", "title", "onPress"])
      ], 64))), 128))
    ], 2));
  }
}), jn = /* @__PURE__ */ z(ii, [["__scopeId", "data-v-6e649daa"]]), ci = /* @__PURE__ */ new Set(["entitykey", "entitylabel"]), ui = /* @__PURE__ */ new Set(["ordinal", "image", "component", "date"]), di = 4;
function Wa(e) {
  return (e.field ?? e.key)?.toLowerCase();
}
function za(e) {
  return e.narrow === !1 || e.role === "identity" || e.activate || e.click || e.drill ? !1 : !ui.has(e.kind ?? "text") && Wa(e) !== void 0;
}
function fi(e, t) {
  if (Number.isInteger(e)) return e;
  const n = 10 ** di;
  return (t ? Math.ceil(e * n - 1e-6) : Math.floor(e * n + 1e-6)) / n;
}
function vi(e, t) {
  let n = 1 / 0, a = -1 / 0;
  for (const s of t) {
    const l = ie(e, s);
    typeof l != "number" || !Number.isFinite(l) || (l < n && (n = l), l > a && (a = l));
  }
  return n <= a ? { min: n, max: a } : null;
}
function pi(e, t, n, a = null) {
  if (!za(e)) return [];
  const s = Wa(e);
  if (ci.has(s) && !e.value)
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
      term: { kind: "field", field: s, comparator: c ? "<=" : ">=", value: String(fi(l, c)) }
    }];
  }
  return (Array.isArray(l) ? l : [l]).filter(
    (r) => typeof r == "string" && r !== ""
  ).map((r) => ({
    label: Array.isArray(l) ? r : null,
    term: { kind: "field", field: s, comparator: "=", value: r }
  }));
}
const Qn = /* @__PURE__ */ new WeakMap();
function hi(e, t) {
  let n = Qn.get(e);
  return n || Qn.set(e, n = /* @__PURE__ */ new Map()), n.has(t) || n.set(t, vi(t, e)), n.get(t);
}
const mi = /* @__PURE__ */ K({
  __name: "ColumnCell",
  props: {
    column: {},
    entry: {}
  },
  setup(e) {
    const t = e, n = ne(), a = f(() => t.column.kind ?? "text"), s = f(() => ie(t.column, t.entry.row)), l = f(
      () => a.value === "ordinal" ? t.entry.ordinal : Te(t.column, t.entry.row)
    ), o = f(() => s.value), i = f(() => t.column.activate === !0 || !!t.column.click), r = f(() => Yt(t.column)), c = f(() => oa(t.column, t.entry.row)), d = f(() => {
      if (!za(t.column)) return [];
      const g = typeof s.value == "number" ? hi(n.rows.value, t.column) : null;
      return pi(t.column, t.entry.row, t.entry.entity ?? null, g);
    });
    function v(g) {
      i.value && (g.stopPropagation(), _(at(g)));
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
    }, null, 8, ["row", "entry", "value", "column"])) : a.value === "status" && d.value.length ? (u(), I(jn, {
      key: 1,
      entry: e.entry,
      column: e.column,
      narrowings: d.value,
      truncates: !1
    }, {
      default: Y(() => [
        U(Ve, { status: o.value }, null, 8, ["status"])
      ]),
      _: 1
    }, 8, ["entry", "column", "narrowings"])) : a.value === "status" ? (u(), I(Ve, {
      key: 2,
      status: o.value
    }, null, 8, ["status"])) : a.value === "image" ? (u(), I(Bt, {
      key: 3,
      class: "dc-cell__image",
      src: typeof s.value == "string" ? s.value : "",
      style: le({ maxHeight: e.column.height }),
      onClick: v
    }, null, 8, ["src", "style"])) : e.column.drill ? (u(), I(dt, {
      key: 4,
      entry: e.entry,
      column: e.column
    }, null, 8, ["entry", "column"])) : i.value ? (u(), I(se, qe({
      key: 5,
      class: ["dc-table__open", { "dc-truncate": r.value }],
      href: y.value,
      title: c.value
    }, cn(e.column.activate ? w(bn)(w(n), w(Ka)(w(n), e.entry)) : {}), {
      onPress: p[0] || (p[0] = (k, P) => {
        P.stopPropagation(), _(k);
      })
    }), {
      default: Y(() => [
        te(L(l.value), 1)
      ]),
      _: 1
    }, 16, ["class", "href", "title"])) : d.value.length ? (u(), I(jn, {
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
}), Gn = /* @__PURE__ */ z(mi, [["__scopeId", "data-v-4b81f005"]]), yi = {
  key: 0,
  class: "dc-table__none"
}, gi = { class: "dc-table__detail" }, _i = ["data-dc-wrap", "data-dc-row-links"], wi = {
  key: 0,
  class: "dc-table__pick",
  scope: "col"
}, ki = {
  key: 1,
  class: "dc-table__standing",
  scope: "col"
}, bi = ["data-dc-align", "data-dc-hide", "aria-sort", "title"], $i = {
  key: 2,
  class: "dc-table__head"
}, xi = ["onClick"], Si = {
  key: 0,
  class: "dc-table__pick"
}, Ci = {
  key: 1,
  class: "dc-table__standing"
}, Pi = ["data-dc-align", "data-dc-hide", "title"], Ei = {
  key: 1,
  class: "dc-table__name"
}, Mi = /* @__PURE__ */ K({
  __name: "TableView",
  setup(e) {
    const t = ne(), n = Ne(), a = oi();
    function s(M, Q) {
      if (!t.rowLinks?.value || xa()) return;
      const N = t.pressHref(M);
      if (N && en(Q)) {
        Zt(N, Q);
        return;
      }
      t.activate(M, at(Q));
    }
    const l = f(() => t.rowLinks?.value ? new Map(n.value.map((M) => [M.key, t.pressHref(M.row)])) : /* @__PURE__ */ new Map()), o = f(
      () => a.value.find((M) => M.role === "identity") ?? a.value[0]
    );
    function i(M, Q, N) {
      N.stopPropagation(), t.activate(M, Q);
    }
    function r(M) {
      const Q = fa(M, t.entity.value, t.schema.value), N = Q ? `Shortcut: ${Q}` : void 0;
      return [M.hint, N].filter(Boolean).join(`
`) || void 0;
    }
    const c = f(() => {
      const M = a.value.find((N) => N.scope);
      return M || ((t.entity.value ? !!t.entity.value.href : t.entities.value.some((N) => N.href)) ? a.value.find((N) => N.activate) : void 0);
    }), d = f(
      () => t.entity.value ? !!t.entity.value.scope : t.entities.value.some((M) => M.scope)
    ), v = (M) => ct(M.entity, M.row), _ = (M) => gn(t.query.value.expr, v(M));
    function y(M, Q) {
      t.setExpression(Jt(t.query.value.expr, v(M), Q));
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
          (Q, N) => Jt(Q, v(N), M),
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
    const X = f(() => t.entity.value?.label ?? "The result set"), q = f(() => new Set(t.sorts.value.map((M) => M.key))), V = (M) => M.sort !== void 0 && q.value.has(M.sort), j = (M) => {
      if (V(M))
        return t.query.value.sort !== M.sort ? "none" : t.query.value.dir === "desc" ? "descending" : "ascending";
    };
    function ee(M) {
      return [
        On(M),
        M.muted ? "dc-table__muted" : "",
        M.mono ? "dc-mono" : "",
        Yt(M) ? "dc-truncate" : ""
      ].filter(Boolean).join(" ");
    }
    function de(M, Q) {
      if (!(!Yt(M) || M.activate || M.click))
        return oa(M, Q.row);
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
          w(t).selectable.value ? (u(), h("th", wi, [
            U(Ia)
          ])) : T("", !0),
          d.value ? (u(), h("th", ki, [
            g.value.length ? (u(), I(sn, {
              key: 0,
              standing: k.value,
              mixed: P.value,
              name: x.value,
              onSet: m
            }, null, 8, ["standing", "mixed", "name"])) : T("", !0)
          ])) : T("", !0),
          (u(!0), h(D, null, J(w(a), (N, Z) => (u(), h("th", {
            key: w(Ln)(N, Z),
            scope: "col",
            class: oe(w(On)(N)),
            style: le({ width: N.width }),
            "data-dc-align": w(Tn)(N),
            "data-dc-hide": N.hideBelow,
            "aria-sort": j(N),
            title: r(N)
          }, [
            V(N) ? (u(), I(se, {
              key: 0,
              class: "dc-table__sort",
              href: O(N.sort),
              onPress: (fe) => E(N.sort)
            }, {
              default: Y(() => [
                te(L(N.label), 1)
              ]),
              _: 2
            }, 1032, ["href", "onPress"])) : (u(), h(D, { key: 1 }, [
              te(L(N.label), 1)
            ], 64)),
            N.header ? (u(), h("span", $i, [
              (u(), I(Ye(N.header), {
                column: N,
                entity: w(t).entity.value
              }, null, 8, ["column", "entity"]))
            ])) : T("", !0)
          ], 14, bi))), 128))
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
          w(t).selectable.value ? (u(), h("td", Si, [
            U(Ae, {
              row: N.row,
              selected: N.selected,
              name: N.parts.identity
            }, null, 8, ["row", "selected", "name"])
          ])) : T("", !0),
          d.value ? (u(), h("td", Ci, [
            v(N) !== null ? (u(), I(sn, {
              key: 0,
              standing: _(N),
              name: N.parts.identity,
              onSet: (Z) => y(N, Z)
            }, null, 8, ["standing", "name", "onSet"])) : T("", !0)
          ])) : T("", !0),
          (u(!0), h(D, null, J(w(a), (Z, fe) => (u(), h("td", {
            key: w(Ln)(Z, fe),
            class: oe(ee(Z)),
            style: le({ width: Z.width }),
            "data-dc-align": w(Tn)(Z),
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
            }, cn(w(bn)(w(t), w(Ka)(w(t), N))), {
              onPress: (Ke, We) => i(N.row, Ke, We)
            }), null, 16, ["href", "tabindex", "aria-hidden", "aria-label", "onPress"])) : T("", !0),
            Z === c.value ? (u(), h("span", Ei, [
              U(Gn, {
                column: Z,
                entry: N
              }, null, 8, ["column", "entry"]),
              U(vt, { entry: N }, null, 8, ["entry"]),
              U(ft, { entry: N }, null, 8, ["entry"])
            ])) : (u(), I(Gn, {
              key: 2,
              column: Z,
              entry: N
            }, null, 8, ["column", "entry"]))
          ], 14, Pi))), 128))
        ], 8, xi))), 128))
      ], 32)
    ], 8, _i)) : (u(), h("p", yi, [
      Q[2] || (Q[2] = S("span", { class: "dc-table__headline" }, "No columns declared", -1)),
      S("span", gi, [
        te(L(X.value) + " has no ", 1),
        Q[0] || (Q[0] = S("code", null, "columns", -1)),
        Q[1] || (Q[1] = te(" in the schema, so there is no table to draw. ", -1))
      ])
    ]));
  }
}), Ua = /* @__PURE__ */ z(Mi, [["__scopeId", "data-v-8a634047"]]);
function Li(e) {
  const t = pe([]), n = H(!1), a = pe(null);
  let s = 0;
  const l = (r, c, d, v, _) => ({
    entity: r,
    rows: e.limit.value > 0 ? c.rows.map((y, g) => Ra(y, g, r, e.isPinned(y.id))) : [],
    total: c.total,
    count: d ? Gt(r) : Xe(c.total),
    pinned: Ti(v, c, _)
  }), o = () => {
    const r = ++s, c = e.query.value, d = e.schema.value, v = e.entities.value, _ = e.limit.value, y = e.within?.value.trim() ?? "", g = dn(c) && !y, p = y ? pn(y, c.expr) : c.expr, k = v.map((P) => ({
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
function Ti(e, t, n) {
  const a = t.rows[0];
  if (t.total !== 1 || t.rows.length !== 1 || !a)
    return !1;
  const s = n.trim();
  if (!s)
    return !1;
  const l = wt(e, a);
  return !!l && ut(s, l) === s;
}
const Oi = ["data-dc-pending", "data-dc-heads-only"], Ni = {
  key: 0,
  class: "dc-types__state",
  role: "alert"
}, Ai = {
  key: 1,
  class: "dc-types__state",
  "aria-live": "polite"
}, Ii = {
  key: 2,
  class: "dc-types__state"
}, Ri = ["data-dc-empty"], Bi = { class: "dc-type__name" }, Hi = { class: "dc-type__count dc-mono" }, qi = { class: "dc-type__sr" }, Fi = {
  key: 0,
  class: "dc-type__description"
}, Vi = {
  key: 0,
  class: "dc-type__empty"
}, Di = { class: "dc-type__identity" }, Ki = { class: "dc-type__primary dc-truncate" }, Wi = { class: "dc-type__secondary dc-mono dc-truncate" }, zi = { class: "dc-type__trailing dc-mono" }, Ui = { class: "dc-type__metric-value" }, ji = { class: "dc-type__metric-label" }, Qi = {
  key: 0,
  class: "dc-type__date"
}, Gi = /* @__PURE__ */ K({
  __name: "TypeCardsView",
  setup(e) {
    const t = ne(), { previews: n, pending: a, error: s } = Li({
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
      G(r.$slots, "before", {}, void 0, !0),
      w(s) ? (u(), h("p", Ni, " Could not load results: " + L(w(s) instanceof Error ? w(s).message : "the data source failed."), 1)) : !i.value.length && w(a) ? (u(), h("p", Ai, " Running query… ")) : i.value.length ? T("", !0) : (u(), h("p", Ii, L(l.value ? "Nothing matches this query" : "Nothing here yet"), 1)),
      (u(!0), h(D, null, J(i.value, (d) => (u(), h("section", {
        key: d.entity.key,
        class: "dc-type",
        "data-dc-empty": d.total ? "false" : "true"
      }, [
        U(se, {
          class: "dc-type__head",
          href: w(t).entityHref(d.entity.key),
          onPress: (v) => w(t).setEntity(d.entity.key)
        }, {
          default: Y(() => [
            S("span", Bi, L(d.entity.label), 1),
            S("span", Hi, L(d.count), 1),
            c[0] || (c[0] = S("span", {
              class: "dc-type__go",
              "aria-hidden": "true"
            }, "→", -1)),
            S("span", qi, "Show only " + L(d.entity.label.toLowerCase()), 1),
            d.entity.description ? (u(), h("span", Fi, L(d.entity.description), 1)) : T("", !0)
          ]),
          _: 2
        }, 1032, ["href", "onPress"]),
        d.total ? T("", !0) : (u(), h("p", Vi, L(l.value ? "No matches" : "Nothing here yet"), 1)),
        (u(!0), h(D, null, J(d.rows, (v) => (u(), h("div", {
          key: v.key,
          class: "dc-type__row"
        }, [
          U(se, {
            class: "dc-type__open",
            href: w(t).pressHref(v.row),
            onPress: (_) => w(t).activate(v.row, _)
          }, {
            default: Y(() => [
              S("span", Di, [
                S("span", Ki, L(v.parts.identity), 1),
                S("span", Wi, L(v.parts.reference), 1)
              ])
            ]),
            _: 2
          }, 1032, ["href", "onPress"]),
          S("span", zi, [
            (u(!0), h(D, null, J(v.parts.metrics.slice(0, 1), (_) => (u(), I(dt, {
              key: _.column.key ?? _.label,
              class: "dc-type__metric",
              entry: v,
              column: _.column
            }, {
              default: Y(() => [
                S("span", Ui, L(_.text), 1),
                S("span", ji, L(_.label), 1)
              ]),
              _: 2
            }, 1032, ["entry", "column"]))), 128)),
            v.parts.updated ? (u(), h("span", Qi, L(v.parts.updated), 1)) : T("", !0),
            U(kn, { entry: v }, null, 8, ["entry"]),
            U(vt, { entry: v }, null, 8, ["entry"]),
            U(ft, { entry: v }, null, 8, ["entry"])
          ])
        ]))), 128)),
        d.entity.create && !o.value ? (u(), I(se, {
          key: 1,
          class: "dc-type__new",
          href: w(t).createHref?.(d.entity),
          onPress: (v) => w(t).create(d.entity)
        }, {
          default: Y(() => [
            c[1] || (c[1] = S("span", {
              class: "dc-type__plus",
              "aria-hidden": "true"
            }, "+", -1)),
            te(" " + L(d.entity.create), 1)
          ]),
          _: 2
        }, 1032, ["href", "onPress"])) : T("", !0)
      ], 8, Ri))), 128)),
      G(r.$slots, "after", {}, void 0, !0)
    ], 8, Oi));
  }
}), ja = /* @__PURE__ */ z(Gi, [["__scopeId", "data-v-d73c6777"]]), Yi = ["data-dc-pending", "data-dc-more"], Xi = {
  key: 0,
  class: "dc-results__state dc-results__state--loading",
  "aria-live": "polite"
}, Ji = {
  key: 3,
  class: "dc-results__state",
  role: "alert"
}, Zi = { class: "dc-results__detail" }, ec = {
  key: 4,
  class: "dc-results__state",
  "aria-live": "polite"
}, tc = {
  key: 5,
  class: "dc-results__state"
}, nc = { class: "dc-results__detail" }, ac = /* @__PURE__ */ K({
  __name: "ResultsArea",
  props: {
    views: {},
    loading: { type: Boolean }
  },
  setup(e) {
    const t = e, n = ne(), a = Pt(), s = {
      list: ln,
      cards: Ha,
      grid: qa,
      images: Fa,
      table: Ua,
      links: Va,
      preview: Da
    }, l = f(() => la(n.query.value, t.views)), o = f(() => Fe(n.query.value.view, t.views)), i = f(() => (o.value === "record" ? null : s[o.value]) ?? ln), r = f(() => o.value === "record" ? n.recordView.value : null), c = f(() => n.rows.value.length > 0), d = f(() => n.error.value !== null), v = H(null);
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
      e.loading ? (u(), h("p", Xi, [...b[1] || (b[1] = [
        S("span", { class: "dc-results__detail" }, "Loading…", -1)
      ])])) : l.value ? (u(), I(ja, { key: 1 }, jt({ _: 2 }, [
        a["cards-before"] ? {
          name: "before",
          fn: Y(() => [
            G(m.$slots, "cards-before", {}, void 0, !0)
          ]),
          key: "0"
        } : void 0,
        a["cards-after"] ? {
          name: "after",
          fn: Y(() => [
            G(m.$slots, "cards-after", {}, void 0, !0)
          ]),
          key: "1"
        } : void 0
      ]), 1024)) : r.value?.id ? (u(), I(Ye(r.value.component), {
        key: 2,
        id: r.value.id
      }, null, 8, ["id"])) : d.value ? (u(), h("p", Ji, [
        b[2] || (b[2] = S("span", { class: "dc-results__headline" }, "Could not load results", -1)),
        S("span", Zi, L(w(n).error.value instanceof Error ? w(n).error.value.message : "The data source failed."), 1)
      ])) : !c.value && w(n).pending.value ? (u(), h("p", ec, [...b[3] || (b[3] = [
        S("span", { class: "dc-results__detail" }, "Running query…", -1)
      ])])) : c.value ? (u(), I(Ye(i.value), { key: 6 })) : (u(), h("div", tc, [
        b[4] || (b[4] = S("span", { class: "dc-results__headline" }, "Nothing matches this query", -1)),
        S("span", nc, L(w(n).summary.value), 1),
        w(n).isPristine.value ? T("", !0) : (u(), I(se, {
          key: 0,
          class: "dc-results__clear",
          href: w(n).clearHref(),
          onPress: b[0] || (b[0] = (E) => w(n).clearFilters())
        }, {
          default: Y(() => [
            te(L(w(n).isEverything.value ? "Clear filters" : "Search everything instead"), 1)
          ]),
          _: 1
        }, 8, ["href"]))
      ]))
    ], 12, Yi));
  }
}), Qa = /* @__PURE__ */ z(ac, [["__scopeId", "data-v-4484c328"]]), sc = ["data-dc-theme", "data-dc-value-press"], lc = {
  key: 0,
  class: "dc-shell__page"
}, rc = /* @__PURE__ */ K({
  __name: "DataShell",
  props: /* @__PURE__ */ Cn({
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
  emits: /* @__PURE__ */ Cn(["activate", "create", "duplicate", "delete", "operate", "drill", "query-change", "toggle-pin"], ["update:pinned", "update:selected"]),
  setup(e, { expose: t, emit: n }) {
    const a = e, s = n, l = Sn(e, "pinned"), o = Sn(e, "selected"), i = Pt(), r = rn(ea, null), c = a.route || r ? null : ls(), d = a.route ?? r ?? c;
    ge(() => c?.dispose?.());
    const v = H(!!i.page);
    Ja(() => {
      v.value = !!i.page;
    });
    const _ = rs(d, {
      detached: () => v.value && a.pageQuery === "detached",
      path: () => a.listPath
    }), y = f(() => Zs({ seed: a.schema.key })), g = f(() => a.source ?? y.value), p = _l({
      schema: () => a.schema,
      adapter: _,
      defaults: () => a.defaults,
      navigationMode: () => a.navigationMode,
      facetNavigationMode: () => a.facetNavigationMode
    }), k = f(() => a.within?.trim() ?? ""), P = $l({
      query: p.query,
      entity: p.entity,
      schema: f(() => a.schema),
      setExpression: p.setExpression
    });
    ae(p.query, ($) => s("query-change", $));
    const x = f(() => ol(a.schema, [p.query.value.expr])), m = f(
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
      return E.value || O.value ? [...(R ?? un).filter((W) => W !== "record"), "record"] : R?.filter((W) => W !== "record");
    }), q = f(
      () => O.value !== null && Fe(p.query.value.view, X.value) === "record"
    ), V = f(() => q.value ? 1 : a.limit), j = wl({
      source: g,
      query: P.live,
      schema: f(() => a.schema),
      entity: p.entity,
      limit: V,
      within: k
    }), ee = kl({
      // Not before the data has landed: what is there until then is no place to hold.
      active: f(() => q.value && !a.loading),
      rows: j.rows,
      pending: j.pending,
      page: f(() => P.live.value.page),
      list: f(() => {
        const { entity: $, expr: R, sort: W, dir: he } = P.live.value;
        return JSON.stringify([$, R, W, he]);
      }),
      locate: j.locate,
      moveTo: ($) => {
        P.drafting.value ? P.setPage($) : p.setPage($, "replace");
      }
    }), de = f(() => j.pageCount.value + (ee.gone.value ? 1 : 0)), ce = f(() => {
      if (E.value) return E.value;
      const $ = O.value;
      return $ ? { ...$, id: ee.id.value ?? j.rows.value[0]?.id ?? null } : null;
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
      const R = j.rows.value.indexOf($);
      return R === -1 ? null : j.offset.value + R + 1;
    }
    ae(
      [de, j.pending, p.query, P.drafting, () => a.loading, v, ee.holding],
      () => {
        if (j.pending.value || P.drafting.value || a.loading || v.value) return;
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
      for (const W of j.rows.value)
        $ ? R.add(W.id) : R.delete(W.id);
      o.value = [...R];
    }
    function Ie() {
      o.value.length && (o.value = []);
    }
    const be = f(() => ({
      ids: [...o.value],
      rows: j.rows.value.filter(($) => fe.value.has($.id)),
      entity: p.entity.value
    }));
    ae(() => p.query.value.entity, Ie);
    function $e($, R, W = {}) {
      const he = Wt(a.schema, p.query.value, $, W);
      W.exclude ? p.narrow(he, R?.key ?? p.query.value.entity) : P.release(() => p.narrow(he, R?.key ?? null, R ? void 0 : "cards")), s("drill", $, R, W);
    }
    function xe($) {
      return a.rowPress === "narrow" && wt(a.schema, $) !== null;
    }
    function C($) {
      return a.schema.entities.find((W) => W.key === $.entityKey)?.href?.($) || null;
    }
    const A = pe(null);
    ae(p.query, () => {
      A.value = null;
    });
    const B = il({
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
      rows: j.rows,
      total: j.total,
      limit: V,
      offset: j.offset,
      pageCount: de,
      pending: j.pending,
      counting: j.counting,
      error: j.error,
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
        if (xe($)) return p.narrowHref(Wt(a.schema, p.query.value, $), null, "cards");
        const R = M($);
        return R !== null ? p.hrefFor({ view: "record", page: R }) : C($) ?? a.activateHref?.($) ?? null;
      },
      recordHref: C,
      drillHref: ($, R) => wt(a.schema, $) ? p.narrowHref(
        Wt(a.schema, p.query.value, $),
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
    dl({ theme: () => a.theme, accent: () => a.accent, tokens: () => a.tokens });
    const F = f(() => {
      if (!(!a.accent && !a.tokens))
        return { ...a.tokens, ...a.accent ? { "--dc-accent": a.accent } : {} };
    }), Re = H(null), Be = H(0);
    let qt = null;
    ot(() => {
      const $ = Re.value;
      $ && (Be.value = $.getBoundingClientRect().width, !(typeof ResizeObserver > "u") && (qt = new ResizeObserver(([R]) => {
        Be.value = R.contentRect.width;
      }), qt.observe($)));
    }), ge(() => qt?.disconnect());
    const Ft = f(() => a.oneStripFrom !== !1 && Be.value >= a.oneStripFrom), $n = f(() => ({
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
        class: oe(["dc-shell__head", { "dc-shell__head--one-strip": Ft.value }])
      }, [
        U(Aa, null, jt({ _: 2 }, [
          i.page ? void 0 : {
            name: "lead",
            fn: Y(() => [
              U(Ar, {
                views: X.value,
                "type-chooser": e.typeChooser
              }, null, 8, ["views", "type-chooser"])
            ]),
            key: "0"
          },
          i.brand ? {
            name: "brand",
            fn: Y((W) => [
              G($.$slots, "brand", Vt(Za(W)), void 0, !0)
            ]),
            key: "1"
          } : void 0,
          i.actions ? {
            name: "actions",
            fn: Y(() => [
              G($.$slots, "actions", {}, void 0, !0)
            ]),
            key: "2"
          } : void 0
        ]), 1024),
        Ft.value && !i.page ? (u(), I(an, Vt(qe({ key: 0 }, $n.value)), null, 16)) : T("", !0)
      ], 2),
      i.page ? (u(), h("div", lc, [
        G($.$slots, "page", {
          query: w(B).query.value
        }, void 0, !0)
      ])) : T("", !0),
      !Ft.value && !i.page ? (u(), I(an, Vt(qe({ key: 1 }, $n.value)), null, 16)) : T("", !0),
      i.page ? T("", !0) : G($.$slots, "results", {
        rows: w(B).rows.value,
        total: w(B).total.value,
        offset: w(B).offset.value,
        pageCount: w(B).pageCount.value,
        query: w(B).liveQuery.value,
        pending: w(B).pending.value,
        loading: e.loading
      }, () => [
        U(Qa, {
          views: X.value,
          loading: e.loading
        }, jt({ _: 2 }, [
          i["cards-before"] || b().length ? {
            name: "cards-before",
            fn: Y(() => [
              (u(!0), h(D, null, J(b(), (W) => (u(), h(D, {
                key: `${W.entityKey}:${W.id}`
              }, [
                i.record ? G($.$slots, "record", {
                  id: W.id,
                  entity: W.entity
                }, void 0, !0, 0) : (u(), I(Ye(e.recordCards?.[W.entityKey]), {
                  key: 1,
                  id: W.id
                }, null, 8, ["id"]))
              ], 64))), 128)),
              G($.$slots, "cards-before", {}, void 0, !0)
            ]),
            key: "0"
          } : void 0,
          i["cards-after"] ? {
            name: "cards-after",
            fn: Y(() => [
              G($.$slots, "cards-after", {}, void 0, !0)
            ]),
            key: "1"
          } : void 0
        ]), 1032, ["views", "loading"])
      ], !0, 2)
    ], 12, sc));
  }
}), oc = /* @__PURE__ */ z(rc, [["__scopeId", "data-v-896dc5a8"]]), ic = ["data-dc-muted", "data-dc-collapsed"], cc = ["data-dc-collapsible"], uc = ["aria-expanded", "aria-controls"], dc = { class: "dc-shell-card__sr" }, fc = {
  key: 0,
  class: "dc-shell-card__identity"
}, vc = { class: "dc-shell-card__title dc-shell-card__name" }, pc = {
  key: 0,
  class: "dc-shell-card__ref dc-mono"
}, hc = {
  key: 1,
  class: "dc-shell-card__title"
}, mc = {
  key: 2,
  class: "dc-shell-card__count dc-mono"
}, yc = {
  key: 1,
  class: "dc-shell-card__aside"
}, gc = ["data-dc-flush"], _c = /* @__PURE__ */ K({
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
    const n = e, a = t, s = H(n.defaultCollapsed === !0), l = f(() => n.span === "all" ? { gridColumn: "1 / -1" } : void 0), o = Pt();
    function i(q) {
      return r(q?.() ?? []);
    }
    function r(q) {
      return q.some((V) => V.type === es ? !1 : V.type === ts ? String(V.children ?? "").trim().length > 0 : V.type === D ? r(V.children ?? []) : !0);
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
    const P = Et() ?? "dc-shell-card", x = `${P}-body`, m = `${P}-foot`, b = f(
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
          S("span", dc, L(e.name || e.title || "Card"), 1)
        ], 8, uc)) : T("", !0),
        G(q.$slots, "head", {}, () => [
          e.name ? (u(), h("div", fc, [
            S("h2", vc, L(e.name), 1),
            y.value ? (u(), h("span", pc, [
              G(q.$slots, "reference", {}, () => [
                te(L(e.reference), 1)
              ], !0)
            ])) : T("", !0)
          ])) : (u(), h("h2", hc, L(e.title), 1)),
          e.count !== void 0 ? (u(), h("span", mc, L(e.count), 1)) : T("", !0)
        ], !0),
        d.value ? (u(), h("span", yc, [
          G(q.$slots, "aside", {}, void 0, !0)
        ])) : T("", !0)
      ], 8, cc)) : T("", !0),
      v.value ? Ut((u(), h("div", {
        key: 1,
        id: x,
        class: "dc-shell-card__body",
        "data-dc-flush": e.flush ? "true" : "false"
      }, [
        G(q.$slots, "default", {}, void 0, !0)
      ], 8, gc)), [
        [Pn, !p.value]
      ]) : T("", !0),
      _.value ? Ut((u(), h("footer", {
        key: 2,
        id: m,
        class: "dc-shell-card__foot"
      }, [
        G(q.$slots, "foot", {}, void 0, !0)
      ], 512)), [
        [Pn, !p.value]
      ]) : T("", !0)
    ], 12, ic));
  }
}), _u = /* @__PURE__ */ z(_c, [["__scopeId", "data-v-073304c8"]]), wc = ["aria-label"], kc = ["aria-checked", "data-dc-active", "tabindex", "onClick", "onKeydown"], bc = /* @__PURE__ */ K({
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
      }, L(r.label), 43, kc))), 128))
    ], 8, wc));
  }
}), $c = /* @__PURE__ */ z(bc, [["__scopeId", "data-v-63fb5482"]]), xc = { class: "dc-fact__label" }, Sc = ["title"], Cc = /* @__PURE__ */ K({
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
      S("dt", xc, [
        G(s.$slots, "label", {}, () => [
          te(L(e.label), 1)
        ], !0)
      ]),
      S("dd", {
        class: "dc-fact__value dc-mono",
        title: e.title
      }, [
        G(s.$slots, "default", {}, () => [
          n.value.length === 1 ? (u(), h(D, { key: 0 }, [
            te(L(n.value[0]), 1)
          ], 64)) : (u(!0), h(D, { key: 1 }, J(n.value, (o, i) => (u(), h("span", {
            key: i,
            class: "dc-fact__line"
          }, L(o), 1))), 128))
        ], !0)
      ], 8, Sc)
    ], 4));
  }
}), Pc = /* @__PURE__ */ z(Cc, [["__scopeId", "data-v-1f6d25e6"]]), Ec = /* @__PURE__ */ K({
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
      (u(!0), h(D, null, J(e.items, (l, o) => (u(), I(Pc, {
        key: `${o}:${l.label}`,
        label: l.label,
        value: l.value,
        title: l.title,
        wide: l.wide
      }, null, 8, ["label", "value", "title", "wide"]))), 128)),
      G(a.$slots, "default", {}, void 0, !0)
    ], 4));
  }
}), wu = /* @__PURE__ */ z(Ec, [["__scopeId", "data-v-17455afa"]]), Mc = { class: "dc-counts" }, Lc = ["data-dc-tone"], Tc = {
  key: 0,
  class: "dc-counts__empty"
}, Oc = /* @__PURE__ */ K({
  __name: "StatusCounts",
  props: {
    counts: {},
    empty: { default: _e }
  },
  setup(e) {
    const t = e, n = f(() => t.counts.filter((a) => a.count > 0));
    return (a, s) => (u(), h("span", Mc, [
      (u(!0), h(D, null, J(n.value, (l) => (u(), h("span", {
        key: l.label,
        class: "dc-counts__count",
        "data-dc-tone": l.tone ?? "neutral"
      }, L(l.count) + " " + L(l.label), 9, Lc))), 128)),
      n.value.length === 0 ? (u(), h("span", Tc, L(e.empty), 1)) : T("", !0)
    ]));
  }
}), ku = /* @__PURE__ */ z(Oc, [["__scopeId", "data-v-5553a9e2"]]), Nc = ["data-dc-copied", "title", "aria-label"], Ac = {
  key: 0,
  class: "dc-copy__mark",
  viewBox: "0 0 16 16",
  "aria-hidden": "true"
}, Ic = {
  key: 1,
  class: "dc-copy__mark",
  viewBox: "0 0 16 16",
  "aria-hidden": "true"
}, Rc = 1500, Bc = /* @__PURE__ */ K({
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
      }, Rc), a("copied", i);
    }
    return ge(() => clearTimeout(l)), (i, r) => (u(), h("button", {
      type: "button",
      class: "dc-copy",
      "data-dc-copied": s.value ? "true" : "false",
      title: s.value ? "Copied" : e.label,
      "aria-label": e.label,
      onClick: o
    }, [
      s.value ? (u(), h("svg", Ic, [...r[1] || (r[1] = [
        S("path", { d: "M3 8.5l3.2 3L13 4.5" }, null, -1)
      ])])) : (u(), h("svg", Ac, [...r[0] || (r[0] = [
        S("rect", {
          x: "5.5",
          y: "5.5",
          width: "8",
          height: "9",
          rx: "1.5"
        }, null, -1),
        S("path", { d: "M10.5 3.5v-1a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h1" }, null, -1)
      ])]))
    ], 8, Nc));
  }
}), Hc = /* @__PURE__ */ z(Bc, [["__scopeId", "data-v-f4249d7f"]]), qc = ["data-dc-copy", "data-dc-wrap", "data-dc-tone"], Fc = /* @__PURE__ */ K({
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
        G(i.$slots, "default", {}, () => [
          te(L(e.code), 1)
        ], !0)
      ], 4),
      e.copy ? (u(), I(Hc, {
        key: 0,
        class: "dc-code__copy",
        text: o,
        label: e.copyLabel,
        onCopied: r[0] || (r[0] = (c) => a("copied", c)),
        onError: r[1] || (r[1] = (c) => a("error", c))
      }, null, 8, ["label"])) : T("", !0)
    ], 8, qc));
  }
}), bu = /* @__PURE__ */ z(Fc, [["__scopeId", "data-v-67b371dd"]]), Vc = 24, Dc = /* @__PURE__ */ K({
  __name: "ShellLog",
  props: {
    fetchChunk: {},
    stripAnsi: { type: Boolean },
    maxHeight: { default: "460px" }
  },
  setup(e, { expose: t }) {
    const n = e, a = H(""), s = f(() => n.stripAnsi ? hs(a.value) : a.value), l = H(null);
    let o = 0, i = null;
    function r() {
      return i ??= c().finally(() => {
        i = null;
      }), i;
    }
    async function c() {
      const { chunk: _, offset: y } = await n.fetchChunk(o);
      if (o = y, !_) return;
      const g = l.value, p = !g || g.scrollTop + g.clientHeight >= g.scrollHeight - Vc;
      a.value += _, p && (await Ge(), l.value && (l.value.scrollTop = l.value.scrollHeight));
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
}), $u = /* @__PURE__ */ z(Dc, [["__scopeId", "data-v-2c86947e"]]), Kc = ["data-dc-theme"], Wc = ["aria-labelledby", "aria-label"], zc = {
  key: 1,
  class: "dc-dialog__actions"
}, Ue = [], Uc = /* @__PURE__ */ K({
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
    const n = e, a = t, { theme: s, style: l, adopt: o } = _n(n), i = `${Et() ?? "dc-dialog"}-title`, r = H(null);
    function c() {
      a("close"), a("update:open", !1);
    }
    const d = Symbol("dc-dialog");
    function v(m) {
      m.key !== "Escape" || m.defaultPrevented || Ue[Ue.length - 1] === d && (m.preventDefault(), c());
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
      Ue.push(d), document.addEventListener("keydown", v), k = document.activeElement instanceof HTMLElement ? document.activeElement : null, o(), await Ge(), (r.value?.querySelector("[autofocus]") ?? r.value?.querySelector(p) ?? r.value)?.focus();
    }
    function x() {
      const m = Ue.indexOf(d);
      m !== -1 && (Ue.splice(m, 1), document.removeEventListener("keydown", v), k?.isConnected && k.focus(), k = null);
    }
    return ot(() => {
      n.open && P();
    }), ae(
      () => n.open,
      (m) => {
        m ? P() : x();
      }
    ), ge(x), (m, b) => e.open ? (u(), I(Ct, {
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
            G(m.$slots, "default", {}, void 0, !0)
          ], 2),
          m.$slots.actions ? (u(), h("div", zc, [
            G(m.$slots, "actions", {}, void 0, !0)
          ])) : T("", !0)
        ], 10, Wc)
      ], 44, Kc)
    ], 8, ["to"])) : T("", !0);
  }
}), xu = /* @__PURE__ */ z(Uc, [["__scopeId", "data-v-0cccf313"]]), jc = 4500, Qc = 9e3, rt = H([]);
let Yn = 0;
function Ga(e) {
  rt.value = rt.value.filter((t) => t.id !== e);
}
function Ya(e, t = "ok") {
  Yn += 1;
  const n = Yn;
  rt.value = [...rt.value, { id: n, message: e, kind: t }], setTimeout(() => Ga(n), t === "err" ? Qc : jc);
}
function Gc(e) {
  Ya(e instanceof Error ? e.message : String(e), "err");
}
function Yc() {
  return { toasts: ns(rt), toast: Ya, toastError: Gc, dismiss: Ga };
}
const Xc = ["data-dc-theme"], Jc = ["data-dc-kind", "role"], Zc = /* @__PURE__ */ K({
  __name: "ShellToasts",
  props: {
    to: { default: "body" },
    theme: { default: void 0 },
    accent: { default: void 0 },
    tokens: { default: void 0 }
  },
  setup(e) {
    const t = e, { toasts: n } = Yc(), { theme: a, style: s, adopt: l } = _n(t);
    return ot(l), (o, i) => (u(), I(Ct, { to: e.to }, [
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
        }, L(r.message), 9, Jc))), 128))
      ], 12, Xc)
    ], 8, ["to"]));
  }
}), Su = /* @__PURE__ */ z(Zc, [["__scopeId", "data-v-d970211c"]]);
function Cu(e, t) {
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
  return St(() => {
    s = !0, o();
  }, !0), { start: c, stop: o, polling: n };
}
function Pu(e, t = {}) {
  const n = t.key ?? ((l) => JSON.stringify(l)), a = pe();
  let s = null;
  return as(() => {
    const l = e(), o = n(l);
    o !== s && (s = o, a.value = l);
  }), a;
}
function Eu(e = {}) {
  return { key: "ordinal", kind: "ordinal", label: "#", width: "52px", ...e };
}
function Mu(e = {}) {
  return { key: "status", role: "state", kind: "status", label: "State", sort: "state", width: "104px", ...e };
}
function Lu(e = {}) {
  return { key: "tint", role: "tint", ...e };
}
function Tu(e = {}) {
  return { key: "picture", role: "image", kind: "image", width: "56px", height: "40px", ...e };
}
function Ou(e, t = {}) {
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
function Nu(e, t = {}) {
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
function Au(e, t, n = {}) {
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
function Iu(e, t, n = {}) {
  return { key: e, kind: "date", label: t, sort: e, width: "104px", mono: !0, muted: !0, ...n };
}
function Ru(e = {}) {
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
function Bu(e, t, n = {}) {
  return { key: e, label: t, sort: e, truncate: !0, hideBelow: 900, ...n };
}
function Hu(e, t, n, a = {}) {
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
function Ht(e) {
  return typeof e == "number" ? e : typeof e == "string" && e.trim() !== "" ? Number(e) : Number.NaN;
}
function qu(e) {
  const t = Ht(e);
  return Number.isFinite(t) && t > 0 ? ds(t) : _e;
}
function Fu(e) {
  const t = Ht(e);
  return Number.isFinite(t) && t > 0 ? fs(t) : _e;
}
function Vu(e) {
  const t = Ht(e);
  return Number.isFinite(t) && t > 0 ? vs(t) : _e;
}
function Du(e) {
  const t = Ht(e);
  return Number.isFinite(t) ? ps(t) : _e;
}
function eu(e) {
  if (e <= 0) return 0;
  const t = 10 ** Math.floor(Math.log10(e));
  for (const n of [1, 2, 5])
    if (e <= n * t) return n * t;
  return 10 * t;
}
function tu(e, t) {
  const n = /* @__PURE__ */ new Set();
  for (const a of e) {
    const s = a.fields[t];
    for (const l of Array.isArray(s) ? s : [s])
      typeof l == "string" && l && n.add(l);
  }
  return [...n].sort((a, s) => a.localeCompare(s));
}
function nu(e, t) {
  let n = 0;
  for (const a of e) {
    const s = a.fields[t];
    typeof s == "number" && s > n && (n = s);
  }
  return n;
}
function Ku(e, t, n, a = {}) {
  return {
    kind: "chips",
    key: t,
    label: n,
    options: tu(e, t),
    ...a.multiple ? { multiple: !0 } : {}
  };
}
function Wu(e, t, n) {
  return { kind: "range", key: t, label: n, min: 0, max: eu(nu(e, t)) };
}
function zu(e, t, n) {
  return { kind: "toggle", key: e, label: t, text: n };
}
function Uu(e) {
  return e.filter((t) => t.kind === "chips" ? t.options.length > 1 : t.kind === "range" ? t.max > 0 : !0);
}
function ju(e = "", t = "/") {
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
function Xn(e) {
  const t = e.indexOf("?");
  if (t === -1) return "";
  const n = e.slice(t), a = n.indexOf("#");
  return ue(a === -1 ? n : n.slice(0, a));
}
function Qu(e) {
  const t = H(Xn(e.currentRoute.value.fullPath)), n = f(() => e.currentRoute.value.path), a = ae(
    () => e.currentRoute.value.fullPath,
    (s) => {
      t.value = Xn(s);
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
function Gu(e, t, n = "/") {
  return (a) => {
    const s = a.params[t], l = Array.isArray(s) ? s.join("/") : s ?? "", o = a.query[Oe], i = typeof o == "string" ? o : "", r = `${e}="${l.replace(/"/g, "")}"`;
    return { path: n, query: { ...a.query, [Oe]: ut(i, r) } };
  };
}
function Yu(e, t = "/") {
  return (n) => ({ path: t, query: { ...n.query, [De]: e } });
}
function Xu(e) {
  const t = /* @__PURE__ */ new Map();
  for (const n of e) {
    const a = t.get(n.entityKey);
    a ? a.push(n) : t.set(n.entityKey, [n]);
  }
  return {
    query(n) {
      return ma(n, (a) => t.get(a.key) ?? [], {
        undatedLast: !0,
        zeroIsAll: !0
      });
    }
  };
}
function Ju(e, t) {
  return e.query({ ...t, limit: Number.MAX_SAFE_INTEGER, offset: 0 }).rows;
}
const au = {
  DataShell: oc,
  ShellHeader: Aa,
  RecordActions: an,
  ResultsArea: Qa,
  SegmentedControl: $c,
  StatusPill: Ve,
  ListView: ln,
  CardsView: Ha,
  GridView: qa,
  ImagesView: Fa,
  TableView: Ua,
  LinksView: Va,
  PreviewView: Da,
  TypeCardsView: ja
}, Zu = {
  install(e, t = {}) {
    const n = t.prefix ?? "";
    for (const [a, s] of Object.entries(au))
      e.component(`${n}${a}`, s);
    t.route && e.provide(ea, t.route), (t.theme || t.accent || t.tokens) && ul({ theme: t.theme, accent: t.accent, tokens: t.tokens }, e);
  }
};
export {
  iu as COLUMN_BREAKPOINTS,
  ou as COLUMN_ROLES,
  Ha as CardsView,
  Gn as ColumnCell,
  Hc as CopyButton,
  ms as DEFAULT_ENTITY_VIEW,
  Qt as DEFAULT_SORT,
  ta as DEFAULT_VIEW,
  bl as DRAFT_DELAY,
  oc as DataShell,
  _e as EMPTY_CELL,
  ga as ENTITY_ALL,
  bt as ENTITY_TERM,
  lt as EXPRESSION_TERM,
  qa as GridView,
  Zu as HeaderContentLayoutPlugin,
  Fa as ImagesView,
  Va as LinksView,
  ln as ListView,
  yt as MOCK_TINTS,
  dt as MetricDrill,
  ft as OpenMark,
  mn as PARAM_DIR,
  De as PARAM_ENTITY,
  Oe as PARAM_EXPR,
  At as PARAM_PAGE,
  hn as PARAM_SORT,
  Nt as PARAM_VIEW,
  ru as PILL_TONES,
  Ml as POPOVER_FLIP_BELOW,
  Pl as POPOVER_GAP,
  El as POPOVER_MARGIN,
  wn as PinStar,
  Da as PreviewView,
  kn as QueryMark,
  je as RECORD_STATUSES,
  fn as RESULT_FIELDS,
  ea as ROUTE_ADAPTER_KEY,
  an as RecordActions,
  Ar as RecordChoosers,
  Qa as ResultsArea,
  Ea as SHELL_CONTEXT_KEY,
  kt as SHELL_THEME_KEY,
  vt as ScopeMark,
  $c as SegmentedControl,
  Ae as SelectTick,
  _u as ShellCard,
  bu as ShellCode,
  xu as ShellDialog,
  Pc as ShellFact,
  wu as ShellFacts,
  Aa as ShellHeader,
  $u as ShellLog,
  _r as ShellPager,
  Nl as ShellPopover,
  Su as ShellToasts,
  sn as StandingControl,
  ku as StatusCounts,
  Ve as StatusPill,
  Qc as TOAST_ERROR_MS,
  jc as TOAST_MS,
  Ua as TableView,
  ja as TypeCardsView,
  ys as VIEW_ICONS,
  un as VIEW_KINDS,
  Mn as VIEW_LABELS,
  ut as addTerm,
  pn as andExpression,
  qu as bytesCell,
  oa as cellFull,
  pi as cellNarrowings,
  Te as cellText,
  ht as cellTextOf,
  ie as cellValue,
  Dt as changesResults,
  Ku as chipsFrom,
  Tn as columnAlign,
  On as columnClass,
  Ln as columnKey,
  za as columnNarrows,
  it as columnShortcut,
  fa as columnShortcutOf,
  Yt as columnTruncates,
  bs as columnsFor,
  ca as compactShortcuts,
  Vl as completeDraft,
  ks as countPages,
  ls as createHistoryAdapter,
  ju as createMemoryAdapter,
  Xu as createMemoryDataSource,
  Zs as createMockDataSource,
  Qu as createVueRouterAdapter,
  Iu as dateColumn,
  Ss as defaultCellText,
  mt as defaultQuery,
  Je as defaultViewFor,
  rs as detachableAdapter,
  Wt as drillExpression,
  Fu as durationCell,
  Vu as elapsedCell,
  _s as emptyFacetValue,
  al as entityAddress,
  Ru as entityColumn,
  Gt as entityCount,
  Yu as entityRedirect,
  ba as excludingTerm,
  tt as expandShortcuts,
  Bu as facetColumn,
  st as facetField,
  Ta as facetValue,
  As as fieldHeading,
  ka as fieldTerm,
  Ze as findEntity,
  _a as findEntityByAddress,
  Ce as findSort,
  Hu as flagColumn,
  Qe as fnv1a,
  aa as focusEntity,
  ds as formatBytes,
  Xe as formatCount,
  cs as formatDate,
  cu as formatDateTime,
  Mt as formatDigits,
  fs as formatDuration,
  vs as formatElapsed,
  ye as formatExpression,
  He as formatInteger,
  is as formatMetric,
  us as formatOrdinal,
  ps as formatPercent,
  Ls as formatRange,
  we as formatTerm,
  Js as generateRows,
  hl as hasActiveFacets,
  Ou as identityColumn,
  mu as idsExpression,
  uu as isEntityScoped,
  ws as isFacetActive,
  dn as isPristineQuery,
  et as isRangeTerm,
  la as isTypeCardsQuery,
  na as isViewKind,
  fu as joinExpression,
  $a as liftTerm,
  Hs as matchesExpression,
  Au as metricColumn,
  yu as narrowPatch,
  qs as negateTerm,
  eu as niceMax,
  ue as normalizeSearch,
  vi as numberRange,
  Vs as oppositeTerm,
  Eu as ordinalColumn,
  re as parseExpression,
  rl as parseQuery,
  Du as percentCell,
  Tu as pictureColumn,
  Ll as placePopover,
  Br as presentParts,
  Ra as presentRow,
  at as pressOptions,
  il as provideShellContext,
  ul as provideShellTheme,
  Ju as queryAll,
  Wu as rangeFrom,
  Tt as rangeOf,
  Ws as readDraft,
  hu as readExpression,
  Gu as recordRedirect,
  wa as recordTerm,
  ol as recordsIn,
  Nu as referenceColumn,
  nt as refineExpression,
  Fe as resolveView,
  ve as roleColumn,
  ra as roleColumns,
  xs as rowKey,
  Xt as sameTerm,
  ct as scopeTerm,
  wt as scopeTermFor,
  Ca as scopedEntity,
  pu as searchFromQuery,
  Dn as serializeQuery,
  sl as sortAddress,
  Lt as sortsFor,
  du as splitExpression,
  Mu as stateColumn,
  hs as stripAnsi,
  gl as summarizeQuery,
  $t as summaryTerms,
  gn as termStanding,
  Lu as tintColumn,
  vu as tintFor,
  zu as toggleFacet,
  oi as useColumns,
  $l as useDraft,
  Lr as useEntityCounts,
  Li as useEntityPreviews,
  _n as useLayerTheme,
  Cu as usePoll,
  Ne as usePresentedRows,
  _l as useQueryState,
  Cl as useRecordNames,
  wl as useResults,
  ne as useShellContext,
  Pu as useStableSchema,
  Yc as useToasts,
  Uu as usefulFacets,
  En as viewAcross,
  Oa as withFacetValue,
  Jt as withStanding,
  gu as withoutFacet,
  Sa as withoutOwnScope,
  Fs as withoutTerm
};
