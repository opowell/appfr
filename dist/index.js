import { ref as R, computed as f, inject as qt, provide as Ft, getCurrentInstance as En, shallowRef as ye, toValue as be, watch as ee, onScopeDispose as at, getCurrentScope as Pn, defineComponent as q, useSlots as st, onBeforeUnmount as _e, openBlock as u, createElementBlock as p, createElementVNode as w, unref as $, renderSlot as U, toDisplayString as P, createCommentVNode as M, Fragment as H, renderList as Y, withModifiers as Ee, normalizeClass as de, withDirectives as Et, withKeys as ze, normalizeStyle as ae, vModelText as Pa, nextTick as ot, useId as Ht, createBlock as I, Teleport as lt, createVNode as G, createTextVNode as se, withCtx as ne, reactive as on, onMounted as rt, resolveDynamicComponent as it, createSlots as Pt, useModel as ln, onBeforeUpdate as La, normalizeProps as Ta, guardReactiveProps as Ma, mergeModels as rn, vShow as cn, Comment as Oa, Text as Aa, readonly as Na, mergeProps as Ia, watchEffect as Ra } from "vue";
import { MenuList as Ba } from "menu-bar";
const Ln = Symbol("dc.routeAdapter");
function ce(e) {
  if (!e) return "";
  const t = e.replace(/^[?]/, "");
  return t ? `?${t}` : "";
}
function qa() {
  const e = typeof window < "u", t = R(e ? ce(window.location.search) : ""), n = R(e ? window.location.pathname : "/"), a = () => {
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
const Tn = ["list", "cards", "grid", "images", "table", "links", "preview"], Oe = ["ok", "running", "queued", "review", "failed"], wc = [...Oe, "neutral", "accent"], bc = [
  "identity",
  "reference",
  "metric",
  "state",
  "updated",
  "image",
  "tint"
], $c = [480, 620, 760, 900, 1100];
function Ae(e) {
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
function Ye(e) {
  if (!Number.isFinite(e)) return "—";
  const t = Math.round(e), n = Math.abs(t);
  return n < 1e3 ? String(t) : n < 9950 ? `${(t / 1e3).toFixed(1)}k` : n < 999500 ? `${Math.round(t / 1e3)}k` : `${(t / 1e6).toFixed(1)}m`;
}
function Te(e) {
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
function xc(e, t) {
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
function Ne(e, t = {}) {
  const n = (s) => s && Mn(s) ? s : void 0;
  if (e === null) return n(t.view) ?? Qa;
  const a = t.landing === "entity" ? n(t.view) : void 0;
  return n(t.entityView) ?? a ?? Ga;
}
function un(e, t, n, a = {}) {
  return e === Ne(t, a) ? Ne(n, a) : e;
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
  return typeof e.count == "number" ? Ye(e.count) : e.count;
}
function Ie(e, t) {
  return t ? e.entities.find((n) => n.key === t) ?? null : null;
}
function On(e, t = {}) {
  const n = Ie(e, t.entity), a = e.entities[0];
  if (!n && !a) throw new Error(`Schema "${e.key}" declares no entities`);
  return n ?? a;
}
function An(e, t = null) {
  return e?.columns ?? t?.columns ?? [];
}
function ct(e, t = null) {
  if (e?.sorts?.length) return e.sorts;
  const n = /* @__PURE__ */ new Set(), a = [];
  for (const s of An(e, t))
    !s.sort || n.has(s.sort) || (n.add(s.sort), a.push({ key: s.sort, label: (s.label ?? s.sort).toLowerCase() }));
  return a;
}
const Xa = { key: Lt, label: Lt };
function ke(e, t, n = null) {
  const a = ct(e, n);
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
function Sc(e) {
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
    view: Ne(a?.key ?? null, t),
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
function Ge(e, t) {
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
function ut(e) {
  const t = is.exec(e.trim());
  if (!t || t[1] === void 0 && t[2] === void 0) return null;
  const n = t[1] === void 0 ? null : Number(t[1]), a = t[2] === void 0 ? null : Number(t[2]);
  return n !== null && a !== null && n > a ? { min: a, max: n } : { min: n, max: a };
}
function cs(e) {
  return `${e.min ?? ""}..${e.max ?? ""}`;
}
function Re(e) {
  return e.kind === "field" && (e.comparator === ":" || e.comparator === "=") && ut(e.value) !== null;
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
function oe(e) {
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
function He(e) {
  return (e.toLowerCase().match(/[\p{L}\p{N}]+/gu) ?? []).map((t) => t.charAt(0)).join("");
}
const hn = /^[a-z_][\w.-]*$/;
function dt(e) {
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
function Be(e, t, n) {
  return t ? qn(e, (a) => {
    const s = Fn(a, t, n);
    return s && dt(s);
  }) : e;
}
function Bn(e, t, n) {
  return t ? qn(e, (a) => {
    if (Ut(a, n)) return;
    const s = (t.columns ?? []).find((o) => dt(o) === a);
    return s && Hn(s, t, n);
  }) : e;
}
function vs(e, t, n) {
  if (!t || Ut(e, n)) return;
  const a = t.facets.find((s) => s.key.toLowerCase() === e);
  return a ? a.label : (t.columns ?? []).find((s) => dt(s) === e)?.label;
}
function qn(e, t) {
  let n = !1;
  const a = oe(e).map(
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
      (a) => a.label !== void 0 && He(a.label) === e
    );
}
function Hn(e, t, n) {
  if (!t || e.label === void 0 || !dt(e)) return;
  const a = He(e.label);
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
      const d = ve(r, c), h = d ? ue(d, t) : void 0;
      return typeof h == "string" && bt(h, e.value);
    });
  }
  const s = ds(e.field, t, n);
  if (s === void 0) return a?.has(e.field) ? !1 : null;
  const o = Re(e) ? ut(e.value) : null;
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
  return e.kind === "field" && !e.negated && (e.comparator === ":" || e.comparator === "=") && !Re(e);
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
function Cc(e) {
  const t = oe(e);
  if (t.length > 1) return { parts: [], text: e.trim() };
  const n = t[0] ?? [];
  return {
    parts: n.filter((a) => a.kind === "field"),
    text: n.filter((a) => a.kind === "text").map($e).join(" ")
  };
}
function Ec(e, t) {
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
    oe(e).map(
      (t) => t.filter(
        (n) => n.kind !== "text" || n.value !== "-" && !bs.test(n.value)
      )
    ).filter((t) => t.length > 0)
  );
}
function Vn(e, t, n) {
  const a = oe(e), s = oe(t);
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
  const i = oe(e.expr), r = n ? [n] : t.entities;
  let c = 0;
  const d = [];
  for (const k of r)
    for (const v of o(k))
      c += 1, ys(i, v, k, t) && d.push(v);
  const h = ke(n, e.sort, t), g = An(n, t).find((k) => k.sort === h.key), S = l.undatedLast ? d.filter((k) => !bn(k, g)) : d, b = l.undatedLast ? d.filter((k) => bn(k, g)) : [];
  S.sort(xs(g)), e.dir === "asc" && S.reverse();
  const y = b.length ? [...S, ...b] : S;
  return {
    // One page out of the middle. `total` stays the whole match, which is what
    // the shell counts pages with.
    rows: l.zeroIsAll && a <= 0 ? y.slice(s) : y.slice(s, s + a),
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
function Pc(e) {
  return Xe[Ae(e) % Xe.length];
}
function jn(e, t) {
  return `${e}_${1e4 + t * 7}`;
}
const Ss = 7, Cs = 3;
function Es(e, t, n, a) {
  const s = (t * Ss + Ae(n)) % a, o = [];
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
      return Oe[n % Oe.length];
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
      return Oe[n % Oe.length];
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
    const c = o[r % o.length], d = Math.floor(r / o.length), h = Ae(`${a}:${e.key}:${c[0]}:${r}`), g = jn(e.key, r), S = new Date(s.getTime() - h % 900 * 36e5).toISOString(), b = {};
    for (const y of e.columns ?? []) {
      const k = y.field ?? y.key;
      if (!k || y.value) continue;
      const v = Ts(y, {
        hash: Ae(`${h}:${k}`),
        sample: c,
        revision: d,
        updatedAt: S
      });
      v !== void 0 && (b[k] = v);
    }
    for (const y of e.facets)
      b[y.key] = Ps(y, Ae(`${h}:${y.key}`));
    for (const [y, k] of l)
      b[y] = k === e.key ? g : Es(k, r, y, n);
    i.push({ id: g, entityKey: e.key, entityLabel: e.label, fields: b });
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
const Le = "e", ft = "v", Qt = "s", Gt = "d", xe = "q", vt = "p", Un = "*", As = [
  Le,
  ft,
  Qt,
  Gt,
  xe,
  vt
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
function Je(e) {
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
function pt(e, t) {
  if (!(!t || e.some((n) => n.key === t)))
    return e.find((n) => He(n.label) === t);
}
function Rs(e, t) {
  const n = He(e.label);
  return pt(t.entities, n)?.key === e.key ? n : e.key;
}
function zn(e, t) {
  return t ? Ie(e, t) ?? pt(e.entities, t) ?? null : null;
}
function Bs(e, t) {
  const n = He(e.label);
  return pt(t, n)?.key === e.key ? n : e.key;
}
function qs(e, t) {
  return t.some((n) => n.key === e) ? e : pt(t, e)?.key ?? e;
}
function Fs(e, t, n = {}) {
  const a = Wt(t, n), s = new Map(Yt(e)), o = s.get(Le), l = o === void 0 ? a.entity : pe(o), i = l === Un ? null : zn(t, l), r = s.get(ft), c = r && Mn(pe(r)) ? pe(r) : Ne(i?.key ?? null, n), d = s.get(Qt), h = ke(
    i,
    d ? qs(pe(d), ct(i, t)) : n.sort,
    t
  ), g = s.get(Gt), S = g ? pe(g) === "asc" ? "asc" : "desc" : a.dir, b = s.get(xe), y = s.get(vt), k = y === void 0 ? 1 : Number(pe(y)), v = Number.isFinite(k) ? Math.max(1, Math.floor(k)) : 1;
  return {
    entity: i?.key ?? null,
    view: c,
    sort: h.key,
    dir: S,
    expr: b === void 0 ? "" : Be(pe(b), i, t),
    page: v
  };
}
function $t(e, t, n = {}, a = "") {
  const s = Wt(t, n), o = Ie(t, e.entity), l = Yt(a).filter(([h]) => !Is(h)), i = [], r = (h, g) => i.push([h, Je(g)]), c = o?.key ?? null;
  if (c !== s.entity && r(Le, o ? Rs(o, t) : Un), e.view !== Ne(c, n) && r(ft, e.view), e.sort !== s.sort) {
    const h = ct(o, t), g = h.find((S) => S.key === e.sort);
    r(Qt, g ? Bs(g, h) : e.sort);
  }
  e.dir !== s.dir && r(Gt, e.dir), e.expr.trim() !== "" && r(xe, Bn(e.expr, o, t)), e.page > 1 && r(vt, String(e.page));
  const d = [
    ...l.map(([h, g]) => [Je(h), g]),
    ...i
  ];
  return d.length ? `?${d.map(([h, g]) => g === "" ? h : `${h}=${g}`).join("&")}` : "";
}
function Lc(e) {
  const t = [];
  for (const [n, a] of Object.entries(e))
    for (const s of Array.isArray(a) ? a : [a]) {
      if (typeof s != "string") continue;
      const o = Je(n);
      t.push(s === "" ? o : `${o}=${Je(s)}`);
    }
  return t.length ? `?${t.join("&")}` : "";
}
function Tc(e, t) {
  const n = new Map(Yt(e)), a = n.get(xe), s = a === void 0 ? "" : pe(a);
  if (!t) return s;
  const o = n.get(Le);
  return Be(
    s,
    o === void 0 ? null : zn(t, pe(o)),
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
function Mc(e, t) {
  const n = typeof e == "string" ? e : e?.scope;
  if (!n) return null;
  const a = t.filter((s) => s.replace(/"/g, "") !== "").map((s) => Gn(n, s));
  return a.length ? a.join(" ") : null;
}
function mt(e, t) {
  if (e.kind !== "field" || t.kind !== "field") return Ot(e, t);
  const n = (a) => a.comparator === ":" || a.comparator === "=";
  return Ot(e, { ...t, comparator: n(e) && n(t) ? e.comparator : t.comparator });
}
function Ze(e, t) {
  return mt(e, _s(t));
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
  const [a] = oe(t).flat();
  if (!a) return n;
  const s = oe(n);
  return s.some((i) => i.some((r) => mt(r, a))) ? n : s.some((i) => i.some((r) => Ze(r, a))) ? he(
    s.map(
      (i) => i.map((r) => Ze(r, a) ? a : r)
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
  const [n] = oe(t).flat();
  if (!n) return null;
  const a = oe(e).flat();
  return a.some((s) => mt(s, n)) ? n.negated ? "out" : "in" : a.some((s) => Ze(s, n)) ? n.negated ? "in" : "out" : null;
}
function Xn(e, t) {
  if (!t || !e.trim()) return e;
  const [n] = oe(t).flat();
  if (!n) return e;
  const a = oe(e), s = a.map(
    (o) => o.filter((l) => !mt(l, n) && !Ze(l, n))
  );
  return s.every((o, l) => o.length === a[l]?.length) ? e : he(s);
}
function Nt(e, t, n) {
  return t ? n === null ? Xn(e, t) : De(e, n === "out" ? Yn(t) : t) : e;
}
function Jn(e) {
  return e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0;
}
function yt(e) {
  return e.altKey ? { exclude: !0 } : {};
}
function xt(e, t, n, a = {}) {
  const s = et(e, n);
  return De(t.expr, a.exclude ? Yn(s) : s);
}
function Zn(e, t) {
  const n = e?.scope?.toLowerCase();
  if (!n || e?.keepsScope || !t.trim()) return t;
  const a = oe(t), s = a.map(
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
    for (const o of oe(s).flat()) {
      if (o.kind !== "field" || o.negated) continue;
      const l = ta(e, o.field, o.value);
      if (!l) continue;
      const i = `${l.entity.key}:${l.id.toLowerCase()}`;
      a.has(i) || (a.add(i), n.push({ entityKey: l.entity.key, id: l.id }));
    }
  return n;
}
function Oc(e, t, n = "cards") {
  return {
    // An expression with nothing in it is no parameter, as the shell writes it.
    [xe]: De(e, t) || void 0,
    [Le]: void 0,
    [ft]: n,
    [vt]: void 0
  };
}
const na = Symbol("dc.shellContext");
function Ds(e) {
  const t = e.liveQuery ? e : Vs(e);
  return Ft(na, t), t;
}
function Vs(e) {
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
function Z() {
  const e = qt(na, null);
  if (!e)
    throw new Error(
      "[appfr] No shell context found. Render this component inside <DataShell>."
    );
  return e;
}
const tt = Symbol("dc-shell-theme");
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
  t ? t.provide(tt, It(e)) : Ft(tt, It(e));
}
function Ws(e) {
  const t = En();
  Ft(tt, {
    ...It(e),
    element: () => t?.proxy?.$el ?? null
  });
}
function Jt(e) {
  const t = En(), n = qt(tt, null), a = ye(null);
  function s() {
    const r = t?.proxy?.$el, d = (r instanceof Element ? r : r?.parentElement)?.closest(".dc-shell");
    if (!d) {
      a.value = null;
      return;
    }
    const h = {};
    for (const g of Array.from(d.style))
      g.startsWith("--") && (h[g] = d.style.getPropertyValue(g));
    a.value = { shell: d, theme: d.dataset.dcTheme, tokens: h };
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
      return Re(e) || js.has(e.comparator);
    case "chips":
      return n && !Re(e) && oa(t.options, e.value) !== void 0;
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
  const n = (oe(e)[0] ?? []).filter((a) => sa(a, t));
  switch (t.kind) {
    case "range": {
      let a = null, s = null;
      for (const o of n) {
        const l = ut(o.value), i = Number(o.value);
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
  const a = zs(t, n), s = oe(e), o = (s.length ? s : [[]]).map((l) => [
    ...l.filter((i) => !sa(i, t)),
    ...a
  ]);
  return he(o);
}
function Ac(e, t) {
  return ra(e, t, Ja(t));
}
function Qs(e, t) {
  return (t?.facets ?? []).some((n) => Za(la(e, n)));
}
const nt = "entity", qe = "expr", Gs = { ">=": "≥", "<=": "≤", ">": ">", "<": "<" };
function Ys(e, t, n) {
  if (e.kind !== "field") return $e(e);
  const a = vs(e.field, t, n);
  if (a === void 0) return $e(e);
  const s = e.negated ? "-" : "", o = Re(e) ? ut(e.value) : null;
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
    id: nt,
    label: `entity:${t.key}`,
    facetKey: nt
  }), oe(e.expr).forEach((s, o) => {
    s.forEach((l, i) => {
      a.push({
        id: `${qe}:${o}:${i}`,
        label: Ys(l, t, n),
        address: Bn($e(l), t, n),
        facetKey: qe,
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
  const a = Zt(e, t).filter((o) => o.facetKey !== qe).map((o) => o.label), s = e.expr.trim();
  return s && a.push(`"${s}"`), a.join(" · ");
}
function Js(e) {
  const { adapter: t } = e, n = f(() => be(e.schema)), a = f(() => be(e.defaults) ?? {}), s = f(() => Fs(t.search.value, n.value, a.value)), o = f(() => Ie(n.value, s.value.entity)), l = f(() => o.value ?? On(n.value, a.value)), i = f(() => ct(o.value, n.value)), r = f(() => ke(o.value, s.value.sort, n.value)), c = (v, _) => {
    const m = $t(v, n.value, a.value, t.search.value);
    return m === t.search.value ? !1 : (_ === "push" ? t.push(m) : t.replace(m), !0);
  }, d = () => be(e.navigationMode) ?? "push", h = () => be(e.facetNavigationMode) ?? "replace", g = (v, _) => {
    const m = v.page ?? (wt(v) ? 1 : s.value.page);
    return c({ ...s.value, ...v, page: m }, _);
  }, S = (v) => {
    const _ = v.page ?? (wt(v) ? 1 : s.value.page), m = $t({ ...s.value, ...v, page: _ }, n.value, a.value, t.search.value);
    return t.href ? t.href(m) : `${t.path.value}${m}`;
  }, b = (v, _) => {
    const m = o.value?.facets.find((O) => O.key === v);
    if (!m) return;
    const x = ra(s.value.expr, m, _(la(s.value.expr, m)));
    g({ expr: x }, h());
  }, y = (v) => {
    const _ = v === null ? null : Ie(n.value, v);
    return (_?.key ?? null) === s.value.entity ? {} : {
      entity: _?.key ?? null,
      view: un(s.value.view, s.value.entity, _?.key ?? null, a.value),
      sort: ke(_, s.value.sort, n.value).key
    };
  }, k = (v) => {
    const _ = y(v);
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
    entityHref: (v) => S(y(v)),
    clearEntity: () => k(null),
    setView(v) {
      g({ view: v }, d());
    },
    setSort(v) {
      g({ sort: ke(o.value, v, n.value).key }, d());
    },
    toggleDirection() {
      g({ dir: s.value.dir === "desc" ? "asc" : "desc" }, d());
    },
    setExpression(v) {
      return g({ expr: v }, d());
    },
    narrow(v, _, m) {
      return g({ expr: v, ...y(_), ...m ? { view: m } : {} }, d());
    },
    narrowHref(v, _, m) {
      return S({ expr: v, ...y(_), ...m ? { view: m } : {} });
    },
    setPage(v, _) {
      g({ page: Math.max(1, Math.floor(v)) }, _ ?? d());
    },
    setFacet(v, _) {
      b(v, () => _);
    },
    toggleChip(v, _) {
      b(v, (m) => m.kind !== "chips" ? m : { kind: "chips", selected: m.selected.includes(_) ? m.selected.filter((O) => O !== _) : [...m.selected, _] });
    },
    setRange(v, _, m) {
      b(v, (x) => x.kind === "range" ? { kind: "range", min: _, max: m } : x);
    },
    toggleFlag(v) {
      b(
        v,
        (_) => _.kind === "toggle" ? { kind: "toggle", on: !_.on } : _
      );
    },
    removeTerm(v) {
      if (v.facetKey === nt) {
        k(null);
        return;
      }
      if (v.facetKey === qe) {
        const _ = gs(oe(s.value.expr), v.group ?? 0, v.index ?? 0);
        g({ expr: he(_) }, d());
      }
    },
    clearFilters() {
      g({ ...y(null), expr: "" }, d());
    },
    reset() {
      c(Wt(n.value, a.value), d());
    },
    hrefFor(v) {
      const _ = { ...s.value, ...v };
      return "entity" in v && !("view" in v) && (_.view = un(s.value.view, s.value.entity, _.entity, a.value)), _.page = v.page ?? (wt(v) ? 1 : s.value.page), `${t.path.value}${$t(_, n.value, a.value, t.search.value)}`;
    }
  };
}
function Zs(e) {
  const t = ye([]), n = R(0), a = R(!1), s = R(!1), o = ye(null);
  let l = 0, i = null, r = null;
  const c = f(() => (e.query.value.page - 1) * e.limit.value), d = f(() => es(n.value, e.limit.value)), h = () => {
    const x = e.query.value, O = e.within?.value.trim(), j = Zn(e.entity.value, x.expr);
    return O ? { ...x, expr: zt(O, j) } : j === x.expr ? x : { ...x, expr: j };
  }, g = (x, O) => {
    t.value = x.rows, n.value = x.total, o.value = null, S(O);
  }, S = (x) => {
    i = { key: x, total: n.value }, s.value = !1;
  }, b = (x) => {
    o.value = x, t.value = [], n.value = 0, i = null, s.value = !1;
  }, y = (x, O, j, le) => {
    let K = !0;
    const W = () => x === l;
    let X = 0, V = !1;
    const C = (L) => {
      X = L, V = !0, le === void 0 && (n.value = L);
    }, N = () => {
      K && (K = !1, t.value = [], C(0)), o.value = null;
    };
    return {
      get open() {
        return W();
      },
      insert(L, z) {
        if (!W()) return;
        const ie = Array.isArray(L) ? L : [L];
        if (!ie.length) return;
        N();
        const re = [...t.value];
        re.splice(z ?? re.length, 0, ...ie), t.value = O > 0 ? re.slice(0, O) : re, C(X + ie.length);
      },
      set(L) {
        W() && (L.rows && (N(), t.value = O > 0 ? L.rows.slice(0, O) : L.rows, C(L.rows.length)), L.total !== void 0 && C(L.total));
      },
      close() {
        W() && (a.value = !1, V && (n.value = X), S(j));
      },
      fail(L) {
        W() && (b(L), a.value = !1);
      }
    };
  }, k = () => {
    const x = r;
    r = null, x?.();
  }, v = () => {
    const x = ++l;
    k();
    const O = _.value, j = i?.key === O ? i.total : void 0;
    s.value = j === void 0;
    const le = {
      query: h(),
      schema: e.schema.value,
      entity: e.entity.value,
      limit: e.limit.value,
      offset: c.value
    }, K = e.source.value;
    if (K.stream) {
      a.value = !0;
      try {
        r = K.stream(le, y(x, le.limit, O, j)) ?? null;
      } catch (X) {
        b(X), a.value = !1;
      }
      return;
    }
    let W;
    try {
      W = K.query(le);
    } catch (X) {
      b(X);
      return;
    }
    if (!(W instanceof Promise)) {
      g(W, O), a.value = !1;
      return;
    }
    a.value = !0, W.then((X) => {
      x === l && g(X, O);
    }).catch((X) => {
      x === l && b(X);
    }).finally(() => {
      x === l && (a.value = !1);
    });
  }, _ = f(() => {
    const x = h();
    return `${e.entity.value?.key ?? e.schema.value.entities[0]?.key ?? ""}|${JSON.stringify(jt.map((j) => x[j]))}`;
  }), m = f(() => `${_.value}|${e.query.value.page}`);
  return ee([e.source, m, e.limit], v, {
    immediate: !0
  }), at(() => {
    l++, k();
  }, !0), { rows: t, total: n, offset: c, pageCount: d, pending: a, counting: s, error: o, refresh: v };
}
const eo = 150;
function to(e) {
  const t = e.delay ?? eo, n = R(""), a = R("");
  let s = !1, o;
  const l = () => {
    clearTimeout(o), o = void 0;
  }, i = f(() => Be($s(a.value), e.entity.value, e.schema?.value)), r = f(() => i.value.trim() !== ""), c = f(
    () => JSON.stringify([i.value, ...jt.map((S) => e.query.value[S])])
  ), d = ye(null), h = f(() => {
    const S = e.query.value;
    if (!r.value) return S;
    const b = d.value?.of === c.value ? d.value.page : 1;
    return { ...S, expr: At(S.expr, i.value), page: b };
  });
  ee(n, (S) => {
    if (l(), !S.trim()) {
      s || (a.value = "");
      return;
    }
    s = !1, o = setTimeout(() => {
      o = void 0, a.value = n.value;
    }, t);
  }), ee(
    e.query,
    () => {
      s && (s = !1, a.value = "");
    },
    { flush: "sync" }
  );
  const g = (S) => {
    l(), s = !0, n.value = "", !S() && s && (s = !1, a.value = "");
  };
  return Pn() && at(l), {
    text: n,
    live: h,
    drafting: r,
    setPage(S) {
      d.value = { of: c.value, page: Math.max(1, Math.floor(S)) };
    },
    commit() {
      const S = n.value.trim();
      if (!S) return;
      const b = At(
        e.query.value.expr,
        Be(S, e.entity.value, e.schema?.value)
      );
      a.value = S, g(() => e.setExpression(b));
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
    if (i.facetKey !== qe) return null;
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
    const c = Ge(ve(i.columns ?? [], "identity"), r);
    return c === me || ia(c, r.id) ? "" : c;
  }, l = () => {
    const i = /* @__PURE__ */ new Map();
    for (const d of e.terms.value) {
      const h = a(d);
      h && !t.value.has(h.key) && !n.has(h.key) && i.set(h.key, h);
    }
    if (!i.size) return;
    const r = [...i.values()].map((d) => ({
      reference: d,
      outcome: s(d)
    })), c = (d) => {
      const h = new Map(t.value);
      d.forEach((g, S) => {
        const { reference: b } = r[S], y = ao(g.rows, b.id);
        h.set(b.key, y ? o(b.entity, y) : "");
      }), t.value = h;
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
}, Co = /* @__PURE__ */ q({
  __name: "ShellHeader",
  props: {
    views: {},
    pagesNote: {},
    hidePages: { type: Boolean }
  },
  setup(e) {
    const t = e, n = st(), a = Z(), s = f(() => a.schema.value), o = f(() => {
      const E = a.within.value.trim();
      return E ? Zt({ ...a.query.value, expr: E }, null) : [];
    }), l = f(() => {
      const E = a.entity.value, A = E?.keepsScope ? void 0 : E?.scope?.toLowerCase();
      return a.terms.value.filter((B) => B.facetKey !== nt).map((B, J, an) => {
        const sn = an[J - 1];
        return {
          term: B,
          or: sn?.group !== void 0 && B.group !== void 0 && B.group !== sn.group,
          idle: !!A && B.field?.toLowerCase() === A
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
    function h(E) {
      const A = d(E.term), B = E.idle ? `Not applied to ${a.entity.value?.label} — remove ${A}` : `Remove ${A}`, J = E.term.address;
      return J && J !== A ? `${B}
Written ${J} in the address and the search box` : B;
    }
    const g = R(null);
    function S(E) {
      g.value = E instanceof HTMLInputElement ? E : null;
    }
    function b() {
      a.abandonDraft(), g.value?.blur();
    }
    function y() {
      k.value = null, a.commitDraft();
    }
    const k = R(null), v = f(() => Math.min(k.value ?? 1 / 0, l.value.length)), _ = f(() => [
      { key: "before", entries: l.value.slice(0, v.value) },
      { key: "after", entries: l.value.slice(v.value) }
    ]), m = f(() => v.value < l.value.length);
    ee(l, (E) => {
      k.value !== null && k.value >= E.length && (k.value = null);
    });
    function x(E, A) {
      k.value = E >= l.value.length ? null : Math.max(0, E), ot(() => {
        const B = g.value;
        if (!B) return;
        const J = A === "start" ? 0 : B.value.length;
        B.setSelectionRange(J, J), B.scrollIntoView({ block: "nearest", inline: "nearest" }), ie();
      });
    }
    function O(E) {
      const A = g.value;
      return !A || A.selectionStart !== A.selectionEnd ? !1 : A.selectionStart === (E === "start" ? 0 : A.value.length);
    }
    function j(E) {
      v.value === 0 || !O("start") || (E.preventDefault(), x(E.key === "Home" ? 0 : v.value - 1, "start"));
    }
    function le(E) {
      !m.value || !O("end") || (E.preventDefault(), x(E.key === "End" ? l.value.length : v.value + 1, "end"));
    }
    function K(E) {
      v.value === 0 || !O("start") || (E.preventDefault(), V(l.value[v.value - 1].term, !0));
    }
    function W(E) {
      !m.value || !O("end") || (E.preventDefault(), V(l.value[v.value].term, !1));
    }
    function X(E) {
      E.isComposing || E.altKey || E.ctrlKey || E.metaKey || E.shiftKey || (E.key === "ArrowLeft" || E.key === "Home" ? j(E) : E.key === "ArrowRight" || E.key === "End" ? le(E) : E.key === "Backspace" ? K(E) : E.key === "Delete" && W(E));
    }
    function V(E, A) {
      A && k.value !== null && (k.value = Math.max(0, k.value - 1)), a.removeTerm(E);
    }
    function C(E) {
      E.target?.closest("button, input") || (E.preventDefault(), g.value?.focus(), x(l.value.length, "end"));
    }
    function N() {
      a.draft.value || (k.value = null);
    }
    const L = R(null), z = R("");
    function ie() {
      const E = L.value;
      if (!E) {
        z.value = "";
        return;
      }
      const A = E.scrollLeft > 1, B = E.scrollWidth - E.clientWidth - E.scrollLeft > 1;
      z.value = A && B ? "both" : A ? "start" : B ? "end" : "";
    }
    let re = null;
    ee(
      L,
      (E) => {
        re?.disconnect(), re = null, ie(), !(!E || typeof ResizeObserver > "u") && (re = new ResizeObserver(ie), re.observe(E));
      },
      { flush: "post" }
    ), ee([l, v], ie, { flush: "post" }), _e(() => re?.disconnect());
    const te = f(() => a.liveQuery.value.page), kt = f(
      () => !t.hidePages && (a.pageCount.value > 1 || !!t.pagesNote) && !Kt(a.query.value, t.views)
    ), T = f(
      () => `${a.counting.value ? "~" : ""}${Te(a.pageCount.value)}`
    ), F = f(() => {
      let E = `Page ${Te(te.value)} of ${T.value}`;
      const A = a.rows.value.length;
      if (A) {
        const B = a.offset.value + 1, J = `${a.counting.value ? "~" : ""}${Te(a.total.value)}`;
        E += ` — rows ${Te(B)} to ${Te(B + A - 1)} of ${J}`;
      }
      return t.pagesNote ? `${E}
${t.pagesNote}` : E;
    }), Q = R(null), Ue = f(() => Q.value ?? String(te.value)), xa = f(
      () => `calc(${Math.max(2, String(a.pageCount.value).length)}ch + 10px)`
    );
    function Sa(E) {
      E.target.select();
    }
    function Ca(E) {
      const A = E.target, B = A.value.replace(/[^0-9]/g, "");
      A.value !== B && (A.value = B), Q.value = B;
    }
    function nn(E) {
      const A = E.target, B = Number(Q.value);
      Q.value = null;
      const J = Number.isFinite(B) && B >= 1 ? Math.min(Math.trunc(B), Math.max(1, a.pageCount.value)) : te.value;
      A.value = String(J), J !== te.value && a.setPage(J);
    }
    function Ea(E) {
      const A = E.target;
      Q.value = null, A.value = String(te.value), A.blur();
    }
    return (E, A) => (u(), p("div", oo, [
      w("div", lo, [
        s.value.label && n.brand ? (u(), p("button", {
          key: 0,
          type: "button",
          class: "dc-header__domain",
          "data-dc-brand": "",
          title: "Home",
          onClick: A[0] || (A[0] = (B) => $(a).reset())
        }, [
          w("span", ro, [
            U(E.$slots, "brand", {
              label: s.value.label
            }, void 0, !0)
          ]),
          w("span", io, P(s.value.label), 1)
        ])) : s.value.label ? (u(), p("button", {
          key: 1,
          type: "button",
          class: "dc-header__domain",
          title: "Home",
          onClick: A[1] || (A[1] = (B) => $(a).reset())
        }, P(s.value.label), 1)) : M("", !0),
        o.value.length ? (u(), p("span", co, [
          A[6] || (A[6] = w("span", { class: "dc-header__sr" }, "Within", -1)),
          (u(!0), p(H, null, Y(o.value, (B) => (u(), p("span", {
            key: `scope:${B.id}`,
            class: "dc-within dc-mono dc-truncate",
            title: d(B)
          }, P(d(B)), 9, uo))), 128))
        ])) : M("", !0),
        w("div", fo, [
          w("div", {
            class: "dc-header__field",
            onMousedown: C
          }, [
            w("div", {
              ref_key: "termBar",
              ref: L,
              class: "dc-header__terms",
              "data-dc-more": z.value,
              title: $(a).summary.value,
              onScroll: ie
            }, [
              (u(!0), p(H, null, Y(_.value, (B) => (u(), p(H, {
                key: B.key
              }, [
                w("span", po, [
                  (u(!0), p(H, null, Y(B.entries, (J) => (u(), p(H, {
                    key: J.term.id
                  }, [
                    J.or ? (u(), p("span", ho, "or")) : M("", !0),
                    w("button", {
                      type: "button",
                      class: de(["dc-term dc-mono", { "dc-term--idle": J.idle }]),
                      title: h(J),
                      "aria-label": `Remove ${d(J.term)}`,
                      onMousedown: A[2] || (A[2] = Ee(() => {
                      }, ["prevent"])),
                      onClick: (an) => V(J.term, B.key === "before")
                    }, P(d(J.term)), 43, mo)
                  ], 64))), 128))
                ]),
                B.key === "before" ? Et((u(), p("input", {
                  key: 0,
                  ref_for: !0,
                  ref: S,
                  "onUpdate:modelValue": A[3] || (A[3] = (J) => $(a).draft.value = J),
                  class: de(["dc-header__search dc-mono", { "dc-header__search--between": m.value }]),
                  style: ae({ "--dc-typed": String(Math.max(1, $(a).draft.value.length)) }),
                  type: "text",
                  autocomplete: "off",
                  spellcheck: "false",
                  placeholder: m.value ? "" : "Search…",
                  "aria-label": "Search",
                  onKeydown: [
                    ze(Ee(y, ["prevent"]), ["enter"]),
                    ze(Ee(b, ["prevent"]), ["esc"]),
                    X
                  ],
                  onBlur: N
                }, null, 46, yo)), [
                  [Pa, $(a).draft.value]
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
          onClick: A[4] || (A[4] = (B) => $(a).setPage(te.value - 1))
        }, [...A[7] || (A[7] = [
          w("span", { "aria-hidden": "true" }, "‹", -1)
        ])], 8, go),
        w("span", {
          class: "dc-header__page dc-mono",
          title: F.value
        }, [
          w("input", {
            class: "dc-header__page-box dc-mono",
            type: "text",
            inputmode: "numeric",
            autocomplete: "off",
            "aria-label": "Page",
            style: ae({ width: xa.value }),
            value: Ue.value,
            onFocus: Sa,
            onInput: Ca,
            onKeydown: [
              ze(Ee(nn, ["prevent"]), ["enter"]),
              ze(Ee(Ea, ["prevent"]), ["esc"])
            ],
            onBlur: nn
          }, null, 44, wo),
          w("span", bo, "/ " + P(T.value), 1)
        ], 8, ko),
        w("span", $o, P(F.value), 1),
        w("button", {
          type: "button",
          class: "dc-header__step",
          "aria-label": "Next page",
          disabled: te.value >= $(a).pageCount.value,
          onClick: A[5] || (A[5] = (B) => $(a).setPage(te.value + 1))
        }, [...A[8] || (A[8] = [
          w("span", { "aria-hidden": "true" }, "›", -1)
        ])], 8, xo)
      ])) : M("", !0),
      n.actions ? (u(), p("div", So, [
        U(E.$slots, "actions", {}, void 0, !0)
      ])) : M("", !0)
    ]));
  }
}), D = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [a, s] of t)
    n[a] = s;
  return n;
}, ca = /* @__PURE__ */ D(Co, [["__scopeId", "data-v-c7684617"]]);
function Eo(e) {
  const t = ye(/* @__PURE__ */ new Map()), n = R(!0);
  let a = 0, s;
  const o = () => {
    a++, s?.abort(), s = void 0;
  }, l = () => {
    o();
    const i = a, { signal: r } = s = new AbortController(), c = e.query.value, d = e.schema.value, h = e.entities.value, g = e.within?.value.trim() ?? "";
    n.value = c.expr.trim() === "" && !g;
    const S = /* @__PURE__ */ new Map();
    let b = !0;
    for (const y of h) {
      const k = Zn(y, c.expr), v = g ? zt(g, k) : k;
      let _ = !1;
      const m = (O) => {
        if (i !== a) return;
        if (b) {
          S.set(y.key, O);
          return;
        }
        const j = new Map(t.value);
        j.set(y.key, O), t.value = j;
      }, x = e.source.value.query({
        query: { ...c, entity: y.key, expr: v, page: 1 },
        schema: d,
        entity: y,
        limit: 0,
        offset: 0,
        signal: r,
        progress: (O) => {
          _ || m({ total: O, pending: !0, counted: !0 });
        }
      });
      x instanceof Promise ? (S.has(y.key) || S.set(y.key, { total: 0, pending: !0, counted: !1 }), x.then((O) => {
        _ = !0, m({ total: O.total, pending: !1, counted: !0 });
      })) : (_ = !0, S.set(y.key, { total: x.total, pending: !1, counted: !0 }));
    }
    b = !1, t.value = S;
  };
  return Pn() && at(o), { counts: t, pristine: n, refresh: l, cancel: o };
}
const Po = ["checked", "indeterminate"], ua = /* @__PURE__ */ q({
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
      onChange: l[0] || (l[0] = (i) => $(t).selectPage(!a.value))
    }, null, 40, Po));
  }
}), Lo = { class: "dc-pick" }, To = ["id"], Mo = ["id", "aria-expanded", "aria-labelledby", "data-dc-value"], Oo = { class: "dc-pick__label" }, Ao = /* @__PURE__ */ q({
  __name: "PickControl",
  props: {
    modelValue: {},
    options: {},
    label: {},
    mono: { type: Boolean }
  },
  emits: ["update:modelValue", "open", "close"],
  setup(e, { emit: t }) {
    const n = e, a = t, s = Ht() ?? "dc-pick", o = R(null), l = R(null), i = R(null), r = R(!1), c = f(() => i.value !== null), d = R(null), h = f(
      () => n.options.find((x) => x.key === n.modelValue) ?? n.options[0]
    ), g = f(
      () => n.options.map((x) => ({
        id: x.key,
        label: x.label,
        checked: x.key === n.modelValue
      }))
    ), S = f(
      () => i.value ? { maxHeight: `${window.innerHeight - i.value.y - 8}px` } : void 0
    );
    function b(x) {
      const O = o.value?.getBoundingClientRect();
      O && (d.value = o.value?.closest(".dc-shell") ?? document.body, i.value = { x: O.left, y: O.bottom + 4, mirrorX: O.right }, r.value = x, a("open"));
    }
    function y(x) {
      i.value && a("close"), i.value = null, x && o.value?.focus();
    }
    function k() {
      c.value ? y(!0) : b(!1);
    }
    function v(x) {
      x.key !== "ArrowDown" && x.key !== "ArrowUp" || c.value || (x.preventDefault(), b(!0));
    }
    function _(x) {
      const O = x.target;
      O && (o.value?.contains(O) || l.value?.root?.contains(O) || y(!1));
    }
    ee(c, (x) => {
      x ? window.addEventListener("pointerdown", _, !0) : window.removeEventListener("pointerdown", _, !0);
    }), _e(() => window.removeEventListener("pointerdown", _, !0));
    function m(x) {
      y(!0), !(x.id === void 0 || x.id === n.modelValue) && a("update:modelValue", x.id);
    }
    return (x, O) => (u(), p("span", Lo, [
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
        onKeydown: v
      }, [
        w("span", Oo, P(h.value?.label), 1)
      ], 42, Mo),
      O[1] || (O[1] = w("span", {
        class: "dc-pick__mark",
        "aria-hidden": "true"
      }, "▾", -1)),
      i.value && d.value ? (u(), I(lt, {
        key: 0,
        to: d.value
      }, [
        G($(Ba), {
          ref_key: "menu",
          ref: l,
          class: "dc-pick__list",
          style: ae(S.value),
          items: g.value,
          at: i.value,
          label: e.label,
          autofocus: r.value,
          onChoose: m,
          onDismiss: O[0] || (O[0] = (j) => y(!0))
        }, null, 8, ["style", "items", "at", "label", "autofocus"])
      ], 8, ["to"])) : M("", !0)
    ]));
  }
}), St = /* @__PURE__ */ D(Ao, [["__scopeId", "data-v-31fb5e89"]]), No = {
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
}, Ho = { class: "dc-actions__ops" }, Do = ["disabled"], Vo = ["data-dc-operation", "disabled", "onClick"], Ko = ["disabled"], Wo = "…", jo = /* @__PURE__ */ q({
  __name: "RecordActions",
  props: {
    views: {},
    typeChooser: {},
    selectionPlacement: {}
  },
  setup(e) {
    const t = e, n = Z(), a = f(
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
    function o(V) {
      if (V.key === n.query.value.entity && a.value) return Ye(n.total.value);
      if (s.pristine.value) return Tt(V);
      const N = s.counts.value.get(V.key);
      return N ? N.counted ? `${N.pending ? "~" : ""}${Ye(N.total)}` : Wo : Tt(V);
    }
    const l = f(() => [
      { key: "", label: "Everything" },
      ...n.entities.value.map((V) => ({
        key: V.key,
        label: `${V.label} · ${o(V)}`
      }))
    ]), i = f(
      () => t.typeChooser === "always" || n.query.value.entity !== null
    );
    function r(V) {
      n.setEntity(V || null);
    }
    const c = f(
      () => (t.views ?? [...Tn]).map((V) => ({ key: V, label: Ya[V] }))
    ), d = f(() => Dt(n.query.value.view, t.views)), h = f(() => c.value.length > 1);
    function g(V) {
      n.setView(V);
    }
    const S = f(
      () => m.value && d.value !== "table" && n.sorts.value.length > 0
    ), b = f(
      () => n.sorts.value.map((V) => ({ key: V.key, label: V.label }))
    ), y = f(() => S.value && b.value.length > 1), k = f(() => n.query.value.dir === "desc"), v = f(
      () => `Sorted by ${n.sort.value.label}, ${k.value ? "descending" : "ascending"}`
    ), _ = f(() => n.entity.value), m = f(() => !Kt(n.query.value, t.views)), x = f(() => n.selection.value.ids.length), O = f(
      () => m.value && n.selectable.value && (n.rows.value.length > 0 || x.value > 0)
    ), j = f(() => d.value === "table"), le = f(
      () => i.value || h.value || S.value || m.value && (O.value || !!(_.value?.create || _.value?.duplicate || _.value?.delete || _.value?.operations?.length))
    ), K = f(() => x.value ? `${x.value} selected` : j.value ? "" : "Select all"), W = f(() => t.selectionPlacement === "end");
    function X(V) {
      return x.value ? `${V} ${x.value}` : V;
    }
    return (V, C) => le.value ? (u(), p("div", {
      key: 0,
      class: de(["dc-actions", { "dc-actions--selection-end": W.value }])
    }, [
      i.value ? (u(), I(St, {
        key: 0,
        class: "dc-actions__pick dc-actions__type",
        label: "Type",
        "model-value": $(n).query.value.entity ?? "",
        options: l.value,
        onOpen: $(s).refresh,
        onClose: $(s).cancel,
        "onUpdate:modelValue": r
      }, null, 8, ["model-value", "options", "onOpen", "onClose"])) : M("", !0),
      h.value ? (u(), I(St, {
        key: 1,
        class: "dc-actions__pick dc-actions__view",
        label: "View",
        "model-value": d.value,
        options: c.value,
        "onUpdate:modelValue": g
      }, null, 8, ["model-value", "options"])) : M("", !0),
      S.value ? (u(), p("span", No, [
        y.value ? (u(), I(St, {
          key: 0,
          class: "dc-actions__pick dc-actions__sort",
          label: "Sort",
          "model-value": $(n).sort.value.key,
          options: b.value,
          "onUpdate:modelValue": $(n).setSort
        }, null, 8, ["model-value", "options", "onUpdate:modelValue"])) : M("", !0),
        w("button", {
          type: "button",
          class: "dc-actions__dir",
          "aria-label": v.value,
          title: v.value,
          onClick: C[0] || (C[0] = (N) => $(n).toggleDirection())
        }, P(k.value ? "↓" : "↑"), 9, Io)
      ])) : M("", !0),
      O.value && K.value ? (u(), p("div", Ro, [
        j.value ? (u(), p("span", Fo, P(K.value), 1)) : (u(), p("label", Bo, [
          G(ua),
          w("span", qo, P(K.value), 1)
        ])),
        x.value ? (u(), p("button", {
          key: 2,
          type: "button",
          class: de(["dc-actions__clear", { "dc-actions__clear--op": W.value }]),
          onClick: C[1] || (C[1] = (N) => $(n).clearSelection())
        }, " Clear ", 2)) : M("", !0)
      ])) : M("", !0),
      w("div", Ho, [
        _.value?.create ? (u(), p("button", {
          key: 0,
          type: "button",
          class: "dc-actions__op dc-actions__new",
          onClick: C[2] || (C[2] = (N) => $(n).create(_.value))
        }, [
          C[5] || (C[5] = w("span", {
            class: "dc-actions__plus",
            "aria-hidden": "true"
          }, "+", -1)),
          se(" " + P(_.value.create), 1)
        ])) : M("", !0),
        _.value?.duplicate ? (u(), p("button", {
          key: 1,
          type: "button",
          class: "dc-actions__op",
          disabled: !x.value,
          onClick: C[3] || (C[3] = (N) => $(n).duplicate())
        }, P(X(_.value.duplicate)), 9, Do)) : M("", !0),
        (u(!0), p(H, null, Y(_.value?.operations ?? [], (N) => (u(), p("button", {
          key: N.key,
          type: "button",
          class: "dc-actions__op",
          "data-dc-operation": N.key,
          disabled: !x.value,
          onClick: (L) => $(n).operate(N.key)
        }, P(X(N.label)), 9, Vo))), 128)),
        _.value?.delete ? (u(), p("button", {
          key: 2,
          type: "button",
          class: "dc-actions__op dc-actions__danger",
          disabled: !x.value,
          onClick: C[4] || (C[4] = (N) => $(n).delete())
        }, P(X(_.value.delete)), 9, Ko)) : M("", !0)
      ])
    ], 2)) : M("", !0);
  }
}), da = /* @__PURE__ */ D(jo, [["__scopeId", "data-v-279c5335"]]), Uo = ["href"], zo = /* @__PURE__ */ q({
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
      o.preventDefault(), a("press", yt(o), o);
    }
    return (o, l) => e.href ? (u(), p("a", {
      key: 0,
      href: e.href,
      class: "dc-press",
      onClick: s
    }, [
      U(o.$slots, "default", {}, void 0, !0)
    ], 8, Uo)) : (u(), p("button", {
      key: 1,
      type: "button",
      class: "dc-press",
      onClick: s
    }, [
      U(o.$slots, "default", {}, void 0, !0)
    ]));
  }
}), fe = /* @__PURE__ */ D(zo, [["__scopeId", "data-v-a9383f64"]]);
function Qo(e, t) {
  if (!e) return null;
  const n = ue(e, t);
  return typeof n == "string" && n.trim() ? n : null;
}
const Go = (e) => e == null || typeof e == "string" && !e.trim();
function Yo(e, t) {
  const n = ve(t, "state"), a = ve(t, "tint");
  return {
    identity: Ge(ve(t, "identity"), e),
    reference: Ge(ve(t, "reference"), e),
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
    updated: Ge(ve(t, "updated"), e),
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
  const e = Z(), t = f(
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
const Xo = ["data-dc-status", "data-dc-tone"], Jo = /* @__PURE__ */ q({
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
    }, P(n.value), 9, Xo));
  }
}), Ve = /* @__PURE__ */ D(Jo, [["__scopeId", "data-v-686eb9b6"]]), Zo = { key: 1 }, el = /* @__PURE__ */ q({
  __name: "MetricDrill",
  props: {
    entry: {},
    column: {}
  },
  setup(e) {
    const t = e, n = Z(), a = f(() => !t.entry.entity?.scope || !t.column.drill ? null : n.entities.value.find((c) => c.key === t.column.drill) ?? null), s = f(() => t.column.label ?? ""), o = f(() => Pe(t.column, t.entry.row)), l = f(() => a.value ? n.drillHref(t.entry.row, a.value) : null);
    function i(r, c) {
      c.stopPropagation(), a.value && n.drill(t.entry.row, a.value, r);
    }
    return (r, c) => a.value ? (u(), I(fe, {
      key: 0,
      class: "dc-drill",
      href: l.value,
      title: `${s.value} of ${e.entry.parts.identity} — show the ${a.value.label.toLowerCase()}`,
      onPress: i
    }, {
      default: ne(() => [
        U(r.$slots, "default", {}, () => [
          se(P(o.value), 1)
        ], !0)
      ]),
      _: 3
    }, 8, ["href", "title"])) : (u(), p("span", Zo, [
      U(r.$slots, "default", {}, () => [
        se(P(o.value), 1)
      ], !0)
    ]));
  }
}), Ke = /* @__PURE__ */ D(el, [["__scopeId", "data-v-d3e7f4e0"]]), tl = ["data-dc-active", "aria-pressed", "aria-label"], nl = /* @__PURE__ */ q({
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
    }, P(e.pinned ? "★" : "☆"), 9, tl));
  }
}), en = /* @__PURE__ */ D(nl, [["__scopeId", "data-v-ef63d763"]]), al = ["src"], sl = /* @__PURE__ */ q({
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
    ), (a, s) => e.src.trim() && !n.value ? (u(), p("img", {
      key: 0,
      class: "dc-picture",
      src: e.src,
      alt: "",
      loading: "lazy",
      decoding: "async",
      onError: s[0] || (s[0] = (o) => n.value = !0)
    }, null, 40, al)) : M("", !0);
  }
}), _t = /* @__PURE__ */ D(sl, [["__scopeId", "data-v-afaab300"]]), ol = ["data-dc-standing", "title", "aria-label"], ll = /* @__PURE__ */ q({
  __name: "QueryMark",
  props: {
    entry: {}
  },
  setup(e) {
    const t = e, n = Z(), a = f(() => ht(t.entry.entity, t.entry.row)), s = f(() => Xt(n.query.value.expr, a.value)), o = f(
      () => s.value === "in" ? `The query narrows to ${t.entry.parts.identity} — press to lift that` : `The query leaves out ${t.entry.parts.identity} — press to lift that`
    );
    function l(i) {
      i.stopPropagation(), n.setExpression(Xn(n.query.value.expr, a.value));
    }
    return (i, r) => s.value ? (u(), p("button", {
      key: 0,
      type: "button",
      class: "dc-standing",
      "data-dc-standing": s.value,
      title: o.value,
      "aria-label": o.value,
      onClick: l
    }, P(s.value === "in" ? "+" : "−"), 9, ol)) : M("", !0);
  }
}), tn = /* @__PURE__ */ D(ll, [["__scopeId", "data-v-4b8d4166"]]), rl = ["aria-label"], il = ["data-dc-standing", "data-dc-active", "aria-checked", "title", "aria-label", "onClick"], cl = /* @__PURE__ */ q({
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
      (u(!0), p(H, null, Y(s.value, (c) => (u(), p("button", {
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
}), Rt = /* @__PURE__ */ D(cl, [["__scopeId", "data-v-5524dca6"]]), va = /* @__PURE__ */ q({
  __name: "RowStanding",
  props: {
    entry: {}
  },
  setup(e) {
    const t = e, n = Z(), a = f(() => ht(t.entry.entity, t.entry.row)), s = f(() => Xt(n.query.value.expr, a.value));
    function o(l) {
      n.setExpression(Nt(n.query.value.expr, a.value, l));
    }
    return (l, i) => a.value !== null ? (u(), I(Rt, {
      key: 0,
      class: "dc-row-standing",
      standing: s.value,
      name: e.entry.parts.identity,
      onSet: o
    }, null, 8, ["standing", "name"])) : M("", !0);
  }
}), ul = ["href", "title", "aria-label"], dl = /* @__PURE__ */ q({
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
      onClick: o[0] || (o[0] = Ee(() => {
      }, ["stop"]))
    }, "↗", 8, ul)) : M("", !0);
  }
}), We = /* @__PURE__ */ D(dl, [["__scopeId", "data-v-b00f390d"]]), fl = /* @__PURE__ */ q({
  __name: "ScopeMark",
  props: {
    entry: {}
  },
  setup(e) {
    const t = e, n = Z(), a = f(
      () => n.narrowsOnPress.value ? null : t.entry.entity?.scope ?? null
    ), s = R(null);
    function o(d) {
      s.value = yt(d).exclude ? "out" : "in";
    }
    function l(d) {
      o(d), window.addEventListener("keydown", o), window.addEventListener("keyup", o);
    }
    function i() {
      s.value = null, window.removeEventListener("keydown", o), window.removeEventListener("keyup", o);
    }
    _e(i);
    const r = f(() => a.value ? n.drillHref(t.entry.row, null) : null);
    function c(d, h) {
      h.stopPropagation(), n.drill(t.entry.row, null, d);
    }
    return (d, h) => a.value ? (u(), I(fe, {
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
      default: ne(() => [...h[0] || (h[0] = [
        se(" → ", -1)
      ])]),
      _: 1
    }, 8, ["href", "data-dc-pending", "title", "aria-label"])) : M("", !0);
  }
}), je = /* @__PURE__ */ D(fl, [["__scopeId", "data-v-05d2c233"]]), vl = ["checked", "aria-label"], Ce = /* @__PURE__ */ q({
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
}, Cl = /* @__PURE__ */ q({
  __name: "CardsView",
  setup(e) {
    const t = Z(), n = Se(), a = f(() => t.isEverything.value), s = (l) => l.entity?.card === "picture", o = f(() => n.value.length > 0 && n.value.every(s));
    return (l, i) => (u(), p("div", {
      class: de(["dc-cards", { "dc-cards--pictures": o.value }])
    }, [
      (u(!0), p(H, null, Y($(n), (r) => (u(), p("div", {
        key: r.key,
        class: de(["dc-card", { "dc-card--picture": s(r) }])
      }, [
        w("div", pl, [
          w("span", hl, [
            $(t).selectable.value ? (u(), I(Ce, {
              key: 0,
              row: r.row,
              selected: r.selected,
              name: r.parts.identity
            }, null, 8, ["row", "selected", "name"])) : M("", !0),
            s(r) ? M("", !0) : (u(), p(H, { key: 1 }, [
              se(P(r.ordinal), 1)
            ], 64)),
            a.value ? (u(), p("span", ml, P(r.entityLabel), 1)) : M("", !0)
          ]),
          w("span", yl, [
            r.parts.state && !s(r) ? (u(), I(Ve, {
              key: 0,
              status: r.parts.state
            }, null, 8, ["status"])) : M("", !0),
            s(r) ? (u(), I(tn, {
              key: 1,
              entry: r
            }, null, 8, ["entry"])) : (u(), I(va, {
              key: 2,
              entry: r
            }, null, 8, ["entry"])),
            G(je, { entry: r }, null, 8, ["entry"]),
            G(We, { entry: r }, null, 8, ["entry"]),
            $(t).pinnable.value ? (u(), I(en, {
              key: 3,
              row: r.row,
              name: r.parts.identity,
              pinned: r.pinned
            }, null, 8, ["row", "name", "pinned"])) : M("", !0)
          ])
        ]),
        G(fe, {
          class: "dc-card__open",
          href: $(t).pressHref(r.row),
          onPress: (c) => $(t).activate(r.row, c)
        }, {
          default: ne(() => [
            r.parts.image ? (u(), I(_t, {
              key: 0,
              class: "dc-card__image",
              src: r.parts.image
            }, null, 8, ["src"])) : M("", !0),
            w("span", _l, [
              w("span", gl, P(r.parts.identity), 1),
              s(r) ? M("", !0) : (u(), p("span", kl, P(r.parts.reference), 1)),
              r.parts.facts.length ? (u(), p("span", wl, [
                (u(!0), p(H, null, Y(r.parts.facts, (c) => (u(), p("span", {
                  key: c.column.key ?? c.label,
                  class: "dc-card__fact",
                  title: c.title || void 0
                }, [
                  w("span", $l, P(c.label), 1),
                  se(" " + P(c.text), 1)
                ], 8, bl))), 128))
              ])) : M("", !0)
            ])
          ]),
          _: 2
        }, 1032, ["href", "onPress"]),
        s(r) ? M("", !0) : (u(), p("div", xl, [
          (u(!0), p(H, null, Y(r.parts.metrics.slice(0, 2), (c) => (u(), I(Ke, {
            key: c.column.key ?? c.label,
            entry: r,
            column: c.column
          }, {
            default: ne(() => [
              se(P(c.label) + " " + P(c.text), 1)
            ]),
            _: 2
          }, 1032, ["entry", "column"]))), 128)),
          r.parts.updated ? (u(), p("span", Sl, P(r.parts.updated), 1)) : M("", !0)
        ]))
      ], 2))), 128))
    ], 2));
  }
}), pa = /* @__PURE__ */ D(Cl, [["__scopeId", "data-v-fd252138"]]), El = { class: "dc-grid" }, Pl = { class: "dc-tile__scrim" }, Ll = { class: "dc-tile__top dc-mono" }, Tl = { class: "dc-tile__chip" }, Ml = { class: "dc-tile__caption" }, Ol = { class: "dc-tile__secondary dc-truncate" }, Al = { class: "dc-tile__primary" }, Nl = /* @__PURE__ */ q({
  __name: "GridView",
  setup(e) {
    const t = Z(), n = Se();
    return (a, s) => (u(), p("div", El, [
      (u(!0), p(H, null, Y($(n), (o) => (u(), p("div", {
        key: o.key,
        class: "dc-grid__cell"
      }, [
        G(fe, {
          class: "dc-tile",
          style: ae({ "--dc-tile-tint": o.parts.tint ?? void 0 }),
          href: $(t).pressHref(o.row),
          onPress: (l) => $(t).activate(o.row, l)
        }, {
          default: ne(() => [
            o.parts.image ? (u(), I(_t, {
              key: 0,
              class: "dc-tile__image",
              src: o.parts.image
            }, null, 8, ["src"])) : M("", !0),
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
        $(t).selectable.value ? (u(), I(Ce, {
          key: 0,
          class: "dc-grid__tick",
          row: o.row,
          selected: o.selected,
          name: o.parts.identity
        }, null, 8, ["row", "selected", "name"])) : M("", !0)
      ]))), 128))
    ]));
  }
}), ha = /* @__PURE__ */ D(Nl, [["__scopeId", "data-v-89c40a9e"]]);
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
    const h = t(d), g = Math.max(h.ratio, Number.EPSILON), S = h.height && h.height > 0 ? Math.max(c, h.height) : c, b = Ct(S, s), y = $n(r + g, i.length + 1, a, o);
    if (y > b) {
      i.push(d), r += g, c = S;
      continue;
    }
    const k = Ct(c, s), v = i.length ? $n(r, i.length, a, o) : 1 / 0;
    v <= Il(c) && v - k < b - y ? (l.push({ items: i, height: v, filled: !0 }), i = [d], r = g, c = h.height && h.height > 0 ? h.height : 0) : (l.push({ items: [...i, d], height: y, filled: !0 }), i = [], r = 0, c = 0);
  }
  return i.length && l.push({ items: i, height: Ct(c, s), filled: !1 }), l;
}
const Bl = { class: "dc-images" }, ql = {
  key: 1,
  class: "dc-images__blank",
  "aria-hidden": "true"
}, Fl = 240, Qe = 8, Hl = 1, Dl = /* @__PURE__ */ q({
  __name: "ImagesView",
  setup(e) {
    const t = Z(), n = Se(), a = on(/* @__PURE__ */ new Map()), s = on(/* @__PURE__ */ new Set());
    function o(b, y) {
      const k = y.target;
      k.naturalWidth > 0 && k.naturalHeight > 0 && a.set(b, { width: k.naturalWidth, height: k.naturalHeight });
    }
    function l(b) {
      const y = b.parts.image;
      return y && !s.has(y) ? y : null;
    }
    function i(b) {
      const y = l(b);
      return y ? a.get(y) : void 0;
    }
    function r(b) {
      const y = i(b);
      return y ? { ratio: y.width / y.height, height: y.height } : { ratio: Hl };
    }
    const c = R(null), d = R(0);
    let h = null;
    function g() {
      d.value = c.value?.clientWidth ?? 0;
    }
    rt(() => {
      g(), !(!c.value || typeof ResizeObserver > "u") && (h = new ResizeObserver(g), h.observe(c.value));
    }), _e(() => {
      h?.disconnect(), h = null;
    });
    const S = f(() => {
      const b = Rl(n.value, r, {
        width: d.value,
        height: Fl,
        gap: Qe
      }), y = [];
      let k = 0;
      for (const v of b) {
        let _ = 0;
        for (const m of v.items) {
          const x = r(m).ratio * v.height, O = i(m), j = O !== void 0 && O.height < v.height;
          y.push({
            entry: m,
            style: {
              top: `${k}px`,
              left: `${_}px`,
              width: `${x}px`,
              height: `${v.height}px`
            },
            picture: j ? { width: `${O.width}px`, height: `${O.height}px` } : { width: "100%", height: "100%" }
          }), _ += x + Qe;
        }
        k += v.height + Qe;
      }
      return { boxes: y, height: b.length ? k - Qe : 0 };
    });
    return (b, y) => (u(), p("div", Bl, [
      w("div", {
        ref_key: "wall",
        ref: c,
        class: "dc-images__wall",
        style: ae({ height: `${S.value.height}px` })
      }, [
        (u(!0), p(H, null, Y(S.value.boxes, ({ entry: k, style: v, picture: _ }) => (u(), p("div", {
          key: k.key,
          class: "dc-images__cell",
          style: ae(v)
        }, [
          G(fe, {
            class: "dc-images__open",
            title: k.parts.identity,
            "aria-label": k.parts.identity,
            href: $(t).pressHref(k.row),
            onPress: (m) => $(t).activate(k.row, m)
          }, {
            default: ne(() => [
              l(k) ? (u(), I(_t, {
                key: 0,
                class: "dc-images__picture",
                style: ae(_),
                src: l(k),
                onLoad: (m) => o(l(k), m),
                onError: (m) => s.add(l(k))
              }, null, 8, ["style", "src", "onLoad", "onError"])) : (u(), p("span", ql, P(k.parts.identity), 1))
            ]),
            _: 2
          }, 1032, ["title", "aria-label", "href", "onPress"]),
          $(t).selectable.value ? (u(), I(Ce, {
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
}), ma = /* @__PURE__ */ D(Dl, [["__scopeId", "data-v-2d267370"]]), Vl = { class: "dc-links" }, Kl = { class: "dc-link__primary dc-truncate" }, Wl = { class: "dc-link__secondary dc-mono dc-truncate" }, jl = /* @__PURE__ */ q({
  __name: "LinksView",
  setup(e) {
    const t = Z(), n = Se();
    return (a, s) => (u(), p("div", Vl, [
      (u(!0), p(H, null, Y($(n), (o) => (u(), p("span", {
        key: o.key,
        class: "dc-links__item"
      }, [
        $(t).selectable.value ? (u(), I(Ce, {
          key: 0,
          row: o.row,
          selected: o.selected,
          name: o.parts.identity
        }, null, 8, ["row", "selected", "name"])) : M("", !0),
        G(fe, {
          class: "dc-link",
          href: $(t).pressHref(o.row),
          onPress: (l) => $(t).activate(o.row, l)
        }, {
          default: ne(() => [
            w("span", Kl, P(o.parts.identity), 1),
            w("span", Wl, P(o.parts.reference), 1)
          ]),
          _: 2
        }, 1032, ["href", "onPress"])
      ]))), 128))
    ]));
  }
}), ya = /* @__PURE__ */ D(jl, [["__scopeId", "data-v-de6c9a0f"]]), Ul = {
  class: "dc-list",
  role: "list"
}, zl = { class: "dc-list__ordinal dc-mono" }, Ql = { class: "dc-list__identity" }, Gl = { class: "dc-list__primary dc-truncate" }, Yl = { class: "dc-list__secondary dc-mono dc-truncate" }, Xl = {
  key: 1,
  class: "dc-list__entity dc-mono"
}, Jl = { class: "dc-list__metrics dc-mono" }, Zl = { class: "dc-list__trailing" }, er = /* @__PURE__ */ q({
  __name: "ListView",
  setup(e) {
    const t = Z(), n = Se(), a = f(() => t.isEverything.value);
    return (s, o) => (u(), p("div", Ul, [
      (u(!0), p(H, null, Y($(n), (l) => (u(), p("div", {
        key: l.key,
        class: "dc-list__row",
        role: "listitem"
      }, [
        $(t).selectable.value ? (u(), I(Ce, {
          key: 0,
          class: "dc-list__tick",
          row: l.row,
          selected: l.selected,
          name: l.parts.identity
        }, null, 8, ["row", "selected", "name"])) : M("", !0),
        G(va, {
          class: "dc-list__standing",
          entry: l
        }, null, 8, ["entry"]),
        G(fe, {
          class: "dc-list__open",
          href: $(t).pressHref(l.row),
          onPress: (i) => $(t).activate(l.row, i)
        }, {
          default: ne(() => [
            w("span", zl, P(l.ordinal), 1),
            w("span", Ql, [
              w("span", Gl, P(l.parts.identity), 1),
              w("span", Yl, P(l.parts.reference), 1)
            ])
          ]),
          _: 2
        }, 1032, ["href", "onPress"]),
        a.value ? (u(), p("span", Xl, P(l.entityLabel), 1)) : M("", !0),
        w("span", Jl, [
          (u(!0), p(H, null, Y(l.parts.metrics.slice(0, 2), (i) => (u(), I(Ke, {
            key: i.column.key ?? i.label,
            entry: l,
            column: i.column
          }, null, 8, ["entry", "column"]))), 128))
        ]),
        w("span", Zl, [
          l.parts.state ? (u(), I(Ve, {
            key: 0,
            status: l.parts.state
          }, null, 8, ["status"])) : M("", !0),
          G(je, { entry: l }, null, 8, ["entry"]),
          G(We, { entry: l }, null, 8, ["entry"]),
          $(t).pinnable.value ? (u(), I(en, {
            key: 1,
            row: l.row,
            name: l.parts.identity,
            pinned: l.pinned
          }, null, 8, ["row", "name", "pinned"])) : M("", !0)
        ])
      ]))), 128))
    ]));
  }
}), Bt = /* @__PURE__ */ D(er, [["__scopeId", "data-v-3d349a10"]]), tr = { class: "dc-preview" }, nr = { class: "dc-preview__pager dc-mono" }, ar = ["disabled"], sr = { "aria-live": "polite" }, or = ["disabled"], lr = {
  key: 0,
  class: "dc-preview__card"
}, rr = ["src"], ir = { class: "dc-preview__body" }, cr = { class: "dc-preview__top" }, ur = { class: "dc-preview__badges" }, dr = { class: "dc-preview__entity dc-mono" }, fr = { class: "dc-preview__marks" }, vr = { class: "dc-preview__primary" }, pr = { class: "dc-preview__secondary dc-mono" }, hr = { class: "dc-preview__fields" }, mr = { class: "dc-preview__key" }, yr = { class: "dc-preview__value dc-mono" }, _r = /* @__PURE__ */ q({
  __name: "PreviewView",
  setup(e) {
    const t = Z(), n = Se(), a = R(0);
    ee(n, (r) => {
      a.value > r.length - 1 && (a.value = Math.max(0, r.length - 1));
    });
    const s = f(() => n.value[a.value]), o = f(() => {
      const r = s.value;
      if (!r) return [];
      const c = ve(r.columns, "reference"), d = ve(r.columns, "updated");
      return [
        ...c ? [{ key: c.label ?? "Reference", value: r.parts.reference, column: null }] : [],
        ...r.parts.metrics.map((h) => ({
          key: h.label,
          value: h.text,
          column: h.column
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
    return (r, c) => (u(), p("div", tr, [
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
      s.value ? (u(), p("div", lr, [
        w("div", {
          class: "dc-preview__media",
          style: ae({ background: s.value.parts.tint ?? void 0 }),
          "aria-hidden": "true"
        }, [
          s.value.parts.image ? (u(), p("img", {
            key: 0,
            class: "dc-preview__image",
            src: s.value.parts.image,
            alt: ""
          }, null, 8, rr)) : (u(), p(H, { key: 1 }, [
            se(" preview ")
          ], 64))
        ], 4),
        w("div", ir, [
          w("div", cr, [
            w("span", ur, [
              $(t).selectable.value ? (u(), I(Ce, {
                key: 0,
                row: s.value.row,
                selected: s.value.selected,
                name: s.value.parts.identity
              }, null, 8, ["row", "selected", "name"])) : M("", !0),
              s.value.parts.state ? (u(), I(Ve, {
                key: 1,
                status: s.value.parts.state
              }, null, 8, ["status"])) : M("", !0),
              w("span", dr, P(s.value.entityLabel), 1)
            ]),
            w("span", fr, [
              G(tn, { entry: s.value }, null, 8, ["entry"]),
              G(je, { entry: s.value }, null, 8, ["entry"]),
              G(We, { entry: s.value }, null, 8, ["entry"]),
              $(t).pinnable.value ? (u(), I(en, {
                key: 0,
                row: s.value.row,
                name: s.value.parts.identity,
                pinned: s.value.pinned
              }, null, 8, ["row", "name", "pinned"])) : M("", !0)
            ])
          ]),
          w("div", null, [
            w("div", vr, P(s.value.parts.identity), 1),
            w("div", pr, P(s.value.parts.reference), 1)
          ]),
          w("dl", hr, [
            (u(!0), p(H, null, Y(o.value, (d) => (u(), p("div", {
              key: d.key,
              class: "dc-preview__field"
            }, [
              w("dt", mr, P(d.key), 1),
              w("dd", yr, [
                d.column && s.value ? (u(), I(Ke, {
                  key: 0,
                  entry: s.value,
                  column: d.column
                }, null, 8, ["entry", "column"])) : (u(), p(H, { key: 1 }, [
                  se(P(d.value), 1)
                ], 64))
              ])
            ]))), 128))
          ]),
          G(fe, {
            class: "dc-preview__open",
            href: s.value ? $(t).pressHref(s.value.row) : null,
            onPress: c[2] || (c[2] = (d) => s.value && $(t).activate(s.value.row, d))
          }, {
            default: ne(() => [...c[3] || (c[3] = [
              se(" Open record → ", -1)
            ])]),
            _: 1
          }, 8, ["href"])
        ])
      ])) : M("", !0)
    ]));
  }
}), _a = /* @__PURE__ */ D(_r, [["__scopeId", "data-v-59e0d33b"]]);
function gr() {
  const e = Z();
  return f(() => ts(e.schema.value, e.entity.value));
}
const kr = {
  key: 5,
  class: "dc-cell__text"
}, wr = /* @__PURE__ */ q({
  __name: "ColumnCell",
  props: {
    column: {},
    entry: {}
  },
  setup(e) {
    const t = e, n = Z(), a = f(() => t.column.kind ?? "text"), s = f(() => ue(t.column, t.entry.row)), o = f(
      () => a.value === "ordinal" ? t.entry.ordinal : Pe(t.column, t.entry.row)
    ), l = f(() => s.value), i = f(() => t.column.activate === !0 || !!t.column.click), r = f(() => Mt(t.column)), c = f(() => In(t.column, t.entry.row));
    function d(S) {
      i.value && (S.stopPropagation(), h(yt(S)));
    }
    function h(S) {
      t.column.click?.(t.entry.row, S), t.column.activate && n.activate(t.entry.row, S);
    }
    const g = f(
      () => t.column.activate && !t.column.click ? n.pressHref(t.entry.row) : null
    );
    return (S, b) => a.value === "component" && e.column.component ? (u(), I(it(e.column.component), {
      key: 0,
      row: e.entry.row,
      entry: e.entry,
      value: s.value,
      column: e.column
    }, null, 8, ["row", "entry", "value", "column"])) : a.value === "status" ? (u(), I(Ve, {
      key: 1,
      status: l.value
    }, null, 8, ["status"])) : a.value === "image" ? (u(), I(_t, {
      key: 2,
      class: "dc-cell__image",
      src: typeof s.value == "string" ? s.value : "",
      style: ae({ maxHeight: e.column.height }),
      onClick: d
    }, null, 8, ["src", "style"])) : e.column.drill ? (u(), I(Ke, {
      key: 3,
      entry: e.entry,
      column: e.column
    }, null, 8, ["entry", "column"])) : i.value ? (u(), I(fe, {
      key: 4,
      class: de(["dc-table__open", { "dc-truncate": r.value }]),
      href: g.value,
      title: c.value,
      onPress: b[0] || (b[0] = (y, k) => {
        k.stopPropagation(), h(y);
      })
    }, {
      default: ne(() => [
        se(P(o.value), 1)
      ]),
      _: 1
    }, 8, ["class", "href", "title"])) : (u(), p("span", kr, P(o.value), 1));
  }
}), xn = /* @__PURE__ */ D(wr, [["__scopeId", "data-v-4dd1835e"]]), br = {
  key: 0,
  class: "dc-table__none"
}, $r = { class: "dc-table__detail" }, xr = ["data-dc-wrap", "data-dc-row-links"], Sr = { "data-dc-stuck": "" }, Cr = {
  key: 0,
  class: "dc-table__pick",
  scope: "col"
}, Er = {
  key: 1,
  class: "dc-table__standing",
  scope: "col"
}, Pr = ["data-dc-align", "data-dc-hide", "aria-sort", "title"], Lr = ["onClick"], Tr = {
  key: 2,
  class: "dc-table__head"
}, Mr = ["onClick"], Or = {
  key: 0,
  class: "dc-table__pick"
}, Ar = {
  key: 1,
  class: "dc-table__standing"
}, Nr = ["data-dc-align", "data-dc-hide", "title"], Ir = {
  key: 1,
  class: "dc-table__name"
}, Rr = /* @__PURE__ */ q({
  __name: "TableView",
  setup(e) {
    const t = Z(), n = Se(), a = gr();
    function s(C, N) {
      const L = t.pressHref(C);
      if (L && Jn(N)) {
        const z = N.shiftKey ? `noopener,popup,width=${window.outerWidth},height=${window.outerHeight}` : "noopener";
        window.open(L, "_blank", z);
        return;
      }
      t.activate(C, yt(N));
    }
    const o = f(() => t.rowLinks?.value ? new Map(n.value.map((C) => [C.key, t.pressHref(C.row)])) : /* @__PURE__ */ new Map()), l = f(
      () => a.value.find((C) => C.role === "identity") ?? a.value[0]
    );
    function i(C, N, L) {
      L.stopPropagation(), t.activate(C, N);
    }
    function r(C) {
      const N = Hn(C, t.entity.value, t.schema.value), L = N ? `Shortcut: ${N}` : void 0;
      return [C.hint, L].filter(Boolean).join(`
`) || void 0;
    }
    const c = f(() => {
      const C = a.value.find((L) => L.scope);
      return C || ((t.entity.value ? !!t.entity.value.href : t.entities.value.some((L) => L.href)) ? a.value.find((L) => L.activate) : void 0);
    }), d = f(
      () => t.entity.value ? !!t.entity.value.scope : t.entities.value.some((C) => C.scope)
    ), h = (C) => ht(C.entity, C.row), g = (C) => Xt(t.query.value.expr, h(C));
    function S(C, N) {
      t.setExpression(Nt(t.query.value.expr, h(C), N));
    }
    const b = f(() => {
      const C = n.value.filter((L) => h(L) !== null), N = C.filter((L) => L.selected);
      return N.length ? N : C;
    }), y = f(() => b.value.some((C) => C.selected)), k = f(() => {
      const C = b.value[0];
      return C ? g(C) : null;
    }), v = f(
      () => b.value.some((C) => g(C) !== k.value)
    ), _ = f(
      () => y.value ? "the ticked rows" : "every row on this page"
    );
    function m(C) {
      t.setExpression(
        b.value.reduce(
          (N, L) => Nt(N, h(L), C),
          t.query.value.expr
        )
      );
    }
    const x = f(
      () => a.value.some((C) => C.kind === "image" || C.height !== void 0)
    );
    function O(C) {
      C && (t.query.value.sort === C ? t.toggleDirection() : t.setSort(C));
    }
    const j = f(() => t.entity.value?.label ?? "The result set"), le = f(() => new Set(t.sorts.value.map((C) => C.key))), K = (C) => C.sort !== void 0 && le.value.has(C.sort), W = (C) => {
      if (K(C))
        return t.query.value.sort !== C.sort ? "none" : t.query.value.dir === "desc" ? "descending" : "ascending";
    };
    function X(C) {
      return [
        vn(C),
        C.muted ? "dc-table__muted" : "",
        C.mono ? "dc-mono" : "",
        Mt(C) ? "dc-truncate" : ""
      ].filter(Boolean).join(" ");
    }
    function V(C, N) {
      if (!(!Mt(C) || C.activate || C.click))
        return In(C, N.row);
    }
    return (C, N) => $(a).length ? (u(), p("table", {
      key: 1,
      class: "dc-table",
      "data-dc-wrap": x.value ? "" : void 0,
      "data-dc-row-links": $(t).rowLinks?.value ? "" : void 0
    }, [
      w("thead", Sr, [
        w("tr", null, [
          $(t).selectable.value ? (u(), p("th", Cr, [
            G(ua)
          ])) : M("", !0),
          d.value ? (u(), p("th", Er, [
            b.value.length ? (u(), I(Rt, {
              key: 0,
              standing: k.value,
              mixed: v.value,
              name: _.value,
              onSet: m
            }, null, 8, ["standing", "mixed", "name"])) : M("", !0)
          ])) : M("", !0),
          (u(!0), p(H, null, Y($(a), (L, z) => (u(), p("th", {
            key: $(dn)(L, z),
            scope: "col",
            class: de($(vn)(L)),
            style: ae({ width: L.width }),
            "data-dc-align": $(fn)(L),
            "data-dc-hide": L.hideBelow,
            "aria-sort": W(L),
            title: r(L)
          }, [
            K(L) ? (u(), p("button", {
              key: 0,
              type: "button",
              class: "dc-table__sort",
              onClick: (ie) => O(L.sort)
            }, P(L.label), 9, Lr)) : (u(), p(H, { key: 1 }, [
              se(P(L.label), 1)
            ], 64)),
            L.header ? (u(), p("span", Tr, [
              (u(), I(it(L.header), {
                column: L,
                entity: $(t).entity.value
              }, null, 8, ["column", "entity"]))
            ])) : M("", !0)
          ], 14, Pr))), 128))
        ])
      ]),
      w("tbody", null, [
        (u(!0), p(H, null, Y($(n), (L) => (u(), p("tr", {
          key: L.key,
          class: "dc-table__row",
          onClick: (z) => s(L.row, z)
        }, [
          $(t).selectable.value ? (u(), p("td", Or, [
            G(Ce, {
              row: L.row,
              selected: L.selected,
              name: L.parts.identity
            }, null, 8, ["row", "selected", "name"])
          ])) : M("", !0),
          d.value ? (u(), p("td", Ar, [
            h(L) !== null ? (u(), I(Rt, {
              key: 0,
              standing: g(L),
              name: L.parts.identity,
              onSet: (z) => S(L, z)
            }, null, 8, ["standing", "name", "onSet"])) : M("", !0)
          ])) : M("", !0),
          (u(!0), p(H, null, Y($(a), (z, ie) => (u(), p("td", {
            key: $(dn)(z, ie),
            class: de(X(z)),
            "data-dc-align": $(fn)(z),
            "data-dc-hide": z.hideBelow,
            title: V(z, L)
          }, [
            o.value.get(L.key) ? (u(), I(fe, {
              key: 0,
              class: "dc-table__cell-link",
              href: o.value.get(L.key),
              tabindex: z === l.value ? void 0 : -1,
              "aria-hidden": z === l.value ? void 0 : "true",
              "aria-label": z === l.value ? L.parts.identity : void 0,
              onPress: (re, te) => i(L.row, re, te)
            }, null, 8, ["href", "tabindex", "aria-hidden", "aria-label", "onPress"])) : M("", !0),
            z === c.value ? (u(), p("span", Ir, [
              G(xn, {
                column: z,
                entry: L
              }, null, 8, ["column", "entry"]),
              G(je, { entry: L }, null, 8, ["entry"]),
              G(We, { entry: L }, null, 8, ["entry"])
            ])) : (u(), I(xn, {
              key: 2,
              column: z,
              entry: L
            }, null, 8, ["column", "entry"]))
          ], 10, Nr))), 128))
        ], 8, Mr))), 128))
      ])
    ], 8, xr)) : (u(), p("p", br, [
      N[2] || (N[2] = w("span", { class: "dc-table__headline" }, "No columns declared", -1)),
      w("span", $r, [
        se(P(j.value) + " has no ", 1),
        N[0] || (N[0] = w("code", null, "columns", -1)),
        N[1] || (N[1] = se(" in the schema, so there is no table to draw. ", -1))
      ])
    ]));
  }
}), ga = /* @__PURE__ */ D(Rr, [["__scopeId", "data-v-04d33c1b"]]);
function Br(e) {
  const t = ye([]), n = R(!1), a = ye(null);
  let s = 0;
  const o = (r, c, d, h, g) => ({
    entity: r,
    rows: e.limit.value > 0 ? c.rows.map((S, b) => fa(S, b, r, e.isPinned(S.id))) : [],
    total: c.total,
    count: d ? Tt(r) : Ye(c.total),
    pinned: qr(h, c, g)
  }), l = () => {
    const r = ++s, c = e.query.value, d = e.schema.value, h = e.entities.value, g = e.limit.value, S = e.within?.value.trim() ?? "", b = Vt(c) && !S, y = S ? zt(S, c.expr) : c.expr, k = h.map((v) => ({
      entity: v,
      // Scope the query to this entity, keeping the expression and ordering.
      outcome: e.source.value.query({
        // Each card is the top few of its type, wherever the shell's own
        // result set has been paged to — so this asks for the first page.
        query: { ...c, entity: v.key, expr: y, page: 1 },
        schema: d,
        entity: v,
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
    if (k.every(({ outcome: v }) => !(v instanceof Promise))) {
      t.value = k.map(
        ({ entity: v, outcome: _ }) => o(v, _, b, d, y)
      ), a.value = null, n.value = !1;
      return;
    }
    n.value = !0, Promise.all(k.map(({ outcome: v }) => Promise.resolve(v))).then((v) => {
      r === s && (t.value = v.map(
        (_, m) => o(k[m].entity, _, b, d, y)
      ), a.value = null);
    }).catch((v) => {
      r === s && (a.value = v, t.value = []);
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
  ), { previews: t, pending: n, error: a, refresh: i };
}
function qr(e, t, n) {
  const a = t.rows[0];
  if (t.total !== 1 || t.rows.length !== 1 || !a)
    return !1;
  const s = n.trim();
  if (!s)
    return !1;
  const o = et(e, a);
  return !!o && De(s, o) === s;
}
const Fr = ["data-dc-pending", "data-dc-heads-only"], Hr = {
  key: 0,
  class: "dc-types__state",
  role: "alert"
}, Dr = {
  key: 1,
  class: "dc-types__state",
  "aria-live": "polite"
}, Vr = {
  key: 2,
  class: "dc-types__state"
}, Kr = ["data-dc-empty"], Wr = { class: "dc-type__name" }, jr = { class: "dc-type__count dc-mono" }, Ur = { class: "dc-type__sr" }, zr = {
  key: 0,
  class: "dc-type__description"
}, Qr = {
  key: 0,
  class: "dc-type__empty"
}, Gr = { class: "dc-type__identity" }, Yr = { class: "dc-type__primary dc-truncate" }, Xr = { class: "dc-type__secondary dc-mono dc-truncate" }, Jr = { class: "dc-type__trailing dc-mono" }, Zr = { class: "dc-type__metric-value" }, ei = { class: "dc-type__metric-label" }, ti = {
  key: 0,
  class: "dc-type__date"
}, ni = ["onClick"], ai = /* @__PURE__ */ q({
  __name: "TypeCardsView",
  setup(e) {
    const t = Z(), { previews: n, pending: a, error: s } = Br({
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
      "data-dc-pending": $(a) ? "true" : "false",
      "data-dc-heads-only": l.value ? "true" : "false"
    }, [
      U(r.$slots, "before", {}, void 0, !0),
      $(s) ? (u(), p("p", Hr, " Could not load results: " + P($(s) instanceof Error ? $(s).message : "the data source failed."), 1)) : !i.value.length && $(a) ? (u(), p("p", Dr, " Running query… ")) : i.value.length ? M("", !0) : (u(), p("p", Vr, P(o.value ? "Nothing matches this query" : "Nothing here yet"), 1)),
      (u(!0), p(H, null, Y(i.value, (d) => (u(), p("section", {
        key: d.entity.key,
        class: "dc-type",
        "data-dc-empty": d.total ? "false" : "true"
      }, [
        G(fe, {
          class: "dc-type__head",
          href: $(t).entityHref(d.entity.key),
          onPress: (h) => $(t).setEntity(d.entity.key)
        }, {
          default: ne(() => [
            w("span", Wr, P(d.entity.label), 1),
            w("span", jr, P(d.count), 1),
            c[0] || (c[0] = w("span", {
              class: "dc-type__go",
              "aria-hidden": "true"
            }, "→", -1)),
            w("span", Ur, "Show only " + P(d.entity.label.toLowerCase()), 1),
            d.entity.description ? (u(), p("span", zr, P(d.entity.description), 1)) : M("", !0)
          ]),
          _: 2
        }, 1032, ["href", "onPress"]),
        d.total ? M("", !0) : (u(), p("p", Qr, P(o.value ? "No matches" : "Nothing here yet"), 1)),
        (u(!0), p(H, null, Y(d.rows, (h) => (u(), p("div", {
          key: h.key,
          class: "dc-type__row"
        }, [
          G(fe, {
            class: "dc-type__open",
            href: $(t).pressHref(h.row),
            onPress: (g) => $(t).activate(h.row, g)
          }, {
            default: ne(() => [
              w("span", Gr, [
                w("span", Yr, P(h.parts.identity), 1),
                w("span", Xr, P(h.parts.reference), 1)
              ])
            ]),
            _: 2
          }, 1032, ["href", "onPress"]),
          w("span", Jr, [
            (u(!0), p(H, null, Y(h.parts.metrics.slice(0, 1), (g) => (u(), I(Ke, {
              key: g.column.key ?? g.label,
              class: "dc-type__metric",
              entry: h,
              column: g.column
            }, {
              default: ne(() => [
                w("span", Zr, P(g.text), 1),
                w("span", ei, P(g.label), 1)
              ]),
              _: 2
            }, 1032, ["entry", "column"]))), 128)),
            h.parts.updated ? (u(), p("span", ti, P(h.parts.updated), 1)) : M("", !0),
            G(tn, { entry: h }, null, 8, ["entry"]),
            G(je, { entry: h }, null, 8, ["entry"]),
            G(We, { entry: h }, null, 8, ["entry"])
          ])
        ]))), 128)),
        d.entity.create && !l.value ? (u(), p("button", {
          key: 1,
          type: "button",
          class: "dc-type__new",
          onClick: (h) => $(t).create(d.entity)
        }, [
          c[1] || (c[1] = w("span", {
            class: "dc-type__plus",
            "aria-hidden": "true"
          }, "+", -1)),
          se(" " + P(d.entity.create), 1)
        ], 8, ni)) : M("", !0)
      ], 8, Kr))), 128)),
      U(r.$slots, "after", {}, void 0, !0)
    ], 8, Fr));
  }
}), ka = /* @__PURE__ */ D(ai, [["__scopeId", "data-v-9cb44b6c"]]), si = ["data-dc-pending", "data-dc-more"], oi = {
  key: 0,
  class: "dc-results__state dc-results__state--loading",
  "aria-live": "polite"
}, li = {
  key: 2,
  class: "dc-results__state",
  role: "alert"
}, ri = { class: "dc-results__detail" }, ii = {
  key: 3,
  class: "dc-results__state",
  "aria-live": "polite"
}, ci = {
  key: 4,
  class: "dc-results__state"
}, ui = { class: "dc-results__detail" }, di = /* @__PURE__ */ q({
  __name: "ResultsArea",
  props: {
    views: {},
    loading: { type: Boolean }
  },
  setup(e) {
    const t = e, n = Z(), a = st(), s = {
      list: Bt,
      cards: pa,
      grid: ha,
      images: ma,
      table: ga,
      links: ya,
      preview: _a
    }, o = f(() => Kt(n.query.value, t.views)), l = f(() => Dt(n.query.value.view, t.views)), i = f(() => s[l.value] ?? Bt), r = f(() => n.rows.value.length > 0), c = f(() => n.error.value !== null), d = R(null);
    ee(
      // The page on screen, which is the draft's own while one is being typed.
      () => n.liveQuery.value.page,
      () => {
        d.value && (d.value.scrollTop = 0);
      }
    );
    const h = R(""), g = R({ x: 0, y: 0 }), S = R(0);
    function b() {
      const v = d.value;
      if (!v) {
        h.value = "";
        return;
      }
      const _ = {
        top: v.scrollTop > 1,
        right: v.scrollWidth - v.clientWidth - v.scrollLeft > 1,
        bottom: v.scrollHeight - v.clientHeight - v.scrollTop > 1,
        left: v.scrollLeft > 1
      };
      h.value = Object.entries(_).filter(([, m]) => m).map(([m]) => m).join(" "), g.value = {
        x: v.offsetHeight - v.clientHeight,
        y: v.offsetWidth - v.clientWidth
      }, S.value = v.querySelector("[data-dc-stuck]")?.offsetHeight ?? 0;
    }
    let y = null, k = null;
    return ee(
      d,
      (v, _) => {
        if (_?.removeEventListener("scroll", b), y?.disconnect(), k?.disconnect(), y = null, k = null, b(), !v || (v.addEventListener("scroll", b, { passive: !0 }), typeof ResizeObserver > "u")) return;
        const m = new ResizeObserver(b), x = () => {
          m.disconnect(), m.observe(v);
          for (const O of v.children) m.observe(O);
        };
        x(), y = m, !(typeof MutationObserver > "u") && (k = new MutationObserver(() => {
          x(), b();
        }), k.observe(v, { childList: !0 }));
      },
      { flush: "post" }
    ), _e(() => {
      d.value?.removeEventListener("scroll", b), y?.disconnect(), k?.disconnect();
    }), (v, _) => (u(), p("div", {
      ref_key: "scroller",
      ref: d,
      class: "dc-results",
      "data-dc-pending": $(n).pending.value ? "true" : "false",
      "data-dc-more": h.value,
      style: ae({
        "--dc-results-gutter-x": `${g.value.x}px`,
        "--dc-results-gutter-y": `${g.value.y}px`,
        "--dc-results-stuck": `${S.value}px`
      })
    }, [
      e.loading ? (u(), p("p", oi, [..._[1] || (_[1] = [
        w("span", { class: "dc-results__detail" }, "Loading…", -1)
      ])])) : o.value ? (u(), I(ka, { key: 1 }, Pt({ _: 2 }, [
        a["cards-before"] ? {
          name: "before",
          fn: ne(() => [
            U(v.$slots, "cards-before", {}, void 0, !0)
          ]),
          key: "0"
        } : void 0,
        a["cards-after"] ? {
          name: "after",
          fn: ne(() => [
            U(v.$slots, "cards-after", {}, void 0, !0)
          ]),
          key: "1"
        } : void 0
      ]), 1024)) : c.value ? (u(), p("p", li, [
        _[2] || (_[2] = w("span", { class: "dc-results__headline" }, "Could not load results", -1)),
        w("span", ri, P($(n).error.value instanceof Error ? $(n).error.value.message : "The data source failed."), 1)
      ])) : !r.value && $(n).pending.value ? (u(), p("p", ii, [..._[3] || (_[3] = [
        w("span", { class: "dc-results__detail" }, "Running query…", -1)
      ])])) : r.value ? (u(), I(it(i.value), { key: 5 })) : (u(), p("div", ci, [
        _[4] || (_[4] = w("span", { class: "dc-results__headline" }, "Nothing matches this query", -1)),
        w("span", ui, P($(n).summary.value), 1),
        $(n).isPristine.value ? M("", !0) : (u(), p("button", {
          key: 0,
          type: "button",
          class: "dc-results__clear",
          onClick: _[0] || (_[0] = (m) => $(n).clearFilters())
        }, P($(n).isEverything.value ? "Clear filters" : "Search everything instead"), 1))
      ]))
    ], 12, si));
  }
}), wa = /* @__PURE__ */ D(di, [["__scopeId", "data-v-71c5b73f"]]), fi = ["data-dc-theme"], vi = { class: "dc-shell__head" }, pi = {
  key: 0,
  class: "dc-shell__page"
}, hi = /* @__PURE__ */ q({
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
    const a = e, s = n, o = ln(e, "pinned"), l = ln(e, "selected"), i = st(), r = qt(Ln, null), c = a.route || r ? null : qa(), d = a.route ?? r ?? c;
    _e(() => c?.dispose?.());
    const h = R(!!i.page);
    La(() => {
      h.value = !!i.page;
    });
    const g = Fa(d, {
      detached: () => h.value && a.pageQuery === "detached",
      path: () => a.listPath
    }), S = f(() => Os({ seed: a.schema.key })), b = f(() => a.source ?? S.value), y = Js({
      schema: () => a.schema,
      adapter: g,
      defaults: () => a.defaults,
      navigationMode: () => a.navigationMode,
      facetNavigationMode: () => a.facetNavigationMode
    }), k = f(() => a.within?.trim() ?? ""), v = to({
      query: y.query,
      entity: y.entity,
      schema: f(() => a.schema),
      setExpression: y.setExpression
    }), _ = Zs({
      source: b,
      query: v.live,
      schema: f(() => a.schema),
      entity: y.entity,
      limit: f(() => a.limit),
      within: k
    });
    ee(y.query, (T) => s("query-change", T));
    const m = f(() => Hs(a.schema, [y.query.value.expr])), x = f(
      () => m.value.flatMap((T) => {
        const F = a.schema.entities.find((Q) => Q.key === T.entityKey);
        return F ? [{ ...T, entity: F }] : [];
      })
    );
    function O() {
      if (i.record) return x.value;
      const T = a.recordCards;
      return T ? x.value.filter((F) => T[F.entityKey]) : [];
    }
    const j = f(() => {
      const T = a.views;
      return typeof T != "function" ? T : T({ entity: y.entity.value, records: m.value });
    });
    ee(
      [_.pageCount, _.pending, y.query, v.drafting, () => a.loading, h],
      () => {
        if (_.pending.value || v.drafting.value || a.loading || h.value) return;
        const T = _.pageCount.value;
        y.query.value.page > T && y.setPage(T, "replace");
      },
      // Immediately, since a pasted URL is past the end before anything changes;
      // and after the render, so the correction is a navigation the mounted shell
      // makes rather than one it makes on the way up. An async source is still
      // pending here and corrects itself when its count lands.
      { immediate: !0, flush: "post" }
    );
    const le = f(() => new Set(o.value));
    function K(T) {
      const F = new Set(le.value);
      F.has(T.id) ? F.delete(T.id) : F.add(T.id), o.value = [...F], s("toggle-pin", T);
    }
    const W = f(() => {
      if (a.selectable === !0) return !0;
      const T = y.entity.value;
      return !!(T?.duplicate || T?.delete || T?.operations?.length);
    }), X = f(() => new Set(l.value));
    function V(T) {
      const F = new Set(X.value);
      F.has(T.id) ? F.delete(T.id) : F.add(T.id), l.value = [...F];
    }
    function C(T) {
      const F = new Set(X.value);
      for (const Q of _.rows.value)
        T ? F.add(Q.id) : F.delete(Q.id);
      l.value = [...F];
    }
    function N() {
      l.value.length && (l.value = []);
    }
    const L = f(() => ({
      ids: [...l.value],
      rows: _.rows.value.filter((T) => X.value.has(T.id)),
      entity: y.entity.value
    }));
    ee(() => y.query.value.entity, N);
    function z(T, F, Q = {}) {
      const Ue = xt(a.schema, y.query.value, T, Q);
      Q.exclude ? y.narrow(Ue, F?.key ?? y.query.value.entity) : v.release(() => y.narrow(Ue, F?.key ?? null, F ? void 0 : "cards")), s("drill", T, F, Q);
    }
    function ie(T) {
      return a.rowPress === "narrow" && et(a.schema, T) !== null;
    }
    function re(T) {
      return a.schema.entities.find((Q) => Q.key === T.entityKey)?.href?.(T) || null;
    }
    const te = Ds({
      ...y,
      draft: v.text,
      liveQuery: v.live,
      drafting: v.drafting,
      commitDraft: v.commit,
      abandonDraft: v.abandon,
      /*
       * A page of what is on screen: the draft's, while one is live, which are
       * held beside it rather than in the URL — see `liveQuery`.
       */
      setPage: (T, F) => {
        v.drafting.value ? v.setPage(T) : y.setPage(T, F);
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
      source: b,
      previewsPerType: f(() => a.previewsPerType),
      within: k,
      pinnable: f(() => a.pinnable === !0),
      isPinned: (T) => le.value.has(T.id),
      isPinnedId: (T) => le.value.has(T),
      togglePin: K,
      selectable: W,
      selection: L,
      isSelected: (T) => X.value.has(T.id),
      toggleSelect: V,
      selectPage: C,
      clearSelection: N,
      narrowsOnPress: f(() => a.rowPress === "narrow"),
      rowLinks: f(() => a.rowLinks),
      /*
       * The one place a press is read, so every view gets the same answer without
       * knowing which of the two it is: they all call this.
       */
      activate: (T, F = {}) => {
        if (ie(T)) {
          z(T, null, F);
          return;
        }
        const Q = re(T);
        if (Q) {
          window.open(Q, "_blank", "noopener");
          return;
        }
        s("activate", T);
      },
      pressHref: (T) => ie(T) ? y.narrowHref(xt(a.schema, y.query.value, T), null, "cards") : re(T),
      recordHref: re,
      drillHref: (T, F) => et(a.schema, T) ? y.narrowHref(
        xt(a.schema, y.query.value, T),
        F?.key ?? null,
        F ? void 0 : "cards"
      ) : null,
      create: (T) => s("create", T),
      duplicate: () => s("duplicate", L.value),
      delete: () => s("delete", L.value),
      operate: (T) => s("operate", T, L.value),
      drill: z
    });
    Ws({ theme: () => a.theme, accent: () => a.accent, tokens: () => a.tokens });
    const kt = f(() => {
      if (!(!a.accent && !a.tokens))
        return { ...a.tokens, ...a.accent ? { "--dc-accent": a.accent } : {} };
    });
    return t({
      query: y.query
    }), (T, F) => (u(), p("div", {
      class: "dc-shell",
      "data-dc-theme": e.theme,
      style: ae(kt.value)
    }, [
      w("div", vi, [
        G(ca, {
          views: j.value,
          "pages-note": e.pagesNote,
          "hide-pages": e.loading || h.value
        }, Pt({ _: 2 }, [
          i.brand ? {
            name: "brand",
            fn: ne((Q) => [
              U(T.$slots, "brand", Ta(Ma(Q)), void 0, !0)
            ]),
            key: "0"
          } : void 0,
          i.actions ? {
            name: "actions",
            fn: ne(() => [
              U(T.$slots, "actions", {}, void 0, !0)
            ]),
            key: "1"
          } : void 0
        ]), 1032, ["views", "pages-note", "hide-pages"])
      ]),
      i.page ? (u(), p("div", pi, [
        U(T.$slots, "page", {
          query: $(te).query.value
        }, void 0, !0)
      ])) : M("", !0),
      i.page ? M("", !0) : (u(), I(da, {
        key: 1,
        views: j.value,
        "type-chooser": e.typeChooser,
        "selection-placement": e.selectionPlacement
      }, null, 8, ["views", "type-chooser", "selection-placement"])),
      i.page ? M("", !0) : U(T.$slots, "results", {
        rows: $(te).rows.value,
        total: $(te).total.value,
        offset: $(te).offset.value,
        pageCount: $(te).pageCount.value,
        query: $(te).liveQuery.value,
        pending: $(te).pending.value,
        loading: e.loading
      }, () => [
        G(wa, {
          views: j.value,
          loading: e.loading
        }, Pt({ _: 2 }, [
          i["cards-before"] || O().length ? {
            name: "cards-before",
            fn: ne(() => [
              (u(!0), p(H, null, Y(O(), (Q) => (u(), p(H, {
                key: `${Q.entityKey}:${Q.id}`
              }, [
                i.record ? U(T.$slots, "record", {
                  id: Q.id,
                  entity: Q.entity
                }, void 0, !0, 0) : (u(), I(it(e.recordCards?.[Q.entityKey]), {
                  key: 1,
                  id: Q.id
                }, null, 8, ["id"]))
              ], 64))), 128)),
              U(T.$slots, "cards-before", {}, void 0, !0)
            ]),
            key: "0"
          } : void 0,
          i["cards-after"] ? {
            name: "cards-after",
            fn: ne(() => [
              U(T.$slots, "cards-after", {}, void 0, !0)
            ]),
            key: "1"
          } : void 0
        ]), 1032, ["views", "loading"])
      ], !0, 2)
    ], 12, fi));
  }
}), mi = /* @__PURE__ */ D(hi, [["__scopeId", "data-v-07767e0e"]]), yi = ["data-dc-muted", "data-dc-collapsed"], _i = ["data-dc-collapsible"], gi = ["aria-expanded", "aria-controls"], ki = { class: "dc-shell-card__sr" }, wi = {
  key: 0,
  class: "dc-shell-card__identity"
}, bi = { class: "dc-shell-card__title dc-shell-card__name" }, $i = {
  key: 0,
  class: "dc-shell-card__ref dc-mono"
}, xi = {
  key: 1,
  class: "dc-shell-card__title"
}, Si = {
  key: 2,
  class: "dc-shell-card__count dc-mono"
}, Ci = {
  key: 1,
  class: "dc-shell-card__aside"
}, Ei = ["data-dc-flush"], Pi = /* @__PURE__ */ q({
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
    const n = e, a = t, s = R(n.defaultCollapsed === !0), o = f(() => n.span === "all" ? { gridColumn: "1 / -1" } : void 0), l = st();
    function i(K) {
      return r(K?.() ?? []);
    }
    function r(K) {
      return K.some((W) => W.type === Oa ? !1 : W.type === Aa ? String(W.children ?? "").trim().length > 0 : W.type === H ? r(W.children ?? []) : !0);
    }
    const c = f(
      () => !!n.title || !!n.name || d.value || i(l.head)
    ), d = f(() => i(l.aside)), h = f(() => i(l.default)), g = f(() => i(l.foot)), S = f(
      () => !!n.name && (!!n.reference || i(l.reference))
    ), b = f(() => n.collapsible === !0 && c.value), y = f(() => b.value && (n.collapsed ?? s.value));
    function k() {
      const K = !y.value;
      s.value = K, a("update:collapsed", K);
    }
    const v = Ht() ?? "dc-shell-card", _ = `${v}-body`, m = `${v}-foot`, x = f(
      () => [h.value ? _ : "", g.value ? m : ""].filter(Boolean).join(" ") || void 0
    ), O = [
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
    ].join(", "), j = R(null);
    function le(K) {
      if (!b.value) return;
      const W = K.target?.closest(O);
      W && j.value?.contains(W) || typeof window < "u" && window.getSelection()?.toString() || k();
    }
    return (K, W) => (u(), p("section", {
      class: "dc-shell-card",
      style: ae(o.value),
      "data-dc-muted": e.muted ? "true" : "false",
      "data-dc-collapsed": y.value ? "true" : "false"
    }, [
      c.value ? (u(), p("header", {
        key: 0,
        ref_key: "head",
        ref: j,
        class: "dc-shell-card__head",
        "data-dc-collapsible": b.value ? "true" : "false",
        onClick: le
      }, [
        b.value ? (u(), p("button", {
          key: 0,
          type: "button",
          class: "dc-shell-card__toggle",
          "aria-expanded": y.value ? "false" : "true",
          "aria-controls": x.value,
          onClick: k
        }, [
          W[0] || (W[0] = w("svg", {
            class: "dc-shell-card__chevron",
            viewBox: "0 0 10 10",
            "aria-hidden": "true"
          }, [
            w("path", { d: "M2 3.5 5 6.5 8 3.5" })
          ], -1)),
          w("span", ki, P(e.name || e.title || "Card"), 1)
        ], 8, gi)) : M("", !0),
        U(K.$slots, "head", {}, () => [
          e.name ? (u(), p("div", wi, [
            w("h2", bi, P(e.name), 1),
            S.value ? (u(), p("span", $i, [
              U(K.$slots, "reference", {}, () => [
                se(P(e.reference), 1)
              ], !0)
            ])) : M("", !0)
          ])) : (u(), p("h2", xi, P(e.title), 1)),
          e.count !== void 0 ? (u(), p("span", Si, P(e.count), 1)) : M("", !0)
        ], !0),
        d.value ? (u(), p("span", Ci, [
          U(K.$slots, "aside", {}, void 0, !0)
        ])) : M("", !0)
      ], 8, _i)) : M("", !0),
      h.value ? Et((u(), p("div", {
        key: 1,
        id: _,
        class: "dc-shell-card__body",
        "data-dc-flush": e.flush ? "true" : "false"
      }, [
        U(K.$slots, "default", {}, void 0, !0)
      ], 8, Ei)), [
        [cn, !y.value]
      ]) : M("", !0),
      g.value ? Et((u(), p("footer", {
        key: 2,
        id: m,
        class: "dc-shell-card__foot"
      }, [
        U(K.$slots, "foot", {}, void 0, !0)
      ], 512)), [
        [cn, !y.value]
      ]) : M("", !0)
    ], 12, yi));
  }
}), Nc = /* @__PURE__ */ D(Pi, [["__scopeId", "data-v-073304c8"]]), Li = ["aria-label"], Ti = ["aria-checked", "data-dc-active", "tabindex", "onClick", "onKeydown"], Mi = /* @__PURE__ */ q({
  __name: "SegmentedControl",
  props: {
    modelValue: {},
    options: {},
    label: {},
    mono: { type: Boolean }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const n = e, a = t, s = R([]);
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
      (u(!0), p(H, null, Y(e.options, (r, c) => (u(), p("button", {
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
      }, P(r.label), 43, Ti))), 128))
    ], 8, Li));
  }
}), Oi = /* @__PURE__ */ D(Mi, [["__scopeId", "data-v-63fb5482"]]), Ai = { class: "dc-fact__label" }, Ni = ["title"], Ii = /* @__PURE__ */ q({
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
    return (s, o) => (u(), p("div", {
      class: "dc-fact",
      style: ae(a.value)
    }, [
      w("dt", Ai, [
        U(s.$slots, "label", {}, () => [
          se(P(e.label), 1)
        ], !0)
      ]),
      w("dd", {
        class: "dc-fact__value dc-mono",
        title: e.title
      }, [
        U(s.$slots, "default", {}, () => [
          n.value.length === 1 ? (u(), p(H, { key: 0 }, [
            se(P(n.value[0]), 1)
          ], 64)) : (u(!0), p(H, { key: 1 }, Y(n.value, (l, i) => (u(), p("span", {
            key: i,
            class: "dc-fact__line"
          }, P(l), 1))), 128))
        ], !0)
      ], 8, Ni)
    ], 4));
  }
}), Ri = /* @__PURE__ */ D(Ii, [["__scopeId", "data-v-1f6d25e6"]]), Bi = /* @__PURE__ */ q({
  __name: "ShellFacts",
  props: {
    items: { default: () => [] },
    min: { default: "200px" }
  },
  setup(e) {
    const t = e, n = f(() => ({ "--dc-facts-min": t.min }));
    return (a, s) => (u(), p("dl", {
      class: "dc-facts",
      style: ae(n.value)
    }, [
      (u(!0), p(H, null, Y(e.items, (o, l) => (u(), I(Ri, {
        key: `${l}:${o.label}`,
        label: o.label,
        value: o.value,
        title: o.title,
        wide: o.wide
      }, null, 8, ["label", "value", "title", "wide"]))), 128)),
      U(a.$slots, "default", {}, void 0, !0)
    ], 4));
  }
}), Ic = /* @__PURE__ */ D(Bi, [["__scopeId", "data-v-17455afa"]]), qi = { class: "dc-counts" }, Fi = ["data-dc-tone"], Hi = {
  key: 0,
  class: "dc-counts__empty"
}, Di = /* @__PURE__ */ q({
  __name: "StatusCounts",
  props: {
    counts: {},
    empty: { default: me }
  },
  setup(e) {
    const t = e, n = f(() => t.counts.filter((a) => a.count > 0));
    return (a, s) => (u(), p("span", qi, [
      (u(!0), p(H, null, Y(n.value, (o) => (u(), p("span", {
        key: o.label,
        class: "dc-counts__count",
        "data-dc-tone": o.tone ?? "neutral"
      }, P(o.count) + " " + P(o.label), 9, Fi))), 128)),
      n.value.length === 0 ? (u(), p("span", Hi, P(e.empty), 1)) : M("", !0)
    ]));
  }
}), Rc = /* @__PURE__ */ D(Di, [["__scopeId", "data-v-5553a9e2"]]), Vi = ["data-dc-copied", "title", "aria-label"], Ki = {
  key: 0,
  class: "dc-copy__mark",
  viewBox: "0 0 16 16",
  "aria-hidden": "true"
}, Wi = {
  key: 1,
  class: "dc-copy__mark",
  viewBox: "0 0 16 16",
  "aria-hidden": "true"
}, ji = 1500, Ui = /* @__PURE__ */ q({
  __name: "CopyButton",
  props: {
    text: {},
    label: { default: "Copy to clipboard" }
  },
  emits: ["copied", "error"],
  setup(e, { emit: t }) {
    const n = e, a = t, s = R(!1);
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
      }, ji), a("copied", i);
    }
    return _e(() => clearTimeout(o)), (i, r) => (u(), p("button", {
      type: "button",
      class: "dc-copy",
      "data-dc-copied": s.value ? "true" : "false",
      title: s.value ? "Copied" : e.label,
      "aria-label": e.label,
      onClick: l
    }, [
      s.value ? (u(), p("svg", Wi, [...r[1] || (r[1] = [
        w("path", { d: "M3 8.5l3.2 3L13 4.5" }, null, -1)
      ])])) : (u(), p("svg", Ki, [...r[0] || (r[0] = [
        w("rect", {
          x: "5.5",
          y: "5.5",
          width: "8",
          height: "9",
          rx: "1.5"
        }, null, -1),
        w("path", { d: "M10.5 3.5v-1a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h1" }, null, -1)
      ])]))
    ], 8, Vi));
  }
}), zi = /* @__PURE__ */ D(Ui, [["__scopeId", "data-v-f4249d7f"]]), Qi = ["data-dc-copy", "data-dc-wrap", "data-dc-tone"], Gi = /* @__PURE__ */ q({
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
    const n = e, a = t, s = R(null), o = f(() => n.maxHeight === void 0 ? void 0 : { maxHeight: typeof n.maxHeight == "number" ? `${n.maxHeight}px` : n.maxHeight });
    function l() {
      return n.code ?? s.value?.textContent ?? "";
    }
    return (i, r) => (u(), p("div", {
      class: "dc-code",
      "data-dc-copy": e.copy ? "true" : "false",
      "data-dc-wrap": e.wrap ? "true" : "false",
      "data-dc-tone": e.tone
    }, [
      w("pre", {
        ref_key: "pre",
        ref: s,
        class: "dc-code__text dc-mono",
        style: ae(o.value)
      }, [
        U(i.$slots, "default", {}, () => [
          se(P(e.code), 1)
        ], !0)
      ], 4),
      e.copy ? (u(), I(zi, {
        key: 0,
        class: "dc-code__copy",
        text: l,
        label: e.copyLabel,
        onCopied: r[0] || (r[0] = (c) => a("copied", c)),
        onError: r[1] || (r[1] = (c) => a("error", c))
      }, null, 8, ["label"])) : M("", !0)
    ], 8, Qi));
  }
}), Bc = /* @__PURE__ */ D(Gi, [["__scopeId", "data-v-67b371dd"]]), Yi = 24, Xi = /* @__PURE__ */ q({
  __name: "ShellLog",
  props: {
    fetchChunk: {},
    stripAnsi: { type: Boolean },
    maxHeight: { default: "460px" }
  },
  setup(e, { expose: t }) {
    const n = e, a = R(""), s = f(() => n.stripAnsi ? za(a.value) : a.value), o = R(null);
    let l = 0, i = null;
    function r() {
      return i ??= c().finally(() => {
        i = null;
      }), i;
    }
    async function c() {
      const { chunk: g, offset: S } = await n.fetchChunk(l);
      if (l = S, !g) return;
      const b = o.value, y = !b || b.scrollTop + b.clientHeight >= b.scrollHeight - Yi;
      a.value += g, y && (await ot(), o.value && (o.value.scrollTop = o.value.scrollHeight));
    }
    function d() {
      a.value = "", l = 0;
    }
    const h = f(() => n.maxHeight === void 0 ? void 0 : { maxHeight: typeof n.maxHeight == "number" ? `${n.maxHeight}px` : n.maxHeight });
    return t({ poll: r, reset: d }), (g, S) => (u(), p("pre", {
      ref_key: "pane",
      ref: o,
      class: "dc-log dc-mono",
      style: ae(h.value)
    }, P(s.value), 5));
  }
}), qc = /* @__PURE__ */ D(Xi, [["__scopeId", "data-v-2c86947e"]]), Ji = ["data-dc-theme"], Zi = ["aria-labelledby", "aria-label"], ec = {
  key: 1,
  class: "dc-dialog__actions"
}, Me = [], tc = /* @__PURE__ */ q({
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
    const n = e, a = t, { theme: s, style: o, adopt: l } = Jt(n), i = `${Ht() ?? "dc-dialog"}-title`, r = R(null);
    function c() {
      a("close"), a("update:open", !1);
    }
    const d = Symbol("dc-dialog");
    function h(m) {
      m.key !== "Escape" || m.defaultPrevented || Me[Me.length - 1] === d && (m.preventDefault(), c());
    }
    let g = !1;
    function S(m) {
      g = m.target === m.currentTarget;
    }
    function b(m) {
      m.target === m.currentTarget && g && c(), g = !1;
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
    async function v() {
      Me.push(d), document.addEventListener("keydown", h), k = document.activeElement instanceof HTMLElement ? document.activeElement : null, l(), await ot(), (r.value?.querySelector("[autofocus]") ?? r.value?.querySelector(y) ?? r.value)?.focus();
    }
    function _() {
      const m = Me.indexOf(d);
      m !== -1 && (Me.splice(m, 1), document.removeEventListener("keydown", h), k?.isConnected && k.focus(), k = null);
    }
    return rt(() => {
      n.open && v();
    }), ee(
      () => n.open,
      (m) => {
        m ? v() : _();
      }
    ), _e(_), (m, x) => e.open ? (u(), I(lt, {
      key: 0,
      to: e.to
    }, [
      w("div", {
        class: "dc-shell dc-layer dc-dialog",
        "data-dc-theme": $(s),
        style: ae($(o)),
        onPointerdown: S,
        onClick: b
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
          e.title ? (u(), p("h2", {
            key: 0,
            id: i,
            class: "dc-dialog__title"
          }, P(e.title), 1)) : M("", !0),
          w("div", {
            class: de(["dc-dialog__body", e.bodyClass])
          }, [
            U(m.$slots, "default", {}, void 0, !0)
          ], 2),
          m.$slots.actions ? (u(), p("div", ec, [
            U(m.$slots, "actions", {}, void 0, !0)
          ])) : M("", !0)
        ], 10, Zi)
      ], 44, Ji)
    ], 8, ["to"])) : M("", !0);
  }
}), Fc = /* @__PURE__ */ D(tc, [["__scopeId", "data-v-0cccf313"]]), nc = 4500, ac = 9e3, Fe = R([]);
let Sn = 0;
function ba(e) {
  Fe.value = Fe.value.filter((t) => t.id !== e);
}
function $a(e, t = "ok") {
  Sn += 1;
  const n = Sn;
  Fe.value = [...Fe.value, { id: n, message: e, kind: t }], setTimeout(() => ba(n), t === "err" ? ac : nc);
}
function sc(e) {
  $a(e instanceof Error ? e.message : String(e), "err");
}
function oc() {
  return { toasts: Na(Fe), toast: $a, toastError: sc, dismiss: ba };
}
const lc = ["data-dc-theme"], rc = ["data-dc-kind", "role"], ic = /* @__PURE__ */ q({
  __name: "ShellToasts",
  props: {
    to: { default: "body" },
    theme: { default: void 0 },
    accent: { default: void 0 },
    tokens: { default: void 0 }
  },
  setup(e) {
    const t = e, { toasts: n } = oc(), { theme: a, style: s, adopt: o } = Jt(t);
    return rt(o), (l, i) => (u(), I(lt, { to: e.to }, [
      w("div", {
        class: "dc-shell dc-layer dc-toasts",
        "data-dc-theme": $(a),
        style: ae($(s)),
        "aria-live": "polite"
      }, [
        (u(!0), p(H, null, Y($(n), (r) => (u(), p("div", {
          key: r.id,
          class: "dc-toast",
          "data-dc-kind": r.kind,
          role: r.kind === "err" ? "alert" : void 0
        }, P(r.message), 9, rc))), 128))
      ], 12, lc)
    ], 8, ["to"]));
  }
}), Hc = /* @__PURE__ */ D(ic, [["__scopeId", "data-v-d970211c"]]), cc = 4, uc = 8, dc = 180;
function fc(e, t, n, a = {}) {
  const s = a.gap ?? cc, o = a.margin ?? uc, l = a.flipBelow ?? dc, i = a.side ?? "below", r = {
    below: n.height - e.bottom - s - o,
    above: e.top - s - o
  }, c = i === "below" ? "above" : "below", d = r[i] < l && r[c] > r[i] ? c : i, h = Math.min(a.maxHeight ?? 1 / 0, Math.max(0, r[d])), g = Math.max(0, n.width - o * 2), S = Math.min(e.width, g), b = Math.min(Math.max(t, S), g), y = a.align === "end" ? e.right - b : e.left, k = Math.max(o, Math.min(y, n.width - b - o));
  return d === "below" ? { side: d, left: k, top: e.bottom + s, maxHeight: h, minWidth: S, maxWidth: g } : { side: d, left: k, bottom: n.height - e.top + s, maxHeight: h, minWidth: S, maxWidth: g };
}
const vc = ["data-dc-theme", "data-dc-side"], ge = [], pc = /* @__PURE__ */ q({
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
    const n = e, a = t, { theme: s, style: o, adopt: l } = Jt(n), i = R(null), r = R(null), c = { root: () => i.value };
    function d() {
      const m = n.anchor;
      m && (r.value = fc(
        m.getBoundingClientRect(),
        i.value?.offsetWidth ?? 0,
        { width: window.innerWidth, height: window.innerHeight },
        { side: n.side, align: n.align, maxHeight: n.maxHeight }
      ));
    }
    const h = f(() => {
      const m = r.value, x = m ? {
        position: "fixed",
        left: `${m.left}px`,
        ...m.top !== void 0 ? { top: `${m.top}px` } : {},
        ...m.bottom !== void 0 ? { bottom: `${m.bottom}px` } : {},
        minWidth: `${m.minWidth}px`,
        maxWidth: `${m.maxWidth}px`,
        maxHeight: `${m.maxHeight}px`,
        overflowY: "auto"
      } : { position: "fixed", visibility: "hidden" };
      return { ...o.value, ...x };
    });
    function g() {
      a("update:open", !1), a("close");
    }
    function S(m) {
      return i.value?.contains(m) || n.anchor?.contains(m) ? !0 : ge.slice(ge.indexOf(c) + 1).some((O) => O.root()?.contains(m));
    }
    function b(m) {
      const x = m.target;
      x && !S(x) && g();
    }
    function y(m) {
      m.key !== "Escape" || m.defaultPrevented || ge[ge.length - 1] === c && (m.preventDefault(), i.value?.contains(document.activeElement) && n.anchor?.focus(), g());
    }
    let k = null;
    async function v() {
      ge.includes(c) || (ge.push(c), l(), r.value = null, await ot(), d(), window.addEventListener("pointerdown", b, !0), document.addEventListener("keydown", y, !0), window.addEventListener("resize", d), window.addEventListener("scroll", d, !0), typeof ResizeObserver < "u" && i.value && (k = new ResizeObserver(() => d()), k.observe(i.value)));
    }
    function _() {
      const m = ge.indexOf(c);
      m !== -1 && (ge.splice(m, 1), window.removeEventListener("pointerdown", b, !0), document.removeEventListener("keydown", y, !0), window.removeEventListener("resize", d), window.removeEventListener("scroll", d, !0), k?.disconnect(), k = null);
    }
    return rt(() => {
      n.open && v();
    }), ee(
      () => n.open,
      (m) => {
        m ? v() : _();
      }
    ), ee(() => n.anchor, () => {
      n.open && d();
    }), _e(_), (m, x) => e.open ? (u(), I(lt, {
      key: 0,
      to: e.to
    }, [
      w("div", Ia({
        ref_key: "root",
        ref: i
      }, m.$attrs, {
        class: "dc-shell dc-layer dc-popover",
        "data-dc-theme": $(s),
        "data-dc-side": r.value?.side,
        style: h.value
      }), [
        U(m.$slots, "default", {}, void 0, !0)
      ], 16, vc)
    ], 8, ["to"])) : M("", !0);
  }
}), Dc = /* @__PURE__ */ D(pc, [["__scopeId", "data-v-73fbd235"]]);
function Vc(e, t) {
  const n = R(!1);
  let a = null, s = !1, o = 0;
  const l = () => {
    o++, n.value = !1, a !== null && (clearTimeout(a), a = null);
  };
  function i(d) {
    a = setTimeout(() => void r(d), t);
  }
  async function r(d) {
    if (s || d !== o) return;
    let h;
    try {
      h = await e();
    } catch {
      h = !1;
    }
    s || d !== o || (h ? i(d) : l());
  }
  const c = () => {
    n.value || (n.value = !0, r(++o));
  };
  return at(() => {
    s = !0, l();
  }, !0), { start: c, stop: l, polling: n };
}
function Kc(e, t = {}) {
  const n = t.key ?? ((o) => JSON.stringify(o)), a = ye();
  let s = null;
  return Ra(() => {
    const o = e(), l = n(o);
    l !== s && (s = l, a.value = o);
  }), a;
}
function Wc(e = {}) {
  return { key: "ordinal", kind: "ordinal", label: "#", width: "52px", ...e };
}
function jc(e = {}) {
  return { key: "status", role: "state", kind: "status", label: "State", sort: "state", width: "104px", ...e };
}
function Uc(e = {}) {
  return { key: "tint", role: "tint", ...e };
}
function zc(e = {}) {
  return { key: "picture", role: "image", kind: "image", width: "56px", height: "40px", ...e };
}
function Qc(e, t = {}) {
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
function Gc(e, t = {}) {
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
function Yc(e, t, n = {}) {
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
function Xc(e, t, n = {}) {
  return { key: e, kind: "date", label: t, sort: e, width: "104px", mono: !0, muted: !0, ...n };
}
function Jc(e = {}) {
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
function Zc(e, t, n = {}) {
  return { key: e, label: t, sort: e, truncate: !0, hideBelow: 900, ...n };
}
function eu(e, t, n, a = {}) {
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
function gt(e) {
  return typeof e == "number" ? e : typeof e == "string" && e.trim() !== "" ? Number(e) : Number.NaN;
}
function tu(e) {
  const t = gt(e);
  return Number.isFinite(t) && t > 0 ? Ka(t) : me;
}
function nu(e) {
  const t = gt(e);
  return Number.isFinite(t) && t > 0 ? Wa(t) : me;
}
function au(e) {
  const t = gt(e);
  return Number.isFinite(t) && t > 0 ? ja(t) : me;
}
function su(e) {
  const t = gt(e);
  return Number.isFinite(t) ? Ua(t) : me;
}
function hc(e) {
  if (e <= 0) return 0;
  const t = 10 ** Math.floor(Math.log10(e));
  for (const n of [1, 2, 5])
    if (e <= n * t) return n * t;
  return 10 * t;
}
function mc(e, t) {
  const n = /* @__PURE__ */ new Set();
  for (const a of e) {
    const s = a.fields[t];
    for (const o of Array.isArray(s) ? s : [s])
      typeof o == "string" && o && n.add(o);
  }
  return [...n].sort((a, s) => a.localeCompare(s));
}
function yc(e, t) {
  let n = 0;
  for (const a of e) {
    const s = a.fields[t];
    typeof s == "number" && s > n && (n = s);
  }
  return n;
}
function ou(e, t, n, a = {}) {
  return {
    kind: "chips",
    key: t,
    label: n,
    options: mc(e, t),
    ...a.multiple ? { multiple: !0 } : {}
  };
}
function lu(e, t, n) {
  return { kind: "range", key: t, label: n, min: 0, max: hc(yc(e, t)) };
}
function ru(e, t, n) {
  return { kind: "toggle", key: e, label: t, text: n };
}
function iu(e) {
  return e.filter((t) => t.kind === "chips" ? t.options.length > 1 : t.kind === "range" ? t.max > 0 : !0);
}
function cu(e = "", t = "/") {
  const n = R(ce(e)), a = R(t), s = [`${a.value}${n.value}`];
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
function uu(e) {
  const t = R(Cn(e.currentRoute.value.fullPath)), n = f(() => e.currentRoute.value.path), a = ee(
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
function du(e, t, n = "/") {
  return (a) => {
    const s = a.params[t], o = Array.isArray(s) ? s.join("/") : s ?? "", l = a.query[xe], i = typeof l == "string" ? l : "", r = `${e}="${o.replace(/"/g, "")}"`;
    return { path: n, query: { ...a.query, [xe]: De(i, r) } };
  };
}
function fu(e, t = "/") {
  return (n) => ({ path: t, query: { ...n.query, [Le]: e } });
}
function vu(e) {
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
function pu(e, t) {
  return e.query({ ...t, limit: Number.MAX_SAFE_INTEGER, offset: 0 }).rows;
}
const _c = {
  DataShell: mi,
  ShellHeader: ca,
  RecordActions: da,
  ResultsArea: wa,
  SegmentedControl: Oi,
  StatusPill: Ve,
  ListView: Bt,
  CardsView: pa,
  GridView: ha,
  ImagesView: ma,
  TableView: ga,
  LinksView: ya,
  PreviewView: _a,
  TypeCardsView: ka
}, hu = {
  install(e, t = {}) {
    const n = t.prefix ?? "";
    for (const [a, s] of Object.entries(_c))
      e.component(`${n}${a}`, s);
    t.route && e.provide(Ln, t.route), (t.theme || t.accent || t.tokens) && Ks({ theme: t.theme, accent: t.accent, tokens: t.tokens }, e);
  }
};
export {
  $c as COLUMN_BREAKPOINTS,
  bc as COLUMN_ROLES,
  pa as CardsView,
  xn as ColumnCell,
  zi as CopyButton,
  Ga as DEFAULT_ENTITY_VIEW,
  Lt as DEFAULT_SORT,
  Qa as DEFAULT_VIEW,
  eo as DRAFT_DELAY,
  mi as DataShell,
  me as EMPTY_CELL,
  Un as ENTITY_ALL,
  nt as ENTITY_TERM,
  qe as EXPRESSION_TERM,
  ha as GridView,
  hu as HeaderContentLayoutPlugin,
  ma as ImagesView,
  ya as LinksView,
  Bt as ListView,
  Xe as MOCK_TINTS,
  Ke as MetricDrill,
  We as OpenMark,
  Gt as PARAM_DIR,
  Le as PARAM_ENTITY,
  xe as PARAM_EXPR,
  vt as PARAM_PAGE,
  Qt as PARAM_SORT,
  ft as PARAM_VIEW,
  wc as PILL_TONES,
  dc as POPOVER_FLIP_BELOW,
  cc as POPOVER_GAP,
  uc as POPOVER_MARGIN,
  en as PinStar,
  _a as PreviewView,
  tn as QueryMark,
  Oe as RECORD_STATUSES,
  jt as RESULT_FIELDS,
  Ln as ROUTE_ADAPTER_KEY,
  da as RecordActions,
  wa as ResultsArea,
  na as SHELL_CONTEXT_KEY,
  tt as SHELL_THEME_KEY,
  je as ScopeMark,
  Oi as SegmentedControl,
  Ce as SelectTick,
  Nc as ShellCard,
  Bc as ShellCode,
  Fc as ShellDialog,
  Ri as ShellFact,
  Ic as ShellFacts,
  ca as ShellHeader,
  qc as ShellLog,
  Dc as ShellPopover,
  Hc as ShellToasts,
  Rt as StandingControl,
  Rc as StatusCounts,
  Ve as StatusPill,
  ac as TOAST_ERROR_MS,
  nc as TOAST_MS,
  ga as TableView,
  ka as TypeCardsView,
  Tn as VIEW_KINDS,
  Ya as VIEW_LABELS,
  De as addTerm,
  zt as andExpression,
  tu as bytesCell,
  In as cellFull,
  Pe as cellText,
  Ge as cellTextOf,
  ue as cellValue,
  wt as changesResults,
  ou as chipsFrom,
  fn as columnAlign,
  vn as columnClass,
  dn as columnKey,
  He as columnShortcut,
  Hn as columnShortcutOf,
  Mt as columnTruncates,
  ts as columnsFor,
  Bn as compactShortcuts,
  es as countPages,
  qa as createHistoryAdapter,
  cu as createMemoryAdapter,
  vu as createMemoryDataSource,
  Os as createMockDataSource,
  uu as createVueRouterAdapter,
  Xc as dateColumn,
  ss as defaultCellText,
  Wt as defaultQuery,
  Ne as defaultViewFor,
  Fa as detachableAdapter,
  xt as drillExpression,
  nu as durationCell,
  au as elapsedCell,
  Ja as emptyFacetValue,
  Rs as entityAddress,
  Jc as entityColumn,
  Tt as entityCount,
  fu as entityRedirect,
  Yn as excludingTerm,
  Be as expandShortcuts,
  Zc as facetColumn,
  aa as facetField,
  la as facetValue,
  vs as fieldHeading,
  Gn as fieldTerm,
  Ie as findEntity,
  zn as findEntityByAddress,
  ke as findSort,
  eu as flagColumn,
  Ae as fnv1a,
  On as focusEntity,
  Ka as formatBytes,
  Ye as formatCount,
  Da as formatDate,
  xc as formatDateTime,
  Wa as formatDuration,
  ja as formatElapsed,
  he as formatExpression,
  Te as formatInteger,
  Ha as formatMetric,
  Va as formatOrdinal,
  Ua as formatPercent,
  cs as formatRange,
  $e as formatTerm,
  Ms as generateRows,
  Qs as hasActiveFacets,
  Qc as identityColumn,
  Mc as idsExpression,
  Sc as isEntityScoped,
  Za as isFacetActive,
  Vt as isPristineQuery,
  Re as isRangeTerm,
  Kt as isTypeCardsQuery,
  Mn as isViewKind,
  Ec as joinExpression,
  Xn as liftTerm,
  ys as matchesExpression,
  Yc as metricColumn,
  Oc as narrowPatch,
  _s as negateTerm,
  hc as niceMax,
  ce as normalizeSearch,
  ks as oppositeTerm,
  Wc as ordinalColumn,
  oe as parseExpression,
  Fs as parseQuery,
  su as percentCell,
  zc as pictureColumn,
  fc as placePopover,
  Yo as presentParts,
  fa as presentRow,
  yt as pressOptions,
  Ds as provideShellContext,
  Ks as provideShellTheme,
  pu as queryAll,
  lu as rangeFrom,
  ut as rangeOf,
  $s as readDraft,
  Tc as readExpression,
  du as recordRedirect,
  Qn as recordTerm,
  Hs as recordsIn,
  Gc as referenceColumn,
  At as refineExpression,
  Dt as resolveView,
  ve as roleColumn,
  Nn as roleColumns,
  as as rowKey,
  Ot as sameTerm,
  ht as scopeTerm,
  et as scopeTermFor,
  ea as scopedEntity,
  Lc as searchFromQuery,
  $t as serializeQuery,
  Bs as sortAddress,
  ct as sortsFor,
  Cc as splitExpression,
  jc as stateColumn,
  za as stripAnsi,
  Xs as summarizeQuery,
  Zt as summaryTerms,
  Xt as termStanding,
  Uc as tintColumn,
  Pc as tintFor,
  ru as toggleFacet,
  gr as useColumns,
  to as useDraft,
  Eo as useEntityCounts,
  Br as useEntityPreviews,
  Jt as useLayerTheme,
  Vc as usePoll,
  Se as usePresentedRows,
  Js as useQueryState,
  so as useRecordNames,
  Zs as useResults,
  Z as useShellContext,
  Kc as useStableSchema,
  oc as useToasts,
  iu as usefulFacets,
  un as viewAcross,
  ra as withFacetValue,
  Nt as withStanding,
  Ac as withoutFacet,
  Zn as withoutOwnScope,
  gs as withoutTerm
};
