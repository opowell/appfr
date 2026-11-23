import { ref as H, computed as f, inject as mn, provide as gn, getCurrentInstance as ca, shallowRef as he, toValue as Te, watch as ne, onScopeDispose as Rt, getCurrentScope as ua, defineComponent as j, onMounted as Ge, onBeforeUnmount as ke, openBlock as d, createBlock as q, Teleport as qt, createElementVNode as b, mergeProps as Oe, unref as w, renderSlot as U, createCommentVNode as L, nextTick as lt, createElementBlock as p, withKeys as Le, useSlots as Ht, useId as Vt, normalizeClass as oe, withCtx as Y, toDisplayString as T, createTextVNode as ee, Fragment as W, renderList as X, withModifiers as xe, withDirectives as Mt, normalizeStyle as ae, vModelText as da, createVNode as Q, reactive as On, resolveDynamicComponent as Ke, toHandlers as fa, createSlots as $t, normalizeProps as xt, useModel as An, onBeforeUpdate as ds, guardReactiveProps as fs, mergeModels as Nn, vShow as In, Comment as vs, Text as ps, readonly as hs, watchEffect as ys } from "vue";
import { MenuList as ms } from "menu-bar";
const ot = ["list", "cards", "grid", "images", "table", "links", "preview"], at = ["ok", "running", "queued", "review", "failed"], Zu = [...at, "neutral", "accent"], ed = [
  "identity",
  "reference",
  "metric",
  "state",
  "updated",
  "image",
  "tint"
], td = [480, 620, 760, 900, 1100], va = Symbol("dc.routeAdapter");
function ce(e) {
  if (!e) return "";
  const t = e.replace(/^[?]/, "");
  return t ? `?${t}` : "";
}
function gs() {
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
function _s(e, t) {
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
const ws = new Intl.NumberFormat("en-US", {
  minimumSignificantDigits: 2,
  maximumSignificantDigits: 2,
  useGrouping: !1
});
function Ft(e) {
  return Number.isFinite(e) ? Math.abs(e) < 100 ? ws.format(e) : String(Math.round(e)) : "—";
}
function ks(e) {
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
function bs(e) {
  const t = new Date(e);
  if (Number.isNaN(t.getTime())) return "—";
  const n = String(t.getUTCDate()).padStart(2, "0"), a = String(t.getUTCMonth() + 1).padStart(2, "0");
  return `${n}.${a}.${t.getUTCFullYear()}`;
}
function $s(e) {
  return String(e + 1);
}
function nd(e, t) {
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
function xs(e) {
  if (e == null || !Number.isFinite(e) || e < 0) return "—";
  if (e < 1e3) return `${e} B`;
  const t = ["kB", "MB", "GB", "TB"];
  let n = e, a = -1;
  for (; n >= 1e3 && a < t.length - 1; )
    n /= 1e3, a += 1;
  return `${Ft(n)} ${t[a]}`;
}
function Ss(e) {
  if (!e || !Number.isFinite(e)) return "—";
  if (e < 1e3) return `${Math.round(e)}ms`;
  const t = e / 1e3;
  return t < 60 ? `${Ft(t)}s` : `${Math.floor(t / 60)}m ${Math.round(t % 60)}s`;
}
function Cs(e) {
  if (e == null || !Number.isFinite(e) || e <= 0)
    return "—";
  const t = Math.floor(e / 60);
  return t ? `${t}:${String(e % 60).padStart(2, "0")}` : `${e}s`;
}
function Ps(e) {
  return e == null || !Number.isFinite(e) ? "—" : `${Math.round(e * 100)}%`;
}
function Ms(e) {
  return e.replace(/\x1b\[[0-9;?]*[ -/]*[@-~]/g, "");
}
const be = "—";
function pe(e, t) {
  return e.find((n) => n.role === t);
}
function pa(e, t) {
  return e.filter((n) => n.role === t);
}
function Es(e, t) {
  const n = (t ? t.columns : e?.columns) ?? [], a = t ? "scoped" : "everything";
  return n.filter(
    (s) => s.role !== "tint" && ((s.when ?? "always") === "always" || s.when === a)
  );
}
const Ts = ["id", "entityKey", "entityLabel"];
function ie(e, t) {
  if (e.value) return e.value(t);
  const n = e.field ?? e.key;
  if (n !== void 0) {
    if (t.fields && n in t.fields) return t.fields[n];
    if (Ts.includes(n))
      return t[n];
  }
}
function Bn(e, t) {
  const n = e.key ?? e.field ?? e.label;
  return n?.trim() ? n.trim() : `column-${t}`;
}
function Ls(e, t) {
  return e.id?.trim() ? e.id : `${e.entityKey || "row"}-${t}`;
}
function Os(e, t) {
  if (e == null || e === "") return be;
  if (t === "number") {
    const n = typeof e == "number" ? e : Number(e);
    return Number.isFinite(n) ? ks(n) : String(e);
  }
  return t === "date" ? bs(String(e)) : Array.isArray(e) ? e.length ? e.join(", ") : be : String(e);
}
function Me(e, t) {
  const n = ie(e, t);
  return e.format ? e.format(n, t) : Os(n, e.kind);
}
function As(e) {
  return typeof e == "number" ? Number.isFinite(e) ? String(e) : "" : typeof e == "string" ? e : Array.isArray(e) ? e.join(", ") : "";
}
function ha(e, t) {
  const n = Me(e, t), a = As(ie(e, t));
  return a && a !== n ? a : n;
}
function St(e, t) {
  return e ? Me(e, t) : "";
}
function Rn(e) {
  return e.align ? e.align : e.kind === "number" || e.kind === "ordinal" ? "right" : "left";
}
const Ns = {
  ordinal: "dc-table__num",
  number: "dc-table__number",
  date: "dc-table__date",
  status: "dc-table__state"
};
function qn(e) {
  return [Ns[e.kind ?? "text"], e.class].filter(Boolean).join(" ");
}
function cn(e) {
  if (e.truncate !== void 0) return e.truncate;
  const t = e.kind ?? "text";
  return t === "text" || t === "number" || t === "date";
}
const Is = /^([A-Za-z_][\w.-]*)\s*(>=|<=|:|=|>|<)\s*(.*)$/, Hn = "-?(?:\\d+\\.?\\d*|\\.\\d+)", Bs = new RegExp(`^(${Hn})?\\.\\.(${Hn})?$`);
function Dt(e) {
  const t = Bs.exec(e.trim());
  if (!t || t[1] === void 0 && t[2] === void 0) return null;
  const n = t[1] === void 0 ? null : Number(t[1]), a = t[2] === void 0 ? null : Number(t[2]);
  return n !== null && a !== null && n > a ? { min: a, max: n } : { min: n, max: a };
}
function Rs(e) {
  return `${e.min ?? ""}..${e.max ?? ""}`;
}
function je(e) {
  return e.kind === "field" && (e.comparator === ":" || e.comparator === "=") && Dt(e.value) !== null;
}
function qs(e) {
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
  for (const s of qs(t)) {
    const l = s.toUpperCase();
    if (l === "AND" || l === "&&") continue;
    if (l === "OR" || l === "||") {
      a.length && n.push(a), a = [];
      continue;
    }
    const o = s.length > 1 && s.startsWith("-"), r = o ? s.slice(1) : s, i = o ? { negated: !0 } : {}, c = Is.exec(r);
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
const Ce = (e) => e.toLowerCase().replace(/\s+/g, ""), ya = [
  ["status", "state"],
  ["state", "state"],
  ["updated", "updated"],
  ["date", "updated"],
  ["name", "identity"],
  ["ref", "reference"]
];
function Hs(e, t, n) {
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
  const r = ya.find(([c]) => c === a)?.[1];
  if (r) {
    const c = pe(s, r);
    if (c) return ie(c, t);
  }
  const i = /^metric(\d+)$/.exec(a);
  if (i) {
    const c = pa(s, "metric")[Number(i[1]) - 1];
    if (c) return ie(c, t);
  }
}
function yt(e) {
  return (e.toLowerCase().match(/[\p{L}\p{N}]+/gu) ?? []).map((t) => t.charAt(0)).join("");
}
const Vn = /^[a-z_][\w.-]*$/;
function Kt(e) {
  const t = (e.key ?? e.field)?.toLowerCase();
  if (t !== void 0) return Vn.test(t) ? t : void 0;
  const n = e.label === void 0 ? void 0 : Ce(e.label);
  return n !== void 0 && Vn.test(n) ? n : void 0;
}
function _n(e, t) {
  const n = Ce(e);
  return !!t?.entities.some((a) => a.scope && Ce(a.scope) === n);
}
function Vs(e, t, n) {
  const a = Ce(e);
  if (a === "entity" || ya.some(([l]) => l === a) || /^metric\d+$/.test(a) || _n(e, n)) return !0;
  const s = (l) => l !== void 0 && Ce(l) === a;
  return (t.columns ?? []).some(
    (l) => s(l.key) || s(l.field) || s(l.label)
  ) || t.facets.some((l) => s(l.key) || s(l.label));
}
function rt(e, t, n) {
  return t ? ga(e, (a) => {
    const s = _a(a, t, n);
    return s && Kt(s);
  }) : e;
}
function ma(e, t, n) {
  return t ? ga(e, (a) => {
    if (_n(a, n)) return;
    const s = (t.columns ?? []).find((l) => Kt(l) === a);
    return s && wa(s, t, n);
  }) : e;
}
function Fs(e, t, n) {
  if (!t || _n(e, n)) return;
  const a = t.facets.find((s) => s.key.toLowerCase() === e);
  return a ? a.label : (t.columns ?? []).find((s) => Kt(s) === e)?.label;
}
function ga(e, t) {
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
function _a(e, t, n) {
  if (!(!e || Vs(e, t, n)))
    return (t.columns ?? []).find(
      (a) => a.label !== void 0 && yt(a.label) === e
    );
}
function wa(e, t, n) {
  if (!t || e.label === void 0 || !Kt(e)) return;
  const a = yt(e.label);
  return _a(a, t, n) === e ? a : void 0;
}
function ln(e, t) {
  const n = e.toLowerCase(), a = t.toLowerCase();
  if (!a.includes("*")) return n.includes(a);
  const s = a.replace(/[.+?^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*");
  return new RegExp(s).test(n);
}
function Fn(e, t) {
  return e.toLowerCase() === t.toLowerCase();
}
function Ds(e, t, n, a) {
  if (e.kind === "text") {
    const i = n.columns ?? [];
    return ["identity", "reference"].some((c) => {
      const u = pe(i, c), g = u ? ie(u, t) : void 0;
      return typeof g == "string" && ln(g, e.value);
    });
  }
  const s = Hs(e.field, t, n);
  if (s === void 0) return a?.has(e.field) ? !1 : null;
  const l = je(e) ? Dt(e.value) : null;
  if (l) {
    if (Array.isArray(s) || typeof s == "boolean") return null;
    const i = typeof s == "number" ? s : Number(s);
    return Number.isFinite(i) ? (l.min === null || i >= l.min) && (l.max === null || i <= l.max) : null;
  }
  if (Array.isArray(s))
    return e.comparator === ":" || e.comparator === "=" ? s.some(
      (c) => e.comparator === "=" ? Fn(String(c), e.value) : ln(String(c), e.value)
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
    return e.comparator === "=" ? Fn(String(s), e.value) : ln(String(s), e.value);
  }
  const o = Number(e.value), r = typeof s == "number" ? s : Number(s);
  return !Number.isFinite(o) || !Number.isFinite(r) ? null : Ks(e.comparator, r, o);
}
function Dn(e, t, n, a) {
  const s = Ds(e, t, n, a);
  return s === null ? !0 : e.negated ? !s : s;
}
function Ks(e, t, n) {
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
function Kn(e) {
  return e.kind === "field" && !e.negated && (e.comparator === ":" || e.comparator === "=") && !je(e);
}
const Wn = /* @__PURE__ */ new WeakMap();
function Ws(e) {
  if (!e?.strictScopes) return null;
  let t = Wn.get(e);
  return t || (t = new Set(
    e.entities.flatMap((n) => n.scope ? [n.scope.toLowerCase()] : [])
  ), Wn.set(e, t)), t;
}
function zs(e, t, n, a) {
  if (!e.length) return !0;
  const s = Ws(a);
  return e.some((l) => {
    const o = /* @__PURE__ */ new Map();
    for (const r of l)
      Kn(r) && o.set(
        r.field,
        (o.get(r.field) ?? !1) || Dn(r, t, n, s)
      );
    return l.every(
      (r) => Kn(r) ? o.get(r.field) === !0 : Dn(r, t, n, s)
    );
  });
}
function zn(e) {
  return /[\s"']/.test(e) ? `"${e.replace(/["']/g, "")}"` : e;
}
function we(e) {
  const t = e.negated ? "-" : "";
  return e.kind === "text" ? t + zn(e.value) : `${t}${e.field}${e.comparator}${zn(e.value)}`;
}
function js(e) {
  if (!e.negated) return { ...e, negated: !0 };
  const { negated: t, ...n } = e;
  return n;
}
function ue(e) {
  return e.filter((t) => t.length).map((t) => t.map(we).join(" ")).join(" OR ");
}
function Us(e, t, n) {
  return e.map((a, s) => s === t ? a.filter((l, o) => o !== n) : a).filter((a) => a.length);
}
function ad(e) {
  const t = Z(e);
  if (t.length > 1) return { parts: [], text: e.trim() };
  const n = t[0] ?? [];
  return {
    parts: n.filter((a) => a.kind === "field"),
    text: n.filter((a) => a.kind === "text").map(we).join(" ")
  };
}
function sd(e, t) {
  return [...e.map(we), t.trim()].filter(Boolean).join(" ");
}
const jn = (e, t) => e.toLowerCase() === t.toLowerCase();
function it(e, t) {
  return !!e.negated == !!t.negated && ka(e, t);
}
function Qs(e, t) {
  return !!e.negated != !!t.negated && ka(e, t);
}
function ka(e, t) {
  return e.kind === "field" ? t.kind === "field" && e.field === t.field && e.comparator === t.comparator && jn(e.value, t.value) : t.kind === "text" && jn(e.value, t.value);
}
function Gs(e, t) {
  return t.filter((n) => !e.some((a) => it(a, n)));
}
function wn(e, t) {
  return ba(e, t, (n) => n);
}
function ct(e, t) {
  return ba(
    e,
    t,
    (n, a) => n.filter((s) => !a.some((l) => Qs(s, l)))
  );
}
const Ys = /^[A-Za-z_][\w.-]*\s*(?:>=|<=|:|=|>|<)$/;
function Xs(e) {
  return ue(
    Z(e).map(
      (t) => t.filter(
        (n) => n.kind !== "text" || n.value !== "-" && !Ys.test(n.value)
      )
    ).filter((t) => t.length > 0)
  );
}
function ba(e, t, n) {
  const a = Z(e), s = Z(t);
  return a.length ? s.length ? ue(
    a.flatMap(
      (l) => s.map((o) => [...n(l, o), ...Gs(l, o)])
    )
  ) : ue(a) : ue(s);
}
const un = "cards", Js = "table";
function Zs(e, t = null) {
  if (e.trim() === "") return !1;
  if (!t) return !0;
  const n = new Set(
    t.entities.flatMap((a) => a.scope ? [a.scope.toLowerCase()] : [])
  );
  return !Z(e).flat().some((a) => a.kind === "field" && !a.negated && n.has(a.field.toLowerCase()) && a.value !== "");
}
function Ie(e, t = {}, n = "", a = null) {
  const s = (o) => o && $a(o) ? o : void 0;
  if (e === null) {
    const o = Zs(n, a) ? s(t.searchView) : void 0, r = n.trim() === "" ? s(t.homeView) : void 0;
    return o ?? r ?? s(t.view) ?? un;
  }
  const l = t.landing === "entity" ? s(t.view) : void 0;
  return s(t.entityView) ?? l ?? Js;
}
function el(e, t, n, a = {}, s = "", l = s, o = null) {
  return a.viewAcrossTypes !== "default" && e !== Ie(t, a, s, o) ? e : Ie(n, a, l, o);
}
function tl(e, t, n = {}, a = null) {
  if (e.entity !== t.entity)
    return el(e.view, e.entity, t.entity, n, e.expr, t.expr, a);
  const s = Ie(e.entity, n, e.expr, a);
  return e.view === s ? Ie(t.entity, n, t.expr, a) : e.view;
}
const dn = "updated";
function $a(e) {
  return typeof e == "string" && (e === "record" || ot.includes(e) || nl.test(e));
}
const nl = /^[a-z][a-z0-9-]*$/;
function We(e) {
  return e === "record" || ot.includes(e);
}
const Un = {
  list: "List",
  cards: "Cards",
  grid: "Grid",
  images: "Images",
  table: "Table",
  links: "Links",
  preview: "Preview",
  record: "Record"
}, Qn = {
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
  if (e === "record" && !t?.includes(e)) return t?.[0] ?? un;
  const [n] = t ?? [];
  return n === void 0 ? We(e) ? e : un : t?.includes(e) ? e : n;
}
function ut(e) {
  return typeof e.count == "number" ? Ne(e.count) : e.count;
}
function dt(e, t) {
  return t ? e.entities.find((n) => n.key === t) ?? null : null;
}
function xa(e, t = {}) {
  const n = dt(e, t.entity), a = e.entities[0];
  if (!n && !a) throw new Error(`Schema "${e.key}" declares no entities`);
  return n ?? a;
}
function Sa(e, t = null) {
  return e?.columns ?? t?.columns ?? [];
}
function Wt(e, t = null) {
  if (e?.sorts?.length) return e.sorts;
  const n = /* @__PURE__ */ new Set(), a = [];
  for (const s of Sa(e, t))
    !s.sort || n.has(s.sort) || (n.add(s.sort), a.push({ key: s.sort, label: (s.label ?? s.sort).toLowerCase() }));
  return a;
}
const al = { key: dn, label: dn };
function Pe(e, t, n = null) {
  const a = Wt(e, n);
  return (t ? a.find((l) => l.key === t) : void 0) ?? a.find((l) => l.key === dn) ?? a[0] ?? al;
}
function sl(e) {
  switch (e.kind) {
    case "chips":
      return { kind: "chips", selected: [] };
    case "range":
      return { kind: "range", min: null, max: null };
    case "toggle":
      return { kind: "toggle", on: !1 };
  }
}
function ll(e) {
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
function kn(e) {
  return e.entity === null && e.expr.trim() === "";
}
function ld(e) {
  return e.entity !== null;
}
function Ca(e, t) {
  return e.entity === null && Ae(e.view, t) === "cards";
}
function ol(e, t) {
  return t <= 0 ? 1 : Math.max(1, Math.ceil(e / t));
}
function Et(e, t = {}) {
  const a = t.landing === "entity" ? xa(e, t) : null;
  return {
    entity: a?.key ?? null,
    view: Ie(a?.key ?? null, t),
    sort: Pe(a, t.sort).key,
    dir: t.dir === "asc" ? "asc" : "desc",
    expr: "",
    page: 1
  };
}
const bn = ["entity", "sort", "dir", "expr"];
function rl(e) {
  return bn.some((t) => t in e);
}
const Pa = (e) => e.kind === "date" || e.role === "updated";
function il(e) {
  if (!e) return () => 0;
  const n = (e.kind ?? "text") === "number" || e.role === "metric", a = Pa(e);
  return (s, l) => {
    const o = ie(e, s), r = ie(e, l);
    return n ? Number(r ?? 0) - Number(o ?? 0) : a ? Date.parse(String(r ?? "")) - Date.parse(String(o ?? "")) : String(r ?? "").localeCompare(String(o ?? ""));
  };
}
function Gn(e, t) {
  return !t || !Pa(t) ? !1 : !Number.isFinite(Date.parse(String(ie(t, e) ?? "")));
}
function Ma({ query: e, schema: t, entity: n, limit: a, offset: s }, l, o) {
  const r = Z(e.expr), i = n ? [n] : t.entities;
  let c = 0;
  const u = [];
  for (const S of i)
    for (const C of l(S))
      c += 1, zs(r, C, S, t) && u.push(C);
  const g = Pe(n, e.sort, t), _ = Sa(n, t).find((S) => S.sort === g.key), y = o.undatedLast ? u.filter((S) => !Gn(S, _)) : u, h = o.undatedLast ? u.filter((S) => Gn(S, _)) : [];
  y.sort(il(_)), e.dir === "asc" && y.reverse();
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
function od(e) {
  return Tt[st(e) % Tt.length];
}
function Ea(e, t) {
  return `${e}_${1e4 + t * 7}`;
}
const cl = 7, ul = 3;
function dl(e, t, n, a) {
  const s = (t * cl + st(n)) % a, l = [];
  for (let o = 0; o < Math.min(ul, a); o++)
    l.push(Ea(e, (s + o) % a));
  return l;
}
function fl(e, t) {
  switch (e.kind) {
    case "chips":
      return e.multiple ? vl(e.options, t) : e.options[t % e.options.length] ?? "";
    case "range": {
      const n = Math.max(0, e.max - e.min);
      return e.min + (n === 0 ? 0 : t % (n + 1));
    }
    case "toggle":
      return t % 3 === 0;
  }
}
function vl(e, t) {
  if (!e.length) return [];
  const n = 1 + (t >> 5) % Math.min(3, e.length), a = t % e.length, s = /* @__PURE__ */ new Set();
  for (let l = 0; l < n; l++) s.add((a + l) % e.length);
  return [...s].sort((l, o) => l - o).map((l) => e[l]);
}
function pl(e, t) {
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
function hl(e, t = {}) {
  const n = t.population ?? 48, a = t.seed ?? "", s = t.now ?? /* @__PURE__ */ new Date("2026-08-25T00:00:00Z"), l = e.samples, o = t.scopes ?? [];
  if (!l.length) return [];
  const r = [];
  for (let i = 0; i < n; i++) {
    const c = l[i % l.length], u = Math.floor(i / l.length), g = st(`${a}:${e.key}:${c[0]}:${i}`), _ = Ea(e.key, i), y = new Date(s.getTime() - g % 900 * 36e5).toISOString(), h = {};
    for (const v of e.columns ?? []) {
      const S = v.field ?? v.key;
      if (!S || v.value) continue;
      const C = pl(v, {
        hash: st(`${g}:${S}`),
        sample: c,
        revision: u,
        updatedAt: y
      });
      C !== void 0 && (h[S] = C);
    }
    for (const v of e.facets)
      h[v.key] = fl(v, st(`${g}:${v.key}`));
    for (const [v, S] of o)
      h[v] = S === e.key ? _ : dl(S, i, v, n);
    r.push({ id: _, entityKey: e.key, entityLabel: e.label, fields: h });
  }
  return r;
}
function yl(e = {}) {
  const t = /* @__PURE__ */ new Map(), n = (a, s) => {
    const l = t.get(a.key);
    if (l) return l;
    const o = e.scopes ?? s.entities.flatMap(
      (i) => i.scope ? [[i.scope, i.key]] : []
    ), r = hl(a, { ...e, scopes: o });
    return t.set(a.key, r), r;
  };
  return {
    query(a) {
      return Ma(a, (s) => n(s, a.schema), {
        undatedLast: !1,
        zeroIsAll: !1
      });
    }
  };
}
const Ye = "e", zt = "v", $n = "s", xn = "d", Be = "q", jt = "p", Ta = "*", ml = [
  Ye,
  zt,
  $n,
  xn,
  Be,
  jt
], gl = [
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
  for (const [n, a] of gl) t = t.replace(n, a);
  return t;
}
function _e(e) {
  try {
    return decodeURIComponent(e.replace(/\+/g, " "));
  } catch {
    return e.replace(/\+/g, " ");
  }
}
function Sn(e) {
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
function _l(e) {
  return ml.includes(e);
}
function Ut(e, t) {
  if (!(!t || e.some((n) => n.key === t)))
    return e.find((n) => yt(n.label) === t);
}
function wl(e, t) {
  const n = yt(e.label);
  return Ut(t.entities, n)?.key === e.key ? n : e.key;
}
function La(e, t) {
  return t ? dt(e, t) ?? Ut(e.entities, t) ?? null : null;
}
function kl(e, t) {
  const n = yt(e.label);
  return Ut(t, n)?.key === e.key ? n : e.key;
}
function bl(e, t) {
  return t.some((n) => n.key === e) ? e : Ut(t, e)?.key ?? e;
}
function $l(e, t, n = {}) {
  const a = Et(t, n), s = new Map(Sn(e)), l = s.get(Ye), o = l === void 0 ? a.entity : _e(l), r = o === Ta ? null : La(t, o), i = s.get(Be), c = i === void 0 ? "" : rt(_e(i), r, t), u = s.get(zt), g = u && $a(_e(u)) ? _e(u) : Ie(r?.key ?? null, n, c, t), _ = s.get($n), y = Pe(
    r,
    _ ? bl(_e(_), Wt(r, t)) : n.sort,
    t
  ), h = s.get(xn), v = h ? _e(h) === "asc" ? "asc" : "desc" : a.dir, S = s.get(jt), C = S === void 0 ? 1 : Number(_e(S)), A = Number.isFinite(C) ? Math.max(1, Math.floor(C)) : 1;
  return {
    entity: r?.key ?? null,
    view: g,
    sort: y.key,
    dir: v,
    expr: c,
    page: A
  };
}
function Yn(e, t, n = {}, a = "") {
  const s = Et(t, n), l = dt(t, e.entity), o = Sn(a).filter(([g]) => !_l(g)), r = [], i = (g, _) => r.push([g, Lt(_)]), c = l?.key ?? null;
  if (c !== s.entity && i(Ye, l ? wl(l, t) : Ta), e.view !== Ie(c, n, e.expr, t) && i(zt, e.view), e.sort !== s.sort) {
    const g = Wt(l, t), _ = g.find((y) => y.key === e.sort);
    i($n, _ ? kl(_, g) : e.sort);
  }
  e.dir !== s.dir && i(xn, e.dir), e.expr.trim() !== "" && i(Be, ma(e.expr, l, t)), e.page > 1 && i(jt, String(e.page));
  const u = [
    ...o.map(([g, _]) => [Lt(g), _]),
    ...r
  ];
  return u.length ? `?${u.map(([g, _]) => _ === "" ? g : `${g}=${_}`).join("&")}` : "";
}
function rd(e) {
  const t = [];
  for (const [n, a] of Object.entries(e))
    for (const s of Array.isArray(a) ? a : [a]) {
      if (typeof s != "string") continue;
      const l = Lt(n);
      t.push(s === "" ? l : `${l}=${Lt(s)}`);
    }
  return t.length ? `?${t.join("&")}` : "";
}
function id(e, t) {
  const n = new Map(Sn(e)), a = n.get(Be), s = a === void 0 ? "" : _e(a);
  if (!t) return s;
  const l = n.get(Ye);
  return rt(
    s,
    l === void 0 ? null : La(t, _e(l)),
    t
  );
}
function Qt(e, t) {
  return Aa(e, t.id);
}
function Oa(e, t) {
  return e?.standing === !1 ? null : Qt(e, t);
}
function Aa(e, t) {
  const n = e?.scope;
  return n ? Na(n, t) : null;
}
function Na(e, t) {
  return `${e}="${t.replace(/"/g, "")}"`;
}
function cd(e, t) {
  const n = typeof e == "string" ? e : e?.scope;
  if (!n) return null;
  const a = t.filter((s) => s.replace(/"/g, "") !== "").map((s) => Na(n, s));
  return a.length ? a.join(" ") : null;
}
function Gt(e, t) {
  if (e.kind !== "field" || t.kind !== "field") return it(e, t);
  const n = (a) => a.comparator === ":" || a.comparator === "=";
  return it(e, { ...t, comparator: n(e) && n(t) ? e.comparator : t.comparator });
}
function Ot(e, t) {
  return Gt(e, js(t));
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
  const [a] = Z(t).flat();
  if (!a) return n;
  const s = Z(n);
  return s.some((r) => r.some((i) => Gt(i, a))) ? n : s.some((r) => r.some((i) => Ot(i, a))) ? ue(
    s.map(
      (r) => r.map((i) => Ot(i, a) ? a : i)
    )
  ) : `${n} ${t}`;
}
function Ia(e) {
  if (!e) return null;
  const t = e.trim();
  return t ? t.startsWith("-") ? t.slice(1) : `-${t}` : null;
}
function Ba(e, t) {
  if (!t || !e.trim()) return null;
  const [n] = Z(t).flat();
  if (!n) return null;
  const a = Z(e).flat();
  return a.some((s) => Gt(s, n)) ? n.negated ? "out" : "in" : a.some((s) => Ot(s, n)) ? n.negated ? "in" : "out" : null;
}
function Cn(e, t) {
  if (!t || !e.trim()) return e;
  const [n] = Z(t).flat();
  if (!n) return e;
  const a = Z(e), s = a.map(
    (l) => l.filter((o) => !Gt(o, n) && !Ot(o, n))
  );
  return s.every((l, o) => l.length === a[o]?.length) ? e : ue(s);
}
function xl(e, t, n) {
  return t ? n === null ? Cn(e, t) : Ue(e, n === "out" ? Ia(t) : t) : e;
}
function Sl(e, t, n) {
  const a = t.filter(Boolean), s = () => a.reduce((i, c) => xl(i, c, n), e);
  if (n !== "in") return s();
  const l = /* @__PURE__ */ new Map();
  for (const i of a) {
    const [c] = Z(i).flat();
    if (!c) continue;
    const u = c.kind === "field" ? c.field : "";
    l.set(u, [...l.get(u) ?? [], c]);
  }
  if (l.size <= 1) return s();
  const o = a.reduce((i, c) => Cn(i, c), e), r = o.trim() ? Z(o) : [[]];
  return ue(r.flatMap((i) => [...l.values()].map((c) => [...i, ...c])));
}
function fn(e, t) {
  const n = t.shiftKey ? `noopener,popup,width=${window.outerWidth},height=${window.outerHeight}` : "noopener";
  window.open(e, "_blank", n);
}
function Ra() {
  const e = window.getSelection?.();
  return !!e && !e.isCollapsed;
}
function vn(e) {
  return e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0;
}
function ft(e) {
  return e.altKey ? { exclude: !0 } : {};
}
function on(e, t, n, a = {}, s) {
  const l = At(e, n);
  if (a.exclude) return Xn(Ue(t.expr, Ia(l)), s);
  const o = e.entities.find((c) => c.key === n.entityKey), i = l !== null && o?.narrowsAlone === !0 ? "" : l === null ? t.expr : Yt(t.expr, Ha(e, o));
  return Xn(Ue(i, l), s);
}
function Xn(e, t) {
  const n = t?.trim() ? Z(t).flat() : [];
  if (!n.length) return e;
  const a = new Set(n.flatMap((r) => r.kind === "field" ? [r.field] : [])), s = (r) => r.kind === "field" && !r.negated && (r.comparator === ":" || r.comparator === "=") && a.has(r.field), l = e.trim(), o = l ? Z(l) : [[]];
  if (o.length === 1 && !o[0].some(s)) {
    const r = n.filter((i) => !o[0].some((c) => it(c, i)));
    return [l, ...r.map(we)].filter(Boolean).join(" ");
  }
  return ue(
    o.map((r) => {
      const i = r.filter((c) => !s(c));
      return [...i, ...n.filter((c) => !i.some((u) => it(u, c)))];
    })
  );
}
function qa(e, t) {
  const n = e?.scope?.toLowerCase();
  if (!n || e?.keepsScope || !t.trim()) return t;
  const a = Z(t), s = a.map(
    (l) => l.filter((o) => o.kind !== "field" || o.field !== n)
  );
  return s.every((l, o) => l.length === a[o]?.length) ? t : ue(s);
}
function Ha(e, t) {
  const n = [], a = /* @__PURE__ */ new Set();
  let s = t;
  for (; s?.parent && !a.has(s.parent); ) {
    a.add(s.parent), s = e.entities.find((o) => o.key === s.parent);
    const l = s?.scope?.toLowerCase();
    l && n.push(l);
  }
  return n;
}
function Yt(e, t) {
  if (!t.length || !e.trim()) return e;
  const n = Z(e), a = n.map(
    (s) => s.filter((l) => l.kind !== "field" || l.negated || !t.includes(l.field.toLowerCase()))
  );
  return a.every((s, l) => s.length === n[l]?.length) ? e : ue(a);
}
function Va(e, t) {
  const n = t.toLowerCase();
  return e.entities.find((a) => a.scope?.toLowerCase() === n) ?? null;
}
function Fa(e, t, n) {
  if (!t || !n) return null;
  const a = Va(e, t);
  return a ? { entity: a, id: n } : null;
}
function Cl(e, t) {
  const n = [], a = /* @__PURE__ */ new Set();
  for (const s of t)
    for (const l of Z(s).flat()) {
      if (l.kind !== "field" || l.negated) continue;
      const o = Fa(e, l.field, l.value);
      if (!o) continue;
      const r = `${o.entity.key}:${o.id.toLowerCase()}`;
      a.has(r) || (a.add(r), n.push({ entityKey: o.entity.key, id: o.id }));
    }
  return n;
}
function ud(e, t, n = "cards", a = []) {
  return {
    // An expression with nothing in it is no parameter, as the shell writes it.
    [Be]: Ue(t ? Yt(e, a) : e, t) || void 0,
    [Ye]: void 0,
    [zt]: n,
    [jt]: void 0
  };
}
const Da = Symbol("dc.shellContext");
function Pl(e) {
  const t = e.liveQuery ? e : Ml(e);
  return gn(Da, t), t;
}
function Ml(e) {
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
  const e = mn(Da, null);
  if (!e)
    throw new Error(
      "[appfr] No shell context found. Render this component inside <DataShell>."
    );
  return e;
}
const Nt = Symbol("dc-shell-theme");
function pn(e) {
  return {
    read: () => ({
      theme: Te(e.theme),
      accent: Te(e.accent),
      tokens: Te(e.tokens)
    })
  };
}
function El(e, t) {
  t ? t.provide(Nt, pn(e)) : gn(Nt, pn(e));
}
function Tl(e) {
  const t = ca();
  gn(Nt, {
    ...pn(e),
    element: () => t?.proxy?.$el ?? null
  });
}
function Pn(e) {
  const t = ca(), n = mn(Nt, null), a = he(null);
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
const Ll = /* @__PURE__ */ new Set([">", ">=", "<", "<="]);
function Ka(e, t) {
  if (e.kind !== "field" || e.negated || e.field !== vt(t)) return !1;
  const n = e.comparator === ":" || e.comparator === "=";
  switch (t.kind) {
    case "range":
      return je(e) || Ll.has(e.comparator);
    case "chips":
      return n && !je(e) && Wa(t.options, e.value) !== void 0;
    case "toggle":
      return n && Ol(e.value);
  }
}
function Wa(e, t) {
  const n = t.toLowerCase();
  return e.find((a) => a.toLowerCase() === n);
}
function Ol(e) {
  const t = e.toLowerCase();
  return t === "true" || t === "yes";
}
function za(e, t) {
  const n = (Z(e)[0] ?? []).filter((a) => Ka(a, t));
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
      const a = new Set(n.map((s) => Wa(t.options, s.value)));
      return { kind: "chips", selected: t.options.filter((s) => a.has(s)) };
    }
    case "toggle":
      return { kind: "toggle", on: n.length > 0 };
  }
}
function Al(e, t) {
  const n = vt(e);
  switch (t.kind) {
    case "range":
      return t.min === null && t.max === null ? [] : [{ kind: "field", field: n, comparator: ":", value: Rs(t) }];
    case "chips":
      return t.selected.map((a) => ({ kind: "field", field: n, comparator: "=", value: a }));
    case "toggle":
      return t.on ? [{ kind: "field", field: n, comparator: ":", value: "true" }] : [];
  }
}
function ja(e, t, n) {
  const a = Al(t, n), s = Z(e), l = (s.length ? s : [[]]).map((o) => [
    ...o.filter((r) => !Ka(r, t)),
    ...a
  ]);
  return ue(l);
}
function dd(e, t) {
  return ja(e, t, sl(t));
}
function Nl(e, t) {
  return (t?.facets ?? []).some((n) => ll(za(e, n)));
}
const ze = "entity", pt = "expr", Il = { ">=": "≥", "<=": "≤", ">": ">", "<": "<" };
function tt(e) {
  const t = Number(e);
  return Number.isFinite(t) && !Number.isInteger(t) ? Ft(t) : String(e);
}
function Bl(e, t, n) {
  if (e.kind !== "field") return we(e);
  const a = Fs(e.field, t, n);
  if (a === void 0) return we(e);
  const s = e.negated ? "-" : "", l = je(e) ? Dt(e.value) : null;
  if (l) {
    const r = l.min !== null && l.max !== null ? `${tt(l.min)} ≤ ${a} ≤ ${tt(l.max)}` : l.max !== null ? `${a} ≤ ${tt(l.max)}` : `${a} ≥ ${tt(l.min)}`;
    return s + r;
  }
  const o = Il[e.comparator];
  return o ? `${s}${a} ${o} ${tt(e.value)}` : we({ ...e, field: a });
}
function It(e, t, n = null) {
  const a = [];
  return t && a.push({
    id: ze,
    label: `entity:${t.key}`,
    facetKey: ze
  }), Z(e.expr).forEach((s, l) => {
    s.forEach((o, r) => {
      a.push({
        id: `${pt}:${l}:${r}`,
        label: Bl(o, t, n),
        address: ma(we(o), t, n),
        facetKey: pt,
        group: l,
        index: r,
        ...o.kind === "field" ? { field: o.field, value: o.value } : {},
        ...o.negated ? { negated: !0 } : {}
      });
    });
  }), a;
}
function Rl(e, t, n = null) {
  if (kn(e)) {
    const l = Pe(t, e.sort, n);
    return `everything · ${e.view} · ${l.label}`;
  }
  const a = It(e, t).filter((l) => l.facetKey !== pt).map((l) => l.label), s = e.expr.trim();
  return s && a.push(`"${s}"`), a.join(" · ");
}
function ql(e) {
  const { adapter: t } = e, n = f(() => Te(e.schema)), a = f(() => Te(e.defaults) ?? {}), s = f(() => $l(t.search.value, n.value, a.value)), l = f(() => dt(n.value, s.value.entity)), o = f(() => l.value ?? xa(n.value, a.value)), r = f(() => Wt(l.value, n.value)), i = f(() => Pe(l.value, s.value.sort, n.value)), c = (m, k) => {
    const M = Yn(m, n.value, a.value, t.search.value);
    return M === t.search.value && !t.elsewhere?.value ? !1 : (k === "push" ? t.push(M) : t.replace(M), !0);
  }, u = () => Te(e.navigationMode) ?? "push", g = () => Te(e.facetNavigationMode) ?? "replace", _ = (m, k) => c(y(m), k), y = (m) => {
    const k = m.page ?? (rl(m) ? 1 : s.value.page), M = { ...s.value, ...m, page: k };
    return m.view === void 0 && (M.view = tl(s.value, M, a.value, n.value)), M;
  }, h = (m) => v(y(m)), v = (m) => {
    const k = Yn(m, n.value, a.value, t.search.value);
    return t.href ? t.href(k) : `${t.path.value}${k}`;
  }, S = (m, k) => {
    const M = l.value?.facets.find((B) => B.key === m);
    if (!M) return;
    const E = ja(s.value.expr, M, k(za(s.value.expr, M)));
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
    summary: f(() => Rl(s.value, l.value, n.value)),
    terms: f(() => It(s.value, l.value, n.value)),
    isPristine: f(() => kn(s.value)),
    isEverything: f(() => s.value.entity === null),
    hasFacets: f(() => Nl(s.value.expr, l.value)),
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
      S(m, (M) => M.kind !== "chips" ? M : { kind: "chips", selected: M.selected.includes(k) ? M.selected.filter((B) => B !== k) : [...M.selected, k] });
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
        const k = Us(Z(s.value.expr), m.group ?? 0, m.index ?? 0);
        _({ expr: ue(k) }, u());
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
const Jn = 50;
function Hl(e) {
  const t = he([]), n = H(0), a = H(0), s = H(!1), l = H(!1), o = he(null);
  let r = 0, i = null, c = null;
  const u = f(() => (e.query.value.page - 1) * e.limit.value), g = f(() => ol(n.value, e.limit.value)), _ = f(() => Math.max(0, n.value - a.value)), y = () => {
    const x = e.query.value, R = e.within?.value.trim(), O = qa(e.entity.value, x.expr);
    return R ? { ...x, expr: wn(R, O) } : O === x.expr ? x : { ...x, expr: O };
  }, h = (x, R) => {
    t.value = x.rows, n.value = x.total, a.value = x.kept ?? 0, o.value = null, v(R);
  }, v = (x) => {
    i = { key: x, total: n.value }, l.value = !1;
  }, S = (x) => {
    o.value = x, t.value = [], n.value = 0, a.value = 0, i = null, l.value = !1;
  }, C = (x, R, O, K) => {
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
        fe.splice(Xe ?? fe.length, 0, ...ge), t.value = R > 0 ? fe.slice(0, R) : fe, me(re + ge.length);
      },
      set(le) {
        J() && (le.rows && (He(), t.value = R > 0 ? le.rows.slice(0, R) : le.rows, me(le.rows.length)), le.total !== void 0 && me(le.total));
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
    const R = k.value, O = i?.key === R ? i.total : void 0;
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
        c = V.stream(K, C(x, K.limit, R, O)) ?? null;
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
      h(J, R), s.value = !1;
      return;
    }
    s.value = !0, J.then((re) => {
      x === r && h(re, R);
    }).catch((re) => {
      x === r && S(re);
    }).finally(() => {
      x === r && (s.value = !1);
    });
  }, k = f(() => {
    const x = y();
    return `${e.entity.value?.key ?? e.schema.value.entities[0]?.key ?? ""}|${JSON.stringify(bn.map((O) => x[O]))}`;
  }), M = f(() => `${k.value}|${e.query.value.page}`);
  return ne([e.source, M, e.limit], m, {
    immediate: !0
  }), Rt(() => {
    r++, A();
  }, !0), { rows: t, total: n, matched: _, offset: u, pageCount: g, pending: s, counting: l, error: o, refresh: m, locate: async (x, R) => {
    const O = Math.max(0, R - 1 - Jn);
    try {
      const { rows: K } = await e.source.value.query({
        query: y(),
        schema: e.schema.value,
        entity: e.entity.value,
        limit: Jn * 2 + 1,
        offset: O
      }), V = K.findIndex((J) => J.id === x);
      return V === -1 ? null : O + V + 1;
    } catch {
      return null;
    }
  }, peek: async (x, R) => {
    if (R <= 0) return [];
    try {
      const { rows: O } = await e.source.value.query({
        query: y(),
        schema: e.schema.value,
        entity: e.entity.value,
        limit: R,
        offset: Math.max(0, x)
      });
      return O;
    } catch {
      return [];
    }
  } };
}
function Vl(e) {
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
const Fl = 150;
function Dl(e) {
  const t = e.delay ?? Fl, n = H(""), a = H("");
  let s = !1, l;
  const o = () => {
    clearTimeout(l), l = void 0;
  }, r = f(() => rt(Xs(a.value), e.entity.value, e.schema?.value)), i = f(() => r.value.trim() !== ""), c = f(
    () => JSON.stringify([r.value, ...bn.map((y) => e.query.value[y])])
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
  return ua() && Rt(o), {
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
const Kl = 25, Ua = (e, t) => e.toLowerCase() === t.toLowerCase();
function Wl(e, t) {
  return e.find((n) => Ua(n.id, t));
}
function zl(e) {
  const t = he(/* @__PURE__ */ new Map()), n = /* @__PURE__ */ new Set(), a = (r) => {
    if (r.facetKey !== pt) return null;
    const i = Fa(e.schema.value, r.field, r.value);
    return i ? { ...i, key: `${i.entity.key}:${i.id}` } : null;
  }, s = (r) => {
    const { entity: i, id: c } = r, u = e.query.value;
    return e.source.value.query({
      query: {
        ...u,
        entity: i.key,
        // The reference on its own. The rest of the query is about the rows on
        // screen, which are of another type entirely.
        expr: Aa(i, c) ?? "",
        sort: Pe(i, u.sort, e.schema.value).key,
        page: 1
      },
      schema: e.schema.value,
      entity: i,
      limit: Kl,
      offset: 0
    });
  }, l = (r, i) => {
    const c = St(pe(r.columns ?? [], "identity"), i);
    return c === be || Ua(c, i.id) ? "" : c;
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
        const { reference: h } = i[y], v = Wl(_.rows, h.id);
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
const jl = 4, Ul = 8, Ql = 180;
function Gl(e, t, n, a = {}) {
  const s = a.gap ?? jl, l = a.margin ?? Ul, o = a.flipBelow ?? Ql, r = a.side ?? "below", i = {
    below: n.height - e.bottom - s - l,
    above: e.top - s - l
  }, c = r === "below" ? "above" : "below", u = i[r] < o && i[c] > i[r] ? c : r, g = Math.min(a.maxHeight ?? 1 / 0, Math.max(0, i[u])), _ = Math.max(0, n.width - l * 2), y = Math.min(a.minWidth ?? e.width, _), h = Math.min(Math.max(t, y), _), v = a.align === "end" ? e.right - h : e.left, S = Math.max(l, Math.min(v, n.width - h - l));
  return u === "below" ? { side: u, left: S, top: e.bottom + s, maxHeight: g, minWidth: y, maxWidth: _ } : { side: u, left: S, bottom: n.height - e.top + s, maxHeight: g, minWidth: y, maxWidth: _ };
}
const Yl = ["data-dc-theme", "data-dc-side"], Se = [], Xl = /* @__PURE__ */ j({
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
    const n = e, a = t, { theme: s, style: l, adopt: o } = Pn(n), r = H(null), i = H(null), c = { root: () => r.value };
    function u() {
      const m = n.anchor;
      m && (i.value = Gl(
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
      ], 16, Yl)
    ], 8, ["to"])) : L("", !0);
  }
}), G = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [a, s] of t)
    n[a] = s;
  return n;
}, Jl = /* @__PURE__ */ G(Xl, [["__scopeId", "data-v-a688f2f7"]]), Zl = ["href"], eo = /* @__PURE__ */ j({
  __name: "PressLink",
  props: {
    href: {},
    selectable: { type: Boolean }
  },
  emits: ["press"],
  setup(e, { emit: t }) {
    const n = e, a = t;
    function s(r) {
      r.stopPropagation(), !Ra() && (n.href && vn(r) ? fn(n.href, r) : a("press", ft(r), r));
    }
    function l(r) {
      n.href && r.button === 1 && fn(n.href, r);
    }
    function o(r) {
      if (n.href && vn(r)) {
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
    ], 8, Zl)) : (d(), p("button", {
      key: 2,
      type: "button",
      class: "dc-press",
      onClick: o
    }, [
      U(r.$slots, "default", {}, void 0, !0)
    ]));
  }
}), se = /* @__PURE__ */ G(eo, [["__scopeId", "data-v-e5165a68"]]), Bt = (e) => e.toLowerCase().replace(/\s+/g, ""), to = /(?:[^\s"]|"[^"]*"?)*$/, no = /^(-?)([^:=<>"\s-][^:=<>"\s]*)([:=])(.*)$/, Zn = 4;
function ao(e, t) {
  const n = Bt(t);
  return e.find((a) => vt(a) === n || Bt(a.label) === n);
}
function so(e) {
  switch (e.kind) {
    case "toggle":
      return e.text;
    case "range":
      return `${e.min}..${e.max}`;
    case "chips": {
      const t = e.options.slice(0, Zn).join(" · "), n = e.options.length - Zn;
      return n > 0 ? `${t} · +${n}` : t;
    }
  }
}
function lo(e) {
  switch (e.kind) {
    case "toggle":
      return [{ value: "true", hint: e.text }, { value: "false" }];
    case "chips":
      return e.options.map((t) => ({ value: t }));
    case "range":
      return [];
  }
}
function ea(e, t) {
  return Bt(e).includes(Bt(t));
}
function oo(e, t) {
  const n = to.exec(e)?.[0] ?? "", a = e.slice(0, e.length - n.length), s = [], l = no.exec(n);
  if (l) {
    const [, o, r, i, c] = l, u = ao(t, r);
    if (!u) return [];
    const g = c.replace(/"/g, "").toLowerCase();
    for (const { value: _, hint: y } of lo(u)) {
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
      if (r && !ea(i.key, r) && !ea(i.label, r)) continue;
      const c = `${o}${vt(i)}:`;
      s.push({ draft: a + c, label: c, hint: so(i), complete: !1 });
    }
  }
  return s.filter((o) => o.draft !== e);
}
const ro = { class: "dc-header__main" }, io = {
  class: "dc-header__brand",
  "aria-hidden": "true"
}, co = { class: "dc-header__sr" }, uo = {
  key: 2,
  class: "dc-header__within"
}, fo = ["title"], vo = { class: "dc-header__query" }, po = {
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
}, ho = ["data-dc-more", "title"], yo = { class: "dc-header__run" }, mo = {
  key: 0,
  class: "dc-header__or dc-mono",
  "aria-hidden": "true"
}, go = ["title", "aria-label", "onClick"], _o = ["placeholder", "aria-expanded", "aria-activedescendant", "onKeydown"], wo = ["id", "aria-selected", "onClick"], ko = { class: "dc-completion__term dc-mono" }, bo = {
  key: 0,
  class: "dc-completion__hint"
}, $o = {
  key: 0,
  class: "dc-header__actions"
}, xo = /* @__PURE__ */ j({
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
      const P = a.entity.value, I = P?.keepsScope ? void 0 : P?.scope?.toLowerCase(), z = (n.panel || n.top) && !n.hideType;
      return a.terms.value.filter((F) => z || F.facetKey !== ze).map((F, Fe, ve) => {
        const kt = ve[Fe - 1];
        return {
          term: F,
          or: kt?.group !== void 0 && F.group !== void 0 && F.group !== kt.group,
          idle: !!I && F.field?.toLowerCase() === I
        };
      });
    }), r = zl({
      source: a.source,
      schema: a.schema,
      query: a.query,
      loading: a.loading,
      // The scope's parts as well as the query's: it names a record more often
      // than a typed term does, being what a record's own page is built on.
      terms: f(() => [...l.value, ...a.terms.value])
    });
    function i(P) {
      const I = Va(s.value, P)?.scopeLabel ?? P;
      return I.charAt(0).toUpperCase() + I.slice(1);
    }
    function c(P) {
      return P.replace(/\s*\([^()]*\)\s*$/, "");
    }
    function u(P) {
      if (P.facetKey === ze) {
        const F = a.entity.value?.label;
        return F ? `${F} · ${Ne((a.matched ?? a.total).value)}` : P.label;
      }
      const I = r.nameOf(P);
      return I ? `${P.negated ? "-" : ""}${i(P.field)}: ${c(I)}` : P.label;
    }
    function g(P) {
      const I = u(P.term), z = P.idle ? `Not applied to ${a.entity.value?.label} — remove ${I}` : `Remove ${I}`, F = P.term.address;
      return F && F !== I ? `${z}
Written ${F} in the address and the search box` : z;
    }
    const _ = f(() => {
      const P = a.pressPreview?.value;
      if (!P) return [];
      const I = a.query.value, z = new Set(a.terms.value.map((F) => F.address));
      return It(
        { ...I, expr: P.alone ? P.term : ct(Yt(I.expr, P.lifts ?? []), P.term) },
        a.entity.value,
        a.schema.value
      ).filter((F) => F.address !== void 0 && !z.has(F.address)).map(
        (F) => P.name ? `${i(F.field)}: ${c(P.name)}` : F.label
      );
    });
    function y(P) {
      const I = a.pressPreview?.value;
      return I ? I.alone ? !0 : !P.negated && P.field !== void 0 && (I.lifts ?? []).includes(P.field.toLowerCase()) : !1;
    }
    const h = H(null);
    function v(P) {
      h.value = P instanceof HTMLInputElement ? P : null;
    }
    function S() {
      a.abandonDraft(), h.value?.blur();
    }
    function C() {
      const P = k.value[m.value];
      if (M.value && P) {
        B(P);
        return;
      }
      O.value = null, A.value = !1, a.commitDraft();
    }
    const A = H(!1), m = H(-1), k = f(() => {
      const P = a.entity.value?.facets ?? [];
      return P.length ? oo(a.draft.value, P) : [];
    }), M = f(() => A.value && k.value.length > 0);
    ne(k, () => {
      m.value = -1;
    });
    const E = `${Vt() ?? "dc-header"}-completions`;
    function B(P) {
      a.draft.value = P.draft, A.value = !P.complete, m.value = -1, lt(() => {
        const I = h.value;
        I?.focus(), I?.setSelectionRange(P.draft.length, P.draft.length);
      });
    }
    function x(P, I) {
      if (P.isComposing || !k.value.length) return;
      if (P.preventDefault(), !A.value) {
        A.value = !0;
        return;
      }
      const z = k.value.length + 1;
      m.value = (m.value + 1 + I + z) % z - 1;
    }
    function R(P) {
      return `${E}-${P}`;
    }
    const O = H(null), K = f(() => Math.min(O.value ?? 1 / 0, o.value.length)), V = f(() => [
      { key: "before", entries: o.value.slice(0, K.value) },
      { key: "after", entries: o.value.slice(K.value) }
    ]), J = f(() => K.value < o.value.length);
    ne(o, (P) => {
      O.value !== null && O.value >= P.length && (O.value = null);
    });
    function re(P, I) {
      O.value = P >= o.value.length ? null : Math.max(0, P), lt(() => {
        const z = h.value;
        if (!z) return;
        const F = I === "start" ? 0 : z.value.length;
        z.setSelectionRange(F, F), z.scrollIntoView({ block: "nearest", inline: "nearest" }), Ee();
      });
    }
    function ye(P) {
      const I = h.value;
      return !I || I.selectionStart !== I.selectionEnd ? !1 : I.selectionStart === (P === "start" ? 0 : I.value.length);
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
    function fe(P, I) {
      I && O.value !== null && (O.value = Math.max(0, O.value - 1)), a.removeTerm(P);
    }
    function Je(P) {
      P.target?.closest("button, input") || (P.preventDefault(), h.value?.focus(), re(o.value.length, "end"));
    }
    function Zt() {
      A.value = !1, a.draft.value || (O.value = null);
    }
    const Ze = H(null), Ve = H("");
    function Ee() {
      const P = Ze.value;
      if (!P) {
        Ve.value = "";
        return;
      }
      const I = P.scrollLeft > 1, z = P.scrollWidth - P.clientWidth - P.scrollLeft > 1;
      Ve.value = I && z ? "both" : I ? "start" : z ? "end" : "";
    }
    let $e = null;
    return ne(
      Ze,
      (P) => {
        $e?.disconnect(), $e = null, Ee(), !(!P || typeof ResizeObserver > "u") && ($e = new ResizeObserver(Ee), $e.observe(P));
      },
      { flush: "post" }
    ), ne([o, K], Ee, { flush: "post" }), ke(() => $e?.disconnect()), (P, I) => (d(), p("div", {
      class: oe(["dc-header", { "dc-header--panel": n.panel, "dc-header--top": n.top }])
    }, [
      b("div", ro, [
        !n.panel && !n.top && s.value.label && t.brand ? (d(), q(se, {
          key: 0,
          class: "dc-header__domain",
          "data-dc-brand": "",
          title: "Home",
          href: w(a).homeHref(),
          onPress: I[0] || (I[0] = (z) => w(a).reset())
        }, {
          default: Y(() => [
            b("span", io, [
              U(P.$slots, "brand", {
                label: s.value.label
              }, void 0, !0)
            ]),
            b("span", co, T(s.value.label), 1)
          ]),
          _: 3
        }, 8, ["href"])) : !n.panel && !n.top && s.value.label ? (d(), q(se, {
          key: 1,
          class: "dc-header__domain",
          title: "Home",
          href: w(a).homeHref(),
          onPress: I[1] || (I[1] = (z) => w(a).reset())
        }, {
          default: Y(() => [
            ee(T(s.value.label), 1)
          ]),
          _: 1
        }, 8, ["href"])) : L("", !0),
        U(P.$slots, "lead", {}, void 0, !0),
        l.value.length ? (d(), p("span", uo, [
          I[10] || (I[10] = b("span", { class: "dc-header__sr" }, "Within", -1)),
          (d(!0), p(W, null, X(l.value, (z) => (d(), p("span", {
            key: `scope:${z.id}`,
            class: "dc-within dc-mono dc-truncate",
            title: u(z)
          }, T(u(z)), 9, fo))), 128))
        ])) : L("", !0),
        b("div", vo, [
          b("div", {
            class: "dc-header__field",
            onMousedown: Je
          }, [
            n.top ? (d(), p("svg", po, [...I[11] || (I[11] = [
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
                b("span", yo, [
                  (d(!0), p(W, null, X(z.entries, (F) => (d(), p(W, {
                    key: F.term.id
                  }, [
                    F.or ? (d(), p("span", mo, "or")) : L("", !0),
                    b("button", {
                      type: "button",
                      class: oe(["dc-term dc-mono", { "dc-term--idle": F.idle, "dc-term--leaving": y(F.term), "dc-term--type": F.term.facetKey === w(ze) }]),
                      title: g(F),
                      "aria-label": `Remove ${u(F.term)}`,
                      onMousedown: I[2] || (I[2] = xe(() => {
                      }, ["prevent"])),
                      onClick: (Fe) => fe(F.term, z.key === "before")
                    }, T(u(F.term)), 43, go)
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
                  "onUpdate:modelValue": I[3] || (I[3] = (F) => w(a).draft.value = F),
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
                  "aria-activedescendant": M.value && m.value >= 0 ? R(m.value) : void 0,
                  onKeydown: [
                    Le(xe(C, ["prevent"]), ["enter"]),
                    Le(xe(S, ["prevent"]), ["esc"]),
                    I[4] || (I[4] = Le((F) => x(F, 1), ["down"])),
                    I[5] || (I[5] = Le((F) => x(F, -1), ["up"])),
                    ge
                  ],
                  onFocus: I[6] || (I[6] = (F) => A.value = !0),
                  onInput: I[7] || (I[7] = (F) => A.value = !0),
                  onBlur: Zt
                }, null, 46, _o)), [
                  [da, w(a).draft.value]
                ]) : L("", !0)
              ], 64))), 128))
            ], 40, ho)
          ], 32)
        ])
      ]),
      Q(Jl, {
        id: E,
        open: M.value,
        anchor: h.value,
        "min-width": 0,
        "max-height": 320,
        class: "dc-completions",
        role: "listbox",
        "aria-label": "Completions",
        onClose: I[9] || (I[9] = (z) => A.value = !1)
      }, {
        default: Y(() => [
          (d(!0), p(W, null, X(k.value, (z, F) => (d(), p("div", {
            id: R(F),
            key: z.label,
            class: oe(["dc-completion", { "dc-completion--active": F === m.value }]),
            role: "option",
            "aria-selected": F === m.value,
            onMousedown: I[8] || (I[8] = xe(() => {
            }, ["prevent"])),
            onClick: (Fe) => B(z)
          }, [
            b("span", ko, T(z.label), 1),
            z.hint ? (d(), p("span", bo, T(z.hint), 1)) : L("", !0)
          ], 42, wo))), 128))
        ]),
        _: 1
      }, 8, ["open", "anchor"]),
      t.actions ? (d(), p("div", $o, [
        U(P.$slots, "actions", {}, void 0, !0)
      ])) : L("", !0)
    ], 2));
  }
}), Ct = /* @__PURE__ */ G(xo, [["__scopeId", "data-v-bcc55282"]]), So = ["checked", "indeterminate"], Qa = /* @__PURE__ */ j({
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
    }, null, 40, So));
  }
}), Co = { class: "dc-pick" }, Po = ["id"], Mo = ["id", "aria-expanded", "aria-labelledby", "data-dc-value"], Eo = {
  key: 0,
  class: "dc-pick__icon",
  viewBox: "0 0 16 16",
  "aria-hidden": "true"
}, To = ["d"], Lo = { class: "dc-pick__label" }, Oo = /* @__PURE__ */ j({
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
    return (k, M) => (d(), p("span", Co, [
      b("span", {
        id: `${w(s)}-name`,
        class: "dc-pick__name"
      }, T(e.label), 9, Po),
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
        g.value?.icon ? (d(), p("svg", Eo, [
          b("path", {
            d: g.value.icon
          }, null, 8, To)
        ])) : L("", !0),
        b("span", Lo, T(g.value?.label), 1)
      ], 42, Mo),
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
        Q(w(ms), {
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
}), hn = /* @__PURE__ */ G(Oo, [["__scopeId", "data-v-0e31a711"]]), Ao = {
  class: "dc-pager",
  "aria-label": "Pages"
}, No = ["title"], Io = ["value", "onKeydown"], Bo = {
  class: "dc-pager__total",
  "aria-hidden": "true"
}, Ro = {
  class: "dc-pager__sr",
  "aria-live": "polite"
}, qo = /* @__PURE__ */ j({
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
    return (y, h) => (d(), p("nav", Ao, [
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
        }, null, 44, Io),
        b("span", Bo, "/ " + T(s.value), 1)
      ], 8, No),
      b("span", Ro, T(l.value), 1),
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
}), Ho = /* @__PURE__ */ G(qo, [["__scopeId", "data-v-bdec7640"]]), Vo = {
  key: 0,
  class: "dc-actions__order"
}, Fo = {
  key: 1,
  class: "dc-actions__select"
}, Do = {
  key: 0,
  class: "dc-actions__all"
}, Ko = {
  class: "dc-actions__count",
  "aria-live": "polite"
}, Wo = {
  key: 1,
  class: "dc-actions__count dc-actions__all",
  "aria-live": "polite"
}, zo = { class: "dc-actions__ops" }, jo = ["title", "disabled"], Uo = ["title", "disabled"], Qo = ["disabled"], Go = ["data-dc-operation", "disabled", "onClick"], Yo = ["disabled"], Xo = /* @__PURE__ */ j({
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
      () => !Ca(n.query.value, t.views) && a.value !== "record"
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
    return (E, B) => S.value ? (d(), p("div", {
      key: 0,
      class: oe(["dc-actions", { "dc-actions--selection-end": A.value }])
    }, [
      s.value ? (d(), p("span", Vo, [
        o.value ? (d(), q(hn, {
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
          onPress: B[0] || (B[0] = (x) => w(n).toggleDirection())
        }, {
          default: Y(() => [
            ee(T(r.value ? "↓" : "↑"), 1)
          ]),
          _: 1
        }, 8, ["aria-label", "title", "href"])
      ])) : L("", !0),
      h.value && C.value ? (d(), p("div", Fo, [
        v.value ? (d(), p("span", Wo, T(C.value), 1)) : (d(), p("label", Do, [
          Q(Qa),
          b("span", Ko, T(C.value), 1)
        ])),
        y.value ? (d(), p("button", {
          key: 2,
          type: "button",
          class: oe(["dc-actions__clear", { "dc-actions__clear--op": A.value }]),
          onClick: B[1] || (B[1] = (x) => w(n).clearSelection())
        }, " Clear ", 2)) : L("", !0)
      ])) : L("", !0),
      b("div", zo, [
        c.value?.create ? (d(), q(se, {
          key: 0,
          class: "dc-actions__op dc-actions__new",
          href: w(n).createHref?.(c.value),
          onPress: B[2] || (B[2] = (x) => w(n).create(c.value))
        }, {
          default: Y(() => [
            B[7] || (B[7] = b("span", {
              class: "dc-actions__plus",
              "aria-hidden": "true"
            }, "+", -1)),
            ee(" " + T(c.value.create), 1)
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
            onClick: B[3] || (B[3] = (x) => w(n).standSelection("in"))
          }, T(k("Include")), 9, jo),
          b("button", {
            type: "button",
            class: "dc-actions__op",
            "data-dc-operation": "exclude",
            title: m.value ? `Leave the ${m.value} ticked out of the query` : "Tick rows to leave them out of the query",
            disabled: !m.value,
            onClick: B[4] || (B[4] = (x) => w(n).standSelection("out"))
          }, T(k("Exclude")), 9, Uo)
        ], 64)) : L("", !0),
        c.value?.duplicate ? (d(), p("button", {
          key: 2,
          type: "button",
          class: "dc-actions__op",
          disabled: !y.value,
          onClick: B[5] || (B[5] = (x) => w(n).duplicate())
        }, T(M(c.value.duplicate)), 9, Qo)) : L("", !0),
        (d(!0), p(W, null, X(c.value?.operations ?? [], (x) => (d(), p("button", {
          key: x.key,
          type: "button",
          class: "dc-actions__op",
          "data-dc-operation": x.key,
          disabled: !y.value && x.selection !== !1,
          onClick: (R) => w(n).operate(x.key)
        }, T(x.selection === !1 ? x.label : M(x.label)), 9, Go))), 128)),
        c.value?.delete ? (d(), p("button", {
          key: 3,
          type: "button",
          class: "dc-actions__op dc-actions__danger",
          disabled: !y.value,
          onClick: B[6] || (B[6] = (x) => w(n).delete())
        }, T(M(c.value.delete)), 9, Yo)) : L("", !0)
      ]),
      _.value ? (d(), q(Ho, {
        key: 2,
        class: "dc-actions__pages",
        "pages-note": e.pagesNote
      }, null, 8, ["pages-note"])) : L("", !0)
    ], 2)) : L("", !0);
  }
}), Pt = /* @__PURE__ */ G(Xo, [["__scopeId", "data-v-b7cd42d5"]]);
function ta(e) {
  return Math.max(0, e.total - (e.kept ?? 0));
}
function Ga(e) {
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
      const S = qa(v, c.expr), C = _ ? wn(_, S) : S;
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
        A = !0, m({ total: ta(M), pending: !1, counted: !0 });
      })) : (A = !0, y.set(v.key, { total: ta(k), pending: !1, counted: !0 }));
    }
    h = !1, t.value = y;
  };
  return ua() && Rt(l), { counts: t, pristine: n, refresh: o, cancel: l };
}
const Jo = {
  key: 1,
  class: "dc-show-as"
}, Zo = {
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
}, er = ["d"], tr = ["aria-expanded", "aria-controls", "aria-activedescendant", "placeholder"], nr = ["id"], ar = ["id", "aria-selected", "onMousedown", "onMousemove"], sr = {
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
}, lr = ["d"], or = { class: "dc-show-as__text" }, rr = { class: "dc-show-as__name" }, ir = {
  key: 0,
  class: "dc-show-as__hint"
}, cr = {
  class: "dc-show-as__check",
  "aria-hidden": "true"
}, ur = {
  key: 0,
  class: "dc-show-as__none",
  role: "presentation"
}, dr = "…", fr = /* @__PURE__ */ j({
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
    ), l = Ga({
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
      return V ? V.counted ? `${V.pending ? "~" : ""}${Ne(V.total)}` : dr : ut(O);
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
          label: t.labels?.[V] ?? (V === "record" ? a.recordView.value?.label ?? Un.record : We(V) ? Un[V] : J?.label ?? V),
          icon: We(V) ? Qn[V] : J?.icon ?? Qn.list,
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
    function B() {
      S.value ? v.value?.blur() : v.value?.focus();
    }
    function x(O) {
      O !== g.value && h(O), v.value?.blur();
    }
    function R(O) {
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
      i.value && !e.stacked ? (d(), q(hn, {
        key: 0,
        class: "dc-actions__pick dc-actions__type",
        label: "Type",
        "model-value": w(a).query.value.entity ?? "",
        options: r.value,
        onOpen: w(l).refresh,
        onClose: w(l).cancel,
        "onUpdate:modelValue": c
      }, null, 8, ["model-value", "options", "onOpen", "onClose"])) : L("", !0),
      _.value && e.stacked ? (d(), p("div", Jo, [
        b("label", {
          for: n,
          class: "dc-show-as__label"
        }, [...K[2] || (K[2] = [
          ee("Show as ", -1),
          b("span", { class: "dc-mono" }, "(u)", -1)
        ])]),
        b("div", {
          class: oe(["dc-show-as__field", { "dc-show-as__field--open": S.value }])
        }, [
          (d(), p("svg", Zo, [
            b("path", {
              d: m.value?.icon
            }, null, 8, er)
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
            onKeydown: R
          }, null, 40, tr), [
            [da, C.value]
          ]),
          b("button", {
            type: "button",
            class: "dc-show-as__toggle",
            tabindex: "-1",
            "aria-label": "Open Show as",
            onMousedown: xe(B, ["prevent"])
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
              (d(), p("svg", sr, [
                b("path", {
                  d: V.icon
                }, null, 8, lr)
              ])),
              b("span", or, [
                b("span", rr, T(V.label), 1),
                V.hint ? (d(), p("span", ir, T(V.hint), 1)) : L("", !0)
              ]),
              b("span", cr, T(V.key === g.value ? "✓" : ""), 1)
            ], 46, ar))), 128)),
            k.value.length ? L("", !0) : (d(), p("li", ur, " No format matches “" + T(C.value) + "” ", 1))
          ], 8, nr)) : L("", !0)
        ], 2)
      ])) : _.value ? (d(), q(hn, {
        key: 2,
        class: "dc-actions__pick dc-actions__view",
        label: "View",
        "model-value": g.value,
        options: u.value,
        "onUpdate:modelValue": h
      }, null, 8, ["model-value", "options"])) : L("", !0)
    ], 2)) : L("", !0);
  }
}), na = /* @__PURE__ */ G(fr, [["__scopeId", "data-v-070ebf59"]]), vr = { class: "dc-types-panel__list" }, pr = ["id", "checked", "onChange"], hr = ["for"], yr = ["title", "onClick"], mr = { class: "dc-types-panel__count dc-mono" }, gr = /* @__PURE__ */ j({
  __name: "ShellTypes",
  setup(e) {
    const t = te();
    function n(y) {
      return ue(
        Z(y).map((h) => h.filter((v) => !(v.kind === "field" && v.field === "entity"))).filter((h) => h.length > 0)
      );
    }
    const a = f(() => {
      const y = Z(t.query.value.expr);
      return y.length !== 1 ? /* @__PURE__ */ new Set() : new Set(
        y[0].flatMap(
          (h) => h.kind === "field" && h.field === "entity" && h.negated ? [h.value.toLowerCase()] : []
        )
      );
    }), s = f(() => n(t.query.value.expr)), l = Ga({
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
      b("ul", vr, [
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
          }, null, 40, pr),
          b("label", {
            for: `${_}-${v.key}`,
            class: "dc-types-panel__name"
          }, T(v.label), 9, hr),
          b("button", {
            type: "button",
            class: "dc-types-panel__only",
            title: `Only ${v.label}`,
            onClick: (S) => g(v)
          }, " only ", 8, yr),
          b("span", mr, T(o(v)), 1)
        ]))), 128))
      ])
    ])) : L("", !0);
  }
}), _r = /* @__PURE__ */ G(gr, [["__scopeId", "data-v-32178b7f"]]);
function wr(e, t) {
  if (!e) return null;
  const n = ie(e, t);
  return typeof n == "string" && n.trim() ? n : null;
}
const kr = (e) => e == null || typeof e == "string" && !e.trim();
function br(e, t) {
  const n = pe(t, "state"), a = pe(t, "tint");
  return {
    identity: St(pe(t, "identity"), e),
    reference: St(pe(t, "reference"), e),
    metrics: pa(t, "metric").map((s) => ({
      column: s,
      label: s.label ?? "",
      text: Me(s, e)
    })),
    facts: t.filter((s) => s.cardLabel && !kr(ie(s, e))).map((s) => ({
      column: s,
      label: s.cardLabel,
      title: [s.label, s.hint].filter(Boolean).join(" — "),
      text: Me(s, e)
    })),
    state: n ? ie(n, e) ?? null : null,
    updated: St(pe(t, "updated"), e),
    image: wr(pe(t, "image"), e),
    tint: a ? ie(a, e) ?? null : null
  };
}
function Ya(e, t, n, a, s = !1) {
  const l = n?.columns ?? [];
  return {
    row: e,
    key: Ls(e, t),
    entityLabel: e.entityLabel,
    entity: n,
    columns: l,
    ordinal: $s(t),
    parts: br(e, l),
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
      (n, a) => Ya(
        n,
        e.offset.value + a,
        t.value.get(n.entityKey) ?? null,
        e.isPinned(n),
        e.isSelected(n)
      )
    )
  );
}
const $r = ["data-dc-status", "data-dc-tone"], xr = /* @__PURE__ */ j({
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
    }, T(n.value), 9, $r));
  }
}), Qe = /* @__PURE__ */ G(xr, [["__scopeId", "data-v-686eb9b6"]]), Sr = { key: 1 }, Cr = /* @__PURE__ */ j({
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
          ee(T(o.value), 1)
        ], !0)
      ]),
      _: 3
    }, 8, ["href", "title"])) : (d(), p("span", Sr, [
      U(u.$slots, "default", {}, () => [
        ee(T(o.value), 1)
      ], !0)
    ]));
  }
}), mt = /* @__PURE__ */ G(Cr, [["__scopeId", "data-v-bbbd334b"]]), Pr = ["data-dc-active", "aria-pressed", "aria-label"], Mr = /* @__PURE__ */ j({
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
    }, T(e.pinned ? "★" : "☆"), 9, Pr));
  }
}), Mn = /* @__PURE__ */ G(Mr, [["__scopeId", "data-v-ef63d763"]]), Er = ["src"], Tr = /* @__PURE__ */ j({
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
    }, null, 40, Er)) : L("", !0);
  }
}), Xt = /* @__PURE__ */ G(Tr, [["__scopeId", "data-v-afaab300"]]), Lr = ["data-dc-standing", "title", "aria-label"], Or = /* @__PURE__ */ j({
  __name: "QueryMark",
  props: {
    entry: {}
  },
  setup(e) {
    const t = e, n = te(), a = f(() => Qt(t.entry.entity, t.entry.row)), s = f(() => Ba(n.query.value.expr, a.value)), l = f(
      () => s.value === "in" ? `The query narrows to ${t.entry.parts.identity} — press to lift that` : `The query leaves out ${t.entry.parts.identity} — press to lift that`
    );
    function o(r) {
      r.stopPropagation(), n.setExpression(Cn(n.query.value.expr, a.value));
    }
    return (r, i) => s.value ? (d(), p("button", {
      key: 0,
      type: "button",
      class: "dc-standing",
      "data-dc-standing": s.value,
      title: l.value,
      "aria-label": l.value,
      onClick: o
    }, T(s.value === "in" ? "+" : "−"), 9, Lr)) : L("", !0);
  }
}), gt = /* @__PURE__ */ G(Or, [["__scopeId", "data-v-4b8d4166"]]), Ar = ["href", "title", "aria-label"], Nr = /* @__PURE__ */ j({
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
    }, "↗", 8, Ar)) : L("", !0);
  }
}), _t = /* @__PURE__ */ G(Nr, [["__scopeId", "data-v-b00f390d"]]), Ir = /* @__PURE__ */ j({
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
        ee(" → ", -1)
      ])]),
      _: 1
    }, 8, ["href", "data-dc-pending", "title", "aria-label"])) : L("", !0);
  }
}), wt = /* @__PURE__ */ G(Ir, [["__scopeId", "data-v-05d2c233"]]), Br = ["checked", "aria-label"], qe = /* @__PURE__ */ j({
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
    }, null, 8, Br));
  }
}), Rr = { class: "dc-card__top dc-mono" }, qr = { class: "dc-card__lead" }, Hr = {
  key: 2,
  class: "dc-card__entity"
}, Vr = { class: "dc-card__top-right" }, Fr = { class: "dc-card__names" }, Dr = { class: "dc-card__primary" }, Kr = {
  key: 0,
  class: "dc-card__secondary dc-mono"
}, Wr = {
  key: 1,
  class: "dc-card__facts dc-mono"
}, zr = ["title"], jr = { class: "dc-card__fact-label" }, Ur = {
  key: 0,
  class: "dc-card__metrics dc-mono"
}, Qr = {
  key: 0,
  class: "dc-card__date"
}, Gr = /* @__PURE__ */ j({
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
        b("div", Rr, [
          b("span", qr, [
            w(t).selectable.value ? (d(), q(qe, {
              key: 0,
              row: i.row,
              selected: i.selected,
              name: i.parts.identity
            }, null, 8, ["row", "selected", "name"])) : L("", !0),
            s(i) ? L("", !0) : (d(), p(W, { key: 1 }, [
              ee(T(i.ordinal), 1)
            ], 64)),
            a.value ? (d(), p("span", Hr, T(i.entityLabel), 1)) : L("", !0)
          ]),
          b("span", Vr, [
            i.parts.state && !s(i) ? (d(), q(Qe, {
              key: 0,
              status: i.parts.state
            }, null, 8, ["status"])) : L("", !0),
            Q(gt, { entry: i }, null, 8, ["entry"]),
            Q(wt, { entry: i }, null, 8, ["entry"]),
            Q(_t, { entry: i }, null, 8, ["entry"]),
            w(t).pinnable.value ? (d(), q(Mn, {
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
            i.parts.image ? (d(), q(Xt, {
              key: 0,
              class: "dc-card__image",
              src: i.parts.image
            }, null, 8, ["src"])) : L("", !0),
            b("span", Fr, [
              b("span", Dr, T(i.parts.identity), 1),
              s(i) ? L("", !0) : (d(), p("span", Kr, T(i.parts.reference), 1)),
              i.parts.facts.length ? (d(), p("span", Wr, [
                (d(!0), p(W, null, X(i.parts.facts, (c) => (d(), p("span", {
                  key: c.column.key ?? c.label,
                  class: "dc-card__fact",
                  title: c.title || void 0
                }, [
                  b("span", jr, T(c.label), 1),
                  ee(" " + T(c.text), 1)
                ], 8, zr))), 128))
              ])) : L("", !0)
            ])
          ]),
          _: 2
        }, 1032, ["href", "onPress"]),
        s(i) ? L("", !0) : (d(), p("div", Ur, [
          (d(!0), p(W, null, X(i.parts.metrics.slice(0, 2), (c) => (d(), q(mt, {
            key: c.column.key ?? c.label,
            entry: i,
            column: c.column
          }, {
            default: Y(() => [
              ee(T(c.label) + " " + T(c.text), 1)
            ]),
            _: 2
          }, 1032, ["entry", "column"]))), 128)),
          i.parts.updated ? (d(), p("span", Qr, T(i.parts.updated), 1)) : L("", !0)
        ]))
      ], 2))), 128))
    ], 2));
  }
}), Xa = /* @__PURE__ */ G(Gr, [["__scopeId", "data-v-a90319f2"]]), Yr = { class: "dc-grid" }, Xr = { class: "dc-tile__scrim" }, Jr = { class: "dc-tile__top dc-mono" }, Zr = { class: "dc-tile__chip" }, ei = { class: "dc-tile__caption" }, ti = { class: "dc-tile__secondary dc-truncate" }, ni = { class: "dc-tile__primary" }, ai = /* @__PURE__ */ j({
  __name: "GridView",
  setup(e) {
    const t = te(), n = Re();
    return (a, s) => (d(), p("div", Yr, [
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
            l.parts.image ? (d(), q(Xt, {
              key: 0,
              class: "dc-tile__image",
              src: l.parts.image
            }, null, 8, ["src"])) : L("", !0),
            b("span", Xr, [
              b("span", Jr, [
                b("span", Zr, T(l.ordinal), 1)
              ]),
              b("span", ei, [
                b("span", ti, T(l.parts.reference), 1),
                b("span", ni, T(l.parts.identity), 1)
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
}), Ja = /* @__PURE__ */ G(ai, [["__scopeId", "data-v-89c40a9e"]]);
function aa(e, t, n, a) {
  return (n - a * (t - 1)) / e;
}
function rn(e, t) {
  return e > 0 ? Math.min(t, e) : t;
}
function si(e) {
  return e > 0 ? e : 1 / 0;
}
function li(e, t, n) {
  const { width: a, height: s, gap: l = 0 } = n;
  if (!e.length) return [];
  if (!(a > 0) || !(s > 0)) return [{ items: [...e], height: s, filled: !1 }];
  const o = [];
  let r = [], i = 0, c = 0;
  for (const u of e) {
    const g = t(u), _ = Math.max(g.ratio, Number.EPSILON), y = g.height && g.height > 0 ? Math.max(c, g.height) : c, h = rn(y, s), v = aa(i + _, r.length + 1, a, l);
    if (v > h) {
      r.push(u), i += _, c = y;
      continue;
    }
    const S = rn(c, s), C = r.length ? aa(i, r.length, a, l) : 1 / 0;
    C <= si(c) && C - S < h - v ? (o.push({ items: r, height: C, filled: !0 }), r = [u], i = _, c = g.height && g.height > 0 ? g.height : 0) : (o.push({ items: [...r, u], height: v, filled: !0 }), r = [], i = 0, c = 0);
  }
  return r.length && o.push({ items: r, height: rn(c, s), filled: !1 }), o;
}
const oi = { class: "dc-images" }, ri = {
  key: 1,
  class: "dc-images__blank",
  "aria-hidden": "true"
}, ii = 240, bt = 8, ci = 1, ui = /* @__PURE__ */ j({
  __name: "ImagesView",
  setup(e) {
    const t = te(), n = Re(), a = On(/* @__PURE__ */ new Map()), s = On(/* @__PURE__ */ new Set());
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
      return v ? { ratio: v.width / v.height, height: v.height } : { ratio: ci };
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
      const h = li(n.value, i, {
        width: u.value,
        height: ii,
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
    return (h, v) => (d(), p("div", oi, [
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
              o(S) ? (d(), q(Xt, {
                key: 0,
                class: "dc-images__picture",
                style: ae(A),
                src: o(S),
                onLoad: (m) => l(o(S), m),
                onError: (m) => s.add(o(S))
              }, null, 8, ["style", "src", "onLoad", "onError"])) : (d(), p("span", ri, T(S.parts.identity), 1))
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
}), Za = /* @__PURE__ */ G(ui, [["__scopeId", "data-v-2d267370"]]), di = { class: "dc-links" }, fi = { class: "dc-link__primary dc-truncate" }, vi = { class: "dc-link__secondary dc-mono dc-truncate" }, pi = /* @__PURE__ */ j({
  __name: "LinksView",
  setup(e) {
    const t = te(), n = Re();
    return (a, s) => (d(), p("div", di, [
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
            b("span", fi, T(l.parts.identity), 1),
            b("span", vi, T(l.parts.reference), 1)
          ]),
          _: 2
        }, 1032, ["href", "onPress"])
      ]))), 128))
    ]));
  }
}), es = /* @__PURE__ */ G(pi, [["__scopeId", "data-v-de6c9a0f"]]), hi = {
  class: "dc-list",
  role: "list"
}, yi = { class: "dc-list__ordinal dc-mono" }, mi = { class: "dc-list__identity" }, gi = ["title"], _i = ["title"], wi = {
  key: 1,
  class: "dc-list__entity dc-mono"
}, ki = { class: "dc-list__metrics dc-mono" }, bi = { class: "dc-list__trailing" }, $i = /* @__PURE__ */ j({
  __name: "ListView",
  setup(e) {
    const t = te(), n = Re(), a = f(() => t.isEverything.value);
    return (s, l) => (d(), p("div", hi, [
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
            b("span", yi, T(o.ordinal), 1),
            b("span", mi, [
              b("span", {
                class: "dc-list__primary dc-truncate",
                title: o.parts.identity
              }, T(o.parts.identity), 9, gi),
              b("span", {
                class: "dc-list__secondary dc-mono dc-truncate",
                title: o.parts.reference || void 0
              }, T(o.parts.reference), 9, _i)
            ])
          ]),
          _: 2
        }, 1032, ["href", "onPress"]),
        a.value ? (d(), p("span", wi, T(o.entityLabel), 1)) : L("", !0),
        b("span", ki, [
          (d(!0), p(W, null, X(o.parts.metrics.slice(0, 2), (r) => (d(), q(mt, {
            key: r.column.key ?? r.label,
            entry: o,
            column: r.column
          }, null, 8, ["entry", "column"]))), 128))
        ]),
        b("span", bi, [
          o.parts.state ? (d(), q(Qe, {
            key: 0,
            status: o.parts.state
          }, null, 8, ["status"])) : L("", !0),
          Q(gt, { entry: o }, null, 8, ["entry"]),
          Q(wt, { entry: o }, null, 8, ["entry"]),
          Q(_t, { entry: o }, null, 8, ["entry"]),
          w(t).pinnable.value ? (d(), q(Mn, {
            key: 1,
            row: o.row,
            name: o.parts.identity,
            pinned: o.pinned
          }, null, 8, ["row", "name", "pinned"])) : L("", !0)
        ])
      ]))), 128))
    ]));
  }
}), yn = /* @__PURE__ */ G($i, [["__scopeId", "data-v-ca54d88f"]]), xi = { class: "dc-preview" }, Si = { class: "dc-preview__pager dc-mono" }, Ci = ["disabled"], Pi = { "aria-live": "polite" }, Mi = ["disabled"], Ei = {
  key: 0,
  class: "dc-preview__card"
}, Ti = ["src"], Li = { class: "dc-preview__body" }, Oi = { class: "dc-preview__top" }, Ai = { class: "dc-preview__badges" }, Ni = { class: "dc-preview__entity dc-mono" }, Ii = { class: "dc-preview__marks" }, Bi = { class: "dc-preview__primary" }, Ri = { class: "dc-preview__secondary dc-mono" }, qi = { class: "dc-preview__fields" }, Hi = { class: "dc-preview__key" }, Vi = { class: "dc-preview__value dc-mono" }, Fi = /* @__PURE__ */ j({
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
    return (i, c) => (d(), p("div", xi, [
      b("div", Si, [
        b("button", {
          type: "button",
          class: "dc-preview__step",
          "aria-label": "Previous result",
          disabled: a.value === 0,
          onClick: c[0] || (c[0] = (u) => r(-1))
        }, " ‹ ", 8, Ci),
        b("span", Pi, T(o.value), 1),
        b("button", {
          type: "button",
          class: "dc-preview__step",
          "aria-label": "Next result",
          disabled: a.value >= w(n).length - 1,
          onClick: c[1] || (c[1] = (u) => r(1))
        }, " › ", 8, Mi)
      ]),
      s.value ? (d(), p("div", Ei, [
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
          }, null, 8, Ti)) : (d(), p(W, { key: 1 }, [
            ee(" preview ")
          ], 64))
        ], 4),
        b("div", Li, [
          b("div", Oi, [
            b("span", Ai, [
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
              b("span", Ni, T(s.value.entityLabel), 1)
            ]),
            b("span", Ii, [
              Q(gt, { entry: s.value }, null, 8, ["entry"]),
              Q(wt, { entry: s.value }, null, 8, ["entry"]),
              Q(_t, { entry: s.value }, null, 8, ["entry"]),
              w(t).pinnable.value ? (d(), q(Mn, {
                key: 0,
                row: s.value.row,
                name: s.value.parts.identity,
                pinned: s.value.pinned
              }, null, 8, ["row", "name", "pinned"])) : L("", !0)
            ])
          ]),
          b("div", null, [
            b("div", Bi, T(s.value.parts.identity), 1),
            b("div", Ri, T(s.value.parts.reference), 1)
          ]),
          b("dl", qi, [
            (d(!0), p(W, null, X(l.value, (u) => (d(), p("div", {
              key: u.key,
              class: "dc-preview__field"
            }, [
              b("dt", Hi, T(u.key), 1),
              b("dd", Vi, [
                u.column && s.value ? (d(), q(mt, {
                  key: 0,
                  entry: s.value,
                  column: u.column
                }, null, 8, ["entry", "column"])) : (d(), p(W, { key: 1 }, [
                  ee(T(u.value), 1)
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
              ee(" Open record → ", -1)
            ])]),
            _: 1
          }, 8, ["href"])
        ])
      ])) : L("", !0)
    ]));
  }
}), ts = /* @__PURE__ */ G(Fi, [["__scopeId", "data-v-59e0d33b"]]);
function Di(e) {
  const t = Z(e);
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
function Ki(e, t, n) {
  const a = Di(t);
  return a.size ? e.filter((s) => {
    const l = (s.key ?? s.field)?.toLowerCase();
    return l === void 0 || !a.has(l) || s.role === "identity" || n.some((o) => Array.isArray(ie(s, o))) ? !0 : new Set(n.map((o) => Me(s, o))).size > 1;
  }) : e;
}
function Wi() {
  const e = te();
  return f(
    () => Ki(
      Es(e.schema.value, e.entity.value),
      e.liveQuery.value.expr,
      e.rows.value
    )
  );
}
function ns(e, t) {
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
function as(e, t) {
  const n = e.narrowsOnPress.value ? Qt(t.entity, t.row) : null;
  if (!n) return null;
  const a = Ha(e.schema.value, t.entity);
  return { term: n, name: t.parts.identity, alone: t.entity?.narrowsAlone === !0, ...a.length ? { lifts: a } : {} };
}
const zi = /* @__PURE__ */ j({
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
          ee(", ")
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
              ee(T(_.label ?? a.value), 1)
            ], !0)
          ]),
          _: 2
        }, 1032, ["href", "title", "onPress"])
      ], 64))), 128))
    ], 2));
  }
}), sa = /* @__PURE__ */ G(zi, [["__scopeId", "data-v-651b03c2"]]), ji = /* @__PURE__ */ new Set(["entitykey", "entitylabel"]), Ui = /* @__PURE__ */ new Set(["ordinal", "image", "component", "date"]), Qi = 4;
function ss(e) {
  return (e.field ?? e.key)?.toLowerCase();
}
function ls(e) {
  return e.narrow === !1 || e.role === "identity" || e.activate || e.click || e.drill ? !1 : !Ui.has(e.kind ?? "text") && ss(e) !== void 0;
}
function Gi(e, t) {
  if (Number.isInteger(e)) return e;
  const n = 10 ** Qi;
  return (t ? Math.ceil(e * n - 1e-6) : Math.floor(e * n + 1e-6)) / n;
}
function Yi(e, t) {
  let n = 1 / 0, a = -1 / 0;
  for (const s of t) {
    const l = ie(e, s);
    typeof l != "number" || !Number.isFinite(l) || (l < n && (n = l), l > a && (a = l));
  }
  return n <= a ? { min: n, max: a } : null;
}
function Xi(e, t, n, a = null) {
  if (!ls(e)) return [];
  const s = ss(e);
  if (ji.has(s) && !e.value)
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
      term: { kind: "field", field: s, comparator: c ? "<=" : ">=", value: String(Gi(l, c)) }
    }];
  }
  return (Array.isArray(l) ? l : [l]).filter(
    (i) => typeof i == "string" && i !== ""
  ).map((i) => ({
    label: Array.isArray(l) ? i : null,
    term: { kind: "field", field: s, comparator: "=", value: i }
  }));
}
const la = /* @__PURE__ */ new WeakMap();
function Ji(e, t) {
  let n = la.get(e);
  return n || la.set(e, n = /* @__PURE__ */ new Map()), n.has(t) || n.set(t, Yi(t, e)), n.get(t);
}
const Zi = /* @__PURE__ */ j({
  __name: "ColumnCell",
  props: {
    column: {},
    entry: {}
  },
  setup(e) {
    const t = e, n = te(), a = f(() => t.column.kind ?? "text"), s = f(() => ie(t.column, t.entry.row)), l = f(
      () => a.value === "ordinal" ? t.entry.ordinal : Me(t.column, t.entry.row)
    ), o = f(() => s.value), r = f(() => t.column.activate === !0 || !!t.column.click), i = f(() => cn(t.column)), c = f(() => ha(t.column, t.entry.row)), u = f(() => {
      if (!ls(t.column)) return [];
      const h = typeof s.value == "number" ? Ji(n.rows.value, t.column) : null;
      return Xi(t.column, t.entry.row, t.entry.entity ?? null, h);
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
    }, null, 8, ["row", "entry", "value", "column"])) : a.value === "status" && u.value.length ? (d(), q(sa, {
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
    }, null, 8, ["status"])) : a.value === "image" ? (d(), q(Xt, {
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
    }, fa(e.column.activate ? w(ns)(w(n), w(as)(w(n), e.entry)) : {}), {
      onPress: v[0] || (v[0] = (S, C) => {
        C.stopPropagation(), _(S);
      })
    }), {
      default: Y(() => [
        ee(T(l.value), 1)
      ]),
      _: 1
    }, 16, ["class", "href", "title"])) : u.value.length ? (d(), q(sa, {
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
}), oa = /* @__PURE__ */ G(Zi, [["__scopeId", "data-v-d07057a1"]]), ec = {
  key: 0,
  class: "dc-table__none"
}, tc = { class: "dc-table__detail" }, nc = ["data-dc-wrap", "data-dc-row-links"], ac = { "data-dc-stuck": "" }, sc = {
  key: 0,
  class: "dc-table__pick",
  scope: "col"
}, lc = {
  key: 1,
  class: "dc-table__standing",
  scope: "col",
  "aria-label": "In the query"
}, oc = ["data-dc-align", "data-dc-hide", "aria-sort", "title"], rc = {
  key: 2,
  class: "dc-table__head"
}, ic = { "data-dc-scroll": "" }, cc = ["onClick"], uc = {
  key: 0,
  class: "dc-table__pick"
}, dc = {
  key: 1,
  class: "dc-table__standing"
}, fc = ["data-dc-align", "data-dc-hide", "title"], vc = {
  key: 1,
  class: "dc-table__name"
}, pc = /* @__PURE__ */ j({
  __name: "TableView",
  setup(e) {
    const t = te(), n = Re(), a = Wi();
    function s(E, B) {
      if (!t.rowLinks?.value || Ra()) return;
      const x = t.pressHref(E);
      if (x && vn(B)) {
        fn(x, B);
        return;
      }
      t.activate(E, ft(B));
    }
    const l = f(() => t.rowLinks?.value ? new Map(n.value.map((E) => [E.key, t.pressHref(E.row)])) : /* @__PURE__ */ new Map()), o = f(
      () => a.value.find((E) => E.role === "identity") ?? a.value[0]
    );
    function r(E, B, x) {
      x.stopPropagation(), t.activate(E, B);
    }
    function i(E) {
      const B = wa(E, t.entity.value, t.schema.value), x = B ? `Shortcut: ${B}` : void 0;
      return [E.hint, x].filter(Boolean).join(`
`) || void 0;
    }
    const c = f(() => {
      const E = a.value.find((x) => x.scope);
      return E || ((t.entity.value ? !!t.entity.value.href : t.entities.value.some((x) => x.href)) ? a.value.find((x) => x.activate) : void 0);
    }), u = (E) => Oa(E.entity, E.row), g = f(
      () => n.value.some((E) => Ba(t.query.value.expr, u(E)) !== null)
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
        qn(E),
        E.muted ? "dc-table__muted" : "",
        E.mono ? "dc-mono" : "",
        cn(E) ? "dc-truncate" : ""
      ].filter(Boolean).join(" ");
    }
    function k(E, B) {
      if (!(!cn(E) || E.activate || E.click))
        return ha(E, B.row);
    }
    const M = f(
      () => a.value.length + (t.selectable.value ? 1 : 0) + (g.value ? 1 : 0)
    );
    return (E, B) => w(a).length ? (d(), p("table", {
      key: 1,
      class: "dc-table",
      "data-dc-wrap": _.value ? "" : void 0,
      "data-dc-row-links": w(t).rowLinks?.value ? "" : void 0,
      style: ae({ "--dc-table-tracks": M.value })
    }, [
      b("thead", ac, [
        b("tr", null, [
          w(t).selectable.value ? (d(), p("th", sc, [
            Q(Qa)
          ])) : L("", !0),
          g.value ? (d(), p("th", lc)) : L("", !0),
          (d(!0), p(W, null, X(w(a), (x, R) => (d(), p("th", {
            key: w(Bn)(x, R),
            scope: "col",
            class: oe(w(qn)(x)),
            style: ae({ width: x.width }),
            "data-dc-align": w(Rn)(x),
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
                ee(T(x.label), 1)
              ]),
              _: 2
            }, 1032, ["href", "onPress"])) : (d(), p(W, { key: 1 }, [
              ee(T(x.label), 1)
            ], 64)),
            x.header ? (d(), p("span", rc, [
              (d(), q(Ke(x.header), {
                column: x,
                entity: w(t).entity.value
              }, null, 8, ["column", "entity"]))
            ])) : L("", !0)
          ], 14, oc))), 128))
        ])
      ]),
      b("tbody", ic, [
        (d(!0), p(W, null, X(w(n), (x) => (d(), p("tr", {
          key: x.key,
          class: "dc-table__row",
          onClick: (R) => s(x.row, R)
        }, [
          w(t).selectable.value ? (d(), p("td", uc, [
            Q(qe, {
              row: x.row,
              selected: x.selected,
              name: x.parts.identity
            }, null, 8, ["row", "selected", "name"])
          ])) : L("", !0),
          g.value ? (d(), p("td", dc, [
            Q(gt, { entry: x }, null, 8, ["entry"])
          ])) : L("", !0),
          (d(!0), p(W, null, X(w(a), (R, O) => (d(), p("td", {
            key: w(Bn)(R, O),
            class: oe(m(R)),
            style: ae({ width: R.width }),
            "data-dc-align": w(Rn)(R),
            "data-dc-hide": R.hideBelow,
            title: k(R, x)
          }, [
            l.value.get(x.key) ? (d(), q(se, Oe({
              key: 0,
              class: "dc-table__cell-link",
              href: l.value.get(x.key),
              tabindex: R === o.value ? void 0 : -1,
              "aria-hidden": R === o.value ? void 0 : "true",
              "aria-label": R === o.value ? x.parts.identity : void 0
            }, fa(w(ns)(w(t), w(as)(w(t), x))), {
              onPress: (K, V) => r(x.row, K, V)
            }), null, 16, ["href", "tabindex", "aria-hidden", "aria-label", "onPress"])) : L("", !0),
            R === c.value ? (d(), p("span", vc, [
              Q(oa, {
                column: R,
                entry: x
              }, null, 8, ["column", "entry"]),
              Q(wt, { entry: x }, null, 8, ["entry"]),
              Q(_t, { entry: x }, null, 8, ["entry"])
            ])) : (d(), q(oa, {
              key: 2,
              column: R,
              entry: x
            }, null, 8, ["column", "entry"]))
          ], 14, fc))), 128))
        ], 8, cc))), 128))
      ])
    ], 12, nc)) : (d(), p("p", ec, [
      B[2] || (B[2] = b("span", { class: "dc-table__headline" }, "No columns declared", -1)),
      b("span", tc, [
        ee(T(v.value) + " has no ", 1),
        B[0] || (B[0] = b("code", null, "columns", -1)),
        B[1] || (B[1] = ee(" in the schema, so there is no table to draw. ", -1))
      ])
    ]));
  }
}), os = /* @__PURE__ */ G(pc, [["__scopeId", "data-v-30f18dcf"]]);
function hc(e) {
  const t = he([]), n = H(!1), a = he(null);
  let s = 0;
  const l = (i, c, u, g, _) => ({
    entity: i,
    rows: e.limit.value > 0 ? c.rows.map((y, h) => Ya(y, h, i, e.isPinned(y.id))) : [],
    total: c.total,
    count: u ? ut(i) : Ne(c.total),
    pinned: yc(g, c, _)
  }), o = () => {
    const i = ++s, c = e.query.value, u = e.schema.value, g = e.entities.value, _ = e.limit.value, y = e.within?.value.trim() ?? "", h = kn(c) && !y, v = y ? wn(y, c.expr) : c.expr, S = g.map((C) => ({
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
function yc(e, t, n) {
  const a = t.rows[0];
  if (t.total !== 1 || t.rows.length !== 1 || !a)
    return !1;
  const s = n.trim();
  if (!s)
    return !1;
  const l = At(e, a);
  return !!l && Ue(s, l) === s;
}
const mc = ["data-dc-pending", "data-dc-heads-only"], gc = {
  key: 0,
  class: "dc-types__state",
  role: "alert"
}, _c = {
  key: 1,
  class: "dc-types__state",
  "aria-live": "polite"
}, wc = {
  key: 2,
  class: "dc-types__state"
}, kc = ["data-dc-empty"], bc = { class: "dc-type__name" }, $c = { class: "dc-type__count dc-mono" }, xc = {
  key: 0,
  class: "dc-type__note dc-mono"
}, Sc = { class: "dc-type__sr" }, Cc = {
  key: 1,
  class: "dc-type__description"
}, Pc = {
  key: 0,
  class: "dc-type__empty"
}, Mc = { class: "dc-type__identity" }, Ec = { class: "dc-type__primary dc-truncate" }, Tc = { class: "dc-type__secondary dc-mono dc-truncate" }, Lc = { class: "dc-type__trailing dc-mono" }, Oc = { class: "dc-type__metric-value" }, Ac = { class: "dc-type__metric-label" }, Nc = {
  key: 0,
  class: "dc-type__date"
}, Ic = /* @__PURE__ */ j({
  __name: "TypeCardsView",
  setup(e) {
    const t = te(), { previews: n, pending: a, error: s } = hc({
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
      w(s) ? (d(), p("p", gc, " Could not load results: " + T(w(s) instanceof Error ? w(s).message : "the data source failed."), 1)) : !c.value.length && w(a) ? (d(), p("p", _c, " Running query… ")) : c.value.length ? L("", !0) : (d(), p("p", wc, T(l.value ? "Nothing matches this query" : "Nothing here yet"), 1)),
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
            b("span", bc, T(_.entity.label), 1),
            b("span", $c, T(_.count), 1),
            _.entity.note ? (d(), p("span", xc, T(_.entity.note), 1)) : L("", !0),
            g[0] || (g[0] = b("span", {
              class: "dc-type__go",
              "aria-hidden": "true"
            }, "→", -1)),
            b("span", Sc, "Show only " + T(_.entity.label.toLowerCase()), 1),
            _.entity.description ? (d(), p("span", Cc, T(_.entity.description), 1)) : L("", !0)
          ]),
          _: 2
        }, 1032, ["href", "onPress"]),
        _.total ? L("", !0) : (d(), p("p", Pc, T(l.value ? "No matches" : "Nothing here yet"), 1)),
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
              b("span", Mc, [
                b("span", Ec, T(y.parts.identity), 1),
                b("span", Tc, T(y.parts.reference), 1)
              ])
            ]),
            _: 2
          }, 1032, ["href", "onPress"]),
          b("span", Lc, [
            (d(!0), p(W, null, X(y.parts.metrics.slice(0, 1), (h) => (d(), q(mt, {
              key: h.column.key ?? h.label,
              class: "dc-type__metric",
              entry: y,
              column: h.column
            }, {
              default: Y(() => [
                b("span", Oc, T(h.text), 1),
                b("span", Ac, T(h.label), 1)
              ]),
              _: 2
            }, 1032, ["entry", "column"]))), 128)),
            y.parts.updated ? (d(), p("span", Nc, T(y.parts.updated), 1)) : L("", !0),
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
            ee(" " + T(_.entity.create), 1)
          ]),
          _: 2
        }, 1032, ["href", "onPress"])) : L("", !0)
      ], 8, kc))), 128)),
      U(u.$slots, "after", {}, void 0, !0)
    ], 8, mc));
  }
}), rs = /* @__PURE__ */ G(Ic, [["__scopeId", "data-v-d60e56a6"]]), Bc = ["data-dc-pending", "data-dc-more"], Rc = {
  key: 0,
  class: "dc-results__state dc-results__state--loading",
  "aria-live": "polite"
}, qc = {
  key: 3,
  class: "dc-results__state",
  role: "alert"
}, Hc = { class: "dc-results__detail" }, Vc = {
  key: 4,
  class: "dc-results__state",
  "aria-live": "polite"
}, Fc = {
  key: 5,
  class: "dc-results__state"
}, Dc = { class: "dc-results__detail" }, Kc = /* @__PURE__ */ j({
  __name: "ResultsArea",
  props: {
    views: {},
    loading: { type: Boolean }
  },
  setup(e) {
    const t = e, n = te(), a = Ht(), s = {
      list: yn,
      cards: Xa,
      grid: Ja,
      images: Za,
      table: os,
      links: es,
      preview: ts
    }, l = f(() => Ca(n.query.value, t.views)), o = f(() => Ae(n.query.value.view, t.views)), r = f(() => We(o.value) ? null : n.hostViews.value[o.value] ?? null), i = f(
      () => (o.value === "record" || !We(o.value) ? null : s[o.value]) ?? yn
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
      h.value = Object.entries(E).filter(([, B]) => B).map(([B]) => B).join(" "), v.value = {
        x: M.offsetHeight - M.clientHeight,
        y: M.offsetWidth - M.clientWidth
      }, S.value = k.querySelector("[data-dc-stuck]")?.offsetHeight ?? 0;
    }
    let A = null, m = null;
    return ne(
      _,
      (k, M) => {
        if (M?.removeEventListener("scroll", C, { capture: !0 }), A?.disconnect(), m?.disconnect(), A = null, m = null, C(), !k || (k.addEventListener("scroll", C, { passive: !0, capture: !0 }), typeof ResizeObserver > "u")) return;
        const E = new ResizeObserver(C), B = typeof MutationObserver > "u" ? null : new MutationObserver(() => {
          x(), C();
        }), x = () => {
          E.disconnect(), B?.disconnect();
          for (const R of /* @__PURE__ */ new Set([k, y(k)])) {
            E.observe(R);
            for (const O of R.children) E.observe(O);
            B?.observe(R, { childList: !0 });
          }
        };
        x(), A = E, m = B;
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
      e.loading ? (d(), p("p", Rc, [...M[1] || (M[1] = [
        b("span", { class: "dc-results__detail" }, "Loading…", -1)
      ])])) : l.value ? (d(), q(rs, { key: 1 }, $t({ _: 2 }, [
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
      }, null, 8, ["id"])) : g.value ? (d(), p("p", qc, [
        M[2] || (M[2] = b("span", { class: "dc-results__headline" }, "Could not load results", -1)),
        b("span", Hc, T(w(n).error.value instanceof Error ? w(n).error.value.message : "The data source failed."), 1)
      ])) : !u.value && w(n).pending.value ? (d(), p("p", Vc, [...M[3] || (M[3] = [
        b("span", { class: "dc-results__detail" }, "Running query…", -1)
      ])])) : u.value ? r.value ? (d(), q(Ke(r.value.component), xt(Oe({ key: 6 }, r.value.props ?? {})), null, 16)) : (d(), q(Ke(i.value), { key: 7 })) : (d(), p("div", Fc, [
        M[4] || (M[4] = b("span", { class: "dc-results__headline" }, "Nothing matches this query", -1)),
        b("span", Dc, T(w(n).summary.value), 1),
        w(n).isPristine.value ? L("", !0) : (d(), q(se, {
          key: 0,
          class: "dc-results__clear",
          href: w(n).isEverything.value ? w(n).clearHref() : w(n).entityHref(null),
          onPress: M[0] || (M[0] = (E) => w(n).isEverything.value ? w(n).clearFilters() : w(n).clearEntity())
        }, {
          default: Y(() => [
            ee(T(w(n).isEverything.value ? "Clear filters" : "Search everything instead"), 1)
          ]),
          _: 1
        }, 8, ["href"]))
      ]))
    ], 12, Bc));
  }
}), is = /* @__PURE__ */ G(Kc, [["__scopeId", "data-v-cefc7fcf"]]), Wc = ["data-dc-theme", "data-dc-value-press", "data-dc-layout"], zc = { class: "dc-shell__main" }, jc = {
  key: 0,
  class: "dc-shell__top"
}, Uc = {
  key: 1,
  class: "dc-shell__page"
}, Qc = {
  key: 1,
  class: "dc-shell__panel",
  "aria-label": "Panel"
}, Gc = {
  key: 1,
  class: "dc-shell__panel-host-actions"
}, Yc = /* @__PURE__ */ j({
  __name: "DataShell",
  props: /* @__PURE__ */ Nn({
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
  emits: /* @__PURE__ */ Nn(["activate", "create", "duplicate", "delete", "operate", "drill", "query-change", "toggle-pin"], ["update:pinned", "update:selected"]),
  setup(e, { expose: t, emit: n }) {
    const a = e, s = n, l = An(e, "pinned"), o = An(e, "selected"), r = Ht(), i = mn(va, null), c = a.route || i ? null : gs(), u = a.route ?? i ?? c;
    ke(() => c?.dispose?.());
    const g = H(!!r.page);
    ds(() => {
      g.value = !!r.page;
    });
    const _ = _s(u, {
      detached: () => g.value && a.pageQuery === "detached",
      path: () => a.listPath
    }), y = f(() => yl({ seed: a.schema.key })), h = f(() => a.source ?? y.value), v = ql({
      schema: () => a.schema,
      adapter: _,
      defaults: () => a.defaults,
      navigationMode: () => a.navigationMode,
      facetNavigationMode: () => a.facetNavigationMode
    }), S = f(() => a.within?.trim() ?? ""), C = Dl({
      query: v.query,
      entity: v.entity,
      schema: f(() => a.schema),
      setExpression: v.setExpression
    });
    ne(v.query, ($) => s("query-change", $));
    const A = f(() => Cl(a.schema, [v.query.value.expr])), m = f(
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
    }), B = f(() => {
      const $ = a.views, D = (typeof $ == "function" ? $({ entity: v.entity.value, records: A.value }) : $) ?? (a.hostViews ? [...ot, ...Object.keys(a.hostViews)] : void 0);
      return M.value || E.value ? [...(D ?? ot).filter((de) => de !== "record"), "record"] : D?.filter((de) => de !== "record");
    }), x = f(
      () => E.value !== null && Ae(v.query.value.view, B.value) === "record"
    ), R = f(() => x.value ? 1 : a.limit), O = Hl({
      source: h,
      query: C.live,
      schema: f(() => a.schema),
      entity: v.entity,
      limit: R,
      within: S
    }), K = Vl({
      // Not before the data has landed: what is there until then is no place to hold.
      active: f(() => x.value && !a.loading),
      rows: O.rows,
      pending: O.pending,
      page: f(() => C.live.value.page),
      list: f(() => {
        const { entity: $, expr: N, sort: D, dir: de } = C.live.value;
        return JSON.stringify([$, N, D, de]);
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
      const N = E.value !== null && Ae($, B.value) === "record";
      if (N === x.value) {
        v.setView($);
        return;
      }
      const D = C.live.value.page, de = N ? (D - 1) * a.limit + 1 : Math.ceil(D / a.limit);
      C.drafting.value ? (v.setView($), C.setPage(de)) : v.setView($, de);
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
      return Oa(N, $);
    }
    const Je = /* @__PURE__ */ new Map();
    function Zt($) {
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
      const D = Sl(v.query.value.expr, N, $);
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
    function I($, N, D = {}, de) {
      const Ln = on(a.schema, v.query.value, $, D, de);
      D.exclude ? v.narrow(Ln, N?.key ?? v.query.value.entity) : C.release(() => v.narrow(Ln, N?.key ?? null, N ? void 0 : "cards")), s("drill", $, N, D);
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
    const ve = Pl({
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
      limit: R,
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
      toggleSelect: Zt,
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
          I($, null, N);
          return;
        }
        const D = ye($);
        if (D !== null) {
          C.drafting.value ? (v.setView("record"), C.setPage(D)) : v.setView("record", D);
          return;
        }
        const de = F($);
        if (de) {
          window.open(de, "_blank", "noopener");
          return;
        }
        s("activate", $);
      },
      pressHref: ($) => {
        if (z($)) return v.narrowHref(on(a.schema, v.query.value, $), null, "cards");
        const N = ye($);
        return N !== null ? v.hrefFor({ view: "record", page: N }) : F($) ?? a.activateHref?.($) ?? null;
      },
      recordHref: F,
      drillHref: ($, N, D) => At(a.schema, $) ? v.narrowHref(
        on(a.schema, v.query.value, $, {}, D),
        N?.key ?? null,
        N ? void 0 : "cards"
      ) : null,
      create: ($) => s("create", $),
      createHref: ($) => a.createHref?.($) ?? null,
      duplicate: () => s("duplicate", P.value),
      delete: () => s("delete", P.value),
      operate: ($) => s("operate", $, P.value),
      drill: I
    });
    Tl({ theme: () => a.theme, accent: () => a.accent, tokens: () => a.tokens });
    const kt = f(() => {
      if (!(!a.accent && !a.tokens))
        return { ...a.tokens, ...a.accent ? { "--dc-accent": a.accent } : {} };
    }), En = H(null), en = H(0);
    let tn = null;
    Ge(() => {
      const $ = En.value;
      $ && (en.value = $.getBoundingClientRect().width, !(typeof ResizeObserver > "u") && (tn = new ResizeObserver(([N]) => {
        en.value = N.contentRect.width;
      }), tn.observe($)));
    }), ke(() => tn?.disconnect());
    const et = f(() => a.layout === "panel"), Tn = f(() => et.value && a.queryOnTop === !0), nn = f(() => !et.value && a.oneStripFrom !== !1 && en.value >= a.oneStripFrom), an = f(
      () => Ae(v.query.value.view, B.value) === "record" && J.value?.strip === !1
    ), sn = f(() => ({
      views: B.value,
      selectionPlacement: a.selectionPlacement,
      pagesNote: a.pagesNote
    }));
    return t({
      query: v.query
    }), ($, N) => (d(), p("div", {
      ref_key: "root",
      ref: En,
      class: "dc-shell",
      "data-dc-theme": e.theme,
      "data-dc-value-press": e.valuePress,
      "data-dc-layout": e.layout,
      style: ae(kt.value)
    }, [
      et.value ? L("", !0) : (d(), p("div", {
        key: 0,
        class: oe(["dc-shell__head", { "dc-shell__head--one-strip": nn.value }])
      }, [
        Q(Ct, null, $t({ _: 2 }, [
          r.page ? void 0 : {
            name: "lead",
            fn: Y(() => [
              Q(na, {
                views: B.value,
                "type-chooser": e.typeChooser
              }, null, 8, ["views", "type-chooser"])
            ]),
            key: "0"
          },
          r.brand ? {
            name: "brand",
            fn: Y((D) => [
              U($.$slots, "brand", xt(fs(D)), void 0, !0)
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
        nn.value && !r.page && !an.value ? (d(), q(Pt, xt(Oe({ key: 0 }, sn.value)), null, 16)) : L("", !0)
      ], 2)),
      b("div", zc, [
        Tn.value ? (d(), p("div", jc, [
          U($.$slots, "top-lead", {}, void 0, !0),
          Q(Ct, {
            top: "",
            "hide-type": e.hideTypePart
          }, null, 8, ["hide-type"])
        ])) : L("", !0),
        r.page ? (d(), p("div", Uc, [
          U($.$slots, "page", {
            query: w(ve).query.value
          }, void 0, !0)
        ])) : L("", !0),
        !et.value && !nn.value && !r.page && !an.value ? (d(), q(Pt, xt(Oe({ key: 2 }, sn.value)), null, 16)) : L("", !0),
        r.page ? L("", !0) : U($.$slots, "results", {
          rows: w(ve).rows.value,
          total: w(ve).total.value,
          offset: w(ve).offset.value,
          pageCount: w(ve).pageCount.value,
          query: w(ve).liveQuery.value,
          pending: w(ve).pending.value,
          loading: e.loading
        }, () => [
          Q(is, {
            views: B.value,
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
      et.value ? (d(), p("aside", Qc, [
        U($.$slots, "panel-head", {}, void 0, !0),
        Tn.value ? r.actions ? (d(), p("div", Gc, [
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
        r.page ? L("", !0) : (d(), q(na, {
          key: 2,
          views: B.value,
          "type-chooser": e.typeChooser,
          labels: e.viewLabels,
          hints: e.viewHints,
          stacked: ""
        }, null, 8, ["views", "type-chooser", "labels", "hints"])),
        !r.page && A.value.length === 0 ? (d(), q(_r, { key: 3 })) : L("", !0),
        U($.$slots, "panel", {
          query: w(ve).query.value
        }, void 0, !0),
        !r.page && !an.value ? (d(), q(Pt, Oe({
          key: 4,
          class: "dc-shell__panel-actions"
        }, sn.value), null, 16)) : L("", !0),
        U($.$slots, "panel-end", {
          query: w(ve).query.value
        }, void 0, !0)
      ])) : L("", !0)
    ], 12, Wc));
  }
}), Xc = /* @__PURE__ */ G(Yc, [["__scopeId", "data-v-c56f4612"]]), Jc = ["data-dc-span", "data-dc-muted", "data-dc-collapsed"], Zc = ["data-dc-collapsible"], eu = ["aria-expanded", "aria-controls"], tu = { class: "dc-shell-card__sr" }, nu = {
  key: 0,
  class: "dc-shell-card__identity"
}, au = { class: "dc-shell-card__title dc-shell-card__name" }, su = {
  key: 0,
  class: "dc-shell-card__ref dc-mono"
}, lu = {
  key: 1,
  class: "dc-shell-card__title"
}, ou = {
  key: 2,
  class: "dc-shell-card__count dc-mono"
}, ru = {
  key: 1,
  class: "dc-shell-card__aside"
}, iu = ["data-dc-flush"], cu = /* @__PURE__ */ j({
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
      return x.some((R) => R.type === vs ? !1 : R.type === ps ? String(R.children ?? "").trim().length > 0 : R.type === W ? i(R.children ?? []) : !0);
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
    function B(x) {
      if (!h.value) return;
      const R = x.target?.closest(M);
      R && E.value?.contains(R) || typeof window < "u" && window.getSelection()?.toString() || S();
    }
    return (x, R) => (d(), p("section", {
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
        onClick: B
      }, [
        h.value ? (d(), p("button", {
          key: 0,
          type: "button",
          class: "dc-shell-card__toggle",
          "aria-expanded": v.value ? "false" : "true",
          "aria-controls": k.value,
          onClick: S
        }, [
          R[0] || (R[0] = b("svg", {
            class: "dc-shell-card__chevron",
            viewBox: "0 0 10 10",
            "aria-hidden": "true"
          }, [
            b("path", { d: "M2 3.5 5 6.5 8 3.5" })
          ], -1)),
          b("span", tu, T(e.name || e.title || "Card"), 1)
        ], 8, eu)) : L("", !0),
        U(x.$slots, "head", {}, () => [
          e.name ? (d(), p("div", nu, [
            b("h2", au, T(e.name), 1),
            y.value ? (d(), p("span", su, [
              U(x.$slots, "reference", {}, () => [
                ee(T(e.reference), 1)
              ], !0)
            ])) : L("", !0)
          ])) : (d(), p("h2", lu, T(e.title), 1)),
          e.count !== void 0 ? (d(), p("span", ou, T(e.count), 1)) : L("", !0)
        ], !0),
        u.value ? (d(), p("span", ru, [
          U(x.$slots, "aside", {}, void 0, !0)
        ])) : L("", !0)
      ], 8, Zc)) : L("", !0),
      g.value ? Mt((d(), p("div", {
        key: 1,
        id: A,
        class: "dc-shell-card__body",
        "data-dc-flush": e.flush ? "true" : "false"
      }, [
        U(x.$slots, "default", {}, void 0, !0)
      ], 8, iu)), [
        [In, !v.value]
      ]) : L("", !0),
      _.value ? Mt((d(), p("footer", {
        key: 2,
        id: m,
        class: "dc-shell-card__foot"
      }, [
        U(x.$slots, "foot", {}, void 0, !0)
      ], 512)), [
        [In, !v.value]
      ]) : L("", !0)
    ], 12, Jc));
  }
}), fd = /* @__PURE__ */ G(cu, [["__scopeId", "data-v-c84525aa"]]), uu = ["aria-label"], du = ["aria-checked", "data-dc-active", "tabindex", "onClick", "onKeydown"], fu = /* @__PURE__ */ j({
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
      }, T(i.label), 43, du))), 128))
    ], 8, uu));
  }
}), vu = /* @__PURE__ */ G(fu, [["__scopeId", "data-v-63fb5482"]]), pu = { class: "dc-fact__label" }, hu = ["title"], yu = /* @__PURE__ */ j({
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
      b("dt", pu, [
        U(s.$slots, "label", {}, () => [
          ee(T(e.label), 1)
        ], !0)
      ]),
      b("dd", {
        class: "dc-fact__value dc-mono",
        title: e.title
      }, [
        U(s.$slots, "default", {}, () => [
          n.value.length === 1 ? (d(), p(W, { key: 0 }, [
            ee(T(n.value[0]), 1)
          ], 64)) : (d(!0), p(W, { key: 1 }, X(n.value, (o, r) => (d(), p("span", {
            key: r,
            class: "dc-fact__line"
          }, T(o), 1))), 128))
        ], !0)
      ], 8, hu)
    ], 4));
  }
}), mu = /* @__PURE__ */ G(yu, [["__scopeId", "data-v-1f6d25e6"]]), gu = /* @__PURE__ */ j({
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
      (d(!0), p(W, null, X(e.items, (l, o) => (d(), q(mu, {
        key: `${o}:${l.label}`,
        label: l.label,
        value: l.value,
        title: l.title,
        wide: l.wide
      }, null, 8, ["label", "value", "title", "wide"]))), 128)),
      U(a.$slots, "default", {}, void 0, !0)
    ], 4));
  }
}), vd = /* @__PURE__ */ G(gu, [["__scopeId", "data-v-17455afa"]]), _u = { class: "dc-counts" }, wu = ["data-dc-tone"], ku = {
  key: 0,
  class: "dc-counts__empty"
}, bu = /* @__PURE__ */ j({
  __name: "StatusCounts",
  props: {
    counts: {},
    empty: { default: be }
  },
  setup(e) {
    const t = e, n = f(() => t.counts.filter((a) => a.count > 0));
    return (a, s) => (d(), p("span", _u, [
      (d(!0), p(W, null, X(n.value, (l) => (d(), p("span", {
        key: l.label,
        class: "dc-counts__count",
        "data-dc-tone": l.tone ?? "neutral"
      }, T(l.count) + " " + T(l.label), 9, wu))), 128)),
      n.value.length === 0 ? (d(), p("span", ku, T(e.empty), 1)) : L("", !0)
    ]));
  }
}), pd = /* @__PURE__ */ G(bu, [["__scopeId", "data-v-5553a9e2"]]), $u = ["data-dc-copied", "title", "aria-label"], xu = {
  key: 0,
  class: "dc-copy__mark",
  viewBox: "0 0 16 16",
  "aria-hidden": "true"
}, Su = {
  key: 1,
  class: "dc-copy__mark",
  viewBox: "0 0 16 16",
  "aria-hidden": "true"
}, Cu = 1500, Pu = /* @__PURE__ */ j({
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
      }, Cu), a("copied", r);
    }
    return ke(() => clearTimeout(l)), (r, i) => (d(), p("button", {
      type: "button",
      class: "dc-copy",
      "data-dc-copied": s.value ? "true" : "false",
      title: s.value ? "Copied" : e.label,
      "aria-label": e.label,
      onClick: o
    }, [
      s.value ? (d(), p("svg", Su, [...i[1] || (i[1] = [
        b("path", { d: "M3 8.5l3.2 3L13 4.5" }, null, -1)
      ])])) : (d(), p("svg", xu, [...i[0] || (i[0] = [
        b("rect", {
          x: "5.5",
          y: "5.5",
          width: "8",
          height: "9",
          rx: "1.5"
        }, null, -1),
        b("path", { d: "M10.5 3.5v-1a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h1" }, null, -1)
      ])]))
    ], 8, $u));
  }
}), Mu = /* @__PURE__ */ G(Pu, [["__scopeId", "data-v-f4249d7f"]]), Eu = ["data-dc-copy", "data-dc-wrap", "data-dc-tone"], Tu = /* @__PURE__ */ j({
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
          ee(T(e.code), 1)
        ], !0)
      ], 4),
      e.copy ? (d(), q(Mu, {
        key: 0,
        class: "dc-code__copy",
        text: o,
        label: e.copyLabel,
        onCopied: i[0] || (i[0] = (c) => a("copied", c)),
        onError: i[1] || (i[1] = (c) => a("error", c))
      }, null, 8, ["label"])) : L("", !0)
    ], 8, Eu));
  }
}), hd = /* @__PURE__ */ G(Tu, [["__scopeId", "data-v-67b371dd"]]), Lu = 24, Ou = /* @__PURE__ */ j({
  __name: "ShellLog",
  props: {
    fetchChunk: {},
    stripAnsi: { type: Boolean },
    maxHeight: { default: "460px" }
  },
  setup(e, { expose: t }) {
    const n = e, a = H(""), s = f(() => n.stripAnsi ? Ms(a.value) : a.value), l = H(null);
    let o = 0, r = null;
    function i() {
      return r ??= c().finally(() => {
        r = null;
      }), r;
    }
    async function c() {
      const { chunk: _, offset: y } = await n.fetchChunk(o);
      if (o = y, !_) return;
      const h = l.value, v = !h || h.scrollTop + h.clientHeight >= h.scrollHeight - Lu;
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
}), yd = /* @__PURE__ */ G(Ou, [["__scopeId", "data-v-2c86947e"]]), Au = ["data-dc-theme"], Nu = ["aria-labelledby", "aria-label"], Iu = {
  key: 1,
  class: "dc-dialog__actions"
}, nt = [], Bu = /* @__PURE__ */ j({
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
    const n = e, a = t, { theme: s, style: l, adopt: o } = Pn(n), r = `${Vt() ?? "dc-dialog"}-title`, i = H(null);
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
          m.$slots.actions ? (d(), p("div", Iu, [
            U(m.$slots, "actions", {}, void 0, !0)
          ])) : L("", !0)
        ], 10, Nu)
      ], 44, Au)
    ], 8, ["to"])) : L("", !0);
  }
}), md = /* @__PURE__ */ G(Bu, [["__scopeId", "data-v-0cccf313"]]), Ru = 4500, qu = 9e3, ht = H([]);
let ra = 0;
function cs(e) {
  ht.value = ht.value.filter((t) => t.id !== e);
}
function us(e, t = "ok") {
  ra += 1;
  const n = ra;
  ht.value = [...ht.value, { id: n, message: e, kind: t }], setTimeout(() => cs(n), t === "err" ? qu : Ru);
}
function Hu(e) {
  us(e instanceof Error ? e.message : String(e), "err");
}
function Vu() {
  return { toasts: hs(ht), toast: us, toastError: Hu, dismiss: cs };
}
const Fu = ["data-dc-theme"], Du = ["data-dc-kind", "role"], Ku = /* @__PURE__ */ j({
  __name: "ShellToasts",
  props: {
    to: { default: "body" },
    theme: { default: void 0 },
    accent: { default: void 0 },
    tokens: { default: void 0 }
  },
  setup(e) {
    const t = e, { toasts: n } = Vu(), { theme: a, style: s, adopt: l } = Pn(t);
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
        }, T(i.message), 9, Du))), 128))
      ], 12, Fu)
    ], 8, ["to"]));
  }
}), gd = /* @__PURE__ */ G(Ku, [["__scopeId", "data-v-d970211c"]]), Wu = ["aria-label"], zu = ["data-dc-standing", "data-dc-active", "aria-checked", "title", "aria-label", "onClick"], ju = /* @__PURE__ */ j({
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
      }, T(c.sign), 9, zu))), 128))
    ], 8, Wu));
  }
}), _d = /* @__PURE__ */ G(ju, [["__scopeId", "data-v-5524dca6"]]);
function wd(e, t) {
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
function kd(e, t = {}) {
  const n = t.key ?? ((l) => JSON.stringify(l)), a = he();
  let s = null;
  return ys(() => {
    const l = e(), o = n(l);
    o !== s && (s = o, a.value = l);
  }), a;
}
function bd(e = {}) {
  return { key: "ordinal", kind: "ordinal", label: "#", width: "52px", ...e };
}
function $d(e = {}) {
  return { key: "status", role: "state", kind: "status", label: "State", sort: "state", width: "104px", ...e };
}
function xd(e = {}) {
  return { key: "tint", role: "tint", ...e };
}
function Sd(e = {}) {
  return { key: "picture", role: "image", kind: "image", width: "56px", height: "40px", ...e };
}
function Cd(e, t = {}) {
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
function Pd(e, t = {}) {
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
function Md(e, t, n = {}) {
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
function Ed(e, t, n = {}) {
  return { key: e, kind: "date", label: t, sort: e, mono: !0, muted: !0, ...n };
}
function Td(e = {}) {
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
function Ld(e, t, n = {}) {
  return { key: e, label: t, sort: e, truncate: !0, hideBelow: 900, ...n };
}
function Od(e, t, n, a = {}) {
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
function Jt(e) {
  return typeof e == "number" ? e : typeof e == "string" && e.trim() !== "" ? Number(e) : Number.NaN;
}
function Ad(e) {
  const t = Jt(e);
  return Number.isFinite(t) && t > 0 ? xs(t) : be;
}
function Nd(e) {
  const t = Jt(e);
  return Number.isFinite(t) && t > 0 ? Ss(t) : be;
}
function Id(e) {
  const t = Jt(e);
  return Number.isFinite(t) && t > 0 ? Cs(t) : be;
}
function Bd(e) {
  const t = Jt(e);
  return Number.isFinite(t) ? Ps(t) : be;
}
function Uu(e) {
  if (e <= 0) return 0;
  const t = 10 ** Math.floor(Math.log10(e));
  for (const n of [1, 2, 5])
    if (e <= n * t) return n * t;
  return 10 * t;
}
function Qu(e, t) {
  const n = /* @__PURE__ */ new Set();
  for (const a of e) {
    const s = a.fields[t];
    for (const l of Array.isArray(s) ? s : [s])
      typeof l == "string" && l && n.add(l);
  }
  return [...n].sort((a, s) => a.localeCompare(s));
}
function Gu(e, t) {
  let n = 0;
  for (const a of e) {
    const s = a.fields[t];
    typeof s == "number" && s > n && (n = s);
  }
  return n;
}
function Rd(e, t, n, a = {}) {
  return {
    kind: "chips",
    key: t,
    label: n,
    options: Qu(e, t),
    ...a.multiple ? { multiple: !0 } : {}
  };
}
function qd(e, t, n) {
  return { kind: "range", key: t, label: n, min: 0, max: Uu(Gu(e, t)) };
}
function Hd(e, t, n) {
  return { kind: "toggle", key: e, label: t, text: n };
}
function Vd(e) {
  return e.filter((t) => t.kind === "chips" ? t.options.length > 1 : t.kind === "range" ? t.max > 0 : !0);
}
function Fd(e = "", t = "/") {
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
function ia(e) {
  const t = e.indexOf("?");
  if (t === -1) return "";
  const n = e.slice(t), a = n.indexOf("#");
  return ce(a === -1 ? n : n.slice(0, a));
}
function Dd(e) {
  const t = H(ia(e.currentRoute.value.fullPath)), n = f(() => e.currentRoute.value.path), a = ne(
    () => e.currentRoute.value.fullPath,
    (s) => {
      t.value = ia(s);
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
function Kd(e, t, n = "/", a = []) {
  return (s) => {
    const l = s.params[t], o = Array.isArray(l) ? l.join("/") : l ?? "", r = s.query[Be], i = typeof r == "string" ? r : "", c = `${e}="${o.replace(/"/g, "")}"`;
    return { path: n, query: { ...s.query, [Be]: Ue(Yt(i, a), c) } };
  };
}
function Wd(e, t = "/") {
  return (n) => ({ path: t, query: { ...n.query, [Ye]: e } });
}
function zd(e) {
  const t = /* @__PURE__ */ new Map();
  for (const n of e) {
    const a = t.get(n.entityKey);
    a ? a.push(n) : t.set(n.entityKey, [n]);
  }
  return {
    query(n) {
      return Ma(n, (a) => t.get(a.key) ?? [], {
        undatedLast: !0,
        zeroIsAll: !0
      });
    }
  };
}
function jd(e, t) {
  return e.query({ ...t, limit: Number.MAX_SAFE_INTEGER, offset: 0 }).rows;
}
const Yu = {
  DataShell: Xc,
  ShellHeader: Ct,
  RecordActions: Pt,
  ResultsArea: is,
  SegmentedControl: vu,
  StatusPill: Qe,
  ListView: yn,
  CardsView: Xa,
  GridView: Ja,
  ImagesView: Za,
  TableView: os,
  LinksView: es,
  PreviewView: ts,
  TypeCardsView: rs
}, Ud = {
  install(e, t = {}) {
    const n = t.prefix ?? "";
    for (const [a, s] of Object.entries(Yu))
      e.component(`${n}${a}`, s);
    t.route && e.provide(va, t.route), (t.theme || t.accent || t.tokens) && El({ theme: t.theme, accent: t.accent, tokens: t.tokens }, e);
  }
};
export {
  td as COLUMN_BREAKPOINTS,
  ed as COLUMN_ROLES,
  Xa as CardsView,
  oa as ColumnCell,
  Mu as CopyButton,
  Js as DEFAULT_ENTITY_VIEW,
  dn as DEFAULT_SORT,
  un as DEFAULT_VIEW,
  Fl as DRAFT_DELAY,
  Xc as DataShell,
  be as EMPTY_CELL,
  Ta as ENTITY_ALL,
  ze as ENTITY_TERM,
  pt as EXPRESSION_TERM,
  Ja as GridView,
  Ud as HeaderContentLayoutPlugin,
  Za as ImagesView,
  es as LinksView,
  yn as ListView,
  Tt as MOCK_TINTS,
  mt as MetricDrill,
  _t as OpenMark,
  xn as PARAM_DIR,
  Ye as PARAM_ENTITY,
  Be as PARAM_EXPR,
  jt as PARAM_PAGE,
  $n as PARAM_SORT,
  zt as PARAM_VIEW,
  Zu as PILL_TONES,
  Ql as POPOVER_FLIP_BELOW,
  jl as POPOVER_GAP,
  Ul as POPOVER_MARGIN,
  Mn as PinStar,
  ts as PreviewView,
  gt as QueryMark,
  at as RECORD_STATUSES,
  bn as RESULT_FIELDS,
  va as ROUTE_ADAPTER_KEY,
  Pt as RecordActions,
  na as RecordChoosers,
  is as ResultsArea,
  Da as SHELL_CONTEXT_KEY,
  Nt as SHELL_THEME_KEY,
  wt as ScopeMark,
  vu as SegmentedControl,
  qe as SelectTick,
  fd as ShellCard,
  hd as ShellCode,
  md as ShellDialog,
  mu as ShellFact,
  vd as ShellFacts,
  Ct as ShellHeader,
  yd as ShellLog,
  Ho as ShellPager,
  Jl as ShellPopover,
  gd as ShellToasts,
  _d as StandingControl,
  pd as StatusCounts,
  Qe as StatusPill,
  qu as TOAST_ERROR_MS,
  Ru as TOAST_MS,
  os as TableView,
  rs as TypeCardsView,
  Qn as VIEW_ICONS,
  ot as VIEW_KINDS,
  Un as VIEW_LABELS,
  Ue as addTerm,
  Ha as ancestorScopes,
  wn as andExpression,
  Ad as bytesCell,
  ha as cellFull,
  Xi as cellNarrowings,
  Me as cellText,
  St as cellTextOf,
  ie as cellValue,
  rl as changesResults,
  Rd as chipsFrom,
  Rn as columnAlign,
  qn as columnClass,
  Bn as columnKey,
  ls as columnNarrows,
  yt as columnShortcut,
  wa as columnShortcutOf,
  cn as columnTruncates,
  Es as columnsFor,
  ma as compactShortcuts,
  oo as completeDraft,
  ol as countPages,
  gs as createHistoryAdapter,
  Fd as createMemoryAdapter,
  zd as createMemoryDataSource,
  yl as createMockDataSource,
  Dd as createVueRouterAdapter,
  Ed as dateColumn,
  Os as defaultCellText,
  Et as defaultQuery,
  Ie as defaultViewFor,
  _s as detachableAdapter,
  on as drillExpression,
  Nd as durationCell,
  Id as elapsedCell,
  sl as emptyFacetValue,
  wl as entityAddress,
  Td as entityColumn,
  ut as entityCount,
  Wd as entityRedirect,
  Ia as excludingTerm,
  rt as expandShortcuts,
  Ld as facetColumn,
  vt as facetField,
  za as facetValue,
  Fs as fieldHeading,
  Na as fieldTerm,
  dt as findEntity,
  La as findEntityByAddress,
  Pe as findSort,
  Od as flagColumn,
  st as fnv1a,
  xa as focusEntity,
  xs as formatBytes,
  Ne as formatCount,
  bs as formatDate,
  nd as formatDateTime,
  Ft as formatDigits,
  Ss as formatDuration,
  Cs as formatElapsed,
  ue as formatExpression,
  De as formatInteger,
  ks as formatMetric,
  $s as formatOrdinal,
  Ps as formatPercent,
  Rs as formatRange,
  we as formatTerm,
  hl as generateRows,
  Nl as hasActiveFacets,
  Cd as identityColumn,
  cd as idsExpression,
  We as isBuiltinView,
  ld as isEntityScoped,
  ll as isFacetActive,
  kn as isPristineQuery,
  je as isRangeTerm,
  Ca as isTypeCardsQuery,
  $a as isViewKind,
  sd as joinExpression,
  Cn as liftTerm,
  zs as matchesExpression,
  Md as metricColumn,
  ud as narrowPatch,
  js as negateTerm,
  Uu as niceMax,
  ce as normalizeSearch,
  Yi as numberRange,
  Qs as oppositeTerm,
  bd as ordinalColumn,
  Z as parseExpression,
  $l as parseQuery,
  Bd as percentCell,
  Sd as pictureColumn,
  Gl as placePopover,
  br as presentParts,
  Ya as presentRow,
  ft as pressOptions,
  Pl as provideShellContext,
  El as provideShellTheme,
  jd as queryAll,
  qd as rangeFrom,
  Dt as rangeOf,
  Xs as readDraft,
  id as readExpression,
  Kd as recordRedirect,
  Aa as recordTerm,
  Cl as recordsIn,
  Pd as referenceColumn,
  ct as refineExpression,
  Ae as resolveView,
  pe as roleColumn,
  pa as roleColumns,
  Ls as rowKey,
  it as sameTerm,
  Qt as scopeTerm,
  At as scopeTermFor,
  Va as scopedEntity,
  rd as searchFromQuery,
  Zs as searchesCorpus,
  Yn as serializeQuery,
  kl as sortAddress,
  Wt as sortsFor,
  ad as splitExpression,
  Oa as standingTerm,
  $d as stateColumn,
  Ms as stripAnsi,
  Rl as summarizeQuery,
  It as summaryTerms,
  Ba as termStanding,
  xd as tintColumn,
  od as tintFor,
  Hd as toggleFacet,
  Wi as useColumns,
  Dl as useDraft,
  Ga as useEntityCounts,
  hc as useEntityPreviews,
  Pn as useLayerTheme,
  wd as usePoll,
  Re as usePresentedRows,
  ql as useQueryState,
  zl as useRecordNames,
  Hl as useResults,
  te as useShellContext,
  kd as useStableSchema,
  Vu as useToasts,
  Vd as usefulFacets,
  el as viewAcross,
  tl as viewAfter,
  ja as withFacetValue,
  xl as withStanding,
  Sl as withStandings,
  Xn as withWhere,
  dd as withoutFacet,
  qa as withoutOwnScope,
  Yt as withoutScopes,
  Us as withoutTerm
};
