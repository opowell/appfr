import { ref as q, computed as f, inject as fn, provide as vn, getCurrentInstance as la, shallowRef as pe, toValue as Le, watch as ne, onScopeDispose as Ot, getCurrentScope as oa, defineComponent as j, onMounted as Ue, onBeforeUnmount as we, openBlock as u, createBlock as H, Teleport as At, createElementVNode as $, mergeProps as Oe, unref as k, renderSlot as G, createCommentVNode as T, nextTick as nt, createElementBlock as h, withKeys as Te, useSlots as Nt, useId as It, normalizeClass as oe, withCtx as Y, toDisplayString as E, createTextVNode as J, Fragment as z, renderList as X, withModifiers as xe, withDirectives as $t, normalizeStyle as ae, vModelText as ra, createVNode as U, reactive as En, toHandlers as pn, resolveDynamicComponent as at, createSlots as wt, useModel as Ln, onBeforeUpdate as os, normalizeProps as Zt, guardReactiveProps as rs, mergeModels as Tn, vShow as On, Comment as is, Text as cs, readonly as us, watchEffect as ds } from "vue";
import { MenuList as fs } from "menu-bar";
const hn = ["list", "cards", "grid", "images", "table", "links", "preview"], et = ["ok", "running", "queued", "review", "failed"], zu = [...et, "neutral", "accent"], ju = [
  "identity",
  "reference",
  "metric",
  "state",
  "updated",
  "image",
  "tint"
], Uu = [480, 620, 760, 900, 1100], ia = Symbol("dc.routeAdapter");
function ce(e) {
  if (!e) return "";
  const t = e.replace(/^[?]/, "");
  return t ? `?${t}` : "";
}
function vs() {
  const e = typeof window < "u", t = q(e ? ce(window.location.search) : ""), n = q(e ? window.location.pathname : "/"), a = () => {
    t.value = ce(window.location.search), n.value = window.location.pathname;
  };
  e && window.addEventListener("popstate", a);
  const s = (l, o, i) => {
    const r = ce(l);
    if (!e) {
      t.value = r, i !== void 0 && (n.value = i);
      return;
    }
    const c = i === void 0 || i === window.location.pathname ? `${window.location.pathname}${r}${window.location.hash}` : `${i}${r}`;
    o === "push" ? window.history.pushState(window.history.state, "", c) : window.history.replaceState(window.history.state, "", c), t.value = r, n.value = window.location.pathname;
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
function ps(e, t) {
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
      const i = o ?? (n.value ? t.path() : void 0);
      return e.href ? e.href(l, i) : `${i ?? e.path.value}${ce(l)}`;
    }
  };
}
function tt(e) {
  let t = 2166136261;
  for (let n = 0; n < e.length; n++)
    t ^= e.charCodeAt(n), t = Math.imul(t, 16777619);
  return Math.abs(t);
}
const hs = new Intl.NumberFormat("en-US", {
  minimumSignificantDigits: 2,
  maximumSignificantDigits: 2,
  useGrouping: !1
});
function Bt(e) {
  return Number.isFinite(e) ? Math.abs(e) < 100 ? hs.format(e) : String(Math.round(e)) : "—";
}
function ms(e) {
  return Number.isFinite(e) ? Number.isInteger(e) || Math.abs(e) >= 100 ? Ne(e) : Bt(e) : "—";
}
function Ne(e) {
  if (!Number.isFinite(e)) return "—";
  const t = Math.round(e), n = Math.abs(t);
  return n < 1e3 ? String(t) : n < 9950 ? `${(t / 1e3).toFixed(1)}k` : n < 999500 ? `${Math.round(t / 1e3)}k` : n < 995e4 ? `${(t / 1e6).toFixed(1)}m` : `${Math.round(t / 1e6)}m`;
}
function Ve(e) {
  return Number.isFinite(e) ? Math.round(e).toLocaleString("en-US") : "—";
}
function ys(e) {
  const t = new Date(e);
  if (Number.isNaN(t.getTime())) return "—";
  const n = String(t.getUTCDate()).padStart(2, "0"), a = String(t.getUTCMonth() + 1).padStart(2, "0");
  return `${n}.${a}.${t.getUTCFullYear()}`;
}
function gs(e) {
  return String(e + 1);
}
function Qu(e, t) {
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
function _s(e) {
  if (e == null || !Number.isFinite(e) || e < 0) return "—";
  if (e < 1e3) return `${e} B`;
  const t = ["kB", "MB", "GB", "TB"];
  let n = e, a = -1;
  for (; n >= 1e3 && a < t.length - 1; )
    n /= 1e3, a += 1;
  return `${Bt(n)} ${t[a]}`;
}
function ws(e) {
  if (!e || !Number.isFinite(e)) return "—";
  if (e < 1e3) return `${Math.round(e)}ms`;
  const t = e / 1e3;
  return t < 60 ? `${Bt(t)}s` : `${Math.floor(t / 60)}m ${Math.round(t % 60)}s`;
}
function ks(e) {
  if (e == null || !Number.isFinite(e) || e <= 0)
    return "—";
  const t = Math.floor(e / 60);
  return t ? `${t}:${String(e % 60).padStart(2, "0")}` : `${e}s`;
}
function bs(e) {
  return e == null || !Number.isFinite(e) ? "—" : `${Math.round(e * 100)}%`;
}
function $s(e) {
  return e.replace(/\x1b\[[0-9;?]*[ -/]*[@-~]/g, "");
}
const ke = "—";
function ve(e, t) {
  return e.find((n) => n.role === t);
}
function ca(e, t) {
  return e.filter((n) => n.role === t);
}
function xs(e, t) {
  const n = (t ? t.columns : e?.columns) ?? [], a = t ? "scoped" : "everything";
  return n.filter(
    (s) => s.role !== "tint" && ((s.when ?? "always") === "always" || s.when === a)
  );
}
const Ss = ["id", "entityKey", "entityLabel"];
function ie(e, t) {
  if (e.value) return e.value(t);
  const n = e.field ?? e.key;
  if (n !== void 0) {
    if (t.fields && n in t.fields) return t.fields[n];
    if (Ss.includes(n))
      return t[n];
  }
}
function An(e, t) {
  const n = e.key ?? e.field ?? e.label;
  return n?.trim() ? n.trim() : `column-${t}`;
}
function Cs(e, t) {
  return e.id?.trim() ? e.id : `${e.entityKey || "row"}-${t}`;
}
function Ps(e, t) {
  if (e == null || e === "") return ke;
  if (t === "number") {
    const n = typeof e == "number" ? e : Number(e);
    return Number.isFinite(n) ? ms(n) : String(e);
  }
  return t === "date" ? ys(String(e)) : Array.isArray(e) ? e.length ? e.join(", ") : ke : String(e);
}
function Me(e, t) {
  const n = ie(e, t);
  return e.format ? e.format(n, t) : Ps(n, e.kind);
}
function Ms(e) {
  return typeof e == "number" ? Number.isFinite(e) ? String(e) : "" : typeof e == "string" ? e : Array.isArray(e) ? e.join(", ") : "";
}
function ua(e, t) {
  const n = Me(e, t), a = Ms(ie(e, t));
  return a && a !== n ? a : n;
}
function kt(e, t) {
  return e ? Me(e, t) : "";
}
function Nn(e) {
  return e.align ? e.align : e.kind === "number" || e.kind === "ordinal" ? "right" : "left";
}
const Es = {
  ordinal: "dc-table__num",
  number: "dc-table__number",
  date: "dc-table__date",
  status: "dc-table__state"
};
function In(e) {
  return [Es[e.kind ?? "text"], e.class].filter(Boolean).join(" ");
}
function an(e) {
  if (e.truncate !== void 0) return e.truncate;
  const t = e.kind ?? "text";
  return t === "text" || t === "number" || t === "date";
}
const Ls = /^([A-Za-z_][\w.-]*)\s*(>=|<=|:|=|>|<)\s*(.*)$/, Bn = "-?(?:\\d+\\.?\\d*|\\.\\d+)", Ts = new RegExp(`^(${Bn})?\\.\\.(${Bn})?$`);
function Rt(e) {
  const t = Ts.exec(e.trim());
  if (!t || t[1] === void 0 && t[2] === void 0) return null;
  const n = t[1] === void 0 ? null : Number(t[1]), a = t[2] === void 0 ? null : Number(t[2]);
  return n !== null && a !== null && n > a ? { min: a, max: n } : { min: n, max: a };
}
function Os(e) {
  return `${e.min ?? ""}..${e.max ?? ""}`;
}
function We(e) {
  return e.kind === "field" && (e.comparator === ":" || e.comparator === "=") && Rt(e.value) !== null;
}
function As(e) {
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
function Z(e) {
  const t = e.trim();
  if (!t) return [];
  const n = [];
  let a = [];
  for (const s of As(t)) {
    const l = s.toUpperCase();
    if (l === "AND" || l === "&&") continue;
    if (l === "OR" || l === "||") {
      a.length && n.push(a), a = [];
      continue;
    }
    const o = s.length > 1 && s.startsWith("-"), i = o ? s.slice(1) : s, r = o ? { negated: !0 } : {}, c = Ls.exec(i);
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
const Ce = (e) => e.toLowerCase().replace(/\s+/g, ""), da = [
  ["status", "state"],
  ["state", "state"],
  ["updated", "updated"],
  ["date", "updated"],
  ["name", "identity"],
  ["ref", "reference"]
];
function Ns(e, t, n) {
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
  const i = da.find(([c]) => c === a)?.[1];
  if (i) {
    const c = ve(s, i);
    if (c) return ie(c, t);
  }
  const r = /^metric(\d+)$/.exec(a);
  if (r) {
    const c = ca(s, "metric")[Number(r[1]) - 1];
    if (c) return ie(c, t);
  }
}
function vt(e) {
  return (e.toLowerCase().match(/[\p{L}\p{N}]+/gu) ?? []).map((t) => t.charAt(0)).join("");
}
const Rn = /^[a-z_][\w.-]*$/;
function Ht(e) {
  const t = (e.key ?? e.field)?.toLowerCase();
  if (t !== void 0) return Rn.test(t) ? t : void 0;
  const n = e.label === void 0 ? void 0 : Ce(e.label);
  return n !== void 0 && Rn.test(n) ? n : void 0;
}
function mn(e, t) {
  const n = Ce(e);
  return !!t?.entities.some((a) => a.scope && Ce(a.scope) === n);
}
function Is(e, t, n) {
  const a = Ce(e);
  if (a === "entity" || da.some(([l]) => l === a) || /^metric\d+$/.test(a) || mn(e, n)) return !0;
  const s = (l) => l !== void 0 && Ce(l) === a;
  return (t.columns ?? []).some(
    (l) => s(l.key) || s(l.field) || s(l.label)
  ) || t.facets.some((l) => s(l.key) || s(l.label));
}
function st(e, t, n) {
  return t ? va(e, (a) => {
    const s = pa(a, t, n);
    return s && Ht(s);
  }) : e;
}
function fa(e, t, n) {
  return t ? va(e, (a) => {
    if (mn(a, n)) return;
    const s = (t.columns ?? []).find((l) => Ht(l) === a);
    return s && ha(s, t, n);
  }) : e;
}
function Bs(e, t, n) {
  if (!t || mn(e, n)) return;
  const a = t.facets.find((s) => s.key.toLowerCase() === e);
  return a ? a.label : (t.columns ?? []).find((s) => Ht(s) === e)?.label;
}
function va(e, t) {
  let n = !1;
  const a = Z(e).map(
    (s) => s.map((l) => {
      if (l.kind !== "field") return l;
      const o = t(l.field);
      return !o || o === l.field ? l : (n = !0, { ...l, field: o });
    })
  );
  return n ? ue(a) : e;
}
function pa(e, t, n) {
  if (!(!e || Is(e, t, n)))
    return (t.columns ?? []).find(
      (a) => a.label !== void 0 && vt(a.label) === e
    );
}
function ha(e, t, n) {
  if (!t || e.label === void 0 || !Ht(e)) return;
  const a = vt(e.label);
  return pa(a, t, n) === e ? a : void 0;
}
function en(e, t) {
  const n = e.toLowerCase(), a = t.toLowerCase();
  if (!a.includes("*")) return n.includes(a);
  const s = a.replace(/[.+?^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*");
  return new RegExp(s).test(n);
}
function Hn(e, t) {
  return e.toLowerCase() === t.toLowerCase();
}
function Rs(e, t, n, a) {
  if (e.kind === "text") {
    const r = n.columns ?? [];
    return ["identity", "reference"].some((c) => {
      const d = ve(r, c), p = d ? ie(d, t) : void 0;
      return typeof p == "string" && en(p, e.value);
    });
  }
  const s = Ns(e.field, t, n);
  if (s === void 0) return a?.has(e.field) ? !1 : null;
  const l = We(e) ? Rt(e.value) : null;
  if (l) {
    if (Array.isArray(s) || typeof s == "boolean") return null;
    const r = typeof s == "number" ? s : Number(s);
    return Number.isFinite(r) ? (l.min === null || r >= l.min) && (l.max === null || r <= l.max) : null;
  }
  if (Array.isArray(s))
    return e.comparator === ":" || e.comparator === "=" ? s.some(
      (c) => e.comparator === "=" ? Hn(String(c), e.value) : en(String(c), e.value)
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
    return e.comparator === "=" ? Hn(String(s), e.value) : en(String(s), e.value);
  }
  const o = Number(e.value), i = typeof s == "number" ? s : Number(s);
  return !Number.isFinite(o) || !Number.isFinite(i) ? null : Hs(e.comparator, i, o);
}
function qn(e, t, n, a) {
  const s = Rs(e, t, n, a);
  return s === null ? !0 : e.negated ? !s : s;
}
function Hs(e, t, n) {
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
function Fn(e) {
  return e.kind === "field" && !e.negated && (e.comparator === ":" || e.comparator === "=") && !We(e);
}
const Dn = /* @__PURE__ */ new WeakMap();
function qs(e) {
  if (!e?.strictScopes) return null;
  let t = Dn.get(e);
  return t || (t = new Set(
    e.entities.flatMap((n) => n.scope ? [n.scope.toLowerCase()] : [])
  ), Dn.set(e, t)), t;
}
function Fs(e, t, n, a) {
  if (!e.length) return !0;
  const s = qs(a);
  return e.some((l) => {
    const o = /* @__PURE__ */ new Map();
    for (const i of l)
      Fn(i) && o.set(
        i.field,
        (o.get(i.field) ?? !1) || qn(i, t, n, s)
      );
    return l.every(
      (i) => Fn(i) ? o.get(i.field) === !0 : qn(i, t, n, s)
    );
  });
}
function Vn(e) {
  return /[\s"']/.test(e) ? `"${e.replace(/["']/g, "")}"` : e;
}
function _e(e) {
  const t = e.negated ? "-" : "";
  return e.kind === "text" ? t + Vn(e.value) : `${t}${e.field}${e.comparator}${Vn(e.value)}`;
}
function Ds(e) {
  if (!e.negated) return { ...e, negated: !0 };
  const { negated: t, ...n } = e;
  return n;
}
function ue(e) {
  return e.filter((t) => t.length).map((t) => t.map(_e).join(" ")).join(" OR ");
}
function Vs(e, t, n) {
  return e.map((a, s) => s === t ? a.filter((l, o) => o !== n) : a).filter((a) => a.length);
}
function Gu(e) {
  const t = Z(e);
  if (t.length > 1) return { parts: [], text: e.trim() };
  const n = t[0] ?? [];
  return {
    parts: n.filter((a) => a.kind === "field"),
    text: n.filter((a) => a.kind === "text").map(_e).join(" ")
  };
}
function Yu(e, t) {
  return [...e.map(_e), t.trim()].filter(Boolean).join(" ");
}
const Kn = (e, t) => e.toLowerCase() === t.toLowerCase();
function lt(e, t) {
  return !!e.negated == !!t.negated && ma(e, t);
}
function Ks(e, t) {
  return !!e.negated != !!t.negated && ma(e, t);
}
function ma(e, t) {
  return e.kind === "field" ? t.kind === "field" && e.field === t.field && e.comparator === t.comparator && Kn(e.value, t.value) : t.kind === "text" && Kn(e.value, t.value);
}
function Ws(e, t) {
  return t.filter((n) => !e.some((a) => lt(a, n)));
}
function yn(e, t) {
  return ya(e, t, (n) => n);
}
function ot(e, t) {
  return ya(
    e,
    t,
    (n, a) => n.filter((s) => !a.some((l) => Ks(s, l)))
  );
}
const zs = /^[A-Za-z_][\w.-]*\s*(?:>=|<=|:|=|>|<)$/;
function js(e) {
  return ue(
    Z(e).map(
      (t) => t.filter(
        (n) => n.kind !== "text" || n.value !== "-" && !zs.test(n.value)
      )
    ).filter((t) => t.length > 0)
  );
}
function ya(e, t, n) {
  const a = Z(e), s = Z(t);
  return a.length ? s.length ? ue(
    a.flatMap(
      (l) => s.map((o) => [...n(l, o), ...Ws(l, o)])
    )
  ) : ue(a) : ue(s);
}
const ga = "cards", Us = "table";
function Qs(e, t = null) {
  if (e.trim() === "") return !1;
  if (!t) return !0;
  const n = new Set(
    t.entities.flatMap((a) => a.scope ? [a.scope.toLowerCase()] : [])
  );
  return !Z(e).flat().some((a) => a.kind === "field" && !a.negated && n.has(a.field.toLowerCase()) && a.value !== "");
}
function Ie(e, t = {}, n = "", a = null) {
  const s = (o) => o && _a(o) ? o : void 0;
  if (e === null) {
    const o = Qs(n, a) ? s(t.searchView) : void 0, i = n.trim() === "" ? s(t.homeView) : void 0;
    return o ?? i ?? s(t.view) ?? ga;
  }
  const l = t.landing === "entity" ? s(t.view) : void 0;
  return s(t.entityView) ?? l ?? Us;
}
function Gs(e, t, n, a = {}, s = "", l = s, o = null) {
  return a.viewAcrossTypes !== "default" && e !== Ie(t, a, s, o) ? e : Ie(n, a, l, o);
}
function Ys(e, t, n = {}, a = null) {
  if (e.entity !== t.entity)
    return Gs(e.view, e.entity, t.entity, n, e.expr, t.expr, a);
  const s = Ie(e.entity, n, e.expr, a);
  return e.view === s ? Ie(t.entity, n, t.expr, a) : e.view;
}
const sn = "updated";
function _a(e) {
  return typeof e == "string" && (e === "record" || hn.includes(e));
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
}, Xs = {
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
  if (e === "record" && !t?.includes(e)) return t?.[0] ?? ga;
  const [n] = t ?? [];
  return n === void 0 || t?.includes(e) ? e : n;
}
function rt(e) {
  return typeof e.count == "number" ? Ne(e.count) : e.count;
}
function it(e, t) {
  return t ? e.entities.find((n) => n.key === t) ?? null : null;
}
function wa(e, t = {}) {
  const n = it(e, t.entity), a = e.entities[0];
  if (!n && !a) throw new Error(`Schema "${e.key}" declares no entities`);
  return n ?? a;
}
function ka(e, t = null) {
  return e?.columns ?? t?.columns ?? [];
}
function qt(e, t = null) {
  if (e?.sorts?.length) return e.sorts;
  const n = /* @__PURE__ */ new Set(), a = [];
  for (const s of ka(e, t))
    !s.sort || n.has(s.sort) || (n.add(s.sort), a.push({ key: s.sort, label: (s.label ?? s.sort).toLowerCase() }));
  return a;
}
const Js = { key: sn, label: sn };
function Pe(e, t, n = null) {
  const a = qt(e, n);
  return (t ? a.find((l) => l.key === t) : void 0) ?? a.find((l) => l.key === sn) ?? a[0] ?? Js;
}
function Zs(e) {
  switch (e.kind) {
    case "chips":
      return { kind: "chips", selected: [] };
    case "range":
      return { kind: "range", min: null, max: null };
    case "toggle":
      return { kind: "toggle", on: !1 };
  }
}
function el(e) {
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
function gn(e) {
  return e.entity === null && e.expr.trim() === "";
}
function Xu(e) {
  return e.entity !== null;
}
function ba(e, t) {
  return e.entity === null && Ae(e.view, t) === "cards";
}
function tl(e, t) {
  return t <= 0 ? 1 : Math.max(1, Math.ceil(e / t));
}
function xt(e, t = {}) {
  const a = t.landing === "entity" ? wa(e, t) : null;
  return {
    entity: a?.key ?? null,
    view: Ie(a?.key ?? null, t),
    sort: Pe(a, t.sort).key,
    dir: t.dir === "asc" ? "asc" : "desc",
    expr: "",
    page: 1
  };
}
const _n = ["entity", "sort", "dir", "expr"];
function nl(e) {
  return _n.some((t) => t in e);
}
const $a = (e) => e.kind === "date" || e.role === "updated";
function al(e) {
  if (!e) return () => 0;
  const n = (e.kind ?? "text") === "number" || e.role === "metric", a = $a(e);
  return (s, l) => {
    const o = ie(e, s), i = ie(e, l);
    return n ? Number(i ?? 0) - Number(o ?? 0) : a ? Date.parse(String(i ?? "")) - Date.parse(String(o ?? "")) : String(i ?? "").localeCompare(String(o ?? ""));
  };
}
function zn(e, t) {
  return !t || !$a(t) ? !1 : !Number.isFinite(Date.parse(String(ie(t, e) ?? "")));
}
function xa({ query: e, schema: t, entity: n, limit: a, offset: s }, l, o) {
  const i = Z(e.expr), r = n ? [n] : t.entities;
  let c = 0;
  const d = [];
  for (const b of r)
    for (const C of l(b))
      c += 1, Fs(i, C, b, t) && d.push(C);
  const p = Pe(n, e.sort, t), _ = ka(n, t).find((b) => b.sort === p.key), m = o.undatedLast ? d.filter((b) => !zn(b, _)) : d, g = o.undatedLast ? d.filter((b) => zn(b, _)) : [];
  m.sort(al(_)), e.dir === "asc" && m.reverse();
  const v = g.length ? [...m, ...g] : m;
  return {
    // One page out of the middle. `total` stays the whole match, which is what
    // the shell counts pages with.
    rows: o.zeroIsAll && a <= 0 ? v.slice(s) : v.slice(s, s + a),
    total: d.length,
    unfiltered: d.length === c
  };
}
const St = [
  "oklch(0.36 0.06 240)",
  "oklch(0.34 0.07 290)",
  "oklch(0.36 0.06 160)",
  "oklch(0.38 0.06 80)",
  "oklch(0.35 0.07 30)",
  "oklch(0.34 0.05 200)"
];
function Ju(e) {
  return St[tt(e) % St.length];
}
function Sa(e, t) {
  return `${e}_${1e4 + t * 7}`;
}
const sl = 7, ll = 3;
function ol(e, t, n, a) {
  const s = (t * sl + tt(n)) % a, l = [];
  for (let o = 0; o < Math.min(ll, a); o++)
    l.push(Sa(e, (s + o) % a));
  return l;
}
function rl(e, t) {
  switch (e.kind) {
    case "chips":
      return e.multiple ? il(e.options, t) : e.options[t % e.options.length] ?? "";
    case "range": {
      const n = Math.max(0, e.max - e.min);
      return e.min + (n === 0 ? 0 : t % (n + 1));
    }
    case "toggle":
      return t % 3 === 0;
  }
}
function il(e, t) {
  if (!e.length) return [];
  const n = 1 + (t >> 5) % Math.min(3, e.length), a = t % e.length, s = /* @__PURE__ */ new Set();
  for (let l = 0; l < n; l++) s.add((a + l) % e.length);
  return [...s].sort((l, o) => l - o).map((l) => e[l]);
}
function cl(e, t) {
  const { hash: n, sample: a, revision: s, updatedAt: l } = t, o = s ? ` · rev ${s + 1}` : "";
  switch (e.role) {
    case "identity":
      return `${a[0]}${o}`;
    case "reference":
      return s ? `${a[1]}-${s + 1}` : a[1];
    case "state":
      return et[n % et.length];
    case "updated":
      return l;
    case "tint":
      return St[n % St.length];
    case "metric":
      return 1 + n % 940;
  }
  switch (e.kind) {
    case "number":
      return 1 + n % 940;
    case "status":
      return et[n % et.length];
    case "date":
      return l;
    default:
      return;
  }
}
function ul(e, t = {}) {
  const n = t.population ?? 48, a = t.seed ?? "", s = t.now ?? /* @__PURE__ */ new Date("2026-08-25T00:00:00Z"), l = e.samples, o = t.scopes ?? [];
  if (!l.length) return [];
  const i = [];
  for (let r = 0; r < n; r++) {
    const c = l[r % l.length], d = Math.floor(r / l.length), p = tt(`${a}:${e.key}:${c[0]}:${r}`), _ = Sa(e.key, r), m = new Date(s.getTime() - p % 900 * 36e5).toISOString(), g = {};
    for (const v of e.columns ?? []) {
      const b = v.field ?? v.key;
      if (!b || v.value) continue;
      const C = cl(v, {
        hash: tt(`${p}:${b}`),
        sample: c,
        revision: d,
        updatedAt: m
      });
      C !== void 0 && (g[b] = C);
    }
    for (const v of e.facets)
      g[v.key] = rl(v, tt(`${p}:${v.key}`));
    for (const [v, b] of o)
      g[v] = b === e.key ? _ : ol(b, r, v, n);
    i.push({ id: _, entityKey: e.key, entityLabel: e.label, fields: g });
  }
  return i;
}
function dl(e = {}) {
  const t = /* @__PURE__ */ new Map(), n = (a, s) => {
    const l = t.get(a.key);
    if (l) return l;
    const o = e.scopes ?? s.entities.flatMap(
      (r) => r.scope ? [[r.scope, r.key]] : []
    ), i = ul(a, { ...e, scopes: o });
    return t.set(a.key, i), i;
  };
  return {
    query(a) {
      return xa(a, (s) => n(s, a.schema), {
        undatedLast: !1,
        zeroIsAll: !1
      });
    }
  };
}
const Qe = "e", Ft = "v", wn = "s", kn = "d", Be = "q", Dt = "p", Ca = "*", fl = [
  Qe,
  Ft,
  wn,
  kn,
  Be,
  Dt
], vl = [
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
function Ct(e) {
  let t = encodeURIComponent(e);
  for (const [n, a] of vl) t = t.replace(n, a);
  return t;
}
function ge(e) {
  try {
    return decodeURIComponent(e.replace(/\+/g, " "));
  } catch {
    return e.replace(/\+/g, " ");
  }
}
function bn(e) {
  const t = e.replace(/^[?]/, "");
  if (!t) return [];
  const n = [];
  for (const a of t.split("&")) {
    if (!a) continue;
    const s = a.indexOf("="), l = s === -1 ? a : a.slice(0, s), o = s === -1 ? "" : a.slice(s + 1);
    n.push([ge(l), o]);
  }
  return n;
}
function pl(e) {
  return fl.includes(e);
}
function Vt(e, t) {
  if (!(!t || e.some((n) => n.key === t)))
    return e.find((n) => vt(n.label) === t);
}
function hl(e, t) {
  const n = vt(e.label);
  return Vt(t.entities, n)?.key === e.key ? n : e.key;
}
function Pa(e, t) {
  return t ? it(e, t) ?? Vt(e.entities, t) ?? null : null;
}
function ml(e, t) {
  const n = vt(e.label);
  return Vt(t, n)?.key === e.key ? n : e.key;
}
function yl(e, t) {
  return t.some((n) => n.key === e) ? e : Vt(t, e)?.key ?? e;
}
function gl(e, t, n = {}) {
  const a = xt(t, n), s = new Map(bn(e)), l = s.get(Qe), o = l === void 0 ? a.entity : ge(l), i = o === Ca ? null : Pa(t, o), r = s.get(Be), c = r === void 0 ? "" : st(ge(r), i, t), d = s.get(Ft), p = d && _a(ge(d)) ? ge(d) : Ie(i?.key ?? null, n, c, t), _ = s.get(wn), m = Pe(
    i,
    _ ? yl(ge(_), qt(i, t)) : n.sort,
    t
  ), g = s.get(kn), v = g ? ge(g) === "asc" ? "asc" : "desc" : a.dir, b = s.get(Dt), C = b === void 0 ? 1 : Number(ge(b)), A = Number.isFinite(C) ? Math.max(1, Math.floor(C)) : 1;
  return {
    entity: i?.key ?? null,
    view: p,
    sort: m.key,
    dir: v,
    expr: c,
    page: A
  };
}
function jn(e, t, n = {}, a = "") {
  const s = xt(t, n), l = it(t, e.entity), o = bn(a).filter(([p]) => !pl(p)), i = [], r = (p, _) => i.push([p, Ct(_)]), c = l?.key ?? null;
  if (c !== s.entity && r(Qe, l ? hl(l, t) : Ca), e.view !== Ie(c, n, e.expr, t) && r(Ft, e.view), e.sort !== s.sort) {
    const p = qt(l, t), _ = p.find((m) => m.key === e.sort);
    r(wn, _ ? ml(_, p) : e.sort);
  }
  e.dir !== s.dir && r(kn, e.dir), e.expr.trim() !== "" && r(Be, fa(e.expr, l, t)), e.page > 1 && r(Dt, String(e.page));
  const d = [
    ...o.map(([p, _]) => [Ct(p), _]),
    ...i
  ];
  return d.length ? `?${d.map(([p, _]) => _ === "" ? p : `${p}=${_}`).join("&")}` : "";
}
function Zu(e) {
  const t = [];
  for (const [n, a] of Object.entries(e))
    for (const s of Array.isArray(a) ? a : [a]) {
      if (typeof s != "string") continue;
      const l = Ct(n);
      t.push(s === "" ? l : `${l}=${Ct(s)}`);
    }
  return t.length ? `?${t.join("&")}` : "";
}
function ed(e, t) {
  const n = new Map(bn(e)), a = n.get(Be), s = a === void 0 ? "" : ge(a);
  if (!t) return s;
  const l = n.get(Qe);
  return st(
    s,
    l === void 0 ? null : Pa(t, ge(l)),
    t
  );
}
function Kt(e, t) {
  return Ea(e, t.id);
}
function Ma(e, t) {
  return e?.standing === !1 ? null : Kt(e, t);
}
function Ea(e, t) {
  const n = e?.scope;
  return n ? La(n, t) : null;
}
function La(e, t) {
  return `${e}="${t.replace(/"/g, "")}"`;
}
function td(e, t) {
  const n = typeof e == "string" ? e : e?.scope;
  if (!n) return null;
  const a = t.filter((s) => s.replace(/"/g, "") !== "").map((s) => La(n, s));
  return a.length ? a.join(" ") : null;
}
function Wt(e, t) {
  if (e.kind !== "field" || t.kind !== "field") return lt(e, t);
  const n = (a) => a.comparator === ":" || a.comparator === "=";
  return lt(e, { ...t, comparator: n(e) && n(t) ? e.comparator : t.comparator });
}
function Pt(e, t) {
  return Wt(e, Ds(t));
}
function Mt(e, t) {
  return Kt(
    e.entities.find((n) => n.key === t.entityKey),
    t
  );
}
function ze(e, t) {
  if (!t) return e;
  const n = e.trim();
  if (!n) return t;
  const [a] = Z(t).flat();
  if (!a) return n;
  const s = Z(n);
  return s.some((i) => i.some((r) => Wt(r, a))) ? n : s.some((i) => i.some((r) => Pt(r, a))) ? ue(
    s.map(
      (i) => i.map((r) => Pt(r, a) ? a : r)
    )
  ) : `${n} ${t}`;
}
function Ta(e) {
  if (!e) return null;
  const t = e.trim();
  return t ? t.startsWith("-") ? t.slice(1) : `-${t}` : null;
}
function Oa(e, t) {
  if (!t || !e.trim()) return null;
  const [n] = Z(t).flat();
  if (!n) return null;
  const a = Z(e).flat();
  return a.some((s) => Wt(s, n)) ? n.negated ? "out" : "in" : a.some((s) => Pt(s, n)) ? n.negated ? "in" : "out" : null;
}
function $n(e, t) {
  if (!t || !e.trim()) return e;
  const [n] = Z(t).flat();
  if (!n) return e;
  const a = Z(e), s = a.map(
    (l) => l.filter((o) => !Wt(o, n) && !Pt(o, n))
  );
  return s.every((l, o) => l.length === a[o]?.length) ? e : ue(s);
}
function _l(e, t, n) {
  return t ? n === null ? $n(e, t) : ze(e, n === "out" ? Ta(t) : t) : e;
}
function wl(e, t, n) {
  const a = t.filter(Boolean), s = () => a.reduce((r, c) => _l(r, c, n), e);
  if (n !== "in") return s();
  const l = /* @__PURE__ */ new Map();
  for (const r of a) {
    const [c] = Z(r).flat();
    if (!c) continue;
    const d = c.kind === "field" ? c.field : "";
    l.set(d, [...l.get(d) ?? [], c]);
  }
  if (l.size <= 1) return s();
  const o = a.reduce((r, c) => $n(r, c), e), i = o.trim() ? Z(o) : [[]];
  return ue(i.flatMap((r) => [...l.values()].map((c) => [...r, ...c])));
}
function ln(e, t) {
  const n = t.shiftKey ? `noopener,popup,width=${window.outerWidth},height=${window.outerHeight}` : "noopener";
  window.open(e, "_blank", n);
}
function Aa() {
  const e = window.getSelection?.();
  return !!e && !e.isCollapsed;
}
function on(e) {
  return e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0;
}
function ct(e) {
  return e.altKey ? { exclude: !0 } : {};
}
function tn(e, t, n, a = {}, s) {
  const l = Mt(e, n);
  if (a.exclude) return Un(ze(t.expr, Ta(l)), s);
  const o = l !== null && e.entities.find((i) => i.key === n.entityKey)?.narrowsAlone === !0;
  return Un(ze(o ? "" : t.expr, l), s);
}
function Un(e, t) {
  const n = t?.trim() ? Z(t).flat() : [];
  if (!n.length) return e;
  const a = new Set(n.flatMap((i) => i.kind === "field" ? [i.field] : [])), s = (i) => i.kind === "field" && !i.negated && (i.comparator === ":" || i.comparator === "=") && a.has(i.field), l = e.trim(), o = l ? Z(l) : [[]];
  if (o.length === 1 && !o[0].some(s)) {
    const i = n.filter((r) => !o[0].some((c) => lt(c, r)));
    return [l, ...i.map(_e)].filter(Boolean).join(" ");
  }
  return ue(
    o.map((i) => {
      const r = i.filter((c) => !s(c));
      return [...r, ...n.filter((c) => !r.some((d) => lt(d, c)))];
    })
  );
}
function Na(e, t) {
  const n = e?.scope?.toLowerCase();
  if (!n || e?.keepsScope || !t.trim()) return t;
  const a = Z(t), s = a.map(
    (l) => l.filter((o) => o.kind !== "field" || o.field !== n)
  );
  return s.every((l, o) => l.length === a[o]?.length) ? t : ue(s);
}
function Ia(e, t) {
  const n = t.toLowerCase();
  return e.entities.find((a) => a.scope?.toLowerCase() === n) ?? null;
}
function Ba(e, t, n) {
  if (!t || !n) return null;
  const a = Ia(e, t);
  return a ? { entity: a, id: n } : null;
}
function kl(e, t) {
  const n = [], a = /* @__PURE__ */ new Set();
  for (const s of t)
    for (const l of Z(s).flat()) {
      if (l.kind !== "field" || l.negated) continue;
      const o = Ba(e, l.field, l.value);
      if (!o) continue;
      const i = `${o.entity.key}:${o.id.toLowerCase()}`;
      a.has(i) || (a.add(i), n.push({ entityKey: o.entity.key, id: o.id }));
    }
  return n;
}
function nd(e, t, n = "cards") {
  return {
    // An expression with nothing in it is no parameter, as the shell writes it.
    [Be]: ze(e, t) || void 0,
    [Qe]: void 0,
    [Ft]: n,
    [Dt]: void 0
  };
}
const Ra = Symbol("dc.shellContext");
function bl(e) {
  const t = e.liveQuery ? e : $l(e);
  return vn(Ra, t), t;
}
function $l(e) {
  const t = e.draft ?? q("");
  return {
    draft: t,
    liveQuery: e.query,
    drafting: f(() => !1),
    commitDraft() {
      const n = t.value.trim();
      n && (e.setExpression(
        ot(e.query.value.expr, st(n, e.entity.value, e.schema.value))
      ), t.value = "");
    },
    abandonDraft() {
      t.value = "";
    },
    ...e
  };
}
function ee() {
  const e = fn(Ra, null);
  if (!e)
    throw new Error(
      "[appfr] No shell context found. Render this component inside <DataShell>."
    );
  return e;
}
const Et = Symbol("dc-shell-theme");
function rn(e) {
  return {
    read: () => ({
      theme: Le(e.theme),
      accent: Le(e.accent),
      tokens: Le(e.tokens)
    })
  };
}
function xl(e, t) {
  t ? t.provide(Et, rn(e)) : vn(Et, rn(e));
}
function Sl(e) {
  const t = la();
  vn(Et, {
    ...rn(e),
    element: () => t?.proxy?.$el ?? null
  });
}
function xn(e) {
  const t = la(), n = fn(Et, null), a = pe(null);
  function s() {
    const r = t?.proxy?.$el, d = (r instanceof Element ? r : r?.parentElement)?.closest(".dc-shell");
    if (!d) {
      a.value = null;
      return;
    }
    const p = {};
    for (const _ of Array.from(d.style))
      _.startsWith("--") && (p[_] = d.style.getPropertyValue(_));
    a.value = { shell: d, theme: d.dataset.dcTheme, tokens: p };
  }
  const l = f(() => {
    const r = a.value;
    if (!n) return r;
    const c = n.element?.();
    return r && c && r.shell !== c && c.contains(r.shell) ? r : n.read();
  }), o = f(() => e.theme ?? l.value?.theme ?? "minimal"), i = f(() => {
    const r = l.value, c = {
      ...r?.tokens,
      ...r?.accent ? { "--dc-accent": r.accent } : {},
      ...e.tokens,
      ...e.accent ? { "--dc-accent": e.accent } : {}
    };
    return Object.keys(c).length ? c : void 0;
  });
  return { theme: o, style: i, adopt: s };
}
function ut(e) {
  return e.key.toLowerCase();
}
const Cl = /* @__PURE__ */ new Set([">", ">=", "<", "<="]);
function Ha(e, t) {
  if (e.kind !== "field" || e.negated || e.field !== ut(t)) return !1;
  const n = e.comparator === ":" || e.comparator === "=";
  switch (t.kind) {
    case "range":
      return We(e) || Cl.has(e.comparator);
    case "chips":
      return n && !We(e) && qa(t.options, e.value) !== void 0;
    case "toggle":
      return n && Pl(e.value);
  }
}
function qa(e, t) {
  const n = t.toLowerCase();
  return e.find((a) => a.toLowerCase() === n);
}
function Pl(e) {
  const t = e.toLowerCase();
  return t === "true" || t === "yes";
}
function Fa(e, t) {
  const n = (Z(e)[0] ?? []).filter((a) => Ha(a, t));
  switch (t.kind) {
    case "range": {
      let a = null, s = null;
      for (const l of n) {
        const o = Rt(l.value), i = Number(l.value);
        o ? (o.min !== null && (a = o.min), o.max !== null && (s = o.max)) : Number.isFinite(i) && (l.comparator.startsWith(">") ? a = i : s = i);
      }
      return { kind: "range", min: a, max: s };
    }
    case "chips": {
      const a = new Set(n.map((s) => qa(t.options, s.value)));
      return { kind: "chips", selected: t.options.filter((s) => a.has(s)) };
    }
    case "toggle":
      return { kind: "toggle", on: n.length > 0 };
  }
}
function Ml(e, t) {
  const n = ut(e);
  switch (t.kind) {
    case "range":
      return t.min === null && t.max === null ? [] : [{ kind: "field", field: n, comparator: ":", value: Os(t) }];
    case "chips":
      return t.selected.map((a) => ({ kind: "field", field: n, comparator: "=", value: a }));
    case "toggle":
      return t.on ? [{ kind: "field", field: n, comparator: ":", value: "true" }] : [];
  }
}
function Da(e, t, n) {
  const a = Ml(t, n), s = Z(e), l = (s.length ? s : [[]]).map((o) => [
    ...o.filter((i) => !Ha(i, t)),
    ...a
  ]);
  return ue(l);
}
function ad(e, t) {
  return Da(e, t, Zs(t));
}
function El(e, t) {
  return (t?.facets ?? []).some((n) => el(Fa(e, n)));
}
const Ke = "entity", dt = "expr", Ll = { ">=": "≥", "<=": "≤", ">": ">", "<": "<" };
function Je(e) {
  const t = Number(e);
  return Number.isFinite(t) && !Number.isInteger(t) ? Bt(t) : String(e);
}
function Tl(e, t, n) {
  if (e.kind !== "field") return _e(e);
  const a = Bs(e.field, t, n);
  if (a === void 0) return _e(e);
  const s = e.negated ? "-" : "", l = We(e) ? Rt(e.value) : null;
  if (l) {
    const i = l.min !== null && l.max !== null ? `${Je(l.min)} ≤ ${a} ≤ ${Je(l.max)}` : l.max !== null ? `${a} ≤ ${Je(l.max)}` : `${a} ≥ ${Je(l.min)}`;
    return s + i;
  }
  const o = Ll[e.comparator];
  return o ? `${s}${a} ${o} ${Je(e.value)}` : _e({ ...e, field: a });
}
function Lt(e, t, n = null) {
  const a = [];
  return t && a.push({
    id: Ke,
    label: `entity:${t.key}`,
    facetKey: Ke
  }), Z(e.expr).forEach((s, l) => {
    s.forEach((o, i) => {
      a.push({
        id: `${dt}:${l}:${i}`,
        label: Tl(o, t, n),
        address: fa(_e(o), t, n),
        facetKey: dt,
        group: l,
        index: i,
        ...o.kind === "field" ? { field: o.field, value: o.value } : {},
        ...o.negated ? { negated: !0 } : {}
      });
    });
  }), a;
}
function Ol(e, t, n = null) {
  if (gn(e)) {
    const l = Pe(t, e.sort, n);
    return `everything · ${e.view} · ${l.label}`;
  }
  const a = Lt(e, t).filter((l) => l.facetKey !== dt).map((l) => l.label), s = e.expr.trim();
  return s && a.push(`"${s}"`), a.join(" · ");
}
function Al(e) {
  const { adapter: t } = e, n = f(() => Le(e.schema)), a = f(() => Le(e.defaults) ?? {}), s = f(() => gl(t.search.value, n.value, a.value)), l = f(() => it(n.value, s.value.entity)), o = f(() => l.value ?? wa(n.value, a.value)), i = f(() => qt(l.value, n.value)), r = f(() => Pe(l.value, s.value.sort, n.value)), c = (y, w) => {
    const O = jn(y, n.value, a.value, t.search.value);
    return O === t.search.value && !t.elsewhere?.value ? !1 : (w === "push" ? t.push(O) : t.replace(O), !0);
  }, d = () => Le(e.navigationMode) ?? "push", p = () => Le(e.facetNavigationMode) ?? "replace", _ = (y, w) => c(m(y), w), m = (y) => {
    const w = y.page ?? (nl(y) ? 1 : s.value.page), O = { ...s.value, ...y, page: w };
    return y.view === void 0 && (O.view = Ys(s.value, O, a.value, n.value)), O;
  }, g = (y) => v(m(y)), v = (y) => {
    const w = jn(y, n.value, a.value, t.search.value);
    return t.href ? t.href(w) : `${t.path.value}${w}`;
  }, b = (y, w) => {
    const O = l.value?.facets.find((R) => R.key === y);
    if (!O) return;
    const M = Da(s.value.expr, O, w(Fa(s.value.expr, O)));
    _({ expr: M }, p());
  }, C = (y) => {
    const w = y === null ? null : it(n.value, y);
    return (w?.key ?? null) === s.value.entity ? {} : {
      entity: w?.key ?? null,
      sort: Pe(w, s.value.sort, n.value).key
    };
  }, A = (y) => {
    const w = C(y);
    Object.keys(w).length && _(w, d());
  };
  return {
    query: s,
    entity: l,
    focus: o,
    sort: r,
    sorts: i,
    summary: f(() => Ol(s.value, l.value, n.value)),
    terms: f(() => Lt(s.value, l.value, n.value)),
    isPristine: f(() => gn(s.value)),
    isEverything: f(() => s.value.entity === null),
    hasFacets: f(() => El(s.value.expr, l.value)),
    setEntity: A,
    entityHref: (y) => g(C(y)),
    clearEntity: () => A(null),
    setView(y, w) {
      _(w === void 0 ? { view: y } : { view: y, page: Math.max(1, Math.floor(w)) }, d());
    },
    setSort(y) {
      _({ sort: Pe(l.value, y, n.value).key }, d());
    },
    toggleDirection() {
      _({ dir: s.value.dir === "desc" ? "asc" : "desc" }, d());
    },
    setExpression(y) {
      return _({ expr: y }, d());
    },
    narrow(y, w, O) {
      return _({ expr: y, ...C(w), ...O ? { view: O } : {} }, d());
    },
    narrowHref(y, w, O) {
      return g({ expr: y, ...C(w), ...O ? { view: O } : {} });
    },
    setPage(y, w) {
      _({ page: Math.max(1, Math.floor(y)) }, w ?? d());
    },
    setFacet(y, w) {
      b(y, () => w);
    },
    toggleChip(y, w) {
      b(y, (O) => O.kind !== "chips" ? O : { kind: "chips", selected: O.selected.includes(w) ? O.selected.filter((R) => R !== w) : [...O.selected, w] });
    },
    setRange(y, w, O) {
      b(y, (M) => M.kind === "range" ? { kind: "range", min: w, max: O } : M);
    },
    toggleFlag(y) {
      b(
        y,
        (w) => w.kind === "toggle" ? { kind: "toggle", on: !w.on } : w
      );
    },
    removeTerm(y) {
      if (y.facetKey === Ke) {
        A(null);
        return;
      }
      if (y.facetKey === dt) {
        const w = Vs(Z(s.value.expr), y.group ?? 0, y.index ?? 0);
        _({ expr: ue(w) }, d());
      }
    },
    clearFilters() {
      _({ ...C(null), expr: "" }, d());
    },
    clearHref: () => g({ ...C(null), expr: "" }),
    reset() {
      c(xt(n.value, a.value), d());
    },
    homeHref: () => v(xt(n.value, a.value)),
    // The same rule the mutations follow, so a link built for a change goes
    // exactly where clicking through to that change would have gone.
    hrefFor: (y) => g(y)
  };
}
const Qn = 50;
function Nl(e) {
  const t = pe([]), n = q(0), a = q(0), s = q(!1), l = q(!1), o = pe(null);
  let i = 0, r = null, c = null;
  const d = f(() => (e.query.value.page - 1) * e.limit.value), p = f(() => tl(n.value, e.limit.value)), _ = f(() => Math.max(0, n.value - a.value)), m = () => {
    const x = e.query.value, I = e.within?.value.trim(), L = Na(e.entity.value, x.expr);
    return I ? { ...x, expr: yn(I, L) } : L === x.expr ? x : { ...x, expr: L };
  }, g = (x, I) => {
    t.value = x.rows, n.value = x.total, a.value = x.kept ?? 0, o.value = null, v(I);
  }, v = (x) => {
    r = { key: x, total: n.value }, l.value = !1;
  }, b = (x) => {
    o.value = x, t.value = [], n.value = 0, a.value = 0, r = null, l.value = !1;
  }, C = (x, I, L, K) => {
    let D = !0;
    const te = () => x === i;
    let re = 0, he = !1;
    const me = (le) => {
      re = le, he = !0, K === void 0 && (n.value = le);
    }, qe = () => {
      D && (D = !1, t.value = [], a.value = 0, me(0)), o.value = null;
    };
    return {
      get open() {
        return te();
      },
      insert(le, Ge) {
        if (!te()) return;
        const ye = Array.isArray(le) ? le : [le];
        if (!ye.length) return;
        qe();
        const de = [...t.value];
        de.splice(Ge ?? de.length, 0, ...ye), t.value = I > 0 ? de.slice(0, I) : de, me(re + ye.length);
      },
      set(le) {
        te() && (le.rows && (qe(), t.value = I > 0 ? le.rows.slice(0, I) : le.rows, me(le.rows.length)), le.total !== void 0 && me(le.total));
      },
      close() {
        te() && (s.value = !1, he && (n.value = re), v(L));
      },
      fail(le) {
        te() && (b(le), s.value = !1);
      }
    };
  }, A = () => {
    const x = c;
    c = null, x?.();
  }, y = () => {
    const x = ++i;
    A();
    const I = w.value, L = r?.key === I ? r.total : void 0;
    l.value = L === void 0;
    const K = {
      query: m(),
      schema: e.schema.value,
      entity: e.entity.value,
      limit: e.limit.value,
      offset: d.value
    }, D = e.source.value;
    if (D.stream) {
      s.value = !0;
      try {
        c = D.stream(K, C(x, K.limit, I, L)) ?? null;
      } catch (re) {
        b(re), s.value = !1;
      }
      return;
    }
    let te;
    try {
      te = D.query(K);
    } catch (re) {
      b(re);
      return;
    }
    if (!(te instanceof Promise)) {
      g(te, I), s.value = !1;
      return;
    }
    s.value = !0, te.then((re) => {
      x === i && g(re, I);
    }).catch((re) => {
      x === i && b(re);
    }).finally(() => {
      x === i && (s.value = !1);
    });
  }, w = f(() => {
    const x = m();
    return `${e.entity.value?.key ?? e.schema.value.entities[0]?.key ?? ""}|${JSON.stringify(_n.map((L) => x[L]))}`;
  }), O = f(() => `${w.value}|${e.query.value.page}`);
  return ne([e.source, O, e.limit], y, {
    immediate: !0
  }), Ot(() => {
    i++, A();
  }, !0), { rows: t, total: n, matched: _, offset: d, pageCount: p, pending: s, counting: l, error: o, refresh: y, locate: async (x, I) => {
    const L = Math.max(0, I - 1 - Qn);
    try {
      const { rows: K } = await e.source.value.query({
        query: m(),
        schema: e.schema.value,
        entity: e.entity.value,
        limit: Qn * 2 + 1,
        offset: L
      }), D = K.findIndex((te) => te.id === x);
      return D === -1 ? null : L + D + 1;
    } catch {
      return null;
    }
  }, peek: async (x, I) => {
    if (I <= 0) return [];
    try {
      const { rows: L } = await e.source.value.query({
        query: m(),
        schema: e.schema.value,
        entity: e.entity.value,
        limit: I,
        offset: Math.max(0, x)
      });
      return L;
    } catch {
      return [];
    }
  } };
}
function Il(e) {
  const t = pe(null);
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
    const r = e.rows.value[0];
    if (r?.id === i.id) {
      i.gone && (t.value = { ...i, gone: !1, next: void 0 });
      return;
    }
    (!i.gone || r?.id !== i.next) && l(i);
  }, l = async (i) => {
    const r = ++n, c = await e.locate(i.id, i.page), d = c === null && i.next ? await e.locate(i.next, i.page) : null;
    if (r !== n || t.value?.id !== i.id || t.value.page !== i.page) return;
    const p = e.rows.value[0]?.id;
    c !== null ? o(c, !1) : d === null ? t.value = { ...i, gone: !0, next: p } : d !== i.page && o(d);
  }, o = (i, r = t.value?.gone ?? !1) => {
    t.value && (t.value = { ...t.value, page: i, gone: r }, e.moveTo(i));
  };
  return ne([e.active, e.rows, e.pending, e.page, e.list], s, {
    immediate: !0,
    flush: "post"
  }), {
    id: f(() => t.value?.id ?? null),
    gone: f(() => t.value?.gone === !0),
    holding: f(() => t.value !== null),
    step(i) {
      const r = t.value;
      return !r?.gone || i < r.page ? i : i - 1 > r.page ? i - 1 : (a(), null);
    },
    moveTo: o
  };
}
const Bl = 150;
function Rl(e) {
  const t = e.delay ?? Bl, n = q(""), a = q("");
  let s = !1, l;
  const o = () => {
    clearTimeout(l), l = void 0;
  }, i = f(() => st(js(a.value), e.entity.value, e.schema?.value)), r = f(() => i.value.trim() !== ""), c = f(
    () => JSON.stringify([i.value, ..._n.map((m) => e.query.value[m])])
  ), d = pe(null), p = f(() => {
    const m = e.query.value;
    if (!r.value) return m;
    const g = d.value?.of === c.value ? d.value.page : 1;
    return { ...m, expr: ot(m.expr, i.value), page: g };
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
  return oa() && Ot(o), {
    text: n,
    live: p,
    drafting: r,
    setPage(m) {
      d.value = { of: c.value, page: Math.max(1, Math.floor(m)) };
    },
    commit() {
      const m = n.value.trim();
      if (!m) return;
      const g = ot(
        e.query.value.expr,
        st(m, e.entity.value, e.schema?.value)
      );
      a.value = m, _(() => e.setExpression(g));
    },
    abandon() {
      o(), s = !1, n.value = "", a.value = "";
    },
    release: _
  };
}
const Hl = 25, Va = (e, t) => e.toLowerCase() === t.toLowerCase();
function ql(e, t) {
  return e.find((n) => Va(n.id, t));
}
function Fl(e) {
  const t = pe(/* @__PURE__ */ new Map()), n = /* @__PURE__ */ new Set(), a = (i) => {
    if (i.facetKey !== dt) return null;
    const r = Ba(e.schema.value, i.field, i.value);
    return r ? { ...r, key: `${r.entity.key}:${r.id}` } : null;
  }, s = (i) => {
    const { entity: r, id: c } = i, d = e.query.value;
    return e.source.value.query({
      query: {
        ...d,
        entity: r.key,
        // The reference on its own. The rest of the query is about the rows on
        // screen, which are of another type entirely.
        expr: Ea(r, c) ?? "",
        sort: Pe(r, d.sort, e.schema.value).key,
        page: 1
      },
      schema: e.schema.value,
      entity: r,
      limit: Hl,
      offset: 0
    });
  }, l = (i, r) => {
    const c = kt(ve(i.columns ?? [], "identity"), r);
    return c === ke || Va(c, r.id) ? "" : c;
  }, o = () => {
    if (e.loading.value) return;
    const i = /* @__PURE__ */ new Map();
    for (const d of e.terms.value) {
      const p = a(d);
      p && !t.value.has(p.key) && !n.has(p.key) && i.set(p.key, p);
    }
    if (!i.size) return;
    const r = [...i.values()].map((d) => ({
      reference: d,
      outcome: s(d)
    })), c = (d) => {
      const p = new Map(t.value);
      d.forEach((_, m) => {
        const { reference: g } = r[m], v = ql(_.rows, g.id);
        p.set(g.key, v ? l(g.entity, v) : "");
      }), t.value = p;
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
  return ne([e.source, e.schema, e.terms, e.loading], () => {
    try {
      o();
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
const Dl = 4, Vl = 8, Kl = 180;
function Wl(e, t, n, a = {}) {
  const s = a.gap ?? Dl, l = a.margin ?? Vl, o = a.flipBelow ?? Kl, i = a.side ?? "below", r = {
    below: n.height - e.bottom - s - l,
    above: e.top - s - l
  }, c = i === "below" ? "above" : "below", d = r[i] < o && r[c] > r[i] ? c : i, p = Math.min(a.maxHeight ?? 1 / 0, Math.max(0, r[d])), _ = Math.max(0, n.width - l * 2), m = Math.min(a.minWidth ?? e.width, _), g = Math.min(Math.max(t, m), _), v = a.align === "end" ? e.right - g : e.left, b = Math.max(l, Math.min(v, n.width - g - l));
  return d === "below" ? { side: d, left: b, top: e.bottom + s, maxHeight: p, minWidth: m, maxWidth: _ } : { side: d, left: b, bottom: n.height - e.top + s, maxHeight: p, minWidth: m, maxWidth: _ };
}
const zl = ["data-dc-theme", "data-dc-side"], Se = [], jl = /* @__PURE__ */ j({
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
    const n = e, a = t, { theme: s, style: l, adopt: o } = xn(n), i = q(null), r = q(null), c = { root: () => i.value };
    function d() {
      const y = n.anchor;
      y && (r.value = Wl(
        y.getBoundingClientRect(),
        i.value?.offsetWidth ?? 0,
        { width: window.innerWidth, height: window.innerHeight },
        { side: n.side, align: n.align, maxHeight: n.maxHeight, minWidth: n.minWidth }
      ));
    }
    const p = f(() => {
      const y = r.value, w = y ? {
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
      return i.value?.contains(y) || n.anchor?.contains(y) ? !0 : Se.slice(Se.indexOf(c) + 1).some((O) => O.root()?.contains(y));
    }
    function g(y) {
      const w = y.target;
      w && !m(w) && _();
    }
    function v(y) {
      y.key !== "Escape" || y.defaultPrevented || Se[Se.length - 1] === c && (y.preventDefault(), i.value?.contains(document.activeElement) && n.anchor?.focus(), _());
    }
    let b = null;
    async function C() {
      Se.includes(c) || (Se.push(c), o(), r.value = null, await nt(), d(), window.addEventListener("pointerdown", g, !0), document.addEventListener("keydown", v, !0), window.addEventListener("resize", d), window.addEventListener("scroll", d, !0), typeof ResizeObserver < "u" && i.value && (b = new ResizeObserver(() => d()), b.observe(i.value)));
    }
    function A() {
      const y = Se.indexOf(c);
      y !== -1 && (Se.splice(y, 1), window.removeEventListener("pointerdown", g, !0), document.removeEventListener("keydown", v, !0), window.removeEventListener("resize", d), window.removeEventListener("scroll", d, !0), b?.disconnect(), b = null);
    }
    return Ue(() => {
      n.open && C();
    }), ne(
      () => n.open,
      (y) => {
        y ? C() : A();
      }
    ), ne(() => n.anchor, () => {
      n.open && d();
    }), we(A), (y, w) => e.open ? (u(), H(At, {
      key: 0,
      to: e.to
    }, [
      $("div", Oe({
        ref_key: "root",
        ref: i
      }, y.$attrs, {
        class: "dc-shell dc-layer dc-popover",
        "data-dc-theme": k(s),
        "data-dc-side": r.value?.side,
        style: p.value
      }), [
        G(y.$slots, "default", {}, void 0, !0)
      ], 16, zl)
    ], 8, ["to"])) : T("", !0);
  }
}), Q = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [a, s] of t)
    n[a] = s;
  return n;
}, Ul = /* @__PURE__ */ Q(jl, [["__scopeId", "data-v-a688f2f7"]]), Ql = ["href"], Gl = /* @__PURE__ */ j({
  __name: "PressLink",
  props: {
    href: {},
    selectable: { type: Boolean }
  },
  emits: ["press"],
  setup(e, { emit: t }) {
    const n = e, a = t;
    function s(i) {
      i.stopPropagation(), !Aa() && (n.href && on(i) ? ln(n.href, i) : a("press", ct(i), i));
    }
    function l(i) {
      n.href && i.button === 1 && ln(n.href, i);
    }
    function o(i) {
      if (n.href && on(i)) {
        i.stopPropagation();
        return;
      }
      i.preventDefault(), a("press", ct(i), i);
    }
    return (i, r) => e.selectable ? (u(), h("span", {
      key: 0,
      role: "link",
      tabindex: "0",
      class: "dc-press",
      onClick: s,
      onAuxclick: l,
      onKeydown: r[0] || (r[0] = Te((c) => c.currentTarget.click(), ["enter"]))
    }, [
      G(i.$slots, "default", {}, void 0, !0)
    ], 32)) : e.href ? (u(), h("a", {
      key: 1,
      href: e.href,
      class: "dc-press",
      onClick: o
    }, [
      G(i.$slots, "default", {}, void 0, !0)
    ], 8, Ql)) : (u(), h("button", {
      key: 2,
      type: "button",
      class: "dc-press",
      onClick: o
    }, [
      G(i.$slots, "default", {}, void 0, !0)
    ]));
  }
}), se = /* @__PURE__ */ Q(Gl, [["__scopeId", "data-v-e5165a68"]]), Tt = (e) => e.toLowerCase().replace(/\s+/g, ""), Yl = /(?:[^\s"]|"[^"]*"?)*$/, Xl = /^(-?)([^:=<>"\s-][^:=<>"\s]*)([:=])(.*)$/, Gn = 4;
function Jl(e, t) {
  const n = Tt(t);
  return e.find((a) => ut(a) === n || Tt(a.label) === n);
}
function Zl(e) {
  switch (e.kind) {
    case "toggle":
      return e.text;
    case "range":
      return `${e.min}..${e.max}`;
    case "chips": {
      const t = e.options.slice(0, Gn).join(" · "), n = e.options.length - Gn;
      return n > 0 ? `${t} · +${n}` : t;
    }
  }
}
function eo(e) {
  switch (e.kind) {
    case "toggle":
      return [{ value: "true", hint: e.text }, { value: "false" }];
    case "chips":
      return e.options.map((t) => ({ value: t }));
    case "range":
      return [];
  }
}
function Yn(e, t) {
  return Tt(e).includes(Tt(t));
}
function to(e, t) {
  const n = Yl.exec(e)?.[0] ?? "", a = e.slice(0, e.length - n.length), s = [], l = Xl.exec(n);
  if (l) {
    const [, o, i, r, c] = l, d = Jl(t, i);
    if (!d) return [];
    const p = c.replace(/"/g, "").toLowerCase();
    for (const { value: _, hint: m } of eo(d)) {
      if (!_.toLowerCase().includes(p)) continue;
      const g = _e({
        kind: "field",
        field: ut(d),
        comparator: r,
        value: _,
        ...o ? { negated: !0 } : {}
      });
      s.push({ draft: a + g, label: g, ...m ? { hint: m } : {}, complete: !0 });
    }
  } else {
    if (/[<>"]/.test(n)) return [];
    const o = n.startsWith("-") ? "-" : "", i = n.slice(o.length);
    for (const r of t) {
      if (i && !Yn(r.key, i) && !Yn(r.label, i)) continue;
      const c = `${o}${ut(r)}:`;
      s.push({ draft: a + c, label: c, hint: Zl(r), complete: !1 });
    }
  }
  return s.filter((o) => o.draft !== e);
}
const no = { class: "dc-header__main" }, ao = {
  class: "dc-header__brand",
  "aria-hidden": "true"
}, so = { class: "dc-header__sr" }, lo = {
  key: 2,
  class: "dc-header__within"
}, oo = ["title"], ro = { class: "dc-header__query" }, io = ["data-dc-more", "title"], co = { class: "dc-header__run" }, uo = {
  key: 0,
  class: "dc-header__or dc-mono",
  "aria-hidden": "true"
}, fo = ["title", "aria-label", "onClick"], vo = ["placeholder", "aria-expanded", "aria-activedescendant", "onKeydown"], po = ["id", "aria-selected", "onClick"], ho = { class: "dc-completion__term dc-mono" }, mo = {
  key: 0,
  class: "dc-completion__hint"
}, yo = {
  key: 0,
  class: "dc-header__actions"
}, go = /* @__PURE__ */ j({
  __name: "ShellHeader",
  props: {
    panel: { type: Boolean }
  },
  setup(e) {
    const t = Nt(), n = e, a = ee(), s = f(() => a.schema.value), l = f(() => {
      const P = a.within.value.trim();
      return P ? Lt({ ...a.query.value, expr: P }, null) : [];
    }), o = f(() => {
      const P = a.entity.value, B = P?.keepsScope ? void 0 : P?.scope?.toLowerCase();
      return a.terms.value.filter((W) => n.panel || W.facetKey !== Ke).map((W, V, De) => {
        const fe = De[V - 1];
        return {
          term: W,
          or: fe?.group !== void 0 && W.group !== void 0 && W.group !== fe.group,
          idle: !!B && W.field?.toLowerCase() === B
        };
      });
    }), i = Fl({
      source: a.source,
      schema: a.schema,
      query: a.query,
      loading: a.loading,
      // The scope's parts as well as the query's: it names a record more often
      // than a typed term does, being what a record's own page is built on.
      terms: f(() => [...l.value, ...a.terms.value])
    });
    function r(P) {
      const B = Ia(s.value, P)?.scopeLabel ?? P;
      return B.charAt(0).toUpperCase() + B.slice(1);
    }
    function c(P) {
      return P.replace(/\s*\([^()]*\)\s*$/, "");
    }
    function d(P) {
      if (P.facetKey === Ke) {
        const V = a.entity.value?.label;
        return V ? `${V} · ${Ne((a.matched ?? a.total).value)}` : P.label;
      }
      const B = i.nameOf(P);
      return B ? `${P.negated ? "-" : ""}${r(P.field)}: ${c(B)}` : P.label;
    }
    function p(P) {
      const B = d(P.term), W = P.idle ? `Not applied to ${a.entity.value?.label} — remove ${B}` : `Remove ${B}`, V = P.term.address;
      return V && V !== B ? `${W}
Written ${V} in the address and the search box` : W;
    }
    const _ = f(() => {
      const P = a.pressPreview?.value;
      if (!P) return [];
      const B = a.query.value, W = new Set(a.terms.value.map((V) => V.address));
      return Lt(
        { ...B, expr: P.alone ? P.term : ot(B.expr, P.term) },
        a.entity.value,
        a.schema.value
      ).filter((V) => V.address !== void 0 && !W.has(V.address)).map(
        (V) => P.name ? `${r(V.field)}: ${c(P.name)}` : V.label
      );
    }), m = f(() => a.pressPreview?.value?.alone === !0), g = q(null);
    function v(P) {
      g.value = P instanceof HTMLInputElement ? P : null;
    }
    function b() {
      a.abandonDraft(), g.value?.blur();
    }
    function C() {
      const P = w.value[y.value];
      if (O.value && P) {
        R(P);
        return;
      }
      L.value = null, A.value = !1, a.commitDraft();
    }
    const A = q(!1), y = q(-1), w = f(() => {
      const P = a.entity.value?.facets ?? [];
      return P.length ? to(a.draft.value, P) : [];
    }), O = f(() => A.value && w.value.length > 0);
    ne(w, () => {
      y.value = -1;
    });
    const M = `${It() ?? "dc-header"}-completions`;
    function R(P) {
      a.draft.value = P.draft, A.value = !P.complete, y.value = -1, nt(() => {
        const B = g.value;
        B?.focus(), B?.setSelectionRange(P.draft.length, P.draft.length);
      });
    }
    function x(P, B) {
      if (P.isComposing || !w.value.length) return;
      if (P.preventDefault(), !A.value) {
        A.value = !0;
        return;
      }
      const W = w.value.length + 1;
      y.value = (y.value + 1 + B + W) % W - 1;
    }
    function I(P) {
      return `${M}-${P}`;
    }
    const L = q(null), K = f(() => Math.min(L.value ?? 1 / 0, o.value.length)), D = f(() => [
      { key: "before", entries: o.value.slice(0, K.value) },
      { key: "after", entries: o.value.slice(K.value) }
    ]), te = f(() => K.value < o.value.length);
    ne(o, (P) => {
      L.value !== null && L.value >= P.length && (L.value = null);
    });
    function re(P, B) {
      L.value = P >= o.value.length ? null : Math.max(0, P), nt(() => {
        const W = g.value;
        if (!W) return;
        const V = B === "start" ? 0 : W.value.length;
        W.setSelectionRange(V, V), W.scrollIntoView({ block: "nearest", inline: "nearest" }), Ee();
      });
    }
    function he(P) {
      const B = g.value;
      return !B || B.selectionStart !== B.selectionEnd ? !1 : B.selectionStart === (P === "start" ? 0 : B.value.length);
    }
    function me(P) {
      K.value === 0 || !he("start") || (P.preventDefault(), re(P.key === "Home" ? 0 : K.value - 1, "start"));
    }
    function qe(P) {
      !te.value || !he("end") || (P.preventDefault(), re(P.key === "End" ? o.value.length : K.value + 1, "end"));
    }
    function le(P) {
      K.value === 0 || !he("start") || (P.preventDefault(), de(o.value[K.value - 1].term, !0));
    }
    function Ge(P) {
      !te.value || !he("end") || (P.preventDefault(), de(o.value[K.value].term, !1));
    }
    function ye(P) {
      P.isComposing || P.altKey || P.ctrlKey || P.metaKey || P.shiftKey || (P.key === "ArrowLeft" || P.key === "Home" ? me(P) : P.key === "ArrowRight" || P.key === "End" ? qe(P) : P.key === "Backspace" ? le(P) : P.key === "Delete" && Ge(P));
    }
    function de(P, B) {
      B && L.value !== null && (L.value = Math.max(0, L.value - 1)), a.removeTerm(P);
    }
    function Ye(P) {
      P.target?.closest("button, input") || (P.preventDefault(), g.value?.focus(), re(o.value.length, "end"));
    }
    function Ut() {
      A.value = !1, a.draft.value || (L.value = null);
    }
    const Xe = q(null), Fe = q("");
    function Ee() {
      const P = Xe.value;
      if (!P) {
        Fe.value = "";
        return;
      }
      const B = P.scrollLeft > 1, W = P.scrollWidth - P.clientWidth - P.scrollLeft > 1;
      Fe.value = B && W ? "both" : B ? "start" : W ? "end" : "";
    }
    let be = null;
    return ne(
      Xe,
      (P) => {
        be?.disconnect(), be = null, Ee(), !(!P || typeof ResizeObserver > "u") && (be = new ResizeObserver(Ee), be.observe(P));
      },
      { flush: "post" }
    ), ne([o, K], Ee, { flush: "post" }), we(() => be?.disconnect()), (P, B) => (u(), h("div", {
      class: oe(["dc-header", { "dc-header--panel": n.panel }])
    }, [
      $("div", no, [
        !n.panel && s.value.label && t.brand ? (u(), H(se, {
          key: 0,
          class: "dc-header__domain",
          "data-dc-brand": "",
          title: "Home",
          href: k(a).homeHref(),
          onPress: B[0] || (B[0] = (W) => k(a).reset())
        }, {
          default: Y(() => [
            $("span", ao, [
              G(P.$slots, "brand", {
                label: s.value.label
              }, void 0, !0)
            ]),
            $("span", so, E(s.value.label), 1)
          ]),
          _: 3
        }, 8, ["href"])) : !n.panel && s.value.label ? (u(), H(se, {
          key: 1,
          class: "dc-header__domain",
          title: "Home",
          href: k(a).homeHref(),
          onPress: B[1] || (B[1] = (W) => k(a).reset())
        }, {
          default: Y(() => [
            J(E(s.value.label), 1)
          ]),
          _: 1
        }, 8, ["href"])) : T("", !0),
        G(P.$slots, "lead", {}, void 0, !0),
        l.value.length ? (u(), h("span", lo, [
          B[10] || (B[10] = $("span", { class: "dc-header__sr" }, "Within", -1)),
          (u(!0), h(z, null, X(l.value, (W) => (u(), h("span", {
            key: `scope:${W.id}`,
            class: "dc-within dc-mono dc-truncate",
            title: d(W)
          }, E(d(W)), 9, oo))), 128))
        ])) : T("", !0),
        $("div", ro, [
          $("div", {
            class: "dc-header__field",
            onMousedown: Ye
          }, [
            $("div", {
              ref_key: "termBar",
              ref: Xe,
              class: "dc-header__terms",
              "data-dc-more": Fe.value,
              title: k(a).summary.value,
              onScroll: Ee
            }, [
              (u(!0), h(z, null, X(D.value, (W) => (u(), h(z, {
                key: W.key
              }, [
                $("span", co, [
                  (u(!0), h(z, null, X(W.entries, (V) => (u(), h(z, {
                    key: V.term.id
                  }, [
                    V.or ? (u(), h("span", uo, "or")) : T("", !0),
                    $("button", {
                      type: "button",
                      class: oe(["dc-term dc-mono", { "dc-term--idle": V.idle, "dc-term--leaving": m.value, "dc-term--type": V.term.facetKey === k(Ke) }]),
                      title: p(V),
                      "aria-label": `Remove ${d(V.term)}`,
                      onMousedown: B[2] || (B[2] = xe(() => {
                      }, ["prevent"])),
                      onClick: (De) => de(V.term, W.key === "before")
                    }, E(d(V.term)), 43, fo)
                  ], 64))), 128)),
                  W.key === "before" ? (u(!0), h(z, { key: 0 }, X(_.value, (V) => (u(), h("span", {
                    key: V,
                    class: "dc-term dc-term--preview dc-mono",
                    "aria-hidden": "true"
                  }, E(V), 1))), 128)) : T("", !0)
                ]),
                W.key === "before" ? $t((u(), h("input", {
                  key: 0,
                  ref_for: !0,
                  ref: v,
                  "onUpdate:modelValue": B[3] || (B[3] = (V) => k(a).draft.value = V),
                  class: oe(["dc-header__search dc-mono", { "dc-header__search--between": te.value }]),
                  style: ae({ "--dc-typed": String(Math.max(1, k(a).draft.value.length)) }),
                  type: "text",
                  autocomplete: "off",
                  spellcheck: "false",
                  placeholder: te.value ? "" : "Filter…",
                  "aria-label": "Filter",
                  role: "combobox",
                  "aria-autocomplete": "list",
                  "aria-expanded": O.value,
                  "aria-controls": M,
                  "aria-activedescendant": O.value && y.value >= 0 ? I(y.value) : void 0,
                  onKeydown: [
                    Te(xe(C, ["prevent"]), ["enter"]),
                    Te(xe(b, ["prevent"]), ["esc"]),
                    B[4] || (B[4] = Te((V) => x(V, 1), ["down"])),
                    B[5] || (B[5] = Te((V) => x(V, -1), ["up"])),
                    ye
                  ],
                  onFocus: B[6] || (B[6] = (V) => A.value = !0),
                  onInput: B[7] || (B[7] = (V) => A.value = !0),
                  onBlur: Ut
                }, null, 46, vo)), [
                  [ra, k(a).draft.value]
                ]) : T("", !0)
              ], 64))), 128))
            ], 40, io)
          ], 32)
        ])
      ]),
      U(Ul, {
        id: M,
        open: O.value,
        anchor: g.value,
        "min-width": 0,
        "max-height": 320,
        class: "dc-completions",
        role: "listbox",
        "aria-label": "Completions",
        onClose: B[9] || (B[9] = (W) => A.value = !1)
      }, {
        default: Y(() => [
          (u(!0), h(z, null, X(w.value, (W, V) => (u(), h("div", {
            id: I(V),
            key: W.label,
            class: oe(["dc-completion", { "dc-completion--active": V === y.value }]),
            role: "option",
            "aria-selected": V === y.value,
            onMousedown: B[8] || (B[8] = xe(() => {
            }, ["prevent"])),
            onClick: (De) => R(W)
          }, [
            $("span", ho, E(W.label), 1),
            W.hint ? (u(), h("span", mo, E(W.hint), 1)) : T("", !0)
          ], 42, po))), 128))
        ]),
        _: 1
      }, 8, ["open", "anchor"]),
      t.actions ? (u(), h("div", yo, [
        G(P.$slots, "actions", {}, void 0, !0)
      ])) : T("", !0)
    ], 2));
  }
}), cn = /* @__PURE__ */ Q(go, [["__scopeId", "data-v-3a764b58"]]), _o = ["checked", "indeterminate"], Ka = /* @__PURE__ */ j({
  __name: "PageTick",
  setup(e) {
    const t = ee(), n = f(() => t.rows.value.filter((l) => t.isSelected(l)).length), a = f(
      () => t.rows.value.length > 0 && n.value === t.rows.value.length
    ), s = f(() => n.value > 0 && !a.value);
    return (l, o) => (u(), h("input", {
      class: "dc-tick",
      type: "checkbox",
      checked: a.value,
      indeterminate: s.value,
      "aria-label": "Select every row on this page",
      title: "Select every row on this page",
      onChange: o[0] || (o[0] = (i) => k(t).selectPage(!a.value))
    }, null, 40, _o));
  }
}), wo = { class: "dc-pick" }, ko = ["id"], bo = ["id", "aria-expanded", "aria-labelledby", "data-dc-value"], $o = {
  key: 0,
  class: "dc-pick__icon",
  viewBox: "0 0 16 16",
  "aria-hidden": "true"
}, xo = ["d"], So = { class: "dc-pick__label" }, Co = /* @__PURE__ */ j({
  __name: "PickControl",
  props: {
    modelValue: {},
    options: {},
    label: {},
    mono: { type: Boolean }
  },
  emits: ["update:modelValue", "open", "close"],
  setup(e, { emit: t }) {
    const n = e, a = t, s = It() ?? "dc-pick", l = q(null), o = q(null), i = q(null), r = q(!1), c = f(() => i.value !== null), d = q(null), p = f(
      () => n.options.find((w) => w.key === n.modelValue) ?? n.options[0]
    ), _ = f(
      () => n.options.map((w) => ({
        id: w.key,
        label: w.label,
        icon: w.icon,
        checked: w.key === n.modelValue
      }))
    ), m = f(
      () => i.value ? { maxHeight: `${window.innerHeight - i.value.y - 8}px` } : void 0
    );
    function g(w) {
      const O = l.value?.getBoundingClientRect();
      O && (d.value = l.value?.closest(".dc-shell") ?? document.body, i.value = { x: O.left, y: O.bottom + 4, mirrorX: O.right }, r.value = w, a("open"));
    }
    function v(w) {
      i.value && a("close"), i.value = null, w && l.value?.focus();
    }
    function b() {
      c.value ? v(!0) : g(!1);
    }
    function C(w) {
      w.key !== "ArrowDown" && w.key !== "ArrowUp" || c.value || (w.preventDefault(), g(!0));
    }
    function A(w) {
      const O = w.target;
      O && (l.value?.contains(O) || o.value?.root?.contains(O) || v(!1));
    }
    ne(c, (w) => {
      w ? window.addEventListener("pointerdown", A, !0) : window.removeEventListener("pointerdown", A, !0);
    }), we(() => window.removeEventListener("pointerdown", A, !0));
    function y(w) {
      v(!0), !(w.id === void 0 || w.id === n.modelValue) && a("update:modelValue", w.id);
    }
    return (w, O) => (u(), h("span", wo, [
      $("span", {
        id: `${k(s)}-name`,
        class: "dc-pick__name"
      }, E(e.label), 9, ko),
      $("button", {
        id: `${k(s)}-value`,
        ref_key: "trigger",
        ref: l,
        type: "button",
        class: oe(["dc-pick__button", { "dc-mono": e.mono }]),
        "aria-haspopup": "menu",
        "aria-expanded": c.value,
        "aria-labelledby": `${k(s)}-name ${k(s)}-value`,
        "data-dc-value": e.modelValue,
        onClick: b,
        onKeydown: C
      }, [
        p.value?.icon ? (u(), h("svg", $o, [
          $("path", {
            d: p.value.icon
          }, null, 8, xo)
        ])) : T("", !0),
        $("span", So, E(p.value?.label), 1)
      ], 42, bo),
      O[1] || (O[1] = $("svg", {
        class: "dc-pick__mark",
        viewBox: "0 0 16 16",
        "aria-hidden": "true"
      }, [
        $("path", { d: "M4 6l4 4 4-4" })
      ], -1)),
      i.value && d.value ? (u(), H(At, {
        key: 0,
        to: d.value
      }, [
        U(k(fs), {
          ref_key: "menu",
          ref: o,
          class: "dc-pick__list",
          style: ae(m.value),
          items: _.value,
          at: i.value,
          label: e.label,
          autofocus: r.value,
          onChoose: y,
          onDismiss: O[0] || (O[0] = (M) => v(!0))
        }, null, 8, ["style", "items", "at", "label", "autofocus"])
      ], 8, ["to"])) : T("", !0)
    ]));
  }
}), un = /* @__PURE__ */ Q(Co, [["__scopeId", "data-v-0e31a711"]]), Po = {
  class: "dc-pager",
  "aria-label": "Pages"
}, Mo = ["title"], Eo = ["value", "onKeydown"], Lo = {
  class: "dc-pager__total",
  "aria-hidden": "true"
}, To = {
  class: "dc-pager__sr",
  "aria-live": "polite"
}, Oo = /* @__PURE__ */ j({
  __name: "ShellPager",
  props: {
    pagesNote: {}
  },
  setup(e) {
    const t = e, n = ee(), a = f(() => n.liveQuery.value.page), s = f(
      () => `${n.counting.value ? "~" : ""}${Ve(n.pageCount.value)}`
    ), l = f(() => {
      if (n.limit.value === 1) {
        const v = `Record ${Ve(a.value)} of ${s.value}`;
        return t.pagesNote ? `${v}
${t.pagesNote}` : v;
      }
      let m = `Page ${Ve(a.value)} of ${s.value}`;
      const g = n.rows.value.length;
      if (g) {
        const v = n.offset.value + 1, b = `${n.counting.value ? "~" : ""}${Ve(n.total.value)}`;
        m += ` — rows ${Ve(v)} to ${Ve(v + g - 1)} of ${b}`;
      }
      return t.pagesNote ? `${m}
${t.pagesNote}` : m;
    }), o = q(null), i = f(() => o.value ?? String(a.value)), r = f(
      () => `calc(${Math.max(2, String(n.pageCount.value).length)}ch + 10px)`
    );
    function c(m) {
      m.target.select();
    }
    function d(m) {
      const g = m.target, v = g.value.replace(/[^0-9]/g, "");
      g.value !== v && (g.value = v), o.value = v;
    }
    function p(m) {
      const g = m.target, v = Number(o.value);
      o.value = null;
      const b = Number.isFinite(v) && v >= 1 ? Math.min(Math.trunc(v), Math.max(1, n.pageCount.value)) : a.value;
      g.value = String(b), b !== a.value && n.setPage(b);
    }
    function _(m) {
      const g = m.target;
      o.value = null, g.value = String(a.value), g.blur();
    }
    return (m, g) => (u(), h("nav", Po, [
      U(se, {
        class: "dc-pager__step",
        "aria-label": "Previous page",
        href: a.value > 1 ? k(n).hrefFor({ page: a.value - 1 }) : null,
        disabled: a.value <= 1,
        onPress: g[0] || (g[0] = (v) => k(n).setPage(a.value - 1))
      }, {
        default: Y(() => [...g[2] || (g[2] = [
          $("span", { "aria-hidden": "true" }, "‹", -1)
        ])]),
        _: 1
      }, 8, ["href", "disabled"]),
      $("span", {
        class: "dc-pager__page dc-mono",
        title: l.value
      }, [
        $("input", {
          class: "dc-pager__box dc-mono",
          type: "text",
          inputmode: "numeric",
          autocomplete: "off",
          "aria-label": "Page",
          style: ae({ width: r.value }),
          value: i.value,
          onFocus: c,
          onInput: d,
          onKeydown: [
            Te(xe(p, ["prevent"]), ["enter"]),
            Te(xe(_, ["prevent"]), ["esc"])
          ],
          onBlur: p
        }, null, 44, Eo),
        $("span", Lo, "/ " + E(s.value), 1)
      ], 8, Mo),
      $("span", To, E(l.value), 1),
      U(se, {
        class: "dc-pager__step",
        "aria-label": "Next page",
        href: a.value < k(n).pageCount.value ? k(n).hrefFor({ page: a.value + 1 }) : null,
        disabled: a.value >= k(n).pageCount.value,
        onPress: g[1] || (g[1] = (v) => k(n).setPage(a.value + 1))
      }, {
        default: Y(() => [...g[3] || (g[3] = [
          $("span", { "aria-hidden": "true" }, "›", -1)
        ])]),
        _: 1
      }, 8, ["href", "disabled"])
    ]));
  }
}), Ao = /* @__PURE__ */ Q(Oo, [["__scopeId", "data-v-bdec7640"]]), No = {
  key: 0,
  class: "dc-actions__order"
}, Io = {
  key: 1,
  class: "dc-actions__select"
}, Bo = {
  key: 0,
  class: "dc-actions__all"
}, Ro = {
  class: "dc-actions__count",
  "aria-live": "polite"
}, Ho = {
  key: 1,
  class: "dc-actions__count dc-actions__all",
  "aria-live": "polite"
}, qo = { class: "dc-actions__ops" }, Fo = ["title", "disabled"], Do = ["title", "disabled"], Vo = ["disabled"], Ko = ["data-dc-operation", "disabled", "onClick"], Wo = ["disabled"], zo = /* @__PURE__ */ j({
  __name: "RecordActions",
  props: {
    views: {},
    selectionPlacement: {},
    pagesNote: {}
  },
  setup(e) {
    const t = e, n = ee(), a = f(() => Ae(n.query.value.view, t.views)), s = f(
      () => (d.value || p.value) && a.value !== "table" && n.sorts.value.length > 0
    ), l = f(
      () => n.sorts.value.map((M) => ({ key: M.key, label: M.label }))
    ), o = f(() => s.value && l.value.length > 1), i = f(() => n.query.value.dir === "desc"), r = f(
      () => `Sorted by ${n.sort.value.label}, ${i.value ? "descending" : "ascending"}`
    ), c = f(() => n.entity.value), d = f(
      () => !ba(n.query.value, t.views) && a.value !== "record"
    ), p = f(() => a.value === "record" && n.query.value.entity !== null), _ = f(
      () => (d.value || p.value) && !n.loading.value && (n.pageCount.value > 1 || !!t.pagesNote)
    ), m = f(() => n.selection.value.ids.length), g = f(
      () => d.value && n.selectable.value && (n.rows.value.length > 0 || m.value > 0)
    ), v = f(() => a.value === "table"), b = f(
      () => s.value || _.value || d.value && (g.value || !!(c.value?.create || c.value?.duplicate || c.value?.delete || c.value?.operations?.length))
    ), C = f(() => m.value ? `${m.value} selected` : v.value ? "" : "Select all"), A = f(() => t.selectionPlacement === "end"), y = f(() => n.selectionTerms.value.length), w = (M) => y.value ? `${M} ${y.value}` : M;
    function O(M) {
      return m.value ? M.endsWith("…") ? `${M.slice(0, -1)} ${m.value}…` : `${M} ${m.value}` : M;
    }
    return (M, R) => b.value ? (u(), h("div", {
      key: 0,
      class: oe(["dc-actions", { "dc-actions--selection-end": A.value }])
    }, [
      s.value ? (u(), h("span", No, [
        o.value ? (u(), H(un, {
          key: 0,
          class: "dc-actions__pick dc-actions__sort",
          label: "Sort",
          "model-value": k(n).sort.value.key,
          options: l.value,
          "onUpdate:modelValue": k(n).setSort
        }, null, 8, ["model-value", "options", "onUpdate:modelValue"])) : T("", !0),
        U(se, {
          class: "dc-actions__dir",
          "aria-label": r.value,
          title: r.value,
          href: k(n).hrefFor({ dir: i.value ? "asc" : "desc" }),
          onPress: R[0] || (R[0] = (x) => k(n).toggleDirection())
        }, {
          default: Y(() => [
            J(E(i.value ? "↓" : "↑"), 1)
          ]),
          _: 1
        }, 8, ["aria-label", "title", "href"])
      ])) : T("", !0),
      g.value && C.value ? (u(), h("div", Io, [
        v.value ? (u(), h("span", Ho, E(C.value), 1)) : (u(), h("label", Bo, [
          U(Ka),
          $("span", Ro, E(C.value), 1)
        ])),
        m.value ? (u(), h("button", {
          key: 2,
          type: "button",
          class: oe(["dc-actions__clear", { "dc-actions__clear--op": A.value }]),
          onClick: R[1] || (R[1] = (x) => k(n).clearSelection())
        }, " Clear ", 2)) : T("", !0)
      ])) : T("", !0),
      $("div", qo, [
        c.value?.create ? (u(), H(se, {
          key: 0,
          class: "dc-actions__op dc-actions__new",
          href: k(n).createHref?.(c.value),
          onPress: R[2] || (R[2] = (x) => k(n).create(c.value))
        }, {
          default: Y(() => [
            R[7] || (R[7] = $("span", {
              class: "dc-actions__plus",
              "aria-hidden": "true"
            }, "+", -1)),
            J(" " + E(c.value.create), 1)
          ]),
          _: 1
        }, 8, ["href"])) : T("", !0),
        d.value && k(n).standable.value ? (u(), h(z, { key: 1 }, [
          $("button", {
            type: "button",
            class: "dc-actions__op",
            "data-dc-operation": "include",
            title: y.value ? `Narrow the query to the ${y.value} ticked` : "Tick rows to narrow the query to them",
            disabled: !y.value,
            onClick: R[3] || (R[3] = (x) => k(n).standSelection("in"))
          }, E(w("Include")), 9, Fo),
          $("button", {
            type: "button",
            class: "dc-actions__op",
            "data-dc-operation": "exclude",
            title: y.value ? `Leave the ${y.value} ticked out of the query` : "Tick rows to leave them out of the query",
            disabled: !y.value,
            onClick: R[4] || (R[4] = (x) => k(n).standSelection("out"))
          }, E(w("Exclude")), 9, Do)
        ], 64)) : T("", !0),
        c.value?.duplicate ? (u(), h("button", {
          key: 2,
          type: "button",
          class: "dc-actions__op",
          disabled: !m.value,
          onClick: R[5] || (R[5] = (x) => k(n).duplicate())
        }, E(O(c.value.duplicate)), 9, Vo)) : T("", !0),
        (u(!0), h(z, null, X(c.value?.operations ?? [], (x) => (u(), h("button", {
          key: x.key,
          type: "button",
          class: "dc-actions__op",
          "data-dc-operation": x.key,
          disabled: !m.value && x.selection !== !1,
          onClick: (I) => k(n).operate(x.key)
        }, E(x.selection === !1 ? x.label : O(x.label)), 9, Ko))), 128)),
        c.value?.delete ? (u(), h("button", {
          key: 3,
          type: "button",
          class: "dc-actions__op dc-actions__danger",
          disabled: !m.value,
          onClick: R[6] || (R[6] = (x) => k(n).delete())
        }, E(O(c.value.delete)), 9, Wo)) : T("", !0)
      ]),
      _.value ? (u(), H(Ao, {
        key: 2,
        class: "dc-actions__pages",
        "pages-note": e.pagesNote
      }, null, 8, ["pages-note"])) : T("", !0)
    ], 2)) : T("", !0);
  }
}), bt = /* @__PURE__ */ Q(zo, [["__scopeId", "data-v-b7cd42d5"]]);
function Xn(e) {
  return Math.max(0, e.total - (e.kept ?? 0));
}
function Wa(e) {
  const t = pe(/* @__PURE__ */ new Map()), n = q(!0);
  let a = 0, s;
  const l = () => {
    a++, s?.abort(), s = void 0;
  }, o = () => {
    l();
    const i = a, { signal: r } = s = new AbortController(), c = e.query.value, d = e.schema.value, p = e.entities.value, _ = e.within?.value.trim() ?? "";
    n.value = c.expr.trim() === "" && !_;
    const m = /* @__PURE__ */ new Map();
    let g = !0;
    for (const v of p) {
      const b = Na(v, c.expr), C = _ ? yn(_, b) : b;
      let A = !1;
      const y = (O) => {
        if (i !== a) return;
        if (g) {
          m.set(v.key, O);
          return;
        }
        const M = new Map(t.value);
        M.set(v.key, O), t.value = M;
      }, w = e.source.value.query({
        query: { ...c, entity: v.key, expr: C, page: 1 },
        schema: d,
        entity: v,
        limit: 0,
        offset: 0,
        signal: r,
        progress: (O) => {
          A || y({ total: O, pending: !0, counted: !0 });
        }
      });
      w instanceof Promise ? (m.has(v.key) || m.set(v.key, { total: 0, pending: !0, counted: !1 }), w.then((O) => {
        A = !0, y({ total: Xn(O), pending: !1, counted: !0 });
      })) : (A = !0, m.set(v.key, { total: Xn(w), pending: !1, counted: !0 }));
    }
    g = !1, t.value = m;
  };
  return oa() && Ot(l), { counts: t, pristine: n, refresh: o, cancel: l };
}
const jo = {
  key: 1,
  class: "dc-show-as"
}, Uo = {
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
}, Qo = ["d"], Go = ["aria-expanded", "aria-controls", "aria-activedescendant", "placeholder"], Yo = ["id"], Xo = ["id", "aria-selected", "onMousedown", "onMousemove"], Jo = {
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
}, Zo = ["d"], er = { class: "dc-show-as__text" }, tr = { class: "dc-show-as__name" }, nr = {
  key: 0,
  class: "dc-show-as__hint"
}, ar = {
  class: "dc-show-as__check",
  "aria-hidden": "true"
}, sr = {
  key: 0,
  class: "dc-show-as__none",
  role: "presentation"
}, lr = "…", or = /* @__PURE__ */ j({
  __name: "RecordChoosers",
  props: {
    views: {},
    typeChooser: {},
    stacked: { type: Boolean },
    labels: {},
    hints: {}
  },
  setup(e) {
    const t = e, n = `dc-show-as-${Math.random().toString(36).slice(2, 8)}`, a = ee(), s = f(
      () => a.hasFacets.value || !!a.liveQuery.value.expr.trim() || !!a.within.value
    ), l = Wa({
      source: a.source,
      schema: a.schema,
      // What each type holds of what is on screen, the draft's results included:
      // a count of the committed query would disagree with the rows under it.
      query: a.liveQuery,
      entities: a.entities,
      within: a.within
    });
    function o(L) {
      if (L.key === a.query.value.entity && s.value) return Ne((a.matched ?? a.total).value);
      if (l.pristine.value) return rt(L);
      const D = l.counts.value.get(L.key);
      return D ? D.counted ? `${D.pending ? "~" : ""}${Ne(D.total)}` : lr : rt(L);
    }
    const i = f(() => [
      { key: "", label: "Everything" },
      ...a.entities.value.map((L) => ({
        key: L.key,
        label: `${L.label} · ${o(L)}`
      }))
    ]), r = f(
      () => t.typeChooser === "always" || a.query.value.entity !== null
    );
    function c(L) {
      a.setEntity(L || null);
    }
    const d = f(() => {
      const L = t.views ?? [...hn];
      return (t.stacked && L.includes("record") ? ["record", ...L.filter((D) => D !== "record")] : L).map((D) => ({
        key: D,
        label: t.labels?.[D] ?? (D === "record" ? a.recordView.value?.label ?? Wn.record : Wn[D]),
        icon: Xs[D],
        hint: t.hints?.[D]
      }));
    }), p = f(() => Ae(a.query.value.view, t.views)), _ = f(() => d.value.length > 1), m = f(() => _.value || r.value && !t.stacked);
    function g(L) {
      a.setView(L);
    }
    const v = q(null), b = q(!1), C = q(""), A = q(0), y = f(() => d.value.find((L) => L.key === p.value)), w = f(() => {
      const L = C.value.trim().toLowerCase();
      return L ? d.value.filter(
        (K) => K.label.toLowerCase().includes(L) || !!K.hint?.toLowerCase().includes(L)
      ) : d.value;
    });
    function O() {
      b.value = !0, A.value = Math.max(0, w.value.findIndex((L) => L.key === p.value));
    }
    function M() {
      b.value = !1, C.value = "";
    }
    function R() {
      b.value ? v.value?.blur() : v.value?.focus();
    }
    function x(L) {
      L !== p.value && g(L), v.value?.blur();
    }
    function I(L) {
      const K = w.value.length;
      if (L.key === "ArrowDown" || L.key === "ArrowUp") {
        if (L.preventDefault(), !b.value) {
          O();
          return;
        }
        K && (A.value = (A.value + (L.key === "ArrowDown" ? 1 : -1) + K) % K);
      } else if (L.key === "Enter") {
        L.preventDefault();
        const D = w.value[A.value];
        D && x(D.key);
      } else L.key === "Escape" && (L.preventDefault(), v.value?.blur());
    }
    return (L, K) => m.value ? (u(), h("div", {
      key: 0,
      class: oe(["dc-choosers", { "dc-choosers--stacked": e.stacked }])
    }, [
      r.value && !e.stacked ? (u(), H(un, {
        key: 0,
        class: "dc-actions__pick dc-actions__type",
        label: "Type",
        "model-value": k(a).query.value.entity ?? "",
        options: i.value,
        onOpen: k(l).refresh,
        onClose: k(l).cancel,
        "onUpdate:modelValue": c
      }, null, 8, ["model-value", "options", "onOpen", "onClose"])) : T("", !0),
      _.value && e.stacked ? (u(), h("div", jo, [
        $("label", {
          for: n,
          class: "dc-show-as__label"
        }, [...K[2] || (K[2] = [
          J("Show as ", -1),
          $("span", { class: "dc-mono" }, "(u)", -1)
        ])]),
        $("div", {
          class: oe(["dc-show-as__field", { "dc-show-as__field--open": b.value }])
        }, [
          (u(), h("svg", Uo, [
            $("path", {
              d: y.value?.icon
            }, null, 8, Qo)
          ])),
          $t($("input", {
            id: n,
            ref_key: "showBox",
            ref: v,
            "onUpdate:modelValue": K[0] || (K[0] = (D) => C.value = D),
            class: "dc-show-as__input",
            type: "text",
            role: "combobox",
            autocomplete: "off",
            spellcheck: "false",
            "aria-autocomplete": "list",
            "aria-expanded": b.value,
            "aria-controls": `${n}-list`,
            "aria-activedescendant": b.value && w.value.length ? `${n}-${w.value[A.value]?.key}` : void 0,
            placeholder: y.value?.label,
            onFocus: O,
            onBlur: M,
            onInput: K[1] || (K[1] = (D) => {
              A.value = 0, b.value = !0;
            }),
            onKeydown: I
          }, null, 40, Go), [
            [ra, C.value]
          ]),
          $("button", {
            type: "button",
            class: "dc-show-as__toggle",
            tabindex: "-1",
            "aria-label": "Open Show as",
            onMousedown: xe(R, ["prevent"])
          }, [...K[3] || (K[3] = [
            $("span", {
              class: "dc-show-as__caret",
              "aria-hidden": "true"
            }, "▾", -1)
          ])], 32),
          b.value ? (u(), h("ul", {
            key: 0,
            id: `${n}-list`,
            class: "dc-show-as__list",
            role: "listbox",
            "aria-label": "Show as"
          }, [
            (u(!0), h(z, null, X(w.value, (D, te) => (u(), h("li", {
              id: `${n}-${D.key}`,
              key: D.key,
              class: oe(["dc-show-as__option", { "dc-show-as__option--active": te === A.value, "dc-show-as__option--on": D.key === p.value }]),
              style: ae({ animationDelay: `${te * 30}ms` }),
              role: "option",
              "aria-selected": D.key === p.value,
              onMousedown: xe((re) => x(D.key), ["prevent"]),
              onMousemove: (re) => A.value = te
            }, [
              (u(), h("svg", Jo, [
                $("path", {
                  d: D.icon
                }, null, 8, Zo)
              ])),
              $("span", er, [
                $("span", tr, E(D.label), 1),
                D.hint ? (u(), h("span", nr, E(D.hint), 1)) : T("", !0)
              ]),
              $("span", ar, E(D.key === p.value ? "✓" : ""), 1)
            ], 46, Xo))), 128)),
            w.value.length ? T("", !0) : (u(), h("li", sr, " No format matches “" + E(C.value) + "” ", 1))
          ], 8, Yo)) : T("", !0)
        ], 2)
      ])) : _.value ? (u(), H(un, {
        key: 2,
        class: "dc-actions__pick dc-actions__view",
        label: "View",
        "model-value": p.value,
        options: d.value,
        "onUpdate:modelValue": g
      }, null, 8, ["model-value", "options"])) : T("", !0)
    ], 2)) : T("", !0);
  }
}), Jn = /* @__PURE__ */ Q(or, [["__scopeId", "data-v-4ca786a3"]]), rr = { class: "dc-types-panel__list" }, ir = ["id", "checked", "onChange"], cr = ["for"], ur = ["title", "onClick"], dr = { class: "dc-types-panel__count dc-mono" }, fr = /* @__PURE__ */ j({
  __name: "ShellTypes",
  setup(e) {
    const t = ee();
    function n(m) {
      return ue(
        Z(m).map((g) => g.filter((v) => !(v.kind === "field" && v.field === "entity"))).filter((g) => g.length > 0)
      );
    }
    const a = f(() => {
      const m = Z(t.query.value.expr);
      return m.length !== 1 ? /* @__PURE__ */ new Set() : new Set(
        m[0].flatMap(
          (g) => g.kind === "field" && g.field === "entity" && g.negated ? [g.value.toLowerCase()] : []
        )
      );
    }), s = f(() => n(t.query.value.expr)), l = Wa({
      source: t.source,
      schema: t.schema,
      query: f(() => ({ ...t.liveQuery.value, expr: n(t.liveQuery.value.expr) })),
      entities: t.entities,
      within: t.within
    });
    Ue(() => l.refresh()), ne(() => [s.value, t.within.value, t.source.value], () => l.refresh());
    function o(m) {
      if (l.pristine.value) return rt(m);
      const g = l.counts.value.get(m.key);
      return g?.counted ? `${g.pending ? "~" : ""}${Ne(g.total)}` : rt(m);
    }
    const i = f(
      () => t.entities.value.filter(
        (m) => m.key === t.query.value.entity || (typeof m.count == "number" ? m.count > 0 : !!m.count)
      )
    );
    function r(m) {
      const g = t.query.value.entity;
      return g ? g === m.key : !a.value.has(m.key.toLowerCase());
    }
    function c(m) {
      const g = i.value.map((C) => C.key);
      if (m.length === 1) return { expr: s.value, entity: m[0] };
      const b = g.filter((C) => !m.includes(C)).map((C) => `-entity:${C}`).join(" ");
      return { expr: [s.value, b].filter(Boolean).join(" "), entity: null };
    }
    function d(m) {
      const g = i.value.filter((A) => r(A)).map((A) => A.key), v = g.includes(m.key) ? g.filter((A) => A !== m.key) : [...g, m.key];
      if (v.length === 0) return;
      const { expr: b, entity: C } = c(v);
      t.narrow(b, C);
    }
    function p(m) {
      const { expr: g, entity: v } = c([m.key]);
      t.narrow(g, v);
    }
    const _ = `dc-types-${Math.random().toString(36).slice(2, 8)}`;
    return (m, g) => i.value.length > 1 ? (u(), h("section", {
      key: 0,
      class: "dc-types-panel",
      "aria-labelledby": _
    }, [
      $("h3", {
        id: _,
        class: "dc-types-panel__heading"
      }, " Types "),
      $("ul", rr, [
        (u(!0), h(z, null, X(i.value, (v) => (u(), h("li", {
          key: v.key,
          class: "dc-types-panel__type"
        }, [
          $("input", {
            id: `${_}-${v.key}`,
            type: "checkbox",
            class: "dc-types-panel__box",
            checked: r(v),
            onChange: (b) => d(v)
          }, null, 40, ir),
          $("label", {
            for: `${_}-${v.key}`,
            class: "dc-types-panel__name"
          }, E(v.label), 9, cr),
          $("button", {
            type: "button",
            class: "dc-types-panel__only",
            title: `Only ${v.label}`,
            onClick: (b) => p(v)
          }, " only ", 8, ur),
          $("span", dr, E(o(v)), 1)
        ]))), 128))
      ])
    ])) : T("", !0);
  }
}), vr = /* @__PURE__ */ Q(fr, [["__scopeId", "data-v-32178b7f"]]);
function pr(e, t) {
  if (!e) return null;
  const n = ie(e, t);
  return typeof n == "string" && n.trim() ? n : null;
}
const hr = (e) => e == null || typeof e == "string" && !e.trim();
function mr(e, t) {
  const n = ve(t, "state"), a = ve(t, "tint");
  return {
    identity: kt(ve(t, "identity"), e),
    reference: kt(ve(t, "reference"), e),
    metrics: ca(t, "metric").map((s) => ({
      column: s,
      label: s.label ?? "",
      text: Me(s, e)
    })),
    facts: t.filter((s) => s.cardLabel && !hr(ie(s, e))).map((s) => ({
      column: s,
      label: s.cardLabel,
      title: [s.label, s.hint].filter(Boolean).join(" — "),
      text: Me(s, e)
    })),
    state: n ? ie(n, e) ?? null : null,
    updated: kt(ve(t, "updated"), e),
    image: pr(ve(t, "image"), e),
    tint: a ? ie(a, e) ?? null : null
  };
}
function za(e, t, n, a, s = !1) {
  const l = n?.columns ?? [];
  return {
    row: e,
    key: Cs(e, t),
    entityLabel: e.entityLabel,
    entity: n,
    columns: l,
    ordinal: gs(t),
    parts: mr(e, l),
    pinned: a,
    selected: s
  };
}
function Re() {
  const e = ee(), t = f(
    () => new Map(e.entities.value.map((n) => [n.key, n]))
  );
  return f(
    () => e.rows.value.map(
      (n, a) => za(
        n,
        e.offset.value + a,
        t.value.get(n.entityKey) ?? null,
        e.isPinned(n),
        e.isSelected(n)
      )
    )
  );
}
const yr = ["data-dc-status", "data-dc-tone"], gr = /* @__PURE__ */ j({
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
    }, E(n.value), 9, yr));
  }
}), je = /* @__PURE__ */ Q(gr, [["__scopeId", "data-v-686eb9b6"]]), _r = { key: 1 }, wr = /* @__PURE__ */ j({
  __name: "MetricDrill",
  props: {
    entry: {},
    column: {}
  },
  setup(e) {
    const t = e, n = ee(), a = f(() => !t.entry.entity?.scope || !t.column.drill ? null : n.entities.value.find((p) => p.key === t.column.drill) ?? null), s = f(() => !!t.column.click), l = f(() => t.column.label ?? ""), o = f(() => Me(t.column, t.entry.row)), i = f(() => s.value ? t.column.clickHref?.(t.entry.row) ?? null : a.value ? n.drillHref(t.entry.row, a.value, t.column.drillWhere) : null), r = f(() => a.value && !s.value ? `${l.value} of ${t.entry.parts.identity} — show the ${a.value.label.toLowerCase()}` : `${l.value} of ${t.entry.parts.identity}`);
    function c(d, p) {
      p.stopPropagation(), s.value ? t.column.click?.(t.entry.row, d) : a.value && n.drill(t.entry.row, a.value, d, t.column.drillWhere);
    }
    return (d, p) => a.value || s.value ? (u(), H(se, {
      key: 0,
      class: "dc-drill",
      href: i.value,
      title: r.value,
      onPress: c
    }, {
      default: Y(() => [
        G(d.$slots, "default", {}, () => [
          J(E(o.value), 1)
        ], !0)
      ]),
      _: 3
    }, 8, ["href", "title"])) : (u(), h("span", _r, [
      G(d.$slots, "default", {}, () => [
        J(E(o.value), 1)
      ], !0)
    ]));
  }
}), pt = /* @__PURE__ */ Q(wr, [["__scopeId", "data-v-bbbd334b"]]), kr = ["data-dc-active", "aria-pressed", "aria-label"], br = /* @__PURE__ */ j({
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
    return (s, l) => (u(), h("button", {
      type: "button",
      class: "dc-star",
      "data-dc-active": e.pinned ? "true" : "false",
      "aria-pressed": e.pinned,
      "aria-label": e.pinned ? `Unpin ${e.name}` : `Pin ${e.name}`,
      onClick: a
    }, E(e.pinned ? "★" : "☆"), 9, kr));
  }
}), Sn = /* @__PURE__ */ Q(br, [["__scopeId", "data-v-ef63d763"]]), $r = ["src"], xr = /* @__PURE__ */ j({
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
    ), (a, s) => e.src.trim() && !n.value ? (u(), h("img", {
      key: 0,
      class: "dc-picture",
      src: e.src,
      alt: "",
      loading: "lazy",
      decoding: "async",
      onError: s[0] || (s[0] = (l) => n.value = !0)
    }, null, 40, $r)) : T("", !0);
  }
}), zt = /* @__PURE__ */ Q(xr, [["__scopeId", "data-v-afaab300"]]), Sr = ["data-dc-standing", "title", "aria-label"], Cr = /* @__PURE__ */ j({
  __name: "QueryMark",
  props: {
    entry: {}
  },
  setup(e) {
    const t = e, n = ee(), a = f(() => Kt(t.entry.entity, t.entry.row)), s = f(() => Oa(n.query.value.expr, a.value)), l = f(
      () => s.value === "in" ? `The query narrows to ${t.entry.parts.identity} — press to lift that` : `The query leaves out ${t.entry.parts.identity} — press to lift that`
    );
    function o(i) {
      i.stopPropagation(), n.setExpression($n(n.query.value.expr, a.value));
    }
    return (i, r) => s.value ? (u(), h("button", {
      key: 0,
      type: "button",
      class: "dc-standing",
      "data-dc-standing": s.value,
      title: l.value,
      "aria-label": l.value,
      onClick: o
    }, E(s.value === "in" ? "+" : "−"), 9, Sr)) : T("", !0);
  }
}), ht = /* @__PURE__ */ Q(Cr, [["__scopeId", "data-v-4b8d4166"]]), Pr = ["href", "title", "aria-label"], Mr = /* @__PURE__ */ j({
  __name: "OpenMark",
  props: {
    entry: {}
  },
  setup(e) {
    const t = e, n = ee(), a = f(() => {
      const s = t.entry.row, l = n.recordHref?.(s) ?? null;
      return l ? n.pressHref(s) === l ? null : l : null;
    });
    return (s, l) => a.value ? (u(), h("a", {
      key: 0,
      class: "dc-open",
      href: a.value,
      target: "_blank",
      rel: "noopener noreferrer",
      title: a.value,
      "aria-label": `Open ${e.entry.parts.identity} in a new tab`,
      onClick: l[0] || (l[0] = xe(() => {
      }, ["stop"]))
    }, "↗", 8, Pr)) : T("", !0);
  }
}), mt = /* @__PURE__ */ Q(Mr, [["__scopeId", "data-v-b00f390d"]]), Er = /* @__PURE__ */ j({
  __name: "ScopeMark",
  props: {
    entry: {}
  },
  setup(e) {
    const t = e, n = ee(), a = f(
      () => n.narrowsOnPress.value ? null : t.entry.entity?.scope ?? null
    ), s = q(null);
    function l(d) {
      s.value = ct(d).exclude ? "out" : "in";
    }
    function o(d) {
      l(d), window.addEventListener("keydown", l), window.addEventListener("keyup", l);
    }
    function i() {
      s.value = null, window.removeEventListener("keydown", l), window.removeEventListener("keyup", l);
    }
    we(i);
    const r = f(() => a.value ? n.drillHref(t.entry.row, null) : null);
    function c(d, p) {
      p.stopPropagation(), n.drill(t.entry.row, null, d);
    }
    return (d, p) => a.value ? (u(), H(se, {
      key: 0,
      class: "dc-scope",
      href: r.value,
      "data-dc-pending": s.value ?? void 0,
      title: `Narrow everything to ${a.value}: ${e.entry.row.id} — ⌥-click to leave it out`,
      "aria-label": `Narrow everything to ${e.entry.parts.identity}`,
      onPointerenter: o,
      onPointermove: l,
      onPointerleave: i,
      onPress: c
    }, {
      default: Y(() => [...p[0] || (p[0] = [
        J(" → ", -1)
      ])]),
      _: 1
    }, 8, ["href", "data-dc-pending", "title", "aria-label"])) : T("", !0);
  }
}), yt = /* @__PURE__ */ Q(Er, [["__scopeId", "data-v-05d2c233"]]), Lr = ["checked", "aria-label"], He = /* @__PURE__ */ j({
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
    return (s, l) => (u(), h("input", {
      class: "dc-tick",
      type: "checkbox",
      checked: e.selected,
      "aria-label": `Select ${e.name}`,
      onClick: a
    }, null, 8, Lr));
  }
}), Tr = { class: "dc-card__top dc-mono" }, Or = { class: "dc-card__lead" }, Ar = {
  key: 2,
  class: "dc-card__entity"
}, Nr = { class: "dc-card__top-right" }, Ir = { class: "dc-card__names" }, Br = { class: "dc-card__primary" }, Rr = {
  key: 0,
  class: "dc-card__secondary dc-mono"
}, Hr = {
  key: 1,
  class: "dc-card__facts dc-mono"
}, qr = ["title"], Fr = { class: "dc-card__fact-label" }, Dr = {
  key: 0,
  class: "dc-card__metrics dc-mono"
}, Vr = {
  key: 0,
  class: "dc-card__date"
}, Kr = /* @__PURE__ */ j({
  __name: "CardsView",
  setup(e) {
    const t = ee(), n = Re(), a = f(() => t.isEverything.value), s = (o) => o.entity?.card === "picture", l = f(() => n.value.length > 0 && n.value.every(s));
    return (o, i) => (u(), h("div", {
      class: oe(["dc-cards", { "dc-cards--pictures": l.value }])
    }, [
      (u(!0), h(z, null, X(k(n), (r) => (u(), h("div", {
        key: r.key,
        class: oe(["dc-card", { "dc-card--picture": s(r) }])
      }, [
        $("div", Tr, [
          $("span", Or, [
            k(t).selectable.value ? (u(), H(He, {
              key: 0,
              row: r.row,
              selected: r.selected,
              name: r.parts.identity
            }, null, 8, ["row", "selected", "name"])) : T("", !0),
            s(r) ? T("", !0) : (u(), h(z, { key: 1 }, [
              J(E(r.ordinal), 1)
            ], 64)),
            a.value ? (u(), h("span", Ar, E(r.entityLabel), 1)) : T("", !0)
          ]),
          $("span", Nr, [
            r.parts.state && !s(r) ? (u(), H(je, {
              key: 0,
              status: r.parts.state
            }, null, 8, ["status"])) : T("", !0),
            U(ht, { entry: r }, null, 8, ["entry"]),
            U(yt, { entry: r }, null, 8, ["entry"]),
            U(mt, { entry: r }, null, 8, ["entry"]),
            k(t).pinnable.value ? (u(), H(Sn, {
              key: 1,
              row: r.row,
              name: r.parts.identity,
              pinned: r.pinned
            }, null, 8, ["row", "name", "pinned"])) : T("", !0)
          ])
        ]),
        U(se, {
          class: "dc-card__open",
          href: k(t).pressHref(r.row),
          onPress: (c) => k(t).activate(r.row, c)
        }, {
          default: Y(() => [
            r.parts.image ? (u(), H(zt, {
              key: 0,
              class: "dc-card__image",
              src: r.parts.image
            }, null, 8, ["src"])) : T("", !0),
            $("span", Ir, [
              $("span", Br, E(r.parts.identity), 1),
              s(r) ? T("", !0) : (u(), h("span", Rr, E(r.parts.reference), 1)),
              r.parts.facts.length ? (u(), h("span", Hr, [
                (u(!0), h(z, null, X(r.parts.facts, (c) => (u(), h("span", {
                  key: c.column.key ?? c.label,
                  class: "dc-card__fact",
                  title: c.title || void 0
                }, [
                  $("span", Fr, E(c.label), 1),
                  J(" " + E(c.text), 1)
                ], 8, qr))), 128))
              ])) : T("", !0)
            ])
          ]),
          _: 2
        }, 1032, ["href", "onPress"]),
        s(r) ? T("", !0) : (u(), h("div", Dr, [
          (u(!0), h(z, null, X(r.parts.metrics.slice(0, 2), (c) => (u(), H(pt, {
            key: c.column.key ?? c.label,
            entry: r,
            column: c.column
          }, {
            default: Y(() => [
              J(E(c.label) + " " + E(c.text), 1)
            ]),
            _: 2
          }, 1032, ["entry", "column"]))), 128)),
          r.parts.updated ? (u(), h("span", Vr, E(r.parts.updated), 1)) : T("", !0)
        ]))
      ], 2))), 128))
    ], 2));
  }
}), ja = /* @__PURE__ */ Q(Kr, [["__scopeId", "data-v-a90319f2"]]), Wr = { class: "dc-grid" }, zr = { class: "dc-tile__scrim" }, jr = { class: "dc-tile__top dc-mono" }, Ur = { class: "dc-tile__chip" }, Qr = { class: "dc-tile__caption" }, Gr = { class: "dc-tile__secondary dc-truncate" }, Yr = { class: "dc-tile__primary" }, Xr = /* @__PURE__ */ j({
  __name: "GridView",
  setup(e) {
    const t = ee(), n = Re();
    return (a, s) => (u(), h("div", Wr, [
      (u(!0), h(z, null, X(k(n), (l) => (u(), h("div", {
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
            l.parts.image ? (u(), H(zt, {
              key: 0,
              class: "dc-tile__image",
              src: l.parts.image
            }, null, 8, ["src"])) : T("", !0),
            $("span", zr, [
              $("span", jr, [
                $("span", Ur, E(l.ordinal), 1)
              ]),
              $("span", Qr, [
                $("span", Gr, E(l.parts.reference), 1),
                $("span", Yr, E(l.parts.identity), 1)
              ])
            ])
          ]),
          _: 2
        }, 1032, ["style", "href", "onPress"]),
        k(t).selectable.value ? (u(), H(He, {
          key: 0,
          class: "dc-grid__tick",
          row: l.row,
          selected: l.selected,
          name: l.parts.identity
        }, null, 8, ["row", "selected", "name"])) : T("", !0)
      ]))), 128))
    ]));
  }
}), Ua = /* @__PURE__ */ Q(Xr, [["__scopeId", "data-v-89c40a9e"]]);
function Zn(e, t, n, a) {
  return (n - a * (t - 1)) / e;
}
function nn(e, t) {
  return e > 0 ? Math.min(t, e) : t;
}
function Jr(e) {
  return e > 0 ? e : 1 / 0;
}
function Zr(e, t, n) {
  const { width: a, height: s, gap: l = 0 } = n;
  if (!e.length) return [];
  if (!(a > 0) || !(s > 0)) return [{ items: [...e], height: s, filled: !1 }];
  const o = [];
  let i = [], r = 0, c = 0;
  for (const d of e) {
    const p = t(d), _ = Math.max(p.ratio, Number.EPSILON), m = p.height && p.height > 0 ? Math.max(c, p.height) : c, g = nn(m, s), v = Zn(r + _, i.length + 1, a, l);
    if (v > g) {
      i.push(d), r += _, c = m;
      continue;
    }
    const b = nn(c, s), C = i.length ? Zn(r, i.length, a, l) : 1 / 0;
    C <= Jr(c) && C - b < g - v ? (o.push({ items: i, height: C, filled: !0 }), i = [d], r = _, c = p.height && p.height > 0 ? p.height : 0) : (o.push({ items: [...i, d], height: v, filled: !0 }), i = [], r = 0, c = 0);
  }
  return i.length && o.push({ items: i, height: nn(c, s), filled: !1 }), o;
}
const ei = { class: "dc-images" }, ti = {
  key: 1,
  class: "dc-images__blank",
  "aria-hidden": "true"
}, ni = 240, _t = 8, ai = 1, si = /* @__PURE__ */ j({
  __name: "ImagesView",
  setup(e) {
    const t = ee(), n = Re(), a = En(/* @__PURE__ */ new Map()), s = En(/* @__PURE__ */ new Set());
    function l(g, v) {
      const b = v.target;
      b.naturalWidth > 0 && b.naturalHeight > 0 && a.set(g, { width: b.naturalWidth, height: b.naturalHeight });
    }
    function o(g) {
      const v = g.parts.image;
      return v && !s.has(v) ? v : null;
    }
    function i(g) {
      const v = o(g);
      return v ? a.get(v) : void 0;
    }
    function r(g) {
      const v = i(g);
      return v ? { ratio: v.width / v.height, height: v.height } : { ratio: ai };
    }
    const c = q(null), d = q(0);
    let p = null;
    function _() {
      d.value = c.value?.clientWidth ?? 0;
    }
    Ue(() => {
      _(), !(!c.value || typeof ResizeObserver > "u") && (p = new ResizeObserver(_), p.observe(c.value));
    }), we(() => {
      p?.disconnect(), p = null;
    });
    const m = f(() => {
      const g = Zr(n.value, r, {
        width: d.value,
        height: ni,
        gap: _t
      }), v = [];
      let b = 0;
      for (const C of g) {
        let A = 0;
        for (const y of C.items) {
          const w = r(y).ratio * C.height, O = i(y), M = O !== void 0 && O.height < C.height;
          v.push({
            entry: y,
            style: {
              top: `${b}px`,
              left: `${A}px`,
              width: `${w}px`,
              height: `${C.height}px`
            },
            picture: M ? { width: `${O.width}px`, height: `${O.height}px` } : { width: "100%", height: "100%" }
          }), A += w + _t;
        }
        b += C.height + _t;
      }
      return { boxes: v, height: g.length ? b - _t : 0 };
    });
    return (g, v) => (u(), h("div", ei, [
      $("div", {
        ref_key: "wall",
        ref: c,
        class: "dc-images__wall",
        style: ae({ height: `${m.value.height}px` })
      }, [
        (u(!0), h(z, null, X(m.value.boxes, ({ entry: b, style: C, picture: A }) => (u(), h("div", {
          key: b.key,
          class: "dc-images__cell",
          style: ae(C)
        }, [
          U(se, {
            class: "dc-images__open",
            title: b.parts.identity,
            "aria-label": b.parts.identity,
            href: k(t).pressHref(b.row),
            onPress: (y) => k(t).activate(b.row, y)
          }, {
            default: Y(() => [
              o(b) ? (u(), H(zt, {
                key: 0,
                class: "dc-images__picture",
                style: ae(A),
                src: o(b),
                onLoad: (y) => l(o(b), y),
                onError: (y) => s.add(o(b))
              }, null, 8, ["style", "src", "onLoad", "onError"])) : (u(), h("span", ti, E(b.parts.identity), 1))
            ]),
            _: 2
          }, 1032, ["title", "aria-label", "href", "onPress"]),
          k(t).selectable.value ? (u(), H(He, {
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
}), Qa = /* @__PURE__ */ Q(si, [["__scopeId", "data-v-2d267370"]]), li = { class: "dc-links" }, oi = { class: "dc-link__primary dc-truncate" }, ri = { class: "dc-link__secondary dc-mono dc-truncate" }, ii = /* @__PURE__ */ j({
  __name: "LinksView",
  setup(e) {
    const t = ee(), n = Re();
    return (a, s) => (u(), h("div", li, [
      (u(!0), h(z, null, X(k(n), (l) => (u(), h("span", {
        key: l.key,
        class: "dc-links__item"
      }, [
        k(t).selectable.value ? (u(), H(He, {
          key: 0,
          row: l.row,
          selected: l.selected,
          name: l.parts.identity
        }, null, 8, ["row", "selected", "name"])) : T("", !0),
        U(se, {
          class: "dc-link",
          href: k(t).pressHref(l.row),
          onPress: (o) => k(t).activate(l.row, o)
        }, {
          default: Y(() => [
            $("span", oi, E(l.parts.identity), 1),
            $("span", ri, E(l.parts.reference), 1)
          ]),
          _: 2
        }, 1032, ["href", "onPress"])
      ]))), 128))
    ]));
  }
}), Ga = /* @__PURE__ */ Q(ii, [["__scopeId", "data-v-de6c9a0f"]]), ci = {
  class: "dc-list",
  role: "list"
}, ui = { class: "dc-list__ordinal dc-mono" }, di = { class: "dc-list__identity" }, fi = ["title"], vi = ["title"], pi = {
  key: 1,
  class: "dc-list__entity dc-mono"
}, hi = { class: "dc-list__metrics dc-mono" }, mi = { class: "dc-list__trailing" }, yi = /* @__PURE__ */ j({
  __name: "ListView",
  setup(e) {
    const t = ee(), n = Re(), a = f(() => t.isEverything.value);
    return (s, l) => (u(), h("div", ci, [
      (u(!0), h(z, null, X(k(n), (o) => (u(), h("div", {
        key: o.key,
        class: "dc-list__row",
        role: "listitem"
      }, [
        k(t).selectable.value ? (u(), H(He, {
          key: 0,
          class: "dc-list__tick",
          row: o.row,
          selected: o.selected,
          name: o.parts.identity
        }, null, 8, ["row", "selected", "name"])) : T("", !0),
        U(se, {
          class: "dc-list__open",
          href: k(t).pressHref(o.row),
          onPress: (i) => k(t).activate(o.row, i)
        }, {
          default: Y(() => [
            $("span", ui, E(o.ordinal), 1),
            $("span", di, [
              $("span", {
                class: "dc-list__primary dc-truncate",
                title: o.parts.identity
              }, E(o.parts.identity), 9, fi),
              $("span", {
                class: "dc-list__secondary dc-mono dc-truncate",
                title: o.parts.reference || void 0
              }, E(o.parts.reference), 9, vi)
            ])
          ]),
          _: 2
        }, 1032, ["href", "onPress"]),
        a.value ? (u(), h("span", pi, E(o.entityLabel), 1)) : T("", !0),
        $("span", hi, [
          (u(!0), h(z, null, X(o.parts.metrics.slice(0, 2), (i) => (u(), H(pt, {
            key: i.column.key ?? i.label,
            entry: o,
            column: i.column
          }, null, 8, ["entry", "column"]))), 128))
        ]),
        $("span", mi, [
          o.parts.state ? (u(), H(je, {
            key: 0,
            status: o.parts.state
          }, null, 8, ["status"])) : T("", !0),
          U(ht, { entry: o }, null, 8, ["entry"]),
          U(yt, { entry: o }, null, 8, ["entry"]),
          U(mt, { entry: o }, null, 8, ["entry"]),
          k(t).pinnable.value ? (u(), H(Sn, {
            key: 1,
            row: o.row,
            name: o.parts.identity,
            pinned: o.pinned
          }, null, 8, ["row", "name", "pinned"])) : T("", !0)
        ])
      ]))), 128))
    ]));
  }
}), dn = /* @__PURE__ */ Q(yi, [["__scopeId", "data-v-ca54d88f"]]), gi = { class: "dc-preview" }, _i = { class: "dc-preview__pager dc-mono" }, wi = ["disabled"], ki = { "aria-live": "polite" }, bi = ["disabled"], $i = {
  key: 0,
  class: "dc-preview__card"
}, xi = ["src"], Si = { class: "dc-preview__body" }, Ci = { class: "dc-preview__top" }, Pi = { class: "dc-preview__badges" }, Mi = { class: "dc-preview__entity dc-mono" }, Ei = { class: "dc-preview__marks" }, Li = { class: "dc-preview__primary" }, Ti = { class: "dc-preview__secondary dc-mono" }, Oi = { class: "dc-preview__fields" }, Ai = { class: "dc-preview__key" }, Ni = { class: "dc-preview__value dc-mono" }, Ii = /* @__PURE__ */ j({
  __name: "PreviewView",
  setup(e) {
    const t = ee(), n = Re(), a = q(0);
    ne(n, (r) => {
      a.value > r.length - 1 && (a.value = Math.max(0, r.length - 1));
    });
    const s = f(() => n.value[a.value]), l = f(() => {
      const r = s.value;
      if (!r) return [];
      const c = ve(r.columns, "reference"), d = ve(r.columns, "updated");
      return [
        ...c ? [{ key: c.label ?? "Reference", value: r.parts.reference, column: null }] : [],
        ...r.parts.metrics.map((p) => ({
          key: p.label,
          value: p.text,
          column: p.column
        })),
        ...d ? [{ key: d.label ?? "Updated", value: r.parts.updated, column: null }] : []
      ];
    }), o = f(() => {
      if (!n.value.length) return "0 / 0";
      const r = t.total.value > n.value.length ? ` of ${t.total.value}` : "";
      return `${a.value + 1} / ${n.value.length}${r}`;
    }), i = (r) => {
      const c = n.value.length;
      c && (a.value = Math.min(c - 1, Math.max(0, a.value + r)));
    };
    return (r, c) => (u(), h("div", gi, [
      $("div", _i, [
        $("button", {
          type: "button",
          class: "dc-preview__step",
          "aria-label": "Previous result",
          disabled: a.value === 0,
          onClick: c[0] || (c[0] = (d) => i(-1))
        }, " ‹ ", 8, wi),
        $("span", ki, E(o.value), 1),
        $("button", {
          type: "button",
          class: "dc-preview__step",
          "aria-label": "Next result",
          disabled: a.value >= k(n).length - 1,
          onClick: c[1] || (c[1] = (d) => i(1))
        }, " › ", 8, bi)
      ]),
      s.value ? (u(), h("div", $i, [
        $("div", {
          class: "dc-preview__media",
          style: ae({ background: s.value.parts.tint ?? void 0 }),
          "aria-hidden": "true"
        }, [
          s.value.parts.image ? (u(), h("img", {
            key: 0,
            class: "dc-preview__image",
            src: s.value.parts.image,
            alt: ""
          }, null, 8, xi)) : (u(), h(z, { key: 1 }, [
            J(" preview ")
          ], 64))
        ], 4),
        $("div", Si, [
          $("div", Ci, [
            $("span", Pi, [
              k(t).selectable.value ? (u(), H(He, {
                key: 0,
                row: s.value.row,
                selected: s.value.selected,
                name: s.value.parts.identity
              }, null, 8, ["row", "selected", "name"])) : T("", !0),
              s.value.parts.state ? (u(), H(je, {
                key: 1,
                status: s.value.parts.state
              }, null, 8, ["status"])) : T("", !0),
              $("span", Mi, E(s.value.entityLabel), 1)
            ]),
            $("span", Ei, [
              U(ht, { entry: s.value }, null, 8, ["entry"]),
              U(yt, { entry: s.value }, null, 8, ["entry"]),
              U(mt, { entry: s.value }, null, 8, ["entry"]),
              k(t).pinnable.value ? (u(), H(Sn, {
                key: 0,
                row: s.value.row,
                name: s.value.parts.identity,
                pinned: s.value.pinned
              }, null, 8, ["row", "name", "pinned"])) : T("", !0)
            ])
          ]),
          $("div", null, [
            $("div", Li, E(s.value.parts.identity), 1),
            $("div", Ti, E(s.value.parts.reference), 1)
          ]),
          $("dl", Oi, [
            (u(!0), h(z, null, X(l.value, (d) => (u(), h("div", {
              key: d.key,
              class: "dc-preview__field"
            }, [
              $("dt", Ai, E(d.key), 1),
              $("dd", Ni, [
                d.column && s.value ? (u(), H(pt, {
                  key: 0,
                  entry: s.value,
                  column: d.column
                }, null, 8, ["entry", "column"])) : (u(), h(z, { key: 1 }, [
                  J(E(d.value), 1)
                ], 64))
              ])
            ]))), 128))
          ]),
          U(se, {
            class: "dc-preview__open",
            href: s.value ? k(t).pressHref(s.value.row) : null,
            onPress: c[2] || (c[2] = (d) => s.value && k(t).activate(s.value.row, d))
          }, {
            default: Y(() => [...c[3] || (c[3] = [
              J(" Open record → ", -1)
            ])]),
            _: 1
          }, 8, ["href"])
        ])
      ])) : T("", !0)
    ]));
  }
}), Ya = /* @__PURE__ */ Q(Ii, [["__scopeId", "data-v-59e0d33b"]]);
function Bi(e) {
  const t = Z(e);
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
function Ri(e, t, n) {
  const a = Bi(t);
  return a.size ? e.filter((s) => {
    const l = (s.key ?? s.field)?.toLowerCase();
    return l === void 0 || !a.has(l) || s.role === "identity" || n.some((o) => Array.isArray(ie(s, o))) ? !0 : new Set(n.map((o) => Me(s, o))).size > 1;
  }) : e;
}
function Hi() {
  const e = ee();
  return f(
    () => Ri(
      xs(e.schema.value, e.entity.value),
      e.liveQuery.value.expr,
      e.rows.value
    )
  );
}
function Cn(e, t) {
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
function Xa(e, t) {
  const n = e.narrowsOnPress.value ? Kt(t.entity, t.row) : null;
  return n ? { term: n, name: t.parts.identity, alone: t.entity?.narrowsAlone === !0 } : null;
}
const qi = /* @__PURE__ */ j({
  __name: "CellNarrow",
  props: {
    entry: {},
    column: {},
    narrowings: {},
    truncates: { type: Boolean }
  },
  setup(e) {
    const t = e, n = ee(), a = f(() => Me(t.column, t.entry.row));
    function s(p, _ = !1) {
      return p.entity !== void 0 ? `entity:${p.entity}` : _e({ ...p.term, ..._ ? { negated: !0 } : {} });
    }
    function l(p, _ = !1) {
      return p.entity !== void 0 ? n.query.value.expr : ot(n.query.value.expr, s(p, _));
    }
    function o(p) {
      return p.entity ?? n.query.value.entity;
    }
    function i(p) {
      return n.narrowHref(l(p), o(p));
    }
    function r(p) {
      return p.entity !== void 0 ? `Show ${n.schema.value.entities.find((m) => m.key === p.entity)?.label ?? a.value} only` : `Narrow to ${s(p)}
⌥-press to leave these out`;
    }
    function c(p) {
      return p.entity !== void 0 ? null : { term: s(p) };
    }
    function d(p, _, m) {
      m.stopPropagation(), n.narrow(l(p, _.exclude), o(p));
    }
    return (p, _) => (u(), h("span", {
      class: oe(["dc-cell__text", { "dc-truncate": e.truncates }])
    }, [
      (u(!0), h(z, null, X(e.narrowings, (m, g) => (u(), h(z, {
        key: s(m)
      }, [
        g > 0 ? (u(), h(z, { key: 0 }, [
          J(", ")
        ], 64)) : T("", !0),
        U(se, Oe({
          class: "dc-narrow",
          href: i(m),
          title: r(m),
          selectable: ""
        }, pn(k(Cn)(k(n), c(m))), {
          onPress: (v, b) => d(m, v, b)
        }), {
          default: Y(() => [
            G(p.$slots, "default", {}, () => [
              J(E(m.label ?? a.value), 1)
            ], !0)
          ]),
          _: 2
        }, 1040, ["href", "title", "onPress"])
      ], 64))), 128))
    ], 2));
  }
}), ea = /* @__PURE__ */ Q(qi, [["__scopeId", "data-v-6e649daa"]]), Fi = /* @__PURE__ */ new Set(["entitykey", "entitylabel"]), Di = /* @__PURE__ */ new Set(["ordinal", "image", "component", "date"]), Vi = 4;
function Ja(e) {
  return (e.field ?? e.key)?.toLowerCase();
}
function Za(e) {
  return e.narrow === !1 || e.role === "identity" || e.activate || e.click || e.drill ? !1 : !Di.has(e.kind ?? "text") && Ja(e) !== void 0;
}
function Ki(e, t) {
  if (Number.isInteger(e)) return e;
  const n = 10 ** Vi;
  return (t ? Math.ceil(e * n - 1e-6) : Math.floor(e * n + 1e-6)) / n;
}
function Wi(e, t) {
  let n = 1 / 0, a = -1 / 0;
  for (const s of t) {
    const l = ie(e, s);
    typeof l != "number" || !Number.isFinite(l) || (l < n && (n = l), l > a && (a = l));
  }
  return n <= a ? { min: n, max: a } : null;
}
function zi(e, t, n, a = null) {
  if (!Za(e)) return [];
  const s = Ja(e);
  if (Fi.has(s) && !e.value)
    return t.entityKey ? [{ label: null, entity: t.entityKey }] : [];
  if (e.flags)
    return Object.entries(e.flags).filter(([r]) => t.fields[r] === !0).map(([r, c]) => ({
      label: c,
      term: { kind: "field", field: r.toLowerCase(), comparator: ":", value: "true" }
    }));
  const l = ie(e, t), o = n?.facets.find((r) => r.key.toLowerCase() === s);
  if (typeof l == "number") {
    if (!Number.isFinite(l)) return [];
    const r = o?.kind === "range" ? { min: o.min, max: o.max } : a, c = e.narrow === "<=" || e.narrow !== ">=" && (!r || l - r.min <= r.max - l);
    return [{
      label: null,
      term: { kind: "field", field: s, comparator: c ? "<=" : ">=", value: String(Ki(l, c)) }
    }];
  }
  return (Array.isArray(l) ? l : [l]).filter(
    (r) => typeof r == "string" && r !== ""
  ).map((r) => ({
    label: Array.isArray(l) ? r : null,
    term: { kind: "field", field: s, comparator: "=", value: r }
  }));
}
const ta = /* @__PURE__ */ new WeakMap();
function ji(e, t) {
  let n = ta.get(e);
  return n || ta.set(e, n = /* @__PURE__ */ new Map()), n.has(t) || n.set(t, Wi(t, e)), n.get(t);
}
const Ui = /* @__PURE__ */ j({
  __name: "ColumnCell",
  props: {
    column: {},
    entry: {}
  },
  setup(e) {
    const t = e, n = ee(), a = f(() => t.column.kind ?? "text"), s = f(() => ie(t.column, t.entry.row)), l = f(
      () => a.value === "ordinal" ? t.entry.ordinal : Me(t.column, t.entry.row)
    ), o = f(() => s.value), i = f(() => t.column.activate === !0 || !!t.column.click), r = f(() => an(t.column)), c = f(() => ua(t.column, t.entry.row)), d = f(() => {
      if (!Za(t.column)) return [];
      const g = typeof s.value == "number" ? ji(n.rows.value, t.column) : null;
      return zi(t.column, t.entry.row, t.entry.entity ?? null, g);
    });
    function p(g) {
      i.value && (g.stopPropagation(), _(ct(g)));
    }
    function _(g) {
      t.column.click?.(t.entry.row, g), t.column.activate && n.activate(t.entry.row, g);
    }
    const m = f(() => t.column.click ? t.column.clickHref?.(t.entry.row) ?? null : t.column.activate ? n.pressHref(t.entry.row) : null);
    return (g, v) => a.value === "component" && e.column.component ? (u(), H(at(e.column.component), {
      key: 0,
      row: e.entry.row,
      entry: e.entry,
      value: s.value,
      column: e.column
    }, null, 8, ["row", "entry", "value", "column"])) : a.value === "status" && d.value.length ? (u(), H(ea, {
      key: 1,
      entry: e.entry,
      column: e.column,
      narrowings: d.value,
      truncates: !1
    }, {
      default: Y(() => [
        U(je, { status: o.value }, null, 8, ["status"])
      ]),
      _: 1
    }, 8, ["entry", "column", "narrowings"])) : a.value === "status" ? (u(), H(je, {
      key: 2,
      status: o.value
    }, null, 8, ["status"])) : a.value === "image" ? (u(), H(zt, {
      key: 3,
      class: "dc-cell__image",
      src: typeof s.value == "string" ? s.value : "",
      style: ae({ maxHeight: e.column.height }),
      onClick: p
    }, null, 8, ["src", "style"])) : e.column.drill || e.column.click && e.column.role === "metric" ? (u(), H(pt, {
      key: 4,
      entry: e.entry,
      column: e.column
    }, null, 8, ["entry", "column"])) : i.value ? (u(), H(se, Oe({
      key: 5,
      class: ["dc-table__open", { "dc-truncate": r.value }],
      href: m.value,
      title: c.value
    }, pn(e.column.activate ? k(Cn)(k(n), k(Xa)(k(n), e.entry)) : {}), {
      onPress: v[0] || (v[0] = (b, C) => {
        C.stopPropagation(), _(b);
      })
    }), {
      default: Y(() => [
        J(E(l.value), 1)
      ]),
      _: 1
    }, 16, ["class", "href", "title"])) : d.value.length ? (u(), H(ea, {
      key: 6,
      entry: e.entry,
      column: e.column,
      narrowings: d.value,
      truncates: r.value
    }, null, 8, ["entry", "column", "narrowings", "truncates"])) : (u(), h("span", {
      key: 7,
      class: oe(["dc-cell__text", { "dc-truncate": r.value }])
    }, E(l.value), 3));
  }
}), na = /* @__PURE__ */ Q(Ui, [["__scopeId", "data-v-d07057a1"]]), Qi = {
  key: 0,
  class: "dc-table__none"
}, Gi = { class: "dc-table__detail" }, Yi = ["data-dc-wrap", "data-dc-row-links"], Xi = { "data-dc-stuck": "" }, Ji = {
  key: 0,
  class: "dc-table__pick",
  scope: "col"
}, Zi = {
  key: 1,
  class: "dc-table__standing",
  scope: "col",
  "aria-label": "In the query"
}, ec = ["data-dc-align", "data-dc-hide", "aria-sort", "title"], tc = {
  key: 2,
  class: "dc-table__head"
}, nc = { "data-dc-scroll": "" }, ac = ["onClick"], sc = {
  key: 0,
  class: "dc-table__pick"
}, lc = {
  key: 1,
  class: "dc-table__standing"
}, oc = ["data-dc-align", "data-dc-hide", "title"], rc = {
  key: 1,
  class: "dc-table__name"
}, ic = /* @__PURE__ */ j({
  __name: "TableView",
  setup(e) {
    const t = ee(), n = Re(), a = Hi();
    function s(M, R) {
      if (!t.rowLinks?.value || Aa()) return;
      const x = t.pressHref(M);
      if (x && on(R)) {
        ln(x, R);
        return;
      }
      t.activate(M, ct(R));
    }
    const l = f(() => t.rowLinks?.value ? new Map(n.value.map((M) => [M.key, t.pressHref(M.row)])) : /* @__PURE__ */ new Map()), o = f(
      () => a.value.find((M) => M.role === "identity") ?? a.value[0]
    );
    function i(M, R, x) {
      x.stopPropagation(), t.activate(M, R);
    }
    function r(M) {
      const R = ha(M, t.entity.value, t.schema.value), x = R ? `Shortcut: ${R}` : void 0;
      return [M.hint, x].filter(Boolean).join(`
`) || void 0;
    }
    const c = f(() => {
      const M = a.value.find((x) => x.scope);
      return M || ((t.entity.value ? !!t.entity.value.href : t.entities.value.some((x) => x.href)) ? a.value.find((x) => x.activate) : void 0);
    }), d = (M) => Ma(M.entity, M.row), p = f(
      () => n.value.some((M) => Oa(t.query.value.expr, d(M)) !== null)
    ), _ = f(
      () => a.value.some((M) => M.kind === "image" || M.height !== void 0)
    );
    function m(M) {
      M && (t.query.value.sort === M ? t.toggleDirection() : t.setSort(M));
    }
    function g(M) {
      return M ? t.query.value.sort === M ? t.hrefFor({ dir: t.query.value.dir === "desc" ? "asc" : "desc" }) : t.hrefFor({ sort: M }) : null;
    }
    const v = f(() => t.entity.value?.label ?? "The result set"), b = f(() => new Set(t.sorts.value.map((M) => M.key))), C = (M) => M.sort !== void 0 && b.value.has(M.sort), A = (M) => {
      if (C(M))
        return t.query.value.sort !== M.sort ? "none" : t.query.value.dir === "desc" ? "descending" : "ascending";
    };
    function y(M) {
      return [
        In(M),
        M.muted ? "dc-table__muted" : "",
        M.mono ? "dc-mono" : "",
        an(M) ? "dc-truncate" : ""
      ].filter(Boolean).join(" ");
    }
    function w(M, R) {
      if (!(!an(M) || M.activate || M.click))
        return ua(M, R.row);
    }
    const O = f(
      () => a.value.length + (t.selectable.value ? 1 : 0) + (p.value ? 1 : 0)
    );
    return (M, R) => k(a).length ? (u(), h("table", {
      key: 1,
      class: "dc-table",
      "data-dc-wrap": _.value ? "" : void 0,
      "data-dc-row-links": k(t).rowLinks?.value ? "" : void 0,
      style: ae({ "--dc-table-tracks": O.value })
    }, [
      $("thead", Xi, [
        $("tr", null, [
          k(t).selectable.value ? (u(), h("th", Ji, [
            U(Ka)
          ])) : T("", !0),
          p.value ? (u(), h("th", Zi)) : T("", !0),
          (u(!0), h(z, null, X(k(a), (x, I) => (u(), h("th", {
            key: k(An)(x, I),
            scope: "col",
            class: oe(k(In)(x)),
            style: ae({ width: x.width }),
            "data-dc-align": k(Nn)(x),
            "data-dc-hide": x.hideBelow,
            "aria-sort": A(x),
            title: r(x)
          }, [
            C(x) ? (u(), H(se, {
              key: 0,
              class: "dc-table__sort",
              href: g(x.sort),
              onPress: (L) => m(x.sort)
            }, {
              default: Y(() => [
                J(E(x.label), 1)
              ]),
              _: 2
            }, 1032, ["href", "onPress"])) : (u(), h(z, { key: 1 }, [
              J(E(x.label), 1)
            ], 64)),
            x.header ? (u(), h("span", tc, [
              (u(), H(at(x.header), {
                column: x,
                entity: k(t).entity.value
              }, null, 8, ["column", "entity"]))
            ])) : T("", !0)
          ], 14, ec))), 128))
        ])
      ]),
      $("tbody", nc, [
        (u(!0), h(z, null, X(k(n), (x) => (u(), h("tr", {
          key: x.key,
          class: "dc-table__row",
          onClick: (I) => s(x.row, I)
        }, [
          k(t).selectable.value ? (u(), h("td", sc, [
            U(He, {
              row: x.row,
              selected: x.selected,
              name: x.parts.identity
            }, null, 8, ["row", "selected", "name"])
          ])) : T("", !0),
          p.value ? (u(), h("td", lc, [
            U(ht, { entry: x }, null, 8, ["entry"])
          ])) : T("", !0),
          (u(!0), h(z, null, X(k(a), (I, L) => (u(), h("td", {
            key: k(An)(I, L),
            class: oe(y(I)),
            style: ae({ width: I.width }),
            "data-dc-align": k(Nn)(I),
            "data-dc-hide": I.hideBelow,
            title: w(I, x)
          }, [
            l.value.get(x.key) ? (u(), H(se, Oe({
              key: 0,
              class: "dc-table__cell-link",
              href: l.value.get(x.key),
              tabindex: I === o.value ? void 0 : -1,
              "aria-hidden": I === o.value ? void 0 : "true",
              "aria-label": I === o.value ? x.parts.identity : void 0
            }, pn(k(Cn)(k(t), k(Xa)(k(t), x))), {
              onPress: (K, D) => i(x.row, K, D)
            }), null, 16, ["href", "tabindex", "aria-hidden", "aria-label", "onPress"])) : T("", !0),
            I === c.value ? (u(), h("span", rc, [
              U(na, {
                column: I,
                entry: x
              }, null, 8, ["column", "entry"]),
              U(yt, { entry: x }, null, 8, ["entry"]),
              U(mt, { entry: x }, null, 8, ["entry"])
            ])) : (u(), H(na, {
              key: 2,
              column: I,
              entry: x
            }, null, 8, ["column", "entry"]))
          ], 14, oc))), 128))
        ], 8, ac))), 128))
      ])
    ], 12, Yi)) : (u(), h("p", Qi, [
      R[2] || (R[2] = $("span", { class: "dc-table__headline" }, "No columns declared", -1)),
      $("span", Gi, [
        J(E(v.value) + " has no ", 1),
        R[0] || (R[0] = $("code", null, "columns", -1)),
        R[1] || (R[1] = J(" in the schema, so there is no table to draw. ", -1))
      ])
    ]));
  }
}), es = /* @__PURE__ */ Q(ic, [["__scopeId", "data-v-30f18dcf"]]);
function cc(e) {
  const t = pe([]), n = q(!1), a = pe(null);
  let s = 0;
  const l = (r, c, d, p, _) => ({
    entity: r,
    rows: e.limit.value > 0 ? c.rows.map((m, g) => za(m, g, r, e.isPinned(m.id))) : [],
    total: c.total,
    count: d ? rt(r) : Ne(c.total),
    pinned: uc(p, c, _)
  }), o = () => {
    const r = ++s, c = e.query.value, d = e.schema.value, p = e.entities.value, _ = e.limit.value, m = e.within?.value.trim() ?? "", g = gn(c) && !m, v = m ? yn(m, c.expr) : c.expr, b = p.map((C) => ({
      entity: C,
      // Scope the query to this entity, keeping the expression and ordering.
      outcome: e.source.value.query({
        // Each card is the top few of its type, wherever the shell's own
        // result set has been paged to — so this asks for the first page.
        query: { ...c, entity: C.key, expr: v, page: 1 },
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
        ({ entity: C, outcome: A }) => l(C, A, g, d, v)
      ), a.value = null, n.value = !1;
      return;
    }
    n.value = !0, Promise.all(b.map(({ outcome: C }) => Promise.resolve(C))).then((C) => {
      r === s && (t.value = C.map(
        (A, y) => l(b[y].entity, A, g, d, v)
      ), a.value = null);
    }).catch((C) => {
      r === s && (a.value = C, t.value = []);
    }).finally(() => {
      r === s && (n.value = !1);
    });
  }, i = () => {
    try {
      o();
    } catch (r) {
      a.value = r, t.value = [], n.value = !1;
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
    i,
    { immediate: !0 }
  ), { previews: t, pending: n, error: a, refresh: i };
}
function uc(e, t, n) {
  const a = t.rows[0];
  if (t.total !== 1 || t.rows.length !== 1 || !a)
    return !1;
  const s = n.trim();
  if (!s)
    return !1;
  const l = Mt(e, a);
  return !!l && ze(s, l) === s;
}
const dc = ["data-dc-pending", "data-dc-heads-only"], fc = {
  key: 0,
  class: "dc-types__state",
  role: "alert"
}, vc = {
  key: 1,
  class: "dc-types__state",
  "aria-live": "polite"
}, pc = {
  key: 2,
  class: "dc-types__state"
}, hc = ["data-dc-empty"], mc = { class: "dc-type__name" }, yc = { class: "dc-type__count dc-mono" }, gc = {
  key: 0,
  class: "dc-type__note dc-mono"
}, _c = { class: "dc-type__sr" }, wc = {
  key: 1,
  class: "dc-type__description"
}, kc = {
  key: 0,
  class: "dc-type__empty"
}, bc = { class: "dc-type__identity" }, $c = { class: "dc-type__primary dc-truncate" }, xc = { class: "dc-type__secondary dc-mono dc-truncate" }, Sc = { class: "dc-type__trailing dc-mono" }, Cc = { class: "dc-type__metric-value" }, Pc = { class: "dc-type__metric-label" }, Mc = {
  key: 0,
  class: "dc-type__date"
}, Ec = /* @__PURE__ */ j({
  __name: "TypeCardsView",
  setup(e) {
    const t = ee(), { previews: n, pending: a, error: s } = cc({
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
    ), o = f(() => t.previewsPerType.value <= 0), i = f(
      () => new Set(n.value.filter((d) => d.pinned).map((d) => d.entity.key))
    ), r = (d) => {
      const { keepsCard: p } = d;
      return Array.isArray(p) ? p.some((_) => i.value.has(_)) : !!p;
    }, c = f(
      () => n.value.filter(
        (d) => !d.pinned && (l.value || !d.entity.nested) && (d.total > 0 || r(d.entity) || !o.value && d.entity.create)
      )
    );
    return (d, p) => (u(), h("div", {
      class: "dc-types",
      "data-dc-pending": k(a) ? "true" : "false",
      "data-dc-heads-only": o.value ? "true" : "false"
    }, [
      G(d.$slots, "before", {}, void 0, !0),
      k(s) ? (u(), h("p", fc, " Could not load results: " + E(k(s) instanceof Error ? k(s).message : "the data source failed."), 1)) : !c.value.length && k(a) ? (u(), h("p", vc, " Running query… ")) : c.value.length ? T("", !0) : (u(), h("p", pc, E(l.value ? "Nothing matches this query" : "Nothing here yet"), 1)),
      (u(!0), h(z, null, X(c.value, (_) => (u(), h("section", {
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
            $("span", mc, E(_.entity.label), 1),
            $("span", yc, E(_.count), 1),
            _.entity.note ? (u(), h("span", gc, E(_.entity.note), 1)) : T("", !0),
            p[0] || (p[0] = $("span", {
              class: "dc-type__go",
              "aria-hidden": "true"
            }, "→", -1)),
            $("span", _c, "Show only " + E(_.entity.label.toLowerCase()), 1),
            _.entity.description ? (u(), h("span", wc, E(_.entity.description), 1)) : T("", !0)
          ]),
          _: 2
        }, 1032, ["href", "onPress"]),
        _.total ? T("", !0) : (u(), h("p", kc, E(l.value ? "No matches" : "Nothing here yet"), 1)),
        (u(!0), h(z, null, X(_.rows, (m) => (u(), h("div", {
          key: m.key,
          class: "dc-type__row"
        }, [
          U(se, {
            class: "dc-type__open",
            href: k(t).pressHref(m.row),
            onPress: (g) => k(t).activate(m.row, g)
          }, {
            default: Y(() => [
              $("span", bc, [
                $("span", $c, E(m.parts.identity), 1),
                $("span", xc, E(m.parts.reference), 1)
              ])
            ]),
            _: 2
          }, 1032, ["href", "onPress"]),
          $("span", Sc, [
            (u(!0), h(z, null, X(m.parts.metrics.slice(0, 1), (g) => (u(), H(pt, {
              key: g.column.key ?? g.label,
              class: "dc-type__metric",
              entry: m,
              column: g.column
            }, {
              default: Y(() => [
                $("span", Cc, E(g.text), 1),
                $("span", Pc, E(g.label), 1)
              ]),
              _: 2
            }, 1032, ["entry", "column"]))), 128)),
            m.parts.updated ? (u(), h("span", Mc, E(m.parts.updated), 1)) : T("", !0),
            U(ht, { entry: m }, null, 8, ["entry"]),
            U(yt, { entry: m }, null, 8, ["entry"]),
            U(mt, { entry: m }, null, 8, ["entry"])
          ])
        ]))), 128)),
        _.entity.create && !o.value ? (u(), H(se, {
          key: 1,
          class: "dc-type__new",
          href: k(t).createHref?.(_.entity),
          onPress: (m) => k(t).create(_.entity)
        }, {
          default: Y(() => [
            p[1] || (p[1] = $("span", {
              class: "dc-type__plus",
              "aria-hidden": "true"
            }, "+", -1)),
            J(" " + E(_.entity.create), 1)
          ]),
          _: 2
        }, 1032, ["href", "onPress"])) : T("", !0)
      ], 8, hc))), 128)),
      G(d.$slots, "after", {}, void 0, !0)
    ], 8, dc));
  }
}), ts = /* @__PURE__ */ Q(Ec, [["__scopeId", "data-v-d60e56a6"]]), Lc = ["data-dc-pending", "data-dc-more"], Tc = {
  key: 0,
  class: "dc-results__state dc-results__state--loading",
  "aria-live": "polite"
}, Oc = {
  key: 3,
  class: "dc-results__state",
  role: "alert"
}, Ac = { class: "dc-results__detail" }, Nc = {
  key: 4,
  class: "dc-results__state",
  "aria-live": "polite"
}, Ic = {
  key: 5,
  class: "dc-results__state"
}, Bc = { class: "dc-results__detail" }, Rc = /* @__PURE__ */ j({
  __name: "ResultsArea",
  props: {
    views: {},
    loading: { type: Boolean }
  },
  setup(e) {
    const t = e, n = ee(), a = Nt(), s = {
      list: dn,
      cards: ja,
      grid: Ua,
      images: Qa,
      table: es,
      links: Ga,
      preview: Ya
    }, l = f(() => ba(n.query.value, t.views)), o = f(() => Ae(n.query.value.view, t.views)), i = f(() => (o.value === "record" ? null : s[o.value]) ?? dn), r = f(() => o.value === "record" ? n.recordView.value : null), c = f(() => n.rows.value.length > 0), d = f(() => n.error.value !== null), p = q(null);
    function _(y) {
      return y.querySelector("[data-dc-scroll]") ?? y;
    }
    ne(
      // The page on screen, which is the draft's own while one is being typed.
      () => n.liveQuery.value.page,
      () => {
        p.value && (_(p.value).scrollTop = 0);
      }
    );
    const m = q(""), g = q({ x: 0, y: 0 }), v = q(0);
    function b() {
      const y = p.value;
      if (!y) {
        m.value = "";
        return;
      }
      const w = _(y), O = {
        top: w.scrollTop > 1,
        right: w.scrollWidth - w.clientWidth - w.scrollLeft > 1,
        bottom: w.scrollHeight - w.clientHeight - w.scrollTop > 1,
        left: w.scrollLeft > 1
      };
      m.value = Object.entries(O).filter(([, M]) => M).map(([M]) => M).join(" "), g.value = {
        x: w.offsetHeight - w.clientHeight,
        y: w.offsetWidth - w.clientWidth
      }, v.value = y.querySelector("[data-dc-stuck]")?.offsetHeight ?? 0;
    }
    let C = null, A = null;
    return ne(
      p,
      (y, w) => {
        if (w?.removeEventListener("scroll", b, { capture: !0 }), C?.disconnect(), A?.disconnect(), C = null, A = null, b(), !y || (y.addEventListener("scroll", b, { passive: !0, capture: !0 }), typeof ResizeObserver > "u")) return;
        const O = new ResizeObserver(b), M = typeof MutationObserver > "u" ? null : new MutationObserver(() => {
          R(), b();
        }), R = () => {
          O.disconnect(), M?.disconnect();
          for (const x of /* @__PURE__ */ new Set([y, _(y)])) {
            O.observe(x);
            for (const I of x.children) O.observe(I);
            M?.observe(x, { childList: !0 });
          }
        };
        R(), C = O, A = M;
      },
      { flush: "post" }
    ), we(() => {
      p.value?.removeEventListener("scroll", b, { capture: !0 }), C?.disconnect(), A?.disconnect();
    }), (y, w) => (u(), h("div", {
      ref_key: "scroller",
      ref: p,
      class: "dc-results",
      "data-dc-pending": k(n).pending.value ? "true" : "false",
      "data-dc-more": m.value,
      style: ae({
        "--dc-results-gutter-x": `${g.value.x}px`,
        "--dc-results-gutter-y": `${g.value.y}px`,
        "--dc-results-stuck": `${v.value}px`
      })
    }, [
      e.loading ? (u(), h("p", Tc, [...w[1] || (w[1] = [
        $("span", { class: "dc-results__detail" }, "Loading…", -1)
      ])])) : l.value ? (u(), H(ts, { key: 1 }, wt({ _: 2 }, [
        a["cards-before"] ? {
          name: "before",
          fn: Y(() => [
            G(y.$slots, "cards-before", {}, void 0, !0)
          ]),
          key: "0"
        } : void 0,
        a["cards-after"] ? {
          name: "after",
          fn: Y(() => [
            G(y.$slots, "cards-after", {}, void 0, !0)
          ]),
          key: "1"
        } : void 0
      ]), 1024)) : r.value?.id ? (u(), H(at(r.value.component), {
        key: 2,
        id: r.value.id
      }, null, 8, ["id"])) : d.value ? (u(), h("p", Oc, [
        w[2] || (w[2] = $("span", { class: "dc-results__headline" }, "Could not load results", -1)),
        $("span", Ac, E(k(n).error.value instanceof Error ? k(n).error.value.message : "The data source failed."), 1)
      ])) : !c.value && k(n).pending.value ? (u(), h("p", Nc, [...w[3] || (w[3] = [
        $("span", { class: "dc-results__detail" }, "Running query…", -1)
      ])])) : c.value ? (u(), H(at(i.value), { key: 6 })) : (u(), h("div", Ic, [
        w[4] || (w[4] = $("span", { class: "dc-results__headline" }, "Nothing matches this query", -1)),
        $("span", Bc, E(k(n).summary.value), 1),
        k(n).isPristine.value ? T("", !0) : (u(), H(se, {
          key: 0,
          class: "dc-results__clear",
          href: k(n).isEverything.value ? k(n).clearHref() : k(n).entityHref(null),
          onPress: w[0] || (w[0] = (O) => k(n).isEverything.value ? k(n).clearFilters() : k(n).clearEntity())
        }, {
          default: Y(() => [
            J(E(k(n).isEverything.value ? "Clear filters" : "Search everything instead"), 1)
          ]),
          _: 1
        }, 8, ["href"]))
      ]))
    ], 12, Lc));
  }
}), ns = /* @__PURE__ */ Q(Rc, [["__scopeId", "data-v-bc18f2f9"]]), Hc = ["data-dc-theme", "data-dc-value-press", "data-dc-layout"], qc = { class: "dc-shell__main" }, Fc = {
  key: 0,
  class: "dc-shell__page"
}, Dc = {
  key: 1,
  class: "dc-shell__panel",
  "aria-label": "Panel"
}, Vc = /* @__PURE__ */ j({
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
    const a = e, s = n, l = Ln(e, "pinned"), o = Ln(e, "selected"), i = Nt(), r = fn(ia, null), c = a.route || r ? null : vs(), d = a.route ?? r ?? c;
    we(() => c?.dispose?.());
    const p = q(!!i.page);
    os(() => {
      p.value = !!i.page;
    });
    const _ = ps(d, {
      detached: () => p.value && a.pageQuery === "detached",
      path: () => a.listPath
    }), m = f(() => dl({ seed: a.schema.key })), g = f(() => a.source ?? m.value), v = Al({
      schema: () => a.schema,
      adapter: _,
      defaults: () => a.defaults,
      navigationMode: () => a.navigationMode,
      facetNavigationMode: () => a.facetNavigationMode
    }), b = f(() => a.within?.trim() ?? ""), C = Rl({
      query: v.query,
      entity: v.entity,
      schema: f(() => a.schema),
      setExpression: v.setExpression
    });
    ne(v.query, (S) => s("query-change", S));
    const A = f(() => kl(a.schema, [v.query.value.expr])), y = f(
      () => A.value.flatMap((S) => {
        const N = a.schema.entities.find((F) => F.key === S.entityKey);
        return N ? [{ ...S, entity: N }] : [];
      })
    );
    function w() {
      if (i.record) return y.value;
      const S = a.recordCards;
      return S ? y.value.filter((N) => S[N.entityKey]) : [];
    }
    const O = f(() => {
      const [S, ...N] = y.value;
      if (!S || N.length || v.entity.value !== null) return null;
      const F = a.recordViews?.[S.entityKey];
      return F ? { ...F, id: S.id } : null;
    }), M = f(() => {
      const S = v.entity.value?.key;
      return S && a.recordViews?.[S] || null;
    }), R = f(() => {
      const S = a.views, N = typeof S == "function" ? S({ entity: v.entity.value, records: A.value }) : S;
      return O.value || M.value ? [...(N ?? hn).filter((F) => F !== "record"), "record"] : N?.filter((F) => F !== "record");
    }), x = f(
      () => M.value !== null && Ae(v.query.value.view, R.value) === "record"
    ), I = f(() => x.value ? 1 : a.limit), L = Nl({
      source: g,
      query: C.live,
      schema: f(() => a.schema),
      entity: v.entity,
      limit: I,
      within: b
    }), K = Il({
      // Not before the data has landed: what is there until then is no place to hold.
      active: f(() => x.value && !a.loading),
      rows: L.rows,
      pending: L.pending,
      page: f(() => C.live.value.page),
      list: f(() => {
        const { entity: S, expr: N, sort: F, dir: $e } = C.live.value;
        return JSON.stringify([S, N, F, $e]);
      }),
      locate: L.locate,
      moveTo: (S) => {
        C.drafting.value ? C.setPage(S) : v.setPage(S, "replace");
      }
    }), D = f(() => L.pageCount.value + (K.gone.value ? 1 : 0)), te = f(() => {
      if (O.value) return O.value;
      const S = M.value;
      return S ? { ...S, id: K.id.value ?? L.rows.value[0]?.id ?? null } : null;
    });
    function re(S) {
      const N = M.value !== null && Ae(S, R.value) === "record";
      if (N === x.value) {
        v.setView(S);
        return;
      }
      const F = C.live.value.page, $e = N ? (F - 1) * a.limit + 1 : Math.ceil(F / a.limit);
      C.drafting.value ? (v.setView(S), C.setPage($e)) : v.setView(S, $e);
    }
    function he(S) {
      if (!M.value || x.value) return null;
      const N = L.rows.value.indexOf(S);
      return N === -1 ? null : L.offset.value + N + 1;
    }
    ne(
      [D, L.pending, v.query, C.drafting, () => a.loading, p, K.holding],
      () => {
        if (L.pending.value || C.drafting.value || a.loading || p.value) return;
        const S = D.value;
        v.query.value.page <= S || (K.gone.value ? K.moveTo(S) : K.holding.value || v.setPage(S, "replace"));
      },
      // Immediately, since a pasted URL is past the end before anything changes;
      // and after the render, so the correction is a navigation the mounted shell
      // makes rather than one it makes on the way up. An async source is still
      // pending here and corrects itself when its count lands.
      { immediate: !0, flush: "post" }
    );
    const me = f(() => new Set(l.value));
    function qe(S) {
      const N = new Set(me.value);
      N.has(S.id) ? N.delete(S.id) : N.add(S.id), l.value = [...N], s("toggle-pin", S);
    }
    const le = f(() => {
      const S = (F) => !!F.scope && F.standing !== !1, N = v.entity.value;
      return N ? S(N) : a.schema.entities.some(S);
    }), Ge = f(() => {
      if (a.selectable === !0 || le.value) return !0;
      const S = v.entity.value;
      return !!(S?.duplicate || S?.delete || S?.operations?.some((N) => N.selection !== !1));
    }), ye = f(() => new Set(o.value));
    function de(S) {
      const N = a.schema.entities.find((F) => F.key === S.entityKey) ?? v.entity.value;
      return Ma(N, S);
    }
    const Ye = /* @__PURE__ */ new Map();
    function Ut(S) {
      const N = new Set(ye.value);
      N.has(S.id) ? N.delete(S.id) : (N.add(S.id), Ye.set(S.id, de(S))), o.value = [...N];
    }
    function Xe(S) {
      const N = new Set(ye.value);
      for (const F of L.rows.value)
        S ? (N.add(F.id), Ye.set(F.id, de(F))) : N.delete(F.id);
      o.value = [...N];
    }
    const Fe = f(() => {
      const S = new Map(L.rows.value.map((N) => [N.id, N]));
      return o.value.map((N) => {
        const F = S.get(N);
        return F ? de(F) : Ye.get(N) ?? null;
      }).filter((N) => N !== null);
    });
    function Ee(S) {
      const N = Fe.value;
      if (!N.length) return;
      const F = wl(v.query.value.expr, N, S);
      be(), v.setExpression(F);
    }
    function be() {
      o.value.length && (o.value = []);
    }
    const P = f(() => ({
      ids: [...o.value],
      rows: L.rows.value.filter((S) => ye.value.has(S.id)),
      entity: v.entity.value
    }));
    ne(() => v.query.value.entity, be);
    function B(S, N, F = {}, $e) {
      const Mn = tn(a.schema, v.query.value, S, F, $e);
      F.exclude ? v.narrow(Mn, N?.key ?? v.query.value.entity) : C.release(() => v.narrow(Mn, N?.key ?? null, N ? void 0 : "cards")), s("drill", S, N, F);
    }
    function W(S) {
      return a.rowPress === "narrow" && Mt(a.schema, S) !== null;
    }
    function V(S) {
      return a.schema.entities.find((F) => F.key === S.entityKey)?.href?.(S) || null;
    }
    const De = pe(null);
    ne(v.query, () => {
      De.value = null;
    });
    const fe = bl({
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
      setPage: (S, N) => {
        const F = K.step(S);
        F !== null && (C.drafting.value ? C.setPage(F) : v.setPage(F, N));
      },
      setView: re,
      schema: f(() => a.schema),
      entities: f(() => a.schema.entities),
      rows: L.rows,
      total: L.total,
      matched: L.matched,
      limit: I,
      offset: L.offset,
      pageCount: D,
      peek: L.peek,
      pending: L.pending,
      counting: L.counting,
      error: L.error,
      source: g,
      previewsPerType: f(() => a.previewsPerType),
      within: b,
      loading: f(() => a.loading),
      recordView: te,
      pinnable: f(() => a.pinnable === !0),
      isPinned: (S) => me.value.has(S.id),
      isPinnedId: (S) => me.value.has(S),
      togglePin: qe,
      selectable: Ge,
      selection: P,
      isSelected: (S) => ye.value.has(S.id),
      toggleSelect: Ut,
      selectPage: Xe,
      clearSelection: be,
      standable: le,
      selectionTerms: Fe,
      standSelection: Ee,
      narrowsOnPress: f(() => a.rowPress === "narrow"),
      rowLinks: f(() => a.rowLinks),
      pressPreview: De,
      /*
       * The one place a press is read, so every view gets the same answer without
       * knowing which of the two it is: they all call this.
       */
      activate: (S, N = {}) => {
        if (W(S)) {
          B(S, null, N);
          return;
        }
        const F = he(S);
        if (F !== null) {
          C.drafting.value ? (v.setView("record"), C.setPage(F)) : v.setView("record", F);
          return;
        }
        const $e = V(S);
        if ($e) {
          window.open($e, "_blank", "noopener");
          return;
        }
        s("activate", S);
      },
      pressHref: (S) => {
        if (W(S)) return v.narrowHref(tn(a.schema, v.query.value, S), null, "cards");
        const N = he(S);
        return N !== null ? v.hrefFor({ view: "record", page: N }) : V(S) ?? a.activateHref?.(S) ?? null;
      },
      recordHref: V,
      drillHref: (S, N, F) => Mt(a.schema, S) ? v.narrowHref(
        tn(a.schema, v.query.value, S, {}, F),
        N?.key ?? null,
        N ? void 0 : "cards"
      ) : null,
      create: (S) => s("create", S),
      createHref: (S) => a.createHref?.(S) ?? null,
      duplicate: () => s("duplicate", P.value),
      delete: () => s("delete", P.value),
      operate: (S) => s("operate", S, P.value),
      drill: B
    });
    Sl({ theme: () => a.theme, accent: () => a.accent, tokens: () => a.tokens });
    const ls = f(() => {
      if (!(!a.accent && !a.tokens))
        return { ...a.tokens, ...a.accent ? { "--dc-accent": a.accent } : {} };
    }), Pn = q(null), Qt = q(0);
    let Gt = null;
    Ue(() => {
      const S = Pn.value;
      S && (Qt.value = S.getBoundingClientRect().width, !(typeof ResizeObserver > "u") && (Gt = new ResizeObserver(([N]) => {
        Qt.value = N.contentRect.width;
      }), Gt.observe(S)));
    }), we(() => Gt?.disconnect());
    const gt = f(() => a.layout === "panel"), Yt = f(() => !gt.value && a.oneStripFrom !== !1 && Qt.value >= a.oneStripFrom), Xt = f(
      () => Ae(v.query.value.view, R.value) === "record" && te.value?.strip === !1
    ), Jt = f(() => ({
      views: R.value,
      selectionPlacement: a.selectionPlacement,
      pagesNote: a.pagesNote
    }));
    return t({
      query: v.query
    }), (S, N) => (u(), h("div", {
      ref_key: "root",
      ref: Pn,
      class: "dc-shell",
      "data-dc-theme": e.theme,
      "data-dc-value-press": e.valuePress,
      "data-dc-layout": e.layout,
      style: ae(ls.value)
    }, [
      gt.value ? T("", !0) : (u(), h("div", {
        key: 0,
        class: oe(["dc-shell__head", { "dc-shell__head--one-strip": Yt.value }])
      }, [
        U(cn, null, wt({ _: 2 }, [
          i.page ? void 0 : {
            name: "lead",
            fn: Y(() => [
              U(Jn, {
                views: R.value,
                "type-chooser": e.typeChooser
              }, null, 8, ["views", "type-chooser"])
            ]),
            key: "0"
          },
          i.brand ? {
            name: "brand",
            fn: Y((F) => [
              G(S.$slots, "brand", Zt(rs(F)), void 0, !0)
            ]),
            key: "1"
          } : void 0,
          i.actions ? {
            name: "actions",
            fn: Y(() => [
              G(S.$slots, "actions", {}, void 0, !0)
            ]),
            key: "2"
          } : void 0
        ]), 1024),
        Yt.value && !i.page && !Xt.value ? (u(), H(bt, Zt(Oe({ key: 0 }, Jt.value)), null, 16)) : T("", !0)
      ], 2)),
      $("div", qc, [
        i.page ? (u(), h("div", Fc, [
          G(S.$slots, "page", {
            query: k(fe).query.value
          }, void 0, !0)
        ])) : T("", !0),
        !gt.value && !Yt.value && !i.page && !Xt.value ? (u(), H(bt, Zt(Oe({ key: 1 }, Jt.value)), null, 16)) : T("", !0),
        i.page ? T("", !0) : G(S.$slots, "results", {
          rows: k(fe).rows.value,
          total: k(fe).total.value,
          offset: k(fe).offset.value,
          pageCount: k(fe).pageCount.value,
          query: k(fe).liveQuery.value,
          pending: k(fe).pending.value,
          loading: e.loading
        }, () => [
          U(ns, {
            views: R.value,
            loading: e.loading
          }, wt({ _: 2 }, [
            i["cards-before"] || w().length ? {
              name: "cards-before",
              fn: Y(() => [
                (u(!0), h(z, null, X(w(), (F) => (u(), h(z, {
                  key: `${F.entityKey}:${F.id}`
                }, [
                  i.record ? G(S.$slots, "record", {
                    id: F.id,
                    entity: F.entity
                  }, void 0, !0, 0) : (u(), H(at(e.recordCards?.[F.entityKey]), {
                    key: 1,
                    id: F.id
                  }, null, 8, ["id"]))
                ], 64))), 128)),
                G(S.$slots, "cards-before", {}, void 0, !0)
              ]),
              key: "0"
            } : void 0,
            i["cards-after"] ? {
              name: "cards-after",
              fn: Y(() => [
                G(S.$slots, "cards-after", {}, void 0, !0)
              ]),
              key: "1"
            } : void 0
          ]), 1032, ["views", "loading"])
        ], !0, 2)
      ]),
      gt.value ? (u(), h("aside", Dc, [
        G(S.$slots, "panel-head", {}, void 0, !0),
        U(cn, { panel: "" }, wt({ _: 2 }, [
          i.actions ? {
            name: "actions",
            fn: Y(() => [
              G(S.$slots, "actions", {}, void 0, !0)
            ]),
            key: "0"
          } : void 0
        ]), 1024),
        i.page ? T("", !0) : (u(), H(Jn, {
          key: 0,
          views: R.value,
          "type-chooser": e.typeChooser,
          labels: e.viewLabels,
          hints: e.viewHints,
          stacked: ""
        }, null, 8, ["views", "type-chooser", "labels", "hints"])),
        !i.page && A.value.length === 0 ? (u(), H(vr, { key: 1 })) : T("", !0),
        G(S.$slots, "panel", {
          query: k(fe).query.value
        }, void 0, !0),
        !i.page && !Xt.value ? (u(), H(bt, Oe({
          key: 2,
          class: "dc-shell__panel-actions"
        }, Jt.value), null, 16)) : T("", !0)
      ])) : T("", !0)
    ], 12, Hc));
  }
}), Kc = /* @__PURE__ */ Q(Vc, [["__scopeId", "data-v-b02528f7"]]), Wc = ["data-dc-span", "data-dc-muted", "data-dc-collapsed"], zc = ["data-dc-collapsible"], jc = ["aria-expanded", "aria-controls"], Uc = { class: "dc-shell-card__sr" }, Qc = {
  key: 0,
  class: "dc-shell-card__identity"
}, Gc = { class: "dc-shell-card__title dc-shell-card__name" }, Yc = {
  key: 0,
  class: "dc-shell-card__ref dc-mono"
}, Xc = {
  key: 1,
  class: "dc-shell-card__title"
}, Jc = {
  key: 2,
  class: "dc-shell-card__count dc-mono"
}, Zc = {
  key: 1,
  class: "dc-shell-card__aside"
}, eu = ["data-dc-flush"], tu = /* @__PURE__ */ j({
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
    const n = e, a = t, s = q(n.defaultCollapsed === !0), l = f(() => n.span === "all" ? { gridColumn: "1 / -1" } : void 0), o = Nt();
    function i(x) {
      return r(x?.() ?? []);
    }
    function r(x) {
      return x.some((I) => I.type === is ? !1 : I.type === cs ? String(I.children ?? "").trim().length > 0 : I.type === z ? r(I.children ?? []) : !0);
    }
    const c = f(
      () => !!n.title || !!n.name || d.value || i(o.head)
    ), d = f(() => i(o.aside)), p = f(() => i(o.default)), _ = f(() => i(o.foot)), m = f(
      () => !!n.name && (!!n.reference || i(o.reference))
    ), g = f(() => n.collapsible === !0 && c.value), v = f(() => g.value && (n.collapsed ?? s.value));
    function b() {
      const x = !v.value;
      s.value = x, a("update:collapsed", x);
    }
    const C = It() ?? "dc-shell-card", A = `${C}-body`, y = `${C}-foot`, w = f(
      () => [p.value ? A : "", _.value ? y : ""].filter(Boolean).join(" ") || void 0
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
    ].join(", "), M = q(null);
    function R(x) {
      if (!g.value) return;
      const I = x.target?.closest(O);
      I && M.value?.contains(I) || typeof window < "u" && window.getSelection()?.toString() || b();
    }
    return (x, I) => (u(), h("section", {
      class: "dc-shell-card",
      style: ae(l.value),
      "data-dc-span": e.span,
      "data-dc-muted": e.muted ? "true" : "false",
      "data-dc-collapsed": v.value ? "true" : "false"
    }, [
      c.value ? (u(), h("header", {
        key: 0,
        ref_key: "head",
        ref: M,
        class: "dc-shell-card__head",
        "data-dc-collapsible": g.value ? "true" : "false",
        onClick: R
      }, [
        g.value ? (u(), h("button", {
          key: 0,
          type: "button",
          class: "dc-shell-card__toggle",
          "aria-expanded": v.value ? "false" : "true",
          "aria-controls": w.value,
          onClick: b
        }, [
          I[0] || (I[0] = $("svg", {
            class: "dc-shell-card__chevron",
            viewBox: "0 0 10 10",
            "aria-hidden": "true"
          }, [
            $("path", { d: "M2 3.5 5 6.5 8 3.5" })
          ], -1)),
          $("span", Uc, E(e.name || e.title || "Card"), 1)
        ], 8, jc)) : T("", !0),
        G(x.$slots, "head", {}, () => [
          e.name ? (u(), h("div", Qc, [
            $("h2", Gc, E(e.name), 1),
            m.value ? (u(), h("span", Yc, [
              G(x.$slots, "reference", {}, () => [
                J(E(e.reference), 1)
              ], !0)
            ])) : T("", !0)
          ])) : (u(), h("h2", Xc, E(e.title), 1)),
          e.count !== void 0 ? (u(), h("span", Jc, E(e.count), 1)) : T("", !0)
        ], !0),
        d.value ? (u(), h("span", Zc, [
          G(x.$slots, "aside", {}, void 0, !0)
        ])) : T("", !0)
      ], 8, zc)) : T("", !0),
      p.value ? $t((u(), h("div", {
        key: 1,
        id: A,
        class: "dc-shell-card__body",
        "data-dc-flush": e.flush ? "true" : "false"
      }, [
        G(x.$slots, "default", {}, void 0, !0)
      ], 8, eu)), [
        [On, !v.value]
      ]) : T("", !0),
      _.value ? $t((u(), h("footer", {
        key: 2,
        id: y,
        class: "dc-shell-card__foot"
      }, [
        G(x.$slots, "foot", {}, void 0, !0)
      ], 512)), [
        [On, !v.value]
      ]) : T("", !0)
    ], 12, Wc));
  }
}), sd = /* @__PURE__ */ Q(tu, [["__scopeId", "data-v-c84525aa"]]), nu = ["aria-label"], au = ["aria-checked", "data-dc-active", "tabindex", "onClick", "onKeydown"], su = /* @__PURE__ */ j({
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
    function l(o, i) {
      const r = n.options.length;
      let c = null;
      if (o.key === "ArrowRight" || o.key === "ArrowDown" ? c = (i + 1) % r : o.key === "ArrowLeft" || o.key === "ArrowUp" ? c = (i - 1 + r) % r : o.key === "Home" ? c = 0 : o.key === "End" && (c = r - 1), c === null) return;
      o.preventDefault();
      const d = n.options[c];
      d && (a("update:modelValue", d.key), s.value[c]?.focus());
    }
    return (o, i) => (u(), h("div", {
      class: "dc-segmented",
      role: "radiogroup",
      "aria-label": e.label
    }, [
      (u(!0), h(z, null, X(e.options, (r, c) => (u(), h("button", {
        key: r.key,
        ref_for: !0,
        ref_key: "buttons",
        ref: s,
        type: "button",
        role: "radio",
        class: oe(["dc-segmented__item", { "dc-segmented__item--mono": e.mono }]),
        "aria-checked": r.key === e.modelValue,
        "data-dc-active": r.key === e.modelValue ? "true" : "false",
        tabindex: r.key === e.modelValue ? 0 : -1,
        onClick: (d) => a("update:modelValue", r.key),
        onKeydown: (d) => l(d, c)
      }, E(r.label), 43, au))), 128))
    ], 8, nu));
  }
}), lu = /* @__PURE__ */ Q(su, [["__scopeId", "data-v-63fb5482"]]), ou = { class: "dc-fact__label" }, ru = ["title"], iu = /* @__PURE__ */ j({
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
        const l = s.filter((o) => o != null && o !== "");
        return l.length ? l.map(String) : [ke];
      }
      return [String(s)];
    }), a = f(() => t.wide ? { gridColumn: "1 / -1" } : void 0);
    return (s, l) => (u(), h("div", {
      class: "dc-fact",
      style: ae(a.value)
    }, [
      $("dt", ou, [
        G(s.$slots, "label", {}, () => [
          J(E(e.label), 1)
        ], !0)
      ]),
      $("dd", {
        class: "dc-fact__value dc-mono",
        title: e.title
      }, [
        G(s.$slots, "default", {}, () => [
          n.value.length === 1 ? (u(), h(z, { key: 0 }, [
            J(E(n.value[0]), 1)
          ], 64)) : (u(!0), h(z, { key: 1 }, X(n.value, (o, i) => (u(), h("span", {
            key: i,
            class: "dc-fact__line"
          }, E(o), 1))), 128))
        ], !0)
      ], 8, ru)
    ], 4));
  }
}), cu = /* @__PURE__ */ Q(iu, [["__scopeId", "data-v-1f6d25e6"]]), uu = /* @__PURE__ */ j({
  __name: "ShellFacts",
  props: {
    items: { default: () => [] },
    min: { default: "200px" }
  },
  setup(e) {
    const t = e, n = f(() => ({ "--dc-facts-min": t.min }));
    return (a, s) => (u(), h("dl", {
      class: "dc-facts",
      style: ae(n.value)
    }, [
      (u(!0), h(z, null, X(e.items, (l, o) => (u(), H(cu, {
        key: `${o}:${l.label}`,
        label: l.label,
        value: l.value,
        title: l.title,
        wide: l.wide
      }, null, 8, ["label", "value", "title", "wide"]))), 128)),
      G(a.$slots, "default", {}, void 0, !0)
    ], 4));
  }
}), ld = /* @__PURE__ */ Q(uu, [["__scopeId", "data-v-17455afa"]]), du = { class: "dc-counts" }, fu = ["data-dc-tone"], vu = {
  key: 0,
  class: "dc-counts__empty"
}, pu = /* @__PURE__ */ j({
  __name: "StatusCounts",
  props: {
    counts: {},
    empty: { default: ke }
  },
  setup(e) {
    const t = e, n = f(() => t.counts.filter((a) => a.count > 0));
    return (a, s) => (u(), h("span", du, [
      (u(!0), h(z, null, X(n.value, (l) => (u(), h("span", {
        key: l.label,
        class: "dc-counts__count",
        "data-dc-tone": l.tone ?? "neutral"
      }, E(l.count) + " " + E(l.label), 9, fu))), 128)),
      n.value.length === 0 ? (u(), h("span", vu, E(e.empty), 1)) : T("", !0)
    ]));
  }
}), od = /* @__PURE__ */ Q(pu, [["__scopeId", "data-v-5553a9e2"]]), hu = ["data-dc-copied", "title", "aria-label"], mu = {
  key: 0,
  class: "dc-copy__mark",
  viewBox: "0 0 16 16",
  "aria-hidden": "true"
}, yu = {
  key: 1,
  class: "dc-copy__mark",
  viewBox: "0 0 16 16",
  "aria-hidden": "true"
}, gu = 1500, _u = /* @__PURE__ */ j({
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
      const i = typeof n.text == "function" ? n.text() : n.text;
      try {
        if (!navigator.clipboard) throw new Error("The clipboard is not available here");
        await navigator.clipboard.writeText(i);
      } catch (r) {
        a("error", r);
        return;
      }
      s.value = !0, clearTimeout(l), l = setTimeout(() => {
        s.value = !1;
      }, gu), a("copied", i);
    }
    return we(() => clearTimeout(l)), (i, r) => (u(), h("button", {
      type: "button",
      class: "dc-copy",
      "data-dc-copied": s.value ? "true" : "false",
      title: s.value ? "Copied" : e.label,
      "aria-label": e.label,
      onClick: o
    }, [
      s.value ? (u(), h("svg", yu, [...r[1] || (r[1] = [
        $("path", { d: "M3 8.5l3.2 3L13 4.5" }, null, -1)
      ])])) : (u(), h("svg", mu, [...r[0] || (r[0] = [
        $("rect", {
          x: "5.5",
          y: "5.5",
          width: "8",
          height: "9",
          rx: "1.5"
        }, null, -1),
        $("path", { d: "M10.5 3.5v-1a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h1" }, null, -1)
      ])]))
    ], 8, hu));
  }
}), wu = /* @__PURE__ */ Q(_u, [["__scopeId", "data-v-f4249d7f"]]), ku = ["data-dc-copy", "data-dc-wrap", "data-dc-tone"], bu = /* @__PURE__ */ j({
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
    return (i, r) => (u(), h("div", {
      class: "dc-code",
      "data-dc-copy": e.copy ? "true" : "false",
      "data-dc-wrap": e.wrap ? "true" : "false",
      "data-dc-tone": e.tone
    }, [
      $("pre", {
        ref_key: "pre",
        ref: s,
        class: "dc-code__text dc-mono",
        style: ae(l.value)
      }, [
        G(i.$slots, "default", {}, () => [
          J(E(e.code), 1)
        ], !0)
      ], 4),
      e.copy ? (u(), H(wu, {
        key: 0,
        class: "dc-code__copy",
        text: o,
        label: e.copyLabel,
        onCopied: r[0] || (r[0] = (c) => a("copied", c)),
        onError: r[1] || (r[1] = (c) => a("error", c))
      }, null, 8, ["label"])) : T("", !0)
    ], 8, ku));
  }
}), rd = /* @__PURE__ */ Q(bu, [["__scopeId", "data-v-67b371dd"]]), $u = 24, xu = /* @__PURE__ */ j({
  __name: "ShellLog",
  props: {
    fetchChunk: {},
    stripAnsi: { type: Boolean },
    maxHeight: { default: "460px" }
  },
  setup(e, { expose: t }) {
    const n = e, a = q(""), s = f(() => n.stripAnsi ? $s(a.value) : a.value), l = q(null);
    let o = 0, i = null;
    function r() {
      return i ??= c().finally(() => {
        i = null;
      }), i;
    }
    async function c() {
      const { chunk: _, offset: m } = await n.fetchChunk(o);
      if (o = m, !_) return;
      const g = l.value, v = !g || g.scrollTop + g.clientHeight >= g.scrollHeight - $u;
      a.value += _, v && (await nt(), l.value && (l.value.scrollTop = l.value.scrollHeight));
    }
    function d() {
      a.value = "", o = 0;
    }
    const p = f(() => n.maxHeight === void 0 ? void 0 : { maxHeight: typeof n.maxHeight == "number" ? `${n.maxHeight}px` : n.maxHeight });
    return t({ poll: r, reset: d }), (_, m) => (u(), h("pre", {
      ref_key: "pane",
      ref: l,
      class: "dc-log dc-mono",
      style: ae(p.value)
    }, E(s.value), 5));
  }
}), id = /* @__PURE__ */ Q(xu, [["__scopeId", "data-v-2c86947e"]]), Su = ["data-dc-theme"], Cu = ["aria-labelledby", "aria-label"], Pu = {
  key: 1,
  class: "dc-dialog__actions"
}, Ze = [], Mu = /* @__PURE__ */ j({
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
    const n = e, a = t, { theme: s, style: l, adopt: o } = xn(n), i = `${It() ?? "dc-dialog"}-title`, r = q(null);
    function c() {
      a("close"), a("update:open", !1);
    }
    const d = Symbol("dc-dialog");
    function p(y) {
      y.key !== "Escape" || y.defaultPrevented || Ze[Ze.length - 1] === d && (y.preventDefault(), c());
    }
    let _ = !1;
    function m(y) {
      _ = y.target === y.currentTarget;
    }
    function g(y) {
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
    let b = null;
    async function C() {
      Ze.push(d), document.addEventListener("keydown", p), b = document.activeElement instanceof HTMLElement ? document.activeElement : null, o(), await nt(), (r.value?.querySelector("[autofocus]") ?? r.value?.querySelector(v) ?? r.value)?.focus();
    }
    function A() {
      const y = Ze.indexOf(d);
      y !== -1 && (Ze.splice(y, 1), document.removeEventListener("keydown", p), b?.isConnected && b.focus(), b = null);
    }
    return Ue(() => {
      n.open && C();
    }), ne(
      () => n.open,
      (y) => {
        y ? C() : A();
      }
    ), we(A), (y, w) => e.open ? (u(), H(At, {
      key: 0,
      to: e.to
    }, [
      $("div", {
        class: "dc-shell dc-layer dc-dialog",
        "data-dc-theme": k(s),
        style: ae(k(l)),
        onPointerdown: m,
        onClick: g
      }, [
        $("div", {
          ref_key: "panel",
          ref: r,
          class: oe(["dc-dialog__panel", e.panelClass]),
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
          }, E(e.title), 1)) : T("", !0),
          $("div", {
            class: oe(["dc-dialog__body", e.bodyClass])
          }, [
            G(y.$slots, "default", {}, void 0, !0)
          ], 2),
          y.$slots.actions ? (u(), h("div", Pu, [
            G(y.$slots, "actions", {}, void 0, !0)
          ])) : T("", !0)
        ], 10, Cu)
      ], 44, Su)
    ], 8, ["to"])) : T("", !0);
  }
}), cd = /* @__PURE__ */ Q(Mu, [["__scopeId", "data-v-0cccf313"]]), Eu = 4500, Lu = 9e3, ft = q([]);
let aa = 0;
function as(e) {
  ft.value = ft.value.filter((t) => t.id !== e);
}
function ss(e, t = "ok") {
  aa += 1;
  const n = aa;
  ft.value = [...ft.value, { id: n, message: e, kind: t }], setTimeout(() => as(n), t === "err" ? Lu : Eu);
}
function Tu(e) {
  ss(e instanceof Error ? e.message : String(e), "err");
}
function Ou() {
  return { toasts: us(ft), toast: ss, toastError: Tu, dismiss: as };
}
const Au = ["data-dc-theme"], Nu = ["data-dc-kind", "role"], Iu = /* @__PURE__ */ j({
  __name: "ShellToasts",
  props: {
    to: { default: "body" },
    theme: { default: void 0 },
    accent: { default: void 0 },
    tokens: { default: void 0 }
  },
  setup(e) {
    const t = e, { toasts: n } = Ou(), { theme: a, style: s, adopt: l } = xn(t);
    return Ue(l), (o, i) => (u(), H(At, { to: e.to }, [
      $("div", {
        class: "dc-shell dc-layer dc-toasts",
        "data-dc-theme": k(a),
        style: ae(k(s)),
        "aria-live": "polite"
      }, [
        (u(!0), h(z, null, X(k(n), (r) => (u(), h("div", {
          key: r.id,
          class: "dc-toast",
          "data-dc-kind": r.kind,
          role: r.kind === "err" ? "alert" : void 0
        }, E(r.message), 9, Nu))), 128))
      ], 12, Au)
    ], 8, ["to"]));
  }
}), ud = /* @__PURE__ */ Q(Iu, [["__scopeId", "data-v-d970211c"]]), Bu = ["aria-label"], Ru = ["data-dc-standing", "data-dc-active", "aria-checked", "title", "aria-label", "onClick"], Hu = /* @__PURE__ */ j({
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
    function o(i, r) {
      i.stopPropagation(), a("set", r);
    }
    return (i, r) => (u(), h("span", {
      class: "dc-standing-control",
      role: "radiogroup",
      "aria-label": `Where the query stands on ${e.name}`
    }, [
      (u(!0), h(z, null, X(s.value, (c) => (u(), h("button", {
        key: c.sign,
        type: "button",
        role: "radio",
        class: "dc-standing-control__choice",
        "data-dc-standing": c.standing ?? "none",
        "data-dc-active": l(c.standing) ? "true" : "false",
        "aria-checked": l(c.standing),
        title: c.hint,
        "aria-label": c.hint,
        onClick: (d) => o(d, c.standing)
      }, E(c.sign), 9, Ru))), 128))
    ], 8, Bu));
  }
}), dd = /* @__PURE__ */ Q(Hu, [["__scopeId", "data-v-5524dca6"]]);
function fd(e, t) {
  const n = q(!1);
  let a = null, s = !1, l = 0;
  const o = () => {
    l++, n.value = !1, a !== null && (clearTimeout(a), a = null);
  };
  function i(d) {
    a = setTimeout(() => void r(d), t);
  }
  async function r(d) {
    if (s || d !== l) return;
    let p;
    try {
      p = await e();
    } catch {
      p = !1;
    }
    s || d !== l || (p ? i(d) : o());
  }
  const c = () => {
    n.value || (n.value = !0, r(++l));
  };
  return Ot(() => {
    s = !0, o();
  }, !0), { start: c, stop: o, polling: n };
}
function vd(e, t = {}) {
  const n = t.key ?? ((l) => JSON.stringify(l)), a = pe();
  let s = null;
  return ds(() => {
    const l = e(), o = n(l);
    o !== s && (s = o, a.value = l);
  }), a;
}
function pd(e = {}) {
  return { key: "ordinal", kind: "ordinal", label: "#", width: "52px", ...e };
}
function hd(e = {}) {
  return { key: "status", role: "state", kind: "status", label: "State", sort: "state", width: "104px", ...e };
}
function md(e = {}) {
  return { key: "tint", role: "tint", ...e };
}
function yd(e = {}) {
  return { key: "picture", role: "image", kind: "image", width: "56px", height: "40px", ...e };
}
function gd(e, t = {}) {
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
function _d(e, t = {}) {
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
function wd(e, t, n = {}) {
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
function kd(e, t, n = {}) {
  return { key: e, kind: "date", label: t, sort: e, mono: !0, muted: !0, ...n };
}
function bd(e = {}) {
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
function $d(e, t, n = {}) {
  return { key: e, label: t, sort: e, truncate: !0, hideBelow: 900, ...n };
}
function xd(e, t, n, a = {}) {
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
function jt(e) {
  return typeof e == "number" ? e : typeof e == "string" && e.trim() !== "" ? Number(e) : Number.NaN;
}
function Sd(e) {
  const t = jt(e);
  return Number.isFinite(t) && t > 0 ? _s(t) : ke;
}
function Cd(e) {
  const t = jt(e);
  return Number.isFinite(t) && t > 0 ? ws(t) : ke;
}
function Pd(e) {
  const t = jt(e);
  return Number.isFinite(t) && t > 0 ? ks(t) : ke;
}
function Md(e) {
  const t = jt(e);
  return Number.isFinite(t) ? bs(t) : ke;
}
function qu(e) {
  if (e <= 0) return 0;
  const t = 10 ** Math.floor(Math.log10(e));
  for (const n of [1, 2, 5])
    if (e <= n * t) return n * t;
  return 10 * t;
}
function Fu(e, t) {
  const n = /* @__PURE__ */ new Set();
  for (const a of e) {
    const s = a.fields[t];
    for (const l of Array.isArray(s) ? s : [s])
      typeof l == "string" && l && n.add(l);
  }
  return [...n].sort((a, s) => a.localeCompare(s));
}
function Du(e, t) {
  let n = 0;
  for (const a of e) {
    const s = a.fields[t];
    typeof s == "number" && s > n && (n = s);
  }
  return n;
}
function Ed(e, t, n, a = {}) {
  return {
    kind: "chips",
    key: t,
    label: n,
    options: Fu(e, t),
    ...a.multiple ? { multiple: !0 } : {}
  };
}
function Ld(e, t, n) {
  return { kind: "range", key: t, label: n, min: 0, max: qu(Du(e, t)) };
}
function Td(e, t, n) {
  return { kind: "toggle", key: e, label: t, text: n };
}
function Od(e) {
  return e.filter((t) => t.kind === "chips" ? t.options.length > 1 : t.kind === "range" ? t.max > 0 : !0);
}
function Ad(e = "", t = "/") {
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
function sa(e) {
  const t = e.indexOf("?");
  if (t === -1) return "";
  const n = e.slice(t), a = n.indexOf("#");
  return ce(a === -1 ? n : n.slice(0, a));
}
function Nd(e) {
  const t = q(sa(e.currentRoute.value.fullPath)), n = f(() => e.currentRoute.value.path), a = ne(
    () => e.currentRoute.value.fullPath,
    (s) => {
      t.value = sa(s);
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
function Id(e, t, n = "/") {
  return (a) => {
    const s = a.params[t], l = Array.isArray(s) ? s.join("/") : s ?? "", o = a.query[Be], i = typeof o == "string" ? o : "", r = `${e}="${l.replace(/"/g, "")}"`;
    return { path: n, query: { ...a.query, [Be]: ze(i, r) } };
  };
}
function Bd(e, t = "/") {
  return (n) => ({ path: t, query: { ...n.query, [Qe]: e } });
}
function Rd(e) {
  const t = /* @__PURE__ */ new Map();
  for (const n of e) {
    const a = t.get(n.entityKey);
    a ? a.push(n) : t.set(n.entityKey, [n]);
  }
  return {
    query(n) {
      return xa(n, (a) => t.get(a.key) ?? [], {
        undatedLast: !0,
        zeroIsAll: !0
      });
    }
  };
}
function Hd(e, t) {
  return e.query({ ...t, limit: Number.MAX_SAFE_INTEGER, offset: 0 }).rows;
}
const Vu = {
  DataShell: Kc,
  ShellHeader: cn,
  RecordActions: bt,
  ResultsArea: ns,
  SegmentedControl: lu,
  StatusPill: je,
  ListView: dn,
  CardsView: ja,
  GridView: Ua,
  ImagesView: Qa,
  TableView: es,
  LinksView: Ga,
  PreviewView: Ya,
  TypeCardsView: ts
}, qd = {
  install(e, t = {}) {
    const n = t.prefix ?? "";
    for (const [a, s] of Object.entries(Vu))
      e.component(`${n}${a}`, s);
    t.route && e.provide(ia, t.route), (t.theme || t.accent || t.tokens) && xl({ theme: t.theme, accent: t.accent, tokens: t.tokens }, e);
  }
};
export {
  Uu as COLUMN_BREAKPOINTS,
  ju as COLUMN_ROLES,
  ja as CardsView,
  na as ColumnCell,
  wu as CopyButton,
  Us as DEFAULT_ENTITY_VIEW,
  sn as DEFAULT_SORT,
  ga as DEFAULT_VIEW,
  Bl as DRAFT_DELAY,
  Kc as DataShell,
  ke as EMPTY_CELL,
  Ca as ENTITY_ALL,
  Ke as ENTITY_TERM,
  dt as EXPRESSION_TERM,
  Ua as GridView,
  qd as HeaderContentLayoutPlugin,
  Qa as ImagesView,
  Ga as LinksView,
  dn as ListView,
  St as MOCK_TINTS,
  pt as MetricDrill,
  mt as OpenMark,
  kn as PARAM_DIR,
  Qe as PARAM_ENTITY,
  Be as PARAM_EXPR,
  Dt as PARAM_PAGE,
  wn as PARAM_SORT,
  Ft as PARAM_VIEW,
  zu as PILL_TONES,
  Kl as POPOVER_FLIP_BELOW,
  Dl as POPOVER_GAP,
  Vl as POPOVER_MARGIN,
  Sn as PinStar,
  Ya as PreviewView,
  ht as QueryMark,
  et as RECORD_STATUSES,
  _n as RESULT_FIELDS,
  ia as ROUTE_ADAPTER_KEY,
  bt as RecordActions,
  Jn as RecordChoosers,
  ns as ResultsArea,
  Ra as SHELL_CONTEXT_KEY,
  Et as SHELL_THEME_KEY,
  yt as ScopeMark,
  lu as SegmentedControl,
  He as SelectTick,
  sd as ShellCard,
  rd as ShellCode,
  cd as ShellDialog,
  cu as ShellFact,
  ld as ShellFacts,
  cn as ShellHeader,
  id as ShellLog,
  Ao as ShellPager,
  Ul as ShellPopover,
  ud as ShellToasts,
  dd as StandingControl,
  od as StatusCounts,
  je as StatusPill,
  Lu as TOAST_ERROR_MS,
  Eu as TOAST_MS,
  es as TableView,
  ts as TypeCardsView,
  Xs as VIEW_ICONS,
  hn as VIEW_KINDS,
  Wn as VIEW_LABELS,
  ze as addTerm,
  yn as andExpression,
  Sd as bytesCell,
  ua as cellFull,
  zi as cellNarrowings,
  Me as cellText,
  kt as cellTextOf,
  ie as cellValue,
  nl as changesResults,
  Ed as chipsFrom,
  Nn as columnAlign,
  In as columnClass,
  An as columnKey,
  Za as columnNarrows,
  vt as columnShortcut,
  ha as columnShortcutOf,
  an as columnTruncates,
  xs as columnsFor,
  fa as compactShortcuts,
  to as completeDraft,
  tl as countPages,
  vs as createHistoryAdapter,
  Ad as createMemoryAdapter,
  Rd as createMemoryDataSource,
  dl as createMockDataSource,
  Nd as createVueRouterAdapter,
  kd as dateColumn,
  Ps as defaultCellText,
  xt as defaultQuery,
  Ie as defaultViewFor,
  ps as detachableAdapter,
  tn as drillExpression,
  Cd as durationCell,
  Pd as elapsedCell,
  Zs as emptyFacetValue,
  hl as entityAddress,
  bd as entityColumn,
  rt as entityCount,
  Bd as entityRedirect,
  Ta as excludingTerm,
  st as expandShortcuts,
  $d as facetColumn,
  ut as facetField,
  Fa as facetValue,
  Bs as fieldHeading,
  La as fieldTerm,
  it as findEntity,
  Pa as findEntityByAddress,
  Pe as findSort,
  xd as flagColumn,
  tt as fnv1a,
  wa as focusEntity,
  _s as formatBytes,
  Ne as formatCount,
  ys as formatDate,
  Qu as formatDateTime,
  Bt as formatDigits,
  ws as formatDuration,
  ks as formatElapsed,
  ue as formatExpression,
  Ve as formatInteger,
  ms as formatMetric,
  gs as formatOrdinal,
  bs as formatPercent,
  Os as formatRange,
  _e as formatTerm,
  ul as generateRows,
  El as hasActiveFacets,
  gd as identityColumn,
  td as idsExpression,
  Xu as isEntityScoped,
  el as isFacetActive,
  gn as isPristineQuery,
  We as isRangeTerm,
  ba as isTypeCardsQuery,
  _a as isViewKind,
  Yu as joinExpression,
  $n as liftTerm,
  Fs as matchesExpression,
  wd as metricColumn,
  nd as narrowPatch,
  Ds as negateTerm,
  qu as niceMax,
  ce as normalizeSearch,
  Wi as numberRange,
  Ks as oppositeTerm,
  pd as ordinalColumn,
  Z as parseExpression,
  gl as parseQuery,
  Md as percentCell,
  yd as pictureColumn,
  Wl as placePopover,
  mr as presentParts,
  za as presentRow,
  ct as pressOptions,
  bl as provideShellContext,
  xl as provideShellTheme,
  Hd as queryAll,
  Ld as rangeFrom,
  Rt as rangeOf,
  js as readDraft,
  ed as readExpression,
  Id as recordRedirect,
  Ea as recordTerm,
  kl as recordsIn,
  _d as referenceColumn,
  ot as refineExpression,
  Ae as resolveView,
  ve as roleColumn,
  ca as roleColumns,
  Cs as rowKey,
  lt as sameTerm,
  Kt as scopeTerm,
  Mt as scopeTermFor,
  Ia as scopedEntity,
  Zu as searchFromQuery,
  Qs as searchesCorpus,
  jn as serializeQuery,
  ml as sortAddress,
  qt as sortsFor,
  Gu as splitExpression,
  Ma as standingTerm,
  hd as stateColumn,
  $s as stripAnsi,
  Ol as summarizeQuery,
  Lt as summaryTerms,
  Oa as termStanding,
  md as tintColumn,
  Ju as tintFor,
  Td as toggleFacet,
  Hi as useColumns,
  Rl as useDraft,
  Wa as useEntityCounts,
  cc as useEntityPreviews,
  xn as useLayerTheme,
  fd as usePoll,
  Re as usePresentedRows,
  Al as useQueryState,
  Fl as useRecordNames,
  Nl as useResults,
  ee as useShellContext,
  vd as useStableSchema,
  Ou as useToasts,
  Od as usefulFacets,
  Gs as viewAcross,
  Ys as viewAfter,
  Da as withFacetValue,
  _l as withStanding,
  wl as withStandings,
  Un as withWhere,
  ad as withoutFacet,
  Na as withoutOwnScope,
  Vs as withoutTerm
};
