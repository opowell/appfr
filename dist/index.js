import { ref as H, computed as f, inject as rn, provide as on, getCurrentInstance as Zn, shallowRef as he, toValue as Ee, watch as ae, onScopeDispose as Ct, getCurrentScope as ea, defineComponent as W, onMounted as it, onBeforeUnmount as ge, openBlock as u, createBlock as I, Teleport as Pt, createElementVNode as S, mergeProps as qe, unref as w, renderSlot as G, createCommentVNode as T, nextTick as Ye, createElementBlock as h, withKeys as Me, useSlots as Et, useId as Mt, withCtx as Y, toDisplayString as L, createTextVNode as te, Fragment as K, renderList as J, withModifiers as Le, normalizeClass as ie, withDirectives as Ut, normalizeStyle as re, vModelText as Ja, createVNode as j, reactive as Sn, toHandlers as cn, resolveDynamicComponent as Xe, createSlots as Qt, useModel as Cn, onBeforeUpdate as Za, normalizeProps as Dt, guardReactiveProps as es, mergeModels as Pn, vShow as En, Comment as ts, Text as ns, readonly as as, watchEffect as ss } from "vue";
import { MenuList as ls } from "menu-bar";
const un = ["list", "cards", "grid", "images", "table", "links", "preview"], Qe = ["ok", "running", "queued", "review", "failed"], uu = [...Qe, "neutral", "accent"], du = [
  "identity",
  "reference",
  "metric",
  "state",
  "updated",
  "image",
  "tint"
], fu = [480, 620, 760, 900, 1100], ta = Symbol("dc.routeAdapter");
function ue(e) {
  if (!e) return "";
  const t = e.replace(/^[?]/, "");
  return t ? `?${t}` : "";
}
function rs() {
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
function os(e, t) {
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
function Ge(e) {
  let t = 2166136261;
  for (let n = 0; n < e.length; n++)
    t ^= e.charCodeAt(n), t = Math.imul(t, 16777619);
  return Math.abs(t);
}
const is = new Intl.NumberFormat("en-US", {
  minimumSignificantDigits: 2,
  maximumSignificantDigits: 2,
  useGrouping: !1
});
function Lt(e) {
  return Number.isFinite(e) ? Math.abs(e) < 100 ? is.format(e) : String(Math.round(e)) : "—";
}
function cs(e) {
  return Number.isFinite(e) ? Number.isInteger(e) || Math.abs(e) >= 100 ? Je(e) : Lt(e) : "—";
}
function Je(e) {
  if (!Number.isFinite(e)) return "—";
  const t = Math.round(e), n = Math.abs(t);
  return n < 1e3 ? String(t) : n < 9950 ? `${(t / 1e3).toFixed(1)}k` : n < 999500 ? `${Math.round(t / 1e3)}k` : n < 995e4 ? `${(t / 1e6).toFixed(1)}m` : `${Math.round(t / 1e6)}m`;
}
function He(e) {
  return Number.isFinite(e) ? Math.round(e).toLocaleString("en-US") : "—";
}
function us(e) {
  const t = new Date(e);
  if (Number.isNaN(t.getTime())) return "—";
  const n = String(t.getUTCDate()).padStart(2, "0"), a = String(t.getUTCMonth() + 1).padStart(2, "0");
  return `${n}.${a}.${t.getUTCFullYear()}`;
}
function ds(e) {
  return String(e + 1);
}
function vu(e, t) {
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
function fs(e) {
  if (e == null || !Number.isFinite(e) || e < 0) return "—";
  if (e < 1e3) return `${e} B`;
  const t = ["kB", "MB", "GB", "TB"];
  let n = e, a = -1;
  for (; n >= 1e3 && a < t.length - 1; )
    n /= 1e3, a += 1;
  return `${Lt(n)} ${t[a]}`;
}
function vs(e) {
  if (!e || !Number.isFinite(e)) return "—";
  if (e < 1e3) return `${Math.round(e)}ms`;
  const t = e / 1e3;
  return t < 60 ? `${Lt(t)}s` : `${Math.floor(t / 60)}m ${Math.round(t % 60)}s`;
}
function ps(e) {
  if (e == null || !Number.isFinite(e) || e <= 0)
    return "—";
  const t = Math.floor(e / 60);
  return t ? `${t}:${String(e % 60).padStart(2, "0")}` : `${e}s`;
}
function hs(e) {
  return e == null || !Number.isFinite(e) ? "—" : `${Math.round(e * 100)}%`;
}
function ms(e) {
  return e.replace(/\x1b\[[0-9;?]*[ -/]*[@-~]/g, "");
}
const na = "cards", ys = "table";
function Ze(e, t = {}) {
  const n = (s) => s && aa(s) ? s : void 0;
  if (e === null) return n(t.view) ?? na;
  const a = t.landing === "entity" ? n(t.view) : void 0;
  return n(t.entityView) ?? a ?? ys;
}
function Mn(e, t, n, a = {}) {
  return a.viewAcrossTypes !== "default" && e !== Ze(t, a) ? e : Ze(n, a);
}
const Gt = "updated";
function aa(e) {
  return typeof e == "string" && (e === "record" || un.includes(e));
}
const Ln = {
  list: "List",
  cards: "Cards",
  grid: "Grid",
  images: "Images",
  table: "Table",
  links: "Links",
  preview: "Preview",
  record: "Record"
}, gs = {
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
  if (e === "record" && !t?.includes(e)) return t?.[0] ?? na;
  const [n] = t ?? [];
  return n === void 0 || t?.includes(e) ? e : n;
}
function Yt(e) {
  return typeof e.count == "number" ? Je(e.count) : e.count;
}
function et(e, t) {
  return t ? e.entities.find((n) => n.key === t) ?? null : null;
}
function sa(e, t = {}) {
  const n = et(e, t.entity), a = e.entities[0];
  if (!n && !a) throw new Error(`Schema "${e.key}" declares no entities`);
  return n ?? a;
}
function la(e, t = null) {
  return e?.columns ?? t?.columns ?? [];
}
function Tt(e, t = null) {
  if (e?.sorts?.length) return e.sorts;
  const n = /* @__PURE__ */ new Set(), a = [];
  for (const s of la(e, t))
    !s.sort || n.has(s.sort) || (n.add(s.sort), a.push({ key: s.sort, label: (s.label ?? s.sort).toLowerCase() }));
  return a;
}
const _s = { key: Gt, label: Gt };
function Ce(e, t, n = null) {
  const a = Tt(e, n);
  return (t ? a.find((l) => l.key === t) : void 0) ?? a.find((l) => l.key === Gt) ?? a[0] ?? _s;
}
function ws(e) {
  switch (e.kind) {
    case "chips":
      return { kind: "chips", selected: [] };
    case "range":
      return { kind: "range", min: null, max: null };
    case "toggle":
      return { kind: "toggle", on: !1 };
  }
}
function ks(e) {
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
function pu(e) {
  return e.entity !== null;
}
function ra(e, t) {
  return e.entity === null && Fe(e.view, t) === "cards";
}
function bs(e, t) {
  return t <= 0 ? 1 : Math.max(1, Math.ceil(e / t));
}
function yt(e, t = {}) {
  const a = t.landing === "entity" ? sa(e, t) : null;
  return {
    entity: a?.key ?? null,
    view: Ze(a?.key ?? null, t),
    sort: Ce(a, t.sort).key,
    dir: t.dir === "asc" ? "asc" : "desc",
    expr: "",
    page: 1
  };
}
const fn = ["entity", "sort", "dir", "expr"];
function Kt(e) {
  return fn.some((t) => t in e);
}
const _e = "—";
function ve(e, t) {
  return e.find((n) => n.role === t);
}
function oa(e, t) {
  return e.filter((n) => n.role === t);
}
function $s(e, t) {
  const n = (t ? t.columns : e?.columns) ?? [], a = t ? "scoped" : "everything";
  return n.filter(
    (s) => s.role !== "tint" && ((s.when ?? "always") === "always" || s.when === a)
  );
}
const xs = ["id", "entityKey", "entityLabel"];
function oe(e, t) {
  if (e.value) return e.value(t);
  const n = e.field ?? e.key;
  if (n !== void 0) {
    if (t.fields && n in t.fields) return t.fields[n];
    if (xs.includes(n))
      return t[n];
  }
}
function Tn(e, t) {
  const n = e.key ?? e.field ?? e.label;
  return n?.trim() ? n.trim() : `column-${t}`;
}
function Ss(e, t) {
  return e.id?.trim() ? e.id : `${e.entityKey || "row"}-${t}`;
}
function Cs(e, t) {
  if (e == null || e === "") return _e;
  if (t === "number") {
    const n = typeof e == "number" ? e : Number(e);
    return Number.isFinite(n) ? cs(n) : String(e);
  }
  return t === "date" ? us(String(e)) : Array.isArray(e) ? e.length ? e.join(", ") : _e : String(e);
}
function Te(e, t) {
  const n = oe(e, t);
  return e.format ? e.format(n, t) : Cs(n, e.kind);
}
function Ps(e) {
  return typeof e == "number" ? Number.isFinite(e) ? String(e) : "" : typeof e == "string" ? e : Array.isArray(e) ? e.join(", ") : "";
}
function ia(e, t) {
  const n = Te(e, t), a = Ps(oe(e, t));
  return a && a !== n ? a : n;
}
function mt(e, t) {
  return e ? Te(e, t) : "";
}
function On(e) {
  return e.align ? e.align : e.kind === "number" || e.kind === "ordinal" ? "right" : "left";
}
const Es = {
  ordinal: "dc-table__num",
  number: "dc-table__number",
  date: "dc-table__date",
  status: "dc-table__state"
};
function Nn(e) {
  return [Es[e.kind ?? "text"], e.class].filter(Boolean).join(" ");
}
function Xt(e) {
  if (e.truncate !== void 0) return e.truncate;
  const t = e.kind ?? "text";
  return t === "text" || t === "number" || t === "date";
}
const Ms = /^([A-Za-z_][\w.-]*)\s*(>=|<=|:|=|>|<)\s*(.*)$/, An = "-?(?:\\d+\\.?\\d*|\\.\\d+)", Ls = new RegExp(`^(${An})?\\.\\.(${An})?$`);
function Ot(e) {
  const t = Ls.exec(e.trim());
  if (!t || t[1] === void 0 && t[2] === void 0) return null;
  const n = t[1] === void 0 ? null : Number(t[1]), a = t[2] === void 0 ? null : Number(t[2]);
  return n !== null && a !== null && n > a ? { min: a, max: n } : { min: n, max: a };
}
function Ts(e) {
  return `${e.min ?? ""}..${e.max ?? ""}`;
}
function Ve(e) {
  return e.kind === "field" && (e.comparator === ":" || e.comparator === "=") && Ot(e.value) !== null;
}
function Os(e) {
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
  for (const s of Os(t)) {
    const l = s.toUpperCase();
    if (l === "AND" || l === "&&") continue;
    if (l === "OR" || l === "||") {
      a.length && n.push(a), a = [];
      continue;
    }
    const o = s.length > 1 && s.startsWith("-"), i = o ? s.slice(1) : s, r = o ? { negated: !0 } : {}, c = Ms.exec(i);
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
const Pe = (e) => e.toLowerCase().replace(/\s+/g, ""), ca = [
  ["status", "state"],
  ["state", "state"],
  ["updated", "updated"],
  ["date", "updated"],
  ["name", "identity"],
  ["ref", "reference"]
];
function Ns(e, t, n) {
  const a = Pe(e), s = n.columns ?? [];
  if (a === "entity") return t.entityKey;
  if (e in t.fields) return t.fields[e];
  const l = s.find(
    (c) => c.key?.toLowerCase() === e.toLowerCase() || c.field?.toLowerCase() === e.toLowerCase() || c.label !== void 0 && Pe(c.label) === a
  );
  if (l) return oe(l, t);
  const o = n.facets.find(
    (c) => c.key.toLowerCase() === a || Pe(c.label) === a
  );
  if (o && o.key in t.fields) return t.fields[o.key];
  const i = ca.find(([c]) => c === a)?.[1];
  if (i) {
    const c = ve(s, i);
    if (c) return oe(c, t);
  }
  const r = /^metric(\d+)$/.exec(a);
  if (r) {
    const c = oa(s, "metric")[Number(r[1]) - 1];
    if (c) return oe(c, t);
  }
}
function ct(e) {
  return (e.toLowerCase().match(/[\p{L}\p{N}]+/gu) ?? []).map((t) => t.charAt(0)).join("");
}
const In = /^[a-z_][\w.-]*$/;
function Nt(e) {
  const t = (e.key ?? e.field)?.toLowerCase();
  if (t !== void 0) return In.test(t) ? t : void 0;
  const n = e.label === void 0 ? void 0 : Pe(e.label);
  return n !== void 0 && In.test(n) ? n : void 0;
}
function vn(e, t) {
  const n = Pe(e);
  return !!t?.entities.some((a) => a.scope && Pe(a.scope) === n);
}
function As(e, t, n) {
  const a = Pe(e);
  if (a === "entity" || ca.some(([l]) => l === a) || /^metric\d+$/.test(a) || vn(e, n)) return !0;
  const s = (l) => l !== void 0 && Pe(l) === a;
  return (t.columns ?? []).some(
    (l) => s(l.key) || s(l.field) || s(l.label)
  ) || t.facets.some((l) => s(l.key) || s(l.label));
}
function tt(e, t, n) {
  return t ? da(e, (a) => {
    const s = fa(a, t, n);
    return s && Nt(s);
  }) : e;
}
function ua(e, t, n) {
  return t ? da(e, (a) => {
    if (vn(a, n)) return;
    const s = (t.columns ?? []).find((l) => Nt(l) === a);
    return s && va(s, t, n);
  }) : e;
}
function Is(e, t, n) {
  if (!t || vn(e, n)) return;
  const a = t.facets.find((s) => s.key.toLowerCase() === e);
  return a ? a.label : (t.columns ?? []).find((s) => Nt(s) === e)?.label;
}
function da(e, t) {
  let n = !1;
  const a = le(e).map(
    (s) => s.map((l) => {
      if (l.kind !== "field") return l;
      const o = t(l.field);
      return !o || o === l.field ? l : (n = !0, { ...l, field: o });
    })
  );
  return n ? pe(a) : e;
}
function fa(e, t, n) {
  if (!(!e || As(e, t, n)))
    return (t.columns ?? []).find(
      (a) => a.label !== void 0 && ct(a.label) === e
    );
}
function va(e, t, n) {
  if (!t || e.label === void 0 || !Nt(e)) return;
  const a = ct(e.label);
  return fa(a, t, n) === e ? a : void 0;
}
function Wt(e, t) {
  const n = e.toLowerCase(), a = t.toLowerCase();
  if (!a.includes("*")) return n.includes(a);
  const s = a.replace(/[.+?^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*");
  return new RegExp(s).test(n);
}
function Rn(e, t) {
  return e.toLowerCase() === t.toLowerCase();
}
function Rs(e, t, n, a) {
  if (e.kind === "text") {
    const r = n.columns ?? [];
    return ["identity", "reference"].some((c) => {
      const d = ve(r, c), v = d ? oe(d, t) : void 0;
      return typeof v == "string" && Wt(v, e.value);
    });
  }
  const s = Ns(e.field, t, n);
  if (s === void 0) return a?.has(e.field) ? !1 : null;
  const l = Ve(e) ? Ot(e.value) : null;
  if (l) {
    if (Array.isArray(s) || typeof s == "boolean") return null;
    const r = typeof s == "number" ? s : Number(s);
    return Number.isFinite(r) ? (l.min === null || r >= l.min) && (l.max === null || r <= l.max) : null;
  }
  if (Array.isArray(s))
    return e.comparator === ":" || e.comparator === "=" ? s.some(
      (c) => e.comparator === "=" ? Rn(String(c), e.value) : Wt(String(c), e.value)
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
    return e.comparator === "=" ? Rn(String(s), e.value) : Wt(String(s), e.value);
  }
  const o = Number(e.value), i = typeof s == "number" ? s : Number(s);
  return !Number.isFinite(o) || !Number.isFinite(i) ? null : Bs(e.comparator, i, o);
}
function Bn(e, t, n, a) {
  const s = Rs(e, t, n, a);
  return s === null ? !0 : e.negated ? !s : s;
}
function Bs(e, t, n) {
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
function Hn(e) {
  return e.kind === "field" && !e.negated && (e.comparator === ":" || e.comparator === "=") && !Ve(e);
}
const qn = /* @__PURE__ */ new WeakMap();
function Hs(e) {
  if (!e?.strictScopes) return null;
  let t = qn.get(e);
  return t || (t = new Set(
    e.entities.flatMap((n) => n.scope ? [n.scope.toLowerCase()] : [])
  ), qn.set(e, t)), t;
}
function qs(e, t, n, a) {
  if (!e.length) return !0;
  const s = Hs(a);
  return e.some((l) => {
    const o = /* @__PURE__ */ new Map();
    for (const i of l)
      Hn(i) && o.set(
        i.field,
        (o.get(i.field) ?? !1) || Bn(i, t, n, s)
      );
    return l.every(
      (i) => Hn(i) ? o.get(i.field) === !0 : Bn(i, t, n, s)
    );
  });
}
function Fn(e) {
  return /[\s"']/.test(e) ? `"${e.replace(/["']/g, "")}"` : e;
}
function ye(e) {
  const t = e.negated ? "-" : "";
  return e.kind === "text" ? t + Fn(e.value) : `${t}${e.field}${e.comparator}${Fn(e.value)}`;
}
function Fs(e) {
  if (!e.negated) return { ...e, negated: !0 };
  const { negated: t, ...n } = e;
  return n;
}
function pe(e) {
  return e.filter((t) => t.length).map((t) => t.map(ye).join(" ")).join(" OR ");
}
function Vs(e, t, n) {
  return e.map((a, s) => s === t ? a.filter((l, o) => o !== n) : a).filter((a) => a.length);
}
function hu(e) {
  const t = le(e);
  if (t.length > 1) return { parts: [], text: e.trim() };
  const n = t[0] ?? [];
  return {
    parts: n.filter((a) => a.kind === "field"),
    text: n.filter((a) => a.kind === "text").map(ye).join(" ")
  };
}
function mu(e, t) {
  return [...e.map(ye), t.trim()].filter(Boolean).join(" ");
}
const Vn = (e, t) => e.toLowerCase() === t.toLowerCase();
function nt(e, t) {
  return !!e.negated == !!t.negated && pa(e, t);
}
function Ds(e, t) {
  return !!e.negated != !!t.negated && pa(e, t);
}
function pa(e, t) {
  return e.kind === "field" ? t.kind === "field" && e.field === t.field && e.comparator === t.comparator && Vn(e.value, t.value) : t.kind === "text" && Vn(e.value, t.value);
}
function Ks(e, t) {
  return t.filter((n) => !e.some((a) => nt(a, n)));
}
function pn(e, t) {
  return ha(e, t, (n) => n);
}
function at(e, t) {
  return ha(
    e,
    t,
    (n, a) => n.filter((s) => !a.some((l) => Ds(s, l)))
  );
}
const Ws = /^[A-Za-z_][\w.-]*\s*(?:>=|<=|:|=|>|<)$/;
function zs(e) {
  return pe(
    le(e).map(
      (t) => t.filter(
        (n) => n.kind !== "text" || n.value !== "-" && !Ws.test(n.value)
      )
    ).filter((t) => t.length > 0)
  );
}
function ha(e, t, n) {
  const a = le(e), s = le(t);
  return a.length ? s.length ? pe(
    a.flatMap(
      (l) => s.map((o) => [...n(l, o), ...Ks(l, o)])
    )
  ) : pe(a) : pe(s);
}
const ma = (e) => e.kind === "date" || e.role === "updated";
function js(e) {
  if (!e) return () => 0;
  const n = (e.kind ?? "text") === "number" || e.role === "metric", a = ma(e);
  return (s, l) => {
    const o = oe(e, s), i = oe(e, l);
    return n ? Number(i ?? 0) - Number(o ?? 0) : a ? Date.parse(String(i ?? "")) - Date.parse(String(o ?? "")) : String(i ?? "").localeCompare(String(o ?? ""));
  };
}
function Dn(e, t) {
  return !t || !ma(t) ? !1 : !Number.isFinite(Date.parse(String(oe(t, e) ?? "")));
}
function ya({ query: e, schema: t, entity: n, limit: a, offset: s }, l, o) {
  const i = le(e.expr), r = n ? [n] : t.entities;
  let c = 0;
  const d = [];
  for (const k of r)
    for (const P of l(k))
      c += 1, qs(i, P, k, t) && d.push(P);
  const v = Ce(n, e.sort, t), _ = la(n, t).find((k) => k.sort === v.key), y = o.undatedLast ? d.filter((k) => !Dn(k, _)) : d, g = o.undatedLast ? d.filter((k) => Dn(k, _)) : [];
  y.sort(js(_)), e.dir === "asc" && y.reverse();
  const p = g.length ? [...y, ...g] : y;
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
function yu(e) {
  return gt[Ge(e) % gt.length];
}
function ga(e, t) {
  return `${e}_${1e4 + t * 7}`;
}
const Us = 7, Qs = 3;
function Gs(e, t, n, a) {
  const s = (t * Us + Ge(n)) % a, l = [];
  for (let o = 0; o < Math.min(Qs, a); o++)
    l.push(ga(e, (s + o) % a));
  return l;
}
function Ys(e, t) {
  switch (e.kind) {
    case "chips":
      return e.multiple ? Xs(e.options, t) : e.options[t % e.options.length] ?? "";
    case "range": {
      const n = Math.max(0, e.max - e.min);
      return e.min + (n === 0 ? 0 : t % (n + 1));
    }
    case "toggle":
      return t % 3 === 0;
  }
}
function Xs(e, t) {
  if (!e.length) return [];
  const n = 1 + (t >> 5) % Math.min(3, e.length), a = t % e.length, s = /* @__PURE__ */ new Set();
  for (let l = 0; l < n; l++) s.add((a + l) % e.length);
  return [...s].sort((l, o) => l - o).map((l) => e[l]);
}
function Js(e, t) {
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
function Zs(e, t = {}) {
  const n = t.population ?? 48, a = t.seed ?? "", s = t.now ?? /* @__PURE__ */ new Date("2026-08-25T00:00:00Z"), l = e.samples, o = t.scopes ?? [];
  if (!l.length) return [];
  const i = [];
  for (let r = 0; r < n; r++) {
    const c = l[r % l.length], d = Math.floor(r / l.length), v = Ge(`${a}:${e.key}:${c[0]}:${r}`), _ = ga(e.key, r), y = new Date(s.getTime() - v % 900 * 36e5).toISOString(), g = {};
    for (const p of e.columns ?? []) {
      const k = p.field ?? p.key;
      if (!k || p.value) continue;
      const P = Js(p, {
        hash: Ge(`${v}:${k}`),
        sample: c,
        revision: d,
        updatedAt: y
      });
      P !== void 0 && (g[k] = P);
    }
    for (const p of e.facets)
      g[p.key] = Ys(p, Ge(`${v}:${p.key}`));
    for (const [p, k] of o)
      g[p] = k === e.key ? _ : Gs(k, r, p, n);
    i.push({ id: _, entityKey: e.key, entityLabel: e.label, fields: g });
  }
  return i;
}
function el(e = {}) {
  const t = /* @__PURE__ */ new Map(), n = (a, s) => {
    const l = t.get(a.key);
    if (l) return l;
    const o = e.scopes ?? s.entities.flatMap(
      (r) => r.scope ? [[r.scope, r.key]] : []
    ), i = Zs(a, { ...e, scopes: o });
    return t.set(a.key, i), i;
  };
  return {
    query(a) {
      return ya(a, (s) => n(s, a.schema), {
        undatedLast: !1,
        zeroIsAll: !1
      });
    }
  };
}
const Ke = "e", At = "v", hn = "s", mn = "d", Oe = "q", It = "p", _a = "*", tl = [
  Ke,
  At,
  hn,
  mn,
  Oe,
  It
], nl = [
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
  for (const [n, a] of nl) t = t.replace(n, a);
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
function al(e) {
  return tl.includes(e);
}
function Rt(e, t) {
  if (!(!t || e.some((n) => n.key === t)))
    return e.find((n) => ct(n.label) === t);
}
function sl(e, t) {
  const n = ct(e.label);
  return Rt(t.entities, n)?.key === e.key ? n : e.key;
}
function wa(e, t) {
  return t ? et(e, t) ?? Rt(e.entities, t) ?? null : null;
}
function ll(e, t) {
  const n = ct(e.label);
  return Rt(t, n)?.key === e.key ? n : e.key;
}
function rl(e, t) {
  return t.some((n) => n.key === e) ? e : Rt(t, e)?.key ?? e;
}
function ol(e, t, n = {}) {
  const a = yt(t, n), s = new Map(yn(e)), l = s.get(Ke), o = l === void 0 ? a.entity : me(l), i = o === _a ? null : wa(t, o), r = s.get(At), c = r && aa(me(r)) ? me(r) : Ze(i?.key ?? null, n), d = s.get(hn), v = Ce(
    i,
    d ? rl(me(d), Tt(i, t)) : n.sort,
    t
  ), _ = s.get(mn), y = _ ? me(_) === "asc" ? "asc" : "desc" : a.dir, g = s.get(Oe), p = s.get(It), k = p === void 0 ? 1 : Number(me(p)), P = Number.isFinite(k) ? Math.max(1, Math.floor(k)) : 1;
  return {
    entity: i?.key ?? null,
    view: c,
    sort: v.key,
    dir: y,
    expr: g === void 0 ? "" : tt(me(g), i, t),
    page: P
  };
}
function Kn(e, t, n = {}, a = "") {
  const s = yt(t, n), l = et(t, e.entity), o = yn(a).filter(([v]) => !al(v)), i = [], r = (v, _) => i.push([v, _t(_)]), c = l?.key ?? null;
  if (c !== s.entity && r(Ke, l ? sl(l, t) : _a), e.view !== Ze(c, n) && r(At, e.view), e.sort !== s.sort) {
    const v = Tt(l, t), _ = v.find((y) => y.key === e.sort);
    r(hn, _ ? ll(_, v) : e.sort);
  }
  e.dir !== s.dir && r(mn, e.dir), e.expr.trim() !== "" && r(Oe, ua(e.expr, l, t)), e.page > 1 && r(It, String(e.page));
  const d = [
    ...o.map(([v, _]) => [_t(v), _]),
    ...i
  ];
  return d.length ? `?${d.map(([v, _]) => _ === "" ? v : `${v}=${_}`).join("&")}` : "";
}
function gu(e) {
  const t = [];
  for (const [n, a] of Object.entries(e))
    for (const s of Array.isArray(a) ? a : [a]) {
      if (typeof s != "string") continue;
      const l = _t(n);
      t.push(s === "" ? l : `${l}=${_t(s)}`);
    }
  return t.length ? `?${t.join("&")}` : "";
}
function _u(e, t) {
  const n = new Map(yn(e)), a = n.get(Oe), s = a === void 0 ? "" : me(a);
  if (!t) return s;
  const l = n.get(Ke);
  return tt(
    s,
    l === void 0 ? null : wa(t, me(l)),
    t
  );
}
function ut(e, t) {
  return ka(e, t.id);
}
function ka(e, t) {
  const n = e?.scope;
  return n ? ba(n, t) : null;
}
function ba(e, t) {
  return `${e}="${t.replace(/"/g, "")}"`;
}
function wu(e, t) {
  const n = typeof e == "string" ? e : e?.scope;
  if (!n) return null;
  const a = t.filter((s) => s.replace(/"/g, "") !== "").map((s) => ba(n, s));
  return a.length ? a.join(" ") : null;
}
function Bt(e, t) {
  if (e.kind !== "field" || t.kind !== "field") return nt(e, t);
  const n = (a) => a.comparator === ":" || a.comparator === "=";
  return nt(e, { ...t, comparator: n(e) && n(t) ? e.comparator : t.comparator });
}
function wt(e, t) {
  return Bt(e, Fs(t));
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
  return s.some((i) => i.some((r) => Bt(r, a))) ? n : s.some((i) => i.some((r) => wt(r, a))) ? pe(
    s.map(
      (i) => i.map((r) => wt(r, a) ? a : r)
    )
  ) : `${n} ${t}`;
}
function $a(e) {
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
function xa(e, t) {
  if (!t || !e.trim()) return e;
  const [n] = le(t).flat();
  if (!n) return e;
  const a = le(e), s = a.map(
    (l) => l.filter((o) => !Bt(o, n) && !wt(o, n))
  );
  return s.every((l, o) => l.length === a[o]?.length) ? e : pe(s);
}
function Jt(e, t, n) {
  return t ? n === null ? xa(e, t) : dt(e, n === "out" ? $a(t) : t) : e;
}
function Zt(e, t) {
  const n = t.shiftKey ? `noopener,popup,width=${window.outerWidth},height=${window.outerHeight}` : "noopener";
  window.open(e, "_blank", n);
}
function Sa() {
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
  return il(dt(t.expr, a.exclude ? $a(l) : l), s);
}
function il(e, t) {
  const n = t?.trim() ? le(t).flat() : [];
  if (!n.length) return e;
  const a = new Set(n.flatMap((i) => i.kind === "field" ? [i.field] : [])), s = (i) => i.kind === "field" && !i.negated && (i.comparator === ":" || i.comparator === "=") && a.has(i.field), l = e.trim(), o = l ? le(l) : [[]];
  if (o.length === 1 && !o[0].some(s)) {
    const i = n.filter((r) => !o[0].some((c) => nt(c, r)));
    return [l, ...i.map(ye)].filter(Boolean).join(" ");
  }
  return pe(
    o.map((i) => {
      const r = i.filter((c) => !s(c));
      return [...r, ...n.filter((c) => !r.some((d) => nt(d, c)))];
    })
  );
}
function Ca(e, t) {
  const n = e?.scope?.toLowerCase();
  if (!n || e?.keepsScope || !t.trim()) return t;
  const a = le(t), s = a.map(
    (l) => l.filter((o) => o.kind !== "field" || o.field !== n)
  );
  return s.every((l, o) => l.length === a[o]?.length) ? t : pe(s);
}
function Pa(e, t) {
  const n = t.toLowerCase();
  return e.entities.find((a) => a.scope?.toLowerCase() === n) ?? null;
}
function Ea(e, t, n) {
  if (!t || !n) return null;
  const a = Pa(e, t);
  return a ? { entity: a, id: n } : null;
}
function cl(e, t) {
  const n = [], a = /* @__PURE__ */ new Set();
  for (const s of t)
    for (const l of le(s).flat()) {
      if (l.kind !== "field" || l.negated) continue;
      const o = Ea(e, l.field, l.value);
      if (!o) continue;
      const i = `${o.entity.key}:${o.id.toLowerCase()}`;
      a.has(i) || (a.add(i), n.push({ entityKey: o.entity.key, id: o.id }));
    }
  return n;
}
function ku(e, t, n = "cards") {
  return {
    // An expression with nothing in it is no parameter, as the shell writes it.
    [Oe]: dt(e, t) || void 0,
    [Ke]: void 0,
    [At]: n,
    [It]: void 0
  };
}
const Ma = Symbol("dc.shellContext");
function ul(e) {
  const t = e.liveQuery ? e : dl(e);
  return on(Ma, t), t;
}
function dl(e) {
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
function ne() {
  const e = rn(Ma, null);
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
      theme: Ee(e.theme),
      accent: Ee(e.accent),
      tokens: Ee(e.tokens)
    })
  };
}
function fl(e, t) {
  t ? t.provide(bt, tn(e)) : on(bt, tn(e));
}
function vl(e) {
  const t = Zn();
  on(bt, {
    ...tn(e),
    element: () => t?.proxy?.$el ?? null
  });
}
function _n(e) {
  const t = Zn(), n = rn(bt, null), a = he(null);
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
function lt(e) {
  return e.key.toLowerCase();
}
const pl = /* @__PURE__ */ new Set([">", ">=", "<", "<="]);
function La(e, t) {
  if (e.kind !== "field" || e.negated || e.field !== lt(t)) return !1;
  const n = e.comparator === ":" || e.comparator === "=";
  switch (t.kind) {
    case "range":
      return Ve(e) || pl.has(e.comparator);
    case "chips":
      return n && !Ve(e) && Ta(t.options, e.value) !== void 0;
    case "toggle":
      return n && hl(e.value);
  }
}
function Ta(e, t) {
  const n = t.toLowerCase();
  return e.find((a) => a.toLowerCase() === n);
}
function hl(e) {
  const t = e.toLowerCase();
  return t === "true" || t === "yes";
}
function Oa(e, t) {
  const n = (le(e)[0] ?? []).filter((a) => La(a, t));
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
      const a = new Set(n.map((s) => Ta(t.options, s.value)));
      return { kind: "chips", selected: t.options.filter((s) => a.has(s)) };
    }
    case "toggle":
      return { kind: "toggle", on: n.length > 0 };
  }
}
function ml(e, t) {
  const n = lt(e);
  switch (t.kind) {
    case "range":
      return t.min === null && t.max === null ? [] : [{ kind: "field", field: n, comparator: ":", value: Ts(t) }];
    case "chips":
      return t.selected.map((a) => ({ kind: "field", field: n, comparator: "=", value: a }));
    case "toggle":
      return t.on ? [{ kind: "field", field: n, comparator: ":", value: "true" }] : [];
  }
}
function Na(e, t, n) {
  const a = ml(t, n), s = le(e), l = (s.length ? s : [[]]).map((o) => [
    ...o.filter((i) => !La(i, t)),
    ...a
  ]);
  return pe(l);
}
function bu(e, t) {
  return Na(e, t, ws(t));
}
function yl(e, t) {
  return (t?.facets ?? []).some((n) => ks(Oa(e, n)));
}
const $t = "entity", rt = "expr", gl = { ">=": "≥", "<=": "≤", ">": ">", "<": "<" };
function je(e) {
  const t = Number(e);
  return Number.isFinite(t) && !Number.isInteger(t) ? Lt(t) : String(e);
}
function _l(e, t, n) {
  if (e.kind !== "field") return ye(e);
  const a = Is(e.field, t, n);
  if (a === void 0) return ye(e);
  const s = e.negated ? "-" : "", l = Ve(e) ? Ot(e.value) : null;
  if (l) {
    const i = l.min !== null && l.max !== null ? `${je(l.min)} ≤ ${a} ≤ ${je(l.max)}` : l.max !== null ? `${a} ≤ ${je(l.max)}` : `${a} ≥ ${je(l.min)}`;
    return s + i;
  }
  const o = gl[e.comparator];
  return o ? `${s}${a} ${o} ${je(e.value)}` : ye({ ...e, field: a });
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
        label: _l(o, t, n),
        address: ua(ye(o), t, n),
        facetKey: rt,
        group: l,
        index: i,
        ...o.kind === "field" ? { field: o.field, value: o.value } : {},
        ...o.negated ? { negated: !0 } : {}
      });
    });
  }), a;
}
function wl(e, t, n = null) {
  if (dn(e)) {
    const l = Ce(t, e.sort, n);
    return `everything · ${e.view} · ${l.label}`;
  }
  const a = xt(e, t).filter((l) => l.facetKey !== rt).map((l) => l.label), s = e.expr.trim();
  return s && a.push(`"${s}"`), a.join(" · ");
}
function kl(e) {
  const { adapter: t } = e, n = f(() => Ee(e.schema)), a = f(() => Ee(e.defaults) ?? {}), s = f(() => ol(t.search.value, n.value, a.value)), l = f(() => et(n.value, s.value.entity)), o = f(() => l.value ?? sa(n.value, a.value)), i = f(() => Tt(l.value, n.value)), r = f(() => Ce(l.value, s.value.sort, n.value)), c = (x, m) => {
    const b = Kn(x, n.value, a.value, t.search.value);
    return b === t.search.value && !t.elsewhere?.value ? !1 : (m === "push" ? t.push(b) : t.replace(b), !0);
  }, d = () => Ee(e.navigationMode) ?? "push", v = () => Ee(e.facetNavigationMode) ?? "replace", _ = (x, m) => {
    const b = x.page ?? (Kt(x) ? 1 : s.value.page);
    return c({ ...s.value, ...x, page: b }, m);
  }, y = (x) => {
    const m = x.page ?? (Kt(x) ? 1 : s.value.page);
    return g({ ...s.value, ...x, page: m });
  }, g = (x) => {
    const m = Kn(x, n.value, a.value, t.search.value);
    return t.href ? t.href(m) : `${t.path.value}${m}`;
  }, p = (x, m) => {
    const b = l.value?.facets.find((O) => O.key === x);
    if (!b) return;
    const E = Na(s.value.expr, b, m(Oa(s.value.expr, b)));
    _({ expr: E }, v());
  }, k = (x) => {
    const m = x === null ? null : et(n.value, x);
    return (m?.key ?? null) === s.value.entity ? {} : {
      entity: m?.key ?? null,
      view: Mn(s.value.view, s.value.entity, m?.key ?? null, a.value),
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
    summary: f(() => wl(s.value, l.value, n.value)),
    terms: f(() => xt(s.value, l.value, n.value)),
    isPristine: f(() => dn(s.value)),
    isEverything: f(() => s.value.entity === null),
    hasFacets: f(() => yl(s.value.expr, l.value)),
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
      if (x.facetKey === $t) {
        P(null);
        return;
      }
      if (x.facetKey === rt) {
        const m = Vs(le(s.value.expr), x.group ?? 0, x.index ?? 0);
        _({ expr: pe(m) }, d());
      }
    },
    clearFilters() {
      _({ ...k(null), expr: "" }, d());
    },
    clearHref: () => y({ ...k(null), expr: "" }),
    reset() {
      c(yt(n.value, a.value), d());
    },
    homeHref: () => g(yt(n.value, a.value)),
    hrefFor(x) {
      const m = { ...s.value, ...x };
      return "entity" in x && !("view" in x) && (m.view = Mn(s.value.view, s.value.entity, m.entity, a.value)), m.page = x.page ?? (Kt(x) ? 1 : s.value.page), g(m);
    }
  };
}
const Wn = 50;
function bl(e) {
  const t = he([]), n = H(0), a = H(!1), s = H(!1), l = he(null);
  let o = 0, i = null, r = null;
  const c = f(() => (e.query.value.page - 1) * e.limit.value), d = f(() => bs(n.value, e.limit.value)), v = () => {
    const E = e.query.value, O = e.within?.value.trim(), X = Ca(e.entity.value, E.expr);
    return O ? { ...E, expr: pn(O, X) } : X === E.expr ? E : { ...E, expr: X };
  }, _ = (E, O) => {
    t.value = E.rows, n.value = E.total, l.value = null, y(O);
  }, y = (E) => {
    i = { key: E, total: n.value }, s.value = !1;
  }, g = (E) => {
    l.value = E, t.value = [], n.value = 0, i = null, s.value = !1;
  }, p = (E, O, X, q) => {
    let D = !0;
    const U = () => E === o;
    let ee = 0, de = !1;
    const ce = (M) => {
      ee = M, de = !0, q === void 0 && (n.value = M);
    }, ke = () => {
      D && (D = !1, t.value = [], ce(0)), l.value = null;
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
    }, D = e.source.value;
    if (D.stream) {
      a.value = !0;
      try {
        r = D.stream(q, p(E, q.limit, O, X)) ?? null;
      } catch (ee) {
        g(ee), a.value = !1;
      }
      return;
    }
    let U;
    try {
      U = D.query(q);
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
    return `${e.entity.value?.key ?? e.schema.value.entities[0]?.key ?? ""}|${JSON.stringify(fn.map((X) => E[X]))}`;
  }), m = f(() => `${x.value}|${e.query.value.page}`);
  return ae([e.source, m, e.limit], P, {
    immediate: !0
  }), Ct(() => {
    o++, k();
  }, !0), { rows: t, total: n, offset: c, pageCount: d, pending: a, counting: s, error: l, refresh: P, locate: async (E, O) => {
    const X = Math.max(0, O - 1 - Wn);
    try {
      const { rows: q } = await e.source.value.query({
        query: v(),
        schema: e.schema.value,
        entity: e.entity.value,
        limit: Wn * 2 + 1,
        offset: X
      }), D = q.findIndex((U) => U.id === E);
      return D === -1 ? null : X + D + 1;
    } catch {
      return null;
    }
  } };
}
function $l(e) {
  const t = he(null);
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
const xl = 150;
function Sl(e) {
  const t = e.delay ?? xl, n = H(""), a = H("");
  let s = !1, l;
  const o = () => {
    clearTimeout(l), l = void 0;
  }, i = f(() => tt(zs(a.value), e.entity.value, e.schema?.value)), r = f(() => i.value.trim() !== ""), c = f(
    () => JSON.stringify([i.value, ...fn.map((y) => e.query.value[y])])
  ), d = he(null), v = f(() => {
    const y = e.query.value;
    if (!r.value) return y;
    const g = d.value?.of === c.value ? d.value.page : 1;
    return { ...y, expr: at(y.expr, i.value), page: g };
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
  return ea() && Ct(o), {
    text: n,
    live: v,
    drafting: r,
    setPage(y) {
      d.value = { of: c.value, page: Math.max(1, Math.floor(y)) };
    },
    commit() {
      const y = n.value.trim();
      if (!y) return;
      const g = at(
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
const Cl = 25, Aa = (e, t) => e.toLowerCase() === t.toLowerCase();
function Pl(e, t) {
  return e.find((n) => Aa(n.id, t));
}
function El(e) {
  const t = he(/* @__PURE__ */ new Map()), n = /* @__PURE__ */ new Set(), a = (i) => {
    if (i.facetKey !== rt) return null;
    const r = Ea(e.schema.value, i.field, i.value);
    return r ? { ...r, key: `${r.entity.key}:${r.id}` } : null;
  }, s = (i) => {
    const { entity: r, id: c } = i, d = e.query.value;
    return e.source.value.query({
      query: {
        ...d,
        entity: r.key,
        // The reference on its own. The rest of the query is about the rows on
        // screen, which are of another type entirely.
        expr: ka(r, c) ?? "",
        sort: Ce(r, d.sort, e.schema.value).key,
        page: 1
      },
      schema: e.schema.value,
      entity: r,
      limit: Cl,
      offset: 0
    });
  }, l = (i, r) => {
    const c = mt(ve(i.columns ?? [], "identity"), r);
    return c === _e || Aa(c, r.id) ? "" : c;
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
        const { reference: g } = r[y], p = Pl(_.rows, g.id);
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
const Ml = 4, Ll = 8, Tl = 180;
function Ol(e, t, n, a = {}) {
  const s = a.gap ?? Ml, l = a.margin ?? Ll, o = a.flipBelow ?? Tl, i = a.side ?? "below", r = {
    below: n.height - e.bottom - s - l,
    above: e.top - s - l
  }, c = i === "below" ? "above" : "below", d = r[i] < o && r[c] > r[i] ? c : i, v = Math.min(a.maxHeight ?? 1 / 0, Math.max(0, r[d])), _ = Math.max(0, n.width - l * 2), y = Math.min(a.minWidth ?? e.width, _), g = Math.min(Math.max(t, y), _), p = a.align === "end" ? e.right - g : e.left, k = Math.max(l, Math.min(p, n.width - g - l));
  return d === "below" ? { side: d, left: k, top: e.bottom + s, maxHeight: v, minWidth: y, maxWidth: _ } : { side: d, left: k, bottom: n.height - e.top + s, maxHeight: v, minWidth: y, maxWidth: _ };
}
const Nl = ["data-dc-theme", "data-dc-side"], Se = [], Al = /* @__PURE__ */ W({
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
      m && (r.value = Ol(
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
      Se.includes(c) || (Se.push(c), o(), r.value = null, await Ye(), d(), window.addEventListener("pointerdown", g, !0), document.addEventListener("keydown", p, !0), window.addEventListener("resize", d), window.addEventListener("scroll", d, !0), typeof ResizeObserver < "u" && i.value && (k = new ResizeObserver(() => d()), k.observe(i.value)));
    }
    function x() {
      const m = Se.indexOf(c);
      m !== -1 && (Se.splice(m, 1), window.removeEventListener("pointerdown", g, !0), document.removeEventListener("keydown", p, !0), window.removeEventListener("resize", d), window.removeEventListener("scroll", d, !0), k?.disconnect(), k = null);
    }
    return it(() => {
      n.open && P();
    }), ae(
      () => n.open,
      (m) => {
        m ? P() : x();
      }
    ), ae(() => n.anchor, () => {
      n.open && d();
    }), ge(x), (m, b) => e.open ? (u(), I(Pt, {
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
      ], 16, Nl)
    ], 8, ["to"])) : T("", !0);
  }
}), z = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [a, s] of t)
    n[a] = s;
  return n;
}, Il = /* @__PURE__ */ z(Al, [["__scopeId", "data-v-a688f2f7"]]), Rl = ["href"], Bl = /* @__PURE__ */ W({
  __name: "PressLink",
  props: {
    href: {},
    selectable: { type: Boolean }
  },
  emits: ["press"],
  setup(e, { emit: t }) {
    const n = e, a = t;
    function s(i) {
      i.stopPropagation(), !Sa() && (n.href && en(i) ? Zt(n.href, i) : a("press", st(i), i));
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
    ], 8, Rl)) : (u(), h("button", {
      key: 2,
      type: "button",
      class: "dc-press",
      onClick: o
    }, [
      G(i.$slots, "default", {}, void 0, !0)
    ]));
  }
}), se = /* @__PURE__ */ z(Bl, [["__scopeId", "data-v-e5165a68"]]), St = (e) => e.toLowerCase().replace(/\s+/g, ""), Hl = /(?:[^\s"]|"[^"]*"?)*$/, ql = /^(-?)([^:=<>"\s-][^:=<>"\s]*)([:=])(.*)$/, zn = 4;
function Fl(e, t) {
  const n = St(t);
  return e.find((a) => lt(a) === n || St(a.label) === n);
}
function Vl(e) {
  switch (e.kind) {
    case "toggle":
      return e.text;
    case "range":
      return `${e.min}..${e.max}`;
    case "chips": {
      const t = e.options.slice(0, zn).join(" · "), n = e.options.length - zn;
      return n > 0 ? `${t} · +${n}` : t;
    }
  }
}
function Dl(e) {
  switch (e.kind) {
    case "toggle":
      return [{ value: "true", hint: e.text }, { value: "false" }];
    case "chips":
      return e.options.map((t) => ({ value: t }));
    case "range":
      return [];
  }
}
function jn(e, t) {
  return St(e).includes(St(t));
}
function Kl(e, t) {
  const n = Hl.exec(e)?.[0] ?? "", a = e.slice(0, e.length - n.length), s = [], l = ql.exec(n);
  if (l) {
    const [, o, i, r, c] = l, d = Fl(t, i);
    if (!d) return [];
    const v = c.replace(/"/g, "").toLowerCase();
    for (const { value: _, hint: y } of Dl(d)) {
      if (!_.toLowerCase().includes(v)) continue;
      const g = ye({
        kind: "field",
        field: lt(d),
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
      if (i && !jn(r.key, i) && !jn(r.label, i)) continue;
      const c = `${o}${lt(r)}:`;
      s.push({ draft: a + c, label: c, hint: Vl(r), complete: !1 });
    }
  }
  return s.filter((o) => o.draft !== e);
}
const Wl = { class: "dc-header" }, zl = { class: "dc-header__main" }, jl = {
  class: "dc-header__brand",
  "aria-hidden": "true"
}, Ul = { class: "dc-header__sr" }, Ql = {
  key: 2,
  class: "dc-header__within"
}, Gl = ["title"], Yl = { class: "dc-header__query" }, Xl = ["data-dc-more", "title"], Jl = { class: "dc-header__run" }, Zl = {
  key: 0,
  class: "dc-header__or dc-mono",
  "aria-hidden": "true"
}, er = ["title", "aria-label", "onClick"], tr = ["placeholder", "aria-expanded", "aria-activedescendant", "onKeydown"], nr = ["id", "aria-selected", "onClick"], ar = { class: "dc-completion__term dc-mono" }, sr = {
  key: 0,
  class: "dc-completion__hint"
}, lr = {
  key: 0,
  class: "dc-header__actions"
}, rr = /* @__PURE__ */ W({
  __name: "ShellHeader",
  setup(e) {
    const t = Et(), n = ne(), a = f(() => n.schema.value), s = f(() => {
      const C = n.within.value.trim();
      return C ? xt({ ...n.query.value, expr: C }, null) : [];
    }), l = f(() => {
      const C = n.entity.value, A = C?.keepsScope ? void 0 : C?.scope?.toLowerCase();
      return n.terms.value.filter((B) => B.facetKey !== $t).map((B, F, Re) => {
        const Be = Re[F - 1];
        return {
          term: B,
          or: Be?.group !== void 0 && B.group !== void 0 && B.group !== Be.group,
          idle: !!A && B.field?.toLowerCase() === A
        };
      });
    }), o = El({
      source: n.source,
      schema: n.schema,
      query: n.query,
      loading: n.loading,
      // The scope's parts as well as the query's: it names a record more often
      // than a typed term does, being what a record's own page is built on.
      terms: f(() => [...s.value, ...n.terms.value])
    });
    function i(C) {
      const A = Pa(a.value, C)?.scopeLabel ?? C;
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
      return xt(
        { ...A, expr: at(A.expr, C.term) },
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
      return C.length ? Kl(n.draft.value, C) : [];
    }), m = f(() => k.value && x.value.length > 0);
    ae(x, () => {
      P.value = -1;
    });
    const b = `${Mt() ?? "dc-header"}-completions`;
    function E(C) {
      n.draft.value = C.draft, k.value = !C.complete, P.value = -1, Ye(() => {
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
    const q = H(null), D = f(() => Math.min(q.value ?? 1 / 0, l.value.length)), U = f(() => [
      { key: "before", entries: l.value.slice(0, D.value) },
      { key: "after", entries: l.value.slice(D.value) }
    ]), ee = f(() => D.value < l.value.length);
    ae(l, (C) => {
      q.value !== null && q.value >= C.length && (q.value = null);
    });
    function de(C, A) {
      q.value = C >= l.value.length ? null : Math.max(0, C), Ye(() => {
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
      D.value === 0 || !ce("start") || (C.preventDefault(), de(C.key === "Home" ? 0 : D.value - 1, "start"));
    }
    function M(C) {
      !ee.value || !ce("end") || (C.preventDefault(), de(C.key === "End" ? l.value.length : D.value + 1, "end"));
    }
    function Q(C) {
      D.value === 0 || !ce("start") || (C.preventDefault(), fe(l.value[D.value - 1].term, !0));
    }
    function N(C) {
      !ee.value || !ce("end") || (C.preventDefault(), fe(l.value[D.value].term, !1));
    }
    function Z(C) {
      C.isComposing || C.altKey || C.ctrlKey || C.metaKey || C.shiftKey || (C.key === "ArrowLeft" || C.key === "Home" ? ke(C) : C.key === "ArrowRight" || C.key === "End" ? M(C) : C.key === "Backspace" ? Q(C) : C.key === "Delete" && N(C));
    }
    function fe(C, A) {
      A && q.value !== null && (q.value = Math.max(0, q.value - 1)), n.removeTerm(C);
    }
    function We(C) {
      C.target?.closest("button, input") || (C.preventDefault(), _.value?.focus(), de(l.value.length, "end"));
    }
    function ze() {
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
    ), ae([l, D], $e, { flush: "post" }), ge(() => xe?.disconnect()), (C, A) => (u(), h("div", Wl, [
      S("div", zl, [
        a.value.label && t.brand ? (u(), I(se, {
          key: 0,
          class: "dc-header__domain",
          "data-dc-brand": "",
          title: "Home",
          href: w(n).homeHref(),
          onPress: A[0] || (A[0] = (B) => w(n).reset())
        }, {
          default: Y(() => [
            S("span", jl, [
              G(C.$slots, "brand", {
                label: a.value.label
              }, void 0, !0)
            ]),
            S("span", Ul, L(a.value.label), 1)
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
        s.value.length ? (u(), h("span", Ql, [
          A[10] || (A[10] = S("span", { class: "dc-header__sr" }, "Within", -1)),
          (u(!0), h(K, null, J(s.value, (B) => (u(), h("span", {
            key: `scope:${B.id}`,
            class: "dc-within dc-mono dc-truncate",
            title: c(B)
          }, L(c(B)), 9, Gl))), 128))
        ])) : T("", !0),
        S("div", Yl, [
          S("div", {
            class: "dc-header__field",
            onMousedown: We
          }, [
            S("div", {
              ref_key: "termBar",
              ref: Ie,
              class: "dc-header__terms",
              "data-dc-more": be.value,
              title: w(n).summary.value,
              onScroll: $e
            }, [
              (u(!0), h(K, null, J(U.value, (B) => (u(), h(K, {
                key: B.key
              }, [
                S("span", Jl, [
                  (u(!0), h(K, null, J(B.entries, (F) => (u(), h(K, {
                    key: F.term.id
                  }, [
                    F.or ? (u(), h("span", Zl, "or")) : T("", !0),
                    S("button", {
                      type: "button",
                      class: ie(["dc-term dc-mono", { "dc-term--idle": F.idle }]),
                      title: d(F),
                      "aria-label": `Remove ${c(F.term)}`,
                      onMousedown: A[2] || (A[2] = Le(() => {
                      }, ["prevent"])),
                      onClick: (Re) => fe(F.term, B.key === "before")
                    }, L(c(F.term)), 43, er)
                  ], 64))), 128)),
                  B.key === "before" ? (u(!0), h(K, { key: 0 }, J(v.value, (F) => (u(), h("span", {
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
                  class: ie(["dc-header__search dc-mono", { "dc-header__search--between": ee.value }]),
                  style: re({ "--dc-typed": String(Math.max(1, w(n).draft.value.length)) }),
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
                  onBlur: ze
                }, null, 46, tr)), [
                  [Ja, w(n).draft.value]
                ]) : T("", !0)
              ], 64))), 128))
            ], 40, Xl)
          ], 32)
        ])
      ]),
      j(Il, {
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
          (u(!0), h(K, null, J(x.value, (B, F) => (u(), h("div", {
            id: X(F),
            key: B.label,
            class: ie(["dc-completion", { "dc-completion--active": F === P.value }]),
            role: "option",
            "aria-selected": F === P.value,
            onMousedown: A[8] || (A[8] = Le(() => {
            }, ["prevent"])),
            onClick: (Re) => E(B)
          }, [
            S("span", ar, L(B.label), 1),
            B.hint ? (u(), h("span", sr, L(B.hint), 1)) : T("", !0)
          ], 42, nr))), 128))
        ]),
        _: 1
      }, 8, ["open", "anchor"]),
      t.actions ? (u(), h("div", lr, [
        G(C.$slots, "actions", {}, void 0, !0)
      ])) : T("", !0)
    ]));
  }
}), Ia = /* @__PURE__ */ z(rr, [["__scopeId", "data-v-ecff2b99"]]), or = ["checked", "indeterminate"], Ra = /* @__PURE__ */ W({
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
    }, null, 40, or));
  }
}), ir = { class: "dc-pick" }, cr = ["id"], ur = ["id", "aria-expanded", "aria-labelledby", "data-dc-value"], dr = {
  key: 0,
  class: "dc-pick__icon",
  viewBox: "0 0 16 16",
  "aria-hidden": "true"
}, fr = ["d"], vr = { class: "dc-pick__label" }, pr = /* @__PURE__ */ W({
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
    return (b, E) => (u(), h("span", ir, [
      S("span", {
        id: `${w(s)}-name`,
        class: "dc-pick__name"
      }, L(e.label), 9, cr),
      S("button", {
        id: `${w(s)}-value`,
        ref_key: "trigger",
        ref: l,
        type: "button",
        class: ie(["dc-pick__button", { "dc-mono": e.mono }]),
        "aria-haspopup": "menu",
        "aria-expanded": c.value,
        "aria-labelledby": `${w(s)}-name ${w(s)}-value`,
        "data-dc-value": e.modelValue,
        onClick: k,
        onKeydown: P
      }, [
        v.value?.icon ? (u(), h("svg", dr, [
          S("path", {
            d: v.value.icon
          }, null, 8, fr)
        ])) : T("", !0),
        S("span", vr, L(v.value?.label), 1)
      ], 42, ur),
      E[1] || (E[1] = S("svg", {
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
        j(w(ls), {
          ref_key: "menu",
          ref: o,
          class: "dc-pick__list",
          style: re(y.value),
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
}), nn = /* @__PURE__ */ z(pr, [["__scopeId", "data-v-0e31a711"]]), hr = {
  class: "dc-pager",
  "aria-label": "Pages"
}, mr = ["title"], yr = ["value", "onKeydown"], gr = {
  class: "dc-pager__total",
  "aria-hidden": "true"
}, _r = {
  class: "dc-pager__sr",
  "aria-live": "polite"
}, wr = /* @__PURE__ */ W({
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
    return (y, g) => (u(), h("nav", hr, [
      j(se, {
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
          style: re({ width: r.value }),
          value: i.value,
          onFocus: c,
          onInput: d,
          onKeydown: [
            Me(Le(v, ["prevent"]), ["enter"]),
            Me(Le(_, ["prevent"]), ["esc"])
          ],
          onBlur: v
        }, null, 44, yr),
        S("span", gr, "/ " + L(s.value), 1)
      ], 8, mr),
      S("span", _r, L(l.value), 1),
      j(se, {
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
}), kr = /* @__PURE__ */ z(wr, [["__scopeId", "data-v-bdec7640"]]), br = {
  key: 0,
  class: "dc-actions__order"
}, $r = {
  key: 1,
  class: "dc-actions__select"
}, xr = {
  key: 0,
  class: "dc-actions__all"
}, Sr = {
  class: "dc-actions__count",
  "aria-live": "polite"
}, Cr = {
  key: 1,
  class: "dc-actions__count dc-actions__all",
  "aria-live": "polite"
}, Pr = { class: "dc-actions__ops" }, Er = ["disabled"], Mr = ["data-dc-operation", "disabled", "onClick"], Lr = ["disabled"], Tr = /* @__PURE__ */ W({
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
      () => !ra(n.query.value, t.views) && a.value !== "record"
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
      class: ie(["dc-actions", { "dc-actions--selection-end": x.value }])
    }, [
      s.value ? (u(), h("span", br, [
        o.value ? (u(), I(nn, {
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
          default: Y(() => [
            te(L(i.value ? "↓" : "↑"), 1)
          ]),
          _: 1
        }, 8, ["aria-label", "title", "href"])
      ])) : T("", !0),
      g.value && P.value ? (u(), h("div", $r, [
        p.value ? (u(), h("span", Cr, L(P.value), 1)) : (u(), h("label", xr, [
          j(Ra),
          S("span", Sr, L(P.value), 1)
        ])),
        y.value ? (u(), h("button", {
          key: 2,
          type: "button",
          class: ie(["dc-actions__clear", { "dc-actions__clear--op": x.value }]),
          onClick: E[1] || (E[1] = (O) => w(n).clearSelection())
        }, " Clear ", 2)) : T("", !0)
      ])) : T("", !0),
      S("div", Pr, [
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
        }, L(m(c.value.duplicate)), 9, Er)) : T("", !0),
        (u(!0), h(K, null, J(c.value?.operations ?? [], (O) => (u(), h("button", {
          key: O.key,
          type: "button",
          class: "dc-actions__op",
          "data-dc-operation": O.key,
          disabled: !y.value && O.selection !== !1,
          onClick: (X) => w(n).operate(O.key)
        }, L(O.selection === !1 ? O.label : m(O.label)), 9, Mr))), 128)),
        c.value?.delete ? (u(), h("button", {
          key: 2,
          type: "button",
          class: "dc-actions__op dc-actions__danger",
          disabled: !y.value,
          onClick: E[4] || (E[4] = (O) => w(n).delete())
        }, L(m(c.value.delete)), 9, Lr)) : T("", !0)
      ]),
      _.value ? (u(), I(kr, {
        key: 2,
        class: "dc-actions__pages",
        "pages-note": e.pagesNote
      }, null, 8, ["pages-note"])) : T("", !0)
    ], 2)) : T("", !0);
  }
}), an = /* @__PURE__ */ z(Tr, [["__scopeId", "data-v-95bd2f88"]]);
function Or(e) {
  const t = he(/* @__PURE__ */ new Map()), n = H(!0);
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
      const k = Ca(p, c.expr), P = _ ? pn(_, k) : k;
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
  return ea() && Ct(l), { counts: t, pristine: n, refresh: o, cancel: l };
}
const Nr = {
  key: 0,
  class: "dc-choosers"
}, Ar = "…", Ir = /* @__PURE__ */ W({
  __name: "RecordChoosers",
  props: {
    views: {},
    typeChooser: {}
  },
  setup(e) {
    const t = e, n = ne(), a = f(
      () => n.hasFacets.value || !!n.liveQuery.value.expr.trim() || !!n.within.value
    ), s = Or({
      source: n.source,
      schema: n.schema,
      // What each type holds of what is on screen, the draft's results included:
      // a count of the committed query would disagree with the rows under it.
      query: n.liveQuery,
      entities: n.entities,
      within: n.within
    });
    function l(y) {
      if (y.key === n.query.value.entity && a.value) return Je(n.total.value);
      if (s.pristine.value) return Yt(y);
      const p = s.counts.value.get(y.key);
      return p ? p.counted ? `${p.pending ? "~" : ""}${Je(p.total)}` : Ar : Yt(y);
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
        label: y === "record" ? n.recordView.value?.label ?? Ln.record : Ln[y],
        icon: gs[y]
      }))
    ), d = f(() => Fe(n.query.value.view, t.views)), v = f(() => c.value.length > 1);
    function _(y) {
      n.setView(y);
    }
    return (y, g) => i.value || v.value ? (u(), h("div", Nr, [
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
}), Rr = /* @__PURE__ */ z(Ir, [["__scopeId", "data-v-5a44a2f3"]]);
function Br(e, t) {
  if (!e) return null;
  const n = oe(e, t);
  return typeof n == "string" && n.trim() ? n : null;
}
const Hr = (e) => e == null || typeof e == "string" && !e.trim();
function qr(e, t) {
  const n = ve(t, "state"), a = ve(t, "tint");
  return {
    identity: mt(ve(t, "identity"), e),
    reference: mt(ve(t, "reference"), e),
    metrics: oa(t, "metric").map((s) => ({
      column: s,
      label: s.label ?? "",
      text: Te(s, e)
    })),
    facts: t.filter((s) => s.cardLabel && !Hr(oe(s, e))).map((s) => ({
      column: s,
      label: s.cardLabel,
      title: [s.label, s.hint].filter(Boolean).join(" — "),
      text: Te(s, e)
    })),
    state: n ? oe(n, e) ?? null : null,
    updated: mt(ve(t, "updated"), e),
    image: Br(ve(t, "image"), e),
    tint: a ? oe(a, e) ?? null : null
  };
}
function Ba(e, t, n, a, s = !1) {
  const l = n?.columns ?? [];
  return {
    row: e,
    key: Ss(e, t),
    entityLabel: e.entityLabel,
    entity: n,
    columns: l,
    ordinal: ds(t),
    parts: qr(e, l),
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
      (n, a) => Ba(
        n,
        e.offset.value + a,
        t.value.get(n.entityKey) ?? null,
        e.isPinned(n),
        e.isSelected(n)
      )
    )
  );
}
const Fr = ["data-dc-status", "data-dc-tone"], Vr = /* @__PURE__ */ W({
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
    }, L(n.value), 9, Fr));
  }
}), De = /* @__PURE__ */ z(Vr, [["__scopeId", "data-v-686eb9b6"]]), Dr = { key: 1 }, Kr = /* @__PURE__ */ W({
  __name: "MetricDrill",
  props: {
    entry: {},
    column: {}
  },
  setup(e) {
    const t = e, n = ne(), a = f(() => !t.entry.entity?.scope || !t.column.drill ? null : n.entities.value.find((c) => c.key === t.column.drill) ?? null), s = f(() => t.column.label ?? ""), l = f(() => Te(t.column, t.entry.row)), o = f(
      () => a.value ? n.drillHref(t.entry.row, a.value, t.column.drillWhere) : null
    );
    function i(r, c) {
      c.stopPropagation(), a.value && n.drill(t.entry.row, a.value, r, t.column.drillWhere);
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
    }, 8, ["href", "title"])) : (u(), h("span", Dr, [
      G(r.$slots, "default", {}, () => [
        te(L(l.value), 1)
      ], !0)
    ]));
  }
}), ft = /* @__PURE__ */ z(Kr, [["__scopeId", "data-v-a67bfef1"]]), Wr = ["data-dc-active", "aria-pressed", "aria-label"], zr = /* @__PURE__ */ W({
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
    }, L(e.pinned ? "★" : "☆"), 9, Wr));
  }
}), wn = /* @__PURE__ */ z(zr, [["__scopeId", "data-v-ef63d763"]]), jr = ["src"], Ur = /* @__PURE__ */ W({
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
    }, null, 40, jr)) : T("", !0);
  }
}), Ht = /* @__PURE__ */ z(Ur, [["__scopeId", "data-v-afaab300"]]), Qr = ["data-dc-standing", "title", "aria-label"], Gr = /* @__PURE__ */ W({
  __name: "QueryMark",
  props: {
    entry: {}
  },
  setup(e) {
    const t = e, n = ne(), a = f(() => ut(t.entry.entity, t.entry.row)), s = f(() => gn(n.query.value.expr, a.value)), l = f(
      () => s.value === "in" ? `The query narrows to ${t.entry.parts.identity} — press to lift that` : `The query leaves out ${t.entry.parts.identity} — press to lift that`
    );
    function o(i) {
      i.stopPropagation(), n.setExpression(xa(n.query.value.expr, a.value));
    }
    return (i, r) => s.value ? (u(), h("button", {
      key: 0,
      type: "button",
      class: "dc-standing",
      "data-dc-standing": s.value,
      title: l.value,
      "aria-label": l.value,
      onClick: o
    }, L(s.value === "in" ? "+" : "−"), 9, Qr)) : T("", !0);
  }
}), kn = /* @__PURE__ */ z(Gr, [["__scopeId", "data-v-4b8d4166"]]), Yr = ["aria-label"], Xr = ["data-dc-standing", "data-dc-active", "aria-checked", "title", "aria-label", "onClick"], Jr = /* @__PURE__ */ W({
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
      }, L(c.sign), 9, Xr))), 128))
    ], 8, Yr));
  }
}), sn = /* @__PURE__ */ z(Jr, [["__scopeId", "data-v-5524dca6"]]), Ha = /* @__PURE__ */ W({
  __name: "RowStanding",
  props: {
    entry: {}
  },
  setup(e) {
    const t = e, n = ne(), a = f(() => ut(t.entry.entity, t.entry.row)), s = f(() => gn(n.query.value.expr, a.value));
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
}), Zr = ["href", "title", "aria-label"], eo = /* @__PURE__ */ W({
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
    }, "↗", 8, Zr)) : T("", !0);
  }
}), vt = /* @__PURE__ */ z(eo, [["__scopeId", "data-v-b00f390d"]]), to = /* @__PURE__ */ W({
  __name: "ScopeMark",
  props: {
    entry: {}
  },
  setup(e) {
    const t = e, n = ne(), a = f(
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
}), pt = /* @__PURE__ */ z(to, [["__scopeId", "data-v-05d2c233"]]), no = ["checked", "aria-label"], Ae = /* @__PURE__ */ W({
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
    }, null, 8, no));
  }
}), ao = { class: "dc-card__top dc-mono" }, so = { class: "dc-card__lead" }, lo = {
  key: 2,
  class: "dc-card__entity"
}, ro = { class: "dc-card__top-right" }, oo = { class: "dc-card__names" }, io = { class: "dc-card__primary" }, co = {
  key: 0,
  class: "dc-card__secondary dc-mono"
}, uo = {
  key: 1,
  class: "dc-card__facts dc-mono"
}, fo = ["title"], vo = { class: "dc-card__fact-label" }, po = {
  key: 0,
  class: "dc-card__metrics dc-mono"
}, ho = {
  key: 0,
  class: "dc-card__date"
}, mo = /* @__PURE__ */ W({
  __name: "CardsView",
  setup(e) {
    const t = ne(), n = Ne(), a = f(() => t.isEverything.value), s = (o) => o.entity?.card === "picture", l = f(() => n.value.length > 0 && n.value.every(s));
    return (o, i) => (u(), h("div", {
      class: ie(["dc-cards", { "dc-cards--pictures": l.value }])
    }, [
      (u(!0), h(K, null, J(w(n), (r) => (u(), h("div", {
        key: r.key,
        class: ie(["dc-card", { "dc-card--picture": s(r) }])
      }, [
        S("div", ao, [
          S("span", so, [
            w(t).selectable.value ? (u(), I(Ae, {
              key: 0,
              row: r.row,
              selected: r.selected,
              name: r.parts.identity
            }, null, 8, ["row", "selected", "name"])) : T("", !0),
            s(r) ? T("", !0) : (u(), h(K, { key: 1 }, [
              te(L(r.ordinal), 1)
            ], 64)),
            a.value ? (u(), h("span", lo, L(r.entityLabel), 1)) : T("", !0)
          ]),
          S("span", ro, [
            r.parts.state && !s(r) ? (u(), I(De, {
              key: 0,
              status: r.parts.state
            }, null, 8, ["status"])) : T("", !0),
            s(r) ? (u(), I(kn, {
              key: 1,
              entry: r
            }, null, 8, ["entry"])) : (u(), I(Ha, {
              key: 2,
              entry: r
            }, null, 8, ["entry"])),
            j(pt, { entry: r }, null, 8, ["entry"]),
            j(vt, { entry: r }, null, 8, ["entry"]),
            w(t).pinnable.value ? (u(), I(wn, {
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
          default: Y(() => [
            r.parts.image ? (u(), I(Ht, {
              key: 0,
              class: "dc-card__image",
              src: r.parts.image
            }, null, 8, ["src"])) : T("", !0),
            S("span", oo, [
              S("span", io, L(r.parts.identity), 1),
              s(r) ? T("", !0) : (u(), h("span", co, L(r.parts.reference), 1)),
              r.parts.facts.length ? (u(), h("span", uo, [
                (u(!0), h(K, null, J(r.parts.facts, (c) => (u(), h("span", {
                  key: c.column.key ?? c.label,
                  class: "dc-card__fact",
                  title: c.title || void 0
                }, [
                  S("span", vo, L(c.label), 1),
                  te(" " + L(c.text), 1)
                ], 8, fo))), 128))
              ])) : T("", !0)
            ])
          ]),
          _: 2
        }, 1032, ["href", "onPress"]),
        s(r) ? T("", !0) : (u(), h("div", po, [
          (u(!0), h(K, null, J(r.parts.metrics.slice(0, 2), (c) => (u(), I(ft, {
            key: c.column.key ?? c.label,
            entry: r,
            column: c.column
          }, {
            default: Y(() => [
              te(L(c.label) + " " + L(c.text), 1)
            ]),
            _: 2
          }, 1032, ["entry", "column"]))), 128)),
          r.parts.updated ? (u(), h("span", ho, L(r.parts.updated), 1)) : T("", !0)
        ]))
      ], 2))), 128))
    ], 2));
  }
}), qa = /* @__PURE__ */ z(mo, [["__scopeId", "data-v-fd252138"]]), yo = { class: "dc-grid" }, go = { class: "dc-tile__scrim" }, _o = { class: "dc-tile__top dc-mono" }, wo = { class: "dc-tile__chip" }, ko = { class: "dc-tile__caption" }, bo = { class: "dc-tile__secondary dc-truncate" }, $o = { class: "dc-tile__primary" }, xo = /* @__PURE__ */ W({
  __name: "GridView",
  setup(e) {
    const t = ne(), n = Ne();
    return (a, s) => (u(), h("div", yo, [
      (u(!0), h(K, null, J(w(n), (l) => (u(), h("div", {
        key: l.key,
        class: "dc-grid__cell"
      }, [
        j(se, {
          class: "dc-tile",
          style: re({ "--dc-tile-tint": l.parts.tint ?? void 0 }),
          href: w(t).pressHref(l.row),
          onPress: (o) => w(t).activate(l.row, o)
        }, {
          default: Y(() => [
            l.parts.image ? (u(), I(Ht, {
              key: 0,
              class: "dc-tile__image",
              src: l.parts.image
            }, null, 8, ["src"])) : T("", !0),
            S("span", go, [
              S("span", _o, [
                S("span", wo, L(l.ordinal), 1)
              ]),
              S("span", ko, [
                S("span", bo, L(l.parts.reference), 1),
                S("span", $o, L(l.parts.identity), 1)
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
}), Fa = /* @__PURE__ */ z(xo, [["__scopeId", "data-v-89c40a9e"]]);
function Un(e, t, n, a) {
  return (n - a * (t - 1)) / e;
}
function jt(e, t) {
  return e > 0 ? Math.min(t, e) : t;
}
function So(e) {
  return e > 0 ? e : 1 / 0;
}
function Co(e, t, n) {
  const { width: a, height: s, gap: l = 0 } = n;
  if (!e.length) return [];
  if (!(a > 0) || !(s > 0)) return [{ items: [...e], height: s, filled: !1 }];
  const o = [];
  let i = [], r = 0, c = 0;
  for (const d of e) {
    const v = t(d), _ = Math.max(v.ratio, Number.EPSILON), y = v.height && v.height > 0 ? Math.max(c, v.height) : c, g = jt(y, s), p = Un(r + _, i.length + 1, a, l);
    if (p > g) {
      i.push(d), r += _, c = y;
      continue;
    }
    const k = jt(c, s), P = i.length ? Un(r, i.length, a, l) : 1 / 0;
    P <= So(c) && P - k < g - p ? (o.push({ items: i, height: P, filled: !0 }), i = [d], r = _, c = v.height && v.height > 0 ? v.height : 0) : (o.push({ items: [...i, d], height: p, filled: !0 }), i = [], r = 0, c = 0);
  }
  return i.length && o.push({ items: i, height: jt(c, s), filled: !1 }), o;
}
const Po = { class: "dc-images" }, Eo = {
  key: 1,
  class: "dc-images__blank",
  "aria-hidden": "true"
}, Mo = 240, ht = 8, Lo = 1, To = /* @__PURE__ */ W({
  __name: "ImagesView",
  setup(e) {
    const t = ne(), n = Ne(), a = Sn(/* @__PURE__ */ new Map()), s = Sn(/* @__PURE__ */ new Set());
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
      return p ? { ratio: p.width / p.height, height: p.height } : { ratio: Lo };
    }
    const c = H(null), d = H(0);
    let v = null;
    function _() {
      d.value = c.value?.clientWidth ?? 0;
    }
    it(() => {
      _(), !(!c.value || typeof ResizeObserver > "u") && (v = new ResizeObserver(_), v.observe(c.value));
    }), ge(() => {
      v?.disconnect(), v = null;
    });
    const y = f(() => {
      const g = Co(n.value, r, {
        width: d.value,
        height: Mo,
        gap: ht
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
          }), x += b + ht;
        }
        k += P.height + ht;
      }
      return { boxes: p, height: g.length ? k - ht : 0 };
    });
    return (g, p) => (u(), h("div", Po, [
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
          j(se, {
            class: "dc-images__open",
            title: k.parts.identity,
            "aria-label": k.parts.identity,
            href: w(t).pressHref(k.row),
            onPress: (m) => w(t).activate(k.row, m)
          }, {
            default: Y(() => [
              o(k) ? (u(), I(Ht, {
                key: 0,
                class: "dc-images__picture",
                style: re(x),
                src: o(k),
                onLoad: (m) => l(o(k), m),
                onError: (m) => s.add(o(k))
              }, null, 8, ["style", "src", "onLoad", "onError"])) : (u(), h("span", Eo, L(k.parts.identity), 1))
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
}), Va = /* @__PURE__ */ z(To, [["__scopeId", "data-v-2d267370"]]), Oo = { class: "dc-links" }, No = { class: "dc-link__primary dc-truncate" }, Ao = { class: "dc-link__secondary dc-mono dc-truncate" }, Io = /* @__PURE__ */ W({
  __name: "LinksView",
  setup(e) {
    const t = ne(), n = Ne();
    return (a, s) => (u(), h("div", Oo, [
      (u(!0), h(K, null, J(w(n), (l) => (u(), h("span", {
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
          default: Y(() => [
            S("span", No, L(l.parts.identity), 1),
            S("span", Ao, L(l.parts.reference), 1)
          ]),
          _: 2
        }, 1032, ["href", "onPress"])
      ]))), 128))
    ]));
  }
}), Da = /* @__PURE__ */ z(Io, [["__scopeId", "data-v-de6c9a0f"]]), Ro = {
  class: "dc-list",
  role: "list"
}, Bo = { class: "dc-list__ordinal dc-mono" }, Ho = { class: "dc-list__identity" }, qo = { class: "dc-list__primary dc-truncate" }, Fo = { class: "dc-list__secondary dc-mono dc-truncate" }, Vo = {
  key: 1,
  class: "dc-list__entity dc-mono"
}, Do = { class: "dc-list__metrics dc-mono" }, Ko = { class: "dc-list__trailing" }, Wo = /* @__PURE__ */ W({
  __name: "ListView",
  setup(e) {
    const t = ne(), n = Ne(), a = f(() => t.isEverything.value);
    return (s, l) => (u(), h("div", Ro, [
      (u(!0), h(K, null, J(w(n), (o) => (u(), h("div", {
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
        j(Ha, {
          class: "dc-list__standing",
          entry: o
        }, null, 8, ["entry"]),
        j(se, {
          class: "dc-list__open",
          href: w(t).pressHref(o.row),
          onPress: (i) => w(t).activate(o.row, i)
        }, {
          default: Y(() => [
            S("span", Bo, L(o.ordinal), 1),
            S("span", Ho, [
              S("span", qo, L(o.parts.identity), 1),
              S("span", Fo, L(o.parts.reference), 1)
            ])
          ]),
          _: 2
        }, 1032, ["href", "onPress"]),
        a.value ? (u(), h("span", Vo, L(o.entityLabel), 1)) : T("", !0),
        S("span", Do, [
          (u(!0), h(K, null, J(o.parts.metrics.slice(0, 2), (i) => (u(), I(ft, {
            key: i.column.key ?? i.label,
            entry: o,
            column: i.column
          }, null, 8, ["entry", "column"]))), 128))
        ]),
        S("span", Ko, [
          o.parts.state ? (u(), I(De, {
            key: 0,
            status: o.parts.state
          }, null, 8, ["status"])) : T("", !0),
          j(pt, { entry: o }, null, 8, ["entry"]),
          j(vt, { entry: o }, null, 8, ["entry"]),
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
}), ln = /* @__PURE__ */ z(Wo, [["__scopeId", "data-v-3d349a10"]]), zo = { class: "dc-preview" }, jo = { class: "dc-preview__pager dc-mono" }, Uo = ["disabled"], Qo = { "aria-live": "polite" }, Go = ["disabled"], Yo = {
  key: 0,
  class: "dc-preview__card"
}, Xo = ["src"], Jo = { class: "dc-preview__body" }, Zo = { class: "dc-preview__top" }, ei = { class: "dc-preview__badges" }, ti = { class: "dc-preview__entity dc-mono" }, ni = { class: "dc-preview__marks" }, ai = { class: "dc-preview__primary" }, si = { class: "dc-preview__secondary dc-mono" }, li = { class: "dc-preview__fields" }, ri = { class: "dc-preview__key" }, oi = { class: "dc-preview__value dc-mono" }, ii = /* @__PURE__ */ W({
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
    return (r, c) => (u(), h("div", zo, [
      S("div", jo, [
        S("button", {
          type: "button",
          class: "dc-preview__step",
          "aria-label": "Previous result",
          disabled: a.value === 0,
          onClick: c[0] || (c[0] = (d) => i(-1))
        }, " ‹ ", 8, Uo),
        S("span", Qo, L(o.value), 1),
        S("button", {
          type: "button",
          class: "dc-preview__step",
          "aria-label": "Next result",
          disabled: a.value >= w(n).length - 1,
          onClick: c[1] || (c[1] = (d) => i(1))
        }, " › ", 8, Go)
      ]),
      s.value ? (u(), h("div", Yo, [
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
          }, null, 8, Xo)) : (u(), h(K, { key: 1 }, [
            te(" preview ")
          ], 64))
        ], 4),
        S("div", Jo, [
          S("div", Zo, [
            S("span", ei, [
              w(t).selectable.value ? (u(), I(Ae, {
                key: 0,
                row: s.value.row,
                selected: s.value.selected,
                name: s.value.parts.identity
              }, null, 8, ["row", "selected", "name"])) : T("", !0),
              s.value.parts.state ? (u(), I(De, {
                key: 1,
                status: s.value.parts.state
              }, null, 8, ["status"])) : T("", !0),
              S("span", ti, L(s.value.entityLabel), 1)
            ]),
            S("span", ni, [
              j(kn, { entry: s.value }, null, 8, ["entry"]),
              j(pt, { entry: s.value }, null, 8, ["entry"]),
              j(vt, { entry: s.value }, null, 8, ["entry"]),
              w(t).pinnable.value ? (u(), I(wn, {
                key: 0,
                row: s.value.row,
                name: s.value.parts.identity,
                pinned: s.value.pinned
              }, null, 8, ["row", "name", "pinned"])) : T("", !0)
            ])
          ]),
          S("div", null, [
            S("div", ai, L(s.value.parts.identity), 1),
            S("div", si, L(s.value.parts.reference), 1)
          ]),
          S("dl", li, [
            (u(!0), h(K, null, J(l.value, (d) => (u(), h("div", {
              key: d.key,
              class: "dc-preview__field"
            }, [
              S("dt", ri, L(d.key), 1),
              S("dd", oi, [
                d.column && s.value ? (u(), I(ft, {
                  key: 0,
                  entry: s.value,
                  column: d.column
                }, null, 8, ["entry", "column"])) : (u(), h(K, { key: 1 }, [
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
            default: Y(() => [...c[3] || (c[3] = [
              te(" Open record → ", -1)
            ])]),
            _: 1
          }, 8, ["href"])
        ])
      ])) : T("", !0)
    ]));
  }
}), Ka = /* @__PURE__ */ z(ii, [["__scopeId", "data-v-59e0d33b"]]);
function ci(e) {
  const t = le(e);
  return t.length !== 1 ? /* @__PURE__ */ new Set() : new Set(
    t[0].flatMap(
      (n) => n.kind === "field" && n.comparator === "=" && !n.negated && !Ve(n) ? [n.field.toLowerCase()] : []
    )
  );
}
function ui(e, t, n) {
  const a = ci(t);
  return a.size ? e.filter((s) => {
    const l = (s.key ?? s.field)?.toLowerCase();
    return l === void 0 || !a.has(l) || s.role === "identity" ? !0 : n.some((o) => Array.isArray(oe(s, o)));
  }) : e;
}
function di() {
  const e = ne();
  return f(
    () => ui(
      $s(e.schema.value, e.entity.value),
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
function Wa(e, t) {
  const n = e.narrowsOnPress.value ? ut(t.entity, t.row) : null;
  return n ? { term: n, name: t.parts.identity } : null;
}
const fi = /* @__PURE__ */ W({
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
      return v.entity !== void 0 ? `entity:${v.entity}` : ye({ ...v.term, ..._ ? { negated: !0 } : {} });
    }
    function l(v, _ = !1) {
      return v.entity !== void 0 ? n.query.value.expr : at(n.query.value.expr, s(v, _));
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
      class: ie(["dc-cell__text", { "dc-truncate": e.truncates }])
    }, [
      (u(!0), h(K, null, J(e.narrowings, (y, g) => (u(), h(K, {
        key: s(y)
      }, [
        g > 0 ? (u(), h(K, { key: 0 }, [
          te(", ")
        ], 64)) : T("", !0),
        j(se, qe({
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
}), Qn = /* @__PURE__ */ z(fi, [["__scopeId", "data-v-6e649daa"]]), vi = /* @__PURE__ */ new Set(["entitykey", "entitylabel"]), pi = /* @__PURE__ */ new Set(["ordinal", "image", "component", "date"]), hi = 4;
function za(e) {
  return (e.field ?? e.key)?.toLowerCase();
}
function ja(e) {
  return e.narrow === !1 || e.role === "identity" || e.activate || e.click || e.drill ? !1 : !pi.has(e.kind ?? "text") && za(e) !== void 0;
}
function mi(e, t) {
  if (Number.isInteger(e)) return e;
  const n = 10 ** hi;
  return (t ? Math.ceil(e * n - 1e-6) : Math.floor(e * n + 1e-6)) / n;
}
function yi(e, t) {
  let n = 1 / 0, a = -1 / 0;
  for (const s of t) {
    const l = oe(e, s);
    typeof l != "number" || !Number.isFinite(l) || (l < n && (n = l), l > a && (a = l));
  }
  return n <= a ? { min: n, max: a } : null;
}
function gi(e, t, n, a = null) {
  if (!ja(e)) return [];
  const s = za(e);
  if (vi.has(s) && !e.value)
    return t.entityKey ? [{ label: null, entity: t.entityKey }] : [];
  if (e.flags)
    return Object.entries(e.flags).filter(([r]) => t.fields[r] === !0).map(([r, c]) => ({
      label: c,
      term: { kind: "field", field: r.toLowerCase(), comparator: ":", value: "true" }
    }));
  const l = oe(e, t), o = n?.facets.find((r) => r.key.toLowerCase() === s);
  if (typeof l == "number") {
    if (!Number.isFinite(l)) return [];
    const r = o?.kind === "range" ? { min: o.min, max: o.max } : a, c = e.narrow === "<=" || e.narrow !== ">=" && (!r || l - r.min <= r.max - l);
    return [{
      label: null,
      term: { kind: "field", field: s, comparator: c ? "<=" : ">=", value: String(mi(l, c)) }
    }];
  }
  return (Array.isArray(l) ? l : [l]).filter(
    (r) => typeof r == "string" && r !== ""
  ).map((r) => ({
    label: Array.isArray(l) ? r : null,
    term: { kind: "field", field: s, comparator: "=", value: r }
  }));
}
const Gn = /* @__PURE__ */ new WeakMap();
function _i(e, t) {
  let n = Gn.get(e);
  return n || Gn.set(e, n = /* @__PURE__ */ new Map()), n.has(t) || n.set(t, yi(t, e)), n.get(t);
}
const wi = /* @__PURE__ */ W({
  __name: "ColumnCell",
  props: {
    column: {},
    entry: {}
  },
  setup(e) {
    const t = e, n = ne(), a = f(() => t.column.kind ?? "text"), s = f(() => oe(t.column, t.entry.row)), l = f(
      () => a.value === "ordinal" ? t.entry.ordinal : Te(t.column, t.entry.row)
    ), o = f(() => s.value), i = f(() => t.column.activate === !0 || !!t.column.click), r = f(() => Xt(t.column)), c = f(() => ia(t.column, t.entry.row)), d = f(() => {
      if (!ja(t.column)) return [];
      const g = typeof s.value == "number" ? _i(n.rows.value, t.column) : null;
      return gi(t.column, t.entry.row, t.entry.entity ?? null, g);
    });
    function v(g) {
      i.value && (g.stopPropagation(), _(st(g)));
    }
    function _(g) {
      t.column.click?.(t.entry.row, g), t.column.activate && n.activate(t.entry.row, g);
    }
    const y = f(
      () => t.column.activate && !t.column.click ? n.pressHref(t.entry.row) : null
    );
    return (g, p) => a.value === "component" && e.column.component ? (u(), I(Xe(e.column.component), {
      key: 0,
      row: e.entry.row,
      entry: e.entry,
      value: s.value,
      column: e.column
    }, null, 8, ["row", "entry", "value", "column"])) : a.value === "status" && d.value.length ? (u(), I(Qn, {
      key: 1,
      entry: e.entry,
      column: e.column,
      narrowings: d.value,
      truncates: !1
    }, {
      default: Y(() => [
        j(De, { status: o.value }, null, 8, ["status"])
      ]),
      _: 1
    }, 8, ["entry", "column", "narrowings"])) : a.value === "status" ? (u(), I(De, {
      key: 2,
      status: o.value
    }, null, 8, ["status"])) : a.value === "image" ? (u(), I(Ht, {
      key: 3,
      class: "dc-cell__image",
      src: typeof s.value == "string" ? s.value : "",
      style: re({ maxHeight: e.column.height }),
      onClick: v
    }, null, 8, ["src", "style"])) : e.column.drill ? (u(), I(ft, {
      key: 4,
      entry: e.entry,
      column: e.column
    }, null, 8, ["entry", "column"])) : i.value ? (u(), I(se, qe({
      key: 5,
      class: ["dc-table__open", { "dc-truncate": r.value }],
      href: y.value,
      title: c.value
    }, cn(e.column.activate ? w(bn)(w(n), w(Wa)(w(n), e.entry)) : {}), {
      onPress: p[0] || (p[0] = (k, P) => {
        P.stopPropagation(), _(k);
      })
    }), {
      default: Y(() => [
        te(L(l.value), 1)
      ]),
      _: 1
    }, 16, ["class", "href", "title"])) : d.value.length ? (u(), I(Qn, {
      key: 6,
      entry: e.entry,
      column: e.column,
      narrowings: d.value,
      truncates: r.value
    }, null, 8, ["entry", "column", "narrowings", "truncates"])) : (u(), h("span", {
      key: 7,
      class: ie(["dc-cell__text", { "dc-truncate": r.value }])
    }, L(l.value), 3));
  }
}), Yn = /* @__PURE__ */ z(wi, [["__scopeId", "data-v-4b81f005"]]), ki = {
  key: 0,
  class: "dc-table__none"
}, bi = { class: "dc-table__detail" }, $i = ["data-dc-wrap", "data-dc-row-links"], xi = {
  key: 0,
  class: "dc-table__pick",
  scope: "col"
}, Si = {
  key: 1,
  class: "dc-table__standing",
  scope: "col"
}, Ci = ["data-dc-align", "data-dc-hide", "aria-sort", "title"], Pi = {
  key: 2,
  class: "dc-table__head"
}, Ei = ["onClick"], Mi = {
  key: 0,
  class: "dc-table__pick"
}, Li = {
  key: 1,
  class: "dc-table__standing"
}, Ti = ["data-dc-align", "data-dc-hide", "title"], Oi = {
  key: 1,
  class: "dc-table__name"
}, Ni = /* @__PURE__ */ W({
  __name: "TableView",
  setup(e) {
    const t = ne(), n = Ne(), a = di();
    function s(M, Q) {
      if (!t.rowLinks?.value || Sa()) return;
      const N = t.pressHref(M);
      if (N && en(Q)) {
        Zt(N, Q);
        return;
      }
      t.activate(M, st(Q));
    }
    const l = f(() => t.rowLinks?.value ? new Map(n.value.map((M) => [M.key, t.pressHref(M.row)])) : /* @__PURE__ */ new Map()), o = f(
      () => a.value.find((M) => M.role === "identity") ?? a.value[0]
    );
    function i(M, Q, N) {
      N.stopPropagation(), t.activate(M, Q);
    }
    function r(M) {
      const Q = va(M, t.entity.value, t.schema.value), N = Q ? `Shortcut: ${Q}` : void 0;
      return [M.hint, N].filter(Boolean).join(`
`) || void 0;
    }
    const c = f(() => {
      const M = a.value.find((N) => N.scope);
      return M || ((t.entity.value ? !!t.entity.value.href : t.entities.value.some((N) => N.href)) ? a.value.find((N) => N.activate) : void 0);
    }), d = f(
      () => t.entity.value ? !!t.entity.value.scope : t.entities.value.some((M) => M.scope)
    ), v = (M) => ut(M.entity, M.row), _ = (M) => gn(t.query.value.expr, v(M));
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
    const X = f(() => t.entity.value?.label ?? "The result set"), q = f(() => new Set(t.sorts.value.map((M) => M.key))), D = (M) => M.sort !== void 0 && q.value.has(M.sort), U = (M) => {
      if (D(M))
        return t.query.value.sort !== M.sort ? "none" : t.query.value.dir === "desc" ? "descending" : "ascending";
    };
    function ee(M) {
      return [
        Nn(M),
        M.muted ? "dc-table__muted" : "",
        M.mono ? "dc-mono" : "",
        Xt(M) ? "dc-truncate" : ""
      ].filter(Boolean).join(" ");
    }
    function de(M, Q) {
      if (!(!Xt(M) || M.activate || M.click))
        return ia(M, Q.row);
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
          w(t).selectable.value ? (u(), h("th", xi, [
            j(Ra)
          ])) : T("", !0),
          d.value ? (u(), h("th", Si, [
            g.value.length ? (u(), I(sn, {
              key: 0,
              standing: k.value,
              mixed: P.value,
              name: x.value,
              onSet: m
            }, null, 8, ["standing", "mixed", "name"])) : T("", !0)
          ])) : T("", !0),
          (u(!0), h(K, null, J(w(a), (N, Z) => (u(), h("th", {
            key: w(Tn)(N, Z),
            scope: "col",
            class: ie(w(Nn)(N)),
            style: re({ width: N.width }),
            "data-dc-align": w(On)(N),
            "data-dc-hide": N.hideBelow,
            "aria-sort": U(N),
            title: r(N)
          }, [
            D(N) ? (u(), I(se, {
              key: 0,
              class: "dc-table__sort",
              href: O(N.sort),
              onPress: (fe) => E(N.sort)
            }, {
              default: Y(() => [
                te(L(N.label), 1)
              ]),
              _: 2
            }, 1032, ["href", "onPress"])) : (u(), h(K, { key: 1 }, [
              te(L(N.label), 1)
            ], 64)),
            N.header ? (u(), h("span", Pi, [
              (u(), I(Xe(N.header), {
                column: N,
                entity: w(t).entity.value
              }, null, 8, ["column", "entity"]))
            ])) : T("", !0)
          ], 14, Ci))), 128))
        ])
      ], 512),
      S("tbody", {
        "data-dc-scroll": "",
        onScroll: ke
      }, [
        (u(!0), h(K, null, J(w(n), (N) => (u(), h("tr", {
          key: N.key,
          class: "dc-table__row",
          onClick: (Z) => s(N.row, Z)
        }, [
          w(t).selectable.value ? (u(), h("td", Mi, [
            j(Ae, {
              row: N.row,
              selected: N.selected,
              name: N.parts.identity
            }, null, 8, ["row", "selected", "name"])
          ])) : T("", !0),
          d.value ? (u(), h("td", Li, [
            v(N) !== null ? (u(), I(sn, {
              key: 0,
              standing: _(N),
              name: N.parts.identity,
              onSet: (Z) => y(N, Z)
            }, null, 8, ["standing", "name", "onSet"])) : T("", !0)
          ])) : T("", !0),
          (u(!0), h(K, null, J(w(a), (Z, fe) => (u(), h("td", {
            key: w(Tn)(Z, fe),
            class: ie(ee(Z)),
            style: re({ width: Z.width }),
            "data-dc-align": w(On)(Z),
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
            }, cn(w(bn)(w(t), w(Wa)(w(t), N))), {
              onPress: (We, ze) => i(N.row, We, ze)
            }), null, 16, ["href", "tabindex", "aria-hidden", "aria-label", "onPress"])) : T("", !0),
            Z === c.value ? (u(), h("span", Oi, [
              j(Yn, {
                column: Z,
                entry: N
              }, null, 8, ["column", "entry"]),
              j(pt, { entry: N }, null, 8, ["entry"]),
              j(vt, { entry: N }, null, 8, ["entry"])
            ])) : (u(), I(Yn, {
              key: 2,
              column: Z,
              entry: N
            }, null, 8, ["column", "entry"]))
          ], 14, Ti))), 128))
        ], 8, Ei))), 128))
      ], 32)
    ], 8, $i)) : (u(), h("p", ki, [
      Q[2] || (Q[2] = S("span", { class: "dc-table__headline" }, "No columns declared", -1)),
      S("span", bi, [
        te(L(X.value) + " has no ", 1),
        Q[0] || (Q[0] = S("code", null, "columns", -1)),
        Q[1] || (Q[1] = te(" in the schema, so there is no table to draw. ", -1))
      ])
    ]));
  }
}), Ua = /* @__PURE__ */ z(Ni, [["__scopeId", "data-v-8a634047"]]);
function Ai(e) {
  const t = he([]), n = H(!1), a = he(null);
  let s = 0;
  const l = (r, c, d, v, _) => ({
    entity: r,
    rows: e.limit.value > 0 ? c.rows.map((y, g) => Ba(y, g, r, e.isPinned(y.id))) : [],
    total: c.total,
    count: d ? Yt(r) : Je(c.total),
    pinned: Ii(v, c, _)
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
function Ii(e, t, n) {
  const a = t.rows[0];
  if (t.total !== 1 || t.rows.length !== 1 || !a)
    return !1;
  const s = n.trim();
  if (!s)
    return !1;
  const l = kt(e, a);
  return !!l && dt(s, l) === s;
}
const Ri = ["data-dc-pending", "data-dc-heads-only"], Bi = {
  key: 0,
  class: "dc-types__state",
  role: "alert"
}, Hi = {
  key: 1,
  class: "dc-types__state",
  "aria-live": "polite"
}, qi = {
  key: 2,
  class: "dc-types__state"
}, Fi = ["data-dc-empty"], Vi = { class: "dc-type__name" }, Di = { class: "dc-type__count dc-mono" }, Ki = { class: "dc-type__sr" }, Wi = {
  key: 0,
  class: "dc-type__description"
}, zi = {
  key: 0,
  class: "dc-type__empty"
}, ji = { class: "dc-type__identity" }, Ui = { class: "dc-type__primary dc-truncate" }, Qi = { class: "dc-type__secondary dc-mono dc-truncate" }, Gi = { class: "dc-type__trailing dc-mono" }, Yi = { class: "dc-type__metric-value" }, Xi = { class: "dc-type__metric-label" }, Ji = {
  key: 0,
  class: "dc-type__date"
}, Zi = /* @__PURE__ */ W({
  __name: "TypeCardsView",
  setup(e) {
    const t = ne(), { previews: n, pending: a, error: s } = Ai({
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
      w(s) ? (u(), h("p", Bi, " Could not load results: " + L(w(s) instanceof Error ? w(s).message : "the data source failed."), 1)) : !i.value.length && w(a) ? (u(), h("p", Hi, " Running query… ")) : i.value.length ? T("", !0) : (u(), h("p", qi, L(l.value ? "Nothing matches this query" : "Nothing here yet"), 1)),
      (u(!0), h(K, null, J(i.value, (d) => (u(), h("section", {
        key: d.entity.key,
        class: "dc-type",
        "data-dc-empty": d.total ? "false" : "true"
      }, [
        j(se, {
          class: "dc-type__head",
          href: w(t).entityHref(d.entity.key),
          onPress: (v) => w(t).setEntity(d.entity.key)
        }, {
          default: Y(() => [
            S("span", Vi, L(d.entity.label), 1),
            S("span", Di, L(d.count), 1),
            c[0] || (c[0] = S("span", {
              class: "dc-type__go",
              "aria-hidden": "true"
            }, "→", -1)),
            S("span", Ki, "Show only " + L(d.entity.label.toLowerCase()), 1),
            d.entity.description ? (u(), h("span", Wi, L(d.entity.description), 1)) : T("", !0)
          ]),
          _: 2
        }, 1032, ["href", "onPress"]),
        d.total ? T("", !0) : (u(), h("p", zi, L(l.value ? "No matches" : "Nothing here yet"), 1)),
        (u(!0), h(K, null, J(d.rows, (v) => (u(), h("div", {
          key: v.key,
          class: "dc-type__row"
        }, [
          j(se, {
            class: "dc-type__open",
            href: w(t).pressHref(v.row),
            onPress: (_) => w(t).activate(v.row, _)
          }, {
            default: Y(() => [
              S("span", ji, [
                S("span", Ui, L(v.parts.identity), 1),
                S("span", Qi, L(v.parts.reference), 1)
              ])
            ]),
            _: 2
          }, 1032, ["href", "onPress"]),
          S("span", Gi, [
            (u(!0), h(K, null, J(v.parts.metrics.slice(0, 1), (_) => (u(), I(ft, {
              key: _.column.key ?? _.label,
              class: "dc-type__metric",
              entry: v,
              column: _.column
            }, {
              default: Y(() => [
                S("span", Yi, L(_.text), 1),
                S("span", Xi, L(_.label), 1)
              ]),
              _: 2
            }, 1032, ["entry", "column"]))), 128)),
            v.parts.updated ? (u(), h("span", Ji, L(v.parts.updated), 1)) : T("", !0),
            j(kn, { entry: v }, null, 8, ["entry"]),
            j(pt, { entry: v }, null, 8, ["entry"]),
            j(vt, { entry: v }, null, 8, ["entry"])
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
      ], 8, Fi))), 128)),
      G(r.$slots, "after", {}, void 0, !0)
    ], 8, Ri));
  }
}), Qa = /* @__PURE__ */ z(Zi, [["__scopeId", "data-v-d73c6777"]]), ec = ["data-dc-pending", "data-dc-more"], tc = {
  key: 0,
  class: "dc-results__state dc-results__state--loading",
  "aria-live": "polite"
}, nc = {
  key: 3,
  class: "dc-results__state",
  role: "alert"
}, ac = { class: "dc-results__detail" }, sc = {
  key: 4,
  class: "dc-results__state",
  "aria-live": "polite"
}, lc = {
  key: 5,
  class: "dc-results__state"
}, rc = { class: "dc-results__detail" }, oc = /* @__PURE__ */ W({
  __name: "ResultsArea",
  props: {
    views: {},
    loading: { type: Boolean }
  },
  setup(e) {
    const t = e, n = ne(), a = Et(), s = {
      list: ln,
      cards: qa,
      grid: Fa,
      images: Va,
      table: Ua,
      links: Da,
      preview: Ka
    }, l = f(() => ra(n.query.value, t.views)), o = f(() => Fe(n.query.value.view, t.views)), i = f(() => (o.value === "record" ? null : s[o.value]) ?? ln), r = f(() => o.value === "record" ? n.recordView.value : null), c = f(() => n.rows.value.length > 0), d = f(() => n.error.value !== null), v = H(null);
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
            for (const D of q.children) E.observe(D);
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
      style: re({
        "--dc-results-gutter-x": `${g.value.x}px`,
        "--dc-results-gutter-y": `${g.value.y}px`,
        "--dc-results-stuck": `${p.value}px`
      })
    }, [
      e.loading ? (u(), h("p", tc, [...b[1] || (b[1] = [
        S("span", { class: "dc-results__detail" }, "Loading…", -1)
      ])])) : l.value ? (u(), I(Qa, { key: 1 }, Qt({ _: 2 }, [
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
      ]), 1024)) : r.value?.id ? (u(), I(Xe(r.value.component), {
        key: 2,
        id: r.value.id
      }, null, 8, ["id"])) : d.value ? (u(), h("p", nc, [
        b[2] || (b[2] = S("span", { class: "dc-results__headline" }, "Could not load results", -1)),
        S("span", ac, L(w(n).error.value instanceof Error ? w(n).error.value.message : "The data source failed."), 1)
      ])) : !c.value && w(n).pending.value ? (u(), h("p", sc, [...b[3] || (b[3] = [
        S("span", { class: "dc-results__detail" }, "Running query…", -1)
      ])])) : c.value ? (u(), I(Xe(i.value), { key: 6 })) : (u(), h("div", lc, [
        b[4] || (b[4] = S("span", { class: "dc-results__headline" }, "Nothing matches this query", -1)),
        S("span", rc, L(w(n).summary.value), 1),
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
    ], 12, ec));
  }
}), Ga = /* @__PURE__ */ z(oc, [["__scopeId", "data-v-4484c328"]]), ic = ["data-dc-theme", "data-dc-value-press"], cc = {
  key: 0,
  class: "dc-shell__page"
}, uc = /* @__PURE__ */ W({
  __name: "DataShell",
  props: /* @__PURE__ */ Pn({
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
  emits: /* @__PURE__ */ Pn(["activate", "create", "duplicate", "delete", "operate", "drill", "query-change", "toggle-pin"], ["update:pinned", "update:selected"]),
  setup(e, { expose: t, emit: n }) {
    const a = e, s = n, l = Cn(e, "pinned"), o = Cn(e, "selected"), i = Et(), r = rn(ta, null), c = a.route || r ? null : rs(), d = a.route ?? r ?? c;
    ge(() => c?.dispose?.());
    const v = H(!!i.page);
    Za(() => {
      v.value = !!i.page;
    });
    const _ = os(d, {
      detached: () => v.value && a.pageQuery === "detached",
      path: () => a.listPath
    }), y = f(() => el({ seed: a.schema.key })), g = f(() => a.source ?? y.value), p = kl({
      schema: () => a.schema,
      adapter: _,
      defaults: () => a.defaults,
      navigationMode: () => a.navigationMode,
      facetNavigationMode: () => a.facetNavigationMode
    }), k = f(() => a.within?.trim() ?? ""), P = Sl({
      query: p.query,
      entity: p.entity,
      schema: f(() => a.schema),
      setExpression: p.setExpression
    });
    ae(p.query, ($) => s("query-change", $));
    const x = f(() => cl(a.schema, [p.query.value.expr])), m = f(
      () => x.value.flatMap(($) => {
        const R = a.schema.entities.find((V) => V.key === $.entityKey);
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
      const V = a.recordViews?.[$.entityKey];
      return V ? { ...V, id: $.id } : null;
    }), O = f(() => {
      const $ = p.entity.value?.key;
      return $ && a.recordViews?.[$] || null;
    }), X = f(() => {
      const $ = a.views, R = typeof $ == "function" ? $({ entity: p.entity.value, records: x.value }) : $;
      return E.value || O.value ? [...(R ?? un).filter((V) => V !== "record"), "record"] : R?.filter((V) => V !== "record");
    }), q = f(
      () => O.value !== null && Fe(p.query.value.view, X.value) === "record"
    ), D = f(() => q.value ? 1 : a.limit), U = bl({
      source: g,
      query: P.live,
      schema: f(() => a.schema),
      entity: p.entity,
      limit: D,
      within: k
    }), ee = $l({
      // Not before the data has landed: what is there until then is no place to hold.
      active: f(() => q.value && !a.loading),
      rows: U.rows,
      pending: U.pending,
      page: f(() => P.live.value.page),
      list: f(() => {
        const { entity: $, expr: R, sort: V, dir: we } = P.live.value;
        return JSON.stringify([$, R, V, we]);
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
      const V = P.live.value.page, we = R ? (V - 1) * a.limit + 1 : Math.ceil(V / a.limit);
      P.drafting.value ? (p.setView($), P.setPage(we)) : p.setView($, we);
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
    function We($) {
      const R = new Set(fe.value);
      R.has($.id) ? R.delete($.id) : R.add($.id), o.value = [...R];
    }
    function ze($) {
      const R = new Set(fe.value);
      for (const V of U.rows.value)
        $ ? R.add(V.id) : R.delete(V.id);
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
    function $e($, R, V = {}, we) {
      const xn = zt(a.schema, p.query.value, $, V, we);
      V.exclude ? p.narrow(xn, R?.key ?? p.query.value.entity) : P.release(() => p.narrow(xn, R?.key ?? null, R ? void 0 : "cards")), s("drill", $, R, V);
    }
    function xe($) {
      return a.rowPress === "narrow" && kt(a.schema, $) !== null;
    }
    function C($) {
      return a.schema.entities.find((V) => V.key === $.entityKey)?.href?.($) || null;
    }
    const A = he(null);
    ae(p.query, () => {
      A.value = null;
    });
    const B = ul({
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
        const V = ee.step($);
        V !== null && (P.drafting.value ? P.setPage(V) : p.setPage(V, R));
      },
      setView: ke,
      schema: f(() => a.schema),
      entities: f(() => a.schema.entities),
      rows: U.rows,
      total: U.total,
      limit: D,
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
      toggleSelect: We,
      selectPage: ze,
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
        const V = M($);
        if (V !== null) {
          P.drafting.value ? (p.setView("record"), P.setPage(V)) : p.setView("record", V);
          return;
        }
        const we = C($);
        if (we) {
          window.open(we, "_blank", "noopener");
          return;
        }
        s("activate", $);
      },
      pressHref: ($) => {
        if (xe($)) return p.narrowHref(zt(a.schema, p.query.value, $), null, "cards");
        const R = M($);
        return R !== null ? p.hrefFor({ view: "record", page: R }) : C($) ?? a.activateHref?.($) ?? null;
      },
      recordHref: C,
      drillHref: ($, R, V) => kt(a.schema, $) ? p.narrowHref(
        zt(a.schema, p.query.value, $, {}, V),
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
    vl({ theme: () => a.theme, accent: () => a.accent, tokens: () => a.tokens });
    const F = f(() => {
      if (!(!a.accent && !a.tokens))
        return { ...a.tokens, ...a.accent ? { "--dc-accent": a.accent } : {} };
    }), Re = H(null), Be = H(0);
    let Ft = null;
    it(() => {
      const $ = Re.value;
      $ && (Be.value = $.getBoundingClientRect().width, !(typeof ResizeObserver > "u") && (Ft = new ResizeObserver(([R]) => {
        Be.value = R.contentRect.width;
      }), Ft.observe($)));
    }), ge(() => Ft?.disconnect());
    const Vt = f(() => a.oneStripFrom !== !1 && Be.value >= a.oneStripFrom), $n = f(() => ({
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
      style: re(F.value)
    }, [
      S("div", {
        class: ie(["dc-shell__head", { "dc-shell__head--one-strip": Vt.value }])
      }, [
        j(Ia, null, Qt({ _: 2 }, [
          i.page ? void 0 : {
            name: "lead",
            fn: Y(() => [
              j(Rr, {
                views: X.value,
                "type-chooser": e.typeChooser
              }, null, 8, ["views", "type-chooser"])
            ]),
            key: "0"
          },
          i.brand ? {
            name: "brand",
            fn: Y((V) => [
              G($.$slots, "brand", Dt(es(V)), void 0, !0)
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
        Vt.value && !i.page ? (u(), I(an, Dt(qe({ key: 0 }, $n.value)), null, 16)) : T("", !0)
      ], 2),
      i.page ? (u(), h("div", cc, [
        G($.$slots, "page", {
          query: w(B).query.value
        }, void 0, !0)
      ])) : T("", !0),
      !Vt.value && !i.page ? (u(), I(an, Dt(qe({ key: 1 }, $n.value)), null, 16)) : T("", !0),
      i.page ? T("", !0) : G($.$slots, "results", {
        rows: w(B).rows.value,
        total: w(B).total.value,
        offset: w(B).offset.value,
        pageCount: w(B).pageCount.value,
        query: w(B).liveQuery.value,
        pending: w(B).pending.value,
        loading: e.loading
      }, () => [
        j(Ga, {
          views: X.value,
          loading: e.loading
        }, Qt({ _: 2 }, [
          i["cards-before"] || b().length ? {
            name: "cards-before",
            fn: Y(() => [
              (u(!0), h(K, null, J(b(), (V) => (u(), h(K, {
                key: `${V.entityKey}:${V.id}`
              }, [
                i.record ? G($.$slots, "record", {
                  id: V.id,
                  entity: V.entity
                }, void 0, !0, 0) : (u(), I(Xe(e.recordCards?.[V.entityKey]), {
                  key: 1,
                  id: V.id
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
    ], 12, ic));
  }
}), dc = /* @__PURE__ */ z(uc, [["__scopeId", "data-v-ca2e1ed6"]]), fc = ["data-dc-muted", "data-dc-collapsed"], vc = ["data-dc-collapsible"], pc = ["aria-expanded", "aria-controls"], hc = { class: "dc-shell-card__sr" }, mc = {
  key: 0,
  class: "dc-shell-card__identity"
}, yc = { class: "dc-shell-card__title dc-shell-card__name" }, gc = {
  key: 0,
  class: "dc-shell-card__ref dc-mono"
}, _c = {
  key: 1,
  class: "dc-shell-card__title"
}, wc = {
  key: 2,
  class: "dc-shell-card__count dc-mono"
}, kc = {
  key: 1,
  class: "dc-shell-card__aside"
}, bc = ["data-dc-flush"], $c = /* @__PURE__ */ W({
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
    function i(q) {
      return r(q?.() ?? []);
    }
    function r(q) {
      return q.some((D) => D.type === ts ? !1 : D.type === ns ? String(D.children ?? "").trim().length > 0 : D.type === K ? r(D.children ?? []) : !0);
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
    const P = Mt() ?? "dc-shell-card", x = `${P}-body`, m = `${P}-foot`, b = f(
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
      const D = q.target?.closest(E);
      D && O.value?.contains(D) || typeof window < "u" && window.getSelection()?.toString() || k();
    }
    return (q, D) => (u(), h("section", {
      class: "dc-shell-card",
      style: re(l.value),
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
          D[0] || (D[0] = S("svg", {
            class: "dc-shell-card__chevron",
            viewBox: "0 0 10 10",
            "aria-hidden": "true"
          }, [
            S("path", { d: "M2 3.5 5 6.5 8 3.5" })
          ], -1)),
          S("span", hc, L(e.name || e.title || "Card"), 1)
        ], 8, pc)) : T("", !0),
        G(q.$slots, "head", {}, () => [
          e.name ? (u(), h("div", mc, [
            S("h2", yc, L(e.name), 1),
            y.value ? (u(), h("span", gc, [
              G(q.$slots, "reference", {}, () => [
                te(L(e.reference), 1)
              ], !0)
            ])) : T("", !0)
          ])) : (u(), h("h2", _c, L(e.title), 1)),
          e.count !== void 0 ? (u(), h("span", wc, L(e.count), 1)) : T("", !0)
        ], !0),
        d.value ? (u(), h("span", kc, [
          G(q.$slots, "aside", {}, void 0, !0)
        ])) : T("", !0)
      ], 8, vc)) : T("", !0),
      v.value ? Ut((u(), h("div", {
        key: 1,
        id: x,
        class: "dc-shell-card__body",
        "data-dc-flush": e.flush ? "true" : "false"
      }, [
        G(q.$slots, "default", {}, void 0, !0)
      ], 8, bc)), [
        [En, !p.value]
      ]) : T("", !0),
      _.value ? Ut((u(), h("footer", {
        key: 2,
        id: m,
        class: "dc-shell-card__foot"
      }, [
        G(q.$slots, "foot", {}, void 0, !0)
      ], 512)), [
        [En, !p.value]
      ]) : T("", !0)
    ], 12, fc));
  }
}), $u = /* @__PURE__ */ z($c, [["__scopeId", "data-v-073304c8"]]), xc = ["aria-label"], Sc = ["aria-checked", "data-dc-active", "tabindex", "onClick", "onKeydown"], Cc = /* @__PURE__ */ W({
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
        class: ie(["dc-segmented__item", { "dc-segmented__item--mono": e.mono }]),
        "aria-checked": r.key === e.modelValue,
        "data-dc-active": r.key === e.modelValue ? "true" : "false",
        tabindex: r.key === e.modelValue ? 0 : -1,
        onClick: (d) => a("update:modelValue", r.key),
        onKeydown: (d) => l(d, c)
      }, L(r.label), 43, Sc))), 128))
    ], 8, xc));
  }
}), Pc = /* @__PURE__ */ z(Cc, [["__scopeId", "data-v-63fb5482"]]), Ec = { class: "dc-fact__label" }, Mc = ["title"], Lc = /* @__PURE__ */ W({
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
      style: re(a.value)
    }, [
      S("dt", Ec, [
        G(s.$slots, "label", {}, () => [
          te(L(e.label), 1)
        ], !0)
      ]),
      S("dd", {
        class: "dc-fact__value dc-mono",
        title: e.title
      }, [
        G(s.$slots, "default", {}, () => [
          n.value.length === 1 ? (u(), h(K, { key: 0 }, [
            te(L(n.value[0]), 1)
          ], 64)) : (u(!0), h(K, { key: 1 }, J(n.value, (o, i) => (u(), h("span", {
            key: i,
            class: "dc-fact__line"
          }, L(o), 1))), 128))
        ], !0)
      ], 8, Mc)
    ], 4));
  }
}), Tc = /* @__PURE__ */ z(Lc, [["__scopeId", "data-v-1f6d25e6"]]), Oc = /* @__PURE__ */ W({
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
      (u(!0), h(K, null, J(e.items, (l, o) => (u(), I(Tc, {
        key: `${o}:${l.label}`,
        label: l.label,
        value: l.value,
        title: l.title,
        wide: l.wide
      }, null, 8, ["label", "value", "title", "wide"]))), 128)),
      G(a.$slots, "default", {}, void 0, !0)
    ], 4));
  }
}), xu = /* @__PURE__ */ z(Oc, [["__scopeId", "data-v-17455afa"]]), Nc = { class: "dc-counts" }, Ac = ["data-dc-tone"], Ic = {
  key: 0,
  class: "dc-counts__empty"
}, Rc = /* @__PURE__ */ W({
  __name: "StatusCounts",
  props: {
    counts: {},
    empty: { default: _e }
  },
  setup(e) {
    const t = e, n = f(() => t.counts.filter((a) => a.count > 0));
    return (a, s) => (u(), h("span", Nc, [
      (u(!0), h(K, null, J(n.value, (l) => (u(), h("span", {
        key: l.label,
        class: "dc-counts__count",
        "data-dc-tone": l.tone ?? "neutral"
      }, L(l.count) + " " + L(l.label), 9, Ac))), 128)),
      n.value.length === 0 ? (u(), h("span", Ic, L(e.empty), 1)) : T("", !0)
    ]));
  }
}), Su = /* @__PURE__ */ z(Rc, [["__scopeId", "data-v-5553a9e2"]]), Bc = ["data-dc-copied", "title", "aria-label"], Hc = {
  key: 0,
  class: "dc-copy__mark",
  viewBox: "0 0 16 16",
  "aria-hidden": "true"
}, qc = {
  key: 1,
  class: "dc-copy__mark",
  viewBox: "0 0 16 16",
  "aria-hidden": "true"
}, Fc = 1500, Vc = /* @__PURE__ */ W({
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
      }, Fc), a("copied", i);
    }
    return ge(() => clearTimeout(l)), (i, r) => (u(), h("button", {
      type: "button",
      class: "dc-copy",
      "data-dc-copied": s.value ? "true" : "false",
      title: s.value ? "Copied" : e.label,
      "aria-label": e.label,
      onClick: o
    }, [
      s.value ? (u(), h("svg", qc, [...r[1] || (r[1] = [
        S("path", { d: "M3 8.5l3.2 3L13 4.5" }, null, -1)
      ])])) : (u(), h("svg", Hc, [...r[0] || (r[0] = [
        S("rect", {
          x: "5.5",
          y: "5.5",
          width: "8",
          height: "9",
          rx: "1.5"
        }, null, -1),
        S("path", { d: "M10.5 3.5v-1a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h1" }, null, -1)
      ])]))
    ], 8, Bc));
  }
}), Dc = /* @__PURE__ */ z(Vc, [["__scopeId", "data-v-f4249d7f"]]), Kc = ["data-dc-copy", "data-dc-wrap", "data-dc-tone"], Wc = /* @__PURE__ */ W({
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
        G(i.$slots, "default", {}, () => [
          te(L(e.code), 1)
        ], !0)
      ], 4),
      e.copy ? (u(), I(Dc, {
        key: 0,
        class: "dc-code__copy",
        text: o,
        label: e.copyLabel,
        onCopied: r[0] || (r[0] = (c) => a("copied", c)),
        onError: r[1] || (r[1] = (c) => a("error", c))
      }, null, 8, ["label"])) : T("", !0)
    ], 8, Kc));
  }
}), Cu = /* @__PURE__ */ z(Wc, [["__scopeId", "data-v-67b371dd"]]), zc = 24, jc = /* @__PURE__ */ W({
  __name: "ShellLog",
  props: {
    fetchChunk: {},
    stripAnsi: { type: Boolean },
    maxHeight: { default: "460px" }
  },
  setup(e, { expose: t }) {
    const n = e, a = H(""), s = f(() => n.stripAnsi ? ms(a.value) : a.value), l = H(null);
    let o = 0, i = null;
    function r() {
      return i ??= c().finally(() => {
        i = null;
      }), i;
    }
    async function c() {
      const { chunk: _, offset: y } = await n.fetchChunk(o);
      if (o = y, !_) return;
      const g = l.value, p = !g || g.scrollTop + g.clientHeight >= g.scrollHeight - zc;
      a.value += _, p && (await Ye(), l.value && (l.value.scrollTop = l.value.scrollHeight));
    }
    function d() {
      a.value = "", o = 0;
    }
    const v = f(() => n.maxHeight === void 0 ? void 0 : { maxHeight: typeof n.maxHeight == "number" ? `${n.maxHeight}px` : n.maxHeight });
    return t({ poll: r, reset: d }), (_, y) => (u(), h("pre", {
      ref_key: "pane",
      ref: l,
      class: "dc-log dc-mono",
      style: re(v.value)
    }, L(s.value), 5));
  }
}), Pu = /* @__PURE__ */ z(jc, [["__scopeId", "data-v-2c86947e"]]), Uc = ["data-dc-theme"], Qc = ["aria-labelledby", "aria-label"], Gc = {
  key: 1,
  class: "dc-dialog__actions"
}, Ue = [], Yc = /* @__PURE__ */ W({
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
      Ue.push(d), document.addEventListener("keydown", v), k = document.activeElement instanceof HTMLElement ? document.activeElement : null, o(), await Ye(), (r.value?.querySelector("[autofocus]") ?? r.value?.querySelector(p) ?? r.value)?.focus();
    }
    function x() {
      const m = Ue.indexOf(d);
      m !== -1 && (Ue.splice(m, 1), document.removeEventListener("keydown", v), k?.isConnected && k.focus(), k = null);
    }
    return it(() => {
      n.open && P();
    }), ae(
      () => n.open,
      (m) => {
        m ? P() : x();
      }
    ), ge(x), (m, b) => e.open ? (u(), I(Pt, {
      key: 0,
      to: e.to
    }, [
      S("div", {
        class: "dc-shell dc-layer dc-dialog",
        "data-dc-theme": w(s),
        style: re(w(l)),
        onPointerdown: y,
        onClick: g
      }, [
        S("div", {
          ref_key: "panel",
          ref: r,
          class: ie(["dc-dialog__panel", e.panelClass]),
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
            class: ie(["dc-dialog__body", e.bodyClass])
          }, [
            G(m.$slots, "default", {}, void 0, !0)
          ], 2),
          m.$slots.actions ? (u(), h("div", Gc, [
            G(m.$slots, "actions", {}, void 0, !0)
          ])) : T("", !0)
        ], 10, Qc)
      ], 44, Uc)
    ], 8, ["to"])) : T("", !0);
  }
}), Eu = /* @__PURE__ */ z(Yc, [["__scopeId", "data-v-0cccf313"]]), Xc = 4500, Jc = 9e3, ot = H([]);
let Xn = 0;
function Ya(e) {
  ot.value = ot.value.filter((t) => t.id !== e);
}
function Xa(e, t = "ok") {
  Xn += 1;
  const n = Xn;
  ot.value = [...ot.value, { id: n, message: e, kind: t }], setTimeout(() => Ya(n), t === "err" ? Jc : Xc);
}
function Zc(e) {
  Xa(e instanceof Error ? e.message : String(e), "err");
}
function eu() {
  return { toasts: as(ot), toast: Xa, toastError: Zc, dismiss: Ya };
}
const tu = ["data-dc-theme"], nu = ["data-dc-kind", "role"], au = /* @__PURE__ */ W({
  __name: "ShellToasts",
  props: {
    to: { default: "body" },
    theme: { default: void 0 },
    accent: { default: void 0 },
    tokens: { default: void 0 }
  },
  setup(e) {
    const t = e, { toasts: n } = eu(), { theme: a, style: s, adopt: l } = _n(t);
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
        }, L(r.message), 9, nu))), 128))
      ], 12, tu)
    ], 8, ["to"]));
  }
}), Mu = /* @__PURE__ */ z(au, [["__scopeId", "data-v-d970211c"]]);
function Lu(e, t) {
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
function Tu(e, t = {}) {
  const n = t.key ?? ((l) => JSON.stringify(l)), a = he();
  let s = null;
  return ss(() => {
    const l = e(), o = n(l);
    o !== s && (s = o, a.value = l);
  }), a;
}
function Ou(e = {}) {
  return { key: "ordinal", kind: "ordinal", label: "#", width: "52px", ...e };
}
function Nu(e = {}) {
  return { key: "status", role: "state", kind: "status", label: "State", sort: "state", width: "104px", ...e };
}
function Au(e = {}) {
  return { key: "tint", role: "tint", ...e };
}
function Iu(e = {}) {
  return { key: "picture", role: "image", kind: "image", width: "56px", height: "40px", ...e };
}
function Ru(e, t = {}) {
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
function Bu(e, t = {}) {
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
function Hu(e, t, n = {}) {
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
function qu(e, t, n = {}) {
  return { key: e, kind: "date", label: t, sort: e, width: "104px", mono: !0, muted: !0, ...n };
}
function Fu(e = {}) {
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
function Vu(e, t, n = {}) {
  return { key: e, label: t, sort: e, truncate: !0, hideBelow: 900, ...n };
}
function Du(e, t, n, a = {}) {
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
function Ku(e) {
  const t = qt(e);
  return Number.isFinite(t) && t > 0 ? fs(t) : _e;
}
function Wu(e) {
  const t = qt(e);
  return Number.isFinite(t) && t > 0 ? vs(t) : _e;
}
function zu(e) {
  const t = qt(e);
  return Number.isFinite(t) && t > 0 ? ps(t) : _e;
}
function ju(e) {
  const t = qt(e);
  return Number.isFinite(t) ? hs(t) : _e;
}
function su(e) {
  if (e <= 0) return 0;
  const t = 10 ** Math.floor(Math.log10(e));
  for (const n of [1, 2, 5])
    if (e <= n * t) return n * t;
  return 10 * t;
}
function lu(e, t) {
  const n = /* @__PURE__ */ new Set();
  for (const a of e) {
    const s = a.fields[t];
    for (const l of Array.isArray(s) ? s : [s])
      typeof l == "string" && l && n.add(l);
  }
  return [...n].sort((a, s) => a.localeCompare(s));
}
function ru(e, t) {
  let n = 0;
  for (const a of e) {
    const s = a.fields[t];
    typeof s == "number" && s > n && (n = s);
  }
  return n;
}
function Uu(e, t, n, a = {}) {
  return {
    kind: "chips",
    key: t,
    label: n,
    options: lu(e, t),
    ...a.multiple ? { multiple: !0 } : {}
  };
}
function Qu(e, t, n) {
  return { kind: "range", key: t, label: n, min: 0, max: su(ru(e, t)) };
}
function Gu(e, t, n) {
  return { kind: "toggle", key: e, label: t, text: n };
}
function Yu(e) {
  return e.filter((t) => t.kind === "chips" ? t.options.length > 1 : t.kind === "range" ? t.max > 0 : !0);
}
function Xu(e = "", t = "/") {
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
function Jn(e) {
  const t = e.indexOf("?");
  if (t === -1) return "";
  const n = e.slice(t), a = n.indexOf("#");
  return ue(a === -1 ? n : n.slice(0, a));
}
function Ju(e) {
  const t = H(Jn(e.currentRoute.value.fullPath)), n = f(() => e.currentRoute.value.path), a = ae(
    () => e.currentRoute.value.fullPath,
    (s) => {
      t.value = Jn(s);
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
function Zu(e, t, n = "/") {
  return (a) => {
    const s = a.params[t], l = Array.isArray(s) ? s.join("/") : s ?? "", o = a.query[Oe], i = typeof o == "string" ? o : "", r = `${e}="${l.replace(/"/g, "")}"`;
    return { path: n, query: { ...a.query, [Oe]: dt(i, r) } };
  };
}
function ed(e, t = "/") {
  return (n) => ({ path: t, query: { ...n.query, [Ke]: e } });
}
function td(e) {
  const t = /* @__PURE__ */ new Map();
  for (const n of e) {
    const a = t.get(n.entityKey);
    a ? a.push(n) : t.set(n.entityKey, [n]);
  }
  return {
    query(n) {
      return ya(n, (a) => t.get(a.key) ?? [], {
        undatedLast: !0,
        zeroIsAll: !0
      });
    }
  };
}
function nd(e, t) {
  return e.query({ ...t, limit: Number.MAX_SAFE_INTEGER, offset: 0 }).rows;
}
const ou = {
  DataShell: dc,
  ShellHeader: Ia,
  RecordActions: an,
  ResultsArea: Ga,
  SegmentedControl: Pc,
  StatusPill: De,
  ListView: ln,
  CardsView: qa,
  GridView: Fa,
  ImagesView: Va,
  TableView: Ua,
  LinksView: Da,
  PreviewView: Ka,
  TypeCardsView: Qa
}, ad = {
  install(e, t = {}) {
    const n = t.prefix ?? "";
    for (const [a, s] of Object.entries(ou))
      e.component(`${n}${a}`, s);
    t.route && e.provide(ta, t.route), (t.theme || t.accent || t.tokens) && fl({ theme: t.theme, accent: t.accent, tokens: t.tokens }, e);
  }
};
export {
  fu as COLUMN_BREAKPOINTS,
  du as COLUMN_ROLES,
  qa as CardsView,
  Yn as ColumnCell,
  Dc as CopyButton,
  ys as DEFAULT_ENTITY_VIEW,
  Gt as DEFAULT_SORT,
  na as DEFAULT_VIEW,
  xl as DRAFT_DELAY,
  dc as DataShell,
  _e as EMPTY_CELL,
  _a as ENTITY_ALL,
  $t as ENTITY_TERM,
  rt as EXPRESSION_TERM,
  Fa as GridView,
  ad as HeaderContentLayoutPlugin,
  Va as ImagesView,
  Da as LinksView,
  ln as ListView,
  gt as MOCK_TINTS,
  ft as MetricDrill,
  vt as OpenMark,
  mn as PARAM_DIR,
  Ke as PARAM_ENTITY,
  Oe as PARAM_EXPR,
  It as PARAM_PAGE,
  hn as PARAM_SORT,
  At as PARAM_VIEW,
  uu as PILL_TONES,
  Tl as POPOVER_FLIP_BELOW,
  Ml as POPOVER_GAP,
  Ll as POPOVER_MARGIN,
  wn as PinStar,
  Ka as PreviewView,
  kn as QueryMark,
  Qe as RECORD_STATUSES,
  fn as RESULT_FIELDS,
  ta as ROUTE_ADAPTER_KEY,
  an as RecordActions,
  Rr as RecordChoosers,
  Ga as ResultsArea,
  Ma as SHELL_CONTEXT_KEY,
  bt as SHELL_THEME_KEY,
  pt as ScopeMark,
  Pc as SegmentedControl,
  Ae as SelectTick,
  $u as ShellCard,
  Cu as ShellCode,
  Eu as ShellDialog,
  Tc as ShellFact,
  xu as ShellFacts,
  Ia as ShellHeader,
  Pu as ShellLog,
  kr as ShellPager,
  Il as ShellPopover,
  Mu as ShellToasts,
  sn as StandingControl,
  Su as StatusCounts,
  De as StatusPill,
  Jc as TOAST_ERROR_MS,
  Xc as TOAST_MS,
  Ua as TableView,
  Qa as TypeCardsView,
  gs as VIEW_ICONS,
  un as VIEW_KINDS,
  Ln as VIEW_LABELS,
  dt as addTerm,
  pn as andExpression,
  Ku as bytesCell,
  ia as cellFull,
  gi as cellNarrowings,
  Te as cellText,
  mt as cellTextOf,
  oe as cellValue,
  Kt as changesResults,
  Uu as chipsFrom,
  On as columnAlign,
  Nn as columnClass,
  Tn as columnKey,
  ja as columnNarrows,
  ct as columnShortcut,
  va as columnShortcutOf,
  Xt as columnTruncates,
  $s as columnsFor,
  ua as compactShortcuts,
  Kl as completeDraft,
  bs as countPages,
  rs as createHistoryAdapter,
  Xu as createMemoryAdapter,
  td as createMemoryDataSource,
  el as createMockDataSource,
  Ju as createVueRouterAdapter,
  qu as dateColumn,
  Cs as defaultCellText,
  yt as defaultQuery,
  Ze as defaultViewFor,
  os as detachableAdapter,
  zt as drillExpression,
  Wu as durationCell,
  zu as elapsedCell,
  ws as emptyFacetValue,
  sl as entityAddress,
  Fu as entityColumn,
  Yt as entityCount,
  ed as entityRedirect,
  $a as excludingTerm,
  tt as expandShortcuts,
  Vu as facetColumn,
  lt as facetField,
  Oa as facetValue,
  Is as fieldHeading,
  ba as fieldTerm,
  et as findEntity,
  wa as findEntityByAddress,
  Ce as findSort,
  Du as flagColumn,
  Ge as fnv1a,
  sa as focusEntity,
  fs as formatBytes,
  Je as formatCount,
  us as formatDate,
  vu as formatDateTime,
  Lt as formatDigits,
  vs as formatDuration,
  ps as formatElapsed,
  pe as formatExpression,
  He as formatInteger,
  cs as formatMetric,
  ds as formatOrdinal,
  hs as formatPercent,
  Ts as formatRange,
  ye as formatTerm,
  Zs as generateRows,
  yl as hasActiveFacets,
  Ru as identityColumn,
  wu as idsExpression,
  pu as isEntityScoped,
  ks as isFacetActive,
  dn as isPristineQuery,
  Ve as isRangeTerm,
  ra as isTypeCardsQuery,
  aa as isViewKind,
  mu as joinExpression,
  xa as liftTerm,
  qs as matchesExpression,
  Hu as metricColumn,
  ku as narrowPatch,
  Fs as negateTerm,
  su as niceMax,
  ue as normalizeSearch,
  yi as numberRange,
  Ds as oppositeTerm,
  Ou as ordinalColumn,
  le as parseExpression,
  ol as parseQuery,
  ju as percentCell,
  Iu as pictureColumn,
  Ol as placePopover,
  qr as presentParts,
  Ba as presentRow,
  st as pressOptions,
  ul as provideShellContext,
  fl as provideShellTheme,
  nd as queryAll,
  Qu as rangeFrom,
  Ot as rangeOf,
  zs as readDraft,
  _u as readExpression,
  Zu as recordRedirect,
  ka as recordTerm,
  cl as recordsIn,
  Bu as referenceColumn,
  at as refineExpression,
  Fe as resolveView,
  ve as roleColumn,
  oa as roleColumns,
  Ss as rowKey,
  nt as sameTerm,
  ut as scopeTerm,
  kt as scopeTermFor,
  Pa as scopedEntity,
  gu as searchFromQuery,
  Kn as serializeQuery,
  ll as sortAddress,
  Tt as sortsFor,
  hu as splitExpression,
  Nu as stateColumn,
  ms as stripAnsi,
  wl as summarizeQuery,
  xt as summaryTerms,
  gn as termStanding,
  Au as tintColumn,
  yu as tintFor,
  Gu as toggleFacet,
  di as useColumns,
  Sl as useDraft,
  Or as useEntityCounts,
  Ai as useEntityPreviews,
  _n as useLayerTheme,
  Lu as usePoll,
  Ne as usePresentedRows,
  kl as useQueryState,
  El as useRecordNames,
  bl as useResults,
  ne as useShellContext,
  Tu as useStableSchema,
  eu as useToasts,
  Yu as usefulFacets,
  Mn as viewAcross,
  Na as withFacetValue,
  Jt as withStanding,
  il as withWhere,
  bu as withoutFacet,
  Ca as withoutOwnScope,
  Vs as withoutTerm
};
