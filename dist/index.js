import { ref as V, computed as p, inject as Mt, provide as ln, getCurrentInstance as ts, shallowRef as ft, toValue as ut, watch as be, onScopeDispose as Ht, getCurrentScope as qn, defineComponent as re, useSlots as cn, onBeforeUnmount as Ie, openBlock as f, createElementBlock as h, createElementVNode as P, unref as O, renderSlot as we, toDisplayString as B, Fragment as te, renderList as he, createCommentVNode as L, withModifiers as Qe, normalizeClass as Je, withDirectives as en, withKeys as bn, normalizeStyle as xe, vModelText as Vo, nextTick as yt, onMounted as un, resolveComponent as ns, createBlock as Y, useId as Vn, Teleport as Kn, createVNode as de, createTextVNode as Ae, withCtx as Ee, reactive as Sr, resolveDynamicComponent as Wn, createSlots as Ca, useModel as Tn, onBeforeUpdate as Ko, normalizeProps as Wo, guardReactiveProps as jo, mergeModels as Ln, vShow as On, Comment as Uo, Text as Go, readonly as Yo, mergeProps as Xo, h as Qo, watchEffect as Zo } from "vue";
const as = Symbol("dc.routeAdapter");
function De(e) {
  if (!e) return "";
  const t = e.replace(/^[?]/, "");
  return t ? `?${t}` : "";
}
function Jo() {
  const e = typeof window < "u", t = V(e ? De(window.location.search) : ""), n = V(e ? window.location.pathname : "/"), a = () => {
    t.value = De(window.location.search), n.value = window.location.pathname;
  };
  e && window.addEventListener("popstate", a);
  const r = (s, l, i) => {
    const o = De(s);
    if (!e) {
      t.value = o, i !== void 0 && (n.value = i);
      return;
    }
    const c = i === void 0 || i === window.location.pathname ? `${window.location.pathname}${o}${window.location.hash}` : `${i}${o}`;
    l === "push" ? window.history.pushState(window.history.state, "", c) : window.history.replaceState(window.history.state, "", c), t.value = o, n.value = window.location.pathname;
  };
  return {
    search: t,
    path: n,
    href(s, l) {
      return e ? l !== void 0 && l !== window.location.pathname ? `${l}${De(s)}` : `${window.location.pathname}${De(s)}${window.location.hash}` : `${l ?? n.value}${De(s)}`;
    },
    push: (s, l) => r(s, "push", l),
    replace: (s, l) => r(s, "replace", l),
    dispose: () => {
      e && window.removeEventListener("popstate", a);
    }
  };
}
function el(e, t) {
  const n = p(t.detached), a = p(() => n.value ? "" : e.search.value), r = p(() => n.value ? t.path() : e.path.value);
  return {
    search: a,
    path: r,
    push(s, l) {
      n.value ? e.push(s, l ?? t.path()) : e.push(s, l);
    },
    replace(s, l) {
      n.value ? e.push(s, l ?? t.path()) : e.replace(s, l);
    },
    href(s, l) {
      const i = l ?? (n.value ? t.path() : void 0);
      return e.href ? e.href(s, i) : `${i ?? e.path.value}${De(s)}`;
    }
  };
}
const rs = ["list", "cards", "grid", "images", "table", "links", "preview"], Av = [
  "minimal",
  "mono-size",
  "dark",
  "light",
  "auto",
  "macos",
  "windows",
  "inherit"
], Ut = ["ok", "running", "queued", "review", "failed"], Tv = [...Ut, "neutral", "accent"], Lv = [
  "identity",
  "reference",
  "metric",
  "state",
  "updated",
  "image",
  "tint"
], Ov = [480, 620, 760, 900, 1100], tl = "cards", nl = "table";
function tn(e, t = {}) {
  const n = (r) => r && ss(r) ? r : void 0;
  if (e === null) return n(t.view) ?? tl;
  const a = t.landing === "entity" ? n(t.view) : void 0;
  return n(t.entityView) ?? a ?? nl;
}
function Mr(e, t, n, a = {}) {
  return e === tn(t, a) ? tn(n, a) : e;
}
const Ea = "updated";
function ss(e) {
  return typeof e == "string" && rs.includes(e);
}
const al = {
  list: "List",
  cards: "Cards",
  grid: "Grid",
  images: "Images",
  table: "Table",
  links: "Links",
  preview: "Preview"
};
function Ka(e, t) {
  const [n] = t ?? [];
  return n === void 0 || t?.includes(e) ? e : n;
}
function nn(e, t) {
  return t ? e.entities.find((n) => n.key === t) ?? null : null;
}
function os(e, t = {}) {
  const n = nn(e, t.entity), a = e.entities[0];
  if (!n && !a) throw new Error(`Schema "${e.key}" declares no entities`);
  return n ?? a;
}
function ls(e, t = null) {
  return e?.columns ?? t?.columns ?? [];
}
function jn(e, t = null) {
  if (e?.sorts?.length) return e.sorts;
  const n = /* @__PURE__ */ new Set(), a = [];
  for (const r of ls(e, t))
    !r.sort || n.has(r.sort) || (n.add(r.sort), a.push({ key: r.sort, label: (r.label ?? r.sort).toLowerCase() }));
  return a;
}
const rl = { key: Ea, label: Ea };
function mt(e, t, n = null) {
  const a = jn(e, n);
  return (t ? a.find((s) => s.key === t) : void 0) ?? a.find((s) => s.key === Ea) ?? a[0] ?? rl;
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
function ol(e) {
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
function Wa(e) {
  return e.entity === null && e.expr.trim() === "";
}
function Rv(e) {
  return e.entity !== null;
}
function ja(e, t) {
  return e.entity === null && Ka(e.view, t) === "cards";
}
function ll(e, t) {
  return t <= 0 ? 1 : Math.max(1, Math.ceil(e / t));
}
function Ua(e, t = {}) {
  const a = t.landing === "entity" ? os(e, t) : null;
  return {
    entity: a?.key ?? null,
    view: tn(a?.key ?? null, t),
    sort: mt(a, t.sort).key,
    dir: t.dir === "asc" ? "asc" : "desc",
    expr: "",
    page: 1
  };
}
const Ga = ["entity", "sort", "dir", "expr"];
function pa(e) {
  return Ga.some((t) => t in e);
}
function Yt(e) {
  let t = 2166136261;
  for (let n = 0; n < e.length; n++)
    t ^= e.charCodeAt(n), t = Math.imul(t, 16777619);
  return Math.abs(t);
}
function il(e) {
  if (!Number.isFinite(e)) return "—";
  const t = Math.abs(e);
  return t >= 1e6 ? `${(e / 1e6).toFixed(1)}m` : t >= 1e3 ? `${(e / 1e3).toFixed(1)}k` : String(Math.round(e));
}
function Ot(e) {
  return Number.isFinite(e) ? Math.round(e).toLocaleString("en-US") : "—";
}
function cl(e) {
  const t = new Date(e);
  if (Number.isNaN(t.getTime())) return "—";
  const n = String(t.getUTCDate()).padStart(2, "0"), a = String(t.getUTCMonth() + 1).padStart(2, "0");
  return `${n}.${a}.${t.getUTCFullYear()}`;
}
function ul(e) {
  return String(e + 1).padStart(2, "0");
}
function zv(e, t) {
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
function dl(e) {
  if (e == null || !Number.isFinite(e) || e < 0) return "—";
  if (e < 1e3) return `${e} B`;
  const t = ["kB", "MB", "GB", "TB"];
  let n = e, a = -1;
  for (; n >= 1e3 && a < t.length - 1; )
    n /= 1e3, a += 1;
  return `${n < 100 ? n.toFixed(1) : Math.round(n)} ${t[a]}`;
}
function fl(e) {
  if (!e || !Number.isFinite(e)) return "—";
  if (e < 1e3) return `${Math.round(e)}ms`;
  const t = e / 1e3;
  return t < 60 ? `${t.toFixed(1)}s` : `${Math.floor(t / 60)}m ${Math.round(t % 60)}s`;
}
function pl(e) {
  if (e == null || !Number.isFinite(e) || e <= 0)
    return "—";
  const t = Math.floor(e / 60);
  return t ? `${t}:${String(e % 60).padStart(2, "0")}` : `${e}s`;
}
function vl(e) {
  return e == null || !Number.isFinite(e) ? "—" : `${Math.round(e * 100)}%`;
}
function hl(e) {
  return e.replace(/\x1b\[[0-9;?]*[ -/]*[@-~]/g, "");
}
const it = "—";
function Xe(e, t) {
  return e.find((n) => n.role === t);
}
function is(e, t) {
  return e.filter((n) => n.role === t);
}
function ml(e, t) {
  const n = (t ? t.columns : e?.columns) ?? [], a = t ? "scoped" : "everything";
  return n.filter(
    (r) => r.role !== "tint" && ((r.when ?? "always") === "always" || r.when === a)
  );
}
const gl = ["id", "entityKey", "entityLabel"];
function He(e, t) {
  if (e.value) return e.value(t);
  const n = e.field ?? e.key;
  if (n !== void 0) {
    if (t.fields && n in t.fields) return t.fields[n];
    if (gl.includes(n))
      return t[n];
  }
}
function Cr(e, t) {
  const n = e.key ?? e.field ?? e.label;
  return n?.trim() ? n.trim() : `column-${t}`;
}
function yl(e, t) {
  return e.id?.trim() ? e.id : `${e.entityKey || "row"}-${t}`;
}
function _l(e, t) {
  if (e == null || e === "") return it;
  if (t === "number") {
    const n = typeof e == "number" ? e : Number(e);
    return Number.isFinite(n) ? il(n) : String(e);
  }
  return t === "date" ? cl(String(e)) : Array.isArray(e) ? e.length ? e.join(", ") : it : String(e);
}
function Ft(e, t) {
  const n = He(e, t);
  return e.format ? e.format(n, t) : _l(n, e.kind);
}
function wl(e) {
  return typeof e == "number" ? Number.isFinite(e) ? String(e) : "" : typeof e == "string" ? e : Array.isArray(e) ? e.join(", ") : "";
}
function cs(e, t) {
  const n = Ft(e, t), a = wl(He(e, t));
  return a && a !== n ? a : n;
}
function Mn(e, t) {
  return e ? Ft(e, t) : "";
}
function Er(e) {
  return e.align ? e.align : e.kind === "number" || e.kind === "ordinal" ? "right" : "left";
}
const kl = {
  ordinal: "dc-table__num",
  number: "dc-table__number",
  date: "dc-table__date",
  status: "dc-table__state"
};
function Pr(e) {
  return [kl[e.kind ?? "text"], e.class].filter(Boolean).join(" ");
}
function Pa(e) {
  if (e.truncate !== void 0) return e.truncate;
  const t = e.kind ?? "text";
  return t === "text" || t === "number" || t === "date";
}
const bl = /^([A-Za-z_][\w.-]*)\s*(>=|<=|:|=|>|<)\s*(.*)$/, Ar = "-?(?:\\d+\\.?\\d*|\\.\\d+)", $l = new RegExp(`^(${Ar})?\\.\\.(${Ar})?$`);
function Un(e) {
  const t = $l.exec(e.trim());
  if (!t || t[1] === void 0 && t[2] === void 0) return null;
  const n = t[1] === void 0 ? null : Number(t[1]), a = t[2] === void 0 ? null : Number(t[2]);
  return n !== null && a !== null && n > a ? { min: a, max: n } : { min: n, max: a };
}
function xl(e) {
  return `${e.min ?? ""}..${e.max ?? ""}`;
}
function an(e) {
  return e.kind === "field" && (e.comparator === ":" || e.comparator === "=") && Un(e.value) !== null;
}
function Sl(e) {
  const t = [];
  let n = "", a = null;
  const r = () => {
    n && t.push(n), n = "";
  };
  for (let s = 0; s < e.length; s++) {
    const l = e[s];
    if (a) {
      l === a ? a = null : n += l;
      continue;
    }
    if (l === '"' || l === "'") {
      a = l;
      continue;
    }
    if (/\s/.test(l)) {
      if (/(?:>=|<=|[:=><])$/.test(n) || e.slice(s + 1).match(/^\s*(>=|<=|[:=><])/) && n) continue;
      r();
      continue;
    }
    n += l;
  }
  return r(), t;
}
function Te(e) {
  const t = e.trim();
  if (!t) return [];
  const n = [];
  let a = [];
  for (const r of Sl(t)) {
    const s = r.toUpperCase();
    if (s === "AND" || s === "&&") continue;
    if (s === "OR" || s === "||") {
      a.length && n.push(a), a = [];
      continue;
    }
    const l = r.length > 1 && r.startsWith("-"), i = l ? r.slice(1) : r, o = l ? { negated: !0 } : {}, c = bl.exec(i);
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
const gt = (e) => e.toLowerCase().replace(/\s+/g, ""), us = [
  ["status", "state"],
  ["state", "state"],
  ["updated", "updated"],
  ["date", "updated"],
  ["name", "identity"],
  ["ref", "reference"]
];
function Ml(e, t, n) {
  const a = gt(e), r = n.columns ?? [];
  if (a === "entity") return t.entityKey;
  if (e in t.fields) return t.fields[e];
  const s = r.find(
    (c) => c.key?.toLowerCase() === e.toLowerCase() || c.field?.toLowerCase() === e.toLowerCase() || c.label !== void 0 && gt(c.label) === a
  );
  if (s) return He(s, t);
  const l = n.facets.find(
    (c) => c.key.toLowerCase() === a || gt(c.label) === a
  );
  if (l && l.key in t.fields) return t.fields[l.key];
  const i = us.find(([c]) => c === a)?.[1];
  if (i) {
    const c = Xe(r, i);
    if (c) return He(c, t);
  }
  const o = /^metric(\d+)$/.exec(a);
  if (o) {
    const c = is(r, "metric")[Number(o[1]) - 1];
    if (c) return He(c, t);
  }
}
function dn(e) {
  return (e.toLowerCase().match(/[\p{L}\p{N}]+/gu) ?? []).map((t) => t.charAt(0)).join("");
}
const Tr = /^[a-z_][\w.-]*$/;
function Gn(e) {
  const t = (e.key ?? e.field)?.toLowerCase();
  if (t !== void 0) return Tr.test(t) ? t : void 0;
  const n = e.label === void 0 ? void 0 : gt(e.label);
  return n !== void 0 && Tr.test(n) ? n : void 0;
}
function Ya(e, t) {
  const n = gt(e);
  return !!t?.entities.some((a) => a.scope && gt(a.scope) === n);
}
function Cl(e, t, n) {
  const a = gt(e);
  if (a === "entity" || us.some(([s]) => s === a) || /^metric\d+$/.test(a) || Ya(e, n)) return !0;
  const r = (s) => s !== void 0 && gt(s) === a;
  return (t.columns ?? []).some(
    (s) => r(s.key) || r(s.field) || r(s.label)
  ) || t.facets.some((s) => r(s.key) || r(s.label));
}
function rn(e, t, n) {
  return t ? fs(e, (a) => {
    const r = ps(a, t, n);
    return r && Gn(r);
  }) : e;
}
function ds(e, t, n) {
  return t ? fs(e, (a) => {
    if (Ya(a, n)) return;
    const r = (t.columns ?? []).find((s) => Gn(s) === a);
    return r && vs(r, t, n);
  }) : e;
}
function El(e, t, n) {
  if (!t || Ya(e, n)) return;
  const a = t.facets.find((r) => r.key.toLowerCase() === e);
  return a ? a.label : (t.columns ?? []).find((r) => Gn(r) === e)?.label;
}
function fs(e, t) {
  let n = !1;
  const a = Te(e).map(
    (r) => r.map((s) => {
      if (s.kind !== "field") return s;
      const l = t(s.field);
      return !l || l === s.field ? s : (n = !0, { ...s, field: l });
    })
  );
  return n ? ot(a) : e;
}
function ps(e, t, n) {
  if (!(!e || Cl(e, t, n)))
    return (t.columns ?? []).find(
      (a) => a.label !== void 0 && dn(a.label) === e
    );
}
function vs(e, t, n) {
  if (!t || e.label === void 0 || !Gn(e)) return;
  const a = dn(e.label);
  return ps(a, t, n) === e ? a : void 0;
}
function va(e, t) {
  const n = e.toLowerCase(), a = t.toLowerCase();
  if (!a.includes("*")) return n.includes(a);
  const r = a.replace(/[.+?^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*");
  return new RegExp(r).test(n);
}
function Lr(e, t) {
  return e.toLowerCase() === t.toLowerCase();
}
function Pl(e, t, n, a) {
  if (e.kind === "text") {
    const o = n.columns ?? [];
    return ["identity", "reference"].some((c) => {
      const u = Xe(o, c), m = u ? He(u, t) : void 0;
      return typeof m == "string" && va(m, e.value);
    });
  }
  const r = Ml(e.field, t, n);
  if (r === void 0) return a?.has(e.field) ? !1 : null;
  const s = an(e) ? Un(e.value) : null;
  if (s) {
    if (Array.isArray(r) || typeof r == "boolean") return null;
    const o = typeof r == "number" ? r : Number(r);
    return Number.isFinite(o) ? (s.min === null || o >= s.min) && (s.max === null || o <= s.max) : null;
  }
  if (Array.isArray(r))
    return e.comparator === ":" || e.comparator === "=" ? r.some(
      (c) => e.comparator === "=" ? Lr(String(c), e.value) : va(String(c), e.value)
    ) : null;
  if (e.comparator === ":" || e.comparator === "=") {
    if (typeof r == "boolean") {
      const o = e.value.toLowerCase();
      return o === "true" || o === "yes" ? r : o === "false" || o === "no" ? !r : null;
    }
    if (typeof r == "number") {
      const o = Number(e.value);
      return Number.isFinite(o) ? r === o : null;
    }
    return e.comparator === "=" ? Lr(String(r), e.value) : va(String(r), e.value);
  }
  const l = Number(e.value), i = typeof r == "number" ? r : Number(r);
  return !Number.isFinite(l) || !Number.isFinite(i) ? null : Al(e.comparator, i, l);
}
function Or(e, t, n, a) {
  const r = Pl(e, t, n, a);
  return r === null ? !0 : e.negated ? !r : r;
}
function Al(e, t, n) {
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
function Rr(e) {
  return e.kind === "field" && !e.negated && (e.comparator === ":" || e.comparator === "=") && !an(e);
}
const zr = /* @__PURE__ */ new WeakMap();
function Tl(e) {
  if (!e?.strictScopes) return null;
  let t = zr.get(e);
  return t || (t = new Set(
    e.entities.flatMap((n) => n.scope ? [n.scope.toLowerCase()] : [])
  ), zr.set(e, t)), t;
}
function Ll(e, t, n, a) {
  if (!e.length) return !0;
  const r = Tl(a);
  return e.some((s) => {
    const l = /* @__PURE__ */ new Map();
    for (const i of s)
      Rr(i) && l.set(
        i.field,
        (l.get(i.field) ?? !1) || Or(i, t, n, r)
      );
    return s.every(
      (i) => Rr(i) ? l.get(i.field) === !0 : Or(i, t, n, r)
    );
  });
}
function Ir(e) {
  return /[\s"']/.test(e) ? `"${e.replace(/["']/g, "")}"` : e;
}
function $t(e) {
  const t = e.negated ? "-" : "";
  return e.kind === "text" ? t + Ir(e.value) : `${t}${e.field}${e.comparator}${Ir(e.value)}`;
}
function Ol(e) {
  if (!e.negated) return { ...e, negated: !0 };
  const { negated: t, ...n } = e;
  return n;
}
function ot(e) {
  return e.filter((t) => t.length).map((t) => t.map($t).join(" ")).join(" OR ");
}
function Rl(e, t, n) {
  return e.map((a, r) => r === t ? a.filter((s, l) => l !== n) : a).filter((a) => a.length);
}
function Iv(e) {
  const t = Te(e);
  if (t.length > 1) return { parts: [], text: e.trim() };
  const n = t[0] ?? [];
  return {
    parts: n.filter((a) => a.kind === "field"),
    text: n.filter((a) => a.kind === "text").map($t).join(" ")
  };
}
function Nv(e, t) {
  return [...e.map($t), t.trim()].filter(Boolean).join(" ");
}
const Nr = (e, t) => e.toLowerCase() === t.toLowerCase();
function Aa(e, t) {
  return !!e.negated == !!t.negated && hs(e, t);
}
function zl(e, t) {
  return !!e.negated != !!t.negated && hs(e, t);
}
function hs(e, t) {
  return e.kind === "field" ? t.kind === "field" && e.field === t.field && e.comparator === t.comparator && Nr(e.value, t.value) : t.kind === "text" && Nr(e.value, t.value);
}
function Il(e, t) {
  return t.filter((n) => !e.some((a) => Aa(a, n)));
}
function Xa(e, t) {
  return ms(e, t, (n) => n);
}
function Ta(e, t) {
  return ms(
    e,
    t,
    (n, a) => n.filter((r) => !a.some((s) => zl(r, s)))
  );
}
const Nl = /^[A-Za-z_][\w.-]*\s*(?:>=|<=|:|=|>|<)$/;
function Bl(e) {
  return ot(
    Te(e).map(
      (t) => t.filter(
        (n) => n.kind !== "text" || n.value !== "-" && !Nl.test(n.value)
      )
    ).filter((t) => t.length > 0)
  );
}
function ms(e, t, n) {
  const a = Te(e), r = Te(t);
  return a.length ? r.length ? ot(
    a.flatMap(
      (s) => r.map((l) => [...n(s, l), ...Il(s, l)])
    )
  ) : ot(a) : ot(r);
}
const gs = (e) => e.kind === "date" || e.role === "updated";
function Fl(e) {
  if (!e) return () => 0;
  const n = (e.kind ?? "text") === "number" || e.role === "metric", a = gs(e);
  return (r, s) => {
    const l = He(e, r), i = He(e, s);
    return n ? Number(i ?? 0) - Number(l ?? 0) : a ? Date.parse(String(i ?? "")) - Date.parse(String(l ?? "")) : String(i ?? "").localeCompare(String(l ?? ""));
  };
}
function Br(e, t) {
  return !t || !gs(t) ? !1 : !Number.isFinite(Date.parse(String(He(t, e) ?? "")));
}
function ys({ query: e, schema: t, entity: n, limit: a, offset: r }, s, l) {
  const i = Te(e.expr), o = n ? [n] : t.entities;
  let c = 0;
  const u = [];
  for (const $ of o)
    for (const g of s($))
      c += 1, Ll(i, g, $, t) && u.push(g);
  const m = mt(n, e.sort, t), x = ls(n, t).find(($) => $.sort === m.key), b = l.undatedLast ? u.filter(($) => !Br($, x)) : u, w = l.undatedLast ? u.filter(($) => Br($, x)) : [];
  b.sort(Fl(x)), e.dir === "asc" && b.reverse();
  const y = w.length ? [...b, ...w] : b;
  return {
    // One page out of the middle. `total` stays the whole match, which is what
    // the shell counts pages with.
    rows: l.zeroIsAll && a <= 0 ? y.slice(r) : y.slice(r, r + a),
    total: u.length,
    unfiltered: u.length === c
  };
}
const Rn = [
  "oklch(0.36 0.06 240)",
  "oklch(0.34 0.07 290)",
  "oklch(0.36 0.06 160)",
  "oklch(0.38 0.06 80)",
  "oklch(0.35 0.07 30)",
  "oklch(0.34 0.05 200)"
];
function Bv(e) {
  return Rn[Yt(e) % Rn.length];
}
function _s(e, t) {
  return `${e}_${1e4 + t * 7}`;
}
const Dl = 7, Hl = 3;
function ql(e, t, n, a) {
  const r = (t * Dl + Yt(n)) % a, s = [];
  for (let l = 0; l < Math.min(Hl, a); l++)
    s.push(_s(e, (r + l) % a));
  return s;
}
function Vl(e, t) {
  switch (e.kind) {
    case "chips":
      return e.multiple ? Kl(e.options, t) : e.options[t % e.options.length] ?? "";
    case "range": {
      const n = Math.max(0, e.max - e.min);
      return e.min + (n === 0 ? 0 : t % (n + 1));
    }
    case "toggle":
      return t % 3 === 0;
  }
}
function Kl(e, t) {
  if (!e.length) return [];
  const n = 1 + (t >> 5) % Math.min(3, e.length), a = t % e.length, r = /* @__PURE__ */ new Set();
  for (let s = 0; s < n; s++) r.add((a + s) % e.length);
  return [...r].sort((s, l) => s - l).map((s) => e[s]);
}
function Wl(e, t) {
  const { hash: n, sample: a, revision: r, updatedAt: s } = t, l = r ? ` · rev ${r + 1}` : "";
  switch (e.role) {
    case "identity":
      return `${a[0]}${l}`;
    case "reference":
      return r ? `${a[1]}-${r + 1}` : a[1];
    case "state":
      return Ut[n % Ut.length];
    case "updated":
      return s;
    case "tint":
      return Rn[n % Rn.length];
    case "metric":
      return 1 + n % 940;
  }
  switch (e.kind) {
    case "number":
      return 1 + n % 940;
    case "status":
      return Ut[n % Ut.length];
    case "date":
      return s;
    default:
      return;
  }
}
function jl(e, t = {}) {
  const n = t.population ?? 48, a = t.seed ?? "", r = t.now ?? /* @__PURE__ */ new Date("2026-08-25T00:00:00Z"), s = e.samples, l = t.scopes ?? [];
  if (!s.length) return [];
  const i = [];
  for (let o = 0; o < n; o++) {
    const c = s[o % s.length], u = Math.floor(o / s.length), m = Yt(`${a}:${e.key}:${c[0]}:${o}`), x = _s(e.key, o), b = new Date(r.getTime() - m % 900 * 36e5).toISOString(), w = {};
    for (const y of e.columns ?? []) {
      const $ = y.field ?? y.key;
      if (!$ || y.value) continue;
      const g = Wl(y, {
        hash: Yt(`${m}:${$}`),
        sample: c,
        revision: u,
        updatedAt: b
      });
      g !== void 0 && (w[$] = g);
    }
    for (const y of e.facets)
      w[y.key] = Vl(y, Yt(`${m}:${y.key}`));
    for (const [y, $] of l)
      w[y] = $ === e.key ? x : ql($, o, y, n);
    i.push({ id: x, entityKey: e.key, entityLabel: e.label, fields: w });
  }
  return i;
}
function Ul(e = {}) {
  const t = /* @__PURE__ */ new Map(), n = (a, r) => {
    const s = t.get(a.key);
    if (s) return s;
    const l = e.scopes ?? r.entities.flatMap(
      (o) => o.scope ? [[o.scope, o.key]] : []
    ), i = jl(a, { ...e, scopes: l });
    return t.set(a.key, i), i;
  };
  return {
    query(a) {
      return ys(a, (r) => n(r, a.schema), {
        undatedLast: !1,
        zeroIsAll: !1
      });
    }
  };
}
const qt = "e", Yn = "v", Qa = "s", Za = "d", Ct = "q", Xn = "p", ws = "*", Gl = [
  qt,
  Yn,
  Qa,
  Za,
  Ct,
  Xn
], Yl = [
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
function zn(e) {
  let t = encodeURIComponent(e);
  for (const [n, a] of Yl) t = t.replace(n, a);
  return t;
}
function st(e) {
  try {
    return decodeURIComponent(e.replace(/\+/g, " "));
  } catch {
    return e.replace(/\+/g, " ");
  }
}
function Ja(e) {
  const t = e.replace(/^[?]/, "");
  if (!t) return [];
  const n = [];
  for (const a of t.split("&")) {
    if (!a) continue;
    const r = a.indexOf("="), s = r === -1 ? a : a.slice(0, r), l = r === -1 ? "" : a.slice(r + 1);
    n.push([st(s), l]);
  }
  return n;
}
function Xl(e) {
  return Gl.includes(e);
}
function Qn(e, t) {
  if (!(!t || e.some((n) => n.key === t)))
    return e.find((n) => dn(n.label) === t);
}
function Ql(e, t) {
  const n = dn(e.label);
  return Qn(t.entities, n)?.key === e.key ? n : e.key;
}
function ks(e, t) {
  return t ? nn(e, t) ?? Qn(e.entities, t) ?? null : null;
}
function Zl(e, t) {
  const n = dn(e.label);
  return Qn(t, n)?.key === e.key ? n : e.key;
}
function Jl(e, t) {
  return t.some((n) => n.key === e) ? e : Qn(t, e)?.key ?? e;
}
function ei(e, t, n = {}) {
  const a = Ua(t, n), r = new Map(Ja(e)), s = r.get(qt), l = s === void 0 ? a.entity : st(s), i = l === ws ? null : ks(t, l), o = r.get(Yn), c = o && ss(st(o)) ? st(o) : tn(i?.key ?? null, n), u = r.get(Qa), m = mt(
    i,
    u ? Jl(st(u), jn(i, t)) : n.sort,
    t
  ), x = r.get(Za), b = x ? st(x) === "asc" ? "asc" : "desc" : a.dir, w = r.get(Ct), y = r.get(Xn), $ = y === void 0 ? 1 : Number(st(y)), g = Number.isFinite($) ? Math.max(1, Math.floor($)) : 1;
  return {
    entity: i?.key ?? null,
    view: c,
    sort: m.key,
    dir: b,
    expr: w === void 0 ? "" : rn(st(w), i, t),
    page: g
  };
}
function ha(e, t, n = {}, a = "") {
  const r = Ua(t, n), s = nn(t, e.entity), l = Ja(a).filter(([m]) => !Xl(m)), i = [], o = (m, x) => i.push([m, zn(x)]), c = s?.key ?? null;
  if (c !== r.entity && o(qt, s ? Ql(s, t) : ws), e.view !== tn(c, n) && o(Yn, e.view), e.sort !== r.sort) {
    const m = jn(s, t), x = m.find((b) => b.key === e.sort);
    o(Qa, x ? Zl(x, m) : e.sort);
  }
  e.dir !== r.dir && o(Za, e.dir), e.expr.trim() !== "" && o(Ct, ds(e.expr, s, t)), e.page > 1 && o(Xn, String(e.page));
  const u = [
    ...l.map(([m, x]) => [zn(m), x]),
    ...i
  ];
  return u.length ? `?${u.map(([m, x]) => x === "" ? m : `${m}=${x}`).join("&")}` : "";
}
function Fv(e) {
  const t = [];
  for (const [n, a] of Object.entries(e))
    for (const r of Array.isArray(a) ? a : [a]) {
      if (typeof r != "string") continue;
      const s = zn(n);
      t.push(r === "" ? s : `${s}=${zn(r)}`);
    }
  return t.length ? `?${t.join("&")}` : "";
}
function Dv(e, t) {
  const n = new Map(Ja(e)), a = n.get(Ct), r = a === void 0 ? "" : st(a);
  if (!t) return r;
  const s = n.get(qt);
  return rn(
    r,
    s === void 0 ? null : ks(t, st(s)),
    t
  );
}
function Zn(e, t) {
  return bs(e, t.id);
}
function bs(e, t) {
  const n = e?.scope;
  return n ? $s(n, t) : null;
}
function $s(e, t) {
  return `${e}="${t.replace(/"/g, "")}"`;
}
function Hv(e, t) {
  const n = typeof e == "string" ? e : e?.scope;
  if (!n) return null;
  const a = t.filter((r) => r.replace(/"/g, "") !== "").map((r) => $s(n, r));
  return a.length ? a.join(" ") : null;
}
function Jn(e, t) {
  if (e.kind !== "field" || t.kind !== "field") return Aa(e, t);
  const n = (a) => a.comparator === ":" || a.comparator === "=";
  return Aa(e, { ...t, comparator: n(e) && n(t) ? e.comparator : t.comparator });
}
function In(e, t) {
  return Jn(e, Ol(t));
}
function Nn(e, t) {
  return Zn(
    e.entities.find((n) => n.key === t.entityKey),
    t
  );
}
function fn(e, t) {
  if (!t) return e;
  const n = e.trim();
  if (!n) return t;
  const [a] = Te(t).flat();
  if (!a) return n;
  const r = Te(n);
  return r.some((i) => i.some((o) => Jn(o, a))) ? n : r.some((i) => i.some((o) => In(o, a))) ? ot(
    r.map(
      (i) => i.map((o) => In(o, a) ? a : o)
    )
  ) : `${n} ${t}`;
}
function xs(e) {
  if (!e) return null;
  const t = e.trim();
  return t ? t.startsWith("-") ? t.slice(1) : `-${t}` : null;
}
function er(e, t) {
  if (!t || !e.trim()) return null;
  const [n] = Te(t).flat();
  if (!n) return null;
  const a = Te(e).flat();
  return a.some((r) => Jn(r, n)) ? n.negated ? "out" : "in" : a.some((r) => In(r, n)) ? n.negated ? "in" : "out" : null;
}
function Ss(e, t) {
  if (!t || !e.trim()) return e;
  const [n] = Te(t).flat();
  if (!n) return e;
  const a = Te(e), r = a.map(
    (s) => s.filter((l) => !Jn(l, n) && !In(l, n))
  );
  return r.every((s, l) => s.length === a[l]?.length) ? e : ot(r);
}
function La(e, t, n) {
  return t ? n === null ? Ss(e, t) : fn(e, n === "out" ? xs(t) : t) : e;
}
function Ms(e) {
  return e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0;
}
function ea(e) {
  return e.altKey ? { exclude: !0 } : {};
}
function ma(e, t, n, a = {}) {
  const r = Nn(e, n);
  return fn(t.expr, a.exclude ? xs(r) : r);
}
function Cs(e, t) {
  const n = e?.scope?.toLowerCase();
  if (!n || e?.keepsScope || !t.trim()) return t;
  const a = Te(t), r = a.map(
    (s) => s.filter((l) => l.kind !== "field" || l.field !== n)
  );
  return r.every((s, l) => s.length === a[l]?.length) ? t : ot(r);
}
function Es(e, t) {
  const n = t.toLowerCase();
  return e.entities.find((a) => a.scope?.toLowerCase() === n) ?? null;
}
function Ps(e, t, n) {
  if (!t || !n) return null;
  const a = Es(e, t);
  return a ? { entity: a, id: n } : null;
}
function ti(e, t) {
  const n = [], a = /* @__PURE__ */ new Set();
  for (const r of t)
    for (const s of Te(r).flat()) {
      if (s.kind !== "field" || s.negated) continue;
      const l = Ps(e, s.field, s.value);
      if (!l) continue;
      const i = `${l.entity.key}:${l.id.toLowerCase()}`;
      a.has(i) || (a.add(i), n.push({ entityKey: l.entity.key, id: l.id }));
    }
  return n;
}
function qv(e, t, n = "cards") {
  return {
    // An expression with nothing in it is no parameter, as the shell writes it.
    [Ct]: fn(e, t) || void 0,
    [qt]: void 0,
    [Yn]: n,
    [Xn]: void 0
  };
}
const As = Symbol("dc.shellContext");
function ni(e) {
  const t = e.liveQuery ? e : ai(e);
  return ln(As, t), t;
}
function ai(e) {
  const t = e.draft ?? V("");
  return {
    draft: t,
    liveQuery: e.query,
    drafting: p(() => !1),
    commitDraft() {
      const n = t.value.trim();
      n && (e.setExpression(
        Ta(e.query.value.expr, rn(n, e.entity.value, e.schema.value))
      ), t.value = "");
    },
    abandonDraft() {
      t.value = "";
    },
    ...e
  };
}
function Ce() {
  const e = Mt(As, null);
  if (!e)
    throw new Error(
      "[header-content-layout] No shell context found. Render this component inside <DataShell>."
    );
  return e;
}
const Bn = Symbol("dc-shell-theme");
function Oa(e) {
  return {
    read: () => ({
      theme: ut(e.theme),
      accent: ut(e.accent),
      tokens: ut(e.tokens)
    })
  };
}
function ri(e, t) {
  t ? t.provide(Bn, Oa(e)) : ln(Bn, Oa(e));
}
function si(e) {
  const t = ts();
  ln(Bn, {
    ...Oa(e),
    element: () => t?.proxy?.$el ?? null
  });
}
function tr(e) {
  const t = ts(), n = Mt(Bn, null), a = ft(null);
  function r() {
    const o = t?.proxy?.$el, u = (o instanceof Element ? o : o?.parentElement)?.closest(".dc-shell");
    if (!u) {
      a.value = null;
      return;
    }
    const m = {};
    for (const x of Array.from(u.style))
      x.startsWith("--") && (m[x] = u.style.getPropertyValue(x));
    a.value = { shell: u, theme: u.dataset.dcTheme, tokens: m };
  }
  const s = p(() => {
    const o = a.value;
    if (!n) return o;
    const c = n.element?.();
    return o && c && o.shell !== c && c.contains(o.shell) ? o : n.read();
  }), l = p(() => e.theme ?? s.value?.theme ?? "minimal"), i = p(() => {
    const o = s.value, c = {
      ...o?.tokens,
      ...o?.accent ? { "--dc-accent": o.accent } : {},
      ...e.tokens,
      ...e.accent ? { "--dc-accent": e.accent } : {}
    };
    return Object.keys(c).length ? c : void 0;
  });
  return { theme: l, style: i, adopt: r };
}
function Ts(e) {
  return e.key.toLowerCase();
}
const oi = /* @__PURE__ */ new Set([">", ">=", "<", "<="]);
function Ls(e, t) {
  if (e.kind !== "field" || e.negated || e.field !== Ts(t)) return !1;
  const n = e.comparator === ":" || e.comparator === "=";
  switch (t.kind) {
    case "range":
      return an(e) || oi.has(e.comparator);
    case "chips":
      return n && !an(e) && Os(t.options, e.value) !== void 0;
    case "toggle":
      return n && li(e.value);
  }
}
function Os(e, t) {
  const n = t.toLowerCase();
  return e.find((a) => a.toLowerCase() === n);
}
function li(e) {
  const t = e.toLowerCase();
  return t === "true" || t === "yes";
}
function Rs(e, t) {
  const n = (Te(e)[0] ?? []).filter((a) => Ls(a, t));
  switch (t.kind) {
    case "range": {
      let a = null, r = null;
      for (const s of n) {
        const l = Un(s.value), i = Number(s.value);
        l ? (l.min !== null && (a = l.min), l.max !== null && (r = l.max)) : Number.isFinite(i) && (s.comparator.startsWith(">") ? a = i : r = i);
      }
      return { kind: "range", min: a, max: r };
    }
    case "chips": {
      const a = new Set(n.map((r) => Os(t.options, r.value)));
      return { kind: "chips", selected: t.options.filter((r) => a.has(r)) };
    }
    case "toggle":
      return { kind: "toggle", on: n.length > 0 };
  }
}
function ii(e, t) {
  const n = Ts(e);
  switch (t.kind) {
    case "range":
      return t.min === null && t.max === null ? [] : [{ kind: "field", field: n, comparator: ":", value: xl(t) }];
    case "chips":
      return t.selected.map((a) => ({ kind: "field", field: n, comparator: "=", value: a }));
    case "toggle":
      return t.on ? [{ kind: "field", field: n, comparator: ":", value: "true" }] : [];
  }
}
function zs(e, t, n) {
  const a = ii(t, n), r = Te(e), s = (r.length ? r : [[]]).map((l) => [
    ...l.filter((i) => !Ls(i, t)),
    ...a
  ]);
  return ot(s);
}
function Vv(e, t) {
  return zs(e, t, sl(t));
}
function ci(e, t) {
  return (t?.facets ?? []).some((n) => ol(Rs(e, n)));
}
const Fn = "entity", sn = "expr", ui = { ">=": "≥", "<=": "≤", ">": ">", "<": "<" };
function di(e, t, n) {
  if (e.kind !== "field") return $t(e);
  const a = El(e.field, t, n);
  if (a === void 0) return $t(e);
  const r = e.negated ? "-" : "", s = an(e) ? Un(e.value) : null;
  if (s) {
    const i = s.min !== null && s.max !== null ? `${s.min} ≤ ${a} ≤ ${s.max}` : s.max !== null ? `${a} ≤ ${s.max}` : `${a} ≥ ${s.min}`;
    return r + i;
  }
  const l = ui[e.comparator];
  return l ? `${r}${a} ${l} ${e.value}` : $t({ ...e, field: a });
}
function nr(e, t, n = null) {
  const a = [];
  return t && a.push({
    id: Fn,
    label: `entity:${t.key}`,
    facetKey: Fn
  }), Te(e.expr).forEach((r, s) => {
    r.forEach((l, i) => {
      a.push({
        id: `${sn}:${s}:${i}`,
        label: di(l, t, n),
        address: ds($t(l), t, n),
        facetKey: sn,
        group: s,
        index: i,
        ...l.kind === "field" ? { field: l.field, value: l.value } : {},
        ...l.negated ? { negated: !0 } : {}
      });
    });
  }), a;
}
function fi(e, t, n = null) {
  if (Wa(e)) {
    const s = mt(t, e.sort, n);
    return `everything · ${e.view} · ${s.label}`;
  }
  const a = nr(e, t).filter((s) => s.facetKey !== sn).map((s) => s.label), r = e.expr.trim();
  return r && a.push(`"${r}"`), a.join(" · ");
}
function pi(e) {
  const { adapter: t } = e, n = p(() => ut(e.schema)), a = p(() => ut(e.defaults) ?? {}), r = p(() => ei(t.search.value, n.value, a.value)), s = p(() => nn(n.value, r.value.entity)), l = p(() => s.value ?? os(n.value, a.value)), i = p(() => jn(s.value, n.value)), o = p(() => mt(s.value, r.value.sort, n.value)), c = (g, M) => {
    const k = ha(g, n.value, a.value, t.search.value);
    return k === t.search.value ? !1 : (M === "push" ? t.push(k) : t.replace(k), !0);
  }, u = () => ut(e.navigationMode) ?? "push", m = () => ut(e.facetNavigationMode) ?? "replace", x = (g, M) => {
    const k = g.page ?? (pa(g) ? 1 : r.value.page);
    return c({ ...r.value, ...g, page: k }, M);
  }, b = (g) => {
    const M = g.page ?? (pa(g) ? 1 : r.value.page), k = ha({ ...r.value, ...g, page: M }, n.value, a.value, t.search.value);
    return t.href ? t.href(k) : `${t.path.value}${k}`;
  }, w = (g, M) => {
    const k = s.value?.facets.find((C) => C.key === g);
    if (!k) return;
    const S = zs(r.value.expr, k, M(Rs(r.value.expr, k)));
    x({ expr: S }, m());
  }, y = (g) => {
    const M = g === null ? null : nn(n.value, g);
    return (M?.key ?? null) === r.value.entity ? {} : {
      entity: M?.key ?? null,
      view: Mr(r.value.view, r.value.entity, M?.key ?? null, a.value),
      sort: mt(M, r.value.sort, n.value).key
    };
  }, $ = (g) => {
    const M = y(g);
    Object.keys(M).length && x(M, u());
  };
  return {
    query: r,
    entity: s,
    focus: l,
    sort: o,
    sorts: i,
    summary: p(() => fi(r.value, s.value, n.value)),
    terms: p(() => nr(r.value, s.value, n.value)),
    isPristine: p(() => Wa(r.value)),
    isEverything: p(() => r.value.entity === null),
    hasFacets: p(() => ci(r.value.expr, s.value)),
    setEntity: $,
    entityHref: (g) => b(y(g)),
    clearEntity: () => $(null),
    setView(g) {
      x({ view: g }, u());
    },
    setSort(g) {
      x({ sort: mt(s.value, g, n.value).key }, u());
    },
    toggleDirection() {
      x({ dir: r.value.dir === "desc" ? "asc" : "desc" }, u());
    },
    setExpression(g) {
      return x({ expr: g }, u());
    },
    narrow(g, M, k) {
      return x({ expr: g, ...y(M), ...k ? { view: k } : {} }, u());
    },
    narrowHref(g, M, k) {
      return b({ expr: g, ...y(M), ...k ? { view: k } : {} });
    },
    setPage(g, M) {
      x({ page: Math.max(1, Math.floor(g)) }, M ?? u());
    },
    setFacet(g, M) {
      w(g, () => M);
    },
    toggleChip(g, M) {
      w(g, (k) => k.kind !== "chips" ? k : { kind: "chips", selected: k.selected.includes(M) ? k.selected.filter((C) => C !== M) : [...k.selected, M] });
    },
    setRange(g, M, k) {
      w(g, (S) => S.kind === "range" ? { kind: "range", min: M, max: k } : S);
    },
    toggleFlag(g) {
      w(
        g,
        (M) => M.kind === "toggle" ? { kind: "toggle", on: !M.on } : M
      );
    },
    removeTerm(g) {
      if (g.facetKey === Fn) {
        $(null);
        return;
      }
      if (g.facetKey === sn) {
        const M = Rl(Te(r.value.expr), g.group ?? 0, g.index ?? 0);
        x({ expr: ot(M) }, u());
      }
    },
    clearFilters() {
      x({ ...y(null), expr: "" }, u());
    },
    reset() {
      c(Ua(n.value, a.value), u());
    },
    hrefFor(g) {
      const M = { ...r.value, ...g };
      return "entity" in g && !("view" in g) && (M.view = Mr(r.value.view, r.value.entity, M.entity, a.value)), M.page = g.page ?? (pa(g) ? 1 : r.value.page), `${t.path.value}${ha(M, n.value, a.value, t.search.value)}`;
    }
  };
}
function vi(e) {
  const t = ft([]), n = V(0), a = V(!1), r = V(!1), s = ft(null);
  let l = 0, i = null, o = null;
  const c = p(() => (e.query.value.page - 1) * e.limit.value), u = p(() => ll(n.value, e.limit.value)), m = () => {
    const S = e.query.value, C = e.within?.value.trim(), z = Cs(e.entity.value, S.expr);
    return C ? { ...S, expr: Xa(C, z) } : z === S.expr ? S : { ...S, expr: z };
  }, x = (S, C) => {
    t.value = S.rows, n.value = S.total, s.value = null, b(C);
  }, b = (S) => {
    i = { key: S, total: n.value }, r.value = !1;
  }, w = (S) => {
    s.value = S, t.value = [], n.value = 0, i = null, r.value = !1;
  }, y = (S, C, z, T) => {
    let A = !0;
    const E = () => S === l;
    let K = 0, W = !1;
    const X = (ve) => {
      K = ve, W = !0, T === void 0 && (n.value = ve);
    }, ge = () => {
      A && (A = !1, t.value = [], X(0)), s.value = null;
    };
    return {
      get open() {
        return E();
      },
      insert(ve, Ne) {
        if (!E()) return;
        const q = Array.isArray(ve) ? ve : [ve];
        if (!q.length) return;
        ge();
        const G = [...t.value];
        G.splice(Ne ?? G.length, 0, ...q), t.value = C > 0 ? G.slice(0, C) : G, X(K + q.length);
      },
      set(ve) {
        E() && (ve.rows && (ge(), t.value = C > 0 ? ve.rows.slice(0, C) : ve.rows, X(ve.rows.length)), ve.total !== void 0 && X(ve.total));
      },
      close() {
        E() && (a.value = !1, W && (n.value = K), b(z));
      },
      fail(ve) {
        E() && (w(ve), a.value = !1);
      }
    };
  }, $ = () => {
    const S = o;
    o = null, S?.();
  }, g = () => {
    const S = ++l;
    $();
    const C = M.value, z = i?.key === C ? i.total : void 0;
    r.value = z === void 0;
    const T = {
      query: m(),
      schema: e.schema.value,
      entity: e.entity.value,
      limit: e.limit.value,
      offset: c.value
    }, A = e.source.value;
    if (A.stream) {
      a.value = !0;
      try {
        o = A.stream(T, y(S, T.limit, C, z)) ?? null;
      } catch (K) {
        w(K), a.value = !1;
      }
      return;
    }
    let E;
    try {
      E = A.query(T);
    } catch (K) {
      w(K);
      return;
    }
    if (!(E instanceof Promise)) {
      x(E, C), a.value = !1;
      return;
    }
    a.value = !0, E.then((K) => {
      S === l && x(K, C);
    }).catch((K) => {
      S === l && w(K);
    }).finally(() => {
      S === l && (a.value = !1);
    });
  }, M = p(() => {
    const S = m();
    return `${e.entity.value?.key ?? e.schema.value.entities[0]?.key ?? ""}|${JSON.stringify(Ga.map((z) => S[z]))}`;
  }), k = p(() => `${M.value}|${e.query.value.page}`);
  return be([e.source, k, e.limit], g, {
    immediate: !0
  }), Ht(() => {
    l++, $();
  }, !0), { rows: t, total: n, offset: c, pageCount: u, pending: a, counting: r, error: s, refresh: g };
}
const hi = 150;
function mi(e) {
  const t = e.delay ?? hi, n = V(""), a = V("");
  let r = !1, s;
  const l = () => {
    clearTimeout(s), s = void 0;
  }, i = p(() => rn(Bl(a.value), e.entity.value, e.schema?.value)), o = p(() => i.value.trim() !== ""), c = p(
    () => JSON.stringify([i.value, ...Ga.map((b) => e.query.value[b])])
  ), u = ft(null), m = p(() => {
    const b = e.query.value;
    if (!o.value) return b;
    const w = u.value?.of === c.value ? u.value.page : 1;
    return { ...b, expr: Ta(b.expr, i.value), page: w };
  });
  be(n, (b) => {
    if (l(), !b.trim()) {
      r || (a.value = "");
      return;
    }
    r = !1, s = setTimeout(() => {
      s = void 0, a.value = n.value;
    }, t);
  }), be(
    e.query,
    () => {
      r && (r = !1, a.value = "");
    },
    { flush: "sync" }
  );
  const x = (b) => {
    l(), r = !0, n.value = "", !b() && r && (r = !1, a.value = "");
  };
  return qn() && Ht(l), {
    text: n,
    live: m,
    drafting: o,
    setPage(b) {
      u.value = { of: c.value, page: Math.max(1, Math.floor(b)) };
    },
    commit() {
      const b = n.value.trim();
      if (!b) return;
      const w = Ta(
        e.query.value.expr,
        rn(b, e.entity.value, e.schema?.value)
      );
      a.value = b, x(() => e.setExpression(w));
    },
    abandon() {
      l(), r = !1, n.value = "", a.value = "";
    },
    release: x
  };
}
const gi = 25, Is = (e, t) => e.toLowerCase() === t.toLowerCase();
function yi(e, t) {
  return e.find((n) => Is(n.id, t));
}
function _i(e) {
  const t = ft(/* @__PURE__ */ new Map()), n = /* @__PURE__ */ new Set(), a = (i) => {
    if (i.facetKey !== sn) return null;
    const o = Ps(e.schema.value, i.field, i.value);
    return o ? { ...o, key: `${o.entity.key}:${o.id}` } : null;
  }, r = (i) => {
    const { entity: o, id: c } = i, u = e.query.value;
    return e.source.value.query({
      query: {
        ...u,
        entity: o.key,
        // The reference on its own. The rest of the query is about the rows on
        // screen, which are of another type entirely.
        expr: bs(o, c) ?? "",
        sort: mt(o, u.sort, e.schema.value).key,
        page: 1
      },
      schema: e.schema.value,
      entity: o,
      limit: gi,
      offset: 0
    });
  }, s = (i, o) => {
    const c = Mn(Xe(i.columns ?? [], "identity"), o);
    return c === it || Is(c, o.id) ? "" : c;
  }, l = () => {
    const i = /* @__PURE__ */ new Map();
    for (const u of e.terms.value) {
      const m = a(u);
      m && !t.value.has(m.key) && !n.has(m.key) && i.set(m.key, m);
    }
    if (!i.size) return;
    const o = [...i.values()].map((u) => ({
      reference: u,
      outcome: r(u)
    })), c = (u) => {
      const m = new Map(t.value);
      u.forEach((x, b) => {
        const { reference: w } = o[b], y = yi(x.rows, w.id);
        m.set(w.key, y ? s(w.entity, y) : "");
      }), t.value = m;
    };
    if (o.every(({ outcome: u }) => !(u instanceof Promise))) {
      c(o.map(({ outcome: u }) => u));
      return;
    }
    for (const { reference: u } of o) n.add(u.key);
    Promise.all(o.map(({ outcome: u }) => Promise.resolve(u))).then(c).catch(() => {
    }).finally(() => {
      for (const { reference: u } of o) n.delete(u.key);
    });
  };
  return be([e.source, e.schema, e.terms], () => {
    try {
      l();
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
const wi = { class: "dc-header" }, ki = { class: "dc-header__main" }, bi = {
  class: "dc-header__brand",
  "aria-hidden": "true"
}, $i = { class: "dc-header__sr" }, xi = {
  key: 2,
  class: "dc-header__within"
}, Si = ["title"], Mi = { class: "dc-header__query" }, Ci = ["data-dc-more", "title"], Ei = { class: "dc-header__run" }, Pi = {
  key: 0,
  class: "dc-header__or dc-mono",
  "aria-hidden": "true"
}, Ai = ["title", "aria-label", "onClick"], Ti = ["placeholder", "onKeydown"], Li = {
  key: 0,
  class: "dc-header__pages",
  "aria-label": "Pages"
}, Oi = ["disabled"], Ri = ["title"], zi = ["value", "onKeydown"], Ii = {
  class: "dc-header__page-total",
  "aria-hidden": "true"
}, Ni = {
  class: "dc-header__sr",
  "aria-live": "polite"
}, Bi = ["disabled"], Fi = {
  key: 1,
  class: "dc-header__actions"
}, Di = /* @__PURE__ */ re({
  __name: "ShellHeader",
  props: {
    views: {},
    pagesNote: {},
    hidePages: { type: Boolean }
  },
  setup(e) {
    const t = e, n = cn(), a = Ce(), r = p(() => a.schema.value), s = p(() => {
      const F = a.within.value.trim();
      return F ? nr({ ...a.query.value, expr: F }, null) : [];
    }), l = p(() => {
      const F = a.entity.value, j = F?.keepsScope ? void 0 : F?.scope?.toLowerCase();
      return a.terms.value.filter((ae) => ae.facetKey !== Fn).map((ae, N, Q) => {
        const ee = Q[N - 1];
        return {
          term: ae,
          or: ee?.group !== void 0 && ae.group !== void 0 && ae.group !== ee.group,
          idle: !!j && ae.field?.toLowerCase() === j
        };
      });
    }), i = _i({
      source: a.source,
      schema: a.schema,
      query: a.query,
      // The scope's parts as well as the query's: it names a record more often
      // than a typed term does, being what a record's own page is built on.
      terms: p(() => [...s.value, ...a.terms.value])
    });
    function o(F) {
      const j = Es(r.value, F)?.scopeLabel ?? F;
      return j.charAt(0).toUpperCase() + j.slice(1);
    }
    function c(F) {
      return F.replace(/\s*\([^()]*\)\s*$/, "");
    }
    function u(F) {
      const j = i.nameOf(F);
      return j ? `${F.negated ? "-" : ""}${o(F.field)}: ${c(j)}` : F.label;
    }
    function m(F) {
      const j = u(F.term), ae = F.idle ? `Not applied to ${a.entity.value?.label} — remove ${j}` : `Remove ${j}`, N = F.term.address;
      return N && N !== j ? `${ae}
Written ${N} in the address and the search box` : ae;
    }
    const x = V(null);
    function b(F) {
      x.value = F instanceof HTMLInputElement ? F : null;
    }
    function w() {
      a.abandonDraft(), x.value?.blur();
    }
    function y() {
      $.value = null, a.commitDraft();
    }
    const $ = V(null), g = p(() => Math.min($.value ?? 1 / 0, l.value.length)), M = p(() => [
      { key: "before", entries: l.value.slice(0, g.value) },
      { key: "after", entries: l.value.slice(g.value) }
    ]), k = p(() => g.value < l.value.length);
    be(l, (F) => {
      $.value !== null && $.value >= F.length && ($.value = null);
    });
    function S(F, j) {
      $.value = F >= l.value.length ? null : Math.max(0, F), yt(() => {
        const ae = x.value;
        if (!ae) return;
        const N = j === "start" ? 0 : ae.value.length;
        ae.setSelectionRange(N, N), ae.scrollIntoView({ block: "nearest", inline: "nearest" }), q();
      });
    }
    function C(F) {
      const j = x.value;
      return !j || j.selectionStart !== j.selectionEnd ? !1 : j.selectionStart === (F === "start" ? 0 : j.value.length);
    }
    function z(F) {
      g.value === 0 || !C("start") || (F.preventDefault(), S(F.key === "Home" ? 0 : g.value - 1, "start"));
    }
    function T(F) {
      !k.value || !C("end") || (F.preventDefault(), S(F.key === "End" ? l.value.length : g.value + 1, "end"));
    }
    function A(F) {
      g.value === 0 || !C("start") || (F.preventDefault(), W(l.value[g.value - 1].term, !0));
    }
    function E(F) {
      !k.value || !C("end") || (F.preventDefault(), W(l.value[g.value].term, !1));
    }
    function K(F) {
      F.isComposing || F.altKey || F.ctrlKey || F.metaKey || F.shiftKey || (F.key === "ArrowLeft" || F.key === "Home" ? z(F) : F.key === "ArrowRight" || F.key === "End" ? T(F) : F.key === "Backspace" ? A(F) : F.key === "Delete" && E(F));
    }
    function W(F, j) {
      j && $.value !== null && ($.value = Math.max(0, $.value - 1)), a.removeTerm(F);
    }
    function X(F) {
      F.target?.closest("button, input") || (F.preventDefault(), x.value?.focus(), S(l.value.length, "end"));
    }
    function ge() {
      a.draft.value || ($.value = null);
    }
    const ve = V(null), Ne = V("");
    function q() {
      const F = ve.value;
      if (!F) {
        Ne.value = "";
        return;
      }
      const j = F.scrollLeft > 1, ae = F.scrollWidth - F.clientWidth - F.scrollLeft > 1;
      Ne.value = j && ae ? "both" : j ? "start" : ae ? "end" : "";
    }
    let G = null;
    be(
      ve,
      (F) => {
        G?.disconnect(), G = null, q(), !(!F || typeof ResizeObserver > "u") && (G = new ResizeObserver(q), G.observe(F));
      },
      { flush: "post" }
    ), be([l, g], q, { flush: "post" }), Ie(() => G?.disconnect());
    const se = p(() => a.liveQuery.value.page), ie = p(
      () => !t.hidePages && (a.pageCount.value > 1 || !!t.pagesNote) && !ja(a.query.value, t.views)
    ), I = p(
      () => `${a.counting.value ? "~" : ""}${Ot(a.pageCount.value)}`
    ), J = p(() => {
      let F = `Page ${Ot(se.value)} of ${I.value}`;
      const j = a.rows.value.length;
      if (j) {
        const ae = a.offset.value + 1, N = `${a.counting.value ? "~" : ""}${Ot(a.total.value)}`;
        F += ` — rows ${Ot(ae)} to ${Ot(ae + j - 1)} of ${N}`;
      }
      return t.pagesNote ? `${F}
${t.pagesNote}` : F;
    }), fe = V(null), qe = p(() => fe.value ?? String(se.value)), nt = p(
      () => `calc(${Math.max(2, String(a.pageCount.value).length)}ch + 10px)`
    );
    function at(F) {
      F.target.select();
    }
    function Ge(F) {
      const j = F.target, ae = j.value.replace(/[^0-9]/g, "");
      j.value !== ae && (j.value = ae), fe.value = ae;
    }
    function Ve(F) {
      const j = F.target, ae = Number(fe.value);
      fe.value = null;
      const N = Number.isFinite(ae) && ae >= 1 ? Math.min(Math.trunc(ae), Math.max(1, a.pageCount.value)) : se.value;
      j.value = String(N), N !== se.value && a.setPage(N);
    }
    function Ye(F) {
      const j = F.target;
      fe.value = null, j.value = String(se.value), j.blur();
    }
    return (F, j) => (f(), h("div", wi, [
      P("div", ki, [
        n.brand ? (f(), h("button", {
          key: 0,
          type: "button",
          class: "dc-header__domain",
          "data-dc-brand": "",
          title: "Home",
          onClick: j[0] || (j[0] = (ae) => O(a).reset())
        }, [
          P("span", bi, [
            we(F.$slots, "brand", {
              label: r.value.label
            }, void 0, !0)
          ]),
          P("span", $i, B(r.value.label), 1)
        ])) : (f(), h("button", {
          key: 1,
          type: "button",
          class: "dc-header__domain",
          title: "Home",
          onClick: j[1] || (j[1] = (ae) => O(a).reset())
        }, B(r.value.label), 1)),
        s.value.length ? (f(), h("span", xi, [
          j[6] || (j[6] = P("span", { class: "dc-header__sr" }, "Within", -1)),
          (f(!0), h(te, null, he(s.value, (ae) => (f(), h("span", {
            key: `scope:${ae.id}`,
            class: "dc-within dc-mono dc-truncate",
            title: u(ae)
          }, B(u(ae)), 9, Si))), 128))
        ])) : L("", !0),
        P("div", Mi, [
          P("div", {
            class: "dc-header__field",
            onMousedown: X
          }, [
            P("div", {
              ref_key: "termBar",
              ref: ve,
              class: "dc-header__terms",
              "data-dc-more": Ne.value,
              title: O(a).summary.value,
              onScroll: q
            }, [
              (f(!0), h(te, null, he(M.value, (ae) => (f(), h(te, {
                key: ae.key
              }, [
                P("span", Ei, [
                  (f(!0), h(te, null, he(ae.entries, (N) => (f(), h(te, {
                    key: N.term.id
                  }, [
                    N.or ? (f(), h("span", Pi, "or")) : L("", !0),
                    P("button", {
                      type: "button",
                      class: Je(["dc-term dc-mono", { "dc-term--idle": N.idle }]),
                      title: m(N),
                      "aria-label": `Remove ${u(N.term)}`,
                      onMousedown: j[2] || (j[2] = Qe(() => {
                      }, ["prevent"])),
                      onClick: (Q) => W(N.term, ae.key === "before")
                    }, B(u(N.term)), 43, Ai)
                  ], 64))), 128))
                ]),
                ae.key === "before" ? en((f(), h("input", {
                  key: 0,
                  ref_for: !0,
                  ref: b,
                  "onUpdate:modelValue": j[3] || (j[3] = (N) => O(a).draft.value = N),
                  class: Je(["dc-header__search dc-mono", { "dc-header__search--between": k.value }]),
                  style: xe({ "--dc-typed": String(Math.max(1, O(a).draft.value.length)) }),
                  type: "text",
                  autocomplete: "off",
                  spellcheck: "false",
                  placeholder: k.value ? "" : "Search…",
                  "aria-label": "Search",
                  onKeydown: [
                    bn(Qe(y, ["prevent"]), ["enter"]),
                    bn(Qe(w, ["prevent"]), ["esc"]),
                    K
                  ],
                  onBlur: ge
                }, null, 46, Ti)), [
                  [Vo, O(a).draft.value]
                ]) : L("", !0)
              ], 64))), 128))
            ], 40, Ci)
          ], 32)
        ])
      ]),
      ie.value ? (f(), h("nav", Li, [
        P("button", {
          type: "button",
          class: "dc-header__step",
          "aria-label": "Previous page",
          disabled: se.value <= 1,
          onClick: j[4] || (j[4] = (ae) => O(a).setPage(se.value - 1))
        }, [...j[7] || (j[7] = [
          P("span", { "aria-hidden": "true" }, "‹", -1)
        ])], 8, Oi),
        P("span", {
          class: "dc-header__page dc-mono",
          title: J.value
        }, [
          P("input", {
            class: "dc-header__page-box dc-mono",
            type: "text",
            inputmode: "numeric",
            autocomplete: "off",
            "aria-label": "Page",
            style: xe({ width: nt.value }),
            value: qe.value,
            onFocus: at,
            onInput: Ge,
            onKeydown: [
              bn(Qe(Ve, ["prevent"]), ["enter"]),
              bn(Qe(Ye, ["prevent"]), ["esc"])
            ],
            onBlur: Ve
          }, null, 44, zi),
          P("span", Ii, "/ " + B(I.value), 1)
        ], 8, Ri),
        P("span", Ni, B(J.value), 1),
        P("button", {
          type: "button",
          class: "dc-header__step",
          "aria-label": "Next page",
          disabled: se.value >= O(a).pageCount.value,
          onClick: j[5] || (j[5] = (ae) => O(a).setPage(se.value + 1))
        }, [...j[8] || (j[8] = [
          P("span", { "aria-hidden": "true" }, "›", -1)
        ])], 8, Bi)
      ])) : L("", !0),
      n.actions ? (f(), h("div", Fi, [
        we(F.$slots, "actions", {}, void 0, !0)
      ])) : L("", !0)
    ]));
  }
}), oe = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [a, r] of t)
    n[a] = r;
  return n;
}, Ns = /* @__PURE__ */ oe(Di, [["__scopeId", "data-v-d9c621de"]]);
function Hi(e) {
  const t = ft(/* @__PURE__ */ new Map()), n = V(!0);
  let a = 0, r;
  const s = () => {
    a++, r?.abort(), r = void 0;
  }, l = () => {
    s();
    const i = a, { signal: o } = r = new AbortController(), c = e.query.value, u = e.schema.value, m = e.entities.value, x = e.within?.value.trim() ?? "";
    n.value = c.expr.trim() === "" && !x;
    const b = /* @__PURE__ */ new Map();
    let w = !0;
    for (const y of m) {
      const $ = Cs(y, c.expr), g = x ? Xa(x, $) : $;
      let M = !1;
      const k = (C) => {
        if (i !== a) return;
        if (w) {
          b.set(y.key, C);
          return;
        }
        const z = new Map(t.value);
        z.set(y.key, C), t.value = z;
      }, S = e.source.value.query({
        query: { ...c, entity: y.key, expr: g, page: 1 },
        schema: u,
        entity: y,
        limit: 0,
        offset: 0,
        signal: o,
        progress: (C) => {
          M || k({ total: C, pending: !0, counted: !0 });
        }
      });
      S instanceof Promise ? (b.has(y.key) || b.set(y.key, { total: 0, pending: !0, counted: !1 }), S.then((C) => {
        M = !0, k({ total: C.total, pending: !1, counted: !0 });
      })) : (M = !0, b.set(y.key, { total: S.total, pending: !1, counted: !0 }));
    }
    w = !1, t.value = b;
  };
  return qn() && Ht(s), { counts: t, pristine: n, refresh: l, cancel: s };
}
const qi = ["checked", "indeterminate"], Bs = /* @__PURE__ */ re({
  __name: "PageTick",
  setup(e) {
    const t = Ce(), n = p(() => t.rows.value.filter((s) => t.isSelected(s)).length), a = p(
      () => t.rows.value.length > 0 && n.value === t.rows.value.length
    ), r = p(() => n.value > 0 && !a.value);
    return (s, l) => (f(), h("input", {
      class: "dc-tick",
      type: "checkbox",
      checked: a.value,
      indeterminate: r.value,
      "aria-label": "Select every row on this page",
      title: "Select every row on this page",
      onChange: l[0] || (l[0] = (i) => O(t).selectPage(!a.value))
    }, null, 40, qi));
  }
}), Xt = (e) => e.separator !== !0 && e.heading !== !0 && e.disabled !== !0, Vi = ["aria-label"], Ki = ["role", "aria-label"], Wi = ["data-dc-item"], ji = {
  key: 0,
  class: "dc-menu__rule",
  role: "separator"
}, Ui = ["role", "aria-checked", "aria-haspopup", "aria-expanded", "aria-disabled", "disabled", "data-dc-item", "onClick", "onMouseenter"], Gi = {
  class: "dc-menu__mark",
  "aria-hidden": "true"
}, Yi = { class: "dc-menu__label dc-truncate" }, Xi = {
  key: 0,
  class: "dc-menu__key dc-mono"
}, Qi = {
  key: 1,
  class: "dc-menu__more",
  "aria-hidden": "true"
}, Zi = /* @__PURE__ */ re({
  __name: "MenuList",
  props: {
    items: {},
    at: {},
    label: {},
    autofocus: { type: Boolean }
  },
  emits: ["choose", "dismiss"],
  setup(e, { expose: t, emit: n }) {
    const a = e, r = n, s = V(null), l = V([]), i = V(null), o = V(null), c = V(null), u = V(!1), m = p(
      () => a.items.flatMap((T, A) => Xt(T) ? [A] : [])
    ), x = p(() => {
      const T = [{ entries: [] }];
      return a.items.forEach((A, E) => {
        A.heading ? T.push({ heading: A, entries: [] }) : T[T.length - 1]?.entries.push({ item: A, index: E });
      }), T.filter((A) => A.entries.length > 0);
    }), b = V({ x: a.at.x, y: a.at.y });
    async function w() {
      b.value = { x: a.at.x, y: a.at.y }, await yt();
      const T = s.value?.getBoundingClientRect();
      if (!T) return;
      const A = 8;
      let E = a.at.x, K = a.at.y;
      if (E + T.width > window.innerWidth - A) {
        const W = a.at.mirrorX === void 0 ? null : a.at.mirrorX - T.width;
        E = W !== null && W >= A ? W : window.innerWidth - T.width - A;
      }
      K + T.height > window.innerHeight - A && (K = window.innerHeight - T.height - A), b.value = { x: Math.max(A, E), y: Math.max(A, K) };
    }
    const y = p(() => ({ left: `${b.value.x}px`, top: `${b.value.y}px` }));
    function $(T) {
      i.value = T, T !== null && yt(() => l.value[T]?.focus());
    }
    function g(T, A) {
      const E = m.value;
      if (E.length === 0) return null;
      if (T === null) return A === 1 ? E[0] ?? null : E[E.length - 1] ?? null;
      const K = E.indexOf(T);
      return K === -1 ? E[0] ?? null : E[(K + A + E.length) % E.length] ?? null;
    }
    function M(T, A) {
      if (!a.items[T]?.items?.length) return;
      const K = l.value[T]?.getBoundingClientRect(), W = s.value?.getBoundingClientRect();
      !K || !W || (c.value = { x: W.right - 4, y: K.top - 4, mirrorX: W.left + 4 }, o.value = T, u.value = A);
    }
    function k(T) {
      const A = o.value;
      o.value = null, c.value = null, T && A !== null && $(A);
    }
    function S(T) {
      const A = a.items[T];
      if (!(!A || !Xt(A))) {
        if (A.items?.length) {
          M(T, !0);
          return;
        }
        r("choose", A);
      }
    }
    function C(T) {
      const A = T.key;
      if (A === "Escape") {
        T.preventDefault(), T.stopPropagation(), o.value !== null ? k(!0) : r("dismiss");
        return;
      }
      if (A === "ArrowDown" || A === "ArrowUp") {
        T.preventDefault(), T.stopPropagation(), k(!1), $(g(i.value, A === "ArrowDown" ? 1 : -1));
        return;
      }
      if (A === "Home" || A === "End") {
        T.preventDefault(), T.stopPropagation(), k(!1), $(g(null, A === "Home" ? 1 : -1));
        return;
      }
      if (A === "ArrowRight") {
        const E = i.value;
        E !== null && a.items[E]?.items?.length && (T.preventDefault(), T.stopPropagation(), M(E, !0));
        return;
      }
      if (A === "ArrowLeft") {
        o.value !== null && (T.preventDefault(), T.stopPropagation(), k(!0));
        return;
      }
      if (A === "Enter" || A === " ") {
        const E = i.value;
        if (E === null) return;
        T.preventDefault(), T.stopPropagation(), S(E);
      }
    }
    function z(T) {
      const A = a.items[T];
      !A || !Xt(A) || (o.value !== null && o.value !== T && k(!1), $(T), A.items?.length && M(T, !1));
    }
    return un(() => {
      w(), a.autofocus && $(g(null, 1));
    }), be(() => a.at, w, { deep: !0 }), be(() => a.items, () => void w(), { deep: !0 }), Ie(() => {
      o.value = null;
    }), t({ root: s }), (T, A) => {
      const E = ns("MenuList", !0);
      return f(), h("div", {
        ref_key: "root",
        ref: s,
        class: "dc-menu",
        role: "menu",
        "aria-label": e.label,
        style: xe(y.value),
        onKeydown: C
      }, [
        (f(!0), h(te, null, he(x.value, (K, W) => (f(), h("div", {
          key: `${W}-${K.heading?.label ?? ""}`,
          class: "dc-menu__group",
          role: K.heading ? "group" : "none",
          "aria-label": K.heading?.label
        }, [
          K.heading ? (f(), h("div", {
            key: 0,
            class: "dc-menu__heading dc-truncate",
            "aria-hidden": "true",
            "data-dc-item": K.heading.id
          }, B(K.heading.label), 9, Wi)) : L("", !0),
          (f(!0), h(te, null, he(K.entries, ({ item: X, index: ge }) => (f(), h(te, {
            key: X.id ?? `${ge}-${X.label ?? ""}`
          }, [
            X.separator ? (f(), h("div", ji)) : (f(), h("button", {
              key: 1,
              ref_for: !0,
              ref: (ve) => {
                ve && (l.value[ge] = ve);
              },
              type: "button",
              class: "dc-menu__item",
              role: X.checked === void 0 ? "menuitem" : "menuitemcheckbox",
              "aria-checked": X.checked === void 0 ? void 0 : X.checked,
              "aria-haspopup": X.items?.length ? "menu" : void 0,
              "aria-expanded": X.items?.length ? o.value === ge : void 0,
              "aria-disabled": X.disabled ? "true" : void 0,
              disabled: X.disabled,
              "data-dc-item": X.id,
              tabindex: "-1",
              onClick: (ve) => S(ge),
              onMouseenter: (ve) => z(ge)
            }, [
              P("span", Gi, B(X.checked ? "✓" : ""), 1),
              P("span", Yi, B(X.label), 1),
              X.shortcut ? (f(), h("span", Xi, B(X.shortcut), 1)) : X.items?.length ? (f(), h("span", Qi, "›")) : L("", !0)
            ], 40, Ui))
          ], 64))), 128))
        ], 8, Ki))), 128)),
        o.value !== null && c.value ? (f(), Y(E, {
          key: o.value,
          items: e.items[o.value]?.items ?? [],
          at: c.value,
          label: e.items[o.value]?.label,
          autofocus: u.value,
          onChoose: A[0] || (A[0] = (K) => r("choose", K)),
          onDismiss: A[1] || (A[1] = (K) => k(!0))
        }, null, 8, ["items", "at", "label", "autofocus"])) : L("", !0)
      ], 44, Vi);
    };
  }
}), ar = /* @__PURE__ */ oe(Zi, [["__scopeId", "data-v-9b1413fa"]]), Ji = { class: "dc-pick" }, ec = ["id"], tc = ["id", "aria-expanded", "aria-labelledby", "data-dc-value"], nc = { class: "dc-pick__label" }, ac = /* @__PURE__ */ re({
  __name: "PickControl",
  props: {
    modelValue: {},
    options: {},
    label: {},
    mono: { type: Boolean }
  },
  emits: ["update:modelValue", "open", "close"],
  setup(e, { emit: t }) {
    const n = e, a = t, r = Vn() ?? "dc-pick", s = V(null), l = V(null), i = V(null), o = V(!1), c = p(() => i.value !== null), u = V(null), m = p(
      () => n.options.find((S) => S.key === n.modelValue) ?? n.options[0]
    ), x = p(
      () => n.options.map((S) => ({
        id: S.key,
        label: S.label,
        checked: S.key === n.modelValue
      }))
    ), b = p(
      () => i.value ? { maxHeight: `${window.innerHeight - i.value.y - 8}px` } : void 0
    );
    function w(S) {
      const C = s.value?.getBoundingClientRect();
      C && (u.value = s.value?.closest(".dc-shell") ?? document.body, i.value = { x: C.left, y: C.bottom + 4, mirrorX: C.right }, o.value = S, a("open"));
    }
    function y(S) {
      i.value && a("close"), i.value = null, S && s.value?.focus();
    }
    function $() {
      c.value ? y(!0) : w(!1);
    }
    function g(S) {
      S.key !== "ArrowDown" && S.key !== "ArrowUp" || c.value || (S.preventDefault(), w(!0));
    }
    function M(S) {
      const C = S.target;
      C && (s.value?.contains(C) || l.value?.root?.contains(C) || y(!1));
    }
    be(c, (S) => {
      S ? window.addEventListener("pointerdown", M, !0) : window.removeEventListener("pointerdown", M, !0);
    }), Ie(() => window.removeEventListener("pointerdown", M, !0));
    function k(S) {
      y(!0), !(S.id === void 0 || S.id === n.modelValue) && a("update:modelValue", S.id);
    }
    return (S, C) => (f(), h("span", Ji, [
      P("span", {
        id: `${O(r)}-name`,
        class: "dc-pick__name"
      }, B(e.label), 9, ec),
      P("button", {
        id: `${O(r)}-value`,
        ref_key: "trigger",
        ref: s,
        type: "button",
        class: Je(["dc-pick__button", { "dc-mono": e.mono }]),
        "aria-haspopup": "menu",
        "aria-expanded": c.value,
        "aria-labelledby": `${O(r)}-name ${O(r)}-value`,
        "data-dc-value": e.modelValue,
        onClick: $,
        onKeydown: g
      }, [
        P("span", nc, B(m.value?.label), 1)
      ], 42, tc),
      C[1] || (C[1] = P("span", {
        class: "dc-pick__mark",
        "aria-hidden": "true"
      }, "▾", -1)),
      i.value && u.value ? (f(), Y(Kn, {
        key: 0,
        to: u.value
      }, [
        de(ar, {
          ref_key: "menu",
          ref: l,
          class: "dc-pick__list",
          style: xe(b.value),
          items: x.value,
          at: i.value,
          label: e.label,
          autofocus: o.value,
          onChoose: k,
          onDismiss: C[0] || (C[0] = (z) => y(!0))
        }, null, 8, ["style", "items", "at", "label", "autofocus"])
      ], 8, ["to"])) : L("", !0)
    ]));
  }
}), Fr = /* @__PURE__ */ oe(ac, [["__scopeId", "data-v-d21ebf1b"]]), rc = {
  key: 0,
  class: "dc-actions"
}, sc = {
  key: 2,
  class: "dc-actions__select"
}, oc = {
  key: 0,
  class: "dc-actions__all"
}, lc = {
  class: "dc-actions__count",
  "aria-live": "polite"
}, ic = {
  key: 1,
  class: "dc-actions__count dc-actions__all",
  "aria-live": "polite"
}, cc = { class: "dc-actions__ops" }, uc = ["disabled"], dc = ["data-dc-operation", "disabled", "onClick"], fc = ["disabled"], pc = "…", vc = /* @__PURE__ */ re({
  __name: "RecordActions",
  props: {
    views: {},
    typeChooser: {}
  },
  setup(e) {
    const t = e, n = Ce(), a = p(
      () => n.hasFacets.value || !!n.liveQuery.value.expr.trim() || !!n.within.value
    ), r = p(() => n.schema.value.formatCount ?? Ot), s = Hi({
      source: n.source,
      schema: n.schema,
      // What each type holds of what is on screen, the draft's results included:
      // a count of the committed query would disagree with the rows under it.
      query: n.liveQuery,
      entities: n.entities,
      within: n.within
    });
    function l(z) {
      if (z.key === n.query.value.entity && a.value) return r.value(n.total.value);
      if (s.pristine.value) return z.count;
      const A = s.counts.value.get(z.key);
      return A ? A.counted ? `${A.pending ? "~" : ""}${r.value(A.total)}` : pc : z.count;
    }
    const i = p(() => [
      { key: "", label: "Everything" },
      ...n.entities.value.map((z) => ({
        key: z.key,
        label: `${z.label} · ${l(z)}`
      }))
    ]), o = p(
      () => t.typeChooser === "always" || n.query.value.entity !== null
    );
    function c(z) {
      n.setEntity(z || null);
    }
    const u = p(
      () => (t.views ?? [...rs]).map((z) => ({ key: z, label: al[z] }))
    ), m = p(() => Ka(n.query.value.view, t.views)), x = p(() => u.value.length > 1);
    function b(z) {
      n.setView(z);
    }
    const w = p(() => n.entity.value), y = p(() => !ja(n.query.value, t.views)), $ = p(() => n.selection.value.ids.length), g = p(
      () => y.value && n.selectable.value && (n.rows.value.length > 0 || $.value > 0)
    ), M = p(() => m.value === "table"), k = p(
      () => o.value || x.value || y.value && (g.value || !!(w.value?.create || w.value?.duplicate || w.value?.delete || w.value?.operations?.length))
    ), S = p(() => $.value ? `${$.value} selected` : M.value ? "" : "Select all");
    function C(z) {
      return $.value ? `${z} ${$.value}` : z;
    }
    return (z, T) => k.value ? (f(), h("div", rc, [
      o.value ? (f(), Y(Fr, {
        key: 0,
        class: "dc-actions__pick dc-actions__type",
        label: "Type",
        "model-value": O(n).query.value.entity ?? "",
        options: i.value,
        onOpen: O(s).refresh,
        onClose: O(s).cancel,
        "onUpdate:modelValue": c
      }, null, 8, ["model-value", "options", "onOpen", "onClose"])) : L("", !0),
      x.value ? (f(), Y(Fr, {
        key: 1,
        class: "dc-actions__pick dc-actions__view",
        label: "View",
        "model-value": m.value,
        options: u.value,
        "onUpdate:modelValue": b
      }, null, 8, ["model-value", "options"])) : L("", !0),
      g.value && S.value ? (f(), h("div", sc, [
        M.value ? (f(), h("span", ic, B(S.value), 1)) : (f(), h("label", oc, [
          de(Bs),
          P("span", lc, B(S.value), 1)
        ])),
        $.value ? (f(), h("button", {
          key: 2,
          type: "button",
          class: "dc-actions__clear",
          onClick: T[0] || (T[0] = (A) => O(n).clearSelection())
        }, " Clear ")) : L("", !0)
      ])) : L("", !0),
      P("div", cc, [
        w.value?.create ? (f(), h("button", {
          key: 0,
          type: "button",
          class: "dc-actions__op dc-actions__new",
          onClick: T[1] || (T[1] = (A) => O(n).create(w.value))
        }, [
          T[4] || (T[4] = P("span", {
            class: "dc-actions__plus",
            "aria-hidden": "true"
          }, "+", -1)),
          Ae(" " + B(w.value.create), 1)
        ])) : L("", !0),
        w.value?.duplicate ? (f(), h("button", {
          key: 1,
          type: "button",
          class: "dc-actions__op",
          disabled: !$.value,
          onClick: T[2] || (T[2] = (A) => O(n).duplicate())
        }, B(C(w.value.duplicate)), 9, uc)) : L("", !0),
        (f(!0), h(te, null, he(w.value?.operations ?? [], (A) => (f(), h("button", {
          key: A.key,
          type: "button",
          class: "dc-actions__op",
          "data-dc-operation": A.key,
          disabled: !$.value,
          onClick: (E) => O(n).operate(A.key)
        }, B(C(A.label)), 9, dc))), 128)),
        w.value?.delete ? (f(), h("button", {
          key: 2,
          type: "button",
          class: "dc-actions__op dc-actions__danger",
          disabled: !$.value,
          onClick: T[3] || (T[3] = (A) => O(n).delete())
        }, B(C(w.value.delete)), 9, fc)) : L("", !0)
      ])
    ])) : L("", !0);
  }
}), Fs = /* @__PURE__ */ oe(vc, [["__scopeId", "data-v-357ee5ac"]]), hc = ["href"], mc = /* @__PURE__ */ re({
  __name: "PressLink",
  props: {
    href: {}
  },
  emits: ["press"],
  setup(e, { emit: t }) {
    const n = e, a = t;
    function r(s) {
      if (n.href && Ms(s)) {
        s.stopPropagation();
        return;
      }
      s.preventDefault(), a("press", ea(s), s);
    }
    return (s, l) => e.href ? (f(), h("a", {
      key: 0,
      href: e.href,
      class: "dc-press",
      onClick: r
    }, [
      we(s.$slots, "default", {}, void 0, !0)
    ], 8, hc)) : (f(), h("button", {
      key: 1,
      type: "button",
      class: "dc-press",
      onClick: r
    }, [
      we(s.$slots, "default", {}, void 0, !0)
    ]));
  }
}), et = /* @__PURE__ */ oe(mc, [["__scopeId", "data-v-a9383f64"]]);
function gc(e, t) {
  if (!e) return null;
  const n = He(e, t);
  return typeof n == "string" && n.trim() ? n : null;
}
const yc = (e) => e == null || typeof e == "string" && !e.trim();
function _c(e, t) {
  const n = Xe(t, "state"), a = Xe(t, "tint");
  return {
    identity: Mn(Xe(t, "identity"), e),
    reference: Mn(Xe(t, "reference"), e),
    metrics: is(t, "metric").map((r) => ({
      column: r,
      label: r.label ?? "",
      text: Ft(r, e)
    })),
    facts: t.filter((r) => r.cardLabel && !yc(He(r, e))).map((r) => ({
      column: r,
      label: r.cardLabel,
      title: [r.label, r.hint].filter(Boolean).join(" — "),
      text: Ft(r, e)
    })),
    state: n ? He(n, e) ?? null : null,
    updated: Mn(Xe(t, "updated"), e),
    image: gc(Xe(t, "image"), e),
    tint: a ? He(a, e) ?? null : null
  };
}
function Ds(e, t, n, a, r = !1) {
  const s = n?.columns ?? [];
  return {
    row: e,
    key: yl(e, t),
    entityLabel: e.entityLabel,
    entity: n,
    columns: s,
    ordinal: ul(t),
    parts: _c(e, s),
    pinned: a,
    selected: r
  };
}
function Pt() {
  const e = Ce(), t = p(
    () => new Map(e.entities.value.map((n) => [n.key, n]))
  );
  return p(
    () => e.rows.value.map(
      (n, a) => Ds(
        n,
        e.offset.value + a,
        t.value.get(n.entityKey) ?? null,
        e.isPinned(n),
        e.isSelected(n)
      )
    )
  );
}
const wc = ["data-dc-status", "data-dc-tone"], kc = /* @__PURE__ */ re({
  __name: "StatusPill",
  props: {
    status: {},
    tone: {},
    label: {}
  },
  setup(e) {
    const t = e, n = p(() => t.label ?? t.status ?? "");
    return (a, r) => (f(), h("span", {
      class: "dc-pill",
      "data-dc-status": e.status,
      "data-dc-tone": e.tone
    }, B(n.value), 9, wc));
  }
}), pn = /* @__PURE__ */ oe(kc, [["__scopeId", "data-v-686eb9b6"]]), bc = { key: 1 }, $c = /* @__PURE__ */ re({
  __name: "MetricDrill",
  props: {
    entry: {},
    column: {}
  },
  setup(e) {
    const t = e, n = Ce(), a = p(() => !t.entry.entity?.scope || !t.column.drill ? null : n.entities.value.find((c) => c.key === t.column.drill) ?? null), r = p(() => t.column.label ?? ""), s = p(() => Ft(t.column, t.entry.row)), l = p(() => a.value ? n.drillHref(t.entry.row, a.value) : null);
    function i(o, c) {
      c.stopPropagation(), a.value && n.drill(t.entry.row, a.value, o);
    }
    return (o, c) => a.value ? (f(), Y(et, {
      key: 0,
      class: "dc-drill",
      href: l.value,
      title: `${r.value} of ${e.entry.parts.identity} — show the ${a.value.label.toLowerCase()}`,
      onPress: i
    }, {
      default: Ee(() => [
        we(o.$slots, "default", {}, () => [
          Ae(B(s.value), 1)
        ], !0)
      ]),
      _: 3
    }, 8, ["href", "title"])) : (f(), h("span", bc, [
      we(o.$slots, "default", {}, () => [
        Ae(B(s.value), 1)
      ], !0)
    ]));
  }
}), vn = /* @__PURE__ */ oe($c, [["__scopeId", "data-v-d3e7f4e0"]]), xc = ["data-dc-active", "aria-pressed", "aria-label"], Sc = /* @__PURE__ */ re({
  __name: "PinStar",
  props: {
    row: {},
    pinned: { type: Boolean },
    name: {}
  },
  setup(e) {
    const t = e, n = Ce();
    function a(r) {
      r.stopPropagation(), n.togglePin(t.row);
    }
    return (r, s) => (f(), h("button", {
      type: "button",
      class: "dc-star",
      "data-dc-active": e.pinned ? "true" : "false",
      "aria-pressed": e.pinned,
      "aria-label": e.pinned ? `Unpin ${e.name}` : `Pin ${e.name}`,
      onClick: a
    }, B(e.pinned ? "★" : "☆"), 9, xc));
  }
}), rr = /* @__PURE__ */ oe(Sc, [["__scopeId", "data-v-ef63d763"]]), Mc = ["src"], Cc = /* @__PURE__ */ re({
  __name: "RowPicture",
  props: {
    src: {}
  },
  setup(e) {
    const t = e, n = V(!1);
    return be(
      () => t.src,
      () => {
        n.value = !1;
      }
    ), (a, r) => e.src.trim() && !n.value ? (f(), h("img", {
      key: 0,
      class: "dc-picture",
      src: e.src,
      alt: "",
      loading: "lazy",
      decoding: "async",
      onError: r[0] || (r[0] = (s) => n.value = !0)
    }, null, 40, Mc)) : L("", !0);
  }
}), ta = /* @__PURE__ */ oe(Cc, [["__scopeId", "data-v-afaab300"]]), Ec = ["data-dc-standing", "title", "aria-label"], Pc = /* @__PURE__ */ re({
  __name: "QueryMark",
  props: {
    entry: {}
  },
  setup(e) {
    const t = e, n = Ce(), a = p(() => Zn(t.entry.entity, t.entry.row)), r = p(() => er(n.query.value.expr, a.value)), s = p(
      () => r.value === "in" ? `The query narrows to ${t.entry.parts.identity} — press to lift that` : `The query leaves out ${t.entry.parts.identity} — press to lift that`
    );
    function l(i) {
      i.stopPropagation(), n.setExpression(Ss(n.query.value.expr, a.value));
    }
    return (i, o) => r.value ? (f(), h("button", {
      key: 0,
      type: "button",
      class: "dc-standing",
      "data-dc-standing": r.value,
      title: s.value,
      "aria-label": s.value,
      onClick: l
    }, B(r.value === "in" ? "+" : "−"), 9, Ec)) : L("", !0);
  }
}), sr = /* @__PURE__ */ oe(Pc, [["__scopeId", "data-v-4b8d4166"]]), Ac = ["aria-label"], Tc = ["data-dc-standing", "data-dc-active", "aria-checked", "title", "aria-label", "onClick"], Lc = /* @__PURE__ */ re({
  __name: "StandingControl",
  props: {
    standing: {},
    mixed: { type: Boolean },
    name: {}
  },
  emits: ["set"],
  setup(e, { emit: t }) {
    const n = e, a = t, r = p(() => [
      { standing: "in", sign: "+", hint: `Narrow the query to ${n.name}` },
      { standing: null, sign: "·", hint: `Let the query say nothing about ${n.name}` },
      { standing: "out", sign: "−", hint: `Leave ${n.name} out of the query` }
    ]), s = (i) => !n.mixed && n.standing === i;
    function l(i, o) {
      i.stopPropagation(), a("set", o);
    }
    return (i, o) => (f(), h("span", {
      class: "dc-standing-control",
      role: "radiogroup",
      "aria-label": `Where the query stands on ${e.name}`
    }, [
      (f(!0), h(te, null, he(r.value, (c) => (f(), h("button", {
        key: c.sign,
        type: "button",
        role: "radio",
        class: "dc-standing-control__choice",
        "data-dc-standing": c.standing ?? "none",
        "data-dc-active": s(c.standing) ? "true" : "false",
        "aria-checked": s(c.standing),
        title: c.hint,
        "aria-label": c.hint,
        onClick: (u) => l(u, c.standing)
      }, B(c.sign), 9, Tc))), 128))
    ], 8, Ac));
  }
}), Ra = /* @__PURE__ */ oe(Lc, [["__scopeId", "data-v-adaa8412"]]), Hs = /* @__PURE__ */ re({
  __name: "RowStanding",
  props: {
    entry: {}
  },
  setup(e) {
    const t = e, n = Ce(), a = p(() => Zn(t.entry.entity, t.entry.row)), r = p(() => er(n.query.value.expr, a.value));
    function s(l) {
      n.setExpression(La(n.query.value.expr, a.value, l));
    }
    return (l, i) => a.value !== null ? (f(), Y(Ra, {
      key: 0,
      class: "dc-row-standing",
      standing: r.value,
      name: e.entry.parts.identity,
      onSet: s
    }, null, 8, ["standing", "name"])) : L("", !0);
  }
}), Oc = ["href", "title", "aria-label"], Rc = /* @__PURE__ */ re({
  __name: "OpenMark",
  props: {
    entry: {}
  },
  setup(e) {
    const t = e, n = Ce(), a = p(() => {
      const r = t.entry.row, s = n.recordHref?.(r) ?? null;
      return s ? n.pressHref(r) === s ? null : s : null;
    });
    return (r, s) => a.value ? (f(), h("a", {
      key: 0,
      class: "dc-open",
      href: a.value,
      target: "_blank",
      rel: "noopener noreferrer",
      title: a.value,
      "aria-label": `Open ${e.entry.parts.identity} in a new tab`,
      onClick: s[0] || (s[0] = Qe(() => {
      }, ["stop"]))
    }, "↗", 8, Oc)) : L("", !0);
  }
}), hn = /* @__PURE__ */ oe(Rc, [["__scopeId", "data-v-b00f390d"]]), zc = /* @__PURE__ */ re({
  __name: "ScopeMark",
  props: {
    entry: {}
  },
  setup(e) {
    const t = e, n = Ce(), a = p(
      () => n.narrowsOnPress.value ? null : t.entry.entity?.scope ?? null
    ), r = V(null);
    function s(u) {
      r.value = ea(u).exclude ? "out" : "in";
    }
    function l(u) {
      s(u), window.addEventListener("keydown", s), window.addEventListener("keyup", s);
    }
    function i() {
      r.value = null, window.removeEventListener("keydown", s), window.removeEventListener("keyup", s);
    }
    Ie(i);
    const o = p(() => a.value ? n.drillHref(t.entry.row, null) : null);
    function c(u, m) {
      m.stopPropagation(), n.drill(t.entry.row, null, u);
    }
    return (u, m) => a.value ? (f(), Y(et, {
      key: 0,
      class: "dc-scope",
      href: o.value,
      "data-dc-pending": r.value ?? void 0,
      title: `Narrow everything to ${a.value}: ${e.entry.row.id} — ⌥-click to leave it out`,
      "aria-label": `Narrow everything to ${e.entry.parts.identity}`,
      onPointerenter: l,
      onPointermove: s,
      onPointerleave: i,
      onPress: c
    }, {
      default: Ee(() => [...m[0] || (m[0] = [
        Ae(" → ", -1)
      ])]),
      _: 1
    }, 8, ["href", "data-dc-pending", "title", "aria-label"])) : L("", !0);
  }
}), mn = /* @__PURE__ */ oe(zc, [["__scopeId", "data-v-05d2c233"]]), Ic = ["checked", "aria-label"], At = /* @__PURE__ */ re({
  __name: "SelectTick",
  props: {
    row: {},
    selected: { type: Boolean },
    name: {}
  },
  setup(e) {
    const t = e, n = Ce();
    function a(r) {
      r.stopPropagation(), n.toggleSelect(t.row);
    }
    return (r, s) => (f(), h("input", {
      class: "dc-tick",
      type: "checkbox",
      checked: e.selected,
      "aria-label": `Select ${e.name}`,
      onClick: a
    }, null, 8, Ic));
  }
}), Nc = { class: "dc-card__top dc-mono" }, Bc = { class: "dc-card__lead" }, Fc = {
  key: 2,
  class: "dc-card__entity"
}, Dc = { class: "dc-card__top-right" }, Hc = { class: "dc-card__names" }, qc = { class: "dc-card__primary" }, Vc = {
  key: 0,
  class: "dc-card__secondary dc-mono"
}, Kc = {
  key: 1,
  class: "dc-card__facts dc-mono"
}, Wc = ["title"], jc = { class: "dc-card__fact-label" }, Uc = {
  key: 0,
  class: "dc-card__metrics dc-mono"
}, Gc = {
  key: 0,
  class: "dc-card__date"
}, Yc = /* @__PURE__ */ re({
  __name: "CardsView",
  setup(e) {
    const t = Ce(), n = Pt(), a = p(() => t.isEverything.value), r = (l) => l.entity?.card === "picture", s = p(() => n.value.length > 0 && n.value.every(r));
    return (l, i) => (f(), h("div", {
      class: Je(["dc-cards", { "dc-cards--pictures": s.value }])
    }, [
      (f(!0), h(te, null, he(O(n), (o) => (f(), h("div", {
        key: o.key,
        class: Je(["dc-card", { "dc-card--picture": r(o) }])
      }, [
        P("div", Nc, [
          P("span", Bc, [
            O(t).selectable.value ? (f(), Y(At, {
              key: 0,
              row: o.row,
              selected: o.selected,
              name: o.parts.identity
            }, null, 8, ["row", "selected", "name"])) : L("", !0),
            r(o) ? L("", !0) : (f(), h(te, { key: 1 }, [
              Ae(B(o.ordinal), 1)
            ], 64)),
            a.value ? (f(), h("span", Fc, B(o.entityLabel), 1)) : L("", !0)
          ]),
          P("span", Dc, [
            o.parts.state && !r(o) ? (f(), Y(pn, {
              key: 0,
              status: o.parts.state
            }, null, 8, ["status"])) : L("", !0),
            r(o) ? (f(), Y(sr, {
              key: 1,
              entry: o
            }, null, 8, ["entry"])) : (f(), Y(Hs, {
              key: 2,
              entry: o
            }, null, 8, ["entry"])),
            de(mn, { entry: o }, null, 8, ["entry"]),
            de(hn, { entry: o }, null, 8, ["entry"]),
            O(t).pinnable.value ? (f(), Y(rr, {
              key: 3,
              row: o.row,
              name: o.parts.identity,
              pinned: o.pinned
            }, null, 8, ["row", "name", "pinned"])) : L("", !0)
          ])
        ]),
        de(et, {
          class: "dc-card__open",
          href: O(t).pressHref(o.row),
          onPress: (c) => O(t).activate(o.row, c)
        }, {
          default: Ee(() => [
            o.parts.image ? (f(), Y(ta, {
              key: 0,
              class: "dc-card__image",
              src: o.parts.image
            }, null, 8, ["src"])) : L("", !0),
            P("span", Hc, [
              P("span", qc, B(o.parts.identity), 1),
              r(o) ? L("", !0) : (f(), h("span", Vc, B(o.parts.reference), 1)),
              o.parts.facts.length ? (f(), h("span", Kc, [
                (f(!0), h(te, null, he(o.parts.facts, (c) => (f(), h("span", {
                  key: c.column.key ?? c.label,
                  class: "dc-card__fact",
                  title: c.title || void 0
                }, [
                  P("span", jc, B(c.label), 1),
                  Ae(" " + B(c.text), 1)
                ], 8, Wc))), 128))
              ])) : L("", !0)
            ])
          ]),
          _: 2
        }, 1032, ["href", "onPress"]),
        r(o) ? L("", !0) : (f(), h("div", Uc, [
          (f(!0), h(te, null, he(o.parts.metrics.slice(0, 2), (c) => (f(), Y(vn, {
            key: c.column.key ?? c.label,
            entry: o,
            column: c.column
          }, {
            default: Ee(() => [
              Ae(B(c.label) + " " + B(c.text), 1)
            ]),
            _: 2
          }, 1032, ["entry", "column"]))), 128)),
          o.parts.updated ? (f(), h("span", Gc, B(o.parts.updated), 1)) : L("", !0)
        ]))
      ], 2))), 128))
    ], 2));
  }
}), qs = /* @__PURE__ */ oe(Yc, [["__scopeId", "data-v-fd252138"]]), Xc = { class: "dc-grid" }, Qc = { class: "dc-tile__scrim" }, Zc = { class: "dc-tile__top dc-mono" }, Jc = { class: "dc-tile__chip" }, eu = { class: "dc-tile__caption" }, tu = { class: "dc-tile__secondary dc-truncate" }, nu = { class: "dc-tile__primary" }, au = /* @__PURE__ */ re({
  __name: "GridView",
  setup(e) {
    const t = Ce(), n = Pt();
    return (a, r) => (f(), h("div", Xc, [
      (f(!0), h(te, null, he(O(n), (s) => (f(), h("div", {
        key: s.key,
        class: "dc-grid__cell"
      }, [
        de(et, {
          class: "dc-tile",
          style: xe({ "--dc-tile-tint": s.parts.tint ?? void 0 }),
          href: O(t).pressHref(s.row),
          onPress: (l) => O(t).activate(s.row, l)
        }, {
          default: Ee(() => [
            s.parts.image ? (f(), Y(ta, {
              key: 0,
              class: "dc-tile__image",
              src: s.parts.image
            }, null, 8, ["src"])) : L("", !0),
            P("span", Qc, [
              P("span", Zc, [
                P("span", Jc, B(s.ordinal), 1)
              ]),
              P("span", eu, [
                P("span", tu, B(s.parts.reference), 1),
                P("span", nu, B(s.parts.identity), 1)
              ])
            ])
          ]),
          _: 2
        }, 1032, ["style", "href", "onPress"]),
        O(t).selectable.value ? (f(), Y(At, {
          key: 0,
          class: "dc-grid__tick",
          row: s.row,
          selected: s.selected,
          name: s.parts.identity
        }, null, 8, ["row", "selected", "name"])) : L("", !0)
      ]))), 128))
    ]));
  }
}), Vs = /* @__PURE__ */ oe(au, [["__scopeId", "data-v-89c40a9e"]]);
function Dr(e, t, n, a) {
  return (n - a * (t - 1)) / e;
}
function ga(e, t) {
  return e > 0 ? Math.min(t, e) : t;
}
function ru(e) {
  return e > 0 ? e : 1 / 0;
}
function su(e, t, n) {
  const { width: a, height: r, gap: s = 0 } = n;
  if (!e.length) return [];
  if (!(a > 0) || !(r > 0)) return [{ items: [...e], height: r, filled: !1 }];
  const l = [];
  let i = [], o = 0, c = 0;
  for (const u of e) {
    const m = t(u), x = Math.max(m.ratio, Number.EPSILON), b = m.height && m.height > 0 ? Math.max(c, m.height) : c, w = ga(b, r), y = Dr(o + x, i.length + 1, a, s);
    if (y > w) {
      i.push(u), o += x, c = b;
      continue;
    }
    const $ = ga(c, r), g = i.length ? Dr(o, i.length, a, s) : 1 / 0;
    g <= ru(c) && g - $ < w - y ? (l.push({ items: i, height: g, filled: !0 }), i = [u], o = x, c = m.height && m.height > 0 ? m.height : 0) : (l.push({ items: [...i, u], height: y, filled: !0 }), i = [], o = 0, c = 0);
  }
  return i.length && l.push({ items: i, height: ga(c, r), filled: !1 }), l;
}
const ou = { class: "dc-images" }, lu = {
  key: 1,
  class: "dc-images__blank",
  "aria-hidden": "true"
}, iu = 240, $n = 8, cu = 1, uu = /* @__PURE__ */ re({
  __name: "ImagesView",
  setup(e) {
    const t = Ce(), n = Pt(), a = Sr(/* @__PURE__ */ new Map()), r = Sr(/* @__PURE__ */ new Set());
    function s(w, y) {
      const $ = y.target;
      $.naturalWidth > 0 && $.naturalHeight > 0 && a.set(w, { width: $.naturalWidth, height: $.naturalHeight });
    }
    function l(w) {
      const y = w.parts.image;
      return y && !r.has(y) ? y : null;
    }
    function i(w) {
      const y = l(w);
      return y ? a.get(y) : void 0;
    }
    function o(w) {
      const y = i(w);
      return y ? { ratio: y.width / y.height, height: y.height } : { ratio: cu };
    }
    const c = V(null), u = V(0);
    let m = null;
    function x() {
      u.value = c.value?.clientWidth ?? 0;
    }
    un(() => {
      x(), !(!c.value || typeof ResizeObserver > "u") && (m = new ResizeObserver(x), m.observe(c.value));
    }), Ie(() => {
      m?.disconnect(), m = null;
    });
    const b = p(() => {
      const w = su(n.value, o, {
        width: u.value,
        height: iu,
        gap: $n
      }), y = [];
      let $ = 0;
      for (const g of w) {
        let M = 0;
        for (const k of g.items) {
          const S = o(k).ratio * g.height, C = i(k), z = C !== void 0 && C.height < g.height;
          y.push({
            entry: k,
            style: {
              top: `${$}px`,
              left: `${M}px`,
              width: `${S}px`,
              height: `${g.height}px`
            },
            picture: z ? { width: `${C.width}px`, height: `${C.height}px` } : { width: "100%", height: "100%" }
          }), M += S + $n;
        }
        $ += g.height + $n;
      }
      return { boxes: y, height: w.length ? $ - $n : 0 };
    });
    return (w, y) => (f(), h("div", ou, [
      P("div", {
        ref_key: "wall",
        ref: c,
        class: "dc-images__wall",
        style: xe({ height: `${b.value.height}px` })
      }, [
        (f(!0), h(te, null, he(b.value.boxes, ({ entry: $, style: g, picture: M }) => (f(), h("div", {
          key: $.key,
          class: "dc-images__cell",
          style: xe(g)
        }, [
          de(et, {
            class: "dc-images__open",
            title: $.parts.identity,
            "aria-label": $.parts.identity,
            href: O(t).pressHref($.row),
            onPress: (k) => O(t).activate($.row, k)
          }, {
            default: Ee(() => [
              l($) ? (f(), Y(ta, {
                key: 0,
                class: "dc-images__picture",
                style: xe(M),
                src: l($),
                onLoad: (k) => s(l($), k),
                onError: (k) => r.add(l($))
              }, null, 8, ["style", "src", "onLoad", "onError"])) : (f(), h("span", lu, B($.parts.identity), 1))
            ]),
            _: 2
          }, 1032, ["title", "aria-label", "href", "onPress"]),
          O(t).selectable.value ? (f(), Y(At, {
            key: 0,
            class: "dc-images__tick",
            row: $.row,
            selected: $.selected,
            name: $.parts.identity
          }, null, 8, ["row", "selected", "name"])) : L("", !0)
        ], 4))), 128))
      ], 4)
    ]));
  }
}), Ks = /* @__PURE__ */ oe(uu, [["__scopeId", "data-v-2d267370"]]), du = { class: "dc-links" }, fu = { class: "dc-link__primary dc-truncate" }, pu = { class: "dc-link__secondary dc-mono dc-truncate" }, vu = /* @__PURE__ */ re({
  __name: "LinksView",
  setup(e) {
    const t = Ce(), n = Pt();
    return (a, r) => (f(), h("div", du, [
      (f(!0), h(te, null, he(O(n), (s) => (f(), h("span", {
        key: s.key,
        class: "dc-links__item"
      }, [
        O(t).selectable.value ? (f(), Y(At, {
          key: 0,
          row: s.row,
          selected: s.selected,
          name: s.parts.identity
        }, null, 8, ["row", "selected", "name"])) : L("", !0),
        de(et, {
          class: "dc-link",
          href: O(t).pressHref(s.row),
          onPress: (l) => O(t).activate(s.row, l)
        }, {
          default: Ee(() => [
            P("span", fu, B(s.parts.identity), 1),
            P("span", pu, B(s.parts.reference), 1)
          ]),
          _: 2
        }, 1032, ["href", "onPress"])
      ]))), 128))
    ]));
  }
}), Ws = /* @__PURE__ */ oe(vu, [["__scopeId", "data-v-de6c9a0f"]]), hu = {
  class: "dc-list",
  role: "list"
}, mu = { class: "dc-list__ordinal dc-mono" }, gu = { class: "dc-list__identity" }, yu = { class: "dc-list__primary dc-truncate" }, _u = { class: "dc-list__secondary dc-mono dc-truncate" }, wu = {
  key: 1,
  class: "dc-list__entity dc-mono"
}, ku = { class: "dc-list__metrics dc-mono" }, bu = { class: "dc-list__trailing" }, $u = /* @__PURE__ */ re({
  __name: "ListView",
  setup(e) {
    const t = Ce(), n = Pt(), a = p(() => t.isEverything.value);
    return (r, s) => (f(), h("div", hu, [
      (f(!0), h(te, null, he(O(n), (l) => (f(), h("div", {
        key: l.key,
        class: "dc-list__row",
        role: "listitem"
      }, [
        O(t).selectable.value ? (f(), Y(At, {
          key: 0,
          class: "dc-list__tick",
          row: l.row,
          selected: l.selected,
          name: l.parts.identity
        }, null, 8, ["row", "selected", "name"])) : L("", !0),
        de(Hs, {
          class: "dc-list__standing",
          entry: l
        }, null, 8, ["entry"]),
        de(et, {
          class: "dc-list__open",
          href: O(t).pressHref(l.row),
          onPress: (i) => O(t).activate(l.row, i)
        }, {
          default: Ee(() => [
            P("span", mu, B(l.ordinal), 1),
            P("span", gu, [
              P("span", yu, B(l.parts.identity), 1),
              P("span", _u, B(l.parts.reference), 1)
            ])
          ]),
          _: 2
        }, 1032, ["href", "onPress"]),
        a.value ? (f(), h("span", wu, B(l.entityLabel), 1)) : L("", !0),
        P("span", ku, [
          (f(!0), h(te, null, he(l.parts.metrics.slice(0, 2), (i) => (f(), Y(vn, {
            key: i.column.key ?? i.label,
            entry: l,
            column: i.column
          }, null, 8, ["entry", "column"]))), 128))
        ]),
        P("span", bu, [
          l.parts.state ? (f(), Y(pn, {
            key: 0,
            status: l.parts.state
          }, null, 8, ["status"])) : L("", !0),
          de(mn, { entry: l }, null, 8, ["entry"]),
          de(hn, { entry: l }, null, 8, ["entry"]),
          O(t).pinnable.value ? (f(), Y(rr, {
            key: 1,
            row: l.row,
            name: l.parts.identity,
            pinned: l.pinned
          }, null, 8, ["row", "name", "pinned"])) : L("", !0)
        ])
      ]))), 128))
    ]));
  }
}), za = /* @__PURE__ */ oe($u, [["__scopeId", "data-v-3d349a10"]]), xu = { class: "dc-preview" }, Su = { class: "dc-preview__pager dc-mono" }, Mu = ["disabled"], Cu = { "aria-live": "polite" }, Eu = ["disabled"], Pu = {
  key: 0,
  class: "dc-preview__card"
}, Au = ["src"], Tu = { class: "dc-preview__body" }, Lu = { class: "dc-preview__top" }, Ou = { class: "dc-preview__badges" }, Ru = { class: "dc-preview__entity dc-mono" }, zu = { class: "dc-preview__marks" }, Iu = { class: "dc-preview__primary" }, Nu = { class: "dc-preview__secondary dc-mono" }, Bu = { class: "dc-preview__fields" }, Fu = { class: "dc-preview__key" }, Du = { class: "dc-preview__value dc-mono" }, Hu = /* @__PURE__ */ re({
  __name: "PreviewView",
  setup(e) {
    const t = Ce(), n = Pt(), a = V(0);
    be(n, (o) => {
      a.value > o.length - 1 && (a.value = Math.max(0, o.length - 1));
    });
    const r = p(() => n.value[a.value]), s = p(() => {
      const o = r.value;
      if (!o) return [];
      const c = Xe(o.columns, "reference"), u = Xe(o.columns, "updated");
      return [
        ...c ? [{ key: c.label ?? "Reference", value: o.parts.reference, column: null }] : [],
        ...o.parts.metrics.map((m) => ({
          key: m.label,
          value: m.text,
          column: m.column
        })),
        ...u ? [{ key: u.label ?? "Updated", value: o.parts.updated, column: null }] : []
      ];
    }), l = p(() => {
      if (!n.value.length) return "0 / 0";
      const o = t.total.value > n.value.length ? ` of ${t.total.value}` : "";
      return `${a.value + 1} / ${n.value.length}${o}`;
    }), i = (o) => {
      const c = n.value.length;
      c && (a.value = Math.min(c - 1, Math.max(0, a.value + o)));
    };
    return (o, c) => (f(), h("div", xu, [
      P("div", Su, [
        P("button", {
          type: "button",
          class: "dc-preview__step",
          "aria-label": "Previous result",
          disabled: a.value === 0,
          onClick: c[0] || (c[0] = (u) => i(-1))
        }, " ‹ ", 8, Mu),
        P("span", Cu, B(l.value), 1),
        P("button", {
          type: "button",
          class: "dc-preview__step",
          "aria-label": "Next result",
          disabled: a.value >= O(n).length - 1,
          onClick: c[1] || (c[1] = (u) => i(1))
        }, " › ", 8, Eu)
      ]),
      r.value ? (f(), h("div", Pu, [
        P("div", {
          class: "dc-preview__media",
          style: xe({ background: r.value.parts.tint ?? void 0 }),
          "aria-hidden": "true"
        }, [
          r.value.parts.image ? (f(), h("img", {
            key: 0,
            class: "dc-preview__image",
            src: r.value.parts.image,
            alt: ""
          }, null, 8, Au)) : (f(), h(te, { key: 1 }, [
            Ae(" preview ")
          ], 64))
        ], 4),
        P("div", Tu, [
          P("div", Lu, [
            P("span", Ou, [
              O(t).selectable.value ? (f(), Y(At, {
                key: 0,
                row: r.value.row,
                selected: r.value.selected,
                name: r.value.parts.identity
              }, null, 8, ["row", "selected", "name"])) : L("", !0),
              r.value.parts.state ? (f(), Y(pn, {
                key: 1,
                status: r.value.parts.state
              }, null, 8, ["status"])) : L("", !0),
              P("span", Ru, B(r.value.entityLabel), 1)
            ]),
            P("span", zu, [
              de(sr, { entry: r.value }, null, 8, ["entry"]),
              de(mn, { entry: r.value }, null, 8, ["entry"]),
              de(hn, { entry: r.value }, null, 8, ["entry"]),
              O(t).pinnable.value ? (f(), Y(rr, {
                key: 0,
                row: r.value.row,
                name: r.value.parts.identity,
                pinned: r.value.pinned
              }, null, 8, ["row", "name", "pinned"])) : L("", !0)
            ])
          ]),
          P("div", null, [
            P("div", Iu, B(r.value.parts.identity), 1),
            P("div", Nu, B(r.value.parts.reference), 1)
          ]),
          P("dl", Bu, [
            (f(!0), h(te, null, he(s.value, (u) => (f(), h("div", {
              key: u.key,
              class: "dc-preview__field"
            }, [
              P("dt", Fu, B(u.key), 1),
              P("dd", Du, [
                u.column && r.value ? (f(), Y(vn, {
                  key: 0,
                  entry: r.value,
                  column: u.column
                }, null, 8, ["entry", "column"])) : (f(), h(te, { key: 1 }, [
                  Ae(B(u.value), 1)
                ], 64))
              ])
            ]))), 128))
          ]),
          de(et, {
            class: "dc-preview__open",
            href: r.value ? O(t).pressHref(r.value.row) : null,
            onPress: c[2] || (c[2] = (u) => r.value && O(t).activate(r.value.row, u))
          }, {
            default: Ee(() => [...c[3] || (c[3] = [
              Ae(" Open record → ", -1)
            ])]),
            _: 1
          }, 8, ["href"])
        ])
      ])) : L("", !0)
    ]));
  }
}), js = /* @__PURE__ */ oe(Hu, [["__scopeId", "data-v-59e0d33b"]]);
function qu() {
  const e = Ce();
  return p(() => ml(e.schema.value, e.entity.value));
}
const Vu = {
  key: 5,
  class: "dc-cell__text"
}, Ku = /* @__PURE__ */ re({
  __name: "ColumnCell",
  props: {
    column: {},
    entry: {}
  },
  setup(e) {
    const t = e, n = Ce(), a = p(() => t.column.kind ?? "text"), r = p(() => He(t.column, t.entry.row)), s = p(
      () => a.value === "ordinal" ? t.entry.ordinal : Ft(t.column, t.entry.row)
    ), l = p(() => r.value), i = p(() => t.column.activate === !0 || !!t.column.click), o = p(() => Pa(t.column)), c = p(() => cs(t.column, t.entry.row));
    function u(b) {
      i.value && (b.stopPropagation(), m(ea(b)));
    }
    function m(b) {
      t.column.click?.(t.entry.row, b), t.column.activate && n.activate(t.entry.row, b);
    }
    const x = p(
      () => t.column.activate && !t.column.click ? n.pressHref(t.entry.row) : null
    );
    return (b, w) => a.value === "component" && e.column.component ? (f(), Y(Wn(e.column.component), {
      key: 0,
      row: e.entry.row,
      entry: e.entry,
      value: r.value,
      column: e.column
    }, null, 8, ["row", "entry", "value", "column"])) : a.value === "status" ? (f(), Y(pn, {
      key: 1,
      status: l.value
    }, null, 8, ["status"])) : a.value === "image" ? (f(), Y(ta, {
      key: 2,
      class: "dc-cell__image",
      src: typeof r.value == "string" ? r.value : "",
      style: xe({ maxHeight: e.column.height }),
      onClick: u
    }, null, 8, ["src", "style"])) : e.column.drill ? (f(), Y(vn, {
      key: 3,
      entry: e.entry,
      column: e.column
    }, null, 8, ["entry", "column"])) : i.value ? (f(), Y(et, {
      key: 4,
      class: Je(["dc-table__open", { "dc-truncate": o.value }]),
      href: x.value,
      title: c.value,
      onPress: w[0] || (w[0] = (y, $) => {
        $.stopPropagation(), m(y);
      })
    }, {
      default: Ee(() => [
        Ae(B(s.value), 1)
      ]),
      _: 1
    }, 8, ["class", "href", "title"])) : (f(), h("span", Vu, B(s.value), 1));
  }
}), Hr = /* @__PURE__ */ oe(Ku, [["__scopeId", "data-v-4dd1835e"]]), Wu = {
  key: 0,
  class: "dc-table__none"
}, ju = { class: "dc-table__detail" }, Uu = ["data-dc-wrap"], Gu = { "data-dc-stuck": "" }, Yu = {
  key: 0,
  class: "dc-table__pick",
  scope: "col"
}, Xu = {
  key: 1,
  class: "dc-table__standing",
  scope: "col"
}, Qu = ["data-dc-align", "data-dc-hide", "aria-sort", "title"], Zu = ["onClick"], Ju = {
  key: 2,
  class: "dc-table__head"
}, ed = ["onClick"], td = {
  key: 0,
  class: "dc-table__pick"
}, nd = {
  key: 1,
  class: "dc-table__standing"
}, ad = ["data-dc-align", "data-dc-hide", "title"], rd = {
  key: 0,
  class: "dc-table__name"
}, sd = /* @__PURE__ */ re({
  __name: "TableView",
  setup(e) {
    const t = Ce(), n = Pt(), a = qu();
    function r(E, K) {
      const W = t.pressHref(E);
      if (W && Ms(K)) {
        const X = K.shiftKey ? `noopener,popup,width=${window.outerWidth},height=${window.outerHeight}` : "noopener";
        window.open(W, "_blank", X);
        return;
      }
      t.activate(E, ea(K));
    }
    function s(E) {
      const K = vs(E, t.entity.value, t.schema.value), W = K ? `Shortcut: ${K}` : void 0;
      return [E.hint, W].filter(Boolean).join(`
`) || void 0;
    }
    const l = p(() => {
      const E = a.value.find((W) => W.scope);
      return E || ((t.entity.value ? !!t.entity.value.href : t.entities.value.some((W) => W.href)) ? a.value.find((W) => W.activate) : void 0);
    }), i = p(
      () => t.entity.value ? !!t.entity.value.scope : t.entities.value.some((E) => E.scope)
    ), o = (E) => Zn(E.entity, E.row), c = (E) => er(t.query.value.expr, o(E));
    function u(E, K) {
      t.setExpression(La(t.query.value.expr, o(E), K));
    }
    const m = p(() => {
      const E = n.value.filter((W) => o(W) !== null), K = E.filter((W) => W.selected);
      return K.length ? K : E;
    }), x = p(() => m.value.some((E) => E.selected)), b = p(() => {
      const E = m.value[0];
      return E ? c(E) : null;
    }), w = p(
      () => m.value.some((E) => c(E) !== b.value)
    ), y = p(
      () => x.value ? "the ticked rows" : "every row on this page"
    );
    function $(E) {
      t.setExpression(
        m.value.reduce(
          (K, W) => La(K, o(W), E),
          t.query.value.expr
        )
      );
    }
    const g = p(
      () => a.value.some((E) => E.kind === "image" || E.height !== void 0)
    );
    function M(E) {
      E && (t.query.value.sort === E ? t.toggleDirection() : t.setSort(E));
    }
    const k = p(() => t.entity.value?.label ?? "The result set"), S = p(() => new Set(t.sorts.value.map((E) => E.key))), C = (E) => E.sort !== void 0 && S.value.has(E.sort), z = (E) => {
      if (C(E))
        return t.query.value.sort !== E.sort ? "none" : t.query.value.dir === "desc" ? "descending" : "ascending";
    };
    function T(E) {
      return [
        Pr(E),
        E.muted ? "dc-table__muted" : "",
        E.mono ? "dc-mono" : "",
        Pa(E) ? "dc-truncate" : ""
      ].filter(Boolean).join(" ");
    }
    function A(E, K) {
      if (!(!Pa(E) || E.activate || E.click))
        return cs(E, K.row);
    }
    return (E, K) => O(a).length ? (f(), h("table", {
      key: 1,
      class: "dc-table",
      "data-dc-wrap": g.value ? "" : void 0
    }, [
      P("thead", Gu, [
        P("tr", null, [
          O(t).selectable.value ? (f(), h("th", Yu, [
            de(Bs)
          ])) : L("", !0),
          i.value ? (f(), h("th", Xu, [
            m.value.length ? (f(), Y(Ra, {
              key: 0,
              standing: b.value,
              mixed: w.value,
              name: y.value,
              onSet: $
            }, null, 8, ["standing", "mixed", "name"])) : L("", !0)
          ])) : L("", !0),
          (f(!0), h(te, null, he(O(a), (W, X) => (f(), h("th", {
            key: O(Cr)(W, X),
            scope: "col",
            class: Je(O(Pr)(W)),
            style: xe({ width: W.width }),
            "data-dc-align": O(Er)(W),
            "data-dc-hide": W.hideBelow,
            "aria-sort": z(W),
            title: s(W)
          }, [
            C(W) ? (f(), h("button", {
              key: 0,
              type: "button",
              class: "dc-table__sort",
              onClick: (ge) => M(W.sort)
            }, B(W.label), 9, Zu)) : (f(), h(te, { key: 1 }, [
              Ae(B(W.label), 1)
            ], 64)),
            W.header ? (f(), h("span", Ju, [
              (f(), Y(Wn(W.header), {
                column: W,
                entity: O(t).entity.value
              }, null, 8, ["column", "entity"]))
            ])) : L("", !0)
          ], 14, Qu))), 128))
        ])
      ]),
      P("tbody", null, [
        (f(!0), h(te, null, he(O(n), (W) => (f(), h("tr", {
          key: W.key,
          class: "dc-table__row",
          onClick: (X) => r(W.row, X)
        }, [
          O(t).selectable.value ? (f(), h("td", td, [
            de(At, {
              row: W.row,
              selected: W.selected,
              name: W.parts.identity
            }, null, 8, ["row", "selected", "name"])
          ])) : L("", !0),
          i.value ? (f(), h("td", nd, [
            o(W) !== null ? (f(), Y(Ra, {
              key: 0,
              standing: c(W),
              name: W.parts.identity,
              onSet: (X) => u(W, X)
            }, null, 8, ["standing", "name", "onSet"])) : L("", !0)
          ])) : L("", !0),
          (f(!0), h(te, null, he(O(a), (X, ge) => (f(), h("td", {
            key: O(Cr)(X, ge),
            class: Je(T(X)),
            "data-dc-align": O(Er)(X),
            "data-dc-hide": X.hideBelow,
            title: A(X, W)
          }, [
            X === l.value ? (f(), h("span", rd, [
              de(Hr, {
                column: X,
                entry: W
              }, null, 8, ["column", "entry"]),
              de(mn, { entry: W }, null, 8, ["entry"]),
              de(hn, { entry: W }, null, 8, ["entry"])
            ])) : (f(), Y(Hr, {
              key: 1,
              column: X,
              entry: W
            }, null, 8, ["column", "entry"]))
          ], 10, ad))), 128))
        ], 8, ed))), 128))
      ])
    ], 8, Uu)) : (f(), h("p", Wu, [
      K[2] || (K[2] = P("span", { class: "dc-table__headline" }, "No columns declared", -1)),
      P("span", ju, [
        Ae(B(k.value) + " has no ", 1),
        K[0] || (K[0] = P("code", null, "columns", -1)),
        K[1] || (K[1] = Ae(" in the schema, so there is no table to draw. ", -1))
      ])
    ]));
  }
}), Us = /* @__PURE__ */ oe(sd, [["__scopeId", "data-v-02bea582"]]);
function od(e) {
  const t = ft([]), n = V(!1), a = ft(null);
  let r = 0;
  const s = (o, c, u, m, x) => ({
    entity: o,
    rows: e.limit.value > 0 ? c.rows.map((b, w) => Ds(b, w, o, e.isPinned(b.id))) : [],
    total: c.total,
    count: u ? o.count : String(c.total),
    pinned: ld(m, c, x)
  }), l = () => {
    const o = ++r, c = e.query.value, u = e.schema.value, m = e.entities.value, x = e.limit.value, b = e.within?.value.trim() ?? "", w = Wa(c) && !b, y = b ? Xa(b, c.expr) : c.expr, $ = m.map((g) => ({
      entity: g,
      // Scope the query to this entity, keeping the expression and ordering.
      outcome: e.source.value.query({
        // Each card is the top few of its type, wherever the shell's own
        // result set has been paged to — so this asks for the first page.
        query: { ...c, entity: g.key, expr: y, page: 1 },
        schema: u,
        entity: g,
        /*
         * One row where none are shown, not none: to a source a limit of 0 is
         * no limit, which would fetch every record of every type to draw a
         * count. The one row is still read — it is what says whether the type
         * holds nothing but the record the query named.
         */
        limit: Math.max(x, 1),
        offset: 0
      })
    }));
    if ($.every(({ outcome: g }) => !(g instanceof Promise))) {
      t.value = $.map(
        ({ entity: g, outcome: M }) => s(g, M, w, u, y)
      ), a.value = null, n.value = !1;
      return;
    }
    n.value = !0, Promise.all($.map(({ outcome: g }) => Promise.resolve(g))).then((g) => {
      o === r && (t.value = g.map(
        (M, k) => s($[k].entity, M, w, u, y)
      ), a.value = null);
    }).catch((g) => {
      o === r && (a.value = g, t.value = []);
    }).finally(() => {
      o === r && (n.value = !1);
    });
  }, i = () => {
    try {
      l();
    } catch (o) {
      a.value = o, t.value = [], n.value = !1;
    }
  };
  return be(
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
function ld(e, t, n) {
  const a = t.rows[0];
  if (t.total !== 1 || t.rows.length !== 1 || !a)
    return !1;
  const r = n.trim();
  if (!r)
    return !1;
  const s = Nn(e, a);
  return !!s && fn(r, s) === r;
}
const id = ["data-dc-pending", "data-dc-heads-only"], cd = {
  key: 0,
  class: "dc-types__state",
  role: "alert"
}, ud = {
  key: 1,
  class: "dc-types__state",
  "aria-live": "polite"
}, dd = {
  key: 2,
  class: "dc-types__state"
}, fd = ["data-dc-empty"], pd = { class: "dc-type__name" }, vd = { class: "dc-type__count dc-mono" }, hd = { class: "dc-type__sr" }, md = {
  key: 0,
  class: "dc-type__description"
}, gd = {
  key: 0,
  class: "dc-type__empty"
}, yd = { class: "dc-type__identity" }, _d = { class: "dc-type__primary dc-truncate" }, wd = { class: "dc-type__secondary dc-mono dc-truncate" }, kd = { class: "dc-type__trailing dc-mono" }, bd = { class: "dc-type__metric-value" }, $d = { class: "dc-type__metric-label" }, xd = {
  key: 0,
  class: "dc-type__date"
}, Sd = ["onClick"], Md = /* @__PURE__ */ re({
  __name: "TypeCardsView",
  setup(e) {
    const t = Ce(), { previews: n, pending: a, error: r } = od({
      source: t.source,
      schema: t.schema,
      // The query as the results are read under it, so a word being typed in the
      // header narrows the cards as it narrows any list — see `liveQuery`.
      query: t.liveQuery,
      entities: t.entities,
      limit: t.previewsPerType,
      within: t.within,
      isPinned: (o) => t.isPinnedId(o)
    }), s = p(
      () => !t.isPristine.value || !!t.within.value || t.drafting.value
    ), l = p(() => t.previewsPerType.value <= 0), i = p(
      () => n.value.filter(
        (o) => !o.pinned && (o.total > 0 || !l.value && o.entity.create)
      )
    );
    return (o, c) => (f(), h("div", {
      class: "dc-types",
      "data-dc-pending": O(a) ? "true" : "false",
      "data-dc-heads-only": l.value ? "true" : "false"
    }, [
      we(o.$slots, "before", {}, void 0, !0),
      O(r) ? (f(), h("p", cd, " Could not load results: " + B(O(r) instanceof Error ? O(r).message : "the data source failed."), 1)) : !i.value.length && O(a) ? (f(), h("p", ud, " Running query… ")) : i.value.length ? L("", !0) : (f(), h("p", dd, B(s.value ? "Nothing matches this query" : "Nothing here yet"), 1)),
      (f(!0), h(te, null, he(i.value, (u) => (f(), h("section", {
        key: u.entity.key,
        class: "dc-type",
        "data-dc-empty": u.total ? "false" : "true"
      }, [
        de(et, {
          class: "dc-type__head",
          href: O(t).entityHref(u.entity.key),
          onPress: (m) => O(t).setEntity(u.entity.key)
        }, {
          default: Ee(() => [
            P("span", pd, B(u.entity.label), 1),
            P("span", vd, B(u.count), 1),
            c[0] || (c[0] = P("span", {
              class: "dc-type__go",
              "aria-hidden": "true"
            }, "→", -1)),
            P("span", hd, "Show only " + B(u.entity.label.toLowerCase()), 1),
            u.entity.description ? (f(), h("span", md, B(u.entity.description), 1)) : L("", !0)
          ]),
          _: 2
        }, 1032, ["href", "onPress"]),
        u.total ? L("", !0) : (f(), h("p", gd, B(s.value ? "No matches" : "Nothing here yet"), 1)),
        (f(!0), h(te, null, he(u.rows, (m) => (f(), h("div", {
          key: m.key,
          class: "dc-type__row"
        }, [
          de(et, {
            class: "dc-type__open",
            href: O(t).pressHref(m.row),
            onPress: (x) => O(t).activate(m.row, x)
          }, {
            default: Ee(() => [
              P("span", yd, [
                P("span", _d, B(m.parts.identity), 1),
                P("span", wd, B(m.parts.reference), 1)
              ])
            ]),
            _: 2
          }, 1032, ["href", "onPress"]),
          P("span", kd, [
            (f(!0), h(te, null, he(m.parts.metrics.slice(0, 1), (x) => (f(), Y(vn, {
              key: x.column.key ?? x.label,
              class: "dc-type__metric",
              entry: m,
              column: x.column
            }, {
              default: Ee(() => [
                P("span", bd, B(x.text), 1),
                P("span", $d, B(x.label), 1)
              ]),
              _: 2
            }, 1032, ["entry", "column"]))), 128)),
            m.parts.updated ? (f(), h("span", xd, B(m.parts.updated), 1)) : L("", !0),
            de(sr, { entry: m }, null, 8, ["entry"]),
            de(mn, { entry: m }, null, 8, ["entry"]),
            de(hn, { entry: m }, null, 8, ["entry"])
          ])
        ]))), 128)),
        u.entity.create && !l.value ? (f(), h("button", {
          key: 1,
          type: "button",
          class: "dc-type__new",
          onClick: (m) => O(t).create(u.entity)
        }, [
          c[1] || (c[1] = P("span", {
            class: "dc-type__plus",
            "aria-hidden": "true"
          }, "+", -1)),
          Ae(" " + B(u.entity.create), 1)
        ], 8, Sd)) : L("", !0)
      ], 8, fd))), 128)),
      we(o.$slots, "after", {}, void 0, !0)
    ], 8, id));
  }
}), Gs = /* @__PURE__ */ oe(Md, [["__scopeId", "data-v-91923a83"]]), Cd = ["data-dc-pending", "data-dc-more"], Ed = {
  key: 0,
  class: "dc-results__state dc-results__state--loading",
  "aria-live": "polite"
}, Pd = {
  key: 2,
  class: "dc-results__state",
  role: "alert"
}, Ad = { class: "dc-results__detail" }, Td = {
  key: 3,
  class: "dc-results__state",
  "aria-live": "polite"
}, Ld = {
  key: 4,
  class: "dc-results__state"
}, Od = { class: "dc-results__detail" }, Rd = /* @__PURE__ */ re({
  __name: "ResultsArea",
  props: {
    views: {},
    loading: { type: Boolean }
  },
  setup(e) {
    const t = e, n = Ce(), a = cn(), r = {
      list: za,
      cards: qs,
      grid: Vs,
      images: Ks,
      table: Us,
      links: Ws,
      preview: js
    }, s = p(() => ja(n.query.value, t.views)), l = p(() => Ka(n.query.value.view, t.views)), i = p(() => r[l.value] ?? za), o = p(() => n.rows.value.length > 0), c = p(() => n.error.value !== null), u = V(null);
    be(
      // The page on screen, which is the draft's own while one is being typed.
      () => n.liveQuery.value.page,
      () => {
        u.value && (u.value.scrollTop = 0);
      }
    );
    const m = V(""), x = V({ x: 0, y: 0 }), b = V(0);
    function w() {
      const g = u.value;
      if (!g) {
        m.value = "";
        return;
      }
      const M = {
        top: g.scrollTop > 1,
        right: g.scrollWidth - g.clientWidth - g.scrollLeft > 1,
        bottom: g.scrollHeight - g.clientHeight - g.scrollTop > 1,
        left: g.scrollLeft > 1
      };
      m.value = Object.entries(M).filter(([, k]) => k).map(([k]) => k).join(" "), x.value = {
        x: g.offsetHeight - g.clientHeight,
        y: g.offsetWidth - g.clientWidth
      }, b.value = g.querySelector("[data-dc-stuck]")?.offsetHeight ?? 0;
    }
    let y = null, $ = null;
    return be(
      u,
      (g, M) => {
        if (M?.removeEventListener("scroll", w), y?.disconnect(), $?.disconnect(), y = null, $ = null, w(), !g || (g.addEventListener("scroll", w, { passive: !0 }), typeof ResizeObserver > "u")) return;
        const k = new ResizeObserver(w), S = () => {
          k.disconnect(), k.observe(g);
          for (const C of g.children) k.observe(C);
        };
        S(), y = k, !(typeof MutationObserver > "u") && ($ = new MutationObserver(() => {
          S(), w();
        }), $.observe(g, { childList: !0 }));
      },
      { flush: "post" }
    ), Ie(() => {
      u.value?.removeEventListener("scroll", w), y?.disconnect(), $?.disconnect();
    }), (g, M) => (f(), h("div", {
      ref_key: "scroller",
      ref: u,
      class: "dc-results",
      "data-dc-pending": O(n).pending.value ? "true" : "false",
      "data-dc-more": m.value,
      style: xe({
        "--dc-results-gutter-x": `${x.value.x}px`,
        "--dc-results-gutter-y": `${x.value.y}px`,
        "--dc-results-stuck": `${b.value}px`
      })
    }, [
      e.loading ? (f(), h("p", Ed, [...M[1] || (M[1] = [
        P("span", { class: "dc-results__detail" }, "Loading…", -1)
      ])])) : s.value ? (f(), Y(Gs, { key: 1 }, Ca({ _: 2 }, [
        a["cards-before"] ? {
          name: "before",
          fn: Ee(() => [
            we(g.$slots, "cards-before", {}, void 0, !0)
          ]),
          key: "0"
        } : void 0,
        a["cards-after"] ? {
          name: "after",
          fn: Ee(() => [
            we(g.$slots, "cards-after", {}, void 0, !0)
          ]),
          key: "1"
        } : void 0
      ]), 1024)) : c.value ? (f(), h("p", Pd, [
        M[2] || (M[2] = P("span", { class: "dc-results__headline" }, "Could not load results", -1)),
        P("span", Ad, B(O(n).error.value instanceof Error ? O(n).error.value.message : "The data source failed."), 1)
      ])) : !o.value && O(n).pending.value ? (f(), h("p", Td, [...M[3] || (M[3] = [
        P("span", { class: "dc-results__detail" }, "Running query…", -1)
      ])])) : o.value ? (f(), Y(Wn(i.value), { key: 5 })) : (f(), h("div", Ld, [
        M[4] || (M[4] = P("span", { class: "dc-results__headline" }, "Nothing matches this query", -1)),
        P("span", Od, B(O(n).summary.value), 1),
        O(n).isPristine.value ? L("", !0) : (f(), h("button", {
          key: 0,
          type: "button",
          class: "dc-results__clear",
          onClick: M[0] || (M[0] = (k) => O(n).clearFilters())
        }, B(O(n).isEverything.value ? "Clear filters" : "Search everything instead"), 1))
      ]))
    ], 12, Cd));
  }
}), Ys = /* @__PURE__ */ oe(Rd, [["__scopeId", "data-v-71c5b73f"]]), zd = ["data-dc-theme"], Id = { class: "dc-shell__head" }, Nd = {
  key: 0,
  class: "dc-shell__page"
}, Bd = /* @__PURE__ */ re({
  __name: "DataShell",
  props: /* @__PURE__ */ Ln({
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
    typeChooser: { default: "scoped" },
    accent: {},
    tokens: {},
    theme: { default: "minimal" },
    pinnable: { type: Boolean },
    selectable: { type: Boolean },
    rowPress: { default: "narrow" },
    pagesNote: {},
    navigationMode: { default: "push" },
    facetNavigationMode: { default: "replace" }
  }, {
    pinned: { default: () => [] },
    pinnedModifiers: {},
    selected: { default: () => [] },
    selectedModifiers: {}
  }),
  emits: /* @__PURE__ */ Ln(["activate", "create", "duplicate", "delete", "operate", "drill", "query-change", "toggle-pin"], ["update:pinned", "update:selected"]),
  setup(e, { expose: t, emit: n }) {
    const a = e, r = n, s = Tn(e, "pinned"), l = Tn(e, "selected"), i = cn(), o = Mt(as, null), c = a.route || o ? null : Jo(), u = a.route ?? o ?? c;
    Ie(() => c?.dispose?.());
    const m = V(!!i.page);
    Ko(() => {
      m.value = !!i.page;
    });
    const x = el(u, {
      detached: () => m.value && a.pageQuery === "detached",
      path: () => a.listPath
    }), b = p(() => Ul({ seed: a.schema.key })), w = p(() => a.source ?? b.value), y = pi({
      schema: () => a.schema,
      adapter: x,
      defaults: () => a.defaults,
      navigationMode: () => a.navigationMode,
      facetNavigationMode: () => a.facetNavigationMode
    }), $ = p(() => a.within?.trim() ?? ""), g = mi({
      query: y.query,
      entity: y.entity,
      schema: p(() => a.schema),
      setExpression: y.setExpression
    }), M = vi({
      source: w,
      query: g.live,
      schema: p(() => a.schema),
      entity: y.entity,
      limit: p(() => a.limit),
      within: $
    });
    be(y.query, (I) => r("query-change", I));
    const k = p(() => ti(a.schema, [y.query.value.expr])), S = p(
      () => k.value.flatMap((I) => {
        const J = a.schema.entities.find((fe) => fe.key === I.entityKey);
        return J ? [{ ...I, entity: J }] : [];
      })
    );
    function C() {
      if (i.record) return S.value;
      const I = a.recordCards;
      return I ? S.value.filter((J) => I[J.entityKey]) : [];
    }
    const z = p(() => {
      const I = a.views;
      return typeof I != "function" ? I : I({ entity: y.entity.value, records: k.value });
    });
    be(
      [M.pageCount, M.pending, y.query, g.drafting, () => a.loading, m],
      () => {
        if (M.pending.value || g.drafting.value || a.loading || m.value) return;
        const I = M.pageCount.value;
        y.query.value.page > I && y.setPage(I, "replace");
      },
      // Immediately, since a pasted URL is past the end before anything changes;
      // and after the render, so the correction is a navigation the mounted shell
      // makes rather than one it makes on the way up. An async source is still
      // pending here and corrects itself when its count lands.
      { immediate: !0, flush: "post" }
    );
    const T = p(() => new Set(s.value));
    function A(I) {
      const J = new Set(T.value);
      J.has(I.id) ? J.delete(I.id) : J.add(I.id), s.value = [...J], r("toggle-pin", I);
    }
    const E = p(() => {
      if (a.selectable === !0) return !0;
      const I = y.entity.value;
      return !!(I?.duplicate || I?.delete || I?.operations?.length);
    }), K = p(() => new Set(l.value));
    function W(I) {
      const J = new Set(K.value);
      J.has(I.id) ? J.delete(I.id) : J.add(I.id), l.value = [...J];
    }
    function X(I) {
      const J = new Set(K.value);
      for (const fe of M.rows.value)
        I ? J.add(fe.id) : J.delete(fe.id);
      l.value = [...J];
    }
    function ge() {
      l.value.length && (l.value = []);
    }
    const ve = p(() => ({
      ids: [...l.value],
      rows: M.rows.value.filter((I) => K.value.has(I.id)),
      entity: y.entity.value
    }));
    be(() => y.query.value.entity, ge);
    function Ne(I, J, fe = {}) {
      const qe = ma(a.schema, y.query.value, I, fe);
      fe.exclude ? y.narrow(qe, J?.key ?? y.query.value.entity) : g.release(() => y.narrow(qe, J?.key ?? null, J ? void 0 : "cards")), r("drill", I, J, fe);
    }
    function q(I) {
      return a.rowPress === "narrow" && Nn(a.schema, I) !== null;
    }
    function G(I) {
      return a.schema.entities.find((fe) => fe.key === I.entityKey)?.href?.(I) || null;
    }
    const se = ni({
      ...y,
      draft: g.text,
      liveQuery: g.live,
      drafting: g.drafting,
      commitDraft: g.commit,
      abandonDraft: g.abandon,
      /*
       * A page of what is on screen: the draft's, while one is live, which are
       * held beside it rather than in the URL — see `liveQuery`.
       */
      setPage: (I, J) => {
        g.drafting.value ? g.setPage(I) : y.setPage(I, J);
      },
      schema: p(() => a.schema),
      entities: p(() => a.schema.entities),
      rows: M.rows,
      total: M.total,
      limit: p(() => a.limit),
      offset: M.offset,
      pageCount: M.pageCount,
      pending: M.pending,
      counting: M.counting,
      error: M.error,
      source: w,
      previewsPerType: p(() => a.previewsPerType),
      within: $,
      pinnable: p(() => a.pinnable === !0),
      isPinned: (I) => T.value.has(I.id),
      isPinnedId: (I) => T.value.has(I),
      togglePin: A,
      selectable: E,
      selection: ve,
      isSelected: (I) => K.value.has(I.id),
      toggleSelect: W,
      selectPage: X,
      clearSelection: ge,
      narrowsOnPress: p(() => a.rowPress === "narrow"),
      /*
       * The one place a press is read, so every view gets the same answer without
       * knowing which of the two it is: they all call this.
       */
      activate: (I, J = {}) => {
        if (q(I)) {
          Ne(I, null, J);
          return;
        }
        const fe = G(I);
        if (fe) {
          window.open(fe, "_blank", "noopener");
          return;
        }
        r("activate", I);
      },
      pressHref: (I) => q(I) ? y.narrowHref(ma(a.schema, y.query.value, I), null, "cards") : G(I),
      recordHref: G,
      drillHref: (I, J) => Nn(a.schema, I) ? y.narrowHref(
        ma(a.schema, y.query.value, I),
        J?.key ?? null,
        J ? void 0 : "cards"
      ) : null,
      create: (I) => r("create", I),
      duplicate: () => r("duplicate", ve.value),
      delete: () => r("delete", ve.value),
      operate: (I) => r("operate", I, ve.value),
      drill: Ne
    });
    si({ theme: () => a.theme, accent: () => a.accent, tokens: () => a.tokens });
    const ie = p(() => {
      if (!(!a.accent && !a.tokens))
        return { ...a.tokens, ...a.accent ? { "--dc-accent": a.accent } : {} };
    });
    return t({
      query: y.query
    }), (I, J) => (f(), h("div", {
      class: "dc-shell",
      "data-dc-theme": e.theme,
      style: xe(ie.value)
    }, [
      P("div", Id, [
        de(Ns, {
          views: z.value,
          "pages-note": e.pagesNote,
          "hide-pages": e.loading || m.value
        }, Ca({ _: 2 }, [
          i.brand ? {
            name: "brand",
            fn: Ee((fe) => [
              we(I.$slots, "brand", Wo(jo(fe)), void 0, !0)
            ]),
            key: "0"
          } : void 0,
          i.actions ? {
            name: "actions",
            fn: Ee(() => [
              we(I.$slots, "actions", {}, void 0, !0)
            ]),
            key: "1"
          } : void 0
        ]), 1032, ["views", "pages-note", "hide-pages"])
      ]),
      i.page ? (f(), h("div", Nd, [
        we(I.$slots, "page", {
          query: O(se).query.value
        }, void 0, !0)
      ])) : L("", !0),
      i.page ? L("", !0) : (f(), Y(Fs, {
        key: 1,
        views: z.value,
        "type-chooser": e.typeChooser
      }, null, 8, ["views", "type-chooser"])),
      i.page ? L("", !0) : we(I.$slots, "results", {
        rows: O(se).rows.value,
        total: O(se).total.value,
        offset: O(se).offset.value,
        pageCount: O(se).pageCount.value,
        query: O(se).liveQuery.value,
        pending: O(se).pending.value,
        loading: e.loading
      }, () => [
        de(Ys, {
          views: z.value,
          loading: e.loading
        }, Ca({ _: 2 }, [
          i["cards-before"] || C().length ? {
            name: "cards-before",
            fn: Ee(() => [
              (f(!0), h(te, null, he(C(), (fe) => (f(), h(te, {
                key: `${fe.entityKey}:${fe.id}`
              }, [
                i.record ? we(I.$slots, "record", {
                  id: fe.id,
                  entity: fe.entity
                }, void 0, !0, 0) : (f(), Y(Wn(e.recordCards?.[fe.entityKey]), {
                  key: 1,
                  id: fe.id
                }, null, 8, ["id"]))
              ], 64))), 128)),
              we(I.$slots, "cards-before", {}, void 0, !0)
            ]),
            key: "0"
          } : void 0,
          i["cards-after"] ? {
            name: "cards-after",
            fn: Ee(() => [
              we(I.$slots, "cards-after", {}, void 0, !0)
            ]),
            key: "1"
          } : void 0
        ]), 1032, ["views", "loading"])
      ], !0, 2)
    ], 12, zd));
  }
}), Fd = /* @__PURE__ */ oe(Bd, [["__scopeId", "data-v-6843d3d0"]]), Dd = ["data-dc-muted", "data-dc-collapsed"], Hd = ["data-dc-collapsible"], qd = ["aria-expanded", "aria-controls"], Vd = { class: "dc-shell-card__sr" }, Kd = {
  key: 0,
  class: "dc-shell-card__identity"
}, Wd = { class: "dc-shell-card__title dc-shell-card__name" }, jd = {
  key: 0,
  class: "dc-shell-card__ref dc-mono"
}, Ud = {
  key: 1,
  class: "dc-shell-card__title"
}, Gd = {
  key: 2,
  class: "dc-shell-card__count dc-mono"
}, Yd = {
  key: 1,
  class: "dc-shell-card__aside"
}, Xd = ["data-dc-flush"], Qd = /* @__PURE__ */ re({
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
    const n = e, a = t, r = V(n.defaultCollapsed === !0), s = p(() => n.span === "all" ? { gridColumn: "1 / -1" } : void 0), l = cn();
    function i(A) {
      return o(A?.() ?? []);
    }
    function o(A) {
      return A.some((E) => E.type === Uo ? !1 : E.type === Go ? String(E.children ?? "").trim().length > 0 : E.type === te ? o(E.children ?? []) : !0);
    }
    const c = p(
      () => !!n.title || !!n.name || u.value || i(l.head)
    ), u = p(() => i(l.aside)), m = p(() => i(l.default)), x = p(() => i(l.foot)), b = p(
      () => !!n.name && (!!n.reference || i(l.reference))
    ), w = p(() => n.collapsible === !0 && c.value), y = p(() => w.value && (n.collapsed ?? r.value));
    function $() {
      const A = !y.value;
      r.value = A, a("update:collapsed", A);
    }
    const g = Vn() ?? "dc-shell-card", M = `${g}-body`, k = `${g}-foot`, S = p(
      () => [m.value ? M : "", x.value ? k : ""].filter(Boolean).join(" ") || void 0
    ), C = [
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
    ].join(", "), z = V(null);
    function T(A) {
      if (!w.value) return;
      const E = A.target?.closest(C);
      E && z.value?.contains(E) || typeof window < "u" && window.getSelection()?.toString() || $();
    }
    return (A, E) => (f(), h("section", {
      class: "dc-shell-card",
      style: xe(s.value),
      "data-dc-muted": e.muted ? "true" : "false",
      "data-dc-collapsed": y.value ? "true" : "false"
    }, [
      c.value ? (f(), h("header", {
        key: 0,
        ref_key: "head",
        ref: z,
        class: "dc-shell-card__head",
        "data-dc-collapsible": w.value ? "true" : "false",
        onClick: T
      }, [
        w.value ? (f(), h("button", {
          key: 0,
          type: "button",
          class: "dc-shell-card__toggle",
          "aria-expanded": y.value ? "false" : "true",
          "aria-controls": S.value,
          onClick: $
        }, [
          E[0] || (E[0] = P("svg", {
            class: "dc-shell-card__chevron",
            viewBox: "0 0 10 10",
            "aria-hidden": "true"
          }, [
            P("path", { d: "M2 3.5 5 6.5 8 3.5" })
          ], -1)),
          P("span", Vd, B(e.name || e.title || "Card"), 1)
        ], 8, qd)) : L("", !0),
        we(A.$slots, "head", {}, () => [
          e.name ? (f(), h("div", Kd, [
            P("h2", Wd, B(e.name), 1),
            b.value ? (f(), h("span", jd, [
              we(A.$slots, "reference", {}, () => [
                Ae(B(e.reference), 1)
              ], !0)
            ])) : L("", !0)
          ])) : (f(), h("h2", Ud, B(e.title), 1)),
          e.count !== void 0 ? (f(), h("span", Gd, B(e.count), 1)) : L("", !0)
        ], !0),
        u.value ? (f(), h("span", Yd, [
          we(A.$slots, "aside", {}, void 0, !0)
        ])) : L("", !0)
      ], 8, Hd)) : L("", !0),
      m.value ? en((f(), h("div", {
        key: 1,
        id: M,
        class: "dc-shell-card__body",
        "data-dc-flush": e.flush ? "true" : "false"
      }, [
        we(A.$slots, "default", {}, void 0, !0)
      ], 8, Xd)), [
        [On, !y.value]
      ]) : L("", !0),
      x.value ? en((f(), h("footer", {
        key: 2,
        id: k,
        class: "dc-shell-card__foot"
      }, [
        we(A.$slots, "foot", {}, void 0, !0)
      ], 512)), [
        [On, !y.value]
      ]) : L("", !0)
    ], 12, Dd));
  }
}), Kv = /* @__PURE__ */ oe(Qd, [["__scopeId", "data-v-3a7425d2"]]), Zd = ["aria-label"], Jd = ["aria-checked", "data-dc-active", "tabindex", "onClick", "onKeydown"], ef = /* @__PURE__ */ re({
  __name: "SegmentedControl",
  props: {
    modelValue: {},
    options: {},
    label: {},
    mono: { type: Boolean }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const n = e, a = t, r = V([]);
    function s(l, i) {
      const o = n.options.length;
      let c = null;
      if (l.key === "ArrowRight" || l.key === "ArrowDown" ? c = (i + 1) % o : l.key === "ArrowLeft" || l.key === "ArrowUp" ? c = (i - 1 + o) % o : l.key === "Home" ? c = 0 : l.key === "End" && (c = o - 1), c === null) return;
      l.preventDefault();
      const u = n.options[c];
      u && (a("update:modelValue", u.key), r.value[c]?.focus());
    }
    return (l, i) => (f(), h("div", {
      class: "dc-segmented",
      role: "radiogroup",
      "aria-label": e.label
    }, [
      (f(!0), h(te, null, he(e.options, (o, c) => (f(), h("button", {
        key: o.key,
        ref_for: !0,
        ref_key: "buttons",
        ref: r,
        type: "button",
        role: "radio",
        class: Je(["dc-segmented__item", { "dc-segmented__item--mono": e.mono }]),
        "aria-checked": o.key === e.modelValue,
        "data-dc-active": o.key === e.modelValue ? "true" : "false",
        tabindex: o.key === e.modelValue ? 0 : -1,
        onClick: (u) => a("update:modelValue", o.key),
        onKeydown: (u) => s(u, c)
      }, B(o.label), 43, Jd))), 128))
    ], 8, Zd));
  }
}), tf = /* @__PURE__ */ oe(ef, [["__scopeId", "data-v-63fb5482"]]), nf = ["data-dc-theme", "aria-label"], af = ["aria-expanded", "aria-disabled", "disabled", "data-dc-menu", "tabindex", "onClick", "onMouseenter"], rf = /* @__PURE__ */ re({
  __name: "MenuBar",
  props: {
    menus: {},
    label: {},
    accent: {},
    tokens: {},
    theme: { default: "minimal" }
  },
  emits: ["choose"],
  setup(e, { emit: t }) {
    const n = e, a = p(() => {
      if (!(!n.accent && !n.tokens))
        return { ...n.tokens, ...n.accent ? { "--dc-accent": n.accent } : {} };
    }), r = t, s = V(null), l = V([]), i = V(null), o = V(null), c = V(!1), u = p(
      () => n.menus.flatMap((S, C) => Xt(S) ? [C] : [])
    );
    function m(S, C) {
      const z = l.value[S]?.getBoundingClientRect(), T = n.menus[S];
      !z || !T || !Xt(T) || (o.value = { x: z.left, y: z.bottom + 2, mirrorX: z.right }, i.value = S, c.value = C);
    }
    function x(S) {
      const C = i.value;
      i.value = null, o.value = null, S && C !== null && l.value[C]?.focus();
    }
    function b(S) {
      i.value === S ? x(!0) : m(S, !1);
    }
    function w(S) {
      i.value === null || i.value === S || m(S, !1);
    }
    function y(S, C) {
      const z = u.value;
      if (z.length === 0) return null;
      if (S === null) return C === 1 ? z[0] ?? null : z[z.length - 1] ?? null;
      const T = z.indexOf(S);
      return T === -1 ? z[0] ?? null : z[(T + C + z.length) % z.length] ?? null;
    }
    function $(S) {
      const C = S.key;
      if (C === "Escape") {
        if (i.value === null) return;
        S.preventDefault(), x(!0);
        return;
      }
      if (C === "ArrowDown" && i.value === null) {
        const A = g();
        if (A === null) return;
        S.preventDefault(), m(A, !0);
        return;
      }
      if (C !== "ArrowLeft" && C !== "ArrowRight") return;
      const z = i.value ?? g(), T = y(z, C === "ArrowRight" ? 1 : -1);
      T !== null && (S.preventDefault(), i.value !== null ? m(T, !0) : l.value[T]?.focus());
    }
    function g() {
      const S = l.value.findIndex((C) => C === document.activeElement);
      return S === -1 ? u.value[0] ?? null : S;
    }
    function M(S) {
      const C = S.target;
      !C || s.value?.contains(C) || x(!1);
    }
    be(i, (S) => {
      S !== null ? window.addEventListener("pointerdown", M, !0) : window.removeEventListener("pointerdown", M, !0);
    }), Ie(() => window.removeEventListener("pointerdown", M, !0));
    function k(S) {
      x(!0), S.action?.(), r("choose", S);
    }
    return (S, C) => (f(), h("div", {
      ref_key: "bar",
      ref: s,
      class: "dc-shell dc-menubar",
      role: "menubar",
      "data-dc-theme": e.theme,
      "aria-label": e.label ?? "Main menu",
      style: xe(a.value),
      onKeydown: $
    }, [
      (f(!0), h(te, null, he(e.menus, (z, T) => (f(), h("button", {
        key: z.id ?? z.label ?? T,
        ref_for: !0,
        ref: (A) => {
          A && (l.value[T] = A);
        },
        type: "button",
        class: "dc-menubar__item",
        role: "menuitem",
        "aria-haspopup": "menu",
        "aria-expanded": i.value === T,
        "aria-disabled": z.disabled ? "true" : void 0,
        disabled: z.disabled,
        "data-dc-menu": z.id ?? z.label,
        tabindex: T === (u.value[0] ?? 0) ? 0 : -1,
        onClick: (A) => b(T),
        onMouseenter: (A) => w(T)
      }, B(z.label), 41, af))), 128)),
      i.value !== null && o.value ? (f(), Y(ar, {
        key: i.value,
        items: e.menus[i.value]?.items ?? [],
        at: o.value,
        label: e.menus[i.value]?.label,
        autofocus: c.value,
        onChoose: k,
        onDismiss: C[0] || (C[0] = (z) => x(!0))
      }, null, 8, ["items", "at", "label", "autofocus"])) : L("", !0)
    ], 44, nf));
  }
}), Wv = /* @__PURE__ */ oe(rf, [["__scopeId", "data-v-93dbd2e4"]]), sf = ["aria-label", "aria-expanded", "disabled"], of = { "aria-hidden": "true" }, lf = /* @__PURE__ */ re({
  __name: "MenuButton",
  props: {
    items: {},
    label: {},
    glyph: { default: "⋯" }
  },
  emits: ["choose"],
  setup(e, { emit: t }) {
    const n = t, a = V(null), r = V(null), s = V(null), l = V(!1), i = p(() => s.value !== null);
    function o(w) {
      const y = a.value?.getBoundingClientRect();
      y && (s.value = { x: y.left, y: y.bottom + 4, mirrorX: y.right }, l.value = w);
    }
    function c(w) {
      s.value = null, w && a.value?.focus();
    }
    function u() {
      i.value ? c(!0) : o(!1);
    }
    function m(w) {
      w.key !== "ArrowDown" || i.value || (w.preventDefault(), o(!0));
    }
    function x(w) {
      const y = w.target;
      y && (a.value?.contains(y) || r.value?.root?.contains(y) || c(!1));
    }
    be(i, (w) => {
      w ? window.addEventListener("pointerdown", x, !0) : window.removeEventListener("pointerdown", x, !0);
    }), Ie(() => window.removeEventListener("pointerdown", x, !0));
    function b(w) {
      c(!0), w.action?.(), n("choose", w);
    }
    return (w, y) => (f(), h(te, null, [
      P("button", {
        ref_key: "trigger",
        ref: a,
        type: "button",
        class: "dc-menu-button",
        "aria-label": e.label,
        "aria-haspopup": "menu",
        "aria-expanded": i.value,
        disabled: e.items.length === 0,
        onClick: u,
        onKeydown: m
      }, [
        P("span", of, B(e.glyph), 1)
      ], 40, sf),
      s.value ? (f(), Y(ar, {
        key: 0,
        ref_key: "menu",
        ref: r,
        items: e.items,
        at: s.value,
        label: e.label,
        autofocus: l.value,
        onChoose: b,
        onDismiss: y[0] || (y[0] = ($) => c(!0))
      }, null, 8, ["items", "at", "label", "autofocus"])) : L("", !0)
    ], 64));
  }
}), or = /* @__PURE__ */ oe(lf, [["__scopeId", "data-v-48f5ada5"]]), cf = { class: "dc-fact__label" }, uf = ["title"], df = /* @__PURE__ */ re({
  __name: "ShellFact",
  props: {
    label: {},
    value: {},
    title: {},
    wide: { type: Boolean }
  },
  setup(e) {
    const t = e, n = p(() => {
      const r = t.value;
      if (r == null || r === "") return [it];
      if (Array.isArray(r)) {
        const s = r.filter((l) => l != null && l !== "");
        return s.length ? s.map(String) : [it];
      }
      return [String(r)];
    }), a = p(() => t.wide ? { gridColumn: "1 / -1" } : void 0);
    return (r, s) => (f(), h("div", {
      class: "dc-fact",
      style: xe(a.value)
    }, [
      P("dt", cf, [
        we(r.$slots, "label", {}, () => [
          Ae(B(e.label), 1)
        ], !0)
      ]),
      P("dd", {
        class: "dc-fact__value dc-mono",
        title: e.title
      }, [
        we(r.$slots, "default", {}, () => [
          n.value.length === 1 ? (f(), h(te, { key: 0 }, [
            Ae(B(n.value[0]), 1)
          ], 64)) : (f(!0), h(te, { key: 1 }, he(n.value, (l, i) => (f(), h("span", {
            key: i,
            class: "dc-fact__line"
          }, B(l), 1))), 128))
        ], !0)
      ], 8, uf)
    ], 4));
  }
}), ff = /* @__PURE__ */ oe(df, [["__scopeId", "data-v-1f6d25e6"]]), pf = /* @__PURE__ */ re({
  __name: "ShellFacts",
  props: {
    items: { default: () => [] },
    min: { default: "200px" }
  },
  setup(e) {
    const t = e, n = p(() => ({ "--dc-facts-min": t.min }));
    return (a, r) => (f(), h("dl", {
      class: "dc-facts",
      style: xe(n.value)
    }, [
      (f(!0), h(te, null, he(e.items, (s, l) => (f(), Y(ff, {
        key: `${l}:${s.label}`,
        label: s.label,
        value: s.value,
        title: s.title,
        wide: s.wide
      }, null, 8, ["label", "value", "title", "wide"]))), 128)),
      we(a.$slots, "default", {}, void 0, !0)
    ], 4));
  }
}), jv = /* @__PURE__ */ oe(pf, [["__scopeId", "data-v-17455afa"]]), vf = { class: "dc-counts" }, hf = ["data-dc-tone"], mf = {
  key: 0,
  class: "dc-counts__empty"
}, gf = /* @__PURE__ */ re({
  __name: "StatusCounts",
  props: {
    counts: {},
    empty: { default: it }
  },
  setup(e) {
    const t = e, n = p(() => t.counts.filter((a) => a.count > 0));
    return (a, r) => (f(), h("span", vf, [
      (f(!0), h(te, null, he(n.value, (s) => (f(), h("span", {
        key: s.label,
        class: "dc-counts__count",
        "data-dc-tone": s.tone ?? "neutral"
      }, B(s.count) + " " + B(s.label), 9, hf))), 128)),
      n.value.length === 0 ? (f(), h("span", mf, B(e.empty), 1)) : L("", !0)
    ]));
  }
}), Uv = /* @__PURE__ */ oe(gf, [["__scopeId", "data-v-5553a9e2"]]), yf = ["data-dc-copied", "title", "aria-label"], _f = {
  key: 0,
  class: "dc-copy__mark",
  viewBox: "0 0 16 16",
  "aria-hidden": "true"
}, wf = {
  key: 1,
  class: "dc-copy__mark",
  viewBox: "0 0 16 16",
  "aria-hidden": "true"
}, kf = 1500, bf = /* @__PURE__ */ re({
  __name: "CopyButton",
  props: {
    text: {},
    label: { default: "Copy to clipboard" }
  },
  emits: ["copied", "error"],
  setup(e, { emit: t }) {
    const n = e, a = t, r = V(!1);
    let s;
    async function l() {
      const i = typeof n.text == "function" ? n.text() : n.text;
      try {
        if (!navigator.clipboard) throw new Error("The clipboard is not available here");
        await navigator.clipboard.writeText(i);
      } catch (o) {
        a("error", o);
        return;
      }
      r.value = !0, clearTimeout(s), s = setTimeout(() => {
        r.value = !1;
      }, kf), a("copied", i);
    }
    return Ie(() => clearTimeout(s)), (i, o) => (f(), h("button", {
      type: "button",
      class: "dc-copy",
      "data-dc-copied": r.value ? "true" : "false",
      title: r.value ? "Copied" : e.label,
      "aria-label": e.label,
      onClick: l
    }, [
      r.value ? (f(), h("svg", wf, [...o[1] || (o[1] = [
        P("path", { d: "M3 8.5l3.2 3L13 4.5" }, null, -1)
      ])])) : (f(), h("svg", _f, [...o[0] || (o[0] = [
        P("rect", {
          x: "5.5",
          y: "5.5",
          width: "8",
          height: "9",
          rx: "1.5"
        }, null, -1),
        P("path", { d: "M10.5 3.5v-1a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h1" }, null, -1)
      ])]))
    ], 8, yf));
  }
}), $f = /* @__PURE__ */ oe(bf, [["__scopeId", "data-v-f4249d7f"]]), xf = ["data-dc-copy", "data-dc-wrap", "data-dc-tone"], Sf = /* @__PURE__ */ re({
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
    const n = e, a = t, r = V(null), s = p(() => n.maxHeight === void 0 ? void 0 : { maxHeight: typeof n.maxHeight == "number" ? `${n.maxHeight}px` : n.maxHeight });
    function l() {
      return n.code ?? r.value?.textContent ?? "";
    }
    return (i, o) => (f(), h("div", {
      class: "dc-code",
      "data-dc-copy": e.copy ? "true" : "false",
      "data-dc-wrap": e.wrap ? "true" : "false",
      "data-dc-tone": e.tone
    }, [
      P("pre", {
        ref_key: "pre",
        ref: r,
        class: "dc-code__text dc-mono",
        style: xe(s.value)
      }, [
        we(i.$slots, "default", {}, () => [
          Ae(B(e.code), 1)
        ], !0)
      ], 4),
      e.copy ? (f(), Y($f, {
        key: 0,
        class: "dc-code__copy",
        text: l,
        label: e.copyLabel,
        onCopied: o[0] || (o[0] = (c) => a("copied", c)),
        onError: o[1] || (o[1] = (c) => a("error", c))
      }, null, 8, ["label"])) : L("", !0)
    ], 8, xf));
  }
}), Gv = /* @__PURE__ */ oe(Sf, [["__scopeId", "data-v-67b371dd"]]), Mf = 24, Cf = /* @__PURE__ */ re({
  __name: "ShellLog",
  props: {
    fetchChunk: {},
    stripAnsi: { type: Boolean },
    maxHeight: { default: "460px" }
  },
  setup(e, { expose: t }) {
    const n = e, a = V(""), r = p(() => n.stripAnsi ? hl(a.value) : a.value), s = V(null);
    let l = 0, i = null;
    function o() {
      return i ??= c().finally(() => {
        i = null;
      }), i;
    }
    async function c() {
      const { chunk: x, offset: b } = await n.fetchChunk(l);
      if (l = b, !x) return;
      const w = s.value, y = !w || w.scrollTop + w.clientHeight >= w.scrollHeight - Mf;
      a.value += x, y && (await yt(), s.value && (s.value.scrollTop = s.value.scrollHeight));
    }
    function u() {
      a.value = "", l = 0;
    }
    const m = p(() => n.maxHeight === void 0 ? void 0 : { maxHeight: typeof n.maxHeight == "number" ? `${n.maxHeight}px` : n.maxHeight });
    return t({ poll: o, reset: u }), (x, b) => (f(), h("pre", {
      ref_key: "pane",
      ref: s,
      class: "dc-log dc-mono",
      style: xe(m.value)
    }, B(r.value), 5));
  }
}), Yv = /* @__PURE__ */ oe(Cf, [["__scopeId", "data-v-2c86947e"]]), Ef = ["data-dc-theme"], Pf = ["aria-labelledby", "aria-label"], Af = {
  key: 1,
  class: "dc-dialog__actions"
}, jt = [], Tf = /* @__PURE__ */ re({
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
    const n = e, a = t, { theme: r, style: s, adopt: l } = tr(n), i = `${Vn() ?? "dc-dialog"}-title`, o = V(null);
    function c() {
      a("close"), a("update:open", !1);
    }
    const u = Symbol("dc-dialog");
    function m(k) {
      k.key !== "Escape" || k.defaultPrevented || jt[jt.length - 1] === u && (k.preventDefault(), c());
    }
    let x = !1;
    function b(k) {
      x = k.target === k.currentTarget;
    }
    function w(k) {
      k.target === k.currentTarget && x && c(), x = !1;
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
    let $ = null;
    async function g() {
      jt.push(u), document.addEventListener("keydown", m), $ = document.activeElement instanceof HTMLElement ? document.activeElement : null, l(), await yt(), (o.value?.querySelector("[autofocus]") ?? o.value?.querySelector(y) ?? o.value)?.focus();
    }
    function M() {
      const k = jt.indexOf(u);
      k !== -1 && (jt.splice(k, 1), document.removeEventListener("keydown", m), $?.isConnected && $.focus(), $ = null);
    }
    return un(() => {
      n.open && g();
    }), be(
      () => n.open,
      (k) => {
        k ? g() : M();
      }
    ), Ie(M), (k, S) => e.open ? (f(), Y(Kn, {
      key: 0,
      to: e.to
    }, [
      P("div", {
        class: "dc-shell dc-layer dc-dialog",
        "data-dc-theme": O(r),
        style: xe(O(s)),
        onPointerdown: b,
        onClick: w
      }, [
        P("div", {
          ref_key: "panel",
          ref: o,
          class: Je(["dc-dialog__panel", e.panelClass]),
          role: "dialog",
          "aria-modal": "true",
          tabindex: "-1",
          "aria-labelledby": e.title ? i : void 0,
          "aria-label": e.title ? void 0 : e.label
        }, [
          e.title ? (f(), h("h2", {
            key: 0,
            id: i,
            class: "dc-dialog__title"
          }, B(e.title), 1)) : L("", !0),
          P("div", {
            class: Je(["dc-dialog__body", e.bodyClass])
          }, [
            we(k.$slots, "default", {}, void 0, !0)
          ], 2),
          k.$slots.actions ? (f(), h("div", Af, [
            we(k.$slots, "actions", {}, void 0, !0)
          ])) : L("", !0)
        ], 10, Pf)
      ], 44, Ef)
    ], 8, ["to"])) : L("", !0);
  }
}), Xv = /* @__PURE__ */ oe(Tf, [["__scopeId", "data-v-1e126064"]]), Lf = 4500, Of = 9e3, on = V([]);
let qr = 0;
function Xs(e) {
  on.value = on.value.filter((t) => t.id !== e);
}
function Qs(e, t = "ok") {
  qr += 1;
  const n = qr;
  on.value = [...on.value, { id: n, message: e, kind: t }], setTimeout(() => Xs(n), t === "err" ? Of : Lf);
}
function Rf(e) {
  Qs(e instanceof Error ? e.message : String(e), "err");
}
function zf() {
  return { toasts: Yo(on), toast: Qs, toastError: Rf, dismiss: Xs };
}
const If = ["data-dc-theme"], Nf = ["data-dc-kind", "role"], Bf = /* @__PURE__ */ re({
  __name: "ShellToasts",
  props: {
    to: { default: "body" },
    theme: { default: void 0 },
    accent: { default: void 0 },
    tokens: { default: void 0 }
  },
  setup(e) {
    const t = e, { toasts: n } = zf(), { theme: a, style: r, adopt: s } = tr(t);
    return un(s), (l, i) => (f(), Y(Kn, { to: e.to }, [
      P("div", {
        class: "dc-shell dc-layer dc-toasts",
        "data-dc-theme": O(a),
        style: xe(O(r)),
        "aria-live": "polite"
      }, [
        (f(!0), h(te, null, he(O(n), (o) => (f(), h("div", {
          key: o.id,
          class: "dc-toast",
          "data-dc-kind": o.kind,
          role: o.kind === "err" ? "alert" : void 0
        }, B(o.message), 9, Nf))), 128))
      ], 12, If)
    ], 8, ["to"]));
  }
}), Qv = /* @__PURE__ */ oe(Bf, [["__scopeId", "data-v-6fb044ee"]]), Ff = 4, Df = 8, Hf = 180;
function qf(e, t, n, a = {}) {
  const r = a.gap ?? Ff, s = a.margin ?? Df, l = a.flipBelow ?? Hf, i = a.side ?? "below", o = {
    below: n.height - e.bottom - r - s,
    above: e.top - r - s
  }, c = i === "below" ? "above" : "below", u = o[i] < l && o[c] > o[i] ? c : i, m = Math.min(a.maxHeight ?? 1 / 0, Math.max(0, o[u])), x = Math.max(0, n.width - s * 2), b = Math.min(e.width, x), w = Math.min(Math.max(t, b), x), y = a.align === "end" ? e.right - w : e.left, $ = Math.max(s, Math.min(y, n.width - w - s));
  return u === "below" ? { side: u, left: $, top: e.bottom + r, maxHeight: m, minWidth: b, maxWidth: x } : { side: u, left: $, bottom: n.height - e.top + r, maxHeight: m, minWidth: b, maxWidth: x };
}
const Vf = ["data-dc-theme", "data-dc-side"], vt = [], Kf = /* @__PURE__ */ re({
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
    const n = e, a = t, { theme: r, style: s, adopt: l } = tr(n), i = V(null), o = V(null), c = { root: () => i.value };
    function u() {
      const k = n.anchor;
      k && (o.value = qf(
        k.getBoundingClientRect(),
        i.value?.offsetWidth ?? 0,
        { width: window.innerWidth, height: window.innerHeight },
        { side: n.side, align: n.align, maxHeight: n.maxHeight }
      ));
    }
    const m = p(() => {
      const k = o.value, S = k ? {
        position: "fixed",
        left: `${k.left}px`,
        ...k.top !== void 0 ? { top: `${k.top}px` } : {},
        ...k.bottom !== void 0 ? { bottom: `${k.bottom}px` } : {},
        minWidth: `${k.minWidth}px`,
        maxWidth: `${k.maxWidth}px`,
        maxHeight: `${k.maxHeight}px`,
        overflowY: "auto"
      } : { position: "fixed", visibility: "hidden" };
      return { ...s.value, ...S };
    });
    function x() {
      a("update:open", !1), a("close");
    }
    function b(k) {
      return i.value?.contains(k) || n.anchor?.contains(k) ? !0 : vt.slice(vt.indexOf(c) + 1).some((C) => C.root()?.contains(k));
    }
    function w(k) {
      const S = k.target;
      S && !b(S) && x();
    }
    function y(k) {
      k.key !== "Escape" || k.defaultPrevented || vt[vt.length - 1] === c && (k.preventDefault(), i.value?.contains(document.activeElement) && n.anchor?.focus(), x());
    }
    let $ = null;
    async function g() {
      vt.includes(c) || (vt.push(c), l(), o.value = null, await yt(), u(), window.addEventListener("pointerdown", w, !0), document.addEventListener("keydown", y, !0), window.addEventListener("resize", u), window.addEventListener("scroll", u, !0), typeof ResizeObserver < "u" && i.value && ($ = new ResizeObserver(() => u()), $.observe(i.value)));
    }
    function M() {
      const k = vt.indexOf(c);
      k !== -1 && (vt.splice(k, 1), window.removeEventListener("pointerdown", w, !0), document.removeEventListener("keydown", y, !0), window.removeEventListener("resize", u), window.removeEventListener("scroll", u, !0), $?.disconnect(), $ = null);
    }
    return un(() => {
      n.open && g();
    }), be(
      () => n.open,
      (k) => {
        k ? g() : M();
      }
    ), be(() => n.anchor, () => {
      n.open && u();
    }), Ie(M), (k, S) => e.open ? (f(), Y(Kn, {
      key: 0,
      to: e.to
    }, [
      P("div", Xo({
        ref_key: "root",
        ref: i
      }, k.$attrs, {
        class: "dc-shell dc-layer dc-popover",
        "data-dc-theme": O(r),
        "data-dc-side": o.value?.side,
        style: m.value
      }), [
        we(k.$slots, "default", {}, void 0, !0)
      ], 16, Vf)
    ], 8, ["to"])) : L("", !0);
  }
}), Zv = /* @__PURE__ */ oe(Kf, [["__scopeId", "data-v-65ca5cb0"]]), Vt = (e) => e.kind === "split", Z = (e) => e.kind === "group", le = (e) => e.kind === "float", xt = { x: 16, y: 16, w: 360, h: 260 }, Dn = 28, Zs = 120, Ia = 220, Js = 38, Lt = 6;
function gn(e, t) {
  let n = !1;
  const a = e.frames.map((r, s) => {
    const l = t(r.node, s);
    return l === r.node ? r : (n = !0, { ...r, node: l });
  });
  return n ? { ...e, frames: a } : e;
}
function Ze(e) {
  return { kind: "group", panels: [e] };
}
function Jv(e, t, n) {
  return {
    kind: "group",
    panels: e,
    ...t ? { active: t } : {},
    ...n ? { title: n } : {}
  };
}
const $e = (e) => typeof e == "string", na = (e) => $e(e) ? Ze(e) : e, yn = (e) => $e(e) ? [e] : Ue(e), Vr = (e) => e.panels.filter($e), Wf = (e) => e.panels.filter((t) => !$e(t)), We = (e, t) => e.panels.includes(t);
function _n(e, t, n) {
  let a = !1;
  const r = e.panels.map((s) => {
    if ($e(s) || !ye(s, t)) return s;
    const l = n(s);
    return l !== s && (a = !0), l;
  });
  return a ? { ...e, panels: r } : e;
}
function aa(e, t) {
  return { node: e, rect: { ...xt, ...t } };
}
function lr(e, t) {
  return t ? { kind: "float", frames: e, title: t } : { kind: "float", frames: e };
}
function ra(e, t) {
  const n = { ...xt, ...t };
  return lr(
    e.map(
      (a, r) => aa(a, {
        ...n,
        x: n.x + r * Dn,
        y: n.y + r * Dn
      })
    )
  );
}
function ir(e, t, n, a) {
  return {
    kind: "split",
    direction: e,
    children: t,
    ...n ? { sizes: n } : {},
    ...a ? { title: a } : {}
  };
}
const cr = (e, t, n) => ir("row", e, t, n), eh = (e, t, n) => ir("column", e, t, n);
function Pe(e) {
  return {
    ...e.title ? { title: e.title } : {},
    ...e.fixedView ? { fixedView: !0 } : {},
    ...e.headless ? { headless: !0 } : {}
  };
}
const Et = (e) => e.fixedView === !0 || e.headless === !0 || !!e.title, jf = (e) => ({ ...e, headless: !0 }), th = (e) => ({ ...e, fixedView: !0 }), Uf = (e) => e === "left" || e === "right" ? "row" : "column";
function Ue(e) {
  return Z(e) ? e.panels.flatMap(yn) : le(e) ? e.frames.flatMap((t) => Ue(t.node)) : e.children.flatMap(Ue);
}
function ye(e, t) {
  return Z(e) ? e.panels.some((n) => $e(n) ? n === t : ye(n, t)) : le(e) ? e.frames.some((n) => ye(n.node, t)) : e.children.some((n) => ye(n, t));
}
const eo = (e) => Ue(e).length === 0, Na = (e) => !Z(e) && Et(e), Ba = (e) => eo(e) && !Na(e);
function sa(e) {
  return Vt(e) ? e.children.map((t, n) => ({ node: t, index: n })) : le(e) ? e.frames.map((t, n) => ({ node: t.node, index: n })) : e.panels.flatMap((t, n) => $e(t) ? [] : [{ node: t, index: n }]);
}
const ur = (e) => sa(e).map((t) => t.node);
function Tt(e) {
  const t = e.active;
  if (t) {
    const n = e.panels.findIndex(
      (a) => $e(a) ? a === t : ye(a, t)
    );
    if (n >= 0) return n;
  }
  return 0;
}
function to(e) {
  const t = e.panels[Tt(e)];
  return t !== void 0 && $e(t) ? t : "";
}
function ze(e) {
  if ($e(e)) return e;
  if (Z(e)) {
    const n = e.panels[Tt(e)];
    return n === void 0 ? "" : ze(n);
  }
  if (le(e)) {
    const n = e.frames[e.frames.length - 1];
    return n ? ze(n.node) : "";
  }
  const t = e.children[0];
  return t ? ze(t) : "";
}
function zt(e, t) {
  if (Z(e) && We(e, t)) return e;
  for (const n of ur(e)) {
    const a = zt(n, t);
    if (a) return a;
  }
  return null;
}
function Gf(e) {
  const t = ur(e).flatMap(Gf);
  return Z(e) ? [e, ...t] : t;
}
function Oe(e, t) {
  if (Z(e)) {
    for (const n of Wf(e)) {
      const a = Oe(n, t);
      if (a) return a;
    }
    return null;
  }
  if (le(e)) {
    for (const n of e.frames)
      if (ye(n.node, t))
        return Oe(n.node, t) ?? n;
    return null;
  }
  for (const n of e.children) {
    const a = Oe(n, t);
    if (a) return a;
  }
  return null;
}
function ya(e, t, n = Zs) {
  const a = (i, o) => o > 0 ? Math.max(Math.min(i, o), Math.min(n, o)) : Math.max(i, n), r = a(e.w, t.w), s = a(e.h, t.h), l = (i, o, c) => Math.min(Math.max(i, 0), Math.max(c - o, 0));
  return {
    x: Math.round(l(e.x, r, t.w)),
    y: Math.round(l(e.y, s, t.h)),
    w: Math.round(r),
    h: Math.round(s)
  };
}
function Kr(e, t, n, a, r = Zs) {
  let { x: s, y: l, w: i, h: o } = e;
  return t.includes("e") && (i = e.w + n), t.includes("w") && (i = e.w - n, s = e.x + n), t.includes("s") && (o = e.h + a), t.includes("n") && (o = e.h - a, l = e.y + a), i < r && (t.includes("w") && (s = e.x + e.w - r), i = r), o < r && (t.includes("n") && (l = e.y + e.h - r), o = r), { x: s, y: l, w: i, h: o };
}
const no = (e, t) => e.x === t.x && e.y === t.y && e.w === t.w && e.h === t.h;
function It(e, t, n) {
  if (Z(e)) return _n(e, t, (s) => It(s, t, n));
  if (le(e)) {
    let s = !1;
    const l = e.frames.map((i) => {
      if (!ye(i.node, t)) return i;
      if (Oe(i.node, t)) {
        const c = It(i.node, t, n);
        return c === i.node ? i : (s = !0, { ...i, node: c });
      }
      const o = n(i);
      return o === i ? i : (s = !0, o);
    });
    return s ? { ...e, frames: l } : e;
  }
  if (!ye(e, t)) return e;
  let a = !1;
  const r = e.children.map((s) => {
    const l = It(s, t, n);
    return l !== s && (a = !0), l;
  });
  return a ? { ...e, children: r } : e;
}
function Yf(e, t, n) {
  return It(e, t, (a) => no(a.rect, n) ? a : { ...a, rect: n });
}
const ht = (e) => e.maximized === !0, ao = (e) => (t) => {
  if (ht(t) === e) return t;
  if (e) {
    const { minimized: r, ...s } = t;
    return { ...s, maximized: !0 };
  }
  const { maximized: n, ...a } = t;
  return a;
};
function Xf(e, t, n = !0) {
  return It(e, t, ao(n));
}
function nh(e, t) {
  const n = Oe(e, t);
  return n ? Xf(e, t, !ht(n)) : e;
}
const bt = (e) => e.minimized === !0, ro = (e) => (t) => {
  if (bt(t) === e) return t;
  if (e) {
    const { maximized: r, ...s } = t;
    return { ...s, minimized: !0 };
  }
  const { minimized: n, ...a } = t;
  return a;
};
function Qf(e, t, n = !0) {
  return It(e, t, ro(n));
}
function ah(e, t) {
  const n = Oe(e, t);
  return n ? Qf(e, t, !bt(n)) : e;
}
function kt(e, t) {
  const n = t[t.length - 1];
  if (n === void 0) return null;
  const a = je(e, t.slice(0, -1));
  return !a || !le(a) ? null : a.frames[n] ?? null;
}
function Fa(e, t) {
  if (le(e)) {
    for (const [n, a] of e.frames.entries()) {
      if (!ye(a.node, t)) continue;
      const r = Fa(a.node, t);
      return r ? [n, ...r] : [n];
    }
    return null;
  }
  for (const { node: n, index: a } of sa(e)) {
    if (!ye(n, t)) continue;
    const r = Fa(n, t);
    return r ? [a, ...r] : null;
  }
  return null;
}
function dr(e, t, n) {
  const a = t[t.length - 1];
  if (a === void 0) return e;
  const r = t.slice(0, -1), s = je(e, r);
  if (!s || !le(s)) return e;
  const l = s.frames[a];
  if (!l) return e;
  const i = n(l);
  if (i === l) return e;
  const o = [...s.frames];
  return o[a] = i, lt(e, r, { ...s, frames: o });
}
function Wr(e, t, n) {
  return dr(
    e,
    t,
    (a) => no(a.rect, n) ? a : { ...a, rect: n }
  );
}
function Zf(e, t, n = !0) {
  return dr(e, t, ao(n));
}
function Jf(e, t, n = !0) {
  return dr(e, t, ro(n));
}
function Qt(e, t) {
  const [n, ...a] = t;
  if (n === void 0) return e;
  if (le(e)) {
    const l = e.frames[n];
    if (!l) return e;
    const i = Qt(l.node, a), o = i === l.node ? l : { ...l, node: i };
    if (n === e.frames.length - 1 && o === l) return e;
    const c = [...e.frames];
    return c.splice(n, 1), c.push(o), { ...e, frames: c };
  }
  const r = je(e, [n]);
  if (!r) return e;
  const s = Qt(r, a);
  return s === r ? e : lt(e, [n], s);
}
function ep(e, t) {
  const n = [...t];
  let a = e;
  return t.forEach((r, s) => {
    a && (le(a) && (n[s] = a.frames.length - 1), a = je(a, [r]));
  }), n;
}
function Cn(e, t, n, a) {
  if (Z(e)) return _n(e, n, (l) => Cn(l, t, n, a));
  if (le(e)) {
    const l = e.frames.findIndex((o) => ye(o.node, n)), i = e.frames[l];
    if (!i) return e;
    if (Oe(i.node, n)) {
      const o = Cn(i.node, t, n, a);
      if (o === i.node) return e;
      const c = [...e.frames];
      return c[l] = { ...i, node: o }, { ...e, frames: c };
    }
    return { ...e, frames: [...e.frames, aa(Ze(t), a)] };
  }
  if (!ye(e, n)) return e;
  let r = !1;
  const s = e.children.map((l) => {
    const i = Cn(l, t, n, a);
    return i !== l && (r = !0), i;
  });
  return r ? { ...e, children: s } : e;
}
function jr(e, t, n, a) {
  if (t === n || !ye(e, t) || !ye(e, n) || !Oe(e, n)) return e;
  const r = St(e, t);
  if (!r) return e;
  const s = Cn(r, t, n, a);
  return s === r ? e : Me(s);
}
function tp(e, t, n) {
  return le(e) ? { ...e, frames: [...e.frames, aa(Ze(t), n)] } : Z(e) ? oo(e, t) : {
    kind: "split",
    direction: e.direction,
    children: [...e.children, Ze(t)],
    sizes: [...dt(e), 1],
    ...Pe(e)
  };
}
function so(e, t, n, a) {
  const r = n[0];
  if (r === void 0) return tp(e, t, a);
  const s = n.slice(1), l = (u, m) => m === r ? so(u, t, s, a) : St(u, t);
  if (le(e)) {
    const u = e.frames.flatMap((m, x) => {
      const b = l(m.node, x);
      return b ? [b === m.node ? m : { ...m, node: b }] : [];
    });
    return { ...e, frames: u };
  }
  if (Z(e)) {
    const u = Tt(e), m = [];
    e.panels.forEach((w, y) => {
      if ($e(w)) {
        w !== t && m.push(w);
        return;
      }
      const $ = l(w, y);
      $ && m.push($);
    });
    const b = e.active && m.some((w) => yn(w).includes(e.active)) ? e.active : ze(m[u] ?? m[m.length - 1]);
    return {
      kind: "group",
      panels: m,
      ...b ? { active: b } : {},
      ...Pe(e)
    };
  }
  const i = dt(e), o = [], c = [];
  return e.children.forEach((u, m) => {
    const x = l(u, m);
    x && (o.push(x), c.push(i[m] ?? 0));
  }), { kind: "split", direction: e.direction, children: o, sizes: c, ...Pe(e) };
}
function Ur(e, t, n, a) {
  const r = je(e, n);
  return !r || !eo(r) || !ye(e, t) ? e : Me(so(e, t, n, a));
}
function _a(e, t) {
  if (Z(e)) return _n(e, t, (r) => _a(r, t));
  if (le(e)) {
    const r = e.frames.findIndex((c) => ye(c.node, t)), s = e.frames[r];
    if (!s) return e;
    const l = _a(s.node, t), i = l === s.node ? s : { ...s, node: l };
    if (r === e.frames.length - 1 && i === s) return e;
    const o = [...e.frames];
    return o.splice(r, 1), o.push(i), { ...e, frames: o };
  }
  if (!ye(e, t)) return e;
  let n = !1;
  const a = e.children.map((r) => {
    const s = _a(r, t);
    return s !== r && (n = !0), s;
  });
  return n ? { ...e, children: a } : e;
}
function fr(e, t) {
  if (e <= 0) return [];
  const n = () => Array.from({ length: e }, () => 1 / e);
  if (!t || t.length !== e) return n();
  const a = t.map((s) => Number.isFinite(s) && s > 0 ? s : 0), r = a.reduce((s, l) => s + l, 0);
  return r <= 0 ? n() : a.map((s) => s / r);
}
const dt = (e) => fr(e.children.length, e.sizes), tt = (e) => {
  const t = Z(e) ? e.panels.length : e.children.length;
  return e.places?.length === t ? e.places : void 0;
};
function Me(e) {
  if (Z(e)) return np(e);
  if (le(e)) {
    const i = e.frames.flatMap((o) => {
      const c = Me(o.node);
      return Ba(c) ? [] : [c === o.node ? o : { ...o, node: c }];
    });
    return i.length === e.frames.length && i.every((o, c) => o === e.frames[c]) ? e : { ...e, frames: i };
  }
  if (e.children.length === 0) return e;
  const t = dt(e), n = tt(e), a = [], r = [], s = [];
  e.children.forEach((i, o) => {
    const c = Me(i), u = t[o] ?? 0;
    if (Ba(c)) return;
    if (!n && Vt(c) && c.direction === e.direction && !tt(c) && !Et(c)) {
      const x = dt(c);
      c.children.forEach((b, w) => {
        a.push(b), r.push(u * (x[w] ?? 0));
      });
      return;
    }
    a.push(c), r.push(u);
    const m = n?.[o];
    m && s.push(m);
  });
  const l = a[0];
  return a.length === 1 && l && !Et(e) ? l : {
    kind: "split",
    direction: e.direction,
    children: a,
    sizes: fr(a.length, r),
    ...Pe(e),
    ...s.length === a.length && s.length > 0 ? { places: s } : {}
  };
}
function np(e) {
  if (e.panels.every($e)) return e;
  const t = ze(e), n = tt(e), a = [], r = [];
  e.panels.forEach((i, o) => {
    const c = n?.[o];
    if ($e(i)) {
      a.push(i), c && r.push(c);
      return;
    }
    const u = Me(i);
    if (!Ba(u)) {
      if (Z(u) && !Et(u) && !tt(u) && !e.headless) {
        a.push(...u.panels);
        return;
      }
      a.push(u), c && r.push(c);
    }
  });
  const s = a[0];
  if (a.length === 1 && s !== void 0 && !$e(s) && !Et(e))
    return s;
  if (a.length === e.panels.length && a.every((i, o) => i === e.panels[o]))
    return e;
  const l = t && a.some((i) => yn(i).includes(t)) ? t : void 0;
  return {
    kind: "group",
    panels: a,
    ...l ? { active: l } : {},
    ...Pe(e),
    ...r.length === a.length && r.length > 0 ? { places: r } : {}
  };
}
function St(e, t) {
  if (le(e)) {
    const l = e.frames.flatMap((i) => {
      const o = St(i.node, t);
      return o ? [o === i.node ? i : { ...i, node: o }] : [];
    });
    return l.length === 0 && !Na(e) ? null : { ...e, frames: l };
  }
  if (Z(e)) {
    if (!ye(e, t)) return e;
    const l = Tt(e), i = [];
    for (const u of e.panels) {
      if ($e(u)) {
        u !== t && i.push(u);
        continue;
      }
      const m = St(u, t);
      m && i.push(m);
    }
    if (i.length === 0) return null;
    const c = e.active && i.some((u) => yn(u).includes(e.active)) ? e.active : ze(i[l] ?? i[i.length - 1]);
    return c ? { kind: "group", panels: i, active: c, ...Pe(e) } : { kind: "group", panels: i, ...Pe(e) };
  }
  const n = dt(e), a = [], r = [];
  if (e.children.forEach((l, i) => {
    const o = St(l, t);
    o && (a.push(o), r.push(n[i] ?? 0));
  }), a.length === 0)
    return Na(e) ? { kind: "split", direction: e.direction, children: a, sizes: [], ...Pe(e) } : null;
  const s = a[0];
  return a.length === 1 && s && !Et(e) ? s : Me({
    kind: "split",
    direction: e.direction,
    children: a,
    sizes: r,
    ...Pe(e)
  });
}
function oo(e, t, n) {
  const a = e.panels.filter((s) => s !== t), r = n === void 0 ? a.length : Math.max(0, Math.min(n, a.length));
  return a.splice(r, 0, t), { kind: "group", panels: a, active: t, ...Pe(e) };
}
function Gt(e, t, n, a, r) {
  const s = (b) => gn(
    b,
    (w) => ye(w, n) ? Gt(w, t, n, a, r) : w
  );
  if (a === "float") return e;
  const l = (b) => _n(b, n, (w) => Gt(w, t, n, a, r));
  if (a === "center")
    return Z(e) ? We(e, n) ? oo(e, t, r) : l(e) : le(e) ? s(e) : {
      ...e,
      children: e.children.map(
        (b) => ye(b, n) ? Gt(b, t, n, a, r) : b
      )
    };
  const i = Uf(a), o = a === "left" || a === "top", c = (b) => ({
    kind: "split",
    direction: i,
    children: o ? [Ze(t), b] : [b, Ze(t)],
    sizes: [0.5, 0.5]
  });
  if (Z(e)) return We(e, n) ? c(e) : l(e);
  if (le(e)) return s(e);
  const u = dt(e), m = e.children.findIndex(
    (b) => Z(b) && We(b, n)
  );
  if (m >= 0 && e.direction === i) {
    const b = (u[m] ?? 0) / 2, w = [...e.children], y = [...u];
    return w.splice(o ? m : m + 1, 0, Ze(t)), y.splice(m, 1, b, b), {
      kind: "split",
      direction: i,
      children: w,
      sizes: y,
      ...Pe(e)
    };
  }
  const x = e.children.map((b) => ye(b, n) ? Z(b) && We(b, n) ? c(b) : Gt(b, t, n, a) : b);
  return {
    kind: "split",
    direction: e.direction,
    children: x,
    sizes: u,
    ...Pe(e)
  };
}
function Nt(e, t) {
  if (Z(e)) {
    if (We(e, t))
      return to(e) === t ? e : { ...e, active: t };
    const r = e.panels.findIndex((o) => !$e(o) && ye(o, t)), s = e.panels[r];
    if (s === void 0 || $e(s)) return e;
    const l = Nt(s, t);
    if (l === s && e.active === t) return e;
    const i = [...e.panels];
    return i[r] = l, { ...e, panels: i, active: t };
  }
  if (!ye(e, t)) return e;
  if (le(e)) return gn(e, (r) => Nt(r, t));
  let n = !1;
  const a = e.children.map((r) => {
    const s = Nt(r, t);
    return s !== r && (n = !0), s;
  });
  return n ? { ...e, children: a } : e;
}
function Zt(e, t, n) {
  if (Z(e)) {
    if (!We(e, t)) return _n(e, t, (c) => Zt(c, t, n));
    const a = e.panels.indexOf(t), r = Math.max(0, Math.min(n, e.panels.length - 1));
    if (a === r) return e;
    const s = [...e.panels];
    s.splice(a, 1), s.splice(r, 0, t);
    const l = tt(e), i = l ? [...l] : void 0;
    i && i.splice(r, 0, ...i.splice(a, 1));
    const o = ze(e);
    return {
      kind: "group",
      panels: s,
      ...o ? { active: o } : {},
      ...Pe(e),
      ...i ? { places: i } : {}
    };
  }
  return ye(e, t) ? le(e) ? gn(e, (a) => Zt(a, t, n)) : { ...e, children: e.children.map((a) => Zt(a, t, n)) } : e;
}
function En(e, t, n) {
  if (t === n) return e;
  if (Z(e)) {
    if (!ye(e, t) && !ye(e, n)) return e;
    const a = (s) => s === t ? n : s === n ? t : s, r = e.panels.map((s) => $e(s) ? a(s) : En(s, t, n));
    return { ...e, panels: r, ...e.active ? { active: a(e.active) } : {} };
  }
  return le(e) ? gn(e, (a) => En(a, t, n)) : { ...e, children: e.children.map((a) => En(a, t, n)) };
}
function xn(e, t, n, a, r) {
  if (a === "float" || !ye(e, t) || !ye(e, n)) return e;
  const s = zt(e, t);
  if (a === "center" && s && We(s, n)) {
    if (r === void 0) return e;
    const i = s.panels.indexOf(t), o = r > i ? r - 1 : r;
    return o === i ? e : Nt(Zt(e, t, o), t);
  }
  if (t === n) return e;
  const l = St(e, t);
  return l ? Me(Gt(l, t, n, a, r)) : e;
}
function lo(e, t, n) {
  if (Z(e)) {
    const r = e.panels[t];
    if (r === void 0 || $e(r)) return e;
    const s = [...e.panels];
    return s[t] = n, { ...e, panels: s };
  }
  if (le(e)) {
    const r = e.frames[t];
    if (!r) return e;
    const s = [...e.frames];
    return s[t] = { ...r, node: n }, { ...e, frames: s };
  }
  const a = [...e.children];
  return a[t] = n, { ...e, children: a };
}
function wn(e, t, n) {
  const a = sa(e);
  if (!Z(e) && a.some(({ node: r }) => Z(r) && We(r, t))) {
    const r = n(e);
    return r === e ? null : r;
  }
  for (const { node: r, index: s } of a) {
    if (!ye(r, t)) continue;
    const l = wn(r, t, n);
    return l ? lo(e, s, l) : null;
  }
  return null;
}
function rh(e, t, n) {
  const a = wn(
    e,
    t,
    (r) => Vt(r) && r.direction !== n ? { ...r, direction: n } : r
  );
  return a ? Me(a) : e;
}
function io(e) {
  return le(e) ? [e] : tt(e) || Et(e) ? [e] : Z(e) ? [...e.panels] : e.children.flatMap(io);
}
function co(e, t) {
  if (Z(e)) return e;
  const n = ur(e).map(io), a = n.flat(), r = t && a.some((l) => yn(l).includes(t)) ? t : void 0, s = ap(e, n);
  return Me({
    kind: "group",
    panels: a,
    ...r ? { active: r } : {},
    ...Pe(e),
    ...s ? { places: s } : {}
  });
}
function ap(e, t) {
  const n = le(e) ? e.frames.map(({ node: a, ...r }) => r) : tt(e);
  if (n)
    return t.every((a) => a.length === 1) ? n : void 0;
}
function rp(e, t) {
  const n = wn(e, t, (a) => co(a, t));
  return n ? Me(n) : e;
}
function pr(e, t, n) {
  if (Z(e) && We(e, t)) {
    const a = n(e);
    return a === e ? null : a;
  }
  for (const { node: a, index: r } of sa(e)) {
    if (!ye(a, t)) continue;
    const s = pr(a, t, n);
    return s ? lo(e, r, s) : null;
  }
  return null;
}
function Gr(e, t, n) {
  const a = pr(e, t, (r) => uo(r, n));
  return a ? Me(a) : e;
}
function Yr(e, t, n) {
  const a = je(e, t);
  return !a || !Z(a) || a.panels.length < 2 ? e : Me(lt(e, t, uo(a, n)));
}
function uo(e, t) {
  if (e.panels.length < 2) return e;
  const n = tt(e);
  return {
    ...ir(t, e.panels.map(na)),
    ...Pe(e),
    ...n ? { places: n } : {}
  };
}
function Da(e, t) {
  if (Z(e)) return e;
  if (le(e)) {
    const r = e.frames.findIndex(
      (i) => Z(i.node) && i.node.panels.includes(t)
    ), s = e.frames[r], l = s && Z(s.node) ? s.node : null;
    if (s && l && l.panels.length > 1) {
      const i = ra(l.panels.map(na), s.rect).frames;
      return {
        ...e,
        frames: [...e.frames.slice(0, r), ...i, ...e.frames.slice(r + 1)]
      };
    }
    return gn(e, (i) => Da(i, t));
  }
  if (!ye(e, t)) return e;
  let n = !1;
  const a = e.children.map((r) => {
    const s = Da(r, t);
    return s !== r && (n = !0), s;
  });
  return n ? { ...e, children: a } : e;
}
function sp(e, t, n) {
  const a = zt(e, t);
  if (!a || a.panels.length < 2) return e;
  if (Oe(e, t)?.node === a) {
    const l = Da(e, t);
    return l === e ? e : Me(l);
  }
  const s = pr(e, t, (l) => fo(l, n));
  return s ? Me(s) : e;
}
function op(e, t, n) {
  const a = je(e, t);
  if (!a || !Z(a) || a.panels.length < 2) return e;
  const r = t.slice(0, -1), s = t.length > 0 ? je(e, r) : null, l = t[t.length - 1], i = s && le(s) && l !== void 0 ? s.frames[l] : void 0;
  if (s && le(s) && i && l !== void 0) {
    const o = ra(a.panels.map(na), i.rect).frames, c = [...s.frames.slice(0, l), ...o, ...s.frames.slice(l + 1)];
    return Me(lt(e, r, { ...s, frames: c }));
  }
  return Me(lt(e, t, fo(a, n)));
}
function fo(e, t) {
  return {
    ...lr(po(e.panels.map(na), tt(e), t)),
    ...Pe(e)
  };
}
function po(e, t, n) {
  return t ? e.map((a, r) => ({ ...t[r], node: a })) : ra(e, n).frames;
}
function vo(e, t) {
  return { ...lr(po(e.children, tt(e), t)), ...Pe(e) };
}
function sh(e, t, n) {
  const a = wn(
    e,
    t,
    (r) => le(r) ? r : vo(r, n)
  );
  return a ? Me(a) : Z(e) && We(e, t) ? ra([e], n) : e;
}
function lp(e, t) {
  const n = (r) => t === "column" ? r.rect.y : r.rect.x, a = (r) => t === "column" ? r.rect.x : r.rect.y;
  return [...e].sort((r, s) => n(r) - n(s) || a(r) - a(s));
}
function ho(e, t) {
  const n = lp(e.frames, t);
  return {
    kind: "split",
    direction: t,
    children: n.map((a) => a.node),
    ...Pe(e),
    places: n.map(({ node: a, ...r }) => r)
  };
}
function oh(e, t, n = "row") {
  const a = wn(
    e,
    t,
    (r) => le(r) ? ho(r, n) : r
  );
  return a ? Me(a) : e;
}
function mo(e) {
  if (le(e)) return null;
  const t = Z(e) ? e.panels.length === 1 ? e.panels[0] : void 0 : e.children.length === 1 ? e.children[0] : void 0;
  return t === void 0 || $e(t) || Z(t) && t.panels.length === 1 && $e(t.panels[0]) ? null : t;
}
const ip = (e) => {
  const { title: t, fixedView: n, headless: a, ...r } = e;
  return r;
};
function cp(e, t) {
  const n = mo(e);
  return n ? t === "inner" ? n : { ...ip(n), ...Pe(e) } : e;
}
function Dt(e) {
  return e.title ? e.title : Z(e) ? "" : le(e) ? "Desktop" : e.direction === "row" ? "Row" : "Column";
}
function Jt(e, t) {
  if (Z(e)) {
    const a = e.panels[Tt(e)];
    return a === void 0 ? "" : $e(a) ? t(a) ?? a : Dt(a) || Jt(a, t);
  }
  if (e.title) return e.title;
  if (le(e)) {
    const a = e.frames[e.frames.length - 1];
    return a ? a.title ?? Jt(a.node, t) : "";
  }
  const n = e.children[0];
  return n ? Jt(n, t) : "";
}
function je(e, t) {
  let n = e;
  for (const a of t) {
    if (!n) return null;
    if (Vt(n)) n = n.children[a];
    else if (le(n)) n = n.frames[a]?.node;
    else {
      const r = n.panels[a];
      n = r === void 0 || $e(r) ? void 0 : r;
    }
  }
  return n ?? null;
}
function lt(e, t, n) {
  if (t.length === 0) return n;
  const [a, ...r] = t;
  if (a === void 0) return e;
  if (le(e)) {
    const o = e.frames[a];
    if (!o) return e;
    const c = lt(o.node, r, n);
    if (c === o.node) return e;
    const u = [...e.frames];
    return u[a] = { ...o, node: c }, { ...e, frames: u };
  }
  if (Z(e)) {
    const o = e.panels[a];
    if (o === void 0 || $e(o)) return e;
    const c = lt(o, r, n);
    if (c === o) return e;
    const u = [...e.panels];
    return u[a] = c, { ...e, panels: u };
  }
  const s = e.children[a];
  if (!s) return e;
  const l = lt(s, r, n);
  if (l === s) return e;
  const i = [...e.children];
  return i[a] = l, { ...e, children: i };
}
function Pn(e, t, n) {
  if (t.length === 0)
    return Vt(e) ? { ...e, sizes: fr(e.children.length, n) } : e;
  const [a, ...r] = t;
  if (a === void 0) return e;
  if (le(e)) {
    const i = e.frames[a];
    if (!i) return e;
    const o = Pn(i.node, r, n);
    if (o === i.node) return e;
    const c = [...e.frames];
    return c[a] = { ...i, node: o }, { ...e, frames: c };
  }
  if (Z(e)) {
    const i = e.panels[a];
    if (i === void 0 || $e(i)) return e;
    const o = Pn(i, r, n);
    if (o === i) return e;
    const c = [...e.panels];
    return c[a] = o, { ...e, panels: c };
  }
  const s = e.children[a];
  if (!s) return e;
  const l = [...e.children];
  return l[a] = Pn(s, r, n), { ...e, children: l };
}
function Xr(e, t, n, a = 0.02) {
  const r = e[t], s = e[t + 1];
  if (r === void 0 || s === void 0) return e;
  const l = r + s;
  if (l < a * 2) return e;
  const i = [...e], o = Math.min(Math.max(r + n, a), l - a);
  return i[t] = o, i[t + 1] = l - o, i;
}
function Hn(e) {
  if (!Z(e) || e.panels.length >= 2) return e;
  const t = e.panels[0];
  return t !== void 0 && !$e(t) ? e : { ...cr([up(e)]), ...Pe(e) };
}
const up = (e) => {
  if (!e.title) return e;
  const { title: t, ...n } = e;
  return n;
};
function Qr(e) {
  return e.length === 0 ? null : cr(e.map(Ze));
}
function dp(e, t) {
  if (!e) return Qr(t);
  const n = new Set(t), a = /* @__PURE__ */ new Set(), r = /* @__PURE__ */ new Set();
  for (const o of Ue(e))
    !n.has(o) || a.has(o) ? r.add(o) : a.add(o);
  let s = e;
  for (const o of r)
    s = s ? St(s, o) : null;
  const l = new Set(s ? Ue(s) : []), i = t.filter((o) => !l.has(o));
  if (i.length === 0) return s ? Hn(Me(s)) : null;
  if (!s) return Qr(i);
  if (le(s)) {
    const o = s.frames.length;
    return {
      ...s,
      frames: [
        ...s.frames,
        ...i.map(
          (c, u) => aa(Ze(c), {
            x: xt.x + (o + u) * Dn,
            y: xt.y + (o + u) * Dn
          })
        )
      ]
    };
  }
  return Hn(Me(cr([s, ...i.map(Ze)])));
}
const vr = Symbol("dc.windowContext");
function fp(e) {
  return ln(vr, e), e;
}
function oa() {
  const e = Mt(vr, null);
  if (!e)
    throw new Error(
      "[header-content-layout] No window context found. Render this component inside <WindowFrame>."
    );
  return e;
}
const pp = 320, vp = 240;
function hp(e) {
  if (!e || typeof window > "u") return;
  const t = e.getBoundingClientRect();
  if (t.width <= 0 || t.height <= 0) return;
  const n = Math.max(0, window.outerHeight - window.innerHeight);
  return {
    width: Math.round(t.width),
    height: Math.round(t.height),
    left: Math.round(window.screenX + t.left),
    top: Math.round(window.screenY + n + t.top)
  };
}
function mp(e, t) {
  if (typeof window > "u") return null;
  const n = Math.max(pp, Math.round(t?.width ?? window.innerWidth)), a = Math.max(vp, Math.round(t?.height ?? window.innerHeight)), r = ["popup", `width=${n}`, `height=${a}`];
  t?.left !== void 0 && r.push(`left=${t.left}`), t?.top !== void 0 && r.push(`top=${t.top}`);
  const s = window.open(e, "_blank", r.join(","));
  if (s)
    try {
      s.opener = null;
    } catch {
    }
  return s;
}
const gp = ["data-dc-glyph"], yp = { class: "dc-glyph__line" }, _p = ["d"], wp = {
  key: 0,
  class: "dc-glyph__aqua"
}, kp = ["d"], bp = /* @__PURE__ */ re({
  __name: "WindowGlyph",
  props: {
    kind: {}
  },
  setup(e) {
    const t = {
      minimize: ["M2 5h6"],
      // Rolled up, the window is its own bar. A second square beside the maximize
      // one would be a riddle at this size; what unrolls is the body coming back
      // down, so that is the mark.
      unroll: ["M2.4 4l2.6 2.6L7.6 4"],
      maximize: ["M2.5 2.5h5v5h-5z"],
      // The near square, with the one it came from behind it.
      restore: ["M2 4.5h3.5V8H2z", "M4 4.5V2h4v4H5.5"],
      close: ["M2.4 2.4l5.2 5.2", "M7.6 2.4l-5.2 5.2"]
    }, n = {
      minimize: ["M2.2 4.3h5.6v1.4H2.2z"],
      unroll: ["M2.2 4.3h5.6v1.4H2.2z"],
      maximize: ["M8.4 1.6v4.2l-4.2-4.2z", "M1.6 8.4v-4.2l4.2 4.2z"],
      restore: ["M5 5h4.2L5 0.8z", "M5 5H0.8L5 9.2z"]
    };
    return (a, r) => (f(), h("svg", {
      class: "dc-glyph",
      "data-dc-glyph": e.kind,
      viewBox: "0 0 10 10",
      "aria-hidden": "true",
      focusable: "false"
    }, [
      P("g", yp, [
        (f(!0), h(te, null, he(t[e.kind], (s) => (f(), h("path", {
          key: s,
          d: s
        }, null, 8, _p))), 128))
      ]),
      n[e.kind] ? (f(), h("g", wp, [
        (f(!0), h(te, null, he(n[e.kind], (s) => (f(), h("path", {
          key: s,
          d: s
        }, null, 8, kp))), 128))
      ])) : L("", !0)
    ], 8, gp));
  }
}), Bt = /* @__PURE__ */ oe(bp, [["__scopeId", "data-v-4d2872c0"]]), $p = ["data-dc-order", "data-dc-path", "data-dc-maximized", "data-dc-minimized", "data-dc-dragging"], xp = ["data-dc-movable"], Sp = { class: "dc-float__title dc-truncate" }, Mp = {
  key: 1,
  class: "dc-float__controls dc-controls"
}, Cp = ["aria-label", "aria-pressed", "data-dc-minimize"], Ep = ["aria-label", "aria-pressed", "data-dc-maximize"], Pp = ["aria-label", "data-dc-close"], Ap = { class: "dc-float__content" }, Tp = ["data-dc-handle", "onPointerdown"], Lp = /* @__PURE__ */ re({
  __name: "WindowFloat",
  props: {
    frame: {},
    path: {},
    order: {},
    place: {}
  },
  setup(e) {
    const t = e, n = oa(), a = p(() => ze(t.frame.node)), r = p(() => n.panelFor(a.value)?.fixed === !0), s = p(() => ht(t.frame)), l = p(() => bt(t.frame)), i = p(() => s.value || l.value), o = p(() => n.resizable.value && !r.value && !i.value), c = p(() => n.movable.value && !r.value && !i.value), u = p(() => {
      const C = Ue(t.frame.node);
      return C.length === 1 ? C[0] ?? null : null;
    }), m = p(() => u.value !== null && n.closable(u.value)), x = p(() => t.frame.node.headless === !0), b = p(
      () => !x.value && (!Z(t.frame.node) || l.value)
    ), w = p(
      () => t.frame.title || Dt(t.frame.node) || Jt(t.frame.node, (C) => n.panelFor(C)?.title)
    ), y = p(() => n.spaceMenu(t.path));
    function $(C) {
      C.target?.closest("button, a, input, select, textarea, label") || n.beginFrameDragAt(t.path, C, "move");
    }
    function g(C) {
      C.target?.closest("button, a, input, select, textarea, label") || (l.value ? n.toggleMinimizeAt(t.path) : n.toggleMaximizeAt(t.path));
    }
    const M = p(() => {
      const C = n.framing.value;
      return C !== null && ye(t.frame.node, C);
    }), k = p(() => ({
      // Neither maximizing nor rolling up overwrites the rect: it is where the
      // window goes back to, and both are a way of not being there for a while.
      ...s.value ? { inset: "0" } : l.value && t.place ? {
        left: `${t.place.x}px`,
        bottom: `${t.place.bottom}px`,
        width: `${Ia}px`,
        height: `${Js}px`
      } : {
        left: `${t.frame.rect.x}px`,
        top: `${t.frame.rect.y}px`,
        width: `${t.frame.rect.w}px`,
        height: `${t.frame.rect.h}px`
      },
      // Back to front. The DOM order says the same thing, but a frame that paints
      // a shadow over its neighbour should not depend on that being noticed.
      zIndex: t.order + 1
    })), S = ["n", "s", "e", "w", "nw", "ne", "sw", "se"];
    return (C, z) => (f(), h("div", {
      class: "dc-float",
      style: xe(k.value),
      "data-dc-order": e.order,
      "data-dc-path": e.path.join("/"),
      "data-dc-maximized": s.value ? "true" : "false",
      "data-dc-minimized": l.value ? "true" : "false",
      "data-dc-dragging": M.value ? "true" : "false",
      onPointerdown: z[3] || (z[3] = (T) => O(n).raiseAt(e.path))
    }, [
      b.value ? (f(), h("header", {
        key: 0,
        class: "dc-float__bar",
        "data-dc-movable": c.value ? "true" : "false",
        onPointerdown: $,
        onDblclick: g
      }, [
        P("span", Sp, B(w.value), 1),
        y.value.length ? (f(), Y(or, {
          key: 0,
          items: y.value,
          label: `${w.value} menu`
        }, null, 8, ["items", "label"])) : L("", !0),
        !r.value || l.value && m.value && u.value ? (f(), h("div", Mp, [
          r.value ? L("", !0) : (f(), h("button", {
            key: 0,
            type: "button",
            class: "dc-float__button dc-control",
            "aria-label": `${l.value ? "Unroll" : "Minimize"} ${w.value}`,
            "aria-pressed": l.value,
            "data-dc-minimize": a.value,
            onClick: z[0] || (z[0] = (T) => O(n).toggleMinimizeAt(e.path))
          }, [
            de(Bt, {
              kind: l.value ? "unroll" : "minimize"
            }, null, 8, ["kind"])
          ], 8, Cp)),
          r.value ? L("", !0) : (f(), h("button", {
            key: 1,
            type: "button",
            class: "dc-float__button dc-control",
            "aria-label": `${s.value ? "Restore" : "Maximize"} ${w.value}`,
            "aria-pressed": s.value,
            "data-dc-maximize": a.value,
            onClick: z[1] || (z[1] = (T) => O(n).toggleMaximizeAt(e.path))
          }, [
            de(Bt, {
              kind: s.value ? "restore" : "maximize"
            }, null, 8, ["kind"])
          ], 8, Ep)),
          l.value && m.value && u.value ? (f(), h("button", {
            key: 2,
            type: "button",
            class: "dc-float__button dc-control",
            "aria-label": `Close ${w.value}`,
            "data-dc-close": u.value,
            onClick: z[2] || (z[2] = (T) => O(n).close(u.value))
          }, [
            de(Bt, { kind: "close" })
          ], 8, Pp)) : L("", !0)
        ])) : L("", !0)
      ], 40, xp)) : L("", !0),
      P("div", Ap, [
        we(C.$slots, "default", {}, void 0, !0)
      ]),
      (f(!0), h(te, null, he(o.value ? S : [], (T) => (f(), h("span", {
        key: T,
        class: "dc-float__grip",
        "data-dc-handle": T,
        "aria-hidden": "true",
        onPointerdown: Qe((A) => O(n).beginFrameDragAt(e.path, A, T), ["stop"])
      }, null, 40, Tp))), 128))
    ], 44, $p));
  }
}), Op = /* @__PURE__ */ oe(Lp, [["__scopeId", "data-v-f035684c"]]), hr = Symbol("dc.paneContext");
function go(e) {
  return ln(hr, e), e;
}
function lh() {
  return Mt(hr, null);
}
function ih(e) {
  const t = Mt(vr, null), n = Mt(hr, null);
  if (!t || !n) return () => {
  };
  const a = t.registerMenu(
    () => n.panel.value,
    () => ut(e)
  );
  return qn() && Ht(a), a;
}
const Rp = ["data-dc-panel"], zp = /* @__PURE__ */ re({
  __name: "WindowPaneBody",
  props: {
    panel: {},
    active: { type: Boolean }
  },
  setup(e) {
    const t = e, n = oa();
    go({ panel: p(() => t.panel) });
    const a = () => {
      const r = n.panelFor(t.panel);
      return r ? n.renderContent(r, n.viewFor(t.panel), t.active) ?? null : null;
    };
    return (r, s) => (f(), h("div", {
      class: "dc-pane__content",
      "data-dc-panel": t.panel
    }, [
      de(a)
    ], 8, Rp));
  }
}), Ip = /* @__PURE__ */ oe(zp, [["__scopeId", "data-v-31c655fd"]]), Np = ["data-dc-panel", "data-dc-panels", "data-dc-tabbed", "data-dc-floating", "data-dc-maximized", "data-dc-headless", "data-dc-active", "data-dc-dragging", "aria-label"], Bp = ["data-dc-movable"], Fp = ["aria-label", "aria-pressed"], Dp = ["data-dc-space-name"], Hp = { class: "dc-truncate" }, qp = ["aria-label"], Vp = {
  key: 0,
  class: "dc-pane__insert",
  "aria-hidden": "true"
}, Kp = ["id", "data-dc-panel", "data-dc-space", "aria-selected", "aria-controls", "tabindex", "onPointerdown", "onClick", "onKeydown"], Wp = { class: "dc-tab__name dc-truncate" }, jp = {
  key: 0,
  class: "dc-pane__sub dc-mono dc-truncate"
}, Up = ["aria-label", "data-dc-close", "onClick"], Gp = {
  key: 0,
  class: "dc-pane__insert",
  "aria-hidden": "true"
}, Yp = { class: "dc-pane__tools" }, Xp = {
  key: 2,
  class: "dc-pane__controls dc-controls"
}, Qp = ["aria-label", "data-dc-minimize"], Zp = ["aria-label", "aria-pressed", "data-dc-maximize"], Jp = ["aria-label", "data-dc-close"], ev = ["id", "role", "aria-labelledby"], tv = ["id", "role", "aria-labelledby"], nv = ["data-dc-edge"], av = /* @__PURE__ */ re({
  __name: "WindowPane",
  props: {
    group: {},
    path: {}
  },
  setup(e) {
    const t = e, n = oa(), a = Vn() ?? "dc-pane", r = p(
      () => t.group.panels.flatMap((N, Q) => {
        if (!$e(N)) {
          const Re = Dt(N) || Jt(N, (Be) => n.panelFor(Be)?.title);
          return [{ kind: "space", index: Q, id: `space-${Q}`, title: Re, node: N }];
        }
        const ee = n.panelFor(N);
        return ee ? [{ kind: "panel", index: Q, id: N, title: ee.title, panel: ee }] : [];
      })
    ), s = p(() => r.value.length > 1), l = p(() => {
      const N = Tt(t.group);
      return r.value.find((Q) => Q.index === N) ?? r.value[0] ?? null;
    }), i = p(() => l.value?.kind === "space" ? l.value.node : null), o = p(() => i.value ? "" : to(t.group)), c = p(() => i.value ? null : n.panelFor(o.value)), u = p(() => l.value?.title ?? ""), m = p(() => n.spaceNames.value ? t.group.title ?? "" : ""), x = p(() => [...t.path, l.value?.index ?? 0]), b = p(() => o.value || Vr(t.group)[0] || ""), w = p(() => n.viewFor(o.value)), y = p(() => t.group.headless === !0), $ = p(() => n.focused.value === o.value), g = p(() => n.dragging.value === o.value), M = p(() => n.moving.value === o.value), k = p(() => n.frameOf(b.value) !== null), S = p(() => n.panelFor(b.value)?.fixed === !0), C = p(
      () => !i.value && (n.canMove(o.value) || k.value && n.movable.value && !S.value)
    ), z = p(
      () => i.value ? n.spaceMenu(x.value) : n.menuFor(o.value)
    ), T = (N) => n.closable(N);
    go({ panel: o });
    const A = p(() => n.maximized(b.value)), E = p(
      () => k.value && !S.value || !s.value && !!c.value && T(c.value.id)
    ), K = (N) => `${a}-tab-${N}`, W = p(() => `${a}-body`), X = p(() => {
      const N = n.dropTarget.value;
      return !N || !We(t.group, N.panel) || N.edge === "float" ? null : N;
    }), ge = p(() => X.value?.index === void 0 ? X.value?.edge ?? null : null), ve = p(() => X.value?.index ?? null), Ne = p(
      () => r.value.flatMap(
        (N) => N.kind === "panel" && (N.id === o.value || N.panel.keepAlive === !0) ? [N.id] : []
      )
    ), q = V(null), G = /* @__PURE__ */ new Map();
    be(
      o,
      (N, Q) => {
        const ee = q.value;
        if (!ee || (Q && G.set(Q, ee.scrollTop), !n.panelFor(N)?.keepAlive || !G.has(N))) return;
        const Re = G.get(N);
        yt(() => {
          q.value && (q.value.scrollTop = Re);
        });
      },
      { flush: "pre" }
    );
    const se = () => c.value ? n.renderActions(c.value, w.value, $.value) ?? null : null;
    let ie = null;
    function I(N) {
      const Q = ie !== null && Math.hypot(N.clientX - ie.x, N.clientY - ie.y) >= 4;
      return ie = null, Q;
    }
    const J = (N) => N.kind === "panel" ? N.id : ze(N.node);
    function fe(N, Q) {
      Q.kind !== "space" && (n.focus(Q.id), ie = { x: N.clientX, y: N.clientY }, n.beginDrag(Q.id, N));
    }
    function qe(N, Q) {
      if (I(N)) return;
      const ee = J(Q);
      ee && n.selectPanel(ee);
    }
    function nt(N) {
      o.value && n.focus(o.value), !N.target?.closest(".dc-tab, button, a, input, select, textarea, label") && (k.value ? n.beginFrameDrag(b.value, N, "move") : n.beginDrag(o.value, N));
    }
    function at(N) {
      ie = { x: N.clientX, y: N.clientY }, n.beginDrag(o.value, N);
    }
    function Ge(N) {
      I(N) || n.toggleMoveMode(o.value);
    }
    const Ve = {
      ArrowLeft: "left",
      ArrowRight: "right",
      ArrowUp: "up",
      ArrowDown: "down"
    };
    function Ye(N) {
      if (!M.value) return;
      if (N.key === "Escape") {
        N.preventDefault(), n.toggleMoveMode(o.value);
        return;
      }
      const Q = Ve[N.key];
      Q && (N.preventDefault(), k.value ? n.nudgeFrame(o.value, Q, N.shiftKey) : n.nudge(o.value, Q, N.shiftKey));
    }
    function F(N) {
      !k.value || N.target?.closest(".dc-tab, button, a, input, select, textarea, label") || n.toggleMaximize(b.value);
    }
    function j(N, Q) {
      N.stopPropagation(), ie = null, n.close(Q);
    }
    function ae(N, Q) {
      const ee = r.value.length;
      let Re = null;
      if (N.key === "ArrowRight" ? Re = (Q + 1) % ee : N.key === "ArrowLeft" ? Re = (Q - 1 + ee) % ee : N.key === "Home" ? Re = 0 : N.key === "End" && (Re = ee - 1), Re === null) return;
      N.preventDefault();
      const Be = r.value[Re];
      if (!Be) return;
      const Kt = J(Be);
      Kt && n.selectPanel(Kt);
    }
    return (N, Q) => l.value ? (f(), h("section", {
      key: 0,
      class: "dc-pane",
      "data-dc-panel": o.value || void 0,
      "data-dc-panels": O(Vr)(e.group).join(" ") || void 0,
      "data-dc-tabbed": s.value ? "true" : "false",
      "data-dc-floating": k.value ? "true" : "false",
      "data-dc-maximized": A.value ? "true" : "false",
      "data-dc-headless": y.value ? "true" : "false",
      "data-dc-active": $.value ? "true" : "false",
      "data-dc-dragging": g.value ? "true" : "false",
      "aria-label": u.value,
      onFocusin: Q[7] || (Q[7] = (ee) => o.value && O(n).focus(o.value))
    }, [
      y.value ? L("", !0) : (f(), h("header", {
        key: 0,
        class: "dc-pane__head",
        "data-dc-movable": C.value ? "true" : "false",
        onPointerdown: nt,
        onDblclick: F
      }, [
        C.value ? (f(), h("button", {
          key: 0,
          type: "button",
          class: "dc-pane__grip",
          "aria-label": `Move ${u.value}`,
          "aria-pressed": M.value,
          onPointerdown: at,
          onClick: Ge,
          onKeydown: Ye
        }, [...Q[8] || (Q[8] = [
          P("span", { "aria-hidden": "true" }, "⠿", -1)
        ])], 40, Fp)) : L("", !0),
        m.value ? (f(), h("span", {
          key: 1,
          class: "dc-pane__name",
          "data-dc-space-name": m.value
        }, [
          P("span", Hp, B(m.value), 1)
        ], 8, Dp)) : L("", !0),
        P("div", {
          class: "dc-pane__tabs",
          role: "tablist",
          "aria-label": `${u.value} panels`
        }, [
          (f(!0), h(te, null, he(r.value, (ee, Re) => (f(), h(te, {
            key: ee.id
          }, [
            ve.value === Re ? (f(), h("span", Vp)) : L("", !0),
            P("button", {
              id: K(ee.id),
              type: "button",
              role: "tab",
              class: "dc-tab",
              "data-dc-panel": ee.kind === "panel" ? ee.id : void 0,
              "data-dc-space": ee.kind === "space" ? ee.title : void 0,
              "aria-selected": ee.index === l.value.index,
              "aria-controls": W.value,
              tabindex: ee.index === l.value.index ? 0 : -1,
              onPointerdown: (Be) => fe(Be, ee),
              onClick: (Be) => qe(Be, ee),
              onKeydown: (Be) => ae(Be, Re)
            }, [
              P("span", Wp, B(ee.title), 1),
              ee.kind === "panel" && ee.panel.subtitle ? (f(), h("span", jp, B(ee.panel.subtitle), 1)) : L("", !0),
              s.value && ee.kind === "panel" && T(ee.id) ? (f(), h("span", {
                key: 1,
                class: "dc-tab__close",
                role: "button",
                tabindex: "-1",
                "aria-label": `Close ${ee.title}`,
                "data-dc-close": ee.id,
                onPointerdown: Q[0] || (Q[0] = Qe(() => {
                }, ["stop"])),
                onClick: (Be) => j(Be, ee.id)
              }, [...Q[9] || (Q[9] = [
                P("span", { "aria-hidden": "true" }, "×", -1)
              ])], 40, Up)) : L("", !0)
            ], 40, Kp)
          ], 64))), 128)),
          ve.value === r.value.length ? (f(), h("span", Gp)) : L("", !0)
        ], 8, qp),
        P("div", Yp, [
          de(se),
          z.value.length ? (f(), Y(or, {
            key: 0,
            items: z.value,
            label: `${u.value} menu`
          }, null, 8, ["items", "label"])) : L("", !0)
        ]),
        E.value ? (f(), h("div", Xp, [
          k.value && !S.value ? (f(), h("button", {
            key: 0,
            type: "button",
            class: "dc-pane__button dc-control",
            "aria-label": `Minimize ${u.value}`,
            "data-dc-minimize": b.value,
            onPointerdown: Q[1] || (Q[1] = Qe(() => {
            }, ["stop"])),
            onClick: Q[2] || (Q[2] = (ee) => O(n).toggleMinimize(b.value))
          }, [
            de(Bt, { kind: "minimize" })
          ], 40, Qp)) : L("", !0),
          k.value && !S.value ? (f(), h("button", {
            key: 1,
            type: "button",
            class: "dc-pane__button dc-control",
            "aria-label": `${A.value ? "Restore" : "Maximize"} ${u.value}`,
            "aria-pressed": A.value,
            "data-dc-maximize": b.value,
            onPointerdown: Q[3] || (Q[3] = Qe(() => {
            }, ["stop"])),
            onClick: Q[4] || (Q[4] = (ee) => O(n).toggleMaximize(b.value))
          }, [
            de(Bt, {
              kind: A.value ? "restore" : "maximize"
            }, null, 8, ["kind"])
          ], 40, Zp)) : L("", !0),
          !s.value && c.value && T(c.value.id) ? (f(), h("button", {
            key: 2,
            type: "button",
            class: "dc-pane__close dc-control",
            "aria-label": `Close ${u.value}`,
            "data-dc-close": c.value.id,
            onPointerdown: Q[5] || (Q[5] = Qe(() => {
            }, ["stop"])),
            onClick: Q[6] || (Q[6] = (ee) => O(n).close(c.value.id))
          }, [
            de(Bt, { kind: "close" })
          ], 40, Jp)) : L("", !0)
        ])) : L("", !0)
      ], 40, Bp)),
      i.value ? (f(), h("div", {
        key: 1,
        id: W.value,
        class: "dc-pane__space",
        role: y.value ? void 0 : "tabpanel",
        "aria-labelledby": y.value ? void 0 : K(l.value.id)
      }, [
        we(N.$slots, "space", {
          node: i.value,
          path: x.value
        }, void 0, !0)
      ], 8, ev)) : L("", !0),
      !i.value || Ne.value.length ? en((f(), h("div", {
        key: 2,
        id: i.value ? void 0 : W.value,
        ref_key: "body",
        ref: q,
        class: "dc-pane__body",
        role: y.value || i.value ? void 0 : "tabpanel",
        "aria-labelledby": y.value || i.value ? void 0 : K(o.value)
      }, [
        (f(!0), h(te, null, he(Ne.value, (ee) => en((f(), Y(Ip, {
          key: ee,
          panel: ee,
          active: ee === o.value && $.value
        }, null, 8, ["panel", "active"])), [
          [On, ee === o.value]
        ])), 128))
      ], 8, tv)), [
        [On, !i.value]
      ]) : L("", !0),
      ge.value ? (f(), h("div", {
        key: 3,
        class: "dc-pane__drop",
        "data-dc-edge": ge.value,
        "aria-hidden": "true"
      }, null, 8, nv)) : L("", !0)
    ], 40, Np)) : L("", !0);
  }
}), yo = /* @__PURE__ */ oe(av, [["__scopeId", "data-v-2c3c5ecf"]]), rv = ["data-dc-space", "data-dc-path", "data-dc-bare", "aria-label"], sv = {
  key: 0,
  class: "dc-space__head"
}, ov = { class: "dc-space__title dc-truncate" }, lv = ["data-dc-direction"], iv = {
  key: 0,
  class: "dc-space__drop",
  "aria-hidden": "true"
}, cv = ["aria-orientation", "aria-label", "aria-valuenow", "aria-disabled", "tabindex", "onPointerdown", "onKeydown"], uv = /* @__PURE__ */ re({
  __name: "WindowNode",
  props: {
    node: {},
    path: {},
    framed: { type: Boolean }
  },
  setup(e) {
    const t = e, n = oa(), a = V(null), r = p(() => Z(t.node) ? t.node : null), s = p(() => Vt(t.node) ? t.node : null), l = p(() => le(t.node) ? t.node : null), i = p(
      () => s.value ? s.value.children : l.value?.frames.map((q) => q.node) ?? []
    ), o = p(() => s.value ? dt(s.value) : []), c = p(
      () => (l.value?.frames ?? []).map((q, G) => ({
        held: q,
        /** Place in the stack, counted from the back — what `z-index` follows. */
        order: G,
        key: A(q.node),
        path: [...t.path, G]
      })).sort((q, G) => q.key < G.key ? -1 : q.key > G.key ? 1 : 0)
    ), u = p(() => Dt(t.node)), m = p(() => n.spaceMenu(t.path)), x = p(() => t.node.headless === !0), b = p(() => t.path.length === 0 && !n.rootBar.value), w = p(() => l.value ? "desktop" : s.value?.direction ?? ""), y = V(null), $ = V(0);
    let g = null;
    be(
      y,
      (q) => {
        g?.disconnect(), g = null, !(!q || typeof ResizeObserver > "u") && ($.value = q.clientWidth, g = new ResizeObserver(([G]) => {
          $.value = G?.contentRect.width ?? 0;
        }), g.observe(q));
      },
      { immediate: !0 }
    ), Ie(() => g?.disconnect());
    const M = p(() => {
      const q = Math.max(
        1,
        Math.floor(($.value + Lt) / (Ia + Lt))
      ), G = /* @__PURE__ */ new Map();
      let se = 0;
      for (const ie of c.value)
        ie.held.minimized === !0 && (G.set(ie.key, {
          x: Lt + se % q * (Ia + Lt),
          bottom: Lt + Math.floor(se / q) * (Js + Lt)
        }), se += 1);
      return G;
    }), k = (q) => !!q && q.join("/") === t.path.join("/"), S = p(() => {
      const q = n.dropTarget.value, G = l.value;
      if (!G || !q?.rect || q.edge !== "float") return null;
      if (q.space) return k(q.space) ? q.rect : null;
      const se = Oe(G, q.panel);
      return se && G.frames.includes(se) ? q.rect : null;
    }), C = p(() => {
      const q = n.dropTarget.value;
      return !!q && !q.rect && k(q.space);
    }), z = p(() => s.value?.direction === "row"), T = p(() => i.value.map((q, G) => [...t.path, G])), A = (q) => [...Ue(q)].sort().join("/"), E = (q) => {
      const G = Ue(q)[0];
      return (G ? n.panelFor(G)?.title : null) ?? G ?? "panel";
    }, K = (q) => {
      const G = i.value[q], se = i.value[q + 1];
      return !G || !se ? "Resize panels" : `Resize ${E(G)} and ${E(se)}`;
    }, W = (q) => {
      const G = o.value[q] ?? 0, se = o.value[q + 1] ?? 0, ie = G + se;
      return ie > 0 ? Math.round(G / ie * 100) : 50;
    };
    function X() {
      const q = a.value, G = q ? z.value ? q.clientWidth : q.clientHeight : 0;
      return G <= 0 ? 0.05 : Math.min(n.minPanelSize.value / G, 0.4);
    }
    let ge = null;
    function ve(q, G) {
      const se = s.value, ie = a.value;
      if (!n.resizable.value || !se || !ie || q.button !== 0) return;
      const I = z.value ? ie.clientWidth : ie.clientHeight;
      if (I <= 0) return;
      const J = z.value ? q.clientX : q.clientY, fe = dt(se), qe = Math.min(n.minPanelSize.value / I, 0.4);
      q.preventDefault();
      const nt = (Ve) => {
        const Ye = ((z.value ? Ve.clientX : Ve.clientY) - J) / I;
        n.setSizes(t.path, Xr(fe, G, Ye, qe));
      }, at = () => ge?.(), Ge = (Ve) => {
        Ve.key === "Escape" && (n.setSizes(t.path, fe), ge?.());
      };
      ge = () => {
        window.removeEventListener("pointermove", nt), window.removeEventListener("pointerup", at), window.removeEventListener("pointercancel", at), window.removeEventListener("keydown", Ge), ge = null;
      }, window.addEventListener("pointermove", nt), window.addEventListener("pointerup", at), window.addEventListener("pointercancel", at), window.addEventListener("keydown", Ge);
    }
    Ie(() => ge?.());
    function Ne(q, G) {
      const se = s.value;
      if (!n.resizable.value || !se) return;
      const ie = z.value ? "ArrowRight" : "ArrowDown", I = z.value ? "ArrowLeft" : "ArrowUp", J = q.shiftKey ? 0.1 : 0.02;
      if (q.key !== ie && q.key !== I) return;
      const fe = q.key === ie ? J : -J;
      q.preventDefault(), n.setSizes(t.path, Xr(dt(se), G, fe, X()));
    }
    return (q, G) => {
      const se = ns("WindowNode", !0);
      return r.value ? (f(), Y(yo, {
        key: 0,
        group: r.value,
        path: e.path
      }, {
        space: Ee(({ node: ie, path: I }) => [
          de(se, {
            node: ie,
            path: I,
            framed: !r.value.headless
          }, null, 8, ["node", "path", "framed"])
        ]),
        _: 1
      }, 8, ["group", "path"])) : (f(), h("section", {
        key: 1,
        class: "dc-space",
        "data-dc-space": w.value,
        "data-dc-path": e.path.join("/"),
        "data-dc-bare": b.value ? "true" : void 0,
        "aria-label": u.value
      }, [
        !e.framed && !x.value && !b.value ? (f(), h("header", sv, [
          P("span", ov, B(u.value), 1),
          m.value.length ? (f(), Y(or, {
            key: 0,
            items: m.value,
            label: `${u.value} menu`
          }, null, 8, ["items", "label"])) : L("", !0)
        ])) : L("", !0),
        l.value ? (f(), h("div", {
          key: 1,
          ref_key: "desktop",
          ref: y,
          class: "dc-window__desktop"
        }, [
          S.value ? (f(), h("div", {
            key: 0,
            class: "dc-window__drop",
            style: xe({
              left: `${S.value.x}px`,
              top: `${S.value.y}px`,
              width: `${S.value.w}px`,
              height: `${S.value.h}px`
            }),
            "aria-hidden": "true"
          }, null, 4)) : L("", !0),
          (f(!0), h(te, null, he(c.value, (ie) => (f(), Y(Op, {
            key: ie.key,
            frame: ie.held,
            path: ie.path,
            order: ie.order,
            place: M.value.get(ie.key) ?? null
          }, {
            default: Ee(() => [
              de(se, {
                node: ie.held.node,
                path: ie.path,
                framed: ie.held.node.kind !== "group"
              }, null, 8, ["node", "path", "framed"])
            ]),
            _: 2
          }, 1032, ["frame", "path", "order", "place"]))), 128))
        ], 512)) : s.value ? (f(), h("div", {
          key: 2,
          ref_key: "container",
          ref: a,
          class: "dc-window__split",
          "data-dc-direction": s.value.direction
        }, [
          C.value ? (f(), h("div", iv)) : L("", !0),
          (f(!0), h(te, null, he(i.value, (ie, I) => (f(), h(te, {
            key: A(ie)
          }, [
            P("div", {
              class: "dc-window__cell",
              style: xe({ flexGrow: o.value[I] ?? 1 })
            }, [
              de(se, {
                node: ie,
                path: T.value[I] ?? []
              }, null, 8, ["node", "path"])
            ], 4),
            I < i.value.length - 1 ? (f(), h("div", {
              key: 0,
              class: "dc-window__gutter",
              role: "separator",
              "aria-orientation": z.value ? "vertical" : "horizontal",
              "aria-label": K(I),
              "aria-valuenow": W(I),
              "aria-valuemin": "0",
              "aria-valuemax": "100",
              "aria-disabled": O(n).resizable.value ? void 0 : "true",
              tabindex: O(n).resizable.value ? 0 : -1,
              onPointerdown: (J) => ve(J, I),
              onKeydown: (J) => Ne(J, I)
            }, null, 40, cv)) : L("", !0)
          ], 64))), 128))
        ], 8, lv)) : L("", !0)
      ], 8, rv));
    };
  }
}), dv = /* @__PURE__ */ oe(uv, [["__scopeId", "data-v-b394f0e4"]]), fv = ["data-dc-theme", "data-dc-dragging", "data-dc-docking"], pv = {
  key: 1,
  class: "dc-window__empty"
}, vv = {
  class: "dc-window__live",
  "aria-live": "polite",
  role: "status"
}, Sn = 16, hv = /* @__PURE__ */ re({
  __name: "WindowFrame",
  props: /* @__PURE__ */ Ln({
    panels: {},
    movable: { type: Boolean, default: !1 },
    resizable: { type: Boolean, default: !0 },
    minPanelSize: { default: 120 },
    closable: { type: Boolean, default: !1 },
    menu: { type: Boolean, default: !0 },
    spaceNames: { type: Boolean, default: !0 },
    rootBar: { type: Boolean, default: !0 },
    paneMenu: {},
    popOut: {},
    solo: { type: Boolean, default: !1 },
    accent: {},
    tokens: {},
    theme: { default: "minimal" }
  }, {
    layout: { default: null },
    layoutModifiers: {},
    views: { default: () => ({}) },
    viewsModifiers: {}
  }),
  emits: /* @__PURE__ */ Ln(["panel-move", "view-change", "panel-activate", "tab-select", "frame-change", "frame-maximize", "frame-minimize", "panel-close", "panel-pop-out"], ["update:layout", "update:views"]),
  setup(e, { expose: t, emit: n }) {
    const a = e, r = n, s = Tn(e, "layout"), l = Tn(e, "views"), i = cn(), o = p(() => new Map(a.panels.map((d) => [d.id, d]))), c = p(() => a.panels.map((d) => d.id)), u = p(() => dp(s.value, m.value)), m = p(() => {
      if (!a.solo || !s.value) return c.value;
      const d = new Set(Ue(s.value)), v = c.value.filter((_) => d.has(_));
      return v.length ? v : c.value;
    }), x = V(null), b = V(null), w = V(null), y = V(!0), $ = V(null), g = V(null), M = V(null), k = V(""), S = V(null);
    function C() {
      const d = S.value;
      return d ? [...d.querySelectorAll(".dc-pane[data-dc-panels]")].filter((_) => _.closest(".dc-window") === d).map((_) => ({ panels: (_.dataset.dcPanels ?? "").split(" "), element: _ })) : [];
    }
    function z(d) {
      const v = [];
      let _ = d.closest(".dc-float");
      for (; _; )
        v.unshift(Number(_.dataset.dcOrder ?? 0)), _ = _.parentElement?.closest(".dc-float") ?? null;
      return v;
    }
    function T() {
      return C().map((d) => ({ pane: d, order: z(d.element) })).sort((d, v) => {
        const _ = Math.max(d.order.length, v.order.length);
        for (let R = 0; R < _; R += 1) {
          const D = (d.order[R] ?? -1) - (v.order[R] ?? -1);
          if (D !== 0) return D;
        }
        return 0;
      }).map((d) => d.pane);
    }
    const A = (d) => C().find((v) => v.panels.includes(d)) ?? null;
    function E(d) {
      const v = o.value.get(d);
      if (!v) return "";
      const _ = l.value[d];
      return _ && v.views?.some((R) => R.key === _) ? _ : v.defaultView ?? v.views?.[0]?.key ?? "";
    }
    function K(d, v) {
      l.value = { ...l.value, [d]: v }, r("view-change", { panel: d, view: v });
    }
    const W = p(
      () => a.panels.filter((d) => d.fixed !== !0).length
    );
    function X(d) {
      return !a.movable || W.value < 1 || a.panels.length < 2 ? !1 : o.value.get(d)?.fixed !== !0;
    }
    function ge(d, v) {
      const _ = u.value;
      !d || !_ || d === _ || (s.value = d, v && r("panel-move", v));
    }
    function ve(d, v, _) {
      if (d.width <= 0 || d.height <= 0) return "center";
      const R = (v - d.left) / d.width, D = (_ - d.top) / d.height, H = 0.3;
      return R > H && R < 1 - H && D > H && D < 1 - H ? "center" : [
        { edge: "left", distance: R },
        { edge: "right", distance: 1 - R },
        { edge: "top", distance: D },
        { edge: "bottom", distance: 1 - D }
      ].reduce(
        (pe, U) => U.distance < pe.distance ? U : pe
      ).edge;
    }
    function Ne(d, v) {
      const _ = [...d.querySelectorAll(".dc-tab")], R = _.findIndex((D) => {
        const H = D.getBoundingClientRect();
        return v < H.left + H.width / 2;
      });
      return R === -1 ? _.length : R;
    }
    function q(d, v, _) {
      for (const { panels: R, element: D } of T().reverse()) {
        const H = D.getBoundingClientRect();
        if (d < H.left || d > H.right || v < H.top || v > H.bottom) continue;
        const me = R.find((ce) => ce !== _), pe = D.querySelector(".dc-pane__tabs"), U = pe?.getBoundingClientRect();
        if (pe && U && v >= U.top && v <= U.bottom)
          return me ? { panel: me, edge: "center", index: Ne(pe, d) } : null;
        const ne = D.querySelector(":scope > .dc-pane__space");
        if (ne) {
          const ce = ne.getBoundingClientRect();
          if (d >= ce.left && d <= ce.right && v >= ce.top && v <= ce.bottom) continue;
        }
        return me ? { panel: me, edge: ve(H, d, v) } : null;
      }
      return se(d, v, _) ?? J(d, v);
    }
    function G() {
      const d = S.value;
      return d ? [...d.querySelectorAll(".dc-window__desktop")].filter((v) => v.closest(".dc-window") === d).reverse() : [];
    }
    function se(d, v, _) {
      const R = u.value;
      if (!R) return null;
      for (const D of G()) {
        const H = D.getBoundingClientRect();
        if (d < H.left || d > H.right || v < H.top || v > H.bottom) continue;
        const me = fe(D), pe = me.flatMap((_e) => _e.panels).find((_e) => _e !== _);
        if (!pe && me.length > 0) return null;
        const U = Oe(R, _)?.rect, ne = ya(
          {
            x: d - H.left - 24,
            y: v - H.top - 12,
            w: U?.w ?? xt.w,
            h: U?.h ?? xt.h
          },
          { w: D.clientWidth, h: D.clientHeight },
          a.minPanelSize
        );
        if (pe) return { panel: pe, edge: "float", rect: ne };
        const ce = ie(D);
        return ce ? { panel: "", space: ce, edge: "float", rect: ne } : null;
      }
      return null;
    }
    function ie(d) {
      const v = d.closest(".dc-space")?.getAttribute("data-dc-path");
      return v == null ? null : v === "" ? [] : v.split("/").map(Number);
    }
    function I() {
      const d = S.value;
      return d ? [...d.querySelectorAll(".dc-space")].filter((v) => v.closest(".dc-window") === d).filter((v) => !v.querySelector(".dc-pane")).reverse().flatMap((v) => {
        const _ = ie(v);
        return _ ? [{ element: v, path: _ }] : [];
      }) : [];
    }
    function J(d, v) {
      for (const { element: _, path: R } of I()) {
        if (_.dataset.dcSpace === "desktop") continue;
        const D = _.getBoundingClientRect();
        if (!(d < D.left || d > D.right || v < D.top || v > D.bottom))
          return { panel: "", space: R, edge: "center" };
      }
      return null;
    }
    function fe(d) {
      return C().filter(
        (v) => v.element.closest(".dc-window__desktop") === d
      );
    }
    let qe = null;
    const nt = (d) => d.altKey;
    function at(d, v) {
      if (!X(d) || b.value || g.value || v.button !== 0) return;
      const _ = v.clientX, R = v.clientY;
      let D = !1, H = nt(v);
      const me = () => {
        const ke = M.value;
        ke && (w.value = H ? se(ke.x, ke.y, d) : q(ke.x, ke.y, d));
      }, pe = (ke) => {
        if (!D) {
          if (Math.hypot(ke.clientX - _, ke.clientY - R) < 4) return;
          D = !0, b.value = d, $.value = null;
        }
        H = nt(ke), y.value = !H, M.value = { x: ke.clientX, y: ke.clientY }, me();
      }, U = (ke) => {
        nt(ke) !== H && (H = !H, y.value = !H, D && me());
      }, ne = (ke) => {
        qe?.();
        const ue = w.value, Fe = u.value;
        if (ke && D && ue && Fe) {
          const pt = ue.space ? Ur(Fe, d, ue.space, ue.rect) : ue.edge === "float" && ue.rect ? jr(Fe, d, ue.panel, ue.rect) : xn(Fe, d, ue.panel, ue.edge, ue.index);
          ge(pt, {
            panel: d,
            target: ue.panel,
            edge: ue.edge,
            ...ue.space === void 0 ? {} : { space: ue.space },
            ...ue.index === void 0 ? {} : { index: ue.index },
            ...ue.rect === void 0 ? {} : { rect: ue.rect }
          });
        }
        b.value = null, w.value = null, M.value = null, y.value = !0;
      }, ce = () => ne(!0), _e = () => ne(!1), Se = (ke) => {
        if (ke.key === "Escape") {
          ne(!1);
          return;
        }
        U(ke);
      };
      qe = () => {
        window.removeEventListener("pointermove", pe), window.removeEventListener("pointerup", ce), window.removeEventListener("pointercancel", _e), window.removeEventListener("keydown", Se), window.removeEventListener("keyup", U), qe = null;
      }, window.addEventListener("pointermove", pe), window.addEventListener("pointerup", ce), window.addEventListener("pointercancel", _e), window.addEventListener("keydown", Se), window.addEventListener("keyup", U);
    }
    Ie(() => qe?.());
    let Ge = null;
    function Ve(d) {
      const v = S.value;
      return v ? [...v.querySelectorAll(
        `.dc-float[data-dc-path="${d.join("/")}"]`
      )].find((D) => D.closest(".dc-window") === v)?.parentElement ?? null : null;
    }
    function Ye(d) {
      const v = u.value;
      return v ? Fa(v, d) : null;
    }
    function F(d) {
      const v = u.value;
      if (!v) return;
      const _ = Qt(v, d);
      _ !== v && (s.value = _);
    }
    function j(d) {
      const v = Ye(d);
      v && F(v);
    }
    function ae(d) {
      const v = u.value, _ = v ? Oe(v, d) : null;
      return _ !== null && ht(_);
    }
    function N(d) {
      const v = u.value, _ = v ? Oe(v, d) : null;
      return _ !== null && bt(_);
    }
    function Q(d) {
      const v = u.value, _ = v ? kt(v, d) : null;
      return _ ? ze(_.node) : "";
    }
    function ee(d) {
      const v = u.value, _ = v ? kt(v, d) : null;
      if (!v || !_) return;
      const R = ze(_.node);
      if (o.value.get(R)?.fixed === !0) return;
      const D = !bt(_);
      let H = Jf(v, d, D);
      H !== v && (D || (H = Qt(H, d)), s.value = H, r("frame-minimize", { panel: R, minimized: D }));
    }
    function Re(d) {
      const v = Ye(d);
      v && ee(v);
    }
    function Be(d) {
      const v = u.value, _ = v ? kt(v, d) : null;
      if (!v || !_) return;
      const R = ze(_.node);
      if (o.value.get(R)?.fixed === !0) return;
      const D = !ht(_);
      let H = Zf(v, d, D);
      H !== v && (D && (H = Qt(H, d)), s.value = H, r("frame-maximize", { panel: R, maximized: D }));
    }
    function Kt(d) {
      const v = Ye(d);
      v && Be(v);
    }
    function yr(d, v, _) {
      const R = u.value, D = R ? kt(R, d) : null;
      if (!R || !D || v.button !== 0 || b.value || g.value) return;
      const H = ze(D.node);
      if (o.value.get(H)?.fixed === !0 || ht(D) || bt(D) || (_ === "move" ? !a.movable : !a.resizable)) return;
      const me = Ve(d), pe = ep(R, d);
      F(d);
      const U = { w: me?.clientWidth ?? 0, h: me?.clientHeight ?? 0 }, ne = { ...D.rect }, ce = v.clientX, _e = v.clientY, Se = a.minPanelSize;
      g.value = H;
      const ke = (Ke) => {
        const ct = u.value;
        if (!ct) return;
        const Wt = Wr(ct, pe, ya(Ke, U, Se));
        Wt !== ct && (s.value = Wt);
      }, ue = (Ke) => {
        Ke.preventDefault();
        const ct = Ke.clientX - ce, Wt = Ke.clientY - _e;
        ke(
          _ === "move" ? { ...ne, x: ne.x + ct, y: ne.y + Wt } : Kr(ne, _, ct, Wt, Se)
        );
      }, Fe = (Ke) => {
        if (Ge?.(), g.value = null, !Ke) {
          ke(ne);
          return;
        }
        const ct = u.value ? kt(u.value, pe) : null;
        ct && r("frame-change", { panel: Q(pe), rect: ct.rect });
      }, pt = () => Fe(!0), _t = () => Fe(!1), wt = (Ke) => {
        Ke.key === "Escape" && Fe(!1);
      };
      Ge = () => {
        window.removeEventListener("pointermove", ue), window.removeEventListener("pointerup", pt), window.removeEventListener("pointercancel", _t), window.removeEventListener("keydown", wt), Ge = null;
      }, window.addEventListener("pointermove", ue), window.addEventListener("pointerup", pt), window.addEventListener("pointercancel", _t), window.addEventListener("keydown", wt);
    }
    function $o(d, v, _) {
      const R = Ye(d);
      R && yr(R, v, _);
    }
    function xo(d, v, _ = !1) {
      const R = u.value, D = Ye(d), H = R && D ? kt(R, D) : null;
      if (!R || !D || !H || o.value.get(d)?.fixed === !0 || (_ ? !a.resizable : !a.movable)) return;
      if (ht(H) || bt(H)) {
        k.value = `${rt(d)} is ${ht(H) ? "maximized" : "minimized"}, so it cannot be moved.`;
        return;
      }
      const me = v === "left" ? -Sn : v === "right" ? Sn : 0, pe = v === "up" ? -Sn : v === "down" ? Sn : 0, U = Ve(D), ne = { w: U?.clientWidth ?? 0, h: U?.clientHeight ?? 0 }, ce = _ ? Kr(H.rect, "se", me, pe, a.minPanelSize) : { ...H.rect, x: H.rect.x + me, y: H.rect.y + pe }, _e = Wr(R, D, ya(ce, ne, a.minPanelSize));
      if (_e === R) {
        k.value = _ ? `${rt(d)} cannot be resized further.` : `${rt(d)} cannot move ${v}.`;
        return;
      }
      s.value = _e;
      const Se = kt(_e, D);
      Se && (r("frame-change", { panel: d, rect: Se.rect }), k.value = _ ? `${rt(d)} resized to ${Se.rect.w} by ${Se.rect.h}.` : `${rt(d)} moved to ${Se.rect.x}, ${Se.rect.y}.`);
    }
    Ie(() => Ge?.());
    function So(d, v) {
      const _ = A(d), R = _?.element.getBoundingClientRect();
      if (!_ || !R) return null;
      const D = v === "left" || v === "right", H = (U) => {
        if (!(D ? U.bottom > R.top + 1 && U.top < R.bottom - 1 : U.right > R.left + 1 && U.left < R.right - 1)) return null;
        const ce = v === "left" ? R.left - U.right : v === "right" ? U.left - R.right : v === "up" ? R.top - U.bottom : U.top - R.bottom;
        return ce < -1 ? null : ce;
      }, me = [];
      for (const U of C()) {
        if (U === _ || U.element === _.element) continue;
        const ne = H(U.element.getBoundingClientRect());
        if (ne === null) continue;
        const ce = U.panels.find((_e) => _e !== d);
        ce && me.push({ to: { panel: ce }, distance: ne });
      }
      for (const { element: U, path: ne } of I()) {
        const ce = H(U.getBoundingClientRect());
        ce !== null && me.push({ to: { space: ne }, distance: ce });
      }
      return me.reduce(
        (U, ne) => U && U.distance <= ne.distance ? U : ne,
        null
      )?.to ?? null;
    }
    function Mo(d) {
      const v = u.value ? Oe(u.value, d) !== null : !1;
      if (!v && !X(d)) return;
      $.value = $.value === d ? null : d;
      const _ = rt(d);
      if (!$.value) {
        k.value = `${_}: move mode off.`;
        return;
      }
      k.value = v ? `${_}: move mode on. Arrow keys move the window, shift and an arrow resize it, Escape leaves move mode.` : `${_}: move mode on. Arrow keys move the panel, shift and an arrow make it a tab of the panel that way, Escape leaves move mode.`;
    }
    const rt = (d) => o.value.get(d)?.title ?? d, Co = {
      left: "left",
      right: "right",
      up: "top",
      down: "bottom"
    };
    function Eo(d, v, _ = !1) {
      if (!X(d)) return;
      const R = u.value;
      if (!R) return;
      const D = rt(d), H = zt(R, d);
      if (!_ && H && (v === "left" || v === "right") && H.panels.length > 1) {
        const _e = H.panels.indexOf(d), Se = v === "left" ? _e - 1 : _e + 1;
        if (Se >= 0 && Se < H.panels.length) {
          ge(Zt(R, d, Se), { panel: d, target: d, edge: "center", index: Se }), k.value = `${D} moved ${v}, now tab ${Se + 1} of ${H.panels.length}.`, ia(d);
          return;
        }
      }
      const pe = So(d, v);
      if (!pe || pe.panel !== void 0 && !X(pe.panel)) {
        k.value = `${D} cannot move ${v}.`;
        return;
      }
      const U = Co[v];
      if (pe.space) {
        const _e = pe.space, Se = je(R, _e), ke = Oe(R, d)?.rect, ue = { ...xt, ...ke ? { w: ke.w, h: ke.h } : {} };
        ge(Ur(R, d, _e, ue), { panel: d, target: "", space: _e, edge: U }), k.value = `${D} moved ${v}, into ${Se ? Dt(Se) : "the space"}.`, ia(d);
        return;
      }
      const ne = pe.panel, ce = H?.panels.length === 1 && zt(R, ne)?.panels.length === 1;
      _ ? (ge(xn(R, d, ne, "center"), {
        panel: d,
        target: ne,
        edge: "center"
      }), k.value = `${D} joined ${rt(ne)} as a tab.`) : ce ? (ge(En(R, d, ne), { panel: d, target: ne, edge: U }), k.value = `${D} moved ${v}, trading places with ${rt(ne)}.`) : (ge(xn(R, d, ne, U), { panel: d, target: ne, edge: U }), k.value = `${D} moved ${v}, beside ${rt(ne)}.`), ia(d);
    }
    function ia(d) {
      yt(() => {
        A(d)?.element.querySelector(".dc-pane__grip")?.focus();
      });
    }
    function Po(d, v) {
      const _ = u.value;
      _ && (s.value = Pn(_, d, v));
    }
    function ca(d) {
      const v = u.value;
      if (!v) return;
      const _ = Nt(v, d);
      _ !== v && (s.value = _, r("tab-select", { panel: d }));
    }
    function ua(d) {
      return o.value.get(d)?.closable ?? a.closable;
    }
    function _r(d) {
      ua(d) && r("panel-close", d);
    }
    const da = V(/* @__PURE__ */ new Map());
    let Ao = 0;
    function To(d, v) {
      const _ = Ao += 1;
      return da.value.set(_, { panel: d, items: v }), () => {
        da.value.delete(_);
      };
    }
    function Lo(d) {
      const v = [];
      for (const _ of da.value.values())
        _.panel() === d && v.push(..._.items());
      return v;
    }
    function wr(d) {
      const v = d.filter((_) => _.items.length > 0);
      return v.length < 2 ? v.flatMap((_) => _.items) : v.flatMap((_) => [
        { id: _.id, heading: !0, label: _.title },
        ..._.items
      ]);
    }
    const kr = (d) => d.title || "These tabs";
    function Oo(d, v) {
      const _ = v.id, R = zt(d, _), D = (R?.panels.length ?? 0) > 1, H = R?.fixedView === !0, me = (ce) => ({
        action: () => {
          ce !== d && (s.value = ce);
        }
      }), pe = [], U = [], ne = v.views ?? [];
      if (ne.length > 1 && !H) {
        const ce = E(_);
        pe.push({
          id: "view",
          label: "View",
          items: ne.map((_e) => ({
            id: `view-${_e.key}`,
            label: _e.label,
            checked: _e.key === ce,
            action: () => K(_, _e.key)
          }))
        });
      }
      return D && !H && U.push(
        { id: "show-row", label: "Row", checked: !1, ...me(Gr(d, _, "row")) },
        {
          id: "show-column",
          label: "Column",
          checked: !1,
          ...me(Gr(d, _, "column"))
        },
        // Already true, and nothing to collapse: these panes are tabs. Ticked
        // and choosable all the same — collapsing a strip into a strip hands
        // back the tree it was given, so it is the no-op it looks like.
        {
          id: "show-tabs",
          label: "Tabs",
          checked: !0,
          ...me(rp(d, _))
        },
        {
          id: "show-desktop",
          label: "Desktop",
          checked: !1,
          ...me(sp(d, _))
        }
      ), D && R && (U.length && U.push({ separator: !0 }), U.push(...fa(R, _))), { panel: pe, tabs: U, tabsTitle: R ? kr(R) : "" };
    }
    function fa(d, v) {
      const _ = Tt(d), R = (D) => {
        const H = d.panels[(_ + D + d.panels.length) % d.panels.length];
        return (H === void 0 ? "" : ze(H)) || v;
      };
      return [
        { id: "next-tab", label: "Next tab", action: () => ca(R(1)) },
        { id: "previous-tab", label: "Previous tab", action: () => ca(R(-1)) },
        ...Ro(d)
      ];
    }
    function Ro(d) {
      const v = Ue(d).filter(ua);
      return v.length ? [
        { separator: !0 },
        { id: "close-all", label: "Close all", action: () => v.forEach(_r) }
      ] : [];
    }
    function kn(d) {
      return d.title ? d.title : Z(d) ? d.panels.length > 1 ? "these tabs" : "the strip" : Dt(d);
    }
    function br(d) {
      if (!d || le(d) || d.fixedView === !0 || !d.title && d.headless !== !0 || tt(d)) return null;
      const v = mo(d);
      return v && v.fixedView !== !0 ? v : null;
    }
    function $r(d) {
      const v = u.value;
      if (!a.menu || !v) return [];
      const _ = je(v, d);
      if (!_ || Z(_)) return [];
      if (_.fixedView) return [];
      const R = le(_) ? "desktop" : _.direction, D = (ue, Fe, pt) => ({
        id: `show-${ue}`,
        label: Fe,
        checked: R === ue,
        action: () => {
          const _t = u.value, wt = pt();
          !_t || wt === _ || (s.value = Hn(Me(lt(_t, d, wt))));
        }
      }), H = () => {
        const ue = co(_, zo(_));
        if (Z(ue) && ue.panels.length === 0) return _;
        const Fe = Z(ue) && ue.panels.length === 1 ? ue.panels[0] : void 0;
        return Fe !== void 0 && $e(Fe) ? _ : ue;
      }, me = (ue) => () => le(_) ? ho(_, ue) : _.direction === ue ? _ : { ..._, direction: ue }, pe = d.slice(0, -1), U = d.length > 0 ? je(v, pe) : null, ne = U && Z(U) && U.panels.length > 1 ? U : null, ce = U && br(U) === _ ? U : null, _e = br(_), Se = _.title || "this space", ke = (ue, Fe, pt, _t, wt) => ({
        id: ue,
        label: wt,
        action: () => {
          const Ke = u.value;
          Ke && (s.value = Hn(Me(lt(Ke, Fe, cp(pt, _t)))));
        }
      });
      return wr([
        {
          id: "about-space",
          /*
           * Its own name, or what it is rather than how it is shown: `spaceTitle`
           * would answer "Row" for an unnamed row, which is the item directly
           * under it and the one already ticked.
           */
          title: _.title || "This space",
          items: [
            D("row", "Row", me("row")),
            D("column", "Column", me("column")),
            // Everything in this space in one strip: the panes as tabs, and a
            // desktop among them as a tab of its own, keeping the windows on it.
            D("tabs", "Tabs", () => H()),
            D("desktop", "Desktop", () => le(_) ? _ : vo(_))
          ]
        },
        {
          id: "about-around",
          title: _e ? `Around ${kn(_e)}` : "",
          items: _e ? [
            // Keeping this space's bar drops the one inside, so it is offered
            // only where the space inside has no name to be dropped with it.
            ..._e.title ? [] : [ke("merge-around-keep-this", d, _, "outer", `Keep ${Se}`)],
            ..._.title ? [] : [ke("merge-around-keep-that", d, _, "inner", `Keep ${kn(_e)}`)]
          ] : []
        },
        {
          id: "about-inside",
          title: ce ? `Inside ${kn(ce)}` : "",
          items: ce ? [
            ..._.title ? [] : [ke("merge-inside-keep-that", pe, ce, "outer", `Keep ${kn(ce)}`)],
            ...ce.title ? [] : [ke("merge-inside-keep-this", pe, ce, "inner", `Keep ${Se}`)]
          ] : []
        },
        {
          id: "about-tabs",
          title: ne ? kr(ne) : "",
          items: ne ? fa(ne, ze(_)) : []
        }
      ]);
    }
    function zo(d) {
      const v = x.value;
      return v && ye(d, v) ? v : void 0;
    }
    function Io(d) {
      const v = u.value, _ = o.value.get(d);
      if (!v || !_) return [];
      const R = a.menu ? Oo(v, _) : null, D = Lo(d);
      D.length && R?.panel.length && D.push({ separator: !0 }), R && D.push(...R.panel);
      const H = Fo(_);
      H && (D.length && D.push({ separator: !0 }), D.push(H));
      const me = wr([
        { id: "about-panel", title: _.title, items: D },
        { id: "about-tabs", title: R?.tabsTitle ?? "", items: R?.tabs ?? [] }
      ]);
      return a.paneMenu ? a.paneMenu(_, me) : me;
    }
    const No = p(() => {
      const d = u.value;
      return d ? Z(d) ? Bo([]) : $r([]) : [];
    });
    function Bo(d) {
      const v = u.value, _ = v ? je(v, d) : null;
      if (!a.menu || !_ || !Z(_) || _.panels.length < 2) return [];
      const R = (H, me, pe) => ({
        id: `show-${H}`,
        label: me,
        checked: H === "tabs",
        action: () => {
          const U = u.value;
          if (!U) return;
          const ne = pe(U);
          ne !== U && (s.value = ne);
        }
      }), D = _.fixedView ? [] : [
        R("row", "Row", (H) => Yr(H, d, "row")),
        R("column", "Column", (H) => Yr(H, d, "column")),
        // Already true: these are tabs, and a strip collapsed is that strip.
        R("tabs", "Tabs", (H) => H),
        R("desktop", "Desktop", (H) => op(H, d))
      ];
      return D.length && D.push({ separator: !0 }), D.push(...fa(_, ze(_))), D;
    }
    function Fo(d) {
      const v = a.popOut?.(d);
      return !v || a.solo && u.value && Ue(u.value).length <= 1 ? null : {
        id: "pop-out",
        label: "Pop out to new window",
        action: () => {
          const _ = S.value?.querySelector(`.dc-pane[data-dc-panel="${CSS.escape(d.id)}"]`);
          mp(v, hp(_)) && r("panel-pop-out", { panel: d.id, href: v });
        }
      };
    }
    function Do(d, v) {
      return i[`${d}-${v}`] ?? i[d];
    }
    function xr(d, v, _, R) {
      return Do(d, v.id)?.({ panel: v, view: _, active: R });
    }
    fp({
      panelFor: (d) => o.value.get(d) ?? null,
      viewFor: E,
      setView: K,
      movable: p(() => a.movable),
      resizable: p(() => a.resizable),
      minPanelSize: p(() => a.minPanelSize),
      spaceNames: p(() => a.spaceNames),
      rootBar: p(() => a.rootBar),
      focused: x,
      dragging: b,
      dropTarget: w,
      moving: $,
      framing: g,
      canMove: X,
      focus(d) {
        x.value !== d && (x.value = d, r("panel-activate", d));
      },
      selectPanel: ca,
      beginDrag: at,
      toggleMoveMode: Mo,
      nudge: Eo,
      setSizes: Po,
      frameOf: (d) => u.value ? Oe(u.value, d) : null,
      beginFrameDrag: $o,
      nudgeFrame: xo,
      raise: j,
      maximized: ae,
      toggleMaximize: Kt,
      minimized: N,
      toggleMinimize: Re,
      beginFrameDragAt: yr,
      raiseAt: F,
      toggleMaximizeAt: Be,
      toggleMinimizeAt: ee,
      menuFor: Io,
      spaceMenu: $r,
      registerMenu: To,
      closable: ua,
      close: _r,
      renderContent: (d, v, _) => xr("panel", d, v, _),
      renderActions: (d, v, _) => xr("actions", d, v, _),
      layout: u
    });
    const Ho = p(() => {
      if (!(!a.accent && !a.tokens))
        return { ...a.tokens, ...a.accent ? { "--dc-accent": a.accent } : {} };
    }), qo = () => {
      const d = b.value, v = M.value;
      return !d || !v ? null : Qo(
        "div",
        {
          class: "dc-window__ghost",
          style: { left: `${v.x}px`, top: `${v.y}px` },
          "aria-hidden": "true"
        },
        o.value.get(d)?.title ?? d
      );
    };
    return t({
      /** The layout as rendered, reconciled against the current panels. */
      layout: u,
      /** Moves a panel programmatically — the same operation a drag performs. */
      move(d, v, _, R) {
        const D = u.value;
        D && ge(xn(D, d, v, _, R), {
          panel: d,
          target: v,
          edge: _,
          ...R === void 0 ? {} : { index: R }
        });
      },
      /** Brings a panel's tab to the top of its group. */
      select(d) {
        const v = u.value;
        v && (s.value = Nt(v, d));
      },
      /** Lifts a panel onto the float holding `near`, as a window of its own. */
      float(d, v, _) {
        const R = u.value;
        R && ge(jr(R, d, v, _), {
          panel: d,
          target: v,
          edge: "float",
          rect: _
        });
      },
      /** Puts a floating frame somewhere else, or makes it another size. */
      setRect(d, v) {
        const _ = u.value;
        if (!_) return;
        const R = Yf(_, d, v);
        if (R === _) return;
        s.value = R;
        const D = Oe(R, d);
        D && r("frame-change", { panel: d, rect: D.rect });
      },
      /**
       * Puts a panel on one of its views, the way its menu would — the way a pane
       * whose space fixed its view, or took its bar away, is switched at all.
       */
      setView: K,
      /**
       * The menu of the space at the root: how the whole window is shown. For a
       * host's menu bar, when `rootBar` takes away the bar it was on.
       */
      rootMenu: No,
      /** Brings a floating frame to the front of its stack. */
      raise: j,
      /** Fills the float with a window, or puts it back where it was. */
      toggleMaximize: Kt,
      /** Rolls a window up to its title bar, or unrolls it. */
      toggleMinimize: Re
    }), (d, v) => (f(), h("div", {
      ref_key: "root",
      ref: S,
      class: "dc-shell dc-window",
      "data-dc-theme": e.theme,
      "data-dc-dragging": b.value ? "true" : "false",
      "data-dc-docking": y.value ? "true" : "false",
      style: xe(Ho.value)
    }, [
      u.value ? (f(), Y(dv, {
        key: 0,
        node: u.value,
        path: []
      }, null, 8, ["node"])) : (f(), h("p", pv, " This window has no panels. ")),
      de(qo),
      P("p", vv, B(k.value), 1)
    ], 12, fv));
  }
}), mv = /* @__PURE__ */ oe(hv, [["__scopeId", "data-v-02019f28"]]);
function ch(e, t) {
  const n = V(!1);
  let a = null, r = !1, s = 0;
  const l = () => {
    s++, n.value = !1, a !== null && (clearTimeout(a), a = null);
  };
  function i(u) {
    a = setTimeout(() => void o(u), t);
  }
  async function o(u) {
    if (r || u !== s) return;
    let m;
    try {
      m = await e();
    } catch {
      m = !1;
    }
    r || u !== s || (m ? i(u) : l());
  }
  const c = () => {
    n.value || (n.value = !0, o(++s));
  };
  return Ht(() => {
    r = !0, l();
  }, !0), { start: c, stop: l, polling: n };
}
function uh(e, t = {}) {
  const n = t.key ?? ((s) => JSON.stringify(s)), a = ft();
  let r = null;
  return Zo(() => {
    const s = e(), l = n(s);
    l !== r && (r = l, a.value = s);
  }), a;
}
const gv = (e) => Math.round(e * 1e3) / 1e3;
function wa(e, t) {
  return e.title && (t.t = e.title), e.headless && (t.h = !0), e.fixedView && (t.v = !0), t;
}
function yv(e) {
  return [Math.round(e.x), Math.round(e.y), Math.round(e.w), Math.round(e.h)];
}
function ka(e) {
  const t = { b: yv(e.rect) };
  return e.title && (t.t = e.title), e.maximized && (t.M = !0), e.minimized && (t.m = !0), t;
}
function _v(e) {
  if (e.kind !== "group" || e.panels.length !== 1) return null;
  const t = e.panels[0];
  return typeof t != "string" || e.title || e.headless || e.fixedView || e.places ? null : t;
}
function Ha(e) {
  const t = _v(e);
  return t !== null ? t : _o(e);
}
function _o(e) {
  if (e.kind === "group") {
    const n = { g: e.panels.map((a) => typeof a == "string" ? a : _o(a)) };
    return e.active !== void 0 && e.active !== e.panels[0] && (n.a = e.active), e.places && (n.p = e.places.map(ka)), wa(e, n);
  }
  if (e.kind === "split") {
    const n = { [e.direction === "row" ? "r" : "c"]: e.children.map(Ha) };
    return e.sizes && (n.z = e.sizes.map(gv)), e.places && (n.p = e.places.map(ka)), wa(e, n);
  }
  const t = {
    f: e.frames.map((n) => ({ n: Ha(n.node), ...ka(n) }))
  };
  return wa(e, t);
}
class wo extends Error {
}
const Le = () => {
  throw new wo();
}, qa = (e) => typeof e == "object" && e !== null && !Array.isArray(e), Rt = (e) => Array.isArray(e) ? e : Le(), mr = (e) => e === void 0 ? void 0 : typeof e == "string" ? e : Le(), ko = (e) => Rt(e).map((t) => typeof t == "number" && Number.isFinite(t) ? t : Le());
function wv(e) {
  const [t, n, a, r] = ko(e);
  return r === void 0 && Le(), { x: t, y: n, w: a, h: r };
}
function ba(e) {
  if (!qa(e)) return Le();
  const t = { rect: wv(e.b) }, n = mr(e.t);
  return n && (t.title = n), e.M === !0 && (t.maximized = !0), e.m === !0 && (t.minimized = !0), t;
}
function $a(e, t) {
  const n = mr(e.t);
  return n && (t.title = n), e.h === !0 && (t.headless = !0), e.v === !0 && (t.fixedView = !0), t;
}
function An(e) {
  if (typeof e == "string") return { kind: "group", panels: [e] };
  if (!qa(e)) return Le();
  if (e.g !== void 0) {
    const n = Rt(e.g).map((s) => typeof s == "string" ? s : An(s));
    n.length === 0 && Le();
    const a = { kind: "group", panels: n }, r = mr(e.a);
    return r !== void 0 && (a.active = r), e.p !== void 0 && (a.places = Rt(e.p).map(ba)), $a(e, a);
  }
  const t = e.r !== void 0 ? "row" : e.c !== void 0 ? "column" : null;
  if (t) {
    const n = Rt(t === "row" ? e.r : e.c).map(An), a = { kind: "split", direction: t, children: n };
    return e.z !== void 0 && (a.sizes = ko(e.z)), e.p !== void 0 && (a.places = Rt(e.p).map(ba)), $a(e, a);
  }
  if (e.f !== void 0) {
    const a = { kind: "float", frames: Rt(e.f).map((r) => !qa(r) || r.n === void 0 ? Le() : { node: An(r.n), ...ba(r) }) };
    return $a(e, a);
  }
  return Le();
}
const bo = /[ '!:(),*@$]/, kv = /^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][-+]?\d+)?$/;
function Zr(e) {
  return e !== "" && !bo.test(e) && !/^[-\d]/.test(e) ? e : `'${e.replace(/[!']/g, (n) => `!${n}`)}'`;
}
function Va(e) {
  return e === null ? "!n" : e === !0 ? "!t" : e === !1 ? "!f" : typeof e == "number" ? Number.isFinite(e) ? String(e) : "!n" : typeof e == "string" ? Zr(e) : Array.isArray(e) ? `!(${e.map(Va).join(",")})` : `(${Object.entries(e).map(([t, n]) => `${Zr(t)}:${Va(n)}`).join(",")})`;
}
function bv(e) {
  let t = 0;
  const n = () => e[t], a = (i) => e[t++] === i ? void 0 : Le(), r = () => {
    if (n() === "'") {
      t++;
      let o = "";
      for (; ; ) {
        const c = e[t++];
        if (c === void 0) return Le();
        if (c === "'") return o;
        if (c === "!") {
          const u = e[t++];
          u !== "!" && u !== "'" && Le(), o += u;
        } else o += c;
      }
    }
    const i = t;
    for (; t < e.length && !bo.test(e[t]); ) t++;
    return t === i && Le(), e.slice(i, t);
  }, s = () => {
    const i = n();
    if (i === "(") {
      t++;
      const c = {};
      if (n() === ")")
        return t++, c;
      for (; ; ) {
        const u = r();
        a(":"), c[u] = s();
        const m = e[t++];
        if (m === ")") return c;
        m !== "," && Le();
      }
    }
    if (i === "!") {
      t++;
      const c = e[t++];
      if (c === "t") return !0;
      if (c === "f") return !1;
      if (c === "n") return null;
      if (c !== "(") return Le();
      const u = [];
      if (n() === ")")
        return t++, u;
      for (; ; ) {
        u.push(s());
        const m = e[t++];
        if (m === ")") return u;
        m !== "," && Le();
      }
    }
    if (i === "'") return r();
    const o = r();
    return kv.test(o) ? Number(o) : o;
  }, l = s();
  return t !== e.length && Le(), l;
}
function xa(e) {
  return Va(Ha(e));
}
function $v(e) {
  try {
    return An(bv(e));
  } catch (t) {
    if (t instanceof wo) return null;
    throw t;
  }
}
function Sa(e, t) {
  for (const n of e.replace(/^[?]/, "").split("&")) {
    const a = n.indexOf("="), r = a === -1 ? n : n.slice(0, a);
    if (gr(r) === t) return a === -1 ? "" : n.slice(a + 1);
  }
  return null;
}
function Ma(e, t, n) {
  const a = e.replace(/^[?]/, "").split("&").filter(Boolean), r = a.findIndex((l) => {
    const i = l.indexOf("=");
    return gr(i === -1 ? l : l.slice(0, i)) === t;
  }), s = n === null ? null : `${encodeURIComponent(t)}=${n}`;
  return r === -1 ? s && a.push(s) : s ? a[r] = s : a.splice(r, 1), a.length ? `?${a.join("&")}` : "";
}
function gr(e) {
  try {
    return decodeURIComponent(e.replace(/\+/g, " "));
  } catch {
    return e;
  }
}
const xv = [
  [/%2C/g, ","],
  [/%3A/g, ":"],
  [/%2F/g, "/"],
  [/%40/g, "@"],
  [/%24/g, "$"],
  [/%20/g, "+"]
], Jr = (e) => {
  let t = encodeURIComponent(e);
  for (const [n, a] of xv) t = t.replace(n, a);
  return t;
};
function dh(e, t) {
  const { adapter: n } = t, a = t.param ?? "w", r = t.soloParam ?? "solo", s = t.delay ?? 200, l = () => ut(t.home) ?? null;
  let i = Sa(n.search.value, a), o = null;
  const c = () => {
    o !== null && clearTimeout(o), o = null;
  }, u = (w) => w === null ? l() : $v(gr(w)) ?? l(), m = () => {
    c();
    const w = e.value, y = l(), $ = w ? xa(w) : null, g = $ === null || y && $ === xa(y) ? null : Jr($);
    i = g;
    const M = Ma(n.search.value, a, g);
    M !== n.search.value && n.replace(M);
  }, x = u(i);
  return x && (e.value = x), be(e, () => {
    c(), o = setTimeout(m, s);
  }), be(n.search, (w) => {
    const y = Sa(w, a);
    if (y === i) return;
    c(), i = y;
    const $ = u(y);
    $ && (e.value = $);
  }), qn() && Ht(() => o !== null ? m() : void 0), {
    flush: () => o !== null ? m() : void 0,
    popOutHref: (w) => {
      let y = Ma(n.search.value, a, Jr(xa(jf(Ze(w)))));
      return y = Ma(y, r, "1"), n.href ? n.href(y) : `${n.path.value}${y}`;
    },
    solo: p(() => Sa(n.search.value, r) !== null)
  };
}
function fh(e = {}) {
  return { key: "ordinal", kind: "ordinal", label: "#", width: "52px", ...e };
}
function ph(e = {}) {
  return { key: "status", role: "state", kind: "status", label: "State", width: "104px", ...e };
}
function vh(e = {}) {
  return { key: "tint", role: "tint", ...e };
}
function hh(e = {}) {
  return { key: "picture", role: "image", kind: "image", width: "56px", height: "40px", ...e };
}
function mh(e, t = {}) {
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
function gh(e, t = {}) {
  return {
    key: "secondary",
    role: "reference",
    label: e,
    mono: !0,
    muted: !0,
    truncate: !0,
    ...t
  };
}
function yh(e, t, n = {}) {
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
function _h(e, t, n = {}) {
  return { key: e, kind: "date", label: t, sort: e, width: "104px", mono: !0, muted: !0, ...n };
}
function wh(e = {}) {
  return {
    key: "entityLabel",
    label: "Entity",
    width: "130px",
    mono: !0,
    truncate: !0,
    class: "dc-table__entity",
    ...e
  };
}
function kh(e, t, n = {}) {
  return { key: e, label: t, truncate: !0, hideBelow: 900, ...n };
}
function bh(e, t, n, a = {}) {
  return {
    key: e,
    label: t,
    value: (r) => Object.entries(n).filter(([s]) => r.fields[s] === !0).map(([, s]) => s),
    muted: !0,
    truncate: !0,
    hideBelow: 1100,
    ...a
  };
}
function la(e) {
  return typeof e == "number" ? e : typeof e == "string" && e.trim() !== "" ? Number(e) : Number.NaN;
}
function $h(e) {
  const t = la(e);
  return Number.isFinite(t) && t > 0 ? dl(t) : it;
}
function xh(e) {
  const t = la(e);
  return Number.isFinite(t) && t > 0 ? fl(t) : it;
}
function Sh(e) {
  const t = la(e);
  return Number.isFinite(t) && t > 0 ? pl(t) : it;
}
function Mh(e) {
  const t = la(e);
  return Number.isFinite(t) ? vl(t) : it;
}
function Sv(e) {
  if (e <= 0) return 0;
  const t = 10 ** Math.floor(Math.log10(e));
  for (const n of [1, 2, 5])
    if (e <= n * t) return n * t;
  return 10 * t;
}
function Mv(e, t) {
  const n = /* @__PURE__ */ new Set();
  for (const a of e) {
    const r = a.fields[t];
    for (const s of Array.isArray(r) ? r : [r])
      typeof s == "string" && s && n.add(s);
  }
  return [...n].sort((a, r) => a.localeCompare(r));
}
function Cv(e, t) {
  let n = 0;
  for (const a of e) {
    const r = a.fields[t];
    typeof r == "number" && r > n && (n = r);
  }
  return n;
}
function Ch(e, t, n, a = {}) {
  return {
    kind: "chips",
    key: t,
    label: n,
    options: Mv(e, t),
    ...a.multiple ? { multiple: !0 } : {}
  };
}
function Eh(e, t, n) {
  return { kind: "range", key: t, label: n, min: 0, max: Sv(Cv(e, t)) };
}
function Ph(e, t, n) {
  return { kind: "toggle", key: e, label: t, text: n };
}
function Ah(e) {
  return e.filter((t) => t.kind === "chips" ? t.options.length > 1 : t.kind === "range" ? t.max > 0 : !0);
}
function Th(e = "", t = "/") {
  const n = V(De(e)), a = V(t), r = [`${a.value}${n.value}`];
  return {
    search: n,
    path: a,
    history: r,
    href(s, l) {
      return `${l ?? a.value}${De(s)}`;
    },
    push(s, l) {
      l !== void 0 && (a.value = l), n.value = De(s), r.push(`${a.value}${n.value}`);
    },
    replace(s, l) {
      l !== void 0 && (a.value = l), n.value = De(s), r[r.length - 1] = `${a.value}${n.value}`;
    }
  };
}
function es(e) {
  const t = e.indexOf("?");
  if (t === -1) return "";
  const n = e.slice(t), a = n.indexOf("#");
  return De(a === -1 ? n : n.slice(0, a));
}
function Lh(e) {
  const t = V(es(e.currentRoute.value.fullPath)), n = p(() => e.currentRoute.value.path), a = be(
    () => e.currentRoute.value.fullPath,
    (r) => {
      t.value = es(r);
    }
  );
  return {
    search: t,
    path: n,
    push: (r, s) => e.push(`${s ?? n.value}${De(r)}`),
    replace: (r, s) => e.replace(`${s ?? n.value}${De(r)}`),
    href: (r, s) => {
      const l = `${s ?? n.value}${De(r)}`;
      return e.resolve?.(l).href ?? l;
    },
    dispose: a
  };
}
function Oh(e, t, n = "/") {
  return (a) => {
    const r = a.params[t], s = Array.isArray(r) ? r.join("/") : r ?? "", l = a.query[Ct], i = typeof l == "string" ? l : "", o = `${e}="${s.replace(/"/g, "")}"`;
    return { path: n, query: { ...a.query, [Ct]: fn(i, o) } };
  };
}
function Rh(e, t = "/") {
  return (n) => ({ path: t, query: { ...n.query, [qt]: e } });
}
function zh(e) {
  const t = /* @__PURE__ */ new Map();
  for (const n of e) {
    const a = t.get(n.entityKey);
    a ? a.push(n) : t.set(n.entityKey, [n]);
  }
  return {
    query(n) {
      return ys(n, (a) => t.get(a.key) ?? [], {
        undatedLast: !0,
        zeroIsAll: !0
      });
    }
  };
}
function Ih(e, t) {
  return e.query({ ...t, limit: Number.MAX_SAFE_INTEGER, offset: 0 }).rows;
}
const Ev = {
  DataShell: Fd,
  ShellHeader: Ns,
  RecordActions: Fs,
  ResultsArea: Ys,
  SegmentedControl: tf,
  StatusPill: pn,
  WindowFrame: mv,
  WindowPane: yo,
  ListView: za,
  CardsView: qs,
  GridView: Vs,
  ImagesView: Ks,
  TableView: Us,
  LinksView: Ws,
  PreviewView: js,
  TypeCardsView: Gs
}, Nh = {
  install(e, t = {}) {
    const n = t.prefix ?? "";
    for (const [a, r] of Object.entries(Ev))
      e.component(`${n}${a}`, r);
    t.route && e.provide(as, t.route), (t.theme || t.accent || t.tokens) && ri({ theme: t.theme, accent: t.accent, tokens: t.tokens }, e);
  }
};
export {
  Dn as CASCADE_STEP,
  Ov as COLUMN_BREAKPOINTS,
  Lv as COLUMN_ROLES,
  qs as CardsView,
  Hr as ColumnCell,
  $f as CopyButton,
  nl as DEFAULT_ENTITY_VIEW,
  xt as DEFAULT_FRAME,
  Ea as DEFAULT_SORT,
  tl as DEFAULT_VIEW,
  hi as DRAFT_DELAY,
  Fd as DataShell,
  it as EMPTY_CELL,
  ws as ENTITY_ALL,
  Fn as ENTITY_TERM,
  sn as EXPRESSION_TERM,
  Vs as GridView,
  Nh as HeaderContentLayoutPlugin,
  Ks as ImagesView,
  Ws as LinksView,
  za as ListView,
  Lt as MINIMIZED_GAP,
  Js as MINIMIZED_HEIGHT,
  Ia as MINIMIZED_WIDTH,
  Zs as MIN_FRAME,
  Rn as MOCK_TINTS,
  Wv as MenuBar,
  or as MenuButton,
  ar as MenuList,
  vn as MetricDrill,
  hn as OpenMark,
  hr as PANE_CONTEXT_KEY,
  Za as PARAM_DIR,
  qt as PARAM_ENTITY,
  Ct as PARAM_EXPR,
  Xn as PARAM_PAGE,
  Qa as PARAM_SORT,
  Yn as PARAM_VIEW,
  Tv as PILL_TONES,
  Hf as POPOVER_FLIP_BELOW,
  Ff as POPOVER_GAP,
  Df as POPOVER_MARGIN,
  rr as PinStar,
  js as PreviewView,
  sr as QueryMark,
  Ut as RECORD_STATUSES,
  Ga as RESULT_FIELDS,
  as as ROUTE_ADAPTER_KEY,
  Fs as RecordActions,
  Ys as ResultsArea,
  As as SHELL_CONTEXT_KEY,
  Av as SHELL_THEMES,
  Bn as SHELL_THEME_KEY,
  mn as ScopeMark,
  tf as SegmentedControl,
  At as SelectTick,
  Kv as ShellCard,
  Gv as ShellCode,
  Xv as ShellDialog,
  ff as ShellFact,
  jv as ShellFacts,
  Ns as ShellHeader,
  Yv as ShellLog,
  Zv as ShellPopover,
  Qv as ShellToasts,
  Ra as StandingControl,
  Uv as StatusCounts,
  pn as StatusPill,
  Of as TOAST_ERROR_MS,
  Lf as TOAST_MS,
  Us as TableView,
  Gs as TypeCardsView,
  rs as VIEW_KINDS,
  al as VIEW_LABELS,
  vr as WINDOW_CONTEXT_KEY,
  mv as WindowFrame,
  yo as WindowPane,
  to as activePanel,
  Tt as activeTab,
  fn as addTerm,
  Xa as andExpression,
  Uf as axisOf,
  $h as bytesCell,
  ra as cascade,
  cs as cellFull,
  Ft as cellText,
  Mn as cellTextOf,
  He as cellValue,
  pa as changesResults,
  Ch as chipsFrom,
  ya as clampRect,
  co as collapseSpace,
  rp as collapseToTabs,
  eh as column,
  Er as columnAlign,
  Pr as columnClass,
  Cr as columnKey,
  dn as columnShortcut,
  vs as columnShortcutOf,
  Pa as columnTruncates,
  ml as columnsFor,
  ds as compactShortcuts,
  ll as countPages,
  Jo as createHistoryAdapter,
  Th as createMemoryAdapter,
  zh as createMemoryDataSource,
  Ul as createMockDataSource,
  Lh as createVueRouterAdapter,
  _h as dateColumn,
  $v as decodeLayout,
  _l as defaultCellText,
  Qr as defaultLayout,
  Ua as defaultQuery,
  tn as defaultViewFor,
  el as detachableAdapter,
  ma as drillExpression,
  Ur as dropIntoSpace,
  xh as durationCell,
  Sh as elapsedCell,
  sl as emptyFacetValue,
  xa as encodeLayout,
  Ql as entityAddress,
  wh as entityColumn,
  Rh as entityRedirect,
  xs as excludingTerm,
  rn as expandShortcuts,
  kh as facetColumn,
  Ts as facetField,
  Rs as facetValue,
  El as fieldHeading,
  $s as fieldTerm,
  nn as findEntity,
  ks as findEntityByAddress,
  mt as findSort,
  th as fixedView,
  bh as flagColumn,
  lr as float,
  jr as floatPanel,
  vo as floatSplit,
  sp as floatTabs,
  op as floatTabsAt,
  Yt as fnv1a,
  os as focusEntity,
  dl as formatBytes,
  Ot as formatCount,
  cl as formatDate,
  zv as formatDateTime,
  fl as formatDuration,
  pl as formatElapsed,
  ot as formatExpression,
  il as formatMetric,
  ul as formatOrdinal,
  vl as formatPercent,
  xl as formatRange,
  $t as formatTerm,
  aa as frame,
  kt as frameAt,
  Oe as frameOf,
  Fa as framePathOf,
  ze as frontPanel,
  jl as generateRows,
  Jv as group,
  zt as groupOf,
  Gf as groups,
  ci as hasActiveFacets,
  ye as hasPanel,
  jf as headless,
  mh as identityColumn,
  Hv as idsExpression,
  Gt as insertPanel,
  Xt as isChoosable,
  Rv as isEntityScoped,
  ol as isFacetActive,
  le as isFloat,
  Z as isGroup,
  ht as isMaximized,
  bt as isMinimized,
  $e as isPanelTab,
  Wa as isPristineQuery,
  an as isRangeTerm,
  Vt as isSplit,
  We as isTabOf,
  ja as isTypeCardsQuery,
  ss as isViewKind,
  Nv as joinExpression,
  Ss as liftTerm,
  Ll as matchesExpression,
  Xf as maximizeFrame,
  Zf as maximizeFrameAt,
  cp as mergeSpace,
  yh as metricColumn,
  Qf as minimizeFrame,
  Jf as minimizeFrameAt,
  xn as movePanel,
  Zt as moveTab,
  qv as narrowPatch,
  Ol as negateTerm,
  Sv as niceMax,
  je as nodeAt,
  Jt as nodeTitle,
  Me as normalizeLayout,
  De as normalizeSearch,
  fr as normalizeSizes,
  mo as onlySpace,
  mp as openPopOut,
  zl as oppositeTerm,
  fh as ordinalColumn,
  Ue as panelIds,
  Ze as panelNode,
  Vr as panelTabs,
  Te as parseExpression,
  ei as parseQuery,
  Mh as percentCell,
  hh as pictureColumn,
  qf as placePopover,
  hp as popOutRect,
  _c as presentParts,
  Ds as presentRow,
  ea as pressOptions,
  go as providePaneContext,
  ni as provideShellContext,
  ri as provideShellTheme,
  fp as provideWindowContext,
  Ih as queryAll,
  _a as raiseFrame,
  Qt as raiseFrameAt,
  ep as raisedPath,
  Eh as rangeFrom,
  Un as rangeOf,
  Bl as readDraft,
  Dv as readExpression,
  dp as reconcileLayout,
  Oh as recordRedirect,
  bs as recordTerm,
  ti as recordsIn,
  gh as referenceColumn,
  Ta as refineExpression,
  St as removePanel,
  lt as replaceAt,
  Kr as resizeRect,
  Xr as resizeSplit,
  Ka as resolveView,
  Xe as roleColumn,
  is as roleColumns,
  Hn as rootSpace,
  cr as row,
  yl as rowKey,
  Aa as sameTerm,
  Zn as scopeTerm,
  Nn as scopeTermFor,
  Es as scopedEntity,
  Fv as searchFromQuery,
  ha as serializeQuery,
  Nt as setActivePanel,
  Yf as setFrameRect,
  Wr as setFrameRectAt,
  Pn as setSizesAt,
  rh as setSplitDirection,
  dt as sizesOf,
  Zl as sortAddress,
  jn as sortsFor,
  Pe as spaceChrome,
  Dt as spaceTitle,
  ir as split,
  Iv as splitExpression,
  Gr as spreadTabs,
  Yr as spreadTabsAt,
  ph as stateColumn,
  hl as stripAnsi,
  fi as summarizeQuery,
  nr as summaryTerms,
  En as swapPanels,
  na as tabNode,
  yn as tabPanels,
  er as termStanding,
  ho as tileFloat,
  vh as tintColumn,
  Bv as tintFor,
  sh as toFloat,
  oh as toTiled,
  Ph as toggleFacet,
  nh as toggleMaximized,
  ah as toggleMinimized,
  qu as useColumns,
  mi as useDraft,
  Hi as useEntityCounts,
  od as useEntityPreviews,
  tr as useLayerTheme,
  dh as useLayoutRoute,
  lh as usePaneContext,
  ih as usePaneMenu,
  ch as usePoll,
  Pt as usePresentedRows,
  pi as useQueryState,
  _i as useRecordNames,
  vi as useResults,
  Ce as useShellContext,
  uh as useStableSchema,
  zf as useToasts,
  oa as useWindowContext,
  Ah as usefulFacets,
  Mr as viewAcross,
  zs as withFacetValue,
  La as withStanding,
  Vv as withoutFacet,
  Cs as withoutOwnScope,
  Rl as withoutTerm
};
