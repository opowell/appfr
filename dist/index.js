import { ref as R, computed as f, inject as Ut, provide as Qt, getCurrentInstance as Rn, shallowRef as _e, toValue as Se, watch as ee, onScopeDispose as vt, getCurrentScope as Bn, defineComponent as F, onMounted as Qe, onBeforeUnmount as pe, openBlock as u, createBlock as I, Teleport as pt, createElementVNode as S, mergeProps as At, unref as x, renderSlot as j, createCommentVNode as T, nextTick as Fe, createElementBlock as h, useSlots as ht, useId as mt, withCtx as z, toDisplayString as P, createTextVNode as Y, Fragment as q, renderList as Q, withModifiers as Ce, normalizeClass as se, withDirectives as It, withKeys as Oe, normalizeStyle as ne, vModelText as Aa, createVNode as K, reactive as un, resolveDynamicComponent as qe, createSlots as Rt, useModel as dn, onBeforeUpdate as Ia, normalizeProps as Mt, guardReactiveProps as Ra, mergeModels as fn, vShow as vn, Comment as Ba, Text as Ha, readonly as Fa, watchEffect as qa } from "vue";
import { MenuList as Da } from "menu-bar";
const Gt = ["list", "cards", "grid", "images", "table", "links", "preview"], Be = ["ok", "running", "queued", "review", "failed"], Fc = [...Be, "neutral", "accent"], qc = [
  "identity",
  "reference",
  "metric",
  "state",
  "updated",
  "image",
  "tint"
], Dc = [480, 620, 760, 900, 1100], Hn = Symbol("dc.routeAdapter");
function re(e) {
  if (!e) return "";
  const t = e.replace(/^[?]/, "");
  return t ? `?${t}` : "";
}
function Va() {
  const e = typeof window < "u", t = R(e ? re(window.location.search) : ""), n = R(e ? window.location.pathname : "/"), a = () => {
    t.value = re(window.location.search), n.value = window.location.pathname;
  };
  e && window.addEventListener("popstate", a);
  const s = (o, r, c) => {
    const l = re(o);
    if (!e) {
      t.value = l, c !== void 0 && (n.value = c);
      return;
    }
    const i = c === void 0 || c === window.location.pathname ? `${window.location.pathname}${l}${window.location.hash}` : `${c}${l}`;
    r === "push" ? window.history.pushState(window.history.state, "", i) : window.history.replaceState(window.history.state, "", i), t.value = l, n.value = window.location.pathname;
  };
  return {
    search: t,
    path: n,
    href(o, r) {
      return e ? r !== void 0 && r !== window.location.pathname ? `${r}${re(o)}` : `${window.location.pathname}${re(o)}${window.location.hash}` : `${r ?? n.value}${re(o)}`;
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
      const c = r ?? (n.value ? t.path() : void 0);
      return e.href ? e.href(o, c) : `${c ?? e.path.value}${re(o)}`;
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
function za(e) {
  const t = new Date(e);
  if (Number.isNaN(t.getTime())) return "—";
  const n = String(t.getUTCDate()).padStart(2, "0"), a = String(t.getUTCMonth() + 1).padStart(2, "0");
  return `${n}.${a}.${t.getUTCFullYear()}`;
}
function ja(e) {
  return String(e + 1);
}
function Vc(e, t) {
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
  return typeof e == "string" && (e === "record" || Gt.includes(e));
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
}, Za = {
  list: "M6 4h7.5M6 8h7.5M6 12h7.5M2.5 4h.01M2.5 8h.01M2.5 12h.01",
  cards: "M2.5 2.5h11v4.5h-11zM2.5 9h11v4.5h-11z",
  grid: "M2.5 2.5h4.5v4.5h-4.5zM9 2.5h4.5v4.5H9zM2.5 9h4.5v4.5h-4.5zM9 9h4.5v4.5H9z",
  images: "M2.5 3h11v10h-11zM2.5 11l3.5-3.5 2.5 2.5 2-2 3 3M10.5 5.75h.01",
  table: "M2.5 3h11v10h-11zM2.5 6.5h11M2.5 9.75h11M6.5 6.5V13",
  links: "M6.75 9.25a2.5 2.5 0 0 0 3.54 0l2.12-2.12a2.5 2.5 0 0 0-3.54-3.54l-.7.7M9.25 6.75a2.5 2.5 0 0 0-3.54 0L3.59 8.87a2.5 2.5 0 0 0 3.54 3.54l.7-.7",
  preview: "M1.5 8S4 3.5 8 3.5 14.5 8 14.5 8 12 12.5 8 12.5 1.5 8 1.5 8zM6 8a2 2 0 1 0 4 0 2 2 0 1 0-4 0",
  record: "M4 2h5.5L12 4.5V14H4zM9.5 2v2.5H12M6 8h4M6 10.5h4"
};
function yt(e, t) {
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
function gt(e, t = null) {
  if (e?.sorts?.length) return e.sorts;
  const n = /* @__PURE__ */ new Set(), a = [];
  for (const s of Vn(e, t))
    !s.sort || n.has(s.sort) || (n.add(s.sort), a.push({ key: s.sort, label: (s.label ?? s.sort).toLowerCase() }));
  return a;
}
const es = { key: Bt, label: Bt };
function be(e, t, n = null) {
  const a = gt(e, n);
  return (t ? a.find((o) => o.key === t) : void 0) ?? a.find((o) => o.key === Bt) ?? a[0] ?? es;
}
function ts(e) {
  switch (e.kind) {
    case "chips":
      return { kind: "chips", selected: [] };
    case "range":
      return { kind: "range", min: null, max: null };
    case "toggle":
      return { kind: "toggle", on: !1 };
  }
}
function ns(e) {
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
function Kc(e) {
  return e.entity !== null;
}
function Kn(e, t) {
  return e.entity === null && yt(e.view, t) === "cards";
}
function as(e, t) {
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
function ue(e, t) {
  return e.find((n) => n.role === t);
}
function Wn(e, t) {
  return e.filter((n) => n.role === t);
}
function ss(e, t) {
  const n = (t ? t.columns : e?.columns) ?? [], a = t ? "scoped" : "everything";
  return n.filter(
    (s) => s.role !== "tint" && ((s.when ?? "always") === "always" || s.when === a)
  );
}
const os = ["id", "entityKey", "entityLabel"];
function oe(e, t) {
  if (e.value) return e.value(t);
  const n = e.field ?? e.key;
  if (n !== void 0) {
    if (t.fields && n in t.fields) return t.fields[n];
    if (os.includes(n))
      return t[n];
  }
}
function mn(e, t) {
  const n = e.key ?? e.field ?? e.label;
  return n?.trim() ? n.trim() : `column-${t}`;
}
function rs(e, t) {
  return e.id?.trim() ? e.id : `${e.entityKey || "row"}-${t}`;
}
function ls(e, t) {
  if (e == null || e === "") return he;
  if (t === "number") {
    const n = typeof e == "number" ? e : Number(e);
    return Number.isFinite(n) ? Wa(n) : String(e);
  }
  return t === "date" ? za(String(e)) : Array.isArray(e) ? e.length ? e.join(", ") : he : String(e);
}
function Pe(e, t) {
  const n = oe(e, t);
  return e.format ? e.format(n, t) : ls(n, e.kind);
}
function is(e) {
  return typeof e == "number" ? Number.isFinite(e) ? String(e) : "" : typeof e == "string" ? e : Array.isArray(e) ? e.join(", ") : "";
}
function zn(e, t) {
  const n = Pe(e, t), a = is(oe(e, t));
  return a && a !== n ? a : n;
}
function nt(e, t) {
  return e ? Pe(e, t) : "";
}
function yn(e) {
  return e.align ? e.align : e.kind === "number" || e.kind === "ordinal" ? "right" : "left";
}
const cs = {
  ordinal: "dc-table__num",
  number: "dc-table__number",
  date: "dc-table__date",
  status: "dc-table__state"
};
function gn(e) {
  return [cs[e.kind ?? "text"], e.class].filter(Boolean).join(" ");
}
function Ft(e) {
  if (e.truncate !== void 0) return e.truncate;
  const t = e.kind ?? "text";
  return t === "text" || t === "number" || t === "date";
}
const us = /^([A-Za-z_][\w.-]*)\s*(>=|<=|:|=|>|<)\s*(.*)$/, _n = "-?(?:\\d+\\.?\\d*|\\.\\d+)", ds = new RegExp(`^(${_n})?\\.\\.(${_n})?$`);
function _t(e) {
  const t = ds.exec(e.trim());
  if (!t || t[1] === void 0 && t[2] === void 0) return null;
  const n = t[1] === void 0 ? null : Number(t[1]), a = t[2] === void 0 ? null : Number(t[2]);
  return n !== null && a !== null && n > a ? { min: a, max: n } : { min: n, max: a };
}
function fs(e) {
  return `${e.min ?? ""}..${e.max ?? ""}`;
}
function Ke(e) {
  return e.kind === "field" && (e.comparator === ":" || e.comparator === "=") && _t(e.value) !== null;
}
function vs(e) {
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
function ae(e) {
  const t = e.trim();
  if (!t) return [];
  const n = [];
  let a = [];
  for (const s of vs(t)) {
    const o = s.toUpperCase();
    if (o === "AND" || o === "&&") continue;
    if (o === "OR" || o === "||") {
      a.length && n.push(a), a = [];
      continue;
    }
    const r = s.length > 1 && s.startsWith("-"), c = r ? s.slice(1) : s, l = r ? { negated: !0 } : {}, i = us.exec(c);
    i && i[3] !== "" ? a.push({
      kind: "field",
      field: i[1].toLowerCase(),
      comparator: i[2],
      value: i[3],
      ...l
    }) : a.push({ kind: "text", value: c, ...l });
  }
  return a.length && n.push(a), n;
}
const $e = (e) => e.toLowerCase().replace(/\s+/g, ""), jn = [
  ["status", "state"],
  ["state", "state"],
  ["updated", "updated"],
  ["date", "updated"],
  ["name", "identity"],
  ["ref", "reference"]
];
function ps(e, t, n) {
  const a = $e(e), s = n.columns ?? [];
  if (a === "entity") return t.entityKey;
  if (e in t.fields) return t.fields[e];
  const o = s.find(
    (i) => i.key?.toLowerCase() === e.toLowerCase() || i.field?.toLowerCase() === e.toLowerCase() || i.label !== void 0 && $e(i.label) === a
  );
  if (o) return oe(o, t);
  const r = n.facets.find(
    (i) => i.key.toLowerCase() === a || $e(i.label) === a
  );
  if (r && r.key in t.fields) return t.fields[r.key];
  const c = jn.find(([i]) => i === a)?.[1];
  if (c) {
    const i = ue(s, c);
    if (i) return oe(i, t);
  }
  const l = /^metric(\d+)$/.exec(a);
  if (l) {
    const i = Wn(s, "metric")[Number(l[1]) - 1];
    if (i) return oe(i, t);
  }
}
function Ge(e) {
  return (e.toLowerCase().match(/[\p{L}\p{N}]+/gu) ?? []).map((t) => t.charAt(0)).join("");
}
const wn = /^[a-z_][\w.-]*$/;
function wt(e) {
  const t = (e.key ?? e.field)?.toLowerCase();
  if (t !== void 0) return wn.test(t) ? t : void 0;
  const n = e.label === void 0 ? void 0 : $e(e.label);
  return n !== void 0 && wn.test(n) ? n : void 0;
}
function Jt(e, t) {
  const n = $e(e);
  return !!t?.entities.some((a) => a.scope && $e(a.scope) === n);
}
function hs(e, t, n) {
  const a = $e(e);
  if (a === "entity" || jn.some(([o]) => o === a) || /^metric\d+$/.test(a) || Jt(e, n)) return !0;
  const s = (o) => o !== void 0 && $e(o) === a;
  return (t.columns ?? []).some(
    (o) => s(o.key) || s(o.field) || s(o.label)
  ) || t.facets.some((o) => s(o.key) || s(o.label));
}
function We(e, t, n) {
  return t ? Qn(e, (a) => {
    const s = Gn(a, t, n);
    return s && wt(s);
  }) : e;
}
function Un(e, t, n) {
  return t ? Qn(e, (a) => {
    if (Jt(a, n)) return;
    const s = (t.columns ?? []).find((o) => wt(o) === a);
    return s && Yn(s, t, n);
  }) : e;
}
function ms(e, t, n) {
  if (!t || Jt(e, n)) return;
  const a = t.facets.find((s) => s.key.toLowerCase() === e);
  return a ? a.label : (t.columns ?? []).find((s) => wt(s) === e)?.label;
}
function Qn(e, t) {
  let n = !1;
  const a = ae(e).map(
    (s) => s.map((o) => {
      if (o.kind !== "field") return o;
      const r = t(o.field);
      return !r || r === o.field ? o : (n = !0, { ...o, field: r });
    })
  );
  return n ? ve(a) : e;
}
function Gn(e, t, n) {
  if (!(!e || hs(e, t, n)))
    return (t.columns ?? []).find(
      (a) => a.label !== void 0 && Ge(a.label) === e
    );
}
function Yn(e, t, n) {
  if (!t || e.label === void 0 || !wt(e)) return;
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
function ys(e, t, n, a) {
  if (e.kind === "text") {
    const l = n.columns ?? [];
    return ["identity", "reference"].some((i) => {
      const d = ue(l, i), v = d ? oe(d, t) : void 0;
      return typeof v == "string" && Tt(v, e.value);
    });
  }
  const s = ps(e.field, t, n);
  if (s === void 0) return a?.has(e.field) ? !1 : null;
  const o = Ke(e) ? _t(e.value) : null;
  if (o) {
    if (Array.isArray(s) || typeof s == "boolean") return null;
    const l = typeof s == "number" ? s : Number(s);
    return Number.isFinite(l) ? (o.min === null || l >= o.min) && (o.max === null || l <= o.max) : null;
  }
  if (Array.isArray(s))
    return e.comparator === ":" || e.comparator === "=" ? s.some(
      (i) => e.comparator === "=" ? kn(String(i), e.value) : Tt(String(i), e.value)
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
  const r = Number(e.value), c = typeof s == "number" ? s : Number(s);
  return !Number.isFinite(r) || !Number.isFinite(c) ? null : gs(e.comparator, c, r);
}
function bn(e, t, n, a) {
  const s = ys(e, t, n, a);
  return s === null ? !0 : e.negated ? !s : s;
}
function gs(e, t, n) {
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
function _s(e) {
  if (!e?.strictScopes) return null;
  let t = xn.get(e);
  return t || (t = new Set(
    e.entities.flatMap((n) => n.scope ? [n.scope.toLowerCase()] : [])
  ), xn.set(e, t)), t;
}
function ws(e, t, n, a) {
  if (!e.length) return !0;
  const s = _s(a);
  return e.some((o) => {
    const r = /* @__PURE__ */ new Map();
    for (const c of o)
      $n(c) && r.set(
        c.field,
        (r.get(c.field) ?? !1) || bn(c, t, n, s)
      );
    return o.every(
      (c) => $n(c) ? r.get(c.field) === !0 : bn(c, t, n, s)
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
function ks(e) {
  if (!e.negated) return { ...e, negated: !0 };
  const { negated: t, ...n } = e;
  return n;
}
function ve(e) {
  return e.filter((t) => t.length).map((t) => t.map(ge).join(" ")).join(" OR ");
}
function bs(e, t, n) {
  return e.map((a, s) => s === t ? a.filter((o, r) => r !== n) : a).filter((a) => a.length);
}
function Wc(e) {
  const t = ae(e);
  if (t.length > 1) return { parts: [], text: e.trim() };
  const n = t[0] ?? [];
  return {
    parts: n.filter((a) => a.kind === "field"),
    text: n.filter((a) => a.kind === "text").map(ge).join(" ")
  };
}
function zc(e, t) {
  return [...e.map(ge), t.trim()].filter(Boolean).join(" ");
}
const Cn = (e, t) => e.toLowerCase() === t.toLowerCase();
function qt(e, t) {
  return !!e.negated == !!t.negated && Xn(e, t);
}
function $s(e, t) {
  return !!e.negated != !!t.negated && Xn(e, t);
}
function Xn(e, t) {
  return e.kind === "field" ? t.kind === "field" && e.field === t.field && e.comparator === t.comparator && Cn(e.value, t.value) : t.kind === "text" && Cn(e.value, t.value);
}
function xs(e, t) {
  return t.filter((n) => !e.some((a) => qt(a, n)));
}
function Zt(e, t) {
  return Jn(e, t, (n) => n);
}
function ot(e, t) {
  return Jn(
    e,
    t,
    (n, a) => n.filter((s) => !a.some((o) => $s(s, o)))
  );
}
const Ss = /^[A-Za-z_][\w.-]*\s*(?:>=|<=|:|=|>|<)$/;
function Cs(e) {
  return ve(
    ae(e).map(
      (t) => t.filter(
        (n) => n.kind !== "text" || n.value !== "-" && !Ss.test(n.value)
      )
    ).filter((t) => t.length > 0)
  );
}
function Jn(e, t, n) {
  const a = ae(e), s = ae(t);
  return a.length ? s.length ? ve(
    a.flatMap(
      (o) => s.map((r) => [...n(o, r), ...xs(o, r)])
    )
  ) : ve(a) : ve(s);
}
const Zn = (e) => e.kind === "date" || e.role === "updated";
function Ps(e) {
  if (!e) return () => 0;
  const n = (e.kind ?? "text") === "number" || e.role === "metric", a = Zn(e);
  return (s, o) => {
    const r = oe(e, s), c = oe(e, o);
    return n ? Number(c ?? 0) - Number(r ?? 0) : a ? Date.parse(String(c ?? "")) - Date.parse(String(r ?? "")) : String(c ?? "").localeCompare(String(r ?? ""));
  };
}
function Pn(e, t) {
  return !t || !Zn(t) ? !1 : !Number.isFinite(Date.parse(String(oe(t, e) ?? "")));
}
function ea({ query: e, schema: t, entity: n, limit: a, offset: s }, o, r) {
  const c = ae(e.expr), l = n ? [n] : t.entities;
  let i = 0;
  const d = [];
  for (const b of l)
    for (const E of o(b))
      i += 1, ws(c, E, b, t) && d.push(E);
  const v = be(n, e.sort, t), w = Vn(n, t).find((b) => b.sort === v.key), k = r.undatedLast ? d.filter((b) => !Pn(b, w)) : d, _ = r.undatedLast ? d.filter((b) => Pn(b, w)) : [];
  k.sort(Ps(w)), e.dir === "asc" && k.reverse();
  const m = _.length ? [...k, ..._] : k;
  return {
    // One page out of the middle. `total` stays the whole match, which is what
    // the shell counts pages with.
    rows: r.zeroIsAll && a <= 0 ? m.slice(s) : m.slice(s, s + a),
    total: d.length,
    unfiltered: d.length === i
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
function jc(e) {
  return rt[He(e) % rt.length];
}
function ta(e, t) {
  return `${e}_${1e4 + t * 7}`;
}
const Es = 7, Ms = 3;
function Ls(e, t, n, a) {
  const s = (t * Es + He(n)) % a, o = [];
  for (let r = 0; r < Math.min(Ms, a); r++)
    o.push(ta(e, (s + r) % a));
  return o;
}
function Ts(e, t) {
  switch (e.kind) {
    case "chips":
      return e.multiple ? Os(e.options, t) : e.options[t % e.options.length] ?? "";
    case "range": {
      const n = Math.max(0, e.max - e.min);
      return e.min + (n === 0 ? 0 : t % (n + 1));
    }
    case "toggle":
      return t % 3 === 0;
  }
}
function Os(e, t) {
  if (!e.length) return [];
  const n = 1 + (t >> 5) % Math.min(3, e.length), a = t % e.length, s = /* @__PURE__ */ new Set();
  for (let o = 0; o < n; o++) s.add((a + o) % e.length);
  return [...s].sort((o, r) => o - r).map((o) => e[o]);
}
function Ns(e, t) {
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
function As(e, t = {}) {
  const n = t.population ?? 48, a = t.seed ?? "", s = t.now ?? /* @__PURE__ */ new Date("2026-08-25T00:00:00Z"), o = e.samples, r = t.scopes ?? [];
  if (!o.length) return [];
  const c = [];
  for (let l = 0; l < n; l++) {
    const i = o[l % o.length], d = Math.floor(l / o.length), v = He(`${a}:${e.key}:${i[0]}:${l}`), w = ta(e.key, l), k = new Date(s.getTime() - v % 900 * 36e5).toISOString(), _ = {};
    for (const m of e.columns ?? []) {
      const b = m.field ?? m.key;
      if (!b || m.value) continue;
      const E = Ns(m, {
        hash: He(`${v}:${b}`),
        sample: i,
        revision: d,
        updatedAt: k
      });
      E !== void 0 && (_[b] = E);
    }
    for (const m of e.facets)
      _[m.key] = Ts(m, He(`${v}:${m.key}`));
    for (const [m, b] of r)
      _[m] = b === e.key ? w : Ls(b, l, m, n);
    c.push({ id: w, entityKey: e.key, entityLabel: e.label, fields: _ });
  }
  return c;
}
function Is(e = {}) {
  const t = /* @__PURE__ */ new Map(), n = (a, s) => {
    const o = t.get(a.key);
    if (o) return o;
    const r = e.scopes ?? s.entities.flatMap(
      (l) => l.scope ? [[l.scope, l.key]] : []
    ), c = As(a, { ...e, scopes: r });
    return t.set(a.key, c), c;
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
const Ne = "e", kt = "v", en = "s", tn = "d", Ee = "q", bt = "p", na = "*", Rs = [
  Ne,
  kt,
  en,
  tn,
  Ee,
  bt
], Bs = [
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
  for (const [n, a] of Bs) t = t.replace(n, a);
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
function Hs(e) {
  return Rs.includes(e);
}
function $t(e, t) {
  if (!(!t || e.some((n) => n.key === t)))
    return e.find((n) => Ge(n.label) === t);
}
function Fs(e, t) {
  const n = Ge(e.label);
  return $t(t.entities, n)?.key === e.key ? n : e.key;
}
function aa(e, t) {
  return t ? Ve(e, t) ?? $t(e.entities, t) ?? null : null;
}
function qs(e, t) {
  const n = Ge(e.label);
  return $t(t, n)?.key === e.key ? n : e.key;
}
function Ds(e, t) {
  return t.some((n) => n.key === e) ? e : $t(t, e)?.key ?? e;
}
function Vs(e, t, n = {}) {
  const a = st(t, n), s = new Map(nn(e)), o = s.get(Ne), r = o === void 0 ? a.entity : fe(o), c = r === na ? null : aa(t, r), l = s.get(kt), i = l && qn(fe(l)) ? fe(l) : De(c?.key ?? null, n), d = s.get(en), v = be(
    c,
    d ? Ds(fe(d), gt(c, t)) : n.sort,
    t
  ), w = s.get(tn), k = w ? fe(w) === "asc" ? "asc" : "desc" : a.dir, _ = s.get(Ee), m = s.get(bt), b = m === void 0 ? 1 : Number(fe(m)), E = Number.isFinite(b) ? Math.max(1, Math.floor(b)) : 1;
  return {
    entity: c?.key ?? null,
    view: i,
    sort: v.key,
    dir: k,
    expr: _ === void 0 ? "" : We(fe(_), c, t),
    page: E
  };
}
function En(e, t, n = {}, a = "") {
  const s = st(t, n), o = Ve(t, e.entity), r = nn(a).filter(([v]) => !Hs(v)), c = [], l = (v, w) => c.push([v, lt(w)]), i = o?.key ?? null;
  if (i !== s.entity && l(Ne, o ? Fs(o, t) : na), e.view !== De(i, n) && l(kt, e.view), e.sort !== s.sort) {
    const v = gt(o, t), w = v.find((k) => k.key === e.sort);
    l(en, w ? qs(w, v) : e.sort);
  }
  e.dir !== s.dir && l(tn, e.dir), e.expr.trim() !== "" && l(Ee, Un(e.expr, o, t)), e.page > 1 && l(bt, String(e.page));
  const d = [
    ...r.map(([v, w]) => [lt(v), w]),
    ...c
  ];
  return d.length ? `?${d.map(([v, w]) => w === "" ? v : `${v}=${w}`).join("&")}` : "";
}
function Uc(e) {
  const t = [];
  for (const [n, a] of Object.entries(e))
    for (const s of Array.isArray(a) ? a : [a]) {
      if (typeof s != "string") continue;
      const o = lt(n);
      t.push(s === "" ? o : `${o}=${lt(s)}`);
    }
  return t.length ? `?${t.join("&")}` : "";
}
function Qc(e, t) {
  const n = new Map(nn(e)), a = n.get(Ee), s = a === void 0 ? "" : fe(a);
  if (!t) return s;
  const o = n.get(Ne);
  return We(
    s,
    o === void 0 ? null : aa(t, fe(o)),
    t
  );
}
function xt(e, t) {
  return sa(e, t.id);
}
function sa(e, t) {
  const n = e?.scope;
  return n ? oa(n, t) : null;
}
function oa(e, t) {
  return `${e}="${t.replace(/"/g, "")}"`;
}
function Gc(e, t) {
  const n = typeof e == "string" ? e : e?.scope;
  if (!n) return null;
  const a = t.filter((s) => s.replace(/"/g, "") !== "").map((s) => oa(n, s));
  return a.length ? a.join(" ") : null;
}
function St(e, t) {
  if (e.kind !== "field" || t.kind !== "field") return qt(e, t);
  const n = (a) => a.comparator === ":" || a.comparator === "=";
  return qt(e, { ...t, comparator: n(e) && n(t) ? e.comparator : t.comparator });
}
function it(e, t) {
  return St(e, ks(t));
}
function ct(e, t) {
  return xt(
    e.entities.find((n) => n.key === t.entityKey),
    t
  );
}
function Ye(e, t) {
  if (!t) return e;
  const n = e.trim();
  if (!n) return t;
  const [a] = ae(t).flat();
  if (!a) return n;
  const s = ae(n);
  return s.some((c) => c.some((l) => St(l, a))) ? n : s.some((c) => c.some((l) => it(l, a))) ? ve(
    s.map(
      (c) => c.map((l) => it(l, a) ? a : l)
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
  const [n] = ae(t).flat();
  if (!n) return null;
  const a = ae(e).flat();
  return a.some((s) => St(s, n)) ? n.negated ? "out" : "in" : a.some((s) => it(s, n)) ? n.negated ? "in" : "out" : null;
}
function la(e, t) {
  if (!t || !e.trim()) return e;
  const [n] = ae(t).flat();
  if (!n) return e;
  const a = ae(e), s = a.map(
    (o) => o.filter((r) => !St(r, n) && !it(r, n))
  );
  return s.every((o, r) => o.length === a[r]?.length) ? e : ve(s);
}
function Dt(e, t, n) {
  return t ? n === null ? la(e, t) : Ye(e, n === "out" ? ra(t) : t) : e;
}
function ia(e) {
  return e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0;
}
function Ct(e) {
  return e.altKey ? { exclude: !0 } : {};
}
function Ot(e, t, n, a = {}) {
  const s = ct(e, n);
  return Ye(t.expr, a.exclude ? ra(s) : s);
}
function ca(e, t) {
  const n = e?.scope?.toLowerCase();
  if (!n || e?.keepsScope || !t.trim()) return t;
  const a = ae(t), s = a.map(
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
function Ks(e, t) {
  const n = [], a = /* @__PURE__ */ new Set();
  for (const s of t)
    for (const o of ae(s).flat()) {
      if (o.kind !== "field" || o.negated) continue;
      const r = da(e, o.field, o.value);
      if (!r) continue;
      const c = `${r.entity.key}:${r.id.toLowerCase()}`;
      a.has(c) || (a.add(c), n.push({ entityKey: r.entity.key, id: r.id }));
    }
  return n;
}
function Yc(e, t, n = "cards") {
  return {
    // An expression with nothing in it is no parameter, as the shell writes it.
    [Ee]: Ye(e, t) || void 0,
    [Ne]: void 0,
    [kt]: n,
    [bt]: void 0
  };
}
const fa = Symbol("dc.shellContext");
function Ws(e) {
  const t = e.liveQuery ? e : zs(e);
  return Qt(fa, t), t;
}
function zs(e) {
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
function X() {
  const e = Ut(fa, null);
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
  t ? t.provide(ut, Vt(e)) : Qt(ut, Vt(e));
}
function Us(e) {
  const t = Rn();
  Qt(ut, {
    ...Vt(e),
    element: () => t?.proxy?.$el ?? null
  });
}
function sn(e) {
  const t = Rn(), n = Ut(ut, null), a = _e(null);
  function s() {
    const l = t?.proxy?.$el, d = (l instanceof Element ? l : l?.parentElement)?.closest(".dc-shell");
    if (!d) {
      a.value = null;
      return;
    }
    const v = {};
    for (const w of Array.from(d.style))
      w.startsWith("--") && (v[w] = d.style.getPropertyValue(w));
    a.value = { shell: d, theme: d.dataset.dcTheme, tokens: v };
  }
  const o = f(() => {
    const l = a.value;
    if (!n) return l;
    const i = n.element?.();
    return l && i && l.shell !== i && i.contains(l.shell) ? l : n.read();
  }), r = f(() => e.theme ?? o.value?.theme ?? "minimal"), c = f(() => {
    const l = o.value, i = {
      ...l?.tokens,
      ...l?.accent ? { "--dc-accent": l.accent } : {},
      ...e.tokens,
      ...e.accent ? { "--dc-accent": e.accent } : {}
    };
    return Object.keys(i).length ? i : void 0;
  });
  return { theme: r, style: c, adopt: s };
}
function ze(e) {
  return e.key.toLowerCase();
}
const Qs = /* @__PURE__ */ new Set([">", ">=", "<", "<="]);
function va(e, t) {
  if (e.kind !== "field" || e.negated || e.field !== ze(t)) return !1;
  const n = e.comparator === ":" || e.comparator === "=";
  switch (t.kind) {
    case "range":
      return Ke(e) || Qs.has(e.comparator);
    case "chips":
      return n && !Ke(e) && pa(t.options, e.value) !== void 0;
    case "toggle":
      return n && Gs(e.value);
  }
}
function pa(e, t) {
  const n = t.toLowerCase();
  return e.find((a) => a.toLowerCase() === n);
}
function Gs(e) {
  const t = e.toLowerCase();
  return t === "true" || t === "yes";
}
function ha(e, t) {
  const n = (ae(e)[0] ?? []).filter((a) => va(a, t));
  switch (t.kind) {
    case "range": {
      let a = null, s = null;
      for (const o of n) {
        const r = _t(o.value), c = Number(o.value);
        r ? (r.min !== null && (a = r.min), r.max !== null && (s = r.max)) : Number.isFinite(c) && (o.comparator.startsWith(">") ? a = c : s = c);
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
function Ys(e, t) {
  const n = ze(e);
  switch (t.kind) {
    case "range":
      return t.min === null && t.max === null ? [] : [{ kind: "field", field: n, comparator: ":", value: fs(t) }];
    case "chips":
      return t.selected.map((a) => ({ kind: "field", field: n, comparator: "=", value: a }));
    case "toggle":
      return t.on ? [{ kind: "field", field: n, comparator: ":", value: "true" }] : [];
  }
}
function ma(e, t, n) {
  const a = Ys(t, n), s = ae(e), o = (s.length ? s : [[]]).map((r) => [
    ...r.filter((c) => !va(c, t)),
    ...a
  ]);
  return ve(o);
}
function Xc(e, t) {
  return ma(e, t, ts(t));
}
function Xs(e, t) {
  return (t?.facets ?? []).some((n) => ns(ha(e, n)));
}
const dt = "entity", je = "expr", Js = { ">=": "≥", "<=": "≤", ">": ">", "<": "<" };
function Zs(e, t, n) {
  if (e.kind !== "field") return ge(e);
  const a = ms(e.field, t, n);
  if (a === void 0) return ge(e);
  const s = e.negated ? "-" : "", o = Ke(e) ? _t(e.value) : null;
  if (o) {
    const c = o.min !== null && o.max !== null ? `${o.min} ≤ ${a} ≤ ${o.max}` : o.max !== null ? `${a} ≤ ${o.max}` : `${a} ≥ ${o.min}`;
    return s + c;
  }
  const r = Js[e.comparator];
  return r ? `${s}${a} ${r} ${e.value}` : ge({ ...e, field: a });
}
function on(e, t, n = null) {
  const a = [];
  return t && a.push({
    id: dt,
    label: `entity:${t.key}`,
    facetKey: dt
  }), ae(e.expr).forEach((s, o) => {
    s.forEach((r, c) => {
      a.push({
        id: `${je}:${o}:${c}`,
        label: Zs(r, t, n),
        address: Un(ge(r), t, n),
        facetKey: je,
        group: o,
        index: c,
        ...r.kind === "field" ? { field: r.field, value: r.value } : {},
        ...r.negated ? { negated: !0 } : {}
      });
    });
  }), a;
}
function eo(e, t, n = null) {
  if (Yt(e)) {
    const o = be(t, e.sort, n);
    return `everything · ${e.view} · ${o.label}`;
  }
  const a = on(e, t).filter((o) => o.facetKey !== je).map((o) => o.label), s = e.expr.trim();
  return s && a.push(`"${s}"`), a.join(" · ");
}
function to(e) {
  const { adapter: t } = e, n = f(() => Se(e.schema)), a = f(() => Se(e.defaults) ?? {}), s = f(() => Vs(t.search.value, n.value, a.value)), o = f(() => Ve(n.value, s.value.entity)), r = f(() => o.value ?? Dn(n.value, a.value)), c = f(() => gt(o.value, n.value)), l = f(() => be(o.value, s.value.sort, n.value)), i = ($, p) => {
    const g = En($, n.value, a.value, t.search.value);
    return g === t.search.value && !t.elsewhere?.value ? !1 : (p === "push" ? t.push(g) : t.replace(g), !0);
  }, d = () => Se(e.navigationMode) ?? "push", v = () => Se(e.facetNavigationMode) ?? "replace", w = ($, p) => {
    const g = $.page ?? (Lt($) ? 1 : s.value.page);
    return i({ ...s.value, ...$, page: g }, p);
  }, k = ($) => {
    const p = $.page ?? (Lt($) ? 1 : s.value.page);
    return _({ ...s.value, ...$, page: p });
  }, _ = ($) => {
    const p = En($, n.value, a.value, t.search.value);
    return t.href ? t.href(p) : `${t.path.value}${p}`;
  }, m = ($, p) => {
    const g = o.value?.facets.find((H) => H.key === $);
    if (!g) return;
    const L = ma(s.value.expr, g, p(ha(s.value.expr, g)));
    w({ expr: L }, v());
  }, b = ($) => {
    const p = $ === null ? null : Ve(n.value, $);
    return (p?.key ?? null) === s.value.entity ? {} : {
      entity: p?.key ?? null,
      view: pn(s.value.view, s.value.entity, p?.key ?? null, a.value),
      sort: be(p, s.value.sort, n.value).key
    };
  }, E = ($) => {
    const p = b($);
    Object.keys(p).length && w(p, d());
  };
  return {
    query: s,
    entity: o,
    focus: r,
    sort: l,
    sorts: c,
    summary: f(() => eo(s.value, o.value, n.value)),
    terms: f(() => on(s.value, o.value, n.value)),
    isPristine: f(() => Yt(s.value)),
    isEverything: f(() => s.value.entity === null),
    hasFacets: f(() => Xs(s.value.expr, o.value)),
    setEntity: E,
    entityHref: ($) => k(b($)),
    clearEntity: () => E(null),
    setView($) {
      w({ view: $ }, d());
    },
    setSort($) {
      w({ sort: be(o.value, $, n.value).key }, d());
    },
    toggleDirection() {
      w({ dir: s.value.dir === "desc" ? "asc" : "desc" }, d());
    },
    setExpression($) {
      return w({ expr: $ }, d());
    },
    narrow($, p, g) {
      return w({ expr: $, ...b(p), ...g ? { view: g } : {} }, d());
    },
    narrowHref($, p, g) {
      return k({ expr: $, ...b(p), ...g ? { view: g } : {} });
    },
    setPage($, p) {
      w({ page: Math.max(1, Math.floor($)) }, p ?? d());
    },
    setFacet($, p) {
      m($, () => p);
    },
    toggleChip($, p) {
      m($, (g) => g.kind !== "chips" ? g : { kind: "chips", selected: g.selected.includes(p) ? g.selected.filter((H) => H !== p) : [...g.selected, p] });
    },
    setRange($, p, g) {
      m($, (L) => L.kind === "range" ? { kind: "range", min: p, max: g } : L);
    },
    toggleFlag($) {
      m(
        $,
        (p) => p.kind === "toggle" ? { kind: "toggle", on: !p.on } : p
      );
    },
    removeTerm($) {
      if ($.facetKey === dt) {
        E(null);
        return;
      }
      if ($.facetKey === je) {
        const p = bs(ae(s.value.expr), $.group ?? 0, $.index ?? 0);
        w({ expr: ve(p) }, d());
      }
    },
    clearFilters() {
      w({ ...b(null), expr: "" }, d());
    },
    clearHref: () => k({ ...b(null), expr: "" }),
    reset() {
      i(st(n.value, a.value), d());
    },
    homeHref: () => _(st(n.value, a.value)),
    hrefFor($) {
      const p = { ...s.value, ...$ };
      return "entity" in $ && !("view" in $) && (p.view = pn(s.value.view, s.value.entity, p.entity, a.value)), p.page = $.page ?? (Lt($) ? 1 : s.value.page), _(p);
    }
  };
}
function no(e) {
  const t = _e([]), n = R(0), a = R(!1), s = R(!1), o = _e(null);
  let r = 0, c = null, l = null;
  const i = f(() => (e.query.value.page - 1) * e.limit.value), d = f(() => as(n.value, e.limit.value)), v = () => {
    const g = e.query.value, L = e.within?.value.trim(), H = ca(e.entity.value, g.expr);
    return L ? { ...g, expr: Zt(L, H) } : H === g.expr ? g : { ...g, expr: H };
  }, w = (g, L) => {
    t.value = g.rows, n.value = g.total, o.value = null, k(L);
  }, k = (g) => {
    c = { key: g, total: n.value }, s.value = !1;
  }, _ = (g) => {
    o.value = g, t.value = [], n.value = 0, c = null, s.value = !1;
  }, m = (g, L, H, G) => {
    let B = !0;
    const W = () => g === r;
    let te = 0, le = !1;
    const ie = (J) => {
      te = J, le = !0, G === void 0 && (n.value = J);
    }, de = () => {
      B && (B = !1, t.value = [], ie(0)), o.value = null;
    };
    return {
      get open() {
        return W();
      },
      insert(J, O) {
        if (!W()) return;
        const V = Array.isArray(J) ? J : [J];
        if (!V.length) return;
        de();
        const N = [...t.value];
        N.splice(O ?? N.length, 0, ...V), t.value = L > 0 ? N.slice(0, L) : N, ie(te + V.length);
      },
      set(J) {
        W() && (J.rows && (de(), t.value = L > 0 ? J.rows.slice(0, L) : J.rows, ie(J.rows.length)), J.total !== void 0 && ie(J.total));
      },
      close() {
        W() && (a.value = !1, le && (n.value = te), k(H));
      },
      fail(J) {
        W() && (_(J), a.value = !1);
      }
    };
  }, b = () => {
    const g = l;
    l = null, g?.();
  }, E = () => {
    const g = ++r;
    b();
    const L = $.value, H = c?.key === L ? c.total : void 0;
    s.value = H === void 0;
    const G = {
      query: v(),
      schema: e.schema.value,
      entity: e.entity.value,
      limit: e.limit.value,
      offset: i.value
    }, B = e.source.value;
    if (B.stream) {
      a.value = !0;
      try {
        l = B.stream(G, m(g, G.limit, L, H)) ?? null;
      } catch (te) {
        _(te), a.value = !1;
      }
      return;
    }
    let W;
    try {
      W = B.query(G);
    } catch (te) {
      _(te);
      return;
    }
    if (!(W instanceof Promise)) {
      w(W, L), a.value = !1;
      return;
    }
    a.value = !0, W.then((te) => {
      g === r && w(te, L);
    }).catch((te) => {
      g === r && _(te);
    }).finally(() => {
      g === r && (a.value = !1);
    });
  }, $ = f(() => {
    const g = v();
    return `${e.entity.value?.key ?? e.schema.value.entities[0]?.key ?? ""}|${JSON.stringify(Xt.map((H) => g[H]))}`;
  }), p = f(() => `${$.value}|${e.query.value.page}`);
  return ee([e.source, p, e.limit], E, {
    immediate: !0
  }), vt(() => {
    r++, b();
  }, !0), { rows: t, total: n, offset: i, pageCount: d, pending: a, counting: s, error: o, refresh: E };
}
const ao = 150;
function so(e) {
  const t = e.delay ?? ao, n = R(""), a = R("");
  let s = !1, o;
  const r = () => {
    clearTimeout(o), o = void 0;
  }, c = f(() => We(Cs(a.value), e.entity.value, e.schema?.value)), l = f(() => c.value.trim() !== ""), i = f(
    () => JSON.stringify([c.value, ...Xt.map((k) => e.query.value[k])])
  ), d = _e(null), v = f(() => {
    const k = e.query.value;
    if (!l.value) return k;
    const _ = d.value?.of === i.value ? d.value.page : 1;
    return { ...k, expr: ot(k.expr, c.value), page: _ };
  });
  ee(n, (k) => {
    if (r(), !k.trim()) {
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
  const w = (k) => {
    r(), s = !0, n.value = "", !k() && s && (s = !1, a.value = "");
  };
  return Bn() && vt(r), {
    text: n,
    live: v,
    drafting: l,
    setPage(k) {
      d.value = { of: i.value, page: Math.max(1, Math.floor(k)) };
    },
    commit() {
      const k = n.value.trim();
      if (!k) return;
      const _ = ot(
        e.query.value.expr,
        We(k, e.entity.value, e.schema?.value)
      );
      a.value = k, w(() => e.setExpression(_));
    },
    abandon() {
      r(), s = !1, n.value = "", a.value = "";
    },
    release: w
  };
}
const oo = 25, ya = (e, t) => e.toLowerCase() === t.toLowerCase();
function ro(e, t) {
  return e.find((n) => ya(n.id, t));
}
function lo(e) {
  const t = _e(/* @__PURE__ */ new Map()), n = /* @__PURE__ */ new Set(), a = (c) => {
    if (c.facetKey !== je) return null;
    const l = da(e.schema.value, c.field, c.value);
    return l ? { ...l, key: `${l.entity.key}:${l.id}` } : null;
  }, s = (c) => {
    const { entity: l, id: i } = c, d = e.query.value;
    return e.source.value.query({
      query: {
        ...d,
        entity: l.key,
        // The reference on its own. The rest of the query is about the rows on
        // screen, which are of another type entirely.
        expr: sa(l, i) ?? "",
        sort: be(l, d.sort, e.schema.value).key,
        page: 1
      },
      schema: e.schema.value,
      entity: l,
      limit: oo,
      offset: 0
    });
  }, o = (c, l) => {
    const i = nt(ue(c.columns ?? [], "identity"), l);
    return i === he || ya(i, l.id) ? "" : i;
  }, r = () => {
    if (e.loading.value) return;
    const c = /* @__PURE__ */ new Map();
    for (const d of e.terms.value) {
      const v = a(d);
      v && !t.value.has(v.key) && !n.has(v.key) && c.set(v.key, v);
    }
    if (!c.size) return;
    const l = [...c.values()].map((d) => ({
      reference: d,
      outcome: s(d)
    })), i = (d) => {
      const v = new Map(t.value);
      d.forEach((w, k) => {
        const { reference: _ } = l[k], m = ro(w.rows, _.id);
        v.set(_.key, m ? o(_.entity, m) : "");
      }), t.value = v;
    };
    if (l.every(({ outcome: d }) => !(d instanceof Promise))) {
      i(l.map(({ outcome: d }) => d));
      return;
    }
    for (const { reference: d } of l) n.add(d.key);
    Promise.all(l.map(({ outcome: d }) => Promise.resolve(d))).then(i).catch(() => {
    }).finally(() => {
      for (const { reference: d } of l) n.delete(d.key);
    });
  };
  return ee([e.source, e.schema, e.terms, e.loading], () => {
    try {
      r();
    } catch {
    }
  }, { immediate: !0 }), {
    names: t,
    nameOf(c) {
      const l = a(c);
      return l && t.value.get(l.key) || null;
    }
  };
}
const io = 4, co = 8, uo = 180;
function fo(e, t, n, a = {}) {
  const s = a.gap ?? io, o = a.margin ?? co, r = a.flipBelow ?? uo, c = a.side ?? "below", l = {
    below: n.height - e.bottom - s - o,
    above: e.top - s - o
  }, i = c === "below" ? "above" : "below", d = l[c] < r && l[i] > l[c] ? i : c, v = Math.min(a.maxHeight ?? 1 / 0, Math.max(0, l[d])), w = Math.max(0, n.width - o * 2), k = Math.min(a.minWidth ?? e.width, w), _ = Math.min(Math.max(t, k), w), m = a.align === "end" ? e.right - _ : e.left, b = Math.max(o, Math.min(m, n.width - _ - o));
  return d === "below" ? { side: d, left: b, top: e.bottom + s, maxHeight: v, minWidth: k, maxWidth: w } : { side: d, left: b, bottom: n.height - e.top + s, maxHeight: v, minWidth: k, maxWidth: w };
}
const vo = ["data-dc-theme", "data-dc-side"], ke = [], po = /* @__PURE__ */ F({
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
    const n = e, a = t, { theme: s, style: o, adopt: r } = sn(n), c = R(null), l = R(null), i = { root: () => c.value };
    function d() {
      const p = n.anchor;
      p && (l.value = fo(
        p.getBoundingClientRect(),
        c.value?.offsetWidth ?? 0,
        { width: window.innerWidth, height: window.innerHeight },
        { side: n.side, align: n.align, maxHeight: n.maxHeight, minWidth: n.minWidth }
      ));
    }
    const v = f(() => {
      const p = l.value, g = p ? {
        position: "fixed",
        left: `${p.left}px`,
        ...p.top !== void 0 ? { top: `${p.top}px` } : {},
        ...p.bottom !== void 0 ? { bottom: `${p.bottom}px` } : {},
        minWidth: `${p.minWidth}px`,
        maxWidth: `${p.maxWidth}px`,
        maxHeight: `${p.maxHeight}px`,
        overflowY: "auto"
      } : { position: "fixed", visibility: "hidden" };
      return { ...o.value, ...g };
    });
    function w() {
      a("update:open", !1), a("close");
    }
    function k(p) {
      return c.value?.contains(p) || n.anchor?.contains(p) ? !0 : ke.slice(ke.indexOf(i) + 1).some((L) => L.root()?.contains(p));
    }
    function _(p) {
      const g = p.target;
      g && !k(g) && w();
    }
    function m(p) {
      p.key !== "Escape" || p.defaultPrevented || ke[ke.length - 1] === i && (p.preventDefault(), c.value?.contains(document.activeElement) && n.anchor?.focus(), w());
    }
    let b = null;
    async function E() {
      ke.includes(i) || (ke.push(i), r(), l.value = null, await Fe(), d(), window.addEventListener("pointerdown", _, !0), document.addEventListener("keydown", m, !0), window.addEventListener("resize", d), window.addEventListener("scroll", d, !0), typeof ResizeObserver < "u" && c.value && (b = new ResizeObserver(() => d()), b.observe(c.value)));
    }
    function $() {
      const p = ke.indexOf(i);
      p !== -1 && (ke.splice(p, 1), window.removeEventListener("pointerdown", _, !0), document.removeEventListener("keydown", m, !0), window.removeEventListener("resize", d), window.removeEventListener("scroll", d, !0), b?.disconnect(), b = null);
    }
    return Qe(() => {
      n.open && E();
    }), ee(
      () => n.open,
      (p) => {
        p ? E() : $();
      }
    ), ee(() => n.anchor, () => {
      n.open && d();
    }), pe($), (p, g) => e.open ? (u(), I(pt, {
      key: 0,
      to: e.to
    }, [
      S("div", At({
        ref_key: "root",
        ref: c
      }, p.$attrs, {
        class: "dc-shell dc-layer dc-popover",
        "data-dc-theme": x(s),
        "data-dc-side": l.value?.side,
        style: v.value
      }), [
        j(p.$slots, "default", {}, void 0, !0)
      ], 16, vo)
    ], 8, ["to"])) : T("", !0);
  }
}), D = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [a, s] of t)
    n[a] = s;
  return n;
}, ho = /* @__PURE__ */ D(po, [["__scopeId", "data-v-a688f2f7"]]), mo = ["href"], yo = /* @__PURE__ */ F({
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
      o.preventDefault(), a("press", Ct(o), o);
    }
    return (o, r) => e.href ? (u(), h("a", {
      key: 0,
      href: e.href,
      class: "dc-press",
      onClick: s
    }, [
      j(o.$slots, "default", {}, void 0, !0)
    ], 8, mo)) : (u(), h("button", {
      key: 1,
      type: "button",
      class: "dc-press",
      onClick: s
    }, [
      j(o.$slots, "default", {}, void 0, !0)
    ]));
  }
}), Z = /* @__PURE__ */ D(yo, [["__scopeId", "data-v-a9383f64"]]), ft = (e) => e.toLowerCase().replace(/\s+/g, ""), go = /(?:[^\s"]|"[^"]*"?)*$/, _o = /^(-?)([^:=<>"\s-][^:=<>"\s]*)([:=])(.*)$/, Mn = 4;
function wo(e, t) {
  const n = ft(t);
  return e.find((a) => ze(a) === n || ft(a.label) === n);
}
function ko(e) {
  switch (e.kind) {
    case "toggle":
      return e.text;
    case "range":
      return `${e.min}..${e.max}`;
    case "chips": {
      const t = e.options.slice(0, Mn).join(" · "), n = e.options.length - Mn;
      return n > 0 ? `${t} · +${n}` : t;
    }
  }
}
function bo(e) {
  switch (e.kind) {
    case "toggle":
      return [{ value: "true", hint: e.text }, { value: "false" }];
    case "chips":
      return e.options.map((t) => ({ value: t }));
    case "range":
      return [];
  }
}
function Ln(e, t) {
  return ft(e).includes(ft(t));
}
function $o(e, t) {
  const n = go.exec(e)?.[0] ?? "", a = e.slice(0, e.length - n.length), s = [], o = _o.exec(n);
  if (o) {
    const [, r, c, l, i] = o, d = wo(t, c);
    if (!d) return [];
    const v = i.replace(/"/g, "").toLowerCase();
    for (const { value: w, hint: k } of bo(d)) {
      if (!w.toLowerCase().includes(v)) continue;
      const _ = ge({
        kind: "field",
        field: ze(d),
        comparator: l,
        value: w,
        ...r ? { negated: !0 } : {}
      });
      s.push({ draft: a + _, label: _, ...k ? { hint: k } : {}, complete: !0 });
    }
  } else {
    if (/[<>"]/.test(n)) return [];
    const r = n.startsWith("-") ? "-" : "", c = n.slice(r.length);
    for (const l of t) {
      if (c && !Ln(l.key, c) && !Ln(l.label, c)) continue;
      const i = `${r}${ze(l)}:`;
      s.push({ draft: a + i, label: i, hint: ko(l), complete: !1 });
    }
  }
  return s.filter((r) => r.draft !== e);
}
const xo = { class: "dc-header" }, So = { class: "dc-header__main" }, Co = {
  class: "dc-header__brand",
  "aria-hidden": "true"
}, Po = { class: "dc-header__sr" }, Eo = {
  key: 2,
  class: "dc-header__within"
}, Mo = ["title"], Lo = { class: "dc-header__query" }, To = ["data-dc-more", "title"], Oo = { class: "dc-header__run" }, No = {
  key: 0,
  class: "dc-header__or dc-mono",
  "aria-hidden": "true"
}, Ao = ["title", "aria-label", "onClick"], Io = ["placeholder", "aria-expanded", "aria-activedescendant", "onKeydown"], Ro = ["id", "aria-selected", "onClick"], Bo = { class: "dc-completion__term dc-mono" }, Ho = {
  key: 0,
  class: "dc-completion__hint"
}, Fo = {
  key: 0,
  class: "dc-header__actions"
}, qo = /* @__PURE__ */ F({
  __name: "ShellHeader",
  setup(e) {
    const t = ht(), n = X(), a = f(() => n.schema.value), s = f(() => {
      const C = n.within.value.trim();
      return C ? on({ ...n.query.value, expr: C }, null) : [];
    }), o = f(() => {
      const C = n.entity.value, y = C?.keepsScope ? void 0 : C?.scope?.toLowerCase();
      return n.terms.value.filter((M) => M.facetKey !== dt).map((M, A, Te) => {
        const cn = Te[A - 1];
        return {
          term: M,
          or: cn?.group !== void 0 && M.group !== void 0 && M.group !== cn.group,
          idle: !!y && M.field?.toLowerCase() === y
        };
      });
    }), r = lo({
      source: n.source,
      schema: n.schema,
      query: n.query,
      loading: n.loading,
      // The scope's parts as well as the query's: it names a record more often
      // than a typed term does, being what a record's own page is built on.
      terms: f(() => [...s.value, ...n.terms.value])
    });
    function c(C) {
      const y = ua(a.value, C)?.scopeLabel ?? C;
      return y.charAt(0).toUpperCase() + y.slice(1);
    }
    function l(C) {
      return C.replace(/\s*\([^()]*\)\s*$/, "");
    }
    function i(C) {
      const y = r.nameOf(C);
      return y ? `${C.negated ? "-" : ""}${c(C.field)}: ${l(y)}` : C.label;
    }
    function d(C) {
      const y = i(C.term), M = C.idle ? `Not applied to ${n.entity.value?.label} — remove ${y}` : `Remove ${y}`, A = C.term.address;
      return A && A !== y ? `${M}
Written ${A} in the address and the search box` : M;
    }
    const v = R(null);
    function w(C) {
      v.value = C instanceof HTMLInputElement ? C : null;
    }
    function k() {
      n.abandonDraft(), v.value?.blur();
    }
    function _() {
      const C = E.value[b.value];
      if ($.value && C) {
        g(C);
        return;
      }
      G.value = null, m.value = !1, n.commitDraft();
    }
    const m = R(!1), b = R(-1), E = f(() => {
      const C = n.entity.value?.facets ?? [];
      return C.length ? $o(n.draft.value, C) : [];
    }), $ = f(() => m.value && E.value.length > 0);
    ee(E, () => {
      b.value = -1;
    });
    const p = `${mt() ?? "dc-header"}-completions`;
    function g(C) {
      n.draft.value = C.draft, m.value = !C.complete, b.value = -1, Fe(() => {
        const y = v.value;
        y?.focus(), y?.setSelectionRange(C.draft.length, C.draft.length);
      });
    }
    function L(C, y) {
      if (C.isComposing || !E.value.length) return;
      if (C.preventDefault(), !m.value) {
        m.value = !0;
        return;
      }
      const M = E.value.length + 1;
      b.value = (b.value + 1 + y + M) % M - 1;
    }
    function H(C) {
      return `${p}-${C}`;
    }
    const G = R(null), B = f(() => Math.min(G.value ?? 1 / 0, o.value.length)), W = f(() => [
      { key: "before", entries: o.value.slice(0, B.value) },
      { key: "after", entries: o.value.slice(B.value) }
    ]), te = f(() => B.value < o.value.length);
    ee(o, (C) => {
      G.value !== null && G.value >= C.length && (G.value = null);
    });
    function le(C, y) {
      G.value = C >= o.value.length ? null : Math.max(0, C), Fe(() => {
        const M = v.value;
        if (!M) return;
        const A = y === "start" ? 0 : M.value.length;
        M.setSelectionRange(A, A), M.scrollIntoView({ block: "nearest", inline: "nearest" }), me();
      });
    }
    function ie(C) {
      const y = v.value;
      return !y || y.selectionStart !== y.selectionEnd ? !1 : y.selectionStart === (C === "start" ? 0 : y.value.length);
    }
    function de(C) {
      B.value === 0 || !ie("start") || (C.preventDefault(), le(C.key === "Home" ? 0 : B.value - 1, "start"));
    }
    function J(C) {
      !te.value || !ie("end") || (C.preventDefault(), le(C.key === "End" ? o.value.length : B.value + 1, "end"));
    }
    function O(C) {
      B.value === 0 || !ie("start") || (C.preventDefault(), U(o.value[B.value - 1].term, !0));
    }
    function V(C) {
      !te.value || !ie("end") || (C.preventDefault(), U(o.value[B.value].term, !1));
    }
    function N(C) {
      C.isComposing || C.altKey || C.ctrlKey || C.metaKey || C.shiftKey || (C.key === "ArrowLeft" || C.key === "Home" ? de(C) : C.key === "ArrowRight" || C.key === "End" ? J(C) : C.key === "Backspace" ? O(C) : C.key === "Delete" && V(C));
    }
    function U(C, y) {
      y && G.value !== null && (G.value = Math.max(0, G.value - 1)), n.removeTerm(C);
    }
    function ce(C) {
      C.target?.closest("button, input") || (C.preventDefault(), v.value?.focus(), le(o.value.length, "end"));
    }
    function Ae() {
      m.value = !1, n.draft.value || (G.value = null);
    }
    const we = R(null), xe = R("");
    function me() {
      const C = we.value;
      if (!C) {
        xe.value = "";
        return;
      }
      const y = C.scrollLeft > 1, M = C.scrollWidth - C.clientWidth - C.scrollLeft > 1;
      xe.value = y && M ? "both" : y ? "start" : M ? "end" : "";
    }
    let ye = null;
    return ee(
      we,
      (C) => {
        ye?.disconnect(), ye = null, me(), !(!C || typeof ResizeObserver > "u") && (ye = new ResizeObserver(me), ye.observe(C));
      },
      { flush: "post" }
    ), ee([o, B], me, { flush: "post" }), pe(() => ye?.disconnect()), (C, y) => (u(), h("div", xo, [
      S("div", So, [
        a.value.label && t.brand ? (u(), I(Z, {
          key: 0,
          class: "dc-header__domain",
          "data-dc-brand": "",
          title: "Home",
          href: x(n).homeHref(),
          onPress: y[0] || (y[0] = (M) => x(n).reset())
        }, {
          default: z(() => [
            S("span", Co, [
              j(C.$slots, "brand", {
                label: a.value.label
              }, void 0, !0)
            ]),
            S("span", Po, P(a.value.label), 1)
          ]),
          _: 3
        }, 8, ["href"])) : a.value.label ? (u(), I(Z, {
          key: 1,
          class: "dc-header__domain",
          title: "Home",
          href: x(n).homeHref(),
          onPress: y[1] || (y[1] = (M) => x(n).reset())
        }, {
          default: z(() => [
            Y(P(a.value.label), 1)
          ]),
          _: 1
        }, 8, ["href"])) : T("", !0),
        j(C.$slots, "lead", {}, void 0, !0),
        s.value.length ? (u(), h("span", Eo, [
          y[10] || (y[10] = S("span", { class: "dc-header__sr" }, "Within", -1)),
          (u(!0), h(q, null, Q(s.value, (M) => (u(), h("span", {
            key: `scope:${M.id}`,
            class: "dc-within dc-mono dc-truncate",
            title: i(M)
          }, P(i(M)), 9, Mo))), 128))
        ])) : T("", !0),
        S("div", Lo, [
          S("div", {
            class: "dc-header__field",
            onMousedown: ce
          }, [
            S("div", {
              ref_key: "termBar",
              ref: we,
              class: "dc-header__terms",
              "data-dc-more": xe.value,
              title: x(n).summary.value,
              onScroll: me
            }, [
              (u(!0), h(q, null, Q(W.value, (M) => (u(), h(q, {
                key: M.key
              }, [
                S("span", Oo, [
                  (u(!0), h(q, null, Q(M.entries, (A) => (u(), h(q, {
                    key: A.term.id
                  }, [
                    A.or ? (u(), h("span", No, "or")) : T("", !0),
                    S("button", {
                      type: "button",
                      class: se(["dc-term dc-mono", { "dc-term--idle": A.idle }]),
                      title: d(A),
                      "aria-label": `Remove ${i(A.term)}`,
                      onMousedown: y[2] || (y[2] = Ce(() => {
                      }, ["prevent"])),
                      onClick: (Te) => U(A.term, M.key === "before")
                    }, P(i(A.term)), 43, Ao)
                  ], 64))), 128))
                ]),
                M.key === "before" ? It((u(), h("input", {
                  key: 0,
                  ref_for: !0,
                  ref: w,
                  "onUpdate:modelValue": y[3] || (y[3] = (A) => x(n).draft.value = A),
                  class: se(["dc-header__search dc-mono", { "dc-header__search--between": te.value }]),
                  style: ne({ "--dc-typed": String(Math.max(1, x(n).draft.value.length)) }),
                  type: "text",
                  autocomplete: "off",
                  spellcheck: "false",
                  placeholder: te.value ? "" : "Search…",
                  "aria-label": "Search",
                  role: "combobox",
                  "aria-autocomplete": "list",
                  "aria-expanded": $.value,
                  "aria-controls": p,
                  "aria-activedescendant": $.value && b.value >= 0 ? H(b.value) : void 0,
                  onKeydown: [
                    Oe(Ce(_, ["prevent"]), ["enter"]),
                    Oe(Ce(k, ["prevent"]), ["esc"]),
                    y[4] || (y[4] = Oe((A) => L(A, 1), ["down"])),
                    y[5] || (y[5] = Oe((A) => L(A, -1), ["up"])),
                    N
                  ],
                  onFocus: y[6] || (y[6] = (A) => m.value = !0),
                  onInput: y[7] || (y[7] = (A) => m.value = !0),
                  onBlur: Ae
                }, null, 46, Io)), [
                  [Aa, x(n).draft.value]
                ]) : T("", !0)
              ], 64))), 128))
            ], 40, To)
          ], 32)
        ])
      ]),
      K(ho, {
        id: p,
        open: $.value,
        anchor: v.value,
        "min-width": 0,
        "max-height": 320,
        class: "dc-completions",
        role: "listbox",
        "aria-label": "Completions",
        onClose: y[9] || (y[9] = (M) => m.value = !1)
      }, {
        default: z(() => [
          (u(!0), h(q, null, Q(E.value, (M, A) => (u(), h("div", {
            id: H(A),
            key: M.label,
            class: se(["dc-completion", { "dc-completion--active": A === b.value }]),
            role: "option",
            "aria-selected": A === b.value,
            onMousedown: y[8] || (y[8] = Ce(() => {
            }, ["prevent"])),
            onClick: (Te) => g(M)
          }, [
            S("span", Bo, P(M.label), 1),
            M.hint ? (u(), h("span", Ho, P(M.hint), 1)) : T("", !0)
          ], 42, Ro))), 128))
        ]),
        _: 1
      }, 8, ["open", "anchor"]),
      t.actions ? (u(), h("div", Fo, [
        j(C.$slots, "actions", {}, void 0, !0)
      ])) : T("", !0)
    ]));
  }
}), ga = /* @__PURE__ */ D(qo, [["__scopeId", "data-v-12391658"]]), Do = ["checked", "indeterminate"], _a = /* @__PURE__ */ F({
  __name: "PageTick",
  setup(e) {
    const t = X(), n = f(() => t.rows.value.filter((o) => t.isSelected(o)).length), a = f(
      () => t.rows.value.length > 0 && n.value === t.rows.value.length
    ), s = f(() => n.value > 0 && !a.value);
    return (o, r) => (u(), h("input", {
      class: "dc-tick",
      type: "checkbox",
      checked: a.value,
      indeterminate: s.value,
      "aria-label": "Select every row on this page",
      title: "Select every row on this page",
      onChange: r[0] || (r[0] = (c) => x(t).selectPage(!a.value))
    }, null, 40, Do));
  }
}), Vo = { class: "dc-pick" }, Ko = ["id"], Wo = ["id", "aria-expanded", "aria-labelledby", "data-dc-value"], zo = { class: "dc-pick__label" }, jo = /* @__PURE__ */ F({
  __name: "PickControl",
  props: {
    modelValue: {},
    options: {},
    label: {},
    mono: { type: Boolean }
  },
  emits: ["update:modelValue", "open", "close"],
  setup(e, { emit: t }) {
    const n = e, a = t, s = mt() ?? "dc-pick", o = R(null), r = R(null), c = R(null), l = R(!1), i = f(() => c.value !== null), d = R(null), v = f(
      () => n.options.find((g) => g.key === n.modelValue) ?? n.options[0]
    ), w = f(
      () => n.options.map((g) => ({
        id: g.key,
        label: g.label,
        icon: g.icon,
        checked: g.key === n.modelValue
      }))
    ), k = f(
      () => c.value ? { maxHeight: `${window.innerHeight - c.value.y - 8}px` } : void 0
    );
    function _(g) {
      const L = o.value?.getBoundingClientRect();
      L && (d.value = o.value?.closest(".dc-shell") ?? document.body, c.value = { x: L.left, y: L.bottom + 4, mirrorX: L.right }, l.value = g, a("open"));
    }
    function m(g) {
      c.value && a("close"), c.value = null, g && o.value?.focus();
    }
    function b() {
      i.value ? m(!0) : _(!1);
    }
    function E(g) {
      g.key !== "ArrowDown" && g.key !== "ArrowUp" || i.value || (g.preventDefault(), _(!0));
    }
    function $(g) {
      const L = g.target;
      L && (o.value?.contains(L) || r.value?.root?.contains(L) || m(!1));
    }
    ee(i, (g) => {
      g ? window.addEventListener("pointerdown", $, !0) : window.removeEventListener("pointerdown", $, !0);
    }), pe(() => window.removeEventListener("pointerdown", $, !0));
    function p(g) {
      m(!0), !(g.id === void 0 || g.id === n.modelValue) && a("update:modelValue", g.id);
    }
    return (g, L) => (u(), h("span", Vo, [
      S("span", {
        id: `${x(s)}-name`,
        class: "dc-pick__name"
      }, P(e.label), 9, Ko),
      S("button", {
        id: `${x(s)}-value`,
        ref_key: "trigger",
        ref: o,
        type: "button",
        class: se(["dc-pick__button", { "dc-mono": e.mono }]),
        "aria-haspopup": "menu",
        "aria-expanded": i.value,
        "aria-labelledby": `${x(s)}-name ${x(s)}-value`,
        "data-dc-value": e.modelValue,
        onClick: b,
        onKeydown: E
      }, [
        S("span", zo, P(v.value?.label), 1)
      ], 42, Wo),
      L[1] || (L[1] = S("svg", {
        class: "dc-pick__mark",
        viewBox: "0 0 16 16",
        "aria-hidden": "true"
      }, [
        S("path", { d: "M4 6l4 4 4-4" })
      ], -1)),
      c.value && d.value ? (u(), I(pt, {
        key: 0,
        to: d.value
      }, [
        K(x(Da), {
          ref_key: "menu",
          ref: r,
          class: "dc-pick__list",
          style: ne(k.value),
          items: w.value,
          at: c.value,
          label: e.label,
          autofocus: l.value,
          onChoose: p,
          onDismiss: L[0] || (L[0] = (H) => m(!0))
        }, null, 8, ["style", "items", "at", "label", "autofocus"])
      ], 8, ["to"])) : T("", !0)
    ]));
  }
}), Kt = /* @__PURE__ */ D(jo, [["__scopeId", "data-v-480c1d3c"]]), Uo = {
  class: "dc-pager",
  "aria-label": "Pages"
}, Qo = ["title"], Go = ["value", "onKeydown"], Yo = {
  class: "dc-pager__total",
  "aria-hidden": "true"
}, Xo = {
  class: "dc-pager__sr",
  "aria-live": "polite"
}, Jo = /* @__PURE__ */ F({
  __name: "ShellPager",
  props: {
    pagesNote: {}
  },
  setup(e) {
    const t = e, n = X(), a = f(() => n.liveQuery.value.page), s = f(
      () => `${n.counting.value ? "~" : ""}${Ie(n.pageCount.value)}`
    ), o = f(() => {
      let k = `Page ${Ie(a.value)} of ${s.value}`;
      const _ = n.rows.value.length;
      if (_) {
        const m = n.offset.value + 1, b = `${n.counting.value ? "~" : ""}${Ie(n.total.value)}`;
        k += ` — rows ${Ie(m)} to ${Ie(m + _ - 1)} of ${b}`;
      }
      return t.pagesNote ? `${k}
${t.pagesNote}` : k;
    }), r = R(null), c = f(() => r.value ?? String(a.value)), l = f(
      () => `calc(${Math.max(2, String(n.pageCount.value).length)}ch + 10px)`
    );
    function i(k) {
      k.target.select();
    }
    function d(k) {
      const _ = k.target, m = _.value.replace(/[^0-9]/g, "");
      _.value !== m && (_.value = m), r.value = m;
    }
    function v(k) {
      const _ = k.target, m = Number(r.value);
      r.value = null;
      const b = Number.isFinite(m) && m >= 1 ? Math.min(Math.trunc(m), Math.max(1, n.pageCount.value)) : a.value;
      _.value = String(b), b !== a.value && n.setPage(b);
    }
    function w(k) {
      const _ = k.target;
      r.value = null, _.value = String(a.value), _.blur();
    }
    return (k, _) => (u(), h("nav", Uo, [
      K(Z, {
        class: "dc-pager__step",
        "aria-label": "Previous page",
        href: a.value > 1 ? x(n).hrefFor({ page: a.value - 1 }) : null,
        disabled: a.value <= 1,
        onPress: _[0] || (_[0] = (m) => x(n).setPage(a.value - 1))
      }, {
        default: z(() => [..._[2] || (_[2] = [
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
          style: ne({ width: l.value }),
          value: c.value,
          onFocus: i,
          onInput: d,
          onKeydown: [
            Oe(Ce(v, ["prevent"]), ["enter"]),
            Oe(Ce(w, ["prevent"]), ["esc"])
          ],
          onBlur: v
        }, null, 44, Go),
        S("span", Yo, "/ " + P(s.value), 1)
      ], 8, Qo),
      S("span", Xo, P(o.value), 1),
      K(Z, {
        class: "dc-pager__step",
        "aria-label": "Next page",
        href: a.value < x(n).pageCount.value ? x(n).hrefFor({ page: a.value + 1 }) : null,
        disabled: a.value >= x(n).pageCount.value,
        onPress: _[1] || (_[1] = (m) => x(n).setPage(a.value + 1))
      }, {
        default: z(() => [..._[3] || (_[3] = [
          S("span", { "aria-hidden": "true" }, "›", -1)
        ])]),
        _: 1
      }, 8, ["href", "disabled"])
    ]));
  }
}), Zo = /* @__PURE__ */ D(Jo, [["__scopeId", "data-v-de0ab034"]]), er = {
  key: 0,
  class: "dc-actions__order"
}, tr = {
  key: 1,
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
}, or = { class: "dc-actions__ops" }, rr = ["disabled"], lr = ["data-dc-operation", "disabled", "onClick"], ir = ["disabled"], cr = /* @__PURE__ */ F({
  __name: "RecordActions",
  props: {
    views: {},
    selectionPlacement: {},
    pagesNote: {}
  },
  setup(e) {
    const t = e, n = X(), a = f(() => yt(n.query.value.view, t.views)), s = f(
      () => d.value && a.value !== "table" && n.sorts.value.length > 0
    ), o = f(
      () => n.sorts.value.map((p) => ({ key: p.key, label: p.label }))
    ), r = f(() => s.value && o.value.length > 1), c = f(() => n.query.value.dir === "desc"), l = f(
      () => `Sorted by ${n.sort.value.label}, ${c.value ? "descending" : "ascending"}`
    ), i = f(() => n.entity.value), d = f(
      () => !Kn(n.query.value, t.views) && a.value !== "record"
    ), v = f(
      () => d.value && !n.loading.value && (n.pageCount.value > 1 || !!t.pagesNote)
    ), w = f(() => n.selection.value.ids.length), k = f(
      () => d.value && n.selectable.value && (n.rows.value.length > 0 || w.value > 0)
    ), _ = f(() => a.value === "table"), m = f(
      () => s.value || v.value || d.value && (k.value || !!(i.value?.create || i.value?.duplicate || i.value?.delete || i.value?.operations?.length))
    ), b = f(() => w.value ? `${w.value} selected` : _.value ? "" : "Select all"), E = f(() => t.selectionPlacement === "end");
    function $(p) {
      return w.value ? p.endsWith("…") ? `${p.slice(0, -1)} ${w.value}…` : `${p} ${w.value}` : p;
    }
    return (p, g) => m.value ? (u(), h("div", {
      key: 0,
      class: se(["dc-actions", { "dc-actions--selection-end": E.value }])
    }, [
      s.value ? (u(), h("span", er, [
        r.value ? (u(), I(Kt, {
          key: 0,
          class: "dc-actions__pick dc-actions__sort",
          label: "Sort",
          "model-value": x(n).sort.value.key,
          options: o.value,
          "onUpdate:modelValue": x(n).setSort
        }, null, 8, ["model-value", "options", "onUpdate:modelValue"])) : T("", !0),
        K(Z, {
          class: "dc-actions__dir",
          "aria-label": l.value,
          title: l.value,
          href: x(n).hrefFor({ dir: c.value ? "asc" : "desc" }),
          onPress: g[0] || (g[0] = (L) => x(n).toggleDirection())
        }, {
          default: z(() => [
            Y(P(c.value ? "↓" : "↑"), 1)
          ]),
          _: 1
        }, 8, ["aria-label", "title", "href"])
      ])) : T("", !0),
      k.value && b.value ? (u(), h("div", tr, [
        _.value ? (u(), h("span", sr, P(b.value), 1)) : (u(), h("label", nr, [
          K(_a),
          S("span", ar, P(b.value), 1)
        ])),
        w.value ? (u(), h("button", {
          key: 2,
          type: "button",
          class: se(["dc-actions__clear", { "dc-actions__clear--op": E.value }]),
          onClick: g[1] || (g[1] = (L) => x(n).clearSelection())
        }, " Clear ", 2)) : T("", !0)
      ])) : T("", !0),
      S("div", or, [
        i.value?.create ? (u(), I(Z, {
          key: 0,
          class: "dc-actions__op dc-actions__new",
          href: x(n).createHref?.(i.value),
          onPress: g[2] || (g[2] = (L) => x(n).create(i.value))
        }, {
          default: z(() => [
            g[5] || (g[5] = S("span", {
              class: "dc-actions__plus",
              "aria-hidden": "true"
            }, "+", -1)),
            Y(" " + P(i.value.create), 1)
          ]),
          _: 1
        }, 8, ["href"])) : T("", !0),
        i.value?.duplicate ? (u(), h("button", {
          key: 1,
          type: "button",
          class: "dc-actions__op",
          disabled: !w.value,
          onClick: g[3] || (g[3] = (L) => x(n).duplicate())
        }, P($(i.value.duplicate)), 9, rr)) : T("", !0),
        (u(!0), h(q, null, Q(i.value?.operations ?? [], (L) => (u(), h("button", {
          key: L.key,
          type: "button",
          class: "dc-actions__op",
          "data-dc-operation": L.key,
          disabled: !w.value && L.selection !== !1,
          onClick: (H) => x(n).operate(L.key)
        }, P(L.selection === !1 ? L.label : $(L.label)), 9, lr))), 128)),
        i.value?.delete ? (u(), h("button", {
          key: 2,
          type: "button",
          class: "dc-actions__op dc-actions__danger",
          disabled: !w.value,
          onClick: g[4] || (g[4] = (L) => x(n).delete())
        }, P($(i.value.delete)), 9, ir)) : T("", !0)
      ]),
      v.value ? (u(), I(Zo, {
        key: 2,
        class: "dc-actions__pages",
        "pages-note": e.pagesNote
      }, null, 8, ["pages-note"])) : T("", !0)
    ], 2)) : T("", !0);
  }
}), Wt = /* @__PURE__ */ D(cr, [["__scopeId", "data-v-94dad6ee"]]);
function ur(e) {
  const t = _e(/* @__PURE__ */ new Map()), n = R(!0);
  let a = 0, s;
  const o = () => {
    a++, s?.abort(), s = void 0;
  }, r = () => {
    o();
    const c = a, { signal: l } = s = new AbortController(), i = e.query.value, d = e.schema.value, v = e.entities.value, w = e.within?.value.trim() ?? "";
    n.value = i.expr.trim() === "" && !w;
    const k = /* @__PURE__ */ new Map();
    let _ = !0;
    for (const m of v) {
      const b = ca(m, i.expr), E = w ? Zt(w, b) : b;
      let $ = !1;
      const p = (L) => {
        if (c !== a) return;
        if (_) {
          k.set(m.key, L);
          return;
        }
        const H = new Map(t.value);
        H.set(m.key, L), t.value = H;
      }, g = e.source.value.query({
        query: { ...i, entity: m.key, expr: E, page: 1 },
        schema: d,
        entity: m,
        limit: 0,
        offset: 0,
        signal: l,
        progress: (L) => {
          $ || p({ total: L, pending: !0, counted: !0 });
        }
      });
      g instanceof Promise ? (k.has(m.key) || k.set(m.key, { total: 0, pending: !0, counted: !1 }), g.then((L) => {
        $ = !0, p({ total: L.total, pending: !1, counted: !0 });
      })) : ($ = !0, k.set(m.key, { total: g.total, pending: !1, counted: !0 }));
    }
    _ = !1, t.value = k;
  };
  return Bn() && vt(o), { counts: t, pristine: n, refresh: r, cancel: o };
}
const dr = {
  key: 0,
  class: "dc-choosers"
}, fr = "…", vr = /* @__PURE__ */ F({
  __name: "RecordChoosers",
  props: {
    views: {},
    typeChooser: {}
  },
  setup(e) {
    const t = e, n = X(), a = f(
      () => n.hasFacets.value || !!n.liveQuery.value.expr.trim() || !!n.within.value
    ), s = ur({
      source: n.source,
      schema: n.schema,
      // What each type holds of what is on screen, the draft's results included:
      // a count of the committed query would disagree with the rows under it.
      query: n.liveQuery,
      entities: n.entities,
      within: n.within
    });
    function o(k) {
      if (k.key === n.query.value.entity && a.value) return at(n.total.value);
      if (s.pristine.value) return Ht(k);
      const m = s.counts.value.get(k.key);
      return m ? m.counted ? `${m.pending ? "~" : ""}${at(m.total)}` : fr : Ht(k);
    }
    const r = f(() => [
      { key: "", label: "Everything" },
      ...n.entities.value.map((k) => ({
        key: k.key,
        label: `${k.label} · ${o(k)}`
      }))
    ]), c = f(
      () => t.typeChooser === "always" || n.query.value.entity !== null
    );
    function l(k) {
      n.setEntity(k || null);
    }
    const i = f(
      () => (t.views ?? [...Gt]).map((k) => ({
        key: k,
        label: k === "record" ? n.recordView.value?.label ?? hn.record : hn[k],
        icon: Za[k]
      }))
    ), d = f(() => yt(n.query.value.view, t.views)), v = f(() => i.value.length > 1);
    function w(k) {
      n.setView(k);
    }
    return (k, _) => c.value || v.value ? (u(), h("div", dr, [
      c.value ? (u(), I(Kt, {
        key: 0,
        class: "dc-actions__pick dc-actions__type",
        label: "Type",
        "model-value": x(n).query.value.entity ?? "",
        options: r.value,
        onOpen: x(s).refresh,
        onClose: x(s).cancel,
        "onUpdate:modelValue": l
      }, null, 8, ["model-value", "options", "onOpen", "onClose"])) : T("", !0),
      v.value ? (u(), I(Kt, {
        key: 1,
        class: "dc-actions__pick dc-actions__view",
        label: "View",
        "model-value": d.value,
        options: i.value,
        "onUpdate:modelValue": w
      }, null, 8, ["model-value", "options"])) : T("", !0)
    ])) : T("", !0);
  }
}), pr = /* @__PURE__ */ D(vr, [["__scopeId", "data-v-5a44a2f3"]]);
function hr(e, t) {
  if (!e) return null;
  const n = oe(e, t);
  return typeof n == "string" && n.trim() ? n : null;
}
const mr = (e) => e == null || typeof e == "string" && !e.trim();
function yr(e, t) {
  const n = ue(t, "state"), a = ue(t, "tint");
  return {
    identity: nt(ue(t, "identity"), e),
    reference: nt(ue(t, "reference"), e),
    metrics: Wn(t, "metric").map((s) => ({
      column: s,
      label: s.label ?? "",
      text: Pe(s, e)
    })),
    facts: t.filter((s) => s.cardLabel && !mr(oe(s, e))).map((s) => ({
      column: s,
      label: s.cardLabel,
      title: [s.label, s.hint].filter(Boolean).join(" — "),
      text: Pe(s, e)
    })),
    state: n ? oe(n, e) ?? null : null,
    updated: nt(ue(t, "updated"), e),
    image: hr(ue(t, "image"), e),
    tint: a ? oe(a, e) ?? null : null
  };
}
function wa(e, t, n, a, s = !1) {
  const o = n?.columns ?? [];
  return {
    row: e,
    key: rs(e, t),
    entityLabel: e.entityLabel,
    entity: n,
    columns: o,
    ordinal: ja(t),
    parts: yr(e, o),
    pinned: a,
    selected: s
  };
}
function Me() {
  const e = X(), t = f(
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
const gr = ["data-dc-status", "data-dc-tone"], _r = /* @__PURE__ */ F({
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
    }, P(n.value), 9, gr));
  }
}), Xe = /* @__PURE__ */ D(_r, [["__scopeId", "data-v-686eb9b6"]]), wr = { key: 1 }, kr = /* @__PURE__ */ F({
  __name: "MetricDrill",
  props: {
    entry: {},
    column: {}
  },
  setup(e) {
    const t = e, n = X(), a = f(() => !t.entry.entity?.scope || !t.column.drill ? null : n.entities.value.find((i) => i.key === t.column.drill) ?? null), s = f(() => t.column.label ?? ""), o = f(() => Pe(t.column, t.entry.row)), r = f(() => a.value ? n.drillHref(t.entry.row, a.value) : null);
    function c(l, i) {
      i.stopPropagation(), a.value && n.drill(t.entry.row, a.value, l);
    }
    return (l, i) => a.value ? (u(), I(Z, {
      key: 0,
      class: "dc-drill",
      href: r.value,
      title: `${s.value} of ${e.entry.parts.identity} — show the ${a.value.label.toLowerCase()}`,
      onPress: c
    }, {
      default: z(() => [
        j(l.$slots, "default", {}, () => [
          Y(P(o.value), 1)
        ], !0)
      ]),
      _: 3
    }, 8, ["href", "title"])) : (u(), h("span", wr, [
      j(l.$slots, "default", {}, () => [
        Y(P(o.value), 1)
      ], !0)
    ]));
  }
}), Je = /* @__PURE__ */ D(kr, [["__scopeId", "data-v-d3e7f4e0"]]), br = ["data-dc-active", "aria-pressed", "aria-label"], $r = /* @__PURE__ */ F({
  __name: "PinStar",
  props: {
    row: {},
    pinned: { type: Boolean },
    name: {}
  },
  setup(e) {
    const t = e, n = X();
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
    }, P(e.pinned ? "★" : "☆"), 9, br));
  }
}), rn = /* @__PURE__ */ D($r, [["__scopeId", "data-v-ef63d763"]]), xr = ["src"], Sr = /* @__PURE__ */ F({
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
    ), (a, s) => e.src.trim() && !n.value ? (u(), h("img", {
      key: 0,
      class: "dc-picture",
      src: e.src,
      alt: "",
      loading: "lazy",
      decoding: "async",
      onError: s[0] || (s[0] = (o) => n.value = !0)
    }, null, 40, xr)) : T("", !0);
  }
}), Pt = /* @__PURE__ */ D(Sr, [["__scopeId", "data-v-afaab300"]]), Cr = ["data-dc-standing", "title", "aria-label"], Pr = /* @__PURE__ */ F({
  __name: "QueryMark",
  props: {
    entry: {}
  },
  setup(e) {
    const t = e, n = X(), a = f(() => xt(t.entry.entity, t.entry.row)), s = f(() => an(n.query.value.expr, a.value)), o = f(
      () => s.value === "in" ? `The query narrows to ${t.entry.parts.identity} — press to lift that` : `The query leaves out ${t.entry.parts.identity} — press to lift that`
    );
    function r(c) {
      c.stopPropagation(), n.setExpression(la(n.query.value.expr, a.value));
    }
    return (c, l) => s.value ? (u(), h("button", {
      key: 0,
      type: "button",
      class: "dc-standing",
      "data-dc-standing": s.value,
      title: o.value,
      "aria-label": o.value,
      onClick: r
    }, P(s.value === "in" ? "+" : "−"), 9, Cr)) : T("", !0);
  }
}), ln = /* @__PURE__ */ D(Pr, [["__scopeId", "data-v-4b8d4166"]]), Er = ["aria-label"], Mr = ["data-dc-standing", "data-dc-active", "aria-checked", "title", "aria-label", "onClick"], Lr = /* @__PURE__ */ F({
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
    ]), o = (c) => !n.mixed && n.standing === c;
    function r(c, l) {
      c.stopPropagation(), a("set", l);
    }
    return (c, l) => (u(), h("span", {
      class: "dc-standing-control",
      role: "radiogroup",
      "aria-label": `Where the query stands on ${e.name}`
    }, [
      (u(!0), h(q, null, Q(s.value, (i) => (u(), h("button", {
        key: i.sign,
        type: "button",
        role: "radio",
        class: "dc-standing-control__choice",
        "data-dc-standing": i.standing ?? "none",
        "data-dc-active": o(i.standing) ? "true" : "false",
        "aria-checked": o(i.standing),
        title: i.hint,
        "aria-label": i.hint,
        onClick: (d) => r(d, i.standing)
      }, P(i.sign), 9, Mr))), 128))
    ], 8, Er));
  }
}), zt = /* @__PURE__ */ D(Lr, [["__scopeId", "data-v-5524dca6"]]), ka = /* @__PURE__ */ F({
  __name: "RowStanding",
  props: {
    entry: {}
  },
  setup(e) {
    const t = e, n = X(), a = f(() => xt(t.entry.entity, t.entry.row)), s = f(() => an(n.query.value.expr, a.value));
    function o(r) {
      n.setExpression(Dt(n.query.value.expr, a.value, r));
    }
    return (r, c) => a.value !== null ? (u(), I(zt, {
      key: 0,
      class: "dc-row-standing",
      standing: s.value,
      name: e.entry.parts.identity,
      onSet: o
    }, null, 8, ["standing", "name"])) : T("", !0);
  }
}), Tr = ["href", "title", "aria-label"], Or = /* @__PURE__ */ F({
  __name: "OpenMark",
  props: {
    entry: {}
  },
  setup(e) {
    const t = e, n = X(), a = f(() => {
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
      onClick: o[0] || (o[0] = Ce(() => {
      }, ["stop"]))
    }, "↗", 8, Tr)) : T("", !0);
  }
}), Ze = /* @__PURE__ */ D(Or, [["__scopeId", "data-v-b00f390d"]]), Nr = /* @__PURE__ */ F({
  __name: "ScopeMark",
  props: {
    entry: {}
  },
  setup(e) {
    const t = e, n = X(), a = f(
      () => n.narrowsOnPress.value ? null : t.entry.entity?.scope ?? null
    ), s = R(null);
    function o(d) {
      s.value = Ct(d).exclude ? "out" : "in";
    }
    function r(d) {
      o(d), window.addEventListener("keydown", o), window.addEventListener("keyup", o);
    }
    function c() {
      s.value = null, window.removeEventListener("keydown", o), window.removeEventListener("keyup", o);
    }
    pe(c);
    const l = f(() => a.value ? n.drillHref(t.entry.row, null) : null);
    function i(d, v) {
      v.stopPropagation(), n.drill(t.entry.row, null, d);
    }
    return (d, v) => a.value ? (u(), I(Z, {
      key: 0,
      class: "dc-scope",
      href: l.value,
      "data-dc-pending": s.value ?? void 0,
      title: `Narrow everything to ${a.value}: ${e.entry.row.id} — ⌥-click to leave it out`,
      "aria-label": `Narrow everything to ${e.entry.parts.identity}`,
      onPointerenter: r,
      onPointermove: o,
      onPointerleave: c,
      onPress: i
    }, {
      default: z(() => [...v[0] || (v[0] = [
        Y(" → ", -1)
      ])]),
      _: 1
    }, 8, ["href", "data-dc-pending", "title", "aria-label"])) : T("", !0);
  }
}), et = /* @__PURE__ */ D(Nr, [["__scopeId", "data-v-05d2c233"]]), Ar = ["checked", "aria-label"], Le = /* @__PURE__ */ F({
  __name: "SelectTick",
  props: {
    row: {},
    selected: { type: Boolean },
    name: {}
  },
  setup(e) {
    const t = e, n = X();
    function a(s) {
      s.stopPropagation(), n.toggleSelect(t.row);
    }
    return (s, o) => (u(), h("input", {
      class: "dc-tick",
      type: "checkbox",
      checked: e.selected,
      "aria-label": `Select ${e.name}`,
      onClick: a
    }, null, 8, Ar));
  }
}), Ir = { class: "dc-card__top dc-mono" }, Rr = { class: "dc-card__lead" }, Br = {
  key: 2,
  class: "dc-card__entity"
}, Hr = { class: "dc-card__top-right" }, Fr = { class: "dc-card__names" }, qr = { class: "dc-card__primary" }, Dr = {
  key: 0,
  class: "dc-card__secondary dc-mono"
}, Vr = {
  key: 1,
  class: "dc-card__facts dc-mono"
}, Kr = ["title"], Wr = { class: "dc-card__fact-label" }, zr = {
  key: 0,
  class: "dc-card__metrics dc-mono"
}, jr = {
  key: 0,
  class: "dc-card__date"
}, Ur = /* @__PURE__ */ F({
  __name: "CardsView",
  setup(e) {
    const t = X(), n = Me(), a = f(() => t.isEverything.value), s = (r) => r.entity?.card === "picture", o = f(() => n.value.length > 0 && n.value.every(s));
    return (r, c) => (u(), h("div", {
      class: se(["dc-cards", { "dc-cards--pictures": o.value }])
    }, [
      (u(!0), h(q, null, Q(x(n), (l) => (u(), h("div", {
        key: l.key,
        class: se(["dc-card", { "dc-card--picture": s(l) }])
      }, [
        S("div", Ir, [
          S("span", Rr, [
            x(t).selectable.value ? (u(), I(Le, {
              key: 0,
              row: l.row,
              selected: l.selected,
              name: l.parts.identity
            }, null, 8, ["row", "selected", "name"])) : T("", !0),
            s(l) ? T("", !0) : (u(), h(q, { key: 1 }, [
              Y(P(l.ordinal), 1)
            ], 64)),
            a.value ? (u(), h("span", Br, P(l.entityLabel), 1)) : T("", !0)
          ]),
          S("span", Hr, [
            l.parts.state && !s(l) ? (u(), I(Xe, {
              key: 0,
              status: l.parts.state
            }, null, 8, ["status"])) : T("", !0),
            s(l) ? (u(), I(ln, {
              key: 1,
              entry: l
            }, null, 8, ["entry"])) : (u(), I(ka, {
              key: 2,
              entry: l
            }, null, 8, ["entry"])),
            K(et, { entry: l }, null, 8, ["entry"]),
            K(Ze, { entry: l }, null, 8, ["entry"]),
            x(t).pinnable.value ? (u(), I(rn, {
              key: 3,
              row: l.row,
              name: l.parts.identity,
              pinned: l.pinned
            }, null, 8, ["row", "name", "pinned"])) : T("", !0)
          ])
        ]),
        K(Z, {
          class: "dc-card__open",
          href: x(t).pressHref(l.row),
          onPress: (i) => x(t).activate(l.row, i)
        }, {
          default: z(() => [
            l.parts.image ? (u(), I(Pt, {
              key: 0,
              class: "dc-card__image",
              src: l.parts.image
            }, null, 8, ["src"])) : T("", !0),
            S("span", Fr, [
              S("span", qr, P(l.parts.identity), 1),
              s(l) ? T("", !0) : (u(), h("span", Dr, P(l.parts.reference), 1)),
              l.parts.facts.length ? (u(), h("span", Vr, [
                (u(!0), h(q, null, Q(l.parts.facts, (i) => (u(), h("span", {
                  key: i.column.key ?? i.label,
                  class: "dc-card__fact",
                  title: i.title || void 0
                }, [
                  S("span", Wr, P(i.label), 1),
                  Y(" " + P(i.text), 1)
                ], 8, Kr))), 128))
              ])) : T("", !0)
            ])
          ]),
          _: 2
        }, 1032, ["href", "onPress"]),
        s(l) ? T("", !0) : (u(), h("div", zr, [
          (u(!0), h(q, null, Q(l.parts.metrics.slice(0, 2), (i) => (u(), I(Je, {
            key: i.column.key ?? i.label,
            entry: l,
            column: i.column
          }, {
            default: z(() => [
              Y(P(i.label) + " " + P(i.text), 1)
            ]),
            _: 2
          }, 1032, ["entry", "column"]))), 128)),
          l.parts.updated ? (u(), h("span", jr, P(l.parts.updated), 1)) : T("", !0)
        ]))
      ], 2))), 128))
    ], 2));
  }
}), ba = /* @__PURE__ */ D(Ur, [["__scopeId", "data-v-fd252138"]]), Qr = { class: "dc-grid" }, Gr = { class: "dc-tile__scrim" }, Yr = { class: "dc-tile__top dc-mono" }, Xr = { class: "dc-tile__chip" }, Jr = { class: "dc-tile__caption" }, Zr = { class: "dc-tile__secondary dc-truncate" }, el = { class: "dc-tile__primary" }, tl = /* @__PURE__ */ F({
  __name: "GridView",
  setup(e) {
    const t = X(), n = Me();
    return (a, s) => (u(), h("div", Qr, [
      (u(!0), h(q, null, Q(x(n), (o) => (u(), h("div", {
        key: o.key,
        class: "dc-grid__cell"
      }, [
        K(Z, {
          class: "dc-tile",
          style: ne({ "--dc-tile-tint": o.parts.tint ?? void 0 }),
          href: x(t).pressHref(o.row),
          onPress: (r) => x(t).activate(o.row, r)
        }, {
          default: z(() => [
            o.parts.image ? (u(), I(Pt, {
              key: 0,
              class: "dc-tile__image",
              src: o.parts.image
            }, null, 8, ["src"])) : T("", !0),
            S("span", Gr, [
              S("span", Yr, [
                S("span", Xr, P(o.ordinal), 1)
              ]),
              S("span", Jr, [
                S("span", Zr, P(o.parts.reference), 1),
                S("span", el, P(o.parts.identity), 1)
              ])
            ])
          ]),
          _: 2
        }, 1032, ["style", "href", "onPress"]),
        x(t).selectable.value ? (u(), I(Le, {
          key: 0,
          class: "dc-grid__tick",
          row: o.row,
          selected: o.selected,
          name: o.parts.identity
        }, null, 8, ["row", "selected", "name"])) : T("", !0)
      ]))), 128))
    ]));
  }
}), $a = /* @__PURE__ */ D(tl, [["__scopeId", "data-v-89c40a9e"]]);
function Tn(e, t, n, a) {
  return (n - a * (t - 1)) / e;
}
function Nt(e, t) {
  return e > 0 ? Math.min(t, e) : t;
}
function nl(e) {
  return e > 0 ? e : 1 / 0;
}
function al(e, t, n) {
  const { width: a, height: s, gap: o = 0 } = n;
  if (!e.length) return [];
  if (!(a > 0) || !(s > 0)) return [{ items: [...e], height: s, filled: !1 }];
  const r = [];
  let c = [], l = 0, i = 0;
  for (const d of e) {
    const v = t(d), w = Math.max(v.ratio, Number.EPSILON), k = v.height && v.height > 0 ? Math.max(i, v.height) : i, _ = Nt(k, s), m = Tn(l + w, c.length + 1, a, o);
    if (m > _) {
      c.push(d), l += w, i = k;
      continue;
    }
    const b = Nt(i, s), E = c.length ? Tn(l, c.length, a, o) : 1 / 0;
    E <= nl(i) && E - b < _ - m ? (r.push({ items: c, height: E, filled: !0 }), c = [d], l = w, i = v.height && v.height > 0 ? v.height : 0) : (r.push({ items: [...c, d], height: m, filled: !0 }), c = [], l = 0, i = 0);
  }
  return c.length && r.push({ items: c, height: Nt(i, s), filled: !1 }), r;
}
const sl = { class: "dc-images" }, ol = {
  key: 1,
  class: "dc-images__blank",
  "aria-hidden": "true"
}, rl = 240, tt = 8, ll = 1, il = /* @__PURE__ */ F({
  __name: "ImagesView",
  setup(e) {
    const t = X(), n = Me(), a = un(/* @__PURE__ */ new Map()), s = un(/* @__PURE__ */ new Set());
    function o(_, m) {
      const b = m.target;
      b.naturalWidth > 0 && b.naturalHeight > 0 && a.set(_, { width: b.naturalWidth, height: b.naturalHeight });
    }
    function r(_) {
      const m = _.parts.image;
      return m && !s.has(m) ? m : null;
    }
    function c(_) {
      const m = r(_);
      return m ? a.get(m) : void 0;
    }
    function l(_) {
      const m = c(_);
      return m ? { ratio: m.width / m.height, height: m.height } : { ratio: ll };
    }
    const i = R(null), d = R(0);
    let v = null;
    function w() {
      d.value = i.value?.clientWidth ?? 0;
    }
    Qe(() => {
      w(), !(!i.value || typeof ResizeObserver > "u") && (v = new ResizeObserver(w), v.observe(i.value));
    }), pe(() => {
      v?.disconnect(), v = null;
    });
    const k = f(() => {
      const _ = al(n.value, l, {
        width: d.value,
        height: rl,
        gap: tt
      }), m = [];
      let b = 0;
      for (const E of _) {
        let $ = 0;
        for (const p of E.items) {
          const g = l(p).ratio * E.height, L = c(p), H = L !== void 0 && L.height < E.height;
          m.push({
            entry: p,
            style: {
              top: `${b}px`,
              left: `${$}px`,
              width: `${g}px`,
              height: `${E.height}px`
            },
            picture: H ? { width: `${L.width}px`, height: `${L.height}px` } : { width: "100%", height: "100%" }
          }), $ += g + tt;
        }
        b += E.height + tt;
      }
      return { boxes: m, height: _.length ? b - tt : 0 };
    });
    return (_, m) => (u(), h("div", sl, [
      S("div", {
        ref_key: "wall",
        ref: i,
        class: "dc-images__wall",
        style: ne({ height: `${k.value.height}px` })
      }, [
        (u(!0), h(q, null, Q(k.value.boxes, ({ entry: b, style: E, picture: $ }) => (u(), h("div", {
          key: b.key,
          class: "dc-images__cell",
          style: ne(E)
        }, [
          K(Z, {
            class: "dc-images__open",
            title: b.parts.identity,
            "aria-label": b.parts.identity,
            href: x(t).pressHref(b.row),
            onPress: (p) => x(t).activate(b.row, p)
          }, {
            default: z(() => [
              r(b) ? (u(), I(Pt, {
                key: 0,
                class: "dc-images__picture",
                style: ne($),
                src: r(b),
                onLoad: (p) => o(r(b), p),
                onError: (p) => s.add(r(b))
              }, null, 8, ["style", "src", "onLoad", "onError"])) : (u(), h("span", ol, P(b.parts.identity), 1))
            ]),
            _: 2
          }, 1032, ["title", "aria-label", "href", "onPress"]),
          x(t).selectable.value ? (u(), I(Le, {
            key: 0,
            class: "dc-images__tick",
            row: b.row,
            selected: b.selected,
            name: b.parts.identity
          }, null, 8, ["row", "selected", "name"])) : T("", !0)
        ], 4))), 128))
      ], 4)
    ]));
  }
}), xa = /* @__PURE__ */ D(il, [["__scopeId", "data-v-2d267370"]]), cl = { class: "dc-links" }, ul = { class: "dc-link__primary dc-truncate" }, dl = { class: "dc-link__secondary dc-mono dc-truncate" }, fl = /* @__PURE__ */ F({
  __name: "LinksView",
  setup(e) {
    const t = X(), n = Me();
    return (a, s) => (u(), h("div", cl, [
      (u(!0), h(q, null, Q(x(n), (o) => (u(), h("span", {
        key: o.key,
        class: "dc-links__item"
      }, [
        x(t).selectable.value ? (u(), I(Le, {
          key: 0,
          row: o.row,
          selected: o.selected,
          name: o.parts.identity
        }, null, 8, ["row", "selected", "name"])) : T("", !0),
        K(Z, {
          class: "dc-link",
          href: x(t).pressHref(o.row),
          onPress: (r) => x(t).activate(o.row, r)
        }, {
          default: z(() => [
            S("span", ul, P(o.parts.identity), 1),
            S("span", dl, P(o.parts.reference), 1)
          ]),
          _: 2
        }, 1032, ["href", "onPress"])
      ]))), 128))
    ]));
  }
}), Sa = /* @__PURE__ */ D(fl, [["__scopeId", "data-v-de6c9a0f"]]), vl = {
  class: "dc-list",
  role: "list"
}, pl = { class: "dc-list__ordinal dc-mono" }, hl = { class: "dc-list__identity" }, ml = { class: "dc-list__primary dc-truncate" }, yl = { class: "dc-list__secondary dc-mono dc-truncate" }, gl = {
  key: 1,
  class: "dc-list__entity dc-mono"
}, _l = { class: "dc-list__metrics dc-mono" }, wl = { class: "dc-list__trailing" }, kl = /* @__PURE__ */ F({
  __name: "ListView",
  setup(e) {
    const t = X(), n = Me(), a = f(() => t.isEverything.value);
    return (s, o) => (u(), h("div", vl, [
      (u(!0), h(q, null, Q(x(n), (r) => (u(), h("div", {
        key: r.key,
        class: "dc-list__row",
        role: "listitem"
      }, [
        x(t).selectable.value ? (u(), I(Le, {
          key: 0,
          class: "dc-list__tick",
          row: r.row,
          selected: r.selected,
          name: r.parts.identity
        }, null, 8, ["row", "selected", "name"])) : T("", !0),
        K(ka, {
          class: "dc-list__standing",
          entry: r
        }, null, 8, ["entry"]),
        K(Z, {
          class: "dc-list__open",
          href: x(t).pressHref(r.row),
          onPress: (c) => x(t).activate(r.row, c)
        }, {
          default: z(() => [
            S("span", pl, P(r.ordinal), 1),
            S("span", hl, [
              S("span", ml, P(r.parts.identity), 1),
              S("span", yl, P(r.parts.reference), 1)
            ])
          ]),
          _: 2
        }, 1032, ["href", "onPress"]),
        a.value ? (u(), h("span", gl, P(r.entityLabel), 1)) : T("", !0),
        S("span", _l, [
          (u(!0), h(q, null, Q(r.parts.metrics.slice(0, 2), (c) => (u(), I(Je, {
            key: c.column.key ?? c.label,
            entry: r,
            column: c.column
          }, null, 8, ["entry", "column"]))), 128))
        ]),
        S("span", wl, [
          r.parts.state ? (u(), I(Xe, {
            key: 0,
            status: r.parts.state
          }, null, 8, ["status"])) : T("", !0),
          K(et, { entry: r }, null, 8, ["entry"]),
          K(Ze, { entry: r }, null, 8, ["entry"]),
          x(t).pinnable.value ? (u(), I(rn, {
            key: 1,
            row: r.row,
            name: r.parts.identity,
            pinned: r.pinned
          }, null, 8, ["row", "name", "pinned"])) : T("", !0)
        ])
      ]))), 128))
    ]));
  }
}), jt = /* @__PURE__ */ D(kl, [["__scopeId", "data-v-3d349a10"]]), bl = { class: "dc-preview" }, $l = { class: "dc-preview__pager dc-mono" }, xl = ["disabled"], Sl = { "aria-live": "polite" }, Cl = ["disabled"], Pl = {
  key: 0,
  class: "dc-preview__card"
}, El = ["src"], Ml = { class: "dc-preview__body" }, Ll = { class: "dc-preview__top" }, Tl = { class: "dc-preview__badges" }, Ol = { class: "dc-preview__entity dc-mono" }, Nl = { class: "dc-preview__marks" }, Al = { class: "dc-preview__primary" }, Il = { class: "dc-preview__secondary dc-mono" }, Rl = { class: "dc-preview__fields" }, Bl = { class: "dc-preview__key" }, Hl = { class: "dc-preview__value dc-mono" }, Fl = /* @__PURE__ */ F({
  __name: "PreviewView",
  setup(e) {
    const t = X(), n = Me(), a = R(0);
    ee(n, (l) => {
      a.value > l.length - 1 && (a.value = Math.max(0, l.length - 1));
    });
    const s = f(() => n.value[a.value]), o = f(() => {
      const l = s.value;
      if (!l) return [];
      const i = ue(l.columns, "reference"), d = ue(l.columns, "updated");
      return [
        ...i ? [{ key: i.label ?? "Reference", value: l.parts.reference, column: null }] : [],
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
    }), c = (l) => {
      const i = n.value.length;
      i && (a.value = Math.min(i - 1, Math.max(0, a.value + l)));
    };
    return (l, i) => (u(), h("div", bl, [
      S("div", $l, [
        S("button", {
          type: "button",
          class: "dc-preview__step",
          "aria-label": "Previous result",
          disabled: a.value === 0,
          onClick: i[0] || (i[0] = (d) => c(-1))
        }, " ‹ ", 8, xl),
        S("span", Sl, P(r.value), 1),
        S("button", {
          type: "button",
          class: "dc-preview__step",
          "aria-label": "Next result",
          disabled: a.value >= x(n).length - 1,
          onClick: i[1] || (i[1] = (d) => c(1))
        }, " › ", 8, Cl)
      ]),
      s.value ? (u(), h("div", Pl, [
        S("div", {
          class: "dc-preview__media",
          style: ne({ background: s.value.parts.tint ?? void 0 }),
          "aria-hidden": "true"
        }, [
          s.value.parts.image ? (u(), h("img", {
            key: 0,
            class: "dc-preview__image",
            src: s.value.parts.image,
            alt: ""
          }, null, 8, El)) : (u(), h(q, { key: 1 }, [
            Y(" preview ")
          ], 64))
        ], 4),
        S("div", Ml, [
          S("div", Ll, [
            S("span", Tl, [
              x(t).selectable.value ? (u(), I(Le, {
                key: 0,
                row: s.value.row,
                selected: s.value.selected,
                name: s.value.parts.identity
              }, null, 8, ["row", "selected", "name"])) : T("", !0),
              s.value.parts.state ? (u(), I(Xe, {
                key: 1,
                status: s.value.parts.state
              }, null, 8, ["status"])) : T("", !0),
              S("span", Ol, P(s.value.entityLabel), 1)
            ]),
            S("span", Nl, [
              K(ln, { entry: s.value }, null, 8, ["entry"]),
              K(et, { entry: s.value }, null, 8, ["entry"]),
              K(Ze, { entry: s.value }, null, 8, ["entry"]),
              x(t).pinnable.value ? (u(), I(rn, {
                key: 0,
                row: s.value.row,
                name: s.value.parts.identity,
                pinned: s.value.pinned
              }, null, 8, ["row", "name", "pinned"])) : T("", !0)
            ])
          ]),
          S("div", null, [
            S("div", Al, P(s.value.parts.identity), 1),
            S("div", Il, P(s.value.parts.reference), 1)
          ]),
          S("dl", Rl, [
            (u(!0), h(q, null, Q(o.value, (d) => (u(), h("div", {
              key: d.key,
              class: "dc-preview__field"
            }, [
              S("dt", Bl, P(d.key), 1),
              S("dd", Hl, [
                d.column && s.value ? (u(), I(Je, {
                  key: 0,
                  entry: s.value,
                  column: d.column
                }, null, 8, ["entry", "column"])) : (u(), h(q, { key: 1 }, [
                  Y(P(d.value), 1)
                ], 64))
              ])
            ]))), 128))
          ]),
          K(Z, {
            class: "dc-preview__open",
            href: s.value ? x(t).pressHref(s.value.row) : null,
            onPress: i[2] || (i[2] = (d) => s.value && x(t).activate(s.value.row, d))
          }, {
            default: z(() => [...i[3] || (i[3] = [
              Y(" Open record → ", -1)
            ])]),
            _: 1
          }, 8, ["href"])
        ])
      ])) : T("", !0)
    ]));
  }
}), Ca = /* @__PURE__ */ D(Fl, [["__scopeId", "data-v-59e0d33b"]]);
function ql() {
  const e = X();
  return f(() => ss(e.schema.value, e.entity.value));
}
const Dl = /* @__PURE__ */ F({
  __name: "CellNarrow",
  props: {
    entry: {},
    column: {},
    narrowings: {},
    truncates: { type: Boolean }
  },
  setup(e) {
    const t = e, n = X(), a = f(() => Pe(t.column, t.entry.row));
    function s(i, d = !1) {
      return ge({ ...i.term, ...d ? { negated: !0 } : {} });
    }
    function o(i, d = !1) {
      return ot(n.query.value.expr, s(i, d));
    }
    function r(i) {
      return n.narrowHref(o(i), n.query.value.entity);
    }
    function c(i) {
      return `Narrow to ${s(i)}
⌥-press to leave these out`;
    }
    function l(i, d, v) {
      v.stopPropagation(), n.narrow(o(i, d.exclude), n.query.value.entity);
    }
    return (i, d) => (u(), h("span", {
      class: se(["dc-cell__text", { "dc-truncate": e.truncates }])
    }, [
      (u(!0), h(q, null, Q(e.narrowings, (v, w) => (u(), h(q, {
        key: s(v)
      }, [
        w > 0 ? (u(), h(q, { key: 0 }, [
          Y(", ")
        ], 64)) : T("", !0),
        K(Z, {
          class: "dc-narrow",
          href: r(v),
          title: c(v),
          onPress: (k, _) => l(v, k, _)
        }, {
          default: z(() => [
            Y(P(v.label ?? a.value), 1)
          ]),
          _: 2
        }, 1032, ["href", "title", "onPress"])
      ], 64))), 128))
    ], 2));
  }
}), Vl = /* @__PURE__ */ D(Dl, [["__scopeId", "data-v-4805a234"]]), Kl = /* @__PURE__ */ new Set(["ordinal", "status", "image", "component", "date"]), Wl = 4;
function Pa(e) {
  return (e.field ?? e.key)?.toLowerCase();
}
function Ea(e) {
  return e.narrow === !1 || e.activate || e.click || e.drill ? !1 : !Kl.has(e.kind ?? "text") && Pa(e) !== void 0;
}
function zl(e, t) {
  if (Number.isInteger(e)) return e;
  const n = 10 ** Wl;
  return (t ? Math.ceil(e * n - 1e-6) : Math.floor(e * n + 1e-6)) / n;
}
function jl(e, t) {
  let n = 1 / 0, a = -1 / 0;
  for (const s of t) {
    const o = oe(e, s);
    typeof o != "number" || !Number.isFinite(o) || (o < n && (n = o), o > a && (a = o));
  }
  return n <= a ? { min: n, max: a } : null;
}
function Ul(e, t, n, a = null) {
  if (!Ea(e)) return [];
  const s = Pa(e);
  if (e.flags)
    return Object.entries(e.flags).filter(([l]) => t.fields[l] === !0).map(([l, i]) => ({
      label: i,
      term: { kind: "field", field: l.toLowerCase(), comparator: ":", value: "true" }
    }));
  const o = oe(e, t), r = n?.facets.find((l) => l.key.toLowerCase() === s);
  if (typeof o == "number") {
    if (!Number.isFinite(o)) return [];
    const l = r?.kind === "range" ? { min: r.min, max: r.max } : a, i = !l || o - l.min <= l.max - o;
    return [{
      label: null,
      term: { kind: "field", field: s, comparator: i ? "<=" : ">=", value: String(zl(o, i)) }
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
function Ql(e, t) {
  let n = On.get(e);
  return n || On.set(e, n = /* @__PURE__ */ new Map()), n.has(t) || n.set(t, jl(t, e)), n.get(t);
}
const Gl = /* @__PURE__ */ F({
  __name: "ColumnCell",
  props: {
    column: {},
    entry: {}
  },
  setup(e) {
    const t = e, n = X(), a = f(() => t.column.kind ?? "text"), s = f(() => oe(t.column, t.entry.row)), o = f(
      () => a.value === "ordinal" ? t.entry.ordinal : Pe(t.column, t.entry.row)
    ), r = f(() => s.value), c = f(() => t.column.activate === !0 || !!t.column.click), l = f(() => Ft(t.column)), i = f(() => zn(t.column, t.entry.row)), d = f(() => {
      if (!Ea(t.column)) return [];
      const _ = typeof s.value == "number" ? Ql(n.rows.value, t.column) : null;
      return Ul(t.column, t.entry.row, t.entry.entity ?? null, _);
    });
    function v(_) {
      c.value && (_.stopPropagation(), w(Ct(_)));
    }
    function w(_) {
      t.column.click?.(t.entry.row, _), t.column.activate && n.activate(t.entry.row, _);
    }
    const k = f(
      () => t.column.activate && !t.column.click ? n.pressHref(t.entry.row) : null
    );
    return (_, m) => a.value === "component" && e.column.component ? (u(), I(qe(e.column.component), {
      key: 0,
      row: e.entry.row,
      entry: e.entry,
      value: s.value,
      column: e.column
    }, null, 8, ["row", "entry", "value", "column"])) : a.value === "status" ? (u(), I(Xe, {
      key: 1,
      status: r.value
    }, null, 8, ["status"])) : a.value === "image" ? (u(), I(Pt, {
      key: 2,
      class: "dc-cell__image",
      src: typeof s.value == "string" ? s.value : "",
      style: ne({ maxHeight: e.column.height }),
      onClick: v
    }, null, 8, ["src", "style"])) : e.column.drill ? (u(), I(Je, {
      key: 3,
      entry: e.entry,
      column: e.column
    }, null, 8, ["entry", "column"])) : c.value ? (u(), I(Z, {
      key: 4,
      class: se(["dc-table__open", { "dc-truncate": l.value }]),
      href: k.value,
      title: i.value,
      onPress: m[0] || (m[0] = (b, E) => {
        E.stopPropagation(), w(b);
      })
    }, {
      default: z(() => [
        Y(P(o.value), 1)
      ]),
      _: 1
    }, 8, ["class", "href", "title"])) : d.value.length ? (u(), I(Vl, {
      key: 5,
      entry: e.entry,
      column: e.column,
      narrowings: d.value,
      truncates: l.value
    }, null, 8, ["entry", "column", "narrowings", "truncates"])) : (u(), h("span", {
      key: 6,
      class: se(["dc-cell__text", { "dc-truncate": l.value }])
    }, P(o.value), 3));
  }
}), Nn = /* @__PURE__ */ D(Gl, [["__scopeId", "data-v-0db32eb9"]]), Yl = {
  key: 0,
  class: "dc-table__none"
}, Xl = { class: "dc-table__detail" }, Jl = ["data-dc-wrap", "data-dc-row-links"], Zl = {
  key: 0,
  class: "dc-table__pick",
  scope: "col"
}, ei = {
  key: 1,
  class: "dc-table__standing",
  scope: "col"
}, ti = ["data-dc-align", "data-dc-hide", "aria-sort", "title"], ni = {
  key: 2,
  class: "dc-table__head"
}, ai = ["onClick"], si = {
  key: 0,
  class: "dc-table__pick"
}, oi = {
  key: 1,
  class: "dc-table__standing"
}, ri = ["data-dc-align", "data-dc-hide", "title"], li = {
  key: 1,
  class: "dc-table__name"
}, ii = /* @__PURE__ */ F({
  __name: "TableView",
  setup(e) {
    const t = X(), n = Me(), a = ql();
    function s(O, V) {
      const N = t.pressHref(O);
      if (N && ia(V)) {
        const U = V.shiftKey ? `noopener,popup,width=${window.outerWidth},height=${window.outerHeight}` : "noopener";
        window.open(N, "_blank", U);
        return;
      }
      t.activate(O, Ct(V));
    }
    const o = f(() => t.rowLinks?.value ? new Map(n.value.map((O) => [O.key, t.pressHref(O.row)])) : /* @__PURE__ */ new Map()), r = f(
      () => a.value.find((O) => O.role === "identity") ?? a.value[0]
    );
    function c(O, V, N) {
      N.stopPropagation(), t.activate(O, V);
    }
    function l(O) {
      const V = Yn(O, t.entity.value, t.schema.value), N = V ? `Shortcut: ${V}` : void 0;
      return [O.hint, N].filter(Boolean).join(`
`) || void 0;
    }
    const i = f(() => {
      const O = a.value.find((N) => N.scope);
      return O || ((t.entity.value ? !!t.entity.value.href : t.entities.value.some((N) => N.href)) ? a.value.find((N) => N.activate) : void 0);
    }), d = f(
      () => t.entity.value ? !!t.entity.value.scope : t.entities.value.some((O) => O.scope)
    ), v = (O) => xt(O.entity, O.row), w = (O) => an(t.query.value.expr, v(O));
    function k(O, V) {
      t.setExpression(Dt(t.query.value.expr, v(O), V));
    }
    const _ = f(() => {
      const O = n.value.filter((N) => v(N) !== null), V = O.filter((N) => N.selected);
      return V.length ? V : O;
    }), m = f(() => _.value.some((O) => O.selected)), b = f(() => {
      const O = _.value[0];
      return O ? w(O) : null;
    }), E = f(
      () => _.value.some((O) => w(O) !== b.value)
    ), $ = f(
      () => m.value ? "the ticked rows" : "every row on this page"
    );
    function p(O) {
      t.setExpression(
        _.value.reduce(
          (V, N) => Dt(V, v(N), O),
          t.query.value.expr
        )
      );
    }
    const g = f(
      () => a.value.some((O) => O.kind === "image" || O.height !== void 0)
    );
    function L(O) {
      O && (t.query.value.sort === O ? t.toggleDirection() : t.setSort(O));
    }
    function H(O) {
      return O ? t.query.value.sort === O ? t.hrefFor({ dir: t.query.value.dir === "desc" ? "asc" : "desc" }) : t.hrefFor({ sort: O }) : null;
    }
    const G = f(() => t.entity.value?.label ?? "The result set"), B = f(() => new Set(t.sorts.value.map((O) => O.key))), W = (O) => O.sort !== void 0 && B.value.has(O.sort), te = (O) => {
      if (W(O))
        return t.query.value.sort !== O.sort ? "none" : t.query.value.dir === "desc" ? "descending" : "ascending";
    };
    function le(O) {
      return [
        gn(O),
        O.muted ? "dc-table__muted" : "",
        O.mono ? "dc-mono" : "",
        Ft(O) ? "dc-truncate" : ""
      ].filter(Boolean).join(" ");
    }
    function ie(O, V) {
      if (!(!Ft(O) || O.activate || O.click))
        return zn(O, V.row);
    }
    const de = R(null);
    function J(O) {
      de.value && (de.value.scrollLeft = O.target.scrollLeft);
    }
    return (O, V) => x(a).length ? (u(), h("table", {
      key: 1,
      class: "dc-table",
      "data-dc-wrap": g.value ? "" : void 0,
      "data-dc-row-links": x(t).rowLinks?.value ? "" : void 0
    }, [
      S("thead", {
        ref_key: "head",
        ref: de,
        "data-dc-stuck": ""
      }, [
        S("tr", null, [
          x(t).selectable.value ? (u(), h("th", Zl, [
            K(_a)
          ])) : T("", !0),
          d.value ? (u(), h("th", ei, [
            _.value.length ? (u(), I(zt, {
              key: 0,
              standing: b.value,
              mixed: E.value,
              name: $.value,
              onSet: p
            }, null, 8, ["standing", "mixed", "name"])) : T("", !0)
          ])) : T("", !0),
          (u(!0), h(q, null, Q(x(a), (N, U) => (u(), h("th", {
            key: x(mn)(N, U),
            scope: "col",
            class: se(x(gn)(N)),
            style: ne({ width: N.width }),
            "data-dc-align": x(yn)(N),
            "data-dc-hide": N.hideBelow,
            "aria-sort": te(N),
            title: l(N)
          }, [
            W(N) ? (u(), I(Z, {
              key: 0,
              class: "dc-table__sort",
              href: H(N.sort),
              onPress: (ce) => L(N.sort)
            }, {
              default: z(() => [
                Y(P(N.label), 1)
              ]),
              _: 2
            }, 1032, ["href", "onPress"])) : (u(), h(q, { key: 1 }, [
              Y(P(N.label), 1)
            ], 64)),
            N.header ? (u(), h("span", ni, [
              (u(), I(qe(N.header), {
                column: N,
                entity: x(t).entity.value
              }, null, 8, ["column", "entity"]))
            ])) : T("", !0)
          ], 14, ti))), 128))
        ])
      ], 512),
      S("tbody", {
        "data-dc-scroll": "",
        onScroll: J
      }, [
        (u(!0), h(q, null, Q(x(n), (N) => (u(), h("tr", {
          key: N.key,
          class: "dc-table__row",
          onClick: (U) => s(N.row, U)
        }, [
          x(t).selectable.value ? (u(), h("td", si, [
            K(Le, {
              row: N.row,
              selected: N.selected,
              name: N.parts.identity
            }, null, 8, ["row", "selected", "name"])
          ])) : T("", !0),
          d.value ? (u(), h("td", oi, [
            v(N) !== null ? (u(), I(zt, {
              key: 0,
              standing: w(N),
              name: N.parts.identity,
              onSet: (U) => k(N, U)
            }, null, 8, ["standing", "name", "onSet"])) : T("", !0)
          ])) : T("", !0),
          (u(!0), h(q, null, Q(x(a), (U, ce) => (u(), h("td", {
            key: x(mn)(U, ce),
            class: se(le(U)),
            style: ne({ width: U.width }),
            "data-dc-align": x(yn)(U),
            "data-dc-hide": U.hideBelow,
            title: ie(U, N)
          }, [
            o.value.get(N.key) ? (u(), I(Z, {
              key: 0,
              class: "dc-table__cell-link",
              href: o.value.get(N.key),
              tabindex: U === r.value ? void 0 : -1,
              "aria-hidden": U === r.value ? void 0 : "true",
              "aria-label": U === r.value ? N.parts.identity : void 0,
              onPress: (Ae, we) => c(N.row, Ae, we)
            }, null, 8, ["href", "tabindex", "aria-hidden", "aria-label", "onPress"])) : T("", !0),
            U === i.value ? (u(), h("span", li, [
              K(Nn, {
                column: U,
                entry: N
              }, null, 8, ["column", "entry"]),
              K(et, { entry: N }, null, 8, ["entry"]),
              K(Ze, { entry: N }, null, 8, ["entry"])
            ])) : (u(), I(Nn, {
              key: 2,
              column: U,
              entry: N
            }, null, 8, ["column", "entry"]))
          ], 14, ri))), 128))
        ], 8, ai))), 128))
      ], 32)
    ], 8, Jl)) : (u(), h("p", Yl, [
      V[2] || (V[2] = S("span", { class: "dc-table__headline" }, "No columns declared", -1)),
      S("span", Xl, [
        Y(P(G.value) + " has no ", 1),
        V[0] || (V[0] = S("code", null, "columns", -1)),
        V[1] || (V[1] = Y(" in the schema, so there is no table to draw. ", -1))
      ])
    ]));
  }
}), Ma = /* @__PURE__ */ D(ii, [["__scopeId", "data-v-66fa1713"]]);
function ci(e) {
  const t = _e([]), n = R(!1), a = _e(null);
  let s = 0;
  const o = (l, i, d, v, w) => ({
    entity: l,
    rows: e.limit.value > 0 ? i.rows.map((k, _) => wa(k, _, l, e.isPinned(k.id))) : [],
    total: i.total,
    count: d ? Ht(l) : at(i.total),
    pinned: ui(v, i, w)
  }), r = () => {
    const l = ++s, i = e.query.value, d = e.schema.value, v = e.entities.value, w = e.limit.value, k = e.within?.value.trim() ?? "", _ = Yt(i) && !k, m = k ? Zt(k, i.expr) : i.expr, b = v.map((E) => ({
      entity: E,
      // Scope the query to this entity, keeping the expression and ordering.
      outcome: e.source.value.query({
        // Each card is the top few of its type, wherever the shell's own
        // result set has been paged to — so this asks for the first page.
        query: { ...i, entity: E.key, expr: m, page: 1 },
        schema: d,
        entity: E,
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
    if (b.every(({ outcome: E }) => !(E instanceof Promise))) {
      t.value = b.map(
        ({ entity: E, outcome: $ }) => o(E, $, _, d, m)
      ), a.value = null, n.value = !1;
      return;
    }
    n.value = !0, Promise.all(b.map(({ outcome: E }) => Promise.resolve(E))).then((E) => {
      l === s && (t.value = E.map(
        ($, p) => o(b[p].entity, $, _, d, m)
      ), a.value = null);
    }).catch((E) => {
      l === s && (a.value = E, t.value = []);
    }).finally(() => {
      l === s && (n.value = !1);
    });
  }, c = () => {
    try {
      r();
    } catch (l) {
      a.value = l, t.value = [], n.value = !1;
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
    c,
    { immediate: !0 }
  ), { previews: t, pending: n, error: a, refresh: c };
}
function ui(e, t, n) {
  const a = t.rows[0];
  if (t.total !== 1 || t.rows.length !== 1 || !a)
    return !1;
  const s = n.trim();
  if (!s)
    return !1;
  const o = ct(e, a);
  return !!o && Ye(s, o) === s;
}
const di = ["data-dc-pending", "data-dc-heads-only"], fi = {
  key: 0,
  class: "dc-types__state",
  role: "alert"
}, vi = {
  key: 1,
  class: "dc-types__state",
  "aria-live": "polite"
}, pi = {
  key: 2,
  class: "dc-types__state"
}, hi = ["data-dc-empty"], mi = { class: "dc-type__name" }, yi = { class: "dc-type__count dc-mono" }, gi = { class: "dc-type__sr" }, _i = {
  key: 0,
  class: "dc-type__description"
}, wi = {
  key: 0,
  class: "dc-type__empty"
}, ki = { class: "dc-type__identity" }, bi = { class: "dc-type__primary dc-truncate" }, $i = { class: "dc-type__secondary dc-mono dc-truncate" }, xi = { class: "dc-type__trailing dc-mono" }, Si = { class: "dc-type__metric-value" }, Ci = { class: "dc-type__metric-label" }, Pi = {
  key: 0,
  class: "dc-type__date"
}, Ei = /* @__PURE__ */ F({
  __name: "TypeCardsView",
  setup(e) {
    const t = X(), { previews: n, pending: a, error: s } = ci({
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
    ), r = f(() => t.previewsPerType.value <= 0), c = f(
      () => n.value.filter(
        (l) => !l.pinned && (l.total > 0 || !r.value && l.entity.create)
      )
    );
    return (l, i) => (u(), h("div", {
      class: "dc-types",
      "data-dc-pending": x(a) ? "true" : "false",
      "data-dc-heads-only": r.value ? "true" : "false"
    }, [
      j(l.$slots, "before", {}, void 0, !0),
      x(s) ? (u(), h("p", fi, " Could not load results: " + P(x(s) instanceof Error ? x(s).message : "the data source failed."), 1)) : !c.value.length && x(a) ? (u(), h("p", vi, " Running query… ")) : c.value.length ? T("", !0) : (u(), h("p", pi, P(o.value ? "Nothing matches this query" : "Nothing here yet"), 1)),
      (u(!0), h(q, null, Q(c.value, (d) => (u(), h("section", {
        key: d.entity.key,
        class: "dc-type",
        "data-dc-empty": d.total ? "false" : "true"
      }, [
        K(Z, {
          class: "dc-type__head",
          href: x(t).entityHref(d.entity.key),
          onPress: (v) => x(t).setEntity(d.entity.key)
        }, {
          default: z(() => [
            S("span", mi, P(d.entity.label), 1),
            S("span", yi, P(d.count), 1),
            i[0] || (i[0] = S("span", {
              class: "dc-type__go",
              "aria-hidden": "true"
            }, "→", -1)),
            S("span", gi, "Show only " + P(d.entity.label.toLowerCase()), 1),
            d.entity.description ? (u(), h("span", _i, P(d.entity.description), 1)) : T("", !0)
          ]),
          _: 2
        }, 1032, ["href", "onPress"]),
        d.total ? T("", !0) : (u(), h("p", wi, P(o.value ? "No matches" : "Nothing here yet"), 1)),
        (u(!0), h(q, null, Q(d.rows, (v) => (u(), h("div", {
          key: v.key,
          class: "dc-type__row"
        }, [
          K(Z, {
            class: "dc-type__open",
            href: x(t).pressHref(v.row),
            onPress: (w) => x(t).activate(v.row, w)
          }, {
            default: z(() => [
              S("span", ki, [
                S("span", bi, P(v.parts.identity), 1),
                S("span", $i, P(v.parts.reference), 1)
              ])
            ]),
            _: 2
          }, 1032, ["href", "onPress"]),
          S("span", xi, [
            (u(!0), h(q, null, Q(v.parts.metrics.slice(0, 1), (w) => (u(), I(Je, {
              key: w.column.key ?? w.label,
              class: "dc-type__metric",
              entry: v,
              column: w.column
            }, {
              default: z(() => [
                S("span", Si, P(w.text), 1),
                S("span", Ci, P(w.label), 1)
              ]),
              _: 2
            }, 1032, ["entry", "column"]))), 128)),
            v.parts.updated ? (u(), h("span", Pi, P(v.parts.updated), 1)) : T("", !0),
            K(ln, { entry: v }, null, 8, ["entry"]),
            K(et, { entry: v }, null, 8, ["entry"]),
            K(Ze, { entry: v }, null, 8, ["entry"])
          ])
        ]))), 128)),
        d.entity.create && !r.value ? (u(), I(Z, {
          key: 1,
          class: "dc-type__new",
          href: x(t).createHref?.(d.entity),
          onPress: (v) => x(t).create(d.entity)
        }, {
          default: z(() => [
            i[1] || (i[1] = S("span", {
              class: "dc-type__plus",
              "aria-hidden": "true"
            }, "+", -1)),
            Y(" " + P(d.entity.create), 1)
          ]),
          _: 2
        }, 1032, ["href", "onPress"])) : T("", !0)
      ], 8, hi))), 128)),
      j(l.$slots, "after", {}, void 0, !0)
    ], 8, di));
  }
}), La = /* @__PURE__ */ D(Ei, [["__scopeId", "data-v-d73c6777"]]), Mi = ["data-dc-pending", "data-dc-more"], Li = {
  key: 0,
  class: "dc-results__state dc-results__state--loading",
  "aria-live": "polite"
}, Ti = {
  key: 3,
  class: "dc-results__state",
  role: "alert"
}, Oi = { class: "dc-results__detail" }, Ni = {
  key: 4,
  class: "dc-results__state",
  "aria-live": "polite"
}, Ai = {
  key: 5,
  class: "dc-results__state"
}, Ii = { class: "dc-results__detail" }, Ri = /* @__PURE__ */ F({
  __name: "ResultsArea",
  props: {
    views: {},
    loading: { type: Boolean }
  },
  setup(e) {
    const t = e, n = X(), a = ht(), s = {
      list: jt,
      cards: ba,
      grid: $a,
      images: xa,
      table: Ma,
      links: Sa,
      preview: Ca
    }, o = f(() => Kn(n.query.value, t.views)), r = f(() => yt(n.query.value.view, t.views)), c = f(() => (r.value === "record" ? null : s[r.value]) ?? jt), l = f(() => r.value === "record" ? n.recordView.value : null), i = f(() => n.rows.value.length > 0), d = f(() => n.error.value !== null), v = R(null);
    function w(p) {
      return p.querySelector("[data-dc-scroll]") ?? p;
    }
    ee(
      // The page on screen, which is the draft's own while one is being typed.
      () => n.liveQuery.value.page,
      () => {
        v.value && (w(v.value).scrollTop = 0);
      }
    );
    const k = R(""), _ = R({ x: 0, y: 0 }), m = R(0);
    function b() {
      const p = v.value;
      if (!p) {
        k.value = "";
        return;
      }
      const g = w(p), L = {
        top: g.scrollTop > 1,
        right: g.scrollWidth - g.clientWidth - g.scrollLeft > 1,
        bottom: g.scrollHeight - g.clientHeight - g.scrollTop > 1,
        left: g.scrollLeft > 1
      };
      k.value = Object.entries(L).filter(([, H]) => H).map(([H]) => H).join(" "), _.value = {
        x: g.offsetHeight - g.clientHeight,
        y: g.offsetWidth - g.clientWidth
      }, m.value = p.querySelector("[data-dc-stuck]")?.offsetHeight ?? 0;
    }
    let E = null, $ = null;
    return ee(
      v,
      (p, g) => {
        if (g?.removeEventListener("scroll", b, { capture: !0 }), E?.disconnect(), $?.disconnect(), E = null, $ = null, b(), !p || (p.addEventListener("scroll", b, { passive: !0, capture: !0 }), typeof ResizeObserver > "u")) return;
        const L = new ResizeObserver(b), H = typeof MutationObserver > "u" ? null : new MutationObserver(() => {
          G(), b();
        }), G = () => {
          L.disconnect(), H?.disconnect();
          for (const B of /* @__PURE__ */ new Set([p, w(p)])) {
            L.observe(B);
            for (const W of B.children) L.observe(W);
            H?.observe(B, { childList: !0 });
          }
        };
        G(), E = L, $ = H;
      },
      { flush: "post" }
    ), pe(() => {
      v.value?.removeEventListener("scroll", b, { capture: !0 }), E?.disconnect(), $?.disconnect();
    }), (p, g) => (u(), h("div", {
      ref_key: "scroller",
      ref: v,
      class: "dc-results",
      "data-dc-pending": x(n).pending.value ? "true" : "false",
      "data-dc-more": k.value,
      style: ne({
        "--dc-results-gutter-x": `${_.value.x}px`,
        "--dc-results-gutter-y": `${_.value.y}px`,
        "--dc-results-stuck": `${m.value}px`
      })
    }, [
      e.loading ? (u(), h("p", Li, [...g[1] || (g[1] = [
        S("span", { class: "dc-results__detail" }, "Loading…", -1)
      ])])) : o.value ? (u(), I(La, { key: 1 }, Rt({ _: 2 }, [
        a["cards-before"] ? {
          name: "before",
          fn: z(() => [
            j(p.$slots, "cards-before", {}, void 0, !0)
          ]),
          key: "0"
        } : void 0,
        a["cards-after"] ? {
          name: "after",
          fn: z(() => [
            j(p.$slots, "cards-after", {}, void 0, !0)
          ]),
          key: "1"
        } : void 0
      ]), 1024)) : l.value ? (u(), I(qe(l.value.component), {
        key: 2,
        id: l.value.id
      }, null, 8, ["id"])) : d.value ? (u(), h("p", Ti, [
        g[2] || (g[2] = S("span", { class: "dc-results__headline" }, "Could not load results", -1)),
        S("span", Oi, P(x(n).error.value instanceof Error ? x(n).error.value.message : "The data source failed."), 1)
      ])) : !i.value && x(n).pending.value ? (u(), h("p", Ni, [...g[3] || (g[3] = [
        S("span", { class: "dc-results__detail" }, "Running query…", -1)
      ])])) : i.value ? (u(), I(qe(c.value), { key: 6 })) : (u(), h("div", Ai, [
        g[4] || (g[4] = S("span", { class: "dc-results__headline" }, "Nothing matches this query", -1)),
        S("span", Ii, P(x(n).summary.value), 1),
        x(n).isPristine.value ? T("", !0) : (u(), I(Z, {
          key: 0,
          class: "dc-results__clear",
          href: x(n).clearHref(),
          onPress: g[0] || (g[0] = (L) => x(n).clearFilters())
        }, {
          default: z(() => [
            Y(P(x(n).isEverything.value ? "Clear filters" : "Search everything instead"), 1)
          ]),
          _: 1
        }, 8, ["href"]))
      ]))
    ], 12, Mi));
  }
}), Ta = /* @__PURE__ */ D(Ri, [["__scopeId", "data-v-9cb044b3"]]), Bi = ["data-dc-theme"], Hi = {
  key: 0,
  class: "dc-shell__page"
}, Fi = /* @__PURE__ */ F({
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
    const a = e, s = n, o = dn(e, "pinned"), r = dn(e, "selected"), c = ht(), l = Ut(Hn, null), i = a.route || l ? null : Va(), d = a.route ?? l ?? i;
    pe(() => i?.dispose?.());
    const v = R(!!c.page);
    Ia(() => {
      v.value = !!c.page;
    });
    const w = Ka(d, {
      detached: () => v.value && a.pageQuery === "detached",
      path: () => a.listPath
    }), k = f(() => Is({ seed: a.schema.key })), _ = f(() => a.source ?? k.value), m = to({
      schema: () => a.schema,
      adapter: w,
      defaults: () => a.defaults,
      navigationMode: () => a.navigationMode,
      facetNavigationMode: () => a.facetNavigationMode
    }), b = f(() => a.within?.trim() ?? ""), E = so({
      query: m.query,
      entity: m.entity,
      schema: f(() => a.schema),
      setExpression: m.setExpression
    }), $ = no({
      source: _,
      query: E.live,
      schema: f(() => a.schema),
      entity: m.entity,
      limit: f(() => a.limit),
      within: b
    });
    ee(m.query, (y) => s("query-change", y));
    const p = f(() => Ks(a.schema, [m.query.value.expr])), g = f(
      () => p.value.flatMap((y) => {
        const M = a.schema.entities.find((A) => A.key === y.entityKey);
        return M ? [{ ...y, entity: M }] : [];
      })
    );
    function L() {
      if (c.record) return g.value;
      const y = a.recordCards;
      return y ? g.value.filter((M) => y[M.entityKey]) : [];
    }
    const H = f(() => {
      const [y, ...M] = g.value;
      if (!y || M.length || m.entity.value !== null) return null;
      const A = a.recordViews?.[y.entityKey];
      return A ? { ...A, id: y.id } : null;
    }), G = f(() => {
      const y = a.views, M = typeof y == "function" ? y({ entity: m.entity.value, records: p.value }) : y;
      return H.value ? [...(M ?? Gt).filter((A) => A !== "record"), "record"] : M?.filter((A) => A !== "record");
    });
    ee(
      [$.pageCount, $.pending, m.query, E.drafting, () => a.loading, v],
      () => {
        if ($.pending.value || E.drafting.value || a.loading || v.value) return;
        const y = $.pageCount.value;
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
      const M = new Set(B.value);
      M.has(y.id) ? M.delete(y.id) : M.add(y.id), o.value = [...M], s("toggle-pin", y);
    }
    const te = f(() => {
      if (a.selectable === !0) return !0;
      const y = m.entity.value;
      return !!(y?.duplicate || y?.delete || y?.operations?.some((M) => M.selection !== !1));
    }), le = f(() => new Set(r.value));
    function ie(y) {
      const M = new Set(le.value);
      M.has(y.id) ? M.delete(y.id) : M.add(y.id), r.value = [...M];
    }
    function de(y) {
      const M = new Set(le.value);
      for (const A of $.rows.value)
        y ? M.add(A.id) : M.delete(A.id);
      r.value = [...M];
    }
    function J() {
      r.value.length && (r.value = []);
    }
    const O = f(() => ({
      ids: [...r.value],
      rows: $.rows.value.filter((y) => le.value.has(y.id)),
      entity: m.entity.value
    }));
    ee(() => m.query.value.entity, J);
    function V(y, M, A = {}) {
      const Te = Ot(a.schema, m.query.value, y, A);
      A.exclude ? m.narrow(Te, M?.key ?? m.query.value.entity) : E.release(() => m.narrow(Te, M?.key ?? null, M ? void 0 : "cards")), s("drill", y, M, A);
    }
    function N(y) {
      return a.rowPress === "narrow" && ct(a.schema, y) !== null;
    }
    function U(y) {
      return a.schema.entities.find((A) => A.key === y.entityKey)?.href?.(y) || null;
    }
    const ce = Ws({
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
      setPage: (y, M) => {
        E.drafting.value ? E.setPage(y) : m.setPage(y, M);
      },
      schema: f(() => a.schema),
      entities: f(() => a.schema.entities),
      rows: $.rows,
      total: $.total,
      limit: f(() => a.limit),
      offset: $.offset,
      pageCount: $.pageCount,
      pending: $.pending,
      counting: $.counting,
      error: $.error,
      source: _,
      previewsPerType: f(() => a.previewsPerType),
      within: b,
      loading: f(() => a.loading),
      recordView: H,
      pinnable: f(() => a.pinnable === !0),
      isPinned: (y) => B.value.has(y.id),
      isPinnedId: (y) => B.value.has(y),
      togglePin: W,
      selectable: te,
      selection: O,
      isSelected: (y) => le.value.has(y.id),
      toggleSelect: ie,
      selectPage: de,
      clearSelection: J,
      narrowsOnPress: f(() => a.rowPress === "narrow"),
      rowLinks: f(() => a.rowLinks),
      /*
       * The one place a press is read, so every view gets the same answer without
       * knowing which of the two it is: they all call this.
       */
      activate: (y, M = {}) => {
        if (N(y)) {
          V(y, null, M);
          return;
        }
        const A = U(y);
        if (A) {
          window.open(A, "_blank", "noopener");
          return;
        }
        s("activate", y);
      },
      pressHref: (y) => N(y) ? m.narrowHref(Ot(a.schema, m.query.value, y), null, "cards") : U(y) ?? a.activateHref?.(y) ?? null,
      recordHref: U,
      drillHref: (y, M) => ct(a.schema, y) ? m.narrowHref(
        Ot(a.schema, m.query.value, y),
        M?.key ?? null,
        M ? void 0 : "cards"
      ) : null,
      create: (y) => s("create", y),
      createHref: (y) => a.createHref?.(y) ?? null,
      duplicate: () => s("duplicate", O.value),
      delete: () => s("delete", O.value),
      operate: (y) => s("operate", y, O.value),
      drill: V
    });
    Us({ theme: () => a.theme, accent: () => a.accent, tokens: () => a.tokens });
    const Ae = f(() => {
      if (!(!a.accent && !a.tokens))
        return { ...a.tokens, ...a.accent ? { "--dc-accent": a.accent } : {} };
    }), we = R(null), xe = R(0);
    let me = null;
    Qe(() => {
      const y = we.value;
      y && (xe.value = y.getBoundingClientRect().width, !(typeof ResizeObserver > "u") && (me = new ResizeObserver(([M]) => {
        xe.value = M.contentRect.width;
      }), me.observe(y)));
    }), pe(() => me?.disconnect());
    const ye = f(() => a.oneStripFrom !== !1 && xe.value >= a.oneStripFrom), C = f(() => ({
      views: G.value,
      selectionPlacement: a.selectionPlacement,
      pagesNote: a.pagesNote
    }));
    return t({
      query: m.query
    }), (y, M) => (u(), h("div", {
      ref_key: "root",
      ref: we,
      class: "dc-shell",
      "data-dc-theme": e.theme,
      style: ne(Ae.value)
    }, [
      S("div", {
        class: se(["dc-shell__head", { "dc-shell__head--one-strip": ye.value }])
      }, [
        K(ga, null, Rt({ _: 2 }, [
          c.page ? void 0 : {
            name: "lead",
            fn: z(() => [
              K(pr, {
                views: G.value,
                "type-chooser": e.typeChooser
              }, null, 8, ["views", "type-chooser"])
            ]),
            key: "0"
          },
          c.brand ? {
            name: "brand",
            fn: z((A) => [
              j(y.$slots, "brand", Mt(Ra(A)), void 0, !0)
            ]),
            key: "1"
          } : void 0,
          c.actions ? {
            name: "actions",
            fn: z(() => [
              j(y.$slots, "actions", {}, void 0, !0)
            ]),
            key: "2"
          } : void 0
        ]), 1024),
        ye.value && !c.page ? (u(), I(Wt, Mt(At({ key: 0 }, C.value)), null, 16)) : T("", !0)
      ], 2),
      c.page ? (u(), h("div", Hi, [
        j(y.$slots, "page", {
          query: x(ce).query.value
        }, void 0, !0)
      ])) : T("", !0),
      !ye.value && !c.page ? (u(), I(Wt, Mt(At({ key: 1 }, C.value)), null, 16)) : T("", !0),
      c.page ? T("", !0) : j(y.$slots, "results", {
        rows: x(ce).rows.value,
        total: x(ce).total.value,
        offset: x(ce).offset.value,
        pageCount: x(ce).pageCount.value,
        query: x(ce).liveQuery.value,
        pending: x(ce).pending.value,
        loading: e.loading
      }, () => [
        K(Ta, {
          views: G.value,
          loading: e.loading
        }, Rt({ _: 2 }, [
          c["cards-before"] || L().length ? {
            name: "cards-before",
            fn: z(() => [
              (u(!0), h(q, null, Q(L(), (A) => (u(), h(q, {
                key: `${A.entityKey}:${A.id}`
              }, [
                c.record ? j(y.$slots, "record", {
                  id: A.id,
                  entity: A.entity
                }, void 0, !0, 0) : (u(), I(qe(e.recordCards?.[A.entityKey]), {
                  key: 1,
                  id: A.id
                }, null, 8, ["id"]))
              ], 64))), 128)),
              j(y.$slots, "cards-before", {}, void 0, !0)
            ]),
            key: "0"
          } : void 0,
          c["cards-after"] ? {
            name: "cards-after",
            fn: z(() => [
              j(y.$slots, "cards-after", {}, void 0, !0)
            ]),
            key: "1"
          } : void 0
        ]), 1032, ["views", "loading"])
      ], !0, 2)
    ], 12, Bi));
  }
}), qi = /* @__PURE__ */ D(Fi, [["__scopeId", "data-v-0327c1bd"]]), Di = ["data-dc-muted", "data-dc-collapsed"], Vi = ["data-dc-collapsible"], Ki = ["aria-expanded", "aria-controls"], Wi = { class: "dc-shell-card__sr" }, zi = {
  key: 0,
  class: "dc-shell-card__identity"
}, ji = { class: "dc-shell-card__title dc-shell-card__name" }, Ui = {
  key: 0,
  class: "dc-shell-card__ref dc-mono"
}, Qi = {
  key: 1,
  class: "dc-shell-card__title"
}, Gi = {
  key: 2,
  class: "dc-shell-card__count dc-mono"
}, Yi = {
  key: 1,
  class: "dc-shell-card__aside"
}, Xi = ["data-dc-flush"], Ji = /* @__PURE__ */ F({
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
    function c(B) {
      return l(B?.() ?? []);
    }
    function l(B) {
      return B.some((W) => W.type === Ba ? !1 : W.type === Ha ? String(W.children ?? "").trim().length > 0 : W.type === q ? l(W.children ?? []) : !0);
    }
    const i = f(
      () => !!n.title || !!n.name || d.value || c(r.head)
    ), d = f(() => c(r.aside)), v = f(() => c(r.default)), w = f(() => c(r.foot)), k = f(
      () => !!n.name && (!!n.reference || c(r.reference))
    ), _ = f(() => n.collapsible === !0 && i.value), m = f(() => _.value && (n.collapsed ?? s.value));
    function b() {
      const B = !m.value;
      s.value = B, a("update:collapsed", B);
    }
    const E = mt() ?? "dc-shell-card", $ = `${E}-body`, p = `${E}-foot`, g = f(
      () => [v.value ? $ : "", w.value ? p : ""].filter(Boolean).join(" ") || void 0
    ), L = [
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
    function G(B) {
      if (!_.value) return;
      const W = B.target?.closest(L);
      W && H.value?.contains(W) || typeof window < "u" && window.getSelection()?.toString() || b();
    }
    return (B, W) => (u(), h("section", {
      class: "dc-shell-card",
      style: ne(o.value),
      "data-dc-muted": e.muted ? "true" : "false",
      "data-dc-collapsed": m.value ? "true" : "false"
    }, [
      i.value ? (u(), h("header", {
        key: 0,
        ref_key: "head",
        ref: H,
        class: "dc-shell-card__head",
        "data-dc-collapsible": _.value ? "true" : "false",
        onClick: G
      }, [
        _.value ? (u(), h("button", {
          key: 0,
          type: "button",
          class: "dc-shell-card__toggle",
          "aria-expanded": m.value ? "false" : "true",
          "aria-controls": g.value,
          onClick: b
        }, [
          W[0] || (W[0] = S("svg", {
            class: "dc-shell-card__chevron",
            viewBox: "0 0 10 10",
            "aria-hidden": "true"
          }, [
            S("path", { d: "M2 3.5 5 6.5 8 3.5" })
          ], -1)),
          S("span", Wi, P(e.name || e.title || "Card"), 1)
        ], 8, Ki)) : T("", !0),
        j(B.$slots, "head", {}, () => [
          e.name ? (u(), h("div", zi, [
            S("h2", ji, P(e.name), 1),
            k.value ? (u(), h("span", Ui, [
              j(B.$slots, "reference", {}, () => [
                Y(P(e.reference), 1)
              ], !0)
            ])) : T("", !0)
          ])) : (u(), h("h2", Qi, P(e.title), 1)),
          e.count !== void 0 ? (u(), h("span", Gi, P(e.count), 1)) : T("", !0)
        ], !0),
        d.value ? (u(), h("span", Yi, [
          j(B.$slots, "aside", {}, void 0, !0)
        ])) : T("", !0)
      ], 8, Vi)) : T("", !0),
      v.value ? It((u(), h("div", {
        key: 1,
        id: $,
        class: "dc-shell-card__body",
        "data-dc-flush": e.flush ? "true" : "false"
      }, [
        j(B.$slots, "default", {}, void 0, !0)
      ], 8, Xi)), [
        [vn, !m.value]
      ]) : T("", !0),
      w.value ? It((u(), h("footer", {
        key: 2,
        id: p,
        class: "dc-shell-card__foot"
      }, [
        j(B.$slots, "foot", {}, void 0, !0)
      ], 512)), [
        [vn, !m.value]
      ]) : T("", !0)
    ], 12, Di));
  }
}), Jc = /* @__PURE__ */ D(Ji, [["__scopeId", "data-v-073304c8"]]), Zi = ["aria-label"], ec = ["aria-checked", "data-dc-active", "tabindex", "onClick", "onKeydown"], tc = /* @__PURE__ */ F({
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
    function o(r, c) {
      const l = n.options.length;
      let i = null;
      if (r.key === "ArrowRight" || r.key === "ArrowDown" ? i = (c + 1) % l : r.key === "ArrowLeft" || r.key === "ArrowUp" ? i = (c - 1 + l) % l : r.key === "Home" ? i = 0 : r.key === "End" && (i = l - 1), i === null) return;
      r.preventDefault();
      const d = n.options[i];
      d && (a("update:modelValue", d.key), s.value[i]?.focus());
    }
    return (r, c) => (u(), h("div", {
      class: "dc-segmented",
      role: "radiogroup",
      "aria-label": e.label
    }, [
      (u(!0), h(q, null, Q(e.options, (l, i) => (u(), h("button", {
        key: l.key,
        ref_for: !0,
        ref_key: "buttons",
        ref: s,
        type: "button",
        role: "radio",
        class: se(["dc-segmented__item", { "dc-segmented__item--mono": e.mono }]),
        "aria-checked": l.key === e.modelValue,
        "data-dc-active": l.key === e.modelValue ? "true" : "false",
        tabindex: l.key === e.modelValue ? 0 : -1,
        onClick: (d) => a("update:modelValue", l.key),
        onKeydown: (d) => o(d, i)
      }, P(l.label), 43, ec))), 128))
    ], 8, Zi));
  }
}), nc = /* @__PURE__ */ D(tc, [["__scopeId", "data-v-63fb5482"]]), ac = { class: "dc-fact__label" }, sc = ["title"], oc = /* @__PURE__ */ F({
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
    return (s, o) => (u(), h("div", {
      class: "dc-fact",
      style: ne(a.value)
    }, [
      S("dt", ac, [
        j(s.$slots, "label", {}, () => [
          Y(P(e.label), 1)
        ], !0)
      ]),
      S("dd", {
        class: "dc-fact__value dc-mono",
        title: e.title
      }, [
        j(s.$slots, "default", {}, () => [
          n.value.length === 1 ? (u(), h(q, { key: 0 }, [
            Y(P(n.value[0]), 1)
          ], 64)) : (u(!0), h(q, { key: 1 }, Q(n.value, (r, c) => (u(), h("span", {
            key: c,
            class: "dc-fact__line"
          }, P(r), 1))), 128))
        ], !0)
      ], 8, sc)
    ], 4));
  }
}), rc = /* @__PURE__ */ D(oc, [["__scopeId", "data-v-1f6d25e6"]]), lc = /* @__PURE__ */ F({
  __name: "ShellFacts",
  props: {
    items: { default: () => [] },
    min: { default: "200px" }
  },
  setup(e) {
    const t = e, n = f(() => ({ "--dc-facts-min": t.min }));
    return (a, s) => (u(), h("dl", {
      class: "dc-facts",
      style: ne(n.value)
    }, [
      (u(!0), h(q, null, Q(e.items, (o, r) => (u(), I(rc, {
        key: `${r}:${o.label}`,
        label: o.label,
        value: o.value,
        title: o.title,
        wide: o.wide
      }, null, 8, ["label", "value", "title", "wide"]))), 128)),
      j(a.$slots, "default", {}, void 0, !0)
    ], 4));
  }
}), Zc = /* @__PURE__ */ D(lc, [["__scopeId", "data-v-17455afa"]]), ic = { class: "dc-counts" }, cc = ["data-dc-tone"], uc = {
  key: 0,
  class: "dc-counts__empty"
}, dc = /* @__PURE__ */ F({
  __name: "StatusCounts",
  props: {
    counts: {},
    empty: { default: he }
  },
  setup(e) {
    const t = e, n = f(() => t.counts.filter((a) => a.count > 0));
    return (a, s) => (u(), h("span", ic, [
      (u(!0), h(q, null, Q(n.value, (o) => (u(), h("span", {
        key: o.label,
        class: "dc-counts__count",
        "data-dc-tone": o.tone ?? "neutral"
      }, P(o.count) + " " + P(o.label), 9, cc))), 128)),
      n.value.length === 0 ? (u(), h("span", uc, P(e.empty), 1)) : T("", !0)
    ]));
  }
}), eu = /* @__PURE__ */ D(dc, [["__scopeId", "data-v-5553a9e2"]]), fc = ["data-dc-copied", "title", "aria-label"], vc = {
  key: 0,
  class: "dc-copy__mark",
  viewBox: "0 0 16 16",
  "aria-hidden": "true"
}, pc = {
  key: 1,
  class: "dc-copy__mark",
  viewBox: "0 0 16 16",
  "aria-hidden": "true"
}, hc = 1500, mc = /* @__PURE__ */ F({
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
      const c = typeof n.text == "function" ? n.text() : n.text;
      try {
        if (!navigator.clipboard) throw new Error("The clipboard is not available here");
        await navigator.clipboard.writeText(c);
      } catch (l) {
        a("error", l);
        return;
      }
      s.value = !0, clearTimeout(o), o = setTimeout(() => {
        s.value = !1;
      }, hc), a("copied", c);
    }
    return pe(() => clearTimeout(o)), (c, l) => (u(), h("button", {
      type: "button",
      class: "dc-copy",
      "data-dc-copied": s.value ? "true" : "false",
      title: s.value ? "Copied" : e.label,
      "aria-label": e.label,
      onClick: r
    }, [
      s.value ? (u(), h("svg", pc, [...l[1] || (l[1] = [
        S("path", { d: "M3 8.5l3.2 3L13 4.5" }, null, -1)
      ])])) : (u(), h("svg", vc, [...l[0] || (l[0] = [
        S("rect", {
          x: "5.5",
          y: "5.5",
          width: "8",
          height: "9",
          rx: "1.5"
        }, null, -1),
        S("path", { d: "M10.5 3.5v-1a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h1" }, null, -1)
      ])]))
    ], 8, fc));
  }
}), yc = /* @__PURE__ */ D(mc, [["__scopeId", "data-v-f4249d7f"]]), gc = ["data-dc-copy", "data-dc-wrap", "data-dc-tone"], _c = /* @__PURE__ */ F({
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
    return (c, l) => (u(), h("div", {
      class: "dc-code",
      "data-dc-copy": e.copy ? "true" : "false",
      "data-dc-wrap": e.wrap ? "true" : "false",
      "data-dc-tone": e.tone
    }, [
      S("pre", {
        ref_key: "pre",
        ref: s,
        class: "dc-code__text dc-mono",
        style: ne(o.value)
      }, [
        j(c.$slots, "default", {}, () => [
          Y(P(e.code), 1)
        ], !0)
      ], 4),
      e.copy ? (u(), I(yc, {
        key: 0,
        class: "dc-code__copy",
        text: r,
        label: e.copyLabel,
        onCopied: l[0] || (l[0] = (i) => a("copied", i)),
        onError: l[1] || (l[1] = (i) => a("error", i))
      }, null, 8, ["label"])) : T("", !0)
    ], 8, gc));
  }
}), tu = /* @__PURE__ */ D(_c, [["__scopeId", "data-v-67b371dd"]]), wc = 24, kc = /* @__PURE__ */ F({
  __name: "ShellLog",
  props: {
    fetchChunk: {},
    stripAnsi: { type: Boolean },
    maxHeight: { default: "460px" }
  },
  setup(e, { expose: t }) {
    const n = e, a = R(""), s = f(() => n.stripAnsi ? Xa(a.value) : a.value), o = R(null);
    let r = 0, c = null;
    function l() {
      return c ??= i().finally(() => {
        c = null;
      }), c;
    }
    async function i() {
      const { chunk: w, offset: k } = await n.fetchChunk(r);
      if (r = k, !w) return;
      const _ = o.value, m = !_ || _.scrollTop + _.clientHeight >= _.scrollHeight - wc;
      a.value += w, m && (await Fe(), o.value && (o.value.scrollTop = o.value.scrollHeight));
    }
    function d() {
      a.value = "", r = 0;
    }
    const v = f(() => n.maxHeight === void 0 ? void 0 : { maxHeight: typeof n.maxHeight == "number" ? `${n.maxHeight}px` : n.maxHeight });
    return t({ poll: l, reset: d }), (w, k) => (u(), h("pre", {
      ref_key: "pane",
      ref: o,
      class: "dc-log dc-mono",
      style: ne(v.value)
    }, P(s.value), 5));
  }
}), nu = /* @__PURE__ */ D(kc, [["__scopeId", "data-v-2c86947e"]]), bc = ["data-dc-theme"], $c = ["aria-labelledby", "aria-label"], xc = {
  key: 1,
  class: "dc-dialog__actions"
}, Re = [], Sc = /* @__PURE__ */ F({
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
    const n = e, a = t, { theme: s, style: o, adopt: r } = sn(n), c = `${mt() ?? "dc-dialog"}-title`, l = R(null);
    function i() {
      a("close"), a("update:open", !1);
    }
    const d = Symbol("dc-dialog");
    function v(p) {
      p.key !== "Escape" || p.defaultPrevented || Re[Re.length - 1] === d && (p.preventDefault(), i());
    }
    let w = !1;
    function k(p) {
      w = p.target === p.currentTarget;
    }
    function _(p) {
      p.target === p.currentTarget && w && i(), w = !1;
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
    let b = null;
    async function E() {
      Re.push(d), document.addEventListener("keydown", v), b = document.activeElement instanceof HTMLElement ? document.activeElement : null, r(), await Fe(), (l.value?.querySelector("[autofocus]") ?? l.value?.querySelector(m) ?? l.value)?.focus();
    }
    function $() {
      const p = Re.indexOf(d);
      p !== -1 && (Re.splice(p, 1), document.removeEventListener("keydown", v), b?.isConnected && b.focus(), b = null);
    }
    return Qe(() => {
      n.open && E();
    }), ee(
      () => n.open,
      (p) => {
        p ? E() : $();
      }
    ), pe($), (p, g) => e.open ? (u(), I(pt, {
      key: 0,
      to: e.to
    }, [
      S("div", {
        class: "dc-shell dc-layer dc-dialog",
        "data-dc-theme": x(s),
        style: ne(x(o)),
        onPointerdown: k,
        onClick: _
      }, [
        S("div", {
          ref_key: "panel",
          ref: l,
          class: se(["dc-dialog__panel", e.panelClass]),
          role: "dialog",
          "aria-modal": "true",
          tabindex: "-1",
          "aria-labelledby": e.title ? c : void 0,
          "aria-label": e.title ? void 0 : e.label
        }, [
          e.title ? (u(), h("h2", {
            key: 0,
            id: c,
            class: "dc-dialog__title"
          }, P(e.title), 1)) : T("", !0),
          S("div", {
            class: se(["dc-dialog__body", e.bodyClass])
          }, [
            j(p.$slots, "default", {}, void 0, !0)
          ], 2),
          p.$slots.actions ? (u(), h("div", xc, [
            j(p.$slots, "actions", {}, void 0, !0)
          ])) : T("", !0)
        ], 10, $c)
      ], 44, bc)
    ], 8, ["to"])) : T("", !0);
  }
}), au = /* @__PURE__ */ D(Sc, [["__scopeId", "data-v-0cccf313"]]), Cc = 4500, Pc = 9e3, Ue = R([]);
let An = 0;
function Oa(e) {
  Ue.value = Ue.value.filter((t) => t.id !== e);
}
function Na(e, t = "ok") {
  An += 1;
  const n = An;
  Ue.value = [...Ue.value, { id: n, message: e, kind: t }], setTimeout(() => Oa(n), t === "err" ? Pc : Cc);
}
function Ec(e) {
  Na(e instanceof Error ? e.message : String(e), "err");
}
function Mc() {
  return { toasts: Fa(Ue), toast: Na, toastError: Ec, dismiss: Oa };
}
const Lc = ["data-dc-theme"], Tc = ["data-dc-kind", "role"], Oc = /* @__PURE__ */ F({
  __name: "ShellToasts",
  props: {
    to: { default: "body" },
    theme: { default: void 0 },
    accent: { default: void 0 },
    tokens: { default: void 0 }
  },
  setup(e) {
    const t = e, { toasts: n } = Mc(), { theme: a, style: s, adopt: o } = sn(t);
    return Qe(o), (r, c) => (u(), I(pt, { to: e.to }, [
      S("div", {
        class: "dc-shell dc-layer dc-toasts",
        "data-dc-theme": x(a),
        style: ne(x(s)),
        "aria-live": "polite"
      }, [
        (u(!0), h(q, null, Q(x(n), (l) => (u(), h("div", {
          key: l.id,
          class: "dc-toast",
          "data-dc-kind": l.kind,
          role: l.kind === "err" ? "alert" : void 0
        }, P(l.message), 9, Tc))), 128))
      ], 12, Lc)
    ], 8, ["to"]));
  }
}), su = /* @__PURE__ */ D(Oc, [["__scopeId", "data-v-d970211c"]]);
function ou(e, t) {
  const n = R(!1);
  let a = null, s = !1, o = 0;
  const r = () => {
    o++, n.value = !1, a !== null && (clearTimeout(a), a = null);
  };
  function c(d) {
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
    s || d !== o || (v ? c(d) : r());
  }
  const i = () => {
    n.value || (n.value = !0, l(++o));
  };
  return vt(() => {
    s = !0, r();
  }, !0), { start: i, stop: r, polling: n };
}
function ru(e, t = {}) {
  const n = t.key ?? ((o) => JSON.stringify(o)), a = _e();
  let s = null;
  return qa(() => {
    const o = e(), r = n(o);
    r !== s && (s = r, a.value = o);
  }), a;
}
function lu(e = {}) {
  return { key: "ordinal", kind: "ordinal", label: "#", width: "52px", ...e };
}
function iu(e = {}) {
  return { key: "status", role: "state", kind: "status", label: "State", sort: "state", width: "104px", ...e };
}
function cu(e = {}) {
  return { key: "tint", role: "tint", ...e };
}
function uu(e = {}) {
  return { key: "picture", role: "image", kind: "image", width: "56px", height: "40px", ...e };
}
function du(e, t = {}) {
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
function fu(e, t = {}) {
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
function vu(e, t, n = {}) {
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
function pu(e, t, n = {}) {
  return { key: e, kind: "date", label: t, sort: e, width: "104px", mono: !0, muted: !0, ...n };
}
function hu(e = {}) {
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
function mu(e, t, n = {}) {
  return { key: e, label: t, sort: e, truncate: !0, hideBelow: 900, ...n };
}
function yu(e, t, n, a = {}) {
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
function Et(e) {
  return typeof e == "number" ? e : typeof e == "string" && e.trim() !== "" ? Number(e) : Number.NaN;
}
function gu(e) {
  const t = Et(e);
  return Number.isFinite(t) && t > 0 ? Ua(t) : he;
}
function _u(e) {
  const t = Et(e);
  return Number.isFinite(t) && t > 0 ? Qa(t) : he;
}
function wu(e) {
  const t = Et(e);
  return Number.isFinite(t) && t > 0 ? Ga(t) : he;
}
function ku(e) {
  const t = Et(e);
  return Number.isFinite(t) ? Ya(t) : he;
}
function Nc(e) {
  if (e <= 0) return 0;
  const t = 10 ** Math.floor(Math.log10(e));
  for (const n of [1, 2, 5])
    if (e <= n * t) return n * t;
  return 10 * t;
}
function Ac(e, t) {
  const n = /* @__PURE__ */ new Set();
  for (const a of e) {
    const s = a.fields[t];
    for (const o of Array.isArray(s) ? s : [s])
      typeof o == "string" && o && n.add(o);
  }
  return [...n].sort((a, s) => a.localeCompare(s));
}
function Ic(e, t) {
  let n = 0;
  for (const a of e) {
    const s = a.fields[t];
    typeof s == "number" && s > n && (n = s);
  }
  return n;
}
function bu(e, t, n, a = {}) {
  return {
    kind: "chips",
    key: t,
    label: n,
    options: Ac(e, t),
    ...a.multiple ? { multiple: !0 } : {}
  };
}
function $u(e, t, n) {
  return { kind: "range", key: t, label: n, min: 0, max: Nc(Ic(e, t)) };
}
function xu(e, t, n) {
  return { kind: "toggle", key: e, label: t, text: n };
}
function Su(e) {
  return e.filter((t) => t.kind === "chips" ? t.options.length > 1 : t.kind === "range" ? t.max > 0 : !0);
}
function Cu(e = "", t = "/") {
  const n = R(re(e)), a = R(t), s = [`${a.value}${n.value}`];
  return {
    search: n,
    path: a,
    history: s,
    href(o, r) {
      return `${r ?? a.value}${re(o)}`;
    },
    push(o, r) {
      r !== void 0 && (a.value = r), n.value = re(o), s.push(`${a.value}${n.value}`);
    },
    replace(o, r) {
      r !== void 0 && (a.value = r), n.value = re(o), s[s.length - 1] = `${a.value}${n.value}`;
    }
  };
}
function In(e) {
  const t = e.indexOf("?");
  if (t === -1) return "";
  const n = e.slice(t), a = n.indexOf("#");
  return re(a === -1 ? n : n.slice(0, a));
}
function Pu(e) {
  const t = R(In(e.currentRoute.value.fullPath)), n = f(() => e.currentRoute.value.path), a = ee(
    () => e.currentRoute.value.fullPath,
    (s) => {
      t.value = In(s);
    }
  );
  return {
    search: t,
    path: n,
    push: (s, o) => e.push(`${o ?? n.value}${re(s)}`),
    replace: (s, o) => e.replace(`${o ?? n.value}${re(s)}`),
    href: (s, o) => {
      const r = `${o ?? n.value}${re(s)}`;
      return e.resolve?.(r).href ?? r;
    },
    dispose: a
  };
}
function Eu(e, t, n = "/") {
  return (a) => {
    const s = a.params[t], o = Array.isArray(s) ? s.join("/") : s ?? "", r = a.query[Ee], c = typeof r == "string" ? r : "", l = `${e}="${o.replace(/"/g, "")}"`;
    return { path: n, query: { ...a.query, [Ee]: Ye(c, l) } };
  };
}
function Mu(e, t = "/") {
  return (n) => ({ path: t, query: { ...n.query, [Ne]: e } });
}
function Lu(e) {
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
function Tu(e, t) {
  return e.query({ ...t, limit: Number.MAX_SAFE_INTEGER, offset: 0 }).rows;
}
const Rc = {
  DataShell: qi,
  ShellHeader: ga,
  RecordActions: Wt,
  ResultsArea: Ta,
  SegmentedControl: nc,
  StatusPill: Xe,
  ListView: jt,
  CardsView: ba,
  GridView: $a,
  ImagesView: xa,
  TableView: Ma,
  LinksView: Sa,
  PreviewView: Ca,
  TypeCardsView: La
}, Ou = {
  install(e, t = {}) {
    const n = t.prefix ?? "";
    for (const [a, s] of Object.entries(Rc))
      e.component(`${n}${a}`, s);
    t.route && e.provide(Hn, t.route), (t.theme || t.accent || t.tokens) && js({ theme: t.theme, accent: t.accent, tokens: t.tokens }, e);
  }
};
export {
  Dc as COLUMN_BREAKPOINTS,
  qc as COLUMN_ROLES,
  ba as CardsView,
  Nn as ColumnCell,
  yc as CopyButton,
  Ja as DEFAULT_ENTITY_VIEW,
  Bt as DEFAULT_SORT,
  Fn as DEFAULT_VIEW,
  ao as DRAFT_DELAY,
  qi as DataShell,
  he as EMPTY_CELL,
  na as ENTITY_ALL,
  dt as ENTITY_TERM,
  je as EXPRESSION_TERM,
  $a as GridView,
  Ou as HeaderContentLayoutPlugin,
  xa as ImagesView,
  Sa as LinksView,
  jt as ListView,
  rt as MOCK_TINTS,
  Je as MetricDrill,
  Ze as OpenMark,
  tn as PARAM_DIR,
  Ne as PARAM_ENTITY,
  Ee as PARAM_EXPR,
  bt as PARAM_PAGE,
  en as PARAM_SORT,
  kt as PARAM_VIEW,
  Fc as PILL_TONES,
  uo as POPOVER_FLIP_BELOW,
  io as POPOVER_GAP,
  co as POPOVER_MARGIN,
  rn as PinStar,
  Ca as PreviewView,
  ln as QueryMark,
  Be as RECORD_STATUSES,
  Xt as RESULT_FIELDS,
  Hn as ROUTE_ADAPTER_KEY,
  Wt as RecordActions,
  pr as RecordChoosers,
  Ta as ResultsArea,
  fa as SHELL_CONTEXT_KEY,
  ut as SHELL_THEME_KEY,
  et as ScopeMark,
  nc as SegmentedControl,
  Le as SelectTick,
  Jc as ShellCard,
  tu as ShellCode,
  au as ShellDialog,
  rc as ShellFact,
  Zc as ShellFacts,
  ga as ShellHeader,
  nu as ShellLog,
  Zo as ShellPager,
  ho as ShellPopover,
  su as ShellToasts,
  zt as StandingControl,
  eu as StatusCounts,
  Xe as StatusPill,
  Pc as TOAST_ERROR_MS,
  Cc as TOAST_MS,
  Ma as TableView,
  La as TypeCardsView,
  Za as VIEW_ICONS,
  Gt as VIEW_KINDS,
  hn as VIEW_LABELS,
  Ye as addTerm,
  Zt as andExpression,
  gu as bytesCell,
  zn as cellFull,
  Ul as cellNarrowings,
  Pe as cellText,
  nt as cellTextOf,
  oe as cellValue,
  Lt as changesResults,
  bu as chipsFrom,
  yn as columnAlign,
  gn as columnClass,
  mn as columnKey,
  Ea as columnNarrows,
  Ge as columnShortcut,
  Yn as columnShortcutOf,
  Ft as columnTruncates,
  ss as columnsFor,
  Un as compactShortcuts,
  $o as completeDraft,
  as as countPages,
  Va as createHistoryAdapter,
  Cu as createMemoryAdapter,
  Lu as createMemoryDataSource,
  Is as createMockDataSource,
  Pu as createVueRouterAdapter,
  pu as dateColumn,
  ls as defaultCellText,
  st as defaultQuery,
  De as defaultViewFor,
  Ka as detachableAdapter,
  Ot as drillExpression,
  _u as durationCell,
  wu as elapsedCell,
  ts as emptyFacetValue,
  Fs as entityAddress,
  hu as entityColumn,
  Ht as entityCount,
  Mu as entityRedirect,
  ra as excludingTerm,
  We as expandShortcuts,
  mu as facetColumn,
  ze as facetField,
  ha as facetValue,
  ms as fieldHeading,
  oa as fieldTerm,
  Ve as findEntity,
  aa as findEntityByAddress,
  be as findSort,
  yu as flagColumn,
  He as fnv1a,
  Dn as focusEntity,
  Ua as formatBytes,
  at as formatCount,
  za as formatDate,
  Vc as formatDateTime,
  Qa as formatDuration,
  Ga as formatElapsed,
  ve as formatExpression,
  Ie as formatInteger,
  Wa as formatMetric,
  ja as formatOrdinal,
  Ya as formatPercent,
  fs as formatRange,
  ge as formatTerm,
  As as generateRows,
  Xs as hasActiveFacets,
  du as identityColumn,
  Gc as idsExpression,
  Kc as isEntityScoped,
  ns as isFacetActive,
  Yt as isPristineQuery,
  Ke as isRangeTerm,
  Kn as isTypeCardsQuery,
  qn as isViewKind,
  zc as joinExpression,
  la as liftTerm,
  ws as matchesExpression,
  vu as metricColumn,
  Yc as narrowPatch,
  ks as negateTerm,
  Nc as niceMax,
  re as normalizeSearch,
  jl as numberRange,
  $s as oppositeTerm,
  lu as ordinalColumn,
  ae as parseExpression,
  Vs as parseQuery,
  ku as percentCell,
  uu as pictureColumn,
  fo as placePopover,
  yr as presentParts,
  wa as presentRow,
  Ct as pressOptions,
  Ws as provideShellContext,
  js as provideShellTheme,
  Tu as queryAll,
  $u as rangeFrom,
  _t as rangeOf,
  Cs as readDraft,
  Qc as readExpression,
  Eu as recordRedirect,
  sa as recordTerm,
  Ks as recordsIn,
  fu as referenceColumn,
  ot as refineExpression,
  yt as resolveView,
  ue as roleColumn,
  Wn as roleColumns,
  rs as rowKey,
  qt as sameTerm,
  xt as scopeTerm,
  ct as scopeTermFor,
  ua as scopedEntity,
  Uc as searchFromQuery,
  En as serializeQuery,
  qs as sortAddress,
  gt as sortsFor,
  Wc as splitExpression,
  iu as stateColumn,
  Xa as stripAnsi,
  eo as summarizeQuery,
  on as summaryTerms,
  an as termStanding,
  cu as tintColumn,
  jc as tintFor,
  xu as toggleFacet,
  ql as useColumns,
  so as useDraft,
  ur as useEntityCounts,
  ci as useEntityPreviews,
  sn as useLayerTheme,
  ou as usePoll,
  Me as usePresentedRows,
  to as useQueryState,
  lo as useRecordNames,
  no as useResults,
  X as useShellContext,
  ru as useStableSchema,
  Mc as useToasts,
  Su as usefulFacets,
  pn as viewAcross,
  ma as withFacetValue,
  Dt as withStanding,
  Xc as withoutFacet,
  ca as withoutOwnScope,
  bs as withoutTerm
};
