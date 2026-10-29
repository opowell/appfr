import { ref as R, computed as f, inject as Bt, provide as qt, getCurrentInstance as En, shallowRef as ye, toValue as be, watch as ee, onScopeDispose as st, getCurrentScope as Pn, defineComponent as F, useSlots as at, onBeforeUnmount as _e, openBlock as u, createElementBlock as p, createElementVNode as w, unref as x, renderSlot as j, toDisplayString as E, Fragment as D, renderList as Y, createCommentVNode as M, withModifiers as Ee, normalizeClass as ue, withDirectives as Ct, withKeys as Ue, normalizeStyle as se, vModelText as Ps, nextTick as ot, useId as Ft, createBlock as I, Teleport as lt, createVNode as Q, createTextVNode as ae, withCtx as ne, reactive as an, onMounted as rt, resolveDynamicComponent as it, createSlots as Et, useModel as on, onBeforeUpdate as Ls, normalizeProps as Ts, guardReactiveProps as Ms, mergeModels as ln, vShow as rn, Comment as As, Text as Os, readonly as Ns, mergeProps as Is, watchEffect as Rs } from "vue";
import { MenuList as Bs } from "menu-bar";
const Ln = Symbol("dc.routeAdapter");
function ie(e) {
  if (!e) return "";
  const t = e.replace(/^[?]/, "");
  return t ? `?${t}` : "";
}
function qs() {
  const e = typeof window < "u", t = R(e ? ie(window.location.search) : ""), n = R(e ? window.location.pathname : "/"), s = () => {
    t.value = ie(window.location.search), n.value = window.location.pathname;
  };
  e && window.addEventListener("popstate", s);
  const a = (o, l, i) => {
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
    push: (o, l) => a(o, "push", l),
    replace: (o, l) => a(o, "replace", l),
    dispose: () => {
      e && window.removeEventListener("popstate", s);
    }
  };
}
function Fs(e, t) {
  const n = f(t.detached), s = f(() => n.value ? "" : e.search.value), a = f(() => n.value ? t.path() : e.path.value);
  return {
    search: s,
    path: a,
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
const Tn = ["list", "cards", "grid", "images", "table", "links", "preview"], Ae = ["ok", "running", "queued", "review", "failed"], gc = [...Ae, "neutral", "accent"], kc = [
  "identity",
  "reference",
  "metric",
  "state",
  "updated",
  "image",
  "tint"
], wc = [480, 620, 760, 900, 1100];
function Oe(e) {
  let t = 2166136261;
  for (let n = 0; n < e.length; n++)
    t ^= e.charCodeAt(n), t = Math.imul(t, 16777619);
  return Math.abs(t);
}
function Hs(e) {
  if (!Number.isFinite(e)) return "—";
  const t = Math.abs(e);
  return t >= 1e6 ? `${(e / 1e6).toFixed(1)}m` : t >= 1e3 ? `${(e / 1e3).toFixed(1)}k` : String(Math.round(e));
}
function Ye(e) {
  if (!Number.isFinite(e)) return "—";
  const t = Math.round(e), n = Math.abs(t);
  return n < 1e3 ? String(t) : n < 9950 ? `${(t / 1e3).toFixed(1)}k` : n < 999500 ? `${Math.round(t / 1e3)}k` : `${(t / 1e6).toFixed(1)}m`;
}
function Te(e) {
  return Number.isFinite(e) ? Math.round(e).toLocaleString("en-US") : "—";
}
function Ds(e) {
  const t = new Date(e);
  if (Number.isNaN(t.getTime())) return "—";
  const n = String(t.getUTCDate()).padStart(2, "0"), s = String(t.getUTCMonth() + 1).padStart(2, "0");
  return `${n}.${s}.${t.getUTCFullYear()}`;
}
function Vs(e) {
  return String(e + 1);
}
function bc(e, t) {
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
function Ks(e) {
  if (e == null || !Number.isFinite(e) || e < 0) return "—";
  if (e < 1e3) return `${e} B`;
  const t = ["kB", "MB", "GB", "TB"];
  let n = e, s = -1;
  for (; n >= 1e3 && s < t.length - 1; )
    n /= 1e3, s += 1;
  return `${n < 100 ? n.toFixed(1) : Math.round(n)} ${t[s]}`;
}
function Ws(e) {
  if (!e || !Number.isFinite(e)) return "—";
  if (e < 1e3) return `${Math.round(e)}ms`;
  const t = e / 1e3;
  return t < 60 ? `${t.toFixed(1)}s` : `${Math.floor(t / 60)}m ${Math.round(t % 60)}s`;
}
function js(e) {
  if (e == null || !Number.isFinite(e) || e <= 0)
    return "—";
  const t = Math.floor(e / 60);
  return t ? `${t}:${String(e % 60).padStart(2, "0")}` : `${e}s`;
}
function zs(e) {
  return e == null || !Number.isFinite(e) ? "—" : `${Math.round(e * 100)}%`;
}
function Us(e) {
  return e.replace(/\x1b\[[0-9;?]*[ -/]*[@-~]/g, "");
}
const Qs = "cards", Gs = "table";
function Ne(e, t = {}) {
  const n = (a) => a && Mn(a) ? a : void 0;
  if (e === null) return n(t.view) ?? Qs;
  const s = t.landing === "entity" ? n(t.view) : void 0;
  return n(t.entityView) ?? s ?? Gs;
}
function cn(e, t, n, s = {}) {
  return e === Ne(t, s) ? Ne(n, s) : e;
}
const Pt = "updated";
function Mn(e) {
  return typeof e == "string" && Tn.includes(e);
}
const Ys = {
  list: "List",
  cards: "Cards",
  grid: "Grid",
  images: "Images",
  table: "Table",
  links: "Links",
  preview: "Preview"
};
function Ht(e, t) {
  const [n] = t ?? [];
  return n === void 0 || t?.includes(e) ? e : n;
}
function Lt(e) {
  return typeof e.count == "number" ? Ye(e.count) : e.count;
}
function Ie(e, t) {
  return t ? e.entities.find((n) => n.key === t) ?? null : null;
}
function An(e, t = {}) {
  const n = Ie(e, t.entity), s = e.entities[0];
  if (!n && !s) throw new Error(`Schema "${e.key}" declares no entities`);
  return n ?? s;
}
function On(e, t = null) {
  return e?.columns ?? t?.columns ?? [];
}
function ct(e, t = null) {
  if (e?.sorts?.length) return e.sorts;
  const n = /* @__PURE__ */ new Set(), s = [];
  for (const a of On(e, t))
    !a.sort || n.has(a.sort) || (n.add(a.sort), s.push({ key: a.sort, label: (a.label ?? a.sort).toLowerCase() }));
  return s;
}
const Xs = { key: Pt, label: Pt };
function ke(e, t, n = null) {
  const s = ct(e, n);
  return (t ? s.find((o) => o.key === t) : void 0) ?? s.find((o) => o.key === Pt) ?? s[0] ?? Xs;
}
function Js(e) {
  switch (e.kind) {
    case "chips":
      return { kind: "chips", selected: [] };
    case "range":
      return { kind: "range", min: null, max: null };
    case "toggle":
      return { kind: "toggle", on: !1 };
  }
}
function Zs(e) {
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
function Dt(e) {
  return e.entity === null && e.expr.trim() === "";
}
function $c(e) {
  return e.entity !== null;
}
function Vt(e, t) {
  return e.entity === null && Ht(e.view, t) === "cards";
}
function ea(e, t) {
  return t <= 0 ? 1 : Math.max(1, Math.ceil(e / t));
}
function Kt(e, t = {}) {
  const s = t.landing === "entity" ? An(e, t) : null;
  return {
    entity: s?.key ?? null,
    view: Ne(s?.key ?? null, t),
    sort: ke(s, t.sort).key,
    dir: t.dir === "asc" ? "asc" : "desc",
    expr: "",
    page: 1
  };
}
const Wt = ["entity", "sort", "dir", "expr"];
function wt(e) {
  return Wt.some((t) => t in e);
}
const me = "—";
function fe(e, t) {
  return e.find((n) => n.role === t);
}
function Nn(e, t) {
  return e.filter((n) => n.role === t);
}
function ta(e, t) {
  const n = (t ? t.columns : e?.columns) ?? [], s = t ? "scoped" : "everything";
  return n.filter(
    (a) => a.role !== "tint" && ((a.when ?? "always") === "always" || a.when === s)
  );
}
const na = ["id", "entityKey", "entityLabel"];
function ce(e, t) {
  if (e.value) return e.value(t);
  const n = e.field ?? e.key;
  if (n !== void 0) {
    if (t.fields && n in t.fields) return t.fields[n];
    if (na.includes(n))
      return t[n];
  }
}
function un(e, t) {
  const n = e.key ?? e.field ?? e.label;
  return n?.trim() ? n.trim() : `column-${t}`;
}
function sa(e, t) {
  return e.id?.trim() ? e.id : `${e.entityKey || "row"}-${t}`;
}
function aa(e, t) {
  if (e == null || e === "") return me;
  if (t === "number") {
    const n = typeof e == "number" ? e : Number(e);
    return Number.isFinite(n) ? Hs(n) : String(e);
  }
  return t === "date" ? Ds(String(e)) : Array.isArray(e) ? e.length ? e.join(", ") : me : String(e);
}
function Pe(e, t) {
  const n = ce(e, t);
  return e.format ? e.format(n, t) : aa(n, e.kind);
}
function oa(e) {
  return typeof e == "number" ? Number.isFinite(e) ? String(e) : "" : typeof e == "string" ? e : Array.isArray(e) ? e.join(", ") : "";
}
function In(e, t) {
  const n = Pe(e, t), s = oa(ce(e, t));
  return s && s !== n ? s : n;
}
function Ge(e, t) {
  return e ? Pe(e, t) : "";
}
function dn(e) {
  return e.align ? e.align : e.kind === "number" || e.kind === "ordinal" ? "right" : "left";
}
const la = {
  ordinal: "dc-table__num",
  number: "dc-table__number",
  date: "dc-table__date",
  status: "dc-table__state"
};
function fn(e) {
  return [la[e.kind ?? "text"], e.class].filter(Boolean).join(" ");
}
function Tt(e) {
  if (e.truncate !== void 0) return e.truncate;
  const t = e.kind ?? "text";
  return t === "text" || t === "number" || t === "date";
}
const ra = /^([A-Za-z_][\w.-]*)\s*(>=|<=|:|=|>|<)\s*(.*)$/, vn = "-?(?:\\d+\\.?\\d*|\\.\\d+)", ia = new RegExp(`^(${vn})?\\.\\.(${vn})?$`);
function ut(e) {
  const t = ia.exec(e.trim());
  if (!t || t[1] === void 0 && t[2] === void 0) return null;
  const n = t[1] === void 0 ? null : Number(t[1]), s = t[2] === void 0 ? null : Number(t[2]);
  return n !== null && s !== null && n > s ? { min: s, max: n } : { min: n, max: s };
}
function ca(e) {
  return `${e.min ?? ""}..${e.max ?? ""}`;
}
function Re(e) {
  return e.kind === "field" && (e.comparator === ":" || e.comparator === "=") && ut(e.value) !== null;
}
function ua(e) {
  const t = [];
  let n = "", s = null;
  const a = () => {
    n && t.push(n), n = "";
  };
  for (let o = 0; o < e.length; o++) {
    const l = e[o];
    if (s) {
      l === s ? s = null : n += l;
      continue;
    }
    if (l === '"' || l === "'") {
      s = l;
      continue;
    }
    if (/\s/.test(l)) {
      if (/(?:>=|<=|[:=><])$/.test(n) || e.slice(o + 1).match(/^\s*(>=|<=|[:=><])/) && n) continue;
      a();
      continue;
    }
    n += l;
  }
  return a(), t;
}
function oe(e) {
  const t = e.trim();
  if (!t) return [];
  const n = [];
  let s = [];
  for (const a of ua(t)) {
    const o = a.toUpperCase();
    if (o === "AND" || o === "&&") continue;
    if (o === "OR" || o === "||") {
      s.length && n.push(s), s = [];
      continue;
    }
    const l = a.length > 1 && a.startsWith("-"), i = l ? a.slice(1) : a, r = l ? { negated: !0 } : {}, c = ra.exec(i);
    c && c[3] !== "" ? s.push({
      kind: "field",
      field: c[1].toLowerCase(),
      comparator: c[2],
      value: c[3],
      ...r
    }) : s.push({ kind: "text", value: i, ...r });
  }
  return s.length && n.push(s), n;
}
const we = (e) => e.toLowerCase().replace(/\s+/g, ""), Rn = [
  ["status", "state"],
  ["state", "state"],
  ["updated", "updated"],
  ["date", "updated"],
  ["name", "identity"],
  ["ref", "reference"]
];
function da(e, t, n) {
  const s = we(e), a = n.columns ?? [];
  if (s === "entity") return t.entityKey;
  if (e in t.fields) return t.fields[e];
  const o = a.find(
    (c) => c.key?.toLowerCase() === e.toLowerCase() || c.field?.toLowerCase() === e.toLowerCase() || c.label !== void 0 && we(c.label) === s
  );
  if (o) return ce(o, t);
  const l = n.facets.find(
    (c) => c.key.toLowerCase() === s || we(c.label) === s
  );
  if (l && l.key in t.fields) return t.fields[l.key];
  const i = Rn.find(([c]) => c === s)?.[1];
  if (i) {
    const c = fe(a, i);
    if (c) return ce(c, t);
  }
  const r = /^metric(\d+)$/.exec(s);
  if (r) {
    const c = Nn(a, "metric")[Number(r[1]) - 1];
    if (c) return ce(c, t);
  }
}
function He(e) {
  return (e.toLowerCase().match(/[\p{L}\p{N}]+/gu) ?? []).map((t) => t.charAt(0)).join("");
}
const pn = /^[a-z_][\w.-]*$/;
function dt(e) {
  const t = (e.key ?? e.field)?.toLowerCase();
  if (t !== void 0) return pn.test(t) ? t : void 0;
  const n = e.label === void 0 ? void 0 : we(e.label);
  return n !== void 0 && pn.test(n) ? n : void 0;
}
function jt(e, t) {
  const n = we(e);
  return !!t?.entities.some((s) => s.scope && we(s.scope) === n);
}
function fa(e, t, n) {
  const s = we(e);
  if (s === "entity" || Rn.some(([o]) => o === s) || /^metric\d+$/.test(s) || jt(e, n)) return !0;
  const a = (o) => o !== void 0 && we(o) === s;
  return (t.columns ?? []).some(
    (o) => a(o.key) || a(o.field) || a(o.label)
  ) || t.facets.some((o) => a(o.key) || a(o.label));
}
function Be(e, t, n) {
  return t ? qn(e, (s) => {
    const a = Fn(s, t, n);
    return a && dt(a);
  }) : e;
}
function Bn(e, t, n) {
  return t ? qn(e, (s) => {
    if (jt(s, n)) return;
    const a = (t.columns ?? []).find((o) => dt(o) === s);
    return a && Hn(a, t, n);
  }) : e;
}
function va(e, t, n) {
  if (!t || jt(e, n)) return;
  const s = t.facets.find((a) => a.key.toLowerCase() === e);
  return s ? s.label : (t.columns ?? []).find((a) => dt(a) === e)?.label;
}
function qn(e, t) {
  let n = !1;
  const s = oe(e).map(
    (a) => a.map((o) => {
      if (o.kind !== "field") return o;
      const l = t(o.field);
      return !l || l === o.field ? o : (n = !0, { ...o, field: l });
    })
  );
  return n ? he(s) : e;
}
function Fn(e, t, n) {
  if (!(!e || fa(e, t, n)))
    return (t.columns ?? []).find(
      (s) => s.label !== void 0 && He(s.label) === e
    );
}
function Hn(e, t, n) {
  if (!t || e.label === void 0 || !dt(e)) return;
  const s = He(e.label);
  return Fn(s, t, n) === e ? s : void 0;
}
function bt(e, t) {
  const n = e.toLowerCase(), s = t.toLowerCase();
  if (!s.includes("*")) return n.includes(s);
  const a = s.replace(/[.+?^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*");
  return new RegExp(a).test(n);
}
function hn(e, t) {
  return e.toLowerCase() === t.toLowerCase();
}
function pa(e, t, n, s) {
  if (e.kind === "text") {
    const r = n.columns ?? [];
    return ["identity", "reference"].some((c) => {
      const d = fe(r, c), m = d ? ce(d, t) : void 0;
      return typeof m == "string" && bt(m, e.value);
    });
  }
  const a = da(e.field, t, n);
  if (a === void 0) return s?.has(e.field) ? !1 : null;
  const o = Re(e) ? ut(e.value) : null;
  if (o) {
    if (Array.isArray(a) || typeof a == "boolean") return null;
    const r = typeof a == "number" ? a : Number(a);
    return Number.isFinite(r) ? (o.min === null || r >= o.min) && (o.max === null || r <= o.max) : null;
  }
  if (Array.isArray(a))
    return e.comparator === ":" || e.comparator === "=" ? a.some(
      (c) => e.comparator === "=" ? hn(String(c), e.value) : bt(String(c), e.value)
    ) : null;
  if (e.comparator === ":" || e.comparator === "=") {
    if (typeof a == "boolean") {
      const r = e.value.toLowerCase();
      return r === "true" || r === "yes" ? a : r === "false" || r === "no" ? !a : null;
    }
    if (typeof a == "number") {
      const r = Number(e.value);
      return Number.isFinite(r) ? a === r : null;
    }
    return e.comparator === "=" ? hn(String(a), e.value) : bt(String(a), e.value);
  }
  const l = Number(e.value), i = typeof a == "number" ? a : Number(a);
  return !Number.isFinite(l) || !Number.isFinite(i) ? null : ha(e.comparator, i, l);
}
function mn(e, t, n, s) {
  const a = pa(e, t, n, s);
  return a === null ? !0 : e.negated ? !a : a;
}
function ha(e, t, n) {
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
function yn(e) {
  return e.kind === "field" && !e.negated && (e.comparator === ":" || e.comparator === "=") && !Re(e);
}
const _n = /* @__PURE__ */ new WeakMap();
function ma(e) {
  if (!e?.strictScopes) return null;
  let t = _n.get(e);
  return t || (t = new Set(
    e.entities.flatMap((n) => n.scope ? [n.scope.toLowerCase()] : [])
  ), _n.set(e, t)), t;
}
function ya(e, t, n, s) {
  if (!e.length) return !0;
  const a = ma(s);
  return e.some((o) => {
    const l = /* @__PURE__ */ new Map();
    for (const i of o)
      yn(i) && l.set(
        i.field,
        (l.get(i.field) ?? !1) || mn(i, t, n, a)
      );
    return o.every(
      (i) => yn(i) ? l.get(i.field) === !0 : mn(i, t, n, a)
    );
  });
}
function gn(e) {
  return /[\s"']/.test(e) ? `"${e.replace(/["']/g, "")}"` : e;
}
function $e(e) {
  const t = e.negated ? "-" : "";
  return e.kind === "text" ? t + gn(e.value) : `${t}${e.field}${e.comparator}${gn(e.value)}`;
}
function _a(e) {
  if (!e.negated) return { ...e, negated: !0 };
  const { negated: t, ...n } = e;
  return n;
}
function he(e) {
  return e.filter((t) => t.length).map((t) => t.map($e).join(" ")).join(" OR ");
}
function ga(e, t, n) {
  return e.map((s, a) => a === t ? s.filter((o, l) => l !== n) : s).filter((s) => s.length);
}
function xc(e) {
  const t = oe(e);
  if (t.length > 1) return { parts: [], text: e.trim() };
  const n = t[0] ?? [];
  return {
    parts: n.filter((s) => s.kind === "field"),
    text: n.filter((s) => s.kind === "text").map($e).join(" ")
  };
}
function Sc(e, t) {
  return [...e.map($e), t.trim()].filter(Boolean).join(" ");
}
const kn = (e, t) => e.toLowerCase() === t.toLowerCase();
function Mt(e, t) {
  return !!e.negated == !!t.negated && Dn(e, t);
}
function ka(e, t) {
  return !!e.negated != !!t.negated && Dn(e, t);
}
function Dn(e, t) {
  return e.kind === "field" ? t.kind === "field" && e.field === t.field && e.comparator === t.comparator && kn(e.value, t.value) : t.kind === "text" && kn(e.value, t.value);
}
function wa(e, t) {
  return t.filter((n) => !e.some((s) => Mt(s, n)));
}
function zt(e, t) {
  return Vn(e, t, (n) => n);
}
function At(e, t) {
  return Vn(
    e,
    t,
    (n, s) => n.filter((a) => !s.some((o) => ka(a, o)))
  );
}
const ba = /^[A-Za-z_][\w.-]*\s*(?:>=|<=|:|=|>|<)$/;
function $a(e) {
  return he(
    oe(e).map(
      (t) => t.filter(
        (n) => n.kind !== "text" || n.value !== "-" && !ba.test(n.value)
      )
    ).filter((t) => t.length > 0)
  );
}
function Vn(e, t, n) {
  const s = oe(e), a = oe(t);
  return s.length ? a.length ? he(
    s.flatMap(
      (o) => a.map((l) => [...n(o, l), ...wa(o, l)])
    )
  ) : he(s) : he(a);
}
const Kn = (e) => e.kind === "date" || e.role === "updated";
function xa(e) {
  if (!e) return () => 0;
  const n = (e.kind ?? "text") === "number" || e.role === "metric", s = Kn(e);
  return (a, o) => {
    const l = ce(e, a), i = ce(e, o);
    return n ? Number(i ?? 0) - Number(l ?? 0) : s ? Date.parse(String(i ?? "")) - Date.parse(String(l ?? "")) : String(i ?? "").localeCompare(String(l ?? ""));
  };
}
function wn(e, t) {
  return !t || !Kn(t) ? !1 : !Number.isFinite(Date.parse(String(ce(t, e) ?? "")));
}
function Wn({ query: e, schema: t, entity: n, limit: s, offset: a }, o, l) {
  const i = oe(e.expr), r = n ? [n] : t.entities;
  let c = 0;
  const d = [];
  for (const g of r)
    for (const v of o(g))
      c += 1, ya(i, v, g, t) && d.push(v);
  const m = ke(n, e.sort, t), _ = On(n, t).find((g) => g.sort === m.key), b = l.undatedLast ? d.filter((g) => !wn(g, _)) : d, $ = l.undatedLast ? d.filter((g) => wn(g, _)) : [];
  b.sort(xa(_)), e.dir === "asc" && b.reverse();
  const h = $.length ? [...b, ...$] : b;
  return {
    // One page out of the middle. `total` stays the whole match, which is what
    // the shell counts pages with.
    rows: l.zeroIsAll && s <= 0 ? h.slice(a) : h.slice(a, a + s),
    total: d.length,
    unfiltered: d.length === c
  };
}
const Xe = [
  "oklch(0.36 0.06 240)",
  "oklch(0.34 0.07 290)",
  "oklch(0.36 0.06 160)",
  "oklch(0.38 0.06 80)",
  "oklch(0.35 0.07 30)",
  "oklch(0.34 0.05 200)"
];
function Cc(e) {
  return Xe[Oe(e) % Xe.length];
}
function jn(e, t) {
  return `${e}_${1e4 + t * 7}`;
}
const Sa = 7, Ca = 3;
function Ea(e, t, n, s) {
  const a = (t * Sa + Oe(n)) % s, o = [];
  for (let l = 0; l < Math.min(Ca, s); l++)
    o.push(jn(e, (a + l) % s));
  return o;
}
function Pa(e, t) {
  switch (e.kind) {
    case "chips":
      return e.multiple ? La(e.options, t) : e.options[t % e.options.length] ?? "";
    case "range": {
      const n = Math.max(0, e.max - e.min);
      return e.min + (n === 0 ? 0 : t % (n + 1));
    }
    case "toggle":
      return t % 3 === 0;
  }
}
function La(e, t) {
  if (!e.length) return [];
  const n = 1 + (t >> 5) % Math.min(3, e.length), s = t % e.length, a = /* @__PURE__ */ new Set();
  for (let o = 0; o < n; o++) a.add((s + o) % e.length);
  return [...a].sort((o, l) => o - l).map((o) => e[o]);
}
function Ta(e, t) {
  const { hash: n, sample: s, revision: a, updatedAt: o } = t, l = a ? ` · rev ${a + 1}` : "";
  switch (e.role) {
    case "identity":
      return `${s[0]}${l}`;
    case "reference":
      return a ? `${s[1]}-${a + 1}` : s[1];
    case "state":
      return Ae[n % Ae.length];
    case "updated":
      return o;
    case "tint":
      return Xe[n % Xe.length];
    case "metric":
      return 1 + n % 940;
  }
  switch (e.kind) {
    case "number":
      return 1 + n % 940;
    case "status":
      return Ae[n % Ae.length];
    case "date":
      return o;
    default:
      return;
  }
}
function Ma(e, t = {}) {
  const n = t.population ?? 48, s = t.seed ?? "", a = t.now ?? /* @__PURE__ */ new Date("2026-08-25T00:00:00Z"), o = e.samples, l = t.scopes ?? [];
  if (!o.length) return [];
  const i = [];
  for (let r = 0; r < n; r++) {
    const c = o[r % o.length], d = Math.floor(r / o.length), m = Oe(`${s}:${e.key}:${c[0]}:${r}`), _ = jn(e.key, r), b = new Date(a.getTime() - m % 900 * 36e5).toISOString(), $ = {};
    for (const h of e.columns ?? []) {
      const g = h.field ?? h.key;
      if (!g || h.value) continue;
      const v = Ta(h, {
        hash: Oe(`${m}:${g}`),
        sample: c,
        revision: d,
        updatedAt: b
      });
      v !== void 0 && ($[g] = v);
    }
    for (const h of e.facets)
      $[h.key] = Pa(h, Oe(`${m}:${h.key}`));
    for (const [h, g] of l)
      $[h] = g === e.key ? _ : Ea(g, r, h, n);
    i.push({ id: _, entityKey: e.key, entityLabel: e.label, fields: $ });
  }
  return i;
}
function Aa(e = {}) {
  const t = /* @__PURE__ */ new Map(), n = (s, a) => {
    const o = t.get(s.key);
    if (o) return o;
    const l = e.scopes ?? a.entities.flatMap(
      (r) => r.scope ? [[r.scope, r.key]] : []
    ), i = Ma(s, { ...e, scopes: l });
    return t.set(s.key, i), i;
  };
  return {
    query(s) {
      return Wn(s, (a) => n(a, s.schema), {
        undatedLast: !1,
        zeroIsAll: !1
      });
    }
  };
}
const Le = "e", ft = "v", Ut = "s", Qt = "d", xe = "q", vt = "p", zn = "*", Oa = [
  Le,
  ft,
  Ut,
  Qt,
  xe,
  vt
], Na = [
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
function Je(e) {
  let t = encodeURIComponent(e);
  for (const [n, s] of Na) t = t.replace(n, s);
  return t;
}
function pe(e) {
  try {
    return decodeURIComponent(e.replace(/\+/g, " "));
  } catch {
    return e.replace(/\+/g, " ");
  }
}
function Gt(e) {
  const t = e.replace(/^[?]/, "");
  if (!t) return [];
  const n = [];
  for (const s of t.split("&")) {
    if (!s) continue;
    const a = s.indexOf("="), o = a === -1 ? s : s.slice(0, a), l = a === -1 ? "" : s.slice(a + 1);
    n.push([pe(o), l]);
  }
  return n;
}
function Ia(e) {
  return Oa.includes(e);
}
function pt(e, t) {
  if (!(!t || e.some((n) => n.key === t)))
    return e.find((n) => He(n.label) === t);
}
function Ra(e, t) {
  const n = He(e.label);
  return pt(t.entities, n)?.key === e.key ? n : e.key;
}
function Un(e, t) {
  return t ? Ie(e, t) ?? pt(e.entities, t) ?? null : null;
}
function Ba(e, t) {
  const n = He(e.label);
  return pt(t, n)?.key === e.key ? n : e.key;
}
function qa(e, t) {
  return t.some((n) => n.key === e) ? e : pt(t, e)?.key ?? e;
}
function Fa(e, t, n = {}) {
  const s = Kt(t, n), a = new Map(Gt(e)), o = a.get(Le), l = o === void 0 ? s.entity : pe(o), i = l === zn ? null : Un(t, l), r = a.get(ft), c = r && Mn(pe(r)) ? pe(r) : Ne(i?.key ?? null, n), d = a.get(Ut), m = ke(
    i,
    d ? qa(pe(d), ct(i, t)) : n.sort,
    t
  ), _ = a.get(Qt), b = _ ? pe(_) === "asc" ? "asc" : "desc" : s.dir, $ = a.get(xe), h = a.get(vt), g = h === void 0 ? 1 : Number(pe(h)), v = Number.isFinite(g) ? Math.max(1, Math.floor(g)) : 1;
  return {
    entity: i?.key ?? null,
    view: c,
    sort: m.key,
    dir: b,
    expr: $ === void 0 ? "" : Be(pe($), i, t),
    page: v
  };
}
function $t(e, t, n = {}, s = "") {
  const a = Kt(t, n), o = Ie(t, e.entity), l = Gt(s).filter(([m]) => !Ia(m)), i = [], r = (m, _) => i.push([m, Je(_)]), c = o?.key ?? null;
  if (c !== a.entity && r(Le, o ? Ra(o, t) : zn), e.view !== Ne(c, n) && r(ft, e.view), e.sort !== a.sort) {
    const m = ct(o, t), _ = m.find((b) => b.key === e.sort);
    r(Ut, _ ? Ba(_, m) : e.sort);
  }
  e.dir !== a.dir && r(Qt, e.dir), e.expr.trim() !== "" && r(xe, Bn(e.expr, o, t)), e.page > 1 && r(vt, String(e.page));
  const d = [
    ...l.map(([m, _]) => [Je(m), _]),
    ...i
  ];
  return d.length ? `?${d.map(([m, _]) => _ === "" ? m : `${m}=${_}`).join("&")}` : "";
}
function Ec(e) {
  const t = [];
  for (const [n, s] of Object.entries(e))
    for (const a of Array.isArray(s) ? s : [s]) {
      if (typeof a != "string") continue;
      const o = Je(n);
      t.push(a === "" ? o : `${o}=${Je(a)}`);
    }
  return t.length ? `?${t.join("&")}` : "";
}
function Pc(e, t) {
  const n = new Map(Gt(e)), s = n.get(xe), a = s === void 0 ? "" : pe(s);
  if (!t) return a;
  const o = n.get(Le);
  return Be(
    a,
    o === void 0 ? null : Un(t, pe(o)),
    t
  );
}
function ht(e, t) {
  return Qn(e, t.id);
}
function Qn(e, t) {
  const n = e?.scope;
  return n ? Gn(n, t) : null;
}
function Gn(e, t) {
  return `${e}="${t.replace(/"/g, "")}"`;
}
function Lc(e, t) {
  const n = typeof e == "string" ? e : e?.scope;
  if (!n) return null;
  const s = t.filter((a) => a.replace(/"/g, "") !== "").map((a) => Gn(n, a));
  return s.length ? s.join(" ") : null;
}
function mt(e, t) {
  if (e.kind !== "field" || t.kind !== "field") return Mt(e, t);
  const n = (s) => s.comparator === ":" || s.comparator === "=";
  return Mt(e, { ...t, comparator: n(e) && n(t) ? e.comparator : t.comparator });
}
function Ze(e, t) {
  return mt(e, _a(t));
}
function et(e, t) {
  return ht(
    e.entities.find((n) => n.key === t.entityKey),
    t
  );
}
function De(e, t) {
  if (!t) return e;
  const n = e.trim();
  if (!n) return t;
  const [s] = oe(t).flat();
  if (!s) return n;
  const a = oe(n);
  return a.some((i) => i.some((r) => mt(r, s))) ? n : a.some((i) => i.some((r) => Ze(r, s))) ? he(
    a.map(
      (i) => i.map((r) => Ze(r, s) ? s : r)
    )
  ) : `${n} ${t}`;
}
function Yn(e) {
  if (!e) return null;
  const t = e.trim();
  return t ? t.startsWith("-") ? t.slice(1) : `-${t}` : null;
}
function Yt(e, t) {
  if (!t || !e.trim()) return null;
  const [n] = oe(t).flat();
  if (!n) return null;
  const s = oe(e).flat();
  return s.some((a) => mt(a, n)) ? n.negated ? "out" : "in" : s.some((a) => Ze(a, n)) ? n.negated ? "in" : "out" : null;
}
function Xn(e, t) {
  if (!t || !e.trim()) return e;
  const [n] = oe(t).flat();
  if (!n) return e;
  const s = oe(e), a = s.map(
    (o) => o.filter((l) => !mt(l, n) && !Ze(l, n))
  );
  return a.every((o, l) => o.length === s[l]?.length) ? e : he(a);
}
function Ot(e, t, n) {
  return t ? n === null ? Xn(e, t) : De(e, n === "out" ? Yn(t) : t) : e;
}
function Jn(e) {
  return e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0;
}
function yt(e) {
  return e.altKey ? { exclude: !0 } : {};
}
function xt(e, t, n, s = {}) {
  const a = et(e, n);
  return De(t.expr, s.exclude ? Yn(a) : a);
}
function Zn(e, t) {
  const n = e?.scope?.toLowerCase();
  if (!n || e?.keepsScope || !t.trim()) return t;
  const s = oe(t), a = s.map(
    (o) => o.filter((l) => l.kind !== "field" || l.field !== n)
  );
  return a.every((o, l) => o.length === s[l]?.length) ? t : he(a);
}
function es(e, t) {
  const n = t.toLowerCase();
  return e.entities.find((s) => s.scope?.toLowerCase() === n) ?? null;
}
function ts(e, t, n) {
  if (!t || !n) return null;
  const s = es(e, t);
  return s ? { entity: s, id: n } : null;
}
function Ha(e, t) {
  const n = [], s = /* @__PURE__ */ new Set();
  for (const a of t)
    for (const o of oe(a).flat()) {
      if (o.kind !== "field" || o.negated) continue;
      const l = ts(e, o.field, o.value);
      if (!l) continue;
      const i = `${l.entity.key}:${l.id.toLowerCase()}`;
      s.has(i) || (s.add(i), n.push({ entityKey: l.entity.key, id: l.id }));
    }
  return n;
}
function Tc(e, t, n = "cards") {
  return {
    // An expression with nothing in it is no parameter, as the shell writes it.
    [xe]: De(e, t) || void 0,
    [Le]: void 0,
    [ft]: n,
    [vt]: void 0
  };
}
const ns = Symbol("dc.shellContext");
function Da(e) {
  const t = e.liveQuery ? e : Va(e);
  return qt(ns, t), t;
}
function Va(e) {
  const t = e.draft ?? R("");
  return {
    draft: t,
    liveQuery: e.query,
    drafting: f(() => !1),
    commitDraft() {
      const n = t.value.trim();
      n && (e.setExpression(
        At(e.query.value.expr, Be(n, e.entity.value, e.schema.value))
      ), t.value = "");
    },
    abandonDraft() {
      t.value = "";
    },
    ...e
  };
}
function J() {
  const e = Bt(ns, null);
  if (!e)
    throw new Error(
      "[appfr] No shell context found. Render this component inside <DataShell>."
    );
  return e;
}
const tt = Symbol("dc-shell-theme");
function Nt(e) {
  return {
    read: () => ({
      theme: be(e.theme),
      accent: be(e.accent),
      tokens: be(e.tokens)
    })
  };
}
function Ka(e, t) {
  t ? t.provide(tt, Nt(e)) : qt(tt, Nt(e));
}
function Wa(e) {
  const t = En();
  qt(tt, {
    ...Nt(e),
    element: () => t?.proxy?.$el ?? null
  });
}
function Xt(e) {
  const t = En(), n = Bt(tt, null), s = ye(null);
  function a() {
    const r = t?.proxy?.$el, d = (r instanceof Element ? r : r?.parentElement)?.closest(".dc-shell");
    if (!d) {
      s.value = null;
      return;
    }
    const m = {};
    for (const _ of Array.from(d.style))
      _.startsWith("--") && (m[_] = d.style.getPropertyValue(_));
    s.value = { shell: d, theme: d.dataset.dcTheme, tokens: m };
  }
  const o = f(() => {
    const r = s.value;
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
  return { theme: l, style: i, adopt: a };
}
function ss(e) {
  return e.key.toLowerCase();
}
const ja = /* @__PURE__ */ new Set([">", ">=", "<", "<="]);
function as(e, t) {
  if (e.kind !== "field" || e.negated || e.field !== ss(t)) return !1;
  const n = e.comparator === ":" || e.comparator === "=";
  switch (t.kind) {
    case "range":
      return Re(e) || ja.has(e.comparator);
    case "chips":
      return n && !Re(e) && os(t.options, e.value) !== void 0;
    case "toggle":
      return n && za(e.value);
  }
}
function os(e, t) {
  const n = t.toLowerCase();
  return e.find((s) => s.toLowerCase() === n);
}
function za(e) {
  const t = e.toLowerCase();
  return t === "true" || t === "yes";
}
function ls(e, t) {
  const n = (oe(e)[0] ?? []).filter((s) => as(s, t));
  switch (t.kind) {
    case "range": {
      let s = null, a = null;
      for (const o of n) {
        const l = ut(o.value), i = Number(o.value);
        l ? (l.min !== null && (s = l.min), l.max !== null && (a = l.max)) : Number.isFinite(i) && (o.comparator.startsWith(">") ? s = i : a = i);
      }
      return { kind: "range", min: s, max: a };
    }
    case "chips": {
      const s = new Set(n.map((a) => os(t.options, a.value)));
      return { kind: "chips", selected: t.options.filter((a) => s.has(a)) };
    }
    case "toggle":
      return { kind: "toggle", on: n.length > 0 };
  }
}
function Ua(e, t) {
  const n = ss(e);
  switch (t.kind) {
    case "range":
      return t.min === null && t.max === null ? [] : [{ kind: "field", field: n, comparator: ":", value: ca(t) }];
    case "chips":
      return t.selected.map((s) => ({ kind: "field", field: n, comparator: "=", value: s }));
    case "toggle":
      return t.on ? [{ kind: "field", field: n, comparator: ":", value: "true" }] : [];
  }
}
function rs(e, t, n) {
  const s = Ua(t, n), a = oe(e), o = (a.length ? a : [[]]).map((l) => [
    ...l.filter((i) => !as(i, t)),
    ...s
  ]);
  return he(o);
}
function Mc(e, t) {
  return rs(e, t, Js(t));
}
function Qa(e, t) {
  return (t?.facets ?? []).some((n) => Zs(ls(e, n)));
}
const nt = "entity", qe = "expr", Ga = { ">=": "≥", "<=": "≤", ">": ">", "<": "<" };
function Ya(e, t, n) {
  if (e.kind !== "field") return $e(e);
  const s = va(e.field, t, n);
  if (s === void 0) return $e(e);
  const a = e.negated ? "-" : "", o = Re(e) ? ut(e.value) : null;
  if (o) {
    const i = o.min !== null && o.max !== null ? `${o.min} ≤ ${s} ≤ ${o.max}` : o.max !== null ? `${s} ≤ ${o.max}` : `${s} ≥ ${o.min}`;
    return a + i;
  }
  const l = Ga[e.comparator];
  return l ? `${a}${s} ${l} ${e.value}` : $e({ ...e, field: s });
}
function Jt(e, t, n = null) {
  const s = [];
  return t && s.push({
    id: nt,
    label: `entity:${t.key}`,
    facetKey: nt
  }), oe(e.expr).forEach((a, o) => {
    a.forEach((l, i) => {
      s.push({
        id: `${qe}:${o}:${i}`,
        label: Ya(l, t, n),
        address: Bn($e(l), t, n),
        facetKey: qe,
        group: o,
        index: i,
        ...l.kind === "field" ? { field: l.field, value: l.value } : {},
        ...l.negated ? { negated: !0 } : {}
      });
    });
  }), s;
}
function Xa(e, t, n = null) {
  if (Dt(e)) {
    const o = ke(t, e.sort, n);
    return `everything · ${e.view} · ${o.label}`;
  }
  const s = Jt(e, t).filter((o) => o.facetKey !== qe).map((o) => o.label), a = e.expr.trim();
  return a && s.push(`"${a}"`), s.join(" · ");
}
function Ja(e) {
  const { adapter: t } = e, n = f(() => be(e.schema)), s = f(() => be(e.defaults) ?? {}), a = f(() => Fa(t.search.value, n.value, s.value)), o = f(() => Ie(n.value, a.value.entity)), l = f(() => o.value ?? An(n.value, s.value)), i = f(() => ct(o.value, n.value)), r = f(() => ke(o.value, a.value.sort, n.value)), c = (v, k) => {
    const y = $t(v, n.value, s.value, t.search.value);
    return y === t.search.value ? !1 : (k === "push" ? t.push(y) : t.replace(y), !0);
  }, d = () => be(e.navigationMode) ?? "push", m = () => be(e.facetNavigationMode) ?? "replace", _ = (v, k) => {
    const y = v.page ?? (wt(v) ? 1 : a.value.page);
    return c({ ...a.value, ...v, page: y }, k);
  }, b = (v) => {
    const k = v.page ?? (wt(v) ? 1 : a.value.page), y = $t({ ...a.value, ...v, page: k }, n.value, s.value, t.search.value);
    return t.href ? t.href(y) : `${t.path.value}${y}`;
  }, $ = (v, k) => {
    const y = o.value?.facets.find((A) => A.key === v);
    if (!y) return;
    const S = rs(a.value.expr, y, k(ls(a.value.expr, y)));
    _({ expr: S }, m());
  }, h = (v) => {
    const k = v === null ? null : Ie(n.value, v);
    return (k?.key ?? null) === a.value.entity ? {} : {
      entity: k?.key ?? null,
      view: cn(a.value.view, a.value.entity, k?.key ?? null, s.value),
      sort: ke(k, a.value.sort, n.value).key
    };
  }, g = (v) => {
    const k = h(v);
    Object.keys(k).length && _(k, d());
  };
  return {
    query: a,
    entity: o,
    focus: l,
    sort: r,
    sorts: i,
    summary: f(() => Xa(a.value, o.value, n.value)),
    terms: f(() => Jt(a.value, o.value, n.value)),
    isPristine: f(() => Dt(a.value)),
    isEverything: f(() => a.value.entity === null),
    hasFacets: f(() => Qa(a.value.expr, o.value)),
    setEntity: g,
    entityHref: (v) => b(h(v)),
    clearEntity: () => g(null),
    setView(v) {
      _({ view: v }, d());
    },
    setSort(v) {
      _({ sort: ke(o.value, v, n.value).key }, d());
    },
    toggleDirection() {
      _({ dir: a.value.dir === "desc" ? "asc" : "desc" }, d());
    },
    setExpression(v) {
      return _({ expr: v }, d());
    },
    narrow(v, k, y) {
      return _({ expr: v, ...h(k), ...y ? { view: y } : {} }, d());
    },
    narrowHref(v, k, y) {
      return b({ expr: v, ...h(k), ...y ? { view: y } : {} });
    },
    setPage(v, k) {
      _({ page: Math.max(1, Math.floor(v)) }, k ?? d());
    },
    setFacet(v, k) {
      $(v, () => k);
    },
    toggleChip(v, k) {
      $(v, (y) => y.kind !== "chips" ? y : { kind: "chips", selected: y.selected.includes(k) ? y.selected.filter((A) => A !== k) : [...y.selected, k] });
    },
    setRange(v, k, y) {
      $(v, (S) => S.kind === "range" ? { kind: "range", min: k, max: y } : S);
    },
    toggleFlag(v) {
      $(
        v,
        (k) => k.kind === "toggle" ? { kind: "toggle", on: !k.on } : k
      );
    },
    removeTerm(v) {
      if (v.facetKey === nt) {
        g(null);
        return;
      }
      if (v.facetKey === qe) {
        const k = ga(oe(a.value.expr), v.group ?? 0, v.index ?? 0);
        _({ expr: he(k) }, d());
      }
    },
    clearFilters() {
      _({ ...h(null), expr: "" }, d());
    },
    reset() {
      c(Kt(n.value, s.value), d());
    },
    hrefFor(v) {
      const k = { ...a.value, ...v };
      return "entity" in v && !("view" in v) && (k.view = cn(a.value.view, a.value.entity, k.entity, s.value)), k.page = v.page ?? (wt(v) ? 1 : a.value.page), `${t.path.value}${$t(k, n.value, s.value, t.search.value)}`;
    }
  };
}
function Za(e) {
  const t = ye([]), n = R(0), s = R(!1), a = R(!1), o = ye(null);
  let l = 0, i = null, r = null;
  const c = f(() => (e.query.value.page - 1) * e.limit.value), d = f(() => ea(n.value, e.limit.value)), m = () => {
    const S = e.query.value, A = e.within?.value.trim(), N = Zn(e.entity.value, S.expr);
    return A ? { ...S, expr: zt(A, N) } : N === S.expr ? S : { ...S, expr: N };
  }, _ = (S, A) => {
    t.value = S.rows, n.value = S.total, o.value = null, b(A);
  }, b = (S) => {
    i = { key: S, total: n.value }, a.value = !1;
  }, $ = (S) => {
    o.value = S, t.value = [], n.value = 0, i = null, a.value = !1;
  }, h = (S, A, N, G) => {
    let B = !0;
    const W = () => S === l;
    let Z = 0, ve = !1;
    const T = (P) => {
      Z = P, ve = !0, G === void 0 && (n.value = P);
    }, K = () => {
      B && (B = !1, t.value = [], T(0)), o.value = null;
    };
    return {
      get open() {
        return W();
      },
      insert(P, z) {
        if (!W()) return;
        const re = Array.isArray(P) ? P : [P];
        if (!re.length) return;
        K();
        const le = [...t.value];
        le.splice(z ?? le.length, 0, ...re), t.value = A > 0 ? le.slice(0, A) : le, T(Z + re.length);
      },
      set(P) {
        W() && (P.rows && (K(), t.value = A > 0 ? P.rows.slice(0, A) : P.rows, T(P.rows.length)), P.total !== void 0 && T(P.total));
      },
      close() {
        W() && (s.value = !1, ve && (n.value = Z), b(N));
      },
      fail(P) {
        W() && ($(P), s.value = !1);
      }
    };
  }, g = () => {
    const S = r;
    r = null, S?.();
  }, v = () => {
    const S = ++l;
    g();
    const A = k.value, N = i?.key === A ? i.total : void 0;
    a.value = N === void 0;
    const G = {
      query: m(),
      schema: e.schema.value,
      entity: e.entity.value,
      limit: e.limit.value,
      offset: c.value
    }, B = e.source.value;
    if (B.stream) {
      s.value = !0;
      try {
        r = B.stream(G, h(S, G.limit, A, N)) ?? null;
      } catch (Z) {
        $(Z), s.value = !1;
      }
      return;
    }
    let W;
    try {
      W = B.query(G);
    } catch (Z) {
      $(Z);
      return;
    }
    if (!(W instanceof Promise)) {
      _(W, A), s.value = !1;
      return;
    }
    s.value = !0, W.then((Z) => {
      S === l && _(Z, A);
    }).catch((Z) => {
      S === l && $(Z);
    }).finally(() => {
      S === l && (s.value = !1);
    });
  }, k = f(() => {
    const S = m();
    return `${e.entity.value?.key ?? e.schema.value.entities[0]?.key ?? ""}|${JSON.stringify(Wt.map((N) => S[N]))}`;
  }), y = f(() => `${k.value}|${e.query.value.page}`);
  return ee([e.source, y, e.limit], v, {
    immediate: !0
  }), st(() => {
    l++, g();
  }, !0), { rows: t, total: n, offset: c, pageCount: d, pending: s, counting: a, error: o, refresh: v };
}
const eo = 150;
function to(e) {
  const t = e.delay ?? eo, n = R(""), s = R("");
  let a = !1, o;
  const l = () => {
    clearTimeout(o), o = void 0;
  }, i = f(() => Be($a(s.value), e.entity.value, e.schema?.value)), r = f(() => i.value.trim() !== ""), c = f(
    () => JSON.stringify([i.value, ...Wt.map((b) => e.query.value[b])])
  ), d = ye(null), m = f(() => {
    const b = e.query.value;
    if (!r.value) return b;
    const $ = d.value?.of === c.value ? d.value.page : 1;
    return { ...b, expr: At(b.expr, i.value), page: $ };
  });
  ee(n, (b) => {
    if (l(), !b.trim()) {
      a || (s.value = "");
      return;
    }
    a = !1, o = setTimeout(() => {
      o = void 0, s.value = n.value;
    }, t);
  }), ee(
    e.query,
    () => {
      a && (a = !1, s.value = "");
    },
    { flush: "sync" }
  );
  const _ = (b) => {
    l(), a = !0, n.value = "", !b() && a && (a = !1, s.value = "");
  };
  return Pn() && st(l), {
    text: n,
    live: m,
    drafting: r,
    setPage(b) {
      d.value = { of: c.value, page: Math.max(1, Math.floor(b)) };
    },
    commit() {
      const b = n.value.trim();
      if (!b) return;
      const $ = At(
        e.query.value.expr,
        Be(b, e.entity.value, e.schema?.value)
      );
      s.value = b, _(() => e.setExpression($));
    },
    abandon() {
      l(), a = !1, n.value = "", s.value = "";
    },
    release: _
  };
}
const no = 25, is = (e, t) => e.toLowerCase() === t.toLowerCase();
function so(e, t) {
  return e.find((n) => is(n.id, t));
}
function ao(e) {
  const t = ye(/* @__PURE__ */ new Map()), n = /* @__PURE__ */ new Set(), s = (i) => {
    if (i.facetKey !== qe) return null;
    const r = ts(e.schema.value, i.field, i.value);
    return r ? { ...r, key: `${r.entity.key}:${r.id}` } : null;
  }, a = (i) => {
    const { entity: r, id: c } = i, d = e.query.value;
    return e.source.value.query({
      query: {
        ...d,
        entity: r.key,
        // The reference on its own. The rest of the query is about the rows on
        // screen, which are of another type entirely.
        expr: Qn(r, c) ?? "",
        sort: ke(r, d.sort, e.schema.value).key,
        page: 1
      },
      schema: e.schema.value,
      entity: r,
      limit: no,
      offset: 0
    });
  }, o = (i, r) => {
    const c = Ge(fe(i.columns ?? [], "identity"), r);
    return c === me || is(c, r.id) ? "" : c;
  }, l = () => {
    const i = /* @__PURE__ */ new Map();
    for (const d of e.terms.value) {
      const m = s(d);
      m && !t.value.has(m.key) && !n.has(m.key) && i.set(m.key, m);
    }
    if (!i.size) return;
    const r = [...i.values()].map((d) => ({
      reference: d,
      outcome: a(d)
    })), c = (d) => {
      const m = new Map(t.value);
      d.forEach((_, b) => {
        const { reference: $ } = r[b], h = so(_.rows, $.id);
        m.set($.key, h ? o($.entity, h) : "");
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
  return ee([e.source, e.schema, e.terms], () => {
    try {
      l();
    } catch {
    }
  }, { immediate: !0 }), {
    names: t,
    nameOf(i) {
      const r = s(i);
      return r && t.value.get(r.key) || null;
    }
  };
}
const oo = { class: "dc-header" }, lo = { class: "dc-header__main" }, ro = {
  class: "dc-header__brand",
  "aria-hidden": "true"
}, io = { class: "dc-header__sr" }, co = {
  key: 2,
  class: "dc-header__within"
}, uo = ["title"], fo = { class: "dc-header__query" }, vo = ["data-dc-more", "title"], po = { class: "dc-header__run" }, ho = {
  key: 0,
  class: "dc-header__or dc-mono",
  "aria-hidden": "true"
}, mo = ["title", "aria-label", "onClick"], yo = ["placeholder", "onKeydown"], _o = {
  key: 0,
  class: "dc-header__pages",
  "aria-label": "Pages"
}, go = ["disabled"], ko = ["title"], wo = ["value", "onKeydown"], bo = {
  class: "dc-header__page-total",
  "aria-hidden": "true"
}, $o = {
  class: "dc-header__sr",
  "aria-live": "polite"
}, xo = ["disabled"], So = {
  key: 1,
  class: "dc-header__actions"
}, Co = /* @__PURE__ */ F({
  __name: "ShellHeader",
  props: {
    views: {},
    pagesNote: {},
    hidePages: { type: Boolean }
  },
  setup(e) {
    const t = e, n = at(), s = J(), a = f(() => s.schema.value), o = f(() => {
      const C = s.within.value.trim();
      return C ? Jt({ ...s.query.value, expr: C }, null) : [];
    }), l = f(() => {
      const C = s.entity.value, O = C?.keepsScope ? void 0 : C?.scope?.toLowerCase();
      return s.terms.value.filter((q) => q.facetKey !== nt).map((q, X, nn) => {
        const sn = nn[X - 1];
        return {
          term: q,
          or: sn?.group !== void 0 && q.group !== void 0 && q.group !== sn.group,
          idle: !!O && q.field?.toLowerCase() === O
        };
      });
    }), i = ao({
      source: s.source,
      schema: s.schema,
      query: s.query,
      // The scope's parts as well as the query's: it names a record more often
      // than a typed term does, being what a record's own page is built on.
      terms: f(() => [...o.value, ...s.terms.value])
    });
    function r(C) {
      const O = es(a.value, C)?.scopeLabel ?? C;
      return O.charAt(0).toUpperCase() + O.slice(1);
    }
    function c(C) {
      return C.replace(/\s*\([^()]*\)\s*$/, "");
    }
    function d(C) {
      const O = i.nameOf(C);
      return O ? `${C.negated ? "-" : ""}${r(C.field)}: ${c(O)}` : C.label;
    }
    function m(C) {
      const O = d(C.term), q = C.idle ? `Not applied to ${s.entity.value?.label} — remove ${O}` : `Remove ${O}`, X = C.term.address;
      return X && X !== O ? `${q}
Written ${X} in the address and the search box` : q;
    }
    const _ = R(null);
    function b(C) {
      _.value = C instanceof HTMLInputElement ? C : null;
    }
    function $() {
      s.abandonDraft(), _.value?.blur();
    }
    function h() {
      g.value = null, s.commitDraft();
    }
    const g = R(null), v = f(() => Math.min(g.value ?? 1 / 0, l.value.length)), k = f(() => [
      { key: "before", entries: l.value.slice(0, v.value) },
      { key: "after", entries: l.value.slice(v.value) }
    ]), y = f(() => v.value < l.value.length);
    ee(l, (C) => {
      g.value !== null && g.value >= C.length && (g.value = null);
    });
    function S(C, O) {
      g.value = C >= l.value.length ? null : Math.max(0, C), ot(() => {
        const q = _.value;
        if (!q) return;
        const X = O === "start" ? 0 : q.value.length;
        q.setSelectionRange(X, X), q.scrollIntoView({ block: "nearest", inline: "nearest" }), re();
      });
    }
    function A(C) {
      const O = _.value;
      return !O || O.selectionStart !== O.selectionEnd ? !1 : O.selectionStart === (C === "start" ? 0 : O.value.length);
    }
    function N(C) {
      v.value === 0 || !A("start") || (C.preventDefault(), S(C.key === "Home" ? 0 : v.value - 1, "start"));
    }
    function G(C) {
      !y.value || !A("end") || (C.preventDefault(), S(C.key === "End" ? l.value.length : v.value + 1, "end"));
    }
    function B(C) {
      v.value === 0 || !A("start") || (C.preventDefault(), ve(l.value[v.value - 1].term, !0));
    }
    function W(C) {
      !y.value || !A("end") || (C.preventDefault(), ve(l.value[v.value].term, !1));
    }
    function Z(C) {
      C.isComposing || C.altKey || C.ctrlKey || C.metaKey || C.shiftKey || (C.key === "ArrowLeft" || C.key === "Home" ? N(C) : C.key === "ArrowRight" || C.key === "End" ? G(C) : C.key === "Backspace" ? B(C) : C.key === "Delete" && W(C));
    }
    function ve(C, O) {
      O && g.value !== null && (g.value = Math.max(0, g.value - 1)), s.removeTerm(C);
    }
    function T(C) {
      C.target?.closest("button, input") || (C.preventDefault(), _.value?.focus(), S(l.value.length, "end"));
    }
    function K() {
      s.draft.value || (g.value = null);
    }
    const P = R(null), z = R("");
    function re() {
      const C = P.value;
      if (!C) {
        z.value = "";
        return;
      }
      const O = C.scrollLeft > 1, q = C.scrollWidth - C.clientWidth - C.scrollLeft > 1;
      z.value = O && q ? "both" : O ? "start" : q ? "end" : "";
    }
    let le = null;
    ee(
      P,
      (C) => {
        le?.disconnect(), le = null, re(), !(!C || typeof ResizeObserver > "u") && (le = new ResizeObserver(re), le.observe(C));
      },
      { flush: "post" }
    ), ee([l, v], re, { flush: "post" }), _e(() => le?.disconnect());
    const te = f(() => s.liveQuery.value.page), kt = f(
      () => !t.hidePages && (s.pageCount.value > 1 || !!t.pagesNote) && !Vt(s.query.value, t.views)
    ), L = f(
      () => `${s.counting.value ? "~" : ""}${Te(s.pageCount.value)}`
    ), H = f(() => {
      let C = `Page ${Te(te.value)} of ${L.value}`;
      const O = s.rows.value.length;
      if (O) {
        const q = s.offset.value + 1, X = `${s.counting.value ? "~" : ""}${Te(s.total.value)}`;
        C += ` — rows ${Te(q)} to ${Te(q + O - 1)} of ${X}`;
      }
      return t.pagesNote ? `${C}
${t.pagesNote}` : C;
    }), U = R(null), ze = f(() => U.value ?? String(te.value)), xs = f(
      () => `calc(${Math.max(2, String(s.pageCount.value).length)}ch + 10px)`
    );
    function Ss(C) {
      C.target.select();
    }
    function Cs(C) {
      const O = C.target, q = O.value.replace(/[^0-9]/g, "");
      O.value !== q && (O.value = q), U.value = q;
    }
    function tn(C) {
      const O = C.target, q = Number(U.value);
      U.value = null;
      const X = Number.isFinite(q) && q >= 1 ? Math.min(Math.trunc(q), Math.max(1, s.pageCount.value)) : te.value;
      O.value = String(X), X !== te.value && s.setPage(X);
    }
    function Es(C) {
      const O = C.target;
      U.value = null, O.value = String(te.value), O.blur();
    }
    return (C, O) => (u(), p("div", oo, [
      w("div", lo, [
        n.brand ? (u(), p("button", {
          key: 0,
          type: "button",
          class: "dc-header__domain",
          "data-dc-brand": "",
          title: "Home",
          onClick: O[0] || (O[0] = (q) => x(s).reset())
        }, [
          w("span", ro, [
            j(C.$slots, "brand", {
              label: a.value.label
            }, void 0, !0)
          ]),
          w("span", io, E(a.value.label), 1)
        ])) : (u(), p("button", {
          key: 1,
          type: "button",
          class: "dc-header__domain",
          title: "Home",
          onClick: O[1] || (O[1] = (q) => x(s).reset())
        }, E(a.value.label), 1)),
        o.value.length ? (u(), p("span", co, [
          O[6] || (O[6] = w("span", { class: "dc-header__sr" }, "Within", -1)),
          (u(!0), p(D, null, Y(o.value, (q) => (u(), p("span", {
            key: `scope:${q.id}`,
            class: "dc-within dc-mono dc-truncate",
            title: d(q)
          }, E(d(q)), 9, uo))), 128))
        ])) : M("", !0),
        w("div", fo, [
          w("div", {
            class: "dc-header__field",
            onMousedown: T
          }, [
            w("div", {
              ref_key: "termBar",
              ref: P,
              class: "dc-header__terms",
              "data-dc-more": z.value,
              title: x(s).summary.value,
              onScroll: re
            }, [
              (u(!0), p(D, null, Y(k.value, (q) => (u(), p(D, {
                key: q.key
              }, [
                w("span", po, [
                  (u(!0), p(D, null, Y(q.entries, (X) => (u(), p(D, {
                    key: X.term.id
                  }, [
                    X.or ? (u(), p("span", ho, "or")) : M("", !0),
                    w("button", {
                      type: "button",
                      class: ue(["dc-term dc-mono", { "dc-term--idle": X.idle }]),
                      title: m(X),
                      "aria-label": `Remove ${d(X.term)}`,
                      onMousedown: O[2] || (O[2] = Ee(() => {
                      }, ["prevent"])),
                      onClick: (nn) => ve(X.term, q.key === "before")
                    }, E(d(X.term)), 43, mo)
                  ], 64))), 128))
                ]),
                q.key === "before" ? Ct((u(), p("input", {
                  key: 0,
                  ref_for: !0,
                  ref: b,
                  "onUpdate:modelValue": O[3] || (O[3] = (X) => x(s).draft.value = X),
                  class: ue(["dc-header__search dc-mono", { "dc-header__search--between": y.value }]),
                  style: se({ "--dc-typed": String(Math.max(1, x(s).draft.value.length)) }),
                  type: "text",
                  autocomplete: "off",
                  spellcheck: "false",
                  placeholder: y.value ? "" : "Search…",
                  "aria-label": "Search",
                  onKeydown: [
                    Ue(Ee(h, ["prevent"]), ["enter"]),
                    Ue(Ee($, ["prevent"]), ["esc"]),
                    Z
                  ],
                  onBlur: K
                }, null, 46, yo)), [
                  [Ps, x(s).draft.value]
                ]) : M("", !0)
              ], 64))), 128))
            ], 40, vo)
          ], 32)
        ])
      ]),
      kt.value ? (u(), p("nav", _o, [
        w("button", {
          type: "button",
          class: "dc-header__step",
          "aria-label": "Previous page",
          disabled: te.value <= 1,
          onClick: O[4] || (O[4] = (q) => x(s).setPage(te.value - 1))
        }, [...O[7] || (O[7] = [
          w("span", { "aria-hidden": "true" }, "‹", -1)
        ])], 8, go),
        w("span", {
          class: "dc-header__page dc-mono",
          title: H.value
        }, [
          w("input", {
            class: "dc-header__page-box dc-mono",
            type: "text",
            inputmode: "numeric",
            autocomplete: "off",
            "aria-label": "Page",
            style: se({ width: xs.value }),
            value: ze.value,
            onFocus: Ss,
            onInput: Cs,
            onKeydown: [
              Ue(Ee(tn, ["prevent"]), ["enter"]),
              Ue(Ee(Es, ["prevent"]), ["esc"])
            ],
            onBlur: tn
          }, null, 44, wo),
          w("span", bo, "/ " + E(L.value), 1)
        ], 8, ko),
        w("span", $o, E(H.value), 1),
        w("button", {
          type: "button",
          class: "dc-header__step",
          "aria-label": "Next page",
          disabled: te.value >= x(s).pageCount.value,
          onClick: O[5] || (O[5] = (q) => x(s).setPage(te.value + 1))
        }, [...O[8] || (O[8] = [
          w("span", { "aria-hidden": "true" }, "›", -1)
        ])], 8, xo)
      ])) : M("", !0),
      n.actions ? (u(), p("div", So, [
        j(C.$slots, "actions", {}, void 0, !0)
      ])) : M("", !0)
    ]));
  }
}), V = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [s, a] of t)
    n[s] = a;
  return n;
}, cs = /* @__PURE__ */ V(Co, [["__scopeId", "data-v-f5e5f2f1"]]);
function Eo(e) {
  const t = ye(/* @__PURE__ */ new Map()), n = R(!0);
  let s = 0, a;
  const o = () => {
    s++, a?.abort(), a = void 0;
  }, l = () => {
    o();
    const i = s, { signal: r } = a = new AbortController(), c = e.query.value, d = e.schema.value, m = e.entities.value, _ = e.within?.value.trim() ?? "";
    n.value = c.expr.trim() === "" && !_;
    const b = /* @__PURE__ */ new Map();
    let $ = !0;
    for (const h of m) {
      const g = Zn(h, c.expr), v = _ ? zt(_, g) : g;
      let k = !1;
      const y = (A) => {
        if (i !== s) return;
        if ($) {
          b.set(h.key, A);
          return;
        }
        const N = new Map(t.value);
        N.set(h.key, A), t.value = N;
      }, S = e.source.value.query({
        query: { ...c, entity: h.key, expr: v, page: 1 },
        schema: d,
        entity: h,
        limit: 0,
        offset: 0,
        signal: r,
        progress: (A) => {
          k || y({ total: A, pending: !0, counted: !0 });
        }
      });
      S instanceof Promise ? (b.has(h.key) || b.set(h.key, { total: 0, pending: !0, counted: !1 }), S.then((A) => {
        k = !0, y({ total: A.total, pending: !1, counted: !0 });
      })) : (k = !0, b.set(h.key, { total: S.total, pending: !1, counted: !0 }));
    }
    $ = !1, t.value = b;
  };
  return Pn() && st(o), { counts: t, pristine: n, refresh: l, cancel: o };
}
const Po = ["checked", "indeterminate"], us = /* @__PURE__ */ F({
  __name: "PageTick",
  setup(e) {
    const t = J(), n = f(() => t.rows.value.filter((o) => t.isSelected(o)).length), s = f(
      () => t.rows.value.length > 0 && n.value === t.rows.value.length
    ), a = f(() => n.value > 0 && !s.value);
    return (o, l) => (u(), p("input", {
      class: "dc-tick",
      type: "checkbox",
      checked: s.value,
      indeterminate: a.value,
      "aria-label": "Select every row on this page",
      title: "Select every row on this page",
      onChange: l[0] || (l[0] = (i) => x(t).selectPage(!s.value))
    }, null, 40, Po));
  }
}), Lo = { class: "dc-pick" }, To = ["id"], Mo = ["id", "aria-expanded", "aria-labelledby", "data-dc-value"], Ao = { class: "dc-pick__label" }, Oo = /* @__PURE__ */ F({
  __name: "PickControl",
  props: {
    modelValue: {},
    options: {},
    label: {},
    mono: { type: Boolean }
  },
  emits: ["update:modelValue", "open", "close"],
  setup(e, { emit: t }) {
    const n = e, s = t, a = Ft() ?? "dc-pick", o = R(null), l = R(null), i = R(null), r = R(!1), c = f(() => i.value !== null), d = R(null), m = f(
      () => n.options.find((S) => S.key === n.modelValue) ?? n.options[0]
    ), _ = f(
      () => n.options.map((S) => ({
        id: S.key,
        label: S.label,
        checked: S.key === n.modelValue
      }))
    ), b = f(
      () => i.value ? { maxHeight: `${window.innerHeight - i.value.y - 8}px` } : void 0
    );
    function $(S) {
      const A = o.value?.getBoundingClientRect();
      A && (d.value = o.value?.closest(".dc-shell") ?? document.body, i.value = { x: A.left, y: A.bottom + 4, mirrorX: A.right }, r.value = S, s("open"));
    }
    function h(S) {
      i.value && s("close"), i.value = null, S && o.value?.focus();
    }
    function g() {
      c.value ? h(!0) : $(!1);
    }
    function v(S) {
      S.key !== "ArrowDown" && S.key !== "ArrowUp" || c.value || (S.preventDefault(), $(!0));
    }
    function k(S) {
      const A = S.target;
      A && (o.value?.contains(A) || l.value?.root?.contains(A) || h(!1));
    }
    ee(c, (S) => {
      S ? window.addEventListener("pointerdown", k, !0) : window.removeEventListener("pointerdown", k, !0);
    }), _e(() => window.removeEventListener("pointerdown", k, !0));
    function y(S) {
      h(!0), !(S.id === void 0 || S.id === n.modelValue) && s("update:modelValue", S.id);
    }
    return (S, A) => (u(), p("span", Lo, [
      w("span", {
        id: `${x(a)}-name`,
        class: "dc-pick__name"
      }, E(e.label), 9, To),
      w("button", {
        id: `${x(a)}-value`,
        ref_key: "trigger",
        ref: o,
        type: "button",
        class: ue(["dc-pick__button", { "dc-mono": e.mono }]),
        "aria-haspopup": "menu",
        "aria-expanded": c.value,
        "aria-labelledby": `${x(a)}-name ${x(a)}-value`,
        "data-dc-value": e.modelValue,
        onClick: g,
        onKeydown: v
      }, [
        w("span", Ao, E(m.value?.label), 1)
      ], 42, Mo),
      A[1] || (A[1] = w("span", {
        class: "dc-pick__mark",
        "aria-hidden": "true"
      }, "▾", -1)),
      i.value && d.value ? (u(), I(lt, {
        key: 0,
        to: d.value
      }, [
        Q(x(Bs), {
          ref_key: "menu",
          ref: l,
          class: "dc-pick__list",
          style: se(b.value),
          items: _.value,
          at: i.value,
          label: e.label,
          autofocus: r.value,
          onChoose: y,
          onDismiss: A[0] || (A[0] = (N) => h(!0))
        }, null, 8, ["style", "items", "at", "label", "autofocus"])
      ], 8, ["to"])) : M("", !0)
    ]));
  }
}), bn = /* @__PURE__ */ V(Oo, [["__scopeId", "data-v-31fb5e89"]]), No = {
  key: 2,
  class: "dc-actions__select"
}, Io = {
  key: 0,
  class: "dc-actions__all"
}, Ro = {
  class: "dc-actions__count",
  "aria-live": "polite"
}, Bo = {
  key: 1,
  class: "dc-actions__count dc-actions__all",
  "aria-live": "polite"
}, qo = { class: "dc-actions__ops" }, Fo = ["disabled"], Ho = ["data-dc-operation", "disabled", "onClick"], Do = ["disabled"], Vo = "…", Ko = /* @__PURE__ */ F({
  __name: "RecordActions",
  props: {
    views: {},
    typeChooser: {},
    selectionPlacement: {}
  },
  setup(e) {
    const t = e, n = J(), s = f(
      () => n.hasFacets.value || !!n.liveQuery.value.expr.trim() || !!n.within.value
    ), a = Eo({
      source: n.source,
      schema: n.schema,
      // What each type holds of what is on screen, the draft's results included:
      // a count of the committed query would disagree with the rows under it.
      query: n.liveQuery,
      entities: n.entities,
      within: n.within
    });
    function o(N) {
      if (N.key === n.query.value.entity && s.value) return Ye(n.total.value);
      if (a.pristine.value) return Lt(N);
      const B = a.counts.value.get(N.key);
      return B ? B.counted ? `${B.pending ? "~" : ""}${Ye(B.total)}` : Vo : Lt(N);
    }
    const l = f(() => [
      { key: "", label: "Everything" },
      ...n.entities.value.map((N) => ({
        key: N.key,
        label: `${N.label} · ${o(N)}`
      }))
    ]), i = f(
      () => t.typeChooser === "always" || n.query.value.entity !== null
    );
    function r(N) {
      n.setEntity(N || null);
    }
    const c = f(
      () => (t.views ?? [...Tn]).map((N) => ({ key: N, label: Ys[N] }))
    ), d = f(() => Ht(n.query.value.view, t.views)), m = f(() => c.value.length > 1);
    function _(N) {
      n.setView(N);
    }
    const b = f(() => n.entity.value), $ = f(() => !Vt(n.query.value, t.views)), h = f(() => n.selection.value.ids.length), g = f(
      () => $.value && n.selectable.value && (n.rows.value.length > 0 || h.value > 0)
    ), v = f(() => d.value === "table"), k = f(
      () => i.value || m.value || $.value && (g.value || !!(b.value?.create || b.value?.duplicate || b.value?.delete || b.value?.operations?.length))
    ), y = f(() => h.value ? `${h.value} selected` : v.value ? "" : "Select all"), S = f(() => t.selectionPlacement === "end");
    function A(N) {
      return h.value ? `${N} ${h.value}` : N;
    }
    return (N, G) => k.value ? (u(), p("div", {
      key: 0,
      class: ue(["dc-actions", { "dc-actions--selection-end": S.value }])
    }, [
      i.value ? (u(), I(bn, {
        key: 0,
        class: "dc-actions__pick dc-actions__type",
        label: "Type",
        "model-value": x(n).query.value.entity ?? "",
        options: l.value,
        onOpen: x(a).refresh,
        onClose: x(a).cancel,
        "onUpdate:modelValue": r
      }, null, 8, ["model-value", "options", "onOpen", "onClose"])) : M("", !0),
      m.value ? (u(), I(bn, {
        key: 1,
        class: "dc-actions__pick dc-actions__view",
        label: "View",
        "model-value": d.value,
        options: c.value,
        "onUpdate:modelValue": _
      }, null, 8, ["model-value", "options"])) : M("", !0),
      g.value && y.value ? (u(), p("div", No, [
        v.value ? (u(), p("span", Bo, E(y.value), 1)) : (u(), p("label", Io, [
          Q(us),
          w("span", Ro, E(y.value), 1)
        ])),
        h.value ? (u(), p("button", {
          key: 2,
          type: "button",
          class: ue(["dc-actions__clear", { "dc-actions__clear--op": S.value }]),
          onClick: G[0] || (G[0] = (B) => x(n).clearSelection())
        }, " Clear ", 2)) : M("", !0)
      ])) : M("", !0),
      w("div", qo, [
        b.value?.create ? (u(), p("button", {
          key: 0,
          type: "button",
          class: "dc-actions__op dc-actions__new",
          onClick: G[1] || (G[1] = (B) => x(n).create(b.value))
        }, [
          G[4] || (G[4] = w("span", {
            class: "dc-actions__plus",
            "aria-hidden": "true"
          }, "+", -1)),
          ae(" " + E(b.value.create), 1)
        ])) : M("", !0),
        b.value?.duplicate ? (u(), p("button", {
          key: 1,
          type: "button",
          class: "dc-actions__op",
          disabled: !h.value,
          onClick: G[2] || (G[2] = (B) => x(n).duplicate())
        }, E(A(b.value.duplicate)), 9, Fo)) : M("", !0),
        (u(!0), p(D, null, Y(b.value?.operations ?? [], (B) => (u(), p("button", {
          key: B.key,
          type: "button",
          class: "dc-actions__op",
          "data-dc-operation": B.key,
          disabled: !h.value,
          onClick: (W) => x(n).operate(B.key)
        }, E(A(B.label)), 9, Ho))), 128)),
        b.value?.delete ? (u(), p("button", {
          key: 2,
          type: "button",
          class: "dc-actions__op dc-actions__danger",
          disabled: !h.value,
          onClick: G[3] || (G[3] = (B) => x(n).delete())
        }, E(A(b.value.delete)), 9, Do)) : M("", !0)
      ])
    ], 2)) : M("", !0);
  }
}), ds = /* @__PURE__ */ V(Ko, [["__scopeId", "data-v-a93a38b2"]]), Wo = ["href"], jo = /* @__PURE__ */ F({
  __name: "PressLink",
  props: {
    href: {}
  },
  emits: ["press"],
  setup(e, { emit: t }) {
    const n = e, s = t;
    function a(o) {
      if (n.href && Jn(o)) {
        o.stopPropagation();
        return;
      }
      o.preventDefault(), s("press", yt(o), o);
    }
    return (o, l) => e.href ? (u(), p("a", {
      key: 0,
      href: e.href,
      class: "dc-press",
      onClick: a
    }, [
      j(o.$slots, "default", {}, void 0, !0)
    ], 8, Wo)) : (u(), p("button", {
      key: 1,
      type: "button",
      class: "dc-press",
      onClick: a
    }, [
      j(o.$slots, "default", {}, void 0, !0)
    ]));
  }
}), de = /* @__PURE__ */ V(jo, [["__scopeId", "data-v-a9383f64"]]);
function zo(e, t) {
  if (!e) return null;
  const n = ce(e, t);
  return typeof n == "string" && n.trim() ? n : null;
}
const Uo = (e) => e == null || typeof e == "string" && !e.trim();
function Qo(e, t) {
  const n = fe(t, "state"), s = fe(t, "tint");
  return {
    identity: Ge(fe(t, "identity"), e),
    reference: Ge(fe(t, "reference"), e),
    metrics: Nn(t, "metric").map((a) => ({
      column: a,
      label: a.label ?? "",
      text: Pe(a, e)
    })),
    facts: t.filter((a) => a.cardLabel && !Uo(ce(a, e))).map((a) => ({
      column: a,
      label: a.cardLabel,
      title: [a.label, a.hint].filter(Boolean).join(" — "),
      text: Pe(a, e)
    })),
    state: n ? ce(n, e) ?? null : null,
    updated: Ge(fe(t, "updated"), e),
    image: zo(fe(t, "image"), e),
    tint: s ? ce(s, e) ?? null : null
  };
}
function fs(e, t, n, s, a = !1) {
  const o = n?.columns ?? [];
  return {
    row: e,
    key: sa(e, t),
    entityLabel: e.entityLabel,
    entity: n,
    columns: o,
    ordinal: Vs(t),
    parts: Qo(e, o),
    pinned: s,
    selected: a
  };
}
function Se() {
  const e = J(), t = f(
    () => new Map(e.entities.value.map((n) => [n.key, n]))
  );
  return f(
    () => e.rows.value.map(
      (n, s) => fs(
        n,
        e.offset.value + s,
        t.value.get(n.entityKey) ?? null,
        e.isPinned(n),
        e.isSelected(n)
      )
    )
  );
}
const Go = ["data-dc-status", "data-dc-tone"], Yo = /* @__PURE__ */ F({
  __name: "StatusPill",
  props: {
    status: {},
    tone: {},
    label: {}
  },
  setup(e) {
    const t = e, n = f(() => t.label ?? t.status ?? "");
    return (s, a) => (u(), p("span", {
      class: "dc-pill",
      "data-dc-status": e.status,
      "data-dc-tone": e.tone
    }, E(n.value), 9, Go));
  }
}), Ve = /* @__PURE__ */ V(Yo, [["__scopeId", "data-v-686eb9b6"]]), Xo = { key: 1 }, Jo = /* @__PURE__ */ F({
  __name: "MetricDrill",
  props: {
    entry: {},
    column: {}
  },
  setup(e) {
    const t = e, n = J(), s = f(() => !t.entry.entity?.scope || !t.column.drill ? null : n.entities.value.find((c) => c.key === t.column.drill) ?? null), a = f(() => t.column.label ?? ""), o = f(() => Pe(t.column, t.entry.row)), l = f(() => s.value ? n.drillHref(t.entry.row, s.value) : null);
    function i(r, c) {
      c.stopPropagation(), s.value && n.drill(t.entry.row, s.value, r);
    }
    return (r, c) => s.value ? (u(), I(de, {
      key: 0,
      class: "dc-drill",
      href: l.value,
      title: `${a.value} of ${e.entry.parts.identity} — show the ${s.value.label.toLowerCase()}`,
      onPress: i
    }, {
      default: ne(() => [
        j(r.$slots, "default", {}, () => [
          ae(E(o.value), 1)
        ], !0)
      ]),
      _: 3
    }, 8, ["href", "title"])) : (u(), p("span", Xo, [
      j(r.$slots, "default", {}, () => [
        ae(E(o.value), 1)
      ], !0)
    ]));
  }
}), Ke = /* @__PURE__ */ V(Jo, [["__scopeId", "data-v-d3e7f4e0"]]), Zo = ["data-dc-active", "aria-pressed", "aria-label"], el = /* @__PURE__ */ F({
  __name: "PinStar",
  props: {
    row: {},
    pinned: { type: Boolean },
    name: {}
  },
  setup(e) {
    const t = e, n = J();
    function s(a) {
      a.stopPropagation(), n.togglePin(t.row);
    }
    return (a, o) => (u(), p("button", {
      type: "button",
      class: "dc-star",
      "data-dc-active": e.pinned ? "true" : "false",
      "aria-pressed": e.pinned,
      "aria-label": e.pinned ? `Unpin ${e.name}` : `Pin ${e.name}`,
      onClick: s
    }, E(e.pinned ? "★" : "☆"), 9, Zo));
  }
}), Zt = /* @__PURE__ */ V(el, [["__scopeId", "data-v-ef63d763"]]), tl = ["src"], nl = /* @__PURE__ */ F({
  __name: "RowPicture",
  props: {
    src: {}
  },
  setup(e) {
    const t = e, n = R(!1);
    return ee(
      () => t.src,
      () => {
        n.value = !1;
      }
    ), (s, a) => e.src.trim() && !n.value ? (u(), p("img", {
      key: 0,
      class: "dc-picture",
      src: e.src,
      alt: "",
      loading: "lazy",
      decoding: "async",
      onError: a[0] || (a[0] = (o) => n.value = !0)
    }, null, 40, tl)) : M("", !0);
  }
}), _t = /* @__PURE__ */ V(nl, [["__scopeId", "data-v-afaab300"]]), sl = ["data-dc-standing", "title", "aria-label"], al = /* @__PURE__ */ F({
  __name: "QueryMark",
  props: {
    entry: {}
  },
  setup(e) {
    const t = e, n = J(), s = f(() => ht(t.entry.entity, t.entry.row)), a = f(() => Yt(n.query.value.expr, s.value)), o = f(
      () => a.value === "in" ? `The query narrows to ${t.entry.parts.identity} — press to lift that` : `The query leaves out ${t.entry.parts.identity} — press to lift that`
    );
    function l(i) {
      i.stopPropagation(), n.setExpression(Xn(n.query.value.expr, s.value));
    }
    return (i, r) => a.value ? (u(), p("button", {
      key: 0,
      type: "button",
      class: "dc-standing",
      "data-dc-standing": a.value,
      title: o.value,
      "aria-label": o.value,
      onClick: l
    }, E(a.value === "in" ? "+" : "−"), 9, sl)) : M("", !0);
  }
}), en = /* @__PURE__ */ V(al, [["__scopeId", "data-v-4b8d4166"]]), ol = ["aria-label"], ll = ["data-dc-standing", "data-dc-active", "aria-checked", "title", "aria-label", "onClick"], rl = /* @__PURE__ */ F({
  __name: "StandingControl",
  props: {
    standing: {},
    mixed: { type: Boolean },
    name: {}
  },
  emits: ["set"],
  setup(e, { emit: t }) {
    const n = e, s = t, a = f(() => [
      { standing: "in", sign: "+", hint: `Narrow the query to ${n.name}` },
      { standing: null, sign: "·", hint: `Let the query say nothing about ${n.name}` },
      { standing: "out", sign: "−", hint: `Leave ${n.name} out of the query` }
    ]), o = (i) => !n.mixed && n.standing === i;
    function l(i, r) {
      i.stopPropagation(), s("set", r);
    }
    return (i, r) => (u(), p("span", {
      class: "dc-standing-control",
      role: "radiogroup",
      "aria-label": `Where the query stands on ${e.name}`
    }, [
      (u(!0), p(D, null, Y(a.value, (c) => (u(), p("button", {
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
      }, E(c.sign), 9, ll))), 128))
    ], 8, ol));
  }
}), It = /* @__PURE__ */ V(rl, [["__scopeId", "data-v-5524dca6"]]), vs = /* @__PURE__ */ F({
  __name: "RowStanding",
  props: {
    entry: {}
  },
  setup(e) {
    const t = e, n = J(), s = f(() => ht(t.entry.entity, t.entry.row)), a = f(() => Yt(n.query.value.expr, s.value));
    function o(l) {
      n.setExpression(Ot(n.query.value.expr, s.value, l));
    }
    return (l, i) => s.value !== null ? (u(), I(It, {
      key: 0,
      class: "dc-row-standing",
      standing: a.value,
      name: e.entry.parts.identity,
      onSet: o
    }, null, 8, ["standing", "name"])) : M("", !0);
  }
}), il = ["href", "title", "aria-label"], cl = /* @__PURE__ */ F({
  __name: "OpenMark",
  props: {
    entry: {}
  },
  setup(e) {
    const t = e, n = J(), s = f(() => {
      const a = t.entry.row, o = n.recordHref?.(a) ?? null;
      return o ? n.pressHref(a) === o ? null : o : null;
    });
    return (a, o) => s.value ? (u(), p("a", {
      key: 0,
      class: "dc-open",
      href: s.value,
      target: "_blank",
      rel: "noopener noreferrer",
      title: s.value,
      "aria-label": `Open ${e.entry.parts.identity} in a new tab`,
      onClick: o[0] || (o[0] = Ee(() => {
      }, ["stop"]))
    }, "↗", 8, il)) : M("", !0);
  }
}), We = /* @__PURE__ */ V(cl, [["__scopeId", "data-v-b00f390d"]]), ul = /* @__PURE__ */ F({
  __name: "ScopeMark",
  props: {
    entry: {}
  },
  setup(e) {
    const t = e, n = J(), s = f(
      () => n.narrowsOnPress.value ? null : t.entry.entity?.scope ?? null
    ), a = R(null);
    function o(d) {
      a.value = yt(d).exclude ? "out" : "in";
    }
    function l(d) {
      o(d), window.addEventListener("keydown", o), window.addEventListener("keyup", o);
    }
    function i() {
      a.value = null, window.removeEventListener("keydown", o), window.removeEventListener("keyup", o);
    }
    _e(i);
    const r = f(() => s.value ? n.drillHref(t.entry.row, null) : null);
    function c(d, m) {
      m.stopPropagation(), n.drill(t.entry.row, null, d);
    }
    return (d, m) => s.value ? (u(), I(de, {
      key: 0,
      class: "dc-scope",
      href: r.value,
      "data-dc-pending": a.value ?? void 0,
      title: `Narrow everything to ${s.value}: ${e.entry.row.id} — ⌥-click to leave it out`,
      "aria-label": `Narrow everything to ${e.entry.parts.identity}`,
      onPointerenter: l,
      onPointermove: o,
      onPointerleave: i,
      onPress: c
    }, {
      default: ne(() => [...m[0] || (m[0] = [
        ae(" → ", -1)
      ])]),
      _: 1
    }, 8, ["href", "data-dc-pending", "title", "aria-label"])) : M("", !0);
  }
}), je = /* @__PURE__ */ V(ul, [["__scopeId", "data-v-05d2c233"]]), dl = ["checked", "aria-label"], Ce = /* @__PURE__ */ F({
  __name: "SelectTick",
  props: {
    row: {},
    selected: { type: Boolean },
    name: {}
  },
  setup(e) {
    const t = e, n = J();
    function s(a) {
      a.stopPropagation(), n.toggleSelect(t.row);
    }
    return (a, o) => (u(), p("input", {
      class: "dc-tick",
      type: "checkbox",
      checked: e.selected,
      "aria-label": `Select ${e.name}`,
      onClick: s
    }, null, 8, dl));
  }
}), fl = { class: "dc-card__top dc-mono" }, vl = { class: "dc-card__lead" }, pl = {
  key: 2,
  class: "dc-card__entity"
}, hl = { class: "dc-card__top-right" }, ml = { class: "dc-card__names" }, yl = { class: "dc-card__primary" }, _l = {
  key: 0,
  class: "dc-card__secondary dc-mono"
}, gl = {
  key: 1,
  class: "dc-card__facts dc-mono"
}, kl = ["title"], wl = { class: "dc-card__fact-label" }, bl = {
  key: 0,
  class: "dc-card__metrics dc-mono"
}, $l = {
  key: 0,
  class: "dc-card__date"
}, xl = /* @__PURE__ */ F({
  __name: "CardsView",
  setup(e) {
    const t = J(), n = Se(), s = f(() => t.isEverything.value), a = (l) => l.entity?.card === "picture", o = f(() => n.value.length > 0 && n.value.every(a));
    return (l, i) => (u(), p("div", {
      class: ue(["dc-cards", { "dc-cards--pictures": o.value }])
    }, [
      (u(!0), p(D, null, Y(x(n), (r) => (u(), p("div", {
        key: r.key,
        class: ue(["dc-card", { "dc-card--picture": a(r) }])
      }, [
        w("div", fl, [
          w("span", vl, [
            x(t).selectable.value ? (u(), I(Ce, {
              key: 0,
              row: r.row,
              selected: r.selected,
              name: r.parts.identity
            }, null, 8, ["row", "selected", "name"])) : M("", !0),
            a(r) ? M("", !0) : (u(), p(D, { key: 1 }, [
              ae(E(r.ordinal), 1)
            ], 64)),
            s.value ? (u(), p("span", pl, E(r.entityLabel), 1)) : M("", !0)
          ]),
          w("span", hl, [
            r.parts.state && !a(r) ? (u(), I(Ve, {
              key: 0,
              status: r.parts.state
            }, null, 8, ["status"])) : M("", !0),
            a(r) ? (u(), I(en, {
              key: 1,
              entry: r
            }, null, 8, ["entry"])) : (u(), I(vs, {
              key: 2,
              entry: r
            }, null, 8, ["entry"])),
            Q(je, { entry: r }, null, 8, ["entry"]),
            Q(We, { entry: r }, null, 8, ["entry"]),
            x(t).pinnable.value ? (u(), I(Zt, {
              key: 3,
              row: r.row,
              name: r.parts.identity,
              pinned: r.pinned
            }, null, 8, ["row", "name", "pinned"])) : M("", !0)
          ])
        ]),
        Q(de, {
          class: "dc-card__open",
          href: x(t).pressHref(r.row),
          onPress: (c) => x(t).activate(r.row, c)
        }, {
          default: ne(() => [
            r.parts.image ? (u(), I(_t, {
              key: 0,
              class: "dc-card__image",
              src: r.parts.image
            }, null, 8, ["src"])) : M("", !0),
            w("span", ml, [
              w("span", yl, E(r.parts.identity), 1),
              a(r) ? M("", !0) : (u(), p("span", _l, E(r.parts.reference), 1)),
              r.parts.facts.length ? (u(), p("span", gl, [
                (u(!0), p(D, null, Y(r.parts.facts, (c) => (u(), p("span", {
                  key: c.column.key ?? c.label,
                  class: "dc-card__fact",
                  title: c.title || void 0
                }, [
                  w("span", wl, E(c.label), 1),
                  ae(" " + E(c.text), 1)
                ], 8, kl))), 128))
              ])) : M("", !0)
            ])
          ]),
          _: 2
        }, 1032, ["href", "onPress"]),
        a(r) ? M("", !0) : (u(), p("div", bl, [
          (u(!0), p(D, null, Y(r.parts.metrics.slice(0, 2), (c) => (u(), I(Ke, {
            key: c.column.key ?? c.label,
            entry: r,
            column: c.column
          }, {
            default: ne(() => [
              ae(E(c.label) + " " + E(c.text), 1)
            ]),
            _: 2
          }, 1032, ["entry", "column"]))), 128)),
          r.parts.updated ? (u(), p("span", $l, E(r.parts.updated), 1)) : M("", !0)
        ]))
      ], 2))), 128))
    ], 2));
  }
}), ps = /* @__PURE__ */ V(xl, [["__scopeId", "data-v-fd252138"]]), Sl = { class: "dc-grid" }, Cl = { class: "dc-tile__scrim" }, El = { class: "dc-tile__top dc-mono" }, Pl = { class: "dc-tile__chip" }, Ll = { class: "dc-tile__caption" }, Tl = { class: "dc-tile__secondary dc-truncate" }, Ml = { class: "dc-tile__primary" }, Al = /* @__PURE__ */ F({
  __name: "GridView",
  setup(e) {
    const t = J(), n = Se();
    return (s, a) => (u(), p("div", Sl, [
      (u(!0), p(D, null, Y(x(n), (o) => (u(), p("div", {
        key: o.key,
        class: "dc-grid__cell"
      }, [
        Q(de, {
          class: "dc-tile",
          style: se({ "--dc-tile-tint": o.parts.tint ?? void 0 }),
          href: x(t).pressHref(o.row),
          onPress: (l) => x(t).activate(o.row, l)
        }, {
          default: ne(() => [
            o.parts.image ? (u(), I(_t, {
              key: 0,
              class: "dc-tile__image",
              src: o.parts.image
            }, null, 8, ["src"])) : M("", !0),
            w("span", Cl, [
              w("span", El, [
                w("span", Pl, E(o.ordinal), 1)
              ]),
              w("span", Ll, [
                w("span", Tl, E(o.parts.reference), 1),
                w("span", Ml, E(o.parts.identity), 1)
              ])
            ])
          ]),
          _: 2
        }, 1032, ["style", "href", "onPress"]),
        x(t).selectable.value ? (u(), I(Ce, {
          key: 0,
          class: "dc-grid__tick",
          row: o.row,
          selected: o.selected,
          name: o.parts.identity
        }, null, 8, ["row", "selected", "name"])) : M("", !0)
      ]))), 128))
    ]));
  }
}), hs = /* @__PURE__ */ V(Al, [["__scopeId", "data-v-89c40a9e"]]);
function $n(e, t, n, s) {
  return (n - s * (t - 1)) / e;
}
function St(e, t) {
  return e > 0 ? Math.min(t, e) : t;
}
function Ol(e) {
  return e > 0 ? e : 1 / 0;
}
function Nl(e, t, n) {
  const { width: s, height: a, gap: o = 0 } = n;
  if (!e.length) return [];
  if (!(s > 0) || !(a > 0)) return [{ items: [...e], height: a, filled: !1 }];
  const l = [];
  let i = [], r = 0, c = 0;
  for (const d of e) {
    const m = t(d), _ = Math.max(m.ratio, Number.EPSILON), b = m.height && m.height > 0 ? Math.max(c, m.height) : c, $ = St(b, a), h = $n(r + _, i.length + 1, s, o);
    if (h > $) {
      i.push(d), r += _, c = b;
      continue;
    }
    const g = St(c, a), v = i.length ? $n(r, i.length, s, o) : 1 / 0;
    v <= Ol(c) && v - g < $ - h ? (l.push({ items: i, height: v, filled: !0 }), i = [d], r = _, c = m.height && m.height > 0 ? m.height : 0) : (l.push({ items: [...i, d], height: h, filled: !0 }), i = [], r = 0, c = 0);
  }
  return i.length && l.push({ items: i, height: St(c, a), filled: !1 }), l;
}
const Il = { class: "dc-images" }, Rl = {
  key: 1,
  class: "dc-images__blank",
  "aria-hidden": "true"
}, Bl = 240, Qe = 8, ql = 1, Fl = /* @__PURE__ */ F({
  __name: "ImagesView",
  setup(e) {
    const t = J(), n = Se(), s = an(/* @__PURE__ */ new Map()), a = an(/* @__PURE__ */ new Set());
    function o($, h) {
      const g = h.target;
      g.naturalWidth > 0 && g.naturalHeight > 0 && s.set($, { width: g.naturalWidth, height: g.naturalHeight });
    }
    function l($) {
      const h = $.parts.image;
      return h && !a.has(h) ? h : null;
    }
    function i($) {
      const h = l($);
      return h ? s.get(h) : void 0;
    }
    function r($) {
      const h = i($);
      return h ? { ratio: h.width / h.height, height: h.height } : { ratio: ql };
    }
    const c = R(null), d = R(0);
    let m = null;
    function _() {
      d.value = c.value?.clientWidth ?? 0;
    }
    rt(() => {
      _(), !(!c.value || typeof ResizeObserver > "u") && (m = new ResizeObserver(_), m.observe(c.value));
    }), _e(() => {
      m?.disconnect(), m = null;
    });
    const b = f(() => {
      const $ = Nl(n.value, r, {
        width: d.value,
        height: Bl,
        gap: Qe
      }), h = [];
      let g = 0;
      for (const v of $) {
        let k = 0;
        for (const y of v.items) {
          const S = r(y).ratio * v.height, A = i(y), N = A !== void 0 && A.height < v.height;
          h.push({
            entry: y,
            style: {
              top: `${g}px`,
              left: `${k}px`,
              width: `${S}px`,
              height: `${v.height}px`
            },
            picture: N ? { width: `${A.width}px`, height: `${A.height}px` } : { width: "100%", height: "100%" }
          }), k += S + Qe;
        }
        g += v.height + Qe;
      }
      return { boxes: h, height: $.length ? g - Qe : 0 };
    });
    return ($, h) => (u(), p("div", Il, [
      w("div", {
        ref_key: "wall",
        ref: c,
        class: "dc-images__wall",
        style: se({ height: `${b.value.height}px` })
      }, [
        (u(!0), p(D, null, Y(b.value.boxes, ({ entry: g, style: v, picture: k }) => (u(), p("div", {
          key: g.key,
          class: "dc-images__cell",
          style: se(v)
        }, [
          Q(de, {
            class: "dc-images__open",
            title: g.parts.identity,
            "aria-label": g.parts.identity,
            href: x(t).pressHref(g.row),
            onPress: (y) => x(t).activate(g.row, y)
          }, {
            default: ne(() => [
              l(g) ? (u(), I(_t, {
                key: 0,
                class: "dc-images__picture",
                style: se(k),
                src: l(g),
                onLoad: (y) => o(l(g), y),
                onError: (y) => a.add(l(g))
              }, null, 8, ["style", "src", "onLoad", "onError"])) : (u(), p("span", Rl, E(g.parts.identity), 1))
            ]),
            _: 2
          }, 1032, ["title", "aria-label", "href", "onPress"]),
          x(t).selectable.value ? (u(), I(Ce, {
            key: 0,
            class: "dc-images__tick",
            row: g.row,
            selected: g.selected,
            name: g.parts.identity
          }, null, 8, ["row", "selected", "name"])) : M("", !0)
        ], 4))), 128))
      ], 4)
    ]));
  }
}), ms = /* @__PURE__ */ V(Fl, [["__scopeId", "data-v-2d267370"]]), Hl = { class: "dc-links" }, Dl = { class: "dc-link__primary dc-truncate" }, Vl = { class: "dc-link__secondary dc-mono dc-truncate" }, Kl = /* @__PURE__ */ F({
  __name: "LinksView",
  setup(e) {
    const t = J(), n = Se();
    return (s, a) => (u(), p("div", Hl, [
      (u(!0), p(D, null, Y(x(n), (o) => (u(), p("span", {
        key: o.key,
        class: "dc-links__item"
      }, [
        x(t).selectable.value ? (u(), I(Ce, {
          key: 0,
          row: o.row,
          selected: o.selected,
          name: o.parts.identity
        }, null, 8, ["row", "selected", "name"])) : M("", !0),
        Q(de, {
          class: "dc-link",
          href: x(t).pressHref(o.row),
          onPress: (l) => x(t).activate(o.row, l)
        }, {
          default: ne(() => [
            w("span", Dl, E(o.parts.identity), 1),
            w("span", Vl, E(o.parts.reference), 1)
          ]),
          _: 2
        }, 1032, ["href", "onPress"])
      ]))), 128))
    ]));
  }
}), ys = /* @__PURE__ */ V(Kl, [["__scopeId", "data-v-de6c9a0f"]]), Wl = {
  class: "dc-list",
  role: "list"
}, jl = { class: "dc-list__ordinal dc-mono" }, zl = { class: "dc-list__identity" }, Ul = { class: "dc-list__primary dc-truncate" }, Ql = { class: "dc-list__secondary dc-mono dc-truncate" }, Gl = {
  key: 1,
  class: "dc-list__entity dc-mono"
}, Yl = { class: "dc-list__metrics dc-mono" }, Xl = { class: "dc-list__trailing" }, Jl = /* @__PURE__ */ F({
  __name: "ListView",
  setup(e) {
    const t = J(), n = Se(), s = f(() => t.isEverything.value);
    return (a, o) => (u(), p("div", Wl, [
      (u(!0), p(D, null, Y(x(n), (l) => (u(), p("div", {
        key: l.key,
        class: "dc-list__row",
        role: "listitem"
      }, [
        x(t).selectable.value ? (u(), I(Ce, {
          key: 0,
          class: "dc-list__tick",
          row: l.row,
          selected: l.selected,
          name: l.parts.identity
        }, null, 8, ["row", "selected", "name"])) : M("", !0),
        Q(vs, {
          class: "dc-list__standing",
          entry: l
        }, null, 8, ["entry"]),
        Q(de, {
          class: "dc-list__open",
          href: x(t).pressHref(l.row),
          onPress: (i) => x(t).activate(l.row, i)
        }, {
          default: ne(() => [
            w("span", jl, E(l.ordinal), 1),
            w("span", zl, [
              w("span", Ul, E(l.parts.identity), 1),
              w("span", Ql, E(l.parts.reference), 1)
            ])
          ]),
          _: 2
        }, 1032, ["href", "onPress"]),
        s.value ? (u(), p("span", Gl, E(l.entityLabel), 1)) : M("", !0),
        w("span", Yl, [
          (u(!0), p(D, null, Y(l.parts.metrics.slice(0, 2), (i) => (u(), I(Ke, {
            key: i.column.key ?? i.label,
            entry: l,
            column: i.column
          }, null, 8, ["entry", "column"]))), 128))
        ]),
        w("span", Xl, [
          l.parts.state ? (u(), I(Ve, {
            key: 0,
            status: l.parts.state
          }, null, 8, ["status"])) : M("", !0),
          Q(je, { entry: l }, null, 8, ["entry"]),
          Q(We, { entry: l }, null, 8, ["entry"]),
          x(t).pinnable.value ? (u(), I(Zt, {
            key: 1,
            row: l.row,
            name: l.parts.identity,
            pinned: l.pinned
          }, null, 8, ["row", "name", "pinned"])) : M("", !0)
        ])
      ]))), 128))
    ]));
  }
}), Rt = /* @__PURE__ */ V(Jl, [["__scopeId", "data-v-3d349a10"]]), Zl = { class: "dc-preview" }, er = { class: "dc-preview__pager dc-mono" }, tr = ["disabled"], nr = { "aria-live": "polite" }, sr = ["disabled"], ar = {
  key: 0,
  class: "dc-preview__card"
}, or = ["src"], lr = { class: "dc-preview__body" }, rr = { class: "dc-preview__top" }, ir = { class: "dc-preview__badges" }, cr = { class: "dc-preview__entity dc-mono" }, ur = { class: "dc-preview__marks" }, dr = { class: "dc-preview__primary" }, fr = { class: "dc-preview__secondary dc-mono" }, vr = { class: "dc-preview__fields" }, pr = { class: "dc-preview__key" }, hr = { class: "dc-preview__value dc-mono" }, mr = /* @__PURE__ */ F({
  __name: "PreviewView",
  setup(e) {
    const t = J(), n = Se(), s = R(0);
    ee(n, (r) => {
      s.value > r.length - 1 && (s.value = Math.max(0, r.length - 1));
    });
    const a = f(() => n.value[s.value]), o = f(() => {
      const r = a.value;
      if (!r) return [];
      const c = fe(r.columns, "reference"), d = fe(r.columns, "updated");
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
      return `${s.value + 1} / ${n.value.length}${r}`;
    }), i = (r) => {
      const c = n.value.length;
      c && (s.value = Math.min(c - 1, Math.max(0, s.value + r)));
    };
    return (r, c) => (u(), p("div", Zl, [
      w("div", er, [
        w("button", {
          type: "button",
          class: "dc-preview__step",
          "aria-label": "Previous result",
          disabled: s.value === 0,
          onClick: c[0] || (c[0] = (d) => i(-1))
        }, " ‹ ", 8, tr),
        w("span", nr, E(l.value), 1),
        w("button", {
          type: "button",
          class: "dc-preview__step",
          "aria-label": "Next result",
          disabled: s.value >= x(n).length - 1,
          onClick: c[1] || (c[1] = (d) => i(1))
        }, " › ", 8, sr)
      ]),
      a.value ? (u(), p("div", ar, [
        w("div", {
          class: "dc-preview__media",
          style: se({ background: a.value.parts.tint ?? void 0 }),
          "aria-hidden": "true"
        }, [
          a.value.parts.image ? (u(), p("img", {
            key: 0,
            class: "dc-preview__image",
            src: a.value.parts.image,
            alt: ""
          }, null, 8, or)) : (u(), p(D, { key: 1 }, [
            ae(" preview ")
          ], 64))
        ], 4),
        w("div", lr, [
          w("div", rr, [
            w("span", ir, [
              x(t).selectable.value ? (u(), I(Ce, {
                key: 0,
                row: a.value.row,
                selected: a.value.selected,
                name: a.value.parts.identity
              }, null, 8, ["row", "selected", "name"])) : M("", !0),
              a.value.parts.state ? (u(), I(Ve, {
                key: 1,
                status: a.value.parts.state
              }, null, 8, ["status"])) : M("", !0),
              w("span", cr, E(a.value.entityLabel), 1)
            ]),
            w("span", ur, [
              Q(en, { entry: a.value }, null, 8, ["entry"]),
              Q(je, { entry: a.value }, null, 8, ["entry"]),
              Q(We, { entry: a.value }, null, 8, ["entry"]),
              x(t).pinnable.value ? (u(), I(Zt, {
                key: 0,
                row: a.value.row,
                name: a.value.parts.identity,
                pinned: a.value.pinned
              }, null, 8, ["row", "name", "pinned"])) : M("", !0)
            ])
          ]),
          w("div", null, [
            w("div", dr, E(a.value.parts.identity), 1),
            w("div", fr, E(a.value.parts.reference), 1)
          ]),
          w("dl", vr, [
            (u(!0), p(D, null, Y(o.value, (d) => (u(), p("div", {
              key: d.key,
              class: "dc-preview__field"
            }, [
              w("dt", pr, E(d.key), 1),
              w("dd", hr, [
                d.column && a.value ? (u(), I(Ke, {
                  key: 0,
                  entry: a.value,
                  column: d.column
                }, null, 8, ["entry", "column"])) : (u(), p(D, { key: 1 }, [
                  ae(E(d.value), 1)
                ], 64))
              ])
            ]))), 128))
          ]),
          Q(de, {
            class: "dc-preview__open",
            href: a.value ? x(t).pressHref(a.value.row) : null,
            onPress: c[2] || (c[2] = (d) => a.value && x(t).activate(a.value.row, d))
          }, {
            default: ne(() => [...c[3] || (c[3] = [
              ae(" Open record → ", -1)
            ])]),
            _: 1
          }, 8, ["href"])
        ])
      ])) : M("", !0)
    ]));
  }
}), _s = /* @__PURE__ */ V(mr, [["__scopeId", "data-v-59e0d33b"]]);
function yr() {
  const e = J();
  return f(() => ta(e.schema.value, e.entity.value));
}
const _r = {
  key: 5,
  class: "dc-cell__text"
}, gr = /* @__PURE__ */ F({
  __name: "ColumnCell",
  props: {
    column: {},
    entry: {}
  },
  setup(e) {
    const t = e, n = J(), s = f(() => t.column.kind ?? "text"), a = f(() => ce(t.column, t.entry.row)), o = f(
      () => s.value === "ordinal" ? t.entry.ordinal : Pe(t.column, t.entry.row)
    ), l = f(() => a.value), i = f(() => t.column.activate === !0 || !!t.column.click), r = f(() => Tt(t.column)), c = f(() => In(t.column, t.entry.row));
    function d(b) {
      i.value && (b.stopPropagation(), m(yt(b)));
    }
    function m(b) {
      t.column.click?.(t.entry.row, b), t.column.activate && n.activate(t.entry.row, b);
    }
    const _ = f(
      () => t.column.activate && !t.column.click ? n.pressHref(t.entry.row) : null
    );
    return (b, $) => s.value === "component" && e.column.component ? (u(), I(it(e.column.component), {
      key: 0,
      row: e.entry.row,
      entry: e.entry,
      value: a.value,
      column: e.column
    }, null, 8, ["row", "entry", "value", "column"])) : s.value === "status" ? (u(), I(Ve, {
      key: 1,
      status: l.value
    }, null, 8, ["status"])) : s.value === "image" ? (u(), I(_t, {
      key: 2,
      class: "dc-cell__image",
      src: typeof a.value == "string" ? a.value : "",
      style: se({ maxHeight: e.column.height }),
      onClick: d
    }, null, 8, ["src", "style"])) : e.column.drill ? (u(), I(Ke, {
      key: 3,
      entry: e.entry,
      column: e.column
    }, null, 8, ["entry", "column"])) : i.value ? (u(), I(de, {
      key: 4,
      class: ue(["dc-table__open", { "dc-truncate": r.value }]),
      href: _.value,
      title: c.value,
      onPress: $[0] || ($[0] = (h, g) => {
        g.stopPropagation(), m(h);
      })
    }, {
      default: ne(() => [
        ae(E(o.value), 1)
      ]),
      _: 1
    }, 8, ["class", "href", "title"])) : (u(), p("span", _r, E(o.value), 1));
  }
}), xn = /* @__PURE__ */ V(gr, [["__scopeId", "data-v-4dd1835e"]]), kr = {
  key: 0,
  class: "dc-table__none"
}, wr = { class: "dc-table__detail" }, br = ["data-dc-wrap", "data-dc-row-links"], $r = { "data-dc-stuck": "" }, xr = {
  key: 0,
  class: "dc-table__pick",
  scope: "col"
}, Sr = {
  key: 1,
  class: "dc-table__standing",
  scope: "col"
}, Cr = ["data-dc-align", "data-dc-hide", "aria-sort", "title"], Er = ["onClick"], Pr = {
  key: 2,
  class: "dc-table__head"
}, Lr = ["onClick"], Tr = {
  key: 0,
  class: "dc-table__pick"
}, Mr = {
  key: 1,
  class: "dc-table__standing"
}, Ar = ["data-dc-align", "data-dc-hide", "title"], Or = {
  key: 1,
  class: "dc-table__name"
}, Nr = /* @__PURE__ */ F({
  __name: "TableView",
  setup(e) {
    const t = J(), n = Se(), s = yr();
    function a(T, K) {
      const P = t.pressHref(T);
      if (P && Jn(K)) {
        const z = K.shiftKey ? `noopener,popup,width=${window.outerWidth},height=${window.outerHeight}` : "noopener";
        window.open(P, "_blank", z);
        return;
      }
      t.activate(T, yt(K));
    }
    const o = f(() => t.rowLinks?.value ? new Map(n.value.map((T) => [T.key, t.pressHref(T.row)])) : /* @__PURE__ */ new Map()), l = f(
      () => s.value.find((T) => T.role === "identity") ?? s.value[0]
    );
    function i(T, K, P) {
      P.stopPropagation(), t.activate(T, K);
    }
    function r(T) {
      const K = Hn(T, t.entity.value, t.schema.value), P = K ? `Shortcut: ${K}` : void 0;
      return [T.hint, P].filter(Boolean).join(`
`) || void 0;
    }
    const c = f(() => {
      const T = s.value.find((P) => P.scope);
      return T || ((t.entity.value ? !!t.entity.value.href : t.entities.value.some((P) => P.href)) ? s.value.find((P) => P.activate) : void 0);
    }), d = f(
      () => t.entity.value ? !!t.entity.value.scope : t.entities.value.some((T) => T.scope)
    ), m = (T) => ht(T.entity, T.row), _ = (T) => Yt(t.query.value.expr, m(T));
    function b(T, K) {
      t.setExpression(Ot(t.query.value.expr, m(T), K));
    }
    const $ = f(() => {
      const T = n.value.filter((P) => m(P) !== null), K = T.filter((P) => P.selected);
      return K.length ? K : T;
    }), h = f(() => $.value.some((T) => T.selected)), g = f(() => {
      const T = $.value[0];
      return T ? _(T) : null;
    }), v = f(
      () => $.value.some((T) => _(T) !== g.value)
    ), k = f(
      () => h.value ? "the ticked rows" : "every row on this page"
    );
    function y(T) {
      t.setExpression(
        $.value.reduce(
          (K, P) => Ot(K, m(P), T),
          t.query.value.expr
        )
      );
    }
    const S = f(
      () => s.value.some((T) => T.kind === "image" || T.height !== void 0)
    );
    function A(T) {
      T && (t.query.value.sort === T ? t.toggleDirection() : t.setSort(T));
    }
    const N = f(() => t.entity.value?.label ?? "The result set"), G = f(() => new Set(t.sorts.value.map((T) => T.key))), B = (T) => T.sort !== void 0 && G.value.has(T.sort), W = (T) => {
      if (B(T))
        return t.query.value.sort !== T.sort ? "none" : t.query.value.dir === "desc" ? "descending" : "ascending";
    };
    function Z(T) {
      return [
        fn(T),
        T.muted ? "dc-table__muted" : "",
        T.mono ? "dc-mono" : "",
        Tt(T) ? "dc-truncate" : ""
      ].filter(Boolean).join(" ");
    }
    function ve(T, K) {
      if (!(!Tt(T) || T.activate || T.click))
        return In(T, K.row);
    }
    return (T, K) => x(s).length ? (u(), p("table", {
      key: 1,
      class: "dc-table",
      "data-dc-wrap": S.value ? "" : void 0,
      "data-dc-row-links": x(t).rowLinks?.value ? "" : void 0
    }, [
      w("thead", $r, [
        w("tr", null, [
          x(t).selectable.value ? (u(), p("th", xr, [
            Q(us)
          ])) : M("", !0),
          d.value ? (u(), p("th", Sr, [
            $.value.length ? (u(), I(It, {
              key: 0,
              standing: g.value,
              mixed: v.value,
              name: k.value,
              onSet: y
            }, null, 8, ["standing", "mixed", "name"])) : M("", !0)
          ])) : M("", !0),
          (u(!0), p(D, null, Y(x(s), (P, z) => (u(), p("th", {
            key: x(un)(P, z),
            scope: "col",
            class: ue(x(fn)(P)),
            style: se({ width: P.width }),
            "data-dc-align": x(dn)(P),
            "data-dc-hide": P.hideBelow,
            "aria-sort": W(P),
            title: r(P)
          }, [
            B(P) ? (u(), p("button", {
              key: 0,
              type: "button",
              class: "dc-table__sort",
              onClick: (re) => A(P.sort)
            }, E(P.label), 9, Er)) : (u(), p(D, { key: 1 }, [
              ae(E(P.label), 1)
            ], 64)),
            P.header ? (u(), p("span", Pr, [
              (u(), I(it(P.header), {
                column: P,
                entity: x(t).entity.value
              }, null, 8, ["column", "entity"]))
            ])) : M("", !0)
          ], 14, Cr))), 128))
        ])
      ]),
      w("tbody", null, [
        (u(!0), p(D, null, Y(x(n), (P) => (u(), p("tr", {
          key: P.key,
          class: "dc-table__row",
          onClick: (z) => a(P.row, z)
        }, [
          x(t).selectable.value ? (u(), p("td", Tr, [
            Q(Ce, {
              row: P.row,
              selected: P.selected,
              name: P.parts.identity
            }, null, 8, ["row", "selected", "name"])
          ])) : M("", !0),
          d.value ? (u(), p("td", Mr, [
            m(P) !== null ? (u(), I(It, {
              key: 0,
              standing: _(P),
              name: P.parts.identity,
              onSet: (z) => b(P, z)
            }, null, 8, ["standing", "name", "onSet"])) : M("", !0)
          ])) : M("", !0),
          (u(!0), p(D, null, Y(x(s), (z, re) => (u(), p("td", {
            key: x(un)(z, re),
            class: ue(Z(z)),
            "data-dc-align": x(dn)(z),
            "data-dc-hide": z.hideBelow,
            title: ve(z, P)
          }, [
            o.value.get(P.key) ? (u(), I(de, {
              key: 0,
              class: "dc-table__cell-link",
              href: o.value.get(P.key),
              tabindex: z === l.value ? void 0 : -1,
              "aria-hidden": z === l.value ? void 0 : "true",
              "aria-label": z === l.value ? P.parts.identity : void 0,
              onPress: (le, te) => i(P.row, le, te)
            }, null, 8, ["href", "tabindex", "aria-hidden", "aria-label", "onPress"])) : M("", !0),
            z === c.value ? (u(), p("span", Or, [
              Q(xn, {
                column: z,
                entry: P
              }, null, 8, ["column", "entry"]),
              Q(je, { entry: P }, null, 8, ["entry"]),
              Q(We, { entry: P }, null, 8, ["entry"])
            ])) : (u(), I(xn, {
              key: 2,
              column: z,
              entry: P
            }, null, 8, ["column", "entry"]))
          ], 10, Ar))), 128))
        ], 8, Lr))), 128))
      ])
    ], 8, br)) : (u(), p("p", kr, [
      K[2] || (K[2] = w("span", { class: "dc-table__headline" }, "No columns declared", -1)),
      w("span", wr, [
        ae(E(N.value) + " has no ", 1),
        K[0] || (K[0] = w("code", null, "columns", -1)),
        K[1] || (K[1] = ae(" in the schema, so there is no table to draw. ", -1))
      ])
    ]));
  }
}), gs = /* @__PURE__ */ V(Nr, [["__scopeId", "data-v-04d33c1b"]]);
function Ir(e) {
  const t = ye([]), n = R(!1), s = ye(null);
  let a = 0;
  const o = (r, c, d, m, _) => ({
    entity: r,
    rows: e.limit.value > 0 ? c.rows.map((b, $) => fs(b, $, r, e.isPinned(b.id))) : [],
    total: c.total,
    count: d ? Lt(r) : Ye(c.total),
    pinned: Rr(m, c, _)
  }), l = () => {
    const r = ++a, c = e.query.value, d = e.schema.value, m = e.entities.value, _ = e.limit.value, b = e.within?.value.trim() ?? "", $ = Dt(c) && !b, h = b ? zt(b, c.expr) : c.expr, g = m.map((v) => ({
      entity: v,
      // Scope the query to this entity, keeping the expression and ordering.
      outcome: e.source.value.query({
        // Each card is the top few of its type, wherever the shell's own
        // result set has been paged to — so this asks for the first page.
        query: { ...c, entity: v.key, expr: h, page: 1 },
        schema: d,
        entity: v,
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
    if (g.every(({ outcome: v }) => !(v instanceof Promise))) {
      t.value = g.map(
        ({ entity: v, outcome: k }) => o(v, k, $, d, h)
      ), s.value = null, n.value = !1;
      return;
    }
    n.value = !0, Promise.all(g.map(({ outcome: v }) => Promise.resolve(v))).then((v) => {
      r === a && (t.value = v.map(
        (k, y) => o(g[y].entity, k, $, d, h)
      ), s.value = null);
    }).catch((v) => {
      r === a && (s.value = v, t.value = []);
    }).finally(() => {
      r === a && (n.value = !1);
    });
  }, i = () => {
    try {
      l();
    } catch (r) {
      s.value = r, t.value = [], n.value = !1;
    }
  };
  return ee(
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
  ), { previews: t, pending: n, error: s, refresh: i };
}
function Rr(e, t, n) {
  const s = t.rows[0];
  if (t.total !== 1 || t.rows.length !== 1 || !s)
    return !1;
  const a = n.trim();
  if (!a)
    return !1;
  const o = et(e, s);
  return !!o && De(a, o) === a;
}
const Br = ["data-dc-pending", "data-dc-heads-only"], qr = {
  key: 0,
  class: "dc-types__state",
  role: "alert"
}, Fr = {
  key: 1,
  class: "dc-types__state",
  "aria-live": "polite"
}, Hr = {
  key: 2,
  class: "dc-types__state"
}, Dr = ["data-dc-empty"], Vr = { class: "dc-type__name" }, Kr = { class: "dc-type__count dc-mono" }, Wr = { class: "dc-type__sr" }, jr = {
  key: 0,
  class: "dc-type__description"
}, zr = {
  key: 0,
  class: "dc-type__empty"
}, Ur = { class: "dc-type__identity" }, Qr = { class: "dc-type__primary dc-truncate" }, Gr = { class: "dc-type__secondary dc-mono dc-truncate" }, Yr = { class: "dc-type__trailing dc-mono" }, Xr = { class: "dc-type__metric-value" }, Jr = { class: "dc-type__metric-label" }, Zr = {
  key: 0,
  class: "dc-type__date"
}, ei = ["onClick"], ti = /* @__PURE__ */ F({
  __name: "TypeCardsView",
  setup(e) {
    const t = J(), { previews: n, pending: s, error: a } = Ir({
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
      "data-dc-pending": x(s) ? "true" : "false",
      "data-dc-heads-only": l.value ? "true" : "false"
    }, [
      j(r.$slots, "before", {}, void 0, !0),
      x(a) ? (u(), p("p", qr, " Could not load results: " + E(x(a) instanceof Error ? x(a).message : "the data source failed."), 1)) : !i.value.length && x(s) ? (u(), p("p", Fr, " Running query… ")) : i.value.length ? M("", !0) : (u(), p("p", Hr, E(o.value ? "Nothing matches this query" : "Nothing here yet"), 1)),
      (u(!0), p(D, null, Y(i.value, (d) => (u(), p("section", {
        key: d.entity.key,
        class: "dc-type",
        "data-dc-empty": d.total ? "false" : "true"
      }, [
        Q(de, {
          class: "dc-type__head",
          href: x(t).entityHref(d.entity.key),
          onPress: (m) => x(t).setEntity(d.entity.key)
        }, {
          default: ne(() => [
            w("span", Vr, E(d.entity.label), 1),
            w("span", Kr, E(d.count), 1),
            c[0] || (c[0] = w("span", {
              class: "dc-type__go",
              "aria-hidden": "true"
            }, "→", -1)),
            w("span", Wr, "Show only " + E(d.entity.label.toLowerCase()), 1),
            d.entity.description ? (u(), p("span", jr, E(d.entity.description), 1)) : M("", !0)
          ]),
          _: 2
        }, 1032, ["href", "onPress"]),
        d.total ? M("", !0) : (u(), p("p", zr, E(o.value ? "No matches" : "Nothing here yet"), 1)),
        (u(!0), p(D, null, Y(d.rows, (m) => (u(), p("div", {
          key: m.key,
          class: "dc-type__row"
        }, [
          Q(de, {
            class: "dc-type__open",
            href: x(t).pressHref(m.row),
            onPress: (_) => x(t).activate(m.row, _)
          }, {
            default: ne(() => [
              w("span", Ur, [
                w("span", Qr, E(m.parts.identity), 1),
                w("span", Gr, E(m.parts.reference), 1)
              ])
            ]),
            _: 2
          }, 1032, ["href", "onPress"]),
          w("span", Yr, [
            (u(!0), p(D, null, Y(m.parts.metrics.slice(0, 1), (_) => (u(), I(Ke, {
              key: _.column.key ?? _.label,
              class: "dc-type__metric",
              entry: m,
              column: _.column
            }, {
              default: ne(() => [
                w("span", Xr, E(_.text), 1),
                w("span", Jr, E(_.label), 1)
              ]),
              _: 2
            }, 1032, ["entry", "column"]))), 128)),
            m.parts.updated ? (u(), p("span", Zr, E(m.parts.updated), 1)) : M("", !0),
            Q(en, { entry: m }, null, 8, ["entry"]),
            Q(je, { entry: m }, null, 8, ["entry"]),
            Q(We, { entry: m }, null, 8, ["entry"])
          ])
        ]))), 128)),
        d.entity.create && !l.value ? (u(), p("button", {
          key: 1,
          type: "button",
          class: "dc-type__new",
          onClick: (m) => x(t).create(d.entity)
        }, [
          c[1] || (c[1] = w("span", {
            class: "dc-type__plus",
            "aria-hidden": "true"
          }, "+", -1)),
          ae(" " + E(d.entity.create), 1)
        ], 8, ei)) : M("", !0)
      ], 8, Dr))), 128)),
      j(r.$slots, "after", {}, void 0, !0)
    ], 8, Br));
  }
}), ks = /* @__PURE__ */ V(ti, [["__scopeId", "data-v-9cb44b6c"]]), ni = ["data-dc-pending", "data-dc-more"], si = {
  key: 0,
  class: "dc-results__state dc-results__state--loading",
  "aria-live": "polite"
}, ai = {
  key: 2,
  class: "dc-results__state",
  role: "alert"
}, oi = { class: "dc-results__detail" }, li = {
  key: 3,
  class: "dc-results__state",
  "aria-live": "polite"
}, ri = {
  key: 4,
  class: "dc-results__state"
}, ii = { class: "dc-results__detail" }, ci = /* @__PURE__ */ F({
  __name: "ResultsArea",
  props: {
    views: {},
    loading: { type: Boolean }
  },
  setup(e) {
    const t = e, n = J(), s = at(), a = {
      list: Rt,
      cards: ps,
      grid: hs,
      images: ms,
      table: gs,
      links: ys,
      preview: _s
    }, o = f(() => Vt(n.query.value, t.views)), l = f(() => Ht(n.query.value.view, t.views)), i = f(() => a[l.value] ?? Rt), r = f(() => n.rows.value.length > 0), c = f(() => n.error.value !== null), d = R(null);
    ee(
      // The page on screen, which is the draft's own while one is being typed.
      () => n.liveQuery.value.page,
      () => {
        d.value && (d.value.scrollTop = 0);
      }
    );
    const m = R(""), _ = R({ x: 0, y: 0 }), b = R(0);
    function $() {
      const v = d.value;
      if (!v) {
        m.value = "";
        return;
      }
      const k = {
        top: v.scrollTop > 1,
        right: v.scrollWidth - v.clientWidth - v.scrollLeft > 1,
        bottom: v.scrollHeight - v.clientHeight - v.scrollTop > 1,
        left: v.scrollLeft > 1
      };
      m.value = Object.entries(k).filter(([, y]) => y).map(([y]) => y).join(" "), _.value = {
        x: v.offsetHeight - v.clientHeight,
        y: v.offsetWidth - v.clientWidth
      }, b.value = v.querySelector("[data-dc-stuck]")?.offsetHeight ?? 0;
    }
    let h = null, g = null;
    return ee(
      d,
      (v, k) => {
        if (k?.removeEventListener("scroll", $), h?.disconnect(), g?.disconnect(), h = null, g = null, $(), !v || (v.addEventListener("scroll", $, { passive: !0 }), typeof ResizeObserver > "u")) return;
        const y = new ResizeObserver($), S = () => {
          y.disconnect(), y.observe(v);
          for (const A of v.children) y.observe(A);
        };
        S(), h = y, !(typeof MutationObserver > "u") && (g = new MutationObserver(() => {
          S(), $();
        }), g.observe(v, { childList: !0 }));
      },
      { flush: "post" }
    ), _e(() => {
      d.value?.removeEventListener("scroll", $), h?.disconnect(), g?.disconnect();
    }), (v, k) => (u(), p("div", {
      ref_key: "scroller",
      ref: d,
      class: "dc-results",
      "data-dc-pending": x(n).pending.value ? "true" : "false",
      "data-dc-more": m.value,
      style: se({
        "--dc-results-gutter-x": `${_.value.x}px`,
        "--dc-results-gutter-y": `${_.value.y}px`,
        "--dc-results-stuck": `${b.value}px`
      })
    }, [
      e.loading ? (u(), p("p", si, [...k[1] || (k[1] = [
        w("span", { class: "dc-results__detail" }, "Loading…", -1)
      ])])) : o.value ? (u(), I(ks, { key: 1 }, Et({ _: 2 }, [
        s["cards-before"] ? {
          name: "before",
          fn: ne(() => [
            j(v.$slots, "cards-before", {}, void 0, !0)
          ]),
          key: "0"
        } : void 0,
        s["cards-after"] ? {
          name: "after",
          fn: ne(() => [
            j(v.$slots, "cards-after", {}, void 0, !0)
          ]),
          key: "1"
        } : void 0
      ]), 1024)) : c.value ? (u(), p("p", ai, [
        k[2] || (k[2] = w("span", { class: "dc-results__headline" }, "Could not load results", -1)),
        w("span", oi, E(x(n).error.value instanceof Error ? x(n).error.value.message : "The data source failed."), 1)
      ])) : !r.value && x(n).pending.value ? (u(), p("p", li, [...k[3] || (k[3] = [
        w("span", { class: "dc-results__detail" }, "Running query…", -1)
      ])])) : r.value ? (u(), I(it(i.value), { key: 5 })) : (u(), p("div", ri, [
        k[4] || (k[4] = w("span", { class: "dc-results__headline" }, "Nothing matches this query", -1)),
        w("span", ii, E(x(n).summary.value), 1),
        x(n).isPristine.value ? M("", !0) : (u(), p("button", {
          key: 0,
          type: "button",
          class: "dc-results__clear",
          onClick: k[0] || (k[0] = (y) => x(n).clearFilters())
        }, E(x(n).isEverything.value ? "Clear filters" : "Search everything instead"), 1))
      ]))
    ], 12, ni));
  }
}), ws = /* @__PURE__ */ V(ci, [["__scopeId", "data-v-71c5b73f"]]), ui = ["data-dc-theme"], di = { class: "dc-shell__head" }, fi = {
  key: 0,
  class: "dc-shell__page"
}, vi = /* @__PURE__ */ F({
  __name: "DataShell",
  props: /* @__PURE__ */ ln({
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
    typeChooser: { default: "scoped" },
    selectionPlacement: { default: "start" },
    accent: {},
    tokens: {},
    theme: { default: "minimal" },
    pinnable: { type: Boolean },
    selectable: { type: Boolean },
    rowPress: { default: "narrow" },
    rowLinks: { type: Boolean, default: !1 },
    pagesNote: {},
    navigationMode: { default: "push" },
    facetNavigationMode: { default: "replace" }
  }, {
    pinned: { default: () => [] },
    pinnedModifiers: {},
    selected: { default: () => [] },
    selectedModifiers: {}
  }),
  emits: /* @__PURE__ */ ln(["activate", "create", "duplicate", "delete", "operate", "drill", "query-change", "toggle-pin"], ["update:pinned", "update:selected"]),
  setup(e, { expose: t, emit: n }) {
    const s = e, a = n, o = on(e, "pinned"), l = on(e, "selected"), i = at(), r = Bt(Ln, null), c = s.route || r ? null : qs(), d = s.route ?? r ?? c;
    _e(() => c?.dispose?.());
    const m = R(!!i.page);
    Ls(() => {
      m.value = !!i.page;
    });
    const _ = Fs(d, {
      detached: () => m.value && s.pageQuery === "detached",
      path: () => s.listPath
    }), b = f(() => Aa({ seed: s.schema.key })), $ = f(() => s.source ?? b.value), h = Ja({
      schema: () => s.schema,
      adapter: _,
      defaults: () => s.defaults,
      navigationMode: () => s.navigationMode,
      facetNavigationMode: () => s.facetNavigationMode
    }), g = f(() => s.within?.trim() ?? ""), v = to({
      query: h.query,
      entity: h.entity,
      schema: f(() => s.schema),
      setExpression: h.setExpression
    }), k = Za({
      source: $,
      query: v.live,
      schema: f(() => s.schema),
      entity: h.entity,
      limit: f(() => s.limit),
      within: g
    });
    ee(h.query, (L) => a("query-change", L));
    const y = f(() => Ha(s.schema, [h.query.value.expr])), S = f(
      () => y.value.flatMap((L) => {
        const H = s.schema.entities.find((U) => U.key === L.entityKey);
        return H ? [{ ...L, entity: H }] : [];
      })
    );
    function A() {
      if (i.record) return S.value;
      const L = s.recordCards;
      return L ? S.value.filter((H) => L[H.entityKey]) : [];
    }
    const N = f(() => {
      const L = s.views;
      return typeof L != "function" ? L : L({ entity: h.entity.value, records: y.value });
    });
    ee(
      [k.pageCount, k.pending, h.query, v.drafting, () => s.loading, m],
      () => {
        if (k.pending.value || v.drafting.value || s.loading || m.value) return;
        const L = k.pageCount.value;
        h.query.value.page > L && h.setPage(L, "replace");
      },
      // Immediately, since a pasted URL is past the end before anything changes;
      // and after the render, so the correction is a navigation the mounted shell
      // makes rather than one it makes on the way up. An async source is still
      // pending here and corrects itself when its count lands.
      { immediate: !0, flush: "post" }
    );
    const G = f(() => new Set(o.value));
    function B(L) {
      const H = new Set(G.value);
      H.has(L.id) ? H.delete(L.id) : H.add(L.id), o.value = [...H], a("toggle-pin", L);
    }
    const W = f(() => {
      if (s.selectable === !0) return !0;
      const L = h.entity.value;
      return !!(L?.duplicate || L?.delete || L?.operations?.length);
    }), Z = f(() => new Set(l.value));
    function ve(L) {
      const H = new Set(Z.value);
      H.has(L.id) ? H.delete(L.id) : H.add(L.id), l.value = [...H];
    }
    function T(L) {
      const H = new Set(Z.value);
      for (const U of k.rows.value)
        L ? H.add(U.id) : H.delete(U.id);
      l.value = [...H];
    }
    function K() {
      l.value.length && (l.value = []);
    }
    const P = f(() => ({
      ids: [...l.value],
      rows: k.rows.value.filter((L) => Z.value.has(L.id)),
      entity: h.entity.value
    }));
    ee(() => h.query.value.entity, K);
    function z(L, H, U = {}) {
      const ze = xt(s.schema, h.query.value, L, U);
      U.exclude ? h.narrow(ze, H?.key ?? h.query.value.entity) : v.release(() => h.narrow(ze, H?.key ?? null, H ? void 0 : "cards")), a("drill", L, H, U);
    }
    function re(L) {
      return s.rowPress === "narrow" && et(s.schema, L) !== null;
    }
    function le(L) {
      return s.schema.entities.find((U) => U.key === L.entityKey)?.href?.(L) || null;
    }
    const te = Da({
      ...h,
      draft: v.text,
      liveQuery: v.live,
      drafting: v.drafting,
      commitDraft: v.commit,
      abandonDraft: v.abandon,
      /*
       * A page of what is on screen: the draft's, while one is live, which are
       * held beside it rather than in the URL — see `liveQuery`.
       */
      setPage: (L, H) => {
        v.drafting.value ? v.setPage(L) : h.setPage(L, H);
      },
      schema: f(() => s.schema),
      entities: f(() => s.schema.entities),
      rows: k.rows,
      total: k.total,
      limit: f(() => s.limit),
      offset: k.offset,
      pageCount: k.pageCount,
      pending: k.pending,
      counting: k.counting,
      error: k.error,
      source: $,
      previewsPerType: f(() => s.previewsPerType),
      within: g,
      pinnable: f(() => s.pinnable === !0),
      isPinned: (L) => G.value.has(L.id),
      isPinnedId: (L) => G.value.has(L),
      togglePin: B,
      selectable: W,
      selection: P,
      isSelected: (L) => Z.value.has(L.id),
      toggleSelect: ve,
      selectPage: T,
      clearSelection: K,
      narrowsOnPress: f(() => s.rowPress === "narrow"),
      rowLinks: f(() => s.rowLinks),
      /*
       * The one place a press is read, so every view gets the same answer without
       * knowing which of the two it is: they all call this.
       */
      activate: (L, H = {}) => {
        if (re(L)) {
          z(L, null, H);
          return;
        }
        const U = le(L);
        if (U) {
          window.open(U, "_blank", "noopener");
          return;
        }
        a("activate", L);
      },
      pressHref: (L) => re(L) ? h.narrowHref(xt(s.schema, h.query.value, L), null, "cards") : le(L),
      recordHref: le,
      drillHref: (L, H) => et(s.schema, L) ? h.narrowHref(
        xt(s.schema, h.query.value, L),
        H?.key ?? null,
        H ? void 0 : "cards"
      ) : null,
      create: (L) => a("create", L),
      duplicate: () => a("duplicate", P.value),
      delete: () => a("delete", P.value),
      operate: (L) => a("operate", L, P.value),
      drill: z
    });
    Wa({ theme: () => s.theme, accent: () => s.accent, tokens: () => s.tokens });
    const kt = f(() => {
      if (!(!s.accent && !s.tokens))
        return { ...s.tokens, ...s.accent ? { "--dc-accent": s.accent } : {} };
    });
    return t({
      query: h.query
    }), (L, H) => (u(), p("div", {
      class: "dc-shell",
      "data-dc-theme": e.theme,
      style: se(kt.value)
    }, [
      w("div", di, [
        Q(cs, {
          views: N.value,
          "pages-note": e.pagesNote,
          "hide-pages": e.loading || m.value
        }, Et({ _: 2 }, [
          i.brand ? {
            name: "brand",
            fn: ne((U) => [
              j(L.$slots, "brand", Ts(Ms(U)), void 0, !0)
            ]),
            key: "0"
          } : void 0,
          i.actions ? {
            name: "actions",
            fn: ne(() => [
              j(L.$slots, "actions", {}, void 0, !0)
            ]),
            key: "1"
          } : void 0
        ]), 1032, ["views", "pages-note", "hide-pages"])
      ]),
      i.page ? (u(), p("div", fi, [
        j(L.$slots, "page", {
          query: x(te).query.value
        }, void 0, !0)
      ])) : M("", !0),
      i.page ? M("", !0) : (u(), I(ds, {
        key: 1,
        views: N.value,
        "type-chooser": e.typeChooser,
        "selection-placement": e.selectionPlacement
      }, null, 8, ["views", "type-chooser", "selection-placement"])),
      i.page ? M("", !0) : j(L.$slots, "results", {
        rows: x(te).rows.value,
        total: x(te).total.value,
        offset: x(te).offset.value,
        pageCount: x(te).pageCount.value,
        query: x(te).liveQuery.value,
        pending: x(te).pending.value,
        loading: e.loading
      }, () => [
        Q(ws, {
          views: N.value,
          loading: e.loading
        }, Et({ _: 2 }, [
          i["cards-before"] || A().length ? {
            name: "cards-before",
            fn: ne(() => [
              (u(!0), p(D, null, Y(A(), (U) => (u(), p(D, {
                key: `${U.entityKey}:${U.id}`
              }, [
                i.record ? j(L.$slots, "record", {
                  id: U.id,
                  entity: U.entity
                }, void 0, !0, 0) : (u(), I(it(e.recordCards?.[U.entityKey]), {
                  key: 1,
                  id: U.id
                }, null, 8, ["id"]))
              ], 64))), 128)),
              j(L.$slots, "cards-before", {}, void 0, !0)
            ]),
            key: "0"
          } : void 0,
          i["cards-after"] ? {
            name: "cards-after",
            fn: ne(() => [
              j(L.$slots, "cards-after", {}, void 0, !0)
            ]),
            key: "1"
          } : void 0
        ]), 1032, ["views", "loading"])
      ], !0, 2)
    ], 12, ui));
  }
}), pi = /* @__PURE__ */ V(vi, [["__scopeId", "data-v-e37a0148"]]), hi = ["data-dc-muted", "data-dc-collapsed"], mi = ["data-dc-collapsible"], yi = ["aria-expanded", "aria-controls"], _i = { class: "dc-shell-card__sr" }, gi = {
  key: 0,
  class: "dc-shell-card__identity"
}, ki = { class: "dc-shell-card__title dc-shell-card__name" }, wi = {
  key: 0,
  class: "dc-shell-card__ref dc-mono"
}, bi = {
  key: 1,
  class: "dc-shell-card__title"
}, $i = {
  key: 2,
  class: "dc-shell-card__count dc-mono"
}, xi = {
  key: 1,
  class: "dc-shell-card__aside"
}, Si = ["data-dc-flush"], Ci = /* @__PURE__ */ F({
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
    const n = e, s = t, a = R(n.defaultCollapsed === !0), o = f(() => n.span === "all" ? { gridColumn: "1 / -1" } : void 0), l = at();
    function i(B) {
      return r(B?.() ?? []);
    }
    function r(B) {
      return B.some((W) => W.type === As ? !1 : W.type === Os ? String(W.children ?? "").trim().length > 0 : W.type === D ? r(W.children ?? []) : !0);
    }
    const c = f(
      () => !!n.title || !!n.name || d.value || i(l.head)
    ), d = f(() => i(l.aside)), m = f(() => i(l.default)), _ = f(() => i(l.foot)), b = f(
      () => !!n.name && (!!n.reference || i(l.reference))
    ), $ = f(() => n.collapsible === !0 && c.value), h = f(() => $.value && (n.collapsed ?? a.value));
    function g() {
      const B = !h.value;
      a.value = B, s("update:collapsed", B);
    }
    const v = Ft() ?? "dc-shell-card", k = `${v}-body`, y = `${v}-foot`, S = f(
      () => [m.value ? k : "", _.value ? y : ""].filter(Boolean).join(" ") || void 0
    ), A = [
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
    ].join(", "), N = R(null);
    function G(B) {
      if (!$.value) return;
      const W = B.target?.closest(A);
      W && N.value?.contains(W) || typeof window < "u" && window.getSelection()?.toString() || g();
    }
    return (B, W) => (u(), p("section", {
      class: "dc-shell-card",
      style: se(o.value),
      "data-dc-muted": e.muted ? "true" : "false",
      "data-dc-collapsed": h.value ? "true" : "false"
    }, [
      c.value ? (u(), p("header", {
        key: 0,
        ref_key: "head",
        ref: N,
        class: "dc-shell-card__head",
        "data-dc-collapsible": $.value ? "true" : "false",
        onClick: G
      }, [
        $.value ? (u(), p("button", {
          key: 0,
          type: "button",
          class: "dc-shell-card__toggle",
          "aria-expanded": h.value ? "false" : "true",
          "aria-controls": S.value,
          onClick: g
        }, [
          W[0] || (W[0] = w("svg", {
            class: "dc-shell-card__chevron",
            viewBox: "0 0 10 10",
            "aria-hidden": "true"
          }, [
            w("path", { d: "M2 3.5 5 6.5 8 3.5" })
          ], -1)),
          w("span", _i, E(e.name || e.title || "Card"), 1)
        ], 8, yi)) : M("", !0),
        j(B.$slots, "head", {}, () => [
          e.name ? (u(), p("div", gi, [
            w("h2", ki, E(e.name), 1),
            b.value ? (u(), p("span", wi, [
              j(B.$slots, "reference", {}, () => [
                ae(E(e.reference), 1)
              ], !0)
            ])) : M("", !0)
          ])) : (u(), p("h2", bi, E(e.title), 1)),
          e.count !== void 0 ? (u(), p("span", $i, E(e.count), 1)) : M("", !0)
        ], !0),
        d.value ? (u(), p("span", xi, [
          j(B.$slots, "aside", {}, void 0, !0)
        ])) : M("", !0)
      ], 8, mi)) : M("", !0),
      m.value ? Ct((u(), p("div", {
        key: 1,
        id: k,
        class: "dc-shell-card__body",
        "data-dc-flush": e.flush ? "true" : "false"
      }, [
        j(B.$slots, "default", {}, void 0, !0)
      ], 8, Si)), [
        [rn, !h.value]
      ]) : M("", !0),
      _.value ? Ct((u(), p("footer", {
        key: 2,
        id: y,
        class: "dc-shell-card__foot"
      }, [
        j(B.$slots, "foot", {}, void 0, !0)
      ], 512)), [
        [rn, !h.value]
      ]) : M("", !0)
    ], 12, hi));
  }
}), Ac = /* @__PURE__ */ V(Ci, [["__scopeId", "data-v-3a7425d2"]]), Ei = ["aria-label"], Pi = ["aria-checked", "data-dc-active", "tabindex", "onClick", "onKeydown"], Li = /* @__PURE__ */ F({
  __name: "SegmentedControl",
  props: {
    modelValue: {},
    options: {},
    label: {},
    mono: { type: Boolean }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const n = e, s = t, a = R([]);
    function o(l, i) {
      const r = n.options.length;
      let c = null;
      if (l.key === "ArrowRight" || l.key === "ArrowDown" ? c = (i + 1) % r : l.key === "ArrowLeft" || l.key === "ArrowUp" ? c = (i - 1 + r) % r : l.key === "Home" ? c = 0 : l.key === "End" && (c = r - 1), c === null) return;
      l.preventDefault();
      const d = n.options[c];
      d && (s("update:modelValue", d.key), a.value[c]?.focus());
    }
    return (l, i) => (u(), p("div", {
      class: "dc-segmented",
      role: "radiogroup",
      "aria-label": e.label
    }, [
      (u(!0), p(D, null, Y(e.options, (r, c) => (u(), p("button", {
        key: r.key,
        ref_for: !0,
        ref_key: "buttons",
        ref: a,
        type: "button",
        role: "radio",
        class: ue(["dc-segmented__item", { "dc-segmented__item--mono": e.mono }]),
        "aria-checked": r.key === e.modelValue,
        "data-dc-active": r.key === e.modelValue ? "true" : "false",
        tabindex: r.key === e.modelValue ? 0 : -1,
        onClick: (d) => s("update:modelValue", r.key),
        onKeydown: (d) => o(d, c)
      }, E(r.label), 43, Pi))), 128))
    ], 8, Ei));
  }
}), Ti = /* @__PURE__ */ V(Li, [["__scopeId", "data-v-63fb5482"]]), Mi = { class: "dc-fact__label" }, Ai = ["title"], Oi = /* @__PURE__ */ F({
  __name: "ShellFact",
  props: {
    label: {},
    value: {},
    title: {},
    wide: { type: Boolean }
  },
  setup(e) {
    const t = e, n = f(() => {
      const a = t.value;
      if (a == null || a === "") return [me];
      if (Array.isArray(a)) {
        const o = a.filter((l) => l != null && l !== "");
        return o.length ? o.map(String) : [me];
      }
      return [String(a)];
    }), s = f(() => t.wide ? { gridColumn: "1 / -1" } : void 0);
    return (a, o) => (u(), p("div", {
      class: "dc-fact",
      style: se(s.value)
    }, [
      w("dt", Mi, [
        j(a.$slots, "label", {}, () => [
          ae(E(e.label), 1)
        ], !0)
      ]),
      w("dd", {
        class: "dc-fact__value dc-mono",
        title: e.title
      }, [
        j(a.$slots, "default", {}, () => [
          n.value.length === 1 ? (u(), p(D, { key: 0 }, [
            ae(E(n.value[0]), 1)
          ], 64)) : (u(!0), p(D, { key: 1 }, Y(n.value, (l, i) => (u(), p("span", {
            key: i,
            class: "dc-fact__line"
          }, E(l), 1))), 128))
        ], !0)
      ], 8, Ai)
    ], 4));
  }
}), Ni = /* @__PURE__ */ V(Oi, [["__scopeId", "data-v-1f6d25e6"]]), Ii = /* @__PURE__ */ F({
  __name: "ShellFacts",
  props: {
    items: { default: () => [] },
    min: { default: "200px" }
  },
  setup(e) {
    const t = e, n = f(() => ({ "--dc-facts-min": t.min }));
    return (s, a) => (u(), p("dl", {
      class: "dc-facts",
      style: se(n.value)
    }, [
      (u(!0), p(D, null, Y(e.items, (o, l) => (u(), I(Ni, {
        key: `${l}:${o.label}`,
        label: o.label,
        value: o.value,
        title: o.title,
        wide: o.wide
      }, null, 8, ["label", "value", "title", "wide"]))), 128)),
      j(s.$slots, "default", {}, void 0, !0)
    ], 4));
  }
}), Oc = /* @__PURE__ */ V(Ii, [["__scopeId", "data-v-17455afa"]]), Ri = { class: "dc-counts" }, Bi = ["data-dc-tone"], qi = {
  key: 0,
  class: "dc-counts__empty"
}, Fi = /* @__PURE__ */ F({
  __name: "StatusCounts",
  props: {
    counts: {},
    empty: { default: me }
  },
  setup(e) {
    const t = e, n = f(() => t.counts.filter((s) => s.count > 0));
    return (s, a) => (u(), p("span", Ri, [
      (u(!0), p(D, null, Y(n.value, (o) => (u(), p("span", {
        key: o.label,
        class: "dc-counts__count",
        "data-dc-tone": o.tone ?? "neutral"
      }, E(o.count) + " " + E(o.label), 9, Bi))), 128)),
      n.value.length === 0 ? (u(), p("span", qi, E(e.empty), 1)) : M("", !0)
    ]));
  }
}), Nc = /* @__PURE__ */ V(Fi, [["__scopeId", "data-v-5553a9e2"]]), Hi = ["data-dc-copied", "title", "aria-label"], Di = {
  key: 0,
  class: "dc-copy__mark",
  viewBox: "0 0 16 16",
  "aria-hidden": "true"
}, Vi = {
  key: 1,
  class: "dc-copy__mark",
  viewBox: "0 0 16 16",
  "aria-hidden": "true"
}, Ki = 1500, Wi = /* @__PURE__ */ F({
  __name: "CopyButton",
  props: {
    text: {},
    label: { default: "Copy to clipboard" }
  },
  emits: ["copied", "error"],
  setup(e, { emit: t }) {
    const n = e, s = t, a = R(!1);
    let o;
    async function l() {
      const i = typeof n.text == "function" ? n.text() : n.text;
      try {
        if (!navigator.clipboard) throw new Error("The clipboard is not available here");
        await navigator.clipboard.writeText(i);
      } catch (r) {
        s("error", r);
        return;
      }
      a.value = !0, clearTimeout(o), o = setTimeout(() => {
        a.value = !1;
      }, Ki), s("copied", i);
    }
    return _e(() => clearTimeout(o)), (i, r) => (u(), p("button", {
      type: "button",
      class: "dc-copy",
      "data-dc-copied": a.value ? "true" : "false",
      title: a.value ? "Copied" : e.label,
      "aria-label": e.label,
      onClick: l
    }, [
      a.value ? (u(), p("svg", Vi, [...r[1] || (r[1] = [
        w("path", { d: "M3 8.5l3.2 3L13 4.5" }, null, -1)
      ])])) : (u(), p("svg", Di, [...r[0] || (r[0] = [
        w("rect", {
          x: "5.5",
          y: "5.5",
          width: "8",
          height: "9",
          rx: "1.5"
        }, null, -1),
        w("path", { d: "M10.5 3.5v-1a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h1" }, null, -1)
      ])]))
    ], 8, Hi));
  }
}), ji = /* @__PURE__ */ V(Wi, [["__scopeId", "data-v-f4249d7f"]]), zi = ["data-dc-copy", "data-dc-wrap", "data-dc-tone"], Ui = /* @__PURE__ */ F({
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
    const n = e, s = t, a = R(null), o = f(() => n.maxHeight === void 0 ? void 0 : { maxHeight: typeof n.maxHeight == "number" ? `${n.maxHeight}px` : n.maxHeight });
    function l() {
      return n.code ?? a.value?.textContent ?? "";
    }
    return (i, r) => (u(), p("div", {
      class: "dc-code",
      "data-dc-copy": e.copy ? "true" : "false",
      "data-dc-wrap": e.wrap ? "true" : "false",
      "data-dc-tone": e.tone
    }, [
      w("pre", {
        ref_key: "pre",
        ref: a,
        class: "dc-code__text dc-mono",
        style: se(o.value)
      }, [
        j(i.$slots, "default", {}, () => [
          ae(E(e.code), 1)
        ], !0)
      ], 4),
      e.copy ? (u(), I(ji, {
        key: 0,
        class: "dc-code__copy",
        text: l,
        label: e.copyLabel,
        onCopied: r[0] || (r[0] = (c) => s("copied", c)),
        onError: r[1] || (r[1] = (c) => s("error", c))
      }, null, 8, ["label"])) : M("", !0)
    ], 8, zi));
  }
}), Ic = /* @__PURE__ */ V(Ui, [["__scopeId", "data-v-67b371dd"]]), Qi = 24, Gi = /* @__PURE__ */ F({
  __name: "ShellLog",
  props: {
    fetchChunk: {},
    stripAnsi: { type: Boolean },
    maxHeight: { default: "460px" }
  },
  setup(e, { expose: t }) {
    const n = e, s = R(""), a = f(() => n.stripAnsi ? Us(s.value) : s.value), o = R(null);
    let l = 0, i = null;
    function r() {
      return i ??= c().finally(() => {
        i = null;
      }), i;
    }
    async function c() {
      const { chunk: _, offset: b } = await n.fetchChunk(l);
      if (l = b, !_) return;
      const $ = o.value, h = !$ || $.scrollTop + $.clientHeight >= $.scrollHeight - Qi;
      s.value += _, h && (await ot(), o.value && (o.value.scrollTop = o.value.scrollHeight));
    }
    function d() {
      s.value = "", l = 0;
    }
    const m = f(() => n.maxHeight === void 0 ? void 0 : { maxHeight: typeof n.maxHeight == "number" ? `${n.maxHeight}px` : n.maxHeight });
    return t({ poll: r, reset: d }), (_, b) => (u(), p("pre", {
      ref_key: "pane",
      ref: o,
      class: "dc-log dc-mono",
      style: se(m.value)
    }, E(a.value), 5));
  }
}), Rc = /* @__PURE__ */ V(Gi, [["__scopeId", "data-v-2c86947e"]]), Yi = ["data-dc-theme"], Xi = ["aria-labelledby", "aria-label"], Ji = {
  key: 1,
  class: "dc-dialog__actions"
}, Me = [], Zi = /* @__PURE__ */ F({
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
    const n = e, s = t, { theme: a, style: o, adopt: l } = Xt(n), i = `${Ft() ?? "dc-dialog"}-title`, r = R(null);
    function c() {
      s("close"), s("update:open", !1);
    }
    const d = Symbol("dc-dialog");
    function m(y) {
      y.key !== "Escape" || y.defaultPrevented || Me[Me.length - 1] === d && (y.preventDefault(), c());
    }
    let _ = !1;
    function b(y) {
      _ = y.target === y.currentTarget;
    }
    function $(y) {
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
    let g = null;
    async function v() {
      Me.push(d), document.addEventListener("keydown", m), g = document.activeElement instanceof HTMLElement ? document.activeElement : null, l(), await ot(), (r.value?.querySelector("[autofocus]") ?? r.value?.querySelector(h) ?? r.value)?.focus();
    }
    function k() {
      const y = Me.indexOf(d);
      y !== -1 && (Me.splice(y, 1), document.removeEventListener("keydown", m), g?.isConnected && g.focus(), g = null);
    }
    return rt(() => {
      n.open && v();
    }), ee(
      () => n.open,
      (y) => {
        y ? v() : k();
      }
    ), _e(k), (y, S) => e.open ? (u(), I(lt, {
      key: 0,
      to: e.to
    }, [
      w("div", {
        class: "dc-shell dc-layer dc-dialog",
        "data-dc-theme": x(a),
        style: se(x(o)),
        onPointerdown: b,
        onClick: $
      }, [
        w("div", {
          ref_key: "panel",
          ref: r,
          class: ue(["dc-dialog__panel", e.panelClass]),
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
          }, E(e.title), 1)) : M("", !0),
          w("div", {
            class: ue(["dc-dialog__body", e.bodyClass])
          }, [
            j(y.$slots, "default", {}, void 0, !0)
          ], 2),
          y.$slots.actions ? (u(), p("div", Ji, [
            j(y.$slots, "actions", {}, void 0, !0)
          ])) : M("", !0)
        ], 10, Xi)
      ], 44, Yi)
    ], 8, ["to"])) : M("", !0);
  }
}), Bc = /* @__PURE__ */ V(Zi, [["__scopeId", "data-v-0cccf313"]]), ec = 4500, tc = 9e3, Fe = R([]);
let Sn = 0;
function bs(e) {
  Fe.value = Fe.value.filter((t) => t.id !== e);
}
function $s(e, t = "ok") {
  Sn += 1;
  const n = Sn;
  Fe.value = [...Fe.value, { id: n, message: e, kind: t }], setTimeout(() => bs(n), t === "err" ? tc : ec);
}
function nc(e) {
  $s(e instanceof Error ? e.message : String(e), "err");
}
function sc() {
  return { toasts: Ns(Fe), toast: $s, toastError: nc, dismiss: bs };
}
const ac = ["data-dc-theme"], oc = ["data-dc-kind", "role"], lc = /* @__PURE__ */ F({
  __name: "ShellToasts",
  props: {
    to: { default: "body" },
    theme: { default: void 0 },
    accent: { default: void 0 },
    tokens: { default: void 0 }
  },
  setup(e) {
    const t = e, { toasts: n } = sc(), { theme: s, style: a, adopt: o } = Xt(t);
    return rt(o), (l, i) => (u(), I(lt, { to: e.to }, [
      w("div", {
        class: "dc-shell dc-layer dc-toasts",
        "data-dc-theme": x(s),
        style: se(x(a)),
        "aria-live": "polite"
      }, [
        (u(!0), p(D, null, Y(x(n), (r) => (u(), p("div", {
          key: r.id,
          class: "dc-toast",
          "data-dc-kind": r.kind,
          role: r.kind === "err" ? "alert" : void 0
        }, E(r.message), 9, oc))), 128))
      ], 12, ac)
    ], 8, ["to"]));
  }
}), qc = /* @__PURE__ */ V(lc, [["__scopeId", "data-v-d970211c"]]), rc = 4, ic = 8, cc = 180;
function uc(e, t, n, s = {}) {
  const a = s.gap ?? rc, o = s.margin ?? ic, l = s.flipBelow ?? cc, i = s.side ?? "below", r = {
    below: n.height - e.bottom - a - o,
    above: e.top - a - o
  }, c = i === "below" ? "above" : "below", d = r[i] < l && r[c] > r[i] ? c : i, m = Math.min(s.maxHeight ?? 1 / 0, Math.max(0, r[d])), _ = Math.max(0, n.width - o * 2), b = Math.min(e.width, _), $ = Math.min(Math.max(t, b), _), h = s.align === "end" ? e.right - $ : e.left, g = Math.max(o, Math.min(h, n.width - $ - o));
  return d === "below" ? { side: d, left: g, top: e.bottom + a, maxHeight: m, minWidth: b, maxWidth: _ } : { side: d, left: g, bottom: n.height - e.top + a, maxHeight: m, minWidth: b, maxWidth: _ };
}
const dc = ["data-dc-theme", "data-dc-side"], ge = [], fc = /* @__PURE__ */ F({
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
    const n = e, s = t, { theme: a, style: o, adopt: l } = Xt(n), i = R(null), r = R(null), c = { root: () => i.value };
    function d() {
      const y = n.anchor;
      y && (r.value = uc(
        y.getBoundingClientRect(),
        i.value?.offsetWidth ?? 0,
        { width: window.innerWidth, height: window.innerHeight },
        { side: n.side, align: n.align, maxHeight: n.maxHeight }
      ));
    }
    const m = f(() => {
      const y = r.value, S = y ? {
        position: "fixed",
        left: `${y.left}px`,
        ...y.top !== void 0 ? { top: `${y.top}px` } : {},
        ...y.bottom !== void 0 ? { bottom: `${y.bottom}px` } : {},
        minWidth: `${y.minWidth}px`,
        maxWidth: `${y.maxWidth}px`,
        maxHeight: `${y.maxHeight}px`,
        overflowY: "auto"
      } : { position: "fixed", visibility: "hidden" };
      return { ...o.value, ...S };
    });
    function _() {
      s("update:open", !1), s("close");
    }
    function b(y) {
      return i.value?.contains(y) || n.anchor?.contains(y) ? !0 : ge.slice(ge.indexOf(c) + 1).some((A) => A.root()?.contains(y));
    }
    function $(y) {
      const S = y.target;
      S && !b(S) && _();
    }
    function h(y) {
      y.key !== "Escape" || y.defaultPrevented || ge[ge.length - 1] === c && (y.preventDefault(), i.value?.contains(document.activeElement) && n.anchor?.focus(), _());
    }
    let g = null;
    async function v() {
      ge.includes(c) || (ge.push(c), l(), r.value = null, await ot(), d(), window.addEventListener("pointerdown", $, !0), document.addEventListener("keydown", h, !0), window.addEventListener("resize", d), window.addEventListener("scroll", d, !0), typeof ResizeObserver < "u" && i.value && (g = new ResizeObserver(() => d()), g.observe(i.value)));
    }
    function k() {
      const y = ge.indexOf(c);
      y !== -1 && (ge.splice(y, 1), window.removeEventListener("pointerdown", $, !0), document.removeEventListener("keydown", h, !0), window.removeEventListener("resize", d), window.removeEventListener("scroll", d, !0), g?.disconnect(), g = null);
    }
    return rt(() => {
      n.open && v();
    }), ee(
      () => n.open,
      (y) => {
        y ? v() : k();
      }
    ), ee(() => n.anchor, () => {
      n.open && d();
    }), _e(k), (y, S) => e.open ? (u(), I(lt, {
      key: 0,
      to: e.to
    }, [
      w("div", Is({
        ref_key: "root",
        ref: i
      }, y.$attrs, {
        class: "dc-shell dc-layer dc-popover",
        "data-dc-theme": x(a),
        "data-dc-side": r.value?.side,
        style: m.value
      }), [
        j(y.$slots, "default", {}, void 0, !0)
      ], 16, dc)
    ], 8, ["to"])) : M("", !0);
  }
}), Fc = /* @__PURE__ */ V(fc, [["__scopeId", "data-v-73fbd235"]]);
function Hc(e, t) {
  const n = R(!1);
  let s = null, a = !1, o = 0;
  const l = () => {
    o++, n.value = !1, s !== null && (clearTimeout(s), s = null);
  };
  function i(d) {
    s = setTimeout(() => void r(d), t);
  }
  async function r(d) {
    if (a || d !== o) return;
    let m;
    try {
      m = await e();
    } catch {
      m = !1;
    }
    a || d !== o || (m ? i(d) : l());
  }
  const c = () => {
    n.value || (n.value = !0, r(++o));
  };
  return st(() => {
    a = !0, l();
  }, !0), { start: c, stop: l, polling: n };
}
function Dc(e, t = {}) {
  const n = t.key ?? ((o) => JSON.stringify(o)), s = ye();
  let a = null;
  return Rs(() => {
    const o = e(), l = n(o);
    l !== a && (a = l, s.value = o);
  }), s;
}
function Vc(e = {}) {
  return { key: "ordinal", kind: "ordinal", label: "#", width: "52px", ...e };
}
function Kc(e = {}) {
  return { key: "status", role: "state", kind: "status", label: "State", sort: "state", width: "104px", ...e };
}
function Wc(e = {}) {
  return { key: "tint", role: "tint", ...e };
}
function jc(e = {}) {
  return { key: "picture", role: "image", kind: "image", width: "56px", height: "40px", ...e };
}
function zc(e, t = {}) {
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
function Uc(e, t = {}) {
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
function Qc(e, t, n = {}) {
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
function Gc(e, t, n = {}) {
  return { key: e, kind: "date", label: t, sort: e, width: "104px", mono: !0, muted: !0, ...n };
}
function Yc(e = {}) {
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
function Xc(e, t, n = {}) {
  return { key: e, label: t, sort: e, truncate: !0, hideBelow: 900, ...n };
}
function Jc(e, t, n, s = {}) {
  return {
    key: e,
    label: t,
    value: (a) => Object.entries(n).filter(([o]) => a.fields[o] === !0).map(([, o]) => o),
    sort: e,
    muted: !0,
    truncate: !0,
    hideBelow: 1100,
    ...s
  };
}
function gt(e) {
  return typeof e == "number" ? e : typeof e == "string" && e.trim() !== "" ? Number(e) : Number.NaN;
}
function Zc(e) {
  const t = gt(e);
  return Number.isFinite(t) && t > 0 ? Ks(t) : me;
}
function eu(e) {
  const t = gt(e);
  return Number.isFinite(t) && t > 0 ? Ws(t) : me;
}
function tu(e) {
  const t = gt(e);
  return Number.isFinite(t) && t > 0 ? js(t) : me;
}
function nu(e) {
  const t = gt(e);
  return Number.isFinite(t) ? zs(t) : me;
}
function vc(e) {
  if (e <= 0) return 0;
  const t = 10 ** Math.floor(Math.log10(e));
  for (const n of [1, 2, 5])
    if (e <= n * t) return n * t;
  return 10 * t;
}
function pc(e, t) {
  const n = /* @__PURE__ */ new Set();
  for (const s of e) {
    const a = s.fields[t];
    for (const o of Array.isArray(a) ? a : [a])
      typeof o == "string" && o && n.add(o);
  }
  return [...n].sort((s, a) => s.localeCompare(a));
}
function hc(e, t) {
  let n = 0;
  for (const s of e) {
    const a = s.fields[t];
    typeof a == "number" && a > n && (n = a);
  }
  return n;
}
function su(e, t, n, s = {}) {
  return {
    kind: "chips",
    key: t,
    label: n,
    options: pc(e, t),
    ...s.multiple ? { multiple: !0 } : {}
  };
}
function au(e, t, n) {
  return { kind: "range", key: t, label: n, min: 0, max: vc(hc(e, t)) };
}
function ou(e, t, n) {
  return { kind: "toggle", key: e, label: t, text: n };
}
function lu(e) {
  return e.filter((t) => t.kind === "chips" ? t.options.length > 1 : t.kind === "range" ? t.max > 0 : !0);
}
function ru(e = "", t = "/") {
  const n = R(ie(e)), s = R(t), a = [`${s.value}${n.value}`];
  return {
    search: n,
    path: s,
    history: a,
    href(o, l) {
      return `${l ?? s.value}${ie(o)}`;
    },
    push(o, l) {
      l !== void 0 && (s.value = l), n.value = ie(o), a.push(`${s.value}${n.value}`);
    },
    replace(o, l) {
      l !== void 0 && (s.value = l), n.value = ie(o), a[a.length - 1] = `${s.value}${n.value}`;
    }
  };
}
function Cn(e) {
  const t = e.indexOf("?");
  if (t === -1) return "";
  const n = e.slice(t), s = n.indexOf("#");
  return ie(s === -1 ? n : n.slice(0, s));
}
function iu(e) {
  const t = R(Cn(e.currentRoute.value.fullPath)), n = f(() => e.currentRoute.value.path), s = ee(
    () => e.currentRoute.value.fullPath,
    (a) => {
      t.value = Cn(a);
    }
  );
  return {
    search: t,
    path: n,
    push: (a, o) => e.push(`${o ?? n.value}${ie(a)}`),
    replace: (a, o) => e.replace(`${o ?? n.value}${ie(a)}`),
    href: (a, o) => {
      const l = `${o ?? n.value}${ie(a)}`;
      return e.resolve?.(l).href ?? l;
    },
    dispose: s
  };
}
function cu(e, t, n = "/") {
  return (s) => {
    const a = s.params[t], o = Array.isArray(a) ? a.join("/") : a ?? "", l = s.query[xe], i = typeof l == "string" ? l : "", r = `${e}="${o.replace(/"/g, "")}"`;
    return { path: n, query: { ...s.query, [xe]: De(i, r) } };
  };
}
function uu(e, t = "/") {
  return (n) => ({ path: t, query: { ...n.query, [Le]: e } });
}
function du(e) {
  const t = /* @__PURE__ */ new Map();
  for (const n of e) {
    const s = t.get(n.entityKey);
    s ? s.push(n) : t.set(n.entityKey, [n]);
  }
  return {
    query(n) {
      return Wn(n, (s) => t.get(s.key) ?? [], {
        undatedLast: !0,
        zeroIsAll: !0
      });
    }
  };
}
function fu(e, t) {
  return e.query({ ...t, limit: Number.MAX_SAFE_INTEGER, offset: 0 }).rows;
}
const mc = {
  DataShell: pi,
  ShellHeader: cs,
  RecordActions: ds,
  ResultsArea: ws,
  SegmentedControl: Ti,
  StatusPill: Ve,
  ListView: Rt,
  CardsView: ps,
  GridView: hs,
  ImagesView: ms,
  TableView: gs,
  LinksView: ys,
  PreviewView: _s,
  TypeCardsView: ks
}, vu = {
  install(e, t = {}) {
    const n = t.prefix ?? "";
    for (const [s, a] of Object.entries(mc))
      e.component(`${n}${s}`, a);
    t.route && e.provide(Ln, t.route), (t.theme || t.accent || t.tokens) && Ka({ theme: t.theme, accent: t.accent, tokens: t.tokens }, e);
  }
};
export {
  wc as COLUMN_BREAKPOINTS,
  kc as COLUMN_ROLES,
  ps as CardsView,
  xn as ColumnCell,
  ji as CopyButton,
  Gs as DEFAULT_ENTITY_VIEW,
  Pt as DEFAULT_SORT,
  Qs as DEFAULT_VIEW,
  eo as DRAFT_DELAY,
  pi as DataShell,
  me as EMPTY_CELL,
  zn as ENTITY_ALL,
  nt as ENTITY_TERM,
  qe as EXPRESSION_TERM,
  hs as GridView,
  vu as HeaderContentLayoutPlugin,
  ms as ImagesView,
  ys as LinksView,
  Rt as ListView,
  Xe as MOCK_TINTS,
  Ke as MetricDrill,
  We as OpenMark,
  Qt as PARAM_DIR,
  Le as PARAM_ENTITY,
  xe as PARAM_EXPR,
  vt as PARAM_PAGE,
  Ut as PARAM_SORT,
  ft as PARAM_VIEW,
  gc as PILL_TONES,
  cc as POPOVER_FLIP_BELOW,
  rc as POPOVER_GAP,
  ic as POPOVER_MARGIN,
  Zt as PinStar,
  _s as PreviewView,
  en as QueryMark,
  Ae as RECORD_STATUSES,
  Wt as RESULT_FIELDS,
  Ln as ROUTE_ADAPTER_KEY,
  ds as RecordActions,
  ws as ResultsArea,
  ns as SHELL_CONTEXT_KEY,
  tt as SHELL_THEME_KEY,
  je as ScopeMark,
  Ti as SegmentedControl,
  Ce as SelectTick,
  Ac as ShellCard,
  Ic as ShellCode,
  Bc as ShellDialog,
  Ni as ShellFact,
  Oc as ShellFacts,
  cs as ShellHeader,
  Rc as ShellLog,
  Fc as ShellPopover,
  qc as ShellToasts,
  It as StandingControl,
  Nc as StatusCounts,
  Ve as StatusPill,
  tc as TOAST_ERROR_MS,
  ec as TOAST_MS,
  gs as TableView,
  ks as TypeCardsView,
  Tn as VIEW_KINDS,
  Ys as VIEW_LABELS,
  De as addTerm,
  zt as andExpression,
  Zc as bytesCell,
  In as cellFull,
  Pe as cellText,
  Ge as cellTextOf,
  ce as cellValue,
  wt as changesResults,
  su as chipsFrom,
  dn as columnAlign,
  fn as columnClass,
  un as columnKey,
  He as columnShortcut,
  Hn as columnShortcutOf,
  Tt as columnTruncates,
  ta as columnsFor,
  Bn as compactShortcuts,
  ea as countPages,
  qs as createHistoryAdapter,
  ru as createMemoryAdapter,
  du as createMemoryDataSource,
  Aa as createMockDataSource,
  iu as createVueRouterAdapter,
  Gc as dateColumn,
  aa as defaultCellText,
  Kt as defaultQuery,
  Ne as defaultViewFor,
  Fs as detachableAdapter,
  xt as drillExpression,
  eu as durationCell,
  tu as elapsedCell,
  Js as emptyFacetValue,
  Ra as entityAddress,
  Yc as entityColumn,
  Lt as entityCount,
  uu as entityRedirect,
  Yn as excludingTerm,
  Be as expandShortcuts,
  Xc as facetColumn,
  ss as facetField,
  ls as facetValue,
  va as fieldHeading,
  Gn as fieldTerm,
  Ie as findEntity,
  Un as findEntityByAddress,
  ke as findSort,
  Jc as flagColumn,
  Oe as fnv1a,
  An as focusEntity,
  Ks as formatBytes,
  Ye as formatCount,
  Ds as formatDate,
  bc as formatDateTime,
  Ws as formatDuration,
  js as formatElapsed,
  he as formatExpression,
  Te as formatInteger,
  Hs as formatMetric,
  Vs as formatOrdinal,
  zs as formatPercent,
  ca as formatRange,
  $e as formatTerm,
  Ma as generateRows,
  Qa as hasActiveFacets,
  zc as identityColumn,
  Lc as idsExpression,
  $c as isEntityScoped,
  Zs as isFacetActive,
  Dt as isPristineQuery,
  Re as isRangeTerm,
  Vt as isTypeCardsQuery,
  Mn as isViewKind,
  Sc as joinExpression,
  Xn as liftTerm,
  ya as matchesExpression,
  Qc as metricColumn,
  Tc as narrowPatch,
  _a as negateTerm,
  vc as niceMax,
  ie as normalizeSearch,
  ka as oppositeTerm,
  Vc as ordinalColumn,
  oe as parseExpression,
  Fa as parseQuery,
  nu as percentCell,
  jc as pictureColumn,
  uc as placePopover,
  Qo as presentParts,
  fs as presentRow,
  yt as pressOptions,
  Da as provideShellContext,
  Ka as provideShellTheme,
  fu as queryAll,
  au as rangeFrom,
  ut as rangeOf,
  $a as readDraft,
  Pc as readExpression,
  cu as recordRedirect,
  Qn as recordTerm,
  Ha as recordsIn,
  Uc as referenceColumn,
  At as refineExpression,
  Ht as resolveView,
  fe as roleColumn,
  Nn as roleColumns,
  sa as rowKey,
  Mt as sameTerm,
  ht as scopeTerm,
  et as scopeTermFor,
  es as scopedEntity,
  Ec as searchFromQuery,
  $t as serializeQuery,
  Ba as sortAddress,
  ct as sortsFor,
  xc as splitExpression,
  Kc as stateColumn,
  Us as stripAnsi,
  Xa as summarizeQuery,
  Jt as summaryTerms,
  Yt as termStanding,
  Wc as tintColumn,
  Cc as tintFor,
  ou as toggleFacet,
  yr as useColumns,
  to as useDraft,
  Eo as useEntityCounts,
  Ir as useEntityPreviews,
  Xt as useLayerTheme,
  Hc as usePoll,
  Se as usePresentedRows,
  Ja as useQueryState,
  ao as useRecordNames,
  Za as useResults,
  J as useShellContext,
  Dc as useStableSchema,
  sc as useToasts,
  lu as usefulFacets,
  cn as viewAcross,
  rs as withFacetValue,
  Ot as withStanding,
  Mc as withoutFacet,
  Zn as withoutOwnScope,
  ga as withoutTerm
};
