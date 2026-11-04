import { ref as R, computed as f, inject as zt, provide as Ut, getCurrentInstance as Rn, shallowRef as _e, toValue as Se, watch as ae, onScopeDispose as vt, getCurrentScope as Bn, defineComponent as V, onMounted as Qe, onBeforeUnmount as pe, openBlock as u, createBlock as I, Teleport as pt, createElementVNode as S, mergeProps as At, unref as $, renderSlot as G, createCommentVNode as O, nextTick as Fe, createElementBlock as p, useSlots as ht, useId as mt, withCtx as U, toDisplayString as P, createTextVNode as J, Fragment as D, renderList as X, withModifiers as Ce, normalizeClass as le, withDirectives as It, withKeys as Oe, normalizeStyle as se, vModelText as Aa, createVNode as z, reactive as un, resolveDynamicComponent as qe, createSlots as Rt, useModel as dn, onBeforeUpdate as Ia, normalizeProps as Et, guardReactiveProps as Ra, mergeModels as fn, vShow as vn, Comment as Ba, Text as Ha, readonly as Fa, watchEffect as qa } from "vue";
import { MenuList as Da } from "menu-bar";
const Qt = ["list", "cards", "grid", "images", "table", "links", "preview"], Be = ["ok", "running", "queued", "review", "failed"], Ic = [...Be, "neutral", "accent"], Rc = [
  "identity",
  "reference",
  "metric",
  "state",
  "updated",
  "image",
  "tint"
], Bc = [480, 620, 760, 900, 1100], Hn = Symbol("dc.routeAdapter");
function ce(e) {
  if (!e) return "";
  const t = e.replace(/^[?]/, "");
  return t ? `?${t}` : "";
}
function Va() {
  const e = typeof window < "u", t = R(e ? ce(window.location.search) : ""), n = R(e ? window.location.pathname : "/"), a = () => {
    t.value = ce(window.location.search), n.value = window.location.pathname;
  };
  e && window.addEventListener("popstate", a);
  const s = (o, r, i) => {
    const l = ce(o);
    if (!e) {
      t.value = l, i !== void 0 && (n.value = i);
      return;
    }
    const c = i === void 0 || i === window.location.pathname ? `${window.location.pathname}${l}${window.location.hash}` : `${i}${l}`;
    r === "push" ? window.history.pushState(window.history.state, "", c) : window.history.replaceState(window.history.state, "", c), t.value = l, n.value = window.location.pathname;
  };
  return {
    search: t,
    path: n,
    href(o, r) {
      return e ? r !== void 0 && r !== window.location.pathname ? `${r}${ce(o)}` : `${window.location.pathname}${ce(o)}${window.location.hash}` : `${r ?? n.value}${ce(o)}`;
    },
    push: (o, r) => s(o, "push", r),
    replace: (o, r) => s(o, "replace", r),
    dispose: () => {
      e && window.removeEventListener("popstate", a);
    }
  };
}
function Ka(e, t) {
  const n = f(t.detached), a = f(() => n.value ? "" : e.search.value), s = f(() => n.value ? t.path() : e.path.value);
  return {
    search: a,
    path: s,
    elsewhere: n,
    push(o, r) {
      n.value ? e.push(o, r ?? t.path()) : e.push(o, r);
    },
    replace(o, r) {
      n.value ? e.push(o, r ?? t.path()) : e.replace(o, r);
    },
    href(o, r) {
      const i = r ?? (n.value ? t.path() : void 0);
      return e.href ? e.href(o, i) : `${i ?? e.path.value}${ce(o)}`;
    }
  };
}
function He(e) {
  let t = 2166136261;
  for (let n = 0; n < e.length; n++)
    t ^= e.charCodeAt(n), t = Math.imul(t, 16777619);
  return Math.abs(t);
}
function Wa(e) {
  if (!Number.isFinite(e)) return "—";
  const t = Math.abs(e);
  return t >= 1e6 ? `${(e / 1e6).toFixed(1)}m` : t >= 1e3 ? `${(e / 1e3).toFixed(1)}k` : String(Math.round(e));
}
function at(e) {
  if (!Number.isFinite(e)) return "—";
  const t = Math.round(e), n = Math.abs(t);
  return n < 1e3 ? String(t) : n < 9950 ? `${(t / 1e3).toFixed(1)}k` : n < 999500 ? `${Math.round(t / 1e3)}k` : `${(t / 1e6).toFixed(1)}m`;
}
function Ie(e) {
  return Number.isFinite(e) ? Math.round(e).toLocaleString("en-US") : "—";
}
function ja(e) {
  const t = new Date(e);
  if (Number.isNaN(t.getTime())) return "—";
  const n = String(t.getUTCDate()).padStart(2, "0"), a = String(t.getUTCMonth() + 1).padStart(2, "0");
  return `${n}.${a}.${t.getUTCFullYear()}`;
}
function za(e) {
  return String(e + 1);
}
function Hc(e, t) {
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
function Ua(e) {
  if (e == null || !Number.isFinite(e) || e < 0) return "—";
  if (e < 1e3) return `${e} B`;
  const t = ["kB", "MB", "GB", "TB"];
  let n = e, a = -1;
  for (; n >= 1e3 && a < t.length - 1; )
    n /= 1e3, a += 1;
  return `${n < 100 ? n.toFixed(1) : Math.round(n)} ${t[a]}`;
}
function Qa(e) {
  if (!e || !Number.isFinite(e)) return "—";
  if (e < 1e3) return `${Math.round(e)}ms`;
  const t = e / 1e3;
  return t < 60 ? `${t.toFixed(1)}s` : `${Math.floor(t / 60)}m ${Math.round(t % 60)}s`;
}
function Ga(e) {
  if (e == null || !Number.isFinite(e) || e <= 0)
    return "—";
  const t = Math.floor(e / 60);
  return t ? `${t}:${String(e % 60).padStart(2, "0")}` : `${e}s`;
}
function Ya(e) {
  return e == null || !Number.isFinite(e) ? "—" : `${Math.round(e * 100)}%`;
}
function Xa(e) {
  return e.replace(/\x1b\[[0-9;?]*[ -/]*[@-~]/g, "");
}
const Fn = "cards", Ja = "table";
function De(e, t = {}) {
  const n = (s) => s && qn(s) ? s : void 0;
  if (e === null) return n(t.view) ?? Fn;
  const a = t.landing === "entity" ? n(t.view) : void 0;
  return n(t.entityView) ?? a ?? Ja;
}
function pn(e, t, n, a = {}) {
  return e === De(t, a) ? De(n, a) : e;
}
const Bt = "updated";
function qn(e) {
  return typeof e == "string" && (e === "record" || Qt.includes(e));
}
const hn = {
  list: "List",
  cards: "Cards",
  grid: "Grid",
  images: "Images",
  table: "Table",
  links: "Links",
  preview: "Preview",
  record: "Record"
};
function Gt(e, t) {
  if (e === "record" && !t?.includes(e)) return t?.[0] ?? Fn;
  const [n] = t ?? [];
  return n === void 0 || t?.includes(e) ? e : n;
}
function Ht(e) {
  return typeof e.count == "number" ? at(e.count) : e.count;
}
function Ve(e, t) {
  return t ? e.entities.find((n) => n.key === t) ?? null : null;
}
function Dn(e, t = {}) {
  const n = Ve(e, t.entity), a = e.entities[0];
  if (!n && !a) throw new Error(`Schema "${e.key}" declares no entities`);
  return n ?? a;
}
function Vn(e, t = null) {
  return e?.columns ?? t?.columns ?? [];
}
function yt(e, t = null) {
  if (e?.sorts?.length) return e.sorts;
  const n = /* @__PURE__ */ new Set(), a = [];
  for (const s of Vn(e, t))
    !s.sort || n.has(s.sort) || (n.add(s.sort), a.push({ key: s.sort, label: (s.label ?? s.sort).toLowerCase() }));
  return a;
}
const Za = { key: Bt, label: Bt };
function be(e, t, n = null) {
  const a = yt(e, n);
  return (t ? a.find((o) => o.key === t) : void 0) ?? a.find((o) => o.key === Bt) ?? a[0] ?? Za;
}
function es(e) {
  switch (e.kind) {
    case "chips":
      return { kind: "chips", selected: [] };
    case "range":
      return { kind: "range", min: null, max: null };
    case "toggle":
      return { kind: "toggle", on: !1 };
  }
}
function ts(e) {
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
function Yt(e) {
  return e.entity === null && e.expr.trim() === "";
}
function Fc(e) {
  return e.entity !== null;
}
function Kn(e, t) {
  return e.entity === null && Gt(e.view, t) === "cards";
}
function ns(e, t) {
  return t <= 0 ? 1 : Math.max(1, Math.ceil(e / t));
}
function st(e, t = {}) {
  const a = t.landing === "entity" ? Dn(e, t) : null;
  return {
    entity: a?.key ?? null,
    view: De(a?.key ?? null, t),
    sort: be(a, t.sort).key,
    dir: t.dir === "asc" ? "asc" : "desc",
    expr: "",
    page: 1
  };
}
const Xt = ["entity", "sort", "dir", "expr"];
function Lt(e) {
  return Xt.some((t) => t in e);
}
const he = "—";
function de(e, t) {
  return e.find((n) => n.role === t);
}
function Wn(e, t) {
  return e.filter((n) => n.role === t);
}
function as(e, t) {
  const n = (t ? t.columns : e?.columns) ?? [], a = t ? "scoped" : "everything";
  return n.filter(
    (s) => s.role !== "tint" && ((s.when ?? "always") === "always" || s.when === a)
  );
}
const ss = ["id", "entityKey", "entityLabel"];
function ie(e, t) {
  if (e.value) return e.value(t);
  const n = e.field ?? e.key;
  if (n !== void 0) {
    if (t.fields && n in t.fields) return t.fields[n];
    if (ss.includes(n))
      return t[n];
  }
}
function mn(e, t) {
  const n = e.key ?? e.field ?? e.label;
  return n?.trim() ? n.trim() : `column-${t}`;
}
function os(e, t) {
  return e.id?.trim() ? e.id : `${e.entityKey || "row"}-${t}`;
}
function rs(e, t) {
  if (e == null || e === "") return he;
  if (t === "number") {
    const n = typeof e == "number" ? e : Number(e);
    return Number.isFinite(n) ? Wa(n) : String(e);
  }
  return t === "date" ? ja(String(e)) : Array.isArray(e) ? e.length ? e.join(", ") : he : String(e);
}
function Pe(e, t) {
  const n = ie(e, t);
  return e.format ? e.format(n, t) : rs(n, e.kind);
}
function ls(e) {
  return typeof e == "number" ? Number.isFinite(e) ? String(e) : "" : typeof e == "string" ? e : Array.isArray(e) ? e.join(", ") : "";
}
function jn(e, t) {
  const n = Pe(e, t), a = ls(ie(e, t));
  return a && a !== n ? a : n;
}
function nt(e, t) {
  return e ? Pe(e, t) : "";
}
function yn(e) {
  return e.align ? e.align : e.kind === "number" || e.kind === "ordinal" ? "right" : "left";
}
const is = {
  ordinal: "dc-table__num",
  number: "dc-table__number",
  date: "dc-table__date",
  status: "dc-table__state"
};
function gn(e) {
  return [is[e.kind ?? "text"], e.class].filter(Boolean).join(" ");
}
function Ft(e) {
  if (e.truncate !== void 0) return e.truncate;
  const t = e.kind ?? "text";
  return t === "text" || t === "number" || t === "date";
}
const cs = /^([A-Za-z_][\w.-]*)\s*(>=|<=|:|=|>|<)\s*(.*)$/, _n = "-?(?:\\d+\\.?\\d*|\\.\\d+)", us = new RegExp(`^(${_n})?\\.\\.(${_n})?$`);
function gt(e) {
  const t = us.exec(e.trim());
  if (!t || t[1] === void 0 && t[2] === void 0) return null;
  const n = t[1] === void 0 ? null : Number(t[1]), a = t[2] === void 0 ? null : Number(t[2]);
  return n !== null && a !== null && n > a ? { min: a, max: n } : { min: n, max: a };
}
function ds(e) {
  return `${e.min ?? ""}..${e.max ?? ""}`;
}
function Ke(e) {
  return e.kind === "field" && (e.comparator === ":" || e.comparator === "=") && gt(e.value) !== null;
}
function fs(e) {
  const t = [];
  let n = "", a = null;
  const s = () => {
    n && t.push(n), n = "";
  };
  for (let o = 0; o < e.length; o++) {
    const r = e[o];
    if (a) {
      r === a ? a = null : n += r;
      continue;
    }
    if (r === '"' || r === "'") {
      a = r;
      continue;
    }
    if (/\s/.test(r)) {
      if (/(?:>=|<=|[:=><])$/.test(n) || e.slice(o + 1).match(/^\s*(>=|<=|[:=><])/) && n) continue;
      s();
      continue;
    }
    n += r;
  }
  return s(), t;
}
function oe(e) {
  const t = e.trim();
  if (!t) return [];
  const n = [];
  let a = [];
  for (const s of fs(t)) {
    const o = s.toUpperCase();
    if (o === "AND" || o === "&&") continue;
    if (o === "OR" || o === "||") {
      a.length && n.push(a), a = [];
      continue;
    }
    const r = s.length > 1 && s.startsWith("-"), i = r ? s.slice(1) : s, l = r ? { negated: !0 } : {}, c = cs.exec(i);
    c && c[3] !== "" ? a.push({
      kind: "field",
      field: c[1].toLowerCase(),
      comparator: c[2],
      value: c[3],
      ...l
    }) : a.push({ kind: "text", value: i, ...l });
  }
  return a.length && n.push(a), n;
}
const $e = (e) => e.toLowerCase().replace(/\s+/g, ""), zn = [
  ["status", "state"],
  ["state", "state"],
  ["updated", "updated"],
  ["date", "updated"],
  ["name", "identity"],
  ["ref", "reference"]
];
function vs(e, t, n) {
  const a = $e(e), s = n.columns ?? [];
  if (a === "entity") return t.entityKey;
  if (e in t.fields) return t.fields[e];
  const o = s.find(
    (c) => c.key?.toLowerCase() === e.toLowerCase() || c.field?.toLowerCase() === e.toLowerCase() || c.label !== void 0 && $e(c.label) === a
  );
  if (o) return ie(o, t);
  const r = n.facets.find(
    (c) => c.key.toLowerCase() === a || $e(c.label) === a
  );
  if (r && r.key in t.fields) return t.fields[r.key];
  const i = zn.find(([c]) => c === a)?.[1];
  if (i) {
    const c = de(s, i);
    if (c) return ie(c, t);
  }
  const l = /^metric(\d+)$/.exec(a);
  if (l) {
    const c = Wn(s, "metric")[Number(l[1]) - 1];
    if (c) return ie(c, t);
  }
}
function Ge(e) {
  return (e.toLowerCase().match(/[\p{L}\p{N}]+/gu) ?? []).map((t) => t.charAt(0)).join("");
}
const wn = /^[a-z_][\w.-]*$/;
function _t(e) {
  const t = (e.key ?? e.field)?.toLowerCase();
  if (t !== void 0) return wn.test(t) ? t : void 0;
  const n = e.label === void 0 ? void 0 : $e(e.label);
  return n !== void 0 && wn.test(n) ? n : void 0;
}
function Jt(e, t) {
  const n = $e(e);
  return !!t?.entities.some((a) => a.scope && $e(a.scope) === n);
}
function ps(e, t, n) {
  const a = $e(e);
  if (a === "entity" || zn.some(([o]) => o === a) || /^metric\d+$/.test(a) || Jt(e, n)) return !0;
  const s = (o) => o !== void 0 && $e(o) === a;
  return (t.columns ?? []).some(
    (o) => s(o.key) || s(o.field) || s(o.label)
  ) || t.facets.some((o) => s(o.key) || s(o.label));
}
function We(e, t, n) {
  return t ? Qn(e, (a) => {
    const s = Gn(a, t, n);
    return s && _t(s);
  }) : e;
}
function Un(e, t, n) {
  return t ? Qn(e, (a) => {
    if (Jt(a, n)) return;
    const s = (t.columns ?? []).find((o) => _t(o) === a);
    return s && Yn(s, t, n);
  }) : e;
}
function hs(e, t, n) {
  if (!t || Jt(e, n)) return;
  const a = t.facets.find((s) => s.key.toLowerCase() === e);
  return a ? a.label : (t.columns ?? []).find((s) => _t(s) === e)?.label;
}
function Qn(e, t) {
  let n = !1;
  const a = oe(e).map(
    (s) => s.map((o) => {
      if (o.kind !== "field") return o;
      const r = t(o.field);
      return !r || r === o.field ? o : (n = !0, { ...o, field: r });
    })
  );
  return n ? ve(a) : e;
}
function Gn(e, t, n) {
  if (!(!e || ps(e, t, n)))
    return (t.columns ?? []).find(
      (a) => a.label !== void 0 && Ge(a.label) === e
    );
}
function Yn(e, t, n) {
  if (!t || e.label === void 0 || !_t(e)) return;
  const a = Ge(e.label);
  return Gn(a, t, n) === e ? a : void 0;
}
function Tt(e, t) {
  const n = e.toLowerCase(), a = t.toLowerCase();
  if (!a.includes("*")) return n.includes(a);
  const s = a.replace(/[.+?^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*");
  return new RegExp(s).test(n);
}
function kn(e, t) {
  return e.toLowerCase() === t.toLowerCase();
}
function ms(e, t, n, a) {
  if (e.kind === "text") {
    const l = n.columns ?? [];
    return ["identity", "reference"].some((c) => {
      const d = de(l, c), v = d ? ie(d, t) : void 0;
      return typeof v == "string" && Tt(v, e.value);
    });
  }
  const s = vs(e.field, t, n);
  if (s === void 0) return a?.has(e.field) ? !1 : null;
  const o = Ke(e) ? gt(e.value) : null;
  if (o) {
    if (Array.isArray(s) || typeof s == "boolean") return null;
    const l = typeof s == "number" ? s : Number(s);
    return Number.isFinite(l) ? (o.min === null || l >= o.min) && (o.max === null || l <= o.max) : null;
  }
  if (Array.isArray(s))
    return e.comparator === ":" || e.comparator === "=" ? s.some(
      (c) => e.comparator === "=" ? kn(String(c), e.value) : Tt(String(c), e.value)
    ) : null;
  if (e.comparator === ":" || e.comparator === "=") {
    if (typeof s == "boolean") {
      const l = e.value.toLowerCase();
      return l === "true" || l === "yes" ? s : l === "false" || l === "no" ? !s : null;
    }
    if (typeof s == "number") {
      const l = Number(e.value);
      return Number.isFinite(l) ? s === l : null;
    }
    return e.comparator === "=" ? kn(String(s), e.value) : Tt(String(s), e.value);
  }
  const r = Number(e.value), i = typeof s == "number" ? s : Number(s);
  return !Number.isFinite(r) || !Number.isFinite(i) ? null : ys(e.comparator, i, r);
}
function bn(e, t, n, a) {
  const s = ms(e, t, n, a);
  return s === null ? !0 : e.negated ? !s : s;
}
function ys(e, t, n) {
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
function $n(e) {
  return e.kind === "field" && !e.negated && (e.comparator === ":" || e.comparator === "=") && !Ke(e);
}
const xn = /* @__PURE__ */ new WeakMap();
function gs(e) {
  if (!e?.strictScopes) return null;
  let t = xn.get(e);
  return t || (t = new Set(
    e.entities.flatMap((n) => n.scope ? [n.scope.toLowerCase()] : [])
  ), xn.set(e, t)), t;
}
function _s(e, t, n, a) {
  if (!e.length) return !0;
  const s = gs(a);
  return e.some((o) => {
    const r = /* @__PURE__ */ new Map();
    for (const i of o)
      $n(i) && r.set(
        i.field,
        (r.get(i.field) ?? !1) || bn(i, t, n, s)
      );
    return o.every(
      (i) => $n(i) ? r.get(i.field) === !0 : bn(i, t, n, s)
    );
  });
}
function Sn(e) {
  return /[\s"']/.test(e) ? `"${e.replace(/["']/g, "")}"` : e;
}
function ge(e) {
  const t = e.negated ? "-" : "";
  return e.kind === "text" ? t + Sn(e.value) : `${t}${e.field}${e.comparator}${Sn(e.value)}`;
}
function ws(e) {
  if (!e.negated) return { ...e, negated: !0 };
  const { negated: t, ...n } = e;
  return n;
}
function ve(e) {
  return e.filter((t) => t.length).map((t) => t.map(ge).join(" ")).join(" OR ");
}
function ks(e, t, n) {
  return e.map((a, s) => s === t ? a.filter((o, r) => r !== n) : a).filter((a) => a.length);
}
function qc(e) {
  const t = oe(e);
  if (t.length > 1) return { parts: [], text: e.trim() };
  const n = t[0] ?? [];
  return {
    parts: n.filter((a) => a.kind === "field"),
    text: n.filter((a) => a.kind === "text").map(ge).join(" ")
  };
}
function Dc(e, t) {
  return [...e.map(ge), t.trim()].filter(Boolean).join(" ");
}
const Cn = (e, t) => e.toLowerCase() === t.toLowerCase();
function qt(e, t) {
  return !!e.negated == !!t.negated && Xn(e, t);
}
function bs(e, t) {
  return !!e.negated != !!t.negated && Xn(e, t);
}
function Xn(e, t) {
  return e.kind === "field" ? t.kind === "field" && e.field === t.field && e.comparator === t.comparator && Cn(e.value, t.value) : t.kind === "text" && Cn(e.value, t.value);
}
function $s(e, t) {
  return t.filter((n) => !e.some((a) => qt(a, n)));
}
function Zt(e, t) {
  return Jn(e, t, (n) => n);
}
function ot(e, t) {
  return Jn(
    e,
    t,
    (n, a) => n.filter((s) => !a.some((o) => bs(s, o)))
  );
}
const xs = /^[A-Za-z_][\w.-]*\s*(?:>=|<=|:|=|>|<)$/;
function Ss(e) {
  return ve(
    oe(e).map(
      (t) => t.filter(
        (n) => n.kind !== "text" || n.value !== "-" && !xs.test(n.value)
      )
    ).filter((t) => t.length > 0)
  );
}
function Jn(e, t, n) {
  const a = oe(e), s = oe(t);
  return a.length ? s.length ? ve(
    a.flatMap(
      (o) => s.map((r) => [...n(o, r), ...$s(o, r)])
    )
  ) : ve(a) : ve(s);
}
const Zn = (e) => e.kind === "date" || e.role === "updated";
function Cs(e) {
  if (!e) return () => 0;
  const n = (e.kind ?? "text") === "number" || e.role === "metric", a = Zn(e);
  return (s, o) => {
    const r = ie(e, s), i = ie(e, o);
    return n ? Number(i ?? 0) - Number(r ?? 0) : a ? Date.parse(String(i ?? "")) - Date.parse(String(r ?? "")) : String(i ?? "").localeCompare(String(r ?? ""));
  };
}
function Pn(e, t) {
  return !t || !Zn(t) ? !1 : !Number.isFinite(Date.parse(String(ie(t, e) ?? "")));
}
function ea({ query: e, schema: t, entity: n, limit: a, offset: s }, o, r) {
  const i = oe(e.expr), l = n ? [n] : t.entities;
  let c = 0;
  const d = [];
  for (const k of l)
    for (const E of o(k))
      c += 1, _s(i, E, k, t) && d.push(E);
  const v = be(n, e.sort, t), b = Vn(n, t).find((k) => k.sort === v.key), x = r.undatedLast ? d.filter((k) => !Pn(k, b)) : d, g = r.undatedLast ? d.filter((k) => Pn(k, b)) : [];
  x.sort(Cs(b)), e.dir === "asc" && x.reverse();
  const m = g.length ? [...x, ...g] : x;
  return {
    // One page out of the middle. `total` stays the whole match, which is what
    // the shell counts pages with.
    rows: r.zeroIsAll && a <= 0 ? m.slice(s) : m.slice(s, s + a),
    total: d.length,
    unfiltered: d.length === c
  };
}
const rt = [
  "oklch(0.36 0.06 240)",
  "oklch(0.34 0.07 290)",
  "oklch(0.36 0.06 160)",
  "oklch(0.38 0.06 80)",
  "oklch(0.35 0.07 30)",
  "oklch(0.34 0.05 200)"
];
function Vc(e) {
  return rt[He(e) % rt.length];
}
function ta(e, t) {
  return `${e}_${1e4 + t * 7}`;
}
const Ps = 7, Es = 3;
function Ls(e, t, n, a) {
  const s = (t * Ps + He(n)) % a, o = [];
  for (let r = 0; r < Math.min(Es, a); r++)
    o.push(ta(e, (s + r) % a));
  return o;
}
function Ts(e, t) {
  switch (e.kind) {
    case "chips":
      return e.multiple ? Ms(e.options, t) : e.options[t % e.options.length] ?? "";
    case "range": {
      const n = Math.max(0, e.max - e.min);
      return e.min + (n === 0 ? 0 : t % (n + 1));
    }
    case "toggle":
      return t % 3 === 0;
  }
}
function Ms(e, t) {
  if (!e.length) return [];
  const n = 1 + (t >> 5) % Math.min(3, e.length), a = t % e.length, s = /* @__PURE__ */ new Set();
  for (let o = 0; o < n; o++) s.add((a + o) % e.length);
  return [...s].sort((o, r) => o - r).map((o) => e[o]);
}
function Os(e, t) {
  const { hash: n, sample: a, revision: s, updatedAt: o } = t, r = s ? ` · rev ${s + 1}` : "";
  switch (e.role) {
    case "identity":
      return `${a[0]}${r}`;
    case "reference":
      return s ? `${a[1]}-${s + 1}` : a[1];
    case "state":
      return Be[n % Be.length];
    case "updated":
      return o;
    case "tint":
      return rt[n % rt.length];
    case "metric":
      return 1 + n % 940;
  }
  switch (e.kind) {
    case "number":
      return 1 + n % 940;
    case "status":
      return Be[n % Be.length];
    case "date":
      return o;
    default:
      return;
  }
}
function Ns(e, t = {}) {
  const n = t.population ?? 48, a = t.seed ?? "", s = t.now ?? /* @__PURE__ */ new Date("2026-08-25T00:00:00Z"), o = e.samples, r = t.scopes ?? [];
  if (!o.length) return [];
  const i = [];
  for (let l = 0; l < n; l++) {
    const c = o[l % o.length], d = Math.floor(l / o.length), v = He(`${a}:${e.key}:${c[0]}:${l}`), b = ta(e.key, l), x = new Date(s.getTime() - v % 900 * 36e5).toISOString(), g = {};
    for (const m of e.columns ?? []) {
      const k = m.field ?? m.key;
      if (!k || m.value) continue;
      const E = Os(m, {
        hash: He(`${v}:${k}`),
        sample: c,
        revision: d,
        updatedAt: x
      });
      E !== void 0 && (g[k] = E);
    }
    for (const m of e.facets)
      g[m.key] = Ts(m, He(`${v}:${m.key}`));
    for (const [m, k] of r)
      g[m] = k === e.key ? b : Ls(k, l, m, n);
    i.push({ id: b, entityKey: e.key, entityLabel: e.label, fields: g });
  }
  return i;
}
function As(e = {}) {
  const t = /* @__PURE__ */ new Map(), n = (a, s) => {
    const o = t.get(a.key);
    if (o) return o;
    const r = e.scopes ?? s.entities.flatMap(
      (l) => l.scope ? [[l.scope, l.key]] : []
    ), i = Ns(a, { ...e, scopes: r });
    return t.set(a.key, i), i;
  };
  return {
    query(a) {
      return ea(a, (s) => n(s, a.schema), {
        undatedLast: !1,
        zeroIsAll: !1
      });
    }
  };
}
const Ne = "e", wt = "v", en = "s", tn = "d", Ee = "q", kt = "p", na = "*", Is = [
  Ne,
  wt,
  en,
  tn,
  Ee,
  kt
], Rs = [
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
function lt(e) {
  let t = encodeURIComponent(e);
  for (const [n, a] of Rs) t = t.replace(n, a);
  return t;
}
function fe(e) {
  try {
    return decodeURIComponent(e.replace(/\+/g, " "));
  } catch {
    return e.replace(/\+/g, " ");
  }
}
function nn(e) {
  const t = e.replace(/^[?]/, "");
  if (!t) return [];
  const n = [];
  for (const a of t.split("&")) {
    if (!a) continue;
    const s = a.indexOf("="), o = s === -1 ? a : a.slice(0, s), r = s === -1 ? "" : a.slice(s + 1);
    n.push([fe(o), r]);
  }
  return n;
}
function Bs(e) {
  return Is.includes(e);
}
function bt(e, t) {
  if (!(!t || e.some((n) => n.key === t)))
    return e.find((n) => Ge(n.label) === t);
}
function Hs(e, t) {
  const n = Ge(e.label);
  return bt(t.entities, n)?.key === e.key ? n : e.key;
}
function aa(e, t) {
  return t ? Ve(e, t) ?? bt(e.entities, t) ?? null : null;
}
function Fs(e, t) {
  const n = Ge(e.label);
  return bt(t, n)?.key === e.key ? n : e.key;
}
function qs(e, t) {
  return t.some((n) => n.key === e) ? e : bt(t, e)?.key ?? e;
}
function Ds(e, t, n = {}) {
  const a = st(t, n), s = new Map(nn(e)), o = s.get(Ne), r = o === void 0 ? a.entity : fe(o), i = r === na ? null : aa(t, r), l = s.get(wt), c = l && qn(fe(l)) ? fe(l) : De(i?.key ?? null, n), d = s.get(en), v = be(
    i,
    d ? qs(fe(d), yt(i, t)) : n.sort,
    t
  ), b = s.get(tn), x = b ? fe(b) === "asc" ? "asc" : "desc" : a.dir, g = s.get(Ee), m = s.get(kt), k = m === void 0 ? 1 : Number(fe(m)), E = Number.isFinite(k) ? Math.max(1, Math.floor(k)) : 1;
  return {
    entity: i?.key ?? null,
    view: c,
    sort: v.key,
    dir: x,
    expr: g === void 0 ? "" : We(fe(g), i, t),
    page: E
  };
}
function En(e, t, n = {}, a = "") {
  const s = st(t, n), o = Ve(t, e.entity), r = nn(a).filter(([v]) => !Bs(v)), i = [], l = (v, b) => i.push([v, lt(b)]), c = o?.key ?? null;
  if (c !== s.entity && l(Ne, o ? Hs(o, t) : na), e.view !== De(c, n) && l(wt, e.view), e.sort !== s.sort) {
    const v = yt(o, t), b = v.find((x) => x.key === e.sort);
    l(en, b ? Fs(b, v) : e.sort);
  }
  e.dir !== s.dir && l(tn, e.dir), e.expr.trim() !== "" && l(Ee, Un(e.expr, o, t)), e.page > 1 && l(kt, String(e.page));
  const d = [
    ...r.map(([v, b]) => [lt(v), b]),
    ...i
  ];
  return d.length ? `?${d.map(([v, b]) => b === "" ? v : `${v}=${b}`).join("&")}` : "";
}
function Kc(e) {
  const t = [];
  for (const [n, a] of Object.entries(e))
    for (const s of Array.isArray(a) ? a : [a]) {
      if (typeof s != "string") continue;
      const o = lt(n);
      t.push(s === "" ? o : `${o}=${lt(s)}`);
    }
  return t.length ? `?${t.join("&")}` : "";
}
function Wc(e, t) {
  const n = new Map(nn(e)), a = n.get(Ee), s = a === void 0 ? "" : fe(a);
  if (!t) return s;
  const o = n.get(Ne);
  return We(
    s,
    o === void 0 ? null : aa(t, fe(o)),
    t
  );
}
function $t(e, t) {
  return sa(e, t.id);
}
function sa(e, t) {
  const n = e?.scope;
  return n ? oa(n, t) : null;
}
function oa(e, t) {
  return `${e}="${t.replace(/"/g, "")}"`;
}
function jc(e, t) {
  const n = typeof e == "string" ? e : e?.scope;
  if (!n) return null;
  const a = t.filter((s) => s.replace(/"/g, "") !== "").map((s) => oa(n, s));
  return a.length ? a.join(" ") : null;
}
function xt(e, t) {
  if (e.kind !== "field" || t.kind !== "field") return qt(e, t);
  const n = (a) => a.comparator === ":" || a.comparator === "=";
  return qt(e, { ...t, comparator: n(e) && n(t) ? e.comparator : t.comparator });
}
function it(e, t) {
  return xt(e, ws(t));
}
function ct(e, t) {
  return $t(
    e.entities.find((n) => n.key === t.entityKey),
    t
  );
}
function Ye(e, t) {
  if (!t) return e;
  const n = e.trim();
  if (!n) return t;
  const [a] = oe(t).flat();
  if (!a) return n;
  const s = oe(n);
  return s.some((i) => i.some((l) => xt(l, a))) ? n : s.some((i) => i.some((l) => it(l, a))) ? ve(
    s.map(
      (i) => i.map((l) => it(l, a) ? a : l)
    )
  ) : `${n} ${t}`;
}
function ra(e) {
  if (!e) return null;
  const t = e.trim();
  return t ? t.startsWith("-") ? t.slice(1) : `-${t}` : null;
}
function an(e, t) {
  if (!t || !e.trim()) return null;
  const [n] = oe(t).flat();
  if (!n) return null;
  const a = oe(e).flat();
  return a.some((s) => xt(s, n)) ? n.negated ? "out" : "in" : a.some((s) => it(s, n)) ? n.negated ? "in" : "out" : null;
}
function la(e, t) {
  if (!t || !e.trim()) return e;
  const [n] = oe(t).flat();
  if (!n) return e;
  const a = oe(e), s = a.map(
    (o) => o.filter((r) => !xt(r, n) && !it(r, n))
  );
  return s.every((o, r) => o.length === a[r]?.length) ? e : ve(s);
}
function Dt(e, t, n) {
  return t ? n === null ? la(e, t) : Ye(e, n === "out" ? ra(t) : t) : e;
}
function ia(e) {
  return e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0;
}
function St(e) {
  return e.altKey ? { exclude: !0 } : {};
}
function Mt(e, t, n, a = {}) {
  const s = ct(e, n);
  return Ye(t.expr, a.exclude ? ra(s) : s);
}
function ca(e, t) {
  const n = e?.scope?.toLowerCase();
  if (!n || e?.keepsScope || !t.trim()) return t;
  const a = oe(t), s = a.map(
    (o) => o.filter((r) => r.kind !== "field" || r.field !== n)
  );
  return s.every((o, r) => o.length === a[r]?.length) ? t : ve(s);
}
function ua(e, t) {
  const n = t.toLowerCase();
  return e.entities.find((a) => a.scope?.toLowerCase() === n) ?? null;
}
function da(e, t, n) {
  if (!t || !n) return null;
  const a = ua(e, t);
  return a ? { entity: a, id: n } : null;
}
function Vs(e, t) {
  const n = [], a = /* @__PURE__ */ new Set();
  for (const s of t)
    for (const o of oe(s).flat()) {
      if (o.kind !== "field" || o.negated) continue;
      const r = da(e, o.field, o.value);
      if (!r) continue;
      const i = `${r.entity.key}:${r.id.toLowerCase()}`;
      a.has(i) || (a.add(i), n.push({ entityKey: r.entity.key, id: r.id }));
    }
  return n;
}
function zc(e, t, n = "cards") {
  return {
    // An expression with nothing in it is no parameter, as the shell writes it.
    [Ee]: Ye(e, t) || void 0,
    [Ne]: void 0,
    [wt]: n,
    [kt]: void 0
  };
}
const fa = Symbol("dc.shellContext");
function Ks(e) {
  const t = e.liveQuery ? e : Ws(e);
  return Ut(fa, t), t;
}
function Ws(e) {
  const t = e.draft ?? R("");
  return {
    draft: t,
    liveQuery: e.query,
    drafting: f(() => !1),
    commitDraft() {
      const n = t.value.trim();
      n && (e.setExpression(
        ot(e.query.value.expr, We(n, e.entity.value, e.schema.value))
      ), t.value = "");
    },
    abandonDraft() {
      t.value = "";
    },
    ...e
  };
}
function ee() {
  const e = zt(fa, null);
  if (!e)
    throw new Error(
      "[appfr] No shell context found. Render this component inside <DataShell>."
    );
  return e;
}
const ut = Symbol("dc-shell-theme");
function Vt(e) {
  return {
    read: () => ({
      theme: Se(e.theme),
      accent: Se(e.accent),
      tokens: Se(e.tokens)
    })
  };
}
function js(e, t) {
  t ? t.provide(ut, Vt(e)) : Ut(ut, Vt(e));
}
function zs(e) {
  const t = Rn();
  Ut(ut, {
    ...Vt(e),
    element: () => t?.proxy?.$el ?? null
  });
}
function sn(e) {
  const t = Rn(), n = zt(ut, null), a = _e(null);
  function s() {
    const l = t?.proxy?.$el, d = (l instanceof Element ? l : l?.parentElement)?.closest(".dc-shell");
    if (!d) {
      a.value = null;
      return;
    }
    const v = {};
    for (const b of Array.from(d.style))
      b.startsWith("--") && (v[b] = d.style.getPropertyValue(b));
    a.value = { shell: d, theme: d.dataset.dcTheme, tokens: v };
  }
  const o = f(() => {
    const l = a.value;
    if (!n) return l;
    const c = n.element?.();
    return l && c && l.shell !== c && c.contains(l.shell) ? l : n.read();
  }), r = f(() => e.theme ?? o.value?.theme ?? "minimal"), i = f(() => {
    const l = o.value, c = {
      ...l?.tokens,
      ...l?.accent ? { "--dc-accent": l.accent } : {},
      ...e.tokens,
      ...e.accent ? { "--dc-accent": e.accent } : {}
    };
    return Object.keys(c).length ? c : void 0;
  });
  return { theme: r, style: i, adopt: s };
}
function je(e) {
  return e.key.toLowerCase();
}
const Us = /* @__PURE__ */ new Set([">", ">=", "<", "<="]);
function va(e, t) {
  if (e.kind !== "field" || e.negated || e.field !== je(t)) return !1;
  const n = e.comparator === ":" || e.comparator === "=";
  switch (t.kind) {
    case "range":
      return Ke(e) || Us.has(e.comparator);
    case "chips":
      return n && !Ke(e) && pa(t.options, e.value) !== void 0;
    case "toggle":
      return n && Qs(e.value);
  }
}
function pa(e, t) {
  const n = t.toLowerCase();
  return e.find((a) => a.toLowerCase() === n);
}
function Qs(e) {
  const t = e.toLowerCase();
  return t === "true" || t === "yes";
}
function ha(e, t) {
  const n = (oe(e)[0] ?? []).filter((a) => va(a, t));
  switch (t.kind) {
    case "range": {
      let a = null, s = null;
      for (const o of n) {
        const r = gt(o.value), i = Number(o.value);
        r ? (r.min !== null && (a = r.min), r.max !== null && (s = r.max)) : Number.isFinite(i) && (o.comparator.startsWith(">") ? a = i : s = i);
      }
      return { kind: "range", min: a, max: s };
    }
    case "chips": {
      const a = new Set(n.map((s) => pa(t.options, s.value)));
      return { kind: "chips", selected: t.options.filter((s) => a.has(s)) };
    }
    case "toggle":
      return { kind: "toggle", on: n.length > 0 };
  }
}
function Gs(e, t) {
  const n = je(e);
  switch (t.kind) {
    case "range":
      return t.min === null && t.max === null ? [] : [{ kind: "field", field: n, comparator: ":", value: ds(t) }];
    case "chips":
      return t.selected.map((a) => ({ kind: "field", field: n, comparator: "=", value: a }));
    case "toggle":
      return t.on ? [{ kind: "field", field: n, comparator: ":", value: "true" }] : [];
  }
}
function ma(e, t, n) {
  const a = Gs(t, n), s = oe(e), o = (s.length ? s : [[]]).map((r) => [
    ...r.filter((i) => !va(i, t)),
    ...a
  ]);
  return ve(o);
}
function Uc(e, t) {
  return ma(e, t, es(t));
}
function Ys(e, t) {
  return (t?.facets ?? []).some((n) => ts(ha(e, n)));
}
const dt = "entity", ze = "expr", Xs = { ">=": "≥", "<=": "≤", ">": ">", "<": "<" };
function Js(e, t, n) {
  if (e.kind !== "field") return ge(e);
  const a = hs(e.field, t, n);
  if (a === void 0) return ge(e);
  const s = e.negated ? "-" : "", o = Ke(e) ? gt(e.value) : null;
  if (o) {
    const i = o.min !== null && o.max !== null ? `${o.min} ≤ ${a} ≤ ${o.max}` : o.max !== null ? `${a} ≤ ${o.max}` : `${a} ≥ ${o.min}`;
    return s + i;
  }
  const r = Xs[e.comparator];
  return r ? `${s}${a} ${r} ${e.value}` : ge({ ...e, field: a });
}
function on(e, t, n = null) {
  const a = [];
  return t && a.push({
    id: dt,
    label: `entity:${t.key}`,
    facetKey: dt
  }), oe(e.expr).forEach((s, o) => {
    s.forEach((r, i) => {
      a.push({
        id: `${ze}:${o}:${i}`,
        label: Js(r, t, n),
        address: Un(ge(r), t, n),
        facetKey: ze,
        group: o,
        index: i,
        ...r.kind === "field" ? { field: r.field, value: r.value } : {},
        ...r.negated ? { negated: !0 } : {}
      });
    });
  }), a;
}
function Zs(e, t, n = null) {
  if (Yt(e)) {
    const o = be(t, e.sort, n);
    return `everything · ${e.view} · ${o.label}`;
  }
  const a = on(e, t).filter((o) => o.facetKey !== ze).map((o) => o.label), s = e.expr.trim();
  return s && a.push(`"${s}"`), a.join(" · ");
}
function eo(e) {
  const { adapter: t } = e, n = f(() => Se(e.schema)), a = f(() => Se(e.defaults) ?? {}), s = f(() => Ds(t.search.value, n.value, a.value)), o = f(() => Ve(n.value, s.value.entity)), r = f(() => o.value ?? Dn(n.value, a.value)), i = f(() => yt(o.value, n.value)), l = f(() => be(o.value, s.value.sort, n.value)), c = (w, h) => {
    const _ = En(w, n.value, a.value, t.search.value);
    return _ === t.search.value && !t.elsewhere?.value ? !1 : (h === "push" ? t.push(_) : t.replace(_), !0);
  }, d = () => Se(e.navigationMode) ?? "push", v = () => Se(e.facetNavigationMode) ?? "replace", b = (w, h) => {
    const _ = w.page ?? (Lt(w) ? 1 : s.value.page);
    return c({ ...s.value, ...w, page: _ }, h);
  }, x = (w) => {
    const h = w.page ?? (Lt(w) ? 1 : s.value.page);
    return g({ ...s.value, ...w, page: h });
  }, g = (w) => {
    const h = En(w, n.value, a.value, t.search.value);
    return t.href ? t.href(h) : `${t.path.value}${h}`;
  }, m = (w, h) => {
    const _ = o.value?.facets.find((H) => H.key === w);
    if (!_) return;
    const T = ma(s.value.expr, _, h(ha(s.value.expr, _)));
    b({ expr: T }, v());
  }, k = (w) => {
    const h = w === null ? null : Ve(n.value, w);
    return (h?.key ?? null) === s.value.entity ? {} : {
      entity: h?.key ?? null,
      view: pn(s.value.view, s.value.entity, h?.key ?? null, a.value),
      sort: be(h, s.value.sort, n.value).key
    };
  }, E = (w) => {
    const h = k(w);
    Object.keys(h).length && b(h, d());
  };
  return {
    query: s,
    entity: o,
    focus: r,
    sort: l,
    sorts: i,
    summary: f(() => Zs(s.value, o.value, n.value)),
    terms: f(() => on(s.value, o.value, n.value)),
    isPristine: f(() => Yt(s.value)),
    isEverything: f(() => s.value.entity === null),
    hasFacets: f(() => Ys(s.value.expr, o.value)),
    setEntity: E,
    entityHref: (w) => x(k(w)),
    clearEntity: () => E(null),
    setView(w) {
      b({ view: w }, d());
    },
    setSort(w) {
      b({ sort: be(o.value, w, n.value).key }, d());
    },
    toggleDirection() {
      b({ dir: s.value.dir === "desc" ? "asc" : "desc" }, d());
    },
    setExpression(w) {
      return b({ expr: w }, d());
    },
    narrow(w, h, _) {
      return b({ expr: w, ...k(h), ..._ ? { view: _ } : {} }, d());
    },
    narrowHref(w, h, _) {
      return x({ expr: w, ...k(h), ..._ ? { view: _ } : {} });
    },
    setPage(w, h) {
      b({ page: Math.max(1, Math.floor(w)) }, h ?? d());
    },
    setFacet(w, h) {
      m(w, () => h);
    },
    toggleChip(w, h) {
      m(w, (_) => _.kind !== "chips" ? _ : { kind: "chips", selected: _.selected.includes(h) ? _.selected.filter((H) => H !== h) : [..._.selected, h] });
    },
    setRange(w, h, _) {
      m(w, (T) => T.kind === "range" ? { kind: "range", min: h, max: _ } : T);
    },
    toggleFlag(w) {
      m(
        w,
        (h) => h.kind === "toggle" ? { kind: "toggle", on: !h.on } : h
      );
    },
    removeTerm(w) {
      if (w.facetKey === dt) {
        E(null);
        return;
      }
      if (w.facetKey === ze) {
        const h = ks(oe(s.value.expr), w.group ?? 0, w.index ?? 0);
        b({ expr: ve(h) }, d());
      }
    },
    clearFilters() {
      b({ ...k(null), expr: "" }, d());
    },
    clearHref: () => x({ ...k(null), expr: "" }),
    reset() {
      c(st(n.value, a.value), d());
    },
    homeHref: () => g(st(n.value, a.value)),
    hrefFor(w) {
      const h = { ...s.value, ...w };
      return "entity" in w && !("view" in w) && (h.view = pn(s.value.view, s.value.entity, h.entity, a.value)), h.page = w.page ?? (Lt(w) ? 1 : s.value.page), g(h);
    }
  };
}
function to(e) {
  const t = _e([]), n = R(0), a = R(!1), s = R(!1), o = _e(null);
  let r = 0, i = null, l = null;
  const c = f(() => (e.query.value.page - 1) * e.limit.value), d = f(() => ns(n.value, e.limit.value)), v = () => {
    const _ = e.query.value, T = e.within?.value.trim(), H = ca(e.entity.value, _.expr);
    return T ? { ..._, expr: Zt(T, H) } : H === _.expr ? _ : { ..._, expr: H };
  }, b = (_, T) => {
    t.value = _.rows, n.value = _.total, o.value = null, x(T);
  }, x = (_) => {
    i = { key: _, total: n.value }, s.value = !1;
  }, g = (_) => {
    o.value = _, t.value = [], n.value = 0, i = null, s.value = !1;
  }, m = (_, T, H, Q) => {
    let B = !0;
    const W = () => _ === r;
    let te = 0, re = !1;
    const q = (F) => {
      te = F, re = !0, Q === void 0 && (n.value = F);
    }, Z = () => {
      B && (B = !1, t.value = [], q(0)), o.value = null;
    };
    return {
      get open() {
        return W();
      },
      insert(F, M) {
        if (!W()) return;
        const j = Array.isArray(F) ? F : [F];
        if (!j.length) return;
        Z();
        const N = [...t.value];
        N.splice(M ?? N.length, 0, ...j), t.value = T > 0 ? N.slice(0, T) : N, q(te + j.length);
      },
      set(F) {
        W() && (F.rows && (Z(), t.value = T > 0 ? F.rows.slice(0, T) : F.rows, q(F.rows.length)), F.total !== void 0 && q(F.total));
      },
      close() {
        W() && (a.value = !1, re && (n.value = te), x(H));
      },
      fail(F) {
        W() && (g(F), a.value = !1);
      }
    };
  }, k = () => {
    const _ = l;
    l = null, _?.();
  }, E = () => {
    const _ = ++r;
    k();
    const T = w.value, H = i?.key === T ? i.total : void 0;
    s.value = H === void 0;
    const Q = {
      query: v(),
      schema: e.schema.value,
      entity: e.entity.value,
      limit: e.limit.value,
      offset: c.value
    }, B = e.source.value;
    if (B.stream) {
      a.value = !0;
      try {
        l = B.stream(Q, m(_, Q.limit, T, H)) ?? null;
      } catch (te) {
        g(te), a.value = !1;
      }
      return;
    }
    let W;
    try {
      W = B.query(Q);
    } catch (te) {
      g(te);
      return;
    }
    if (!(W instanceof Promise)) {
      b(W, T), a.value = !1;
      return;
    }
    a.value = !0, W.then((te) => {
      _ === r && b(te, T);
    }).catch((te) => {
      _ === r && g(te);
    }).finally(() => {
      _ === r && (a.value = !1);
    });
  }, w = f(() => {
    const _ = v();
    return `${e.entity.value?.key ?? e.schema.value.entities[0]?.key ?? ""}|${JSON.stringify(Xt.map((H) => _[H]))}`;
  }), h = f(() => `${w.value}|${e.query.value.page}`);
  return ae([e.source, h, e.limit], E, {
    immediate: !0
  }), vt(() => {
    r++, k();
  }, !0), { rows: t, total: n, offset: c, pageCount: d, pending: a, counting: s, error: o, refresh: E };
}
const no = 150;
function ao(e) {
  const t = e.delay ?? no, n = R(""), a = R("");
  let s = !1, o;
  const r = () => {
    clearTimeout(o), o = void 0;
  }, i = f(() => We(Ss(a.value), e.entity.value, e.schema?.value)), l = f(() => i.value.trim() !== ""), c = f(
    () => JSON.stringify([i.value, ...Xt.map((x) => e.query.value[x])])
  ), d = _e(null), v = f(() => {
    const x = e.query.value;
    if (!l.value) return x;
    const g = d.value?.of === c.value ? d.value.page : 1;
    return { ...x, expr: ot(x.expr, i.value), page: g };
  });
  ae(n, (x) => {
    if (r(), !x.trim()) {
      s || (a.value = "");
      return;
    }
    s = !1, o = setTimeout(() => {
      o = void 0, a.value = n.value;
    }, t);
  }), ae(
    e.query,
    () => {
      s && (s = !1, a.value = "");
    },
    { flush: "sync" }
  );
  const b = (x) => {
    r(), s = !0, n.value = "", !x() && s && (s = !1, a.value = "");
  };
  return Bn() && vt(r), {
    text: n,
    live: v,
    drafting: l,
    setPage(x) {
      d.value = { of: c.value, page: Math.max(1, Math.floor(x)) };
    },
    commit() {
      const x = n.value.trim();
      if (!x) return;
      const g = ot(
        e.query.value.expr,
        We(x, e.entity.value, e.schema?.value)
      );
      a.value = x, b(() => e.setExpression(g));
    },
    abandon() {
      r(), s = !1, n.value = "", a.value = "";
    },
    release: b
  };
}
const so = 25, ya = (e, t) => e.toLowerCase() === t.toLowerCase();
function oo(e, t) {
  return e.find((n) => ya(n.id, t));
}
function ro(e) {
  const t = _e(/* @__PURE__ */ new Map()), n = /* @__PURE__ */ new Set(), a = (i) => {
    if (i.facetKey !== ze) return null;
    const l = da(e.schema.value, i.field, i.value);
    return l ? { ...l, key: `${l.entity.key}:${l.id}` } : null;
  }, s = (i) => {
    const { entity: l, id: c } = i, d = e.query.value;
    return e.source.value.query({
      query: {
        ...d,
        entity: l.key,
        // The reference on its own. The rest of the query is about the rows on
        // screen, which are of another type entirely.
        expr: sa(l, c) ?? "",
        sort: be(l, d.sort, e.schema.value).key,
        page: 1
      },
      schema: e.schema.value,
      entity: l,
      limit: so,
      offset: 0
    });
  }, o = (i, l) => {
    const c = nt(de(i.columns ?? [], "identity"), l);
    return c === he || ya(c, l.id) ? "" : c;
  }, r = () => {
    if (e.loading.value) return;
    const i = /* @__PURE__ */ new Map();
    for (const d of e.terms.value) {
      const v = a(d);
      v && !t.value.has(v.key) && !n.has(v.key) && i.set(v.key, v);
    }
    if (!i.size) return;
    const l = [...i.values()].map((d) => ({
      reference: d,
      outcome: s(d)
    })), c = (d) => {
      const v = new Map(t.value);
      d.forEach((b, x) => {
        const { reference: g } = l[x], m = oo(b.rows, g.id);
        v.set(g.key, m ? o(g.entity, m) : "");
      }), t.value = v;
    };
    if (l.every(({ outcome: d }) => !(d instanceof Promise))) {
      c(l.map(({ outcome: d }) => d));
      return;
    }
    for (const { reference: d } of l) n.add(d.key);
    Promise.all(l.map(({ outcome: d }) => Promise.resolve(d))).then(c).catch(() => {
    }).finally(() => {
      for (const { reference: d } of l) n.delete(d.key);
    });
  };
  return ae([e.source, e.schema, e.terms, e.loading], () => {
    try {
      r();
    } catch {
    }
  }, { immediate: !0 }), {
    names: t,
    nameOf(i) {
      const l = a(i);
      return l && t.value.get(l.key) || null;
    }
  };
}
const lo = 4, io = 8, co = 180;
function uo(e, t, n, a = {}) {
  const s = a.gap ?? lo, o = a.margin ?? io, r = a.flipBelow ?? co, i = a.side ?? "below", l = {
    below: n.height - e.bottom - s - o,
    above: e.top - s - o
  }, c = i === "below" ? "above" : "below", d = l[i] < r && l[c] > l[i] ? c : i, v = Math.min(a.maxHeight ?? 1 / 0, Math.max(0, l[d])), b = Math.max(0, n.width - o * 2), x = Math.min(a.minWidth ?? e.width, b), g = Math.min(Math.max(t, x), b), m = a.align === "end" ? e.right - g : e.left, k = Math.max(o, Math.min(m, n.width - g - o));
  return d === "below" ? { side: d, left: k, top: e.bottom + s, maxHeight: v, minWidth: x, maxWidth: b } : { side: d, left: k, bottom: n.height - e.top + s, maxHeight: v, minWidth: x, maxWidth: b };
}
const fo = ["data-dc-theme", "data-dc-side"], ke = [], vo = /* @__PURE__ */ V({
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
    const n = e, a = t, { theme: s, style: o, adopt: r } = sn(n), i = R(null), l = R(null), c = { root: () => i.value };
    function d() {
      const h = n.anchor;
      h && (l.value = uo(
        h.getBoundingClientRect(),
        i.value?.offsetWidth ?? 0,
        { width: window.innerWidth, height: window.innerHeight },
        { side: n.side, align: n.align, maxHeight: n.maxHeight, minWidth: n.minWidth }
      ));
    }
    const v = f(() => {
      const h = l.value, _ = h ? {
        position: "fixed",
        left: `${h.left}px`,
        ...h.top !== void 0 ? { top: `${h.top}px` } : {},
        ...h.bottom !== void 0 ? { bottom: `${h.bottom}px` } : {},
        minWidth: `${h.minWidth}px`,
        maxWidth: `${h.maxWidth}px`,
        maxHeight: `${h.maxHeight}px`,
        overflowY: "auto"
      } : { position: "fixed", visibility: "hidden" };
      return { ...o.value, ..._ };
    });
    function b() {
      a("update:open", !1), a("close");
    }
    function x(h) {
      return i.value?.contains(h) || n.anchor?.contains(h) ? !0 : ke.slice(ke.indexOf(c) + 1).some((T) => T.root()?.contains(h));
    }
    function g(h) {
      const _ = h.target;
      _ && !x(_) && b();
    }
    function m(h) {
      h.key !== "Escape" || h.defaultPrevented || ke[ke.length - 1] === c && (h.preventDefault(), i.value?.contains(document.activeElement) && n.anchor?.focus(), b());
    }
    let k = null;
    async function E() {
      ke.includes(c) || (ke.push(c), r(), l.value = null, await Fe(), d(), window.addEventListener("pointerdown", g, !0), document.addEventListener("keydown", m, !0), window.addEventListener("resize", d), window.addEventListener("scroll", d, !0), typeof ResizeObserver < "u" && i.value && (k = new ResizeObserver(() => d()), k.observe(i.value)));
    }
    function w() {
      const h = ke.indexOf(c);
      h !== -1 && (ke.splice(h, 1), window.removeEventListener("pointerdown", g, !0), document.removeEventListener("keydown", m, !0), window.removeEventListener("resize", d), window.removeEventListener("scroll", d, !0), k?.disconnect(), k = null);
    }
    return Qe(() => {
      n.open && E();
    }), ae(
      () => n.open,
      (h) => {
        h ? E() : w();
      }
    ), ae(() => n.anchor, () => {
      n.open && d();
    }), pe(w), (h, _) => e.open ? (u(), I(pt, {
      key: 0,
      to: e.to
    }, [
      S("div", At({
        ref_key: "root",
        ref: i
      }, h.$attrs, {
        class: "dc-shell dc-layer dc-popover",
        "data-dc-theme": $(s),
        "data-dc-side": l.value?.side,
        style: v.value
      }), [
        G(h.$slots, "default", {}, void 0, !0)
      ], 16, fo)
    ], 8, ["to"])) : O("", !0);
  }
}), K = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [a, s] of t)
    n[a] = s;
  return n;
}, po = /* @__PURE__ */ K(vo, [["__scopeId", "data-v-a688f2f7"]]), ho = ["href"], mo = /* @__PURE__ */ V({
  __name: "PressLink",
  props: {
    href: {}
  },
  emits: ["press"],
  setup(e, { emit: t }) {
    const n = e, a = t;
    function s(o) {
      if (n.href && ia(o)) {
        o.stopPropagation();
        return;
      }
      o.preventDefault(), a("press", St(o), o);
    }
    return (o, r) => e.href ? (u(), p("a", {
      key: 0,
      href: e.href,
      class: "dc-press",
      onClick: s
    }, [
      G(o.$slots, "default", {}, void 0, !0)
    ], 8, ho)) : (u(), p("button", {
      key: 1,
      type: "button",
      class: "dc-press",
      onClick: s
    }, [
      G(o.$slots, "default", {}, void 0, !0)
    ]));
  }
}), ne = /* @__PURE__ */ K(mo, [["__scopeId", "data-v-a9383f64"]]), ft = (e) => e.toLowerCase().replace(/\s+/g, ""), yo = /(?:[^\s"]|"[^"]*"?)*$/, go = /^(-?)([^:=<>"\s-][^:=<>"\s]*)([:=])(.*)$/, Ln = 4;
function _o(e, t) {
  const n = ft(t);
  return e.find((a) => je(a) === n || ft(a.label) === n);
}
function wo(e) {
  switch (e.kind) {
    case "toggle":
      return e.text;
    case "range":
      return `${e.min}..${e.max}`;
    case "chips": {
      const t = e.options.slice(0, Ln).join(" · "), n = e.options.length - Ln;
      return n > 0 ? `${t} · +${n}` : t;
    }
  }
}
function ko(e) {
  switch (e.kind) {
    case "toggle":
      return [{ value: "true", hint: e.text }, { value: "false" }];
    case "chips":
      return e.options.map((t) => ({ value: t }));
    case "range":
      return [];
  }
}
function Tn(e, t) {
  return ft(e).includes(ft(t));
}
function bo(e, t) {
  const n = yo.exec(e)?.[0] ?? "", a = e.slice(0, e.length - n.length), s = [], o = go.exec(n);
  if (o) {
    const [, r, i, l, c] = o, d = _o(t, i);
    if (!d) return [];
    const v = c.replace(/"/g, "").toLowerCase();
    for (const { value: b, hint: x } of ko(d)) {
      if (!b.toLowerCase().includes(v)) continue;
      const g = ge({
        kind: "field",
        field: je(d),
        comparator: l,
        value: b,
        ...r ? { negated: !0 } : {}
      });
      s.push({ draft: a + g, label: g, ...x ? { hint: x } : {}, complete: !0 });
    }
  } else {
    if (/[<>"]/.test(n)) return [];
    const r = n.startsWith("-") ? "-" : "", i = n.slice(r.length);
    for (const l of t) {
      if (i && !Tn(l.key, i) && !Tn(l.label, i)) continue;
      const c = `${r}${je(l)}:`;
      s.push({ draft: a + c, label: c, hint: wo(l), complete: !1 });
    }
  }
  return s.filter((r) => r.draft !== e);
}
const $o = { class: "dc-header" }, xo = { class: "dc-header__main" }, So = {
  class: "dc-header__brand",
  "aria-hidden": "true"
}, Co = { class: "dc-header__sr" }, Po = {
  key: 2,
  class: "dc-header__within"
}, Eo = ["title"], Lo = { class: "dc-header__query" }, To = ["data-dc-more", "title"], Mo = { class: "dc-header__run" }, Oo = {
  key: 0,
  class: "dc-header__or dc-mono",
  "aria-hidden": "true"
}, No = ["title", "aria-label", "onClick"], Ao = ["placeholder", "aria-expanded", "aria-activedescendant", "onKeydown"], Io = ["id", "aria-selected", "onClick"], Ro = { class: "dc-completion__term dc-mono" }, Bo = {
  key: 0,
  class: "dc-completion__hint"
}, Ho = {
  key: 0,
  class: "dc-header__actions"
}, Fo = /* @__PURE__ */ V({
  __name: "ShellHeader",
  setup(e) {
    const t = ht(), n = ee(), a = f(() => n.schema.value), s = f(() => {
      const C = n.within.value.trim();
      return C ? on({ ...n.query.value, expr: C }, null) : [];
    }), o = f(() => {
      const C = n.entity.value, y = C?.keepsScope ? void 0 : C?.scope?.toLowerCase();
      return n.terms.value.filter((L) => L.facetKey !== dt).map((L, A, Me) => {
        const cn = Me[A - 1];
        return {
          term: L,
          or: cn?.group !== void 0 && L.group !== void 0 && L.group !== cn.group,
          idle: !!y && L.field?.toLowerCase() === y
        };
      });
    }), r = ro({
      source: n.source,
      schema: n.schema,
      query: n.query,
      loading: n.loading,
      // The scope's parts as well as the query's: it names a record more often
      // than a typed term does, being what a record's own page is built on.
      terms: f(() => [...s.value, ...n.terms.value])
    });
    function i(C) {
      const y = ua(a.value, C)?.scopeLabel ?? C;
      return y.charAt(0).toUpperCase() + y.slice(1);
    }
    function l(C) {
      return C.replace(/\s*\([^()]*\)\s*$/, "");
    }
    function c(C) {
      const y = r.nameOf(C);
      return y ? `${C.negated ? "-" : ""}${i(C.field)}: ${l(y)}` : C.label;
    }
    function d(C) {
      const y = c(C.term), L = C.idle ? `Not applied to ${n.entity.value?.label} — remove ${y}` : `Remove ${y}`, A = C.term.address;
      return A && A !== y ? `${L}
Written ${A} in the address and the search box` : L;
    }
    const v = R(null);
    function b(C) {
      v.value = C instanceof HTMLInputElement ? C : null;
    }
    function x() {
      n.abandonDraft(), v.value?.blur();
    }
    function g() {
      const C = E.value[k.value];
      if (w.value && C) {
        _(C);
        return;
      }
      Q.value = null, m.value = !1, n.commitDraft();
    }
    const m = R(!1), k = R(-1), E = f(() => {
      const C = n.entity.value?.facets ?? [];
      return C.length ? bo(n.draft.value, C) : [];
    }), w = f(() => m.value && E.value.length > 0);
    ae(E, () => {
      k.value = -1;
    });
    const h = `${mt() ?? "dc-header"}-completions`;
    function _(C) {
      n.draft.value = C.draft, m.value = !C.complete, k.value = -1, Fe(() => {
        const y = v.value;
        y?.focus(), y?.setSelectionRange(C.draft.length, C.draft.length);
      });
    }
    function T(C, y) {
      if (C.isComposing || !E.value.length) return;
      if (C.preventDefault(), !m.value) {
        m.value = !0;
        return;
      }
      const L = E.value.length + 1;
      k.value = (k.value + 1 + y + L) % L - 1;
    }
    function H(C) {
      return `${h}-${C}`;
    }
    const Q = R(null), B = f(() => Math.min(Q.value ?? 1 / 0, o.value.length)), W = f(() => [
      { key: "before", entries: o.value.slice(0, B.value) },
      { key: "after", entries: o.value.slice(B.value) }
    ]), te = f(() => B.value < o.value.length);
    ae(o, (C) => {
      Q.value !== null && Q.value >= C.length && (Q.value = null);
    });
    function re(C, y) {
      Q.value = C >= o.value.length ? null : Math.max(0, C), Fe(() => {
        const L = v.value;
        if (!L) return;
        const A = y === "start" ? 0 : L.value.length;
        L.setSelectionRange(A, A), L.scrollIntoView({ block: "nearest", inline: "nearest" }), me();
      });
    }
    function q(C) {
      const y = v.value;
      return !y || y.selectionStart !== y.selectionEnd ? !1 : y.selectionStart === (C === "start" ? 0 : y.value.length);
    }
    function Z(C) {
      B.value === 0 || !q("start") || (C.preventDefault(), re(C.key === "Home" ? 0 : B.value - 1, "start"));
    }
    function F(C) {
      !te.value || !q("end") || (C.preventDefault(), re(C.key === "End" ? o.value.length : B.value + 1, "end"));
    }
    function M(C) {
      B.value === 0 || !q("start") || (C.preventDefault(), Y(o.value[B.value - 1].term, !0));
    }
    function j(C) {
      !te.value || !q("end") || (C.preventDefault(), Y(o.value[B.value].term, !1));
    }
    function N(C) {
      C.isComposing || C.altKey || C.ctrlKey || C.metaKey || C.shiftKey || (C.key === "ArrowLeft" || C.key === "Home" ? Z(C) : C.key === "ArrowRight" || C.key === "End" ? F(C) : C.key === "Backspace" ? M(C) : C.key === "Delete" && j(C));
    }
    function Y(C, y) {
      y && Q.value !== null && (Q.value = Math.max(0, Q.value - 1)), n.removeTerm(C);
    }
    function ue(C) {
      C.target?.closest("button, input") || (C.preventDefault(), v.value?.focus(), re(o.value.length, "end"));
    }
    function Ae() {
      m.value = !1, n.draft.value || (Q.value = null);
    }
    const we = R(null), xe = R("");
    function me() {
      const C = we.value;
      if (!C) {
        xe.value = "";
        return;
      }
      const y = C.scrollLeft > 1, L = C.scrollWidth - C.clientWidth - C.scrollLeft > 1;
      xe.value = y && L ? "both" : y ? "start" : L ? "end" : "";
    }
    let ye = null;
    return ae(
      we,
      (C) => {
        ye?.disconnect(), ye = null, me(), !(!C || typeof ResizeObserver > "u") && (ye = new ResizeObserver(me), ye.observe(C));
      },
      { flush: "post" }
    ), ae([o, B], me, { flush: "post" }), pe(() => ye?.disconnect()), (C, y) => (u(), p("div", $o, [
      S("div", xo, [
        a.value.label && t.brand ? (u(), I(ne, {
          key: 0,
          class: "dc-header__domain",
          "data-dc-brand": "",
          title: "Home",
          href: $(n).homeHref(),
          onPress: y[0] || (y[0] = (L) => $(n).reset())
        }, {
          default: U(() => [
            S("span", So, [
              G(C.$slots, "brand", {
                label: a.value.label
              }, void 0, !0)
            ]),
            S("span", Co, P(a.value.label), 1)
          ]),
          _: 3
        }, 8, ["href"])) : a.value.label ? (u(), I(ne, {
          key: 1,
          class: "dc-header__domain",
          title: "Home",
          href: $(n).homeHref(),
          onPress: y[1] || (y[1] = (L) => $(n).reset())
        }, {
          default: U(() => [
            J(P(a.value.label), 1)
          ]),
          _: 1
        }, 8, ["href"])) : O("", !0),
        s.value.length ? (u(), p("span", Po, [
          y[10] || (y[10] = S("span", { class: "dc-header__sr" }, "Within", -1)),
          (u(!0), p(D, null, X(s.value, (L) => (u(), p("span", {
            key: `scope:${L.id}`,
            class: "dc-within dc-mono dc-truncate",
            title: c(L)
          }, P(c(L)), 9, Eo))), 128))
        ])) : O("", !0),
        S("div", Lo, [
          S("div", {
            class: "dc-header__field",
            onMousedown: ue
          }, [
            S("div", {
              ref_key: "termBar",
              ref: we,
              class: "dc-header__terms",
              "data-dc-more": xe.value,
              title: $(n).summary.value,
              onScroll: me
            }, [
              (u(!0), p(D, null, X(W.value, (L) => (u(), p(D, {
                key: L.key
              }, [
                S("span", Mo, [
                  (u(!0), p(D, null, X(L.entries, (A) => (u(), p(D, {
                    key: A.term.id
                  }, [
                    A.or ? (u(), p("span", Oo, "or")) : O("", !0),
                    S("button", {
                      type: "button",
                      class: le(["dc-term dc-mono", { "dc-term--idle": A.idle }]),
                      title: d(A),
                      "aria-label": `Remove ${c(A.term)}`,
                      onMousedown: y[2] || (y[2] = Ce(() => {
                      }, ["prevent"])),
                      onClick: (Me) => Y(A.term, L.key === "before")
                    }, P(c(A.term)), 43, No)
                  ], 64))), 128))
                ]),
                L.key === "before" ? It((u(), p("input", {
                  key: 0,
                  ref_for: !0,
                  ref: b,
                  "onUpdate:modelValue": y[3] || (y[3] = (A) => $(n).draft.value = A),
                  class: le(["dc-header__search dc-mono", { "dc-header__search--between": te.value }]),
                  style: se({ "--dc-typed": String(Math.max(1, $(n).draft.value.length)) }),
                  type: "text",
                  autocomplete: "off",
                  spellcheck: "false",
                  placeholder: te.value ? "" : "Search…",
                  "aria-label": "Search",
                  role: "combobox",
                  "aria-autocomplete": "list",
                  "aria-expanded": w.value,
                  "aria-controls": h,
                  "aria-activedescendant": w.value && k.value >= 0 ? H(k.value) : void 0,
                  onKeydown: [
                    Oe(Ce(g, ["prevent"]), ["enter"]),
                    Oe(Ce(x, ["prevent"]), ["esc"]),
                    y[4] || (y[4] = Oe((A) => T(A, 1), ["down"])),
                    y[5] || (y[5] = Oe((A) => T(A, -1), ["up"])),
                    N
                  ],
                  onFocus: y[6] || (y[6] = (A) => m.value = !0),
                  onInput: y[7] || (y[7] = (A) => m.value = !0),
                  onBlur: Ae
                }, null, 46, Ao)), [
                  [Aa, $(n).draft.value]
                ]) : O("", !0)
              ], 64))), 128))
            ], 40, To)
          ], 32)
        ])
      ]),
      z(po, {
        id: h,
        open: w.value,
        anchor: v.value,
        "min-width": 0,
        "max-height": 320,
        class: "dc-completions",
        role: "listbox",
        "aria-label": "Completions",
        onClose: y[9] || (y[9] = (L) => m.value = !1)
      }, {
        default: U(() => [
          (u(!0), p(D, null, X(E.value, (L, A) => (u(), p("div", {
            id: H(A),
            key: L.label,
            class: le(["dc-completion", { "dc-completion--active": A === k.value }]),
            role: "option",
            "aria-selected": A === k.value,
            onMousedown: y[8] || (y[8] = Ce(() => {
            }, ["prevent"])),
            onClick: (Me) => _(L)
          }, [
            S("span", Ro, P(L.label), 1),
            L.hint ? (u(), p("span", Bo, P(L.hint), 1)) : O("", !0)
          ], 42, Io))), 128))
        ]),
        _: 1
      }, 8, ["open", "anchor"]),
      t.actions ? (u(), p("div", Ho, [
        G(C.$slots, "actions", {}, void 0, !0)
      ])) : O("", !0)
    ]));
  }
}), ga = /* @__PURE__ */ K(Fo, [["__scopeId", "data-v-8f5cb8d4"]]);
function qo(e) {
  const t = _e(/* @__PURE__ */ new Map()), n = R(!0);
  let a = 0, s;
  const o = () => {
    a++, s?.abort(), s = void 0;
  }, r = () => {
    o();
    const i = a, { signal: l } = s = new AbortController(), c = e.query.value, d = e.schema.value, v = e.entities.value, b = e.within?.value.trim() ?? "";
    n.value = c.expr.trim() === "" && !b;
    const x = /* @__PURE__ */ new Map();
    let g = !0;
    for (const m of v) {
      const k = ca(m, c.expr), E = b ? Zt(b, k) : k;
      let w = !1;
      const h = (T) => {
        if (i !== a) return;
        if (g) {
          x.set(m.key, T);
          return;
        }
        const H = new Map(t.value);
        H.set(m.key, T), t.value = H;
      }, _ = e.source.value.query({
        query: { ...c, entity: m.key, expr: E, page: 1 },
        schema: d,
        entity: m,
        limit: 0,
        offset: 0,
        signal: l,
        progress: (T) => {
          w || h({ total: T, pending: !0, counted: !0 });
        }
      });
      _ instanceof Promise ? (x.has(m.key) || x.set(m.key, { total: 0, pending: !0, counted: !1 }), _.then((T) => {
        w = !0, h({ total: T.total, pending: !1, counted: !0 });
      })) : (w = !0, x.set(m.key, { total: _.total, pending: !1, counted: !0 }));
    }
    g = !1, t.value = x;
  };
  return Bn() && vt(o), { counts: t, pristine: n, refresh: r, cancel: o };
}
const Do = ["checked", "indeterminate"], _a = /* @__PURE__ */ V({
  __name: "PageTick",
  setup(e) {
    const t = ee(), n = f(() => t.rows.value.filter((o) => t.isSelected(o)).length), a = f(
      () => t.rows.value.length > 0 && n.value === t.rows.value.length
    ), s = f(() => n.value > 0 && !a.value);
    return (o, r) => (u(), p("input", {
      class: "dc-tick",
      type: "checkbox",
      checked: a.value,
      indeterminate: s.value,
      "aria-label": "Select every row on this page",
      title: "Select every row on this page",
      onChange: r[0] || (r[0] = (i) => $(t).selectPage(!a.value))
    }, null, 40, Do));
  }
}), Vo = { class: "dc-pick" }, Ko = ["id"], Wo = ["id", "aria-expanded", "aria-labelledby", "data-dc-value"], jo = { class: "dc-pick__label" }, zo = /* @__PURE__ */ V({
  __name: "PickControl",
  props: {
    modelValue: {},
    options: {},
    label: {},
    mono: { type: Boolean }
  },
  emits: ["update:modelValue", "open", "close"],
  setup(e, { emit: t }) {
    const n = e, a = t, s = mt() ?? "dc-pick", o = R(null), r = R(null), i = R(null), l = R(!1), c = f(() => i.value !== null), d = R(null), v = f(
      () => n.options.find((_) => _.key === n.modelValue) ?? n.options[0]
    ), b = f(
      () => n.options.map((_) => ({
        id: _.key,
        label: _.label,
        checked: _.key === n.modelValue
      }))
    ), x = f(
      () => i.value ? { maxHeight: `${window.innerHeight - i.value.y - 8}px` } : void 0
    );
    function g(_) {
      const T = o.value?.getBoundingClientRect();
      T && (d.value = o.value?.closest(".dc-shell") ?? document.body, i.value = { x: T.left, y: T.bottom + 4, mirrorX: T.right }, l.value = _, a("open"));
    }
    function m(_) {
      i.value && a("close"), i.value = null, _ && o.value?.focus();
    }
    function k() {
      c.value ? m(!0) : g(!1);
    }
    function E(_) {
      _.key !== "ArrowDown" && _.key !== "ArrowUp" || c.value || (_.preventDefault(), g(!0));
    }
    function w(_) {
      const T = _.target;
      T && (o.value?.contains(T) || r.value?.root?.contains(T) || m(!1));
    }
    ae(c, (_) => {
      _ ? window.addEventListener("pointerdown", w, !0) : window.removeEventListener("pointerdown", w, !0);
    }), pe(() => window.removeEventListener("pointerdown", w, !0));
    function h(_) {
      m(!0), !(_.id === void 0 || _.id === n.modelValue) && a("update:modelValue", _.id);
    }
    return (_, T) => (u(), p("span", Vo, [
      S("span", {
        id: `${$(s)}-name`,
        class: "dc-pick__name"
      }, P(e.label), 9, Ko),
      S("button", {
        id: `${$(s)}-value`,
        ref_key: "trigger",
        ref: o,
        type: "button",
        class: le(["dc-pick__button", { "dc-mono": e.mono }]),
        "aria-haspopup": "menu",
        "aria-expanded": c.value,
        "aria-labelledby": `${$(s)}-name ${$(s)}-value`,
        "data-dc-value": e.modelValue,
        onClick: k,
        onKeydown: E
      }, [
        S("span", jo, P(v.value?.label), 1)
      ], 42, Wo),
      T[1] || (T[1] = S("svg", {
        class: "dc-pick__mark",
        viewBox: "0 0 16 16",
        "aria-hidden": "true"
      }, [
        S("path", { d: "M4 6l4 4 4-4" })
      ], -1)),
      i.value && d.value ? (u(), I(pt, {
        key: 0,
        to: d.value
      }, [
        z($(Da), {
          ref_key: "menu",
          ref: r,
          class: "dc-pick__list",
          style: se(x.value),
          items: b.value,
          at: i.value,
          label: e.label,
          autofocus: l.value,
          onChoose: h,
          onDismiss: T[0] || (T[0] = (H) => m(!0))
        }, null, 8, ["style", "items", "at", "label", "autofocus"])
      ], 8, ["to"])) : O("", !0)
    ]));
  }
}), Ot = /* @__PURE__ */ K(zo, [["__scopeId", "data-v-9883dc22"]]), Uo = {
  class: "dc-pager",
  "aria-label": "Pages"
}, Qo = ["title"], Go = ["value", "onKeydown"], Yo = {
  class: "dc-pager__total",
  "aria-hidden": "true"
}, Xo = {
  class: "dc-pager__sr",
  "aria-live": "polite"
}, Jo = /* @__PURE__ */ V({
  __name: "ShellPager",
  props: {
    pagesNote: {}
  },
  setup(e) {
    const t = e, n = ee(), a = f(() => n.liveQuery.value.page), s = f(
      () => `${n.counting.value ? "~" : ""}${Ie(n.pageCount.value)}`
    ), o = f(() => {
      let x = `Page ${Ie(a.value)} of ${s.value}`;
      const g = n.rows.value.length;
      if (g) {
        const m = n.offset.value + 1, k = `${n.counting.value ? "~" : ""}${Ie(n.total.value)}`;
        x += ` — rows ${Ie(m)} to ${Ie(m + g - 1)} of ${k}`;
      }
      return t.pagesNote ? `${x}
${t.pagesNote}` : x;
    }), r = R(null), i = f(() => r.value ?? String(a.value)), l = f(
      () => `calc(${Math.max(2, String(n.pageCount.value).length)}ch + 10px)`
    );
    function c(x) {
      x.target.select();
    }
    function d(x) {
      const g = x.target, m = g.value.replace(/[^0-9]/g, "");
      g.value !== m && (g.value = m), r.value = m;
    }
    function v(x) {
      const g = x.target, m = Number(r.value);
      r.value = null;
      const k = Number.isFinite(m) && m >= 1 ? Math.min(Math.trunc(m), Math.max(1, n.pageCount.value)) : a.value;
      g.value = String(k), k !== a.value && n.setPage(k);
    }
    function b(x) {
      const g = x.target;
      r.value = null, g.value = String(a.value), g.blur();
    }
    return (x, g) => (u(), p("nav", Uo, [
      z(ne, {
        class: "dc-pager__step",
        "aria-label": "Previous page",
        href: a.value > 1 ? $(n).hrefFor({ page: a.value - 1 }) : null,
        disabled: a.value <= 1,
        onPress: g[0] || (g[0] = (m) => $(n).setPage(a.value - 1))
      }, {
        default: U(() => [...g[2] || (g[2] = [
          S("span", { "aria-hidden": "true" }, "‹", -1)
        ])]),
        _: 1
      }, 8, ["href", "disabled"]),
      S("span", {
        class: "dc-pager__page dc-mono",
        title: o.value
      }, [
        S("input", {
          class: "dc-pager__box dc-mono",
          type: "text",
          inputmode: "numeric",
          autocomplete: "off",
          "aria-label": "Page",
          style: se({ width: l.value }),
          value: i.value,
          onFocus: c,
          onInput: d,
          onKeydown: [
            Oe(Ce(v, ["prevent"]), ["enter"]),
            Oe(Ce(b, ["prevent"]), ["esc"])
          ],
          onBlur: v
        }, null, 44, Go),
        S("span", Yo, "/ " + P(s.value), 1)
      ], 8, Qo),
      S("span", Xo, P(o.value), 1),
      z(ne, {
        class: "dc-pager__step",
        "aria-label": "Next page",
        href: a.value < $(n).pageCount.value ? $(n).hrefFor({ page: a.value + 1 }) : null,
        disabled: a.value >= $(n).pageCount.value,
        onPress: g[1] || (g[1] = (m) => $(n).setPage(a.value + 1))
      }, {
        default: U(() => [...g[3] || (g[3] = [
          S("span", { "aria-hidden": "true" }, "›", -1)
        ])]),
        _: 1
      }, 8, ["href", "disabled"])
    ]));
  }
}), Zo = /* @__PURE__ */ K(Jo, [["__scopeId", "data-v-de0ab034"]]), er = {
  key: 2,
  class: "dc-actions__order"
}, tr = {
  key: 3,
  class: "dc-actions__select"
}, nr = {
  key: 0,
  class: "dc-actions__all"
}, ar = {
  class: "dc-actions__count",
  "aria-live": "polite"
}, sr = {
  key: 1,
  class: "dc-actions__count dc-actions__all",
  "aria-live": "polite"
}, or = { class: "dc-actions__ops" }, rr = ["disabled"], lr = ["data-dc-operation", "disabled", "onClick"], ir = ["disabled"], cr = "…", ur = /* @__PURE__ */ V({
  __name: "RecordActions",
  props: {
    views: {},
    typeChooser: {},
    selectionPlacement: {},
    pagesNote: {}
  },
  setup(e) {
    const t = e, n = ee(), a = f(
      () => n.hasFacets.value || !!n.liveQuery.value.expr.trim() || !!n.within.value
    ), s = qo({
      source: n.source,
      schema: n.schema,
      // What each type holds of what is on screen, the draft's results included:
      // a count of the committed query would disagree with the rows under it.
      query: n.liveQuery,
      entities: n.entities,
      within: n.within
    });
    function o(q) {
      if (q.key === n.query.value.entity && a.value) return at(n.total.value);
      if (s.pristine.value) return Ht(q);
      const F = s.counts.value.get(q.key);
      return F ? F.counted ? `${F.pending ? "~" : ""}${at(F.total)}` : cr : Ht(q);
    }
    const r = f(() => [
      { key: "", label: "Everything" },
      ...n.entities.value.map((q) => ({
        key: q.key,
        label: `${q.label} · ${o(q)}`
      }))
    ]), i = f(
      () => t.typeChooser === "always" || n.query.value.entity !== null
    );
    function l(q) {
      n.setEntity(q || null);
    }
    const c = f(
      () => (t.views ?? [...Qt]).map((q) => ({
        key: q,
        label: q === "record" ? n.recordView.value?.label ?? hn.record : hn[q]
      }))
    ), d = f(() => Gt(n.query.value.view, t.views)), v = f(() => c.value.length > 1);
    function b(q) {
      n.setView(q);
    }
    const x = f(
      () => h.value && d.value !== "table" && n.sorts.value.length > 0
    ), g = f(
      () => n.sorts.value.map((q) => ({ key: q.key, label: q.label }))
    ), m = f(() => x.value && g.value.length > 1), k = f(() => n.query.value.dir === "desc"), E = f(
      () => `Sorted by ${n.sort.value.label}, ${k.value ? "descending" : "ascending"}`
    ), w = f(() => n.entity.value), h = f(
      () => !Kn(n.query.value, t.views) && d.value !== "record"
    ), _ = f(
      () => h.value && !n.loading.value && (n.pageCount.value > 1 || !!t.pagesNote)
    ), T = f(() => n.selection.value.ids.length), H = f(
      () => h.value && n.selectable.value && (n.rows.value.length > 0 || T.value > 0)
    ), Q = f(() => d.value === "table"), B = f(
      () => i.value || v.value || x.value || _.value || h.value && (H.value || !!(w.value?.create || w.value?.duplicate || w.value?.delete || w.value?.operations?.length))
    ), W = f(() => T.value ? `${T.value} selected` : Q.value ? "" : "Select all"), te = f(() => t.selectionPlacement === "end");
    function re(q) {
      return T.value ? q.endsWith("…") ? `${q.slice(0, -1)} ${T.value}…` : `${q} ${T.value}` : q;
    }
    return (q, Z) => B.value ? (u(), p("div", {
      key: 0,
      class: le(["dc-actions", { "dc-actions--selection-end": te.value }])
    }, [
      i.value ? (u(), I(Ot, {
        key: 0,
        class: "dc-actions__pick dc-actions__type",
        label: "Type",
        "model-value": $(n).query.value.entity ?? "",
        options: r.value,
        onOpen: $(s).refresh,
        onClose: $(s).cancel,
        "onUpdate:modelValue": l
      }, null, 8, ["model-value", "options", "onOpen", "onClose"])) : O("", !0),
      v.value ? (u(), I(Ot, {
        key: 1,
        class: "dc-actions__pick dc-actions__view",
        label: "View",
        "model-value": d.value,
        options: c.value,
        "onUpdate:modelValue": b
      }, null, 8, ["model-value", "options"])) : O("", !0),
      x.value ? (u(), p("span", er, [
        m.value ? (u(), I(Ot, {
          key: 0,
          class: "dc-actions__pick dc-actions__sort",
          label: "Sort",
          "model-value": $(n).sort.value.key,
          options: g.value,
          "onUpdate:modelValue": $(n).setSort
        }, null, 8, ["model-value", "options", "onUpdate:modelValue"])) : O("", !0),
        z(ne, {
          class: "dc-actions__dir",
          "aria-label": E.value,
          title: E.value,
          href: $(n).hrefFor({ dir: k.value ? "asc" : "desc" }),
          onPress: Z[0] || (Z[0] = (F) => $(n).toggleDirection())
        }, {
          default: U(() => [
            J(P(k.value ? "↓" : "↑"), 1)
          ]),
          _: 1
        }, 8, ["aria-label", "title", "href"])
      ])) : O("", !0),
      H.value && W.value ? (u(), p("div", tr, [
        Q.value ? (u(), p("span", sr, P(W.value), 1)) : (u(), p("label", nr, [
          z(_a),
          S("span", ar, P(W.value), 1)
        ])),
        T.value ? (u(), p("button", {
          key: 2,
          type: "button",
          class: le(["dc-actions__clear", { "dc-actions__clear--op": te.value }]),
          onClick: Z[1] || (Z[1] = (F) => $(n).clearSelection())
        }, " Clear ", 2)) : O("", !0)
      ])) : O("", !0),
      S("div", or, [
        w.value?.create ? (u(), I(ne, {
          key: 0,
          class: "dc-actions__op dc-actions__new",
          href: $(n).createHref?.(w.value),
          onPress: Z[2] || (Z[2] = (F) => $(n).create(w.value))
        }, {
          default: U(() => [
            Z[5] || (Z[5] = S("span", {
              class: "dc-actions__plus",
              "aria-hidden": "true"
            }, "+", -1)),
            J(" " + P(w.value.create), 1)
          ]),
          _: 1
        }, 8, ["href"])) : O("", !0),
        w.value?.duplicate ? (u(), p("button", {
          key: 1,
          type: "button",
          class: "dc-actions__op",
          disabled: !T.value,
          onClick: Z[3] || (Z[3] = (F) => $(n).duplicate())
        }, P(re(w.value.duplicate)), 9, rr)) : O("", !0),
        (u(!0), p(D, null, X(w.value?.operations ?? [], (F) => (u(), p("button", {
          key: F.key,
          type: "button",
          class: "dc-actions__op",
          "data-dc-operation": F.key,
          disabled: !T.value && F.selection !== !1,
          onClick: (M) => $(n).operate(F.key)
        }, P(F.selection === !1 ? F.label : re(F.label)), 9, lr))), 128)),
        w.value?.delete ? (u(), p("button", {
          key: 2,
          type: "button",
          class: "dc-actions__op dc-actions__danger",
          disabled: !T.value,
          onClick: Z[4] || (Z[4] = (F) => $(n).delete())
        }, P(re(w.value.delete)), 9, ir)) : O("", !0)
      ]),
      _.value ? (u(), I(Zo, {
        key: 4,
        class: "dc-actions__pages",
        "pages-note": e.pagesNote
      }, null, 8, ["pages-note"])) : O("", !0)
    ], 2)) : O("", !0);
  }
}), Kt = /* @__PURE__ */ K(ur, [["__scopeId", "data-v-9ad7a44f"]]);
function dr(e, t) {
  if (!e) return null;
  const n = ie(e, t);
  return typeof n == "string" && n.trim() ? n : null;
}
const fr = (e) => e == null || typeof e == "string" && !e.trim();
function vr(e, t) {
  const n = de(t, "state"), a = de(t, "tint");
  return {
    identity: nt(de(t, "identity"), e),
    reference: nt(de(t, "reference"), e),
    metrics: Wn(t, "metric").map((s) => ({
      column: s,
      label: s.label ?? "",
      text: Pe(s, e)
    })),
    facts: t.filter((s) => s.cardLabel && !fr(ie(s, e))).map((s) => ({
      column: s,
      label: s.cardLabel,
      title: [s.label, s.hint].filter(Boolean).join(" — "),
      text: Pe(s, e)
    })),
    state: n ? ie(n, e) ?? null : null,
    updated: nt(de(t, "updated"), e),
    image: dr(de(t, "image"), e),
    tint: a ? ie(a, e) ?? null : null
  };
}
function wa(e, t, n, a, s = !1) {
  const o = n?.columns ?? [];
  return {
    row: e,
    key: os(e, t),
    entityLabel: e.entityLabel,
    entity: n,
    columns: o,
    ordinal: za(t),
    parts: vr(e, o),
    pinned: a,
    selected: s
  };
}
function Le() {
  const e = ee(), t = f(
    () => new Map(e.entities.value.map((n) => [n.key, n]))
  );
  return f(
    () => e.rows.value.map(
      (n, a) => wa(
        n,
        e.offset.value + a,
        t.value.get(n.entityKey) ?? null,
        e.isPinned(n),
        e.isSelected(n)
      )
    )
  );
}
const pr = ["data-dc-status", "data-dc-tone"], hr = /* @__PURE__ */ V({
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
    }, P(n.value), 9, pr));
  }
}), Xe = /* @__PURE__ */ K(hr, [["__scopeId", "data-v-686eb9b6"]]), mr = { key: 1 }, yr = /* @__PURE__ */ V({
  __name: "MetricDrill",
  props: {
    entry: {},
    column: {}
  },
  setup(e) {
    const t = e, n = ee(), a = f(() => !t.entry.entity?.scope || !t.column.drill ? null : n.entities.value.find((c) => c.key === t.column.drill) ?? null), s = f(() => t.column.label ?? ""), o = f(() => Pe(t.column, t.entry.row)), r = f(() => a.value ? n.drillHref(t.entry.row, a.value) : null);
    function i(l, c) {
      c.stopPropagation(), a.value && n.drill(t.entry.row, a.value, l);
    }
    return (l, c) => a.value ? (u(), I(ne, {
      key: 0,
      class: "dc-drill",
      href: r.value,
      title: `${s.value} of ${e.entry.parts.identity} — show the ${a.value.label.toLowerCase()}`,
      onPress: i
    }, {
      default: U(() => [
        G(l.$slots, "default", {}, () => [
          J(P(o.value), 1)
        ], !0)
      ]),
      _: 3
    }, 8, ["href", "title"])) : (u(), p("span", mr, [
      G(l.$slots, "default", {}, () => [
        J(P(o.value), 1)
      ], !0)
    ]));
  }
}), Je = /* @__PURE__ */ K(yr, [["__scopeId", "data-v-d3e7f4e0"]]), gr = ["data-dc-active", "aria-pressed", "aria-label"], _r = /* @__PURE__ */ V({
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
    return (s, o) => (u(), p("button", {
      type: "button",
      class: "dc-star",
      "data-dc-active": e.pinned ? "true" : "false",
      "aria-pressed": e.pinned,
      "aria-label": e.pinned ? `Unpin ${e.name}` : `Pin ${e.name}`,
      onClick: a
    }, P(e.pinned ? "★" : "☆"), 9, gr));
  }
}), rn = /* @__PURE__ */ K(_r, [["__scopeId", "data-v-ef63d763"]]), wr = ["src"], kr = /* @__PURE__ */ V({
  __name: "RowPicture",
  props: {
    src: {}
  },
  setup(e) {
    const t = e, n = R(!1);
    return ae(
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
    }, null, 40, wr)) : O("", !0);
  }
}), Ct = /* @__PURE__ */ K(kr, [["__scopeId", "data-v-afaab300"]]), br = ["data-dc-standing", "title", "aria-label"], $r = /* @__PURE__ */ V({
  __name: "QueryMark",
  props: {
    entry: {}
  },
  setup(e) {
    const t = e, n = ee(), a = f(() => $t(t.entry.entity, t.entry.row)), s = f(() => an(n.query.value.expr, a.value)), o = f(
      () => s.value === "in" ? `The query narrows to ${t.entry.parts.identity} — press to lift that` : `The query leaves out ${t.entry.parts.identity} — press to lift that`
    );
    function r(i) {
      i.stopPropagation(), n.setExpression(la(n.query.value.expr, a.value));
    }
    return (i, l) => s.value ? (u(), p("button", {
      key: 0,
      type: "button",
      class: "dc-standing",
      "data-dc-standing": s.value,
      title: o.value,
      "aria-label": o.value,
      onClick: r
    }, P(s.value === "in" ? "+" : "−"), 9, br)) : O("", !0);
  }
}), ln = /* @__PURE__ */ K($r, [["__scopeId", "data-v-4b8d4166"]]), xr = ["aria-label"], Sr = ["data-dc-standing", "data-dc-active", "aria-checked", "title", "aria-label", "onClick"], Cr = /* @__PURE__ */ V({
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
    function r(i, l) {
      i.stopPropagation(), a("set", l);
    }
    return (i, l) => (u(), p("span", {
      class: "dc-standing-control",
      role: "radiogroup",
      "aria-label": `Where the query stands on ${e.name}`
    }, [
      (u(!0), p(D, null, X(s.value, (c) => (u(), p("button", {
        key: c.sign,
        type: "button",
        role: "radio",
        class: "dc-standing-control__choice",
        "data-dc-standing": c.standing ?? "none",
        "data-dc-active": o(c.standing) ? "true" : "false",
        "aria-checked": o(c.standing),
        title: c.hint,
        "aria-label": c.hint,
        onClick: (d) => r(d, c.standing)
      }, P(c.sign), 9, Sr))), 128))
    ], 8, xr));
  }
}), Wt = /* @__PURE__ */ K(Cr, [["__scopeId", "data-v-5524dca6"]]), ka = /* @__PURE__ */ V({
  __name: "RowStanding",
  props: {
    entry: {}
  },
  setup(e) {
    const t = e, n = ee(), a = f(() => $t(t.entry.entity, t.entry.row)), s = f(() => an(n.query.value.expr, a.value));
    function o(r) {
      n.setExpression(Dt(n.query.value.expr, a.value, r));
    }
    return (r, i) => a.value !== null ? (u(), I(Wt, {
      key: 0,
      class: "dc-row-standing",
      standing: s.value,
      name: e.entry.parts.identity,
      onSet: o
    }, null, 8, ["standing", "name"])) : O("", !0);
  }
}), Pr = ["href", "title", "aria-label"], Er = /* @__PURE__ */ V({
  __name: "OpenMark",
  props: {
    entry: {}
  },
  setup(e) {
    const t = e, n = ee(), a = f(() => {
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
      onClick: o[0] || (o[0] = Ce(() => {
      }, ["stop"]))
    }, "↗", 8, Pr)) : O("", !0);
  }
}), Ze = /* @__PURE__ */ K(Er, [["__scopeId", "data-v-b00f390d"]]), Lr = /* @__PURE__ */ V({
  __name: "ScopeMark",
  props: {
    entry: {}
  },
  setup(e) {
    const t = e, n = ee(), a = f(
      () => n.narrowsOnPress.value ? null : t.entry.entity?.scope ?? null
    ), s = R(null);
    function o(d) {
      s.value = St(d).exclude ? "out" : "in";
    }
    function r(d) {
      o(d), window.addEventListener("keydown", o), window.addEventListener("keyup", o);
    }
    function i() {
      s.value = null, window.removeEventListener("keydown", o), window.removeEventListener("keyup", o);
    }
    pe(i);
    const l = f(() => a.value ? n.drillHref(t.entry.row, null) : null);
    function c(d, v) {
      v.stopPropagation(), n.drill(t.entry.row, null, d);
    }
    return (d, v) => a.value ? (u(), I(ne, {
      key: 0,
      class: "dc-scope",
      href: l.value,
      "data-dc-pending": s.value ?? void 0,
      title: `Narrow everything to ${a.value}: ${e.entry.row.id} — ⌥-click to leave it out`,
      "aria-label": `Narrow everything to ${e.entry.parts.identity}`,
      onPointerenter: r,
      onPointermove: o,
      onPointerleave: i,
      onPress: c
    }, {
      default: U(() => [...v[0] || (v[0] = [
        J(" → ", -1)
      ])]),
      _: 1
    }, 8, ["href", "data-dc-pending", "title", "aria-label"])) : O("", !0);
  }
}), et = /* @__PURE__ */ K(Lr, [["__scopeId", "data-v-05d2c233"]]), Tr = ["checked", "aria-label"], Te = /* @__PURE__ */ V({
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
    return (s, o) => (u(), p("input", {
      class: "dc-tick",
      type: "checkbox",
      checked: e.selected,
      "aria-label": `Select ${e.name}`,
      onClick: a
    }, null, 8, Tr));
  }
}), Mr = { class: "dc-card__top dc-mono" }, Or = { class: "dc-card__lead" }, Nr = {
  key: 2,
  class: "dc-card__entity"
}, Ar = { class: "dc-card__top-right" }, Ir = { class: "dc-card__names" }, Rr = { class: "dc-card__primary" }, Br = {
  key: 0,
  class: "dc-card__secondary dc-mono"
}, Hr = {
  key: 1,
  class: "dc-card__facts dc-mono"
}, Fr = ["title"], qr = { class: "dc-card__fact-label" }, Dr = {
  key: 0,
  class: "dc-card__metrics dc-mono"
}, Vr = {
  key: 0,
  class: "dc-card__date"
}, Kr = /* @__PURE__ */ V({
  __name: "CardsView",
  setup(e) {
    const t = ee(), n = Le(), a = f(() => t.isEverything.value), s = (r) => r.entity?.card === "picture", o = f(() => n.value.length > 0 && n.value.every(s));
    return (r, i) => (u(), p("div", {
      class: le(["dc-cards", { "dc-cards--pictures": o.value }])
    }, [
      (u(!0), p(D, null, X($(n), (l) => (u(), p("div", {
        key: l.key,
        class: le(["dc-card", { "dc-card--picture": s(l) }])
      }, [
        S("div", Mr, [
          S("span", Or, [
            $(t).selectable.value ? (u(), I(Te, {
              key: 0,
              row: l.row,
              selected: l.selected,
              name: l.parts.identity
            }, null, 8, ["row", "selected", "name"])) : O("", !0),
            s(l) ? O("", !0) : (u(), p(D, { key: 1 }, [
              J(P(l.ordinal), 1)
            ], 64)),
            a.value ? (u(), p("span", Nr, P(l.entityLabel), 1)) : O("", !0)
          ]),
          S("span", Ar, [
            l.parts.state && !s(l) ? (u(), I(Xe, {
              key: 0,
              status: l.parts.state
            }, null, 8, ["status"])) : O("", !0),
            s(l) ? (u(), I(ln, {
              key: 1,
              entry: l
            }, null, 8, ["entry"])) : (u(), I(ka, {
              key: 2,
              entry: l
            }, null, 8, ["entry"])),
            z(et, { entry: l }, null, 8, ["entry"]),
            z(Ze, { entry: l }, null, 8, ["entry"]),
            $(t).pinnable.value ? (u(), I(rn, {
              key: 3,
              row: l.row,
              name: l.parts.identity,
              pinned: l.pinned
            }, null, 8, ["row", "name", "pinned"])) : O("", !0)
          ])
        ]),
        z(ne, {
          class: "dc-card__open",
          href: $(t).pressHref(l.row),
          onPress: (c) => $(t).activate(l.row, c)
        }, {
          default: U(() => [
            l.parts.image ? (u(), I(Ct, {
              key: 0,
              class: "dc-card__image",
              src: l.parts.image
            }, null, 8, ["src"])) : O("", !0),
            S("span", Ir, [
              S("span", Rr, P(l.parts.identity), 1),
              s(l) ? O("", !0) : (u(), p("span", Br, P(l.parts.reference), 1)),
              l.parts.facts.length ? (u(), p("span", Hr, [
                (u(!0), p(D, null, X(l.parts.facts, (c) => (u(), p("span", {
                  key: c.column.key ?? c.label,
                  class: "dc-card__fact",
                  title: c.title || void 0
                }, [
                  S("span", qr, P(c.label), 1),
                  J(" " + P(c.text), 1)
                ], 8, Fr))), 128))
              ])) : O("", !0)
            ])
          ]),
          _: 2
        }, 1032, ["href", "onPress"]),
        s(l) ? O("", !0) : (u(), p("div", Dr, [
          (u(!0), p(D, null, X(l.parts.metrics.slice(0, 2), (c) => (u(), I(Je, {
            key: c.column.key ?? c.label,
            entry: l,
            column: c.column
          }, {
            default: U(() => [
              J(P(c.label) + " " + P(c.text), 1)
            ]),
            _: 2
          }, 1032, ["entry", "column"]))), 128)),
          l.parts.updated ? (u(), p("span", Vr, P(l.parts.updated), 1)) : O("", !0)
        ]))
      ], 2))), 128))
    ], 2));
  }
}), ba = /* @__PURE__ */ K(Kr, [["__scopeId", "data-v-fd252138"]]), Wr = { class: "dc-grid" }, jr = { class: "dc-tile__scrim" }, zr = { class: "dc-tile__top dc-mono" }, Ur = { class: "dc-tile__chip" }, Qr = { class: "dc-tile__caption" }, Gr = { class: "dc-tile__secondary dc-truncate" }, Yr = { class: "dc-tile__primary" }, Xr = /* @__PURE__ */ V({
  __name: "GridView",
  setup(e) {
    const t = ee(), n = Le();
    return (a, s) => (u(), p("div", Wr, [
      (u(!0), p(D, null, X($(n), (o) => (u(), p("div", {
        key: o.key,
        class: "dc-grid__cell"
      }, [
        z(ne, {
          class: "dc-tile",
          style: se({ "--dc-tile-tint": o.parts.tint ?? void 0 }),
          href: $(t).pressHref(o.row),
          onPress: (r) => $(t).activate(o.row, r)
        }, {
          default: U(() => [
            o.parts.image ? (u(), I(Ct, {
              key: 0,
              class: "dc-tile__image",
              src: o.parts.image
            }, null, 8, ["src"])) : O("", !0),
            S("span", jr, [
              S("span", zr, [
                S("span", Ur, P(o.ordinal), 1)
              ]),
              S("span", Qr, [
                S("span", Gr, P(o.parts.reference), 1),
                S("span", Yr, P(o.parts.identity), 1)
              ])
            ])
          ]),
          _: 2
        }, 1032, ["style", "href", "onPress"]),
        $(t).selectable.value ? (u(), I(Te, {
          key: 0,
          class: "dc-grid__tick",
          row: o.row,
          selected: o.selected,
          name: o.parts.identity
        }, null, 8, ["row", "selected", "name"])) : O("", !0)
      ]))), 128))
    ]));
  }
}), $a = /* @__PURE__ */ K(Xr, [["__scopeId", "data-v-89c40a9e"]]);
function Mn(e, t, n, a) {
  return (n - a * (t - 1)) / e;
}
function Nt(e, t) {
  return e > 0 ? Math.min(t, e) : t;
}
function Jr(e) {
  return e > 0 ? e : 1 / 0;
}
function Zr(e, t, n) {
  const { width: a, height: s, gap: o = 0 } = n;
  if (!e.length) return [];
  if (!(a > 0) || !(s > 0)) return [{ items: [...e], height: s, filled: !1 }];
  const r = [];
  let i = [], l = 0, c = 0;
  for (const d of e) {
    const v = t(d), b = Math.max(v.ratio, Number.EPSILON), x = v.height && v.height > 0 ? Math.max(c, v.height) : c, g = Nt(x, s), m = Mn(l + b, i.length + 1, a, o);
    if (m > g) {
      i.push(d), l += b, c = x;
      continue;
    }
    const k = Nt(c, s), E = i.length ? Mn(l, i.length, a, o) : 1 / 0;
    E <= Jr(c) && E - k < g - m ? (r.push({ items: i, height: E, filled: !0 }), i = [d], l = b, c = v.height && v.height > 0 ? v.height : 0) : (r.push({ items: [...i, d], height: m, filled: !0 }), i = [], l = 0, c = 0);
  }
  return i.length && r.push({ items: i, height: Nt(c, s), filled: !1 }), r;
}
const el = { class: "dc-images" }, tl = {
  key: 1,
  class: "dc-images__blank",
  "aria-hidden": "true"
}, nl = 240, tt = 8, al = 1, sl = /* @__PURE__ */ V({
  __name: "ImagesView",
  setup(e) {
    const t = ee(), n = Le(), a = un(/* @__PURE__ */ new Map()), s = un(/* @__PURE__ */ new Set());
    function o(g, m) {
      const k = m.target;
      k.naturalWidth > 0 && k.naturalHeight > 0 && a.set(g, { width: k.naturalWidth, height: k.naturalHeight });
    }
    function r(g) {
      const m = g.parts.image;
      return m && !s.has(m) ? m : null;
    }
    function i(g) {
      const m = r(g);
      return m ? a.get(m) : void 0;
    }
    function l(g) {
      const m = i(g);
      return m ? { ratio: m.width / m.height, height: m.height } : { ratio: al };
    }
    const c = R(null), d = R(0);
    let v = null;
    function b() {
      d.value = c.value?.clientWidth ?? 0;
    }
    Qe(() => {
      b(), !(!c.value || typeof ResizeObserver > "u") && (v = new ResizeObserver(b), v.observe(c.value));
    }), pe(() => {
      v?.disconnect(), v = null;
    });
    const x = f(() => {
      const g = Zr(n.value, l, {
        width: d.value,
        height: nl,
        gap: tt
      }), m = [];
      let k = 0;
      for (const E of g) {
        let w = 0;
        for (const h of E.items) {
          const _ = l(h).ratio * E.height, T = i(h), H = T !== void 0 && T.height < E.height;
          m.push({
            entry: h,
            style: {
              top: `${k}px`,
              left: `${w}px`,
              width: `${_}px`,
              height: `${E.height}px`
            },
            picture: H ? { width: `${T.width}px`, height: `${T.height}px` } : { width: "100%", height: "100%" }
          }), w += _ + tt;
        }
        k += E.height + tt;
      }
      return { boxes: m, height: g.length ? k - tt : 0 };
    });
    return (g, m) => (u(), p("div", el, [
      S("div", {
        ref_key: "wall",
        ref: c,
        class: "dc-images__wall",
        style: se({ height: `${x.value.height}px` })
      }, [
        (u(!0), p(D, null, X(x.value.boxes, ({ entry: k, style: E, picture: w }) => (u(), p("div", {
          key: k.key,
          class: "dc-images__cell",
          style: se(E)
        }, [
          z(ne, {
            class: "dc-images__open",
            title: k.parts.identity,
            "aria-label": k.parts.identity,
            href: $(t).pressHref(k.row),
            onPress: (h) => $(t).activate(k.row, h)
          }, {
            default: U(() => [
              r(k) ? (u(), I(Ct, {
                key: 0,
                class: "dc-images__picture",
                style: se(w),
                src: r(k),
                onLoad: (h) => o(r(k), h),
                onError: (h) => s.add(r(k))
              }, null, 8, ["style", "src", "onLoad", "onError"])) : (u(), p("span", tl, P(k.parts.identity), 1))
            ]),
            _: 2
          }, 1032, ["title", "aria-label", "href", "onPress"]),
          $(t).selectable.value ? (u(), I(Te, {
            key: 0,
            class: "dc-images__tick",
            row: k.row,
            selected: k.selected,
            name: k.parts.identity
          }, null, 8, ["row", "selected", "name"])) : O("", !0)
        ], 4))), 128))
      ], 4)
    ]));
  }
}), xa = /* @__PURE__ */ K(sl, [["__scopeId", "data-v-2d267370"]]), ol = { class: "dc-links" }, rl = { class: "dc-link__primary dc-truncate" }, ll = { class: "dc-link__secondary dc-mono dc-truncate" }, il = /* @__PURE__ */ V({
  __name: "LinksView",
  setup(e) {
    const t = ee(), n = Le();
    return (a, s) => (u(), p("div", ol, [
      (u(!0), p(D, null, X($(n), (o) => (u(), p("span", {
        key: o.key,
        class: "dc-links__item"
      }, [
        $(t).selectable.value ? (u(), I(Te, {
          key: 0,
          row: o.row,
          selected: o.selected,
          name: o.parts.identity
        }, null, 8, ["row", "selected", "name"])) : O("", !0),
        z(ne, {
          class: "dc-link",
          href: $(t).pressHref(o.row),
          onPress: (r) => $(t).activate(o.row, r)
        }, {
          default: U(() => [
            S("span", rl, P(o.parts.identity), 1),
            S("span", ll, P(o.parts.reference), 1)
          ]),
          _: 2
        }, 1032, ["href", "onPress"])
      ]))), 128))
    ]));
  }
}), Sa = /* @__PURE__ */ K(il, [["__scopeId", "data-v-de6c9a0f"]]), cl = {
  class: "dc-list",
  role: "list"
}, ul = { class: "dc-list__ordinal dc-mono" }, dl = { class: "dc-list__identity" }, fl = { class: "dc-list__primary dc-truncate" }, vl = { class: "dc-list__secondary dc-mono dc-truncate" }, pl = {
  key: 1,
  class: "dc-list__entity dc-mono"
}, hl = { class: "dc-list__metrics dc-mono" }, ml = { class: "dc-list__trailing" }, yl = /* @__PURE__ */ V({
  __name: "ListView",
  setup(e) {
    const t = ee(), n = Le(), a = f(() => t.isEverything.value);
    return (s, o) => (u(), p("div", cl, [
      (u(!0), p(D, null, X($(n), (r) => (u(), p("div", {
        key: r.key,
        class: "dc-list__row",
        role: "listitem"
      }, [
        $(t).selectable.value ? (u(), I(Te, {
          key: 0,
          class: "dc-list__tick",
          row: r.row,
          selected: r.selected,
          name: r.parts.identity
        }, null, 8, ["row", "selected", "name"])) : O("", !0),
        z(ka, {
          class: "dc-list__standing",
          entry: r
        }, null, 8, ["entry"]),
        z(ne, {
          class: "dc-list__open",
          href: $(t).pressHref(r.row),
          onPress: (i) => $(t).activate(r.row, i)
        }, {
          default: U(() => [
            S("span", ul, P(r.ordinal), 1),
            S("span", dl, [
              S("span", fl, P(r.parts.identity), 1),
              S("span", vl, P(r.parts.reference), 1)
            ])
          ]),
          _: 2
        }, 1032, ["href", "onPress"]),
        a.value ? (u(), p("span", pl, P(r.entityLabel), 1)) : O("", !0),
        S("span", hl, [
          (u(!0), p(D, null, X(r.parts.metrics.slice(0, 2), (i) => (u(), I(Je, {
            key: i.column.key ?? i.label,
            entry: r,
            column: i.column
          }, null, 8, ["entry", "column"]))), 128))
        ]),
        S("span", ml, [
          r.parts.state ? (u(), I(Xe, {
            key: 0,
            status: r.parts.state
          }, null, 8, ["status"])) : O("", !0),
          z(et, { entry: r }, null, 8, ["entry"]),
          z(Ze, { entry: r }, null, 8, ["entry"]),
          $(t).pinnable.value ? (u(), I(rn, {
            key: 1,
            row: r.row,
            name: r.parts.identity,
            pinned: r.pinned
          }, null, 8, ["row", "name", "pinned"])) : O("", !0)
        ])
      ]))), 128))
    ]));
  }
}), jt = /* @__PURE__ */ K(yl, [["__scopeId", "data-v-3d349a10"]]), gl = { class: "dc-preview" }, _l = { class: "dc-preview__pager dc-mono" }, wl = ["disabled"], kl = { "aria-live": "polite" }, bl = ["disabled"], $l = {
  key: 0,
  class: "dc-preview__card"
}, xl = ["src"], Sl = { class: "dc-preview__body" }, Cl = { class: "dc-preview__top" }, Pl = { class: "dc-preview__badges" }, El = { class: "dc-preview__entity dc-mono" }, Ll = { class: "dc-preview__marks" }, Tl = { class: "dc-preview__primary" }, Ml = { class: "dc-preview__secondary dc-mono" }, Ol = { class: "dc-preview__fields" }, Nl = { class: "dc-preview__key" }, Al = { class: "dc-preview__value dc-mono" }, Il = /* @__PURE__ */ V({
  __name: "PreviewView",
  setup(e) {
    const t = ee(), n = Le(), a = R(0);
    ae(n, (l) => {
      a.value > l.length - 1 && (a.value = Math.max(0, l.length - 1));
    });
    const s = f(() => n.value[a.value]), o = f(() => {
      const l = s.value;
      if (!l) return [];
      const c = de(l.columns, "reference"), d = de(l.columns, "updated");
      return [
        ...c ? [{ key: c.label ?? "Reference", value: l.parts.reference, column: null }] : [],
        ...l.parts.metrics.map((v) => ({
          key: v.label,
          value: v.text,
          column: v.column
        })),
        ...d ? [{ key: d.label ?? "Updated", value: l.parts.updated, column: null }] : []
      ];
    }), r = f(() => {
      if (!n.value.length) return "0 / 0";
      const l = t.total.value > n.value.length ? ` of ${t.total.value}` : "";
      return `${a.value + 1} / ${n.value.length}${l}`;
    }), i = (l) => {
      const c = n.value.length;
      c && (a.value = Math.min(c - 1, Math.max(0, a.value + l)));
    };
    return (l, c) => (u(), p("div", gl, [
      S("div", _l, [
        S("button", {
          type: "button",
          class: "dc-preview__step",
          "aria-label": "Previous result",
          disabled: a.value === 0,
          onClick: c[0] || (c[0] = (d) => i(-1))
        }, " ‹ ", 8, wl),
        S("span", kl, P(r.value), 1),
        S("button", {
          type: "button",
          class: "dc-preview__step",
          "aria-label": "Next result",
          disabled: a.value >= $(n).length - 1,
          onClick: c[1] || (c[1] = (d) => i(1))
        }, " › ", 8, bl)
      ]),
      s.value ? (u(), p("div", $l, [
        S("div", {
          class: "dc-preview__media",
          style: se({ background: s.value.parts.tint ?? void 0 }),
          "aria-hidden": "true"
        }, [
          s.value.parts.image ? (u(), p("img", {
            key: 0,
            class: "dc-preview__image",
            src: s.value.parts.image,
            alt: ""
          }, null, 8, xl)) : (u(), p(D, { key: 1 }, [
            J(" preview ")
          ], 64))
        ], 4),
        S("div", Sl, [
          S("div", Cl, [
            S("span", Pl, [
              $(t).selectable.value ? (u(), I(Te, {
                key: 0,
                row: s.value.row,
                selected: s.value.selected,
                name: s.value.parts.identity
              }, null, 8, ["row", "selected", "name"])) : O("", !0),
              s.value.parts.state ? (u(), I(Xe, {
                key: 1,
                status: s.value.parts.state
              }, null, 8, ["status"])) : O("", !0),
              S("span", El, P(s.value.entityLabel), 1)
            ]),
            S("span", Ll, [
              z(ln, { entry: s.value }, null, 8, ["entry"]),
              z(et, { entry: s.value }, null, 8, ["entry"]),
              z(Ze, { entry: s.value }, null, 8, ["entry"]),
              $(t).pinnable.value ? (u(), I(rn, {
                key: 0,
                row: s.value.row,
                name: s.value.parts.identity,
                pinned: s.value.pinned
              }, null, 8, ["row", "name", "pinned"])) : O("", !0)
            ])
          ]),
          S("div", null, [
            S("div", Tl, P(s.value.parts.identity), 1),
            S("div", Ml, P(s.value.parts.reference), 1)
          ]),
          S("dl", Ol, [
            (u(!0), p(D, null, X(o.value, (d) => (u(), p("div", {
              key: d.key,
              class: "dc-preview__field"
            }, [
              S("dt", Nl, P(d.key), 1),
              S("dd", Al, [
                d.column && s.value ? (u(), I(Je, {
                  key: 0,
                  entry: s.value,
                  column: d.column
                }, null, 8, ["entry", "column"])) : (u(), p(D, { key: 1 }, [
                  J(P(d.value), 1)
                ], 64))
              ])
            ]))), 128))
          ]),
          z(ne, {
            class: "dc-preview__open",
            href: s.value ? $(t).pressHref(s.value.row) : null,
            onPress: c[2] || (c[2] = (d) => s.value && $(t).activate(s.value.row, d))
          }, {
            default: U(() => [...c[3] || (c[3] = [
              J(" Open record → ", -1)
            ])]),
            _: 1
          }, 8, ["href"])
        ])
      ])) : O("", !0)
    ]));
  }
}), Ca = /* @__PURE__ */ K(Il, [["__scopeId", "data-v-59e0d33b"]]);
function Rl() {
  const e = ee();
  return f(() => as(e.schema.value, e.entity.value));
}
const Bl = /* @__PURE__ */ V({
  __name: "CellNarrow",
  props: {
    entry: {},
    column: {},
    narrowings: {},
    truncates: { type: Boolean }
  },
  setup(e) {
    const t = e, n = ee(), a = f(() => Pe(t.column, t.entry.row));
    function s(c, d = !1) {
      return ge({ ...c.term, ...d ? { negated: !0 } : {} });
    }
    function o(c, d = !1) {
      return ot(n.query.value.expr, s(c, d));
    }
    function r(c) {
      return n.narrowHref(o(c), n.query.value.entity);
    }
    function i(c) {
      return `Narrow to ${s(c)}
⌥-press to leave these out`;
    }
    function l(c, d, v) {
      v.stopPropagation(), n.narrow(o(c, d.exclude), n.query.value.entity);
    }
    return (c, d) => (u(), p("span", {
      class: le(["dc-cell__text", { "dc-truncate": e.truncates }])
    }, [
      (u(!0), p(D, null, X(e.narrowings, (v, b) => (u(), p(D, {
        key: s(v)
      }, [
        b > 0 ? (u(), p(D, { key: 0 }, [
          J(", ")
        ], 64)) : O("", !0),
        z(ne, {
          class: "dc-narrow",
          href: r(v),
          title: i(v),
          onPress: (x, g) => l(v, x, g)
        }, {
          default: U(() => [
            J(P(v.label ?? a.value), 1)
          ]),
          _: 2
        }, 1032, ["href", "title", "onPress"])
      ], 64))), 128))
    ], 2));
  }
}), Hl = /* @__PURE__ */ K(Bl, [["__scopeId", "data-v-4805a234"]]), Fl = /* @__PURE__ */ new Set(["ordinal", "status", "image", "component", "date"]), ql = 4;
function Pa(e) {
  return (e.field ?? e.key)?.toLowerCase();
}
function Ea(e) {
  return e.narrow === !1 || e.activate || e.click || e.drill ? !1 : !Fl.has(e.kind ?? "text") && Pa(e) !== void 0;
}
function Dl(e, t) {
  if (Number.isInteger(e)) return e;
  const n = 10 ** ql;
  return (t ? Math.ceil(e * n - 1e-6) : Math.floor(e * n + 1e-6)) / n;
}
function Vl(e, t) {
  let n = 1 / 0, a = -1 / 0;
  for (const s of t) {
    const o = ie(e, s);
    typeof o != "number" || !Number.isFinite(o) || (o < n && (n = o), o > a && (a = o));
  }
  return n <= a ? { min: n, max: a } : null;
}
function Kl(e, t, n, a = null) {
  if (!Ea(e)) return [];
  const s = Pa(e);
  if (e.flags)
    return Object.entries(e.flags).filter(([l]) => t.fields[l] === !0).map(([l, c]) => ({
      label: c,
      term: { kind: "field", field: l.toLowerCase(), comparator: ":", value: "true" }
    }));
  const o = ie(e, t), r = n?.facets.find((l) => l.key.toLowerCase() === s);
  if (typeof o == "number") {
    if (!Number.isFinite(o)) return [];
    const l = r?.kind === "range" ? { min: r.min, max: r.max } : a, c = !l || o - l.min <= l.max - o;
    return [{
      label: null,
      term: { kind: "field", field: s, comparator: c ? "<=" : ">=", value: String(Dl(o, c)) }
    }];
  }
  return r?.kind !== "chips" ? [] : (Array.isArray(o) ? o : [o]).filter(
    (l) => typeof l == "string" && l !== ""
  ).map((l) => ({
    label: Array.isArray(o) ? l : null,
    term: { kind: "field", field: s, comparator: "=", value: l }
  }));
}
const On = /* @__PURE__ */ new WeakMap();
function Wl(e, t) {
  let n = On.get(e);
  return n || On.set(e, n = /* @__PURE__ */ new Map()), n.has(t) || n.set(t, Vl(t, e)), n.get(t);
}
const jl = /* @__PURE__ */ V({
  __name: "ColumnCell",
  props: {
    column: {},
    entry: {}
  },
  setup(e) {
    const t = e, n = ee(), a = f(() => t.column.kind ?? "text"), s = f(() => ie(t.column, t.entry.row)), o = f(
      () => a.value === "ordinal" ? t.entry.ordinal : Pe(t.column, t.entry.row)
    ), r = f(() => s.value), i = f(() => t.column.activate === !0 || !!t.column.click), l = f(() => Ft(t.column)), c = f(() => jn(t.column, t.entry.row)), d = f(() => {
      if (!Ea(t.column)) return [];
      const g = typeof s.value == "number" ? Wl(n.rows.value, t.column) : null;
      return Kl(t.column, t.entry.row, t.entry.entity ?? null, g);
    });
    function v(g) {
      i.value && (g.stopPropagation(), b(St(g)));
    }
    function b(g) {
      t.column.click?.(t.entry.row, g), t.column.activate && n.activate(t.entry.row, g);
    }
    const x = f(
      () => t.column.activate && !t.column.click ? n.pressHref(t.entry.row) : null
    );
    return (g, m) => a.value === "component" && e.column.component ? (u(), I(qe(e.column.component), {
      key: 0,
      row: e.entry.row,
      entry: e.entry,
      value: s.value,
      column: e.column
    }, null, 8, ["row", "entry", "value", "column"])) : a.value === "status" ? (u(), I(Xe, {
      key: 1,
      status: r.value
    }, null, 8, ["status"])) : a.value === "image" ? (u(), I(Ct, {
      key: 2,
      class: "dc-cell__image",
      src: typeof s.value == "string" ? s.value : "",
      style: se({ maxHeight: e.column.height }),
      onClick: v
    }, null, 8, ["src", "style"])) : e.column.drill ? (u(), I(Je, {
      key: 3,
      entry: e.entry,
      column: e.column
    }, null, 8, ["entry", "column"])) : i.value ? (u(), I(ne, {
      key: 4,
      class: le(["dc-table__open", { "dc-truncate": l.value }]),
      href: x.value,
      title: c.value,
      onPress: m[0] || (m[0] = (k, E) => {
        E.stopPropagation(), b(k);
      })
    }, {
      default: U(() => [
        J(P(o.value), 1)
      ]),
      _: 1
    }, 8, ["class", "href", "title"])) : d.value.length ? (u(), I(Hl, {
      key: 5,
      entry: e.entry,
      column: e.column,
      narrowings: d.value,
      truncates: l.value
    }, null, 8, ["entry", "column", "narrowings", "truncates"])) : (u(), p("span", {
      key: 6,
      class: le(["dc-cell__text", { "dc-truncate": l.value }])
    }, P(o.value), 3));
  }
}), Nn = /* @__PURE__ */ K(jl, [["__scopeId", "data-v-0db32eb9"]]), zl = {
  key: 0,
  class: "dc-table__none"
}, Ul = { class: "dc-table__detail" }, Ql = ["data-dc-wrap", "data-dc-row-links"], Gl = {
  key: 0,
  class: "dc-table__pick",
  scope: "col"
}, Yl = {
  key: 1,
  class: "dc-table__standing",
  scope: "col"
}, Xl = ["data-dc-align", "data-dc-hide", "aria-sort", "title"], Jl = {
  key: 2,
  class: "dc-table__head"
}, Zl = ["onClick"], ei = {
  key: 0,
  class: "dc-table__pick"
}, ti = {
  key: 1,
  class: "dc-table__standing"
}, ni = ["data-dc-align", "data-dc-hide", "title"], ai = {
  key: 1,
  class: "dc-table__name"
}, si = /* @__PURE__ */ V({
  __name: "TableView",
  setup(e) {
    const t = ee(), n = Le(), a = Rl();
    function s(M, j) {
      const N = t.pressHref(M);
      if (N && ia(j)) {
        const Y = j.shiftKey ? `noopener,popup,width=${window.outerWidth},height=${window.outerHeight}` : "noopener";
        window.open(N, "_blank", Y);
        return;
      }
      t.activate(M, St(j));
    }
    const o = f(() => t.rowLinks?.value ? new Map(n.value.map((M) => [M.key, t.pressHref(M.row)])) : /* @__PURE__ */ new Map()), r = f(
      () => a.value.find((M) => M.role === "identity") ?? a.value[0]
    );
    function i(M, j, N) {
      N.stopPropagation(), t.activate(M, j);
    }
    function l(M) {
      const j = Yn(M, t.entity.value, t.schema.value), N = j ? `Shortcut: ${j}` : void 0;
      return [M.hint, N].filter(Boolean).join(`
`) || void 0;
    }
    const c = f(() => {
      const M = a.value.find((N) => N.scope);
      return M || ((t.entity.value ? !!t.entity.value.href : t.entities.value.some((N) => N.href)) ? a.value.find((N) => N.activate) : void 0);
    }), d = f(
      () => t.entity.value ? !!t.entity.value.scope : t.entities.value.some((M) => M.scope)
    ), v = (M) => $t(M.entity, M.row), b = (M) => an(t.query.value.expr, v(M));
    function x(M, j) {
      t.setExpression(Dt(t.query.value.expr, v(M), j));
    }
    const g = f(() => {
      const M = n.value.filter((N) => v(N) !== null), j = M.filter((N) => N.selected);
      return j.length ? j : M;
    }), m = f(() => g.value.some((M) => M.selected)), k = f(() => {
      const M = g.value[0];
      return M ? b(M) : null;
    }), E = f(
      () => g.value.some((M) => b(M) !== k.value)
    ), w = f(
      () => m.value ? "the ticked rows" : "every row on this page"
    );
    function h(M) {
      t.setExpression(
        g.value.reduce(
          (j, N) => Dt(j, v(N), M),
          t.query.value.expr
        )
      );
    }
    const _ = f(
      () => a.value.some((M) => M.kind === "image" || M.height !== void 0)
    );
    function T(M) {
      M && (t.query.value.sort === M ? t.toggleDirection() : t.setSort(M));
    }
    function H(M) {
      return M ? t.query.value.sort === M ? t.hrefFor({ dir: t.query.value.dir === "desc" ? "asc" : "desc" }) : t.hrefFor({ sort: M }) : null;
    }
    const Q = f(() => t.entity.value?.label ?? "The result set"), B = f(() => new Set(t.sorts.value.map((M) => M.key))), W = (M) => M.sort !== void 0 && B.value.has(M.sort), te = (M) => {
      if (W(M))
        return t.query.value.sort !== M.sort ? "none" : t.query.value.dir === "desc" ? "descending" : "ascending";
    };
    function re(M) {
      return [
        gn(M),
        M.muted ? "dc-table__muted" : "",
        M.mono ? "dc-mono" : "",
        Ft(M) ? "dc-truncate" : ""
      ].filter(Boolean).join(" ");
    }
    function q(M, j) {
      if (!(!Ft(M) || M.activate || M.click))
        return jn(M, j.row);
    }
    const Z = R(null);
    function F(M) {
      Z.value && (Z.value.scrollLeft = M.target.scrollLeft);
    }
    return (M, j) => $(a).length ? (u(), p("table", {
      key: 1,
      class: "dc-table",
      "data-dc-wrap": _.value ? "" : void 0,
      "data-dc-row-links": $(t).rowLinks?.value ? "" : void 0
    }, [
      S("thead", {
        ref_key: "head",
        ref: Z,
        "data-dc-stuck": ""
      }, [
        S("tr", null, [
          $(t).selectable.value ? (u(), p("th", Gl, [
            z(_a)
          ])) : O("", !0),
          d.value ? (u(), p("th", Yl, [
            g.value.length ? (u(), I(Wt, {
              key: 0,
              standing: k.value,
              mixed: E.value,
              name: w.value,
              onSet: h
            }, null, 8, ["standing", "mixed", "name"])) : O("", !0)
          ])) : O("", !0),
          (u(!0), p(D, null, X($(a), (N, Y) => (u(), p("th", {
            key: $(mn)(N, Y),
            scope: "col",
            class: le($(gn)(N)),
            style: se({ width: N.width }),
            "data-dc-align": $(yn)(N),
            "data-dc-hide": N.hideBelow,
            "aria-sort": te(N),
            title: l(N)
          }, [
            W(N) ? (u(), I(ne, {
              key: 0,
              class: "dc-table__sort",
              href: H(N.sort),
              onPress: (ue) => T(N.sort)
            }, {
              default: U(() => [
                J(P(N.label), 1)
              ]),
              _: 2
            }, 1032, ["href", "onPress"])) : (u(), p(D, { key: 1 }, [
              J(P(N.label), 1)
            ], 64)),
            N.header ? (u(), p("span", Jl, [
              (u(), I(qe(N.header), {
                column: N,
                entity: $(t).entity.value
              }, null, 8, ["column", "entity"]))
            ])) : O("", !0)
          ], 14, Xl))), 128))
        ])
      ], 512),
      S("tbody", {
        "data-dc-scroll": "",
        onScroll: F
      }, [
        (u(!0), p(D, null, X($(n), (N) => (u(), p("tr", {
          key: N.key,
          class: "dc-table__row",
          onClick: (Y) => s(N.row, Y)
        }, [
          $(t).selectable.value ? (u(), p("td", ei, [
            z(Te, {
              row: N.row,
              selected: N.selected,
              name: N.parts.identity
            }, null, 8, ["row", "selected", "name"])
          ])) : O("", !0),
          d.value ? (u(), p("td", ti, [
            v(N) !== null ? (u(), I(Wt, {
              key: 0,
              standing: b(N),
              name: N.parts.identity,
              onSet: (Y) => x(N, Y)
            }, null, 8, ["standing", "name", "onSet"])) : O("", !0)
          ])) : O("", !0),
          (u(!0), p(D, null, X($(a), (Y, ue) => (u(), p("td", {
            key: $(mn)(Y, ue),
            class: le(re(Y)),
            style: se({ width: Y.width }),
            "data-dc-align": $(yn)(Y),
            "data-dc-hide": Y.hideBelow,
            title: q(Y, N)
          }, [
            o.value.get(N.key) ? (u(), I(ne, {
              key: 0,
              class: "dc-table__cell-link",
              href: o.value.get(N.key),
              tabindex: Y === r.value ? void 0 : -1,
              "aria-hidden": Y === r.value ? void 0 : "true",
              "aria-label": Y === r.value ? N.parts.identity : void 0,
              onPress: (Ae, we) => i(N.row, Ae, we)
            }, null, 8, ["href", "tabindex", "aria-hidden", "aria-label", "onPress"])) : O("", !0),
            Y === c.value ? (u(), p("span", ai, [
              z(Nn, {
                column: Y,
                entry: N
              }, null, 8, ["column", "entry"]),
              z(et, { entry: N }, null, 8, ["entry"]),
              z(Ze, { entry: N }, null, 8, ["entry"])
            ])) : (u(), I(Nn, {
              key: 2,
              column: Y,
              entry: N
            }, null, 8, ["column", "entry"]))
          ], 14, ni))), 128))
        ], 8, Zl))), 128))
      ], 32)
    ], 8, Ql)) : (u(), p("p", zl, [
      j[2] || (j[2] = S("span", { class: "dc-table__headline" }, "No columns declared", -1)),
      S("span", Ul, [
        J(P(Q.value) + " has no ", 1),
        j[0] || (j[0] = S("code", null, "columns", -1)),
        j[1] || (j[1] = J(" in the schema, so there is no table to draw. ", -1))
      ])
    ]));
  }
}), La = /* @__PURE__ */ K(si, [["__scopeId", "data-v-66fa1713"]]);
function oi(e) {
  const t = _e([]), n = R(!1), a = _e(null);
  let s = 0;
  const o = (l, c, d, v, b) => ({
    entity: l,
    rows: e.limit.value > 0 ? c.rows.map((x, g) => wa(x, g, l, e.isPinned(x.id))) : [],
    total: c.total,
    count: d ? Ht(l) : at(c.total),
    pinned: ri(v, c, b)
  }), r = () => {
    const l = ++s, c = e.query.value, d = e.schema.value, v = e.entities.value, b = e.limit.value, x = e.within?.value.trim() ?? "", g = Yt(c) && !x, m = x ? Zt(x, c.expr) : c.expr, k = v.map((E) => ({
      entity: E,
      // Scope the query to this entity, keeping the expression and ordering.
      outcome: e.source.value.query({
        // Each card is the top few of its type, wherever the shell's own
        // result set has been paged to — so this asks for the first page.
        query: { ...c, entity: E.key, expr: m, page: 1 },
        schema: d,
        entity: E,
        /*
         * One row where none are shown, not none: to a source a limit of 0 is
         * no limit, which would fetch every record of every type to draw a
         * count. The one row is still read — it is what says whether the type
         * holds nothing but the record the query named.
         */
        limit: Math.max(b, 1),
        offset: 0
      })
    }));
    if (k.every(({ outcome: E }) => !(E instanceof Promise))) {
      t.value = k.map(
        ({ entity: E, outcome: w }) => o(E, w, g, d, m)
      ), a.value = null, n.value = !1;
      return;
    }
    n.value = !0, Promise.all(k.map(({ outcome: E }) => Promise.resolve(E))).then((E) => {
      l === s && (t.value = E.map(
        (w, h) => o(k[h].entity, w, g, d, m)
      ), a.value = null);
    }).catch((E) => {
      l === s && (a.value = E, t.value = []);
    }).finally(() => {
      l === s && (n.value = !1);
    });
  }, i = () => {
    try {
      r();
    } catch (l) {
      a.value = l, t.value = [], n.value = !1;
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
function ri(e, t, n) {
  const a = t.rows[0];
  if (t.total !== 1 || t.rows.length !== 1 || !a)
    return !1;
  const s = n.trim();
  if (!s)
    return !1;
  const o = ct(e, a);
  return !!o && Ye(s, o) === s;
}
const li = ["data-dc-pending", "data-dc-heads-only"], ii = {
  key: 0,
  class: "dc-types__state",
  role: "alert"
}, ci = {
  key: 1,
  class: "dc-types__state",
  "aria-live": "polite"
}, ui = {
  key: 2,
  class: "dc-types__state"
}, di = ["data-dc-empty"], fi = { class: "dc-type__name" }, vi = { class: "dc-type__count dc-mono" }, pi = { class: "dc-type__sr" }, hi = {
  key: 0,
  class: "dc-type__description"
}, mi = {
  key: 0,
  class: "dc-type__empty"
}, yi = { class: "dc-type__identity" }, gi = { class: "dc-type__primary dc-truncate" }, _i = { class: "dc-type__secondary dc-mono dc-truncate" }, wi = { class: "dc-type__trailing dc-mono" }, ki = { class: "dc-type__metric-value" }, bi = { class: "dc-type__metric-label" }, $i = {
  key: 0,
  class: "dc-type__date"
}, xi = /* @__PURE__ */ V({
  __name: "TypeCardsView",
  setup(e) {
    const t = ee(), { previews: n, pending: a, error: s } = oi({
      source: t.source,
      schema: t.schema,
      // The query as the results are read under it, so a word being typed in the
      // header narrows the cards as it narrows any list — see `liveQuery`.
      query: t.liveQuery,
      entities: t.entities,
      limit: t.previewsPerType,
      within: t.within,
      isPinned: (l) => t.isPinnedId(l)
    }), o = f(
      () => !t.isPristine.value || !!t.within.value || t.drafting.value
    ), r = f(() => t.previewsPerType.value <= 0), i = f(
      () => n.value.filter(
        (l) => !l.pinned && (l.total > 0 || !r.value && l.entity.create)
      )
    );
    return (l, c) => (u(), p("div", {
      class: "dc-types",
      "data-dc-pending": $(a) ? "true" : "false",
      "data-dc-heads-only": r.value ? "true" : "false"
    }, [
      G(l.$slots, "before", {}, void 0, !0),
      $(s) ? (u(), p("p", ii, " Could not load results: " + P($(s) instanceof Error ? $(s).message : "the data source failed."), 1)) : !i.value.length && $(a) ? (u(), p("p", ci, " Running query… ")) : i.value.length ? O("", !0) : (u(), p("p", ui, P(o.value ? "Nothing matches this query" : "Nothing here yet"), 1)),
      (u(!0), p(D, null, X(i.value, (d) => (u(), p("section", {
        key: d.entity.key,
        class: "dc-type",
        "data-dc-empty": d.total ? "false" : "true"
      }, [
        z(ne, {
          class: "dc-type__head",
          href: $(t).entityHref(d.entity.key),
          onPress: (v) => $(t).setEntity(d.entity.key)
        }, {
          default: U(() => [
            S("span", fi, P(d.entity.label), 1),
            S("span", vi, P(d.count), 1),
            c[0] || (c[0] = S("span", {
              class: "dc-type__go",
              "aria-hidden": "true"
            }, "→", -1)),
            S("span", pi, "Show only " + P(d.entity.label.toLowerCase()), 1),
            d.entity.description ? (u(), p("span", hi, P(d.entity.description), 1)) : O("", !0)
          ]),
          _: 2
        }, 1032, ["href", "onPress"]),
        d.total ? O("", !0) : (u(), p("p", mi, P(o.value ? "No matches" : "Nothing here yet"), 1)),
        (u(!0), p(D, null, X(d.rows, (v) => (u(), p("div", {
          key: v.key,
          class: "dc-type__row"
        }, [
          z(ne, {
            class: "dc-type__open",
            href: $(t).pressHref(v.row),
            onPress: (b) => $(t).activate(v.row, b)
          }, {
            default: U(() => [
              S("span", yi, [
                S("span", gi, P(v.parts.identity), 1),
                S("span", _i, P(v.parts.reference), 1)
              ])
            ]),
            _: 2
          }, 1032, ["href", "onPress"]),
          S("span", wi, [
            (u(!0), p(D, null, X(v.parts.metrics.slice(0, 1), (b) => (u(), I(Je, {
              key: b.column.key ?? b.label,
              class: "dc-type__metric",
              entry: v,
              column: b.column
            }, {
              default: U(() => [
                S("span", ki, P(b.text), 1),
                S("span", bi, P(b.label), 1)
              ]),
              _: 2
            }, 1032, ["entry", "column"]))), 128)),
            v.parts.updated ? (u(), p("span", $i, P(v.parts.updated), 1)) : O("", !0),
            z(ln, { entry: v }, null, 8, ["entry"]),
            z(et, { entry: v }, null, 8, ["entry"]),
            z(Ze, { entry: v }, null, 8, ["entry"])
          ])
        ]))), 128)),
        d.entity.create && !r.value ? (u(), I(ne, {
          key: 1,
          class: "dc-type__new",
          href: $(t).createHref?.(d.entity),
          onPress: (v) => $(t).create(d.entity)
        }, {
          default: U(() => [
            c[1] || (c[1] = S("span", {
              class: "dc-type__plus",
              "aria-hidden": "true"
            }, "+", -1)),
            J(" " + P(d.entity.create), 1)
          ]),
          _: 2
        }, 1032, ["href", "onPress"])) : O("", !0)
      ], 8, di))), 128)),
      G(l.$slots, "after", {}, void 0, !0)
    ], 8, li));
  }
}), Ta = /* @__PURE__ */ K(xi, [["__scopeId", "data-v-d73c6777"]]), Si = ["data-dc-pending", "data-dc-more"], Ci = {
  key: 0,
  class: "dc-results__state dc-results__state--loading",
  "aria-live": "polite"
}, Pi = {
  key: 3,
  class: "dc-results__state",
  role: "alert"
}, Ei = { class: "dc-results__detail" }, Li = {
  key: 4,
  class: "dc-results__state",
  "aria-live": "polite"
}, Ti = {
  key: 5,
  class: "dc-results__state"
}, Mi = { class: "dc-results__detail" }, Oi = /* @__PURE__ */ V({
  __name: "ResultsArea",
  props: {
    views: {},
    loading: { type: Boolean }
  },
  setup(e) {
    const t = e, n = ee(), a = ht(), s = {
      list: jt,
      cards: ba,
      grid: $a,
      images: xa,
      table: La,
      links: Sa,
      preview: Ca
    }, o = f(() => Kn(n.query.value, t.views)), r = f(() => Gt(n.query.value.view, t.views)), i = f(() => (r.value === "record" ? null : s[r.value]) ?? jt), l = f(() => r.value === "record" ? n.recordView.value : null), c = f(() => n.rows.value.length > 0), d = f(() => n.error.value !== null), v = R(null);
    function b(h) {
      return h.querySelector("[data-dc-scroll]") ?? h;
    }
    ae(
      // The page on screen, which is the draft's own while one is being typed.
      () => n.liveQuery.value.page,
      () => {
        v.value && (b(v.value).scrollTop = 0);
      }
    );
    const x = R(""), g = R({ x: 0, y: 0 }), m = R(0);
    function k() {
      const h = v.value;
      if (!h) {
        x.value = "";
        return;
      }
      const _ = b(h), T = {
        top: _.scrollTop > 1,
        right: _.scrollWidth - _.clientWidth - _.scrollLeft > 1,
        bottom: _.scrollHeight - _.clientHeight - _.scrollTop > 1,
        left: _.scrollLeft > 1
      };
      x.value = Object.entries(T).filter(([, H]) => H).map(([H]) => H).join(" "), g.value = {
        x: _.offsetHeight - _.clientHeight,
        y: _.offsetWidth - _.clientWidth
      }, m.value = h.querySelector("[data-dc-stuck]")?.offsetHeight ?? 0;
    }
    let E = null, w = null;
    return ae(
      v,
      (h, _) => {
        if (_?.removeEventListener("scroll", k, { capture: !0 }), E?.disconnect(), w?.disconnect(), E = null, w = null, k(), !h || (h.addEventListener("scroll", k, { passive: !0, capture: !0 }), typeof ResizeObserver > "u")) return;
        const T = new ResizeObserver(k), H = typeof MutationObserver > "u" ? null : new MutationObserver(() => {
          Q(), k();
        }), Q = () => {
          T.disconnect(), H?.disconnect();
          for (const B of /* @__PURE__ */ new Set([h, b(h)])) {
            T.observe(B);
            for (const W of B.children) T.observe(W);
            H?.observe(B, { childList: !0 });
          }
        };
        Q(), E = T, w = H;
      },
      { flush: "post" }
    ), pe(() => {
      v.value?.removeEventListener("scroll", k, { capture: !0 }), E?.disconnect(), w?.disconnect();
    }), (h, _) => (u(), p("div", {
      ref_key: "scroller",
      ref: v,
      class: "dc-results",
      "data-dc-pending": $(n).pending.value ? "true" : "false",
      "data-dc-more": x.value,
      style: se({
        "--dc-results-gutter-x": `${g.value.x}px`,
        "--dc-results-gutter-y": `${g.value.y}px`,
        "--dc-results-stuck": `${m.value}px`
      })
    }, [
      e.loading ? (u(), p("p", Ci, [..._[1] || (_[1] = [
        S("span", { class: "dc-results__detail" }, "Loading…", -1)
      ])])) : o.value ? (u(), I(Ta, { key: 1 }, Rt({ _: 2 }, [
        a["cards-before"] ? {
          name: "before",
          fn: U(() => [
            G(h.$slots, "cards-before", {}, void 0, !0)
          ]),
          key: "0"
        } : void 0,
        a["cards-after"] ? {
          name: "after",
          fn: U(() => [
            G(h.$slots, "cards-after", {}, void 0, !0)
          ]),
          key: "1"
        } : void 0
      ]), 1024)) : l.value ? (u(), I(qe(l.value.component), {
        key: 2,
        id: l.value.id
      }, null, 8, ["id"])) : d.value ? (u(), p("p", Pi, [
        _[2] || (_[2] = S("span", { class: "dc-results__headline" }, "Could not load results", -1)),
        S("span", Ei, P($(n).error.value instanceof Error ? $(n).error.value.message : "The data source failed."), 1)
      ])) : !c.value && $(n).pending.value ? (u(), p("p", Li, [..._[3] || (_[3] = [
        S("span", { class: "dc-results__detail" }, "Running query…", -1)
      ])])) : c.value ? (u(), I(qe(i.value), { key: 6 })) : (u(), p("div", Ti, [
        _[4] || (_[4] = S("span", { class: "dc-results__headline" }, "Nothing matches this query", -1)),
        S("span", Mi, P($(n).summary.value), 1),
        $(n).isPristine.value ? O("", !0) : (u(), I(ne, {
          key: 0,
          class: "dc-results__clear",
          href: $(n).clearHref(),
          onPress: _[0] || (_[0] = (T) => $(n).clearFilters())
        }, {
          default: U(() => [
            J(P($(n).isEverything.value ? "Clear filters" : "Search everything instead"), 1)
          ]),
          _: 1
        }, 8, ["href"]))
      ]))
    ], 12, Si));
  }
}), Ma = /* @__PURE__ */ K(Oi, [["__scopeId", "data-v-9cb044b3"]]), Ni = ["data-dc-theme"], Ai = {
  key: 0,
  class: "dc-shell__page"
}, Ii = /* @__PURE__ */ V({
  __name: "DataShell",
  props: /* @__PURE__ */ fn({
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
  emits: /* @__PURE__ */ fn(["activate", "create", "duplicate", "delete", "operate", "drill", "query-change", "toggle-pin"], ["update:pinned", "update:selected"]),
  setup(e, { expose: t, emit: n }) {
    const a = e, s = n, o = dn(e, "pinned"), r = dn(e, "selected"), i = ht(), l = zt(Hn, null), c = a.route || l ? null : Va(), d = a.route ?? l ?? c;
    pe(() => c?.dispose?.());
    const v = R(!!i.page);
    Ia(() => {
      v.value = !!i.page;
    });
    const b = Ka(d, {
      detached: () => v.value && a.pageQuery === "detached",
      path: () => a.listPath
    }), x = f(() => As({ seed: a.schema.key })), g = f(() => a.source ?? x.value), m = eo({
      schema: () => a.schema,
      adapter: b,
      defaults: () => a.defaults,
      navigationMode: () => a.navigationMode,
      facetNavigationMode: () => a.facetNavigationMode
    }), k = f(() => a.within?.trim() ?? ""), E = ao({
      query: m.query,
      entity: m.entity,
      schema: f(() => a.schema),
      setExpression: m.setExpression
    }), w = to({
      source: g,
      query: E.live,
      schema: f(() => a.schema),
      entity: m.entity,
      limit: f(() => a.limit),
      within: k
    });
    ae(m.query, (y) => s("query-change", y));
    const h = f(() => Vs(a.schema, [m.query.value.expr])), _ = f(
      () => h.value.flatMap((y) => {
        const L = a.schema.entities.find((A) => A.key === y.entityKey);
        return L ? [{ ...y, entity: L }] : [];
      })
    );
    function T() {
      if (i.record) return _.value;
      const y = a.recordCards;
      return y ? _.value.filter((L) => y[L.entityKey]) : [];
    }
    const H = f(() => {
      const [y, ...L] = _.value;
      if (!y || L.length || m.entity.value !== null) return null;
      const A = a.recordViews?.[y.entityKey];
      return A ? { ...A, id: y.id } : null;
    }), Q = f(() => {
      const y = a.views, L = typeof y == "function" ? y({ entity: m.entity.value, records: h.value }) : y;
      return H.value ? [...(L ?? Qt).filter((A) => A !== "record"), "record"] : L?.filter((A) => A !== "record");
    });
    ae(
      [w.pageCount, w.pending, m.query, E.drafting, () => a.loading, v],
      () => {
        if (w.pending.value || E.drafting.value || a.loading || v.value) return;
        const y = w.pageCount.value;
        m.query.value.page > y && m.setPage(y, "replace");
      },
      // Immediately, since a pasted URL is past the end before anything changes;
      // and after the render, so the correction is a navigation the mounted shell
      // makes rather than one it makes on the way up. An async source is still
      // pending here and corrects itself when its count lands.
      { immediate: !0, flush: "post" }
    );
    const B = f(() => new Set(o.value));
    function W(y) {
      const L = new Set(B.value);
      L.has(y.id) ? L.delete(y.id) : L.add(y.id), o.value = [...L], s("toggle-pin", y);
    }
    const te = f(() => {
      if (a.selectable === !0) return !0;
      const y = m.entity.value;
      return !!(y?.duplicate || y?.delete || y?.operations?.some((L) => L.selection !== !1));
    }), re = f(() => new Set(r.value));
    function q(y) {
      const L = new Set(re.value);
      L.has(y.id) ? L.delete(y.id) : L.add(y.id), r.value = [...L];
    }
    function Z(y) {
      const L = new Set(re.value);
      for (const A of w.rows.value)
        y ? L.add(A.id) : L.delete(A.id);
      r.value = [...L];
    }
    function F() {
      r.value.length && (r.value = []);
    }
    const M = f(() => ({
      ids: [...r.value],
      rows: w.rows.value.filter((y) => re.value.has(y.id)),
      entity: m.entity.value
    }));
    ae(() => m.query.value.entity, F);
    function j(y, L, A = {}) {
      const Me = Mt(a.schema, m.query.value, y, A);
      A.exclude ? m.narrow(Me, L?.key ?? m.query.value.entity) : E.release(() => m.narrow(Me, L?.key ?? null, L ? void 0 : "cards")), s("drill", y, L, A);
    }
    function N(y) {
      return a.rowPress === "narrow" && ct(a.schema, y) !== null;
    }
    function Y(y) {
      return a.schema.entities.find((A) => A.key === y.entityKey)?.href?.(y) || null;
    }
    const ue = Ks({
      ...m,
      draft: E.text,
      liveQuery: E.live,
      drafting: E.drafting,
      commitDraft: E.commit,
      abandonDraft: E.abandon,
      /*
       * A page of what is on screen: the draft's, while one is live, which are
       * held beside it rather than in the URL — see `liveQuery`.
       */
      setPage: (y, L) => {
        E.drafting.value ? E.setPage(y) : m.setPage(y, L);
      },
      schema: f(() => a.schema),
      entities: f(() => a.schema.entities),
      rows: w.rows,
      total: w.total,
      limit: f(() => a.limit),
      offset: w.offset,
      pageCount: w.pageCount,
      pending: w.pending,
      counting: w.counting,
      error: w.error,
      source: g,
      previewsPerType: f(() => a.previewsPerType),
      within: k,
      loading: f(() => a.loading),
      recordView: H,
      pinnable: f(() => a.pinnable === !0),
      isPinned: (y) => B.value.has(y.id),
      isPinnedId: (y) => B.value.has(y),
      togglePin: W,
      selectable: te,
      selection: M,
      isSelected: (y) => re.value.has(y.id),
      toggleSelect: q,
      selectPage: Z,
      clearSelection: F,
      narrowsOnPress: f(() => a.rowPress === "narrow"),
      rowLinks: f(() => a.rowLinks),
      /*
       * The one place a press is read, so every view gets the same answer without
       * knowing which of the two it is: they all call this.
       */
      activate: (y, L = {}) => {
        if (N(y)) {
          j(y, null, L);
          return;
        }
        const A = Y(y);
        if (A) {
          window.open(A, "_blank", "noopener");
          return;
        }
        s("activate", y);
      },
      pressHref: (y) => N(y) ? m.narrowHref(Mt(a.schema, m.query.value, y), null, "cards") : Y(y) ?? a.activateHref?.(y) ?? null,
      recordHref: Y,
      drillHref: (y, L) => ct(a.schema, y) ? m.narrowHref(
        Mt(a.schema, m.query.value, y),
        L?.key ?? null,
        L ? void 0 : "cards"
      ) : null,
      create: (y) => s("create", y),
      createHref: (y) => a.createHref?.(y) ?? null,
      duplicate: () => s("duplicate", M.value),
      delete: () => s("delete", M.value),
      operate: (y) => s("operate", y, M.value),
      drill: j
    });
    zs({ theme: () => a.theme, accent: () => a.accent, tokens: () => a.tokens });
    const Ae = f(() => {
      if (!(!a.accent && !a.tokens))
        return { ...a.tokens, ...a.accent ? { "--dc-accent": a.accent } : {} };
    }), we = R(null), xe = R(0);
    let me = null;
    Qe(() => {
      const y = we.value;
      y && (xe.value = y.getBoundingClientRect().width, !(typeof ResizeObserver > "u") && (me = new ResizeObserver(([L]) => {
        xe.value = L.contentRect.width;
      }), me.observe(y)));
    }), pe(() => me?.disconnect());
    const ye = f(() => a.oneStripFrom !== !1 && xe.value >= a.oneStripFrom), C = f(() => ({
      views: Q.value,
      typeChooser: a.typeChooser,
      selectionPlacement: a.selectionPlacement,
      pagesNote: a.pagesNote
    }));
    return t({
      query: m.query
    }), (y, L) => (u(), p("div", {
      ref_key: "root",
      ref: we,
      class: "dc-shell",
      "data-dc-theme": e.theme,
      style: se(Ae.value)
    }, [
      S("div", {
        class: le(["dc-shell__head", { "dc-shell__head--one-strip": ye.value }])
      }, [
        z(ga, null, Rt({ _: 2 }, [
          i.brand ? {
            name: "brand",
            fn: U((A) => [
              G(y.$slots, "brand", Et(Ra(A)), void 0, !0)
            ]),
            key: "0"
          } : void 0,
          i.actions ? {
            name: "actions",
            fn: U(() => [
              G(y.$slots, "actions", {}, void 0, !0)
            ]),
            key: "1"
          } : void 0
        ]), 1024),
        ye.value && !i.page ? (u(), I(Kt, Et(At({ key: 0 }, C.value)), null, 16)) : O("", !0)
      ], 2),
      i.page ? (u(), p("div", Ai, [
        G(y.$slots, "page", {
          query: $(ue).query.value
        }, void 0, !0)
      ])) : O("", !0),
      !ye.value && !i.page ? (u(), I(Kt, Et(At({ key: 1 }, C.value)), null, 16)) : O("", !0),
      i.page ? O("", !0) : G(y.$slots, "results", {
        rows: $(ue).rows.value,
        total: $(ue).total.value,
        offset: $(ue).offset.value,
        pageCount: $(ue).pageCount.value,
        query: $(ue).liveQuery.value,
        pending: $(ue).pending.value,
        loading: e.loading
      }, () => [
        z(Ma, {
          views: Q.value,
          loading: e.loading
        }, Rt({ _: 2 }, [
          i["cards-before"] || T().length ? {
            name: "cards-before",
            fn: U(() => [
              (u(!0), p(D, null, X(T(), (A) => (u(), p(D, {
                key: `${A.entityKey}:${A.id}`
              }, [
                i.record ? G(y.$slots, "record", {
                  id: A.id,
                  entity: A.entity
                }, void 0, !0, 0) : (u(), I(qe(e.recordCards?.[A.entityKey]), {
                  key: 1,
                  id: A.id
                }, null, 8, ["id"]))
              ], 64))), 128)),
              G(y.$slots, "cards-before", {}, void 0, !0)
            ]),
            key: "0"
          } : void 0,
          i["cards-after"] ? {
            name: "cards-after",
            fn: U(() => [
              G(y.$slots, "cards-after", {}, void 0, !0)
            ]),
            key: "1"
          } : void 0
        ]), 1032, ["views", "loading"])
      ], !0, 2)
    ], 12, Ni));
  }
}), Ri = /* @__PURE__ */ K(Ii, [["__scopeId", "data-v-af2fb824"]]), Bi = ["data-dc-muted", "data-dc-collapsed"], Hi = ["data-dc-collapsible"], Fi = ["aria-expanded", "aria-controls"], qi = { class: "dc-shell-card__sr" }, Di = {
  key: 0,
  class: "dc-shell-card__identity"
}, Vi = { class: "dc-shell-card__title dc-shell-card__name" }, Ki = {
  key: 0,
  class: "dc-shell-card__ref dc-mono"
}, Wi = {
  key: 1,
  class: "dc-shell-card__title"
}, ji = {
  key: 2,
  class: "dc-shell-card__count dc-mono"
}, zi = {
  key: 1,
  class: "dc-shell-card__aside"
}, Ui = ["data-dc-flush"], Qi = /* @__PURE__ */ V({
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
    const n = e, a = t, s = R(n.defaultCollapsed === !0), o = f(() => n.span === "all" ? { gridColumn: "1 / -1" } : void 0), r = ht();
    function i(B) {
      return l(B?.() ?? []);
    }
    function l(B) {
      return B.some((W) => W.type === Ba ? !1 : W.type === Ha ? String(W.children ?? "").trim().length > 0 : W.type === D ? l(W.children ?? []) : !0);
    }
    const c = f(
      () => !!n.title || !!n.name || d.value || i(r.head)
    ), d = f(() => i(r.aside)), v = f(() => i(r.default)), b = f(() => i(r.foot)), x = f(
      () => !!n.name && (!!n.reference || i(r.reference))
    ), g = f(() => n.collapsible === !0 && c.value), m = f(() => g.value && (n.collapsed ?? s.value));
    function k() {
      const B = !m.value;
      s.value = B, a("update:collapsed", B);
    }
    const E = mt() ?? "dc-shell-card", w = `${E}-body`, h = `${E}-foot`, _ = f(
      () => [v.value ? w : "", b.value ? h : ""].filter(Boolean).join(" ") || void 0
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
    ].join(", "), H = R(null);
    function Q(B) {
      if (!g.value) return;
      const W = B.target?.closest(T);
      W && H.value?.contains(W) || typeof window < "u" && window.getSelection()?.toString() || k();
    }
    return (B, W) => (u(), p("section", {
      class: "dc-shell-card",
      style: se(o.value),
      "data-dc-muted": e.muted ? "true" : "false",
      "data-dc-collapsed": m.value ? "true" : "false"
    }, [
      c.value ? (u(), p("header", {
        key: 0,
        ref_key: "head",
        ref: H,
        class: "dc-shell-card__head",
        "data-dc-collapsible": g.value ? "true" : "false",
        onClick: Q
      }, [
        g.value ? (u(), p("button", {
          key: 0,
          type: "button",
          class: "dc-shell-card__toggle",
          "aria-expanded": m.value ? "false" : "true",
          "aria-controls": _.value,
          onClick: k
        }, [
          W[0] || (W[0] = S("svg", {
            class: "dc-shell-card__chevron",
            viewBox: "0 0 10 10",
            "aria-hidden": "true"
          }, [
            S("path", { d: "M2 3.5 5 6.5 8 3.5" })
          ], -1)),
          S("span", qi, P(e.name || e.title || "Card"), 1)
        ], 8, Fi)) : O("", !0),
        G(B.$slots, "head", {}, () => [
          e.name ? (u(), p("div", Di, [
            S("h2", Vi, P(e.name), 1),
            x.value ? (u(), p("span", Ki, [
              G(B.$slots, "reference", {}, () => [
                J(P(e.reference), 1)
              ], !0)
            ])) : O("", !0)
          ])) : (u(), p("h2", Wi, P(e.title), 1)),
          e.count !== void 0 ? (u(), p("span", ji, P(e.count), 1)) : O("", !0)
        ], !0),
        d.value ? (u(), p("span", zi, [
          G(B.$slots, "aside", {}, void 0, !0)
        ])) : O("", !0)
      ], 8, Hi)) : O("", !0),
      v.value ? It((u(), p("div", {
        key: 1,
        id: w,
        class: "dc-shell-card__body",
        "data-dc-flush": e.flush ? "true" : "false"
      }, [
        G(B.$slots, "default", {}, void 0, !0)
      ], 8, Ui)), [
        [vn, !m.value]
      ]) : O("", !0),
      b.value ? It((u(), p("footer", {
        key: 2,
        id: h,
        class: "dc-shell-card__foot"
      }, [
        G(B.$slots, "foot", {}, void 0, !0)
      ], 512)), [
        [vn, !m.value]
      ]) : O("", !0)
    ], 12, Bi));
  }
}), Qc = /* @__PURE__ */ K(Qi, [["__scopeId", "data-v-073304c8"]]), Gi = ["aria-label"], Yi = ["aria-checked", "data-dc-active", "tabindex", "onClick", "onKeydown"], Xi = /* @__PURE__ */ V({
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
    function o(r, i) {
      const l = n.options.length;
      let c = null;
      if (r.key === "ArrowRight" || r.key === "ArrowDown" ? c = (i + 1) % l : r.key === "ArrowLeft" || r.key === "ArrowUp" ? c = (i - 1 + l) % l : r.key === "Home" ? c = 0 : r.key === "End" && (c = l - 1), c === null) return;
      r.preventDefault();
      const d = n.options[c];
      d && (a("update:modelValue", d.key), s.value[c]?.focus());
    }
    return (r, i) => (u(), p("div", {
      class: "dc-segmented",
      role: "radiogroup",
      "aria-label": e.label
    }, [
      (u(!0), p(D, null, X(e.options, (l, c) => (u(), p("button", {
        key: l.key,
        ref_for: !0,
        ref_key: "buttons",
        ref: s,
        type: "button",
        role: "radio",
        class: le(["dc-segmented__item", { "dc-segmented__item--mono": e.mono }]),
        "aria-checked": l.key === e.modelValue,
        "data-dc-active": l.key === e.modelValue ? "true" : "false",
        tabindex: l.key === e.modelValue ? 0 : -1,
        onClick: (d) => a("update:modelValue", l.key),
        onKeydown: (d) => o(d, c)
      }, P(l.label), 43, Yi))), 128))
    ], 8, Gi));
  }
}), Ji = /* @__PURE__ */ K(Xi, [["__scopeId", "data-v-63fb5482"]]), Zi = { class: "dc-fact__label" }, ec = ["title"], tc = /* @__PURE__ */ V({
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
      if (s == null || s === "") return [he];
      if (Array.isArray(s)) {
        const o = s.filter((r) => r != null && r !== "");
        return o.length ? o.map(String) : [he];
      }
      return [String(s)];
    }), a = f(() => t.wide ? { gridColumn: "1 / -1" } : void 0);
    return (s, o) => (u(), p("div", {
      class: "dc-fact",
      style: se(a.value)
    }, [
      S("dt", Zi, [
        G(s.$slots, "label", {}, () => [
          J(P(e.label), 1)
        ], !0)
      ]),
      S("dd", {
        class: "dc-fact__value dc-mono",
        title: e.title
      }, [
        G(s.$slots, "default", {}, () => [
          n.value.length === 1 ? (u(), p(D, { key: 0 }, [
            J(P(n.value[0]), 1)
          ], 64)) : (u(!0), p(D, { key: 1 }, X(n.value, (r, i) => (u(), p("span", {
            key: i,
            class: "dc-fact__line"
          }, P(r), 1))), 128))
        ], !0)
      ], 8, ec)
    ], 4));
  }
}), nc = /* @__PURE__ */ K(tc, [["__scopeId", "data-v-1f6d25e6"]]), ac = /* @__PURE__ */ V({
  __name: "ShellFacts",
  props: {
    items: { default: () => [] },
    min: { default: "200px" }
  },
  setup(e) {
    const t = e, n = f(() => ({ "--dc-facts-min": t.min }));
    return (a, s) => (u(), p("dl", {
      class: "dc-facts",
      style: se(n.value)
    }, [
      (u(!0), p(D, null, X(e.items, (o, r) => (u(), I(nc, {
        key: `${r}:${o.label}`,
        label: o.label,
        value: o.value,
        title: o.title,
        wide: o.wide
      }, null, 8, ["label", "value", "title", "wide"]))), 128)),
      G(a.$slots, "default", {}, void 0, !0)
    ], 4));
  }
}), Gc = /* @__PURE__ */ K(ac, [["__scopeId", "data-v-17455afa"]]), sc = { class: "dc-counts" }, oc = ["data-dc-tone"], rc = {
  key: 0,
  class: "dc-counts__empty"
}, lc = /* @__PURE__ */ V({
  __name: "StatusCounts",
  props: {
    counts: {},
    empty: { default: he }
  },
  setup(e) {
    const t = e, n = f(() => t.counts.filter((a) => a.count > 0));
    return (a, s) => (u(), p("span", sc, [
      (u(!0), p(D, null, X(n.value, (o) => (u(), p("span", {
        key: o.label,
        class: "dc-counts__count",
        "data-dc-tone": o.tone ?? "neutral"
      }, P(o.count) + " " + P(o.label), 9, oc))), 128)),
      n.value.length === 0 ? (u(), p("span", rc, P(e.empty), 1)) : O("", !0)
    ]));
  }
}), Yc = /* @__PURE__ */ K(lc, [["__scopeId", "data-v-5553a9e2"]]), ic = ["data-dc-copied", "title", "aria-label"], cc = {
  key: 0,
  class: "dc-copy__mark",
  viewBox: "0 0 16 16",
  "aria-hidden": "true"
}, uc = {
  key: 1,
  class: "dc-copy__mark",
  viewBox: "0 0 16 16",
  "aria-hidden": "true"
}, dc = 1500, fc = /* @__PURE__ */ V({
  __name: "CopyButton",
  props: {
    text: {},
    label: { default: "Copy to clipboard" }
  },
  emits: ["copied", "error"],
  setup(e, { emit: t }) {
    const n = e, a = t, s = R(!1);
    let o;
    async function r() {
      const i = typeof n.text == "function" ? n.text() : n.text;
      try {
        if (!navigator.clipboard) throw new Error("The clipboard is not available here");
        await navigator.clipboard.writeText(i);
      } catch (l) {
        a("error", l);
        return;
      }
      s.value = !0, clearTimeout(o), o = setTimeout(() => {
        s.value = !1;
      }, dc), a("copied", i);
    }
    return pe(() => clearTimeout(o)), (i, l) => (u(), p("button", {
      type: "button",
      class: "dc-copy",
      "data-dc-copied": s.value ? "true" : "false",
      title: s.value ? "Copied" : e.label,
      "aria-label": e.label,
      onClick: r
    }, [
      s.value ? (u(), p("svg", uc, [...l[1] || (l[1] = [
        S("path", { d: "M3 8.5l3.2 3L13 4.5" }, null, -1)
      ])])) : (u(), p("svg", cc, [...l[0] || (l[0] = [
        S("rect", {
          x: "5.5",
          y: "5.5",
          width: "8",
          height: "9",
          rx: "1.5"
        }, null, -1),
        S("path", { d: "M10.5 3.5v-1a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h1" }, null, -1)
      ])]))
    ], 8, ic));
  }
}), vc = /* @__PURE__ */ K(fc, [["__scopeId", "data-v-f4249d7f"]]), pc = ["data-dc-copy", "data-dc-wrap", "data-dc-tone"], hc = /* @__PURE__ */ V({
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
    function r() {
      return n.code ?? s.value?.textContent ?? "";
    }
    return (i, l) => (u(), p("div", {
      class: "dc-code",
      "data-dc-copy": e.copy ? "true" : "false",
      "data-dc-wrap": e.wrap ? "true" : "false",
      "data-dc-tone": e.tone
    }, [
      S("pre", {
        ref_key: "pre",
        ref: s,
        class: "dc-code__text dc-mono",
        style: se(o.value)
      }, [
        G(i.$slots, "default", {}, () => [
          J(P(e.code), 1)
        ], !0)
      ], 4),
      e.copy ? (u(), I(vc, {
        key: 0,
        class: "dc-code__copy",
        text: r,
        label: e.copyLabel,
        onCopied: l[0] || (l[0] = (c) => a("copied", c)),
        onError: l[1] || (l[1] = (c) => a("error", c))
      }, null, 8, ["label"])) : O("", !0)
    ], 8, pc));
  }
}), Xc = /* @__PURE__ */ K(hc, [["__scopeId", "data-v-67b371dd"]]), mc = 24, yc = /* @__PURE__ */ V({
  __name: "ShellLog",
  props: {
    fetchChunk: {},
    stripAnsi: { type: Boolean },
    maxHeight: { default: "460px" }
  },
  setup(e, { expose: t }) {
    const n = e, a = R(""), s = f(() => n.stripAnsi ? Xa(a.value) : a.value), o = R(null);
    let r = 0, i = null;
    function l() {
      return i ??= c().finally(() => {
        i = null;
      }), i;
    }
    async function c() {
      const { chunk: b, offset: x } = await n.fetchChunk(r);
      if (r = x, !b) return;
      const g = o.value, m = !g || g.scrollTop + g.clientHeight >= g.scrollHeight - mc;
      a.value += b, m && (await Fe(), o.value && (o.value.scrollTop = o.value.scrollHeight));
    }
    function d() {
      a.value = "", r = 0;
    }
    const v = f(() => n.maxHeight === void 0 ? void 0 : { maxHeight: typeof n.maxHeight == "number" ? `${n.maxHeight}px` : n.maxHeight });
    return t({ poll: l, reset: d }), (b, x) => (u(), p("pre", {
      ref_key: "pane",
      ref: o,
      class: "dc-log dc-mono",
      style: se(v.value)
    }, P(s.value), 5));
  }
}), Jc = /* @__PURE__ */ K(yc, [["__scopeId", "data-v-2c86947e"]]), gc = ["data-dc-theme"], _c = ["aria-labelledby", "aria-label"], wc = {
  key: 1,
  class: "dc-dialog__actions"
}, Re = [], kc = /* @__PURE__ */ V({
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
    const n = e, a = t, { theme: s, style: o, adopt: r } = sn(n), i = `${mt() ?? "dc-dialog"}-title`, l = R(null);
    function c() {
      a("close"), a("update:open", !1);
    }
    const d = Symbol("dc-dialog");
    function v(h) {
      h.key !== "Escape" || h.defaultPrevented || Re[Re.length - 1] === d && (h.preventDefault(), c());
    }
    let b = !1;
    function x(h) {
      b = h.target === h.currentTarget;
    }
    function g(h) {
      h.target === h.currentTarget && b && c(), b = !1;
    }
    const m = [
      "[autofocus]",
      'input:not([disabled]):not([type="hidden"])',
      "select:not([disabled])",
      "textarea:not([disabled])",
      "button:not([disabled])",
      "a[href]",
      '[tabindex]:not([tabindex="-1"])'
    ].join(", ");
    let k = null;
    async function E() {
      Re.push(d), document.addEventListener("keydown", v), k = document.activeElement instanceof HTMLElement ? document.activeElement : null, r(), await Fe(), (l.value?.querySelector("[autofocus]") ?? l.value?.querySelector(m) ?? l.value)?.focus();
    }
    function w() {
      const h = Re.indexOf(d);
      h !== -1 && (Re.splice(h, 1), document.removeEventListener("keydown", v), k?.isConnected && k.focus(), k = null);
    }
    return Qe(() => {
      n.open && E();
    }), ae(
      () => n.open,
      (h) => {
        h ? E() : w();
      }
    ), pe(w), (h, _) => e.open ? (u(), I(pt, {
      key: 0,
      to: e.to
    }, [
      S("div", {
        class: "dc-shell dc-layer dc-dialog",
        "data-dc-theme": $(s),
        style: se($(o)),
        onPointerdown: x,
        onClick: g
      }, [
        S("div", {
          ref_key: "panel",
          ref: l,
          class: le(["dc-dialog__panel", e.panelClass]),
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
          }, P(e.title), 1)) : O("", !0),
          S("div", {
            class: le(["dc-dialog__body", e.bodyClass])
          }, [
            G(h.$slots, "default", {}, void 0, !0)
          ], 2),
          h.$slots.actions ? (u(), p("div", wc, [
            G(h.$slots, "actions", {}, void 0, !0)
          ])) : O("", !0)
        ], 10, _c)
      ], 44, gc)
    ], 8, ["to"])) : O("", !0);
  }
}), Zc = /* @__PURE__ */ K(kc, [["__scopeId", "data-v-0cccf313"]]), bc = 4500, $c = 9e3, Ue = R([]);
let An = 0;
function Oa(e) {
  Ue.value = Ue.value.filter((t) => t.id !== e);
}
function Na(e, t = "ok") {
  An += 1;
  const n = An;
  Ue.value = [...Ue.value, { id: n, message: e, kind: t }], setTimeout(() => Oa(n), t === "err" ? $c : bc);
}
function xc(e) {
  Na(e instanceof Error ? e.message : String(e), "err");
}
function Sc() {
  return { toasts: Fa(Ue), toast: Na, toastError: xc, dismiss: Oa };
}
const Cc = ["data-dc-theme"], Pc = ["data-dc-kind", "role"], Ec = /* @__PURE__ */ V({
  __name: "ShellToasts",
  props: {
    to: { default: "body" },
    theme: { default: void 0 },
    accent: { default: void 0 },
    tokens: { default: void 0 }
  },
  setup(e) {
    const t = e, { toasts: n } = Sc(), { theme: a, style: s, adopt: o } = sn(t);
    return Qe(o), (r, i) => (u(), I(pt, { to: e.to }, [
      S("div", {
        class: "dc-shell dc-layer dc-toasts",
        "data-dc-theme": $(a),
        style: se($(s)),
        "aria-live": "polite"
      }, [
        (u(!0), p(D, null, X($(n), (l) => (u(), p("div", {
          key: l.id,
          class: "dc-toast",
          "data-dc-kind": l.kind,
          role: l.kind === "err" ? "alert" : void 0
        }, P(l.message), 9, Pc))), 128))
      ], 12, Cc)
    ], 8, ["to"]));
  }
}), eu = /* @__PURE__ */ K(Ec, [["__scopeId", "data-v-d970211c"]]);
function tu(e, t) {
  const n = R(!1);
  let a = null, s = !1, o = 0;
  const r = () => {
    o++, n.value = !1, a !== null && (clearTimeout(a), a = null);
  };
  function i(d) {
    a = setTimeout(() => void l(d), t);
  }
  async function l(d) {
    if (s || d !== o) return;
    let v;
    try {
      v = await e();
    } catch {
      v = !1;
    }
    s || d !== o || (v ? i(d) : r());
  }
  const c = () => {
    n.value || (n.value = !0, l(++o));
  };
  return vt(() => {
    s = !0, r();
  }, !0), { start: c, stop: r, polling: n };
}
function nu(e, t = {}) {
  const n = t.key ?? ((o) => JSON.stringify(o)), a = _e();
  let s = null;
  return qa(() => {
    const o = e(), r = n(o);
    r !== s && (s = r, a.value = o);
  }), a;
}
function au(e = {}) {
  return { key: "ordinal", kind: "ordinal", label: "#", width: "52px", ...e };
}
function su(e = {}) {
  return { key: "status", role: "state", kind: "status", label: "State", sort: "state", width: "104px", ...e };
}
function ou(e = {}) {
  return { key: "tint", role: "tint", ...e };
}
function ru(e = {}) {
  return { key: "picture", role: "image", kind: "image", width: "56px", height: "40px", ...e };
}
function lu(e, t = {}) {
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
function iu(e, t = {}) {
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
function cu(e, t, n = {}) {
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
function uu(e, t, n = {}) {
  return { key: e, kind: "date", label: t, sort: e, width: "104px", mono: !0, muted: !0, ...n };
}
function du(e = {}) {
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
function fu(e, t, n = {}) {
  return { key: e, label: t, sort: e, truncate: !0, hideBelow: 900, ...n };
}
function vu(e, t, n, a = {}) {
  return {
    key: e,
    label: t,
    value: (s) => Object.entries(n).filter(([o]) => s.fields[o] === !0).map(([, o]) => o),
    flags: n,
    sort: e,
    muted: !0,
    truncate: !0,
    hideBelow: 1100,
    ...a
  };
}
function Pt(e) {
  return typeof e == "number" ? e : typeof e == "string" && e.trim() !== "" ? Number(e) : Number.NaN;
}
function pu(e) {
  const t = Pt(e);
  return Number.isFinite(t) && t > 0 ? Ua(t) : he;
}
function hu(e) {
  const t = Pt(e);
  return Number.isFinite(t) && t > 0 ? Qa(t) : he;
}
function mu(e) {
  const t = Pt(e);
  return Number.isFinite(t) && t > 0 ? Ga(t) : he;
}
function yu(e) {
  const t = Pt(e);
  return Number.isFinite(t) ? Ya(t) : he;
}
function Lc(e) {
  if (e <= 0) return 0;
  const t = 10 ** Math.floor(Math.log10(e));
  for (const n of [1, 2, 5])
    if (e <= n * t) return n * t;
  return 10 * t;
}
function Tc(e, t) {
  const n = /* @__PURE__ */ new Set();
  for (const a of e) {
    const s = a.fields[t];
    for (const o of Array.isArray(s) ? s : [s])
      typeof o == "string" && o && n.add(o);
  }
  return [...n].sort((a, s) => a.localeCompare(s));
}
function Mc(e, t) {
  let n = 0;
  for (const a of e) {
    const s = a.fields[t];
    typeof s == "number" && s > n && (n = s);
  }
  return n;
}
function gu(e, t, n, a = {}) {
  return {
    kind: "chips",
    key: t,
    label: n,
    options: Tc(e, t),
    ...a.multiple ? { multiple: !0 } : {}
  };
}
function _u(e, t, n) {
  return { kind: "range", key: t, label: n, min: 0, max: Lc(Mc(e, t)) };
}
function wu(e, t, n) {
  return { kind: "toggle", key: e, label: t, text: n };
}
function ku(e) {
  return e.filter((t) => t.kind === "chips" ? t.options.length > 1 : t.kind === "range" ? t.max > 0 : !0);
}
function bu(e = "", t = "/") {
  const n = R(ce(e)), a = R(t), s = [`${a.value}${n.value}`];
  return {
    search: n,
    path: a,
    history: s,
    href(o, r) {
      return `${r ?? a.value}${ce(o)}`;
    },
    push(o, r) {
      r !== void 0 && (a.value = r), n.value = ce(o), s.push(`${a.value}${n.value}`);
    },
    replace(o, r) {
      r !== void 0 && (a.value = r), n.value = ce(o), s[s.length - 1] = `${a.value}${n.value}`;
    }
  };
}
function In(e) {
  const t = e.indexOf("?");
  if (t === -1) return "";
  const n = e.slice(t), a = n.indexOf("#");
  return ce(a === -1 ? n : n.slice(0, a));
}
function $u(e) {
  const t = R(In(e.currentRoute.value.fullPath)), n = f(() => e.currentRoute.value.path), a = ae(
    () => e.currentRoute.value.fullPath,
    (s) => {
      t.value = In(s);
    }
  );
  return {
    search: t,
    path: n,
    push: (s, o) => e.push(`${o ?? n.value}${ce(s)}`),
    replace: (s, o) => e.replace(`${o ?? n.value}${ce(s)}`),
    href: (s, o) => {
      const r = `${o ?? n.value}${ce(s)}`;
      return e.resolve?.(r).href ?? r;
    },
    dispose: a
  };
}
function xu(e, t, n = "/") {
  return (a) => {
    const s = a.params[t], o = Array.isArray(s) ? s.join("/") : s ?? "", r = a.query[Ee], i = typeof r == "string" ? r : "", l = `${e}="${o.replace(/"/g, "")}"`;
    return { path: n, query: { ...a.query, [Ee]: Ye(i, l) } };
  };
}
function Su(e, t = "/") {
  return (n) => ({ path: t, query: { ...n.query, [Ne]: e } });
}
function Cu(e) {
  const t = /* @__PURE__ */ new Map();
  for (const n of e) {
    const a = t.get(n.entityKey);
    a ? a.push(n) : t.set(n.entityKey, [n]);
  }
  return {
    query(n) {
      return ea(n, (a) => t.get(a.key) ?? [], {
        undatedLast: !0,
        zeroIsAll: !0
      });
    }
  };
}
function Pu(e, t) {
  return e.query({ ...t, limit: Number.MAX_SAFE_INTEGER, offset: 0 }).rows;
}
const Oc = {
  DataShell: Ri,
  ShellHeader: ga,
  RecordActions: Kt,
  ResultsArea: Ma,
  SegmentedControl: Ji,
  StatusPill: Xe,
  ListView: jt,
  CardsView: ba,
  GridView: $a,
  ImagesView: xa,
  TableView: La,
  LinksView: Sa,
  PreviewView: Ca,
  TypeCardsView: Ta
}, Eu = {
  install(e, t = {}) {
    const n = t.prefix ?? "";
    for (const [a, s] of Object.entries(Oc))
      e.component(`${n}${a}`, s);
    t.route && e.provide(Hn, t.route), (t.theme || t.accent || t.tokens) && js({ theme: t.theme, accent: t.accent, tokens: t.tokens }, e);
  }
};
export {
  Bc as COLUMN_BREAKPOINTS,
  Rc as COLUMN_ROLES,
  ba as CardsView,
  Nn as ColumnCell,
  vc as CopyButton,
  Ja as DEFAULT_ENTITY_VIEW,
  Bt as DEFAULT_SORT,
  Fn as DEFAULT_VIEW,
  no as DRAFT_DELAY,
  Ri as DataShell,
  he as EMPTY_CELL,
  na as ENTITY_ALL,
  dt as ENTITY_TERM,
  ze as EXPRESSION_TERM,
  $a as GridView,
  Eu as HeaderContentLayoutPlugin,
  xa as ImagesView,
  Sa as LinksView,
  jt as ListView,
  rt as MOCK_TINTS,
  Je as MetricDrill,
  Ze as OpenMark,
  tn as PARAM_DIR,
  Ne as PARAM_ENTITY,
  Ee as PARAM_EXPR,
  kt as PARAM_PAGE,
  en as PARAM_SORT,
  wt as PARAM_VIEW,
  Ic as PILL_TONES,
  co as POPOVER_FLIP_BELOW,
  lo as POPOVER_GAP,
  io as POPOVER_MARGIN,
  rn as PinStar,
  Ca as PreviewView,
  ln as QueryMark,
  Be as RECORD_STATUSES,
  Xt as RESULT_FIELDS,
  Hn as ROUTE_ADAPTER_KEY,
  Kt as RecordActions,
  Ma as ResultsArea,
  fa as SHELL_CONTEXT_KEY,
  ut as SHELL_THEME_KEY,
  et as ScopeMark,
  Ji as SegmentedControl,
  Te as SelectTick,
  Qc as ShellCard,
  Xc as ShellCode,
  Zc as ShellDialog,
  nc as ShellFact,
  Gc as ShellFacts,
  ga as ShellHeader,
  Jc as ShellLog,
  Zo as ShellPager,
  po as ShellPopover,
  eu as ShellToasts,
  Wt as StandingControl,
  Yc as StatusCounts,
  Xe as StatusPill,
  $c as TOAST_ERROR_MS,
  bc as TOAST_MS,
  La as TableView,
  Ta as TypeCardsView,
  Qt as VIEW_KINDS,
  hn as VIEW_LABELS,
  Ye as addTerm,
  Zt as andExpression,
  pu as bytesCell,
  jn as cellFull,
  Kl as cellNarrowings,
  Pe as cellText,
  nt as cellTextOf,
  ie as cellValue,
  Lt as changesResults,
  gu as chipsFrom,
  yn as columnAlign,
  gn as columnClass,
  mn as columnKey,
  Ea as columnNarrows,
  Ge as columnShortcut,
  Yn as columnShortcutOf,
  Ft as columnTruncates,
  as as columnsFor,
  Un as compactShortcuts,
  bo as completeDraft,
  ns as countPages,
  Va as createHistoryAdapter,
  bu as createMemoryAdapter,
  Cu as createMemoryDataSource,
  As as createMockDataSource,
  $u as createVueRouterAdapter,
  uu as dateColumn,
  rs as defaultCellText,
  st as defaultQuery,
  De as defaultViewFor,
  Ka as detachableAdapter,
  Mt as drillExpression,
  hu as durationCell,
  mu as elapsedCell,
  es as emptyFacetValue,
  Hs as entityAddress,
  du as entityColumn,
  Ht as entityCount,
  Su as entityRedirect,
  ra as excludingTerm,
  We as expandShortcuts,
  fu as facetColumn,
  je as facetField,
  ha as facetValue,
  hs as fieldHeading,
  oa as fieldTerm,
  Ve as findEntity,
  aa as findEntityByAddress,
  be as findSort,
  vu as flagColumn,
  He as fnv1a,
  Dn as focusEntity,
  Ua as formatBytes,
  at as formatCount,
  ja as formatDate,
  Hc as formatDateTime,
  Qa as formatDuration,
  Ga as formatElapsed,
  ve as formatExpression,
  Ie as formatInteger,
  Wa as formatMetric,
  za as formatOrdinal,
  Ya as formatPercent,
  ds as formatRange,
  ge as formatTerm,
  Ns as generateRows,
  Ys as hasActiveFacets,
  lu as identityColumn,
  jc as idsExpression,
  Fc as isEntityScoped,
  ts as isFacetActive,
  Yt as isPristineQuery,
  Ke as isRangeTerm,
  Kn as isTypeCardsQuery,
  qn as isViewKind,
  Dc as joinExpression,
  la as liftTerm,
  _s as matchesExpression,
  cu as metricColumn,
  zc as narrowPatch,
  ws as negateTerm,
  Lc as niceMax,
  ce as normalizeSearch,
  Vl as numberRange,
  bs as oppositeTerm,
  au as ordinalColumn,
  oe as parseExpression,
  Ds as parseQuery,
  yu as percentCell,
  ru as pictureColumn,
  uo as placePopover,
  vr as presentParts,
  wa as presentRow,
  St as pressOptions,
  Ks as provideShellContext,
  js as provideShellTheme,
  Pu as queryAll,
  _u as rangeFrom,
  gt as rangeOf,
  Ss as readDraft,
  Wc as readExpression,
  xu as recordRedirect,
  sa as recordTerm,
  Vs as recordsIn,
  iu as referenceColumn,
  ot as refineExpression,
  Gt as resolveView,
  de as roleColumn,
  Wn as roleColumns,
  os as rowKey,
  qt as sameTerm,
  $t as scopeTerm,
  ct as scopeTermFor,
  ua as scopedEntity,
  Kc as searchFromQuery,
  En as serializeQuery,
  Fs as sortAddress,
  yt as sortsFor,
  qc as splitExpression,
  su as stateColumn,
  Xa as stripAnsi,
  Zs as summarizeQuery,
  on as summaryTerms,
  an as termStanding,
  ou as tintColumn,
  Vc as tintFor,
  wu as toggleFacet,
  Rl as useColumns,
  ao as useDraft,
  qo as useEntityCounts,
  oi as useEntityPreviews,
  sn as useLayerTheme,
  tu as usePoll,
  Le as usePresentedRows,
  eo as useQueryState,
  ro as useRecordNames,
  to as useResults,
  ee as useShellContext,
  nu as useStableSchema,
  Sc as useToasts,
  ku as usefulFacets,
  pn as viewAcross,
  ma as withFacetValue,
  Dt as withStanding,
  Uc as withoutFacet,
  ca as withoutOwnScope,
  ks as withoutTerm
};
