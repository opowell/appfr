import { ref as H, computed as f, inject as ln, provide as rn, getCurrentInstance as ea, shallowRef as me, toValue as Oe, watch as te, onScopeDispose as Ct, getCurrentScope as ta, defineComponent as z, onMounted as ct, onBeforeUnmount as we, openBlock as u, createBlock as A, Teleport as Pt, createElementVNode as x, mergeProps as Ke, unref as k, renderSlot as G, createCommentVNode as L, nextTick as Je, createElementBlock as y, withKeys as Ae, useSlots as Mt, useId as Et, withCtx as Y, toDisplayString as M, createTextVNode as Z, Fragment as W, renderList as X, withModifiers as Ne, normalizeClass as de, withDirectives as jt, normalizeStyle as oe, vModelText as es, createVNode as Q, reactive as Sn, toHandlers as on, resolveDynamicComponent as Ze, createSlots as Ut, useModel as Cn, onBeforeUpdate as ts, normalizeProps as Dt, guardReactiveProps as ns, mergeModels as Pn, vShow as Mn, Comment as as, Text as ss, readonly as ls, watchEffect as rs } from "vue";
import { MenuList as os } from "menu-bar";
const cn = ["list", "cards", "grid", "images", "table", "links", "preview"], Ye = ["ok", "running", "queued", "review", "failed"], gu = [...Ye, "neutral", "accent"], _u = [
  "identity",
  "reference",
  "metric",
  "state",
  "updated",
  "image",
  "tint"
], wu = [480, 620, 760, 900, 1100], na = Symbol("dc.routeAdapter");
function fe(e) {
  if (!e) return "";
  const t = e.replace(/^[?]/, "");
  return t ? `?${t}` : "";
}
function is() {
  const e = typeof window < "u", t = H(e ? fe(window.location.search) : ""), n = H(e ? window.location.pathname : "/"), a = () => {
    t.value = fe(window.location.search), n.value = window.location.pathname;
  };
  e && window.addEventListener("popstate", a);
  const s = (l, r, i) => {
    const o = fe(l);
    if (!e) {
      t.value = o, i !== void 0 && (n.value = i);
      return;
    }
    const c = i === void 0 || i === window.location.pathname ? `${window.location.pathname}${o}${window.location.hash}` : `${i}${o}`;
    r === "push" ? window.history.pushState(window.history.state, "", c) : window.history.replaceState(window.history.state, "", c), t.value = o, n.value = window.location.pathname;
  };
  return {
    search: t,
    path: n,
    href(l, r) {
      return e ? r !== void 0 && r !== window.location.pathname ? `${r}${fe(l)}` : `${window.location.pathname}${fe(l)}${window.location.hash}` : `${r ?? n.value}${fe(l)}`;
    },
    push: (l, r) => s(l, "push", r),
    replace: (l, r) => s(l, "replace", r),
    dispose: () => {
      e && window.removeEventListener("popstate", a);
    }
  };
}
function cs(e, t) {
  const n = f(t.detached), a = f(() => n.value ? "" : e.search.value), s = f(() => n.value ? t.path() : e.path.value);
  return {
    search: a,
    path: s,
    elsewhere: n,
    push(l, r) {
      n.value ? e.push(l, r ?? t.path()) : e.push(l, r);
    },
    replace(l, r) {
      n.value ? e.push(l, r ?? t.path()) : e.replace(l, r);
    },
    href(l, r) {
      const i = r ?? (n.value ? t.path() : void 0);
      return e.href ? e.href(l, i) : `${i ?? e.path.value}${fe(l)}`;
    }
  };
}
function Xe(e) {
  let t = 2166136261;
  for (let n = 0; n < e.length; n++)
    t ^= e.charCodeAt(n), t = Math.imul(t, 16777619);
  return Math.abs(t);
}
const us = new Intl.NumberFormat("en-US", {
  minimumSignificantDigits: 2,
  maximumSignificantDigits: 2,
  useGrouping: !1
});
function Lt(e) {
  return Number.isFinite(e) ? Math.abs(e) < 100 ? us.format(e) : String(Math.round(e)) : "—";
}
function ds(e) {
  return Number.isFinite(e) ? Number.isInteger(e) || Math.abs(e) >= 100 ? et(e) : Lt(e) : "—";
}
function et(e) {
  if (!Number.isFinite(e)) return "—";
  const t = Math.round(e), n = Math.abs(t);
  return n < 1e3 ? String(t) : n < 9950 ? `${(t / 1e3).toFixed(1)}k` : n < 999500 ? `${Math.round(t / 1e3)}k` : n < 995e4 ? `${(t / 1e6).toFixed(1)}m` : `${Math.round(t / 1e6)}m`;
}
function De(e) {
  return Number.isFinite(e) ? Math.round(e).toLocaleString("en-US") : "—";
}
function fs(e) {
  const t = new Date(e);
  if (Number.isNaN(t.getTime())) return "—";
  const n = String(t.getUTCDate()).padStart(2, "0"), a = String(t.getUTCMonth() + 1).padStart(2, "0");
  return `${n}.${a}.${t.getUTCFullYear()}`;
}
function vs(e) {
  return String(e + 1);
}
function ku(e, t) {
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
function ps(e) {
  if (e == null || !Number.isFinite(e) || e < 0) return "—";
  if (e < 1e3) return `${e} B`;
  const t = ["kB", "MB", "GB", "TB"];
  let n = e, a = -1;
  for (; n >= 1e3 && a < t.length - 1; )
    n /= 1e3, a += 1;
  return `${Lt(n)} ${t[a]}`;
}
function hs(e) {
  if (!e || !Number.isFinite(e)) return "—";
  if (e < 1e3) return `${Math.round(e)}ms`;
  const t = e / 1e3;
  return t < 60 ? `${Lt(t)}s` : `${Math.floor(t / 60)}m ${Math.round(t % 60)}s`;
}
function ms(e) {
  if (e == null || !Number.isFinite(e) || e <= 0)
    return "—";
  const t = Math.floor(e / 60);
  return t ? `${t}:${String(e % 60).padStart(2, "0")}` : `${e}s`;
}
function ys(e) {
  return e == null || !Number.isFinite(e) ? "—" : `${Math.round(e * 100)}%`;
}
function gs(e) {
  return e.replace(/\x1b\[[0-9;?]*[ -/]*[@-~]/g, "");
}
const ke = "—";
function pe(e, t) {
  return e.find((n) => n.role === t);
}
function aa(e, t) {
  return e.filter((n) => n.role === t);
}
function _s(e, t) {
  const n = (t ? t.columns : e?.columns) ?? [], a = t ? "scoped" : "everything";
  return n.filter(
    (s) => s.role !== "tint" && ((s.when ?? "always") === "always" || s.when === a)
  );
}
const ws = ["id", "entityKey", "entityLabel"];
function ue(e, t) {
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
  if (e == null || e === "") return ke;
  if (t === "number") {
    const n = typeof e == "number" ? e : Number(e);
    return Number.isFinite(n) ? ds(n) : String(e);
  }
  return t === "date" ? fs(String(e)) : Array.isArray(e) ? e.length ? e.join(", ") : ke : String(e);
}
function Le(e, t) {
  const n = ue(e, t);
  return e.format ? e.format(n, t) : bs(n, e.kind);
}
function $s(e) {
  return typeof e == "number" ? Number.isFinite(e) ? String(e) : "" : typeof e == "string" ? e : Array.isArray(e) ? e.join(", ") : "";
}
function sa(e, t) {
  const n = Le(e, t), a = $s(ue(e, t));
  return a && a !== n ? a : n;
}
function mt(e, t) {
  return e ? Le(e, t) : "";
}
function Ln(e) {
  return e.align ? e.align : e.kind === "number" || e.kind === "ordinal" ? "right" : "left";
}
const xs = {
  ordinal: "dc-table__num",
  number: "dc-table__number",
  date: "dc-table__date",
  status: "dc-table__state"
};
function Tn(e) {
  return [xs[e.kind ?? "text"], e.class].filter(Boolean).join(" ");
}
function Qt(e) {
  if (e.truncate !== void 0) return e.truncate;
  const t = e.kind ?? "text";
  return t === "text" || t === "number" || t === "date";
}
const Ss = /^([A-Za-z_][\w.-]*)\s*(>=|<=|:|=|>|<)\s*(.*)$/, On = "-?(?:\\d+\\.?\\d*|\\.\\d+)", Cs = new RegExp(`^(${On})?\\.\\.(${On})?$`);
function Tt(e) {
  const t = Cs.exec(e.trim());
  if (!t || t[1] === void 0 && t[2] === void 0) return null;
  const n = t[1] === void 0 ? null : Number(t[1]), a = t[2] === void 0 ? null : Number(t[2]);
  return n !== null && a !== null && n > a ? { min: a, max: n } : { min: n, max: a };
}
function Ps(e) {
  return `${e.min ?? ""}..${e.max ?? ""}`;
}
function We(e) {
  return e.kind === "field" && (e.comparator === ":" || e.comparator === "=") && Tt(e.value) !== null;
}
function Ms(e) {
  const t = [];
  let n = "", a = null;
  const s = () => {
    n && t.push(n), n = "";
  };
  for (let l = 0; l < e.length; l++) {
    const r = e[l];
    if (a) {
      r === a ? a = null : n += r;
      continue;
    }
    if (r === '"' || r === "'") {
      a = r;
      continue;
    }
    if (/\s/.test(r)) {
      if (/(?:>=|<=|[:=><])$/.test(n) || e.slice(l + 1).match(/^\s*(>=|<=|[:=><])/) && n) continue;
      s();
      continue;
    }
    n += r;
  }
  return s(), t;
}
function le(e) {
  const t = e.trim();
  if (!t) return [];
  const n = [];
  let a = [];
  for (const s of Ms(t)) {
    const l = s.toUpperCase();
    if (l === "AND" || l === "&&") continue;
    if (l === "OR" || l === "||") {
      a.length && n.push(a), a = [];
      continue;
    }
    const r = s.length > 1 && s.startsWith("-"), i = r ? s.slice(1) : s, o = r ? { negated: !0 } : {}, c = Ss.exec(i);
    c && c[3] !== "" ? a.push({
      kind: "field",
      field: c[1].toLowerCase(),
      comparator: c[2],
      value: c[3],
      ...o
    }) : a.push({ kind: "text", value: i, ...o });
  }
  return a.length && n.push(a), n;
}
const Me = (e) => e.toLowerCase().replace(/\s+/g, ""), la = [
  ["status", "state"],
  ["state", "state"],
  ["updated", "updated"],
  ["date", "updated"],
  ["name", "identity"],
  ["ref", "reference"]
];
function Es(e, t, n) {
  const a = Me(e), s = n.columns ?? [];
  if (a === "entity") return t.entityKey;
  if (e in t.fields) return t.fields[e];
  const l = s.find(
    (c) => c.key?.toLowerCase() === e.toLowerCase() || c.field?.toLowerCase() === e.toLowerCase() || c.label !== void 0 && Me(c.label) === a
  );
  if (l) return ue(l, t);
  const r = n.facets.find(
    (c) => c.key.toLowerCase() === a || Me(c.label) === a
  );
  if (r && r.key in t.fields) return t.fields[r.key];
  const i = la.find(([c]) => c === a)?.[1];
  if (i) {
    const c = pe(s, i);
    if (c) return ue(c, t);
  }
  const o = /^metric(\d+)$/.exec(a);
  if (o) {
    const c = aa(s, "metric")[Number(o[1]) - 1];
    if (c) return ue(c, t);
  }
}
function ut(e) {
  return (e.toLowerCase().match(/[\p{L}\p{N}]+/gu) ?? []).map((t) => t.charAt(0)).join("");
}
const An = /^[a-z_][\w.-]*$/;
function Ot(e) {
  const t = (e.key ?? e.field)?.toLowerCase();
  if (t !== void 0) return An.test(t) ? t : void 0;
  const n = e.label === void 0 ? void 0 : Me(e.label);
  return n !== void 0 && An.test(n) ? n : void 0;
}
function un(e, t) {
  const n = Me(e);
  return !!t?.entities.some((a) => a.scope && Me(a.scope) === n);
}
function Ls(e, t, n) {
  const a = Me(e);
  if (a === "entity" || la.some(([l]) => l === a) || /^metric\d+$/.test(a) || un(e, n)) return !0;
  const s = (l) => l !== void 0 && Me(l) === a;
  return (t.columns ?? []).some(
    (l) => s(l.key) || s(l.field) || s(l.label)
  ) || t.facets.some((l) => s(l.key) || s(l.label));
}
function tt(e, t, n) {
  return t ? oa(e, (a) => {
    const s = ia(a, t, n);
    return s && Ot(s);
  }) : e;
}
function ra(e, t, n) {
  return t ? oa(e, (a) => {
    if (un(a, n)) return;
    const s = (t.columns ?? []).find((l) => Ot(l) === a);
    return s && ca(s, t, n);
  }) : e;
}
function Ts(e, t, n) {
  if (!t || un(e, n)) return;
  const a = t.facets.find((s) => s.key.toLowerCase() === e);
  return a ? a.label : (t.columns ?? []).find((s) => Ot(s) === e)?.label;
}
function oa(e, t) {
  let n = !1;
  const a = le(e).map(
    (s) => s.map((l) => {
      if (l.kind !== "field") return l;
      const r = t(l.field);
      return !r || r === l.field ? l : (n = !0, { ...l, field: r });
    })
  );
  return n ? he(a) : e;
}
function ia(e, t, n) {
  if (!(!e || Ls(e, t, n)))
    return (t.columns ?? []).find(
      (a) => a.label !== void 0 && ut(a.label) === e
    );
}
function ca(e, t, n) {
  if (!t || e.label === void 0 || !Ot(e)) return;
  const a = ut(e.label);
  return ia(a, t, n) === e ? a : void 0;
}
function Kt(e, t) {
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
    const o = n.columns ?? [];
    return ["identity", "reference"].some((c) => {
      const d = pe(o, c), v = d ? ue(d, t) : void 0;
      return typeof v == "string" && Kt(v, e.value);
    });
  }
  const s = Es(e.field, t, n);
  if (s === void 0) return a?.has(e.field) ? !1 : null;
  const l = We(e) ? Tt(e.value) : null;
  if (l) {
    if (Array.isArray(s) || typeof s == "boolean") return null;
    const o = typeof s == "number" ? s : Number(s);
    return Number.isFinite(o) ? (l.min === null || o >= l.min) && (l.max === null || o <= l.max) : null;
  }
  if (Array.isArray(s))
    return e.comparator === ":" || e.comparator === "=" ? s.some(
      (c) => e.comparator === "=" ? Nn(String(c), e.value) : Kt(String(c), e.value)
    ) : null;
  if (e.comparator === ":" || e.comparator === "=") {
    if (typeof s == "boolean") {
      const o = e.value.toLowerCase();
      return o === "true" || o === "yes" ? s : o === "false" || o === "no" ? !s : null;
    }
    if (typeof s == "number") {
      const o = Number(e.value);
      return Number.isFinite(o) ? s === o : null;
    }
    return e.comparator === "=" ? Nn(String(s), e.value) : Kt(String(s), e.value);
  }
  const r = Number(e.value), i = typeof s == "number" ? s : Number(s);
  return !Number.isFinite(r) || !Number.isFinite(i) ? null : As(e.comparator, i, r);
}
function In(e, t, n, a) {
  const s = Os(e, t, n, a);
  return s === null ? !0 : e.negated ? !s : s;
}
function As(e, t, n) {
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
function Rn(e) {
  return e.kind === "field" && !e.negated && (e.comparator === ":" || e.comparator === "=") && !We(e);
}
const Bn = /* @__PURE__ */ new WeakMap();
function Ns(e) {
  if (!e?.strictScopes) return null;
  let t = Bn.get(e);
  return t || (t = new Set(
    e.entities.flatMap((n) => n.scope ? [n.scope.toLowerCase()] : [])
  ), Bn.set(e, t)), t;
}
function Is(e, t, n, a) {
  if (!e.length) return !0;
  const s = Ns(a);
  return e.some((l) => {
    const r = /* @__PURE__ */ new Map();
    for (const i of l)
      Rn(i) && r.set(
        i.field,
        (r.get(i.field) ?? !1) || In(i, t, n, s)
      );
    return l.every(
      (i) => Rn(i) ? r.get(i.field) === !0 : In(i, t, n, s)
    );
  });
}
function Hn(e) {
  return /[\s"']/.test(e) ? `"${e.replace(/["']/g, "")}"` : e;
}
function _e(e) {
  const t = e.negated ? "-" : "";
  return e.kind === "text" ? t + Hn(e.value) : `${t}${e.field}${e.comparator}${Hn(e.value)}`;
}
function Rs(e) {
  if (!e.negated) return { ...e, negated: !0 };
  const { negated: t, ...n } = e;
  return n;
}
function he(e) {
  return e.filter((t) => t.length).map((t) => t.map(_e).join(" ")).join(" OR ");
}
function Bs(e, t, n) {
  return e.map((a, s) => s === t ? a.filter((l, r) => r !== n) : a).filter((a) => a.length);
}
function bu(e) {
  const t = le(e);
  if (t.length > 1) return { parts: [], text: e.trim() };
  const n = t[0] ?? [];
  return {
    parts: n.filter((a) => a.kind === "field"),
    text: n.filter((a) => a.kind === "text").map(_e).join(" ")
  };
}
function $u(e, t) {
  return [...e.map(_e), t.trim()].filter(Boolean).join(" ");
}
const Fn = (e, t) => e.toLowerCase() === t.toLowerCase();
function nt(e, t) {
  return !!e.negated == !!t.negated && ua(e, t);
}
function Hs(e, t) {
  return !!e.negated != !!t.negated && ua(e, t);
}
function ua(e, t) {
  return e.kind === "field" ? t.kind === "field" && e.field === t.field && e.comparator === t.comparator && Fn(e.value, t.value) : t.kind === "text" && Fn(e.value, t.value);
}
function Fs(e, t) {
  return t.filter((n) => !e.some((a) => nt(a, n)));
}
function dn(e, t) {
  return da(e, t, (n) => n);
}
function at(e, t) {
  return da(
    e,
    t,
    (n, a) => n.filter((s) => !a.some((l) => Hs(s, l)))
  );
}
const qs = /^[A-Za-z_][\w.-]*\s*(?:>=|<=|:|=|>|<)$/;
function Vs(e) {
  return he(
    le(e).map(
      (t) => t.filter(
        (n) => n.kind !== "text" || n.value !== "-" && !qs.test(n.value)
      )
    ).filter((t) => t.length > 0)
  );
}
function da(e, t, n) {
  const a = le(e), s = le(t);
  return a.length ? s.length ? he(
    a.flatMap(
      (l) => s.map((r) => [...n(l, r), ...Fs(l, r)])
    )
  ) : he(a) : he(s);
}
const fa = "cards", Ds = "table";
function Ks(e, t = null) {
  if (e.trim() === "") return !1;
  if (!t) return !0;
  const n = new Set(
    t.entities.flatMap((a) => a.scope ? [a.scope.toLowerCase()] : [])
  );
  return !le(e).flat().some((a) => a.kind === "field" && !a.negated && n.has(a.field.toLowerCase()) && a.value !== "");
}
function Re(e, t = {}, n = "", a = null) {
  const s = (r) => r && va(r) ? r : void 0;
  if (e === null)
    return (Ks(n, a) ? s(t.searchView) : void 0) ?? s(t.view) ?? fa;
  const l = t.landing === "entity" ? s(t.view) : void 0;
  return s(t.entityView) ?? l ?? Ds;
}
function Ws(e, t, n, a = {}, s = "", l = s, r = null) {
  return a.viewAcrossTypes !== "default" && e !== Re(t, a, s, r) ? e : Re(n, a, l, r);
}
function zs(e, t, n = {}, a = null) {
  if (e.entity !== t.entity)
    return Ws(e.view, e.entity, t.entity, n, e.expr, t.expr, a);
  const s = Re(e.entity, n, e.expr, a);
  return e.view === s ? Re(t.entity, n, t.expr, a) : e.view;
}
const Gt = "updated";
function va(e) {
  return typeof e == "string" && (e === "record" || cn.includes(e));
}
const qn = {
  list: "List",
  cards: "Cards",
  grid: "Grid",
  images: "Images",
  table: "Table",
  links: "Links",
  preview: "Preview",
  record: "Record"
}, js = {
  list: "M6 4h7.5M6 8h7.5M6 12h7.5M2.5 4h.01M2.5 8h.01M2.5 12h.01",
  cards: "M2.5 2.5h11v4.5h-11zM2.5 9h11v4.5h-11z",
  grid: "M2.5 2.5h4.5v4.5h-4.5zM9 2.5h4.5v4.5H9zM2.5 9h4.5v4.5h-4.5zM9 9h4.5v4.5H9z",
  images: "M2.5 3h11v10h-11zM2.5 11l3.5-3.5 2.5 2.5 2-2 3 3M10.5 5.75h.01",
  table: "M2.5 3h11v10h-11zM2.5 6.5h11M2.5 9.75h11M6.5 6.5V13",
  links: "M6.75 9.25a2.5 2.5 0 0 0 3.54 0l2.12-2.12a2.5 2.5 0 0 0-3.54-3.54l-.7.7M9.25 6.75a2.5 2.5 0 0 0-3.54 0L3.59 8.87a2.5 2.5 0 0 0 3.54 3.54l.7-.7",
  preview: "M1.5 8S4 3.5 8 3.5 14.5 8 14.5 8 12 12.5 8 12.5 1.5 8 1.5 8zM6 8a2 2 0 1 0 4 0 2 2 0 1 0-4 0",
  record: "M4 2h5.5L12 4.5V14H4zM9.5 2v2.5H12M6 8h4M6 10.5h4"
};
function Ie(e, t) {
  if (e === "record" && !t?.includes(e)) return t?.[0] ?? fa;
  const [n] = t ?? [];
  return n === void 0 || t?.includes(e) ? e : n;
}
function Yt(e) {
  return typeof e.count == "number" ? et(e.count) : e.count;
}
function st(e, t) {
  return t ? e.entities.find((n) => n.key === t) ?? null : null;
}
function pa(e, t = {}) {
  const n = st(e, t.entity), a = e.entities[0];
  if (!n && !a) throw new Error(`Schema "${e.key}" declares no entities`);
  return n ?? a;
}
function ha(e, t = null) {
  return e?.columns ?? t?.columns ?? [];
}
function At(e, t = null) {
  if (e?.sorts?.length) return e.sorts;
  const n = /* @__PURE__ */ new Set(), a = [];
  for (const s of ha(e, t))
    !s.sort || n.has(s.sort) || (n.add(s.sort), a.push({ key: s.sort, label: (s.label ?? s.sort).toLowerCase() }));
  return a;
}
const Us = { key: Gt, label: Gt };
function Ee(e, t, n = null) {
  const a = At(e, n);
  return (t ? a.find((l) => l.key === t) : void 0) ?? a.find((l) => l.key === Gt) ?? a[0] ?? Us;
}
function Qs(e) {
  switch (e.kind) {
    case "chips":
      return { kind: "chips", selected: [] };
    case "range":
      return { kind: "range", min: null, max: null };
    case "toggle":
      return { kind: "toggle", on: !1 };
  }
}
function Gs(e) {
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
function fn(e) {
  return e.entity === null && e.expr.trim() === "";
}
function xu(e) {
  return e.entity !== null;
}
function ma(e, t) {
  return e.entity === null && Ie(e.view, t) === "cards";
}
function Ys(e, t) {
  return t <= 0 ? 1 : Math.max(1, Math.ceil(e / t));
}
function yt(e, t = {}) {
  const a = t.landing === "entity" ? pa(e, t) : null;
  return {
    entity: a?.key ?? null,
    view: Re(a?.key ?? null, t),
    sort: Ee(a, t.sort).key,
    dir: t.dir === "asc" ? "asc" : "desc",
    expr: "",
    page: 1
  };
}
const vn = ["entity", "sort", "dir", "expr"];
function Xs(e) {
  return vn.some((t) => t in e);
}
const ya = (e) => e.kind === "date" || e.role === "updated";
function Js(e) {
  if (!e) return () => 0;
  const n = (e.kind ?? "text") === "number" || e.role === "metric", a = ya(e);
  return (s, l) => {
    const r = ue(e, s), i = ue(e, l);
    return n ? Number(i ?? 0) - Number(r ?? 0) : a ? Date.parse(String(i ?? "")) - Date.parse(String(r ?? "")) : String(i ?? "").localeCompare(String(r ?? ""));
  };
}
function Vn(e, t) {
  return !t || !ya(t) ? !1 : !Number.isFinite(Date.parse(String(ue(t, e) ?? "")));
}
function ga({ query: e, schema: t, entity: n, limit: a, offset: s }, l, r) {
  const i = le(e.expr), o = n ? [n] : t.entities;
  let c = 0;
  const d = [];
  for (const b of o)
    for (const S of l(b))
      c += 1, Is(i, S, b, t) && d.push(S);
  const v = Ee(n, e.sort, t), _ = ha(n, t).find((b) => b.sort === v.key), p = r.undatedLast ? d.filter((b) => !Vn(b, _)) : d, g = r.undatedLast ? d.filter((b) => Vn(b, _)) : [];
  p.sort(Js(_)), e.dir === "asc" && p.reverse();
  const m = g.length ? [...p, ...g] : p;
  return {
    // One page out of the middle. `total` stays the whole match, which is what
    // the shell counts pages with.
    rows: r.zeroIsAll && a <= 0 ? m.slice(s) : m.slice(s, s + a),
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
function Su(e) {
  return gt[Xe(e) % gt.length];
}
function _a(e, t) {
  return `${e}_${1e4 + t * 7}`;
}
const Zs = 7, el = 3;
function tl(e, t, n, a) {
  const s = (t * Zs + Xe(n)) % a, l = [];
  for (let r = 0; r < Math.min(el, a); r++)
    l.push(_a(e, (s + r) % a));
  return l;
}
function nl(e, t) {
  switch (e.kind) {
    case "chips":
      return e.multiple ? al(e.options, t) : e.options[t % e.options.length] ?? "";
    case "range": {
      const n = Math.max(0, e.max - e.min);
      return e.min + (n === 0 ? 0 : t % (n + 1));
    }
    case "toggle":
      return t % 3 === 0;
  }
}
function al(e, t) {
  if (!e.length) return [];
  const n = 1 + (t >> 5) % Math.min(3, e.length), a = t % e.length, s = /* @__PURE__ */ new Set();
  for (let l = 0; l < n; l++) s.add((a + l) % e.length);
  return [...s].sort((l, r) => l - r).map((l) => e[l]);
}
function sl(e, t) {
  const { hash: n, sample: a, revision: s, updatedAt: l } = t, r = s ? ` · rev ${s + 1}` : "";
  switch (e.role) {
    case "identity":
      return `${a[0]}${r}`;
    case "reference":
      return s ? `${a[1]}-${s + 1}` : a[1];
    case "state":
      return Ye[n % Ye.length];
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
      return Ye[n % Ye.length];
    case "date":
      return l;
    default:
      return;
  }
}
function ll(e, t = {}) {
  const n = t.population ?? 48, a = t.seed ?? "", s = t.now ?? /* @__PURE__ */ new Date("2026-08-25T00:00:00Z"), l = e.samples, r = t.scopes ?? [];
  if (!l.length) return [];
  const i = [];
  for (let o = 0; o < n; o++) {
    const c = l[o % l.length], d = Math.floor(o / l.length), v = Xe(`${a}:${e.key}:${c[0]}:${o}`), _ = _a(e.key, o), p = new Date(s.getTime() - v % 900 * 36e5).toISOString(), g = {};
    for (const m of e.columns ?? []) {
      const b = m.field ?? m.key;
      if (!b || m.value) continue;
      const S = sl(m, {
        hash: Xe(`${v}:${b}`),
        sample: c,
        revision: d,
        updatedAt: p
      });
      S !== void 0 && (g[b] = S);
    }
    for (const m of e.facets)
      g[m.key] = nl(m, Xe(`${v}:${m.key}`));
    for (const [m, b] of r)
      g[m] = b === e.key ? _ : tl(b, o, m, n);
    i.push({ id: _, entityKey: e.key, entityLabel: e.label, fields: g });
  }
  return i;
}
function rl(e = {}) {
  const t = /* @__PURE__ */ new Map(), n = (a, s) => {
    const l = t.get(a.key);
    if (l) return l;
    const r = e.scopes ?? s.entities.flatMap(
      (o) => o.scope ? [[o.scope, o.key]] : []
    ), i = ll(a, { ...e, scopes: r });
    return t.set(a.key, i), i;
  };
  return {
    query(a) {
      return ga(a, (s) => n(s, a.schema), {
        undatedLast: !1,
        zeroIsAll: !1
      });
    }
  };
}
const Ue = "e", Nt = "v", pn = "s", hn = "d", Be = "q", It = "p", wa = "*", ol = [
  Ue,
  Nt,
  pn,
  hn,
  Be,
  It
], il = [
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
  for (const [n, a] of il) t = t.replace(n, a);
  return t;
}
function ge(e) {
  try {
    return decodeURIComponent(e.replace(/\+/g, " "));
  } catch {
    return e.replace(/\+/g, " ");
  }
}
function mn(e) {
  const t = e.replace(/^[?]/, "");
  if (!t) return [];
  const n = [];
  for (const a of t.split("&")) {
    if (!a) continue;
    const s = a.indexOf("="), l = s === -1 ? a : a.slice(0, s), r = s === -1 ? "" : a.slice(s + 1);
    n.push([ge(l), r]);
  }
  return n;
}
function cl(e) {
  return ol.includes(e);
}
function Rt(e, t) {
  if (!(!t || e.some((n) => n.key === t)))
    return e.find((n) => ut(n.label) === t);
}
function ul(e, t) {
  const n = ut(e.label);
  return Rt(t.entities, n)?.key === e.key ? n : e.key;
}
function ka(e, t) {
  return t ? st(e, t) ?? Rt(e.entities, t) ?? null : null;
}
function dl(e, t) {
  const n = ut(e.label);
  return Rt(t, n)?.key === e.key ? n : e.key;
}
function fl(e, t) {
  return t.some((n) => n.key === e) ? e : Rt(t, e)?.key ?? e;
}
function vl(e, t, n = {}) {
  const a = yt(t, n), s = new Map(mn(e)), l = s.get(Ue), r = l === void 0 ? a.entity : ge(l), i = r === wa ? null : ka(t, r), o = s.get(Be), c = o === void 0 ? "" : tt(ge(o), i, t), d = s.get(Nt), v = d && va(ge(d)) ? ge(d) : Re(i?.key ?? null, n, c, t), _ = s.get(pn), p = Ee(
    i,
    _ ? fl(ge(_), At(i, t)) : n.sort,
    t
  ), g = s.get(hn), m = g ? ge(g) === "asc" ? "asc" : "desc" : a.dir, b = s.get(It), S = b === void 0 ? 1 : Number(ge(b)), N = Number.isFinite(S) ? Math.max(1, Math.floor(S)) : 1;
  return {
    entity: i?.key ?? null,
    view: v,
    sort: p.key,
    dir: m,
    expr: c,
    page: N
  };
}
function Dn(e, t, n = {}, a = "") {
  const s = yt(t, n), l = st(t, e.entity), r = mn(a).filter(([v]) => !cl(v)), i = [], o = (v, _) => i.push([v, _t(_)]), c = l?.key ?? null;
  if (c !== s.entity && o(Ue, l ? ul(l, t) : wa), e.view !== Re(c, n, e.expr, t) && o(Nt, e.view), e.sort !== s.sort) {
    const v = At(l, t), _ = v.find((p) => p.key === e.sort);
    o(pn, _ ? dl(_, v) : e.sort);
  }
  e.dir !== s.dir && o(hn, e.dir), e.expr.trim() !== "" && o(Be, ra(e.expr, l, t)), e.page > 1 && o(It, String(e.page));
  const d = [
    ...r.map(([v, _]) => [_t(v), _]),
    ...i
  ];
  return d.length ? `?${d.map(([v, _]) => _ === "" ? v : `${v}=${_}`).join("&")}` : "";
}
function Cu(e) {
  const t = [];
  for (const [n, a] of Object.entries(e))
    for (const s of Array.isArray(a) ? a : [a]) {
      if (typeof s != "string") continue;
      const l = _t(n);
      t.push(s === "" ? l : `${l}=${_t(s)}`);
    }
  return t.length ? `?${t.join("&")}` : "";
}
function Pu(e, t) {
  const n = new Map(mn(e)), a = n.get(Be), s = a === void 0 ? "" : ge(a);
  if (!t) return s;
  const l = n.get(Ue);
  return tt(
    s,
    l === void 0 ? null : ka(t, ge(l)),
    t
  );
}
function Bt(e, t) {
  return $a(e, t.id);
}
function ba(e, t) {
  return e?.standing === !1 ? null : Bt(e, t);
}
function $a(e, t) {
  const n = e?.scope;
  return n ? xa(n, t) : null;
}
function xa(e, t) {
  return `${e}="${t.replace(/"/g, "")}"`;
}
function Mu(e, t) {
  const n = typeof e == "string" ? e : e?.scope;
  if (!n) return null;
  const a = t.filter((s) => s.replace(/"/g, "") !== "").map((s) => xa(n, s));
  return a.length ? a.join(" ") : null;
}
function Ht(e, t) {
  if (e.kind !== "field" || t.kind !== "field") return nt(e, t);
  const n = (a) => a.comparator === ":" || a.comparator === "=";
  return nt(e, { ...t, comparator: n(e) && n(t) ? e.comparator : t.comparator });
}
function wt(e, t) {
  return Ht(e, Rs(t));
}
function kt(e, t) {
  return Bt(
    e.entities.find((n) => n.key === t.entityKey),
    t
  );
}
function ze(e, t) {
  if (!t) return e;
  const n = e.trim();
  if (!n) return t;
  const [a] = le(t).flat();
  if (!a) return n;
  const s = le(n);
  return s.some((i) => i.some((o) => Ht(o, a))) ? n : s.some((i) => i.some((o) => wt(o, a))) ? he(
    s.map(
      (i) => i.map((o) => wt(o, a) ? a : o)
    )
  ) : `${n} ${t}`;
}
function Sa(e) {
  if (!e) return null;
  const t = e.trim();
  return t ? t.startsWith("-") ? t.slice(1) : `-${t}` : null;
}
function yn(e, t) {
  if (!t || !e.trim()) return null;
  const [n] = le(t).flat();
  if (!n) return null;
  const a = le(e).flat();
  return a.some((s) => Ht(s, n)) ? n.negated ? "out" : "in" : a.some((s) => wt(s, n)) ? n.negated ? "in" : "out" : null;
}
function Ca(e, t) {
  if (!t || !e.trim()) return e;
  const [n] = le(t).flat();
  if (!n) return e;
  const a = le(e), s = a.map(
    (l) => l.filter((r) => !Ht(r, n) && !wt(r, n))
  );
  return s.every((l, r) => l.length === a[r]?.length) ? e : he(s);
}
function Xt(e, t, n) {
  return t ? n === null ? Ca(e, t) : ze(e, n === "out" ? Sa(t) : t) : e;
}
function Jt(e, t) {
  const n = t.shiftKey ? `noopener,popup,width=${window.outerWidth},height=${window.outerHeight}` : "noopener";
  window.open(e, "_blank", n);
}
function Pa() {
  const e = window.getSelection?.();
  return !!e && !e.isCollapsed;
}
function Zt(e) {
  return e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0;
}
function lt(e) {
  return e.altKey ? { exclude: !0 } : {};
}
function Wt(e, t, n, a = {}, s) {
  const l = kt(e, n);
  if (a.exclude) return Kn(ze(t.expr, Sa(l)), s);
  const r = l !== null && e.entities.find((i) => i.key === n.entityKey)?.narrowsAlone === !0;
  return Kn(ze(r ? "" : t.expr, l), s);
}
function Kn(e, t) {
  const n = t?.trim() ? le(t).flat() : [];
  if (!n.length) return e;
  const a = new Set(n.flatMap((i) => i.kind === "field" ? [i.field] : [])), s = (i) => i.kind === "field" && !i.negated && (i.comparator === ":" || i.comparator === "=") && a.has(i.field), l = e.trim(), r = l ? le(l) : [[]];
  if (r.length === 1 && !r[0].some(s)) {
    const i = n.filter((o) => !r[0].some((c) => nt(c, o)));
    return [l, ...i.map(_e)].filter(Boolean).join(" ");
  }
  return he(
    r.map((i) => {
      const o = i.filter((c) => !s(c));
      return [...o, ...n.filter((c) => !o.some((d) => nt(d, c)))];
    })
  );
}
function Ma(e, t) {
  const n = e?.scope?.toLowerCase();
  if (!n || e?.keepsScope || !t.trim()) return t;
  const a = le(t), s = a.map(
    (l) => l.filter((r) => r.kind !== "field" || r.field !== n)
  );
  return s.every((l, r) => l.length === a[r]?.length) ? t : he(s);
}
function Ea(e, t) {
  const n = t.toLowerCase();
  return e.entities.find((a) => a.scope?.toLowerCase() === n) ?? null;
}
function La(e, t, n) {
  if (!t || !n) return null;
  const a = Ea(e, t);
  return a ? { entity: a, id: n } : null;
}
function pl(e, t) {
  const n = [], a = /* @__PURE__ */ new Set();
  for (const s of t)
    for (const l of le(s).flat()) {
      if (l.kind !== "field" || l.negated) continue;
      const r = La(e, l.field, l.value);
      if (!r) continue;
      const i = `${r.entity.key}:${r.id.toLowerCase()}`;
      a.has(i) || (a.add(i), n.push({ entityKey: r.entity.key, id: r.id }));
    }
  return n;
}
function Eu(e, t, n = "cards") {
  return {
    // An expression with nothing in it is no parameter, as the shell writes it.
    [Be]: ze(e, t) || void 0,
    [Ue]: void 0,
    [Nt]: n,
    [It]: void 0
  };
}
const Ta = Symbol("dc.shellContext");
function hl(e) {
  const t = e.liveQuery ? e : ml(e);
  return rn(Ta, t), t;
}
function ml(e) {
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
function ee() {
  const e = ln(Ta, null);
  if (!e)
    throw new Error(
      "[appfr] No shell context found. Render this component inside <DataShell>."
    );
  return e;
}
const bt = Symbol("dc-shell-theme");
function en(e) {
  return {
    read: () => ({
      theme: Oe(e.theme),
      accent: Oe(e.accent),
      tokens: Oe(e.tokens)
    })
  };
}
function yl(e, t) {
  t ? t.provide(bt, en(e)) : rn(bt, en(e));
}
function gl(e) {
  const t = ea();
  rn(bt, {
    ...en(e),
    element: () => t?.proxy?.$el ?? null
  });
}
function gn(e) {
  const t = ea(), n = ln(bt, null), a = me(null);
  function s() {
    const o = t?.proxy?.$el, d = (o instanceof Element ? o : o?.parentElement)?.closest(".dc-shell");
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
    const o = a.value;
    if (!n) return o;
    const c = n.element?.();
    return o && c && o.shell !== c && c.contains(o.shell) ? o : n.read();
  }), r = f(() => e.theme ?? l.value?.theme ?? "minimal"), i = f(() => {
    const o = l.value, c = {
      ...o?.tokens,
      ...o?.accent ? { "--dc-accent": o.accent } : {},
      ...e.tokens,
      ...e.accent ? { "--dc-accent": e.accent } : {}
    };
    return Object.keys(c).length ? c : void 0;
  });
  return { theme: r, style: i, adopt: s };
}
function rt(e) {
  return e.key.toLowerCase();
}
const _l = /* @__PURE__ */ new Set([">", ">=", "<", "<="]);
function Oa(e, t) {
  if (e.kind !== "field" || e.negated || e.field !== rt(t)) return !1;
  const n = e.comparator === ":" || e.comparator === "=";
  switch (t.kind) {
    case "range":
      return We(e) || _l.has(e.comparator);
    case "chips":
      return n && !We(e) && Aa(t.options, e.value) !== void 0;
    case "toggle":
      return n && wl(e.value);
  }
}
function Aa(e, t) {
  const n = t.toLowerCase();
  return e.find((a) => a.toLowerCase() === n);
}
function wl(e) {
  const t = e.toLowerCase();
  return t === "true" || t === "yes";
}
function Na(e, t) {
  const n = (le(e)[0] ?? []).filter((a) => Oa(a, t));
  switch (t.kind) {
    case "range": {
      let a = null, s = null;
      for (const l of n) {
        const r = Tt(l.value), i = Number(l.value);
        r ? (r.min !== null && (a = r.min), r.max !== null && (s = r.max)) : Number.isFinite(i) && (l.comparator.startsWith(">") ? a = i : s = i);
      }
      return { kind: "range", min: a, max: s };
    }
    case "chips": {
      const a = new Set(n.map((s) => Aa(t.options, s.value)));
      return { kind: "chips", selected: t.options.filter((s) => a.has(s)) };
    }
    case "toggle":
      return { kind: "toggle", on: n.length > 0 };
  }
}
function kl(e, t) {
  const n = rt(e);
  switch (t.kind) {
    case "range":
      return t.min === null && t.max === null ? [] : [{ kind: "field", field: n, comparator: ":", value: Ps(t) }];
    case "chips":
      return t.selected.map((a) => ({ kind: "field", field: n, comparator: "=", value: a }));
    case "toggle":
      return t.on ? [{ kind: "field", field: n, comparator: ":", value: "true" }] : [];
  }
}
function Ia(e, t, n) {
  const a = kl(t, n), s = le(e), l = (s.length ? s : [[]]).map((r) => [
    ...r.filter((i) => !Oa(i, t)),
    ...a
  ]);
  return he(l);
}
function Lu(e, t) {
  return Ia(e, t, Qs(t));
}
function bl(e, t) {
  return (t?.facets ?? []).some((n) => Gs(Na(e, n)));
}
const $t = "entity", ot = "expr", $l = { ">=": "≥", "<=": "≤", ">": ">", "<": "<" };
function Qe(e) {
  const t = Number(e);
  return Number.isFinite(t) && !Number.isInteger(t) ? Lt(t) : String(e);
}
function xl(e, t, n) {
  if (e.kind !== "field") return _e(e);
  const a = Ts(e.field, t, n);
  if (a === void 0) return _e(e);
  const s = e.negated ? "-" : "", l = We(e) ? Tt(e.value) : null;
  if (l) {
    const i = l.min !== null && l.max !== null ? `${Qe(l.min)} ≤ ${a} ≤ ${Qe(l.max)}` : l.max !== null ? `${a} ≤ ${Qe(l.max)}` : `${a} ≥ ${Qe(l.min)}`;
    return s + i;
  }
  const r = $l[e.comparator];
  return r ? `${s}${a} ${r} ${Qe(e.value)}` : _e({ ...e, field: a });
}
function xt(e, t, n = null) {
  const a = [];
  return t && a.push({
    id: $t,
    label: `entity:${t.key}`,
    facetKey: $t
  }), le(e.expr).forEach((s, l) => {
    s.forEach((r, i) => {
      a.push({
        id: `${ot}:${l}:${i}`,
        label: xl(r, t, n),
        address: ra(_e(r), t, n),
        facetKey: ot,
        group: l,
        index: i,
        ...r.kind === "field" ? { field: r.field, value: r.value } : {},
        ...r.negated ? { negated: !0 } : {}
      });
    });
  }), a;
}
function Sl(e, t, n = null) {
  if (fn(e)) {
    const l = Ee(t, e.sort, n);
    return `everything · ${e.view} · ${l.label}`;
  }
  const a = xt(e, t).filter((l) => l.facetKey !== ot).map((l) => l.label), s = e.expr.trim();
  return s && a.push(`"${s}"`), a.join(" · ");
}
function Cl(e) {
  const { adapter: t } = e, n = f(() => Oe(e.schema)), a = f(() => Oe(e.defaults) ?? {}), s = f(() => vl(t.search.value, n.value, a.value)), l = f(() => st(n.value, s.value.entity)), r = f(() => l.value ?? pa(n.value, a.value)), i = f(() => At(l.value, n.value)), o = f(() => Ee(l.value, s.value.sort, n.value)), c = (h, w) => {
    const P = Dn(h, n.value, a.value, t.search.value);
    return P === t.search.value && !t.elsewhere?.value ? !1 : (w === "push" ? t.push(P) : t.replace(P), !0);
  }, d = () => Oe(e.navigationMode) ?? "push", v = () => Oe(e.facetNavigationMode) ?? "replace", _ = (h, w) => c(p(h), w), p = (h) => {
    const w = h.page ?? (Xs(h) ? 1 : s.value.page), P = { ...s.value, ...h, page: w };
    return h.view === void 0 && (P.view = zs(s.value, P, a.value, n.value)), P;
  }, g = (h) => m(p(h)), m = (h) => {
    const w = Dn(h, n.value, a.value, t.search.value);
    return t.href ? t.href(w) : `${t.path.value}${w}`;
  }, b = (h, w) => {
    const P = l.value?.facets.find((ne) => ne.key === h);
    if (!P) return;
    const q = Ia(s.value.expr, P, w(Na(s.value.expr, P)));
    _({ expr: q }, v());
  }, S = (h) => {
    const w = h === null ? null : st(n.value, h);
    return (w?.key ?? null) === s.value.entity ? {} : {
      entity: w?.key ?? null,
      sort: Ee(w, s.value.sort, n.value).key
    };
  }, N = (h) => {
    const w = S(h);
    Object.keys(w).length && _(w, d());
  };
  return {
    query: s,
    entity: l,
    focus: r,
    sort: o,
    sorts: i,
    summary: f(() => Sl(s.value, l.value, n.value)),
    terms: f(() => xt(s.value, l.value, n.value)),
    isPristine: f(() => fn(s.value)),
    isEverything: f(() => s.value.entity === null),
    hasFacets: f(() => bl(s.value.expr, l.value)),
    setEntity: N,
    entityHref: (h) => g(S(h)),
    clearEntity: () => N(null),
    setView(h, w) {
      _(w === void 0 ? { view: h } : { view: h, page: Math.max(1, Math.floor(w)) }, d());
    },
    setSort(h) {
      _({ sort: Ee(l.value, h, n.value).key }, d());
    },
    toggleDirection() {
      _({ dir: s.value.dir === "desc" ? "asc" : "desc" }, d());
    },
    setExpression(h) {
      return _({ expr: h }, d());
    },
    narrow(h, w, P) {
      return _({ expr: h, ...S(w), ...P ? { view: P } : {} }, d());
    },
    narrowHref(h, w, P) {
      return g({ expr: h, ...S(w), ...P ? { view: P } : {} });
    },
    setPage(h, w) {
      _({ page: Math.max(1, Math.floor(h)) }, w ?? d());
    },
    setFacet(h, w) {
      b(h, () => w);
    },
    toggleChip(h, w) {
      b(h, (P) => P.kind !== "chips" ? P : { kind: "chips", selected: P.selected.includes(w) ? P.selected.filter((ne) => ne !== w) : [...P.selected, w] });
    },
    setRange(h, w, P) {
      b(h, (q) => q.kind === "range" ? { kind: "range", min: w, max: P } : q);
    },
    toggleFlag(h) {
      b(
        h,
        (w) => w.kind === "toggle" ? { kind: "toggle", on: !w.on } : w
      );
    },
    removeTerm(h) {
      if (h.facetKey === $t) {
        N(null);
        return;
      }
      if (h.facetKey === ot) {
        const w = Bs(le(s.value.expr), h.group ?? 0, h.index ?? 0);
        _({ expr: he(w) }, d());
      }
    },
    clearFilters() {
      _({ ...S(null), expr: "" }, d());
    },
    clearHref: () => g({ ...S(null), expr: "" }),
    reset() {
      c(yt(n.value, a.value), d());
    },
    homeHref: () => m(yt(n.value, a.value)),
    // The same rule the mutations follow, so a link built for a change goes
    // exactly where clicking through to that change would have gone.
    hrefFor: (h) => g(h)
  };
}
const Wn = 50;
function Pl(e) {
  const t = me([]), n = H(0), a = H(0), s = H(!1), l = H(!1), r = me(null);
  let i = 0, o = null, c = null;
  const d = f(() => (e.query.value.page - 1) * e.limit.value), v = f(() => Ys(n.value, e.limit.value)), _ = f(() => Math.max(0, n.value - a.value)), p = () => {
    const I = e.query.value, B = e.within?.value.trim(), F = Ma(e.entity.value, I.expr);
    return B ? { ...I, expr: dn(B, F) } : F === I.expr ? I : { ...I, expr: F };
  }, g = (I, B) => {
    t.value = I.rows, n.value = I.total, a.value = I.kept ?? 0, r.value = null, m(B);
  }, m = (I) => {
    o = { key: I, total: n.value }, l.value = !1;
  }, b = (I) => {
    r.value = I, t.value = [], n.value = 0, a.value = 0, o = null, l.value = !1;
  }, S = (I, B, F, ce) => {
    let ie = !0;
    const re = () => I === i;
    let E = 0, U = !1;
    const T = (ae) => {
      E = ae, U = !0, ce === void 0 && (n.value = ae);
    }, J = () => {
      ie && (ie = !1, t.value = [], a.value = 0, T(0)), r.value = null;
    };
    return {
      get open() {
        return re();
      },
      insert(ae, ye) {
        if (!re()) return;
        const ve = Array.isArray(ae) ? ae : [ae];
        if (!ve.length) return;
        J();
        const xe = [...t.value];
        xe.splice(ye ?? xe.length, 0, ...ve), t.value = B > 0 ? xe.slice(0, B) : xe, T(E + ve.length);
      },
      set(ae) {
        re() && (ae.rows && (J(), t.value = B > 0 ? ae.rows.slice(0, B) : ae.rows, T(ae.rows.length)), ae.total !== void 0 && T(ae.total));
      },
      close() {
        re() && (s.value = !1, U && (n.value = E), m(F));
      },
      fail(ae) {
        re() && (b(ae), s.value = !1);
      }
    };
  }, N = () => {
    const I = c;
    c = null, I?.();
  }, h = () => {
    const I = ++i;
    N();
    const B = w.value, F = o?.key === B ? o.total : void 0;
    l.value = F === void 0;
    const ce = {
      query: p(),
      schema: e.schema.value,
      entity: e.entity.value,
      limit: e.limit.value,
      offset: d.value
    }, ie = e.source.value;
    if (ie.stream) {
      s.value = !0;
      try {
        c = ie.stream(ce, S(I, ce.limit, B, F)) ?? null;
      } catch (E) {
        b(E), s.value = !1;
      }
      return;
    }
    let re;
    try {
      re = ie.query(ce);
    } catch (E) {
      b(E);
      return;
    }
    if (!(re instanceof Promise)) {
      g(re, B), s.value = !1;
      return;
    }
    s.value = !0, re.then((E) => {
      I === i && g(E, B);
    }).catch((E) => {
      I === i && b(E);
    }).finally(() => {
      I === i && (s.value = !1);
    });
  }, w = f(() => {
    const I = p();
    return `${e.entity.value?.key ?? e.schema.value.entities[0]?.key ?? ""}|${JSON.stringify(vn.map((F) => I[F]))}`;
  }), P = f(() => `${w.value}|${e.query.value.page}`);
  return te([e.source, P, e.limit], h, {
    immediate: !0
  }), Ct(() => {
    i++, N();
  }, !0), { rows: t, total: n, matched: _, offset: d, pageCount: v, pending: s, counting: l, error: r, refresh: h, locate: async (I, B) => {
    const F = Math.max(0, B - 1 - Wn);
    try {
      const { rows: ce } = await e.source.value.query({
        query: p(),
        schema: e.schema.value,
        entity: e.entity.value,
        limit: Wn * 2 + 1,
        offset: F
      }), ie = ce.findIndex((re) => re.id === I);
      return ie === -1 ? null : F + ie + 1;
    } catch {
      return null;
    }
  }, peek: async (I, B) => {
    if (B <= 0) return [];
    try {
      const { rows: F } = await e.source.value.query({
        query: p(),
        schema: e.schema.value,
        entity: e.entity.value,
        limit: B,
        offset: Math.max(0, I)
      });
      return F;
    } catch {
      return [];
    }
  } };
}
function Ml(e) {
  const t = me(null);
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
    const o = e.rows.value[0];
    if (o?.id === i.id) {
      i.gone && (t.value = { ...i, gone: !1, next: void 0 });
      return;
    }
    (!i.gone || o?.id !== i.next) && l(i);
  }, l = async (i) => {
    const o = ++n, c = await e.locate(i.id, i.page), d = c === null && i.next ? await e.locate(i.next, i.page) : null;
    if (o !== n || t.value?.id !== i.id || t.value.page !== i.page) return;
    const v = e.rows.value[0]?.id;
    c !== null ? r(c, !1) : d === null ? t.value = { ...i, gone: !0, next: v } : d !== i.page && r(d);
  }, r = (i, o = t.value?.gone ?? !1) => {
    t.value && (t.value = { ...t.value, page: i, gone: o }, e.moveTo(i));
  };
  return te([e.active, e.rows, e.pending, e.page, e.list], s, {
    immediate: !0,
    flush: "post"
  }), {
    id: f(() => t.value?.id ?? null),
    gone: f(() => t.value?.gone === !0),
    holding: f(() => t.value !== null),
    step(i) {
      const o = t.value;
      return !o?.gone || i < o.page ? i : i - 1 > o.page ? i - 1 : (a(), null);
    },
    moveTo: r
  };
}
const El = 150;
function Ll(e) {
  const t = e.delay ?? El, n = H(""), a = H("");
  let s = !1, l;
  const r = () => {
    clearTimeout(l), l = void 0;
  }, i = f(() => tt(Vs(a.value), e.entity.value, e.schema?.value)), o = f(() => i.value.trim() !== ""), c = f(
    () => JSON.stringify([i.value, ...vn.map((p) => e.query.value[p])])
  ), d = me(null), v = f(() => {
    const p = e.query.value;
    if (!o.value) return p;
    const g = d.value?.of === c.value ? d.value.page : 1;
    return { ...p, expr: at(p.expr, i.value), page: g };
  });
  te(n, (p) => {
    if (r(), !p.trim()) {
      s || (a.value = "");
      return;
    }
    s = !1, l = setTimeout(() => {
      l = void 0, a.value = n.value;
    }, t);
  }), te(
    e.query,
    () => {
      s && (s = !1, a.value = "");
    },
    { flush: "sync" }
  );
  const _ = (p) => {
    r(), s = !0, n.value = "", !p() && s && (s = !1, a.value = "");
  };
  return ta() && Ct(r), {
    text: n,
    live: v,
    drafting: o,
    setPage(p) {
      d.value = { of: c.value, page: Math.max(1, Math.floor(p)) };
    },
    commit() {
      const p = n.value.trim();
      if (!p) return;
      const g = at(
        e.query.value.expr,
        tt(p, e.entity.value, e.schema?.value)
      );
      a.value = p, _(() => e.setExpression(g));
    },
    abandon() {
      r(), s = !1, n.value = "", a.value = "";
    },
    release: _
  };
}
const Tl = 25, Ra = (e, t) => e.toLowerCase() === t.toLowerCase();
function Ol(e, t) {
  return e.find((n) => Ra(n.id, t));
}
function Al(e) {
  const t = me(/* @__PURE__ */ new Map()), n = /* @__PURE__ */ new Set(), a = (i) => {
    if (i.facetKey !== ot) return null;
    const o = La(e.schema.value, i.field, i.value);
    return o ? { ...o, key: `${o.entity.key}:${o.id}` } : null;
  }, s = (i) => {
    const { entity: o, id: c } = i, d = e.query.value;
    return e.source.value.query({
      query: {
        ...d,
        entity: o.key,
        // The reference on its own. The rest of the query is about the rows on
        // screen, which are of another type entirely.
        expr: $a(o, c) ?? "",
        sort: Ee(o, d.sort, e.schema.value).key,
        page: 1
      },
      schema: e.schema.value,
      entity: o,
      limit: Tl,
      offset: 0
    });
  }, l = (i, o) => {
    const c = mt(pe(i.columns ?? [], "identity"), o);
    return c === ke || Ra(c, o.id) ? "" : c;
  }, r = () => {
    if (e.loading.value) return;
    const i = /* @__PURE__ */ new Map();
    for (const d of e.terms.value) {
      const v = a(d);
      v && !t.value.has(v.key) && !n.has(v.key) && i.set(v.key, v);
    }
    if (!i.size) return;
    const o = [...i.values()].map((d) => ({
      reference: d,
      outcome: s(d)
    })), c = (d) => {
      const v = new Map(t.value);
      d.forEach((_, p) => {
        const { reference: g } = o[p], m = Ol(_.rows, g.id);
        v.set(g.key, m ? l(g.entity, m) : "");
      }), t.value = v;
    };
    if (o.every(({ outcome: d }) => !(d instanceof Promise))) {
      c(o.map(({ outcome: d }) => d));
      return;
    }
    for (const { reference: d } of o) n.add(d.key);
    Promise.all(o.map(({ outcome: d }) => Promise.resolve(d))).then(c).catch(() => {
    }).finally(() => {
      for (const { reference: d } of o) n.delete(d.key);
    });
  };
  return te([e.source, e.schema, e.terms, e.loading], () => {
    try {
      r();
    } catch {
    }
  }, { immediate: !0 }), {
    names: t,
    nameOf(i) {
      const o = a(i);
      return o && t.value.get(o.key) || null;
    }
  };
}
const Nl = 4, Il = 8, Rl = 180;
function Bl(e, t, n, a = {}) {
  const s = a.gap ?? Nl, l = a.margin ?? Il, r = a.flipBelow ?? Rl, i = a.side ?? "below", o = {
    below: n.height - e.bottom - s - l,
    above: e.top - s - l
  }, c = i === "below" ? "above" : "below", d = o[i] < r && o[c] > o[i] ? c : i, v = Math.min(a.maxHeight ?? 1 / 0, Math.max(0, o[d])), _ = Math.max(0, n.width - l * 2), p = Math.min(a.minWidth ?? e.width, _), g = Math.min(Math.max(t, p), _), m = a.align === "end" ? e.right - g : e.left, b = Math.max(l, Math.min(m, n.width - g - l));
  return d === "below" ? { side: d, left: b, top: e.bottom + s, maxHeight: v, minWidth: p, maxWidth: _ } : { side: d, left: b, bottom: n.height - e.top + s, maxHeight: v, minWidth: p, maxWidth: _ };
}
const Hl = ["data-dc-theme", "data-dc-side"], Pe = [], Fl = /* @__PURE__ */ z({
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
    const n = e, a = t, { theme: s, style: l, adopt: r } = gn(n), i = H(null), o = H(null), c = { root: () => i.value };
    function d() {
      const h = n.anchor;
      h && (o.value = Bl(
        h.getBoundingClientRect(),
        i.value?.offsetWidth ?? 0,
        { width: window.innerWidth, height: window.innerHeight },
        { side: n.side, align: n.align, maxHeight: n.maxHeight, minWidth: n.minWidth }
      ));
    }
    const v = f(() => {
      const h = o.value, w = h ? {
        position: "fixed",
        left: `${h.left}px`,
        ...h.top !== void 0 ? { top: `${h.top}px` } : {},
        ...h.bottom !== void 0 ? { bottom: `${h.bottom}px` } : {},
        minWidth: `${h.minWidth}px`,
        maxWidth: `${h.maxWidth}px`,
        maxHeight: `${h.maxHeight}px`,
        overflowY: "auto"
      } : { position: "fixed", visibility: "hidden" };
      return { ...l.value, ...w };
    });
    function _() {
      a("update:open", !1), a("close");
    }
    function p(h) {
      return i.value?.contains(h) || n.anchor?.contains(h) ? !0 : Pe.slice(Pe.indexOf(c) + 1).some((P) => P.root()?.contains(h));
    }
    function g(h) {
      const w = h.target;
      w && !p(w) && _();
    }
    function m(h) {
      h.key !== "Escape" || h.defaultPrevented || Pe[Pe.length - 1] === c && (h.preventDefault(), i.value?.contains(document.activeElement) && n.anchor?.focus(), _());
    }
    let b = null;
    async function S() {
      Pe.includes(c) || (Pe.push(c), r(), o.value = null, await Je(), d(), window.addEventListener("pointerdown", g, !0), document.addEventListener("keydown", m, !0), window.addEventListener("resize", d), window.addEventListener("scroll", d, !0), typeof ResizeObserver < "u" && i.value && (b = new ResizeObserver(() => d()), b.observe(i.value)));
    }
    function N() {
      const h = Pe.indexOf(c);
      h !== -1 && (Pe.splice(h, 1), window.removeEventListener("pointerdown", g, !0), document.removeEventListener("keydown", m, !0), window.removeEventListener("resize", d), window.removeEventListener("scroll", d, !0), b?.disconnect(), b = null);
    }
    return ct(() => {
      n.open && S();
    }), te(
      () => n.open,
      (h) => {
        h ? S() : N();
      }
    ), te(() => n.anchor, () => {
      n.open && d();
    }), we(N), (h, w) => e.open ? (u(), A(Pt, {
      key: 0,
      to: e.to
    }, [
      x("div", Ke({
        ref_key: "root",
        ref: i
      }, h.$attrs, {
        class: "dc-shell dc-layer dc-popover",
        "data-dc-theme": k(s),
        "data-dc-side": o.value?.side,
        style: v.value
      }), [
        G(h.$slots, "default", {}, void 0, !0)
      ], 16, Hl)
    ], 8, ["to"])) : L("", !0);
  }
}), j = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [a, s] of t)
    n[a] = s;
  return n;
}, ql = /* @__PURE__ */ j(Fl, [["__scopeId", "data-v-a688f2f7"]]), Vl = ["href"], Dl = /* @__PURE__ */ z({
  __name: "PressLink",
  props: {
    href: {},
    selectable: { type: Boolean }
  },
  emits: ["press"],
  setup(e, { emit: t }) {
    const n = e, a = t;
    function s(i) {
      i.stopPropagation(), !Pa() && (n.href && Zt(i) ? Jt(n.href, i) : a("press", lt(i), i));
    }
    function l(i) {
      n.href && i.button === 1 && Jt(n.href, i);
    }
    function r(i) {
      if (n.href && Zt(i)) {
        i.stopPropagation();
        return;
      }
      i.preventDefault(), a("press", lt(i), i);
    }
    return (i, o) => e.selectable ? (u(), y("span", {
      key: 0,
      role: "link",
      tabindex: "0",
      class: "dc-press",
      onClick: s,
      onAuxclick: l,
      onKeydown: o[0] || (o[0] = Ae((c) => c.currentTarget.click(), ["enter"]))
    }, [
      G(i.$slots, "default", {}, void 0, !0)
    ], 32)) : e.href ? (u(), y("a", {
      key: 1,
      href: e.href,
      class: "dc-press",
      onClick: r
    }, [
      G(i.$slots, "default", {}, void 0, !0)
    ], 8, Vl)) : (u(), y("button", {
      key: 2,
      type: "button",
      class: "dc-press",
      onClick: r
    }, [
      G(i.$slots, "default", {}, void 0, !0)
    ]));
  }
}), se = /* @__PURE__ */ j(Dl, [["__scopeId", "data-v-e5165a68"]]), St = (e) => e.toLowerCase().replace(/\s+/g, ""), Kl = /(?:[^\s"]|"[^"]*"?)*$/, Wl = /^(-?)([^:=<>"\s-][^:=<>"\s]*)([:=])(.*)$/, zn = 4;
function zl(e, t) {
  const n = St(t);
  return e.find((a) => rt(a) === n || St(a.label) === n);
}
function jl(e) {
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
function Ul(e) {
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
function Ql(e, t) {
  const n = Kl.exec(e)?.[0] ?? "", a = e.slice(0, e.length - n.length), s = [], l = Wl.exec(n);
  if (l) {
    const [, r, i, o, c] = l, d = zl(t, i);
    if (!d) return [];
    const v = c.replace(/"/g, "").toLowerCase();
    for (const { value: _, hint: p } of Ul(d)) {
      if (!_.toLowerCase().includes(v)) continue;
      const g = _e({
        kind: "field",
        field: rt(d),
        comparator: o,
        value: _,
        ...r ? { negated: !0 } : {}
      });
      s.push({ draft: a + g, label: g, ...p ? { hint: p } : {}, complete: !0 });
    }
  } else {
    if (/[<>"]/.test(n)) return [];
    const r = n.startsWith("-") ? "-" : "", i = n.slice(r.length);
    for (const o of t) {
      if (i && !jn(o.key, i) && !jn(o.label, i)) continue;
      const c = `${r}${rt(o)}:`;
      s.push({ draft: a + c, label: c, hint: jl(o), complete: !1 });
    }
  }
  return s.filter((r) => r.draft !== e);
}
const Gl = { class: "dc-header" }, Yl = { class: "dc-header__main" }, Xl = {
  class: "dc-header__brand",
  "aria-hidden": "true"
}, Jl = { class: "dc-header__sr" }, Zl = {
  key: 2,
  class: "dc-header__within"
}, er = ["title"], tr = { class: "dc-header__query" }, nr = ["data-dc-more", "title"], ar = { class: "dc-header__run" }, sr = {
  key: 0,
  class: "dc-header__or dc-mono",
  "aria-hidden": "true"
}, lr = ["title", "aria-label", "onClick"], rr = ["placeholder", "aria-expanded", "aria-activedescendant", "onKeydown"], or = ["id", "aria-selected", "onClick"], ir = { class: "dc-completion__term dc-mono" }, cr = {
  key: 0,
  class: "dc-completion__hint"
}, ur = {
  key: 0,
  class: "dc-header__actions"
}, dr = /* @__PURE__ */ z({
  __name: "ShellHeader",
  setup(e) {
    const t = Mt(), n = ee(), a = f(() => n.schema.value), s = f(() => {
      const C = n.within.value.trim();
      return C ? xt({ ...n.query.value, expr: C }, null) : [];
    }), l = f(() => {
      const C = n.entity.value, O = C?.keepsScope ? void 0 : C?.scope?.toLowerCase();
      return n.terms.value.filter((V) => V.facetKey !== $t).map((V, D, Te) => {
        const Ve = Te[D - 1];
        return {
          term: V,
          or: Ve?.group !== void 0 && V.group !== void 0 && V.group !== Ve.group,
          idle: !!O && V.field?.toLowerCase() === O
        };
      });
    }), r = Al({
      source: n.source,
      schema: n.schema,
      query: n.query,
      loading: n.loading,
      // The scope's parts as well as the query's: it names a record more often
      // than a typed term does, being what a record's own page is built on.
      terms: f(() => [...s.value, ...n.terms.value])
    });
    function i(C) {
      const O = Ea(a.value, C)?.scopeLabel ?? C;
      return O.charAt(0).toUpperCase() + O.slice(1);
    }
    function o(C) {
      return C.replace(/\s*\([^()]*\)\s*$/, "");
    }
    function c(C) {
      const O = r.nameOf(C);
      return O ? `${C.negated ? "-" : ""}${i(C.field)}: ${o(O)}` : C.label;
    }
    function d(C) {
      const O = c(C.term), V = C.idle ? `Not applied to ${n.entity.value?.label} — remove ${O}` : `Remove ${O}`, D = C.term.address;
      return D && D !== O ? `${V}
Written ${D} in the address and the search box` : V;
    }
    const v = f(() => {
      const C = n.pressPreview?.value;
      if (!C) return [];
      const O = n.query.value, V = new Set(n.terms.value.map((D) => D.address));
      return xt(
        { ...O, expr: C.alone ? C.term : at(O.expr, C.term) },
        n.entity.value,
        n.schema.value
      ).filter((D) => D.address !== void 0 && !V.has(D.address)).map(
        (D) => C.name ? `${i(D.field)}: ${o(C.name)}` : D.label
      );
    }), _ = f(() => n.pressPreview?.value?.alone === !0), p = H(null);
    function g(C) {
      p.value = C instanceof HTMLInputElement ? C : null;
    }
    function m() {
      n.abandonDraft(), p.value?.blur();
    }
    function b() {
      const C = h.value[N.value];
      if (w.value && C) {
        q(C);
        return;
      }
      B.value = null, S.value = !1, n.commitDraft();
    }
    const S = H(!1), N = H(-1), h = f(() => {
      const C = n.entity.value?.facets ?? [];
      return C.length ? Ql(n.draft.value, C) : [];
    }), w = f(() => S.value && h.value.length > 0);
    te(h, () => {
      N.value = -1;
    });
    const P = `${Et() ?? "dc-header"}-completions`;
    function q(C) {
      n.draft.value = C.draft, S.value = !C.complete, N.value = -1, Je(() => {
        const O = p.value;
        O?.focus(), O?.setSelectionRange(C.draft.length, C.draft.length);
      });
    }
    function ne(C, O) {
      if (C.isComposing || !h.value.length) return;
      if (C.preventDefault(), !S.value) {
        S.value = !0;
        return;
      }
      const V = h.value.length + 1;
      N.value = (N.value + 1 + O + V) % V - 1;
    }
    function I(C) {
      return `${P}-${C}`;
    }
    const B = H(null), F = f(() => Math.min(B.value ?? 1 / 0, l.value.length)), ce = f(() => [
      { key: "before", entries: l.value.slice(0, F.value) },
      { key: "after", entries: l.value.slice(F.value) }
    ]), ie = f(() => F.value < l.value.length);
    te(l, (C) => {
      B.value !== null && B.value >= C.length && (B.value = null);
    });
    function re(C, O) {
      B.value = C >= l.value.length ? null : Math.max(0, C), Je(() => {
        const V = p.value;
        if (!V) return;
        const D = O === "start" ? 0 : V.value.length;
        V.setSelectionRange(D, D), V.scrollIntoView({ block: "nearest", inline: "nearest" }), Ce();
      });
    }
    function E(C) {
      const O = p.value;
      return !O || O.selectionStart !== O.selectionEnd ? !1 : O.selectionStart === (C === "start" ? 0 : O.value.length);
    }
    function U(C) {
      F.value === 0 || !E("start") || (C.preventDefault(), re(C.key === "Home" ? 0 : F.value - 1, "start"));
    }
    function T(C) {
      !ie.value || !E("end") || (C.preventDefault(), re(C.key === "End" ? l.value.length : F.value + 1, "end"));
    }
    function J(C) {
      F.value === 0 || !E("start") || (C.preventDefault(), ve(l.value[F.value - 1].term, !0));
    }
    function ae(C) {
      !ie.value || !E("end") || (C.preventDefault(), ve(l.value[F.value].term, !1));
    }
    function ye(C) {
      C.isComposing || C.altKey || C.ctrlKey || C.metaKey || C.shiftKey || (C.key === "ArrowLeft" || C.key === "Home" ? U(C) : C.key === "ArrowRight" || C.key === "End" ? T(C) : C.key === "Backspace" ? J(C) : C.key === "Delete" && ae(C));
    }
    function ve(C, O) {
      O && B.value !== null && (B.value = Math.max(0, B.value - 1)), n.removeTerm(C);
    }
    function xe(C) {
      C.target?.closest("button, input") || (C.preventDefault(), p.value?.focus(), re(l.value.length, "end"));
    }
    function pt() {
      S.value = !1, n.draft.value || (B.value = null);
    }
    const Se = H(null), qe = H("");
    function Ce() {
      const C = Se.value;
      if (!C) {
        qe.value = "";
        return;
      }
      const O = C.scrollLeft > 1, V = C.scrollWidth - C.clientWidth - C.scrollLeft > 1;
      qe.value = O && V ? "both" : O ? "start" : V ? "end" : "";
    }
    let be = null;
    return te(
      Se,
      (C) => {
        be?.disconnect(), be = null, Ce(), !(!C || typeof ResizeObserver > "u") && (be = new ResizeObserver(Ce), be.observe(C));
      },
      { flush: "post" }
    ), te([l, F], Ce, { flush: "post" }), we(() => be?.disconnect()), (C, O) => (u(), y("div", Gl, [
      x("div", Yl, [
        a.value.label && t.brand ? (u(), A(se, {
          key: 0,
          class: "dc-header__domain",
          "data-dc-brand": "",
          title: "Home",
          href: k(n).homeHref(),
          onPress: O[0] || (O[0] = (V) => k(n).reset())
        }, {
          default: Y(() => [
            x("span", Xl, [
              G(C.$slots, "brand", {
                label: a.value.label
              }, void 0, !0)
            ]),
            x("span", Jl, M(a.value.label), 1)
          ]),
          _: 3
        }, 8, ["href"])) : a.value.label ? (u(), A(se, {
          key: 1,
          class: "dc-header__domain",
          title: "Home",
          href: k(n).homeHref(),
          onPress: O[1] || (O[1] = (V) => k(n).reset())
        }, {
          default: Y(() => [
            Z(M(a.value.label), 1)
          ]),
          _: 1
        }, 8, ["href"])) : L("", !0),
        G(C.$slots, "lead", {}, void 0, !0),
        s.value.length ? (u(), y("span", Zl, [
          O[10] || (O[10] = x("span", { class: "dc-header__sr" }, "Within", -1)),
          (u(!0), y(W, null, X(s.value, (V) => (u(), y("span", {
            key: `scope:${V.id}`,
            class: "dc-within dc-mono dc-truncate",
            title: c(V)
          }, M(c(V)), 9, er))), 128))
        ])) : L("", !0),
        x("div", tr, [
          x("div", {
            class: "dc-header__field",
            onMousedown: xe
          }, [
            x("div", {
              ref_key: "termBar",
              ref: Se,
              class: "dc-header__terms",
              "data-dc-more": qe.value,
              title: k(n).summary.value,
              onScroll: Ce
            }, [
              (u(!0), y(W, null, X(ce.value, (V) => (u(), y(W, {
                key: V.key
              }, [
                x("span", ar, [
                  (u(!0), y(W, null, X(V.entries, (D) => (u(), y(W, {
                    key: D.term.id
                  }, [
                    D.or ? (u(), y("span", sr, "or")) : L("", !0),
                    x("button", {
                      type: "button",
                      class: de(["dc-term dc-mono", { "dc-term--idle": D.idle, "dc-term--leaving": _.value }]),
                      title: d(D),
                      "aria-label": `Remove ${c(D.term)}`,
                      onMousedown: O[2] || (O[2] = Ne(() => {
                      }, ["prevent"])),
                      onClick: (Te) => ve(D.term, V.key === "before")
                    }, M(c(D.term)), 43, lr)
                  ], 64))), 128)),
                  V.key === "before" ? (u(!0), y(W, { key: 0 }, X(v.value, (D) => (u(), y("span", {
                    key: D,
                    class: "dc-term dc-term--preview dc-mono",
                    "aria-hidden": "true"
                  }, M(D), 1))), 128)) : L("", !0)
                ]),
                V.key === "before" ? jt((u(), y("input", {
                  key: 0,
                  ref_for: !0,
                  ref: g,
                  "onUpdate:modelValue": O[3] || (O[3] = (D) => k(n).draft.value = D),
                  class: de(["dc-header__search dc-mono", { "dc-header__search--between": ie.value }]),
                  style: oe({ "--dc-typed": String(Math.max(1, k(n).draft.value.length)) }),
                  type: "text",
                  autocomplete: "off",
                  spellcheck: "false",
                  placeholder: ie.value ? "" : "Filter…",
                  "aria-label": "Filter",
                  role: "combobox",
                  "aria-autocomplete": "list",
                  "aria-expanded": w.value,
                  "aria-controls": P,
                  "aria-activedescendant": w.value && N.value >= 0 ? I(N.value) : void 0,
                  onKeydown: [
                    Ae(Ne(b, ["prevent"]), ["enter"]),
                    Ae(Ne(m, ["prevent"]), ["esc"]),
                    O[4] || (O[4] = Ae((D) => ne(D, 1), ["down"])),
                    O[5] || (O[5] = Ae((D) => ne(D, -1), ["up"])),
                    ye
                  ],
                  onFocus: O[6] || (O[6] = (D) => S.value = !0),
                  onInput: O[7] || (O[7] = (D) => S.value = !0),
                  onBlur: pt
                }, null, 46, rr)), [
                  [es, k(n).draft.value]
                ]) : L("", !0)
              ], 64))), 128))
            ], 40, nr)
          ], 32)
        ])
      ]),
      Q(ql, {
        id: P,
        open: w.value,
        anchor: p.value,
        "min-width": 0,
        "max-height": 320,
        class: "dc-completions",
        role: "listbox",
        "aria-label": "Completions",
        onClose: O[9] || (O[9] = (V) => S.value = !1)
      }, {
        default: Y(() => [
          (u(!0), y(W, null, X(h.value, (V, D) => (u(), y("div", {
            id: I(D),
            key: V.label,
            class: de(["dc-completion", { "dc-completion--active": D === N.value }]),
            role: "option",
            "aria-selected": D === N.value,
            onMousedown: O[8] || (O[8] = Ne(() => {
            }, ["prevent"])),
            onClick: (Te) => q(V)
          }, [
            x("span", ir, M(V.label), 1),
            V.hint ? (u(), y("span", cr, M(V.hint), 1)) : L("", !0)
          ], 42, or))), 128))
        ]),
        _: 1
      }, 8, ["open", "anchor"]),
      t.actions ? (u(), y("div", ur, [
        G(C.$slots, "actions", {}, void 0, !0)
      ])) : L("", !0)
    ]));
  }
}), Ba = /* @__PURE__ */ j(dr, [["__scopeId", "data-v-be5eed0e"]]), fr = ["checked", "indeterminate"], Ha = /* @__PURE__ */ z({
  __name: "PageTick",
  setup(e) {
    const t = ee(), n = f(() => t.rows.value.filter((l) => t.isSelected(l)).length), a = f(
      () => t.rows.value.length > 0 && n.value === t.rows.value.length
    ), s = f(() => n.value > 0 && !a.value);
    return (l, r) => (u(), y("input", {
      class: "dc-tick",
      type: "checkbox",
      checked: a.value,
      indeterminate: s.value,
      "aria-label": "Select every row on this page",
      title: "Select every row on this page",
      onChange: r[0] || (r[0] = (i) => k(t).selectPage(!a.value))
    }, null, 40, fr));
  }
}), vr = { class: "dc-pick" }, pr = ["id"], hr = ["id", "aria-expanded", "aria-labelledby", "data-dc-value"], mr = {
  key: 0,
  class: "dc-pick__icon",
  viewBox: "0 0 16 16",
  "aria-hidden": "true"
}, yr = ["d"], gr = { class: "dc-pick__label" }, _r = /* @__PURE__ */ z({
  __name: "PickControl",
  props: {
    modelValue: {},
    options: {},
    label: {},
    mono: { type: Boolean }
  },
  emits: ["update:modelValue", "open", "close"],
  setup(e, { emit: t }) {
    const n = e, a = t, s = Et() ?? "dc-pick", l = H(null), r = H(null), i = H(null), o = H(!1), c = f(() => i.value !== null), d = H(null), v = f(
      () => n.options.find((w) => w.key === n.modelValue) ?? n.options[0]
    ), _ = f(
      () => n.options.map((w) => ({
        id: w.key,
        label: w.label,
        icon: w.icon,
        checked: w.key === n.modelValue
      }))
    ), p = f(
      () => i.value ? { maxHeight: `${window.innerHeight - i.value.y - 8}px` } : void 0
    );
    function g(w) {
      const P = l.value?.getBoundingClientRect();
      P && (d.value = l.value?.closest(".dc-shell") ?? document.body, i.value = { x: P.left, y: P.bottom + 4, mirrorX: P.right }, o.value = w, a("open"));
    }
    function m(w) {
      i.value && a("close"), i.value = null, w && l.value?.focus();
    }
    function b() {
      c.value ? m(!0) : g(!1);
    }
    function S(w) {
      w.key !== "ArrowDown" && w.key !== "ArrowUp" || c.value || (w.preventDefault(), g(!0));
    }
    function N(w) {
      const P = w.target;
      P && (l.value?.contains(P) || r.value?.root?.contains(P) || m(!1));
    }
    te(c, (w) => {
      w ? window.addEventListener("pointerdown", N, !0) : window.removeEventListener("pointerdown", N, !0);
    }), we(() => window.removeEventListener("pointerdown", N, !0));
    function h(w) {
      m(!0), !(w.id === void 0 || w.id === n.modelValue) && a("update:modelValue", w.id);
    }
    return (w, P) => (u(), y("span", vr, [
      x("span", {
        id: `${k(s)}-name`,
        class: "dc-pick__name"
      }, M(e.label), 9, pr),
      x("button", {
        id: `${k(s)}-value`,
        ref_key: "trigger",
        ref: l,
        type: "button",
        class: de(["dc-pick__button", { "dc-mono": e.mono }]),
        "aria-haspopup": "menu",
        "aria-expanded": c.value,
        "aria-labelledby": `${k(s)}-name ${k(s)}-value`,
        "data-dc-value": e.modelValue,
        onClick: b,
        onKeydown: S
      }, [
        v.value?.icon ? (u(), y("svg", mr, [
          x("path", {
            d: v.value.icon
          }, null, 8, yr)
        ])) : L("", !0),
        x("span", gr, M(v.value?.label), 1)
      ], 42, hr),
      P[1] || (P[1] = x("svg", {
        class: "dc-pick__mark",
        viewBox: "0 0 16 16",
        "aria-hidden": "true"
      }, [
        x("path", { d: "M4 6l4 4 4-4" })
      ], -1)),
      i.value && d.value ? (u(), A(Pt, {
        key: 0,
        to: d.value
      }, [
        Q(k(os), {
          ref_key: "menu",
          ref: r,
          class: "dc-pick__list",
          style: oe(p.value),
          items: _.value,
          at: i.value,
          label: e.label,
          autofocus: o.value,
          onChoose: h,
          onDismiss: P[0] || (P[0] = (q) => m(!0))
        }, null, 8, ["style", "items", "at", "label", "autofocus"])
      ], 8, ["to"])) : L("", !0)
    ]));
  }
}), tn = /* @__PURE__ */ j(_r, [["__scopeId", "data-v-0e31a711"]]), wr = {
  class: "dc-pager",
  "aria-label": "Pages"
}, kr = ["title"], br = ["value", "onKeydown"], $r = {
  class: "dc-pager__total",
  "aria-hidden": "true"
}, xr = {
  class: "dc-pager__sr",
  "aria-live": "polite"
}, Sr = /* @__PURE__ */ z({
  __name: "ShellPager",
  props: {
    pagesNote: {}
  },
  setup(e) {
    const t = e, n = ee(), a = f(() => n.liveQuery.value.page), s = f(
      () => `${n.counting.value ? "~" : ""}${De(n.pageCount.value)}`
    ), l = f(() => {
      if (n.limit.value === 1) {
        const m = `Record ${De(a.value)} of ${s.value}`;
        return t.pagesNote ? `${m}
${t.pagesNote}` : m;
      }
      let p = `Page ${De(a.value)} of ${s.value}`;
      const g = n.rows.value.length;
      if (g) {
        const m = n.offset.value + 1, b = `${n.counting.value ? "~" : ""}${De(n.total.value)}`;
        p += ` — rows ${De(m)} to ${De(m + g - 1)} of ${b}`;
      }
      return t.pagesNote ? `${p}
${t.pagesNote}` : p;
    }), r = H(null), i = f(() => r.value ?? String(a.value)), o = f(
      () => `calc(${Math.max(2, String(n.pageCount.value).length)}ch + 10px)`
    );
    function c(p) {
      p.target.select();
    }
    function d(p) {
      const g = p.target, m = g.value.replace(/[^0-9]/g, "");
      g.value !== m && (g.value = m), r.value = m;
    }
    function v(p) {
      const g = p.target, m = Number(r.value);
      r.value = null;
      const b = Number.isFinite(m) && m >= 1 ? Math.min(Math.trunc(m), Math.max(1, n.pageCount.value)) : a.value;
      g.value = String(b), b !== a.value && n.setPage(b);
    }
    function _(p) {
      const g = p.target;
      r.value = null, g.value = String(a.value), g.blur();
    }
    return (p, g) => (u(), y("nav", wr, [
      Q(se, {
        class: "dc-pager__step",
        "aria-label": "Previous page",
        href: a.value > 1 ? k(n).hrefFor({ page: a.value - 1 }) : null,
        disabled: a.value <= 1,
        onPress: g[0] || (g[0] = (m) => k(n).setPage(a.value - 1))
      }, {
        default: Y(() => [...g[2] || (g[2] = [
          x("span", { "aria-hidden": "true" }, "‹", -1)
        ])]),
        _: 1
      }, 8, ["href", "disabled"]),
      x("span", {
        class: "dc-pager__page dc-mono",
        title: l.value
      }, [
        x("input", {
          class: "dc-pager__box dc-mono",
          type: "text",
          inputmode: "numeric",
          autocomplete: "off",
          "aria-label": "Page",
          style: oe({ width: o.value }),
          value: i.value,
          onFocus: c,
          onInput: d,
          onKeydown: [
            Ae(Ne(v, ["prevent"]), ["enter"]),
            Ae(Ne(_, ["prevent"]), ["esc"])
          ],
          onBlur: v
        }, null, 44, br),
        x("span", $r, "/ " + M(s.value), 1)
      ], 8, kr),
      x("span", xr, M(l.value), 1),
      Q(se, {
        class: "dc-pager__step",
        "aria-label": "Next page",
        href: a.value < k(n).pageCount.value ? k(n).hrefFor({ page: a.value + 1 }) : null,
        disabled: a.value >= k(n).pageCount.value,
        onPress: g[1] || (g[1] = (m) => k(n).setPage(a.value + 1))
      }, {
        default: Y(() => [...g[3] || (g[3] = [
          x("span", { "aria-hidden": "true" }, "›", -1)
        ])]),
        _: 1
      }, 8, ["href", "disabled"])
    ]));
  }
}), Cr = /* @__PURE__ */ j(Sr, [["__scopeId", "data-v-bdec7640"]]), Pr = {
  key: 0,
  class: "dc-actions__order"
}, Mr = {
  key: 1,
  class: "dc-actions__select"
}, Er = {
  key: 0,
  class: "dc-actions__all"
}, Lr = {
  class: "dc-actions__count",
  "aria-live": "polite"
}, Tr = {
  key: 1,
  class: "dc-actions__count dc-actions__all",
  "aria-live": "polite"
}, Or = { class: "dc-actions__ops" }, Ar = ["disabled"], Nr = ["data-dc-operation", "disabled", "onClick"], Ir = ["disabled"], Rr = /* @__PURE__ */ z({
  __name: "RecordActions",
  props: {
    views: {},
    selectionPlacement: {},
    pagesNote: {}
  },
  setup(e) {
    const t = e, n = ee(), a = f(() => Ie(n.query.value.view, t.views)), s = f(
      () => (d.value || v.value) && a.value !== "table" && n.sorts.value.length > 0
    ), l = f(
      () => n.sorts.value.map((w) => ({ key: w.key, label: w.label }))
    ), r = f(() => s.value && l.value.length > 1), i = f(() => n.query.value.dir === "desc"), o = f(
      () => `Sorted by ${n.sort.value.label}, ${i.value ? "descending" : "ascending"}`
    ), c = f(() => n.entity.value), d = f(
      () => !ma(n.query.value, t.views) && a.value !== "record"
    ), v = f(() => a.value === "record" && n.query.value.entity !== null), _ = f(
      () => (d.value || v.value) && !n.loading.value && (n.pageCount.value > 1 || !!t.pagesNote)
    ), p = f(() => n.selection.value.ids.length), g = f(
      () => d.value && n.selectable.value && (n.rows.value.length > 0 || p.value > 0)
    ), m = f(() => a.value === "table"), b = f(
      () => s.value || _.value || d.value && (g.value || !!(c.value?.create || c.value?.duplicate || c.value?.delete || c.value?.operations?.length))
    ), S = f(() => p.value ? `${p.value} selected` : m.value ? "" : "Select all"), N = f(() => t.selectionPlacement === "end");
    function h(w) {
      return p.value ? w.endsWith("…") ? `${w.slice(0, -1)} ${p.value}…` : `${w} ${p.value}` : w;
    }
    return (w, P) => b.value ? (u(), y("div", {
      key: 0,
      class: de(["dc-actions", { "dc-actions--selection-end": N.value }])
    }, [
      s.value ? (u(), y("span", Pr, [
        r.value ? (u(), A(tn, {
          key: 0,
          class: "dc-actions__pick dc-actions__sort",
          label: "Sort",
          "model-value": k(n).sort.value.key,
          options: l.value,
          "onUpdate:modelValue": k(n).setSort
        }, null, 8, ["model-value", "options", "onUpdate:modelValue"])) : L("", !0),
        Q(se, {
          class: "dc-actions__dir",
          "aria-label": o.value,
          title: o.value,
          href: k(n).hrefFor({ dir: i.value ? "asc" : "desc" }),
          onPress: P[0] || (P[0] = (q) => k(n).toggleDirection())
        }, {
          default: Y(() => [
            Z(M(i.value ? "↓" : "↑"), 1)
          ]),
          _: 1
        }, 8, ["aria-label", "title", "href"])
      ])) : L("", !0),
      g.value && S.value ? (u(), y("div", Mr, [
        m.value ? (u(), y("span", Tr, M(S.value), 1)) : (u(), y("label", Er, [
          Q(Ha),
          x("span", Lr, M(S.value), 1)
        ])),
        p.value ? (u(), y("button", {
          key: 2,
          type: "button",
          class: de(["dc-actions__clear", { "dc-actions__clear--op": N.value }]),
          onClick: P[1] || (P[1] = (q) => k(n).clearSelection())
        }, " Clear ", 2)) : L("", !0)
      ])) : L("", !0),
      x("div", Or, [
        c.value?.create ? (u(), A(se, {
          key: 0,
          class: "dc-actions__op dc-actions__new",
          href: k(n).createHref?.(c.value),
          onPress: P[2] || (P[2] = (q) => k(n).create(c.value))
        }, {
          default: Y(() => [
            P[5] || (P[5] = x("span", {
              class: "dc-actions__plus",
              "aria-hidden": "true"
            }, "+", -1)),
            Z(" " + M(c.value.create), 1)
          ]),
          _: 1
        }, 8, ["href"])) : L("", !0),
        c.value?.duplicate ? (u(), y("button", {
          key: 1,
          type: "button",
          class: "dc-actions__op",
          disabled: !p.value,
          onClick: P[3] || (P[3] = (q) => k(n).duplicate())
        }, M(h(c.value.duplicate)), 9, Ar)) : L("", !0),
        (u(!0), y(W, null, X(c.value?.operations ?? [], (q) => (u(), y("button", {
          key: q.key,
          type: "button",
          class: "dc-actions__op",
          "data-dc-operation": q.key,
          disabled: !p.value && q.selection !== !1,
          onClick: (ne) => k(n).operate(q.key)
        }, M(q.selection === !1 ? q.label : h(q.label)), 9, Nr))), 128)),
        c.value?.delete ? (u(), y("button", {
          key: 2,
          type: "button",
          class: "dc-actions__op dc-actions__danger",
          disabled: !p.value,
          onClick: P[4] || (P[4] = (q) => k(n).delete())
        }, M(h(c.value.delete)), 9, Ir)) : L("", !0)
      ]),
      _.value ? (u(), A(Cr, {
        key: 2,
        class: "dc-actions__pages",
        "pages-note": e.pagesNote
      }, null, 8, ["pages-note"])) : L("", !0)
    ], 2)) : L("", !0);
  }
}), nn = /* @__PURE__ */ j(Rr, [["__scopeId", "data-v-95bd2f88"]]);
function Un(e) {
  return Math.max(0, e.total - (e.kept ?? 0));
}
function Br(e) {
  const t = me(/* @__PURE__ */ new Map()), n = H(!0);
  let a = 0, s;
  const l = () => {
    a++, s?.abort(), s = void 0;
  }, r = () => {
    l();
    const i = a, { signal: o } = s = new AbortController(), c = e.query.value, d = e.schema.value, v = e.entities.value, _ = e.within?.value.trim() ?? "";
    n.value = c.expr.trim() === "" && !_;
    const p = /* @__PURE__ */ new Map();
    let g = !0;
    for (const m of v) {
      const b = Ma(m, c.expr), S = _ ? dn(_, b) : b;
      let N = !1;
      const h = (P) => {
        if (i !== a) return;
        if (g) {
          p.set(m.key, P);
          return;
        }
        const q = new Map(t.value);
        q.set(m.key, P), t.value = q;
      }, w = e.source.value.query({
        query: { ...c, entity: m.key, expr: S, page: 1 },
        schema: d,
        entity: m,
        limit: 0,
        offset: 0,
        signal: o,
        progress: (P) => {
          N || h({ total: P, pending: !0, counted: !0 });
        }
      });
      w instanceof Promise ? (p.has(m.key) || p.set(m.key, { total: 0, pending: !0, counted: !1 }), w.then((P) => {
        N = !0, h({ total: Un(P), pending: !1, counted: !0 });
      })) : (N = !0, p.set(m.key, { total: Un(w), pending: !1, counted: !0 }));
    }
    g = !1, t.value = p;
  };
  return ta() && Ct(l), { counts: t, pristine: n, refresh: r, cancel: l };
}
const Hr = {
  key: 0,
  class: "dc-choosers"
}, Fr = "…", qr = /* @__PURE__ */ z({
  __name: "RecordChoosers",
  props: {
    views: {},
    typeChooser: {}
  },
  setup(e) {
    const t = e, n = ee(), a = f(
      () => n.hasFacets.value || !!n.liveQuery.value.expr.trim() || !!n.within.value
    ), s = Br({
      source: n.source,
      schema: n.schema,
      // What each type holds of what is on screen, the draft's results included:
      // a count of the committed query would disagree with the rows under it.
      query: n.liveQuery,
      entities: n.entities,
      within: n.within
    });
    function l(p) {
      if (p.key === n.query.value.entity && a.value) return et((n.matched ?? n.total).value);
      if (s.pristine.value) return Yt(p);
      const m = s.counts.value.get(p.key);
      return m ? m.counted ? `${m.pending ? "~" : ""}${et(m.total)}` : Fr : Yt(p);
    }
    const r = f(() => [
      { key: "", label: "Everything" },
      ...n.entities.value.map((p) => ({
        key: p.key,
        label: `${p.label} · ${l(p)}`
      }))
    ]), i = f(
      () => t.typeChooser === "always" || n.query.value.entity !== null
    );
    function o(p) {
      n.setEntity(p || null);
    }
    const c = f(
      () => (t.views ?? [...cn]).map((p) => ({
        key: p,
        label: p === "record" ? n.recordView.value?.label ?? qn.record : qn[p],
        icon: js[p]
      }))
    ), d = f(() => Ie(n.query.value.view, t.views)), v = f(() => c.value.length > 1);
    function _(p) {
      n.setView(p);
    }
    return (p, g) => i.value || v.value ? (u(), y("div", Hr, [
      i.value ? (u(), A(tn, {
        key: 0,
        class: "dc-actions__pick dc-actions__type",
        label: "Type",
        "model-value": k(n).query.value.entity ?? "",
        options: r.value,
        onOpen: k(s).refresh,
        onClose: k(s).cancel,
        "onUpdate:modelValue": o
      }, null, 8, ["model-value", "options", "onOpen", "onClose"])) : L("", !0),
      v.value ? (u(), A(tn, {
        key: 1,
        class: "dc-actions__pick dc-actions__view",
        label: "View",
        "model-value": d.value,
        options: c.value,
        "onUpdate:modelValue": _
      }, null, 8, ["model-value", "options"])) : L("", !0)
    ])) : L("", !0);
  }
}), Vr = /* @__PURE__ */ j(qr, [["__scopeId", "data-v-ac04b6df"]]);
function Dr(e, t) {
  if (!e) return null;
  const n = ue(e, t);
  return typeof n == "string" && n.trim() ? n : null;
}
const Kr = (e) => e == null || typeof e == "string" && !e.trim();
function Wr(e, t) {
  const n = pe(t, "state"), a = pe(t, "tint");
  return {
    identity: mt(pe(t, "identity"), e),
    reference: mt(pe(t, "reference"), e),
    metrics: aa(t, "metric").map((s) => ({
      column: s,
      label: s.label ?? "",
      text: Le(s, e)
    })),
    facts: t.filter((s) => s.cardLabel && !Kr(ue(s, e))).map((s) => ({
      column: s,
      label: s.cardLabel,
      title: [s.label, s.hint].filter(Boolean).join(" — "),
      text: Le(s, e)
    })),
    state: n ? ue(n, e) ?? null : null,
    updated: mt(pe(t, "updated"), e),
    image: Dr(pe(t, "image"), e),
    tint: a ? ue(a, e) ?? null : null
  };
}
function Fa(e, t, n, a, s = !1) {
  const l = n?.columns ?? [];
  return {
    row: e,
    key: ks(e, t),
    entityLabel: e.entityLabel,
    entity: n,
    columns: l,
    ordinal: vs(t),
    parts: Wr(e, l),
    pinned: a,
    selected: s
  };
}
function He() {
  const e = ee(), t = f(
    () => new Map(e.entities.value.map((n) => [n.key, n]))
  );
  return f(
    () => e.rows.value.map(
      (n, a) => Fa(
        n,
        e.offset.value + a,
        t.value.get(n.entityKey) ?? null,
        e.isPinned(n),
        e.isSelected(n)
      )
    )
  );
}
const zr = ["data-dc-status", "data-dc-tone"], jr = /* @__PURE__ */ z({
  __name: "StatusPill",
  props: {
    status: {},
    tone: {},
    label: {}
  },
  setup(e) {
    const t = e, n = f(() => t.label ?? t.status ?? "");
    return (a, s) => (u(), y("span", {
      class: "dc-pill",
      "data-dc-status": e.status,
      "data-dc-tone": e.tone
    }, M(n.value), 9, zr));
  }
}), je = /* @__PURE__ */ j(jr, [["__scopeId", "data-v-686eb9b6"]]), Ur = { key: 1 }, Qr = /* @__PURE__ */ z({
  __name: "MetricDrill",
  props: {
    entry: {},
    column: {}
  },
  setup(e) {
    const t = e, n = ee(), a = f(() => !t.entry.entity?.scope || !t.column.drill ? null : n.entities.value.find((v) => v.key === t.column.drill) ?? null), s = f(() => !!t.column.click), l = f(() => t.column.label ?? ""), r = f(() => Le(t.column, t.entry.row)), i = f(() => s.value ? t.column.clickHref?.(t.entry.row) ?? null : a.value ? n.drillHref(t.entry.row, a.value, t.column.drillWhere) : null), o = f(() => a.value && !s.value ? `${l.value} of ${t.entry.parts.identity} — show the ${a.value.label.toLowerCase()}` : `${l.value} of ${t.entry.parts.identity}`);
    function c(d, v) {
      v.stopPropagation(), s.value ? t.column.click?.(t.entry.row, d) : a.value && n.drill(t.entry.row, a.value, d, t.column.drillWhere);
    }
    return (d, v) => a.value || s.value ? (u(), A(se, {
      key: 0,
      class: "dc-drill",
      href: i.value,
      title: o.value,
      onPress: c
    }, {
      default: Y(() => [
        G(d.$slots, "default", {}, () => [
          Z(M(r.value), 1)
        ], !0)
      ]),
      _: 3
    }, 8, ["href", "title"])) : (u(), y("span", Ur, [
      G(d.$slots, "default", {}, () => [
        Z(M(r.value), 1)
      ], !0)
    ]));
  }
}), dt = /* @__PURE__ */ j(Qr, [["__scopeId", "data-v-bbbd334b"]]), Gr = ["data-dc-active", "aria-pressed", "aria-label"], Yr = /* @__PURE__ */ z({
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
    return (s, l) => (u(), y("button", {
      type: "button",
      class: "dc-star",
      "data-dc-active": e.pinned ? "true" : "false",
      "aria-pressed": e.pinned,
      "aria-label": e.pinned ? `Unpin ${e.name}` : `Pin ${e.name}`,
      onClick: a
    }, M(e.pinned ? "★" : "☆"), 9, Gr));
  }
}), _n = /* @__PURE__ */ j(Yr, [["__scopeId", "data-v-ef63d763"]]), Xr = ["src"], Jr = /* @__PURE__ */ z({
  __name: "RowPicture",
  props: {
    src: {}
  },
  setup(e) {
    const t = e, n = H(!1);
    return te(
      () => t.src,
      () => {
        n.value = !1;
      }
    ), (a, s) => e.src.trim() && !n.value ? (u(), y("img", {
      key: 0,
      class: "dc-picture",
      src: e.src,
      alt: "",
      loading: "lazy",
      decoding: "async",
      onError: s[0] || (s[0] = (l) => n.value = !0)
    }, null, 40, Xr)) : L("", !0);
  }
}), Ft = /* @__PURE__ */ j(Jr, [["__scopeId", "data-v-afaab300"]]), Zr = ["data-dc-standing", "title", "aria-label"], eo = /* @__PURE__ */ z({
  __name: "QueryMark",
  props: {
    entry: {}
  },
  setup(e) {
    const t = e, n = ee(), a = f(() => Bt(t.entry.entity, t.entry.row)), s = f(() => yn(n.query.value.expr, a.value)), l = f(
      () => s.value === "in" ? `The query narrows to ${t.entry.parts.identity} — press to lift that` : `The query leaves out ${t.entry.parts.identity} — press to lift that`
    );
    function r(i) {
      i.stopPropagation(), n.setExpression(Ca(n.query.value.expr, a.value));
    }
    return (i, o) => s.value ? (u(), y("button", {
      key: 0,
      type: "button",
      class: "dc-standing",
      "data-dc-standing": s.value,
      title: l.value,
      "aria-label": l.value,
      onClick: r
    }, M(s.value === "in" ? "+" : "−"), 9, Zr)) : L("", !0);
  }
}), wn = /* @__PURE__ */ j(eo, [["__scopeId", "data-v-4b8d4166"]]), to = ["aria-label"], no = ["data-dc-standing", "data-dc-active", "aria-checked", "title", "aria-label", "onClick"], ao = /* @__PURE__ */ z({
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
    function r(i, o) {
      i.stopPropagation(), a("set", o);
    }
    return (i, o) => (u(), y("span", {
      class: "dc-standing-control",
      role: "radiogroup",
      "aria-label": `Where the query stands on ${e.name}`
    }, [
      (u(!0), y(W, null, X(s.value, (c) => (u(), y("button", {
        key: c.sign,
        type: "button",
        role: "radio",
        class: "dc-standing-control__choice",
        "data-dc-standing": c.standing ?? "none",
        "data-dc-active": l(c.standing) ? "true" : "false",
        "aria-checked": l(c.standing),
        title: c.hint,
        "aria-label": c.hint,
        onClick: (d) => r(d, c.standing)
      }, M(c.sign), 9, no))), 128))
    ], 8, to));
  }
}), an = /* @__PURE__ */ j(ao, [["__scopeId", "data-v-5524dca6"]]), qa = /* @__PURE__ */ z({
  __name: "RowStanding",
  props: {
    entry: {}
  },
  setup(e) {
    const t = e, n = ee(), a = f(() => ba(t.entry.entity, t.entry.row)), s = f(() => yn(n.query.value.expr, a.value));
    function l(r) {
      n.setExpression(Xt(n.query.value.expr, a.value, r));
    }
    return (r, i) => a.value !== null ? (u(), A(an, {
      key: 0,
      class: "dc-row-standing",
      standing: s.value,
      name: e.entry.parts.identity,
      onSet: l
    }, null, 8, ["standing", "name"])) : L("", !0);
  }
}), so = ["href", "title", "aria-label"], lo = /* @__PURE__ */ z({
  __name: "OpenMark",
  props: {
    entry: {}
  },
  setup(e) {
    const t = e, n = ee(), a = f(() => {
      const s = t.entry.row, l = n.recordHref?.(s) ?? null;
      return l ? n.pressHref(s) === l ? null : l : null;
    });
    return (s, l) => a.value ? (u(), y("a", {
      key: 0,
      class: "dc-open",
      href: a.value,
      target: "_blank",
      rel: "noopener noreferrer",
      title: a.value,
      "aria-label": `Open ${e.entry.parts.identity} in a new tab`,
      onClick: l[0] || (l[0] = Ne(() => {
      }, ["stop"]))
    }, "↗", 8, so)) : L("", !0);
  }
}), ft = /* @__PURE__ */ j(lo, [["__scopeId", "data-v-b00f390d"]]), ro = /* @__PURE__ */ z({
  __name: "ScopeMark",
  props: {
    entry: {}
  },
  setup(e) {
    const t = e, n = ee(), a = f(
      () => n.narrowsOnPress.value ? null : t.entry.entity?.scope ?? null
    ), s = H(null);
    function l(d) {
      s.value = lt(d).exclude ? "out" : "in";
    }
    function r(d) {
      l(d), window.addEventListener("keydown", l), window.addEventListener("keyup", l);
    }
    function i() {
      s.value = null, window.removeEventListener("keydown", l), window.removeEventListener("keyup", l);
    }
    we(i);
    const o = f(() => a.value ? n.drillHref(t.entry.row, null) : null);
    function c(d, v) {
      v.stopPropagation(), n.drill(t.entry.row, null, d);
    }
    return (d, v) => a.value ? (u(), A(se, {
      key: 0,
      class: "dc-scope",
      href: o.value,
      "data-dc-pending": s.value ?? void 0,
      title: `Narrow everything to ${a.value}: ${e.entry.row.id} — ⌥-click to leave it out`,
      "aria-label": `Narrow everything to ${e.entry.parts.identity}`,
      onPointerenter: r,
      onPointermove: l,
      onPointerleave: i,
      onPress: c
    }, {
      default: Y(() => [...v[0] || (v[0] = [
        Z(" → ", -1)
      ])]),
      _: 1
    }, 8, ["href", "data-dc-pending", "title", "aria-label"])) : L("", !0);
  }
}), vt = /* @__PURE__ */ j(ro, [["__scopeId", "data-v-05d2c233"]]), oo = ["checked", "aria-label"], Fe = /* @__PURE__ */ z({
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
    return (s, l) => (u(), y("input", {
      class: "dc-tick",
      type: "checkbox",
      checked: e.selected,
      "aria-label": `Select ${e.name}`,
      onClick: a
    }, null, 8, oo));
  }
}), io = { class: "dc-card__top dc-mono" }, co = { class: "dc-card__lead" }, uo = {
  key: 2,
  class: "dc-card__entity"
}, fo = { class: "dc-card__top-right" }, vo = { class: "dc-card__names" }, po = { class: "dc-card__primary" }, ho = {
  key: 0,
  class: "dc-card__secondary dc-mono"
}, mo = {
  key: 1,
  class: "dc-card__facts dc-mono"
}, yo = ["title"], go = { class: "dc-card__fact-label" }, _o = {
  key: 0,
  class: "dc-card__metrics dc-mono"
}, wo = {
  key: 0,
  class: "dc-card__date"
}, ko = /* @__PURE__ */ z({
  __name: "CardsView",
  setup(e) {
    const t = ee(), n = He(), a = f(() => t.isEverything.value), s = (r) => r.entity?.card === "picture", l = f(() => n.value.length > 0 && n.value.every(s));
    return (r, i) => (u(), y("div", {
      class: de(["dc-cards", { "dc-cards--pictures": l.value }])
    }, [
      (u(!0), y(W, null, X(k(n), (o) => (u(), y("div", {
        key: o.key,
        class: de(["dc-card", { "dc-card--picture": s(o) }])
      }, [
        x("div", io, [
          x("span", co, [
            k(t).selectable.value ? (u(), A(Fe, {
              key: 0,
              row: o.row,
              selected: o.selected,
              name: o.parts.identity
            }, null, 8, ["row", "selected", "name"])) : L("", !0),
            s(o) ? L("", !0) : (u(), y(W, { key: 1 }, [
              Z(M(o.ordinal), 1)
            ], 64)),
            a.value ? (u(), y("span", uo, M(o.entityLabel), 1)) : L("", !0)
          ]),
          x("span", fo, [
            o.parts.state && !s(o) ? (u(), A(je, {
              key: 0,
              status: o.parts.state
            }, null, 8, ["status"])) : L("", !0),
            s(o) ? (u(), A(wn, {
              key: 1,
              entry: o
            }, null, 8, ["entry"])) : (u(), A(qa, {
              key: 2,
              entry: o
            }, null, 8, ["entry"])),
            Q(vt, { entry: o }, null, 8, ["entry"]),
            Q(ft, { entry: o }, null, 8, ["entry"]),
            k(t).pinnable.value ? (u(), A(_n, {
              key: 3,
              row: o.row,
              name: o.parts.identity,
              pinned: o.pinned
            }, null, 8, ["row", "name", "pinned"])) : L("", !0)
          ])
        ]),
        Q(se, {
          class: "dc-card__open",
          href: k(t).pressHref(o.row),
          onPress: (c) => k(t).activate(o.row, c)
        }, {
          default: Y(() => [
            o.parts.image ? (u(), A(Ft, {
              key: 0,
              class: "dc-card__image",
              src: o.parts.image
            }, null, 8, ["src"])) : L("", !0),
            x("span", vo, [
              x("span", po, M(o.parts.identity), 1),
              s(o) ? L("", !0) : (u(), y("span", ho, M(o.parts.reference), 1)),
              o.parts.facts.length ? (u(), y("span", mo, [
                (u(!0), y(W, null, X(o.parts.facts, (c) => (u(), y("span", {
                  key: c.column.key ?? c.label,
                  class: "dc-card__fact",
                  title: c.title || void 0
                }, [
                  x("span", go, M(c.label), 1),
                  Z(" " + M(c.text), 1)
                ], 8, yo))), 128))
              ])) : L("", !0)
            ])
          ]),
          _: 2
        }, 1032, ["href", "onPress"]),
        s(o) ? L("", !0) : (u(), y("div", _o, [
          (u(!0), y(W, null, X(o.parts.metrics.slice(0, 2), (c) => (u(), A(dt, {
            key: c.column.key ?? c.label,
            entry: o,
            column: c.column
          }, {
            default: Y(() => [
              Z(M(c.label) + " " + M(c.text), 1)
            ]),
            _: 2
          }, 1032, ["entry", "column"]))), 128)),
          o.parts.updated ? (u(), y("span", wo, M(o.parts.updated), 1)) : L("", !0)
        ]))
      ], 2))), 128))
    ], 2));
  }
}), Va = /* @__PURE__ */ j(ko, [["__scopeId", "data-v-fd252138"]]), bo = { class: "dc-grid" }, $o = { class: "dc-tile__scrim" }, xo = { class: "dc-tile__top dc-mono" }, So = { class: "dc-tile__chip" }, Co = { class: "dc-tile__caption" }, Po = { class: "dc-tile__secondary dc-truncate" }, Mo = { class: "dc-tile__primary" }, Eo = /* @__PURE__ */ z({
  __name: "GridView",
  setup(e) {
    const t = ee(), n = He();
    return (a, s) => (u(), y("div", bo, [
      (u(!0), y(W, null, X(k(n), (l) => (u(), y("div", {
        key: l.key,
        class: "dc-grid__cell"
      }, [
        Q(se, {
          class: "dc-tile",
          style: oe({ "--dc-tile-tint": l.parts.tint ?? void 0 }),
          href: k(t).pressHref(l.row),
          onPress: (r) => k(t).activate(l.row, r)
        }, {
          default: Y(() => [
            l.parts.image ? (u(), A(Ft, {
              key: 0,
              class: "dc-tile__image",
              src: l.parts.image
            }, null, 8, ["src"])) : L("", !0),
            x("span", $o, [
              x("span", xo, [
                x("span", So, M(l.ordinal), 1)
              ]),
              x("span", Co, [
                x("span", Po, M(l.parts.reference), 1),
                x("span", Mo, M(l.parts.identity), 1)
              ])
            ])
          ]),
          _: 2
        }, 1032, ["style", "href", "onPress"]),
        k(t).selectable.value ? (u(), A(Fe, {
          key: 0,
          class: "dc-grid__tick",
          row: l.row,
          selected: l.selected,
          name: l.parts.identity
        }, null, 8, ["row", "selected", "name"])) : L("", !0)
      ]))), 128))
    ]));
  }
}), Da = /* @__PURE__ */ j(Eo, [["__scopeId", "data-v-89c40a9e"]]);
function Qn(e, t, n, a) {
  return (n - a * (t - 1)) / e;
}
function zt(e, t) {
  return e > 0 ? Math.min(t, e) : t;
}
function Lo(e) {
  return e > 0 ? e : 1 / 0;
}
function To(e, t, n) {
  const { width: a, height: s, gap: l = 0 } = n;
  if (!e.length) return [];
  if (!(a > 0) || !(s > 0)) return [{ items: [...e], height: s, filled: !1 }];
  const r = [];
  let i = [], o = 0, c = 0;
  for (const d of e) {
    const v = t(d), _ = Math.max(v.ratio, Number.EPSILON), p = v.height && v.height > 0 ? Math.max(c, v.height) : c, g = zt(p, s), m = Qn(o + _, i.length + 1, a, l);
    if (m > g) {
      i.push(d), o += _, c = p;
      continue;
    }
    const b = zt(c, s), S = i.length ? Qn(o, i.length, a, l) : 1 / 0;
    S <= Lo(c) && S - b < g - m ? (r.push({ items: i, height: S, filled: !0 }), i = [d], o = _, c = v.height && v.height > 0 ? v.height : 0) : (r.push({ items: [...i, d], height: m, filled: !0 }), i = [], o = 0, c = 0);
  }
  return i.length && r.push({ items: i, height: zt(c, s), filled: !1 }), r;
}
const Oo = { class: "dc-images" }, Ao = {
  key: 1,
  class: "dc-images__blank",
  "aria-hidden": "true"
}, No = 240, ht = 8, Io = 1, Ro = /* @__PURE__ */ z({
  __name: "ImagesView",
  setup(e) {
    const t = ee(), n = He(), a = Sn(/* @__PURE__ */ new Map()), s = Sn(/* @__PURE__ */ new Set());
    function l(g, m) {
      const b = m.target;
      b.naturalWidth > 0 && b.naturalHeight > 0 && a.set(g, { width: b.naturalWidth, height: b.naturalHeight });
    }
    function r(g) {
      const m = g.parts.image;
      return m && !s.has(m) ? m : null;
    }
    function i(g) {
      const m = r(g);
      return m ? a.get(m) : void 0;
    }
    function o(g) {
      const m = i(g);
      return m ? { ratio: m.width / m.height, height: m.height } : { ratio: Io };
    }
    const c = H(null), d = H(0);
    let v = null;
    function _() {
      d.value = c.value?.clientWidth ?? 0;
    }
    ct(() => {
      _(), !(!c.value || typeof ResizeObserver > "u") && (v = new ResizeObserver(_), v.observe(c.value));
    }), we(() => {
      v?.disconnect(), v = null;
    });
    const p = f(() => {
      const g = To(n.value, o, {
        width: d.value,
        height: No,
        gap: ht
      }), m = [];
      let b = 0;
      for (const S of g) {
        let N = 0;
        for (const h of S.items) {
          const w = o(h).ratio * S.height, P = i(h), q = P !== void 0 && P.height < S.height;
          m.push({
            entry: h,
            style: {
              top: `${b}px`,
              left: `${N}px`,
              width: `${w}px`,
              height: `${S.height}px`
            },
            picture: q ? { width: `${P.width}px`, height: `${P.height}px` } : { width: "100%", height: "100%" }
          }), N += w + ht;
        }
        b += S.height + ht;
      }
      return { boxes: m, height: g.length ? b - ht : 0 };
    });
    return (g, m) => (u(), y("div", Oo, [
      x("div", {
        ref_key: "wall",
        ref: c,
        class: "dc-images__wall",
        style: oe({ height: `${p.value.height}px` })
      }, [
        (u(!0), y(W, null, X(p.value.boxes, ({ entry: b, style: S, picture: N }) => (u(), y("div", {
          key: b.key,
          class: "dc-images__cell",
          style: oe(S)
        }, [
          Q(se, {
            class: "dc-images__open",
            title: b.parts.identity,
            "aria-label": b.parts.identity,
            href: k(t).pressHref(b.row),
            onPress: (h) => k(t).activate(b.row, h)
          }, {
            default: Y(() => [
              r(b) ? (u(), A(Ft, {
                key: 0,
                class: "dc-images__picture",
                style: oe(N),
                src: r(b),
                onLoad: (h) => l(r(b), h),
                onError: (h) => s.add(r(b))
              }, null, 8, ["style", "src", "onLoad", "onError"])) : (u(), y("span", Ao, M(b.parts.identity), 1))
            ]),
            _: 2
          }, 1032, ["title", "aria-label", "href", "onPress"]),
          k(t).selectable.value ? (u(), A(Fe, {
            key: 0,
            class: "dc-images__tick",
            row: b.row,
            selected: b.selected,
            name: b.parts.identity
          }, null, 8, ["row", "selected", "name"])) : L("", !0)
        ], 4))), 128))
      ], 4)
    ]));
  }
}), Ka = /* @__PURE__ */ j(Ro, [["__scopeId", "data-v-2d267370"]]), Bo = { class: "dc-links" }, Ho = { class: "dc-link__primary dc-truncate" }, Fo = { class: "dc-link__secondary dc-mono dc-truncate" }, qo = /* @__PURE__ */ z({
  __name: "LinksView",
  setup(e) {
    const t = ee(), n = He();
    return (a, s) => (u(), y("div", Bo, [
      (u(!0), y(W, null, X(k(n), (l) => (u(), y("span", {
        key: l.key,
        class: "dc-links__item"
      }, [
        k(t).selectable.value ? (u(), A(Fe, {
          key: 0,
          row: l.row,
          selected: l.selected,
          name: l.parts.identity
        }, null, 8, ["row", "selected", "name"])) : L("", !0),
        Q(se, {
          class: "dc-link",
          href: k(t).pressHref(l.row),
          onPress: (r) => k(t).activate(l.row, r)
        }, {
          default: Y(() => [
            x("span", Ho, M(l.parts.identity), 1),
            x("span", Fo, M(l.parts.reference), 1)
          ]),
          _: 2
        }, 1032, ["href", "onPress"])
      ]))), 128))
    ]));
  }
}), Wa = /* @__PURE__ */ j(qo, [["__scopeId", "data-v-de6c9a0f"]]), Vo = {
  class: "dc-list",
  role: "list"
}, Do = { class: "dc-list__ordinal dc-mono" }, Ko = { class: "dc-list__identity" }, Wo = ["title"], zo = ["title"], jo = {
  key: 1,
  class: "dc-list__entity dc-mono"
}, Uo = { class: "dc-list__metrics dc-mono" }, Qo = { class: "dc-list__trailing" }, Go = /* @__PURE__ */ z({
  __name: "ListView",
  setup(e) {
    const t = ee(), n = He(), a = f(() => t.isEverything.value);
    return (s, l) => (u(), y("div", Vo, [
      (u(!0), y(W, null, X(k(n), (r) => (u(), y("div", {
        key: r.key,
        class: "dc-list__row",
        role: "listitem"
      }, [
        k(t).selectable.value ? (u(), A(Fe, {
          key: 0,
          class: "dc-list__tick",
          row: r.row,
          selected: r.selected,
          name: r.parts.identity
        }, null, 8, ["row", "selected", "name"])) : L("", !0),
        Q(qa, {
          class: "dc-list__standing",
          entry: r
        }, null, 8, ["entry"]),
        Q(se, {
          class: "dc-list__open",
          href: k(t).pressHref(r.row),
          onPress: (i) => k(t).activate(r.row, i)
        }, {
          default: Y(() => [
            x("span", Do, M(r.ordinal), 1),
            x("span", Ko, [
              x("span", {
                class: "dc-list__primary dc-truncate",
                title: r.parts.identity
              }, M(r.parts.identity), 9, Wo),
              x("span", {
                class: "dc-list__secondary dc-mono dc-truncate",
                title: r.parts.reference || void 0
              }, M(r.parts.reference), 9, zo)
            ])
          ]),
          _: 2
        }, 1032, ["href", "onPress"]),
        a.value ? (u(), y("span", jo, M(r.entityLabel), 1)) : L("", !0),
        x("span", Uo, [
          (u(!0), y(W, null, X(r.parts.metrics.slice(0, 2), (i) => (u(), A(dt, {
            key: i.column.key ?? i.label,
            entry: r,
            column: i.column
          }, null, 8, ["entry", "column"]))), 128))
        ]),
        x("span", Qo, [
          r.parts.state ? (u(), A(je, {
            key: 0,
            status: r.parts.state
          }, null, 8, ["status"])) : L("", !0),
          Q(vt, { entry: r }, null, 8, ["entry"]),
          Q(ft, { entry: r }, null, 8, ["entry"]),
          k(t).pinnable.value ? (u(), A(_n, {
            key: 1,
            row: r.row,
            name: r.parts.identity,
            pinned: r.pinned
          }, null, 8, ["row", "name", "pinned"])) : L("", !0)
        ])
      ]))), 128))
    ]));
  }
}), sn = /* @__PURE__ */ j(Go, [["__scopeId", "data-v-a2cb9c3f"]]), Yo = { class: "dc-preview" }, Xo = { class: "dc-preview__pager dc-mono" }, Jo = ["disabled"], Zo = { "aria-live": "polite" }, ei = ["disabled"], ti = {
  key: 0,
  class: "dc-preview__card"
}, ni = ["src"], ai = { class: "dc-preview__body" }, si = { class: "dc-preview__top" }, li = { class: "dc-preview__badges" }, ri = { class: "dc-preview__entity dc-mono" }, oi = { class: "dc-preview__marks" }, ii = { class: "dc-preview__primary" }, ci = { class: "dc-preview__secondary dc-mono" }, ui = { class: "dc-preview__fields" }, di = { class: "dc-preview__key" }, fi = { class: "dc-preview__value dc-mono" }, vi = /* @__PURE__ */ z({
  __name: "PreviewView",
  setup(e) {
    const t = ee(), n = He(), a = H(0);
    te(n, (o) => {
      a.value > o.length - 1 && (a.value = Math.max(0, o.length - 1));
    });
    const s = f(() => n.value[a.value]), l = f(() => {
      const o = s.value;
      if (!o) return [];
      const c = pe(o.columns, "reference"), d = pe(o.columns, "updated");
      return [
        ...c ? [{ key: c.label ?? "Reference", value: o.parts.reference, column: null }] : [],
        ...o.parts.metrics.map((v) => ({
          key: v.label,
          value: v.text,
          column: v.column
        })),
        ...d ? [{ key: d.label ?? "Updated", value: o.parts.updated, column: null }] : []
      ];
    }), r = f(() => {
      if (!n.value.length) return "0 / 0";
      const o = t.total.value > n.value.length ? ` of ${t.total.value}` : "";
      return `${a.value + 1} / ${n.value.length}${o}`;
    }), i = (o) => {
      const c = n.value.length;
      c && (a.value = Math.min(c - 1, Math.max(0, a.value + o)));
    };
    return (o, c) => (u(), y("div", Yo, [
      x("div", Xo, [
        x("button", {
          type: "button",
          class: "dc-preview__step",
          "aria-label": "Previous result",
          disabled: a.value === 0,
          onClick: c[0] || (c[0] = (d) => i(-1))
        }, " ‹ ", 8, Jo),
        x("span", Zo, M(r.value), 1),
        x("button", {
          type: "button",
          class: "dc-preview__step",
          "aria-label": "Next result",
          disabled: a.value >= k(n).length - 1,
          onClick: c[1] || (c[1] = (d) => i(1))
        }, " › ", 8, ei)
      ]),
      s.value ? (u(), y("div", ti, [
        x("div", {
          class: "dc-preview__media",
          style: oe({ background: s.value.parts.tint ?? void 0 }),
          "aria-hidden": "true"
        }, [
          s.value.parts.image ? (u(), y("img", {
            key: 0,
            class: "dc-preview__image",
            src: s.value.parts.image,
            alt: ""
          }, null, 8, ni)) : (u(), y(W, { key: 1 }, [
            Z(" preview ")
          ], 64))
        ], 4),
        x("div", ai, [
          x("div", si, [
            x("span", li, [
              k(t).selectable.value ? (u(), A(Fe, {
                key: 0,
                row: s.value.row,
                selected: s.value.selected,
                name: s.value.parts.identity
              }, null, 8, ["row", "selected", "name"])) : L("", !0),
              s.value.parts.state ? (u(), A(je, {
                key: 1,
                status: s.value.parts.state
              }, null, 8, ["status"])) : L("", !0),
              x("span", ri, M(s.value.entityLabel), 1)
            ]),
            x("span", oi, [
              Q(wn, { entry: s.value }, null, 8, ["entry"]),
              Q(vt, { entry: s.value }, null, 8, ["entry"]),
              Q(ft, { entry: s.value }, null, 8, ["entry"]),
              k(t).pinnable.value ? (u(), A(_n, {
                key: 0,
                row: s.value.row,
                name: s.value.parts.identity,
                pinned: s.value.pinned
              }, null, 8, ["row", "name", "pinned"])) : L("", !0)
            ])
          ]),
          x("div", null, [
            x("div", ii, M(s.value.parts.identity), 1),
            x("div", ci, M(s.value.parts.reference), 1)
          ]),
          x("dl", ui, [
            (u(!0), y(W, null, X(l.value, (d) => (u(), y("div", {
              key: d.key,
              class: "dc-preview__field"
            }, [
              x("dt", di, M(d.key), 1),
              x("dd", fi, [
                d.column && s.value ? (u(), A(dt, {
                  key: 0,
                  entry: s.value,
                  column: d.column
                }, null, 8, ["entry", "column"])) : (u(), y(W, { key: 1 }, [
                  Z(M(d.value), 1)
                ], 64))
              ])
            ]))), 128))
          ]),
          Q(se, {
            class: "dc-preview__open",
            href: s.value ? k(t).pressHref(s.value.row) : null,
            onPress: c[2] || (c[2] = (d) => s.value && k(t).activate(s.value.row, d))
          }, {
            default: Y(() => [...c[3] || (c[3] = [
              Z(" Open record → ", -1)
            ])]),
            _: 1
          }, 8, ["href"])
        ])
      ])) : L("", !0)
    ]));
  }
}), za = /* @__PURE__ */ j(vi, [["__scopeId", "data-v-59e0d33b"]]);
function pi(e) {
  const t = le(e);
  if (t.length !== 1) return /* @__PURE__ */ new Set();
  const n = /* @__PURE__ */ new Map();
  for (const a of t[0]) {
    if (a.kind !== "field" || a.negated || We(a) || a.comparator !== "=" && a.comparator !== ":") continue;
    const s = a.field.toLowerCase();
    n.set(s, [...n.get(s) ?? [], a]);
  }
  return new Set(
    [...n].flatMap(
      ([a, s]) => s.length === 1 && s[0].comparator === "=" ? [a] : []
    )
  );
}
function hi(e, t, n) {
  const a = pi(t);
  return a.size ? e.filter((s) => {
    const l = (s.key ?? s.field)?.toLowerCase();
    return l === void 0 || !a.has(l) || s.role === "identity" || n.some((r) => Array.isArray(ue(s, r))) ? !0 : new Set(n.map((r) => Le(s, r))).size > 1;
  }) : e;
}
function mi() {
  const e = ee();
  return f(
    () => hi(
      _s(e.schema.value, e.entity.value),
      e.liveQuery.value.expr,
      e.rows.value
    )
  );
}
function kn(e, t) {
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
function ja(e, t) {
  const n = e.narrowsOnPress.value ? Bt(t.entity, t.row) : null;
  return n ? { term: n, name: t.parts.identity, alone: t.entity?.narrowsAlone === !0 } : null;
}
const yi = /* @__PURE__ */ z({
  __name: "CellNarrow",
  props: {
    entry: {},
    column: {},
    narrowings: {},
    truncates: { type: Boolean }
  },
  setup(e) {
    const t = e, n = ee(), a = f(() => Le(t.column, t.entry.row));
    function s(v, _ = !1) {
      return v.entity !== void 0 ? `entity:${v.entity}` : _e({ ...v.term, ..._ ? { negated: !0 } : {} });
    }
    function l(v, _ = !1) {
      return v.entity !== void 0 ? n.query.value.expr : at(n.query.value.expr, s(v, _));
    }
    function r(v) {
      return v.entity ?? n.query.value.entity;
    }
    function i(v) {
      return n.narrowHref(l(v), r(v));
    }
    function o(v) {
      return v.entity !== void 0 ? `Show ${n.schema.value.entities.find((p) => p.key === v.entity)?.label ?? a.value} only` : `Narrow to ${s(v)}
⌥-press to leave these out`;
    }
    function c(v) {
      return v.entity !== void 0 ? null : { term: s(v) };
    }
    function d(v, _, p) {
      p.stopPropagation(), n.narrow(l(v, _.exclude), r(v));
    }
    return (v, _) => (u(), y("span", {
      class: de(["dc-cell__text", { "dc-truncate": e.truncates }])
    }, [
      (u(!0), y(W, null, X(e.narrowings, (p, g) => (u(), y(W, {
        key: s(p)
      }, [
        g > 0 ? (u(), y(W, { key: 0 }, [
          Z(", ")
        ], 64)) : L("", !0),
        Q(se, Ke({
          class: "dc-narrow",
          href: i(p),
          title: o(p),
          selectable: ""
        }, on(k(kn)(k(n), c(p))), {
          onPress: (m, b) => d(p, m, b)
        }), {
          default: Y(() => [
            G(v.$slots, "default", {}, () => [
              Z(M(p.label ?? a.value), 1)
            ], !0)
          ]),
          _: 2
        }, 1040, ["href", "title", "onPress"])
      ], 64))), 128))
    ], 2));
  }
}), Gn = /* @__PURE__ */ j(yi, [["__scopeId", "data-v-6e649daa"]]), gi = /* @__PURE__ */ new Set(["entitykey", "entitylabel"]), _i = /* @__PURE__ */ new Set(["ordinal", "image", "component", "date"]), wi = 4;
function Ua(e) {
  return (e.field ?? e.key)?.toLowerCase();
}
function Qa(e) {
  return e.narrow === !1 || e.role === "identity" || e.activate || e.click || e.drill ? !1 : !_i.has(e.kind ?? "text") && Ua(e) !== void 0;
}
function ki(e, t) {
  if (Number.isInteger(e)) return e;
  const n = 10 ** wi;
  return (t ? Math.ceil(e * n - 1e-6) : Math.floor(e * n + 1e-6)) / n;
}
function bi(e, t) {
  let n = 1 / 0, a = -1 / 0;
  for (const s of t) {
    const l = ue(e, s);
    typeof l != "number" || !Number.isFinite(l) || (l < n && (n = l), l > a && (a = l));
  }
  return n <= a ? { min: n, max: a } : null;
}
function $i(e, t, n, a = null) {
  if (!Qa(e)) return [];
  const s = Ua(e);
  if (gi.has(s) && !e.value)
    return t.entityKey ? [{ label: null, entity: t.entityKey }] : [];
  if (e.flags)
    return Object.entries(e.flags).filter(([o]) => t.fields[o] === !0).map(([o, c]) => ({
      label: c,
      term: { kind: "field", field: o.toLowerCase(), comparator: ":", value: "true" }
    }));
  const l = ue(e, t), r = n?.facets.find((o) => o.key.toLowerCase() === s);
  if (typeof l == "number") {
    if (!Number.isFinite(l)) return [];
    const o = r?.kind === "range" ? { min: r.min, max: r.max } : a, c = e.narrow === "<=" || e.narrow !== ">=" && (!o || l - o.min <= o.max - l);
    return [{
      label: null,
      term: { kind: "field", field: s, comparator: c ? "<=" : ">=", value: String(ki(l, c)) }
    }];
  }
  return (Array.isArray(l) ? l : [l]).filter(
    (o) => typeof o == "string" && o !== ""
  ).map((o) => ({
    label: Array.isArray(l) ? o : null,
    term: { kind: "field", field: s, comparator: "=", value: o }
  }));
}
const Yn = /* @__PURE__ */ new WeakMap();
function xi(e, t) {
  let n = Yn.get(e);
  return n || Yn.set(e, n = /* @__PURE__ */ new Map()), n.has(t) || n.set(t, bi(t, e)), n.get(t);
}
const Si = /* @__PURE__ */ z({
  __name: "ColumnCell",
  props: {
    column: {},
    entry: {}
  },
  setup(e) {
    const t = e, n = ee(), a = f(() => t.column.kind ?? "text"), s = f(() => ue(t.column, t.entry.row)), l = f(
      () => a.value === "ordinal" ? t.entry.ordinal : Le(t.column, t.entry.row)
    ), r = f(() => s.value), i = f(() => t.column.activate === !0 || !!t.column.click), o = f(() => Qt(t.column)), c = f(() => sa(t.column, t.entry.row)), d = f(() => {
      if (!Qa(t.column)) return [];
      const g = typeof s.value == "number" ? xi(n.rows.value, t.column) : null;
      return $i(t.column, t.entry.row, t.entry.entity ?? null, g);
    });
    function v(g) {
      i.value && (g.stopPropagation(), _(lt(g)));
    }
    function _(g) {
      t.column.click?.(t.entry.row, g), t.column.activate && n.activate(t.entry.row, g);
    }
    const p = f(() => t.column.click ? t.column.clickHref?.(t.entry.row) ?? null : t.column.activate ? n.pressHref(t.entry.row) : null);
    return (g, m) => a.value === "component" && e.column.component ? (u(), A(Ze(e.column.component), {
      key: 0,
      row: e.entry.row,
      entry: e.entry,
      value: s.value,
      column: e.column
    }, null, 8, ["row", "entry", "value", "column"])) : a.value === "status" && d.value.length ? (u(), A(Gn, {
      key: 1,
      entry: e.entry,
      column: e.column,
      narrowings: d.value,
      truncates: !1
    }, {
      default: Y(() => [
        Q(je, { status: r.value }, null, 8, ["status"])
      ]),
      _: 1
    }, 8, ["entry", "column", "narrowings"])) : a.value === "status" ? (u(), A(je, {
      key: 2,
      status: r.value
    }, null, 8, ["status"])) : a.value === "image" ? (u(), A(Ft, {
      key: 3,
      class: "dc-cell__image",
      src: typeof s.value == "string" ? s.value : "",
      style: oe({ maxHeight: e.column.height }),
      onClick: v
    }, null, 8, ["src", "style"])) : e.column.drill || e.column.click && e.column.role === "metric" ? (u(), A(dt, {
      key: 4,
      entry: e.entry,
      column: e.column
    }, null, 8, ["entry", "column"])) : i.value ? (u(), A(se, Ke({
      key: 5,
      class: ["dc-table__open", { "dc-truncate": o.value }],
      href: p.value,
      title: c.value
    }, on(e.column.activate ? k(kn)(k(n), k(ja)(k(n), e.entry)) : {}), {
      onPress: m[0] || (m[0] = (b, S) => {
        S.stopPropagation(), _(b);
      })
    }), {
      default: Y(() => [
        Z(M(l.value), 1)
      ]),
      _: 1
    }, 16, ["class", "href", "title"])) : d.value.length ? (u(), A(Gn, {
      key: 6,
      entry: e.entry,
      column: e.column,
      narrowings: d.value,
      truncates: o.value
    }, null, 8, ["entry", "column", "narrowings", "truncates"])) : (u(), y("span", {
      key: 7,
      class: de(["dc-cell__text", { "dc-truncate": o.value }])
    }, M(l.value), 3));
  }
}), Xn = /* @__PURE__ */ j(Si, [["__scopeId", "data-v-d07057a1"]]), Ci = {
  key: 0,
  class: "dc-table__none"
}, Pi = { class: "dc-table__detail" }, Mi = ["data-dc-wrap", "data-dc-row-links"], Ei = { "data-dc-stuck": "" }, Li = {
  key: 0,
  class: "dc-table__pick",
  scope: "col"
}, Ti = {
  key: 1,
  class: "dc-table__standing",
  scope: "col"
}, Oi = ["data-dc-align", "data-dc-hide", "aria-sort", "title"], Ai = {
  key: 2,
  class: "dc-table__head"
}, Ni = { "data-dc-scroll": "" }, Ii = ["onClick"], Ri = {
  key: 0,
  class: "dc-table__pick"
}, Bi = {
  key: 1,
  class: "dc-table__standing"
}, Hi = ["data-dc-align", "data-dc-hide", "title"], Fi = {
  key: 1,
  class: "dc-table__name"
}, qi = /* @__PURE__ */ z({
  __name: "TableView",
  setup(e) {
    const t = ee(), n = He(), a = mi();
    function s(E, U) {
      if (!t.rowLinks?.value || Pa()) return;
      const T = t.pressHref(E);
      if (T && Zt(U)) {
        Jt(T, U);
        return;
      }
      t.activate(E, lt(U));
    }
    const l = f(() => t.rowLinks?.value ? new Map(n.value.map((E) => [E.key, t.pressHref(E.row)])) : /* @__PURE__ */ new Map()), r = f(
      () => a.value.find((E) => E.role === "identity") ?? a.value[0]
    );
    function i(E, U, T) {
      T.stopPropagation(), t.activate(E, U);
    }
    function o(E) {
      const U = ca(E, t.entity.value, t.schema.value), T = U ? `Shortcut: ${U}` : void 0;
      return [E.hint, T].filter(Boolean).join(`
`) || void 0;
    }
    const c = f(() => {
      const E = a.value.find((T) => T.scope);
      return E || ((t.entity.value ? !!t.entity.value.href : t.entities.value.some((T) => T.href)) ? a.value.find((T) => T.activate) : void 0);
    }), d = f(() => {
      const E = (U) => !!U.scope && U.standing !== !1;
      return t.entity.value ? E(t.entity.value) : t.entities.value.some(E);
    }), v = (E) => ba(E.entity, E.row), _ = (E) => yn(t.query.value.expr, v(E));
    function p(E, U) {
      t.setExpression(Xt(t.query.value.expr, v(E), U));
    }
    const g = f(() => {
      const E = n.value.filter((T) => v(T) !== null), U = E.filter((T) => T.selected);
      return U.length ? U : E;
    }), m = f(() => g.value.some((E) => E.selected)), b = f(() => {
      const E = g.value[0];
      return E ? _(E) : null;
    }), S = f(
      () => g.value.some((E) => _(E) !== b.value)
    ), N = f(
      () => m.value ? "the ticked rows" : "every row on this page"
    );
    function h(E) {
      t.setExpression(
        g.value.reduce(
          (U, T) => Xt(U, v(T), E),
          t.query.value.expr
        )
      );
    }
    const w = f(
      () => a.value.some((E) => E.kind === "image" || E.height !== void 0)
    );
    function P(E) {
      E && (t.query.value.sort === E ? t.toggleDirection() : t.setSort(E));
    }
    function q(E) {
      return E ? t.query.value.sort === E ? t.hrefFor({ dir: t.query.value.dir === "desc" ? "asc" : "desc" }) : t.hrefFor({ sort: E }) : null;
    }
    const ne = f(() => t.entity.value?.label ?? "The result set"), I = f(() => new Set(t.sorts.value.map((E) => E.key))), B = (E) => E.sort !== void 0 && I.value.has(E.sort), F = (E) => {
      if (B(E))
        return t.query.value.sort !== E.sort ? "none" : t.query.value.dir === "desc" ? "descending" : "ascending";
    };
    function ce(E) {
      return [
        Tn(E),
        E.muted ? "dc-table__muted" : "",
        E.mono ? "dc-mono" : "",
        Qt(E) ? "dc-truncate" : ""
      ].filter(Boolean).join(" ");
    }
    function ie(E, U) {
      if (!(!Qt(E) || E.activate || E.click))
        return sa(E, U.row);
    }
    const re = f(
      () => a.value.length + (t.selectable.value ? 1 : 0) + (d.value ? 1 : 0)
    );
    return (E, U) => k(a).length ? (u(), y("table", {
      key: 1,
      class: "dc-table",
      "data-dc-wrap": w.value ? "" : void 0,
      "data-dc-row-links": k(t).rowLinks?.value ? "" : void 0,
      style: oe({ "--dc-table-tracks": re.value })
    }, [
      x("thead", Ei, [
        x("tr", null, [
          k(t).selectable.value ? (u(), y("th", Li, [
            Q(Ha)
          ])) : L("", !0),
          d.value ? (u(), y("th", Ti, [
            g.value.length ? (u(), A(an, {
              key: 0,
              standing: b.value,
              mixed: S.value,
              name: N.value,
              onSet: h
            }, null, 8, ["standing", "mixed", "name"])) : L("", !0)
          ])) : L("", !0),
          (u(!0), y(W, null, X(k(a), (T, J) => (u(), y("th", {
            key: k(En)(T, J),
            scope: "col",
            class: de(k(Tn)(T)),
            style: oe({ width: T.width }),
            "data-dc-align": k(Ln)(T),
            "data-dc-hide": T.hideBelow,
            "aria-sort": F(T),
            title: o(T)
          }, [
            B(T) ? (u(), A(se, {
              key: 0,
              class: "dc-table__sort",
              href: q(T.sort),
              onPress: (ae) => P(T.sort)
            }, {
              default: Y(() => [
                Z(M(T.label), 1)
              ]),
              _: 2
            }, 1032, ["href", "onPress"])) : (u(), y(W, { key: 1 }, [
              Z(M(T.label), 1)
            ], 64)),
            T.header ? (u(), y("span", Ai, [
              (u(), A(Ze(T.header), {
                column: T,
                entity: k(t).entity.value
              }, null, 8, ["column", "entity"]))
            ])) : L("", !0)
          ], 14, Oi))), 128))
        ])
      ]),
      x("tbody", Ni, [
        (u(!0), y(W, null, X(k(n), (T) => (u(), y("tr", {
          key: T.key,
          class: "dc-table__row",
          onClick: (J) => s(T.row, J)
        }, [
          k(t).selectable.value ? (u(), y("td", Ri, [
            Q(Fe, {
              row: T.row,
              selected: T.selected,
              name: T.parts.identity
            }, null, 8, ["row", "selected", "name"])
          ])) : L("", !0),
          d.value ? (u(), y("td", Bi, [
            v(T) !== null ? (u(), A(an, {
              key: 0,
              standing: _(T),
              name: T.parts.identity,
              onSet: (J) => p(T, J)
            }, null, 8, ["standing", "name", "onSet"])) : L("", !0)
          ])) : L("", !0),
          (u(!0), y(W, null, X(k(a), (J, ae) => (u(), y("td", {
            key: k(En)(J, ae),
            class: de(ce(J)),
            style: oe({ width: J.width }),
            "data-dc-align": k(Ln)(J),
            "data-dc-hide": J.hideBelow,
            title: ie(J, T)
          }, [
            l.value.get(T.key) ? (u(), A(se, Ke({
              key: 0,
              class: "dc-table__cell-link",
              href: l.value.get(T.key),
              tabindex: J === r.value ? void 0 : -1,
              "aria-hidden": J === r.value ? void 0 : "true",
              "aria-label": J === r.value ? T.parts.identity : void 0
            }, on(k(kn)(k(t), k(ja)(k(t), T))), {
              onPress: (ye, ve) => i(T.row, ye, ve)
            }), null, 16, ["href", "tabindex", "aria-hidden", "aria-label", "onPress"])) : L("", !0),
            J === c.value ? (u(), y("span", Fi, [
              Q(Xn, {
                column: J,
                entry: T
              }, null, 8, ["column", "entry"]),
              Q(vt, { entry: T }, null, 8, ["entry"]),
              Q(ft, { entry: T }, null, 8, ["entry"])
            ])) : (u(), A(Xn, {
              key: 2,
              column: J,
              entry: T
            }, null, 8, ["column", "entry"]))
          ], 14, Hi))), 128))
        ], 8, Ii))), 128))
      ])
    ], 12, Mi)) : (u(), y("p", Ci, [
      U[2] || (U[2] = x("span", { class: "dc-table__headline" }, "No columns declared", -1)),
      x("span", Pi, [
        Z(M(ne.value) + " has no ", 1),
        U[0] || (U[0] = x("code", null, "columns", -1)),
        U[1] || (U[1] = Z(" in the schema, so there is no table to draw. ", -1))
      ])
    ]));
  }
}), Ga = /* @__PURE__ */ j(qi, [["__scopeId", "data-v-9945aecc"]]);
function Vi(e) {
  const t = me([]), n = H(!1), a = me(null);
  let s = 0;
  const l = (o, c, d, v, _) => ({
    entity: o,
    rows: e.limit.value > 0 ? c.rows.map((p, g) => Fa(p, g, o, e.isPinned(p.id))) : [],
    total: c.total,
    count: d ? Yt(o) : et(c.total),
    pinned: Di(v, c, _)
  }), r = () => {
    const o = ++s, c = e.query.value, d = e.schema.value, v = e.entities.value, _ = e.limit.value, p = e.within?.value.trim() ?? "", g = fn(c) && !p, m = p ? dn(p, c.expr) : c.expr, b = v.map((S) => ({
      entity: S,
      // Scope the query to this entity, keeping the expression and ordering.
      outcome: e.source.value.query({
        // Each card is the top few of its type, wherever the shell's own
        // result set has been paged to — so this asks for the first page.
        query: { ...c, entity: S.key, expr: m, page: 1 },
        schema: d,
        entity: S,
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
    if (b.every(({ outcome: S }) => !(S instanceof Promise))) {
      t.value = b.map(
        ({ entity: S, outcome: N }) => l(S, N, g, d, m)
      ), a.value = null, n.value = !1;
      return;
    }
    n.value = !0, Promise.all(b.map(({ outcome: S }) => Promise.resolve(S))).then((S) => {
      o === s && (t.value = S.map(
        (N, h) => l(b[h].entity, N, g, d, m)
      ), a.value = null);
    }).catch((S) => {
      o === s && (a.value = S, t.value = []);
    }).finally(() => {
      o === s && (n.value = !1);
    });
  }, i = () => {
    try {
      r();
    } catch (o) {
      a.value = o, t.value = [], n.value = !1;
    }
  };
  return te(
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
function Di(e, t, n) {
  const a = t.rows[0];
  if (t.total !== 1 || t.rows.length !== 1 || !a)
    return !1;
  const s = n.trim();
  if (!s)
    return !1;
  const l = kt(e, a);
  return !!l && ze(s, l) === s;
}
const Ki = ["data-dc-pending", "data-dc-heads-only"], Wi = {
  key: 0,
  class: "dc-types__state",
  role: "alert"
}, zi = {
  key: 1,
  class: "dc-types__state",
  "aria-live": "polite"
}, ji = {
  key: 2,
  class: "dc-types__state"
}, Ui = ["data-dc-empty"], Qi = { class: "dc-type__name" }, Gi = { class: "dc-type__count dc-mono" }, Yi = {
  key: 0,
  class: "dc-type__note dc-mono"
}, Xi = { class: "dc-type__sr" }, Ji = {
  key: 1,
  class: "dc-type__description"
}, Zi = {
  key: 0,
  class: "dc-type__empty"
}, ec = { class: "dc-type__identity" }, tc = { class: "dc-type__primary dc-truncate" }, nc = { class: "dc-type__secondary dc-mono dc-truncate" }, ac = { class: "dc-type__trailing dc-mono" }, sc = { class: "dc-type__metric-value" }, lc = { class: "dc-type__metric-label" }, rc = {
  key: 0,
  class: "dc-type__date"
}, oc = /* @__PURE__ */ z({
  __name: "TypeCardsView",
  setup(e) {
    const t = ee(), { previews: n, pending: a, error: s } = Vi({
      source: t.source,
      schema: t.schema,
      // The query as the results are read under it, so a word being typed in the
      // header narrows the cards as it narrows any list — see `liveQuery`.
      query: t.liveQuery,
      entities: t.entities,
      limit: t.previewsPerType,
      within: t.within,
      isPinned: (d) => t.isPinnedId(d)
    }), l = f(
      () => !t.isPristine.value || !!t.within.value || t.drafting.value
    ), r = f(() => t.previewsPerType.value <= 0), i = f(
      () => new Set(n.value.filter((d) => d.pinned).map((d) => d.entity.key))
    ), o = (d) => {
      const { keepsCard: v } = d;
      return Array.isArray(v) ? v.some((_) => i.value.has(_)) : !!v;
    }, c = f(
      () => n.value.filter(
        (d) => !d.pinned && (l.value || !d.entity.nested) && (d.total > 0 || o(d.entity) || !r.value && d.entity.create)
      )
    );
    return (d, v) => (u(), y("div", {
      class: "dc-types",
      "data-dc-pending": k(a) ? "true" : "false",
      "data-dc-heads-only": r.value ? "true" : "false"
    }, [
      G(d.$slots, "before", {}, void 0, !0),
      k(s) ? (u(), y("p", Wi, " Could not load results: " + M(k(s) instanceof Error ? k(s).message : "the data source failed."), 1)) : !c.value.length && k(a) ? (u(), y("p", zi, " Running query… ")) : c.value.length ? L("", !0) : (u(), y("p", ji, M(l.value ? "Nothing matches this query" : "Nothing here yet"), 1)),
      (u(!0), y(W, null, X(c.value, (_) => (u(), y("section", {
        key: _.entity.key,
        class: "dc-type",
        "data-dc-empty": _.total ? "false" : "true"
      }, [
        Q(se, {
          class: "dc-type__head",
          href: k(t).entityHref(_.entity.key),
          onPress: (p) => k(t).setEntity(_.entity.key)
        }, {
          default: Y(() => [
            x("span", Qi, M(_.entity.label), 1),
            x("span", Gi, M(_.count), 1),
            _.entity.note ? (u(), y("span", Yi, M(_.entity.note), 1)) : L("", !0),
            v[0] || (v[0] = x("span", {
              class: "dc-type__go",
              "aria-hidden": "true"
            }, "→", -1)),
            x("span", Xi, "Show only " + M(_.entity.label.toLowerCase()), 1),
            _.entity.description ? (u(), y("span", Ji, M(_.entity.description), 1)) : L("", !0)
          ]),
          _: 2
        }, 1032, ["href", "onPress"]),
        _.total ? L("", !0) : (u(), y("p", Zi, M(l.value ? "No matches" : "Nothing here yet"), 1)),
        (u(!0), y(W, null, X(_.rows, (p) => (u(), y("div", {
          key: p.key,
          class: "dc-type__row"
        }, [
          Q(se, {
            class: "dc-type__open",
            href: k(t).pressHref(p.row),
            onPress: (g) => k(t).activate(p.row, g)
          }, {
            default: Y(() => [
              x("span", ec, [
                x("span", tc, M(p.parts.identity), 1),
                x("span", nc, M(p.parts.reference), 1)
              ])
            ]),
            _: 2
          }, 1032, ["href", "onPress"]),
          x("span", ac, [
            (u(!0), y(W, null, X(p.parts.metrics.slice(0, 1), (g) => (u(), A(dt, {
              key: g.column.key ?? g.label,
              class: "dc-type__metric",
              entry: p,
              column: g.column
            }, {
              default: Y(() => [
                x("span", sc, M(g.text), 1),
                x("span", lc, M(g.label), 1)
              ]),
              _: 2
            }, 1032, ["entry", "column"]))), 128)),
            p.parts.updated ? (u(), y("span", rc, M(p.parts.updated), 1)) : L("", !0),
            Q(wn, { entry: p }, null, 8, ["entry"]),
            Q(vt, { entry: p }, null, 8, ["entry"]),
            Q(ft, { entry: p }, null, 8, ["entry"])
          ])
        ]))), 128)),
        _.entity.create && !r.value ? (u(), A(se, {
          key: 1,
          class: "dc-type__new",
          href: k(t).createHref?.(_.entity),
          onPress: (p) => k(t).create(_.entity)
        }, {
          default: Y(() => [
            v[1] || (v[1] = x("span", {
              class: "dc-type__plus",
              "aria-hidden": "true"
            }, "+", -1)),
            Z(" " + M(_.entity.create), 1)
          ]),
          _: 2
        }, 1032, ["href", "onPress"])) : L("", !0)
      ], 8, Ui))), 128)),
      G(d.$slots, "after", {}, void 0, !0)
    ], 8, Ki));
  }
}), Ya = /* @__PURE__ */ j(oc, [["__scopeId", "data-v-d60e56a6"]]), ic = ["data-dc-pending", "data-dc-more"], cc = {
  key: 0,
  class: "dc-results__state dc-results__state--loading",
  "aria-live": "polite"
}, uc = {
  key: 3,
  class: "dc-results__state",
  role: "alert"
}, dc = { class: "dc-results__detail" }, fc = {
  key: 4,
  class: "dc-results__state",
  "aria-live": "polite"
}, vc = {
  key: 5,
  class: "dc-results__state"
}, pc = { class: "dc-results__detail" }, hc = /* @__PURE__ */ z({
  __name: "ResultsArea",
  props: {
    views: {},
    loading: { type: Boolean }
  },
  setup(e) {
    const t = e, n = ee(), a = Mt(), s = {
      list: sn,
      cards: Va,
      grid: Da,
      images: Ka,
      table: Ga,
      links: Wa,
      preview: za
    }, l = f(() => ma(n.query.value, t.views)), r = f(() => Ie(n.query.value.view, t.views)), i = f(() => (r.value === "record" ? null : s[r.value]) ?? sn), o = f(() => r.value === "record" ? n.recordView.value : null), c = f(() => n.rows.value.length > 0), d = f(() => n.error.value !== null), v = H(null);
    function _(h) {
      return h.querySelector("[data-dc-scroll]") ?? h;
    }
    te(
      // The page on screen, which is the draft's own while one is being typed.
      () => n.liveQuery.value.page,
      () => {
        v.value && (_(v.value).scrollTop = 0);
      }
    );
    const p = H(""), g = H({ x: 0, y: 0 }), m = H(0);
    function b() {
      const h = v.value;
      if (!h) {
        p.value = "";
        return;
      }
      const w = _(h), P = {
        top: w.scrollTop > 1,
        right: w.scrollWidth - w.clientWidth - w.scrollLeft > 1,
        bottom: w.scrollHeight - w.clientHeight - w.scrollTop > 1,
        left: w.scrollLeft > 1
      };
      p.value = Object.entries(P).filter(([, q]) => q).map(([q]) => q).join(" "), g.value = {
        x: w.offsetHeight - w.clientHeight,
        y: w.offsetWidth - w.clientWidth
      }, m.value = h.querySelector("[data-dc-stuck]")?.offsetHeight ?? 0;
    }
    let S = null, N = null;
    return te(
      v,
      (h, w) => {
        if (w?.removeEventListener("scroll", b, { capture: !0 }), S?.disconnect(), N?.disconnect(), S = null, N = null, b(), !h || (h.addEventListener("scroll", b, { passive: !0, capture: !0 }), typeof ResizeObserver > "u")) return;
        const P = new ResizeObserver(b), q = typeof MutationObserver > "u" ? null : new MutationObserver(() => {
          ne(), b();
        }), ne = () => {
          P.disconnect(), q?.disconnect();
          for (const I of /* @__PURE__ */ new Set([h, _(h)])) {
            P.observe(I);
            for (const B of I.children) P.observe(B);
            q?.observe(I, { childList: !0 });
          }
        };
        ne(), S = P, N = q;
      },
      { flush: "post" }
    ), we(() => {
      v.value?.removeEventListener("scroll", b, { capture: !0 }), S?.disconnect(), N?.disconnect();
    }), (h, w) => (u(), y("div", {
      ref_key: "scroller",
      ref: v,
      class: "dc-results",
      "data-dc-pending": k(n).pending.value ? "true" : "false",
      "data-dc-more": p.value,
      style: oe({
        "--dc-results-gutter-x": `${g.value.x}px`,
        "--dc-results-gutter-y": `${g.value.y}px`,
        "--dc-results-stuck": `${m.value}px`
      })
    }, [
      e.loading ? (u(), y("p", cc, [...w[1] || (w[1] = [
        x("span", { class: "dc-results__detail" }, "Loading…", -1)
      ])])) : l.value ? (u(), A(Ya, { key: 1 }, Ut({ _: 2 }, [
        a["cards-before"] ? {
          name: "before",
          fn: Y(() => [
            G(h.$slots, "cards-before", {}, void 0, !0)
          ]),
          key: "0"
        } : void 0,
        a["cards-after"] ? {
          name: "after",
          fn: Y(() => [
            G(h.$slots, "cards-after", {}, void 0, !0)
          ]),
          key: "1"
        } : void 0
      ]), 1024)) : o.value?.id ? (u(), A(Ze(o.value.component), {
        key: 2,
        id: o.value.id
      }, null, 8, ["id"])) : d.value ? (u(), y("p", uc, [
        w[2] || (w[2] = x("span", { class: "dc-results__headline" }, "Could not load results", -1)),
        x("span", dc, M(k(n).error.value instanceof Error ? k(n).error.value.message : "The data source failed."), 1)
      ])) : !c.value && k(n).pending.value ? (u(), y("p", fc, [...w[3] || (w[3] = [
        x("span", { class: "dc-results__detail" }, "Running query…", -1)
      ])])) : c.value ? (u(), A(Ze(i.value), { key: 6 })) : (u(), y("div", vc, [
        w[4] || (w[4] = x("span", { class: "dc-results__headline" }, "Nothing matches this query", -1)),
        x("span", pc, M(k(n).summary.value), 1),
        k(n).isPristine.value ? L("", !0) : (u(), A(se, {
          key: 0,
          class: "dc-results__clear",
          href: k(n).isEverything.value ? k(n).clearHref() : k(n).entityHref(null),
          onPress: w[0] || (w[0] = (P) => k(n).isEverything.value ? k(n).clearFilters() : k(n).clearEntity())
        }, {
          default: Y(() => [
            Z(M(k(n).isEverything.value ? "Clear filters" : "Search everything instead"), 1)
          ]),
          _: 1
        }, 8, ["href"]))
      ]))
    ], 12, ic));
  }
}), Xa = /* @__PURE__ */ j(hc, [["__scopeId", "data-v-bc18f2f9"]]), mc = ["data-dc-theme", "data-dc-value-press"], yc = {
  key: 0,
  class: "dc-shell__page"
}, gc = /* @__PURE__ */ z({
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
    const a = e, s = n, l = Cn(e, "pinned"), r = Cn(e, "selected"), i = Mt(), o = ln(na, null), c = a.route || o ? null : is(), d = a.route ?? o ?? c;
    we(() => c?.dispose?.());
    const v = H(!!i.page);
    ts(() => {
      v.value = !!i.page;
    });
    const _ = cs(d, {
      detached: () => v.value && a.pageQuery === "detached",
      path: () => a.listPath
    }), p = f(() => rl({ seed: a.schema.key })), g = f(() => a.source ?? p.value), m = Cl({
      schema: () => a.schema,
      adapter: _,
      defaults: () => a.defaults,
      navigationMode: () => a.navigationMode,
      facetNavigationMode: () => a.facetNavigationMode
    }), b = f(() => a.within?.trim() ?? ""), S = Ll({
      query: m.query,
      entity: m.entity,
      schema: f(() => a.schema),
      setExpression: m.setExpression
    });
    te(m.query, ($) => s("query-change", $));
    const N = f(() => pl(a.schema, [m.query.value.expr])), h = f(
      () => N.value.flatMap(($) => {
        const R = a.schema.entities.find((K) => K.key === $.entityKey);
        return R ? [{ ...$, entity: R }] : [];
      })
    );
    function w() {
      if (i.record) return h.value;
      const $ = a.recordCards;
      return $ ? h.value.filter((R) => $[R.entityKey]) : [];
    }
    const P = f(() => {
      const [$, ...R] = h.value;
      if (!$ || R.length || m.entity.value !== null) return null;
      const K = a.recordViews?.[$.entityKey];
      return K ? { ...K, id: $.id } : null;
    }), q = f(() => {
      const $ = m.entity.value?.key;
      return $ && a.recordViews?.[$] || null;
    }), ne = f(() => {
      const $ = a.views, R = typeof $ == "function" ? $({ entity: m.entity.value, records: N.value }) : $;
      return P.value || q.value ? [...(R ?? cn).filter((K) => K !== "record"), "record"] : R?.filter((K) => K !== "record");
    }), I = f(
      () => q.value !== null && Ie(m.query.value.view, ne.value) === "record"
    ), B = f(() => I.value ? 1 : a.limit), F = Pl({
      source: g,
      query: S.live,
      schema: f(() => a.schema),
      entity: m.entity,
      limit: B,
      within: b
    }), ce = Ml({
      // Not before the data has landed: what is there until then is no place to hold.
      active: f(() => I.value && !a.loading),
      rows: F.rows,
      pending: F.pending,
      page: f(() => S.live.value.page),
      list: f(() => {
        const { entity: $, expr: R, sort: K, dir: $e } = S.live.value;
        return JSON.stringify([$, R, K, $e]);
      }),
      locate: F.locate,
      moveTo: ($) => {
        S.drafting.value ? S.setPage($) : m.setPage($, "replace");
      }
    }), ie = f(() => F.pageCount.value + (ce.gone.value ? 1 : 0)), re = f(() => {
      if (P.value) return P.value;
      const $ = q.value;
      return $ ? { ...$, id: ce.id.value ?? F.rows.value[0]?.id ?? null } : null;
    });
    function E($) {
      const R = q.value !== null && Ie($, ne.value) === "record";
      if (R === I.value) {
        m.setView($);
        return;
      }
      const K = S.live.value.page, $e = R ? (K - 1) * a.limit + 1 : Math.ceil(K / a.limit);
      S.drafting.value ? (m.setView($), S.setPage($e)) : m.setView($, $e);
    }
    function U($) {
      if (!q.value || I.value) return null;
      const R = F.rows.value.indexOf($);
      return R === -1 ? null : F.offset.value + R + 1;
    }
    te(
      [ie, F.pending, m.query, S.drafting, () => a.loading, v, ce.holding],
      () => {
        if (F.pending.value || S.drafting.value || a.loading || v.value) return;
        const $ = ie.value;
        m.query.value.page <= $ || (ce.gone.value ? ce.moveTo($) : ce.holding.value || m.setPage($, "replace"));
      },
      // Immediately, since a pasted URL is past the end before anything changes;
      // and after the render, so the correction is a navigation the mounted shell
      // makes rather than one it makes on the way up. An async source is still
      // pending here and corrects itself when its count lands.
      { immediate: !0, flush: "post" }
    );
    const T = f(() => new Set(l.value));
    function J($) {
      const R = new Set(T.value);
      R.has($.id) ? R.delete($.id) : R.add($.id), l.value = [...R], s("toggle-pin", $);
    }
    const ae = f(() => {
      if (a.selectable === !0) return !0;
      const $ = m.entity.value;
      return !!($?.duplicate || $?.delete || $?.operations?.some((R) => R.selection !== !1));
    }), ye = f(() => new Set(r.value));
    function ve($) {
      const R = new Set(ye.value);
      R.has($.id) ? R.delete($.id) : R.add($.id), r.value = [...R];
    }
    function xe($) {
      const R = new Set(ye.value);
      for (const K of F.rows.value)
        $ ? R.add(K.id) : R.delete(K.id);
      r.value = [...R];
    }
    function pt() {
      r.value.length && (r.value = []);
    }
    const Se = f(() => ({
      ids: [...r.value],
      rows: F.rows.value.filter(($) => ye.value.has($.id)),
      entity: m.entity.value
    }));
    te(() => m.query.value.entity, pt);
    function qe($, R, K = {}, $e) {
      const xn = Wt(a.schema, m.query.value, $, K, $e);
      K.exclude ? m.narrow(xn, R?.key ?? m.query.value.entity) : S.release(() => m.narrow(xn, R?.key ?? null, R ? void 0 : "cards")), s("drill", $, R, K);
    }
    function Ce($) {
      return a.rowPress === "narrow" && kt(a.schema, $) !== null;
    }
    function be($) {
      return a.schema.entities.find((K) => K.key === $.entityKey)?.href?.($) || null;
    }
    const C = me(null);
    te(m.query, () => {
      C.value = null;
    });
    const O = hl({
      ...m,
      draft: S.text,
      liveQuery: S.live,
      drafting: S.drafting,
      commitDraft: S.commit,
      abandonDraft: S.abandon,
      /*
       * A page of what is on screen: the draft's, while one is live, which are
       * held beside it rather than in the URL — see `liveQuery`.
       */
      setPage: ($, R) => {
        const K = ce.step($);
        K !== null && (S.drafting.value ? S.setPage(K) : m.setPage(K, R));
      },
      setView: E,
      schema: f(() => a.schema),
      entities: f(() => a.schema.entities),
      rows: F.rows,
      total: F.total,
      matched: F.matched,
      limit: B,
      offset: F.offset,
      pageCount: ie,
      peek: F.peek,
      pending: F.pending,
      counting: F.counting,
      error: F.error,
      source: g,
      previewsPerType: f(() => a.previewsPerType),
      within: b,
      loading: f(() => a.loading),
      recordView: re,
      pinnable: f(() => a.pinnable === !0),
      isPinned: ($) => T.value.has($.id),
      isPinnedId: ($) => T.value.has($),
      togglePin: J,
      selectable: ae,
      selection: Se,
      isSelected: ($) => ye.value.has($.id),
      toggleSelect: ve,
      selectPage: xe,
      clearSelection: pt,
      narrowsOnPress: f(() => a.rowPress === "narrow"),
      rowLinks: f(() => a.rowLinks),
      pressPreview: C,
      /*
       * The one place a press is read, so every view gets the same answer without
       * knowing which of the two it is: they all call this.
       */
      activate: ($, R = {}) => {
        if (Ce($)) {
          qe($, null, R);
          return;
        }
        const K = U($);
        if (K !== null) {
          S.drafting.value ? (m.setView("record"), S.setPage(K)) : m.setView("record", K);
          return;
        }
        const $e = be($);
        if ($e) {
          window.open($e, "_blank", "noopener");
          return;
        }
        s("activate", $);
      },
      pressHref: ($) => {
        if (Ce($)) return m.narrowHref(Wt(a.schema, m.query.value, $), null, "cards");
        const R = U($);
        return R !== null ? m.hrefFor({ view: "record", page: R }) : be($) ?? a.activateHref?.($) ?? null;
      },
      recordHref: be,
      drillHref: ($, R, K) => kt(a.schema, $) ? m.narrowHref(
        Wt(a.schema, m.query.value, $, {}, K),
        R?.key ?? null,
        R ? void 0 : "cards"
      ) : null,
      create: ($) => s("create", $),
      createHref: ($) => a.createHref?.($) ?? null,
      duplicate: () => s("duplicate", Se.value),
      delete: () => s("delete", Se.value),
      operate: ($) => s("operate", $, Se.value),
      drill: qe
    });
    gl({ theme: () => a.theme, accent: () => a.accent, tokens: () => a.tokens });
    const V = f(() => {
      if (!(!a.accent && !a.tokens))
        return { ...a.tokens, ...a.accent ? { "--dc-accent": a.accent } : {} };
    }), D = H(null), Te = H(0);
    let Ve = null;
    ct(() => {
      const $ = D.value;
      $ && (Te.value = $.getBoundingClientRect().width, !(typeof ResizeObserver > "u") && (Ve = new ResizeObserver(([R]) => {
        Te.value = R.contentRect.width;
      }), Ve.observe($)));
    }), we(() => Ve?.disconnect());
    const Vt = f(() => a.oneStripFrom !== !1 && Te.value >= a.oneStripFrom), bn = f(
      () => Ie(m.query.value.view, ne.value) === "record" && re.value?.strip === !1
    ), $n = f(() => ({
      views: ne.value,
      selectionPlacement: a.selectionPlacement,
      pagesNote: a.pagesNote
    }));
    return t({
      query: m.query
    }), ($, R) => (u(), y("div", {
      ref_key: "root",
      ref: D,
      class: "dc-shell",
      "data-dc-theme": e.theme,
      "data-dc-value-press": e.valuePress,
      style: oe(V.value)
    }, [
      x("div", {
        class: de(["dc-shell__head", { "dc-shell__head--one-strip": Vt.value }])
      }, [
        Q(Ba, null, Ut({ _: 2 }, [
          i.page ? void 0 : {
            name: "lead",
            fn: Y(() => [
              Q(Vr, {
                views: ne.value,
                "type-chooser": e.typeChooser
              }, null, 8, ["views", "type-chooser"])
            ]),
            key: "0"
          },
          i.brand ? {
            name: "brand",
            fn: Y((K) => [
              G($.$slots, "brand", Dt(ns(K)), void 0, !0)
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
        Vt.value && !i.page && !bn.value ? (u(), A(nn, Dt(Ke({ key: 0 }, $n.value)), null, 16)) : L("", !0)
      ], 2),
      i.page ? (u(), y("div", yc, [
        G($.$slots, "page", {
          query: k(O).query.value
        }, void 0, !0)
      ])) : L("", !0),
      !Vt.value && !i.page && !bn.value ? (u(), A(nn, Dt(Ke({ key: 1 }, $n.value)), null, 16)) : L("", !0),
      i.page ? L("", !0) : G($.$slots, "results", {
        rows: k(O).rows.value,
        total: k(O).total.value,
        offset: k(O).offset.value,
        pageCount: k(O).pageCount.value,
        query: k(O).liveQuery.value,
        pending: k(O).pending.value,
        loading: e.loading
      }, () => [
        Q(Xa, {
          views: ne.value,
          loading: e.loading
        }, Ut({ _: 2 }, [
          i["cards-before"] || w().length ? {
            name: "cards-before",
            fn: Y(() => [
              (u(!0), y(W, null, X(w(), (K) => (u(), y(W, {
                key: `${K.entityKey}:${K.id}`
              }, [
                i.record ? G($.$slots, "record", {
                  id: K.id,
                  entity: K.entity
                }, void 0, !0, 0) : (u(), A(Ze(e.recordCards?.[K.entityKey]), {
                  key: 1,
                  id: K.id
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
    ], 12, mc));
  }
}), _c = /* @__PURE__ */ j(gc, [["__scopeId", "data-v-7ae0f737"]]), wc = ["data-dc-span", "data-dc-muted", "data-dc-collapsed"], kc = ["data-dc-collapsible"], bc = ["aria-expanded", "aria-controls"], $c = { class: "dc-shell-card__sr" }, xc = {
  key: 0,
  class: "dc-shell-card__identity"
}, Sc = { class: "dc-shell-card__title dc-shell-card__name" }, Cc = {
  key: 0,
  class: "dc-shell-card__ref dc-mono"
}, Pc = {
  key: 1,
  class: "dc-shell-card__title"
}, Mc = {
  key: 2,
  class: "dc-shell-card__count dc-mono"
}, Ec = {
  key: 1,
  class: "dc-shell-card__aside"
}, Lc = ["data-dc-flush"], Tc = /* @__PURE__ */ z({
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
    const n = e, a = t, s = H(n.defaultCollapsed === !0), l = f(() => n.span === "all" ? { gridColumn: "1 / -1" } : void 0), r = Mt();
    function i(I) {
      return o(I?.() ?? []);
    }
    function o(I) {
      return I.some((B) => B.type === as ? !1 : B.type === ss ? String(B.children ?? "").trim().length > 0 : B.type === W ? o(B.children ?? []) : !0);
    }
    const c = f(
      () => !!n.title || !!n.name || d.value || i(r.head)
    ), d = f(() => i(r.aside)), v = f(() => i(r.default)), _ = f(() => i(r.foot)), p = f(
      () => !!n.name && (!!n.reference || i(r.reference))
    ), g = f(() => n.collapsible === !0 && c.value), m = f(() => g.value && (n.collapsed ?? s.value));
    function b() {
      const I = !m.value;
      s.value = I, a("update:collapsed", I);
    }
    const S = Et() ?? "dc-shell-card", N = `${S}-body`, h = `${S}-foot`, w = f(
      () => [v.value ? N : "", _.value ? h : ""].filter(Boolean).join(" ") || void 0
    ), P = [
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
    ].join(", "), q = H(null);
    function ne(I) {
      if (!g.value) return;
      const B = I.target?.closest(P);
      B && q.value?.contains(B) || typeof window < "u" && window.getSelection()?.toString() || b();
    }
    return (I, B) => (u(), y("section", {
      class: "dc-shell-card",
      style: oe(l.value),
      "data-dc-span": e.span,
      "data-dc-muted": e.muted ? "true" : "false",
      "data-dc-collapsed": m.value ? "true" : "false"
    }, [
      c.value ? (u(), y("header", {
        key: 0,
        ref_key: "head",
        ref: q,
        class: "dc-shell-card__head",
        "data-dc-collapsible": g.value ? "true" : "false",
        onClick: ne
      }, [
        g.value ? (u(), y("button", {
          key: 0,
          type: "button",
          class: "dc-shell-card__toggle",
          "aria-expanded": m.value ? "false" : "true",
          "aria-controls": w.value,
          onClick: b
        }, [
          B[0] || (B[0] = x("svg", {
            class: "dc-shell-card__chevron",
            viewBox: "0 0 10 10",
            "aria-hidden": "true"
          }, [
            x("path", { d: "M2 3.5 5 6.5 8 3.5" })
          ], -1)),
          x("span", $c, M(e.name || e.title || "Card"), 1)
        ], 8, bc)) : L("", !0),
        G(I.$slots, "head", {}, () => [
          e.name ? (u(), y("div", xc, [
            x("h2", Sc, M(e.name), 1),
            p.value ? (u(), y("span", Cc, [
              G(I.$slots, "reference", {}, () => [
                Z(M(e.reference), 1)
              ], !0)
            ])) : L("", !0)
          ])) : (u(), y("h2", Pc, M(e.title), 1)),
          e.count !== void 0 ? (u(), y("span", Mc, M(e.count), 1)) : L("", !0)
        ], !0),
        d.value ? (u(), y("span", Ec, [
          G(I.$slots, "aside", {}, void 0, !0)
        ])) : L("", !0)
      ], 8, kc)) : L("", !0),
      v.value ? jt((u(), y("div", {
        key: 1,
        id: N,
        class: "dc-shell-card__body",
        "data-dc-flush": e.flush ? "true" : "false"
      }, [
        G(I.$slots, "default", {}, void 0, !0)
      ], 8, Lc)), [
        [Mn, !m.value]
      ]) : L("", !0),
      _.value ? jt((u(), y("footer", {
        key: 2,
        id: h,
        class: "dc-shell-card__foot"
      }, [
        G(I.$slots, "foot", {}, void 0, !0)
      ], 512)), [
        [Mn, !m.value]
      ]) : L("", !0)
    ], 12, wc));
  }
}), Tu = /* @__PURE__ */ j(Tc, [["__scopeId", "data-v-c84525aa"]]), Oc = ["aria-label"], Ac = ["aria-checked", "data-dc-active", "tabindex", "onClick", "onKeydown"], Nc = /* @__PURE__ */ z({
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
    function l(r, i) {
      const o = n.options.length;
      let c = null;
      if (r.key === "ArrowRight" || r.key === "ArrowDown" ? c = (i + 1) % o : r.key === "ArrowLeft" || r.key === "ArrowUp" ? c = (i - 1 + o) % o : r.key === "Home" ? c = 0 : r.key === "End" && (c = o - 1), c === null) return;
      r.preventDefault();
      const d = n.options[c];
      d && (a("update:modelValue", d.key), s.value[c]?.focus());
    }
    return (r, i) => (u(), y("div", {
      class: "dc-segmented",
      role: "radiogroup",
      "aria-label": e.label
    }, [
      (u(!0), y(W, null, X(e.options, (o, c) => (u(), y("button", {
        key: o.key,
        ref_for: !0,
        ref_key: "buttons",
        ref: s,
        type: "button",
        role: "radio",
        class: de(["dc-segmented__item", { "dc-segmented__item--mono": e.mono }]),
        "aria-checked": o.key === e.modelValue,
        "data-dc-active": o.key === e.modelValue ? "true" : "false",
        tabindex: o.key === e.modelValue ? 0 : -1,
        onClick: (d) => a("update:modelValue", o.key),
        onKeydown: (d) => l(d, c)
      }, M(o.label), 43, Ac))), 128))
    ], 8, Oc));
  }
}), Ic = /* @__PURE__ */ j(Nc, [["__scopeId", "data-v-63fb5482"]]), Rc = { class: "dc-fact__label" }, Bc = ["title"], Hc = /* @__PURE__ */ z({
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
      if (s == null || s === "") return [ke];
      if (Array.isArray(s)) {
        const l = s.filter((r) => r != null && r !== "");
        return l.length ? l.map(String) : [ke];
      }
      return [String(s)];
    }), a = f(() => t.wide ? { gridColumn: "1 / -1" } : void 0);
    return (s, l) => (u(), y("div", {
      class: "dc-fact",
      style: oe(a.value)
    }, [
      x("dt", Rc, [
        G(s.$slots, "label", {}, () => [
          Z(M(e.label), 1)
        ], !0)
      ]),
      x("dd", {
        class: "dc-fact__value dc-mono",
        title: e.title
      }, [
        G(s.$slots, "default", {}, () => [
          n.value.length === 1 ? (u(), y(W, { key: 0 }, [
            Z(M(n.value[0]), 1)
          ], 64)) : (u(!0), y(W, { key: 1 }, X(n.value, (r, i) => (u(), y("span", {
            key: i,
            class: "dc-fact__line"
          }, M(r), 1))), 128))
        ], !0)
      ], 8, Bc)
    ], 4));
  }
}), Fc = /* @__PURE__ */ j(Hc, [["__scopeId", "data-v-1f6d25e6"]]), qc = /* @__PURE__ */ z({
  __name: "ShellFacts",
  props: {
    items: { default: () => [] },
    min: { default: "200px" }
  },
  setup(e) {
    const t = e, n = f(() => ({ "--dc-facts-min": t.min }));
    return (a, s) => (u(), y("dl", {
      class: "dc-facts",
      style: oe(n.value)
    }, [
      (u(!0), y(W, null, X(e.items, (l, r) => (u(), A(Fc, {
        key: `${r}:${l.label}`,
        label: l.label,
        value: l.value,
        title: l.title,
        wide: l.wide
      }, null, 8, ["label", "value", "title", "wide"]))), 128)),
      G(a.$slots, "default", {}, void 0, !0)
    ], 4));
  }
}), Ou = /* @__PURE__ */ j(qc, [["__scopeId", "data-v-17455afa"]]), Vc = { class: "dc-counts" }, Dc = ["data-dc-tone"], Kc = {
  key: 0,
  class: "dc-counts__empty"
}, Wc = /* @__PURE__ */ z({
  __name: "StatusCounts",
  props: {
    counts: {},
    empty: { default: ke }
  },
  setup(e) {
    const t = e, n = f(() => t.counts.filter((a) => a.count > 0));
    return (a, s) => (u(), y("span", Vc, [
      (u(!0), y(W, null, X(n.value, (l) => (u(), y("span", {
        key: l.label,
        class: "dc-counts__count",
        "data-dc-tone": l.tone ?? "neutral"
      }, M(l.count) + " " + M(l.label), 9, Dc))), 128)),
      n.value.length === 0 ? (u(), y("span", Kc, M(e.empty), 1)) : L("", !0)
    ]));
  }
}), Au = /* @__PURE__ */ j(Wc, [["__scopeId", "data-v-5553a9e2"]]), zc = ["data-dc-copied", "title", "aria-label"], jc = {
  key: 0,
  class: "dc-copy__mark",
  viewBox: "0 0 16 16",
  "aria-hidden": "true"
}, Uc = {
  key: 1,
  class: "dc-copy__mark",
  viewBox: "0 0 16 16",
  "aria-hidden": "true"
}, Qc = 1500, Gc = /* @__PURE__ */ z({
  __name: "CopyButton",
  props: {
    text: {},
    label: { default: "Copy to clipboard" }
  },
  emits: ["copied", "error"],
  setup(e, { emit: t }) {
    const n = e, a = t, s = H(!1);
    let l;
    async function r() {
      const i = typeof n.text == "function" ? n.text() : n.text;
      try {
        if (!navigator.clipboard) throw new Error("The clipboard is not available here");
        await navigator.clipboard.writeText(i);
      } catch (o) {
        a("error", o);
        return;
      }
      s.value = !0, clearTimeout(l), l = setTimeout(() => {
        s.value = !1;
      }, Qc), a("copied", i);
    }
    return we(() => clearTimeout(l)), (i, o) => (u(), y("button", {
      type: "button",
      class: "dc-copy",
      "data-dc-copied": s.value ? "true" : "false",
      title: s.value ? "Copied" : e.label,
      "aria-label": e.label,
      onClick: r
    }, [
      s.value ? (u(), y("svg", Uc, [...o[1] || (o[1] = [
        x("path", { d: "M3 8.5l3.2 3L13 4.5" }, null, -1)
      ])])) : (u(), y("svg", jc, [...o[0] || (o[0] = [
        x("rect", {
          x: "5.5",
          y: "5.5",
          width: "8",
          height: "9",
          rx: "1.5"
        }, null, -1),
        x("path", { d: "M10.5 3.5v-1a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h1" }, null, -1)
      ])]))
    ], 8, zc));
  }
}), Yc = /* @__PURE__ */ j(Gc, [["__scopeId", "data-v-f4249d7f"]]), Xc = ["data-dc-copy", "data-dc-wrap", "data-dc-tone"], Jc = /* @__PURE__ */ z({
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
    function r() {
      return n.code ?? s.value?.textContent ?? "";
    }
    return (i, o) => (u(), y("div", {
      class: "dc-code",
      "data-dc-copy": e.copy ? "true" : "false",
      "data-dc-wrap": e.wrap ? "true" : "false",
      "data-dc-tone": e.tone
    }, [
      x("pre", {
        ref_key: "pre",
        ref: s,
        class: "dc-code__text dc-mono",
        style: oe(l.value)
      }, [
        G(i.$slots, "default", {}, () => [
          Z(M(e.code), 1)
        ], !0)
      ], 4),
      e.copy ? (u(), A(Yc, {
        key: 0,
        class: "dc-code__copy",
        text: r,
        label: e.copyLabel,
        onCopied: o[0] || (o[0] = (c) => a("copied", c)),
        onError: o[1] || (o[1] = (c) => a("error", c))
      }, null, 8, ["label"])) : L("", !0)
    ], 8, Xc));
  }
}), Nu = /* @__PURE__ */ j(Jc, [["__scopeId", "data-v-67b371dd"]]), Zc = 24, eu = /* @__PURE__ */ z({
  __name: "ShellLog",
  props: {
    fetchChunk: {},
    stripAnsi: { type: Boolean },
    maxHeight: { default: "460px" }
  },
  setup(e, { expose: t }) {
    const n = e, a = H(""), s = f(() => n.stripAnsi ? gs(a.value) : a.value), l = H(null);
    let r = 0, i = null;
    function o() {
      return i ??= c().finally(() => {
        i = null;
      }), i;
    }
    async function c() {
      const { chunk: _, offset: p } = await n.fetchChunk(r);
      if (r = p, !_) return;
      const g = l.value, m = !g || g.scrollTop + g.clientHeight >= g.scrollHeight - Zc;
      a.value += _, m && (await Je(), l.value && (l.value.scrollTop = l.value.scrollHeight));
    }
    function d() {
      a.value = "", r = 0;
    }
    const v = f(() => n.maxHeight === void 0 ? void 0 : { maxHeight: typeof n.maxHeight == "number" ? `${n.maxHeight}px` : n.maxHeight });
    return t({ poll: o, reset: d }), (_, p) => (u(), y("pre", {
      ref_key: "pane",
      ref: l,
      class: "dc-log dc-mono",
      style: oe(v.value)
    }, M(s.value), 5));
  }
}), Iu = /* @__PURE__ */ j(eu, [["__scopeId", "data-v-2c86947e"]]), tu = ["data-dc-theme"], nu = ["aria-labelledby", "aria-label"], au = {
  key: 1,
  class: "dc-dialog__actions"
}, Ge = [], su = /* @__PURE__ */ z({
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
    const n = e, a = t, { theme: s, style: l, adopt: r } = gn(n), i = `${Et() ?? "dc-dialog"}-title`, o = H(null);
    function c() {
      a("close"), a("update:open", !1);
    }
    const d = Symbol("dc-dialog");
    function v(h) {
      h.key !== "Escape" || h.defaultPrevented || Ge[Ge.length - 1] === d && (h.preventDefault(), c());
    }
    let _ = !1;
    function p(h) {
      _ = h.target === h.currentTarget;
    }
    function g(h) {
      h.target === h.currentTarget && _ && c(), _ = !1;
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
    async function S() {
      Ge.push(d), document.addEventListener("keydown", v), b = document.activeElement instanceof HTMLElement ? document.activeElement : null, r(), await Je(), (o.value?.querySelector("[autofocus]") ?? o.value?.querySelector(m) ?? o.value)?.focus();
    }
    function N() {
      const h = Ge.indexOf(d);
      h !== -1 && (Ge.splice(h, 1), document.removeEventListener("keydown", v), b?.isConnected && b.focus(), b = null);
    }
    return ct(() => {
      n.open && S();
    }), te(
      () => n.open,
      (h) => {
        h ? S() : N();
      }
    ), we(N), (h, w) => e.open ? (u(), A(Pt, {
      key: 0,
      to: e.to
    }, [
      x("div", {
        class: "dc-shell dc-layer dc-dialog",
        "data-dc-theme": k(s),
        style: oe(k(l)),
        onPointerdown: p,
        onClick: g
      }, [
        x("div", {
          ref_key: "panel",
          ref: o,
          class: de(["dc-dialog__panel", e.panelClass]),
          role: "dialog",
          "aria-modal": "true",
          tabindex: "-1",
          "aria-labelledby": e.title ? i : void 0,
          "aria-label": e.title ? void 0 : e.label
        }, [
          e.title ? (u(), y("h2", {
            key: 0,
            id: i,
            class: "dc-dialog__title"
          }, M(e.title), 1)) : L("", !0),
          x("div", {
            class: de(["dc-dialog__body", e.bodyClass])
          }, [
            G(h.$slots, "default", {}, void 0, !0)
          ], 2),
          h.$slots.actions ? (u(), y("div", au, [
            G(h.$slots, "actions", {}, void 0, !0)
          ])) : L("", !0)
        ], 10, nu)
      ], 44, tu)
    ], 8, ["to"])) : L("", !0);
  }
}), Ru = /* @__PURE__ */ j(su, [["__scopeId", "data-v-0cccf313"]]), lu = 4500, ru = 9e3, it = H([]);
let Jn = 0;
function Ja(e) {
  it.value = it.value.filter((t) => t.id !== e);
}
function Za(e, t = "ok") {
  Jn += 1;
  const n = Jn;
  it.value = [...it.value, { id: n, message: e, kind: t }], setTimeout(() => Ja(n), t === "err" ? ru : lu);
}
function ou(e) {
  Za(e instanceof Error ? e.message : String(e), "err");
}
function iu() {
  return { toasts: ls(it), toast: Za, toastError: ou, dismiss: Ja };
}
const cu = ["data-dc-theme"], uu = ["data-dc-kind", "role"], du = /* @__PURE__ */ z({
  __name: "ShellToasts",
  props: {
    to: { default: "body" },
    theme: { default: void 0 },
    accent: { default: void 0 },
    tokens: { default: void 0 }
  },
  setup(e) {
    const t = e, { toasts: n } = iu(), { theme: a, style: s, adopt: l } = gn(t);
    return ct(l), (r, i) => (u(), A(Pt, { to: e.to }, [
      x("div", {
        class: "dc-shell dc-layer dc-toasts",
        "data-dc-theme": k(a),
        style: oe(k(s)),
        "aria-live": "polite"
      }, [
        (u(!0), y(W, null, X(k(n), (o) => (u(), y("div", {
          key: o.id,
          class: "dc-toast",
          "data-dc-kind": o.kind,
          role: o.kind === "err" ? "alert" : void 0
        }, M(o.message), 9, uu))), 128))
      ], 12, cu)
    ], 8, ["to"]));
  }
}), Bu = /* @__PURE__ */ j(du, [["__scopeId", "data-v-d970211c"]]);
function Hu(e, t) {
  const n = H(!1);
  let a = null, s = !1, l = 0;
  const r = () => {
    l++, n.value = !1, a !== null && (clearTimeout(a), a = null);
  };
  function i(d) {
    a = setTimeout(() => void o(d), t);
  }
  async function o(d) {
    if (s || d !== l) return;
    let v;
    try {
      v = await e();
    } catch {
      v = !1;
    }
    s || d !== l || (v ? i(d) : r());
  }
  const c = () => {
    n.value || (n.value = !0, o(++l));
  };
  return Ct(() => {
    s = !0, r();
  }, !0), { start: c, stop: r, polling: n };
}
function Fu(e, t = {}) {
  const n = t.key ?? ((l) => JSON.stringify(l)), a = me();
  let s = null;
  return rs(() => {
    const l = e(), r = n(l);
    r !== s && (s = r, a.value = l);
  }), a;
}
function qu(e = {}) {
  return { key: "ordinal", kind: "ordinal", label: "#", width: "52px", ...e };
}
function Vu(e = {}) {
  return { key: "status", role: "state", kind: "status", label: "State", sort: "state", width: "104px", ...e };
}
function Du(e = {}) {
  return { key: "tint", role: "tint", ...e };
}
function Ku(e = {}) {
  return { key: "picture", role: "image", kind: "image", width: "56px", height: "40px", ...e };
}
function Wu(e, t = {}) {
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
function zu(e, t = {}) {
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
function ju(e, t, n = {}) {
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
function Uu(e, t, n = {}) {
  return { key: e, kind: "date", label: t, sort: e, mono: !0, muted: !0, ...n };
}
function Qu(e = {}) {
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
function Gu(e, t, n = {}) {
  return { key: e, label: t, sort: e, truncate: !0, hideBelow: 900, ...n };
}
function Yu(e, t, n, a = {}) {
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
function Xu(e) {
  const t = qt(e);
  return Number.isFinite(t) && t > 0 ? ps(t) : ke;
}
function Ju(e) {
  const t = qt(e);
  return Number.isFinite(t) && t > 0 ? hs(t) : ke;
}
function Zu(e) {
  const t = qt(e);
  return Number.isFinite(t) && t > 0 ? ms(t) : ke;
}
function ed(e) {
  const t = qt(e);
  return Number.isFinite(t) ? ys(t) : ke;
}
function fu(e) {
  if (e <= 0) return 0;
  const t = 10 ** Math.floor(Math.log10(e));
  for (const n of [1, 2, 5])
    if (e <= n * t) return n * t;
  return 10 * t;
}
function vu(e, t) {
  const n = /* @__PURE__ */ new Set();
  for (const a of e) {
    const s = a.fields[t];
    for (const l of Array.isArray(s) ? s : [s])
      typeof l == "string" && l && n.add(l);
  }
  return [...n].sort((a, s) => a.localeCompare(s));
}
function pu(e, t) {
  let n = 0;
  for (const a of e) {
    const s = a.fields[t];
    typeof s == "number" && s > n && (n = s);
  }
  return n;
}
function td(e, t, n, a = {}) {
  return {
    kind: "chips",
    key: t,
    label: n,
    options: vu(e, t),
    ...a.multiple ? { multiple: !0 } : {}
  };
}
function nd(e, t, n) {
  return { kind: "range", key: t, label: n, min: 0, max: fu(pu(e, t)) };
}
function ad(e, t, n) {
  return { kind: "toggle", key: e, label: t, text: n };
}
function sd(e) {
  return e.filter((t) => t.kind === "chips" ? t.options.length > 1 : t.kind === "range" ? t.max > 0 : !0);
}
function ld(e = "", t = "/") {
  const n = H(fe(e)), a = H(t), s = [`${a.value}${n.value}`];
  return {
    search: n,
    path: a,
    history: s,
    href(l, r) {
      return `${r ?? a.value}${fe(l)}`;
    },
    push(l, r) {
      r !== void 0 && (a.value = r), n.value = fe(l), s.push(`${a.value}${n.value}`);
    },
    replace(l, r) {
      r !== void 0 && (a.value = r), n.value = fe(l), s[s.length - 1] = `${a.value}${n.value}`;
    }
  };
}
function Zn(e) {
  const t = e.indexOf("?");
  if (t === -1) return "";
  const n = e.slice(t), a = n.indexOf("#");
  return fe(a === -1 ? n : n.slice(0, a));
}
function rd(e) {
  const t = H(Zn(e.currentRoute.value.fullPath)), n = f(() => e.currentRoute.value.path), a = te(
    () => e.currentRoute.value.fullPath,
    (s) => {
      t.value = Zn(s);
    }
  );
  return {
    search: t,
    path: n,
    push: (s, l) => e.push(`${l ?? n.value}${fe(s)}`),
    replace: (s, l) => e.replace(`${l ?? n.value}${fe(s)}`),
    href: (s, l) => {
      const r = `${l ?? n.value}${fe(s)}`;
      return e.resolve?.(r).href ?? r;
    },
    dispose: a
  };
}
function od(e, t, n = "/") {
  return (a) => {
    const s = a.params[t], l = Array.isArray(s) ? s.join("/") : s ?? "", r = a.query[Be], i = typeof r == "string" ? r : "", o = `${e}="${l.replace(/"/g, "")}"`;
    return { path: n, query: { ...a.query, [Be]: ze(i, o) } };
  };
}
function id(e, t = "/") {
  return (n) => ({ path: t, query: { ...n.query, [Ue]: e } });
}
function cd(e) {
  const t = /* @__PURE__ */ new Map();
  for (const n of e) {
    const a = t.get(n.entityKey);
    a ? a.push(n) : t.set(n.entityKey, [n]);
  }
  return {
    query(n) {
      return ga(n, (a) => t.get(a.key) ?? [], {
        undatedLast: !0,
        zeroIsAll: !0
      });
    }
  };
}
function ud(e, t) {
  return e.query({ ...t, limit: Number.MAX_SAFE_INTEGER, offset: 0 }).rows;
}
const hu = {
  DataShell: _c,
  ShellHeader: Ba,
  RecordActions: nn,
  ResultsArea: Xa,
  SegmentedControl: Ic,
  StatusPill: je,
  ListView: sn,
  CardsView: Va,
  GridView: Da,
  ImagesView: Ka,
  TableView: Ga,
  LinksView: Wa,
  PreviewView: za,
  TypeCardsView: Ya
}, dd = {
  install(e, t = {}) {
    const n = t.prefix ?? "";
    for (const [a, s] of Object.entries(hu))
      e.component(`${n}${a}`, s);
    t.route && e.provide(na, t.route), (t.theme || t.accent || t.tokens) && yl({ theme: t.theme, accent: t.accent, tokens: t.tokens }, e);
  }
};
export {
  wu as COLUMN_BREAKPOINTS,
  _u as COLUMN_ROLES,
  Va as CardsView,
  Xn as ColumnCell,
  Yc as CopyButton,
  Ds as DEFAULT_ENTITY_VIEW,
  Gt as DEFAULT_SORT,
  fa as DEFAULT_VIEW,
  El as DRAFT_DELAY,
  _c as DataShell,
  ke as EMPTY_CELL,
  wa as ENTITY_ALL,
  $t as ENTITY_TERM,
  ot as EXPRESSION_TERM,
  Da as GridView,
  dd as HeaderContentLayoutPlugin,
  Ka as ImagesView,
  Wa as LinksView,
  sn as ListView,
  gt as MOCK_TINTS,
  dt as MetricDrill,
  ft as OpenMark,
  hn as PARAM_DIR,
  Ue as PARAM_ENTITY,
  Be as PARAM_EXPR,
  It as PARAM_PAGE,
  pn as PARAM_SORT,
  Nt as PARAM_VIEW,
  gu as PILL_TONES,
  Rl as POPOVER_FLIP_BELOW,
  Nl as POPOVER_GAP,
  Il as POPOVER_MARGIN,
  _n as PinStar,
  za as PreviewView,
  wn as QueryMark,
  Ye as RECORD_STATUSES,
  vn as RESULT_FIELDS,
  na as ROUTE_ADAPTER_KEY,
  nn as RecordActions,
  Vr as RecordChoosers,
  Xa as ResultsArea,
  Ta as SHELL_CONTEXT_KEY,
  bt as SHELL_THEME_KEY,
  vt as ScopeMark,
  Ic as SegmentedControl,
  Fe as SelectTick,
  Tu as ShellCard,
  Nu as ShellCode,
  Ru as ShellDialog,
  Fc as ShellFact,
  Ou as ShellFacts,
  Ba as ShellHeader,
  Iu as ShellLog,
  Cr as ShellPager,
  ql as ShellPopover,
  Bu as ShellToasts,
  an as StandingControl,
  Au as StatusCounts,
  je as StatusPill,
  ru as TOAST_ERROR_MS,
  lu as TOAST_MS,
  Ga as TableView,
  Ya as TypeCardsView,
  js as VIEW_ICONS,
  cn as VIEW_KINDS,
  qn as VIEW_LABELS,
  ze as addTerm,
  dn as andExpression,
  Xu as bytesCell,
  sa as cellFull,
  $i as cellNarrowings,
  Le as cellText,
  mt as cellTextOf,
  ue as cellValue,
  Xs as changesResults,
  td as chipsFrom,
  Ln as columnAlign,
  Tn as columnClass,
  En as columnKey,
  Qa as columnNarrows,
  ut as columnShortcut,
  ca as columnShortcutOf,
  Qt as columnTruncates,
  _s as columnsFor,
  ra as compactShortcuts,
  Ql as completeDraft,
  Ys as countPages,
  is as createHistoryAdapter,
  ld as createMemoryAdapter,
  cd as createMemoryDataSource,
  rl as createMockDataSource,
  rd as createVueRouterAdapter,
  Uu as dateColumn,
  bs as defaultCellText,
  yt as defaultQuery,
  Re as defaultViewFor,
  cs as detachableAdapter,
  Wt as drillExpression,
  Ju as durationCell,
  Zu as elapsedCell,
  Qs as emptyFacetValue,
  ul as entityAddress,
  Qu as entityColumn,
  Yt as entityCount,
  id as entityRedirect,
  Sa as excludingTerm,
  tt as expandShortcuts,
  Gu as facetColumn,
  rt as facetField,
  Na as facetValue,
  Ts as fieldHeading,
  xa as fieldTerm,
  st as findEntity,
  ka as findEntityByAddress,
  Ee as findSort,
  Yu as flagColumn,
  Xe as fnv1a,
  pa as focusEntity,
  ps as formatBytes,
  et as formatCount,
  fs as formatDate,
  ku as formatDateTime,
  Lt as formatDigits,
  hs as formatDuration,
  ms as formatElapsed,
  he as formatExpression,
  De as formatInteger,
  ds as formatMetric,
  vs as formatOrdinal,
  ys as formatPercent,
  Ps as formatRange,
  _e as formatTerm,
  ll as generateRows,
  bl as hasActiveFacets,
  Wu as identityColumn,
  Mu as idsExpression,
  xu as isEntityScoped,
  Gs as isFacetActive,
  fn as isPristineQuery,
  We as isRangeTerm,
  ma as isTypeCardsQuery,
  va as isViewKind,
  $u as joinExpression,
  Ca as liftTerm,
  Is as matchesExpression,
  ju as metricColumn,
  Eu as narrowPatch,
  Rs as negateTerm,
  fu as niceMax,
  fe as normalizeSearch,
  bi as numberRange,
  Hs as oppositeTerm,
  qu as ordinalColumn,
  le as parseExpression,
  vl as parseQuery,
  ed as percentCell,
  Ku as pictureColumn,
  Bl as placePopover,
  Wr as presentParts,
  Fa as presentRow,
  lt as pressOptions,
  hl as provideShellContext,
  yl as provideShellTheme,
  ud as queryAll,
  nd as rangeFrom,
  Tt as rangeOf,
  Vs as readDraft,
  Pu as readExpression,
  od as recordRedirect,
  $a as recordTerm,
  pl as recordsIn,
  zu as referenceColumn,
  at as refineExpression,
  Ie as resolveView,
  pe as roleColumn,
  aa as roleColumns,
  ks as rowKey,
  nt as sameTerm,
  Bt as scopeTerm,
  kt as scopeTermFor,
  Ea as scopedEntity,
  Cu as searchFromQuery,
  Ks as searchesCorpus,
  Dn as serializeQuery,
  dl as sortAddress,
  At as sortsFor,
  bu as splitExpression,
  ba as standingTerm,
  Vu as stateColumn,
  gs as stripAnsi,
  Sl as summarizeQuery,
  xt as summaryTerms,
  yn as termStanding,
  Du as tintColumn,
  Su as tintFor,
  ad as toggleFacet,
  mi as useColumns,
  Ll as useDraft,
  Br as useEntityCounts,
  Vi as useEntityPreviews,
  gn as useLayerTheme,
  Hu as usePoll,
  He as usePresentedRows,
  Cl as useQueryState,
  Al as useRecordNames,
  Pl as useResults,
  ee as useShellContext,
  Fu as useStableSchema,
  iu as useToasts,
  sd as usefulFacets,
  Ws as viewAcross,
  zs as viewAfter,
  Ia as withFacetValue,
  Xt as withStanding,
  Kn as withWhere,
  Lu as withoutFacet,
  Ma as withoutOwnScope,
  Bs as withoutTerm
};
