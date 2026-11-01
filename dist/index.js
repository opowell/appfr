import { ref as N, computed as f, inject as Nt, provide as It, getCurrentInstance as bn, shallowRef as he, toValue as we, watch as se, onScopeDispose as nt, getCurrentScope as $n, defineComponent as q, openBlock as u, createElementBlock as h, renderSlot as Q, useSlots as at, onBeforeUnmount as me, createElementVNode as S, createBlock as A, unref as $, withCtx as G, toDisplayString as P, createTextVNode as J, createCommentVNode as M, Fragment as W, renderList as X, withModifiers as Se, normalizeClass as ue, withDirectives as $t, withKeys as ze, normalizeStyle as oe, vModelText as wa, nextTick as st, useId as Rt, Teleport as ot, createVNode as U, reactive as Jt, onMounted as lt, resolveDynamicComponent as Oe, createSlots as xt, useModel as Zt, onBeforeUpdate as ka, normalizeProps as ba, guardReactiveProps as $a, mergeModels as en, vShow as tn, Comment as xa, Text as Sa, readonly as Ca, mergeProps as Pa, watchEffect as Ea } from "vue";
import { MenuList as La } from "menu-bar";
const Bt = ["list", "cards", "grid", "images", "table", "links", "preview"], Te = ["ok", "running", "queued", "review", "failed"], lc = [...Te, "neutral", "accent"], rc = [
  "identity",
  "reference",
  "metric",
  "state",
  "updated",
  "image",
  "tint"
], ic = [480, 620, 760, 900, 1100], xn = Symbol("dc.routeAdapter");
function ie(e) {
  if (!e) return "";
  const t = e.replace(/^[?]/, "");
  return t ? `?${t}` : "";
}
function Ta() {
  const e = typeof window < "u", t = N(e ? ie(window.location.search) : ""), n = N(e ? window.location.pathname : "/"), a = () => {
    t.value = ie(window.location.search), n.value = window.location.pathname;
  };
  e && window.addEventListener("popstate", a);
  const s = (o, l, i) => {
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
    push: (o, l) => s(o, "push", l),
    replace: (o, l) => s(o, "replace", l),
    dispose: () => {
      e && window.removeEventListener("popstate", a);
    }
  };
}
function Ma(e, t) {
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
      return e.href ? e.href(o, i) : `${i ?? e.path.value}${ie(o)}`;
    }
  };
}
function Me(e) {
  let t = 2166136261;
  for (let n = 0; n < e.length; n++)
    t ^= e.charCodeAt(n), t = Math.imul(t, 16777619);
  return Math.abs(t);
}
function Oa(e) {
  if (!Number.isFinite(e)) return "—";
  const t = Math.abs(e);
  return t >= 1e6 ? `${(e / 1e6).toFixed(1)}m` : t >= 1e3 ? `${(e / 1e3).toFixed(1)}k` : String(Math.round(e));
}
function Qe(e) {
  if (!Number.isFinite(e)) return "—";
  const t = Math.round(e), n = Math.abs(t);
  return n < 1e3 ? String(t) : n < 9950 ? `${(t / 1e3).toFixed(1)}k` : n < 999500 ? `${Math.round(t / 1e3)}k` : `${(t / 1e6).toFixed(1)}m`;
}
function Ee(e) {
  return Number.isFinite(e) ? Math.round(e).toLocaleString("en-US") : "—";
}
function Aa(e) {
  const t = new Date(e);
  if (Number.isNaN(t.getTime())) return "—";
  const n = String(t.getUTCDate()).padStart(2, "0"), a = String(t.getUTCMonth() + 1).padStart(2, "0");
  return `${n}.${a}.${t.getUTCFullYear()}`;
}
function Na(e) {
  return String(e + 1);
}
function cc(e, t) {
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
function Ia(e) {
  if (e == null || !Number.isFinite(e) || e < 0) return "—";
  if (e < 1e3) return `${e} B`;
  const t = ["kB", "MB", "GB", "TB"];
  let n = e, a = -1;
  for (; n >= 1e3 && a < t.length - 1; )
    n /= 1e3, a += 1;
  return `${n < 100 ? n.toFixed(1) : Math.round(n)} ${t[a]}`;
}
function Ra(e) {
  if (!e || !Number.isFinite(e)) return "—";
  if (e < 1e3) return `${Math.round(e)}ms`;
  const t = e / 1e3;
  return t < 60 ? `${t.toFixed(1)}s` : `${Math.floor(t / 60)}m ${Math.round(t % 60)}s`;
}
function Ba(e) {
  if (e == null || !Number.isFinite(e) || e <= 0)
    return "—";
  const t = Math.floor(e / 60);
  return t ? `${t}:${String(e % 60).padStart(2, "0")}` : `${e}s`;
}
function Ha(e) {
  return e == null || !Number.isFinite(e) ? "—" : `${Math.round(e * 100)}%`;
}
function Fa(e) {
  return e.replace(/\x1b\[[0-9;?]*[ -/]*[@-~]/g, "");
}
const Sn = "cards", qa = "table";
function Ae(e, t = {}) {
  const n = (s) => s && Cn(s) ? s : void 0;
  if (e === null) return n(t.view) ?? Sn;
  const a = t.landing === "entity" ? n(t.view) : void 0;
  return n(t.entityView) ?? a ?? qa;
}
function nn(e, t, n, a = {}) {
  return e === Ae(t, a) ? Ae(n, a) : e;
}
const St = "updated";
function Cn(e) {
  return typeof e == "string" && (e === "record" || Bt.includes(e));
}
const an = {
  list: "List",
  cards: "Cards",
  grid: "Grid",
  images: "Images",
  table: "Table",
  links: "Links",
  preview: "Preview",
  record: "Record"
};
function Ht(e, t) {
  if (e === "record" && !t?.includes(e)) return t?.[0] ?? Sn;
  const [n] = t ?? [];
  return n === void 0 || t?.includes(e) ? e : n;
}
function Ct(e) {
  return typeof e.count == "number" ? Qe(e.count) : e.count;
}
function Ne(e, t) {
  return t ? e.entities.find((n) => n.key === t) ?? null : null;
}
function Pn(e, t = {}) {
  const n = Ne(e, t.entity), a = e.entities[0];
  if (!n && !a) throw new Error(`Schema "${e.key}" declares no entities`);
  return n ?? a;
}
function En(e, t = null) {
  return e?.columns ?? t?.columns ?? [];
}
function rt(e, t = null) {
  if (e?.sorts?.length) return e.sorts;
  const n = /* @__PURE__ */ new Set(), a = [];
  for (const s of En(e, t))
    !s.sort || n.has(s.sort) || (n.add(s.sort), a.push({ key: s.sort, label: (s.label ?? s.sort).toLowerCase() }));
  return a;
}
const Va = { key: St, label: St };
function _e(e, t, n = null) {
  const a = rt(e, n);
  return (t ? a.find((o) => o.key === t) : void 0) ?? a.find((o) => o.key === St) ?? a[0] ?? Va;
}
function Da(e) {
  switch (e.kind) {
    case "chips":
      return { kind: "chips", selected: [] };
    case "range":
      return { kind: "range", min: null, max: null };
    case "toggle":
      return { kind: "toggle", on: !1 };
  }
}
function Ka(e) {
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
function Ft(e) {
  return e.entity === null && e.expr.trim() === "";
}
function uc(e) {
  return e.entity !== null;
}
function Ln(e, t) {
  return e.entity === null && Ht(e.view, t) === "cards";
}
function Wa(e, t) {
  return t <= 0 ? 1 : Math.max(1, Math.ceil(e / t));
}
function Ge(e, t = {}) {
  const a = t.landing === "entity" ? Pn(e, t) : null;
  return {
    entity: a?.key ?? null,
    view: Ae(a?.key ?? null, t),
    sort: _e(a, t.sort).key,
    dir: t.dir === "asc" ? "asc" : "desc",
    expr: "",
    page: 1
  };
}
const qt = ["entity", "sort", "dir", "expr"];
function _t(e) {
  return qt.some((t) => t in e);
}
const pe = "—";
function de(e, t) {
  return e.find((n) => n.role === t);
}
function Tn(e, t) {
  return e.filter((n) => n.role === t);
}
function ja(e, t) {
  const n = (t ? t.columns : e?.columns) ?? [], a = t ? "scoped" : "everything";
  return n.filter(
    (s) => s.role !== "tint" && ((s.when ?? "always") === "always" || s.when === a)
  );
}
const Ua = ["id", "entityKey", "entityLabel"];
function ce(e, t) {
  if (e.value) return e.value(t);
  const n = e.field ?? e.key;
  if (n !== void 0) {
    if (t.fields && n in t.fields) return t.fields[n];
    if (Ua.includes(n))
      return t[n];
  }
}
function sn(e, t) {
  const n = e.key ?? e.field ?? e.label;
  return n?.trim() ? n.trim() : `column-${t}`;
}
function za(e, t) {
  return e.id?.trim() ? e.id : `${e.entityKey || "row"}-${t}`;
}
function Qa(e, t) {
  if (e == null || e === "") return pe;
  if (t === "number") {
    const n = typeof e == "number" ? e : Number(e);
    return Number.isFinite(n) ? Oa(n) : String(e);
  }
  return t === "date" ? Aa(String(e)) : Array.isArray(e) ? e.length ? e.join(", ") : pe : String(e);
}
function Ce(e, t) {
  const n = ce(e, t);
  return e.format ? e.format(n, t) : Qa(n, e.kind);
}
function Ga(e) {
  return typeof e == "number" ? Number.isFinite(e) ? String(e) : "" : typeof e == "string" ? e : Array.isArray(e) ? e.join(", ") : "";
}
function Mn(e, t) {
  const n = Ce(e, t), a = Ga(ce(e, t));
  return a && a !== n ? a : n;
}
function Ue(e, t) {
  return e ? Ce(e, t) : "";
}
function on(e) {
  return e.align ? e.align : e.kind === "number" || e.kind === "ordinal" ? "right" : "left";
}
const Ya = {
  ordinal: "dc-table__num",
  number: "dc-table__number",
  date: "dc-table__date",
  status: "dc-table__state"
};
function ln(e) {
  return [Ya[e.kind ?? "text"], e.class].filter(Boolean).join(" ");
}
function Pt(e) {
  if (e.truncate !== void 0) return e.truncate;
  const t = e.kind ?? "text";
  return t === "text" || t === "number" || t === "date";
}
const Xa = /^([A-Za-z_][\w.-]*)\s*(>=|<=|:|=|>|<)\s*(.*)$/, rn = "-?(?:\\d+\\.?\\d*|\\.\\d+)", Ja = new RegExp(`^(${rn})?\\.\\.(${rn})?$`);
function it(e) {
  const t = Ja.exec(e.trim());
  if (!t || t[1] === void 0 && t[2] === void 0) return null;
  const n = t[1] === void 0 ? null : Number(t[1]), a = t[2] === void 0 ? null : Number(t[2]);
  return n !== null && a !== null && n > a ? { min: a, max: n } : { min: n, max: a };
}
function Za(e) {
  return `${e.min ?? ""}..${e.max ?? ""}`;
}
function Ie(e) {
  return e.kind === "field" && (e.comparator === ":" || e.comparator === "=") && it(e.value) !== null;
}
function es(e) {
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
function le(e) {
  const t = e.trim();
  if (!t) return [];
  const n = [];
  let a = [];
  for (const s of es(t)) {
    const o = s.toUpperCase();
    if (o === "AND" || o === "&&") continue;
    if (o === "OR" || o === "||") {
      a.length && n.push(a), a = [];
      continue;
    }
    const l = s.length > 1 && s.startsWith("-"), i = l ? s.slice(1) : s, r = l ? { negated: !0 } : {}, c = Xa.exec(i);
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
const ge = (e) => e.toLowerCase().replace(/\s+/g, ""), On = [
  ["status", "state"],
  ["state", "state"],
  ["updated", "updated"],
  ["date", "updated"],
  ["name", "identity"],
  ["ref", "reference"]
];
function ts(e, t, n) {
  const a = ge(e), s = n.columns ?? [];
  if (a === "entity") return t.entityKey;
  if (e in t.fields) return t.fields[e];
  const o = s.find(
    (c) => c.key?.toLowerCase() === e.toLowerCase() || c.field?.toLowerCase() === e.toLowerCase() || c.label !== void 0 && ge(c.label) === a
  );
  if (o) return ce(o, t);
  const l = n.facets.find(
    (c) => c.key.toLowerCase() === a || ge(c.label) === a
  );
  if (l && l.key in t.fields) return t.fields[l.key];
  const i = On.find(([c]) => c === a)?.[1];
  if (i) {
    const c = de(s, i);
    if (c) return ce(c, t);
  }
  const r = /^metric(\d+)$/.exec(a);
  if (r) {
    const c = Tn(s, "metric")[Number(r[1]) - 1];
    if (c) return ce(c, t);
  }
}
function Fe(e) {
  return (e.toLowerCase().match(/[\p{L}\p{N}]+/gu) ?? []).map((t) => t.charAt(0)).join("");
}
const cn = /^[a-z_][\w.-]*$/;
function ct(e) {
  const t = (e.key ?? e.field)?.toLowerCase();
  if (t !== void 0) return cn.test(t) ? t : void 0;
  const n = e.label === void 0 ? void 0 : ge(e.label);
  return n !== void 0 && cn.test(n) ? n : void 0;
}
function Vt(e, t) {
  const n = ge(e);
  return !!t?.entities.some((a) => a.scope && ge(a.scope) === n);
}
function ns(e, t, n) {
  const a = ge(e);
  if (a === "entity" || On.some(([o]) => o === a) || /^metric\d+$/.test(a) || Vt(e, n)) return !0;
  const s = (o) => o !== void 0 && ge(o) === a;
  return (t.columns ?? []).some(
    (o) => s(o.key) || s(o.field) || s(o.label)
  ) || t.facets.some((o) => s(o.key) || s(o.label));
}
function Re(e, t, n) {
  return t ? Nn(e, (a) => {
    const s = In(a, t, n);
    return s && ct(s);
  }) : e;
}
function An(e, t, n) {
  return t ? Nn(e, (a) => {
    if (Vt(a, n)) return;
    const s = (t.columns ?? []).find((o) => ct(o) === a);
    return s && Rn(s, t, n);
  }) : e;
}
function as(e, t, n) {
  if (!t || Vt(e, n)) return;
  const a = t.facets.find((s) => s.key.toLowerCase() === e);
  return a ? a.label : (t.columns ?? []).find((s) => ct(s) === e)?.label;
}
function Nn(e, t) {
  let n = !1;
  const a = le(e).map(
    (s) => s.map((o) => {
      if (o.kind !== "field") return o;
      const l = t(o.field);
      return !l || l === o.field ? o : (n = !0, { ...o, field: l });
    })
  );
  return n ? ve(a) : e;
}
function In(e, t, n) {
  if (!(!e || ns(e, t, n)))
    return (t.columns ?? []).find(
      (a) => a.label !== void 0 && Fe(a.label) === e
    );
}
function Rn(e, t, n) {
  if (!t || e.label === void 0 || !ct(e)) return;
  const a = Fe(e.label);
  return In(a, t, n) === e ? a : void 0;
}
function gt(e, t) {
  const n = e.toLowerCase(), a = t.toLowerCase();
  if (!a.includes("*")) return n.includes(a);
  const s = a.replace(/[.+?^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*");
  return new RegExp(s).test(n);
}
function un(e, t) {
  return e.toLowerCase() === t.toLowerCase();
}
function ss(e, t, n, a) {
  if (e.kind === "text") {
    const r = n.columns ?? [];
    return ["identity", "reference"].some((c) => {
      const d = de(r, c), m = d ? ce(d, t) : void 0;
      return typeof m == "string" && gt(m, e.value);
    });
  }
  const s = ts(e.field, t, n);
  if (s === void 0) return a?.has(e.field) ? !1 : null;
  const o = Ie(e) ? it(e.value) : null;
  if (o) {
    if (Array.isArray(s) || typeof s == "boolean") return null;
    const r = typeof s == "number" ? s : Number(s);
    return Number.isFinite(r) ? (o.min === null || r >= o.min) && (o.max === null || r <= o.max) : null;
  }
  if (Array.isArray(s))
    return e.comparator === ":" || e.comparator === "=" ? s.some(
      (c) => e.comparator === "=" ? un(String(c), e.value) : gt(String(c), e.value)
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
    return e.comparator === "=" ? un(String(s), e.value) : gt(String(s), e.value);
  }
  const l = Number(e.value), i = typeof s == "number" ? s : Number(s);
  return !Number.isFinite(l) || !Number.isFinite(i) ? null : os(e.comparator, i, l);
}
function dn(e, t, n, a) {
  const s = ss(e, t, n, a);
  return s === null ? !0 : e.negated ? !s : s;
}
function os(e, t, n) {
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
function fn(e) {
  return e.kind === "field" && !e.negated && (e.comparator === ":" || e.comparator === "=") && !Ie(e);
}
const vn = /* @__PURE__ */ new WeakMap();
function ls(e) {
  if (!e?.strictScopes) return null;
  let t = vn.get(e);
  return t || (t = new Set(
    e.entities.flatMap((n) => n.scope ? [n.scope.toLowerCase()] : [])
  ), vn.set(e, t)), t;
}
function rs(e, t, n, a) {
  if (!e.length) return !0;
  const s = ls(a);
  return e.some((o) => {
    const l = /* @__PURE__ */ new Map();
    for (const i of o)
      fn(i) && l.set(
        i.field,
        (l.get(i.field) ?? !1) || dn(i, t, n, s)
      );
    return o.every(
      (i) => fn(i) ? l.get(i.field) === !0 : dn(i, t, n, s)
    );
  });
}
function pn(e) {
  return /[\s"']/.test(e) ? `"${e.replace(/["']/g, "")}"` : e;
}
function ke(e) {
  const t = e.negated ? "-" : "";
  return e.kind === "text" ? t + pn(e.value) : `${t}${e.field}${e.comparator}${pn(e.value)}`;
}
function is(e) {
  if (!e.negated) return { ...e, negated: !0 };
  const { negated: t, ...n } = e;
  return n;
}
function ve(e) {
  return e.filter((t) => t.length).map((t) => t.map(ke).join(" ")).join(" OR ");
}
function cs(e, t, n) {
  return e.map((a, s) => s === t ? a.filter((o, l) => l !== n) : a).filter((a) => a.length);
}
function dc(e) {
  const t = le(e);
  if (t.length > 1) return { parts: [], text: e.trim() };
  const n = t[0] ?? [];
  return {
    parts: n.filter((a) => a.kind === "field"),
    text: n.filter((a) => a.kind === "text").map(ke).join(" ")
  };
}
function fc(e, t) {
  return [...e.map(ke), t.trim()].filter(Boolean).join(" ");
}
const hn = (e, t) => e.toLowerCase() === t.toLowerCase();
function Et(e, t) {
  return !!e.negated == !!t.negated && Bn(e, t);
}
function us(e, t) {
  return !!e.negated != !!t.negated && Bn(e, t);
}
function Bn(e, t) {
  return e.kind === "field" ? t.kind === "field" && e.field === t.field && e.comparator === t.comparator && hn(e.value, t.value) : t.kind === "text" && hn(e.value, t.value);
}
function ds(e, t) {
  return t.filter((n) => !e.some((a) => Et(a, n)));
}
function Dt(e, t) {
  return Hn(e, t, (n) => n);
}
function Lt(e, t) {
  return Hn(
    e,
    t,
    (n, a) => n.filter((s) => !a.some((o) => us(s, o)))
  );
}
const fs = /^[A-Za-z_][\w.-]*\s*(?:>=|<=|:|=|>|<)$/;
function vs(e) {
  return ve(
    le(e).map(
      (t) => t.filter(
        (n) => n.kind !== "text" || n.value !== "-" && !fs.test(n.value)
      )
    ).filter((t) => t.length > 0)
  );
}
function Hn(e, t, n) {
  const a = le(e), s = le(t);
  return a.length ? s.length ? ve(
    a.flatMap(
      (o) => s.map((l) => [...n(o, l), ...ds(o, l)])
    )
  ) : ve(a) : ve(s);
}
const Fn = (e) => e.kind === "date" || e.role === "updated";
function ps(e) {
  if (!e) return () => 0;
  const n = (e.kind ?? "text") === "number" || e.role === "metric", a = Fn(e);
  return (s, o) => {
    const l = ce(e, s), i = ce(e, o);
    return n ? Number(i ?? 0) - Number(l ?? 0) : a ? Date.parse(String(i ?? "")) - Date.parse(String(l ?? "")) : String(i ?? "").localeCompare(String(l ?? ""));
  };
}
function mn(e, t) {
  return !t || !Fn(t) ? !1 : !Number.isFinite(Date.parse(String(ce(t, e) ?? "")));
}
function qn({ query: e, schema: t, entity: n, limit: a, offset: s }, o, l) {
  const i = le(e.expr), r = n ? [n] : t.entities;
  let c = 0;
  const d = [];
  for (const w of r)
    for (const L of o(w))
      c += 1, rs(i, L, w, t) && d.push(L);
  const m = _e(n, e.sort, t), b = En(n, t).find((w) => w.sort === m.key), x = l.undatedLast ? d.filter((w) => !mn(w, b)) : d, k = l.undatedLast ? d.filter((w) => mn(w, b)) : [];
  x.sort(ps(b)), e.dir === "asc" && x.reverse();
  const p = k.length ? [...x, ...k] : x;
  return {
    // One page out of the middle. `total` stays the whole match, which is what
    // the shell counts pages with.
    rows: l.zeroIsAll && a <= 0 ? p.slice(s) : p.slice(s, s + a),
    total: d.length,
    unfiltered: d.length === c
  };
}
const Ye = [
  "oklch(0.36 0.06 240)",
  "oklch(0.34 0.07 290)",
  "oklch(0.36 0.06 160)",
  "oklch(0.38 0.06 80)",
  "oklch(0.35 0.07 30)",
  "oklch(0.34 0.05 200)"
];
function vc(e) {
  return Ye[Me(e) % Ye.length];
}
function Vn(e, t) {
  return `${e}_${1e4 + t * 7}`;
}
const hs = 7, ms = 3;
function ys(e, t, n, a) {
  const s = (t * hs + Me(n)) % a, o = [];
  for (let l = 0; l < Math.min(ms, a); l++)
    o.push(Vn(e, (s + l) % a));
  return o;
}
function _s(e, t) {
  switch (e.kind) {
    case "chips":
      return e.multiple ? gs(e.options, t) : e.options[t % e.options.length] ?? "";
    case "range": {
      const n = Math.max(0, e.max - e.min);
      return e.min + (n === 0 ? 0 : t % (n + 1));
    }
    case "toggle":
      return t % 3 === 0;
  }
}
function gs(e, t) {
  if (!e.length) return [];
  const n = 1 + (t >> 5) % Math.min(3, e.length), a = t % e.length, s = /* @__PURE__ */ new Set();
  for (let o = 0; o < n; o++) s.add((a + o) % e.length);
  return [...s].sort((o, l) => o - l).map((o) => e[o]);
}
function ws(e, t) {
  const { hash: n, sample: a, revision: s, updatedAt: o } = t, l = s ? ` · rev ${s + 1}` : "";
  switch (e.role) {
    case "identity":
      return `${a[0]}${l}`;
    case "reference":
      return s ? `${a[1]}-${s + 1}` : a[1];
    case "state":
      return Te[n % Te.length];
    case "updated":
      return o;
    case "tint":
      return Ye[n % Ye.length];
    case "metric":
      return 1 + n % 940;
  }
  switch (e.kind) {
    case "number":
      return 1 + n % 940;
    case "status":
      return Te[n % Te.length];
    case "date":
      return o;
    default:
      return;
  }
}
function ks(e, t = {}) {
  const n = t.population ?? 48, a = t.seed ?? "", s = t.now ?? /* @__PURE__ */ new Date("2026-08-25T00:00:00Z"), o = e.samples, l = t.scopes ?? [];
  if (!o.length) return [];
  const i = [];
  for (let r = 0; r < n; r++) {
    const c = o[r % o.length], d = Math.floor(r / o.length), m = Me(`${a}:${e.key}:${c[0]}:${r}`), b = Vn(e.key, r), x = new Date(s.getTime() - m % 900 * 36e5).toISOString(), k = {};
    for (const p of e.columns ?? []) {
      const w = p.field ?? p.key;
      if (!w || p.value) continue;
      const L = ws(p, {
        hash: Me(`${m}:${w}`),
        sample: c,
        revision: d,
        updatedAt: x
      });
      L !== void 0 && (k[w] = L);
    }
    for (const p of e.facets)
      k[p.key] = _s(p, Me(`${m}:${p.key}`));
    for (const [p, w] of l)
      k[p] = w === e.key ? b : ys(w, r, p, n);
    i.push({ id: b, entityKey: e.key, entityLabel: e.label, fields: k });
  }
  return i;
}
function bs(e = {}) {
  const t = /* @__PURE__ */ new Map(), n = (a, s) => {
    const o = t.get(a.key);
    if (o) return o;
    const l = e.scopes ?? s.entities.flatMap(
      (r) => r.scope ? [[r.scope, r.key]] : []
    ), i = ks(a, { ...e, scopes: l });
    return t.set(a.key, i), i;
  };
  return {
    query(a) {
      return qn(a, (s) => n(s, a.schema), {
        undatedLast: !1,
        zeroIsAll: !1
      });
    }
  };
}
const Pe = "e", ut = "v", Kt = "s", Wt = "d", be = "q", dt = "p", Dn = "*", $s = [
  Pe,
  ut,
  Kt,
  Wt,
  be,
  dt
], xs = [
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
function Xe(e) {
  let t = encodeURIComponent(e);
  for (const [n, a] of xs) t = t.replace(n, a);
  return t;
}
function fe(e) {
  try {
    return decodeURIComponent(e.replace(/\+/g, " "));
  } catch {
    return e.replace(/\+/g, " ");
  }
}
function jt(e) {
  const t = e.replace(/^[?]/, "");
  if (!t) return [];
  const n = [];
  for (const a of t.split("&")) {
    if (!a) continue;
    const s = a.indexOf("="), o = s === -1 ? a : a.slice(0, s), l = s === -1 ? "" : a.slice(s + 1);
    n.push([fe(o), l]);
  }
  return n;
}
function Ss(e) {
  return $s.includes(e);
}
function ft(e, t) {
  if (!(!t || e.some((n) => n.key === t)))
    return e.find((n) => Fe(n.label) === t);
}
function Cs(e, t) {
  const n = Fe(e.label);
  return ft(t.entities, n)?.key === e.key ? n : e.key;
}
function Kn(e, t) {
  return t ? Ne(e, t) ?? ft(e.entities, t) ?? null : null;
}
function Ps(e, t) {
  const n = Fe(e.label);
  return ft(t, n)?.key === e.key ? n : e.key;
}
function Es(e, t) {
  return t.some((n) => n.key === e) ? e : ft(t, e)?.key ?? e;
}
function Ls(e, t, n = {}) {
  const a = Ge(t, n), s = new Map(jt(e)), o = s.get(Pe), l = o === void 0 ? a.entity : fe(o), i = l === Dn ? null : Kn(t, l), r = s.get(ut), c = r && Cn(fe(r)) ? fe(r) : Ae(i?.key ?? null, n), d = s.get(Kt), m = _e(
    i,
    d ? Es(fe(d), rt(i, t)) : n.sort,
    t
  ), b = s.get(Wt), x = b ? fe(b) === "asc" ? "asc" : "desc" : a.dir, k = s.get(be), p = s.get(dt), w = p === void 0 ? 1 : Number(fe(p)), L = Number.isFinite(w) ? Math.max(1, Math.floor(w)) : 1;
  return {
    entity: i?.key ?? null,
    view: c,
    sort: m.key,
    dir: x,
    expr: k === void 0 ? "" : Re(fe(k), i, t),
    page: L
  };
}
function yn(e, t, n = {}, a = "") {
  const s = Ge(t, n), o = Ne(t, e.entity), l = jt(a).filter(([m]) => !Ss(m)), i = [], r = (m, b) => i.push([m, Xe(b)]), c = o?.key ?? null;
  if (c !== s.entity && r(Pe, o ? Cs(o, t) : Dn), e.view !== Ae(c, n) && r(ut, e.view), e.sort !== s.sort) {
    const m = rt(o, t), b = m.find((x) => x.key === e.sort);
    r(Kt, b ? Ps(b, m) : e.sort);
  }
  e.dir !== s.dir && r(Wt, e.dir), e.expr.trim() !== "" && r(be, An(e.expr, o, t)), e.page > 1 && r(dt, String(e.page));
  const d = [
    ...l.map(([m, b]) => [Xe(m), b]),
    ...i
  ];
  return d.length ? `?${d.map(([m, b]) => b === "" ? m : `${m}=${b}`).join("&")}` : "";
}
function pc(e) {
  const t = [];
  for (const [n, a] of Object.entries(e))
    for (const s of Array.isArray(a) ? a : [a]) {
      if (typeof s != "string") continue;
      const o = Xe(n);
      t.push(s === "" ? o : `${o}=${Xe(s)}`);
    }
  return t.length ? `?${t.join("&")}` : "";
}
function hc(e, t) {
  const n = new Map(jt(e)), a = n.get(be), s = a === void 0 ? "" : fe(a);
  if (!t) return s;
  const o = n.get(Pe);
  return Re(
    s,
    o === void 0 ? null : Kn(t, fe(o)),
    t
  );
}
function vt(e, t) {
  return Wn(e, t.id);
}
function Wn(e, t) {
  const n = e?.scope;
  return n ? jn(n, t) : null;
}
function jn(e, t) {
  return `${e}="${t.replace(/"/g, "")}"`;
}
function mc(e, t) {
  const n = typeof e == "string" ? e : e?.scope;
  if (!n) return null;
  const a = t.filter((s) => s.replace(/"/g, "") !== "").map((s) => jn(n, s));
  return a.length ? a.join(" ") : null;
}
function pt(e, t) {
  if (e.kind !== "field" || t.kind !== "field") return Et(e, t);
  const n = (a) => a.comparator === ":" || a.comparator === "=";
  return Et(e, { ...t, comparator: n(e) && n(t) ? e.comparator : t.comparator });
}
function Je(e, t) {
  return pt(e, is(t));
}
function Ze(e, t) {
  return vt(
    e.entities.find((n) => n.key === t.entityKey),
    t
  );
}
function qe(e, t) {
  if (!t) return e;
  const n = e.trim();
  if (!n) return t;
  const [a] = le(t).flat();
  if (!a) return n;
  const s = le(n);
  return s.some((i) => i.some((r) => pt(r, a))) ? n : s.some((i) => i.some((r) => Je(r, a))) ? ve(
    s.map(
      (i) => i.map((r) => Je(r, a) ? a : r)
    )
  ) : `${n} ${t}`;
}
function Un(e) {
  if (!e) return null;
  const t = e.trim();
  return t ? t.startsWith("-") ? t.slice(1) : `-${t}` : null;
}
function Ut(e, t) {
  if (!t || !e.trim()) return null;
  const [n] = le(t).flat();
  if (!n) return null;
  const a = le(e).flat();
  return a.some((s) => pt(s, n)) ? n.negated ? "out" : "in" : a.some((s) => Je(s, n)) ? n.negated ? "in" : "out" : null;
}
function zn(e, t) {
  if (!t || !e.trim()) return e;
  const [n] = le(t).flat();
  if (!n) return e;
  const a = le(e), s = a.map(
    (o) => o.filter((l) => !pt(l, n) && !Je(l, n))
  );
  return s.every((o, l) => o.length === a[l]?.length) ? e : ve(s);
}
function Tt(e, t, n) {
  return t ? n === null ? zn(e, t) : qe(e, n === "out" ? Un(t) : t) : e;
}
function Qn(e) {
  return e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0;
}
function ht(e) {
  return e.altKey ? { exclude: !0 } : {};
}
function wt(e, t, n, a = {}) {
  const s = Ze(e, n);
  return qe(t.expr, a.exclude ? Un(s) : s);
}
function Gn(e, t) {
  const n = e?.scope?.toLowerCase();
  if (!n || e?.keepsScope || !t.trim()) return t;
  const a = le(t), s = a.map(
    (o) => o.filter((l) => l.kind !== "field" || l.field !== n)
  );
  return s.every((o, l) => o.length === a[l]?.length) ? t : ve(s);
}
function Yn(e, t) {
  const n = t.toLowerCase();
  return e.entities.find((a) => a.scope?.toLowerCase() === n) ?? null;
}
function Xn(e, t, n) {
  if (!t || !n) return null;
  const a = Yn(e, t);
  return a ? { entity: a, id: n } : null;
}
function Ts(e, t) {
  const n = [], a = /* @__PURE__ */ new Set();
  for (const s of t)
    for (const o of le(s).flat()) {
      if (o.kind !== "field" || o.negated) continue;
      const l = Xn(e, o.field, o.value);
      if (!l) continue;
      const i = `${l.entity.key}:${l.id.toLowerCase()}`;
      a.has(i) || (a.add(i), n.push({ entityKey: l.entity.key, id: l.id }));
    }
  return n;
}
function yc(e, t, n = "cards") {
  return {
    // An expression with nothing in it is no parameter, as the shell writes it.
    [be]: qe(e, t) || void 0,
    [Pe]: void 0,
    [ut]: n,
    [dt]: void 0
  };
}
const Jn = Symbol("dc.shellContext");
function Ms(e) {
  const t = e.liveQuery ? e : Os(e);
  return It(Jn, t), t;
}
function Os(e) {
  const t = e.draft ?? N("");
  return {
    draft: t,
    liveQuery: e.query,
    drafting: f(() => !1),
    commitDraft() {
      const n = t.value.trim();
      n && (e.setExpression(
        Lt(e.query.value.expr, Re(n, e.entity.value, e.schema.value))
      ), t.value = "");
    },
    abandonDraft() {
      t.value = "";
    },
    ...e
  };
}
function Z() {
  const e = Nt(Jn, null);
  if (!e)
    throw new Error(
      "[appfr] No shell context found. Render this component inside <DataShell>."
    );
  return e;
}
const et = Symbol("dc-shell-theme");
function Mt(e) {
  return {
    read: () => ({
      theme: we(e.theme),
      accent: we(e.accent),
      tokens: we(e.tokens)
    })
  };
}
function As(e, t) {
  t ? t.provide(et, Mt(e)) : It(et, Mt(e));
}
function Ns(e) {
  const t = bn();
  It(et, {
    ...Mt(e),
    element: () => t?.proxy?.$el ?? null
  });
}
function zt(e) {
  const t = bn(), n = Nt(et, null), a = he(null);
  function s() {
    const r = t?.proxy?.$el, d = (r instanceof Element ? r : r?.parentElement)?.closest(".dc-shell");
    if (!d) {
      a.value = null;
      return;
    }
    const m = {};
    for (const b of Array.from(d.style))
      b.startsWith("--") && (m[b] = d.style.getPropertyValue(b));
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
function Zn(e) {
  return e.key.toLowerCase();
}
const Is = /* @__PURE__ */ new Set([">", ">=", "<", "<="]);
function ea(e, t) {
  if (e.kind !== "field" || e.negated || e.field !== Zn(t)) return !1;
  const n = e.comparator === ":" || e.comparator === "=";
  switch (t.kind) {
    case "range":
      return Ie(e) || Is.has(e.comparator);
    case "chips":
      return n && !Ie(e) && ta(t.options, e.value) !== void 0;
    case "toggle":
      return n && Rs(e.value);
  }
}
function ta(e, t) {
  const n = t.toLowerCase();
  return e.find((a) => a.toLowerCase() === n);
}
function Rs(e) {
  const t = e.toLowerCase();
  return t === "true" || t === "yes";
}
function na(e, t) {
  const n = (le(e)[0] ?? []).filter((a) => ea(a, t));
  switch (t.kind) {
    case "range": {
      let a = null, s = null;
      for (const o of n) {
        const l = it(o.value), i = Number(o.value);
        l ? (l.min !== null && (a = l.min), l.max !== null && (s = l.max)) : Number.isFinite(i) && (o.comparator.startsWith(">") ? a = i : s = i);
      }
      return { kind: "range", min: a, max: s };
    }
    case "chips": {
      const a = new Set(n.map((s) => ta(t.options, s.value)));
      return { kind: "chips", selected: t.options.filter((s) => a.has(s)) };
    }
    case "toggle":
      return { kind: "toggle", on: n.length > 0 };
  }
}
function Bs(e, t) {
  const n = Zn(e);
  switch (t.kind) {
    case "range":
      return t.min === null && t.max === null ? [] : [{ kind: "field", field: n, comparator: ":", value: Za(t) }];
    case "chips":
      return t.selected.map((a) => ({ kind: "field", field: n, comparator: "=", value: a }));
    case "toggle":
      return t.on ? [{ kind: "field", field: n, comparator: ":", value: "true" }] : [];
  }
}
function aa(e, t, n) {
  const a = Bs(t, n), s = le(e), o = (s.length ? s : [[]]).map((l) => [
    ...l.filter((i) => !ea(i, t)),
    ...a
  ]);
  return ve(o);
}
function _c(e, t) {
  return aa(e, t, Da(t));
}
function Hs(e, t) {
  return (t?.facets ?? []).some((n) => Ka(na(e, n)));
}
const tt = "entity", Be = "expr", Fs = { ">=": "≥", "<=": "≤", ">": ">", "<": "<" };
function qs(e, t, n) {
  if (e.kind !== "field") return ke(e);
  const a = as(e.field, t, n);
  if (a === void 0) return ke(e);
  const s = e.negated ? "-" : "", o = Ie(e) ? it(e.value) : null;
  if (o) {
    const i = o.min !== null && o.max !== null ? `${o.min} ≤ ${a} ≤ ${o.max}` : o.max !== null ? `${a} ≤ ${o.max}` : `${a} ≥ ${o.min}`;
    return s + i;
  }
  const l = Fs[e.comparator];
  return l ? `${s}${a} ${l} ${e.value}` : ke({ ...e, field: a });
}
function Qt(e, t, n = null) {
  const a = [];
  return t && a.push({
    id: tt,
    label: `entity:${t.key}`,
    facetKey: tt
  }), le(e.expr).forEach((s, o) => {
    s.forEach((l, i) => {
      a.push({
        id: `${Be}:${o}:${i}`,
        label: qs(l, t, n),
        address: An(ke(l), t, n),
        facetKey: Be,
        group: o,
        index: i,
        ...l.kind === "field" ? { field: l.field, value: l.value } : {},
        ...l.negated ? { negated: !0 } : {}
      });
    });
  }), a;
}
function Vs(e, t, n = null) {
  if (Ft(e)) {
    const o = _e(t, e.sort, n);
    return `everything · ${e.view} · ${o.label}`;
  }
  const a = Qt(e, t).filter((o) => o.facetKey !== Be).map((o) => o.label), s = e.expr.trim();
  return s && a.push(`"${s}"`), a.join(" · ");
}
function Ds(e) {
  const { adapter: t } = e, n = f(() => we(e.schema)), a = f(() => we(e.defaults) ?? {}), s = f(() => Ls(t.search.value, n.value, a.value)), o = f(() => Ne(n.value, s.value.entity)), l = f(() => o.value ?? Pn(n.value, a.value)), i = f(() => rt(o.value, n.value)), r = f(() => _e(o.value, s.value.sort, n.value)), c = (g, v) => {
    const _ = yn(g, n.value, a.value, t.search.value);
    return _ === t.search.value ? !1 : (v === "push" ? t.push(_) : t.replace(_), !0);
  }, d = () => we(e.navigationMode) ?? "push", m = () => we(e.facetNavigationMode) ?? "replace", b = (g, v) => {
    const _ = g.page ?? (_t(g) ? 1 : s.value.page);
    return c({ ...s.value, ...g, page: _ }, v);
  }, x = (g) => {
    const v = g.page ?? (_t(g) ? 1 : s.value.page);
    return k({ ...s.value, ...g, page: v });
  }, k = (g) => {
    const v = yn(g, n.value, a.value, t.search.value);
    return t.href ? t.href(v) : `${t.path.value}${v}`;
  }, p = (g, v) => {
    const _ = o.value?.facets.find((B) => B.key === g);
    if (!_) return;
    const T = aa(s.value.expr, _, v(na(s.value.expr, _)));
    b({ expr: T }, m());
  }, w = (g) => {
    const v = g === null ? null : Ne(n.value, g);
    return (v?.key ?? null) === s.value.entity ? {} : {
      entity: v?.key ?? null,
      view: nn(s.value.view, s.value.entity, v?.key ?? null, a.value),
      sort: _e(v, s.value.sort, n.value).key
    };
  }, L = (g) => {
    const v = w(g);
    Object.keys(v).length && b(v, d());
  };
  return {
    query: s,
    entity: o,
    focus: l,
    sort: r,
    sorts: i,
    summary: f(() => Vs(s.value, o.value, n.value)),
    terms: f(() => Qt(s.value, o.value, n.value)),
    isPristine: f(() => Ft(s.value)),
    isEverything: f(() => s.value.entity === null),
    hasFacets: f(() => Hs(s.value.expr, o.value)),
    setEntity: L,
    entityHref: (g) => x(w(g)),
    clearEntity: () => L(null),
    setView(g) {
      b({ view: g }, d());
    },
    setSort(g) {
      b({ sort: _e(o.value, g, n.value).key }, d());
    },
    toggleDirection() {
      b({ dir: s.value.dir === "desc" ? "asc" : "desc" }, d());
    },
    setExpression(g) {
      return b({ expr: g }, d());
    },
    narrow(g, v, _) {
      return b({ expr: g, ...w(v), ..._ ? { view: _ } : {} }, d());
    },
    narrowHref(g, v, _) {
      return x({ expr: g, ...w(v), ..._ ? { view: _ } : {} });
    },
    setPage(g, v) {
      b({ page: Math.max(1, Math.floor(g)) }, v ?? d());
    },
    setFacet(g, v) {
      p(g, () => v);
    },
    toggleChip(g, v) {
      p(g, (_) => _.kind !== "chips" ? _ : { kind: "chips", selected: _.selected.includes(v) ? _.selected.filter((B) => B !== v) : [..._.selected, v] });
    },
    setRange(g, v, _) {
      p(g, (T) => T.kind === "range" ? { kind: "range", min: v, max: _ } : T);
    },
    toggleFlag(g) {
      p(
        g,
        (v) => v.kind === "toggle" ? { kind: "toggle", on: !v.on } : v
      );
    },
    removeTerm(g) {
      if (g.facetKey === tt) {
        L(null);
        return;
      }
      if (g.facetKey === Be) {
        const v = cs(le(s.value.expr), g.group ?? 0, g.index ?? 0);
        b({ expr: ve(v) }, d());
      }
    },
    clearFilters() {
      b({ ...w(null), expr: "" }, d());
    },
    clearHref: () => x({ ...w(null), expr: "" }),
    reset() {
      c(Ge(n.value, a.value), d());
    },
    homeHref: () => k(Ge(n.value, a.value)),
    hrefFor(g) {
      const v = { ...s.value, ...g };
      return "entity" in g && !("view" in g) && (v.view = nn(s.value.view, s.value.entity, v.entity, a.value)), v.page = g.page ?? (_t(g) ? 1 : s.value.page), k(v);
    }
  };
}
function Ks(e) {
  const t = he([]), n = N(0), a = N(!1), s = N(!1), o = he(null);
  let l = 0, i = null, r = null;
  const c = f(() => (e.query.value.page - 1) * e.limit.value), d = f(() => Wa(n.value, e.limit.value)), m = () => {
    const _ = e.query.value, T = e.within?.value.trim(), B = Gn(e.entity.value, _.expr);
    return T ? { ..._, expr: Dt(T, B) } : B === _.expr ? _ : { ..._, expr: B };
  }, b = (_, T) => {
    t.value = _.rows, n.value = _.total, o.value = null, x(T);
  }, x = (_) => {
    i = { key: _, total: n.value }, s.value = !1;
  }, k = (_) => {
    o.value = _, t.value = [], n.value = 0, i = null, s.value = !1;
  }, p = (_, T, B, ae) => {
    let D = !0;
    const K = () => _ === l;
    let ee = 0, re = !1;
    const V = (I) => {
      ee = I, re = !0, ae === void 0 && (n.value = I);
    }, Y = () => {
      D && (D = !1, t.value = [], V(0)), o.value = null;
    };
    return {
      get open() {
        return K();
      },
      insert(I, E) {
        if (!K()) return;
        const F = Array.isArray(I) ? I : [I];
        if (!F.length) return;
        Y();
        const y = [...t.value];
        y.splice(E ?? y.length, 0, ...F), t.value = T > 0 ? y.slice(0, T) : y, V(ee + F.length);
      },
      set(I) {
        K() && (I.rows && (Y(), t.value = T > 0 ? I.rows.slice(0, T) : I.rows, V(I.rows.length)), I.total !== void 0 && V(I.total));
      },
      close() {
        K() && (a.value = !1, re && (n.value = ee), x(B));
      },
      fail(I) {
        K() && (k(I), a.value = !1);
      }
    };
  }, w = () => {
    const _ = r;
    r = null, _?.();
  }, L = () => {
    const _ = ++l;
    w();
    const T = g.value, B = i?.key === T ? i.total : void 0;
    s.value = B === void 0;
    const ae = {
      query: m(),
      schema: e.schema.value,
      entity: e.entity.value,
      limit: e.limit.value,
      offset: c.value
    }, D = e.source.value;
    if (D.stream) {
      a.value = !0;
      try {
        r = D.stream(ae, p(_, ae.limit, T, B)) ?? null;
      } catch (ee) {
        k(ee), a.value = !1;
      }
      return;
    }
    let K;
    try {
      K = D.query(ae);
    } catch (ee) {
      k(ee);
      return;
    }
    if (!(K instanceof Promise)) {
      b(K, T), a.value = !1;
      return;
    }
    a.value = !0, K.then((ee) => {
      _ === l && b(ee, T);
    }).catch((ee) => {
      _ === l && k(ee);
    }).finally(() => {
      _ === l && (a.value = !1);
    });
  }, g = f(() => {
    const _ = m();
    return `${e.entity.value?.key ?? e.schema.value.entities[0]?.key ?? ""}|${JSON.stringify(qt.map((B) => _[B]))}`;
  }), v = f(() => `${g.value}|${e.query.value.page}`);
  return se([e.source, v, e.limit], L, {
    immediate: !0
  }), nt(() => {
    l++, w();
  }, !0), { rows: t, total: n, offset: c, pageCount: d, pending: a, counting: s, error: o, refresh: L };
}
const Ws = 150;
function js(e) {
  const t = e.delay ?? Ws, n = N(""), a = N("");
  let s = !1, o;
  const l = () => {
    clearTimeout(o), o = void 0;
  }, i = f(() => Re(vs(a.value), e.entity.value, e.schema?.value)), r = f(() => i.value.trim() !== ""), c = f(
    () => JSON.stringify([i.value, ...qt.map((x) => e.query.value[x])])
  ), d = he(null), m = f(() => {
    const x = e.query.value;
    if (!r.value) return x;
    const k = d.value?.of === c.value ? d.value.page : 1;
    return { ...x, expr: Lt(x.expr, i.value), page: k };
  });
  se(n, (x) => {
    if (l(), !x.trim()) {
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
  const b = (x) => {
    l(), s = !0, n.value = "", !x() && s && (s = !1, a.value = "");
  };
  return $n() && nt(l), {
    text: n,
    live: m,
    drafting: r,
    setPage(x) {
      d.value = { of: c.value, page: Math.max(1, Math.floor(x)) };
    },
    commit() {
      const x = n.value.trim();
      if (!x) return;
      const k = Lt(
        e.query.value.expr,
        Re(x, e.entity.value, e.schema?.value)
      );
      a.value = x, b(() => e.setExpression(k));
    },
    abandon() {
      l(), s = !1, n.value = "", a.value = "";
    },
    release: b
  };
}
const Us = 25, sa = (e, t) => e.toLowerCase() === t.toLowerCase();
function zs(e, t) {
  return e.find((n) => sa(n.id, t));
}
function Qs(e) {
  const t = he(/* @__PURE__ */ new Map()), n = /* @__PURE__ */ new Set(), a = (i) => {
    if (i.facetKey !== Be) return null;
    const r = Xn(e.schema.value, i.field, i.value);
    return r ? { ...r, key: `${r.entity.key}:${r.id}` } : null;
  }, s = (i) => {
    const { entity: r, id: c } = i, d = e.query.value;
    return e.source.value.query({
      query: {
        ...d,
        entity: r.key,
        // The reference on its own. The rest of the query is about the rows on
        // screen, which are of another type entirely.
        expr: Wn(r, c) ?? "",
        sort: _e(r, d.sort, e.schema.value).key,
        page: 1
      },
      schema: e.schema.value,
      entity: r,
      limit: Us,
      offset: 0
    });
  }, o = (i, r) => {
    const c = Ue(de(i.columns ?? [], "identity"), r);
    return c === pe || sa(c, r.id) ? "" : c;
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
      d.forEach((b, x) => {
        const { reference: k } = r[x], p = zs(b.rows, k.id);
        m.set(k.key, p ? o(k.entity, p) : "");
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
  return se([e.source, e.schema, e.terms, e.loading], () => {
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
const Gs = ["href"], Ys = /* @__PURE__ */ q({
  __name: "PressLink",
  props: {
    href: {}
  },
  emits: ["press"],
  setup(e, { emit: t }) {
    const n = e, a = t;
    function s(o) {
      if (n.href && Qn(o)) {
        o.stopPropagation();
        return;
      }
      o.preventDefault(), a("press", ht(o), o);
    }
    return (o, l) => e.href ? (u(), h("a", {
      key: 0,
      href: e.href,
      class: "dc-press",
      onClick: s
    }, [
      Q(o.$slots, "default", {}, void 0, !0)
    ], 8, Gs)) : (u(), h("button", {
      key: 1,
      type: "button",
      class: "dc-press",
      onClick: s
    }, [
      Q(o.$slots, "default", {}, void 0, !0)
    ]));
  }
}), j = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [a, s] of t)
    n[a] = s;
  return n;
}, ne = /* @__PURE__ */ j(Ys, [["__scopeId", "data-v-a9383f64"]]), Xs = { class: "dc-header" }, Js = { class: "dc-header__main" }, Zs = {
  class: "dc-header__brand",
  "aria-hidden": "true"
}, eo = { class: "dc-header__sr" }, to = {
  key: 2,
  class: "dc-header__within"
}, no = ["title"], ao = { class: "dc-header__query" }, so = ["data-dc-more", "title"], oo = { class: "dc-header__run" }, lo = {
  key: 0,
  class: "dc-header__or dc-mono",
  "aria-hidden": "true"
}, ro = ["title", "aria-label", "onClick"], io = ["placeholder", "onKeydown"], co = {
  key: 0,
  class: "dc-header__actions"
}, uo = /* @__PURE__ */ q({
  __name: "ShellHeader",
  setup(e) {
    const t = at(), n = Z(), a = f(() => n.schema.value), s = f(() => {
      const y = n.within.value.trim();
      return y ? Qt({ ...n.query.value, expr: y }, null) : [];
    }), o = f(() => {
      const y = n.entity.value, O = y?.keepsScope ? void 0 : y?.scope?.toLowerCase();
      return n.terms.value.filter((H) => H.facetKey !== tt).map((H, te, C) => {
        const R = C[te - 1];
        return {
          term: H,
          or: R?.group !== void 0 && H.group !== void 0 && H.group !== R.group,
          idle: !!O && H.field?.toLowerCase() === O
        };
      });
    }), l = Qs({
      source: n.source,
      schema: n.schema,
      query: n.query,
      loading: n.loading,
      // The scope's parts as well as the query's: it names a record more often
      // than a typed term does, being what a record's own page is built on.
      terms: f(() => [...s.value, ...n.terms.value])
    });
    function i(y) {
      const O = Yn(a.value, y)?.scopeLabel ?? y;
      return O.charAt(0).toUpperCase() + O.slice(1);
    }
    function r(y) {
      return y.replace(/\s*\([^()]*\)\s*$/, "");
    }
    function c(y) {
      const O = l.nameOf(y);
      return O ? `${y.negated ? "-" : ""}${i(y.field)}: ${r(O)}` : y.label;
    }
    function d(y) {
      const O = c(y.term), H = y.idle ? `Not applied to ${n.entity.value?.label} — remove ${O}` : `Remove ${O}`, te = y.term.address;
      return te && te !== O ? `${H}
Written ${te} in the address and the search box` : H;
    }
    const m = N(null);
    function b(y) {
      m.value = y instanceof HTMLInputElement ? y : null;
    }
    function x() {
      n.abandonDraft(), m.value?.blur();
    }
    function k() {
      p.value = null, n.commitDraft();
    }
    const p = N(null), w = f(() => Math.min(p.value ?? 1 / 0, o.value.length)), L = f(() => [
      { key: "before", entries: o.value.slice(0, w.value) },
      { key: "after", entries: o.value.slice(w.value) }
    ]), g = f(() => w.value < o.value.length);
    se(o, (y) => {
      p.value !== null && p.value >= y.length && (p.value = null);
    });
    function v(y, O) {
      p.value = y >= o.value.length ? null : Math.max(0, y), st(() => {
        const H = m.value;
        if (!H) return;
        const te = O === "start" ? 0 : H.value.length;
        H.setSelectionRange(te, te), H.scrollIntoView({ block: "nearest", inline: "nearest" }), E();
      });
    }
    function _(y) {
      const O = m.value;
      return !O || O.selectionStart !== O.selectionEnd ? !1 : O.selectionStart === (y === "start" ? 0 : O.value.length);
    }
    function T(y) {
      w.value === 0 || !_("start") || (y.preventDefault(), v(y.key === "Home" ? 0 : w.value - 1, "start"));
    }
    function B(y) {
      !g.value || !_("end") || (y.preventDefault(), v(y.key === "End" ? o.value.length : w.value + 1, "end"));
    }
    function ae(y) {
      w.value === 0 || !_("start") || (y.preventDefault(), ee(o.value[w.value - 1].term, !0));
    }
    function D(y) {
      !g.value || !_("end") || (y.preventDefault(), ee(o.value[w.value].term, !1));
    }
    function K(y) {
      y.isComposing || y.altKey || y.ctrlKey || y.metaKey || y.shiftKey || (y.key === "ArrowLeft" || y.key === "Home" ? T(y) : y.key === "ArrowRight" || y.key === "End" ? B(y) : y.key === "Backspace" ? ae(y) : y.key === "Delete" && D(y));
    }
    function ee(y, O) {
      O && p.value !== null && (p.value = Math.max(0, p.value - 1)), n.removeTerm(y);
    }
    function re(y) {
      y.target?.closest("button, input") || (y.preventDefault(), m.value?.focus(), v(o.value.length, "end"));
    }
    function V() {
      n.draft.value || (p.value = null);
    }
    const Y = N(null), I = N("");
    function E() {
      const y = Y.value;
      if (!y) {
        I.value = "";
        return;
      }
      const O = y.scrollLeft > 1, H = y.scrollWidth - y.clientWidth - y.scrollLeft > 1;
      I.value = O && H ? "both" : O ? "start" : H ? "end" : "";
    }
    let F = null;
    return se(
      Y,
      (y) => {
        F?.disconnect(), F = null, E(), !(!y || typeof ResizeObserver > "u") && (F = new ResizeObserver(E), F.observe(y));
      },
      { flush: "post" }
    ), se([o, w], E, { flush: "post" }), me(() => F?.disconnect()), (y, O) => (u(), h("div", Xs, [
      S("div", Js, [
        a.value.label && t.brand ? (u(), A(ne, {
          key: 0,
          class: "dc-header__domain",
          "data-dc-brand": "",
          title: "Home",
          href: $(n).homeHref(),
          onPress: O[0] || (O[0] = (H) => $(n).reset())
        }, {
          default: G(() => [
            S("span", Zs, [
              Q(y.$slots, "brand", {
                label: a.value.label
              }, void 0, !0)
            ]),
            S("span", eo, P(a.value.label), 1)
          ]),
          _: 3
        }, 8, ["href"])) : a.value.label ? (u(), A(ne, {
          key: 1,
          class: "dc-header__domain",
          title: "Home",
          href: $(n).homeHref(),
          onPress: O[1] || (O[1] = (H) => $(n).reset())
        }, {
          default: G(() => [
            J(P(a.value.label), 1)
          ]),
          _: 1
        }, 8, ["href"])) : M("", !0),
        s.value.length ? (u(), h("span", to, [
          O[4] || (O[4] = S("span", { class: "dc-header__sr" }, "Within", -1)),
          (u(!0), h(W, null, X(s.value, (H) => (u(), h("span", {
            key: `scope:${H.id}`,
            class: "dc-within dc-mono dc-truncate",
            title: c(H)
          }, P(c(H)), 9, no))), 128))
        ])) : M("", !0),
        S("div", ao, [
          S("div", {
            class: "dc-header__field",
            onMousedown: re
          }, [
            S("div", {
              ref_key: "termBar",
              ref: Y,
              class: "dc-header__terms",
              "data-dc-more": I.value,
              title: $(n).summary.value,
              onScroll: E
            }, [
              (u(!0), h(W, null, X(L.value, (H) => (u(), h(W, {
                key: H.key
              }, [
                S("span", oo, [
                  (u(!0), h(W, null, X(H.entries, (te) => (u(), h(W, {
                    key: te.term.id
                  }, [
                    te.or ? (u(), h("span", lo, "or")) : M("", !0),
                    S("button", {
                      type: "button",
                      class: ue(["dc-term dc-mono", { "dc-term--idle": te.idle }]),
                      title: d(te),
                      "aria-label": `Remove ${c(te.term)}`,
                      onMousedown: O[2] || (O[2] = Se(() => {
                      }, ["prevent"])),
                      onClick: (C) => ee(te.term, H.key === "before")
                    }, P(c(te.term)), 43, ro)
                  ], 64))), 128))
                ]),
                H.key === "before" ? $t((u(), h("input", {
                  key: 0,
                  ref_for: !0,
                  ref: b,
                  "onUpdate:modelValue": O[3] || (O[3] = (te) => $(n).draft.value = te),
                  class: ue(["dc-header__search dc-mono", { "dc-header__search--between": g.value }]),
                  style: oe({ "--dc-typed": String(Math.max(1, $(n).draft.value.length)) }),
                  type: "text",
                  autocomplete: "off",
                  spellcheck: "false",
                  placeholder: g.value ? "" : "Search…",
                  "aria-label": "Search",
                  onKeydown: [
                    ze(Se(k, ["prevent"]), ["enter"]),
                    ze(Se(x, ["prevent"]), ["esc"]),
                    K
                  ],
                  onBlur: V
                }, null, 46, io)), [
                  [wa, $(n).draft.value]
                ]) : M("", !0)
              ], 64))), 128))
            ], 40, so)
          ], 32)
        ])
      ]),
      t.actions ? (u(), h("div", co, [
        Q(y.$slots, "actions", {}, void 0, !0)
      ])) : M("", !0)
    ]));
  }
}), oa = /* @__PURE__ */ j(uo, [["__scopeId", "data-v-9fa2ca09"]]);
function fo(e) {
  const t = he(/* @__PURE__ */ new Map()), n = N(!0);
  let a = 0, s;
  const o = () => {
    a++, s?.abort(), s = void 0;
  }, l = () => {
    o();
    const i = a, { signal: r } = s = new AbortController(), c = e.query.value, d = e.schema.value, m = e.entities.value, b = e.within?.value.trim() ?? "";
    n.value = c.expr.trim() === "" && !b;
    const x = /* @__PURE__ */ new Map();
    let k = !0;
    for (const p of m) {
      const w = Gn(p, c.expr), L = b ? Dt(b, w) : w;
      let g = !1;
      const v = (T) => {
        if (i !== a) return;
        if (k) {
          x.set(p.key, T);
          return;
        }
        const B = new Map(t.value);
        B.set(p.key, T), t.value = B;
      }, _ = e.source.value.query({
        query: { ...c, entity: p.key, expr: L, page: 1 },
        schema: d,
        entity: p,
        limit: 0,
        offset: 0,
        signal: r,
        progress: (T) => {
          g || v({ total: T, pending: !0, counted: !0 });
        }
      });
      _ instanceof Promise ? (x.has(p.key) || x.set(p.key, { total: 0, pending: !0, counted: !1 }), _.then((T) => {
        g = !0, v({ total: T.total, pending: !1, counted: !0 });
      })) : (g = !0, x.set(p.key, { total: _.total, pending: !1, counted: !0 }));
    }
    k = !1, t.value = x;
  };
  return $n() && nt(o), { counts: t, pristine: n, refresh: l, cancel: o };
}
const vo = ["checked", "indeterminate"], la = /* @__PURE__ */ q({
  __name: "PageTick",
  setup(e) {
    const t = Z(), n = f(() => t.rows.value.filter((o) => t.isSelected(o)).length), a = f(
      () => t.rows.value.length > 0 && n.value === t.rows.value.length
    ), s = f(() => n.value > 0 && !a.value);
    return (o, l) => (u(), h("input", {
      class: "dc-tick",
      type: "checkbox",
      checked: a.value,
      indeterminate: s.value,
      "aria-label": "Select every row on this page",
      title: "Select every row on this page",
      onChange: l[0] || (l[0] = (i) => $(t).selectPage(!a.value))
    }, null, 40, vo));
  }
}), po = { class: "dc-pick" }, ho = ["id"], mo = ["id", "aria-expanded", "aria-labelledby", "data-dc-value"], yo = { class: "dc-pick__label" }, _o = /* @__PURE__ */ q({
  __name: "PickControl",
  props: {
    modelValue: {},
    options: {},
    label: {},
    mono: { type: Boolean }
  },
  emits: ["update:modelValue", "open", "close"],
  setup(e, { emit: t }) {
    const n = e, a = t, s = Rt() ?? "dc-pick", o = N(null), l = N(null), i = N(null), r = N(!1), c = f(() => i.value !== null), d = N(null), m = f(
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
    function k(_) {
      const T = o.value?.getBoundingClientRect();
      T && (d.value = o.value?.closest(".dc-shell") ?? document.body, i.value = { x: T.left, y: T.bottom + 4, mirrorX: T.right }, r.value = _, a("open"));
    }
    function p(_) {
      i.value && a("close"), i.value = null, _ && o.value?.focus();
    }
    function w() {
      c.value ? p(!0) : k(!1);
    }
    function L(_) {
      _.key !== "ArrowDown" && _.key !== "ArrowUp" || c.value || (_.preventDefault(), k(!0));
    }
    function g(_) {
      const T = _.target;
      T && (o.value?.contains(T) || l.value?.root?.contains(T) || p(!1));
    }
    se(c, (_) => {
      _ ? window.addEventListener("pointerdown", g, !0) : window.removeEventListener("pointerdown", g, !0);
    }), me(() => window.removeEventListener("pointerdown", g, !0));
    function v(_) {
      p(!0), !(_.id === void 0 || _.id === n.modelValue) && a("update:modelValue", _.id);
    }
    return (_, T) => (u(), h("span", po, [
      S("span", {
        id: `${$(s)}-name`,
        class: "dc-pick__name"
      }, P(e.label), 9, ho),
      S("button", {
        id: `${$(s)}-value`,
        ref_key: "trigger",
        ref: o,
        type: "button",
        class: ue(["dc-pick__button", { "dc-mono": e.mono }]),
        "aria-haspopup": "menu",
        "aria-expanded": c.value,
        "aria-labelledby": `${$(s)}-name ${$(s)}-value`,
        "data-dc-value": e.modelValue,
        onClick: w,
        onKeydown: L
      }, [
        S("span", yo, P(m.value?.label), 1)
      ], 42, mo),
      T[1] || (T[1] = S("svg", {
        class: "dc-pick__mark",
        viewBox: "0 0 16 16",
        "aria-hidden": "true"
      }, [
        S("path", { d: "M4 6l4 4 4-4" })
      ], -1)),
      i.value && d.value ? (u(), A(ot, {
        key: 0,
        to: d.value
      }, [
        U($(La), {
          ref_key: "menu",
          ref: l,
          class: "dc-pick__list",
          style: oe(x.value),
          items: b.value,
          at: i.value,
          label: e.label,
          autofocus: r.value,
          onChoose: v,
          onDismiss: T[0] || (T[0] = (B) => p(!0))
        }, null, 8, ["style", "items", "at", "label", "autofocus"])
      ], 8, ["to"])) : M("", !0)
    ]));
  }
}), kt = /* @__PURE__ */ j(_o, [["__scopeId", "data-v-9883dc22"]]), go = {
  class: "dc-pager",
  "aria-label": "Pages"
}, wo = ["title"], ko = ["value", "onKeydown"], bo = {
  class: "dc-pager__total",
  "aria-hidden": "true"
}, $o = {
  class: "dc-pager__sr",
  "aria-live": "polite"
}, xo = /* @__PURE__ */ q({
  __name: "ShellPager",
  props: {
    pagesNote: {}
  },
  setup(e) {
    const t = e, n = Z(), a = f(() => n.liveQuery.value.page), s = f(
      () => `${n.counting.value ? "~" : ""}${Ee(n.pageCount.value)}`
    ), o = f(() => {
      let x = `Page ${Ee(a.value)} of ${s.value}`;
      const k = n.rows.value.length;
      if (k) {
        const p = n.offset.value + 1, w = `${n.counting.value ? "~" : ""}${Ee(n.total.value)}`;
        x += ` — rows ${Ee(p)} to ${Ee(p + k - 1)} of ${w}`;
      }
      return t.pagesNote ? `${x}
${t.pagesNote}` : x;
    }), l = N(null), i = f(() => l.value ?? String(a.value)), r = f(
      () => `calc(${Math.max(2, String(n.pageCount.value).length)}ch + 10px)`
    );
    function c(x) {
      x.target.select();
    }
    function d(x) {
      const k = x.target, p = k.value.replace(/[^0-9]/g, "");
      k.value !== p && (k.value = p), l.value = p;
    }
    function m(x) {
      const k = x.target, p = Number(l.value);
      l.value = null;
      const w = Number.isFinite(p) && p >= 1 ? Math.min(Math.trunc(p), Math.max(1, n.pageCount.value)) : a.value;
      k.value = String(w), w !== a.value && n.setPage(w);
    }
    function b(x) {
      const k = x.target;
      l.value = null, k.value = String(a.value), k.blur();
    }
    return (x, k) => (u(), h("nav", go, [
      U(ne, {
        class: "dc-pager__step",
        "aria-label": "Previous page",
        href: a.value > 1 ? $(n).hrefFor({ page: a.value - 1 }) : null,
        disabled: a.value <= 1,
        onPress: k[0] || (k[0] = (p) => $(n).setPage(a.value - 1))
      }, {
        default: G(() => [...k[2] || (k[2] = [
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
          style: oe({ width: r.value }),
          value: i.value,
          onFocus: c,
          onInput: d,
          onKeydown: [
            ze(Se(m, ["prevent"]), ["enter"]),
            ze(Se(b, ["prevent"]), ["esc"])
          ],
          onBlur: m
        }, null, 44, ko),
        S("span", bo, "/ " + P(s.value), 1)
      ], 8, wo),
      S("span", $o, P(o.value), 1),
      U(ne, {
        class: "dc-pager__step",
        "aria-label": "Next page",
        href: a.value < $(n).pageCount.value ? $(n).hrefFor({ page: a.value + 1 }) : null,
        disabled: a.value >= $(n).pageCount.value,
        onPress: k[1] || (k[1] = (p) => $(n).setPage(a.value + 1))
      }, {
        default: G(() => [...k[3] || (k[3] = [
          S("span", { "aria-hidden": "true" }, "›", -1)
        ])]),
        _: 1
      }, 8, ["href", "disabled"])
    ]));
  }
}), So = /* @__PURE__ */ j(xo, [["__scopeId", "data-v-de0ab034"]]), Co = {
  key: 2,
  class: "dc-actions__order"
}, Po = {
  key: 3,
  class: "dc-actions__select"
}, Eo = {
  key: 0,
  class: "dc-actions__all"
}, Lo = {
  class: "dc-actions__count",
  "aria-live": "polite"
}, To = {
  key: 1,
  class: "dc-actions__count dc-actions__all",
  "aria-live": "polite"
}, Mo = { class: "dc-actions__ops" }, Oo = ["disabled"], Ao = ["data-dc-operation", "disabled", "onClick"], No = ["disabled"], Io = "…", Ro = /* @__PURE__ */ q({
  __name: "RecordActions",
  props: {
    views: {},
    typeChooser: {},
    selectionPlacement: {},
    pagesNote: {}
  },
  setup(e) {
    const t = e, n = Z(), a = f(
      () => n.hasFacets.value || !!n.liveQuery.value.expr.trim() || !!n.within.value
    ), s = fo({
      source: n.source,
      schema: n.schema,
      // What each type holds of what is on screen, the draft's results included:
      // a count of the committed query would disagree with the rows under it.
      query: n.liveQuery,
      entities: n.entities,
      within: n.within
    });
    function o(V) {
      if (V.key === n.query.value.entity && a.value) return Qe(n.total.value);
      if (s.pristine.value) return Ct(V);
      const I = s.counts.value.get(V.key);
      return I ? I.counted ? `${I.pending ? "~" : ""}${Qe(I.total)}` : Io : Ct(V);
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
      () => (t.views ?? [...Bt]).map((V) => ({
        key: V,
        label: V === "record" ? n.recordView.value?.label ?? an.record : an[V]
      }))
    ), d = f(() => Ht(n.query.value.view, t.views)), m = f(() => c.value.length > 1);
    function b(V) {
      n.setView(V);
    }
    const x = f(
      () => v.value && d.value !== "table" && n.sorts.value.length > 0
    ), k = f(
      () => n.sorts.value.map((V) => ({ key: V.key, label: V.label }))
    ), p = f(() => x.value && k.value.length > 1), w = f(() => n.query.value.dir === "desc"), L = f(
      () => `Sorted by ${n.sort.value.label}, ${w.value ? "descending" : "ascending"}`
    ), g = f(() => n.entity.value), v = f(
      () => !Ln(n.query.value, t.views) && d.value !== "record"
    ), _ = f(
      () => v.value && !n.loading.value && (n.pageCount.value > 1 || !!t.pagesNote)
    ), T = f(() => n.selection.value.ids.length), B = f(
      () => v.value && n.selectable.value && (n.rows.value.length > 0 || T.value > 0)
    ), ae = f(() => d.value === "table"), D = f(
      () => i.value || m.value || x.value || _.value || v.value && (B.value || !!(g.value?.create || g.value?.duplicate || g.value?.delete || g.value?.operations?.length))
    ), K = f(() => T.value ? `${T.value} selected` : ae.value ? "" : "Select all"), ee = f(() => t.selectionPlacement === "end");
    function re(V) {
      return T.value ? V.endsWith("…") ? `${V.slice(0, -1)} ${T.value}…` : `${V} ${T.value}` : V;
    }
    return (V, Y) => D.value ? (u(), h("div", {
      key: 0,
      class: ue(["dc-actions", { "dc-actions--selection-end": ee.value }])
    }, [
      i.value ? (u(), A(kt, {
        key: 0,
        class: "dc-actions__pick dc-actions__type",
        label: "Type",
        "model-value": $(n).query.value.entity ?? "",
        options: l.value,
        onOpen: $(s).refresh,
        onClose: $(s).cancel,
        "onUpdate:modelValue": r
      }, null, 8, ["model-value", "options", "onOpen", "onClose"])) : M("", !0),
      m.value ? (u(), A(kt, {
        key: 1,
        class: "dc-actions__pick dc-actions__view",
        label: "View",
        "model-value": d.value,
        options: c.value,
        "onUpdate:modelValue": b
      }, null, 8, ["model-value", "options"])) : M("", !0),
      x.value ? (u(), h("span", Co, [
        p.value ? (u(), A(kt, {
          key: 0,
          class: "dc-actions__pick dc-actions__sort",
          label: "Sort",
          "model-value": $(n).sort.value.key,
          options: k.value,
          "onUpdate:modelValue": $(n).setSort
        }, null, 8, ["model-value", "options", "onUpdate:modelValue"])) : M("", !0),
        U(ne, {
          class: "dc-actions__dir",
          "aria-label": L.value,
          title: L.value,
          href: $(n).hrefFor({ dir: w.value ? "asc" : "desc" }),
          onPress: Y[0] || (Y[0] = (I) => $(n).toggleDirection())
        }, {
          default: G(() => [
            J(P(w.value ? "↓" : "↑"), 1)
          ]),
          _: 1
        }, 8, ["aria-label", "title", "href"])
      ])) : M("", !0),
      B.value && K.value ? (u(), h("div", Po, [
        ae.value ? (u(), h("span", To, P(K.value), 1)) : (u(), h("label", Eo, [
          U(la),
          S("span", Lo, P(K.value), 1)
        ])),
        T.value ? (u(), h("button", {
          key: 2,
          type: "button",
          class: ue(["dc-actions__clear", { "dc-actions__clear--op": ee.value }]),
          onClick: Y[1] || (Y[1] = (I) => $(n).clearSelection())
        }, " Clear ", 2)) : M("", !0)
      ])) : M("", !0),
      S("div", Mo, [
        g.value?.create ? (u(), A(ne, {
          key: 0,
          class: "dc-actions__op dc-actions__new",
          href: $(n).createHref?.(g.value),
          onPress: Y[2] || (Y[2] = (I) => $(n).create(g.value))
        }, {
          default: G(() => [
            Y[5] || (Y[5] = S("span", {
              class: "dc-actions__plus",
              "aria-hidden": "true"
            }, "+", -1)),
            J(" " + P(g.value.create), 1)
          ]),
          _: 1
        }, 8, ["href"])) : M("", !0),
        g.value?.duplicate ? (u(), h("button", {
          key: 1,
          type: "button",
          class: "dc-actions__op",
          disabled: !T.value,
          onClick: Y[3] || (Y[3] = (I) => $(n).duplicate())
        }, P(re(g.value.duplicate)), 9, Oo)) : M("", !0),
        (u(!0), h(W, null, X(g.value?.operations ?? [], (I) => (u(), h("button", {
          key: I.key,
          type: "button",
          class: "dc-actions__op",
          "data-dc-operation": I.key,
          disabled: !T.value && I.selection !== !1,
          onClick: (E) => $(n).operate(I.key)
        }, P(I.selection === !1 ? I.label : re(I.label)), 9, Ao))), 128)),
        g.value?.delete ? (u(), h("button", {
          key: 2,
          type: "button",
          class: "dc-actions__op dc-actions__danger",
          disabled: !T.value,
          onClick: Y[4] || (Y[4] = (I) => $(n).delete())
        }, P(re(g.value.delete)), 9, No)) : M("", !0)
      ]),
      _.value ? (u(), A(So, {
        key: 4,
        class: "dc-actions__pages",
        "pages-note": e.pagesNote
      }, null, 8, ["pages-note"])) : M("", !0)
    ], 2)) : M("", !0);
  }
}), ra = /* @__PURE__ */ j(Ro, [["__scopeId", "data-v-9ad7a44f"]]);
function Bo(e, t) {
  if (!e) return null;
  const n = ce(e, t);
  return typeof n == "string" && n.trim() ? n : null;
}
const Ho = (e) => e == null || typeof e == "string" && !e.trim();
function Fo(e, t) {
  const n = de(t, "state"), a = de(t, "tint");
  return {
    identity: Ue(de(t, "identity"), e),
    reference: Ue(de(t, "reference"), e),
    metrics: Tn(t, "metric").map((s) => ({
      column: s,
      label: s.label ?? "",
      text: Ce(s, e)
    })),
    facts: t.filter((s) => s.cardLabel && !Ho(ce(s, e))).map((s) => ({
      column: s,
      label: s.cardLabel,
      title: [s.label, s.hint].filter(Boolean).join(" — "),
      text: Ce(s, e)
    })),
    state: n ? ce(n, e) ?? null : null,
    updated: Ue(de(t, "updated"), e),
    image: Bo(de(t, "image"), e),
    tint: a ? ce(a, e) ?? null : null
  };
}
function ia(e, t, n, a, s = !1) {
  const o = n?.columns ?? [];
  return {
    row: e,
    key: za(e, t),
    entityLabel: e.entityLabel,
    entity: n,
    columns: o,
    ordinal: Na(t),
    parts: Fo(e, o),
    pinned: a,
    selected: s
  };
}
function $e() {
  const e = Z(), t = f(
    () => new Map(e.entities.value.map((n) => [n.key, n]))
  );
  return f(
    () => e.rows.value.map(
      (n, a) => ia(
        n,
        e.offset.value + a,
        t.value.get(n.entityKey) ?? null,
        e.isPinned(n),
        e.isSelected(n)
      )
    )
  );
}
const qo = ["data-dc-status", "data-dc-tone"], Vo = /* @__PURE__ */ q({
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
    }, P(n.value), 9, qo));
  }
}), Ve = /* @__PURE__ */ j(Vo, [["__scopeId", "data-v-686eb9b6"]]), Do = { key: 1 }, Ko = /* @__PURE__ */ q({
  __name: "MetricDrill",
  props: {
    entry: {},
    column: {}
  },
  setup(e) {
    const t = e, n = Z(), a = f(() => !t.entry.entity?.scope || !t.column.drill ? null : n.entities.value.find((c) => c.key === t.column.drill) ?? null), s = f(() => t.column.label ?? ""), o = f(() => Ce(t.column, t.entry.row)), l = f(() => a.value ? n.drillHref(t.entry.row, a.value) : null);
    function i(r, c) {
      c.stopPropagation(), a.value && n.drill(t.entry.row, a.value, r);
    }
    return (r, c) => a.value ? (u(), A(ne, {
      key: 0,
      class: "dc-drill",
      href: l.value,
      title: `${s.value} of ${e.entry.parts.identity} — show the ${a.value.label.toLowerCase()}`,
      onPress: i
    }, {
      default: G(() => [
        Q(r.$slots, "default", {}, () => [
          J(P(o.value), 1)
        ], !0)
      ]),
      _: 3
    }, 8, ["href", "title"])) : (u(), h("span", Do, [
      Q(r.$slots, "default", {}, () => [
        J(P(o.value), 1)
      ], !0)
    ]));
  }
}), De = /* @__PURE__ */ j(Ko, [["__scopeId", "data-v-d3e7f4e0"]]), Wo = ["data-dc-active", "aria-pressed", "aria-label"], jo = /* @__PURE__ */ q({
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
    return (s, o) => (u(), h("button", {
      type: "button",
      class: "dc-star",
      "data-dc-active": e.pinned ? "true" : "false",
      "aria-pressed": e.pinned,
      "aria-label": e.pinned ? `Unpin ${e.name}` : `Pin ${e.name}`,
      onClick: a
    }, P(e.pinned ? "★" : "☆"), 9, Wo));
  }
}), Gt = /* @__PURE__ */ j(jo, [["__scopeId", "data-v-ef63d763"]]), Uo = ["src"], zo = /* @__PURE__ */ q({
  __name: "RowPicture",
  props: {
    src: {}
  },
  setup(e) {
    const t = e, n = N(!1);
    return se(
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
      onError: s[0] || (s[0] = (o) => n.value = !0)
    }, null, 40, Uo)) : M("", !0);
  }
}), mt = /* @__PURE__ */ j(zo, [["__scopeId", "data-v-afaab300"]]), Qo = ["data-dc-standing", "title", "aria-label"], Go = /* @__PURE__ */ q({
  __name: "QueryMark",
  props: {
    entry: {}
  },
  setup(e) {
    const t = e, n = Z(), a = f(() => vt(t.entry.entity, t.entry.row)), s = f(() => Ut(n.query.value.expr, a.value)), o = f(
      () => s.value === "in" ? `The query narrows to ${t.entry.parts.identity} — press to lift that` : `The query leaves out ${t.entry.parts.identity} — press to lift that`
    );
    function l(i) {
      i.stopPropagation(), n.setExpression(zn(n.query.value.expr, a.value));
    }
    return (i, r) => s.value ? (u(), h("button", {
      key: 0,
      type: "button",
      class: "dc-standing",
      "data-dc-standing": s.value,
      title: o.value,
      "aria-label": o.value,
      onClick: l
    }, P(s.value === "in" ? "+" : "−"), 9, Qo)) : M("", !0);
  }
}), Yt = /* @__PURE__ */ j(Go, [["__scopeId", "data-v-4b8d4166"]]), Yo = ["aria-label"], Xo = ["data-dc-standing", "data-dc-active", "aria-checked", "title", "aria-label", "onClick"], Jo = /* @__PURE__ */ q({
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
    return (i, r) => (u(), h("span", {
      class: "dc-standing-control",
      role: "radiogroup",
      "aria-label": `Where the query stands on ${e.name}`
    }, [
      (u(!0), h(W, null, X(s.value, (c) => (u(), h("button", {
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
      }, P(c.sign), 9, Xo))), 128))
    ], 8, Yo));
  }
}), Ot = /* @__PURE__ */ j(Jo, [["__scopeId", "data-v-5524dca6"]]), ca = /* @__PURE__ */ q({
  __name: "RowStanding",
  props: {
    entry: {}
  },
  setup(e) {
    const t = e, n = Z(), a = f(() => vt(t.entry.entity, t.entry.row)), s = f(() => Ut(n.query.value.expr, a.value));
    function o(l) {
      n.setExpression(Tt(n.query.value.expr, a.value, l));
    }
    return (l, i) => a.value !== null ? (u(), A(Ot, {
      key: 0,
      class: "dc-row-standing",
      standing: s.value,
      name: e.entry.parts.identity,
      onSet: o
    }, null, 8, ["standing", "name"])) : M("", !0);
  }
}), Zo = ["href", "title", "aria-label"], el = /* @__PURE__ */ q({
  __name: "OpenMark",
  props: {
    entry: {}
  },
  setup(e) {
    const t = e, n = Z(), a = f(() => {
      const s = t.entry.row, o = n.recordHref?.(s) ?? null;
      return o ? n.pressHref(s) === o ? null : o : null;
    });
    return (s, o) => a.value ? (u(), h("a", {
      key: 0,
      class: "dc-open",
      href: a.value,
      target: "_blank",
      rel: "noopener noreferrer",
      title: a.value,
      "aria-label": `Open ${e.entry.parts.identity} in a new tab`,
      onClick: o[0] || (o[0] = Se(() => {
      }, ["stop"]))
    }, "↗", 8, Zo)) : M("", !0);
  }
}), Ke = /* @__PURE__ */ j(el, [["__scopeId", "data-v-b00f390d"]]), tl = /* @__PURE__ */ q({
  __name: "ScopeMark",
  props: {
    entry: {}
  },
  setup(e) {
    const t = e, n = Z(), a = f(
      () => n.narrowsOnPress.value ? null : t.entry.entity?.scope ?? null
    ), s = N(null);
    function o(d) {
      s.value = ht(d).exclude ? "out" : "in";
    }
    function l(d) {
      o(d), window.addEventListener("keydown", o), window.addEventListener("keyup", o);
    }
    function i() {
      s.value = null, window.removeEventListener("keydown", o), window.removeEventListener("keyup", o);
    }
    me(i);
    const r = f(() => a.value ? n.drillHref(t.entry.row, null) : null);
    function c(d, m) {
      m.stopPropagation(), n.drill(t.entry.row, null, d);
    }
    return (d, m) => a.value ? (u(), A(ne, {
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
      default: G(() => [...m[0] || (m[0] = [
        J(" → ", -1)
      ])]),
      _: 1
    }, 8, ["href", "data-dc-pending", "title", "aria-label"])) : M("", !0);
  }
}), We = /* @__PURE__ */ j(tl, [["__scopeId", "data-v-05d2c233"]]), nl = ["checked", "aria-label"], xe = /* @__PURE__ */ q({
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
    return (s, o) => (u(), h("input", {
      class: "dc-tick",
      type: "checkbox",
      checked: e.selected,
      "aria-label": `Select ${e.name}`,
      onClick: a
    }, null, 8, nl));
  }
}), al = { class: "dc-card__top dc-mono" }, sl = { class: "dc-card__lead" }, ol = {
  key: 2,
  class: "dc-card__entity"
}, ll = { class: "dc-card__top-right" }, rl = { class: "dc-card__names" }, il = { class: "dc-card__primary" }, cl = {
  key: 0,
  class: "dc-card__secondary dc-mono"
}, ul = {
  key: 1,
  class: "dc-card__facts dc-mono"
}, dl = ["title"], fl = { class: "dc-card__fact-label" }, vl = {
  key: 0,
  class: "dc-card__metrics dc-mono"
}, pl = {
  key: 0,
  class: "dc-card__date"
}, hl = /* @__PURE__ */ q({
  __name: "CardsView",
  setup(e) {
    const t = Z(), n = $e(), a = f(() => t.isEverything.value), s = (l) => l.entity?.card === "picture", o = f(() => n.value.length > 0 && n.value.every(s));
    return (l, i) => (u(), h("div", {
      class: ue(["dc-cards", { "dc-cards--pictures": o.value }])
    }, [
      (u(!0), h(W, null, X($(n), (r) => (u(), h("div", {
        key: r.key,
        class: ue(["dc-card", { "dc-card--picture": s(r) }])
      }, [
        S("div", al, [
          S("span", sl, [
            $(t).selectable.value ? (u(), A(xe, {
              key: 0,
              row: r.row,
              selected: r.selected,
              name: r.parts.identity
            }, null, 8, ["row", "selected", "name"])) : M("", !0),
            s(r) ? M("", !0) : (u(), h(W, { key: 1 }, [
              J(P(r.ordinal), 1)
            ], 64)),
            a.value ? (u(), h("span", ol, P(r.entityLabel), 1)) : M("", !0)
          ]),
          S("span", ll, [
            r.parts.state && !s(r) ? (u(), A(Ve, {
              key: 0,
              status: r.parts.state
            }, null, 8, ["status"])) : M("", !0),
            s(r) ? (u(), A(Yt, {
              key: 1,
              entry: r
            }, null, 8, ["entry"])) : (u(), A(ca, {
              key: 2,
              entry: r
            }, null, 8, ["entry"])),
            U(We, { entry: r }, null, 8, ["entry"]),
            U(Ke, { entry: r }, null, 8, ["entry"]),
            $(t).pinnable.value ? (u(), A(Gt, {
              key: 3,
              row: r.row,
              name: r.parts.identity,
              pinned: r.pinned
            }, null, 8, ["row", "name", "pinned"])) : M("", !0)
          ])
        ]),
        U(ne, {
          class: "dc-card__open",
          href: $(t).pressHref(r.row),
          onPress: (c) => $(t).activate(r.row, c)
        }, {
          default: G(() => [
            r.parts.image ? (u(), A(mt, {
              key: 0,
              class: "dc-card__image",
              src: r.parts.image
            }, null, 8, ["src"])) : M("", !0),
            S("span", rl, [
              S("span", il, P(r.parts.identity), 1),
              s(r) ? M("", !0) : (u(), h("span", cl, P(r.parts.reference), 1)),
              r.parts.facts.length ? (u(), h("span", ul, [
                (u(!0), h(W, null, X(r.parts.facts, (c) => (u(), h("span", {
                  key: c.column.key ?? c.label,
                  class: "dc-card__fact",
                  title: c.title || void 0
                }, [
                  S("span", fl, P(c.label), 1),
                  J(" " + P(c.text), 1)
                ], 8, dl))), 128))
              ])) : M("", !0)
            ])
          ]),
          _: 2
        }, 1032, ["href", "onPress"]),
        s(r) ? M("", !0) : (u(), h("div", vl, [
          (u(!0), h(W, null, X(r.parts.metrics.slice(0, 2), (c) => (u(), A(De, {
            key: c.column.key ?? c.label,
            entry: r,
            column: c.column
          }, {
            default: G(() => [
              J(P(c.label) + " " + P(c.text), 1)
            ]),
            _: 2
          }, 1032, ["entry", "column"]))), 128)),
          r.parts.updated ? (u(), h("span", pl, P(r.parts.updated), 1)) : M("", !0)
        ]))
      ], 2))), 128))
    ], 2));
  }
}), ua = /* @__PURE__ */ j(hl, [["__scopeId", "data-v-fd252138"]]), ml = { class: "dc-grid" }, yl = { class: "dc-tile__scrim" }, _l = { class: "dc-tile__top dc-mono" }, gl = { class: "dc-tile__chip" }, wl = { class: "dc-tile__caption" }, kl = { class: "dc-tile__secondary dc-truncate" }, bl = { class: "dc-tile__primary" }, $l = /* @__PURE__ */ q({
  __name: "GridView",
  setup(e) {
    const t = Z(), n = $e();
    return (a, s) => (u(), h("div", ml, [
      (u(!0), h(W, null, X($(n), (o) => (u(), h("div", {
        key: o.key,
        class: "dc-grid__cell"
      }, [
        U(ne, {
          class: "dc-tile",
          style: oe({ "--dc-tile-tint": o.parts.tint ?? void 0 }),
          href: $(t).pressHref(o.row),
          onPress: (l) => $(t).activate(o.row, l)
        }, {
          default: G(() => [
            o.parts.image ? (u(), A(mt, {
              key: 0,
              class: "dc-tile__image",
              src: o.parts.image
            }, null, 8, ["src"])) : M("", !0),
            S("span", yl, [
              S("span", _l, [
                S("span", gl, P(o.ordinal), 1)
              ]),
              S("span", wl, [
                S("span", kl, P(o.parts.reference), 1),
                S("span", bl, P(o.parts.identity), 1)
              ])
            ])
          ]),
          _: 2
        }, 1032, ["style", "href", "onPress"]),
        $(t).selectable.value ? (u(), A(xe, {
          key: 0,
          class: "dc-grid__tick",
          row: o.row,
          selected: o.selected,
          name: o.parts.identity
        }, null, 8, ["row", "selected", "name"])) : M("", !0)
      ]))), 128))
    ]));
  }
}), da = /* @__PURE__ */ j($l, [["__scopeId", "data-v-89c40a9e"]]);
function _n(e, t, n, a) {
  return (n - a * (t - 1)) / e;
}
function bt(e, t) {
  return e > 0 ? Math.min(t, e) : t;
}
function xl(e) {
  return e > 0 ? e : 1 / 0;
}
function Sl(e, t, n) {
  const { width: a, height: s, gap: o = 0 } = n;
  if (!e.length) return [];
  if (!(a > 0) || !(s > 0)) return [{ items: [...e], height: s, filled: !1 }];
  const l = [];
  let i = [], r = 0, c = 0;
  for (const d of e) {
    const m = t(d), b = Math.max(m.ratio, Number.EPSILON), x = m.height && m.height > 0 ? Math.max(c, m.height) : c, k = bt(x, s), p = _n(r + b, i.length + 1, a, o);
    if (p > k) {
      i.push(d), r += b, c = x;
      continue;
    }
    const w = bt(c, s), L = i.length ? _n(r, i.length, a, o) : 1 / 0;
    L <= xl(c) && L - w < k - p ? (l.push({ items: i, height: L, filled: !0 }), i = [d], r = b, c = m.height && m.height > 0 ? m.height : 0) : (l.push({ items: [...i, d], height: p, filled: !0 }), i = [], r = 0, c = 0);
  }
  return i.length && l.push({ items: i, height: bt(c, s), filled: !1 }), l;
}
const Cl = { class: "dc-images" }, Pl = {
  key: 1,
  class: "dc-images__blank",
  "aria-hidden": "true"
}, El = 240, je = 8, Ll = 1, Tl = /* @__PURE__ */ q({
  __name: "ImagesView",
  setup(e) {
    const t = Z(), n = $e(), a = Jt(/* @__PURE__ */ new Map()), s = Jt(/* @__PURE__ */ new Set());
    function o(k, p) {
      const w = p.target;
      w.naturalWidth > 0 && w.naturalHeight > 0 && a.set(k, { width: w.naturalWidth, height: w.naturalHeight });
    }
    function l(k) {
      const p = k.parts.image;
      return p && !s.has(p) ? p : null;
    }
    function i(k) {
      const p = l(k);
      return p ? a.get(p) : void 0;
    }
    function r(k) {
      const p = i(k);
      return p ? { ratio: p.width / p.height, height: p.height } : { ratio: Ll };
    }
    const c = N(null), d = N(0);
    let m = null;
    function b() {
      d.value = c.value?.clientWidth ?? 0;
    }
    lt(() => {
      b(), !(!c.value || typeof ResizeObserver > "u") && (m = new ResizeObserver(b), m.observe(c.value));
    }), me(() => {
      m?.disconnect(), m = null;
    });
    const x = f(() => {
      const k = Sl(n.value, r, {
        width: d.value,
        height: El,
        gap: je
      }), p = [];
      let w = 0;
      for (const L of k) {
        let g = 0;
        for (const v of L.items) {
          const _ = r(v).ratio * L.height, T = i(v), B = T !== void 0 && T.height < L.height;
          p.push({
            entry: v,
            style: {
              top: `${w}px`,
              left: `${g}px`,
              width: `${_}px`,
              height: `${L.height}px`
            },
            picture: B ? { width: `${T.width}px`, height: `${T.height}px` } : { width: "100%", height: "100%" }
          }), g += _ + je;
        }
        w += L.height + je;
      }
      return { boxes: p, height: k.length ? w - je : 0 };
    });
    return (k, p) => (u(), h("div", Cl, [
      S("div", {
        ref_key: "wall",
        ref: c,
        class: "dc-images__wall",
        style: oe({ height: `${x.value.height}px` })
      }, [
        (u(!0), h(W, null, X(x.value.boxes, ({ entry: w, style: L, picture: g }) => (u(), h("div", {
          key: w.key,
          class: "dc-images__cell",
          style: oe(L)
        }, [
          U(ne, {
            class: "dc-images__open",
            title: w.parts.identity,
            "aria-label": w.parts.identity,
            href: $(t).pressHref(w.row),
            onPress: (v) => $(t).activate(w.row, v)
          }, {
            default: G(() => [
              l(w) ? (u(), A(mt, {
                key: 0,
                class: "dc-images__picture",
                style: oe(g),
                src: l(w),
                onLoad: (v) => o(l(w), v),
                onError: (v) => s.add(l(w))
              }, null, 8, ["style", "src", "onLoad", "onError"])) : (u(), h("span", Pl, P(w.parts.identity), 1))
            ]),
            _: 2
          }, 1032, ["title", "aria-label", "href", "onPress"]),
          $(t).selectable.value ? (u(), A(xe, {
            key: 0,
            class: "dc-images__tick",
            row: w.row,
            selected: w.selected,
            name: w.parts.identity
          }, null, 8, ["row", "selected", "name"])) : M("", !0)
        ], 4))), 128))
      ], 4)
    ]));
  }
}), fa = /* @__PURE__ */ j(Tl, [["__scopeId", "data-v-2d267370"]]), Ml = { class: "dc-links" }, Ol = { class: "dc-link__primary dc-truncate" }, Al = { class: "dc-link__secondary dc-mono dc-truncate" }, Nl = /* @__PURE__ */ q({
  __name: "LinksView",
  setup(e) {
    const t = Z(), n = $e();
    return (a, s) => (u(), h("div", Ml, [
      (u(!0), h(W, null, X($(n), (o) => (u(), h("span", {
        key: o.key,
        class: "dc-links__item"
      }, [
        $(t).selectable.value ? (u(), A(xe, {
          key: 0,
          row: o.row,
          selected: o.selected,
          name: o.parts.identity
        }, null, 8, ["row", "selected", "name"])) : M("", !0),
        U(ne, {
          class: "dc-link",
          href: $(t).pressHref(o.row),
          onPress: (l) => $(t).activate(o.row, l)
        }, {
          default: G(() => [
            S("span", Ol, P(o.parts.identity), 1),
            S("span", Al, P(o.parts.reference), 1)
          ]),
          _: 2
        }, 1032, ["href", "onPress"])
      ]))), 128))
    ]));
  }
}), va = /* @__PURE__ */ j(Nl, [["__scopeId", "data-v-de6c9a0f"]]), Il = {
  class: "dc-list",
  role: "list"
}, Rl = { class: "dc-list__ordinal dc-mono" }, Bl = { class: "dc-list__identity" }, Hl = { class: "dc-list__primary dc-truncate" }, Fl = { class: "dc-list__secondary dc-mono dc-truncate" }, ql = {
  key: 1,
  class: "dc-list__entity dc-mono"
}, Vl = { class: "dc-list__metrics dc-mono" }, Dl = { class: "dc-list__trailing" }, Kl = /* @__PURE__ */ q({
  __name: "ListView",
  setup(e) {
    const t = Z(), n = $e(), a = f(() => t.isEverything.value);
    return (s, o) => (u(), h("div", Il, [
      (u(!0), h(W, null, X($(n), (l) => (u(), h("div", {
        key: l.key,
        class: "dc-list__row",
        role: "listitem"
      }, [
        $(t).selectable.value ? (u(), A(xe, {
          key: 0,
          class: "dc-list__tick",
          row: l.row,
          selected: l.selected,
          name: l.parts.identity
        }, null, 8, ["row", "selected", "name"])) : M("", !0),
        U(ca, {
          class: "dc-list__standing",
          entry: l
        }, null, 8, ["entry"]),
        U(ne, {
          class: "dc-list__open",
          href: $(t).pressHref(l.row),
          onPress: (i) => $(t).activate(l.row, i)
        }, {
          default: G(() => [
            S("span", Rl, P(l.ordinal), 1),
            S("span", Bl, [
              S("span", Hl, P(l.parts.identity), 1),
              S("span", Fl, P(l.parts.reference), 1)
            ])
          ]),
          _: 2
        }, 1032, ["href", "onPress"]),
        a.value ? (u(), h("span", ql, P(l.entityLabel), 1)) : M("", !0),
        S("span", Vl, [
          (u(!0), h(W, null, X(l.parts.metrics.slice(0, 2), (i) => (u(), A(De, {
            key: i.column.key ?? i.label,
            entry: l,
            column: i.column
          }, null, 8, ["entry", "column"]))), 128))
        ]),
        S("span", Dl, [
          l.parts.state ? (u(), A(Ve, {
            key: 0,
            status: l.parts.state
          }, null, 8, ["status"])) : M("", !0),
          U(We, { entry: l }, null, 8, ["entry"]),
          U(Ke, { entry: l }, null, 8, ["entry"]),
          $(t).pinnable.value ? (u(), A(Gt, {
            key: 1,
            row: l.row,
            name: l.parts.identity,
            pinned: l.pinned
          }, null, 8, ["row", "name", "pinned"])) : M("", !0)
        ])
      ]))), 128))
    ]));
  }
}), At = /* @__PURE__ */ j(Kl, [["__scopeId", "data-v-3d349a10"]]), Wl = { class: "dc-preview" }, jl = { class: "dc-preview__pager dc-mono" }, Ul = ["disabled"], zl = { "aria-live": "polite" }, Ql = ["disabled"], Gl = {
  key: 0,
  class: "dc-preview__card"
}, Yl = ["src"], Xl = { class: "dc-preview__body" }, Jl = { class: "dc-preview__top" }, Zl = { class: "dc-preview__badges" }, er = { class: "dc-preview__entity dc-mono" }, tr = { class: "dc-preview__marks" }, nr = { class: "dc-preview__primary" }, ar = { class: "dc-preview__secondary dc-mono" }, sr = { class: "dc-preview__fields" }, or = { class: "dc-preview__key" }, lr = { class: "dc-preview__value dc-mono" }, rr = /* @__PURE__ */ q({
  __name: "PreviewView",
  setup(e) {
    const t = Z(), n = $e(), a = N(0);
    se(n, (r) => {
      a.value > r.length - 1 && (a.value = Math.max(0, r.length - 1));
    });
    const s = f(() => n.value[a.value]), o = f(() => {
      const r = s.value;
      if (!r) return [];
      const c = de(r.columns, "reference"), d = de(r.columns, "updated");
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
    return (r, c) => (u(), h("div", Wl, [
      S("div", jl, [
        S("button", {
          type: "button",
          class: "dc-preview__step",
          "aria-label": "Previous result",
          disabled: a.value === 0,
          onClick: c[0] || (c[0] = (d) => i(-1))
        }, " ‹ ", 8, Ul),
        S("span", zl, P(l.value), 1),
        S("button", {
          type: "button",
          class: "dc-preview__step",
          "aria-label": "Next result",
          disabled: a.value >= $(n).length - 1,
          onClick: c[1] || (c[1] = (d) => i(1))
        }, " › ", 8, Ql)
      ]),
      s.value ? (u(), h("div", Gl, [
        S("div", {
          class: "dc-preview__media",
          style: oe({ background: s.value.parts.tint ?? void 0 }),
          "aria-hidden": "true"
        }, [
          s.value.parts.image ? (u(), h("img", {
            key: 0,
            class: "dc-preview__image",
            src: s.value.parts.image,
            alt: ""
          }, null, 8, Yl)) : (u(), h(W, { key: 1 }, [
            J(" preview ")
          ], 64))
        ], 4),
        S("div", Xl, [
          S("div", Jl, [
            S("span", Zl, [
              $(t).selectable.value ? (u(), A(xe, {
                key: 0,
                row: s.value.row,
                selected: s.value.selected,
                name: s.value.parts.identity
              }, null, 8, ["row", "selected", "name"])) : M("", !0),
              s.value.parts.state ? (u(), A(Ve, {
                key: 1,
                status: s.value.parts.state
              }, null, 8, ["status"])) : M("", !0),
              S("span", er, P(s.value.entityLabel), 1)
            ]),
            S("span", tr, [
              U(Yt, { entry: s.value }, null, 8, ["entry"]),
              U(We, { entry: s.value }, null, 8, ["entry"]),
              U(Ke, { entry: s.value }, null, 8, ["entry"]),
              $(t).pinnable.value ? (u(), A(Gt, {
                key: 0,
                row: s.value.row,
                name: s.value.parts.identity,
                pinned: s.value.pinned
              }, null, 8, ["row", "name", "pinned"])) : M("", !0)
            ])
          ]),
          S("div", null, [
            S("div", nr, P(s.value.parts.identity), 1),
            S("div", ar, P(s.value.parts.reference), 1)
          ]),
          S("dl", sr, [
            (u(!0), h(W, null, X(o.value, (d) => (u(), h("div", {
              key: d.key,
              class: "dc-preview__field"
            }, [
              S("dt", or, P(d.key), 1),
              S("dd", lr, [
                d.column && s.value ? (u(), A(De, {
                  key: 0,
                  entry: s.value,
                  column: d.column
                }, null, 8, ["entry", "column"])) : (u(), h(W, { key: 1 }, [
                  J(P(d.value), 1)
                ], 64))
              ])
            ]))), 128))
          ]),
          U(ne, {
            class: "dc-preview__open",
            href: s.value ? $(t).pressHref(s.value.row) : null,
            onPress: c[2] || (c[2] = (d) => s.value && $(t).activate(s.value.row, d))
          }, {
            default: G(() => [...c[3] || (c[3] = [
              J(" Open record → ", -1)
            ])]),
            _: 1
          }, 8, ["href"])
        ])
      ])) : M("", !0)
    ]));
  }
}), pa = /* @__PURE__ */ j(rr, [["__scopeId", "data-v-59e0d33b"]]);
function ir() {
  const e = Z();
  return f(() => ja(e.schema.value, e.entity.value));
}
const cr = /* @__PURE__ */ q({
  __name: "ColumnCell",
  props: {
    column: {},
    entry: {}
  },
  setup(e) {
    const t = e, n = Z(), a = f(() => t.column.kind ?? "text"), s = f(() => ce(t.column, t.entry.row)), o = f(
      () => a.value === "ordinal" ? t.entry.ordinal : Ce(t.column, t.entry.row)
    ), l = f(() => s.value), i = f(() => t.column.activate === !0 || !!t.column.click), r = f(() => Pt(t.column)), c = f(() => Mn(t.column, t.entry.row));
    function d(x) {
      i.value && (x.stopPropagation(), m(ht(x)));
    }
    function m(x) {
      t.column.click?.(t.entry.row, x), t.column.activate && n.activate(t.entry.row, x);
    }
    const b = f(
      () => t.column.activate && !t.column.click ? n.pressHref(t.entry.row) : null
    );
    return (x, k) => a.value === "component" && e.column.component ? (u(), A(Oe(e.column.component), {
      key: 0,
      row: e.entry.row,
      entry: e.entry,
      value: s.value,
      column: e.column
    }, null, 8, ["row", "entry", "value", "column"])) : a.value === "status" ? (u(), A(Ve, {
      key: 1,
      status: l.value
    }, null, 8, ["status"])) : a.value === "image" ? (u(), A(mt, {
      key: 2,
      class: "dc-cell__image",
      src: typeof s.value == "string" ? s.value : "",
      style: oe({ maxHeight: e.column.height }),
      onClick: d
    }, null, 8, ["src", "style"])) : e.column.drill ? (u(), A(De, {
      key: 3,
      entry: e.entry,
      column: e.column
    }, null, 8, ["entry", "column"])) : i.value ? (u(), A(ne, {
      key: 4,
      class: ue(["dc-table__open", { "dc-truncate": r.value }]),
      href: b.value,
      title: c.value,
      onPress: k[0] || (k[0] = (p, w) => {
        w.stopPropagation(), m(p);
      })
    }, {
      default: G(() => [
        J(P(o.value), 1)
      ]),
      _: 1
    }, 8, ["class", "href", "title"])) : (u(), h("span", {
      key: 5,
      class: ue(["dc-cell__text", { "dc-truncate": r.value }])
    }, P(o.value), 3));
  }
}), gn = /* @__PURE__ */ j(cr, [["__scopeId", "data-v-3196ba40"]]), ur = {
  key: 0,
  class: "dc-table__none"
}, dr = { class: "dc-table__detail" }, fr = ["data-dc-wrap", "data-dc-row-links"], vr = {
  key: 0,
  class: "dc-table__pick",
  scope: "col"
}, pr = {
  key: 1,
  class: "dc-table__standing",
  scope: "col"
}, hr = ["data-dc-align", "data-dc-hide", "aria-sort", "title"], mr = {
  key: 2,
  class: "dc-table__head"
}, yr = ["onClick"], _r = {
  key: 0,
  class: "dc-table__pick"
}, gr = {
  key: 1,
  class: "dc-table__standing"
}, wr = ["data-dc-align", "data-dc-hide", "title"], kr = {
  key: 1,
  class: "dc-table__name"
}, br = /* @__PURE__ */ q({
  __name: "TableView",
  setup(e) {
    const t = Z(), n = $e(), a = ir();
    function s(E, F) {
      const y = t.pressHref(E);
      if (y && Qn(F)) {
        const O = F.shiftKey ? `noopener,popup,width=${window.outerWidth},height=${window.outerHeight}` : "noopener";
        window.open(y, "_blank", O);
        return;
      }
      t.activate(E, ht(F));
    }
    const o = f(() => t.rowLinks?.value ? new Map(n.value.map((E) => [E.key, t.pressHref(E.row)])) : /* @__PURE__ */ new Map()), l = f(
      () => a.value.find((E) => E.role === "identity") ?? a.value[0]
    );
    function i(E, F, y) {
      y.stopPropagation(), t.activate(E, F);
    }
    function r(E) {
      const F = Rn(E, t.entity.value, t.schema.value), y = F ? `Shortcut: ${F}` : void 0;
      return [E.hint, y].filter(Boolean).join(`
`) || void 0;
    }
    const c = f(() => {
      const E = a.value.find((y) => y.scope);
      return E || ((t.entity.value ? !!t.entity.value.href : t.entities.value.some((y) => y.href)) ? a.value.find((y) => y.activate) : void 0);
    }), d = f(
      () => t.entity.value ? !!t.entity.value.scope : t.entities.value.some((E) => E.scope)
    ), m = (E) => vt(E.entity, E.row), b = (E) => Ut(t.query.value.expr, m(E));
    function x(E, F) {
      t.setExpression(Tt(t.query.value.expr, m(E), F));
    }
    const k = f(() => {
      const E = n.value.filter((y) => m(y) !== null), F = E.filter((y) => y.selected);
      return F.length ? F : E;
    }), p = f(() => k.value.some((E) => E.selected)), w = f(() => {
      const E = k.value[0];
      return E ? b(E) : null;
    }), L = f(
      () => k.value.some((E) => b(E) !== w.value)
    ), g = f(
      () => p.value ? "the ticked rows" : "every row on this page"
    );
    function v(E) {
      t.setExpression(
        k.value.reduce(
          (F, y) => Tt(F, m(y), E),
          t.query.value.expr
        )
      );
    }
    const _ = f(
      () => a.value.some((E) => E.kind === "image" || E.height !== void 0)
    );
    function T(E) {
      E && (t.query.value.sort === E ? t.toggleDirection() : t.setSort(E));
    }
    function B(E) {
      return E ? t.query.value.sort === E ? t.hrefFor({ dir: t.query.value.dir === "desc" ? "asc" : "desc" }) : t.hrefFor({ sort: E }) : null;
    }
    const ae = f(() => t.entity.value?.label ?? "The result set"), D = f(() => new Set(t.sorts.value.map((E) => E.key))), K = (E) => E.sort !== void 0 && D.value.has(E.sort), ee = (E) => {
      if (K(E))
        return t.query.value.sort !== E.sort ? "none" : t.query.value.dir === "desc" ? "descending" : "ascending";
    };
    function re(E) {
      return [
        ln(E),
        E.muted ? "dc-table__muted" : "",
        E.mono ? "dc-mono" : "",
        Pt(E) ? "dc-truncate" : ""
      ].filter(Boolean).join(" ");
    }
    function V(E, F) {
      if (!(!Pt(E) || E.activate || E.click))
        return Mn(E, F.row);
    }
    const Y = N(null);
    function I(E) {
      Y.value && (Y.value.scrollLeft = E.target.scrollLeft);
    }
    return (E, F) => $(a).length ? (u(), h("table", {
      key: 1,
      class: "dc-table",
      "data-dc-wrap": _.value ? "" : void 0,
      "data-dc-row-links": $(t).rowLinks?.value ? "" : void 0
    }, [
      S("thead", {
        ref_key: "head",
        ref: Y,
        "data-dc-stuck": ""
      }, [
        S("tr", null, [
          $(t).selectable.value ? (u(), h("th", vr, [
            U(la)
          ])) : M("", !0),
          d.value ? (u(), h("th", pr, [
            k.value.length ? (u(), A(Ot, {
              key: 0,
              standing: w.value,
              mixed: L.value,
              name: g.value,
              onSet: v
            }, null, 8, ["standing", "mixed", "name"])) : M("", !0)
          ])) : M("", !0),
          (u(!0), h(W, null, X($(a), (y, O) => (u(), h("th", {
            key: $(sn)(y, O),
            scope: "col",
            class: ue($(ln)(y)),
            style: oe({ width: y.width }),
            "data-dc-align": $(on)(y),
            "data-dc-hide": y.hideBelow,
            "aria-sort": ee(y),
            title: r(y)
          }, [
            K(y) ? (u(), A(ne, {
              key: 0,
              class: "dc-table__sort",
              href: B(y.sort),
              onPress: (H) => T(y.sort)
            }, {
              default: G(() => [
                J(P(y.label), 1)
              ]),
              _: 2
            }, 1032, ["href", "onPress"])) : (u(), h(W, { key: 1 }, [
              J(P(y.label), 1)
            ], 64)),
            y.header ? (u(), h("span", mr, [
              (u(), A(Oe(y.header), {
                column: y,
                entity: $(t).entity.value
              }, null, 8, ["column", "entity"]))
            ])) : M("", !0)
          ], 14, hr))), 128))
        ])
      ], 512),
      S("tbody", {
        "data-dc-scroll": "",
        onScroll: I
      }, [
        (u(!0), h(W, null, X($(n), (y) => (u(), h("tr", {
          key: y.key,
          class: "dc-table__row",
          onClick: (O) => s(y.row, O)
        }, [
          $(t).selectable.value ? (u(), h("td", _r, [
            U(xe, {
              row: y.row,
              selected: y.selected,
              name: y.parts.identity
            }, null, 8, ["row", "selected", "name"])
          ])) : M("", !0),
          d.value ? (u(), h("td", gr, [
            m(y) !== null ? (u(), A(Ot, {
              key: 0,
              standing: b(y),
              name: y.parts.identity,
              onSet: (O) => x(y, O)
            }, null, 8, ["standing", "name", "onSet"])) : M("", !0)
          ])) : M("", !0),
          (u(!0), h(W, null, X($(a), (O, H) => (u(), h("td", {
            key: $(sn)(O, H),
            class: ue(re(O)),
            style: oe({ width: O.width }),
            "data-dc-align": $(on)(O),
            "data-dc-hide": O.hideBelow,
            title: V(O, y)
          }, [
            o.value.get(y.key) ? (u(), A(ne, {
              key: 0,
              class: "dc-table__cell-link",
              href: o.value.get(y.key),
              tabindex: O === l.value ? void 0 : -1,
              "aria-hidden": O === l.value ? void 0 : "true",
              "aria-label": O === l.value ? y.parts.identity : void 0,
              onPress: (te, C) => i(y.row, te, C)
            }, null, 8, ["href", "tabindex", "aria-hidden", "aria-label", "onPress"])) : M("", !0),
            O === c.value ? (u(), h("span", kr, [
              U(gn, {
                column: O,
                entry: y
              }, null, 8, ["column", "entry"]),
              U(We, { entry: y }, null, 8, ["entry"]),
              U(Ke, { entry: y }, null, 8, ["entry"])
            ])) : (u(), A(gn, {
              key: 2,
              column: O,
              entry: y
            }, null, 8, ["column", "entry"]))
          ], 14, wr))), 128))
        ], 8, yr))), 128))
      ], 32)
    ], 8, fr)) : (u(), h("p", ur, [
      F[2] || (F[2] = S("span", { class: "dc-table__headline" }, "No columns declared", -1)),
      S("span", dr, [
        J(P(ae.value) + " has no ", 1),
        F[0] || (F[0] = S("code", null, "columns", -1)),
        F[1] || (F[1] = J(" in the schema, so there is no table to draw. ", -1))
      ])
    ]));
  }
}), ha = /* @__PURE__ */ j(br, [["__scopeId", "data-v-66fa1713"]]);
function $r(e) {
  const t = he([]), n = N(!1), a = he(null);
  let s = 0;
  const o = (r, c, d, m, b) => ({
    entity: r,
    rows: e.limit.value > 0 ? c.rows.map((x, k) => ia(x, k, r, e.isPinned(x.id))) : [],
    total: c.total,
    count: d ? Ct(r) : Qe(c.total),
    pinned: xr(m, c, b)
  }), l = () => {
    const r = ++s, c = e.query.value, d = e.schema.value, m = e.entities.value, b = e.limit.value, x = e.within?.value.trim() ?? "", k = Ft(c) && !x, p = x ? Dt(x, c.expr) : c.expr, w = m.map((L) => ({
      entity: L,
      // Scope the query to this entity, keeping the expression and ordering.
      outcome: e.source.value.query({
        // Each card is the top few of its type, wherever the shell's own
        // result set has been paged to — so this asks for the first page.
        query: { ...c, entity: L.key, expr: p, page: 1 },
        schema: d,
        entity: L,
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
    if (w.every(({ outcome: L }) => !(L instanceof Promise))) {
      t.value = w.map(
        ({ entity: L, outcome: g }) => o(L, g, k, d, p)
      ), a.value = null, n.value = !1;
      return;
    }
    n.value = !0, Promise.all(w.map(({ outcome: L }) => Promise.resolve(L))).then((L) => {
      r === s && (t.value = L.map(
        (g, v) => o(w[v].entity, g, k, d, p)
      ), a.value = null);
    }).catch((L) => {
      r === s && (a.value = L, t.value = []);
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
function xr(e, t, n) {
  const a = t.rows[0];
  if (t.total !== 1 || t.rows.length !== 1 || !a)
    return !1;
  const s = n.trim();
  if (!s)
    return !1;
  const o = Ze(e, a);
  return !!o && qe(s, o) === s;
}
const Sr = ["data-dc-pending", "data-dc-heads-only"], Cr = {
  key: 0,
  class: "dc-types__state",
  role: "alert"
}, Pr = {
  key: 1,
  class: "dc-types__state",
  "aria-live": "polite"
}, Er = {
  key: 2,
  class: "dc-types__state"
}, Lr = ["data-dc-empty"], Tr = { class: "dc-type__name" }, Mr = { class: "dc-type__count dc-mono" }, Or = { class: "dc-type__sr" }, Ar = {
  key: 0,
  class: "dc-type__description"
}, Nr = {
  key: 0,
  class: "dc-type__empty"
}, Ir = { class: "dc-type__identity" }, Rr = { class: "dc-type__primary dc-truncate" }, Br = { class: "dc-type__secondary dc-mono dc-truncate" }, Hr = { class: "dc-type__trailing dc-mono" }, Fr = { class: "dc-type__metric-value" }, qr = { class: "dc-type__metric-label" }, Vr = {
  key: 0,
  class: "dc-type__date"
}, Dr = /* @__PURE__ */ q({
  __name: "TypeCardsView",
  setup(e) {
    const t = Z(), { previews: n, pending: a, error: s } = $r({
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
    return (r, c) => (u(), h("div", {
      class: "dc-types",
      "data-dc-pending": $(a) ? "true" : "false",
      "data-dc-heads-only": l.value ? "true" : "false"
    }, [
      Q(r.$slots, "before", {}, void 0, !0),
      $(s) ? (u(), h("p", Cr, " Could not load results: " + P($(s) instanceof Error ? $(s).message : "the data source failed."), 1)) : !i.value.length && $(a) ? (u(), h("p", Pr, " Running query… ")) : i.value.length ? M("", !0) : (u(), h("p", Er, P(o.value ? "Nothing matches this query" : "Nothing here yet"), 1)),
      (u(!0), h(W, null, X(i.value, (d) => (u(), h("section", {
        key: d.entity.key,
        class: "dc-type",
        "data-dc-empty": d.total ? "false" : "true"
      }, [
        U(ne, {
          class: "dc-type__head",
          href: $(t).entityHref(d.entity.key),
          onPress: (m) => $(t).setEntity(d.entity.key)
        }, {
          default: G(() => [
            S("span", Tr, P(d.entity.label), 1),
            S("span", Mr, P(d.count), 1),
            c[0] || (c[0] = S("span", {
              class: "dc-type__go",
              "aria-hidden": "true"
            }, "→", -1)),
            S("span", Or, "Show only " + P(d.entity.label.toLowerCase()), 1),
            d.entity.description ? (u(), h("span", Ar, P(d.entity.description), 1)) : M("", !0)
          ]),
          _: 2
        }, 1032, ["href", "onPress"]),
        d.total ? M("", !0) : (u(), h("p", Nr, P(o.value ? "No matches" : "Nothing here yet"), 1)),
        (u(!0), h(W, null, X(d.rows, (m) => (u(), h("div", {
          key: m.key,
          class: "dc-type__row"
        }, [
          U(ne, {
            class: "dc-type__open",
            href: $(t).pressHref(m.row),
            onPress: (b) => $(t).activate(m.row, b)
          }, {
            default: G(() => [
              S("span", Ir, [
                S("span", Rr, P(m.parts.identity), 1),
                S("span", Br, P(m.parts.reference), 1)
              ])
            ]),
            _: 2
          }, 1032, ["href", "onPress"]),
          S("span", Hr, [
            (u(!0), h(W, null, X(m.parts.metrics.slice(0, 1), (b) => (u(), A(De, {
              key: b.column.key ?? b.label,
              class: "dc-type__metric",
              entry: m,
              column: b.column
            }, {
              default: G(() => [
                S("span", Fr, P(b.text), 1),
                S("span", qr, P(b.label), 1)
              ]),
              _: 2
            }, 1032, ["entry", "column"]))), 128)),
            m.parts.updated ? (u(), h("span", Vr, P(m.parts.updated), 1)) : M("", !0),
            U(Yt, { entry: m }, null, 8, ["entry"]),
            U(We, { entry: m }, null, 8, ["entry"]),
            U(Ke, { entry: m }, null, 8, ["entry"])
          ])
        ]))), 128)),
        d.entity.create && !l.value ? (u(), A(ne, {
          key: 1,
          class: "dc-type__new",
          href: $(t).createHref?.(d.entity),
          onPress: (m) => $(t).create(d.entity)
        }, {
          default: G(() => [
            c[1] || (c[1] = S("span", {
              class: "dc-type__plus",
              "aria-hidden": "true"
            }, "+", -1)),
            J(" " + P(d.entity.create), 1)
          ]),
          _: 2
        }, 1032, ["href", "onPress"])) : M("", !0)
      ], 8, Lr))), 128)),
      Q(r.$slots, "after", {}, void 0, !0)
    ], 8, Sr));
  }
}), ma = /* @__PURE__ */ j(Dr, [["__scopeId", "data-v-d73c6777"]]), Kr = ["data-dc-pending", "data-dc-more"], Wr = {
  key: 0,
  class: "dc-results__state dc-results__state--loading",
  "aria-live": "polite"
}, jr = {
  key: 3,
  class: "dc-results__state",
  role: "alert"
}, Ur = { class: "dc-results__detail" }, zr = {
  key: 4,
  class: "dc-results__state",
  "aria-live": "polite"
}, Qr = {
  key: 5,
  class: "dc-results__state"
}, Gr = { class: "dc-results__detail" }, Yr = /* @__PURE__ */ q({
  __name: "ResultsArea",
  props: {
    views: {},
    loading: { type: Boolean }
  },
  setup(e) {
    const t = e, n = Z(), a = at(), s = {
      list: At,
      cards: ua,
      grid: da,
      images: fa,
      table: ha,
      links: va,
      preview: pa
    }, o = f(() => Ln(n.query.value, t.views)), l = f(() => Ht(n.query.value.view, t.views)), i = f(() => (l.value === "record" ? null : s[l.value]) ?? At), r = f(() => l.value === "record" ? n.recordView.value : null), c = f(() => n.rows.value.length > 0), d = f(() => n.error.value !== null), m = N(null);
    function b(v) {
      return v.querySelector("[data-dc-scroll]") ?? v;
    }
    se(
      // The page on screen, which is the draft's own while one is being typed.
      () => n.liveQuery.value.page,
      () => {
        m.value && (b(m.value).scrollTop = 0);
      }
    );
    const x = N(""), k = N({ x: 0, y: 0 }), p = N(0);
    function w() {
      const v = m.value;
      if (!v) {
        x.value = "";
        return;
      }
      const _ = b(v), T = {
        top: _.scrollTop > 1,
        right: _.scrollWidth - _.clientWidth - _.scrollLeft > 1,
        bottom: _.scrollHeight - _.clientHeight - _.scrollTop > 1,
        left: _.scrollLeft > 1
      };
      x.value = Object.entries(T).filter(([, B]) => B).map(([B]) => B).join(" "), k.value = {
        x: _.offsetHeight - _.clientHeight,
        y: _.offsetWidth - _.clientWidth
      }, p.value = v.querySelector("[data-dc-stuck]")?.offsetHeight ?? 0;
    }
    let L = null, g = null;
    return se(
      m,
      (v, _) => {
        if (_?.removeEventListener("scroll", w, { capture: !0 }), L?.disconnect(), g?.disconnect(), L = null, g = null, w(), !v || (v.addEventListener("scroll", w, { passive: !0, capture: !0 }), typeof ResizeObserver > "u")) return;
        const T = new ResizeObserver(w), B = typeof MutationObserver > "u" ? null : new MutationObserver(() => {
          ae(), w();
        }), ae = () => {
          T.disconnect(), B?.disconnect();
          for (const D of /* @__PURE__ */ new Set([v, b(v)])) {
            T.observe(D);
            for (const K of D.children) T.observe(K);
            B?.observe(D, { childList: !0 });
          }
        };
        ae(), L = T, g = B;
      },
      { flush: "post" }
    ), me(() => {
      m.value?.removeEventListener("scroll", w, { capture: !0 }), L?.disconnect(), g?.disconnect();
    }), (v, _) => (u(), h("div", {
      ref_key: "scroller",
      ref: m,
      class: "dc-results",
      "data-dc-pending": $(n).pending.value ? "true" : "false",
      "data-dc-more": x.value,
      style: oe({
        "--dc-results-gutter-x": `${k.value.x}px`,
        "--dc-results-gutter-y": `${k.value.y}px`,
        "--dc-results-stuck": `${p.value}px`
      })
    }, [
      e.loading ? (u(), h("p", Wr, [..._[1] || (_[1] = [
        S("span", { class: "dc-results__detail" }, "Loading…", -1)
      ])])) : o.value ? (u(), A(ma, { key: 1 }, xt({ _: 2 }, [
        a["cards-before"] ? {
          name: "before",
          fn: G(() => [
            Q(v.$slots, "cards-before", {}, void 0, !0)
          ]),
          key: "0"
        } : void 0,
        a["cards-after"] ? {
          name: "after",
          fn: G(() => [
            Q(v.$slots, "cards-after", {}, void 0, !0)
          ]),
          key: "1"
        } : void 0
      ]), 1024)) : r.value ? (u(), A(Oe(r.value.component), {
        key: 2,
        id: r.value.id
      }, null, 8, ["id"])) : d.value ? (u(), h("p", jr, [
        _[2] || (_[2] = S("span", { class: "dc-results__headline" }, "Could not load results", -1)),
        S("span", Ur, P($(n).error.value instanceof Error ? $(n).error.value.message : "The data source failed."), 1)
      ])) : !c.value && $(n).pending.value ? (u(), h("p", zr, [..._[3] || (_[3] = [
        S("span", { class: "dc-results__detail" }, "Running query…", -1)
      ])])) : c.value ? (u(), A(Oe(i.value), { key: 6 })) : (u(), h("div", Qr, [
        _[4] || (_[4] = S("span", { class: "dc-results__headline" }, "Nothing matches this query", -1)),
        S("span", Gr, P($(n).summary.value), 1),
        $(n).isPristine.value ? M("", !0) : (u(), A(ne, {
          key: 0,
          class: "dc-results__clear",
          href: $(n).clearHref(),
          onPress: _[0] || (_[0] = (T) => $(n).clearFilters())
        }, {
          default: G(() => [
            J(P($(n).isEverything.value ? "Clear filters" : "Search everything instead"), 1)
          ]),
          _: 1
        }, 8, ["href"]))
      ]))
    ], 12, Kr));
  }
}), ya = /* @__PURE__ */ j(Yr, [["__scopeId", "data-v-9cb044b3"]]), Xr = ["data-dc-theme"], Jr = { class: "dc-shell__head" }, Zr = {
  key: 0,
  class: "dc-shell__page"
}, ei = /* @__PURE__ */ q({
  __name: "DataShell",
  props: /* @__PURE__ */ en({
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
  emits: /* @__PURE__ */ en(["activate", "create", "duplicate", "delete", "operate", "drill", "query-change", "toggle-pin"], ["update:pinned", "update:selected"]),
  setup(e, { expose: t, emit: n }) {
    const a = e, s = n, o = Zt(e, "pinned"), l = Zt(e, "selected"), i = at(), r = Nt(xn, null), c = a.route || r ? null : Ta(), d = a.route ?? r ?? c;
    me(() => c?.dispose?.());
    const m = N(!!i.page);
    ka(() => {
      m.value = !!i.page;
    });
    const b = Ma(d, {
      detached: () => m.value && a.pageQuery === "detached",
      path: () => a.listPath
    }), x = f(() => bs({ seed: a.schema.key })), k = f(() => a.source ?? x.value), p = Ds({
      schema: () => a.schema,
      adapter: b,
      defaults: () => a.defaults,
      navigationMode: () => a.navigationMode,
      facetNavigationMode: () => a.facetNavigationMode
    }), w = f(() => a.within?.trim() ?? ""), L = js({
      query: p.query,
      entity: p.entity,
      schema: f(() => a.schema),
      setExpression: p.setExpression
    }), g = Ks({
      source: k,
      query: L.live,
      schema: f(() => a.schema),
      entity: p.entity,
      limit: f(() => a.limit),
      within: w
    });
    se(p.query, (C) => s("query-change", C));
    const v = f(() => Ts(a.schema, [p.query.value.expr])), _ = f(
      () => v.value.flatMap((C) => {
        const R = a.schema.entities.find((z) => z.key === C.entityKey);
        return R ? [{ ...C, entity: R }] : [];
      })
    );
    function T() {
      if (i.record) return _.value;
      const C = a.recordCards;
      return C ? _.value.filter((R) => C[R.entityKey]) : [];
    }
    const B = f(() => {
      const [C, ...R] = _.value;
      if (!C || R.length || p.entity.value !== null) return null;
      const z = a.recordViews?.[C.entityKey];
      return z ? { ...z, id: C.id } : null;
    }), ae = f(() => {
      const C = a.views, R = typeof C == "function" ? C({ entity: p.entity.value, records: v.value }) : C;
      return B.value ? [...(R ?? Bt).filter((z) => z !== "record"), "record"] : R?.filter((z) => z !== "record");
    });
    se(
      [g.pageCount, g.pending, p.query, L.drafting, () => a.loading, m],
      () => {
        if (g.pending.value || L.drafting.value || a.loading || m.value) return;
        const C = g.pageCount.value;
        p.query.value.page > C && p.setPage(C, "replace");
      },
      // Immediately, since a pasted URL is past the end before anything changes;
      // and after the render, so the correction is a navigation the mounted shell
      // makes rather than one it makes on the way up. An async source is still
      // pending here and corrects itself when its count lands.
      { immediate: !0, flush: "post" }
    );
    const D = f(() => new Set(o.value));
    function K(C) {
      const R = new Set(D.value);
      R.has(C.id) ? R.delete(C.id) : R.add(C.id), o.value = [...R], s("toggle-pin", C);
    }
    const ee = f(() => {
      if (a.selectable === !0) return !0;
      const C = p.entity.value;
      return !!(C?.duplicate || C?.delete || C?.operations?.some((R) => R.selection !== !1));
    }), re = f(() => new Set(l.value));
    function V(C) {
      const R = new Set(re.value);
      R.has(C.id) ? R.delete(C.id) : R.add(C.id), l.value = [...R];
    }
    function Y(C) {
      const R = new Set(re.value);
      for (const z of g.rows.value)
        C ? R.add(z.id) : R.delete(z.id);
      l.value = [...R];
    }
    function I() {
      l.value.length && (l.value = []);
    }
    const E = f(() => ({
      ids: [...l.value],
      rows: g.rows.value.filter((C) => re.value.has(C.id)),
      entity: p.entity.value
    }));
    se(() => p.query.value.entity, I);
    function F(C, R, z = {}) {
      const Xt = wt(a.schema, p.query.value, C, z);
      z.exclude ? p.narrow(Xt, R?.key ?? p.query.value.entity) : L.release(() => p.narrow(Xt, R?.key ?? null, R ? void 0 : "cards")), s("drill", C, R, z);
    }
    function y(C) {
      return a.rowPress === "narrow" && Ze(a.schema, C) !== null;
    }
    function O(C) {
      return a.schema.entities.find((z) => z.key === C.entityKey)?.href?.(C) || null;
    }
    const H = Ms({
      ...p,
      draft: L.text,
      liveQuery: L.live,
      drafting: L.drafting,
      commitDraft: L.commit,
      abandonDraft: L.abandon,
      /*
       * A page of what is on screen: the draft's, while one is live, which are
       * held beside it rather than in the URL — see `liveQuery`.
       */
      setPage: (C, R) => {
        L.drafting.value ? L.setPage(C) : p.setPage(C, R);
      },
      schema: f(() => a.schema),
      entities: f(() => a.schema.entities),
      rows: g.rows,
      total: g.total,
      limit: f(() => a.limit),
      offset: g.offset,
      pageCount: g.pageCount,
      pending: g.pending,
      counting: g.counting,
      error: g.error,
      source: k,
      previewsPerType: f(() => a.previewsPerType),
      within: w,
      loading: f(() => a.loading),
      recordView: B,
      pinnable: f(() => a.pinnable === !0),
      isPinned: (C) => D.value.has(C.id),
      isPinnedId: (C) => D.value.has(C),
      togglePin: K,
      selectable: ee,
      selection: E,
      isSelected: (C) => re.value.has(C.id),
      toggleSelect: V,
      selectPage: Y,
      clearSelection: I,
      narrowsOnPress: f(() => a.rowPress === "narrow"),
      rowLinks: f(() => a.rowLinks),
      /*
       * The one place a press is read, so every view gets the same answer without
       * knowing which of the two it is: they all call this.
       */
      activate: (C, R = {}) => {
        if (y(C)) {
          F(C, null, R);
          return;
        }
        const z = O(C);
        if (z) {
          window.open(z, "_blank", "noopener");
          return;
        }
        s("activate", C);
      },
      pressHref: (C) => y(C) ? p.narrowHref(wt(a.schema, p.query.value, C), null, "cards") : O(C) ?? a.activateHref?.(C) ?? null,
      recordHref: O,
      drillHref: (C, R) => Ze(a.schema, C) ? p.narrowHref(
        wt(a.schema, p.query.value, C),
        R?.key ?? null,
        R ? void 0 : "cards"
      ) : null,
      create: (C) => s("create", C),
      createHref: (C) => a.createHref?.(C) ?? null,
      duplicate: () => s("duplicate", E.value),
      delete: () => s("delete", E.value),
      operate: (C) => s("operate", C, E.value),
      drill: F
    });
    Ns({ theme: () => a.theme, accent: () => a.accent, tokens: () => a.tokens });
    const te = f(() => {
      if (!(!a.accent && !a.tokens))
        return { ...a.tokens, ...a.accent ? { "--dc-accent": a.accent } : {} };
    });
    return t({
      query: p.query
    }), (C, R) => (u(), h("div", {
      class: "dc-shell",
      "data-dc-theme": e.theme,
      style: oe(te.value)
    }, [
      S("div", Jr, [
        U(oa, null, xt({ _: 2 }, [
          i.brand ? {
            name: "brand",
            fn: G((z) => [
              Q(C.$slots, "brand", ba($a(z)), void 0, !0)
            ]),
            key: "0"
          } : void 0,
          i.actions ? {
            name: "actions",
            fn: G(() => [
              Q(C.$slots, "actions", {}, void 0, !0)
            ]),
            key: "1"
          } : void 0
        ]), 1024)
      ]),
      i.page ? (u(), h("div", Zr, [
        Q(C.$slots, "page", {
          query: $(H).query.value
        }, void 0, !0)
      ])) : M("", !0),
      i.page ? M("", !0) : (u(), A(ra, {
        key: 1,
        views: ae.value,
        "type-chooser": e.typeChooser,
        "selection-placement": e.selectionPlacement,
        "pages-note": e.pagesNote
      }, null, 8, ["views", "type-chooser", "selection-placement", "pages-note"])),
      i.page ? M("", !0) : Q(C.$slots, "results", {
        rows: $(H).rows.value,
        total: $(H).total.value,
        offset: $(H).offset.value,
        pageCount: $(H).pageCount.value,
        query: $(H).liveQuery.value,
        pending: $(H).pending.value,
        loading: e.loading
      }, () => [
        U(ya, {
          views: ae.value,
          loading: e.loading
        }, xt({ _: 2 }, [
          i["cards-before"] || T().length ? {
            name: "cards-before",
            fn: G(() => [
              (u(!0), h(W, null, X(T(), (z) => (u(), h(W, {
                key: `${z.entityKey}:${z.id}`
              }, [
                i.record ? Q(C.$slots, "record", {
                  id: z.id,
                  entity: z.entity
                }, void 0, !0, 0) : (u(), A(Oe(e.recordCards?.[z.entityKey]), {
                  key: 1,
                  id: z.id
                }, null, 8, ["id"]))
              ], 64))), 128)),
              Q(C.$slots, "cards-before", {}, void 0, !0)
            ]),
            key: "0"
          } : void 0,
          i["cards-after"] ? {
            name: "cards-after",
            fn: G(() => [
              Q(C.$slots, "cards-after", {}, void 0, !0)
            ]),
            key: "1"
          } : void 0
        ]), 1032, ["views", "loading"])
      ], !0, 2)
    ], 12, Xr));
  }
}), ti = /* @__PURE__ */ j(ei, [["__scopeId", "data-v-3a419e4b"]]), ni = ["data-dc-muted", "data-dc-collapsed"], ai = ["data-dc-collapsible"], si = ["aria-expanded", "aria-controls"], oi = { class: "dc-shell-card__sr" }, li = {
  key: 0,
  class: "dc-shell-card__identity"
}, ri = { class: "dc-shell-card__title dc-shell-card__name" }, ii = {
  key: 0,
  class: "dc-shell-card__ref dc-mono"
}, ci = {
  key: 1,
  class: "dc-shell-card__title"
}, ui = {
  key: 2,
  class: "dc-shell-card__count dc-mono"
}, di = {
  key: 1,
  class: "dc-shell-card__aside"
}, fi = ["data-dc-flush"], vi = /* @__PURE__ */ q({
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
    const n = e, a = t, s = N(n.defaultCollapsed === !0), o = f(() => n.span === "all" ? { gridColumn: "1 / -1" } : void 0), l = at();
    function i(D) {
      return r(D?.() ?? []);
    }
    function r(D) {
      return D.some((K) => K.type === xa ? !1 : K.type === Sa ? String(K.children ?? "").trim().length > 0 : K.type === W ? r(K.children ?? []) : !0);
    }
    const c = f(
      () => !!n.title || !!n.name || d.value || i(l.head)
    ), d = f(() => i(l.aside)), m = f(() => i(l.default)), b = f(() => i(l.foot)), x = f(
      () => !!n.name && (!!n.reference || i(l.reference))
    ), k = f(() => n.collapsible === !0 && c.value), p = f(() => k.value && (n.collapsed ?? s.value));
    function w() {
      const D = !p.value;
      s.value = D, a("update:collapsed", D);
    }
    const L = Rt() ?? "dc-shell-card", g = `${L}-body`, v = `${L}-foot`, _ = f(
      () => [m.value ? g : "", b.value ? v : ""].filter(Boolean).join(" ") || void 0
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
    ].join(", "), B = N(null);
    function ae(D) {
      if (!k.value) return;
      const K = D.target?.closest(T);
      K && B.value?.contains(K) || typeof window < "u" && window.getSelection()?.toString() || w();
    }
    return (D, K) => (u(), h("section", {
      class: "dc-shell-card",
      style: oe(o.value),
      "data-dc-muted": e.muted ? "true" : "false",
      "data-dc-collapsed": p.value ? "true" : "false"
    }, [
      c.value ? (u(), h("header", {
        key: 0,
        ref_key: "head",
        ref: B,
        class: "dc-shell-card__head",
        "data-dc-collapsible": k.value ? "true" : "false",
        onClick: ae
      }, [
        k.value ? (u(), h("button", {
          key: 0,
          type: "button",
          class: "dc-shell-card__toggle",
          "aria-expanded": p.value ? "false" : "true",
          "aria-controls": _.value,
          onClick: w
        }, [
          K[0] || (K[0] = S("svg", {
            class: "dc-shell-card__chevron",
            viewBox: "0 0 10 10",
            "aria-hidden": "true"
          }, [
            S("path", { d: "M2 3.5 5 6.5 8 3.5" })
          ], -1)),
          S("span", oi, P(e.name || e.title || "Card"), 1)
        ], 8, si)) : M("", !0),
        Q(D.$slots, "head", {}, () => [
          e.name ? (u(), h("div", li, [
            S("h2", ri, P(e.name), 1),
            x.value ? (u(), h("span", ii, [
              Q(D.$slots, "reference", {}, () => [
                J(P(e.reference), 1)
              ], !0)
            ])) : M("", !0)
          ])) : (u(), h("h2", ci, P(e.title), 1)),
          e.count !== void 0 ? (u(), h("span", ui, P(e.count), 1)) : M("", !0)
        ], !0),
        d.value ? (u(), h("span", di, [
          Q(D.$slots, "aside", {}, void 0, !0)
        ])) : M("", !0)
      ], 8, ai)) : M("", !0),
      m.value ? $t((u(), h("div", {
        key: 1,
        id: g,
        class: "dc-shell-card__body",
        "data-dc-flush": e.flush ? "true" : "false"
      }, [
        Q(D.$slots, "default", {}, void 0, !0)
      ], 8, fi)), [
        [tn, !p.value]
      ]) : M("", !0),
      b.value ? $t((u(), h("footer", {
        key: 2,
        id: v,
        class: "dc-shell-card__foot"
      }, [
        Q(D.$slots, "foot", {}, void 0, !0)
      ], 512)), [
        [tn, !p.value]
      ]) : M("", !0)
    ], 12, ni));
  }
}), gc = /* @__PURE__ */ j(vi, [["__scopeId", "data-v-073304c8"]]), pi = ["aria-label"], hi = ["aria-checked", "data-dc-active", "tabindex", "onClick", "onKeydown"], mi = /* @__PURE__ */ q({
  __name: "SegmentedControl",
  props: {
    modelValue: {},
    options: {},
    label: {},
    mono: { type: Boolean }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const n = e, a = t, s = N([]);
    function o(l, i) {
      const r = n.options.length;
      let c = null;
      if (l.key === "ArrowRight" || l.key === "ArrowDown" ? c = (i + 1) % r : l.key === "ArrowLeft" || l.key === "ArrowUp" ? c = (i - 1 + r) % r : l.key === "Home" ? c = 0 : l.key === "End" && (c = r - 1), c === null) return;
      l.preventDefault();
      const d = n.options[c];
      d && (a("update:modelValue", d.key), s.value[c]?.focus());
    }
    return (l, i) => (u(), h("div", {
      class: "dc-segmented",
      role: "radiogroup",
      "aria-label": e.label
    }, [
      (u(!0), h(W, null, X(e.options, (r, c) => (u(), h("button", {
        key: r.key,
        ref_for: !0,
        ref_key: "buttons",
        ref: s,
        type: "button",
        role: "radio",
        class: ue(["dc-segmented__item", { "dc-segmented__item--mono": e.mono }]),
        "aria-checked": r.key === e.modelValue,
        "data-dc-active": r.key === e.modelValue ? "true" : "false",
        tabindex: r.key === e.modelValue ? 0 : -1,
        onClick: (d) => a("update:modelValue", r.key),
        onKeydown: (d) => o(d, c)
      }, P(r.label), 43, hi))), 128))
    ], 8, pi));
  }
}), yi = /* @__PURE__ */ j(mi, [["__scopeId", "data-v-63fb5482"]]), _i = { class: "dc-fact__label" }, gi = ["title"], wi = /* @__PURE__ */ q({
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
      if (s == null || s === "") return [pe];
      if (Array.isArray(s)) {
        const o = s.filter((l) => l != null && l !== "");
        return o.length ? o.map(String) : [pe];
      }
      return [String(s)];
    }), a = f(() => t.wide ? { gridColumn: "1 / -1" } : void 0);
    return (s, o) => (u(), h("div", {
      class: "dc-fact",
      style: oe(a.value)
    }, [
      S("dt", _i, [
        Q(s.$slots, "label", {}, () => [
          J(P(e.label), 1)
        ], !0)
      ]),
      S("dd", {
        class: "dc-fact__value dc-mono",
        title: e.title
      }, [
        Q(s.$slots, "default", {}, () => [
          n.value.length === 1 ? (u(), h(W, { key: 0 }, [
            J(P(n.value[0]), 1)
          ], 64)) : (u(!0), h(W, { key: 1 }, X(n.value, (l, i) => (u(), h("span", {
            key: i,
            class: "dc-fact__line"
          }, P(l), 1))), 128))
        ], !0)
      ], 8, gi)
    ], 4));
  }
}), ki = /* @__PURE__ */ j(wi, [["__scopeId", "data-v-1f6d25e6"]]), bi = /* @__PURE__ */ q({
  __name: "ShellFacts",
  props: {
    items: { default: () => [] },
    min: { default: "200px" }
  },
  setup(e) {
    const t = e, n = f(() => ({ "--dc-facts-min": t.min }));
    return (a, s) => (u(), h("dl", {
      class: "dc-facts",
      style: oe(n.value)
    }, [
      (u(!0), h(W, null, X(e.items, (o, l) => (u(), A(ki, {
        key: `${l}:${o.label}`,
        label: o.label,
        value: o.value,
        title: o.title,
        wide: o.wide
      }, null, 8, ["label", "value", "title", "wide"]))), 128)),
      Q(a.$slots, "default", {}, void 0, !0)
    ], 4));
  }
}), wc = /* @__PURE__ */ j(bi, [["__scopeId", "data-v-17455afa"]]), $i = { class: "dc-counts" }, xi = ["data-dc-tone"], Si = {
  key: 0,
  class: "dc-counts__empty"
}, Ci = /* @__PURE__ */ q({
  __name: "StatusCounts",
  props: {
    counts: {},
    empty: { default: pe }
  },
  setup(e) {
    const t = e, n = f(() => t.counts.filter((a) => a.count > 0));
    return (a, s) => (u(), h("span", $i, [
      (u(!0), h(W, null, X(n.value, (o) => (u(), h("span", {
        key: o.label,
        class: "dc-counts__count",
        "data-dc-tone": o.tone ?? "neutral"
      }, P(o.count) + " " + P(o.label), 9, xi))), 128)),
      n.value.length === 0 ? (u(), h("span", Si, P(e.empty), 1)) : M("", !0)
    ]));
  }
}), kc = /* @__PURE__ */ j(Ci, [["__scopeId", "data-v-5553a9e2"]]), Pi = ["data-dc-copied", "title", "aria-label"], Ei = {
  key: 0,
  class: "dc-copy__mark",
  viewBox: "0 0 16 16",
  "aria-hidden": "true"
}, Li = {
  key: 1,
  class: "dc-copy__mark",
  viewBox: "0 0 16 16",
  "aria-hidden": "true"
}, Ti = 1500, Mi = /* @__PURE__ */ q({
  __name: "CopyButton",
  props: {
    text: {},
    label: { default: "Copy to clipboard" }
  },
  emits: ["copied", "error"],
  setup(e, { emit: t }) {
    const n = e, a = t, s = N(!1);
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
      }, Ti), a("copied", i);
    }
    return me(() => clearTimeout(o)), (i, r) => (u(), h("button", {
      type: "button",
      class: "dc-copy",
      "data-dc-copied": s.value ? "true" : "false",
      title: s.value ? "Copied" : e.label,
      "aria-label": e.label,
      onClick: l
    }, [
      s.value ? (u(), h("svg", Li, [...r[1] || (r[1] = [
        S("path", { d: "M3 8.5l3.2 3L13 4.5" }, null, -1)
      ])])) : (u(), h("svg", Ei, [...r[0] || (r[0] = [
        S("rect", {
          x: "5.5",
          y: "5.5",
          width: "8",
          height: "9",
          rx: "1.5"
        }, null, -1),
        S("path", { d: "M10.5 3.5v-1a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h1" }, null, -1)
      ])]))
    ], 8, Pi));
  }
}), Oi = /* @__PURE__ */ j(Mi, [["__scopeId", "data-v-f4249d7f"]]), Ai = ["data-dc-copy", "data-dc-wrap", "data-dc-tone"], Ni = /* @__PURE__ */ q({
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
    const n = e, a = t, s = N(null), o = f(() => n.maxHeight === void 0 ? void 0 : { maxHeight: typeof n.maxHeight == "number" ? `${n.maxHeight}px` : n.maxHeight });
    function l() {
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
        style: oe(o.value)
      }, [
        Q(i.$slots, "default", {}, () => [
          J(P(e.code), 1)
        ], !0)
      ], 4),
      e.copy ? (u(), A(Oi, {
        key: 0,
        class: "dc-code__copy",
        text: l,
        label: e.copyLabel,
        onCopied: r[0] || (r[0] = (c) => a("copied", c)),
        onError: r[1] || (r[1] = (c) => a("error", c))
      }, null, 8, ["label"])) : M("", !0)
    ], 8, Ai));
  }
}), bc = /* @__PURE__ */ j(Ni, [["__scopeId", "data-v-67b371dd"]]), Ii = 24, Ri = /* @__PURE__ */ q({
  __name: "ShellLog",
  props: {
    fetchChunk: {},
    stripAnsi: { type: Boolean },
    maxHeight: { default: "460px" }
  },
  setup(e, { expose: t }) {
    const n = e, a = N(""), s = f(() => n.stripAnsi ? Fa(a.value) : a.value), o = N(null);
    let l = 0, i = null;
    function r() {
      return i ??= c().finally(() => {
        i = null;
      }), i;
    }
    async function c() {
      const { chunk: b, offset: x } = await n.fetchChunk(l);
      if (l = x, !b) return;
      const k = o.value, p = !k || k.scrollTop + k.clientHeight >= k.scrollHeight - Ii;
      a.value += b, p && (await st(), o.value && (o.value.scrollTop = o.value.scrollHeight));
    }
    function d() {
      a.value = "", l = 0;
    }
    const m = f(() => n.maxHeight === void 0 ? void 0 : { maxHeight: typeof n.maxHeight == "number" ? `${n.maxHeight}px` : n.maxHeight });
    return t({ poll: r, reset: d }), (b, x) => (u(), h("pre", {
      ref_key: "pane",
      ref: o,
      class: "dc-log dc-mono",
      style: oe(m.value)
    }, P(s.value), 5));
  }
}), $c = /* @__PURE__ */ j(Ri, [["__scopeId", "data-v-2c86947e"]]), Bi = ["data-dc-theme"], Hi = ["aria-labelledby", "aria-label"], Fi = {
  key: 1,
  class: "dc-dialog__actions"
}, Le = [], qi = /* @__PURE__ */ q({
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
    const n = e, a = t, { theme: s, style: o, adopt: l } = zt(n), i = `${Rt() ?? "dc-dialog"}-title`, r = N(null);
    function c() {
      a("close"), a("update:open", !1);
    }
    const d = Symbol("dc-dialog");
    function m(v) {
      v.key !== "Escape" || v.defaultPrevented || Le[Le.length - 1] === d && (v.preventDefault(), c());
    }
    let b = !1;
    function x(v) {
      b = v.target === v.currentTarget;
    }
    function k(v) {
      v.target === v.currentTarget && b && c(), b = !1;
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
    let w = null;
    async function L() {
      Le.push(d), document.addEventListener("keydown", m), w = document.activeElement instanceof HTMLElement ? document.activeElement : null, l(), await st(), (r.value?.querySelector("[autofocus]") ?? r.value?.querySelector(p) ?? r.value)?.focus();
    }
    function g() {
      const v = Le.indexOf(d);
      v !== -1 && (Le.splice(v, 1), document.removeEventListener("keydown", m), w?.isConnected && w.focus(), w = null);
    }
    return lt(() => {
      n.open && L();
    }), se(
      () => n.open,
      (v) => {
        v ? L() : g();
      }
    ), me(g), (v, _) => e.open ? (u(), A(ot, {
      key: 0,
      to: e.to
    }, [
      S("div", {
        class: "dc-shell dc-layer dc-dialog",
        "data-dc-theme": $(s),
        style: oe($(o)),
        onPointerdown: x,
        onClick: k
      }, [
        S("div", {
          ref_key: "panel",
          ref: r,
          class: ue(["dc-dialog__panel", e.panelClass]),
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
          }, P(e.title), 1)) : M("", !0),
          S("div", {
            class: ue(["dc-dialog__body", e.bodyClass])
          }, [
            Q(v.$slots, "default", {}, void 0, !0)
          ], 2),
          v.$slots.actions ? (u(), h("div", Fi, [
            Q(v.$slots, "actions", {}, void 0, !0)
          ])) : M("", !0)
        ], 10, Hi)
      ], 44, Bi)
    ], 8, ["to"])) : M("", !0);
  }
}), xc = /* @__PURE__ */ j(qi, [["__scopeId", "data-v-0cccf313"]]), Vi = 4500, Di = 9e3, He = N([]);
let wn = 0;
function _a(e) {
  He.value = He.value.filter((t) => t.id !== e);
}
function ga(e, t = "ok") {
  wn += 1;
  const n = wn;
  He.value = [...He.value, { id: n, message: e, kind: t }], setTimeout(() => _a(n), t === "err" ? Di : Vi);
}
function Ki(e) {
  ga(e instanceof Error ? e.message : String(e), "err");
}
function Wi() {
  return { toasts: Ca(He), toast: ga, toastError: Ki, dismiss: _a };
}
const ji = ["data-dc-theme"], Ui = ["data-dc-kind", "role"], zi = /* @__PURE__ */ q({
  __name: "ShellToasts",
  props: {
    to: { default: "body" },
    theme: { default: void 0 },
    accent: { default: void 0 },
    tokens: { default: void 0 }
  },
  setup(e) {
    const t = e, { toasts: n } = Wi(), { theme: a, style: s, adopt: o } = zt(t);
    return lt(o), (l, i) => (u(), A(ot, { to: e.to }, [
      S("div", {
        class: "dc-shell dc-layer dc-toasts",
        "data-dc-theme": $(a),
        style: oe($(s)),
        "aria-live": "polite"
      }, [
        (u(!0), h(W, null, X($(n), (r) => (u(), h("div", {
          key: r.id,
          class: "dc-toast",
          "data-dc-kind": r.kind,
          role: r.kind === "err" ? "alert" : void 0
        }, P(r.message), 9, Ui))), 128))
      ], 12, ji)
    ], 8, ["to"]));
  }
}), Sc = /* @__PURE__ */ j(zi, [["__scopeId", "data-v-d970211c"]]), Qi = 4, Gi = 8, Yi = 180;
function Xi(e, t, n, a = {}) {
  const s = a.gap ?? Qi, o = a.margin ?? Gi, l = a.flipBelow ?? Yi, i = a.side ?? "below", r = {
    below: n.height - e.bottom - s - o,
    above: e.top - s - o
  }, c = i === "below" ? "above" : "below", d = r[i] < l && r[c] > r[i] ? c : i, m = Math.min(a.maxHeight ?? 1 / 0, Math.max(0, r[d])), b = Math.max(0, n.width - o * 2), x = Math.min(e.width, b), k = Math.min(Math.max(t, x), b), p = a.align === "end" ? e.right - k : e.left, w = Math.max(o, Math.min(p, n.width - k - o));
  return d === "below" ? { side: d, left: w, top: e.bottom + s, maxHeight: m, minWidth: x, maxWidth: b } : { side: d, left: w, bottom: n.height - e.top + s, maxHeight: m, minWidth: x, maxWidth: b };
}
const Ji = ["data-dc-theme", "data-dc-side"], ye = [], Zi = /* @__PURE__ */ q({
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
    const n = e, a = t, { theme: s, style: o, adopt: l } = zt(n), i = N(null), r = N(null), c = { root: () => i.value };
    function d() {
      const v = n.anchor;
      v && (r.value = Xi(
        v.getBoundingClientRect(),
        i.value?.offsetWidth ?? 0,
        { width: window.innerWidth, height: window.innerHeight },
        { side: n.side, align: n.align, maxHeight: n.maxHeight }
      ));
    }
    const m = f(() => {
      const v = r.value, _ = v ? {
        position: "fixed",
        left: `${v.left}px`,
        ...v.top !== void 0 ? { top: `${v.top}px` } : {},
        ...v.bottom !== void 0 ? { bottom: `${v.bottom}px` } : {},
        minWidth: `${v.minWidth}px`,
        maxWidth: `${v.maxWidth}px`,
        maxHeight: `${v.maxHeight}px`,
        overflowY: "auto"
      } : { position: "fixed", visibility: "hidden" };
      return { ...o.value, ..._ };
    });
    function b() {
      a("update:open", !1), a("close");
    }
    function x(v) {
      return i.value?.contains(v) || n.anchor?.contains(v) ? !0 : ye.slice(ye.indexOf(c) + 1).some((T) => T.root()?.contains(v));
    }
    function k(v) {
      const _ = v.target;
      _ && !x(_) && b();
    }
    function p(v) {
      v.key !== "Escape" || v.defaultPrevented || ye[ye.length - 1] === c && (v.preventDefault(), i.value?.contains(document.activeElement) && n.anchor?.focus(), b());
    }
    let w = null;
    async function L() {
      ye.includes(c) || (ye.push(c), l(), r.value = null, await st(), d(), window.addEventListener("pointerdown", k, !0), document.addEventListener("keydown", p, !0), window.addEventListener("resize", d), window.addEventListener("scroll", d, !0), typeof ResizeObserver < "u" && i.value && (w = new ResizeObserver(() => d()), w.observe(i.value)));
    }
    function g() {
      const v = ye.indexOf(c);
      v !== -1 && (ye.splice(v, 1), window.removeEventListener("pointerdown", k, !0), document.removeEventListener("keydown", p, !0), window.removeEventListener("resize", d), window.removeEventListener("scroll", d, !0), w?.disconnect(), w = null);
    }
    return lt(() => {
      n.open && L();
    }), se(
      () => n.open,
      (v) => {
        v ? L() : g();
      }
    ), se(() => n.anchor, () => {
      n.open && d();
    }), me(g), (v, _) => e.open ? (u(), A(ot, {
      key: 0,
      to: e.to
    }, [
      S("div", Pa({
        ref_key: "root",
        ref: i
      }, v.$attrs, {
        class: "dc-shell dc-layer dc-popover",
        "data-dc-theme": $(s),
        "data-dc-side": r.value?.side,
        style: m.value
      }), [
        Q(v.$slots, "default", {}, void 0, !0)
      ], 16, Ji)
    ], 8, ["to"])) : M("", !0);
  }
}), Cc = /* @__PURE__ */ j(Zi, [["__scopeId", "data-v-73fbd235"]]);
function Pc(e, t) {
  const n = N(!1);
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
  return nt(() => {
    s = !0, l();
  }, !0), { start: c, stop: l, polling: n };
}
function Ec(e, t = {}) {
  const n = t.key ?? ((o) => JSON.stringify(o)), a = he();
  let s = null;
  return Ea(() => {
    const o = e(), l = n(o);
    l !== s && (s = l, a.value = o);
  }), a;
}
function Lc(e = {}) {
  return { key: "ordinal", kind: "ordinal", label: "#", width: "52px", ...e };
}
function Tc(e = {}) {
  return { key: "status", role: "state", kind: "status", label: "State", sort: "state", width: "104px", ...e };
}
function Mc(e = {}) {
  return { key: "tint", role: "tint", ...e };
}
function Oc(e = {}) {
  return { key: "picture", role: "image", kind: "image", width: "56px", height: "40px", ...e };
}
function Ac(e, t = {}) {
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
function Nc(e, t = {}) {
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
function Ic(e, t, n = {}) {
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
function Rc(e, t, n = {}) {
  return { key: e, kind: "date", label: t, sort: e, width: "104px", mono: !0, muted: !0, ...n };
}
function Bc(e = {}) {
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
function Hc(e, t, n = {}) {
  return { key: e, label: t, sort: e, truncate: !0, hideBelow: 900, ...n };
}
function Fc(e, t, n, a = {}) {
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
function yt(e) {
  return typeof e == "number" ? e : typeof e == "string" && e.trim() !== "" ? Number(e) : Number.NaN;
}
function qc(e) {
  const t = yt(e);
  return Number.isFinite(t) && t > 0 ? Ia(t) : pe;
}
function Vc(e) {
  const t = yt(e);
  return Number.isFinite(t) && t > 0 ? Ra(t) : pe;
}
function Dc(e) {
  const t = yt(e);
  return Number.isFinite(t) && t > 0 ? Ba(t) : pe;
}
function Kc(e) {
  const t = yt(e);
  return Number.isFinite(t) ? Ha(t) : pe;
}
function ec(e) {
  if (e <= 0) return 0;
  const t = 10 ** Math.floor(Math.log10(e));
  for (const n of [1, 2, 5])
    if (e <= n * t) return n * t;
  return 10 * t;
}
function tc(e, t) {
  const n = /* @__PURE__ */ new Set();
  for (const a of e) {
    const s = a.fields[t];
    for (const o of Array.isArray(s) ? s : [s])
      typeof o == "string" && o && n.add(o);
  }
  return [...n].sort((a, s) => a.localeCompare(s));
}
function nc(e, t) {
  let n = 0;
  for (const a of e) {
    const s = a.fields[t];
    typeof s == "number" && s > n && (n = s);
  }
  return n;
}
function Wc(e, t, n, a = {}) {
  return {
    kind: "chips",
    key: t,
    label: n,
    options: tc(e, t),
    ...a.multiple ? { multiple: !0 } : {}
  };
}
function jc(e, t, n) {
  return { kind: "range", key: t, label: n, min: 0, max: ec(nc(e, t)) };
}
function Uc(e, t, n) {
  return { kind: "toggle", key: e, label: t, text: n };
}
function zc(e) {
  return e.filter((t) => t.kind === "chips" ? t.options.length > 1 : t.kind === "range" ? t.max > 0 : !0);
}
function Qc(e = "", t = "/") {
  const n = N(ie(e)), a = N(t), s = [`${a.value}${n.value}`];
  return {
    search: n,
    path: a,
    history: s,
    href(o, l) {
      return `${l ?? a.value}${ie(o)}`;
    },
    push(o, l) {
      l !== void 0 && (a.value = l), n.value = ie(o), s.push(`${a.value}${n.value}`);
    },
    replace(o, l) {
      l !== void 0 && (a.value = l), n.value = ie(o), s[s.length - 1] = `${a.value}${n.value}`;
    }
  };
}
function kn(e) {
  const t = e.indexOf("?");
  if (t === -1) return "";
  const n = e.slice(t), a = n.indexOf("#");
  return ie(a === -1 ? n : n.slice(0, a));
}
function Gc(e) {
  const t = N(kn(e.currentRoute.value.fullPath)), n = f(() => e.currentRoute.value.path), a = se(
    () => e.currentRoute.value.fullPath,
    (s) => {
      t.value = kn(s);
    }
  );
  return {
    search: t,
    path: n,
    push: (s, o) => e.push(`${o ?? n.value}${ie(s)}`),
    replace: (s, o) => e.replace(`${o ?? n.value}${ie(s)}`),
    href: (s, o) => {
      const l = `${o ?? n.value}${ie(s)}`;
      return e.resolve?.(l).href ?? l;
    },
    dispose: a
  };
}
function Yc(e, t, n = "/") {
  return (a) => {
    const s = a.params[t], o = Array.isArray(s) ? s.join("/") : s ?? "", l = a.query[be], i = typeof l == "string" ? l : "", r = `${e}="${o.replace(/"/g, "")}"`;
    return { path: n, query: { ...a.query, [be]: qe(i, r) } };
  };
}
function Xc(e, t = "/") {
  return (n) => ({ path: t, query: { ...n.query, [Pe]: e } });
}
function Jc(e) {
  const t = /* @__PURE__ */ new Map();
  for (const n of e) {
    const a = t.get(n.entityKey);
    a ? a.push(n) : t.set(n.entityKey, [n]);
  }
  return {
    query(n) {
      return qn(n, (a) => t.get(a.key) ?? [], {
        undatedLast: !0,
        zeroIsAll: !0
      });
    }
  };
}
function Zc(e, t) {
  return e.query({ ...t, limit: Number.MAX_SAFE_INTEGER, offset: 0 }).rows;
}
const ac = {
  DataShell: ti,
  ShellHeader: oa,
  RecordActions: ra,
  ResultsArea: ya,
  SegmentedControl: yi,
  StatusPill: Ve,
  ListView: At,
  CardsView: ua,
  GridView: da,
  ImagesView: fa,
  TableView: ha,
  LinksView: va,
  PreviewView: pa,
  TypeCardsView: ma
}, eu = {
  install(e, t = {}) {
    const n = t.prefix ?? "";
    for (const [a, s] of Object.entries(ac))
      e.component(`${n}${a}`, s);
    t.route && e.provide(xn, t.route), (t.theme || t.accent || t.tokens) && As({ theme: t.theme, accent: t.accent, tokens: t.tokens }, e);
  }
};
export {
  ic as COLUMN_BREAKPOINTS,
  rc as COLUMN_ROLES,
  ua as CardsView,
  gn as ColumnCell,
  Oi as CopyButton,
  qa as DEFAULT_ENTITY_VIEW,
  St as DEFAULT_SORT,
  Sn as DEFAULT_VIEW,
  Ws as DRAFT_DELAY,
  ti as DataShell,
  pe as EMPTY_CELL,
  Dn as ENTITY_ALL,
  tt as ENTITY_TERM,
  Be as EXPRESSION_TERM,
  da as GridView,
  eu as HeaderContentLayoutPlugin,
  fa as ImagesView,
  va as LinksView,
  At as ListView,
  Ye as MOCK_TINTS,
  De as MetricDrill,
  Ke as OpenMark,
  Wt as PARAM_DIR,
  Pe as PARAM_ENTITY,
  be as PARAM_EXPR,
  dt as PARAM_PAGE,
  Kt as PARAM_SORT,
  ut as PARAM_VIEW,
  lc as PILL_TONES,
  Yi as POPOVER_FLIP_BELOW,
  Qi as POPOVER_GAP,
  Gi as POPOVER_MARGIN,
  Gt as PinStar,
  pa as PreviewView,
  Yt as QueryMark,
  Te as RECORD_STATUSES,
  qt as RESULT_FIELDS,
  xn as ROUTE_ADAPTER_KEY,
  ra as RecordActions,
  ya as ResultsArea,
  Jn as SHELL_CONTEXT_KEY,
  et as SHELL_THEME_KEY,
  We as ScopeMark,
  yi as SegmentedControl,
  xe as SelectTick,
  gc as ShellCard,
  bc as ShellCode,
  xc as ShellDialog,
  ki as ShellFact,
  wc as ShellFacts,
  oa as ShellHeader,
  $c as ShellLog,
  So as ShellPager,
  Cc as ShellPopover,
  Sc as ShellToasts,
  Ot as StandingControl,
  kc as StatusCounts,
  Ve as StatusPill,
  Di as TOAST_ERROR_MS,
  Vi as TOAST_MS,
  ha as TableView,
  ma as TypeCardsView,
  Bt as VIEW_KINDS,
  an as VIEW_LABELS,
  qe as addTerm,
  Dt as andExpression,
  qc as bytesCell,
  Mn as cellFull,
  Ce as cellText,
  Ue as cellTextOf,
  ce as cellValue,
  _t as changesResults,
  Wc as chipsFrom,
  on as columnAlign,
  ln as columnClass,
  sn as columnKey,
  Fe as columnShortcut,
  Rn as columnShortcutOf,
  Pt as columnTruncates,
  ja as columnsFor,
  An as compactShortcuts,
  Wa as countPages,
  Ta as createHistoryAdapter,
  Qc as createMemoryAdapter,
  Jc as createMemoryDataSource,
  bs as createMockDataSource,
  Gc as createVueRouterAdapter,
  Rc as dateColumn,
  Qa as defaultCellText,
  Ge as defaultQuery,
  Ae as defaultViewFor,
  Ma as detachableAdapter,
  wt as drillExpression,
  Vc as durationCell,
  Dc as elapsedCell,
  Da as emptyFacetValue,
  Cs as entityAddress,
  Bc as entityColumn,
  Ct as entityCount,
  Xc as entityRedirect,
  Un as excludingTerm,
  Re as expandShortcuts,
  Hc as facetColumn,
  Zn as facetField,
  na as facetValue,
  as as fieldHeading,
  jn as fieldTerm,
  Ne as findEntity,
  Kn as findEntityByAddress,
  _e as findSort,
  Fc as flagColumn,
  Me as fnv1a,
  Pn as focusEntity,
  Ia as formatBytes,
  Qe as formatCount,
  Aa as formatDate,
  cc as formatDateTime,
  Ra as formatDuration,
  Ba as formatElapsed,
  ve as formatExpression,
  Ee as formatInteger,
  Oa as formatMetric,
  Na as formatOrdinal,
  Ha as formatPercent,
  Za as formatRange,
  ke as formatTerm,
  ks as generateRows,
  Hs as hasActiveFacets,
  Ac as identityColumn,
  mc as idsExpression,
  uc as isEntityScoped,
  Ka as isFacetActive,
  Ft as isPristineQuery,
  Ie as isRangeTerm,
  Ln as isTypeCardsQuery,
  Cn as isViewKind,
  fc as joinExpression,
  zn as liftTerm,
  rs as matchesExpression,
  Ic as metricColumn,
  yc as narrowPatch,
  is as negateTerm,
  ec as niceMax,
  ie as normalizeSearch,
  us as oppositeTerm,
  Lc as ordinalColumn,
  le as parseExpression,
  Ls as parseQuery,
  Kc as percentCell,
  Oc as pictureColumn,
  Xi as placePopover,
  Fo as presentParts,
  ia as presentRow,
  ht as pressOptions,
  Ms as provideShellContext,
  As as provideShellTheme,
  Zc as queryAll,
  jc as rangeFrom,
  it as rangeOf,
  vs as readDraft,
  hc as readExpression,
  Yc as recordRedirect,
  Wn as recordTerm,
  Ts as recordsIn,
  Nc as referenceColumn,
  Lt as refineExpression,
  Ht as resolveView,
  de as roleColumn,
  Tn as roleColumns,
  za as rowKey,
  Et as sameTerm,
  vt as scopeTerm,
  Ze as scopeTermFor,
  Yn as scopedEntity,
  pc as searchFromQuery,
  yn as serializeQuery,
  Ps as sortAddress,
  rt as sortsFor,
  dc as splitExpression,
  Tc as stateColumn,
  Fa as stripAnsi,
  Vs as summarizeQuery,
  Qt as summaryTerms,
  Ut as termStanding,
  Mc as tintColumn,
  vc as tintFor,
  Uc as toggleFacet,
  ir as useColumns,
  js as useDraft,
  fo as useEntityCounts,
  $r as useEntityPreviews,
  zt as useLayerTheme,
  Pc as usePoll,
  $e as usePresentedRows,
  Ds as useQueryState,
  Qs as useRecordNames,
  Ks as useResults,
  Z as useShellContext,
  Ec as useStableSchema,
  Wi as useToasts,
  zc as usefulFacets,
  nn as viewAcross,
  aa as withFacetValue,
  Tt as withStanding,
  _c as withoutFacet,
  Gn as withoutOwnScope,
  cs as withoutTerm
};
