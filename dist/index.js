import { ref as q, computed as f, inject as hn, provide as mn, getCurrentInstance as oa, shallowRef as he, toValue as Le, watch as ne, onScopeDispose as It, getCurrentScope as ra, defineComponent as j, onMounted as Ge, onBeforeUnmount as ke, openBlock as d, createBlock as H, Teleport as Bt, createElementVNode as b, mergeProps as Oe, unref as k, renderSlot as G, createCommentVNode as O, nextTick as st, createElementBlock as p, withKeys as Te, useSlots as Rt, useId as Ht, normalizeClass as oe, withCtx as Y, toDisplayString as L, createTextVNode as Z, Fragment as z, renderList as X, withModifiers as xe, withDirectives as Ct, normalizeStyle as ae, vModelText as ia, createVNode as U, reactive as En, resolveDynamicComponent as Ke, toHandlers as ca, createSlots as bt, normalizeProps as $t, useModel as Ln, onBeforeUpdate as is, guardReactiveProps as cs, mergeModels as Tn, vShow as On, Comment as us, Text as ds, readonly as fs, watchEffect as vs } from "vue";
import { MenuList as ps } from "menu-bar";
const lt = ["list", "cards", "grid", "images", "table", "links", "preview"], nt = ["ok", "running", "queued", "review", "failed"], Uu = [...nt, "neutral", "accent"], Qu = [
  "identity",
  "reference",
  "metric",
  "state",
  "updated",
  "image",
  "tint"
], Gu = [480, 620, 760, 900, 1100], ua = Symbol("dc.routeAdapter");
function ce(e) {
  if (!e) return "";
  const t = e.replace(/^[?]/, "");
  return t ? `?${t}` : "";
}
function hs() {
  const e = typeof window < "u", t = q(e ? ce(window.location.search) : ""), n = q(e ? window.location.pathname : "/"), a = () => {
    t.value = ce(window.location.search), n.value = window.location.pathname;
  };
  e && window.addEventListener("popstate", a);
  const s = (l, o, r) => {
    const i = ce(l);
    if (!e) {
      t.value = i, r !== void 0 && (n.value = r);
      return;
    }
    const c = r === void 0 || r === window.location.pathname ? `${window.location.pathname}${i}${window.location.hash}` : `${r}${i}`;
    o === "push" ? window.history.pushState(window.history.state, "", c) : window.history.replaceState(window.history.state, "", c), t.value = i, n.value = window.location.pathname;
  };
  return {
    search: t,
    path: n,
    href(l, o) {
      return e ? o !== void 0 && o !== window.location.pathname ? `${o}${ce(l)}` : `${window.location.pathname}${ce(l)}${window.location.hash}` : `${o ?? n.value}${ce(l)}`;
    },
    push: (l, o) => s(l, "push", o),
    replace: (l, o) => s(l, "replace", o),
    dispose: () => {
      e && window.removeEventListener("popstate", a);
    }
  };
}
function ms(e, t) {
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
      const r = o ?? (n.value ? t.path() : void 0);
      return e.href ? e.href(l, r) : `${r ?? e.path.value}${ce(l)}`;
    }
  };
}
function at(e) {
  let t = 2166136261;
  for (let n = 0; n < e.length; n++)
    t ^= e.charCodeAt(n), t = Math.imul(t, 16777619);
  return Math.abs(t);
}
const ys = new Intl.NumberFormat("en-US", {
  minimumSignificantDigits: 2,
  maximumSignificantDigits: 2,
  useGrouping: !1
});
function qt(e) {
  return Number.isFinite(e) ? Math.abs(e) < 100 ? ys.format(e) : String(Math.round(e)) : "—";
}
function gs(e) {
  return Number.isFinite(e) ? Number.isInteger(e) || Math.abs(e) >= 100 ? Ne(e) : qt(e) : "—";
}
function Ne(e) {
  if (!Number.isFinite(e)) return "—";
  const t = Math.round(e), n = Math.abs(t);
  return n < 1e3 ? String(t) : n < 9950 ? `${(t / 1e3).toFixed(1)}k` : n < 999500 ? `${Math.round(t / 1e3)}k` : n < 995e4 ? `${(t / 1e6).toFixed(1)}m` : `${Math.round(t / 1e6)}m`;
}
function De(e) {
  return Number.isFinite(e) ? Math.round(e).toLocaleString("en-US") : "—";
}
function _s(e) {
  const t = new Date(e);
  if (Number.isNaN(t.getTime())) return "—";
  const n = String(t.getUTCDate()).padStart(2, "0"), a = String(t.getUTCMonth() + 1).padStart(2, "0");
  return `${n}.${a}.${t.getUTCFullYear()}`;
}
function ws(e) {
  return String(e + 1);
}
function Yu(e, t) {
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
function ks(e) {
  if (e == null || !Number.isFinite(e) || e < 0) return "—";
  if (e < 1e3) return `${e} B`;
  const t = ["kB", "MB", "GB", "TB"];
  let n = e, a = -1;
  for (; n >= 1e3 && a < t.length - 1; )
    n /= 1e3, a += 1;
  return `${qt(n)} ${t[a]}`;
}
function bs(e) {
  if (!e || !Number.isFinite(e)) return "—";
  if (e < 1e3) return `${Math.round(e)}ms`;
  const t = e / 1e3;
  return t < 60 ? `${qt(t)}s` : `${Math.floor(t / 60)}m ${Math.round(t % 60)}s`;
}
function $s(e) {
  if (e == null || !Number.isFinite(e) || e <= 0)
    return "—";
  const t = Math.floor(e / 60);
  return t ? `${t}:${String(e % 60).padStart(2, "0")}` : `${e}s`;
}
function xs(e) {
  return e == null || !Number.isFinite(e) ? "—" : `${Math.round(e * 100)}%`;
}
function Ss(e) {
  return e.replace(/\x1b\[[0-9;?]*[ -/]*[@-~]/g, "");
}
const be = "—";
function pe(e, t) {
  return e.find((n) => n.role === t);
}
function da(e, t) {
  return e.filter((n) => n.role === t);
}
function Cs(e, t) {
  const n = (t ? t.columns : e?.columns) ?? [], a = t ? "scoped" : "everything";
  return n.filter(
    (s) => s.role !== "tint" && ((s.when ?? "always") === "always" || s.when === a)
  );
}
const Ps = ["id", "entityKey", "entityLabel"];
function ie(e, t) {
  if (e.value) return e.value(t);
  const n = e.field ?? e.key;
  if (n !== void 0) {
    if (t.fields && n in t.fields) return t.fields[n];
    if (Ps.includes(n))
      return t[n];
  }
}
function An(e, t) {
  const n = e.key ?? e.field ?? e.label;
  return n?.trim() ? n.trim() : `column-${t}`;
}
function Ms(e, t) {
  return e.id?.trim() ? e.id : `${e.entityKey || "row"}-${t}`;
}
function Es(e, t) {
  if (e == null || e === "") return be;
  if (t === "number") {
    const n = typeof e == "number" ? e : Number(e);
    return Number.isFinite(n) ? gs(n) : String(e);
  }
  return t === "date" ? _s(String(e)) : Array.isArray(e) ? e.length ? e.join(", ") : be : String(e);
}
function Me(e, t) {
  const n = ie(e, t);
  return e.format ? e.format(n, t) : Es(n, e.kind);
}
function Ls(e) {
  return typeof e == "number" ? Number.isFinite(e) ? String(e) : "" : typeof e == "string" ? e : Array.isArray(e) ? e.join(", ") : "";
}
function fa(e, t) {
  const n = Me(e, t), a = Ls(ie(e, t));
  return a && a !== n ? a : n;
}
function xt(e, t) {
  return e ? Me(e, t) : "";
}
function Nn(e) {
  return e.align ? e.align : e.kind === "number" || e.kind === "ordinal" ? "right" : "left";
}
const Ts = {
  ordinal: "dc-table__num",
  number: "dc-table__number",
  date: "dc-table__date",
  status: "dc-table__state"
};
function In(e) {
  return [Ts[e.kind ?? "text"], e.class].filter(Boolean).join(" ");
}
function ln(e) {
  if (e.truncate !== void 0) return e.truncate;
  const t = e.kind ?? "text";
  return t === "text" || t === "number" || t === "date";
}
const Os = /^([A-Za-z_][\w.-]*)\s*(>=|<=|:|=|>|<)\s*(.*)$/, Bn = "-?(?:\\d+\\.?\\d*|\\.\\d+)", As = new RegExp(`^(${Bn})?\\.\\.(${Bn})?$`);
function Vt(e) {
  const t = As.exec(e.trim());
  if (!t || t[1] === void 0 && t[2] === void 0) return null;
  const n = t[1] === void 0 ? null : Number(t[1]), a = t[2] === void 0 ? null : Number(t[2]);
  return n !== null && a !== null && n > a ? { min: a, max: n } : { min: n, max: a };
}
function Ns(e) {
  return `${e.min ?? ""}..${e.max ?? ""}`;
}
function je(e) {
  return e.kind === "field" && (e.comparator === ":" || e.comparator === "=") && Vt(e.value) !== null;
}
function Is(e) {
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
function ee(e) {
  const t = e.trim();
  if (!t) return [];
  const n = [];
  let a = [];
  for (const s of Is(t)) {
    const l = s.toUpperCase();
    if (l === "AND" || l === "&&") continue;
    if (l === "OR" || l === "||") {
      a.length && n.push(a), a = [];
      continue;
    }
    const o = s.length > 1 && s.startsWith("-"), r = o ? s.slice(1) : s, i = o ? { negated: !0 } : {}, c = Os.exec(r);
    c && c[3] !== "" ? a.push({
      kind: "field",
      field: c[1].toLowerCase(),
      comparator: c[2],
      value: c[3],
      ...i
    }) : a.push({ kind: "text", value: r, ...i });
  }
  return a.length && n.push(a), n;
}
const Ce = (e) => e.toLowerCase().replace(/\s+/g, ""), va = [
  ["status", "state"],
  ["state", "state"],
  ["updated", "updated"],
  ["date", "updated"],
  ["name", "identity"],
  ["ref", "reference"]
];
function Bs(e, t, n) {
  const a = Ce(e), s = n.columns ?? [];
  if (a === "entity") return t.entityKey;
  if (e in t.fields) return t.fields[e];
  const l = s.find(
    (c) => c.key?.toLowerCase() === e.toLowerCase() || c.field?.toLowerCase() === e.toLowerCase() || c.label !== void 0 && Ce(c.label) === a
  );
  if (l) return ie(l, t);
  const o = n.facets.find(
    (c) => c.key.toLowerCase() === a || Ce(c.label) === a
  );
  if (o && o.key in t.fields) return t.fields[o.key];
  const r = va.find(([c]) => c === a)?.[1];
  if (r) {
    const c = pe(s, r);
    if (c) return ie(c, t);
  }
  const i = /^metric(\d+)$/.exec(a);
  if (i) {
    const c = da(s, "metric")[Number(i[1]) - 1];
    if (c) return ie(c, t);
  }
}
function ht(e) {
  return (e.toLowerCase().match(/[\p{L}\p{N}]+/gu) ?? []).map((t) => t.charAt(0)).join("");
}
const Rn = /^[a-z_][\w.-]*$/;
function Ft(e) {
  const t = (e.key ?? e.field)?.toLowerCase();
  if (t !== void 0) return Rn.test(t) ? t : void 0;
  const n = e.label === void 0 ? void 0 : Ce(e.label);
  return n !== void 0 && Rn.test(n) ? n : void 0;
}
function yn(e, t) {
  const n = Ce(e);
  return !!t?.entities.some((a) => a.scope && Ce(a.scope) === n);
}
function Rs(e, t, n) {
  const a = Ce(e);
  if (a === "entity" || va.some(([l]) => l === a) || /^metric\d+$/.test(a) || yn(e, n)) return !0;
  const s = (l) => l !== void 0 && Ce(l) === a;
  return (t.columns ?? []).some(
    (l) => s(l.key) || s(l.field) || s(l.label)
  ) || t.facets.some((l) => s(l.key) || s(l.label));
}
function ot(e, t, n) {
  return t ? ha(e, (a) => {
    const s = ma(a, t, n);
    return s && Ft(s);
  }) : e;
}
function pa(e, t, n) {
  return t ? ha(e, (a) => {
    if (yn(a, n)) return;
    const s = (t.columns ?? []).find((l) => Ft(l) === a);
    return s && ya(s, t, n);
  }) : e;
}
function Hs(e, t, n) {
  if (!t || yn(e, n)) return;
  const a = t.facets.find((s) => s.key.toLowerCase() === e);
  return a ? a.label : (t.columns ?? []).find((s) => Ft(s) === e)?.label;
}
function ha(e, t) {
  let n = !1;
  const a = ee(e).map(
    (s) => s.map((l) => {
      if (l.kind !== "field") return l;
      const o = t(l.field);
      return !o || o === l.field ? l : (n = !0, { ...l, field: o });
    })
  );
  return n ? de(a) : e;
}
function ma(e, t, n) {
  if (!(!e || Rs(e, t, n)))
    return (t.columns ?? []).find(
      (a) => a.label !== void 0 && ht(a.label) === e
    );
}
function ya(e, t, n) {
  if (!t || e.label === void 0 || !Ft(e)) return;
  const a = ht(e.label);
  return ma(a, t, n) === e ? a : void 0;
}
function nn(e, t) {
  const n = e.toLowerCase(), a = t.toLowerCase();
  if (!a.includes("*")) return n.includes(a);
  const s = a.replace(/[.+?^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*");
  return new RegExp(s).test(n);
}
function Hn(e, t) {
  return e.toLowerCase() === t.toLowerCase();
}
function qs(e, t, n, a) {
  if (e.kind === "text") {
    const i = n.columns ?? [];
    return ["identity", "reference"].some((c) => {
      const u = pe(i, c), g = u ? ie(u, t) : void 0;
      return typeof g == "string" && nn(g, e.value);
    });
  }
  const s = Bs(e.field, t, n);
  if (s === void 0) return a?.has(e.field) ? !1 : null;
  const l = je(e) ? Vt(e.value) : null;
  if (l) {
    if (Array.isArray(s) || typeof s == "boolean") return null;
    const i = typeof s == "number" ? s : Number(s);
    return Number.isFinite(i) ? (l.min === null || i >= l.min) && (l.max === null || i <= l.max) : null;
  }
  if (Array.isArray(s))
    return e.comparator === ":" || e.comparator === "=" ? s.some(
      (c) => e.comparator === "=" ? Hn(String(c), e.value) : nn(String(c), e.value)
    ) : null;
  if (e.comparator === ":" || e.comparator === "=") {
    if (typeof s == "boolean") {
      const i = e.value.toLowerCase();
      return i === "true" || i === "yes" ? s : i === "false" || i === "no" ? !s : null;
    }
    if (typeof s == "number") {
      const i = Number(e.value);
      return Number.isFinite(i) ? s === i : null;
    }
    return e.comparator === "=" ? Hn(String(s), e.value) : nn(String(s), e.value);
  }
  const o = Number(e.value), r = typeof s == "number" ? s : Number(s);
  return !Number.isFinite(o) || !Number.isFinite(r) ? null : Vs(e.comparator, r, o);
}
function qn(e, t, n, a) {
  const s = qs(e, t, n, a);
  return s === null ? !0 : e.negated ? !s : s;
}
function Vs(e, t, n) {
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
function Vn(e) {
  return e.kind === "field" && !e.negated && (e.comparator === ":" || e.comparator === "=") && !je(e);
}
const Fn = /* @__PURE__ */ new WeakMap();
function Fs(e) {
  if (!e?.strictScopes) return null;
  let t = Fn.get(e);
  return t || (t = new Set(
    e.entities.flatMap((n) => n.scope ? [n.scope.toLowerCase()] : [])
  ), Fn.set(e, t)), t;
}
function Ds(e, t, n, a) {
  if (!e.length) return !0;
  const s = Fs(a);
  return e.some((l) => {
    const o = /* @__PURE__ */ new Map();
    for (const r of l)
      Vn(r) && o.set(
        r.field,
        (o.get(r.field) ?? !1) || qn(r, t, n, s)
      );
    return l.every(
      (r) => Vn(r) ? o.get(r.field) === !0 : qn(r, t, n, s)
    );
  });
}
function Dn(e) {
  return /[\s"']/.test(e) ? `"${e.replace(/["']/g, "")}"` : e;
}
function we(e) {
  const t = e.negated ? "-" : "";
  return e.kind === "text" ? t + Dn(e.value) : `${t}${e.field}${e.comparator}${Dn(e.value)}`;
}
function Ks(e) {
  if (!e.negated) return { ...e, negated: !0 };
  const { negated: t, ...n } = e;
  return n;
}
function de(e) {
  return e.filter((t) => t.length).map((t) => t.map(we).join(" ")).join(" OR ");
}
function Ws(e, t, n) {
  return e.map((a, s) => s === t ? a.filter((l, o) => o !== n) : a).filter((a) => a.length);
}
function Xu(e) {
  const t = ee(e);
  if (t.length > 1) return { parts: [], text: e.trim() };
  const n = t[0] ?? [];
  return {
    parts: n.filter((a) => a.kind === "field"),
    text: n.filter((a) => a.kind === "text").map(we).join(" ")
  };
}
function Ju(e, t) {
  return [...e.map(we), t.trim()].filter(Boolean).join(" ");
}
const Kn = (e, t) => e.toLowerCase() === t.toLowerCase();
function rt(e, t) {
  return !!e.negated == !!t.negated && ga(e, t);
}
function zs(e, t) {
  return !!e.negated != !!t.negated && ga(e, t);
}
function ga(e, t) {
  return e.kind === "field" ? t.kind === "field" && e.field === t.field && e.comparator === t.comparator && Kn(e.value, t.value) : t.kind === "text" && Kn(e.value, t.value);
}
function js(e, t) {
  return t.filter((n) => !e.some((a) => rt(a, n)));
}
function gn(e, t) {
  return _a(e, t, (n) => n);
}
function it(e, t) {
  return _a(
    e,
    t,
    (n, a) => n.filter((s) => !a.some((l) => zs(s, l)))
  );
}
const Us = /^[A-Za-z_][\w.-]*\s*(?:>=|<=|:|=|>|<)$/;
function Qs(e) {
  return de(
    ee(e).map(
      (t) => t.filter(
        (n) => n.kind !== "text" || n.value !== "-" && !Us.test(n.value)
      )
    ).filter((t) => t.length > 0)
  );
}
function _a(e, t, n) {
  const a = ee(e), s = ee(t);
  return a.length ? s.length ? de(
    a.flatMap(
      (l) => s.map((o) => [...n(l, o), ...js(l, o)])
    )
  ) : de(a) : de(s);
}
const on = "cards", Gs = "table";
function Ys(e, t = null) {
  if (e.trim() === "") return !1;
  if (!t) return !0;
  const n = new Set(
    t.entities.flatMap((a) => a.scope ? [a.scope.toLowerCase()] : [])
  );
  return !ee(e).flat().some((a) => a.kind === "field" && !a.negated && n.has(a.field.toLowerCase()) && a.value !== "");
}
function Ie(e, t = {}, n = "", a = null) {
  const s = (o) => o && wa(o) ? o : void 0;
  if (e === null) {
    const o = Ys(n, a) ? s(t.searchView) : void 0, r = n.trim() === "" ? s(t.homeView) : void 0;
    return o ?? r ?? s(t.view) ?? on;
  }
  const l = t.landing === "entity" ? s(t.view) : void 0;
  return s(t.entityView) ?? l ?? Gs;
}
function Xs(e, t, n, a = {}, s = "", l = s, o = null) {
  return a.viewAcrossTypes !== "default" && e !== Ie(t, a, s, o) ? e : Ie(n, a, l, o);
}
function Js(e, t, n = {}, a = null) {
  if (e.entity !== t.entity)
    return Xs(e.view, e.entity, t.entity, n, e.expr, t.expr, a);
  const s = Ie(e.entity, n, e.expr, a);
  return e.view === s ? Ie(t.entity, n, t.expr, a) : e.view;
}
const rn = "updated";
function wa(e) {
  return typeof e == "string" && (e === "record" || lt.includes(e) || Zs.test(e));
}
const Zs = /^[a-z][a-z0-9-]*$/;
function We(e) {
  return e === "record" || lt.includes(e);
}
const Wn = {
  list: "List",
  cards: "Cards",
  grid: "Grid",
  images: "Images",
  table: "Table",
  links: "Links",
  preview: "Preview",
  record: "Record"
}, zn = {
  list: "M6 4h7.5M6 8h7.5M6 12h7.5M2.5 4h.01M2.5 8h.01M2.5 12h.01",
  cards: "M2.5 2.5h11v4.5h-11zM2.5 9h11v4.5h-11z",
  grid: "M2.5 2.5h4.5v4.5h-4.5zM9 2.5h4.5v4.5H9zM2.5 9h4.5v4.5h-4.5zM9 9h4.5v4.5H9z",
  images: "M2.5 3h11v10h-11zM2.5 11l3.5-3.5 2.5 2.5 2-2 3 3M10.5 5.75h.01",
  table: "M2.5 3h11v10h-11zM2.5 6.5h11M2.5 9.75h11M6.5 6.5V13",
  links: "M6.75 9.25a2.5 2.5 0 0 0 3.54 0l2.12-2.12a2.5 2.5 0 0 0-3.54-3.54l-.7.7M9.25 6.75a2.5 2.5 0 0 0-3.54 0L3.59 8.87a2.5 2.5 0 0 0 3.54 3.54l.7-.7",
  preview: "M1.5 8S4 3.5 8 3.5 14.5 8 14.5 8 12 12.5 8 12.5 1.5 8 1.5 8zM6 8a2 2 0 1 0 4 0 2 2 0 1 0-4 0",
  record: "M4 2h5.5L12 4.5V14H4zM9.5 2v2.5H12M6 8h4M6 10.5h4"
};
function Ae(e, t) {
  if (e === "record" && !t?.includes(e)) return t?.[0] ?? on;
  const [n] = t ?? [];
  return n === void 0 ? We(e) ? e : on : t?.includes(e) ? e : n;
}
function ct(e) {
  return typeof e.count == "number" ? Ne(e.count) : e.count;
}
function ut(e, t) {
  return t ? e.entities.find((n) => n.key === t) ?? null : null;
}
function ka(e, t = {}) {
  const n = ut(e, t.entity), a = e.entities[0];
  if (!n && !a) throw new Error(`Schema "${e.key}" declares no entities`);
  return n ?? a;
}
function ba(e, t = null) {
  return e?.columns ?? t?.columns ?? [];
}
function Dt(e, t = null) {
  if (e?.sorts?.length) return e.sorts;
  const n = /* @__PURE__ */ new Set(), a = [];
  for (const s of ba(e, t))
    !s.sort || n.has(s.sort) || (n.add(s.sort), a.push({ key: s.sort, label: (s.label ?? s.sort).toLowerCase() }));
  return a;
}
const el = { key: rn, label: rn };
function Pe(e, t, n = null) {
  const a = Dt(e, n);
  return (t ? a.find((l) => l.key === t) : void 0) ?? a.find((l) => l.key === rn) ?? a[0] ?? el;
}
function tl(e) {
  switch (e.kind) {
    case "chips":
      return { kind: "chips", selected: [] };
    case "range":
      return { kind: "range", min: null, max: null };
    case "toggle":
      return { kind: "toggle", on: !1 };
  }
}
function nl(e) {
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
function _n(e) {
  return e.entity === null && e.expr.trim() === "";
}
function Zu(e) {
  return e.entity !== null;
}
function $a(e, t) {
  return e.entity === null && Ae(e.view, t) === "cards";
}
function al(e, t) {
  return t <= 0 ? 1 : Math.max(1, Math.ceil(e / t));
}
function Pt(e, t = {}) {
  const a = t.landing === "entity" ? ka(e, t) : null;
  return {
    entity: a?.key ?? null,
    view: Ie(a?.key ?? null, t),
    sort: Pe(a, t.sort).key,
    dir: t.dir === "asc" ? "asc" : "desc",
    expr: "",
    page: 1
  };
}
const wn = ["entity", "sort", "dir", "expr"];
function sl(e) {
  return wn.some((t) => t in e);
}
const xa = (e) => e.kind === "date" || e.role === "updated";
function ll(e) {
  if (!e) return () => 0;
  const n = (e.kind ?? "text") === "number" || e.role === "metric", a = xa(e);
  return (s, l) => {
    const o = ie(e, s), r = ie(e, l);
    return n ? Number(r ?? 0) - Number(o ?? 0) : a ? Date.parse(String(r ?? "")) - Date.parse(String(o ?? "")) : String(r ?? "").localeCompare(String(o ?? ""));
  };
}
function jn(e, t) {
  return !t || !xa(t) ? !1 : !Number.isFinite(Date.parse(String(ie(t, e) ?? "")));
}
function Sa({ query: e, schema: t, entity: n, limit: a, offset: s }, l, o) {
  const r = ee(e.expr), i = n ? [n] : t.entities;
  let c = 0;
  const u = [];
  for (const S of i)
    for (const C of l(S))
      c += 1, Ds(r, C, S, t) && u.push(C);
  const g = Pe(n, e.sort, t), _ = ba(n, t).find((S) => S.sort === g.key), m = o.undatedLast ? u.filter((S) => !jn(S, _)) : u, h = o.undatedLast ? u.filter((S) => jn(S, _)) : [];
  m.sort(ll(_)), e.dir === "asc" && m.reverse();
  const v = h.length ? [...m, ...h] : m;
  return {
    // One page out of the middle. `total` stays the whole match, which is what
    // the shell counts pages with.
    rows: o.zeroIsAll && a <= 0 ? v.slice(s) : v.slice(s, s + a),
    total: u.length,
    unfiltered: u.length === c
  };
}
const Mt = [
  "oklch(0.36 0.06 240)",
  "oklch(0.34 0.07 290)",
  "oklch(0.36 0.06 160)",
  "oklch(0.38 0.06 80)",
  "oklch(0.35 0.07 30)",
  "oklch(0.34 0.05 200)"
];
function ed(e) {
  return Mt[at(e) % Mt.length];
}
function Ca(e, t) {
  return `${e}_${1e4 + t * 7}`;
}
const ol = 7, rl = 3;
function il(e, t, n, a) {
  const s = (t * ol + at(n)) % a, l = [];
  for (let o = 0; o < Math.min(rl, a); o++)
    l.push(Ca(e, (s + o) % a));
  return l;
}
function cl(e, t) {
  switch (e.kind) {
    case "chips":
      return e.multiple ? ul(e.options, t) : e.options[t % e.options.length] ?? "";
    case "range": {
      const n = Math.max(0, e.max - e.min);
      return e.min + (n === 0 ? 0 : t % (n + 1));
    }
    case "toggle":
      return t % 3 === 0;
  }
}
function ul(e, t) {
  if (!e.length) return [];
  const n = 1 + (t >> 5) % Math.min(3, e.length), a = t % e.length, s = /* @__PURE__ */ new Set();
  for (let l = 0; l < n; l++) s.add((a + l) % e.length);
  return [...s].sort((l, o) => l - o).map((l) => e[l]);
}
function dl(e, t) {
  const { hash: n, sample: a, revision: s, updatedAt: l } = t, o = s ? ` · rev ${s + 1}` : "";
  switch (e.role) {
    case "identity":
      return `${a[0]}${o}`;
    case "reference":
      return s ? `${a[1]}-${s + 1}` : a[1];
    case "state":
      return nt[n % nt.length];
    case "updated":
      return l;
    case "tint":
      return Mt[n % Mt.length];
    case "metric":
      return 1 + n % 940;
  }
  switch (e.kind) {
    case "number":
      return 1 + n % 940;
    case "status":
      return nt[n % nt.length];
    case "date":
      return l;
    default:
      return;
  }
}
function fl(e, t = {}) {
  const n = t.population ?? 48, a = t.seed ?? "", s = t.now ?? /* @__PURE__ */ new Date("2026-08-25T00:00:00Z"), l = e.samples, o = t.scopes ?? [];
  if (!l.length) return [];
  const r = [];
  for (let i = 0; i < n; i++) {
    const c = l[i % l.length], u = Math.floor(i / l.length), g = at(`${a}:${e.key}:${c[0]}:${i}`), _ = Ca(e.key, i), m = new Date(s.getTime() - g % 900 * 36e5).toISOString(), h = {};
    for (const v of e.columns ?? []) {
      const S = v.field ?? v.key;
      if (!S || v.value) continue;
      const C = dl(v, {
        hash: at(`${g}:${S}`),
        sample: c,
        revision: u,
        updatedAt: m
      });
      C !== void 0 && (h[S] = C);
    }
    for (const v of e.facets)
      h[v.key] = cl(v, at(`${g}:${v.key}`));
    for (const [v, S] of o)
      h[v] = S === e.key ? _ : il(S, i, v, n);
    r.push({ id: _, entityKey: e.key, entityLabel: e.label, fields: h });
  }
  return r;
}
function vl(e = {}) {
  const t = /* @__PURE__ */ new Map(), n = (a, s) => {
    const l = t.get(a.key);
    if (l) return l;
    const o = e.scopes ?? s.entities.flatMap(
      (i) => i.scope ? [[i.scope, i.key]] : []
    ), r = fl(a, { ...e, scopes: o });
    return t.set(a.key, r), r;
  };
  return {
    query(a) {
      return Sa(a, (s) => n(s, a.schema), {
        undatedLast: !1,
        zeroIsAll: !1
      });
    }
  };
}
const Ye = "e", Kt = "v", kn = "s", bn = "d", Be = "q", Wt = "p", Pa = "*", pl = [
  Ye,
  Kt,
  kn,
  bn,
  Be,
  Wt
], hl = [
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
function Et(e) {
  let t = encodeURIComponent(e);
  for (const [n, a] of hl) t = t.replace(n, a);
  return t;
}
function _e(e) {
  try {
    return decodeURIComponent(e.replace(/\+/g, " "));
  } catch {
    return e.replace(/\+/g, " ");
  }
}
function $n(e) {
  const t = e.replace(/^[?]/, "");
  if (!t) return [];
  const n = [];
  for (const a of t.split("&")) {
    if (!a) continue;
    const s = a.indexOf("="), l = s === -1 ? a : a.slice(0, s), o = s === -1 ? "" : a.slice(s + 1);
    n.push([_e(l), o]);
  }
  return n;
}
function ml(e) {
  return pl.includes(e);
}
function zt(e, t) {
  if (!(!t || e.some((n) => n.key === t)))
    return e.find((n) => ht(n.label) === t);
}
function yl(e, t) {
  const n = ht(e.label);
  return zt(t.entities, n)?.key === e.key ? n : e.key;
}
function Ma(e, t) {
  return t ? ut(e, t) ?? zt(e.entities, t) ?? null : null;
}
function gl(e, t) {
  const n = ht(e.label);
  return zt(t, n)?.key === e.key ? n : e.key;
}
function _l(e, t) {
  return t.some((n) => n.key === e) ? e : zt(t, e)?.key ?? e;
}
function wl(e, t, n = {}) {
  const a = Pt(t, n), s = new Map($n(e)), l = s.get(Ye), o = l === void 0 ? a.entity : _e(l), r = o === Pa ? null : Ma(t, o), i = s.get(Be), c = i === void 0 ? "" : ot(_e(i), r, t), u = s.get(Kt), g = u && wa(_e(u)) ? _e(u) : Ie(r?.key ?? null, n, c, t), _ = s.get(kn), m = Pe(
    r,
    _ ? _l(_e(_), Dt(r, t)) : n.sort,
    t
  ), h = s.get(bn), v = h ? _e(h) === "asc" ? "asc" : "desc" : a.dir, S = s.get(Wt), C = S === void 0 ? 1 : Number(_e(S)), A = Number.isFinite(C) ? Math.max(1, Math.floor(C)) : 1;
  return {
    entity: r?.key ?? null,
    view: g,
    sort: m.key,
    dir: v,
    expr: c,
    page: A
  };
}
function Un(e, t, n = {}, a = "") {
  const s = Pt(t, n), l = ut(t, e.entity), o = $n(a).filter(([g]) => !ml(g)), r = [], i = (g, _) => r.push([g, Et(_)]), c = l?.key ?? null;
  if (c !== s.entity && i(Ye, l ? yl(l, t) : Pa), e.view !== Ie(c, n, e.expr, t) && i(Kt, e.view), e.sort !== s.sort) {
    const g = Dt(l, t), _ = g.find((m) => m.key === e.sort);
    i(kn, _ ? gl(_, g) : e.sort);
  }
  e.dir !== s.dir && i(bn, e.dir), e.expr.trim() !== "" && i(Be, pa(e.expr, l, t)), e.page > 1 && i(Wt, String(e.page));
  const u = [
    ...o.map(([g, _]) => [Et(g), _]),
    ...r
  ];
  return u.length ? `?${u.map(([g, _]) => _ === "" ? g : `${g}=${_}`).join("&")}` : "";
}
function td(e) {
  const t = [];
  for (const [n, a] of Object.entries(e))
    for (const s of Array.isArray(a) ? a : [a]) {
      if (typeof s != "string") continue;
      const l = Et(n);
      t.push(s === "" ? l : `${l}=${Et(s)}`);
    }
  return t.length ? `?${t.join("&")}` : "";
}
function nd(e, t) {
  const n = new Map($n(e)), a = n.get(Be), s = a === void 0 ? "" : _e(a);
  if (!t) return s;
  const l = n.get(Ye);
  return ot(
    s,
    l === void 0 ? null : Ma(t, _e(l)),
    t
  );
}
function jt(e, t) {
  return La(e, t.id);
}
function Ea(e, t) {
  return e?.standing === !1 ? null : jt(e, t);
}
function La(e, t) {
  const n = e?.scope;
  return n ? Ta(n, t) : null;
}
function Ta(e, t) {
  return `${e}="${t.replace(/"/g, "")}"`;
}
function ad(e, t) {
  const n = typeof e == "string" ? e : e?.scope;
  if (!n) return null;
  const a = t.filter((s) => s.replace(/"/g, "") !== "").map((s) => Ta(n, s));
  return a.length ? a.join(" ") : null;
}
function Ut(e, t) {
  if (e.kind !== "field" || t.kind !== "field") return rt(e, t);
  const n = (a) => a.comparator === ":" || a.comparator === "=";
  return rt(e, { ...t, comparator: n(e) && n(t) ? e.comparator : t.comparator });
}
function Lt(e, t) {
  return Ut(e, Ks(t));
}
function Tt(e, t) {
  return jt(
    e.entities.find((n) => n.key === t.entityKey),
    t
  );
}
function Ue(e, t) {
  if (!t) return e;
  const n = e.trim();
  if (!n) return t;
  const [a] = ee(t).flat();
  if (!a) return n;
  const s = ee(n);
  return s.some((r) => r.some((i) => Ut(i, a))) ? n : s.some((r) => r.some((i) => Lt(i, a))) ? de(
    s.map(
      (r) => r.map((i) => Lt(i, a) ? a : i)
    )
  ) : `${n} ${t}`;
}
function Oa(e) {
  if (!e) return null;
  const t = e.trim();
  return t ? t.startsWith("-") ? t.slice(1) : `-${t}` : null;
}
function Aa(e, t) {
  if (!t || !e.trim()) return null;
  const [n] = ee(t).flat();
  if (!n) return null;
  const a = ee(e).flat();
  return a.some((s) => Ut(s, n)) ? n.negated ? "out" : "in" : a.some((s) => Lt(s, n)) ? n.negated ? "in" : "out" : null;
}
function xn(e, t) {
  if (!t || !e.trim()) return e;
  const [n] = ee(t).flat();
  if (!n) return e;
  const a = ee(e), s = a.map(
    (l) => l.filter((o) => !Ut(o, n) && !Lt(o, n))
  );
  return s.every((l, o) => l.length === a[o]?.length) ? e : de(s);
}
function kl(e, t, n) {
  return t ? n === null ? xn(e, t) : Ue(e, n === "out" ? Oa(t) : t) : e;
}
function bl(e, t, n) {
  const a = t.filter(Boolean), s = () => a.reduce((i, c) => kl(i, c, n), e);
  if (n !== "in") return s();
  const l = /* @__PURE__ */ new Map();
  for (const i of a) {
    const [c] = ee(i).flat();
    if (!c) continue;
    const u = c.kind === "field" ? c.field : "";
    l.set(u, [...l.get(u) ?? [], c]);
  }
  if (l.size <= 1) return s();
  const o = a.reduce((i, c) => xn(i, c), e), r = o.trim() ? ee(o) : [[]];
  return de(r.flatMap((i) => [...l.values()].map((c) => [...i, ...c])));
}
function cn(e, t) {
  const n = t.shiftKey ? `noopener,popup,width=${window.outerWidth},height=${window.outerHeight}` : "noopener";
  window.open(e, "_blank", n);
}
function Na() {
  const e = window.getSelection?.();
  return !!e && !e.isCollapsed;
}
function un(e) {
  return e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0;
}
function dt(e) {
  return e.altKey ? { exclude: !0 } : {};
}
function an(e, t, n, a = {}, s) {
  const l = Tt(e, n);
  if (a.exclude) return Qn(Ue(t.expr, Oa(l)), s);
  const o = l !== null && e.entities.find((r) => r.key === n.entityKey)?.narrowsAlone === !0;
  return Qn(Ue(o ? "" : t.expr, l), s);
}
function Qn(e, t) {
  const n = t?.trim() ? ee(t).flat() : [];
  if (!n.length) return e;
  const a = new Set(n.flatMap((r) => r.kind === "field" ? [r.field] : [])), s = (r) => r.kind === "field" && !r.negated && (r.comparator === ":" || r.comparator === "=") && a.has(r.field), l = e.trim(), o = l ? ee(l) : [[]];
  if (o.length === 1 && !o[0].some(s)) {
    const r = n.filter((i) => !o[0].some((c) => rt(c, i)));
    return [l, ...r.map(we)].filter(Boolean).join(" ");
  }
  return de(
    o.map((r) => {
      const i = r.filter((c) => !s(c));
      return [...i, ...n.filter((c) => !i.some((u) => rt(u, c)))];
    })
  );
}
function Ia(e, t) {
  const n = e?.scope?.toLowerCase();
  if (!n || e?.keepsScope || !t.trim()) return t;
  const a = ee(t), s = a.map(
    (l) => l.filter((o) => o.kind !== "field" || o.field !== n)
  );
  return s.every((l, o) => l.length === a[o]?.length) ? t : de(s);
}
function Ba(e, t) {
  const n = t.toLowerCase();
  return e.entities.find((a) => a.scope?.toLowerCase() === n) ?? null;
}
function Ra(e, t, n) {
  if (!t || !n) return null;
  const a = Ba(e, t);
  return a ? { entity: a, id: n } : null;
}
function $l(e, t) {
  const n = [], a = /* @__PURE__ */ new Set();
  for (const s of t)
    for (const l of ee(s).flat()) {
      if (l.kind !== "field" || l.negated) continue;
      const o = Ra(e, l.field, l.value);
      if (!o) continue;
      const r = `${o.entity.key}:${o.id.toLowerCase()}`;
      a.has(r) || (a.add(r), n.push({ entityKey: o.entity.key, id: o.id }));
    }
  return n;
}
function sd(e, t, n = "cards") {
  return {
    // An expression with nothing in it is no parameter, as the shell writes it.
    [Be]: Ue(e, t) || void 0,
    [Ye]: void 0,
    [Kt]: n,
    [Wt]: void 0
  };
}
const Ha = Symbol("dc.shellContext");
function xl(e) {
  const t = e.liveQuery ? e : Sl(e);
  return mn(Ha, t), t;
}
function Sl(e) {
  const t = e.draft ?? q("");
  return {
    draft: t,
    liveQuery: e.query,
    drafting: f(() => !1),
    commitDraft() {
      const n = t.value.trim();
      n && (e.setExpression(
        it(e.query.value.expr, ot(n, e.entity.value, e.schema.value))
      ), t.value = "");
    },
    abandonDraft() {
      t.value = "";
    },
    ...e
  };
}
function te() {
  const e = hn(Ha, null);
  if (!e)
    throw new Error(
      "[appfr] No shell context found. Render this component inside <DataShell>."
    );
  return e;
}
const Ot = Symbol("dc-shell-theme");
function dn(e) {
  return {
    read: () => ({
      theme: Le(e.theme),
      accent: Le(e.accent),
      tokens: Le(e.tokens)
    })
  };
}
function Cl(e, t) {
  t ? t.provide(Ot, dn(e)) : mn(Ot, dn(e));
}
function Pl(e) {
  const t = oa();
  mn(Ot, {
    ...dn(e),
    element: () => t?.proxy?.$el ?? null
  });
}
function Sn(e) {
  const t = oa(), n = hn(Ot, null), a = he(null);
  function s() {
    const i = t?.proxy?.$el, u = (i instanceof Element ? i : i?.parentElement)?.closest(".dc-shell");
    if (!u) {
      a.value = null;
      return;
    }
    const g = {};
    for (const _ of Array.from(u.style))
      _.startsWith("--") && (g[_] = u.style.getPropertyValue(_));
    a.value = { shell: u, theme: u.dataset.dcTheme, tokens: g };
  }
  const l = f(() => {
    const i = a.value;
    if (!n) return i;
    const c = n.element?.();
    return i && c && i.shell !== c && c.contains(i.shell) ? i : n.read();
  }), o = f(() => e.theme ?? l.value?.theme ?? "minimal"), r = f(() => {
    const i = l.value, c = {
      ...i?.tokens,
      ...i?.accent ? { "--dc-accent": i.accent } : {},
      ...e.tokens,
      ...e.accent ? { "--dc-accent": e.accent } : {}
    };
    return Object.keys(c).length ? c : void 0;
  });
  return { theme: o, style: r, adopt: s };
}
function ft(e) {
  return e.key.toLowerCase();
}
const Ml = /* @__PURE__ */ new Set([">", ">=", "<", "<="]);
function qa(e, t) {
  if (e.kind !== "field" || e.negated || e.field !== ft(t)) return !1;
  const n = e.comparator === ":" || e.comparator === "=";
  switch (t.kind) {
    case "range":
      return je(e) || Ml.has(e.comparator);
    case "chips":
      return n && !je(e) && Va(t.options, e.value) !== void 0;
    case "toggle":
      return n && El(e.value);
  }
}
function Va(e, t) {
  const n = t.toLowerCase();
  return e.find((a) => a.toLowerCase() === n);
}
function El(e) {
  const t = e.toLowerCase();
  return t === "true" || t === "yes";
}
function Fa(e, t) {
  const n = (ee(e)[0] ?? []).filter((a) => qa(a, t));
  switch (t.kind) {
    case "range": {
      let a = null, s = null;
      for (const l of n) {
        const o = Vt(l.value), r = Number(l.value);
        o ? (o.min !== null && (a = o.min), o.max !== null && (s = o.max)) : Number.isFinite(r) && (l.comparator.startsWith(">") ? a = r : s = r);
      }
      return { kind: "range", min: a, max: s };
    }
    case "chips": {
      const a = new Set(n.map((s) => Va(t.options, s.value)));
      return { kind: "chips", selected: t.options.filter((s) => a.has(s)) };
    }
    case "toggle":
      return { kind: "toggle", on: n.length > 0 };
  }
}
function Ll(e, t) {
  const n = ft(e);
  switch (t.kind) {
    case "range":
      return t.min === null && t.max === null ? [] : [{ kind: "field", field: n, comparator: ":", value: Ns(t) }];
    case "chips":
      return t.selected.map((a) => ({ kind: "field", field: n, comparator: "=", value: a }));
    case "toggle":
      return t.on ? [{ kind: "field", field: n, comparator: ":", value: "true" }] : [];
  }
}
function Da(e, t, n) {
  const a = Ll(t, n), s = ee(e), l = (s.length ? s : [[]]).map((o) => [
    ...o.filter((r) => !qa(r, t)),
    ...a
  ]);
  return de(l);
}
function ld(e, t) {
  return Da(e, t, tl(t));
}
function Tl(e, t) {
  return (t?.facets ?? []).some((n) => nl(Fa(e, n)));
}
const ze = "entity", vt = "expr", Ol = { ">=": "≥", "<=": "≤", ">": ">", "<": "<" };
function et(e) {
  const t = Number(e);
  return Number.isFinite(t) && !Number.isInteger(t) ? qt(t) : String(e);
}
function Al(e, t, n) {
  if (e.kind !== "field") return we(e);
  const a = Hs(e.field, t, n);
  if (a === void 0) return we(e);
  const s = e.negated ? "-" : "", l = je(e) ? Vt(e.value) : null;
  if (l) {
    const r = l.min !== null && l.max !== null ? `${et(l.min)} ≤ ${a} ≤ ${et(l.max)}` : l.max !== null ? `${a} ≤ ${et(l.max)}` : `${a} ≥ ${et(l.min)}`;
    return s + r;
  }
  const o = Ol[e.comparator];
  return o ? `${s}${a} ${o} ${et(e.value)}` : we({ ...e, field: a });
}
function At(e, t, n = null) {
  const a = [];
  return t && a.push({
    id: ze,
    label: `entity:${t.key}`,
    facetKey: ze
  }), ee(e.expr).forEach((s, l) => {
    s.forEach((o, r) => {
      a.push({
        id: `${vt}:${l}:${r}`,
        label: Al(o, t, n),
        address: pa(we(o), t, n),
        facetKey: vt,
        group: l,
        index: r,
        ...o.kind === "field" ? { field: o.field, value: o.value } : {},
        ...o.negated ? { negated: !0 } : {}
      });
    });
  }), a;
}
function Nl(e, t, n = null) {
  if (_n(e)) {
    const l = Pe(t, e.sort, n);
    return `everything · ${e.view} · ${l.label}`;
  }
  const a = At(e, t).filter((l) => l.facetKey !== vt).map((l) => l.label), s = e.expr.trim();
  return s && a.push(`"${s}"`), a.join(" · ");
}
function Il(e) {
  const { adapter: t } = e, n = f(() => Le(e.schema)), a = f(() => Le(e.defaults) ?? {}), s = f(() => wl(t.search.value, n.value, a.value)), l = f(() => ut(n.value, s.value.entity)), o = f(() => l.value ?? ka(n.value, a.value)), r = f(() => Dt(l.value, n.value)), i = f(() => Pe(l.value, s.value.sort, n.value)), c = (y, w) => {
    const M = Un(y, n.value, a.value, t.search.value);
    return M === t.search.value && !t.elsewhere?.value ? !1 : (w === "push" ? t.push(M) : t.replace(M), !0);
  }, u = () => Le(e.navigationMode) ?? "push", g = () => Le(e.facetNavigationMode) ?? "replace", _ = (y, w) => c(m(y), w), m = (y) => {
    const w = y.page ?? (sl(y) ? 1 : s.value.page), M = { ...s.value, ...y, page: w };
    return y.view === void 0 && (M.view = Js(s.value, M, a.value, n.value)), M;
  }, h = (y) => v(m(y)), v = (y) => {
    const w = Un(y, n.value, a.value, t.search.value);
    return t.href ? t.href(w) : `${t.path.value}${w}`;
  }, S = (y, w) => {
    const M = l.value?.facets.find((I) => I.key === y);
    if (!M) return;
    const E = Da(s.value.expr, M, w(Fa(s.value.expr, M)));
    _({ expr: E }, g());
  }, C = (y) => {
    const w = y === null ? null : ut(n.value, y);
    return (w?.key ?? null) === s.value.entity ? {} : {
      entity: w?.key ?? null,
      sort: Pe(w, s.value.sort, n.value).key
    };
  }, A = (y) => {
    const w = C(y);
    Object.keys(w).length && _(w, u());
  };
  return {
    query: s,
    entity: l,
    focus: o,
    sort: i,
    sorts: r,
    summary: f(() => Nl(s.value, l.value, n.value)),
    terms: f(() => At(s.value, l.value, n.value)),
    isPristine: f(() => _n(s.value)),
    isEverything: f(() => s.value.entity === null),
    hasFacets: f(() => Tl(s.value.expr, l.value)),
    setEntity: A,
    entityHref: (y) => h(C(y)),
    clearEntity: () => A(null),
    setView(y, w) {
      _(w === void 0 ? { view: y } : { view: y, page: Math.max(1, Math.floor(w)) }, u());
    },
    setSort(y) {
      _({ sort: Pe(l.value, y, n.value).key }, u());
    },
    toggleDirection() {
      _({ dir: s.value.dir === "desc" ? "asc" : "desc" }, u());
    },
    setExpression(y) {
      return _({ expr: y }, u());
    },
    narrow(y, w, M) {
      return _({ expr: y, ...C(w), ...M ? { view: M } : {} }, u());
    },
    narrowHref(y, w, M) {
      return h({ expr: y, ...C(w), ...M ? { view: M } : {} });
    },
    setPage(y, w) {
      _({ page: Math.max(1, Math.floor(y)) }, w ?? u());
    },
    setFacet(y, w) {
      S(y, () => w);
    },
    toggleChip(y, w) {
      S(y, (M) => M.kind !== "chips" ? M : { kind: "chips", selected: M.selected.includes(w) ? M.selected.filter((I) => I !== w) : [...M.selected, w] });
    },
    setRange(y, w, M) {
      S(y, (E) => E.kind === "range" ? { kind: "range", min: w, max: M } : E);
    },
    toggleFlag(y) {
      S(
        y,
        (w) => w.kind === "toggle" ? { kind: "toggle", on: !w.on } : w
      );
    },
    removeTerm(y) {
      if (y.facetKey === ze) {
        A(null);
        return;
      }
      if (y.facetKey === vt) {
        const w = Ws(ee(s.value.expr), y.group ?? 0, y.index ?? 0);
        _({ expr: de(w) }, u());
      }
    },
    clearFilters() {
      _({ ...C(null), expr: "" }, u());
    },
    clearHref: () => h({ ...C(null), expr: "" }),
    reset() {
      c(Pt(n.value, a.value), u());
    },
    homeHref: () => v(Pt(n.value, a.value)),
    // The same rule the mutations follow, so a link built for a change goes
    // exactly where clicking through to that change would have gone.
    hrefFor: (y) => h(y)
  };
}
const Gn = 50;
function Bl(e) {
  const t = he([]), n = q(0), a = q(0), s = q(!1), l = q(!1), o = he(null);
  let r = 0, i = null, c = null;
  const u = f(() => (e.query.value.page - 1) * e.limit.value), g = f(() => al(n.value, e.limit.value)), _ = f(() => Math.max(0, n.value - a.value)), m = () => {
    const $ = e.query.value, B = e.within?.value.trim(), T = Ia(e.entity.value, $.expr);
    return B ? { ...$, expr: gn(B, T) } : T === $.expr ? $ : { ...$, expr: T };
  }, h = ($, B) => {
    t.value = $.rows, n.value = $.total, a.value = $.kept ?? 0, o.value = null, v(B);
  }, v = ($) => {
    i = { key: $, total: n.value }, l.value = !1;
  }, S = ($) => {
    o.value = $, t.value = [], n.value = 0, a.value = 0, i = null, l.value = !1;
  }, C = ($, B, T, K) => {
    let V = !0;
    const J = () => $ === r;
    let re = 0, me = !1;
    const ye = (le) => {
      re = le, me = !0, K === void 0 && (n.value = le);
    }, qe = () => {
      V && (V = !1, t.value = [], a.value = 0, ye(0)), o.value = null;
    };
    return {
      get open() {
        return J();
      },
      insert(le, Xe) {
        if (!J()) return;
        const ge = Array.isArray(le) ? le : [le];
        if (!ge.length) return;
        qe();
        const fe = [...t.value];
        fe.splice(Xe ?? fe.length, 0, ...ge), t.value = B > 0 ? fe.slice(0, B) : fe, ye(re + ge.length);
      },
      set(le) {
        J() && (le.rows && (qe(), t.value = B > 0 ? le.rows.slice(0, B) : le.rows, ye(le.rows.length)), le.total !== void 0 && ye(le.total));
      },
      close() {
        J() && (s.value = !1, me && (n.value = re), v(T));
      },
      fail(le) {
        J() && (S(le), s.value = !1);
      }
    };
  }, A = () => {
    const $ = c;
    c = null, $?.();
  }, y = () => {
    const $ = ++r;
    A();
    const B = w.value, T = i?.key === B ? i.total : void 0;
    l.value = T === void 0;
    const K = {
      query: m(),
      schema: e.schema.value,
      entity: e.entity.value,
      limit: e.limit.value,
      offset: u.value
    }, V = e.source.value;
    if (V.stream) {
      s.value = !0;
      try {
        c = V.stream(K, C($, K.limit, B, T)) ?? null;
      } catch (re) {
        S(re), s.value = !1;
      }
      return;
    }
    let J;
    try {
      J = V.query(K);
    } catch (re) {
      S(re);
      return;
    }
    if (!(J instanceof Promise)) {
      h(J, B), s.value = !1;
      return;
    }
    s.value = !0, J.then((re) => {
      $ === r && h(re, B);
    }).catch((re) => {
      $ === r && S(re);
    }).finally(() => {
      $ === r && (s.value = !1);
    });
  }, w = f(() => {
    const $ = m();
    return `${e.entity.value?.key ?? e.schema.value.entities[0]?.key ?? ""}|${JSON.stringify(wn.map((T) => $[T]))}`;
  }), M = f(() => `${w.value}|${e.query.value.page}`);
  return ne([e.source, M, e.limit], y, {
    immediate: !0
  }), It(() => {
    r++, A();
  }, !0), { rows: t, total: n, matched: _, offset: u, pageCount: g, pending: s, counting: l, error: o, refresh: y, locate: async ($, B) => {
    const T = Math.max(0, B - 1 - Gn);
    try {
      const { rows: K } = await e.source.value.query({
        query: m(),
        schema: e.schema.value,
        entity: e.entity.value,
        limit: Gn * 2 + 1,
        offset: T
      }), V = K.findIndex((J) => J.id === $);
      return V === -1 ? null : T + V + 1;
    } catch {
      return null;
    }
  }, peek: async ($, B) => {
    if (B <= 0) return [];
    try {
      const { rows: T } = await e.source.value.query({
        query: m(),
        schema: e.schema.value,
        entity: e.entity.value,
        limit: B,
        offset: Math.max(0, $)
      });
      return T;
    } catch {
      return [];
    }
  } };
}
function Rl(e) {
  const t = he(null);
  let n = 0;
  const a = () => {
    const r = e.rows.value[0];
    t.value = r && !e.pending.value ? { id: r.id, page: e.page.value, list: e.list.value, gone: !1 } : null;
  }, s = () => {
    const r = t.value;
    if (!e.active.value) {
      t.value = null;
      return;
    }
    if (!r || r.page !== e.page.value || r.list !== e.list.value) {
      a();
      return;
    }
    if (e.pending.value) return;
    const i = e.rows.value[0];
    if (i?.id === r.id) {
      r.gone && (t.value = { ...r, gone: !1, next: void 0 });
      return;
    }
    (!r.gone || i?.id !== r.next) && l(r);
  }, l = async (r) => {
    const i = ++n, c = await e.locate(r.id, r.page), u = c === null && r.next ? await e.locate(r.next, r.page) : null;
    if (i !== n || t.value?.id !== r.id || t.value.page !== r.page) return;
    const g = e.rows.value[0]?.id;
    c !== null ? o(c, !1) : u === null ? t.value = { ...r, gone: !0, next: g } : u !== r.page && o(u);
  }, o = (r, i = t.value?.gone ?? !1) => {
    t.value && (t.value = { ...t.value, page: r, gone: i }, e.moveTo(r));
  };
  return ne([e.active, e.rows, e.pending, e.page, e.list], s, {
    immediate: !0,
    flush: "post"
  }), {
    id: f(() => t.value?.id ?? null),
    gone: f(() => t.value?.gone === !0),
    holding: f(() => t.value !== null),
    step(r) {
      const i = t.value;
      return !i?.gone || r < i.page ? r : r - 1 > i.page ? r - 1 : (a(), null);
    },
    moveTo: o
  };
}
const Hl = 150;
function ql(e) {
  const t = e.delay ?? Hl, n = q(""), a = q("");
  let s = !1, l;
  const o = () => {
    clearTimeout(l), l = void 0;
  }, r = f(() => ot(Qs(a.value), e.entity.value, e.schema?.value)), i = f(() => r.value.trim() !== ""), c = f(
    () => JSON.stringify([r.value, ...wn.map((m) => e.query.value[m])])
  ), u = he(null), g = f(() => {
    const m = e.query.value;
    if (!i.value) return m;
    const h = u.value?.of === c.value ? u.value.page : 1;
    return { ...m, expr: it(m.expr, r.value), page: h };
  });
  ne(n, (m) => {
    if (o(), !m.trim()) {
      s || (a.value = "");
      return;
    }
    s = !1, l = setTimeout(() => {
      l = void 0, a.value = n.value;
    }, t);
  }), ne(
    e.query,
    () => {
      s && (s = !1, a.value = "");
    },
    { flush: "sync" }
  );
  const _ = (m) => {
    o(), s = !0, n.value = "", !m() && s && (s = !1, a.value = "");
  };
  return ra() && It(o), {
    text: n,
    live: g,
    drafting: i,
    setPage(m) {
      u.value = { of: c.value, page: Math.max(1, Math.floor(m)) };
    },
    commit() {
      const m = n.value.trim();
      if (!m) return;
      const h = it(
        e.query.value.expr,
        ot(m, e.entity.value, e.schema?.value)
      );
      a.value = m, _(() => e.setExpression(h));
    },
    abandon() {
      o(), s = !1, n.value = "", a.value = "";
    },
    release: _
  };
}
const Vl = 25, Ka = (e, t) => e.toLowerCase() === t.toLowerCase();
function Fl(e, t) {
  return e.find((n) => Ka(n.id, t));
}
function Dl(e) {
  const t = he(/* @__PURE__ */ new Map()), n = /* @__PURE__ */ new Set(), a = (r) => {
    if (r.facetKey !== vt) return null;
    const i = Ra(e.schema.value, r.field, r.value);
    return i ? { ...i, key: `${i.entity.key}:${i.id}` } : null;
  }, s = (r) => {
    const { entity: i, id: c } = r, u = e.query.value;
    return e.source.value.query({
      query: {
        ...u,
        entity: i.key,
        // The reference on its own. The rest of the query is about the rows on
        // screen, which are of another type entirely.
        expr: La(i, c) ?? "",
        sort: Pe(i, u.sort, e.schema.value).key,
        page: 1
      },
      schema: e.schema.value,
      entity: i,
      limit: Vl,
      offset: 0
    });
  }, l = (r, i) => {
    const c = xt(pe(r.columns ?? [], "identity"), i);
    return c === be || Ka(c, i.id) ? "" : c;
  }, o = () => {
    if (e.loading.value) return;
    const r = /* @__PURE__ */ new Map();
    for (const u of e.terms.value) {
      const g = a(u);
      g && !t.value.has(g.key) && !n.has(g.key) && r.set(g.key, g);
    }
    if (!r.size) return;
    const i = [...r.values()].map((u) => ({
      reference: u,
      outcome: s(u)
    })), c = (u) => {
      const g = new Map(t.value);
      u.forEach((_, m) => {
        const { reference: h } = i[m], v = Fl(_.rows, h.id);
        g.set(h.key, v ? l(h.entity, v) : "");
      }), t.value = g;
    };
    if (i.every(({ outcome: u }) => !(u instanceof Promise))) {
      c(i.map(({ outcome: u }) => u));
      return;
    }
    for (const { reference: u } of i) n.add(u.key);
    Promise.all(i.map(({ outcome: u }) => Promise.resolve(u))).then(c).catch(() => {
    }).finally(() => {
      for (const { reference: u } of i) n.delete(u.key);
    });
  };
  return ne([e.source, e.schema, e.terms, e.loading], () => {
    try {
      o();
    } catch {
    }
  }, { immediate: !0 }), {
    names: t,
    nameOf(r) {
      const i = a(r);
      return i && t.value.get(i.key) || null;
    }
  };
}
const Kl = 4, Wl = 8, zl = 180;
function jl(e, t, n, a = {}) {
  const s = a.gap ?? Kl, l = a.margin ?? Wl, o = a.flipBelow ?? zl, r = a.side ?? "below", i = {
    below: n.height - e.bottom - s - l,
    above: e.top - s - l
  }, c = r === "below" ? "above" : "below", u = i[r] < o && i[c] > i[r] ? c : r, g = Math.min(a.maxHeight ?? 1 / 0, Math.max(0, i[u])), _ = Math.max(0, n.width - l * 2), m = Math.min(a.minWidth ?? e.width, _), h = Math.min(Math.max(t, m), _), v = a.align === "end" ? e.right - h : e.left, S = Math.max(l, Math.min(v, n.width - h - l));
  return u === "below" ? { side: u, left: S, top: e.bottom + s, maxHeight: g, minWidth: m, maxWidth: _ } : { side: u, left: S, bottom: n.height - e.top + s, maxHeight: g, minWidth: m, maxWidth: _ };
}
const Ul = ["data-dc-theme", "data-dc-side"], Se = [], Ql = /* @__PURE__ */ j({
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
    const n = e, a = t, { theme: s, style: l, adopt: o } = Sn(n), r = q(null), i = q(null), c = { root: () => r.value };
    function u() {
      const y = n.anchor;
      y && (i.value = jl(
        y.getBoundingClientRect(),
        r.value?.offsetWidth ?? 0,
        { width: window.innerWidth, height: window.innerHeight },
        { side: n.side, align: n.align, maxHeight: n.maxHeight, minWidth: n.minWidth }
      ));
    }
    const g = f(() => {
      const y = i.value, w = y ? {
        position: "fixed",
        left: `${y.left}px`,
        ...y.top !== void 0 ? { top: `${y.top}px` } : {},
        ...y.bottom !== void 0 ? { bottom: `${y.bottom}px` } : {},
        minWidth: `${y.minWidth}px`,
        maxWidth: `${y.maxWidth}px`,
        maxHeight: `${y.maxHeight}px`,
        overflowY: "auto"
      } : { position: "fixed", visibility: "hidden" };
      return { ...l.value, ...w };
    });
    function _() {
      a("update:open", !1), a("close");
    }
    function m(y) {
      return r.value?.contains(y) || n.anchor?.contains(y) ? !0 : Se.slice(Se.indexOf(c) + 1).some((M) => M.root()?.contains(y));
    }
    function h(y) {
      const w = y.target;
      w && !m(w) && _();
    }
    function v(y) {
      y.key !== "Escape" || y.defaultPrevented || Se[Se.length - 1] === c && (y.preventDefault(), r.value?.contains(document.activeElement) && n.anchor?.focus(), _());
    }
    let S = null;
    async function C() {
      Se.includes(c) || (Se.push(c), o(), i.value = null, await st(), u(), window.addEventListener("pointerdown", h, !0), document.addEventListener("keydown", v, !0), window.addEventListener("resize", u), window.addEventListener("scroll", u, !0), typeof ResizeObserver < "u" && r.value && (S = new ResizeObserver(() => u()), S.observe(r.value)));
    }
    function A() {
      const y = Se.indexOf(c);
      y !== -1 && (Se.splice(y, 1), window.removeEventListener("pointerdown", h, !0), document.removeEventListener("keydown", v, !0), window.removeEventListener("resize", u), window.removeEventListener("scroll", u, !0), S?.disconnect(), S = null);
    }
    return Ge(() => {
      n.open && C();
    }), ne(
      () => n.open,
      (y) => {
        y ? C() : A();
      }
    ), ne(() => n.anchor, () => {
      n.open && u();
    }), ke(A), (y, w) => e.open ? (d(), H(Bt, {
      key: 0,
      to: e.to
    }, [
      b("div", Oe({
        ref_key: "root",
        ref: r
      }, y.$attrs, {
        class: "dc-shell dc-layer dc-popover",
        "data-dc-theme": k(s),
        "data-dc-side": i.value?.side,
        style: g.value
      }), [
        G(y.$slots, "default", {}, void 0, !0)
      ], 16, Ul)
    ], 8, ["to"])) : O("", !0);
  }
}), Q = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [a, s] of t)
    n[a] = s;
  return n;
}, Gl = /* @__PURE__ */ Q(Ql, [["__scopeId", "data-v-a688f2f7"]]), Yl = ["href"], Xl = /* @__PURE__ */ j({
  __name: "PressLink",
  props: {
    href: {},
    selectable: { type: Boolean }
  },
  emits: ["press"],
  setup(e, { emit: t }) {
    const n = e, a = t;
    function s(r) {
      r.stopPropagation(), !Na() && (n.href && un(r) ? cn(n.href, r) : a("press", dt(r), r));
    }
    function l(r) {
      n.href && r.button === 1 && cn(n.href, r);
    }
    function o(r) {
      if (n.href && un(r)) {
        r.stopPropagation();
        return;
      }
      r.preventDefault(), a("press", dt(r), r);
    }
    return (r, i) => e.selectable ? (d(), p("span", {
      key: 0,
      role: "link",
      tabindex: "0",
      class: "dc-press",
      onClick: s,
      onAuxclick: l,
      onKeydown: i[0] || (i[0] = Te((c) => c.currentTarget.click(), ["enter"]))
    }, [
      G(r.$slots, "default", {}, void 0, !0)
    ], 32)) : e.href ? (d(), p("a", {
      key: 1,
      href: e.href,
      class: "dc-press",
      onClick: o
    }, [
      G(r.$slots, "default", {}, void 0, !0)
    ], 8, Yl)) : (d(), p("button", {
      key: 2,
      type: "button",
      class: "dc-press",
      onClick: o
    }, [
      G(r.$slots, "default", {}, void 0, !0)
    ]));
  }
}), se = /* @__PURE__ */ Q(Xl, [["__scopeId", "data-v-e5165a68"]]), Nt = (e) => e.toLowerCase().replace(/\s+/g, ""), Jl = /(?:[^\s"]|"[^"]*"?)*$/, Zl = /^(-?)([^:=<>"\s-][^:=<>"\s]*)([:=])(.*)$/, Yn = 4;
function eo(e, t) {
  const n = Nt(t);
  return e.find((a) => ft(a) === n || Nt(a.label) === n);
}
function to(e) {
  switch (e.kind) {
    case "toggle":
      return e.text;
    case "range":
      return `${e.min}..${e.max}`;
    case "chips": {
      const t = e.options.slice(0, Yn).join(" · "), n = e.options.length - Yn;
      return n > 0 ? `${t} · +${n}` : t;
    }
  }
}
function no(e) {
  switch (e.kind) {
    case "toggle":
      return [{ value: "true", hint: e.text }, { value: "false" }];
    case "chips":
      return e.options.map((t) => ({ value: t }));
    case "range":
      return [];
  }
}
function Xn(e, t) {
  return Nt(e).includes(Nt(t));
}
function ao(e, t) {
  const n = Jl.exec(e)?.[0] ?? "", a = e.slice(0, e.length - n.length), s = [], l = Zl.exec(n);
  if (l) {
    const [, o, r, i, c] = l, u = eo(t, r);
    if (!u) return [];
    const g = c.replace(/"/g, "").toLowerCase();
    for (const { value: _, hint: m } of no(u)) {
      if (!_.toLowerCase().includes(g)) continue;
      const h = we({
        kind: "field",
        field: ft(u),
        comparator: i,
        value: _,
        ...o ? { negated: !0 } : {}
      });
      s.push({ draft: a + h, label: h, ...m ? { hint: m } : {}, complete: !0 });
    }
  } else {
    if (/[<>"]/.test(n)) return [];
    const o = n.startsWith("-") ? "-" : "", r = n.slice(o.length);
    for (const i of t) {
      if (r && !Xn(i.key, r) && !Xn(i.label, r)) continue;
      const c = `${o}${ft(i)}:`;
      s.push({ draft: a + c, label: c, hint: to(i), complete: !1 });
    }
  }
  return s.filter((o) => o.draft !== e);
}
const so = { class: "dc-header__main" }, lo = {
  class: "dc-header__brand",
  "aria-hidden": "true"
}, oo = { class: "dc-header__sr" }, ro = {
  key: 2,
  class: "dc-header__within"
}, io = ["title"], co = { class: "dc-header__query" }, uo = ["data-dc-more", "title"], fo = { class: "dc-header__run" }, vo = {
  key: 0,
  class: "dc-header__or dc-mono",
  "aria-hidden": "true"
}, po = ["title", "aria-label", "onClick"], ho = ["placeholder", "aria-expanded", "aria-activedescendant", "onKeydown"], mo = ["id", "aria-selected", "onClick"], yo = { class: "dc-completion__term dc-mono" }, go = {
  key: 0,
  class: "dc-completion__hint"
}, _o = {
  key: 0,
  class: "dc-header__actions"
}, wo = /* @__PURE__ */ j({
  __name: "ShellHeader",
  props: {
    panel: { type: Boolean }
  },
  setup(e) {
    const t = Rt(), n = e, a = te(), s = f(() => a.schema.value), l = f(() => {
      const P = a.within.value.trim();
      return P ? At({ ...a.query.value, expr: P }, null) : [];
    }), o = f(() => {
      const P = a.entity.value, R = P?.keepsScope ? void 0 : P?.scope?.toLowerCase();
      return a.terms.value.filter((W) => n.panel || W.facetKey !== ze).map((W, D, Fe) => {
        const ve = Fe[D - 1];
        return {
          term: W,
          or: ve?.group !== void 0 && W.group !== void 0 && W.group !== ve.group,
          idle: !!R && W.field?.toLowerCase() === R
        };
      });
    }), r = Dl({
      source: a.source,
      schema: a.schema,
      query: a.query,
      loading: a.loading,
      // The scope's parts as well as the query's: it names a record more often
      // than a typed term does, being what a record's own page is built on.
      terms: f(() => [...l.value, ...a.terms.value])
    });
    function i(P) {
      const R = Ba(s.value, P)?.scopeLabel ?? P;
      return R.charAt(0).toUpperCase() + R.slice(1);
    }
    function c(P) {
      return P.replace(/\s*\([^()]*\)\s*$/, "");
    }
    function u(P) {
      if (P.facetKey === ze) {
        const D = a.entity.value?.label;
        return D ? `${D} · ${Ne((a.matched ?? a.total).value)}` : P.label;
      }
      const R = r.nameOf(P);
      return R ? `${P.negated ? "-" : ""}${i(P.field)}: ${c(R)}` : P.label;
    }
    function g(P) {
      const R = u(P.term), W = P.idle ? `Not applied to ${a.entity.value?.label} — remove ${R}` : `Remove ${R}`, D = P.term.address;
      return D && D !== R ? `${W}
Written ${D} in the address and the search box` : W;
    }
    const _ = f(() => {
      const P = a.pressPreview?.value;
      if (!P) return [];
      const R = a.query.value, W = new Set(a.terms.value.map((D) => D.address));
      return At(
        { ...R, expr: P.alone ? P.term : it(R.expr, P.term) },
        a.entity.value,
        a.schema.value
      ).filter((D) => D.address !== void 0 && !W.has(D.address)).map(
        (D) => P.name ? `${i(D.field)}: ${c(P.name)}` : D.label
      );
    }), m = f(() => a.pressPreview?.value?.alone === !0), h = q(null);
    function v(P) {
      h.value = P instanceof HTMLInputElement ? P : null;
    }
    function S() {
      a.abandonDraft(), h.value?.blur();
    }
    function C() {
      const P = w.value[y.value];
      if (M.value && P) {
        I(P);
        return;
      }
      T.value = null, A.value = !1, a.commitDraft();
    }
    const A = q(!1), y = q(-1), w = f(() => {
      const P = a.entity.value?.facets ?? [];
      return P.length ? ao(a.draft.value, P) : [];
    }), M = f(() => A.value && w.value.length > 0);
    ne(w, () => {
      y.value = -1;
    });
    const E = `${Ht() ?? "dc-header"}-completions`;
    function I(P) {
      a.draft.value = P.draft, A.value = !P.complete, y.value = -1, st(() => {
        const R = h.value;
        R?.focus(), R?.setSelectionRange(P.draft.length, P.draft.length);
      });
    }
    function $(P, R) {
      if (P.isComposing || !w.value.length) return;
      if (P.preventDefault(), !A.value) {
        A.value = !0;
        return;
      }
      const W = w.value.length + 1;
      y.value = (y.value + 1 + R + W) % W - 1;
    }
    function B(P) {
      return `${E}-${P}`;
    }
    const T = q(null), K = f(() => Math.min(T.value ?? 1 / 0, o.value.length)), V = f(() => [
      { key: "before", entries: o.value.slice(0, K.value) },
      { key: "after", entries: o.value.slice(K.value) }
    ]), J = f(() => K.value < o.value.length);
    ne(o, (P) => {
      T.value !== null && T.value >= P.length && (T.value = null);
    });
    function re(P, R) {
      T.value = P >= o.value.length ? null : Math.max(0, P), st(() => {
        const W = h.value;
        if (!W) return;
        const D = R === "start" ? 0 : W.value.length;
        W.setSelectionRange(D, D), W.scrollIntoView({ block: "nearest", inline: "nearest" }), Ee();
      });
    }
    function me(P) {
      const R = h.value;
      return !R || R.selectionStart !== R.selectionEnd ? !1 : R.selectionStart === (P === "start" ? 0 : R.value.length);
    }
    function ye(P) {
      K.value === 0 || !me("start") || (P.preventDefault(), re(P.key === "Home" ? 0 : K.value - 1, "start"));
    }
    function qe(P) {
      !J.value || !me("end") || (P.preventDefault(), re(P.key === "End" ? o.value.length : K.value + 1, "end"));
    }
    function le(P) {
      K.value === 0 || !me("start") || (P.preventDefault(), fe(o.value[K.value - 1].term, !0));
    }
    function Xe(P) {
      !J.value || !me("end") || (P.preventDefault(), fe(o.value[K.value].term, !1));
    }
    function ge(P) {
      P.isComposing || P.altKey || P.ctrlKey || P.metaKey || P.shiftKey || (P.key === "ArrowLeft" || P.key === "Home" ? ye(P) : P.key === "ArrowRight" || P.key === "End" ? qe(P) : P.key === "Backspace" ? le(P) : P.key === "Delete" && Xe(P));
    }
    function fe(P, R) {
      R && T.value !== null && (T.value = Math.max(0, T.value - 1)), a.removeTerm(P);
    }
    function Je(P) {
      P.target?.closest("button, input") || (P.preventDefault(), h.value?.focus(), re(o.value.length, "end"));
    }
    function Yt() {
      A.value = !1, a.draft.value || (T.value = null);
    }
    const Ze = q(null), Ve = q("");
    function Ee() {
      const P = Ze.value;
      if (!P) {
        Ve.value = "";
        return;
      }
      const R = P.scrollLeft > 1, W = P.scrollWidth - P.clientWidth - P.scrollLeft > 1;
      Ve.value = R && W ? "both" : R ? "start" : W ? "end" : "";
    }
    let $e = null;
    return ne(
      Ze,
      (P) => {
        $e?.disconnect(), $e = null, Ee(), !(!P || typeof ResizeObserver > "u") && ($e = new ResizeObserver(Ee), $e.observe(P));
      },
      { flush: "post" }
    ), ne([o, K], Ee, { flush: "post" }), ke(() => $e?.disconnect()), (P, R) => (d(), p("div", {
      class: oe(["dc-header", { "dc-header--panel": n.panel }])
    }, [
      b("div", so, [
        !n.panel && s.value.label && t.brand ? (d(), H(se, {
          key: 0,
          class: "dc-header__domain",
          "data-dc-brand": "",
          title: "Home",
          href: k(a).homeHref(),
          onPress: R[0] || (R[0] = (W) => k(a).reset())
        }, {
          default: Y(() => [
            b("span", lo, [
              G(P.$slots, "brand", {
                label: s.value.label
              }, void 0, !0)
            ]),
            b("span", oo, L(s.value.label), 1)
          ]),
          _: 3
        }, 8, ["href"])) : !n.panel && s.value.label ? (d(), H(se, {
          key: 1,
          class: "dc-header__domain",
          title: "Home",
          href: k(a).homeHref(),
          onPress: R[1] || (R[1] = (W) => k(a).reset())
        }, {
          default: Y(() => [
            Z(L(s.value.label), 1)
          ]),
          _: 1
        }, 8, ["href"])) : O("", !0),
        G(P.$slots, "lead", {}, void 0, !0),
        l.value.length ? (d(), p("span", ro, [
          R[10] || (R[10] = b("span", { class: "dc-header__sr" }, "Within", -1)),
          (d(!0), p(z, null, X(l.value, (W) => (d(), p("span", {
            key: `scope:${W.id}`,
            class: "dc-within dc-mono dc-truncate",
            title: u(W)
          }, L(u(W)), 9, io))), 128))
        ])) : O("", !0),
        b("div", co, [
          b("div", {
            class: "dc-header__field",
            onMousedown: Je
          }, [
            b("div", {
              ref_key: "termBar",
              ref: Ze,
              class: "dc-header__terms",
              "data-dc-more": Ve.value,
              title: k(a).summary.value,
              onScroll: Ee
            }, [
              (d(!0), p(z, null, X(V.value, (W) => (d(), p(z, {
                key: W.key
              }, [
                b("span", fo, [
                  (d(!0), p(z, null, X(W.entries, (D) => (d(), p(z, {
                    key: D.term.id
                  }, [
                    D.or ? (d(), p("span", vo, "or")) : O("", !0),
                    b("button", {
                      type: "button",
                      class: oe(["dc-term dc-mono", { "dc-term--idle": D.idle, "dc-term--leaving": m.value, "dc-term--type": D.term.facetKey === k(ze) }]),
                      title: g(D),
                      "aria-label": `Remove ${u(D.term)}`,
                      onMousedown: R[2] || (R[2] = xe(() => {
                      }, ["prevent"])),
                      onClick: (Fe) => fe(D.term, W.key === "before")
                    }, L(u(D.term)), 43, po)
                  ], 64))), 128)),
                  W.key === "before" ? (d(!0), p(z, { key: 0 }, X(_.value, (D) => (d(), p("span", {
                    key: D,
                    class: "dc-term dc-term--preview dc-mono",
                    "aria-hidden": "true"
                  }, L(D), 1))), 128)) : O("", !0)
                ]),
                W.key === "before" ? Ct((d(), p("input", {
                  key: 0,
                  ref_for: !0,
                  ref: v,
                  "onUpdate:modelValue": R[3] || (R[3] = (D) => k(a).draft.value = D),
                  class: oe(["dc-header__search dc-mono", { "dc-header__search--between": J.value }]),
                  style: ae({ "--dc-typed": String(Math.max(1, k(a).draft.value.length)) }),
                  type: "text",
                  autocomplete: "off",
                  spellcheck: "false",
                  placeholder: J.value ? "" : "Filter…",
                  "aria-label": "Filter",
                  role: "combobox",
                  "aria-autocomplete": "list",
                  "aria-expanded": M.value,
                  "aria-controls": E,
                  "aria-activedescendant": M.value && y.value >= 0 ? B(y.value) : void 0,
                  onKeydown: [
                    Te(xe(C, ["prevent"]), ["enter"]),
                    Te(xe(S, ["prevent"]), ["esc"]),
                    R[4] || (R[4] = Te((D) => $(D, 1), ["down"])),
                    R[5] || (R[5] = Te((D) => $(D, -1), ["up"])),
                    ge
                  ],
                  onFocus: R[6] || (R[6] = (D) => A.value = !0),
                  onInput: R[7] || (R[7] = (D) => A.value = !0),
                  onBlur: Yt
                }, null, 46, ho)), [
                  [ia, k(a).draft.value]
                ]) : O("", !0)
              ], 64))), 128))
            ], 40, uo)
          ], 32)
        ])
      ]),
      U(Gl, {
        id: E,
        open: M.value,
        anchor: h.value,
        "min-width": 0,
        "max-height": 320,
        class: "dc-completions",
        role: "listbox",
        "aria-label": "Completions",
        onClose: R[9] || (R[9] = (W) => A.value = !1)
      }, {
        default: Y(() => [
          (d(!0), p(z, null, X(w.value, (W, D) => (d(), p("div", {
            id: B(D),
            key: W.label,
            class: oe(["dc-completion", { "dc-completion--active": D === y.value }]),
            role: "option",
            "aria-selected": D === y.value,
            onMousedown: R[8] || (R[8] = xe(() => {
            }, ["prevent"])),
            onClick: (Fe) => I(W)
          }, [
            b("span", yo, L(W.label), 1),
            W.hint ? (d(), p("span", go, L(W.hint), 1)) : O("", !0)
          ], 42, mo))), 128))
        ]),
        _: 1
      }, 8, ["open", "anchor"]),
      t.actions ? (d(), p("div", _o, [
        G(P.$slots, "actions", {}, void 0, !0)
      ])) : O("", !0)
    ], 2));
  }
}), fn = /* @__PURE__ */ Q(wo, [["__scopeId", "data-v-3a764b58"]]), ko = ["checked", "indeterminate"], Wa = /* @__PURE__ */ j({
  __name: "PageTick",
  setup(e) {
    const t = te(), n = f(() => t.rows.value.filter((l) => t.isSelected(l)).length), a = f(
      () => t.rows.value.length > 0 && n.value === t.rows.value.length
    ), s = f(() => n.value > 0 && !a.value);
    return (l, o) => (d(), p("input", {
      class: "dc-tick",
      type: "checkbox",
      checked: a.value,
      indeterminate: s.value,
      "aria-label": "Select every row on this page",
      title: "Select every row on this page",
      onChange: o[0] || (o[0] = (r) => k(t).selectPage(!a.value))
    }, null, 40, ko));
  }
}), bo = { class: "dc-pick" }, $o = ["id"], xo = ["id", "aria-expanded", "aria-labelledby", "data-dc-value"], So = {
  key: 0,
  class: "dc-pick__icon",
  viewBox: "0 0 16 16",
  "aria-hidden": "true"
}, Co = ["d"], Po = { class: "dc-pick__label" }, Mo = /* @__PURE__ */ j({
  __name: "PickControl",
  props: {
    modelValue: {},
    options: {},
    label: {},
    mono: { type: Boolean }
  },
  emits: ["update:modelValue", "open", "close"],
  setup(e, { emit: t }) {
    const n = e, a = t, s = Ht() ?? "dc-pick", l = q(null), o = q(null), r = q(null), i = q(!1), c = f(() => r.value !== null), u = q(null), g = f(
      () => n.options.find((w) => w.key === n.modelValue) ?? n.options[0]
    ), _ = f(
      () => n.options.map((w) => ({
        id: w.key,
        label: w.label,
        icon: w.icon,
        checked: w.key === n.modelValue
      }))
    ), m = f(
      () => r.value ? { maxHeight: `${window.innerHeight - r.value.y - 8}px` } : void 0
    );
    function h(w) {
      const M = l.value?.getBoundingClientRect();
      M && (u.value = l.value?.closest(".dc-shell") ?? document.body, r.value = { x: M.left, y: M.bottom + 4, mirrorX: M.right }, i.value = w, a("open"));
    }
    function v(w) {
      r.value && a("close"), r.value = null, w && l.value?.focus();
    }
    function S() {
      c.value ? v(!0) : h(!1);
    }
    function C(w) {
      w.key !== "ArrowDown" && w.key !== "ArrowUp" || c.value || (w.preventDefault(), h(!0));
    }
    function A(w) {
      const M = w.target;
      M && (l.value?.contains(M) || o.value?.root?.contains(M) || v(!1));
    }
    ne(c, (w) => {
      w ? window.addEventListener("pointerdown", A, !0) : window.removeEventListener("pointerdown", A, !0);
    }), ke(() => window.removeEventListener("pointerdown", A, !0));
    function y(w) {
      v(!0), !(w.id === void 0 || w.id === n.modelValue) && a("update:modelValue", w.id);
    }
    return (w, M) => (d(), p("span", bo, [
      b("span", {
        id: `${k(s)}-name`,
        class: "dc-pick__name"
      }, L(e.label), 9, $o),
      b("button", {
        id: `${k(s)}-value`,
        ref_key: "trigger",
        ref: l,
        type: "button",
        class: oe(["dc-pick__button", { "dc-mono": e.mono }]),
        "aria-haspopup": "menu",
        "aria-expanded": c.value,
        "aria-labelledby": `${k(s)}-name ${k(s)}-value`,
        "data-dc-value": e.modelValue,
        onClick: S,
        onKeydown: C
      }, [
        g.value?.icon ? (d(), p("svg", So, [
          b("path", {
            d: g.value.icon
          }, null, 8, Co)
        ])) : O("", !0),
        b("span", Po, L(g.value?.label), 1)
      ], 42, xo),
      M[1] || (M[1] = b("svg", {
        class: "dc-pick__mark",
        viewBox: "0 0 16 16",
        "aria-hidden": "true"
      }, [
        b("path", { d: "M4 6l4 4 4-4" })
      ], -1)),
      r.value && u.value ? (d(), H(Bt, {
        key: 0,
        to: u.value
      }, [
        U(k(ps), {
          ref_key: "menu",
          ref: o,
          class: "dc-pick__list",
          style: ae(m.value),
          items: _.value,
          at: r.value,
          label: e.label,
          autofocus: i.value,
          onChoose: y,
          onDismiss: M[0] || (M[0] = (E) => v(!0))
        }, null, 8, ["style", "items", "at", "label", "autofocus"])
      ], 8, ["to"])) : O("", !0)
    ]));
  }
}), vn = /* @__PURE__ */ Q(Mo, [["__scopeId", "data-v-0e31a711"]]), Eo = {
  class: "dc-pager",
  "aria-label": "Pages"
}, Lo = ["title"], To = ["value", "onKeydown"], Oo = {
  class: "dc-pager__total",
  "aria-hidden": "true"
}, Ao = {
  class: "dc-pager__sr",
  "aria-live": "polite"
}, No = /* @__PURE__ */ j({
  __name: "ShellPager",
  props: {
    pagesNote: {}
  },
  setup(e) {
    const t = e, n = te(), a = f(() => n.liveQuery.value.page), s = f(
      () => `${n.counting.value ? "~" : ""}${De(n.pageCount.value)}`
    ), l = f(() => {
      if (n.limit.value === 1) {
        const v = `Record ${De(a.value)} of ${s.value}`;
        return t.pagesNote ? `${v}
${t.pagesNote}` : v;
      }
      let m = `Page ${De(a.value)} of ${s.value}`;
      const h = n.rows.value.length;
      if (h) {
        const v = n.offset.value + 1, S = `${n.counting.value ? "~" : ""}${De(n.total.value)}`;
        m += ` — rows ${De(v)} to ${De(v + h - 1)} of ${S}`;
      }
      return t.pagesNote ? `${m}
${t.pagesNote}` : m;
    }), o = q(null), r = f(() => o.value ?? String(a.value)), i = f(
      () => `calc(${Math.max(2, String(n.pageCount.value).length)}ch + 10px)`
    );
    function c(m) {
      m.target.select();
    }
    function u(m) {
      const h = m.target, v = h.value.replace(/[^0-9]/g, "");
      h.value !== v && (h.value = v), o.value = v;
    }
    function g(m) {
      const h = m.target, v = Number(o.value);
      o.value = null;
      const S = Number.isFinite(v) && v >= 1 ? Math.min(Math.trunc(v), Math.max(1, n.pageCount.value)) : a.value;
      h.value = String(S), S !== a.value && n.setPage(S);
    }
    function _(m) {
      const h = m.target;
      o.value = null, h.value = String(a.value), h.blur();
    }
    return (m, h) => (d(), p("nav", Eo, [
      U(se, {
        class: "dc-pager__step",
        "aria-label": "Previous page",
        href: a.value > 1 ? k(n).hrefFor({ page: a.value - 1 }) : null,
        disabled: a.value <= 1,
        onPress: h[0] || (h[0] = (v) => k(n).setPage(a.value - 1))
      }, {
        default: Y(() => [...h[2] || (h[2] = [
          b("span", { "aria-hidden": "true" }, "‹", -1)
        ])]),
        _: 1
      }, 8, ["href", "disabled"]),
      b("span", {
        class: "dc-pager__page dc-mono",
        title: l.value
      }, [
        b("input", {
          class: "dc-pager__box dc-mono",
          type: "text",
          inputmode: "numeric",
          autocomplete: "off",
          "aria-label": "Page",
          style: ae({ width: i.value }),
          value: r.value,
          onFocus: c,
          onInput: u,
          onKeydown: [
            Te(xe(g, ["prevent"]), ["enter"]),
            Te(xe(_, ["prevent"]), ["esc"])
          ],
          onBlur: g
        }, null, 44, To),
        b("span", Oo, "/ " + L(s.value), 1)
      ], 8, Lo),
      b("span", Ao, L(l.value), 1),
      U(se, {
        class: "dc-pager__step",
        "aria-label": "Next page",
        href: a.value < k(n).pageCount.value ? k(n).hrefFor({ page: a.value + 1 }) : null,
        disabled: a.value >= k(n).pageCount.value,
        onPress: h[1] || (h[1] = (v) => k(n).setPage(a.value + 1))
      }, {
        default: Y(() => [...h[3] || (h[3] = [
          b("span", { "aria-hidden": "true" }, "›", -1)
        ])]),
        _: 1
      }, 8, ["href", "disabled"])
    ]));
  }
}), Io = /* @__PURE__ */ Q(No, [["__scopeId", "data-v-bdec7640"]]), Bo = {
  key: 0,
  class: "dc-actions__order"
}, Ro = {
  key: 1,
  class: "dc-actions__select"
}, Ho = {
  key: 0,
  class: "dc-actions__all"
}, qo = {
  class: "dc-actions__count",
  "aria-live": "polite"
}, Vo = {
  key: 1,
  class: "dc-actions__count dc-actions__all",
  "aria-live": "polite"
}, Fo = { class: "dc-actions__ops" }, Do = ["title", "disabled"], Ko = ["title", "disabled"], Wo = ["disabled"], zo = ["data-dc-operation", "disabled", "onClick"], jo = ["disabled"], Uo = /* @__PURE__ */ j({
  __name: "RecordActions",
  props: {
    views: {},
    selectionPlacement: {},
    pagesNote: {}
  },
  setup(e) {
    const t = e, n = te(), a = f(() => Ae(n.query.value.view, t.views)), s = f(
      () => (u.value || g.value) && a.value !== "table" && n.sorts.value.length > 0
    ), l = f(
      () => n.sorts.value.map((E) => ({ key: E.key, label: E.label }))
    ), o = f(() => s.value && l.value.length > 1), r = f(() => n.query.value.dir === "desc"), i = f(
      () => `Sorted by ${n.sort.value.label}, ${r.value ? "descending" : "ascending"}`
    ), c = f(() => n.entity.value), u = f(
      () => !$a(n.query.value, t.views) && a.value !== "record"
    ), g = f(() => a.value === "record" && n.query.value.entity !== null), _ = f(
      () => (u.value || g.value) && !n.loading.value && (n.pageCount.value > 1 || !!t.pagesNote)
    ), m = f(() => n.selection.value.ids.length), h = f(
      () => u.value && n.selectable.value && (n.rows.value.length > 0 || m.value > 0)
    ), v = f(() => a.value === "table"), S = f(
      () => s.value || _.value || u.value && (h.value || !!(c.value?.create || c.value?.duplicate || c.value?.delete || c.value?.operations?.length))
    ), C = f(() => m.value ? `${m.value} selected` : v.value ? "" : "Select all"), A = f(() => t.selectionPlacement === "end"), y = f(() => n.selectionTerms.value.length), w = (E) => y.value ? `${E} ${y.value}` : E;
    function M(E) {
      return m.value ? E.endsWith("…") ? `${E.slice(0, -1)} ${m.value}…` : `${E} ${m.value}` : E;
    }
    return (E, I) => S.value ? (d(), p("div", {
      key: 0,
      class: oe(["dc-actions", { "dc-actions--selection-end": A.value }])
    }, [
      s.value ? (d(), p("span", Bo, [
        o.value ? (d(), H(vn, {
          key: 0,
          class: "dc-actions__pick dc-actions__sort",
          label: "Sort",
          "model-value": k(n).sort.value.key,
          options: l.value,
          "onUpdate:modelValue": k(n).setSort
        }, null, 8, ["model-value", "options", "onUpdate:modelValue"])) : O("", !0),
        U(se, {
          class: "dc-actions__dir",
          "aria-label": i.value,
          title: i.value,
          href: k(n).hrefFor({ dir: r.value ? "asc" : "desc" }),
          onPress: I[0] || (I[0] = ($) => k(n).toggleDirection())
        }, {
          default: Y(() => [
            Z(L(r.value ? "↓" : "↑"), 1)
          ]),
          _: 1
        }, 8, ["aria-label", "title", "href"])
      ])) : O("", !0),
      h.value && C.value ? (d(), p("div", Ro, [
        v.value ? (d(), p("span", Vo, L(C.value), 1)) : (d(), p("label", Ho, [
          U(Wa),
          b("span", qo, L(C.value), 1)
        ])),
        m.value ? (d(), p("button", {
          key: 2,
          type: "button",
          class: oe(["dc-actions__clear", { "dc-actions__clear--op": A.value }]),
          onClick: I[1] || (I[1] = ($) => k(n).clearSelection())
        }, " Clear ", 2)) : O("", !0)
      ])) : O("", !0),
      b("div", Fo, [
        c.value?.create ? (d(), H(se, {
          key: 0,
          class: "dc-actions__op dc-actions__new",
          href: k(n).createHref?.(c.value),
          onPress: I[2] || (I[2] = ($) => k(n).create(c.value))
        }, {
          default: Y(() => [
            I[7] || (I[7] = b("span", {
              class: "dc-actions__plus",
              "aria-hidden": "true"
            }, "+", -1)),
            Z(" " + L(c.value.create), 1)
          ]),
          _: 1
        }, 8, ["href"])) : O("", !0),
        u.value && k(n).standable.value ? (d(), p(z, { key: 1 }, [
          b("button", {
            type: "button",
            class: "dc-actions__op",
            "data-dc-operation": "include",
            title: y.value ? `Narrow the query to the ${y.value} ticked` : "Tick rows to narrow the query to them",
            disabled: !y.value,
            onClick: I[3] || (I[3] = ($) => k(n).standSelection("in"))
          }, L(w("Include")), 9, Do),
          b("button", {
            type: "button",
            class: "dc-actions__op",
            "data-dc-operation": "exclude",
            title: y.value ? `Leave the ${y.value} ticked out of the query` : "Tick rows to leave them out of the query",
            disabled: !y.value,
            onClick: I[4] || (I[4] = ($) => k(n).standSelection("out"))
          }, L(w("Exclude")), 9, Ko)
        ], 64)) : O("", !0),
        c.value?.duplicate ? (d(), p("button", {
          key: 2,
          type: "button",
          class: "dc-actions__op",
          disabled: !m.value,
          onClick: I[5] || (I[5] = ($) => k(n).duplicate())
        }, L(M(c.value.duplicate)), 9, Wo)) : O("", !0),
        (d(!0), p(z, null, X(c.value?.operations ?? [], ($) => (d(), p("button", {
          key: $.key,
          type: "button",
          class: "dc-actions__op",
          "data-dc-operation": $.key,
          disabled: !m.value && $.selection !== !1,
          onClick: (B) => k(n).operate($.key)
        }, L($.selection === !1 ? $.label : M($.label)), 9, zo))), 128)),
        c.value?.delete ? (d(), p("button", {
          key: 3,
          type: "button",
          class: "dc-actions__op dc-actions__danger",
          disabled: !m.value,
          onClick: I[6] || (I[6] = ($) => k(n).delete())
        }, L(M(c.value.delete)), 9, jo)) : O("", !0)
      ]),
      _.value ? (d(), H(Io, {
        key: 2,
        class: "dc-actions__pages",
        "pages-note": e.pagesNote
      }, null, 8, ["pages-note"])) : O("", !0)
    ], 2)) : O("", !0);
  }
}), St = /* @__PURE__ */ Q(Uo, [["__scopeId", "data-v-b7cd42d5"]]);
function Jn(e) {
  return Math.max(0, e.total - (e.kept ?? 0));
}
function za(e) {
  const t = he(/* @__PURE__ */ new Map()), n = q(!0);
  let a = 0, s;
  const l = () => {
    a++, s?.abort(), s = void 0;
  }, o = () => {
    l();
    const r = a, { signal: i } = s = new AbortController(), c = e.query.value, u = e.schema.value, g = e.entities.value, _ = e.within?.value.trim() ?? "";
    n.value = c.expr.trim() === "" && !_;
    const m = /* @__PURE__ */ new Map();
    let h = !0;
    for (const v of g) {
      const S = Ia(v, c.expr), C = _ ? gn(_, S) : S;
      let A = !1;
      const y = (M) => {
        if (r !== a) return;
        if (h) {
          m.set(v.key, M);
          return;
        }
        const E = new Map(t.value);
        E.set(v.key, M), t.value = E;
      }, w = e.source.value.query({
        query: { ...c, entity: v.key, expr: C, page: 1 },
        schema: u,
        entity: v,
        limit: 0,
        offset: 0,
        signal: i,
        progress: (M) => {
          A || y({ total: M, pending: !0, counted: !0 });
        }
      });
      w instanceof Promise ? (m.has(v.key) || m.set(v.key, { total: 0, pending: !0, counted: !1 }), w.then((M) => {
        A = !0, y({ total: Jn(M), pending: !1, counted: !0 });
      })) : (A = !0, m.set(v.key, { total: Jn(w), pending: !1, counted: !0 }));
    }
    h = !1, t.value = m;
  };
  return ra() && It(l), { counts: t, pristine: n, refresh: o, cancel: l };
}
const Qo = {
  key: 1,
  class: "dc-show-as"
}, Go = {
  class: "dc-show-as__icon",
  viewBox: "0 0 16 16",
  width: "16",
  height: "16",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.4",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "aria-hidden": "true"
}, Yo = ["d"], Xo = ["aria-expanded", "aria-controls", "aria-activedescendant", "placeholder"], Jo = ["id"], Zo = ["id", "aria-selected", "onMousedown", "onMousemove"], er = {
  class: "dc-show-as__icon",
  viewBox: "0 0 16 16",
  width: "16",
  height: "16",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.4",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "aria-hidden": "true"
}, tr = ["d"], nr = { class: "dc-show-as__text" }, ar = { class: "dc-show-as__name" }, sr = {
  key: 0,
  class: "dc-show-as__hint"
}, lr = {
  class: "dc-show-as__check",
  "aria-hidden": "true"
}, or = {
  key: 0,
  class: "dc-show-as__none",
  role: "presentation"
}, rr = "…", ir = /* @__PURE__ */ j({
  __name: "RecordChoosers",
  props: {
    views: {},
    typeChooser: {},
    stacked: { type: Boolean },
    labels: {},
    hints: {}
  },
  setup(e) {
    const t = e, n = `dc-show-as-${Math.random().toString(36).slice(2, 8)}`, a = te(), s = f(
      () => a.hasFacets.value || !!a.liveQuery.value.expr.trim() || !!a.within.value
    ), l = za({
      source: a.source,
      schema: a.schema,
      // What each type holds of what is on screen, the draft's results included:
      // a count of the committed query would disagree with the rows under it.
      query: a.liveQuery,
      entities: a.entities,
      within: a.within
    });
    function o(T) {
      if (T.key === a.query.value.entity && s.value) return Ne((a.matched ?? a.total).value);
      if (l.pristine.value) return ct(T);
      const V = l.counts.value.get(T.key);
      return V ? V.counted ? `${V.pending ? "~" : ""}${Ne(V.total)}` : rr : ct(T);
    }
    const r = f(() => [
      { key: "", label: "Everything" },
      ...a.entities.value.map((T) => ({
        key: T.key,
        label: `${T.label} · ${o(T)}`
      }))
    ]), i = f(
      () => t.typeChooser === "always" || a.query.value.entity !== null
    );
    function c(T) {
      a.setEntity(T || null);
    }
    const u = f(() => {
      const T = t.views ?? [...lt];
      return (t.stacked && T.includes("record") ? ["record", ...T.filter((V) => V !== "record")] : T).map((V) => {
        const J = We(V) ? void 0 : a.hostViews.value[V];
        return {
          key: V,
          label: t.labels?.[V] ?? (V === "record" ? a.recordView.value?.label ?? Wn.record : We(V) ? Wn[V] : J?.label ?? V),
          icon: We(V) ? zn[V] : J?.icon ?? zn.list,
          hint: t.hints?.[V] ?? J?.hint
        };
      });
    }), g = f(() => Ae(a.query.value.view, t.views)), _ = f(() => u.value.length > 1), m = f(() => _.value || i.value && !t.stacked);
    function h(T) {
      a.setView(T);
    }
    const v = q(null), S = q(!1), C = q(""), A = q(0), y = f(() => u.value.find((T) => T.key === g.value)), w = f(() => {
      const T = C.value.trim().toLowerCase();
      return T ? u.value.filter(
        (K) => K.label.toLowerCase().includes(T) || !!K.hint?.toLowerCase().includes(T)
      ) : u.value;
    });
    function M() {
      S.value = !0, A.value = Math.max(0, w.value.findIndex((T) => T.key === g.value));
    }
    function E() {
      S.value = !1, C.value = "";
    }
    function I() {
      S.value ? v.value?.blur() : v.value?.focus();
    }
    function $(T) {
      T !== g.value && h(T), v.value?.blur();
    }
    function B(T) {
      const K = w.value.length;
      if (T.key === "ArrowDown" || T.key === "ArrowUp") {
        if (T.preventDefault(), !S.value) {
          M();
          return;
        }
        K && (A.value = (A.value + (T.key === "ArrowDown" ? 1 : -1) + K) % K);
      } else if (T.key === "Enter") {
        T.preventDefault();
        const V = w.value[A.value];
        V && $(V.key);
      } else T.key === "Escape" && (T.preventDefault(), v.value?.blur());
    }
    return (T, K) => m.value ? (d(), p("div", {
      key: 0,
      class: oe(["dc-choosers", { "dc-choosers--stacked": e.stacked }])
    }, [
      i.value && !e.stacked ? (d(), H(vn, {
        key: 0,
        class: "dc-actions__pick dc-actions__type",
        label: "Type",
        "model-value": k(a).query.value.entity ?? "",
        options: r.value,
        onOpen: k(l).refresh,
        onClose: k(l).cancel,
        "onUpdate:modelValue": c
      }, null, 8, ["model-value", "options", "onOpen", "onClose"])) : O("", !0),
      _.value && e.stacked ? (d(), p("div", Qo, [
        b("label", {
          for: n,
          class: "dc-show-as__label"
        }, [...K[2] || (K[2] = [
          Z("Show as ", -1),
          b("span", { class: "dc-mono" }, "(u)", -1)
        ])]),
        b("div", {
          class: oe(["dc-show-as__field", { "dc-show-as__field--open": S.value }])
        }, [
          (d(), p("svg", Go, [
            b("path", {
              d: y.value?.icon
            }, null, 8, Yo)
          ])),
          Ct(b("input", {
            id: n,
            ref_key: "showBox",
            ref: v,
            "onUpdate:modelValue": K[0] || (K[0] = (V) => C.value = V),
            class: "dc-show-as__input",
            type: "text",
            role: "combobox",
            autocomplete: "off",
            spellcheck: "false",
            "aria-autocomplete": "list",
            "aria-expanded": S.value,
            "aria-controls": `${n}-list`,
            "aria-activedescendant": S.value && w.value.length ? `${n}-${w.value[A.value]?.key}` : void 0,
            placeholder: y.value?.label,
            onFocus: M,
            onBlur: E,
            onInput: K[1] || (K[1] = (V) => {
              A.value = 0, S.value = !0;
            }),
            onKeydown: B
          }, null, 40, Xo), [
            [ia, C.value]
          ]),
          b("button", {
            type: "button",
            class: "dc-show-as__toggle",
            tabindex: "-1",
            "aria-label": "Open Show as",
            onMousedown: xe(I, ["prevent"])
          }, [...K[3] || (K[3] = [
            b("span", {
              class: "dc-show-as__caret",
              "aria-hidden": "true"
            }, "▾", -1)
          ])], 32),
          S.value ? (d(), p("ul", {
            key: 0,
            id: `${n}-list`,
            class: "dc-show-as__list",
            role: "listbox",
            "aria-label": "Show as"
          }, [
            (d(!0), p(z, null, X(w.value, (V, J) => (d(), p("li", {
              id: `${n}-${V.key}`,
              key: V.key,
              class: oe(["dc-show-as__option", { "dc-show-as__option--active": J === A.value, "dc-show-as__option--on": V.key === g.value }]),
              style: ae({ animationDelay: `${J * 30}ms` }),
              role: "option",
              "aria-selected": V.key === g.value,
              onMousedown: xe((re) => $(V.key), ["prevent"]),
              onMousemove: (re) => A.value = J
            }, [
              (d(), p("svg", er, [
                b("path", {
                  d: V.icon
                }, null, 8, tr)
              ])),
              b("span", nr, [
                b("span", ar, L(V.label), 1),
                V.hint ? (d(), p("span", sr, L(V.hint), 1)) : O("", !0)
              ]),
              b("span", lr, L(V.key === g.value ? "✓" : ""), 1)
            ], 46, Zo))), 128)),
            w.value.length ? O("", !0) : (d(), p("li", or, " No format matches “" + L(C.value) + "” ", 1))
          ], 8, Jo)) : O("", !0)
        ], 2)
      ])) : _.value ? (d(), H(vn, {
        key: 2,
        class: "dc-actions__pick dc-actions__view",
        label: "View",
        "model-value": g.value,
        options: u.value,
        "onUpdate:modelValue": h
      }, null, 8, ["model-value", "options"])) : O("", !0)
    ], 2)) : O("", !0);
  }
}), Zn = /* @__PURE__ */ Q(ir, [["__scopeId", "data-v-070ebf59"]]), cr = { class: "dc-types-panel__list" }, ur = ["id", "checked", "onChange"], dr = ["for"], fr = ["title", "onClick"], vr = { class: "dc-types-panel__count dc-mono" }, pr = /* @__PURE__ */ j({
  __name: "ShellTypes",
  setup(e) {
    const t = te();
    function n(m) {
      return de(
        ee(m).map((h) => h.filter((v) => !(v.kind === "field" && v.field === "entity"))).filter((h) => h.length > 0)
      );
    }
    const a = f(() => {
      const m = ee(t.query.value.expr);
      return m.length !== 1 ? /* @__PURE__ */ new Set() : new Set(
        m[0].flatMap(
          (h) => h.kind === "field" && h.field === "entity" && h.negated ? [h.value.toLowerCase()] : []
        )
      );
    }), s = f(() => n(t.query.value.expr)), l = za({
      source: t.source,
      schema: t.schema,
      query: f(() => ({ ...t.liveQuery.value, expr: n(t.liveQuery.value.expr) })),
      entities: t.entities,
      within: t.within
    });
    Ge(() => l.refresh()), ne(() => [s.value, t.within.value, t.source.value], () => l.refresh());
    function o(m) {
      if (l.pristine.value) return ct(m);
      const h = l.counts.value.get(m.key);
      return h?.counted ? `${h.pending ? "~" : ""}${Ne(h.total)}` : ct(m);
    }
    const r = f(
      () => t.entities.value.filter(
        (m) => m.key === t.query.value.entity || (typeof m.count == "number" ? m.count > 0 : !!m.count)
      )
    );
    function i(m) {
      const h = t.query.value.entity;
      return h ? h === m.key : !a.value.has(m.key.toLowerCase());
    }
    function c(m) {
      const h = r.value.map((C) => C.key);
      if (m.length === 1) return { expr: s.value, entity: m[0] };
      const S = h.filter((C) => !m.includes(C)).map((C) => `-entity:${C}`).join(" ");
      return { expr: [s.value, S].filter(Boolean).join(" "), entity: null };
    }
    function u(m) {
      const h = r.value.filter((A) => i(A)).map((A) => A.key), v = h.includes(m.key) ? h.filter((A) => A !== m.key) : [...h, m.key];
      if (v.length === 0) return;
      const { expr: S, entity: C } = c(v);
      t.narrow(S, C);
    }
    function g(m) {
      const { expr: h, entity: v } = c([m.key]);
      t.narrow(h, v);
    }
    const _ = `dc-types-${Math.random().toString(36).slice(2, 8)}`;
    return (m, h) => r.value.length > 1 ? (d(), p("section", {
      key: 0,
      class: "dc-types-panel",
      "aria-labelledby": _
    }, [
      b("h3", {
        id: _,
        class: "dc-types-panel__heading"
      }, " Types "),
      b("ul", cr, [
        (d(!0), p(z, null, X(r.value, (v) => (d(), p("li", {
          key: v.key,
          class: "dc-types-panel__type"
        }, [
          b("input", {
            id: `${_}-${v.key}`,
            type: "checkbox",
            class: "dc-types-panel__box",
            checked: i(v),
            onChange: (S) => u(v)
          }, null, 40, ur),
          b("label", {
            for: `${_}-${v.key}`,
            class: "dc-types-panel__name"
          }, L(v.label), 9, dr),
          b("button", {
            type: "button",
            class: "dc-types-panel__only",
            title: `Only ${v.label}`,
            onClick: (S) => g(v)
          }, " only ", 8, fr),
          b("span", vr, L(o(v)), 1)
        ]))), 128))
      ])
    ])) : O("", !0);
  }
}), hr = /* @__PURE__ */ Q(pr, [["__scopeId", "data-v-32178b7f"]]);
function mr(e, t) {
  if (!e) return null;
  const n = ie(e, t);
  return typeof n == "string" && n.trim() ? n : null;
}
const yr = (e) => e == null || typeof e == "string" && !e.trim();
function gr(e, t) {
  const n = pe(t, "state"), a = pe(t, "tint");
  return {
    identity: xt(pe(t, "identity"), e),
    reference: xt(pe(t, "reference"), e),
    metrics: da(t, "metric").map((s) => ({
      column: s,
      label: s.label ?? "",
      text: Me(s, e)
    })),
    facts: t.filter((s) => s.cardLabel && !yr(ie(s, e))).map((s) => ({
      column: s,
      label: s.cardLabel,
      title: [s.label, s.hint].filter(Boolean).join(" — "),
      text: Me(s, e)
    })),
    state: n ? ie(n, e) ?? null : null,
    updated: xt(pe(t, "updated"), e),
    image: mr(pe(t, "image"), e),
    tint: a ? ie(a, e) ?? null : null
  };
}
function ja(e, t, n, a, s = !1) {
  const l = n?.columns ?? [];
  return {
    row: e,
    key: Ms(e, t),
    entityLabel: e.entityLabel,
    entity: n,
    columns: l,
    ordinal: ws(t),
    parts: gr(e, l),
    pinned: a,
    selected: s
  };
}
function Re() {
  const e = te(), t = f(
    () => new Map(e.entities.value.map((n) => [n.key, n]))
  );
  return f(
    () => e.rows.value.map(
      (n, a) => ja(
        n,
        e.offset.value + a,
        t.value.get(n.entityKey) ?? null,
        e.isPinned(n),
        e.isSelected(n)
      )
    )
  );
}
const _r = ["data-dc-status", "data-dc-tone"], wr = /* @__PURE__ */ j({
  __name: "StatusPill",
  props: {
    status: {},
    tone: {},
    label: {}
  },
  setup(e) {
    const t = e, n = f(() => t.label ?? t.status ?? "");
    return (a, s) => (d(), p("span", {
      class: "dc-pill",
      "data-dc-status": e.status,
      "data-dc-tone": e.tone
    }, L(n.value), 9, _r));
  }
}), Qe = /* @__PURE__ */ Q(wr, [["__scopeId", "data-v-686eb9b6"]]), kr = { key: 1 }, br = /* @__PURE__ */ j({
  __name: "MetricDrill",
  props: {
    entry: {},
    column: {}
  },
  setup(e) {
    const t = e, n = te(), a = f(() => !t.entry.entity?.scope || !t.column.drill ? null : n.entities.value.find((g) => g.key === t.column.drill) ?? null), s = f(() => !!t.column.click), l = f(() => t.column.label ?? ""), o = f(() => Me(t.column, t.entry.row)), r = f(() => s.value ? t.column.clickHref?.(t.entry.row) ?? null : a.value ? n.drillHref(t.entry.row, a.value, t.column.drillWhere) : null), i = f(() => a.value && !s.value ? `${l.value} of ${t.entry.parts.identity} — show the ${a.value.label.toLowerCase()}` : `${l.value} of ${t.entry.parts.identity}`);
    function c(u, g) {
      g.stopPropagation(), s.value ? t.column.click?.(t.entry.row, u) : a.value && n.drill(t.entry.row, a.value, u, t.column.drillWhere);
    }
    return (u, g) => a.value || s.value ? (d(), H(se, {
      key: 0,
      class: "dc-drill",
      href: r.value,
      title: i.value,
      onPress: c
    }, {
      default: Y(() => [
        G(u.$slots, "default", {}, () => [
          Z(L(o.value), 1)
        ], !0)
      ]),
      _: 3
    }, 8, ["href", "title"])) : (d(), p("span", kr, [
      G(u.$slots, "default", {}, () => [
        Z(L(o.value), 1)
      ], !0)
    ]));
  }
}), mt = /* @__PURE__ */ Q(br, [["__scopeId", "data-v-bbbd334b"]]), $r = ["data-dc-active", "aria-pressed", "aria-label"], xr = /* @__PURE__ */ j({
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
    return (s, l) => (d(), p("button", {
      type: "button",
      class: "dc-star",
      "data-dc-active": e.pinned ? "true" : "false",
      "aria-pressed": e.pinned,
      "aria-label": e.pinned ? `Unpin ${e.name}` : `Pin ${e.name}`,
      onClick: a
    }, L(e.pinned ? "★" : "☆"), 9, $r));
  }
}), Cn = /* @__PURE__ */ Q(xr, [["__scopeId", "data-v-ef63d763"]]), Sr = ["src"], Cr = /* @__PURE__ */ j({
  __name: "RowPicture",
  props: {
    src: {}
  },
  setup(e) {
    const t = e, n = q(!1);
    return ne(
      () => t.src,
      () => {
        n.value = !1;
      }
    ), (a, s) => e.src.trim() && !n.value ? (d(), p("img", {
      key: 0,
      class: "dc-picture",
      src: e.src,
      alt: "",
      loading: "lazy",
      decoding: "async",
      onError: s[0] || (s[0] = (l) => n.value = !0)
    }, null, 40, Sr)) : O("", !0);
  }
}), Qt = /* @__PURE__ */ Q(Cr, [["__scopeId", "data-v-afaab300"]]), Pr = ["data-dc-standing", "title", "aria-label"], Mr = /* @__PURE__ */ j({
  __name: "QueryMark",
  props: {
    entry: {}
  },
  setup(e) {
    const t = e, n = te(), a = f(() => jt(t.entry.entity, t.entry.row)), s = f(() => Aa(n.query.value.expr, a.value)), l = f(
      () => s.value === "in" ? `The query narrows to ${t.entry.parts.identity} — press to lift that` : `The query leaves out ${t.entry.parts.identity} — press to lift that`
    );
    function o(r) {
      r.stopPropagation(), n.setExpression(xn(n.query.value.expr, a.value));
    }
    return (r, i) => s.value ? (d(), p("button", {
      key: 0,
      type: "button",
      class: "dc-standing",
      "data-dc-standing": s.value,
      title: l.value,
      "aria-label": l.value,
      onClick: o
    }, L(s.value === "in" ? "+" : "−"), 9, Pr)) : O("", !0);
  }
}), yt = /* @__PURE__ */ Q(Mr, [["__scopeId", "data-v-4b8d4166"]]), Er = ["href", "title", "aria-label"], Lr = /* @__PURE__ */ j({
  __name: "OpenMark",
  props: {
    entry: {}
  },
  setup(e) {
    const t = e, n = te(), a = f(() => {
      const s = t.entry.row, l = n.recordHref?.(s) ?? null;
      return l ? n.pressHref(s) === l ? null : l : null;
    });
    return (s, l) => a.value ? (d(), p("a", {
      key: 0,
      class: "dc-open",
      href: a.value,
      target: "_blank",
      rel: "noopener noreferrer",
      title: a.value,
      "aria-label": `Open ${e.entry.parts.identity} in a new tab`,
      onClick: l[0] || (l[0] = xe(() => {
      }, ["stop"]))
    }, "↗", 8, Er)) : O("", !0);
  }
}), gt = /* @__PURE__ */ Q(Lr, [["__scopeId", "data-v-b00f390d"]]), Tr = /* @__PURE__ */ j({
  __name: "ScopeMark",
  props: {
    entry: {}
  },
  setup(e) {
    const t = e, n = te(), a = f(
      () => n.narrowsOnPress.value ? null : t.entry.entity?.scope ?? null
    ), s = q(null);
    function l(u) {
      s.value = dt(u).exclude ? "out" : "in";
    }
    function o(u) {
      l(u), window.addEventListener("keydown", l), window.addEventListener("keyup", l);
    }
    function r() {
      s.value = null, window.removeEventListener("keydown", l), window.removeEventListener("keyup", l);
    }
    ke(r);
    const i = f(() => a.value ? n.drillHref(t.entry.row, null) : null);
    function c(u, g) {
      g.stopPropagation(), n.drill(t.entry.row, null, u);
    }
    return (u, g) => a.value ? (d(), H(se, {
      key: 0,
      class: "dc-scope",
      href: i.value,
      "data-dc-pending": s.value ?? void 0,
      title: `Narrow everything to ${a.value}: ${e.entry.row.id} — ⌥-click to leave it out`,
      "aria-label": `Narrow everything to ${e.entry.parts.identity}`,
      onPointerenter: o,
      onPointermove: l,
      onPointerleave: r,
      onPress: c
    }, {
      default: Y(() => [...g[0] || (g[0] = [
        Z(" → ", -1)
      ])]),
      _: 1
    }, 8, ["href", "data-dc-pending", "title", "aria-label"])) : O("", !0);
  }
}), _t = /* @__PURE__ */ Q(Tr, [["__scopeId", "data-v-05d2c233"]]), Or = ["checked", "aria-label"], He = /* @__PURE__ */ j({
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
    return (s, l) => (d(), p("input", {
      class: "dc-tick",
      type: "checkbox",
      checked: e.selected,
      "aria-label": `Select ${e.name}`,
      onClick: a
    }, null, 8, Or));
  }
}), Ar = { class: "dc-card__top dc-mono" }, Nr = { class: "dc-card__lead" }, Ir = {
  key: 2,
  class: "dc-card__entity"
}, Br = { class: "dc-card__top-right" }, Rr = { class: "dc-card__names" }, Hr = { class: "dc-card__primary" }, qr = {
  key: 0,
  class: "dc-card__secondary dc-mono"
}, Vr = {
  key: 1,
  class: "dc-card__facts dc-mono"
}, Fr = ["title"], Dr = { class: "dc-card__fact-label" }, Kr = {
  key: 0,
  class: "dc-card__metrics dc-mono"
}, Wr = {
  key: 0,
  class: "dc-card__date"
}, zr = /* @__PURE__ */ j({
  __name: "CardsView",
  setup(e) {
    const t = te(), n = Re(), a = f(() => t.isEverything.value), s = (o) => o.entity?.card === "picture", l = f(() => n.value.length > 0 && n.value.every(s));
    return (o, r) => (d(), p("div", {
      class: oe(["dc-cards", { "dc-cards--pictures": l.value }])
    }, [
      (d(!0), p(z, null, X(k(n), (i) => (d(), p("div", {
        key: i.key,
        class: oe(["dc-card", { "dc-card--picture": s(i) }])
      }, [
        b("div", Ar, [
          b("span", Nr, [
            k(t).selectable.value ? (d(), H(He, {
              key: 0,
              row: i.row,
              selected: i.selected,
              name: i.parts.identity
            }, null, 8, ["row", "selected", "name"])) : O("", !0),
            s(i) ? O("", !0) : (d(), p(z, { key: 1 }, [
              Z(L(i.ordinal), 1)
            ], 64)),
            a.value ? (d(), p("span", Ir, L(i.entityLabel), 1)) : O("", !0)
          ]),
          b("span", Br, [
            i.parts.state && !s(i) ? (d(), H(Qe, {
              key: 0,
              status: i.parts.state
            }, null, 8, ["status"])) : O("", !0),
            U(yt, { entry: i }, null, 8, ["entry"]),
            U(_t, { entry: i }, null, 8, ["entry"]),
            U(gt, { entry: i }, null, 8, ["entry"]),
            k(t).pinnable.value ? (d(), H(Cn, {
              key: 1,
              row: i.row,
              name: i.parts.identity,
              pinned: i.pinned
            }, null, 8, ["row", "name", "pinned"])) : O("", !0)
          ])
        ]),
        U(se, {
          class: "dc-card__open",
          href: k(t).pressHref(i.row),
          onPress: (c) => k(t).activate(i.row, c)
        }, {
          default: Y(() => [
            i.parts.image ? (d(), H(Qt, {
              key: 0,
              class: "dc-card__image",
              src: i.parts.image
            }, null, 8, ["src"])) : O("", !0),
            b("span", Rr, [
              b("span", Hr, L(i.parts.identity), 1),
              s(i) ? O("", !0) : (d(), p("span", qr, L(i.parts.reference), 1)),
              i.parts.facts.length ? (d(), p("span", Vr, [
                (d(!0), p(z, null, X(i.parts.facts, (c) => (d(), p("span", {
                  key: c.column.key ?? c.label,
                  class: "dc-card__fact",
                  title: c.title || void 0
                }, [
                  b("span", Dr, L(c.label), 1),
                  Z(" " + L(c.text), 1)
                ], 8, Fr))), 128))
              ])) : O("", !0)
            ])
          ]),
          _: 2
        }, 1032, ["href", "onPress"]),
        s(i) ? O("", !0) : (d(), p("div", Kr, [
          (d(!0), p(z, null, X(i.parts.metrics.slice(0, 2), (c) => (d(), H(mt, {
            key: c.column.key ?? c.label,
            entry: i,
            column: c.column
          }, {
            default: Y(() => [
              Z(L(c.label) + " " + L(c.text), 1)
            ]),
            _: 2
          }, 1032, ["entry", "column"]))), 128)),
          i.parts.updated ? (d(), p("span", Wr, L(i.parts.updated), 1)) : O("", !0)
        ]))
      ], 2))), 128))
    ], 2));
  }
}), Ua = /* @__PURE__ */ Q(zr, [["__scopeId", "data-v-a90319f2"]]), jr = { class: "dc-grid" }, Ur = { class: "dc-tile__scrim" }, Qr = { class: "dc-tile__top dc-mono" }, Gr = { class: "dc-tile__chip" }, Yr = { class: "dc-tile__caption" }, Xr = { class: "dc-tile__secondary dc-truncate" }, Jr = { class: "dc-tile__primary" }, Zr = /* @__PURE__ */ j({
  __name: "GridView",
  setup(e) {
    const t = te(), n = Re();
    return (a, s) => (d(), p("div", jr, [
      (d(!0), p(z, null, X(k(n), (l) => (d(), p("div", {
        key: l.key,
        class: "dc-grid__cell"
      }, [
        U(se, {
          class: "dc-tile",
          style: ae({ "--dc-tile-tint": l.parts.tint ?? void 0 }),
          href: k(t).pressHref(l.row),
          onPress: (o) => k(t).activate(l.row, o)
        }, {
          default: Y(() => [
            l.parts.image ? (d(), H(Qt, {
              key: 0,
              class: "dc-tile__image",
              src: l.parts.image
            }, null, 8, ["src"])) : O("", !0),
            b("span", Ur, [
              b("span", Qr, [
                b("span", Gr, L(l.ordinal), 1)
              ]),
              b("span", Yr, [
                b("span", Xr, L(l.parts.reference), 1),
                b("span", Jr, L(l.parts.identity), 1)
              ])
            ])
          ]),
          _: 2
        }, 1032, ["style", "href", "onPress"]),
        k(t).selectable.value ? (d(), H(He, {
          key: 0,
          class: "dc-grid__tick",
          row: l.row,
          selected: l.selected,
          name: l.parts.identity
        }, null, 8, ["row", "selected", "name"])) : O("", !0)
      ]))), 128))
    ]));
  }
}), Qa = /* @__PURE__ */ Q(Zr, [["__scopeId", "data-v-89c40a9e"]]);
function ea(e, t, n, a) {
  return (n - a * (t - 1)) / e;
}
function sn(e, t) {
  return e > 0 ? Math.min(t, e) : t;
}
function ei(e) {
  return e > 0 ? e : 1 / 0;
}
function ti(e, t, n) {
  const { width: a, height: s, gap: l = 0 } = n;
  if (!e.length) return [];
  if (!(a > 0) || !(s > 0)) return [{ items: [...e], height: s, filled: !1 }];
  const o = [];
  let r = [], i = 0, c = 0;
  for (const u of e) {
    const g = t(u), _ = Math.max(g.ratio, Number.EPSILON), m = g.height && g.height > 0 ? Math.max(c, g.height) : c, h = sn(m, s), v = ea(i + _, r.length + 1, a, l);
    if (v > h) {
      r.push(u), i += _, c = m;
      continue;
    }
    const S = sn(c, s), C = r.length ? ea(i, r.length, a, l) : 1 / 0;
    C <= ei(c) && C - S < h - v ? (o.push({ items: r, height: C, filled: !0 }), r = [u], i = _, c = g.height && g.height > 0 ? g.height : 0) : (o.push({ items: [...r, u], height: v, filled: !0 }), r = [], i = 0, c = 0);
  }
  return r.length && o.push({ items: r, height: sn(c, s), filled: !1 }), o;
}
const ni = { class: "dc-images" }, ai = {
  key: 1,
  class: "dc-images__blank",
  "aria-hidden": "true"
}, si = 240, kt = 8, li = 1, oi = /* @__PURE__ */ j({
  __name: "ImagesView",
  setup(e) {
    const t = te(), n = Re(), a = En(/* @__PURE__ */ new Map()), s = En(/* @__PURE__ */ new Set());
    function l(h, v) {
      const S = v.target;
      S.naturalWidth > 0 && S.naturalHeight > 0 && a.set(h, { width: S.naturalWidth, height: S.naturalHeight });
    }
    function o(h) {
      const v = h.parts.image;
      return v && !s.has(v) ? v : null;
    }
    function r(h) {
      const v = o(h);
      return v ? a.get(v) : void 0;
    }
    function i(h) {
      const v = r(h);
      return v ? { ratio: v.width / v.height, height: v.height } : { ratio: li };
    }
    const c = q(null), u = q(0);
    let g = null;
    function _() {
      u.value = c.value?.clientWidth ?? 0;
    }
    Ge(() => {
      _(), !(!c.value || typeof ResizeObserver > "u") && (g = new ResizeObserver(_), g.observe(c.value));
    }), ke(() => {
      g?.disconnect(), g = null;
    });
    const m = f(() => {
      const h = ti(n.value, i, {
        width: u.value,
        height: si,
        gap: kt
      }), v = [];
      let S = 0;
      for (const C of h) {
        let A = 0;
        for (const y of C.items) {
          const w = i(y).ratio * C.height, M = r(y), E = M !== void 0 && M.height < C.height;
          v.push({
            entry: y,
            style: {
              top: `${S}px`,
              left: `${A}px`,
              width: `${w}px`,
              height: `${C.height}px`
            },
            picture: E ? { width: `${M.width}px`, height: `${M.height}px` } : { width: "100%", height: "100%" }
          }), A += w + kt;
        }
        S += C.height + kt;
      }
      return { boxes: v, height: h.length ? S - kt : 0 };
    });
    return (h, v) => (d(), p("div", ni, [
      b("div", {
        ref_key: "wall",
        ref: c,
        class: "dc-images__wall",
        style: ae({ height: `${m.value.height}px` })
      }, [
        (d(!0), p(z, null, X(m.value.boxes, ({ entry: S, style: C, picture: A }) => (d(), p("div", {
          key: S.key,
          class: "dc-images__cell",
          style: ae(C)
        }, [
          U(se, {
            class: "dc-images__open",
            title: S.parts.identity,
            "aria-label": S.parts.identity,
            href: k(t).pressHref(S.row),
            onPress: (y) => k(t).activate(S.row, y)
          }, {
            default: Y(() => [
              o(S) ? (d(), H(Qt, {
                key: 0,
                class: "dc-images__picture",
                style: ae(A),
                src: o(S),
                onLoad: (y) => l(o(S), y),
                onError: (y) => s.add(o(S))
              }, null, 8, ["style", "src", "onLoad", "onError"])) : (d(), p("span", ai, L(S.parts.identity), 1))
            ]),
            _: 2
          }, 1032, ["title", "aria-label", "href", "onPress"]),
          k(t).selectable.value ? (d(), H(He, {
            key: 0,
            class: "dc-images__tick",
            row: S.row,
            selected: S.selected,
            name: S.parts.identity
          }, null, 8, ["row", "selected", "name"])) : O("", !0)
        ], 4))), 128))
      ], 4)
    ]));
  }
}), Ga = /* @__PURE__ */ Q(oi, [["__scopeId", "data-v-2d267370"]]), ri = { class: "dc-links" }, ii = { class: "dc-link__primary dc-truncate" }, ci = { class: "dc-link__secondary dc-mono dc-truncate" }, ui = /* @__PURE__ */ j({
  __name: "LinksView",
  setup(e) {
    const t = te(), n = Re();
    return (a, s) => (d(), p("div", ri, [
      (d(!0), p(z, null, X(k(n), (l) => (d(), p("span", {
        key: l.key,
        class: "dc-links__item"
      }, [
        k(t).selectable.value ? (d(), H(He, {
          key: 0,
          row: l.row,
          selected: l.selected,
          name: l.parts.identity
        }, null, 8, ["row", "selected", "name"])) : O("", !0),
        U(se, {
          class: "dc-link",
          href: k(t).pressHref(l.row),
          onPress: (o) => k(t).activate(l.row, o)
        }, {
          default: Y(() => [
            b("span", ii, L(l.parts.identity), 1),
            b("span", ci, L(l.parts.reference), 1)
          ]),
          _: 2
        }, 1032, ["href", "onPress"])
      ]))), 128))
    ]));
  }
}), Ya = /* @__PURE__ */ Q(ui, [["__scopeId", "data-v-de6c9a0f"]]), di = {
  class: "dc-list",
  role: "list"
}, fi = { class: "dc-list__ordinal dc-mono" }, vi = { class: "dc-list__identity" }, pi = ["title"], hi = ["title"], mi = {
  key: 1,
  class: "dc-list__entity dc-mono"
}, yi = { class: "dc-list__metrics dc-mono" }, gi = { class: "dc-list__trailing" }, _i = /* @__PURE__ */ j({
  __name: "ListView",
  setup(e) {
    const t = te(), n = Re(), a = f(() => t.isEverything.value);
    return (s, l) => (d(), p("div", di, [
      (d(!0), p(z, null, X(k(n), (o) => (d(), p("div", {
        key: o.key,
        class: "dc-list__row",
        role: "listitem"
      }, [
        k(t).selectable.value ? (d(), H(He, {
          key: 0,
          class: "dc-list__tick",
          row: o.row,
          selected: o.selected,
          name: o.parts.identity
        }, null, 8, ["row", "selected", "name"])) : O("", !0),
        U(se, {
          class: "dc-list__open",
          href: k(t).pressHref(o.row),
          onPress: (r) => k(t).activate(o.row, r)
        }, {
          default: Y(() => [
            b("span", fi, L(o.ordinal), 1),
            b("span", vi, [
              b("span", {
                class: "dc-list__primary dc-truncate",
                title: o.parts.identity
              }, L(o.parts.identity), 9, pi),
              b("span", {
                class: "dc-list__secondary dc-mono dc-truncate",
                title: o.parts.reference || void 0
              }, L(o.parts.reference), 9, hi)
            ])
          ]),
          _: 2
        }, 1032, ["href", "onPress"]),
        a.value ? (d(), p("span", mi, L(o.entityLabel), 1)) : O("", !0),
        b("span", yi, [
          (d(!0), p(z, null, X(o.parts.metrics.slice(0, 2), (r) => (d(), H(mt, {
            key: r.column.key ?? r.label,
            entry: o,
            column: r.column
          }, null, 8, ["entry", "column"]))), 128))
        ]),
        b("span", gi, [
          o.parts.state ? (d(), H(Qe, {
            key: 0,
            status: o.parts.state
          }, null, 8, ["status"])) : O("", !0),
          U(yt, { entry: o }, null, 8, ["entry"]),
          U(_t, { entry: o }, null, 8, ["entry"]),
          U(gt, { entry: o }, null, 8, ["entry"]),
          k(t).pinnable.value ? (d(), H(Cn, {
            key: 1,
            row: o.row,
            name: o.parts.identity,
            pinned: o.pinned
          }, null, 8, ["row", "name", "pinned"])) : O("", !0)
        ])
      ]))), 128))
    ]));
  }
}), pn = /* @__PURE__ */ Q(_i, [["__scopeId", "data-v-ca54d88f"]]), wi = { class: "dc-preview" }, ki = { class: "dc-preview__pager dc-mono" }, bi = ["disabled"], $i = { "aria-live": "polite" }, xi = ["disabled"], Si = {
  key: 0,
  class: "dc-preview__card"
}, Ci = ["src"], Pi = { class: "dc-preview__body" }, Mi = { class: "dc-preview__top" }, Ei = { class: "dc-preview__badges" }, Li = { class: "dc-preview__entity dc-mono" }, Ti = { class: "dc-preview__marks" }, Oi = { class: "dc-preview__primary" }, Ai = { class: "dc-preview__secondary dc-mono" }, Ni = { class: "dc-preview__fields" }, Ii = { class: "dc-preview__key" }, Bi = { class: "dc-preview__value dc-mono" }, Ri = /* @__PURE__ */ j({
  __name: "PreviewView",
  setup(e) {
    const t = te(), n = Re(), a = q(0);
    ne(n, (i) => {
      a.value > i.length - 1 && (a.value = Math.max(0, i.length - 1));
    });
    const s = f(() => n.value[a.value]), l = f(() => {
      const i = s.value;
      if (!i) return [];
      const c = pe(i.columns, "reference"), u = pe(i.columns, "updated");
      return [
        ...c ? [{ key: c.label ?? "Reference", value: i.parts.reference, column: null }] : [],
        ...i.parts.metrics.map((g) => ({
          key: g.label,
          value: g.text,
          column: g.column
        })),
        ...u ? [{ key: u.label ?? "Updated", value: i.parts.updated, column: null }] : []
      ];
    }), o = f(() => {
      if (!n.value.length) return "0 / 0";
      const i = t.total.value > n.value.length ? ` of ${t.total.value}` : "";
      return `${a.value + 1} / ${n.value.length}${i}`;
    }), r = (i) => {
      const c = n.value.length;
      c && (a.value = Math.min(c - 1, Math.max(0, a.value + i)));
    };
    return (i, c) => (d(), p("div", wi, [
      b("div", ki, [
        b("button", {
          type: "button",
          class: "dc-preview__step",
          "aria-label": "Previous result",
          disabled: a.value === 0,
          onClick: c[0] || (c[0] = (u) => r(-1))
        }, " ‹ ", 8, bi),
        b("span", $i, L(o.value), 1),
        b("button", {
          type: "button",
          class: "dc-preview__step",
          "aria-label": "Next result",
          disabled: a.value >= k(n).length - 1,
          onClick: c[1] || (c[1] = (u) => r(1))
        }, " › ", 8, xi)
      ]),
      s.value ? (d(), p("div", Si, [
        b("div", {
          class: "dc-preview__media",
          style: ae({ background: s.value.parts.tint ?? void 0 }),
          "aria-hidden": "true"
        }, [
          s.value.parts.image ? (d(), p("img", {
            key: 0,
            class: "dc-preview__image",
            src: s.value.parts.image,
            alt: ""
          }, null, 8, Ci)) : (d(), p(z, { key: 1 }, [
            Z(" preview ")
          ], 64))
        ], 4),
        b("div", Pi, [
          b("div", Mi, [
            b("span", Ei, [
              k(t).selectable.value ? (d(), H(He, {
                key: 0,
                row: s.value.row,
                selected: s.value.selected,
                name: s.value.parts.identity
              }, null, 8, ["row", "selected", "name"])) : O("", !0),
              s.value.parts.state ? (d(), H(Qe, {
                key: 1,
                status: s.value.parts.state
              }, null, 8, ["status"])) : O("", !0),
              b("span", Li, L(s.value.entityLabel), 1)
            ]),
            b("span", Ti, [
              U(yt, { entry: s.value }, null, 8, ["entry"]),
              U(_t, { entry: s.value }, null, 8, ["entry"]),
              U(gt, { entry: s.value }, null, 8, ["entry"]),
              k(t).pinnable.value ? (d(), H(Cn, {
                key: 0,
                row: s.value.row,
                name: s.value.parts.identity,
                pinned: s.value.pinned
              }, null, 8, ["row", "name", "pinned"])) : O("", !0)
            ])
          ]),
          b("div", null, [
            b("div", Oi, L(s.value.parts.identity), 1),
            b("div", Ai, L(s.value.parts.reference), 1)
          ]),
          b("dl", Ni, [
            (d(!0), p(z, null, X(l.value, (u) => (d(), p("div", {
              key: u.key,
              class: "dc-preview__field"
            }, [
              b("dt", Ii, L(u.key), 1),
              b("dd", Bi, [
                u.column && s.value ? (d(), H(mt, {
                  key: 0,
                  entry: s.value,
                  column: u.column
                }, null, 8, ["entry", "column"])) : (d(), p(z, { key: 1 }, [
                  Z(L(u.value), 1)
                ], 64))
              ])
            ]))), 128))
          ]),
          U(se, {
            class: "dc-preview__open",
            href: s.value ? k(t).pressHref(s.value.row) : null,
            onPress: c[2] || (c[2] = (u) => s.value && k(t).activate(s.value.row, u))
          }, {
            default: Y(() => [...c[3] || (c[3] = [
              Z(" Open record → ", -1)
            ])]),
            _: 1
          }, 8, ["href"])
        ])
      ])) : O("", !0)
    ]));
  }
}), Xa = /* @__PURE__ */ Q(Ri, [["__scopeId", "data-v-59e0d33b"]]);
function Hi(e) {
  const t = ee(e);
  if (t.length !== 1) return /* @__PURE__ */ new Set();
  const n = /* @__PURE__ */ new Map();
  for (const a of t[0]) {
    if (a.kind !== "field" || a.negated || je(a) || a.comparator !== "=" && a.comparator !== ":") continue;
    const s = a.field.toLowerCase();
    n.set(s, [...n.get(s) ?? [], a]);
  }
  return new Set(
    [...n].flatMap(
      ([a, s]) => s.length === 1 && s[0].comparator === "=" ? [a] : []
    )
  );
}
function qi(e, t, n) {
  const a = Hi(t);
  return a.size ? e.filter((s) => {
    const l = (s.key ?? s.field)?.toLowerCase();
    return l === void 0 || !a.has(l) || s.role === "identity" || n.some((o) => Array.isArray(ie(s, o))) ? !0 : new Set(n.map((o) => Me(s, o))).size > 1;
  }) : e;
}
function Vi() {
  const e = te();
  return f(
    () => qi(
      Cs(e.schema.value, e.entity.value),
      e.liveQuery.value.expr,
      e.rows.value
    )
  );
}
function Ja(e, t) {
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
function Za(e, t) {
  const n = e.narrowsOnPress.value ? jt(t.entity, t.row) : null;
  return n ? { term: n, name: t.parts.identity, alone: t.entity?.narrowsAlone === !0 } : null;
}
const Fi = /* @__PURE__ */ j({
  __name: "CellNarrow",
  props: {
    entry: {},
    column: {},
    narrowings: {},
    truncates: { type: Boolean }
  },
  setup(e) {
    const t = e, n = te(), a = f(() => Me(t.column, t.entry.row));
    function s(u, g = !1) {
      return u.entity !== void 0 ? `entity:${u.entity}` : we({ ...u.term, ...g ? { negated: !0 } : {} });
    }
    function l(u, g = !1) {
      return u.entity !== void 0 ? n.query.value.expr : it(n.query.value.expr, s(u, g));
    }
    function o(u) {
      return u.entity ?? n.query.value.entity;
    }
    function r(u) {
      return n.narrowHref(l(u), o(u));
    }
    function i(u) {
      return u.entity !== void 0 ? `Show ${n.schema.value.entities.find((_) => _.key === u.entity)?.label ?? a.value} only` : `Narrow to ${s(u)}
⌥-press to leave these out`;
    }
    function c(u, g, _) {
      _.stopPropagation(), n.narrow(l(u, g.exclude), o(u));
    }
    return (u, g) => (d(), p("span", {
      class: oe(["dc-cell__text", { "dc-truncate": e.truncates }])
    }, [
      (d(!0), p(z, null, X(e.narrowings, (_, m) => (d(), p(z, {
        key: s(_)
      }, [
        m > 0 ? (d(), p(z, { key: 0 }, [
          Z(", ")
        ], 64)) : O("", !0),
        U(se, {
          class: "dc-narrow",
          href: r(_),
          title: i(_),
          selectable: "",
          onPress: (h, v) => c(_, h, v)
        }, {
          default: Y(() => [
            G(u.$slots, "default", {}, () => [
              Z(L(_.label ?? a.value), 1)
            ], !0)
          ]),
          _: 2
        }, 1032, ["href", "title", "onPress"])
      ], 64))), 128))
    ], 2));
  }
}), ta = /* @__PURE__ */ Q(Fi, [["__scopeId", "data-v-651b03c2"]]), Di = /* @__PURE__ */ new Set(["entitykey", "entitylabel"]), Ki = /* @__PURE__ */ new Set(["ordinal", "image", "component", "date"]), Wi = 4;
function es(e) {
  return (e.field ?? e.key)?.toLowerCase();
}
function ts(e) {
  return e.narrow === !1 || e.role === "identity" || e.activate || e.click || e.drill ? !1 : !Ki.has(e.kind ?? "text") && es(e) !== void 0;
}
function zi(e, t) {
  if (Number.isInteger(e)) return e;
  const n = 10 ** Wi;
  return (t ? Math.ceil(e * n - 1e-6) : Math.floor(e * n + 1e-6)) / n;
}
function ji(e, t) {
  let n = 1 / 0, a = -1 / 0;
  for (const s of t) {
    const l = ie(e, s);
    typeof l != "number" || !Number.isFinite(l) || (l < n && (n = l), l > a && (a = l));
  }
  return n <= a ? { min: n, max: a } : null;
}
function Ui(e, t, n, a = null) {
  if (!ts(e)) return [];
  const s = es(e);
  if (Di.has(s) && !e.value)
    return t.entityKey ? [{ label: null, entity: t.entityKey }] : [];
  if (e.flags)
    return Object.entries(e.flags).filter(([i]) => t.fields[i] === !0).map(([i, c]) => ({
      label: c,
      term: { kind: "field", field: i.toLowerCase(), comparator: ":", value: "true" }
    }));
  const l = ie(e, t), o = n?.facets.find((i) => i.key.toLowerCase() === s);
  if (typeof l == "number") {
    if (!Number.isFinite(l)) return [];
    const i = o?.kind === "range" ? { min: o.min, max: o.max } : a, c = e.narrow === "<=" || e.narrow !== ">=" && (!i || l - i.min <= i.max - l);
    return [{
      label: null,
      term: { kind: "field", field: s, comparator: c ? "<=" : ">=", value: String(zi(l, c)) }
    }];
  }
  return (Array.isArray(l) ? l : [l]).filter(
    (i) => typeof i == "string" && i !== ""
  ).map((i) => ({
    label: Array.isArray(l) ? i : null,
    term: { kind: "field", field: s, comparator: "=", value: i }
  }));
}
const na = /* @__PURE__ */ new WeakMap();
function Qi(e, t) {
  let n = na.get(e);
  return n || na.set(e, n = /* @__PURE__ */ new Map()), n.has(t) || n.set(t, ji(t, e)), n.get(t);
}
const Gi = /* @__PURE__ */ j({
  __name: "ColumnCell",
  props: {
    column: {},
    entry: {}
  },
  setup(e) {
    const t = e, n = te(), a = f(() => t.column.kind ?? "text"), s = f(() => ie(t.column, t.entry.row)), l = f(
      () => a.value === "ordinal" ? t.entry.ordinal : Me(t.column, t.entry.row)
    ), o = f(() => s.value), r = f(() => t.column.activate === !0 || !!t.column.click), i = f(() => ln(t.column)), c = f(() => fa(t.column, t.entry.row)), u = f(() => {
      if (!ts(t.column)) return [];
      const h = typeof s.value == "number" ? Qi(n.rows.value, t.column) : null;
      return Ui(t.column, t.entry.row, t.entry.entity ?? null, h);
    });
    function g(h) {
      r.value && (h.stopPropagation(), _(dt(h)));
    }
    function _(h) {
      t.column.click?.(t.entry.row, h), t.column.activate && n.activate(t.entry.row, h);
    }
    const m = f(() => t.column.click ? t.column.clickHref?.(t.entry.row) ?? null : t.column.activate ? n.pressHref(t.entry.row) : null);
    return (h, v) => a.value === "component" && e.column.component ? (d(), H(Ke(e.column.component), {
      key: 0,
      row: e.entry.row,
      entry: e.entry,
      value: s.value,
      column: e.column
    }, null, 8, ["row", "entry", "value", "column"])) : a.value === "status" && u.value.length ? (d(), H(ta, {
      key: 1,
      entry: e.entry,
      column: e.column,
      narrowings: u.value,
      truncates: !1
    }, {
      default: Y(() => [
        U(Qe, { status: o.value }, null, 8, ["status"])
      ]),
      _: 1
    }, 8, ["entry", "column", "narrowings"])) : a.value === "status" ? (d(), H(Qe, {
      key: 2,
      status: o.value
    }, null, 8, ["status"])) : a.value === "image" ? (d(), H(Qt, {
      key: 3,
      class: "dc-cell__image",
      src: typeof s.value == "string" ? s.value : "",
      style: ae({ maxHeight: e.column.height }),
      onClick: g
    }, null, 8, ["src", "style"])) : e.column.drill || e.column.click && e.column.role === "metric" ? (d(), H(mt, {
      key: 4,
      entry: e.entry,
      column: e.column
    }, null, 8, ["entry", "column"])) : r.value ? (d(), H(se, Oe({
      key: 5,
      class: ["dc-table__open", { "dc-truncate": i.value }],
      href: m.value,
      title: c.value
    }, ca(e.column.activate ? k(Ja)(k(n), k(Za)(k(n), e.entry)) : {}), {
      onPress: v[0] || (v[0] = (S, C) => {
        C.stopPropagation(), _(S);
      })
    }), {
      default: Y(() => [
        Z(L(l.value), 1)
      ]),
      _: 1
    }, 16, ["class", "href", "title"])) : u.value.length ? (d(), H(ta, {
      key: 6,
      entry: e.entry,
      column: e.column,
      narrowings: u.value,
      truncates: i.value
    }, null, 8, ["entry", "column", "narrowings", "truncates"])) : (d(), p("span", {
      key: 7,
      class: oe(["dc-cell__text", { "dc-truncate": i.value }])
    }, L(l.value), 3));
  }
}), aa = /* @__PURE__ */ Q(Gi, [["__scopeId", "data-v-d07057a1"]]), Yi = {
  key: 0,
  class: "dc-table__none"
}, Xi = { class: "dc-table__detail" }, Ji = ["data-dc-wrap", "data-dc-row-links"], Zi = { "data-dc-stuck": "" }, ec = {
  key: 0,
  class: "dc-table__pick",
  scope: "col"
}, tc = {
  key: 1,
  class: "dc-table__standing",
  scope: "col",
  "aria-label": "In the query"
}, nc = ["data-dc-align", "data-dc-hide", "aria-sort", "title"], ac = {
  key: 2,
  class: "dc-table__head"
}, sc = { "data-dc-scroll": "" }, lc = ["onClick"], oc = {
  key: 0,
  class: "dc-table__pick"
}, rc = {
  key: 1,
  class: "dc-table__standing"
}, ic = ["data-dc-align", "data-dc-hide", "title"], cc = {
  key: 1,
  class: "dc-table__name"
}, uc = /* @__PURE__ */ j({
  __name: "TableView",
  setup(e) {
    const t = te(), n = Re(), a = Vi();
    function s(E, I) {
      if (!t.rowLinks?.value || Na()) return;
      const $ = t.pressHref(E);
      if ($ && un(I)) {
        cn($, I);
        return;
      }
      t.activate(E, dt(I));
    }
    const l = f(() => t.rowLinks?.value ? new Map(n.value.map((E) => [E.key, t.pressHref(E.row)])) : /* @__PURE__ */ new Map()), o = f(
      () => a.value.find((E) => E.role === "identity") ?? a.value[0]
    );
    function r(E, I, $) {
      $.stopPropagation(), t.activate(E, I);
    }
    function i(E) {
      const I = ya(E, t.entity.value, t.schema.value), $ = I ? `Shortcut: ${I}` : void 0;
      return [E.hint, $].filter(Boolean).join(`
`) || void 0;
    }
    const c = f(() => {
      const E = a.value.find(($) => $.scope);
      return E || ((t.entity.value ? !!t.entity.value.href : t.entities.value.some(($) => $.href)) ? a.value.find(($) => $.activate) : void 0);
    }), u = (E) => Ea(E.entity, E.row), g = f(
      () => n.value.some((E) => Aa(t.query.value.expr, u(E)) !== null)
    ), _ = f(
      () => a.value.some((E) => E.kind === "image" || E.height !== void 0)
    );
    function m(E) {
      E && (t.query.value.sort === E ? t.toggleDirection() : t.setSort(E));
    }
    function h(E) {
      return E ? t.query.value.sort === E ? t.hrefFor({ dir: t.query.value.dir === "desc" ? "asc" : "desc" }) : t.hrefFor({ sort: E }) : null;
    }
    const v = f(() => t.entity.value?.label ?? "The result set"), S = f(() => new Set(t.sorts.value.map((E) => E.key))), C = (E) => E.sort !== void 0 && S.value.has(E.sort), A = (E) => {
      if (C(E))
        return t.query.value.sort !== E.sort ? "none" : t.query.value.dir === "desc" ? "descending" : "ascending";
    };
    function y(E) {
      return [
        In(E),
        E.muted ? "dc-table__muted" : "",
        E.mono ? "dc-mono" : "",
        ln(E) ? "dc-truncate" : ""
      ].filter(Boolean).join(" ");
    }
    function w(E, I) {
      if (!(!ln(E) || E.activate || E.click))
        return fa(E, I.row);
    }
    const M = f(
      () => a.value.length + (t.selectable.value ? 1 : 0) + (g.value ? 1 : 0)
    );
    return (E, I) => k(a).length ? (d(), p("table", {
      key: 1,
      class: "dc-table",
      "data-dc-wrap": _.value ? "" : void 0,
      "data-dc-row-links": k(t).rowLinks?.value ? "" : void 0,
      style: ae({ "--dc-table-tracks": M.value })
    }, [
      b("thead", Zi, [
        b("tr", null, [
          k(t).selectable.value ? (d(), p("th", ec, [
            U(Wa)
          ])) : O("", !0),
          g.value ? (d(), p("th", tc)) : O("", !0),
          (d(!0), p(z, null, X(k(a), ($, B) => (d(), p("th", {
            key: k(An)($, B),
            scope: "col",
            class: oe(k(In)($)),
            style: ae({ width: $.width }),
            "data-dc-align": k(Nn)($),
            "data-dc-hide": $.hideBelow,
            "aria-sort": A($),
            title: i($)
          }, [
            C($) ? (d(), H(se, {
              key: 0,
              class: "dc-table__sort",
              href: h($.sort),
              onPress: (T) => m($.sort)
            }, {
              default: Y(() => [
                Z(L($.label), 1)
              ]),
              _: 2
            }, 1032, ["href", "onPress"])) : (d(), p(z, { key: 1 }, [
              Z(L($.label), 1)
            ], 64)),
            $.header ? (d(), p("span", ac, [
              (d(), H(Ke($.header), {
                column: $,
                entity: k(t).entity.value
              }, null, 8, ["column", "entity"]))
            ])) : O("", !0)
          ], 14, nc))), 128))
        ])
      ]),
      b("tbody", sc, [
        (d(!0), p(z, null, X(k(n), ($) => (d(), p("tr", {
          key: $.key,
          class: "dc-table__row",
          onClick: (B) => s($.row, B)
        }, [
          k(t).selectable.value ? (d(), p("td", oc, [
            U(He, {
              row: $.row,
              selected: $.selected,
              name: $.parts.identity
            }, null, 8, ["row", "selected", "name"])
          ])) : O("", !0),
          g.value ? (d(), p("td", rc, [
            U(yt, { entry: $ }, null, 8, ["entry"])
          ])) : O("", !0),
          (d(!0), p(z, null, X(k(a), (B, T) => (d(), p("td", {
            key: k(An)(B, T),
            class: oe(y(B)),
            style: ae({ width: B.width }),
            "data-dc-align": k(Nn)(B),
            "data-dc-hide": B.hideBelow,
            title: w(B, $)
          }, [
            l.value.get($.key) ? (d(), H(se, Oe({
              key: 0,
              class: "dc-table__cell-link",
              href: l.value.get($.key),
              tabindex: B === o.value ? void 0 : -1,
              "aria-hidden": B === o.value ? void 0 : "true",
              "aria-label": B === o.value ? $.parts.identity : void 0
            }, ca(k(Ja)(k(t), k(Za)(k(t), $))), {
              onPress: (K, V) => r($.row, K, V)
            }), null, 16, ["href", "tabindex", "aria-hidden", "aria-label", "onPress"])) : O("", !0),
            B === c.value ? (d(), p("span", cc, [
              U(aa, {
                column: B,
                entry: $
              }, null, 8, ["column", "entry"]),
              U(_t, { entry: $ }, null, 8, ["entry"]),
              U(gt, { entry: $ }, null, 8, ["entry"])
            ])) : (d(), H(aa, {
              key: 2,
              column: B,
              entry: $
            }, null, 8, ["column", "entry"]))
          ], 14, ic))), 128))
        ], 8, lc))), 128))
      ])
    ], 12, Ji)) : (d(), p("p", Yi, [
      I[2] || (I[2] = b("span", { class: "dc-table__headline" }, "No columns declared", -1)),
      b("span", Xi, [
        Z(L(v.value) + " has no ", 1),
        I[0] || (I[0] = b("code", null, "columns", -1)),
        I[1] || (I[1] = Z(" in the schema, so there is no table to draw. ", -1))
      ])
    ]));
  }
}), ns = /* @__PURE__ */ Q(uc, [["__scopeId", "data-v-30f18dcf"]]);
function dc(e) {
  const t = he([]), n = q(!1), a = he(null);
  let s = 0;
  const l = (i, c, u, g, _) => ({
    entity: i,
    rows: e.limit.value > 0 ? c.rows.map((m, h) => ja(m, h, i, e.isPinned(m.id))) : [],
    total: c.total,
    count: u ? ct(i) : Ne(c.total),
    pinned: fc(g, c, _)
  }), o = () => {
    const i = ++s, c = e.query.value, u = e.schema.value, g = e.entities.value, _ = e.limit.value, m = e.within?.value.trim() ?? "", h = _n(c) && !m, v = m ? gn(m, c.expr) : c.expr, S = g.map((C) => ({
      entity: C,
      // Scope the query to this entity, keeping the expression and ordering.
      outcome: e.source.value.query({
        // Each card is the top few of its type, wherever the shell's own
        // result set has been paged to — so this asks for the first page.
        query: { ...c, entity: C.key, expr: v, page: 1 },
        schema: u,
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
    if (S.every(({ outcome: C }) => !(C instanceof Promise))) {
      t.value = S.map(
        ({ entity: C, outcome: A }) => l(C, A, h, u, v)
      ), a.value = null, n.value = !1;
      return;
    }
    n.value = !0, Promise.all(S.map(({ outcome: C }) => Promise.resolve(C))).then((C) => {
      i === s && (t.value = C.map(
        (A, y) => l(S[y].entity, A, h, u, v)
      ), a.value = null);
    }).catch((C) => {
      i === s && (a.value = C, t.value = []);
    }).finally(() => {
      i === s && (n.value = !1);
    });
  }, r = () => {
    try {
      o();
    } catch (i) {
      a.value = i, t.value = [], n.value = !1;
    }
  };
  return ne(
    [
      e.source,
      e.schema,
      e.query,
      e.entities,
      e.limit,
      () => e.within?.value
    ],
    r,
    { immediate: !0 }
  ), { previews: t, pending: n, error: a, refresh: r };
}
function fc(e, t, n) {
  const a = t.rows[0];
  if (t.total !== 1 || t.rows.length !== 1 || !a)
    return !1;
  const s = n.trim();
  if (!s)
    return !1;
  const l = Tt(e, a);
  return !!l && Ue(s, l) === s;
}
const vc = ["data-dc-pending", "data-dc-heads-only"], pc = {
  key: 0,
  class: "dc-types__state",
  role: "alert"
}, hc = {
  key: 1,
  class: "dc-types__state",
  "aria-live": "polite"
}, mc = {
  key: 2,
  class: "dc-types__state"
}, yc = ["data-dc-empty"], gc = { class: "dc-type__name" }, _c = { class: "dc-type__count dc-mono" }, wc = {
  key: 0,
  class: "dc-type__note dc-mono"
}, kc = { class: "dc-type__sr" }, bc = {
  key: 1,
  class: "dc-type__description"
}, $c = {
  key: 0,
  class: "dc-type__empty"
}, xc = { class: "dc-type__identity" }, Sc = { class: "dc-type__primary dc-truncate" }, Cc = { class: "dc-type__secondary dc-mono dc-truncate" }, Pc = { class: "dc-type__trailing dc-mono" }, Mc = { class: "dc-type__metric-value" }, Ec = { class: "dc-type__metric-label" }, Lc = {
  key: 0,
  class: "dc-type__date"
}, Tc = /* @__PURE__ */ j({
  __name: "TypeCardsView",
  setup(e) {
    const t = te(), { previews: n, pending: a, error: s } = dc({
      source: t.source,
      schema: t.schema,
      // The query as the results are read under it, so a word being typed in the
      // header narrows the cards as it narrows any list — see `liveQuery`.
      query: t.liveQuery,
      entities: t.entities,
      limit: t.previewsPerType,
      within: t.within,
      isPinned: (u) => t.isPinnedId(u)
    }), l = f(
      () => !t.isPristine.value || !!t.within.value || t.drafting.value
    ), o = f(() => t.previewsPerType.value <= 0), r = f(
      () => new Set(n.value.filter((u) => u.pinned).map((u) => u.entity.key))
    ), i = (u) => {
      const { keepsCard: g } = u;
      return Array.isArray(g) ? g.some((_) => r.value.has(_)) : !!g;
    }, c = f(
      () => n.value.filter(
        (u) => !u.pinned && (l.value || !u.entity.nested) && (u.total > 0 || i(u.entity) || !o.value && u.entity.create)
      )
    );
    return (u, g) => (d(), p("div", {
      class: "dc-types",
      "data-dc-pending": k(a) ? "true" : "false",
      "data-dc-heads-only": o.value ? "true" : "false"
    }, [
      G(u.$slots, "before", {}, void 0, !0),
      k(s) ? (d(), p("p", pc, " Could not load results: " + L(k(s) instanceof Error ? k(s).message : "the data source failed."), 1)) : !c.value.length && k(a) ? (d(), p("p", hc, " Running query… ")) : c.value.length ? O("", !0) : (d(), p("p", mc, L(l.value ? "Nothing matches this query" : "Nothing here yet"), 1)),
      (d(!0), p(z, null, X(c.value, (_) => (d(), p("section", {
        key: _.entity.key,
        class: "dc-type",
        "data-dc-empty": _.total ? "false" : "true"
      }, [
        U(se, {
          class: "dc-type__head",
          href: k(t).entityHref(_.entity.key),
          onPress: (m) => k(t).setEntity(_.entity.key)
        }, {
          default: Y(() => [
            b("span", gc, L(_.entity.label), 1),
            b("span", _c, L(_.count), 1),
            _.entity.note ? (d(), p("span", wc, L(_.entity.note), 1)) : O("", !0),
            g[0] || (g[0] = b("span", {
              class: "dc-type__go",
              "aria-hidden": "true"
            }, "→", -1)),
            b("span", kc, "Show only " + L(_.entity.label.toLowerCase()), 1),
            _.entity.description ? (d(), p("span", bc, L(_.entity.description), 1)) : O("", !0)
          ]),
          _: 2
        }, 1032, ["href", "onPress"]),
        _.total ? O("", !0) : (d(), p("p", $c, L(l.value ? "No matches" : "Nothing here yet"), 1)),
        (d(!0), p(z, null, X(_.rows, (m) => (d(), p("div", {
          key: m.key,
          class: "dc-type__row"
        }, [
          U(se, {
            class: "dc-type__open",
            href: k(t).pressHref(m.row),
            onPress: (h) => k(t).activate(m.row, h)
          }, {
            default: Y(() => [
              b("span", xc, [
                b("span", Sc, L(m.parts.identity), 1),
                b("span", Cc, L(m.parts.reference), 1)
              ])
            ]),
            _: 2
          }, 1032, ["href", "onPress"]),
          b("span", Pc, [
            (d(!0), p(z, null, X(m.parts.metrics.slice(0, 1), (h) => (d(), H(mt, {
              key: h.column.key ?? h.label,
              class: "dc-type__metric",
              entry: m,
              column: h.column
            }, {
              default: Y(() => [
                b("span", Mc, L(h.text), 1),
                b("span", Ec, L(h.label), 1)
              ]),
              _: 2
            }, 1032, ["entry", "column"]))), 128)),
            m.parts.updated ? (d(), p("span", Lc, L(m.parts.updated), 1)) : O("", !0),
            U(yt, { entry: m }, null, 8, ["entry"]),
            U(_t, { entry: m }, null, 8, ["entry"]),
            U(gt, { entry: m }, null, 8, ["entry"])
          ])
        ]))), 128)),
        _.entity.create && !o.value ? (d(), H(se, {
          key: 1,
          class: "dc-type__new",
          href: k(t).createHref?.(_.entity),
          onPress: (m) => k(t).create(_.entity)
        }, {
          default: Y(() => [
            g[1] || (g[1] = b("span", {
              class: "dc-type__plus",
              "aria-hidden": "true"
            }, "+", -1)),
            Z(" " + L(_.entity.create), 1)
          ]),
          _: 2
        }, 1032, ["href", "onPress"])) : O("", !0)
      ], 8, yc))), 128)),
      G(u.$slots, "after", {}, void 0, !0)
    ], 8, vc));
  }
}), as = /* @__PURE__ */ Q(Tc, [["__scopeId", "data-v-d60e56a6"]]), Oc = ["data-dc-pending", "data-dc-more"], Ac = {
  key: 0,
  class: "dc-results__state dc-results__state--loading",
  "aria-live": "polite"
}, Nc = {
  key: 3,
  class: "dc-results__state",
  role: "alert"
}, Ic = { class: "dc-results__detail" }, Bc = {
  key: 4,
  class: "dc-results__state",
  "aria-live": "polite"
}, Rc = {
  key: 5,
  class: "dc-results__state"
}, Hc = { class: "dc-results__detail" }, qc = /* @__PURE__ */ j({
  __name: "ResultsArea",
  props: {
    views: {},
    loading: { type: Boolean }
  },
  setup(e) {
    const t = e, n = te(), a = Rt(), s = {
      list: pn,
      cards: Ua,
      grid: Qa,
      images: Ga,
      table: ns,
      links: Ya,
      preview: Xa
    }, l = f(() => $a(n.query.value, t.views)), o = f(() => Ae(n.query.value.view, t.views)), r = f(() => We(o.value) ? null : n.hostViews.value[o.value] ?? null), i = f(
      () => (o.value === "record" || !We(o.value) ? null : s[o.value]) ?? pn
    ), c = f(() => o.value === "record" ? n.recordView.value : null), u = f(() => n.rows.value.length > 0), g = f(() => n.error.value !== null), _ = q(null);
    function m(w) {
      return w.querySelector("[data-dc-scroll]") ?? w;
    }
    ne(
      // The page on screen, which is the draft's own while one is being typed.
      () => n.liveQuery.value.page,
      () => {
        _.value && (m(_.value).scrollTop = 0);
      }
    );
    const h = q(""), v = q({ x: 0, y: 0 }), S = q(0);
    function C() {
      const w = _.value;
      if (!w) {
        h.value = "";
        return;
      }
      const M = m(w), E = {
        top: M.scrollTop > 1,
        right: M.scrollWidth - M.clientWidth - M.scrollLeft > 1,
        bottom: M.scrollHeight - M.clientHeight - M.scrollTop > 1,
        left: M.scrollLeft > 1
      };
      h.value = Object.entries(E).filter(([, I]) => I).map(([I]) => I).join(" "), v.value = {
        x: M.offsetHeight - M.clientHeight,
        y: M.offsetWidth - M.clientWidth
      }, S.value = w.querySelector("[data-dc-stuck]")?.offsetHeight ?? 0;
    }
    let A = null, y = null;
    return ne(
      _,
      (w, M) => {
        if (M?.removeEventListener("scroll", C, { capture: !0 }), A?.disconnect(), y?.disconnect(), A = null, y = null, C(), !w || (w.addEventListener("scroll", C, { passive: !0, capture: !0 }), typeof ResizeObserver > "u")) return;
        const E = new ResizeObserver(C), I = typeof MutationObserver > "u" ? null : new MutationObserver(() => {
          $(), C();
        }), $ = () => {
          E.disconnect(), I?.disconnect();
          for (const B of /* @__PURE__ */ new Set([w, m(w)])) {
            E.observe(B);
            for (const T of B.children) E.observe(T);
            I?.observe(B, { childList: !0 });
          }
        };
        $(), A = E, y = I;
      },
      { flush: "post" }
    ), ke(() => {
      _.value?.removeEventListener("scroll", C, { capture: !0 }), A?.disconnect(), y?.disconnect();
    }), (w, M) => (d(), p("div", {
      ref_key: "scroller",
      ref: _,
      class: "dc-results",
      "data-dc-pending": k(n).pending.value ? "true" : "false",
      "data-dc-more": h.value,
      style: ae({
        "--dc-results-gutter-x": `${v.value.x}px`,
        "--dc-results-gutter-y": `${v.value.y}px`,
        "--dc-results-stuck": `${S.value}px`
      })
    }, [
      e.loading ? (d(), p("p", Ac, [...M[1] || (M[1] = [
        b("span", { class: "dc-results__detail" }, "Loading…", -1)
      ])])) : l.value ? (d(), H(as, { key: 1 }, bt({ _: 2 }, [
        a["cards-before"] ? {
          name: "before",
          fn: Y(() => [
            G(w.$slots, "cards-before", {}, void 0, !0)
          ]),
          key: "0"
        } : void 0,
        a["cards-after"] ? {
          name: "after",
          fn: Y(() => [
            G(w.$slots, "cards-after", {}, void 0, !0)
          ]),
          key: "1"
        } : void 0
      ]), 1024)) : c.value?.id ? (d(), H(Ke(c.value.component), {
        key: 2,
        id: c.value.id
      }, null, 8, ["id"])) : g.value ? (d(), p("p", Nc, [
        M[2] || (M[2] = b("span", { class: "dc-results__headline" }, "Could not load results", -1)),
        b("span", Ic, L(k(n).error.value instanceof Error ? k(n).error.value.message : "The data source failed."), 1)
      ])) : !u.value && k(n).pending.value ? (d(), p("p", Bc, [...M[3] || (M[3] = [
        b("span", { class: "dc-results__detail" }, "Running query…", -1)
      ])])) : u.value ? r.value ? (d(), H(Ke(r.value.component), $t(Oe({ key: 6 }, r.value.props ?? {})), null, 16)) : (d(), H(Ke(i.value), { key: 7 })) : (d(), p("div", Rc, [
        M[4] || (M[4] = b("span", { class: "dc-results__headline" }, "Nothing matches this query", -1)),
        b("span", Hc, L(k(n).summary.value), 1),
        k(n).isPristine.value ? O("", !0) : (d(), H(se, {
          key: 0,
          class: "dc-results__clear",
          href: k(n).isEverything.value ? k(n).clearHref() : k(n).entityHref(null),
          onPress: M[0] || (M[0] = (E) => k(n).isEverything.value ? k(n).clearFilters() : k(n).clearEntity())
        }, {
          default: Y(() => [
            Z(L(k(n).isEverything.value ? "Clear filters" : "Search everything instead"), 1)
          ]),
          _: 1
        }, 8, ["href"]))
      ]))
    ], 12, Oc));
  }
}), ss = /* @__PURE__ */ Q(qc, [["__scopeId", "data-v-cefc7fcf"]]), Vc = ["data-dc-theme", "data-dc-value-press", "data-dc-layout"], Fc = { class: "dc-shell__main" }, Dc = {
  key: 0,
  class: "dc-shell__page"
}, Kc = {
  key: 1,
  class: "dc-shell__panel",
  "aria-label": "Panel"
}, Wc = /* @__PURE__ */ j({
  __name: "DataShell",
  props: /* @__PURE__ */ Tn({
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
    hostViews: {},
    typeChooser: { default: "scoped" },
    selectionPlacement: { default: "start" },
    oneStripFrom: { type: [Number, Boolean], default: 1200 },
    layout: { default: "bar" },
    viewLabels: {},
    viewHints: {},
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
  emits: /* @__PURE__ */ Tn(["activate", "create", "duplicate", "delete", "operate", "drill", "query-change", "toggle-pin"], ["update:pinned", "update:selected"]),
  setup(e, { expose: t, emit: n }) {
    const a = e, s = n, l = Ln(e, "pinned"), o = Ln(e, "selected"), r = Rt(), i = hn(ua, null), c = a.route || i ? null : hs(), u = a.route ?? i ?? c;
    ke(() => c?.dispose?.());
    const g = q(!!r.page);
    is(() => {
      g.value = !!r.page;
    });
    const _ = ms(u, {
      detached: () => g.value && a.pageQuery === "detached",
      path: () => a.listPath
    }), m = f(() => vl({ seed: a.schema.key })), h = f(() => a.source ?? m.value), v = Il({
      schema: () => a.schema,
      adapter: _,
      defaults: () => a.defaults,
      navigationMode: () => a.navigationMode,
      facetNavigationMode: () => a.facetNavigationMode
    }), S = f(() => a.within?.trim() ?? ""), C = ql({
      query: v.query,
      entity: v.entity,
      schema: f(() => a.schema),
      setExpression: v.setExpression
    });
    ne(v.query, (x) => s("query-change", x));
    const A = f(() => $l(a.schema, [v.query.value.expr])), y = f(
      () => A.value.flatMap((x) => {
        const N = a.schema.entities.find((F) => F.key === x.entityKey);
        return N ? [{ ...x, entity: N }] : [];
      })
    );
    function w() {
      if (r.record) return y.value;
      const x = a.recordCards;
      return x ? y.value.filter((N) => x[N.entityKey]) : [];
    }
    const M = f(() => {
      const [x, ...N] = y.value;
      if (!x || N.length || v.entity.value !== null) return null;
      const F = a.recordViews?.[x.entityKey];
      return F ? { ...F, id: x.id } : null;
    }), E = f(() => {
      const x = v.entity.value?.key;
      return x && a.recordViews?.[x] || null;
    }), I = f(() => {
      const x = a.views, F = (typeof x == "function" ? x({ entity: v.entity.value, records: A.value }) : x) ?? (a.hostViews ? [...lt, ...Object.keys(a.hostViews)] : void 0);
      return M.value || E.value ? [...(F ?? lt).filter((ue) => ue !== "record"), "record"] : F?.filter((ue) => ue !== "record");
    }), $ = f(
      () => E.value !== null && Ae(v.query.value.view, I.value) === "record"
    ), B = f(() => $.value ? 1 : a.limit), T = Bl({
      source: h,
      query: C.live,
      schema: f(() => a.schema),
      entity: v.entity,
      limit: B,
      within: S
    }), K = Rl({
      // Not before the data has landed: what is there until then is no place to hold.
      active: f(() => $.value && !a.loading),
      rows: T.rows,
      pending: T.pending,
      page: f(() => C.live.value.page),
      list: f(() => {
        const { entity: x, expr: N, sort: F, dir: ue } = C.live.value;
        return JSON.stringify([x, N, F, ue]);
      }),
      locate: T.locate,
      moveTo: (x) => {
        C.drafting.value ? C.setPage(x) : v.setPage(x, "replace");
      }
    }), V = f(() => T.pageCount.value + (K.gone.value ? 1 : 0)), J = f(() => {
      if (M.value) return M.value;
      const x = E.value;
      return x ? { ...x, id: K.id.value ?? T.rows.value[0]?.id ?? null } : null;
    });
    function re(x) {
      const N = E.value !== null && Ae(x, I.value) === "record";
      if (N === $.value) {
        v.setView(x);
        return;
      }
      const F = C.live.value.page, ue = N ? (F - 1) * a.limit + 1 : Math.ceil(F / a.limit);
      C.drafting.value ? (v.setView(x), C.setPage(ue)) : v.setView(x, ue);
    }
    function me(x) {
      if (!E.value || $.value) return null;
      const N = T.rows.value.indexOf(x);
      return N === -1 ? null : T.offset.value + N + 1;
    }
    ne(
      [V, T.pending, v.query, C.drafting, () => a.loading, g, K.holding],
      () => {
        if (T.pending.value || C.drafting.value || a.loading || g.value) return;
        const x = V.value;
        v.query.value.page <= x || (K.gone.value ? K.moveTo(x) : K.holding.value || v.setPage(x, "replace"));
      },
      // Immediately, since a pasted URL is past the end before anything changes;
      // and after the render, so the correction is a navigation the mounted shell
      // makes rather than one it makes on the way up. An async source is still
      // pending here and corrects itself when its count lands.
      { immediate: !0, flush: "post" }
    );
    const ye = f(() => new Set(l.value));
    function qe(x) {
      const N = new Set(ye.value);
      N.has(x.id) ? N.delete(x.id) : N.add(x.id), l.value = [...N], s("toggle-pin", x);
    }
    const le = f(() => {
      const x = (F) => !!F.scope && F.standing !== !1, N = v.entity.value;
      return N ? x(N) : a.schema.entities.some(x);
    }), Xe = f(() => {
      if (a.selectable === !0 || le.value) return !0;
      const x = v.entity.value;
      return !!(x?.duplicate || x?.delete || x?.operations?.some((N) => N.selection !== !1));
    }), ge = f(() => new Set(o.value));
    function fe(x) {
      const N = a.schema.entities.find((F) => F.key === x.entityKey) ?? v.entity.value;
      return Ea(N, x);
    }
    const Je = /* @__PURE__ */ new Map();
    function Yt(x) {
      const N = new Set(ge.value);
      N.has(x.id) ? N.delete(x.id) : (N.add(x.id), Je.set(x.id, fe(x))), o.value = [...N];
    }
    function Ze(x) {
      const N = new Set(ge.value);
      for (const F of T.rows.value)
        x ? (N.add(F.id), Je.set(F.id, fe(F))) : N.delete(F.id);
      o.value = [...N];
    }
    const Ve = f(() => {
      const x = new Map(T.rows.value.map((N) => [N.id, N]));
      return o.value.map((N) => {
        const F = x.get(N);
        return F ? fe(F) : Je.get(N) ?? null;
      }).filter((N) => N !== null);
    });
    function Ee(x) {
      const N = Ve.value;
      if (!N.length) return;
      const F = bl(v.query.value.expr, N, x);
      $e(), v.setExpression(F);
    }
    function $e() {
      o.value.length && (o.value = []);
    }
    const P = f(() => ({
      ids: [...o.value],
      rows: T.rows.value.filter((x) => ge.value.has(x.id)),
      entity: v.entity.value
    }));
    ne(() => v.query.value.entity, $e);
    function R(x, N, F = {}, ue) {
      const Mn = an(a.schema, v.query.value, x, F, ue);
      F.exclude ? v.narrow(Mn, N?.key ?? v.query.value.entity) : C.release(() => v.narrow(Mn, N?.key ?? null, N ? void 0 : "cards")), s("drill", x, N, F);
    }
    function W(x) {
      return a.rowPress === "narrow" && Tt(a.schema, x) !== null;
    }
    function D(x) {
      return a.schema.entities.find((F) => F.key === x.entityKey)?.href?.(x) || null;
    }
    const Fe = he(null);
    ne(v.query, () => {
      Fe.value = null;
    });
    const ve = xl({
      ...v,
      draft: C.text,
      liveQuery: C.live,
      drafting: C.drafting,
      commitDraft: C.commit,
      abandonDraft: C.abandon,
      /*
       * A page of what is on screen: the draft's, while one is live, which are
       * held beside it rather than in the URL — see `liveQuery`.
       */
      setPage: (x, N) => {
        const F = K.step(x);
        F !== null && (C.drafting.value ? C.setPage(F) : v.setPage(F, N));
      },
      setView: re,
      schema: f(() => a.schema),
      entities: f(() => a.schema.entities),
      rows: T.rows,
      total: T.total,
      matched: T.matched,
      limit: B,
      offset: T.offset,
      pageCount: V,
      peek: T.peek,
      pending: T.pending,
      counting: T.counting,
      error: T.error,
      source: h,
      previewsPerType: f(() => a.previewsPerType),
      within: S,
      loading: f(() => a.loading),
      recordView: J,
      hostViews: f(() => a.hostViews ?? {}),
      pinnable: f(() => a.pinnable === !0),
      isPinned: (x) => ye.value.has(x.id),
      isPinnedId: (x) => ye.value.has(x),
      togglePin: qe,
      selectable: Xe,
      selection: P,
      isSelected: (x) => ge.value.has(x.id),
      toggleSelect: Yt,
      selectPage: Ze,
      clearSelection: $e,
      standable: le,
      selectionTerms: Ve,
      standSelection: Ee,
      narrowsOnPress: f(() => a.rowPress === "narrow"),
      rowLinks: f(() => a.rowLinks),
      pressPreview: Fe,
      /*
       * The one place a press is read, so every view gets the same answer without
       * knowing which of the two it is: they all call this.
       */
      activate: (x, N = {}) => {
        if (W(x)) {
          R(x, null, N);
          return;
        }
        const F = me(x);
        if (F !== null) {
          C.drafting.value ? (v.setView("record"), C.setPage(F)) : v.setView("record", F);
          return;
        }
        const ue = D(x);
        if (ue) {
          window.open(ue, "_blank", "noopener");
          return;
        }
        s("activate", x);
      },
      pressHref: (x) => {
        if (W(x)) return v.narrowHref(an(a.schema, v.query.value, x), null, "cards");
        const N = me(x);
        return N !== null ? v.hrefFor({ view: "record", page: N }) : D(x) ?? a.activateHref?.(x) ?? null;
      },
      recordHref: D,
      drillHref: (x, N, F) => Tt(a.schema, x) ? v.narrowHref(
        an(a.schema, v.query.value, x, {}, F),
        N?.key ?? null,
        N ? void 0 : "cards"
      ) : null,
      create: (x) => s("create", x),
      createHref: (x) => a.createHref?.(x) ?? null,
      duplicate: () => s("duplicate", P.value),
      delete: () => s("delete", P.value),
      operate: (x) => s("operate", x, P.value),
      drill: R
    });
    Pl({ theme: () => a.theme, accent: () => a.accent, tokens: () => a.tokens });
    const rs = f(() => {
      if (!(!a.accent && !a.tokens))
        return { ...a.tokens, ...a.accent ? { "--dc-accent": a.accent } : {} };
    }), Pn = q(null), Xt = q(0);
    let Jt = null;
    Ge(() => {
      const x = Pn.value;
      x && (Xt.value = x.getBoundingClientRect().width, !(typeof ResizeObserver > "u") && (Jt = new ResizeObserver(([N]) => {
        Xt.value = N.contentRect.width;
      }), Jt.observe(x)));
    }), ke(() => Jt?.disconnect());
    const wt = f(() => a.layout === "panel"), Zt = f(() => !wt.value && a.oneStripFrom !== !1 && Xt.value >= a.oneStripFrom), en = f(
      () => Ae(v.query.value.view, I.value) === "record" && J.value?.strip === !1
    ), tn = f(() => ({
      views: I.value,
      selectionPlacement: a.selectionPlacement,
      pagesNote: a.pagesNote
    }));
    return t({
      query: v.query
    }), (x, N) => (d(), p("div", {
      ref_key: "root",
      ref: Pn,
      class: "dc-shell",
      "data-dc-theme": e.theme,
      "data-dc-value-press": e.valuePress,
      "data-dc-layout": e.layout,
      style: ae(rs.value)
    }, [
      wt.value ? O("", !0) : (d(), p("div", {
        key: 0,
        class: oe(["dc-shell__head", { "dc-shell__head--one-strip": Zt.value }])
      }, [
        U(fn, null, bt({ _: 2 }, [
          r.page ? void 0 : {
            name: "lead",
            fn: Y(() => [
              U(Zn, {
                views: I.value,
                "type-chooser": e.typeChooser
              }, null, 8, ["views", "type-chooser"])
            ]),
            key: "0"
          },
          r.brand ? {
            name: "brand",
            fn: Y((F) => [
              G(x.$slots, "brand", $t(cs(F)), void 0, !0)
            ]),
            key: "1"
          } : void 0,
          r.actions ? {
            name: "actions",
            fn: Y(() => [
              G(x.$slots, "actions", {}, void 0, !0)
            ]),
            key: "2"
          } : void 0
        ]), 1024),
        Zt.value && !r.page && !en.value ? (d(), H(St, $t(Oe({ key: 0 }, tn.value)), null, 16)) : O("", !0)
      ], 2)),
      b("div", Fc, [
        r.page ? (d(), p("div", Dc, [
          G(x.$slots, "page", {
            query: k(ve).query.value
          }, void 0, !0)
        ])) : O("", !0),
        !wt.value && !Zt.value && !r.page && !en.value ? (d(), H(St, $t(Oe({ key: 1 }, tn.value)), null, 16)) : O("", !0),
        r.page ? O("", !0) : G(x.$slots, "results", {
          rows: k(ve).rows.value,
          total: k(ve).total.value,
          offset: k(ve).offset.value,
          pageCount: k(ve).pageCount.value,
          query: k(ve).liveQuery.value,
          pending: k(ve).pending.value,
          loading: e.loading
        }, () => [
          U(ss, {
            views: I.value,
            loading: e.loading
          }, bt({ _: 2 }, [
            r["cards-before"] || w().length ? {
              name: "cards-before",
              fn: Y(() => [
                (d(!0), p(z, null, X(w(), (F) => (d(), p(z, {
                  key: `${F.entityKey}:${F.id}`
                }, [
                  r.record ? G(x.$slots, "record", {
                    id: F.id,
                    entity: F.entity
                  }, void 0, !0, 0) : (d(), H(Ke(e.recordCards?.[F.entityKey]), {
                    key: 1,
                    id: F.id
                  }, null, 8, ["id"]))
                ], 64))), 128)),
                G(x.$slots, "cards-before", {}, void 0, !0)
              ]),
              key: "0"
            } : void 0,
            r["cards-after"] ? {
              name: "cards-after",
              fn: Y(() => [
                G(x.$slots, "cards-after", {}, void 0, !0)
              ]),
              key: "1"
            } : void 0
          ]), 1032, ["views", "loading"])
        ], !0, 2)
      ]),
      wt.value ? (d(), p("aside", Kc, [
        G(x.$slots, "panel-head", {}, void 0, !0),
        U(fn, { panel: "" }, bt({ _: 2 }, [
          r.actions ? {
            name: "actions",
            fn: Y(() => [
              G(x.$slots, "actions", {}, void 0, !0)
            ]),
            key: "0"
          } : void 0
        ]), 1024),
        r.page ? O("", !0) : (d(), H(Zn, {
          key: 0,
          views: I.value,
          "type-chooser": e.typeChooser,
          labels: e.viewLabels,
          hints: e.viewHints,
          stacked: ""
        }, null, 8, ["views", "type-chooser", "labels", "hints"])),
        !r.page && A.value.length === 0 ? (d(), H(hr, { key: 1 })) : O("", !0),
        G(x.$slots, "panel", {
          query: k(ve).query.value
        }, void 0, !0),
        !r.page && !en.value ? (d(), H(St, Oe({
          key: 2,
          class: "dc-shell__panel-actions"
        }, tn.value), null, 16)) : O("", !0)
      ])) : O("", !0)
    ], 12, Vc));
  }
}), zc = /* @__PURE__ */ Q(Wc, [["__scopeId", "data-v-4e7b98d6"]]), jc = ["data-dc-span", "data-dc-muted", "data-dc-collapsed"], Uc = ["data-dc-collapsible"], Qc = ["aria-expanded", "aria-controls"], Gc = { class: "dc-shell-card__sr" }, Yc = {
  key: 0,
  class: "dc-shell-card__identity"
}, Xc = { class: "dc-shell-card__title dc-shell-card__name" }, Jc = {
  key: 0,
  class: "dc-shell-card__ref dc-mono"
}, Zc = {
  key: 1,
  class: "dc-shell-card__title"
}, eu = {
  key: 2,
  class: "dc-shell-card__count dc-mono"
}, tu = {
  key: 1,
  class: "dc-shell-card__aside"
}, nu = ["data-dc-flush"], au = /* @__PURE__ */ j({
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
    const n = e, a = t, s = q(n.defaultCollapsed === !0), l = f(() => n.span === "all" ? { gridColumn: "1 / -1" } : void 0), o = Rt();
    function r($) {
      return i($?.() ?? []);
    }
    function i($) {
      return $.some((B) => B.type === us ? !1 : B.type === ds ? String(B.children ?? "").trim().length > 0 : B.type === z ? i(B.children ?? []) : !0);
    }
    const c = f(
      () => !!n.title || !!n.name || u.value || r(o.head)
    ), u = f(() => r(o.aside)), g = f(() => r(o.default)), _ = f(() => r(o.foot)), m = f(
      () => !!n.name && (!!n.reference || r(o.reference))
    ), h = f(() => n.collapsible === !0 && c.value), v = f(() => h.value && (n.collapsed ?? s.value));
    function S() {
      const $ = !v.value;
      s.value = $, a("update:collapsed", $);
    }
    const C = Ht() ?? "dc-shell-card", A = `${C}-body`, y = `${C}-foot`, w = f(
      () => [g.value ? A : "", _.value ? y : ""].filter(Boolean).join(" ") || void 0
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
    ].join(", "), E = q(null);
    function I($) {
      if (!h.value) return;
      const B = $.target?.closest(M);
      B && E.value?.contains(B) || typeof window < "u" && window.getSelection()?.toString() || S();
    }
    return ($, B) => (d(), p("section", {
      class: "dc-shell-card",
      style: ae(l.value),
      "data-dc-span": e.span,
      "data-dc-muted": e.muted ? "true" : "false",
      "data-dc-collapsed": v.value ? "true" : "false"
    }, [
      c.value ? (d(), p("header", {
        key: 0,
        ref_key: "head",
        ref: E,
        class: "dc-shell-card__head",
        "data-dc-collapsible": h.value ? "true" : "false",
        onClick: I
      }, [
        h.value ? (d(), p("button", {
          key: 0,
          type: "button",
          class: "dc-shell-card__toggle",
          "aria-expanded": v.value ? "false" : "true",
          "aria-controls": w.value,
          onClick: S
        }, [
          B[0] || (B[0] = b("svg", {
            class: "dc-shell-card__chevron",
            viewBox: "0 0 10 10",
            "aria-hidden": "true"
          }, [
            b("path", { d: "M2 3.5 5 6.5 8 3.5" })
          ], -1)),
          b("span", Gc, L(e.name || e.title || "Card"), 1)
        ], 8, Qc)) : O("", !0),
        G($.$slots, "head", {}, () => [
          e.name ? (d(), p("div", Yc, [
            b("h2", Xc, L(e.name), 1),
            m.value ? (d(), p("span", Jc, [
              G($.$slots, "reference", {}, () => [
                Z(L(e.reference), 1)
              ], !0)
            ])) : O("", !0)
          ])) : (d(), p("h2", Zc, L(e.title), 1)),
          e.count !== void 0 ? (d(), p("span", eu, L(e.count), 1)) : O("", !0)
        ], !0),
        u.value ? (d(), p("span", tu, [
          G($.$slots, "aside", {}, void 0, !0)
        ])) : O("", !0)
      ], 8, Uc)) : O("", !0),
      g.value ? Ct((d(), p("div", {
        key: 1,
        id: A,
        class: "dc-shell-card__body",
        "data-dc-flush": e.flush ? "true" : "false"
      }, [
        G($.$slots, "default", {}, void 0, !0)
      ], 8, nu)), [
        [On, !v.value]
      ]) : O("", !0),
      _.value ? Ct((d(), p("footer", {
        key: 2,
        id: y,
        class: "dc-shell-card__foot"
      }, [
        G($.$slots, "foot", {}, void 0, !0)
      ], 512)), [
        [On, !v.value]
      ]) : O("", !0)
    ], 12, jc));
  }
}), od = /* @__PURE__ */ Q(au, [["__scopeId", "data-v-c84525aa"]]), su = ["aria-label"], lu = ["aria-checked", "data-dc-active", "tabindex", "onClick", "onKeydown"], ou = /* @__PURE__ */ j({
  __name: "SegmentedControl",
  props: {
    modelValue: {},
    options: {},
    label: {},
    mono: { type: Boolean }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const n = e, a = t, s = q([]);
    function l(o, r) {
      const i = n.options.length;
      let c = null;
      if (o.key === "ArrowRight" || o.key === "ArrowDown" ? c = (r + 1) % i : o.key === "ArrowLeft" || o.key === "ArrowUp" ? c = (r - 1 + i) % i : o.key === "Home" ? c = 0 : o.key === "End" && (c = i - 1), c === null) return;
      o.preventDefault();
      const u = n.options[c];
      u && (a("update:modelValue", u.key), s.value[c]?.focus());
    }
    return (o, r) => (d(), p("div", {
      class: "dc-segmented",
      role: "radiogroup",
      "aria-label": e.label
    }, [
      (d(!0), p(z, null, X(e.options, (i, c) => (d(), p("button", {
        key: i.key,
        ref_for: !0,
        ref_key: "buttons",
        ref: s,
        type: "button",
        role: "radio",
        class: oe(["dc-segmented__item", { "dc-segmented__item--mono": e.mono }]),
        "aria-checked": i.key === e.modelValue,
        "data-dc-active": i.key === e.modelValue ? "true" : "false",
        tabindex: i.key === e.modelValue ? 0 : -1,
        onClick: (u) => a("update:modelValue", i.key),
        onKeydown: (u) => l(u, c)
      }, L(i.label), 43, lu))), 128))
    ], 8, su));
  }
}), ru = /* @__PURE__ */ Q(ou, [["__scopeId", "data-v-63fb5482"]]), iu = { class: "dc-fact__label" }, cu = ["title"], uu = /* @__PURE__ */ j({
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
      if (s == null || s === "") return [be];
      if (Array.isArray(s)) {
        const l = s.filter((o) => o != null && o !== "");
        return l.length ? l.map(String) : [be];
      }
      return [String(s)];
    }), a = f(() => t.wide ? { gridColumn: "1 / -1" } : void 0);
    return (s, l) => (d(), p("div", {
      class: "dc-fact",
      style: ae(a.value)
    }, [
      b("dt", iu, [
        G(s.$slots, "label", {}, () => [
          Z(L(e.label), 1)
        ], !0)
      ]),
      b("dd", {
        class: "dc-fact__value dc-mono",
        title: e.title
      }, [
        G(s.$slots, "default", {}, () => [
          n.value.length === 1 ? (d(), p(z, { key: 0 }, [
            Z(L(n.value[0]), 1)
          ], 64)) : (d(!0), p(z, { key: 1 }, X(n.value, (o, r) => (d(), p("span", {
            key: r,
            class: "dc-fact__line"
          }, L(o), 1))), 128))
        ], !0)
      ], 8, cu)
    ], 4));
  }
}), du = /* @__PURE__ */ Q(uu, [["__scopeId", "data-v-1f6d25e6"]]), fu = /* @__PURE__ */ j({
  __name: "ShellFacts",
  props: {
    items: { default: () => [] },
    min: { default: "200px" }
  },
  setup(e) {
    const t = e, n = f(() => ({ "--dc-facts-min": t.min }));
    return (a, s) => (d(), p("dl", {
      class: "dc-facts",
      style: ae(n.value)
    }, [
      (d(!0), p(z, null, X(e.items, (l, o) => (d(), H(du, {
        key: `${o}:${l.label}`,
        label: l.label,
        value: l.value,
        title: l.title,
        wide: l.wide
      }, null, 8, ["label", "value", "title", "wide"]))), 128)),
      G(a.$slots, "default", {}, void 0, !0)
    ], 4));
  }
}), rd = /* @__PURE__ */ Q(fu, [["__scopeId", "data-v-17455afa"]]), vu = { class: "dc-counts" }, pu = ["data-dc-tone"], hu = {
  key: 0,
  class: "dc-counts__empty"
}, mu = /* @__PURE__ */ j({
  __name: "StatusCounts",
  props: {
    counts: {},
    empty: { default: be }
  },
  setup(e) {
    const t = e, n = f(() => t.counts.filter((a) => a.count > 0));
    return (a, s) => (d(), p("span", vu, [
      (d(!0), p(z, null, X(n.value, (l) => (d(), p("span", {
        key: l.label,
        class: "dc-counts__count",
        "data-dc-tone": l.tone ?? "neutral"
      }, L(l.count) + " " + L(l.label), 9, pu))), 128)),
      n.value.length === 0 ? (d(), p("span", hu, L(e.empty), 1)) : O("", !0)
    ]));
  }
}), id = /* @__PURE__ */ Q(mu, [["__scopeId", "data-v-5553a9e2"]]), yu = ["data-dc-copied", "title", "aria-label"], gu = {
  key: 0,
  class: "dc-copy__mark",
  viewBox: "0 0 16 16",
  "aria-hidden": "true"
}, _u = {
  key: 1,
  class: "dc-copy__mark",
  viewBox: "0 0 16 16",
  "aria-hidden": "true"
}, wu = 1500, ku = /* @__PURE__ */ j({
  __name: "CopyButton",
  props: {
    text: {},
    label: { default: "Copy to clipboard" }
  },
  emits: ["copied", "error"],
  setup(e, { emit: t }) {
    const n = e, a = t, s = q(!1);
    let l;
    async function o() {
      const r = typeof n.text == "function" ? n.text() : n.text;
      try {
        if (!navigator.clipboard) throw new Error("The clipboard is not available here");
        await navigator.clipboard.writeText(r);
      } catch (i) {
        a("error", i);
        return;
      }
      s.value = !0, clearTimeout(l), l = setTimeout(() => {
        s.value = !1;
      }, wu), a("copied", r);
    }
    return ke(() => clearTimeout(l)), (r, i) => (d(), p("button", {
      type: "button",
      class: "dc-copy",
      "data-dc-copied": s.value ? "true" : "false",
      title: s.value ? "Copied" : e.label,
      "aria-label": e.label,
      onClick: o
    }, [
      s.value ? (d(), p("svg", _u, [...i[1] || (i[1] = [
        b("path", { d: "M3 8.5l3.2 3L13 4.5" }, null, -1)
      ])])) : (d(), p("svg", gu, [...i[0] || (i[0] = [
        b("rect", {
          x: "5.5",
          y: "5.5",
          width: "8",
          height: "9",
          rx: "1.5"
        }, null, -1),
        b("path", { d: "M10.5 3.5v-1a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h1" }, null, -1)
      ])]))
    ], 8, yu));
  }
}), bu = /* @__PURE__ */ Q(ku, [["__scopeId", "data-v-f4249d7f"]]), $u = ["data-dc-copy", "data-dc-wrap", "data-dc-tone"], xu = /* @__PURE__ */ j({
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
    const n = e, a = t, s = q(null), l = f(() => n.maxHeight === void 0 ? void 0 : { maxHeight: typeof n.maxHeight == "number" ? `${n.maxHeight}px` : n.maxHeight });
    function o() {
      return n.code ?? s.value?.textContent ?? "";
    }
    return (r, i) => (d(), p("div", {
      class: "dc-code",
      "data-dc-copy": e.copy ? "true" : "false",
      "data-dc-wrap": e.wrap ? "true" : "false",
      "data-dc-tone": e.tone
    }, [
      b("pre", {
        ref_key: "pre",
        ref: s,
        class: "dc-code__text dc-mono",
        style: ae(l.value)
      }, [
        G(r.$slots, "default", {}, () => [
          Z(L(e.code), 1)
        ], !0)
      ], 4),
      e.copy ? (d(), H(bu, {
        key: 0,
        class: "dc-code__copy",
        text: o,
        label: e.copyLabel,
        onCopied: i[0] || (i[0] = (c) => a("copied", c)),
        onError: i[1] || (i[1] = (c) => a("error", c))
      }, null, 8, ["label"])) : O("", !0)
    ], 8, $u));
  }
}), cd = /* @__PURE__ */ Q(xu, [["__scopeId", "data-v-67b371dd"]]), Su = 24, Cu = /* @__PURE__ */ j({
  __name: "ShellLog",
  props: {
    fetchChunk: {},
    stripAnsi: { type: Boolean },
    maxHeight: { default: "460px" }
  },
  setup(e, { expose: t }) {
    const n = e, a = q(""), s = f(() => n.stripAnsi ? Ss(a.value) : a.value), l = q(null);
    let o = 0, r = null;
    function i() {
      return r ??= c().finally(() => {
        r = null;
      }), r;
    }
    async function c() {
      const { chunk: _, offset: m } = await n.fetchChunk(o);
      if (o = m, !_) return;
      const h = l.value, v = !h || h.scrollTop + h.clientHeight >= h.scrollHeight - Su;
      a.value += _, v && (await st(), l.value && (l.value.scrollTop = l.value.scrollHeight));
    }
    function u() {
      a.value = "", o = 0;
    }
    const g = f(() => n.maxHeight === void 0 ? void 0 : { maxHeight: typeof n.maxHeight == "number" ? `${n.maxHeight}px` : n.maxHeight });
    return t({ poll: i, reset: u }), (_, m) => (d(), p("pre", {
      ref_key: "pane",
      ref: l,
      class: "dc-log dc-mono",
      style: ae(g.value)
    }, L(s.value), 5));
  }
}), ud = /* @__PURE__ */ Q(Cu, [["__scopeId", "data-v-2c86947e"]]), Pu = ["data-dc-theme"], Mu = ["aria-labelledby", "aria-label"], Eu = {
  key: 1,
  class: "dc-dialog__actions"
}, tt = [], Lu = /* @__PURE__ */ j({
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
    const n = e, a = t, { theme: s, style: l, adopt: o } = Sn(n), r = `${Ht() ?? "dc-dialog"}-title`, i = q(null);
    function c() {
      a("close"), a("update:open", !1);
    }
    const u = Symbol("dc-dialog");
    function g(y) {
      y.key !== "Escape" || y.defaultPrevented || tt[tt.length - 1] === u && (y.preventDefault(), c());
    }
    let _ = !1;
    function m(y) {
      _ = y.target === y.currentTarget;
    }
    function h(y) {
      y.target === y.currentTarget && _ && c(), _ = !1;
    }
    const v = [
      "[autofocus]",
      'input:not([disabled]):not([type="hidden"])',
      "select:not([disabled])",
      "textarea:not([disabled])",
      "button:not([disabled])",
      "a[href]",
      '[tabindex]:not([tabindex="-1"])'
    ].join(", ");
    let S = null;
    async function C() {
      tt.push(u), document.addEventListener("keydown", g), S = document.activeElement instanceof HTMLElement ? document.activeElement : null, o(), await st(), (i.value?.querySelector("[autofocus]") ?? i.value?.querySelector(v) ?? i.value)?.focus();
    }
    function A() {
      const y = tt.indexOf(u);
      y !== -1 && (tt.splice(y, 1), document.removeEventListener("keydown", g), S?.isConnected && S.focus(), S = null);
    }
    return Ge(() => {
      n.open && C();
    }), ne(
      () => n.open,
      (y) => {
        y ? C() : A();
      }
    ), ke(A), (y, w) => e.open ? (d(), H(Bt, {
      key: 0,
      to: e.to
    }, [
      b("div", {
        class: "dc-shell dc-layer dc-dialog",
        "data-dc-theme": k(s),
        style: ae(k(l)),
        onPointerdown: m,
        onClick: h
      }, [
        b("div", {
          ref_key: "panel",
          ref: i,
          class: oe(["dc-dialog__panel", e.panelClass]),
          role: "dialog",
          "aria-modal": "true",
          tabindex: "-1",
          "aria-labelledby": e.title ? r : void 0,
          "aria-label": e.title ? void 0 : e.label
        }, [
          e.title ? (d(), p("h2", {
            key: 0,
            id: r,
            class: "dc-dialog__title"
          }, L(e.title), 1)) : O("", !0),
          b("div", {
            class: oe(["dc-dialog__body", e.bodyClass])
          }, [
            G(y.$slots, "default", {}, void 0, !0)
          ], 2),
          y.$slots.actions ? (d(), p("div", Eu, [
            G(y.$slots, "actions", {}, void 0, !0)
          ])) : O("", !0)
        ], 10, Mu)
      ], 44, Pu)
    ], 8, ["to"])) : O("", !0);
  }
}), dd = /* @__PURE__ */ Q(Lu, [["__scopeId", "data-v-0cccf313"]]), Tu = 4500, Ou = 9e3, pt = q([]);
let sa = 0;
function ls(e) {
  pt.value = pt.value.filter((t) => t.id !== e);
}
function os(e, t = "ok") {
  sa += 1;
  const n = sa;
  pt.value = [...pt.value, { id: n, message: e, kind: t }], setTimeout(() => ls(n), t === "err" ? Ou : Tu);
}
function Au(e) {
  os(e instanceof Error ? e.message : String(e), "err");
}
function Nu() {
  return { toasts: fs(pt), toast: os, toastError: Au, dismiss: ls };
}
const Iu = ["data-dc-theme"], Bu = ["data-dc-kind", "role"], Ru = /* @__PURE__ */ j({
  __name: "ShellToasts",
  props: {
    to: { default: "body" },
    theme: { default: void 0 },
    accent: { default: void 0 },
    tokens: { default: void 0 }
  },
  setup(e) {
    const t = e, { toasts: n } = Nu(), { theme: a, style: s, adopt: l } = Sn(t);
    return Ge(l), (o, r) => (d(), H(Bt, { to: e.to }, [
      b("div", {
        class: "dc-shell dc-layer dc-toasts",
        "data-dc-theme": k(a),
        style: ae(k(s)),
        "aria-live": "polite"
      }, [
        (d(!0), p(z, null, X(k(n), (i) => (d(), p("div", {
          key: i.id,
          class: "dc-toast",
          "data-dc-kind": i.kind,
          role: i.kind === "err" ? "alert" : void 0
        }, L(i.message), 9, Bu))), 128))
      ], 12, Iu)
    ], 8, ["to"]));
  }
}), fd = /* @__PURE__ */ Q(Ru, [["__scopeId", "data-v-d970211c"]]), Hu = ["aria-label"], qu = ["data-dc-standing", "data-dc-active", "aria-checked", "title", "aria-label", "onClick"], Vu = /* @__PURE__ */ j({
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
    ]), l = (r) => !n.mixed && n.standing === r;
    function o(r, i) {
      r.stopPropagation(), a("set", i);
    }
    return (r, i) => (d(), p("span", {
      class: "dc-standing-control",
      role: "radiogroup",
      "aria-label": `Where the query stands on ${e.name}`
    }, [
      (d(!0), p(z, null, X(s.value, (c) => (d(), p("button", {
        key: c.sign,
        type: "button",
        role: "radio",
        class: "dc-standing-control__choice",
        "data-dc-standing": c.standing ?? "none",
        "data-dc-active": l(c.standing) ? "true" : "false",
        "aria-checked": l(c.standing),
        title: c.hint,
        "aria-label": c.hint,
        onClick: (u) => o(u, c.standing)
      }, L(c.sign), 9, qu))), 128))
    ], 8, Hu));
  }
}), vd = /* @__PURE__ */ Q(Vu, [["__scopeId", "data-v-5524dca6"]]);
function pd(e, t) {
  const n = q(!1);
  let a = null, s = !1, l = 0;
  const o = () => {
    l++, n.value = !1, a !== null && (clearTimeout(a), a = null);
  };
  function r(u) {
    a = setTimeout(() => void i(u), t);
  }
  async function i(u) {
    if (s || u !== l) return;
    let g;
    try {
      g = await e();
    } catch {
      g = !1;
    }
    s || u !== l || (g ? r(u) : o());
  }
  const c = () => {
    n.value || (n.value = !0, i(++l));
  };
  return It(() => {
    s = !0, o();
  }, !0), { start: c, stop: o, polling: n };
}
function hd(e, t = {}) {
  const n = t.key ?? ((l) => JSON.stringify(l)), a = he();
  let s = null;
  return vs(() => {
    const l = e(), o = n(l);
    o !== s && (s = o, a.value = l);
  }), a;
}
function md(e = {}) {
  return { key: "ordinal", kind: "ordinal", label: "#", width: "52px", ...e };
}
function yd(e = {}) {
  return { key: "status", role: "state", kind: "status", label: "State", sort: "state", width: "104px", ...e };
}
function gd(e = {}) {
  return { key: "tint", role: "tint", ...e };
}
function _d(e = {}) {
  return { key: "picture", role: "image", kind: "image", width: "56px", height: "40px", ...e };
}
function wd(e, t = {}) {
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
function kd(e, t = {}) {
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
function bd(e, t, n = {}) {
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
function $d(e, t, n = {}) {
  return { key: e, kind: "date", label: t, sort: e, mono: !0, muted: !0, ...n };
}
function xd(e = {}) {
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
function Sd(e, t, n = {}) {
  return { key: e, label: t, sort: e, truncate: !0, hideBelow: 900, ...n };
}
function Cd(e, t, n, a = {}) {
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
function Gt(e) {
  return typeof e == "number" ? e : typeof e == "string" && e.trim() !== "" ? Number(e) : Number.NaN;
}
function Pd(e) {
  const t = Gt(e);
  return Number.isFinite(t) && t > 0 ? ks(t) : be;
}
function Md(e) {
  const t = Gt(e);
  return Number.isFinite(t) && t > 0 ? bs(t) : be;
}
function Ed(e) {
  const t = Gt(e);
  return Number.isFinite(t) && t > 0 ? $s(t) : be;
}
function Ld(e) {
  const t = Gt(e);
  return Number.isFinite(t) ? xs(t) : be;
}
function Fu(e) {
  if (e <= 0) return 0;
  const t = 10 ** Math.floor(Math.log10(e));
  for (const n of [1, 2, 5])
    if (e <= n * t) return n * t;
  return 10 * t;
}
function Du(e, t) {
  const n = /* @__PURE__ */ new Set();
  for (const a of e) {
    const s = a.fields[t];
    for (const l of Array.isArray(s) ? s : [s])
      typeof l == "string" && l && n.add(l);
  }
  return [...n].sort((a, s) => a.localeCompare(s));
}
function Ku(e, t) {
  let n = 0;
  for (const a of e) {
    const s = a.fields[t];
    typeof s == "number" && s > n && (n = s);
  }
  return n;
}
function Td(e, t, n, a = {}) {
  return {
    kind: "chips",
    key: t,
    label: n,
    options: Du(e, t),
    ...a.multiple ? { multiple: !0 } : {}
  };
}
function Od(e, t, n) {
  return { kind: "range", key: t, label: n, min: 0, max: Fu(Ku(e, t)) };
}
function Ad(e, t, n) {
  return { kind: "toggle", key: e, label: t, text: n };
}
function Nd(e) {
  return e.filter((t) => t.kind === "chips" ? t.options.length > 1 : t.kind === "range" ? t.max > 0 : !0);
}
function Id(e = "", t = "/") {
  const n = q(ce(e)), a = q(t), s = [`${a.value}${n.value}`];
  return {
    search: n,
    path: a,
    history: s,
    href(l, o) {
      return `${o ?? a.value}${ce(l)}`;
    },
    push(l, o) {
      o !== void 0 && (a.value = o), n.value = ce(l), s.push(`${a.value}${n.value}`);
    },
    replace(l, o) {
      o !== void 0 && (a.value = o), n.value = ce(l), s[s.length - 1] = `${a.value}${n.value}`;
    }
  };
}
function la(e) {
  const t = e.indexOf("?");
  if (t === -1) return "";
  const n = e.slice(t), a = n.indexOf("#");
  return ce(a === -1 ? n : n.slice(0, a));
}
function Bd(e) {
  const t = q(la(e.currentRoute.value.fullPath)), n = f(() => e.currentRoute.value.path), a = ne(
    () => e.currentRoute.value.fullPath,
    (s) => {
      t.value = la(s);
    }
  );
  return {
    search: t,
    path: n,
    push: (s, l) => e.push(`${l ?? n.value}${ce(s)}`),
    replace: (s, l) => e.replace(`${l ?? n.value}${ce(s)}`),
    href: (s, l) => {
      const o = `${l ?? n.value}${ce(s)}`;
      return e.resolve?.(o).href ?? o;
    },
    dispose: a
  };
}
function Rd(e, t, n = "/") {
  return (a) => {
    const s = a.params[t], l = Array.isArray(s) ? s.join("/") : s ?? "", o = a.query[Be], r = typeof o == "string" ? o : "", i = `${e}="${l.replace(/"/g, "")}"`;
    return { path: n, query: { ...a.query, [Be]: Ue(r, i) } };
  };
}
function Hd(e, t = "/") {
  return (n) => ({ path: t, query: { ...n.query, [Ye]: e } });
}
function qd(e) {
  const t = /* @__PURE__ */ new Map();
  for (const n of e) {
    const a = t.get(n.entityKey);
    a ? a.push(n) : t.set(n.entityKey, [n]);
  }
  return {
    query(n) {
      return Sa(n, (a) => t.get(a.key) ?? [], {
        undatedLast: !0,
        zeroIsAll: !0
      });
    }
  };
}
function Vd(e, t) {
  return e.query({ ...t, limit: Number.MAX_SAFE_INTEGER, offset: 0 }).rows;
}
const Wu = {
  DataShell: zc,
  ShellHeader: fn,
  RecordActions: St,
  ResultsArea: ss,
  SegmentedControl: ru,
  StatusPill: Qe,
  ListView: pn,
  CardsView: Ua,
  GridView: Qa,
  ImagesView: Ga,
  TableView: ns,
  LinksView: Ya,
  PreviewView: Xa,
  TypeCardsView: as
}, Fd = {
  install(e, t = {}) {
    const n = t.prefix ?? "";
    for (const [a, s] of Object.entries(Wu))
      e.component(`${n}${a}`, s);
    t.route && e.provide(ua, t.route), (t.theme || t.accent || t.tokens) && Cl({ theme: t.theme, accent: t.accent, tokens: t.tokens }, e);
  }
};
export {
  Gu as COLUMN_BREAKPOINTS,
  Qu as COLUMN_ROLES,
  Ua as CardsView,
  aa as ColumnCell,
  bu as CopyButton,
  Gs as DEFAULT_ENTITY_VIEW,
  rn as DEFAULT_SORT,
  on as DEFAULT_VIEW,
  Hl as DRAFT_DELAY,
  zc as DataShell,
  be as EMPTY_CELL,
  Pa as ENTITY_ALL,
  ze as ENTITY_TERM,
  vt as EXPRESSION_TERM,
  Qa as GridView,
  Fd as HeaderContentLayoutPlugin,
  Ga as ImagesView,
  Ya as LinksView,
  pn as ListView,
  Mt as MOCK_TINTS,
  mt as MetricDrill,
  gt as OpenMark,
  bn as PARAM_DIR,
  Ye as PARAM_ENTITY,
  Be as PARAM_EXPR,
  Wt as PARAM_PAGE,
  kn as PARAM_SORT,
  Kt as PARAM_VIEW,
  Uu as PILL_TONES,
  zl as POPOVER_FLIP_BELOW,
  Kl as POPOVER_GAP,
  Wl as POPOVER_MARGIN,
  Cn as PinStar,
  Xa as PreviewView,
  yt as QueryMark,
  nt as RECORD_STATUSES,
  wn as RESULT_FIELDS,
  ua as ROUTE_ADAPTER_KEY,
  St as RecordActions,
  Zn as RecordChoosers,
  ss as ResultsArea,
  Ha as SHELL_CONTEXT_KEY,
  Ot as SHELL_THEME_KEY,
  _t as ScopeMark,
  ru as SegmentedControl,
  He as SelectTick,
  od as ShellCard,
  cd as ShellCode,
  dd as ShellDialog,
  du as ShellFact,
  rd as ShellFacts,
  fn as ShellHeader,
  ud as ShellLog,
  Io as ShellPager,
  Gl as ShellPopover,
  fd as ShellToasts,
  vd as StandingControl,
  id as StatusCounts,
  Qe as StatusPill,
  Ou as TOAST_ERROR_MS,
  Tu as TOAST_MS,
  ns as TableView,
  as as TypeCardsView,
  zn as VIEW_ICONS,
  lt as VIEW_KINDS,
  Wn as VIEW_LABELS,
  Ue as addTerm,
  gn as andExpression,
  Pd as bytesCell,
  fa as cellFull,
  Ui as cellNarrowings,
  Me as cellText,
  xt as cellTextOf,
  ie as cellValue,
  sl as changesResults,
  Td as chipsFrom,
  Nn as columnAlign,
  In as columnClass,
  An as columnKey,
  ts as columnNarrows,
  ht as columnShortcut,
  ya as columnShortcutOf,
  ln as columnTruncates,
  Cs as columnsFor,
  pa as compactShortcuts,
  ao as completeDraft,
  al as countPages,
  hs as createHistoryAdapter,
  Id as createMemoryAdapter,
  qd as createMemoryDataSource,
  vl as createMockDataSource,
  Bd as createVueRouterAdapter,
  $d as dateColumn,
  Es as defaultCellText,
  Pt as defaultQuery,
  Ie as defaultViewFor,
  ms as detachableAdapter,
  an as drillExpression,
  Md as durationCell,
  Ed as elapsedCell,
  tl as emptyFacetValue,
  yl as entityAddress,
  xd as entityColumn,
  ct as entityCount,
  Hd as entityRedirect,
  Oa as excludingTerm,
  ot as expandShortcuts,
  Sd as facetColumn,
  ft as facetField,
  Fa as facetValue,
  Hs as fieldHeading,
  Ta as fieldTerm,
  ut as findEntity,
  Ma as findEntityByAddress,
  Pe as findSort,
  Cd as flagColumn,
  at as fnv1a,
  ka as focusEntity,
  ks as formatBytes,
  Ne as formatCount,
  _s as formatDate,
  Yu as formatDateTime,
  qt as formatDigits,
  bs as formatDuration,
  $s as formatElapsed,
  de as formatExpression,
  De as formatInteger,
  gs as formatMetric,
  ws as formatOrdinal,
  xs as formatPercent,
  Ns as formatRange,
  we as formatTerm,
  fl as generateRows,
  Tl as hasActiveFacets,
  wd as identityColumn,
  ad as idsExpression,
  We as isBuiltinView,
  Zu as isEntityScoped,
  nl as isFacetActive,
  _n as isPristineQuery,
  je as isRangeTerm,
  $a as isTypeCardsQuery,
  wa as isViewKind,
  Ju as joinExpression,
  xn as liftTerm,
  Ds as matchesExpression,
  bd as metricColumn,
  sd as narrowPatch,
  Ks as negateTerm,
  Fu as niceMax,
  ce as normalizeSearch,
  ji as numberRange,
  zs as oppositeTerm,
  md as ordinalColumn,
  ee as parseExpression,
  wl as parseQuery,
  Ld as percentCell,
  _d as pictureColumn,
  jl as placePopover,
  gr as presentParts,
  ja as presentRow,
  dt as pressOptions,
  xl as provideShellContext,
  Cl as provideShellTheme,
  Vd as queryAll,
  Od as rangeFrom,
  Vt as rangeOf,
  Qs as readDraft,
  nd as readExpression,
  Rd as recordRedirect,
  La as recordTerm,
  $l as recordsIn,
  kd as referenceColumn,
  it as refineExpression,
  Ae as resolveView,
  pe as roleColumn,
  da as roleColumns,
  Ms as rowKey,
  rt as sameTerm,
  jt as scopeTerm,
  Tt as scopeTermFor,
  Ba as scopedEntity,
  td as searchFromQuery,
  Ys as searchesCorpus,
  Un as serializeQuery,
  gl as sortAddress,
  Dt as sortsFor,
  Xu as splitExpression,
  Ea as standingTerm,
  yd as stateColumn,
  Ss as stripAnsi,
  Nl as summarizeQuery,
  At as summaryTerms,
  Aa as termStanding,
  gd as tintColumn,
  ed as tintFor,
  Ad as toggleFacet,
  Vi as useColumns,
  ql as useDraft,
  za as useEntityCounts,
  dc as useEntityPreviews,
  Sn as useLayerTheme,
  pd as usePoll,
  Re as usePresentedRows,
  Il as useQueryState,
  Dl as useRecordNames,
  Bl as useResults,
  te as useShellContext,
  hd as useStableSchema,
  Nu as useToasts,
  Nd as usefulFacets,
  Xs as viewAcross,
  Js as viewAfter,
  Da as withFacetValue,
  kl as withStanding,
  bl as withStandings,
  Qn as withWhere,
  ld as withoutFacet,
  Ia as withoutOwnScope,
  Ws as withoutTerm
};
