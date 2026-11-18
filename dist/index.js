import { ref as q, computed as f, inject as hn, provide as mn, getCurrentInstance as ia, shallowRef as he, toValue as Te, watch as ne, onScopeDispose as It, getCurrentScope as ca, defineComponent as j, onMounted as Ge, onBeforeUnmount as ke, openBlock as u, createBlock as H, Teleport as Bt, createElementVNode as b, mergeProps as Ce, unref as w, renderSlot as G, createCommentVNode as O, nextTick as st, createElementBlock as p, withKeys as Oe, useSlots as Rt, useId as Ht, normalizeClass as oe, withCtx as Y, toDisplayString as L, createTextVNode as Z, Fragment as z, renderList as X, withModifiers as xe, withDirectives as Ct, normalizeStyle as ae, vModelText as ua, createVNode as U, reactive as Tn, toHandlers as yn, resolveDynamicComponent as Ke, createSlots as bt, normalizeProps as $t, useModel as On, onBeforeUpdate as is, guardReactiveProps as cs, mergeModels as An, vShow as Nn, Comment as us, Text as ds, readonly as fs, watchEffect as vs } from "vue";
import { MenuList as ps } from "menu-bar";
const lt = ["list", "cards", "grid", "images", "table", "links", "preview"], nt = ["ok", "running", "queued", "review", "failed"], Uu = [...nt, "neutral", "accent"], Qu = [
  "identity",
  "reference",
  "metric",
  "state",
  "updated",
  "image",
  "tint"
], Gu = [480, 620, 760, 900, 1100], da = Symbol("dc.routeAdapter");
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
function fa(e, t) {
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
function In(e, t) {
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
function Ee(e, t) {
  const n = ie(e, t);
  return e.format ? e.format(n, t) : Es(n, e.kind);
}
function Ls(e) {
  return typeof e == "number" ? Number.isFinite(e) ? String(e) : "" : typeof e == "string" ? e : Array.isArray(e) ? e.join(", ") : "";
}
function va(e, t) {
  const n = Ee(e, t), a = Ls(ie(e, t));
  return a && a !== n ? a : n;
}
function xt(e, t) {
  return e ? Ee(e, t) : "";
}
function Bn(e) {
  return e.align ? e.align : e.kind === "number" || e.kind === "ordinal" ? "right" : "left";
}
const Ts = {
  ordinal: "dc-table__num",
  number: "dc-table__number",
  date: "dc-table__date",
  status: "dc-table__state"
};
function Rn(e) {
  return [Ts[e.kind ?? "text"], e.class].filter(Boolean).join(" ");
}
function ln(e) {
  if (e.truncate !== void 0) return e.truncate;
  const t = e.kind ?? "text";
  return t === "text" || t === "number" || t === "date";
}
const Os = /^([A-Za-z_][\w.-]*)\s*(>=|<=|:|=|>|<)\s*(.*)$/, Hn = "-?(?:\\d+\\.?\\d*|\\.\\d+)", As = new RegExp(`^(${Hn})?\\.\\.(${Hn})?$`);
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
const Pe = (e) => e.toLowerCase().replace(/\s+/g, ""), pa = [
  ["status", "state"],
  ["state", "state"],
  ["updated", "updated"],
  ["date", "updated"],
  ["name", "identity"],
  ["ref", "reference"]
];
function Bs(e, t, n) {
  const a = Pe(e), s = n.columns ?? [];
  if (a === "entity") return t.entityKey;
  if (e in t.fields) return t.fields[e];
  const l = s.find(
    (c) => c.key?.toLowerCase() === e.toLowerCase() || c.field?.toLowerCase() === e.toLowerCase() || c.label !== void 0 && Pe(c.label) === a
  );
  if (l) return ie(l, t);
  const o = n.facets.find(
    (c) => c.key.toLowerCase() === a || Pe(c.label) === a
  );
  if (o && o.key in t.fields) return t.fields[o.key];
  const r = pa.find(([c]) => c === a)?.[1];
  if (r) {
    const c = pe(s, r);
    if (c) return ie(c, t);
  }
  const i = /^metric(\d+)$/.exec(a);
  if (i) {
    const c = fa(s, "metric")[Number(i[1]) - 1];
    if (c) return ie(c, t);
  }
}
function ht(e) {
  return (e.toLowerCase().match(/[\p{L}\p{N}]+/gu) ?? []).map((t) => t.charAt(0)).join("");
}
const qn = /^[a-z_][\w.-]*$/;
function Ft(e) {
  const t = (e.key ?? e.field)?.toLowerCase();
  if (t !== void 0) return qn.test(t) ? t : void 0;
  const n = e.label === void 0 ? void 0 : Pe(e.label);
  return n !== void 0 && qn.test(n) ? n : void 0;
}
function gn(e, t) {
  const n = Pe(e);
  return !!t?.entities.some((a) => a.scope && Pe(a.scope) === n);
}
function Rs(e, t, n) {
  const a = Pe(e);
  if (a === "entity" || pa.some(([l]) => l === a) || /^metric\d+$/.test(a) || gn(e, n)) return !0;
  const s = (l) => l !== void 0 && Pe(l) === a;
  return (t.columns ?? []).some(
    (l) => s(l.key) || s(l.field) || s(l.label)
  ) || t.facets.some((l) => s(l.key) || s(l.label));
}
function ot(e, t, n) {
  return t ? ma(e, (a) => {
    const s = ya(a, t, n);
    return s && Ft(s);
  }) : e;
}
function ha(e, t, n) {
  return t ? ma(e, (a) => {
    if (gn(a, n)) return;
    const s = (t.columns ?? []).find((l) => Ft(l) === a);
    return s && ga(s, t, n);
  }) : e;
}
function Hs(e, t, n) {
  if (!t || gn(e, n)) return;
  const a = t.facets.find((s) => s.key.toLowerCase() === e);
  return a ? a.label : (t.columns ?? []).find((s) => Ft(s) === e)?.label;
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
function ya(e, t, n) {
  if (!(!e || Rs(e, t, n)))
    return (t.columns ?? []).find(
      (a) => a.label !== void 0 && ht(a.label) === e
    );
}
function ga(e, t, n) {
  if (!t || e.label === void 0 || !Ft(e)) return;
  const a = ht(e.label);
  return ya(a, t, n) === e ? a : void 0;
}
function nn(e, t) {
  const n = e.toLowerCase(), a = t.toLowerCase();
  if (!a.includes("*")) return n.includes(a);
  const s = a.replace(/[.+?^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*");
  return new RegExp(s).test(n);
}
function Vn(e, t) {
  return e.toLowerCase() === t.toLowerCase();
}
function qs(e, t, n, a) {
  if (e.kind === "text") {
    const i = n.columns ?? [];
    return ["identity", "reference"].some((c) => {
      const d = pe(i, c), m = d ? ie(d, t) : void 0;
      return typeof m == "string" && nn(m, e.value);
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
      (c) => e.comparator === "=" ? Vn(String(c), e.value) : nn(String(c), e.value)
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
    return e.comparator === "=" ? Vn(String(s), e.value) : nn(String(s), e.value);
  }
  const o = Number(e.value), r = typeof s == "number" ? s : Number(s);
  return !Number.isFinite(o) || !Number.isFinite(r) ? null : Vs(e.comparator, r, o);
}
function Fn(e, t, n, a) {
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
function Dn(e) {
  return e.kind === "field" && !e.negated && (e.comparator === ":" || e.comparator === "=") && !je(e);
}
const Kn = /* @__PURE__ */ new WeakMap();
function Fs(e) {
  if (!e?.strictScopes) return null;
  let t = Kn.get(e);
  return t || (t = new Set(
    e.entities.flatMap((n) => n.scope ? [n.scope.toLowerCase()] : [])
  ), Kn.set(e, t)), t;
}
function Ds(e, t, n, a) {
  if (!e.length) return !0;
  const s = Fs(a);
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
const zn = (e, t) => e.toLowerCase() === t.toLowerCase();
function rt(e, t) {
  return !!e.negated == !!t.negated && _a(e, t);
}
function zs(e, t) {
  return !!e.negated != !!t.negated && _a(e, t);
}
function _a(e, t) {
  return e.kind === "field" ? t.kind === "field" && e.field === t.field && e.comparator === t.comparator && zn(e.value, t.value) : t.kind === "text" && zn(e.value, t.value);
}
function js(e, t) {
  return t.filter((n) => !e.some((a) => rt(a, n)));
}
function _n(e, t) {
  return wa(e, t, (n) => n);
}
function it(e, t) {
  return wa(
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
function wa(e, t, n) {
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
  const s = (o) => o && ka(o) ? o : void 0;
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
function ka(e) {
  return typeof e == "string" && (e === "record" || lt.includes(e) || Zs.test(e));
}
const Zs = /^[a-z][a-z0-9-]*$/;
function We(e) {
  return e === "record" || lt.includes(e);
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
function ba(e, t = {}) {
  const n = ut(e, t.entity), a = e.entities[0];
  if (!n && !a) throw new Error(`Schema "${e.key}" declares no entities`);
  return n ?? a;
}
function $a(e, t = null) {
  return e?.columns ?? t?.columns ?? [];
}
function Dt(e, t = null) {
  if (e?.sorts?.length) return e.sorts;
  const n = /* @__PURE__ */ new Set(), a = [];
  for (const s of $a(e, t))
    !s.sort || n.has(s.sort) || (n.add(s.sort), a.push({ key: s.sort, label: (s.label ?? s.sort).toLowerCase() }));
  return a;
}
const el = { key: rn, label: rn };
function Me(e, t, n = null) {
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
function wn(e) {
  return e.entity === null && e.expr.trim() === "";
}
function Zu(e) {
  return e.entity !== null;
}
function xa(e, t) {
  return e.entity === null && Ae(e.view, t) === "cards";
}
function al(e, t) {
  return t <= 0 ? 1 : Math.max(1, Math.ceil(e / t));
}
function Pt(e, t = {}) {
  const a = t.landing === "entity" ? ba(e, t) : null;
  return {
    entity: a?.key ?? null,
    view: Ie(a?.key ?? null, t),
    sort: Me(a, t.sort).key,
    dir: t.dir === "asc" ? "asc" : "desc",
    expr: "",
    page: 1
  };
}
const kn = ["entity", "sort", "dir", "expr"];
function sl(e) {
  return kn.some((t) => t in e);
}
const Sa = (e) => e.kind === "date" || e.role === "updated";
function ll(e) {
  if (!e) return () => 0;
  const n = (e.kind ?? "text") === "number" || e.role === "metric", a = Sa(e);
  return (s, l) => {
    const o = ie(e, s), r = ie(e, l);
    return n ? Number(r ?? 0) - Number(o ?? 0) : a ? Date.parse(String(r ?? "")) - Date.parse(String(o ?? "")) : String(r ?? "").localeCompare(String(o ?? ""));
  };
}
function Qn(e, t) {
  return !t || !Sa(t) ? !1 : !Number.isFinite(Date.parse(String(ie(t, e) ?? "")));
}
function Ca({ query: e, schema: t, entity: n, limit: a, offset: s }, l, o) {
  const r = ee(e.expr), i = n ? [n] : t.entities;
  let c = 0;
  const d = [];
  for (const S of i)
    for (const C of l(S))
      c += 1, Ds(r, C, S, t) && d.push(C);
  const m = Me(n, e.sort, t), _ = $a(n, t).find((S) => S.sort === m.key), h = o.undatedLast ? d.filter((S) => !Qn(S, _)) : d, y = o.undatedLast ? d.filter((S) => Qn(S, _)) : [];
  h.sort(ll(_)), e.dir === "asc" && h.reverse();
  const v = y.length ? [...h, ...y] : h;
  return {
    // One page out of the middle. `total` stays the whole match, which is what
    // the shell counts pages with.
    rows: o.zeroIsAll && a <= 0 ? v.slice(s) : v.slice(s, s + a),
    total: d.length,
    unfiltered: d.length === c
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
function Pa(e, t) {
  return `${e}_${1e4 + t * 7}`;
}
const ol = 7, rl = 3;
function il(e, t, n, a) {
  const s = (t * ol + at(n)) % a, l = [];
  for (let o = 0; o < Math.min(rl, a); o++)
    l.push(Pa(e, (s + o) % a));
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
    const c = l[i % l.length], d = Math.floor(i / l.length), m = at(`${a}:${e.key}:${c[0]}:${i}`), _ = Pa(e.key, i), h = new Date(s.getTime() - m % 900 * 36e5).toISOString(), y = {};
    for (const v of e.columns ?? []) {
      const S = v.field ?? v.key;
      if (!S || v.value) continue;
      const C = dl(v, {
        hash: at(`${m}:${S}`),
        sample: c,
        revision: d,
        updatedAt: h
      });
      C !== void 0 && (y[S] = C);
    }
    for (const v of e.facets)
      y[v.key] = cl(v, at(`${m}:${v.key}`));
    for (const [v, S] of o)
      y[v] = S === e.key ? _ : il(S, i, v, n);
    r.push({ id: _, entityKey: e.key, entityLabel: e.label, fields: y });
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
      return Ca(a, (s) => n(s, a.schema), {
        undatedLast: !1,
        zeroIsAll: !1
      });
    }
  };
}
const Ye = "e", Kt = "v", bn = "s", $n = "d", Be = "q", Wt = "p", Ma = "*", pl = [
  Ye,
  Kt,
  bn,
  $n,
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
function Ea(e, t) {
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
  const a = Pt(t, n), s = new Map(xn(e)), l = s.get(Ye), o = l === void 0 ? a.entity : _e(l), r = o === Ma ? null : Ea(t, o), i = s.get(Be), c = i === void 0 ? "" : ot(_e(i), r, t), d = s.get(Kt), m = d && ka(_e(d)) ? _e(d) : Ie(r?.key ?? null, n, c, t), _ = s.get(bn), h = Me(
    r,
    _ ? _l(_e(_), Dt(r, t)) : n.sort,
    t
  ), y = s.get($n), v = y ? _e(y) === "asc" ? "asc" : "desc" : a.dir, S = s.get(Wt), C = S === void 0 ? 1 : Number(_e(S)), A = Number.isFinite(C) ? Math.max(1, Math.floor(C)) : 1;
  return {
    entity: r?.key ?? null,
    view: m,
    sort: h.key,
    dir: v,
    expr: c,
    page: A
  };
}
function Gn(e, t, n = {}, a = "") {
  const s = Pt(t, n), l = ut(t, e.entity), o = xn(a).filter(([m]) => !ml(m)), r = [], i = (m, _) => r.push([m, Et(_)]), c = l?.key ?? null;
  if (c !== s.entity && i(Ye, l ? yl(l, t) : Ma), e.view !== Ie(c, n, e.expr, t) && i(Kt, e.view), e.sort !== s.sort) {
    const m = Dt(l, t), _ = m.find((h) => h.key === e.sort);
    i(bn, _ ? gl(_, m) : e.sort);
  }
  e.dir !== s.dir && i($n, e.dir), e.expr.trim() !== "" && i(Be, ha(e.expr, l, t)), e.page > 1 && i(Wt, String(e.page));
  const d = [
    ...o.map(([m, _]) => [Et(m), _]),
    ...r
  ];
  return d.length ? `?${d.map(([m, _]) => _ === "" ? m : `${m}=${_}`).join("&")}` : "";
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
  const n = new Map(xn(e)), a = n.get(Be), s = a === void 0 ? "" : _e(a);
  if (!t) return s;
  const l = n.get(Ye);
  return ot(
    s,
    l === void 0 ? null : Ea(t, _e(l)),
    t
  );
}
function jt(e, t) {
  return Ta(e, t.id);
}
function La(e, t) {
  return e?.standing === !1 ? null : jt(e, t);
}
function Ta(e, t) {
  const n = e?.scope;
  return n ? Oa(n, t) : null;
}
function Oa(e, t) {
  return `${e}="${t.replace(/"/g, "")}"`;
}
function ad(e, t) {
  const n = typeof e == "string" ? e : e?.scope;
  if (!n) return null;
  const a = t.filter((s) => s.replace(/"/g, "") !== "").map((s) => Oa(n, s));
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
function Aa(e) {
  if (!e) return null;
  const t = e.trim();
  return t ? t.startsWith("-") ? t.slice(1) : `-${t}` : null;
}
function Na(e, t) {
  if (!t || !e.trim()) return null;
  const [n] = ee(t).flat();
  if (!n) return null;
  const a = ee(e).flat();
  return a.some((s) => Ut(s, n)) ? n.negated ? "out" : "in" : a.some((s) => Lt(s, n)) ? n.negated ? "in" : "out" : null;
}
function Sn(e, t) {
  if (!t || !e.trim()) return e;
  const [n] = ee(t).flat();
  if (!n) return e;
  const a = ee(e), s = a.map(
    (l) => l.filter((o) => !Ut(o, n) && !Lt(o, n))
  );
  return s.every((l, o) => l.length === a[o]?.length) ? e : de(s);
}
function kl(e, t, n) {
  return t ? n === null ? Sn(e, t) : Ue(e, n === "out" ? Aa(t) : t) : e;
}
function bl(e, t, n) {
  const a = t.filter(Boolean), s = () => a.reduce((i, c) => kl(i, c, n), e);
  if (n !== "in") return s();
  const l = /* @__PURE__ */ new Map();
  for (const i of a) {
    const [c] = ee(i).flat();
    if (!c) continue;
    const d = c.kind === "field" ? c.field : "";
    l.set(d, [...l.get(d) ?? [], c]);
  }
  if (l.size <= 1) return s();
  const o = a.reduce((i, c) => Sn(i, c), e), r = o.trim() ? ee(o) : [[]];
  return de(r.flatMap((i) => [...l.values()].map((c) => [...i, ...c])));
}
function cn(e, t) {
  const n = t.shiftKey ? `noopener,popup,width=${window.outerWidth},height=${window.outerHeight}` : "noopener";
  window.open(e, "_blank", n);
}
function Ia() {
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
  if (a.exclude) return Yn(Ue(t.expr, Aa(l)), s);
  const o = l !== null && e.entities.find((r) => r.key === n.entityKey)?.narrowsAlone === !0;
  return Yn(Ue(o ? "" : t.expr, l), s);
}
function Yn(e, t) {
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
      return [...i, ...n.filter((c) => !i.some((d) => rt(d, c)))];
    })
  );
}
function Ba(e, t) {
  const n = e?.scope?.toLowerCase();
  if (!n || e?.keepsScope || !t.trim()) return t;
  const a = ee(t), s = a.map(
    (l) => l.filter((o) => o.kind !== "field" || o.field !== n)
  );
  return s.every((l, o) => l.length === a[o]?.length) ? t : de(s);
}
function Ra(e, t) {
  const n = t.toLowerCase();
  return e.entities.find((a) => a.scope?.toLowerCase() === n) ?? null;
}
function Ha(e, t, n) {
  if (!t || !n) return null;
  const a = Ra(e, t);
  return a ? { entity: a, id: n } : null;
}
function $l(e, t) {
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
function sd(e, t, n = "cards") {
  return {
    // An expression with nothing in it is no parameter, as the shell writes it.
    [Be]: Ue(e, t) || void 0,
    [Ye]: void 0,
    [Kt]: n,
    [Wt]: void 0
  };
}
const qa = Symbol("dc.shellContext");
function xl(e) {
  const t = e.liveQuery ? e : Sl(e);
  return mn(qa, t), t;
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
  const e = hn(qa, null);
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
      theme: Te(e.theme),
      accent: Te(e.accent),
      tokens: Te(e.tokens)
    })
  };
}
function Cl(e, t) {
  t ? t.provide(Ot, dn(e)) : mn(Ot, dn(e));
}
function Pl(e) {
  const t = ia();
  mn(Ot, {
    ...dn(e),
    element: () => t?.proxy?.$el ?? null
  });
}
function Cn(e) {
  const t = ia(), n = hn(Ot, null), a = he(null);
  function s() {
    const i = t?.proxy?.$el, d = (i instanceof Element ? i : i?.parentElement)?.closest(".dc-shell");
    if (!d) {
      a.value = null;
      return;
    }
    const m = {};
    for (const _ of Array.from(d.style))
      _.startsWith("--") && (m[_] = d.style.getPropertyValue(_));
    a.value = { shell: d, theme: d.dataset.dcTheme, tokens: m };
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
function Va(e, t) {
  if (e.kind !== "field" || e.negated || e.field !== ft(t)) return !1;
  const n = e.comparator === ":" || e.comparator === "=";
  switch (t.kind) {
    case "range":
      return je(e) || Ml.has(e.comparator);
    case "chips":
      return n && !je(e) && Fa(t.options, e.value) !== void 0;
    case "toggle":
      return n && El(e.value);
  }
}
function Fa(e, t) {
  const n = t.toLowerCase();
  return e.find((a) => a.toLowerCase() === n);
}
function El(e) {
  const t = e.toLowerCase();
  return t === "true" || t === "yes";
}
function Da(e, t) {
  const n = (ee(e)[0] ?? []).filter((a) => Va(a, t));
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
      const a = new Set(n.map((s) => Fa(t.options, s.value)));
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
function Ka(e, t, n) {
  const a = Ll(t, n), s = ee(e), l = (s.length ? s : [[]]).map((o) => [
    ...o.filter((r) => !Va(r, t)),
    ...a
  ]);
  return de(l);
}
function ld(e, t) {
  return Ka(e, t, tl(t));
}
function Tl(e, t) {
  return (t?.facets ?? []).some((n) => nl(Da(e, n)));
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
        address: ha(we(o), t, n),
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
  if (wn(e)) {
    const l = Me(t, e.sort, n);
    return `everything · ${e.view} · ${l.label}`;
  }
  const a = At(e, t).filter((l) => l.facetKey !== vt).map((l) => l.label), s = e.expr.trim();
  return s && a.push(`"${s}"`), a.join(" · ");
}
function Il(e) {
  const { adapter: t } = e, n = f(() => Te(e.schema)), a = f(() => Te(e.defaults) ?? {}), s = f(() => wl(t.search.value, n.value, a.value)), l = f(() => ut(n.value, s.value.entity)), o = f(() => l.value ?? ba(n.value, a.value)), r = f(() => Dt(l.value, n.value)), i = f(() => Me(l.value, s.value.sort, n.value)), c = (g, k) => {
    const M = Gn(g, n.value, a.value, t.search.value);
    return M === t.search.value && !t.elsewhere?.value ? !1 : (k === "push" ? t.push(M) : t.replace(M), !0);
  }, d = () => Te(e.navigationMode) ?? "push", m = () => Te(e.facetNavigationMode) ?? "replace", _ = (g, k) => c(h(g), k), h = (g) => {
    const k = g.page ?? (sl(g) ? 1 : s.value.page), M = { ...s.value, ...g, page: k };
    return g.view === void 0 && (M.view = Js(s.value, M, a.value, n.value)), M;
  }, y = (g) => v(h(g)), v = (g) => {
    const k = Gn(g, n.value, a.value, t.search.value);
    return t.href ? t.href(k) : `${t.path.value}${k}`;
  }, S = (g, k) => {
    const M = l.value?.facets.find((I) => I.key === g);
    if (!M) return;
    const E = Ka(s.value.expr, M, k(Da(s.value.expr, M)));
    _({ expr: E }, m());
  }, C = (g) => {
    const k = g === null ? null : ut(n.value, g);
    return (k?.key ?? null) === s.value.entity ? {} : {
      entity: k?.key ?? null,
      sort: Me(k, s.value.sort, n.value).key
    };
  }, A = (g) => {
    const k = C(g);
    Object.keys(k).length && _(k, d());
  };
  return {
    query: s,
    entity: l,
    focus: o,
    sort: i,
    sorts: r,
    summary: f(() => Nl(s.value, l.value, n.value)),
    terms: f(() => At(s.value, l.value, n.value)),
    isPristine: f(() => wn(s.value)),
    isEverything: f(() => s.value.entity === null),
    hasFacets: f(() => Tl(s.value.expr, l.value)),
    setEntity: A,
    entityHref: (g) => y(C(g)),
    clearEntity: () => A(null),
    setView(g, k) {
      _(k === void 0 ? { view: g } : { view: g, page: Math.max(1, Math.floor(k)) }, d());
    },
    setSort(g) {
      _({ sort: Me(l.value, g, n.value).key }, d());
    },
    toggleDirection() {
      _({ dir: s.value.dir === "desc" ? "asc" : "desc" }, d());
    },
    setExpression(g) {
      return _({ expr: g }, d());
    },
    narrow(g, k, M) {
      return _({ expr: g, ...C(k), ...M ? { view: M } : {} }, d());
    },
    narrowHref(g, k, M) {
      return y({ expr: g, ...C(k), ...M ? { view: M } : {} });
    },
    setPage(g, k) {
      _({ page: Math.max(1, Math.floor(g)) }, k ?? d());
    },
    setFacet(g, k) {
      S(g, () => k);
    },
    toggleChip(g, k) {
      S(g, (M) => M.kind !== "chips" ? M : { kind: "chips", selected: M.selected.includes(k) ? M.selected.filter((I) => I !== k) : [...M.selected, k] });
    },
    setRange(g, k, M) {
      S(g, (E) => E.kind === "range" ? { kind: "range", min: k, max: M } : E);
    },
    toggleFlag(g) {
      S(
        g,
        (k) => k.kind === "toggle" ? { kind: "toggle", on: !k.on } : k
      );
    },
    removeTerm(g) {
      if (g.facetKey === ze) {
        A(null);
        return;
      }
      if (g.facetKey === vt) {
        const k = Ws(ee(s.value.expr), g.group ?? 0, g.index ?? 0);
        _({ expr: de(k) }, d());
      }
    },
    clearFilters() {
      _({ ...C(null), expr: "" }, d());
    },
    clearHref: () => y({ ...C(null), expr: "" }),
    reset() {
      c(Pt(n.value, a.value), d());
    },
    homeHref: () => v(Pt(n.value, a.value)),
    // The same rule the mutations follow, so a link built for a change goes
    // exactly where clicking through to that change would have gone.
    hrefFor: (g) => y(g)
  };
}
const Xn = 50;
function Bl(e) {
  const t = he([]), n = q(0), a = q(0), s = q(!1), l = q(!1), o = he(null);
  let r = 0, i = null, c = null;
  const d = f(() => (e.query.value.page - 1) * e.limit.value), m = f(() => al(n.value, e.limit.value)), _ = f(() => Math.max(0, n.value - a.value)), h = () => {
    const $ = e.query.value, B = e.within?.value.trim(), T = Ba(e.entity.value, $.expr);
    return B ? { ...$, expr: _n(B, T) } : T === $.expr ? $ : { ...$, expr: T };
  }, y = ($, B) => {
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
  }, g = () => {
    const $ = ++r;
    A();
    const B = k.value, T = i?.key === B ? i.total : void 0;
    l.value = T === void 0;
    const K = {
      query: h(),
      schema: e.schema.value,
      entity: e.entity.value,
      limit: e.limit.value,
      offset: d.value
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
      y(J, B), s.value = !1;
      return;
    }
    s.value = !0, J.then((re) => {
      $ === r && y(re, B);
    }).catch((re) => {
      $ === r && S(re);
    }).finally(() => {
      $ === r && (s.value = !1);
    });
  }, k = f(() => {
    const $ = h();
    return `${e.entity.value?.key ?? e.schema.value.entities[0]?.key ?? ""}|${JSON.stringify(kn.map((T) => $[T]))}`;
  }), M = f(() => `${k.value}|${e.query.value.page}`);
  return ne([e.source, M, e.limit], g, {
    immediate: !0
  }), It(() => {
    r++, A();
  }, !0), { rows: t, total: n, matched: _, offset: d, pageCount: m, pending: s, counting: l, error: o, refresh: g, locate: async ($, B) => {
    const T = Math.max(0, B - 1 - Xn);
    try {
      const { rows: K } = await e.source.value.query({
        query: h(),
        schema: e.schema.value,
        entity: e.entity.value,
        limit: Xn * 2 + 1,
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
        query: h(),
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
    const i = ++n, c = await e.locate(r.id, r.page), d = c === null && r.next ? await e.locate(r.next, r.page) : null;
    if (i !== n || t.value?.id !== r.id || t.value.page !== r.page) return;
    const m = e.rows.value[0]?.id;
    c !== null ? o(c, !1) : d === null ? t.value = { ...r, gone: !0, next: m } : d !== r.page && o(d);
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
    () => JSON.stringify([r.value, ...kn.map((h) => e.query.value[h])])
  ), d = he(null), m = f(() => {
    const h = e.query.value;
    if (!i.value) return h;
    const y = d.value?.of === c.value ? d.value.page : 1;
    return { ...h, expr: it(h.expr, r.value), page: y };
  });
  ne(n, (h) => {
    if (o(), !h.trim()) {
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
  const _ = (h) => {
    o(), s = !0, n.value = "", !h() && s && (s = !1, a.value = "");
  };
  return ca() && It(o), {
    text: n,
    live: m,
    drafting: i,
    setPage(h) {
      d.value = { of: c.value, page: Math.max(1, Math.floor(h)) };
    },
    commit() {
      const h = n.value.trim();
      if (!h) return;
      const y = it(
        e.query.value.expr,
        ot(h, e.entity.value, e.schema?.value)
      );
      a.value = h, _(() => e.setExpression(y));
    },
    abandon() {
      o(), s = !1, n.value = "", a.value = "";
    },
    release: _
  };
}
const Vl = 25, Wa = (e, t) => e.toLowerCase() === t.toLowerCase();
function Fl(e, t) {
  return e.find((n) => Wa(n.id, t));
}
function Dl(e) {
  const t = he(/* @__PURE__ */ new Map()), n = /* @__PURE__ */ new Set(), a = (r) => {
    if (r.facetKey !== vt) return null;
    const i = Ha(e.schema.value, r.field, r.value);
    return i ? { ...i, key: `${i.entity.key}:${i.id}` } : null;
  }, s = (r) => {
    const { entity: i, id: c } = r, d = e.query.value;
    return e.source.value.query({
      query: {
        ...d,
        entity: i.key,
        // The reference on its own. The rest of the query is about the rows on
        // screen, which are of another type entirely.
        expr: Ta(i, c) ?? "",
        sort: Me(i, d.sort, e.schema.value).key,
        page: 1
      },
      schema: e.schema.value,
      entity: i,
      limit: Vl,
      offset: 0
    });
  }, l = (r, i) => {
    const c = xt(pe(r.columns ?? [], "identity"), i);
    return c === be || Wa(c, i.id) ? "" : c;
  }, o = () => {
    if (e.loading.value) return;
    const r = /* @__PURE__ */ new Map();
    for (const d of e.terms.value) {
      const m = a(d);
      m && !t.value.has(m.key) && !n.has(m.key) && r.set(m.key, m);
    }
    if (!r.size) return;
    const i = [...r.values()].map((d) => ({
      reference: d,
      outcome: s(d)
    })), c = (d) => {
      const m = new Map(t.value);
      d.forEach((_, h) => {
        const { reference: y } = i[h], v = Fl(_.rows, y.id);
        m.set(y.key, v ? l(y.entity, v) : "");
      }), t.value = m;
    };
    if (i.every(({ outcome: d }) => !(d instanceof Promise))) {
      c(i.map(({ outcome: d }) => d));
      return;
    }
    for (const { reference: d } of i) n.add(d.key);
    Promise.all(i.map(({ outcome: d }) => Promise.resolve(d))).then(c).catch(() => {
    }).finally(() => {
      for (const { reference: d } of i) n.delete(d.key);
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
  }, c = r === "below" ? "above" : "below", d = i[r] < o && i[c] > i[r] ? c : r, m = Math.min(a.maxHeight ?? 1 / 0, Math.max(0, i[d])), _ = Math.max(0, n.width - l * 2), h = Math.min(a.minWidth ?? e.width, _), y = Math.min(Math.max(t, h), _), v = a.align === "end" ? e.right - y : e.left, S = Math.max(l, Math.min(v, n.width - y - l));
  return d === "below" ? { side: d, left: S, top: e.bottom + s, maxHeight: m, minWidth: h, maxWidth: _ } : { side: d, left: S, bottom: n.height - e.top + s, maxHeight: m, minWidth: h, maxWidth: _ };
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
    const n = e, a = t, { theme: s, style: l, adopt: o } = Cn(n), r = q(null), i = q(null), c = { root: () => r.value };
    function d() {
      const g = n.anchor;
      g && (i.value = jl(
        g.getBoundingClientRect(),
        r.value?.offsetWidth ?? 0,
        { width: window.innerWidth, height: window.innerHeight },
        { side: n.side, align: n.align, maxHeight: n.maxHeight, minWidth: n.minWidth }
      ));
    }
    const m = f(() => {
      const g = i.value, k = g ? {
        position: "fixed",
        left: `${g.left}px`,
        ...g.top !== void 0 ? { top: `${g.top}px` } : {},
        ...g.bottom !== void 0 ? { bottom: `${g.bottom}px` } : {},
        minWidth: `${g.minWidth}px`,
        maxWidth: `${g.maxWidth}px`,
        maxHeight: `${g.maxHeight}px`,
        overflowY: "auto"
      } : { position: "fixed", visibility: "hidden" };
      return { ...l.value, ...k };
    });
    function _() {
      a("update:open", !1), a("close");
    }
    function h(g) {
      return r.value?.contains(g) || n.anchor?.contains(g) ? !0 : Se.slice(Se.indexOf(c) + 1).some((M) => M.root()?.contains(g));
    }
    function y(g) {
      const k = g.target;
      k && !h(k) && _();
    }
    function v(g) {
      g.key !== "Escape" || g.defaultPrevented || Se[Se.length - 1] === c && (g.preventDefault(), r.value?.contains(document.activeElement) && n.anchor?.focus(), _());
    }
    let S = null;
    async function C() {
      Se.includes(c) || (Se.push(c), o(), i.value = null, await st(), d(), window.addEventListener("pointerdown", y, !0), document.addEventListener("keydown", v, !0), window.addEventListener("resize", d), window.addEventListener("scroll", d, !0), typeof ResizeObserver < "u" && r.value && (S = new ResizeObserver(() => d()), S.observe(r.value)));
    }
    function A() {
      const g = Se.indexOf(c);
      g !== -1 && (Se.splice(g, 1), window.removeEventListener("pointerdown", y, !0), document.removeEventListener("keydown", v, !0), window.removeEventListener("resize", d), window.removeEventListener("scroll", d, !0), S?.disconnect(), S = null);
    }
    return Ge(() => {
      n.open && C();
    }), ne(
      () => n.open,
      (g) => {
        g ? C() : A();
      }
    ), ne(() => n.anchor, () => {
      n.open && d();
    }), ke(A), (g, k) => e.open ? (u(), H(Bt, {
      key: 0,
      to: e.to
    }, [
      b("div", Ce({
        ref_key: "root",
        ref: r
      }, g.$attrs, {
        class: "dc-shell dc-layer dc-popover",
        "data-dc-theme": w(s),
        "data-dc-side": i.value?.side,
        style: m.value
      }), [
        G(g.$slots, "default", {}, void 0, !0)
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
      r.stopPropagation(), !Ia() && (n.href && un(r) ? cn(n.href, r) : a("press", dt(r), r));
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
    return (r, i) => e.selectable ? (u(), p("span", {
      key: 0,
      role: "link",
      tabindex: "0",
      class: "dc-press",
      onClick: s,
      onAuxclick: l,
      onKeydown: i[0] || (i[0] = Oe((c) => c.currentTarget.click(), ["enter"]))
    }, [
      G(r.$slots, "default", {}, void 0, !0)
    ], 32)) : e.href ? (u(), p("a", {
      key: 1,
      href: e.href,
      class: "dc-press",
      onClick: o
    }, [
      G(r.$slots, "default", {}, void 0, !0)
    ], 8, Yl)) : (u(), p("button", {
      key: 2,
      type: "button",
      class: "dc-press",
      onClick: o
    }, [
      G(r.$slots, "default", {}, void 0, !0)
    ]));
  }
}), se = /* @__PURE__ */ Q(Xl, [["__scopeId", "data-v-e5165a68"]]), Nt = (e) => e.toLowerCase().replace(/\s+/g, ""), Jl = /(?:[^\s"]|"[^"]*"?)*$/, Zl = /^(-?)([^:=<>"\s-][^:=<>"\s]*)([:=])(.*)$/, Jn = 4;
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
      const t = e.options.slice(0, Jn).join(" · "), n = e.options.length - Jn;
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
function Zn(e, t) {
  return Nt(e).includes(Nt(t));
}
function ao(e, t) {
  const n = Jl.exec(e)?.[0] ?? "", a = e.slice(0, e.length - n.length), s = [], l = Zl.exec(n);
  if (l) {
    const [, o, r, i, c] = l, d = eo(t, r);
    if (!d) return [];
    const m = c.replace(/"/g, "").toLowerCase();
    for (const { value: _, hint: h } of no(d)) {
      if (!_.toLowerCase().includes(m)) continue;
      const y = we({
        kind: "field",
        field: ft(d),
        comparator: i,
        value: _,
        ...o ? { negated: !0 } : {}
      });
      s.push({ draft: a + y, label: y, ...h ? { hint: h } : {}, complete: !0 });
    }
  } else {
    if (/[<>"]/.test(n)) return [];
    const o = n.startsWith("-") ? "-" : "", r = n.slice(o.length);
    for (const i of t) {
      if (r && !Zn(i.key, r) && !Zn(i.label, r)) continue;
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
      const R = Ra(s.value, P)?.scopeLabel ?? P;
      return R.charAt(0).toUpperCase() + R.slice(1);
    }
    function c(P) {
      return P.replace(/\s*\([^()]*\)\s*$/, "");
    }
    function d(P) {
      if (P.facetKey === ze) {
        const D = a.entity.value?.label;
        return D ? `${D} · ${Ne((a.matched ?? a.total).value)}` : P.label;
      }
      const R = r.nameOf(P);
      return R ? `${P.negated ? "-" : ""}${i(P.field)}: ${c(R)}` : P.label;
    }
    function m(P) {
      const R = d(P.term), W = P.idle ? `Not applied to ${a.entity.value?.label} — remove ${R}` : `Remove ${R}`, D = P.term.address;
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
    }), h = f(() => a.pressPreview?.value?.alone === !0), y = q(null);
    function v(P) {
      y.value = P instanceof HTMLInputElement ? P : null;
    }
    function S() {
      a.abandonDraft(), y.value?.blur();
    }
    function C() {
      const P = k.value[g.value];
      if (M.value && P) {
        I(P);
        return;
      }
      T.value = null, A.value = !1, a.commitDraft();
    }
    const A = q(!1), g = q(-1), k = f(() => {
      const P = a.entity.value?.facets ?? [];
      return P.length ? ao(a.draft.value, P) : [];
    }), M = f(() => A.value && k.value.length > 0);
    ne(k, () => {
      g.value = -1;
    });
    const E = `${Ht() ?? "dc-header"}-completions`;
    function I(P) {
      a.draft.value = P.draft, A.value = !P.complete, g.value = -1, st(() => {
        const R = y.value;
        R?.focus(), R?.setSelectionRange(P.draft.length, P.draft.length);
      });
    }
    function $(P, R) {
      if (P.isComposing || !k.value.length) return;
      if (P.preventDefault(), !A.value) {
        A.value = !0;
        return;
      }
      const W = k.value.length + 1;
      g.value = (g.value + 1 + R + W) % W - 1;
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
        const W = y.value;
        if (!W) return;
        const D = R === "start" ? 0 : W.value.length;
        W.setSelectionRange(D, D), W.scrollIntoView({ block: "nearest", inline: "nearest" }), Le();
      });
    }
    function me(P) {
      const R = y.value;
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
      P.target?.closest("button, input") || (P.preventDefault(), y.value?.focus(), re(o.value.length, "end"));
    }
    function Yt() {
      A.value = !1, a.draft.value || (T.value = null);
    }
    const Ze = q(null), Ve = q("");
    function Le() {
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
        $e?.disconnect(), $e = null, Le(), !(!P || typeof ResizeObserver > "u") && ($e = new ResizeObserver(Le), $e.observe(P));
      },
      { flush: "post" }
    ), ne([o, K], Le, { flush: "post" }), ke(() => $e?.disconnect()), (P, R) => (u(), p("div", {
      class: oe(["dc-header", { "dc-header--panel": n.panel }])
    }, [
      b("div", so, [
        !n.panel && s.value.label && t.brand ? (u(), H(se, {
          key: 0,
          class: "dc-header__domain",
          "data-dc-brand": "",
          title: "Home",
          href: w(a).homeHref(),
          onPress: R[0] || (R[0] = (W) => w(a).reset())
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
        }, 8, ["href"])) : !n.panel && s.value.label ? (u(), H(se, {
          key: 1,
          class: "dc-header__domain",
          title: "Home",
          href: w(a).homeHref(),
          onPress: R[1] || (R[1] = (W) => w(a).reset())
        }, {
          default: Y(() => [
            Z(L(s.value.label), 1)
          ]),
          _: 1
        }, 8, ["href"])) : O("", !0),
        G(P.$slots, "lead", {}, void 0, !0),
        l.value.length ? (u(), p("span", ro, [
          R[10] || (R[10] = b("span", { class: "dc-header__sr" }, "Within", -1)),
          (u(!0), p(z, null, X(l.value, (W) => (u(), p("span", {
            key: `scope:${W.id}`,
            class: "dc-within dc-mono dc-truncate",
            title: d(W)
          }, L(d(W)), 9, io))), 128))
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
              title: w(a).summary.value,
              onScroll: Le
            }, [
              (u(!0), p(z, null, X(V.value, (W) => (u(), p(z, {
                key: W.key
              }, [
                b("span", fo, [
                  (u(!0), p(z, null, X(W.entries, (D) => (u(), p(z, {
                    key: D.term.id
                  }, [
                    D.or ? (u(), p("span", vo, "or")) : O("", !0),
                    b("button", {
                      type: "button",
                      class: oe(["dc-term dc-mono", { "dc-term--idle": D.idle, "dc-term--leaving": h.value, "dc-term--type": D.term.facetKey === w(ze) }]),
                      title: m(D),
                      "aria-label": `Remove ${d(D.term)}`,
                      onMousedown: R[2] || (R[2] = xe(() => {
                      }, ["prevent"])),
                      onClick: (Fe) => fe(D.term, W.key === "before")
                    }, L(d(D.term)), 43, po)
                  ], 64))), 128)),
                  W.key === "before" ? (u(!0), p(z, { key: 0 }, X(_.value, (D) => (u(), p("span", {
                    key: D,
                    class: "dc-term dc-term--preview dc-mono",
                    "aria-hidden": "true"
                  }, L(D), 1))), 128)) : O("", !0)
                ]),
                W.key === "before" ? Ct((u(), p("input", {
                  key: 0,
                  ref_for: !0,
                  ref: v,
                  "onUpdate:modelValue": R[3] || (R[3] = (D) => w(a).draft.value = D),
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
                  "aria-activedescendant": M.value && g.value >= 0 ? B(g.value) : void 0,
                  onKeydown: [
                    Oe(xe(C, ["prevent"]), ["enter"]),
                    Oe(xe(S, ["prevent"]), ["esc"]),
                    R[4] || (R[4] = Oe((D) => $(D, 1), ["down"])),
                    R[5] || (R[5] = Oe((D) => $(D, -1), ["up"])),
                    ge
                  ],
                  onFocus: R[6] || (R[6] = (D) => A.value = !0),
                  onInput: R[7] || (R[7] = (D) => A.value = !0),
                  onBlur: Yt
                }, null, 46, ho)), [
                  [ua, w(a).draft.value]
                ]) : O("", !0)
              ], 64))), 128))
            ], 40, uo)
          ], 32)
        ])
      ]),
      U(Gl, {
        id: E,
        open: M.value,
        anchor: y.value,
        "min-width": 0,
        "max-height": 320,
        class: "dc-completions",
        role: "listbox",
        "aria-label": "Completions",
        onClose: R[9] || (R[9] = (W) => A.value = !1)
      }, {
        default: Y(() => [
          (u(!0), p(z, null, X(k.value, (W, D) => (u(), p("div", {
            id: B(D),
            key: W.label,
            class: oe(["dc-completion", { "dc-completion--active": D === g.value }]),
            role: "option",
            "aria-selected": D === g.value,
            onMousedown: R[8] || (R[8] = xe(() => {
            }, ["prevent"])),
            onClick: (Fe) => I(W)
          }, [
            b("span", yo, L(W.label), 1),
            W.hint ? (u(), p("span", go, L(W.hint), 1)) : O("", !0)
          ], 42, mo))), 128))
        ]),
        _: 1
      }, 8, ["open", "anchor"]),
      t.actions ? (u(), p("div", _o, [
        G(P.$slots, "actions", {}, void 0, !0)
      ])) : O("", !0)
    ], 2));
  }
}), fn = /* @__PURE__ */ Q(wo, [["__scopeId", "data-v-3a764b58"]]), ko = ["checked", "indeterminate"], za = /* @__PURE__ */ j({
  __name: "PageTick",
  setup(e) {
    const t = te(), n = f(() => t.rows.value.filter((l) => t.isSelected(l)).length), a = f(
      () => t.rows.value.length > 0 && n.value === t.rows.value.length
    ), s = f(() => n.value > 0 && !a.value);
    return (l, o) => (u(), p("input", {
      class: "dc-tick",
      type: "checkbox",
      checked: a.value,
      indeterminate: s.value,
      "aria-label": "Select every row on this page",
      title: "Select every row on this page",
      onChange: o[0] || (o[0] = (r) => w(t).selectPage(!a.value))
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
    const n = e, a = t, s = Ht() ?? "dc-pick", l = q(null), o = q(null), r = q(null), i = q(!1), c = f(() => r.value !== null), d = q(null), m = f(
      () => n.options.find((k) => k.key === n.modelValue) ?? n.options[0]
    ), _ = f(
      () => n.options.map((k) => ({
        id: k.key,
        label: k.label,
        icon: k.icon,
        checked: k.key === n.modelValue
      }))
    ), h = f(
      () => r.value ? { maxHeight: `${window.innerHeight - r.value.y - 8}px` } : void 0
    );
    function y(k) {
      const M = l.value?.getBoundingClientRect();
      M && (d.value = l.value?.closest(".dc-shell") ?? document.body, r.value = { x: M.left, y: M.bottom + 4, mirrorX: M.right }, i.value = k, a("open"));
    }
    function v(k) {
      r.value && a("close"), r.value = null, k && l.value?.focus();
    }
    function S() {
      c.value ? v(!0) : y(!1);
    }
    function C(k) {
      k.key !== "ArrowDown" && k.key !== "ArrowUp" || c.value || (k.preventDefault(), y(!0));
    }
    function A(k) {
      const M = k.target;
      M && (l.value?.contains(M) || o.value?.root?.contains(M) || v(!1));
    }
    ne(c, (k) => {
      k ? window.addEventListener("pointerdown", A, !0) : window.removeEventListener("pointerdown", A, !0);
    }), ke(() => window.removeEventListener("pointerdown", A, !0));
    function g(k) {
      v(!0), !(k.id === void 0 || k.id === n.modelValue) && a("update:modelValue", k.id);
    }
    return (k, M) => (u(), p("span", bo, [
      b("span", {
        id: `${w(s)}-name`,
        class: "dc-pick__name"
      }, L(e.label), 9, $o),
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
        m.value?.icon ? (u(), p("svg", So, [
          b("path", {
            d: m.value.icon
          }, null, 8, Co)
        ])) : O("", !0),
        b("span", Po, L(m.value?.label), 1)
      ], 42, xo),
      M[1] || (M[1] = b("svg", {
        class: "dc-pick__mark",
        viewBox: "0 0 16 16",
        "aria-hidden": "true"
      }, [
        b("path", { d: "M4 6l4 4 4-4" })
      ], -1)),
      r.value && d.value ? (u(), H(Bt, {
        key: 0,
        to: d.value
      }, [
        U(w(ps), {
          ref_key: "menu",
          ref: o,
          class: "dc-pick__list",
          style: ae(h.value),
          items: _.value,
          at: r.value,
          label: e.label,
          autofocus: i.value,
          onChoose: g,
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
      let h = `Page ${De(a.value)} of ${s.value}`;
      const y = n.rows.value.length;
      if (y) {
        const v = n.offset.value + 1, S = `${n.counting.value ? "~" : ""}${De(n.total.value)}`;
        h += ` — rows ${De(v)} to ${De(v + y - 1)} of ${S}`;
      }
      return t.pagesNote ? `${h}
${t.pagesNote}` : h;
    }), o = q(null), r = f(() => o.value ?? String(a.value)), i = f(
      () => `calc(${Math.max(2, String(n.pageCount.value).length)}ch + 10px)`
    );
    function c(h) {
      h.target.select();
    }
    function d(h) {
      const y = h.target, v = y.value.replace(/[^0-9]/g, "");
      y.value !== v && (y.value = v), o.value = v;
    }
    function m(h) {
      const y = h.target, v = Number(o.value);
      o.value = null;
      const S = Number.isFinite(v) && v >= 1 ? Math.min(Math.trunc(v), Math.max(1, n.pageCount.value)) : a.value;
      y.value = String(S), S !== a.value && n.setPage(S);
    }
    function _(h) {
      const y = h.target;
      o.value = null, y.value = String(a.value), y.blur();
    }
    return (h, y) => (u(), p("nav", Eo, [
      U(se, {
        class: "dc-pager__step",
        "aria-label": "Previous page",
        href: a.value > 1 ? w(n).hrefFor({ page: a.value - 1 }) : null,
        disabled: a.value <= 1,
        onPress: y[0] || (y[0] = (v) => w(n).setPage(a.value - 1))
      }, {
        default: Y(() => [...y[2] || (y[2] = [
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
          onInput: d,
          onKeydown: [
            Oe(xe(m, ["prevent"]), ["enter"]),
            Oe(xe(_, ["prevent"]), ["esc"])
          ],
          onBlur: m
        }, null, 44, To),
        b("span", Oo, "/ " + L(s.value), 1)
      ], 8, Lo),
      b("span", Ao, L(l.value), 1),
      U(se, {
        class: "dc-pager__step",
        "aria-label": "Next page",
        href: a.value < w(n).pageCount.value ? w(n).hrefFor({ page: a.value + 1 }) : null,
        disabled: a.value >= w(n).pageCount.value,
        onPress: y[1] || (y[1] = (v) => w(n).setPage(a.value + 1))
      }, {
        default: Y(() => [...y[3] || (y[3] = [
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
      () => (d.value || m.value) && a.value !== "table" && n.sorts.value.length > 0
    ), l = f(
      () => n.sorts.value.map((E) => ({ key: E.key, label: E.label }))
    ), o = f(() => s.value && l.value.length > 1), r = f(() => n.query.value.dir === "desc"), i = f(
      () => `Sorted by ${n.sort.value.label}, ${r.value ? "descending" : "ascending"}`
    ), c = f(() => n.entity.value), d = f(
      () => !xa(n.query.value, t.views) && a.value !== "record"
    ), m = f(() => a.value === "record" && n.query.value.entity !== null), _ = f(
      () => (d.value || m.value) && !n.loading.value && (n.pageCount.value > 1 || !!t.pagesNote)
    ), h = f(() => n.selection.value.ids.length), y = f(
      () => d.value && n.selectable.value && (n.rows.value.length > 0 || h.value > 0)
    ), v = f(() => a.value === "table"), S = f(
      () => s.value || _.value || d.value && (y.value || !!(c.value?.create || c.value?.duplicate || c.value?.delete || c.value?.operations?.length))
    ), C = f(() => h.value ? `${h.value} selected` : v.value ? "" : "Select all"), A = f(() => t.selectionPlacement === "end"), g = f(() => n.selectionTerms.value.length), k = (E) => g.value ? `${E} ${g.value}` : E;
    function M(E) {
      return h.value ? E.endsWith("…") ? `${E.slice(0, -1)} ${h.value}…` : `${E} ${h.value}` : E;
    }
    return (E, I) => S.value ? (u(), p("div", {
      key: 0,
      class: oe(["dc-actions", { "dc-actions--selection-end": A.value }])
    }, [
      s.value ? (u(), p("span", Bo, [
        o.value ? (u(), H(vn, {
          key: 0,
          class: "dc-actions__pick dc-actions__sort",
          label: "Sort",
          "model-value": w(n).sort.value.key,
          options: l.value,
          "onUpdate:modelValue": w(n).setSort
        }, null, 8, ["model-value", "options", "onUpdate:modelValue"])) : O("", !0),
        U(se, {
          class: "dc-actions__dir",
          "aria-label": i.value,
          title: i.value,
          href: w(n).hrefFor({ dir: r.value ? "asc" : "desc" }),
          onPress: I[0] || (I[0] = ($) => w(n).toggleDirection())
        }, {
          default: Y(() => [
            Z(L(r.value ? "↓" : "↑"), 1)
          ]),
          _: 1
        }, 8, ["aria-label", "title", "href"])
      ])) : O("", !0),
      y.value && C.value ? (u(), p("div", Ro, [
        v.value ? (u(), p("span", Vo, L(C.value), 1)) : (u(), p("label", Ho, [
          U(za),
          b("span", qo, L(C.value), 1)
        ])),
        h.value ? (u(), p("button", {
          key: 2,
          type: "button",
          class: oe(["dc-actions__clear", { "dc-actions__clear--op": A.value }]),
          onClick: I[1] || (I[1] = ($) => w(n).clearSelection())
        }, " Clear ", 2)) : O("", !0)
      ])) : O("", !0),
      b("div", Fo, [
        c.value?.create ? (u(), H(se, {
          key: 0,
          class: "dc-actions__op dc-actions__new",
          href: w(n).createHref?.(c.value),
          onPress: I[2] || (I[2] = ($) => w(n).create(c.value))
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
        d.value && w(n).standable.value ? (u(), p(z, { key: 1 }, [
          b("button", {
            type: "button",
            class: "dc-actions__op",
            "data-dc-operation": "include",
            title: g.value ? `Narrow the query to the ${g.value} ticked` : "Tick rows to narrow the query to them",
            disabled: !g.value,
            onClick: I[3] || (I[3] = ($) => w(n).standSelection("in"))
          }, L(k("Include")), 9, Do),
          b("button", {
            type: "button",
            class: "dc-actions__op",
            "data-dc-operation": "exclude",
            title: g.value ? `Leave the ${g.value} ticked out of the query` : "Tick rows to leave them out of the query",
            disabled: !g.value,
            onClick: I[4] || (I[4] = ($) => w(n).standSelection("out"))
          }, L(k("Exclude")), 9, Ko)
        ], 64)) : O("", !0),
        c.value?.duplicate ? (u(), p("button", {
          key: 2,
          type: "button",
          class: "dc-actions__op",
          disabled: !h.value,
          onClick: I[5] || (I[5] = ($) => w(n).duplicate())
        }, L(M(c.value.duplicate)), 9, Wo)) : O("", !0),
        (u(!0), p(z, null, X(c.value?.operations ?? [], ($) => (u(), p("button", {
          key: $.key,
          type: "button",
          class: "dc-actions__op",
          "data-dc-operation": $.key,
          disabled: !h.value && $.selection !== !1,
          onClick: (B) => w(n).operate($.key)
        }, L($.selection === !1 ? $.label : M($.label)), 9, zo))), 128)),
        c.value?.delete ? (u(), p("button", {
          key: 3,
          type: "button",
          class: "dc-actions__op dc-actions__danger",
          disabled: !h.value,
          onClick: I[6] || (I[6] = ($) => w(n).delete())
        }, L(M(c.value.delete)), 9, jo)) : O("", !0)
      ]),
      _.value ? (u(), H(Io, {
        key: 2,
        class: "dc-actions__pages",
        "pages-note": e.pagesNote
      }, null, 8, ["pages-note"])) : O("", !0)
    ], 2)) : O("", !0);
  }
}), St = /* @__PURE__ */ Q(Uo, [["__scopeId", "data-v-b7cd42d5"]]);
function ea(e) {
  return Math.max(0, e.total - (e.kept ?? 0));
}
function ja(e) {
  const t = he(/* @__PURE__ */ new Map()), n = q(!0);
  let a = 0, s;
  const l = () => {
    a++, s?.abort(), s = void 0;
  }, o = () => {
    l();
    const r = a, { signal: i } = s = new AbortController(), c = e.query.value, d = e.schema.value, m = e.entities.value, _ = e.within?.value.trim() ?? "";
    n.value = c.expr.trim() === "" && !_;
    const h = /* @__PURE__ */ new Map();
    let y = !0;
    for (const v of m) {
      const S = Ba(v, c.expr), C = _ ? _n(_, S) : S;
      let A = !1;
      const g = (M) => {
        if (r !== a) return;
        if (y) {
          h.set(v.key, M);
          return;
        }
        const E = new Map(t.value);
        E.set(v.key, M), t.value = E;
      }, k = e.source.value.query({
        query: { ...c, entity: v.key, expr: C, page: 1 },
        schema: d,
        entity: v,
        limit: 0,
        offset: 0,
        signal: i,
        progress: (M) => {
          A || g({ total: M, pending: !0, counted: !0 });
        }
      });
      k instanceof Promise ? (h.has(v.key) || h.set(v.key, { total: 0, pending: !0, counted: !1 }), k.then((M) => {
        A = !0, g({ total: ea(M), pending: !1, counted: !0 });
      })) : (A = !0, h.set(v.key, { total: ea(k), pending: !1, counted: !0 }));
    }
    y = !1, t.value = h;
  };
  return ca() && It(l), { counts: t, pristine: n, refresh: o, cancel: l };
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
    ), l = ja({
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
    const d = f(() => {
      const T = t.views ?? [...lt];
      return (t.stacked && T.includes("record") ? ["record", ...T.filter((V) => V !== "record")] : T).map((V) => {
        const J = We(V) ? void 0 : a.hostViews.value[V];
        return {
          key: V,
          label: t.labels?.[V] ?? (V === "record" ? a.recordView.value?.label ?? jn.record : We(V) ? jn[V] : J?.label ?? V),
          icon: We(V) ? Un[V] : J?.icon ?? Un.list,
          hint: t.hints?.[V] ?? J?.hint
        };
      });
    }), m = f(() => Ae(a.query.value.view, t.views)), _ = f(() => d.value.length > 1), h = f(() => _.value || i.value && !t.stacked);
    function y(T) {
      a.setView(T);
    }
    const v = q(null), S = q(!1), C = q(""), A = q(0), g = f(() => d.value.find((T) => T.key === m.value)), k = f(() => {
      const T = C.value.trim().toLowerCase();
      return T ? d.value.filter(
        (K) => K.label.toLowerCase().includes(T) || !!K.hint?.toLowerCase().includes(T)
      ) : d.value;
    });
    function M() {
      S.value = !0, A.value = Math.max(0, k.value.findIndex((T) => T.key === m.value));
    }
    function E() {
      S.value = !1, C.value = "";
    }
    function I() {
      S.value ? v.value?.blur() : v.value?.focus();
    }
    function $(T) {
      T !== m.value && y(T), v.value?.blur();
    }
    function B(T) {
      const K = k.value.length;
      if (T.key === "ArrowDown" || T.key === "ArrowUp") {
        if (T.preventDefault(), !S.value) {
          M();
          return;
        }
        K && (A.value = (A.value + (T.key === "ArrowDown" ? 1 : -1) + K) % K);
      } else if (T.key === "Enter") {
        T.preventDefault();
        const V = k.value[A.value];
        V && $(V.key);
      } else T.key === "Escape" && (T.preventDefault(), v.value?.blur());
    }
    return (T, K) => h.value ? (u(), p("div", {
      key: 0,
      class: oe(["dc-choosers", { "dc-choosers--stacked": e.stacked }])
    }, [
      i.value && !e.stacked ? (u(), H(vn, {
        key: 0,
        class: "dc-actions__pick dc-actions__type",
        label: "Type",
        "model-value": w(a).query.value.entity ?? "",
        options: r.value,
        onOpen: w(l).refresh,
        onClose: w(l).cancel,
        "onUpdate:modelValue": c
      }, null, 8, ["model-value", "options", "onOpen", "onClose"])) : O("", !0),
      _.value && e.stacked ? (u(), p("div", Qo, [
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
          (u(), p("svg", Go, [
            b("path", {
              d: g.value?.icon
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
            "aria-activedescendant": S.value && k.value.length ? `${n}-${k.value[A.value]?.key}` : void 0,
            placeholder: g.value?.label,
            onFocus: M,
            onBlur: E,
            onInput: K[1] || (K[1] = (V) => {
              A.value = 0, S.value = !0;
            }),
            onKeydown: B
          }, null, 40, Xo), [
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
          S.value ? (u(), p("ul", {
            key: 0,
            id: `${n}-list`,
            class: "dc-show-as__list",
            role: "listbox",
            "aria-label": "Show as"
          }, [
            (u(!0), p(z, null, X(k.value, (V, J) => (u(), p("li", {
              id: `${n}-${V.key}`,
              key: V.key,
              class: oe(["dc-show-as__option", { "dc-show-as__option--active": J === A.value, "dc-show-as__option--on": V.key === m.value }]),
              style: ae({ animationDelay: `${J * 30}ms` }),
              role: "option",
              "aria-selected": V.key === m.value,
              onMousedown: xe((re) => $(V.key), ["prevent"]),
              onMousemove: (re) => A.value = J
            }, [
              (u(), p("svg", er, [
                b("path", {
                  d: V.icon
                }, null, 8, tr)
              ])),
              b("span", nr, [
                b("span", ar, L(V.label), 1),
                V.hint ? (u(), p("span", sr, L(V.hint), 1)) : O("", !0)
              ]),
              b("span", lr, L(V.key === m.value ? "✓" : ""), 1)
            ], 46, Zo))), 128)),
            k.value.length ? O("", !0) : (u(), p("li", or, " No format matches “" + L(C.value) + "” ", 1))
          ], 8, Jo)) : O("", !0)
        ], 2)
      ])) : _.value ? (u(), H(vn, {
        key: 2,
        class: "dc-actions__pick dc-actions__view",
        label: "View",
        "model-value": m.value,
        options: d.value,
        "onUpdate:modelValue": y
      }, null, 8, ["model-value", "options"])) : O("", !0)
    ], 2)) : O("", !0);
  }
}), ta = /* @__PURE__ */ Q(ir, [["__scopeId", "data-v-070ebf59"]]), cr = { class: "dc-types-panel__list" }, ur = ["id", "checked", "onChange"], dr = ["for"], fr = ["title", "onClick"], vr = { class: "dc-types-panel__count dc-mono" }, pr = /* @__PURE__ */ j({
  __name: "ShellTypes",
  setup(e) {
    const t = te();
    function n(h) {
      return de(
        ee(h).map((y) => y.filter((v) => !(v.kind === "field" && v.field === "entity"))).filter((y) => y.length > 0)
      );
    }
    const a = f(() => {
      const h = ee(t.query.value.expr);
      return h.length !== 1 ? /* @__PURE__ */ new Set() : new Set(
        h[0].flatMap(
          (y) => y.kind === "field" && y.field === "entity" && y.negated ? [y.value.toLowerCase()] : []
        )
      );
    }), s = f(() => n(t.query.value.expr)), l = ja({
      source: t.source,
      schema: t.schema,
      query: f(() => ({ ...t.liveQuery.value, expr: n(t.liveQuery.value.expr) })),
      entities: t.entities,
      within: t.within
    });
    Ge(() => l.refresh()), ne(() => [s.value, t.within.value, t.source.value], () => l.refresh());
    function o(h) {
      if (l.pristine.value) return ct(h);
      const y = l.counts.value.get(h.key);
      return y?.counted ? `${y.pending ? "~" : ""}${Ne(y.total)}` : ct(h);
    }
    const r = f(
      () => t.entities.value.filter(
        (h) => h.key === t.query.value.entity || (typeof h.count == "number" ? h.count > 0 : !!h.count)
      )
    );
    function i(h) {
      const y = t.query.value.entity;
      return y ? y === h.key : !a.value.has(h.key.toLowerCase());
    }
    function c(h) {
      const y = r.value.map((C) => C.key);
      if (h.length === 1) return { expr: s.value, entity: h[0] };
      const S = y.filter((C) => !h.includes(C)).map((C) => `-entity:${C}`).join(" ");
      return { expr: [s.value, S].filter(Boolean).join(" "), entity: null };
    }
    function d(h) {
      const y = r.value.filter((A) => i(A)).map((A) => A.key), v = y.includes(h.key) ? y.filter((A) => A !== h.key) : [...y, h.key];
      if (v.length === 0) return;
      const { expr: S, entity: C } = c(v);
      t.narrow(S, C);
    }
    function m(h) {
      const { expr: y, entity: v } = c([h.key]);
      t.narrow(y, v);
    }
    const _ = `dc-types-${Math.random().toString(36).slice(2, 8)}`;
    return (h, y) => r.value.length > 1 ? (u(), p("section", {
      key: 0,
      class: "dc-types-panel",
      "aria-labelledby": _
    }, [
      b("h3", {
        id: _,
        class: "dc-types-panel__heading"
      }, " Types "),
      b("ul", cr, [
        (u(!0), p(z, null, X(r.value, (v) => (u(), p("li", {
          key: v.key,
          class: "dc-types-panel__type"
        }, [
          b("input", {
            id: `${_}-${v.key}`,
            type: "checkbox",
            class: "dc-types-panel__box",
            checked: i(v),
            onChange: (S) => d(v)
          }, null, 40, ur),
          b("label", {
            for: `${_}-${v.key}`,
            class: "dc-types-panel__name"
          }, L(v.label), 9, dr),
          b("button", {
            type: "button",
            class: "dc-types-panel__only",
            title: `Only ${v.label}`,
            onClick: (S) => m(v)
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
    metrics: fa(t, "metric").map((s) => ({
      column: s,
      label: s.label ?? "",
      text: Ee(s, e)
    })),
    facts: t.filter((s) => s.cardLabel && !yr(ie(s, e))).map((s) => ({
      column: s,
      label: s.cardLabel,
      title: [s.label, s.hint].filter(Boolean).join(" — "),
      text: Ee(s, e)
    })),
    state: n ? ie(n, e) ?? null : null,
    updated: xt(pe(t, "updated"), e),
    image: mr(pe(t, "image"), e),
    tint: a ? ie(a, e) ?? null : null
  };
}
function Ua(e, t, n, a, s = !1) {
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
      (n, a) => Ua(
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
    return (a, s) => (u(), p("span", {
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
    const t = e, n = te(), a = f(() => !t.entry.entity?.scope || !t.column.drill ? null : n.entities.value.find((m) => m.key === t.column.drill) ?? null), s = f(() => !!t.column.click), l = f(() => t.column.label ?? ""), o = f(() => Ee(t.column, t.entry.row)), r = f(() => s.value ? t.column.clickHref?.(t.entry.row) ?? null : a.value ? n.drillHref(t.entry.row, a.value, t.column.drillWhere) : null), i = f(() => a.value && !s.value ? `${l.value} of ${t.entry.parts.identity} — show the ${a.value.label.toLowerCase()}` : `${l.value} of ${t.entry.parts.identity}`);
    function c(d, m) {
      m.stopPropagation(), s.value ? t.column.click?.(t.entry.row, d) : a.value && n.drill(t.entry.row, a.value, d, t.column.drillWhere);
    }
    return (d, m) => a.value || s.value ? (u(), H(se, {
      key: 0,
      class: "dc-drill",
      href: r.value,
      title: i.value,
      onPress: c
    }, {
      default: Y(() => [
        G(d.$slots, "default", {}, () => [
          Z(L(o.value), 1)
        ], !0)
      ]),
      _: 3
    }, 8, ["href", "title"])) : (u(), p("span", kr, [
      G(d.$slots, "default", {}, () => [
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
    return (s, l) => (u(), p("button", {
      type: "button",
      class: "dc-star",
      "data-dc-active": e.pinned ? "true" : "false",
      "aria-pressed": e.pinned,
      "aria-label": e.pinned ? `Unpin ${e.name}` : `Pin ${e.name}`,
      onClick: a
    }, L(e.pinned ? "★" : "☆"), 9, $r));
  }
}), Pn = /* @__PURE__ */ Q(xr, [["__scopeId", "data-v-ef63d763"]]), Sr = ["src"], Cr = /* @__PURE__ */ j({
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
    ), (a, s) => e.src.trim() && !n.value ? (u(), p("img", {
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
    const t = e, n = te(), a = f(() => jt(t.entry.entity, t.entry.row)), s = f(() => Na(n.query.value.expr, a.value)), l = f(
      () => s.value === "in" ? `The query narrows to ${t.entry.parts.identity} — press to lift that` : `The query leaves out ${t.entry.parts.identity} — press to lift that`
    );
    function o(r) {
      r.stopPropagation(), n.setExpression(Sn(n.query.value.expr, a.value));
    }
    return (r, i) => s.value ? (u(), p("button", {
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
    return (s, l) => a.value ? (u(), p("a", {
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
    function l(d) {
      s.value = dt(d).exclude ? "out" : "in";
    }
    function o(d) {
      l(d), window.addEventListener("keydown", l), window.addEventListener("keyup", l);
    }
    function r() {
      s.value = null, window.removeEventListener("keydown", l), window.removeEventListener("keyup", l);
    }
    ke(r);
    const i = f(() => a.value ? n.drillHref(t.entry.row, null) : null);
    function c(d, m) {
      m.stopPropagation(), n.drill(t.entry.row, null, d);
    }
    return (d, m) => a.value ? (u(), H(se, {
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
      default: Y(() => [...m[0] || (m[0] = [
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
    return (s, l) => (u(), p("input", {
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
    return (o, r) => (u(), p("div", {
      class: oe(["dc-cards", { "dc-cards--pictures": l.value }])
    }, [
      (u(!0), p(z, null, X(w(n), (i) => (u(), p("div", {
        key: i.key,
        class: oe(["dc-card", { "dc-card--picture": s(i) }])
      }, [
        b("div", Ar, [
          b("span", Nr, [
            w(t).selectable.value ? (u(), H(He, {
              key: 0,
              row: i.row,
              selected: i.selected,
              name: i.parts.identity
            }, null, 8, ["row", "selected", "name"])) : O("", !0),
            s(i) ? O("", !0) : (u(), p(z, { key: 1 }, [
              Z(L(i.ordinal), 1)
            ], 64)),
            a.value ? (u(), p("span", Ir, L(i.entityLabel), 1)) : O("", !0)
          ]),
          b("span", Br, [
            i.parts.state && !s(i) ? (u(), H(Qe, {
              key: 0,
              status: i.parts.state
            }, null, 8, ["status"])) : O("", !0),
            U(yt, { entry: i }, null, 8, ["entry"]),
            U(_t, { entry: i }, null, 8, ["entry"]),
            U(gt, { entry: i }, null, 8, ["entry"]),
            w(t).pinnable.value ? (u(), H(Pn, {
              key: 1,
              row: i.row,
              name: i.parts.identity,
              pinned: i.pinned
            }, null, 8, ["row", "name", "pinned"])) : O("", !0)
          ])
        ]),
        U(se, {
          class: "dc-card__open",
          href: w(t).pressHref(i.row),
          onPress: (c) => w(t).activate(i.row, c)
        }, {
          default: Y(() => [
            i.parts.image ? (u(), H(Qt, {
              key: 0,
              class: "dc-card__image",
              src: i.parts.image
            }, null, 8, ["src"])) : O("", !0),
            b("span", Rr, [
              b("span", Hr, L(i.parts.identity), 1),
              s(i) ? O("", !0) : (u(), p("span", qr, L(i.parts.reference), 1)),
              i.parts.facts.length ? (u(), p("span", Vr, [
                (u(!0), p(z, null, X(i.parts.facts, (c) => (u(), p("span", {
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
        s(i) ? O("", !0) : (u(), p("div", Kr, [
          (u(!0), p(z, null, X(i.parts.metrics.slice(0, 2), (c) => (u(), H(mt, {
            key: c.column.key ?? c.label,
            entry: i,
            column: c.column
          }, {
            default: Y(() => [
              Z(L(c.label) + " " + L(c.text), 1)
            ]),
            _: 2
          }, 1032, ["entry", "column"]))), 128)),
          i.parts.updated ? (u(), p("span", Wr, L(i.parts.updated), 1)) : O("", !0)
        ]))
      ], 2))), 128))
    ], 2));
  }
}), Qa = /* @__PURE__ */ Q(zr, [["__scopeId", "data-v-a90319f2"]]), jr = { class: "dc-grid" }, Ur = { class: "dc-tile__scrim" }, Qr = { class: "dc-tile__top dc-mono" }, Gr = { class: "dc-tile__chip" }, Yr = { class: "dc-tile__caption" }, Xr = { class: "dc-tile__secondary dc-truncate" }, Jr = { class: "dc-tile__primary" }, Zr = /* @__PURE__ */ j({
  __name: "GridView",
  setup(e) {
    const t = te(), n = Re();
    return (a, s) => (u(), p("div", jr, [
      (u(!0), p(z, null, X(w(n), (l) => (u(), p("div", {
        key: l.key,
        class: "dc-grid__cell"
      }, [
        U(se, {
          class: "dc-tile",
          style: ae({ "--dc-tile-tint": l.parts.tint ?? void 0 }),
          href: w(t).pressHref(l.row),
          onPress: (o) => w(t).activate(l.row, o)
        }, {
          default: Y(() => [
            l.parts.image ? (u(), H(Qt, {
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
        w(t).selectable.value ? (u(), H(He, {
          key: 0,
          class: "dc-grid__tick",
          row: l.row,
          selected: l.selected,
          name: l.parts.identity
        }, null, 8, ["row", "selected", "name"])) : O("", !0)
      ]))), 128))
    ]));
  }
}), Ga = /* @__PURE__ */ Q(Zr, [["__scopeId", "data-v-89c40a9e"]]);
function na(e, t, n, a) {
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
  for (const d of e) {
    const m = t(d), _ = Math.max(m.ratio, Number.EPSILON), h = m.height && m.height > 0 ? Math.max(c, m.height) : c, y = sn(h, s), v = na(i + _, r.length + 1, a, l);
    if (v > y) {
      r.push(d), i += _, c = h;
      continue;
    }
    const S = sn(c, s), C = r.length ? na(i, r.length, a, l) : 1 / 0;
    C <= ei(c) && C - S < y - v ? (o.push({ items: r, height: C, filled: !0 }), r = [d], i = _, c = m.height && m.height > 0 ? m.height : 0) : (o.push({ items: [...r, d], height: v, filled: !0 }), r = [], i = 0, c = 0);
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
    const t = te(), n = Re(), a = Tn(/* @__PURE__ */ new Map()), s = Tn(/* @__PURE__ */ new Set());
    function l(y, v) {
      const S = v.target;
      S.naturalWidth > 0 && S.naturalHeight > 0 && a.set(y, { width: S.naturalWidth, height: S.naturalHeight });
    }
    function o(y) {
      const v = y.parts.image;
      return v && !s.has(v) ? v : null;
    }
    function r(y) {
      const v = o(y);
      return v ? a.get(v) : void 0;
    }
    function i(y) {
      const v = r(y);
      return v ? { ratio: v.width / v.height, height: v.height } : { ratio: li };
    }
    const c = q(null), d = q(0);
    let m = null;
    function _() {
      d.value = c.value?.clientWidth ?? 0;
    }
    Ge(() => {
      _(), !(!c.value || typeof ResizeObserver > "u") && (m = new ResizeObserver(_), m.observe(c.value));
    }), ke(() => {
      m?.disconnect(), m = null;
    });
    const h = f(() => {
      const y = ti(n.value, i, {
        width: d.value,
        height: si,
        gap: kt
      }), v = [];
      let S = 0;
      for (const C of y) {
        let A = 0;
        for (const g of C.items) {
          const k = i(g).ratio * C.height, M = r(g), E = M !== void 0 && M.height < C.height;
          v.push({
            entry: g,
            style: {
              top: `${S}px`,
              left: `${A}px`,
              width: `${k}px`,
              height: `${C.height}px`
            },
            picture: E ? { width: `${M.width}px`, height: `${M.height}px` } : { width: "100%", height: "100%" }
          }), A += k + kt;
        }
        S += C.height + kt;
      }
      return { boxes: v, height: y.length ? S - kt : 0 };
    });
    return (y, v) => (u(), p("div", ni, [
      b("div", {
        ref_key: "wall",
        ref: c,
        class: "dc-images__wall",
        style: ae({ height: `${h.value.height}px` })
      }, [
        (u(!0), p(z, null, X(h.value.boxes, ({ entry: S, style: C, picture: A }) => (u(), p("div", {
          key: S.key,
          class: "dc-images__cell",
          style: ae(C)
        }, [
          U(se, {
            class: "dc-images__open",
            title: S.parts.identity,
            "aria-label": S.parts.identity,
            href: w(t).pressHref(S.row),
            onPress: (g) => w(t).activate(S.row, g)
          }, {
            default: Y(() => [
              o(S) ? (u(), H(Qt, {
                key: 0,
                class: "dc-images__picture",
                style: ae(A),
                src: o(S),
                onLoad: (g) => l(o(S), g),
                onError: (g) => s.add(o(S))
              }, null, 8, ["style", "src", "onLoad", "onError"])) : (u(), p("span", ai, L(S.parts.identity), 1))
            ]),
            _: 2
          }, 1032, ["title", "aria-label", "href", "onPress"]),
          w(t).selectable.value ? (u(), H(He, {
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
}), Ya = /* @__PURE__ */ Q(oi, [["__scopeId", "data-v-2d267370"]]), ri = { class: "dc-links" }, ii = { class: "dc-link__primary dc-truncate" }, ci = { class: "dc-link__secondary dc-mono dc-truncate" }, ui = /* @__PURE__ */ j({
  __name: "LinksView",
  setup(e) {
    const t = te(), n = Re();
    return (a, s) => (u(), p("div", ri, [
      (u(!0), p(z, null, X(w(n), (l) => (u(), p("span", {
        key: l.key,
        class: "dc-links__item"
      }, [
        w(t).selectable.value ? (u(), H(He, {
          key: 0,
          row: l.row,
          selected: l.selected,
          name: l.parts.identity
        }, null, 8, ["row", "selected", "name"])) : O("", !0),
        U(se, {
          class: "dc-link",
          href: w(t).pressHref(l.row),
          onPress: (o) => w(t).activate(l.row, o)
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
}), Xa = /* @__PURE__ */ Q(ui, [["__scopeId", "data-v-de6c9a0f"]]), di = {
  class: "dc-list",
  role: "list"
}, fi = { class: "dc-list__ordinal dc-mono" }, vi = { class: "dc-list__identity" }, pi = ["title"], hi = ["title"], mi = {
  key: 1,
  class: "dc-list__entity dc-mono"
}, yi = { class: "dc-list__metrics dc-mono" }, gi = { class: "dc-list__trailing" }, _i = /* @__PURE__ */ j({
  __name: "ListView",
  setup(e) {
    const t = te(), n = Re(), a = f(() => t.isEverything.value);
    return (s, l) => (u(), p("div", di, [
      (u(!0), p(z, null, X(w(n), (o) => (u(), p("div", {
        key: o.key,
        class: "dc-list__row",
        role: "listitem"
      }, [
        w(t).selectable.value ? (u(), H(He, {
          key: 0,
          class: "dc-list__tick",
          row: o.row,
          selected: o.selected,
          name: o.parts.identity
        }, null, 8, ["row", "selected", "name"])) : O("", !0),
        U(se, {
          class: "dc-list__open",
          href: w(t).pressHref(o.row),
          onPress: (r) => w(t).activate(o.row, r)
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
        a.value ? (u(), p("span", mi, L(o.entityLabel), 1)) : O("", !0),
        b("span", yi, [
          (u(!0), p(z, null, X(o.parts.metrics.slice(0, 2), (r) => (u(), H(mt, {
            key: r.column.key ?? r.label,
            entry: o,
            column: r.column
          }, null, 8, ["entry", "column"]))), 128))
        ]),
        b("span", gi, [
          o.parts.state ? (u(), H(Qe, {
            key: 0,
            status: o.parts.state
          }, null, 8, ["status"])) : O("", !0),
          U(yt, { entry: o }, null, 8, ["entry"]),
          U(_t, { entry: o }, null, 8, ["entry"]),
          U(gt, { entry: o }, null, 8, ["entry"]),
          w(t).pinnable.value ? (u(), H(Pn, {
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
      const c = pe(i.columns, "reference"), d = pe(i.columns, "updated");
      return [
        ...c ? [{ key: c.label ?? "Reference", value: i.parts.reference, column: null }] : [],
        ...i.parts.metrics.map((m) => ({
          key: m.label,
          value: m.text,
          column: m.column
        })),
        ...d ? [{ key: d.label ?? "Updated", value: i.parts.updated, column: null }] : []
      ];
    }), o = f(() => {
      if (!n.value.length) return "0 / 0";
      const i = t.total.value > n.value.length ? ` of ${t.total.value}` : "";
      return `${a.value + 1} / ${n.value.length}${i}`;
    }), r = (i) => {
      const c = n.value.length;
      c && (a.value = Math.min(c - 1, Math.max(0, a.value + i)));
    };
    return (i, c) => (u(), p("div", wi, [
      b("div", ki, [
        b("button", {
          type: "button",
          class: "dc-preview__step",
          "aria-label": "Previous result",
          disabled: a.value === 0,
          onClick: c[0] || (c[0] = (d) => r(-1))
        }, " ‹ ", 8, bi),
        b("span", $i, L(o.value), 1),
        b("button", {
          type: "button",
          class: "dc-preview__step",
          "aria-label": "Next result",
          disabled: a.value >= w(n).length - 1,
          onClick: c[1] || (c[1] = (d) => r(1))
        }, " › ", 8, xi)
      ]),
      s.value ? (u(), p("div", Si, [
        b("div", {
          class: "dc-preview__media",
          style: ae({ background: s.value.parts.tint ?? void 0 }),
          "aria-hidden": "true"
        }, [
          s.value.parts.image ? (u(), p("img", {
            key: 0,
            class: "dc-preview__image",
            src: s.value.parts.image,
            alt: ""
          }, null, 8, Ci)) : (u(), p(z, { key: 1 }, [
            Z(" preview ")
          ], 64))
        ], 4),
        b("div", Pi, [
          b("div", Mi, [
            b("span", Ei, [
              w(t).selectable.value ? (u(), H(He, {
                key: 0,
                row: s.value.row,
                selected: s.value.selected,
                name: s.value.parts.identity
              }, null, 8, ["row", "selected", "name"])) : O("", !0),
              s.value.parts.state ? (u(), H(Qe, {
                key: 1,
                status: s.value.parts.state
              }, null, 8, ["status"])) : O("", !0),
              b("span", Li, L(s.value.entityLabel), 1)
            ]),
            b("span", Ti, [
              U(yt, { entry: s.value }, null, 8, ["entry"]),
              U(_t, { entry: s.value }, null, 8, ["entry"]),
              U(gt, { entry: s.value }, null, 8, ["entry"]),
              w(t).pinnable.value ? (u(), H(Pn, {
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
            (u(!0), p(z, null, X(l.value, (d) => (u(), p("div", {
              key: d.key,
              class: "dc-preview__field"
            }, [
              b("dt", Ii, L(d.key), 1),
              b("dd", Bi, [
                d.column && s.value ? (u(), H(mt, {
                  key: 0,
                  entry: s.value,
                  column: d.column
                }, null, 8, ["entry", "column"])) : (u(), p(z, { key: 1 }, [
                  Z(L(d.value), 1)
                ], 64))
              ])
            ]))), 128))
          ]),
          U(se, {
            class: "dc-preview__open",
            href: s.value ? w(t).pressHref(s.value.row) : null,
            onPress: c[2] || (c[2] = (d) => s.value && w(t).activate(s.value.row, d))
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
}), Ja = /* @__PURE__ */ Q(Ri, [["__scopeId", "data-v-59e0d33b"]]);
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
    return l === void 0 || !a.has(l) || s.role === "identity" || n.some((o) => Array.isArray(ie(s, o))) ? !0 : new Set(n.map((o) => Ee(s, o))).size > 1;
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
function Mn(e, t) {
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
    const t = e, n = te(), a = f(() => Ee(t.column, t.entry.row));
    function s(m, _ = !1) {
      return m.entity !== void 0 ? `entity:${m.entity}` : we({ ...m.term, ..._ ? { negated: !0 } : {} });
    }
    function l(m, _ = !1) {
      return m.entity !== void 0 ? n.query.value.expr : it(n.query.value.expr, s(m, _));
    }
    function o(m) {
      return m.entity ?? n.query.value.entity;
    }
    function r(m) {
      return n.narrowHref(l(m), o(m));
    }
    function i(m) {
      return m.entity !== void 0 ? `Show ${n.schema.value.entities.find((h) => h.key === m.entity)?.label ?? a.value} only` : `Narrow to ${s(m)}
⌥-press to leave these out`;
    }
    function c(m) {
      return m.entity !== void 0 ? null : { term: s(m) };
    }
    function d(m, _, h) {
      h.stopPropagation(), n.narrow(l(m, _.exclude), o(m));
    }
    return (m, _) => (u(), p("span", {
      class: oe(["dc-cell__text", { "dc-truncate": e.truncates }])
    }, [
      (u(!0), p(z, null, X(e.narrowings, (h, y) => (u(), p(z, {
        key: s(h)
      }, [
        y > 0 ? (u(), p(z, { key: 0 }, [
          Z(", ")
        ], 64)) : O("", !0),
        U(se, Ce({
          class: "dc-narrow",
          href: r(h),
          title: i(h),
          selectable: ""
        }, yn(w(Mn)(w(n), c(h))), {
          onPress: (v, S) => d(h, v, S)
        }), {
          default: Y(() => [
            G(m.$slots, "default", {}, () => [
              Z(L(h.label ?? a.value), 1)
            ], !0)
          ]),
          _: 2
        }, 1040, ["href", "title", "onPress"])
      ], 64))), 128))
    ], 2));
  }
}), aa = /* @__PURE__ */ Q(Fi, [["__scopeId", "data-v-6e649daa"]]), Di = /* @__PURE__ */ new Set(["entitykey", "entitylabel"]), Ki = /* @__PURE__ */ new Set(["ordinal", "image", "component", "date"]), Wi = 4;
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
const sa = /* @__PURE__ */ new WeakMap();
function Qi(e, t) {
  let n = sa.get(e);
  return n || sa.set(e, n = /* @__PURE__ */ new Map()), n.has(t) || n.set(t, ji(t, e)), n.get(t);
}
const Gi = /* @__PURE__ */ j({
  __name: "ColumnCell",
  props: {
    column: {},
    entry: {}
  },
  setup(e) {
    const t = e, n = te(), a = f(() => t.column.kind ?? "text"), s = f(() => ie(t.column, t.entry.row)), l = f(
      () => a.value === "ordinal" ? t.entry.ordinal : Ee(t.column, t.entry.row)
    ), o = f(() => s.value), r = f(() => t.column.activate === !0 || !!t.column.click), i = f(() => ln(t.column)), c = f(() => va(t.column, t.entry.row)), d = f(() => {
      if (!ts(t.column)) return [];
      const y = typeof s.value == "number" ? Qi(n.rows.value, t.column) : null;
      return Ui(t.column, t.entry.row, t.entry.entity ?? null, y);
    });
    function m(y) {
      r.value && (y.stopPropagation(), _(dt(y)));
    }
    function _(y) {
      t.column.click?.(t.entry.row, y), t.column.activate && n.activate(t.entry.row, y);
    }
    const h = f(() => t.column.click ? t.column.clickHref?.(t.entry.row) ?? null : t.column.activate ? n.pressHref(t.entry.row) : null);
    return (y, v) => a.value === "component" && e.column.component ? (u(), H(Ke(e.column.component), {
      key: 0,
      row: e.entry.row,
      entry: e.entry,
      value: s.value,
      column: e.column
    }, null, 8, ["row", "entry", "value", "column"])) : a.value === "status" && d.value.length ? (u(), H(aa, {
      key: 1,
      entry: e.entry,
      column: e.column,
      narrowings: d.value,
      truncates: !1
    }, {
      default: Y(() => [
        U(Qe, { status: o.value }, null, 8, ["status"])
      ]),
      _: 1
    }, 8, ["entry", "column", "narrowings"])) : a.value === "status" ? (u(), H(Qe, {
      key: 2,
      status: o.value
    }, null, 8, ["status"])) : a.value === "image" ? (u(), H(Qt, {
      key: 3,
      class: "dc-cell__image",
      src: typeof s.value == "string" ? s.value : "",
      style: ae({ maxHeight: e.column.height }),
      onClick: m
    }, null, 8, ["src", "style"])) : e.column.drill || e.column.click && e.column.role === "metric" ? (u(), H(mt, {
      key: 4,
      entry: e.entry,
      column: e.column
    }, null, 8, ["entry", "column"])) : r.value ? (u(), H(se, Ce({
      key: 5,
      class: ["dc-table__open", { "dc-truncate": i.value }],
      href: h.value,
      title: c.value
    }, yn(e.column.activate ? w(Mn)(w(n), w(Za)(w(n), e.entry)) : {}), {
      onPress: v[0] || (v[0] = (S, C) => {
        C.stopPropagation(), _(S);
      })
    }), {
      default: Y(() => [
        Z(L(l.value), 1)
      ]),
      _: 1
    }, 16, ["class", "href", "title"])) : d.value.length ? (u(), H(aa, {
      key: 6,
      entry: e.entry,
      column: e.column,
      narrowings: d.value,
      truncates: i.value
    }, null, 8, ["entry", "column", "narrowings", "truncates"])) : (u(), p("span", {
      key: 7,
      class: oe(["dc-cell__text", { "dc-truncate": i.value }])
    }, L(l.value), 3));
  }
}), la = /* @__PURE__ */ Q(Gi, [["__scopeId", "data-v-d07057a1"]]), Yi = {
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
      if (!t.rowLinks?.value || Ia()) return;
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
      const I = ga(E, t.entity.value, t.schema.value), $ = I ? `Shortcut: ${I}` : void 0;
      return [E.hint, $].filter(Boolean).join(`
`) || void 0;
    }
    const c = f(() => {
      const E = a.value.find(($) => $.scope);
      return E || ((t.entity.value ? !!t.entity.value.href : t.entities.value.some(($) => $.href)) ? a.value.find(($) => $.activate) : void 0);
    }), d = (E) => La(E.entity, E.row), m = f(
      () => n.value.some((E) => Na(t.query.value.expr, d(E)) !== null)
    ), _ = f(
      () => a.value.some((E) => E.kind === "image" || E.height !== void 0)
    );
    function h(E) {
      E && (t.query.value.sort === E ? t.toggleDirection() : t.setSort(E));
    }
    function y(E) {
      return E ? t.query.value.sort === E ? t.hrefFor({ dir: t.query.value.dir === "desc" ? "asc" : "desc" }) : t.hrefFor({ sort: E }) : null;
    }
    const v = f(() => t.entity.value?.label ?? "The result set"), S = f(() => new Set(t.sorts.value.map((E) => E.key))), C = (E) => E.sort !== void 0 && S.value.has(E.sort), A = (E) => {
      if (C(E))
        return t.query.value.sort !== E.sort ? "none" : t.query.value.dir === "desc" ? "descending" : "ascending";
    };
    function g(E) {
      return [
        Rn(E),
        E.muted ? "dc-table__muted" : "",
        E.mono ? "dc-mono" : "",
        ln(E) ? "dc-truncate" : ""
      ].filter(Boolean).join(" ");
    }
    function k(E, I) {
      if (!(!ln(E) || E.activate || E.click))
        return va(E, I.row);
    }
    const M = f(
      () => a.value.length + (t.selectable.value ? 1 : 0) + (m.value ? 1 : 0)
    );
    return (E, I) => w(a).length ? (u(), p("table", {
      key: 1,
      class: "dc-table",
      "data-dc-wrap": _.value ? "" : void 0,
      "data-dc-row-links": w(t).rowLinks?.value ? "" : void 0,
      style: ae({ "--dc-table-tracks": M.value })
    }, [
      b("thead", Zi, [
        b("tr", null, [
          w(t).selectable.value ? (u(), p("th", ec, [
            U(za)
          ])) : O("", !0),
          m.value ? (u(), p("th", tc)) : O("", !0),
          (u(!0), p(z, null, X(w(a), ($, B) => (u(), p("th", {
            key: w(In)($, B),
            scope: "col",
            class: oe(w(Rn)($)),
            style: ae({ width: $.width }),
            "data-dc-align": w(Bn)($),
            "data-dc-hide": $.hideBelow,
            "aria-sort": A($),
            title: i($)
          }, [
            C($) ? (u(), H(se, {
              key: 0,
              class: "dc-table__sort",
              href: y($.sort),
              onPress: (T) => h($.sort)
            }, {
              default: Y(() => [
                Z(L($.label), 1)
              ]),
              _: 2
            }, 1032, ["href", "onPress"])) : (u(), p(z, { key: 1 }, [
              Z(L($.label), 1)
            ], 64)),
            $.header ? (u(), p("span", ac, [
              (u(), H(Ke($.header), {
                column: $,
                entity: w(t).entity.value
              }, null, 8, ["column", "entity"]))
            ])) : O("", !0)
          ], 14, nc))), 128))
        ])
      ]),
      b("tbody", sc, [
        (u(!0), p(z, null, X(w(n), ($) => (u(), p("tr", {
          key: $.key,
          class: "dc-table__row",
          onClick: (B) => s($.row, B)
        }, [
          w(t).selectable.value ? (u(), p("td", oc, [
            U(He, {
              row: $.row,
              selected: $.selected,
              name: $.parts.identity
            }, null, 8, ["row", "selected", "name"])
          ])) : O("", !0),
          m.value ? (u(), p("td", rc, [
            U(yt, { entry: $ }, null, 8, ["entry"])
          ])) : O("", !0),
          (u(!0), p(z, null, X(w(a), (B, T) => (u(), p("td", {
            key: w(In)(B, T),
            class: oe(g(B)),
            style: ae({ width: B.width }),
            "data-dc-align": w(Bn)(B),
            "data-dc-hide": B.hideBelow,
            title: k(B, $)
          }, [
            l.value.get($.key) ? (u(), H(se, Ce({
              key: 0,
              class: "dc-table__cell-link",
              href: l.value.get($.key),
              tabindex: B === o.value ? void 0 : -1,
              "aria-hidden": B === o.value ? void 0 : "true",
              "aria-label": B === o.value ? $.parts.identity : void 0
            }, yn(w(Mn)(w(t), w(Za)(w(t), $))), {
              onPress: (K, V) => r($.row, K, V)
            }), null, 16, ["href", "tabindex", "aria-hidden", "aria-label", "onPress"])) : O("", !0),
            B === c.value ? (u(), p("span", cc, [
              U(la, {
                column: B,
                entry: $
              }, null, 8, ["column", "entry"]),
              U(_t, { entry: $ }, null, 8, ["entry"]),
              U(gt, { entry: $ }, null, 8, ["entry"])
            ])) : (u(), H(la, {
              key: 2,
              column: B,
              entry: $
            }, null, 8, ["column", "entry"]))
          ], 14, ic))), 128))
        ], 8, lc))), 128))
      ])
    ], 12, Ji)) : (u(), p("p", Yi, [
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
  const l = (i, c, d, m, _) => ({
    entity: i,
    rows: e.limit.value > 0 ? c.rows.map((h, y) => Ua(h, y, i, e.isPinned(h.id))) : [],
    total: c.total,
    count: d ? ct(i) : Ne(c.total),
    pinned: fc(m, c, _)
  }), o = () => {
    const i = ++s, c = e.query.value, d = e.schema.value, m = e.entities.value, _ = e.limit.value, h = e.within?.value.trim() ?? "", y = wn(c) && !h, v = h ? _n(h, c.expr) : c.expr, S = m.map((C) => ({
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
    if (S.every(({ outcome: C }) => !(C instanceof Promise))) {
      t.value = S.map(
        ({ entity: C, outcome: A }) => l(C, A, y, d, v)
      ), a.value = null, n.value = !1;
      return;
    }
    n.value = !0, Promise.all(S.map(({ outcome: C }) => Promise.resolve(C))).then((C) => {
      i === s && (t.value = C.map(
        (A, g) => l(S[g].entity, A, y, d, v)
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
      isPinned: (d) => t.isPinnedId(d)
    }), l = f(
      () => !t.isPristine.value || !!t.within.value || t.drafting.value
    ), o = f(() => t.previewsPerType.value <= 0), r = f(
      () => new Set(n.value.filter((d) => d.pinned).map((d) => d.entity.key))
    ), i = (d) => {
      const { keepsCard: m } = d;
      return Array.isArray(m) ? m.some((_) => r.value.has(_)) : !!m;
    }, c = f(
      () => n.value.filter(
        (d) => !d.pinned && (l.value || !d.entity.nested) && (d.total > 0 || i(d.entity) || !o.value && d.entity.create)
      )
    );
    return (d, m) => (u(), p("div", {
      class: "dc-types",
      "data-dc-pending": w(a) ? "true" : "false",
      "data-dc-heads-only": o.value ? "true" : "false"
    }, [
      G(d.$slots, "before", {}, void 0, !0),
      w(s) ? (u(), p("p", pc, " Could not load results: " + L(w(s) instanceof Error ? w(s).message : "the data source failed."), 1)) : !c.value.length && w(a) ? (u(), p("p", hc, " Running query… ")) : c.value.length ? O("", !0) : (u(), p("p", mc, L(l.value ? "Nothing matches this query" : "Nothing here yet"), 1)),
      (u(!0), p(z, null, X(c.value, (_) => (u(), p("section", {
        key: _.entity.key,
        class: "dc-type",
        "data-dc-empty": _.total ? "false" : "true"
      }, [
        U(se, {
          class: "dc-type__head",
          href: w(t).entityHref(_.entity.key),
          onPress: (h) => w(t).setEntity(_.entity.key)
        }, {
          default: Y(() => [
            b("span", gc, L(_.entity.label), 1),
            b("span", _c, L(_.count), 1),
            _.entity.note ? (u(), p("span", wc, L(_.entity.note), 1)) : O("", !0),
            m[0] || (m[0] = b("span", {
              class: "dc-type__go",
              "aria-hidden": "true"
            }, "→", -1)),
            b("span", kc, "Show only " + L(_.entity.label.toLowerCase()), 1),
            _.entity.description ? (u(), p("span", bc, L(_.entity.description), 1)) : O("", !0)
          ]),
          _: 2
        }, 1032, ["href", "onPress"]),
        _.total ? O("", !0) : (u(), p("p", $c, L(l.value ? "No matches" : "Nothing here yet"), 1)),
        (u(!0), p(z, null, X(_.rows, (h) => (u(), p("div", {
          key: h.key,
          class: "dc-type__row"
        }, [
          U(se, {
            class: "dc-type__open",
            href: w(t).pressHref(h.row),
            onPress: (y) => w(t).activate(h.row, y)
          }, {
            default: Y(() => [
              b("span", xc, [
                b("span", Sc, L(h.parts.identity), 1),
                b("span", Cc, L(h.parts.reference), 1)
              ])
            ]),
            _: 2
          }, 1032, ["href", "onPress"]),
          b("span", Pc, [
            (u(!0), p(z, null, X(h.parts.metrics.slice(0, 1), (y) => (u(), H(mt, {
              key: y.column.key ?? y.label,
              class: "dc-type__metric",
              entry: h,
              column: y.column
            }, {
              default: Y(() => [
                b("span", Mc, L(y.text), 1),
                b("span", Ec, L(y.label), 1)
              ]),
              _: 2
            }, 1032, ["entry", "column"]))), 128)),
            h.parts.updated ? (u(), p("span", Lc, L(h.parts.updated), 1)) : O("", !0),
            U(yt, { entry: h }, null, 8, ["entry"]),
            U(_t, { entry: h }, null, 8, ["entry"]),
            U(gt, { entry: h }, null, 8, ["entry"])
          ])
        ]))), 128)),
        _.entity.create && !o.value ? (u(), H(se, {
          key: 1,
          class: "dc-type__new",
          href: w(t).createHref?.(_.entity),
          onPress: (h) => w(t).create(_.entity)
        }, {
          default: Y(() => [
            m[1] || (m[1] = b("span", {
              class: "dc-type__plus",
              "aria-hidden": "true"
            }, "+", -1)),
            Z(" " + L(_.entity.create), 1)
          ]),
          _: 2
        }, 1032, ["href", "onPress"])) : O("", !0)
      ], 8, yc))), 128)),
      G(d.$slots, "after", {}, void 0, !0)
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
      cards: Qa,
      grid: Ga,
      images: Ya,
      table: ns,
      links: Xa,
      preview: Ja
    }, l = f(() => xa(n.query.value, t.views)), o = f(() => Ae(n.query.value.view, t.views)), r = f(() => We(o.value) ? null : n.hostViews.value[o.value] ?? null), i = f(
      () => (o.value === "record" || !We(o.value) ? null : s[o.value]) ?? pn
    ), c = f(() => o.value === "record" ? n.recordView.value : null), d = f(() => n.rows.value.length > 0), m = f(() => n.error.value !== null), _ = q(null);
    function h(k) {
      return k.querySelector("[data-dc-scroll]") ?? k;
    }
    ne(
      // The page on screen, which is the draft's own while one is being typed.
      () => n.liveQuery.value.page,
      () => {
        _.value && (h(_.value).scrollTop = 0);
      }
    );
    const y = q(""), v = q({ x: 0, y: 0 }), S = q(0);
    function C() {
      const k = _.value;
      if (!k) {
        y.value = "";
        return;
      }
      const M = h(k), E = {
        top: M.scrollTop > 1,
        right: M.scrollWidth - M.clientWidth - M.scrollLeft > 1,
        bottom: M.scrollHeight - M.clientHeight - M.scrollTop > 1,
        left: M.scrollLeft > 1
      };
      y.value = Object.entries(E).filter(([, I]) => I).map(([I]) => I).join(" "), v.value = {
        x: M.offsetHeight - M.clientHeight,
        y: M.offsetWidth - M.clientWidth
      }, S.value = k.querySelector("[data-dc-stuck]")?.offsetHeight ?? 0;
    }
    let A = null, g = null;
    return ne(
      _,
      (k, M) => {
        if (M?.removeEventListener("scroll", C, { capture: !0 }), A?.disconnect(), g?.disconnect(), A = null, g = null, C(), !k || (k.addEventListener("scroll", C, { passive: !0, capture: !0 }), typeof ResizeObserver > "u")) return;
        const E = new ResizeObserver(C), I = typeof MutationObserver > "u" ? null : new MutationObserver(() => {
          $(), C();
        }), $ = () => {
          E.disconnect(), I?.disconnect();
          for (const B of /* @__PURE__ */ new Set([k, h(k)])) {
            E.observe(B);
            for (const T of B.children) E.observe(T);
            I?.observe(B, { childList: !0 });
          }
        };
        $(), A = E, g = I;
      },
      { flush: "post" }
    ), ke(() => {
      _.value?.removeEventListener("scroll", C, { capture: !0 }), A?.disconnect(), g?.disconnect();
    }), (k, M) => (u(), p("div", {
      ref_key: "scroller",
      ref: _,
      class: "dc-results",
      "data-dc-pending": w(n).pending.value ? "true" : "false",
      "data-dc-more": y.value,
      style: ae({
        "--dc-results-gutter-x": `${v.value.x}px`,
        "--dc-results-gutter-y": `${v.value.y}px`,
        "--dc-results-stuck": `${S.value}px`
      })
    }, [
      e.loading ? (u(), p("p", Ac, [...M[1] || (M[1] = [
        b("span", { class: "dc-results__detail" }, "Loading…", -1)
      ])])) : l.value ? (u(), H(as, { key: 1 }, bt({ _: 2 }, [
        a["cards-before"] ? {
          name: "before",
          fn: Y(() => [
            G(k.$slots, "cards-before", {}, void 0, !0)
          ]),
          key: "0"
        } : void 0,
        a["cards-after"] ? {
          name: "after",
          fn: Y(() => [
            G(k.$slots, "cards-after", {}, void 0, !0)
          ]),
          key: "1"
        } : void 0
      ]), 1024)) : c.value?.id ? (u(), H(Ke(c.value.component), {
        key: 2,
        id: c.value.id
      }, null, 8, ["id"])) : m.value ? (u(), p("p", Nc, [
        M[2] || (M[2] = b("span", { class: "dc-results__headline" }, "Could not load results", -1)),
        b("span", Ic, L(w(n).error.value instanceof Error ? w(n).error.value.message : "The data source failed."), 1)
      ])) : !d.value && w(n).pending.value ? (u(), p("p", Bc, [...M[3] || (M[3] = [
        b("span", { class: "dc-results__detail" }, "Running query…", -1)
      ])])) : d.value ? r.value ? (u(), H(Ke(r.value.component), $t(Ce({ key: 6 }, r.value.props ?? {})), null, 16)) : (u(), H(Ke(i.value), { key: 7 })) : (u(), p("div", Rc, [
        M[4] || (M[4] = b("span", { class: "dc-results__headline" }, "Nothing matches this query", -1)),
        b("span", Hc, L(w(n).summary.value), 1),
        w(n).isPristine.value ? O("", !0) : (u(), H(se, {
          key: 0,
          class: "dc-results__clear",
          href: w(n).isEverything.value ? w(n).clearHref() : w(n).entityHref(null),
          onPress: M[0] || (M[0] = (E) => w(n).isEverything.value ? w(n).clearFilters() : w(n).clearEntity())
        }, {
          default: Y(() => [
            Z(L(w(n).isEverything.value ? "Clear filters" : "Search everything instead"), 1)
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
  emits: /* @__PURE__ */ An(["activate", "create", "duplicate", "delete", "operate", "drill", "query-change", "toggle-pin"], ["update:pinned", "update:selected"]),
  setup(e, { expose: t, emit: n }) {
    const a = e, s = n, l = On(e, "pinned"), o = On(e, "selected"), r = Rt(), i = hn(da, null), c = a.route || i ? null : hs(), d = a.route ?? i ?? c;
    ke(() => c?.dispose?.());
    const m = q(!!r.page);
    is(() => {
      m.value = !!r.page;
    });
    const _ = ms(d, {
      detached: () => m.value && a.pageQuery === "detached",
      path: () => a.listPath
    }), h = f(() => vl({ seed: a.schema.key })), y = f(() => a.source ?? h.value), v = Il({
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
    const A = f(() => $l(a.schema, [v.query.value.expr])), g = f(
      () => A.value.flatMap((x) => {
        const N = a.schema.entities.find((F) => F.key === x.entityKey);
        return N ? [{ ...x, entity: N }] : [];
      })
    );
    function k() {
      if (r.record) return g.value;
      const x = a.recordCards;
      return x ? g.value.filter((N) => x[N.entityKey]) : [];
    }
    const M = f(() => {
      const [x, ...N] = g.value;
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
      source: y,
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
      [V, T.pending, v.query, C.drafting, () => a.loading, m, K.holding],
      () => {
        if (T.pending.value || C.drafting.value || a.loading || m.value) return;
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
      return La(N, x);
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
    function Le(x) {
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
      const Ln = an(a.schema, v.query.value, x, F, ue);
      F.exclude ? v.narrow(Ln, N?.key ?? v.query.value.entity) : C.release(() => v.narrow(Ln, N?.key ?? null, N ? void 0 : "cards")), s("drill", x, N, F);
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
      source: y,
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
      standSelection: Le,
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
    }), En = q(null), Xt = q(0);
    let Jt = null;
    Ge(() => {
      const x = En.value;
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
    }), (x, N) => (u(), p("div", {
      ref_key: "root",
      ref: En,
      class: "dc-shell",
      "data-dc-theme": e.theme,
      "data-dc-value-press": e.valuePress,
      "data-dc-layout": e.layout,
      style: ae(rs.value)
    }, [
      wt.value ? O("", !0) : (u(), p("div", {
        key: 0,
        class: oe(["dc-shell__head", { "dc-shell__head--one-strip": Zt.value }])
      }, [
        U(fn, null, bt({ _: 2 }, [
          r.page ? void 0 : {
            name: "lead",
            fn: Y(() => [
              U(ta, {
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
        Zt.value && !r.page && !en.value ? (u(), H(St, $t(Ce({ key: 0 }, tn.value)), null, 16)) : O("", !0)
      ], 2)),
      b("div", Fc, [
        r.page ? (u(), p("div", Dc, [
          G(x.$slots, "page", {
            query: w(ve).query.value
          }, void 0, !0)
        ])) : O("", !0),
        !wt.value && !Zt.value && !r.page && !en.value ? (u(), H(St, $t(Ce({ key: 1 }, tn.value)), null, 16)) : O("", !0),
        r.page ? O("", !0) : G(x.$slots, "results", {
          rows: w(ve).rows.value,
          total: w(ve).total.value,
          offset: w(ve).offset.value,
          pageCount: w(ve).pageCount.value,
          query: w(ve).liveQuery.value,
          pending: w(ve).pending.value,
          loading: e.loading
        }, () => [
          U(ss, {
            views: I.value,
            loading: e.loading
          }, bt({ _: 2 }, [
            r["cards-before"] || k().length ? {
              name: "cards-before",
              fn: Y(() => [
                (u(!0), p(z, null, X(k(), (F) => (u(), p(z, {
                  key: `${F.entityKey}:${F.id}`
                }, [
                  r.record ? G(x.$slots, "record", {
                    id: F.id,
                    entity: F.entity
                  }, void 0, !0, 0) : (u(), H(Ke(e.recordCards?.[F.entityKey]), {
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
      wt.value ? (u(), p("aside", Kc, [
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
        r.page ? O("", !0) : (u(), H(ta, {
          key: 0,
          views: I.value,
          "type-chooser": e.typeChooser,
          labels: e.viewLabels,
          hints: e.viewHints,
          stacked: ""
        }, null, 8, ["views", "type-chooser", "labels", "hints"])),
        !r.page && A.value.length === 0 ? (u(), H(hr, { key: 1 })) : O("", !0),
        G(x.$slots, "panel", {
          query: w(ve).query.value
        }, void 0, !0),
        !r.page && !en.value ? (u(), H(St, Ce({
          key: 2,
          class: "dc-shell__panel-actions"
        }, tn.value), null, 16)) : O("", !0)
      ])) : O("", !0)
    ], 12, Vc));
  }
}), zc = /* @__PURE__ */ Q(Wc, [["__scopeId", "data-v-ad54b2b2"]]), jc = ["data-dc-span", "data-dc-muted", "data-dc-collapsed"], Uc = ["data-dc-collapsible"], Qc = ["aria-expanded", "aria-controls"], Gc = { class: "dc-shell-card__sr" }, Yc = {
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
      () => !!n.title || !!n.name || d.value || r(o.head)
    ), d = f(() => r(o.aside)), m = f(() => r(o.default)), _ = f(() => r(o.foot)), h = f(
      () => !!n.name && (!!n.reference || r(o.reference))
    ), y = f(() => n.collapsible === !0 && c.value), v = f(() => y.value && (n.collapsed ?? s.value));
    function S() {
      const $ = !v.value;
      s.value = $, a("update:collapsed", $);
    }
    const C = Ht() ?? "dc-shell-card", A = `${C}-body`, g = `${C}-foot`, k = f(
      () => [m.value ? A : "", _.value ? g : ""].filter(Boolean).join(" ") || void 0
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
      if (!y.value) return;
      const B = $.target?.closest(M);
      B && E.value?.contains(B) || typeof window < "u" && window.getSelection()?.toString() || S();
    }
    return ($, B) => (u(), p("section", {
      class: "dc-shell-card",
      style: ae(l.value),
      "data-dc-span": e.span,
      "data-dc-muted": e.muted ? "true" : "false",
      "data-dc-collapsed": v.value ? "true" : "false"
    }, [
      c.value ? (u(), p("header", {
        key: 0,
        ref_key: "head",
        ref: E,
        class: "dc-shell-card__head",
        "data-dc-collapsible": y.value ? "true" : "false",
        onClick: I
      }, [
        y.value ? (u(), p("button", {
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
          b("span", Gc, L(e.name || e.title || "Card"), 1)
        ], 8, Qc)) : O("", !0),
        G($.$slots, "head", {}, () => [
          e.name ? (u(), p("div", Yc, [
            b("h2", Xc, L(e.name), 1),
            h.value ? (u(), p("span", Jc, [
              G($.$slots, "reference", {}, () => [
                Z(L(e.reference), 1)
              ], !0)
            ])) : O("", !0)
          ])) : (u(), p("h2", Zc, L(e.title), 1)),
          e.count !== void 0 ? (u(), p("span", eu, L(e.count), 1)) : O("", !0)
        ], !0),
        d.value ? (u(), p("span", tu, [
          G($.$slots, "aside", {}, void 0, !0)
        ])) : O("", !0)
      ], 8, Uc)) : O("", !0),
      m.value ? Ct((u(), p("div", {
        key: 1,
        id: A,
        class: "dc-shell-card__body",
        "data-dc-flush": e.flush ? "true" : "false"
      }, [
        G($.$slots, "default", {}, void 0, !0)
      ], 8, nu)), [
        [Nn, !v.value]
      ]) : O("", !0),
      _.value ? Ct((u(), p("footer", {
        key: 2,
        id: g,
        class: "dc-shell-card__foot"
      }, [
        G($.$slots, "foot", {}, void 0, !0)
      ], 512)), [
        [Nn, !v.value]
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
      const d = n.options[c];
      d && (a("update:modelValue", d.key), s.value[c]?.focus());
    }
    return (o, r) => (u(), p("div", {
      class: "dc-segmented",
      role: "radiogroup",
      "aria-label": e.label
    }, [
      (u(!0), p(z, null, X(e.options, (i, c) => (u(), p("button", {
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
        onClick: (d) => a("update:modelValue", i.key),
        onKeydown: (d) => l(d, c)
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
    return (s, l) => (u(), p("div", {
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
          n.value.length === 1 ? (u(), p(z, { key: 0 }, [
            Z(L(n.value[0]), 1)
          ], 64)) : (u(!0), p(z, { key: 1 }, X(n.value, (o, r) => (u(), p("span", {
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
    return (a, s) => (u(), p("dl", {
      class: "dc-facts",
      style: ae(n.value)
    }, [
      (u(!0), p(z, null, X(e.items, (l, o) => (u(), H(du, {
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
    return (a, s) => (u(), p("span", vu, [
      (u(!0), p(z, null, X(n.value, (l) => (u(), p("span", {
        key: l.label,
        class: "dc-counts__count",
        "data-dc-tone": l.tone ?? "neutral"
      }, L(l.count) + " " + L(l.label), 9, pu))), 128)),
      n.value.length === 0 ? (u(), p("span", hu, L(e.empty), 1)) : O("", !0)
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
    return ke(() => clearTimeout(l)), (r, i) => (u(), p("button", {
      type: "button",
      class: "dc-copy",
      "data-dc-copied": s.value ? "true" : "false",
      title: s.value ? "Copied" : e.label,
      "aria-label": e.label,
      onClick: o
    }, [
      s.value ? (u(), p("svg", _u, [...i[1] || (i[1] = [
        b("path", { d: "M3 8.5l3.2 3L13 4.5" }, null, -1)
      ])])) : (u(), p("svg", gu, [...i[0] || (i[0] = [
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
    return (r, i) => (u(), p("div", {
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
      e.copy ? (u(), H(bu, {
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
      const { chunk: _, offset: h } = await n.fetchChunk(o);
      if (o = h, !_) return;
      const y = l.value, v = !y || y.scrollTop + y.clientHeight >= y.scrollHeight - Su;
      a.value += _, v && (await st(), l.value && (l.value.scrollTop = l.value.scrollHeight));
    }
    function d() {
      a.value = "", o = 0;
    }
    const m = f(() => n.maxHeight === void 0 ? void 0 : { maxHeight: typeof n.maxHeight == "number" ? `${n.maxHeight}px` : n.maxHeight });
    return t({ poll: i, reset: d }), (_, h) => (u(), p("pre", {
      ref_key: "pane",
      ref: l,
      class: "dc-log dc-mono",
      style: ae(m.value)
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
    const n = e, a = t, { theme: s, style: l, adopt: o } = Cn(n), r = `${Ht() ?? "dc-dialog"}-title`, i = q(null);
    function c() {
      a("close"), a("update:open", !1);
    }
    const d = Symbol("dc-dialog");
    function m(g) {
      g.key !== "Escape" || g.defaultPrevented || tt[tt.length - 1] === d && (g.preventDefault(), c());
    }
    let _ = !1;
    function h(g) {
      _ = g.target === g.currentTarget;
    }
    function y(g) {
      g.target === g.currentTarget && _ && c(), _ = !1;
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
      tt.push(d), document.addEventListener("keydown", m), S = document.activeElement instanceof HTMLElement ? document.activeElement : null, o(), await st(), (i.value?.querySelector("[autofocus]") ?? i.value?.querySelector(v) ?? i.value)?.focus();
    }
    function A() {
      const g = tt.indexOf(d);
      g !== -1 && (tt.splice(g, 1), document.removeEventListener("keydown", m), S?.isConnected && S.focus(), S = null);
    }
    return Ge(() => {
      n.open && C();
    }), ne(
      () => n.open,
      (g) => {
        g ? C() : A();
      }
    ), ke(A), (g, k) => e.open ? (u(), H(Bt, {
      key: 0,
      to: e.to
    }, [
      b("div", {
        class: "dc-shell dc-layer dc-dialog",
        "data-dc-theme": w(s),
        style: ae(w(l)),
        onPointerdown: h,
        onClick: y
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
          e.title ? (u(), p("h2", {
            key: 0,
            id: r,
            class: "dc-dialog__title"
          }, L(e.title), 1)) : O("", !0),
          b("div", {
            class: oe(["dc-dialog__body", e.bodyClass])
          }, [
            G(g.$slots, "default", {}, void 0, !0)
          ], 2),
          g.$slots.actions ? (u(), p("div", Eu, [
            G(g.$slots, "actions", {}, void 0, !0)
          ])) : O("", !0)
        ], 10, Mu)
      ], 44, Pu)
    ], 8, ["to"])) : O("", !0);
  }
}), dd = /* @__PURE__ */ Q(Lu, [["__scopeId", "data-v-0cccf313"]]), Tu = 4500, Ou = 9e3, pt = q([]);
let oa = 0;
function ls(e) {
  pt.value = pt.value.filter((t) => t.id !== e);
}
function os(e, t = "ok") {
  oa += 1;
  const n = oa;
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
    const t = e, { toasts: n } = Nu(), { theme: a, style: s, adopt: l } = Cn(t);
    return Ge(l), (o, r) => (u(), H(Bt, { to: e.to }, [
      b("div", {
        class: "dc-shell dc-layer dc-toasts",
        "data-dc-theme": w(a),
        style: ae(w(s)),
        "aria-live": "polite"
      }, [
        (u(!0), p(z, null, X(w(n), (i) => (u(), p("div", {
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
    return (r, i) => (u(), p("span", {
      class: "dc-standing-control",
      role: "radiogroup",
      "aria-label": `Where the query stands on ${e.name}`
    }, [
      (u(!0), p(z, null, X(s.value, (c) => (u(), p("button", {
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
  function r(d) {
    a = setTimeout(() => void i(d), t);
  }
  async function i(d) {
    if (s || d !== l) return;
    let m;
    try {
      m = await e();
    } catch {
      m = !1;
    }
    s || d !== l || (m ? r(d) : o());
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
function ra(e) {
  const t = e.indexOf("?");
  if (t === -1) return "";
  const n = e.slice(t), a = n.indexOf("#");
  return ce(a === -1 ? n : n.slice(0, a));
}
function Bd(e) {
  const t = q(ra(e.currentRoute.value.fullPath)), n = f(() => e.currentRoute.value.path), a = ne(
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
      return Ca(n, (a) => t.get(a.key) ?? [], {
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
  CardsView: Qa,
  GridView: Ga,
  ImagesView: Ya,
  TableView: ns,
  LinksView: Xa,
  PreviewView: Ja,
  TypeCardsView: as
}, Fd = {
  install(e, t = {}) {
    const n = t.prefix ?? "";
    for (const [a, s] of Object.entries(Wu))
      e.component(`${n}${a}`, s);
    t.route && e.provide(da, t.route), (t.theme || t.accent || t.tokens) && Cl({ theme: t.theme, accent: t.accent, tokens: t.tokens }, e);
  }
};
export {
  Gu as COLUMN_BREAKPOINTS,
  Qu as COLUMN_ROLES,
  Qa as CardsView,
  la as ColumnCell,
  bu as CopyButton,
  Gs as DEFAULT_ENTITY_VIEW,
  rn as DEFAULT_SORT,
  on as DEFAULT_VIEW,
  Hl as DRAFT_DELAY,
  zc as DataShell,
  be as EMPTY_CELL,
  Ma as ENTITY_ALL,
  ze as ENTITY_TERM,
  vt as EXPRESSION_TERM,
  Ga as GridView,
  Fd as HeaderContentLayoutPlugin,
  Ya as ImagesView,
  Xa as LinksView,
  pn as ListView,
  Mt as MOCK_TINTS,
  mt as MetricDrill,
  gt as OpenMark,
  $n as PARAM_DIR,
  Ye as PARAM_ENTITY,
  Be as PARAM_EXPR,
  Wt as PARAM_PAGE,
  bn as PARAM_SORT,
  Kt as PARAM_VIEW,
  Uu as PILL_TONES,
  zl as POPOVER_FLIP_BELOW,
  Kl as POPOVER_GAP,
  Wl as POPOVER_MARGIN,
  Pn as PinStar,
  Ja as PreviewView,
  yt as QueryMark,
  nt as RECORD_STATUSES,
  kn as RESULT_FIELDS,
  da as ROUTE_ADAPTER_KEY,
  St as RecordActions,
  ta as RecordChoosers,
  ss as ResultsArea,
  qa as SHELL_CONTEXT_KEY,
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
  Un as VIEW_ICONS,
  lt as VIEW_KINDS,
  jn as VIEW_LABELS,
  Ue as addTerm,
  _n as andExpression,
  Pd as bytesCell,
  va as cellFull,
  Ui as cellNarrowings,
  Ee as cellText,
  xt as cellTextOf,
  ie as cellValue,
  sl as changesResults,
  Td as chipsFrom,
  Bn as columnAlign,
  Rn as columnClass,
  In as columnKey,
  ts as columnNarrows,
  ht as columnShortcut,
  ga as columnShortcutOf,
  ln as columnTruncates,
  Cs as columnsFor,
  ha as compactShortcuts,
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
  Aa as excludingTerm,
  ot as expandShortcuts,
  Sd as facetColumn,
  ft as facetField,
  Da as facetValue,
  Hs as fieldHeading,
  Oa as fieldTerm,
  ut as findEntity,
  Ea as findEntityByAddress,
  Me as findSort,
  Cd as flagColumn,
  at as fnv1a,
  ba as focusEntity,
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
  wn as isPristineQuery,
  je as isRangeTerm,
  xa as isTypeCardsQuery,
  ka as isViewKind,
  Ju as joinExpression,
  Sn as liftTerm,
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
  Ua as presentRow,
  dt as pressOptions,
  xl as provideShellContext,
  Cl as provideShellTheme,
  Vd as queryAll,
  Od as rangeFrom,
  Vt as rangeOf,
  Qs as readDraft,
  nd as readExpression,
  Rd as recordRedirect,
  Ta as recordTerm,
  $l as recordsIn,
  kd as referenceColumn,
  it as refineExpression,
  Ae as resolveView,
  pe as roleColumn,
  fa as roleColumns,
  Ms as rowKey,
  rt as sameTerm,
  jt as scopeTerm,
  Tt as scopeTermFor,
  Ra as scopedEntity,
  td as searchFromQuery,
  Ys as searchesCorpus,
  Gn as serializeQuery,
  gl as sortAddress,
  Dt as sortsFor,
  Xu as splitExpression,
  La as standingTerm,
  yd as stateColumn,
  Ss as stripAnsi,
  Nl as summarizeQuery,
  At as summaryTerms,
  Na as termStanding,
  gd as tintColumn,
  ed as tintFor,
  Ad as toggleFacet,
  Vi as useColumns,
  ql as useDraft,
  ja as useEntityCounts,
  dc as useEntityPreviews,
  Cn as useLayerTheme,
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
  Ka as withFacetValue,
  kl as withStanding,
  bl as withStandings,
  Yn as withWhere,
  ld as withoutFacet,
  Ba as withoutOwnScope,
  Ws as withoutTerm
};
