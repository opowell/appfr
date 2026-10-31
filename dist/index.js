import { ref as I, computed as f, inject as qt, provide as Ft, getCurrentInstance as En, shallowRef as ye, toValue as be, watch as se, onScopeDispose as st, getCurrentScope as Pn, defineComponent as B, useSlots as ot, onBeforeUnmount as _e, openBlock as u, createElementBlock as v, createElementVNode as w, unref as $, renderSlot as z, toDisplayString as P, createCommentVNode as T, Fragment as D, renderList as X, withModifiers as Ee, normalizeClass as de, withDirectives as Et, withKeys as Qe, normalizeStyle as oe, vModelText as Pa, nextTick as lt, useId as Ht, createBlock as N, Teleport as rt, createVNode as G, createTextVNode as re, withCtx as le, reactive as on, onMounted as it, resolveDynamicComponent as ct, createSlots as Pt, useModel as ln, onBeforeUpdate as La, normalizeProps as Ta, guardReactiveProps as Ma, mergeModels as rn, vShow as cn, Comment as Oa, Text as Aa, readonly as Na, mergeProps as Ia, watchEffect as Ra } from "vue";
import { MenuList as Ba } from "menu-bar";
const Ln = Symbol("dc.routeAdapter");
function ce(e) {
  if (!e) return "";
  const t = e.replace(/^[?]/, "");
  return t ? `?${t}` : "";
}
function qa() {
  const e = typeof window < "u", t = I(e ? ce(window.location.search) : ""), n = I(e ? window.location.pathname : "/"), a = () => {
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
function Fa(e, t) {
  const n = f(t.detached), a = f(() => n.value ? "" : e.search.value), s = f(() => n.value ? t.path() : e.path.value);
  return {
    search: a,
    path: s,
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
const Tn = ["list", "cards", "grid", "images", "table", "links", "preview"], Ae = ["ok", "running", "queued", "review", "failed"], gc = [...Ae, "neutral", "accent"], kc = [
  "identity",
  "reference",
  "metric",
  "state",
  "updated",
  "image",
  "tint"
], wc = [480, 620, 760, 900, 1100];
function Ne(e) {
  let t = 2166136261;
  for (let n = 0; n < e.length; n++)
    t ^= e.charCodeAt(n), t = Math.imul(t, 16777619);
  return Math.abs(t);
}
function Ha(e) {
  if (!Number.isFinite(e)) return "—";
  const t = Math.abs(e);
  return t >= 1e6 ? `${(e / 1e6).toFixed(1)}m` : t >= 1e3 ? `${(e / 1e3).toFixed(1)}k` : String(Math.round(e));
}
function Xe(e) {
  if (!Number.isFinite(e)) return "—";
  const t = Math.round(e), n = Math.abs(t);
  return n < 1e3 ? String(t) : n < 9950 ? `${(t / 1e3).toFixed(1)}k` : n < 999500 ? `${Math.round(t / 1e3)}k` : `${(t / 1e6).toFixed(1)}m`;
}
function Me(e) {
  return Number.isFinite(e) ? Math.round(e).toLocaleString("en-US") : "—";
}
function Da(e) {
  const t = new Date(e);
  if (Number.isNaN(t.getTime())) return "—";
  const n = String(t.getUTCDate()).padStart(2, "0"), a = String(t.getUTCMonth() + 1).padStart(2, "0");
  return `${n}.${a}.${t.getUTCFullYear()}`;
}
function Va(e) {
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
function Ka(e) {
  if (e == null || !Number.isFinite(e) || e < 0) return "—";
  if (e < 1e3) return `${e} B`;
  const t = ["kB", "MB", "GB", "TB"];
  let n = e, a = -1;
  for (; n >= 1e3 && a < t.length - 1; )
    n /= 1e3, a += 1;
  return `${n < 100 ? n.toFixed(1) : Math.round(n)} ${t[a]}`;
}
function Wa(e) {
  if (!e || !Number.isFinite(e)) return "—";
  if (e < 1e3) return `${Math.round(e)}ms`;
  const t = e / 1e3;
  return t < 60 ? `${t.toFixed(1)}s` : `${Math.floor(t / 60)}m ${Math.round(t % 60)}s`;
}
function ja(e) {
  if (e == null || !Number.isFinite(e) || e <= 0)
    return "—";
  const t = Math.floor(e / 60);
  return t ? `${t}:${String(e % 60).padStart(2, "0")}` : `${e}s`;
}
function Ua(e) {
  return e == null || !Number.isFinite(e) ? "—" : `${Math.round(e * 100)}%`;
}
function za(e) {
  return e.replace(/\x1b\[[0-9;?]*[ -/]*[@-~]/g, "");
}
const Qa = "cards", Ga = "table";
function Ie(e, t = {}) {
  const n = (s) => s && Mn(s) ? s : void 0;
  if (e === null) return n(t.view) ?? Qa;
  const a = t.landing === "entity" ? n(t.view) : void 0;
  return n(t.entityView) ?? a ?? Ga;
}
function un(e, t, n, a = {}) {
  return e === Ie(t, a) ? Ie(n, a) : e;
}
const Lt = "updated";
function Mn(e) {
  return typeof e == "string" && Tn.includes(e);
}
const Ya = {
  list: "List",
  cards: "Cards",
  grid: "Grid",
  images: "Images",
  table: "Table",
  links: "Links",
  preview: "Preview"
};
function Dt(e, t) {
  const [n] = t ?? [];
  return n === void 0 || t?.includes(e) ? e : n;
}
function Tt(e) {
  return typeof e.count == "number" ? Xe(e.count) : e.count;
}
function Re(e, t) {
  return t ? e.entities.find((n) => n.key === t) ?? null : null;
}
function On(e, t = {}) {
  const n = Re(e, t.entity), a = e.entities[0];
  if (!n && !a) throw new Error(`Schema "${e.key}" declares no entities`);
  return n ?? a;
}
function An(e, t = null) {
  return e?.columns ?? t?.columns ?? [];
}
function ut(e, t = null) {
  if (e?.sorts?.length) return e.sorts;
  const n = /* @__PURE__ */ new Set(), a = [];
  for (const s of An(e, t))
    !s.sort || n.has(s.sort) || (n.add(s.sort), a.push({ key: s.sort, label: (s.label ?? s.sort).toLowerCase() }));
  return a;
}
const Xa = { key: Lt, label: Lt };
function ke(e, t, n = null) {
  const a = ut(e, n);
  return (t ? a.find((o) => o.key === t) : void 0) ?? a.find((o) => o.key === Lt) ?? a[0] ?? Xa;
}
function Ja(e) {
  switch (e.kind) {
    case "chips":
      return { kind: "chips", selected: [] };
    case "range":
      return { kind: "range", min: null, max: null };
    case "toggle":
      return { kind: "toggle", on: !1 };
  }
}
function Za(e) {
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
function Vt(e) {
  return e.entity === null && e.expr.trim() === "";
}
function $c(e) {
  return e.entity !== null;
}
function Kt(e, t) {
  return e.entity === null && Dt(e.view, t) === "cards";
}
function es(e, t) {
  return t <= 0 ? 1 : Math.max(1, Math.ceil(e / t));
}
function Wt(e, t = {}) {
  const a = t.landing === "entity" ? On(e, t) : null;
  return {
    entity: a?.key ?? null,
    view: Ie(a?.key ?? null, t),
    sort: ke(a, t.sort).key,
    dir: t.dir === "asc" ? "asc" : "desc",
    expr: "",
    page: 1
  };
}
const jt = ["entity", "sort", "dir", "expr"];
function wt(e) {
  return jt.some((t) => t in e);
}
const me = "—";
function ve(e, t) {
  return e.find((n) => n.role === t);
}
function Nn(e, t) {
  return e.filter((n) => n.role === t);
}
function ts(e, t) {
  const n = (t ? t.columns : e?.columns) ?? [], a = t ? "scoped" : "everything";
  return n.filter(
    (s) => s.role !== "tint" && ((s.when ?? "always") === "always" || s.when === a)
  );
}
const ns = ["id", "entityKey", "entityLabel"];
function ue(e, t) {
  if (e.value) return e.value(t);
  const n = e.field ?? e.key;
  if (n !== void 0) {
    if (t.fields && n in t.fields) return t.fields[n];
    if (ns.includes(n))
      return t[n];
  }
}
function dn(e, t) {
  const n = e.key ?? e.field ?? e.label;
  return n?.trim() ? n.trim() : `column-${t}`;
}
function as(e, t) {
  return e.id?.trim() ? e.id : `${e.entityKey || "row"}-${t}`;
}
function ss(e, t) {
  if (e == null || e === "") return me;
  if (t === "number") {
    const n = typeof e == "number" ? e : Number(e);
    return Number.isFinite(n) ? Ha(n) : String(e);
  }
  return t === "date" ? Da(String(e)) : Array.isArray(e) ? e.length ? e.join(", ") : me : String(e);
}
function Pe(e, t) {
  const n = ue(e, t);
  return e.format ? e.format(n, t) : ss(n, e.kind);
}
function os(e) {
  return typeof e == "number" ? Number.isFinite(e) ? String(e) : "" : typeof e == "string" ? e : Array.isArray(e) ? e.join(", ") : "";
}
function In(e, t) {
  const n = Pe(e, t), a = os(ue(e, t));
  return a && a !== n ? a : n;
}
function Ye(e, t) {
  return e ? Pe(e, t) : "";
}
function fn(e) {
  return e.align ? e.align : e.kind === "number" || e.kind === "ordinal" ? "right" : "left";
}
const ls = {
  ordinal: "dc-table__num",
  number: "dc-table__number",
  date: "dc-table__date",
  status: "dc-table__state"
};
function vn(e) {
  return [ls[e.kind ?? "text"], e.class].filter(Boolean).join(" ");
}
function Mt(e) {
  if (e.truncate !== void 0) return e.truncate;
  const t = e.kind ?? "text";
  return t === "text" || t === "number" || t === "date";
}
const rs = /^([A-Za-z_][\w.-]*)\s*(>=|<=|:|=|>|<)\s*(.*)$/, pn = "-?(?:\\d+\\.?\\d*|\\.\\d+)", is = new RegExp(`^(${pn})?\\.\\.(${pn})?$`);
function dt(e) {
  const t = is.exec(e.trim());
  if (!t || t[1] === void 0 && t[2] === void 0) return null;
  const n = t[1] === void 0 ? null : Number(t[1]), a = t[2] === void 0 ? null : Number(t[2]);
  return n !== null && a !== null && n > a ? { min: a, max: n } : { min: n, max: a };
}
function cs(e) {
  return `${e.min ?? ""}..${e.max ?? ""}`;
}
function Be(e) {
  return e.kind === "field" && (e.comparator === ":" || e.comparator === "=") && dt(e.value) !== null;
}
function us(e) {
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
function ie(e) {
  const t = e.trim();
  if (!t) return [];
  const n = [];
  let a = [];
  for (const s of us(t)) {
    const o = s.toUpperCase();
    if (o === "AND" || o === "&&") continue;
    if (o === "OR" || o === "||") {
      a.length && n.push(a), a = [];
      continue;
    }
    const l = s.length > 1 && s.startsWith("-"), i = l ? s.slice(1) : s, r = l ? { negated: !0 } : {}, c = rs.exec(i);
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
const we = (e) => e.toLowerCase().replace(/\s+/g, ""), Rn = [
  ["status", "state"],
  ["state", "state"],
  ["updated", "updated"],
  ["date", "updated"],
  ["name", "identity"],
  ["ref", "reference"]
];
function ds(e, t, n) {
  const a = we(e), s = n.columns ?? [];
  if (a === "entity") return t.entityKey;
  if (e in t.fields) return t.fields[e];
  const o = s.find(
    (c) => c.key?.toLowerCase() === e.toLowerCase() || c.field?.toLowerCase() === e.toLowerCase() || c.label !== void 0 && we(c.label) === a
  );
  if (o) return ue(o, t);
  const l = n.facets.find(
    (c) => c.key.toLowerCase() === a || we(c.label) === a
  );
  if (l && l.key in t.fields) return t.fields[l.key];
  const i = Rn.find(([c]) => c === a)?.[1];
  if (i) {
    const c = ve(s, i);
    if (c) return ue(c, t);
  }
  const r = /^metric(\d+)$/.exec(a);
  if (r) {
    const c = Nn(s, "metric")[Number(r[1]) - 1];
    if (c) return ue(c, t);
  }
}
function De(e) {
  return (e.toLowerCase().match(/[\p{L}\p{N}]+/gu) ?? []).map((t) => t.charAt(0)).join("");
}
const hn = /^[a-z_][\w.-]*$/;
function ft(e) {
  const t = (e.key ?? e.field)?.toLowerCase();
  if (t !== void 0) return hn.test(t) ? t : void 0;
  const n = e.label === void 0 ? void 0 : we(e.label);
  return n !== void 0 && hn.test(n) ? n : void 0;
}
function Ut(e, t) {
  const n = we(e);
  return !!t?.entities.some((a) => a.scope && we(a.scope) === n);
}
function fs(e, t, n) {
  const a = we(e);
  if (a === "entity" || Rn.some(([o]) => o === a) || /^metric\d+$/.test(a) || Ut(e, n)) return !0;
  const s = (o) => o !== void 0 && we(o) === a;
  return (t.columns ?? []).some(
    (o) => s(o.key) || s(o.field) || s(o.label)
  ) || t.facets.some((o) => s(o.key) || s(o.label));
}
function qe(e, t, n) {
  return t ? qn(e, (a) => {
    const s = Fn(a, t, n);
    return s && ft(s);
  }) : e;
}
function Bn(e, t, n) {
  return t ? qn(e, (a) => {
    if (Ut(a, n)) return;
    const s = (t.columns ?? []).find((o) => ft(o) === a);
    return s && Hn(s, t, n);
  }) : e;
}
function vs(e, t, n) {
  if (!t || Ut(e, n)) return;
  const a = t.facets.find((s) => s.key.toLowerCase() === e);
  return a ? a.label : (t.columns ?? []).find((s) => ft(s) === e)?.label;
}
function qn(e, t) {
  let n = !1;
  const a = ie(e).map(
    (s) => s.map((o) => {
      if (o.kind !== "field") return o;
      const l = t(o.field);
      return !l || l === o.field ? o : (n = !0, { ...o, field: l });
    })
  );
  return n ? he(a) : e;
}
function Fn(e, t, n) {
  if (!(!e || fs(e, t, n)))
    return (t.columns ?? []).find(
      (a) => a.label !== void 0 && De(a.label) === e
    );
}
function Hn(e, t, n) {
  if (!t || e.label === void 0 || !ft(e)) return;
  const a = De(e.label);
  return Fn(a, t, n) === e ? a : void 0;
}
function bt(e, t) {
  const n = e.toLowerCase(), a = t.toLowerCase();
  if (!a.includes("*")) return n.includes(a);
  const s = a.replace(/[.+?^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*");
  return new RegExp(s).test(n);
}
function mn(e, t) {
  return e.toLowerCase() === t.toLowerCase();
}
function ps(e, t, n, a) {
  if (e.kind === "text") {
    const r = n.columns ?? [];
    return ["identity", "reference"].some((c) => {
      const d = ve(r, c), m = d ? ue(d, t) : void 0;
      return typeof m == "string" && bt(m, e.value);
    });
  }
  const s = ds(e.field, t, n);
  if (s === void 0) return a?.has(e.field) ? !1 : null;
  const o = Be(e) ? dt(e.value) : null;
  if (o) {
    if (Array.isArray(s) || typeof s == "boolean") return null;
    const r = typeof s == "number" ? s : Number(s);
    return Number.isFinite(r) ? (o.min === null || r >= o.min) && (o.max === null || r <= o.max) : null;
  }
  if (Array.isArray(s))
    return e.comparator === ":" || e.comparator === "=" ? s.some(
      (c) => e.comparator === "=" ? mn(String(c), e.value) : bt(String(c), e.value)
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
    return e.comparator === "=" ? mn(String(s), e.value) : bt(String(s), e.value);
  }
  const l = Number(e.value), i = typeof s == "number" ? s : Number(s);
  return !Number.isFinite(l) || !Number.isFinite(i) ? null : hs(e.comparator, i, l);
}
function yn(e, t, n, a) {
  const s = ps(e, t, n, a);
  return s === null ? !0 : e.negated ? !s : s;
}
function hs(e, t, n) {
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
function _n(e) {
  return e.kind === "field" && !e.negated && (e.comparator === ":" || e.comparator === "=") && !Be(e);
}
const gn = /* @__PURE__ */ new WeakMap();
function ms(e) {
  if (!e?.strictScopes) return null;
  let t = gn.get(e);
  return t || (t = new Set(
    e.entities.flatMap((n) => n.scope ? [n.scope.toLowerCase()] : [])
  ), gn.set(e, t)), t;
}
function ys(e, t, n, a) {
  if (!e.length) return !0;
  const s = ms(a);
  return e.some((o) => {
    const l = /* @__PURE__ */ new Map();
    for (const i of o)
      _n(i) && l.set(
        i.field,
        (l.get(i.field) ?? !1) || yn(i, t, n, s)
      );
    return o.every(
      (i) => _n(i) ? l.get(i.field) === !0 : yn(i, t, n, s)
    );
  });
}
function kn(e) {
  return /[\s"']/.test(e) ? `"${e.replace(/["']/g, "")}"` : e;
}
function $e(e) {
  const t = e.negated ? "-" : "";
  return e.kind === "text" ? t + kn(e.value) : `${t}${e.field}${e.comparator}${kn(e.value)}`;
}
function _s(e) {
  if (!e.negated) return { ...e, negated: !0 };
  const { negated: t, ...n } = e;
  return n;
}
function he(e) {
  return e.filter((t) => t.length).map((t) => t.map($e).join(" ")).join(" OR ");
}
function gs(e, t, n) {
  return e.map((a, s) => s === t ? a.filter((o, l) => l !== n) : a).filter((a) => a.length);
}
function xc(e) {
  const t = ie(e);
  if (t.length > 1) return { parts: [], text: e.trim() };
  const n = t[0] ?? [];
  return {
    parts: n.filter((a) => a.kind === "field"),
    text: n.filter((a) => a.kind === "text").map($e).join(" ")
  };
}
function Sc(e, t) {
  return [...e.map($e), t.trim()].filter(Boolean).join(" ");
}
const wn = (e, t) => e.toLowerCase() === t.toLowerCase();
function Ot(e, t) {
  return !!e.negated == !!t.negated && Dn(e, t);
}
function ks(e, t) {
  return !!e.negated != !!t.negated && Dn(e, t);
}
function Dn(e, t) {
  return e.kind === "field" ? t.kind === "field" && e.field === t.field && e.comparator === t.comparator && wn(e.value, t.value) : t.kind === "text" && wn(e.value, t.value);
}
function ws(e, t) {
  return t.filter((n) => !e.some((a) => Ot(a, n)));
}
function zt(e, t) {
  return Vn(e, t, (n) => n);
}
function At(e, t) {
  return Vn(
    e,
    t,
    (n, a) => n.filter((s) => !a.some((o) => ks(s, o)))
  );
}
const bs = /^[A-Za-z_][\w.-]*\s*(?:>=|<=|:|=|>|<)$/;
function $s(e) {
  return he(
    ie(e).map(
      (t) => t.filter(
        (n) => n.kind !== "text" || n.value !== "-" && !bs.test(n.value)
      )
    ).filter((t) => t.length > 0)
  );
}
function Vn(e, t, n) {
  const a = ie(e), s = ie(t);
  return a.length ? s.length ? he(
    a.flatMap(
      (o) => s.map((l) => [...n(o, l), ...ws(o, l)])
    )
  ) : he(a) : he(s);
}
const Kn = (e) => e.kind === "date" || e.role === "updated";
function xs(e) {
  if (!e) return () => 0;
  const n = (e.kind ?? "text") === "number" || e.role === "metric", a = Kn(e);
  return (s, o) => {
    const l = ue(e, s), i = ue(e, o);
    return n ? Number(i ?? 0) - Number(l ?? 0) : a ? Date.parse(String(i ?? "")) - Date.parse(String(l ?? "")) : String(i ?? "").localeCompare(String(l ?? ""));
  };
}
function bn(e, t) {
  return !t || !Kn(t) ? !1 : !Number.isFinite(Date.parse(String(ue(t, e) ?? "")));
}
function Wn({ query: e, schema: t, entity: n, limit: a, offset: s }, o, l) {
  const i = ie(e.expr), r = n ? [n] : t.entities;
  let c = 0;
  const d = [];
  for (const k of r)
    for (const h of o(k))
      c += 1, ys(i, h, k, t) && d.push(h);
  const m = ke(n, e.sort, t), g = An(n, t).find((k) => k.sort === m.key), C = l.undatedLast ? d.filter((k) => !bn(k, g)) : d, x = l.undatedLast ? d.filter((k) => bn(k, g)) : [];
  C.sort(xs(g)), e.dir === "asc" && C.reverse();
  const y = x.length ? [...C, ...x] : C;
  return {
    // One page out of the middle. `total` stays the whole match, which is what
    // the shell counts pages with.
    rows: l.zeroIsAll && a <= 0 ? y.slice(s) : y.slice(s, s + a),
    total: d.length,
    unfiltered: d.length === c
  };
}
const Je = [
  "oklch(0.36 0.06 240)",
  "oklch(0.34 0.07 290)",
  "oklch(0.36 0.06 160)",
  "oklch(0.38 0.06 80)",
  "oklch(0.35 0.07 30)",
  "oklch(0.34 0.05 200)"
];
function Cc(e) {
  return Je[Ne(e) % Je.length];
}
function jn(e, t) {
  return `${e}_${1e4 + t * 7}`;
}
const Ss = 7, Cs = 3;
function Es(e, t, n, a) {
  const s = (t * Ss + Ne(n)) % a, o = [];
  for (let l = 0; l < Math.min(Cs, a); l++)
    o.push(jn(e, (s + l) % a));
  return o;
}
function Ps(e, t) {
  switch (e.kind) {
    case "chips":
      return e.multiple ? Ls(e.options, t) : e.options[t % e.options.length] ?? "";
    case "range": {
      const n = Math.max(0, e.max - e.min);
      return e.min + (n === 0 ? 0 : t % (n + 1));
    }
    case "toggle":
      return t % 3 === 0;
  }
}
function Ls(e, t) {
  if (!e.length) return [];
  const n = 1 + (t >> 5) % Math.min(3, e.length), a = t % e.length, s = /* @__PURE__ */ new Set();
  for (let o = 0; o < n; o++) s.add((a + o) % e.length);
  return [...s].sort((o, l) => o - l).map((o) => e[o]);
}
function Ts(e, t) {
  const { hash: n, sample: a, revision: s, updatedAt: o } = t, l = s ? ` · rev ${s + 1}` : "";
  switch (e.role) {
    case "identity":
      return `${a[0]}${l}`;
    case "reference":
      return s ? `${a[1]}-${s + 1}` : a[1];
    case "state":
      return Ae[n % Ae.length];
    case "updated":
      return o;
    case "tint":
      return Je[n % Je.length];
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
function Ms(e, t = {}) {
  const n = t.population ?? 48, a = t.seed ?? "", s = t.now ?? /* @__PURE__ */ new Date("2026-08-25T00:00:00Z"), o = e.samples, l = t.scopes ?? [];
  if (!o.length) return [];
  const i = [];
  for (let r = 0; r < n; r++) {
    const c = o[r % o.length], d = Math.floor(r / o.length), m = Ne(`${a}:${e.key}:${c[0]}:${r}`), g = jn(e.key, r), C = new Date(s.getTime() - m % 900 * 36e5).toISOString(), x = {};
    for (const y of e.columns ?? []) {
      const k = y.field ?? y.key;
      if (!k || y.value) continue;
      const h = Ts(y, {
        hash: Ne(`${m}:${k}`),
        sample: c,
        revision: d,
        updatedAt: C
      });
      h !== void 0 && (x[k] = h);
    }
    for (const y of e.facets)
      x[y.key] = Ps(y, Ne(`${m}:${y.key}`));
    for (const [y, k] of l)
      x[y] = k === e.key ? g : Es(k, r, y, n);
    i.push({ id: g, entityKey: e.key, entityLabel: e.label, fields: x });
  }
  return i;
}
function Os(e = {}) {
  const t = /* @__PURE__ */ new Map(), n = (a, s) => {
    const o = t.get(a.key);
    if (o) return o;
    const l = e.scopes ?? s.entities.flatMap(
      (r) => r.scope ? [[r.scope, r.key]] : []
    ), i = Ms(a, { ...e, scopes: l });
    return t.set(a.key, i), i;
  };
  return {
    query(a) {
      return Wn(a, (s) => n(s, a.schema), {
        undatedLast: !1,
        zeroIsAll: !1
      });
    }
  };
}
const Le = "e", vt = "v", Qt = "s", Gt = "d", xe = "q", pt = "p", Un = "*", As = [
  Le,
  vt,
  Qt,
  Gt,
  xe,
  pt
], Ns = [
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
function Ze(e) {
  let t = encodeURIComponent(e);
  for (const [n, a] of Ns) t = t.replace(n, a);
  return t;
}
function pe(e) {
  try {
    return decodeURIComponent(e.replace(/\+/g, " "));
  } catch {
    return e.replace(/\+/g, " ");
  }
}
function Yt(e) {
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
function Is(e) {
  return As.includes(e);
}
function ht(e, t) {
  if (!(!t || e.some((n) => n.key === t)))
    return e.find((n) => De(n.label) === t);
}
function Rs(e, t) {
  const n = De(e.label);
  return ht(t.entities, n)?.key === e.key ? n : e.key;
}
function zn(e, t) {
  return t ? Re(e, t) ?? ht(e.entities, t) ?? null : null;
}
function Bs(e, t) {
  const n = De(e.label);
  return ht(t, n)?.key === e.key ? n : e.key;
}
function qs(e, t) {
  return t.some((n) => n.key === e) ? e : ht(t, e)?.key ?? e;
}
function Fs(e, t, n = {}) {
  const a = Wt(t, n), s = new Map(Yt(e)), o = s.get(Le), l = o === void 0 ? a.entity : pe(o), i = l === Un ? null : zn(t, l), r = s.get(vt), c = r && Mn(pe(r)) ? pe(r) : Ie(i?.key ?? null, n), d = s.get(Qt), m = ke(
    i,
    d ? qs(pe(d), ut(i, t)) : n.sort,
    t
  ), g = s.get(Gt), C = g ? pe(g) === "asc" ? "asc" : "desc" : a.dir, x = s.get(xe), y = s.get(pt), k = y === void 0 ? 1 : Number(pe(y)), h = Number.isFinite(k) ? Math.max(1, Math.floor(k)) : 1;
  return {
    entity: i?.key ?? null,
    view: c,
    sort: m.key,
    dir: C,
    expr: x === void 0 ? "" : qe(pe(x), i, t),
    page: h
  };
}
function $t(e, t, n = {}, a = "") {
  const s = Wt(t, n), o = Re(t, e.entity), l = Yt(a).filter(([m]) => !Is(m)), i = [], r = (m, g) => i.push([m, Ze(g)]), c = o?.key ?? null;
  if (c !== s.entity && r(Le, o ? Rs(o, t) : Un), e.view !== Ie(c, n) && r(vt, e.view), e.sort !== s.sort) {
    const m = ut(o, t), g = m.find((C) => C.key === e.sort);
    r(Qt, g ? Bs(g, m) : e.sort);
  }
  e.dir !== s.dir && r(Gt, e.dir), e.expr.trim() !== "" && r(xe, Bn(e.expr, o, t)), e.page > 1 && r(pt, String(e.page));
  const d = [
    ...l.map(([m, g]) => [Ze(m), g]),
    ...i
  ];
  return d.length ? `?${d.map(([m, g]) => g === "" ? m : `${m}=${g}`).join("&")}` : "";
}
function Ec(e) {
  const t = [];
  for (const [n, a] of Object.entries(e))
    for (const s of Array.isArray(a) ? a : [a]) {
      if (typeof s != "string") continue;
      const o = Ze(n);
      t.push(s === "" ? o : `${o}=${Ze(s)}`);
    }
  return t.length ? `?${t.join("&")}` : "";
}
function Pc(e, t) {
  const n = new Map(Yt(e)), a = n.get(xe), s = a === void 0 ? "" : pe(a);
  if (!t) return s;
  const o = n.get(Le);
  return qe(
    s,
    o === void 0 ? null : zn(t, pe(o)),
    t
  );
}
function mt(e, t) {
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
  const a = t.filter((s) => s.replace(/"/g, "") !== "").map((s) => Gn(n, s));
  return a.length ? a.join(" ") : null;
}
function yt(e, t) {
  if (e.kind !== "field" || t.kind !== "field") return Ot(e, t);
  const n = (a) => a.comparator === ":" || a.comparator === "=";
  return Ot(e, { ...t, comparator: n(e) && n(t) ? e.comparator : t.comparator });
}
function et(e, t) {
  return yt(e, _s(t));
}
function tt(e, t) {
  return mt(
    e.entities.find((n) => n.key === t.entityKey),
    t
  );
}
function Ve(e, t) {
  if (!t) return e;
  const n = e.trim();
  if (!n) return t;
  const [a] = ie(t).flat();
  if (!a) return n;
  const s = ie(n);
  return s.some((i) => i.some((r) => yt(r, a))) ? n : s.some((i) => i.some((r) => et(r, a))) ? he(
    s.map(
      (i) => i.map((r) => et(r, a) ? a : r)
    )
  ) : `${n} ${t}`;
}
function Yn(e) {
  if (!e) return null;
  const t = e.trim();
  return t ? t.startsWith("-") ? t.slice(1) : `-${t}` : null;
}
function Xt(e, t) {
  if (!t || !e.trim()) return null;
  const [n] = ie(t).flat();
  if (!n) return null;
  const a = ie(e).flat();
  return a.some((s) => yt(s, n)) ? n.negated ? "out" : "in" : a.some((s) => et(s, n)) ? n.negated ? "in" : "out" : null;
}
function Xn(e, t) {
  if (!t || !e.trim()) return e;
  const [n] = ie(t).flat();
  if (!n) return e;
  const a = ie(e), s = a.map(
    (o) => o.filter((l) => !yt(l, n) && !et(l, n))
  );
  return s.every((o, l) => o.length === a[l]?.length) ? e : he(s);
}
function Nt(e, t, n) {
  return t ? n === null ? Xn(e, t) : Ve(e, n === "out" ? Yn(t) : t) : e;
}
function Jn(e) {
  return e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0;
}
function _t(e) {
  return e.altKey ? { exclude: !0 } : {};
}
function xt(e, t, n, a = {}) {
  const s = tt(e, n);
  return Ve(t.expr, a.exclude ? Yn(s) : s);
}
function Zn(e, t) {
  const n = e?.scope?.toLowerCase();
  if (!n || e?.keepsScope || !t.trim()) return t;
  const a = ie(t), s = a.map(
    (o) => o.filter((l) => l.kind !== "field" || l.field !== n)
  );
  return s.every((o, l) => o.length === a[l]?.length) ? t : he(s);
}
function ea(e, t) {
  const n = t.toLowerCase();
  return e.entities.find((a) => a.scope?.toLowerCase() === n) ?? null;
}
function ta(e, t, n) {
  if (!t || !n) return null;
  const a = ea(e, t);
  return a ? { entity: a, id: n } : null;
}
function Hs(e, t) {
  const n = [], a = /* @__PURE__ */ new Set();
  for (const s of t)
    for (const o of ie(s).flat()) {
      if (o.kind !== "field" || o.negated) continue;
      const l = ta(e, o.field, o.value);
      if (!l) continue;
      const i = `${l.entity.key}:${l.id.toLowerCase()}`;
      a.has(i) || (a.add(i), n.push({ entityKey: l.entity.key, id: l.id }));
    }
  return n;
}
function Tc(e, t, n = "cards") {
  return {
    // An expression with nothing in it is no parameter, as the shell writes it.
    [xe]: Ve(e, t) || void 0,
    [Le]: void 0,
    [vt]: n,
    [pt]: void 0
  };
}
const na = Symbol("dc.shellContext");
function Ds(e) {
  const t = e.liveQuery ? e : Vs(e);
  return Ft(na, t), t;
}
function Vs(e) {
  const t = e.draft ?? I("");
  return {
    draft: t,
    liveQuery: e.query,
    drafting: f(() => !1),
    commitDraft() {
      const n = t.value.trim();
      n && (e.setExpression(
        At(e.query.value.expr, qe(n, e.entity.value, e.schema.value))
      ), t.value = "");
    },
    abandonDraft() {
      t.value = "";
    },
    ...e
  };
}
function te() {
  const e = qt(na, null);
  if (!e)
    throw new Error(
      "[appfr] No shell context found. Render this component inside <DataShell>."
    );
  return e;
}
const nt = Symbol("dc-shell-theme");
function It(e) {
  return {
    read: () => ({
      theme: be(e.theme),
      accent: be(e.accent),
      tokens: be(e.tokens)
    })
  };
}
function Ks(e, t) {
  t ? t.provide(nt, It(e)) : Ft(nt, It(e));
}
function Ws(e) {
  const t = En();
  Ft(nt, {
    ...It(e),
    element: () => t?.proxy?.$el ?? null
  });
}
function Jt(e) {
  const t = En(), n = qt(nt, null), a = ye(null);
  function s() {
    const r = t?.proxy?.$el, d = (r instanceof Element ? r : r?.parentElement)?.closest(".dc-shell");
    if (!d) {
      a.value = null;
      return;
    }
    const m = {};
    for (const g of Array.from(d.style))
      g.startsWith("--") && (m[g] = d.style.getPropertyValue(g));
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
function aa(e) {
  return e.key.toLowerCase();
}
const js = /* @__PURE__ */ new Set([">", ">=", "<", "<="]);
function sa(e, t) {
  if (e.kind !== "field" || e.negated || e.field !== aa(t)) return !1;
  const n = e.comparator === ":" || e.comparator === "=";
  switch (t.kind) {
    case "range":
      return Be(e) || js.has(e.comparator);
    case "chips":
      return n && !Be(e) && oa(t.options, e.value) !== void 0;
    case "toggle":
      return n && Us(e.value);
  }
}
function oa(e, t) {
  const n = t.toLowerCase();
  return e.find((a) => a.toLowerCase() === n);
}
function Us(e) {
  const t = e.toLowerCase();
  return t === "true" || t === "yes";
}
function la(e, t) {
  const n = (ie(e)[0] ?? []).filter((a) => sa(a, t));
  switch (t.kind) {
    case "range": {
      let a = null, s = null;
      for (const o of n) {
        const l = dt(o.value), i = Number(o.value);
        l ? (l.min !== null && (a = l.min), l.max !== null && (s = l.max)) : Number.isFinite(i) && (o.comparator.startsWith(">") ? a = i : s = i);
      }
      return { kind: "range", min: a, max: s };
    }
    case "chips": {
      const a = new Set(n.map((s) => oa(t.options, s.value)));
      return { kind: "chips", selected: t.options.filter((s) => a.has(s)) };
    }
    case "toggle":
      return { kind: "toggle", on: n.length > 0 };
  }
}
function zs(e, t) {
  const n = aa(e);
  switch (t.kind) {
    case "range":
      return t.min === null && t.max === null ? [] : [{ kind: "field", field: n, comparator: ":", value: cs(t) }];
    case "chips":
      return t.selected.map((a) => ({ kind: "field", field: n, comparator: "=", value: a }));
    case "toggle":
      return t.on ? [{ kind: "field", field: n, comparator: ":", value: "true" }] : [];
  }
}
function ra(e, t, n) {
  const a = zs(t, n), s = ie(e), o = (s.length ? s : [[]]).map((l) => [
    ...l.filter((i) => !sa(i, t)),
    ...a
  ]);
  return he(o);
}
function Mc(e, t) {
  return ra(e, t, Ja(t));
}
function Qs(e, t) {
  return (t?.facets ?? []).some((n) => Za(la(e, n)));
}
const at = "entity", Fe = "expr", Gs = { ">=": "≥", "<=": "≤", ">": ">", "<": "<" };
function Ys(e, t, n) {
  if (e.kind !== "field") return $e(e);
  const a = vs(e.field, t, n);
  if (a === void 0) return $e(e);
  const s = e.negated ? "-" : "", o = Be(e) ? dt(e.value) : null;
  if (o) {
    const i = o.min !== null && o.max !== null ? `${o.min} ≤ ${a} ≤ ${o.max}` : o.max !== null ? `${a} ≤ ${o.max}` : `${a} ≥ ${o.min}`;
    return s + i;
  }
  const l = Gs[e.comparator];
  return l ? `${s}${a} ${l} ${e.value}` : $e({ ...e, field: a });
}
function Zt(e, t, n = null) {
  const a = [];
  return t && a.push({
    id: at,
    label: `entity:${t.key}`,
    facetKey: at
  }), ie(e.expr).forEach((s, o) => {
    s.forEach((l, i) => {
      a.push({
        id: `${Fe}:${o}:${i}`,
        label: Ys(l, t, n),
        address: Bn($e(l), t, n),
        facetKey: Fe,
        group: o,
        index: i,
        ...l.kind === "field" ? { field: l.field, value: l.value } : {},
        ...l.negated ? { negated: !0 } : {}
      });
    });
  }), a;
}
function Xs(e, t, n = null) {
  if (Vt(e)) {
    const o = ke(t, e.sort, n);
    return `everything · ${e.view} · ${o.label}`;
  }
  const a = Zt(e, t).filter((o) => o.facetKey !== Fe).map((o) => o.label), s = e.expr.trim();
  return s && a.push(`"${s}"`), a.join(" · ");
}
function Js(e) {
  const { adapter: t } = e, n = f(() => be(e.schema)), a = f(() => be(e.defaults) ?? {}), s = f(() => Fs(t.search.value, n.value, a.value)), o = f(() => Re(n.value, s.value.entity)), l = f(() => o.value ?? On(n.value, a.value)), i = f(() => ut(o.value, n.value)), r = f(() => ke(o.value, s.value.sort, n.value)), c = (h, _) => {
    const p = $t(h, n.value, a.value, t.search.value);
    return p === t.search.value ? !1 : (_ === "push" ? t.push(p) : t.replace(p), !0);
  }, d = () => be(e.navigationMode) ?? "push", m = () => be(e.facetNavigationMode) ?? "replace", g = (h, _) => {
    const p = h.page ?? (wt(h) ? 1 : s.value.page);
    return c({ ...s.value, ...h, page: p }, _);
  }, C = (h) => {
    const _ = h.page ?? (wt(h) ? 1 : s.value.page), p = $t({ ...s.value, ...h, page: _ }, n.value, a.value, t.search.value);
    return t.href ? t.href(p) : `${t.path.value}${p}`;
  }, x = (h, _) => {
    const p = o.value?.facets.find((M) => M.key === h);
    if (!p) return;
    const b = ra(s.value.expr, p, _(la(s.value.expr, p)));
    g({ expr: b }, m());
  }, y = (h) => {
    const _ = h === null ? null : Re(n.value, h);
    return (_?.key ?? null) === s.value.entity ? {} : {
      entity: _?.key ?? null,
      view: un(s.value.view, s.value.entity, _?.key ?? null, a.value),
      sort: ke(_, s.value.sort, n.value).key
    };
  }, k = (h) => {
    const _ = y(h);
    Object.keys(_).length && g(_, d());
  };
  return {
    query: s,
    entity: o,
    focus: l,
    sort: r,
    sorts: i,
    summary: f(() => Xs(s.value, o.value, n.value)),
    terms: f(() => Zt(s.value, o.value, n.value)),
    isPristine: f(() => Vt(s.value)),
    isEverything: f(() => s.value.entity === null),
    hasFacets: f(() => Qs(s.value.expr, o.value)),
    setEntity: k,
    entityHref: (h) => C(y(h)),
    clearEntity: () => k(null),
    setView(h) {
      g({ view: h }, d());
    },
    setSort(h) {
      g({ sort: ke(o.value, h, n.value).key }, d());
    },
    toggleDirection() {
      g({ dir: s.value.dir === "desc" ? "asc" : "desc" }, d());
    },
    setExpression(h) {
      return g({ expr: h }, d());
    },
    narrow(h, _, p) {
      return g({ expr: h, ...y(_), ...p ? { view: p } : {} }, d());
    },
    narrowHref(h, _, p) {
      return C({ expr: h, ...y(_), ...p ? { view: p } : {} });
    },
    setPage(h, _) {
      g({ page: Math.max(1, Math.floor(h)) }, _ ?? d());
    },
    setFacet(h, _) {
      x(h, () => _);
    },
    toggleChip(h, _) {
      x(h, (p) => p.kind !== "chips" ? p : { kind: "chips", selected: p.selected.includes(_) ? p.selected.filter((M) => M !== _) : [...p.selected, _] });
    },
    setRange(h, _, p) {
      x(h, (b) => b.kind === "range" ? { kind: "range", min: _, max: p } : b);
    },
    toggleFlag(h) {
      x(
        h,
        (_) => _.kind === "toggle" ? { kind: "toggle", on: !_.on } : _
      );
    },
    removeTerm(h) {
      if (h.facetKey === at) {
        k(null);
        return;
      }
      if (h.facetKey === Fe) {
        const _ = gs(ie(s.value.expr), h.group ?? 0, h.index ?? 0);
        g({ expr: he(_) }, d());
      }
    },
    clearFilters() {
      g({ ...y(null), expr: "" }, d());
    },
    reset() {
      c(Wt(n.value, a.value), d());
    },
    hrefFor(h) {
      const _ = { ...s.value, ...h };
      return "entity" in h && !("view" in h) && (_.view = un(s.value.view, s.value.entity, _.entity, a.value)), _.page = h.page ?? (wt(h) ? 1 : s.value.page), `${t.path.value}${$t(_, n.value, a.value, t.search.value)}`;
    }
  };
}
function Zs(e) {
  const t = ye([]), n = I(0), a = I(!1), s = I(!1), o = ye(null);
  let l = 0, i = null, r = null;
  const c = f(() => (e.query.value.page - 1) * e.limit.value), d = f(() => es(n.value, e.limit.value)), m = () => {
    const b = e.query.value, M = e.within?.value.trim(), j = Zn(e.entity.value, b.expr);
    return M ? { ...b, expr: zt(M, j) } : j === b.expr ? b : { ...b, expr: j };
  }, g = (b, M) => {
    t.value = b.rows, n.value = b.total, o.value = null, C(M);
  }, C = (b) => {
    i = { key: b, total: n.value }, s.value = !1;
  }, x = (b) => {
    o.value = b, t.value = [], n.value = 0, i = null, s.value = !1;
  }, y = (b, M, j, ne) => {
    let V = !0;
    const U = () => b === l;
    let J = 0, q = !1;
    const Y = (S) => {
      J = S, q = !0, ne === void 0 && (n.value = S);
    }, Z = () => {
      V && (V = !1, t.value = [], Y(0)), o.value = null;
    };
    return {
      get open() {
        return U();
      },
      insert(S, K) {
        if (!U()) return;
        const O = Array.isArray(S) ? S : [S];
        if (!O.length) return;
        Z();
        const F = [...t.value];
        F.splice(K ?? F.length, 0, ...O), t.value = M > 0 ? F.slice(0, M) : F, Y(J + O.length);
      },
      set(S) {
        U() && (S.rows && (Z(), t.value = M > 0 ? S.rows.slice(0, M) : S.rows, Y(S.rows.length)), S.total !== void 0 && Y(S.total));
      },
      close() {
        U() && (a.value = !1, q && (n.value = J), C(j));
      },
      fail(S) {
        U() && (x(S), a.value = !1);
      }
    };
  }, k = () => {
    const b = r;
    r = null, b?.();
  }, h = () => {
    const b = ++l;
    k();
    const M = _.value, j = i?.key === M ? i.total : void 0;
    s.value = j === void 0;
    const ne = {
      query: m(),
      schema: e.schema.value,
      entity: e.entity.value,
      limit: e.limit.value,
      offset: c.value
    }, V = e.source.value;
    if (V.stream) {
      a.value = !0;
      try {
        r = V.stream(ne, y(b, ne.limit, M, j)) ?? null;
      } catch (J) {
        x(J), a.value = !1;
      }
      return;
    }
    let U;
    try {
      U = V.query(ne);
    } catch (J) {
      x(J);
      return;
    }
    if (!(U instanceof Promise)) {
      g(U, M), a.value = !1;
      return;
    }
    a.value = !0, U.then((J) => {
      b === l && g(J, M);
    }).catch((J) => {
      b === l && x(J);
    }).finally(() => {
      b === l && (a.value = !1);
    });
  }, _ = f(() => {
    const b = m();
    return `${e.entity.value?.key ?? e.schema.value.entities[0]?.key ?? ""}|${JSON.stringify(jt.map((j) => b[j]))}`;
  }), p = f(() => `${_.value}|${e.query.value.page}`);
  return se([e.source, p, e.limit], h, {
    immediate: !0
  }), st(() => {
    l++, k();
  }, !0), { rows: t, total: n, offset: c, pageCount: d, pending: a, counting: s, error: o, refresh: h };
}
const eo = 150;
function to(e) {
  const t = e.delay ?? eo, n = I(""), a = I("");
  let s = !1, o;
  const l = () => {
    clearTimeout(o), o = void 0;
  }, i = f(() => qe($s(a.value), e.entity.value, e.schema?.value)), r = f(() => i.value.trim() !== ""), c = f(
    () => JSON.stringify([i.value, ...jt.map((C) => e.query.value[C])])
  ), d = ye(null), m = f(() => {
    const C = e.query.value;
    if (!r.value) return C;
    const x = d.value?.of === c.value ? d.value.page : 1;
    return { ...C, expr: At(C.expr, i.value), page: x };
  });
  se(n, (C) => {
    if (l(), !C.trim()) {
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
  const g = (C) => {
    l(), s = !0, n.value = "", !C() && s && (s = !1, a.value = "");
  };
  return Pn() && st(l), {
    text: n,
    live: m,
    drafting: r,
    setPage(C) {
      d.value = { of: c.value, page: Math.max(1, Math.floor(C)) };
    },
    commit() {
      const C = n.value.trim();
      if (!C) return;
      const x = At(
        e.query.value.expr,
        qe(C, e.entity.value, e.schema?.value)
      );
      a.value = C, g(() => e.setExpression(x));
    },
    abandon() {
      l(), s = !1, n.value = "", a.value = "";
    },
    release: g
  };
}
const no = 25, ia = (e, t) => e.toLowerCase() === t.toLowerCase();
function ao(e, t) {
  return e.find((n) => ia(n.id, t));
}
function so(e) {
  const t = ye(/* @__PURE__ */ new Map()), n = /* @__PURE__ */ new Set(), a = (i) => {
    if (i.facetKey !== Fe) return null;
    const r = ta(e.schema.value, i.field, i.value);
    return r ? { ...r, key: `${r.entity.key}:${r.id}` } : null;
  }, s = (i) => {
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
    const c = Ye(ve(i.columns ?? [], "identity"), r);
    return c === me || ia(c, r.id) ? "" : c;
  }, l = () => {
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
      d.forEach((g, C) => {
        const { reference: x } = r[C], y = ao(g.rows, x.id);
        m.set(x.key, y ? o(x.entity, y) : "");
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
  return se([e.source, e.schema, e.terms], () => {
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
}, Co = /* @__PURE__ */ B({
  __name: "ShellHeader",
  props: {
    views: {},
    pagesNote: {},
    hidePages: { type: Boolean }
  },
  setup(e) {
    const t = e, n = ot(), a = te(), s = f(() => a.schema.value), o = f(() => {
      const E = a.within.value.trim();
      return E ? Zt({ ...a.query.value, expr: E }, null) : [];
    }), l = f(() => {
      const E = a.entity.value, A = E?.keepsScope ? void 0 : E?.scope?.toLowerCase();
      return a.terms.value.filter((R) => R.facetKey !== at).map((R, ee, an) => {
        const sn = an[ee - 1];
        return {
          term: R,
          or: sn?.group !== void 0 && R.group !== void 0 && R.group !== sn.group,
          idle: !!A && R.field?.toLowerCase() === A
        };
      });
    }), i = so({
      source: a.source,
      schema: a.schema,
      query: a.query,
      // The scope's parts as well as the query's: it names a record more often
      // than a typed term does, being what a record's own page is built on.
      terms: f(() => [...o.value, ...a.terms.value])
    });
    function r(E) {
      const A = ea(s.value, E)?.scopeLabel ?? E;
      return A.charAt(0).toUpperCase() + A.slice(1);
    }
    function c(E) {
      return E.replace(/\s*\([^()]*\)\s*$/, "");
    }
    function d(E) {
      const A = i.nameOf(E);
      return A ? `${E.negated ? "-" : ""}${r(E.field)}: ${c(A)}` : E.label;
    }
    function m(E) {
      const A = d(E.term), R = E.idle ? `Not applied to ${a.entity.value?.label} — remove ${A}` : `Remove ${A}`, ee = E.term.address;
      return ee && ee !== A ? `${R}
Written ${ee} in the address and the search box` : R;
    }
    const g = I(null);
    function C(E) {
      g.value = E instanceof HTMLInputElement ? E : null;
    }
    function x() {
      a.abandonDraft(), g.value?.blur();
    }
    function y() {
      k.value = null, a.commitDraft();
    }
    const k = I(null), h = f(() => Math.min(k.value ?? 1 / 0, l.value.length)), _ = f(() => [
      { key: "before", entries: l.value.slice(0, h.value) },
      { key: "after", entries: l.value.slice(h.value) }
    ]), p = f(() => h.value < l.value.length);
    se(l, (E) => {
      k.value !== null && k.value >= E.length && (k.value = null);
    });
    function b(E, A) {
      k.value = E >= l.value.length ? null : Math.max(0, E), lt(() => {
        const R = g.value;
        if (!R) return;
        const ee = A === "start" ? 0 : R.value.length;
        R.setSelectionRange(ee, ee), R.scrollIntoView({ block: "nearest", inline: "nearest" }), O();
      });
    }
    function M(E) {
      const A = g.value;
      return !A || A.selectionStart !== A.selectionEnd ? !1 : A.selectionStart === (E === "start" ? 0 : A.value.length);
    }
    function j(E) {
      h.value === 0 || !M("start") || (E.preventDefault(), b(E.key === "Home" ? 0 : h.value - 1, "start"));
    }
    function ne(E) {
      !p.value || !M("end") || (E.preventDefault(), b(E.key === "End" ? l.value.length : h.value + 1, "end"));
    }
    function V(E) {
      h.value === 0 || !M("start") || (E.preventDefault(), q(l.value[h.value - 1].term, !0));
    }
    function U(E) {
      !p.value || !M("end") || (E.preventDefault(), q(l.value[h.value].term, !1));
    }
    function J(E) {
      E.isComposing || E.altKey || E.ctrlKey || E.metaKey || E.shiftKey || (E.key === "ArrowLeft" || E.key === "Home" ? j(E) : E.key === "ArrowRight" || E.key === "End" ? ne(E) : E.key === "Backspace" ? V(E) : E.key === "Delete" && U(E));
    }
    function q(E, A) {
      A && k.value !== null && (k.value = Math.max(0, k.value - 1)), a.removeTerm(E);
    }
    function Y(E) {
      E.target?.closest("button, input") || (E.preventDefault(), g.value?.focus(), b(l.value.length, "end"));
    }
    function Z() {
      a.draft.value || (k.value = null);
    }
    const S = I(null), K = I("");
    function O() {
      const E = S.value;
      if (!E) {
        K.value = "";
        return;
      }
      const A = E.scrollLeft > 1, R = E.scrollWidth - E.clientWidth - E.scrollLeft > 1;
      K.value = A && R ? "both" : A ? "start" : R ? "end" : "";
    }
    let F = null;
    se(
      S,
      (E) => {
        F?.disconnect(), F = null, O(), !(!E || typeof ResizeObserver > "u") && (F = new ResizeObserver(O), F.observe(E));
      },
      { flush: "post" }
    ), se([l, h], O, { flush: "post" }), _e(() => F?.disconnect());
    const ae = f(() => a.liveQuery.value.page), Te = f(
      () => !t.hidePages && (a.pageCount.value > 1 || !!t.pagesNote) && !Kt(a.query.value, t.views)
    ), L = f(
      () => `${a.counting.value ? "~" : ""}${Me(a.pageCount.value)}`
    ), H = f(() => {
      let E = `Page ${Me(ae.value)} of ${L.value}`;
      const A = a.rows.value.length;
      if (A) {
        const R = a.offset.value + 1, ee = `${a.counting.value ? "~" : ""}${Me(a.total.value)}`;
        E += ` — rows ${Me(R)} to ${Me(R + A - 1)} of ${ee}`;
      }
      return t.pagesNote ? `${E}
${t.pagesNote}` : E;
    }), Q = I(null), ze = f(() => Q.value ?? String(ae.value)), xa = f(
      () => `calc(${Math.max(2, String(a.pageCount.value).length)}ch + 10px)`
    );
    function Sa(E) {
      E.target.select();
    }
    function Ca(E) {
      const A = E.target, R = A.value.replace(/[^0-9]/g, "");
      A.value !== R && (A.value = R), Q.value = R;
    }
    function nn(E) {
      const A = E.target, R = Number(Q.value);
      Q.value = null;
      const ee = Number.isFinite(R) && R >= 1 ? Math.min(Math.trunc(R), Math.max(1, a.pageCount.value)) : ae.value;
      A.value = String(ee), ee !== ae.value && a.setPage(ee);
    }
    function Ea(E) {
      const A = E.target;
      Q.value = null, A.value = String(ae.value), A.blur();
    }
    return (E, A) => (u(), v("div", oo, [
      w("div", lo, [
        s.value.label && n.brand ? (u(), v("button", {
          key: 0,
          type: "button",
          class: "dc-header__domain",
          "data-dc-brand": "",
          title: "Home",
          onClick: A[0] || (A[0] = (R) => $(a).reset())
        }, [
          w("span", ro, [
            z(E.$slots, "brand", {
              label: s.value.label
            }, void 0, !0)
          ]),
          w("span", io, P(s.value.label), 1)
        ])) : s.value.label ? (u(), v("button", {
          key: 1,
          type: "button",
          class: "dc-header__domain",
          title: "Home",
          onClick: A[1] || (A[1] = (R) => $(a).reset())
        }, P(s.value.label), 1)) : T("", !0),
        o.value.length ? (u(), v("span", co, [
          A[6] || (A[6] = w("span", { class: "dc-header__sr" }, "Within", -1)),
          (u(!0), v(D, null, X(o.value, (R) => (u(), v("span", {
            key: `scope:${R.id}`,
            class: "dc-within dc-mono dc-truncate",
            title: d(R)
          }, P(d(R)), 9, uo))), 128))
        ])) : T("", !0),
        w("div", fo, [
          w("div", {
            class: "dc-header__field",
            onMousedown: Y
          }, [
            w("div", {
              ref_key: "termBar",
              ref: S,
              class: "dc-header__terms",
              "data-dc-more": K.value,
              title: $(a).summary.value,
              onScroll: O
            }, [
              (u(!0), v(D, null, X(_.value, (R) => (u(), v(D, {
                key: R.key
              }, [
                w("span", po, [
                  (u(!0), v(D, null, X(R.entries, (ee) => (u(), v(D, {
                    key: ee.term.id
                  }, [
                    ee.or ? (u(), v("span", ho, "or")) : T("", !0),
                    w("button", {
                      type: "button",
                      class: de(["dc-term dc-mono", { "dc-term--idle": ee.idle }]),
                      title: m(ee),
                      "aria-label": `Remove ${d(ee.term)}`,
                      onMousedown: A[2] || (A[2] = Ee(() => {
                      }, ["prevent"])),
                      onClick: (an) => q(ee.term, R.key === "before")
                    }, P(d(ee.term)), 43, mo)
                  ], 64))), 128))
                ]),
                R.key === "before" ? Et((u(), v("input", {
                  key: 0,
                  ref_for: !0,
                  ref: C,
                  "onUpdate:modelValue": A[3] || (A[3] = (ee) => $(a).draft.value = ee),
                  class: de(["dc-header__search dc-mono", { "dc-header__search--between": p.value }]),
                  style: oe({ "--dc-typed": String(Math.max(1, $(a).draft.value.length)) }),
                  type: "text",
                  autocomplete: "off",
                  spellcheck: "false",
                  placeholder: p.value ? "" : "Search…",
                  "aria-label": "Search",
                  onKeydown: [
                    Qe(Ee(y, ["prevent"]), ["enter"]),
                    Qe(Ee(x, ["prevent"]), ["esc"]),
                    J
                  ],
                  onBlur: Z
                }, null, 46, yo)), [
                  [Pa, $(a).draft.value]
                ]) : T("", !0)
              ], 64))), 128))
            ], 40, vo)
          ], 32)
        ])
      ]),
      Te.value ? (u(), v("nav", _o, [
        w("button", {
          type: "button",
          class: "dc-header__step",
          "aria-label": "Previous page",
          disabled: ae.value <= 1,
          onClick: A[4] || (A[4] = (R) => $(a).setPage(ae.value - 1))
        }, [...A[7] || (A[7] = [
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
            style: oe({ width: xa.value }),
            value: ze.value,
            onFocus: Sa,
            onInput: Ca,
            onKeydown: [
              Qe(Ee(nn, ["prevent"]), ["enter"]),
              Qe(Ee(Ea, ["prevent"]), ["esc"])
            ],
            onBlur: nn
          }, null, 44, wo),
          w("span", bo, "/ " + P(L.value), 1)
        ], 8, ko),
        w("span", $o, P(H.value), 1),
        w("button", {
          type: "button",
          class: "dc-header__step",
          "aria-label": "Next page",
          disabled: ae.value >= $(a).pageCount.value,
          onClick: A[5] || (A[5] = (R) => $(a).setPage(ae.value + 1))
        }, [...A[8] || (A[8] = [
          w("span", { "aria-hidden": "true" }, "›", -1)
        ])], 8, xo)
      ])) : T("", !0),
      n.actions ? (u(), v("div", So, [
        z(E.$slots, "actions", {}, void 0, !0)
      ])) : T("", !0)
    ]));
  }
}), W = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [a, s] of t)
    n[a] = s;
  return n;
}, ca = /* @__PURE__ */ W(Co, [["__scopeId", "data-v-91063b26"]]);
function Eo(e) {
  const t = ye(/* @__PURE__ */ new Map()), n = I(!0);
  let a = 0, s;
  const o = () => {
    a++, s?.abort(), s = void 0;
  }, l = () => {
    o();
    const i = a, { signal: r } = s = new AbortController(), c = e.query.value, d = e.schema.value, m = e.entities.value, g = e.within?.value.trim() ?? "";
    n.value = c.expr.trim() === "" && !g;
    const C = /* @__PURE__ */ new Map();
    let x = !0;
    for (const y of m) {
      const k = Zn(y, c.expr), h = g ? zt(g, k) : k;
      let _ = !1;
      const p = (M) => {
        if (i !== a) return;
        if (x) {
          C.set(y.key, M);
          return;
        }
        const j = new Map(t.value);
        j.set(y.key, M), t.value = j;
      }, b = e.source.value.query({
        query: { ...c, entity: y.key, expr: h, page: 1 },
        schema: d,
        entity: y,
        limit: 0,
        offset: 0,
        signal: r,
        progress: (M) => {
          _ || p({ total: M, pending: !0, counted: !0 });
        }
      });
      b instanceof Promise ? (C.has(y.key) || C.set(y.key, { total: 0, pending: !0, counted: !1 }), b.then((M) => {
        _ = !0, p({ total: M.total, pending: !1, counted: !0 });
      })) : (_ = !0, C.set(y.key, { total: b.total, pending: !1, counted: !0 }));
    }
    x = !1, t.value = C;
  };
  return Pn() && st(o), { counts: t, pristine: n, refresh: l, cancel: o };
}
const Po = ["checked", "indeterminate"], ua = /* @__PURE__ */ B({
  __name: "PageTick",
  setup(e) {
    const t = te(), n = f(() => t.rows.value.filter((o) => t.isSelected(o)).length), a = f(
      () => t.rows.value.length > 0 && n.value === t.rows.value.length
    ), s = f(() => n.value > 0 && !a.value);
    return (o, l) => (u(), v("input", {
      class: "dc-tick",
      type: "checkbox",
      checked: a.value,
      indeterminate: s.value,
      "aria-label": "Select every row on this page",
      title: "Select every row on this page",
      onChange: l[0] || (l[0] = (i) => $(t).selectPage(!a.value))
    }, null, 40, Po));
  }
}), Lo = { class: "dc-pick" }, To = ["id"], Mo = ["id", "aria-expanded", "aria-labelledby", "data-dc-value"], Oo = { class: "dc-pick__label" }, Ao = /* @__PURE__ */ B({
  __name: "PickControl",
  props: {
    modelValue: {},
    options: {},
    label: {},
    mono: { type: Boolean }
  },
  emits: ["update:modelValue", "open", "close"],
  setup(e, { emit: t }) {
    const n = e, a = t, s = Ht() ?? "dc-pick", o = I(null), l = I(null), i = I(null), r = I(!1), c = f(() => i.value !== null), d = I(null), m = f(
      () => n.options.find((b) => b.key === n.modelValue) ?? n.options[0]
    ), g = f(
      () => n.options.map((b) => ({
        id: b.key,
        label: b.label,
        checked: b.key === n.modelValue
      }))
    ), C = f(
      () => i.value ? { maxHeight: `${window.innerHeight - i.value.y - 8}px` } : void 0
    );
    function x(b) {
      const M = o.value?.getBoundingClientRect();
      M && (d.value = o.value?.closest(".dc-shell") ?? document.body, i.value = { x: M.left, y: M.bottom + 4, mirrorX: M.right }, r.value = b, a("open"));
    }
    function y(b) {
      i.value && a("close"), i.value = null, b && o.value?.focus();
    }
    function k() {
      c.value ? y(!0) : x(!1);
    }
    function h(b) {
      b.key !== "ArrowDown" && b.key !== "ArrowUp" || c.value || (b.preventDefault(), x(!0));
    }
    function _(b) {
      const M = b.target;
      M && (o.value?.contains(M) || l.value?.root?.contains(M) || y(!1));
    }
    se(c, (b) => {
      b ? window.addEventListener("pointerdown", _, !0) : window.removeEventListener("pointerdown", _, !0);
    }), _e(() => window.removeEventListener("pointerdown", _, !0));
    function p(b) {
      y(!0), !(b.id === void 0 || b.id === n.modelValue) && a("update:modelValue", b.id);
    }
    return (b, M) => (u(), v("span", Lo, [
      w("span", {
        id: `${$(s)}-name`,
        class: "dc-pick__name"
      }, P(e.label), 9, To),
      w("button", {
        id: `${$(s)}-value`,
        ref_key: "trigger",
        ref: o,
        type: "button",
        class: de(["dc-pick__button", { "dc-mono": e.mono }]),
        "aria-haspopup": "menu",
        "aria-expanded": c.value,
        "aria-labelledby": `${$(s)}-name ${$(s)}-value`,
        "data-dc-value": e.modelValue,
        onClick: k,
        onKeydown: h
      }, [
        w("span", Oo, P(m.value?.label), 1)
      ], 42, Mo),
      M[1] || (M[1] = w("svg", {
        class: "dc-pick__mark",
        viewBox: "0 0 16 16",
        "aria-hidden": "true"
      }, [
        w("path", { d: "M4 6l4 4 4-4" })
      ], -1)),
      i.value && d.value ? (u(), N(rt, {
        key: 0,
        to: d.value
      }, [
        G($(Ba), {
          ref_key: "menu",
          ref: l,
          class: "dc-pick__list",
          style: oe(C.value),
          items: g.value,
          at: i.value,
          label: e.label,
          autofocus: r.value,
          onChoose: p,
          onDismiss: M[0] || (M[0] = (j) => y(!0))
        }, null, 8, ["style", "items", "at", "label", "autofocus"])
      ], 8, ["to"])) : T("", !0)
    ]));
  }
}), St = /* @__PURE__ */ W(Ao, [["__scopeId", "data-v-9883dc22"]]), No = {
  key: 2,
  class: "dc-actions__order"
}, Io = ["aria-label", "title"], Ro = {
  key: 3,
  class: "dc-actions__select"
}, Bo = {
  key: 0,
  class: "dc-actions__all"
}, qo = {
  class: "dc-actions__count",
  "aria-live": "polite"
}, Fo = {
  key: 1,
  class: "dc-actions__count dc-actions__all",
  "aria-live": "polite"
}, Ho = { class: "dc-actions__ops" }, Do = ["disabled"], Vo = ["data-dc-operation", "disabled", "onClick"], Ko = ["disabled"], Wo = "…", jo = /* @__PURE__ */ B({
  __name: "RecordActions",
  props: {
    views: {},
    typeChooser: {},
    selectionPlacement: {}
  },
  setup(e) {
    const t = e, n = te(), a = f(
      () => n.hasFacets.value || !!n.liveQuery.value.expr.trim() || !!n.within.value
    ), s = Eo({
      source: n.source,
      schema: n.schema,
      // What each type holds of what is on screen, the draft's results included:
      // a count of the committed query would disagree with the rows under it.
      query: n.liveQuery,
      entities: n.entities,
      within: n.within
    });
    function o(q) {
      if (q.key === n.query.value.entity && a.value) return Xe(n.total.value);
      if (s.pristine.value) return Tt(q);
      const Z = s.counts.value.get(q.key);
      return Z ? Z.counted ? `${Z.pending ? "~" : ""}${Xe(Z.total)}` : Wo : Tt(q);
    }
    const l = f(() => [
      { key: "", label: "Everything" },
      ...n.entities.value.map((q) => ({
        key: q.key,
        label: `${q.label} · ${o(q)}`
      }))
    ]), i = f(
      () => t.typeChooser === "always" || n.query.value.entity !== null
    );
    function r(q) {
      n.setEntity(q || null);
    }
    const c = f(
      () => (t.views ?? [...Tn]).map((q) => ({ key: q, label: Ya[q] }))
    ), d = f(() => Dt(n.query.value.view, t.views)), m = f(() => c.value.length > 1);
    function g(q) {
      n.setView(q);
    }
    const C = f(
      () => p.value && d.value !== "table" && n.sorts.value.length > 0
    ), x = f(
      () => n.sorts.value.map((q) => ({ key: q.key, label: q.label }))
    ), y = f(() => C.value && x.value.length > 1), k = f(() => n.query.value.dir === "desc"), h = f(
      () => `Sorted by ${n.sort.value.label}, ${k.value ? "descending" : "ascending"}`
    ), _ = f(() => n.entity.value), p = f(() => !Kt(n.query.value, t.views)), b = f(() => n.selection.value.ids.length), M = f(
      () => p.value && n.selectable.value && (n.rows.value.length > 0 || b.value > 0)
    ), j = f(() => d.value === "table"), ne = f(
      () => i.value || m.value || C.value || p.value && (M.value || !!(_.value?.create || _.value?.duplicate || _.value?.delete || _.value?.operations?.length))
    ), V = f(() => b.value ? `${b.value} selected` : j.value ? "" : "Select all"), U = f(() => t.selectionPlacement === "end");
    function J(q) {
      return b.value ? q.endsWith("…") ? `${q.slice(0, -1)} ${b.value}…` : `${q} ${b.value}` : q;
    }
    return (q, Y) => ne.value ? (u(), v("div", {
      key: 0,
      class: de(["dc-actions", { "dc-actions--selection-end": U.value }])
    }, [
      i.value ? (u(), N(St, {
        key: 0,
        class: "dc-actions__pick dc-actions__type",
        label: "Type",
        "model-value": $(n).query.value.entity ?? "",
        options: l.value,
        onOpen: $(s).refresh,
        onClose: $(s).cancel,
        "onUpdate:modelValue": r
      }, null, 8, ["model-value", "options", "onOpen", "onClose"])) : T("", !0),
      m.value ? (u(), N(St, {
        key: 1,
        class: "dc-actions__pick dc-actions__view",
        label: "View",
        "model-value": d.value,
        options: c.value,
        "onUpdate:modelValue": g
      }, null, 8, ["model-value", "options"])) : T("", !0),
      C.value ? (u(), v("span", No, [
        y.value ? (u(), N(St, {
          key: 0,
          class: "dc-actions__pick dc-actions__sort",
          label: "Sort",
          "model-value": $(n).sort.value.key,
          options: x.value,
          "onUpdate:modelValue": $(n).setSort
        }, null, 8, ["model-value", "options", "onUpdate:modelValue"])) : T("", !0),
        w("button", {
          type: "button",
          class: "dc-actions__dir",
          "aria-label": h.value,
          title: h.value,
          onClick: Y[0] || (Y[0] = (Z) => $(n).toggleDirection())
        }, P(k.value ? "↓" : "↑"), 9, Io)
      ])) : T("", !0),
      M.value && V.value ? (u(), v("div", Ro, [
        j.value ? (u(), v("span", Fo, P(V.value), 1)) : (u(), v("label", Bo, [
          G(ua),
          w("span", qo, P(V.value), 1)
        ])),
        b.value ? (u(), v("button", {
          key: 2,
          type: "button",
          class: de(["dc-actions__clear", { "dc-actions__clear--op": U.value }]),
          onClick: Y[1] || (Y[1] = (Z) => $(n).clearSelection())
        }, " Clear ", 2)) : T("", !0)
      ])) : T("", !0),
      w("div", Ho, [
        _.value?.create ? (u(), v("button", {
          key: 0,
          type: "button",
          class: "dc-actions__op dc-actions__new",
          onClick: Y[2] || (Y[2] = (Z) => $(n).create(_.value))
        }, [
          Y[5] || (Y[5] = w("span", {
            class: "dc-actions__plus",
            "aria-hidden": "true"
          }, "+", -1)),
          re(" " + P(_.value.create), 1)
        ])) : T("", !0),
        _.value?.duplicate ? (u(), v("button", {
          key: 1,
          type: "button",
          class: "dc-actions__op",
          disabled: !b.value,
          onClick: Y[3] || (Y[3] = (Z) => $(n).duplicate())
        }, P(J(_.value.duplicate)), 9, Do)) : T("", !0),
        (u(!0), v(D, null, X(_.value?.operations ?? [], (Z) => (u(), v("button", {
          key: Z.key,
          type: "button",
          class: "dc-actions__op",
          "data-dc-operation": Z.key,
          disabled: !b.value,
          onClick: (S) => $(n).operate(Z.key)
        }, P(J(Z.label)), 9, Vo))), 128)),
        _.value?.delete ? (u(), v("button", {
          key: 2,
          type: "button",
          class: "dc-actions__op dc-actions__danger",
          disabled: !b.value,
          onClick: Y[4] || (Y[4] = (Z) => $(n).delete())
        }, P(J(_.value.delete)), 9, Ko)) : T("", !0)
      ])
    ], 2)) : T("", !0);
  }
}), da = /* @__PURE__ */ W(jo, [["__scopeId", "data-v-6a34d5fe"]]), Uo = ["href"], zo = /* @__PURE__ */ B({
  __name: "PressLink",
  props: {
    href: {}
  },
  emits: ["press"],
  setup(e, { emit: t }) {
    const n = e, a = t;
    function s(o) {
      if (n.href && Jn(o)) {
        o.stopPropagation();
        return;
      }
      o.preventDefault(), a("press", _t(o), o);
    }
    return (o, l) => e.href ? (u(), v("a", {
      key: 0,
      href: e.href,
      class: "dc-press",
      onClick: s
    }, [
      z(o.$slots, "default", {}, void 0, !0)
    ], 8, Uo)) : (u(), v("button", {
      key: 1,
      type: "button",
      class: "dc-press",
      onClick: s
    }, [
      z(o.$slots, "default", {}, void 0, !0)
    ]));
  }
}), fe = /* @__PURE__ */ W(zo, [["__scopeId", "data-v-a9383f64"]]);
function Qo(e, t) {
  if (!e) return null;
  const n = ue(e, t);
  return typeof n == "string" && n.trim() ? n : null;
}
const Go = (e) => e == null || typeof e == "string" && !e.trim();
function Yo(e, t) {
  const n = ve(t, "state"), a = ve(t, "tint");
  return {
    identity: Ye(ve(t, "identity"), e),
    reference: Ye(ve(t, "reference"), e),
    metrics: Nn(t, "metric").map((s) => ({
      column: s,
      label: s.label ?? "",
      text: Pe(s, e)
    })),
    facts: t.filter((s) => s.cardLabel && !Go(ue(s, e))).map((s) => ({
      column: s,
      label: s.cardLabel,
      title: [s.label, s.hint].filter(Boolean).join(" — "),
      text: Pe(s, e)
    })),
    state: n ? ue(n, e) ?? null : null,
    updated: Ye(ve(t, "updated"), e),
    image: Qo(ve(t, "image"), e),
    tint: a ? ue(a, e) ?? null : null
  };
}
function fa(e, t, n, a, s = !1) {
  const o = n?.columns ?? [];
  return {
    row: e,
    key: as(e, t),
    entityLabel: e.entityLabel,
    entity: n,
    columns: o,
    ordinal: Va(t),
    parts: Yo(e, o),
    pinned: a,
    selected: s
  };
}
function Se() {
  const e = te(), t = f(
    () => new Map(e.entities.value.map((n) => [n.key, n]))
  );
  return f(
    () => e.rows.value.map(
      (n, a) => fa(
        n,
        e.offset.value + a,
        t.value.get(n.entityKey) ?? null,
        e.isPinned(n),
        e.isSelected(n)
      )
    )
  );
}
const Xo = ["data-dc-status", "data-dc-tone"], Jo = /* @__PURE__ */ B({
  __name: "StatusPill",
  props: {
    status: {},
    tone: {},
    label: {}
  },
  setup(e) {
    const t = e, n = f(() => t.label ?? t.status ?? "");
    return (a, s) => (u(), v("span", {
      class: "dc-pill",
      "data-dc-status": e.status,
      "data-dc-tone": e.tone
    }, P(n.value), 9, Xo));
  }
}), Ke = /* @__PURE__ */ W(Jo, [["__scopeId", "data-v-686eb9b6"]]), Zo = { key: 1 }, el = /* @__PURE__ */ B({
  __name: "MetricDrill",
  props: {
    entry: {},
    column: {}
  },
  setup(e) {
    const t = e, n = te(), a = f(() => !t.entry.entity?.scope || !t.column.drill ? null : n.entities.value.find((c) => c.key === t.column.drill) ?? null), s = f(() => t.column.label ?? ""), o = f(() => Pe(t.column, t.entry.row)), l = f(() => a.value ? n.drillHref(t.entry.row, a.value) : null);
    function i(r, c) {
      c.stopPropagation(), a.value && n.drill(t.entry.row, a.value, r);
    }
    return (r, c) => a.value ? (u(), N(fe, {
      key: 0,
      class: "dc-drill",
      href: l.value,
      title: `${s.value} of ${e.entry.parts.identity} — show the ${a.value.label.toLowerCase()}`,
      onPress: i
    }, {
      default: le(() => [
        z(r.$slots, "default", {}, () => [
          re(P(o.value), 1)
        ], !0)
      ]),
      _: 3
    }, 8, ["href", "title"])) : (u(), v("span", Zo, [
      z(r.$slots, "default", {}, () => [
        re(P(o.value), 1)
      ], !0)
    ]));
  }
}), We = /* @__PURE__ */ W(el, [["__scopeId", "data-v-d3e7f4e0"]]), tl = ["data-dc-active", "aria-pressed", "aria-label"], nl = /* @__PURE__ */ B({
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
    return (s, o) => (u(), v("button", {
      type: "button",
      class: "dc-star",
      "data-dc-active": e.pinned ? "true" : "false",
      "aria-pressed": e.pinned,
      "aria-label": e.pinned ? `Unpin ${e.name}` : `Pin ${e.name}`,
      onClick: a
    }, P(e.pinned ? "★" : "☆"), 9, tl));
  }
}), en = /* @__PURE__ */ W(nl, [["__scopeId", "data-v-ef63d763"]]), al = ["src"], sl = /* @__PURE__ */ B({
  __name: "RowPicture",
  props: {
    src: {}
  },
  setup(e) {
    const t = e, n = I(!1);
    return se(
      () => t.src,
      () => {
        n.value = !1;
      }
    ), (a, s) => e.src.trim() && !n.value ? (u(), v("img", {
      key: 0,
      class: "dc-picture",
      src: e.src,
      alt: "",
      loading: "lazy",
      decoding: "async",
      onError: s[0] || (s[0] = (o) => n.value = !0)
    }, null, 40, al)) : T("", !0);
  }
}), gt = /* @__PURE__ */ W(sl, [["__scopeId", "data-v-afaab300"]]), ol = ["data-dc-standing", "title", "aria-label"], ll = /* @__PURE__ */ B({
  __name: "QueryMark",
  props: {
    entry: {}
  },
  setup(e) {
    const t = e, n = te(), a = f(() => mt(t.entry.entity, t.entry.row)), s = f(() => Xt(n.query.value.expr, a.value)), o = f(
      () => s.value === "in" ? `The query narrows to ${t.entry.parts.identity} — press to lift that` : `The query leaves out ${t.entry.parts.identity} — press to lift that`
    );
    function l(i) {
      i.stopPropagation(), n.setExpression(Xn(n.query.value.expr, a.value));
    }
    return (i, r) => s.value ? (u(), v("button", {
      key: 0,
      type: "button",
      class: "dc-standing",
      "data-dc-standing": s.value,
      title: o.value,
      "aria-label": o.value,
      onClick: l
    }, P(s.value === "in" ? "+" : "−"), 9, ol)) : T("", !0);
  }
}), tn = /* @__PURE__ */ W(ll, [["__scopeId", "data-v-4b8d4166"]]), rl = ["aria-label"], il = ["data-dc-standing", "data-dc-active", "aria-checked", "title", "aria-label", "onClick"], cl = /* @__PURE__ */ B({
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
    return (i, r) => (u(), v("span", {
      class: "dc-standing-control",
      role: "radiogroup",
      "aria-label": `Where the query stands on ${e.name}`
    }, [
      (u(!0), v(D, null, X(s.value, (c) => (u(), v("button", {
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
      }, P(c.sign), 9, il))), 128))
    ], 8, rl));
  }
}), Rt = /* @__PURE__ */ W(cl, [["__scopeId", "data-v-5524dca6"]]), va = /* @__PURE__ */ B({
  __name: "RowStanding",
  props: {
    entry: {}
  },
  setup(e) {
    const t = e, n = te(), a = f(() => mt(t.entry.entity, t.entry.row)), s = f(() => Xt(n.query.value.expr, a.value));
    function o(l) {
      n.setExpression(Nt(n.query.value.expr, a.value, l));
    }
    return (l, i) => a.value !== null ? (u(), N(Rt, {
      key: 0,
      class: "dc-row-standing",
      standing: s.value,
      name: e.entry.parts.identity,
      onSet: o
    }, null, 8, ["standing", "name"])) : T("", !0);
  }
}), ul = ["href", "title", "aria-label"], dl = /* @__PURE__ */ B({
  __name: "OpenMark",
  props: {
    entry: {}
  },
  setup(e) {
    const t = e, n = te(), a = f(() => {
      const s = t.entry.row, o = n.recordHref?.(s) ?? null;
      return o ? n.pressHref(s) === o ? null : o : null;
    });
    return (s, o) => a.value ? (u(), v("a", {
      key: 0,
      class: "dc-open",
      href: a.value,
      target: "_blank",
      rel: "noopener noreferrer",
      title: a.value,
      "aria-label": `Open ${e.entry.parts.identity} in a new tab`,
      onClick: o[0] || (o[0] = Ee(() => {
      }, ["stop"]))
    }, "↗", 8, ul)) : T("", !0);
  }
}), je = /* @__PURE__ */ W(dl, [["__scopeId", "data-v-b00f390d"]]), fl = /* @__PURE__ */ B({
  __name: "ScopeMark",
  props: {
    entry: {}
  },
  setup(e) {
    const t = e, n = te(), a = f(
      () => n.narrowsOnPress.value ? null : t.entry.entity?.scope ?? null
    ), s = I(null);
    function o(d) {
      s.value = _t(d).exclude ? "out" : "in";
    }
    function l(d) {
      o(d), window.addEventListener("keydown", o), window.addEventListener("keyup", o);
    }
    function i() {
      s.value = null, window.removeEventListener("keydown", o), window.removeEventListener("keyup", o);
    }
    _e(i);
    const r = f(() => a.value ? n.drillHref(t.entry.row, null) : null);
    function c(d, m) {
      m.stopPropagation(), n.drill(t.entry.row, null, d);
    }
    return (d, m) => a.value ? (u(), N(fe, {
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
      default: le(() => [...m[0] || (m[0] = [
        re(" → ", -1)
      ])]),
      _: 1
    }, 8, ["href", "data-dc-pending", "title", "aria-label"])) : T("", !0);
  }
}), Ue = /* @__PURE__ */ W(fl, [["__scopeId", "data-v-05d2c233"]]), vl = ["checked", "aria-label"], Ce = /* @__PURE__ */ B({
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
    return (s, o) => (u(), v("input", {
      class: "dc-tick",
      type: "checkbox",
      checked: e.selected,
      "aria-label": `Select ${e.name}`,
      onClick: a
    }, null, 8, vl));
  }
}), pl = { class: "dc-card__top dc-mono" }, hl = { class: "dc-card__lead" }, ml = {
  key: 2,
  class: "dc-card__entity"
}, yl = { class: "dc-card__top-right" }, _l = { class: "dc-card__names" }, gl = { class: "dc-card__primary" }, kl = {
  key: 0,
  class: "dc-card__secondary dc-mono"
}, wl = {
  key: 1,
  class: "dc-card__facts dc-mono"
}, bl = ["title"], $l = { class: "dc-card__fact-label" }, xl = {
  key: 0,
  class: "dc-card__metrics dc-mono"
}, Sl = {
  key: 0,
  class: "dc-card__date"
}, Cl = /* @__PURE__ */ B({
  __name: "CardsView",
  setup(e) {
    const t = te(), n = Se(), a = f(() => t.isEverything.value), s = (l) => l.entity?.card === "picture", o = f(() => n.value.length > 0 && n.value.every(s));
    return (l, i) => (u(), v("div", {
      class: de(["dc-cards", { "dc-cards--pictures": o.value }])
    }, [
      (u(!0), v(D, null, X($(n), (r) => (u(), v("div", {
        key: r.key,
        class: de(["dc-card", { "dc-card--picture": s(r) }])
      }, [
        w("div", pl, [
          w("span", hl, [
            $(t).selectable.value ? (u(), N(Ce, {
              key: 0,
              row: r.row,
              selected: r.selected,
              name: r.parts.identity
            }, null, 8, ["row", "selected", "name"])) : T("", !0),
            s(r) ? T("", !0) : (u(), v(D, { key: 1 }, [
              re(P(r.ordinal), 1)
            ], 64)),
            a.value ? (u(), v("span", ml, P(r.entityLabel), 1)) : T("", !0)
          ]),
          w("span", yl, [
            r.parts.state && !s(r) ? (u(), N(Ke, {
              key: 0,
              status: r.parts.state
            }, null, 8, ["status"])) : T("", !0),
            s(r) ? (u(), N(tn, {
              key: 1,
              entry: r
            }, null, 8, ["entry"])) : (u(), N(va, {
              key: 2,
              entry: r
            }, null, 8, ["entry"])),
            G(Ue, { entry: r }, null, 8, ["entry"]),
            G(je, { entry: r }, null, 8, ["entry"]),
            $(t).pinnable.value ? (u(), N(en, {
              key: 3,
              row: r.row,
              name: r.parts.identity,
              pinned: r.pinned
            }, null, 8, ["row", "name", "pinned"])) : T("", !0)
          ])
        ]),
        G(fe, {
          class: "dc-card__open",
          href: $(t).pressHref(r.row),
          onPress: (c) => $(t).activate(r.row, c)
        }, {
          default: le(() => [
            r.parts.image ? (u(), N(gt, {
              key: 0,
              class: "dc-card__image",
              src: r.parts.image
            }, null, 8, ["src"])) : T("", !0),
            w("span", _l, [
              w("span", gl, P(r.parts.identity), 1),
              s(r) ? T("", !0) : (u(), v("span", kl, P(r.parts.reference), 1)),
              r.parts.facts.length ? (u(), v("span", wl, [
                (u(!0), v(D, null, X(r.parts.facts, (c) => (u(), v("span", {
                  key: c.column.key ?? c.label,
                  class: "dc-card__fact",
                  title: c.title || void 0
                }, [
                  w("span", $l, P(c.label), 1),
                  re(" " + P(c.text), 1)
                ], 8, bl))), 128))
              ])) : T("", !0)
            ])
          ]),
          _: 2
        }, 1032, ["href", "onPress"]),
        s(r) ? T("", !0) : (u(), v("div", xl, [
          (u(!0), v(D, null, X(r.parts.metrics.slice(0, 2), (c) => (u(), N(We, {
            key: c.column.key ?? c.label,
            entry: r,
            column: c.column
          }, {
            default: le(() => [
              re(P(c.label) + " " + P(c.text), 1)
            ]),
            _: 2
          }, 1032, ["entry", "column"]))), 128)),
          r.parts.updated ? (u(), v("span", Sl, P(r.parts.updated), 1)) : T("", !0)
        ]))
      ], 2))), 128))
    ], 2));
  }
}), pa = /* @__PURE__ */ W(Cl, [["__scopeId", "data-v-fd252138"]]), El = { class: "dc-grid" }, Pl = { class: "dc-tile__scrim" }, Ll = { class: "dc-tile__top dc-mono" }, Tl = { class: "dc-tile__chip" }, Ml = { class: "dc-tile__caption" }, Ol = { class: "dc-tile__secondary dc-truncate" }, Al = { class: "dc-tile__primary" }, Nl = /* @__PURE__ */ B({
  __name: "GridView",
  setup(e) {
    const t = te(), n = Se();
    return (a, s) => (u(), v("div", El, [
      (u(!0), v(D, null, X($(n), (o) => (u(), v("div", {
        key: o.key,
        class: "dc-grid__cell"
      }, [
        G(fe, {
          class: "dc-tile",
          style: oe({ "--dc-tile-tint": o.parts.tint ?? void 0 }),
          href: $(t).pressHref(o.row),
          onPress: (l) => $(t).activate(o.row, l)
        }, {
          default: le(() => [
            o.parts.image ? (u(), N(gt, {
              key: 0,
              class: "dc-tile__image",
              src: o.parts.image
            }, null, 8, ["src"])) : T("", !0),
            w("span", Pl, [
              w("span", Ll, [
                w("span", Tl, P(o.ordinal), 1)
              ]),
              w("span", Ml, [
                w("span", Ol, P(o.parts.reference), 1),
                w("span", Al, P(o.parts.identity), 1)
              ])
            ])
          ]),
          _: 2
        }, 1032, ["style", "href", "onPress"]),
        $(t).selectable.value ? (u(), N(Ce, {
          key: 0,
          class: "dc-grid__tick",
          row: o.row,
          selected: o.selected,
          name: o.parts.identity
        }, null, 8, ["row", "selected", "name"])) : T("", !0)
      ]))), 128))
    ]));
  }
}), ha = /* @__PURE__ */ W(Nl, [["__scopeId", "data-v-89c40a9e"]]);
function $n(e, t, n, a) {
  return (n - a * (t - 1)) / e;
}
function Ct(e, t) {
  return e > 0 ? Math.min(t, e) : t;
}
function Il(e) {
  return e > 0 ? e : 1 / 0;
}
function Rl(e, t, n) {
  const { width: a, height: s, gap: o = 0 } = n;
  if (!e.length) return [];
  if (!(a > 0) || !(s > 0)) return [{ items: [...e], height: s, filled: !1 }];
  const l = [];
  let i = [], r = 0, c = 0;
  for (const d of e) {
    const m = t(d), g = Math.max(m.ratio, Number.EPSILON), C = m.height && m.height > 0 ? Math.max(c, m.height) : c, x = Ct(C, s), y = $n(r + g, i.length + 1, a, o);
    if (y > x) {
      i.push(d), r += g, c = C;
      continue;
    }
    const k = Ct(c, s), h = i.length ? $n(r, i.length, a, o) : 1 / 0;
    h <= Il(c) && h - k < x - y ? (l.push({ items: i, height: h, filled: !0 }), i = [d], r = g, c = m.height && m.height > 0 ? m.height : 0) : (l.push({ items: [...i, d], height: y, filled: !0 }), i = [], r = 0, c = 0);
  }
  return i.length && l.push({ items: i, height: Ct(c, s), filled: !1 }), l;
}
const Bl = { class: "dc-images" }, ql = {
  key: 1,
  class: "dc-images__blank",
  "aria-hidden": "true"
}, Fl = 240, Ge = 8, Hl = 1, Dl = /* @__PURE__ */ B({
  __name: "ImagesView",
  setup(e) {
    const t = te(), n = Se(), a = on(/* @__PURE__ */ new Map()), s = on(/* @__PURE__ */ new Set());
    function o(x, y) {
      const k = y.target;
      k.naturalWidth > 0 && k.naturalHeight > 0 && a.set(x, { width: k.naturalWidth, height: k.naturalHeight });
    }
    function l(x) {
      const y = x.parts.image;
      return y && !s.has(y) ? y : null;
    }
    function i(x) {
      const y = l(x);
      return y ? a.get(y) : void 0;
    }
    function r(x) {
      const y = i(x);
      return y ? { ratio: y.width / y.height, height: y.height } : { ratio: Hl };
    }
    const c = I(null), d = I(0);
    let m = null;
    function g() {
      d.value = c.value?.clientWidth ?? 0;
    }
    it(() => {
      g(), !(!c.value || typeof ResizeObserver > "u") && (m = new ResizeObserver(g), m.observe(c.value));
    }), _e(() => {
      m?.disconnect(), m = null;
    });
    const C = f(() => {
      const x = Rl(n.value, r, {
        width: d.value,
        height: Fl,
        gap: Ge
      }), y = [];
      let k = 0;
      for (const h of x) {
        let _ = 0;
        for (const p of h.items) {
          const b = r(p).ratio * h.height, M = i(p), j = M !== void 0 && M.height < h.height;
          y.push({
            entry: p,
            style: {
              top: `${k}px`,
              left: `${_}px`,
              width: `${b}px`,
              height: `${h.height}px`
            },
            picture: j ? { width: `${M.width}px`, height: `${M.height}px` } : { width: "100%", height: "100%" }
          }), _ += b + Ge;
        }
        k += h.height + Ge;
      }
      return { boxes: y, height: x.length ? k - Ge : 0 };
    });
    return (x, y) => (u(), v("div", Bl, [
      w("div", {
        ref_key: "wall",
        ref: c,
        class: "dc-images__wall",
        style: oe({ height: `${C.value.height}px` })
      }, [
        (u(!0), v(D, null, X(C.value.boxes, ({ entry: k, style: h, picture: _ }) => (u(), v("div", {
          key: k.key,
          class: "dc-images__cell",
          style: oe(h)
        }, [
          G(fe, {
            class: "dc-images__open",
            title: k.parts.identity,
            "aria-label": k.parts.identity,
            href: $(t).pressHref(k.row),
            onPress: (p) => $(t).activate(k.row, p)
          }, {
            default: le(() => [
              l(k) ? (u(), N(gt, {
                key: 0,
                class: "dc-images__picture",
                style: oe(_),
                src: l(k),
                onLoad: (p) => o(l(k), p),
                onError: (p) => s.add(l(k))
              }, null, 8, ["style", "src", "onLoad", "onError"])) : (u(), v("span", ql, P(k.parts.identity), 1))
            ]),
            _: 2
          }, 1032, ["title", "aria-label", "href", "onPress"]),
          $(t).selectable.value ? (u(), N(Ce, {
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
}), ma = /* @__PURE__ */ W(Dl, [["__scopeId", "data-v-2d267370"]]), Vl = { class: "dc-links" }, Kl = { class: "dc-link__primary dc-truncate" }, Wl = { class: "dc-link__secondary dc-mono dc-truncate" }, jl = /* @__PURE__ */ B({
  __name: "LinksView",
  setup(e) {
    const t = te(), n = Se();
    return (a, s) => (u(), v("div", Vl, [
      (u(!0), v(D, null, X($(n), (o) => (u(), v("span", {
        key: o.key,
        class: "dc-links__item"
      }, [
        $(t).selectable.value ? (u(), N(Ce, {
          key: 0,
          row: o.row,
          selected: o.selected,
          name: o.parts.identity
        }, null, 8, ["row", "selected", "name"])) : T("", !0),
        G(fe, {
          class: "dc-link",
          href: $(t).pressHref(o.row),
          onPress: (l) => $(t).activate(o.row, l)
        }, {
          default: le(() => [
            w("span", Kl, P(o.parts.identity), 1),
            w("span", Wl, P(o.parts.reference), 1)
          ]),
          _: 2
        }, 1032, ["href", "onPress"])
      ]))), 128))
    ]));
  }
}), ya = /* @__PURE__ */ W(jl, [["__scopeId", "data-v-de6c9a0f"]]), Ul = {
  class: "dc-list",
  role: "list"
}, zl = { class: "dc-list__ordinal dc-mono" }, Ql = { class: "dc-list__identity" }, Gl = { class: "dc-list__primary dc-truncate" }, Yl = { class: "dc-list__secondary dc-mono dc-truncate" }, Xl = {
  key: 1,
  class: "dc-list__entity dc-mono"
}, Jl = { class: "dc-list__metrics dc-mono" }, Zl = { class: "dc-list__trailing" }, er = /* @__PURE__ */ B({
  __name: "ListView",
  setup(e) {
    const t = te(), n = Se(), a = f(() => t.isEverything.value);
    return (s, o) => (u(), v("div", Ul, [
      (u(!0), v(D, null, X($(n), (l) => (u(), v("div", {
        key: l.key,
        class: "dc-list__row",
        role: "listitem"
      }, [
        $(t).selectable.value ? (u(), N(Ce, {
          key: 0,
          class: "dc-list__tick",
          row: l.row,
          selected: l.selected,
          name: l.parts.identity
        }, null, 8, ["row", "selected", "name"])) : T("", !0),
        G(va, {
          class: "dc-list__standing",
          entry: l
        }, null, 8, ["entry"]),
        G(fe, {
          class: "dc-list__open",
          href: $(t).pressHref(l.row),
          onPress: (i) => $(t).activate(l.row, i)
        }, {
          default: le(() => [
            w("span", zl, P(l.ordinal), 1),
            w("span", Ql, [
              w("span", Gl, P(l.parts.identity), 1),
              w("span", Yl, P(l.parts.reference), 1)
            ])
          ]),
          _: 2
        }, 1032, ["href", "onPress"]),
        a.value ? (u(), v("span", Xl, P(l.entityLabel), 1)) : T("", !0),
        w("span", Jl, [
          (u(!0), v(D, null, X(l.parts.metrics.slice(0, 2), (i) => (u(), N(We, {
            key: i.column.key ?? i.label,
            entry: l,
            column: i.column
          }, null, 8, ["entry", "column"]))), 128))
        ]),
        w("span", Zl, [
          l.parts.state ? (u(), N(Ke, {
            key: 0,
            status: l.parts.state
          }, null, 8, ["status"])) : T("", !0),
          G(Ue, { entry: l }, null, 8, ["entry"]),
          G(je, { entry: l }, null, 8, ["entry"]),
          $(t).pinnable.value ? (u(), N(en, {
            key: 1,
            row: l.row,
            name: l.parts.identity,
            pinned: l.pinned
          }, null, 8, ["row", "name", "pinned"])) : T("", !0)
        ])
      ]))), 128))
    ]));
  }
}), Bt = /* @__PURE__ */ W(er, [["__scopeId", "data-v-3d349a10"]]), tr = { class: "dc-preview" }, nr = { class: "dc-preview__pager dc-mono" }, ar = ["disabled"], sr = { "aria-live": "polite" }, or = ["disabled"], lr = {
  key: 0,
  class: "dc-preview__card"
}, rr = ["src"], ir = { class: "dc-preview__body" }, cr = { class: "dc-preview__top" }, ur = { class: "dc-preview__badges" }, dr = { class: "dc-preview__entity dc-mono" }, fr = { class: "dc-preview__marks" }, vr = { class: "dc-preview__primary" }, pr = { class: "dc-preview__secondary dc-mono" }, hr = { class: "dc-preview__fields" }, mr = { class: "dc-preview__key" }, yr = { class: "dc-preview__value dc-mono" }, _r = /* @__PURE__ */ B({
  __name: "PreviewView",
  setup(e) {
    const t = te(), n = Se(), a = I(0);
    se(n, (r) => {
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
    return (r, c) => (u(), v("div", tr, [
      w("div", nr, [
        w("button", {
          type: "button",
          class: "dc-preview__step",
          "aria-label": "Previous result",
          disabled: a.value === 0,
          onClick: c[0] || (c[0] = (d) => i(-1))
        }, " ‹ ", 8, ar),
        w("span", sr, P(l.value), 1),
        w("button", {
          type: "button",
          class: "dc-preview__step",
          "aria-label": "Next result",
          disabled: a.value >= $(n).length - 1,
          onClick: c[1] || (c[1] = (d) => i(1))
        }, " › ", 8, or)
      ]),
      s.value ? (u(), v("div", lr, [
        w("div", {
          class: "dc-preview__media",
          style: oe({ background: s.value.parts.tint ?? void 0 }),
          "aria-hidden": "true"
        }, [
          s.value.parts.image ? (u(), v("img", {
            key: 0,
            class: "dc-preview__image",
            src: s.value.parts.image,
            alt: ""
          }, null, 8, rr)) : (u(), v(D, { key: 1 }, [
            re(" preview ")
          ], 64))
        ], 4),
        w("div", ir, [
          w("div", cr, [
            w("span", ur, [
              $(t).selectable.value ? (u(), N(Ce, {
                key: 0,
                row: s.value.row,
                selected: s.value.selected,
                name: s.value.parts.identity
              }, null, 8, ["row", "selected", "name"])) : T("", !0),
              s.value.parts.state ? (u(), N(Ke, {
                key: 1,
                status: s.value.parts.state
              }, null, 8, ["status"])) : T("", !0),
              w("span", dr, P(s.value.entityLabel), 1)
            ]),
            w("span", fr, [
              G(tn, { entry: s.value }, null, 8, ["entry"]),
              G(Ue, { entry: s.value }, null, 8, ["entry"]),
              G(je, { entry: s.value }, null, 8, ["entry"]),
              $(t).pinnable.value ? (u(), N(en, {
                key: 0,
                row: s.value.row,
                name: s.value.parts.identity,
                pinned: s.value.pinned
              }, null, 8, ["row", "name", "pinned"])) : T("", !0)
            ])
          ]),
          w("div", null, [
            w("div", vr, P(s.value.parts.identity), 1),
            w("div", pr, P(s.value.parts.reference), 1)
          ]),
          w("dl", hr, [
            (u(!0), v(D, null, X(o.value, (d) => (u(), v("div", {
              key: d.key,
              class: "dc-preview__field"
            }, [
              w("dt", mr, P(d.key), 1),
              w("dd", yr, [
                d.column && s.value ? (u(), N(We, {
                  key: 0,
                  entry: s.value,
                  column: d.column
                }, null, 8, ["entry", "column"])) : (u(), v(D, { key: 1 }, [
                  re(P(d.value), 1)
                ], 64))
              ])
            ]))), 128))
          ]),
          G(fe, {
            class: "dc-preview__open",
            href: s.value ? $(t).pressHref(s.value.row) : null,
            onPress: c[2] || (c[2] = (d) => s.value && $(t).activate(s.value.row, d))
          }, {
            default: le(() => [...c[3] || (c[3] = [
              re(" Open record → ", -1)
            ])]),
            _: 1
          }, 8, ["href"])
        ])
      ])) : T("", !0)
    ]));
  }
}), _a = /* @__PURE__ */ W(_r, [["__scopeId", "data-v-59e0d33b"]]);
function gr() {
  const e = te();
  return f(() => ts(e.schema.value, e.entity.value));
}
const kr = /* @__PURE__ */ B({
  __name: "ColumnCell",
  props: {
    column: {},
    entry: {}
  },
  setup(e) {
    const t = e, n = te(), a = f(() => t.column.kind ?? "text"), s = f(() => ue(t.column, t.entry.row)), o = f(
      () => a.value === "ordinal" ? t.entry.ordinal : Pe(t.column, t.entry.row)
    ), l = f(() => s.value), i = f(() => t.column.activate === !0 || !!t.column.click), r = f(() => Mt(t.column)), c = f(() => In(t.column, t.entry.row));
    function d(C) {
      i.value && (C.stopPropagation(), m(_t(C)));
    }
    function m(C) {
      t.column.click?.(t.entry.row, C), t.column.activate && n.activate(t.entry.row, C);
    }
    const g = f(
      () => t.column.activate && !t.column.click ? n.pressHref(t.entry.row) : null
    );
    return (C, x) => a.value === "component" && e.column.component ? (u(), N(ct(e.column.component), {
      key: 0,
      row: e.entry.row,
      entry: e.entry,
      value: s.value,
      column: e.column
    }, null, 8, ["row", "entry", "value", "column"])) : a.value === "status" ? (u(), N(Ke, {
      key: 1,
      status: l.value
    }, null, 8, ["status"])) : a.value === "image" ? (u(), N(gt, {
      key: 2,
      class: "dc-cell__image",
      src: typeof s.value == "string" ? s.value : "",
      style: oe({ maxHeight: e.column.height }),
      onClick: d
    }, null, 8, ["src", "style"])) : e.column.drill ? (u(), N(We, {
      key: 3,
      entry: e.entry,
      column: e.column
    }, null, 8, ["entry", "column"])) : i.value ? (u(), N(fe, {
      key: 4,
      class: de(["dc-table__open", { "dc-truncate": r.value }]),
      href: g.value,
      title: c.value,
      onPress: x[0] || (x[0] = (y, k) => {
        k.stopPropagation(), m(y);
      })
    }, {
      default: le(() => [
        re(P(o.value), 1)
      ]),
      _: 1
    }, 8, ["class", "href", "title"])) : (u(), v("span", {
      key: 5,
      class: de(["dc-cell__text", { "dc-truncate": r.value }])
    }, P(o.value), 3));
  }
}), xn = /* @__PURE__ */ W(kr, [["__scopeId", "data-v-3196ba40"]]), wr = {
  key: 0,
  class: "dc-table__none"
}, br = { class: "dc-table__detail" }, $r = ["data-dc-wrap", "data-dc-row-links"], xr = {
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
}, Or = ["data-dc-align", "data-dc-hide", "title"], Ar = {
  key: 1,
  class: "dc-table__name"
}, Nr = /* @__PURE__ */ B({
  __name: "TableView",
  setup(e) {
    const t = te(), n = Se(), a = gr();
    function s(S, K) {
      const O = t.pressHref(S);
      if (O && Jn(K)) {
        const F = K.shiftKey ? `noopener,popup,width=${window.outerWidth},height=${window.outerHeight}` : "noopener";
        window.open(O, "_blank", F);
        return;
      }
      t.activate(S, _t(K));
    }
    const o = f(() => t.rowLinks?.value ? new Map(n.value.map((S) => [S.key, t.pressHref(S.row)])) : /* @__PURE__ */ new Map()), l = f(
      () => a.value.find((S) => S.role === "identity") ?? a.value[0]
    );
    function i(S, K, O) {
      O.stopPropagation(), t.activate(S, K);
    }
    function r(S) {
      const K = Hn(S, t.entity.value, t.schema.value), O = K ? `Shortcut: ${K}` : void 0;
      return [S.hint, O].filter(Boolean).join(`
`) || void 0;
    }
    const c = f(() => {
      const S = a.value.find((O) => O.scope);
      return S || ((t.entity.value ? !!t.entity.value.href : t.entities.value.some((O) => O.href)) ? a.value.find((O) => O.activate) : void 0);
    }), d = f(
      () => t.entity.value ? !!t.entity.value.scope : t.entities.value.some((S) => S.scope)
    ), m = (S) => mt(S.entity, S.row), g = (S) => Xt(t.query.value.expr, m(S));
    function C(S, K) {
      t.setExpression(Nt(t.query.value.expr, m(S), K));
    }
    const x = f(() => {
      const S = n.value.filter((O) => m(O) !== null), K = S.filter((O) => O.selected);
      return K.length ? K : S;
    }), y = f(() => x.value.some((S) => S.selected)), k = f(() => {
      const S = x.value[0];
      return S ? g(S) : null;
    }), h = f(
      () => x.value.some((S) => g(S) !== k.value)
    ), _ = f(
      () => y.value ? "the ticked rows" : "every row on this page"
    );
    function p(S) {
      t.setExpression(
        x.value.reduce(
          (K, O) => Nt(K, m(O), S),
          t.query.value.expr
        )
      );
    }
    const b = f(
      () => a.value.some((S) => S.kind === "image" || S.height !== void 0)
    );
    function M(S) {
      S && (t.query.value.sort === S ? t.toggleDirection() : t.setSort(S));
    }
    const j = f(() => t.entity.value?.label ?? "The result set"), ne = f(() => new Set(t.sorts.value.map((S) => S.key))), V = (S) => S.sort !== void 0 && ne.value.has(S.sort), U = (S) => {
      if (V(S))
        return t.query.value.sort !== S.sort ? "none" : t.query.value.dir === "desc" ? "descending" : "ascending";
    };
    function J(S) {
      return [
        vn(S),
        S.muted ? "dc-table__muted" : "",
        S.mono ? "dc-mono" : "",
        Mt(S) ? "dc-truncate" : ""
      ].filter(Boolean).join(" ");
    }
    function q(S, K) {
      if (!(!Mt(S) || S.activate || S.click))
        return In(S, K.row);
    }
    const Y = I(null);
    function Z(S) {
      Y.value && (Y.value.scrollLeft = S.target.scrollLeft);
    }
    return (S, K) => $(a).length ? (u(), v("table", {
      key: 1,
      class: "dc-table",
      "data-dc-wrap": b.value ? "" : void 0,
      "data-dc-row-links": $(t).rowLinks?.value ? "" : void 0
    }, [
      w("thead", {
        ref_key: "head",
        ref: Y,
        "data-dc-stuck": ""
      }, [
        w("tr", null, [
          $(t).selectable.value ? (u(), v("th", xr, [
            G(ua)
          ])) : T("", !0),
          d.value ? (u(), v("th", Sr, [
            x.value.length ? (u(), N(Rt, {
              key: 0,
              standing: k.value,
              mixed: h.value,
              name: _.value,
              onSet: p
            }, null, 8, ["standing", "mixed", "name"])) : T("", !0)
          ])) : T("", !0),
          (u(!0), v(D, null, X($(a), (O, F) => (u(), v("th", {
            key: $(dn)(O, F),
            scope: "col",
            class: de($(vn)(O)),
            style: oe({ width: O.width }),
            "data-dc-align": $(fn)(O),
            "data-dc-hide": O.hideBelow,
            "aria-sort": U(O),
            title: r(O)
          }, [
            V(O) ? (u(), v("button", {
              key: 0,
              type: "button",
              class: "dc-table__sort",
              onClick: (ae) => M(O.sort)
            }, P(O.label), 9, Er)) : (u(), v(D, { key: 1 }, [
              re(P(O.label), 1)
            ], 64)),
            O.header ? (u(), v("span", Pr, [
              (u(), N(ct(O.header), {
                column: O,
                entity: $(t).entity.value
              }, null, 8, ["column", "entity"]))
            ])) : T("", !0)
          ], 14, Cr))), 128))
        ])
      ], 512),
      w("tbody", {
        "data-dc-scroll": "",
        onScroll: Z
      }, [
        (u(!0), v(D, null, X($(n), (O) => (u(), v("tr", {
          key: O.key,
          class: "dc-table__row",
          onClick: (F) => s(O.row, F)
        }, [
          $(t).selectable.value ? (u(), v("td", Tr, [
            G(Ce, {
              row: O.row,
              selected: O.selected,
              name: O.parts.identity
            }, null, 8, ["row", "selected", "name"])
          ])) : T("", !0),
          d.value ? (u(), v("td", Mr, [
            m(O) !== null ? (u(), N(Rt, {
              key: 0,
              standing: g(O),
              name: O.parts.identity,
              onSet: (F) => C(O, F)
            }, null, 8, ["standing", "name", "onSet"])) : T("", !0)
          ])) : T("", !0),
          (u(!0), v(D, null, X($(a), (F, ae) => (u(), v("td", {
            key: $(dn)(F, ae),
            class: de(J(F)),
            style: oe({ width: F.width }),
            "data-dc-align": $(fn)(F),
            "data-dc-hide": F.hideBelow,
            title: q(F, O)
          }, [
            o.value.get(O.key) ? (u(), N(fe, {
              key: 0,
              class: "dc-table__cell-link",
              href: o.value.get(O.key),
              tabindex: F === l.value ? void 0 : -1,
              "aria-hidden": F === l.value ? void 0 : "true",
              "aria-label": F === l.value ? O.parts.identity : void 0,
              onPress: (Te, L) => i(O.row, Te, L)
            }, null, 8, ["href", "tabindex", "aria-hidden", "aria-label", "onPress"])) : T("", !0),
            F === c.value ? (u(), v("span", Ar, [
              G(xn, {
                column: F,
                entry: O
              }, null, 8, ["column", "entry"]),
              G(Ue, { entry: O }, null, 8, ["entry"]),
              G(je, { entry: O }, null, 8, ["entry"])
            ])) : (u(), N(xn, {
              key: 2,
              column: F,
              entry: O
            }, null, 8, ["column", "entry"]))
          ], 14, Or))), 128))
        ], 8, Lr))), 128))
      ], 32)
    ], 8, $r)) : (u(), v("p", wr, [
      K[2] || (K[2] = w("span", { class: "dc-table__headline" }, "No columns declared", -1)),
      w("span", br, [
        re(P(j.value) + " has no ", 1),
        K[0] || (K[0] = w("code", null, "columns", -1)),
        K[1] || (K[1] = re(" in the schema, so there is no table to draw. ", -1))
      ])
    ]));
  }
}), ga = /* @__PURE__ */ W(Nr, [["__scopeId", "data-v-dfef732e"]]);
function Ir(e) {
  const t = ye([]), n = I(!1), a = ye(null);
  let s = 0;
  const o = (r, c, d, m, g) => ({
    entity: r,
    rows: e.limit.value > 0 ? c.rows.map((C, x) => fa(C, x, r, e.isPinned(C.id))) : [],
    total: c.total,
    count: d ? Tt(r) : Xe(c.total),
    pinned: Rr(m, c, g)
  }), l = () => {
    const r = ++s, c = e.query.value, d = e.schema.value, m = e.entities.value, g = e.limit.value, C = e.within?.value.trim() ?? "", x = Vt(c) && !C, y = C ? zt(C, c.expr) : c.expr, k = m.map((h) => ({
      entity: h,
      // Scope the query to this entity, keeping the expression and ordering.
      outcome: e.source.value.query({
        // Each card is the top few of its type, wherever the shell's own
        // result set has been paged to — so this asks for the first page.
        query: { ...c, entity: h.key, expr: y, page: 1 },
        schema: d,
        entity: h,
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
    if (k.every(({ outcome: h }) => !(h instanceof Promise))) {
      t.value = k.map(
        ({ entity: h, outcome: _ }) => o(h, _, x, d, y)
      ), a.value = null, n.value = !1;
      return;
    }
    n.value = !0, Promise.all(k.map(({ outcome: h }) => Promise.resolve(h))).then((h) => {
      r === s && (t.value = h.map(
        (_, p) => o(k[p].entity, _, x, d, y)
      ), a.value = null);
    }).catch((h) => {
      r === s && (a.value = h, t.value = []);
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
function Rr(e, t, n) {
  const a = t.rows[0];
  if (t.total !== 1 || t.rows.length !== 1 || !a)
    return !1;
  const s = n.trim();
  if (!s)
    return !1;
  const o = tt(e, a);
  return !!o && Ve(s, o) === s;
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
}, Ur = {
  key: 0,
  class: "dc-type__empty"
}, zr = { class: "dc-type__identity" }, Qr = { class: "dc-type__primary dc-truncate" }, Gr = { class: "dc-type__secondary dc-mono dc-truncate" }, Yr = { class: "dc-type__trailing dc-mono" }, Xr = { class: "dc-type__metric-value" }, Jr = { class: "dc-type__metric-label" }, Zr = {
  key: 0,
  class: "dc-type__date"
}, ei = ["onClick"], ti = /* @__PURE__ */ B({
  __name: "TypeCardsView",
  setup(e) {
    const t = te(), { previews: n, pending: a, error: s } = Ir({
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
    return (r, c) => (u(), v("div", {
      class: "dc-types",
      "data-dc-pending": $(a) ? "true" : "false",
      "data-dc-heads-only": l.value ? "true" : "false"
    }, [
      z(r.$slots, "before", {}, void 0, !0),
      $(s) ? (u(), v("p", qr, " Could not load results: " + P($(s) instanceof Error ? $(s).message : "the data source failed."), 1)) : !i.value.length && $(a) ? (u(), v("p", Fr, " Running query… ")) : i.value.length ? T("", !0) : (u(), v("p", Hr, P(o.value ? "Nothing matches this query" : "Nothing here yet"), 1)),
      (u(!0), v(D, null, X(i.value, (d) => (u(), v("section", {
        key: d.entity.key,
        class: "dc-type",
        "data-dc-empty": d.total ? "false" : "true"
      }, [
        G(fe, {
          class: "dc-type__head",
          href: $(t).entityHref(d.entity.key),
          onPress: (m) => $(t).setEntity(d.entity.key)
        }, {
          default: le(() => [
            w("span", Vr, P(d.entity.label), 1),
            w("span", Kr, P(d.count), 1),
            c[0] || (c[0] = w("span", {
              class: "dc-type__go",
              "aria-hidden": "true"
            }, "→", -1)),
            w("span", Wr, "Show only " + P(d.entity.label.toLowerCase()), 1),
            d.entity.description ? (u(), v("span", jr, P(d.entity.description), 1)) : T("", !0)
          ]),
          _: 2
        }, 1032, ["href", "onPress"]),
        d.total ? T("", !0) : (u(), v("p", Ur, P(o.value ? "No matches" : "Nothing here yet"), 1)),
        (u(!0), v(D, null, X(d.rows, (m) => (u(), v("div", {
          key: m.key,
          class: "dc-type__row"
        }, [
          G(fe, {
            class: "dc-type__open",
            href: $(t).pressHref(m.row),
            onPress: (g) => $(t).activate(m.row, g)
          }, {
            default: le(() => [
              w("span", zr, [
                w("span", Qr, P(m.parts.identity), 1),
                w("span", Gr, P(m.parts.reference), 1)
              ])
            ]),
            _: 2
          }, 1032, ["href", "onPress"]),
          w("span", Yr, [
            (u(!0), v(D, null, X(m.parts.metrics.slice(0, 1), (g) => (u(), N(We, {
              key: g.column.key ?? g.label,
              class: "dc-type__metric",
              entry: m,
              column: g.column
            }, {
              default: le(() => [
                w("span", Xr, P(g.text), 1),
                w("span", Jr, P(g.label), 1)
              ]),
              _: 2
            }, 1032, ["entry", "column"]))), 128)),
            m.parts.updated ? (u(), v("span", Zr, P(m.parts.updated), 1)) : T("", !0),
            G(tn, { entry: m }, null, 8, ["entry"]),
            G(Ue, { entry: m }, null, 8, ["entry"]),
            G(je, { entry: m }, null, 8, ["entry"])
          ])
        ]))), 128)),
        d.entity.create && !l.value ? (u(), v("button", {
          key: 1,
          type: "button",
          class: "dc-type__new",
          onClick: (m) => $(t).create(d.entity)
        }, [
          c[1] || (c[1] = w("span", {
            class: "dc-type__plus",
            "aria-hidden": "true"
          }, "+", -1)),
          re(" " + P(d.entity.create), 1)
        ], 8, ei)) : T("", !0)
      ], 8, Dr))), 128)),
      z(r.$slots, "after", {}, void 0, !0)
    ], 8, Br));
  }
}), ka = /* @__PURE__ */ W(ti, [["__scopeId", "data-v-9cb44b6c"]]), ni = ["data-dc-pending", "data-dc-more"], ai = {
  key: 0,
  class: "dc-results__state dc-results__state--loading",
  "aria-live": "polite"
}, si = {
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
}, ii = { class: "dc-results__detail" }, ci = /* @__PURE__ */ B({
  __name: "ResultsArea",
  props: {
    views: {},
    loading: { type: Boolean }
  },
  setup(e) {
    const t = e, n = te(), a = ot(), s = {
      list: Bt,
      cards: pa,
      grid: ha,
      images: ma,
      table: ga,
      links: ya,
      preview: _a
    }, o = f(() => Kt(n.query.value, t.views)), l = f(() => Dt(n.query.value.view, t.views)), i = f(() => s[l.value] ?? Bt), r = f(() => n.rows.value.length > 0), c = f(() => n.error.value !== null), d = I(null);
    function m(_) {
      return _.querySelector("[data-dc-scroll]") ?? _;
    }
    se(
      // The page on screen, which is the draft's own while one is being typed.
      () => n.liveQuery.value.page,
      () => {
        d.value && (m(d.value).scrollTop = 0);
      }
    );
    const g = I(""), C = I({ x: 0, y: 0 }), x = I(0);
    function y() {
      const _ = d.value;
      if (!_) {
        g.value = "";
        return;
      }
      const p = m(_), b = {
        top: p.scrollTop > 1,
        right: p.scrollWidth - p.clientWidth - p.scrollLeft > 1,
        bottom: p.scrollHeight - p.clientHeight - p.scrollTop > 1,
        left: p.scrollLeft > 1
      };
      g.value = Object.entries(b).filter(([, M]) => M).map(([M]) => M).join(" "), C.value = {
        x: p.offsetHeight - p.clientHeight,
        y: p.offsetWidth - p.clientWidth
      }, x.value = _.querySelector("[data-dc-stuck]")?.offsetHeight ?? 0;
    }
    let k = null, h = null;
    return se(
      d,
      (_, p) => {
        if (p?.removeEventListener("scroll", y, { capture: !0 }), k?.disconnect(), h?.disconnect(), k = null, h = null, y(), !_ || (_.addEventListener("scroll", y, { passive: !0, capture: !0 }), typeof ResizeObserver > "u")) return;
        const b = new ResizeObserver(y), M = typeof MutationObserver > "u" ? null : new MutationObserver(() => {
          j(), y();
        }), j = () => {
          b.disconnect(), M?.disconnect();
          for (const ne of /* @__PURE__ */ new Set([_, m(_)])) {
            b.observe(ne);
            for (const V of ne.children) b.observe(V);
            M?.observe(ne, { childList: !0 });
          }
        };
        j(), k = b, h = M;
      },
      { flush: "post" }
    ), _e(() => {
      d.value?.removeEventListener("scroll", y, { capture: !0 }), k?.disconnect(), h?.disconnect();
    }), (_, p) => (u(), v("div", {
      ref_key: "scroller",
      ref: d,
      class: "dc-results",
      "data-dc-pending": $(n).pending.value ? "true" : "false",
      "data-dc-more": g.value,
      style: oe({
        "--dc-results-gutter-x": `${C.value.x}px`,
        "--dc-results-gutter-y": `${C.value.y}px`,
        "--dc-results-stuck": `${x.value}px`
      })
    }, [
      e.loading ? (u(), v("p", ai, [...p[1] || (p[1] = [
        w("span", { class: "dc-results__detail" }, "Loading…", -1)
      ])])) : o.value ? (u(), N(ka, { key: 1 }, Pt({ _: 2 }, [
        a["cards-before"] ? {
          name: "before",
          fn: le(() => [
            z(_.$slots, "cards-before", {}, void 0, !0)
          ]),
          key: "0"
        } : void 0,
        a["cards-after"] ? {
          name: "after",
          fn: le(() => [
            z(_.$slots, "cards-after", {}, void 0, !0)
          ]),
          key: "1"
        } : void 0
      ]), 1024)) : c.value ? (u(), v("p", si, [
        p[2] || (p[2] = w("span", { class: "dc-results__headline" }, "Could not load results", -1)),
        w("span", oi, P($(n).error.value instanceof Error ? $(n).error.value.message : "The data source failed."), 1)
      ])) : !r.value && $(n).pending.value ? (u(), v("p", li, [...p[3] || (p[3] = [
        w("span", { class: "dc-results__detail" }, "Running query…", -1)
      ])])) : r.value ? (u(), N(ct(i.value), { key: 5 })) : (u(), v("div", ri, [
        p[4] || (p[4] = w("span", { class: "dc-results__headline" }, "Nothing matches this query", -1)),
        w("span", ii, P($(n).summary.value), 1),
        $(n).isPristine.value ? T("", !0) : (u(), v("button", {
          key: 0,
          type: "button",
          class: "dc-results__clear",
          onClick: p[0] || (p[0] = (b) => $(n).clearFilters())
        }, P($(n).isEverything.value ? "Clear filters" : "Search everything instead"), 1))
      ]))
    ], 12, ni));
  }
}), wa = /* @__PURE__ */ W(ci, [["__scopeId", "data-v-70293318"]]), ui = ["data-dc-theme"], di = { class: "dc-shell__head" }, fi = {
  key: 0,
  class: "dc-shell__page"
}, vi = /* @__PURE__ */ B({
  __name: "DataShell",
  props: /* @__PURE__ */ rn({
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
  emits: /* @__PURE__ */ rn(["activate", "create", "duplicate", "delete", "operate", "drill", "query-change", "toggle-pin"], ["update:pinned", "update:selected"]),
  setup(e, { expose: t, emit: n }) {
    const a = e, s = n, o = ln(e, "pinned"), l = ln(e, "selected"), i = ot(), r = qt(Ln, null), c = a.route || r ? null : qa(), d = a.route ?? r ?? c;
    _e(() => c?.dispose?.());
    const m = I(!!i.page);
    La(() => {
      m.value = !!i.page;
    });
    const g = Fa(d, {
      detached: () => m.value && a.pageQuery === "detached",
      path: () => a.listPath
    }), C = f(() => Os({ seed: a.schema.key })), x = f(() => a.source ?? C.value), y = Js({
      schema: () => a.schema,
      adapter: g,
      defaults: () => a.defaults,
      navigationMode: () => a.navigationMode,
      facetNavigationMode: () => a.facetNavigationMode
    }), k = f(() => a.within?.trim() ?? ""), h = to({
      query: y.query,
      entity: y.entity,
      schema: f(() => a.schema),
      setExpression: y.setExpression
    }), _ = Zs({
      source: x,
      query: h.live,
      schema: f(() => a.schema),
      entity: y.entity,
      limit: f(() => a.limit),
      within: k
    });
    se(y.query, (L) => s("query-change", L));
    const p = f(() => Hs(a.schema, [y.query.value.expr])), b = f(
      () => p.value.flatMap((L) => {
        const H = a.schema.entities.find((Q) => Q.key === L.entityKey);
        return H ? [{ ...L, entity: H }] : [];
      })
    );
    function M() {
      if (i.record) return b.value;
      const L = a.recordCards;
      return L ? b.value.filter((H) => L[H.entityKey]) : [];
    }
    const j = f(() => {
      const L = a.views;
      return typeof L != "function" ? L : L({ entity: y.entity.value, records: p.value });
    });
    se(
      [_.pageCount, _.pending, y.query, h.drafting, () => a.loading, m],
      () => {
        if (_.pending.value || h.drafting.value || a.loading || m.value) return;
        const L = _.pageCount.value;
        y.query.value.page > L && y.setPage(L, "replace");
      },
      // Immediately, since a pasted URL is past the end before anything changes;
      // and after the render, so the correction is a navigation the mounted shell
      // makes rather than one it makes on the way up. An async source is still
      // pending here and corrects itself when its count lands.
      { immediate: !0, flush: "post" }
    );
    const ne = f(() => new Set(o.value));
    function V(L) {
      const H = new Set(ne.value);
      H.has(L.id) ? H.delete(L.id) : H.add(L.id), o.value = [...H], s("toggle-pin", L);
    }
    const U = f(() => {
      if (a.selectable === !0) return !0;
      const L = y.entity.value;
      return !!(L?.duplicate || L?.delete || L?.operations?.length);
    }), J = f(() => new Set(l.value));
    function q(L) {
      const H = new Set(J.value);
      H.has(L.id) ? H.delete(L.id) : H.add(L.id), l.value = [...H];
    }
    function Y(L) {
      const H = new Set(J.value);
      for (const Q of _.rows.value)
        L ? H.add(Q.id) : H.delete(Q.id);
      l.value = [...H];
    }
    function Z() {
      l.value.length && (l.value = []);
    }
    const S = f(() => ({
      ids: [...l.value],
      rows: _.rows.value.filter((L) => J.value.has(L.id)),
      entity: y.entity.value
    }));
    se(() => y.query.value.entity, Z);
    function K(L, H, Q = {}) {
      const ze = xt(a.schema, y.query.value, L, Q);
      Q.exclude ? y.narrow(ze, H?.key ?? y.query.value.entity) : h.release(() => y.narrow(ze, H?.key ?? null, H ? void 0 : "cards")), s("drill", L, H, Q);
    }
    function O(L) {
      return a.rowPress === "narrow" && tt(a.schema, L) !== null;
    }
    function F(L) {
      return a.schema.entities.find((Q) => Q.key === L.entityKey)?.href?.(L) || null;
    }
    const ae = Ds({
      ...y,
      draft: h.text,
      liveQuery: h.live,
      drafting: h.drafting,
      commitDraft: h.commit,
      abandonDraft: h.abandon,
      /*
       * A page of what is on screen: the draft's, while one is live, which are
       * held beside it rather than in the URL — see `liveQuery`.
       */
      setPage: (L, H) => {
        h.drafting.value ? h.setPage(L) : y.setPage(L, H);
      },
      schema: f(() => a.schema),
      entities: f(() => a.schema.entities),
      rows: _.rows,
      total: _.total,
      limit: f(() => a.limit),
      offset: _.offset,
      pageCount: _.pageCount,
      pending: _.pending,
      counting: _.counting,
      error: _.error,
      source: x,
      previewsPerType: f(() => a.previewsPerType),
      within: k,
      pinnable: f(() => a.pinnable === !0),
      isPinned: (L) => ne.value.has(L.id),
      isPinnedId: (L) => ne.value.has(L),
      togglePin: V,
      selectable: U,
      selection: S,
      isSelected: (L) => J.value.has(L.id),
      toggleSelect: q,
      selectPage: Y,
      clearSelection: Z,
      narrowsOnPress: f(() => a.rowPress === "narrow"),
      rowLinks: f(() => a.rowLinks),
      /*
       * The one place a press is read, so every view gets the same answer without
       * knowing which of the two it is: they all call this.
       */
      activate: (L, H = {}) => {
        if (O(L)) {
          K(L, null, H);
          return;
        }
        const Q = F(L);
        if (Q) {
          window.open(Q, "_blank", "noopener");
          return;
        }
        s("activate", L);
      },
      pressHref: (L) => O(L) ? y.narrowHref(xt(a.schema, y.query.value, L), null, "cards") : F(L),
      recordHref: F,
      drillHref: (L, H) => tt(a.schema, L) ? y.narrowHref(
        xt(a.schema, y.query.value, L),
        H?.key ?? null,
        H ? void 0 : "cards"
      ) : null,
      create: (L) => s("create", L),
      duplicate: () => s("duplicate", S.value),
      delete: () => s("delete", S.value),
      operate: (L) => s("operate", L, S.value),
      drill: K
    });
    Ws({ theme: () => a.theme, accent: () => a.accent, tokens: () => a.tokens });
    const Te = f(() => {
      if (!(!a.accent && !a.tokens))
        return { ...a.tokens, ...a.accent ? { "--dc-accent": a.accent } : {} };
    });
    return t({
      query: y.query
    }), (L, H) => (u(), v("div", {
      class: "dc-shell",
      "data-dc-theme": e.theme,
      style: oe(Te.value)
    }, [
      w("div", di, [
        G(ca, {
          views: j.value,
          "pages-note": e.pagesNote,
          "hide-pages": e.loading || m.value
        }, Pt({ _: 2 }, [
          i.brand ? {
            name: "brand",
            fn: le((Q) => [
              z(L.$slots, "brand", Ta(Ma(Q)), void 0, !0)
            ]),
            key: "0"
          } : void 0,
          i.actions ? {
            name: "actions",
            fn: le(() => [
              z(L.$slots, "actions", {}, void 0, !0)
            ]),
            key: "1"
          } : void 0
        ]), 1032, ["views", "pages-note", "hide-pages"])
      ]),
      i.page ? (u(), v("div", fi, [
        z(L.$slots, "page", {
          query: $(ae).query.value
        }, void 0, !0)
      ])) : T("", !0),
      i.page ? T("", !0) : (u(), N(da, {
        key: 1,
        views: j.value,
        "type-chooser": e.typeChooser,
        "selection-placement": e.selectionPlacement
      }, null, 8, ["views", "type-chooser", "selection-placement"])),
      i.page ? T("", !0) : z(L.$slots, "results", {
        rows: $(ae).rows.value,
        total: $(ae).total.value,
        offset: $(ae).offset.value,
        pageCount: $(ae).pageCount.value,
        query: $(ae).liveQuery.value,
        pending: $(ae).pending.value,
        loading: e.loading
      }, () => [
        G(wa, {
          views: j.value,
          loading: e.loading
        }, Pt({ _: 2 }, [
          i["cards-before"] || M().length ? {
            name: "cards-before",
            fn: le(() => [
              (u(!0), v(D, null, X(M(), (Q) => (u(), v(D, {
                key: `${Q.entityKey}:${Q.id}`
              }, [
                i.record ? z(L.$slots, "record", {
                  id: Q.id,
                  entity: Q.entity
                }, void 0, !0, 0) : (u(), N(ct(e.recordCards?.[Q.entityKey]), {
                  key: 1,
                  id: Q.id
                }, null, 8, ["id"]))
              ], 64))), 128)),
              z(L.$slots, "cards-before", {}, void 0, !0)
            ]),
            key: "0"
          } : void 0,
          i["cards-after"] ? {
            name: "cards-after",
            fn: le(() => [
              z(L.$slots, "cards-after", {}, void 0, !0)
            ]),
            key: "1"
          } : void 0
        ]), 1032, ["views", "loading"])
      ], !0, 2)
    ], 12, ui));
  }
}), pi = /* @__PURE__ */ W(vi, [["__scopeId", "data-v-07767e0e"]]), hi = ["data-dc-muted", "data-dc-collapsed"], mi = ["data-dc-collapsible"], yi = ["aria-expanded", "aria-controls"], _i = { class: "dc-shell-card__sr" }, gi = {
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
}, Si = ["data-dc-flush"], Ci = /* @__PURE__ */ B({
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
    const n = e, a = t, s = I(n.defaultCollapsed === !0), o = f(() => n.span === "all" ? { gridColumn: "1 / -1" } : void 0), l = ot();
    function i(V) {
      return r(V?.() ?? []);
    }
    function r(V) {
      return V.some((U) => U.type === Oa ? !1 : U.type === Aa ? String(U.children ?? "").trim().length > 0 : U.type === D ? r(U.children ?? []) : !0);
    }
    const c = f(
      () => !!n.title || !!n.name || d.value || i(l.head)
    ), d = f(() => i(l.aside)), m = f(() => i(l.default)), g = f(() => i(l.foot)), C = f(
      () => !!n.name && (!!n.reference || i(l.reference))
    ), x = f(() => n.collapsible === !0 && c.value), y = f(() => x.value && (n.collapsed ?? s.value));
    function k() {
      const V = !y.value;
      s.value = V, a("update:collapsed", V);
    }
    const h = Ht() ?? "dc-shell-card", _ = `${h}-body`, p = `${h}-foot`, b = f(
      () => [m.value ? _ : "", g.value ? p : ""].filter(Boolean).join(" ") || void 0
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
    ].join(", "), j = I(null);
    function ne(V) {
      if (!x.value) return;
      const U = V.target?.closest(M);
      U && j.value?.contains(U) || typeof window < "u" && window.getSelection()?.toString() || k();
    }
    return (V, U) => (u(), v("section", {
      class: "dc-shell-card",
      style: oe(o.value),
      "data-dc-muted": e.muted ? "true" : "false",
      "data-dc-collapsed": y.value ? "true" : "false"
    }, [
      c.value ? (u(), v("header", {
        key: 0,
        ref_key: "head",
        ref: j,
        class: "dc-shell-card__head",
        "data-dc-collapsible": x.value ? "true" : "false",
        onClick: ne
      }, [
        x.value ? (u(), v("button", {
          key: 0,
          type: "button",
          class: "dc-shell-card__toggle",
          "aria-expanded": y.value ? "false" : "true",
          "aria-controls": b.value,
          onClick: k
        }, [
          U[0] || (U[0] = w("svg", {
            class: "dc-shell-card__chevron",
            viewBox: "0 0 10 10",
            "aria-hidden": "true"
          }, [
            w("path", { d: "M2 3.5 5 6.5 8 3.5" })
          ], -1)),
          w("span", _i, P(e.name || e.title || "Card"), 1)
        ], 8, yi)) : T("", !0),
        z(V.$slots, "head", {}, () => [
          e.name ? (u(), v("div", gi, [
            w("h2", ki, P(e.name), 1),
            C.value ? (u(), v("span", wi, [
              z(V.$slots, "reference", {}, () => [
                re(P(e.reference), 1)
              ], !0)
            ])) : T("", !0)
          ])) : (u(), v("h2", bi, P(e.title), 1)),
          e.count !== void 0 ? (u(), v("span", $i, P(e.count), 1)) : T("", !0)
        ], !0),
        d.value ? (u(), v("span", xi, [
          z(V.$slots, "aside", {}, void 0, !0)
        ])) : T("", !0)
      ], 8, mi)) : T("", !0),
      m.value ? Et((u(), v("div", {
        key: 1,
        id: _,
        class: "dc-shell-card__body",
        "data-dc-flush": e.flush ? "true" : "false"
      }, [
        z(V.$slots, "default", {}, void 0, !0)
      ], 8, Si)), [
        [cn, !y.value]
      ]) : T("", !0),
      g.value ? Et((u(), v("footer", {
        key: 2,
        id: p,
        class: "dc-shell-card__foot"
      }, [
        z(V.$slots, "foot", {}, void 0, !0)
      ], 512)), [
        [cn, !y.value]
      ]) : T("", !0)
    ], 12, hi));
  }
}), Oc = /* @__PURE__ */ W(Ci, [["__scopeId", "data-v-073304c8"]]), Ei = ["aria-label"], Pi = ["aria-checked", "data-dc-active", "tabindex", "onClick", "onKeydown"], Li = /* @__PURE__ */ B({
  __name: "SegmentedControl",
  props: {
    modelValue: {},
    options: {},
    label: {},
    mono: { type: Boolean }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const n = e, a = t, s = I([]);
    function o(l, i) {
      const r = n.options.length;
      let c = null;
      if (l.key === "ArrowRight" || l.key === "ArrowDown" ? c = (i + 1) % r : l.key === "ArrowLeft" || l.key === "ArrowUp" ? c = (i - 1 + r) % r : l.key === "Home" ? c = 0 : l.key === "End" && (c = r - 1), c === null) return;
      l.preventDefault();
      const d = n.options[c];
      d && (a("update:modelValue", d.key), s.value[c]?.focus());
    }
    return (l, i) => (u(), v("div", {
      class: "dc-segmented",
      role: "radiogroup",
      "aria-label": e.label
    }, [
      (u(!0), v(D, null, X(e.options, (r, c) => (u(), v("button", {
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
        onKeydown: (d) => o(d, c)
      }, P(r.label), 43, Pi))), 128))
    ], 8, Ei));
  }
}), Ti = /* @__PURE__ */ W(Li, [["__scopeId", "data-v-63fb5482"]]), Mi = { class: "dc-fact__label" }, Oi = ["title"], Ai = /* @__PURE__ */ B({
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
      if (s == null || s === "") return [me];
      if (Array.isArray(s)) {
        const o = s.filter((l) => l != null && l !== "");
        return o.length ? o.map(String) : [me];
      }
      return [String(s)];
    }), a = f(() => t.wide ? { gridColumn: "1 / -1" } : void 0);
    return (s, o) => (u(), v("div", {
      class: "dc-fact",
      style: oe(a.value)
    }, [
      w("dt", Mi, [
        z(s.$slots, "label", {}, () => [
          re(P(e.label), 1)
        ], !0)
      ]),
      w("dd", {
        class: "dc-fact__value dc-mono",
        title: e.title
      }, [
        z(s.$slots, "default", {}, () => [
          n.value.length === 1 ? (u(), v(D, { key: 0 }, [
            re(P(n.value[0]), 1)
          ], 64)) : (u(!0), v(D, { key: 1 }, X(n.value, (l, i) => (u(), v("span", {
            key: i,
            class: "dc-fact__line"
          }, P(l), 1))), 128))
        ], !0)
      ], 8, Oi)
    ], 4));
  }
}), Ni = /* @__PURE__ */ W(Ai, [["__scopeId", "data-v-1f6d25e6"]]), Ii = /* @__PURE__ */ B({
  __name: "ShellFacts",
  props: {
    items: { default: () => [] },
    min: { default: "200px" }
  },
  setup(e) {
    const t = e, n = f(() => ({ "--dc-facts-min": t.min }));
    return (a, s) => (u(), v("dl", {
      class: "dc-facts",
      style: oe(n.value)
    }, [
      (u(!0), v(D, null, X(e.items, (o, l) => (u(), N(Ni, {
        key: `${l}:${o.label}`,
        label: o.label,
        value: o.value,
        title: o.title,
        wide: o.wide
      }, null, 8, ["label", "value", "title", "wide"]))), 128)),
      z(a.$slots, "default", {}, void 0, !0)
    ], 4));
  }
}), Ac = /* @__PURE__ */ W(Ii, [["__scopeId", "data-v-17455afa"]]), Ri = { class: "dc-counts" }, Bi = ["data-dc-tone"], qi = {
  key: 0,
  class: "dc-counts__empty"
}, Fi = /* @__PURE__ */ B({
  __name: "StatusCounts",
  props: {
    counts: {},
    empty: { default: me }
  },
  setup(e) {
    const t = e, n = f(() => t.counts.filter((a) => a.count > 0));
    return (a, s) => (u(), v("span", Ri, [
      (u(!0), v(D, null, X(n.value, (o) => (u(), v("span", {
        key: o.label,
        class: "dc-counts__count",
        "data-dc-tone": o.tone ?? "neutral"
      }, P(o.count) + " " + P(o.label), 9, Bi))), 128)),
      n.value.length === 0 ? (u(), v("span", qi, P(e.empty), 1)) : T("", !0)
    ]));
  }
}), Nc = /* @__PURE__ */ W(Fi, [["__scopeId", "data-v-5553a9e2"]]), Hi = ["data-dc-copied", "title", "aria-label"], Di = {
  key: 0,
  class: "dc-copy__mark",
  viewBox: "0 0 16 16",
  "aria-hidden": "true"
}, Vi = {
  key: 1,
  class: "dc-copy__mark",
  viewBox: "0 0 16 16",
  "aria-hidden": "true"
}, Ki = 1500, Wi = /* @__PURE__ */ B({
  __name: "CopyButton",
  props: {
    text: {},
    label: { default: "Copy to clipboard" }
  },
  emits: ["copied", "error"],
  setup(e, { emit: t }) {
    const n = e, a = t, s = I(!1);
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
      }, Ki), a("copied", i);
    }
    return _e(() => clearTimeout(o)), (i, r) => (u(), v("button", {
      type: "button",
      class: "dc-copy",
      "data-dc-copied": s.value ? "true" : "false",
      title: s.value ? "Copied" : e.label,
      "aria-label": e.label,
      onClick: l
    }, [
      s.value ? (u(), v("svg", Vi, [...r[1] || (r[1] = [
        w("path", { d: "M3 8.5l3.2 3L13 4.5" }, null, -1)
      ])])) : (u(), v("svg", Di, [...r[0] || (r[0] = [
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
}), ji = /* @__PURE__ */ W(Wi, [["__scopeId", "data-v-f4249d7f"]]), Ui = ["data-dc-copy", "data-dc-wrap", "data-dc-tone"], zi = /* @__PURE__ */ B({
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
    const n = e, a = t, s = I(null), o = f(() => n.maxHeight === void 0 ? void 0 : { maxHeight: typeof n.maxHeight == "number" ? `${n.maxHeight}px` : n.maxHeight });
    function l() {
      return n.code ?? s.value?.textContent ?? "";
    }
    return (i, r) => (u(), v("div", {
      class: "dc-code",
      "data-dc-copy": e.copy ? "true" : "false",
      "data-dc-wrap": e.wrap ? "true" : "false",
      "data-dc-tone": e.tone
    }, [
      w("pre", {
        ref_key: "pre",
        ref: s,
        class: "dc-code__text dc-mono",
        style: oe(o.value)
      }, [
        z(i.$slots, "default", {}, () => [
          re(P(e.code), 1)
        ], !0)
      ], 4),
      e.copy ? (u(), N(ji, {
        key: 0,
        class: "dc-code__copy",
        text: l,
        label: e.copyLabel,
        onCopied: r[0] || (r[0] = (c) => a("copied", c)),
        onError: r[1] || (r[1] = (c) => a("error", c))
      }, null, 8, ["label"])) : T("", !0)
    ], 8, Ui));
  }
}), Ic = /* @__PURE__ */ W(zi, [["__scopeId", "data-v-67b371dd"]]), Qi = 24, Gi = /* @__PURE__ */ B({
  __name: "ShellLog",
  props: {
    fetchChunk: {},
    stripAnsi: { type: Boolean },
    maxHeight: { default: "460px" }
  },
  setup(e, { expose: t }) {
    const n = e, a = I(""), s = f(() => n.stripAnsi ? za(a.value) : a.value), o = I(null);
    let l = 0, i = null;
    function r() {
      return i ??= c().finally(() => {
        i = null;
      }), i;
    }
    async function c() {
      const { chunk: g, offset: C } = await n.fetchChunk(l);
      if (l = C, !g) return;
      const x = o.value, y = !x || x.scrollTop + x.clientHeight >= x.scrollHeight - Qi;
      a.value += g, y && (await lt(), o.value && (o.value.scrollTop = o.value.scrollHeight));
    }
    function d() {
      a.value = "", l = 0;
    }
    const m = f(() => n.maxHeight === void 0 ? void 0 : { maxHeight: typeof n.maxHeight == "number" ? `${n.maxHeight}px` : n.maxHeight });
    return t({ poll: r, reset: d }), (g, C) => (u(), v("pre", {
      ref_key: "pane",
      ref: o,
      class: "dc-log dc-mono",
      style: oe(m.value)
    }, P(s.value), 5));
  }
}), Rc = /* @__PURE__ */ W(Gi, [["__scopeId", "data-v-2c86947e"]]), Yi = ["data-dc-theme"], Xi = ["aria-labelledby", "aria-label"], Ji = {
  key: 1,
  class: "dc-dialog__actions"
}, Oe = [], Zi = /* @__PURE__ */ B({
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
    const n = e, a = t, { theme: s, style: o, adopt: l } = Jt(n), i = `${Ht() ?? "dc-dialog"}-title`, r = I(null);
    function c() {
      a("close"), a("update:open", !1);
    }
    const d = Symbol("dc-dialog");
    function m(p) {
      p.key !== "Escape" || p.defaultPrevented || Oe[Oe.length - 1] === d && (p.preventDefault(), c());
    }
    let g = !1;
    function C(p) {
      g = p.target === p.currentTarget;
    }
    function x(p) {
      p.target === p.currentTarget && g && c(), g = !1;
    }
    const y = [
      "[autofocus]",
      'input:not([disabled]):not([type="hidden"])',
      "select:not([disabled])",
      "textarea:not([disabled])",
      "button:not([disabled])",
      "a[href]",
      '[tabindex]:not([tabindex="-1"])'
    ].join(", ");
    let k = null;
    async function h() {
      Oe.push(d), document.addEventListener("keydown", m), k = document.activeElement instanceof HTMLElement ? document.activeElement : null, l(), await lt(), (r.value?.querySelector("[autofocus]") ?? r.value?.querySelector(y) ?? r.value)?.focus();
    }
    function _() {
      const p = Oe.indexOf(d);
      p !== -1 && (Oe.splice(p, 1), document.removeEventListener("keydown", m), k?.isConnected && k.focus(), k = null);
    }
    return it(() => {
      n.open && h();
    }), se(
      () => n.open,
      (p) => {
        p ? h() : _();
      }
    ), _e(_), (p, b) => e.open ? (u(), N(rt, {
      key: 0,
      to: e.to
    }, [
      w("div", {
        class: "dc-shell dc-layer dc-dialog",
        "data-dc-theme": $(s),
        style: oe($(o)),
        onPointerdown: C,
        onClick: x
      }, [
        w("div", {
          ref_key: "panel",
          ref: r,
          class: de(["dc-dialog__panel", e.panelClass]),
          role: "dialog",
          "aria-modal": "true",
          tabindex: "-1",
          "aria-labelledby": e.title ? i : void 0,
          "aria-label": e.title ? void 0 : e.label
        }, [
          e.title ? (u(), v("h2", {
            key: 0,
            id: i,
            class: "dc-dialog__title"
          }, P(e.title), 1)) : T("", !0),
          w("div", {
            class: de(["dc-dialog__body", e.bodyClass])
          }, [
            z(p.$slots, "default", {}, void 0, !0)
          ], 2),
          p.$slots.actions ? (u(), v("div", Ji, [
            z(p.$slots, "actions", {}, void 0, !0)
          ])) : T("", !0)
        ], 10, Xi)
      ], 44, Yi)
    ], 8, ["to"])) : T("", !0);
  }
}), Bc = /* @__PURE__ */ W(Zi, [["__scopeId", "data-v-0cccf313"]]), ec = 4500, tc = 9e3, He = I([]);
let Sn = 0;
function ba(e) {
  He.value = He.value.filter((t) => t.id !== e);
}
function $a(e, t = "ok") {
  Sn += 1;
  const n = Sn;
  He.value = [...He.value, { id: n, message: e, kind: t }], setTimeout(() => ba(n), t === "err" ? tc : ec);
}
function nc(e) {
  $a(e instanceof Error ? e.message : String(e), "err");
}
function ac() {
  return { toasts: Na(He), toast: $a, toastError: nc, dismiss: ba };
}
const sc = ["data-dc-theme"], oc = ["data-dc-kind", "role"], lc = /* @__PURE__ */ B({
  __name: "ShellToasts",
  props: {
    to: { default: "body" },
    theme: { default: void 0 },
    accent: { default: void 0 },
    tokens: { default: void 0 }
  },
  setup(e) {
    const t = e, { toasts: n } = ac(), { theme: a, style: s, adopt: o } = Jt(t);
    return it(o), (l, i) => (u(), N(rt, { to: e.to }, [
      w("div", {
        class: "dc-shell dc-layer dc-toasts",
        "data-dc-theme": $(a),
        style: oe($(s)),
        "aria-live": "polite"
      }, [
        (u(!0), v(D, null, X($(n), (r) => (u(), v("div", {
          key: r.id,
          class: "dc-toast",
          "data-dc-kind": r.kind,
          role: r.kind === "err" ? "alert" : void 0
        }, P(r.message), 9, oc))), 128))
      ], 12, sc)
    ], 8, ["to"]));
  }
}), qc = /* @__PURE__ */ W(lc, [["__scopeId", "data-v-d970211c"]]), rc = 4, ic = 8, cc = 180;
function uc(e, t, n, a = {}) {
  const s = a.gap ?? rc, o = a.margin ?? ic, l = a.flipBelow ?? cc, i = a.side ?? "below", r = {
    below: n.height - e.bottom - s - o,
    above: e.top - s - o
  }, c = i === "below" ? "above" : "below", d = r[i] < l && r[c] > r[i] ? c : i, m = Math.min(a.maxHeight ?? 1 / 0, Math.max(0, r[d])), g = Math.max(0, n.width - o * 2), C = Math.min(e.width, g), x = Math.min(Math.max(t, C), g), y = a.align === "end" ? e.right - x : e.left, k = Math.max(o, Math.min(y, n.width - x - o));
  return d === "below" ? { side: d, left: k, top: e.bottom + s, maxHeight: m, minWidth: C, maxWidth: g } : { side: d, left: k, bottom: n.height - e.top + s, maxHeight: m, minWidth: C, maxWidth: g };
}
const dc = ["data-dc-theme", "data-dc-side"], ge = [], fc = /* @__PURE__ */ B({
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
    const n = e, a = t, { theme: s, style: o, adopt: l } = Jt(n), i = I(null), r = I(null), c = { root: () => i.value };
    function d() {
      const p = n.anchor;
      p && (r.value = uc(
        p.getBoundingClientRect(),
        i.value?.offsetWidth ?? 0,
        { width: window.innerWidth, height: window.innerHeight },
        { side: n.side, align: n.align, maxHeight: n.maxHeight }
      ));
    }
    const m = f(() => {
      const p = r.value, b = p ? {
        position: "fixed",
        left: `${p.left}px`,
        ...p.top !== void 0 ? { top: `${p.top}px` } : {},
        ...p.bottom !== void 0 ? { bottom: `${p.bottom}px` } : {},
        minWidth: `${p.minWidth}px`,
        maxWidth: `${p.maxWidth}px`,
        maxHeight: `${p.maxHeight}px`,
        overflowY: "auto"
      } : { position: "fixed", visibility: "hidden" };
      return { ...o.value, ...b };
    });
    function g() {
      a("update:open", !1), a("close");
    }
    function C(p) {
      return i.value?.contains(p) || n.anchor?.contains(p) ? !0 : ge.slice(ge.indexOf(c) + 1).some((M) => M.root()?.contains(p));
    }
    function x(p) {
      const b = p.target;
      b && !C(b) && g();
    }
    function y(p) {
      p.key !== "Escape" || p.defaultPrevented || ge[ge.length - 1] === c && (p.preventDefault(), i.value?.contains(document.activeElement) && n.anchor?.focus(), g());
    }
    let k = null;
    async function h() {
      ge.includes(c) || (ge.push(c), l(), r.value = null, await lt(), d(), window.addEventListener("pointerdown", x, !0), document.addEventListener("keydown", y, !0), window.addEventListener("resize", d), window.addEventListener("scroll", d, !0), typeof ResizeObserver < "u" && i.value && (k = new ResizeObserver(() => d()), k.observe(i.value)));
    }
    function _() {
      const p = ge.indexOf(c);
      p !== -1 && (ge.splice(p, 1), window.removeEventListener("pointerdown", x, !0), document.removeEventListener("keydown", y, !0), window.removeEventListener("resize", d), window.removeEventListener("scroll", d, !0), k?.disconnect(), k = null);
    }
    return it(() => {
      n.open && h();
    }), se(
      () => n.open,
      (p) => {
        p ? h() : _();
      }
    ), se(() => n.anchor, () => {
      n.open && d();
    }), _e(_), (p, b) => e.open ? (u(), N(rt, {
      key: 0,
      to: e.to
    }, [
      w("div", Ia({
        ref_key: "root",
        ref: i
      }, p.$attrs, {
        class: "dc-shell dc-layer dc-popover",
        "data-dc-theme": $(s),
        "data-dc-side": r.value?.side,
        style: m.value
      }), [
        z(p.$slots, "default", {}, void 0, !0)
      ], 16, dc)
    ], 8, ["to"])) : T("", !0);
  }
}), Fc = /* @__PURE__ */ W(fc, [["__scopeId", "data-v-73fbd235"]]);
function Hc(e, t) {
  const n = I(!1);
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
  return st(() => {
    s = !0, l();
  }, !0), { start: c, stop: l, polling: n };
}
function Dc(e, t = {}) {
  const n = t.key ?? ((o) => JSON.stringify(o)), a = ye();
  let s = null;
  return Ra(() => {
    const o = e(), l = n(o);
    l !== s && (s = l, a.value = o);
  }), a;
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
function Uc(e, t = {}) {
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
function zc(e, t = {}) {
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
function Jc(e, t, n, a = {}) {
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
function kt(e) {
  return typeof e == "number" ? e : typeof e == "string" && e.trim() !== "" ? Number(e) : Number.NaN;
}
function Zc(e) {
  const t = kt(e);
  return Number.isFinite(t) && t > 0 ? Ka(t) : me;
}
function eu(e) {
  const t = kt(e);
  return Number.isFinite(t) && t > 0 ? Wa(t) : me;
}
function tu(e) {
  const t = kt(e);
  return Number.isFinite(t) && t > 0 ? ja(t) : me;
}
function nu(e) {
  const t = kt(e);
  return Number.isFinite(t) ? Ua(t) : me;
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
  for (const a of e) {
    const s = a.fields[t];
    for (const o of Array.isArray(s) ? s : [s])
      typeof o == "string" && o && n.add(o);
  }
  return [...n].sort((a, s) => a.localeCompare(s));
}
function hc(e, t) {
  let n = 0;
  for (const a of e) {
    const s = a.fields[t];
    typeof s == "number" && s > n && (n = s);
  }
  return n;
}
function au(e, t, n, a = {}) {
  return {
    kind: "chips",
    key: t,
    label: n,
    options: pc(e, t),
    ...a.multiple ? { multiple: !0 } : {}
  };
}
function su(e, t, n) {
  return { kind: "range", key: t, label: n, min: 0, max: vc(hc(e, t)) };
}
function ou(e, t, n) {
  return { kind: "toggle", key: e, label: t, text: n };
}
function lu(e) {
  return e.filter((t) => t.kind === "chips" ? t.options.length > 1 : t.kind === "range" ? t.max > 0 : !0);
}
function ru(e = "", t = "/") {
  const n = I(ce(e)), a = I(t), s = [`${a.value}${n.value}`];
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
function Cn(e) {
  const t = e.indexOf("?");
  if (t === -1) return "";
  const n = e.slice(t), a = n.indexOf("#");
  return ce(a === -1 ? n : n.slice(0, a));
}
function iu(e) {
  const t = I(Cn(e.currentRoute.value.fullPath)), n = f(() => e.currentRoute.value.path), a = se(
    () => e.currentRoute.value.fullPath,
    (s) => {
      t.value = Cn(s);
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
function cu(e, t, n = "/") {
  return (a) => {
    const s = a.params[t], o = Array.isArray(s) ? s.join("/") : s ?? "", l = a.query[xe], i = typeof l == "string" ? l : "", r = `${e}="${o.replace(/"/g, "")}"`;
    return { path: n, query: { ...a.query, [xe]: Ve(i, r) } };
  };
}
function uu(e, t = "/") {
  return (n) => ({ path: t, query: { ...n.query, [Le]: e } });
}
function du(e) {
  const t = /* @__PURE__ */ new Map();
  for (const n of e) {
    const a = t.get(n.entityKey);
    a ? a.push(n) : t.set(n.entityKey, [n]);
  }
  return {
    query(n) {
      return Wn(n, (a) => t.get(a.key) ?? [], {
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
  ShellHeader: ca,
  RecordActions: da,
  ResultsArea: wa,
  SegmentedControl: Ti,
  StatusPill: Ke,
  ListView: Bt,
  CardsView: pa,
  GridView: ha,
  ImagesView: ma,
  TableView: ga,
  LinksView: ya,
  PreviewView: _a,
  TypeCardsView: ka
}, vu = {
  install(e, t = {}) {
    const n = t.prefix ?? "";
    for (const [a, s] of Object.entries(mc))
      e.component(`${n}${a}`, s);
    t.route && e.provide(Ln, t.route), (t.theme || t.accent || t.tokens) && Ks({ theme: t.theme, accent: t.accent, tokens: t.tokens }, e);
  }
};
export {
  wc as COLUMN_BREAKPOINTS,
  kc as COLUMN_ROLES,
  pa as CardsView,
  xn as ColumnCell,
  ji as CopyButton,
  Ga as DEFAULT_ENTITY_VIEW,
  Lt as DEFAULT_SORT,
  Qa as DEFAULT_VIEW,
  eo as DRAFT_DELAY,
  pi as DataShell,
  me as EMPTY_CELL,
  Un as ENTITY_ALL,
  at as ENTITY_TERM,
  Fe as EXPRESSION_TERM,
  ha as GridView,
  vu as HeaderContentLayoutPlugin,
  ma as ImagesView,
  ya as LinksView,
  Bt as ListView,
  Je as MOCK_TINTS,
  We as MetricDrill,
  je as OpenMark,
  Gt as PARAM_DIR,
  Le as PARAM_ENTITY,
  xe as PARAM_EXPR,
  pt as PARAM_PAGE,
  Qt as PARAM_SORT,
  vt as PARAM_VIEW,
  gc as PILL_TONES,
  cc as POPOVER_FLIP_BELOW,
  rc as POPOVER_GAP,
  ic as POPOVER_MARGIN,
  en as PinStar,
  _a as PreviewView,
  tn as QueryMark,
  Ae as RECORD_STATUSES,
  jt as RESULT_FIELDS,
  Ln as ROUTE_ADAPTER_KEY,
  da as RecordActions,
  wa as ResultsArea,
  na as SHELL_CONTEXT_KEY,
  nt as SHELL_THEME_KEY,
  Ue as ScopeMark,
  Ti as SegmentedControl,
  Ce as SelectTick,
  Oc as ShellCard,
  Ic as ShellCode,
  Bc as ShellDialog,
  Ni as ShellFact,
  Ac as ShellFacts,
  ca as ShellHeader,
  Rc as ShellLog,
  Fc as ShellPopover,
  qc as ShellToasts,
  Rt as StandingControl,
  Nc as StatusCounts,
  Ke as StatusPill,
  tc as TOAST_ERROR_MS,
  ec as TOAST_MS,
  ga as TableView,
  ka as TypeCardsView,
  Tn as VIEW_KINDS,
  Ya as VIEW_LABELS,
  Ve as addTerm,
  zt as andExpression,
  Zc as bytesCell,
  In as cellFull,
  Pe as cellText,
  Ye as cellTextOf,
  ue as cellValue,
  wt as changesResults,
  au as chipsFrom,
  fn as columnAlign,
  vn as columnClass,
  dn as columnKey,
  De as columnShortcut,
  Hn as columnShortcutOf,
  Mt as columnTruncates,
  ts as columnsFor,
  Bn as compactShortcuts,
  es as countPages,
  qa as createHistoryAdapter,
  ru as createMemoryAdapter,
  du as createMemoryDataSource,
  Os as createMockDataSource,
  iu as createVueRouterAdapter,
  Gc as dateColumn,
  ss as defaultCellText,
  Wt as defaultQuery,
  Ie as defaultViewFor,
  Fa as detachableAdapter,
  xt as drillExpression,
  eu as durationCell,
  tu as elapsedCell,
  Ja as emptyFacetValue,
  Rs as entityAddress,
  Yc as entityColumn,
  Tt as entityCount,
  uu as entityRedirect,
  Yn as excludingTerm,
  qe as expandShortcuts,
  Xc as facetColumn,
  aa as facetField,
  la as facetValue,
  vs as fieldHeading,
  Gn as fieldTerm,
  Re as findEntity,
  zn as findEntityByAddress,
  ke as findSort,
  Jc as flagColumn,
  Ne as fnv1a,
  On as focusEntity,
  Ka as formatBytes,
  Xe as formatCount,
  Da as formatDate,
  bc as formatDateTime,
  Wa as formatDuration,
  ja as formatElapsed,
  he as formatExpression,
  Me as formatInteger,
  Ha as formatMetric,
  Va as formatOrdinal,
  Ua as formatPercent,
  cs as formatRange,
  $e as formatTerm,
  Ms as generateRows,
  Qs as hasActiveFacets,
  Uc as identityColumn,
  Lc as idsExpression,
  $c as isEntityScoped,
  Za as isFacetActive,
  Vt as isPristineQuery,
  Be as isRangeTerm,
  Kt as isTypeCardsQuery,
  Mn as isViewKind,
  Sc as joinExpression,
  Xn as liftTerm,
  ys as matchesExpression,
  Qc as metricColumn,
  Tc as narrowPatch,
  _s as negateTerm,
  vc as niceMax,
  ce as normalizeSearch,
  ks as oppositeTerm,
  Vc as ordinalColumn,
  ie as parseExpression,
  Fs as parseQuery,
  nu as percentCell,
  jc as pictureColumn,
  uc as placePopover,
  Yo as presentParts,
  fa as presentRow,
  _t as pressOptions,
  Ds as provideShellContext,
  Ks as provideShellTheme,
  fu as queryAll,
  su as rangeFrom,
  dt as rangeOf,
  $s as readDraft,
  Pc as readExpression,
  cu as recordRedirect,
  Qn as recordTerm,
  Hs as recordsIn,
  zc as referenceColumn,
  At as refineExpression,
  Dt as resolveView,
  ve as roleColumn,
  Nn as roleColumns,
  as as rowKey,
  Ot as sameTerm,
  mt as scopeTerm,
  tt as scopeTermFor,
  ea as scopedEntity,
  Ec as searchFromQuery,
  $t as serializeQuery,
  Bs as sortAddress,
  ut as sortsFor,
  xc as splitExpression,
  Kc as stateColumn,
  za as stripAnsi,
  Xs as summarizeQuery,
  Zt as summaryTerms,
  Xt as termStanding,
  Wc as tintColumn,
  Cc as tintFor,
  ou as toggleFacet,
  gr as useColumns,
  to as useDraft,
  Eo as useEntityCounts,
  Ir as useEntityPreviews,
  Jt as useLayerTheme,
  Hc as usePoll,
  Se as usePresentedRows,
  Js as useQueryState,
  so as useRecordNames,
  Zs as useResults,
  te as useShellContext,
  Dc as useStableSchema,
  ac as useToasts,
  lu as usefulFacets,
  un as viewAcross,
  ra as withFacetValue,
  Nt as withStanding,
  Mc as withoutFacet,
  Zn as withoutOwnScope,
  gs as withoutTerm
};
