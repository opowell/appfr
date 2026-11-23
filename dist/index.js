import { ref as H, computed as f, inject as yn, provide as mn, getCurrentInstance as ia, shallowRef as he, toValue as Te, watch as ne, onScopeDispose as Rt, getCurrentScope as ca, defineComponent as j, onMounted as Ge, onBeforeUnmount as ke, openBlock as d, createBlock as q, Teleport as qt, createElementVNode as b, mergeProps as Oe, unref as w, renderSlot as U, createCommentVNode as L, nextTick as lt, createElementBlock as p, withKeys as Le, useSlots as Ht, useId as Vt, normalizeClass as oe, withCtx as Y, toDisplayString as T, createTextVNode as Z, Fragment as W, renderList as X, withModifiers as xe, withDirectives as Mt, normalizeStyle as ae, vModelText as ua, createVNode as Q, reactive as Ln, resolveDynamicComponent as Ke, toHandlers as da, createSlots as $t, normalizeProps as xt, useModel as On, onBeforeUpdate as cs, guardReactiveProps as us, mergeModels as An, vShow as Nn, Comment as ds, Text as fs, readonly as vs, watchEffect as ps } from "vue";
import { MenuList as hs } from "menu-bar";
const ot = ["list", "cards", "grid", "images", "table", "links", "preview"], at = ["ok", "running", "queued", "review", "failed"], Xu = [...at, "neutral", "accent"], Ju = [
  "identity",
  "reference",
  "metric",
  "state",
  "updated",
  "image",
  "tint"
], Zu = [480, 620, 760, 900, 1100], fa = Symbol("dc.routeAdapter");
function ce(e) {
  if (!e) return "";
  const t = e.replace(/^[?]/, "");
  return t ? `?${t}` : "";
}
function ys() {
  const e = typeof window < "u", t = H(e ? ce(window.location.search) : ""), n = H(e ? window.location.pathname : "/"), a = () => {
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
function st(e) {
  let t = 2166136261;
  for (let n = 0; n < e.length; n++)
    t ^= e.charCodeAt(n), t = Math.imul(t, 16777619);
  return Math.abs(t);
}
const gs = new Intl.NumberFormat("en-US", {
  minimumSignificantDigits: 2,
  maximumSignificantDigits: 2,
  useGrouping: !1
});
function Ft(e) {
  return Number.isFinite(e) ? Math.abs(e) < 100 ? gs.format(e) : String(Math.round(e)) : "—";
}
function _s(e) {
  return Number.isFinite(e) ? Number.isInteger(e) || Math.abs(e) >= 100 ? Ne(e) : Ft(e) : "—";
}
function Ne(e) {
  if (!Number.isFinite(e)) return "—";
  const t = Math.round(e), n = Math.abs(t);
  return n < 1e3 ? String(t) : n < 9950 ? `${(t / 1e3).toFixed(1)}k` : n < 999500 ? `${Math.round(t / 1e3)}k` : n < 995e4 ? `${(t / 1e6).toFixed(1)}m` : `${Math.round(t / 1e6)}m`;
}
function De(e) {
  return Number.isFinite(e) ? Math.round(e).toLocaleString("en-US") : "—";
}
function ws(e) {
  const t = new Date(e);
  if (Number.isNaN(t.getTime())) return "—";
  const n = String(t.getUTCDate()).padStart(2, "0"), a = String(t.getUTCMonth() + 1).padStart(2, "0");
  return `${n}.${a}.${t.getUTCFullYear()}`;
}
function ks(e) {
  return String(e + 1);
}
function ed(e, t) {
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
function bs(e) {
  if (e == null || !Number.isFinite(e) || e < 0) return "—";
  if (e < 1e3) return `${e} B`;
  const t = ["kB", "MB", "GB", "TB"];
  let n = e, a = -1;
  for (; n >= 1e3 && a < t.length - 1; )
    n /= 1e3, a += 1;
  return `${Ft(n)} ${t[a]}`;
}
function $s(e) {
  if (!e || !Number.isFinite(e)) return "—";
  if (e < 1e3) return `${Math.round(e)}ms`;
  const t = e / 1e3;
  return t < 60 ? `${Ft(t)}s` : `${Math.floor(t / 60)}m ${Math.round(t % 60)}s`;
}
function xs(e) {
  if (e == null || !Number.isFinite(e) || e <= 0)
    return "—";
  const t = Math.floor(e / 60);
  return t ? `${t}:${String(e % 60).padStart(2, "0")}` : `${e}s`;
}
function Ss(e) {
  return e == null || !Number.isFinite(e) ? "—" : `${Math.round(e * 100)}%`;
}
function Cs(e) {
  return e.replace(/\x1b\[[0-9;?]*[ -/]*[@-~]/g, "");
}
const be = "—";
function pe(e, t) {
  return e.find((n) => n.role === t);
}
function va(e, t) {
  return e.filter((n) => n.role === t);
}
function Ps(e, t) {
  const n = (t ? t.columns : e?.columns) ?? [], a = t ? "scoped" : "everything";
  return n.filter(
    (s) => s.role !== "tint" && ((s.when ?? "always") === "always" || s.when === a)
  );
}
const Ms = ["id", "entityKey", "entityLabel"];
function ie(e, t) {
  if (e.value) return e.value(t);
  const n = e.field ?? e.key;
  if (n !== void 0) {
    if (t.fields && n in t.fields) return t.fields[n];
    if (Ms.includes(n))
      return t[n];
  }
}
function In(e, t) {
  const n = e.key ?? e.field ?? e.label;
  return n?.trim() ? n.trim() : `column-${t}`;
}
function Es(e, t) {
  return e.id?.trim() ? e.id : `${e.entityKey || "row"}-${t}`;
}
function Ts(e, t) {
  if (e == null || e === "") return be;
  if (t === "number") {
    const n = typeof e == "number" ? e : Number(e);
    return Number.isFinite(n) ? _s(n) : String(e);
  }
  return t === "date" ? ws(String(e)) : Array.isArray(e) ? e.length ? e.join(", ") : be : String(e);
}
function Me(e, t) {
  const n = ie(e, t);
  return e.format ? e.format(n, t) : Ts(n, e.kind);
}
function Ls(e) {
  return typeof e == "number" ? Number.isFinite(e) ? String(e) : "" : typeof e == "string" ? e : Array.isArray(e) ? e.join(", ") : "";
}
function pa(e, t) {
  const n = Me(e, t), a = Ls(ie(e, t));
  return a && a !== n ? a : n;
}
function St(e, t) {
  return e ? Me(e, t) : "";
}
function Bn(e) {
  return e.align ? e.align : e.kind === "number" || e.kind === "ordinal" ? "right" : "left";
}
const Os = {
  ordinal: "dc-table__num",
  number: "dc-table__number",
  date: "dc-table__date",
  status: "dc-table__state"
};
function Rn(e) {
  return [Os[e.kind ?? "text"], e.class].filter(Boolean).join(" ");
}
function rn(e) {
  if (e.truncate !== void 0) return e.truncate;
  const t = e.kind ?? "text";
  return t === "text" || t === "number" || t === "date";
}
const As = /^([A-Za-z_][\w.-]*)\s*(>=|<=|:|=|>|<)\s*(.*)$/, qn = "-?(?:\\d+\\.?\\d*|\\.\\d+)", Ns = new RegExp(`^(${qn})?\\.\\.(${qn})?$`);
function Dt(e) {
  const t = Ns.exec(e.trim());
  if (!t || t[1] === void 0 && t[2] === void 0) return null;
  const n = t[1] === void 0 ? null : Number(t[1]), a = t[2] === void 0 ? null : Number(t[2]);
  return n !== null && a !== null && n > a ? { min: a, max: n } : { min: n, max: a };
}
function Is(e) {
  return `${e.min ?? ""}..${e.max ?? ""}`;
}
function je(e) {
  return e.kind === "field" && (e.comparator === ":" || e.comparator === "=") && Dt(e.value) !== null;
}
function Bs(e) {
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
  for (const s of Bs(t)) {
    const l = s.toUpperCase();
    if (l === "AND" || l === "&&") continue;
    if (l === "OR" || l === "||") {
      a.length && n.push(a), a = [];
      continue;
    }
    const o = s.length > 1 && s.startsWith("-"), r = o ? s.slice(1) : s, i = o ? { negated: !0 } : {}, c = As.exec(r);
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
const Ce = (e) => e.toLowerCase().replace(/\s+/g, ""), ha = [
  ["status", "state"],
  ["state", "state"],
  ["updated", "updated"],
  ["date", "updated"],
  ["name", "identity"],
  ["ref", "reference"]
];
function Rs(e, t, n) {
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
  const r = ha.find(([c]) => c === a)?.[1];
  if (r) {
    const c = pe(s, r);
    if (c) return ie(c, t);
  }
  const i = /^metric(\d+)$/.exec(a);
  if (i) {
    const c = va(s, "metric")[Number(i[1]) - 1];
    if (c) return ie(c, t);
  }
}
function yt(e) {
  return (e.toLowerCase().match(/[\p{L}\p{N}]+/gu) ?? []).map((t) => t.charAt(0)).join("");
}
const Hn = /^[a-z_][\w.-]*$/;
function Kt(e) {
  const t = (e.key ?? e.field)?.toLowerCase();
  if (t !== void 0) return Hn.test(t) ? t : void 0;
  const n = e.label === void 0 ? void 0 : Ce(e.label);
  return n !== void 0 && Hn.test(n) ? n : void 0;
}
function gn(e, t) {
  const n = Ce(e);
  return !!t?.entities.some((a) => a.scope && Ce(a.scope) === n);
}
function qs(e, t, n) {
  const a = Ce(e);
  if (a === "entity" || ha.some(([l]) => l === a) || /^metric\d+$/.test(a) || gn(e, n)) return !0;
  const s = (l) => l !== void 0 && Ce(l) === a;
  return (t.columns ?? []).some(
    (l) => s(l.key) || s(l.field) || s(l.label)
  ) || t.facets.some((l) => s(l.key) || s(l.label));
}
function rt(e, t, n) {
  return t ? ma(e, (a) => {
    const s = ga(a, t, n);
    return s && Kt(s);
  }) : e;
}
function ya(e, t, n) {
  return t ? ma(e, (a) => {
    if (gn(a, n)) return;
    const s = (t.columns ?? []).find((l) => Kt(l) === a);
    return s && _a(s, t, n);
  }) : e;
}
function Hs(e, t, n) {
  if (!t || gn(e, n)) return;
  const a = t.facets.find((s) => s.key.toLowerCase() === e);
  return a ? a.label : (t.columns ?? []).find((s) => Kt(s) === e)?.label;
}
function ma(e, t) {
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
function ga(e, t, n) {
  if (!(!e || qs(e, t, n)))
    return (t.columns ?? []).find(
      (a) => a.label !== void 0 && yt(a.label) === e
    );
}
function _a(e, t, n) {
  if (!t || e.label === void 0 || !Kt(e)) return;
  const a = yt(e.label);
  return ga(a, t, n) === e ? a : void 0;
}
function sn(e, t) {
  const n = e.toLowerCase(), a = t.toLowerCase();
  if (!a.includes("*")) return n.includes(a);
  const s = a.replace(/[.+?^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*");
  return new RegExp(s).test(n);
}
function Vn(e, t) {
  return e.toLowerCase() === t.toLowerCase();
}
function Vs(e, t, n, a) {
  if (e.kind === "text") {
    const i = n.columns ?? [];
    return ["identity", "reference"].some((c) => {
      const u = pe(i, c), g = u ? ie(u, t) : void 0;
      return typeof g == "string" && sn(g, e.value);
    });
  }
  const s = Rs(e.field, t, n);
  if (s === void 0) return a?.has(e.field) ? !1 : null;
  const l = je(e) ? Dt(e.value) : null;
  if (l) {
    if (Array.isArray(s) || typeof s == "boolean") return null;
    const i = typeof s == "number" ? s : Number(s);
    return Number.isFinite(i) ? (l.min === null || i >= l.min) && (l.max === null || i <= l.max) : null;
  }
  if (Array.isArray(s))
    return e.comparator === ":" || e.comparator === "=" ? s.some(
      (c) => e.comparator === "=" ? Vn(String(c), e.value) : sn(String(c), e.value)
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
    return e.comparator === "=" ? Vn(String(s), e.value) : sn(String(s), e.value);
  }
  const o = Number(e.value), r = typeof s == "number" ? s : Number(s);
  return !Number.isFinite(o) || !Number.isFinite(r) ? null : Fs(e.comparator, r, o);
}
function Fn(e, t, n, a) {
  const s = Vs(e, t, n, a);
  return s === null ? !0 : e.negated ? !s : s;
}
function Fs(e, t, n) {
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
function Dn(e) {
  return e.kind === "field" && !e.negated && (e.comparator === ":" || e.comparator === "=") && !je(e);
}
const Kn = /* @__PURE__ */ new WeakMap();
function Ds(e) {
  if (!e?.strictScopes) return null;
  let t = Kn.get(e);
  return t || (t = new Set(
    e.entities.flatMap((n) => n.scope ? [n.scope.toLowerCase()] : [])
  ), Kn.set(e, t)), t;
}
function Ks(e, t, n, a) {
  if (!e.length) return !0;
  const s = Ds(a);
  return e.some((l) => {
    const o = /* @__PURE__ */ new Map();
    for (const r of l)
      Dn(r) && o.set(
        r.field,
        (o.get(r.field) ?? !1) || Fn(r, t, n, s)
      );
    return l.every(
      (r) => Dn(r) ? o.get(r.field) === !0 : Fn(r, t, n, s)
    );
  });
}
function Wn(e) {
  return /[\s"']/.test(e) ? `"${e.replace(/["']/g, "")}"` : e;
}
function we(e) {
  const t = e.negated ? "-" : "";
  return e.kind === "text" ? t + Wn(e.value) : `${t}${e.field}${e.comparator}${Wn(e.value)}`;
}
function Ws(e) {
  if (!e.negated) return { ...e, negated: !0 };
  const { negated: t, ...n } = e;
  return n;
}
function de(e) {
  return e.filter((t) => t.length).map((t) => t.map(we).join(" ")).join(" OR ");
}
function zs(e, t, n) {
  return e.map((a, s) => s === t ? a.filter((l, o) => o !== n) : a).filter((a) => a.length);
}
function td(e) {
  const t = ee(e);
  if (t.length > 1) return { parts: [], text: e.trim() };
  const n = t[0] ?? [];
  return {
    parts: n.filter((a) => a.kind === "field"),
    text: n.filter((a) => a.kind === "text").map(we).join(" ")
  };
}
function nd(e, t) {
  return [...e.map(we), t.trim()].filter(Boolean).join(" ");
}
const zn = (e, t) => e.toLowerCase() === t.toLowerCase();
function it(e, t) {
  return !!e.negated == !!t.negated && wa(e, t);
}
function js(e, t) {
  return !!e.negated != !!t.negated && wa(e, t);
}
function wa(e, t) {
  return e.kind === "field" ? t.kind === "field" && e.field === t.field && e.comparator === t.comparator && zn(e.value, t.value) : t.kind === "text" && zn(e.value, t.value);
}
function Us(e, t) {
  return t.filter((n) => !e.some((a) => it(a, n)));
}
function _n(e, t) {
  return ka(e, t, (n) => n);
}
function ct(e, t) {
  return ka(
    e,
    t,
    (n, a) => n.filter((s) => !a.some((l) => js(s, l)))
  );
}
const Qs = /^[A-Za-z_][\w.-]*\s*(?:>=|<=|:|=|>|<)$/;
function Gs(e) {
  return de(
    ee(e).map(
      (t) => t.filter(
        (n) => n.kind !== "text" || n.value !== "-" && !Qs.test(n.value)
      )
    ).filter((t) => t.length > 0)
  );
}
function ka(e, t, n) {
  const a = ee(e), s = ee(t);
  return a.length ? s.length ? de(
    a.flatMap(
      (l) => s.map((o) => [...n(l, o), ...Us(l, o)])
    )
  ) : de(a) : de(s);
}
const cn = "cards", Ys = "table";
function Xs(e, t = null) {
  if (e.trim() === "") return !1;
  if (!t) return !0;
  const n = new Set(
    t.entities.flatMap((a) => a.scope ? [a.scope.toLowerCase()] : [])
  );
  return !ee(e).flat().some((a) => a.kind === "field" && !a.negated && n.has(a.field.toLowerCase()) && a.value !== "");
}
function Ie(e, t = {}, n = "", a = null) {
  const s = (o) => o && ba(o) ? o : void 0;
  if (e === null) {
    const o = Xs(n, a) ? s(t.searchView) : void 0, r = n.trim() === "" ? s(t.homeView) : void 0;
    return o ?? r ?? s(t.view) ?? cn;
  }
  const l = t.landing === "entity" ? s(t.view) : void 0;
  return s(t.entityView) ?? l ?? Ys;
}
function Js(e, t, n, a = {}, s = "", l = s, o = null) {
  return a.viewAcrossTypes !== "default" && e !== Ie(t, a, s, o) ? e : Ie(n, a, l, o);
}
function Zs(e, t, n = {}, a = null) {
  if (e.entity !== t.entity)
    return Js(e.view, e.entity, t.entity, n, e.expr, t.expr, a);
  const s = Ie(e.entity, n, e.expr, a);
  return e.view === s ? Ie(t.entity, n, t.expr, a) : e.view;
}
const un = "updated";
function ba(e) {
  return typeof e == "string" && (e === "record" || ot.includes(e) || el.test(e));
}
const el = /^[a-z][a-z0-9-]*$/;
function We(e) {
  return e === "record" || ot.includes(e);
}
const jn = {
  list: "List",
  cards: "Cards",
  grid: "Grid",
  images: "Images",
  table: "Table",
  links: "Links",
  preview: "Preview",
  record: "Record"
}, Un = {
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
  if (e === "record" && !t?.includes(e)) return t?.[0] ?? cn;
  const [n] = t ?? [];
  return n === void 0 ? We(e) ? e : cn : t?.includes(e) ? e : n;
}
function ut(e) {
  return typeof e.count == "number" ? Ne(e.count) : e.count;
}
function dt(e, t) {
  return t ? e.entities.find((n) => n.key === t) ?? null : null;
}
function $a(e, t = {}) {
  const n = dt(e, t.entity), a = e.entities[0];
  if (!n && !a) throw new Error(`Schema "${e.key}" declares no entities`);
  return n ?? a;
}
function xa(e, t = null) {
  return e?.columns ?? t?.columns ?? [];
}
function Wt(e, t = null) {
  if (e?.sorts?.length) return e.sorts;
  const n = /* @__PURE__ */ new Set(), a = [];
  for (const s of xa(e, t))
    !s.sort || n.has(s.sort) || (n.add(s.sort), a.push({ key: s.sort, label: (s.label ?? s.sort).toLowerCase() }));
  return a;
}
const tl = { key: un, label: un };
function Pe(e, t, n = null) {
  const a = Wt(e, n);
  return (t ? a.find((l) => l.key === t) : void 0) ?? a.find((l) => l.key === un) ?? a[0] ?? tl;
}
function nl(e) {
  switch (e.kind) {
    case "chips":
      return { kind: "chips", selected: [] };
    case "range":
      return { kind: "range", min: null, max: null };
    case "toggle":
      return { kind: "toggle", on: !1 };
  }
}
function al(e) {
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
function wn(e) {
  return e.entity === null && e.expr.trim() === "";
}
function ad(e) {
  return e.entity !== null;
}
function Sa(e, t) {
  return e.entity === null && Ae(e.view, t) === "cards";
}
function sl(e, t) {
  return t <= 0 ? 1 : Math.max(1, Math.ceil(e / t));
}
function Et(e, t = {}) {
  const a = t.landing === "entity" ? $a(e, t) : null;
  return {
    entity: a?.key ?? null,
    view: Ie(a?.key ?? null, t),
    sort: Pe(a, t.sort).key,
    dir: t.dir === "asc" ? "asc" : "desc",
    expr: "",
    page: 1
  };
}
const kn = ["entity", "sort", "dir", "expr"];
function ll(e) {
  return kn.some((t) => t in e);
}
const Ca = (e) => e.kind === "date" || e.role === "updated";
function ol(e) {
  if (!e) return () => 0;
  const n = (e.kind ?? "text") === "number" || e.role === "metric", a = Ca(e);
  return (s, l) => {
    const o = ie(e, s), r = ie(e, l);
    return n ? Number(r ?? 0) - Number(o ?? 0) : a ? Date.parse(String(r ?? "")) - Date.parse(String(o ?? "")) : String(r ?? "").localeCompare(String(o ?? ""));
  };
}
function Qn(e, t) {
  return !t || !Ca(t) ? !1 : !Number.isFinite(Date.parse(String(ie(t, e) ?? "")));
}
function Pa({ query: e, schema: t, entity: n, limit: a, offset: s }, l, o) {
  const r = ee(e.expr), i = n ? [n] : t.entities;
  let c = 0;
  const u = [];
  for (const S of i)
    for (const C of l(S))
      c += 1, Ks(r, C, S, t) && u.push(C);
  const g = Pe(n, e.sort, t), _ = xa(n, t).find((S) => S.sort === g.key), y = o.undatedLast ? u.filter((S) => !Qn(S, _)) : u, h = o.undatedLast ? u.filter((S) => Qn(S, _)) : [];
  y.sort(ol(_)), e.dir === "asc" && y.reverse();
  const v = h.length ? [...y, ...h] : y;
  return {
    // One page out of the middle. `total` stays the whole match, which is what
    // the shell counts pages with.
    rows: o.zeroIsAll && a <= 0 ? v.slice(s) : v.slice(s, s + a),
    total: u.length,
    unfiltered: u.length === c
  };
}
const Tt = [
  "oklch(0.36 0.06 240)",
  "oklch(0.34 0.07 290)",
  "oklch(0.36 0.06 160)",
  "oklch(0.38 0.06 80)",
  "oklch(0.35 0.07 30)",
  "oklch(0.34 0.05 200)"
];
function sd(e) {
  return Tt[st(e) % Tt.length];
}
function Ma(e, t) {
  return `${e}_${1e4 + t * 7}`;
}
const rl = 7, il = 3;
function cl(e, t, n, a) {
  const s = (t * rl + st(n)) % a, l = [];
  for (let o = 0; o < Math.min(il, a); o++)
    l.push(Ma(e, (s + o) % a));
  return l;
}
function ul(e, t) {
  switch (e.kind) {
    case "chips":
      return e.multiple ? dl(e.options, t) : e.options[t % e.options.length] ?? "";
    case "range": {
      const n = Math.max(0, e.max - e.min);
      return e.min + (n === 0 ? 0 : t % (n + 1));
    }
    case "toggle":
      return t % 3 === 0;
  }
}
function dl(e, t) {
  if (!e.length) return [];
  const n = 1 + (t >> 5) % Math.min(3, e.length), a = t % e.length, s = /* @__PURE__ */ new Set();
  for (let l = 0; l < n; l++) s.add((a + l) % e.length);
  return [...s].sort((l, o) => l - o).map((l) => e[l]);
}
function fl(e, t) {
  const { hash: n, sample: a, revision: s, updatedAt: l } = t, o = s ? ` · rev ${s + 1}` : "";
  switch (e.role) {
    case "identity":
      return `${a[0]}${o}`;
    case "reference":
      return s ? `${a[1]}-${s + 1}` : a[1];
    case "state":
      return at[n % at.length];
    case "updated":
      return l;
    case "tint":
      return Tt[n % Tt.length];
    case "metric":
      return 1 + n % 940;
  }
  switch (e.kind) {
    case "number":
      return 1 + n % 940;
    case "status":
      return at[n % at.length];
    case "date":
      return l;
    default:
      return;
  }
}
function vl(e, t = {}) {
  const n = t.population ?? 48, a = t.seed ?? "", s = t.now ?? /* @__PURE__ */ new Date("2026-08-25T00:00:00Z"), l = e.samples, o = t.scopes ?? [];
  if (!l.length) return [];
  const r = [];
  for (let i = 0; i < n; i++) {
    const c = l[i % l.length], u = Math.floor(i / l.length), g = st(`${a}:${e.key}:${c[0]}:${i}`), _ = Ma(e.key, i), y = new Date(s.getTime() - g % 900 * 36e5).toISOString(), h = {};
    for (const v of e.columns ?? []) {
      const S = v.field ?? v.key;
      if (!S || v.value) continue;
      const C = fl(v, {
        hash: st(`${g}:${S}`),
        sample: c,
        revision: u,
        updatedAt: y
      });
      C !== void 0 && (h[S] = C);
    }
    for (const v of e.facets)
      h[v.key] = ul(v, st(`${g}:${v.key}`));
    for (const [v, S] of o)
      h[v] = S === e.key ? _ : cl(S, i, v, n);
    r.push({ id: _, entityKey: e.key, entityLabel: e.label, fields: h });
  }
  return r;
}
function pl(e = {}) {
  const t = /* @__PURE__ */ new Map(), n = (a, s) => {
    const l = t.get(a.key);
    if (l) return l;
    const o = e.scopes ?? s.entities.flatMap(
      (i) => i.scope ? [[i.scope, i.key]] : []
    ), r = vl(a, { ...e, scopes: o });
    return t.set(a.key, r), r;
  };
  return {
    query(a) {
      return Pa(a, (s) => n(s, a.schema), {
        undatedLast: !1,
        zeroIsAll: !1
      });
    }
  };
}
const Ye = "e", zt = "v", bn = "s", $n = "d", Be = "q", jt = "p", Ea = "*", hl = [
  Ye,
  zt,
  bn,
  $n,
  Be,
  jt
], yl = [
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
function Lt(e) {
  let t = encodeURIComponent(e);
  for (const [n, a] of yl) t = t.replace(n, a);
  return t;
}
function _e(e) {
  try {
    return decodeURIComponent(e.replace(/\+/g, " "));
  } catch {
    return e.replace(/\+/g, " ");
  }
}
function xn(e) {
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
  return hl.includes(e);
}
function Ut(e, t) {
  if (!(!t || e.some((n) => n.key === t)))
    return e.find((n) => yt(n.label) === t);
}
function gl(e, t) {
  const n = yt(e.label);
  return Ut(t.entities, n)?.key === e.key ? n : e.key;
}
function Ta(e, t) {
  return t ? dt(e, t) ?? Ut(e.entities, t) ?? null : null;
}
function _l(e, t) {
  const n = yt(e.label);
  return Ut(t, n)?.key === e.key ? n : e.key;
}
function wl(e, t) {
  return t.some((n) => n.key === e) ? e : Ut(t, e)?.key ?? e;
}
function kl(e, t, n = {}) {
  const a = Et(t, n), s = new Map(xn(e)), l = s.get(Ye), o = l === void 0 ? a.entity : _e(l), r = o === Ea ? null : Ta(t, o), i = s.get(Be), c = i === void 0 ? "" : rt(_e(i), r, t), u = s.get(zt), g = u && ba(_e(u)) ? _e(u) : Ie(r?.key ?? null, n, c, t), _ = s.get(bn), y = Pe(
    r,
    _ ? wl(_e(_), Wt(r, t)) : n.sort,
    t
  ), h = s.get($n), v = h ? _e(h) === "asc" ? "asc" : "desc" : a.dir, S = s.get(jt), C = S === void 0 ? 1 : Number(_e(S)), A = Number.isFinite(C) ? Math.max(1, Math.floor(C)) : 1;
  return {
    entity: r?.key ?? null,
    view: g,
    sort: y.key,
    dir: v,
    expr: c,
    page: A
  };
}
function Gn(e, t, n = {}, a = "") {
  const s = Et(t, n), l = dt(t, e.entity), o = xn(a).filter(([g]) => !ml(g)), r = [], i = (g, _) => r.push([g, Lt(_)]), c = l?.key ?? null;
  if (c !== s.entity && i(Ye, l ? gl(l, t) : Ea), e.view !== Ie(c, n, e.expr, t) && i(zt, e.view), e.sort !== s.sort) {
    const g = Wt(l, t), _ = g.find((y) => y.key === e.sort);
    i(bn, _ ? _l(_, g) : e.sort);
  }
  e.dir !== s.dir && i($n, e.dir), e.expr.trim() !== "" && i(Be, ya(e.expr, l, t)), e.page > 1 && i(jt, String(e.page));
  const u = [
    ...o.map(([g, _]) => [Lt(g), _]),
    ...r
  ];
  return u.length ? `?${u.map(([g, _]) => _ === "" ? g : `${g}=${_}`).join("&")}` : "";
}
function ld(e) {
  const t = [];
  for (const [n, a] of Object.entries(e))
    for (const s of Array.isArray(a) ? a : [a]) {
      if (typeof s != "string") continue;
      const l = Lt(n);
      t.push(s === "" ? l : `${l}=${Lt(s)}`);
    }
  return t.length ? `?${t.join("&")}` : "";
}
function od(e, t) {
  const n = new Map(xn(e)), a = n.get(Be), s = a === void 0 ? "" : _e(a);
  if (!t) return s;
  const l = n.get(Ye);
  return rt(
    s,
    l === void 0 ? null : Ta(t, _e(l)),
    t
  );
}
function Qt(e, t) {
  return Oa(e, t.id);
}
function La(e, t) {
  return e?.standing === !1 ? null : Qt(e, t);
}
function Oa(e, t) {
  const n = e?.scope;
  return n ? Aa(n, t) : null;
}
function Aa(e, t) {
  return `${e}="${t.replace(/"/g, "")}"`;
}
function rd(e, t) {
  const n = typeof e == "string" ? e : e?.scope;
  if (!n) return null;
  const a = t.filter((s) => s.replace(/"/g, "") !== "").map((s) => Aa(n, s));
  return a.length ? a.join(" ") : null;
}
function Gt(e, t) {
  if (e.kind !== "field" || t.kind !== "field") return it(e, t);
  const n = (a) => a.comparator === ":" || a.comparator === "=";
  return it(e, { ...t, comparator: n(e) && n(t) ? e.comparator : t.comparator });
}
function Ot(e, t) {
  return Gt(e, Ws(t));
}
function At(e, t) {
  return Qt(
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
  return s.some((r) => r.some((i) => Gt(i, a))) ? n : s.some((r) => r.some((i) => Ot(i, a))) ? de(
    s.map(
      (r) => r.map((i) => Ot(i, a) ? a : i)
    )
  ) : `${n} ${t}`;
}
function Na(e) {
  if (!e) return null;
  const t = e.trim();
  return t ? t.startsWith("-") ? t.slice(1) : `-${t}` : null;
}
function Ia(e, t) {
  if (!t || !e.trim()) return null;
  const [n] = ee(t).flat();
  if (!n) return null;
  const a = ee(e).flat();
  return a.some((s) => Gt(s, n)) ? n.negated ? "out" : "in" : a.some((s) => Ot(s, n)) ? n.negated ? "in" : "out" : null;
}
function Sn(e, t) {
  if (!t || !e.trim()) return e;
  const [n] = ee(t).flat();
  if (!n) return e;
  const a = ee(e), s = a.map(
    (l) => l.filter((o) => !Gt(o, n) && !Ot(o, n))
  );
  return s.every((l, o) => l.length === a[o]?.length) ? e : de(s);
}
function bl(e, t, n) {
  return t ? n === null ? Sn(e, t) : Ue(e, n === "out" ? Na(t) : t) : e;
}
function $l(e, t, n) {
  const a = t.filter(Boolean), s = () => a.reduce((i, c) => bl(i, c, n), e);
  if (n !== "in") return s();
  const l = /* @__PURE__ */ new Map();
  for (const i of a) {
    const [c] = ee(i).flat();
    if (!c) continue;
    const u = c.kind === "field" ? c.field : "";
    l.set(u, [...l.get(u) ?? [], c]);
  }
  if (l.size <= 1) return s();
  const o = a.reduce((i, c) => Sn(i, c), e), r = o.trim() ? ee(o) : [[]];
  return de(r.flatMap((i) => [...l.values()].map((c) => [...i, ...c])));
}
function dn(e, t) {
  const n = t.shiftKey ? `noopener,popup,width=${window.outerWidth},height=${window.outerHeight}` : "noopener";
  window.open(e, "_blank", n);
}
function Ba() {
  const e = window.getSelection?.();
  return !!e && !e.isCollapsed;
}
function fn(e) {
  return e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0;
}
function ft(e) {
  return e.altKey ? { exclude: !0 } : {};
}
function ln(e, t, n, a = {}, s) {
  const l = At(e, n);
  if (a.exclude) return Yn(Ue(t.expr, Na(l)), s);
  const o = l !== null && e.entities.find((r) => r.key === n.entityKey)?.narrowsAlone === !0;
  return Yn(Ue(o ? "" : t.expr, l), s);
}
function Yn(e, t) {
  const n = t?.trim() ? ee(t).flat() : [];
  if (!n.length) return e;
  const a = new Set(n.flatMap((r) => r.kind === "field" ? [r.field] : [])), s = (r) => r.kind === "field" && !r.negated && (r.comparator === ":" || r.comparator === "=") && a.has(r.field), l = e.trim(), o = l ? ee(l) : [[]];
  if (o.length === 1 && !o[0].some(s)) {
    const r = n.filter((i) => !o[0].some((c) => it(c, i)));
    return [l, ...r.map(we)].filter(Boolean).join(" ");
  }
  return de(
    o.map((r) => {
      const i = r.filter((c) => !s(c));
      return [...i, ...n.filter((c) => !i.some((u) => it(u, c)))];
    })
  );
}
function Ra(e, t) {
  const n = e?.scope?.toLowerCase();
  if (!n || e?.keepsScope || !t.trim()) return t;
  const a = ee(t), s = a.map(
    (l) => l.filter((o) => o.kind !== "field" || o.field !== n)
  );
  return s.every((l, o) => l.length === a[o]?.length) ? t : de(s);
}
function qa(e, t) {
  const n = t.toLowerCase();
  return e.entities.find((a) => a.scope?.toLowerCase() === n) ?? null;
}
function Ha(e, t, n) {
  if (!t || !n) return null;
  const a = qa(e, t);
  return a ? { entity: a, id: n } : null;
}
function xl(e, t) {
  const n = [], a = /* @__PURE__ */ new Set();
  for (const s of t)
    for (const l of ee(s).flat()) {
      if (l.kind !== "field" || l.negated) continue;
      const o = Ha(e, l.field, l.value);
      if (!o) continue;
      const r = `${o.entity.key}:${o.id.toLowerCase()}`;
      a.has(r) || (a.add(r), n.push({ entityKey: o.entity.key, id: o.id }));
    }
  return n;
}
function id(e, t, n = "cards") {
  return {
    // An expression with nothing in it is no parameter, as the shell writes it.
    [Be]: Ue(e, t) || void 0,
    [Ye]: void 0,
    [zt]: n,
    [jt]: void 0
  };
}
const Va = Symbol("dc.shellContext");
function Sl(e) {
  const t = e.liveQuery ? e : Cl(e);
  return mn(Va, t), t;
}
function Cl(e) {
  const t = e.draft ?? H("");
  return {
    draft: t,
    liveQuery: e.query,
    drafting: f(() => !1),
    commitDraft() {
      const n = t.value.trim();
      n && (e.setExpression(
        ct(e.query.value.expr, rt(n, e.entity.value, e.schema.value))
      ), t.value = "");
    },
    abandonDraft() {
      t.value = "";
    },
    ...e
  };
}
function te() {
  const e = yn(Va, null);
  if (!e)
    throw new Error(
      "[appfr] No shell context found. Render this component inside <DataShell>."
    );
  return e;
}
const Nt = Symbol("dc-shell-theme");
function vn(e) {
  return {
    read: () => ({
      theme: Te(e.theme),
      accent: Te(e.accent),
      tokens: Te(e.tokens)
    })
  };
}
function Pl(e, t) {
  t ? t.provide(Nt, vn(e)) : mn(Nt, vn(e));
}
function Ml(e) {
  const t = ia();
  mn(Nt, {
    ...vn(e),
    element: () => t?.proxy?.$el ?? null
  });
}
function Cn(e) {
  const t = ia(), n = yn(Nt, null), a = he(null);
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
function vt(e) {
  return e.key.toLowerCase();
}
const El = /* @__PURE__ */ new Set([">", ">=", "<", "<="]);
function Fa(e, t) {
  if (e.kind !== "field" || e.negated || e.field !== vt(t)) return !1;
  const n = e.comparator === ":" || e.comparator === "=";
  switch (t.kind) {
    case "range":
      return je(e) || El.has(e.comparator);
    case "chips":
      return n && !je(e) && Da(t.options, e.value) !== void 0;
    case "toggle":
      return n && Tl(e.value);
  }
}
function Da(e, t) {
  const n = t.toLowerCase();
  return e.find((a) => a.toLowerCase() === n);
}
function Tl(e) {
  const t = e.toLowerCase();
  return t === "true" || t === "yes";
}
function Ka(e, t) {
  const n = (ee(e)[0] ?? []).filter((a) => Fa(a, t));
  switch (t.kind) {
    case "range": {
      let a = null, s = null;
      for (const l of n) {
        const o = Dt(l.value), r = Number(l.value);
        o ? (o.min !== null && (a = o.min), o.max !== null && (s = o.max)) : Number.isFinite(r) && (l.comparator.startsWith(">") ? a = r : s = r);
      }
      return { kind: "range", min: a, max: s };
    }
    case "chips": {
      const a = new Set(n.map((s) => Da(t.options, s.value)));
      return { kind: "chips", selected: t.options.filter((s) => a.has(s)) };
    }
    case "toggle":
      return { kind: "toggle", on: n.length > 0 };
  }
}
function Ll(e, t) {
  const n = vt(e);
  switch (t.kind) {
    case "range":
      return t.min === null && t.max === null ? [] : [{ kind: "field", field: n, comparator: ":", value: Is(t) }];
    case "chips":
      return t.selected.map((a) => ({ kind: "field", field: n, comparator: "=", value: a }));
    case "toggle":
      return t.on ? [{ kind: "field", field: n, comparator: ":", value: "true" }] : [];
  }
}
function Wa(e, t, n) {
  const a = Ll(t, n), s = ee(e), l = (s.length ? s : [[]]).map((o) => [
    ...o.filter((r) => !Fa(r, t)),
    ...a
  ]);
  return de(l);
}
function cd(e, t) {
  return Wa(e, t, nl(t));
}
function Ol(e, t) {
  return (t?.facets ?? []).some((n) => al(Ka(e, n)));
}
const ze = "entity", pt = "expr", Al = { ">=": "≥", "<=": "≤", ">": ">", "<": "<" };
function tt(e) {
  const t = Number(e);
  return Number.isFinite(t) && !Number.isInteger(t) ? Ft(t) : String(e);
}
function Nl(e, t, n) {
  if (e.kind !== "field") return we(e);
  const a = Hs(e.field, t, n);
  if (a === void 0) return we(e);
  const s = e.negated ? "-" : "", l = je(e) ? Dt(e.value) : null;
  if (l) {
    const r = l.min !== null && l.max !== null ? `${tt(l.min)} ≤ ${a} ≤ ${tt(l.max)}` : l.max !== null ? `${a} ≤ ${tt(l.max)}` : `${a} ≥ ${tt(l.min)}`;
    return s + r;
  }
  const o = Al[e.comparator];
  return o ? `${s}${a} ${o} ${tt(e.value)}` : we({ ...e, field: a });
}
function It(e, t, n = null) {
  const a = [];
  return t && a.push({
    id: ze,
    label: `entity:${t.key}`,
    facetKey: ze
  }), ee(e.expr).forEach((s, l) => {
    s.forEach((o, r) => {
      a.push({
        id: `${pt}:${l}:${r}`,
        label: Nl(o, t, n),
        address: ya(we(o), t, n),
        facetKey: pt,
        group: l,
        index: r,
        ...o.kind === "field" ? { field: o.field, value: o.value } : {},
        ...o.negated ? { negated: !0 } : {}
      });
    });
  }), a;
}
function Il(e, t, n = null) {
  if (wn(e)) {
    const l = Pe(t, e.sort, n);
    return `everything · ${e.view} · ${l.label}`;
  }
  const a = It(e, t).filter((l) => l.facetKey !== pt).map((l) => l.label), s = e.expr.trim();
  return s && a.push(`"${s}"`), a.join(" · ");
}
function Bl(e) {
  const { adapter: t } = e, n = f(() => Te(e.schema)), a = f(() => Te(e.defaults) ?? {}), s = f(() => kl(t.search.value, n.value, a.value)), l = f(() => dt(n.value, s.value.entity)), o = f(() => l.value ?? $a(n.value, a.value)), r = f(() => Wt(l.value, n.value)), i = f(() => Pe(l.value, s.value.sort, n.value)), c = (m, k) => {
    const M = Gn(m, n.value, a.value, t.search.value);
    return M === t.search.value && !t.elsewhere?.value ? !1 : (k === "push" ? t.push(M) : t.replace(M), !0);
  }, u = () => Te(e.navigationMode) ?? "push", g = () => Te(e.facetNavigationMode) ?? "replace", _ = (m, k) => c(y(m), k), y = (m) => {
    const k = m.page ?? (ll(m) ? 1 : s.value.page), M = { ...s.value, ...m, page: k };
    return m.view === void 0 && (M.view = Zs(s.value, M, a.value, n.value)), M;
  }, h = (m) => v(y(m)), v = (m) => {
    const k = Gn(m, n.value, a.value, t.search.value);
    return t.href ? t.href(k) : `${t.path.value}${k}`;
  }, S = (m, k) => {
    const M = l.value?.facets.find((I) => I.key === m);
    if (!M) return;
    const E = Wa(s.value.expr, M, k(Ka(s.value.expr, M)));
    _({ expr: E }, g());
  }, C = (m) => {
    const k = m === null ? null : dt(n.value, m);
    return (k?.key ?? null) === s.value.entity ? {} : {
      entity: k?.key ?? null,
      sort: Pe(k, s.value.sort, n.value).key
    };
  }, A = (m) => {
    const k = C(m);
    Object.keys(k).length && _(k, u());
  };
  return {
    query: s,
    entity: l,
    focus: o,
    sort: i,
    sorts: r,
    summary: f(() => Il(s.value, l.value, n.value)),
    terms: f(() => It(s.value, l.value, n.value)),
    isPristine: f(() => wn(s.value)),
    isEverything: f(() => s.value.entity === null),
    hasFacets: f(() => Ol(s.value.expr, l.value)),
    setEntity: A,
    entityHref: (m) => h(C(m)),
    clearEntity: () => A(null),
    setView(m, k) {
      _(k === void 0 ? { view: m } : { view: m, page: Math.max(1, Math.floor(k)) }, u());
    },
    setSort(m) {
      _({ sort: Pe(l.value, m, n.value).key }, u());
    },
    toggleDirection() {
      _({ dir: s.value.dir === "desc" ? "asc" : "desc" }, u());
    },
    setExpression(m) {
      return _({ expr: m }, u());
    },
    narrow(m, k, M) {
      return _({ expr: m, ...C(k), ...M ? { view: M } : {} }, u());
    },
    narrowHref(m, k, M) {
      return h({ expr: m, ...C(k), ...M ? { view: M } : {} });
    },
    setPage(m, k) {
      _({ page: Math.max(1, Math.floor(m)) }, k ?? u());
    },
    setFacet(m, k) {
      S(m, () => k);
    },
    toggleChip(m, k) {
      S(m, (M) => M.kind !== "chips" ? M : { kind: "chips", selected: M.selected.includes(k) ? M.selected.filter((I) => I !== k) : [...M.selected, k] });
    },
    setRange(m, k, M) {
      S(m, (E) => E.kind === "range" ? { kind: "range", min: k, max: M } : E);
    },
    toggleFlag(m) {
      S(
        m,
        (k) => k.kind === "toggle" ? { kind: "toggle", on: !k.on } : k
      );
    },
    removeTerm(m) {
      if (m.facetKey === ze) {
        A(null);
        return;
      }
      if (m.facetKey === pt) {
        const k = zs(ee(s.value.expr), m.group ?? 0, m.index ?? 0);
        _({ expr: de(k) }, u());
      }
    },
    clearFilters() {
      _({ ...C(null), expr: "" }, u());
    },
    clearHref: () => h({ ...C(null), expr: "" }),
    reset() {
      c(Et(n.value, a.value), u());
    },
    homeHref: () => v(Et(n.value, a.value)),
    // The same rule the mutations follow, so a link built for a change goes
    // exactly where clicking through to that change would have gone.
    hrefFor: (m) => h(m)
  };
}
const Xn = 50;
function Rl(e) {
  const t = he([]), n = H(0), a = H(0), s = H(!1), l = H(!1), o = he(null);
  let r = 0, i = null, c = null;
  const u = f(() => (e.query.value.page - 1) * e.limit.value), g = f(() => sl(n.value, e.limit.value)), _ = f(() => Math.max(0, n.value - a.value)), y = () => {
    const x = e.query.value, B = e.within?.value.trim(), O = Ra(e.entity.value, x.expr);
    return B ? { ...x, expr: _n(B, O) } : O === x.expr ? x : { ...x, expr: O };
  }, h = (x, B) => {
    t.value = x.rows, n.value = x.total, a.value = x.kept ?? 0, o.value = null, v(B);
  }, v = (x) => {
    i = { key: x, total: n.value }, l.value = !1;
  }, S = (x) => {
    o.value = x, t.value = [], n.value = 0, a.value = 0, i = null, l.value = !1;
  }, C = (x, B, O, K) => {
    let V = !0;
    const J = () => x === r;
    let re = 0, ye = !1;
    const me = (le) => {
      re = le, ye = !0, K === void 0 && (n.value = le);
    }, He = () => {
      V && (V = !1, t.value = [], a.value = 0, me(0)), o.value = null;
    };
    return {
      get open() {
        return J();
      },
      insert(le, Xe) {
        if (!J()) return;
        const ge = Array.isArray(le) ? le : [le];
        if (!ge.length) return;
        He();
        const fe = [...t.value];
        fe.splice(Xe ?? fe.length, 0, ...ge), t.value = B > 0 ? fe.slice(0, B) : fe, me(re + ge.length);
      },
      set(le) {
        J() && (le.rows && (He(), t.value = B > 0 ? le.rows.slice(0, B) : le.rows, me(le.rows.length)), le.total !== void 0 && me(le.total));
      },
      close() {
        J() && (s.value = !1, ye && (n.value = re), v(O));
      },
      fail(le) {
        J() && (S(le), s.value = !1);
      }
    };
  }, A = () => {
    const x = c;
    c = null, x?.();
  }, m = () => {
    const x = ++r;
    A();
    const B = k.value, O = i?.key === B ? i.total : void 0;
    l.value = O === void 0;
    const K = {
      query: y(),
      schema: e.schema.value,
      entity: e.entity.value,
      limit: e.limit.value,
      offset: u.value
    }, V = e.source.value;
    if (V.stream) {
      s.value = !0;
      try {
        c = V.stream(K, C(x, K.limit, B, O)) ?? null;
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
      x === r && h(re, B);
    }).catch((re) => {
      x === r && S(re);
    }).finally(() => {
      x === r && (s.value = !1);
    });
  }, k = f(() => {
    const x = y();
    return `${e.entity.value?.key ?? e.schema.value.entities[0]?.key ?? ""}|${JSON.stringify(kn.map((O) => x[O]))}`;
  }), M = f(() => `${k.value}|${e.query.value.page}`);
  return ne([e.source, M, e.limit], m, {
    immediate: !0
  }), Rt(() => {
    r++, A();
  }, !0), { rows: t, total: n, matched: _, offset: u, pageCount: g, pending: s, counting: l, error: o, refresh: m, locate: async (x, B) => {
    const O = Math.max(0, B - 1 - Xn);
    try {
      const { rows: K } = await e.source.value.query({
        query: y(),
        schema: e.schema.value,
        entity: e.entity.value,
        limit: Xn * 2 + 1,
        offset: O
      }), V = K.findIndex((J) => J.id === x);
      return V === -1 ? null : O + V + 1;
    } catch {
      return null;
    }
  }, peek: async (x, B) => {
    if (B <= 0) return [];
    try {
      const { rows: O } = await e.source.value.query({
        query: y(),
        schema: e.schema.value,
        entity: e.entity.value,
        limit: B,
        offset: Math.max(0, x)
      });
      return O;
    } catch {
      return [];
    }
  } };
}
function ql(e) {
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
function Vl(e) {
  const t = e.delay ?? Hl, n = H(""), a = H("");
  let s = !1, l;
  const o = () => {
    clearTimeout(l), l = void 0;
  }, r = f(() => rt(Gs(a.value), e.entity.value, e.schema?.value)), i = f(() => r.value.trim() !== ""), c = f(
    () => JSON.stringify([r.value, ...kn.map((y) => e.query.value[y])])
  ), u = he(null), g = f(() => {
    const y = e.query.value;
    if (!i.value) return y;
    const h = u.value?.of === c.value ? u.value.page : 1;
    return { ...y, expr: ct(y.expr, r.value), page: h };
  });
  ne(n, (y) => {
    if (o(), !y.trim()) {
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
  const _ = (y) => {
    o(), s = !0, n.value = "", !y() && s && (s = !1, a.value = "");
  };
  return ca() && Rt(o), {
    text: n,
    live: g,
    drafting: i,
    setPage(y) {
      u.value = { of: c.value, page: Math.max(1, Math.floor(y)) };
    },
    commit() {
      const y = n.value.trim();
      if (!y) return;
      const h = ct(
        e.query.value.expr,
        rt(y, e.entity.value, e.schema?.value)
      );
      a.value = y, _(() => e.setExpression(h));
    },
    abandon() {
      o(), s = !1, n.value = "", a.value = "";
    },
    release: _
  };
}
const Fl = 25, za = (e, t) => e.toLowerCase() === t.toLowerCase();
function Dl(e, t) {
  return e.find((n) => za(n.id, t));
}
function Kl(e) {
  const t = he(/* @__PURE__ */ new Map()), n = /* @__PURE__ */ new Set(), a = (r) => {
    if (r.facetKey !== pt) return null;
    const i = Ha(e.schema.value, r.field, r.value);
    return i ? { ...i, key: `${i.entity.key}:${i.id}` } : null;
  }, s = (r) => {
    const { entity: i, id: c } = r, u = e.query.value;
    return e.source.value.query({
      query: {
        ...u,
        entity: i.key,
        // The reference on its own. The rest of the query is about the rows on
        // screen, which are of another type entirely.
        expr: Oa(i, c) ?? "",
        sort: Pe(i, u.sort, e.schema.value).key,
        page: 1
      },
      schema: e.schema.value,
      entity: i,
      limit: Fl,
      offset: 0
    });
  }, l = (r, i) => {
    const c = St(pe(r.columns ?? [], "identity"), i);
    return c === be || za(c, i.id) ? "" : c;
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
      u.forEach((_, y) => {
        const { reference: h } = i[y], v = Dl(_.rows, h.id);
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
const Wl = 4, zl = 8, jl = 180;
function Ul(e, t, n, a = {}) {
  const s = a.gap ?? Wl, l = a.margin ?? zl, o = a.flipBelow ?? jl, r = a.side ?? "below", i = {
    below: n.height - e.bottom - s - l,
    above: e.top - s - l
  }, c = r === "below" ? "above" : "below", u = i[r] < o && i[c] > i[r] ? c : r, g = Math.min(a.maxHeight ?? 1 / 0, Math.max(0, i[u])), _ = Math.max(0, n.width - l * 2), y = Math.min(a.minWidth ?? e.width, _), h = Math.min(Math.max(t, y), _), v = a.align === "end" ? e.right - h : e.left, S = Math.max(l, Math.min(v, n.width - h - l));
  return u === "below" ? { side: u, left: S, top: e.bottom + s, maxHeight: g, minWidth: y, maxWidth: _ } : { side: u, left: S, bottom: n.height - e.top + s, maxHeight: g, minWidth: y, maxWidth: _ };
}
const Ql = ["data-dc-theme", "data-dc-side"], Se = [], Gl = /* @__PURE__ */ j({
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
    const n = e, a = t, { theme: s, style: l, adopt: o } = Cn(n), r = H(null), i = H(null), c = { root: () => r.value };
    function u() {
      const m = n.anchor;
      m && (i.value = Ul(
        m.getBoundingClientRect(),
        r.value?.offsetWidth ?? 0,
        { width: window.innerWidth, height: window.innerHeight },
        { side: n.side, align: n.align, maxHeight: n.maxHeight, minWidth: n.minWidth }
      ));
    }
    const g = f(() => {
      const m = i.value, k = m ? {
        position: "fixed",
        left: `${m.left}px`,
        ...m.top !== void 0 ? { top: `${m.top}px` } : {},
        ...m.bottom !== void 0 ? { bottom: `${m.bottom}px` } : {},
        minWidth: `${m.minWidth}px`,
        maxWidth: `${m.maxWidth}px`,
        maxHeight: `${m.maxHeight}px`,
        overflowY: "auto"
      } : { position: "fixed", visibility: "hidden" };
      return { ...l.value, ...k };
    });
    function _() {
      a("update:open", !1), a("close");
    }
    function y(m) {
      return r.value?.contains(m) || n.anchor?.contains(m) ? !0 : Se.slice(Se.indexOf(c) + 1).some((M) => M.root()?.contains(m));
    }
    function h(m) {
      const k = m.target;
      k && !y(k) && _();
    }
    function v(m) {
      m.key !== "Escape" || m.defaultPrevented || Se[Se.length - 1] === c && (m.preventDefault(), r.value?.contains(document.activeElement) && n.anchor?.focus(), _());
    }
    let S = null;
    async function C() {
      Se.includes(c) || (Se.push(c), o(), i.value = null, await lt(), u(), window.addEventListener("pointerdown", h, !0), document.addEventListener("keydown", v, !0), window.addEventListener("resize", u), window.addEventListener("scroll", u, !0), typeof ResizeObserver < "u" && r.value && (S = new ResizeObserver(() => u()), S.observe(r.value)));
    }
    function A() {
      const m = Se.indexOf(c);
      m !== -1 && (Se.splice(m, 1), window.removeEventListener("pointerdown", h, !0), document.removeEventListener("keydown", v, !0), window.removeEventListener("resize", u), window.removeEventListener("scroll", u, !0), S?.disconnect(), S = null);
    }
    return Ge(() => {
      n.open && C();
    }), ne(
      () => n.open,
      (m) => {
        m ? C() : A();
      }
    ), ne(() => n.anchor, () => {
      n.open && u();
    }), ke(A), (m, k) => e.open ? (d(), q(qt, {
      key: 0,
      to: e.to
    }, [
      b("div", Oe({
        ref_key: "root",
        ref: r
      }, m.$attrs, {
        class: "dc-shell dc-layer dc-popover",
        "data-dc-theme": w(s),
        "data-dc-side": i.value?.side,
        style: g.value
      }), [
        U(m.$slots, "default", {}, void 0, !0)
      ], 16, Ql)
    ], 8, ["to"])) : L("", !0);
  }
}), G = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [a, s] of t)
    n[a] = s;
  return n;
}, Yl = /* @__PURE__ */ G(Gl, [["__scopeId", "data-v-a688f2f7"]]), Xl = ["href"], Jl = /* @__PURE__ */ j({
  __name: "PressLink",
  props: {
    href: {},
    selectable: { type: Boolean }
  },
  emits: ["press"],
  setup(e, { emit: t }) {
    const n = e, a = t;
    function s(r) {
      r.stopPropagation(), !Ba() && (n.href && fn(r) ? dn(n.href, r) : a("press", ft(r), r));
    }
    function l(r) {
      n.href && r.button === 1 && dn(n.href, r);
    }
    function o(r) {
      if (n.href && fn(r)) {
        r.stopPropagation();
        return;
      }
      r.preventDefault(), a("press", ft(r), r);
    }
    return (r, i) => e.selectable ? (d(), p("span", {
      key: 0,
      role: "link",
      tabindex: "0",
      class: "dc-press",
      onClick: s,
      onAuxclick: l,
      onKeydown: i[0] || (i[0] = Le((c) => c.currentTarget.click(), ["enter"]))
    }, [
      U(r.$slots, "default", {}, void 0, !0)
    ], 32)) : e.href ? (d(), p("a", {
      key: 1,
      href: e.href,
      class: "dc-press",
      onClick: o
    }, [
      U(r.$slots, "default", {}, void 0, !0)
    ], 8, Xl)) : (d(), p("button", {
      key: 2,
      type: "button",
      class: "dc-press",
      onClick: o
    }, [
      U(r.$slots, "default", {}, void 0, !0)
    ]));
  }
}), se = /* @__PURE__ */ G(Jl, [["__scopeId", "data-v-e5165a68"]]), Bt = (e) => e.toLowerCase().replace(/\s+/g, ""), Zl = /(?:[^\s"]|"[^"]*"?)*$/, eo = /^(-?)([^:=<>"\s-][^:=<>"\s]*)([:=])(.*)$/, Jn = 4;
function to(e, t) {
  const n = Bt(t);
  return e.find((a) => vt(a) === n || Bt(a.label) === n);
}
function no(e) {
  switch (e.kind) {
    case "toggle":
      return e.text;
    case "range":
      return `${e.min}..${e.max}`;
    case "chips": {
      const t = e.options.slice(0, Jn).join(" · "), n = e.options.length - Jn;
      return n > 0 ? `${t} · +${n}` : t;
    }
  }
}
function ao(e) {
  switch (e.kind) {
    case "toggle":
      return [{ value: "true", hint: e.text }, { value: "false" }];
    case "chips":
      return e.options.map((t) => ({ value: t }));
    case "range":
      return [];
  }
}
function Zn(e, t) {
  return Bt(e).includes(Bt(t));
}
function so(e, t) {
  const n = Zl.exec(e)?.[0] ?? "", a = e.slice(0, e.length - n.length), s = [], l = eo.exec(n);
  if (l) {
    const [, o, r, i, c] = l, u = to(t, r);
    if (!u) return [];
    const g = c.replace(/"/g, "").toLowerCase();
    for (const { value: _, hint: y } of ao(u)) {
      if (!_.toLowerCase().includes(g)) continue;
      const h = we({
        kind: "field",
        field: vt(u),
        comparator: i,
        value: _,
        ...o ? { negated: !0 } : {}
      });
      s.push({ draft: a + h, label: h, ...y ? { hint: y } : {}, complete: !0 });
    }
  } else {
    if (/[<>"]/.test(n)) return [];
    const o = n.startsWith("-") ? "-" : "", r = n.slice(o.length);
    for (const i of t) {
      if (r && !Zn(i.key, r) && !Zn(i.label, r)) continue;
      const c = `${o}${vt(i)}:`;
      s.push({ draft: a + c, label: c, hint: no(i), complete: !1 });
    }
  }
  return s.filter((o) => o.draft !== e);
}
const lo = { class: "dc-header__main" }, oo = {
  class: "dc-header__brand",
  "aria-hidden": "true"
}, ro = { class: "dc-header__sr" }, io = {
  key: 2,
  class: "dc-header__within"
}, co = ["title"], uo = { class: "dc-header__query" }, fo = {
  key: 0,
  class: "dc-header__magnifier",
  viewBox: "0 0 24 24",
  width: "18",
  height: "18",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "aria-hidden": "true"
}, vo = ["data-dc-more", "title"], po = { class: "dc-header__run" }, ho = {
  key: 0,
  class: "dc-header__or dc-mono",
  "aria-hidden": "true"
}, yo = ["title", "aria-label", "onClick"], mo = ["placeholder", "aria-expanded", "aria-activedescendant", "onKeydown"], go = ["id", "aria-selected", "onClick"], _o = { class: "dc-completion__term dc-mono" }, wo = {
  key: 0,
  class: "dc-completion__hint"
}, ko = {
  key: 0,
  class: "dc-header__actions"
}, bo = /* @__PURE__ */ j({
  __name: "ShellHeader",
  props: {
    panel: { type: Boolean },
    top: { type: Boolean },
    hideType: { type: Boolean }
  },
  setup(e) {
    const t = Ht(), n = e, a = te(), s = f(() => a.schema.value), l = f(() => {
      const P = a.within.value.trim();
      return P ? It({ ...a.query.value, expr: P }, null) : [];
    }), o = f(() => {
      const P = a.entity.value, R = P?.keepsScope ? void 0 : P?.scope?.toLowerCase(), z = (n.panel || n.top) && !n.hideType;
      return a.terms.value.filter((F) => z || F.facetKey !== ze).map((F, Fe, ve) => {
        const kt = ve[Fe - 1];
        return {
          term: F,
          or: kt?.group !== void 0 && F.group !== void 0 && F.group !== kt.group,
          idle: !!R && F.field?.toLowerCase() === R
        };
      });
    }), r = Kl({
      source: a.source,
      schema: a.schema,
      query: a.query,
      loading: a.loading,
      // The scope's parts as well as the query's: it names a record more often
      // than a typed term does, being what a record's own page is built on.
      terms: f(() => [...l.value, ...a.terms.value])
    });
    function i(P) {
      const R = qa(s.value, P)?.scopeLabel ?? P;
      return R.charAt(0).toUpperCase() + R.slice(1);
    }
    function c(P) {
      return P.replace(/\s*\([^()]*\)\s*$/, "");
    }
    function u(P) {
      if (P.facetKey === ze) {
        const F = a.entity.value?.label;
        return F ? `${F} · ${Ne((a.matched ?? a.total).value)}` : P.label;
      }
      const R = r.nameOf(P);
      return R ? `${P.negated ? "-" : ""}${i(P.field)}: ${c(R)}` : P.label;
    }
    function g(P) {
      const R = u(P.term), z = P.idle ? `Not applied to ${a.entity.value?.label} — remove ${R}` : `Remove ${R}`, F = P.term.address;
      return F && F !== R ? `${z}
Written ${F} in the address and the search box` : z;
    }
    const _ = f(() => {
      const P = a.pressPreview?.value;
      if (!P) return [];
      const R = a.query.value, z = new Set(a.terms.value.map((F) => F.address));
      return It(
        { ...R, expr: P.alone ? P.term : ct(R.expr, P.term) },
        a.entity.value,
        a.schema.value
      ).filter((F) => F.address !== void 0 && !z.has(F.address)).map(
        (F) => P.name ? `${i(F.field)}: ${c(P.name)}` : F.label
      );
    }), y = f(() => a.pressPreview?.value?.alone === !0), h = H(null);
    function v(P) {
      h.value = P instanceof HTMLInputElement ? P : null;
    }
    function S() {
      a.abandonDraft(), h.value?.blur();
    }
    function C() {
      const P = k.value[m.value];
      if (M.value && P) {
        I(P);
        return;
      }
      O.value = null, A.value = !1, a.commitDraft();
    }
    const A = H(!1), m = H(-1), k = f(() => {
      const P = a.entity.value?.facets ?? [];
      return P.length ? so(a.draft.value, P) : [];
    }), M = f(() => A.value && k.value.length > 0);
    ne(k, () => {
      m.value = -1;
    });
    const E = `${Vt() ?? "dc-header"}-completions`;
    function I(P) {
      a.draft.value = P.draft, A.value = !P.complete, m.value = -1, lt(() => {
        const R = h.value;
        R?.focus(), R?.setSelectionRange(P.draft.length, P.draft.length);
      });
    }
    function x(P, R) {
      if (P.isComposing || !k.value.length) return;
      if (P.preventDefault(), !A.value) {
        A.value = !0;
        return;
      }
      const z = k.value.length + 1;
      m.value = (m.value + 1 + R + z) % z - 1;
    }
    function B(P) {
      return `${E}-${P}`;
    }
    const O = H(null), K = f(() => Math.min(O.value ?? 1 / 0, o.value.length)), V = f(() => [
      { key: "before", entries: o.value.slice(0, K.value) },
      { key: "after", entries: o.value.slice(K.value) }
    ]), J = f(() => K.value < o.value.length);
    ne(o, (P) => {
      O.value !== null && O.value >= P.length && (O.value = null);
    });
    function re(P, R) {
      O.value = P >= o.value.length ? null : Math.max(0, P), lt(() => {
        const z = h.value;
        if (!z) return;
        const F = R === "start" ? 0 : z.value.length;
        z.setSelectionRange(F, F), z.scrollIntoView({ block: "nearest", inline: "nearest" }), Ee();
      });
    }
    function ye(P) {
      const R = h.value;
      return !R || R.selectionStart !== R.selectionEnd ? !1 : R.selectionStart === (P === "start" ? 0 : R.value.length);
    }
    function me(P) {
      K.value === 0 || !ye("start") || (P.preventDefault(), re(P.key === "Home" ? 0 : K.value - 1, "start"));
    }
    function He(P) {
      !J.value || !ye("end") || (P.preventDefault(), re(P.key === "End" ? o.value.length : K.value + 1, "end"));
    }
    function le(P) {
      K.value === 0 || !ye("start") || (P.preventDefault(), fe(o.value[K.value - 1].term, !0));
    }
    function Xe(P) {
      !J.value || !ye("end") || (P.preventDefault(), fe(o.value[K.value].term, !1));
    }
    function ge(P) {
      P.isComposing || P.altKey || P.ctrlKey || P.metaKey || P.shiftKey || (P.key === "ArrowLeft" || P.key === "Home" ? me(P) : P.key === "ArrowRight" || P.key === "End" ? He(P) : P.key === "Backspace" ? le(P) : P.key === "Delete" && Xe(P));
    }
    function fe(P, R) {
      R && O.value !== null && (O.value = Math.max(0, O.value - 1)), a.removeTerm(P);
    }
    function Je(P) {
      P.target?.closest("button, input") || (P.preventDefault(), h.value?.focus(), re(o.value.length, "end"));
    }
    function Jt() {
      A.value = !1, a.draft.value || (O.value = null);
    }
    const Ze = H(null), Ve = H("");
    function Ee() {
      const P = Ze.value;
      if (!P) {
        Ve.value = "";
        return;
      }
      const R = P.scrollLeft > 1, z = P.scrollWidth - P.clientWidth - P.scrollLeft > 1;
      Ve.value = R && z ? "both" : R ? "start" : z ? "end" : "";
    }
    let $e = null;
    return ne(
      Ze,
      (P) => {
        $e?.disconnect(), $e = null, Ee(), !(!P || typeof ResizeObserver > "u") && ($e = new ResizeObserver(Ee), $e.observe(P));
      },
      { flush: "post" }
    ), ne([o, K], Ee, { flush: "post" }), ke(() => $e?.disconnect()), (P, R) => (d(), p("div", {
      class: oe(["dc-header", { "dc-header--panel": n.panel, "dc-header--top": n.top }])
    }, [
      b("div", lo, [
        !n.panel && !n.top && s.value.label && t.brand ? (d(), q(se, {
          key: 0,
          class: "dc-header__domain",
          "data-dc-brand": "",
          title: "Home",
          href: w(a).homeHref(),
          onPress: R[0] || (R[0] = (z) => w(a).reset())
        }, {
          default: Y(() => [
            b("span", oo, [
              U(P.$slots, "brand", {
                label: s.value.label
              }, void 0, !0)
            ]),
            b("span", ro, T(s.value.label), 1)
          ]),
          _: 3
        }, 8, ["href"])) : !n.panel && !n.top && s.value.label ? (d(), q(se, {
          key: 1,
          class: "dc-header__domain",
          title: "Home",
          href: w(a).homeHref(),
          onPress: R[1] || (R[1] = (z) => w(a).reset())
        }, {
          default: Y(() => [
            Z(T(s.value.label), 1)
          ]),
          _: 1
        }, 8, ["href"])) : L("", !0),
        U(P.$slots, "lead", {}, void 0, !0),
        l.value.length ? (d(), p("span", io, [
          R[10] || (R[10] = b("span", { class: "dc-header__sr" }, "Within", -1)),
          (d(!0), p(W, null, X(l.value, (z) => (d(), p("span", {
            key: `scope:${z.id}`,
            class: "dc-within dc-mono dc-truncate",
            title: u(z)
          }, T(u(z)), 9, co))), 128))
        ])) : L("", !0),
        b("div", uo, [
          b("div", {
            class: "dc-header__field",
            onMousedown: Je
          }, [
            n.top ? (d(), p("svg", fo, [...R[11] || (R[11] = [
              b("circle", {
                cx: "11",
                cy: "11",
                r: "6.5"
              }, null, -1),
              b("path", { d: "M16 16l4.5 4.5" }, null, -1)
            ])])) : L("", !0),
            b("div", {
              ref_key: "termBar",
              ref: Ze,
              class: "dc-header__terms",
              "data-dc-more": Ve.value,
              title: w(a).summary.value,
              onScroll: Ee
            }, [
              (d(!0), p(W, null, X(V.value, (z) => (d(), p(W, {
                key: z.key
              }, [
                b("span", po, [
                  (d(!0), p(W, null, X(z.entries, (F) => (d(), p(W, {
                    key: F.term.id
                  }, [
                    F.or ? (d(), p("span", ho, "or")) : L("", !0),
                    b("button", {
                      type: "button",
                      class: oe(["dc-term dc-mono", { "dc-term--idle": F.idle, "dc-term--leaving": y.value, "dc-term--type": F.term.facetKey === w(ze) }]),
                      title: g(F),
                      "aria-label": `Remove ${u(F.term)}`,
                      onMousedown: R[2] || (R[2] = xe(() => {
                      }, ["prevent"])),
                      onClick: (Fe) => fe(F.term, z.key === "before")
                    }, T(u(F.term)), 43, yo)
                  ], 64))), 128)),
                  z.key === "before" ? (d(!0), p(W, { key: 0 }, X(_.value, (F) => (d(), p("span", {
                    key: F,
                    class: "dc-term dc-term--preview dc-mono",
                    "aria-hidden": "true"
                  }, T(F), 1))), 128)) : L("", !0)
                ]),
                z.key === "before" ? Mt((d(), p("input", {
                  key: 0,
                  ref_for: !0,
                  ref: v,
                  "onUpdate:modelValue": R[3] || (R[3] = (F) => w(a).draft.value = F),
                  class: oe(["dc-header__search dc-mono", { "dc-header__search--between": J.value }]),
                  style: ae({ "--dc-typed": String(Math.max(1, w(a).draft.value.length)) }),
                  type: "text",
                  autocomplete: "off",
                  spellcheck: "false",
                  placeholder: J.value ? "" : "Filter…",
                  "aria-label": "Filter",
                  role: "combobox",
                  "aria-autocomplete": "list",
                  "aria-expanded": M.value,
                  "aria-controls": E,
                  "aria-activedescendant": M.value && m.value >= 0 ? B(m.value) : void 0,
                  onKeydown: [
                    Le(xe(C, ["prevent"]), ["enter"]),
                    Le(xe(S, ["prevent"]), ["esc"]),
                    R[4] || (R[4] = Le((F) => x(F, 1), ["down"])),
                    R[5] || (R[5] = Le((F) => x(F, -1), ["up"])),
                    ge
                  ],
                  onFocus: R[6] || (R[6] = (F) => A.value = !0),
                  onInput: R[7] || (R[7] = (F) => A.value = !0),
                  onBlur: Jt
                }, null, 46, mo)), [
                  [ua, w(a).draft.value]
                ]) : L("", !0)
              ], 64))), 128))
            ], 40, vo)
          ], 32)
        ])
      ]),
      Q(Yl, {
        id: E,
        open: M.value,
        anchor: h.value,
        "min-width": 0,
        "max-height": 320,
        class: "dc-completions",
        role: "listbox",
        "aria-label": "Completions",
        onClose: R[9] || (R[9] = (z) => A.value = !1)
      }, {
        default: Y(() => [
          (d(!0), p(W, null, X(k.value, (z, F) => (d(), p("div", {
            id: B(F),
            key: z.label,
            class: oe(["dc-completion", { "dc-completion--active": F === m.value }]),
            role: "option",
            "aria-selected": F === m.value,
            onMousedown: R[8] || (R[8] = xe(() => {
            }, ["prevent"])),
            onClick: (Fe) => I(z)
          }, [
            b("span", _o, T(z.label), 1),
            z.hint ? (d(), p("span", wo, T(z.hint), 1)) : L("", !0)
          ], 42, go))), 128))
        ]),
        _: 1
      }, 8, ["open", "anchor"]),
      t.actions ? (d(), p("div", ko, [
        U(P.$slots, "actions", {}, void 0, !0)
      ])) : L("", !0)
    ], 2));
  }
}), Ct = /* @__PURE__ */ G(bo, [["__scopeId", "data-v-6c40a70f"]]), $o = ["checked", "indeterminate"], ja = /* @__PURE__ */ j({
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
      onChange: o[0] || (o[0] = (r) => w(t).selectPage(!a.value))
    }, null, 40, $o));
  }
}), xo = { class: "dc-pick" }, So = ["id"], Co = ["id", "aria-expanded", "aria-labelledby", "data-dc-value"], Po = {
  key: 0,
  class: "dc-pick__icon",
  viewBox: "0 0 16 16",
  "aria-hidden": "true"
}, Mo = ["d"], Eo = { class: "dc-pick__label" }, To = /* @__PURE__ */ j({
  __name: "PickControl",
  props: {
    modelValue: {},
    options: {},
    label: {},
    mono: { type: Boolean }
  },
  emits: ["update:modelValue", "open", "close"],
  setup(e, { emit: t }) {
    const n = e, a = t, s = Vt() ?? "dc-pick", l = H(null), o = H(null), r = H(null), i = H(!1), c = f(() => r.value !== null), u = H(null), g = f(
      () => n.options.find((k) => k.key === n.modelValue) ?? n.options[0]
    ), _ = f(
      () => n.options.map((k) => ({
        id: k.key,
        label: k.label,
        icon: k.icon,
        checked: k.key === n.modelValue
      }))
    ), y = f(
      () => r.value ? { maxHeight: `${window.innerHeight - r.value.y - 8}px` } : void 0
    );
    function h(k) {
      const M = l.value?.getBoundingClientRect();
      M && (u.value = l.value?.closest(".dc-shell") ?? document.body, r.value = { x: M.left, y: M.bottom + 4, mirrorX: M.right }, i.value = k, a("open"));
    }
    function v(k) {
      r.value && a("close"), r.value = null, k && l.value?.focus();
    }
    function S() {
      c.value ? v(!0) : h(!1);
    }
    function C(k) {
      k.key !== "ArrowDown" && k.key !== "ArrowUp" || c.value || (k.preventDefault(), h(!0));
    }
    function A(k) {
      const M = k.target;
      M && (l.value?.contains(M) || o.value?.root?.contains(M) || v(!1));
    }
    ne(c, (k) => {
      k ? window.addEventListener("pointerdown", A, !0) : window.removeEventListener("pointerdown", A, !0);
    }), ke(() => window.removeEventListener("pointerdown", A, !0));
    function m(k) {
      v(!0), !(k.id === void 0 || k.id === n.modelValue) && a("update:modelValue", k.id);
    }
    return (k, M) => (d(), p("span", xo, [
      b("span", {
        id: `${w(s)}-name`,
        class: "dc-pick__name"
      }, T(e.label), 9, So),
      b("button", {
        id: `${w(s)}-value`,
        ref_key: "trigger",
        ref: l,
        type: "button",
        class: oe(["dc-pick__button", { "dc-mono": e.mono }]),
        "aria-haspopup": "menu",
        "aria-expanded": c.value,
        "aria-labelledby": `${w(s)}-name ${w(s)}-value`,
        "data-dc-value": e.modelValue,
        onClick: S,
        onKeydown: C
      }, [
        g.value?.icon ? (d(), p("svg", Po, [
          b("path", {
            d: g.value.icon
          }, null, 8, Mo)
        ])) : L("", !0),
        b("span", Eo, T(g.value?.label), 1)
      ], 42, Co),
      M[1] || (M[1] = b("svg", {
        class: "dc-pick__mark",
        viewBox: "0 0 16 16",
        "aria-hidden": "true"
      }, [
        b("path", { d: "M4 6l4 4 4-4" })
      ], -1)),
      r.value && u.value ? (d(), q(qt, {
        key: 0,
        to: u.value
      }, [
        Q(w(hs), {
          ref_key: "menu",
          ref: o,
          class: "dc-pick__list",
          style: ae(y.value),
          items: _.value,
          at: r.value,
          label: e.label,
          autofocus: i.value,
          onChoose: m,
          onDismiss: M[0] || (M[0] = (E) => v(!0))
        }, null, 8, ["style", "items", "at", "label", "autofocus"])
      ], 8, ["to"])) : L("", !0)
    ]));
  }
}), pn = /* @__PURE__ */ G(To, [["__scopeId", "data-v-0e31a711"]]), Lo = {
  class: "dc-pager",
  "aria-label": "Pages"
}, Oo = ["title"], Ao = ["value", "onKeydown"], No = {
  class: "dc-pager__total",
  "aria-hidden": "true"
}, Io = {
  class: "dc-pager__sr",
  "aria-live": "polite"
}, Bo = /* @__PURE__ */ j({
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
      let y = `Page ${De(a.value)} of ${s.value}`;
      const h = n.rows.value.length;
      if (h) {
        const v = n.offset.value + 1, S = `${n.counting.value ? "~" : ""}${De(n.total.value)}`;
        y += ` — rows ${De(v)} to ${De(v + h - 1)} of ${S}`;
      }
      return t.pagesNote ? `${y}
${t.pagesNote}` : y;
    }), o = H(null), r = f(() => o.value ?? String(a.value)), i = f(
      () => `calc(${Math.max(2, String(n.pageCount.value).length)}ch + 10px)`
    );
    function c(y) {
      y.target.select();
    }
    function u(y) {
      const h = y.target, v = h.value.replace(/[^0-9]/g, "");
      h.value !== v && (h.value = v), o.value = v;
    }
    function g(y) {
      const h = y.target, v = Number(o.value);
      o.value = null;
      const S = Number.isFinite(v) && v >= 1 ? Math.min(Math.trunc(v), Math.max(1, n.pageCount.value)) : a.value;
      h.value = String(S), S !== a.value && n.setPage(S);
    }
    function _(y) {
      const h = y.target;
      o.value = null, h.value = String(a.value), h.blur();
    }
    return (y, h) => (d(), p("nav", Lo, [
      Q(se, {
        class: "dc-pager__step",
        "aria-label": "Previous page",
        href: a.value > 1 ? w(n).hrefFor({ page: a.value - 1 }) : null,
        disabled: a.value <= 1,
        onPress: h[0] || (h[0] = (v) => w(n).setPage(a.value - 1))
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
            Le(xe(g, ["prevent"]), ["enter"]),
            Le(xe(_, ["prevent"]), ["esc"])
          ],
          onBlur: g
        }, null, 44, Ao),
        b("span", No, "/ " + T(s.value), 1)
      ], 8, Oo),
      b("span", Io, T(l.value), 1),
      Q(se, {
        class: "dc-pager__step",
        "aria-label": "Next page",
        href: a.value < w(n).pageCount.value ? w(n).hrefFor({ page: a.value + 1 }) : null,
        disabled: a.value >= w(n).pageCount.value,
        onPress: h[1] || (h[1] = (v) => w(n).setPage(a.value + 1))
      }, {
        default: Y(() => [...h[3] || (h[3] = [
          b("span", { "aria-hidden": "true" }, "›", -1)
        ])]),
        _: 1
      }, 8, ["href", "disabled"])
    ]));
  }
}), Ro = /* @__PURE__ */ G(Bo, [["__scopeId", "data-v-bdec7640"]]), qo = {
  key: 0,
  class: "dc-actions__order"
}, Ho = {
  key: 1,
  class: "dc-actions__select"
}, Vo = {
  key: 0,
  class: "dc-actions__all"
}, Fo = {
  class: "dc-actions__count",
  "aria-live": "polite"
}, Do = {
  key: 1,
  class: "dc-actions__count dc-actions__all",
  "aria-live": "polite"
}, Ko = { class: "dc-actions__ops" }, Wo = ["title", "disabled"], zo = ["title", "disabled"], jo = ["disabled"], Uo = ["data-dc-operation", "disabled", "onClick"], Qo = ["disabled"], Go = /* @__PURE__ */ j({
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
      () => !Sa(n.query.value, t.views) && a.value !== "record"
    ), g = f(() => a.value === "record" && n.query.value.entity !== null), _ = f(
      () => (u.value || g.value) && !n.loading.value && (n.pageCount.value > 1 || !!t.pagesNote)
    ), y = f(() => n.selection.value.ids.length), h = f(
      () => u.value && n.selectable.value && (n.rows.value.length > 0 || y.value > 0)
    ), v = f(() => a.value === "table"), S = f(
      () => s.value || _.value || u.value && (h.value || !!(c.value?.create || c.value?.duplicate || c.value?.delete || c.value?.operations?.length))
    ), C = f(() => y.value ? `${y.value} selected` : v.value ? "" : "Select all"), A = f(() => t.selectionPlacement === "end"), m = f(() => n.selectionTerms.value.length), k = (E) => m.value ? `${E} ${m.value}` : E;
    function M(E) {
      return y.value ? E.endsWith("…") ? `${E.slice(0, -1)} ${y.value}…` : `${E} ${y.value}` : E;
    }
    return (E, I) => S.value ? (d(), p("div", {
      key: 0,
      class: oe(["dc-actions", { "dc-actions--selection-end": A.value }])
    }, [
      s.value ? (d(), p("span", qo, [
        o.value ? (d(), q(pn, {
          key: 0,
          class: "dc-actions__pick dc-actions__sort",
          label: "Sort",
          "model-value": w(n).sort.value.key,
          options: l.value,
          "onUpdate:modelValue": w(n).setSort
        }, null, 8, ["model-value", "options", "onUpdate:modelValue"])) : L("", !0),
        Q(se, {
          class: "dc-actions__dir",
          "aria-label": i.value,
          title: i.value,
          href: w(n).hrefFor({ dir: r.value ? "asc" : "desc" }),
          onPress: I[0] || (I[0] = (x) => w(n).toggleDirection())
        }, {
          default: Y(() => [
            Z(T(r.value ? "↓" : "↑"), 1)
          ]),
          _: 1
        }, 8, ["aria-label", "title", "href"])
      ])) : L("", !0),
      h.value && C.value ? (d(), p("div", Ho, [
        v.value ? (d(), p("span", Do, T(C.value), 1)) : (d(), p("label", Vo, [
          Q(ja),
          b("span", Fo, T(C.value), 1)
        ])),
        y.value ? (d(), p("button", {
          key: 2,
          type: "button",
          class: oe(["dc-actions__clear", { "dc-actions__clear--op": A.value }]),
          onClick: I[1] || (I[1] = (x) => w(n).clearSelection())
        }, " Clear ", 2)) : L("", !0)
      ])) : L("", !0),
      b("div", Ko, [
        c.value?.create ? (d(), q(se, {
          key: 0,
          class: "dc-actions__op dc-actions__new",
          href: w(n).createHref?.(c.value),
          onPress: I[2] || (I[2] = (x) => w(n).create(c.value))
        }, {
          default: Y(() => [
            I[7] || (I[7] = b("span", {
              class: "dc-actions__plus",
              "aria-hidden": "true"
            }, "+", -1)),
            Z(" " + T(c.value.create), 1)
          ]),
          _: 1
        }, 8, ["href"])) : L("", !0),
        u.value && w(n).standable.value ? (d(), p(W, { key: 1 }, [
          b("button", {
            type: "button",
            class: "dc-actions__op",
            "data-dc-operation": "include",
            title: m.value ? `Narrow the query to the ${m.value} ticked` : "Tick rows to narrow the query to them",
            disabled: !m.value,
            onClick: I[3] || (I[3] = (x) => w(n).standSelection("in"))
          }, T(k("Include")), 9, Wo),
          b("button", {
            type: "button",
            class: "dc-actions__op",
            "data-dc-operation": "exclude",
            title: m.value ? `Leave the ${m.value} ticked out of the query` : "Tick rows to leave them out of the query",
            disabled: !m.value,
            onClick: I[4] || (I[4] = (x) => w(n).standSelection("out"))
          }, T(k("Exclude")), 9, zo)
        ], 64)) : L("", !0),
        c.value?.duplicate ? (d(), p("button", {
          key: 2,
          type: "button",
          class: "dc-actions__op",
          disabled: !y.value,
          onClick: I[5] || (I[5] = (x) => w(n).duplicate())
        }, T(M(c.value.duplicate)), 9, jo)) : L("", !0),
        (d(!0), p(W, null, X(c.value?.operations ?? [], (x) => (d(), p("button", {
          key: x.key,
          type: "button",
          class: "dc-actions__op",
          "data-dc-operation": x.key,
          disabled: !y.value && x.selection !== !1,
          onClick: (B) => w(n).operate(x.key)
        }, T(x.selection === !1 ? x.label : M(x.label)), 9, Uo))), 128)),
        c.value?.delete ? (d(), p("button", {
          key: 3,
          type: "button",
          class: "dc-actions__op dc-actions__danger",
          disabled: !y.value,
          onClick: I[6] || (I[6] = (x) => w(n).delete())
        }, T(M(c.value.delete)), 9, Qo)) : L("", !0)
      ]),
      _.value ? (d(), q(Ro, {
        key: 2,
        class: "dc-actions__pages",
        "pages-note": e.pagesNote
      }, null, 8, ["pages-note"])) : L("", !0)
    ], 2)) : L("", !0);
  }
}), Pt = /* @__PURE__ */ G(Go, [["__scopeId", "data-v-b7cd42d5"]]);
function ea(e) {
  return Math.max(0, e.total - (e.kept ?? 0));
}
function Ua(e) {
  const t = he(/* @__PURE__ */ new Map()), n = H(!0);
  let a = 0, s;
  const l = () => {
    a++, s?.abort(), s = void 0;
  }, o = () => {
    l();
    const r = a, { signal: i } = s = new AbortController(), c = e.query.value, u = e.schema.value, g = e.entities.value, _ = e.within?.value.trim() ?? "";
    n.value = c.expr.trim() === "" && !_;
    const y = /* @__PURE__ */ new Map();
    let h = !0;
    for (const v of g) {
      const S = Ra(v, c.expr), C = _ ? _n(_, S) : S;
      let A = !1;
      const m = (M) => {
        if (r !== a) return;
        if (h) {
          y.set(v.key, M);
          return;
        }
        const E = new Map(t.value);
        E.set(v.key, M), t.value = E;
      }, k = e.source.value.query({
        query: { ...c, entity: v.key, expr: C, page: 1 },
        schema: u,
        entity: v,
        limit: 0,
        offset: 0,
        signal: i,
        progress: (M) => {
          A || m({ total: M, pending: !0, counted: !0 });
        }
      });
      k instanceof Promise ? (y.has(v.key) || y.set(v.key, { total: 0, pending: !0, counted: !1 }), k.then((M) => {
        A = !0, m({ total: ea(M), pending: !1, counted: !0 });
      })) : (A = !0, y.set(v.key, { total: ea(k), pending: !1, counted: !0 }));
    }
    h = !1, t.value = y;
  };
  return ca() && Rt(l), { counts: t, pristine: n, refresh: o, cancel: l };
}
const Yo = {
  key: 1,
  class: "dc-show-as"
}, Xo = {
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
}, Jo = ["d"], Zo = ["aria-expanded", "aria-controls", "aria-activedescendant", "placeholder"], er = ["id"], tr = ["id", "aria-selected", "onMousedown", "onMousemove"], nr = {
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
}, ar = ["d"], sr = { class: "dc-show-as__text" }, lr = { class: "dc-show-as__name" }, or = {
  key: 0,
  class: "dc-show-as__hint"
}, rr = {
  class: "dc-show-as__check",
  "aria-hidden": "true"
}, ir = {
  key: 0,
  class: "dc-show-as__none",
  role: "presentation"
}, cr = "…", ur = /* @__PURE__ */ j({
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
    ), l = Ua({
      source: a.source,
      schema: a.schema,
      // What each type holds of what is on screen, the draft's results included:
      // a count of the committed query would disagree with the rows under it.
      query: a.liveQuery,
      entities: a.entities,
      within: a.within
    });
    function o(O) {
      if (O.key === a.query.value.entity && s.value) return Ne((a.matched ?? a.total).value);
      if (l.pristine.value) return ut(O);
      const V = l.counts.value.get(O.key);
      return V ? V.counted ? `${V.pending ? "~" : ""}${Ne(V.total)}` : cr : ut(O);
    }
    const r = f(() => [
      { key: "", label: "Everything" },
      ...a.entities.value.map((O) => ({
        key: O.key,
        label: `${O.label} · ${o(O)}`
      }))
    ]), i = f(
      () => t.typeChooser === "always" || a.query.value.entity !== null
    );
    function c(O) {
      a.setEntity(O || null);
    }
    const u = f(() => {
      const O = t.views ?? [...ot];
      return (t.stacked && O.includes("record") ? ["record", ...O.filter((V) => V !== "record")] : O).map((V) => {
        const J = We(V) ? void 0 : a.hostViews.value[V];
        return {
          key: V,
          label: t.labels?.[V] ?? (V === "record" ? a.recordView.value?.label ?? jn.record : We(V) ? jn[V] : J?.label ?? V),
          icon: We(V) ? Un[V] : J?.icon ?? Un.list,
          hint: t.hints?.[V] ?? J?.hint
        };
      });
    }), g = f(() => Ae(a.query.value.view, t.views)), _ = f(() => u.value.length > 1), y = f(() => _.value || i.value && !t.stacked);
    function h(O) {
      a.setView(O);
    }
    const v = H(null), S = H(!1), C = H(""), A = H(0), m = f(() => u.value.find((O) => O.key === g.value)), k = f(() => {
      const O = C.value.trim().toLowerCase();
      return O ? u.value.filter(
        (K) => K.label.toLowerCase().includes(O) || !!K.hint?.toLowerCase().includes(O)
      ) : u.value;
    });
    function M() {
      S.value = !0, A.value = Math.max(0, k.value.findIndex((O) => O.key === g.value));
    }
    function E() {
      S.value = !1, C.value = "";
    }
    function I() {
      S.value ? v.value?.blur() : v.value?.focus();
    }
    function x(O) {
      O !== g.value && h(O), v.value?.blur();
    }
    function B(O) {
      const K = k.value.length;
      if (O.key === "ArrowDown" || O.key === "ArrowUp") {
        if (O.preventDefault(), !S.value) {
          M();
          return;
        }
        K && (A.value = (A.value + (O.key === "ArrowDown" ? 1 : -1) + K) % K);
      } else if (O.key === "Enter") {
        O.preventDefault();
        const V = k.value[A.value];
        V && x(V.key);
      } else O.key === "Escape" && (O.preventDefault(), v.value?.blur());
    }
    return (O, K) => y.value ? (d(), p("div", {
      key: 0,
      class: oe(["dc-choosers", { "dc-choosers--stacked": e.stacked }])
    }, [
      i.value && !e.stacked ? (d(), q(pn, {
        key: 0,
        class: "dc-actions__pick dc-actions__type",
        label: "Type",
        "model-value": w(a).query.value.entity ?? "",
        options: r.value,
        onOpen: w(l).refresh,
        onClose: w(l).cancel,
        "onUpdate:modelValue": c
      }, null, 8, ["model-value", "options", "onOpen", "onClose"])) : L("", !0),
      _.value && e.stacked ? (d(), p("div", Yo, [
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
          (d(), p("svg", Xo, [
            b("path", {
              d: m.value?.icon
            }, null, 8, Jo)
          ])),
          Mt(b("input", {
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
            "aria-activedescendant": S.value && k.value.length ? `${n}-${k.value[A.value]?.key}` : void 0,
            placeholder: m.value?.label,
            onFocus: M,
            onBlur: E,
            onInput: K[1] || (K[1] = (V) => {
              A.value = 0, S.value = !0;
            }),
            onKeydown: B
          }, null, 40, Zo), [
            [ua, C.value]
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
            (d(!0), p(W, null, X(k.value, (V, J) => (d(), p("li", {
              id: `${n}-${V.key}`,
              key: V.key,
              class: oe(["dc-show-as__option", { "dc-show-as__option--active": J === A.value, "dc-show-as__option--on": V.key === g.value }]),
              style: ae({ animationDelay: `${J * 30}ms` }),
              role: "option",
              "aria-selected": V.key === g.value,
              onMousedown: xe((re) => x(V.key), ["prevent"]),
              onMousemove: (re) => A.value = J
            }, [
              (d(), p("svg", nr, [
                b("path", {
                  d: V.icon
                }, null, 8, ar)
              ])),
              b("span", sr, [
                b("span", lr, T(V.label), 1),
                V.hint ? (d(), p("span", or, T(V.hint), 1)) : L("", !0)
              ]),
              b("span", rr, T(V.key === g.value ? "✓" : ""), 1)
            ], 46, tr))), 128)),
            k.value.length ? L("", !0) : (d(), p("li", ir, " No format matches “" + T(C.value) + "” ", 1))
          ], 8, er)) : L("", !0)
        ], 2)
      ])) : _.value ? (d(), q(pn, {
        key: 2,
        class: "dc-actions__pick dc-actions__view",
        label: "View",
        "model-value": g.value,
        options: u.value,
        "onUpdate:modelValue": h
      }, null, 8, ["model-value", "options"])) : L("", !0)
    ], 2)) : L("", !0);
  }
}), ta = /* @__PURE__ */ G(ur, [["__scopeId", "data-v-070ebf59"]]), dr = { class: "dc-types-panel__list" }, fr = ["id", "checked", "onChange"], vr = ["for"], pr = ["title", "onClick"], hr = { class: "dc-types-panel__count dc-mono" }, yr = /* @__PURE__ */ j({
  __name: "ShellTypes",
  setup(e) {
    const t = te();
    function n(y) {
      return de(
        ee(y).map((h) => h.filter((v) => !(v.kind === "field" && v.field === "entity"))).filter((h) => h.length > 0)
      );
    }
    const a = f(() => {
      const y = ee(t.query.value.expr);
      return y.length !== 1 ? /* @__PURE__ */ new Set() : new Set(
        y[0].flatMap(
          (h) => h.kind === "field" && h.field === "entity" && h.negated ? [h.value.toLowerCase()] : []
        )
      );
    }), s = f(() => n(t.query.value.expr)), l = Ua({
      source: t.source,
      schema: t.schema,
      query: f(() => ({ ...t.liveQuery.value, expr: n(t.liveQuery.value.expr) })),
      entities: t.entities,
      within: t.within
    });
    Ge(() => l.refresh()), ne(() => [s.value, t.within.value, t.source.value], () => l.refresh());
    function o(y) {
      if (l.pristine.value) return ut(y);
      const h = l.counts.value.get(y.key);
      return h?.counted ? `${h.pending ? "~" : ""}${Ne(h.total)}` : ut(y);
    }
    const r = f(
      () => t.entities.value.filter(
        (y) => y.key === t.query.value.entity || (typeof y.count == "number" ? y.count > 0 : !!y.count)
      )
    );
    function i(y) {
      const h = t.query.value.entity;
      return h ? h === y.key : !a.value.has(y.key.toLowerCase());
    }
    function c(y) {
      const h = r.value.map((C) => C.key);
      if (y.length === 1) return { expr: s.value, entity: y[0] };
      const S = h.filter((C) => !y.includes(C)).map((C) => `-entity:${C}`).join(" ");
      return { expr: [s.value, S].filter(Boolean).join(" "), entity: null };
    }
    function u(y) {
      const h = r.value.filter((A) => i(A)).map((A) => A.key), v = h.includes(y.key) ? h.filter((A) => A !== y.key) : [...h, y.key];
      if (v.length === 0) return;
      const { expr: S, entity: C } = c(v);
      t.narrow(S, C);
    }
    function g(y) {
      const { expr: h, entity: v } = c([y.key]);
      t.narrow(h, v);
    }
    const _ = `dc-types-${Math.random().toString(36).slice(2, 8)}`;
    return (y, h) => r.value.length > 1 ? (d(), p("section", {
      key: 0,
      class: "dc-types-panel",
      "aria-labelledby": _
    }, [
      b("h3", {
        id: _,
        class: "dc-types-panel__heading"
      }, " Types "),
      b("ul", dr, [
        (d(!0), p(W, null, X(r.value, (v) => (d(), p("li", {
          key: v.key,
          class: "dc-types-panel__type"
        }, [
          b("input", {
            id: `${_}-${v.key}`,
            type: "checkbox",
            class: "dc-types-panel__box",
            checked: i(v),
            onChange: (S) => u(v)
          }, null, 40, fr),
          b("label", {
            for: `${_}-${v.key}`,
            class: "dc-types-panel__name"
          }, T(v.label), 9, vr),
          b("button", {
            type: "button",
            class: "dc-types-panel__only",
            title: `Only ${v.label}`,
            onClick: (S) => g(v)
          }, " only ", 8, pr),
          b("span", hr, T(o(v)), 1)
        ]))), 128))
      ])
    ])) : L("", !0);
  }
}), mr = /* @__PURE__ */ G(yr, [["__scopeId", "data-v-32178b7f"]]);
function gr(e, t) {
  if (!e) return null;
  const n = ie(e, t);
  return typeof n == "string" && n.trim() ? n : null;
}
const _r = (e) => e == null || typeof e == "string" && !e.trim();
function wr(e, t) {
  const n = pe(t, "state"), a = pe(t, "tint");
  return {
    identity: St(pe(t, "identity"), e),
    reference: St(pe(t, "reference"), e),
    metrics: va(t, "metric").map((s) => ({
      column: s,
      label: s.label ?? "",
      text: Me(s, e)
    })),
    facts: t.filter((s) => s.cardLabel && !_r(ie(s, e))).map((s) => ({
      column: s,
      label: s.cardLabel,
      title: [s.label, s.hint].filter(Boolean).join(" — "),
      text: Me(s, e)
    })),
    state: n ? ie(n, e) ?? null : null,
    updated: St(pe(t, "updated"), e),
    image: gr(pe(t, "image"), e),
    tint: a ? ie(a, e) ?? null : null
  };
}
function Qa(e, t, n, a, s = !1) {
  const l = n?.columns ?? [];
  return {
    row: e,
    key: Es(e, t),
    entityLabel: e.entityLabel,
    entity: n,
    columns: l,
    ordinal: ks(t),
    parts: wr(e, l),
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
      (n, a) => Qa(
        n,
        e.offset.value + a,
        t.value.get(n.entityKey) ?? null,
        e.isPinned(n),
        e.isSelected(n)
      )
    )
  );
}
const kr = ["data-dc-status", "data-dc-tone"], br = /* @__PURE__ */ j({
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
    }, T(n.value), 9, kr));
  }
}), Qe = /* @__PURE__ */ G(br, [["__scopeId", "data-v-686eb9b6"]]), $r = { key: 1 }, xr = /* @__PURE__ */ j({
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
    return (u, g) => a.value || s.value ? (d(), q(se, {
      key: 0,
      class: "dc-drill",
      href: r.value,
      title: i.value,
      onPress: c
    }, {
      default: Y(() => [
        U(u.$slots, "default", {}, () => [
          Z(T(o.value), 1)
        ], !0)
      ]),
      _: 3
    }, 8, ["href", "title"])) : (d(), p("span", $r, [
      U(u.$slots, "default", {}, () => [
        Z(T(o.value), 1)
      ], !0)
    ]));
  }
}), mt = /* @__PURE__ */ G(xr, [["__scopeId", "data-v-bbbd334b"]]), Sr = ["data-dc-active", "aria-pressed", "aria-label"], Cr = /* @__PURE__ */ j({
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
    }, T(e.pinned ? "★" : "☆"), 9, Sr));
  }
}), Pn = /* @__PURE__ */ G(Cr, [["__scopeId", "data-v-ef63d763"]]), Pr = ["src"], Mr = /* @__PURE__ */ j({
  __name: "RowPicture",
  props: {
    src: {}
  },
  setup(e) {
    const t = e, n = H(!1);
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
    }, null, 40, Pr)) : L("", !0);
  }
}), Yt = /* @__PURE__ */ G(Mr, [["__scopeId", "data-v-afaab300"]]), Er = ["data-dc-standing", "title", "aria-label"], Tr = /* @__PURE__ */ j({
  __name: "QueryMark",
  props: {
    entry: {}
  },
  setup(e) {
    const t = e, n = te(), a = f(() => Qt(t.entry.entity, t.entry.row)), s = f(() => Ia(n.query.value.expr, a.value)), l = f(
      () => s.value === "in" ? `The query narrows to ${t.entry.parts.identity} — press to lift that` : `The query leaves out ${t.entry.parts.identity} — press to lift that`
    );
    function o(r) {
      r.stopPropagation(), n.setExpression(Sn(n.query.value.expr, a.value));
    }
    return (r, i) => s.value ? (d(), p("button", {
      key: 0,
      type: "button",
      class: "dc-standing",
      "data-dc-standing": s.value,
      title: l.value,
      "aria-label": l.value,
      onClick: o
    }, T(s.value === "in" ? "+" : "−"), 9, Er)) : L("", !0);
  }
}), gt = /* @__PURE__ */ G(Tr, [["__scopeId", "data-v-4b8d4166"]]), Lr = ["href", "title", "aria-label"], Or = /* @__PURE__ */ j({
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
    }, "↗", 8, Lr)) : L("", !0);
  }
}), _t = /* @__PURE__ */ G(Or, [["__scopeId", "data-v-b00f390d"]]), Ar = /* @__PURE__ */ j({
  __name: "ScopeMark",
  props: {
    entry: {}
  },
  setup(e) {
    const t = e, n = te(), a = f(
      () => n.narrowsOnPress.value ? null : t.entry.entity?.scope ?? null
    ), s = H(null);
    function l(u) {
      s.value = ft(u).exclude ? "out" : "in";
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
    return (u, g) => a.value ? (d(), q(se, {
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
    }, 8, ["href", "data-dc-pending", "title", "aria-label"])) : L("", !0);
  }
}), wt = /* @__PURE__ */ G(Ar, [["__scopeId", "data-v-05d2c233"]]), Nr = ["checked", "aria-label"], qe = /* @__PURE__ */ j({
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
    }, null, 8, Nr));
  }
}), Ir = { class: "dc-card__top dc-mono" }, Br = { class: "dc-card__lead" }, Rr = {
  key: 2,
  class: "dc-card__entity"
}, qr = { class: "dc-card__top-right" }, Hr = { class: "dc-card__names" }, Vr = { class: "dc-card__primary" }, Fr = {
  key: 0,
  class: "dc-card__secondary dc-mono"
}, Dr = {
  key: 1,
  class: "dc-card__facts dc-mono"
}, Kr = ["title"], Wr = { class: "dc-card__fact-label" }, zr = {
  key: 0,
  class: "dc-card__metrics dc-mono"
}, jr = {
  key: 0,
  class: "dc-card__date"
}, Ur = /* @__PURE__ */ j({
  __name: "CardsView",
  setup(e) {
    const t = te(), n = Re(), a = f(() => t.isEverything.value), s = (o) => o.entity?.card === "picture", l = f(() => n.value.length > 0 && n.value.every(s));
    return (o, r) => (d(), p("div", {
      class: oe(["dc-cards", { "dc-cards--pictures": l.value }])
    }, [
      (d(!0), p(W, null, X(w(n), (i) => (d(), p("div", {
        key: i.key,
        class: oe(["dc-card", { "dc-card--picture": s(i) }])
      }, [
        b("div", Ir, [
          b("span", Br, [
            w(t).selectable.value ? (d(), q(qe, {
              key: 0,
              row: i.row,
              selected: i.selected,
              name: i.parts.identity
            }, null, 8, ["row", "selected", "name"])) : L("", !0),
            s(i) ? L("", !0) : (d(), p(W, { key: 1 }, [
              Z(T(i.ordinal), 1)
            ], 64)),
            a.value ? (d(), p("span", Rr, T(i.entityLabel), 1)) : L("", !0)
          ]),
          b("span", qr, [
            i.parts.state && !s(i) ? (d(), q(Qe, {
              key: 0,
              status: i.parts.state
            }, null, 8, ["status"])) : L("", !0),
            Q(gt, { entry: i }, null, 8, ["entry"]),
            Q(wt, { entry: i }, null, 8, ["entry"]),
            Q(_t, { entry: i }, null, 8, ["entry"]),
            w(t).pinnable.value ? (d(), q(Pn, {
              key: 1,
              row: i.row,
              name: i.parts.identity,
              pinned: i.pinned
            }, null, 8, ["row", "name", "pinned"])) : L("", !0)
          ])
        ]),
        Q(se, {
          class: "dc-card__open",
          href: w(t).pressHref(i.row),
          onPress: (c) => w(t).activate(i.row, c)
        }, {
          default: Y(() => [
            i.parts.image ? (d(), q(Yt, {
              key: 0,
              class: "dc-card__image",
              src: i.parts.image
            }, null, 8, ["src"])) : L("", !0),
            b("span", Hr, [
              b("span", Vr, T(i.parts.identity), 1),
              s(i) ? L("", !0) : (d(), p("span", Fr, T(i.parts.reference), 1)),
              i.parts.facts.length ? (d(), p("span", Dr, [
                (d(!0), p(W, null, X(i.parts.facts, (c) => (d(), p("span", {
                  key: c.column.key ?? c.label,
                  class: "dc-card__fact",
                  title: c.title || void 0
                }, [
                  b("span", Wr, T(c.label), 1),
                  Z(" " + T(c.text), 1)
                ], 8, Kr))), 128))
              ])) : L("", !0)
            ])
          ]),
          _: 2
        }, 1032, ["href", "onPress"]),
        s(i) ? L("", !0) : (d(), p("div", zr, [
          (d(!0), p(W, null, X(i.parts.metrics.slice(0, 2), (c) => (d(), q(mt, {
            key: c.column.key ?? c.label,
            entry: i,
            column: c.column
          }, {
            default: Y(() => [
              Z(T(c.label) + " " + T(c.text), 1)
            ]),
            _: 2
          }, 1032, ["entry", "column"]))), 128)),
          i.parts.updated ? (d(), p("span", jr, T(i.parts.updated), 1)) : L("", !0)
        ]))
      ], 2))), 128))
    ], 2));
  }
}), Ga = /* @__PURE__ */ G(Ur, [["__scopeId", "data-v-a90319f2"]]), Qr = { class: "dc-grid" }, Gr = { class: "dc-tile__scrim" }, Yr = { class: "dc-tile__top dc-mono" }, Xr = { class: "dc-tile__chip" }, Jr = { class: "dc-tile__caption" }, Zr = { class: "dc-tile__secondary dc-truncate" }, ei = { class: "dc-tile__primary" }, ti = /* @__PURE__ */ j({
  __name: "GridView",
  setup(e) {
    const t = te(), n = Re();
    return (a, s) => (d(), p("div", Qr, [
      (d(!0), p(W, null, X(w(n), (l) => (d(), p("div", {
        key: l.key,
        class: "dc-grid__cell"
      }, [
        Q(se, {
          class: "dc-tile",
          style: ae({ "--dc-tile-tint": l.parts.tint ?? void 0 }),
          href: w(t).pressHref(l.row),
          onPress: (o) => w(t).activate(l.row, o)
        }, {
          default: Y(() => [
            l.parts.image ? (d(), q(Yt, {
              key: 0,
              class: "dc-tile__image",
              src: l.parts.image
            }, null, 8, ["src"])) : L("", !0),
            b("span", Gr, [
              b("span", Yr, [
                b("span", Xr, T(l.ordinal), 1)
              ]),
              b("span", Jr, [
                b("span", Zr, T(l.parts.reference), 1),
                b("span", ei, T(l.parts.identity), 1)
              ])
            ])
          ]),
          _: 2
        }, 1032, ["style", "href", "onPress"]),
        w(t).selectable.value ? (d(), q(qe, {
          key: 0,
          class: "dc-grid__tick",
          row: l.row,
          selected: l.selected,
          name: l.parts.identity
        }, null, 8, ["row", "selected", "name"])) : L("", !0)
      ]))), 128))
    ]));
  }
}), Ya = /* @__PURE__ */ G(ti, [["__scopeId", "data-v-89c40a9e"]]);
function na(e, t, n, a) {
  return (n - a * (t - 1)) / e;
}
function on(e, t) {
  return e > 0 ? Math.min(t, e) : t;
}
function ni(e) {
  return e > 0 ? e : 1 / 0;
}
function ai(e, t, n) {
  const { width: a, height: s, gap: l = 0 } = n;
  if (!e.length) return [];
  if (!(a > 0) || !(s > 0)) return [{ items: [...e], height: s, filled: !1 }];
  const o = [];
  let r = [], i = 0, c = 0;
  for (const u of e) {
    const g = t(u), _ = Math.max(g.ratio, Number.EPSILON), y = g.height && g.height > 0 ? Math.max(c, g.height) : c, h = on(y, s), v = na(i + _, r.length + 1, a, l);
    if (v > h) {
      r.push(u), i += _, c = y;
      continue;
    }
    const S = on(c, s), C = r.length ? na(i, r.length, a, l) : 1 / 0;
    C <= ni(c) && C - S < h - v ? (o.push({ items: r, height: C, filled: !0 }), r = [u], i = _, c = g.height && g.height > 0 ? g.height : 0) : (o.push({ items: [...r, u], height: v, filled: !0 }), r = [], i = 0, c = 0);
  }
  return r.length && o.push({ items: r, height: on(c, s), filled: !1 }), o;
}
const si = { class: "dc-images" }, li = {
  key: 1,
  class: "dc-images__blank",
  "aria-hidden": "true"
}, oi = 240, bt = 8, ri = 1, ii = /* @__PURE__ */ j({
  __name: "ImagesView",
  setup(e) {
    const t = te(), n = Re(), a = Ln(/* @__PURE__ */ new Map()), s = Ln(/* @__PURE__ */ new Set());
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
      return v ? { ratio: v.width / v.height, height: v.height } : { ratio: ri };
    }
    const c = H(null), u = H(0);
    let g = null;
    function _() {
      u.value = c.value?.clientWidth ?? 0;
    }
    Ge(() => {
      _(), !(!c.value || typeof ResizeObserver > "u") && (g = new ResizeObserver(_), g.observe(c.value));
    }), ke(() => {
      g?.disconnect(), g = null;
    });
    const y = f(() => {
      const h = ai(n.value, i, {
        width: u.value,
        height: oi,
        gap: bt
      }), v = [];
      let S = 0;
      for (const C of h) {
        let A = 0;
        for (const m of C.items) {
          const k = i(m).ratio * C.height, M = r(m), E = M !== void 0 && M.height < C.height;
          v.push({
            entry: m,
            style: {
              top: `${S}px`,
              left: `${A}px`,
              width: `${k}px`,
              height: `${C.height}px`
            },
            picture: E ? { width: `${M.width}px`, height: `${M.height}px` } : { width: "100%", height: "100%" }
          }), A += k + bt;
        }
        S += C.height + bt;
      }
      return { boxes: v, height: h.length ? S - bt : 0 };
    });
    return (h, v) => (d(), p("div", si, [
      b("div", {
        ref_key: "wall",
        ref: c,
        class: "dc-images__wall",
        style: ae({ height: `${y.value.height}px` })
      }, [
        (d(!0), p(W, null, X(y.value.boxes, ({ entry: S, style: C, picture: A }) => (d(), p("div", {
          key: S.key,
          class: "dc-images__cell",
          style: ae(C)
        }, [
          Q(se, {
            class: "dc-images__open",
            title: S.parts.identity,
            "aria-label": S.parts.identity,
            href: w(t).pressHref(S.row),
            onPress: (m) => w(t).activate(S.row, m)
          }, {
            default: Y(() => [
              o(S) ? (d(), q(Yt, {
                key: 0,
                class: "dc-images__picture",
                style: ae(A),
                src: o(S),
                onLoad: (m) => l(o(S), m),
                onError: (m) => s.add(o(S))
              }, null, 8, ["style", "src", "onLoad", "onError"])) : (d(), p("span", li, T(S.parts.identity), 1))
            ]),
            _: 2
          }, 1032, ["title", "aria-label", "href", "onPress"]),
          w(t).selectable.value ? (d(), q(qe, {
            key: 0,
            class: "dc-images__tick",
            row: S.row,
            selected: S.selected,
            name: S.parts.identity
          }, null, 8, ["row", "selected", "name"])) : L("", !0)
        ], 4))), 128))
      ], 4)
    ]));
  }
}), Xa = /* @__PURE__ */ G(ii, [["__scopeId", "data-v-2d267370"]]), ci = { class: "dc-links" }, ui = { class: "dc-link__primary dc-truncate" }, di = { class: "dc-link__secondary dc-mono dc-truncate" }, fi = /* @__PURE__ */ j({
  __name: "LinksView",
  setup(e) {
    const t = te(), n = Re();
    return (a, s) => (d(), p("div", ci, [
      (d(!0), p(W, null, X(w(n), (l) => (d(), p("span", {
        key: l.key,
        class: "dc-links__item"
      }, [
        w(t).selectable.value ? (d(), q(qe, {
          key: 0,
          row: l.row,
          selected: l.selected,
          name: l.parts.identity
        }, null, 8, ["row", "selected", "name"])) : L("", !0),
        Q(se, {
          class: "dc-link",
          href: w(t).pressHref(l.row),
          onPress: (o) => w(t).activate(l.row, o)
        }, {
          default: Y(() => [
            b("span", ui, T(l.parts.identity), 1),
            b("span", di, T(l.parts.reference), 1)
          ]),
          _: 2
        }, 1032, ["href", "onPress"])
      ]))), 128))
    ]));
  }
}), Ja = /* @__PURE__ */ G(fi, [["__scopeId", "data-v-de6c9a0f"]]), vi = {
  class: "dc-list",
  role: "list"
}, pi = { class: "dc-list__ordinal dc-mono" }, hi = { class: "dc-list__identity" }, yi = ["title"], mi = ["title"], gi = {
  key: 1,
  class: "dc-list__entity dc-mono"
}, _i = { class: "dc-list__metrics dc-mono" }, wi = { class: "dc-list__trailing" }, ki = /* @__PURE__ */ j({
  __name: "ListView",
  setup(e) {
    const t = te(), n = Re(), a = f(() => t.isEverything.value);
    return (s, l) => (d(), p("div", vi, [
      (d(!0), p(W, null, X(w(n), (o) => (d(), p("div", {
        key: o.key,
        class: "dc-list__row",
        role: "listitem"
      }, [
        w(t).selectable.value ? (d(), q(qe, {
          key: 0,
          class: "dc-list__tick",
          row: o.row,
          selected: o.selected,
          name: o.parts.identity
        }, null, 8, ["row", "selected", "name"])) : L("", !0),
        Q(se, {
          class: "dc-list__open",
          href: w(t).pressHref(o.row),
          onPress: (r) => w(t).activate(o.row, r)
        }, {
          default: Y(() => [
            b("span", pi, T(o.ordinal), 1),
            b("span", hi, [
              b("span", {
                class: "dc-list__primary dc-truncate",
                title: o.parts.identity
              }, T(o.parts.identity), 9, yi),
              b("span", {
                class: "dc-list__secondary dc-mono dc-truncate",
                title: o.parts.reference || void 0
              }, T(o.parts.reference), 9, mi)
            ])
          ]),
          _: 2
        }, 1032, ["href", "onPress"]),
        a.value ? (d(), p("span", gi, T(o.entityLabel), 1)) : L("", !0),
        b("span", _i, [
          (d(!0), p(W, null, X(o.parts.metrics.slice(0, 2), (r) => (d(), q(mt, {
            key: r.column.key ?? r.label,
            entry: o,
            column: r.column
          }, null, 8, ["entry", "column"]))), 128))
        ]),
        b("span", wi, [
          o.parts.state ? (d(), q(Qe, {
            key: 0,
            status: o.parts.state
          }, null, 8, ["status"])) : L("", !0),
          Q(gt, { entry: o }, null, 8, ["entry"]),
          Q(wt, { entry: o }, null, 8, ["entry"]),
          Q(_t, { entry: o }, null, 8, ["entry"]),
          w(t).pinnable.value ? (d(), q(Pn, {
            key: 1,
            row: o.row,
            name: o.parts.identity,
            pinned: o.pinned
          }, null, 8, ["row", "name", "pinned"])) : L("", !0)
        ])
      ]))), 128))
    ]));
  }
}), hn = /* @__PURE__ */ G(ki, [["__scopeId", "data-v-ca54d88f"]]), bi = { class: "dc-preview" }, $i = { class: "dc-preview__pager dc-mono" }, xi = ["disabled"], Si = { "aria-live": "polite" }, Ci = ["disabled"], Pi = {
  key: 0,
  class: "dc-preview__card"
}, Mi = ["src"], Ei = { class: "dc-preview__body" }, Ti = { class: "dc-preview__top" }, Li = { class: "dc-preview__badges" }, Oi = { class: "dc-preview__entity dc-mono" }, Ai = { class: "dc-preview__marks" }, Ni = { class: "dc-preview__primary" }, Ii = { class: "dc-preview__secondary dc-mono" }, Bi = { class: "dc-preview__fields" }, Ri = { class: "dc-preview__key" }, qi = { class: "dc-preview__value dc-mono" }, Hi = /* @__PURE__ */ j({
  __name: "PreviewView",
  setup(e) {
    const t = te(), n = Re(), a = H(0);
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
    return (i, c) => (d(), p("div", bi, [
      b("div", $i, [
        b("button", {
          type: "button",
          class: "dc-preview__step",
          "aria-label": "Previous result",
          disabled: a.value === 0,
          onClick: c[0] || (c[0] = (u) => r(-1))
        }, " ‹ ", 8, xi),
        b("span", Si, T(o.value), 1),
        b("button", {
          type: "button",
          class: "dc-preview__step",
          "aria-label": "Next result",
          disabled: a.value >= w(n).length - 1,
          onClick: c[1] || (c[1] = (u) => r(1))
        }, " › ", 8, Ci)
      ]),
      s.value ? (d(), p("div", Pi, [
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
          }, null, 8, Mi)) : (d(), p(W, { key: 1 }, [
            Z(" preview ")
          ], 64))
        ], 4),
        b("div", Ei, [
          b("div", Ti, [
            b("span", Li, [
              w(t).selectable.value ? (d(), q(qe, {
                key: 0,
                row: s.value.row,
                selected: s.value.selected,
                name: s.value.parts.identity
              }, null, 8, ["row", "selected", "name"])) : L("", !0),
              s.value.parts.state ? (d(), q(Qe, {
                key: 1,
                status: s.value.parts.state
              }, null, 8, ["status"])) : L("", !0),
              b("span", Oi, T(s.value.entityLabel), 1)
            ]),
            b("span", Ai, [
              Q(gt, { entry: s.value }, null, 8, ["entry"]),
              Q(wt, { entry: s.value }, null, 8, ["entry"]),
              Q(_t, { entry: s.value }, null, 8, ["entry"]),
              w(t).pinnable.value ? (d(), q(Pn, {
                key: 0,
                row: s.value.row,
                name: s.value.parts.identity,
                pinned: s.value.pinned
              }, null, 8, ["row", "name", "pinned"])) : L("", !0)
            ])
          ]),
          b("div", null, [
            b("div", Ni, T(s.value.parts.identity), 1),
            b("div", Ii, T(s.value.parts.reference), 1)
          ]),
          b("dl", Bi, [
            (d(!0), p(W, null, X(l.value, (u) => (d(), p("div", {
              key: u.key,
              class: "dc-preview__field"
            }, [
              b("dt", Ri, T(u.key), 1),
              b("dd", qi, [
                u.column && s.value ? (d(), q(mt, {
                  key: 0,
                  entry: s.value,
                  column: u.column
                }, null, 8, ["entry", "column"])) : (d(), p(W, { key: 1 }, [
                  Z(T(u.value), 1)
                ], 64))
              ])
            ]))), 128))
          ]),
          Q(se, {
            class: "dc-preview__open",
            href: s.value ? w(t).pressHref(s.value.row) : null,
            onPress: c[2] || (c[2] = (u) => s.value && w(t).activate(s.value.row, u))
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
}), Za = /* @__PURE__ */ G(Hi, [["__scopeId", "data-v-59e0d33b"]]);
function Vi(e) {
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
function Fi(e, t, n) {
  const a = Vi(t);
  return a.size ? e.filter((s) => {
    const l = (s.key ?? s.field)?.toLowerCase();
    return l === void 0 || !a.has(l) || s.role === "identity" || n.some((o) => Array.isArray(ie(s, o))) ? !0 : new Set(n.map((o) => Me(s, o))).size > 1;
  }) : e;
}
function Di() {
  const e = te();
  return f(
    () => Fi(
      Ps(e.schema.value, e.entity.value),
      e.liveQuery.value.expr,
      e.rows.value
    )
  );
}
function es(e, t) {
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
function ts(e, t) {
  const n = e.narrowsOnPress.value ? Qt(t.entity, t.row) : null;
  return n ? { term: n, name: t.parts.identity, alone: t.entity?.narrowsAlone === !0 } : null;
}
const Ki = /* @__PURE__ */ j({
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
      return u.entity !== void 0 ? n.query.value.expr : ct(n.query.value.expr, s(u, g));
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
      (d(!0), p(W, null, X(e.narrowings, (_, y) => (d(), p(W, {
        key: s(_)
      }, [
        y > 0 ? (d(), p(W, { key: 0 }, [
          Z(", ")
        ], 64)) : L("", !0),
        Q(se, {
          class: "dc-narrow",
          href: r(_),
          title: i(_),
          selectable: "",
          onPress: (h, v) => c(_, h, v)
        }, {
          default: Y(() => [
            U(u.$slots, "default", {}, () => [
              Z(T(_.label ?? a.value), 1)
            ], !0)
          ]),
          _: 2
        }, 1032, ["href", "title", "onPress"])
      ], 64))), 128))
    ], 2));
  }
}), aa = /* @__PURE__ */ G(Ki, [["__scopeId", "data-v-651b03c2"]]), Wi = /* @__PURE__ */ new Set(["entitykey", "entitylabel"]), zi = /* @__PURE__ */ new Set(["ordinal", "image", "component", "date"]), ji = 4;
function ns(e) {
  return (e.field ?? e.key)?.toLowerCase();
}
function as(e) {
  return e.narrow === !1 || e.role === "identity" || e.activate || e.click || e.drill ? !1 : !zi.has(e.kind ?? "text") && ns(e) !== void 0;
}
function Ui(e, t) {
  if (Number.isInteger(e)) return e;
  const n = 10 ** ji;
  return (t ? Math.ceil(e * n - 1e-6) : Math.floor(e * n + 1e-6)) / n;
}
function Qi(e, t) {
  let n = 1 / 0, a = -1 / 0;
  for (const s of t) {
    const l = ie(e, s);
    typeof l != "number" || !Number.isFinite(l) || (l < n && (n = l), l > a && (a = l));
  }
  return n <= a ? { min: n, max: a } : null;
}
function Gi(e, t, n, a = null) {
  if (!as(e)) return [];
  const s = ns(e);
  if (Wi.has(s) && !e.value)
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
      term: { kind: "field", field: s, comparator: c ? "<=" : ">=", value: String(Ui(l, c)) }
    }];
  }
  return (Array.isArray(l) ? l : [l]).filter(
    (i) => typeof i == "string" && i !== ""
  ).map((i) => ({
    label: Array.isArray(l) ? i : null,
    term: { kind: "field", field: s, comparator: "=", value: i }
  }));
}
const sa = /* @__PURE__ */ new WeakMap();
function Yi(e, t) {
  let n = sa.get(e);
  return n || sa.set(e, n = /* @__PURE__ */ new Map()), n.has(t) || n.set(t, Qi(t, e)), n.get(t);
}
const Xi = /* @__PURE__ */ j({
  __name: "ColumnCell",
  props: {
    column: {},
    entry: {}
  },
  setup(e) {
    const t = e, n = te(), a = f(() => t.column.kind ?? "text"), s = f(() => ie(t.column, t.entry.row)), l = f(
      () => a.value === "ordinal" ? t.entry.ordinal : Me(t.column, t.entry.row)
    ), o = f(() => s.value), r = f(() => t.column.activate === !0 || !!t.column.click), i = f(() => rn(t.column)), c = f(() => pa(t.column, t.entry.row)), u = f(() => {
      if (!as(t.column)) return [];
      const h = typeof s.value == "number" ? Yi(n.rows.value, t.column) : null;
      return Gi(t.column, t.entry.row, t.entry.entity ?? null, h);
    });
    function g(h) {
      r.value && (h.stopPropagation(), _(ft(h)));
    }
    function _(h) {
      t.column.click?.(t.entry.row, h), t.column.activate && n.activate(t.entry.row, h);
    }
    const y = f(() => t.column.click ? t.column.clickHref?.(t.entry.row) ?? null : t.column.activate ? n.pressHref(t.entry.row) : null);
    return (h, v) => a.value === "component" && e.column.component ? (d(), q(Ke(e.column.component), {
      key: 0,
      row: e.entry.row,
      entry: e.entry,
      value: s.value,
      column: e.column
    }, null, 8, ["row", "entry", "value", "column"])) : a.value === "status" && u.value.length ? (d(), q(aa, {
      key: 1,
      entry: e.entry,
      column: e.column,
      narrowings: u.value,
      truncates: !1
    }, {
      default: Y(() => [
        Q(Qe, { status: o.value }, null, 8, ["status"])
      ]),
      _: 1
    }, 8, ["entry", "column", "narrowings"])) : a.value === "status" ? (d(), q(Qe, {
      key: 2,
      status: o.value
    }, null, 8, ["status"])) : a.value === "image" ? (d(), q(Yt, {
      key: 3,
      class: "dc-cell__image",
      src: typeof s.value == "string" ? s.value : "",
      style: ae({ maxHeight: e.column.height }),
      onClick: g
    }, null, 8, ["src", "style"])) : e.column.drill || e.column.click && e.column.role === "metric" ? (d(), q(mt, {
      key: 4,
      entry: e.entry,
      column: e.column
    }, null, 8, ["entry", "column"])) : r.value ? (d(), q(se, Oe({
      key: 5,
      class: ["dc-table__open", { "dc-truncate": i.value }],
      href: y.value,
      title: c.value
    }, da(e.column.activate ? w(es)(w(n), w(ts)(w(n), e.entry)) : {}), {
      onPress: v[0] || (v[0] = (S, C) => {
        C.stopPropagation(), _(S);
      })
    }), {
      default: Y(() => [
        Z(T(l.value), 1)
      ]),
      _: 1
    }, 16, ["class", "href", "title"])) : u.value.length ? (d(), q(aa, {
      key: 6,
      entry: e.entry,
      column: e.column,
      narrowings: u.value,
      truncates: i.value
    }, null, 8, ["entry", "column", "narrowings", "truncates"])) : (d(), p("span", {
      key: 7,
      class: oe(["dc-cell__text", { "dc-truncate": i.value }])
    }, T(l.value), 3));
  }
}), la = /* @__PURE__ */ G(Xi, [["__scopeId", "data-v-d07057a1"]]), Ji = {
  key: 0,
  class: "dc-table__none"
}, Zi = { class: "dc-table__detail" }, ec = ["data-dc-wrap", "data-dc-row-links"], tc = { "data-dc-stuck": "" }, nc = {
  key: 0,
  class: "dc-table__pick",
  scope: "col"
}, ac = {
  key: 1,
  class: "dc-table__standing",
  scope: "col",
  "aria-label": "In the query"
}, sc = ["data-dc-align", "data-dc-hide", "aria-sort", "title"], lc = {
  key: 2,
  class: "dc-table__head"
}, oc = { "data-dc-scroll": "" }, rc = ["onClick"], ic = {
  key: 0,
  class: "dc-table__pick"
}, cc = {
  key: 1,
  class: "dc-table__standing"
}, uc = ["data-dc-align", "data-dc-hide", "title"], dc = {
  key: 1,
  class: "dc-table__name"
}, fc = /* @__PURE__ */ j({
  __name: "TableView",
  setup(e) {
    const t = te(), n = Re(), a = Di();
    function s(E, I) {
      if (!t.rowLinks?.value || Ba()) return;
      const x = t.pressHref(E);
      if (x && fn(I)) {
        dn(x, I);
        return;
      }
      t.activate(E, ft(I));
    }
    const l = f(() => t.rowLinks?.value ? new Map(n.value.map((E) => [E.key, t.pressHref(E.row)])) : /* @__PURE__ */ new Map()), o = f(
      () => a.value.find((E) => E.role === "identity") ?? a.value[0]
    );
    function r(E, I, x) {
      x.stopPropagation(), t.activate(E, I);
    }
    function i(E) {
      const I = _a(E, t.entity.value, t.schema.value), x = I ? `Shortcut: ${I}` : void 0;
      return [E.hint, x].filter(Boolean).join(`
`) || void 0;
    }
    const c = f(() => {
      const E = a.value.find((x) => x.scope);
      return E || ((t.entity.value ? !!t.entity.value.href : t.entities.value.some((x) => x.href)) ? a.value.find((x) => x.activate) : void 0);
    }), u = (E) => La(E.entity, E.row), g = f(
      () => n.value.some((E) => Ia(t.query.value.expr, u(E)) !== null)
    ), _ = f(
      () => a.value.some((E) => E.kind === "image" || E.height !== void 0)
    );
    function y(E) {
      E && (t.query.value.sort === E ? t.toggleDirection() : t.setSort(E));
    }
    function h(E) {
      return E ? t.query.value.sort === E ? t.hrefFor({ dir: t.query.value.dir === "desc" ? "asc" : "desc" }) : t.hrefFor({ sort: E }) : null;
    }
    const v = f(() => t.entity.value?.label ?? "The result set"), S = f(() => new Set(t.sorts.value.map((E) => E.key))), C = (E) => E.sort !== void 0 && S.value.has(E.sort), A = (E) => {
      if (C(E))
        return t.query.value.sort !== E.sort ? "none" : t.query.value.dir === "desc" ? "descending" : "ascending";
    };
    function m(E) {
      return [
        Rn(E),
        E.muted ? "dc-table__muted" : "",
        E.mono ? "dc-mono" : "",
        rn(E) ? "dc-truncate" : ""
      ].filter(Boolean).join(" ");
    }
    function k(E, I) {
      if (!(!rn(E) || E.activate || E.click))
        return pa(E, I.row);
    }
    const M = f(
      () => a.value.length + (t.selectable.value ? 1 : 0) + (g.value ? 1 : 0)
    );
    return (E, I) => w(a).length ? (d(), p("table", {
      key: 1,
      class: "dc-table",
      "data-dc-wrap": _.value ? "" : void 0,
      "data-dc-row-links": w(t).rowLinks?.value ? "" : void 0,
      style: ae({ "--dc-table-tracks": M.value })
    }, [
      b("thead", tc, [
        b("tr", null, [
          w(t).selectable.value ? (d(), p("th", nc, [
            Q(ja)
          ])) : L("", !0),
          g.value ? (d(), p("th", ac)) : L("", !0),
          (d(!0), p(W, null, X(w(a), (x, B) => (d(), p("th", {
            key: w(In)(x, B),
            scope: "col",
            class: oe(w(Rn)(x)),
            style: ae({ width: x.width }),
            "data-dc-align": w(Bn)(x),
            "data-dc-hide": x.hideBelow,
            "aria-sort": A(x),
            title: i(x)
          }, [
            C(x) ? (d(), q(se, {
              key: 0,
              class: "dc-table__sort",
              href: h(x.sort),
              onPress: (O) => y(x.sort)
            }, {
              default: Y(() => [
                Z(T(x.label), 1)
              ]),
              _: 2
            }, 1032, ["href", "onPress"])) : (d(), p(W, { key: 1 }, [
              Z(T(x.label), 1)
            ], 64)),
            x.header ? (d(), p("span", lc, [
              (d(), q(Ke(x.header), {
                column: x,
                entity: w(t).entity.value
              }, null, 8, ["column", "entity"]))
            ])) : L("", !0)
          ], 14, sc))), 128))
        ])
      ]),
      b("tbody", oc, [
        (d(!0), p(W, null, X(w(n), (x) => (d(), p("tr", {
          key: x.key,
          class: "dc-table__row",
          onClick: (B) => s(x.row, B)
        }, [
          w(t).selectable.value ? (d(), p("td", ic, [
            Q(qe, {
              row: x.row,
              selected: x.selected,
              name: x.parts.identity
            }, null, 8, ["row", "selected", "name"])
          ])) : L("", !0),
          g.value ? (d(), p("td", cc, [
            Q(gt, { entry: x }, null, 8, ["entry"])
          ])) : L("", !0),
          (d(!0), p(W, null, X(w(a), (B, O) => (d(), p("td", {
            key: w(In)(B, O),
            class: oe(m(B)),
            style: ae({ width: B.width }),
            "data-dc-align": w(Bn)(B),
            "data-dc-hide": B.hideBelow,
            title: k(B, x)
          }, [
            l.value.get(x.key) ? (d(), q(se, Oe({
              key: 0,
              class: "dc-table__cell-link",
              href: l.value.get(x.key),
              tabindex: B === o.value ? void 0 : -1,
              "aria-hidden": B === o.value ? void 0 : "true",
              "aria-label": B === o.value ? x.parts.identity : void 0
            }, da(w(es)(w(t), w(ts)(w(t), x))), {
              onPress: (K, V) => r(x.row, K, V)
            }), null, 16, ["href", "tabindex", "aria-hidden", "aria-label", "onPress"])) : L("", !0),
            B === c.value ? (d(), p("span", dc, [
              Q(la, {
                column: B,
                entry: x
              }, null, 8, ["column", "entry"]),
              Q(wt, { entry: x }, null, 8, ["entry"]),
              Q(_t, { entry: x }, null, 8, ["entry"])
            ])) : (d(), q(la, {
              key: 2,
              column: B,
              entry: x
            }, null, 8, ["column", "entry"]))
          ], 14, uc))), 128))
        ], 8, rc))), 128))
      ])
    ], 12, ec)) : (d(), p("p", Ji, [
      I[2] || (I[2] = b("span", { class: "dc-table__headline" }, "No columns declared", -1)),
      b("span", Zi, [
        Z(T(v.value) + " has no ", 1),
        I[0] || (I[0] = b("code", null, "columns", -1)),
        I[1] || (I[1] = Z(" in the schema, so there is no table to draw. ", -1))
      ])
    ]));
  }
}), ss = /* @__PURE__ */ G(fc, [["__scopeId", "data-v-30f18dcf"]]);
function vc(e) {
  const t = he([]), n = H(!1), a = he(null);
  let s = 0;
  const l = (i, c, u, g, _) => ({
    entity: i,
    rows: e.limit.value > 0 ? c.rows.map((y, h) => Qa(y, h, i, e.isPinned(y.id))) : [],
    total: c.total,
    count: u ? ut(i) : Ne(c.total),
    pinned: pc(g, c, _)
  }), o = () => {
    const i = ++s, c = e.query.value, u = e.schema.value, g = e.entities.value, _ = e.limit.value, y = e.within?.value.trim() ?? "", h = wn(c) && !y, v = y ? _n(y, c.expr) : c.expr, S = g.map((C) => ({
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
        (A, m) => l(S[m].entity, A, h, u, v)
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
function pc(e, t, n) {
  const a = t.rows[0];
  if (t.total !== 1 || t.rows.length !== 1 || !a)
    return !1;
  const s = n.trim();
  if (!s)
    return !1;
  const l = At(e, a);
  return !!l && Ue(s, l) === s;
}
const hc = ["data-dc-pending", "data-dc-heads-only"], yc = {
  key: 0,
  class: "dc-types__state",
  role: "alert"
}, mc = {
  key: 1,
  class: "dc-types__state",
  "aria-live": "polite"
}, gc = {
  key: 2,
  class: "dc-types__state"
}, _c = ["data-dc-empty"], wc = { class: "dc-type__name" }, kc = { class: "dc-type__count dc-mono" }, bc = {
  key: 0,
  class: "dc-type__note dc-mono"
}, $c = { class: "dc-type__sr" }, xc = {
  key: 1,
  class: "dc-type__description"
}, Sc = {
  key: 0,
  class: "dc-type__empty"
}, Cc = { class: "dc-type__identity" }, Pc = { class: "dc-type__primary dc-truncate" }, Mc = { class: "dc-type__secondary dc-mono dc-truncate" }, Ec = { class: "dc-type__trailing dc-mono" }, Tc = { class: "dc-type__metric-value" }, Lc = { class: "dc-type__metric-label" }, Oc = {
  key: 0,
  class: "dc-type__date"
}, Ac = /* @__PURE__ */ j({
  __name: "TypeCardsView",
  setup(e) {
    const t = te(), { previews: n, pending: a, error: s } = vc({
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
      "data-dc-pending": w(a) ? "true" : "false",
      "data-dc-heads-only": o.value ? "true" : "false"
    }, [
      U(u.$slots, "before", {}, void 0, !0),
      w(s) ? (d(), p("p", yc, " Could not load results: " + T(w(s) instanceof Error ? w(s).message : "the data source failed."), 1)) : !c.value.length && w(a) ? (d(), p("p", mc, " Running query… ")) : c.value.length ? L("", !0) : (d(), p("p", gc, T(l.value ? "Nothing matches this query" : "Nothing here yet"), 1)),
      (d(!0), p(W, null, X(c.value, (_) => (d(), p("section", {
        key: _.entity.key,
        class: "dc-type",
        "data-dc-empty": _.total ? "false" : "true"
      }, [
        Q(se, {
          class: "dc-type__head",
          href: w(t).entityHref(_.entity.key),
          onPress: (y) => w(t).setEntity(_.entity.key)
        }, {
          default: Y(() => [
            b("span", wc, T(_.entity.label), 1),
            b("span", kc, T(_.count), 1),
            _.entity.note ? (d(), p("span", bc, T(_.entity.note), 1)) : L("", !0),
            g[0] || (g[0] = b("span", {
              class: "dc-type__go",
              "aria-hidden": "true"
            }, "→", -1)),
            b("span", $c, "Show only " + T(_.entity.label.toLowerCase()), 1),
            _.entity.description ? (d(), p("span", xc, T(_.entity.description), 1)) : L("", !0)
          ]),
          _: 2
        }, 1032, ["href", "onPress"]),
        _.total ? L("", !0) : (d(), p("p", Sc, T(l.value ? "No matches" : "Nothing here yet"), 1)),
        (d(!0), p(W, null, X(_.rows, (y) => (d(), p("div", {
          key: y.key,
          class: "dc-type__row"
        }, [
          Q(se, {
            class: "dc-type__open",
            href: w(t).pressHref(y.row),
            onPress: (h) => w(t).activate(y.row, h)
          }, {
            default: Y(() => [
              b("span", Cc, [
                b("span", Pc, T(y.parts.identity), 1),
                b("span", Mc, T(y.parts.reference), 1)
              ])
            ]),
            _: 2
          }, 1032, ["href", "onPress"]),
          b("span", Ec, [
            (d(!0), p(W, null, X(y.parts.metrics.slice(0, 1), (h) => (d(), q(mt, {
              key: h.column.key ?? h.label,
              class: "dc-type__metric",
              entry: y,
              column: h.column
            }, {
              default: Y(() => [
                b("span", Tc, T(h.text), 1),
                b("span", Lc, T(h.label), 1)
              ]),
              _: 2
            }, 1032, ["entry", "column"]))), 128)),
            y.parts.updated ? (d(), p("span", Oc, T(y.parts.updated), 1)) : L("", !0),
            Q(gt, { entry: y }, null, 8, ["entry"]),
            Q(wt, { entry: y }, null, 8, ["entry"]),
            Q(_t, { entry: y }, null, 8, ["entry"])
          ])
        ]))), 128)),
        _.entity.create && !o.value ? (d(), q(se, {
          key: 1,
          class: "dc-type__new",
          href: w(t).createHref?.(_.entity),
          onPress: (y) => w(t).create(_.entity)
        }, {
          default: Y(() => [
            g[1] || (g[1] = b("span", {
              class: "dc-type__plus",
              "aria-hidden": "true"
            }, "+", -1)),
            Z(" " + T(_.entity.create), 1)
          ]),
          _: 2
        }, 1032, ["href", "onPress"])) : L("", !0)
      ], 8, _c))), 128)),
      U(u.$slots, "after", {}, void 0, !0)
    ], 8, hc));
  }
}), ls = /* @__PURE__ */ G(Ac, [["__scopeId", "data-v-d60e56a6"]]), Nc = ["data-dc-pending", "data-dc-more"], Ic = {
  key: 0,
  class: "dc-results__state dc-results__state--loading",
  "aria-live": "polite"
}, Bc = {
  key: 3,
  class: "dc-results__state",
  role: "alert"
}, Rc = { class: "dc-results__detail" }, qc = {
  key: 4,
  class: "dc-results__state",
  "aria-live": "polite"
}, Hc = {
  key: 5,
  class: "dc-results__state"
}, Vc = { class: "dc-results__detail" }, Fc = /* @__PURE__ */ j({
  __name: "ResultsArea",
  props: {
    views: {},
    loading: { type: Boolean }
  },
  setup(e) {
    const t = e, n = te(), a = Ht(), s = {
      list: hn,
      cards: Ga,
      grid: Ya,
      images: Xa,
      table: ss,
      links: Ja,
      preview: Za
    }, l = f(() => Sa(n.query.value, t.views)), o = f(() => Ae(n.query.value.view, t.views)), r = f(() => We(o.value) ? null : n.hostViews.value[o.value] ?? null), i = f(
      () => (o.value === "record" || !We(o.value) ? null : s[o.value]) ?? hn
    ), c = f(() => o.value === "record" ? n.recordView.value : null), u = f(() => n.rows.value.length > 0), g = f(() => n.error.value !== null), _ = H(null);
    function y(k) {
      return k.querySelector("[data-dc-scroll]") ?? k;
    }
    ne(
      // The page on screen, which is the draft's own while one is being typed.
      () => n.liveQuery.value.page,
      () => {
        _.value && (y(_.value).scrollTop = 0);
      }
    );
    const h = H(""), v = H({ x: 0, y: 0 }), S = H(0);
    function C() {
      const k = _.value;
      if (!k) {
        h.value = "";
        return;
      }
      const M = y(k), E = {
        top: M.scrollTop > 1,
        right: M.scrollWidth - M.clientWidth - M.scrollLeft > 1,
        bottom: M.scrollHeight - M.clientHeight - M.scrollTop > 1,
        left: M.scrollLeft > 1
      };
      h.value = Object.entries(E).filter(([, I]) => I).map(([I]) => I).join(" "), v.value = {
        x: M.offsetHeight - M.clientHeight,
        y: M.offsetWidth - M.clientWidth
      }, S.value = k.querySelector("[data-dc-stuck]")?.offsetHeight ?? 0;
    }
    let A = null, m = null;
    return ne(
      _,
      (k, M) => {
        if (M?.removeEventListener("scroll", C, { capture: !0 }), A?.disconnect(), m?.disconnect(), A = null, m = null, C(), !k || (k.addEventListener("scroll", C, { passive: !0, capture: !0 }), typeof ResizeObserver > "u")) return;
        const E = new ResizeObserver(C), I = typeof MutationObserver > "u" ? null : new MutationObserver(() => {
          x(), C();
        }), x = () => {
          E.disconnect(), I?.disconnect();
          for (const B of /* @__PURE__ */ new Set([k, y(k)])) {
            E.observe(B);
            for (const O of B.children) E.observe(O);
            I?.observe(B, { childList: !0 });
          }
        };
        x(), A = E, m = I;
      },
      { flush: "post" }
    ), ke(() => {
      _.value?.removeEventListener("scroll", C, { capture: !0 }), A?.disconnect(), m?.disconnect();
    }), (k, M) => (d(), p("div", {
      ref_key: "scroller",
      ref: _,
      class: "dc-results",
      "data-dc-pending": w(n).pending.value ? "true" : "false",
      "data-dc-more": h.value,
      style: ae({
        "--dc-results-gutter-x": `${v.value.x}px`,
        "--dc-results-gutter-y": `${v.value.y}px`,
        "--dc-results-stuck": `${S.value}px`
      })
    }, [
      e.loading ? (d(), p("p", Ic, [...M[1] || (M[1] = [
        b("span", { class: "dc-results__detail" }, "Loading…", -1)
      ])])) : l.value ? (d(), q(ls, { key: 1 }, $t({ _: 2 }, [
        a["cards-before"] ? {
          name: "before",
          fn: Y(() => [
            U(k.$slots, "cards-before", {}, void 0, !0)
          ]),
          key: "0"
        } : void 0,
        a["cards-after"] ? {
          name: "after",
          fn: Y(() => [
            U(k.$slots, "cards-after", {}, void 0, !0)
          ]),
          key: "1"
        } : void 0
      ]), 1024)) : c.value?.id ? (d(), q(Ke(c.value.component), {
        key: 2,
        id: c.value.id
      }, null, 8, ["id"])) : g.value ? (d(), p("p", Bc, [
        M[2] || (M[2] = b("span", { class: "dc-results__headline" }, "Could not load results", -1)),
        b("span", Rc, T(w(n).error.value instanceof Error ? w(n).error.value.message : "The data source failed."), 1)
      ])) : !u.value && w(n).pending.value ? (d(), p("p", qc, [...M[3] || (M[3] = [
        b("span", { class: "dc-results__detail" }, "Running query…", -1)
      ])])) : u.value ? r.value ? (d(), q(Ke(r.value.component), xt(Oe({ key: 6 }, r.value.props ?? {})), null, 16)) : (d(), q(Ke(i.value), { key: 7 })) : (d(), p("div", Hc, [
        M[4] || (M[4] = b("span", { class: "dc-results__headline" }, "Nothing matches this query", -1)),
        b("span", Vc, T(w(n).summary.value), 1),
        w(n).isPristine.value ? L("", !0) : (d(), q(se, {
          key: 0,
          class: "dc-results__clear",
          href: w(n).isEverything.value ? w(n).clearHref() : w(n).entityHref(null),
          onPress: M[0] || (M[0] = (E) => w(n).isEverything.value ? w(n).clearFilters() : w(n).clearEntity())
        }, {
          default: Y(() => [
            Z(T(w(n).isEverything.value ? "Clear filters" : "Search everything instead"), 1)
          ]),
          _: 1
        }, 8, ["href"]))
      ]))
    ], 12, Nc));
  }
}), os = /* @__PURE__ */ G(Fc, [["__scopeId", "data-v-cefc7fcf"]]), Dc = ["data-dc-theme", "data-dc-value-press", "data-dc-layout"], Kc = { class: "dc-shell__main" }, Wc = {
  key: 0,
  class: "dc-shell__top"
}, zc = {
  key: 1,
  class: "dc-shell__page"
}, jc = {
  key: 1,
  class: "dc-shell__panel",
  "aria-label": "Panel"
}, Uc = {
  key: 1,
  class: "dc-shell__panel-host-actions"
}, Qc = /* @__PURE__ */ j({
  __name: "DataShell",
  props: /* @__PURE__ */ An({
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
    queryOnTop: { type: Boolean },
    hideTypePart: { type: Boolean },
    viewLabels: {},
    viewHints: {},
    accent: {},
    tokens: {},
    theme: { default: "minimal" },
    pinnable: { type: Boolean },
    selectable: { type: Boolean },
    rowPress: { default: "narrow" },
    rowLinks: { type: Boolean, default: !1 },
    pressPreview: { type: Boolean, default: !0 },
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
  emits: /* @__PURE__ */ An(["activate", "create", "duplicate", "delete", "operate", "drill", "query-change", "toggle-pin"], ["update:pinned", "update:selected"]),
  setup(e, { expose: t, emit: n }) {
    const a = e, s = n, l = On(e, "pinned"), o = On(e, "selected"), r = Ht(), i = yn(fa, null), c = a.route || i ? null : ys(), u = a.route ?? i ?? c;
    ke(() => c?.dispose?.());
    const g = H(!!r.page);
    cs(() => {
      g.value = !!r.page;
    });
    const _ = ms(u, {
      detached: () => g.value && a.pageQuery === "detached",
      path: () => a.listPath
    }), y = f(() => pl({ seed: a.schema.key })), h = f(() => a.source ?? y.value), v = Bl({
      schema: () => a.schema,
      adapter: _,
      defaults: () => a.defaults,
      navigationMode: () => a.navigationMode,
      facetNavigationMode: () => a.facetNavigationMode
    }), S = f(() => a.within?.trim() ?? ""), C = Vl({
      query: v.query,
      entity: v.entity,
      schema: f(() => a.schema),
      setExpression: v.setExpression
    });
    ne(v.query, ($) => s("query-change", $));
    const A = f(() => xl(a.schema, [v.query.value.expr])), m = f(
      () => A.value.flatMap(($) => {
        const N = a.schema.entities.find((D) => D.key === $.entityKey);
        return N ? [{ ...$, entity: N }] : [];
      })
    );
    function k() {
      if (r.record) return m.value;
      const $ = a.recordCards;
      return $ ? m.value.filter((N) => $[N.entityKey]) : [];
    }
    const M = f(() => {
      const [$, ...N] = m.value;
      if (!$ || N.length || v.entity.value !== null) return null;
      const D = a.recordViews?.[$.entityKey];
      return D ? { ...D, id: $.id } : null;
    }), E = f(() => {
      const $ = v.entity.value?.key;
      return $ && a.recordViews?.[$] || null;
    }), I = f(() => {
      const $ = a.views, D = (typeof $ == "function" ? $({ entity: v.entity.value, records: A.value }) : $) ?? (a.hostViews ? [...ot, ...Object.keys(a.hostViews)] : void 0);
      return M.value || E.value ? [...(D ?? ot).filter((ue) => ue !== "record"), "record"] : D?.filter((ue) => ue !== "record");
    }), x = f(
      () => E.value !== null && Ae(v.query.value.view, I.value) === "record"
    ), B = f(() => x.value ? 1 : a.limit), O = Rl({
      source: h,
      query: C.live,
      schema: f(() => a.schema),
      entity: v.entity,
      limit: B,
      within: S
    }), K = ql({
      // Not before the data has landed: what is there until then is no place to hold.
      active: f(() => x.value && !a.loading),
      rows: O.rows,
      pending: O.pending,
      page: f(() => C.live.value.page),
      list: f(() => {
        const { entity: $, expr: N, sort: D, dir: ue } = C.live.value;
        return JSON.stringify([$, N, D, ue]);
      }),
      locate: O.locate,
      moveTo: ($) => {
        C.drafting.value ? C.setPage($) : v.setPage($, "replace");
      }
    }), V = f(() => O.pageCount.value + (K.gone.value ? 1 : 0)), J = f(() => {
      if (M.value) return M.value;
      const $ = E.value;
      return $ ? { ...$, id: K.id.value ?? O.rows.value[0]?.id ?? null } : null;
    });
    function re($) {
      const N = E.value !== null && Ae($, I.value) === "record";
      if (N === x.value) {
        v.setView($);
        return;
      }
      const D = C.live.value.page, ue = N ? (D - 1) * a.limit + 1 : Math.ceil(D / a.limit);
      C.drafting.value ? (v.setView($), C.setPage(ue)) : v.setView($, ue);
    }
    function ye($) {
      if (!E.value || x.value) return null;
      const N = O.rows.value.indexOf($);
      return N === -1 ? null : O.offset.value + N + 1;
    }
    ne(
      [V, O.pending, v.query, C.drafting, () => a.loading, g, K.holding],
      () => {
        if (O.pending.value || C.drafting.value || a.loading || g.value) return;
        const $ = V.value;
        v.query.value.page <= $ || (K.gone.value ? K.moveTo($) : K.holding.value || v.setPage($, "replace"));
      },
      // Immediately, since a pasted URL is past the end before anything changes;
      // and after the render, so the correction is a navigation the mounted shell
      // makes rather than one it makes on the way up. An async source is still
      // pending here and corrects itself when its count lands.
      { immediate: !0, flush: "post" }
    );
    const me = f(() => new Set(l.value));
    function He($) {
      const N = new Set(me.value);
      N.has($.id) ? N.delete($.id) : N.add($.id), l.value = [...N], s("toggle-pin", $);
    }
    const le = f(() => {
      const $ = (D) => !!D.scope && D.standing !== !1, N = v.entity.value;
      return N ? $(N) : a.schema.entities.some($);
    }), Xe = f(() => {
      if (a.selectable === !0 || le.value) return !0;
      const $ = v.entity.value;
      return !!($?.duplicate || $?.delete || $?.operations?.some((N) => N.selection !== !1));
    }), ge = f(() => new Set(o.value));
    function fe($) {
      const N = a.schema.entities.find((D) => D.key === $.entityKey) ?? v.entity.value;
      return La(N, $);
    }
    const Je = /* @__PURE__ */ new Map();
    function Jt($) {
      const N = new Set(ge.value);
      N.has($.id) ? N.delete($.id) : (N.add($.id), Je.set($.id, fe($))), o.value = [...N];
    }
    function Ze($) {
      const N = new Set(ge.value);
      for (const D of O.rows.value)
        $ ? (N.add(D.id), Je.set(D.id, fe(D))) : N.delete(D.id);
      o.value = [...N];
    }
    const Ve = f(() => {
      const $ = new Map(O.rows.value.map((N) => [N.id, N]));
      return o.value.map((N) => {
        const D = $.get(N);
        return D ? fe(D) : Je.get(N) ?? null;
      }).filter((N) => N !== null);
    });
    function Ee($) {
      const N = Ve.value;
      if (!N.length) return;
      const D = $l(v.query.value.expr, N, $);
      $e(), v.setExpression(D);
    }
    function $e() {
      o.value.length && (o.value = []);
    }
    const P = f(() => ({
      ids: [...o.value],
      rows: O.rows.value.filter(($) => ge.value.has($.id)),
      entity: v.entity.value
    }));
    ne(() => v.query.value.entity, $e);
    function R($, N, D = {}, ue) {
      const Tn = ln(a.schema, v.query.value, $, D, ue);
      D.exclude ? v.narrow(Tn, N?.key ?? v.query.value.entity) : C.release(() => v.narrow(Tn, N?.key ?? null, N ? void 0 : "cards")), s("drill", $, N, D);
    }
    function z($) {
      return a.rowPress === "narrow" && At(a.schema, $) !== null;
    }
    function F($) {
      return a.schema.entities.find((D) => D.key === $.entityKey)?.href?.($) || null;
    }
    const Fe = he(null);
    ne(v.query, () => {
      Fe.value = null;
    });
    const ve = Sl({
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
      setPage: ($, N) => {
        const D = K.step($);
        D !== null && (C.drafting.value ? C.setPage(D) : v.setPage(D, N));
      },
      setView: re,
      schema: f(() => a.schema),
      entities: f(() => a.schema.entities),
      rows: O.rows,
      total: O.total,
      matched: O.matched,
      limit: B,
      offset: O.offset,
      pageCount: V,
      peek: O.peek,
      pending: O.pending,
      counting: O.counting,
      error: O.error,
      source: h,
      previewsPerType: f(() => a.previewsPerType),
      within: S,
      loading: f(() => a.loading),
      recordView: J,
      hostViews: f(() => a.hostViews ?? {}),
      pinnable: f(() => a.pinnable === !0),
      isPinned: ($) => me.value.has($.id),
      isPinnedId: ($) => me.value.has($),
      togglePin: He,
      selectable: Xe,
      selection: P,
      isSelected: ($) => ge.value.has($.id),
      toggleSelect: Jt,
      selectPage: Ze,
      clearSelection: $e,
      standable: le,
      selectionTerms: Ve,
      standSelection: Ee,
      narrowsOnPress: f(() => a.rowPress === "narrow"),
      rowLinks: f(() => a.rowLinks),
      pressPreview: a.pressPreview ? Fe : void 0,
      /*
       * The one place a press is read, so every view gets the same answer without
       * knowing which of the two it is: they all call this.
       */
      activate: ($, N = {}) => {
        if (z($)) {
          R($, null, N);
          return;
        }
        const D = ye($);
        if (D !== null) {
          C.drafting.value ? (v.setView("record"), C.setPage(D)) : v.setView("record", D);
          return;
        }
        const ue = F($);
        if (ue) {
          window.open(ue, "_blank", "noopener");
          return;
        }
        s("activate", $);
      },
      pressHref: ($) => {
        if (z($)) return v.narrowHref(ln(a.schema, v.query.value, $), null, "cards");
        const N = ye($);
        return N !== null ? v.hrefFor({ view: "record", page: N }) : F($) ?? a.activateHref?.($) ?? null;
      },
      recordHref: F,
      drillHref: ($, N, D) => At(a.schema, $) ? v.narrowHref(
        ln(a.schema, v.query.value, $, {}, D),
        N?.key ?? null,
        N ? void 0 : "cards"
      ) : null,
      create: ($) => s("create", $),
      createHref: ($) => a.createHref?.($) ?? null,
      duplicate: () => s("duplicate", P.value),
      delete: () => s("delete", P.value),
      operate: ($) => s("operate", $, P.value),
      drill: R
    });
    Ml({ theme: () => a.theme, accent: () => a.accent, tokens: () => a.tokens });
    const kt = f(() => {
      if (!(!a.accent && !a.tokens))
        return { ...a.tokens, ...a.accent ? { "--dc-accent": a.accent } : {} };
    }), Mn = H(null), Zt = H(0);
    let en = null;
    Ge(() => {
      const $ = Mn.value;
      $ && (Zt.value = $.getBoundingClientRect().width, !(typeof ResizeObserver > "u") && (en = new ResizeObserver(([N]) => {
        Zt.value = N.contentRect.width;
      }), en.observe($)));
    }), ke(() => en?.disconnect());
    const et = f(() => a.layout === "panel"), En = f(() => et.value && a.queryOnTop === !0), tn = f(() => !et.value && a.oneStripFrom !== !1 && Zt.value >= a.oneStripFrom), nn = f(
      () => Ae(v.query.value.view, I.value) === "record" && J.value?.strip === !1
    ), an = f(() => ({
      views: I.value,
      selectionPlacement: a.selectionPlacement,
      pagesNote: a.pagesNote
    }));
    return t({
      query: v.query
    }), ($, N) => (d(), p("div", {
      ref_key: "root",
      ref: Mn,
      class: "dc-shell",
      "data-dc-theme": e.theme,
      "data-dc-value-press": e.valuePress,
      "data-dc-layout": e.layout,
      style: ae(kt.value)
    }, [
      et.value ? L("", !0) : (d(), p("div", {
        key: 0,
        class: oe(["dc-shell__head", { "dc-shell__head--one-strip": tn.value }])
      }, [
        Q(Ct, null, $t({ _: 2 }, [
          r.page ? void 0 : {
            name: "lead",
            fn: Y(() => [
              Q(ta, {
                views: I.value,
                "type-chooser": e.typeChooser
              }, null, 8, ["views", "type-chooser"])
            ]),
            key: "0"
          },
          r.brand ? {
            name: "brand",
            fn: Y((D) => [
              U($.$slots, "brand", xt(us(D)), void 0, !0)
            ]),
            key: "1"
          } : void 0,
          r.actions ? {
            name: "actions",
            fn: Y(() => [
              U($.$slots, "actions", {}, void 0, !0)
            ]),
            key: "2"
          } : void 0
        ]), 1024),
        tn.value && !r.page && !nn.value ? (d(), q(Pt, xt(Oe({ key: 0 }, an.value)), null, 16)) : L("", !0)
      ], 2)),
      b("div", Kc, [
        En.value ? (d(), p("div", Wc, [
          U($.$slots, "top-lead", {}, void 0, !0),
          Q(Ct, {
            top: "",
            "hide-type": e.hideTypePart
          }, null, 8, ["hide-type"])
        ])) : L("", !0),
        r.page ? (d(), p("div", zc, [
          U($.$slots, "page", {
            query: w(ve).query.value
          }, void 0, !0)
        ])) : L("", !0),
        !et.value && !tn.value && !r.page && !nn.value ? (d(), q(Pt, xt(Oe({ key: 2 }, an.value)), null, 16)) : L("", !0),
        r.page ? L("", !0) : U($.$slots, "results", {
          rows: w(ve).rows.value,
          total: w(ve).total.value,
          offset: w(ve).offset.value,
          pageCount: w(ve).pageCount.value,
          query: w(ve).liveQuery.value,
          pending: w(ve).pending.value,
          loading: e.loading
        }, () => [
          Q(os, {
            views: I.value,
            loading: e.loading
          }, $t({ _: 2 }, [
            r["cards-before"] || k().length ? {
              name: "cards-before",
              fn: Y(() => [
                (d(!0), p(W, null, X(k(), (D) => (d(), p(W, {
                  key: `${D.entityKey}:${D.id}`
                }, [
                  r.record ? U($.$slots, "record", {
                    id: D.id,
                    entity: D.entity
                  }, void 0, !0, 0) : (d(), q(Ke(e.recordCards?.[D.entityKey]), {
                    key: 1,
                    id: D.id
                  }, null, 8, ["id"]))
                ], 64))), 128)),
                U($.$slots, "cards-before", {}, void 0, !0)
              ]),
              key: "0"
            } : void 0,
            r["cards-after"] ? {
              name: "cards-after",
              fn: Y(() => [
                U($.$slots, "cards-after", {}, void 0, !0)
              ]),
              key: "1"
            } : void 0
          ]), 1032, ["views", "loading"])
        ], !0, 3)
      ]),
      et.value ? (d(), p("aside", jc, [
        U($.$slots, "panel-head", {}, void 0, !0),
        En.value ? r.actions ? (d(), p("div", Uc, [
          U($.$slots, "actions", {}, void 0, !0)
        ])) : L("", !0) : (d(), q(Ct, {
          key: 0,
          panel: "",
          "hide-type": e.hideTypePart
        }, $t({ _: 2 }, [
          r.actions ? {
            name: "actions",
            fn: Y(() => [
              U($.$slots, "actions", {}, void 0, !0)
            ]),
            key: "0"
          } : void 0
        ]), 1032, ["hide-type"])),
        r.page ? L("", !0) : (d(), q(ta, {
          key: 2,
          views: I.value,
          "type-chooser": e.typeChooser,
          labels: e.viewLabels,
          hints: e.viewHints,
          stacked: ""
        }, null, 8, ["views", "type-chooser", "labels", "hints"])),
        !r.page && A.value.length === 0 ? (d(), q(mr, { key: 3 })) : L("", !0),
        U($.$slots, "panel", {
          query: w(ve).query.value
        }, void 0, !0),
        !r.page && !nn.value ? (d(), q(Pt, Oe({
          key: 4,
          class: "dc-shell__panel-actions"
        }, an.value), null, 16)) : L("", !0),
        U($.$slots, "panel-end", {
          query: w(ve).query.value
        }, void 0, !0)
      ])) : L("", !0)
    ], 12, Dc));
  }
}), Gc = /* @__PURE__ */ G(Qc, [["__scopeId", "data-v-c56f4612"]]), Yc = ["data-dc-span", "data-dc-muted", "data-dc-collapsed"], Xc = ["data-dc-collapsible"], Jc = ["aria-expanded", "aria-controls"], Zc = { class: "dc-shell-card__sr" }, eu = {
  key: 0,
  class: "dc-shell-card__identity"
}, tu = { class: "dc-shell-card__title dc-shell-card__name" }, nu = {
  key: 0,
  class: "dc-shell-card__ref dc-mono"
}, au = {
  key: 1,
  class: "dc-shell-card__title"
}, su = {
  key: 2,
  class: "dc-shell-card__count dc-mono"
}, lu = {
  key: 1,
  class: "dc-shell-card__aside"
}, ou = ["data-dc-flush"], ru = /* @__PURE__ */ j({
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
    const n = e, a = t, s = H(n.defaultCollapsed === !0), l = f(() => n.span === "all" ? { gridColumn: "1 / -1" } : void 0), o = Ht();
    function r(x) {
      return i(x?.() ?? []);
    }
    function i(x) {
      return x.some((B) => B.type === ds ? !1 : B.type === fs ? String(B.children ?? "").trim().length > 0 : B.type === W ? i(B.children ?? []) : !0);
    }
    const c = f(
      () => !!n.title || !!n.name || u.value || r(o.head)
    ), u = f(() => r(o.aside)), g = f(() => r(o.default)), _ = f(() => r(o.foot)), y = f(
      () => !!n.name && (!!n.reference || r(o.reference))
    ), h = f(() => n.collapsible === !0 && c.value), v = f(() => h.value && (n.collapsed ?? s.value));
    function S() {
      const x = !v.value;
      s.value = x, a("update:collapsed", x);
    }
    const C = Vt() ?? "dc-shell-card", A = `${C}-body`, m = `${C}-foot`, k = f(
      () => [g.value ? A : "", _.value ? m : ""].filter(Boolean).join(" ") || void 0
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
    ].join(", "), E = H(null);
    function I(x) {
      if (!h.value) return;
      const B = x.target?.closest(M);
      B && E.value?.contains(B) || typeof window < "u" && window.getSelection()?.toString() || S();
    }
    return (x, B) => (d(), p("section", {
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
          "aria-controls": k.value,
          onClick: S
        }, [
          B[0] || (B[0] = b("svg", {
            class: "dc-shell-card__chevron",
            viewBox: "0 0 10 10",
            "aria-hidden": "true"
          }, [
            b("path", { d: "M2 3.5 5 6.5 8 3.5" })
          ], -1)),
          b("span", Zc, T(e.name || e.title || "Card"), 1)
        ], 8, Jc)) : L("", !0),
        U(x.$slots, "head", {}, () => [
          e.name ? (d(), p("div", eu, [
            b("h2", tu, T(e.name), 1),
            y.value ? (d(), p("span", nu, [
              U(x.$slots, "reference", {}, () => [
                Z(T(e.reference), 1)
              ], !0)
            ])) : L("", !0)
          ])) : (d(), p("h2", au, T(e.title), 1)),
          e.count !== void 0 ? (d(), p("span", su, T(e.count), 1)) : L("", !0)
        ], !0),
        u.value ? (d(), p("span", lu, [
          U(x.$slots, "aside", {}, void 0, !0)
        ])) : L("", !0)
      ], 8, Xc)) : L("", !0),
      g.value ? Mt((d(), p("div", {
        key: 1,
        id: A,
        class: "dc-shell-card__body",
        "data-dc-flush": e.flush ? "true" : "false"
      }, [
        U(x.$slots, "default", {}, void 0, !0)
      ], 8, ou)), [
        [Nn, !v.value]
      ]) : L("", !0),
      _.value ? Mt((d(), p("footer", {
        key: 2,
        id: m,
        class: "dc-shell-card__foot"
      }, [
        U(x.$slots, "foot", {}, void 0, !0)
      ], 512)), [
        [Nn, !v.value]
      ]) : L("", !0)
    ], 12, Yc));
  }
}), ud = /* @__PURE__ */ G(ru, [["__scopeId", "data-v-c84525aa"]]), iu = ["aria-label"], cu = ["aria-checked", "data-dc-active", "tabindex", "onClick", "onKeydown"], uu = /* @__PURE__ */ j({
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
      (d(!0), p(W, null, X(e.options, (i, c) => (d(), p("button", {
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
      }, T(i.label), 43, cu))), 128))
    ], 8, iu));
  }
}), du = /* @__PURE__ */ G(uu, [["__scopeId", "data-v-63fb5482"]]), fu = { class: "dc-fact__label" }, vu = ["title"], pu = /* @__PURE__ */ j({
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
      b("dt", fu, [
        U(s.$slots, "label", {}, () => [
          Z(T(e.label), 1)
        ], !0)
      ]),
      b("dd", {
        class: "dc-fact__value dc-mono",
        title: e.title
      }, [
        U(s.$slots, "default", {}, () => [
          n.value.length === 1 ? (d(), p(W, { key: 0 }, [
            Z(T(n.value[0]), 1)
          ], 64)) : (d(!0), p(W, { key: 1 }, X(n.value, (o, r) => (d(), p("span", {
            key: r,
            class: "dc-fact__line"
          }, T(o), 1))), 128))
        ], !0)
      ], 8, vu)
    ], 4));
  }
}), hu = /* @__PURE__ */ G(pu, [["__scopeId", "data-v-1f6d25e6"]]), yu = /* @__PURE__ */ j({
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
      (d(!0), p(W, null, X(e.items, (l, o) => (d(), q(hu, {
        key: `${o}:${l.label}`,
        label: l.label,
        value: l.value,
        title: l.title,
        wide: l.wide
      }, null, 8, ["label", "value", "title", "wide"]))), 128)),
      U(a.$slots, "default", {}, void 0, !0)
    ], 4));
  }
}), dd = /* @__PURE__ */ G(yu, [["__scopeId", "data-v-17455afa"]]), mu = { class: "dc-counts" }, gu = ["data-dc-tone"], _u = {
  key: 0,
  class: "dc-counts__empty"
}, wu = /* @__PURE__ */ j({
  __name: "StatusCounts",
  props: {
    counts: {},
    empty: { default: be }
  },
  setup(e) {
    const t = e, n = f(() => t.counts.filter((a) => a.count > 0));
    return (a, s) => (d(), p("span", mu, [
      (d(!0), p(W, null, X(n.value, (l) => (d(), p("span", {
        key: l.label,
        class: "dc-counts__count",
        "data-dc-tone": l.tone ?? "neutral"
      }, T(l.count) + " " + T(l.label), 9, gu))), 128)),
      n.value.length === 0 ? (d(), p("span", _u, T(e.empty), 1)) : L("", !0)
    ]));
  }
}), fd = /* @__PURE__ */ G(wu, [["__scopeId", "data-v-5553a9e2"]]), ku = ["data-dc-copied", "title", "aria-label"], bu = {
  key: 0,
  class: "dc-copy__mark",
  viewBox: "0 0 16 16",
  "aria-hidden": "true"
}, $u = {
  key: 1,
  class: "dc-copy__mark",
  viewBox: "0 0 16 16",
  "aria-hidden": "true"
}, xu = 1500, Su = /* @__PURE__ */ j({
  __name: "CopyButton",
  props: {
    text: {},
    label: { default: "Copy to clipboard" }
  },
  emits: ["copied", "error"],
  setup(e, { emit: t }) {
    const n = e, a = t, s = H(!1);
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
      }, xu), a("copied", r);
    }
    return ke(() => clearTimeout(l)), (r, i) => (d(), p("button", {
      type: "button",
      class: "dc-copy",
      "data-dc-copied": s.value ? "true" : "false",
      title: s.value ? "Copied" : e.label,
      "aria-label": e.label,
      onClick: o
    }, [
      s.value ? (d(), p("svg", $u, [...i[1] || (i[1] = [
        b("path", { d: "M3 8.5l3.2 3L13 4.5" }, null, -1)
      ])])) : (d(), p("svg", bu, [...i[0] || (i[0] = [
        b("rect", {
          x: "5.5",
          y: "5.5",
          width: "8",
          height: "9",
          rx: "1.5"
        }, null, -1),
        b("path", { d: "M10.5 3.5v-1a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h1" }, null, -1)
      ])]))
    ], 8, ku));
  }
}), Cu = /* @__PURE__ */ G(Su, [["__scopeId", "data-v-f4249d7f"]]), Pu = ["data-dc-copy", "data-dc-wrap", "data-dc-tone"], Mu = /* @__PURE__ */ j({
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
        U(r.$slots, "default", {}, () => [
          Z(T(e.code), 1)
        ], !0)
      ], 4),
      e.copy ? (d(), q(Cu, {
        key: 0,
        class: "dc-code__copy",
        text: o,
        label: e.copyLabel,
        onCopied: i[0] || (i[0] = (c) => a("copied", c)),
        onError: i[1] || (i[1] = (c) => a("error", c))
      }, null, 8, ["label"])) : L("", !0)
    ], 8, Pu));
  }
}), vd = /* @__PURE__ */ G(Mu, [["__scopeId", "data-v-67b371dd"]]), Eu = 24, Tu = /* @__PURE__ */ j({
  __name: "ShellLog",
  props: {
    fetchChunk: {},
    stripAnsi: { type: Boolean },
    maxHeight: { default: "460px" }
  },
  setup(e, { expose: t }) {
    const n = e, a = H(""), s = f(() => n.stripAnsi ? Cs(a.value) : a.value), l = H(null);
    let o = 0, r = null;
    function i() {
      return r ??= c().finally(() => {
        r = null;
      }), r;
    }
    async function c() {
      const { chunk: _, offset: y } = await n.fetchChunk(o);
      if (o = y, !_) return;
      const h = l.value, v = !h || h.scrollTop + h.clientHeight >= h.scrollHeight - Eu;
      a.value += _, v && (await lt(), l.value && (l.value.scrollTop = l.value.scrollHeight));
    }
    function u() {
      a.value = "", o = 0;
    }
    const g = f(() => n.maxHeight === void 0 ? void 0 : { maxHeight: typeof n.maxHeight == "number" ? `${n.maxHeight}px` : n.maxHeight });
    return t({ poll: i, reset: u }), (_, y) => (d(), p("pre", {
      ref_key: "pane",
      ref: l,
      class: "dc-log dc-mono",
      style: ae(g.value)
    }, T(s.value), 5));
  }
}), pd = /* @__PURE__ */ G(Tu, [["__scopeId", "data-v-2c86947e"]]), Lu = ["data-dc-theme"], Ou = ["aria-labelledby", "aria-label"], Au = {
  key: 1,
  class: "dc-dialog__actions"
}, nt = [], Nu = /* @__PURE__ */ j({
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
    const n = e, a = t, { theme: s, style: l, adopt: o } = Cn(n), r = `${Vt() ?? "dc-dialog"}-title`, i = H(null);
    function c() {
      a("close"), a("update:open", !1);
    }
    const u = Symbol("dc-dialog");
    function g(m) {
      m.key !== "Escape" || m.defaultPrevented || nt[nt.length - 1] === u && (m.preventDefault(), c());
    }
    let _ = !1;
    function y(m) {
      _ = m.target === m.currentTarget;
    }
    function h(m) {
      m.target === m.currentTarget && _ && c(), _ = !1;
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
      nt.push(u), document.addEventListener("keydown", g), S = document.activeElement instanceof HTMLElement ? document.activeElement : null, o(), await lt(), (i.value?.querySelector("[autofocus]") ?? i.value?.querySelector(v) ?? i.value)?.focus();
    }
    function A() {
      const m = nt.indexOf(u);
      m !== -1 && (nt.splice(m, 1), document.removeEventListener("keydown", g), S?.isConnected && S.focus(), S = null);
    }
    return Ge(() => {
      n.open && C();
    }), ne(
      () => n.open,
      (m) => {
        m ? C() : A();
      }
    ), ke(A), (m, k) => e.open ? (d(), q(qt, {
      key: 0,
      to: e.to
    }, [
      b("div", {
        class: "dc-shell dc-layer dc-dialog",
        "data-dc-theme": w(s),
        style: ae(w(l)),
        onPointerdown: y,
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
          }, T(e.title), 1)) : L("", !0),
          b("div", {
            class: oe(["dc-dialog__body", e.bodyClass])
          }, [
            U(m.$slots, "default", {}, void 0, !0)
          ], 2),
          m.$slots.actions ? (d(), p("div", Au, [
            U(m.$slots, "actions", {}, void 0, !0)
          ])) : L("", !0)
        ], 10, Ou)
      ], 44, Lu)
    ], 8, ["to"])) : L("", !0);
  }
}), hd = /* @__PURE__ */ G(Nu, [["__scopeId", "data-v-0cccf313"]]), Iu = 4500, Bu = 9e3, ht = H([]);
let oa = 0;
function rs(e) {
  ht.value = ht.value.filter((t) => t.id !== e);
}
function is(e, t = "ok") {
  oa += 1;
  const n = oa;
  ht.value = [...ht.value, { id: n, message: e, kind: t }], setTimeout(() => rs(n), t === "err" ? Bu : Iu);
}
function Ru(e) {
  is(e instanceof Error ? e.message : String(e), "err");
}
function qu() {
  return { toasts: vs(ht), toast: is, toastError: Ru, dismiss: rs };
}
const Hu = ["data-dc-theme"], Vu = ["data-dc-kind", "role"], Fu = /* @__PURE__ */ j({
  __name: "ShellToasts",
  props: {
    to: { default: "body" },
    theme: { default: void 0 },
    accent: { default: void 0 },
    tokens: { default: void 0 }
  },
  setup(e) {
    const t = e, { toasts: n } = qu(), { theme: a, style: s, adopt: l } = Cn(t);
    return Ge(l), (o, r) => (d(), q(qt, { to: e.to }, [
      b("div", {
        class: "dc-shell dc-layer dc-toasts",
        "data-dc-theme": w(a),
        style: ae(w(s)),
        "aria-live": "polite"
      }, [
        (d(!0), p(W, null, X(w(n), (i) => (d(), p("div", {
          key: i.id,
          class: "dc-toast",
          "data-dc-kind": i.kind,
          role: i.kind === "err" ? "alert" : void 0
        }, T(i.message), 9, Vu))), 128))
      ], 12, Hu)
    ], 8, ["to"]));
  }
}), yd = /* @__PURE__ */ G(Fu, [["__scopeId", "data-v-d970211c"]]), Du = ["aria-label"], Ku = ["data-dc-standing", "data-dc-active", "aria-checked", "title", "aria-label", "onClick"], Wu = /* @__PURE__ */ j({
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
      (d(!0), p(W, null, X(s.value, (c) => (d(), p("button", {
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
      }, T(c.sign), 9, Ku))), 128))
    ], 8, Du));
  }
}), md = /* @__PURE__ */ G(Wu, [["__scopeId", "data-v-5524dca6"]]);
function gd(e, t) {
  const n = H(!1);
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
  return Rt(() => {
    s = !0, o();
  }, !0), { start: c, stop: o, polling: n };
}
function _d(e, t = {}) {
  const n = t.key ?? ((l) => JSON.stringify(l)), a = he();
  let s = null;
  return ps(() => {
    const l = e(), o = n(l);
    o !== s && (s = o, a.value = l);
  }), a;
}
function wd(e = {}) {
  return { key: "ordinal", kind: "ordinal", label: "#", width: "52px", ...e };
}
function kd(e = {}) {
  return { key: "status", role: "state", kind: "status", label: "State", sort: "state", width: "104px", ...e };
}
function bd(e = {}) {
  return { key: "tint", role: "tint", ...e };
}
function $d(e = {}) {
  return { key: "picture", role: "image", kind: "image", width: "56px", height: "40px", ...e };
}
function xd(e, t = {}) {
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
function Sd(e, t = {}) {
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
function Cd(e, t, n = {}) {
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
function Pd(e, t, n = {}) {
  return { key: e, kind: "date", label: t, sort: e, mono: !0, muted: !0, ...n };
}
function Md(e = {}) {
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
function Ed(e, t, n = {}) {
  return { key: e, label: t, sort: e, truncate: !0, hideBelow: 900, ...n };
}
function Td(e, t, n, a = {}) {
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
function Xt(e) {
  return typeof e == "number" ? e : typeof e == "string" && e.trim() !== "" ? Number(e) : Number.NaN;
}
function Ld(e) {
  const t = Xt(e);
  return Number.isFinite(t) && t > 0 ? bs(t) : be;
}
function Od(e) {
  const t = Xt(e);
  return Number.isFinite(t) && t > 0 ? $s(t) : be;
}
function Ad(e) {
  const t = Xt(e);
  return Number.isFinite(t) && t > 0 ? xs(t) : be;
}
function Nd(e) {
  const t = Xt(e);
  return Number.isFinite(t) ? Ss(t) : be;
}
function zu(e) {
  if (e <= 0) return 0;
  const t = 10 ** Math.floor(Math.log10(e));
  for (const n of [1, 2, 5])
    if (e <= n * t) return n * t;
  return 10 * t;
}
function ju(e, t) {
  const n = /* @__PURE__ */ new Set();
  for (const a of e) {
    const s = a.fields[t];
    for (const l of Array.isArray(s) ? s : [s])
      typeof l == "string" && l && n.add(l);
  }
  return [...n].sort((a, s) => a.localeCompare(s));
}
function Uu(e, t) {
  let n = 0;
  for (const a of e) {
    const s = a.fields[t];
    typeof s == "number" && s > n && (n = s);
  }
  return n;
}
function Id(e, t, n, a = {}) {
  return {
    kind: "chips",
    key: t,
    label: n,
    options: ju(e, t),
    ...a.multiple ? { multiple: !0 } : {}
  };
}
function Bd(e, t, n) {
  return { kind: "range", key: t, label: n, min: 0, max: zu(Uu(e, t)) };
}
function Rd(e, t, n) {
  return { kind: "toggle", key: e, label: t, text: n };
}
function qd(e) {
  return e.filter((t) => t.kind === "chips" ? t.options.length > 1 : t.kind === "range" ? t.max > 0 : !0);
}
function Hd(e = "", t = "/") {
  const n = H(ce(e)), a = H(t), s = [`${a.value}${n.value}`];
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
function ra(e) {
  const t = e.indexOf("?");
  if (t === -1) return "";
  const n = e.slice(t), a = n.indexOf("#");
  return ce(a === -1 ? n : n.slice(0, a));
}
function Vd(e) {
  const t = H(ra(e.currentRoute.value.fullPath)), n = f(() => e.currentRoute.value.path), a = ne(
    () => e.currentRoute.value.fullPath,
    (s) => {
      t.value = ra(s);
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
function Fd(e, t, n = "/") {
  return (a) => {
    const s = a.params[t], l = Array.isArray(s) ? s.join("/") : s ?? "", o = a.query[Be], r = typeof o == "string" ? o : "", i = `${e}="${l.replace(/"/g, "")}"`;
    return { path: n, query: { ...a.query, [Be]: Ue(r, i) } };
  };
}
function Dd(e, t = "/") {
  return (n) => ({ path: t, query: { ...n.query, [Ye]: e } });
}
function Kd(e) {
  const t = /* @__PURE__ */ new Map();
  for (const n of e) {
    const a = t.get(n.entityKey);
    a ? a.push(n) : t.set(n.entityKey, [n]);
  }
  return {
    query(n) {
      return Pa(n, (a) => t.get(a.key) ?? [], {
        undatedLast: !0,
        zeroIsAll: !0
      });
    }
  };
}
function Wd(e, t) {
  return e.query({ ...t, limit: Number.MAX_SAFE_INTEGER, offset: 0 }).rows;
}
const Qu = {
  DataShell: Gc,
  ShellHeader: Ct,
  RecordActions: Pt,
  ResultsArea: os,
  SegmentedControl: du,
  StatusPill: Qe,
  ListView: hn,
  CardsView: Ga,
  GridView: Ya,
  ImagesView: Xa,
  TableView: ss,
  LinksView: Ja,
  PreviewView: Za,
  TypeCardsView: ls
}, zd = {
  install(e, t = {}) {
    const n = t.prefix ?? "";
    for (const [a, s] of Object.entries(Qu))
      e.component(`${n}${a}`, s);
    t.route && e.provide(fa, t.route), (t.theme || t.accent || t.tokens) && Pl({ theme: t.theme, accent: t.accent, tokens: t.tokens }, e);
  }
};
export {
  Zu as COLUMN_BREAKPOINTS,
  Ju as COLUMN_ROLES,
  Ga as CardsView,
  la as ColumnCell,
  Cu as CopyButton,
  Ys as DEFAULT_ENTITY_VIEW,
  un as DEFAULT_SORT,
  cn as DEFAULT_VIEW,
  Hl as DRAFT_DELAY,
  Gc as DataShell,
  be as EMPTY_CELL,
  Ea as ENTITY_ALL,
  ze as ENTITY_TERM,
  pt as EXPRESSION_TERM,
  Ya as GridView,
  zd as HeaderContentLayoutPlugin,
  Xa as ImagesView,
  Ja as LinksView,
  hn as ListView,
  Tt as MOCK_TINTS,
  mt as MetricDrill,
  _t as OpenMark,
  $n as PARAM_DIR,
  Ye as PARAM_ENTITY,
  Be as PARAM_EXPR,
  jt as PARAM_PAGE,
  bn as PARAM_SORT,
  zt as PARAM_VIEW,
  Xu as PILL_TONES,
  jl as POPOVER_FLIP_BELOW,
  Wl as POPOVER_GAP,
  zl as POPOVER_MARGIN,
  Pn as PinStar,
  Za as PreviewView,
  gt as QueryMark,
  at as RECORD_STATUSES,
  kn as RESULT_FIELDS,
  fa as ROUTE_ADAPTER_KEY,
  Pt as RecordActions,
  ta as RecordChoosers,
  os as ResultsArea,
  Va as SHELL_CONTEXT_KEY,
  Nt as SHELL_THEME_KEY,
  wt as ScopeMark,
  du as SegmentedControl,
  qe as SelectTick,
  ud as ShellCard,
  vd as ShellCode,
  hd as ShellDialog,
  hu as ShellFact,
  dd as ShellFacts,
  Ct as ShellHeader,
  pd as ShellLog,
  Ro as ShellPager,
  Yl as ShellPopover,
  yd as ShellToasts,
  md as StandingControl,
  fd as StatusCounts,
  Qe as StatusPill,
  Bu as TOAST_ERROR_MS,
  Iu as TOAST_MS,
  ss as TableView,
  ls as TypeCardsView,
  Un as VIEW_ICONS,
  ot as VIEW_KINDS,
  jn as VIEW_LABELS,
  Ue as addTerm,
  _n as andExpression,
  Ld as bytesCell,
  pa as cellFull,
  Gi as cellNarrowings,
  Me as cellText,
  St as cellTextOf,
  ie as cellValue,
  ll as changesResults,
  Id as chipsFrom,
  Bn as columnAlign,
  Rn as columnClass,
  In as columnKey,
  as as columnNarrows,
  yt as columnShortcut,
  _a as columnShortcutOf,
  rn as columnTruncates,
  Ps as columnsFor,
  ya as compactShortcuts,
  so as completeDraft,
  sl as countPages,
  ys as createHistoryAdapter,
  Hd as createMemoryAdapter,
  Kd as createMemoryDataSource,
  pl as createMockDataSource,
  Vd as createVueRouterAdapter,
  Pd as dateColumn,
  Ts as defaultCellText,
  Et as defaultQuery,
  Ie as defaultViewFor,
  ms as detachableAdapter,
  ln as drillExpression,
  Od as durationCell,
  Ad as elapsedCell,
  nl as emptyFacetValue,
  gl as entityAddress,
  Md as entityColumn,
  ut as entityCount,
  Dd as entityRedirect,
  Na as excludingTerm,
  rt as expandShortcuts,
  Ed as facetColumn,
  vt as facetField,
  Ka as facetValue,
  Hs as fieldHeading,
  Aa as fieldTerm,
  dt as findEntity,
  Ta as findEntityByAddress,
  Pe as findSort,
  Td as flagColumn,
  st as fnv1a,
  $a as focusEntity,
  bs as formatBytes,
  Ne as formatCount,
  ws as formatDate,
  ed as formatDateTime,
  Ft as formatDigits,
  $s as formatDuration,
  xs as formatElapsed,
  de as formatExpression,
  De as formatInteger,
  _s as formatMetric,
  ks as formatOrdinal,
  Ss as formatPercent,
  Is as formatRange,
  we as formatTerm,
  vl as generateRows,
  Ol as hasActiveFacets,
  xd as identityColumn,
  rd as idsExpression,
  We as isBuiltinView,
  ad as isEntityScoped,
  al as isFacetActive,
  wn as isPristineQuery,
  je as isRangeTerm,
  Sa as isTypeCardsQuery,
  ba as isViewKind,
  nd as joinExpression,
  Sn as liftTerm,
  Ks as matchesExpression,
  Cd as metricColumn,
  id as narrowPatch,
  Ws as negateTerm,
  zu as niceMax,
  ce as normalizeSearch,
  Qi as numberRange,
  js as oppositeTerm,
  wd as ordinalColumn,
  ee as parseExpression,
  kl as parseQuery,
  Nd as percentCell,
  $d as pictureColumn,
  Ul as placePopover,
  wr as presentParts,
  Qa as presentRow,
  ft as pressOptions,
  Sl as provideShellContext,
  Pl as provideShellTheme,
  Wd as queryAll,
  Bd as rangeFrom,
  Dt as rangeOf,
  Gs as readDraft,
  od as readExpression,
  Fd as recordRedirect,
  Oa as recordTerm,
  xl as recordsIn,
  Sd as referenceColumn,
  ct as refineExpression,
  Ae as resolveView,
  pe as roleColumn,
  va as roleColumns,
  Es as rowKey,
  it as sameTerm,
  Qt as scopeTerm,
  At as scopeTermFor,
  qa as scopedEntity,
  ld as searchFromQuery,
  Xs as searchesCorpus,
  Gn as serializeQuery,
  _l as sortAddress,
  Wt as sortsFor,
  td as splitExpression,
  La as standingTerm,
  kd as stateColumn,
  Cs as stripAnsi,
  Il as summarizeQuery,
  It as summaryTerms,
  Ia as termStanding,
  bd as tintColumn,
  sd as tintFor,
  Rd as toggleFacet,
  Di as useColumns,
  Vl as useDraft,
  Ua as useEntityCounts,
  vc as useEntityPreviews,
  Cn as useLayerTheme,
  gd as usePoll,
  Re as usePresentedRows,
  Bl as useQueryState,
  Kl as useRecordNames,
  Rl as useResults,
  te as useShellContext,
  _d as useStableSchema,
  qu as useToasts,
  qd as usefulFacets,
  Js as viewAcross,
  Zs as viewAfter,
  Wa as withFacetValue,
  bl as withStanding,
  $l as withStandings,
  Yn as withWhere,
  cd as withoutFacet,
  Ra as withoutOwnScope,
  zs as withoutTerm
};
