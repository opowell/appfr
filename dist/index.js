import { ref as D, computed as p, inject as St, provide as cn, getCurrentInstance as er, shallowRef as pt, toValue as ut, watch as be, onScopeDispose as Kt, getCurrentScope as Kn, defineComponent as ne, onMounted as un, onBeforeUnmount as Ke, resolveComponent as tr, openBlock as d, createElementBlock as v, normalizeStyle as Se, Fragment as ee, renderList as de, toDisplayString as z, createCommentVNode as A, createElementVNode as C, createBlock as G, nextTick as vt, useId as dn, unref as P, normalizeClass as lt, Teleport as Wn, createVNode as ie, useSlots as Wt, renderSlot as ye, withDirectives as _t, withKeys as rt, withModifiers as Ve, vModelText as Rn, createTextVNode as Le, withCtx as Pe, reactive as $s, resolveDynamicComponent as jn, createSlots as Mn, useModel as Zt, onBeforeUpdate as qo, normalizeProps as Vo, guardReactiveProps as Ko, mergeModels as zn, vShow as In, Comment as Wo, Text as jo, readonly as Uo, mergeProps as Go, h as Qo, watchEffect as Xo } from "vue";
const nr = Symbol("dc.routeAdapter");
function qe(e) {
  if (!e) return "";
  const t = e.replace(/^[?]/, "");
  return t ? `?${t}` : "";
}
function Yo() {
  const e = typeof window < "u", t = D(e ? qe(window.location.search) : ""), n = D(e ? window.location.pathname : "/"), a = () => {
    t.value = qe(window.location.search), n.value = window.location.pathname;
  };
  e && window.addEventListener("popstate", a);
  const s = (r, l, i) => {
    const o = qe(r);
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
    href(r, l) {
      return e ? l !== void 0 && l !== window.location.pathname ? `${l}${qe(r)}` : `${window.location.pathname}${qe(r)}${window.location.hash}` : `${l ?? n.value}${qe(r)}`;
    },
    push: (r, l) => s(r, "push", l),
    replace: (r, l) => s(r, "replace", l),
    dispose: () => {
      e && window.removeEventListener("popstate", a);
    }
  };
}
function Zo(e, t) {
  const n = p(t.detached), a = p(() => n.value ? "" : e.search.value), s = p(() => n.value ? t.path() : e.path.value);
  return {
    search: a,
    path: s,
    push(r, l) {
      n.value ? e.push(r, l ?? t.path()) : e.push(r, l);
    },
    replace(r, l) {
      n.value ? e.push(r, l ?? t.path()) : e.replace(r, l);
    },
    href(r, l) {
      const i = l ?? (n.value ? t.path() : void 0);
      return e.href ? e.href(r, i) : `${i ?? e.path.value}${qe(r)}`;
    }
  };
}
const ar = ["list", "cards", "grid", "images", "table", "links", "preview"], qv = [
  "minimal",
  "mono-size",
  "dark",
  "light",
  "auto",
  "macos",
  "windows",
  "inherit"
], Xt = ["ok", "running", "queued", "review", "failed"], Vv = [...Xt, "neutral", "accent"], Kv = [
  "identity",
  "reference",
  "metric",
  "state",
  "updated",
  "image",
  "tint"
], Wv = [480, 620, 760, 900, 1100], Jo = "cards", el = "table";
function rn(e, t = {}) {
  const n = (s) => s && sr(s) ? s : void 0;
  if (e === null) return n(t.view) ?? Jo;
  const a = t.landing === "entity" ? n(t.view) : void 0;
  return n(t.entityView) ?? a ?? el;
}
function xs(e, t, n, a = {}) {
  return e === rn(t, a) ? rn(n, a) : e;
}
const Ca = "updated";
function sr(e) {
  return typeof e == "string" && ar.includes(e);
}
const tl = {
  list: "List",
  cards: "Cards",
  grid: "Grid",
  images: "Images",
  table: "Table",
  links: "Links",
  preview: "Preview"
};
function Un(e, t) {
  const [n] = t ?? [];
  return n === void 0 || t?.includes(e) ? e : n;
}
function It(e, t) {
  return t ? e.entities.find((n) => n.key === t) ?? null : null;
}
function rr(e, t = {}) {
  const n = It(e, t.entity), a = e.entities[0];
  if (!n && !a) throw new Error(`Schema "${e.key}" declares no entities`);
  return n ?? a;
}
function or(e, t = null) {
  return e?.columns ?? t?.columns ?? [];
}
function lr(e, t = null) {
  if (e?.sorts?.length) return e.sorts;
  const n = /* @__PURE__ */ new Set(), a = [];
  for (const s of or(e, t))
    !s.sort || n.has(s.sort) || (n.add(s.sort), a.push({ key: s.sort, label: (s.label ?? s.sort).toLowerCase() }));
  return a;
}
const nl = { key: Ca, label: Ca };
function yt(e, t, n = null) {
  const a = lr(e, n);
  return (t ? a.find((r) => r.key === t) : void 0) ?? a.find((r) => r.key === Ca) ?? a[0] ?? nl;
}
function qa(e) {
  switch (e.kind) {
    case "chips":
      return { kind: "chips", selected: [] };
    case "range":
      return { kind: "range", min: null, max: null };
    case "toggle":
      return { kind: "toggle", on: !1 };
  }
}
function Ht(e) {
  const t = {};
  for (const n of e?.facets ?? []) t[n.key] = qa(n);
  return t;
}
function ir(e) {
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
function cr(e) {
  return Object.values(e).some(ir);
}
function Va(e) {
  return e.entity === null && e.expr.trim() === "" && !cr(e.facets);
}
function jv(e) {
  return e.entity !== null;
}
function Ka(e, t) {
  return e.entity === null && Un(e.view, t) === "cards";
}
function al(e, t) {
  return t <= 0 ? 1 : Math.max(1, Math.ceil(e / t));
}
function Wa(e, t = {}) {
  const a = t.landing === "entity" ? rr(e, t) : null;
  return {
    entity: a?.key ?? null,
    view: rn(a?.key ?? null, t),
    sort: yt(a, t.sort).key,
    dir: t.dir === "asc" ? "asc" : "desc",
    expr: "",
    facets: Ht(a),
    page: 1
  };
}
const ja = ["entity", "sort", "dir", "expr", "facets"];
function da(e) {
  return ja.some((t) => t in e);
}
function ur(e, t) {
  const n = {};
  for (const a of e?.facets ?? []) {
    const s = t[a.key];
    n[a.key] = s && s.kind === a.kind ? s : qa(a);
  }
  return n;
}
function Jt(e) {
  let t = 2166136261;
  for (let n = 0; n < e.length; n++)
    t ^= e.charCodeAt(n), t = Math.imul(t, 16777619);
  return Math.abs(t);
}
function sl(e) {
  if (!Number.isFinite(e)) return "—";
  const t = Math.abs(e);
  return t >= 1e6 ? `${(e / 1e6).toFixed(1)}m` : t >= 1e3 ? `${(e / 1e3).toFixed(1)}k` : String(Math.round(e));
}
function Lt(e) {
  return Number.isFinite(e) ? Math.round(e).toLocaleString("en-US") : "—";
}
function rl(e) {
  const t = new Date(e);
  if (Number.isNaN(t.getTime())) return "—";
  const n = String(t.getUTCDate()).padStart(2, "0"), a = String(t.getUTCMonth() + 1).padStart(2, "0");
  return `${n}.${a}.${t.getUTCFullYear()}`;
}
function ol(e) {
  return String(e + 1).padStart(2, "0");
}
function Uv(e, t) {
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
function ll(e) {
  if (e == null || !Number.isFinite(e) || e < 0) return "—";
  if (e < 1e3) return `${e} B`;
  const t = ["kB", "MB", "GB", "TB"];
  let n = e, a = -1;
  for (; n >= 1e3 && a < t.length - 1; )
    n /= 1e3, a += 1;
  return `${n < 100 ? n.toFixed(1) : Math.round(n)} ${t[a]}`;
}
function il(e) {
  if (!e || !Number.isFinite(e)) return "—";
  if (e < 1e3) return `${Math.round(e)}ms`;
  const t = e / 1e3;
  return t < 60 ? `${t.toFixed(1)}s` : `${Math.floor(t / 60)}m ${Math.round(t % 60)}s`;
}
function cl(e) {
  if (e == null || !Number.isFinite(e) || e <= 0)
    return "—";
  const t = Math.floor(e / 60);
  return t ? `${t}:${String(e % 60).padStart(2, "0")}` : `${e}s`;
}
function ul(e) {
  return e == null || !Number.isFinite(e) ? "—" : `${Math.round(e * 100)}%`;
}
function dl(e) {
  return e.replace(/\x1b\[[0-9;?]*[ -/]*[@-~]/g, "");
}
const it = "—";
function Je(e, t) {
  return e.find((n) => n.role === t);
}
function dr(e, t) {
  return e.filter((n) => n.role === t);
}
function fl(e, t) {
  const n = (t ? t.columns : e?.columns) ?? [], a = t ? "scoped" : "everything";
  return n.filter(
    (s) => s.role !== "tint" && ((s.when ?? "always") === "always" || s.when === a)
  );
}
const pl = ["id", "entityKey", "entityLabel"];
function je(e, t) {
  if (e.value) return e.value(t);
  const n = e.field ?? e.key;
  if (n !== void 0) {
    if (t.fields && n in t.fields) return t.fields[n];
    if (pl.includes(n))
      return t[n];
  }
}
function Cs(e, t) {
  const n = e.key ?? e.field ?? e.label;
  return n?.trim() ? n.trim() : `column-${t}`;
}
function vl(e, t) {
  return e.id?.trim() ? e.id : `${e.entityKey || "row"}-${t}`;
}
function hl(e, t) {
  if (e == null || e === "") return it;
  if (t === "number") {
    const n = typeof e == "number" ? e : Number(e);
    return Number.isFinite(n) ? sl(n) : String(e);
  }
  return t === "date" ? rl(String(e)) : Array.isArray(e) ? e.length ? e.join(", ") : it : String(e);
}
function qt(e, t) {
  const n = je(e, t);
  return e.format ? e.format(n, t) : hl(n, e.kind);
}
function ml(e) {
  return typeof e == "number" ? Number.isFinite(e) ? String(e) : "" : typeof e == "string" ? e : Array.isArray(e) ? e.join(", ") : "";
}
function fr(e, t) {
  const n = qt(e, t), a = ml(je(e, t));
  return a && a !== n ? a : n;
}
function En(e, t) {
  return e ? qt(e, t) : "";
}
function Ss(e) {
  return e.align ? e.align : e.kind === "number" || e.kind === "ordinal" ? "right" : "left";
}
const gl = {
  ordinal: "dc-table__num",
  number: "dc-table__number",
  date: "dc-table__date",
  status: "dc-table__state"
};
function Ms(e) {
  return [gl[e.kind ?? "text"], e.class].filter(Boolean).join(" ");
}
function Sa(e) {
  if (e.truncate !== void 0) return e.truncate;
  const t = e.kind ?? "text";
  return t === "text" || t === "number" || t === "date";
}
const yl = /^([A-Za-z_][\w.-]*)\s*(>=|<=|:|=|>|<)\s*(.*)$/;
function _l(e) {
  const t = [];
  let n = "", a = null;
  const s = () => {
    n && t.push(n), n = "";
  };
  for (let r = 0; r < e.length; r++) {
    const l = e[r];
    if (a) {
      l === a ? a = null : n += l;
      continue;
    }
    if (l === '"' || l === "'") {
      a = l;
      continue;
    }
    if (/\s/.test(l)) {
      if (/(?:>=|<=|[:=><])$/.test(n) || e.slice(r + 1).match(/^\s*(>=|<=|[:=><])/) && n) continue;
      s();
      continue;
    }
    n += l;
  }
  return s(), t;
}
function Ne(e) {
  const t = e.trim();
  if (!t) return [];
  const n = [];
  let a = [];
  for (const s of _l(t)) {
    const r = s.toUpperCase();
    if (r === "AND" || r === "&&") continue;
    if (r === "OR" || r === "||") {
      a.length && n.push(a), a = [];
      continue;
    }
    const l = s.length > 1 && s.startsWith("-"), i = l ? s.slice(1) : s, o = l ? { negated: !0 } : {}, c = yl.exec(i);
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
const Ot = (e) => e.toLowerCase().replace(/\s+/g, ""), pr = [
  ["status", "state"],
  ["state", "state"],
  ["updated", "updated"],
  ["date", "updated"],
  ["name", "identity"],
  ["ref", "reference"]
];
function wl(e, t, n) {
  const a = Ot(e), s = n.columns ?? [];
  if (a === "entity") return t.entityKey;
  if (e in t.fields) return t.fields[e];
  const r = s.find(
    (c) => c.key?.toLowerCase() === e.toLowerCase() || c.field?.toLowerCase() === e.toLowerCase() || c.label !== void 0 && Ot(c.label) === a
  );
  if (r) return je(r, t);
  const l = n.facets.find((c) => Ot(c.label) === a);
  if (l && l.key in t.fields) return t.fields[l.key];
  const i = pr.find(([c]) => c === a)?.[1];
  if (i) {
    const c = Je(s, i);
    if (c) return je(c, t);
  }
  const o = /^metric(\d+)$/.exec(a);
  if (o) {
    const c = dr(s, "metric")[Number(o[1]) - 1];
    if (c) return je(c, t);
  }
}
function vr(e) {
  return (e.toLowerCase().match(/[\p{L}\p{N}]+/gu) ?? []).map((t) => t.charAt(0)).join("");
}
const Es = /^[a-z_][\w.-]*$/;
function hr(e) {
  const t = (e.key ?? e.field)?.toLowerCase();
  if (t !== void 0) return Es.test(t) ? t : void 0;
  const n = e.label === void 0 ? void 0 : Ot(e.label);
  return n !== void 0 && Es.test(n) ? n : void 0;
}
function kl(e, t) {
  const n = Ot(e);
  if (n === "entity" || pr.some(([s]) => s === n) || /^metric\d+$/.test(n)) return !0;
  const a = (s) => s !== void 0 && Ot(s) === n;
  return (t.columns ?? []).some(
    (s) => a(s.key) || a(s.field) || a(s.label)
  ) || t.facets.some((s) => a(s.key) || a(s.label));
}
function On(e, t) {
  if (!t) return e;
  let n = !1;
  const a = Ne(e).map(
    (s) => s.map((r) => {
      if (r.kind !== "field") return r;
      const l = mr(r.field, t), i = l && hr(l);
      return i ? (n = !0, { ...r, field: i }) : r;
    })
  );
  return n ? dt(a) : e;
}
function mr(e, t) {
  if (!(!e || kl(e, t)))
    return (t.columns ?? []).find(
      (n) => n.label !== void 0 && vr(n.label) === e
    );
}
function bl(e, t) {
  if (!t || e.label === void 0 || !hr(e)) return;
  const n = vr(e.label);
  return mr(n, t) === e ? n : void 0;
}
function fa(e, t) {
  const n = e.toLowerCase(), a = t.toLowerCase();
  if (!a.includes("*")) return n.includes(a);
  const s = a.replace(/[.+?^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*");
  return new RegExp(s).test(n);
}
function Ps(e, t) {
  return e.toLowerCase() === t.toLowerCase();
}
function $l(e, t, n, a) {
  if (e.kind === "text") {
    const i = n.columns ?? [];
    return ["identity", "reference"].some((o) => {
      const c = Je(i, o), u = c ? je(c, t) : void 0;
      return typeof u == "string" && fa(u, e.value);
    });
  }
  const s = wl(e.field, t, n);
  if (s === void 0) return a?.has(e.field) ? !1 : null;
  if (Array.isArray(s))
    return e.comparator === ":" || e.comparator === "=" ? s.some(
      (o) => e.comparator === "=" ? Ps(String(o), e.value) : fa(String(o), e.value)
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
    return e.comparator === "=" ? Ps(String(s), e.value) : fa(String(s), e.value);
  }
  const r = Number(e.value), l = typeof s == "number" ? s : Number(s);
  return !Number.isFinite(r) || !Number.isFinite(l) ? null : xl(e.comparator, l, r);
}
function As(e, t, n, a) {
  const s = $l(e, t, n, a);
  return s === null ? !0 : e.negated ? !s : s;
}
function xl(e, t, n) {
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
function Ts(e) {
  return e.kind === "field" && !e.negated && (e.comparator === ":" || e.comparator === "=");
}
const Ls = /* @__PURE__ */ new WeakMap();
function Cl(e) {
  if (!e?.strictScopes) return null;
  let t = Ls.get(e);
  return t || (t = new Set(
    e.entities.flatMap((n) => n.scope ? [n.scope.toLowerCase()] : [])
  ), Ls.set(e, t)), t;
}
function Sl(e, t, n, a) {
  if (!e.length) return !0;
  const s = Cl(a);
  return e.some((r) => {
    const l = /* @__PURE__ */ new Map();
    for (const i of r)
      Ts(i) && l.set(
        i.field,
        (l.get(i.field) ?? !1) || As(i, t, n, s)
      );
    return r.every(
      (i) => Ts(i) ? l.get(i.field) === !0 : As(i, t, n, s)
    );
  });
}
function Rs(e) {
  return /[\s"']/.test(e) ? `"${e.replace(/["']/g, "")}"` : e;
}
function fn(e) {
  const t = e.negated ? "-" : "";
  return e.kind === "text" ? t + Rs(e.value) : `${t}${e.field}${e.comparator}${Rs(e.value)}`;
}
function Ml(e) {
  if (!e.negated) return { ...e, negated: !0 };
  const { negated: t, ...n } = e;
  return n;
}
function dt(e) {
  return e.filter((t) => t.length).map((t) => t.map(fn).join(" ")).join(" OR ");
}
function El(e, t, n) {
  return e.map((a, s) => s === t ? a.filter((r, l) => l !== n) : a).filter((a) => a.length);
}
function Pl(e) {
  const t = Ne(e);
  if (t.length > 1) return { parts: [], text: e.trim() };
  const n = t[0] ?? [];
  return {
    parts: n.filter((a) => a.kind === "field"),
    text: n.filter((a) => a.kind === "text").map(fn).join(" ")
  };
}
function zs(e, t) {
  return [...e.map(fn), t.trim()].filter(Boolean).join(" ");
}
const Is = (e, t) => e.toLowerCase() === t.toLowerCase();
function Ma(e, t) {
  return !!e.negated == !!t.negated && gr(e, t);
}
function Al(e, t) {
  return !!e.negated != !!t.negated && gr(e, t);
}
function gr(e, t) {
  return e.kind === "field" ? t.kind === "field" && e.field === t.field && e.comparator === t.comparator && Is(e.value, t.value) : t.kind === "text" && Is(e.value, t.value);
}
function Tl(e, t) {
  return t.filter((n) => !e.some((a) => Ma(a, n)));
}
function Ua(e, t) {
  return yr(e, t, (n) => n);
}
function Ea(e, t) {
  return yr(
    e,
    t,
    (n, a) => n.filter((s) => !a.some((r) => Al(s, r)))
  );
}
const Ll = /^[A-Za-z_][\w.-]*\s*(?:>=|<=|:|=|>|<)$/;
function Rl(e) {
  return dt(
    Ne(e).map(
      (t) => t.filter(
        (n) => n.kind !== "text" || n.value !== "-" && !Ll.test(n.value)
      )
    ).filter((t) => t.length > 0)
  );
}
function yr(e, t, n) {
  const a = Ne(e), s = Ne(t);
  return a.length ? s.length ? dt(
    a.flatMap(
      (r) => s.map((l) => [...n(r, l), ...Tl(r, l)])
    )
  ) : dt(a) : dt(s);
}
function zl(e, t) {
  for (const [n, a] of Object.entries(t)) {
    const s = e.fields[n];
    switch (a.kind) {
      case "chips": {
        if (!a.selected.length) break;
        if (Array.isArray(s)) {
          if (!s.some((r) => a.selected.includes(String(r)))) return !1;
          break;
        }
        if (typeof s != "string" || !a.selected.includes(s)) return !1;
        break;
      }
      case "range": {
        if (a.min === null && a.max === null) break;
        const r = typeof s == "number" ? s : Number(s);
        if (!Number.isFinite(r) || a.min !== null && r < a.min || a.max !== null && r > a.max) return !1;
        break;
      }
      case "toggle": {
        if (!a.on) break;
        if (s !== !0) return !1;
        break;
      }
    }
  }
  return !0;
}
const _r = (e) => e.kind === "date" || e.role === "updated";
function Il(e) {
  if (!e) return () => 0;
  const n = (e.kind ?? "text") === "number" || e.role === "metric", a = _r(e);
  return (s, r) => {
    const l = je(e, s), i = je(e, r);
    return n ? Number(i ?? 0) - Number(l ?? 0) : a ? Date.parse(String(i ?? "")) - Date.parse(String(l ?? "")) : String(i ?? "").localeCompare(String(l ?? ""));
  };
}
function Os(e, t) {
  return !t || !_r(t) ? !1 : !Number.isFinite(Date.parse(String(je(t, e) ?? "")));
}
function wr({ query: e, schema: t, entity: n, limit: a, offset: s }, r, l) {
  const i = Ne(e.expr), o = n ? [n] : t.entities;
  let c = 0;
  const u = [];
  for (const $ of o)
    for (const x of r($))
      c += 1, (n ? zl(x, e.facets) : !0) && Sl(i, x, $, t) && u.push(x);
  const m = yt(n, e.sort, t), k = or(n, t).find(($) => $.sort === m.key), g = l.undatedLast ? u.filter(($) => !Os($, k)) : u, w = l.undatedLast ? u.filter(($) => Os($, k)) : [];
  g.sort(Il(k)), e.dir === "asc" && g.reverse();
  const _ = w.length ? [...g, ...w] : g;
  return {
    // One page out of the middle. `total` stays the whole match, which is what
    // the shell counts pages with.
    rows: l.zeroIsAll && a <= 0 ? _.slice(s) : _.slice(s, s + a),
    total: u.length,
    unfiltered: u.length === c
  };
}
const Fn = [
  "oklch(0.36 0.06 240)",
  "oklch(0.34 0.07 290)",
  "oklch(0.36 0.06 160)",
  "oklch(0.38 0.06 80)",
  "oklch(0.35 0.07 30)",
  "oklch(0.34 0.05 200)"
];
function Gv(e) {
  return Fn[Jt(e) % Fn.length];
}
function kr(e, t) {
  return `${e}_${1e4 + t * 7}`;
}
const Ol = 7, Fl = 3;
function Nl(e, t, n, a) {
  const s = (t * Ol + Jt(n)) % a, r = [];
  for (let l = 0; l < Math.min(Fl, a); l++)
    r.push(kr(e, (s + l) % a));
  return r;
}
function Bl(e, t) {
  switch (e.kind) {
    case "chips":
      return e.multiple ? Dl(e.options, t) : e.options[t % e.options.length] ?? "";
    case "range": {
      const n = Math.max(0, e.max - e.min);
      return e.min + (n === 0 ? 0 : t % (n + 1));
    }
    case "toggle":
      return t % 3 === 0;
  }
}
function Dl(e, t) {
  if (!e.length) return [];
  const n = 1 + (t >> 5) % Math.min(3, e.length), a = t % e.length, s = /* @__PURE__ */ new Set();
  for (let r = 0; r < n; r++) s.add((a + r) % e.length);
  return [...s].sort((r, l) => r - l).map((r) => e[r]);
}
function Hl(e, t) {
  const { hash: n, sample: a, revision: s, updatedAt: r } = t, l = s ? ` · rev ${s + 1}` : "";
  switch (e.role) {
    case "identity":
      return `${a[0]}${l}`;
    case "reference":
      return s ? `${a[1]}-${s + 1}` : a[1];
    case "state":
      return Xt[n % Xt.length];
    case "updated":
      return r;
    case "tint":
      return Fn[n % Fn.length];
    case "metric":
      return 1 + n % 940;
  }
  switch (e.kind) {
    case "number":
      return 1 + n % 940;
    case "status":
      return Xt[n % Xt.length];
    case "date":
      return r;
    default:
      return;
  }
}
function ql(e, t = {}) {
  const n = t.population ?? 48, a = t.seed ?? "", s = t.now ?? /* @__PURE__ */ new Date("2026-08-25T00:00:00Z"), r = e.samples, l = t.scopes ?? [];
  if (!r.length) return [];
  const i = [];
  for (let o = 0; o < n; o++) {
    const c = r[o % r.length], u = Math.floor(o / r.length), m = Jt(`${a}:${e.key}:${c[0]}:${o}`), k = kr(e.key, o), g = new Date(s.getTime() - m % 900 * 36e5).toISOString(), w = {};
    for (const _ of e.columns ?? []) {
      const $ = _.field ?? _.key;
      if (!$ || _.value) continue;
      const x = Hl(_, {
        hash: Jt(`${m}:${$}`),
        sample: c,
        revision: u,
        updatedAt: g
      });
      x !== void 0 && (w[$] = x);
    }
    for (const _ of e.facets)
      w[_.key] = Bl(_, Jt(`${m}:${_.key}`));
    for (const [_, $] of l)
      w[_] = $ === e.key ? k : Nl($, o, _, n);
    i.push({ id: k, entityKey: e.key, entityLabel: e.label, fields: w });
  }
  return i;
}
function Vl(e = {}) {
  const t = /* @__PURE__ */ new Map(), n = (a, s) => {
    const r = t.get(a.key);
    if (r) return r;
    const l = e.scopes ?? s.entities.flatMap(
      (o) => o.scope ? [[o.scope, o.key]] : []
    ), i = ql(a, { ...e, scopes: l });
    return t.set(a.key, i), i;
  };
  return {
    query(a) {
      return wr(a, (s) => n(s, a.schema), {
        undatedLast: !1,
        zeroIsAll: !1
      });
    }
  };
}
const pn = "e", Gn = "v", Ga = "s", Qa = "d", Mt = "q", Qn = "p", Xa = "f_", br = "*", Kl = [
  pn,
  Gn,
  Ga,
  Qa,
  Mt,
  Qn
], Pa = "..", $r = ",", Wl = [
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
function en(e) {
  let t = encodeURIComponent(e);
  for (const [n, a] of Wl) t = t.replace(n, a);
  return t;
}
function st(e) {
  try {
    return decodeURIComponent(e.replace(/\+/g, " "));
  } catch {
    return e.replace(/\+/g, " ");
  }
}
function Ya(e) {
  const t = e.replace(/^[?]/, "");
  if (!t) return [];
  const n = [];
  for (const a of t.split("&")) {
    if (!a) continue;
    const s = a.indexOf("="), r = s === -1 ? a : a.slice(0, s), l = s === -1 ? "" : a.slice(s + 1);
    n.push([st(r), l]);
  }
  return n;
}
function jl(e) {
  return Kl.includes(e) || e.startsWith(Xa);
}
function Fs(e, t, n) {
  return Math.min(n, Math.max(t, e));
}
function Ul(e, t) {
  const n = st(t);
  switch (e.kind) {
    case "chips": {
      const a = new Set(
        n.split($r).map((r) => r.trim()).filter(Boolean)
      );
      return { kind: "chips", selected: e.options.filter((r) => a.has(r)) };
    }
    case "range": {
      const a = n.indexOf(Pa), s = (a === -1 ? n : n.slice(0, a)).trim(), r = (a === -1 ? "" : n.slice(a + Pa.length)).trim(), l = s === "" ? null : Number(s), i = r === "" ? null : Number(r);
      let o = l !== null && Number.isFinite(l) ? Fs(l, e.min, e.max) : null, c = i !== null && Number.isFinite(i) ? Fs(i, e.min, e.max) : null;
      return o !== null && c !== null && o > c && ([o, c] = [c, o]), { kind: "range", min: o, max: c };
    }
    case "toggle":
      return { kind: "toggle", on: n === "1" || n === "true" };
  }
}
function Gl(e, t) {
  switch (e.kind) {
    case "chips":
      return e.selected.length ? (t.kind === "chips" ? t.options.filter((a) => e.selected.includes(a)) : e.selected).join($r) : null;
    case "range":
      return e.min === null && e.max === null ? null : `${e.min ?? ""}${Pa}${e.max ?? ""}`;
    case "toggle":
      return e.on ? "1" : null;
  }
}
function Ql(e, t, n = {}) {
  const a = Wa(t, n), s = new Map(Ya(e)), r = s.get(pn), l = r === void 0 ? a.entity : st(r), i = l === br ? null : It(t, l), o = s.get(Gn), c = o && sr(st(o)) ? st(o) : rn(i?.key ?? null, n), u = s.get(Ga), m = yt(i, u ? st(u) : n.sort, t), k = s.get(Qa), g = k ? st(k) === "asc" ? "asc" : "desc" : a.dir, w = s.get(Mt), _ = s.get(Qn), $ = _ === void 0 ? 1 : Number(st(_)), x = Number.isFinite($) ? Math.max(1, Math.floor($)) : 1, M = {};
  for (const b of i?.facets ?? []) {
    const S = s.get(`${Xa}${b.key}`);
    M[b.key] = S === void 0 ? qa(b) : Ul(b, S);
  }
  return {
    entity: i?.key ?? null,
    view: c,
    sort: m.key,
    dir: g,
    expr: w === void 0 ? "" : st(w),
    facets: ur(i, M),
    page: x
  };
}
function pa(e, t, n = {}, a = "") {
  const s = Wa(t, n), r = It(t, e.entity), l = Ya(a).filter(([m]) => !jl(m)), i = [], o = (m, k) => i.push([m, en(k)]), c = r?.key ?? null;
  c !== s.entity && o(pn, c ?? br), e.view !== rn(c, n) && o(Gn, e.view), e.sort !== s.sort && o(Ga, e.sort), e.dir !== s.dir && o(Qa, e.dir), e.expr.trim() !== "" && o(Mt, e.expr);
  for (const m of r?.facets ?? []) {
    const k = e.facets[m.key];
    if (!k) continue;
    const g = Gl(k, m);
    g !== null && i.push([`${Xa}${m.key}`, en(g)]);
  }
  e.page > 1 && o(Qn, String(e.page));
  const u = [
    ...l.map(([m, k]) => [en(m), k]),
    ...i
  ];
  return u.length ? `?${u.map(([m, k]) => k === "" ? m : `${m}=${k}`).join("&")}` : "";
}
function Qv(e) {
  const t = [];
  for (const [n, a] of Object.entries(e))
    for (const s of Array.isArray(a) ? a : [a]) {
      if (typeof s != "string") continue;
      const r = en(n);
      t.push(s === "" ? r : `${r}=${en(s)}`);
    }
  return t.length ? `?${t.join("&")}` : "";
}
function Xv(e) {
  const t = new Map(Ya(e)).get(Mt);
  return t === void 0 ? "" : st(t);
}
function Xn(e, t) {
  return xr(e, t.id);
}
function xr(e, t) {
  const n = e?.scope;
  return n ? Cr(n, t) : null;
}
function Cr(e, t) {
  return `${e}="${t.replace(/"/g, "")}"`;
}
function Yv(e, t) {
  const n = typeof e == "string" ? e : e?.scope;
  if (!n) return null;
  const a = t.filter((s) => s.replace(/"/g, "") !== "").map((s) => Cr(n, s));
  return a.length ? a.join(" ") : null;
}
function Yn(e, t) {
  if (e.kind !== "field" || t.kind !== "field") return Ma(e, t);
  const n = (a) => a.comparator === ":" || a.comparator === "=";
  return Ma(e, { ...t, comparator: n(e) && n(t) ? e.comparator : t.comparator });
}
function Nn(e, t) {
  return Yn(e, Ml(t));
}
function Bn(e, t) {
  return Xn(
    e.entities.find((n) => n.key === t.entityKey),
    t
  );
}
function vn(e, t) {
  if (!t) return e;
  const n = e.trim();
  if (!n) return t;
  const [a] = Ne(t).flat();
  if (!a) return n;
  const s = Ne(n);
  return s.some((i) => i.some((o) => Yn(o, a))) ? n : s.some((i) => i.some((o) => Nn(o, a))) ? dt(
    s.map(
      (i) => i.map((o) => Nn(o, a) ? a : o)
    )
  ) : `${n} ${t}`;
}
function Sr(e) {
  if (!e) return null;
  const t = e.trim();
  return t ? t.startsWith("-") ? t.slice(1) : `-${t}` : null;
}
function Za(e, t) {
  if (!t || !e.trim()) return null;
  const [n] = Ne(t).flat();
  if (!n) return null;
  const a = Ne(e).flat();
  return a.some((s) => Yn(s, n)) ? n.negated ? "out" : "in" : a.some((s) => Nn(s, n)) ? n.negated ? "in" : "out" : null;
}
function Mr(e, t) {
  if (!t || !e.trim()) return e;
  const [n] = Ne(t).flat();
  if (!n) return e;
  const a = Ne(e), s = a.map(
    (r) => r.filter((l) => !Yn(l, n) && !Nn(l, n))
  );
  return s.every((r, l) => r.length === a[l]?.length) ? e : dt(s);
}
function Aa(e, t, n) {
  return t ? n === null ? Mr(e, t) : vn(e, n === "out" ? Sr(t) : t) : e;
}
function Er(e) {
  return e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0;
}
function Zn(e) {
  return e.altKey ? { exclude: !0 } : {};
}
function va(e, t, n, a = {}) {
  const s = Bn(e, n);
  return vn(t.expr, a.exclude ? Sr(s) : s);
}
function Pr(e, t) {
  const n = e?.scope?.toLowerCase();
  if (!n || e?.keepsScope || !t.trim()) return t;
  const a = Ne(t), s = a.map(
    (r) => r.filter((l) => l.kind !== "field" || l.field !== n)
  );
  return s.every((r, l) => r.length === a[l]?.length) ? t : dt(s);
}
function Ar(e, t) {
  const n = t.toLowerCase();
  return e.entities.find((a) => a.scope?.toLowerCase() === n) ?? null;
}
function Tr(e, t, n) {
  if (!t || !n) return null;
  const a = Ar(e, t);
  return a ? { entity: a, id: n } : null;
}
function Xl(e, t) {
  const n = [], a = /* @__PURE__ */ new Set();
  for (const s of t)
    for (const r of Ne(s).flat()) {
      if (r.kind !== "field" || r.negated) continue;
      const l = Tr(e, r.field, r.value);
      if (!l) continue;
      const i = `${l.entity.key}:${l.id.toLowerCase()}`;
      a.has(i) || (a.add(i), n.push({ entityKey: l.entity.key, id: l.id }));
    }
  return n;
}
function Zv(e, t, n = "cards") {
  return {
    // An expression with nothing in it is no parameter, as the shell writes it.
    [Mt]: vn(e, t) || void 0,
    [pn]: void 0,
    [Gn]: n,
    [Qn]: void 0
  };
}
const Lr = Symbol("dc.shellContext");
function Yl(e) {
  const t = e.liveQuery ? e : Zl(e);
  return cn(Lr, t), t;
}
function Zl(e) {
  const t = e.draft ?? D("");
  return {
    draft: t,
    liveQuery: e.query,
    drafting: p(() => !1),
    commitDraft() {
      const n = t.value.trim();
      n && (e.setExpression(
        Ea(e.query.value.expr, On(n, e.entity.value))
      ), t.value = "");
    },
    abandonDraft() {
      t.value = "";
    },
    ...e
  };
}
function Ee() {
  const e = St(Lr, null);
  if (!e)
    throw new Error(
      "[header-content-layout] No shell context found. Render this component inside <DataShell>."
    );
  return e;
}
const Dn = Symbol("dc-shell-theme");
function Ta(e) {
  return {
    read: () => ({
      theme: ut(e.theme),
      accent: ut(e.accent),
      tokens: ut(e.tokens)
    })
  };
}
function Jl(e, t) {
  t ? t.provide(Dn, Ta(e)) : cn(Dn, Ta(e));
}
function ei(e) {
  const t = er();
  cn(Dn, {
    ...Ta(e),
    element: () => t?.proxy?.$el ?? null
  });
}
function Ja(e) {
  const t = er(), n = St(Dn, null), a = pt(null);
  function s() {
    const o = t?.proxy?.$el, u = (o instanceof Element ? o : o?.parentElement)?.closest(".dc-shell");
    if (!u) {
      a.value = null;
      return;
    }
    const m = {};
    for (const k of Array.from(u.style))
      k.startsWith("--") && (m[k] = u.style.getPropertyValue(k));
    a.value = { shell: u, theme: u.dataset.dcTheme, tokens: m };
  }
  const r = p(() => {
    const o = a.value;
    if (!n) return o;
    const c = n.element?.();
    return o && c && o.shell !== c && c.contains(o.shell) ? o : n.read();
  }), l = p(() => e.theme ?? r.value?.theme ?? "minimal"), i = p(() => {
    const o = r.value, c = {
      ...o?.tokens,
      ...o?.accent ? { "--dc-accent": o.accent } : {},
      ...e.tokens,
      ...e.accent ? { "--dc-accent": e.accent } : {}
    };
    return Object.keys(c).length ? c : void 0;
  });
  return { theme: l, style: i, adopt: s };
}
const Hn = "entity", on = "expr";
function ti(e, t) {
  const n = e.label.toLowerCase();
  switch (t.kind) {
    case "chips":
      return t.selected.map((a) => ({
        id: `${e.key}:${a}`,
        label: `${n}:${a}`,
        facetKey: e.key,
        option: a
      }));
    case "range": {
      if (t.min === null && t.max === null) return [];
      const a = t.min !== null && t.max !== null ? `${t.min} ≤ ${n} ≤ ${t.max}` : t.max !== null ? `${n} ≤ ${t.max}` : `${n} ≥ ${t.min}`;
      return [{ id: e.key, label: a, facetKey: e.key }];
    }
    case "toggle":
      return t.on ? [{ id: e.key, label: `${n}:on`, facetKey: e.key }] : [];
  }
}
function es(e, t) {
  const n = [];
  t && n.push({
    id: Hn,
    label: `entity:${t.key}`,
    facetKey: Hn
  });
  for (const a of t?.facets ?? []) {
    const s = e.facets[a.key];
    s && ir(s) && n.push(...ti(a, s));
  }
  return Ne(e.expr).forEach((a, s) => {
    a.forEach((r, l) => {
      n.push({
        id: `${on}:${s}:${l}`,
        label: fn(r),
        facetKey: on,
        group: s,
        index: l,
        ...r.kind === "field" ? { field: r.field, value: r.value } : {},
        ...r.negated ? { negated: !0 } : {}
      });
    });
  }), n;
}
function ni(e, t, n = null) {
  if (Va(e)) {
    const r = yt(t, e.sort, n);
    return `everything · ${e.view} · ${r.label}`;
  }
  const a = es(e, t).filter((r) => r.facetKey !== on).map((r) => r.label), s = e.expr.trim();
  return s && a.push(`"${s}"`), a.join(" · ");
}
function ai(e) {
  const { adapter: t } = e, n = p(() => ut(e.schema)), a = p(() => ut(e.defaults) ?? {}), s = p(() => Ql(t.search.value, n.value, a.value)), r = p(() => It(n.value, s.value.entity)), l = p(() => r.value ?? rr(n.value, a.value)), i = p(() => lr(r.value, n.value)), o = p(() => yt(r.value, s.value.sort, n.value)), c = (x, M) => {
    const b = pa(x, n.value, a.value, t.search.value);
    return b === t.search.value ? !1 : (M === "push" ? t.push(b) : t.replace(b), !0);
  }, u = () => ut(e.navigationMode) ?? "push", m = () => ut(e.facetNavigationMode) ?? "replace", k = (x, M) => {
    const b = x.page ?? (da(x) ? 1 : s.value.page);
    return c({ ...s.value, ...x, page: b }, M);
  }, g = (x) => {
    const M = x.page ?? (da(x) ? 1 : s.value.page), b = pa({ ...s.value, ...x, page: M }, n.value, a.value, t.search.value);
    return t.href ? t.href(b) : `${t.path.value}${b}`;
  }, w = (x, M) => {
    const b = s.value.facets[x];
    if (!b) return;
    const S = { ...s.value.facets, [x]: M(b) };
    k({ facets: S }, m());
  }, _ = (x) => {
    const M = x === null ? null : It(n.value, x);
    return (M?.key ?? null) === s.value.entity ? {} : {
      entity: M?.key ?? null,
      view: xs(s.value.view, s.value.entity, M?.key ?? null, a.value),
      sort: yt(M, s.value.sort, n.value).key,
      facets: Ht(M)
    };
  }, $ = (x) => {
    const M = _(x);
    Object.keys(M).length && k(M, u());
  };
  return {
    query: s,
    entity: r,
    focus: l,
    sort: o,
    sorts: i,
    summary: p(() => ni(s.value, r.value, n.value)),
    terms: p(() => es(s.value, r.value)),
    isPristine: p(() => Va(s.value)),
    isEverything: p(() => s.value.entity === null),
    hasFacets: p(() => cr(s.value.facets)),
    setEntity: $,
    entityHref: (x) => g(_(x)),
    clearEntity: () => $(null),
    setView(x) {
      k({ view: x }, u());
    },
    setSort(x) {
      k({ sort: yt(r.value, x, n.value).key }, u());
    },
    toggleDirection() {
      k({ dir: s.value.dir === "desc" ? "asc" : "desc" }, u());
    },
    setExpression(x) {
      return k({ expr: x }, u());
    },
    narrow(x, M, b) {
      return k({ expr: x, ..._(M), ...b ? { view: b } : {} }, u());
    },
    narrowHref(x, M, b) {
      return g({ expr: x, ..._(M), ...b ? { view: b } : {} });
    },
    setPage(x, M) {
      k({ page: Math.max(1, Math.floor(x)) }, M ?? u());
    },
    setFacet(x, M) {
      w(x, () => M);
    },
    toggleChip(x, M) {
      w(x, (b) => b.kind !== "chips" ? b : { kind: "chips", selected: b.selected.includes(M) ? b.selected.filter((T) => T !== M) : [...b.selected, M] });
    },
    setRange(x, M, b) {
      w(x, (S) => S.kind === "range" ? { kind: "range", min: M, max: b } : S);
    },
    toggleFlag(x) {
      w(
        x,
        (M) => M.kind === "toggle" ? { kind: "toggle", on: !M.on } : M
      );
    },
    removeTerm(x) {
      if (x.facetKey === Hn) {
        $(null);
        return;
      }
      if (x.facetKey === on) {
        const M = El(Ne(s.value.expr), x.group ?? 0, x.index ?? 0);
        k({ expr: dt(M) }, u());
        return;
      }
      w(x.facetKey, (M) => M.kind === "chips" && x.option ? { kind: "chips", selected: M.selected.filter((b) => b !== x.option) } : M.kind === "range" ? { kind: "range", min: null, max: null } : M.kind === "toggle" ? { kind: "toggle", on: !1 } : M);
    },
    clearFilters() {
      k({ ..._(null), expr: "", facets: Ht(null) }, u());
    },
    reset() {
      c(Wa(n.value, a.value), u());
    },
    hrefFor(x) {
      const M = { ...s.value, ...x };
      return "entity" in x && !("view" in x) && (M.view = xs(s.value.view, s.value.entity, M.entity, a.value)), M.page = x.page ?? (da(x) ? 1 : s.value.page), M.facets = ur(It(n.value, M.entity), M.facets), `${t.path.value}${pa(M, n.value, a.value, t.search.value)}`;
    }
  };
}
function si(e) {
  const t = pt([]), n = D(0), a = D(!1), s = D(!1), r = pt(null);
  let l = 0, i = null, o = null;
  const c = p(() => (e.query.value.page - 1) * e.limit.value), u = p(() => al(n.value, e.limit.value)), m = () => {
    const S = e.query.value, T = e.within?.value.trim(), B = Pr(e.entity.value, S.expr);
    return T ? { ...S, expr: Ua(T, B) } : B === S.expr ? S : { ...S, expr: B };
  }, k = (S, T) => {
    t.value = S.rows, n.value = S.total, r.value = null, g(T);
  }, g = (S) => {
    i = { key: S, total: n.value }, s.value = !1;
  }, w = (S) => {
    r.value = S, t.value = [], n.value = 0, i = null, s.value = !1;
  }, _ = (S, T, B, L) => {
    let I = !0;
    const E = () => S === l;
    let V = 0, q = !1;
    const Q = (pe) => {
      V = pe, q = !0, L === void 0 && (n.value = pe);
    }, he = () => {
      I && (I = !1, t.value = [], Q(0)), r.value = null;
    };
    return {
      get open() {
        return E();
      },
      insert(pe, Be) {
        if (!E()) return;
        const H = Array.isArray(pe) ? pe : [pe];
        if (!H.length) return;
        he();
        const U = [...t.value];
        U.splice(Be ?? U.length, 0, ...H), t.value = T > 0 ? U.slice(0, T) : U, Q(V + H.length);
      },
      set(pe) {
        E() && (pe.rows && (he(), t.value = T > 0 ? pe.rows.slice(0, T) : pe.rows, Q(pe.rows.length)), pe.total !== void 0 && Q(pe.total));
      },
      close() {
        E() && (a.value = !1, q && (n.value = V), g(B));
      },
      fail(pe) {
        E() && (w(pe), a.value = !1);
      }
    };
  }, $ = () => {
    const S = o;
    o = null, S?.();
  }, x = () => {
    const S = ++l;
    $();
    const T = M.value, B = i?.key === T ? i.total : void 0;
    s.value = B === void 0;
    const L = {
      query: m(),
      schema: e.schema.value,
      entity: e.entity.value,
      limit: e.limit.value,
      offset: c.value
    }, I = e.source.value;
    if (I.stream) {
      a.value = !0;
      try {
        o = I.stream(L, _(S, L.limit, T, B)) ?? null;
      } catch (V) {
        w(V), a.value = !1;
      }
      return;
    }
    let E;
    try {
      E = I.query(L);
    } catch (V) {
      w(V);
      return;
    }
    if (!(E instanceof Promise)) {
      k(E, T), a.value = !1;
      return;
    }
    a.value = !0, E.then((V) => {
      S === l && k(V, T);
    }).catch((V) => {
      S === l && w(V);
    }).finally(() => {
      S === l && (a.value = !1);
    });
  }, M = p(() => {
    const S = m();
    return `${e.entity.value?.key ?? e.schema.value.entities[0]?.key ?? ""}|${JSON.stringify(ja.map((B) => S[B]))}`;
  }), b = p(() => `${M.value}|${e.query.value.page}`);
  return be([e.source, b, e.limit], x, {
    immediate: !0
  }), Kt(() => {
    l++, $();
  }, !0), { rows: t, total: n, offset: c, pageCount: u, pending: a, counting: s, error: r, refresh: x };
}
const ri = 150;
function oi(e) {
  const t = e.delay ?? ri, n = D(""), a = D("");
  let s = !1, r;
  const l = () => {
    clearTimeout(r), r = void 0;
  }, i = p(() => On(Rl(a.value), e.entity.value)), o = p(() => i.value.trim() !== ""), c = p(
    () => JSON.stringify([i.value, ...ja.map((g) => e.query.value[g])])
  ), u = pt(null), m = p(() => {
    const g = e.query.value;
    if (!o.value) return g;
    const w = u.value?.of === c.value ? u.value.page : 1;
    return { ...g, expr: Ea(g.expr, i.value), page: w };
  });
  be(n, (g) => {
    if (l(), !g.trim()) {
      s || (a.value = "");
      return;
    }
    s = !1, r = setTimeout(() => {
      r = void 0, a.value = n.value;
    }, t);
  }), be(
    e.query,
    () => {
      s && (s = !1, a.value = "");
    },
    { flush: "sync" }
  );
  const k = (g) => {
    l(), s = !0, n.value = "", !g() && s && (s = !1, a.value = "");
  };
  return Kn() && Kt(l), {
    text: n,
    live: m,
    drafting: o,
    setPage(g) {
      u.value = { of: c.value, page: Math.max(1, Math.floor(g)) };
    },
    commit() {
      const g = n.value.trim();
      if (!g) return;
      const w = Ea(
        e.query.value.expr,
        On(g, e.entity.value)
      );
      a.value = g, k(() => e.setExpression(w));
    },
    abandon() {
      l(), s = !1, n.value = "", a.value = "";
    },
    release: k
  };
}
const tn = (e) => e.separator !== !0 && e.heading !== !0 && e.disabled !== !0, li = ["aria-label"], ii = ["role", "aria-label"], ci = ["data-dc-item"], ui = {
  key: 0,
  class: "dc-menu__rule",
  role: "separator"
}, di = ["role", "aria-checked", "aria-haspopup", "aria-expanded", "aria-disabled", "disabled", "data-dc-item", "onClick", "onMouseenter"], fi = {
  class: "dc-menu__mark",
  "aria-hidden": "true"
}, pi = { class: "dc-menu__label dc-truncate" }, vi = {
  key: 0,
  class: "dc-menu__key dc-mono"
}, hi = {
  key: 1,
  class: "dc-menu__more",
  "aria-hidden": "true"
}, mi = /* @__PURE__ */ ne({
  __name: "MenuList",
  props: {
    items: {},
    at: {},
    label: {},
    autofocus: { type: Boolean }
  },
  emits: ["choose", "dismiss"],
  setup(e, { expose: t, emit: n }) {
    const a = e, s = n, r = D(null), l = D([]), i = D(null), o = D(null), c = D(null), u = D(!1), m = p(
      () => a.items.flatMap((L, I) => tn(L) ? [I] : [])
    ), k = p(() => {
      const L = [{ entries: [] }];
      return a.items.forEach((I, E) => {
        I.heading ? L.push({ heading: I, entries: [] }) : L[L.length - 1]?.entries.push({ item: I, index: E });
      }), L.filter((I) => I.entries.length > 0);
    }), g = D({ x: a.at.x, y: a.at.y });
    async function w() {
      g.value = { x: a.at.x, y: a.at.y }, await vt();
      const L = r.value?.getBoundingClientRect();
      if (!L) return;
      const I = 8;
      let E = a.at.x, V = a.at.y;
      if (E + L.width > window.innerWidth - I) {
        const q = a.at.mirrorX === void 0 ? null : a.at.mirrorX - L.width;
        E = q !== null && q >= I ? q : window.innerWidth - L.width - I;
      }
      V + L.height > window.innerHeight - I && (V = window.innerHeight - L.height - I), g.value = { x: Math.max(I, E), y: Math.max(I, V) };
    }
    const _ = p(() => ({ left: `${g.value.x}px`, top: `${g.value.y}px` }));
    function $(L) {
      i.value = L, L !== null && vt(() => l.value[L]?.focus());
    }
    function x(L, I) {
      const E = m.value;
      if (E.length === 0) return null;
      if (L === null) return I === 1 ? E[0] ?? null : E[E.length - 1] ?? null;
      const V = E.indexOf(L);
      return V === -1 ? E[0] ?? null : E[(V + I + E.length) % E.length] ?? null;
    }
    function M(L, I) {
      if (!a.items[L]?.items?.length) return;
      const V = l.value[L]?.getBoundingClientRect(), q = r.value?.getBoundingClientRect();
      !V || !q || (c.value = { x: q.right - 4, y: V.top - 4, mirrorX: q.left + 4 }, o.value = L, u.value = I);
    }
    function b(L) {
      const I = o.value;
      o.value = null, c.value = null, L && I !== null && $(I);
    }
    function S(L) {
      const I = a.items[L];
      if (!(!I || !tn(I))) {
        if (I.items?.length) {
          M(L, !0);
          return;
        }
        s("choose", I);
      }
    }
    function T(L) {
      const I = L.key;
      if (I === "Escape") {
        L.preventDefault(), L.stopPropagation(), o.value !== null ? b(!0) : s("dismiss");
        return;
      }
      if (I === "ArrowDown" || I === "ArrowUp") {
        L.preventDefault(), L.stopPropagation(), b(!1), $(x(i.value, I === "ArrowDown" ? 1 : -1));
        return;
      }
      if (I === "Home" || I === "End") {
        L.preventDefault(), L.stopPropagation(), b(!1), $(x(null, I === "Home" ? 1 : -1));
        return;
      }
      if (I === "ArrowRight") {
        const E = i.value;
        E !== null && a.items[E]?.items?.length && (L.preventDefault(), L.stopPropagation(), M(E, !0));
        return;
      }
      if (I === "ArrowLeft") {
        o.value !== null && (L.preventDefault(), L.stopPropagation(), b(!0));
        return;
      }
      if (I === "Enter" || I === " ") {
        const E = i.value;
        if (E === null) return;
        L.preventDefault(), L.stopPropagation(), S(E);
      }
    }
    function B(L) {
      const I = a.items[L];
      !I || !tn(I) || (o.value !== null && o.value !== L && b(!1), $(L), I.items?.length && M(L, !1));
    }
    return un(() => {
      w(), a.autofocus && $(x(null, 1));
    }), be(() => a.at, w, { deep: !0 }), be(() => a.items, () => void w(), { deep: !0 }), Ke(() => {
      o.value = null;
    }), t({ root: r }), (L, I) => {
      const E = tr("MenuList", !0);
      return d(), v("div", {
        ref_key: "root",
        ref: r,
        class: "dc-menu",
        role: "menu",
        "aria-label": e.label,
        style: Se(_.value),
        onKeydown: T
      }, [
        (d(!0), v(ee, null, de(k.value, (V, q) => (d(), v("div", {
          key: `${q}-${V.heading?.label ?? ""}`,
          class: "dc-menu__group",
          role: V.heading ? "group" : "none",
          "aria-label": V.heading?.label
        }, [
          V.heading ? (d(), v("div", {
            key: 0,
            class: "dc-menu__heading dc-truncate",
            "aria-hidden": "true",
            "data-dc-item": V.heading.id
          }, z(V.heading.label), 9, ci)) : A("", !0),
          (d(!0), v(ee, null, de(V.entries, ({ item: Q, index: he }) => (d(), v(ee, {
            key: Q.id ?? `${he}-${Q.label ?? ""}`
          }, [
            Q.separator ? (d(), v("div", ui)) : (d(), v("button", {
              key: 1,
              ref_for: !0,
              ref: (pe) => {
                pe && (l.value[he] = pe);
              },
              type: "button",
              class: "dc-menu__item",
              role: Q.checked === void 0 ? "menuitem" : "menuitemcheckbox",
              "aria-checked": Q.checked === void 0 ? void 0 : Q.checked,
              "aria-haspopup": Q.items?.length ? "menu" : void 0,
              "aria-expanded": Q.items?.length ? o.value === he : void 0,
              "aria-disabled": Q.disabled ? "true" : void 0,
              disabled: Q.disabled,
              "data-dc-item": Q.id,
              tabindex: "-1",
              onClick: (pe) => S(he),
              onMouseenter: (pe) => B(he)
            }, [
              C("span", fi, z(Q.checked ? "✓" : ""), 1),
              C("span", pi, z(Q.label), 1),
              Q.shortcut ? (d(), v("span", vi, z(Q.shortcut), 1)) : Q.items?.length ? (d(), v("span", hi, "›")) : A("", !0)
            ], 40, di))
          ], 64))), 128))
        ], 8, ii))), 128)),
        o.value !== null && c.value ? (d(), G(E, {
          key: o.value,
          items: e.items[o.value]?.items ?? [],
          at: c.value,
          label: e.items[o.value]?.label,
          autofocus: u.value,
          onChoose: I[0] || (I[0] = (V) => s("choose", V)),
          onDismiss: I[1] || (I[1] = (V) => b(!0))
        }, null, 8, ["items", "at", "label", "autofocus"])) : A("", !0)
      ], 44, li);
    };
  }
}), re = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [a, s] of t)
    n[a] = s;
  return n;
}, ts = /* @__PURE__ */ re(mi, [["__scopeId", "data-v-9b1413fa"]]), gi = { class: "dc-pick" }, yi = ["id"], _i = ["id", "aria-expanded", "aria-labelledby", "data-dc-value"], wi = { class: "dc-pick__label" }, ki = /* @__PURE__ */ ne({
  __name: "PickControl",
  props: {
    modelValue: {},
    options: {},
    label: {},
    mono: { type: Boolean }
  },
  emits: ["update:modelValue", "open", "close"],
  setup(e, { emit: t }) {
    const n = e, a = t, s = dn() ?? "dc-pick", r = D(null), l = D(null), i = D(null), o = D(!1), c = p(() => i.value !== null), u = D(null), m = p(
      () => n.options.find((S) => S.key === n.modelValue) ?? n.options[0]
    ), k = p(
      () => n.options.map((S) => ({
        id: S.key,
        label: S.label,
        checked: S.key === n.modelValue
      }))
    ), g = p(
      () => i.value ? { maxHeight: `${window.innerHeight - i.value.y - 8}px` } : void 0
    );
    function w(S) {
      const T = r.value?.getBoundingClientRect();
      T && (u.value = r.value?.closest(".dc-shell") ?? document.body, i.value = { x: T.left, y: T.bottom + 4, mirrorX: T.right }, o.value = S, a("open"));
    }
    function _(S) {
      i.value && a("close"), i.value = null, S && r.value?.focus();
    }
    function $() {
      c.value ? _(!0) : w(!1);
    }
    function x(S) {
      S.key !== "ArrowDown" && S.key !== "ArrowUp" || c.value || (S.preventDefault(), w(!0));
    }
    function M(S) {
      const T = S.target;
      T && (r.value?.contains(T) || l.value?.root?.contains(T) || _(!1));
    }
    be(c, (S) => {
      S ? window.addEventListener("pointerdown", M, !0) : window.removeEventListener("pointerdown", M, !0);
    }), Ke(() => window.removeEventListener("pointerdown", M, !0));
    function b(S) {
      _(!0), !(S.id === void 0 || S.id === n.modelValue) && a("update:modelValue", S.id);
    }
    return (S, T) => (d(), v("span", gi, [
      C("span", {
        id: `${P(s)}-name`,
        class: "dc-pick__name"
      }, z(e.label), 9, yi),
      C("button", {
        id: `${P(s)}-value`,
        ref_key: "trigger",
        ref: r,
        type: "button",
        class: lt(["dc-pick__button", { "dc-mono": e.mono }]),
        "aria-haspopup": "menu",
        "aria-expanded": c.value,
        "aria-labelledby": `${P(s)}-name ${P(s)}-value`,
        "data-dc-value": e.modelValue,
        onClick: $,
        onKeydown: x
      }, [
        C("span", wi, z(m.value?.label), 1)
      ], 42, _i),
      T[1] || (T[1] = C("span", {
        class: "dc-pick__mark",
        "aria-hidden": "true"
      }, "▾", -1)),
      i.value && u.value ? (d(), G(Wn, {
        key: 0,
        to: u.value
      }, [
        ie(ts, {
          ref_key: "menu",
          ref: l,
          class: "dc-pick__list",
          style: Se(g.value),
          items: k.value,
          at: i.value,
          label: e.label,
          autofocus: o.value,
          onChoose: b,
          onDismiss: T[0] || (T[0] = (B) => _(!0))
        }, null, 8, ["style", "items", "at", "label", "autofocus"])
      ], 8, ["to"])) : A("", !0)
    ]));
  }
}), Ns = /* @__PURE__ */ re(ki, [["__scopeId", "data-v-d21ebf1b"]]);
function bi(e) {
  const t = pt(/* @__PURE__ */ new Map()), n = D(!0);
  let a = 0, s;
  const r = () => {
    a++, s?.abort(), s = void 0;
  }, l = () => {
    r();
    const i = a, { signal: o } = s = new AbortController(), c = e.query.value, u = e.schema.value, m = e.entities.value, k = e.within?.value.trim() ?? "";
    n.value = c.expr.trim() === "" && !k;
    const g = /* @__PURE__ */ new Map();
    let w = !0;
    for (const _ of m) {
      const $ = Pr(_, c.expr), x = k ? Ua(k, $) : $;
      let M = !1;
      const b = (T) => {
        if (i !== a) return;
        if (w) {
          g.set(_.key, T);
          return;
        }
        const B = new Map(t.value);
        B.set(_.key, T), t.value = B;
      }, S = e.source.value.query({
        query: { ...c, entity: _.key, expr: x, facets: Ht(_), page: 1 },
        schema: u,
        entity: _,
        limit: 0,
        offset: 0,
        signal: o,
        progress: (T) => {
          M || b({ total: T, pending: !0, counted: !0 });
        }
      });
      S instanceof Promise ? (g.has(_.key) || g.set(_.key, { total: 0, pending: !0, counted: !1 }), S.then((T) => {
        M = !0, b({ total: T.total, pending: !1, counted: !0 });
      })) : (M = !0, g.set(_.key, { total: S.total, pending: !1, counted: !0 }));
    }
    w = !1, t.value = g;
  };
  return Kn() && Kt(r), { counts: t, pristine: n, refresh: l, cancel: r };
}
const $i = 25, Rr = (e, t) => e.toLowerCase() === t.toLowerCase();
function xi(e, t) {
  return e.find((n) => Rr(n.id, t));
}
function Ci(e) {
  const t = pt(/* @__PURE__ */ new Map()), n = /* @__PURE__ */ new Set(), a = (i) => {
    if (i.facetKey !== on) return null;
    const o = Tr(e.schema.value, i.field, i.value);
    return o ? { ...o, key: `${o.entity.key}:${o.id}` } : null;
  }, s = (i) => {
    const { entity: o, id: c } = i, u = e.query.value;
    return e.source.value.query({
      query: {
        ...u,
        entity: o.key,
        // The reference on its own. The rest of the query is about the rows on
        // screen, which are of another type entirely.
        expr: xr(o, c) ?? "",
        facets: Ht(o),
        sort: yt(o, u.sort, e.schema.value).key,
        page: 1
      },
      schema: e.schema.value,
      entity: o,
      limit: $i,
      offset: 0
    });
  }, r = (i, o) => {
    const c = En(Je(i.columns ?? [], "identity"), o);
    return c === it || Rr(c, o.id) ? "" : c;
  }, l = () => {
    const i = /* @__PURE__ */ new Map();
    for (const u of e.terms.value) {
      const m = a(u);
      m && !t.value.has(m.key) && !n.has(m.key) && i.set(m.key, m);
    }
    if (!i.size) return;
    const o = [...i.values()].map((u) => ({
      reference: u,
      outcome: s(u)
    })), c = (u) => {
      const m = new Map(t.value);
      u.forEach((k, g) => {
        const { reference: w } = o[g], _ = xi(k.rows, w.id);
        m.set(w.key, _ ? r(w.entity, _) : "");
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
const Si = ["data-dc-expanded"], Mi = {
  class: "dc-header__brand",
  "aria-hidden": "true"
}, Ei = { class: "dc-header__sr" }, Pi = {
  key: 2,
  class: "dc-header__within"
}, Ai = ["title"], Ti = ["data-dc-more", "title"], Li = {
  key: 0,
  class: "dc-header__or dc-mono",
  "aria-hidden": "true"
}, Ri = ["title", "aria-label", "onClick"], zi = ["onKeydown"], Ii = ["aria-expanded", "aria-controls"], Oi = {
  class: "dc-header__chevron",
  "aria-hidden": "true"
}, Fi = { class: "dc-header__sr" }, Ni = {
  key: 0,
  class: "dc-header__pages",
  "aria-label": "Pages"
}, Bi = ["disabled"], Di = ["title"], Hi = ["value", "onKeydown"], qi = {
  class: "dc-header__page-total",
  "aria-hidden": "true"
}, Vi = {
  class: "dc-header__sr",
  "aria-live": "polite"
}, Ki = ["disabled"], Wi = {
  key: 1,
  class: "dc-header__actions"
}, ji = "…", Ui = /* @__PURE__ */ ne({
  __name: "ShellHeader",
  props: {
    expanded: { type: Boolean },
    panelId: {},
    hideCount: { type: Boolean },
    views: {},
    typeChooser: {},
    pagesNote: {},
    hidePages: { type: Boolean },
    hideViews: { type: Boolean }
  },
  emits: ["toggle"],
  setup(e, { emit: t }) {
    const n = e, a = t, s = Wt(), r = Ee(), l = p(() => r.schema.value), i = p(
      () => r.hasFacets.value || !!r.liveQuery.value.expr.trim() || !!r.within.value
    ), o = p(() => l.value.formatCount ?? Lt), c = bi({
      source: r.source,
      schema: r.schema,
      // What each type holds of what is on screen, the draft's results included:
      // a count of the committed query would disagree with the rows under it.
      query: r.liveQuery,
      entities: r.entities,
      within: r.within
    });
    function u(K) {
      if (n.hideCount) return K.count;
      if (K.key === r.query.value.entity && i.value) return o.value(r.total.value);
      if (c.pristine.value) return K.count;
      const X = c.counts.value.get(K.key);
      return X ? X.counted ? `${X.pending ? "~" : ""}${o.value(X.total)}` : ji : K.count;
    }
    function m(K) {
      return `${K.label} · ${u(K)}`;
    }
    const k = p(() => [
      { key: "", label: "Everything" },
      ...r.entities.value.map((K) => ({ key: K.key, label: m(K) }))
    ]), g = p(() => {
      const K = r.within.value.trim();
      return K ? es({ ...r.query.value, expr: K, facets: {} }, null) : [];
    }), w = p(
      () => (n.views ?? [...ar]).map((K) => ({ key: K, label: tl[K] }))
    ), _ = p(() => Un(r.query.value.view, n.views)), $ = p(() => !n.hideViews && w.value.length > 1), x = p(() => n.typeChooser === "always" || r.query.value.entity !== null);
    function M(K) {
      r.setView(K);
    }
    const b = p(() => {
      const K = r.entity.value, Z = K?.keepsScope ? void 0 : K?.scope?.toLowerCase();
      return r.terms.value.filter((X) => X.facetKey !== Hn).map((X, Ge, W) => {
        const Y = W[Ge - 1];
        return {
          term: X,
          or: Y?.group !== void 0 && X.group !== void 0 && X.group !== Y.group,
          idle: !!Z && X.field?.toLowerCase() === Z
        };
      });
    }), S = Ci({
      source: r.source,
      schema: r.schema,
      query: r.query,
      // The scope's parts as well as the query's: it names a record more often
      // than a typed term does, being what a record's own page is built on.
      terms: p(() => [...g.value, ...r.terms.value])
    });
    function T(K) {
      return Ar(l.value, K)?.scopeLabel ?? K;
    }
    function B(K) {
      return K.replace(/\s*\([^()]*\)\s*$/, "");
    }
    function L(K) {
      const Z = S.nameOf(K);
      return Z ? `${K.negated ? "-" : ""}${T(K.field)}: ${B(Z)}` : K.label;
    }
    function I(K) {
      r.setEntity(K || null);
    }
    const E = D(null);
    function V() {
      r.abandonDraft(), E.value?.blur();
    }
    function q(K) {
      if (r.draft.value) return;
      const Z = b.value.at(-1);
      Z && (K.preventDefault(), r.removeTerm(Z.term));
    }
    function Q(K) {
      K.target?.closest("button, select, label, input") || a("toggle");
    }
    const he = D(null), pe = D("");
    function Be() {
      const K = he.value;
      if (!K) {
        pe.value = "";
        return;
      }
      const Z = K.scrollLeft > 1, X = K.scrollWidth - K.clientWidth - K.scrollLeft > 1;
      pe.value = Z && X ? "both" : Z ? "start" : X ? "end" : "";
    }
    let H = null;
    be(
      he,
      (K) => {
        H?.disconnect(), H = null, Be(), !(!K || typeof ResizeObserver > "u") && (H = new ResizeObserver(Be), H.observe(K));
      },
      { flush: "post" }
    ), be(b, Be, { flush: "post" }), Ke(() => H?.disconnect());
    const U = p(() => r.liveQuery.value.page), ge = p(
      () => !n.hidePages && (r.pageCount.value > 1 || !!n.pagesNote) && !Ka(r.query.value, n.views)
    ), oe = p(
      () => `${r.counting.value ? "~" : ""}${Lt(r.pageCount.value)}`
    ), xe = p(() => {
      let K = `Page ${Lt(U.value)} of ${oe.value}`;
      const Z = r.rows.value.length;
      if (Z) {
        const X = r.offset.value + 1, Ge = `${r.counting.value ? "~" : ""}${Lt(r.total.value)}`;
        K += ` — rows ${Lt(X)} to ${Lt(X + Z - 1)} of ${Ge}`;
      }
      return n.pagesNote ? `${K}
${n.pagesNote}` : K;
    }), Me = D(null), Re = p(() => Me.value ?? String(U.value)), Ue = p(
      () => `calc(${Math.max(2, String(r.pageCount.value).length)}ch + 10px)`
    );
    function F(K) {
      K.target.select();
    }
    function se(K) {
      const Z = K.target, X = Z.value.replace(/[^0-9]/g, "");
      Z.value !== X && (Z.value = X), Me.value = X;
    }
    function ve(K) {
      const Z = K.target, X = Number(Me.value);
      Me.value = null;
      const Ge = Number.isFinite(X) && X >= 1 ? Math.min(Math.trunc(X), Math.max(1, r.pageCount.value)) : U.value;
      Z.value = String(Ge), Ge !== U.value && r.setPage(Ge);
    }
    function We(K) {
      const Z = K.target;
      Me.value = null, Z.value = String(U.value), Z.blur();
    }
    return (K, Z) => (d(), v("div", {
      class: "dc-header",
      "data-dc-expanded": e.expanded ? "true" : "false"
    }, [
      C("div", {
        class: "dc-header__trigger",
        onClick: Q
      }, [
        s.brand ? (d(), v("button", {
          key: 0,
          type: "button",
          class: "dc-header__domain",
          "data-dc-brand": "",
          title: "Home",
          onClick: Z[0] || (Z[0] = (X) => P(r).reset())
        }, [
          C("span", Mi, [
            ye(K.$slots, "brand", {
              label: l.value.label
            }, void 0, !0)
          ]),
          C("span", Ei, z(l.value.label), 1)
        ])) : (d(), v("button", {
          key: 1,
          type: "button",
          class: "dc-header__domain",
          title: "Home",
          onClick: Z[1] || (Z[1] = (X) => P(r).reset())
        }, z(l.value.label), 1)),
        g.value.length ? (d(), v("span", Pi, [
          Z[7] || (Z[7] = C("span", { class: "dc-header__sr" }, "Within", -1)),
          (d(!0), v(ee, null, de(g.value, (X) => (d(), v("span", {
            key: `scope:${X.id}`,
            class: "dc-within dc-mono dc-truncate",
            title: L(X)
          }, z(L(X)), 9, Ai))), 128))
        ])) : A("", !0),
        C("div", {
          ref_key: "termBar",
          ref: he,
          class: "dc-header__query dc-header__terms",
          "data-dc-more": pe.value,
          title: P(r).summary.value,
          onScroll: Be
        }, [
          x.value ? (d(), G(Ns, {
            key: 0,
            class: "dc-header__pick dc-header__scope-select",
            label: "Type",
            "model-value": P(r).query.value.entity ?? "",
            options: k.value,
            onOpen: P(c).refresh,
            onClose: P(c).cancel,
            "onUpdate:modelValue": I
          }, null, 8, ["model-value", "options", "onOpen", "onClose"])) : A("", !0),
          $.value ? (d(), G(Ns, {
            key: 1,
            class: "dc-header__pick dc-header__view-select",
            label: "View",
            "model-value": _.value,
            options: w.value,
            "onUpdate:modelValue": M
          }, null, 8, ["model-value", "options"])) : A("", !0),
          (d(!0), v(ee, null, de(b.value, (X) => (d(), v(ee, {
            key: X.term.id
          }, [
            X.or ? (d(), v("span", Li, "or")) : A("", !0),
            C("button", {
              type: "button",
              class: lt(["dc-term dc-mono", { "dc-term--idle": X.idle }]),
              title: X.idle ? `Not applied to ${P(r).entity.value?.label} — remove ${L(X.term)}` : `Remove ${L(X.term)}`,
              "aria-label": `Remove ${L(X.term)}`,
              onClick: (Ge) => P(r).removeTerm(X.term)
            }, z(L(X.term)), 11, Ri)
          ], 64))), 128)),
          _t(C("input", {
            ref_key: "searchBox",
            ref: E,
            "onUpdate:modelValue": Z[2] || (Z[2] = (X) => P(r).draft.value = X),
            class: "dc-header__search dc-mono",
            type: "text",
            autocomplete: "off",
            spellcheck: "false",
            placeholder: "Search…",
            "aria-label": "Search",
            onKeydown: [
              Z[3] || (Z[3] = rt(Ve(
                //@ts-ignore
                (...X) => P(r).commitDraft && P(r).commitDraft(...X),
                ["prevent"]
              ), ["enter"])),
              rt(Ve(V, ["prevent"]), ["esc"]),
              rt(q, ["backspace"])
            ]
          }, null, 40, zi), [
            [Rn, P(r).draft.value]
          ])
        ], 40, Ti),
        C("button", {
          type: "button",
          class: "dc-header__toggle",
          "aria-expanded": e.expanded,
          "aria-controls": e.panelId,
          onClick: Z[4] || (Z[4] = (X) => a("toggle"))
        }, [
          C("span", Oi, z(e.expanded ? "▲" : "▼"), 1),
          C("span", Fi, z(e.expanded ? "Hide query panel" : "Edit query"), 1)
        ], 8, Ii)
      ]),
      ge.value ? (d(), v("nav", Ni, [
        C("button", {
          type: "button",
          class: "dc-header__step",
          "aria-label": "Previous page",
          disabled: U.value <= 1,
          onClick: Z[5] || (Z[5] = (X) => P(r).setPage(U.value - 1))
        }, [...Z[8] || (Z[8] = [
          C("span", { "aria-hidden": "true" }, "‹", -1)
        ])], 8, Bi),
        C("span", {
          class: "dc-header__page dc-mono",
          title: xe.value
        }, [
          C("input", {
            class: "dc-header__page-box dc-mono",
            type: "text",
            inputmode: "numeric",
            autocomplete: "off",
            "aria-label": "Page",
            style: Se({ width: Ue.value }),
            value: Re.value,
            onFocus: F,
            onInput: se,
            onKeydown: [
              rt(Ve(ve, ["prevent"]), ["enter"]),
              rt(Ve(We, ["prevent"]), ["esc"])
            ],
            onBlur: ve
          }, null, 44, Hi),
          C("span", qi, "/ " + z(oe.value), 1)
        ], 8, Di),
        C("span", Vi, z(xe.value), 1),
        C("button", {
          type: "button",
          class: "dc-header__step",
          "aria-label": "Next page",
          disabled: U.value >= P(r).pageCount.value,
          onClick: Z[6] || (Z[6] = (X) => P(r).setPage(U.value + 1))
        }, [...Z[9] || (Z[9] = [
          C("span", { "aria-hidden": "true" }, "›", -1)
        ])], 8, Ki)
      ])) : A("", !0),
      s.actions ? (d(), v("div", Wi, [
        ye(K.$slots, "actions", {}, void 0, !0)
      ])) : A("", !0)
    ], 8, Si));
  }
}), zr = /* @__PURE__ */ re(Ui, [["__scopeId", "data-v-dd28887e"]]), Gi = { class: "dc-facet" }, Qi = ["id"], Xi = { class: "dc-facet__body" }, Yi = ["aria-labelledby", "data-dc-max-rows", "data-dc-truncate"], Zi = ["aria-pressed", "data-dc-active", "title", "onClick"], Ji = ["aria-labelledby"], ec = ["aria-label", "placeholder", "onKeydown"], tc = ["aria-label", "placeholder", "onKeydown"], nc = ["aria-checked"], ac = { class: "dc-switch__text" }, sc = ["data-dc-active"], rc = /* @__PURE__ */ ne({
  __name: "FacetControl",
  props: {
    facet: {},
    value: {}
  },
  emits: ["update"],
  setup(e, { emit: t }) {
    const n = e, a = t, s = p(
      () => n.value.kind === "chips" ? new Set(n.value.selected) : /* @__PURE__ */ new Set()
    );
    function r(g) {
      if (n.value.kind !== "chips") return;
      const w = s.value.has(g) ? n.value.selected.filter((_) => _ !== g) : [...n.value.selected, g];
      a("update", { kind: "chips", selected: w });
    }
    const l = D(""), i = D("");
    be(
      () => n.value,
      (g) => {
        g.kind === "range" && (l.value = g.min === null ? "" : g.min, i.value = g.max === null ? "" : g.max);
      },
      { immediate: !0, deep: !0 }
    );
    function o(g) {
      if (typeof g == "number") return Number.isFinite(g) ? g : null;
      const w = g.trim();
      if (!w) return null;
      const _ = Number(w);
      return Number.isFinite(_) ? _ : null;
    }
    function c() {
      if (n.value.kind !== "range") return;
      const g = o(l.value), w = o(i.value);
      g === n.value.min && w === n.value.max || a("update", { kind: "range", min: g, max: w });
    }
    const u = p(() => {
      if (n.facet.kind !== "chips" || n.facet.maxRows === void 0) return null;
      const g = Math.floor(n.facet.maxRows);
      return Number.isFinite(g) && g >= 1 ? g : null;
    }), m = p(() => n.facet.kind === "chips" ? n.facet.truncate : void 0);
    function k() {
      n.value.kind === "toggle" && a("update", { kind: "toggle", on: !n.value.on });
    }
    return (g, w) => (d(), v("div", Gi, [
      C("span", {
        id: `dc-facet-${e.facet.key}`,
        class: "dc-facet__label"
      }, z(e.facet.label), 9, Qi),
      C("div", Xi, [
        e.facet.kind === "chips" && e.value.kind === "chips" ? (d(), v("div", {
          key: 0,
          class: "dc-facet__chips",
          role: "group",
          "aria-labelledby": `dc-facet-${e.facet.key}`,
          "data-dc-max-rows": u.value ?? void 0,
          "data-dc-truncate": m.value,
          style: Se(u.value ? { "--dc-facet-rows": u.value } : void 0)
        }, [
          (d(!0), v(ee, null, de(e.facet.options, (_) => (d(), v("button", {
            key: _,
            type: "button",
            class: "dc-chip",
            "aria-pressed": s.value.has(_),
            "data-dc-active": s.value.has(_) ? "true" : "false",
            title: m.value ? _ : void 0,
            onClick: ($) => r(_)
          }, z(_), 9, Zi))), 128))
        ], 12, Yi)) : e.facet.kind === "range" && e.value.kind === "range" ? (d(), v("div", {
          key: 1,
          class: "dc-facet__range",
          role: "group",
          "aria-labelledby": `dc-facet-${e.facet.key}`
        }, [
          _t(C("input", {
            "onUpdate:modelValue": w[0] || (w[0] = (_) => l.value = _),
            class: "dc-input dc-mono",
            type: "number",
            inputmode: "numeric",
            "aria-label": `${e.facet.label} minimum`,
            placeholder: String(e.facet.min),
            onChange: c,
            onBlur: c,
            onKeydown: rt(Ve(c, ["prevent"]), ["enter"])
          }, null, 40, ec), [
            [Rn, l.value]
          ]),
          w[2] || (w[2] = C("span", {
            class: "dc-facet__dash",
            "aria-hidden": "true"
          }, "–", -1)),
          _t(C("input", {
            "onUpdate:modelValue": w[1] || (w[1] = (_) => i.value = _),
            class: "dc-input dc-mono",
            type: "number",
            inputmode: "numeric",
            "aria-label": `${e.facet.label} maximum`,
            placeholder: String(e.facet.max),
            onChange: c,
            onBlur: c,
            onKeydown: rt(Ve(c, ["prevent"]), ["enter"])
          }, null, 40, tc), [
            [Rn, i.value]
          ])
        ], 8, Ji)) : e.facet.kind === "toggle" && e.value.kind === "toggle" ? (d(), v("button", {
          key: 2,
          type: "button",
          class: "dc-switch",
          role: "switch",
          "aria-checked": e.value.on,
          onClick: k
        }, [
          C("span", ac, z(e.facet.text), 1),
          C("span", {
            class: "dc-switch__track",
            "data-dc-active": e.value.on ? "true" : "false",
            "aria-hidden": "true"
          }, [...w[3] || (w[3] = [
            C("span", { class: "dc-switch__knob" }, null, -1)
          ])], 8, sc)
        ], 8, nc)) : A("", !0)
      ])
    ]));
  }
}), Ir = /* @__PURE__ */ re(rc, [["__scopeId", "data-v-9fa4911a"]]), oc = ["id"], lc = { class: "dc-panel__section dc-panel__rows" }, ic = { class: "dc-panel__row" }, cc = ["for"], uc = ["title", "aria-label", "onClick"], dc = ["id", "placeholder", "onKeydown"], fc = { class: "dc-panel__actions" }, pc = ["disabled"], vc = {
  key: 0,
  class: "dc-panel__section"
}, hc = /* @__PURE__ */ ne({
  __name: "QueryPanel",
  props: {
    panelId: {}
  },
  emits: ["close"],
  setup(e, { emit: t }) {
    const n = t, a = Wt(), s = Ee(), r = p(() => Pl(s.query.value.expr)), l = p(() => r.value.parts.map(fn)), i = D(r.value.text), o = D(null);
    be(
      () => r.value.text,
      (_) => {
        i.value = _;
      }
    );
    const c = p(() => i.value !== r.value.text);
    function u() {
      if (c.value) {
        const _ = On(i.value, s.entity.value);
        s.setExpression(zs(r.value.parts, _));
      }
      n("close");
    }
    function m(_) {
      const { parts: $, text: x } = r.value;
      s.setExpression(zs($.filter((M, b) => b !== _), x));
    }
    function k(_) {
      const { parts: $ } = r.value;
      i.value || !$.length || (_.preventDefault(), m($.length - 1));
    }
    function g() {
      i.value = "", s.clearFilters();
    }
    function w(_, $) {
      s.setFacet(_, $);
    }
    return vt(() => o.value?.focus()), (_, $) => (d(), v("div", {
      id: e.panelId,
      class: "dc-panel",
      role: "dialog",
      "aria-label": "Query",
      onKeydown: $[2] || ($[2] = rt(Ve((x) => n("close"), ["stop"]), ["esc"]))
    }, [
      C("section", lc, [
        C("div", ic, [
          C("label", {
            class: "dc-panel__field-label",
            for: `${e.panelId}-expr`
          }, "Expression", 8, cc),
          C("div", {
            class: "dc-field",
            onMousedown: $[1] || ($[1] = Ve((x) => o.value?.focus(), ["self", "prevent"]))
          }, [
            (d(!0), v(ee, null, de(l.value, (x, M) => (d(), v("button", {
              key: `${M}:${x}`,
              type: "button",
              class: "dc-part dc-mono",
              title: `Remove ${x}`,
              "aria-label": `Remove ${x}`,
              onClick: (b) => m(M)
            }, z(x), 9, uc))), 128)),
            _t(C("input", {
              id: `${e.panelId}-expr`,
              ref_key: "expressionField",
              ref: o,
              "onUpdate:modelValue": $[0] || ($[0] = (x) => i.value = x),
              class: "dc-expression dc-mono",
              type: "text",
              autocomplete: "off",
              spellcheck: "false",
              placeholder: l.value.length ? "" : P(s).schema.value.placeholder,
              onKeydown: [
                rt(Ve(u, ["prevent"]), ["enter"]),
                rt(k, ["backspace"])
              ]
            }, null, 40, dc), [
              [Rn, i.value]
            ])
          ], 32)
        ]),
        P(s).entity.value ? (d(!0), v(ee, { key: 0 }, de(P(s).entity.value.facets, (x) => (d(), G(Ir, {
          key: x.key,
          facet: x,
          value: P(s).query.value.facets[x.key],
          onUpdate: (M) => w(x.key, M)
        }, null, 8, ["facet", "value", "onUpdate"]))), 128)) : A("", !0),
        C("div", fc, [
          C("button", {
            type: "button",
            class: "dc-button dc-button--primary",
            onClick: u
          }, " Run query "),
          C("button", {
            type: "button",
            class: "dc-button",
            disabled: P(s).isPristine.value && !c.value,
            onClick: g
          }, " Reset ", 8, pc)
        ])
      ]),
      a["panel-section"] ? (d(), v("section", vc, [
        ye(_.$slots, "panel-section", {}, void 0, !0)
      ])) : A("", !0)
    ], 40, oc));
  }
}), Or = /* @__PURE__ */ re(hc, [["__scopeId", "data-v-640ae2f5"]]), mc = ["checked", "indeterminate"], Fr = /* @__PURE__ */ ne({
  __name: "PageTick",
  setup(e) {
    const t = Ee(), n = p(() => t.rows.value.filter((r) => t.isSelected(r)).length), a = p(
      () => t.rows.value.length > 0 && n.value === t.rows.value.length
    ), s = p(() => n.value > 0 && !a.value);
    return (r, l) => (d(), v("input", {
      class: "dc-tick",
      type: "checkbox",
      checked: a.value,
      indeterminate: s.value,
      "aria-label": "Select every row on this page",
      title: "Select every row on this page",
      onChange: l[0] || (l[0] = (i) => P(t).selectPage(!a.value))
    }, null, 40, mc));
  }
}), gc = {
  key: 0,
  class: "dc-actions"
}, yc = {
  key: 0,
  class: "dc-actions__select"
}, _c = {
  key: 0,
  class: "dc-actions__all"
}, wc = {
  class: "dc-actions__count",
  "aria-live": "polite"
}, kc = {
  key: 1,
  class: "dc-actions__count dc-actions__all",
  "aria-live": "polite"
}, bc = { class: "dc-actions__ops" }, $c = ["disabled"], xc = ["data-dc-operation", "disabled", "onClick"], Cc = ["disabled"], Sc = /* @__PURE__ */ ne({
  __name: "RecordActions",
  props: {
    views: {}
  },
  setup(e) {
    const t = e, n = Ee(), a = p(() => n.entity.value), s = p(() => !Ka(n.query.value, t.views)), r = p(() => s.value && n.selectable.value), l = p(
      () => Un(n.query.value.view, t.views) === "table"
    ), i = p(
      () => s.value && (r.value || !!(a.value?.create || a.value?.duplicate || a.value?.delete || a.value?.operations?.length))
    ), o = p(() => n.selection.value.ids.length), c = p(() => o.value ? `${o.value} selected` : l.value ? "None selected" : "Select all");
    function u(m) {
      return o.value ? `${m} ${o.value}` : m;
    }
    return (m, k) => i.value ? (d(), v("div", gc, [
      r.value ? (d(), v("div", yc, [
        l.value ? (d(), v("span", kc, z(c.value), 1)) : (d(), v("label", _c, [
          ie(Fr),
          C("span", wc, z(c.value), 1)
        ])),
        o.value ? (d(), v("button", {
          key: 2,
          type: "button",
          class: "dc-actions__clear",
          onClick: k[0] || (k[0] = (g) => P(n).clearSelection())
        }, " Clear ")) : A("", !0)
      ])) : A("", !0),
      C("div", bc, [
        a.value?.create ? (d(), v("button", {
          key: 0,
          type: "button",
          class: "dc-actions__op dc-actions__new",
          onClick: k[1] || (k[1] = (g) => P(n).create(a.value))
        }, [
          k[4] || (k[4] = C("span", {
            class: "dc-actions__plus",
            "aria-hidden": "true"
          }, "+", -1)),
          Le(" " + z(a.value.create), 1)
        ])) : A("", !0),
        a.value?.duplicate ? (d(), v("button", {
          key: 1,
          type: "button",
          class: "dc-actions__op",
          disabled: !o.value,
          onClick: k[2] || (k[2] = (g) => P(n).duplicate())
        }, z(u(a.value.duplicate)), 9, $c)) : A("", !0),
        (d(!0), v(ee, null, de(a.value?.operations ?? [], (g) => (d(), v("button", {
          key: g.key,
          type: "button",
          class: "dc-actions__op",
          "data-dc-operation": g.key,
          disabled: !o.value,
          onClick: (w) => P(n).operate(g.key)
        }, z(u(g.label)), 9, xc))), 128)),
        a.value?.delete ? (d(), v("button", {
          key: 2,
          type: "button",
          class: "dc-actions__op dc-actions__danger",
          disabled: !o.value,
          onClick: k[3] || (k[3] = (g) => P(n).delete())
        }, z(u(a.value.delete)), 9, Cc)) : A("", !0)
      ])
    ])) : A("", !0);
  }
}), Nr = /* @__PURE__ */ re(Sc, [["__scopeId", "data-v-8548a5bf"]]), Mc = ["href"], Ec = /* @__PURE__ */ ne({
  __name: "PressLink",
  props: {
    href: {}
  },
  emits: ["press"],
  setup(e, { emit: t }) {
    const n = e, a = t;
    function s(r) {
      if (n.href && Er(r)) {
        r.stopPropagation();
        return;
      }
      r.preventDefault(), a("press", Zn(r), r);
    }
    return (r, l) => e.href ? (d(), v("a", {
      key: 0,
      href: e.href,
      class: "dc-press",
      onClick: s
    }, [
      ye(r.$slots, "default", {}, void 0, !0)
    ], 8, Mc)) : (d(), v("button", {
      key: 1,
      type: "button",
      class: "dc-press",
      onClick: s
    }, [
      ye(r.$slots, "default", {}, void 0, !0)
    ]));
  }
}), tt = /* @__PURE__ */ re(Ec, [["__scopeId", "data-v-a9383f64"]]);
function Pc(e, t) {
  if (!e) return null;
  const n = je(e, t);
  return typeof n == "string" && n.trim() ? n : null;
}
const Ac = (e) => e == null || typeof e == "string" && !e.trim();
function Tc(e, t) {
  const n = Je(t, "state"), a = Je(t, "tint");
  return {
    identity: En(Je(t, "identity"), e),
    reference: En(Je(t, "reference"), e),
    metrics: dr(t, "metric").map((s) => ({
      column: s,
      label: s.label ?? "",
      text: qt(s, e)
    })),
    facts: t.filter((s) => s.cardLabel && !Ac(je(s, e))).map((s) => ({
      column: s,
      label: s.cardLabel,
      title: [s.label, s.hint].filter(Boolean).join(" — "),
      text: qt(s, e)
    })),
    state: n ? je(n, e) ?? null : null,
    updated: En(Je(t, "updated"), e),
    image: Pc(Je(t, "image"), e),
    tint: a ? je(a, e) ?? null : null
  };
}
function Br(e, t, n, a, s = !1) {
  const r = n?.columns ?? [];
  return {
    row: e,
    key: vl(e, t),
    entityLabel: e.entityLabel,
    entity: n,
    columns: r,
    ordinal: ol(t),
    parts: Tc(e, r),
    pinned: a,
    selected: s
  };
}
function Pt() {
  const e = Ee(), t = p(
    () => new Map(e.entities.value.map((n) => [n.key, n]))
  );
  return p(
    () => e.rows.value.map(
      (n, a) => Br(
        n,
        e.offset.value + a,
        t.value.get(n.entityKey) ?? null,
        e.isPinned(n),
        e.isSelected(n)
      )
    )
  );
}
const Lc = ["data-dc-status", "data-dc-tone"], Rc = /* @__PURE__ */ ne({
  __name: "StatusPill",
  props: {
    status: {},
    tone: {},
    label: {}
  },
  setup(e) {
    const t = e, n = p(() => t.label ?? t.status ?? "");
    return (a, s) => (d(), v("span", {
      class: "dc-pill",
      "data-dc-status": e.status,
      "data-dc-tone": e.tone
    }, z(n.value), 9, Lc));
  }
}), hn = /* @__PURE__ */ re(Rc, [["__scopeId", "data-v-686eb9b6"]]), zc = { key: 1 }, Ic = /* @__PURE__ */ ne({
  __name: "MetricDrill",
  props: {
    entry: {},
    column: {}
  },
  setup(e) {
    const t = e, n = Ee(), a = p(() => !t.entry.entity?.scope || !t.column.drill ? null : n.entities.value.find((c) => c.key === t.column.drill) ?? null), s = p(() => t.column.label ?? ""), r = p(() => qt(t.column, t.entry.row)), l = p(() => a.value ? n.drillHref(t.entry.row, a.value) : null);
    function i(o, c) {
      c.stopPropagation(), a.value && n.drill(t.entry.row, a.value, o);
    }
    return (o, c) => a.value ? (d(), G(tt, {
      key: 0,
      class: "dc-drill",
      href: l.value,
      title: `${s.value} of ${e.entry.parts.identity} — show the ${a.value.label.toLowerCase()}`,
      onPress: i
    }, {
      default: Pe(() => [
        ye(o.$slots, "default", {}, () => [
          Le(z(r.value), 1)
        ], !0)
      ]),
      _: 3
    }, 8, ["href", "title"])) : (d(), v("span", zc, [
      ye(o.$slots, "default", {}, () => [
        Le(z(r.value), 1)
      ], !0)
    ]));
  }
}), mn = /* @__PURE__ */ re(Ic, [["__scopeId", "data-v-d3e7f4e0"]]), Oc = ["data-dc-active", "aria-pressed", "aria-label"], Fc = /* @__PURE__ */ ne({
  __name: "PinStar",
  props: {
    row: {},
    pinned: { type: Boolean },
    name: {}
  },
  setup(e) {
    const t = e, n = Ee();
    function a(s) {
      s.stopPropagation(), n.togglePin(t.row);
    }
    return (s, r) => (d(), v("button", {
      type: "button",
      class: "dc-star",
      "data-dc-active": e.pinned ? "true" : "false",
      "aria-pressed": e.pinned,
      "aria-label": e.pinned ? `Unpin ${e.name}` : `Pin ${e.name}`,
      onClick: a
    }, z(e.pinned ? "★" : "☆"), 9, Oc));
  }
}), ns = /* @__PURE__ */ re(Fc, [["__scopeId", "data-v-ef63d763"]]), Nc = ["src"], Bc = /* @__PURE__ */ ne({
  __name: "RowPicture",
  props: {
    src: {}
  },
  setup(e) {
    const t = e, n = D(!1);
    return be(
      () => t.src,
      () => {
        n.value = !1;
      }
    ), (a, s) => e.src.trim() && !n.value ? (d(), v("img", {
      key: 0,
      class: "dc-picture",
      src: e.src,
      alt: "",
      loading: "lazy",
      decoding: "async",
      onError: s[0] || (s[0] = (r) => n.value = !0)
    }, null, 40, Nc)) : A("", !0);
  }
}), Jn = /* @__PURE__ */ re(Bc, [["__scopeId", "data-v-afaab300"]]), Dc = ["data-dc-standing", "title", "aria-label"], Hc = /* @__PURE__ */ ne({
  __name: "QueryMark",
  props: {
    entry: {}
  },
  setup(e) {
    const t = e, n = Ee(), a = p(() => Xn(t.entry.entity, t.entry.row)), s = p(() => Za(n.query.value.expr, a.value)), r = p(
      () => s.value === "in" ? `The query narrows to ${t.entry.parts.identity} — press to lift that` : `The query leaves out ${t.entry.parts.identity} — press to lift that`
    );
    function l(i) {
      i.stopPropagation(), n.setExpression(Mr(n.query.value.expr, a.value));
    }
    return (i, o) => s.value ? (d(), v("button", {
      key: 0,
      type: "button",
      class: "dc-standing",
      "data-dc-standing": s.value,
      title: r.value,
      "aria-label": r.value,
      onClick: l
    }, z(s.value === "in" ? "+" : "−"), 9, Dc)) : A("", !0);
  }
}), as = /* @__PURE__ */ re(Hc, [["__scopeId", "data-v-4b8d4166"]]), qc = ["aria-label"], Vc = ["data-dc-standing", "data-dc-active", "aria-checked", "title", "aria-label", "onClick"], Kc = /* @__PURE__ */ ne({
  __name: "StandingControl",
  props: {
    standing: {},
    mixed: { type: Boolean },
    name: {}
  },
  emits: ["set"],
  setup(e, { emit: t }) {
    const n = e, a = t, s = p(() => [
      { standing: "in", sign: "+", hint: `Narrow the query to ${n.name}` },
      { standing: null, sign: "·", hint: `Let the query say nothing about ${n.name}` },
      { standing: "out", sign: "−", hint: `Leave ${n.name} out of the query` }
    ]), r = (i) => !n.mixed && n.standing === i;
    function l(i, o) {
      i.stopPropagation(), a("set", o);
    }
    return (i, o) => (d(), v("span", {
      class: "dc-standing-control",
      role: "radiogroup",
      "aria-label": `Where the query stands on ${e.name}`
    }, [
      (d(!0), v(ee, null, de(s.value, (c) => (d(), v("button", {
        key: c.sign,
        type: "button",
        role: "radio",
        class: "dc-standing-control__choice",
        "data-dc-standing": c.standing ?? "none",
        "data-dc-active": r(c.standing) ? "true" : "false",
        "aria-checked": r(c.standing),
        title: c.hint,
        "aria-label": c.hint,
        onClick: (u) => l(u, c.standing)
      }, z(c.sign), 9, Vc))), 128))
    ], 8, qc));
  }
}), La = /* @__PURE__ */ re(Kc, [["__scopeId", "data-v-adaa8412"]]), Dr = /* @__PURE__ */ ne({
  __name: "RowStanding",
  props: {
    entry: {}
  },
  setup(e) {
    const t = e, n = Ee(), a = p(() => Xn(t.entry.entity, t.entry.row)), s = p(() => Za(n.query.value.expr, a.value));
    function r(l) {
      n.setExpression(Aa(n.query.value.expr, a.value, l));
    }
    return (l, i) => a.value !== null ? (d(), G(La, {
      key: 0,
      class: "dc-row-standing",
      standing: s.value,
      name: e.entry.parts.identity,
      onSet: r
    }, null, 8, ["standing", "name"])) : A("", !0);
  }
}), Wc = ["href", "title", "aria-label"], jc = /* @__PURE__ */ ne({
  __name: "OpenMark",
  props: {
    entry: {}
  },
  setup(e) {
    const t = e, n = Ee(), a = p(() => {
      const s = t.entry.row, r = n.recordHref?.(s) ?? null;
      return r ? n.pressHref(s) === r ? null : r : null;
    });
    return (s, r) => a.value ? (d(), v("a", {
      key: 0,
      class: "dc-open",
      href: a.value,
      target: "_blank",
      rel: "noopener noreferrer",
      title: a.value,
      "aria-label": `Open ${e.entry.parts.identity} in a new tab`,
      onClick: r[0] || (r[0] = Ve(() => {
      }, ["stop"]))
    }, "↗", 8, Wc)) : A("", !0);
  }
}), gn = /* @__PURE__ */ re(jc, [["__scopeId", "data-v-b00f390d"]]), Uc = /* @__PURE__ */ ne({
  __name: "ScopeMark",
  props: {
    entry: {}
  },
  setup(e) {
    const t = e, n = Ee(), a = p(
      () => n.narrowsOnPress.value ? null : t.entry.entity?.scope ?? null
    ), s = D(null);
    function r(u) {
      s.value = Zn(u).exclude ? "out" : "in";
    }
    function l(u) {
      r(u), window.addEventListener("keydown", r), window.addEventListener("keyup", r);
    }
    function i() {
      s.value = null, window.removeEventListener("keydown", r), window.removeEventListener("keyup", r);
    }
    Ke(i);
    const o = p(() => a.value ? n.drillHref(t.entry.row, null) : null);
    function c(u, m) {
      m.stopPropagation(), n.drill(t.entry.row, null, u);
    }
    return (u, m) => a.value ? (d(), G(tt, {
      key: 0,
      class: "dc-scope",
      href: o.value,
      "data-dc-pending": s.value ?? void 0,
      title: `Narrow everything to ${a.value}: ${e.entry.row.id} — ⌥-click to leave it out`,
      "aria-label": `Narrow everything to ${e.entry.parts.identity}`,
      onPointerenter: l,
      onPointermove: r,
      onPointerleave: i,
      onPress: c
    }, {
      default: Pe(() => [...m[0] || (m[0] = [
        Le(" → ", -1)
      ])]),
      _: 1
    }, 8, ["href", "data-dc-pending", "title", "aria-label"])) : A("", !0);
  }
}), yn = /* @__PURE__ */ re(Uc, [["__scopeId", "data-v-05d2c233"]]), Gc = ["checked", "aria-label"], At = /* @__PURE__ */ ne({
  __name: "SelectTick",
  props: {
    row: {},
    selected: { type: Boolean },
    name: {}
  },
  setup(e) {
    const t = e, n = Ee();
    function a(s) {
      s.stopPropagation(), n.toggleSelect(t.row);
    }
    return (s, r) => (d(), v("input", {
      class: "dc-tick",
      type: "checkbox",
      checked: e.selected,
      "aria-label": `Select ${e.name}`,
      onClick: a
    }, null, 8, Gc));
  }
}), Qc = { class: "dc-card__top dc-mono" }, Xc = { class: "dc-card__lead" }, Yc = {
  key: 2,
  class: "dc-card__entity"
}, Zc = { class: "dc-card__top-right" }, Jc = { class: "dc-card__names" }, eu = { class: "dc-card__primary" }, tu = {
  key: 0,
  class: "dc-card__secondary dc-mono"
}, nu = {
  key: 1,
  class: "dc-card__facts dc-mono"
}, au = ["title"], su = { class: "dc-card__fact-label" }, ru = {
  key: 0,
  class: "dc-card__metrics dc-mono"
}, ou = {
  key: 0,
  class: "dc-card__date"
}, lu = /* @__PURE__ */ ne({
  __name: "CardsView",
  setup(e) {
    const t = Ee(), n = Pt(), a = p(() => t.isEverything.value), s = (l) => l.entity?.card === "picture", r = p(() => n.value.length > 0 && n.value.every(s));
    return (l, i) => (d(), v("div", {
      class: lt(["dc-cards", { "dc-cards--pictures": r.value }])
    }, [
      (d(!0), v(ee, null, de(P(n), (o) => (d(), v("div", {
        key: o.key,
        class: lt(["dc-card", { "dc-card--picture": s(o) }])
      }, [
        C("div", Qc, [
          C("span", Xc, [
            P(t).selectable.value ? (d(), G(At, {
              key: 0,
              row: o.row,
              selected: o.selected,
              name: o.parts.identity
            }, null, 8, ["row", "selected", "name"])) : A("", !0),
            s(o) ? A("", !0) : (d(), v(ee, { key: 1 }, [
              Le(z(o.ordinal), 1)
            ], 64)),
            a.value ? (d(), v("span", Yc, z(o.entityLabel), 1)) : A("", !0)
          ]),
          C("span", Zc, [
            o.parts.state && !s(o) ? (d(), G(hn, {
              key: 0,
              status: o.parts.state
            }, null, 8, ["status"])) : A("", !0),
            s(o) ? (d(), G(as, {
              key: 1,
              entry: o
            }, null, 8, ["entry"])) : (d(), G(Dr, {
              key: 2,
              entry: o
            }, null, 8, ["entry"])),
            ie(yn, { entry: o }, null, 8, ["entry"]),
            ie(gn, { entry: o }, null, 8, ["entry"]),
            P(t).pinnable.value ? (d(), G(ns, {
              key: 3,
              row: o.row,
              name: o.parts.identity,
              pinned: o.pinned
            }, null, 8, ["row", "name", "pinned"])) : A("", !0)
          ])
        ]),
        ie(tt, {
          class: "dc-card__open",
          href: P(t).pressHref(o.row),
          onPress: (c) => P(t).activate(o.row, c)
        }, {
          default: Pe(() => [
            o.parts.image ? (d(), G(Jn, {
              key: 0,
              class: "dc-card__image",
              src: o.parts.image
            }, null, 8, ["src"])) : A("", !0),
            C("span", Jc, [
              C("span", eu, z(o.parts.identity), 1),
              s(o) ? A("", !0) : (d(), v("span", tu, z(o.parts.reference), 1)),
              o.parts.facts.length ? (d(), v("span", nu, [
                (d(!0), v(ee, null, de(o.parts.facts, (c) => (d(), v("span", {
                  key: c.column.key ?? c.label,
                  class: "dc-card__fact",
                  title: c.title || void 0
                }, [
                  C("span", su, z(c.label), 1),
                  Le(" " + z(c.text), 1)
                ], 8, au))), 128))
              ])) : A("", !0)
            ])
          ]),
          _: 2
        }, 1032, ["href", "onPress"]),
        s(o) ? A("", !0) : (d(), v("div", ru, [
          (d(!0), v(ee, null, de(o.parts.metrics.slice(0, 2), (c) => (d(), G(mn, {
            key: c.column.key ?? c.label,
            entry: o,
            column: c.column
          }, {
            default: Pe(() => [
              Le(z(c.label) + " " + z(c.text), 1)
            ]),
            _: 2
          }, 1032, ["entry", "column"]))), 128)),
          o.parts.updated ? (d(), v("span", ou, z(o.parts.updated), 1)) : A("", !0)
        ]))
      ], 2))), 128))
    ], 2));
  }
}), Hr = /* @__PURE__ */ re(lu, [["__scopeId", "data-v-e9bd4d6c"]]), iu = { class: "dc-grid" }, cu = { class: "dc-tile__scrim" }, uu = { class: "dc-tile__top dc-mono" }, du = { class: "dc-tile__chip" }, fu = { class: "dc-tile__caption" }, pu = { class: "dc-tile__secondary dc-truncate" }, vu = { class: "dc-tile__primary" }, hu = /* @__PURE__ */ ne({
  __name: "GridView",
  setup(e) {
    const t = Ee(), n = Pt();
    return (a, s) => (d(), v("div", iu, [
      (d(!0), v(ee, null, de(P(n), (r) => (d(), v("div", {
        key: r.key,
        class: "dc-grid__cell"
      }, [
        ie(tt, {
          class: "dc-tile",
          style: Se({ "--dc-tile-tint": r.parts.tint ?? void 0 }),
          href: P(t).pressHref(r.row),
          onPress: (l) => P(t).activate(r.row, l)
        }, {
          default: Pe(() => [
            r.parts.image ? (d(), G(Jn, {
              key: 0,
              class: "dc-tile__image",
              src: r.parts.image
            }, null, 8, ["src"])) : A("", !0),
            C("span", cu, [
              C("span", uu, [
                C("span", du, z(r.ordinal), 1)
              ]),
              C("span", fu, [
                C("span", pu, z(r.parts.reference), 1),
                C("span", vu, z(r.parts.identity), 1)
              ])
            ])
          ]),
          _: 2
        }, 1032, ["style", "href", "onPress"]),
        P(t).selectable.value ? (d(), G(At, {
          key: 0,
          class: "dc-grid__tick",
          row: r.row,
          selected: r.selected,
          name: r.parts.identity
        }, null, 8, ["row", "selected", "name"])) : A("", !0)
      ]))), 128))
    ]));
  }
}), qr = /* @__PURE__ */ re(hu, [["__scopeId", "data-v-12dd4d94"]]);
function Bs(e, t, n, a) {
  return (n - a * (t - 1)) / e;
}
function ha(e, t) {
  return e > 0 ? Math.min(t, e) : t;
}
function mu(e) {
  return e > 0 ? e : 1 / 0;
}
function gu(e, t, n) {
  const { width: a, height: s, gap: r = 0 } = n;
  if (!e.length) return [];
  if (!(a > 0) || !(s > 0)) return [{ items: [...e], height: s, filled: !1 }];
  const l = [];
  let i = [], o = 0, c = 0;
  for (const u of e) {
    const m = t(u), k = Math.max(m.ratio, Number.EPSILON), g = m.height && m.height > 0 ? Math.max(c, m.height) : c, w = ha(g, s), _ = Bs(o + k, i.length + 1, a, r);
    if (_ > w) {
      i.push(u), o += k, c = g;
      continue;
    }
    const $ = ha(c, s), x = i.length ? Bs(o, i.length, a, r) : 1 / 0;
    x <= mu(c) && x - $ < w - _ ? (l.push({ items: i, height: x, filled: !0 }), i = [u], o = k, c = m.height && m.height > 0 ? m.height : 0) : (l.push({ items: [...i, u], height: _, filled: !0 }), i = [], o = 0, c = 0);
  }
  return i.length && l.push({ items: i, height: ha(c, s), filled: !1 }), l;
}
const yu = { class: "dc-images" }, _u = {
  key: 1,
  class: "dc-images__blank",
  "aria-hidden": "true"
}, wu = 240, xn = 8, ku = 1, bu = /* @__PURE__ */ ne({
  __name: "ImagesView",
  setup(e) {
    const t = Ee(), n = Pt(), a = $s(/* @__PURE__ */ new Map()), s = $s(/* @__PURE__ */ new Set());
    function r(w, _) {
      const $ = _.target;
      $.naturalWidth > 0 && $.naturalHeight > 0 && a.set(w, { width: $.naturalWidth, height: $.naturalHeight });
    }
    function l(w) {
      const _ = w.parts.image;
      return _ && !s.has(_) ? _ : null;
    }
    function i(w) {
      const _ = l(w);
      return _ ? a.get(_) : void 0;
    }
    function o(w) {
      const _ = i(w);
      return _ ? { ratio: _.width / _.height, height: _.height } : { ratio: ku };
    }
    const c = D(null), u = D(0);
    let m = null;
    function k() {
      u.value = c.value?.clientWidth ?? 0;
    }
    un(() => {
      k(), !(!c.value || typeof ResizeObserver > "u") && (m = new ResizeObserver(k), m.observe(c.value));
    }), Ke(() => {
      m?.disconnect(), m = null;
    });
    const g = p(() => {
      const w = gu(n.value, o, {
        width: u.value,
        height: wu,
        gap: xn
      }), _ = [];
      let $ = 0;
      for (const x of w) {
        let M = 0;
        for (const b of x.items) {
          const S = o(b).ratio * x.height, T = i(b), B = T !== void 0 && T.height < x.height;
          _.push({
            entry: b,
            style: {
              top: `${$}px`,
              left: `${M}px`,
              width: `${S}px`,
              height: `${x.height}px`
            },
            picture: B ? { width: `${T.width}px`, height: `${T.height}px` } : { width: "100%", height: "100%" }
          }), M += S + xn;
        }
        $ += x.height + xn;
      }
      return { boxes: _, height: w.length ? $ - xn : 0 };
    });
    return (w, _) => (d(), v("div", yu, [
      C("div", {
        ref_key: "wall",
        ref: c,
        class: "dc-images__wall",
        style: Se({ height: `${g.value.height}px` })
      }, [
        (d(!0), v(ee, null, de(g.value.boxes, ({ entry: $, style: x, picture: M }) => (d(), v("div", {
          key: $.key,
          class: "dc-images__cell",
          style: Se(x)
        }, [
          ie(tt, {
            class: "dc-images__open",
            title: $.parts.identity,
            "aria-label": $.parts.identity,
            href: P(t).pressHref($.row),
            onPress: (b) => P(t).activate($.row, b)
          }, {
            default: Pe(() => [
              l($) ? (d(), G(Jn, {
                key: 0,
                class: "dc-images__picture",
                style: Se(M),
                src: l($),
                onLoad: (b) => r(l($), b),
                onError: (b) => s.add(l($))
              }, null, 8, ["style", "src", "onLoad", "onError"])) : (d(), v("span", _u, z($.parts.identity), 1))
            ]),
            _: 2
          }, 1032, ["title", "aria-label", "href", "onPress"]),
          P(t).selectable.value ? (d(), G(At, {
            key: 0,
            class: "dc-images__tick",
            row: $.row,
            selected: $.selected,
            name: $.parts.identity
          }, null, 8, ["row", "selected", "name"])) : A("", !0)
        ], 4))), 128))
      ], 4)
    ]));
  }
}), Vr = /* @__PURE__ */ re(bu, [["__scopeId", "data-v-d77205b8"]]), $u = { class: "dc-links" }, xu = { class: "dc-link__primary dc-truncate" }, Cu = { class: "dc-link__secondary dc-mono dc-truncate" }, Su = /* @__PURE__ */ ne({
  __name: "LinksView",
  setup(e) {
    const t = Ee(), n = Pt();
    return (a, s) => (d(), v("div", $u, [
      (d(!0), v(ee, null, de(P(n), (r) => (d(), v("span", {
        key: r.key,
        class: "dc-links__item"
      }, [
        P(t).selectable.value ? (d(), G(At, {
          key: 0,
          row: r.row,
          selected: r.selected,
          name: r.parts.identity
        }, null, 8, ["row", "selected", "name"])) : A("", !0),
        ie(tt, {
          class: "dc-link",
          href: P(t).pressHref(r.row),
          onPress: (l) => P(t).activate(r.row, l)
        }, {
          default: Pe(() => [
            C("span", xu, z(r.parts.identity), 1),
            C("span", Cu, z(r.parts.reference), 1)
          ]),
          _: 2
        }, 1032, ["href", "onPress"])
      ]))), 128))
    ]));
  }
}), Kr = /* @__PURE__ */ re(Su, [["__scopeId", "data-v-f47b75cf"]]), Mu = {
  class: "dc-list",
  role: "list"
}, Eu = { class: "dc-list__ordinal dc-mono" }, Pu = { class: "dc-list__identity" }, Au = { class: "dc-list__primary dc-truncate" }, Tu = { class: "dc-list__secondary dc-mono dc-truncate" }, Lu = {
  key: 1,
  class: "dc-list__entity dc-mono"
}, Ru = { class: "dc-list__metrics dc-mono" }, zu = { class: "dc-list__trailing" }, Iu = /* @__PURE__ */ ne({
  __name: "ListView",
  setup(e) {
    const t = Ee(), n = Pt(), a = p(() => t.isEverything.value);
    return (s, r) => (d(), v("div", Mu, [
      (d(!0), v(ee, null, de(P(n), (l) => (d(), v("div", {
        key: l.key,
        class: "dc-list__row",
        role: "listitem"
      }, [
        P(t).selectable.value ? (d(), G(At, {
          key: 0,
          class: "dc-list__tick",
          row: l.row,
          selected: l.selected,
          name: l.parts.identity
        }, null, 8, ["row", "selected", "name"])) : A("", !0),
        ie(Dr, {
          class: "dc-list__standing",
          entry: l
        }, null, 8, ["entry"]),
        ie(tt, {
          class: "dc-list__open",
          href: P(t).pressHref(l.row),
          onPress: (i) => P(t).activate(l.row, i)
        }, {
          default: Pe(() => [
            C("span", Eu, z(l.ordinal), 1),
            C("span", Pu, [
              C("span", Au, z(l.parts.identity), 1),
              C("span", Tu, z(l.parts.reference), 1)
            ])
          ]),
          _: 2
        }, 1032, ["href", "onPress"]),
        a.value ? (d(), v("span", Lu, z(l.entityLabel), 1)) : A("", !0),
        C("span", Ru, [
          (d(!0), v(ee, null, de(l.parts.metrics.slice(0, 2), (i) => (d(), G(mn, {
            key: i.column.key ?? i.label,
            entry: l,
            column: i.column
          }, null, 8, ["entry", "column"]))), 128))
        ]),
        C("span", zu, [
          l.parts.state ? (d(), G(hn, {
            key: 0,
            status: l.parts.state
          }, null, 8, ["status"])) : A("", !0),
          ie(yn, { entry: l }, null, 8, ["entry"]),
          ie(gn, { entry: l }, null, 8, ["entry"]),
          P(t).pinnable.value ? (d(), G(ns, {
            key: 1,
            row: l.row,
            name: l.parts.identity,
            pinned: l.pinned
          }, null, 8, ["row", "name", "pinned"])) : A("", !0)
        ])
      ]))), 128))
    ]));
  }
}), Ra = /* @__PURE__ */ re(Iu, [["__scopeId", "data-v-21065d56"]]), Ou = { class: "dc-preview" }, Fu = { class: "dc-preview__pager dc-mono" }, Nu = ["disabled"], Bu = { "aria-live": "polite" }, Du = ["disabled"], Hu = {
  key: 0,
  class: "dc-preview__card"
}, qu = ["src"], Vu = { class: "dc-preview__body" }, Ku = { class: "dc-preview__top" }, Wu = { class: "dc-preview__badges" }, ju = { class: "dc-preview__entity dc-mono" }, Uu = { class: "dc-preview__marks" }, Gu = { class: "dc-preview__primary" }, Qu = { class: "dc-preview__secondary dc-mono" }, Xu = { class: "dc-preview__fields" }, Yu = { class: "dc-preview__key" }, Zu = { class: "dc-preview__value dc-mono" }, Ju = /* @__PURE__ */ ne({
  __name: "PreviewView",
  setup(e) {
    const t = Ee(), n = Pt(), a = D(0);
    be(n, (o) => {
      a.value > o.length - 1 && (a.value = Math.max(0, o.length - 1));
    });
    const s = p(() => n.value[a.value]), r = p(() => {
      const o = s.value;
      if (!o) return [];
      const c = Je(o.columns, "reference"), u = Je(o.columns, "updated");
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
    return (o, c) => (d(), v("div", Ou, [
      C("div", Fu, [
        C("button", {
          type: "button",
          class: "dc-preview__step",
          "aria-label": "Previous result",
          disabled: a.value === 0,
          onClick: c[0] || (c[0] = (u) => i(-1))
        }, " ‹ ", 8, Nu),
        C("span", Bu, z(l.value), 1),
        C("button", {
          type: "button",
          class: "dc-preview__step",
          "aria-label": "Next result",
          disabled: a.value >= P(n).length - 1,
          onClick: c[1] || (c[1] = (u) => i(1))
        }, " › ", 8, Du)
      ]),
      s.value ? (d(), v("div", Hu, [
        C("div", {
          class: "dc-preview__media",
          style: Se({ background: s.value.parts.tint ?? void 0 }),
          "aria-hidden": "true"
        }, [
          s.value.parts.image ? (d(), v("img", {
            key: 0,
            class: "dc-preview__image",
            src: s.value.parts.image,
            alt: ""
          }, null, 8, qu)) : (d(), v(ee, { key: 1 }, [
            Le(" preview ")
          ], 64))
        ], 4),
        C("div", Vu, [
          C("div", Ku, [
            C("span", Wu, [
              P(t).selectable.value ? (d(), G(At, {
                key: 0,
                row: s.value.row,
                selected: s.value.selected,
                name: s.value.parts.identity
              }, null, 8, ["row", "selected", "name"])) : A("", !0),
              s.value.parts.state ? (d(), G(hn, {
                key: 1,
                status: s.value.parts.state
              }, null, 8, ["status"])) : A("", !0),
              C("span", ju, z(s.value.entityLabel), 1)
            ]),
            C("span", Uu, [
              ie(as, { entry: s.value }, null, 8, ["entry"]),
              ie(yn, { entry: s.value }, null, 8, ["entry"]),
              ie(gn, { entry: s.value }, null, 8, ["entry"]),
              P(t).pinnable.value ? (d(), G(ns, {
                key: 0,
                row: s.value.row,
                name: s.value.parts.identity,
                pinned: s.value.pinned
              }, null, 8, ["row", "name", "pinned"])) : A("", !0)
            ])
          ]),
          C("div", null, [
            C("div", Gu, z(s.value.parts.identity), 1),
            C("div", Qu, z(s.value.parts.reference), 1)
          ]),
          C("dl", Xu, [
            (d(!0), v(ee, null, de(r.value, (u) => (d(), v("div", {
              key: u.key,
              class: "dc-preview__field"
            }, [
              C("dt", Yu, z(u.key), 1),
              C("dd", Zu, [
                u.column && s.value ? (d(), G(mn, {
                  key: 0,
                  entry: s.value,
                  column: u.column
                }, null, 8, ["entry", "column"])) : (d(), v(ee, { key: 1 }, [
                  Le(z(u.value), 1)
                ], 64))
              ])
            ]))), 128))
          ]),
          ie(tt, {
            class: "dc-preview__open",
            href: s.value ? P(t).pressHref(s.value.row) : null,
            onPress: c[2] || (c[2] = (u) => s.value && P(t).activate(s.value.row, u))
          }, {
            default: Pe(() => [...c[3] || (c[3] = [
              Le(" Open record → ", -1)
            ])]),
            _: 1
          }, 8, ["href"])
        ])
      ])) : A("", !0)
    ]));
  }
}), Wr = /* @__PURE__ */ re(Ju, [["__scopeId", "data-v-59e0d33b"]]);
function ed() {
  const e = Ee();
  return p(() => fl(e.schema.value, e.entity.value));
}
const td = {
  key: 5,
  class: "dc-cell__text"
}, nd = /* @__PURE__ */ ne({
  __name: "ColumnCell",
  props: {
    column: {},
    entry: {}
  },
  setup(e) {
    const t = e, n = Ee(), a = p(() => t.column.kind ?? "text"), s = p(() => je(t.column, t.entry.row)), r = p(
      () => a.value === "ordinal" ? t.entry.ordinal : qt(t.column, t.entry.row)
    ), l = p(() => s.value), i = p(() => t.column.activate === !0 || !!t.column.click), o = p(() => Sa(t.column)), c = p(() => fr(t.column, t.entry.row));
    function u(g) {
      i.value && (g.stopPropagation(), m(Zn(g)));
    }
    function m(g) {
      t.column.click?.(t.entry.row, g), t.column.activate && n.activate(t.entry.row, g);
    }
    const k = p(
      () => t.column.activate && !t.column.click ? n.pressHref(t.entry.row) : null
    );
    return (g, w) => a.value === "component" && e.column.component ? (d(), G(jn(e.column.component), {
      key: 0,
      row: e.entry.row,
      entry: e.entry,
      value: s.value,
      column: e.column
    }, null, 8, ["row", "entry", "value", "column"])) : a.value === "status" ? (d(), G(hn, {
      key: 1,
      status: l.value
    }, null, 8, ["status"])) : a.value === "image" ? (d(), G(Jn, {
      key: 2,
      class: "dc-cell__image",
      src: typeof s.value == "string" ? s.value : "",
      style: Se({ maxHeight: e.column.height }),
      onClick: u
    }, null, 8, ["src", "style"])) : e.column.drill ? (d(), G(mn, {
      key: 3,
      entry: e.entry,
      column: e.column
    }, null, 8, ["entry", "column"])) : i.value ? (d(), G(tt, {
      key: 4,
      class: lt(["dc-table__open", { "dc-truncate": o.value }]),
      href: k.value,
      title: c.value,
      onPress: w[0] || (w[0] = (_, $) => {
        $.stopPropagation(), m(_);
      })
    }, {
      default: Pe(() => [
        Le(z(r.value), 1)
      ]),
      _: 1
    }, 8, ["class", "href", "title"])) : (d(), v("span", td, z(r.value), 1));
  }
}), Ds = /* @__PURE__ */ re(nd, [["__scopeId", "data-v-af24c370"]]), ad = {
  key: 0,
  class: "dc-table__none"
}, sd = { class: "dc-table__detail" }, rd = ["data-dc-wrap"], od = {
  key: 0,
  class: "dc-table__pick",
  scope: "col"
}, ld = {
  key: 1,
  class: "dc-table__standing",
  scope: "col"
}, id = ["data-dc-align", "data-dc-hide", "aria-sort", "title"], cd = ["onClick"], ud = {
  key: 2,
  class: "dc-table__head"
}, dd = ["onClick"], fd = {
  key: 0,
  class: "dc-table__pick"
}, pd = {
  key: 1,
  class: "dc-table__standing"
}, vd = ["data-dc-align", "data-dc-hide", "title"], hd = {
  key: 0,
  class: "dc-table__name"
}, md = /* @__PURE__ */ ne({
  __name: "TableView",
  setup(e) {
    const t = Ee(), n = Pt(), a = ed();
    function s(E, V) {
      const q = t.pressHref(E);
      if (q && Er(V)) {
        const Q = V.shiftKey ? `noopener,popup,width=${window.outerWidth},height=${window.outerHeight}` : "noopener";
        window.open(q, "_blank", Q);
        return;
      }
      t.activate(E, Zn(V));
    }
    function r(E) {
      const V = bl(E, t.entity.value), q = V ? `Shortcut: ${V}` : void 0;
      return [E.hint, q].filter(Boolean).join(`
`) || void 0;
    }
    const l = p(() => {
      const E = a.value.find((q) => q.scope);
      return E || ((t.entity.value ? !!t.entity.value.href : t.entities.value.some((q) => q.href)) ? a.value.find((q) => q.activate) : void 0);
    }), i = p(
      () => t.entity.value ? !!t.entity.value.scope : t.entities.value.some((E) => E.scope)
    ), o = (E) => Xn(E.entity, E.row), c = (E) => Za(t.query.value.expr, o(E));
    function u(E, V) {
      t.setExpression(Aa(t.query.value.expr, o(E), V));
    }
    const m = p(() => {
      const E = n.value.filter((q) => o(q) !== null), V = E.filter((q) => q.selected);
      return V.length ? V : E;
    }), k = p(() => m.value.some((E) => E.selected)), g = p(() => {
      const E = m.value[0];
      return E ? c(E) : null;
    }), w = p(
      () => m.value.some((E) => c(E) !== g.value)
    ), _ = p(
      () => k.value ? "the ticked rows" : "every row on this page"
    );
    function $(E) {
      t.setExpression(
        m.value.reduce(
          (V, q) => Aa(V, o(q), E),
          t.query.value.expr
        )
      );
    }
    const x = p(
      () => a.value.some((E) => E.kind === "image" || E.height !== void 0)
    );
    function M(E) {
      E && (t.query.value.sort === E ? t.toggleDirection() : t.setSort(E));
    }
    const b = p(() => t.entity.value?.label ?? "The result set"), S = p(() => new Set(t.sorts.value.map((E) => E.key))), T = (E) => E.sort !== void 0 && S.value.has(E.sort), B = (E) => {
      if (T(E))
        return t.query.value.sort !== E.sort ? "none" : t.query.value.dir === "desc" ? "descending" : "ascending";
    };
    function L(E) {
      return [
        Ms(E),
        E.muted ? "dc-table__muted" : "",
        E.mono ? "dc-mono" : "",
        Sa(E) ? "dc-truncate" : ""
      ].filter(Boolean).join(" ");
    }
    function I(E, V) {
      if (!(!Sa(E) || E.activate || E.click))
        return fr(E, V.row);
    }
    return (E, V) => P(a).length ? (d(), v("table", {
      key: 1,
      class: "dc-table",
      "data-dc-wrap": x.value ? "" : void 0
    }, [
      C("thead", null, [
        C("tr", null, [
          P(t).selectable.value ? (d(), v("th", od, [
            ie(Fr)
          ])) : A("", !0),
          i.value ? (d(), v("th", ld, [
            m.value.length ? (d(), G(La, {
              key: 0,
              standing: g.value,
              mixed: w.value,
              name: _.value,
              onSet: $
            }, null, 8, ["standing", "mixed", "name"])) : A("", !0)
          ])) : A("", !0),
          (d(!0), v(ee, null, de(P(a), (q, Q) => (d(), v("th", {
            key: P(Cs)(q, Q),
            scope: "col",
            class: lt(P(Ms)(q)),
            style: Se({ width: q.width }),
            "data-dc-align": P(Ss)(q),
            "data-dc-hide": q.hideBelow,
            "aria-sort": B(q),
            title: r(q)
          }, [
            T(q) ? (d(), v("button", {
              key: 0,
              type: "button",
              class: "dc-table__sort",
              onClick: (he) => M(q.sort)
            }, z(q.label), 9, cd)) : (d(), v(ee, { key: 1 }, [
              Le(z(q.label), 1)
            ], 64)),
            q.header ? (d(), v("span", ud, [
              (d(), G(jn(q.header), {
                column: q,
                entity: P(t).entity.value
              }, null, 8, ["column", "entity"]))
            ])) : A("", !0)
          ], 14, id))), 128))
        ])
      ]),
      C("tbody", null, [
        (d(!0), v(ee, null, de(P(n), (q) => (d(), v("tr", {
          key: q.key,
          class: "dc-table__row",
          onClick: (Q) => s(q.row, Q)
        }, [
          P(t).selectable.value ? (d(), v("td", fd, [
            ie(At, {
              row: q.row,
              selected: q.selected,
              name: q.parts.identity
            }, null, 8, ["row", "selected", "name"])
          ])) : A("", !0),
          i.value ? (d(), v("td", pd, [
            o(q) !== null ? (d(), G(La, {
              key: 0,
              standing: c(q),
              name: q.parts.identity,
              onSet: (Q) => u(q, Q)
            }, null, 8, ["standing", "name", "onSet"])) : A("", !0)
          ])) : A("", !0),
          (d(!0), v(ee, null, de(P(a), (Q, he) => (d(), v("td", {
            key: P(Cs)(Q, he),
            class: lt(L(Q)),
            "data-dc-align": P(Ss)(Q),
            "data-dc-hide": Q.hideBelow,
            title: I(Q, q)
          }, [
            Q === l.value ? (d(), v("span", hd, [
              ie(Ds, {
                column: Q,
                entry: q
              }, null, 8, ["column", "entry"]),
              ie(yn, { entry: q }, null, 8, ["entry"]),
              ie(gn, { entry: q }, null, 8, ["entry"])
            ])) : (d(), G(Ds, {
              key: 1,
              column: Q,
              entry: q
            }, null, 8, ["column", "entry"]))
          ], 10, vd))), 128))
        ], 8, dd))), 128))
      ])
    ], 8, rd)) : (d(), v("p", ad, [
      V[2] || (V[2] = C("span", { class: "dc-table__headline" }, "No columns declared", -1)),
      C("span", sd, [
        Le(z(b.value) + " has no ", 1),
        V[0] || (V[0] = C("code", null, "columns", -1)),
        V[1] || (V[1] = Le(" in the schema, so there is no table to draw. ", -1))
      ])
    ]));
  }
}), jr = /* @__PURE__ */ re(md, [["__scopeId", "data-v-3c4caecf"]]);
function gd(e) {
  const t = pt([]), n = D(!1), a = pt(null);
  let s = 0;
  const r = (o, c, u, m, k) => ({
    entity: o,
    rows: e.limit.value > 0 ? c.rows.map((g, w) => Br(g, w, o, e.isPinned(g.id))) : [],
    total: c.total,
    count: u ? o.count : String(c.total),
    pinned: yd(m, c, k)
  }), l = () => {
    const o = ++s, c = e.query.value, u = e.schema.value, m = e.entities.value, k = e.limit.value, g = e.within?.value.trim() ?? "", w = Va(c) && !g, _ = g ? Ua(g, c.expr) : c.expr, $ = m.map((x) => ({
      entity: x,
      // Scope the query to this entity, keeping the expression and ordering
      // but dropping facets, which belong to whichever entity is selected.
      outcome: e.source.value.query({
        // Each card is the top few of its type, wherever the shell's own
        // result set has been paged to — so this asks for the first page.
        query: { ...c, entity: x.key, expr: _, facets: Ht(x), page: 1 },
        schema: u,
        entity: x,
        /*
         * One row where none are shown, not none: to a source a limit of 0 is
         * no limit, which would fetch every record of every type to draw a
         * count. The one row is still read — it is what says whether the type
         * holds nothing but the record the query named.
         */
        limit: Math.max(k, 1),
        offset: 0
      })
    }));
    if ($.every(({ outcome: x }) => !(x instanceof Promise))) {
      t.value = $.map(
        ({ entity: x, outcome: M }) => r(x, M, w, u, _)
      ), a.value = null, n.value = !1;
      return;
    }
    n.value = !0, Promise.all($.map(({ outcome: x }) => Promise.resolve(x))).then((x) => {
      o === s && (t.value = x.map(
        (M, b) => r($[b].entity, M, w, u, _)
      ), a.value = null);
    }).catch((x) => {
      o === s && (a.value = x, t.value = []);
    }).finally(() => {
      o === s && (n.value = !1);
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
function yd(e, t, n) {
  const a = t.rows[0];
  if (t.total !== 1 || t.rows.length !== 1 || !a)
    return !1;
  const s = n.trim();
  if (!s)
    return !1;
  const r = Bn(e, a);
  return !!r && vn(s, r) === s;
}
const _d = ["data-dc-pending", "data-dc-heads-only"], wd = {
  key: 0,
  class: "dc-types__state",
  role: "alert"
}, kd = {
  key: 1,
  class: "dc-types__state",
  "aria-live": "polite"
}, bd = {
  key: 2,
  class: "dc-types__state"
}, $d = ["data-dc-empty"], xd = { class: "dc-type__name" }, Cd = { class: "dc-type__count dc-mono" }, Sd = { class: "dc-type__sr" }, Md = {
  key: 0,
  class: "dc-type__description"
}, Ed = {
  key: 0,
  class: "dc-type__empty"
}, Pd = { class: "dc-type__identity" }, Ad = { class: "dc-type__primary dc-truncate" }, Td = { class: "dc-type__secondary dc-mono dc-truncate" }, Ld = { class: "dc-type__trailing dc-mono" }, Rd = { class: "dc-type__metric-value" }, zd = { class: "dc-type__metric-label" }, Id = {
  key: 0,
  class: "dc-type__date"
}, Od = ["onClick"], Fd = /* @__PURE__ */ ne({
  __name: "TypeCardsView",
  setup(e) {
    const t = Ee(), { previews: n, pending: a, error: s } = gd({
      source: t.source,
      schema: t.schema,
      // The query as the results are read under it, so a word being typed in the
      // header narrows the cards as it narrows any list — see `liveQuery`.
      query: t.liveQuery,
      entities: t.entities,
      limit: t.previewsPerType,
      within: t.within,
      isPinned: (o) => t.isPinnedId(o)
    }), r = p(
      () => !t.isPristine.value || !!t.within.value || t.drafting.value
    ), l = p(() => t.previewsPerType.value <= 0), i = p(
      () => n.value.filter(
        (o) => !o.pinned && (o.total > 0 || !l.value && o.entity.create)
      )
    );
    return (o, c) => (d(), v("div", {
      class: "dc-types",
      "data-dc-pending": P(a) ? "true" : "false",
      "data-dc-heads-only": l.value ? "true" : "false"
    }, [
      ye(o.$slots, "before", {}, void 0, !0),
      P(s) ? (d(), v("p", wd, " Could not load results: " + z(P(s) instanceof Error ? P(s).message : "the data source failed."), 1)) : !i.value.length && P(a) ? (d(), v("p", kd, " Running query… ")) : i.value.length ? A("", !0) : (d(), v("p", bd, z(r.value ? "Nothing matches this query" : "Nothing here yet"), 1)),
      (d(!0), v(ee, null, de(i.value, (u) => (d(), v("section", {
        key: u.entity.key,
        class: "dc-type",
        "data-dc-empty": u.total ? "false" : "true"
      }, [
        ie(tt, {
          class: "dc-type__head",
          href: P(t).entityHref(u.entity.key),
          onPress: (m) => P(t).setEntity(u.entity.key)
        }, {
          default: Pe(() => [
            C("span", xd, z(u.entity.label), 1),
            C("span", Cd, z(u.count), 1),
            c[0] || (c[0] = C("span", {
              class: "dc-type__go",
              "aria-hidden": "true"
            }, "→", -1)),
            C("span", Sd, "Show only " + z(u.entity.label.toLowerCase()), 1),
            u.entity.description ? (d(), v("span", Md, z(u.entity.description), 1)) : A("", !0)
          ]),
          _: 2
        }, 1032, ["href", "onPress"]),
        u.total ? A("", !0) : (d(), v("p", Ed, z(r.value ? "No matches" : "Nothing here yet"), 1)),
        (d(!0), v(ee, null, de(u.rows, (m) => (d(), v("div", {
          key: m.key,
          class: "dc-type__row"
        }, [
          ie(tt, {
            class: "dc-type__open",
            href: P(t).pressHref(m.row),
            onPress: (k) => P(t).activate(m.row, k)
          }, {
            default: Pe(() => [
              C("span", Pd, [
                C("span", Ad, z(m.parts.identity), 1),
                C("span", Td, z(m.parts.reference), 1)
              ])
            ]),
            _: 2
          }, 1032, ["href", "onPress"]),
          C("span", Ld, [
            (d(!0), v(ee, null, de(m.parts.metrics.slice(0, 1), (k) => (d(), G(mn, {
              key: k.column.key ?? k.label,
              class: "dc-type__metric",
              entry: m,
              column: k.column
            }, {
              default: Pe(() => [
                C("span", Rd, z(k.text), 1),
                C("span", zd, z(k.label), 1)
              ]),
              _: 2
            }, 1032, ["entry", "column"]))), 128)),
            m.parts.updated ? (d(), v("span", Id, z(m.parts.updated), 1)) : A("", !0),
            ie(as, { entry: m }, null, 8, ["entry"]),
            ie(yn, { entry: m }, null, 8, ["entry"]),
            ie(gn, { entry: m }, null, 8, ["entry"])
          ])
        ]))), 128)),
        u.entity.create && !l.value ? (d(), v("button", {
          key: 1,
          type: "button",
          class: "dc-type__new",
          onClick: (m) => P(t).create(u.entity)
        }, [
          c[1] || (c[1] = C("span", {
            class: "dc-type__plus",
            "aria-hidden": "true"
          }, "+", -1)),
          Le(" " + z(u.entity.create), 1)
        ], 8, Od)) : A("", !0)
      ], 8, $d))), 128)),
      ye(o.$slots, "after", {}, void 0, !0)
    ], 8, _d));
  }
}), Ur = /* @__PURE__ */ re(Fd, [["__scopeId", "data-v-91923a83"]]), Nd = ["data-dc-pending"], Bd = {
  key: 0,
  class: "dc-results__state dc-results__state--loading",
  "aria-live": "polite"
}, Dd = {
  key: 2,
  class: "dc-results__state",
  role: "alert"
}, Hd = { class: "dc-results__detail" }, qd = {
  key: 3,
  class: "dc-results__state",
  "aria-live": "polite"
}, Vd = {
  key: 4,
  class: "dc-results__state"
}, Kd = { class: "dc-results__detail" }, Wd = /* @__PURE__ */ ne({
  __name: "ResultsArea",
  props: {
    views: {},
    loading: { type: Boolean }
  },
  setup(e) {
    const t = e, n = Ee(), a = Wt(), s = {
      list: Ra,
      cards: Hr,
      grid: qr,
      images: Vr,
      table: jr,
      links: Kr,
      preview: Wr
    }, r = p(() => Ka(n.query.value, t.views)), l = p(() => Un(n.query.value.view, t.views)), i = p(() => s[l.value] ?? Ra), o = p(() => n.rows.value.length > 0), c = p(() => n.error.value !== null), u = D(null);
    return be(
      // The page on screen, which is the draft's own while one is being typed.
      () => n.liveQuery.value.page,
      () => {
        u.value && (u.value.scrollTop = 0);
      }
    ), (m, k) => (d(), v("div", {
      ref_key: "scroller",
      ref: u,
      class: "dc-results",
      "data-dc-pending": P(n).pending.value ? "true" : "false"
    }, [
      e.loading ? (d(), v("p", Bd, [...k[1] || (k[1] = [
        C("span", { class: "dc-results__detail" }, "Loading…", -1)
      ])])) : r.value ? (d(), G(Ur, { key: 1 }, Mn({ _: 2 }, [
        a["cards-before"] ? {
          name: "before",
          fn: Pe(() => [
            ye(m.$slots, "cards-before", {}, void 0, !0)
          ]),
          key: "0"
        } : void 0,
        a["cards-after"] ? {
          name: "after",
          fn: Pe(() => [
            ye(m.$slots, "cards-after", {}, void 0, !0)
          ]),
          key: "1"
        } : void 0
      ]), 1024)) : c.value ? (d(), v("p", Dd, [
        k[2] || (k[2] = C("span", { class: "dc-results__headline" }, "Could not load results", -1)),
        C("span", Hd, z(P(n).error.value instanceof Error ? P(n).error.value.message : "The data source failed."), 1)
      ])) : !o.value && P(n).pending.value ? (d(), v("p", qd, [...k[3] || (k[3] = [
        C("span", { class: "dc-results__detail" }, "Running query…", -1)
      ])])) : o.value ? (d(), G(jn(i.value), { key: 5 })) : (d(), v("div", Vd, [
        k[4] || (k[4] = C("span", { class: "dc-results__headline" }, "Nothing matches this query", -1)),
        C("span", Kd, z(P(n).summary.value), 1),
        P(n).isPristine.value ? A("", !0) : (d(), v("button", {
          key: 0,
          type: "button",
          class: "dc-results__clear",
          onClick: k[0] || (k[0] = (g) => P(n).clearFilters())
        }, z(P(n).isEverything.value ? "Clear filters" : "Search everything instead"), 1))
      ]))
    ], 8, Nd));
  }
}), Gr = /* @__PURE__ */ re(Wd, [["__scopeId", "data-v-eef33cd7"]]), jd = ["data-dc-theme"], Ud = ["data-dc-width", "data-dc-align"], Gd = { class: "dc-shell__panel" }, Qd = {
  key: 0,
  class: "dc-shell__page"
}, Xd = /* @__PURE__ */ ne({
  __name: "DataShell",
  props: /* @__PURE__ */ zn({
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
    matchWidth: { default: "grow" },
    headAlign: { default: "center" },
    pinnable: { type: Boolean },
    selectable: { type: Boolean },
    rowPress: { default: "narrow" },
    pagesNote: {},
    navigationMode: { default: "push" },
    facetNavigationMode: { default: "replace" }
  }, {
    open: { type: Boolean, default: !1 },
    openModifiers: {},
    pinned: { default: () => [] },
    pinnedModifiers: {},
    selected: { default: () => [] },
    selectedModifiers: {}
  }),
  emits: /* @__PURE__ */ zn(["activate", "create", "duplicate", "delete", "operate", "drill", "query-change", "toggle-pin"], ["update:open", "update:pinned", "update:selected"]),
  setup(e, { expose: t, emit: n }) {
    const a = e, s = n, r = Zt(e, "open"), l = Zt(e, "pinned"), i = Zt(e, "selected"), o = Wt(), c = St(nr, null), u = a.route || c ? null : Yo(), m = a.route ?? c ?? u;
    Ke(() => u?.dispose?.());
    const k = D(!!o.page);
    qo(() => {
      k.value = !!o.page;
    });
    const g = Zo(m, {
      detached: () => k.value && a.pageQuery === "detached",
      path: () => a.listPath
    }), w = p(() => Vl({ seed: a.schema.key })), _ = p(() => a.source ?? w.value), $ = ai({
      schema: () => a.schema,
      adapter: g,
      defaults: () => a.defaults,
      navigationMode: () => a.navigationMode,
      facetNavigationMode: () => a.facetNavigationMode
    }), x = p(() => a.within?.trim() ?? ""), M = oi({
      query: $.query,
      entity: $.entity,
      setExpression: $.setExpression
    }), b = si({
      source: _,
      query: M.live,
      schema: p(() => a.schema),
      entity: $.entity,
      limit: p(() => a.limit),
      within: x
    });
    be($.query, (F) => s("query-change", F));
    const S = p(() => Xl(a.schema, [$.query.value.expr])), T = p(
      () => S.value.flatMap((F) => {
        const se = a.schema.entities.find((ve) => ve.key === F.entityKey);
        return se ? [{ ...F, entity: se }] : [];
      })
    );
    function B() {
      if (o.record) return T.value;
      const F = a.recordCards;
      return F ? T.value.filter((se) => F[se.entityKey]) : [];
    }
    const L = p(() => {
      const F = a.views;
      return typeof F != "function" ? F : F({ entity: $.entity.value, records: S.value });
    });
    be(
      [b.pageCount, b.pending, $.query, M.drafting, () => a.loading, k],
      () => {
        if (b.pending.value || M.drafting.value || a.loading || k.value) return;
        const F = b.pageCount.value;
        $.query.value.page > F && $.setPage(F, "replace");
      },
      // Immediately, since a pasted URL is past the end before anything changes;
      // and after the render, so the correction is a navigation the mounted shell
      // makes rather than one it makes on the way up. An async source is still
      // pending here and corrects itself when its count lands.
      { immediate: !0, flush: "post" }
    );
    const I = dn() ?? "dc-query-panel", E = D(null);
    function V() {
      r.value && (r.value = !1, vt(() => {
        E.value?.$el?.querySelector(".dc-header__toggle")?.focus();
      }));
    }
    const q = p(() => new Set(l.value));
    function Q(F) {
      const se = new Set(q.value);
      se.has(F.id) ? se.delete(F.id) : se.add(F.id), l.value = [...se], s("toggle-pin", F);
    }
    const he = p(() => {
      if (a.selectable === !0) return !0;
      const F = $.entity.value;
      return !!(F?.duplicate || F?.delete || F?.operations?.length);
    }), pe = p(() => new Set(i.value));
    function Be(F) {
      const se = new Set(pe.value);
      se.has(F.id) ? se.delete(F.id) : se.add(F.id), i.value = [...se];
    }
    function H(F) {
      const se = new Set(pe.value);
      for (const ve of b.rows.value)
        F ? se.add(ve.id) : se.delete(ve.id);
      i.value = [...se];
    }
    function U() {
      i.value.length && (i.value = []);
    }
    const ge = p(() => ({
      ids: [...i.value],
      rows: b.rows.value.filter((F) => pe.value.has(F.id)),
      entity: $.entity.value
    }));
    be(() => $.query.value.entity, U);
    function oe(F, se, ve = {}) {
      const We = va(a.schema, $.query.value, F, ve);
      ve.exclude ? $.narrow(We, se?.key ?? $.query.value.entity) : M.release(() => $.narrow(We, se?.key ?? null, se ? void 0 : "cards")), s("drill", F, se, ve);
    }
    function xe(F) {
      return a.rowPress === "narrow" && Bn(a.schema, F) !== null;
    }
    function Me(F) {
      return a.schema.entities.find((ve) => ve.key === F.entityKey)?.href?.(F) || null;
    }
    const Re = Yl({
      ...$,
      draft: M.text,
      liveQuery: M.live,
      drafting: M.drafting,
      commitDraft: M.commit,
      abandonDraft: M.abandon,
      /*
       * A page of what is on screen: the draft's, while one is live, which are
       * held beside it rather than in the URL — see `liveQuery`.
       */
      setPage: (F, se) => {
        M.drafting.value ? M.setPage(F) : $.setPage(F, se);
      },
      schema: p(() => a.schema),
      entities: p(() => a.schema.entities),
      rows: b.rows,
      total: b.total,
      limit: p(() => a.limit),
      offset: b.offset,
      pageCount: b.pageCount,
      pending: b.pending,
      counting: b.counting,
      error: b.error,
      source: _,
      previewsPerType: p(() => a.previewsPerType),
      within: x,
      pinnable: p(() => a.pinnable === !0),
      isPinned: (F) => q.value.has(F.id),
      isPinnedId: (F) => q.value.has(F),
      togglePin: Q,
      selectable: he,
      selection: ge,
      isSelected: (F) => pe.value.has(F.id),
      toggleSelect: Be,
      selectPage: H,
      clearSelection: U,
      narrowsOnPress: p(() => a.rowPress === "narrow"),
      /*
       * The one place a press is read, so every view gets the same answer without
       * knowing which of the two it is: they all call this.
       */
      activate: (F, se = {}) => {
        if (xe(F)) {
          oe(F, null, se);
          return;
        }
        const ve = Me(F);
        if (ve) {
          window.open(ve, "_blank", "noopener");
          return;
        }
        s("activate", F);
      },
      pressHref: (F) => xe(F) ? $.narrowHref(va(a.schema, $.query.value, F), null, "cards") : Me(F),
      recordHref: Me,
      drillHref: (F, se) => Bn(a.schema, F) ? $.narrowHref(
        va(a.schema, $.query.value, F),
        se?.key ?? null,
        se ? void 0 : "cards"
      ) : null,
      create: (F) => s("create", F),
      duplicate: () => s("duplicate", ge.value),
      delete: () => s("delete", ge.value),
      operate: (F) => s("operate", F, ge.value),
      drill: oe
    });
    ei({ theme: () => a.theme, accent: () => a.accent, tokens: () => a.tokens });
    const Ue = p(() => {
      if (!(!a.accent && !a.tokens))
        return { ...a.tokens, ...a.accent ? { "--dc-accent": a.accent } : {} };
    });
    return t({
      query: $.query,
      openPanel: () => {
        r.value = !0;
      },
      closePanel: V
    }), (F, se) => (d(), v("div", {
      class: "dc-shell",
      "data-dc-theme": e.theme,
      style: Se(Ue.value)
    }, [
      C("div", {
        class: "dc-shell__head",
        "data-dc-width": e.matchWidth,
        "data-dc-align": e.matchWidth === "shrink" ? e.headAlign : void 0
      }, [
        ie(zr, {
          ref_key: "headerRef",
          ref: E,
          expanded: r.value,
          "panel-id": P(I),
          views: L.value,
          "type-chooser": e.typeChooser,
          "pages-note": e.pagesNote,
          "hide-pages": e.loading || k.value,
          "hide-views": k.value,
          onToggle: se[0] || (se[0] = (ve) => r.value = !r.value)
        }, Mn({ _: 2 }, [
          o.brand ? {
            name: "brand",
            fn: Pe((ve) => [
              ye(F.$slots, "brand", Vo(Ko(ve)), void 0, !0)
            ]),
            key: "0"
          } : void 0,
          o.actions ? {
            name: "actions",
            fn: Pe(() => [
              ye(F.$slots, "actions", {}, void 0, !0)
            ]),
            key: "1"
          } : void 0
        ]), 1032, ["expanded", "panel-id", "views", "type-chooser", "pages-note", "hide-pages", "hide-views"]),
        r.value ? (d(), v(ee, { key: 0 }, [
          C("div", {
            class: "dc-shell__scrim",
            onClick: V
          }),
          C("div", Gd, [
            ie(Or, {
              "panel-id": P(I),
              onClose: V
            }, Mn({ _: 2 }, [
              o["panel-section"] ? {
                name: "panel-section",
                fn: Pe(() => [
                  ye(F.$slots, "panel-section", {}, void 0, !0)
                ]),
                key: "0"
              } : void 0
            ]), 1032, ["panel-id"])
          ])
        ], 64)) : A("", !0)
      ], 8, Ud),
      o.page ? (d(), v("div", Qd, [
        ye(F.$slots, "page", {
          query: P(Re).query.value
        }, void 0, !0)
      ])) : A("", !0),
      o.page ? A("", !0) : (d(), G(Nr, {
        key: 1,
        views: L.value
      }, null, 8, ["views"])),
      o.page ? A("", !0) : ye(F.$slots, "results", {
        rows: P(Re).rows.value,
        total: P(Re).total.value,
        offset: P(Re).offset.value,
        pageCount: P(Re).pageCount.value,
        query: P(Re).liveQuery.value,
        pending: P(Re).pending.value,
        loading: e.loading
      }, () => [
        ie(Gr, {
          views: L.value,
          loading: e.loading
        }, Mn({ _: 2 }, [
          o["cards-before"] || B().length ? {
            name: "cards-before",
            fn: Pe(() => [
              (d(!0), v(ee, null, de(B(), (ve) => (d(), v(ee, {
                key: `${ve.entityKey}:${ve.id}`
              }, [
                o.record ? ye(F.$slots, "record", {
                  id: ve.id,
                  entity: ve.entity
                }, void 0, !0, 0) : (d(), G(jn(e.recordCards?.[ve.entityKey]), {
                  key: 1,
                  id: ve.id
                }, null, 8, ["id"]))
              ], 64))), 128)),
              ye(F.$slots, "cards-before", {}, void 0, !0)
            ]),
            key: "0"
          } : void 0,
          o["cards-after"] ? {
            name: "cards-after",
            fn: Pe(() => [
              ye(F.$slots, "cards-after", {}, void 0, !0)
            ]),
            key: "1"
          } : void 0
        ]), 1032, ["views", "loading"])
      ], !0, 2)
    ], 12, jd));
  }
}), Yd = /* @__PURE__ */ re(Xd, [["__scopeId", "data-v-cabddd63"]]), Zd = ["data-dc-muted", "data-dc-collapsed"], Jd = ["data-dc-collapsible"], ef = ["aria-expanded", "aria-controls"], tf = { class: "dc-shell-card__sr" }, nf = {
  key: 0,
  class: "dc-shell-card__identity"
}, af = { class: "dc-shell-card__title dc-shell-card__name" }, sf = {
  key: 0,
  class: "dc-shell-card__ref dc-mono"
}, rf = {
  key: 1,
  class: "dc-shell-card__title"
}, of = {
  key: 2,
  class: "dc-shell-card__count dc-mono"
}, lf = {
  key: 1,
  class: "dc-shell-card__aside"
}, cf = ["data-dc-flush"], uf = /* @__PURE__ */ ne({
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
    const n = e, a = t, s = D(n.defaultCollapsed === !0), r = p(() => n.span === "all" ? { gridColumn: "1 / -1" } : void 0), l = Wt();
    function i(I) {
      return o(I?.() ?? []);
    }
    function o(I) {
      return I.some((E) => E.type === Wo ? !1 : E.type === jo ? String(E.children ?? "").trim().length > 0 : E.type === ee ? o(E.children ?? []) : !0);
    }
    const c = p(
      () => !!n.title || !!n.name || u.value || i(l.head)
    ), u = p(() => i(l.aside)), m = p(() => i(l.default)), k = p(() => i(l.foot)), g = p(
      () => !!n.name && (!!n.reference || i(l.reference))
    ), w = p(() => n.collapsible === !0 && c.value), _ = p(() => w.value && (n.collapsed ?? s.value));
    function $() {
      const I = !_.value;
      s.value = I, a("update:collapsed", I);
    }
    const x = dn() ?? "dc-shell-card", M = `${x}-body`, b = `${x}-foot`, S = p(
      () => [m.value ? M : "", k.value ? b : ""].filter(Boolean).join(" ") || void 0
    ), T = [
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
    ].join(", "), B = D(null);
    function L(I) {
      if (!w.value) return;
      const E = I.target?.closest(T);
      E && B.value?.contains(E) || typeof window < "u" && window.getSelection()?.toString() || $();
    }
    return (I, E) => (d(), v("section", {
      class: "dc-shell-card",
      style: Se(r.value),
      "data-dc-muted": e.muted ? "true" : "false",
      "data-dc-collapsed": _.value ? "true" : "false"
    }, [
      c.value ? (d(), v("header", {
        key: 0,
        ref_key: "head",
        ref: B,
        class: "dc-shell-card__head",
        "data-dc-collapsible": w.value ? "true" : "false",
        onClick: L
      }, [
        w.value ? (d(), v("button", {
          key: 0,
          type: "button",
          class: "dc-shell-card__toggle",
          "aria-expanded": _.value ? "false" : "true",
          "aria-controls": S.value,
          onClick: $
        }, [
          E[0] || (E[0] = C("svg", {
            class: "dc-shell-card__chevron",
            viewBox: "0 0 10 10",
            "aria-hidden": "true"
          }, [
            C("path", { d: "M2 3.5 5 6.5 8 3.5" })
          ], -1)),
          C("span", tf, z(e.name || e.title || "Card"), 1)
        ], 8, ef)) : A("", !0),
        ye(I.$slots, "head", {}, () => [
          e.name ? (d(), v("div", nf, [
            C("h2", af, z(e.name), 1),
            g.value ? (d(), v("span", sf, [
              ye(I.$slots, "reference", {}, () => [
                Le(z(e.reference), 1)
              ], !0)
            ])) : A("", !0)
          ])) : (d(), v("h2", rf, z(e.title), 1)),
          e.count !== void 0 ? (d(), v("span", of, z(e.count), 1)) : A("", !0)
        ], !0),
        u.value ? (d(), v("span", lf, [
          ye(I.$slots, "aside", {}, void 0, !0)
        ])) : A("", !0)
      ], 8, Jd)) : A("", !0),
      m.value ? _t((d(), v("div", {
        key: 1,
        id: M,
        class: "dc-shell-card__body",
        "data-dc-flush": e.flush ? "true" : "false"
      }, [
        ye(I.$slots, "default", {}, void 0, !0)
      ], 8, cf)), [
        [In, !_.value]
      ]) : A("", !0),
      k.value ? _t((d(), v("footer", {
        key: 2,
        id: b,
        class: "dc-shell-card__foot"
      }, [
        ye(I.$slots, "foot", {}, void 0, !0)
      ], 512)), [
        [In, !_.value]
      ]) : A("", !0)
    ], 12, Zd));
  }
}), Jv = /* @__PURE__ */ re(uf, [["__scopeId", "data-v-3a7425d2"]]), df = ["aria-label"], ff = ["aria-checked", "data-dc-active", "tabindex", "onClick", "onKeydown"], pf = /* @__PURE__ */ ne({
  __name: "SegmentedControl",
  props: {
    modelValue: {},
    options: {},
    label: {},
    mono: { type: Boolean }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const n = e, a = t, s = D([]);
    function r(l, i) {
      const o = n.options.length;
      let c = null;
      if (l.key === "ArrowRight" || l.key === "ArrowDown" ? c = (i + 1) % o : l.key === "ArrowLeft" || l.key === "ArrowUp" ? c = (i - 1 + o) % o : l.key === "Home" ? c = 0 : l.key === "End" && (c = o - 1), c === null) return;
      l.preventDefault();
      const u = n.options[c];
      u && (a("update:modelValue", u.key), s.value[c]?.focus());
    }
    return (l, i) => (d(), v("div", {
      class: "dc-segmented",
      role: "radiogroup",
      "aria-label": e.label
    }, [
      (d(!0), v(ee, null, de(e.options, (o, c) => (d(), v("button", {
        key: o.key,
        ref_for: !0,
        ref_key: "buttons",
        ref: s,
        type: "button",
        role: "radio",
        class: lt(["dc-segmented__item", { "dc-segmented__item--mono": e.mono }]),
        "aria-checked": o.key === e.modelValue,
        "data-dc-active": o.key === e.modelValue ? "true" : "false",
        tabindex: o.key === e.modelValue ? 0 : -1,
        onClick: (u) => a("update:modelValue", o.key),
        onKeydown: (u) => r(u, c)
      }, z(o.label), 43, ff))), 128))
    ], 8, df));
  }
}), vf = /* @__PURE__ */ re(pf, [["__scopeId", "data-v-63fb5482"]]), hf = ["data-dc-theme", "aria-label"], mf = ["aria-expanded", "aria-disabled", "disabled", "data-dc-menu", "tabindex", "onClick", "onMouseenter"], gf = /* @__PURE__ */ ne({
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
    }), s = t, r = D(null), l = D([]), i = D(null), o = D(null), c = D(!1), u = p(
      () => n.menus.flatMap((S, T) => tn(S) ? [T] : [])
    );
    function m(S, T) {
      const B = l.value[S]?.getBoundingClientRect(), L = n.menus[S];
      !B || !L || !tn(L) || (o.value = { x: B.left, y: B.bottom + 2, mirrorX: B.right }, i.value = S, c.value = T);
    }
    function k(S) {
      const T = i.value;
      i.value = null, o.value = null, S && T !== null && l.value[T]?.focus();
    }
    function g(S) {
      i.value === S ? k(!0) : m(S, !1);
    }
    function w(S) {
      i.value === null || i.value === S || m(S, !1);
    }
    function _(S, T) {
      const B = u.value;
      if (B.length === 0) return null;
      if (S === null) return T === 1 ? B[0] ?? null : B[B.length - 1] ?? null;
      const L = B.indexOf(S);
      return L === -1 ? B[0] ?? null : B[(L + T + B.length) % B.length] ?? null;
    }
    function $(S) {
      const T = S.key;
      if (T === "Escape") {
        if (i.value === null) return;
        S.preventDefault(), k(!0);
        return;
      }
      if (T === "ArrowDown" && i.value === null) {
        const I = x();
        if (I === null) return;
        S.preventDefault(), m(I, !0);
        return;
      }
      if (T !== "ArrowLeft" && T !== "ArrowRight") return;
      const B = i.value ?? x(), L = _(B, T === "ArrowRight" ? 1 : -1);
      L !== null && (S.preventDefault(), i.value !== null ? m(L, !0) : l.value[L]?.focus());
    }
    function x() {
      const S = l.value.findIndex((T) => T === document.activeElement);
      return S === -1 ? u.value[0] ?? null : S;
    }
    function M(S) {
      const T = S.target;
      !T || r.value?.contains(T) || k(!1);
    }
    be(i, (S) => {
      S !== null ? window.addEventListener("pointerdown", M, !0) : window.removeEventListener("pointerdown", M, !0);
    }), Ke(() => window.removeEventListener("pointerdown", M, !0));
    function b(S) {
      k(!0), S.action?.(), s("choose", S);
    }
    return (S, T) => (d(), v("div", {
      ref_key: "bar",
      ref: r,
      class: "dc-shell dc-menubar",
      role: "menubar",
      "data-dc-theme": e.theme,
      "aria-label": e.label ?? "Main menu",
      style: Se(a.value),
      onKeydown: $
    }, [
      (d(!0), v(ee, null, de(e.menus, (B, L) => (d(), v("button", {
        key: B.id ?? B.label ?? L,
        ref_for: !0,
        ref: (I) => {
          I && (l.value[L] = I);
        },
        type: "button",
        class: "dc-menubar__item",
        role: "menuitem",
        "aria-haspopup": "menu",
        "aria-expanded": i.value === L,
        "aria-disabled": B.disabled ? "true" : void 0,
        disabled: B.disabled,
        "data-dc-menu": B.id ?? B.label,
        tabindex: L === (u.value[0] ?? 0) ? 0 : -1,
        onClick: (I) => g(L),
        onMouseenter: (I) => w(L)
      }, z(B.label), 41, mf))), 128)),
      i.value !== null && o.value ? (d(), G(ts, {
        key: i.value,
        items: e.menus[i.value]?.items ?? [],
        at: o.value,
        label: e.menus[i.value]?.label,
        autofocus: c.value,
        onChoose: b,
        onDismiss: T[0] || (T[0] = (B) => k(!0))
      }, null, 8, ["items", "at", "label", "autofocus"])) : A("", !0)
    ], 44, hf));
  }
}), eh = /* @__PURE__ */ re(gf, [["__scopeId", "data-v-93dbd2e4"]]), yf = ["aria-label", "aria-expanded", "disabled"], _f = { "aria-hidden": "true" }, wf = /* @__PURE__ */ ne({
  __name: "MenuButton",
  props: {
    items: {},
    label: {},
    glyph: { default: "⋯" }
  },
  emits: ["choose"],
  setup(e, { emit: t }) {
    const n = t, a = D(null), s = D(null), r = D(null), l = D(!1), i = p(() => r.value !== null);
    function o(w) {
      const _ = a.value?.getBoundingClientRect();
      _ && (r.value = { x: _.left, y: _.bottom + 4, mirrorX: _.right }, l.value = w);
    }
    function c(w) {
      r.value = null, w && a.value?.focus();
    }
    function u() {
      i.value ? c(!0) : o(!1);
    }
    function m(w) {
      w.key !== "ArrowDown" || i.value || (w.preventDefault(), o(!0));
    }
    function k(w) {
      const _ = w.target;
      _ && (a.value?.contains(_) || s.value?.root?.contains(_) || c(!1));
    }
    be(i, (w) => {
      w ? window.addEventListener("pointerdown", k, !0) : window.removeEventListener("pointerdown", k, !0);
    }), Ke(() => window.removeEventListener("pointerdown", k, !0));
    function g(w) {
      c(!0), w.action?.(), n("choose", w);
    }
    return (w, _) => (d(), v(ee, null, [
      C("button", {
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
        C("span", _f, z(e.glyph), 1)
      ], 40, yf),
      r.value ? (d(), G(ts, {
        key: 0,
        ref_key: "menu",
        ref: s,
        items: e.items,
        at: r.value,
        label: e.label,
        autofocus: l.value,
        onChoose: g,
        onDismiss: _[0] || (_[0] = ($) => c(!0))
      }, null, 8, ["items", "at", "label", "autofocus"])) : A("", !0)
    ], 64));
  }
}), ss = /* @__PURE__ */ re(wf, [["__scopeId", "data-v-48f5ada5"]]), kf = { class: "dc-fact__label" }, bf = ["title"], $f = /* @__PURE__ */ ne({
  __name: "ShellFact",
  props: {
    label: {},
    value: {},
    title: {},
    wide: { type: Boolean }
  },
  setup(e) {
    const t = e, n = p(() => {
      const s = t.value;
      if (s == null || s === "") return [it];
      if (Array.isArray(s)) {
        const r = s.filter((l) => l != null && l !== "");
        return r.length ? r.map(String) : [it];
      }
      return [String(s)];
    }), a = p(() => t.wide ? { gridColumn: "1 / -1" } : void 0);
    return (s, r) => (d(), v("div", {
      class: "dc-fact",
      style: Se(a.value)
    }, [
      C("dt", kf, [
        ye(s.$slots, "label", {}, () => [
          Le(z(e.label), 1)
        ], !0)
      ]),
      C("dd", {
        class: "dc-fact__value dc-mono",
        title: e.title
      }, [
        ye(s.$slots, "default", {}, () => [
          n.value.length === 1 ? (d(), v(ee, { key: 0 }, [
            Le(z(n.value[0]), 1)
          ], 64)) : (d(!0), v(ee, { key: 1 }, de(n.value, (l, i) => (d(), v("span", {
            key: i,
            class: "dc-fact__line"
          }, z(l), 1))), 128))
        ], !0)
      ], 8, bf)
    ], 4));
  }
}), xf = /* @__PURE__ */ re($f, [["__scopeId", "data-v-1f6d25e6"]]), Cf = /* @__PURE__ */ ne({
  __name: "ShellFacts",
  props: {
    items: { default: () => [] },
    min: { default: "200px" }
  },
  setup(e) {
    const t = e, n = p(() => ({ "--dc-facts-min": t.min }));
    return (a, s) => (d(), v("dl", {
      class: "dc-facts",
      style: Se(n.value)
    }, [
      (d(!0), v(ee, null, de(e.items, (r, l) => (d(), G(xf, {
        key: `${l}:${r.label}`,
        label: r.label,
        value: r.value,
        title: r.title,
        wide: r.wide
      }, null, 8, ["label", "value", "title", "wide"]))), 128)),
      ye(a.$slots, "default", {}, void 0, !0)
    ], 4));
  }
}), th = /* @__PURE__ */ re(Cf, [["__scopeId", "data-v-17455afa"]]), Sf = { class: "dc-counts" }, Mf = ["data-dc-tone"], Ef = {
  key: 0,
  class: "dc-counts__empty"
}, Pf = /* @__PURE__ */ ne({
  __name: "StatusCounts",
  props: {
    counts: {},
    empty: { default: it }
  },
  setup(e) {
    const t = e, n = p(() => t.counts.filter((a) => a.count > 0));
    return (a, s) => (d(), v("span", Sf, [
      (d(!0), v(ee, null, de(n.value, (r) => (d(), v("span", {
        key: r.label,
        class: "dc-counts__count",
        "data-dc-tone": r.tone ?? "neutral"
      }, z(r.count) + " " + z(r.label), 9, Mf))), 128)),
      n.value.length === 0 ? (d(), v("span", Ef, z(e.empty), 1)) : A("", !0)
    ]));
  }
}), nh = /* @__PURE__ */ re(Pf, [["__scopeId", "data-v-5553a9e2"]]), Af = ["data-dc-copied", "title", "aria-label"], Tf = {
  key: 0,
  class: "dc-copy__mark",
  viewBox: "0 0 16 16",
  "aria-hidden": "true"
}, Lf = {
  key: 1,
  class: "dc-copy__mark",
  viewBox: "0 0 16 16",
  "aria-hidden": "true"
}, Rf = 1500, zf = /* @__PURE__ */ ne({
  __name: "CopyButton",
  props: {
    text: {},
    label: { default: "Copy to clipboard" }
  },
  emits: ["copied", "error"],
  setup(e, { emit: t }) {
    const n = e, a = t, s = D(!1);
    let r;
    async function l() {
      const i = typeof n.text == "function" ? n.text() : n.text;
      try {
        if (!navigator.clipboard) throw new Error("The clipboard is not available here");
        await navigator.clipboard.writeText(i);
      } catch (o) {
        a("error", o);
        return;
      }
      s.value = !0, clearTimeout(r), r = setTimeout(() => {
        s.value = !1;
      }, Rf), a("copied", i);
    }
    return Ke(() => clearTimeout(r)), (i, o) => (d(), v("button", {
      type: "button",
      class: "dc-copy",
      "data-dc-copied": s.value ? "true" : "false",
      title: s.value ? "Copied" : e.label,
      "aria-label": e.label,
      onClick: l
    }, [
      s.value ? (d(), v("svg", Lf, [...o[1] || (o[1] = [
        C("path", { d: "M3 8.5l3.2 3L13 4.5" }, null, -1)
      ])])) : (d(), v("svg", Tf, [...o[0] || (o[0] = [
        C("rect", {
          x: "5.5",
          y: "5.5",
          width: "8",
          height: "9",
          rx: "1.5"
        }, null, -1),
        C("path", { d: "M10.5 3.5v-1a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h1" }, null, -1)
      ])]))
    ], 8, Af));
  }
}), If = /* @__PURE__ */ re(zf, [["__scopeId", "data-v-f4249d7f"]]), Of = ["data-dc-copy", "data-dc-wrap", "data-dc-tone"], Ff = /* @__PURE__ */ ne({
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
    const n = e, a = t, s = D(null), r = p(() => n.maxHeight === void 0 ? void 0 : { maxHeight: typeof n.maxHeight == "number" ? `${n.maxHeight}px` : n.maxHeight });
    function l() {
      return n.code ?? s.value?.textContent ?? "";
    }
    return (i, o) => (d(), v("div", {
      class: "dc-code",
      "data-dc-copy": e.copy ? "true" : "false",
      "data-dc-wrap": e.wrap ? "true" : "false",
      "data-dc-tone": e.tone
    }, [
      C("pre", {
        ref_key: "pre",
        ref: s,
        class: "dc-code__text dc-mono",
        style: Se(r.value)
      }, [
        ye(i.$slots, "default", {}, () => [
          Le(z(e.code), 1)
        ], !0)
      ], 4),
      e.copy ? (d(), G(If, {
        key: 0,
        class: "dc-code__copy",
        text: l,
        label: e.copyLabel,
        onCopied: o[0] || (o[0] = (c) => a("copied", c)),
        onError: o[1] || (o[1] = (c) => a("error", c))
      }, null, 8, ["label"])) : A("", !0)
    ], 8, Of));
  }
}), ah = /* @__PURE__ */ re(Ff, [["__scopeId", "data-v-67b371dd"]]), Nf = 24, Bf = /* @__PURE__ */ ne({
  __name: "ShellLog",
  props: {
    fetchChunk: {},
    stripAnsi: { type: Boolean },
    maxHeight: { default: "460px" }
  },
  setup(e, { expose: t }) {
    const n = e, a = D(""), s = p(() => n.stripAnsi ? dl(a.value) : a.value), r = D(null);
    let l = 0, i = null;
    function o() {
      return i ??= c().finally(() => {
        i = null;
      }), i;
    }
    async function c() {
      const { chunk: k, offset: g } = await n.fetchChunk(l);
      if (l = g, !k) return;
      const w = r.value, _ = !w || w.scrollTop + w.clientHeight >= w.scrollHeight - Nf;
      a.value += k, _ && (await vt(), r.value && (r.value.scrollTop = r.value.scrollHeight));
    }
    function u() {
      a.value = "", l = 0;
    }
    const m = p(() => n.maxHeight === void 0 ? void 0 : { maxHeight: typeof n.maxHeight == "number" ? `${n.maxHeight}px` : n.maxHeight });
    return t({ poll: o, reset: u }), (k, g) => (d(), v("pre", {
      ref_key: "pane",
      ref: r,
      class: "dc-log dc-mono",
      style: Se(m.value)
    }, z(s.value), 5));
  }
}), sh = /* @__PURE__ */ re(Bf, [["__scopeId", "data-v-2c86947e"]]), Df = ["data-dc-theme"], Hf = ["aria-labelledby", "aria-label"], qf = {
  key: 1,
  class: "dc-dialog__actions"
}, Qt = [], Vf = /* @__PURE__ */ ne({
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
    const n = e, a = t, { theme: s, style: r, adopt: l } = Ja(n), i = `${dn() ?? "dc-dialog"}-title`, o = D(null);
    function c() {
      a("close"), a("update:open", !1);
    }
    const u = Symbol("dc-dialog");
    function m(b) {
      b.key !== "Escape" || b.defaultPrevented || Qt[Qt.length - 1] === u && (b.preventDefault(), c());
    }
    let k = !1;
    function g(b) {
      k = b.target === b.currentTarget;
    }
    function w(b) {
      b.target === b.currentTarget && k && c(), k = !1;
    }
    const _ = [
      "[autofocus]",
      'input:not([disabled]):not([type="hidden"])',
      "select:not([disabled])",
      "textarea:not([disabled])",
      "button:not([disabled])",
      "a[href]",
      '[tabindex]:not([tabindex="-1"])'
    ].join(", ");
    let $ = null;
    async function x() {
      Qt.push(u), document.addEventListener("keydown", m), $ = document.activeElement instanceof HTMLElement ? document.activeElement : null, l(), await vt(), (o.value?.querySelector("[autofocus]") ?? o.value?.querySelector(_) ?? o.value)?.focus();
    }
    function M() {
      const b = Qt.indexOf(u);
      b !== -1 && (Qt.splice(b, 1), document.removeEventListener("keydown", m), $?.isConnected && $.focus(), $ = null);
    }
    return un(() => {
      n.open && x();
    }), be(
      () => n.open,
      (b) => {
        b ? x() : M();
      }
    ), Ke(M), (b, S) => e.open ? (d(), G(Wn, {
      key: 0,
      to: e.to
    }, [
      C("div", {
        class: "dc-shell dc-layer dc-dialog",
        "data-dc-theme": P(s),
        style: Se(P(r)),
        onPointerdown: g,
        onClick: w
      }, [
        C("div", {
          ref_key: "panel",
          ref: o,
          class: lt(["dc-dialog__panel", e.panelClass]),
          role: "dialog",
          "aria-modal": "true",
          tabindex: "-1",
          "aria-labelledby": e.title ? i : void 0,
          "aria-label": e.title ? void 0 : e.label
        }, [
          e.title ? (d(), v("h2", {
            key: 0,
            id: i,
            class: "dc-dialog__title"
          }, z(e.title), 1)) : A("", !0),
          C("div", {
            class: lt(["dc-dialog__body", e.bodyClass])
          }, [
            ye(b.$slots, "default", {}, void 0, !0)
          ], 2),
          b.$slots.actions ? (d(), v("div", qf, [
            ye(b.$slots, "actions", {}, void 0, !0)
          ])) : A("", !0)
        ], 10, Hf)
      ], 44, Df)
    ], 8, ["to"])) : A("", !0);
  }
}), rh = /* @__PURE__ */ re(Vf, [["__scopeId", "data-v-1e126064"]]), Kf = 4500, Wf = 9e3, ln = D([]);
let Hs = 0;
function Qr(e) {
  ln.value = ln.value.filter((t) => t.id !== e);
}
function Xr(e, t = "ok") {
  Hs += 1;
  const n = Hs;
  ln.value = [...ln.value, { id: n, message: e, kind: t }], setTimeout(() => Qr(n), t === "err" ? Wf : Kf);
}
function jf(e) {
  Xr(e instanceof Error ? e.message : String(e), "err");
}
function Uf() {
  return { toasts: Uo(ln), toast: Xr, toastError: jf, dismiss: Qr };
}
const Gf = ["data-dc-theme"], Qf = ["data-dc-kind", "role"], Xf = /* @__PURE__ */ ne({
  __name: "ShellToasts",
  props: {
    to: { default: "body" },
    theme: { default: void 0 },
    accent: { default: void 0 },
    tokens: { default: void 0 }
  },
  setup(e) {
    const t = e, { toasts: n } = Uf(), { theme: a, style: s, adopt: r } = Ja(t);
    return un(r), (l, i) => (d(), G(Wn, { to: e.to }, [
      C("div", {
        class: "dc-shell dc-layer dc-toasts",
        "data-dc-theme": P(a),
        style: Se(P(s)),
        "aria-live": "polite"
      }, [
        (d(!0), v(ee, null, de(P(n), (o) => (d(), v("div", {
          key: o.id,
          class: "dc-toast",
          "data-dc-kind": o.kind,
          role: o.kind === "err" ? "alert" : void 0
        }, z(o.message), 9, Qf))), 128))
      ], 12, Gf)
    ], 8, ["to"]));
  }
}), oh = /* @__PURE__ */ re(Xf, [["__scopeId", "data-v-6fb044ee"]]), Yf = 4, Zf = 8, Jf = 180;
function ep(e, t, n, a = {}) {
  const s = a.gap ?? Yf, r = a.margin ?? Zf, l = a.flipBelow ?? Jf, i = a.side ?? "below", o = {
    below: n.height - e.bottom - s - r,
    above: e.top - s - r
  }, c = i === "below" ? "above" : "below", u = o[i] < l && o[c] > o[i] ? c : i, m = Math.min(a.maxHeight ?? 1 / 0, Math.max(0, o[u])), k = Math.max(0, n.width - r * 2), g = Math.min(e.width, k), w = Math.min(Math.max(t, g), k), _ = a.align === "end" ? e.right - w : e.left, $ = Math.max(r, Math.min(_, n.width - w - r));
  return u === "below" ? { side: u, left: $, top: e.bottom + s, maxHeight: m, minWidth: g, maxWidth: k } : { side: u, left: $, bottom: n.height - e.top + s, maxHeight: m, minWidth: g, maxWidth: k };
}
const tp = ["data-dc-theme", "data-dc-side"], mt = [], np = /* @__PURE__ */ ne({
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
    const n = e, a = t, { theme: s, style: r, adopt: l } = Ja(n), i = D(null), o = D(null), c = { root: () => i.value };
    function u() {
      const b = n.anchor;
      b && (o.value = ep(
        b.getBoundingClientRect(),
        i.value?.offsetWidth ?? 0,
        { width: window.innerWidth, height: window.innerHeight },
        { side: n.side, align: n.align, maxHeight: n.maxHeight }
      ));
    }
    const m = p(() => {
      const b = o.value, S = b ? {
        position: "fixed",
        left: `${b.left}px`,
        ...b.top !== void 0 ? { top: `${b.top}px` } : {},
        ...b.bottom !== void 0 ? { bottom: `${b.bottom}px` } : {},
        minWidth: `${b.minWidth}px`,
        maxWidth: `${b.maxWidth}px`,
        maxHeight: `${b.maxHeight}px`,
        overflowY: "auto"
      } : { position: "fixed", visibility: "hidden" };
      return { ...r.value, ...S };
    });
    function k() {
      a("update:open", !1), a("close");
    }
    function g(b) {
      return i.value?.contains(b) || n.anchor?.contains(b) ? !0 : mt.slice(mt.indexOf(c) + 1).some((T) => T.root()?.contains(b));
    }
    function w(b) {
      const S = b.target;
      S && !g(S) && k();
    }
    function _(b) {
      b.key !== "Escape" || b.defaultPrevented || mt[mt.length - 1] === c && (b.preventDefault(), i.value?.contains(document.activeElement) && n.anchor?.focus(), k());
    }
    let $ = null;
    async function x() {
      mt.includes(c) || (mt.push(c), l(), o.value = null, await vt(), u(), window.addEventListener("pointerdown", w, !0), document.addEventListener("keydown", _, !0), window.addEventListener("resize", u), window.addEventListener("scroll", u, !0), typeof ResizeObserver < "u" && i.value && ($ = new ResizeObserver(() => u()), $.observe(i.value)));
    }
    function M() {
      const b = mt.indexOf(c);
      b !== -1 && (mt.splice(b, 1), window.removeEventListener("pointerdown", w, !0), document.removeEventListener("keydown", _, !0), window.removeEventListener("resize", u), window.removeEventListener("scroll", u, !0), $?.disconnect(), $ = null);
    }
    return un(() => {
      n.open && x();
    }), be(
      () => n.open,
      (b) => {
        b ? x() : M();
      }
    ), be(() => n.anchor, () => {
      n.open && u();
    }), Ke(M), (b, S) => e.open ? (d(), G(Wn, {
      key: 0,
      to: e.to
    }, [
      C("div", Go({
        ref_key: "root",
        ref: i
      }, b.$attrs, {
        class: "dc-shell dc-layer dc-popover",
        "data-dc-theme": P(s),
        "data-dc-side": o.value?.side,
        style: m.value
      }), [
        ye(b.$slots, "default", {}, void 0, !0)
      ], 16, tp)
    ], 8, ["to"])) : A("", !0);
  }
}), lh = /* @__PURE__ */ re(np, [["__scopeId", "data-v-65ca5cb0"]]), jt = (e) => e.kind === "split", J = (e) => e.kind === "group", le = (e) => e.kind === "float", xt = { x: 16, y: 16, w: 360, h: 260 }, qn = 28, Yr = 120, za = 220, Zr = 38, Rt = 6;
function _n(e, t) {
  let n = !1;
  const a = e.frames.map((s, r) => {
    const l = t(s.node, r);
    return l === s.node ? s : (n = !0, { ...s, node: l });
  });
  return n ? { ...e, frames: a } : e;
}
function et(e) {
  return { kind: "group", panels: [e] };
}
function ih(e, t, n) {
  return {
    kind: "group",
    panels: e,
    ...t ? { active: t } : {},
    ...n ? { title: n } : {}
  };
}
const $e = (e) => typeof e == "string", ea = (e) => $e(e) ? et(e) : e, wn = (e) => $e(e) ? [e] : Ze(e), qs = (e) => e.panels.filter($e), ap = (e) => e.panels.filter((t) => !$e(t)), Xe = (e, t) => e.panels.includes(t);
function kn(e, t, n) {
  let a = !1;
  const s = e.panels.map((r) => {
    if ($e(r) || !_e(r, t)) return r;
    const l = n(r);
    return l !== r && (a = !0), l;
  });
  return a ? { ...e, panels: s } : e;
}
function ta(e, t) {
  return { node: e, rect: { ...xt, ...t } };
}
function rs(e, t) {
  return t ? { kind: "float", frames: e, title: t } : { kind: "float", frames: e };
}
function na(e, t) {
  const n = { ...xt, ...t };
  return rs(
    e.map(
      (a, s) => ta(a, {
        ...n,
        x: n.x + s * qn,
        y: n.y + s * qn
      })
    )
  );
}
function os(e, t, n, a) {
  return {
    kind: "split",
    direction: e,
    children: t,
    ...n ? { sizes: n } : {},
    ...a ? { title: a } : {}
  };
}
const ls = (e, t, n) => os("row", e, t, n), ch = (e, t, n) => os("column", e, t, n);
function Te(e) {
  return {
    ...e.title ? { title: e.title } : {},
    ...e.fixedView ? { fixedView: !0 } : {},
    ...e.headless ? { headless: !0 } : {}
  };
}
const Et = (e) => e.fixedView === !0 || e.headless === !0 || !!e.title, sp = (e) => ({ ...e, headless: !0 }), uh = (e) => ({ ...e, fixedView: !0 }), rp = (e) => e === "left" || e === "right" ? "row" : "column";
function Ze(e) {
  return J(e) ? e.panels.flatMap(wn) : le(e) ? e.frames.flatMap((t) => Ze(t.node)) : e.children.flatMap(Ze);
}
function _e(e, t) {
  return J(e) ? e.panels.some((n) => $e(n) ? n === t : _e(n, t)) : le(e) ? e.frames.some((n) => _e(n.node, t)) : e.children.some((n) => _e(n, t));
}
const Jr = (e) => Ze(e).length === 0, Ia = (e) => !J(e) && Et(e), Oa = (e) => Jr(e) && !Ia(e);
function aa(e) {
  return jt(e) ? e.children.map((t, n) => ({ node: t, index: n })) : le(e) ? e.frames.map((t, n) => ({ node: t.node, index: n })) : e.panels.flatMap((t, n) => $e(t) ? [] : [{ node: t, index: n }]);
}
const is = (e) => aa(e).map((t) => t.node);
function Tt(e) {
  const t = e.active;
  if (t) {
    const n = e.panels.findIndex(
      (a) => $e(a) ? a === t : _e(a, t)
    );
    if (n >= 0) return n;
  }
  return 0;
}
function eo(e) {
  const t = e.panels[Tt(e)];
  return t !== void 0 && $e(t) ? t : "";
}
function Fe(e) {
  if ($e(e)) return e;
  if (J(e)) {
    const n = e.panels[Tt(e)];
    return n === void 0 ? "" : Fe(n);
  }
  if (le(e)) {
    const n = e.frames[e.frames.length - 1];
    return n ? Fe(n.node) : "";
  }
  const t = e.children[0];
  return t ? Fe(t) : "";
}
function Ft(e, t) {
  if (J(e) && Xe(e, t)) return e;
  for (const n of is(e)) {
    const a = Ft(n, t);
    if (a) return a;
  }
  return null;
}
function op(e) {
  const t = is(e).flatMap(op);
  return J(e) ? [e, ...t] : t;
}
function Ie(e, t) {
  if (J(e)) {
    for (const n of ap(e)) {
      const a = Ie(n, t);
      if (a) return a;
    }
    return null;
  }
  if (le(e)) {
    for (const n of e.frames)
      if (_e(n.node, t))
        return Ie(n.node, t) ?? n;
    return null;
  }
  for (const n of e.children) {
    const a = Ie(n, t);
    if (a) return a;
  }
  return null;
}
function ma(e, t, n = Yr) {
  const a = (i, o) => o > 0 ? Math.max(Math.min(i, o), Math.min(n, o)) : Math.max(i, n), s = a(e.w, t.w), r = a(e.h, t.h), l = (i, o, c) => Math.min(Math.max(i, 0), Math.max(c - o, 0));
  return {
    x: Math.round(l(e.x, s, t.w)),
    y: Math.round(l(e.y, r, t.h)),
    w: Math.round(s),
    h: Math.round(r)
  };
}
function Vs(e, t, n, a, s = Yr) {
  let { x: r, y: l, w: i, h: o } = e;
  return t.includes("e") && (i = e.w + n), t.includes("w") && (i = e.w - n, r = e.x + n), t.includes("s") && (o = e.h + a), t.includes("n") && (o = e.h - a, l = e.y + a), i < s && (t.includes("w") && (r = e.x + e.w - s), i = s), o < s && (t.includes("n") && (l = e.y + e.h - s), o = s), { x: r, y: l, w: i, h: o };
}
const to = (e, t) => e.x === t.x && e.y === t.y && e.w === t.w && e.h === t.h;
function Nt(e, t, n) {
  if (J(e)) return kn(e, t, (r) => Nt(r, t, n));
  if (le(e)) {
    let r = !1;
    const l = e.frames.map((i) => {
      if (!_e(i.node, t)) return i;
      if (Ie(i.node, t)) {
        const c = Nt(i.node, t, n);
        return c === i.node ? i : (r = !0, { ...i, node: c });
      }
      const o = n(i);
      return o === i ? i : (r = !0, o);
    });
    return r ? { ...e, frames: l } : e;
  }
  if (!_e(e, t)) return e;
  let a = !1;
  const s = e.children.map((r) => {
    const l = Nt(r, t, n);
    return l !== r && (a = !0), l;
  });
  return a ? { ...e, children: s } : e;
}
function lp(e, t, n) {
  return Nt(e, t, (a) => to(a.rect, n) ? a : { ...a, rect: n });
}
const gt = (e) => e.maximized === !0, no = (e) => (t) => {
  if (gt(t) === e) return t;
  if (e) {
    const { minimized: s, ...r } = t;
    return { ...r, maximized: !0 };
  }
  const { maximized: n, ...a } = t;
  return a;
};
function ip(e, t, n = !0) {
  return Nt(e, t, no(n));
}
function dh(e, t) {
  const n = Ie(e, t);
  return n ? ip(e, t, !gt(n)) : e;
}
const $t = (e) => e.minimized === !0, ao = (e) => (t) => {
  if ($t(t) === e) return t;
  if (e) {
    const { maximized: s, ...r } = t;
    return { ...r, minimized: !0 };
  }
  const { minimized: n, ...a } = t;
  return a;
};
function cp(e, t, n = !0) {
  return Nt(e, t, ao(n));
}
function fh(e, t) {
  const n = Ie(e, t);
  return n ? cp(e, t, !$t(n)) : e;
}
function bt(e, t) {
  const n = t[t.length - 1];
  if (n === void 0) return null;
  const a = Ye(e, t.slice(0, -1));
  return !a || !le(a) ? null : a.frames[n] ?? null;
}
function Fa(e, t) {
  if (le(e)) {
    for (const [n, a] of e.frames.entries()) {
      if (!_e(a.node, t)) continue;
      const s = Fa(a.node, t);
      return s ? [n, ...s] : [n];
    }
    return null;
  }
  for (const { node: n, index: a } of aa(e)) {
    if (!_e(n, t)) continue;
    const s = Fa(n, t);
    return s ? [a, ...s] : null;
  }
  return null;
}
function cs(e, t, n) {
  const a = t[t.length - 1];
  if (a === void 0) return e;
  const s = t.slice(0, -1), r = Ye(e, s);
  if (!r || !le(r)) return e;
  const l = r.frames[a];
  if (!l) return e;
  const i = n(l);
  if (i === l) return e;
  const o = [...r.frames];
  return o[a] = i, ot(e, s, { ...r, frames: o });
}
function Ks(e, t, n) {
  return cs(
    e,
    t,
    (a) => to(a.rect, n) ? a : { ...a, rect: n }
  );
}
function up(e, t, n = !0) {
  return cs(e, t, no(n));
}
function dp(e, t, n = !0) {
  return cs(e, t, ao(n));
}
function nn(e, t) {
  const [n, ...a] = t;
  if (n === void 0) return e;
  if (le(e)) {
    const l = e.frames[n];
    if (!l) return e;
    const i = nn(l.node, a), o = i === l.node ? l : { ...l, node: i };
    if (n === e.frames.length - 1 && o === l) return e;
    const c = [...e.frames];
    return c.splice(n, 1), c.push(o), { ...e, frames: c };
  }
  const s = Ye(e, [n]);
  if (!s) return e;
  const r = nn(s, a);
  return r === s ? e : ot(e, [n], r);
}
function fp(e, t) {
  const n = [...t];
  let a = e;
  return t.forEach((s, r) => {
    a && (le(a) && (n[r] = a.frames.length - 1), a = Ye(a, [s]));
  }), n;
}
function Pn(e, t, n, a) {
  if (J(e)) return kn(e, n, (l) => Pn(l, t, n, a));
  if (le(e)) {
    const l = e.frames.findIndex((o) => _e(o.node, n)), i = e.frames[l];
    if (!i) return e;
    if (Ie(i.node, n)) {
      const o = Pn(i.node, t, n, a);
      if (o === i.node) return e;
      const c = [...e.frames];
      return c[l] = { ...i, node: o }, { ...e, frames: c };
    }
    return { ...e, frames: [...e.frames, ta(et(t), a)] };
  }
  if (!_e(e, n)) return e;
  let s = !1;
  const r = e.children.map((l) => {
    const i = Pn(l, t, n, a);
    return i !== l && (s = !0), i;
  });
  return s ? { ...e, children: r } : e;
}
function Ws(e, t, n, a) {
  if (t === n || !_e(e, t) || !_e(e, n) || !Ie(e, n)) return e;
  const s = Ct(e, t);
  if (!s) return e;
  const r = Pn(s, t, n, a);
  return r === s ? e : Ae(r);
}
function pp(e, t, n) {
  return le(e) ? { ...e, frames: [...e.frames, ta(et(t), n)] } : J(e) ? ro(e, t) : {
    kind: "split",
    direction: e.direction,
    children: [...e.children, et(t)],
    sizes: [...ft(e), 1],
    ...Te(e)
  };
}
function so(e, t, n, a) {
  const s = n[0];
  if (s === void 0) return pp(e, t, a);
  const r = n.slice(1), l = (u, m) => m === s ? so(u, t, r, a) : Ct(u, t);
  if (le(e)) {
    const u = e.frames.flatMap((m, k) => {
      const g = l(m.node, k);
      return g ? [g === m.node ? m : { ...m, node: g }] : [];
    });
    return { ...e, frames: u };
  }
  if (J(e)) {
    const u = Tt(e), m = [];
    e.panels.forEach((w, _) => {
      if ($e(w)) {
        w !== t && m.push(w);
        return;
      }
      const $ = l(w, _);
      $ && m.push($);
    });
    const g = e.active && m.some((w) => wn(w).includes(e.active)) ? e.active : Fe(m[u] ?? m[m.length - 1]);
    return {
      kind: "group",
      panels: m,
      ...g ? { active: g } : {},
      ...Te(e)
    };
  }
  const i = ft(e), o = [], c = [];
  return e.children.forEach((u, m) => {
    const k = l(u, m);
    k && (o.push(k), c.push(i[m] ?? 0));
  }), { kind: "split", direction: e.direction, children: o, sizes: c, ...Te(e) };
}
function js(e, t, n, a) {
  const s = Ye(e, n);
  return !s || !Jr(s) || !_e(e, t) ? e : Ae(so(e, t, n, a));
}
function ga(e, t) {
  if (J(e)) return kn(e, t, (s) => ga(s, t));
  if (le(e)) {
    const s = e.frames.findIndex((c) => _e(c.node, t)), r = e.frames[s];
    if (!r) return e;
    const l = ga(r.node, t), i = l === r.node ? r : { ...r, node: l };
    if (s === e.frames.length - 1 && i === r) return e;
    const o = [...e.frames];
    return o.splice(s, 1), o.push(i), { ...e, frames: o };
  }
  if (!_e(e, t)) return e;
  let n = !1;
  const a = e.children.map((s) => {
    const r = ga(s, t);
    return r !== s && (n = !0), r;
  });
  return n ? { ...e, children: a } : e;
}
function us(e, t) {
  if (e <= 0) return [];
  const n = () => Array.from({ length: e }, () => 1 / e);
  if (!t || t.length !== e) return n();
  const a = t.map((r) => Number.isFinite(r) && r > 0 ? r : 0), s = a.reduce((r, l) => r + l, 0);
  return s <= 0 ? n() : a.map((r) => r / s);
}
const ft = (e) => us(e.children.length, e.sizes), nt = (e) => {
  const t = J(e) ? e.panels.length : e.children.length;
  return e.places?.length === t ? e.places : void 0;
};
function Ae(e) {
  if (J(e)) return vp(e);
  if (le(e)) {
    const i = e.frames.flatMap((o) => {
      const c = Ae(o.node);
      return Oa(c) ? [] : [c === o.node ? o : { ...o, node: c }];
    });
    return i.length === e.frames.length && i.every((o, c) => o === e.frames[c]) ? e : { ...e, frames: i };
  }
  if (e.children.length === 0) return e;
  const t = ft(e), n = nt(e), a = [], s = [], r = [];
  e.children.forEach((i, o) => {
    const c = Ae(i), u = t[o] ?? 0;
    if (Oa(c)) return;
    if (!n && jt(c) && c.direction === e.direction && !nt(c) && !Et(c)) {
      const k = ft(c);
      c.children.forEach((g, w) => {
        a.push(g), s.push(u * (k[w] ?? 0));
      });
      return;
    }
    a.push(c), s.push(u);
    const m = n?.[o];
    m && r.push(m);
  });
  const l = a[0];
  return a.length === 1 && l && !Et(e) ? l : {
    kind: "split",
    direction: e.direction,
    children: a,
    sizes: us(a.length, s),
    ...Te(e),
    ...r.length === a.length && r.length > 0 ? { places: r } : {}
  };
}
function vp(e) {
  if (e.panels.every($e)) return e;
  const t = Fe(e), n = nt(e), a = [], s = [];
  e.panels.forEach((i, o) => {
    const c = n?.[o];
    if ($e(i)) {
      a.push(i), c && s.push(c);
      return;
    }
    const u = Ae(i);
    if (!Oa(u)) {
      if (J(u) && !Et(u) && !nt(u) && !e.headless) {
        a.push(...u.panels);
        return;
      }
      a.push(u), c && s.push(c);
    }
  });
  const r = a[0];
  if (a.length === 1 && r !== void 0 && !$e(r) && !Et(e))
    return r;
  if (a.length === e.panels.length && a.every((i, o) => i === e.panels[o]))
    return e;
  const l = t && a.some((i) => wn(i).includes(t)) ? t : void 0;
  return {
    kind: "group",
    panels: a,
    ...l ? { active: l } : {},
    ...Te(e),
    ...s.length === a.length && s.length > 0 ? { places: s } : {}
  };
}
function Ct(e, t) {
  if (le(e)) {
    const l = e.frames.flatMap((i) => {
      const o = Ct(i.node, t);
      return o ? [o === i.node ? i : { ...i, node: o }] : [];
    });
    return l.length === 0 && !Ia(e) ? null : { ...e, frames: l };
  }
  if (J(e)) {
    if (!_e(e, t)) return e;
    const l = Tt(e), i = [];
    for (const u of e.panels) {
      if ($e(u)) {
        u !== t && i.push(u);
        continue;
      }
      const m = Ct(u, t);
      m && i.push(m);
    }
    if (i.length === 0) return null;
    const c = e.active && i.some((u) => wn(u).includes(e.active)) ? e.active : Fe(i[l] ?? i[i.length - 1]);
    return c ? { kind: "group", panels: i, active: c, ...Te(e) } : { kind: "group", panels: i, ...Te(e) };
  }
  const n = ft(e), a = [], s = [];
  if (e.children.forEach((l, i) => {
    const o = Ct(l, t);
    o && (a.push(o), s.push(n[i] ?? 0));
  }), a.length === 0)
    return Ia(e) ? { kind: "split", direction: e.direction, children: a, sizes: [], ...Te(e) } : null;
  const r = a[0];
  return a.length === 1 && r && !Et(e) ? r : Ae({
    kind: "split",
    direction: e.direction,
    children: a,
    sizes: s,
    ...Te(e)
  });
}
function ro(e, t, n) {
  const a = e.panels.filter((r) => r !== t), s = n === void 0 ? a.length : Math.max(0, Math.min(n, a.length));
  return a.splice(s, 0, t), { kind: "group", panels: a, active: t, ...Te(e) };
}
function Yt(e, t, n, a, s) {
  const r = (g) => _n(
    g,
    (w) => _e(w, n) ? Yt(w, t, n, a, s) : w
  );
  if (a === "float") return e;
  const l = (g) => kn(g, n, (w) => Yt(w, t, n, a, s));
  if (a === "center")
    return J(e) ? Xe(e, n) ? ro(e, t, s) : l(e) : le(e) ? r(e) : {
      ...e,
      children: e.children.map(
        (g) => _e(g, n) ? Yt(g, t, n, a, s) : g
      )
    };
  const i = rp(a), o = a === "left" || a === "top", c = (g) => ({
    kind: "split",
    direction: i,
    children: o ? [et(t), g] : [g, et(t)],
    sizes: [0.5, 0.5]
  });
  if (J(e)) return Xe(e, n) ? c(e) : l(e);
  if (le(e)) return r(e);
  const u = ft(e), m = e.children.findIndex(
    (g) => J(g) && Xe(g, n)
  );
  if (m >= 0 && e.direction === i) {
    const g = (u[m] ?? 0) / 2, w = [...e.children], _ = [...u];
    return w.splice(o ? m : m + 1, 0, et(t)), _.splice(m, 1, g, g), {
      kind: "split",
      direction: i,
      children: w,
      sizes: _,
      ...Te(e)
    };
  }
  const k = e.children.map((g) => _e(g, n) ? J(g) && Xe(g, n) ? c(g) : Yt(g, t, n, a) : g);
  return {
    kind: "split",
    direction: e.direction,
    children: k,
    sizes: u,
    ...Te(e)
  };
}
function Bt(e, t) {
  if (J(e)) {
    if (Xe(e, t))
      return eo(e) === t ? e : { ...e, active: t };
    const s = e.panels.findIndex((o) => !$e(o) && _e(o, t)), r = e.panels[s];
    if (r === void 0 || $e(r)) return e;
    const l = Bt(r, t);
    if (l === r && e.active === t) return e;
    const i = [...e.panels];
    return i[s] = l, { ...e, panels: i, active: t };
  }
  if (!_e(e, t)) return e;
  if (le(e)) return _n(e, (s) => Bt(s, t));
  let n = !1;
  const a = e.children.map((s) => {
    const r = Bt(s, t);
    return r !== s && (n = !0), r;
  });
  return n ? { ...e, children: a } : e;
}
function an(e, t, n) {
  if (J(e)) {
    if (!Xe(e, t)) return kn(e, t, (c) => an(c, t, n));
    const a = e.panels.indexOf(t), s = Math.max(0, Math.min(n, e.panels.length - 1));
    if (a === s) return e;
    const r = [...e.panels];
    r.splice(a, 1), r.splice(s, 0, t);
    const l = nt(e), i = l ? [...l] : void 0;
    i && i.splice(s, 0, ...i.splice(a, 1));
    const o = Fe(e);
    return {
      kind: "group",
      panels: r,
      ...o ? { active: o } : {},
      ...Te(e),
      ...i ? { places: i } : {}
    };
  }
  return _e(e, t) ? le(e) ? _n(e, (a) => an(a, t, n)) : { ...e, children: e.children.map((a) => an(a, t, n)) } : e;
}
function An(e, t, n) {
  if (t === n) return e;
  if (J(e)) {
    if (!_e(e, t) && !_e(e, n)) return e;
    const a = (r) => r === t ? n : r === n ? t : r, s = e.panels.map((r) => $e(r) ? a(r) : An(r, t, n));
    return { ...e, panels: s, ...e.active ? { active: a(e.active) } : {} };
  }
  return le(e) ? _n(e, (a) => An(a, t, n)) : { ...e, children: e.children.map((a) => An(a, t, n)) };
}
function Cn(e, t, n, a, s) {
  if (a === "float" || !_e(e, t) || !_e(e, n)) return e;
  const r = Ft(e, t);
  if (a === "center" && r && Xe(r, n)) {
    if (s === void 0) return e;
    const i = r.panels.indexOf(t), o = s > i ? s - 1 : s;
    return o === i ? e : Bt(an(e, t, o), t);
  }
  if (t === n) return e;
  const l = Ct(e, t);
  return l ? Ae(Yt(l, t, n, a, s)) : e;
}
function oo(e, t, n) {
  if (J(e)) {
    const s = e.panels[t];
    if (s === void 0 || $e(s)) return e;
    const r = [...e.panels];
    return r[t] = n, { ...e, panels: r };
  }
  if (le(e)) {
    const s = e.frames[t];
    if (!s) return e;
    const r = [...e.frames];
    return r[t] = { ...s, node: n }, { ...e, frames: r };
  }
  const a = [...e.children];
  return a[t] = n, { ...e, children: a };
}
function bn(e, t, n) {
  const a = aa(e);
  if (!J(e) && a.some(({ node: s }) => J(s) && Xe(s, t))) {
    const s = n(e);
    return s === e ? null : s;
  }
  for (const { node: s, index: r } of a) {
    if (!_e(s, t)) continue;
    const l = bn(s, t, n);
    return l ? oo(e, r, l) : null;
  }
  return null;
}
function ph(e, t, n) {
  const a = bn(
    e,
    t,
    (s) => jt(s) && s.direction !== n ? { ...s, direction: n } : s
  );
  return a ? Ae(a) : e;
}
function lo(e) {
  return le(e) ? [e] : nt(e) || Et(e) ? [e] : J(e) ? [...e.panels] : e.children.flatMap(lo);
}
function io(e, t) {
  if (J(e)) return e;
  const n = is(e).map(lo), a = n.flat(), s = t && a.some((l) => wn(l).includes(t)) ? t : void 0, r = hp(e, n);
  return Ae({
    kind: "group",
    panels: a,
    ...s ? { active: s } : {},
    ...Te(e),
    ...r ? { places: r } : {}
  });
}
function hp(e, t) {
  const n = le(e) ? e.frames.map(({ node: a, ...s }) => s) : nt(e);
  if (n)
    return t.every((a) => a.length === 1) ? n : void 0;
}
function mp(e, t) {
  const n = bn(e, t, (a) => io(a, t));
  return n ? Ae(n) : e;
}
function ds(e, t, n) {
  if (J(e) && Xe(e, t)) {
    const a = n(e);
    return a === e ? null : a;
  }
  for (const { node: a, index: s } of aa(e)) {
    if (!_e(a, t)) continue;
    const r = ds(a, t, n);
    return r ? oo(e, s, r) : null;
  }
  return null;
}
function Us(e, t, n) {
  const a = ds(e, t, (s) => co(s, n));
  return a ? Ae(a) : e;
}
function Gs(e, t, n) {
  const a = Ye(e, t);
  return !a || !J(a) || a.panels.length < 2 ? e : Ae(ot(e, t, co(a, n)));
}
function co(e, t) {
  if (e.panels.length < 2) return e;
  const n = nt(e);
  return {
    ...os(t, e.panels.map(ea)),
    ...Te(e),
    ...n ? { places: n } : {}
  };
}
function Na(e, t) {
  if (J(e)) return e;
  if (le(e)) {
    const s = e.frames.findIndex(
      (i) => J(i.node) && i.node.panels.includes(t)
    ), r = e.frames[s], l = r && J(r.node) ? r.node : null;
    if (r && l && l.panels.length > 1) {
      const i = na(l.panels.map(ea), r.rect).frames;
      return {
        ...e,
        frames: [...e.frames.slice(0, s), ...i, ...e.frames.slice(s + 1)]
      };
    }
    return _n(e, (i) => Na(i, t));
  }
  if (!_e(e, t)) return e;
  let n = !1;
  const a = e.children.map((s) => {
    const r = Na(s, t);
    return r !== s && (n = !0), r;
  });
  return n ? { ...e, children: a } : e;
}
function gp(e, t, n) {
  const a = Ft(e, t);
  if (!a || a.panels.length < 2) return e;
  if (Ie(e, t)?.node === a) {
    const l = Na(e, t);
    return l === e ? e : Ae(l);
  }
  const r = ds(e, t, (l) => uo(l, n));
  return r ? Ae(r) : e;
}
function yp(e, t, n) {
  const a = Ye(e, t);
  if (!a || !J(a) || a.panels.length < 2) return e;
  const s = t.slice(0, -1), r = t.length > 0 ? Ye(e, s) : null, l = t[t.length - 1], i = r && le(r) && l !== void 0 ? r.frames[l] : void 0;
  if (r && le(r) && i && l !== void 0) {
    const o = na(a.panels.map(ea), i.rect).frames, c = [...r.frames.slice(0, l), ...o, ...r.frames.slice(l + 1)];
    return Ae(ot(e, s, { ...r, frames: c }));
  }
  return Ae(ot(e, t, uo(a, n)));
}
function uo(e, t) {
  return {
    ...rs(fo(e.panels.map(ea), nt(e), t)),
    ...Te(e)
  };
}
function fo(e, t, n) {
  return t ? e.map((a, s) => ({ ...t[s], node: a })) : na(e, n).frames;
}
function po(e, t) {
  return { ...rs(fo(e.children, nt(e), t)), ...Te(e) };
}
function vh(e, t, n) {
  const a = bn(
    e,
    t,
    (s) => le(s) ? s : po(s, n)
  );
  return a ? Ae(a) : J(e) && Xe(e, t) ? na([e], n) : e;
}
function _p(e, t) {
  const n = (s) => t === "column" ? s.rect.y : s.rect.x, a = (s) => t === "column" ? s.rect.x : s.rect.y;
  return [...e].sort((s, r) => n(s) - n(r) || a(s) - a(r));
}
function vo(e, t) {
  const n = _p(e.frames, t);
  return {
    kind: "split",
    direction: t,
    children: n.map((a) => a.node),
    ...Te(e),
    places: n.map(({ node: a, ...s }) => s)
  };
}
function hh(e, t, n = "row") {
  const a = bn(
    e,
    t,
    (s) => le(s) ? vo(s, n) : s
  );
  return a ? Ae(a) : e;
}
function ho(e) {
  if (le(e)) return null;
  const t = J(e) ? e.panels.length === 1 ? e.panels[0] : void 0 : e.children.length === 1 ? e.children[0] : void 0;
  return t === void 0 || $e(t) || J(t) && t.panels.length === 1 && $e(t.panels[0]) ? null : t;
}
const wp = (e) => {
  const { title: t, fixedView: n, headless: a, ...s } = e;
  return s;
};
function kp(e, t) {
  const n = ho(e);
  return n ? t === "inner" ? n : { ...wp(n), ...Te(e) } : e;
}
function Vt(e) {
  return e.title ? e.title : J(e) ? "" : le(e) ? "Desktop" : e.direction === "row" ? "Row" : "Column";
}
function sn(e, t) {
  if (J(e)) {
    const a = e.panels[Tt(e)];
    return a === void 0 ? "" : $e(a) ? t(a) ?? a : Vt(a) || sn(a, t);
  }
  if (e.title) return e.title;
  if (le(e)) {
    const a = e.frames[e.frames.length - 1];
    return a ? a.title ?? sn(a.node, t) : "";
  }
  const n = e.children[0];
  return n ? sn(n, t) : "";
}
function Ye(e, t) {
  let n = e;
  for (const a of t) {
    if (!n) return null;
    if (jt(n)) n = n.children[a];
    else if (le(n)) n = n.frames[a]?.node;
    else {
      const s = n.panels[a];
      n = s === void 0 || $e(s) ? void 0 : s;
    }
  }
  return n ?? null;
}
function ot(e, t, n) {
  if (t.length === 0) return n;
  const [a, ...s] = t;
  if (a === void 0) return e;
  if (le(e)) {
    const o = e.frames[a];
    if (!o) return e;
    const c = ot(o.node, s, n);
    if (c === o.node) return e;
    const u = [...e.frames];
    return u[a] = { ...o, node: c }, { ...e, frames: u };
  }
  if (J(e)) {
    const o = e.panels[a];
    if (o === void 0 || $e(o)) return e;
    const c = ot(o, s, n);
    if (c === o) return e;
    const u = [...e.panels];
    return u[a] = c, { ...e, panels: u };
  }
  const r = e.children[a];
  if (!r) return e;
  const l = ot(r, s, n);
  if (l === r) return e;
  const i = [...e.children];
  return i[a] = l, { ...e, children: i };
}
function Tn(e, t, n) {
  if (t.length === 0)
    return jt(e) ? { ...e, sizes: us(e.children.length, n) } : e;
  const [a, ...s] = t;
  if (a === void 0) return e;
  if (le(e)) {
    const i = e.frames[a];
    if (!i) return e;
    const o = Tn(i.node, s, n);
    if (o === i.node) return e;
    const c = [...e.frames];
    return c[a] = { ...i, node: o }, { ...e, frames: c };
  }
  if (J(e)) {
    const i = e.panels[a];
    if (i === void 0 || $e(i)) return e;
    const o = Tn(i, s, n);
    if (o === i) return e;
    const c = [...e.panels];
    return c[a] = o, { ...e, panels: c };
  }
  const r = e.children[a];
  if (!r) return e;
  const l = [...e.children];
  return l[a] = Tn(r, s, n), { ...e, children: l };
}
function Qs(e, t, n, a = 0.02) {
  const s = e[t], r = e[t + 1];
  if (s === void 0 || r === void 0) return e;
  const l = s + r;
  if (l < a * 2) return e;
  const i = [...e], o = Math.min(Math.max(s + n, a), l - a);
  return i[t] = o, i[t + 1] = l - o, i;
}
function Vn(e) {
  if (!J(e) || e.panels.length >= 2) return e;
  const t = e.panels[0];
  return t !== void 0 && !$e(t) ? e : { ...ls([bp(e)]), ...Te(e) };
}
const bp = (e) => {
  if (!e.title) return e;
  const { title: t, ...n } = e;
  return n;
};
function Xs(e) {
  return e.length === 0 ? null : ls(e.map(et));
}
function $p(e, t) {
  if (!e) return Xs(t);
  const n = new Set(t), a = /* @__PURE__ */ new Set(), s = /* @__PURE__ */ new Set();
  for (const o of Ze(e))
    !n.has(o) || a.has(o) ? s.add(o) : a.add(o);
  let r = e;
  for (const o of s)
    r = r ? Ct(r, o) : null;
  const l = new Set(r ? Ze(r) : []), i = t.filter((o) => !l.has(o));
  if (i.length === 0) return r ? Vn(Ae(r)) : null;
  if (!r) return Xs(i);
  if (le(r)) {
    const o = r.frames.length;
    return {
      ...r,
      frames: [
        ...r.frames,
        ...i.map(
          (c, u) => ta(et(c), {
            x: xt.x + (o + u) * qn,
            y: xt.y + (o + u) * qn
          })
        )
      ]
    };
  }
  return Vn(Ae(ls([r, ...i.map(et)])));
}
const fs = Symbol("dc.windowContext");
function xp(e) {
  return cn(fs, e), e;
}
function sa() {
  const e = St(fs, null);
  if (!e)
    throw new Error(
      "[header-content-layout] No window context found. Render this component inside <WindowFrame>."
    );
  return e;
}
const Cp = 320, Sp = 240;
function Mp(e) {
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
function Ep(e, t) {
  if (typeof window > "u") return null;
  const n = Math.max(Cp, Math.round(t?.width ?? window.innerWidth)), a = Math.max(Sp, Math.round(t?.height ?? window.innerHeight)), s = ["popup", `width=${n}`, `height=${a}`];
  t?.left !== void 0 && s.push(`left=${t.left}`), t?.top !== void 0 && s.push(`top=${t.top}`);
  const r = window.open(e, "_blank", s.join(","));
  if (r)
    try {
      r.opener = null;
    } catch {
    }
  return r;
}
const Pp = ["data-dc-glyph"], Ap = { class: "dc-glyph__line" }, Tp = ["d"], Lp = {
  key: 0,
  class: "dc-glyph__aqua"
}, Rp = ["d"], zp = /* @__PURE__ */ ne({
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
    return (a, s) => (d(), v("svg", {
      class: "dc-glyph",
      "data-dc-glyph": e.kind,
      viewBox: "0 0 10 10",
      "aria-hidden": "true",
      focusable: "false"
    }, [
      C("g", Ap, [
        (d(!0), v(ee, null, de(t[e.kind], (r) => (d(), v("path", {
          key: r,
          d: r
        }, null, 8, Tp))), 128))
      ]),
      n[e.kind] ? (d(), v("g", Lp, [
        (d(!0), v(ee, null, de(n[e.kind], (r) => (d(), v("path", {
          key: r,
          d: r
        }, null, 8, Rp))), 128))
      ])) : A("", !0)
    ], 8, Pp));
  }
}), Dt = /* @__PURE__ */ re(zp, [["__scopeId", "data-v-4d2872c0"]]), Ip = ["data-dc-order", "data-dc-path", "data-dc-maximized", "data-dc-minimized", "data-dc-dragging"], Op = ["data-dc-movable"], Fp = { class: "dc-float__title dc-truncate" }, Np = {
  key: 1,
  class: "dc-float__controls dc-controls"
}, Bp = ["aria-label", "aria-pressed", "data-dc-minimize"], Dp = ["aria-label", "aria-pressed", "data-dc-maximize"], Hp = ["aria-label", "data-dc-close"], qp = { class: "dc-float__content" }, Vp = ["data-dc-handle", "onPointerdown"], Kp = /* @__PURE__ */ ne({
  __name: "WindowFloat",
  props: {
    frame: {},
    path: {},
    order: {},
    place: {}
  },
  setup(e) {
    const t = e, n = sa(), a = p(() => Fe(t.frame.node)), s = p(() => n.panelFor(a.value)?.fixed === !0), r = p(() => gt(t.frame)), l = p(() => $t(t.frame)), i = p(() => r.value || l.value), o = p(() => n.resizable.value && !s.value && !i.value), c = p(() => n.movable.value && !s.value && !i.value), u = p(() => {
      const T = Ze(t.frame.node);
      return T.length === 1 ? T[0] ?? null : null;
    }), m = p(() => u.value !== null && n.closable(u.value)), k = p(() => t.frame.node.headless === !0), g = p(
      () => !k.value && (!J(t.frame.node) || l.value)
    ), w = p(
      () => t.frame.title || Vt(t.frame.node) || sn(t.frame.node, (T) => n.panelFor(T)?.title)
    ), _ = p(() => n.spaceMenu(t.path));
    function $(T) {
      T.target?.closest("button, a, input, select, textarea, label") || n.beginFrameDragAt(t.path, T, "move");
    }
    function x(T) {
      T.target?.closest("button, a, input, select, textarea, label") || (l.value ? n.toggleMinimizeAt(t.path) : n.toggleMaximizeAt(t.path));
    }
    const M = p(() => {
      const T = n.framing.value;
      return T !== null && _e(t.frame.node, T);
    }), b = p(() => ({
      // Neither maximizing nor rolling up overwrites the rect: it is where the
      // window goes back to, and both are a way of not being there for a while.
      ...r.value ? { inset: "0" } : l.value && t.place ? {
        left: `${t.place.x}px`,
        bottom: `${t.place.bottom}px`,
        width: `${za}px`,
        height: `${Zr}px`
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
    return (T, B) => (d(), v("div", {
      class: "dc-float",
      style: Se(b.value),
      "data-dc-order": e.order,
      "data-dc-path": e.path.join("/"),
      "data-dc-maximized": r.value ? "true" : "false",
      "data-dc-minimized": l.value ? "true" : "false",
      "data-dc-dragging": M.value ? "true" : "false",
      onPointerdown: B[3] || (B[3] = (L) => P(n).raiseAt(e.path))
    }, [
      g.value ? (d(), v("header", {
        key: 0,
        class: "dc-float__bar",
        "data-dc-movable": c.value ? "true" : "false",
        onPointerdown: $,
        onDblclick: x
      }, [
        C("span", Fp, z(w.value), 1),
        _.value.length ? (d(), G(ss, {
          key: 0,
          items: _.value,
          label: `${w.value} menu`
        }, null, 8, ["items", "label"])) : A("", !0),
        !s.value || l.value && m.value && u.value ? (d(), v("div", Np, [
          s.value ? A("", !0) : (d(), v("button", {
            key: 0,
            type: "button",
            class: "dc-float__button dc-control",
            "aria-label": `${l.value ? "Unroll" : "Minimize"} ${w.value}`,
            "aria-pressed": l.value,
            "data-dc-minimize": a.value,
            onClick: B[0] || (B[0] = (L) => P(n).toggleMinimizeAt(e.path))
          }, [
            ie(Dt, {
              kind: l.value ? "unroll" : "minimize"
            }, null, 8, ["kind"])
          ], 8, Bp)),
          s.value ? A("", !0) : (d(), v("button", {
            key: 1,
            type: "button",
            class: "dc-float__button dc-control",
            "aria-label": `${r.value ? "Restore" : "Maximize"} ${w.value}`,
            "aria-pressed": r.value,
            "data-dc-maximize": a.value,
            onClick: B[1] || (B[1] = (L) => P(n).toggleMaximizeAt(e.path))
          }, [
            ie(Dt, {
              kind: r.value ? "restore" : "maximize"
            }, null, 8, ["kind"])
          ], 8, Dp)),
          l.value && m.value && u.value ? (d(), v("button", {
            key: 2,
            type: "button",
            class: "dc-float__button dc-control",
            "aria-label": `Close ${w.value}`,
            "data-dc-close": u.value,
            onClick: B[2] || (B[2] = (L) => P(n).close(u.value))
          }, [
            ie(Dt, { kind: "close" })
          ], 8, Hp)) : A("", !0)
        ])) : A("", !0)
      ], 40, Op)) : A("", !0),
      C("div", qp, [
        ye(T.$slots, "default", {}, void 0, !0)
      ]),
      (d(!0), v(ee, null, de(o.value ? S : [], (L) => (d(), v("span", {
        key: L,
        class: "dc-float__grip",
        "data-dc-handle": L,
        "aria-hidden": "true",
        onPointerdown: Ve((I) => P(n).beginFrameDragAt(e.path, I, L), ["stop"])
      }, null, 40, Vp))), 128))
    ], 44, Ip));
  }
}), Wp = /* @__PURE__ */ re(Kp, [["__scopeId", "data-v-f035684c"]]), ps = Symbol("dc.paneContext");
function mo(e) {
  return cn(ps, e), e;
}
function mh() {
  return St(ps, null);
}
function gh(e) {
  const t = St(fs, null), n = St(ps, null);
  if (!t || !n) return () => {
  };
  const a = t.registerMenu(
    () => n.panel.value,
    () => ut(e)
  );
  return Kn() && Kt(a), a;
}
const jp = ["data-dc-panel"], Up = /* @__PURE__ */ ne({
  __name: "WindowPaneBody",
  props: {
    panel: {},
    active: { type: Boolean }
  },
  setup(e) {
    const t = e, n = sa();
    mo({ panel: p(() => t.panel) });
    const a = () => {
      const s = n.panelFor(t.panel);
      return s ? n.renderContent(s, n.viewFor(t.panel), t.active) ?? null : null;
    };
    return (s, r) => (d(), v("div", {
      class: "dc-pane__content",
      "data-dc-panel": t.panel
    }, [
      ie(a)
    ], 8, jp));
  }
}), Gp = /* @__PURE__ */ re(Up, [["__scopeId", "data-v-31c655fd"]]), Qp = ["data-dc-panel", "data-dc-panels", "data-dc-tabbed", "data-dc-floating", "data-dc-maximized", "data-dc-headless", "data-dc-active", "data-dc-dragging", "aria-label"], Xp = ["data-dc-movable"], Yp = ["aria-label", "aria-pressed"], Zp = ["data-dc-space-name"], Jp = { class: "dc-truncate" }, ev = ["aria-label"], tv = {
  key: 0,
  class: "dc-pane__insert",
  "aria-hidden": "true"
}, nv = ["id", "data-dc-panel", "data-dc-space", "aria-selected", "aria-controls", "tabindex", "onPointerdown", "onClick", "onKeydown"], av = { class: "dc-tab__name dc-truncate" }, sv = {
  key: 0,
  class: "dc-pane__sub dc-mono dc-truncate"
}, rv = ["aria-label", "data-dc-close", "onClick"], ov = {
  key: 0,
  class: "dc-pane__insert",
  "aria-hidden": "true"
}, lv = { class: "dc-pane__tools" }, iv = {
  key: 2,
  class: "dc-pane__controls dc-controls"
}, cv = ["aria-label", "data-dc-minimize"], uv = ["aria-label", "aria-pressed", "data-dc-maximize"], dv = ["aria-label", "data-dc-close"], fv = ["id", "role", "aria-labelledby"], pv = ["id", "role", "aria-labelledby"], vv = ["data-dc-edge"], hv = /* @__PURE__ */ ne({
  __name: "WindowPane",
  props: {
    group: {},
    path: {}
  },
  setup(e) {
    const t = e, n = sa(), a = dn() ?? "dc-pane", s = p(
      () => t.group.panels.flatMap((W, Y) => {
        if (!$e(W)) {
          const Oe = Vt(W) || sn(W, (De) => n.panelFor(De)?.title);
          return [{ kind: "space", index: Y, id: `space-${Y}`, title: Oe, node: W }];
        }
        const ae = n.panelFor(W);
        return ae ? [{ kind: "panel", index: Y, id: W, title: ae.title, panel: ae }] : [];
      })
    ), r = p(() => s.value.length > 1), l = p(() => {
      const W = Tt(t.group);
      return s.value.find((Y) => Y.index === W) ?? s.value[0] ?? null;
    }), i = p(() => l.value?.kind === "space" ? l.value.node : null), o = p(() => i.value ? "" : eo(t.group)), c = p(() => i.value ? null : n.panelFor(o.value)), u = p(() => l.value?.title ?? ""), m = p(() => n.spaceNames.value ? t.group.title ?? "" : ""), k = p(() => [...t.path, l.value?.index ?? 0]), g = p(() => o.value || qs(t.group)[0] || ""), w = p(() => n.viewFor(o.value)), _ = p(() => t.group.headless === !0), $ = p(() => n.focused.value === o.value), x = p(() => n.dragging.value === o.value), M = p(() => n.moving.value === o.value), b = p(() => n.frameOf(g.value) !== null), S = p(() => n.panelFor(g.value)?.fixed === !0), T = p(
      () => !i.value && (n.canMove(o.value) || b.value && n.movable.value && !S.value)
    ), B = p(
      () => i.value ? n.spaceMenu(k.value) : n.menuFor(o.value)
    ), L = (W) => n.closable(W);
    mo({ panel: o });
    const I = p(() => n.maximized(g.value)), E = p(
      () => b.value && !S.value || !r.value && !!c.value && L(c.value.id)
    ), V = (W) => `${a}-tab-${W}`, q = p(() => `${a}-body`), Q = p(() => {
      const W = n.dropTarget.value;
      return !W || !Xe(t.group, W.panel) || W.edge === "float" ? null : W;
    }), he = p(() => Q.value?.index === void 0 ? Q.value?.edge ?? null : null), pe = p(() => Q.value?.index ?? null), Be = p(
      () => s.value.flatMap(
        (W) => W.kind === "panel" && (W.id === o.value || W.panel.keepAlive === !0) ? [W.id] : []
      )
    ), H = D(null), U = /* @__PURE__ */ new Map();
    be(
      o,
      (W, Y) => {
        const ae = H.value;
        if (!ae || (Y && U.set(Y, ae.scrollTop), !n.panelFor(W)?.keepAlive || !U.has(W))) return;
        const Oe = U.get(W);
        vt(() => {
          H.value && (H.value.scrollTop = Oe);
        });
      },
      { flush: "pre" }
    );
    const ge = () => c.value ? n.renderActions(c.value, w.value, $.value) ?? null : null;
    let oe = null;
    function xe(W) {
      const Y = oe !== null && Math.hypot(W.clientX - oe.x, W.clientY - oe.y) >= 4;
      return oe = null, Y;
    }
    const Me = (W) => W.kind === "panel" ? W.id : Fe(W.node);
    function Re(W, Y) {
      Y.kind !== "space" && (n.focus(Y.id), oe = { x: W.clientX, y: W.clientY }, n.beginDrag(Y.id, W));
    }
    function Ue(W, Y) {
      if (xe(W)) return;
      const ae = Me(Y);
      ae && n.selectPanel(ae);
    }
    function F(W) {
      o.value && n.focus(o.value), !W.target?.closest(".dc-tab, button, a, input, select, textarea, label") && (b.value ? n.beginFrameDrag(g.value, W, "move") : n.beginDrag(o.value, W));
    }
    function se(W) {
      oe = { x: W.clientX, y: W.clientY }, n.beginDrag(o.value, W);
    }
    function ve(W) {
      xe(W) || n.toggleMoveMode(o.value);
    }
    const We = {
      ArrowLeft: "left",
      ArrowRight: "right",
      ArrowUp: "up",
      ArrowDown: "down"
    };
    function K(W) {
      if (!M.value) return;
      if (W.key === "Escape") {
        W.preventDefault(), n.toggleMoveMode(o.value);
        return;
      }
      const Y = We[W.key];
      Y && (W.preventDefault(), b.value ? n.nudgeFrame(o.value, Y, W.shiftKey) : n.nudge(o.value, Y, W.shiftKey));
    }
    function Z(W) {
      !b.value || W.target?.closest(".dc-tab, button, a, input, select, textarea, label") || n.toggleMaximize(g.value);
    }
    function X(W, Y) {
      W.stopPropagation(), oe = null, n.close(Y);
    }
    function Ge(W, Y) {
      const ae = s.value.length;
      let Oe = null;
      if (W.key === "ArrowRight" ? Oe = (Y + 1) % ae : W.key === "ArrowLeft" ? Oe = (Y - 1 + ae) % ae : W.key === "Home" ? Oe = 0 : W.key === "End" && (Oe = ae - 1), Oe === null) return;
      W.preventDefault();
      const De = s.value[Oe];
      if (!De) return;
      const Ut = Me(De);
      Ut && n.selectPanel(Ut);
    }
    return (W, Y) => l.value ? (d(), v("section", {
      key: 0,
      class: "dc-pane",
      "data-dc-panel": o.value || void 0,
      "data-dc-panels": P(qs)(e.group).join(" ") || void 0,
      "data-dc-tabbed": r.value ? "true" : "false",
      "data-dc-floating": b.value ? "true" : "false",
      "data-dc-maximized": I.value ? "true" : "false",
      "data-dc-headless": _.value ? "true" : "false",
      "data-dc-active": $.value ? "true" : "false",
      "data-dc-dragging": x.value ? "true" : "false",
      "aria-label": u.value,
      onFocusin: Y[7] || (Y[7] = (ae) => o.value && P(n).focus(o.value))
    }, [
      _.value ? A("", !0) : (d(), v("header", {
        key: 0,
        class: "dc-pane__head",
        "data-dc-movable": T.value ? "true" : "false",
        onPointerdown: F,
        onDblclick: Z
      }, [
        T.value ? (d(), v("button", {
          key: 0,
          type: "button",
          class: "dc-pane__grip",
          "aria-label": `Move ${u.value}`,
          "aria-pressed": M.value,
          onPointerdown: se,
          onClick: ve,
          onKeydown: K
        }, [...Y[8] || (Y[8] = [
          C("span", { "aria-hidden": "true" }, "⠿", -1)
        ])], 40, Yp)) : A("", !0),
        m.value ? (d(), v("span", {
          key: 1,
          class: "dc-pane__name",
          "data-dc-space-name": m.value
        }, [
          C("span", Jp, z(m.value), 1)
        ], 8, Zp)) : A("", !0),
        C("div", {
          class: "dc-pane__tabs",
          role: "tablist",
          "aria-label": `${u.value} panels`
        }, [
          (d(!0), v(ee, null, de(s.value, (ae, Oe) => (d(), v(ee, {
            key: ae.id
          }, [
            pe.value === Oe ? (d(), v("span", tv)) : A("", !0),
            C("button", {
              id: V(ae.id),
              type: "button",
              role: "tab",
              class: "dc-tab",
              "data-dc-panel": ae.kind === "panel" ? ae.id : void 0,
              "data-dc-space": ae.kind === "space" ? ae.title : void 0,
              "aria-selected": ae.index === l.value.index,
              "aria-controls": q.value,
              tabindex: ae.index === l.value.index ? 0 : -1,
              onPointerdown: (De) => Re(De, ae),
              onClick: (De) => Ue(De, ae),
              onKeydown: (De) => Ge(De, Oe)
            }, [
              C("span", av, z(ae.title), 1),
              ae.kind === "panel" && ae.panel.subtitle ? (d(), v("span", sv, z(ae.panel.subtitle), 1)) : A("", !0),
              r.value && ae.kind === "panel" && L(ae.id) ? (d(), v("span", {
                key: 1,
                class: "dc-tab__close",
                role: "button",
                tabindex: "-1",
                "aria-label": `Close ${ae.title}`,
                "data-dc-close": ae.id,
                onPointerdown: Y[0] || (Y[0] = Ve(() => {
                }, ["stop"])),
                onClick: (De) => X(De, ae.id)
              }, [...Y[9] || (Y[9] = [
                C("span", { "aria-hidden": "true" }, "×", -1)
              ])], 40, rv)) : A("", !0)
            ], 40, nv)
          ], 64))), 128)),
          pe.value === s.value.length ? (d(), v("span", ov)) : A("", !0)
        ], 8, ev),
        C("div", lv, [
          ie(ge),
          B.value.length ? (d(), G(ss, {
            key: 0,
            items: B.value,
            label: `${u.value} menu`
          }, null, 8, ["items", "label"])) : A("", !0)
        ]),
        E.value ? (d(), v("div", iv, [
          b.value && !S.value ? (d(), v("button", {
            key: 0,
            type: "button",
            class: "dc-pane__button dc-control",
            "aria-label": `Minimize ${u.value}`,
            "data-dc-minimize": g.value,
            onPointerdown: Y[1] || (Y[1] = Ve(() => {
            }, ["stop"])),
            onClick: Y[2] || (Y[2] = (ae) => P(n).toggleMinimize(g.value))
          }, [
            ie(Dt, { kind: "minimize" })
          ], 40, cv)) : A("", !0),
          b.value && !S.value ? (d(), v("button", {
            key: 1,
            type: "button",
            class: "dc-pane__button dc-control",
            "aria-label": `${I.value ? "Restore" : "Maximize"} ${u.value}`,
            "aria-pressed": I.value,
            "data-dc-maximize": g.value,
            onPointerdown: Y[3] || (Y[3] = Ve(() => {
            }, ["stop"])),
            onClick: Y[4] || (Y[4] = (ae) => P(n).toggleMaximize(g.value))
          }, [
            ie(Dt, {
              kind: I.value ? "restore" : "maximize"
            }, null, 8, ["kind"])
          ], 40, uv)) : A("", !0),
          !r.value && c.value && L(c.value.id) ? (d(), v("button", {
            key: 2,
            type: "button",
            class: "dc-pane__close dc-control",
            "aria-label": `Close ${u.value}`,
            "data-dc-close": c.value.id,
            onPointerdown: Y[5] || (Y[5] = Ve(() => {
            }, ["stop"])),
            onClick: Y[6] || (Y[6] = (ae) => P(n).close(c.value.id))
          }, [
            ie(Dt, { kind: "close" })
          ], 40, dv)) : A("", !0)
        ])) : A("", !0)
      ], 40, Xp)),
      i.value ? (d(), v("div", {
        key: 1,
        id: q.value,
        class: "dc-pane__space",
        role: _.value ? void 0 : "tabpanel",
        "aria-labelledby": _.value ? void 0 : V(l.value.id)
      }, [
        ye(W.$slots, "space", {
          node: i.value,
          path: k.value
        }, void 0, !0)
      ], 8, fv)) : A("", !0),
      !i.value || Be.value.length ? _t((d(), v("div", {
        key: 2,
        id: i.value ? void 0 : q.value,
        ref_key: "body",
        ref: H,
        class: "dc-pane__body",
        role: _.value || i.value ? void 0 : "tabpanel",
        "aria-labelledby": _.value || i.value ? void 0 : V(o.value)
      }, [
        (d(!0), v(ee, null, de(Be.value, (ae) => _t((d(), G(Gp, {
          key: ae,
          panel: ae,
          active: ae === o.value && $.value
        }, null, 8, ["panel", "active"])), [
          [In, ae === o.value]
        ])), 128))
      ], 8, pv)), [
        [In, !i.value]
      ]) : A("", !0),
      he.value ? (d(), v("div", {
        key: 3,
        class: "dc-pane__drop",
        "data-dc-edge": he.value,
        "aria-hidden": "true"
      }, null, 8, vv)) : A("", !0)
    ], 40, Qp)) : A("", !0);
  }
}), go = /* @__PURE__ */ re(hv, [["__scopeId", "data-v-2c3c5ecf"]]), mv = ["data-dc-space", "data-dc-path", "data-dc-bare", "aria-label"], gv = {
  key: 0,
  class: "dc-space__head"
}, yv = { class: "dc-space__title dc-truncate" }, _v = ["data-dc-direction"], wv = {
  key: 0,
  class: "dc-space__drop",
  "aria-hidden": "true"
}, kv = ["aria-orientation", "aria-label", "aria-valuenow", "aria-disabled", "tabindex", "onPointerdown", "onKeydown"], bv = /* @__PURE__ */ ne({
  __name: "WindowNode",
  props: {
    node: {},
    path: {},
    framed: { type: Boolean }
  },
  setup(e) {
    const t = e, n = sa(), a = D(null), s = p(() => J(t.node) ? t.node : null), r = p(() => jt(t.node) ? t.node : null), l = p(() => le(t.node) ? t.node : null), i = p(
      () => r.value ? r.value.children : l.value?.frames.map((H) => H.node) ?? []
    ), o = p(() => r.value ? ft(r.value) : []), c = p(
      () => (l.value?.frames ?? []).map((H, U) => ({
        held: H,
        /** Place in the stack, counted from the back — what `z-index` follows. */
        order: U,
        key: I(H.node),
        path: [...t.path, U]
      })).sort((H, U) => H.key < U.key ? -1 : H.key > U.key ? 1 : 0)
    ), u = p(() => Vt(t.node)), m = p(() => n.spaceMenu(t.path)), k = p(() => t.node.headless === !0), g = p(() => t.path.length === 0 && !n.rootBar.value), w = p(() => l.value ? "desktop" : r.value?.direction ?? ""), _ = D(null), $ = D(0);
    let x = null;
    be(
      _,
      (H) => {
        x?.disconnect(), x = null, !(!H || typeof ResizeObserver > "u") && ($.value = H.clientWidth, x = new ResizeObserver(([U]) => {
          $.value = U?.contentRect.width ?? 0;
        }), x.observe(H));
      },
      { immediate: !0 }
    ), Ke(() => x?.disconnect());
    const M = p(() => {
      const H = Math.max(
        1,
        Math.floor(($.value + Rt) / (za + Rt))
      ), U = /* @__PURE__ */ new Map();
      let ge = 0;
      for (const oe of c.value)
        oe.held.minimized === !0 && (U.set(oe.key, {
          x: Rt + ge % H * (za + Rt),
          bottom: Rt + Math.floor(ge / H) * (Zr + Rt)
        }), ge += 1);
      return U;
    }), b = (H) => !!H && H.join("/") === t.path.join("/"), S = p(() => {
      const H = n.dropTarget.value, U = l.value;
      if (!U || !H?.rect || H.edge !== "float") return null;
      if (H.space) return b(H.space) ? H.rect : null;
      const ge = Ie(U, H.panel);
      return ge && U.frames.includes(ge) ? H.rect : null;
    }), T = p(() => {
      const H = n.dropTarget.value;
      return !!H && !H.rect && b(H.space);
    }), B = p(() => r.value?.direction === "row"), L = p(() => i.value.map((H, U) => [...t.path, U])), I = (H) => [...Ze(H)].sort().join("/"), E = (H) => {
      const U = Ze(H)[0];
      return (U ? n.panelFor(U)?.title : null) ?? U ?? "panel";
    }, V = (H) => {
      const U = i.value[H], ge = i.value[H + 1];
      return !U || !ge ? "Resize panels" : `Resize ${E(U)} and ${E(ge)}`;
    }, q = (H) => {
      const U = o.value[H] ?? 0, ge = o.value[H + 1] ?? 0, oe = U + ge;
      return oe > 0 ? Math.round(U / oe * 100) : 50;
    };
    function Q() {
      const H = a.value, U = H ? B.value ? H.clientWidth : H.clientHeight : 0;
      return U <= 0 ? 0.05 : Math.min(n.minPanelSize.value / U, 0.4);
    }
    let he = null;
    function pe(H, U) {
      const ge = r.value, oe = a.value;
      if (!n.resizable.value || !ge || !oe || H.button !== 0) return;
      const xe = B.value ? oe.clientWidth : oe.clientHeight;
      if (xe <= 0) return;
      const Me = B.value ? H.clientX : H.clientY, Re = ft(ge), Ue = Math.min(n.minPanelSize.value / xe, 0.4);
      H.preventDefault();
      const F = (We) => {
        const K = ((B.value ? We.clientX : We.clientY) - Me) / xe;
        n.setSizes(t.path, Qs(Re, U, K, Ue));
      }, se = () => he?.(), ve = (We) => {
        We.key === "Escape" && (n.setSizes(t.path, Re), he?.());
      };
      he = () => {
        window.removeEventListener("pointermove", F), window.removeEventListener("pointerup", se), window.removeEventListener("pointercancel", se), window.removeEventListener("keydown", ve), he = null;
      }, window.addEventListener("pointermove", F), window.addEventListener("pointerup", se), window.addEventListener("pointercancel", se), window.addEventListener("keydown", ve);
    }
    Ke(() => he?.());
    function Be(H, U) {
      const ge = r.value;
      if (!n.resizable.value || !ge) return;
      const oe = B.value ? "ArrowRight" : "ArrowDown", xe = B.value ? "ArrowLeft" : "ArrowUp", Me = H.shiftKey ? 0.1 : 0.02;
      if (H.key !== oe && H.key !== xe) return;
      const Re = H.key === oe ? Me : -Me;
      H.preventDefault(), n.setSizes(t.path, Qs(ft(ge), U, Re, Q()));
    }
    return (H, U) => {
      const ge = tr("WindowNode", !0);
      return s.value ? (d(), G(go, {
        key: 0,
        group: s.value,
        path: e.path
      }, {
        space: Pe(({ node: oe, path: xe }) => [
          ie(ge, {
            node: oe,
            path: xe,
            framed: !s.value.headless
          }, null, 8, ["node", "path", "framed"])
        ]),
        _: 1
      }, 8, ["group", "path"])) : (d(), v("section", {
        key: 1,
        class: "dc-space",
        "data-dc-space": w.value,
        "data-dc-path": e.path.join("/"),
        "data-dc-bare": g.value ? "true" : void 0,
        "aria-label": u.value
      }, [
        !e.framed && !k.value && !g.value ? (d(), v("header", gv, [
          C("span", yv, z(u.value), 1),
          m.value.length ? (d(), G(ss, {
            key: 0,
            items: m.value,
            label: `${u.value} menu`
          }, null, 8, ["items", "label"])) : A("", !0)
        ])) : A("", !0),
        l.value ? (d(), v("div", {
          key: 1,
          ref_key: "desktop",
          ref: _,
          class: "dc-window__desktop"
        }, [
          S.value ? (d(), v("div", {
            key: 0,
            class: "dc-window__drop",
            style: Se({
              left: `${S.value.x}px`,
              top: `${S.value.y}px`,
              width: `${S.value.w}px`,
              height: `${S.value.h}px`
            }),
            "aria-hidden": "true"
          }, null, 4)) : A("", !0),
          (d(!0), v(ee, null, de(c.value, (oe) => (d(), G(Wp, {
            key: oe.key,
            frame: oe.held,
            path: oe.path,
            order: oe.order,
            place: M.value.get(oe.key) ?? null
          }, {
            default: Pe(() => [
              ie(ge, {
                node: oe.held.node,
                path: oe.path,
                framed: oe.held.node.kind !== "group"
              }, null, 8, ["node", "path", "framed"])
            ]),
            _: 2
          }, 1032, ["frame", "path", "order", "place"]))), 128))
        ], 512)) : r.value ? (d(), v("div", {
          key: 2,
          ref_key: "container",
          ref: a,
          class: "dc-window__split",
          "data-dc-direction": r.value.direction
        }, [
          T.value ? (d(), v("div", wv)) : A("", !0),
          (d(!0), v(ee, null, de(i.value, (oe, xe) => (d(), v(ee, {
            key: I(oe)
          }, [
            C("div", {
              class: "dc-window__cell",
              style: Se({ flexGrow: o.value[xe] ?? 1 })
            }, [
              ie(ge, {
                node: oe,
                path: L.value[xe] ?? []
              }, null, 8, ["node", "path"])
            ], 4),
            xe < i.value.length - 1 ? (d(), v("div", {
              key: 0,
              class: "dc-window__gutter",
              role: "separator",
              "aria-orientation": B.value ? "vertical" : "horizontal",
              "aria-label": V(xe),
              "aria-valuenow": q(xe),
              "aria-valuemin": "0",
              "aria-valuemax": "100",
              "aria-disabled": P(n).resizable.value ? void 0 : "true",
              tabindex: P(n).resizable.value ? 0 : -1,
              onPointerdown: (Me) => pe(Me, xe),
              onKeydown: (Me) => Be(Me, xe)
            }, null, 40, kv)) : A("", !0)
          ], 64))), 128))
        ], 8, _v)) : A("", !0)
      ], 8, mv));
    };
  }
}), $v = /* @__PURE__ */ re(bv, [["__scopeId", "data-v-b394f0e4"]]), xv = ["data-dc-theme", "data-dc-dragging", "data-dc-docking"], Cv = {
  key: 1,
  class: "dc-window__empty"
}, Sv = {
  class: "dc-window__live",
  "aria-live": "polite",
  role: "status"
}, Sn = 16, Mv = /* @__PURE__ */ ne({
  __name: "WindowFrame",
  props: /* @__PURE__ */ zn({
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
  emits: /* @__PURE__ */ zn(["panel-move", "view-change", "panel-activate", "tab-select", "frame-change", "frame-maximize", "frame-minimize", "panel-close", "panel-pop-out"], ["update:layout", "update:views"]),
  setup(e, { expose: t, emit: n }) {
    const a = e, s = n, r = Zt(e, "layout"), l = Zt(e, "views"), i = Wt(), o = p(() => new Map(a.panels.map((f) => [f.id, f]))), c = p(() => a.panels.map((f) => f.id)), u = p(() => $p(r.value, m.value)), m = p(() => {
      if (!a.solo || !r.value) return c.value;
      const f = new Set(Ze(r.value)), h = c.value.filter((y) => f.has(y));
      return h.length ? h : c.value;
    }), k = D(null), g = D(null), w = D(null), _ = D(!0), $ = D(null), x = D(null), M = D(null), b = D(""), S = D(null);
    function T() {
      const f = S.value;
      return f ? [...f.querySelectorAll(".dc-pane[data-dc-panels]")].filter((y) => y.closest(".dc-window") === f).map((y) => ({ panels: (y.dataset.dcPanels ?? "").split(" "), element: y })) : [];
    }
    function B(f) {
      const h = [];
      let y = f.closest(".dc-float");
      for (; y; )
        h.unshift(Number(y.dataset.dcOrder ?? 0)), y = y.parentElement?.closest(".dc-float") ?? null;
      return h;
    }
    function L() {
      return T().map((f) => ({ pane: f, order: B(f.element) })).sort((f, h) => {
        const y = Math.max(f.order.length, h.order.length);
        for (let R = 0; R < y; R += 1) {
          const O = (f.order[R] ?? -1) - (h.order[R] ?? -1);
          if (O !== 0) return O;
        }
        return 0;
      }).map((f) => f.pane);
    }
    const I = (f) => T().find((h) => h.panels.includes(f)) ?? null;
    function E(f) {
      const h = o.value.get(f);
      if (!h) return "";
      const y = l.value[f];
      return y && h.views?.some((R) => R.key === y) ? y : h.defaultView ?? h.views?.[0]?.key ?? "";
    }
    function V(f, h) {
      l.value = { ...l.value, [f]: h }, s("view-change", { panel: f, view: h });
    }
    const q = p(
      () => a.panels.filter((f) => f.fixed !== !0).length
    );
    function Q(f) {
      return !a.movable || q.value < 1 || a.panels.length < 2 ? !1 : o.value.get(f)?.fixed !== !0;
    }
    function he(f, h) {
      const y = u.value;
      !f || !y || f === y || (r.value = f, h && s("panel-move", h));
    }
    function pe(f, h, y) {
      if (f.width <= 0 || f.height <= 0) return "center";
      const R = (h - f.left) / f.width, O = (y - f.top) / f.height, N = 0.3;
      return R > N && R < 1 - N && O > N && O < 1 - N ? "center" : [
        { edge: "left", distance: R },
        { edge: "right", distance: 1 - R },
        { edge: "top", distance: O },
        { edge: "bottom", distance: 1 - O }
      ].reduce(
        (fe, j) => j.distance < fe.distance ? j : fe
      ).edge;
    }
    function Be(f, h) {
      const y = [...f.querySelectorAll(".dc-tab")], R = y.findIndex((O) => {
        const N = O.getBoundingClientRect();
        return h < N.left + N.width / 2;
      });
      return R === -1 ? y.length : R;
    }
    function H(f, h, y) {
      for (const { panels: R, element: O } of L().reverse()) {
        const N = O.getBoundingClientRect();
        if (f < N.left || f > N.right || h < N.top || h > N.bottom) continue;
        const me = R.find((ce) => ce !== y), fe = O.querySelector(".dc-pane__tabs"), j = fe?.getBoundingClientRect();
        if (fe && j && h >= j.top && h <= j.bottom)
          return me ? { panel: me, edge: "center", index: Be(fe, f) } : null;
        const te = O.querySelector(":scope > .dc-pane__space");
        if (te) {
          const ce = te.getBoundingClientRect();
          if (f >= ce.left && f <= ce.right && h >= ce.top && h <= ce.bottom) continue;
        }
        return me ? { panel: me, edge: pe(N, f, h) } : null;
      }
      return ge(f, h, y) ?? Me(f, h);
    }
    function U() {
      const f = S.value;
      return f ? [...f.querySelectorAll(".dc-window__desktop")].filter((h) => h.closest(".dc-window") === f).reverse() : [];
    }
    function ge(f, h, y) {
      const R = u.value;
      if (!R) return null;
      for (const O of U()) {
        const N = O.getBoundingClientRect();
        if (f < N.left || f > N.right || h < N.top || h > N.bottom) continue;
        const me = Re(O), fe = me.flatMap((we) => we.panels).find((we) => we !== y);
        if (!fe && me.length > 0) return null;
        const j = Ie(R, y)?.rect, te = ma(
          {
            x: f - N.left - 24,
            y: h - N.top - 12,
            w: j?.w ?? xt.w,
            h: j?.h ?? xt.h
          },
          { w: O.clientWidth, h: O.clientHeight },
          a.minPanelSize
        );
        if (fe) return { panel: fe, edge: "float", rect: te };
        const ce = oe(O);
        return ce ? { panel: "", space: ce, edge: "float", rect: te } : null;
      }
      return null;
    }
    function oe(f) {
      const h = f.closest(".dc-space")?.getAttribute("data-dc-path");
      return h == null ? null : h === "" ? [] : h.split("/").map(Number);
    }
    function xe() {
      const f = S.value;
      return f ? [...f.querySelectorAll(".dc-space")].filter((h) => h.closest(".dc-window") === f).filter((h) => !h.querySelector(".dc-pane")).reverse().flatMap((h) => {
        const y = oe(h);
        return y ? [{ element: h, path: y }] : [];
      }) : [];
    }
    function Me(f, h) {
      for (const { element: y, path: R } of xe()) {
        if (y.dataset.dcSpace === "desktop") continue;
        const O = y.getBoundingClientRect();
        if (!(f < O.left || f > O.right || h < O.top || h > O.bottom))
          return { panel: "", space: R, edge: "center" };
      }
      return null;
    }
    function Re(f) {
      return T().filter(
        (h) => h.element.closest(".dc-window__desktop") === f
      );
    }
    let Ue = null;
    const F = (f) => f.altKey;
    function se(f, h) {
      if (!Q(f) || g.value || x.value || h.button !== 0) return;
      const y = h.clientX, R = h.clientY;
      let O = !1, N = F(h);
      const me = () => {
        const ke = M.value;
        ke && (w.value = N ? ge(ke.x, ke.y, f) : H(ke.x, ke.y, f));
      }, fe = (ke) => {
        if (!O) {
          if (Math.hypot(ke.clientX - y, ke.clientY - R) < 4) return;
          O = !0, g.value = f, $.value = null;
        }
        N = F(ke), _.value = !N, M.value = { x: ke.clientX, y: ke.clientY }, me();
      }, j = (ke) => {
        F(ke) !== N && (N = !N, _.value = !N, O && me());
      }, te = (ke) => {
        Ue?.();
        const ue = w.value, He = u.value;
        if (ke && O && ue && He) {
          const ht = ue.space ? js(He, f, ue.space, ue.rect) : ue.edge === "float" && ue.rect ? Ws(He, f, ue.panel, ue.rect) : Cn(He, f, ue.panel, ue.edge, ue.index);
          he(ht, {
            panel: f,
            target: ue.panel,
            edge: ue.edge,
            ...ue.space === void 0 ? {} : { space: ue.space },
            ...ue.index === void 0 ? {} : { index: ue.index },
            ...ue.rect === void 0 ? {} : { rect: ue.rect }
          });
        }
        g.value = null, w.value = null, M.value = null, _.value = !0;
      }, ce = () => te(!0), we = () => te(!1), Ce = (ke) => {
        if (ke.key === "Escape") {
          te(!1);
          return;
        }
        j(ke);
      };
      Ue = () => {
        window.removeEventListener("pointermove", fe), window.removeEventListener("pointerup", ce), window.removeEventListener("pointercancel", we), window.removeEventListener("keydown", Ce), window.removeEventListener("keyup", j), Ue = null;
      }, window.addEventListener("pointermove", fe), window.addEventListener("pointerup", ce), window.addEventListener("pointercancel", we), window.addEventListener("keydown", Ce), window.addEventListener("keyup", j);
    }
    Ke(() => Ue?.());
    let ve = null;
    function We(f) {
      const h = S.value;
      return h ? [...h.querySelectorAll(
        `.dc-float[data-dc-path="${f.join("/")}"]`
      )].find((O) => O.closest(".dc-window") === h)?.parentElement ?? null : null;
    }
    function K(f) {
      const h = u.value;
      return h ? Fa(h, f) : null;
    }
    function Z(f) {
      const h = u.value;
      if (!h) return;
      const y = nn(h, f);
      y !== h && (r.value = y);
    }
    function X(f) {
      const h = K(f);
      h && Z(h);
    }
    function Ge(f) {
      const h = u.value, y = h ? Ie(h, f) : null;
      return y !== null && gt(y);
    }
    function W(f) {
      const h = u.value, y = h ? Ie(h, f) : null;
      return y !== null && $t(y);
    }
    function Y(f) {
      const h = u.value, y = h ? bt(h, f) : null;
      return y ? Fe(y.node) : "";
    }
    function ae(f) {
      const h = u.value, y = h ? bt(h, f) : null;
      if (!h || !y) return;
      const R = Fe(y.node);
      if (o.value.get(R)?.fixed === !0) return;
      const O = !$t(y);
      let N = dp(h, f, O);
      N !== h && (O || (N = nn(N, f)), r.value = N, s("frame-minimize", { panel: R, minimized: O }));
    }
    function Oe(f) {
      const h = K(f);
      h && ae(h);
    }
    function De(f) {
      const h = u.value, y = h ? bt(h, f) : null;
      if (!h || !y) return;
      const R = Fe(y.node);
      if (o.value.get(R)?.fixed === !0) return;
      const O = !gt(y);
      let N = up(h, f, O);
      N !== h && (O && (N = nn(N, f)), r.value = N, s("frame-maximize", { panel: R, maximized: O }));
    }
    function Ut(f) {
      const h = K(f);
      h && De(h);
    }
    function ms(f, h, y) {
      const R = u.value, O = R ? bt(R, f) : null;
      if (!R || !O || h.button !== 0 || g.value || x.value) return;
      const N = Fe(O.node);
      if (o.value.get(N)?.fixed === !0 || gt(O) || $t(O) || (y === "move" ? !a.movable : !a.resizable)) return;
      const me = We(f), fe = fp(R, f);
      Z(f);
      const j = { w: me?.clientWidth ?? 0, h: me?.clientHeight ?? 0 }, te = { ...O.rect }, ce = h.clientX, we = h.clientY, Ce = a.minPanelSize;
      x.value = N;
      const ke = (Qe) => {
        const ct = u.value;
        if (!ct) return;
        const Gt = Ks(ct, fe, ma(Qe, j, Ce));
        Gt !== ct && (r.value = Gt);
      }, ue = (Qe) => {
        Qe.preventDefault();
        const ct = Qe.clientX - ce, Gt = Qe.clientY - we;
        ke(
          y === "move" ? { ...te, x: te.x + ct, y: te.y + Gt } : Vs(te, y, ct, Gt, Ce)
        );
      }, He = (Qe) => {
        if (ve?.(), x.value = null, !Qe) {
          ke(te);
          return;
        }
        const ct = u.value ? bt(u.value, fe) : null;
        ct && s("frame-change", { panel: Y(fe), rect: ct.rect });
      }, ht = () => He(!0), wt = () => He(!1), kt = (Qe) => {
        Qe.key === "Escape" && He(!1);
      };
      ve = () => {
        window.removeEventListener("pointermove", ue), window.removeEventListener("pointerup", ht), window.removeEventListener("pointercancel", wt), window.removeEventListener("keydown", kt), ve = null;
      }, window.addEventListener("pointermove", ue), window.addEventListener("pointerup", ht), window.addEventListener("pointercancel", wt), window.addEventListener("keydown", kt);
    }
    function bo(f, h, y) {
      const R = K(f);
      R && ms(R, h, y);
    }
    function $o(f, h, y = !1) {
      const R = u.value, O = K(f), N = R && O ? bt(R, O) : null;
      if (!R || !O || !N || o.value.get(f)?.fixed === !0 || (y ? !a.resizable : !a.movable)) return;
      if (gt(N) || $t(N)) {
        b.value = `${at(f)} is ${gt(N) ? "maximized" : "minimized"}, so it cannot be moved.`;
        return;
      }
      const me = h === "left" ? -Sn : h === "right" ? Sn : 0, fe = h === "up" ? -Sn : h === "down" ? Sn : 0, j = We(O), te = { w: j?.clientWidth ?? 0, h: j?.clientHeight ?? 0 }, ce = y ? Vs(N.rect, "se", me, fe, a.minPanelSize) : { ...N.rect, x: N.rect.x + me, y: N.rect.y + fe }, we = Ks(R, O, ma(ce, te, a.minPanelSize));
      if (we === R) {
        b.value = y ? `${at(f)} cannot be resized further.` : `${at(f)} cannot move ${h}.`;
        return;
      }
      r.value = we;
      const Ce = bt(we, O);
      Ce && (s("frame-change", { panel: f, rect: Ce.rect }), b.value = y ? `${at(f)} resized to ${Ce.rect.w} by ${Ce.rect.h}.` : `${at(f)} moved to ${Ce.rect.x}, ${Ce.rect.y}.`);
    }
    Ke(() => ve?.());
    function xo(f, h) {
      const y = I(f), R = y?.element.getBoundingClientRect();
      if (!y || !R) return null;
      const O = h === "left" || h === "right", N = (j) => {
        if (!(O ? j.bottom > R.top + 1 && j.top < R.bottom - 1 : j.right > R.left + 1 && j.left < R.right - 1)) return null;
        const ce = h === "left" ? R.left - j.right : h === "right" ? j.left - R.right : h === "up" ? R.top - j.bottom : j.top - R.bottom;
        return ce < -1 ? null : ce;
      }, me = [];
      for (const j of T()) {
        if (j === y || j.element === y.element) continue;
        const te = N(j.element.getBoundingClientRect());
        if (te === null) continue;
        const ce = j.panels.find((we) => we !== f);
        ce && me.push({ to: { panel: ce }, distance: te });
      }
      for (const { element: j, path: te } of xe()) {
        const ce = N(j.getBoundingClientRect());
        ce !== null && me.push({ to: { space: te }, distance: ce });
      }
      return me.reduce(
        (j, te) => j && j.distance <= te.distance ? j : te,
        null
      )?.to ?? null;
    }
    function Co(f) {
      const h = u.value ? Ie(u.value, f) !== null : !1;
      if (!h && !Q(f)) return;
      $.value = $.value === f ? null : f;
      const y = at(f);
      if (!$.value) {
        b.value = `${y}: move mode off.`;
        return;
      }
      b.value = h ? `${y}: move mode on. Arrow keys move the window, shift and an arrow resize it, Escape leaves move mode.` : `${y}: move mode on. Arrow keys move the panel, shift and an arrow make it a tab of the panel that way, Escape leaves move mode.`;
    }
    const at = (f) => o.value.get(f)?.title ?? f, So = {
      left: "left",
      right: "right",
      up: "top",
      down: "bottom"
    };
    function Mo(f, h, y = !1) {
      if (!Q(f)) return;
      const R = u.value;
      if (!R) return;
      const O = at(f), N = Ft(R, f);
      if (!y && N && (h === "left" || h === "right") && N.panels.length > 1) {
        const we = N.panels.indexOf(f), Ce = h === "left" ? we - 1 : we + 1;
        if (Ce >= 0 && Ce < N.panels.length) {
          he(an(R, f, Ce), { panel: f, target: f, edge: "center", index: Ce }), b.value = `${O} moved ${h}, now tab ${Ce + 1} of ${N.panels.length}.`, oa(f);
          return;
        }
      }
      const fe = xo(f, h);
      if (!fe || fe.panel !== void 0 && !Q(fe.panel)) {
        b.value = `${O} cannot move ${h}.`;
        return;
      }
      const j = So[h];
      if (fe.space) {
        const we = fe.space, Ce = Ye(R, we), ke = Ie(R, f)?.rect, ue = { ...xt, ...ke ? { w: ke.w, h: ke.h } : {} };
        he(js(R, f, we, ue), { panel: f, target: "", space: we, edge: j }), b.value = `${O} moved ${h}, into ${Ce ? Vt(Ce) : "the space"}.`, oa(f);
        return;
      }
      const te = fe.panel, ce = N?.panels.length === 1 && Ft(R, te)?.panels.length === 1;
      y ? (he(Cn(R, f, te, "center"), {
        panel: f,
        target: te,
        edge: "center"
      }), b.value = `${O} joined ${at(te)} as a tab.`) : ce ? (he(An(R, f, te), { panel: f, target: te, edge: j }), b.value = `${O} moved ${h}, trading places with ${at(te)}.`) : (he(Cn(R, f, te, j), { panel: f, target: te, edge: j }), b.value = `${O} moved ${h}, beside ${at(te)}.`), oa(f);
    }
    function oa(f) {
      vt(() => {
        I(f)?.element.querySelector(".dc-pane__grip")?.focus();
      });
    }
    function Eo(f, h) {
      const y = u.value;
      y && (r.value = Tn(y, f, h));
    }
    function la(f) {
      const h = u.value;
      if (!h) return;
      const y = Bt(h, f);
      y !== h && (r.value = y, s("tab-select", { panel: f }));
    }
    function ia(f) {
      return o.value.get(f)?.closable ?? a.closable;
    }
    function gs(f) {
      ia(f) && s("panel-close", f);
    }
    const ca = D(/* @__PURE__ */ new Map());
    let Po = 0;
    function Ao(f, h) {
      const y = Po += 1;
      return ca.value.set(y, { panel: f, items: h }), () => {
        ca.value.delete(y);
      };
    }
    function To(f) {
      const h = [];
      for (const y of ca.value.values())
        y.panel() === f && h.push(...y.items());
      return h;
    }
    function ys(f) {
      const h = f.filter((y) => y.items.length > 0);
      return h.length < 2 ? h.flatMap((y) => y.items) : h.flatMap((y) => [
        { id: y.id, heading: !0, label: y.title },
        ...y.items
      ]);
    }
    const _s = (f) => f.title || "These tabs";
    function Lo(f, h) {
      const y = h.id, R = Ft(f, y), O = (R?.panels.length ?? 0) > 1, N = R?.fixedView === !0, me = (ce) => ({
        action: () => {
          ce !== f && (r.value = ce);
        }
      }), fe = [], j = [], te = h.views ?? [];
      if (te.length > 1 && !N) {
        const ce = E(y);
        fe.push({
          id: "view",
          label: "View",
          items: te.map((we) => ({
            id: `view-${we.key}`,
            label: we.label,
            checked: we.key === ce,
            action: () => V(y, we.key)
          }))
        });
      }
      return O && !N && j.push(
        { id: "show-row", label: "Row", checked: !1, ...me(Us(f, y, "row")) },
        {
          id: "show-column",
          label: "Column",
          checked: !1,
          ...me(Us(f, y, "column"))
        },
        // Already true, and nothing to collapse: these panes are tabs. Ticked
        // and choosable all the same — collapsing a strip into a strip hands
        // back the tree it was given, so it is the no-op it looks like.
        {
          id: "show-tabs",
          label: "Tabs",
          checked: !0,
          ...me(mp(f, y))
        },
        {
          id: "show-desktop",
          label: "Desktop",
          checked: !1,
          ...me(gp(f, y))
        }
      ), O && R && (j.length && j.push({ separator: !0 }), j.push(...ua(R, y))), { panel: fe, tabs: j, tabsTitle: R ? _s(R) : "" };
    }
    function ua(f, h) {
      const y = Tt(f), R = (O) => {
        const N = f.panels[(y + O + f.panels.length) % f.panels.length];
        return (N === void 0 ? "" : Fe(N)) || h;
      };
      return [
        { id: "next-tab", label: "Next tab", action: () => la(R(1)) },
        { id: "previous-tab", label: "Previous tab", action: () => la(R(-1)) },
        ...Ro(f)
      ];
    }
    function Ro(f) {
      const h = Ze(f).filter(ia);
      return h.length ? [
        { separator: !0 },
        { id: "close-all", label: "Close all", action: () => h.forEach(gs) }
      ] : [];
    }
    function $n(f) {
      return f.title ? f.title : J(f) ? f.panels.length > 1 ? "these tabs" : "the strip" : Vt(f);
    }
    function ws(f) {
      if (!f || le(f) || f.fixedView === !0 || !f.title && f.headless !== !0 || nt(f)) return null;
      const h = ho(f);
      return h && h.fixedView !== !0 ? h : null;
    }
    function ks(f) {
      const h = u.value;
      if (!a.menu || !h) return [];
      const y = Ye(h, f);
      if (!y || J(y)) return [];
      if (y.fixedView) return [];
      const R = le(y) ? "desktop" : y.direction, O = (ue, He, ht) => ({
        id: `show-${ue}`,
        label: He,
        checked: R === ue,
        action: () => {
          const wt = u.value, kt = ht();
          !wt || kt === y || (r.value = Vn(Ae(ot(wt, f, kt))));
        }
      }), N = () => {
        const ue = io(y, zo(y));
        if (J(ue) && ue.panels.length === 0) return y;
        const He = J(ue) && ue.panels.length === 1 ? ue.panels[0] : void 0;
        return He !== void 0 && $e(He) ? y : ue;
      }, me = (ue) => () => le(y) ? vo(y, ue) : y.direction === ue ? y : { ...y, direction: ue }, fe = f.slice(0, -1), j = f.length > 0 ? Ye(h, fe) : null, te = j && J(j) && j.panels.length > 1 ? j : null, ce = j && ws(j) === y ? j : null, we = ws(y), Ce = y.title || "this space", ke = (ue, He, ht, wt, kt) => ({
        id: ue,
        label: kt,
        action: () => {
          const Qe = u.value;
          Qe && (r.value = Vn(Ae(ot(Qe, He, kp(ht, wt)))));
        }
      });
      return ys([
        {
          id: "about-space",
          /*
           * Its own name, or what it is rather than how it is shown: `spaceTitle`
           * would answer "Row" for an unnamed row, which is the item directly
           * under it and the one already ticked.
           */
          title: y.title || "This space",
          items: [
            O("row", "Row", me("row")),
            O("column", "Column", me("column")),
            // Everything in this space in one strip: the panes as tabs, and a
            // desktop among them as a tab of its own, keeping the windows on it.
            O("tabs", "Tabs", () => N()),
            O("desktop", "Desktop", () => le(y) ? y : po(y))
          ]
        },
        {
          id: "about-around",
          title: we ? `Around ${$n(we)}` : "",
          items: we ? [
            // Keeping this space's bar drops the one inside, so it is offered
            // only where the space inside has no name to be dropped with it.
            ...we.title ? [] : [ke("merge-around-keep-this", f, y, "outer", `Keep ${Ce}`)],
            ...y.title ? [] : [ke("merge-around-keep-that", f, y, "inner", `Keep ${$n(we)}`)]
          ] : []
        },
        {
          id: "about-inside",
          title: ce ? `Inside ${$n(ce)}` : "",
          items: ce ? [
            ...y.title ? [] : [ke("merge-inside-keep-that", fe, ce, "outer", `Keep ${$n(ce)}`)],
            ...ce.title ? [] : [ke("merge-inside-keep-this", fe, ce, "inner", `Keep ${Ce}`)]
          ] : []
        },
        {
          id: "about-tabs",
          title: te ? _s(te) : "",
          items: te ? ua(te, Fe(y)) : []
        }
      ]);
    }
    function zo(f) {
      const h = k.value;
      return h && _e(f, h) ? h : void 0;
    }
    function Io(f) {
      const h = u.value, y = o.value.get(f);
      if (!h || !y) return [];
      const R = a.menu ? Lo(h, y) : null, O = To(f);
      O.length && R?.panel.length && O.push({ separator: !0 }), R && O.push(...R.panel);
      const N = No(y);
      N && (O.length && O.push({ separator: !0 }), O.push(N));
      const me = ys([
        { id: "about-panel", title: y.title, items: O },
        { id: "about-tabs", title: R?.tabsTitle ?? "", items: R?.tabs ?? [] }
      ]);
      return a.paneMenu ? a.paneMenu(y, me) : me;
    }
    const Oo = p(() => {
      const f = u.value;
      return f ? J(f) ? Fo([]) : ks([]) : [];
    });
    function Fo(f) {
      const h = u.value, y = h ? Ye(h, f) : null;
      if (!a.menu || !y || !J(y) || y.panels.length < 2) return [];
      const R = (N, me, fe) => ({
        id: `show-${N}`,
        label: me,
        checked: N === "tabs",
        action: () => {
          const j = u.value;
          if (!j) return;
          const te = fe(j);
          te !== j && (r.value = te);
        }
      }), O = y.fixedView ? [] : [
        R("row", "Row", (N) => Gs(N, f, "row")),
        R("column", "Column", (N) => Gs(N, f, "column")),
        // Already true: these are tabs, and a strip collapsed is that strip.
        R("tabs", "Tabs", (N) => N),
        R("desktop", "Desktop", (N) => yp(N, f))
      ];
      return O.length && O.push({ separator: !0 }), O.push(...ua(y, Fe(y))), O;
    }
    function No(f) {
      const h = a.popOut?.(f);
      return !h || a.solo && u.value && Ze(u.value).length <= 1 ? null : {
        id: "pop-out",
        label: "Pop out to new window",
        action: () => {
          const y = S.value?.querySelector(`.dc-pane[data-dc-panel="${CSS.escape(f.id)}"]`);
          Ep(h, Mp(y)) && s("panel-pop-out", { panel: f.id, href: h });
        }
      };
    }
    function Bo(f, h) {
      return i[`${f}-${h}`] ?? i[f];
    }
    function bs(f, h, y, R) {
      return Bo(f, h.id)?.({ panel: h, view: y, active: R });
    }
    xp({
      panelFor: (f) => o.value.get(f) ?? null,
      viewFor: E,
      setView: V,
      movable: p(() => a.movable),
      resizable: p(() => a.resizable),
      minPanelSize: p(() => a.minPanelSize),
      spaceNames: p(() => a.spaceNames),
      rootBar: p(() => a.rootBar),
      focused: k,
      dragging: g,
      dropTarget: w,
      moving: $,
      framing: x,
      canMove: Q,
      focus(f) {
        k.value !== f && (k.value = f, s("panel-activate", f));
      },
      selectPanel: la,
      beginDrag: se,
      toggleMoveMode: Co,
      nudge: Mo,
      setSizes: Eo,
      frameOf: (f) => u.value ? Ie(u.value, f) : null,
      beginFrameDrag: bo,
      nudgeFrame: $o,
      raise: X,
      maximized: Ge,
      toggleMaximize: Ut,
      minimized: W,
      toggleMinimize: Oe,
      beginFrameDragAt: ms,
      raiseAt: Z,
      toggleMaximizeAt: De,
      toggleMinimizeAt: ae,
      menuFor: Io,
      spaceMenu: ks,
      registerMenu: Ao,
      closable: ia,
      close: gs,
      renderContent: (f, h, y) => bs("panel", f, h, y),
      renderActions: (f, h, y) => bs("actions", f, h, y),
      layout: u
    });
    const Do = p(() => {
      if (!(!a.accent && !a.tokens))
        return { ...a.tokens, ...a.accent ? { "--dc-accent": a.accent } : {} };
    }), Ho = () => {
      const f = g.value, h = M.value;
      return !f || !h ? null : Qo(
        "div",
        {
          class: "dc-window__ghost",
          style: { left: `${h.x}px`, top: `${h.y}px` },
          "aria-hidden": "true"
        },
        o.value.get(f)?.title ?? f
      );
    };
    return t({
      /** The layout as rendered, reconciled against the current panels. */
      layout: u,
      /** Moves a panel programmatically — the same operation a drag performs. */
      move(f, h, y, R) {
        const O = u.value;
        O && he(Cn(O, f, h, y, R), {
          panel: f,
          target: h,
          edge: y,
          ...R === void 0 ? {} : { index: R }
        });
      },
      /** Brings a panel's tab to the top of its group. */
      select(f) {
        const h = u.value;
        h && (r.value = Bt(h, f));
      },
      /** Lifts a panel onto the float holding `near`, as a window of its own. */
      float(f, h, y) {
        const R = u.value;
        R && he(Ws(R, f, h, y), {
          panel: f,
          target: h,
          edge: "float",
          rect: y
        });
      },
      /** Puts a floating frame somewhere else, or makes it another size. */
      setRect(f, h) {
        const y = u.value;
        if (!y) return;
        const R = lp(y, f, h);
        if (R === y) return;
        r.value = R;
        const O = Ie(R, f);
        O && s("frame-change", { panel: f, rect: O.rect });
      },
      /**
       * Puts a panel on one of its views, the way its menu would — the way a pane
       * whose space fixed its view, or took its bar away, is switched at all.
       */
      setView: V,
      /**
       * The menu of the space at the root: how the whole window is shown. For a
       * host's menu bar, when `rootBar` takes away the bar it was on.
       */
      rootMenu: Oo,
      /** Brings a floating frame to the front of its stack. */
      raise: X,
      /** Fills the float with a window, or puts it back where it was. */
      toggleMaximize: Ut,
      /** Rolls a window up to its title bar, or unrolls it. */
      toggleMinimize: Oe
    }), (f, h) => (d(), v("div", {
      ref_key: "root",
      ref: S,
      class: "dc-shell dc-window",
      "data-dc-theme": e.theme,
      "data-dc-dragging": g.value ? "true" : "false",
      "data-dc-docking": _.value ? "true" : "false",
      style: Se(Do.value)
    }, [
      u.value ? (d(), G($v, {
        key: 0,
        node: u.value,
        path: []
      }, null, 8, ["node"])) : (d(), v("p", Cv, " This window has no panels. ")),
      ie(Ho),
      C("p", Sv, z(b.value), 1)
    ], 12, xv));
  }
}), Ev = /* @__PURE__ */ re(Mv, [["__scopeId", "data-v-02019f28"]]);
function yh(e, t) {
  const n = D(!1);
  let a = null, s = !1, r = 0;
  const l = () => {
    r++, n.value = !1, a !== null && (clearTimeout(a), a = null);
  };
  function i(u) {
    a = setTimeout(() => void o(u), t);
  }
  async function o(u) {
    if (s || u !== r) return;
    let m;
    try {
      m = await e();
    } catch {
      m = !1;
    }
    s || u !== r || (m ? i(u) : l());
  }
  const c = () => {
    n.value || (n.value = !0, o(++r));
  };
  return Kt(() => {
    s = !0, l();
  }, !0), { start: c, stop: l, polling: n };
}
function _h(e, t = {}) {
  const n = t.key ?? ((r) => JSON.stringify(r)), a = pt();
  let s = null;
  return Xo(() => {
    const r = e(), l = n(r);
    l !== s && (s = l, a.value = r);
  }), a;
}
const Pv = (e) => Math.round(e * 1e3) / 1e3;
function ya(e, t) {
  return e.title && (t.t = e.title), e.headless && (t.h = !0), e.fixedView && (t.v = !0), t;
}
function Av(e) {
  return [Math.round(e.x), Math.round(e.y), Math.round(e.w), Math.round(e.h)];
}
function _a(e) {
  const t = { b: Av(e.rect) };
  return e.title && (t.t = e.title), e.maximized && (t.M = !0), e.minimized && (t.m = !0), t;
}
function Tv(e) {
  if (e.kind !== "group" || e.panels.length !== 1) return null;
  const t = e.panels[0];
  return typeof t != "string" || e.title || e.headless || e.fixedView || e.places ? null : t;
}
function Ba(e) {
  const t = Tv(e);
  return t !== null ? t : yo(e);
}
function yo(e) {
  if (e.kind === "group") {
    const n = { g: e.panels.map((a) => typeof a == "string" ? a : yo(a)) };
    return e.active !== void 0 && e.active !== e.panels[0] && (n.a = e.active), e.places && (n.p = e.places.map(_a)), ya(e, n);
  }
  if (e.kind === "split") {
    const n = { [e.direction === "row" ? "r" : "c"]: e.children.map(Ba) };
    return e.sizes && (n.z = e.sizes.map(Pv)), e.places && (n.p = e.places.map(_a)), ya(e, n);
  }
  const t = {
    f: e.frames.map((n) => ({ n: Ba(n.node), ..._a(n) }))
  };
  return ya(e, t);
}
class _o extends Error {
}
const ze = () => {
  throw new _o();
}, Da = (e) => typeof e == "object" && e !== null && !Array.isArray(e), zt = (e) => Array.isArray(e) ? e : ze(), vs = (e) => e === void 0 ? void 0 : typeof e == "string" ? e : ze(), wo = (e) => zt(e).map((t) => typeof t == "number" && Number.isFinite(t) ? t : ze());
function Lv(e) {
  const [t, n, a, s] = wo(e);
  return s === void 0 && ze(), { x: t, y: n, w: a, h: s };
}
function wa(e) {
  if (!Da(e)) return ze();
  const t = { rect: Lv(e.b) }, n = vs(e.t);
  return n && (t.title = n), e.M === !0 && (t.maximized = !0), e.m === !0 && (t.minimized = !0), t;
}
function ka(e, t) {
  const n = vs(e.t);
  return n && (t.title = n), e.h === !0 && (t.headless = !0), e.v === !0 && (t.fixedView = !0), t;
}
function Ln(e) {
  if (typeof e == "string") return { kind: "group", panels: [e] };
  if (!Da(e)) return ze();
  if (e.g !== void 0) {
    const n = zt(e.g).map((r) => typeof r == "string" ? r : Ln(r));
    n.length === 0 && ze();
    const a = { kind: "group", panels: n }, s = vs(e.a);
    return s !== void 0 && (a.active = s), e.p !== void 0 && (a.places = zt(e.p).map(wa)), ka(e, a);
  }
  const t = e.r !== void 0 ? "row" : e.c !== void 0 ? "column" : null;
  if (t) {
    const n = zt(t === "row" ? e.r : e.c).map(Ln), a = { kind: "split", direction: t, children: n };
    return e.z !== void 0 && (a.sizes = wo(e.z)), e.p !== void 0 && (a.places = zt(e.p).map(wa)), ka(e, a);
  }
  if (e.f !== void 0) {
    const a = { kind: "float", frames: zt(e.f).map((s) => !Da(s) || s.n === void 0 ? ze() : { node: Ln(s.n), ...wa(s) }) };
    return ka(e, a);
  }
  return ze();
}
const ko = /[ '!:(),*@$]/, Rv = /^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][-+]?\d+)?$/;
function Ys(e) {
  return e !== "" && !ko.test(e) && !/^[-\d]/.test(e) ? e : `'${e.replace(/[!']/g, (n) => `!${n}`)}'`;
}
function Ha(e) {
  return e === null ? "!n" : e === !0 ? "!t" : e === !1 ? "!f" : typeof e == "number" ? Number.isFinite(e) ? String(e) : "!n" : typeof e == "string" ? Ys(e) : Array.isArray(e) ? `!(${e.map(Ha).join(",")})` : `(${Object.entries(e).map(([t, n]) => `${Ys(t)}:${Ha(n)}`).join(",")})`;
}
function zv(e) {
  let t = 0;
  const n = () => e[t], a = (i) => e[t++] === i ? void 0 : ze(), s = () => {
    if (n() === "'") {
      t++;
      let o = "";
      for (; ; ) {
        const c = e[t++];
        if (c === void 0) return ze();
        if (c === "'") return o;
        if (c === "!") {
          const u = e[t++];
          u !== "!" && u !== "'" && ze(), o += u;
        } else o += c;
      }
    }
    const i = t;
    for (; t < e.length && !ko.test(e[t]); ) t++;
    return t === i && ze(), e.slice(i, t);
  }, r = () => {
    const i = n();
    if (i === "(") {
      t++;
      const c = {};
      if (n() === ")")
        return t++, c;
      for (; ; ) {
        const u = s();
        a(":"), c[u] = r();
        const m = e[t++];
        if (m === ")") return c;
        m !== "," && ze();
      }
    }
    if (i === "!") {
      t++;
      const c = e[t++];
      if (c === "t") return !0;
      if (c === "f") return !1;
      if (c === "n") return null;
      if (c !== "(") return ze();
      const u = [];
      if (n() === ")")
        return t++, u;
      for (; ; ) {
        u.push(r());
        const m = e[t++];
        if (m === ")") return u;
        m !== "," && ze();
      }
    }
    if (i === "'") return s();
    const o = s();
    return Rv.test(o) ? Number(o) : o;
  }, l = r();
  return t !== e.length && ze(), l;
}
function ba(e) {
  return Ha(Ba(e));
}
function Iv(e) {
  try {
    return Ln(zv(e));
  } catch (t) {
    if (t instanceof _o) return null;
    throw t;
  }
}
function $a(e, t) {
  for (const n of e.replace(/^[?]/, "").split("&")) {
    const a = n.indexOf("="), s = a === -1 ? n : n.slice(0, a);
    if (hs(s) === t) return a === -1 ? "" : n.slice(a + 1);
  }
  return null;
}
function xa(e, t, n) {
  const a = e.replace(/^[?]/, "").split("&").filter(Boolean), s = a.findIndex((l) => {
    const i = l.indexOf("=");
    return hs(i === -1 ? l : l.slice(0, i)) === t;
  }), r = n === null ? null : `${encodeURIComponent(t)}=${n}`;
  return s === -1 ? r && a.push(r) : r ? a[s] = r : a.splice(s, 1), a.length ? `?${a.join("&")}` : "";
}
function hs(e) {
  try {
    return decodeURIComponent(e.replace(/\+/g, " "));
  } catch {
    return e;
  }
}
const Ov = [
  [/%2C/g, ","],
  [/%3A/g, ":"],
  [/%2F/g, "/"],
  [/%40/g, "@"],
  [/%24/g, "$"],
  [/%20/g, "+"]
], Zs = (e) => {
  let t = encodeURIComponent(e);
  for (const [n, a] of Ov) t = t.replace(n, a);
  return t;
};
function wh(e, t) {
  const { adapter: n } = t, a = t.param ?? "w", s = t.soloParam ?? "solo", r = t.delay ?? 200, l = () => ut(t.home) ?? null;
  let i = $a(n.search.value, a), o = null;
  const c = () => {
    o !== null && clearTimeout(o), o = null;
  }, u = (w) => w === null ? l() : Iv(hs(w)) ?? l(), m = () => {
    c();
    const w = e.value, _ = l(), $ = w ? ba(w) : null, x = $ === null || _ && $ === ba(_) ? null : Zs($);
    i = x;
    const M = xa(n.search.value, a, x);
    M !== n.search.value && n.replace(M);
  }, k = u(i);
  return k && (e.value = k), be(e, () => {
    c(), o = setTimeout(m, r);
  }), be(n.search, (w) => {
    const _ = $a(w, a);
    if (_ === i) return;
    c(), i = _;
    const $ = u(_);
    $ && (e.value = $);
  }), Kn() && Kt(() => o !== null ? m() : void 0), {
    flush: () => o !== null ? m() : void 0,
    popOutHref: (w) => {
      let _ = xa(n.search.value, a, Zs(ba(sp(et(w)))));
      return _ = xa(_, s, "1"), n.href ? n.href(_) : `${n.path.value}${_}`;
    },
    solo: p(() => $a(n.search.value, s) !== null)
  };
}
function kh(e = {}) {
  return { key: "ordinal", kind: "ordinal", label: "#", width: "52px", ...e };
}
function bh(e = {}) {
  return { key: "status", role: "state", kind: "status", label: "State", width: "104px", ...e };
}
function $h(e = {}) {
  return { key: "tint", role: "tint", ...e };
}
function xh(e = {}) {
  return { key: "picture", role: "image", kind: "image", width: "56px", height: "40px", ...e };
}
function Ch(e, t = {}) {
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
function Sh(e, t = {}) {
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
function Mh(e, t, n = {}) {
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
function Eh(e, t, n = {}) {
  return { key: e, kind: "date", label: t, sort: e, width: "104px", mono: !0, muted: !0, ...n };
}
function Ph(e = {}) {
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
function Ah(e, t, n = {}) {
  return { key: e, label: t, truncate: !0, hideBelow: 900, ...n };
}
function Th(e, t, n, a = {}) {
  return {
    key: e,
    label: t,
    value: (s) => Object.entries(n).filter(([r]) => s.fields[r] === !0).map(([, r]) => r),
    muted: !0,
    truncate: !0,
    hideBelow: 1100,
    ...a
  };
}
function ra(e) {
  return typeof e == "number" ? e : typeof e == "string" && e.trim() !== "" ? Number(e) : Number.NaN;
}
function Lh(e) {
  const t = ra(e);
  return Number.isFinite(t) && t > 0 ? ll(t) : it;
}
function Rh(e) {
  const t = ra(e);
  return Number.isFinite(t) && t > 0 ? il(t) : it;
}
function zh(e) {
  const t = ra(e);
  return Number.isFinite(t) && t > 0 ? cl(t) : it;
}
function Ih(e) {
  const t = ra(e);
  return Number.isFinite(t) ? ul(t) : it;
}
function Fv(e) {
  if (e <= 0) return 0;
  const t = 10 ** Math.floor(Math.log10(e));
  for (const n of [1, 2, 5])
    if (e <= n * t) return n * t;
  return 10 * t;
}
function Nv(e, t) {
  const n = /* @__PURE__ */ new Set();
  for (const a of e) {
    const s = a.fields[t];
    for (const r of Array.isArray(s) ? s : [s])
      typeof r == "string" && r && n.add(r);
  }
  return [...n].sort((a, s) => a.localeCompare(s));
}
function Bv(e, t) {
  let n = 0;
  for (const a of e) {
    const s = a.fields[t];
    typeof s == "number" && s > n && (n = s);
  }
  return n;
}
function Oh(e, t, n, a = {}) {
  return {
    kind: "chips",
    key: t,
    label: n,
    options: Nv(e, t),
    ...a.multiple ? { multiple: !0 } : {}
  };
}
function Fh(e, t, n) {
  return { kind: "range", key: t, label: n, min: 0, max: Fv(Bv(e, t)) };
}
function Nh(e, t, n) {
  return { kind: "toggle", key: e, label: t, text: n };
}
function Bh(e) {
  return e.filter((t) => t.kind === "chips" ? t.options.length > 1 : t.kind === "range" ? t.max > 0 : !0);
}
function Dh(e = "", t = "/") {
  const n = D(qe(e)), a = D(t), s = [`${a.value}${n.value}`];
  return {
    search: n,
    path: a,
    history: s,
    href(r, l) {
      return `${l ?? a.value}${qe(r)}`;
    },
    push(r, l) {
      l !== void 0 && (a.value = l), n.value = qe(r), s.push(`${a.value}${n.value}`);
    },
    replace(r, l) {
      l !== void 0 && (a.value = l), n.value = qe(r), s[s.length - 1] = `${a.value}${n.value}`;
    }
  };
}
function Js(e) {
  const t = e.indexOf("?");
  if (t === -1) return "";
  const n = e.slice(t), a = n.indexOf("#");
  return qe(a === -1 ? n : n.slice(0, a));
}
function Hh(e) {
  const t = D(Js(e.currentRoute.value.fullPath)), n = p(() => e.currentRoute.value.path), a = be(
    () => e.currentRoute.value.fullPath,
    (s) => {
      t.value = Js(s);
    }
  );
  return {
    search: t,
    path: n,
    push: (s, r) => e.push(`${r ?? n.value}${qe(s)}`),
    replace: (s, r) => e.replace(`${r ?? n.value}${qe(s)}`),
    href: (s, r) => {
      const l = `${r ?? n.value}${qe(s)}`;
      return e.resolve?.(l).href ?? l;
    },
    dispose: a
  };
}
function qh(e, t, n = "/") {
  return (a) => {
    const s = a.params[t], r = Array.isArray(s) ? s.join("/") : s ?? "", l = a.query[Mt], i = typeof l == "string" ? l : "", o = `${e}="${r.replace(/"/g, "")}"`;
    return { path: n, query: { ...a.query, [Mt]: vn(i, o) } };
  };
}
function Vh(e, t = "/") {
  return (n) => ({ path: t, query: { ...n.query, [pn]: e } });
}
function Kh(e) {
  const t = /* @__PURE__ */ new Map();
  for (const n of e) {
    const a = t.get(n.entityKey);
    a ? a.push(n) : t.set(n.entityKey, [n]);
  }
  return {
    query(n) {
      return wr(n, (a) => t.get(a.key) ?? [], {
        undatedLast: !0,
        zeroIsAll: !0
      });
    }
  };
}
function Wh(e, t) {
  return e.query({ ...t, limit: Number.MAX_SAFE_INTEGER, offset: 0 }).rows;
}
const Dv = {
  DataShell: Yd,
  ShellHeader: zr,
  QueryPanel: Or,
  RecordActions: Nr,
  ResultsArea: Gr,
  FacetControl: Ir,
  SegmentedControl: vf,
  StatusPill: hn,
  WindowFrame: Ev,
  WindowPane: go,
  ListView: Ra,
  CardsView: Hr,
  GridView: qr,
  ImagesView: Vr,
  TableView: jr,
  LinksView: Kr,
  PreviewView: Wr,
  TypeCardsView: Ur
}, jh = {
  install(e, t = {}) {
    const n = t.prefix ?? "";
    for (const [a, s] of Object.entries(Dv))
      e.component(`${n}${a}`, s);
    t.route && e.provide(nr, t.route), (t.theme || t.accent || t.tokens) && Jl({ theme: t.theme, accent: t.accent, tokens: t.tokens }, e);
  }
};
export {
  qn as CASCADE_STEP,
  Wv as COLUMN_BREAKPOINTS,
  Kv as COLUMN_ROLES,
  Hr as CardsView,
  Ds as ColumnCell,
  If as CopyButton,
  el as DEFAULT_ENTITY_VIEW,
  xt as DEFAULT_FRAME,
  Ca as DEFAULT_SORT,
  Jo as DEFAULT_VIEW,
  ri as DRAFT_DELAY,
  Yd as DataShell,
  it as EMPTY_CELL,
  br as ENTITY_ALL,
  Hn as ENTITY_TERM,
  on as EXPRESSION_TERM,
  Xa as FACET_PREFIX,
  Ir as FacetControl,
  qr as GridView,
  jh as HeaderContentLayoutPlugin,
  Vr as ImagesView,
  Kr as LinksView,
  Ra as ListView,
  Rt as MINIMIZED_GAP,
  Zr as MINIMIZED_HEIGHT,
  za as MINIMIZED_WIDTH,
  Yr as MIN_FRAME,
  Fn as MOCK_TINTS,
  eh as MenuBar,
  ss as MenuButton,
  ts as MenuList,
  mn as MetricDrill,
  gn as OpenMark,
  ps as PANE_CONTEXT_KEY,
  Qa as PARAM_DIR,
  pn as PARAM_ENTITY,
  Mt as PARAM_EXPR,
  Qn as PARAM_PAGE,
  Ga as PARAM_SORT,
  Gn as PARAM_VIEW,
  Vv as PILL_TONES,
  Jf as POPOVER_FLIP_BELOW,
  Yf as POPOVER_GAP,
  Zf as POPOVER_MARGIN,
  ns as PinStar,
  Wr as PreviewView,
  as as QueryMark,
  Or as QueryPanel,
  Xt as RECORD_STATUSES,
  ja as RESULT_FIELDS,
  nr as ROUTE_ADAPTER_KEY,
  Nr as RecordActions,
  Gr as ResultsArea,
  Lr as SHELL_CONTEXT_KEY,
  qv as SHELL_THEMES,
  Dn as SHELL_THEME_KEY,
  yn as ScopeMark,
  vf as SegmentedControl,
  At as SelectTick,
  Jv as ShellCard,
  ah as ShellCode,
  rh as ShellDialog,
  xf as ShellFact,
  th as ShellFacts,
  zr as ShellHeader,
  sh as ShellLog,
  lh as ShellPopover,
  oh as ShellToasts,
  La as StandingControl,
  nh as StatusCounts,
  hn as StatusPill,
  Wf as TOAST_ERROR_MS,
  Kf as TOAST_MS,
  jr as TableView,
  Ur as TypeCardsView,
  ar as VIEW_KINDS,
  tl as VIEW_LABELS,
  fs as WINDOW_CONTEXT_KEY,
  Ev as WindowFrame,
  go as WindowPane,
  eo as activePanel,
  Tt as activeTab,
  vn as addTerm,
  Ua as andExpression,
  rp as axisOf,
  Lh as bytesCell,
  na as cascade,
  fr as cellFull,
  qt as cellText,
  En as cellTextOf,
  je as cellValue,
  da as changesResults,
  Oh as chipsFrom,
  ma as clampRect,
  io as collapseSpace,
  mp as collapseToTabs,
  ch as column,
  Ss as columnAlign,
  Ms as columnClass,
  Cs as columnKey,
  vr as columnShortcut,
  bl as columnShortcutOf,
  Sa as columnTruncates,
  fl as columnsFor,
  al as countPages,
  Yo as createHistoryAdapter,
  Dh as createMemoryAdapter,
  Kh as createMemoryDataSource,
  Vl as createMockDataSource,
  Hh as createVueRouterAdapter,
  Eh as dateColumn,
  Iv as decodeLayout,
  hl as defaultCellText,
  Xs as defaultLayout,
  Wa as defaultQuery,
  rn as defaultViewFor,
  Zo as detachableAdapter,
  va as drillExpression,
  js as dropIntoSpace,
  Rh as durationCell,
  zh as elapsedCell,
  Ht as emptyFacetState,
  qa as emptyFacetValue,
  ba as encodeLayout,
  Ph as entityColumn,
  Vh as entityRedirect,
  Sr as excludingTerm,
  On as expandShortcuts,
  Ah as facetColumn,
  Cr as fieldTerm,
  It as findEntity,
  yt as findSort,
  uh as fixedView,
  Th as flagColumn,
  rs as float,
  Ws as floatPanel,
  po as floatSplit,
  gp as floatTabs,
  yp as floatTabsAt,
  Jt as fnv1a,
  rr as focusEntity,
  ll as formatBytes,
  Lt as formatCount,
  rl as formatDate,
  Uv as formatDateTime,
  il as formatDuration,
  cl as formatElapsed,
  dt as formatExpression,
  sl as formatMetric,
  ol as formatOrdinal,
  ul as formatPercent,
  fn as formatTerm,
  ta as frame,
  bt as frameAt,
  Ie as frameOf,
  Fa as framePathOf,
  Fe as frontPanel,
  ql as generateRows,
  ih as group,
  Ft as groupOf,
  op as groups,
  cr as hasActiveFacets,
  _e as hasPanel,
  sp as headless,
  Ch as identityColumn,
  Yv as idsExpression,
  Yt as insertPanel,
  tn as isChoosable,
  jv as isEntityScoped,
  ir as isFacetActive,
  le as isFloat,
  J as isGroup,
  gt as isMaximized,
  $t as isMinimized,
  $e as isPanelTab,
  Va as isPristineQuery,
  jt as isSplit,
  Xe as isTabOf,
  Ka as isTypeCardsQuery,
  sr as isViewKind,
  zs as joinExpression,
  Mr as liftTerm,
  Sl as matchesExpression,
  zl as matchesFacets,
  ip as maximizeFrame,
  up as maximizeFrameAt,
  kp as mergeSpace,
  Mh as metricColumn,
  cp as minimizeFrame,
  dp as minimizeFrameAt,
  Cn as movePanel,
  an as moveTab,
  Zv as narrowPatch,
  Ml as negateTerm,
  Fv as niceMax,
  Ye as nodeAt,
  sn as nodeTitle,
  Ae as normalizeLayout,
  qe as normalizeSearch,
  us as normalizeSizes,
  ho as onlySpace,
  Ep as openPopOut,
  Al as oppositeTerm,
  kh as ordinalColumn,
  Ze as panelIds,
  et as panelNode,
  qs as panelTabs,
  Ne as parseExpression,
  Ql as parseQuery,
  Ih as percentCell,
  xh as pictureColumn,
  ep as placePopover,
  Mp as popOutRect,
  Tc as presentParts,
  Br as presentRow,
  Zn as pressOptions,
  mo as providePaneContext,
  Yl as provideShellContext,
  Jl as provideShellTheme,
  xp as provideWindowContext,
  Wh as queryAll,
  ga as raiseFrame,
  nn as raiseFrameAt,
  fp as raisedPath,
  Fh as rangeFrom,
  Rl as readDraft,
  Xv as readExpression,
  ur as reconcileFacets,
  $p as reconcileLayout,
  qh as recordRedirect,
  xr as recordTerm,
  Xl as recordsIn,
  Sh as referenceColumn,
  Ea as refineExpression,
  Ct as removePanel,
  ot as replaceAt,
  Vs as resizeRect,
  Qs as resizeSplit,
  Un as resolveView,
  Je as roleColumn,
  dr as roleColumns,
  Vn as rootSpace,
  ls as row,
  vl as rowKey,
  Ma as sameTerm,
  Xn as scopeTerm,
  Bn as scopeTermFor,
  Ar as scopedEntity,
  Qv as searchFromQuery,
  pa as serializeQuery,
  Bt as setActivePanel,
  lp as setFrameRect,
  Ks as setFrameRectAt,
  Tn as setSizesAt,
  ph as setSplitDirection,
  ft as sizesOf,
  lr as sortsFor,
  Te as spaceChrome,
  Vt as spaceTitle,
  os as split,
  Pl as splitExpression,
  Us as spreadTabs,
  Gs as spreadTabsAt,
  bh as stateColumn,
  dl as stripAnsi,
  ni as summarizeQuery,
  es as summaryTerms,
  An as swapPanels,
  ea as tabNode,
  wn as tabPanels,
  Za as termStanding,
  vo as tileFloat,
  $h as tintColumn,
  Gv as tintFor,
  vh as toFloat,
  hh as toTiled,
  Nh as toggleFacet,
  dh as toggleMaximized,
  fh as toggleMinimized,
  ed as useColumns,
  oi as useDraft,
  bi as useEntityCounts,
  gd as useEntityPreviews,
  Ja as useLayerTheme,
  wh as useLayoutRoute,
  mh as usePaneContext,
  gh as usePaneMenu,
  yh as usePoll,
  Pt as usePresentedRows,
  ai as useQueryState,
  Ci as useRecordNames,
  si as useResults,
  Ee as useShellContext,
  _h as useStableSchema,
  Uf as useToasts,
  sa as useWindowContext,
  Bh as usefulFacets,
  xs as viewAcross,
  Aa as withStanding,
  Pr as withoutOwnScope,
  El as withoutTerm
};
