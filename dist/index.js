import { ref as R, computed as f, inject as un, provide as dn, getCurrentInstance as aa, shallowRef as he, toValue as Ae, watch as le, onScopeDispose as Tt, getCurrentScope as sa, defineComponent as U, onMounted as Ye, onBeforeUnmount as we, openBlock as u, createBlock as N, Teleport as Ot, createElementVNode as $, mergeProps as Ie, unref as b, renderSlot as X, createCommentVNode as E, nextTick as nt, createElementBlock as y, withKeys as Ne, useSlots as At, useId as Nt, normalizeClass as ue, withCtx as J, toDisplayString as P, createTextVNode as te, Fragment as z, renderList as Z, withModifiers as Se, withDirectives as bt, normalizeStyle as ie, vModelText as la, createVNode as Y, reactive as Pn, toHandlers as fn, resolveDynamicComponent as at, createSlots as _t, useModel as Mn, onBeforeUpdate as ss, normalizeProps as Gt, guardReactiveProps as ls, mergeModels as En, vShow as Ln, Comment as os, Text as rs, readonly as is, watchEffect as cs } from "vue";
import { MenuList as us } from "menu-bar";
const vn = ["list", "cards", "grid", "images", "table", "links", "preview"], et = ["ok", "running", "queued", "review", "failed"], qu = [...et, "neutral", "accent"], Fu = [
  "identity",
  "reference",
  "metric",
  "state",
  "updated",
  "image",
  "tint"
], Du = [480, 620, 760, 900, 1100], oa = Symbol("dc.routeAdapter");
function fe(e) {
  if (!e) return "";
  const t = e.replace(/^[?]/, "");
  return t ? `?${t}` : "";
}
function ds() {
  const e = typeof window < "u", t = R(e ? fe(window.location.search) : ""), n = R(e ? window.location.pathname : "/"), a = () => {
    t.value = fe(window.location.search), n.value = window.location.pathname;
  };
  e && window.addEventListener("popstate", a);
  const s = (l, o, r) => {
    const i = fe(l);
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
      return e ? o !== void 0 && o !== window.location.pathname ? `${o}${fe(l)}` : `${window.location.pathname}${fe(l)}${window.location.hash}` : `${o ?? n.value}${fe(l)}`;
    },
    push: (l, o) => s(l, "push", o),
    replace: (l, o) => s(l, "replace", o),
    dispose: () => {
      e && window.removeEventListener("popstate", a);
    }
  };
}
function fs(e, t) {
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
      return e.href ? e.href(l, r) : `${r ?? e.path.value}${fe(l)}`;
    }
  };
}
function tt(e) {
  let t = 2166136261;
  for (let n = 0; n < e.length; n++)
    t ^= e.charCodeAt(n), t = Math.imul(t, 16777619);
  return Math.abs(t);
}
const vs = new Intl.NumberFormat("en-US", {
  minimumSignificantDigits: 2,
  maximumSignificantDigits: 2,
  useGrouping: !1
});
function It(e) {
  return Number.isFinite(e) ? Math.abs(e) < 100 ? vs.format(e) : String(Math.round(e)) : "—";
}
function ps(e) {
  return Number.isFinite(e) ? Number.isInteger(e) || Math.abs(e) >= 100 ? Re(e) : It(e) : "—";
}
function Re(e) {
  if (!Number.isFinite(e)) return "—";
  const t = Math.round(e), n = Math.abs(t);
  return n < 1e3 ? String(t) : n < 9950 ? `${(t / 1e3).toFixed(1)}k` : n < 999500 ? `${Math.round(t / 1e3)}k` : n < 995e4 ? `${(t / 1e6).toFixed(1)}m` : `${Math.round(t / 1e6)}m`;
}
function ze(e) {
  return Number.isFinite(e) ? Math.round(e).toLocaleString("en-US") : "—";
}
function hs(e) {
  const t = new Date(e);
  if (Number.isNaN(t.getTime())) return "—";
  const n = String(t.getUTCDate()).padStart(2, "0"), a = String(t.getUTCMonth() + 1).padStart(2, "0");
  return `${n}.${a}.${t.getUTCFullYear()}`;
}
function ms(e) {
  return String(e + 1);
}
function Vu(e, t) {
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
function ys(e) {
  if (e == null || !Number.isFinite(e) || e < 0) return "—";
  if (e < 1e3) return `${e} B`;
  const t = ["kB", "MB", "GB", "TB"];
  let n = e, a = -1;
  for (; n >= 1e3 && a < t.length - 1; )
    n /= 1e3, a += 1;
  return `${It(n)} ${t[a]}`;
}
function gs(e) {
  if (!e || !Number.isFinite(e)) return "—";
  if (e < 1e3) return `${Math.round(e)}ms`;
  const t = e / 1e3;
  return t < 60 ? `${It(t)}s` : `${Math.floor(t / 60)}m ${Math.round(t % 60)}s`;
}
function _s(e) {
  if (e == null || !Number.isFinite(e) || e <= 0)
    return "—";
  const t = Math.floor(e / 60);
  return t ? `${t}:${String(e % 60).padStart(2, "0")}` : `${e}s`;
}
function ws(e) {
  return e == null || !Number.isFinite(e) ? "—" : `${Math.round(e * 100)}%`;
}
function ks(e) {
  return e.replace(/\x1b\[[0-9;?]*[ -/]*[@-~]/g, "");
}
const ke = "—";
function pe(e, t) {
  return e.find((n) => n.role === t);
}
function ra(e, t) {
  return e.filter((n) => n.role === t);
}
function bs(e, t) {
  const n = (t ? t.columns : e?.columns) ?? [], a = t ? "scoped" : "everything";
  return n.filter(
    (s) => s.role !== "tint" && ((s.when ?? "always") === "always" || s.when === a)
  );
}
const $s = ["id", "entityKey", "entityLabel"];
function de(e, t) {
  if (e.value) return e.value(t);
  const n = e.field ?? e.key;
  if (n !== void 0) {
    if (t.fields && n in t.fields) return t.fields[n];
    if ($s.includes(n))
      return t[n];
  }
}
function Tn(e, t) {
  const n = e.key ?? e.field ?? e.label;
  return n?.trim() ? n.trim() : `column-${t}`;
}
function xs(e, t) {
  return e.id?.trim() ? e.id : `${e.entityKey || "row"}-${t}`;
}
function Ss(e, t) {
  if (e == null || e === "") return ke;
  if (t === "number") {
    const n = typeof e == "number" ? e : Number(e);
    return Number.isFinite(n) ? ps(n) : String(e);
  }
  return t === "date" ? hs(String(e)) : Array.isArray(e) ? e.length ? e.join(", ") : ke : String(e);
}
function Le(e, t) {
  const n = de(e, t);
  return e.format ? e.format(n, t) : Ss(n, e.kind);
}
function Cs(e) {
  return typeof e == "number" ? Number.isFinite(e) ? String(e) : "" : typeof e == "string" ? e : Array.isArray(e) ? e.join(", ") : "";
}
function ia(e, t) {
  const n = Le(e, t), a = Cs(de(e, t));
  return a && a !== n ? a : n;
}
function wt(e, t) {
  return e ? Le(e, t) : "";
}
function On(e) {
  return e.align ? e.align : e.kind === "number" || e.kind === "ordinal" ? "right" : "left";
}
const Ps = {
  ordinal: "dc-table__num",
  number: "dc-table__number",
  date: "dc-table__date",
  status: "dc-table__state"
};
function An(e) {
  return [Ps[e.kind ?? "text"], e.class].filter(Boolean).join(" ");
}
function Zt(e) {
  if (e.truncate !== void 0) return e.truncate;
  const t = e.kind ?? "text";
  return t === "text" || t === "number" || t === "date";
}
const Ms = /^([A-Za-z_][\w.-]*)\s*(>=|<=|:|=|>|<)\s*(.*)$/, Nn = "-?(?:\\d+\\.?\\d*|\\.\\d+)", Es = new RegExp(`^(${Nn})?\\.\\.(${Nn})?$`);
function Bt(e) {
  const t = Es.exec(e.trim());
  if (!t || t[1] === void 0 && t[2] === void 0) return null;
  const n = t[1] === void 0 ? null : Number(t[1]), a = t[2] === void 0 ? null : Number(t[2]);
  return n !== null && a !== null && n > a ? { min: a, max: n } : { min: n, max: a };
}
function Ls(e) {
  return `${e.min ?? ""}..${e.max ?? ""}`;
}
function Ue(e) {
  return e.kind === "field" && (e.comparator === ":" || e.comparator === "=") && Bt(e.value) !== null;
}
function Ts(e) {
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
function oe(e) {
  const t = e.trim();
  if (!t) return [];
  const n = [];
  let a = [];
  for (const s of Ts(t)) {
    const l = s.toUpperCase();
    if (l === "AND" || l === "&&") continue;
    if (l === "OR" || l === "||") {
      a.length && n.push(a), a = [];
      continue;
    }
    const o = s.length > 1 && s.startsWith("-"), r = o ? s.slice(1) : s, i = o ? { negated: !0 } : {}, c = Ms.exec(r);
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
const Me = (e) => e.toLowerCase().replace(/\s+/g, ""), ca = [
  ["status", "state"],
  ["state", "state"],
  ["updated", "updated"],
  ["date", "updated"],
  ["name", "identity"],
  ["ref", "reference"]
];
function Os(e, t, n) {
  const a = Me(e), s = n.columns ?? [];
  if (a === "entity") return t.entityKey;
  if (e in t.fields) return t.fields[e];
  const l = s.find(
    (c) => c.key?.toLowerCase() === e.toLowerCase() || c.field?.toLowerCase() === e.toLowerCase() || c.label !== void 0 && Me(c.label) === a
  );
  if (l) return de(l, t);
  const o = n.facets.find(
    (c) => c.key.toLowerCase() === a || Me(c.label) === a
  );
  if (o && o.key in t.fields) return t.fields[o.key];
  const r = ca.find(([c]) => c === a)?.[1];
  if (r) {
    const c = pe(s, r);
    if (c) return de(c, t);
  }
  const i = /^metric(\d+)$/.exec(a);
  if (i) {
    const c = ra(s, "metric")[Number(i[1]) - 1];
    if (c) return de(c, t);
  }
}
function vt(e) {
  return (e.toLowerCase().match(/[\p{L}\p{N}]+/gu) ?? []).map((t) => t.charAt(0)).join("");
}
const In = /^[a-z_][\w.-]*$/;
function Rt(e) {
  const t = (e.key ?? e.field)?.toLowerCase();
  if (t !== void 0) return In.test(t) ? t : void 0;
  const n = e.label === void 0 ? void 0 : Me(e.label);
  return n !== void 0 && In.test(n) ? n : void 0;
}
function pn(e, t) {
  const n = Me(e);
  return !!t?.entities.some((a) => a.scope && Me(a.scope) === n);
}
function As(e, t, n) {
  const a = Me(e);
  if (a === "entity" || ca.some(([l]) => l === a) || /^metric\d+$/.test(a) || pn(e, n)) return !0;
  const s = (l) => l !== void 0 && Me(l) === a;
  return (t.columns ?? []).some(
    (l) => s(l.key) || s(l.field) || s(l.label)
  ) || t.facets.some((l) => s(l.key) || s(l.label));
}
function st(e, t, n) {
  return t ? da(e, (a) => {
    const s = fa(a, t, n);
    return s && Rt(s);
  }) : e;
}
function ua(e, t, n) {
  return t ? da(e, (a) => {
    if (pn(a, n)) return;
    const s = (t.columns ?? []).find((l) => Rt(l) === a);
    return s && va(s, t, n);
  }) : e;
}
function Ns(e, t, n) {
  if (!t || pn(e, n)) return;
  const a = t.facets.find((s) => s.key.toLowerCase() === e);
  return a ? a.label : (t.columns ?? []).find((s) => Rt(s) === e)?.label;
}
function da(e, t) {
  let n = !1;
  const a = oe(e).map(
    (s) => s.map((l) => {
      if (l.kind !== "field") return l;
      const o = t(l.field);
      return !o || o === l.field ? l : (n = !0, { ...l, field: o });
    })
  );
  return n ? ve(a) : e;
}
function fa(e, t, n) {
  if (!(!e || As(e, t, n)))
    return (t.columns ?? []).find(
      (a) => a.label !== void 0 && vt(a.label) === e
    );
}
function va(e, t, n) {
  if (!t || e.label === void 0 || !Rt(e)) return;
  const a = vt(e.label);
  return fa(a, t, n) === e ? a : void 0;
}
function Yt(e, t) {
  const n = e.toLowerCase(), a = t.toLowerCase();
  if (!a.includes("*")) return n.includes(a);
  const s = a.replace(/[.+?^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*");
  return new RegExp(s).test(n);
}
function Bn(e, t) {
  return e.toLowerCase() === t.toLowerCase();
}
function Is(e, t, n, a) {
  if (e.kind === "text") {
    const i = n.columns ?? [];
    return ["identity", "reference"].some((c) => {
      const d = pe(i, c), p = d ? de(d, t) : void 0;
      return typeof p == "string" && Yt(p, e.value);
    });
  }
  const s = Os(e.field, t, n);
  if (s === void 0) return a?.has(e.field) ? !1 : null;
  const l = Ue(e) ? Bt(e.value) : null;
  if (l) {
    if (Array.isArray(s) || typeof s == "boolean") return null;
    const i = typeof s == "number" ? s : Number(s);
    return Number.isFinite(i) ? (l.min === null || i >= l.min) && (l.max === null || i <= l.max) : null;
  }
  if (Array.isArray(s))
    return e.comparator === ":" || e.comparator === "=" ? s.some(
      (c) => e.comparator === "=" ? Bn(String(c), e.value) : Yt(String(c), e.value)
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
    return e.comparator === "=" ? Bn(String(s), e.value) : Yt(String(s), e.value);
  }
  const o = Number(e.value), r = typeof s == "number" ? s : Number(s);
  return !Number.isFinite(o) || !Number.isFinite(r) ? null : Bs(e.comparator, r, o);
}
function Rn(e, t, n, a) {
  const s = Is(e, t, n, a);
  return s === null ? !0 : e.negated ? !s : s;
}
function Bs(e, t, n) {
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
  return e.kind === "field" && !e.negated && (e.comparator === ":" || e.comparator === "=") && !Ue(e);
}
const qn = /* @__PURE__ */ new WeakMap();
function Rs(e) {
  if (!e?.strictScopes) return null;
  let t = qn.get(e);
  return t || (t = new Set(
    e.entities.flatMap((n) => n.scope ? [n.scope.toLowerCase()] : [])
  ), qn.set(e, t)), t;
}
function Hs(e, t, n, a) {
  if (!e.length) return !0;
  const s = Rs(a);
  return e.some((l) => {
    const o = /* @__PURE__ */ new Map();
    for (const r of l)
      Hn(r) && o.set(
        r.field,
        (o.get(r.field) ?? !1) || Rn(r, t, n, s)
      );
    return l.every(
      (r) => Hn(r) ? o.get(r.field) === !0 : Rn(r, t, n, s)
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
function qs(e) {
  if (!e.negated) return { ...e, negated: !0 };
  const { negated: t, ...n } = e;
  return n;
}
function ve(e) {
  return e.filter((t) => t.length).map((t) => t.map(_e).join(" ")).join(" OR ");
}
function Fs(e, t, n) {
  return e.map((a, s) => s === t ? a.filter((l, o) => o !== n) : a).filter((a) => a.length);
}
function Ku(e) {
  const t = oe(e);
  if (t.length > 1) return { parts: [], text: e.trim() };
  const n = t[0] ?? [];
  return {
    parts: n.filter((a) => a.kind === "field"),
    text: n.filter((a) => a.kind === "text").map(_e).join(" ")
  };
}
function Wu(e, t) {
  return [...e.map(_e), t.trim()].filter(Boolean).join(" ");
}
const Dn = (e, t) => e.toLowerCase() === t.toLowerCase();
function lt(e, t) {
  return !!e.negated == !!t.negated && pa(e, t);
}
function Ds(e, t) {
  return !!e.negated != !!t.negated && pa(e, t);
}
function pa(e, t) {
  return e.kind === "field" ? t.kind === "field" && e.field === t.field && e.comparator === t.comparator && Dn(e.value, t.value) : t.kind === "text" && Dn(e.value, t.value);
}
function Vs(e, t) {
  return t.filter((n) => !e.some((a) => lt(a, n)));
}
function hn(e, t) {
  return ha(e, t, (n) => n);
}
function ot(e, t) {
  return ha(
    e,
    t,
    (n, a) => n.filter((s) => !a.some((l) => Ds(s, l)))
  );
}
const Ks = /^[A-Za-z_][\w.-]*\s*(?:>=|<=|:|=|>|<)$/;
function Ws(e) {
  return ve(
    oe(e).map(
      (t) => t.filter(
        (n) => n.kind !== "text" || n.value !== "-" && !Ks.test(n.value)
      )
    ).filter((t) => t.length > 0)
  );
}
function ha(e, t, n) {
  const a = oe(e), s = oe(t);
  return a.length ? s.length ? ve(
    a.flatMap(
      (l) => s.map((o) => [...n(l, o), ...Vs(l, o)])
    )
  ) : ve(a) : ve(s);
}
const ma = "cards", zs = "table";
function js(e, t = null) {
  if (e.trim() === "") return !1;
  if (!t) return !0;
  const n = new Set(
    t.entities.flatMap((a) => a.scope ? [a.scope.toLowerCase()] : [])
  );
  return !oe(e).flat().some((a) => a.kind === "field" && !a.negated && n.has(a.field.toLowerCase()) && a.value !== "");
}
function He(e, t = {}, n = "", a = null) {
  const s = (o) => o && ya(o) ? o : void 0;
  if (e === null) {
    const o = js(n, a) ? s(t.searchView) : void 0, r = n.trim() === "" ? s(t.homeView) : void 0;
    return o ?? r ?? s(t.view) ?? ma;
  }
  const l = t.landing === "entity" ? s(t.view) : void 0;
  return s(t.entityView) ?? l ?? zs;
}
function Us(e, t, n, a = {}, s = "", l = s, o = null) {
  return a.viewAcrossTypes !== "default" && e !== He(t, a, s, o) ? e : He(n, a, l, o);
}
function Qs(e, t, n = {}, a = null) {
  if (e.entity !== t.entity)
    return Us(e.view, e.entity, t.entity, n, e.expr, t.expr, a);
  const s = He(e.entity, n, e.expr, a);
  return e.view === s ? He(t.entity, n, t.expr, a) : e.view;
}
const en = "updated";
function ya(e) {
  return typeof e == "string" && (e === "record" || vn.includes(e));
}
const Vn = {
  list: "List",
  cards: "Cards",
  grid: "Grid",
  images: "Images",
  table: "Table",
  links: "Links",
  preview: "Preview",
  record: "Record"
}, Gs = {
  list: "M6 4h7.5M6 8h7.5M6 12h7.5M2.5 4h.01M2.5 8h.01M2.5 12h.01",
  cards: "M2.5 2.5h11v4.5h-11zM2.5 9h11v4.5h-11z",
  grid: "M2.5 2.5h4.5v4.5h-4.5zM9 2.5h4.5v4.5H9zM2.5 9h4.5v4.5h-4.5zM9 9h4.5v4.5H9z",
  images: "M2.5 3h11v10h-11zM2.5 11l3.5-3.5 2.5 2.5 2-2 3 3M10.5 5.75h.01",
  table: "M2.5 3h11v10h-11zM2.5 6.5h11M2.5 9.75h11M6.5 6.5V13",
  links: "M6.75 9.25a2.5 2.5 0 0 0 3.54 0l2.12-2.12a2.5 2.5 0 0 0-3.54-3.54l-.7.7M9.25 6.75a2.5 2.5 0 0 0-3.54 0L3.59 8.87a2.5 2.5 0 0 0 3.54 3.54l.7-.7",
  preview: "M1.5 8S4 3.5 8 3.5 14.5 8 14.5 8 12 12.5 8 12.5 1.5 8 1.5 8zM6 8a2 2 0 1 0 4 0 2 2 0 1 0-4 0",
  record: "M4 2h5.5L12 4.5V14H4zM9.5 2v2.5H12M6 8h4M6 10.5h4"
};
function Be(e, t) {
  if (e === "record" && !t?.includes(e)) return t?.[0] ?? ma;
  const [n] = t ?? [];
  return n === void 0 || t?.includes(e) ? e : n;
}
function rt(e) {
  return typeof e.count == "number" ? Re(e.count) : e.count;
}
function it(e, t) {
  return t ? e.entities.find((n) => n.key === t) ?? null : null;
}
function ga(e, t = {}) {
  const n = it(e, t.entity), a = e.entities[0];
  if (!n && !a) throw new Error(`Schema "${e.key}" declares no entities`);
  return n ?? a;
}
function _a(e, t = null) {
  return e?.columns ?? t?.columns ?? [];
}
function Ht(e, t = null) {
  if (e?.sorts?.length) return e.sorts;
  const n = /* @__PURE__ */ new Set(), a = [];
  for (const s of _a(e, t))
    !s.sort || n.has(s.sort) || (n.add(s.sort), a.push({ key: s.sort, label: (s.label ?? s.sort).toLowerCase() }));
  return a;
}
const Ys = { key: en, label: en };
function Ee(e, t, n = null) {
  const a = Ht(e, n);
  return (t ? a.find((l) => l.key === t) : void 0) ?? a.find((l) => l.key === en) ?? a[0] ?? Ys;
}
function Xs(e) {
  switch (e.kind) {
    case "chips":
      return { kind: "chips", selected: [] };
    case "range":
      return { kind: "range", min: null, max: null };
    case "toggle":
      return { kind: "toggle", on: !1 };
  }
}
function Js(e) {
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
function zu(e) {
  return e.entity !== null;
}
function wa(e, t) {
  return e.entity === null && Be(e.view, t) === "cards";
}
function Zs(e, t) {
  return t <= 0 ? 1 : Math.max(1, Math.ceil(e / t));
}
function $t(e, t = {}) {
  const a = t.landing === "entity" ? ga(e, t) : null;
  return {
    entity: a?.key ?? null,
    view: He(a?.key ?? null, t),
    sort: Ee(a, t.sort).key,
    dir: t.dir === "asc" ? "asc" : "desc",
    expr: "",
    page: 1
  };
}
const yn = ["entity", "sort", "dir", "expr"];
function el(e) {
  return yn.some((t) => t in e);
}
const ka = (e) => e.kind === "date" || e.role === "updated";
function tl(e) {
  if (!e) return () => 0;
  const n = (e.kind ?? "text") === "number" || e.role === "metric", a = ka(e);
  return (s, l) => {
    const o = de(e, s), r = de(e, l);
    return n ? Number(r ?? 0) - Number(o ?? 0) : a ? Date.parse(String(r ?? "")) - Date.parse(String(o ?? "")) : String(r ?? "").localeCompare(String(o ?? ""));
  };
}
function Kn(e, t) {
  return !t || !ka(t) ? !1 : !Number.isFinite(Date.parse(String(de(t, e) ?? "")));
}
function ba({ query: e, schema: t, entity: n, limit: a, offset: s }, l, o) {
  const r = oe(e.expr), i = n ? [n] : t.entities;
  let c = 0;
  const d = [];
  for (const k of i)
    for (const S of l(k))
      c += 1, Hs(r, S, k, t) && d.push(S);
  const p = Ee(n, e.sort, t), w = _a(n, t).find((k) => k.sort === p.key), m = o.undatedLast ? d.filter((k) => !Kn(k, w)) : d, h = o.undatedLast ? d.filter((k) => Kn(k, w)) : [];
  m.sort(tl(w)), e.dir === "asc" && m.reverse();
  const v = h.length ? [...m, ...h] : m;
  return {
    // One page out of the middle. `total` stays the whole match, which is what
    // the shell counts pages with.
    rows: o.zeroIsAll && a <= 0 ? v.slice(s) : v.slice(s, s + a),
    total: d.length,
    unfiltered: d.length === c
  };
}
const xt = [
  "oklch(0.36 0.06 240)",
  "oklch(0.34 0.07 290)",
  "oklch(0.36 0.06 160)",
  "oklch(0.38 0.06 80)",
  "oklch(0.35 0.07 30)",
  "oklch(0.34 0.05 200)"
];
function ju(e) {
  return xt[tt(e) % xt.length];
}
function $a(e, t) {
  return `${e}_${1e4 + t * 7}`;
}
const nl = 7, al = 3;
function sl(e, t, n, a) {
  const s = (t * nl + tt(n)) % a, l = [];
  for (let o = 0; o < Math.min(al, a); o++)
    l.push($a(e, (s + o) % a));
  return l;
}
function ll(e, t) {
  switch (e.kind) {
    case "chips":
      return e.multiple ? ol(e.options, t) : e.options[t % e.options.length] ?? "";
    case "range": {
      const n = Math.max(0, e.max - e.min);
      return e.min + (n === 0 ? 0 : t % (n + 1));
    }
    case "toggle":
      return t % 3 === 0;
  }
}
function ol(e, t) {
  if (!e.length) return [];
  const n = 1 + (t >> 5) % Math.min(3, e.length), a = t % e.length, s = /* @__PURE__ */ new Set();
  for (let l = 0; l < n; l++) s.add((a + l) % e.length);
  return [...s].sort((l, o) => l - o).map((l) => e[l]);
}
function rl(e, t) {
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
      return xt[n % xt.length];
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
function il(e, t = {}) {
  const n = t.population ?? 48, a = t.seed ?? "", s = t.now ?? /* @__PURE__ */ new Date("2026-08-25T00:00:00Z"), l = e.samples, o = t.scopes ?? [];
  if (!l.length) return [];
  const r = [];
  for (let i = 0; i < n; i++) {
    const c = l[i % l.length], d = Math.floor(i / l.length), p = tt(`${a}:${e.key}:${c[0]}:${i}`), w = $a(e.key, i), m = new Date(s.getTime() - p % 900 * 36e5).toISOString(), h = {};
    for (const v of e.columns ?? []) {
      const k = v.field ?? v.key;
      if (!k || v.value) continue;
      const S = rl(v, {
        hash: tt(`${p}:${k}`),
        sample: c,
        revision: d,
        updatedAt: m
      });
      S !== void 0 && (h[k] = S);
    }
    for (const v of e.facets)
      h[v.key] = ll(v, tt(`${p}:${v.key}`));
    for (const [v, k] of o)
      h[v] = k === e.key ? w : sl(k, i, v, n);
    r.push({ id: w, entityKey: e.key, entityLabel: e.label, fields: h });
  }
  return r;
}
function cl(e = {}) {
  const t = /* @__PURE__ */ new Map(), n = (a, s) => {
    const l = t.get(a.key);
    if (l) return l;
    const o = e.scopes ?? s.entities.flatMap(
      (i) => i.scope ? [[i.scope, i.key]] : []
    ), r = il(a, { ...e, scopes: o });
    return t.set(a.key, r), r;
  };
  return {
    query(a) {
      return ba(a, (s) => n(s, a.schema), {
        undatedLast: !1,
        zeroIsAll: !1
      });
    }
  };
}
const Xe = "e", qt = "v", gn = "s", _n = "d", qe = "q", Ft = "p", xa = "*", ul = [
  Xe,
  qt,
  gn,
  _n,
  qe,
  Ft
], dl = [
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
function St(e) {
  let t = encodeURIComponent(e);
  for (const [n, a] of dl) t = t.replace(n, a);
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
    const s = a.indexOf("="), l = s === -1 ? a : a.slice(0, s), o = s === -1 ? "" : a.slice(s + 1);
    n.push([ge(l), o]);
  }
  return n;
}
function fl(e) {
  return ul.includes(e);
}
function Dt(e, t) {
  if (!(!t || e.some((n) => n.key === t)))
    return e.find((n) => vt(n.label) === t);
}
function vl(e, t) {
  const n = vt(e.label);
  return Dt(t.entities, n)?.key === e.key ? n : e.key;
}
function Sa(e, t) {
  return t ? it(e, t) ?? Dt(e.entities, t) ?? null : null;
}
function pl(e, t) {
  const n = vt(e.label);
  return Dt(t, n)?.key === e.key ? n : e.key;
}
function hl(e, t) {
  return t.some((n) => n.key === e) ? e : Dt(t, e)?.key ?? e;
}
function ml(e, t, n = {}) {
  const a = $t(t, n), s = new Map(wn(e)), l = s.get(Xe), o = l === void 0 ? a.entity : ge(l), r = o === xa ? null : Sa(t, o), i = s.get(qe), c = i === void 0 ? "" : st(ge(i), r, t), d = s.get(qt), p = d && ya(ge(d)) ? ge(d) : He(r?.key ?? null, n, c, t), w = s.get(gn), m = Ee(
    r,
    w ? hl(ge(w), Ht(r, t)) : n.sort,
    t
  ), h = s.get(_n), v = h ? ge(h) === "asc" ? "asc" : "desc" : a.dir, k = s.get(Ft), S = k === void 0 ? 1 : Number(ge(k)), O = Number.isFinite(S) ? Math.max(1, Math.floor(S)) : 1;
  return {
    entity: r?.key ?? null,
    view: p,
    sort: m.key,
    dir: v,
    expr: c,
    page: O
  };
}
function Wn(e, t, n = {}, a = "") {
  const s = $t(t, n), l = it(t, e.entity), o = wn(a).filter(([p]) => !fl(p)), r = [], i = (p, w) => r.push([p, St(w)]), c = l?.key ?? null;
  if (c !== s.entity && i(Xe, l ? vl(l, t) : xa), e.view !== He(c, n, e.expr, t) && i(qt, e.view), e.sort !== s.sort) {
    const p = Ht(l, t), w = p.find((m) => m.key === e.sort);
    i(gn, w ? pl(w, p) : e.sort);
  }
  e.dir !== s.dir && i(_n, e.dir), e.expr.trim() !== "" && i(qe, ua(e.expr, l, t)), e.page > 1 && i(Ft, String(e.page));
  const d = [
    ...o.map(([p, w]) => [St(p), w]),
    ...r
  ];
  return d.length ? `?${d.map(([p, w]) => w === "" ? p : `${p}=${w}`).join("&")}` : "";
}
function Uu(e) {
  const t = [];
  for (const [n, a] of Object.entries(e))
    for (const s of Array.isArray(a) ? a : [a]) {
      if (typeof s != "string") continue;
      const l = St(n);
      t.push(s === "" ? l : `${l}=${St(s)}`);
    }
  return t.length ? `?${t.join("&")}` : "";
}
function Qu(e, t) {
  const n = new Map(wn(e)), a = n.get(qe), s = a === void 0 ? "" : ge(a);
  if (!t) return s;
  const l = n.get(Xe);
  return st(
    s,
    l === void 0 ? null : Sa(t, ge(l)),
    t
  );
}
function Vt(e, t) {
  return Pa(e, t.id);
}
function Ca(e, t) {
  return e?.standing === !1 ? null : Vt(e, t);
}
function Pa(e, t) {
  const n = e?.scope;
  return n ? Ma(n, t) : null;
}
function Ma(e, t) {
  return `${e}="${t.replace(/"/g, "")}"`;
}
function Gu(e, t) {
  const n = typeof e == "string" ? e : e?.scope;
  if (!n) return null;
  const a = t.filter((s) => s.replace(/"/g, "") !== "").map((s) => Ma(n, s));
  return a.length ? a.join(" ") : null;
}
function Kt(e, t) {
  if (e.kind !== "field" || t.kind !== "field") return lt(e, t);
  const n = (a) => a.comparator === ":" || a.comparator === "=";
  return lt(e, { ...t, comparator: n(e) && n(t) ? e.comparator : t.comparator });
}
function Ct(e, t) {
  return Kt(e, qs(t));
}
function Pt(e, t) {
  return Vt(
    e.entities.find((n) => n.key === t.entityKey),
    t
  );
}
function Qe(e, t) {
  if (!t) return e;
  const n = e.trim();
  if (!n) return t;
  const [a] = oe(t).flat();
  if (!a) return n;
  const s = oe(n);
  return s.some((r) => r.some((i) => Kt(i, a))) ? n : s.some((r) => r.some((i) => Ct(i, a))) ? ve(
    s.map(
      (r) => r.map((i) => Ct(i, a) ? a : i)
    )
  ) : `${n} ${t}`;
}
function Ea(e) {
  if (!e) return null;
  const t = e.trim();
  return t ? t.startsWith("-") ? t.slice(1) : `-${t}` : null;
}
function kn(e, t) {
  if (!t || !e.trim()) return null;
  const [n] = oe(t).flat();
  if (!n) return null;
  const a = oe(e).flat();
  return a.some((s) => Kt(s, n)) ? n.negated ? "out" : "in" : a.some((s) => Ct(s, n)) ? n.negated ? "in" : "out" : null;
}
function La(e, t) {
  if (!t || !e.trim()) return e;
  const [n] = oe(t).flat();
  if (!n) return e;
  const a = oe(e), s = a.map(
    (l) => l.filter((o) => !Kt(o, n) && !Ct(o, n))
  );
  return s.every((l, o) => l.length === a[o]?.length) ? e : ve(s);
}
function tn(e, t, n) {
  return t ? n === null ? La(e, t) : Qe(e, n === "out" ? Ea(t) : t) : e;
}
function nn(e, t) {
  const n = t.shiftKey ? `noopener,popup,width=${window.outerWidth},height=${window.outerHeight}` : "noopener";
  window.open(e, "_blank", n);
}
function Ta() {
  const e = window.getSelection?.();
  return !!e && !e.isCollapsed;
}
function an(e) {
  return e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0;
}
function ct(e) {
  return e.altKey ? { exclude: !0 } : {};
}
function Xt(e, t, n, a = {}, s) {
  const l = Pt(e, n);
  if (a.exclude) return zn(Qe(t.expr, Ea(l)), s);
  const o = l !== null && e.entities.find((r) => r.key === n.entityKey)?.narrowsAlone === !0;
  return zn(Qe(o ? "" : t.expr, l), s);
}
function zn(e, t) {
  const n = t?.trim() ? oe(t).flat() : [];
  if (!n.length) return e;
  const a = new Set(n.flatMap((r) => r.kind === "field" ? [r.field] : [])), s = (r) => r.kind === "field" && !r.negated && (r.comparator === ":" || r.comparator === "=") && a.has(r.field), l = e.trim(), o = l ? oe(l) : [[]];
  if (o.length === 1 && !o[0].some(s)) {
    const r = n.filter((i) => !o[0].some((c) => lt(c, i)));
    return [l, ...r.map(_e)].filter(Boolean).join(" ");
  }
  return ve(
    o.map((r) => {
      const i = r.filter((c) => !s(c));
      return [...i, ...n.filter((c) => !i.some((d) => lt(d, c)))];
    })
  );
}
function Oa(e, t) {
  const n = e?.scope?.toLowerCase();
  if (!n || e?.keepsScope || !t.trim()) return t;
  const a = oe(t), s = a.map(
    (l) => l.filter((o) => o.kind !== "field" || o.field !== n)
  );
  return s.every((l, o) => l.length === a[o]?.length) ? t : ve(s);
}
function Aa(e, t) {
  const n = t.toLowerCase();
  return e.entities.find((a) => a.scope?.toLowerCase() === n) ?? null;
}
function Na(e, t, n) {
  if (!t || !n) return null;
  const a = Aa(e, t);
  return a ? { entity: a, id: n } : null;
}
function yl(e, t) {
  const n = [], a = /* @__PURE__ */ new Set();
  for (const s of t)
    for (const l of oe(s).flat()) {
      if (l.kind !== "field" || l.negated) continue;
      const o = Na(e, l.field, l.value);
      if (!o) continue;
      const r = `${o.entity.key}:${o.id.toLowerCase()}`;
      a.has(r) || (a.add(r), n.push({ entityKey: o.entity.key, id: o.id }));
    }
  return n;
}
function Yu(e, t, n = "cards") {
  return {
    // An expression with nothing in it is no parameter, as the shell writes it.
    [qe]: Qe(e, t) || void 0,
    [Xe]: void 0,
    [qt]: n,
    [Ft]: void 0
  };
}
const Ia = Symbol("dc.shellContext");
function gl(e) {
  const t = e.liveQuery ? e : _l(e);
  return dn(Ia, t), t;
}
function _l(e) {
  const t = e.draft ?? R("");
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
function ne() {
  const e = un(Ia, null);
  if (!e)
    throw new Error(
      "[appfr] No shell context found. Render this component inside <DataShell>."
    );
  return e;
}
const Mt = Symbol("dc-shell-theme");
function sn(e) {
  return {
    read: () => ({
      theme: Ae(e.theme),
      accent: Ae(e.accent),
      tokens: Ae(e.tokens)
    })
  };
}
function wl(e, t) {
  t ? t.provide(Mt, sn(e)) : dn(Mt, sn(e));
}
function kl(e) {
  const t = aa();
  dn(Mt, {
    ...sn(e),
    element: () => t?.proxy?.$el ?? null
  });
}
function bn(e) {
  const t = aa(), n = un(Mt, null), a = he(null);
  function s() {
    const i = t?.proxy?.$el, d = (i instanceof Element ? i : i?.parentElement)?.closest(".dc-shell");
    if (!d) {
      a.value = null;
      return;
    }
    const p = {};
    for (const w of Array.from(d.style))
      w.startsWith("--") && (p[w] = d.style.getPropertyValue(w));
    a.value = { shell: d, theme: d.dataset.dcTheme, tokens: p };
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
function ut(e) {
  return e.key.toLowerCase();
}
const bl = /* @__PURE__ */ new Set([">", ">=", "<", "<="]);
function Ba(e, t) {
  if (e.kind !== "field" || e.negated || e.field !== ut(t)) return !1;
  const n = e.comparator === ":" || e.comparator === "=";
  switch (t.kind) {
    case "range":
      return Ue(e) || bl.has(e.comparator);
    case "chips":
      return n && !Ue(e) && Ra(t.options, e.value) !== void 0;
    case "toggle":
      return n && $l(e.value);
  }
}
function Ra(e, t) {
  const n = t.toLowerCase();
  return e.find((a) => a.toLowerCase() === n);
}
function $l(e) {
  const t = e.toLowerCase();
  return t === "true" || t === "yes";
}
function Ha(e, t) {
  const n = (oe(e)[0] ?? []).filter((a) => Ba(a, t));
  switch (t.kind) {
    case "range": {
      let a = null, s = null;
      for (const l of n) {
        const o = Bt(l.value), r = Number(l.value);
        o ? (o.min !== null && (a = o.min), o.max !== null && (s = o.max)) : Number.isFinite(r) && (l.comparator.startsWith(">") ? a = r : s = r);
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
function xl(e, t) {
  const n = ut(e);
  switch (t.kind) {
    case "range":
      return t.min === null && t.max === null ? [] : [{ kind: "field", field: n, comparator: ":", value: Ls(t) }];
    case "chips":
      return t.selected.map((a) => ({ kind: "field", field: n, comparator: "=", value: a }));
    case "toggle":
      return t.on ? [{ kind: "field", field: n, comparator: ":", value: "true" }] : [];
  }
}
function qa(e, t, n) {
  const a = xl(t, n), s = oe(e), l = (s.length ? s : [[]]).map((o) => [
    ...o.filter((r) => !Ba(r, t)),
    ...a
  ]);
  return ve(l);
}
function Xu(e, t) {
  return qa(e, t, Xs(t));
}
function Sl(e, t) {
  return (t?.facets ?? []).some((n) => Js(Ha(e, n)));
}
const je = "entity", dt = "expr", Cl = { ">=": "≥", "<=": "≤", ">": ">", "<": "<" };
function Je(e) {
  const t = Number(e);
  return Number.isFinite(t) && !Number.isInteger(t) ? It(t) : String(e);
}
function Pl(e, t, n) {
  if (e.kind !== "field") return _e(e);
  const a = Ns(e.field, t, n);
  if (a === void 0) return _e(e);
  const s = e.negated ? "-" : "", l = Ue(e) ? Bt(e.value) : null;
  if (l) {
    const r = l.min !== null && l.max !== null ? `${Je(l.min)} ≤ ${a} ≤ ${Je(l.max)}` : l.max !== null ? `${a} ≤ ${Je(l.max)}` : `${a} ≥ ${Je(l.min)}`;
    return s + r;
  }
  const o = Cl[e.comparator];
  return o ? `${s}${a} ${o} ${Je(e.value)}` : _e({ ...e, field: a });
}
function Et(e, t, n = null) {
  const a = [];
  return t && a.push({
    id: je,
    label: `entity:${t.key}`,
    facetKey: je
  }), oe(e.expr).forEach((s, l) => {
    s.forEach((o, r) => {
      a.push({
        id: `${dt}:${l}:${r}`,
        label: Pl(o, t, n),
        address: ua(_e(o), t, n),
        facetKey: dt,
        group: l,
        index: r,
        ...o.kind === "field" ? { field: o.field, value: o.value } : {},
        ...o.negated ? { negated: !0 } : {}
      });
    });
  }), a;
}
function Ml(e, t, n = null) {
  if (mn(e)) {
    const l = Ee(t, e.sort, n);
    return `everything · ${e.view} · ${l.label}`;
  }
  const a = Et(e, t).filter((l) => l.facetKey !== dt).map((l) => l.label), s = e.expr.trim();
  return s && a.push(`"${s}"`), a.join(" · ");
}
function El(e) {
  const { adapter: t } = e, n = f(() => Ae(e.schema)), a = f(() => Ae(e.defaults) ?? {}), s = f(() => ml(t.search.value, n.value, a.value)), l = f(() => it(n.value, s.value.entity)), o = f(() => l.value ?? ga(n.value, a.value)), r = f(() => Ht(l.value, n.value)), i = f(() => Ee(l.value, s.value.sort, n.value)), c = (g, _) => {
    const M = Wn(g, n.value, a.value, t.search.value);
    return M === t.search.value && !t.elsewhere?.value ? !1 : (_ === "push" ? t.push(M) : t.replace(M), !0);
  }, d = () => Ae(e.navigationMode) ?? "push", p = () => Ae(e.facetNavigationMode) ?? "replace", w = (g, _) => c(m(g), _), m = (g) => {
    const _ = g.page ?? (el(g) ? 1 : s.value.page), M = { ...s.value, ...g, page: _ };
    return g.view === void 0 && (M.view = Qs(s.value, M, a.value, n.value)), M;
  }, h = (g) => v(m(g)), v = (g) => {
    const _ = Wn(g, n.value, a.value, t.search.value);
    return t.href ? t.href(_) : `${t.path.value}${_}`;
  }, k = (g, _) => {
    const M = l.value?.facets.find((ae) => ae.key === g);
    if (!M) return;
    const q = qa(s.value.expr, M, _(Ha(s.value.expr, M)));
    w({ expr: q }, p());
  }, S = (g) => {
    const _ = g === null ? null : it(n.value, g);
    return (_?.key ?? null) === s.value.entity ? {} : {
      entity: _?.key ?? null,
      sort: Ee(_, s.value.sort, n.value).key
    };
  }, O = (g) => {
    const _ = S(g);
    Object.keys(_).length && w(_, d());
  };
  return {
    query: s,
    entity: l,
    focus: o,
    sort: i,
    sorts: r,
    summary: f(() => Ml(s.value, l.value, n.value)),
    terms: f(() => Et(s.value, l.value, n.value)),
    isPristine: f(() => mn(s.value)),
    isEverything: f(() => s.value.entity === null),
    hasFacets: f(() => Sl(s.value.expr, l.value)),
    setEntity: O,
    entityHref: (g) => h(S(g)),
    clearEntity: () => O(null),
    setView(g, _) {
      w(_ === void 0 ? { view: g } : { view: g, page: Math.max(1, Math.floor(_)) }, d());
    },
    setSort(g) {
      w({ sort: Ee(l.value, g, n.value).key }, d());
    },
    toggleDirection() {
      w({ dir: s.value.dir === "desc" ? "asc" : "desc" }, d());
    },
    setExpression(g) {
      return w({ expr: g }, d());
    },
    narrow(g, _, M) {
      return w({ expr: g, ...S(_), ...M ? { view: M } : {} }, d());
    },
    narrowHref(g, _, M) {
      return h({ expr: g, ...S(_), ...M ? { view: M } : {} });
    },
    setPage(g, _) {
      w({ page: Math.max(1, Math.floor(g)) }, _ ?? d());
    },
    setFacet(g, _) {
      k(g, () => _);
    },
    toggleChip(g, _) {
      k(g, (M) => M.kind !== "chips" ? M : { kind: "chips", selected: M.selected.includes(_) ? M.selected.filter((ae) => ae !== _) : [...M.selected, _] });
    },
    setRange(g, _, M) {
      k(g, (q) => q.kind === "range" ? { kind: "range", min: _, max: M } : q);
    },
    toggleFlag(g) {
      k(
        g,
        (_) => _.kind === "toggle" ? { kind: "toggle", on: !_.on } : _
      );
    },
    removeTerm(g) {
      if (g.facetKey === je) {
        O(null);
        return;
      }
      if (g.facetKey === dt) {
        const _ = Fs(oe(s.value.expr), g.group ?? 0, g.index ?? 0);
        w({ expr: ve(_) }, d());
      }
    },
    clearFilters() {
      w({ ...S(null), expr: "" }, d());
    },
    clearHref: () => h({ ...S(null), expr: "" }),
    reset() {
      c($t(n.value, a.value), d());
    },
    homeHref: () => v($t(n.value, a.value)),
    // The same rule the mutations follow, so a link built for a change goes
    // exactly where clicking through to that change would have gone.
    hrefFor: (g) => h(g)
  };
}
const jn = 50;
function Ll(e) {
  const t = he([]), n = R(0), a = R(0), s = R(!1), l = R(!1), o = he(null);
  let r = 0, i = null, c = null;
  const d = f(() => (e.query.value.page - 1) * e.limit.value), p = f(() => Zs(n.value, e.limit.value)), w = f(() => Math.max(0, n.value - a.value)), m = () => {
    const I = e.query.value, K = e.within?.value.trim(), T = Oa(e.entity.value, I.expr);
    return K ? { ...I, expr: hn(K, T) } : T === I.expr ? I : { ...I, expr: T };
  }, h = (I, K) => {
    t.value = I.rows, n.value = I.total, a.value = I.kept ?? 0, o.value = null, v(K);
  }, v = (I) => {
    i = { key: I, total: n.value }, l.value = !1;
  }, k = (I) => {
    o.value = I, t.value = [], n.value = 0, a.value = 0, i = null, l.value = !1;
  }, S = (I, K, T, V) => {
    let F = !0;
    const ee = () => I === r;
    let L = 0, Q = !1;
    const A = (re) => {
      L = re, Q = !0, V === void 0 && (n.value = re);
    }, se = () => {
      F && (F = !1, t.value = [], a.value = 0, A(0)), o.value = null;
    };
    return {
      get open() {
        return ee();
      },
      insert(re, me) {
        if (!ee()) return;
        const be = Array.isArray(re) ? re : [re];
        if (!be.length) return;
        se();
        const ye = [...t.value];
        ye.splice(me ?? ye.length, 0, ...be), t.value = K > 0 ? ye.slice(0, K) : ye, A(L + be.length);
      },
      set(re) {
        ee() && (re.rows && (se(), t.value = K > 0 ? re.rows.slice(0, K) : re.rows, A(re.rows.length)), re.total !== void 0 && A(re.total));
      },
      close() {
        ee() && (s.value = !1, Q && (n.value = L), v(T));
      },
      fail(re) {
        ee() && (k(re), s.value = !1);
      }
    };
  }, O = () => {
    const I = c;
    c = null, I?.();
  }, g = () => {
    const I = ++r;
    O();
    const K = _.value, T = i?.key === K ? i.total : void 0;
    l.value = T === void 0;
    const V = {
      query: m(),
      schema: e.schema.value,
      entity: e.entity.value,
      limit: e.limit.value,
      offset: d.value
    }, F = e.source.value;
    if (F.stream) {
      s.value = !0;
      try {
        c = F.stream(V, S(I, V.limit, K, T)) ?? null;
      } catch (L) {
        k(L), s.value = !1;
      }
      return;
    }
    let ee;
    try {
      ee = F.query(V);
    } catch (L) {
      k(L);
      return;
    }
    if (!(ee instanceof Promise)) {
      h(ee, K), s.value = !1;
      return;
    }
    s.value = !0, ee.then((L) => {
      I === r && h(L, K);
    }).catch((L) => {
      I === r && k(L);
    }).finally(() => {
      I === r && (s.value = !1);
    });
  }, _ = f(() => {
    const I = m();
    return `${e.entity.value?.key ?? e.schema.value.entities[0]?.key ?? ""}|${JSON.stringify(yn.map((T) => I[T]))}`;
  }), M = f(() => `${_.value}|${e.query.value.page}`);
  return le([e.source, M, e.limit], g, {
    immediate: !0
  }), Tt(() => {
    r++, O();
  }, !0), { rows: t, total: n, matched: w, offset: d, pageCount: p, pending: s, counting: l, error: o, refresh: g, locate: async (I, K) => {
    const T = Math.max(0, K - 1 - jn);
    try {
      const { rows: V } = await e.source.value.query({
        query: m(),
        schema: e.schema.value,
        entity: e.entity.value,
        limit: jn * 2 + 1,
        offset: T
      }), F = V.findIndex((ee) => ee.id === I);
      return F === -1 ? null : T + F + 1;
    } catch {
      return null;
    }
  }, peek: async (I, K) => {
    if (K <= 0) return [];
    try {
      const { rows: T } = await e.source.value.query({
        query: m(),
        schema: e.schema.value,
        entity: e.entity.value,
        limit: K,
        offset: Math.max(0, I)
      });
      return T;
    } catch {
      return [];
    }
  } };
}
function Tl(e) {
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
    const p = e.rows.value[0]?.id;
    c !== null ? o(c, !1) : d === null ? t.value = { ...r, gone: !0, next: p } : d !== r.page && o(d);
  }, o = (r, i = t.value?.gone ?? !1) => {
    t.value && (t.value = { ...t.value, page: r, gone: i }, e.moveTo(r));
  };
  return le([e.active, e.rows, e.pending, e.page, e.list], s, {
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
const Ol = 150;
function Al(e) {
  const t = e.delay ?? Ol, n = R(""), a = R("");
  let s = !1, l;
  const o = () => {
    clearTimeout(l), l = void 0;
  }, r = f(() => st(Ws(a.value), e.entity.value, e.schema?.value)), i = f(() => r.value.trim() !== ""), c = f(
    () => JSON.stringify([r.value, ...yn.map((m) => e.query.value[m])])
  ), d = he(null), p = f(() => {
    const m = e.query.value;
    if (!i.value) return m;
    const h = d.value?.of === c.value ? d.value.page : 1;
    return { ...m, expr: ot(m.expr, r.value), page: h };
  });
  le(n, (m) => {
    if (o(), !m.trim()) {
      s || (a.value = "");
      return;
    }
    s = !1, l = setTimeout(() => {
      l = void 0, a.value = n.value;
    }, t);
  }), le(
    e.query,
    () => {
      s && (s = !1, a.value = "");
    },
    { flush: "sync" }
  );
  const w = (m) => {
    o(), s = !0, n.value = "", !m() && s && (s = !1, a.value = "");
  };
  return sa() && Tt(o), {
    text: n,
    live: p,
    drafting: i,
    setPage(m) {
      d.value = { of: c.value, page: Math.max(1, Math.floor(m)) };
    },
    commit() {
      const m = n.value.trim();
      if (!m) return;
      const h = ot(
        e.query.value.expr,
        st(m, e.entity.value, e.schema?.value)
      );
      a.value = m, w(() => e.setExpression(h));
    },
    abandon() {
      o(), s = !1, n.value = "", a.value = "";
    },
    release: w
  };
}
const Nl = 25, Fa = (e, t) => e.toLowerCase() === t.toLowerCase();
function Il(e, t) {
  return e.find((n) => Fa(n.id, t));
}
function Bl(e) {
  const t = he(/* @__PURE__ */ new Map()), n = /* @__PURE__ */ new Set(), a = (r) => {
    if (r.facetKey !== dt) return null;
    const i = Na(e.schema.value, r.field, r.value);
    return i ? { ...i, key: `${i.entity.key}:${i.id}` } : null;
  }, s = (r) => {
    const { entity: i, id: c } = r, d = e.query.value;
    return e.source.value.query({
      query: {
        ...d,
        entity: i.key,
        // The reference on its own. The rest of the query is about the rows on
        // screen, which are of another type entirely.
        expr: Pa(i, c) ?? "",
        sort: Ee(i, d.sort, e.schema.value).key,
        page: 1
      },
      schema: e.schema.value,
      entity: i,
      limit: Nl,
      offset: 0
    });
  }, l = (r, i) => {
    const c = wt(pe(r.columns ?? [], "identity"), i);
    return c === ke || Fa(c, i.id) ? "" : c;
  }, o = () => {
    if (e.loading.value) return;
    const r = /* @__PURE__ */ new Map();
    for (const d of e.terms.value) {
      const p = a(d);
      p && !t.value.has(p.key) && !n.has(p.key) && r.set(p.key, p);
    }
    if (!r.size) return;
    const i = [...r.values()].map((d) => ({
      reference: d,
      outcome: s(d)
    })), c = (d) => {
      const p = new Map(t.value);
      d.forEach((w, m) => {
        const { reference: h } = i[m], v = Il(w.rows, h.id);
        p.set(h.key, v ? l(h.entity, v) : "");
      }), t.value = p;
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
  return le([e.source, e.schema, e.terms, e.loading], () => {
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
const Rl = 4, Hl = 8, ql = 180;
function Fl(e, t, n, a = {}) {
  const s = a.gap ?? Rl, l = a.margin ?? Hl, o = a.flipBelow ?? ql, r = a.side ?? "below", i = {
    below: n.height - e.bottom - s - l,
    above: e.top - s - l
  }, c = r === "below" ? "above" : "below", d = i[r] < o && i[c] > i[r] ? c : r, p = Math.min(a.maxHeight ?? 1 / 0, Math.max(0, i[d])), w = Math.max(0, n.width - l * 2), m = Math.min(a.minWidth ?? e.width, w), h = Math.min(Math.max(t, m), w), v = a.align === "end" ? e.right - h : e.left, k = Math.max(l, Math.min(v, n.width - h - l));
  return d === "below" ? { side: d, left: k, top: e.bottom + s, maxHeight: p, minWidth: m, maxWidth: w } : { side: d, left: k, bottom: n.height - e.top + s, maxHeight: p, minWidth: m, maxWidth: w };
}
const Dl = ["data-dc-theme", "data-dc-side"], Pe = [], Vl = /* @__PURE__ */ U({
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
    const n = e, a = t, { theme: s, style: l, adopt: o } = bn(n), r = R(null), i = R(null), c = { root: () => r.value };
    function d() {
      const g = n.anchor;
      g && (i.value = Fl(
        g.getBoundingClientRect(),
        r.value?.offsetWidth ?? 0,
        { width: window.innerWidth, height: window.innerHeight },
        { side: n.side, align: n.align, maxHeight: n.maxHeight, minWidth: n.minWidth }
      ));
    }
    const p = f(() => {
      const g = i.value, _ = g ? {
        position: "fixed",
        left: `${g.left}px`,
        ...g.top !== void 0 ? { top: `${g.top}px` } : {},
        ...g.bottom !== void 0 ? { bottom: `${g.bottom}px` } : {},
        minWidth: `${g.minWidth}px`,
        maxWidth: `${g.maxWidth}px`,
        maxHeight: `${g.maxHeight}px`,
        overflowY: "auto"
      } : { position: "fixed", visibility: "hidden" };
      return { ...l.value, ..._ };
    });
    function w() {
      a("update:open", !1), a("close");
    }
    function m(g) {
      return r.value?.contains(g) || n.anchor?.contains(g) ? !0 : Pe.slice(Pe.indexOf(c) + 1).some((M) => M.root()?.contains(g));
    }
    function h(g) {
      const _ = g.target;
      _ && !m(_) && w();
    }
    function v(g) {
      g.key !== "Escape" || g.defaultPrevented || Pe[Pe.length - 1] === c && (g.preventDefault(), r.value?.contains(document.activeElement) && n.anchor?.focus(), w());
    }
    let k = null;
    async function S() {
      Pe.includes(c) || (Pe.push(c), o(), i.value = null, await nt(), d(), window.addEventListener("pointerdown", h, !0), document.addEventListener("keydown", v, !0), window.addEventListener("resize", d), window.addEventListener("scroll", d, !0), typeof ResizeObserver < "u" && r.value && (k = new ResizeObserver(() => d()), k.observe(r.value)));
    }
    function O() {
      const g = Pe.indexOf(c);
      g !== -1 && (Pe.splice(g, 1), window.removeEventListener("pointerdown", h, !0), document.removeEventListener("keydown", v, !0), window.removeEventListener("resize", d), window.removeEventListener("scroll", d, !0), k?.disconnect(), k = null);
    }
    return Ye(() => {
      n.open && S();
    }), le(
      () => n.open,
      (g) => {
        g ? S() : O();
      }
    ), le(() => n.anchor, () => {
      n.open && d();
    }), we(O), (g, _) => e.open ? (u(), N(Ot, {
      key: 0,
      to: e.to
    }, [
      $("div", Ie({
        ref_key: "root",
        ref: r
      }, g.$attrs, {
        class: "dc-shell dc-layer dc-popover",
        "data-dc-theme": b(s),
        "data-dc-side": i.value?.side,
        style: p.value
      }), [
        X(g.$slots, "default", {}, void 0, !0)
      ], 16, Dl)
    ], 8, ["to"])) : E("", !0);
  }
}), G = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [a, s] of t)
    n[a] = s;
  return n;
}, Kl = /* @__PURE__ */ G(Vl, [["__scopeId", "data-v-a688f2f7"]]), Wl = ["href"], zl = /* @__PURE__ */ U({
  __name: "PressLink",
  props: {
    href: {},
    selectable: { type: Boolean }
  },
  emits: ["press"],
  setup(e, { emit: t }) {
    const n = e, a = t;
    function s(r) {
      r.stopPropagation(), !Ta() && (n.href && an(r) ? nn(n.href, r) : a("press", ct(r), r));
    }
    function l(r) {
      n.href && r.button === 1 && nn(n.href, r);
    }
    function o(r) {
      if (n.href && an(r)) {
        r.stopPropagation();
        return;
      }
      r.preventDefault(), a("press", ct(r), r);
    }
    return (r, i) => e.selectable ? (u(), y("span", {
      key: 0,
      role: "link",
      tabindex: "0",
      class: "dc-press",
      onClick: s,
      onAuxclick: l,
      onKeydown: i[0] || (i[0] = Ne((c) => c.currentTarget.click(), ["enter"]))
    }, [
      X(r.$slots, "default", {}, void 0, !0)
    ], 32)) : e.href ? (u(), y("a", {
      key: 1,
      href: e.href,
      class: "dc-press",
      onClick: o
    }, [
      X(r.$slots, "default", {}, void 0, !0)
    ], 8, Wl)) : (u(), y("button", {
      key: 2,
      type: "button",
      class: "dc-press",
      onClick: o
    }, [
      X(r.$slots, "default", {}, void 0, !0)
    ]));
  }
}), ce = /* @__PURE__ */ G(zl, [["__scopeId", "data-v-e5165a68"]]), Lt = (e) => e.toLowerCase().replace(/\s+/g, ""), jl = /(?:[^\s"]|"[^"]*"?)*$/, Ul = /^(-?)([^:=<>"\s-][^:=<>"\s]*)([:=])(.*)$/, Un = 4;
function Ql(e, t) {
  const n = Lt(t);
  return e.find((a) => ut(a) === n || Lt(a.label) === n);
}
function Gl(e) {
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
function Yl(e) {
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
  return Lt(e).includes(Lt(t));
}
function Xl(e, t) {
  const n = jl.exec(e)?.[0] ?? "", a = e.slice(0, e.length - n.length), s = [], l = Ul.exec(n);
  if (l) {
    const [, o, r, i, c] = l, d = Ql(t, r);
    if (!d) return [];
    const p = c.replace(/"/g, "").toLowerCase();
    for (const { value: w, hint: m } of Yl(d)) {
      if (!w.toLowerCase().includes(p)) continue;
      const h = _e({
        kind: "field",
        field: ut(d),
        comparator: i,
        value: w,
        ...o ? { negated: !0 } : {}
      });
      s.push({ draft: a + h, label: h, ...m ? { hint: m } : {}, complete: !0 });
    }
  } else {
    if (/[<>"]/.test(n)) return [];
    const o = n.startsWith("-") ? "-" : "", r = n.slice(o.length);
    for (const i of t) {
      if (r && !Qn(i.key, r) && !Qn(i.label, r)) continue;
      const c = `${o}${ut(i)}:`;
      s.push({ draft: a + c, label: c, hint: Gl(i), complete: !1 });
    }
  }
  return s.filter((o) => o.draft !== e);
}
const Jl = { class: "dc-header__main" }, Zl = {
  class: "dc-header__brand",
  "aria-hidden": "true"
}, eo = { class: "dc-header__sr" }, to = {
  key: 2,
  class: "dc-header__within"
}, no = ["title"], ao = { class: "dc-header__query" }, so = ["data-dc-more", "title"], lo = { class: "dc-header__run" }, oo = {
  key: 0,
  class: "dc-header__or dc-mono",
  "aria-hidden": "true"
}, ro = ["title", "aria-label", "onClick"], io = ["placeholder", "aria-expanded", "aria-activedescendant", "onKeydown"], co = ["id", "aria-selected", "onClick"], uo = { class: "dc-completion__term dc-mono" }, fo = {
  key: 0,
  class: "dc-completion__hint"
}, vo = {
  key: 0,
  class: "dc-header__actions"
}, po = /* @__PURE__ */ U({
  __name: "ShellHeader",
  props: {
    panel: { type: Boolean }
  },
  setup(e) {
    const t = At(), n = e, a = ne(), s = f(() => a.schema.value), l = f(() => {
      const x = a.within.value.trim();
      return x ? Et({ ...a.query.value, expr: x }, null) : [];
    }), o = f(() => {
      const x = a.entity.value, B = x?.keepsScope ? void 0 : x?.scope?.toLowerCase();
      return a.terms.value.filter((W) => n.panel || W.facetKey !== je).map((W, D, Te) => {
        const Oe = Te[D - 1];
        return {
          term: W,
          or: Oe?.group !== void 0 && W.group !== void 0 && W.group !== Oe.group,
          idle: !!B && W.field?.toLowerCase() === B
        };
      });
    }), r = Bl({
      source: a.source,
      schema: a.schema,
      query: a.query,
      loading: a.loading,
      // The scope's parts as well as the query's: it names a record more often
      // than a typed term does, being what a record's own page is built on.
      terms: f(() => [...l.value, ...a.terms.value])
    });
    function i(x) {
      const B = Aa(s.value, x)?.scopeLabel ?? x;
      return B.charAt(0).toUpperCase() + B.slice(1);
    }
    function c(x) {
      return x.replace(/\s*\([^()]*\)\s*$/, "");
    }
    function d(x) {
      if (x.facetKey === je) {
        const D = a.entity.value?.label;
        return D ? `${D} · ${Re((a.matched ?? a.total).value)}` : x.label;
      }
      const B = r.nameOf(x);
      return B ? `${x.negated ? "-" : ""}${i(x.field)}: ${c(B)}` : x.label;
    }
    function p(x) {
      const B = d(x.term), W = x.idle ? `Not applied to ${a.entity.value?.label} — remove ${B}` : `Remove ${B}`, D = x.term.address;
      return D && D !== B ? `${W}
Written ${D} in the address and the search box` : W;
    }
    const w = f(() => {
      const x = a.pressPreview?.value;
      if (!x) return [];
      const B = a.query.value, W = new Set(a.terms.value.map((D) => D.address));
      return Et(
        { ...B, expr: x.alone ? x.term : ot(B.expr, x.term) },
        a.entity.value,
        a.schema.value
      ).filter((D) => D.address !== void 0 && !W.has(D.address)).map(
        (D) => x.name ? `${i(D.field)}: ${c(x.name)}` : D.label
      );
    }), m = f(() => a.pressPreview?.value?.alone === !0), h = R(null);
    function v(x) {
      h.value = x instanceof HTMLInputElement ? x : null;
    }
    function k() {
      a.abandonDraft(), h.value?.blur();
    }
    function S() {
      const x = _.value[g.value];
      if (M.value && x) {
        ae(x);
        return;
      }
      T.value = null, O.value = !1, a.commitDraft();
    }
    const O = R(!1), g = R(-1), _ = f(() => {
      const x = a.entity.value?.facets ?? [];
      return x.length ? Xl(a.draft.value, x) : [];
    }), M = f(() => O.value && _.value.length > 0);
    le(_, () => {
      g.value = -1;
    });
    const q = `${Nt() ?? "dc-header"}-completions`;
    function ae(x) {
      a.draft.value = x.draft, O.value = !x.complete, g.value = -1, nt(() => {
        const B = h.value;
        B?.focus(), B?.setSelectionRange(x.draft.length, x.draft.length);
      });
    }
    function I(x, B) {
      if (x.isComposing || !_.value.length) return;
      if (x.preventDefault(), !O.value) {
        O.value = !0;
        return;
      }
      const W = _.value.length + 1;
      g.value = (g.value + 1 + B + W) % W - 1;
    }
    function K(x) {
      return `${q}-${x}`;
    }
    const T = R(null), V = f(() => Math.min(T.value ?? 1 / 0, o.value.length)), F = f(() => [
      { key: "before", entries: o.value.slice(0, V.value) },
      { key: "after", entries: o.value.slice(V.value) }
    ]), ee = f(() => V.value < o.value.length);
    le(o, (x) => {
      T.value !== null && T.value >= x.length && (T.value = null);
    });
    function L(x, B) {
      T.value = x >= o.value.length ? null : Math.max(0, x), nt(() => {
        const W = h.value;
        if (!W) return;
        const D = B === "start" ? 0 : W.value.length;
        W.setSelectionRange(D, D), W.scrollIntoView({ block: "nearest", inline: "nearest" }), $e();
      });
    }
    function Q(x) {
      const B = h.value;
      return !B || B.selectionStart !== B.selectionEnd ? !1 : B.selectionStart === (x === "start" ? 0 : B.value.length);
    }
    function A(x) {
      V.value === 0 || !Q("start") || (x.preventDefault(), L(x.key === "Home" ? 0 : V.value - 1, "start"));
    }
    function se(x) {
      !ee.value || !Q("end") || (x.preventDefault(), L(x.key === "End" ? o.value.length : V.value + 1, "end"));
    }
    function re(x) {
      V.value === 0 || !Q("start") || (x.preventDefault(), ye(o.value[V.value - 1].term, !0));
    }
    function me(x) {
      !ee.value || !Q("end") || (x.preventDefault(), ye(o.value[V.value].term, !1));
    }
    function be(x) {
      x.isComposing || x.altKey || x.ctrlKey || x.metaKey || x.shiftKey || (x.key === "ArrowLeft" || x.key === "Home" ? A(x) : x.key === "ArrowRight" || x.key === "End" ? se(x) : x.key === "Backspace" ? re(x) : x.key === "Delete" && me(x));
    }
    function ye(x, B) {
      B && T.value !== null && (T.value = Math.max(0, T.value - 1)), a.removeTerm(x);
    }
    function yt(x) {
      x.target?.closest("button, input") || (x.preventDefault(), h.value?.focus(), L(o.value.length, "end"));
    }
    function Ve() {
      O.value = !1, a.draft.value || (T.value = null);
    }
    const Ke = R(null), We = R("");
    function $e() {
      const x = Ke.value;
      if (!x) {
        We.value = "";
        return;
      }
      const B = x.scrollLeft > 1, W = x.scrollWidth - x.clientWidth - x.scrollLeft > 1;
      We.value = B && W ? "both" : B ? "start" : W ? "end" : "";
    }
    let Ce = null;
    return le(
      Ke,
      (x) => {
        Ce?.disconnect(), Ce = null, $e(), !(!x || typeof ResizeObserver > "u") && (Ce = new ResizeObserver($e), Ce.observe(x));
      },
      { flush: "post" }
    ), le([o, V], $e, { flush: "post" }), we(() => Ce?.disconnect()), (x, B) => (u(), y("div", {
      class: ue(["dc-header", { "dc-header--panel": n.panel }])
    }, [
      $("div", Jl, [
        !n.panel && s.value.label && t.brand ? (u(), N(ce, {
          key: 0,
          class: "dc-header__domain",
          "data-dc-brand": "",
          title: "Home",
          href: b(a).homeHref(),
          onPress: B[0] || (B[0] = (W) => b(a).reset())
        }, {
          default: J(() => [
            $("span", Zl, [
              X(x.$slots, "brand", {
                label: s.value.label
              }, void 0, !0)
            ]),
            $("span", eo, P(s.value.label), 1)
          ]),
          _: 3
        }, 8, ["href"])) : !n.panel && s.value.label ? (u(), N(ce, {
          key: 1,
          class: "dc-header__domain",
          title: "Home",
          href: b(a).homeHref(),
          onPress: B[1] || (B[1] = (W) => b(a).reset())
        }, {
          default: J(() => [
            te(P(s.value.label), 1)
          ]),
          _: 1
        }, 8, ["href"])) : E("", !0),
        X(x.$slots, "lead", {}, void 0, !0),
        l.value.length ? (u(), y("span", to, [
          B[10] || (B[10] = $("span", { class: "dc-header__sr" }, "Within", -1)),
          (u(!0), y(z, null, Z(l.value, (W) => (u(), y("span", {
            key: `scope:${W.id}`,
            class: "dc-within dc-mono dc-truncate",
            title: d(W)
          }, P(d(W)), 9, no))), 128))
        ])) : E("", !0),
        $("div", ao, [
          $("div", {
            class: "dc-header__field",
            onMousedown: yt
          }, [
            $("div", {
              ref_key: "termBar",
              ref: Ke,
              class: "dc-header__terms",
              "data-dc-more": We.value,
              title: b(a).summary.value,
              onScroll: $e
            }, [
              (u(!0), y(z, null, Z(F.value, (W) => (u(), y(z, {
                key: W.key
              }, [
                $("span", lo, [
                  (u(!0), y(z, null, Z(W.entries, (D) => (u(), y(z, {
                    key: D.term.id
                  }, [
                    D.or ? (u(), y("span", oo, "or")) : E("", !0),
                    $("button", {
                      type: "button",
                      class: ue(["dc-term dc-mono", { "dc-term--idle": D.idle, "dc-term--leaving": m.value, "dc-term--type": D.term.facetKey === b(je) }]),
                      title: p(D),
                      "aria-label": `Remove ${d(D.term)}`,
                      onMousedown: B[2] || (B[2] = Se(() => {
                      }, ["prevent"])),
                      onClick: (Te) => ye(D.term, W.key === "before")
                    }, P(d(D.term)), 43, ro)
                  ], 64))), 128)),
                  W.key === "before" ? (u(!0), y(z, { key: 0 }, Z(w.value, (D) => (u(), y("span", {
                    key: D,
                    class: "dc-term dc-term--preview dc-mono",
                    "aria-hidden": "true"
                  }, P(D), 1))), 128)) : E("", !0)
                ]),
                W.key === "before" ? bt((u(), y("input", {
                  key: 0,
                  ref_for: !0,
                  ref: v,
                  "onUpdate:modelValue": B[3] || (B[3] = (D) => b(a).draft.value = D),
                  class: ue(["dc-header__search dc-mono", { "dc-header__search--between": ee.value }]),
                  style: ie({ "--dc-typed": String(Math.max(1, b(a).draft.value.length)) }),
                  type: "text",
                  autocomplete: "off",
                  spellcheck: "false",
                  placeholder: ee.value ? "" : "Filter…",
                  "aria-label": "Filter",
                  role: "combobox",
                  "aria-autocomplete": "list",
                  "aria-expanded": M.value,
                  "aria-controls": q,
                  "aria-activedescendant": M.value && g.value >= 0 ? K(g.value) : void 0,
                  onKeydown: [
                    Ne(Se(S, ["prevent"]), ["enter"]),
                    Ne(Se(k, ["prevent"]), ["esc"]),
                    B[4] || (B[4] = Ne((D) => I(D, 1), ["down"])),
                    B[5] || (B[5] = Ne((D) => I(D, -1), ["up"])),
                    be
                  ],
                  onFocus: B[6] || (B[6] = (D) => O.value = !0),
                  onInput: B[7] || (B[7] = (D) => O.value = !0),
                  onBlur: Ve
                }, null, 46, io)), [
                  [la, b(a).draft.value]
                ]) : E("", !0)
              ], 64))), 128))
            ], 40, so)
          ], 32)
        ])
      ]),
      Y(Kl, {
        id: q,
        open: M.value,
        anchor: h.value,
        "min-width": 0,
        "max-height": 320,
        class: "dc-completions",
        role: "listbox",
        "aria-label": "Completions",
        onClose: B[9] || (B[9] = (W) => O.value = !1)
      }, {
        default: J(() => [
          (u(!0), y(z, null, Z(_.value, (W, D) => (u(), y("div", {
            id: K(D),
            key: W.label,
            class: ue(["dc-completion", { "dc-completion--active": D === g.value }]),
            role: "option",
            "aria-selected": D === g.value,
            onMousedown: B[8] || (B[8] = Se(() => {
            }, ["prevent"])),
            onClick: (Te) => ae(W)
          }, [
            $("span", uo, P(W.label), 1),
            W.hint ? (u(), y("span", fo, P(W.hint), 1)) : E("", !0)
          ], 42, co))), 128))
        ]),
        _: 1
      }, 8, ["open", "anchor"]),
      t.actions ? (u(), y("div", vo, [
        X(x.$slots, "actions", {}, void 0, !0)
      ])) : E("", !0)
    ], 2));
  }
}), ln = /* @__PURE__ */ G(po, [["__scopeId", "data-v-3a764b58"]]), ho = ["checked", "indeterminate"], Da = /* @__PURE__ */ U({
  __name: "PageTick",
  setup(e) {
    const t = ne(), n = f(() => t.rows.value.filter((l) => t.isSelected(l)).length), a = f(
      () => t.rows.value.length > 0 && n.value === t.rows.value.length
    ), s = f(() => n.value > 0 && !a.value);
    return (l, o) => (u(), y("input", {
      class: "dc-tick",
      type: "checkbox",
      checked: a.value,
      indeterminate: s.value,
      "aria-label": "Select every row on this page",
      title: "Select every row on this page",
      onChange: o[0] || (o[0] = (r) => b(t).selectPage(!a.value))
    }, null, 40, ho));
  }
}), mo = { class: "dc-pick" }, yo = ["id"], go = ["id", "aria-expanded", "aria-labelledby", "data-dc-value"], _o = {
  key: 0,
  class: "dc-pick__icon",
  viewBox: "0 0 16 16",
  "aria-hidden": "true"
}, wo = ["d"], ko = { class: "dc-pick__label" }, bo = /* @__PURE__ */ U({
  __name: "PickControl",
  props: {
    modelValue: {},
    options: {},
    label: {},
    mono: { type: Boolean }
  },
  emits: ["update:modelValue", "open", "close"],
  setup(e, { emit: t }) {
    const n = e, a = t, s = Nt() ?? "dc-pick", l = R(null), o = R(null), r = R(null), i = R(!1), c = f(() => r.value !== null), d = R(null), p = f(
      () => n.options.find((_) => _.key === n.modelValue) ?? n.options[0]
    ), w = f(
      () => n.options.map((_) => ({
        id: _.key,
        label: _.label,
        icon: _.icon,
        checked: _.key === n.modelValue
      }))
    ), m = f(
      () => r.value ? { maxHeight: `${window.innerHeight - r.value.y - 8}px` } : void 0
    );
    function h(_) {
      const M = l.value?.getBoundingClientRect();
      M && (d.value = l.value?.closest(".dc-shell") ?? document.body, r.value = { x: M.left, y: M.bottom + 4, mirrorX: M.right }, i.value = _, a("open"));
    }
    function v(_) {
      r.value && a("close"), r.value = null, _ && l.value?.focus();
    }
    function k() {
      c.value ? v(!0) : h(!1);
    }
    function S(_) {
      _.key !== "ArrowDown" && _.key !== "ArrowUp" || c.value || (_.preventDefault(), h(!0));
    }
    function O(_) {
      const M = _.target;
      M && (l.value?.contains(M) || o.value?.root?.contains(M) || v(!1));
    }
    le(c, (_) => {
      _ ? window.addEventListener("pointerdown", O, !0) : window.removeEventListener("pointerdown", O, !0);
    }), we(() => window.removeEventListener("pointerdown", O, !0));
    function g(_) {
      v(!0), !(_.id === void 0 || _.id === n.modelValue) && a("update:modelValue", _.id);
    }
    return (_, M) => (u(), y("span", mo, [
      $("span", {
        id: `${b(s)}-name`,
        class: "dc-pick__name"
      }, P(e.label), 9, yo),
      $("button", {
        id: `${b(s)}-value`,
        ref_key: "trigger",
        ref: l,
        type: "button",
        class: ue(["dc-pick__button", { "dc-mono": e.mono }]),
        "aria-haspopup": "menu",
        "aria-expanded": c.value,
        "aria-labelledby": `${b(s)}-name ${b(s)}-value`,
        "data-dc-value": e.modelValue,
        onClick: k,
        onKeydown: S
      }, [
        p.value?.icon ? (u(), y("svg", _o, [
          $("path", {
            d: p.value.icon
          }, null, 8, wo)
        ])) : E("", !0),
        $("span", ko, P(p.value?.label), 1)
      ], 42, go),
      M[1] || (M[1] = $("svg", {
        class: "dc-pick__mark",
        viewBox: "0 0 16 16",
        "aria-hidden": "true"
      }, [
        $("path", { d: "M4 6l4 4 4-4" })
      ], -1)),
      r.value && d.value ? (u(), N(Ot, {
        key: 0,
        to: d.value
      }, [
        Y(b(us), {
          ref_key: "menu",
          ref: o,
          class: "dc-pick__list",
          style: ie(m.value),
          items: w.value,
          at: r.value,
          label: e.label,
          autofocus: i.value,
          onChoose: g,
          onDismiss: M[0] || (M[0] = (q) => v(!0))
        }, null, 8, ["style", "items", "at", "label", "autofocus"])
      ], 8, ["to"])) : E("", !0)
    ]));
  }
}), on = /* @__PURE__ */ G(bo, [["__scopeId", "data-v-0e31a711"]]), $o = {
  class: "dc-pager",
  "aria-label": "Pages"
}, xo = ["title"], So = ["value", "onKeydown"], Co = {
  class: "dc-pager__total",
  "aria-hidden": "true"
}, Po = {
  class: "dc-pager__sr",
  "aria-live": "polite"
}, Mo = /* @__PURE__ */ U({
  __name: "ShellPager",
  props: {
    pagesNote: {}
  },
  setup(e) {
    const t = e, n = ne(), a = f(() => n.liveQuery.value.page), s = f(
      () => `${n.counting.value ? "~" : ""}${ze(n.pageCount.value)}`
    ), l = f(() => {
      if (n.limit.value === 1) {
        const v = `Record ${ze(a.value)} of ${s.value}`;
        return t.pagesNote ? `${v}
${t.pagesNote}` : v;
      }
      let m = `Page ${ze(a.value)} of ${s.value}`;
      const h = n.rows.value.length;
      if (h) {
        const v = n.offset.value + 1, k = `${n.counting.value ? "~" : ""}${ze(n.total.value)}`;
        m += ` — rows ${ze(v)} to ${ze(v + h - 1)} of ${k}`;
      }
      return t.pagesNote ? `${m}
${t.pagesNote}` : m;
    }), o = R(null), r = f(() => o.value ?? String(a.value)), i = f(
      () => `calc(${Math.max(2, String(n.pageCount.value).length)}ch + 10px)`
    );
    function c(m) {
      m.target.select();
    }
    function d(m) {
      const h = m.target, v = h.value.replace(/[^0-9]/g, "");
      h.value !== v && (h.value = v), o.value = v;
    }
    function p(m) {
      const h = m.target, v = Number(o.value);
      o.value = null;
      const k = Number.isFinite(v) && v >= 1 ? Math.min(Math.trunc(v), Math.max(1, n.pageCount.value)) : a.value;
      h.value = String(k), k !== a.value && n.setPage(k);
    }
    function w(m) {
      const h = m.target;
      o.value = null, h.value = String(a.value), h.blur();
    }
    return (m, h) => (u(), y("nav", $o, [
      Y(ce, {
        class: "dc-pager__step",
        "aria-label": "Previous page",
        href: a.value > 1 ? b(n).hrefFor({ page: a.value - 1 }) : null,
        disabled: a.value <= 1,
        onPress: h[0] || (h[0] = (v) => b(n).setPage(a.value - 1))
      }, {
        default: J(() => [...h[2] || (h[2] = [
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
          style: ie({ width: i.value }),
          value: r.value,
          onFocus: c,
          onInput: d,
          onKeydown: [
            Ne(Se(p, ["prevent"]), ["enter"]),
            Ne(Se(w, ["prevent"]), ["esc"])
          ],
          onBlur: p
        }, null, 44, So),
        $("span", Co, "/ " + P(s.value), 1)
      ], 8, xo),
      $("span", Po, P(l.value), 1),
      Y(ce, {
        class: "dc-pager__step",
        "aria-label": "Next page",
        href: a.value < b(n).pageCount.value ? b(n).hrefFor({ page: a.value + 1 }) : null,
        disabled: a.value >= b(n).pageCount.value,
        onPress: h[1] || (h[1] = (v) => b(n).setPage(a.value + 1))
      }, {
        default: J(() => [...h[3] || (h[3] = [
          $("span", { "aria-hidden": "true" }, "›", -1)
        ])]),
        _: 1
      }, 8, ["href", "disabled"])
    ]));
  }
}), Eo = /* @__PURE__ */ G(Mo, [["__scopeId", "data-v-bdec7640"]]), Lo = {
  key: 0,
  class: "dc-actions__order"
}, To = {
  key: 1,
  class: "dc-actions__select"
}, Oo = {
  key: 0,
  class: "dc-actions__all"
}, Ao = {
  class: "dc-actions__count",
  "aria-live": "polite"
}, No = {
  key: 1,
  class: "dc-actions__count dc-actions__all",
  "aria-live": "polite"
}, Io = { class: "dc-actions__ops" }, Bo = ["disabled"], Ro = ["data-dc-operation", "disabled", "onClick"], Ho = ["disabled"], qo = /* @__PURE__ */ U({
  __name: "RecordActions",
  props: {
    views: {},
    selectionPlacement: {},
    pagesNote: {}
  },
  setup(e) {
    const t = e, n = ne(), a = f(() => Be(n.query.value.view, t.views)), s = f(
      () => (d.value || p.value) && a.value !== "table" && n.sorts.value.length > 0
    ), l = f(
      () => n.sorts.value.map((_) => ({ key: _.key, label: _.label }))
    ), o = f(() => s.value && l.value.length > 1), r = f(() => n.query.value.dir === "desc"), i = f(
      () => `Sorted by ${n.sort.value.label}, ${r.value ? "descending" : "ascending"}`
    ), c = f(() => n.entity.value), d = f(
      () => !wa(n.query.value, t.views) && a.value !== "record"
    ), p = f(() => a.value === "record" && n.query.value.entity !== null), w = f(
      () => (d.value || p.value) && !n.loading.value && (n.pageCount.value > 1 || !!t.pagesNote)
    ), m = f(() => n.selection.value.ids.length), h = f(
      () => d.value && n.selectable.value && (n.rows.value.length > 0 || m.value > 0)
    ), v = f(() => a.value === "table"), k = f(
      () => s.value || w.value || d.value && (h.value || !!(c.value?.create || c.value?.duplicate || c.value?.delete || c.value?.operations?.length))
    ), S = f(() => m.value ? `${m.value} selected` : v.value ? "" : "Select all"), O = f(() => t.selectionPlacement === "end");
    function g(_) {
      return m.value ? _.endsWith("…") ? `${_.slice(0, -1)} ${m.value}…` : `${_} ${m.value}` : _;
    }
    return (_, M) => k.value ? (u(), y("div", {
      key: 0,
      class: ue(["dc-actions", { "dc-actions--selection-end": O.value }])
    }, [
      s.value ? (u(), y("span", Lo, [
        o.value ? (u(), N(on, {
          key: 0,
          class: "dc-actions__pick dc-actions__sort",
          label: "Sort",
          "model-value": b(n).sort.value.key,
          options: l.value,
          "onUpdate:modelValue": b(n).setSort
        }, null, 8, ["model-value", "options", "onUpdate:modelValue"])) : E("", !0),
        Y(ce, {
          class: "dc-actions__dir",
          "aria-label": i.value,
          title: i.value,
          href: b(n).hrefFor({ dir: r.value ? "asc" : "desc" }),
          onPress: M[0] || (M[0] = (q) => b(n).toggleDirection())
        }, {
          default: J(() => [
            te(P(r.value ? "↓" : "↑"), 1)
          ]),
          _: 1
        }, 8, ["aria-label", "title", "href"])
      ])) : E("", !0),
      h.value && S.value ? (u(), y("div", To, [
        v.value ? (u(), y("span", No, P(S.value), 1)) : (u(), y("label", Oo, [
          Y(Da),
          $("span", Ao, P(S.value), 1)
        ])),
        m.value ? (u(), y("button", {
          key: 2,
          type: "button",
          class: ue(["dc-actions__clear", { "dc-actions__clear--op": O.value }]),
          onClick: M[1] || (M[1] = (q) => b(n).clearSelection())
        }, " Clear ", 2)) : E("", !0)
      ])) : E("", !0),
      $("div", Io, [
        c.value?.create ? (u(), N(ce, {
          key: 0,
          class: "dc-actions__op dc-actions__new",
          href: b(n).createHref?.(c.value),
          onPress: M[2] || (M[2] = (q) => b(n).create(c.value))
        }, {
          default: J(() => [
            M[5] || (M[5] = $("span", {
              class: "dc-actions__plus",
              "aria-hidden": "true"
            }, "+", -1)),
            te(" " + P(c.value.create), 1)
          ]),
          _: 1
        }, 8, ["href"])) : E("", !0),
        c.value?.duplicate ? (u(), y("button", {
          key: 1,
          type: "button",
          class: "dc-actions__op",
          disabled: !m.value,
          onClick: M[3] || (M[3] = (q) => b(n).duplicate())
        }, P(g(c.value.duplicate)), 9, Bo)) : E("", !0),
        (u(!0), y(z, null, Z(c.value?.operations ?? [], (q) => (u(), y("button", {
          key: q.key,
          type: "button",
          class: "dc-actions__op",
          "data-dc-operation": q.key,
          disabled: !m.value && q.selection !== !1,
          onClick: (ae) => b(n).operate(q.key)
        }, P(q.selection === !1 ? q.label : g(q.label)), 9, Ro))), 128)),
        c.value?.delete ? (u(), y("button", {
          key: 2,
          type: "button",
          class: "dc-actions__op dc-actions__danger",
          disabled: !m.value,
          onClick: M[4] || (M[4] = (q) => b(n).delete())
        }, P(g(c.value.delete)), 9, Ho)) : E("", !0)
      ]),
      w.value ? (u(), N(Eo, {
        key: 2,
        class: "dc-actions__pages",
        "pages-note": e.pagesNote
      }, null, 8, ["pages-note"])) : E("", !0)
    ], 2)) : E("", !0);
  }
}), kt = /* @__PURE__ */ G(qo, [["__scopeId", "data-v-95bd2f88"]]);
function Gn(e) {
  return Math.max(0, e.total - (e.kept ?? 0));
}
function Va(e) {
  const t = he(/* @__PURE__ */ new Map()), n = R(!0);
  let a = 0, s;
  const l = () => {
    a++, s?.abort(), s = void 0;
  }, o = () => {
    l();
    const r = a, { signal: i } = s = new AbortController(), c = e.query.value, d = e.schema.value, p = e.entities.value, w = e.within?.value.trim() ?? "";
    n.value = c.expr.trim() === "" && !w;
    const m = /* @__PURE__ */ new Map();
    let h = !0;
    for (const v of p) {
      const k = Oa(v, c.expr), S = w ? hn(w, k) : k;
      let O = !1;
      const g = (M) => {
        if (r !== a) return;
        if (h) {
          m.set(v.key, M);
          return;
        }
        const q = new Map(t.value);
        q.set(v.key, M), t.value = q;
      }, _ = e.source.value.query({
        query: { ...c, entity: v.key, expr: S, page: 1 },
        schema: d,
        entity: v,
        limit: 0,
        offset: 0,
        signal: i,
        progress: (M) => {
          O || g({ total: M, pending: !0, counted: !0 });
        }
      });
      _ instanceof Promise ? (m.has(v.key) || m.set(v.key, { total: 0, pending: !0, counted: !1 }), _.then((M) => {
        O = !0, g({ total: Gn(M), pending: !1, counted: !0 });
      })) : (O = !0, m.set(v.key, { total: Gn(_), pending: !1, counted: !0 }));
    }
    h = !1, t.value = m;
  };
  return sa() && Tt(l), { counts: t, pristine: n, refresh: o, cancel: l };
}
const Fo = {
  key: 1,
  class: "dc-show-as"
}, Do = {
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
}, Vo = ["d"], Ko = ["aria-expanded", "aria-controls", "aria-activedescendant", "placeholder"], Wo = ["id"], zo = ["id", "aria-selected", "onMousedown", "onMousemove"], jo = {
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
}, Uo = ["d"], Qo = { class: "dc-show-as__text" }, Go = { class: "dc-show-as__name" }, Yo = {
  key: 0,
  class: "dc-show-as__hint"
}, Xo = {
  class: "dc-show-as__check",
  "aria-hidden": "true"
}, Jo = {
  key: 0,
  class: "dc-show-as__none",
  role: "presentation"
}, Zo = "…", er = /* @__PURE__ */ U({
  __name: "RecordChoosers",
  props: {
    views: {},
    typeChooser: {},
    stacked: { type: Boolean },
    labels: {},
    hints: {}
  },
  setup(e) {
    const t = e, n = `dc-show-as-${Math.random().toString(36).slice(2, 8)}`, a = ne(), s = f(
      () => a.hasFacets.value || !!a.liveQuery.value.expr.trim() || !!a.within.value
    ), l = Va({
      source: a.source,
      schema: a.schema,
      // What each type holds of what is on screen, the draft's results included:
      // a count of the committed query would disagree with the rows under it.
      query: a.liveQuery,
      entities: a.entities,
      within: a.within
    });
    function o(T) {
      if (T.key === a.query.value.entity && s.value) return Re((a.matched ?? a.total).value);
      if (l.pristine.value) return rt(T);
      const F = l.counts.value.get(T.key);
      return F ? F.counted ? `${F.pending ? "~" : ""}${Re(F.total)}` : Zo : rt(T);
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
      const T = t.views ?? [...vn];
      return (t.stacked && T.includes("record") ? ["record", ...T.filter((F) => F !== "record")] : T).map((F) => ({
        key: F,
        label: t.labels?.[F] ?? (F === "record" ? a.recordView.value?.label ?? Vn.record : Vn[F]),
        icon: Gs[F],
        hint: t.hints?.[F]
      }));
    }), p = f(() => Be(a.query.value.view, t.views)), w = f(() => d.value.length > 1), m = f(() => w.value || i.value && !t.stacked);
    function h(T) {
      a.setView(T);
    }
    const v = R(null), k = R(!1), S = R(""), O = R(0), g = f(() => d.value.find((T) => T.key === p.value)), _ = f(() => {
      const T = S.value.trim().toLowerCase();
      return T ? d.value.filter(
        (V) => V.label.toLowerCase().includes(T) || !!V.hint?.toLowerCase().includes(T)
      ) : d.value;
    });
    function M() {
      k.value = !0, O.value = Math.max(0, _.value.findIndex((T) => T.key === p.value));
    }
    function q() {
      k.value = !1, S.value = "";
    }
    function ae() {
      k.value ? v.value?.blur() : v.value?.focus();
    }
    function I(T) {
      T !== p.value && h(T), v.value?.blur();
    }
    function K(T) {
      const V = _.value.length;
      if (T.key === "ArrowDown" || T.key === "ArrowUp") {
        if (T.preventDefault(), !k.value) {
          M();
          return;
        }
        V && (O.value = (O.value + (T.key === "ArrowDown" ? 1 : -1) + V) % V);
      } else if (T.key === "Enter") {
        T.preventDefault();
        const F = _.value[O.value];
        F && I(F.key);
      } else T.key === "Escape" && (T.preventDefault(), v.value?.blur());
    }
    return (T, V) => m.value ? (u(), y("div", {
      key: 0,
      class: ue(["dc-choosers", { "dc-choosers--stacked": e.stacked }])
    }, [
      i.value && !e.stacked ? (u(), N(on, {
        key: 0,
        class: "dc-actions__pick dc-actions__type",
        label: "Type",
        "model-value": b(a).query.value.entity ?? "",
        options: r.value,
        onOpen: b(l).refresh,
        onClose: b(l).cancel,
        "onUpdate:modelValue": c
      }, null, 8, ["model-value", "options", "onOpen", "onClose"])) : E("", !0),
      w.value && e.stacked ? (u(), y("div", Fo, [
        $("label", {
          for: n,
          class: "dc-show-as__label"
        }, [...V[2] || (V[2] = [
          te("Show as ", -1),
          $("span", { class: "dc-mono" }, "(u)", -1)
        ])]),
        $("div", {
          class: ue(["dc-show-as__field", { "dc-show-as__field--open": k.value }])
        }, [
          (u(), y("svg", Do, [
            $("path", {
              d: g.value?.icon
            }, null, 8, Vo)
          ])),
          bt($("input", {
            id: n,
            ref_key: "showBox",
            ref: v,
            "onUpdate:modelValue": V[0] || (V[0] = (F) => S.value = F),
            class: "dc-show-as__input",
            type: "text",
            role: "combobox",
            autocomplete: "off",
            spellcheck: "false",
            "aria-autocomplete": "list",
            "aria-expanded": k.value,
            "aria-controls": `${n}-list`,
            "aria-activedescendant": k.value && _.value.length ? `${n}-${_.value[O.value]?.key}` : void 0,
            placeholder: g.value?.label,
            onFocus: M,
            onBlur: q,
            onInput: V[1] || (V[1] = (F) => {
              O.value = 0, k.value = !0;
            }),
            onKeydown: K
          }, null, 40, Ko), [
            [la, S.value]
          ]),
          $("button", {
            type: "button",
            class: "dc-show-as__toggle",
            tabindex: "-1",
            "aria-label": "Open Show as",
            onMousedown: Se(ae, ["prevent"])
          }, [...V[3] || (V[3] = [
            $("span", {
              class: "dc-show-as__caret",
              "aria-hidden": "true"
            }, "▾", -1)
          ])], 32),
          k.value ? (u(), y("ul", {
            key: 0,
            id: `${n}-list`,
            class: "dc-show-as__list",
            role: "listbox",
            "aria-label": "Show as"
          }, [
            (u(!0), y(z, null, Z(_.value, (F, ee) => (u(), y("li", {
              id: `${n}-${F.key}`,
              key: F.key,
              class: ue(["dc-show-as__option", { "dc-show-as__option--active": ee === O.value, "dc-show-as__option--on": F.key === p.value }]),
              style: ie({ animationDelay: `${ee * 30}ms` }),
              role: "option",
              "aria-selected": F.key === p.value,
              onMousedown: Se((L) => I(F.key), ["prevent"]),
              onMousemove: (L) => O.value = ee
            }, [
              (u(), y("svg", jo, [
                $("path", {
                  d: F.icon
                }, null, 8, Uo)
              ])),
              $("span", Qo, [
                $("span", Go, P(F.label), 1),
                F.hint ? (u(), y("span", Yo, P(F.hint), 1)) : E("", !0)
              ]),
              $("span", Xo, P(F.key === p.value ? "✓" : ""), 1)
            ], 46, zo))), 128)),
            _.value.length ? E("", !0) : (u(), y("li", Jo, " No format matches “" + P(S.value) + "” ", 1))
          ], 8, Wo)) : E("", !0)
        ], 2)
      ])) : w.value ? (u(), N(on, {
        key: 2,
        class: "dc-actions__pick dc-actions__view",
        label: "View",
        "model-value": p.value,
        options: d.value,
        "onUpdate:modelValue": h
      }, null, 8, ["model-value", "options"])) : E("", !0)
    ], 2)) : E("", !0);
  }
}), Yn = /* @__PURE__ */ G(er, [["__scopeId", "data-v-4ca786a3"]]), tr = { class: "dc-types-panel__list" }, nr = ["id", "checked", "onChange"], ar = ["for"], sr = ["title", "onClick"], lr = { class: "dc-types-panel__count dc-mono" }, or = /* @__PURE__ */ U({
  __name: "ShellTypes",
  setup(e) {
    const t = ne();
    function n(m) {
      return ve(
        oe(m).map((h) => h.filter((v) => !(v.kind === "field" && v.field === "entity"))).filter((h) => h.length > 0)
      );
    }
    const a = f(() => {
      const m = oe(t.query.value.expr);
      return m.length !== 1 ? /* @__PURE__ */ new Set() : new Set(
        m[0].flatMap(
          (h) => h.kind === "field" && h.field === "entity" && h.negated ? [h.value.toLowerCase()] : []
        )
      );
    }), s = f(() => n(t.query.value.expr)), l = Va({
      source: t.source,
      schema: t.schema,
      query: f(() => ({ ...t.liveQuery.value, expr: n(t.liveQuery.value.expr) })),
      entities: t.entities,
      within: t.within
    });
    Ye(() => l.refresh()), le(() => [s.value, t.within.value, t.source.value], () => l.refresh());
    function o(m) {
      if (l.pristine.value) return rt(m);
      const h = l.counts.value.get(m.key);
      return h?.counted ? `${h.pending ? "~" : ""}${Re(h.total)}` : rt(m);
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
      const h = r.value.map((S) => S.key);
      if (m.length === 1) return { expr: s.value, entity: m[0] };
      const k = h.filter((S) => !m.includes(S)).map((S) => `-entity:${S}`).join(" ");
      return { expr: [s.value, k].filter(Boolean).join(" "), entity: null };
    }
    function d(m) {
      const h = r.value.filter((O) => i(O)).map((O) => O.key), v = h.includes(m.key) ? h.filter((O) => O !== m.key) : [...h, m.key];
      if (v.length === 0) return;
      const { expr: k, entity: S } = c(v);
      t.narrow(k, S);
    }
    function p(m) {
      const { expr: h, entity: v } = c([m.key]);
      t.narrow(h, v);
    }
    const w = `dc-types-${Math.random().toString(36).slice(2, 8)}`;
    return (m, h) => r.value.length > 1 ? (u(), y("section", {
      key: 0,
      class: "dc-types-panel",
      "aria-labelledby": w
    }, [
      $("h3", {
        id: w,
        class: "dc-types-panel__heading"
      }, " Types "),
      $("ul", tr, [
        (u(!0), y(z, null, Z(r.value, (v) => (u(), y("li", {
          key: v.key,
          class: "dc-types-panel__type"
        }, [
          $("input", {
            id: `${w}-${v.key}`,
            type: "checkbox",
            class: "dc-types-panel__box",
            checked: i(v),
            onChange: (k) => d(v)
          }, null, 40, nr),
          $("label", {
            for: `${w}-${v.key}`,
            class: "dc-types-panel__name"
          }, P(v.label), 9, ar),
          $("button", {
            type: "button",
            class: "dc-types-panel__only",
            title: `Only ${v.label}`,
            onClick: (k) => p(v)
          }, " only ", 8, sr),
          $("span", lr, P(o(v)), 1)
        ]))), 128))
      ])
    ])) : E("", !0);
  }
}), rr = /* @__PURE__ */ G(or, [["__scopeId", "data-v-32178b7f"]]);
function ir(e, t) {
  if (!e) return null;
  const n = de(e, t);
  return typeof n == "string" && n.trim() ? n : null;
}
const cr = (e) => e == null || typeof e == "string" && !e.trim();
function ur(e, t) {
  const n = pe(t, "state"), a = pe(t, "tint");
  return {
    identity: wt(pe(t, "identity"), e),
    reference: wt(pe(t, "reference"), e),
    metrics: ra(t, "metric").map((s) => ({
      column: s,
      label: s.label ?? "",
      text: Le(s, e)
    })),
    facts: t.filter((s) => s.cardLabel && !cr(de(s, e))).map((s) => ({
      column: s,
      label: s.cardLabel,
      title: [s.label, s.hint].filter(Boolean).join(" — "),
      text: Le(s, e)
    })),
    state: n ? de(n, e) ?? null : null,
    updated: wt(pe(t, "updated"), e),
    image: ir(pe(t, "image"), e),
    tint: a ? de(a, e) ?? null : null
  };
}
function Ka(e, t, n, a, s = !1) {
  const l = n?.columns ?? [];
  return {
    row: e,
    key: xs(e, t),
    entityLabel: e.entityLabel,
    entity: n,
    columns: l,
    ordinal: ms(t),
    parts: ur(e, l),
    pinned: a,
    selected: s
  };
}
function Fe() {
  const e = ne(), t = f(
    () => new Map(e.entities.value.map((n) => [n.key, n]))
  );
  return f(
    () => e.rows.value.map(
      (n, a) => Ka(
        n,
        e.offset.value + a,
        t.value.get(n.entityKey) ?? null,
        e.isPinned(n),
        e.isSelected(n)
      )
    )
  );
}
const dr = ["data-dc-status", "data-dc-tone"], fr = /* @__PURE__ */ U({
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
    }, P(n.value), 9, dr));
  }
}), Ge = /* @__PURE__ */ G(fr, [["__scopeId", "data-v-686eb9b6"]]), vr = { key: 1 }, pr = /* @__PURE__ */ U({
  __name: "MetricDrill",
  props: {
    entry: {},
    column: {}
  },
  setup(e) {
    const t = e, n = ne(), a = f(() => !t.entry.entity?.scope || !t.column.drill ? null : n.entities.value.find((p) => p.key === t.column.drill) ?? null), s = f(() => !!t.column.click), l = f(() => t.column.label ?? ""), o = f(() => Le(t.column, t.entry.row)), r = f(() => s.value ? t.column.clickHref?.(t.entry.row) ?? null : a.value ? n.drillHref(t.entry.row, a.value, t.column.drillWhere) : null), i = f(() => a.value && !s.value ? `${l.value} of ${t.entry.parts.identity} — show the ${a.value.label.toLowerCase()}` : `${l.value} of ${t.entry.parts.identity}`);
    function c(d, p) {
      p.stopPropagation(), s.value ? t.column.click?.(t.entry.row, d) : a.value && n.drill(t.entry.row, a.value, d, t.column.drillWhere);
    }
    return (d, p) => a.value || s.value ? (u(), N(ce, {
      key: 0,
      class: "dc-drill",
      href: r.value,
      title: i.value,
      onPress: c
    }, {
      default: J(() => [
        X(d.$slots, "default", {}, () => [
          te(P(o.value), 1)
        ], !0)
      ]),
      _: 3
    }, 8, ["href", "title"])) : (u(), y("span", vr, [
      X(d.$slots, "default", {}, () => [
        te(P(o.value), 1)
      ], !0)
    ]));
  }
}), pt = /* @__PURE__ */ G(pr, [["__scopeId", "data-v-bbbd334b"]]), hr = ["data-dc-active", "aria-pressed", "aria-label"], mr = /* @__PURE__ */ U({
  __name: "PinStar",
  props: {
    row: {},
    pinned: { type: Boolean },
    name: {}
  },
  setup(e) {
    const t = e, n = ne();
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
    }, P(e.pinned ? "★" : "☆"), 9, hr));
  }
}), $n = /* @__PURE__ */ G(mr, [["__scopeId", "data-v-ef63d763"]]), yr = ["src"], gr = /* @__PURE__ */ U({
  __name: "RowPicture",
  props: {
    src: {}
  },
  setup(e) {
    const t = e, n = R(!1);
    return le(
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
    }, null, 40, yr)) : E("", !0);
  }
}), Wt = /* @__PURE__ */ G(gr, [["__scopeId", "data-v-afaab300"]]), _r = ["data-dc-standing", "title", "aria-label"], wr = /* @__PURE__ */ U({
  __name: "QueryMark",
  props: {
    entry: {}
  },
  setup(e) {
    const t = e, n = ne(), a = f(() => Vt(t.entry.entity, t.entry.row)), s = f(() => kn(n.query.value.expr, a.value)), l = f(
      () => s.value === "in" ? `The query narrows to ${t.entry.parts.identity} — press to lift that` : `The query leaves out ${t.entry.parts.identity} — press to lift that`
    );
    function o(r) {
      r.stopPropagation(), n.setExpression(La(n.query.value.expr, a.value));
    }
    return (r, i) => s.value ? (u(), y("button", {
      key: 0,
      type: "button",
      class: "dc-standing",
      "data-dc-standing": s.value,
      title: l.value,
      "aria-label": l.value,
      onClick: o
    }, P(s.value === "in" ? "+" : "−"), 9, _r)) : E("", !0);
  }
}), xn = /* @__PURE__ */ G(wr, [["__scopeId", "data-v-4b8d4166"]]), kr = ["aria-label"], br = ["data-dc-standing", "data-dc-active", "aria-checked", "title", "aria-label", "onClick"], $r = /* @__PURE__ */ U({
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
    return (r, i) => (u(), y("span", {
      class: "dc-standing-control",
      role: "radiogroup",
      "aria-label": `Where the query stands on ${e.name}`
    }, [
      (u(!0), y(z, null, Z(s.value, (c) => (u(), y("button", {
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
      }, P(c.sign), 9, br))), 128))
    ], 8, kr));
  }
}), rn = /* @__PURE__ */ G($r, [["__scopeId", "data-v-5524dca6"]]), Wa = /* @__PURE__ */ U({
  __name: "RowStanding",
  props: {
    entry: {}
  },
  setup(e) {
    const t = e, n = ne(), a = f(() => Ca(t.entry.entity, t.entry.row)), s = f(() => kn(n.query.value.expr, a.value));
    function l(o) {
      n.setExpression(tn(n.query.value.expr, a.value, o));
    }
    return (o, r) => a.value !== null ? (u(), N(rn, {
      key: 0,
      class: "dc-row-standing",
      standing: s.value,
      name: e.entry.parts.identity,
      onSet: l
    }, null, 8, ["standing", "name"])) : E("", !0);
  }
}), xr = ["href", "title", "aria-label"], Sr = /* @__PURE__ */ U({
  __name: "OpenMark",
  props: {
    entry: {}
  },
  setup(e) {
    const t = e, n = ne(), a = f(() => {
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
      onClick: l[0] || (l[0] = Se(() => {
      }, ["stop"]))
    }, "↗", 8, xr)) : E("", !0);
  }
}), ht = /* @__PURE__ */ G(Sr, [["__scopeId", "data-v-b00f390d"]]), Cr = /* @__PURE__ */ U({
  __name: "ScopeMark",
  props: {
    entry: {}
  },
  setup(e) {
    const t = e, n = ne(), a = f(
      () => n.narrowsOnPress.value ? null : t.entry.entity?.scope ?? null
    ), s = R(null);
    function l(d) {
      s.value = ct(d).exclude ? "out" : "in";
    }
    function o(d) {
      l(d), window.addEventListener("keydown", l), window.addEventListener("keyup", l);
    }
    function r() {
      s.value = null, window.removeEventListener("keydown", l), window.removeEventListener("keyup", l);
    }
    we(r);
    const i = f(() => a.value ? n.drillHref(t.entry.row, null) : null);
    function c(d, p) {
      p.stopPropagation(), n.drill(t.entry.row, null, d);
    }
    return (d, p) => a.value ? (u(), N(ce, {
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
      default: J(() => [...p[0] || (p[0] = [
        te(" → ", -1)
      ])]),
      _: 1
    }, 8, ["href", "data-dc-pending", "title", "aria-label"])) : E("", !0);
  }
}), mt = /* @__PURE__ */ G(Cr, [["__scopeId", "data-v-05d2c233"]]), Pr = ["checked", "aria-label"], De = /* @__PURE__ */ U({
  __name: "SelectTick",
  props: {
    row: {},
    selected: { type: Boolean },
    name: {}
  },
  setup(e) {
    const t = e, n = ne();
    function a(s) {
      s.stopPropagation(), n.toggleSelect(t.row);
    }
    return (s, l) => (u(), y("input", {
      class: "dc-tick",
      type: "checkbox",
      checked: e.selected,
      "aria-label": `Select ${e.name}`,
      onClick: a
    }, null, 8, Pr));
  }
}), Mr = { class: "dc-card__top dc-mono" }, Er = { class: "dc-card__lead" }, Lr = {
  key: 2,
  class: "dc-card__entity"
}, Tr = { class: "dc-card__top-right" }, Or = { class: "dc-card__names" }, Ar = { class: "dc-card__primary" }, Nr = {
  key: 0,
  class: "dc-card__secondary dc-mono"
}, Ir = {
  key: 1,
  class: "dc-card__facts dc-mono"
}, Br = ["title"], Rr = { class: "dc-card__fact-label" }, Hr = {
  key: 0,
  class: "dc-card__metrics dc-mono"
}, qr = {
  key: 0,
  class: "dc-card__date"
}, Fr = /* @__PURE__ */ U({
  __name: "CardsView",
  setup(e) {
    const t = ne(), n = Fe(), a = f(() => t.isEverything.value), s = (o) => o.entity?.card === "picture", l = f(() => n.value.length > 0 && n.value.every(s));
    return (o, r) => (u(), y("div", {
      class: ue(["dc-cards", { "dc-cards--pictures": l.value }])
    }, [
      (u(!0), y(z, null, Z(b(n), (i) => (u(), y("div", {
        key: i.key,
        class: ue(["dc-card", { "dc-card--picture": s(i) }])
      }, [
        $("div", Mr, [
          $("span", Er, [
            b(t).selectable.value ? (u(), N(De, {
              key: 0,
              row: i.row,
              selected: i.selected,
              name: i.parts.identity
            }, null, 8, ["row", "selected", "name"])) : E("", !0),
            s(i) ? E("", !0) : (u(), y(z, { key: 1 }, [
              te(P(i.ordinal), 1)
            ], 64)),
            a.value ? (u(), y("span", Lr, P(i.entityLabel), 1)) : E("", !0)
          ]),
          $("span", Tr, [
            i.parts.state && !s(i) ? (u(), N(Ge, {
              key: 0,
              status: i.parts.state
            }, null, 8, ["status"])) : E("", !0),
            s(i) ? (u(), N(xn, {
              key: 1,
              entry: i
            }, null, 8, ["entry"])) : (u(), N(Wa, {
              key: 2,
              entry: i
            }, null, 8, ["entry"])),
            Y(mt, { entry: i }, null, 8, ["entry"]),
            Y(ht, { entry: i }, null, 8, ["entry"]),
            b(t).pinnable.value ? (u(), N($n, {
              key: 3,
              row: i.row,
              name: i.parts.identity,
              pinned: i.pinned
            }, null, 8, ["row", "name", "pinned"])) : E("", !0)
          ])
        ]),
        Y(ce, {
          class: "dc-card__open",
          href: b(t).pressHref(i.row),
          onPress: (c) => b(t).activate(i.row, c)
        }, {
          default: J(() => [
            i.parts.image ? (u(), N(Wt, {
              key: 0,
              class: "dc-card__image",
              src: i.parts.image
            }, null, 8, ["src"])) : E("", !0),
            $("span", Or, [
              $("span", Ar, P(i.parts.identity), 1),
              s(i) ? E("", !0) : (u(), y("span", Nr, P(i.parts.reference), 1)),
              i.parts.facts.length ? (u(), y("span", Ir, [
                (u(!0), y(z, null, Z(i.parts.facts, (c) => (u(), y("span", {
                  key: c.column.key ?? c.label,
                  class: "dc-card__fact",
                  title: c.title || void 0
                }, [
                  $("span", Rr, P(c.label), 1),
                  te(" " + P(c.text), 1)
                ], 8, Br))), 128))
              ])) : E("", !0)
            ])
          ]),
          _: 2
        }, 1032, ["href", "onPress"]),
        s(i) ? E("", !0) : (u(), y("div", Hr, [
          (u(!0), y(z, null, Z(i.parts.metrics.slice(0, 2), (c) => (u(), N(pt, {
            key: c.column.key ?? c.label,
            entry: i,
            column: c.column
          }, {
            default: J(() => [
              te(P(c.label) + " " + P(c.text), 1)
            ]),
            _: 2
          }, 1032, ["entry", "column"]))), 128)),
          i.parts.updated ? (u(), y("span", qr, P(i.parts.updated), 1)) : E("", !0)
        ]))
      ], 2))), 128))
    ], 2));
  }
}), za = /* @__PURE__ */ G(Fr, [["__scopeId", "data-v-fd252138"]]), Dr = { class: "dc-grid" }, Vr = { class: "dc-tile__scrim" }, Kr = { class: "dc-tile__top dc-mono" }, Wr = { class: "dc-tile__chip" }, zr = { class: "dc-tile__caption" }, jr = { class: "dc-tile__secondary dc-truncate" }, Ur = { class: "dc-tile__primary" }, Qr = /* @__PURE__ */ U({
  __name: "GridView",
  setup(e) {
    const t = ne(), n = Fe();
    return (a, s) => (u(), y("div", Dr, [
      (u(!0), y(z, null, Z(b(n), (l) => (u(), y("div", {
        key: l.key,
        class: "dc-grid__cell"
      }, [
        Y(ce, {
          class: "dc-tile",
          style: ie({ "--dc-tile-tint": l.parts.tint ?? void 0 }),
          href: b(t).pressHref(l.row),
          onPress: (o) => b(t).activate(l.row, o)
        }, {
          default: J(() => [
            l.parts.image ? (u(), N(Wt, {
              key: 0,
              class: "dc-tile__image",
              src: l.parts.image
            }, null, 8, ["src"])) : E("", !0),
            $("span", Vr, [
              $("span", Kr, [
                $("span", Wr, P(l.ordinal), 1)
              ]),
              $("span", zr, [
                $("span", jr, P(l.parts.reference), 1),
                $("span", Ur, P(l.parts.identity), 1)
              ])
            ])
          ]),
          _: 2
        }, 1032, ["style", "href", "onPress"]),
        b(t).selectable.value ? (u(), N(De, {
          key: 0,
          class: "dc-grid__tick",
          row: l.row,
          selected: l.selected,
          name: l.parts.identity
        }, null, 8, ["row", "selected", "name"])) : E("", !0)
      ]))), 128))
    ]));
  }
}), ja = /* @__PURE__ */ G(Qr, [["__scopeId", "data-v-89c40a9e"]]);
function Xn(e, t, n, a) {
  return (n - a * (t - 1)) / e;
}
function Jt(e, t) {
  return e > 0 ? Math.min(t, e) : t;
}
function Gr(e) {
  return e > 0 ? e : 1 / 0;
}
function Yr(e, t, n) {
  const { width: a, height: s, gap: l = 0 } = n;
  if (!e.length) return [];
  if (!(a > 0) || !(s > 0)) return [{ items: [...e], height: s, filled: !1 }];
  const o = [];
  let r = [], i = 0, c = 0;
  for (const d of e) {
    const p = t(d), w = Math.max(p.ratio, Number.EPSILON), m = p.height && p.height > 0 ? Math.max(c, p.height) : c, h = Jt(m, s), v = Xn(i + w, r.length + 1, a, l);
    if (v > h) {
      r.push(d), i += w, c = m;
      continue;
    }
    const k = Jt(c, s), S = r.length ? Xn(i, r.length, a, l) : 1 / 0;
    S <= Gr(c) && S - k < h - v ? (o.push({ items: r, height: S, filled: !0 }), r = [d], i = w, c = p.height && p.height > 0 ? p.height : 0) : (o.push({ items: [...r, d], height: v, filled: !0 }), r = [], i = 0, c = 0);
  }
  return r.length && o.push({ items: r, height: Jt(c, s), filled: !1 }), o;
}
const Xr = { class: "dc-images" }, Jr = {
  key: 1,
  class: "dc-images__blank",
  "aria-hidden": "true"
}, Zr = 240, gt = 8, ei = 1, ti = /* @__PURE__ */ U({
  __name: "ImagesView",
  setup(e) {
    const t = ne(), n = Fe(), a = Pn(/* @__PURE__ */ new Map()), s = Pn(/* @__PURE__ */ new Set());
    function l(h, v) {
      const k = v.target;
      k.naturalWidth > 0 && k.naturalHeight > 0 && a.set(h, { width: k.naturalWidth, height: k.naturalHeight });
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
      return v ? { ratio: v.width / v.height, height: v.height } : { ratio: ei };
    }
    const c = R(null), d = R(0);
    let p = null;
    function w() {
      d.value = c.value?.clientWidth ?? 0;
    }
    Ye(() => {
      w(), !(!c.value || typeof ResizeObserver > "u") && (p = new ResizeObserver(w), p.observe(c.value));
    }), we(() => {
      p?.disconnect(), p = null;
    });
    const m = f(() => {
      const h = Yr(n.value, i, {
        width: d.value,
        height: Zr,
        gap: gt
      }), v = [];
      let k = 0;
      for (const S of h) {
        let O = 0;
        for (const g of S.items) {
          const _ = i(g).ratio * S.height, M = r(g), q = M !== void 0 && M.height < S.height;
          v.push({
            entry: g,
            style: {
              top: `${k}px`,
              left: `${O}px`,
              width: `${_}px`,
              height: `${S.height}px`
            },
            picture: q ? { width: `${M.width}px`, height: `${M.height}px` } : { width: "100%", height: "100%" }
          }), O += _ + gt;
        }
        k += S.height + gt;
      }
      return { boxes: v, height: h.length ? k - gt : 0 };
    });
    return (h, v) => (u(), y("div", Xr, [
      $("div", {
        ref_key: "wall",
        ref: c,
        class: "dc-images__wall",
        style: ie({ height: `${m.value.height}px` })
      }, [
        (u(!0), y(z, null, Z(m.value.boxes, ({ entry: k, style: S, picture: O }) => (u(), y("div", {
          key: k.key,
          class: "dc-images__cell",
          style: ie(S)
        }, [
          Y(ce, {
            class: "dc-images__open",
            title: k.parts.identity,
            "aria-label": k.parts.identity,
            href: b(t).pressHref(k.row),
            onPress: (g) => b(t).activate(k.row, g)
          }, {
            default: J(() => [
              o(k) ? (u(), N(Wt, {
                key: 0,
                class: "dc-images__picture",
                style: ie(O),
                src: o(k),
                onLoad: (g) => l(o(k), g),
                onError: (g) => s.add(o(k))
              }, null, 8, ["style", "src", "onLoad", "onError"])) : (u(), y("span", Jr, P(k.parts.identity), 1))
            ]),
            _: 2
          }, 1032, ["title", "aria-label", "href", "onPress"]),
          b(t).selectable.value ? (u(), N(De, {
            key: 0,
            class: "dc-images__tick",
            row: k.row,
            selected: k.selected,
            name: k.parts.identity
          }, null, 8, ["row", "selected", "name"])) : E("", !0)
        ], 4))), 128))
      ], 4)
    ]));
  }
}), Ua = /* @__PURE__ */ G(ti, [["__scopeId", "data-v-2d267370"]]), ni = { class: "dc-links" }, ai = { class: "dc-link__primary dc-truncate" }, si = { class: "dc-link__secondary dc-mono dc-truncate" }, li = /* @__PURE__ */ U({
  __name: "LinksView",
  setup(e) {
    const t = ne(), n = Fe();
    return (a, s) => (u(), y("div", ni, [
      (u(!0), y(z, null, Z(b(n), (l) => (u(), y("span", {
        key: l.key,
        class: "dc-links__item"
      }, [
        b(t).selectable.value ? (u(), N(De, {
          key: 0,
          row: l.row,
          selected: l.selected,
          name: l.parts.identity
        }, null, 8, ["row", "selected", "name"])) : E("", !0),
        Y(ce, {
          class: "dc-link",
          href: b(t).pressHref(l.row),
          onPress: (o) => b(t).activate(l.row, o)
        }, {
          default: J(() => [
            $("span", ai, P(l.parts.identity), 1),
            $("span", si, P(l.parts.reference), 1)
          ]),
          _: 2
        }, 1032, ["href", "onPress"])
      ]))), 128))
    ]));
  }
}), Qa = /* @__PURE__ */ G(li, [["__scopeId", "data-v-de6c9a0f"]]), oi = {
  class: "dc-list",
  role: "list"
}, ri = { class: "dc-list__ordinal dc-mono" }, ii = { class: "dc-list__identity" }, ci = ["title"], ui = ["title"], di = {
  key: 1,
  class: "dc-list__entity dc-mono"
}, fi = { class: "dc-list__metrics dc-mono" }, vi = { class: "dc-list__trailing" }, pi = /* @__PURE__ */ U({
  __name: "ListView",
  setup(e) {
    const t = ne(), n = Fe(), a = f(() => t.isEverything.value);
    return (s, l) => (u(), y("div", oi, [
      (u(!0), y(z, null, Z(b(n), (o) => (u(), y("div", {
        key: o.key,
        class: "dc-list__row",
        role: "listitem"
      }, [
        b(t).selectable.value ? (u(), N(De, {
          key: 0,
          class: "dc-list__tick",
          row: o.row,
          selected: o.selected,
          name: o.parts.identity
        }, null, 8, ["row", "selected", "name"])) : E("", !0),
        Y(Wa, {
          class: "dc-list__standing",
          entry: o
        }, null, 8, ["entry"]),
        Y(ce, {
          class: "dc-list__open",
          href: b(t).pressHref(o.row),
          onPress: (r) => b(t).activate(o.row, r)
        }, {
          default: J(() => [
            $("span", ri, P(o.ordinal), 1),
            $("span", ii, [
              $("span", {
                class: "dc-list__primary dc-truncate",
                title: o.parts.identity
              }, P(o.parts.identity), 9, ci),
              $("span", {
                class: "dc-list__secondary dc-mono dc-truncate",
                title: o.parts.reference || void 0
              }, P(o.parts.reference), 9, ui)
            ])
          ]),
          _: 2
        }, 1032, ["href", "onPress"]),
        a.value ? (u(), y("span", di, P(o.entityLabel), 1)) : E("", !0),
        $("span", fi, [
          (u(!0), y(z, null, Z(o.parts.metrics.slice(0, 2), (r) => (u(), N(pt, {
            key: r.column.key ?? r.label,
            entry: o,
            column: r.column
          }, null, 8, ["entry", "column"]))), 128))
        ]),
        $("span", vi, [
          o.parts.state ? (u(), N(Ge, {
            key: 0,
            status: o.parts.state
          }, null, 8, ["status"])) : E("", !0),
          Y(mt, { entry: o }, null, 8, ["entry"]),
          Y(ht, { entry: o }, null, 8, ["entry"]),
          b(t).pinnable.value ? (u(), N($n, {
            key: 1,
            row: o.row,
            name: o.parts.identity,
            pinned: o.pinned
          }, null, 8, ["row", "name", "pinned"])) : E("", !0)
        ])
      ]))), 128))
    ]));
  }
}), cn = /* @__PURE__ */ G(pi, [["__scopeId", "data-v-a2cb9c3f"]]), hi = { class: "dc-preview" }, mi = { class: "dc-preview__pager dc-mono" }, yi = ["disabled"], gi = { "aria-live": "polite" }, _i = ["disabled"], wi = {
  key: 0,
  class: "dc-preview__card"
}, ki = ["src"], bi = { class: "dc-preview__body" }, $i = { class: "dc-preview__top" }, xi = { class: "dc-preview__badges" }, Si = { class: "dc-preview__entity dc-mono" }, Ci = { class: "dc-preview__marks" }, Pi = { class: "dc-preview__primary" }, Mi = { class: "dc-preview__secondary dc-mono" }, Ei = { class: "dc-preview__fields" }, Li = { class: "dc-preview__key" }, Ti = { class: "dc-preview__value dc-mono" }, Oi = /* @__PURE__ */ U({
  __name: "PreviewView",
  setup(e) {
    const t = ne(), n = Fe(), a = R(0);
    le(n, (i) => {
      a.value > i.length - 1 && (a.value = Math.max(0, i.length - 1));
    });
    const s = f(() => n.value[a.value]), l = f(() => {
      const i = s.value;
      if (!i) return [];
      const c = pe(i.columns, "reference"), d = pe(i.columns, "updated");
      return [
        ...c ? [{ key: c.label ?? "Reference", value: i.parts.reference, column: null }] : [],
        ...i.parts.metrics.map((p) => ({
          key: p.label,
          value: p.text,
          column: p.column
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
    return (i, c) => (u(), y("div", hi, [
      $("div", mi, [
        $("button", {
          type: "button",
          class: "dc-preview__step",
          "aria-label": "Previous result",
          disabled: a.value === 0,
          onClick: c[0] || (c[0] = (d) => r(-1))
        }, " ‹ ", 8, yi),
        $("span", gi, P(o.value), 1),
        $("button", {
          type: "button",
          class: "dc-preview__step",
          "aria-label": "Next result",
          disabled: a.value >= b(n).length - 1,
          onClick: c[1] || (c[1] = (d) => r(1))
        }, " › ", 8, _i)
      ]),
      s.value ? (u(), y("div", wi, [
        $("div", {
          class: "dc-preview__media",
          style: ie({ background: s.value.parts.tint ?? void 0 }),
          "aria-hidden": "true"
        }, [
          s.value.parts.image ? (u(), y("img", {
            key: 0,
            class: "dc-preview__image",
            src: s.value.parts.image,
            alt: ""
          }, null, 8, ki)) : (u(), y(z, { key: 1 }, [
            te(" preview ")
          ], 64))
        ], 4),
        $("div", bi, [
          $("div", $i, [
            $("span", xi, [
              b(t).selectable.value ? (u(), N(De, {
                key: 0,
                row: s.value.row,
                selected: s.value.selected,
                name: s.value.parts.identity
              }, null, 8, ["row", "selected", "name"])) : E("", !0),
              s.value.parts.state ? (u(), N(Ge, {
                key: 1,
                status: s.value.parts.state
              }, null, 8, ["status"])) : E("", !0),
              $("span", Si, P(s.value.entityLabel), 1)
            ]),
            $("span", Ci, [
              Y(xn, { entry: s.value }, null, 8, ["entry"]),
              Y(mt, { entry: s.value }, null, 8, ["entry"]),
              Y(ht, { entry: s.value }, null, 8, ["entry"]),
              b(t).pinnable.value ? (u(), N($n, {
                key: 0,
                row: s.value.row,
                name: s.value.parts.identity,
                pinned: s.value.pinned
              }, null, 8, ["row", "name", "pinned"])) : E("", !0)
            ])
          ]),
          $("div", null, [
            $("div", Pi, P(s.value.parts.identity), 1),
            $("div", Mi, P(s.value.parts.reference), 1)
          ]),
          $("dl", Ei, [
            (u(!0), y(z, null, Z(l.value, (d) => (u(), y("div", {
              key: d.key,
              class: "dc-preview__field"
            }, [
              $("dt", Li, P(d.key), 1),
              $("dd", Ti, [
                d.column && s.value ? (u(), N(pt, {
                  key: 0,
                  entry: s.value,
                  column: d.column
                }, null, 8, ["entry", "column"])) : (u(), y(z, { key: 1 }, [
                  te(P(d.value), 1)
                ], 64))
              ])
            ]))), 128))
          ]),
          Y(ce, {
            class: "dc-preview__open",
            href: s.value ? b(t).pressHref(s.value.row) : null,
            onPress: c[2] || (c[2] = (d) => s.value && b(t).activate(s.value.row, d))
          }, {
            default: J(() => [...c[3] || (c[3] = [
              te(" Open record → ", -1)
            ])]),
            _: 1
          }, 8, ["href"])
        ])
      ])) : E("", !0)
    ]));
  }
}), Ga = /* @__PURE__ */ G(Oi, [["__scopeId", "data-v-59e0d33b"]]);
function Ai(e) {
  const t = oe(e);
  if (t.length !== 1) return /* @__PURE__ */ new Set();
  const n = /* @__PURE__ */ new Map();
  for (const a of t[0]) {
    if (a.kind !== "field" || a.negated || Ue(a) || a.comparator !== "=" && a.comparator !== ":") continue;
    const s = a.field.toLowerCase();
    n.set(s, [...n.get(s) ?? [], a]);
  }
  return new Set(
    [...n].flatMap(
      ([a, s]) => s.length === 1 && s[0].comparator === "=" ? [a] : []
    )
  );
}
function Ni(e, t, n) {
  const a = Ai(t);
  return a.size ? e.filter((s) => {
    const l = (s.key ?? s.field)?.toLowerCase();
    return l === void 0 || !a.has(l) || s.role === "identity" || n.some((o) => Array.isArray(de(s, o))) ? !0 : new Set(n.map((o) => Le(s, o))).size > 1;
  }) : e;
}
function Ii() {
  const e = ne();
  return f(
    () => Ni(
      bs(e.schema.value, e.entity.value),
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
function Ya(e, t) {
  const n = e.narrowsOnPress.value ? Vt(t.entity, t.row) : null;
  return n ? { term: n, name: t.parts.identity, alone: t.entity?.narrowsAlone === !0 } : null;
}
const Bi = /* @__PURE__ */ U({
  __name: "CellNarrow",
  props: {
    entry: {},
    column: {},
    narrowings: {},
    truncates: { type: Boolean }
  },
  setup(e) {
    const t = e, n = ne(), a = f(() => Le(t.column, t.entry.row));
    function s(p, w = !1) {
      return p.entity !== void 0 ? `entity:${p.entity}` : _e({ ...p.term, ...w ? { negated: !0 } : {} });
    }
    function l(p, w = !1) {
      return p.entity !== void 0 ? n.query.value.expr : ot(n.query.value.expr, s(p, w));
    }
    function o(p) {
      return p.entity ?? n.query.value.entity;
    }
    function r(p) {
      return n.narrowHref(l(p), o(p));
    }
    function i(p) {
      return p.entity !== void 0 ? `Show ${n.schema.value.entities.find((m) => m.key === p.entity)?.label ?? a.value} only` : `Narrow to ${s(p)}
⌥-press to leave these out`;
    }
    function c(p) {
      return p.entity !== void 0 ? null : { term: s(p) };
    }
    function d(p, w, m) {
      m.stopPropagation(), n.narrow(l(p, w.exclude), o(p));
    }
    return (p, w) => (u(), y("span", {
      class: ue(["dc-cell__text", { "dc-truncate": e.truncates }])
    }, [
      (u(!0), y(z, null, Z(e.narrowings, (m, h) => (u(), y(z, {
        key: s(m)
      }, [
        h > 0 ? (u(), y(z, { key: 0 }, [
          te(", ")
        ], 64)) : E("", !0),
        Y(ce, Ie({
          class: "dc-narrow",
          href: r(m),
          title: i(m),
          selectable: ""
        }, fn(b(Sn)(b(n), c(m))), {
          onPress: (v, k) => d(m, v, k)
        }), {
          default: J(() => [
            X(p.$slots, "default", {}, () => [
              te(P(m.label ?? a.value), 1)
            ], !0)
          ]),
          _: 2
        }, 1040, ["href", "title", "onPress"])
      ], 64))), 128))
    ], 2));
  }
}), Jn = /* @__PURE__ */ G(Bi, [["__scopeId", "data-v-6e649daa"]]), Ri = /* @__PURE__ */ new Set(["entitykey", "entitylabel"]), Hi = /* @__PURE__ */ new Set(["ordinal", "image", "component", "date"]), qi = 4;
function Xa(e) {
  return (e.field ?? e.key)?.toLowerCase();
}
function Ja(e) {
  return e.narrow === !1 || e.role === "identity" || e.activate || e.click || e.drill ? !1 : !Hi.has(e.kind ?? "text") && Xa(e) !== void 0;
}
function Fi(e, t) {
  if (Number.isInteger(e)) return e;
  const n = 10 ** qi;
  return (t ? Math.ceil(e * n - 1e-6) : Math.floor(e * n + 1e-6)) / n;
}
function Di(e, t) {
  let n = 1 / 0, a = -1 / 0;
  for (const s of t) {
    const l = de(e, s);
    typeof l != "number" || !Number.isFinite(l) || (l < n && (n = l), l > a && (a = l));
  }
  return n <= a ? { min: n, max: a } : null;
}
function Vi(e, t, n, a = null) {
  if (!Ja(e)) return [];
  const s = Xa(e);
  if (Ri.has(s) && !e.value)
    return t.entityKey ? [{ label: null, entity: t.entityKey }] : [];
  if (e.flags)
    return Object.entries(e.flags).filter(([i]) => t.fields[i] === !0).map(([i, c]) => ({
      label: c,
      term: { kind: "field", field: i.toLowerCase(), comparator: ":", value: "true" }
    }));
  const l = de(e, t), o = n?.facets.find((i) => i.key.toLowerCase() === s);
  if (typeof l == "number") {
    if (!Number.isFinite(l)) return [];
    const i = o?.kind === "range" ? { min: o.min, max: o.max } : a, c = e.narrow === "<=" || e.narrow !== ">=" && (!i || l - i.min <= i.max - l);
    return [{
      label: null,
      term: { kind: "field", field: s, comparator: c ? "<=" : ">=", value: String(Fi(l, c)) }
    }];
  }
  return (Array.isArray(l) ? l : [l]).filter(
    (i) => typeof i == "string" && i !== ""
  ).map((i) => ({
    label: Array.isArray(l) ? i : null,
    term: { kind: "field", field: s, comparator: "=", value: i }
  }));
}
const Zn = /* @__PURE__ */ new WeakMap();
function Ki(e, t) {
  let n = Zn.get(e);
  return n || Zn.set(e, n = /* @__PURE__ */ new Map()), n.has(t) || n.set(t, Di(t, e)), n.get(t);
}
const Wi = /* @__PURE__ */ U({
  __name: "ColumnCell",
  props: {
    column: {},
    entry: {}
  },
  setup(e) {
    const t = e, n = ne(), a = f(() => t.column.kind ?? "text"), s = f(() => de(t.column, t.entry.row)), l = f(
      () => a.value === "ordinal" ? t.entry.ordinal : Le(t.column, t.entry.row)
    ), o = f(() => s.value), r = f(() => t.column.activate === !0 || !!t.column.click), i = f(() => Zt(t.column)), c = f(() => ia(t.column, t.entry.row)), d = f(() => {
      if (!Ja(t.column)) return [];
      const h = typeof s.value == "number" ? Ki(n.rows.value, t.column) : null;
      return Vi(t.column, t.entry.row, t.entry.entity ?? null, h);
    });
    function p(h) {
      r.value && (h.stopPropagation(), w(ct(h)));
    }
    function w(h) {
      t.column.click?.(t.entry.row, h), t.column.activate && n.activate(t.entry.row, h);
    }
    const m = f(() => t.column.click ? t.column.clickHref?.(t.entry.row) ?? null : t.column.activate ? n.pressHref(t.entry.row) : null);
    return (h, v) => a.value === "component" && e.column.component ? (u(), N(at(e.column.component), {
      key: 0,
      row: e.entry.row,
      entry: e.entry,
      value: s.value,
      column: e.column
    }, null, 8, ["row", "entry", "value", "column"])) : a.value === "status" && d.value.length ? (u(), N(Jn, {
      key: 1,
      entry: e.entry,
      column: e.column,
      narrowings: d.value,
      truncates: !1
    }, {
      default: J(() => [
        Y(Ge, { status: o.value }, null, 8, ["status"])
      ]),
      _: 1
    }, 8, ["entry", "column", "narrowings"])) : a.value === "status" ? (u(), N(Ge, {
      key: 2,
      status: o.value
    }, null, 8, ["status"])) : a.value === "image" ? (u(), N(Wt, {
      key: 3,
      class: "dc-cell__image",
      src: typeof s.value == "string" ? s.value : "",
      style: ie({ maxHeight: e.column.height }),
      onClick: p
    }, null, 8, ["src", "style"])) : e.column.drill || e.column.click && e.column.role === "metric" ? (u(), N(pt, {
      key: 4,
      entry: e.entry,
      column: e.column
    }, null, 8, ["entry", "column"])) : r.value ? (u(), N(ce, Ie({
      key: 5,
      class: ["dc-table__open", { "dc-truncate": i.value }],
      href: m.value,
      title: c.value
    }, fn(e.column.activate ? b(Sn)(b(n), b(Ya)(b(n), e.entry)) : {}), {
      onPress: v[0] || (v[0] = (k, S) => {
        S.stopPropagation(), w(k);
      })
    }), {
      default: J(() => [
        te(P(l.value), 1)
      ]),
      _: 1
    }, 16, ["class", "href", "title"])) : d.value.length ? (u(), N(Jn, {
      key: 6,
      entry: e.entry,
      column: e.column,
      narrowings: d.value,
      truncates: i.value
    }, null, 8, ["entry", "column", "narrowings", "truncates"])) : (u(), y("span", {
      key: 7,
      class: ue(["dc-cell__text", { "dc-truncate": i.value }])
    }, P(l.value), 3));
  }
}), ea = /* @__PURE__ */ G(Wi, [["__scopeId", "data-v-d07057a1"]]), zi = {
  key: 0,
  class: "dc-table__none"
}, ji = { class: "dc-table__detail" }, Ui = ["data-dc-wrap", "data-dc-row-links"], Qi = { "data-dc-stuck": "" }, Gi = {
  key: 0,
  class: "dc-table__pick",
  scope: "col"
}, Yi = {
  key: 1,
  class: "dc-table__standing",
  scope: "col"
}, Xi = ["data-dc-align", "data-dc-hide", "aria-sort", "title"], Ji = {
  key: 2,
  class: "dc-table__head"
}, Zi = { "data-dc-scroll": "" }, ec = ["onClick"], tc = {
  key: 0,
  class: "dc-table__pick"
}, nc = {
  key: 1,
  class: "dc-table__standing"
}, ac = ["data-dc-align", "data-dc-hide", "title"], sc = {
  key: 1,
  class: "dc-table__name"
}, lc = /* @__PURE__ */ U({
  __name: "TableView",
  setup(e) {
    const t = ne(), n = Fe(), a = Ii();
    function s(L, Q) {
      if (!t.rowLinks?.value || Ta()) return;
      const A = t.pressHref(L);
      if (A && an(Q)) {
        nn(A, Q);
        return;
      }
      t.activate(L, ct(Q));
    }
    const l = f(() => t.rowLinks?.value ? new Map(n.value.map((L) => [L.key, t.pressHref(L.row)])) : /* @__PURE__ */ new Map()), o = f(
      () => a.value.find((L) => L.role === "identity") ?? a.value[0]
    );
    function r(L, Q, A) {
      A.stopPropagation(), t.activate(L, Q);
    }
    function i(L) {
      const Q = va(L, t.entity.value, t.schema.value), A = Q ? `Shortcut: ${Q}` : void 0;
      return [L.hint, A].filter(Boolean).join(`
`) || void 0;
    }
    const c = f(() => {
      const L = a.value.find((A) => A.scope);
      return L || ((t.entity.value ? !!t.entity.value.href : t.entities.value.some((A) => A.href)) ? a.value.find((A) => A.activate) : void 0);
    }), d = f(() => {
      const L = (Q) => !!Q.scope && Q.standing !== !1;
      return t.entity.value ? L(t.entity.value) : t.entities.value.some(L);
    }), p = (L) => Ca(L.entity, L.row), w = (L) => kn(t.query.value.expr, p(L));
    function m(L, Q) {
      t.setExpression(tn(t.query.value.expr, p(L), Q));
    }
    const h = f(() => {
      const L = n.value.filter((A) => p(A) !== null), Q = L.filter((A) => A.selected);
      return Q.length ? Q : L;
    }), v = f(() => h.value.some((L) => L.selected)), k = f(() => {
      const L = h.value[0];
      return L ? w(L) : null;
    }), S = f(
      () => h.value.some((L) => w(L) !== k.value)
    ), O = f(
      () => v.value ? "the ticked rows" : "every row on this page"
    );
    function g(L) {
      t.setExpression(
        h.value.reduce(
          (Q, A) => tn(Q, p(A), L),
          t.query.value.expr
        )
      );
    }
    const _ = f(
      () => a.value.some((L) => L.kind === "image" || L.height !== void 0)
    );
    function M(L) {
      L && (t.query.value.sort === L ? t.toggleDirection() : t.setSort(L));
    }
    function q(L) {
      return L ? t.query.value.sort === L ? t.hrefFor({ dir: t.query.value.dir === "desc" ? "asc" : "desc" }) : t.hrefFor({ sort: L }) : null;
    }
    const ae = f(() => t.entity.value?.label ?? "The result set"), I = f(() => new Set(t.sorts.value.map((L) => L.key))), K = (L) => L.sort !== void 0 && I.value.has(L.sort), T = (L) => {
      if (K(L))
        return t.query.value.sort !== L.sort ? "none" : t.query.value.dir === "desc" ? "descending" : "ascending";
    };
    function V(L) {
      return [
        An(L),
        L.muted ? "dc-table__muted" : "",
        L.mono ? "dc-mono" : "",
        Zt(L) ? "dc-truncate" : ""
      ].filter(Boolean).join(" ");
    }
    function F(L, Q) {
      if (!(!Zt(L) || L.activate || L.click))
        return ia(L, Q.row);
    }
    const ee = f(
      () => a.value.length + (t.selectable.value ? 1 : 0) + (d.value ? 1 : 0)
    );
    return (L, Q) => b(a).length ? (u(), y("table", {
      key: 1,
      class: "dc-table",
      "data-dc-wrap": _.value ? "" : void 0,
      "data-dc-row-links": b(t).rowLinks?.value ? "" : void 0,
      style: ie({ "--dc-table-tracks": ee.value })
    }, [
      $("thead", Qi, [
        $("tr", null, [
          b(t).selectable.value ? (u(), y("th", Gi, [
            Y(Da)
          ])) : E("", !0),
          d.value ? (u(), y("th", Yi, [
            h.value.length ? (u(), N(rn, {
              key: 0,
              standing: k.value,
              mixed: S.value,
              name: O.value,
              onSet: g
            }, null, 8, ["standing", "mixed", "name"])) : E("", !0)
          ])) : E("", !0),
          (u(!0), y(z, null, Z(b(a), (A, se) => (u(), y("th", {
            key: b(Tn)(A, se),
            scope: "col",
            class: ue(b(An)(A)),
            style: ie({ width: A.width }),
            "data-dc-align": b(On)(A),
            "data-dc-hide": A.hideBelow,
            "aria-sort": T(A),
            title: i(A)
          }, [
            K(A) ? (u(), N(ce, {
              key: 0,
              class: "dc-table__sort",
              href: q(A.sort),
              onPress: (re) => M(A.sort)
            }, {
              default: J(() => [
                te(P(A.label), 1)
              ]),
              _: 2
            }, 1032, ["href", "onPress"])) : (u(), y(z, { key: 1 }, [
              te(P(A.label), 1)
            ], 64)),
            A.header ? (u(), y("span", Ji, [
              (u(), N(at(A.header), {
                column: A,
                entity: b(t).entity.value
              }, null, 8, ["column", "entity"]))
            ])) : E("", !0)
          ], 14, Xi))), 128))
        ])
      ]),
      $("tbody", Zi, [
        (u(!0), y(z, null, Z(b(n), (A) => (u(), y("tr", {
          key: A.key,
          class: "dc-table__row",
          onClick: (se) => s(A.row, se)
        }, [
          b(t).selectable.value ? (u(), y("td", tc, [
            Y(De, {
              row: A.row,
              selected: A.selected,
              name: A.parts.identity
            }, null, 8, ["row", "selected", "name"])
          ])) : E("", !0),
          d.value ? (u(), y("td", nc, [
            p(A) !== null ? (u(), N(rn, {
              key: 0,
              standing: w(A),
              name: A.parts.identity,
              onSet: (se) => m(A, se)
            }, null, 8, ["standing", "name", "onSet"])) : E("", !0)
          ])) : E("", !0),
          (u(!0), y(z, null, Z(b(a), (se, re) => (u(), y("td", {
            key: b(Tn)(se, re),
            class: ue(V(se)),
            style: ie({ width: se.width }),
            "data-dc-align": b(On)(se),
            "data-dc-hide": se.hideBelow,
            title: F(se, A)
          }, [
            l.value.get(A.key) ? (u(), N(ce, Ie({
              key: 0,
              class: "dc-table__cell-link",
              href: l.value.get(A.key),
              tabindex: se === o.value ? void 0 : -1,
              "aria-hidden": se === o.value ? void 0 : "true",
              "aria-label": se === o.value ? A.parts.identity : void 0
            }, fn(b(Sn)(b(t), b(Ya)(b(t), A))), {
              onPress: (me, be) => r(A.row, me, be)
            }), null, 16, ["href", "tabindex", "aria-hidden", "aria-label", "onPress"])) : E("", !0),
            se === c.value ? (u(), y("span", sc, [
              Y(ea, {
                column: se,
                entry: A
              }, null, 8, ["column", "entry"]),
              Y(mt, { entry: A }, null, 8, ["entry"]),
              Y(ht, { entry: A }, null, 8, ["entry"])
            ])) : (u(), N(ea, {
              key: 2,
              column: se,
              entry: A
            }, null, 8, ["column", "entry"]))
          ], 14, ac))), 128))
        ], 8, ec))), 128))
      ])
    ], 12, Ui)) : (u(), y("p", zi, [
      Q[2] || (Q[2] = $("span", { class: "dc-table__headline" }, "No columns declared", -1)),
      $("span", ji, [
        te(P(ae.value) + " has no ", 1),
        Q[0] || (Q[0] = $("code", null, "columns", -1)),
        Q[1] || (Q[1] = te(" in the schema, so there is no table to draw. ", -1))
      ])
    ]));
  }
}), Za = /* @__PURE__ */ G(lc, [["__scopeId", "data-v-9945aecc"]]);
function oc(e) {
  const t = he([]), n = R(!1), a = he(null);
  let s = 0;
  const l = (i, c, d, p, w) => ({
    entity: i,
    rows: e.limit.value > 0 ? c.rows.map((m, h) => Ka(m, h, i, e.isPinned(m.id))) : [],
    total: c.total,
    count: d ? rt(i) : Re(c.total),
    pinned: rc(p, c, w)
  }), o = () => {
    const i = ++s, c = e.query.value, d = e.schema.value, p = e.entities.value, w = e.limit.value, m = e.within?.value.trim() ?? "", h = mn(c) && !m, v = m ? hn(m, c.expr) : c.expr, k = p.map((S) => ({
      entity: S,
      // Scope the query to this entity, keeping the expression and ordering.
      outcome: e.source.value.query({
        // Each card is the top few of its type, wherever the shell's own
        // result set has been paged to — so this asks for the first page.
        query: { ...c, entity: S.key, expr: v, page: 1 },
        schema: d,
        entity: S,
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
    if (k.every(({ outcome: S }) => !(S instanceof Promise))) {
      t.value = k.map(
        ({ entity: S, outcome: O }) => l(S, O, h, d, v)
      ), a.value = null, n.value = !1;
      return;
    }
    n.value = !0, Promise.all(k.map(({ outcome: S }) => Promise.resolve(S))).then((S) => {
      i === s && (t.value = S.map(
        (O, g) => l(k[g].entity, O, h, d, v)
      ), a.value = null);
    }).catch((S) => {
      i === s && (a.value = S, t.value = []);
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
  return le(
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
function rc(e, t, n) {
  const a = t.rows[0];
  if (t.total !== 1 || t.rows.length !== 1 || !a)
    return !1;
  const s = n.trim();
  if (!s)
    return !1;
  const l = Pt(e, a);
  return !!l && Qe(s, l) === s;
}
const ic = ["data-dc-pending", "data-dc-heads-only"], cc = {
  key: 0,
  class: "dc-types__state",
  role: "alert"
}, uc = {
  key: 1,
  class: "dc-types__state",
  "aria-live": "polite"
}, dc = {
  key: 2,
  class: "dc-types__state"
}, fc = ["data-dc-empty"], vc = { class: "dc-type__name" }, pc = { class: "dc-type__count dc-mono" }, hc = {
  key: 0,
  class: "dc-type__note dc-mono"
}, mc = { class: "dc-type__sr" }, yc = {
  key: 1,
  class: "dc-type__description"
}, gc = {
  key: 0,
  class: "dc-type__empty"
}, _c = { class: "dc-type__identity" }, wc = { class: "dc-type__primary dc-truncate" }, kc = { class: "dc-type__secondary dc-mono dc-truncate" }, bc = { class: "dc-type__trailing dc-mono" }, $c = { class: "dc-type__metric-value" }, xc = { class: "dc-type__metric-label" }, Sc = {
  key: 0,
  class: "dc-type__date"
}, Cc = /* @__PURE__ */ U({
  __name: "TypeCardsView",
  setup(e) {
    const t = ne(), { previews: n, pending: a, error: s } = oc({
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
      const { keepsCard: p } = d;
      return Array.isArray(p) ? p.some((w) => r.value.has(w)) : !!p;
    }, c = f(
      () => n.value.filter(
        (d) => !d.pinned && (l.value || !d.entity.nested) && (d.total > 0 || i(d.entity) || !o.value && d.entity.create)
      )
    );
    return (d, p) => (u(), y("div", {
      class: "dc-types",
      "data-dc-pending": b(a) ? "true" : "false",
      "data-dc-heads-only": o.value ? "true" : "false"
    }, [
      X(d.$slots, "before", {}, void 0, !0),
      b(s) ? (u(), y("p", cc, " Could not load results: " + P(b(s) instanceof Error ? b(s).message : "the data source failed."), 1)) : !c.value.length && b(a) ? (u(), y("p", uc, " Running query… ")) : c.value.length ? E("", !0) : (u(), y("p", dc, P(l.value ? "Nothing matches this query" : "Nothing here yet"), 1)),
      (u(!0), y(z, null, Z(c.value, (w) => (u(), y("section", {
        key: w.entity.key,
        class: "dc-type",
        "data-dc-empty": w.total ? "false" : "true"
      }, [
        Y(ce, {
          class: "dc-type__head",
          href: b(t).entityHref(w.entity.key),
          onPress: (m) => b(t).setEntity(w.entity.key)
        }, {
          default: J(() => [
            $("span", vc, P(w.entity.label), 1),
            $("span", pc, P(w.count), 1),
            w.entity.note ? (u(), y("span", hc, P(w.entity.note), 1)) : E("", !0),
            p[0] || (p[0] = $("span", {
              class: "dc-type__go",
              "aria-hidden": "true"
            }, "→", -1)),
            $("span", mc, "Show only " + P(w.entity.label.toLowerCase()), 1),
            w.entity.description ? (u(), y("span", yc, P(w.entity.description), 1)) : E("", !0)
          ]),
          _: 2
        }, 1032, ["href", "onPress"]),
        w.total ? E("", !0) : (u(), y("p", gc, P(l.value ? "No matches" : "Nothing here yet"), 1)),
        (u(!0), y(z, null, Z(w.rows, (m) => (u(), y("div", {
          key: m.key,
          class: "dc-type__row"
        }, [
          Y(ce, {
            class: "dc-type__open",
            href: b(t).pressHref(m.row),
            onPress: (h) => b(t).activate(m.row, h)
          }, {
            default: J(() => [
              $("span", _c, [
                $("span", wc, P(m.parts.identity), 1),
                $("span", kc, P(m.parts.reference), 1)
              ])
            ]),
            _: 2
          }, 1032, ["href", "onPress"]),
          $("span", bc, [
            (u(!0), y(z, null, Z(m.parts.metrics.slice(0, 1), (h) => (u(), N(pt, {
              key: h.column.key ?? h.label,
              class: "dc-type__metric",
              entry: m,
              column: h.column
            }, {
              default: J(() => [
                $("span", $c, P(h.text), 1),
                $("span", xc, P(h.label), 1)
              ]),
              _: 2
            }, 1032, ["entry", "column"]))), 128)),
            m.parts.updated ? (u(), y("span", Sc, P(m.parts.updated), 1)) : E("", !0),
            Y(xn, { entry: m }, null, 8, ["entry"]),
            Y(mt, { entry: m }, null, 8, ["entry"]),
            Y(ht, { entry: m }, null, 8, ["entry"])
          ])
        ]))), 128)),
        w.entity.create && !o.value ? (u(), N(ce, {
          key: 1,
          class: "dc-type__new",
          href: b(t).createHref?.(w.entity),
          onPress: (m) => b(t).create(w.entity)
        }, {
          default: J(() => [
            p[1] || (p[1] = $("span", {
              class: "dc-type__plus",
              "aria-hidden": "true"
            }, "+", -1)),
            te(" " + P(w.entity.create), 1)
          ]),
          _: 2
        }, 1032, ["href", "onPress"])) : E("", !0)
      ], 8, fc))), 128)),
      X(d.$slots, "after", {}, void 0, !0)
    ], 8, ic));
  }
}), es = /* @__PURE__ */ G(Cc, [["__scopeId", "data-v-d60e56a6"]]), Pc = ["data-dc-pending", "data-dc-more"], Mc = {
  key: 0,
  class: "dc-results__state dc-results__state--loading",
  "aria-live": "polite"
}, Ec = {
  key: 3,
  class: "dc-results__state",
  role: "alert"
}, Lc = { class: "dc-results__detail" }, Tc = {
  key: 4,
  class: "dc-results__state",
  "aria-live": "polite"
}, Oc = {
  key: 5,
  class: "dc-results__state"
}, Ac = { class: "dc-results__detail" }, Nc = /* @__PURE__ */ U({
  __name: "ResultsArea",
  props: {
    views: {},
    loading: { type: Boolean }
  },
  setup(e) {
    const t = e, n = ne(), a = At(), s = {
      list: cn,
      cards: za,
      grid: ja,
      images: Ua,
      table: Za,
      links: Qa,
      preview: Ga
    }, l = f(() => wa(n.query.value, t.views)), o = f(() => Be(n.query.value.view, t.views)), r = f(() => (o.value === "record" ? null : s[o.value]) ?? cn), i = f(() => o.value === "record" ? n.recordView.value : null), c = f(() => n.rows.value.length > 0), d = f(() => n.error.value !== null), p = R(null);
    function w(g) {
      return g.querySelector("[data-dc-scroll]") ?? g;
    }
    le(
      // The page on screen, which is the draft's own while one is being typed.
      () => n.liveQuery.value.page,
      () => {
        p.value && (w(p.value).scrollTop = 0);
      }
    );
    const m = R(""), h = R({ x: 0, y: 0 }), v = R(0);
    function k() {
      const g = p.value;
      if (!g) {
        m.value = "";
        return;
      }
      const _ = w(g), M = {
        top: _.scrollTop > 1,
        right: _.scrollWidth - _.clientWidth - _.scrollLeft > 1,
        bottom: _.scrollHeight - _.clientHeight - _.scrollTop > 1,
        left: _.scrollLeft > 1
      };
      m.value = Object.entries(M).filter(([, q]) => q).map(([q]) => q).join(" "), h.value = {
        x: _.offsetHeight - _.clientHeight,
        y: _.offsetWidth - _.clientWidth
      }, v.value = g.querySelector("[data-dc-stuck]")?.offsetHeight ?? 0;
    }
    let S = null, O = null;
    return le(
      p,
      (g, _) => {
        if (_?.removeEventListener("scroll", k, { capture: !0 }), S?.disconnect(), O?.disconnect(), S = null, O = null, k(), !g || (g.addEventListener("scroll", k, { passive: !0, capture: !0 }), typeof ResizeObserver > "u")) return;
        const M = new ResizeObserver(k), q = typeof MutationObserver > "u" ? null : new MutationObserver(() => {
          ae(), k();
        }), ae = () => {
          M.disconnect(), q?.disconnect();
          for (const I of /* @__PURE__ */ new Set([g, w(g)])) {
            M.observe(I);
            for (const K of I.children) M.observe(K);
            q?.observe(I, { childList: !0 });
          }
        };
        ae(), S = M, O = q;
      },
      { flush: "post" }
    ), we(() => {
      p.value?.removeEventListener("scroll", k, { capture: !0 }), S?.disconnect(), O?.disconnect();
    }), (g, _) => (u(), y("div", {
      ref_key: "scroller",
      ref: p,
      class: "dc-results",
      "data-dc-pending": b(n).pending.value ? "true" : "false",
      "data-dc-more": m.value,
      style: ie({
        "--dc-results-gutter-x": `${h.value.x}px`,
        "--dc-results-gutter-y": `${h.value.y}px`,
        "--dc-results-stuck": `${v.value}px`
      })
    }, [
      e.loading ? (u(), y("p", Mc, [..._[1] || (_[1] = [
        $("span", { class: "dc-results__detail" }, "Loading…", -1)
      ])])) : l.value ? (u(), N(es, { key: 1 }, _t({ _: 2 }, [
        a["cards-before"] ? {
          name: "before",
          fn: J(() => [
            X(g.$slots, "cards-before", {}, void 0, !0)
          ]),
          key: "0"
        } : void 0,
        a["cards-after"] ? {
          name: "after",
          fn: J(() => [
            X(g.$slots, "cards-after", {}, void 0, !0)
          ]),
          key: "1"
        } : void 0
      ]), 1024)) : i.value?.id ? (u(), N(at(i.value.component), {
        key: 2,
        id: i.value.id
      }, null, 8, ["id"])) : d.value ? (u(), y("p", Ec, [
        _[2] || (_[2] = $("span", { class: "dc-results__headline" }, "Could not load results", -1)),
        $("span", Lc, P(b(n).error.value instanceof Error ? b(n).error.value.message : "The data source failed."), 1)
      ])) : !c.value && b(n).pending.value ? (u(), y("p", Tc, [..._[3] || (_[3] = [
        $("span", { class: "dc-results__detail" }, "Running query…", -1)
      ])])) : c.value ? (u(), N(at(r.value), { key: 6 })) : (u(), y("div", Oc, [
        _[4] || (_[4] = $("span", { class: "dc-results__headline" }, "Nothing matches this query", -1)),
        $("span", Ac, P(b(n).summary.value), 1),
        b(n).isPristine.value ? E("", !0) : (u(), N(ce, {
          key: 0,
          class: "dc-results__clear",
          href: b(n).isEverything.value ? b(n).clearHref() : b(n).entityHref(null),
          onPress: _[0] || (_[0] = (M) => b(n).isEverything.value ? b(n).clearFilters() : b(n).clearEntity())
        }, {
          default: J(() => [
            te(P(b(n).isEverything.value ? "Clear filters" : "Search everything instead"), 1)
          ]),
          _: 1
        }, 8, ["href"]))
      ]))
    ], 12, Pc));
  }
}), ts = /* @__PURE__ */ G(Nc, [["__scopeId", "data-v-bc18f2f9"]]), Ic = ["data-dc-theme", "data-dc-value-press", "data-dc-layout"], Bc = { class: "dc-shell__main" }, Rc = {
  key: 0,
  class: "dc-shell__page"
}, Hc = {
  key: 1,
  class: "dc-shell__panel",
  "aria-label": "Panel"
}, qc = /* @__PURE__ */ U({
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
  emits: /* @__PURE__ */ En(["activate", "create", "duplicate", "delete", "operate", "drill", "query-change", "toggle-pin"], ["update:pinned", "update:selected"]),
  setup(e, { expose: t, emit: n }) {
    const a = e, s = n, l = Mn(e, "pinned"), o = Mn(e, "selected"), r = At(), i = un(oa, null), c = a.route || i ? null : ds(), d = a.route ?? i ?? c;
    we(() => c?.dispose?.());
    const p = R(!!r.page);
    ss(() => {
      p.value = !!r.page;
    });
    const w = fs(d, {
      detached: () => p.value && a.pageQuery === "detached",
      path: () => a.listPath
    }), m = f(() => cl({ seed: a.schema.key })), h = f(() => a.source ?? m.value), v = El({
      schema: () => a.schema,
      adapter: w,
      defaults: () => a.defaults,
      navigationMode: () => a.navigationMode,
      facetNavigationMode: () => a.facetNavigationMode
    }), k = f(() => a.within?.trim() ?? ""), S = Al({
      query: v.query,
      entity: v.entity,
      schema: f(() => a.schema),
      setExpression: v.setExpression
    });
    le(v.query, (C) => s("query-change", C));
    const O = f(() => yl(a.schema, [v.query.value.expr])), g = f(
      () => O.value.flatMap((C) => {
        const H = a.schema.entities.find((j) => j.key === C.entityKey);
        return H ? [{ ...C, entity: H }] : [];
      })
    );
    function _() {
      if (r.record) return g.value;
      const C = a.recordCards;
      return C ? g.value.filter((H) => C[H.entityKey]) : [];
    }
    const M = f(() => {
      const [C, ...H] = g.value;
      if (!C || H.length || v.entity.value !== null) return null;
      const j = a.recordViews?.[C.entityKey];
      return j ? { ...j, id: C.id } : null;
    }), q = f(() => {
      const C = v.entity.value?.key;
      return C && a.recordViews?.[C] || null;
    }), ae = f(() => {
      const C = a.views, H = typeof C == "function" ? C({ entity: v.entity.value, records: O.value }) : C;
      return M.value || q.value ? [...(H ?? vn).filter((j) => j !== "record"), "record"] : H?.filter((j) => j !== "record");
    }), I = f(
      () => q.value !== null && Be(v.query.value.view, ae.value) === "record"
    ), K = f(() => I.value ? 1 : a.limit), T = Ll({
      source: h,
      query: S.live,
      schema: f(() => a.schema),
      entity: v.entity,
      limit: K,
      within: k
    }), V = Tl({
      // Not before the data has landed: what is there until then is no place to hold.
      active: f(() => I.value && !a.loading),
      rows: T.rows,
      pending: T.pending,
      page: f(() => S.live.value.page),
      list: f(() => {
        const { entity: C, expr: H, sort: j, dir: xe } = S.live.value;
        return JSON.stringify([C, H, j, xe]);
      }),
      locate: T.locate,
      moveTo: (C) => {
        S.drafting.value ? S.setPage(C) : v.setPage(C, "replace");
      }
    }), F = f(() => T.pageCount.value + (V.gone.value ? 1 : 0)), ee = f(() => {
      if (M.value) return M.value;
      const C = q.value;
      return C ? { ...C, id: V.id.value ?? T.rows.value[0]?.id ?? null } : null;
    });
    function L(C) {
      const H = q.value !== null && Be(C, ae.value) === "record";
      if (H === I.value) {
        v.setView(C);
        return;
      }
      const j = S.live.value.page, xe = H ? (j - 1) * a.limit + 1 : Math.ceil(j / a.limit);
      S.drafting.value ? (v.setView(C), S.setPage(xe)) : v.setView(C, xe);
    }
    function Q(C) {
      if (!q.value || I.value) return null;
      const H = T.rows.value.indexOf(C);
      return H === -1 ? null : T.offset.value + H + 1;
    }
    le(
      [F, T.pending, v.query, S.drafting, () => a.loading, p, V.holding],
      () => {
        if (T.pending.value || S.drafting.value || a.loading || p.value) return;
        const C = F.value;
        v.query.value.page <= C || (V.gone.value ? V.moveTo(C) : V.holding.value || v.setPage(C, "replace"));
      },
      // Immediately, since a pasted URL is past the end before anything changes;
      // and after the render, so the correction is a navigation the mounted shell
      // makes rather than one it makes on the way up. An async source is still
      // pending here and corrects itself when its count lands.
      { immediate: !0, flush: "post" }
    );
    const A = f(() => new Set(l.value));
    function se(C) {
      const H = new Set(A.value);
      H.has(C.id) ? H.delete(C.id) : H.add(C.id), l.value = [...H], s("toggle-pin", C);
    }
    const re = f(() => {
      if (a.selectable === !0) return !0;
      const C = v.entity.value;
      return !!(C?.duplicate || C?.delete || C?.operations?.some((H) => H.selection !== !1));
    }), me = f(() => new Set(o.value));
    function be(C) {
      const H = new Set(me.value);
      H.has(C.id) ? H.delete(C.id) : H.add(C.id), o.value = [...H];
    }
    function ye(C) {
      const H = new Set(me.value);
      for (const j of T.rows.value)
        C ? H.add(j.id) : H.delete(j.id);
      o.value = [...H];
    }
    function yt() {
      o.value.length && (o.value = []);
    }
    const Ve = f(() => ({
      ids: [...o.value],
      rows: T.rows.value.filter((C) => me.value.has(C.id)),
      entity: v.entity.value
    }));
    le(() => v.query.value.entity, yt);
    function Ke(C, H, j = {}, xe) {
      const Cn = Xt(a.schema, v.query.value, C, j, xe);
      j.exclude ? v.narrow(Cn, H?.key ?? v.query.value.entity) : S.release(() => v.narrow(Cn, H?.key ?? null, H ? void 0 : "cards")), s("drill", C, H, j);
    }
    function We(C) {
      return a.rowPress === "narrow" && Pt(a.schema, C) !== null;
    }
    function $e(C) {
      return a.schema.entities.find((j) => j.key === C.entityKey)?.href?.(C) || null;
    }
    const Ce = he(null);
    le(v.query, () => {
      Ce.value = null;
    });
    const x = gl({
      ...v,
      draft: S.text,
      liveQuery: S.live,
      drafting: S.drafting,
      commitDraft: S.commit,
      abandonDraft: S.abandon,
      /*
       * A page of what is on screen: the draft's, while one is live, which are
       * held beside it rather than in the URL — see `liveQuery`.
       */
      setPage: (C, H) => {
        const j = V.step(C);
        j !== null && (S.drafting.value ? S.setPage(j) : v.setPage(j, H));
      },
      setView: L,
      schema: f(() => a.schema),
      entities: f(() => a.schema.entities),
      rows: T.rows,
      total: T.total,
      matched: T.matched,
      limit: K,
      offset: T.offset,
      pageCount: F,
      peek: T.peek,
      pending: T.pending,
      counting: T.counting,
      error: T.error,
      source: h,
      previewsPerType: f(() => a.previewsPerType),
      within: k,
      loading: f(() => a.loading),
      recordView: ee,
      pinnable: f(() => a.pinnable === !0),
      isPinned: (C) => A.value.has(C.id),
      isPinnedId: (C) => A.value.has(C),
      togglePin: se,
      selectable: re,
      selection: Ve,
      isSelected: (C) => me.value.has(C.id),
      toggleSelect: be,
      selectPage: ye,
      clearSelection: yt,
      narrowsOnPress: f(() => a.rowPress === "narrow"),
      rowLinks: f(() => a.rowLinks),
      pressPreview: Ce,
      /*
       * The one place a press is read, so every view gets the same answer without
       * knowing which of the two it is: they all call this.
       */
      activate: (C, H = {}) => {
        if (We(C)) {
          Ke(C, null, H);
          return;
        }
        const j = Q(C);
        if (j !== null) {
          S.drafting.value ? (v.setView("record"), S.setPage(j)) : v.setView("record", j);
          return;
        }
        const xe = $e(C);
        if (xe) {
          window.open(xe, "_blank", "noopener");
          return;
        }
        s("activate", C);
      },
      pressHref: (C) => {
        if (We(C)) return v.narrowHref(Xt(a.schema, v.query.value, C), null, "cards");
        const H = Q(C);
        return H !== null ? v.hrefFor({ view: "record", page: H }) : $e(C) ?? a.activateHref?.(C) ?? null;
      },
      recordHref: $e,
      drillHref: (C, H, j) => Pt(a.schema, C) ? v.narrowHref(
        Xt(a.schema, v.query.value, C, {}, j),
        H?.key ?? null,
        H ? void 0 : "cards"
      ) : null,
      create: (C) => s("create", C),
      createHref: (C) => a.createHref?.(C) ?? null,
      duplicate: () => s("duplicate", Ve.value),
      delete: () => s("delete", Ve.value),
      operate: (C) => s("operate", C, Ve.value),
      drill: Ke
    });
    kl({ theme: () => a.theme, accent: () => a.accent, tokens: () => a.tokens });
    const B = f(() => {
      if (!(!a.accent && !a.tokens))
        return { ...a.tokens, ...a.accent ? { "--dc-accent": a.accent } : {} };
    }), W = R(null), D = R(0);
    let Te = null;
    Ye(() => {
      const C = W.value;
      C && (D.value = C.getBoundingClientRect().width, !(typeof ResizeObserver > "u") && (Te = new ResizeObserver(([H]) => {
        D.value = H.contentRect.width;
      }), Te.observe(C)));
    }), we(() => Te?.disconnect());
    const Oe = f(() => a.layout === "panel"), jt = f(() => !Oe.value && a.oneStripFrom !== !1 && D.value >= a.oneStripFrom), Ut = f(
      () => Be(v.query.value.view, ae.value) === "record" && ee.value?.strip === !1
    ), Qt = f(() => ({
      views: ae.value,
      selectionPlacement: a.selectionPlacement,
      pagesNote: a.pagesNote
    }));
    return t({
      query: v.query
    }), (C, H) => (u(), y("div", {
      ref_key: "root",
      ref: W,
      class: "dc-shell",
      "data-dc-theme": e.theme,
      "data-dc-value-press": e.valuePress,
      "data-dc-layout": e.layout,
      style: ie(B.value)
    }, [
      Oe.value ? E("", !0) : (u(), y("div", {
        key: 0,
        class: ue(["dc-shell__head", { "dc-shell__head--one-strip": jt.value }])
      }, [
        Y(ln, null, _t({ _: 2 }, [
          r.page ? void 0 : {
            name: "lead",
            fn: J(() => [
              Y(Yn, {
                views: ae.value,
                "type-chooser": e.typeChooser
              }, null, 8, ["views", "type-chooser"])
            ]),
            key: "0"
          },
          r.brand ? {
            name: "brand",
            fn: J((j) => [
              X(C.$slots, "brand", Gt(ls(j)), void 0, !0)
            ]),
            key: "1"
          } : void 0,
          r.actions ? {
            name: "actions",
            fn: J(() => [
              X(C.$slots, "actions", {}, void 0, !0)
            ]),
            key: "2"
          } : void 0
        ]), 1024),
        jt.value && !r.page && !Ut.value ? (u(), N(kt, Gt(Ie({ key: 0 }, Qt.value)), null, 16)) : E("", !0)
      ], 2)),
      $("div", Bc, [
        r.page ? (u(), y("div", Rc, [
          X(C.$slots, "page", {
            query: b(x).query.value
          }, void 0, !0)
        ])) : E("", !0),
        !Oe.value && !jt.value && !r.page && !Ut.value ? (u(), N(kt, Gt(Ie({ key: 1 }, Qt.value)), null, 16)) : E("", !0),
        r.page ? E("", !0) : X(C.$slots, "results", {
          rows: b(x).rows.value,
          total: b(x).total.value,
          offset: b(x).offset.value,
          pageCount: b(x).pageCount.value,
          query: b(x).liveQuery.value,
          pending: b(x).pending.value,
          loading: e.loading
        }, () => [
          Y(ts, {
            views: ae.value,
            loading: e.loading
          }, _t({ _: 2 }, [
            r["cards-before"] || _().length ? {
              name: "cards-before",
              fn: J(() => [
                (u(!0), y(z, null, Z(_(), (j) => (u(), y(z, {
                  key: `${j.entityKey}:${j.id}`
                }, [
                  r.record ? X(C.$slots, "record", {
                    id: j.id,
                    entity: j.entity
                  }, void 0, !0, 0) : (u(), N(at(e.recordCards?.[j.entityKey]), {
                    key: 1,
                    id: j.id
                  }, null, 8, ["id"]))
                ], 64))), 128)),
                X(C.$slots, "cards-before", {}, void 0, !0)
              ]),
              key: "0"
            } : void 0,
            r["cards-after"] ? {
              name: "cards-after",
              fn: J(() => [
                X(C.$slots, "cards-after", {}, void 0, !0)
              ]),
              key: "1"
            } : void 0
          ]), 1032, ["views", "loading"])
        ], !0, 2)
      ]),
      Oe.value ? (u(), y("aside", Hc, [
        X(C.$slots, "panel-head", {}, void 0, !0),
        Y(ln, { panel: "" }, _t({ _: 2 }, [
          r.actions ? {
            name: "actions",
            fn: J(() => [
              X(C.$slots, "actions", {}, void 0, !0)
            ]),
            key: "0"
          } : void 0
        ]), 1024),
        r.page ? E("", !0) : (u(), N(Yn, {
          key: 0,
          views: ae.value,
          "type-chooser": e.typeChooser,
          labels: e.viewLabels,
          hints: e.viewHints,
          stacked: ""
        }, null, 8, ["views", "type-chooser", "labels", "hints"])),
        !r.page && O.value.length === 0 ? (u(), N(rr, { key: 1 })) : E("", !0),
        X(C.$slots, "panel", {
          query: b(x).query.value
        }, void 0, !0),
        !r.page && !Ut.value ? (u(), N(kt, Ie({
          key: 2,
          class: "dc-shell__panel-actions"
        }, Qt.value), null, 16)) : E("", !0)
      ])) : E("", !0)
    ], 12, Ic));
  }
}), Fc = /* @__PURE__ */ G(qc, [["__scopeId", "data-v-fd2b381a"]]), Dc = ["data-dc-span", "data-dc-muted", "data-dc-collapsed"], Vc = ["data-dc-collapsible"], Kc = ["aria-expanded", "aria-controls"], Wc = { class: "dc-shell-card__sr" }, zc = {
  key: 0,
  class: "dc-shell-card__identity"
}, jc = { class: "dc-shell-card__title dc-shell-card__name" }, Uc = {
  key: 0,
  class: "dc-shell-card__ref dc-mono"
}, Qc = {
  key: 1,
  class: "dc-shell-card__title"
}, Gc = {
  key: 2,
  class: "dc-shell-card__count dc-mono"
}, Yc = {
  key: 1,
  class: "dc-shell-card__aside"
}, Xc = ["data-dc-flush"], Jc = /* @__PURE__ */ U({
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
    const n = e, a = t, s = R(n.defaultCollapsed === !0), l = f(() => n.span === "all" ? { gridColumn: "1 / -1" } : void 0), o = At();
    function r(I) {
      return i(I?.() ?? []);
    }
    function i(I) {
      return I.some((K) => K.type === os ? !1 : K.type === rs ? String(K.children ?? "").trim().length > 0 : K.type === z ? i(K.children ?? []) : !0);
    }
    const c = f(
      () => !!n.title || !!n.name || d.value || r(o.head)
    ), d = f(() => r(o.aside)), p = f(() => r(o.default)), w = f(() => r(o.foot)), m = f(
      () => !!n.name && (!!n.reference || r(o.reference))
    ), h = f(() => n.collapsible === !0 && c.value), v = f(() => h.value && (n.collapsed ?? s.value));
    function k() {
      const I = !v.value;
      s.value = I, a("update:collapsed", I);
    }
    const S = Nt() ?? "dc-shell-card", O = `${S}-body`, g = `${S}-foot`, _ = f(
      () => [p.value ? O : "", w.value ? g : ""].filter(Boolean).join(" ") || void 0
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
    ].join(", "), q = R(null);
    function ae(I) {
      if (!h.value) return;
      const K = I.target?.closest(M);
      K && q.value?.contains(K) || typeof window < "u" && window.getSelection()?.toString() || k();
    }
    return (I, K) => (u(), y("section", {
      class: "dc-shell-card",
      style: ie(l.value),
      "data-dc-span": e.span,
      "data-dc-muted": e.muted ? "true" : "false",
      "data-dc-collapsed": v.value ? "true" : "false"
    }, [
      c.value ? (u(), y("header", {
        key: 0,
        ref_key: "head",
        ref: q,
        class: "dc-shell-card__head",
        "data-dc-collapsible": h.value ? "true" : "false",
        onClick: ae
      }, [
        h.value ? (u(), y("button", {
          key: 0,
          type: "button",
          class: "dc-shell-card__toggle",
          "aria-expanded": v.value ? "false" : "true",
          "aria-controls": _.value,
          onClick: k
        }, [
          K[0] || (K[0] = $("svg", {
            class: "dc-shell-card__chevron",
            viewBox: "0 0 10 10",
            "aria-hidden": "true"
          }, [
            $("path", { d: "M2 3.5 5 6.5 8 3.5" })
          ], -1)),
          $("span", Wc, P(e.name || e.title || "Card"), 1)
        ], 8, Kc)) : E("", !0),
        X(I.$slots, "head", {}, () => [
          e.name ? (u(), y("div", zc, [
            $("h2", jc, P(e.name), 1),
            m.value ? (u(), y("span", Uc, [
              X(I.$slots, "reference", {}, () => [
                te(P(e.reference), 1)
              ], !0)
            ])) : E("", !0)
          ])) : (u(), y("h2", Qc, P(e.title), 1)),
          e.count !== void 0 ? (u(), y("span", Gc, P(e.count), 1)) : E("", !0)
        ], !0),
        d.value ? (u(), y("span", Yc, [
          X(I.$slots, "aside", {}, void 0, !0)
        ])) : E("", !0)
      ], 8, Vc)) : E("", !0),
      p.value ? bt((u(), y("div", {
        key: 1,
        id: O,
        class: "dc-shell-card__body",
        "data-dc-flush": e.flush ? "true" : "false"
      }, [
        X(I.$slots, "default", {}, void 0, !0)
      ], 8, Xc)), [
        [Ln, !v.value]
      ]) : E("", !0),
      w.value ? bt((u(), y("footer", {
        key: 2,
        id: g,
        class: "dc-shell-card__foot"
      }, [
        X(I.$slots, "foot", {}, void 0, !0)
      ], 512)), [
        [Ln, !v.value]
      ]) : E("", !0)
    ], 12, Dc));
  }
}), Ju = /* @__PURE__ */ G(Jc, [["__scopeId", "data-v-c84525aa"]]), Zc = ["aria-label"], eu = ["aria-checked", "data-dc-active", "tabindex", "onClick", "onKeydown"], tu = /* @__PURE__ */ U({
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
    function l(o, r) {
      const i = n.options.length;
      let c = null;
      if (o.key === "ArrowRight" || o.key === "ArrowDown" ? c = (r + 1) % i : o.key === "ArrowLeft" || o.key === "ArrowUp" ? c = (r - 1 + i) % i : o.key === "Home" ? c = 0 : o.key === "End" && (c = i - 1), c === null) return;
      o.preventDefault();
      const d = n.options[c];
      d && (a("update:modelValue", d.key), s.value[c]?.focus());
    }
    return (o, r) => (u(), y("div", {
      class: "dc-segmented",
      role: "radiogroup",
      "aria-label": e.label
    }, [
      (u(!0), y(z, null, Z(e.options, (i, c) => (u(), y("button", {
        key: i.key,
        ref_for: !0,
        ref_key: "buttons",
        ref: s,
        type: "button",
        role: "radio",
        class: ue(["dc-segmented__item", { "dc-segmented__item--mono": e.mono }]),
        "aria-checked": i.key === e.modelValue,
        "data-dc-active": i.key === e.modelValue ? "true" : "false",
        tabindex: i.key === e.modelValue ? 0 : -1,
        onClick: (d) => a("update:modelValue", i.key),
        onKeydown: (d) => l(d, c)
      }, P(i.label), 43, eu))), 128))
    ], 8, Zc));
  }
}), nu = /* @__PURE__ */ G(tu, [["__scopeId", "data-v-63fb5482"]]), au = { class: "dc-fact__label" }, su = ["title"], lu = /* @__PURE__ */ U({
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
    return (s, l) => (u(), y("div", {
      class: "dc-fact",
      style: ie(a.value)
    }, [
      $("dt", au, [
        X(s.$slots, "label", {}, () => [
          te(P(e.label), 1)
        ], !0)
      ]),
      $("dd", {
        class: "dc-fact__value dc-mono",
        title: e.title
      }, [
        X(s.$slots, "default", {}, () => [
          n.value.length === 1 ? (u(), y(z, { key: 0 }, [
            te(P(n.value[0]), 1)
          ], 64)) : (u(!0), y(z, { key: 1 }, Z(n.value, (o, r) => (u(), y("span", {
            key: r,
            class: "dc-fact__line"
          }, P(o), 1))), 128))
        ], !0)
      ], 8, su)
    ], 4));
  }
}), ou = /* @__PURE__ */ G(lu, [["__scopeId", "data-v-1f6d25e6"]]), ru = /* @__PURE__ */ U({
  __name: "ShellFacts",
  props: {
    items: { default: () => [] },
    min: { default: "200px" }
  },
  setup(e) {
    const t = e, n = f(() => ({ "--dc-facts-min": t.min }));
    return (a, s) => (u(), y("dl", {
      class: "dc-facts",
      style: ie(n.value)
    }, [
      (u(!0), y(z, null, Z(e.items, (l, o) => (u(), N(ou, {
        key: `${o}:${l.label}`,
        label: l.label,
        value: l.value,
        title: l.title,
        wide: l.wide
      }, null, 8, ["label", "value", "title", "wide"]))), 128)),
      X(a.$slots, "default", {}, void 0, !0)
    ], 4));
  }
}), Zu = /* @__PURE__ */ G(ru, [["__scopeId", "data-v-17455afa"]]), iu = { class: "dc-counts" }, cu = ["data-dc-tone"], uu = {
  key: 0,
  class: "dc-counts__empty"
}, du = /* @__PURE__ */ U({
  __name: "StatusCounts",
  props: {
    counts: {},
    empty: { default: ke }
  },
  setup(e) {
    const t = e, n = f(() => t.counts.filter((a) => a.count > 0));
    return (a, s) => (u(), y("span", iu, [
      (u(!0), y(z, null, Z(n.value, (l) => (u(), y("span", {
        key: l.label,
        class: "dc-counts__count",
        "data-dc-tone": l.tone ?? "neutral"
      }, P(l.count) + " " + P(l.label), 9, cu))), 128)),
      n.value.length === 0 ? (u(), y("span", uu, P(e.empty), 1)) : E("", !0)
    ]));
  }
}), ed = /* @__PURE__ */ G(du, [["__scopeId", "data-v-5553a9e2"]]), fu = ["data-dc-copied", "title", "aria-label"], vu = {
  key: 0,
  class: "dc-copy__mark",
  viewBox: "0 0 16 16",
  "aria-hidden": "true"
}, pu = {
  key: 1,
  class: "dc-copy__mark",
  viewBox: "0 0 16 16",
  "aria-hidden": "true"
}, hu = 1500, mu = /* @__PURE__ */ U({
  __name: "CopyButton",
  props: {
    text: {},
    label: { default: "Copy to clipboard" }
  },
  emits: ["copied", "error"],
  setup(e, { emit: t }) {
    const n = e, a = t, s = R(!1);
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
      }, hu), a("copied", r);
    }
    return we(() => clearTimeout(l)), (r, i) => (u(), y("button", {
      type: "button",
      class: "dc-copy",
      "data-dc-copied": s.value ? "true" : "false",
      title: s.value ? "Copied" : e.label,
      "aria-label": e.label,
      onClick: o
    }, [
      s.value ? (u(), y("svg", pu, [...i[1] || (i[1] = [
        $("path", { d: "M3 8.5l3.2 3L13 4.5" }, null, -1)
      ])])) : (u(), y("svg", vu, [...i[0] || (i[0] = [
        $("rect", {
          x: "5.5",
          y: "5.5",
          width: "8",
          height: "9",
          rx: "1.5"
        }, null, -1),
        $("path", { d: "M10.5 3.5v-1a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h1" }, null, -1)
      ])]))
    ], 8, fu));
  }
}), yu = /* @__PURE__ */ G(mu, [["__scopeId", "data-v-f4249d7f"]]), gu = ["data-dc-copy", "data-dc-wrap", "data-dc-tone"], _u = /* @__PURE__ */ U({
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
    const n = e, a = t, s = R(null), l = f(() => n.maxHeight === void 0 ? void 0 : { maxHeight: typeof n.maxHeight == "number" ? `${n.maxHeight}px` : n.maxHeight });
    function o() {
      return n.code ?? s.value?.textContent ?? "";
    }
    return (r, i) => (u(), y("div", {
      class: "dc-code",
      "data-dc-copy": e.copy ? "true" : "false",
      "data-dc-wrap": e.wrap ? "true" : "false",
      "data-dc-tone": e.tone
    }, [
      $("pre", {
        ref_key: "pre",
        ref: s,
        class: "dc-code__text dc-mono",
        style: ie(l.value)
      }, [
        X(r.$slots, "default", {}, () => [
          te(P(e.code), 1)
        ], !0)
      ], 4),
      e.copy ? (u(), N(yu, {
        key: 0,
        class: "dc-code__copy",
        text: o,
        label: e.copyLabel,
        onCopied: i[0] || (i[0] = (c) => a("copied", c)),
        onError: i[1] || (i[1] = (c) => a("error", c))
      }, null, 8, ["label"])) : E("", !0)
    ], 8, gu));
  }
}), td = /* @__PURE__ */ G(_u, [["__scopeId", "data-v-67b371dd"]]), wu = 24, ku = /* @__PURE__ */ U({
  __name: "ShellLog",
  props: {
    fetchChunk: {},
    stripAnsi: { type: Boolean },
    maxHeight: { default: "460px" }
  },
  setup(e, { expose: t }) {
    const n = e, a = R(""), s = f(() => n.stripAnsi ? ks(a.value) : a.value), l = R(null);
    let o = 0, r = null;
    function i() {
      return r ??= c().finally(() => {
        r = null;
      }), r;
    }
    async function c() {
      const { chunk: w, offset: m } = await n.fetchChunk(o);
      if (o = m, !w) return;
      const h = l.value, v = !h || h.scrollTop + h.clientHeight >= h.scrollHeight - wu;
      a.value += w, v && (await nt(), l.value && (l.value.scrollTop = l.value.scrollHeight));
    }
    function d() {
      a.value = "", o = 0;
    }
    const p = f(() => n.maxHeight === void 0 ? void 0 : { maxHeight: typeof n.maxHeight == "number" ? `${n.maxHeight}px` : n.maxHeight });
    return t({ poll: i, reset: d }), (w, m) => (u(), y("pre", {
      ref_key: "pane",
      ref: l,
      class: "dc-log dc-mono",
      style: ie(p.value)
    }, P(s.value), 5));
  }
}), nd = /* @__PURE__ */ G(ku, [["__scopeId", "data-v-2c86947e"]]), bu = ["data-dc-theme"], $u = ["aria-labelledby", "aria-label"], xu = {
  key: 1,
  class: "dc-dialog__actions"
}, Ze = [], Su = /* @__PURE__ */ U({
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
    const n = e, a = t, { theme: s, style: l, adopt: o } = bn(n), r = `${Nt() ?? "dc-dialog"}-title`, i = R(null);
    function c() {
      a("close"), a("update:open", !1);
    }
    const d = Symbol("dc-dialog");
    function p(g) {
      g.key !== "Escape" || g.defaultPrevented || Ze[Ze.length - 1] === d && (g.preventDefault(), c());
    }
    let w = !1;
    function m(g) {
      w = g.target === g.currentTarget;
    }
    function h(g) {
      g.target === g.currentTarget && w && c(), w = !1;
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
    let k = null;
    async function S() {
      Ze.push(d), document.addEventListener("keydown", p), k = document.activeElement instanceof HTMLElement ? document.activeElement : null, o(), await nt(), (i.value?.querySelector("[autofocus]") ?? i.value?.querySelector(v) ?? i.value)?.focus();
    }
    function O() {
      const g = Ze.indexOf(d);
      g !== -1 && (Ze.splice(g, 1), document.removeEventListener("keydown", p), k?.isConnected && k.focus(), k = null);
    }
    return Ye(() => {
      n.open && S();
    }), le(
      () => n.open,
      (g) => {
        g ? S() : O();
      }
    ), we(O), (g, _) => e.open ? (u(), N(Ot, {
      key: 0,
      to: e.to
    }, [
      $("div", {
        class: "dc-shell dc-layer dc-dialog",
        "data-dc-theme": b(s),
        style: ie(b(l)),
        onPointerdown: m,
        onClick: h
      }, [
        $("div", {
          ref_key: "panel",
          ref: i,
          class: ue(["dc-dialog__panel", e.panelClass]),
          role: "dialog",
          "aria-modal": "true",
          tabindex: "-1",
          "aria-labelledby": e.title ? r : void 0,
          "aria-label": e.title ? void 0 : e.label
        }, [
          e.title ? (u(), y("h2", {
            key: 0,
            id: r,
            class: "dc-dialog__title"
          }, P(e.title), 1)) : E("", !0),
          $("div", {
            class: ue(["dc-dialog__body", e.bodyClass])
          }, [
            X(g.$slots, "default", {}, void 0, !0)
          ], 2),
          g.$slots.actions ? (u(), y("div", xu, [
            X(g.$slots, "actions", {}, void 0, !0)
          ])) : E("", !0)
        ], 10, $u)
      ], 44, bu)
    ], 8, ["to"])) : E("", !0);
  }
}), ad = /* @__PURE__ */ G(Su, [["__scopeId", "data-v-0cccf313"]]), Cu = 4500, Pu = 9e3, ft = R([]);
let ta = 0;
function ns(e) {
  ft.value = ft.value.filter((t) => t.id !== e);
}
function as(e, t = "ok") {
  ta += 1;
  const n = ta;
  ft.value = [...ft.value, { id: n, message: e, kind: t }], setTimeout(() => ns(n), t === "err" ? Pu : Cu);
}
function Mu(e) {
  as(e instanceof Error ? e.message : String(e), "err");
}
function Eu() {
  return { toasts: is(ft), toast: as, toastError: Mu, dismiss: ns };
}
const Lu = ["data-dc-theme"], Tu = ["data-dc-kind", "role"], Ou = /* @__PURE__ */ U({
  __name: "ShellToasts",
  props: {
    to: { default: "body" },
    theme: { default: void 0 },
    accent: { default: void 0 },
    tokens: { default: void 0 }
  },
  setup(e) {
    const t = e, { toasts: n } = Eu(), { theme: a, style: s, adopt: l } = bn(t);
    return Ye(l), (o, r) => (u(), N(Ot, { to: e.to }, [
      $("div", {
        class: "dc-shell dc-layer dc-toasts",
        "data-dc-theme": b(a),
        style: ie(b(s)),
        "aria-live": "polite"
      }, [
        (u(!0), y(z, null, Z(b(n), (i) => (u(), y("div", {
          key: i.id,
          class: "dc-toast",
          "data-dc-kind": i.kind,
          role: i.kind === "err" ? "alert" : void 0
        }, P(i.message), 9, Tu))), 128))
      ], 12, Lu)
    ], 8, ["to"]));
  }
}), sd = /* @__PURE__ */ G(Ou, [["__scopeId", "data-v-d970211c"]]);
function ld(e, t) {
  const n = R(!1);
  let a = null, s = !1, l = 0;
  const o = () => {
    l++, n.value = !1, a !== null && (clearTimeout(a), a = null);
  };
  function r(d) {
    a = setTimeout(() => void i(d), t);
  }
  async function i(d) {
    if (s || d !== l) return;
    let p;
    try {
      p = await e();
    } catch {
      p = !1;
    }
    s || d !== l || (p ? r(d) : o());
  }
  const c = () => {
    n.value || (n.value = !0, i(++l));
  };
  return Tt(() => {
    s = !0, o();
  }, !0), { start: c, stop: o, polling: n };
}
function od(e, t = {}) {
  const n = t.key ?? ((l) => JSON.stringify(l)), a = he();
  let s = null;
  return cs(() => {
    const l = e(), o = n(l);
    o !== s && (s = o, a.value = l);
  }), a;
}
function rd(e = {}) {
  return { key: "ordinal", kind: "ordinal", label: "#", width: "52px", ...e };
}
function id(e = {}) {
  return { key: "status", role: "state", kind: "status", label: "State", sort: "state", width: "104px", ...e };
}
function cd(e = {}) {
  return { key: "tint", role: "tint", ...e };
}
function ud(e = {}) {
  return { key: "picture", role: "image", kind: "image", width: "56px", height: "40px", ...e };
}
function dd(e, t = {}) {
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
function fd(e, t = {}) {
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
function vd(e, t, n = {}) {
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
function pd(e, t, n = {}) {
  return { key: e, kind: "date", label: t, sort: e, mono: !0, muted: !0, ...n };
}
function hd(e = {}) {
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
function md(e, t, n = {}) {
  return { key: e, label: t, sort: e, truncate: !0, hideBelow: 900, ...n };
}
function yd(e, t, n, a = {}) {
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
function zt(e) {
  return typeof e == "number" ? e : typeof e == "string" && e.trim() !== "" ? Number(e) : Number.NaN;
}
function gd(e) {
  const t = zt(e);
  return Number.isFinite(t) && t > 0 ? ys(t) : ke;
}
function _d(e) {
  const t = zt(e);
  return Number.isFinite(t) && t > 0 ? gs(t) : ke;
}
function wd(e) {
  const t = zt(e);
  return Number.isFinite(t) && t > 0 ? _s(t) : ke;
}
function kd(e) {
  const t = zt(e);
  return Number.isFinite(t) ? ws(t) : ke;
}
function Au(e) {
  if (e <= 0) return 0;
  const t = 10 ** Math.floor(Math.log10(e));
  for (const n of [1, 2, 5])
    if (e <= n * t) return n * t;
  return 10 * t;
}
function Nu(e, t) {
  const n = /* @__PURE__ */ new Set();
  for (const a of e) {
    const s = a.fields[t];
    for (const l of Array.isArray(s) ? s : [s])
      typeof l == "string" && l && n.add(l);
  }
  return [...n].sort((a, s) => a.localeCompare(s));
}
function Iu(e, t) {
  let n = 0;
  for (const a of e) {
    const s = a.fields[t];
    typeof s == "number" && s > n && (n = s);
  }
  return n;
}
function bd(e, t, n, a = {}) {
  return {
    kind: "chips",
    key: t,
    label: n,
    options: Nu(e, t),
    ...a.multiple ? { multiple: !0 } : {}
  };
}
function $d(e, t, n) {
  return { kind: "range", key: t, label: n, min: 0, max: Au(Iu(e, t)) };
}
function xd(e, t, n) {
  return { kind: "toggle", key: e, label: t, text: n };
}
function Sd(e) {
  return e.filter((t) => t.kind === "chips" ? t.options.length > 1 : t.kind === "range" ? t.max > 0 : !0);
}
function Cd(e = "", t = "/") {
  const n = R(fe(e)), a = R(t), s = [`${a.value}${n.value}`];
  return {
    search: n,
    path: a,
    history: s,
    href(l, o) {
      return `${o ?? a.value}${fe(l)}`;
    },
    push(l, o) {
      o !== void 0 && (a.value = o), n.value = fe(l), s.push(`${a.value}${n.value}`);
    },
    replace(l, o) {
      o !== void 0 && (a.value = o), n.value = fe(l), s[s.length - 1] = `${a.value}${n.value}`;
    }
  };
}
function na(e) {
  const t = e.indexOf("?");
  if (t === -1) return "";
  const n = e.slice(t), a = n.indexOf("#");
  return fe(a === -1 ? n : n.slice(0, a));
}
function Pd(e) {
  const t = R(na(e.currentRoute.value.fullPath)), n = f(() => e.currentRoute.value.path), a = le(
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
      const o = `${l ?? n.value}${fe(s)}`;
      return e.resolve?.(o).href ?? o;
    },
    dispose: a
  };
}
function Md(e, t, n = "/") {
  return (a) => {
    const s = a.params[t], l = Array.isArray(s) ? s.join("/") : s ?? "", o = a.query[qe], r = typeof o == "string" ? o : "", i = `${e}="${l.replace(/"/g, "")}"`;
    return { path: n, query: { ...a.query, [qe]: Qe(r, i) } };
  };
}
function Ed(e, t = "/") {
  return (n) => ({ path: t, query: { ...n.query, [Xe]: e } });
}
function Ld(e) {
  const t = /* @__PURE__ */ new Map();
  for (const n of e) {
    const a = t.get(n.entityKey);
    a ? a.push(n) : t.set(n.entityKey, [n]);
  }
  return {
    query(n) {
      return ba(n, (a) => t.get(a.key) ?? [], {
        undatedLast: !0,
        zeroIsAll: !0
      });
    }
  };
}
function Td(e, t) {
  return e.query({ ...t, limit: Number.MAX_SAFE_INTEGER, offset: 0 }).rows;
}
const Bu = {
  DataShell: Fc,
  ShellHeader: ln,
  RecordActions: kt,
  ResultsArea: ts,
  SegmentedControl: nu,
  StatusPill: Ge,
  ListView: cn,
  CardsView: za,
  GridView: ja,
  ImagesView: Ua,
  TableView: Za,
  LinksView: Qa,
  PreviewView: Ga,
  TypeCardsView: es
}, Od = {
  install(e, t = {}) {
    const n = t.prefix ?? "";
    for (const [a, s] of Object.entries(Bu))
      e.component(`${n}${a}`, s);
    t.route && e.provide(oa, t.route), (t.theme || t.accent || t.tokens) && wl({ theme: t.theme, accent: t.accent, tokens: t.tokens }, e);
  }
};
export {
  Du as COLUMN_BREAKPOINTS,
  Fu as COLUMN_ROLES,
  za as CardsView,
  ea as ColumnCell,
  yu as CopyButton,
  zs as DEFAULT_ENTITY_VIEW,
  en as DEFAULT_SORT,
  ma as DEFAULT_VIEW,
  Ol as DRAFT_DELAY,
  Fc as DataShell,
  ke as EMPTY_CELL,
  xa as ENTITY_ALL,
  je as ENTITY_TERM,
  dt as EXPRESSION_TERM,
  ja as GridView,
  Od as HeaderContentLayoutPlugin,
  Ua as ImagesView,
  Qa as LinksView,
  cn as ListView,
  xt as MOCK_TINTS,
  pt as MetricDrill,
  ht as OpenMark,
  _n as PARAM_DIR,
  Xe as PARAM_ENTITY,
  qe as PARAM_EXPR,
  Ft as PARAM_PAGE,
  gn as PARAM_SORT,
  qt as PARAM_VIEW,
  qu as PILL_TONES,
  ql as POPOVER_FLIP_BELOW,
  Rl as POPOVER_GAP,
  Hl as POPOVER_MARGIN,
  $n as PinStar,
  Ga as PreviewView,
  xn as QueryMark,
  et as RECORD_STATUSES,
  yn as RESULT_FIELDS,
  oa as ROUTE_ADAPTER_KEY,
  kt as RecordActions,
  Yn as RecordChoosers,
  ts as ResultsArea,
  Ia as SHELL_CONTEXT_KEY,
  Mt as SHELL_THEME_KEY,
  mt as ScopeMark,
  nu as SegmentedControl,
  De as SelectTick,
  Ju as ShellCard,
  td as ShellCode,
  ad as ShellDialog,
  ou as ShellFact,
  Zu as ShellFacts,
  ln as ShellHeader,
  nd as ShellLog,
  Eo as ShellPager,
  Kl as ShellPopover,
  sd as ShellToasts,
  rn as StandingControl,
  ed as StatusCounts,
  Ge as StatusPill,
  Pu as TOAST_ERROR_MS,
  Cu as TOAST_MS,
  Za as TableView,
  es as TypeCardsView,
  Gs as VIEW_ICONS,
  vn as VIEW_KINDS,
  Vn as VIEW_LABELS,
  Qe as addTerm,
  hn as andExpression,
  gd as bytesCell,
  ia as cellFull,
  Vi as cellNarrowings,
  Le as cellText,
  wt as cellTextOf,
  de as cellValue,
  el as changesResults,
  bd as chipsFrom,
  On as columnAlign,
  An as columnClass,
  Tn as columnKey,
  Ja as columnNarrows,
  vt as columnShortcut,
  va as columnShortcutOf,
  Zt as columnTruncates,
  bs as columnsFor,
  ua as compactShortcuts,
  Xl as completeDraft,
  Zs as countPages,
  ds as createHistoryAdapter,
  Cd as createMemoryAdapter,
  Ld as createMemoryDataSource,
  cl as createMockDataSource,
  Pd as createVueRouterAdapter,
  pd as dateColumn,
  Ss as defaultCellText,
  $t as defaultQuery,
  He as defaultViewFor,
  fs as detachableAdapter,
  Xt as drillExpression,
  _d as durationCell,
  wd as elapsedCell,
  Xs as emptyFacetValue,
  vl as entityAddress,
  hd as entityColumn,
  rt as entityCount,
  Ed as entityRedirect,
  Ea as excludingTerm,
  st as expandShortcuts,
  md as facetColumn,
  ut as facetField,
  Ha as facetValue,
  Ns as fieldHeading,
  Ma as fieldTerm,
  it as findEntity,
  Sa as findEntityByAddress,
  Ee as findSort,
  yd as flagColumn,
  tt as fnv1a,
  ga as focusEntity,
  ys as formatBytes,
  Re as formatCount,
  hs as formatDate,
  Vu as formatDateTime,
  It as formatDigits,
  gs as formatDuration,
  _s as formatElapsed,
  ve as formatExpression,
  ze as formatInteger,
  ps as formatMetric,
  ms as formatOrdinal,
  ws as formatPercent,
  Ls as formatRange,
  _e as formatTerm,
  il as generateRows,
  Sl as hasActiveFacets,
  dd as identityColumn,
  Gu as idsExpression,
  zu as isEntityScoped,
  Js as isFacetActive,
  mn as isPristineQuery,
  Ue as isRangeTerm,
  wa as isTypeCardsQuery,
  ya as isViewKind,
  Wu as joinExpression,
  La as liftTerm,
  Hs as matchesExpression,
  vd as metricColumn,
  Yu as narrowPatch,
  qs as negateTerm,
  Au as niceMax,
  fe as normalizeSearch,
  Di as numberRange,
  Ds as oppositeTerm,
  rd as ordinalColumn,
  oe as parseExpression,
  ml as parseQuery,
  kd as percentCell,
  ud as pictureColumn,
  Fl as placePopover,
  ur as presentParts,
  Ka as presentRow,
  ct as pressOptions,
  gl as provideShellContext,
  wl as provideShellTheme,
  Td as queryAll,
  $d as rangeFrom,
  Bt as rangeOf,
  Ws as readDraft,
  Qu as readExpression,
  Md as recordRedirect,
  Pa as recordTerm,
  yl as recordsIn,
  fd as referenceColumn,
  ot as refineExpression,
  Be as resolveView,
  pe as roleColumn,
  ra as roleColumns,
  xs as rowKey,
  lt as sameTerm,
  Vt as scopeTerm,
  Pt as scopeTermFor,
  Aa as scopedEntity,
  Uu as searchFromQuery,
  js as searchesCorpus,
  Wn as serializeQuery,
  pl as sortAddress,
  Ht as sortsFor,
  Ku as splitExpression,
  Ca as standingTerm,
  id as stateColumn,
  ks as stripAnsi,
  Ml as summarizeQuery,
  Et as summaryTerms,
  kn as termStanding,
  cd as tintColumn,
  ju as tintFor,
  xd as toggleFacet,
  Ii as useColumns,
  Al as useDraft,
  Va as useEntityCounts,
  oc as useEntityPreviews,
  bn as useLayerTheme,
  ld as usePoll,
  Fe as usePresentedRows,
  El as useQueryState,
  Bl as useRecordNames,
  Ll as useResults,
  ne as useShellContext,
  od as useStableSchema,
  Eu as useToasts,
  Sd as usefulFacets,
  Us as viewAcross,
  Qs as viewAfter,
  qa as withFacetValue,
  tn as withStanding,
  zn as withWhere,
  Xu as withoutFacet,
  Oa as withoutOwnScope,
  Fs as withoutTerm
};
