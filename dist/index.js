import { ref as R, computed as f, inject as Ft, provide as Vt, getCurrentInstance as Tn, shallowRef as _e, toValue as $e, watch as re, onScopeDispose as rt, getCurrentScope as Mn, defineComponent as K, openBlock as u, createElementBlock as p, renderSlot as G, useSlots as it, onBeforeUnmount as ge, createElementVNode as b, createBlock as N, unref as k, withCtx as X, toDisplayString as E, createTextVNode as ne, createCommentVNode as T, Fragment as W, renderList as J, withModifiers as Le, normalizeClass as fe, withDirectives as Lt, withKeys as Ye, normalizeStyle as ie, vModelText as Ta, createVNode as Q, nextTick as ct, useId as Dt, Teleport as ut, reactive as ln, onMounted as dt, resolveDynamicComponent as Ie, createSlots as Tt, useModel as rn, onBeforeUpdate as Ma, normalizeProps as Oa, guardReactiveProps as Aa, mergeModels as cn, vShow as un, Comment as Na, Text as Ra, readonly as Ia, mergeProps as Ba, watchEffect as Ha } from "vue";
import { MenuList as qa } from "menu-bar";
const Kt = ["list", "cards", "grid", "images", "table", "links", "preview"], Ne = ["ok", "running", "queued", "review", "failed"], pc = [...Ne, "neutral", "accent"], hc = [
  "identity",
  "reference",
  "metric",
  "state",
  "updated",
  "image",
  "tint"
], mc = [480, 620, 760, 900, 1100], On = Symbol("dc.routeAdapter");
function ue(e) {
  if (!e) return "";
  const t = e.replace(/^[?]/, "");
  return t ? `?${t}` : "";
}
function Fa() {
  const e = typeof window < "u", t = R(e ? ue(window.location.search) : ""), n = R(e ? window.location.pathname : "/"), a = () => {
    t.value = ue(window.location.search), n.value = window.location.pathname;
  };
  e && window.addEventListener("popstate", a);
  const s = (o, l, i) => {
    const r = ue(o);
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
      return e ? l !== void 0 && l !== window.location.pathname ? `${l}${ue(o)}` : `${window.location.pathname}${ue(o)}${window.location.hash}` : `${l ?? n.value}${ue(o)}`;
    },
    push: (o, l) => s(o, "push", l),
    replace: (o, l) => s(o, "replace", l),
    dispose: () => {
      e && window.removeEventListener("popstate", a);
    }
  };
}
function Va(e, t) {
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
      return e.href ? e.href(o, i) : `${i ?? e.path.value}${ue(o)}`;
    }
  };
}
function Re(e) {
  let t = 2166136261;
  for (let n = 0; n < e.length; n++)
    t ^= e.charCodeAt(n), t = Math.imul(t, 16777619);
  return Math.abs(t);
}
function Da(e) {
  if (!Number.isFinite(e)) return "—";
  const t = Math.abs(e);
  return t >= 1e6 ? `${(e / 1e6).toFixed(1)}m` : t >= 1e3 ? `${(e / 1e3).toFixed(1)}k` : String(Math.round(e));
}
function Ze(e) {
  if (!Number.isFinite(e)) return "—";
  const t = Math.round(e), n = Math.abs(t);
  return n < 1e3 ? String(t) : n < 9950 ? `${(t / 1e3).toFixed(1)}k` : n < 999500 ? `${Math.round(t / 1e3)}k` : `${(t / 1e6).toFixed(1)}m`;
}
function Oe(e) {
  return Number.isFinite(e) ? Math.round(e).toLocaleString("en-US") : "—";
}
function Ka(e) {
  const t = new Date(e);
  if (Number.isNaN(t.getTime())) return "—";
  const n = String(t.getUTCDate()).padStart(2, "0"), a = String(t.getUTCMonth() + 1).padStart(2, "0");
  return `${n}.${a}.${t.getUTCFullYear()}`;
}
function Wa(e) {
  return String(e + 1);
}
function yc(e, t) {
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
function ja(e) {
  if (e == null || !Number.isFinite(e) || e < 0) return "—";
  if (e < 1e3) return `${e} B`;
  const t = ["kB", "MB", "GB", "TB"];
  let n = e, a = -1;
  for (; n >= 1e3 && a < t.length - 1; )
    n /= 1e3, a += 1;
  return `${n < 100 ? n.toFixed(1) : Math.round(n)} ${t[a]}`;
}
function Ua(e) {
  if (!e || !Number.isFinite(e)) return "—";
  if (e < 1e3) return `${Math.round(e)}ms`;
  const t = e / 1e3;
  return t < 60 ? `${t.toFixed(1)}s` : `${Math.floor(t / 60)}m ${Math.round(t % 60)}s`;
}
function za(e) {
  if (e == null || !Number.isFinite(e) || e <= 0)
    return "—";
  const t = Math.floor(e / 60);
  return t ? `${t}:${String(e % 60).padStart(2, "0")}` : `${e}s`;
}
function Qa(e) {
  return e == null || !Number.isFinite(e) ? "—" : `${Math.round(e * 100)}%`;
}
function Ga(e) {
  return e.replace(/\x1b\[[0-9;?]*[ -/]*[@-~]/g, "");
}
const An = "cards", Ya = "table";
function Be(e, t = {}) {
  const n = (s) => s && Nn(s) ? s : void 0;
  if (e === null) return n(t.view) ?? An;
  const a = t.landing === "entity" ? n(t.view) : void 0;
  return n(t.entityView) ?? a ?? Ya;
}
function dn(e, t, n, a = {}) {
  return e === Be(t, a) ? Be(n, a) : e;
}
const Mt = "updated";
function Nn(e) {
  return typeof e == "string" && (e === "record" || Kt.includes(e));
}
const fn = {
  list: "List",
  cards: "Cards",
  grid: "Grid",
  images: "Images",
  table: "Table",
  links: "Links",
  preview: "Preview",
  record: "Record"
};
function ft(e, t) {
  if (e === "record" && !t?.includes(e)) return t?.[0] ?? An;
  const [n] = t ?? [];
  return n === void 0 || t?.includes(e) ? e : n;
}
function Ot(e) {
  return typeof e.count == "number" ? Ze(e.count) : e.count;
}
function He(e, t) {
  return t ? e.entities.find((n) => n.key === t) ?? null : null;
}
function Rn(e, t = {}) {
  const n = He(e, t.entity), a = e.entities[0];
  if (!n && !a) throw new Error(`Schema "${e.key}" declares no entities`);
  return n ?? a;
}
function In(e, t = null) {
  return e?.columns ?? t?.columns ?? [];
}
function vt(e, t = null) {
  if (e?.sorts?.length) return e.sorts;
  const n = /* @__PURE__ */ new Set(), a = [];
  for (const s of In(e, t))
    !s.sort || n.has(s.sort) || (n.add(s.sort), a.push({ key: s.sort, label: (s.label ?? s.sort).toLowerCase() }));
  return a;
}
const Xa = { key: Mt, label: Mt };
function ke(e, t, n = null) {
  const a = vt(e, n);
  return (t ? a.find((o) => o.key === t) : void 0) ?? a.find((o) => o.key === Mt) ?? a[0] ?? Xa;
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
function Wt(e) {
  return e.entity === null && e.expr.trim() === "";
}
function _c(e) {
  return e.entity !== null;
}
function jt(e, t) {
  return e.entity === null && ft(e.view, t) === "cards";
}
function es(e, t) {
  return t <= 0 ? 1 : Math.max(1, Math.ceil(e / t));
}
function et(e, t = {}) {
  const a = t.landing === "entity" ? Rn(e, t) : null;
  return {
    entity: a?.key ?? null,
    view: Be(a?.key ?? null, t),
    sort: ke(a, t.sort).key,
    dir: t.dir === "asc" ? "asc" : "desc",
    expr: "",
    page: 1
  };
}
const Ut = ["entity", "sort", "dir", "expr"];
function xt(e) {
  return Ut.some((t) => t in e);
}
const ye = "—";
function pe(e, t) {
  return e.find((n) => n.role === t);
}
function Bn(e, t) {
  return e.filter((n) => n.role === t);
}
function ts(e, t) {
  const n = (t ? t.columns : e?.columns) ?? [], a = t ? "scoped" : "everything";
  return n.filter(
    (s) => s.role !== "tint" && ((s.when ?? "always") === "always" || s.when === a)
  );
}
const ns = ["id", "entityKey", "entityLabel"];
function de(e, t) {
  if (e.value) return e.value(t);
  const n = e.field ?? e.key;
  if (n !== void 0) {
    if (t.fields && n in t.fields) return t.fields[n];
    if (ns.includes(n))
      return t[n];
  }
}
function vn(e, t) {
  const n = e.key ?? e.field ?? e.label;
  return n?.trim() ? n.trim() : `column-${t}`;
}
function as(e, t) {
  return e.id?.trim() ? e.id : `${e.entityKey || "row"}-${t}`;
}
function ss(e, t) {
  if (e == null || e === "") return ye;
  if (t === "number") {
    const n = typeof e == "number" ? e : Number(e);
    return Number.isFinite(n) ? Da(n) : String(e);
  }
  return t === "date" ? Ka(String(e)) : Array.isArray(e) ? e.length ? e.join(", ") : ye : String(e);
}
function Te(e, t) {
  const n = de(e, t);
  return e.format ? e.format(n, t) : ss(n, e.kind);
}
function os(e) {
  return typeof e == "number" ? Number.isFinite(e) ? String(e) : "" : typeof e == "string" ? e : Array.isArray(e) ? e.join(", ") : "";
}
function Hn(e, t) {
  const n = Te(e, t), a = os(de(e, t));
  return a && a !== n ? a : n;
}
function Je(e, t) {
  return e ? Te(e, t) : "";
}
function pn(e) {
  return e.align ? e.align : e.kind === "number" || e.kind === "ordinal" ? "right" : "left";
}
const ls = {
  ordinal: "dc-table__num",
  number: "dc-table__number",
  date: "dc-table__date",
  status: "dc-table__state"
};
function hn(e) {
  return [ls[e.kind ?? "text"], e.class].filter(Boolean).join(" ");
}
function At(e) {
  if (e.truncate !== void 0) return e.truncate;
  const t = e.kind ?? "text";
  return t === "text" || t === "number" || t === "date";
}
const rs = /^([A-Za-z_][\w.-]*)\s*(>=|<=|:|=|>|<)\s*(.*)$/, mn = "-?(?:\\d+\\.?\\d*|\\.\\d+)", is = new RegExp(`^(${mn})?\\.\\.(${mn})?$`);
function pt(e) {
  const t = is.exec(e.trim());
  if (!t || t[1] === void 0 && t[2] === void 0) return null;
  const n = t[1] === void 0 ? null : Number(t[1]), a = t[2] === void 0 ? null : Number(t[2]);
  return n !== null && a !== null && n > a ? { min: a, max: n } : { min: n, max: a };
}
function cs(e) {
  return `${e.min ?? ""}..${e.max ?? ""}`;
}
function qe(e) {
  return e.kind === "field" && (e.comparator === ":" || e.comparator === "=") && pt(e.value) !== null;
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
function ce(e) {
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
const be = (e) => e.toLowerCase().replace(/\s+/g, ""), qn = [
  ["status", "state"],
  ["state", "state"],
  ["updated", "updated"],
  ["date", "updated"],
  ["name", "identity"],
  ["ref", "reference"]
];
function ds(e, t, n) {
  const a = be(e), s = n.columns ?? [];
  if (a === "entity") return t.entityKey;
  if (e in t.fields) return t.fields[e];
  const o = s.find(
    (c) => c.key?.toLowerCase() === e.toLowerCase() || c.field?.toLowerCase() === e.toLowerCase() || c.label !== void 0 && be(c.label) === a
  );
  if (o) return de(o, t);
  const l = n.facets.find(
    (c) => c.key.toLowerCase() === a || be(c.label) === a
  );
  if (l && l.key in t.fields) return t.fields[l.key];
  const i = qn.find(([c]) => c === a)?.[1];
  if (i) {
    const c = pe(s, i);
    if (c) return de(c, t);
  }
  const r = /^metric(\d+)$/.exec(a);
  if (r) {
    const c = Bn(s, "metric")[Number(r[1]) - 1];
    if (c) return de(c, t);
  }
}
function Ke(e) {
  return (e.toLowerCase().match(/[\p{L}\p{N}]+/gu) ?? []).map((t) => t.charAt(0)).join("");
}
const yn = /^[a-z_][\w.-]*$/;
function ht(e) {
  const t = (e.key ?? e.field)?.toLowerCase();
  if (t !== void 0) return yn.test(t) ? t : void 0;
  const n = e.label === void 0 ? void 0 : be(e.label);
  return n !== void 0 && yn.test(n) ? n : void 0;
}
function zt(e, t) {
  const n = be(e);
  return !!t?.entities.some((a) => a.scope && be(a.scope) === n);
}
function fs(e, t, n) {
  const a = be(e);
  if (a === "entity" || qn.some(([o]) => o === a) || /^metric\d+$/.test(a) || zt(e, n)) return !0;
  const s = (o) => o !== void 0 && be(o) === a;
  return (t.columns ?? []).some(
    (o) => s(o.key) || s(o.field) || s(o.label)
  ) || t.facets.some((o) => s(o.key) || s(o.label));
}
function Fe(e, t, n) {
  return t ? Vn(e, (a) => {
    const s = Dn(a, t, n);
    return s && ht(s);
  }) : e;
}
function Fn(e, t, n) {
  return t ? Vn(e, (a) => {
    if (zt(a, n)) return;
    const s = (t.columns ?? []).find((o) => ht(o) === a);
    return s && Kn(s, t, n);
  }) : e;
}
function vs(e, t, n) {
  if (!t || zt(e, n)) return;
  const a = t.facets.find((s) => s.key.toLowerCase() === e);
  return a ? a.label : (t.columns ?? []).find((s) => ht(s) === e)?.label;
}
function Vn(e, t) {
  let n = !1;
  const a = ce(e).map(
    (s) => s.map((o) => {
      if (o.kind !== "field") return o;
      const l = t(o.field);
      return !l || l === o.field ? o : (n = !0, { ...o, field: l });
    })
  );
  return n ? me(a) : e;
}
function Dn(e, t, n) {
  if (!(!e || fs(e, t, n)))
    return (t.columns ?? []).find(
      (a) => a.label !== void 0 && Ke(a.label) === e
    );
}
function Kn(e, t, n) {
  if (!t || e.label === void 0 || !ht(e)) return;
  const a = Ke(e.label);
  return Dn(a, t, n) === e ? a : void 0;
}
function St(e, t) {
  const n = e.toLowerCase(), a = t.toLowerCase();
  if (!a.includes("*")) return n.includes(a);
  const s = a.replace(/[.+?^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*");
  return new RegExp(s).test(n);
}
function _n(e, t) {
  return e.toLowerCase() === t.toLowerCase();
}
function ps(e, t, n, a) {
  if (e.kind === "text") {
    const r = n.columns ?? [];
    return ["identity", "reference"].some((c) => {
      const d = pe(r, c), m = d ? de(d, t) : void 0;
      return typeof m == "string" && St(m, e.value);
    });
  }
  const s = ds(e.field, t, n);
  if (s === void 0) return a?.has(e.field) ? !1 : null;
  const o = qe(e) ? pt(e.value) : null;
  if (o) {
    if (Array.isArray(s) || typeof s == "boolean") return null;
    const r = typeof s == "number" ? s : Number(s);
    return Number.isFinite(r) ? (o.min === null || r >= o.min) && (o.max === null || r <= o.max) : null;
  }
  if (Array.isArray(s))
    return e.comparator === ":" || e.comparator === "=" ? s.some(
      (c) => e.comparator === "=" ? _n(String(c), e.value) : St(String(c), e.value)
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
    return e.comparator === "=" ? _n(String(s), e.value) : St(String(s), e.value);
  }
  const l = Number(e.value), i = typeof s == "number" ? s : Number(s);
  return !Number.isFinite(l) || !Number.isFinite(i) ? null : hs(e.comparator, i, l);
}
function gn(e, t, n, a) {
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
function wn(e) {
  return e.kind === "field" && !e.negated && (e.comparator === ":" || e.comparator === "=") && !qe(e);
}
const kn = /* @__PURE__ */ new WeakMap();
function ms(e) {
  if (!e?.strictScopes) return null;
  let t = kn.get(e);
  return t || (t = new Set(
    e.entities.flatMap((n) => n.scope ? [n.scope.toLowerCase()] : [])
  ), kn.set(e, t)), t;
}
function ys(e, t, n, a) {
  if (!e.length) return !0;
  const s = ms(a);
  return e.some((o) => {
    const l = /* @__PURE__ */ new Map();
    for (const i of o)
      wn(i) && l.set(
        i.field,
        (l.get(i.field) ?? !1) || gn(i, t, n, s)
      );
    return o.every(
      (i) => wn(i) ? l.get(i.field) === !0 : gn(i, t, n, s)
    );
  });
}
function bn(e) {
  return /[\s"']/.test(e) ? `"${e.replace(/["']/g, "")}"` : e;
}
function xe(e) {
  const t = e.negated ? "-" : "";
  return e.kind === "text" ? t + bn(e.value) : `${t}${e.field}${e.comparator}${bn(e.value)}`;
}
function _s(e) {
  if (!e.negated) return { ...e, negated: !0 };
  const { negated: t, ...n } = e;
  return n;
}
function me(e) {
  return e.filter((t) => t.length).map((t) => t.map(xe).join(" ")).join(" OR ");
}
function gs(e, t, n) {
  return e.map((a, s) => s === t ? a.filter((o, l) => l !== n) : a).filter((a) => a.length);
}
function gc(e) {
  const t = ce(e);
  if (t.length > 1) return { parts: [], text: e.trim() };
  const n = t[0] ?? [];
  return {
    parts: n.filter((a) => a.kind === "field"),
    text: n.filter((a) => a.kind === "text").map(xe).join(" ")
  };
}
function wc(e, t) {
  return [...e.map(xe), t.trim()].filter(Boolean).join(" ");
}
const $n = (e, t) => e.toLowerCase() === t.toLowerCase();
function Nt(e, t) {
  return !!e.negated == !!t.negated && Wn(e, t);
}
function ws(e, t) {
  return !!e.negated != !!t.negated && Wn(e, t);
}
function Wn(e, t) {
  return e.kind === "field" ? t.kind === "field" && e.field === t.field && e.comparator === t.comparator && $n(e.value, t.value) : t.kind === "text" && $n(e.value, t.value);
}
function ks(e, t) {
  return t.filter((n) => !e.some((a) => Nt(a, n)));
}
function Qt(e, t) {
  return jn(e, t, (n) => n);
}
function Rt(e, t) {
  return jn(
    e,
    t,
    (n, a) => n.filter((s) => !a.some((o) => ws(s, o)))
  );
}
const bs = /^[A-Za-z_][\w.-]*\s*(?:>=|<=|:|=|>|<)$/;
function $s(e) {
  return me(
    ce(e).map(
      (t) => t.filter(
        (n) => n.kind !== "text" || n.value !== "-" && !bs.test(n.value)
      )
    ).filter((t) => t.length > 0)
  );
}
function jn(e, t, n) {
  const a = ce(e), s = ce(t);
  return a.length ? s.length ? me(
    a.flatMap(
      (o) => s.map((l) => [...n(o, l), ...ks(o, l)])
    )
  ) : me(a) : me(s);
}
const Un = (e) => e.kind === "date" || e.role === "updated";
function xs(e) {
  if (!e) return () => 0;
  const n = (e.kind ?? "text") === "number" || e.role === "metric", a = Un(e);
  return (s, o) => {
    const l = de(e, s), i = de(e, o);
    return n ? Number(i ?? 0) - Number(l ?? 0) : a ? Date.parse(String(i ?? "")) - Date.parse(String(l ?? "")) : String(i ?? "").localeCompare(String(l ?? ""));
  };
}
function xn(e, t) {
  return !t || !Un(t) ? !1 : !Number.isFinite(Date.parse(String(de(t, e) ?? "")));
}
function zn({ query: e, schema: t, entity: n, limit: a, offset: s }, o, l) {
  const i = ce(e.expr), r = n ? [n] : t.entities;
  let c = 0;
  const d = [];
  for (const g of r)
    for (const S of o(g))
      c += 1, ys(i, S, g, t) && d.push(S);
  const m = ke(n, e.sort, t), w = In(n, t).find((g) => g.sort === m.key), x = l.undatedLast ? d.filter((g) => !xn(g, w)) : d, $ = l.undatedLast ? d.filter((g) => xn(g, w)) : [];
  x.sort(xs(w)), e.dir === "asc" && x.reverse();
  const y = $.length ? [...x, ...$] : x;
  return {
    // One page out of the middle. `total` stays the whole match, which is what
    // the shell counts pages with.
    rows: l.zeroIsAll && a <= 0 ? y.slice(s) : y.slice(s, s + a),
    total: d.length,
    unfiltered: d.length === c
  };
}
const tt = [
  "oklch(0.36 0.06 240)",
  "oklch(0.34 0.07 290)",
  "oklch(0.36 0.06 160)",
  "oklch(0.38 0.06 80)",
  "oklch(0.35 0.07 30)",
  "oklch(0.34 0.05 200)"
];
function kc(e) {
  return tt[Re(e) % tt.length];
}
function Qn(e, t) {
  return `${e}_${1e4 + t * 7}`;
}
const Ss = 7, Cs = 3;
function Ps(e, t, n, a) {
  const s = (t * Ss + Re(n)) % a, o = [];
  for (let l = 0; l < Math.min(Cs, a); l++)
    o.push(Qn(e, (s + l) % a));
  return o;
}
function Es(e, t) {
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
      return Ne[n % Ne.length];
    case "updated":
      return o;
    case "tint":
      return tt[n % tt.length];
    case "metric":
      return 1 + n % 940;
  }
  switch (e.kind) {
    case "number":
      return 1 + n % 940;
    case "status":
      return Ne[n % Ne.length];
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
    const c = o[r % o.length], d = Math.floor(r / o.length), m = Re(`${a}:${e.key}:${c[0]}:${r}`), w = Qn(e.key, r), x = new Date(s.getTime() - m % 900 * 36e5).toISOString(), $ = {};
    for (const y of e.columns ?? []) {
      const g = y.field ?? y.key;
      if (!g || y.value) continue;
      const S = Ts(y, {
        hash: Re(`${m}:${g}`),
        sample: c,
        revision: d,
        updatedAt: x
      });
      S !== void 0 && ($[g] = S);
    }
    for (const y of e.facets)
      $[y.key] = Es(y, Re(`${m}:${y.key}`));
    for (const [y, g] of l)
      $[y] = g === e.key ? w : Ps(g, r, y, n);
    i.push({ id: w, entityKey: e.key, entityLabel: e.label, fields: $ });
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
      return zn(a, (s) => n(s, a.schema), {
        undatedLast: !1,
        zeroIsAll: !1
      });
    }
  };
}
const Me = "e", mt = "v", Gt = "s", Yt = "d", Se = "q", yt = "p", Gn = "*", As = [
  Me,
  mt,
  Gt,
  Yt,
  Se,
  yt
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
function nt(e) {
  let t = encodeURIComponent(e);
  for (const [n, a] of Ns) t = t.replace(n, a);
  return t;
}
function he(e) {
  try {
    return decodeURIComponent(e.replace(/\+/g, " "));
  } catch {
    return e.replace(/\+/g, " ");
  }
}
function Xt(e) {
  const t = e.replace(/^[?]/, "");
  if (!t) return [];
  const n = [];
  for (const a of t.split("&")) {
    if (!a) continue;
    const s = a.indexOf("="), o = s === -1 ? a : a.slice(0, s), l = s === -1 ? "" : a.slice(s + 1);
    n.push([he(o), l]);
  }
  return n;
}
function Rs(e) {
  return As.includes(e);
}
function _t(e, t) {
  if (!(!t || e.some((n) => n.key === t)))
    return e.find((n) => Ke(n.label) === t);
}
function Is(e, t) {
  const n = Ke(e.label);
  return _t(t.entities, n)?.key === e.key ? n : e.key;
}
function Yn(e, t) {
  return t ? He(e, t) ?? _t(e.entities, t) ?? null : null;
}
function Bs(e, t) {
  const n = Ke(e.label);
  return _t(t, n)?.key === e.key ? n : e.key;
}
function Hs(e, t) {
  return t.some((n) => n.key === e) ? e : _t(t, e)?.key ?? e;
}
function qs(e, t, n = {}) {
  const a = et(t, n), s = new Map(Xt(e)), o = s.get(Me), l = o === void 0 ? a.entity : he(o), i = l === Gn ? null : Yn(t, l), r = s.get(mt), c = r && Nn(he(r)) ? he(r) : Be(i?.key ?? null, n), d = s.get(Gt), m = ke(
    i,
    d ? Hs(he(d), vt(i, t)) : n.sort,
    t
  ), w = s.get(Yt), x = w ? he(w) === "asc" ? "asc" : "desc" : a.dir, $ = s.get(Se), y = s.get(yt), g = y === void 0 ? 1 : Number(he(y)), S = Number.isFinite(g) ? Math.max(1, Math.floor(g)) : 1;
  return {
    entity: i?.key ?? null,
    view: c,
    sort: m.key,
    dir: x,
    expr: $ === void 0 ? "" : Fe(he($), i, t),
    page: S
  };
}
function Sn(e, t, n = {}, a = "") {
  const s = et(t, n), o = He(t, e.entity), l = Xt(a).filter(([m]) => !Rs(m)), i = [], r = (m, w) => i.push([m, nt(w)]), c = o?.key ?? null;
  if (c !== s.entity && r(Me, o ? Is(o, t) : Gn), e.view !== Be(c, n) && r(mt, e.view), e.sort !== s.sort) {
    const m = vt(o, t), w = m.find((x) => x.key === e.sort);
    r(Gt, w ? Bs(w, m) : e.sort);
  }
  e.dir !== s.dir && r(Yt, e.dir), e.expr.trim() !== "" && r(Se, Fn(e.expr, o, t)), e.page > 1 && r(yt, String(e.page));
  const d = [
    ...l.map(([m, w]) => [nt(m), w]),
    ...i
  ];
  return d.length ? `?${d.map(([m, w]) => w === "" ? m : `${m}=${w}`).join("&")}` : "";
}
function bc(e) {
  const t = [];
  for (const [n, a] of Object.entries(e))
    for (const s of Array.isArray(a) ? a : [a]) {
      if (typeof s != "string") continue;
      const o = nt(n);
      t.push(s === "" ? o : `${o}=${nt(s)}`);
    }
  return t.length ? `?${t.join("&")}` : "";
}
function $c(e, t) {
  const n = new Map(Xt(e)), a = n.get(Se), s = a === void 0 ? "" : he(a);
  if (!t) return s;
  const o = n.get(Me);
  return Fe(
    s,
    o === void 0 ? null : Yn(t, he(o)),
    t
  );
}
function gt(e, t) {
  return Xn(e, t.id);
}
function Xn(e, t) {
  const n = e?.scope;
  return n ? Jn(n, t) : null;
}
function Jn(e, t) {
  return `${e}="${t.replace(/"/g, "")}"`;
}
function xc(e, t) {
  const n = typeof e == "string" ? e : e?.scope;
  if (!n) return null;
  const a = t.filter((s) => s.replace(/"/g, "") !== "").map((s) => Jn(n, s));
  return a.length ? a.join(" ") : null;
}
function wt(e, t) {
  if (e.kind !== "field" || t.kind !== "field") return Nt(e, t);
  const n = (a) => a.comparator === ":" || a.comparator === "=";
  return Nt(e, { ...t, comparator: n(e) && n(t) ? e.comparator : t.comparator });
}
function at(e, t) {
  return wt(e, _s(t));
}
function st(e, t) {
  return gt(
    e.entities.find((n) => n.key === t.entityKey),
    t
  );
}
function We(e, t) {
  if (!t) return e;
  const n = e.trim();
  if (!n) return t;
  const [a] = ce(t).flat();
  if (!a) return n;
  const s = ce(n);
  return s.some((i) => i.some((r) => wt(r, a))) ? n : s.some((i) => i.some((r) => at(r, a))) ? me(
    s.map(
      (i) => i.map((r) => at(r, a) ? a : r)
    )
  ) : `${n} ${t}`;
}
function Zn(e) {
  if (!e) return null;
  const t = e.trim();
  return t ? t.startsWith("-") ? t.slice(1) : `-${t}` : null;
}
function Jt(e, t) {
  if (!t || !e.trim()) return null;
  const [n] = ce(t).flat();
  if (!n) return null;
  const a = ce(e).flat();
  return a.some((s) => wt(s, n)) ? n.negated ? "out" : "in" : a.some((s) => at(s, n)) ? n.negated ? "in" : "out" : null;
}
function ea(e, t) {
  if (!t || !e.trim()) return e;
  const [n] = ce(t).flat();
  if (!n) return e;
  const a = ce(e), s = a.map(
    (o) => o.filter((l) => !wt(l, n) && !at(l, n))
  );
  return s.every((o, l) => o.length === a[l]?.length) ? e : me(s);
}
function It(e, t, n) {
  return t ? n === null ? ea(e, t) : We(e, n === "out" ? Zn(t) : t) : e;
}
function ta(e) {
  return e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0;
}
function kt(e) {
  return e.altKey ? { exclude: !0 } : {};
}
function Ct(e, t, n, a = {}) {
  const s = st(e, n);
  return We(t.expr, a.exclude ? Zn(s) : s);
}
function na(e, t) {
  const n = e?.scope?.toLowerCase();
  if (!n || e?.keepsScope || !t.trim()) return t;
  const a = ce(t), s = a.map(
    (o) => o.filter((l) => l.kind !== "field" || l.field !== n)
  );
  return s.every((o, l) => o.length === a[l]?.length) ? t : me(s);
}
function aa(e, t) {
  const n = t.toLowerCase();
  return e.entities.find((a) => a.scope?.toLowerCase() === n) ?? null;
}
function sa(e, t, n) {
  if (!t || !n) return null;
  const a = aa(e, t);
  return a ? { entity: a, id: n } : null;
}
function Fs(e, t) {
  const n = [], a = /* @__PURE__ */ new Set();
  for (const s of t)
    for (const o of ce(s).flat()) {
      if (o.kind !== "field" || o.negated) continue;
      const l = sa(e, o.field, o.value);
      if (!l) continue;
      const i = `${l.entity.key}:${l.id.toLowerCase()}`;
      a.has(i) || (a.add(i), n.push({ entityKey: l.entity.key, id: l.id }));
    }
  return n;
}
function Sc(e, t, n = "cards") {
  return {
    // An expression with nothing in it is no parameter, as the shell writes it.
    [Se]: We(e, t) || void 0,
    [Me]: void 0,
    [mt]: n,
    [yt]: void 0
  };
}
const oa = Symbol("dc.shellContext");
function Vs(e) {
  const t = e.liveQuery ? e : Ds(e);
  return Vt(oa, t), t;
}
function Ds(e) {
  const t = e.draft ?? R("");
  return {
    draft: t,
    liveQuery: e.query,
    drafting: f(() => !1),
    commitDraft() {
      const n = t.value.trim();
      n && (e.setExpression(
        Rt(e.query.value.expr, Fe(n, e.entity.value, e.schema.value))
      ), t.value = "");
    },
    abandonDraft() {
      t.value = "";
    },
    ...e
  };
}
function ae() {
  const e = Ft(oa, null);
  if (!e)
    throw new Error(
      "[appfr] No shell context found. Render this component inside <DataShell>."
    );
  return e;
}
const ot = Symbol("dc-shell-theme");
function Bt(e) {
  return {
    read: () => ({
      theme: $e(e.theme),
      accent: $e(e.accent),
      tokens: $e(e.tokens)
    })
  };
}
function Ks(e, t) {
  t ? t.provide(ot, Bt(e)) : Vt(ot, Bt(e));
}
function Ws(e) {
  const t = Tn();
  Vt(ot, {
    ...Bt(e),
    element: () => t?.proxy?.$el ?? null
  });
}
function Zt(e) {
  const t = Tn(), n = Ft(ot, null), a = _e(null);
  function s() {
    const r = t?.proxy?.$el, d = (r instanceof Element ? r : r?.parentElement)?.closest(".dc-shell");
    if (!d) {
      a.value = null;
      return;
    }
    const m = {};
    for (const w of Array.from(d.style))
      w.startsWith("--") && (m[w] = d.style.getPropertyValue(w));
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
function la(e) {
  return e.key.toLowerCase();
}
const js = /* @__PURE__ */ new Set([">", ">=", "<", "<="]);
function ra(e, t) {
  if (e.kind !== "field" || e.negated || e.field !== la(t)) return !1;
  const n = e.comparator === ":" || e.comparator === "=";
  switch (t.kind) {
    case "range":
      return qe(e) || js.has(e.comparator);
    case "chips":
      return n && !qe(e) && ia(t.options, e.value) !== void 0;
    case "toggle":
      return n && Us(e.value);
  }
}
function ia(e, t) {
  const n = t.toLowerCase();
  return e.find((a) => a.toLowerCase() === n);
}
function Us(e) {
  const t = e.toLowerCase();
  return t === "true" || t === "yes";
}
function ca(e, t) {
  const n = (ce(e)[0] ?? []).filter((a) => ra(a, t));
  switch (t.kind) {
    case "range": {
      let a = null, s = null;
      for (const o of n) {
        const l = pt(o.value), i = Number(o.value);
        l ? (l.min !== null && (a = l.min), l.max !== null && (s = l.max)) : Number.isFinite(i) && (o.comparator.startsWith(">") ? a = i : s = i);
      }
      return { kind: "range", min: a, max: s };
    }
    case "chips": {
      const a = new Set(n.map((s) => ia(t.options, s.value)));
      return { kind: "chips", selected: t.options.filter((s) => a.has(s)) };
    }
    case "toggle":
      return { kind: "toggle", on: n.length > 0 };
  }
}
function zs(e, t) {
  const n = la(e);
  switch (t.kind) {
    case "range":
      return t.min === null && t.max === null ? [] : [{ kind: "field", field: n, comparator: ":", value: cs(t) }];
    case "chips":
      return t.selected.map((a) => ({ kind: "field", field: n, comparator: "=", value: a }));
    case "toggle":
      return t.on ? [{ kind: "field", field: n, comparator: ":", value: "true" }] : [];
  }
}
function ua(e, t, n) {
  const a = zs(t, n), s = ce(e), o = (s.length ? s : [[]]).map((l) => [
    ...l.filter((i) => !ra(i, t)),
    ...a
  ]);
  return me(o);
}
function Cc(e, t) {
  return ua(e, t, Ja(t));
}
function Qs(e, t) {
  return (t?.facets ?? []).some((n) => Za(ca(e, n)));
}
const lt = "entity", Ve = "expr", Gs = { ">=": "≥", "<=": "≤", ">": ">", "<": "<" };
function Ys(e, t, n) {
  if (e.kind !== "field") return xe(e);
  const a = vs(e.field, t, n);
  if (a === void 0) return xe(e);
  const s = e.negated ? "-" : "", o = qe(e) ? pt(e.value) : null;
  if (o) {
    const i = o.min !== null && o.max !== null ? `${o.min} ≤ ${a} ≤ ${o.max}` : o.max !== null ? `${a} ≤ ${o.max}` : `${a} ≥ ${o.min}`;
    return s + i;
  }
  const l = Gs[e.comparator];
  return l ? `${s}${a} ${l} ${e.value}` : xe({ ...e, field: a });
}
function en(e, t, n = null) {
  const a = [];
  return t && a.push({
    id: lt,
    label: `entity:${t.key}`,
    facetKey: lt
  }), ce(e.expr).forEach((s, o) => {
    s.forEach((l, i) => {
      a.push({
        id: `${Ve}:${o}:${i}`,
        label: Ys(l, t, n),
        address: Fn(xe(l), t, n),
        facetKey: Ve,
        group: o,
        index: i,
        ...l.kind === "field" ? { field: l.field, value: l.value } : {},
        ...l.negated ? { negated: !0 } : {}
      });
    });
  }), a;
}
function Xs(e, t, n = null) {
  if (Wt(e)) {
    const o = ke(t, e.sort, n);
    return `everything · ${e.view} · ${o.label}`;
  }
  const a = en(e, t).filter((o) => o.facetKey !== Ve).map((o) => o.label), s = e.expr.trim();
  return s && a.push(`"${s}"`), a.join(" · ");
}
function Js(e) {
  const { adapter: t } = e, n = f(() => $e(e.schema)), a = f(() => $e(e.defaults) ?? {}), s = f(() => qs(t.search.value, n.value, a.value)), o = f(() => He(n.value, s.value.entity)), l = f(() => o.value ?? Rn(n.value, a.value)), i = f(() => vt(o.value, n.value)), r = f(() => ke(o.value, s.value.sort, n.value)), c = (_, v) => {
    const h = Sn(_, n.value, a.value, t.search.value);
    return h === t.search.value ? !1 : (v === "push" ? t.push(h) : t.replace(h), !0);
  }, d = () => $e(e.navigationMode) ?? "push", m = () => $e(e.facetNavigationMode) ?? "replace", w = (_, v) => {
    const h = _.page ?? (xt(_) ? 1 : s.value.page);
    return c({ ...s.value, ..._, page: h }, v);
  }, x = (_) => {
    const v = _.page ?? (xt(_) ? 1 : s.value.page);
    return $({ ...s.value, ..._, page: v });
  }, $ = (_) => {
    const v = Sn(_, n.value, a.value, t.search.value);
    return t.href ? t.href(v) : `${t.path.value}${v}`;
  }, y = (_, v) => {
    const h = o.value?.facets.find((H) => H.key === _);
    if (!h) return;
    const M = ua(s.value.expr, h, v(ca(s.value.expr, h)));
    w({ expr: M }, m());
  }, g = (_) => {
    const v = _ === null ? null : He(n.value, _);
    return (v?.key ?? null) === s.value.entity ? {} : {
      entity: v?.key ?? null,
      view: dn(s.value.view, s.value.entity, v?.key ?? null, a.value),
      sort: ke(v, s.value.sort, n.value).key
    };
  }, S = (_) => {
    const v = g(_);
    Object.keys(v).length && w(v, d());
  };
  return {
    query: s,
    entity: o,
    focus: l,
    sort: r,
    sorts: i,
    summary: f(() => Xs(s.value, o.value, n.value)),
    terms: f(() => en(s.value, o.value, n.value)),
    isPristine: f(() => Wt(s.value)),
    isEverything: f(() => s.value.entity === null),
    hasFacets: f(() => Qs(s.value.expr, o.value)),
    setEntity: S,
    entityHref: (_) => x(g(_)),
    clearEntity: () => S(null),
    setView(_) {
      w({ view: _ }, d());
    },
    setSort(_) {
      w({ sort: ke(o.value, _, n.value).key }, d());
    },
    toggleDirection() {
      w({ dir: s.value.dir === "desc" ? "asc" : "desc" }, d());
    },
    setExpression(_) {
      return w({ expr: _ }, d());
    },
    narrow(_, v, h) {
      return w({ expr: _, ...g(v), ...h ? { view: h } : {} }, d());
    },
    narrowHref(_, v, h) {
      return x({ expr: _, ...g(v), ...h ? { view: h } : {} });
    },
    setPage(_, v) {
      w({ page: Math.max(1, Math.floor(_)) }, v ?? d());
    },
    setFacet(_, v) {
      y(_, () => v);
    },
    toggleChip(_, v) {
      y(_, (h) => h.kind !== "chips" ? h : { kind: "chips", selected: h.selected.includes(v) ? h.selected.filter((H) => H !== v) : [...h.selected, v] });
    },
    setRange(_, v, h) {
      y(_, (M) => M.kind === "range" ? { kind: "range", min: v, max: h } : M);
    },
    toggleFlag(_) {
      y(
        _,
        (v) => v.kind === "toggle" ? { kind: "toggle", on: !v.on } : v
      );
    },
    removeTerm(_) {
      if (_.facetKey === lt) {
        S(null);
        return;
      }
      if (_.facetKey === Ve) {
        const v = gs(ce(s.value.expr), _.group ?? 0, _.index ?? 0);
        w({ expr: me(v) }, d());
      }
    },
    clearFilters() {
      w({ ...g(null), expr: "" }, d());
    },
    clearHref: () => x({ ...g(null), expr: "" }),
    reset() {
      c(et(n.value, a.value), d());
    },
    homeHref: () => $(et(n.value, a.value)),
    hrefFor(_) {
      const v = { ...s.value, ..._ };
      return "entity" in _ && !("view" in _) && (v.view = dn(s.value.view, s.value.entity, v.entity, a.value)), v.page = _.page ?? (xt(_) ? 1 : s.value.page), $(v);
    }
  };
}
function Zs(e) {
  const t = _e([]), n = R(0), a = R(!1), s = R(!1), o = _e(null);
  let l = 0, i = null, r = null;
  const c = f(() => (e.query.value.page - 1) * e.limit.value), d = f(() => es(n.value, e.limit.value)), m = () => {
    const h = e.query.value, M = e.within?.value.trim(), H = na(e.entity.value, h.expr);
    return M ? { ...h, expr: Qt(M, H) } : H === h.expr ? h : { ...h, expr: H };
  }, w = (h, M) => {
    t.value = h.rows, n.value = h.total, o.value = null, x(M);
  }, x = (h) => {
    i = { key: h, total: n.value }, s.value = !1;
  }, $ = (h) => {
    o.value = h, t.value = [], n.value = 0, i = null, s.value = !1;
  }, y = (h, M, H, le) => {
    let D = !0;
    const j = () => h === l;
    let se = 0, q = !1;
    const ee = (Z) => {
      se = Z, q = !0, le === void 0 && (n.value = Z);
    }, Y = () => {
      D && (D = !1, t.value = [], ee(0)), o.value = null;
    };
    return {
      get open() {
        return j();
      },
      insert(Z, L) {
        if (!j()) return;
        const F = Array.isArray(Z) ? Z : [Z];
        if (!F.length) return;
        Y();
        const O = [...t.value];
        O.splice(L ?? O.length, 0, ...F), t.value = M > 0 ? O.slice(0, M) : O, ee(se + F.length);
      },
      set(Z) {
        j() && (Z.rows && (Y(), t.value = M > 0 ? Z.rows.slice(0, M) : Z.rows, ee(Z.rows.length)), Z.total !== void 0 && ee(Z.total));
      },
      close() {
        j() && (a.value = !1, q && (n.value = se), x(H));
      },
      fail(Z) {
        j() && ($(Z), a.value = !1);
      }
    };
  }, g = () => {
    const h = r;
    r = null, h?.();
  }, S = () => {
    const h = ++l;
    g();
    const M = _.value, H = i?.key === M ? i.total : void 0;
    s.value = H === void 0;
    const le = {
      query: m(),
      schema: e.schema.value,
      entity: e.entity.value,
      limit: e.limit.value,
      offset: c.value
    }, D = e.source.value;
    if (D.stream) {
      a.value = !0;
      try {
        r = D.stream(le, y(h, le.limit, M, H)) ?? null;
      } catch (se) {
        $(se), a.value = !1;
      }
      return;
    }
    let j;
    try {
      j = D.query(le);
    } catch (se) {
      $(se);
      return;
    }
    if (!(j instanceof Promise)) {
      w(j, M), a.value = !1;
      return;
    }
    a.value = !0, j.then((se) => {
      h === l && w(se, M);
    }).catch((se) => {
      h === l && $(se);
    }).finally(() => {
      h === l && (a.value = !1);
    });
  }, _ = f(() => {
    const h = m();
    return `${e.entity.value?.key ?? e.schema.value.entities[0]?.key ?? ""}|${JSON.stringify(Ut.map((H) => h[H]))}`;
  }), v = f(() => `${_.value}|${e.query.value.page}`);
  return re([e.source, v, e.limit], S, {
    immediate: !0
  }), rt(() => {
    l++, g();
  }, !0), { rows: t, total: n, offset: c, pageCount: d, pending: a, counting: s, error: o, refresh: S };
}
const eo = 150;
function to(e) {
  const t = e.delay ?? eo, n = R(""), a = R("");
  let s = !1, o;
  const l = () => {
    clearTimeout(o), o = void 0;
  }, i = f(() => Fe($s(a.value), e.entity.value, e.schema?.value)), r = f(() => i.value.trim() !== ""), c = f(
    () => JSON.stringify([i.value, ...Ut.map((x) => e.query.value[x])])
  ), d = _e(null), m = f(() => {
    const x = e.query.value;
    if (!r.value) return x;
    const $ = d.value?.of === c.value ? d.value.page : 1;
    return { ...x, expr: Rt(x.expr, i.value), page: $ };
  });
  re(n, (x) => {
    if (l(), !x.trim()) {
      s || (a.value = "");
      return;
    }
    s = !1, o = setTimeout(() => {
      o = void 0, a.value = n.value;
    }, t);
  }), re(
    e.query,
    () => {
      s && (s = !1, a.value = "");
    },
    { flush: "sync" }
  );
  const w = (x) => {
    l(), s = !0, n.value = "", !x() && s && (s = !1, a.value = "");
  };
  return Mn() && rt(l), {
    text: n,
    live: m,
    drafting: r,
    setPage(x) {
      d.value = { of: c.value, page: Math.max(1, Math.floor(x)) };
    },
    commit() {
      const x = n.value.trim();
      if (!x) return;
      const $ = Rt(
        e.query.value.expr,
        Fe(x, e.entity.value, e.schema?.value)
      );
      a.value = x, w(() => e.setExpression($));
    },
    abandon() {
      l(), s = !1, n.value = "", a.value = "";
    },
    release: w
  };
}
const no = 25, da = (e, t) => e.toLowerCase() === t.toLowerCase();
function ao(e, t) {
  return e.find((n) => da(n.id, t));
}
function so(e) {
  const t = _e(/* @__PURE__ */ new Map()), n = /* @__PURE__ */ new Set(), a = (i) => {
    if (i.facetKey !== Ve) return null;
    const r = sa(e.schema.value, i.field, i.value);
    return r ? { ...r, key: `${r.entity.key}:${r.id}` } : null;
  }, s = (i) => {
    const { entity: r, id: c } = i, d = e.query.value;
    return e.source.value.query({
      query: {
        ...d,
        entity: r.key,
        // The reference on its own. The rest of the query is about the rows on
        // screen, which are of another type entirely.
        expr: Xn(r, c) ?? "",
        sort: ke(r, d.sort, e.schema.value).key,
        page: 1
      },
      schema: e.schema.value,
      entity: r,
      limit: no,
      offset: 0
    });
  }, o = (i, r) => {
    const c = Je(pe(i.columns ?? [], "identity"), r);
    return c === ye || da(c, r.id) ? "" : c;
  }, l = () => {
    if (e.loading.value) return;
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
      d.forEach((w, x) => {
        const { reference: $ } = r[x], y = ao(w.rows, $.id);
        m.set($.key, y ? o($.entity, y) : "");
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
  return re([e.source, e.schema, e.terms, e.loading], () => {
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
const oo = ["href"], lo = /* @__PURE__ */ K({
  __name: "PressLink",
  props: {
    href: {}
  },
  emits: ["press"],
  setup(e, { emit: t }) {
    const n = e, a = t;
    function s(o) {
      if (n.href && ta(o)) {
        o.stopPropagation();
        return;
      }
      o.preventDefault(), a("press", kt(o), o);
    }
    return (o, l) => e.href ? (u(), p("a", {
      key: 0,
      href: e.href,
      class: "dc-press",
      onClick: s
    }, [
      G(o.$slots, "default", {}, void 0, !0)
    ], 8, oo)) : (u(), p("button", {
      key: 1,
      type: "button",
      class: "dc-press",
      onClick: s
    }, [
      G(o.$slots, "default", {}, void 0, !0)
    ]));
  }
}), U = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [a, s] of t)
    n[a] = s;
  return n;
}, oe = /* @__PURE__ */ U(lo, [["__scopeId", "data-v-a9383f64"]]), ro = { class: "dc-header" }, io = { class: "dc-header__main" }, co = {
  class: "dc-header__brand",
  "aria-hidden": "true"
}, uo = { class: "dc-header__sr" }, fo = {
  key: 2,
  class: "dc-header__within"
}, vo = ["title"], po = { class: "dc-header__query" }, ho = ["data-dc-more", "title"], mo = { class: "dc-header__run" }, yo = {
  key: 0,
  class: "dc-header__or dc-mono",
  "aria-hidden": "true"
}, _o = ["title", "aria-label", "onClick"], go = ["placeholder", "onKeydown"], wo = {
  key: 0,
  class: "dc-header__pages",
  "aria-label": "Pages"
}, ko = ["title"], bo = ["value", "onKeydown"], $o = {
  class: "dc-header__page-total",
  "aria-hidden": "true"
}, xo = {
  class: "dc-header__sr",
  "aria-live": "polite"
}, So = {
  key: 1,
  class: "dc-header__actions"
}, Co = /* @__PURE__ */ K({
  __name: "ShellHeader",
  props: {
    views: {},
    pagesNote: {},
    hidePages: { type: Boolean }
  },
  setup(e) {
    const t = e, n = it(), a = ae(), s = f(() => a.schema.value), o = f(() => {
      const P = a.within.value.trim();
      return P ? en({ ...a.query.value, expr: P }, null) : [];
    }), l = f(() => {
      const P = a.entity.value, A = P?.keepsScope ? void 0 : P?.scope?.toLowerCase();
      return a.terms.value.filter((B) => B.facetKey !== lt).map((B, te, sn) => {
        const on = sn[te - 1];
        return {
          term: B,
          or: on?.group !== void 0 && B.group !== void 0 && B.group !== on.group,
          idle: !!A && B.field?.toLowerCase() === A
        };
      });
    }), i = so({
      source: a.source,
      schema: a.schema,
      query: a.query,
      loading: a.loading,
      // The scope's parts as well as the query's: it names a record more often
      // than a typed term does, being what a record's own page is built on.
      terms: f(() => [...o.value, ...a.terms.value])
    });
    function r(P) {
      const A = aa(s.value, P)?.scopeLabel ?? P;
      return A.charAt(0).toUpperCase() + A.slice(1);
    }
    function c(P) {
      return P.replace(/\s*\([^()]*\)\s*$/, "");
    }
    function d(P) {
      const A = i.nameOf(P);
      return A ? `${P.negated ? "-" : ""}${r(P.field)}: ${c(A)}` : P.label;
    }
    function m(P) {
      const A = d(P.term), B = P.idle ? `Not applied to ${a.entity.value?.label} — remove ${A}` : `Remove ${A}`, te = P.term.address;
      return te && te !== A ? `${B}
Written ${te} in the address and the search box` : B;
    }
    const w = R(null);
    function x(P) {
      w.value = P instanceof HTMLInputElement ? P : null;
    }
    function $() {
      a.abandonDraft(), w.value?.blur();
    }
    function y() {
      g.value = null, a.commitDraft();
    }
    const g = R(null), S = f(() => Math.min(g.value ?? 1 / 0, l.value.length)), _ = f(() => [
      { key: "before", entries: l.value.slice(0, S.value) },
      { key: "after", entries: l.value.slice(S.value) }
    ]), v = f(() => S.value < l.value.length);
    re(l, (P) => {
      g.value !== null && g.value >= P.length && (g.value = null);
    });
    function h(P, A) {
      g.value = P >= l.value.length ? null : Math.max(0, P), ct(() => {
        const B = w.value;
        if (!B) return;
        const te = A === "start" ? 0 : B.value.length;
        B.setSelectionRange(te, te), B.scrollIntoView({ block: "nearest", inline: "nearest" }), F();
      });
    }
    function M(P) {
      const A = w.value;
      return !A || A.selectionStart !== A.selectionEnd ? !1 : A.selectionStart === (P === "start" ? 0 : A.value.length);
    }
    function H(P) {
      S.value === 0 || !M("start") || (P.preventDefault(), h(P.key === "Home" ? 0 : S.value - 1, "start"));
    }
    function le(P) {
      !v.value || !M("end") || (P.preventDefault(), h(P.key === "End" ? l.value.length : S.value + 1, "end"));
    }
    function D(P) {
      S.value === 0 || !M("start") || (P.preventDefault(), q(l.value[S.value - 1].term, !0));
    }
    function j(P) {
      !v.value || !M("end") || (P.preventDefault(), q(l.value[S.value].term, !1));
    }
    function se(P) {
      P.isComposing || P.altKey || P.ctrlKey || P.metaKey || P.shiftKey || (P.key === "ArrowLeft" || P.key === "Home" ? H(P) : P.key === "ArrowRight" || P.key === "End" ? le(P) : P.key === "Backspace" ? D(P) : P.key === "Delete" && j(P));
    }
    function q(P, A) {
      A && g.value !== null && (g.value = Math.max(0, g.value - 1)), a.removeTerm(P);
    }
    function ee(P) {
      P.target?.closest("button, input") || (P.preventDefault(), w.value?.focus(), h(l.value.length, "end"));
    }
    function Y() {
      a.draft.value || (g.value = null);
    }
    const Z = R(null), L = R("");
    function F() {
      const P = Z.value;
      if (!P) {
        L.value = "";
        return;
      }
      const A = P.scrollLeft > 1, B = P.scrollWidth - P.clientWidth - P.scrollLeft > 1;
      L.value = A && B ? "both" : A ? "start" : B ? "end" : "";
    }
    let O = null;
    re(
      Z,
      (P) => {
        O?.disconnect(), O = null, F(), !(!P || typeof ResizeObserver > "u") && (O = new ResizeObserver(F), O.observe(P));
      },
      { flush: "post" }
    ), re([l, S], F, { flush: "post" }), ge(() => O?.disconnect());
    const V = f(() => a.liveQuery.value.page), ve = f(
      () => !t.hidePages && (a.pageCount.value > 1 || !!t.pagesNote) && !jt(a.query.value, t.views) && ft(a.query.value.view, t.views) !== "record"
    ), Ee = f(
      () => `${a.counting.value ? "~" : ""}${Oe(a.pageCount.value)}`
    ), C = f(() => {
      let P = `Page ${Oe(V.value)} of ${Ee.value}`;
      const A = a.rows.value.length;
      if (A) {
        const B = a.offset.value + 1, te = `${a.counting.value ? "~" : ""}${Oe(a.total.value)}`;
        P += ` — rows ${Oe(B)} to ${Oe(B + A - 1)} of ${te}`;
      }
      return t.pagesNote ? `${P}
${t.pagesNote}` : P;
    }), I = R(null), z = f(() => I.value ?? String(V.value)), Ge = f(
      () => `calc(${Math.max(2, String(a.pageCount.value).length)}ch + 10px)`
    );
    function Pa(P) {
      P.target.select();
    }
    function Ea(P) {
      const A = P.target, B = A.value.replace(/[^0-9]/g, "");
      A.value !== B && (A.value = B), I.value = B;
    }
    function an(P) {
      const A = P.target, B = Number(I.value);
      I.value = null;
      const te = Number.isFinite(B) && B >= 1 ? Math.min(Math.trunc(B), Math.max(1, a.pageCount.value)) : V.value;
      A.value = String(te), te !== V.value && a.setPage(te);
    }
    function La(P) {
      const A = P.target;
      I.value = null, A.value = String(V.value), A.blur();
    }
    return (P, A) => (u(), p("div", ro, [
      b("div", io, [
        s.value.label && n.brand ? (u(), N(oe, {
          key: 0,
          class: "dc-header__domain",
          "data-dc-brand": "",
          title: "Home",
          href: k(a).homeHref(),
          onPress: A[0] || (A[0] = (B) => k(a).reset())
        }, {
          default: X(() => [
            b("span", co, [
              G(P.$slots, "brand", {
                label: s.value.label
              }, void 0, !0)
            ]),
            b("span", uo, E(s.value.label), 1)
          ]),
          _: 3
        }, 8, ["href"])) : s.value.label ? (u(), N(oe, {
          key: 1,
          class: "dc-header__domain",
          title: "Home",
          href: k(a).homeHref(),
          onPress: A[1] || (A[1] = (B) => k(a).reset())
        }, {
          default: X(() => [
            ne(E(s.value.label), 1)
          ]),
          _: 1
        }, 8, ["href"])) : T("", !0),
        o.value.length ? (u(), p("span", fo, [
          A[6] || (A[6] = b("span", { class: "dc-header__sr" }, "Within", -1)),
          (u(!0), p(W, null, J(o.value, (B) => (u(), p("span", {
            key: `scope:${B.id}`,
            class: "dc-within dc-mono dc-truncate",
            title: d(B)
          }, E(d(B)), 9, vo))), 128))
        ])) : T("", !0),
        b("div", po, [
          b("div", {
            class: "dc-header__field",
            onMousedown: ee
          }, [
            b("div", {
              ref_key: "termBar",
              ref: Z,
              class: "dc-header__terms",
              "data-dc-more": L.value,
              title: k(a).summary.value,
              onScroll: F
            }, [
              (u(!0), p(W, null, J(_.value, (B) => (u(), p(W, {
                key: B.key
              }, [
                b("span", mo, [
                  (u(!0), p(W, null, J(B.entries, (te) => (u(), p(W, {
                    key: te.term.id
                  }, [
                    te.or ? (u(), p("span", yo, "or")) : T("", !0),
                    b("button", {
                      type: "button",
                      class: fe(["dc-term dc-mono", { "dc-term--idle": te.idle }]),
                      title: m(te),
                      "aria-label": `Remove ${d(te.term)}`,
                      onMousedown: A[2] || (A[2] = Le(() => {
                      }, ["prevent"])),
                      onClick: (sn) => q(te.term, B.key === "before")
                    }, E(d(te.term)), 43, _o)
                  ], 64))), 128))
                ]),
                B.key === "before" ? Lt((u(), p("input", {
                  key: 0,
                  ref_for: !0,
                  ref: x,
                  "onUpdate:modelValue": A[3] || (A[3] = (te) => k(a).draft.value = te),
                  class: fe(["dc-header__search dc-mono", { "dc-header__search--between": v.value }]),
                  style: ie({ "--dc-typed": String(Math.max(1, k(a).draft.value.length)) }),
                  type: "text",
                  autocomplete: "off",
                  spellcheck: "false",
                  placeholder: v.value ? "" : "Search…",
                  "aria-label": "Search",
                  onKeydown: [
                    Ye(Le(y, ["prevent"]), ["enter"]),
                    Ye(Le($, ["prevent"]), ["esc"]),
                    se
                  ],
                  onBlur: Y
                }, null, 46, go)), [
                  [Ta, k(a).draft.value]
                ]) : T("", !0)
              ], 64))), 128))
            ], 40, ho)
          ], 32)
        ])
      ]),
      ve.value ? (u(), p("nav", wo, [
        Q(oe, {
          class: "dc-header__step",
          "aria-label": "Previous page",
          href: V.value > 1 ? k(a).hrefFor({ page: V.value - 1 }) : null,
          disabled: V.value <= 1,
          onPress: A[4] || (A[4] = (B) => k(a).setPage(V.value - 1))
        }, {
          default: X(() => [...A[7] || (A[7] = [
            b("span", { "aria-hidden": "true" }, "‹", -1)
          ])]),
          _: 1
        }, 8, ["href", "disabled"]),
        b("span", {
          class: "dc-header__page dc-mono",
          title: C.value
        }, [
          b("input", {
            class: "dc-header__page-box dc-mono",
            type: "text",
            inputmode: "numeric",
            autocomplete: "off",
            "aria-label": "Page",
            style: ie({ width: Ge.value }),
            value: z.value,
            onFocus: Pa,
            onInput: Ea,
            onKeydown: [
              Ye(Le(an, ["prevent"]), ["enter"]),
              Ye(Le(La, ["prevent"]), ["esc"])
            ],
            onBlur: an
          }, null, 44, bo),
          b("span", $o, "/ " + E(Ee.value), 1)
        ], 8, ko),
        b("span", xo, E(C.value), 1),
        Q(oe, {
          class: "dc-header__step",
          "aria-label": "Next page",
          href: V.value < k(a).pageCount.value ? k(a).hrefFor({ page: V.value + 1 }) : null,
          disabled: V.value >= k(a).pageCount.value,
          onPress: A[5] || (A[5] = (B) => k(a).setPage(V.value + 1))
        }, {
          default: X(() => [...A[8] || (A[8] = [
            b("span", { "aria-hidden": "true" }, "›", -1)
          ])]),
          _: 1
        }, 8, ["href", "disabled"])
      ])) : T("", !0),
      n.actions ? (u(), p("div", So, [
        G(P.$slots, "actions", {}, void 0, !0)
      ])) : T("", !0)
    ]));
  }
}), fa = /* @__PURE__ */ U(Co, [["__scopeId", "data-v-122cf0a4"]]);
function Po(e) {
  const t = _e(/* @__PURE__ */ new Map()), n = R(!0);
  let a = 0, s;
  const o = () => {
    a++, s?.abort(), s = void 0;
  }, l = () => {
    o();
    const i = a, { signal: r } = s = new AbortController(), c = e.query.value, d = e.schema.value, m = e.entities.value, w = e.within?.value.trim() ?? "";
    n.value = c.expr.trim() === "" && !w;
    const x = /* @__PURE__ */ new Map();
    let $ = !0;
    for (const y of m) {
      const g = na(y, c.expr), S = w ? Qt(w, g) : g;
      let _ = !1;
      const v = (M) => {
        if (i !== a) return;
        if ($) {
          x.set(y.key, M);
          return;
        }
        const H = new Map(t.value);
        H.set(y.key, M), t.value = H;
      }, h = e.source.value.query({
        query: { ...c, entity: y.key, expr: S, page: 1 },
        schema: d,
        entity: y,
        limit: 0,
        offset: 0,
        signal: r,
        progress: (M) => {
          _ || v({ total: M, pending: !0, counted: !0 });
        }
      });
      h instanceof Promise ? (x.has(y.key) || x.set(y.key, { total: 0, pending: !0, counted: !1 }), h.then((M) => {
        _ = !0, v({ total: M.total, pending: !1, counted: !0 });
      })) : (_ = !0, x.set(y.key, { total: h.total, pending: !1, counted: !0 }));
    }
    $ = !1, t.value = x;
  };
  return Mn() && rt(o), { counts: t, pristine: n, refresh: l, cancel: o };
}
const Eo = ["checked", "indeterminate"], va = /* @__PURE__ */ K({
  __name: "PageTick",
  setup(e) {
    const t = ae(), n = f(() => t.rows.value.filter((o) => t.isSelected(o)).length), a = f(
      () => t.rows.value.length > 0 && n.value === t.rows.value.length
    ), s = f(() => n.value > 0 && !a.value);
    return (o, l) => (u(), p("input", {
      class: "dc-tick",
      type: "checkbox",
      checked: a.value,
      indeterminate: s.value,
      "aria-label": "Select every row on this page",
      title: "Select every row on this page",
      onChange: l[0] || (l[0] = (i) => k(t).selectPage(!a.value))
    }, null, 40, Eo));
  }
}), Lo = { class: "dc-pick" }, To = ["id"], Mo = ["id", "aria-expanded", "aria-labelledby", "data-dc-value"], Oo = { class: "dc-pick__label" }, Ao = /* @__PURE__ */ K({
  __name: "PickControl",
  props: {
    modelValue: {},
    options: {},
    label: {},
    mono: { type: Boolean }
  },
  emits: ["update:modelValue", "open", "close"],
  setup(e, { emit: t }) {
    const n = e, a = t, s = Dt() ?? "dc-pick", o = R(null), l = R(null), i = R(null), r = R(!1), c = f(() => i.value !== null), d = R(null), m = f(
      () => n.options.find((h) => h.key === n.modelValue) ?? n.options[0]
    ), w = f(
      () => n.options.map((h) => ({
        id: h.key,
        label: h.label,
        checked: h.key === n.modelValue
      }))
    ), x = f(
      () => i.value ? { maxHeight: `${window.innerHeight - i.value.y - 8}px` } : void 0
    );
    function $(h) {
      const M = o.value?.getBoundingClientRect();
      M && (d.value = o.value?.closest(".dc-shell") ?? document.body, i.value = { x: M.left, y: M.bottom + 4, mirrorX: M.right }, r.value = h, a("open"));
    }
    function y(h) {
      i.value && a("close"), i.value = null, h && o.value?.focus();
    }
    function g() {
      c.value ? y(!0) : $(!1);
    }
    function S(h) {
      h.key !== "ArrowDown" && h.key !== "ArrowUp" || c.value || (h.preventDefault(), $(!0));
    }
    function _(h) {
      const M = h.target;
      M && (o.value?.contains(M) || l.value?.root?.contains(M) || y(!1));
    }
    re(c, (h) => {
      h ? window.addEventListener("pointerdown", _, !0) : window.removeEventListener("pointerdown", _, !0);
    }), ge(() => window.removeEventListener("pointerdown", _, !0));
    function v(h) {
      y(!0), !(h.id === void 0 || h.id === n.modelValue) && a("update:modelValue", h.id);
    }
    return (h, M) => (u(), p("span", Lo, [
      b("span", {
        id: `${k(s)}-name`,
        class: "dc-pick__name"
      }, E(e.label), 9, To),
      b("button", {
        id: `${k(s)}-value`,
        ref_key: "trigger",
        ref: o,
        type: "button",
        class: fe(["dc-pick__button", { "dc-mono": e.mono }]),
        "aria-haspopup": "menu",
        "aria-expanded": c.value,
        "aria-labelledby": `${k(s)}-name ${k(s)}-value`,
        "data-dc-value": e.modelValue,
        onClick: g,
        onKeydown: S
      }, [
        b("span", Oo, E(m.value?.label), 1)
      ], 42, Mo),
      M[1] || (M[1] = b("svg", {
        class: "dc-pick__mark",
        viewBox: "0 0 16 16",
        "aria-hidden": "true"
      }, [
        b("path", { d: "M4 6l4 4 4-4" })
      ], -1)),
      i.value && d.value ? (u(), N(ut, {
        key: 0,
        to: d.value
      }, [
        Q(k(qa), {
          ref_key: "menu",
          ref: l,
          class: "dc-pick__list",
          style: ie(x.value),
          items: w.value,
          at: i.value,
          label: e.label,
          autofocus: r.value,
          onChoose: v,
          onDismiss: M[0] || (M[0] = (H) => y(!0))
        }, null, 8, ["style", "items", "at", "label", "autofocus"])
      ], 8, ["to"])) : T("", !0)
    ]));
  }
}), Pt = /* @__PURE__ */ U(Ao, [["__scopeId", "data-v-9883dc22"]]), No = {
  key: 2,
  class: "dc-actions__order"
}, Ro = {
  key: 3,
  class: "dc-actions__select"
}, Io = {
  key: 0,
  class: "dc-actions__all"
}, Bo = {
  class: "dc-actions__count",
  "aria-live": "polite"
}, Ho = {
  key: 1,
  class: "dc-actions__count dc-actions__all",
  "aria-live": "polite"
}, qo = { class: "dc-actions__ops" }, Fo = ["disabled"], Vo = ["data-dc-operation", "disabled", "onClick"], Do = ["disabled"], Ko = "…", Wo = /* @__PURE__ */ K({
  __name: "RecordActions",
  props: {
    views: {},
    typeChooser: {},
    selectionPlacement: {}
  },
  setup(e) {
    const t = e, n = ae(), a = f(
      () => n.hasFacets.value || !!n.liveQuery.value.expr.trim() || !!n.within.value
    ), s = Po({
      source: n.source,
      schema: n.schema,
      // What each type holds of what is on screen, the draft's results included:
      // a count of the committed query would disagree with the rows under it.
      query: n.liveQuery,
      entities: n.entities,
      within: n.within
    });
    function o(q) {
      if (q.key === n.query.value.entity && a.value) return Ze(n.total.value);
      if (s.pristine.value) return Ot(q);
      const Y = s.counts.value.get(q.key);
      return Y ? Y.counted ? `${Y.pending ? "~" : ""}${Ze(Y.total)}` : Ko : Ot(q);
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
      () => (t.views ?? [...Kt]).map((q) => ({
        key: q,
        label: q === "record" ? n.recordView.value?.label ?? fn.record : fn[q]
      }))
    ), d = f(() => ft(n.query.value.view, t.views)), m = f(() => c.value.length > 1);
    function w(q) {
      n.setView(q);
    }
    const x = f(
      () => v.value && d.value !== "table" && n.sorts.value.length > 0
    ), $ = f(
      () => n.sorts.value.map((q) => ({ key: q.key, label: q.label }))
    ), y = f(() => x.value && $.value.length > 1), g = f(() => n.query.value.dir === "desc"), S = f(
      () => `Sorted by ${n.sort.value.label}, ${g.value ? "descending" : "ascending"}`
    ), _ = f(() => n.entity.value), v = f(
      () => !jt(n.query.value, t.views) && d.value !== "record"
    ), h = f(() => n.selection.value.ids.length), M = f(
      () => v.value && n.selectable.value && (n.rows.value.length > 0 || h.value > 0)
    ), H = f(() => d.value === "table"), le = f(
      () => i.value || m.value || x.value || v.value && (M.value || !!(_.value?.create || _.value?.duplicate || _.value?.delete || _.value?.operations?.length))
    ), D = f(() => h.value ? `${h.value} selected` : H.value ? "" : "Select all"), j = f(() => t.selectionPlacement === "end");
    function se(q) {
      return h.value ? q.endsWith("…") ? `${q.slice(0, -1)} ${h.value}…` : `${q} ${h.value}` : q;
    }
    return (q, ee) => le.value ? (u(), p("div", {
      key: 0,
      class: fe(["dc-actions", { "dc-actions--selection-end": j.value }])
    }, [
      i.value ? (u(), N(Pt, {
        key: 0,
        class: "dc-actions__pick dc-actions__type",
        label: "Type",
        "model-value": k(n).query.value.entity ?? "",
        options: l.value,
        onOpen: k(s).refresh,
        onClose: k(s).cancel,
        "onUpdate:modelValue": r
      }, null, 8, ["model-value", "options", "onOpen", "onClose"])) : T("", !0),
      m.value ? (u(), N(Pt, {
        key: 1,
        class: "dc-actions__pick dc-actions__view",
        label: "View",
        "model-value": d.value,
        options: c.value,
        "onUpdate:modelValue": w
      }, null, 8, ["model-value", "options"])) : T("", !0),
      x.value ? (u(), p("span", No, [
        y.value ? (u(), N(Pt, {
          key: 0,
          class: "dc-actions__pick dc-actions__sort",
          label: "Sort",
          "model-value": k(n).sort.value.key,
          options: $.value,
          "onUpdate:modelValue": k(n).setSort
        }, null, 8, ["model-value", "options", "onUpdate:modelValue"])) : T("", !0),
        Q(oe, {
          class: "dc-actions__dir",
          "aria-label": S.value,
          title: S.value,
          href: k(n).hrefFor({ dir: g.value ? "asc" : "desc" }),
          onPress: ee[0] || (ee[0] = (Y) => k(n).toggleDirection())
        }, {
          default: X(() => [
            ne(E(g.value ? "↓" : "↑"), 1)
          ]),
          _: 1
        }, 8, ["aria-label", "title", "href"])
      ])) : T("", !0),
      M.value && D.value ? (u(), p("div", Ro, [
        H.value ? (u(), p("span", Ho, E(D.value), 1)) : (u(), p("label", Io, [
          Q(va),
          b("span", Bo, E(D.value), 1)
        ])),
        h.value ? (u(), p("button", {
          key: 2,
          type: "button",
          class: fe(["dc-actions__clear", { "dc-actions__clear--op": j.value }]),
          onClick: ee[1] || (ee[1] = (Y) => k(n).clearSelection())
        }, " Clear ", 2)) : T("", !0)
      ])) : T("", !0),
      b("div", qo, [
        _.value?.create ? (u(), N(oe, {
          key: 0,
          class: "dc-actions__op dc-actions__new",
          href: k(n).createHref?.(_.value),
          onPress: ee[2] || (ee[2] = (Y) => k(n).create(_.value))
        }, {
          default: X(() => [
            ee[5] || (ee[5] = b("span", {
              class: "dc-actions__plus",
              "aria-hidden": "true"
            }, "+", -1)),
            ne(" " + E(_.value.create), 1)
          ]),
          _: 1
        }, 8, ["href"])) : T("", !0),
        _.value?.duplicate ? (u(), p("button", {
          key: 1,
          type: "button",
          class: "dc-actions__op",
          disabled: !h.value,
          onClick: ee[3] || (ee[3] = (Y) => k(n).duplicate())
        }, E(se(_.value.duplicate)), 9, Fo)) : T("", !0),
        (u(!0), p(W, null, J(_.value?.operations ?? [], (Y) => (u(), p("button", {
          key: Y.key,
          type: "button",
          class: "dc-actions__op",
          "data-dc-operation": Y.key,
          disabled: !h.value && Y.selection !== !1,
          onClick: (Z) => k(n).operate(Y.key)
        }, E(Y.selection === !1 ? Y.label : se(Y.label)), 9, Vo))), 128)),
        _.value?.delete ? (u(), p("button", {
          key: 2,
          type: "button",
          class: "dc-actions__op dc-actions__danger",
          disabled: !h.value,
          onClick: ee[4] || (ee[4] = (Y) => k(n).delete())
        }, E(se(_.value.delete)), 9, Do)) : T("", !0)
      ])
    ], 2)) : T("", !0);
  }
}), pa = /* @__PURE__ */ U(Wo, [["__scopeId", "data-v-8f3e4562"]]);
function jo(e, t) {
  if (!e) return null;
  const n = de(e, t);
  return typeof n == "string" && n.trim() ? n : null;
}
const Uo = (e) => e == null || typeof e == "string" && !e.trim();
function zo(e, t) {
  const n = pe(t, "state"), a = pe(t, "tint");
  return {
    identity: Je(pe(t, "identity"), e),
    reference: Je(pe(t, "reference"), e),
    metrics: Bn(t, "metric").map((s) => ({
      column: s,
      label: s.label ?? "",
      text: Te(s, e)
    })),
    facts: t.filter((s) => s.cardLabel && !Uo(de(s, e))).map((s) => ({
      column: s,
      label: s.cardLabel,
      title: [s.label, s.hint].filter(Boolean).join(" — "),
      text: Te(s, e)
    })),
    state: n ? de(n, e) ?? null : null,
    updated: Je(pe(t, "updated"), e),
    image: jo(pe(t, "image"), e),
    tint: a ? de(a, e) ?? null : null
  };
}
function ha(e, t, n, a, s = !1) {
  const o = n?.columns ?? [];
  return {
    row: e,
    key: as(e, t),
    entityLabel: e.entityLabel,
    entity: n,
    columns: o,
    ordinal: Wa(t),
    parts: zo(e, o),
    pinned: a,
    selected: s
  };
}
function Ce() {
  const e = ae(), t = f(
    () => new Map(e.entities.value.map((n) => [n.key, n]))
  );
  return f(
    () => e.rows.value.map(
      (n, a) => ha(
        n,
        e.offset.value + a,
        t.value.get(n.entityKey) ?? null,
        e.isPinned(n),
        e.isSelected(n)
      )
    )
  );
}
const Qo = ["data-dc-status", "data-dc-tone"], Go = /* @__PURE__ */ K({
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
    }, E(n.value), 9, Qo));
  }
}), je = /* @__PURE__ */ U(Go, [["__scopeId", "data-v-686eb9b6"]]), Yo = { key: 1 }, Xo = /* @__PURE__ */ K({
  __name: "MetricDrill",
  props: {
    entry: {},
    column: {}
  },
  setup(e) {
    const t = e, n = ae(), a = f(() => !t.entry.entity?.scope || !t.column.drill ? null : n.entities.value.find((c) => c.key === t.column.drill) ?? null), s = f(() => t.column.label ?? ""), o = f(() => Te(t.column, t.entry.row)), l = f(() => a.value ? n.drillHref(t.entry.row, a.value) : null);
    function i(r, c) {
      c.stopPropagation(), a.value && n.drill(t.entry.row, a.value, r);
    }
    return (r, c) => a.value ? (u(), N(oe, {
      key: 0,
      class: "dc-drill",
      href: l.value,
      title: `${s.value} of ${e.entry.parts.identity} — show the ${a.value.label.toLowerCase()}`,
      onPress: i
    }, {
      default: X(() => [
        G(r.$slots, "default", {}, () => [
          ne(E(o.value), 1)
        ], !0)
      ]),
      _: 3
    }, 8, ["href", "title"])) : (u(), p("span", Yo, [
      G(r.$slots, "default", {}, () => [
        ne(E(o.value), 1)
      ], !0)
    ]));
  }
}), Ue = /* @__PURE__ */ U(Xo, [["__scopeId", "data-v-d3e7f4e0"]]), Jo = ["data-dc-active", "aria-pressed", "aria-label"], Zo = /* @__PURE__ */ K({
  __name: "PinStar",
  props: {
    row: {},
    pinned: { type: Boolean },
    name: {}
  },
  setup(e) {
    const t = e, n = ae();
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
    }, E(e.pinned ? "★" : "☆"), 9, Jo));
  }
}), tn = /* @__PURE__ */ U(Zo, [["__scopeId", "data-v-ef63d763"]]), el = ["src"], tl = /* @__PURE__ */ K({
  __name: "RowPicture",
  props: {
    src: {}
  },
  setup(e) {
    const t = e, n = R(!1);
    return re(
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
    }, null, 40, el)) : T("", !0);
  }
}), bt = /* @__PURE__ */ U(tl, [["__scopeId", "data-v-afaab300"]]), nl = ["data-dc-standing", "title", "aria-label"], al = /* @__PURE__ */ K({
  __name: "QueryMark",
  props: {
    entry: {}
  },
  setup(e) {
    const t = e, n = ae(), a = f(() => gt(t.entry.entity, t.entry.row)), s = f(() => Jt(n.query.value.expr, a.value)), o = f(
      () => s.value === "in" ? `The query narrows to ${t.entry.parts.identity} — press to lift that` : `The query leaves out ${t.entry.parts.identity} — press to lift that`
    );
    function l(i) {
      i.stopPropagation(), n.setExpression(ea(n.query.value.expr, a.value));
    }
    return (i, r) => s.value ? (u(), p("button", {
      key: 0,
      type: "button",
      class: "dc-standing",
      "data-dc-standing": s.value,
      title: o.value,
      "aria-label": o.value,
      onClick: l
    }, E(s.value === "in" ? "+" : "−"), 9, nl)) : T("", !0);
  }
}), nn = /* @__PURE__ */ U(al, [["__scopeId", "data-v-4b8d4166"]]), sl = ["aria-label"], ol = ["data-dc-standing", "data-dc-active", "aria-checked", "title", "aria-label", "onClick"], ll = /* @__PURE__ */ K({
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
      (u(!0), p(W, null, J(s.value, (c) => (u(), p("button", {
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
      }, E(c.sign), 9, ol))), 128))
    ], 8, sl));
  }
}), Ht = /* @__PURE__ */ U(ll, [["__scopeId", "data-v-5524dca6"]]), ma = /* @__PURE__ */ K({
  __name: "RowStanding",
  props: {
    entry: {}
  },
  setup(e) {
    const t = e, n = ae(), a = f(() => gt(t.entry.entity, t.entry.row)), s = f(() => Jt(n.query.value.expr, a.value));
    function o(l) {
      n.setExpression(It(n.query.value.expr, a.value, l));
    }
    return (l, i) => a.value !== null ? (u(), N(Ht, {
      key: 0,
      class: "dc-row-standing",
      standing: s.value,
      name: e.entry.parts.identity,
      onSet: o
    }, null, 8, ["standing", "name"])) : T("", !0);
  }
}), rl = ["href", "title", "aria-label"], il = /* @__PURE__ */ K({
  __name: "OpenMark",
  props: {
    entry: {}
  },
  setup(e) {
    const t = e, n = ae(), a = f(() => {
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
      onClick: o[0] || (o[0] = Le(() => {
      }, ["stop"]))
    }, "↗", 8, rl)) : T("", !0);
  }
}), ze = /* @__PURE__ */ U(il, [["__scopeId", "data-v-b00f390d"]]), cl = /* @__PURE__ */ K({
  __name: "ScopeMark",
  props: {
    entry: {}
  },
  setup(e) {
    const t = e, n = ae(), a = f(
      () => n.narrowsOnPress.value ? null : t.entry.entity?.scope ?? null
    ), s = R(null);
    function o(d) {
      s.value = kt(d).exclude ? "out" : "in";
    }
    function l(d) {
      o(d), window.addEventListener("keydown", o), window.addEventListener("keyup", o);
    }
    function i() {
      s.value = null, window.removeEventListener("keydown", o), window.removeEventListener("keyup", o);
    }
    ge(i);
    const r = f(() => a.value ? n.drillHref(t.entry.row, null) : null);
    function c(d, m) {
      m.stopPropagation(), n.drill(t.entry.row, null, d);
    }
    return (d, m) => a.value ? (u(), N(oe, {
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
      default: X(() => [...m[0] || (m[0] = [
        ne(" → ", -1)
      ])]),
      _: 1
    }, 8, ["href", "data-dc-pending", "title", "aria-label"])) : T("", !0);
  }
}), Qe = /* @__PURE__ */ U(cl, [["__scopeId", "data-v-05d2c233"]]), ul = ["checked", "aria-label"], Pe = /* @__PURE__ */ K({
  __name: "SelectTick",
  props: {
    row: {},
    selected: { type: Boolean },
    name: {}
  },
  setup(e) {
    const t = e, n = ae();
    function a(s) {
      s.stopPropagation(), n.toggleSelect(t.row);
    }
    return (s, o) => (u(), p("input", {
      class: "dc-tick",
      type: "checkbox",
      checked: e.selected,
      "aria-label": `Select ${e.name}`,
      onClick: a
    }, null, 8, ul));
  }
}), dl = { class: "dc-card__top dc-mono" }, fl = { class: "dc-card__lead" }, vl = {
  key: 2,
  class: "dc-card__entity"
}, pl = { class: "dc-card__top-right" }, hl = { class: "dc-card__names" }, ml = { class: "dc-card__primary" }, yl = {
  key: 0,
  class: "dc-card__secondary dc-mono"
}, _l = {
  key: 1,
  class: "dc-card__facts dc-mono"
}, gl = ["title"], wl = { class: "dc-card__fact-label" }, kl = {
  key: 0,
  class: "dc-card__metrics dc-mono"
}, bl = {
  key: 0,
  class: "dc-card__date"
}, $l = /* @__PURE__ */ K({
  __name: "CardsView",
  setup(e) {
    const t = ae(), n = Ce(), a = f(() => t.isEverything.value), s = (l) => l.entity?.card === "picture", o = f(() => n.value.length > 0 && n.value.every(s));
    return (l, i) => (u(), p("div", {
      class: fe(["dc-cards", { "dc-cards--pictures": o.value }])
    }, [
      (u(!0), p(W, null, J(k(n), (r) => (u(), p("div", {
        key: r.key,
        class: fe(["dc-card", { "dc-card--picture": s(r) }])
      }, [
        b("div", dl, [
          b("span", fl, [
            k(t).selectable.value ? (u(), N(Pe, {
              key: 0,
              row: r.row,
              selected: r.selected,
              name: r.parts.identity
            }, null, 8, ["row", "selected", "name"])) : T("", !0),
            s(r) ? T("", !0) : (u(), p(W, { key: 1 }, [
              ne(E(r.ordinal), 1)
            ], 64)),
            a.value ? (u(), p("span", vl, E(r.entityLabel), 1)) : T("", !0)
          ]),
          b("span", pl, [
            r.parts.state && !s(r) ? (u(), N(je, {
              key: 0,
              status: r.parts.state
            }, null, 8, ["status"])) : T("", !0),
            s(r) ? (u(), N(nn, {
              key: 1,
              entry: r
            }, null, 8, ["entry"])) : (u(), N(ma, {
              key: 2,
              entry: r
            }, null, 8, ["entry"])),
            Q(Qe, { entry: r }, null, 8, ["entry"]),
            Q(ze, { entry: r }, null, 8, ["entry"]),
            k(t).pinnable.value ? (u(), N(tn, {
              key: 3,
              row: r.row,
              name: r.parts.identity,
              pinned: r.pinned
            }, null, 8, ["row", "name", "pinned"])) : T("", !0)
          ])
        ]),
        Q(oe, {
          class: "dc-card__open",
          href: k(t).pressHref(r.row),
          onPress: (c) => k(t).activate(r.row, c)
        }, {
          default: X(() => [
            r.parts.image ? (u(), N(bt, {
              key: 0,
              class: "dc-card__image",
              src: r.parts.image
            }, null, 8, ["src"])) : T("", !0),
            b("span", hl, [
              b("span", ml, E(r.parts.identity), 1),
              s(r) ? T("", !0) : (u(), p("span", yl, E(r.parts.reference), 1)),
              r.parts.facts.length ? (u(), p("span", _l, [
                (u(!0), p(W, null, J(r.parts.facts, (c) => (u(), p("span", {
                  key: c.column.key ?? c.label,
                  class: "dc-card__fact",
                  title: c.title || void 0
                }, [
                  b("span", wl, E(c.label), 1),
                  ne(" " + E(c.text), 1)
                ], 8, gl))), 128))
              ])) : T("", !0)
            ])
          ]),
          _: 2
        }, 1032, ["href", "onPress"]),
        s(r) ? T("", !0) : (u(), p("div", kl, [
          (u(!0), p(W, null, J(r.parts.metrics.slice(0, 2), (c) => (u(), N(Ue, {
            key: c.column.key ?? c.label,
            entry: r,
            column: c.column
          }, {
            default: X(() => [
              ne(E(c.label) + " " + E(c.text), 1)
            ]),
            _: 2
          }, 1032, ["entry", "column"]))), 128)),
          r.parts.updated ? (u(), p("span", bl, E(r.parts.updated), 1)) : T("", !0)
        ]))
      ], 2))), 128))
    ], 2));
  }
}), ya = /* @__PURE__ */ U($l, [["__scopeId", "data-v-fd252138"]]), xl = { class: "dc-grid" }, Sl = { class: "dc-tile__scrim" }, Cl = { class: "dc-tile__top dc-mono" }, Pl = { class: "dc-tile__chip" }, El = { class: "dc-tile__caption" }, Ll = { class: "dc-tile__secondary dc-truncate" }, Tl = { class: "dc-tile__primary" }, Ml = /* @__PURE__ */ K({
  __name: "GridView",
  setup(e) {
    const t = ae(), n = Ce();
    return (a, s) => (u(), p("div", xl, [
      (u(!0), p(W, null, J(k(n), (o) => (u(), p("div", {
        key: o.key,
        class: "dc-grid__cell"
      }, [
        Q(oe, {
          class: "dc-tile",
          style: ie({ "--dc-tile-tint": o.parts.tint ?? void 0 }),
          href: k(t).pressHref(o.row),
          onPress: (l) => k(t).activate(o.row, l)
        }, {
          default: X(() => [
            o.parts.image ? (u(), N(bt, {
              key: 0,
              class: "dc-tile__image",
              src: o.parts.image
            }, null, 8, ["src"])) : T("", !0),
            b("span", Sl, [
              b("span", Cl, [
                b("span", Pl, E(o.ordinal), 1)
              ]),
              b("span", El, [
                b("span", Ll, E(o.parts.reference), 1),
                b("span", Tl, E(o.parts.identity), 1)
              ])
            ])
          ]),
          _: 2
        }, 1032, ["style", "href", "onPress"]),
        k(t).selectable.value ? (u(), N(Pe, {
          key: 0,
          class: "dc-grid__tick",
          row: o.row,
          selected: o.selected,
          name: o.parts.identity
        }, null, 8, ["row", "selected", "name"])) : T("", !0)
      ]))), 128))
    ]));
  }
}), _a = /* @__PURE__ */ U(Ml, [["__scopeId", "data-v-89c40a9e"]]);
function Cn(e, t, n, a) {
  return (n - a * (t - 1)) / e;
}
function Et(e, t) {
  return e > 0 ? Math.min(t, e) : t;
}
function Ol(e) {
  return e > 0 ? e : 1 / 0;
}
function Al(e, t, n) {
  const { width: a, height: s, gap: o = 0 } = n;
  if (!e.length) return [];
  if (!(a > 0) || !(s > 0)) return [{ items: [...e], height: s, filled: !1 }];
  const l = [];
  let i = [], r = 0, c = 0;
  for (const d of e) {
    const m = t(d), w = Math.max(m.ratio, Number.EPSILON), x = m.height && m.height > 0 ? Math.max(c, m.height) : c, $ = Et(x, s), y = Cn(r + w, i.length + 1, a, o);
    if (y > $) {
      i.push(d), r += w, c = x;
      continue;
    }
    const g = Et(c, s), S = i.length ? Cn(r, i.length, a, o) : 1 / 0;
    S <= Ol(c) && S - g < $ - y ? (l.push({ items: i, height: S, filled: !0 }), i = [d], r = w, c = m.height && m.height > 0 ? m.height : 0) : (l.push({ items: [...i, d], height: y, filled: !0 }), i = [], r = 0, c = 0);
  }
  return i.length && l.push({ items: i, height: Et(c, s), filled: !1 }), l;
}
const Nl = { class: "dc-images" }, Rl = {
  key: 1,
  class: "dc-images__blank",
  "aria-hidden": "true"
}, Il = 240, Xe = 8, Bl = 1, Hl = /* @__PURE__ */ K({
  __name: "ImagesView",
  setup(e) {
    const t = ae(), n = Ce(), a = ln(/* @__PURE__ */ new Map()), s = ln(/* @__PURE__ */ new Set());
    function o($, y) {
      const g = y.target;
      g.naturalWidth > 0 && g.naturalHeight > 0 && a.set($, { width: g.naturalWidth, height: g.naturalHeight });
    }
    function l($) {
      const y = $.parts.image;
      return y && !s.has(y) ? y : null;
    }
    function i($) {
      const y = l($);
      return y ? a.get(y) : void 0;
    }
    function r($) {
      const y = i($);
      return y ? { ratio: y.width / y.height, height: y.height } : { ratio: Bl };
    }
    const c = R(null), d = R(0);
    let m = null;
    function w() {
      d.value = c.value?.clientWidth ?? 0;
    }
    dt(() => {
      w(), !(!c.value || typeof ResizeObserver > "u") && (m = new ResizeObserver(w), m.observe(c.value));
    }), ge(() => {
      m?.disconnect(), m = null;
    });
    const x = f(() => {
      const $ = Al(n.value, r, {
        width: d.value,
        height: Il,
        gap: Xe
      }), y = [];
      let g = 0;
      for (const S of $) {
        let _ = 0;
        for (const v of S.items) {
          const h = r(v).ratio * S.height, M = i(v), H = M !== void 0 && M.height < S.height;
          y.push({
            entry: v,
            style: {
              top: `${g}px`,
              left: `${_}px`,
              width: `${h}px`,
              height: `${S.height}px`
            },
            picture: H ? { width: `${M.width}px`, height: `${M.height}px` } : { width: "100%", height: "100%" }
          }), _ += h + Xe;
        }
        g += S.height + Xe;
      }
      return { boxes: y, height: $.length ? g - Xe : 0 };
    });
    return ($, y) => (u(), p("div", Nl, [
      b("div", {
        ref_key: "wall",
        ref: c,
        class: "dc-images__wall",
        style: ie({ height: `${x.value.height}px` })
      }, [
        (u(!0), p(W, null, J(x.value.boxes, ({ entry: g, style: S, picture: _ }) => (u(), p("div", {
          key: g.key,
          class: "dc-images__cell",
          style: ie(S)
        }, [
          Q(oe, {
            class: "dc-images__open",
            title: g.parts.identity,
            "aria-label": g.parts.identity,
            href: k(t).pressHref(g.row),
            onPress: (v) => k(t).activate(g.row, v)
          }, {
            default: X(() => [
              l(g) ? (u(), N(bt, {
                key: 0,
                class: "dc-images__picture",
                style: ie(_),
                src: l(g),
                onLoad: (v) => o(l(g), v),
                onError: (v) => s.add(l(g))
              }, null, 8, ["style", "src", "onLoad", "onError"])) : (u(), p("span", Rl, E(g.parts.identity), 1))
            ]),
            _: 2
          }, 1032, ["title", "aria-label", "href", "onPress"]),
          k(t).selectable.value ? (u(), N(Pe, {
            key: 0,
            class: "dc-images__tick",
            row: g.row,
            selected: g.selected,
            name: g.parts.identity
          }, null, 8, ["row", "selected", "name"])) : T("", !0)
        ], 4))), 128))
      ], 4)
    ]));
  }
}), ga = /* @__PURE__ */ U(Hl, [["__scopeId", "data-v-2d267370"]]), ql = { class: "dc-links" }, Fl = { class: "dc-link__primary dc-truncate" }, Vl = { class: "dc-link__secondary dc-mono dc-truncate" }, Dl = /* @__PURE__ */ K({
  __name: "LinksView",
  setup(e) {
    const t = ae(), n = Ce();
    return (a, s) => (u(), p("div", ql, [
      (u(!0), p(W, null, J(k(n), (o) => (u(), p("span", {
        key: o.key,
        class: "dc-links__item"
      }, [
        k(t).selectable.value ? (u(), N(Pe, {
          key: 0,
          row: o.row,
          selected: o.selected,
          name: o.parts.identity
        }, null, 8, ["row", "selected", "name"])) : T("", !0),
        Q(oe, {
          class: "dc-link",
          href: k(t).pressHref(o.row),
          onPress: (l) => k(t).activate(o.row, l)
        }, {
          default: X(() => [
            b("span", Fl, E(o.parts.identity), 1),
            b("span", Vl, E(o.parts.reference), 1)
          ]),
          _: 2
        }, 1032, ["href", "onPress"])
      ]))), 128))
    ]));
  }
}), wa = /* @__PURE__ */ U(Dl, [["__scopeId", "data-v-de6c9a0f"]]), Kl = {
  class: "dc-list",
  role: "list"
}, Wl = { class: "dc-list__ordinal dc-mono" }, jl = { class: "dc-list__identity" }, Ul = { class: "dc-list__primary dc-truncate" }, zl = { class: "dc-list__secondary dc-mono dc-truncate" }, Ql = {
  key: 1,
  class: "dc-list__entity dc-mono"
}, Gl = { class: "dc-list__metrics dc-mono" }, Yl = { class: "dc-list__trailing" }, Xl = /* @__PURE__ */ K({
  __name: "ListView",
  setup(e) {
    const t = ae(), n = Ce(), a = f(() => t.isEverything.value);
    return (s, o) => (u(), p("div", Kl, [
      (u(!0), p(W, null, J(k(n), (l) => (u(), p("div", {
        key: l.key,
        class: "dc-list__row",
        role: "listitem"
      }, [
        k(t).selectable.value ? (u(), N(Pe, {
          key: 0,
          class: "dc-list__tick",
          row: l.row,
          selected: l.selected,
          name: l.parts.identity
        }, null, 8, ["row", "selected", "name"])) : T("", !0),
        Q(ma, {
          class: "dc-list__standing",
          entry: l
        }, null, 8, ["entry"]),
        Q(oe, {
          class: "dc-list__open",
          href: k(t).pressHref(l.row),
          onPress: (i) => k(t).activate(l.row, i)
        }, {
          default: X(() => [
            b("span", Wl, E(l.ordinal), 1),
            b("span", jl, [
              b("span", Ul, E(l.parts.identity), 1),
              b("span", zl, E(l.parts.reference), 1)
            ])
          ]),
          _: 2
        }, 1032, ["href", "onPress"]),
        a.value ? (u(), p("span", Ql, E(l.entityLabel), 1)) : T("", !0),
        b("span", Gl, [
          (u(!0), p(W, null, J(l.parts.metrics.slice(0, 2), (i) => (u(), N(Ue, {
            key: i.column.key ?? i.label,
            entry: l,
            column: i.column
          }, null, 8, ["entry", "column"]))), 128))
        ]),
        b("span", Yl, [
          l.parts.state ? (u(), N(je, {
            key: 0,
            status: l.parts.state
          }, null, 8, ["status"])) : T("", !0),
          Q(Qe, { entry: l }, null, 8, ["entry"]),
          Q(ze, { entry: l }, null, 8, ["entry"]),
          k(t).pinnable.value ? (u(), N(tn, {
            key: 1,
            row: l.row,
            name: l.parts.identity,
            pinned: l.pinned
          }, null, 8, ["row", "name", "pinned"])) : T("", !0)
        ])
      ]))), 128))
    ]));
  }
}), qt = /* @__PURE__ */ U(Xl, [["__scopeId", "data-v-3d349a10"]]), Jl = { class: "dc-preview" }, Zl = { class: "dc-preview__pager dc-mono" }, er = ["disabled"], tr = { "aria-live": "polite" }, nr = ["disabled"], ar = {
  key: 0,
  class: "dc-preview__card"
}, sr = ["src"], or = { class: "dc-preview__body" }, lr = { class: "dc-preview__top" }, rr = { class: "dc-preview__badges" }, ir = { class: "dc-preview__entity dc-mono" }, cr = { class: "dc-preview__marks" }, ur = { class: "dc-preview__primary" }, dr = { class: "dc-preview__secondary dc-mono" }, fr = { class: "dc-preview__fields" }, vr = { class: "dc-preview__key" }, pr = { class: "dc-preview__value dc-mono" }, hr = /* @__PURE__ */ K({
  __name: "PreviewView",
  setup(e) {
    const t = ae(), n = Ce(), a = R(0);
    re(n, (r) => {
      a.value > r.length - 1 && (a.value = Math.max(0, r.length - 1));
    });
    const s = f(() => n.value[a.value]), o = f(() => {
      const r = s.value;
      if (!r) return [];
      const c = pe(r.columns, "reference"), d = pe(r.columns, "updated");
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
    return (r, c) => (u(), p("div", Jl, [
      b("div", Zl, [
        b("button", {
          type: "button",
          class: "dc-preview__step",
          "aria-label": "Previous result",
          disabled: a.value === 0,
          onClick: c[0] || (c[0] = (d) => i(-1))
        }, " ‹ ", 8, er),
        b("span", tr, E(l.value), 1),
        b("button", {
          type: "button",
          class: "dc-preview__step",
          "aria-label": "Next result",
          disabled: a.value >= k(n).length - 1,
          onClick: c[1] || (c[1] = (d) => i(1))
        }, " › ", 8, nr)
      ]),
      s.value ? (u(), p("div", ar, [
        b("div", {
          class: "dc-preview__media",
          style: ie({ background: s.value.parts.tint ?? void 0 }),
          "aria-hidden": "true"
        }, [
          s.value.parts.image ? (u(), p("img", {
            key: 0,
            class: "dc-preview__image",
            src: s.value.parts.image,
            alt: ""
          }, null, 8, sr)) : (u(), p(W, { key: 1 }, [
            ne(" preview ")
          ], 64))
        ], 4),
        b("div", or, [
          b("div", lr, [
            b("span", rr, [
              k(t).selectable.value ? (u(), N(Pe, {
                key: 0,
                row: s.value.row,
                selected: s.value.selected,
                name: s.value.parts.identity
              }, null, 8, ["row", "selected", "name"])) : T("", !0),
              s.value.parts.state ? (u(), N(je, {
                key: 1,
                status: s.value.parts.state
              }, null, 8, ["status"])) : T("", !0),
              b("span", ir, E(s.value.entityLabel), 1)
            ]),
            b("span", cr, [
              Q(nn, { entry: s.value }, null, 8, ["entry"]),
              Q(Qe, { entry: s.value }, null, 8, ["entry"]),
              Q(ze, { entry: s.value }, null, 8, ["entry"]),
              k(t).pinnable.value ? (u(), N(tn, {
                key: 0,
                row: s.value.row,
                name: s.value.parts.identity,
                pinned: s.value.pinned
              }, null, 8, ["row", "name", "pinned"])) : T("", !0)
            ])
          ]),
          b("div", null, [
            b("div", ur, E(s.value.parts.identity), 1),
            b("div", dr, E(s.value.parts.reference), 1)
          ]),
          b("dl", fr, [
            (u(!0), p(W, null, J(o.value, (d) => (u(), p("div", {
              key: d.key,
              class: "dc-preview__field"
            }, [
              b("dt", vr, E(d.key), 1),
              b("dd", pr, [
                d.column && s.value ? (u(), N(Ue, {
                  key: 0,
                  entry: s.value,
                  column: d.column
                }, null, 8, ["entry", "column"])) : (u(), p(W, { key: 1 }, [
                  ne(E(d.value), 1)
                ], 64))
              ])
            ]))), 128))
          ]),
          Q(oe, {
            class: "dc-preview__open",
            href: s.value ? k(t).pressHref(s.value.row) : null,
            onPress: c[2] || (c[2] = (d) => s.value && k(t).activate(s.value.row, d))
          }, {
            default: X(() => [...c[3] || (c[3] = [
              ne(" Open record → ", -1)
            ])]),
            _: 1
          }, 8, ["href"])
        ])
      ])) : T("", !0)
    ]));
  }
}), ka = /* @__PURE__ */ U(hr, [["__scopeId", "data-v-59e0d33b"]]);
function mr() {
  const e = ae();
  return f(() => ts(e.schema.value, e.entity.value));
}
const yr = /* @__PURE__ */ K({
  __name: "ColumnCell",
  props: {
    column: {},
    entry: {}
  },
  setup(e) {
    const t = e, n = ae(), a = f(() => t.column.kind ?? "text"), s = f(() => de(t.column, t.entry.row)), o = f(
      () => a.value === "ordinal" ? t.entry.ordinal : Te(t.column, t.entry.row)
    ), l = f(() => s.value), i = f(() => t.column.activate === !0 || !!t.column.click), r = f(() => At(t.column)), c = f(() => Hn(t.column, t.entry.row));
    function d(x) {
      i.value && (x.stopPropagation(), m(kt(x)));
    }
    function m(x) {
      t.column.click?.(t.entry.row, x), t.column.activate && n.activate(t.entry.row, x);
    }
    const w = f(
      () => t.column.activate && !t.column.click ? n.pressHref(t.entry.row) : null
    );
    return (x, $) => a.value === "component" && e.column.component ? (u(), N(Ie(e.column.component), {
      key: 0,
      row: e.entry.row,
      entry: e.entry,
      value: s.value,
      column: e.column
    }, null, 8, ["row", "entry", "value", "column"])) : a.value === "status" ? (u(), N(je, {
      key: 1,
      status: l.value
    }, null, 8, ["status"])) : a.value === "image" ? (u(), N(bt, {
      key: 2,
      class: "dc-cell__image",
      src: typeof s.value == "string" ? s.value : "",
      style: ie({ maxHeight: e.column.height }),
      onClick: d
    }, null, 8, ["src", "style"])) : e.column.drill ? (u(), N(Ue, {
      key: 3,
      entry: e.entry,
      column: e.column
    }, null, 8, ["entry", "column"])) : i.value ? (u(), N(oe, {
      key: 4,
      class: fe(["dc-table__open", { "dc-truncate": r.value }]),
      href: w.value,
      title: c.value,
      onPress: $[0] || ($[0] = (y, g) => {
        g.stopPropagation(), m(y);
      })
    }, {
      default: X(() => [
        ne(E(o.value), 1)
      ]),
      _: 1
    }, 8, ["class", "href", "title"])) : (u(), p("span", {
      key: 5,
      class: fe(["dc-cell__text", { "dc-truncate": r.value }])
    }, E(o.value), 3));
  }
}), Pn = /* @__PURE__ */ U(yr, [["__scopeId", "data-v-3196ba40"]]), _r = {
  key: 0,
  class: "dc-table__none"
}, gr = { class: "dc-table__detail" }, wr = ["data-dc-wrap", "data-dc-row-links"], kr = {
  key: 0,
  class: "dc-table__pick",
  scope: "col"
}, br = {
  key: 1,
  class: "dc-table__standing",
  scope: "col"
}, $r = ["data-dc-align", "data-dc-hide", "aria-sort", "title"], xr = {
  key: 2,
  class: "dc-table__head"
}, Sr = ["onClick"], Cr = {
  key: 0,
  class: "dc-table__pick"
}, Pr = {
  key: 1,
  class: "dc-table__standing"
}, Er = ["data-dc-align", "data-dc-hide", "title"], Lr = {
  key: 1,
  class: "dc-table__name"
}, Tr = /* @__PURE__ */ K({
  __name: "TableView",
  setup(e) {
    const t = ae(), n = Ce(), a = mr();
    function s(L, F) {
      const O = t.pressHref(L);
      if (O && ta(F)) {
        const V = F.shiftKey ? `noopener,popup,width=${window.outerWidth},height=${window.outerHeight}` : "noopener";
        window.open(O, "_blank", V);
        return;
      }
      t.activate(L, kt(F));
    }
    const o = f(() => t.rowLinks?.value ? new Map(n.value.map((L) => [L.key, t.pressHref(L.row)])) : /* @__PURE__ */ new Map()), l = f(
      () => a.value.find((L) => L.role === "identity") ?? a.value[0]
    );
    function i(L, F, O) {
      O.stopPropagation(), t.activate(L, F);
    }
    function r(L) {
      const F = Kn(L, t.entity.value, t.schema.value), O = F ? `Shortcut: ${F}` : void 0;
      return [L.hint, O].filter(Boolean).join(`
`) || void 0;
    }
    const c = f(() => {
      const L = a.value.find((O) => O.scope);
      return L || ((t.entity.value ? !!t.entity.value.href : t.entities.value.some((O) => O.href)) ? a.value.find((O) => O.activate) : void 0);
    }), d = f(
      () => t.entity.value ? !!t.entity.value.scope : t.entities.value.some((L) => L.scope)
    ), m = (L) => gt(L.entity, L.row), w = (L) => Jt(t.query.value.expr, m(L));
    function x(L, F) {
      t.setExpression(It(t.query.value.expr, m(L), F));
    }
    const $ = f(() => {
      const L = n.value.filter((O) => m(O) !== null), F = L.filter((O) => O.selected);
      return F.length ? F : L;
    }), y = f(() => $.value.some((L) => L.selected)), g = f(() => {
      const L = $.value[0];
      return L ? w(L) : null;
    }), S = f(
      () => $.value.some((L) => w(L) !== g.value)
    ), _ = f(
      () => y.value ? "the ticked rows" : "every row on this page"
    );
    function v(L) {
      t.setExpression(
        $.value.reduce(
          (F, O) => It(F, m(O), L),
          t.query.value.expr
        )
      );
    }
    const h = f(
      () => a.value.some((L) => L.kind === "image" || L.height !== void 0)
    );
    function M(L) {
      L && (t.query.value.sort === L ? t.toggleDirection() : t.setSort(L));
    }
    function H(L) {
      return L ? t.query.value.sort === L ? t.hrefFor({ dir: t.query.value.dir === "desc" ? "asc" : "desc" }) : t.hrefFor({ sort: L }) : null;
    }
    const le = f(() => t.entity.value?.label ?? "The result set"), D = f(() => new Set(t.sorts.value.map((L) => L.key))), j = (L) => L.sort !== void 0 && D.value.has(L.sort), se = (L) => {
      if (j(L))
        return t.query.value.sort !== L.sort ? "none" : t.query.value.dir === "desc" ? "descending" : "ascending";
    };
    function q(L) {
      return [
        hn(L),
        L.muted ? "dc-table__muted" : "",
        L.mono ? "dc-mono" : "",
        At(L) ? "dc-truncate" : ""
      ].filter(Boolean).join(" ");
    }
    function ee(L, F) {
      if (!(!At(L) || L.activate || L.click))
        return Hn(L, F.row);
    }
    const Y = R(null);
    function Z(L) {
      Y.value && (Y.value.scrollLeft = L.target.scrollLeft);
    }
    return (L, F) => k(a).length ? (u(), p("table", {
      key: 1,
      class: "dc-table",
      "data-dc-wrap": h.value ? "" : void 0,
      "data-dc-row-links": k(t).rowLinks?.value ? "" : void 0
    }, [
      b("thead", {
        ref_key: "head",
        ref: Y,
        "data-dc-stuck": ""
      }, [
        b("tr", null, [
          k(t).selectable.value ? (u(), p("th", kr, [
            Q(va)
          ])) : T("", !0),
          d.value ? (u(), p("th", br, [
            $.value.length ? (u(), N(Ht, {
              key: 0,
              standing: g.value,
              mixed: S.value,
              name: _.value,
              onSet: v
            }, null, 8, ["standing", "mixed", "name"])) : T("", !0)
          ])) : T("", !0),
          (u(!0), p(W, null, J(k(a), (O, V) => (u(), p("th", {
            key: k(vn)(O, V),
            scope: "col",
            class: fe(k(hn)(O)),
            style: ie({ width: O.width }),
            "data-dc-align": k(pn)(O),
            "data-dc-hide": O.hideBelow,
            "aria-sort": se(O),
            title: r(O)
          }, [
            j(O) ? (u(), N(oe, {
              key: 0,
              class: "dc-table__sort",
              href: H(O.sort),
              onPress: (ve) => M(O.sort)
            }, {
              default: X(() => [
                ne(E(O.label), 1)
              ]),
              _: 2
            }, 1032, ["href", "onPress"])) : (u(), p(W, { key: 1 }, [
              ne(E(O.label), 1)
            ], 64)),
            O.header ? (u(), p("span", xr, [
              (u(), N(Ie(O.header), {
                column: O,
                entity: k(t).entity.value
              }, null, 8, ["column", "entity"]))
            ])) : T("", !0)
          ], 14, $r))), 128))
        ])
      ], 512),
      b("tbody", {
        "data-dc-scroll": "",
        onScroll: Z
      }, [
        (u(!0), p(W, null, J(k(n), (O) => (u(), p("tr", {
          key: O.key,
          class: "dc-table__row",
          onClick: (V) => s(O.row, V)
        }, [
          k(t).selectable.value ? (u(), p("td", Cr, [
            Q(Pe, {
              row: O.row,
              selected: O.selected,
              name: O.parts.identity
            }, null, 8, ["row", "selected", "name"])
          ])) : T("", !0),
          d.value ? (u(), p("td", Pr, [
            m(O) !== null ? (u(), N(Ht, {
              key: 0,
              standing: w(O),
              name: O.parts.identity,
              onSet: (V) => x(O, V)
            }, null, 8, ["standing", "name", "onSet"])) : T("", !0)
          ])) : T("", !0),
          (u(!0), p(W, null, J(k(a), (V, ve) => (u(), p("td", {
            key: k(vn)(V, ve),
            class: fe(q(V)),
            style: ie({ width: V.width }),
            "data-dc-align": k(pn)(V),
            "data-dc-hide": V.hideBelow,
            title: ee(V, O)
          }, [
            o.value.get(O.key) ? (u(), N(oe, {
              key: 0,
              class: "dc-table__cell-link",
              href: o.value.get(O.key),
              tabindex: V === l.value ? void 0 : -1,
              "aria-hidden": V === l.value ? void 0 : "true",
              "aria-label": V === l.value ? O.parts.identity : void 0,
              onPress: (Ee, C) => i(O.row, Ee, C)
            }, null, 8, ["href", "tabindex", "aria-hidden", "aria-label", "onPress"])) : T("", !0),
            V === c.value ? (u(), p("span", Lr, [
              Q(Pn, {
                column: V,
                entry: O
              }, null, 8, ["column", "entry"]),
              Q(Qe, { entry: O }, null, 8, ["entry"]),
              Q(ze, { entry: O }, null, 8, ["entry"])
            ])) : (u(), N(Pn, {
              key: 2,
              column: V,
              entry: O
            }, null, 8, ["column", "entry"]))
          ], 14, Er))), 128))
        ], 8, Sr))), 128))
      ], 32)
    ], 8, wr)) : (u(), p("p", _r, [
      F[2] || (F[2] = b("span", { class: "dc-table__headline" }, "No columns declared", -1)),
      b("span", gr, [
        ne(E(le.value) + " has no ", 1),
        F[0] || (F[0] = b("code", null, "columns", -1)),
        F[1] || (F[1] = ne(" in the schema, so there is no table to draw. ", -1))
      ])
    ]));
  }
}), ba = /* @__PURE__ */ U(Tr, [["__scopeId", "data-v-66fa1713"]]);
function Mr(e) {
  const t = _e([]), n = R(!1), a = _e(null);
  let s = 0;
  const o = (r, c, d, m, w) => ({
    entity: r,
    rows: e.limit.value > 0 ? c.rows.map((x, $) => ha(x, $, r, e.isPinned(x.id))) : [],
    total: c.total,
    count: d ? Ot(r) : Ze(c.total),
    pinned: Or(m, c, w)
  }), l = () => {
    const r = ++s, c = e.query.value, d = e.schema.value, m = e.entities.value, w = e.limit.value, x = e.within?.value.trim() ?? "", $ = Wt(c) && !x, y = x ? Qt(x, c.expr) : c.expr, g = m.map((S) => ({
      entity: S,
      // Scope the query to this entity, keeping the expression and ordering.
      outcome: e.source.value.query({
        // Each card is the top few of its type, wherever the shell's own
        // result set has been paged to — so this asks for the first page.
        query: { ...c, entity: S.key, expr: y, page: 1 },
        schema: d,
        entity: S,
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
    if (g.every(({ outcome: S }) => !(S instanceof Promise))) {
      t.value = g.map(
        ({ entity: S, outcome: _ }) => o(S, _, $, d, y)
      ), a.value = null, n.value = !1;
      return;
    }
    n.value = !0, Promise.all(g.map(({ outcome: S }) => Promise.resolve(S))).then((S) => {
      r === s && (t.value = S.map(
        (_, v) => o(g[v].entity, _, $, d, y)
      ), a.value = null);
    }).catch((S) => {
      r === s && (a.value = S, t.value = []);
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
  return re(
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
function Or(e, t, n) {
  const a = t.rows[0];
  if (t.total !== 1 || t.rows.length !== 1 || !a)
    return !1;
  const s = n.trim();
  if (!s)
    return !1;
  const o = st(e, a);
  return !!o && We(s, o) === s;
}
const Ar = ["data-dc-pending", "data-dc-heads-only"], Nr = {
  key: 0,
  class: "dc-types__state",
  role: "alert"
}, Rr = {
  key: 1,
  class: "dc-types__state",
  "aria-live": "polite"
}, Ir = {
  key: 2,
  class: "dc-types__state"
}, Br = ["data-dc-empty"], Hr = { class: "dc-type__name" }, qr = { class: "dc-type__count dc-mono" }, Fr = { class: "dc-type__sr" }, Vr = {
  key: 0,
  class: "dc-type__description"
}, Dr = {
  key: 0,
  class: "dc-type__empty"
}, Kr = { class: "dc-type__identity" }, Wr = { class: "dc-type__primary dc-truncate" }, jr = { class: "dc-type__secondary dc-mono dc-truncate" }, Ur = { class: "dc-type__trailing dc-mono" }, zr = { class: "dc-type__metric-value" }, Qr = { class: "dc-type__metric-label" }, Gr = {
  key: 0,
  class: "dc-type__date"
}, Yr = /* @__PURE__ */ K({
  __name: "TypeCardsView",
  setup(e) {
    const t = ae(), { previews: n, pending: a, error: s } = Mr({
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
      "data-dc-pending": k(a) ? "true" : "false",
      "data-dc-heads-only": l.value ? "true" : "false"
    }, [
      G(r.$slots, "before", {}, void 0, !0),
      k(s) ? (u(), p("p", Nr, " Could not load results: " + E(k(s) instanceof Error ? k(s).message : "the data source failed."), 1)) : !i.value.length && k(a) ? (u(), p("p", Rr, " Running query… ")) : i.value.length ? T("", !0) : (u(), p("p", Ir, E(o.value ? "Nothing matches this query" : "Nothing here yet"), 1)),
      (u(!0), p(W, null, J(i.value, (d) => (u(), p("section", {
        key: d.entity.key,
        class: "dc-type",
        "data-dc-empty": d.total ? "false" : "true"
      }, [
        Q(oe, {
          class: "dc-type__head",
          href: k(t).entityHref(d.entity.key),
          onPress: (m) => k(t).setEntity(d.entity.key)
        }, {
          default: X(() => [
            b("span", Hr, E(d.entity.label), 1),
            b("span", qr, E(d.count), 1),
            c[0] || (c[0] = b("span", {
              class: "dc-type__go",
              "aria-hidden": "true"
            }, "→", -1)),
            b("span", Fr, "Show only " + E(d.entity.label.toLowerCase()), 1),
            d.entity.description ? (u(), p("span", Vr, E(d.entity.description), 1)) : T("", !0)
          ]),
          _: 2
        }, 1032, ["href", "onPress"]),
        d.total ? T("", !0) : (u(), p("p", Dr, E(o.value ? "No matches" : "Nothing here yet"), 1)),
        (u(!0), p(W, null, J(d.rows, (m) => (u(), p("div", {
          key: m.key,
          class: "dc-type__row"
        }, [
          Q(oe, {
            class: "dc-type__open",
            href: k(t).pressHref(m.row),
            onPress: (w) => k(t).activate(m.row, w)
          }, {
            default: X(() => [
              b("span", Kr, [
                b("span", Wr, E(m.parts.identity), 1),
                b("span", jr, E(m.parts.reference), 1)
              ])
            ]),
            _: 2
          }, 1032, ["href", "onPress"]),
          b("span", Ur, [
            (u(!0), p(W, null, J(m.parts.metrics.slice(0, 1), (w) => (u(), N(Ue, {
              key: w.column.key ?? w.label,
              class: "dc-type__metric",
              entry: m,
              column: w.column
            }, {
              default: X(() => [
                b("span", zr, E(w.text), 1),
                b("span", Qr, E(w.label), 1)
              ]),
              _: 2
            }, 1032, ["entry", "column"]))), 128)),
            m.parts.updated ? (u(), p("span", Gr, E(m.parts.updated), 1)) : T("", !0),
            Q(nn, { entry: m }, null, 8, ["entry"]),
            Q(Qe, { entry: m }, null, 8, ["entry"]),
            Q(ze, { entry: m }, null, 8, ["entry"])
          ])
        ]))), 128)),
        d.entity.create && !l.value ? (u(), N(oe, {
          key: 1,
          class: "dc-type__new",
          href: k(t).createHref?.(d.entity),
          onPress: (m) => k(t).create(d.entity)
        }, {
          default: X(() => [
            c[1] || (c[1] = b("span", {
              class: "dc-type__plus",
              "aria-hidden": "true"
            }, "+", -1)),
            ne(" " + E(d.entity.create), 1)
          ]),
          _: 2
        }, 1032, ["href", "onPress"])) : T("", !0)
      ], 8, Br))), 128)),
      G(r.$slots, "after", {}, void 0, !0)
    ], 8, Ar));
  }
}), $a = /* @__PURE__ */ U(Yr, [["__scopeId", "data-v-d73c6777"]]), Xr = ["data-dc-pending", "data-dc-more"], Jr = {
  key: 0,
  class: "dc-results__state dc-results__state--loading",
  "aria-live": "polite"
}, Zr = {
  key: 3,
  class: "dc-results__state",
  role: "alert"
}, ei = { class: "dc-results__detail" }, ti = {
  key: 4,
  class: "dc-results__state",
  "aria-live": "polite"
}, ni = {
  key: 5,
  class: "dc-results__state"
}, ai = { class: "dc-results__detail" }, si = /* @__PURE__ */ K({
  __name: "ResultsArea",
  props: {
    views: {},
    loading: { type: Boolean }
  },
  setup(e) {
    const t = e, n = ae(), a = it(), s = {
      list: qt,
      cards: ya,
      grid: _a,
      images: ga,
      table: ba,
      links: wa,
      preview: ka
    }, o = f(() => jt(n.query.value, t.views)), l = f(() => ft(n.query.value.view, t.views)), i = f(() => (l.value === "record" ? null : s[l.value]) ?? qt), r = f(() => l.value === "record" ? n.recordView.value : null), c = f(() => n.rows.value.length > 0), d = f(() => n.error.value !== null), m = R(null);
    function w(v) {
      return v.querySelector("[data-dc-scroll]") ?? v;
    }
    re(
      // The page on screen, which is the draft's own while one is being typed.
      () => n.liveQuery.value.page,
      () => {
        m.value && (w(m.value).scrollTop = 0);
      }
    );
    const x = R(""), $ = R({ x: 0, y: 0 }), y = R(0);
    function g() {
      const v = m.value;
      if (!v) {
        x.value = "";
        return;
      }
      const h = w(v), M = {
        top: h.scrollTop > 1,
        right: h.scrollWidth - h.clientWidth - h.scrollLeft > 1,
        bottom: h.scrollHeight - h.clientHeight - h.scrollTop > 1,
        left: h.scrollLeft > 1
      };
      x.value = Object.entries(M).filter(([, H]) => H).map(([H]) => H).join(" "), $.value = {
        x: h.offsetHeight - h.clientHeight,
        y: h.offsetWidth - h.clientWidth
      }, y.value = v.querySelector("[data-dc-stuck]")?.offsetHeight ?? 0;
    }
    let S = null, _ = null;
    return re(
      m,
      (v, h) => {
        if (h?.removeEventListener("scroll", g, { capture: !0 }), S?.disconnect(), _?.disconnect(), S = null, _ = null, g(), !v || (v.addEventListener("scroll", g, { passive: !0, capture: !0 }), typeof ResizeObserver > "u")) return;
        const M = new ResizeObserver(g), H = typeof MutationObserver > "u" ? null : new MutationObserver(() => {
          le(), g();
        }), le = () => {
          M.disconnect(), H?.disconnect();
          for (const D of /* @__PURE__ */ new Set([v, w(v)])) {
            M.observe(D);
            for (const j of D.children) M.observe(j);
            H?.observe(D, { childList: !0 });
          }
        };
        le(), S = M, _ = H;
      },
      { flush: "post" }
    ), ge(() => {
      m.value?.removeEventListener("scroll", g, { capture: !0 }), S?.disconnect(), _?.disconnect();
    }), (v, h) => (u(), p("div", {
      ref_key: "scroller",
      ref: m,
      class: "dc-results",
      "data-dc-pending": k(n).pending.value ? "true" : "false",
      "data-dc-more": x.value,
      style: ie({
        "--dc-results-gutter-x": `${$.value.x}px`,
        "--dc-results-gutter-y": `${$.value.y}px`,
        "--dc-results-stuck": `${y.value}px`
      })
    }, [
      e.loading ? (u(), p("p", Jr, [...h[1] || (h[1] = [
        b("span", { class: "dc-results__detail" }, "Loading…", -1)
      ])])) : o.value ? (u(), N($a, { key: 1 }, Tt({ _: 2 }, [
        a["cards-before"] ? {
          name: "before",
          fn: X(() => [
            G(v.$slots, "cards-before", {}, void 0, !0)
          ]),
          key: "0"
        } : void 0,
        a["cards-after"] ? {
          name: "after",
          fn: X(() => [
            G(v.$slots, "cards-after", {}, void 0, !0)
          ]),
          key: "1"
        } : void 0
      ]), 1024)) : r.value ? (u(), N(Ie(r.value.component), {
        key: 2,
        id: r.value.id
      }, null, 8, ["id"])) : d.value ? (u(), p("p", Zr, [
        h[2] || (h[2] = b("span", { class: "dc-results__headline" }, "Could not load results", -1)),
        b("span", ei, E(k(n).error.value instanceof Error ? k(n).error.value.message : "The data source failed."), 1)
      ])) : !c.value && k(n).pending.value ? (u(), p("p", ti, [...h[3] || (h[3] = [
        b("span", { class: "dc-results__detail" }, "Running query…", -1)
      ])])) : c.value ? (u(), N(Ie(i.value), { key: 6 })) : (u(), p("div", ni, [
        h[4] || (h[4] = b("span", { class: "dc-results__headline" }, "Nothing matches this query", -1)),
        b("span", ai, E(k(n).summary.value), 1),
        k(n).isPristine.value ? T("", !0) : (u(), N(oe, {
          key: 0,
          class: "dc-results__clear",
          href: k(n).clearHref(),
          onPress: h[0] || (h[0] = (M) => k(n).clearFilters())
        }, {
          default: X(() => [
            ne(E(k(n).isEverything.value ? "Clear filters" : "Search everything instead"), 1)
          ]),
          _: 1
        }, 8, ["href"]))
      ]))
    ], 12, Xr));
  }
}), xa = /* @__PURE__ */ U(si, [["__scopeId", "data-v-9cb044b3"]]), oi = ["data-dc-theme"], li = { class: "dc-shell__head" }, ri = {
  key: 0,
  class: "dc-shell__page"
}, ii = /* @__PURE__ */ K({
  __name: "DataShell",
  props: /* @__PURE__ */ cn({
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
  emits: /* @__PURE__ */ cn(["activate", "create", "duplicate", "delete", "operate", "drill", "query-change", "toggle-pin"], ["update:pinned", "update:selected"]),
  setup(e, { expose: t, emit: n }) {
    const a = e, s = n, o = rn(e, "pinned"), l = rn(e, "selected"), i = it(), r = Ft(On, null), c = a.route || r ? null : Fa(), d = a.route ?? r ?? c;
    ge(() => c?.dispose?.());
    const m = R(!!i.page);
    Ma(() => {
      m.value = !!i.page;
    });
    const w = Va(d, {
      detached: () => m.value && a.pageQuery === "detached",
      path: () => a.listPath
    }), x = f(() => Os({ seed: a.schema.key })), $ = f(() => a.source ?? x.value), y = Js({
      schema: () => a.schema,
      adapter: w,
      defaults: () => a.defaults,
      navigationMode: () => a.navigationMode,
      facetNavigationMode: () => a.facetNavigationMode
    }), g = f(() => a.within?.trim() ?? ""), S = to({
      query: y.query,
      entity: y.entity,
      schema: f(() => a.schema),
      setExpression: y.setExpression
    }), _ = Zs({
      source: $,
      query: S.live,
      schema: f(() => a.schema),
      entity: y.entity,
      limit: f(() => a.limit),
      within: g
    });
    re(y.query, (C) => s("query-change", C));
    const v = f(() => Fs(a.schema, [y.query.value.expr])), h = f(
      () => v.value.flatMap((C) => {
        const I = a.schema.entities.find((z) => z.key === C.entityKey);
        return I ? [{ ...C, entity: I }] : [];
      })
    );
    function M() {
      if (i.record) return h.value;
      const C = a.recordCards;
      return C ? h.value.filter((I) => C[I.entityKey]) : [];
    }
    const H = f(() => {
      const [C, ...I] = h.value;
      if (!C || I.length || y.entity.value !== null) return null;
      const z = a.recordViews?.[C.entityKey];
      return z ? { ...z, id: C.id } : null;
    }), le = f(() => {
      const C = a.views, I = typeof C == "function" ? C({ entity: y.entity.value, records: v.value }) : C;
      return H.value ? [...(I ?? Kt).filter((z) => z !== "record"), "record"] : I?.filter((z) => z !== "record");
    });
    re(
      [_.pageCount, _.pending, y.query, S.drafting, () => a.loading, m],
      () => {
        if (_.pending.value || S.drafting.value || a.loading || m.value) return;
        const C = _.pageCount.value;
        y.query.value.page > C && y.setPage(C, "replace");
      },
      // Immediately, since a pasted URL is past the end before anything changes;
      // and after the render, so the correction is a navigation the mounted shell
      // makes rather than one it makes on the way up. An async source is still
      // pending here and corrects itself when its count lands.
      { immediate: !0, flush: "post" }
    );
    const D = f(() => new Set(o.value));
    function j(C) {
      const I = new Set(D.value);
      I.has(C.id) ? I.delete(C.id) : I.add(C.id), o.value = [...I], s("toggle-pin", C);
    }
    const se = f(() => {
      if (a.selectable === !0) return !0;
      const C = y.entity.value;
      return !!(C?.duplicate || C?.delete || C?.operations?.some((I) => I.selection !== !1));
    }), q = f(() => new Set(l.value));
    function ee(C) {
      const I = new Set(q.value);
      I.has(C.id) ? I.delete(C.id) : I.add(C.id), l.value = [...I];
    }
    function Y(C) {
      const I = new Set(q.value);
      for (const z of _.rows.value)
        C ? I.add(z.id) : I.delete(z.id);
      l.value = [...I];
    }
    function Z() {
      l.value.length && (l.value = []);
    }
    const L = f(() => ({
      ids: [...l.value],
      rows: _.rows.value.filter((C) => q.value.has(C.id)),
      entity: y.entity.value
    }));
    re(() => y.query.value.entity, Z);
    function F(C, I, z = {}) {
      const Ge = Ct(a.schema, y.query.value, C, z);
      z.exclude ? y.narrow(Ge, I?.key ?? y.query.value.entity) : S.release(() => y.narrow(Ge, I?.key ?? null, I ? void 0 : "cards")), s("drill", C, I, z);
    }
    function O(C) {
      return a.rowPress === "narrow" && st(a.schema, C) !== null;
    }
    function V(C) {
      return a.schema.entities.find((z) => z.key === C.entityKey)?.href?.(C) || null;
    }
    const ve = Vs({
      ...y,
      draft: S.text,
      liveQuery: S.live,
      drafting: S.drafting,
      commitDraft: S.commit,
      abandonDraft: S.abandon,
      /*
       * A page of what is on screen: the draft's, while one is live, which are
       * held beside it rather than in the URL — see `liveQuery`.
       */
      setPage: (C, I) => {
        S.drafting.value ? S.setPage(C) : y.setPage(C, I);
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
      source: $,
      previewsPerType: f(() => a.previewsPerType),
      within: g,
      loading: f(() => a.loading),
      recordView: H,
      pinnable: f(() => a.pinnable === !0),
      isPinned: (C) => D.value.has(C.id),
      isPinnedId: (C) => D.value.has(C),
      togglePin: j,
      selectable: se,
      selection: L,
      isSelected: (C) => q.value.has(C.id),
      toggleSelect: ee,
      selectPage: Y,
      clearSelection: Z,
      narrowsOnPress: f(() => a.rowPress === "narrow"),
      rowLinks: f(() => a.rowLinks),
      /*
       * The one place a press is read, so every view gets the same answer without
       * knowing which of the two it is: they all call this.
       */
      activate: (C, I = {}) => {
        if (O(C)) {
          F(C, null, I);
          return;
        }
        const z = V(C);
        if (z) {
          window.open(z, "_blank", "noopener");
          return;
        }
        s("activate", C);
      },
      pressHref: (C) => O(C) ? y.narrowHref(Ct(a.schema, y.query.value, C), null, "cards") : V(C) ?? a.activateHref?.(C) ?? null,
      recordHref: V,
      drillHref: (C, I) => st(a.schema, C) ? y.narrowHref(
        Ct(a.schema, y.query.value, C),
        I?.key ?? null,
        I ? void 0 : "cards"
      ) : null,
      create: (C) => s("create", C),
      createHref: (C) => a.createHref?.(C) ?? null,
      duplicate: () => s("duplicate", L.value),
      delete: () => s("delete", L.value),
      operate: (C) => s("operate", C, L.value),
      drill: F
    });
    Ws({ theme: () => a.theme, accent: () => a.accent, tokens: () => a.tokens });
    const Ee = f(() => {
      if (!(!a.accent && !a.tokens))
        return { ...a.tokens, ...a.accent ? { "--dc-accent": a.accent } : {} };
    });
    return t({
      query: y.query
    }), (C, I) => (u(), p("div", {
      class: "dc-shell",
      "data-dc-theme": e.theme,
      style: ie(Ee.value)
    }, [
      b("div", li, [
        Q(fa, {
          views: le.value,
          "pages-note": e.pagesNote,
          "hide-pages": e.loading || m.value
        }, Tt({ _: 2 }, [
          i.brand ? {
            name: "brand",
            fn: X((z) => [
              G(C.$slots, "brand", Oa(Aa(z)), void 0, !0)
            ]),
            key: "0"
          } : void 0,
          i.actions ? {
            name: "actions",
            fn: X(() => [
              G(C.$slots, "actions", {}, void 0, !0)
            ]),
            key: "1"
          } : void 0
        ]), 1032, ["views", "pages-note", "hide-pages"])
      ]),
      i.page ? (u(), p("div", ri, [
        G(C.$slots, "page", {
          query: k(ve).query.value
        }, void 0, !0)
      ])) : T("", !0),
      i.page ? T("", !0) : (u(), N(pa, {
        key: 1,
        views: le.value,
        "type-chooser": e.typeChooser,
        "selection-placement": e.selectionPlacement
      }, null, 8, ["views", "type-chooser", "selection-placement"])),
      i.page ? T("", !0) : G(C.$slots, "results", {
        rows: k(ve).rows.value,
        total: k(ve).total.value,
        offset: k(ve).offset.value,
        pageCount: k(ve).pageCount.value,
        query: k(ve).liveQuery.value,
        pending: k(ve).pending.value,
        loading: e.loading
      }, () => [
        Q(xa, {
          views: le.value,
          loading: e.loading
        }, Tt({ _: 2 }, [
          i["cards-before"] || M().length ? {
            name: "cards-before",
            fn: X(() => [
              (u(!0), p(W, null, J(M(), (z) => (u(), p(W, {
                key: `${z.entityKey}:${z.id}`
              }, [
                i.record ? G(C.$slots, "record", {
                  id: z.id,
                  entity: z.entity
                }, void 0, !0, 0) : (u(), N(Ie(e.recordCards?.[z.entityKey]), {
                  key: 1,
                  id: z.id
                }, null, 8, ["id"]))
              ], 64))), 128)),
              G(C.$slots, "cards-before", {}, void 0, !0)
            ]),
            key: "0"
          } : void 0,
          i["cards-after"] ? {
            name: "cards-after",
            fn: X(() => [
              G(C.$slots, "cards-after", {}, void 0, !0)
            ]),
            key: "1"
          } : void 0
        ]), 1032, ["views", "loading"])
      ], !0, 2)
    ], 12, oi));
  }
}), ci = /* @__PURE__ */ U(ii, [["__scopeId", "data-v-08179452"]]), ui = ["data-dc-muted", "data-dc-collapsed"], di = ["data-dc-collapsible"], fi = ["aria-expanded", "aria-controls"], vi = { class: "dc-shell-card__sr" }, pi = {
  key: 0,
  class: "dc-shell-card__identity"
}, hi = { class: "dc-shell-card__title dc-shell-card__name" }, mi = {
  key: 0,
  class: "dc-shell-card__ref dc-mono"
}, yi = {
  key: 1,
  class: "dc-shell-card__title"
}, _i = {
  key: 2,
  class: "dc-shell-card__count dc-mono"
}, gi = {
  key: 1,
  class: "dc-shell-card__aside"
}, wi = ["data-dc-flush"], ki = /* @__PURE__ */ K({
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
    const n = e, a = t, s = R(n.defaultCollapsed === !0), o = f(() => n.span === "all" ? { gridColumn: "1 / -1" } : void 0), l = it();
    function i(D) {
      return r(D?.() ?? []);
    }
    function r(D) {
      return D.some((j) => j.type === Na ? !1 : j.type === Ra ? String(j.children ?? "").trim().length > 0 : j.type === W ? r(j.children ?? []) : !0);
    }
    const c = f(
      () => !!n.title || !!n.name || d.value || i(l.head)
    ), d = f(() => i(l.aside)), m = f(() => i(l.default)), w = f(() => i(l.foot)), x = f(
      () => !!n.name && (!!n.reference || i(l.reference))
    ), $ = f(() => n.collapsible === !0 && c.value), y = f(() => $.value && (n.collapsed ?? s.value));
    function g() {
      const D = !y.value;
      s.value = D, a("update:collapsed", D);
    }
    const S = Dt() ?? "dc-shell-card", _ = `${S}-body`, v = `${S}-foot`, h = f(
      () => [m.value ? _ : "", w.value ? v : ""].filter(Boolean).join(" ") || void 0
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
    ].join(", "), H = R(null);
    function le(D) {
      if (!$.value) return;
      const j = D.target?.closest(M);
      j && H.value?.contains(j) || typeof window < "u" && window.getSelection()?.toString() || g();
    }
    return (D, j) => (u(), p("section", {
      class: "dc-shell-card",
      style: ie(o.value),
      "data-dc-muted": e.muted ? "true" : "false",
      "data-dc-collapsed": y.value ? "true" : "false"
    }, [
      c.value ? (u(), p("header", {
        key: 0,
        ref_key: "head",
        ref: H,
        class: "dc-shell-card__head",
        "data-dc-collapsible": $.value ? "true" : "false",
        onClick: le
      }, [
        $.value ? (u(), p("button", {
          key: 0,
          type: "button",
          class: "dc-shell-card__toggle",
          "aria-expanded": y.value ? "false" : "true",
          "aria-controls": h.value,
          onClick: g
        }, [
          j[0] || (j[0] = b("svg", {
            class: "dc-shell-card__chevron",
            viewBox: "0 0 10 10",
            "aria-hidden": "true"
          }, [
            b("path", { d: "M2 3.5 5 6.5 8 3.5" })
          ], -1)),
          b("span", vi, E(e.name || e.title || "Card"), 1)
        ], 8, fi)) : T("", !0),
        G(D.$slots, "head", {}, () => [
          e.name ? (u(), p("div", pi, [
            b("h2", hi, E(e.name), 1),
            x.value ? (u(), p("span", mi, [
              G(D.$slots, "reference", {}, () => [
                ne(E(e.reference), 1)
              ], !0)
            ])) : T("", !0)
          ])) : (u(), p("h2", yi, E(e.title), 1)),
          e.count !== void 0 ? (u(), p("span", _i, E(e.count), 1)) : T("", !0)
        ], !0),
        d.value ? (u(), p("span", gi, [
          G(D.$slots, "aside", {}, void 0, !0)
        ])) : T("", !0)
      ], 8, di)) : T("", !0),
      m.value ? Lt((u(), p("div", {
        key: 1,
        id: _,
        class: "dc-shell-card__body",
        "data-dc-flush": e.flush ? "true" : "false"
      }, [
        G(D.$slots, "default", {}, void 0, !0)
      ], 8, wi)), [
        [un, !y.value]
      ]) : T("", !0),
      w.value ? Lt((u(), p("footer", {
        key: 2,
        id: v,
        class: "dc-shell-card__foot"
      }, [
        G(D.$slots, "foot", {}, void 0, !0)
      ], 512)), [
        [un, !y.value]
      ]) : T("", !0)
    ], 12, ui));
  }
}), Pc = /* @__PURE__ */ U(ki, [["__scopeId", "data-v-073304c8"]]), bi = ["aria-label"], $i = ["aria-checked", "data-dc-active", "tabindex", "onClick", "onKeydown"], xi = /* @__PURE__ */ K({
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
      (u(!0), p(W, null, J(e.options, (r, c) => (u(), p("button", {
        key: r.key,
        ref_for: !0,
        ref_key: "buttons",
        ref: s,
        type: "button",
        role: "radio",
        class: fe(["dc-segmented__item", { "dc-segmented__item--mono": e.mono }]),
        "aria-checked": r.key === e.modelValue,
        "data-dc-active": r.key === e.modelValue ? "true" : "false",
        tabindex: r.key === e.modelValue ? 0 : -1,
        onClick: (d) => a("update:modelValue", r.key),
        onKeydown: (d) => o(d, c)
      }, E(r.label), 43, $i))), 128))
    ], 8, bi));
  }
}), Si = /* @__PURE__ */ U(xi, [["__scopeId", "data-v-63fb5482"]]), Ci = { class: "dc-fact__label" }, Pi = ["title"], Ei = /* @__PURE__ */ K({
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
      if (s == null || s === "") return [ye];
      if (Array.isArray(s)) {
        const o = s.filter((l) => l != null && l !== "");
        return o.length ? o.map(String) : [ye];
      }
      return [String(s)];
    }), a = f(() => t.wide ? { gridColumn: "1 / -1" } : void 0);
    return (s, o) => (u(), p("div", {
      class: "dc-fact",
      style: ie(a.value)
    }, [
      b("dt", Ci, [
        G(s.$slots, "label", {}, () => [
          ne(E(e.label), 1)
        ], !0)
      ]),
      b("dd", {
        class: "dc-fact__value dc-mono",
        title: e.title
      }, [
        G(s.$slots, "default", {}, () => [
          n.value.length === 1 ? (u(), p(W, { key: 0 }, [
            ne(E(n.value[0]), 1)
          ], 64)) : (u(!0), p(W, { key: 1 }, J(n.value, (l, i) => (u(), p("span", {
            key: i,
            class: "dc-fact__line"
          }, E(l), 1))), 128))
        ], !0)
      ], 8, Pi)
    ], 4));
  }
}), Li = /* @__PURE__ */ U(Ei, [["__scopeId", "data-v-1f6d25e6"]]), Ti = /* @__PURE__ */ K({
  __name: "ShellFacts",
  props: {
    items: { default: () => [] },
    min: { default: "200px" }
  },
  setup(e) {
    const t = e, n = f(() => ({ "--dc-facts-min": t.min }));
    return (a, s) => (u(), p("dl", {
      class: "dc-facts",
      style: ie(n.value)
    }, [
      (u(!0), p(W, null, J(e.items, (o, l) => (u(), N(Li, {
        key: `${l}:${o.label}`,
        label: o.label,
        value: o.value,
        title: o.title,
        wide: o.wide
      }, null, 8, ["label", "value", "title", "wide"]))), 128)),
      G(a.$slots, "default", {}, void 0, !0)
    ], 4));
  }
}), Ec = /* @__PURE__ */ U(Ti, [["__scopeId", "data-v-17455afa"]]), Mi = { class: "dc-counts" }, Oi = ["data-dc-tone"], Ai = {
  key: 0,
  class: "dc-counts__empty"
}, Ni = /* @__PURE__ */ K({
  __name: "StatusCounts",
  props: {
    counts: {},
    empty: { default: ye }
  },
  setup(e) {
    const t = e, n = f(() => t.counts.filter((a) => a.count > 0));
    return (a, s) => (u(), p("span", Mi, [
      (u(!0), p(W, null, J(n.value, (o) => (u(), p("span", {
        key: o.label,
        class: "dc-counts__count",
        "data-dc-tone": o.tone ?? "neutral"
      }, E(o.count) + " " + E(o.label), 9, Oi))), 128)),
      n.value.length === 0 ? (u(), p("span", Ai, E(e.empty), 1)) : T("", !0)
    ]));
  }
}), Lc = /* @__PURE__ */ U(Ni, [["__scopeId", "data-v-5553a9e2"]]), Ri = ["data-dc-copied", "title", "aria-label"], Ii = {
  key: 0,
  class: "dc-copy__mark",
  viewBox: "0 0 16 16",
  "aria-hidden": "true"
}, Bi = {
  key: 1,
  class: "dc-copy__mark",
  viewBox: "0 0 16 16",
  "aria-hidden": "true"
}, Hi = 1500, qi = /* @__PURE__ */ K({
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
      }, Hi), a("copied", i);
    }
    return ge(() => clearTimeout(o)), (i, r) => (u(), p("button", {
      type: "button",
      class: "dc-copy",
      "data-dc-copied": s.value ? "true" : "false",
      title: s.value ? "Copied" : e.label,
      "aria-label": e.label,
      onClick: l
    }, [
      s.value ? (u(), p("svg", Bi, [...r[1] || (r[1] = [
        b("path", { d: "M3 8.5l3.2 3L13 4.5" }, null, -1)
      ])])) : (u(), p("svg", Ii, [...r[0] || (r[0] = [
        b("rect", {
          x: "5.5",
          y: "5.5",
          width: "8",
          height: "9",
          rx: "1.5"
        }, null, -1),
        b("path", { d: "M10.5 3.5v-1a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h1" }, null, -1)
      ])]))
    ], 8, Ri));
  }
}), Fi = /* @__PURE__ */ U(qi, [["__scopeId", "data-v-f4249d7f"]]), Vi = ["data-dc-copy", "data-dc-wrap", "data-dc-tone"], Di = /* @__PURE__ */ K({
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
      b("pre", {
        ref_key: "pre",
        ref: s,
        class: "dc-code__text dc-mono",
        style: ie(o.value)
      }, [
        G(i.$slots, "default", {}, () => [
          ne(E(e.code), 1)
        ], !0)
      ], 4),
      e.copy ? (u(), N(Fi, {
        key: 0,
        class: "dc-code__copy",
        text: l,
        label: e.copyLabel,
        onCopied: r[0] || (r[0] = (c) => a("copied", c)),
        onError: r[1] || (r[1] = (c) => a("error", c))
      }, null, 8, ["label"])) : T("", !0)
    ], 8, Vi));
  }
}), Tc = /* @__PURE__ */ U(Di, [["__scopeId", "data-v-67b371dd"]]), Ki = 24, Wi = /* @__PURE__ */ K({
  __name: "ShellLog",
  props: {
    fetchChunk: {},
    stripAnsi: { type: Boolean },
    maxHeight: { default: "460px" }
  },
  setup(e, { expose: t }) {
    const n = e, a = R(""), s = f(() => n.stripAnsi ? Ga(a.value) : a.value), o = R(null);
    let l = 0, i = null;
    function r() {
      return i ??= c().finally(() => {
        i = null;
      }), i;
    }
    async function c() {
      const { chunk: w, offset: x } = await n.fetchChunk(l);
      if (l = x, !w) return;
      const $ = o.value, y = !$ || $.scrollTop + $.clientHeight >= $.scrollHeight - Ki;
      a.value += w, y && (await ct(), o.value && (o.value.scrollTop = o.value.scrollHeight));
    }
    function d() {
      a.value = "", l = 0;
    }
    const m = f(() => n.maxHeight === void 0 ? void 0 : { maxHeight: typeof n.maxHeight == "number" ? `${n.maxHeight}px` : n.maxHeight });
    return t({ poll: r, reset: d }), (w, x) => (u(), p("pre", {
      ref_key: "pane",
      ref: o,
      class: "dc-log dc-mono",
      style: ie(m.value)
    }, E(s.value), 5));
  }
}), Mc = /* @__PURE__ */ U(Wi, [["__scopeId", "data-v-2c86947e"]]), ji = ["data-dc-theme"], Ui = ["aria-labelledby", "aria-label"], zi = {
  key: 1,
  class: "dc-dialog__actions"
}, Ae = [], Qi = /* @__PURE__ */ K({
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
    const n = e, a = t, { theme: s, style: o, adopt: l } = Zt(n), i = `${Dt() ?? "dc-dialog"}-title`, r = R(null);
    function c() {
      a("close"), a("update:open", !1);
    }
    const d = Symbol("dc-dialog");
    function m(v) {
      v.key !== "Escape" || v.defaultPrevented || Ae[Ae.length - 1] === d && (v.preventDefault(), c());
    }
    let w = !1;
    function x(v) {
      w = v.target === v.currentTarget;
    }
    function $(v) {
      v.target === v.currentTarget && w && c(), w = !1;
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
    let g = null;
    async function S() {
      Ae.push(d), document.addEventListener("keydown", m), g = document.activeElement instanceof HTMLElement ? document.activeElement : null, l(), await ct(), (r.value?.querySelector("[autofocus]") ?? r.value?.querySelector(y) ?? r.value)?.focus();
    }
    function _() {
      const v = Ae.indexOf(d);
      v !== -1 && (Ae.splice(v, 1), document.removeEventListener("keydown", m), g?.isConnected && g.focus(), g = null);
    }
    return dt(() => {
      n.open && S();
    }), re(
      () => n.open,
      (v) => {
        v ? S() : _();
      }
    ), ge(_), (v, h) => e.open ? (u(), N(ut, {
      key: 0,
      to: e.to
    }, [
      b("div", {
        class: "dc-shell dc-layer dc-dialog",
        "data-dc-theme": k(s),
        style: ie(k(o)),
        onPointerdown: x,
        onClick: $
      }, [
        b("div", {
          ref_key: "panel",
          ref: r,
          class: fe(["dc-dialog__panel", e.panelClass]),
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
          }, E(e.title), 1)) : T("", !0),
          b("div", {
            class: fe(["dc-dialog__body", e.bodyClass])
          }, [
            G(v.$slots, "default", {}, void 0, !0)
          ], 2),
          v.$slots.actions ? (u(), p("div", zi, [
            G(v.$slots, "actions", {}, void 0, !0)
          ])) : T("", !0)
        ], 10, Ui)
      ], 44, ji)
    ], 8, ["to"])) : T("", !0);
  }
}), Oc = /* @__PURE__ */ U(Qi, [["__scopeId", "data-v-0cccf313"]]), Gi = 4500, Yi = 9e3, De = R([]);
let En = 0;
function Sa(e) {
  De.value = De.value.filter((t) => t.id !== e);
}
function Ca(e, t = "ok") {
  En += 1;
  const n = En;
  De.value = [...De.value, { id: n, message: e, kind: t }], setTimeout(() => Sa(n), t === "err" ? Yi : Gi);
}
function Xi(e) {
  Ca(e instanceof Error ? e.message : String(e), "err");
}
function Ji() {
  return { toasts: Ia(De), toast: Ca, toastError: Xi, dismiss: Sa };
}
const Zi = ["data-dc-theme"], ec = ["data-dc-kind", "role"], tc = /* @__PURE__ */ K({
  __name: "ShellToasts",
  props: {
    to: { default: "body" },
    theme: { default: void 0 },
    accent: { default: void 0 },
    tokens: { default: void 0 }
  },
  setup(e) {
    const t = e, { toasts: n } = Ji(), { theme: a, style: s, adopt: o } = Zt(t);
    return dt(o), (l, i) => (u(), N(ut, { to: e.to }, [
      b("div", {
        class: "dc-shell dc-layer dc-toasts",
        "data-dc-theme": k(a),
        style: ie(k(s)),
        "aria-live": "polite"
      }, [
        (u(!0), p(W, null, J(k(n), (r) => (u(), p("div", {
          key: r.id,
          class: "dc-toast",
          "data-dc-kind": r.kind,
          role: r.kind === "err" ? "alert" : void 0
        }, E(r.message), 9, ec))), 128))
      ], 12, Zi)
    ], 8, ["to"]));
  }
}), Ac = /* @__PURE__ */ U(tc, [["__scopeId", "data-v-d970211c"]]), nc = 4, ac = 8, sc = 180;
function oc(e, t, n, a = {}) {
  const s = a.gap ?? nc, o = a.margin ?? ac, l = a.flipBelow ?? sc, i = a.side ?? "below", r = {
    below: n.height - e.bottom - s - o,
    above: e.top - s - o
  }, c = i === "below" ? "above" : "below", d = r[i] < l && r[c] > r[i] ? c : i, m = Math.min(a.maxHeight ?? 1 / 0, Math.max(0, r[d])), w = Math.max(0, n.width - o * 2), x = Math.min(e.width, w), $ = Math.min(Math.max(t, x), w), y = a.align === "end" ? e.right - $ : e.left, g = Math.max(o, Math.min(y, n.width - $ - o));
  return d === "below" ? { side: d, left: g, top: e.bottom + s, maxHeight: m, minWidth: x, maxWidth: w } : { side: d, left: g, bottom: n.height - e.top + s, maxHeight: m, minWidth: x, maxWidth: w };
}
const lc = ["data-dc-theme", "data-dc-side"], we = [], rc = /* @__PURE__ */ K({
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
    const n = e, a = t, { theme: s, style: o, adopt: l } = Zt(n), i = R(null), r = R(null), c = { root: () => i.value };
    function d() {
      const v = n.anchor;
      v && (r.value = oc(
        v.getBoundingClientRect(),
        i.value?.offsetWidth ?? 0,
        { width: window.innerWidth, height: window.innerHeight },
        { side: n.side, align: n.align, maxHeight: n.maxHeight }
      ));
    }
    const m = f(() => {
      const v = r.value, h = v ? {
        position: "fixed",
        left: `${v.left}px`,
        ...v.top !== void 0 ? { top: `${v.top}px` } : {},
        ...v.bottom !== void 0 ? { bottom: `${v.bottom}px` } : {},
        minWidth: `${v.minWidth}px`,
        maxWidth: `${v.maxWidth}px`,
        maxHeight: `${v.maxHeight}px`,
        overflowY: "auto"
      } : { position: "fixed", visibility: "hidden" };
      return { ...o.value, ...h };
    });
    function w() {
      a("update:open", !1), a("close");
    }
    function x(v) {
      return i.value?.contains(v) || n.anchor?.contains(v) ? !0 : we.slice(we.indexOf(c) + 1).some((M) => M.root()?.contains(v));
    }
    function $(v) {
      const h = v.target;
      h && !x(h) && w();
    }
    function y(v) {
      v.key !== "Escape" || v.defaultPrevented || we[we.length - 1] === c && (v.preventDefault(), i.value?.contains(document.activeElement) && n.anchor?.focus(), w());
    }
    let g = null;
    async function S() {
      we.includes(c) || (we.push(c), l(), r.value = null, await ct(), d(), window.addEventListener("pointerdown", $, !0), document.addEventListener("keydown", y, !0), window.addEventListener("resize", d), window.addEventListener("scroll", d, !0), typeof ResizeObserver < "u" && i.value && (g = new ResizeObserver(() => d()), g.observe(i.value)));
    }
    function _() {
      const v = we.indexOf(c);
      v !== -1 && (we.splice(v, 1), window.removeEventListener("pointerdown", $, !0), document.removeEventListener("keydown", y, !0), window.removeEventListener("resize", d), window.removeEventListener("scroll", d, !0), g?.disconnect(), g = null);
    }
    return dt(() => {
      n.open && S();
    }), re(
      () => n.open,
      (v) => {
        v ? S() : _();
      }
    ), re(() => n.anchor, () => {
      n.open && d();
    }), ge(_), (v, h) => e.open ? (u(), N(ut, {
      key: 0,
      to: e.to
    }, [
      b("div", Ba({
        ref_key: "root",
        ref: i
      }, v.$attrs, {
        class: "dc-shell dc-layer dc-popover",
        "data-dc-theme": k(s),
        "data-dc-side": r.value?.side,
        style: m.value
      }), [
        G(v.$slots, "default", {}, void 0, !0)
      ], 16, lc)
    ], 8, ["to"])) : T("", !0);
  }
}), Nc = /* @__PURE__ */ U(rc, [["__scopeId", "data-v-73fbd235"]]);
function Rc(e, t) {
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
  return rt(() => {
    s = !0, l();
  }, !0), { start: c, stop: l, polling: n };
}
function Ic(e, t = {}) {
  const n = t.key ?? ((o) => JSON.stringify(o)), a = _e();
  let s = null;
  return Ha(() => {
    const o = e(), l = n(o);
    l !== s && (s = l, a.value = o);
  }), a;
}
function Bc(e = {}) {
  return { key: "ordinal", kind: "ordinal", label: "#", width: "52px", ...e };
}
function Hc(e = {}) {
  return { key: "status", role: "state", kind: "status", label: "State", sort: "state", width: "104px", ...e };
}
function qc(e = {}) {
  return { key: "tint", role: "tint", ...e };
}
function Fc(e = {}) {
  return { key: "picture", role: "image", kind: "image", width: "56px", height: "40px", ...e };
}
function Vc(e, t = {}) {
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
function Dc(e, t = {}) {
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
function Kc(e, t, n = {}) {
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
function Wc(e, t, n = {}) {
  return { key: e, kind: "date", label: t, sort: e, width: "104px", mono: !0, muted: !0, ...n };
}
function jc(e = {}) {
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
function Uc(e, t, n = {}) {
  return { key: e, label: t, sort: e, truncate: !0, hideBelow: 900, ...n };
}
function zc(e, t, n, a = {}) {
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
function $t(e) {
  return typeof e == "number" ? e : typeof e == "string" && e.trim() !== "" ? Number(e) : Number.NaN;
}
function Qc(e) {
  const t = $t(e);
  return Number.isFinite(t) && t > 0 ? ja(t) : ye;
}
function Gc(e) {
  const t = $t(e);
  return Number.isFinite(t) && t > 0 ? Ua(t) : ye;
}
function Yc(e) {
  const t = $t(e);
  return Number.isFinite(t) && t > 0 ? za(t) : ye;
}
function Xc(e) {
  const t = $t(e);
  return Number.isFinite(t) ? Qa(t) : ye;
}
function ic(e) {
  if (e <= 0) return 0;
  const t = 10 ** Math.floor(Math.log10(e));
  for (const n of [1, 2, 5])
    if (e <= n * t) return n * t;
  return 10 * t;
}
function cc(e, t) {
  const n = /* @__PURE__ */ new Set();
  for (const a of e) {
    const s = a.fields[t];
    for (const o of Array.isArray(s) ? s : [s])
      typeof o == "string" && o && n.add(o);
  }
  return [...n].sort((a, s) => a.localeCompare(s));
}
function uc(e, t) {
  let n = 0;
  for (const a of e) {
    const s = a.fields[t];
    typeof s == "number" && s > n && (n = s);
  }
  return n;
}
function Jc(e, t, n, a = {}) {
  return {
    kind: "chips",
    key: t,
    label: n,
    options: cc(e, t),
    ...a.multiple ? { multiple: !0 } : {}
  };
}
function Zc(e, t, n) {
  return { kind: "range", key: t, label: n, min: 0, max: ic(uc(e, t)) };
}
function eu(e, t, n) {
  return { kind: "toggle", key: e, label: t, text: n };
}
function tu(e) {
  return e.filter((t) => t.kind === "chips" ? t.options.length > 1 : t.kind === "range" ? t.max > 0 : !0);
}
function nu(e = "", t = "/") {
  const n = R(ue(e)), a = R(t), s = [`${a.value}${n.value}`];
  return {
    search: n,
    path: a,
    history: s,
    href(o, l) {
      return `${l ?? a.value}${ue(o)}`;
    },
    push(o, l) {
      l !== void 0 && (a.value = l), n.value = ue(o), s.push(`${a.value}${n.value}`);
    },
    replace(o, l) {
      l !== void 0 && (a.value = l), n.value = ue(o), s[s.length - 1] = `${a.value}${n.value}`;
    }
  };
}
function Ln(e) {
  const t = e.indexOf("?");
  if (t === -1) return "";
  const n = e.slice(t), a = n.indexOf("#");
  return ue(a === -1 ? n : n.slice(0, a));
}
function au(e) {
  const t = R(Ln(e.currentRoute.value.fullPath)), n = f(() => e.currentRoute.value.path), a = re(
    () => e.currentRoute.value.fullPath,
    (s) => {
      t.value = Ln(s);
    }
  );
  return {
    search: t,
    path: n,
    push: (s, o) => e.push(`${o ?? n.value}${ue(s)}`),
    replace: (s, o) => e.replace(`${o ?? n.value}${ue(s)}`),
    href: (s, o) => {
      const l = `${o ?? n.value}${ue(s)}`;
      return e.resolve?.(l).href ?? l;
    },
    dispose: a
  };
}
function su(e, t, n = "/") {
  return (a) => {
    const s = a.params[t], o = Array.isArray(s) ? s.join("/") : s ?? "", l = a.query[Se], i = typeof l == "string" ? l : "", r = `${e}="${o.replace(/"/g, "")}"`;
    return { path: n, query: { ...a.query, [Se]: We(i, r) } };
  };
}
function ou(e, t = "/") {
  return (n) => ({ path: t, query: { ...n.query, [Me]: e } });
}
function lu(e) {
  const t = /* @__PURE__ */ new Map();
  for (const n of e) {
    const a = t.get(n.entityKey);
    a ? a.push(n) : t.set(n.entityKey, [n]);
  }
  return {
    query(n) {
      return zn(n, (a) => t.get(a.key) ?? [], {
        undatedLast: !0,
        zeroIsAll: !0
      });
    }
  };
}
function ru(e, t) {
  return e.query({ ...t, limit: Number.MAX_SAFE_INTEGER, offset: 0 }).rows;
}
const dc = {
  DataShell: ci,
  ShellHeader: fa,
  RecordActions: pa,
  ResultsArea: xa,
  SegmentedControl: Si,
  StatusPill: je,
  ListView: qt,
  CardsView: ya,
  GridView: _a,
  ImagesView: ga,
  TableView: ba,
  LinksView: wa,
  PreviewView: ka,
  TypeCardsView: $a
}, iu = {
  install(e, t = {}) {
    const n = t.prefix ?? "";
    for (const [a, s] of Object.entries(dc))
      e.component(`${n}${a}`, s);
    t.route && e.provide(On, t.route), (t.theme || t.accent || t.tokens) && Ks({ theme: t.theme, accent: t.accent, tokens: t.tokens }, e);
  }
};
export {
  mc as COLUMN_BREAKPOINTS,
  hc as COLUMN_ROLES,
  ya as CardsView,
  Pn as ColumnCell,
  Fi as CopyButton,
  Ya as DEFAULT_ENTITY_VIEW,
  Mt as DEFAULT_SORT,
  An as DEFAULT_VIEW,
  eo as DRAFT_DELAY,
  ci as DataShell,
  ye as EMPTY_CELL,
  Gn as ENTITY_ALL,
  lt as ENTITY_TERM,
  Ve as EXPRESSION_TERM,
  _a as GridView,
  iu as HeaderContentLayoutPlugin,
  ga as ImagesView,
  wa as LinksView,
  qt as ListView,
  tt as MOCK_TINTS,
  Ue as MetricDrill,
  ze as OpenMark,
  Yt as PARAM_DIR,
  Me as PARAM_ENTITY,
  Se as PARAM_EXPR,
  yt as PARAM_PAGE,
  Gt as PARAM_SORT,
  mt as PARAM_VIEW,
  pc as PILL_TONES,
  sc as POPOVER_FLIP_BELOW,
  nc as POPOVER_GAP,
  ac as POPOVER_MARGIN,
  tn as PinStar,
  ka as PreviewView,
  nn as QueryMark,
  Ne as RECORD_STATUSES,
  Ut as RESULT_FIELDS,
  On as ROUTE_ADAPTER_KEY,
  pa as RecordActions,
  xa as ResultsArea,
  oa as SHELL_CONTEXT_KEY,
  ot as SHELL_THEME_KEY,
  Qe as ScopeMark,
  Si as SegmentedControl,
  Pe as SelectTick,
  Pc as ShellCard,
  Tc as ShellCode,
  Oc as ShellDialog,
  Li as ShellFact,
  Ec as ShellFacts,
  fa as ShellHeader,
  Mc as ShellLog,
  Nc as ShellPopover,
  Ac as ShellToasts,
  Ht as StandingControl,
  Lc as StatusCounts,
  je as StatusPill,
  Yi as TOAST_ERROR_MS,
  Gi as TOAST_MS,
  ba as TableView,
  $a as TypeCardsView,
  Kt as VIEW_KINDS,
  fn as VIEW_LABELS,
  We as addTerm,
  Qt as andExpression,
  Qc as bytesCell,
  Hn as cellFull,
  Te as cellText,
  Je as cellTextOf,
  de as cellValue,
  xt as changesResults,
  Jc as chipsFrom,
  pn as columnAlign,
  hn as columnClass,
  vn as columnKey,
  Ke as columnShortcut,
  Kn as columnShortcutOf,
  At as columnTruncates,
  ts as columnsFor,
  Fn as compactShortcuts,
  es as countPages,
  Fa as createHistoryAdapter,
  nu as createMemoryAdapter,
  lu as createMemoryDataSource,
  Os as createMockDataSource,
  au as createVueRouterAdapter,
  Wc as dateColumn,
  ss as defaultCellText,
  et as defaultQuery,
  Be as defaultViewFor,
  Va as detachableAdapter,
  Ct as drillExpression,
  Gc as durationCell,
  Yc as elapsedCell,
  Ja as emptyFacetValue,
  Is as entityAddress,
  jc as entityColumn,
  Ot as entityCount,
  ou as entityRedirect,
  Zn as excludingTerm,
  Fe as expandShortcuts,
  Uc as facetColumn,
  la as facetField,
  ca as facetValue,
  vs as fieldHeading,
  Jn as fieldTerm,
  He as findEntity,
  Yn as findEntityByAddress,
  ke as findSort,
  zc as flagColumn,
  Re as fnv1a,
  Rn as focusEntity,
  ja as formatBytes,
  Ze as formatCount,
  Ka as formatDate,
  yc as formatDateTime,
  Ua as formatDuration,
  za as formatElapsed,
  me as formatExpression,
  Oe as formatInteger,
  Da as formatMetric,
  Wa as formatOrdinal,
  Qa as formatPercent,
  cs as formatRange,
  xe as formatTerm,
  Ms as generateRows,
  Qs as hasActiveFacets,
  Vc as identityColumn,
  xc as idsExpression,
  _c as isEntityScoped,
  Za as isFacetActive,
  Wt as isPristineQuery,
  qe as isRangeTerm,
  jt as isTypeCardsQuery,
  Nn as isViewKind,
  wc as joinExpression,
  ea as liftTerm,
  ys as matchesExpression,
  Kc as metricColumn,
  Sc as narrowPatch,
  _s as negateTerm,
  ic as niceMax,
  ue as normalizeSearch,
  ws as oppositeTerm,
  Bc as ordinalColumn,
  ce as parseExpression,
  qs as parseQuery,
  Xc as percentCell,
  Fc as pictureColumn,
  oc as placePopover,
  zo as presentParts,
  ha as presentRow,
  kt as pressOptions,
  Vs as provideShellContext,
  Ks as provideShellTheme,
  ru as queryAll,
  Zc as rangeFrom,
  pt as rangeOf,
  $s as readDraft,
  $c as readExpression,
  su as recordRedirect,
  Xn as recordTerm,
  Fs as recordsIn,
  Dc as referenceColumn,
  Rt as refineExpression,
  ft as resolveView,
  pe as roleColumn,
  Bn as roleColumns,
  as as rowKey,
  Nt as sameTerm,
  gt as scopeTerm,
  st as scopeTermFor,
  aa as scopedEntity,
  bc as searchFromQuery,
  Sn as serializeQuery,
  Bs as sortAddress,
  vt as sortsFor,
  gc as splitExpression,
  Hc as stateColumn,
  Ga as stripAnsi,
  Xs as summarizeQuery,
  en as summaryTerms,
  Jt as termStanding,
  qc as tintColumn,
  kc as tintFor,
  eu as toggleFacet,
  mr as useColumns,
  to as useDraft,
  Po as useEntityCounts,
  Mr as useEntityPreviews,
  Zt as useLayerTheme,
  Rc as usePoll,
  Ce as usePresentedRows,
  Js as useQueryState,
  so as useRecordNames,
  Zs as useResults,
  ae as useShellContext,
  Ic as useStableSchema,
  Ji as useToasts,
  tu as usefulFacets,
  dn as viewAcross,
  ua as withFacetValue,
  It as withStanding,
  Cc as withoutFacet,
  na as withoutOwnScope,
  gs as withoutTerm
};
