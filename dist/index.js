import { ref as B, computed as f, inject as un, provide as dn, getCurrentInstance as aa, shallowRef as he, toValue as Oe, watch as ae, onScopeDispose as Et, getCurrentScope as sa, defineComponent as z, onMounted as ut, onBeforeUnmount as we, openBlock as u, createBlock as O, Teleport as Lt, createElementVNode as S, mergeProps as Ie, unref as k, renderSlot as G, createCommentVNode as L, nextTick as Ze, createElementBlock as m, withKeys as Ae, useSlots as Tt, useId as Ot, normalizeClass as ce, withCtx as Y, toDisplayString as M, createTextVNode as Z, Fragment as W, renderList as X, withModifiers as Ne, withDirectives as Xt, normalizeStyle as oe, vModelText as ns, createVNode as Q, reactive as Pn, toHandlers as fn, resolveDynamicComponent as et, createSlots as yt, useModel as Mn, onBeforeUpdate as as, normalizeProps as Ut, guardReactiveProps as ss, mergeModels as En, vShow as Ln, Comment as ls, Text as rs, readonly as os, watchEffect as is } from "vue";
import { MenuList as cs } from "menu-bar";
const vn = ["list", "cards", "grid", "images", "table", "links", "preview"], Xe = ["ok", "running", "queued", "review", "failed"], wu = [...Xe, "neutral", "accent"], ku = [
  "identity",
  "reference",
  "metric",
  "state",
  "updated",
  "image",
  "tint"
], bu = [480, 620, 760, 900, 1100], la = Symbol("dc.routeAdapter");
function fe(e) {
  if (!e) return "";
  const t = e.replace(/^[?]/, "");
  return t ? `?${t}` : "";
}
function us() {
  const e = typeof window < "u", t = B(e ? fe(window.location.search) : ""), n = B(e ? window.location.pathname : "/"), a = () => {
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
function ds(e, t) {
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
function Je(e) {
  let t = 2166136261;
  for (let n = 0; n < e.length; n++)
    t ^= e.charCodeAt(n), t = Math.imul(t, 16777619);
  return Math.abs(t);
}
const fs = new Intl.NumberFormat("en-US", {
  minimumSignificantDigits: 2,
  maximumSignificantDigits: 2,
  useGrouping: !1
});
function At(e) {
  return Number.isFinite(e) ? Math.abs(e) < 100 ? fs.format(e) : String(Math.round(e)) : "—";
}
function vs(e) {
  return Number.isFinite(e) ? Number.isInteger(e) || Math.abs(e) >= 100 ? tt(e) : At(e) : "—";
}
function tt(e) {
  if (!Number.isFinite(e)) return "—";
  const t = Math.round(e), n = Math.abs(t);
  return n < 1e3 ? String(t) : n < 9950 ? `${(t / 1e3).toFixed(1)}k` : n < 999500 ? `${Math.round(t / 1e3)}k` : n < 995e4 ? `${(t / 1e6).toFixed(1)}m` : `${Math.round(t / 1e6)}m`;
}
function We(e) {
  return Number.isFinite(e) ? Math.round(e).toLocaleString("en-US") : "—";
}
function ps(e) {
  const t = new Date(e);
  if (Number.isNaN(t.getTime())) return "—";
  const n = String(t.getUTCDate()).padStart(2, "0"), a = String(t.getUTCMonth() + 1).padStart(2, "0");
  return `${n}.${a}.${t.getUTCFullYear()}`;
}
function hs(e) {
  return String(e + 1);
}
function $u(e, t) {
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
function ms(e) {
  if (e == null || !Number.isFinite(e) || e < 0) return "—";
  if (e < 1e3) return `${e} B`;
  const t = ["kB", "MB", "GB", "TB"];
  let n = e, a = -1;
  for (; n >= 1e3 && a < t.length - 1; )
    n /= 1e3, a += 1;
  return `${At(n)} ${t[a]}`;
}
function ys(e) {
  if (!e || !Number.isFinite(e)) return "—";
  if (e < 1e3) return `${Math.round(e)}ms`;
  const t = e / 1e3;
  return t < 60 ? `${At(t)}s` : `${Math.floor(t / 60)}m ${Math.round(t % 60)}s`;
}
function gs(e) {
  if (e == null || !Number.isFinite(e) || e <= 0)
    return "—";
  const t = Math.floor(e / 60);
  return t ? `${t}:${String(e % 60).padStart(2, "0")}` : `${e}s`;
}
function _s(e) {
  return e == null || !Number.isFinite(e) ? "—" : `${Math.round(e * 100)}%`;
}
function ws(e) {
  return e.replace(/\x1b\[[0-9;?]*[ -/]*[@-~]/g, "");
}
const ke = "—";
function ve(e, t) {
  return e.find((n) => n.role === t);
}
function ra(e, t) {
  return e.filter((n) => n.role === t);
}
function ks(e, t) {
  const n = (t ? t.columns : e?.columns) ?? [], a = t ? "scoped" : "everything";
  return n.filter(
    (s) => s.role !== "tint" && ((s.when ?? "always") === "always" || s.when === a)
  );
}
const bs = ["id", "entityKey", "entityLabel"];
function de(e, t) {
  if (e.value) return e.value(t);
  const n = e.field ?? e.key;
  if (n !== void 0) {
    if (t.fields && n in t.fields) return t.fields[n];
    if (bs.includes(n))
      return t[n];
  }
}
function Tn(e, t) {
  const n = e.key ?? e.field ?? e.label;
  return n?.trim() ? n.trim() : `column-${t}`;
}
function $s(e, t) {
  return e.id?.trim() ? e.id : `${e.entityKey || "row"}-${t}`;
}
function xs(e, t) {
  if (e == null || e === "") return ke;
  if (t === "number") {
    const n = typeof e == "number" ? e : Number(e);
    return Number.isFinite(n) ? vs(n) : String(e);
  }
  return t === "date" ? ps(String(e)) : Array.isArray(e) ? e.length ? e.join(", ") : ke : String(e);
}
function Ee(e, t) {
  const n = de(e, t);
  return e.format ? e.format(n, t) : xs(n, e.kind);
}
function Ss(e) {
  return typeof e == "number" ? Number.isFinite(e) ? String(e) : "" : typeof e == "string" ? e : Array.isArray(e) ? e.join(", ") : "";
}
function oa(e, t) {
  const n = Ee(e, t), a = Ss(de(e, t));
  return a && a !== n ? a : n;
}
function gt(e, t) {
  return e ? Ee(e, t) : "";
}
function On(e) {
  return e.align ? e.align : e.kind === "number" || e.kind === "ordinal" ? "right" : "left";
}
const Cs = {
  ordinal: "dc-table__num",
  number: "dc-table__number",
  date: "dc-table__date",
  status: "dc-table__state"
};
function An(e) {
  return [Cs[e.kind ?? "text"], e.class].filter(Boolean).join(" ");
}
function Jt(e) {
  if (e.truncate !== void 0) return e.truncate;
  const t = e.kind ?? "text";
  return t === "text" || t === "number" || t === "date";
}
const Ps = /^([A-Za-z_][\w.-]*)\s*(>=|<=|:|=|>|<)\s*(.*)$/, Nn = "-?(?:\\d+\\.?\\d*|\\.\\d+)", Ms = new RegExp(`^(${Nn})?\\.\\.(${Nn})?$`);
function Nt(e) {
  const t = Ms.exec(e.trim());
  if (!t || t[1] === void 0 && t[2] === void 0) return null;
  const n = t[1] === void 0 ? null : Number(t[1]), a = t[2] === void 0 ? null : Number(t[2]);
  return n !== null && a !== null && n > a ? { min: a, max: n } : { min: n, max: a };
}
function Es(e) {
  return `${e.min ?? ""}..${e.max ?? ""}`;
}
function ze(e) {
  return e.kind === "field" && (e.comparator === ":" || e.comparator === "=") && Nt(e.value) !== null;
}
function Ls(e) {
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
function ie(e) {
  const t = e.trim();
  if (!t) return [];
  const n = [];
  let a = [];
  for (const s of Ls(t)) {
    const l = s.toUpperCase();
    if (l === "AND" || l === "&&") continue;
    if (l === "OR" || l === "||") {
      a.length && n.push(a), a = [];
      continue;
    }
    const r = s.length > 1 && s.startsWith("-"), i = r ? s.slice(1) : s, o = r ? { negated: !0 } : {}, c = Ps.exec(i);
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
const Pe = (e) => e.toLowerCase().replace(/\s+/g, ""), ia = [
  ["status", "state"],
  ["state", "state"],
  ["updated", "updated"],
  ["date", "updated"],
  ["name", "identity"],
  ["ref", "reference"]
];
function Ts(e, t, n) {
  const a = Pe(e), s = n.columns ?? [];
  if (a === "entity") return t.entityKey;
  if (e in t.fields) return t.fields[e];
  const l = s.find(
    (c) => c.key?.toLowerCase() === e.toLowerCase() || c.field?.toLowerCase() === e.toLowerCase() || c.label !== void 0 && Pe(c.label) === a
  );
  if (l) return de(l, t);
  const r = n.facets.find(
    (c) => c.key.toLowerCase() === a || Pe(c.label) === a
  );
  if (r && r.key in t.fields) return t.fields[r.key];
  const i = ia.find(([c]) => c === a)?.[1];
  if (i) {
    const c = ve(s, i);
    if (c) return de(c, t);
  }
  const o = /^metric(\d+)$/.exec(a);
  if (o) {
    const c = ra(s, "metric")[Number(o[1]) - 1];
    if (c) return de(c, t);
  }
}
function dt(e) {
  return (e.toLowerCase().match(/[\p{L}\p{N}]+/gu) ?? []).map((t) => t.charAt(0)).join("");
}
const In = /^[a-z_][\w.-]*$/;
function It(e) {
  const t = (e.key ?? e.field)?.toLowerCase();
  if (t !== void 0) return In.test(t) ? t : void 0;
  const n = e.label === void 0 ? void 0 : Pe(e.label);
  return n !== void 0 && In.test(n) ? n : void 0;
}
function pn(e, t) {
  const n = Pe(e);
  return !!t?.entities.some((a) => a.scope && Pe(a.scope) === n);
}
function Os(e, t, n) {
  const a = Pe(e);
  if (a === "entity" || ia.some(([l]) => l === a) || /^metric\d+$/.test(a) || pn(e, n)) return !0;
  const s = (l) => l !== void 0 && Pe(l) === a;
  return (t.columns ?? []).some(
    (l) => s(l.key) || s(l.field) || s(l.label)
  ) || t.facets.some((l) => s(l.key) || s(l.label));
}
function nt(e, t, n) {
  return t ? ua(e, (a) => {
    const s = da(a, t, n);
    return s && It(s);
  }) : e;
}
function ca(e, t, n) {
  return t ? ua(e, (a) => {
    if (pn(a, n)) return;
    const s = (t.columns ?? []).find((l) => It(l) === a);
    return s && fa(s, t, n);
  }) : e;
}
function As(e, t, n) {
  if (!t || pn(e, n)) return;
  const a = t.facets.find((s) => s.key.toLowerCase() === e);
  return a ? a.label : (t.columns ?? []).find((s) => It(s) === e)?.label;
}
function ua(e, t) {
  let n = !1;
  const a = ie(e).map(
    (s) => s.map((l) => {
      if (l.kind !== "field") return l;
      const r = t(l.field);
      return !r || r === l.field ? l : (n = !0, { ...l, field: r });
    })
  );
  return n ? pe(a) : e;
}
function da(e, t, n) {
  if (!(!e || Os(e, t, n)))
    return (t.columns ?? []).find(
      (a) => a.label !== void 0 && dt(a.label) === e
    );
}
function fa(e, t, n) {
  if (!t || e.label === void 0 || !It(e)) return;
  const a = dt(e.label);
  return da(a, t, n) === e ? a : void 0;
}
function Qt(e, t) {
  const n = e.toLowerCase(), a = t.toLowerCase();
  if (!a.includes("*")) return n.includes(a);
  const s = a.replace(/[.+?^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*");
  return new RegExp(s).test(n);
}
function Rn(e, t) {
  return e.toLowerCase() === t.toLowerCase();
}
function Ns(e, t, n, a) {
  if (e.kind === "text") {
    const o = n.columns ?? [];
    return ["identity", "reference"].some((c) => {
      const d = ve(o, c), v = d ? de(d, t) : void 0;
      return typeof v == "string" && Qt(v, e.value);
    });
  }
  const s = Ts(e.field, t, n);
  if (s === void 0) return a?.has(e.field) ? !1 : null;
  const l = ze(e) ? Nt(e.value) : null;
  if (l) {
    if (Array.isArray(s) || typeof s == "boolean") return null;
    const o = typeof s == "number" ? s : Number(s);
    return Number.isFinite(o) ? (l.min === null || o >= l.min) && (l.max === null || o <= l.max) : null;
  }
  if (Array.isArray(s))
    return e.comparator === ":" || e.comparator === "=" ? s.some(
      (c) => e.comparator === "=" ? Rn(String(c), e.value) : Qt(String(c), e.value)
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
    return e.comparator === "=" ? Rn(String(s), e.value) : Qt(String(s), e.value);
  }
  const r = Number(e.value), i = typeof s == "number" ? s : Number(s);
  return !Number.isFinite(r) || !Number.isFinite(i) ? null : Is(e.comparator, i, r);
}
function Bn(e, t, n, a) {
  const s = Ns(e, t, n, a);
  return s === null ? !0 : e.negated ? !s : s;
}
function Is(e, t, n) {
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
  return e.kind === "field" && !e.negated && (e.comparator === ":" || e.comparator === "=") && !ze(e);
}
const qn = /* @__PURE__ */ new WeakMap();
function Rs(e) {
  if (!e?.strictScopes) return null;
  let t = qn.get(e);
  return t || (t = new Set(
    e.entities.flatMap((n) => n.scope ? [n.scope.toLowerCase()] : [])
  ), qn.set(e, t)), t;
}
function Bs(e, t, n, a) {
  if (!e.length) return !0;
  const s = Rs(a);
  return e.some((l) => {
    const r = /* @__PURE__ */ new Map();
    for (const i of l)
      Hn(i) && r.set(
        i.field,
        (r.get(i.field) ?? !1) || Bn(i, t, n, s)
      );
    return l.every(
      (i) => Hn(i) ? r.get(i.field) === !0 : Bn(i, t, n, s)
    );
  });
}
function Fn(e) {
  return /[\s"']/.test(e) ? `"${e.replace(/["']/g, "")}"` : e;
}
function _e(e) {
  const t = e.negated ? "-" : "";
  return e.kind === "text" ? t + Fn(e.value) : `${t}${e.field}${e.comparator}${Fn(e.value)}`;
}
function Hs(e) {
  if (!e.negated) return { ...e, negated: !0 };
  const { negated: t, ...n } = e;
  return n;
}
function pe(e) {
  return e.filter((t) => t.length).map((t) => t.map(_e).join(" ")).join(" OR ");
}
function qs(e, t, n) {
  return e.map((a, s) => s === t ? a.filter((l, r) => r !== n) : a).filter((a) => a.length);
}
function xu(e) {
  const t = ie(e);
  if (t.length > 1) return { parts: [], text: e.trim() };
  const n = t[0] ?? [];
  return {
    parts: n.filter((a) => a.kind === "field"),
    text: n.filter((a) => a.kind === "text").map(_e).join(" ")
  };
}
function Su(e, t) {
  return [...e.map(_e), t.trim()].filter(Boolean).join(" ");
}
const Vn = (e, t) => e.toLowerCase() === t.toLowerCase();
function at(e, t) {
  return !!e.negated == !!t.negated && va(e, t);
}
function Fs(e, t) {
  return !!e.negated != !!t.negated && va(e, t);
}
function va(e, t) {
  return e.kind === "field" ? t.kind === "field" && e.field === t.field && e.comparator === t.comparator && Vn(e.value, t.value) : t.kind === "text" && Vn(e.value, t.value);
}
function Vs(e, t) {
  return t.filter((n) => !e.some((a) => at(a, n)));
}
function hn(e, t) {
  return pa(e, t, (n) => n);
}
function st(e, t) {
  return pa(
    e,
    t,
    (n, a) => n.filter((s) => !a.some((l) => Fs(s, l)))
  );
}
const Ds = /^[A-Za-z_][\w.-]*\s*(?:>=|<=|:|=|>|<)$/;
function Ks(e) {
  return pe(
    ie(e).map(
      (t) => t.filter(
        (n) => n.kind !== "text" || n.value !== "-" && !Ds.test(n.value)
      )
    ).filter((t) => t.length > 0)
  );
}
function pa(e, t, n) {
  const a = ie(e), s = ie(t);
  return a.length ? s.length ? pe(
    a.flatMap(
      (l) => s.map((r) => [...n(l, r), ...Vs(l, r)])
    )
  ) : pe(a) : pe(s);
}
const ha = "cards", Ws = "table";
function zs(e, t = null) {
  if (e.trim() === "") return !1;
  if (!t) return !0;
  const n = new Set(
    t.entities.flatMap((a) => a.scope ? [a.scope.toLowerCase()] : [])
  );
  return !ie(e).flat().some((a) => a.kind === "field" && !a.negated && n.has(a.field.toLowerCase()) && a.value !== "");
}
function Be(e, t = {}, n = "", a = null) {
  const s = (r) => r && ma(r) ? r : void 0;
  if (e === null)
    return (zs(n, a) ? s(t.searchView) : void 0) ?? s(t.view) ?? ha;
  const l = t.landing === "entity" ? s(t.view) : void 0;
  return s(t.entityView) ?? l ?? Ws;
}
function js(e, t, n, a = {}, s = "", l = s, r = null) {
  return a.viewAcrossTypes !== "default" && e !== Be(t, a, s, r) ? e : Be(n, a, l, r);
}
function Us(e, t, n = {}, a = null) {
  if (e.entity !== t.entity)
    return js(e.view, e.entity, t.entity, n, e.expr, t.expr, a);
  const s = Be(e.entity, n, e.expr, a);
  return e.view === s ? Be(t.entity, n, t.expr, a) : e.view;
}
const Zt = "updated";
function ma(e) {
  return typeof e == "string" && (e === "record" || vn.includes(e));
}
const Dn = {
  list: "List",
  cards: "Cards",
  grid: "Grid",
  images: "Images",
  table: "Table",
  links: "Links",
  preview: "Preview",
  record: "Record"
}, Qs = {
  list: "M6 4h7.5M6 8h7.5M6 12h7.5M2.5 4h.01M2.5 8h.01M2.5 12h.01",
  cards: "M2.5 2.5h11v4.5h-11zM2.5 9h11v4.5h-11z",
  grid: "M2.5 2.5h4.5v4.5h-4.5zM9 2.5h4.5v4.5H9zM2.5 9h4.5v4.5h-4.5zM9 9h4.5v4.5H9z",
  images: "M2.5 3h11v10h-11zM2.5 11l3.5-3.5 2.5 2.5 2-2 3 3M10.5 5.75h.01",
  table: "M2.5 3h11v10h-11zM2.5 6.5h11M2.5 9.75h11M6.5 6.5V13",
  links: "M6.75 9.25a2.5 2.5 0 0 0 3.54 0l2.12-2.12a2.5 2.5 0 0 0-3.54-3.54l-.7.7M9.25 6.75a2.5 2.5 0 0 0-3.54 0L3.59 8.87a2.5 2.5 0 0 0 3.54 3.54l.7-.7",
  preview: "M1.5 8S4 3.5 8 3.5 14.5 8 14.5 8 12 12.5 8 12.5 1.5 8 1.5 8zM6 8a2 2 0 1 0 4 0 2 2 0 1 0-4 0",
  record: "M4 2h5.5L12 4.5V14H4zM9.5 2v2.5H12M6 8h4M6 10.5h4"
};
function Re(e, t) {
  if (e === "record" && !t?.includes(e)) return t?.[0] ?? ha;
  const [n] = t ?? [];
  return n === void 0 || t?.includes(e) ? e : n;
}
function en(e) {
  return typeof e.count == "number" ? tt(e.count) : e.count;
}
function lt(e, t) {
  return t ? e.entities.find((n) => n.key === t) ?? null : null;
}
function ya(e, t = {}) {
  const n = lt(e, t.entity), a = e.entities[0];
  if (!n && !a) throw new Error(`Schema "${e.key}" declares no entities`);
  return n ?? a;
}
function ga(e, t = null) {
  return e?.columns ?? t?.columns ?? [];
}
function Rt(e, t = null) {
  if (e?.sorts?.length) return e.sorts;
  const n = /* @__PURE__ */ new Set(), a = [];
  for (const s of ga(e, t))
    !s.sort || n.has(s.sort) || (n.add(s.sort), a.push({ key: s.sort, label: (s.label ?? s.sort).toLowerCase() }));
  return a;
}
const Gs = { key: Zt, label: Zt };
function Me(e, t, n = null) {
  const a = Rt(e, n);
  return (t ? a.find((l) => l.key === t) : void 0) ?? a.find((l) => l.key === Zt) ?? a[0] ?? Gs;
}
function Ys(e) {
  switch (e.kind) {
    case "chips":
      return { kind: "chips", selected: [] };
    case "range":
      return { kind: "range", min: null, max: null };
    case "toggle":
      return { kind: "toggle", on: !1 };
  }
}
function Xs(e) {
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
function mn(e) {
  return e.entity === null && e.expr.trim() === "";
}
function Cu(e) {
  return e.entity !== null;
}
function _a(e, t) {
  return e.entity === null && Re(e.view, t) === "cards";
}
function Js(e, t) {
  return t <= 0 ? 1 : Math.max(1, Math.ceil(e / t));
}
function wt(e, t = {}) {
  const a = t.landing === "entity" ? ya(e, t) : null;
  return {
    entity: a?.key ?? null,
    view: Be(a?.key ?? null, t),
    sort: Me(a, t.sort).key,
    dir: t.dir === "asc" ? "asc" : "desc",
    expr: "",
    page: 1
  };
}
const yn = ["entity", "sort", "dir", "expr"];
function Zs(e) {
  return yn.some((t) => t in e);
}
const wa = (e) => e.kind === "date" || e.role === "updated";
function el(e) {
  if (!e) return () => 0;
  const n = (e.kind ?? "text") === "number" || e.role === "metric", a = wa(e);
  return (s, l) => {
    const r = de(e, s), i = de(e, l);
    return n ? Number(i ?? 0) - Number(r ?? 0) : a ? Date.parse(String(i ?? "")) - Date.parse(String(r ?? "")) : String(i ?? "").localeCompare(String(r ?? ""));
  };
}
function Kn(e, t) {
  return !t || !wa(t) ? !1 : !Number.isFinite(Date.parse(String(de(t, e) ?? "")));
}
function ka({ query: e, schema: t, entity: n, limit: a, offset: s }, l, r) {
  const i = ie(e.expr), o = n ? [n] : t.entities;
  let c = 0;
  const d = [];
  for (const b of o)
    for (const C of l(b))
      c += 1, Bs(i, C, b, t) && d.push(C);
  const v = Me(n, e.sort, t), _ = ga(n, t).find((b) => b.sort === v.key), g = r.undatedLast ? d.filter((b) => !Kn(b, _)) : d, p = r.undatedLast ? d.filter((b) => Kn(b, _)) : [];
  g.sort(el(_)), e.dir === "asc" && g.reverse();
  const y = p.length ? [...g, ...p] : g;
  return {
    // One page out of the middle. `total` stays the whole match, which is what
    // the shell counts pages with.
    rows: r.zeroIsAll && a <= 0 ? y.slice(s) : y.slice(s, s + a),
    total: d.length,
    unfiltered: d.length === c
  };
}
const kt = [
  "oklch(0.36 0.06 240)",
  "oklch(0.34 0.07 290)",
  "oklch(0.36 0.06 160)",
  "oklch(0.38 0.06 80)",
  "oklch(0.35 0.07 30)",
  "oklch(0.34 0.05 200)"
];
function Pu(e) {
  return kt[Je(e) % kt.length];
}
function ba(e, t) {
  return `${e}_${1e4 + t * 7}`;
}
const tl = 7, nl = 3;
function al(e, t, n, a) {
  const s = (t * tl + Je(n)) % a, l = [];
  for (let r = 0; r < Math.min(nl, a); r++)
    l.push(ba(e, (s + r) % a));
  return l;
}
function sl(e, t) {
  switch (e.kind) {
    case "chips":
      return e.multiple ? ll(e.options, t) : e.options[t % e.options.length] ?? "";
    case "range": {
      const n = Math.max(0, e.max - e.min);
      return e.min + (n === 0 ? 0 : t % (n + 1));
    }
    case "toggle":
      return t % 3 === 0;
  }
}
function ll(e, t) {
  if (!e.length) return [];
  const n = 1 + (t >> 5) % Math.min(3, e.length), a = t % e.length, s = /* @__PURE__ */ new Set();
  for (let l = 0; l < n; l++) s.add((a + l) % e.length);
  return [...s].sort((l, r) => l - r).map((l) => e[l]);
}
function rl(e, t) {
  const { hash: n, sample: a, revision: s, updatedAt: l } = t, r = s ? ` · rev ${s + 1}` : "";
  switch (e.role) {
    case "identity":
      return `${a[0]}${r}`;
    case "reference":
      return s ? `${a[1]}-${s + 1}` : a[1];
    case "state":
      return Xe[n % Xe.length];
    case "updated":
      return l;
    case "tint":
      return kt[n % kt.length];
    case "metric":
      return 1 + n % 940;
  }
  switch (e.kind) {
    case "number":
      return 1 + n % 940;
    case "status":
      return Xe[n % Xe.length];
    case "date":
      return l;
    default:
      return;
  }
}
function ol(e, t = {}) {
  const n = t.population ?? 48, a = t.seed ?? "", s = t.now ?? /* @__PURE__ */ new Date("2026-08-25T00:00:00Z"), l = e.samples, r = t.scopes ?? [];
  if (!l.length) return [];
  const i = [];
  for (let o = 0; o < n; o++) {
    const c = l[o % l.length], d = Math.floor(o / l.length), v = Je(`${a}:${e.key}:${c[0]}:${o}`), _ = ba(e.key, o), g = new Date(s.getTime() - v % 900 * 36e5).toISOString(), p = {};
    for (const y of e.columns ?? []) {
      const b = y.field ?? y.key;
      if (!b || y.value) continue;
      const C = rl(y, {
        hash: Je(`${v}:${b}`),
        sample: c,
        revision: d,
        updatedAt: g
      });
      C !== void 0 && (p[b] = C);
    }
    for (const y of e.facets)
      p[y.key] = sl(y, Je(`${v}:${y.key}`));
    for (const [y, b] of r)
      p[y] = b === e.key ? _ : al(b, o, y, n);
    i.push({ id: _, entityKey: e.key, entityLabel: e.label, fields: p });
  }
  return i;
}
function il(e = {}) {
  const t = /* @__PURE__ */ new Map(), n = (a, s) => {
    const l = t.get(a.key);
    if (l) return l;
    const r = e.scopes ?? s.entities.flatMap(
      (o) => o.scope ? [[o.scope, o.key]] : []
    ), i = ol(a, { ...e, scopes: r });
    return t.set(a.key, i), i;
  };
  return {
    query(a) {
      return ka(a, (s) => n(s, a.schema), {
        undatedLast: !1,
        zeroIsAll: !1
      });
    }
  };
}
const Qe = "e", Bt = "v", gn = "s", _n = "d", He = "q", Ht = "p", $a = "*", cl = [
  Qe,
  Bt,
  gn,
  _n,
  He,
  Ht
], ul = [
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
function bt(e) {
  let t = encodeURIComponent(e);
  for (const [n, a] of ul) t = t.replace(n, a);
  return t;
}
function ge(e) {
  try {
    return decodeURIComponent(e.replace(/\+/g, " "));
  } catch {
    return e.replace(/\+/g, " ");
  }
}
function wn(e) {
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
function dl(e) {
  return cl.includes(e);
}
function qt(e, t) {
  if (!(!t || e.some((n) => n.key === t)))
    return e.find((n) => dt(n.label) === t);
}
function fl(e, t) {
  const n = dt(e.label);
  return qt(t.entities, n)?.key === e.key ? n : e.key;
}
function xa(e, t) {
  return t ? lt(e, t) ?? qt(e.entities, t) ?? null : null;
}
function vl(e, t) {
  const n = dt(e.label);
  return qt(t, n)?.key === e.key ? n : e.key;
}
function pl(e, t) {
  return t.some((n) => n.key === e) ? e : qt(t, e)?.key ?? e;
}
function hl(e, t, n = {}) {
  const a = wt(t, n), s = new Map(wn(e)), l = s.get(Qe), r = l === void 0 ? a.entity : ge(l), i = r === $a ? null : xa(t, r), o = s.get(He), c = o === void 0 ? "" : nt(ge(o), i, t), d = s.get(Bt), v = d && ma(ge(d)) ? ge(d) : Be(i?.key ?? null, n, c, t), _ = s.get(gn), g = Me(
    i,
    _ ? pl(ge(_), Rt(i, t)) : n.sort,
    t
  ), p = s.get(_n), y = p ? ge(p) === "asc" ? "asc" : "desc" : a.dir, b = s.get(Ht), C = b === void 0 ? 1 : Number(ge(b)), N = Number.isFinite(C) ? Math.max(1, Math.floor(C)) : 1;
  return {
    entity: i?.key ?? null,
    view: v,
    sort: g.key,
    dir: y,
    expr: c,
    page: N
  };
}
function Wn(e, t, n = {}, a = "") {
  const s = wt(t, n), l = lt(t, e.entity), r = wn(a).filter(([v]) => !dl(v)), i = [], o = (v, _) => i.push([v, bt(_)]), c = l?.key ?? null;
  if (c !== s.entity && o(Qe, l ? fl(l, t) : $a), e.view !== Be(c, n, e.expr, t) && o(Bt, e.view), e.sort !== s.sort) {
    const v = Rt(l, t), _ = v.find((g) => g.key === e.sort);
    o(gn, _ ? vl(_, v) : e.sort);
  }
  e.dir !== s.dir && o(_n, e.dir), e.expr.trim() !== "" && o(He, ca(e.expr, l, t)), e.page > 1 && o(Ht, String(e.page));
  const d = [
    ...r.map(([v, _]) => [bt(v), _]),
    ...i
  ];
  return d.length ? `?${d.map(([v, _]) => _ === "" ? v : `${v}=${_}`).join("&")}` : "";
}
function Mu(e) {
  const t = [];
  for (const [n, a] of Object.entries(e))
    for (const s of Array.isArray(a) ? a : [a]) {
      if (typeof s != "string") continue;
      const l = bt(n);
      t.push(s === "" ? l : `${l}=${bt(s)}`);
    }
  return t.length ? `?${t.join("&")}` : "";
}
function Eu(e, t) {
  const n = new Map(wn(e)), a = n.get(He), s = a === void 0 ? "" : ge(a);
  if (!t) return s;
  const l = n.get(Qe);
  return nt(
    s,
    l === void 0 ? null : xa(t, ge(l)),
    t
  );
}
function Ft(e, t) {
  return Ca(e, t.id);
}
function Sa(e, t) {
  return e?.standing === !1 ? null : Ft(e, t);
}
function Ca(e, t) {
  const n = e?.scope;
  return n ? Pa(n, t) : null;
}
function Pa(e, t) {
  return `${e}="${t.replace(/"/g, "")}"`;
}
function Lu(e, t) {
  const n = typeof e == "string" ? e : e?.scope;
  if (!n) return null;
  const a = t.filter((s) => s.replace(/"/g, "") !== "").map((s) => Pa(n, s));
  return a.length ? a.join(" ") : null;
}
function Vt(e, t) {
  if (e.kind !== "field" || t.kind !== "field") return at(e, t);
  const n = (a) => a.comparator === ":" || a.comparator === "=";
  return at(e, { ...t, comparator: n(e) && n(t) ? e.comparator : t.comparator });
}
function $t(e, t) {
  return Vt(e, Hs(t));
}
function xt(e, t) {
  return Ft(
    e.entities.find((n) => n.key === t.entityKey),
    t
  );
}
function je(e, t) {
  if (!t) return e;
  const n = e.trim();
  if (!n) return t;
  const [a] = ie(t).flat();
  if (!a) return n;
  const s = ie(n);
  return s.some((i) => i.some((o) => Vt(o, a))) ? n : s.some((i) => i.some((o) => $t(o, a))) ? pe(
    s.map(
      (i) => i.map((o) => $t(o, a) ? a : o)
    )
  ) : `${n} ${t}`;
}
function Ma(e) {
  if (!e) return null;
  const t = e.trim();
  return t ? t.startsWith("-") ? t.slice(1) : `-${t}` : null;
}
function kn(e, t) {
  if (!t || !e.trim()) return null;
  const [n] = ie(t).flat();
  if (!n) return null;
  const a = ie(e).flat();
  return a.some((s) => Vt(s, n)) ? n.negated ? "out" : "in" : a.some((s) => $t(s, n)) ? n.negated ? "in" : "out" : null;
}
function Ea(e, t) {
  if (!t || !e.trim()) return e;
  const [n] = ie(t).flat();
  if (!n) return e;
  const a = ie(e), s = a.map(
    (l) => l.filter((r) => !Vt(r, n) && !$t(r, n))
  );
  return s.every((l, r) => l.length === a[r]?.length) ? e : pe(s);
}
function tn(e, t, n) {
  return t ? n === null ? Ea(e, t) : je(e, n === "out" ? Ma(t) : t) : e;
}
function nn(e, t) {
  const n = t.shiftKey ? `noopener,popup,width=${window.outerWidth},height=${window.outerHeight}` : "noopener";
  window.open(e, "_blank", n);
}
function La() {
  const e = window.getSelection?.();
  return !!e && !e.isCollapsed;
}
function an(e) {
  return e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0;
}
function rt(e) {
  return e.altKey ? { exclude: !0 } : {};
}
function Gt(e, t, n, a = {}, s) {
  const l = xt(e, n);
  if (a.exclude) return zn(je(t.expr, Ma(l)), s);
  const r = l !== null && e.entities.find((i) => i.key === n.entityKey)?.narrowsAlone === !0;
  return zn(je(r ? "" : t.expr, l), s);
}
function zn(e, t) {
  const n = t?.trim() ? ie(t).flat() : [];
  if (!n.length) return e;
  const a = new Set(n.flatMap((i) => i.kind === "field" ? [i.field] : [])), s = (i) => i.kind === "field" && !i.negated && (i.comparator === ":" || i.comparator === "=") && a.has(i.field), l = e.trim(), r = l ? ie(l) : [[]];
  if (r.length === 1 && !r[0].some(s)) {
    const i = n.filter((o) => !r[0].some((c) => at(c, o)));
    return [l, ...i.map(_e)].filter(Boolean).join(" ");
  }
  return pe(
    r.map((i) => {
      const o = i.filter((c) => !s(c));
      return [...o, ...n.filter((c) => !o.some((d) => at(d, c)))];
    })
  );
}
function Ta(e, t) {
  const n = e?.scope?.toLowerCase();
  if (!n || e?.keepsScope || !t.trim()) return t;
  const a = ie(t), s = a.map(
    (l) => l.filter((r) => r.kind !== "field" || r.field !== n)
  );
  return s.every((l, r) => l.length === a[r]?.length) ? t : pe(s);
}
function Oa(e, t) {
  const n = t.toLowerCase();
  return e.entities.find((a) => a.scope?.toLowerCase() === n) ?? null;
}
function Aa(e, t, n) {
  if (!t || !n) return null;
  const a = Oa(e, t);
  return a ? { entity: a, id: n } : null;
}
function ml(e, t) {
  const n = [], a = /* @__PURE__ */ new Set();
  for (const s of t)
    for (const l of ie(s).flat()) {
      if (l.kind !== "field" || l.negated) continue;
      const r = Aa(e, l.field, l.value);
      if (!r) continue;
      const i = `${r.entity.key}:${r.id.toLowerCase()}`;
      a.has(i) || (a.add(i), n.push({ entityKey: r.entity.key, id: r.id }));
    }
  return n;
}
function Tu(e, t, n = "cards") {
  return {
    // An expression with nothing in it is no parameter, as the shell writes it.
    [He]: je(e, t) || void 0,
    [Qe]: void 0,
    [Bt]: n,
    [Ht]: void 0
  };
}
const Na = Symbol("dc.shellContext");
function yl(e) {
  const t = e.liveQuery ? e : gl(e);
  return dn(Na, t), t;
}
function gl(e) {
  const t = e.draft ?? B("");
  return {
    draft: t,
    liveQuery: e.query,
    drafting: f(() => !1),
    commitDraft() {
      const n = t.value.trim();
      n && (e.setExpression(
        st(e.query.value.expr, nt(n, e.entity.value, e.schema.value))
      ), t.value = "");
    },
    abandonDraft() {
      t.value = "";
    },
    ...e
  };
}
function te() {
  const e = un(Na, null);
  if (!e)
    throw new Error(
      "[appfr] No shell context found. Render this component inside <DataShell>."
    );
  return e;
}
const St = Symbol("dc-shell-theme");
function sn(e) {
  return {
    read: () => ({
      theme: Oe(e.theme),
      accent: Oe(e.accent),
      tokens: Oe(e.tokens)
    })
  };
}
function _l(e, t) {
  t ? t.provide(St, sn(e)) : dn(St, sn(e));
}
function wl(e) {
  const t = aa();
  dn(St, {
    ...sn(e),
    element: () => t?.proxy?.$el ?? null
  });
}
function bn(e) {
  const t = aa(), n = un(St, null), a = he(null);
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
function ot(e) {
  return e.key.toLowerCase();
}
const kl = /* @__PURE__ */ new Set([">", ">=", "<", "<="]);
function Ia(e, t) {
  if (e.kind !== "field" || e.negated || e.field !== ot(t)) return !1;
  const n = e.comparator === ":" || e.comparator === "=";
  switch (t.kind) {
    case "range":
      return ze(e) || kl.has(e.comparator);
    case "chips":
      return n && !ze(e) && Ra(t.options, e.value) !== void 0;
    case "toggle":
      return n && bl(e.value);
  }
}
function Ra(e, t) {
  const n = t.toLowerCase();
  return e.find((a) => a.toLowerCase() === n);
}
function bl(e) {
  const t = e.toLowerCase();
  return t === "true" || t === "yes";
}
function Ba(e, t) {
  const n = (ie(e)[0] ?? []).filter((a) => Ia(a, t));
  switch (t.kind) {
    case "range": {
      let a = null, s = null;
      for (const l of n) {
        const r = Nt(l.value), i = Number(l.value);
        r ? (r.min !== null && (a = r.min), r.max !== null && (s = r.max)) : Number.isFinite(i) && (l.comparator.startsWith(">") ? a = i : s = i);
      }
      return { kind: "range", min: a, max: s };
    }
    case "chips": {
      const a = new Set(n.map((s) => Ra(t.options, s.value)));
      return { kind: "chips", selected: t.options.filter((s) => a.has(s)) };
    }
    case "toggle":
      return { kind: "toggle", on: n.length > 0 };
  }
}
function $l(e, t) {
  const n = ot(e);
  switch (t.kind) {
    case "range":
      return t.min === null && t.max === null ? [] : [{ kind: "field", field: n, comparator: ":", value: Es(t) }];
    case "chips":
      return t.selected.map((a) => ({ kind: "field", field: n, comparator: "=", value: a }));
    case "toggle":
      return t.on ? [{ kind: "field", field: n, comparator: ":", value: "true" }] : [];
  }
}
function Ha(e, t, n) {
  const a = $l(t, n), s = ie(e), l = (s.length ? s : [[]]).map((r) => [
    ...r.filter((i) => !Ia(i, t)),
    ...a
  ]);
  return pe(l);
}
function Ou(e, t) {
  return Ha(e, t, Ys(t));
}
function xl(e, t) {
  return (t?.facets ?? []).some((n) => Xs(Ba(e, n)));
}
const Ct = "entity", it = "expr", Sl = { ">=": "≥", "<=": "≤", ">": ">", "<": "<" };
function Ge(e) {
  const t = Number(e);
  return Number.isFinite(t) && !Number.isInteger(t) ? At(t) : String(e);
}
function Cl(e, t, n) {
  if (e.kind !== "field") return _e(e);
  const a = As(e.field, t, n);
  if (a === void 0) return _e(e);
  const s = e.negated ? "-" : "", l = ze(e) ? Nt(e.value) : null;
  if (l) {
    const i = l.min !== null && l.max !== null ? `${Ge(l.min)} ≤ ${a} ≤ ${Ge(l.max)}` : l.max !== null ? `${a} ≤ ${Ge(l.max)}` : `${a} ≥ ${Ge(l.min)}`;
    return s + i;
  }
  const r = Sl[e.comparator];
  return r ? `${s}${a} ${r} ${Ge(e.value)}` : _e({ ...e, field: a });
}
function Pt(e, t, n = null) {
  const a = [];
  return t && a.push({
    id: Ct,
    label: `entity:${t.key}`,
    facetKey: Ct
  }), ie(e.expr).forEach((s, l) => {
    s.forEach((r, i) => {
      a.push({
        id: `${it}:${l}:${i}`,
        label: Cl(r, t, n),
        address: ca(_e(r), t, n),
        facetKey: it,
        group: l,
        index: i,
        ...r.kind === "field" ? { field: r.field, value: r.value } : {},
        ...r.negated ? { negated: !0 } : {}
      });
    });
  }), a;
}
function Pl(e, t, n = null) {
  if (mn(e)) {
    const l = Me(t, e.sort, n);
    return `everything · ${e.view} · ${l.label}`;
  }
  const a = Pt(e, t).filter((l) => l.facetKey !== it).map((l) => l.label), s = e.expr.trim();
  return s && a.push(`"${s}"`), a.join(" · ");
}
function Ml(e) {
  const { adapter: t } = e, n = f(() => Oe(e.schema)), a = f(() => Oe(e.defaults) ?? {}), s = f(() => hl(t.search.value, n.value, a.value)), l = f(() => lt(n.value, s.value.entity)), r = f(() => l.value ?? ya(n.value, a.value)), i = f(() => Rt(l.value, n.value)), o = f(() => Me(l.value, s.value.sort, n.value)), c = (h, w) => {
    const P = Wn(h, n.value, a.value, t.search.value);
    return P === t.search.value && !t.elsewhere?.value ? !1 : (w === "push" ? t.push(P) : t.replace(P), !0);
  }, d = () => Oe(e.navigationMode) ?? "push", v = () => Oe(e.facetNavigationMode) ?? "replace", _ = (h, w) => c(g(h), w), g = (h) => {
    const w = h.page ?? (Zs(h) ? 1 : s.value.page), P = { ...s.value, ...h, page: w };
    return h.view === void 0 && (P.view = Us(s.value, P, a.value, n.value)), P;
  }, p = (h) => y(g(h)), y = (h) => {
    const w = Wn(h, n.value, a.value, t.search.value);
    return t.href ? t.href(w) : `${t.path.value}${w}`;
  }, b = (h, w) => {
    const P = l.value?.facets.find((ne) => ne.key === h);
    if (!P) return;
    const H = Ha(s.value.expr, P, w(Ba(s.value.expr, P)));
    _({ expr: H }, v());
  }, C = (h) => {
    const w = h === null ? null : lt(n.value, h);
    return (w?.key ?? null) === s.value.entity ? {} : {
      entity: w?.key ?? null,
      sort: Me(w, s.value.sort, n.value).key
    };
  }, N = (h) => {
    const w = C(h);
    Object.keys(w).length && _(w, d());
  };
  return {
    query: s,
    entity: l,
    focus: r,
    sort: o,
    sorts: i,
    summary: f(() => Pl(s.value, l.value, n.value)),
    terms: f(() => Pt(s.value, l.value, n.value)),
    isPristine: f(() => mn(s.value)),
    isEverything: f(() => s.value.entity === null),
    hasFacets: f(() => xl(s.value.expr, l.value)),
    setEntity: N,
    entityHref: (h) => p(C(h)),
    clearEntity: () => N(null),
    setView(h, w) {
      _(w === void 0 ? { view: h } : { view: h, page: Math.max(1, Math.floor(w)) }, d());
    },
    setSort(h) {
      _({ sort: Me(l.value, h, n.value).key }, d());
    },
    toggleDirection() {
      _({ dir: s.value.dir === "desc" ? "asc" : "desc" }, d());
    },
    setExpression(h) {
      return _({ expr: h }, d());
    },
    narrow(h, w, P) {
      return _({ expr: h, ...C(w), ...P ? { view: P } : {} }, d());
    },
    narrowHref(h, w, P) {
      return p({ expr: h, ...C(w), ...P ? { view: P } : {} });
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
      b(h, (H) => H.kind === "range" ? { kind: "range", min: w, max: P } : H);
    },
    toggleFlag(h) {
      b(
        h,
        (w) => w.kind === "toggle" ? { kind: "toggle", on: !w.on } : w
      );
    },
    removeTerm(h) {
      if (h.facetKey === Ct) {
        N(null);
        return;
      }
      if (h.facetKey === it) {
        const w = qs(ie(s.value.expr), h.group ?? 0, h.index ?? 0);
        _({ expr: pe(w) }, d());
      }
    },
    clearFilters() {
      _({ ...C(null), expr: "" }, d());
    },
    clearHref: () => p({ ...C(null), expr: "" }),
    reset() {
      c(wt(n.value, a.value), d());
    },
    homeHref: () => y(wt(n.value, a.value)),
    // The same rule the mutations follow, so a link built for a change goes
    // exactly where clicking through to that change would have gone.
    hrefFor: (h) => p(h)
  };
}
const jn = 50;
function El(e) {
  const t = he([]), n = B(0), a = B(0), s = B(!1), l = B(!1), r = he(null);
  let i = 0, o = null, c = null;
  const d = f(() => (e.query.value.page - 1) * e.limit.value), v = f(() => Js(n.value, e.limit.value)), _ = f(() => Math.max(0, n.value - a.value)), g = () => {
    const I = e.query.value, V = e.within?.value.trim(), q = Ta(e.entity.value, I.expr);
    return V ? { ...I, expr: hn(V, q) } : q === I.expr ? I : { ...I, expr: q };
  }, p = (I, V) => {
    t.value = I.rows, n.value = I.total, a.value = I.kept ?? 0, r.value = null, y(V);
  }, y = (I) => {
    o = { key: I, total: n.value }, l.value = !1;
  }, b = (I) => {
    r.value = I, t.value = [], n.value = 0, a.value = 0, o = null, l.value = !1;
  }, C = (I, V, q, J) => {
    let ue = !0;
    const le = () => I === i;
    let E = 0, j = !1;
    const T = (re) => {
      E = re, j = !0, J === void 0 && (n.value = re);
    }, ee = () => {
      ue && (ue = !1, t.value = [], a.value = 0, T(0)), r.value = null;
    };
    return {
      get open() {
        return le();
      },
      insert(re, me) {
        if (!le()) return;
        const be = Array.isArray(re) ? re : [re];
        if (!be.length) return;
        ee();
        const ye = [...t.value];
        ye.splice(me ?? ye.length, 0, ...be), t.value = V > 0 ? ye.slice(0, V) : ye, T(E + be.length);
      },
      set(re) {
        le() && (re.rows && (ee(), t.value = V > 0 ? re.rows.slice(0, V) : re.rows, T(re.rows.length)), re.total !== void 0 && T(re.total));
      },
      close() {
        le() && (s.value = !1, j && (n.value = E), y(q));
      },
      fail(re) {
        le() && (b(re), s.value = !1);
      }
    };
  }, N = () => {
    const I = c;
    c = null, I?.();
  }, h = () => {
    const I = ++i;
    N();
    const V = w.value, q = o?.key === V ? o.total : void 0;
    l.value = q === void 0;
    const J = {
      query: g(),
      schema: e.schema.value,
      entity: e.entity.value,
      limit: e.limit.value,
      offset: d.value
    }, ue = e.source.value;
    if (ue.stream) {
      s.value = !0;
      try {
        c = ue.stream(J, C(I, J.limit, V, q)) ?? null;
      } catch (E) {
        b(E), s.value = !1;
      }
      return;
    }
    let le;
    try {
      le = ue.query(J);
    } catch (E) {
      b(E);
      return;
    }
    if (!(le instanceof Promise)) {
      p(le, V), s.value = !1;
      return;
    }
    s.value = !0, le.then((E) => {
      I === i && p(E, V);
    }).catch((E) => {
      I === i && b(E);
    }).finally(() => {
      I === i && (s.value = !1);
    });
  }, w = f(() => {
    const I = g();
    return `${e.entity.value?.key ?? e.schema.value.entities[0]?.key ?? ""}|${JSON.stringify(yn.map((q) => I[q]))}`;
  }), P = f(() => `${w.value}|${e.query.value.page}`);
  return ae([e.source, P, e.limit], h, {
    immediate: !0
  }), Et(() => {
    i++, N();
  }, !0), { rows: t, total: n, matched: _, offset: d, pageCount: v, pending: s, counting: l, error: r, refresh: h, locate: async (I, V) => {
    const q = Math.max(0, V - 1 - jn);
    try {
      const { rows: J } = await e.source.value.query({
        query: g(),
        schema: e.schema.value,
        entity: e.entity.value,
        limit: jn * 2 + 1,
        offset: q
      }), ue = J.findIndex((le) => le.id === I);
      return ue === -1 ? null : q + ue + 1;
    } catch {
      return null;
    }
  }, peek: async (I, V) => {
    if (V <= 0) return [];
    try {
      const { rows: q } = await e.source.value.query({
        query: g(),
        schema: e.schema.value,
        entity: e.entity.value,
        limit: V,
        offset: Math.max(0, I)
      });
      return q;
    } catch {
      return [];
    }
  } };
}
function Ll(e) {
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
  return ae([e.active, e.rows, e.pending, e.page, e.list], s, {
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
const Tl = 150;
function Ol(e) {
  const t = e.delay ?? Tl, n = B(""), a = B("");
  let s = !1, l;
  const r = () => {
    clearTimeout(l), l = void 0;
  }, i = f(() => nt(Ks(a.value), e.entity.value, e.schema?.value)), o = f(() => i.value.trim() !== ""), c = f(
    () => JSON.stringify([i.value, ...yn.map((g) => e.query.value[g])])
  ), d = he(null), v = f(() => {
    const g = e.query.value;
    if (!o.value) return g;
    const p = d.value?.of === c.value ? d.value.page : 1;
    return { ...g, expr: st(g.expr, i.value), page: p };
  });
  ae(n, (g) => {
    if (r(), !g.trim()) {
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
  const _ = (g) => {
    r(), s = !0, n.value = "", !g() && s && (s = !1, a.value = "");
  };
  return sa() && Et(r), {
    text: n,
    live: v,
    drafting: o,
    setPage(g) {
      d.value = { of: c.value, page: Math.max(1, Math.floor(g)) };
    },
    commit() {
      const g = n.value.trim();
      if (!g) return;
      const p = st(
        e.query.value.expr,
        nt(g, e.entity.value, e.schema?.value)
      );
      a.value = g, _(() => e.setExpression(p));
    },
    abandon() {
      r(), s = !1, n.value = "", a.value = "";
    },
    release: _
  };
}
const Al = 25, qa = (e, t) => e.toLowerCase() === t.toLowerCase();
function Nl(e, t) {
  return e.find((n) => qa(n.id, t));
}
function Il(e) {
  const t = he(/* @__PURE__ */ new Map()), n = /* @__PURE__ */ new Set(), a = (i) => {
    if (i.facetKey !== it) return null;
    const o = Aa(e.schema.value, i.field, i.value);
    return o ? { ...o, key: `${o.entity.key}:${o.id}` } : null;
  }, s = (i) => {
    const { entity: o, id: c } = i, d = e.query.value;
    return e.source.value.query({
      query: {
        ...d,
        entity: o.key,
        // The reference on its own. The rest of the query is about the rows on
        // screen, which are of another type entirely.
        expr: Ca(o, c) ?? "",
        sort: Me(o, d.sort, e.schema.value).key,
        page: 1
      },
      schema: e.schema.value,
      entity: o,
      limit: Al,
      offset: 0
    });
  }, l = (i, o) => {
    const c = gt(ve(i.columns ?? [], "identity"), o);
    return c === ke || qa(c, o.id) ? "" : c;
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
      d.forEach((_, g) => {
        const { reference: p } = o[g], y = Nl(_.rows, p.id);
        v.set(p.key, y ? l(p.entity, y) : "");
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
  return ae([e.source, e.schema, e.terms, e.loading], () => {
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
const Rl = 4, Bl = 8, Hl = 180;
function ql(e, t, n, a = {}) {
  const s = a.gap ?? Rl, l = a.margin ?? Bl, r = a.flipBelow ?? Hl, i = a.side ?? "below", o = {
    below: n.height - e.bottom - s - l,
    above: e.top - s - l
  }, c = i === "below" ? "above" : "below", d = o[i] < r && o[c] > o[i] ? c : i, v = Math.min(a.maxHeight ?? 1 / 0, Math.max(0, o[d])), _ = Math.max(0, n.width - l * 2), g = Math.min(a.minWidth ?? e.width, _), p = Math.min(Math.max(t, g), _), y = a.align === "end" ? e.right - p : e.left, b = Math.max(l, Math.min(y, n.width - p - l));
  return d === "below" ? { side: d, left: b, top: e.bottom + s, maxHeight: v, minWidth: g, maxWidth: _ } : { side: d, left: b, bottom: n.height - e.top + s, maxHeight: v, minWidth: g, maxWidth: _ };
}
const Fl = ["data-dc-theme", "data-dc-side"], Ce = [], Vl = /* @__PURE__ */ z({
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
    const n = e, a = t, { theme: s, style: l, adopt: r } = bn(n), i = B(null), o = B(null), c = { root: () => i.value };
    function d() {
      const h = n.anchor;
      h && (o.value = ql(
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
    function g(h) {
      return i.value?.contains(h) || n.anchor?.contains(h) ? !0 : Ce.slice(Ce.indexOf(c) + 1).some((P) => P.root()?.contains(h));
    }
    function p(h) {
      const w = h.target;
      w && !g(w) && _();
    }
    function y(h) {
      h.key !== "Escape" || h.defaultPrevented || Ce[Ce.length - 1] === c && (h.preventDefault(), i.value?.contains(document.activeElement) && n.anchor?.focus(), _());
    }
    let b = null;
    async function C() {
      Ce.includes(c) || (Ce.push(c), r(), o.value = null, await Ze(), d(), window.addEventListener("pointerdown", p, !0), document.addEventListener("keydown", y, !0), window.addEventListener("resize", d), window.addEventListener("scroll", d, !0), typeof ResizeObserver < "u" && i.value && (b = new ResizeObserver(() => d()), b.observe(i.value)));
    }
    function N() {
      const h = Ce.indexOf(c);
      h !== -1 && (Ce.splice(h, 1), window.removeEventListener("pointerdown", p, !0), document.removeEventListener("keydown", y, !0), window.removeEventListener("resize", d), window.removeEventListener("scroll", d, !0), b?.disconnect(), b = null);
    }
    return ut(() => {
      n.open && C();
    }), ae(
      () => n.open,
      (h) => {
        h ? C() : N();
      }
    ), ae(() => n.anchor, () => {
      n.open && d();
    }), we(N), (h, w) => e.open ? (u(), O(Lt, {
      key: 0,
      to: e.to
    }, [
      S("div", Ie({
        ref_key: "root",
        ref: i
      }, h.$attrs, {
        class: "dc-shell dc-layer dc-popover",
        "data-dc-theme": k(s),
        "data-dc-side": o.value?.side,
        style: v.value
      }), [
        G(h.$slots, "default", {}, void 0, !0)
      ], 16, Fl)
    ], 8, ["to"])) : L("", !0);
  }
}), U = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [a, s] of t)
    n[a] = s;
  return n;
}, Dl = /* @__PURE__ */ U(Vl, [["__scopeId", "data-v-a688f2f7"]]), Kl = ["href"], Wl = /* @__PURE__ */ z({
  __name: "PressLink",
  props: {
    href: {},
    selectable: { type: Boolean }
  },
  emits: ["press"],
  setup(e, { emit: t }) {
    const n = e, a = t;
    function s(i) {
      i.stopPropagation(), !La() && (n.href && an(i) ? nn(n.href, i) : a("press", rt(i), i));
    }
    function l(i) {
      n.href && i.button === 1 && nn(n.href, i);
    }
    function r(i) {
      if (n.href && an(i)) {
        i.stopPropagation();
        return;
      }
      i.preventDefault(), a("press", rt(i), i);
    }
    return (i, o) => e.selectable ? (u(), m("span", {
      key: 0,
      role: "link",
      tabindex: "0",
      class: "dc-press",
      onClick: s,
      onAuxclick: l,
      onKeydown: o[0] || (o[0] = Ae((c) => c.currentTarget.click(), ["enter"]))
    }, [
      G(i.$slots, "default", {}, void 0, !0)
    ], 32)) : e.href ? (u(), m("a", {
      key: 1,
      href: e.href,
      class: "dc-press",
      onClick: r
    }, [
      G(i.$slots, "default", {}, void 0, !0)
    ], 8, Kl)) : (u(), m("button", {
      key: 2,
      type: "button",
      class: "dc-press",
      onClick: r
    }, [
      G(i.$slots, "default", {}, void 0, !0)
    ]));
  }
}), se = /* @__PURE__ */ U(Wl, [["__scopeId", "data-v-e5165a68"]]), Mt = (e) => e.toLowerCase().replace(/\s+/g, ""), zl = /(?:[^\s"]|"[^"]*"?)*$/, jl = /^(-?)([^:=<>"\s-][^:=<>"\s]*)([:=])(.*)$/, Un = 4;
function Ul(e, t) {
  const n = Mt(t);
  return e.find((a) => ot(a) === n || Mt(a.label) === n);
}
function Ql(e) {
  switch (e.kind) {
    case "toggle":
      return e.text;
    case "range":
      return `${e.min}..${e.max}`;
    case "chips": {
      const t = e.options.slice(0, Un).join(" · "), n = e.options.length - Un;
      return n > 0 ? `${t} · +${n}` : t;
    }
  }
}
function Gl(e) {
  switch (e.kind) {
    case "toggle":
      return [{ value: "true", hint: e.text }, { value: "false" }];
    case "chips":
      return e.options.map((t) => ({ value: t }));
    case "range":
      return [];
  }
}
function Qn(e, t) {
  return Mt(e).includes(Mt(t));
}
function Yl(e, t) {
  const n = zl.exec(e)?.[0] ?? "", a = e.slice(0, e.length - n.length), s = [], l = jl.exec(n);
  if (l) {
    const [, r, i, o, c] = l, d = Ul(t, i);
    if (!d) return [];
    const v = c.replace(/"/g, "").toLowerCase();
    for (const { value: _, hint: g } of Gl(d)) {
      if (!_.toLowerCase().includes(v)) continue;
      const p = _e({
        kind: "field",
        field: ot(d),
        comparator: o,
        value: _,
        ...r ? { negated: !0 } : {}
      });
      s.push({ draft: a + p, label: p, ...g ? { hint: g } : {}, complete: !0 });
    }
  } else {
    if (/[<>"]/.test(n)) return [];
    const r = n.startsWith("-") ? "-" : "", i = n.slice(r.length);
    for (const o of t) {
      if (i && !Qn(o.key, i) && !Qn(o.label, i)) continue;
      const c = `${r}${ot(o)}:`;
      s.push({ draft: a + c, label: c, hint: Ql(o), complete: !1 });
    }
  }
  return s.filter((r) => r.draft !== e);
}
const Xl = { class: "dc-header__main" }, Jl = {
  class: "dc-header__brand",
  "aria-hidden": "true"
}, Zl = { class: "dc-header__sr" }, er = {
  key: 2,
  class: "dc-header__within"
}, tr = ["title"], nr = { class: "dc-header__query" }, ar = ["data-dc-more", "title"], sr = { class: "dc-header__run" }, lr = {
  key: 0,
  class: "dc-header__or dc-mono",
  "aria-hidden": "true"
}, rr = ["title", "aria-label", "onClick"], or = ["placeholder", "aria-expanded", "aria-activedescendant", "onKeydown"], ir = ["id", "aria-selected", "onClick"], cr = { class: "dc-completion__term dc-mono" }, ur = {
  key: 0,
  class: "dc-completion__hint"
}, dr = {
  key: 0,
  class: "dc-header__actions"
}, fr = /* @__PURE__ */ z({
  __name: "ShellHeader",
  props: {
    panel: { type: Boolean }
  },
  setup(e) {
    const t = Tt(), n = e, a = te(), s = f(() => a.schema.value), l = f(() => {
      const x = a.within.value.trim();
      return x ? Pt({ ...a.query.value, expr: x }, null) : [];
    }), r = f(() => {
      const x = a.entity.value, A = x?.keepsScope ? void 0 : x?.scope?.toLowerCase();
      return a.terms.value.filter((F) => F.facetKey !== Ct).map((F, D, Le) => {
        const Te = Le[D - 1];
        return {
          term: F,
          or: Te?.group !== void 0 && F.group !== void 0 && F.group !== Te.group,
          idle: !!A && F.field?.toLowerCase() === A
        };
      });
    }), i = Il({
      source: a.source,
      schema: a.schema,
      query: a.query,
      loading: a.loading,
      // The scope's parts as well as the query's: it names a record more often
      // than a typed term does, being what a record's own page is built on.
      terms: f(() => [...l.value, ...a.terms.value])
    });
    function o(x) {
      const A = Oa(s.value, x)?.scopeLabel ?? x;
      return A.charAt(0).toUpperCase() + A.slice(1);
    }
    function c(x) {
      return x.replace(/\s*\([^()]*\)\s*$/, "");
    }
    function d(x) {
      const A = i.nameOf(x);
      return A ? `${x.negated ? "-" : ""}${o(x.field)}: ${c(A)}` : x.label;
    }
    function v(x) {
      const A = d(x.term), F = x.idle ? `Not applied to ${a.entity.value?.label} — remove ${A}` : `Remove ${A}`, D = x.term.address;
      return D && D !== A ? `${F}
Written ${D} in the address and the search box` : F;
    }
    const _ = f(() => {
      const x = a.pressPreview?.value;
      if (!x) return [];
      const A = a.query.value, F = new Set(a.terms.value.map((D) => D.address));
      return Pt(
        { ...A, expr: x.alone ? x.term : st(A.expr, x.term) },
        a.entity.value,
        a.schema.value
      ).filter((D) => D.address !== void 0 && !F.has(D.address)).map(
        (D) => x.name ? `${o(D.field)}: ${c(x.name)}` : D.label
      );
    }), g = f(() => a.pressPreview?.value?.alone === !0), p = B(null);
    function y(x) {
      p.value = x instanceof HTMLInputElement ? x : null;
    }
    function b() {
      a.abandonDraft(), p.value?.blur();
    }
    function C() {
      const x = w.value[h.value];
      if (P.value && x) {
        ne(x);
        return;
      }
      q.value = null, N.value = !1, a.commitDraft();
    }
    const N = B(!1), h = B(-1), w = f(() => {
      const x = a.entity.value?.facets ?? [];
      return x.length ? Yl(a.draft.value, x) : [];
    }), P = f(() => N.value && w.value.length > 0);
    ae(w, () => {
      h.value = -1;
    });
    const H = `${Ot() ?? "dc-header"}-completions`;
    function ne(x) {
      a.draft.value = x.draft, N.value = !x.complete, h.value = -1, Ze(() => {
        const A = p.value;
        A?.focus(), A?.setSelectionRange(x.draft.length, x.draft.length);
      });
    }
    function I(x, A) {
      if (x.isComposing || !w.value.length) return;
      if (x.preventDefault(), !N.value) {
        N.value = !0;
        return;
      }
      const F = w.value.length + 1;
      h.value = (h.value + 1 + A + F) % F - 1;
    }
    function V(x) {
      return `${H}-${x}`;
    }
    const q = B(null), J = f(() => Math.min(q.value ?? 1 / 0, r.value.length)), ue = f(() => [
      { key: "before", entries: r.value.slice(0, J.value) },
      { key: "after", entries: r.value.slice(J.value) }
    ]), le = f(() => J.value < r.value.length);
    ae(r, (x) => {
      q.value !== null && q.value >= x.length && (q.value = null);
    });
    function E(x, A) {
      q.value = x >= r.value.length ? null : Math.max(0, x), Ze(() => {
        const F = p.value;
        if (!F) return;
        const D = A === "start" ? 0 : F.value.length;
        F.setSelectionRange(D, D), F.scrollIntoView({ block: "nearest", inline: "nearest" }), $e();
      });
    }
    function j(x) {
      const A = p.value;
      return !A || A.selectionStart !== A.selectionEnd ? !1 : A.selectionStart === (x === "start" ? 0 : A.value.length);
    }
    function T(x) {
      J.value === 0 || !j("start") || (x.preventDefault(), E(x.key === "Home" ? 0 : J.value - 1, "start"));
    }
    function ee(x) {
      !le.value || !j("end") || (x.preventDefault(), E(x.key === "End" ? r.value.length : J.value + 1, "end"));
    }
    function re(x) {
      J.value === 0 || !j("start") || (x.preventDefault(), ye(r.value[J.value - 1].term, !0));
    }
    function me(x) {
      !le.value || !j("end") || (x.preventDefault(), ye(r.value[J.value].term, !1));
    }
    function be(x) {
      x.isComposing || x.altKey || x.ctrlKey || x.metaKey || x.shiftKey || (x.key === "ArrowLeft" || x.key === "Home" ? T(x) : x.key === "ArrowRight" || x.key === "End" ? ee(x) : x.key === "Backspace" ? re(x) : x.key === "Delete" && me(x));
    }
    function ye(x, A) {
      A && q.value !== null && (q.value = Math.max(0, q.value - 1)), a.removeTerm(x);
    }
    function ht(x) {
      x.target?.closest("button, input") || (x.preventDefault(), p.value?.focus(), E(r.value.length, "end"));
    }
    function Ve() {
      N.value = !1, a.draft.value || (q.value = null);
    }
    const De = B(null), Ke = B("");
    function $e() {
      const x = De.value;
      if (!x) {
        Ke.value = "";
        return;
      }
      const A = x.scrollLeft > 1, F = x.scrollWidth - x.clientWidth - x.scrollLeft > 1;
      Ke.value = A && F ? "both" : A ? "start" : F ? "end" : "";
    }
    let Se = null;
    return ae(
      De,
      (x) => {
        Se?.disconnect(), Se = null, $e(), !(!x || typeof ResizeObserver > "u") && (Se = new ResizeObserver($e), Se.observe(x));
      },
      { flush: "post" }
    ), ae([r, J], $e, { flush: "post" }), we(() => Se?.disconnect()), (x, A) => (u(), m("div", {
      class: ce(["dc-header", { "dc-header--panel": n.panel }])
    }, [
      S("div", Xl, [
        !n.panel && s.value.label && t.brand ? (u(), O(se, {
          key: 0,
          class: "dc-header__domain",
          "data-dc-brand": "",
          title: "Home",
          href: k(a).homeHref(),
          onPress: A[0] || (A[0] = (F) => k(a).reset())
        }, {
          default: Y(() => [
            S("span", Jl, [
              G(x.$slots, "brand", {
                label: s.value.label
              }, void 0, !0)
            ]),
            S("span", Zl, M(s.value.label), 1)
          ]),
          _: 3
        }, 8, ["href"])) : !n.panel && s.value.label ? (u(), O(se, {
          key: 1,
          class: "dc-header__domain",
          title: "Home",
          href: k(a).homeHref(),
          onPress: A[1] || (A[1] = (F) => k(a).reset())
        }, {
          default: Y(() => [
            Z(M(s.value.label), 1)
          ]),
          _: 1
        }, 8, ["href"])) : L("", !0),
        G(x.$slots, "lead", {}, void 0, !0),
        l.value.length ? (u(), m("span", er, [
          A[10] || (A[10] = S("span", { class: "dc-header__sr" }, "Within", -1)),
          (u(!0), m(W, null, X(l.value, (F) => (u(), m("span", {
            key: `scope:${F.id}`,
            class: "dc-within dc-mono dc-truncate",
            title: d(F)
          }, M(d(F)), 9, tr))), 128))
        ])) : L("", !0),
        S("div", nr, [
          S("div", {
            class: "dc-header__field",
            onMousedown: ht
          }, [
            S("div", {
              ref_key: "termBar",
              ref: De,
              class: "dc-header__terms",
              "data-dc-more": Ke.value,
              title: k(a).summary.value,
              onScroll: $e
            }, [
              (u(!0), m(W, null, X(ue.value, (F) => (u(), m(W, {
                key: F.key
              }, [
                S("span", sr, [
                  (u(!0), m(W, null, X(F.entries, (D) => (u(), m(W, {
                    key: D.term.id
                  }, [
                    D.or ? (u(), m("span", lr, "or")) : L("", !0),
                    S("button", {
                      type: "button",
                      class: ce(["dc-term dc-mono", { "dc-term--idle": D.idle, "dc-term--leaving": g.value }]),
                      title: v(D),
                      "aria-label": `Remove ${d(D.term)}`,
                      onMousedown: A[2] || (A[2] = Ne(() => {
                      }, ["prevent"])),
                      onClick: (Le) => ye(D.term, F.key === "before")
                    }, M(d(D.term)), 43, rr)
                  ], 64))), 128)),
                  F.key === "before" ? (u(!0), m(W, { key: 0 }, X(_.value, (D) => (u(), m("span", {
                    key: D,
                    class: "dc-term dc-term--preview dc-mono",
                    "aria-hidden": "true"
                  }, M(D), 1))), 128)) : L("", !0)
                ]),
                F.key === "before" ? Xt((u(), m("input", {
                  key: 0,
                  ref_for: !0,
                  ref: y,
                  "onUpdate:modelValue": A[3] || (A[3] = (D) => k(a).draft.value = D),
                  class: ce(["dc-header__search dc-mono", { "dc-header__search--between": le.value }]),
                  style: oe({ "--dc-typed": String(Math.max(1, k(a).draft.value.length)) }),
                  type: "text",
                  autocomplete: "off",
                  spellcheck: "false",
                  placeholder: le.value ? "" : "Filter…",
                  "aria-label": "Filter",
                  role: "combobox",
                  "aria-autocomplete": "list",
                  "aria-expanded": P.value,
                  "aria-controls": H,
                  "aria-activedescendant": P.value && h.value >= 0 ? V(h.value) : void 0,
                  onKeydown: [
                    Ae(Ne(C, ["prevent"]), ["enter"]),
                    Ae(Ne(b, ["prevent"]), ["esc"]),
                    A[4] || (A[4] = Ae((D) => I(D, 1), ["down"])),
                    A[5] || (A[5] = Ae((D) => I(D, -1), ["up"])),
                    be
                  ],
                  onFocus: A[6] || (A[6] = (D) => N.value = !0),
                  onInput: A[7] || (A[7] = (D) => N.value = !0),
                  onBlur: Ve
                }, null, 46, or)), [
                  [ns, k(a).draft.value]
                ]) : L("", !0)
              ], 64))), 128))
            ], 40, ar)
          ], 32)
        ])
      ]),
      Q(Dl, {
        id: H,
        open: P.value,
        anchor: p.value,
        "min-width": 0,
        "max-height": 320,
        class: "dc-completions",
        role: "listbox",
        "aria-label": "Completions",
        onClose: A[9] || (A[9] = (F) => N.value = !1)
      }, {
        default: Y(() => [
          (u(!0), m(W, null, X(w.value, (F, D) => (u(), m("div", {
            id: V(D),
            key: F.label,
            class: ce(["dc-completion", { "dc-completion--active": D === h.value }]),
            role: "option",
            "aria-selected": D === h.value,
            onMousedown: A[8] || (A[8] = Ne(() => {
            }, ["prevent"])),
            onClick: (Le) => ne(F)
          }, [
            S("span", cr, M(F.label), 1),
            F.hint ? (u(), m("span", ur, M(F.hint), 1)) : L("", !0)
          ], 42, ir))), 128))
        ]),
        _: 1
      }, 8, ["open", "anchor"]),
      t.actions ? (u(), m("div", dr, [
        G(x.$slots, "actions", {}, void 0, !0)
      ])) : L("", !0)
    ], 2));
  }
}), ln = /* @__PURE__ */ U(fr, [["__scopeId", "data-v-1e7452cc"]]), vr = ["checked", "indeterminate"], Fa = /* @__PURE__ */ z({
  __name: "PageTick",
  setup(e) {
    const t = te(), n = f(() => t.rows.value.filter((l) => t.isSelected(l)).length), a = f(
      () => t.rows.value.length > 0 && n.value === t.rows.value.length
    ), s = f(() => n.value > 0 && !a.value);
    return (l, r) => (u(), m("input", {
      class: "dc-tick",
      type: "checkbox",
      checked: a.value,
      indeterminate: s.value,
      "aria-label": "Select every row on this page",
      title: "Select every row on this page",
      onChange: r[0] || (r[0] = (i) => k(t).selectPage(!a.value))
    }, null, 40, vr));
  }
}), pr = { class: "dc-pick" }, hr = ["id"], mr = ["id", "aria-expanded", "aria-labelledby", "data-dc-value"], yr = {
  key: 0,
  class: "dc-pick__icon",
  viewBox: "0 0 16 16",
  "aria-hidden": "true"
}, gr = ["d"], _r = { class: "dc-pick__label" }, wr = /* @__PURE__ */ z({
  __name: "PickControl",
  props: {
    modelValue: {},
    options: {},
    label: {},
    mono: { type: Boolean }
  },
  emits: ["update:modelValue", "open", "close"],
  setup(e, { emit: t }) {
    const n = e, a = t, s = Ot() ?? "dc-pick", l = B(null), r = B(null), i = B(null), o = B(!1), c = f(() => i.value !== null), d = B(null), v = f(
      () => n.options.find((w) => w.key === n.modelValue) ?? n.options[0]
    ), _ = f(
      () => n.options.map((w) => ({
        id: w.key,
        label: w.label,
        icon: w.icon,
        checked: w.key === n.modelValue
      }))
    ), g = f(
      () => i.value ? { maxHeight: `${window.innerHeight - i.value.y - 8}px` } : void 0
    );
    function p(w) {
      const P = l.value?.getBoundingClientRect();
      P && (d.value = l.value?.closest(".dc-shell") ?? document.body, i.value = { x: P.left, y: P.bottom + 4, mirrorX: P.right }, o.value = w, a("open"));
    }
    function y(w) {
      i.value && a("close"), i.value = null, w && l.value?.focus();
    }
    function b() {
      c.value ? y(!0) : p(!1);
    }
    function C(w) {
      w.key !== "ArrowDown" && w.key !== "ArrowUp" || c.value || (w.preventDefault(), p(!0));
    }
    function N(w) {
      const P = w.target;
      P && (l.value?.contains(P) || r.value?.root?.contains(P) || y(!1));
    }
    ae(c, (w) => {
      w ? window.addEventListener("pointerdown", N, !0) : window.removeEventListener("pointerdown", N, !0);
    }), we(() => window.removeEventListener("pointerdown", N, !0));
    function h(w) {
      y(!0), !(w.id === void 0 || w.id === n.modelValue) && a("update:modelValue", w.id);
    }
    return (w, P) => (u(), m("span", pr, [
      S("span", {
        id: `${k(s)}-name`,
        class: "dc-pick__name"
      }, M(e.label), 9, hr),
      S("button", {
        id: `${k(s)}-value`,
        ref_key: "trigger",
        ref: l,
        type: "button",
        class: ce(["dc-pick__button", { "dc-mono": e.mono }]),
        "aria-haspopup": "menu",
        "aria-expanded": c.value,
        "aria-labelledby": `${k(s)}-name ${k(s)}-value`,
        "data-dc-value": e.modelValue,
        onClick: b,
        onKeydown: C
      }, [
        v.value?.icon ? (u(), m("svg", yr, [
          S("path", {
            d: v.value.icon
          }, null, 8, gr)
        ])) : L("", !0),
        S("span", _r, M(v.value?.label), 1)
      ], 42, mr),
      P[1] || (P[1] = S("svg", {
        class: "dc-pick__mark",
        viewBox: "0 0 16 16",
        "aria-hidden": "true"
      }, [
        S("path", { d: "M4 6l4 4 4-4" })
      ], -1)),
      i.value && d.value ? (u(), O(Lt, {
        key: 0,
        to: d.value
      }, [
        Q(k(cs), {
          ref_key: "menu",
          ref: r,
          class: "dc-pick__list",
          style: oe(g.value),
          items: _.value,
          at: i.value,
          label: e.label,
          autofocus: o.value,
          onChoose: h,
          onDismiss: P[0] || (P[0] = (H) => y(!0))
        }, null, 8, ["style", "items", "at", "label", "autofocus"])
      ], 8, ["to"])) : L("", !0)
    ]));
  }
}), rn = /* @__PURE__ */ U(wr, [["__scopeId", "data-v-0e31a711"]]), kr = {
  class: "dc-pager",
  "aria-label": "Pages"
}, br = ["title"], $r = ["value", "onKeydown"], xr = {
  class: "dc-pager__total",
  "aria-hidden": "true"
}, Sr = {
  class: "dc-pager__sr",
  "aria-live": "polite"
}, Cr = /* @__PURE__ */ z({
  __name: "ShellPager",
  props: {
    pagesNote: {}
  },
  setup(e) {
    const t = e, n = te(), a = f(() => n.liveQuery.value.page), s = f(
      () => `${n.counting.value ? "~" : ""}${We(n.pageCount.value)}`
    ), l = f(() => {
      if (n.limit.value === 1) {
        const y = `Record ${We(a.value)} of ${s.value}`;
        return t.pagesNote ? `${y}
${t.pagesNote}` : y;
      }
      let g = `Page ${We(a.value)} of ${s.value}`;
      const p = n.rows.value.length;
      if (p) {
        const y = n.offset.value + 1, b = `${n.counting.value ? "~" : ""}${We(n.total.value)}`;
        g += ` — rows ${We(y)} to ${We(y + p - 1)} of ${b}`;
      }
      return t.pagesNote ? `${g}
${t.pagesNote}` : g;
    }), r = B(null), i = f(() => r.value ?? String(a.value)), o = f(
      () => `calc(${Math.max(2, String(n.pageCount.value).length)}ch + 10px)`
    );
    function c(g) {
      g.target.select();
    }
    function d(g) {
      const p = g.target, y = p.value.replace(/[^0-9]/g, "");
      p.value !== y && (p.value = y), r.value = y;
    }
    function v(g) {
      const p = g.target, y = Number(r.value);
      r.value = null;
      const b = Number.isFinite(y) && y >= 1 ? Math.min(Math.trunc(y), Math.max(1, n.pageCount.value)) : a.value;
      p.value = String(b), b !== a.value && n.setPage(b);
    }
    function _(g) {
      const p = g.target;
      r.value = null, p.value = String(a.value), p.blur();
    }
    return (g, p) => (u(), m("nav", kr, [
      Q(se, {
        class: "dc-pager__step",
        "aria-label": "Previous page",
        href: a.value > 1 ? k(n).hrefFor({ page: a.value - 1 }) : null,
        disabled: a.value <= 1,
        onPress: p[0] || (p[0] = (y) => k(n).setPage(a.value - 1))
      }, {
        default: Y(() => [...p[2] || (p[2] = [
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
          style: oe({ width: o.value }),
          value: i.value,
          onFocus: c,
          onInput: d,
          onKeydown: [
            Ae(Ne(v, ["prevent"]), ["enter"]),
            Ae(Ne(_, ["prevent"]), ["esc"])
          ],
          onBlur: v
        }, null, 44, $r),
        S("span", xr, "/ " + M(s.value), 1)
      ], 8, br),
      S("span", Sr, M(l.value), 1),
      Q(se, {
        class: "dc-pager__step",
        "aria-label": "Next page",
        href: a.value < k(n).pageCount.value ? k(n).hrefFor({ page: a.value + 1 }) : null,
        disabled: a.value >= k(n).pageCount.value,
        onPress: p[1] || (p[1] = (y) => k(n).setPage(a.value + 1))
      }, {
        default: Y(() => [...p[3] || (p[3] = [
          S("span", { "aria-hidden": "true" }, "›", -1)
        ])]),
        _: 1
      }, 8, ["href", "disabled"])
    ]));
  }
}), Pr = /* @__PURE__ */ U(Cr, [["__scopeId", "data-v-bdec7640"]]), Mr = {
  key: 0,
  class: "dc-actions__order"
}, Er = {
  key: 1,
  class: "dc-actions__select"
}, Lr = {
  key: 0,
  class: "dc-actions__all"
}, Tr = {
  class: "dc-actions__count",
  "aria-live": "polite"
}, Or = {
  key: 1,
  class: "dc-actions__count dc-actions__all",
  "aria-live": "polite"
}, Ar = { class: "dc-actions__ops" }, Nr = ["disabled"], Ir = ["data-dc-operation", "disabled", "onClick"], Rr = ["disabled"], Br = /* @__PURE__ */ z({
  __name: "RecordActions",
  props: {
    views: {},
    selectionPlacement: {},
    pagesNote: {}
  },
  setup(e) {
    const t = e, n = te(), a = f(() => Re(n.query.value.view, t.views)), s = f(
      () => (d.value || v.value) && a.value !== "table" && n.sorts.value.length > 0
    ), l = f(
      () => n.sorts.value.map((w) => ({ key: w.key, label: w.label }))
    ), r = f(() => s.value && l.value.length > 1), i = f(() => n.query.value.dir === "desc"), o = f(
      () => `Sorted by ${n.sort.value.label}, ${i.value ? "descending" : "ascending"}`
    ), c = f(() => n.entity.value), d = f(
      () => !_a(n.query.value, t.views) && a.value !== "record"
    ), v = f(() => a.value === "record" && n.query.value.entity !== null), _ = f(
      () => (d.value || v.value) && !n.loading.value && (n.pageCount.value > 1 || !!t.pagesNote)
    ), g = f(() => n.selection.value.ids.length), p = f(
      () => d.value && n.selectable.value && (n.rows.value.length > 0 || g.value > 0)
    ), y = f(() => a.value === "table"), b = f(
      () => s.value || _.value || d.value && (p.value || !!(c.value?.create || c.value?.duplicate || c.value?.delete || c.value?.operations?.length))
    ), C = f(() => g.value ? `${g.value} selected` : y.value ? "" : "Select all"), N = f(() => t.selectionPlacement === "end");
    function h(w) {
      return g.value ? w.endsWith("…") ? `${w.slice(0, -1)} ${g.value}…` : `${w} ${g.value}` : w;
    }
    return (w, P) => b.value ? (u(), m("div", {
      key: 0,
      class: ce(["dc-actions", { "dc-actions--selection-end": N.value }])
    }, [
      s.value ? (u(), m("span", Mr, [
        r.value ? (u(), O(rn, {
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
          onPress: P[0] || (P[0] = (H) => k(n).toggleDirection())
        }, {
          default: Y(() => [
            Z(M(i.value ? "↓" : "↑"), 1)
          ]),
          _: 1
        }, 8, ["aria-label", "title", "href"])
      ])) : L("", !0),
      p.value && C.value ? (u(), m("div", Er, [
        y.value ? (u(), m("span", Or, M(C.value), 1)) : (u(), m("label", Lr, [
          Q(Fa),
          S("span", Tr, M(C.value), 1)
        ])),
        g.value ? (u(), m("button", {
          key: 2,
          type: "button",
          class: ce(["dc-actions__clear", { "dc-actions__clear--op": N.value }]),
          onClick: P[1] || (P[1] = (H) => k(n).clearSelection())
        }, " Clear ", 2)) : L("", !0)
      ])) : L("", !0),
      S("div", Ar, [
        c.value?.create ? (u(), O(se, {
          key: 0,
          class: "dc-actions__op dc-actions__new",
          href: k(n).createHref?.(c.value),
          onPress: P[2] || (P[2] = (H) => k(n).create(c.value))
        }, {
          default: Y(() => [
            P[5] || (P[5] = S("span", {
              class: "dc-actions__plus",
              "aria-hidden": "true"
            }, "+", -1)),
            Z(" " + M(c.value.create), 1)
          ]),
          _: 1
        }, 8, ["href"])) : L("", !0),
        c.value?.duplicate ? (u(), m("button", {
          key: 1,
          type: "button",
          class: "dc-actions__op",
          disabled: !g.value,
          onClick: P[3] || (P[3] = (H) => k(n).duplicate())
        }, M(h(c.value.duplicate)), 9, Nr)) : L("", !0),
        (u(!0), m(W, null, X(c.value?.operations ?? [], (H) => (u(), m("button", {
          key: H.key,
          type: "button",
          class: "dc-actions__op",
          "data-dc-operation": H.key,
          disabled: !g.value && H.selection !== !1,
          onClick: (ne) => k(n).operate(H.key)
        }, M(H.selection === !1 ? H.label : h(H.label)), 9, Ir))), 128)),
        c.value?.delete ? (u(), m("button", {
          key: 2,
          type: "button",
          class: "dc-actions__op dc-actions__danger",
          disabled: !g.value,
          onClick: P[4] || (P[4] = (H) => k(n).delete())
        }, M(h(c.value.delete)), 9, Rr)) : L("", !0)
      ]),
      _.value ? (u(), O(Pr, {
        key: 2,
        class: "dc-actions__pages",
        "pages-note": e.pagesNote
      }, null, 8, ["pages-note"])) : L("", !0)
    ], 2)) : L("", !0);
  }
}), _t = /* @__PURE__ */ U(Br, [["__scopeId", "data-v-95bd2f88"]]);
function Gn(e) {
  return Math.max(0, e.total - (e.kept ?? 0));
}
function Hr(e) {
  const t = he(/* @__PURE__ */ new Map()), n = B(!0);
  let a = 0, s;
  const l = () => {
    a++, s?.abort(), s = void 0;
  }, r = () => {
    l();
    const i = a, { signal: o } = s = new AbortController(), c = e.query.value, d = e.schema.value, v = e.entities.value, _ = e.within?.value.trim() ?? "";
    n.value = c.expr.trim() === "" && !_;
    const g = /* @__PURE__ */ new Map();
    let p = !0;
    for (const y of v) {
      const b = Ta(y, c.expr), C = _ ? hn(_, b) : b;
      let N = !1;
      const h = (P) => {
        if (i !== a) return;
        if (p) {
          g.set(y.key, P);
          return;
        }
        const H = new Map(t.value);
        H.set(y.key, P), t.value = H;
      }, w = e.source.value.query({
        query: { ...c, entity: y.key, expr: C, page: 1 },
        schema: d,
        entity: y,
        limit: 0,
        offset: 0,
        signal: o,
        progress: (P) => {
          N || h({ total: P, pending: !0, counted: !0 });
        }
      });
      w instanceof Promise ? (g.has(y.key) || g.set(y.key, { total: 0, pending: !0, counted: !1 }), w.then((P) => {
        N = !0, h({ total: Gn(P), pending: !1, counted: !0 });
      })) : (N = !0, g.set(y.key, { total: Gn(w), pending: !1, counted: !0 }));
    }
    p = !1, t.value = g;
  };
  return sa() && Et(l), { counts: t, pristine: n, refresh: r, cancel: l };
}
const qr = {
  key: 1,
  class: "dc-show-as"
}, Fr = "…", Vr = /* @__PURE__ */ z({
  __name: "RecordChoosers",
  props: {
    views: {},
    typeChooser: {},
    stacked: { type: Boolean }
  },
  setup(e) {
    const t = e, n = `dc-show-as-${Math.random().toString(36).slice(2, 8)}`, a = te(), s = f(
      () => a.hasFacets.value || !!a.liveQuery.value.expr.trim() || !!a.within.value
    ), l = Hr({
      source: a.source,
      schema: a.schema,
      // What each type holds of what is on screen, the draft's results included:
      // a count of the committed query would disagree with the rows under it.
      query: a.liveQuery,
      entities: a.entities,
      within: a.within
    });
    function r(p) {
      if (p.key === a.query.value.entity && s.value) return tt((a.matched ?? a.total).value);
      if (l.pristine.value) return en(p);
      const b = l.counts.value.get(p.key);
      return b ? b.counted ? `${b.pending ? "~" : ""}${tt(b.total)}` : Fr : en(p);
    }
    const i = f(() => [
      { key: "", label: "Everything" },
      ...a.entities.value.map((p) => ({
        key: p.key,
        label: `${p.label} · ${r(p)}`
      }))
    ]), o = f(
      () => t.typeChooser === "always" || a.query.value.entity !== null
    );
    function c(p) {
      a.setEntity(p || null);
    }
    const d = f(
      () => (t.views ?? [...vn]).map((p) => ({
        key: p,
        label: p === "record" ? a.recordView.value?.label ?? Dn.record : Dn[p],
        icon: Qs[p]
      }))
    ), v = f(() => Re(a.query.value.view, t.views)), _ = f(() => d.value.length > 1);
    function g(p) {
      a.setView(p);
    }
    return (p, y) => o.value || _.value ? (u(), m("div", {
      key: 0,
      class: ce(["dc-choosers", { "dc-choosers--stacked": e.stacked }])
    }, [
      o.value ? (u(), O(rn, {
        key: 0,
        class: "dc-actions__pick dc-actions__type",
        label: "Type",
        "model-value": k(a).query.value.entity ?? "",
        options: i.value,
        onOpen: k(l).refresh,
        onClose: k(l).cancel,
        "onUpdate:modelValue": c
      }, null, 8, ["model-value", "options", "onOpen", "onClose"])) : L("", !0),
      _.value && e.stacked ? (u(), m("div", qr, [
        S("span", {
          id: n,
          class: "dc-show-as__label"
        }, "Show as"),
        S("div", {
          class: "dc-show-as__group",
          style: oe({ "--dc-views": d.value.length }),
          role: "group",
          "aria-labelledby": n
        }, [
          (u(!0), m(W, null, X(d.value, (b) => (u(), O(se, {
            key: b.key,
            class: ce(["dc-show-as__option", { "dc-show-as__option--on": b.key === v.value }]),
            "aria-current": b.key === v.value ? "true" : void 0,
            href: k(a).hrefFor({ view: b.key }),
            onPress: (C) => g(b.key)
          }, {
            default: Y(() => [
              Z(M(b.label), 1)
            ]),
            _: 2
          }, 1032, ["class", "aria-current", "href", "onPress"]))), 128))
        ], 4)
      ])) : _.value ? (u(), O(rn, {
        key: 2,
        class: "dc-actions__pick dc-actions__view",
        label: "View",
        "model-value": v.value,
        options: d.value,
        "onUpdate:modelValue": g
      }, null, 8, ["model-value", "options"])) : L("", !0)
    ], 2)) : L("", !0);
  }
}), Yn = /* @__PURE__ */ U(Vr, [["__scopeId", "data-v-a70e6af4"]]);
function Dr(e, t) {
  if (!e) return null;
  const n = de(e, t);
  return typeof n == "string" && n.trim() ? n : null;
}
const Kr = (e) => e == null || typeof e == "string" && !e.trim();
function Wr(e, t) {
  const n = ve(t, "state"), a = ve(t, "tint");
  return {
    identity: gt(ve(t, "identity"), e),
    reference: gt(ve(t, "reference"), e),
    metrics: ra(t, "metric").map((s) => ({
      column: s,
      label: s.label ?? "",
      text: Ee(s, e)
    })),
    facts: t.filter((s) => s.cardLabel && !Kr(de(s, e))).map((s) => ({
      column: s,
      label: s.cardLabel,
      title: [s.label, s.hint].filter(Boolean).join(" — "),
      text: Ee(s, e)
    })),
    state: n ? de(n, e) ?? null : null,
    updated: gt(ve(t, "updated"), e),
    image: Dr(ve(t, "image"), e),
    tint: a ? de(a, e) ?? null : null
  };
}
function Va(e, t, n, a, s = !1) {
  const l = n?.columns ?? [];
  return {
    row: e,
    key: $s(e, t),
    entityLabel: e.entityLabel,
    entity: n,
    columns: l,
    ordinal: hs(t),
    parts: Wr(e, l),
    pinned: a,
    selected: s
  };
}
function qe() {
  const e = te(), t = f(
    () => new Map(e.entities.value.map((n) => [n.key, n]))
  );
  return f(
    () => e.rows.value.map(
      (n, a) => Va(
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
    return (a, s) => (u(), m("span", {
      class: "dc-pill",
      "data-dc-status": e.status,
      "data-dc-tone": e.tone
    }, M(n.value), 9, zr));
  }
}), Ue = /* @__PURE__ */ U(jr, [["__scopeId", "data-v-686eb9b6"]]), Ur = { key: 1 }, Qr = /* @__PURE__ */ z({
  __name: "MetricDrill",
  props: {
    entry: {},
    column: {}
  },
  setup(e) {
    const t = e, n = te(), a = f(() => !t.entry.entity?.scope || !t.column.drill ? null : n.entities.value.find((v) => v.key === t.column.drill) ?? null), s = f(() => !!t.column.click), l = f(() => t.column.label ?? ""), r = f(() => Ee(t.column, t.entry.row)), i = f(() => s.value ? t.column.clickHref?.(t.entry.row) ?? null : a.value ? n.drillHref(t.entry.row, a.value, t.column.drillWhere) : null), o = f(() => a.value && !s.value ? `${l.value} of ${t.entry.parts.identity} — show the ${a.value.label.toLowerCase()}` : `${l.value} of ${t.entry.parts.identity}`);
    function c(d, v) {
      v.stopPropagation(), s.value ? t.column.click?.(t.entry.row, d) : a.value && n.drill(t.entry.row, a.value, d, t.column.drillWhere);
    }
    return (d, v) => a.value || s.value ? (u(), O(se, {
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
    }, 8, ["href", "title"])) : (u(), m("span", Ur, [
      G(d.$slots, "default", {}, () => [
        Z(M(r.value), 1)
      ], !0)
    ]));
  }
}), ft = /* @__PURE__ */ U(Qr, [["__scopeId", "data-v-bbbd334b"]]), Gr = ["data-dc-active", "aria-pressed", "aria-label"], Yr = /* @__PURE__ */ z({
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
    return (s, l) => (u(), m("button", {
      type: "button",
      class: "dc-star",
      "data-dc-active": e.pinned ? "true" : "false",
      "aria-pressed": e.pinned,
      "aria-label": e.pinned ? `Unpin ${e.name}` : `Pin ${e.name}`,
      onClick: a
    }, M(e.pinned ? "★" : "☆"), 9, Gr));
  }
}), $n = /* @__PURE__ */ U(Yr, [["__scopeId", "data-v-ef63d763"]]), Xr = ["src"], Jr = /* @__PURE__ */ z({
  __name: "RowPicture",
  props: {
    src: {}
  },
  setup(e) {
    const t = e, n = B(!1);
    return ae(
      () => t.src,
      () => {
        n.value = !1;
      }
    ), (a, s) => e.src.trim() && !n.value ? (u(), m("img", {
      key: 0,
      class: "dc-picture",
      src: e.src,
      alt: "",
      loading: "lazy",
      decoding: "async",
      onError: s[0] || (s[0] = (l) => n.value = !0)
    }, null, 40, Xr)) : L("", !0);
  }
}), Dt = /* @__PURE__ */ U(Jr, [["__scopeId", "data-v-afaab300"]]), Zr = ["data-dc-standing", "title", "aria-label"], eo = /* @__PURE__ */ z({
  __name: "QueryMark",
  props: {
    entry: {}
  },
  setup(e) {
    const t = e, n = te(), a = f(() => Ft(t.entry.entity, t.entry.row)), s = f(() => kn(n.query.value.expr, a.value)), l = f(
      () => s.value === "in" ? `The query narrows to ${t.entry.parts.identity} — press to lift that` : `The query leaves out ${t.entry.parts.identity} — press to lift that`
    );
    function r(i) {
      i.stopPropagation(), n.setExpression(Ea(n.query.value.expr, a.value));
    }
    return (i, o) => s.value ? (u(), m("button", {
      key: 0,
      type: "button",
      class: "dc-standing",
      "data-dc-standing": s.value,
      title: l.value,
      "aria-label": l.value,
      onClick: r
    }, M(s.value === "in" ? "+" : "−"), 9, Zr)) : L("", !0);
  }
}), xn = /* @__PURE__ */ U(eo, [["__scopeId", "data-v-4b8d4166"]]), to = ["aria-label"], no = ["data-dc-standing", "data-dc-active", "aria-checked", "title", "aria-label", "onClick"], ao = /* @__PURE__ */ z({
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
    return (i, o) => (u(), m("span", {
      class: "dc-standing-control",
      role: "radiogroup",
      "aria-label": `Where the query stands on ${e.name}`
    }, [
      (u(!0), m(W, null, X(s.value, (c) => (u(), m("button", {
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
}), on = /* @__PURE__ */ U(ao, [["__scopeId", "data-v-5524dca6"]]), Da = /* @__PURE__ */ z({
  __name: "RowStanding",
  props: {
    entry: {}
  },
  setup(e) {
    const t = e, n = te(), a = f(() => Sa(t.entry.entity, t.entry.row)), s = f(() => kn(n.query.value.expr, a.value));
    function l(r) {
      n.setExpression(tn(n.query.value.expr, a.value, r));
    }
    return (r, i) => a.value !== null ? (u(), O(on, {
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
    const t = e, n = te(), a = f(() => {
      const s = t.entry.row, l = n.recordHref?.(s) ?? null;
      return l ? n.pressHref(s) === l ? null : l : null;
    });
    return (s, l) => a.value ? (u(), m("a", {
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
}), vt = /* @__PURE__ */ U(lo, [["__scopeId", "data-v-b00f390d"]]), ro = /* @__PURE__ */ z({
  __name: "ScopeMark",
  props: {
    entry: {}
  },
  setup(e) {
    const t = e, n = te(), a = f(
      () => n.narrowsOnPress.value ? null : t.entry.entity?.scope ?? null
    ), s = B(null);
    function l(d) {
      s.value = rt(d).exclude ? "out" : "in";
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
    return (d, v) => a.value ? (u(), O(se, {
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
}), pt = /* @__PURE__ */ U(ro, [["__scopeId", "data-v-05d2c233"]]), oo = ["checked", "aria-label"], Fe = /* @__PURE__ */ z({
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
    return (s, l) => (u(), m("input", {
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
    const t = te(), n = qe(), a = f(() => t.isEverything.value), s = (r) => r.entity?.card === "picture", l = f(() => n.value.length > 0 && n.value.every(s));
    return (r, i) => (u(), m("div", {
      class: ce(["dc-cards", { "dc-cards--pictures": l.value }])
    }, [
      (u(!0), m(W, null, X(k(n), (o) => (u(), m("div", {
        key: o.key,
        class: ce(["dc-card", { "dc-card--picture": s(o) }])
      }, [
        S("div", io, [
          S("span", co, [
            k(t).selectable.value ? (u(), O(Fe, {
              key: 0,
              row: o.row,
              selected: o.selected,
              name: o.parts.identity
            }, null, 8, ["row", "selected", "name"])) : L("", !0),
            s(o) ? L("", !0) : (u(), m(W, { key: 1 }, [
              Z(M(o.ordinal), 1)
            ], 64)),
            a.value ? (u(), m("span", uo, M(o.entityLabel), 1)) : L("", !0)
          ]),
          S("span", fo, [
            o.parts.state && !s(o) ? (u(), O(Ue, {
              key: 0,
              status: o.parts.state
            }, null, 8, ["status"])) : L("", !0),
            s(o) ? (u(), O(xn, {
              key: 1,
              entry: o
            }, null, 8, ["entry"])) : (u(), O(Da, {
              key: 2,
              entry: o
            }, null, 8, ["entry"])),
            Q(pt, { entry: o }, null, 8, ["entry"]),
            Q(vt, { entry: o }, null, 8, ["entry"]),
            k(t).pinnable.value ? (u(), O($n, {
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
            o.parts.image ? (u(), O(Dt, {
              key: 0,
              class: "dc-card__image",
              src: o.parts.image
            }, null, 8, ["src"])) : L("", !0),
            S("span", vo, [
              S("span", po, M(o.parts.identity), 1),
              s(o) ? L("", !0) : (u(), m("span", ho, M(o.parts.reference), 1)),
              o.parts.facts.length ? (u(), m("span", mo, [
                (u(!0), m(W, null, X(o.parts.facts, (c) => (u(), m("span", {
                  key: c.column.key ?? c.label,
                  class: "dc-card__fact",
                  title: c.title || void 0
                }, [
                  S("span", go, M(c.label), 1),
                  Z(" " + M(c.text), 1)
                ], 8, yo))), 128))
              ])) : L("", !0)
            ])
          ]),
          _: 2
        }, 1032, ["href", "onPress"]),
        s(o) ? L("", !0) : (u(), m("div", _o, [
          (u(!0), m(W, null, X(o.parts.metrics.slice(0, 2), (c) => (u(), O(ft, {
            key: c.column.key ?? c.label,
            entry: o,
            column: c.column
          }, {
            default: Y(() => [
              Z(M(c.label) + " " + M(c.text), 1)
            ]),
            _: 2
          }, 1032, ["entry", "column"]))), 128)),
          o.parts.updated ? (u(), m("span", wo, M(o.parts.updated), 1)) : L("", !0)
        ]))
      ], 2))), 128))
    ], 2));
  }
}), Ka = /* @__PURE__ */ U(ko, [["__scopeId", "data-v-fd252138"]]), bo = { class: "dc-grid" }, $o = { class: "dc-tile__scrim" }, xo = { class: "dc-tile__top dc-mono" }, So = { class: "dc-tile__chip" }, Co = { class: "dc-tile__caption" }, Po = { class: "dc-tile__secondary dc-truncate" }, Mo = { class: "dc-tile__primary" }, Eo = /* @__PURE__ */ z({
  __name: "GridView",
  setup(e) {
    const t = te(), n = qe();
    return (a, s) => (u(), m("div", bo, [
      (u(!0), m(W, null, X(k(n), (l) => (u(), m("div", {
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
            l.parts.image ? (u(), O(Dt, {
              key: 0,
              class: "dc-tile__image",
              src: l.parts.image
            }, null, 8, ["src"])) : L("", !0),
            S("span", $o, [
              S("span", xo, [
                S("span", So, M(l.ordinal), 1)
              ]),
              S("span", Co, [
                S("span", Po, M(l.parts.reference), 1),
                S("span", Mo, M(l.parts.identity), 1)
              ])
            ])
          ]),
          _: 2
        }, 1032, ["style", "href", "onPress"]),
        k(t).selectable.value ? (u(), O(Fe, {
          key: 0,
          class: "dc-grid__tick",
          row: l.row,
          selected: l.selected,
          name: l.parts.identity
        }, null, 8, ["row", "selected", "name"])) : L("", !0)
      ]))), 128))
    ]));
  }
}), Wa = /* @__PURE__ */ U(Eo, [["__scopeId", "data-v-89c40a9e"]]);
function Xn(e, t, n, a) {
  return (n - a * (t - 1)) / e;
}
function Yt(e, t) {
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
    const v = t(d), _ = Math.max(v.ratio, Number.EPSILON), g = v.height && v.height > 0 ? Math.max(c, v.height) : c, p = Yt(g, s), y = Xn(o + _, i.length + 1, a, l);
    if (y > p) {
      i.push(d), o += _, c = g;
      continue;
    }
    const b = Yt(c, s), C = i.length ? Xn(o, i.length, a, l) : 1 / 0;
    C <= Lo(c) && C - b < p - y ? (r.push({ items: i, height: C, filled: !0 }), i = [d], o = _, c = v.height && v.height > 0 ? v.height : 0) : (r.push({ items: [...i, d], height: y, filled: !0 }), i = [], o = 0, c = 0);
  }
  return i.length && r.push({ items: i, height: Yt(c, s), filled: !1 }), r;
}
const Oo = { class: "dc-images" }, Ao = {
  key: 1,
  class: "dc-images__blank",
  "aria-hidden": "true"
}, No = 240, mt = 8, Io = 1, Ro = /* @__PURE__ */ z({
  __name: "ImagesView",
  setup(e) {
    const t = te(), n = qe(), a = Pn(/* @__PURE__ */ new Map()), s = Pn(/* @__PURE__ */ new Set());
    function l(p, y) {
      const b = y.target;
      b.naturalWidth > 0 && b.naturalHeight > 0 && a.set(p, { width: b.naturalWidth, height: b.naturalHeight });
    }
    function r(p) {
      const y = p.parts.image;
      return y && !s.has(y) ? y : null;
    }
    function i(p) {
      const y = r(p);
      return y ? a.get(y) : void 0;
    }
    function o(p) {
      const y = i(p);
      return y ? { ratio: y.width / y.height, height: y.height } : { ratio: Io };
    }
    const c = B(null), d = B(0);
    let v = null;
    function _() {
      d.value = c.value?.clientWidth ?? 0;
    }
    ut(() => {
      _(), !(!c.value || typeof ResizeObserver > "u") && (v = new ResizeObserver(_), v.observe(c.value));
    }), we(() => {
      v?.disconnect(), v = null;
    });
    const g = f(() => {
      const p = To(n.value, o, {
        width: d.value,
        height: No,
        gap: mt
      }), y = [];
      let b = 0;
      for (const C of p) {
        let N = 0;
        for (const h of C.items) {
          const w = o(h).ratio * C.height, P = i(h), H = P !== void 0 && P.height < C.height;
          y.push({
            entry: h,
            style: {
              top: `${b}px`,
              left: `${N}px`,
              width: `${w}px`,
              height: `${C.height}px`
            },
            picture: H ? { width: `${P.width}px`, height: `${P.height}px` } : { width: "100%", height: "100%" }
          }), N += w + mt;
        }
        b += C.height + mt;
      }
      return { boxes: y, height: p.length ? b - mt : 0 };
    });
    return (p, y) => (u(), m("div", Oo, [
      S("div", {
        ref_key: "wall",
        ref: c,
        class: "dc-images__wall",
        style: oe({ height: `${g.value.height}px` })
      }, [
        (u(!0), m(W, null, X(g.value.boxes, ({ entry: b, style: C, picture: N }) => (u(), m("div", {
          key: b.key,
          class: "dc-images__cell",
          style: oe(C)
        }, [
          Q(se, {
            class: "dc-images__open",
            title: b.parts.identity,
            "aria-label": b.parts.identity,
            href: k(t).pressHref(b.row),
            onPress: (h) => k(t).activate(b.row, h)
          }, {
            default: Y(() => [
              r(b) ? (u(), O(Dt, {
                key: 0,
                class: "dc-images__picture",
                style: oe(N),
                src: r(b),
                onLoad: (h) => l(r(b), h),
                onError: (h) => s.add(r(b))
              }, null, 8, ["style", "src", "onLoad", "onError"])) : (u(), m("span", Ao, M(b.parts.identity), 1))
            ]),
            _: 2
          }, 1032, ["title", "aria-label", "href", "onPress"]),
          k(t).selectable.value ? (u(), O(Fe, {
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
}), za = /* @__PURE__ */ U(Ro, [["__scopeId", "data-v-2d267370"]]), Bo = { class: "dc-links" }, Ho = { class: "dc-link__primary dc-truncate" }, qo = { class: "dc-link__secondary dc-mono dc-truncate" }, Fo = /* @__PURE__ */ z({
  __name: "LinksView",
  setup(e) {
    const t = te(), n = qe();
    return (a, s) => (u(), m("div", Bo, [
      (u(!0), m(W, null, X(k(n), (l) => (u(), m("span", {
        key: l.key,
        class: "dc-links__item"
      }, [
        k(t).selectable.value ? (u(), O(Fe, {
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
            S("span", Ho, M(l.parts.identity), 1),
            S("span", qo, M(l.parts.reference), 1)
          ]),
          _: 2
        }, 1032, ["href", "onPress"])
      ]))), 128))
    ]));
  }
}), ja = /* @__PURE__ */ U(Fo, [["__scopeId", "data-v-de6c9a0f"]]), Vo = {
  class: "dc-list",
  role: "list"
}, Do = { class: "dc-list__ordinal dc-mono" }, Ko = { class: "dc-list__identity" }, Wo = ["title"], zo = ["title"], jo = {
  key: 1,
  class: "dc-list__entity dc-mono"
}, Uo = { class: "dc-list__metrics dc-mono" }, Qo = { class: "dc-list__trailing" }, Go = /* @__PURE__ */ z({
  __name: "ListView",
  setup(e) {
    const t = te(), n = qe(), a = f(() => t.isEverything.value);
    return (s, l) => (u(), m("div", Vo, [
      (u(!0), m(W, null, X(k(n), (r) => (u(), m("div", {
        key: r.key,
        class: "dc-list__row",
        role: "listitem"
      }, [
        k(t).selectable.value ? (u(), O(Fe, {
          key: 0,
          class: "dc-list__tick",
          row: r.row,
          selected: r.selected,
          name: r.parts.identity
        }, null, 8, ["row", "selected", "name"])) : L("", !0),
        Q(Da, {
          class: "dc-list__standing",
          entry: r
        }, null, 8, ["entry"]),
        Q(se, {
          class: "dc-list__open",
          href: k(t).pressHref(r.row),
          onPress: (i) => k(t).activate(r.row, i)
        }, {
          default: Y(() => [
            S("span", Do, M(r.ordinal), 1),
            S("span", Ko, [
              S("span", {
                class: "dc-list__primary dc-truncate",
                title: r.parts.identity
              }, M(r.parts.identity), 9, Wo),
              S("span", {
                class: "dc-list__secondary dc-mono dc-truncate",
                title: r.parts.reference || void 0
              }, M(r.parts.reference), 9, zo)
            ])
          ]),
          _: 2
        }, 1032, ["href", "onPress"]),
        a.value ? (u(), m("span", jo, M(r.entityLabel), 1)) : L("", !0),
        S("span", Uo, [
          (u(!0), m(W, null, X(r.parts.metrics.slice(0, 2), (i) => (u(), O(ft, {
            key: i.column.key ?? i.label,
            entry: r,
            column: i.column
          }, null, 8, ["entry", "column"]))), 128))
        ]),
        S("span", Qo, [
          r.parts.state ? (u(), O(Ue, {
            key: 0,
            status: r.parts.state
          }, null, 8, ["status"])) : L("", !0),
          Q(pt, { entry: r }, null, 8, ["entry"]),
          Q(vt, { entry: r }, null, 8, ["entry"]),
          k(t).pinnable.value ? (u(), O($n, {
            key: 1,
            row: r.row,
            name: r.parts.identity,
            pinned: r.pinned
          }, null, 8, ["row", "name", "pinned"])) : L("", !0)
        ])
      ]))), 128))
    ]));
  }
}), cn = /* @__PURE__ */ U(Go, [["__scopeId", "data-v-a2cb9c3f"]]), Yo = { class: "dc-preview" }, Xo = { class: "dc-preview__pager dc-mono" }, Jo = ["disabled"], Zo = { "aria-live": "polite" }, ei = ["disabled"], ti = {
  key: 0,
  class: "dc-preview__card"
}, ni = ["src"], ai = { class: "dc-preview__body" }, si = { class: "dc-preview__top" }, li = { class: "dc-preview__badges" }, ri = { class: "dc-preview__entity dc-mono" }, oi = { class: "dc-preview__marks" }, ii = { class: "dc-preview__primary" }, ci = { class: "dc-preview__secondary dc-mono" }, ui = { class: "dc-preview__fields" }, di = { class: "dc-preview__key" }, fi = { class: "dc-preview__value dc-mono" }, vi = /* @__PURE__ */ z({
  __name: "PreviewView",
  setup(e) {
    const t = te(), n = qe(), a = B(0);
    ae(n, (o) => {
      a.value > o.length - 1 && (a.value = Math.max(0, o.length - 1));
    });
    const s = f(() => n.value[a.value]), l = f(() => {
      const o = s.value;
      if (!o) return [];
      const c = ve(o.columns, "reference"), d = ve(o.columns, "updated");
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
    return (o, c) => (u(), m("div", Yo, [
      S("div", Xo, [
        S("button", {
          type: "button",
          class: "dc-preview__step",
          "aria-label": "Previous result",
          disabled: a.value === 0,
          onClick: c[0] || (c[0] = (d) => i(-1))
        }, " ‹ ", 8, Jo),
        S("span", Zo, M(r.value), 1),
        S("button", {
          type: "button",
          class: "dc-preview__step",
          "aria-label": "Next result",
          disabled: a.value >= k(n).length - 1,
          onClick: c[1] || (c[1] = (d) => i(1))
        }, " › ", 8, ei)
      ]),
      s.value ? (u(), m("div", ti, [
        S("div", {
          class: "dc-preview__media",
          style: oe({ background: s.value.parts.tint ?? void 0 }),
          "aria-hidden": "true"
        }, [
          s.value.parts.image ? (u(), m("img", {
            key: 0,
            class: "dc-preview__image",
            src: s.value.parts.image,
            alt: ""
          }, null, 8, ni)) : (u(), m(W, { key: 1 }, [
            Z(" preview ")
          ], 64))
        ], 4),
        S("div", ai, [
          S("div", si, [
            S("span", li, [
              k(t).selectable.value ? (u(), O(Fe, {
                key: 0,
                row: s.value.row,
                selected: s.value.selected,
                name: s.value.parts.identity
              }, null, 8, ["row", "selected", "name"])) : L("", !0),
              s.value.parts.state ? (u(), O(Ue, {
                key: 1,
                status: s.value.parts.state
              }, null, 8, ["status"])) : L("", !0),
              S("span", ri, M(s.value.entityLabel), 1)
            ]),
            S("span", oi, [
              Q(xn, { entry: s.value }, null, 8, ["entry"]),
              Q(pt, { entry: s.value }, null, 8, ["entry"]),
              Q(vt, { entry: s.value }, null, 8, ["entry"]),
              k(t).pinnable.value ? (u(), O($n, {
                key: 0,
                row: s.value.row,
                name: s.value.parts.identity,
                pinned: s.value.pinned
              }, null, 8, ["row", "name", "pinned"])) : L("", !0)
            ])
          ]),
          S("div", null, [
            S("div", ii, M(s.value.parts.identity), 1),
            S("div", ci, M(s.value.parts.reference), 1)
          ]),
          S("dl", ui, [
            (u(!0), m(W, null, X(l.value, (d) => (u(), m("div", {
              key: d.key,
              class: "dc-preview__field"
            }, [
              S("dt", di, M(d.key), 1),
              S("dd", fi, [
                d.column && s.value ? (u(), O(ft, {
                  key: 0,
                  entry: s.value,
                  column: d.column
                }, null, 8, ["entry", "column"])) : (u(), m(W, { key: 1 }, [
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
}), Ua = /* @__PURE__ */ U(vi, [["__scopeId", "data-v-59e0d33b"]]);
function pi(e) {
  const t = ie(e);
  if (t.length !== 1) return /* @__PURE__ */ new Set();
  const n = /* @__PURE__ */ new Map();
  for (const a of t[0]) {
    if (a.kind !== "field" || a.negated || ze(a) || a.comparator !== "=" && a.comparator !== ":") continue;
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
    return l === void 0 || !a.has(l) || s.role === "identity" || n.some((r) => Array.isArray(de(s, r))) ? !0 : new Set(n.map((r) => Ee(s, r))).size > 1;
  }) : e;
}
function mi() {
  const e = te();
  return f(
    () => hi(
      ks(e.schema.value, e.entity.value),
      e.liveQuery.value.expr,
      e.rows.value
    )
  );
}
function Sn(e, t) {
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
function Qa(e, t) {
  const n = e.narrowsOnPress.value ? Ft(t.entity, t.row) : null;
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
    const t = e, n = te(), a = f(() => Ee(t.column, t.entry.row));
    function s(v, _ = !1) {
      return v.entity !== void 0 ? `entity:${v.entity}` : _e({ ...v.term, ..._ ? { negated: !0 } : {} });
    }
    function l(v, _ = !1) {
      return v.entity !== void 0 ? n.query.value.expr : st(n.query.value.expr, s(v, _));
    }
    function r(v) {
      return v.entity ?? n.query.value.entity;
    }
    function i(v) {
      return n.narrowHref(l(v), r(v));
    }
    function o(v) {
      return v.entity !== void 0 ? `Show ${n.schema.value.entities.find((g) => g.key === v.entity)?.label ?? a.value} only` : `Narrow to ${s(v)}
⌥-press to leave these out`;
    }
    function c(v) {
      return v.entity !== void 0 ? null : { term: s(v) };
    }
    function d(v, _, g) {
      g.stopPropagation(), n.narrow(l(v, _.exclude), r(v));
    }
    return (v, _) => (u(), m("span", {
      class: ce(["dc-cell__text", { "dc-truncate": e.truncates }])
    }, [
      (u(!0), m(W, null, X(e.narrowings, (g, p) => (u(), m(W, {
        key: s(g)
      }, [
        p > 0 ? (u(), m(W, { key: 0 }, [
          Z(", ")
        ], 64)) : L("", !0),
        Q(se, Ie({
          class: "dc-narrow",
          href: i(g),
          title: o(g),
          selectable: ""
        }, fn(k(Sn)(k(n), c(g))), {
          onPress: (y, b) => d(g, y, b)
        }), {
          default: Y(() => [
            G(v.$slots, "default", {}, () => [
              Z(M(g.label ?? a.value), 1)
            ], !0)
          ]),
          _: 2
        }, 1040, ["href", "title", "onPress"])
      ], 64))), 128))
    ], 2));
  }
}), Jn = /* @__PURE__ */ U(yi, [["__scopeId", "data-v-6e649daa"]]), gi = /* @__PURE__ */ new Set(["entitykey", "entitylabel"]), _i = /* @__PURE__ */ new Set(["ordinal", "image", "component", "date"]), wi = 4;
function Ga(e) {
  return (e.field ?? e.key)?.toLowerCase();
}
function Ya(e) {
  return e.narrow === !1 || e.role === "identity" || e.activate || e.click || e.drill ? !1 : !_i.has(e.kind ?? "text") && Ga(e) !== void 0;
}
function ki(e, t) {
  if (Number.isInteger(e)) return e;
  const n = 10 ** wi;
  return (t ? Math.ceil(e * n - 1e-6) : Math.floor(e * n + 1e-6)) / n;
}
function bi(e, t) {
  let n = 1 / 0, a = -1 / 0;
  for (const s of t) {
    const l = de(e, s);
    typeof l != "number" || !Number.isFinite(l) || (l < n && (n = l), l > a && (a = l));
  }
  return n <= a ? { min: n, max: a } : null;
}
function $i(e, t, n, a = null) {
  if (!Ya(e)) return [];
  const s = Ga(e);
  if (gi.has(s) && !e.value)
    return t.entityKey ? [{ label: null, entity: t.entityKey }] : [];
  if (e.flags)
    return Object.entries(e.flags).filter(([o]) => t.fields[o] === !0).map(([o, c]) => ({
      label: c,
      term: { kind: "field", field: o.toLowerCase(), comparator: ":", value: "true" }
    }));
  const l = de(e, t), r = n?.facets.find((o) => o.key.toLowerCase() === s);
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
const Zn = /* @__PURE__ */ new WeakMap();
function xi(e, t) {
  let n = Zn.get(e);
  return n || Zn.set(e, n = /* @__PURE__ */ new Map()), n.has(t) || n.set(t, bi(t, e)), n.get(t);
}
const Si = /* @__PURE__ */ z({
  __name: "ColumnCell",
  props: {
    column: {},
    entry: {}
  },
  setup(e) {
    const t = e, n = te(), a = f(() => t.column.kind ?? "text"), s = f(() => de(t.column, t.entry.row)), l = f(
      () => a.value === "ordinal" ? t.entry.ordinal : Ee(t.column, t.entry.row)
    ), r = f(() => s.value), i = f(() => t.column.activate === !0 || !!t.column.click), o = f(() => Jt(t.column)), c = f(() => oa(t.column, t.entry.row)), d = f(() => {
      if (!Ya(t.column)) return [];
      const p = typeof s.value == "number" ? xi(n.rows.value, t.column) : null;
      return $i(t.column, t.entry.row, t.entry.entity ?? null, p);
    });
    function v(p) {
      i.value && (p.stopPropagation(), _(rt(p)));
    }
    function _(p) {
      t.column.click?.(t.entry.row, p), t.column.activate && n.activate(t.entry.row, p);
    }
    const g = f(() => t.column.click ? t.column.clickHref?.(t.entry.row) ?? null : t.column.activate ? n.pressHref(t.entry.row) : null);
    return (p, y) => a.value === "component" && e.column.component ? (u(), O(et(e.column.component), {
      key: 0,
      row: e.entry.row,
      entry: e.entry,
      value: s.value,
      column: e.column
    }, null, 8, ["row", "entry", "value", "column"])) : a.value === "status" && d.value.length ? (u(), O(Jn, {
      key: 1,
      entry: e.entry,
      column: e.column,
      narrowings: d.value,
      truncates: !1
    }, {
      default: Y(() => [
        Q(Ue, { status: r.value }, null, 8, ["status"])
      ]),
      _: 1
    }, 8, ["entry", "column", "narrowings"])) : a.value === "status" ? (u(), O(Ue, {
      key: 2,
      status: r.value
    }, null, 8, ["status"])) : a.value === "image" ? (u(), O(Dt, {
      key: 3,
      class: "dc-cell__image",
      src: typeof s.value == "string" ? s.value : "",
      style: oe({ maxHeight: e.column.height }),
      onClick: v
    }, null, 8, ["src", "style"])) : e.column.drill || e.column.click && e.column.role === "metric" ? (u(), O(ft, {
      key: 4,
      entry: e.entry,
      column: e.column
    }, null, 8, ["entry", "column"])) : i.value ? (u(), O(se, Ie({
      key: 5,
      class: ["dc-table__open", { "dc-truncate": o.value }],
      href: g.value,
      title: c.value
    }, fn(e.column.activate ? k(Sn)(k(n), k(Qa)(k(n), e.entry)) : {}), {
      onPress: y[0] || (y[0] = (b, C) => {
        C.stopPropagation(), _(b);
      })
    }), {
      default: Y(() => [
        Z(M(l.value), 1)
      ]),
      _: 1
    }, 16, ["class", "href", "title"])) : d.value.length ? (u(), O(Jn, {
      key: 6,
      entry: e.entry,
      column: e.column,
      narrowings: d.value,
      truncates: o.value
    }, null, 8, ["entry", "column", "narrowings", "truncates"])) : (u(), m("span", {
      key: 7,
      class: ce(["dc-cell__text", { "dc-truncate": o.value }])
    }, M(l.value), 3));
  }
}), ea = /* @__PURE__ */ U(Si, [["__scopeId", "data-v-d07057a1"]]), Ci = {
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
}, Hi = ["data-dc-align", "data-dc-hide", "title"], qi = {
  key: 1,
  class: "dc-table__name"
}, Fi = /* @__PURE__ */ z({
  __name: "TableView",
  setup(e) {
    const t = te(), n = qe(), a = mi();
    function s(E, j) {
      if (!t.rowLinks?.value || La()) return;
      const T = t.pressHref(E);
      if (T && an(j)) {
        nn(T, j);
        return;
      }
      t.activate(E, rt(j));
    }
    const l = f(() => t.rowLinks?.value ? new Map(n.value.map((E) => [E.key, t.pressHref(E.row)])) : /* @__PURE__ */ new Map()), r = f(
      () => a.value.find((E) => E.role === "identity") ?? a.value[0]
    );
    function i(E, j, T) {
      T.stopPropagation(), t.activate(E, j);
    }
    function o(E) {
      const j = fa(E, t.entity.value, t.schema.value), T = j ? `Shortcut: ${j}` : void 0;
      return [E.hint, T].filter(Boolean).join(`
`) || void 0;
    }
    const c = f(() => {
      const E = a.value.find((T) => T.scope);
      return E || ((t.entity.value ? !!t.entity.value.href : t.entities.value.some((T) => T.href)) ? a.value.find((T) => T.activate) : void 0);
    }), d = f(() => {
      const E = (j) => !!j.scope && j.standing !== !1;
      return t.entity.value ? E(t.entity.value) : t.entities.value.some(E);
    }), v = (E) => Sa(E.entity, E.row), _ = (E) => kn(t.query.value.expr, v(E));
    function g(E, j) {
      t.setExpression(tn(t.query.value.expr, v(E), j));
    }
    const p = f(() => {
      const E = n.value.filter((T) => v(T) !== null), j = E.filter((T) => T.selected);
      return j.length ? j : E;
    }), y = f(() => p.value.some((E) => E.selected)), b = f(() => {
      const E = p.value[0];
      return E ? _(E) : null;
    }), C = f(
      () => p.value.some((E) => _(E) !== b.value)
    ), N = f(
      () => y.value ? "the ticked rows" : "every row on this page"
    );
    function h(E) {
      t.setExpression(
        p.value.reduce(
          (j, T) => tn(j, v(T), E),
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
    function H(E) {
      return E ? t.query.value.sort === E ? t.hrefFor({ dir: t.query.value.dir === "desc" ? "asc" : "desc" }) : t.hrefFor({ sort: E }) : null;
    }
    const ne = f(() => t.entity.value?.label ?? "The result set"), I = f(() => new Set(t.sorts.value.map((E) => E.key))), V = (E) => E.sort !== void 0 && I.value.has(E.sort), q = (E) => {
      if (V(E))
        return t.query.value.sort !== E.sort ? "none" : t.query.value.dir === "desc" ? "descending" : "ascending";
    };
    function J(E) {
      return [
        An(E),
        E.muted ? "dc-table__muted" : "",
        E.mono ? "dc-mono" : "",
        Jt(E) ? "dc-truncate" : ""
      ].filter(Boolean).join(" ");
    }
    function ue(E, j) {
      if (!(!Jt(E) || E.activate || E.click))
        return oa(E, j.row);
    }
    const le = f(
      () => a.value.length + (t.selectable.value ? 1 : 0) + (d.value ? 1 : 0)
    );
    return (E, j) => k(a).length ? (u(), m("table", {
      key: 1,
      class: "dc-table",
      "data-dc-wrap": w.value ? "" : void 0,
      "data-dc-row-links": k(t).rowLinks?.value ? "" : void 0,
      style: oe({ "--dc-table-tracks": le.value })
    }, [
      S("thead", Ei, [
        S("tr", null, [
          k(t).selectable.value ? (u(), m("th", Li, [
            Q(Fa)
          ])) : L("", !0),
          d.value ? (u(), m("th", Ti, [
            p.value.length ? (u(), O(on, {
              key: 0,
              standing: b.value,
              mixed: C.value,
              name: N.value,
              onSet: h
            }, null, 8, ["standing", "mixed", "name"])) : L("", !0)
          ])) : L("", !0),
          (u(!0), m(W, null, X(k(a), (T, ee) => (u(), m("th", {
            key: k(Tn)(T, ee),
            scope: "col",
            class: ce(k(An)(T)),
            style: oe({ width: T.width }),
            "data-dc-align": k(On)(T),
            "data-dc-hide": T.hideBelow,
            "aria-sort": q(T),
            title: o(T)
          }, [
            V(T) ? (u(), O(se, {
              key: 0,
              class: "dc-table__sort",
              href: H(T.sort),
              onPress: (re) => P(T.sort)
            }, {
              default: Y(() => [
                Z(M(T.label), 1)
              ]),
              _: 2
            }, 1032, ["href", "onPress"])) : (u(), m(W, { key: 1 }, [
              Z(M(T.label), 1)
            ], 64)),
            T.header ? (u(), m("span", Ai, [
              (u(), O(et(T.header), {
                column: T,
                entity: k(t).entity.value
              }, null, 8, ["column", "entity"]))
            ])) : L("", !0)
          ], 14, Oi))), 128))
        ])
      ]),
      S("tbody", Ni, [
        (u(!0), m(W, null, X(k(n), (T) => (u(), m("tr", {
          key: T.key,
          class: "dc-table__row",
          onClick: (ee) => s(T.row, ee)
        }, [
          k(t).selectable.value ? (u(), m("td", Ri, [
            Q(Fe, {
              row: T.row,
              selected: T.selected,
              name: T.parts.identity
            }, null, 8, ["row", "selected", "name"])
          ])) : L("", !0),
          d.value ? (u(), m("td", Bi, [
            v(T) !== null ? (u(), O(on, {
              key: 0,
              standing: _(T),
              name: T.parts.identity,
              onSet: (ee) => g(T, ee)
            }, null, 8, ["standing", "name", "onSet"])) : L("", !0)
          ])) : L("", !0),
          (u(!0), m(W, null, X(k(a), (ee, re) => (u(), m("td", {
            key: k(Tn)(ee, re),
            class: ce(J(ee)),
            style: oe({ width: ee.width }),
            "data-dc-align": k(On)(ee),
            "data-dc-hide": ee.hideBelow,
            title: ue(ee, T)
          }, [
            l.value.get(T.key) ? (u(), O(se, Ie({
              key: 0,
              class: "dc-table__cell-link",
              href: l.value.get(T.key),
              tabindex: ee === r.value ? void 0 : -1,
              "aria-hidden": ee === r.value ? void 0 : "true",
              "aria-label": ee === r.value ? T.parts.identity : void 0
            }, fn(k(Sn)(k(t), k(Qa)(k(t), T))), {
              onPress: (me, be) => i(T.row, me, be)
            }), null, 16, ["href", "tabindex", "aria-hidden", "aria-label", "onPress"])) : L("", !0),
            ee === c.value ? (u(), m("span", qi, [
              Q(ea, {
                column: ee,
                entry: T
              }, null, 8, ["column", "entry"]),
              Q(pt, { entry: T }, null, 8, ["entry"]),
              Q(vt, { entry: T }, null, 8, ["entry"])
            ])) : (u(), O(ea, {
              key: 2,
              column: ee,
              entry: T
            }, null, 8, ["column", "entry"]))
          ], 14, Hi))), 128))
        ], 8, Ii))), 128))
      ])
    ], 12, Mi)) : (u(), m("p", Ci, [
      j[2] || (j[2] = S("span", { class: "dc-table__headline" }, "No columns declared", -1)),
      S("span", Pi, [
        Z(M(ne.value) + " has no ", 1),
        j[0] || (j[0] = S("code", null, "columns", -1)),
        j[1] || (j[1] = Z(" in the schema, so there is no table to draw. ", -1))
      ])
    ]));
  }
}), Xa = /* @__PURE__ */ U(Fi, [["__scopeId", "data-v-9945aecc"]]);
function Vi(e) {
  const t = he([]), n = B(!1), a = he(null);
  let s = 0;
  const l = (o, c, d, v, _) => ({
    entity: o,
    rows: e.limit.value > 0 ? c.rows.map((g, p) => Va(g, p, o, e.isPinned(g.id))) : [],
    total: c.total,
    count: d ? en(o) : tt(c.total),
    pinned: Di(v, c, _)
  }), r = () => {
    const o = ++s, c = e.query.value, d = e.schema.value, v = e.entities.value, _ = e.limit.value, g = e.within?.value.trim() ?? "", p = mn(c) && !g, y = g ? hn(g, c.expr) : c.expr, b = v.map((C) => ({
      entity: C,
      // Scope the query to this entity, keeping the expression and ordering.
      outcome: e.source.value.query({
        // Each card is the top few of its type, wherever the shell's own
        // result set has been paged to — so this asks for the first page.
        query: { ...c, entity: C.key, expr: y, page: 1 },
        schema: d,
        entity: C,
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
    if (b.every(({ outcome: C }) => !(C instanceof Promise))) {
      t.value = b.map(
        ({ entity: C, outcome: N }) => l(C, N, p, d, y)
      ), a.value = null, n.value = !1;
      return;
    }
    n.value = !0, Promise.all(b.map(({ outcome: C }) => Promise.resolve(C))).then((C) => {
      o === s && (t.value = C.map(
        (N, h) => l(b[h].entity, N, p, d, y)
      ), a.value = null);
    }).catch((C) => {
      o === s && (a.value = C, t.value = []);
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
function Di(e, t, n) {
  const a = t.rows[0];
  if (t.total !== 1 || t.rows.length !== 1 || !a)
    return !1;
  const s = n.trim();
  if (!s)
    return !1;
  const l = xt(e, a);
  return !!l && je(s, l) === s;
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
    const t = te(), { previews: n, pending: a, error: s } = Vi({
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
    return (d, v) => (u(), m("div", {
      class: "dc-types",
      "data-dc-pending": k(a) ? "true" : "false",
      "data-dc-heads-only": r.value ? "true" : "false"
    }, [
      G(d.$slots, "before", {}, void 0, !0),
      k(s) ? (u(), m("p", Wi, " Could not load results: " + M(k(s) instanceof Error ? k(s).message : "the data source failed."), 1)) : !c.value.length && k(a) ? (u(), m("p", zi, " Running query… ")) : c.value.length ? L("", !0) : (u(), m("p", ji, M(l.value ? "Nothing matches this query" : "Nothing here yet"), 1)),
      (u(!0), m(W, null, X(c.value, (_) => (u(), m("section", {
        key: _.entity.key,
        class: "dc-type",
        "data-dc-empty": _.total ? "false" : "true"
      }, [
        Q(se, {
          class: "dc-type__head",
          href: k(t).entityHref(_.entity.key),
          onPress: (g) => k(t).setEntity(_.entity.key)
        }, {
          default: Y(() => [
            S("span", Qi, M(_.entity.label), 1),
            S("span", Gi, M(_.count), 1),
            _.entity.note ? (u(), m("span", Yi, M(_.entity.note), 1)) : L("", !0),
            v[0] || (v[0] = S("span", {
              class: "dc-type__go",
              "aria-hidden": "true"
            }, "→", -1)),
            S("span", Xi, "Show only " + M(_.entity.label.toLowerCase()), 1),
            _.entity.description ? (u(), m("span", Ji, M(_.entity.description), 1)) : L("", !0)
          ]),
          _: 2
        }, 1032, ["href", "onPress"]),
        _.total ? L("", !0) : (u(), m("p", Zi, M(l.value ? "No matches" : "Nothing here yet"), 1)),
        (u(!0), m(W, null, X(_.rows, (g) => (u(), m("div", {
          key: g.key,
          class: "dc-type__row"
        }, [
          Q(se, {
            class: "dc-type__open",
            href: k(t).pressHref(g.row),
            onPress: (p) => k(t).activate(g.row, p)
          }, {
            default: Y(() => [
              S("span", ec, [
                S("span", tc, M(g.parts.identity), 1),
                S("span", nc, M(g.parts.reference), 1)
              ])
            ]),
            _: 2
          }, 1032, ["href", "onPress"]),
          S("span", ac, [
            (u(!0), m(W, null, X(g.parts.metrics.slice(0, 1), (p) => (u(), O(ft, {
              key: p.column.key ?? p.label,
              class: "dc-type__metric",
              entry: g,
              column: p.column
            }, {
              default: Y(() => [
                S("span", sc, M(p.text), 1),
                S("span", lc, M(p.label), 1)
              ]),
              _: 2
            }, 1032, ["entry", "column"]))), 128)),
            g.parts.updated ? (u(), m("span", rc, M(g.parts.updated), 1)) : L("", !0),
            Q(xn, { entry: g }, null, 8, ["entry"]),
            Q(pt, { entry: g }, null, 8, ["entry"]),
            Q(vt, { entry: g }, null, 8, ["entry"])
          ])
        ]))), 128)),
        _.entity.create && !r.value ? (u(), O(se, {
          key: 1,
          class: "dc-type__new",
          href: k(t).createHref?.(_.entity),
          onPress: (g) => k(t).create(_.entity)
        }, {
          default: Y(() => [
            v[1] || (v[1] = S("span", {
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
}), Ja = /* @__PURE__ */ U(oc, [["__scopeId", "data-v-d60e56a6"]]), ic = ["data-dc-pending", "data-dc-more"], cc = {
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
    const t = e, n = te(), a = Tt(), s = {
      list: cn,
      cards: Ka,
      grid: Wa,
      images: za,
      table: Xa,
      links: ja,
      preview: Ua
    }, l = f(() => _a(n.query.value, t.views)), r = f(() => Re(n.query.value.view, t.views)), i = f(() => (r.value === "record" ? null : s[r.value]) ?? cn), o = f(() => r.value === "record" ? n.recordView.value : null), c = f(() => n.rows.value.length > 0), d = f(() => n.error.value !== null), v = B(null);
    function _(h) {
      return h.querySelector("[data-dc-scroll]") ?? h;
    }
    ae(
      // The page on screen, which is the draft's own while one is being typed.
      () => n.liveQuery.value.page,
      () => {
        v.value && (_(v.value).scrollTop = 0);
      }
    );
    const g = B(""), p = B({ x: 0, y: 0 }), y = B(0);
    function b() {
      const h = v.value;
      if (!h) {
        g.value = "";
        return;
      }
      const w = _(h), P = {
        top: w.scrollTop > 1,
        right: w.scrollWidth - w.clientWidth - w.scrollLeft > 1,
        bottom: w.scrollHeight - w.clientHeight - w.scrollTop > 1,
        left: w.scrollLeft > 1
      };
      g.value = Object.entries(P).filter(([, H]) => H).map(([H]) => H).join(" "), p.value = {
        x: w.offsetHeight - w.clientHeight,
        y: w.offsetWidth - w.clientWidth
      }, y.value = h.querySelector("[data-dc-stuck]")?.offsetHeight ?? 0;
    }
    let C = null, N = null;
    return ae(
      v,
      (h, w) => {
        if (w?.removeEventListener("scroll", b, { capture: !0 }), C?.disconnect(), N?.disconnect(), C = null, N = null, b(), !h || (h.addEventListener("scroll", b, { passive: !0, capture: !0 }), typeof ResizeObserver > "u")) return;
        const P = new ResizeObserver(b), H = typeof MutationObserver > "u" ? null : new MutationObserver(() => {
          ne(), b();
        }), ne = () => {
          P.disconnect(), H?.disconnect();
          for (const I of /* @__PURE__ */ new Set([h, _(h)])) {
            P.observe(I);
            for (const V of I.children) P.observe(V);
            H?.observe(I, { childList: !0 });
          }
        };
        ne(), C = P, N = H;
      },
      { flush: "post" }
    ), we(() => {
      v.value?.removeEventListener("scroll", b, { capture: !0 }), C?.disconnect(), N?.disconnect();
    }), (h, w) => (u(), m("div", {
      ref_key: "scroller",
      ref: v,
      class: "dc-results",
      "data-dc-pending": k(n).pending.value ? "true" : "false",
      "data-dc-more": g.value,
      style: oe({
        "--dc-results-gutter-x": `${p.value.x}px`,
        "--dc-results-gutter-y": `${p.value.y}px`,
        "--dc-results-stuck": `${y.value}px`
      })
    }, [
      e.loading ? (u(), m("p", cc, [...w[1] || (w[1] = [
        S("span", { class: "dc-results__detail" }, "Loading…", -1)
      ])])) : l.value ? (u(), O(Ja, { key: 1 }, yt({ _: 2 }, [
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
      ]), 1024)) : o.value?.id ? (u(), O(et(o.value.component), {
        key: 2,
        id: o.value.id
      }, null, 8, ["id"])) : d.value ? (u(), m("p", uc, [
        w[2] || (w[2] = S("span", { class: "dc-results__headline" }, "Could not load results", -1)),
        S("span", dc, M(k(n).error.value instanceof Error ? k(n).error.value.message : "The data source failed."), 1)
      ])) : !c.value && k(n).pending.value ? (u(), m("p", fc, [...w[3] || (w[3] = [
        S("span", { class: "dc-results__detail" }, "Running query…", -1)
      ])])) : c.value ? (u(), O(et(i.value), { key: 6 })) : (u(), m("div", vc, [
        w[4] || (w[4] = S("span", { class: "dc-results__headline" }, "Nothing matches this query", -1)),
        S("span", pc, M(k(n).summary.value), 1),
        k(n).isPristine.value ? L("", !0) : (u(), O(se, {
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
}), Za = /* @__PURE__ */ U(hc, [["__scopeId", "data-v-bc18f2f9"]]), mc = ["data-dc-theme", "data-dc-value-press", "data-dc-layout"], yc = { class: "dc-shell__main" }, gc = {
  key: 0,
  class: "dc-shell__page"
}, _c = {
  key: 1,
  class: "dc-shell__panel",
  "aria-label": "Panel"
}, wc = /* @__PURE__ */ z({
  __name: "DataShell",
  props: /* @__PURE__ */ En({
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
    layout: { default: "bar" },
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
  emits: /* @__PURE__ */ En(["activate", "create", "duplicate", "delete", "operate", "drill", "query-change", "toggle-pin"], ["update:pinned", "update:selected"]),
  setup(e, { expose: t, emit: n }) {
    const a = e, s = n, l = Mn(e, "pinned"), r = Mn(e, "selected"), i = Tt(), o = un(la, null), c = a.route || o ? null : us(), d = a.route ?? o ?? c;
    we(() => c?.dispose?.());
    const v = B(!!i.page);
    as(() => {
      v.value = !!i.page;
    });
    const _ = ds(d, {
      detached: () => v.value && a.pageQuery === "detached",
      path: () => a.listPath
    }), g = f(() => il({ seed: a.schema.key })), p = f(() => a.source ?? g.value), y = Ml({
      schema: () => a.schema,
      adapter: _,
      defaults: () => a.defaults,
      navigationMode: () => a.navigationMode,
      facetNavigationMode: () => a.facetNavigationMode
    }), b = f(() => a.within?.trim() ?? ""), C = Ol({
      query: y.query,
      entity: y.entity,
      schema: f(() => a.schema),
      setExpression: y.setExpression
    });
    ae(y.query, ($) => s("query-change", $));
    const N = f(() => ml(a.schema, [y.query.value.expr])), h = f(
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
      if (!$ || R.length || y.entity.value !== null) return null;
      const K = a.recordViews?.[$.entityKey];
      return K ? { ...K, id: $.id } : null;
    }), H = f(() => {
      const $ = y.entity.value?.key;
      return $ && a.recordViews?.[$] || null;
    }), ne = f(() => {
      const $ = a.views, R = typeof $ == "function" ? $({ entity: y.entity.value, records: N.value }) : $;
      return P.value || H.value ? [...(R ?? vn).filter((K) => K !== "record"), "record"] : R?.filter((K) => K !== "record");
    }), I = f(
      () => H.value !== null && Re(y.query.value.view, ne.value) === "record"
    ), V = f(() => I.value ? 1 : a.limit), q = El({
      source: p,
      query: C.live,
      schema: f(() => a.schema),
      entity: y.entity,
      limit: V,
      within: b
    }), J = Ll({
      // Not before the data has landed: what is there until then is no place to hold.
      active: f(() => I.value && !a.loading),
      rows: q.rows,
      pending: q.pending,
      page: f(() => C.live.value.page),
      list: f(() => {
        const { entity: $, expr: R, sort: K, dir: xe } = C.live.value;
        return JSON.stringify([$, R, K, xe]);
      }),
      locate: q.locate,
      moveTo: ($) => {
        C.drafting.value ? C.setPage($) : y.setPage($, "replace");
      }
    }), ue = f(() => q.pageCount.value + (J.gone.value ? 1 : 0)), le = f(() => {
      if (P.value) return P.value;
      const $ = H.value;
      return $ ? { ...$, id: J.id.value ?? q.rows.value[0]?.id ?? null } : null;
    });
    function E($) {
      const R = H.value !== null && Re($, ne.value) === "record";
      if (R === I.value) {
        y.setView($);
        return;
      }
      const K = C.live.value.page, xe = R ? (K - 1) * a.limit + 1 : Math.ceil(K / a.limit);
      C.drafting.value ? (y.setView($), C.setPage(xe)) : y.setView($, xe);
    }
    function j($) {
      if (!H.value || I.value) return null;
      const R = q.rows.value.indexOf($);
      return R === -1 ? null : q.offset.value + R + 1;
    }
    ae(
      [ue, q.pending, y.query, C.drafting, () => a.loading, v, J.holding],
      () => {
        if (q.pending.value || C.drafting.value || a.loading || v.value) return;
        const $ = ue.value;
        y.query.value.page <= $ || (J.gone.value ? J.moveTo($) : J.holding.value || y.setPage($, "replace"));
      },
      // Immediately, since a pasted URL is past the end before anything changes;
      // and after the render, so the correction is a navigation the mounted shell
      // makes rather than one it makes on the way up. An async source is still
      // pending here and corrects itself when its count lands.
      { immediate: !0, flush: "post" }
    );
    const T = f(() => new Set(l.value));
    function ee($) {
      const R = new Set(T.value);
      R.has($.id) ? R.delete($.id) : R.add($.id), l.value = [...R], s("toggle-pin", $);
    }
    const re = f(() => {
      if (a.selectable === !0) return !0;
      const $ = y.entity.value;
      return !!($?.duplicate || $?.delete || $?.operations?.some((R) => R.selection !== !1));
    }), me = f(() => new Set(r.value));
    function be($) {
      const R = new Set(me.value);
      R.has($.id) ? R.delete($.id) : R.add($.id), r.value = [...R];
    }
    function ye($) {
      const R = new Set(me.value);
      for (const K of q.rows.value)
        $ ? R.add(K.id) : R.delete(K.id);
      r.value = [...R];
    }
    function ht() {
      r.value.length && (r.value = []);
    }
    const Ve = f(() => ({
      ids: [...r.value],
      rows: q.rows.value.filter(($) => me.value.has($.id)),
      entity: y.entity.value
    }));
    ae(() => y.query.value.entity, ht);
    function De($, R, K = {}, xe) {
      const Cn = Gt(a.schema, y.query.value, $, K, xe);
      K.exclude ? y.narrow(Cn, R?.key ?? y.query.value.entity) : C.release(() => y.narrow(Cn, R?.key ?? null, R ? void 0 : "cards")), s("drill", $, R, K);
    }
    function Ke($) {
      return a.rowPress === "narrow" && xt(a.schema, $) !== null;
    }
    function $e($) {
      return a.schema.entities.find((K) => K.key === $.entityKey)?.href?.($) || null;
    }
    const Se = he(null);
    ae(y.query, () => {
      Se.value = null;
    });
    const x = yl({
      ...y,
      draft: C.text,
      liveQuery: C.live,
      drafting: C.drafting,
      commitDraft: C.commit,
      abandonDraft: C.abandon,
      /*
       * A page of what is on screen: the draft's, while one is live, which are
       * held beside it rather than in the URL — see `liveQuery`.
       */
      setPage: ($, R) => {
        const K = J.step($);
        K !== null && (C.drafting.value ? C.setPage(K) : y.setPage(K, R));
      },
      setView: E,
      schema: f(() => a.schema),
      entities: f(() => a.schema.entities),
      rows: q.rows,
      total: q.total,
      matched: q.matched,
      limit: V,
      offset: q.offset,
      pageCount: ue,
      peek: q.peek,
      pending: q.pending,
      counting: q.counting,
      error: q.error,
      source: p,
      previewsPerType: f(() => a.previewsPerType),
      within: b,
      loading: f(() => a.loading),
      recordView: le,
      pinnable: f(() => a.pinnable === !0),
      isPinned: ($) => T.value.has($.id),
      isPinnedId: ($) => T.value.has($),
      togglePin: ee,
      selectable: re,
      selection: Ve,
      isSelected: ($) => me.value.has($.id),
      toggleSelect: be,
      selectPage: ye,
      clearSelection: ht,
      narrowsOnPress: f(() => a.rowPress === "narrow"),
      rowLinks: f(() => a.rowLinks),
      pressPreview: Se,
      /*
       * The one place a press is read, so every view gets the same answer without
       * knowing which of the two it is: they all call this.
       */
      activate: ($, R = {}) => {
        if (Ke($)) {
          De($, null, R);
          return;
        }
        const K = j($);
        if (K !== null) {
          C.drafting.value ? (y.setView("record"), C.setPage(K)) : y.setView("record", K);
          return;
        }
        const xe = $e($);
        if (xe) {
          window.open(xe, "_blank", "noopener");
          return;
        }
        s("activate", $);
      },
      pressHref: ($) => {
        if (Ke($)) return y.narrowHref(Gt(a.schema, y.query.value, $), null, "cards");
        const R = j($);
        return R !== null ? y.hrefFor({ view: "record", page: R }) : $e($) ?? a.activateHref?.($) ?? null;
      },
      recordHref: $e,
      drillHref: ($, R, K) => xt(a.schema, $) ? y.narrowHref(
        Gt(a.schema, y.query.value, $, {}, K),
        R?.key ?? null,
        R ? void 0 : "cards"
      ) : null,
      create: ($) => s("create", $),
      createHref: ($) => a.createHref?.($) ?? null,
      duplicate: () => s("duplicate", Ve.value),
      delete: () => s("delete", Ve.value),
      operate: ($) => s("operate", $, Ve.value),
      drill: De
    });
    wl({ theme: () => a.theme, accent: () => a.accent, tokens: () => a.tokens });
    const A = f(() => {
      if (!(!a.accent && !a.tokens))
        return { ...a.tokens, ...a.accent ? { "--dc-accent": a.accent } : {} };
    }), F = B(null), D = B(0);
    let Le = null;
    ut(() => {
      const $ = F.value;
      $ && (D.value = $.getBoundingClientRect().width, !(typeof ResizeObserver > "u") && (Le = new ResizeObserver(([R]) => {
        D.value = R.contentRect.width;
      }), Le.observe($)));
    }), we(() => Le?.disconnect());
    const Te = f(() => a.layout === "panel"), Wt = f(() => !Te.value && a.oneStripFrom !== !1 && D.value >= a.oneStripFrom), zt = f(
      () => Re(y.query.value.view, ne.value) === "record" && le.value?.strip === !1
    ), jt = f(() => ({
      views: ne.value,
      selectionPlacement: a.selectionPlacement,
      pagesNote: a.pagesNote
    }));
    return t({
      query: y.query
    }), ($, R) => (u(), m("div", {
      ref_key: "root",
      ref: F,
      class: "dc-shell",
      "data-dc-theme": e.theme,
      "data-dc-value-press": e.valuePress,
      "data-dc-layout": e.layout,
      style: oe(A.value)
    }, [
      Te.value ? L("", !0) : (u(), m("div", {
        key: 0,
        class: ce(["dc-shell__head", { "dc-shell__head--one-strip": Wt.value }])
      }, [
        Q(ln, null, yt({ _: 2 }, [
          i.page ? void 0 : {
            name: "lead",
            fn: Y(() => [
              Q(Yn, {
                views: ne.value,
                "type-chooser": e.typeChooser
              }, null, 8, ["views", "type-chooser"])
            ]),
            key: "0"
          },
          i.brand ? {
            name: "brand",
            fn: Y((K) => [
              G($.$slots, "brand", Ut(ss(K)), void 0, !0)
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
        Wt.value && !i.page && !zt.value ? (u(), O(_t, Ut(Ie({ key: 0 }, jt.value)), null, 16)) : L("", !0)
      ], 2)),
      S("div", yc, [
        i.page ? (u(), m("div", gc, [
          G($.$slots, "page", {
            query: k(x).query.value
          }, void 0, !0)
        ])) : L("", !0),
        !Te.value && !Wt.value && !i.page && !zt.value ? (u(), O(_t, Ut(Ie({ key: 1 }, jt.value)), null, 16)) : L("", !0),
        i.page ? L("", !0) : G($.$slots, "results", {
          rows: k(x).rows.value,
          total: k(x).total.value,
          offset: k(x).offset.value,
          pageCount: k(x).pageCount.value,
          query: k(x).liveQuery.value,
          pending: k(x).pending.value,
          loading: e.loading
        }, () => [
          Q(Za, {
            views: ne.value,
            loading: e.loading
          }, yt({ _: 2 }, [
            i["cards-before"] || w().length ? {
              name: "cards-before",
              fn: Y(() => [
                (u(!0), m(W, null, X(w(), (K) => (u(), m(W, {
                  key: `${K.entityKey}:${K.id}`
                }, [
                  i.record ? G($.$slots, "record", {
                    id: K.id,
                    entity: K.entity
                  }, void 0, !0, 0) : (u(), O(et(e.recordCards?.[K.entityKey]), {
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
      ]),
      Te.value ? (u(), m("aside", _c, [
        G($.$slots, "panel-head", {}, void 0, !0),
        Q(ln, { panel: "" }, yt({ _: 2 }, [
          i.actions ? {
            name: "actions",
            fn: Y(() => [
              G($.$slots, "actions", {}, void 0, !0)
            ]),
            key: "0"
          } : void 0
        ]), 1024),
        i.page ? L("", !0) : (u(), O(Yn, {
          key: 0,
          views: ne.value,
          "type-chooser": e.typeChooser,
          stacked: ""
        }, null, 8, ["views", "type-chooser"])),
        G($.$slots, "panel", {
          query: k(x).query.value
        }, void 0, !0),
        !i.page && !zt.value ? (u(), O(_t, Ie({
          key: 1,
          class: "dc-shell__panel-actions"
        }, jt.value), null, 16)) : L("", !0)
      ])) : L("", !0)
    ], 12, mc));
  }
}), kc = /* @__PURE__ */ U(wc, [["__scopeId", "data-v-cae1a0f1"]]), bc = ["data-dc-span", "data-dc-muted", "data-dc-collapsed"], $c = ["data-dc-collapsible"], xc = ["aria-expanded", "aria-controls"], Sc = { class: "dc-shell-card__sr" }, Cc = {
  key: 0,
  class: "dc-shell-card__identity"
}, Pc = { class: "dc-shell-card__title dc-shell-card__name" }, Mc = {
  key: 0,
  class: "dc-shell-card__ref dc-mono"
}, Ec = {
  key: 1,
  class: "dc-shell-card__title"
}, Lc = {
  key: 2,
  class: "dc-shell-card__count dc-mono"
}, Tc = {
  key: 1,
  class: "dc-shell-card__aside"
}, Oc = ["data-dc-flush"], Ac = /* @__PURE__ */ z({
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
    const n = e, a = t, s = B(n.defaultCollapsed === !0), l = f(() => n.span === "all" ? { gridColumn: "1 / -1" } : void 0), r = Tt();
    function i(I) {
      return o(I?.() ?? []);
    }
    function o(I) {
      return I.some((V) => V.type === ls ? !1 : V.type === rs ? String(V.children ?? "").trim().length > 0 : V.type === W ? o(V.children ?? []) : !0);
    }
    const c = f(
      () => !!n.title || !!n.name || d.value || i(r.head)
    ), d = f(() => i(r.aside)), v = f(() => i(r.default)), _ = f(() => i(r.foot)), g = f(
      () => !!n.name && (!!n.reference || i(r.reference))
    ), p = f(() => n.collapsible === !0 && c.value), y = f(() => p.value && (n.collapsed ?? s.value));
    function b() {
      const I = !y.value;
      s.value = I, a("update:collapsed", I);
    }
    const C = Ot() ?? "dc-shell-card", N = `${C}-body`, h = `${C}-foot`, w = f(
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
    ].join(", "), H = B(null);
    function ne(I) {
      if (!p.value) return;
      const V = I.target?.closest(P);
      V && H.value?.contains(V) || typeof window < "u" && window.getSelection()?.toString() || b();
    }
    return (I, V) => (u(), m("section", {
      class: "dc-shell-card",
      style: oe(l.value),
      "data-dc-span": e.span,
      "data-dc-muted": e.muted ? "true" : "false",
      "data-dc-collapsed": y.value ? "true" : "false"
    }, [
      c.value ? (u(), m("header", {
        key: 0,
        ref_key: "head",
        ref: H,
        class: "dc-shell-card__head",
        "data-dc-collapsible": p.value ? "true" : "false",
        onClick: ne
      }, [
        p.value ? (u(), m("button", {
          key: 0,
          type: "button",
          class: "dc-shell-card__toggle",
          "aria-expanded": y.value ? "false" : "true",
          "aria-controls": w.value,
          onClick: b
        }, [
          V[0] || (V[0] = S("svg", {
            class: "dc-shell-card__chevron",
            viewBox: "0 0 10 10",
            "aria-hidden": "true"
          }, [
            S("path", { d: "M2 3.5 5 6.5 8 3.5" })
          ], -1)),
          S("span", Sc, M(e.name || e.title || "Card"), 1)
        ], 8, xc)) : L("", !0),
        G(I.$slots, "head", {}, () => [
          e.name ? (u(), m("div", Cc, [
            S("h2", Pc, M(e.name), 1),
            g.value ? (u(), m("span", Mc, [
              G(I.$slots, "reference", {}, () => [
                Z(M(e.reference), 1)
              ], !0)
            ])) : L("", !0)
          ])) : (u(), m("h2", Ec, M(e.title), 1)),
          e.count !== void 0 ? (u(), m("span", Lc, M(e.count), 1)) : L("", !0)
        ], !0),
        d.value ? (u(), m("span", Tc, [
          G(I.$slots, "aside", {}, void 0, !0)
        ])) : L("", !0)
      ], 8, $c)) : L("", !0),
      v.value ? Xt((u(), m("div", {
        key: 1,
        id: N,
        class: "dc-shell-card__body",
        "data-dc-flush": e.flush ? "true" : "false"
      }, [
        G(I.$slots, "default", {}, void 0, !0)
      ], 8, Oc)), [
        [Ln, !y.value]
      ]) : L("", !0),
      _.value ? Xt((u(), m("footer", {
        key: 2,
        id: h,
        class: "dc-shell-card__foot"
      }, [
        G(I.$slots, "foot", {}, void 0, !0)
      ], 512)), [
        [Ln, !y.value]
      ]) : L("", !0)
    ], 12, bc));
  }
}), Au = /* @__PURE__ */ U(Ac, [["__scopeId", "data-v-c84525aa"]]), Nc = ["aria-label"], Ic = ["aria-checked", "data-dc-active", "tabindex", "onClick", "onKeydown"], Rc = /* @__PURE__ */ z({
  __name: "SegmentedControl",
  props: {
    modelValue: {},
    options: {},
    label: {},
    mono: { type: Boolean }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const n = e, a = t, s = B([]);
    function l(r, i) {
      const o = n.options.length;
      let c = null;
      if (r.key === "ArrowRight" || r.key === "ArrowDown" ? c = (i + 1) % o : r.key === "ArrowLeft" || r.key === "ArrowUp" ? c = (i - 1 + o) % o : r.key === "Home" ? c = 0 : r.key === "End" && (c = o - 1), c === null) return;
      r.preventDefault();
      const d = n.options[c];
      d && (a("update:modelValue", d.key), s.value[c]?.focus());
    }
    return (r, i) => (u(), m("div", {
      class: "dc-segmented",
      role: "radiogroup",
      "aria-label": e.label
    }, [
      (u(!0), m(W, null, X(e.options, (o, c) => (u(), m("button", {
        key: o.key,
        ref_for: !0,
        ref_key: "buttons",
        ref: s,
        type: "button",
        role: "radio",
        class: ce(["dc-segmented__item", { "dc-segmented__item--mono": e.mono }]),
        "aria-checked": o.key === e.modelValue,
        "data-dc-active": o.key === e.modelValue ? "true" : "false",
        tabindex: o.key === e.modelValue ? 0 : -1,
        onClick: (d) => a("update:modelValue", o.key),
        onKeydown: (d) => l(d, c)
      }, M(o.label), 43, Ic))), 128))
    ], 8, Nc));
  }
}), Bc = /* @__PURE__ */ U(Rc, [["__scopeId", "data-v-63fb5482"]]), Hc = { class: "dc-fact__label" }, qc = ["title"], Fc = /* @__PURE__ */ z({
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
    return (s, l) => (u(), m("div", {
      class: "dc-fact",
      style: oe(a.value)
    }, [
      S("dt", Hc, [
        G(s.$slots, "label", {}, () => [
          Z(M(e.label), 1)
        ], !0)
      ]),
      S("dd", {
        class: "dc-fact__value dc-mono",
        title: e.title
      }, [
        G(s.$slots, "default", {}, () => [
          n.value.length === 1 ? (u(), m(W, { key: 0 }, [
            Z(M(n.value[0]), 1)
          ], 64)) : (u(!0), m(W, { key: 1 }, X(n.value, (r, i) => (u(), m("span", {
            key: i,
            class: "dc-fact__line"
          }, M(r), 1))), 128))
        ], !0)
      ], 8, qc)
    ], 4));
  }
}), Vc = /* @__PURE__ */ U(Fc, [["__scopeId", "data-v-1f6d25e6"]]), Dc = /* @__PURE__ */ z({
  __name: "ShellFacts",
  props: {
    items: { default: () => [] },
    min: { default: "200px" }
  },
  setup(e) {
    const t = e, n = f(() => ({ "--dc-facts-min": t.min }));
    return (a, s) => (u(), m("dl", {
      class: "dc-facts",
      style: oe(n.value)
    }, [
      (u(!0), m(W, null, X(e.items, (l, r) => (u(), O(Vc, {
        key: `${r}:${l.label}`,
        label: l.label,
        value: l.value,
        title: l.title,
        wide: l.wide
      }, null, 8, ["label", "value", "title", "wide"]))), 128)),
      G(a.$slots, "default", {}, void 0, !0)
    ], 4));
  }
}), Nu = /* @__PURE__ */ U(Dc, [["__scopeId", "data-v-17455afa"]]), Kc = { class: "dc-counts" }, Wc = ["data-dc-tone"], zc = {
  key: 0,
  class: "dc-counts__empty"
}, jc = /* @__PURE__ */ z({
  __name: "StatusCounts",
  props: {
    counts: {},
    empty: { default: ke }
  },
  setup(e) {
    const t = e, n = f(() => t.counts.filter((a) => a.count > 0));
    return (a, s) => (u(), m("span", Kc, [
      (u(!0), m(W, null, X(n.value, (l) => (u(), m("span", {
        key: l.label,
        class: "dc-counts__count",
        "data-dc-tone": l.tone ?? "neutral"
      }, M(l.count) + " " + M(l.label), 9, Wc))), 128)),
      n.value.length === 0 ? (u(), m("span", zc, M(e.empty), 1)) : L("", !0)
    ]));
  }
}), Iu = /* @__PURE__ */ U(jc, [["__scopeId", "data-v-5553a9e2"]]), Uc = ["data-dc-copied", "title", "aria-label"], Qc = {
  key: 0,
  class: "dc-copy__mark",
  viewBox: "0 0 16 16",
  "aria-hidden": "true"
}, Gc = {
  key: 1,
  class: "dc-copy__mark",
  viewBox: "0 0 16 16",
  "aria-hidden": "true"
}, Yc = 1500, Xc = /* @__PURE__ */ z({
  __name: "CopyButton",
  props: {
    text: {},
    label: { default: "Copy to clipboard" }
  },
  emits: ["copied", "error"],
  setup(e, { emit: t }) {
    const n = e, a = t, s = B(!1);
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
      }, Yc), a("copied", i);
    }
    return we(() => clearTimeout(l)), (i, o) => (u(), m("button", {
      type: "button",
      class: "dc-copy",
      "data-dc-copied": s.value ? "true" : "false",
      title: s.value ? "Copied" : e.label,
      "aria-label": e.label,
      onClick: r
    }, [
      s.value ? (u(), m("svg", Gc, [...o[1] || (o[1] = [
        S("path", { d: "M3 8.5l3.2 3L13 4.5" }, null, -1)
      ])])) : (u(), m("svg", Qc, [...o[0] || (o[0] = [
        S("rect", {
          x: "5.5",
          y: "5.5",
          width: "8",
          height: "9",
          rx: "1.5"
        }, null, -1),
        S("path", { d: "M10.5 3.5v-1a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h1" }, null, -1)
      ])]))
    ], 8, Uc));
  }
}), Jc = /* @__PURE__ */ U(Xc, [["__scopeId", "data-v-f4249d7f"]]), Zc = ["data-dc-copy", "data-dc-wrap", "data-dc-tone"], eu = /* @__PURE__ */ z({
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
    const n = e, a = t, s = B(null), l = f(() => n.maxHeight === void 0 ? void 0 : { maxHeight: typeof n.maxHeight == "number" ? `${n.maxHeight}px` : n.maxHeight });
    function r() {
      return n.code ?? s.value?.textContent ?? "";
    }
    return (i, o) => (u(), m("div", {
      class: "dc-code",
      "data-dc-copy": e.copy ? "true" : "false",
      "data-dc-wrap": e.wrap ? "true" : "false",
      "data-dc-tone": e.tone
    }, [
      S("pre", {
        ref_key: "pre",
        ref: s,
        class: "dc-code__text dc-mono",
        style: oe(l.value)
      }, [
        G(i.$slots, "default", {}, () => [
          Z(M(e.code), 1)
        ], !0)
      ], 4),
      e.copy ? (u(), O(Jc, {
        key: 0,
        class: "dc-code__copy",
        text: r,
        label: e.copyLabel,
        onCopied: o[0] || (o[0] = (c) => a("copied", c)),
        onError: o[1] || (o[1] = (c) => a("error", c))
      }, null, 8, ["label"])) : L("", !0)
    ], 8, Zc));
  }
}), Ru = /* @__PURE__ */ U(eu, [["__scopeId", "data-v-67b371dd"]]), tu = 24, nu = /* @__PURE__ */ z({
  __name: "ShellLog",
  props: {
    fetchChunk: {},
    stripAnsi: { type: Boolean },
    maxHeight: { default: "460px" }
  },
  setup(e, { expose: t }) {
    const n = e, a = B(""), s = f(() => n.stripAnsi ? ws(a.value) : a.value), l = B(null);
    let r = 0, i = null;
    function o() {
      return i ??= c().finally(() => {
        i = null;
      }), i;
    }
    async function c() {
      const { chunk: _, offset: g } = await n.fetchChunk(r);
      if (r = g, !_) return;
      const p = l.value, y = !p || p.scrollTop + p.clientHeight >= p.scrollHeight - tu;
      a.value += _, y && (await Ze(), l.value && (l.value.scrollTop = l.value.scrollHeight));
    }
    function d() {
      a.value = "", r = 0;
    }
    const v = f(() => n.maxHeight === void 0 ? void 0 : { maxHeight: typeof n.maxHeight == "number" ? `${n.maxHeight}px` : n.maxHeight });
    return t({ poll: o, reset: d }), (_, g) => (u(), m("pre", {
      ref_key: "pane",
      ref: l,
      class: "dc-log dc-mono",
      style: oe(v.value)
    }, M(s.value), 5));
  }
}), Bu = /* @__PURE__ */ U(nu, [["__scopeId", "data-v-2c86947e"]]), au = ["data-dc-theme"], su = ["aria-labelledby", "aria-label"], lu = {
  key: 1,
  class: "dc-dialog__actions"
}, Ye = [], ru = /* @__PURE__ */ z({
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
    const n = e, a = t, { theme: s, style: l, adopt: r } = bn(n), i = `${Ot() ?? "dc-dialog"}-title`, o = B(null);
    function c() {
      a("close"), a("update:open", !1);
    }
    const d = Symbol("dc-dialog");
    function v(h) {
      h.key !== "Escape" || h.defaultPrevented || Ye[Ye.length - 1] === d && (h.preventDefault(), c());
    }
    let _ = !1;
    function g(h) {
      _ = h.target === h.currentTarget;
    }
    function p(h) {
      h.target === h.currentTarget && _ && c(), _ = !1;
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
    let b = null;
    async function C() {
      Ye.push(d), document.addEventListener("keydown", v), b = document.activeElement instanceof HTMLElement ? document.activeElement : null, r(), await Ze(), (o.value?.querySelector("[autofocus]") ?? o.value?.querySelector(y) ?? o.value)?.focus();
    }
    function N() {
      const h = Ye.indexOf(d);
      h !== -1 && (Ye.splice(h, 1), document.removeEventListener("keydown", v), b?.isConnected && b.focus(), b = null);
    }
    return ut(() => {
      n.open && C();
    }), ae(
      () => n.open,
      (h) => {
        h ? C() : N();
      }
    ), we(N), (h, w) => e.open ? (u(), O(Lt, {
      key: 0,
      to: e.to
    }, [
      S("div", {
        class: "dc-shell dc-layer dc-dialog",
        "data-dc-theme": k(s),
        style: oe(k(l)),
        onPointerdown: g,
        onClick: p
      }, [
        S("div", {
          ref_key: "panel",
          ref: o,
          class: ce(["dc-dialog__panel", e.panelClass]),
          role: "dialog",
          "aria-modal": "true",
          tabindex: "-1",
          "aria-labelledby": e.title ? i : void 0,
          "aria-label": e.title ? void 0 : e.label
        }, [
          e.title ? (u(), m("h2", {
            key: 0,
            id: i,
            class: "dc-dialog__title"
          }, M(e.title), 1)) : L("", !0),
          S("div", {
            class: ce(["dc-dialog__body", e.bodyClass])
          }, [
            G(h.$slots, "default", {}, void 0, !0)
          ], 2),
          h.$slots.actions ? (u(), m("div", lu, [
            G(h.$slots, "actions", {}, void 0, !0)
          ])) : L("", !0)
        ], 10, su)
      ], 44, au)
    ], 8, ["to"])) : L("", !0);
  }
}), Hu = /* @__PURE__ */ U(ru, [["__scopeId", "data-v-0cccf313"]]), ou = 4500, iu = 9e3, ct = B([]);
let ta = 0;
function es(e) {
  ct.value = ct.value.filter((t) => t.id !== e);
}
function ts(e, t = "ok") {
  ta += 1;
  const n = ta;
  ct.value = [...ct.value, { id: n, message: e, kind: t }], setTimeout(() => es(n), t === "err" ? iu : ou);
}
function cu(e) {
  ts(e instanceof Error ? e.message : String(e), "err");
}
function uu() {
  return { toasts: os(ct), toast: ts, toastError: cu, dismiss: es };
}
const du = ["data-dc-theme"], fu = ["data-dc-kind", "role"], vu = /* @__PURE__ */ z({
  __name: "ShellToasts",
  props: {
    to: { default: "body" },
    theme: { default: void 0 },
    accent: { default: void 0 },
    tokens: { default: void 0 }
  },
  setup(e) {
    const t = e, { toasts: n } = uu(), { theme: a, style: s, adopt: l } = bn(t);
    return ut(l), (r, i) => (u(), O(Lt, { to: e.to }, [
      S("div", {
        class: "dc-shell dc-layer dc-toasts",
        "data-dc-theme": k(a),
        style: oe(k(s)),
        "aria-live": "polite"
      }, [
        (u(!0), m(W, null, X(k(n), (o) => (u(), m("div", {
          key: o.id,
          class: "dc-toast",
          "data-dc-kind": o.kind,
          role: o.kind === "err" ? "alert" : void 0
        }, M(o.message), 9, fu))), 128))
      ], 12, du)
    ], 8, ["to"]));
  }
}), qu = /* @__PURE__ */ U(vu, [["__scopeId", "data-v-d970211c"]]);
function Fu(e, t) {
  const n = B(!1);
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
  return Et(() => {
    s = !0, r();
  }, !0), { start: c, stop: r, polling: n };
}
function Vu(e, t = {}) {
  const n = t.key ?? ((l) => JSON.stringify(l)), a = he();
  let s = null;
  return is(() => {
    const l = e(), r = n(l);
    r !== s && (s = r, a.value = l);
  }), a;
}
function Du(e = {}) {
  return { key: "ordinal", kind: "ordinal", label: "#", width: "52px", ...e };
}
function Ku(e = {}) {
  return { key: "status", role: "state", kind: "status", label: "State", sort: "state", width: "104px", ...e };
}
function Wu(e = {}) {
  return { key: "tint", role: "tint", ...e };
}
function zu(e = {}) {
  return { key: "picture", role: "image", kind: "image", width: "56px", height: "40px", ...e };
}
function ju(e, t = {}) {
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
function Uu(e, t = {}) {
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
function Qu(e, t, n = {}) {
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
function Gu(e, t, n = {}) {
  return { key: e, kind: "date", label: t, sort: e, mono: !0, muted: !0, ...n };
}
function Yu(e = {}) {
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
function Xu(e, t, n = {}) {
  return { key: e, label: t, sort: e, truncate: !0, hideBelow: 900, ...n };
}
function Ju(e, t, n, a = {}) {
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
function Kt(e) {
  return typeof e == "number" ? e : typeof e == "string" && e.trim() !== "" ? Number(e) : Number.NaN;
}
function Zu(e) {
  const t = Kt(e);
  return Number.isFinite(t) && t > 0 ? ms(t) : ke;
}
function ed(e) {
  const t = Kt(e);
  return Number.isFinite(t) && t > 0 ? ys(t) : ke;
}
function td(e) {
  const t = Kt(e);
  return Number.isFinite(t) && t > 0 ? gs(t) : ke;
}
function nd(e) {
  const t = Kt(e);
  return Number.isFinite(t) ? _s(t) : ke;
}
function pu(e) {
  if (e <= 0) return 0;
  const t = 10 ** Math.floor(Math.log10(e));
  for (const n of [1, 2, 5])
    if (e <= n * t) return n * t;
  return 10 * t;
}
function hu(e, t) {
  const n = /* @__PURE__ */ new Set();
  for (const a of e) {
    const s = a.fields[t];
    for (const l of Array.isArray(s) ? s : [s])
      typeof l == "string" && l && n.add(l);
  }
  return [...n].sort((a, s) => a.localeCompare(s));
}
function mu(e, t) {
  let n = 0;
  for (const a of e) {
    const s = a.fields[t];
    typeof s == "number" && s > n && (n = s);
  }
  return n;
}
function ad(e, t, n, a = {}) {
  return {
    kind: "chips",
    key: t,
    label: n,
    options: hu(e, t),
    ...a.multiple ? { multiple: !0 } : {}
  };
}
function sd(e, t, n) {
  return { kind: "range", key: t, label: n, min: 0, max: pu(mu(e, t)) };
}
function ld(e, t, n) {
  return { kind: "toggle", key: e, label: t, text: n };
}
function rd(e) {
  return e.filter((t) => t.kind === "chips" ? t.options.length > 1 : t.kind === "range" ? t.max > 0 : !0);
}
function od(e = "", t = "/") {
  const n = B(fe(e)), a = B(t), s = [`${a.value}${n.value}`];
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
function na(e) {
  const t = e.indexOf("?");
  if (t === -1) return "";
  const n = e.slice(t), a = n.indexOf("#");
  return fe(a === -1 ? n : n.slice(0, a));
}
function id(e) {
  const t = B(na(e.currentRoute.value.fullPath)), n = f(() => e.currentRoute.value.path), a = ae(
    () => e.currentRoute.value.fullPath,
    (s) => {
      t.value = na(s);
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
function cd(e, t, n = "/") {
  return (a) => {
    const s = a.params[t], l = Array.isArray(s) ? s.join("/") : s ?? "", r = a.query[He], i = typeof r == "string" ? r : "", o = `${e}="${l.replace(/"/g, "")}"`;
    return { path: n, query: { ...a.query, [He]: je(i, o) } };
  };
}
function ud(e, t = "/") {
  return (n) => ({ path: t, query: { ...n.query, [Qe]: e } });
}
function dd(e) {
  const t = /* @__PURE__ */ new Map();
  for (const n of e) {
    const a = t.get(n.entityKey);
    a ? a.push(n) : t.set(n.entityKey, [n]);
  }
  return {
    query(n) {
      return ka(n, (a) => t.get(a.key) ?? [], {
        undatedLast: !0,
        zeroIsAll: !0
      });
    }
  };
}
function fd(e, t) {
  return e.query({ ...t, limit: Number.MAX_SAFE_INTEGER, offset: 0 }).rows;
}
const yu = {
  DataShell: kc,
  ShellHeader: ln,
  RecordActions: _t,
  ResultsArea: Za,
  SegmentedControl: Bc,
  StatusPill: Ue,
  ListView: cn,
  CardsView: Ka,
  GridView: Wa,
  ImagesView: za,
  TableView: Xa,
  LinksView: ja,
  PreviewView: Ua,
  TypeCardsView: Ja
}, vd = {
  install(e, t = {}) {
    const n = t.prefix ?? "";
    for (const [a, s] of Object.entries(yu))
      e.component(`${n}${a}`, s);
    t.route && e.provide(la, t.route), (t.theme || t.accent || t.tokens) && _l({ theme: t.theme, accent: t.accent, tokens: t.tokens }, e);
  }
};
export {
  bu as COLUMN_BREAKPOINTS,
  ku as COLUMN_ROLES,
  Ka as CardsView,
  ea as ColumnCell,
  Jc as CopyButton,
  Ws as DEFAULT_ENTITY_VIEW,
  Zt as DEFAULT_SORT,
  ha as DEFAULT_VIEW,
  Tl as DRAFT_DELAY,
  kc as DataShell,
  ke as EMPTY_CELL,
  $a as ENTITY_ALL,
  Ct as ENTITY_TERM,
  it as EXPRESSION_TERM,
  Wa as GridView,
  vd as HeaderContentLayoutPlugin,
  za as ImagesView,
  ja as LinksView,
  cn as ListView,
  kt as MOCK_TINTS,
  ft as MetricDrill,
  vt as OpenMark,
  _n as PARAM_DIR,
  Qe as PARAM_ENTITY,
  He as PARAM_EXPR,
  Ht as PARAM_PAGE,
  gn as PARAM_SORT,
  Bt as PARAM_VIEW,
  wu as PILL_TONES,
  Hl as POPOVER_FLIP_BELOW,
  Rl as POPOVER_GAP,
  Bl as POPOVER_MARGIN,
  $n as PinStar,
  Ua as PreviewView,
  xn as QueryMark,
  Xe as RECORD_STATUSES,
  yn as RESULT_FIELDS,
  la as ROUTE_ADAPTER_KEY,
  _t as RecordActions,
  Yn as RecordChoosers,
  Za as ResultsArea,
  Na as SHELL_CONTEXT_KEY,
  St as SHELL_THEME_KEY,
  pt as ScopeMark,
  Bc as SegmentedControl,
  Fe as SelectTick,
  Au as ShellCard,
  Ru as ShellCode,
  Hu as ShellDialog,
  Vc as ShellFact,
  Nu as ShellFacts,
  ln as ShellHeader,
  Bu as ShellLog,
  Pr as ShellPager,
  Dl as ShellPopover,
  qu as ShellToasts,
  on as StandingControl,
  Iu as StatusCounts,
  Ue as StatusPill,
  iu as TOAST_ERROR_MS,
  ou as TOAST_MS,
  Xa as TableView,
  Ja as TypeCardsView,
  Qs as VIEW_ICONS,
  vn as VIEW_KINDS,
  Dn as VIEW_LABELS,
  je as addTerm,
  hn as andExpression,
  Zu as bytesCell,
  oa as cellFull,
  $i as cellNarrowings,
  Ee as cellText,
  gt as cellTextOf,
  de as cellValue,
  Zs as changesResults,
  ad as chipsFrom,
  On as columnAlign,
  An as columnClass,
  Tn as columnKey,
  Ya as columnNarrows,
  dt as columnShortcut,
  fa as columnShortcutOf,
  Jt as columnTruncates,
  ks as columnsFor,
  ca as compactShortcuts,
  Yl as completeDraft,
  Js as countPages,
  us as createHistoryAdapter,
  od as createMemoryAdapter,
  dd as createMemoryDataSource,
  il as createMockDataSource,
  id as createVueRouterAdapter,
  Gu as dateColumn,
  xs as defaultCellText,
  wt as defaultQuery,
  Be as defaultViewFor,
  ds as detachableAdapter,
  Gt as drillExpression,
  ed as durationCell,
  td as elapsedCell,
  Ys as emptyFacetValue,
  fl as entityAddress,
  Yu as entityColumn,
  en as entityCount,
  ud as entityRedirect,
  Ma as excludingTerm,
  nt as expandShortcuts,
  Xu as facetColumn,
  ot as facetField,
  Ba as facetValue,
  As as fieldHeading,
  Pa as fieldTerm,
  lt as findEntity,
  xa as findEntityByAddress,
  Me as findSort,
  Ju as flagColumn,
  Je as fnv1a,
  ya as focusEntity,
  ms as formatBytes,
  tt as formatCount,
  ps as formatDate,
  $u as formatDateTime,
  At as formatDigits,
  ys as formatDuration,
  gs as formatElapsed,
  pe as formatExpression,
  We as formatInteger,
  vs as formatMetric,
  hs as formatOrdinal,
  _s as formatPercent,
  Es as formatRange,
  _e as formatTerm,
  ol as generateRows,
  xl as hasActiveFacets,
  ju as identityColumn,
  Lu as idsExpression,
  Cu as isEntityScoped,
  Xs as isFacetActive,
  mn as isPristineQuery,
  ze as isRangeTerm,
  _a as isTypeCardsQuery,
  ma as isViewKind,
  Su as joinExpression,
  Ea as liftTerm,
  Bs as matchesExpression,
  Qu as metricColumn,
  Tu as narrowPatch,
  Hs as negateTerm,
  pu as niceMax,
  fe as normalizeSearch,
  bi as numberRange,
  Fs as oppositeTerm,
  Du as ordinalColumn,
  ie as parseExpression,
  hl as parseQuery,
  nd as percentCell,
  zu as pictureColumn,
  ql as placePopover,
  Wr as presentParts,
  Va as presentRow,
  rt as pressOptions,
  yl as provideShellContext,
  _l as provideShellTheme,
  fd as queryAll,
  sd as rangeFrom,
  Nt as rangeOf,
  Ks as readDraft,
  Eu as readExpression,
  cd as recordRedirect,
  Ca as recordTerm,
  ml as recordsIn,
  Uu as referenceColumn,
  st as refineExpression,
  Re as resolveView,
  ve as roleColumn,
  ra as roleColumns,
  $s as rowKey,
  at as sameTerm,
  Ft as scopeTerm,
  xt as scopeTermFor,
  Oa as scopedEntity,
  Mu as searchFromQuery,
  zs as searchesCorpus,
  Wn as serializeQuery,
  vl as sortAddress,
  Rt as sortsFor,
  xu as splitExpression,
  Sa as standingTerm,
  Ku as stateColumn,
  ws as stripAnsi,
  Pl as summarizeQuery,
  Pt as summaryTerms,
  kn as termStanding,
  Wu as tintColumn,
  Pu as tintFor,
  ld as toggleFacet,
  mi as useColumns,
  Ol as useDraft,
  Hr as useEntityCounts,
  Vi as useEntityPreviews,
  bn as useLayerTheme,
  Fu as usePoll,
  qe as usePresentedRows,
  Ml as useQueryState,
  Il as useRecordNames,
  El as useResults,
  te as useShellContext,
  Vu as useStableSchema,
  uu as useToasts,
  rd as usefulFacets,
  js as viewAcross,
  Us as viewAfter,
  Ha as withFacetValue,
  tn as withStanding,
  zn as withWhere,
  Ou as withoutFacet,
  Ta as withoutOwnScope,
  qs as withoutTerm
};
