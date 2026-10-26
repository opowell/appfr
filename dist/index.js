import { ref as B, computed as p, inject as St, provide as cn, getCurrentInstance as er, shallowRef as dt, toValue as it, watch as be, onScopeDispose as Kt, getCurrentScope as Kn, defineComponent as te, onMounted as un, onBeforeUnmount as Ke, resolveComponent as tr, openBlock as d, createElementBlock as v, normalizeStyle as Se, Fragment as Z, renderList as de, toDisplayString as R, createCommentVNode as A, createElementVNode as C, createBlock as G, nextTick as ft, useId as dn, unref as P, normalizeClass as rt, Teleport as Wn, createVNode as oe, useSlots as Wt, renderSlot as ye, withDirectives as yt, withKeys as st, withModifiers as Ve, vModelText as Rn, createTextVNode as Te, withCtx as Pe, reactive as xs, resolveDynamicComponent as jn, createSlots as Mn, useModel as Zt, onBeforeUpdate as Fl, normalizeProps as Nl, guardReactiveProps as Bl, mergeModels as zn, vShow as In, Comment as Dl, Text as ql, readonly as Hl, mergeProps as Vl, h as Kl, watchEffect as Wl } from "vue";
const nr = Symbol("dc.routeAdapter");
function He(e) {
  if (!e) return "";
  const t = e.replace(/^[?]/, "");
  return t ? `?${t}` : "";
}
function jl() {
  const e = typeof window < "u", t = B(e ? He(window.location.search) : ""), n = B(e ? window.location.pathname : "/"), a = () => {
    t.value = He(window.location.search), n.value = window.location.pathname;
  };
  e && window.addEventListener("popstate", a);
  const s = (r, o, i) => {
    const l = He(r);
    if (!e) {
      t.value = l, i !== void 0 && (n.value = i);
      return;
    }
    const c = i === void 0 || i === window.location.pathname ? `${window.location.pathname}${l}${window.location.hash}` : `${i}${l}`;
    o === "push" ? window.history.pushState(window.history.state, "", c) : window.history.replaceState(window.history.state, "", c), t.value = l, n.value = window.location.pathname;
  };
  return {
    search: t,
    path: n,
    href(r, o) {
      return e ? o !== void 0 && o !== window.location.pathname ? `${o}${He(r)}` : `${window.location.pathname}${He(r)}${window.location.hash}` : `${o ?? n.value}${He(r)}`;
    },
    push: (r, o) => s(r, "push", o),
    replace: (r, o) => s(r, "replace", o),
    dispose: () => {
      e && window.removeEventListener("popstate", a);
    }
  };
}
function Ul(e, t) {
  const n = p(t.detached), a = p(() => n.value ? "" : e.search.value), s = p(() => n.value ? t.path() : e.path.value);
  return {
    search: a,
    path: s,
    push(r, o) {
      n.value ? e.push(r, o ?? t.path()) : e.push(r, o);
    },
    replace(r, o) {
      n.value ? e.push(r, o ?? t.path()) : e.replace(r, o);
    },
    href(r, o) {
      const i = o ?? (n.value ? t.path() : void 0);
      return e.href ? e.href(r, i) : `${i ?? e.path.value}${He(r)}`;
    }
  };
}
const ar = ["list", "cards", "grid", "images", "table", "links", "preview"], Bv = [
  "minimal",
  "mono-size",
  "dark",
  "light",
  "auto",
  "macos",
  "windows",
  "inherit"
], Xt = ["ok", "running", "queued", "review", "failed"], Dv = [...Xt, "neutral", "accent"], qv = [
  "identity",
  "reference",
  "metric",
  "state",
  "updated",
  "image",
  "tint"
], Hv = [480, 620, 760, 900, 1100], Gl = "cards", Ql = "table";
function rn(e, t = {}) {
  const n = (s) => s && sr(s) ? s : void 0;
  if (e === null) return n(t.view) ?? Gl;
  const a = t.landing === "entity" ? n(t.view) : void 0;
  return n(t.entityView) ?? a ?? Ql;
}
function Cs(e, t, n, a = {}) {
  return e === rn(t, a) ? rn(n, a) : e;
}
const ba = "updated";
function sr(e) {
  return typeof e == "string" && ar.includes(e);
}
const Xl = {
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
function lr(e, t = null) {
  return e?.columns ?? t?.columns ?? [];
}
function or(e, t = null) {
  if (e?.sorts?.length) return e.sorts;
  const n = /* @__PURE__ */ new Set(), a = [];
  for (const s of lr(e, t))
    !s.sort || n.has(s.sort) || (n.add(s.sort), a.push({ key: s.sort, label: (s.label ?? s.sort).toLowerCase() }));
  return a;
}
const Yl = { key: ba, label: ba };
function mt(e, t, n = null) {
  const a = or(e, n);
  return (t ? a.find((r) => r.key === t) : void 0) ?? a.find((r) => r.key === ba) ?? a[0] ?? Yl;
}
function Ba(e) {
  switch (e.kind) {
    case "chips":
      return { kind: "chips", selected: [] };
    case "range":
      return { kind: "range", min: null, max: null };
    case "toggle":
      return { kind: "toggle", on: !1 };
  }
}
function qt(e) {
  const t = {};
  for (const n of e?.facets ?? []) t[n.key] = Ba(n);
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
function Da(e) {
  return e.entity === null && e.expr.trim() === "" && !cr(e.facets);
}
function Vv(e) {
  return e.entity !== null;
}
function qa(e, t) {
  return e.entity === null && Un(e.view, t) === "cards";
}
function Zl(e, t) {
  return t <= 0 ? 1 : Math.max(1, Math.ceil(e / t));
}
function Ha(e, t = {}) {
  const a = t.landing === "entity" ? rr(e, t) : null;
  return {
    entity: a?.key ?? null,
    view: rn(a?.key ?? null, t),
    sort: mt(a, t.sort).key,
    dir: t.dir === "asc" ? "asc" : "desc",
    expr: "",
    facets: qt(a),
    page: 1
  };
}
const Va = ["entity", "sort", "dir", "expr", "facets"];
function ia(e) {
  return Va.some((t) => t in e);
}
function ur(e, t) {
  const n = {};
  for (const a of e?.facets ?? []) {
    const s = t[a.key];
    n[a.key] = s && s.kind === a.kind ? s : Ba(a);
  }
  return n;
}
function Jt(e) {
  let t = 2166136261;
  for (let n = 0; n < e.length; n++)
    t ^= e.charCodeAt(n), t = Math.imul(t, 16777619);
  return Math.abs(t);
}
function Jl(e) {
  if (!Number.isFinite(e)) return "—";
  const t = Math.abs(e);
  return t >= 1e6 ? `${(e / 1e6).toFixed(1)}m` : t >= 1e3 ? `${(e / 1e3).toFixed(1)}k` : String(Math.round(e));
}
function Lt(e) {
  return Number.isFinite(e) ? Math.round(e).toLocaleString("en-US") : "—";
}
function eo(e) {
  const t = new Date(e);
  if (Number.isNaN(t.getTime())) return "—";
  const n = String(t.getUTCDate()).padStart(2, "0"), a = String(t.getUTCMonth() + 1).padStart(2, "0");
  return `${n}.${a}.${t.getUTCFullYear()}`;
}
function to(e) {
  return String(e + 1).padStart(2, "0");
}
function Kv(e, t) {
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
function no(e) {
  if (e == null || !Number.isFinite(e) || e < 0) return "—";
  if (e < 1e3) return `${e} B`;
  const t = ["kB", "MB", "GB", "TB"];
  let n = e, a = -1;
  for (; n >= 1e3 && a < t.length - 1; )
    n /= 1e3, a += 1;
  return `${n < 100 ? n.toFixed(1) : Math.round(n)} ${t[a]}`;
}
function ao(e) {
  if (!e || !Number.isFinite(e)) return "—";
  if (e < 1e3) return `${Math.round(e)}ms`;
  const t = e / 1e3;
  return t < 60 ? `${t.toFixed(1)}s` : `${Math.floor(t / 60)}m ${Math.round(t % 60)}s`;
}
function so(e) {
  if (e == null || !Number.isFinite(e) || e <= 0)
    return "—";
  const t = Math.floor(e / 60);
  return t ? `${t}:${String(e % 60).padStart(2, "0")}` : `${e}s`;
}
function ro(e) {
  return e == null || !Number.isFinite(e) ? "—" : `${Math.round(e * 100)}%`;
}
function lo(e) {
  return e.replace(/\x1b\[[0-9;?]*[ -/]*[@-~]/g, "");
}
const lt = "—";
function Ze(e, t) {
  return e.find((n) => n.role === t);
}
function dr(e, t) {
  return e.filter((n) => n.role === t);
}
function oo(e, t) {
  const n = (t ? t.columns : e?.columns) ?? [], a = t ? "scoped" : "everything";
  return n.filter(
    (s) => s.role !== "tint" && ((s.when ?? "always") === "always" || s.when === a)
  );
}
const io = ["id", "entityKey", "entityLabel"];
function je(e, t) {
  if (e.value) return e.value(t);
  const n = e.field ?? e.key;
  if (n !== void 0) {
    if (t.fields && n in t.fields) return t.fields[n];
    if (io.includes(n))
      return t[n];
  }
}
function Ss(e, t) {
  const n = e.key ?? e.field ?? e.label;
  return n?.trim() ? n.trim() : `column-${t}`;
}
function co(e, t) {
  return e.id?.trim() ? e.id : `${e.entityKey || "row"}-${t}`;
}
function uo(e, t) {
  if (e == null || e === "") return lt;
  if (t === "number") {
    const n = typeof e == "number" ? e : Number(e);
    return Number.isFinite(n) ? Jl(n) : String(e);
  }
  return t === "date" ? eo(String(e)) : Array.isArray(e) ? e.length ? e.join(", ") : lt : String(e);
}
function Ht(e, t) {
  const n = je(e, t);
  return e.format ? e.format(n, t) : uo(n, e.kind);
}
function fo(e) {
  return typeof e == "number" ? Number.isFinite(e) ? String(e) : "" : typeof e == "string" ? e : Array.isArray(e) ? e.join(", ") : "";
}
function fr(e, t) {
  const n = Ht(e, t), a = fo(je(e, t));
  return a && a !== n ? a : n;
}
function En(e, t) {
  return e ? Ht(e, t) : "";
}
function Ms(e) {
  return e.align ? e.align : e.kind === "number" || e.kind === "ordinal" ? "right" : "left";
}
const po = {
  ordinal: "dc-table__num",
  number: "dc-table__number",
  date: "dc-table__date",
  status: "dc-table__state"
};
function Es(e) {
  return [po[e.kind ?? "text"], e.class].filter(Boolean).join(" ");
}
function $a(e) {
  if (e.truncate !== void 0) return e.truncate;
  const t = e.kind ?? "text";
  return t === "text" || t === "number" || t === "date";
}
const vo = /^([A-Za-z_][\w.-]*)\s*(>=|<=|:|=|>|<)\s*(.*)$/;
function ho(e) {
  const t = [];
  let n = "", a = null;
  const s = () => {
    n && t.push(n), n = "";
  };
  for (let r = 0; r < e.length; r++) {
    const o = e[r];
    if (a) {
      o === a ? a = null : n += o;
      continue;
    }
    if (o === '"' || o === "'") {
      a = o;
      continue;
    }
    if (/\s/.test(o)) {
      if (/(?:>=|<=|[:=><])$/.test(n) || e.slice(r + 1).match(/^\s*(>=|<=|[:=><])/) && n) continue;
      s();
      continue;
    }
    n += o;
  }
  return s(), t;
}
function Ne(e) {
  const t = e.trim();
  if (!t) return [];
  const n = [];
  let a = [];
  for (const s of ho(t)) {
    const r = s.toUpperCase();
    if (r === "AND" || r === "&&") continue;
    if (r === "OR" || r === "||") {
      a.length && n.push(a), a = [];
      continue;
    }
    const o = s.length > 1 && s.startsWith("-"), i = o ? s.slice(1) : s, l = o ? { negated: !0 } : {}, c = vo.exec(i);
    c && c[3] !== "" ? a.push({
      kind: "field",
      field: c[1].toLowerCase(),
      comparator: c[2],
      value: c[3],
      ...l
    }) : a.push({ kind: "text", value: i, ...l });
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
function mo(e, t, n) {
  const a = Ot(e), s = n.columns ?? [];
  if (a === "entity") return t.entityKey;
  if (e in t.fields) return t.fields[e];
  const r = s.find(
    (c) => c.key?.toLowerCase() === e.toLowerCase() || c.field?.toLowerCase() === e.toLowerCase() || c.label !== void 0 && Ot(c.label) === a
  );
  if (r) return je(r, t);
  const o = n.facets.find((c) => Ot(c.label) === a);
  if (o && o.key in t.fields) return t.fields[o.key];
  const i = pr.find(([c]) => c === a)?.[1];
  if (i) {
    const c = Ze(s, i);
    if (c) return je(c, t);
  }
  const l = /^metric(\d+)$/.exec(a);
  if (l) {
    const c = dr(s, "metric")[Number(l[1]) - 1];
    if (c) return je(c, t);
  }
}
function vr(e) {
  return (e.toLowerCase().match(/[\p{L}\p{N}]+/gu) ?? []).map((t) => t.charAt(0)).join("");
}
const Ps = /^[a-z_][\w.-]*$/;
function hr(e) {
  const t = (e.key ?? e.field)?.toLowerCase();
  if (t !== void 0) return Ps.test(t) ? t : void 0;
  const n = e.label === void 0 ? void 0 : Ot(e.label);
  return n !== void 0 && Ps.test(n) ? n : void 0;
}
function go(e, t) {
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
      const o = mr(r.field, t), i = o && hr(o);
      return i ? (n = !0, { ...r, field: i }) : r;
    })
  );
  return n ? ct(a) : e;
}
function mr(e, t) {
  if (!(!e || go(e, t)))
    return (t.columns ?? []).find(
      (n) => n.label !== void 0 && vr(n.label) === e
    );
}
function yo(e, t) {
  if (!t || e.label === void 0 || !hr(e)) return;
  const n = vr(e.label);
  return mr(n, t) === e ? n : void 0;
}
function ca(e, t) {
  const n = e.toLowerCase(), a = t.toLowerCase();
  if (!a.includes("*")) return n.includes(a);
  const s = a.replace(/[.+?^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*");
  return new RegExp(s).test(n);
}
function As(e, t) {
  return e.toLowerCase() === t.toLowerCase();
}
function _o(e, t, n, a) {
  if (e.kind === "text") {
    const i = n.columns ?? [];
    return ["identity", "reference"].some((l) => {
      const c = Ze(i, l), u = c ? je(c, t) : void 0;
      return typeof u == "string" && ca(u, e.value);
    });
  }
  const s = mo(e.field, t, n);
  if (s === void 0) return a?.has(e.field) ? !1 : null;
  if (Array.isArray(s))
    return e.comparator === ":" || e.comparator === "=" ? s.some(
      (l) => e.comparator === "=" ? As(String(l), e.value) : ca(String(l), e.value)
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
    return e.comparator === "=" ? As(String(s), e.value) : ca(String(s), e.value);
  }
  const r = Number(e.value), o = typeof s == "number" ? s : Number(s);
  return !Number.isFinite(r) || !Number.isFinite(o) ? null : wo(e.comparator, o, r);
}
function Ts(e, t, n, a) {
  const s = _o(e, t, n, a);
  return s === null ? !0 : e.negated ? !s : s;
}
function wo(e, t, n) {
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
function Ls(e) {
  return e.kind === "field" && !e.negated && (e.comparator === ":" || e.comparator === "=");
}
const Rs = /* @__PURE__ */ new WeakMap();
function ko(e) {
  if (!e?.strictScopes) return null;
  let t = Rs.get(e);
  return t || (t = new Set(
    e.entities.flatMap((n) => n.scope ? [n.scope.toLowerCase()] : [])
  ), Rs.set(e, t)), t;
}
function bo(e, t, n, a) {
  if (!e.length) return !0;
  const s = ko(a);
  return e.some((r) => {
    const o = /* @__PURE__ */ new Map();
    for (const i of r)
      Ls(i) && o.set(
        i.field,
        (o.get(i.field) ?? !1) || Ts(i, t, n, s)
      );
    return r.every(
      (i) => Ls(i) ? o.get(i.field) === !0 : Ts(i, t, n, s)
    );
  });
}
function zs(e) {
  return /[\s"']/.test(e) ? `"${e.replace(/["']/g, "")}"` : e;
}
function fn(e) {
  const t = e.negated ? "-" : "";
  return e.kind === "text" ? t + zs(e.value) : `${t}${e.field}${e.comparator}${zs(e.value)}`;
}
function $o(e) {
  if (!e.negated) return { ...e, negated: !0 };
  const { negated: t, ...n } = e;
  return n;
}
function ct(e) {
  return e.filter((t) => t.length).map((t) => t.map(fn).join(" ")).join(" OR ");
}
function xo(e, t, n) {
  return e.map((a, s) => s === t ? a.filter((r, o) => o !== n) : a).filter((a) => a.length);
}
function Co(e) {
  const t = Ne(e);
  if (t.length > 1) return { parts: [], text: e.trim() };
  const n = t[0] ?? [];
  return {
    parts: n.filter((a) => a.kind === "field"),
    text: n.filter((a) => a.kind === "text").map(fn).join(" ")
  };
}
function Is(e, t) {
  return [...e.map(fn), t.trim()].filter(Boolean).join(" ");
}
const Os = (e, t) => e.toLowerCase() === t.toLowerCase();
function xa(e, t) {
  return !!e.negated == !!t.negated && gr(e, t);
}
function So(e, t) {
  return !!e.negated != !!t.negated && gr(e, t);
}
function gr(e, t) {
  return e.kind === "field" ? t.kind === "field" && e.field === t.field && e.comparator === t.comparator && Os(e.value, t.value) : t.kind === "text" && Os(e.value, t.value);
}
function Mo(e, t) {
  return t.filter((n) => !e.some((a) => xa(a, n)));
}
function Ka(e, t) {
  return yr(e, t, (n) => n);
}
function Ca(e, t) {
  return yr(
    e,
    t,
    (n, a) => n.filter((s) => !a.some((r) => So(s, r)))
  );
}
const Eo = /^[A-Za-z_][\w.-]*\s*(?:>=|<=|:|=|>|<)$/;
function Po(e) {
  return ct(
    Ne(e).map(
      (t) => t.filter(
        (n) => n.kind !== "text" || n.value !== "-" && !Eo.test(n.value)
      )
    ).filter((t) => t.length > 0)
  );
}
function yr(e, t, n) {
  const a = Ne(e), s = Ne(t);
  return a.length ? s.length ? ct(
    a.flatMap(
      (r) => s.map((o) => [...n(r, o), ...Mo(r, o)])
    )
  ) : ct(a) : ct(s);
}
function Ao(e, t) {
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
function To(e) {
  if (!e) return () => 0;
  const n = (e.kind ?? "text") === "number" || e.role === "metric", a = _r(e);
  return (s, r) => {
    const o = je(e, s), i = je(e, r);
    return n ? Number(i ?? 0) - Number(o ?? 0) : a ? Date.parse(String(i ?? "")) - Date.parse(String(o ?? "")) : String(i ?? "").localeCompare(String(o ?? ""));
  };
}
function Fs(e, t) {
  return !t || !_r(t) ? !1 : !Number.isFinite(Date.parse(String(je(t, e) ?? "")));
}
function wr({ query: e, schema: t, entity: n, limit: a, offset: s }, r, o) {
  const i = Ne(e.expr), l = n ? [n] : t.entities;
  let c = 0;
  const u = [];
  for (const $ of l)
    for (const x of r($))
      c += 1, (n ? Ao(x, e.facets) : !0) && bo(i, x, $, t) && u.push(x);
  const m = mt(n, e.sort, t), k = lr(n, t).find(($) => $.sort === m.key), g = o.undatedLast ? u.filter(($) => !Fs($, k)) : u, _ = o.undatedLast ? u.filter(($) => Fs($, k)) : [];
  g.sort(To(k)), e.dir === "asc" && g.reverse();
  const y = _.length ? [...g, ..._] : g;
  return {
    // One page out of the middle. `total` stays the whole match, which is what
    // the shell counts pages with.
    rows: o.zeroIsAll && a <= 0 ? y.slice(s) : y.slice(s, s + a),
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
function Wv(e) {
  return Fn[Jt(e) % Fn.length];
}
function kr(e, t) {
  return `${e}_${1e4 + t * 7}`;
}
const Lo = 7, Ro = 3;
function zo(e, t, n, a) {
  const s = (t * Lo + Jt(n)) % a, r = [];
  for (let o = 0; o < Math.min(Ro, a); o++)
    r.push(kr(e, (s + o) % a));
  return r;
}
function Io(e, t) {
  switch (e.kind) {
    case "chips":
      return e.multiple ? Oo(e.options, t) : e.options[t % e.options.length] ?? "";
    case "range": {
      const n = Math.max(0, e.max - e.min);
      return e.min + (n === 0 ? 0 : t % (n + 1));
    }
    case "toggle":
      return t % 3 === 0;
  }
}
function Oo(e, t) {
  if (!e.length) return [];
  const n = 1 + (t >> 5) % Math.min(3, e.length), a = t % e.length, s = /* @__PURE__ */ new Set();
  for (let r = 0; r < n; r++) s.add((a + r) % e.length);
  return [...s].sort((r, o) => r - o).map((r) => e[r]);
}
function Fo(e, t) {
  const { hash: n, sample: a, revision: s, updatedAt: r } = t, o = s ? ` · rev ${s + 1}` : "";
  switch (e.role) {
    case "identity":
      return `${a[0]}${o}`;
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
function No(e, t = {}) {
  const n = t.population ?? 48, a = t.seed ?? "", s = t.now ?? /* @__PURE__ */ new Date("2026-08-25T00:00:00Z"), r = e.samples, o = t.scopes ?? [];
  if (!r.length) return [];
  const i = [];
  for (let l = 0; l < n; l++) {
    const c = r[l % r.length], u = Math.floor(l / r.length), m = Jt(`${a}:${e.key}:${c[0]}:${l}`), k = kr(e.key, l), g = new Date(s.getTime() - m % 900 * 36e5).toISOString(), _ = {};
    for (const y of e.columns ?? []) {
      const $ = y.field ?? y.key;
      if (!$ || y.value) continue;
      const x = Fo(y, {
        hash: Jt(`${m}:${$}`),
        sample: c,
        revision: u,
        updatedAt: g
      });
      x !== void 0 && (_[$] = x);
    }
    for (const y of e.facets)
      _[y.key] = Io(y, Jt(`${m}:${y.key}`));
    for (const [y, $] of o)
      _[y] = $ === e.key ? k : zo($, l, y, n);
    i.push({ id: k, entityKey: e.key, entityLabel: e.label, fields: _ });
  }
  return i;
}
function Bo(e = {}) {
  const t = /* @__PURE__ */ new Map(), n = (a, s) => {
    const r = t.get(a.key);
    if (r) return r;
    const o = e.scopes ?? s.entities.flatMap(
      (l) => l.scope ? [[l.scope, l.key]] : []
    ), i = No(a, { ...e, scopes: o });
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
const pn = "e", Gn = "v", Wa = "s", ja = "d", Mt = "q", Qn = "p", Ua = "f_", br = "*", Do = [
  pn,
  Gn,
  Wa,
  ja,
  Mt,
  Qn
], Sa = "..", $r = ",", qo = [
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
  for (const [n, a] of qo) t = t.replace(n, a);
  return t;
}
function at(e) {
  try {
    return decodeURIComponent(e.replace(/\+/g, " "));
  } catch {
    return e.replace(/\+/g, " ");
  }
}
function Ga(e) {
  const t = e.replace(/^[?]/, "");
  if (!t) return [];
  const n = [];
  for (const a of t.split("&")) {
    if (!a) continue;
    const s = a.indexOf("="), r = s === -1 ? a : a.slice(0, s), o = s === -1 ? "" : a.slice(s + 1);
    n.push([at(r), o]);
  }
  return n;
}
function Ho(e) {
  return Do.includes(e) || e.startsWith(Ua);
}
function Ns(e, t, n) {
  return Math.min(n, Math.max(t, e));
}
function Vo(e, t) {
  const n = at(t);
  switch (e.kind) {
    case "chips": {
      const a = new Set(
        n.split($r).map((r) => r.trim()).filter(Boolean)
      );
      return { kind: "chips", selected: e.options.filter((r) => a.has(r)) };
    }
    case "range": {
      const a = n.indexOf(Sa), s = (a === -1 ? n : n.slice(0, a)).trim(), r = (a === -1 ? "" : n.slice(a + Sa.length)).trim(), o = s === "" ? null : Number(s), i = r === "" ? null : Number(r);
      let l = o !== null && Number.isFinite(o) ? Ns(o, e.min, e.max) : null, c = i !== null && Number.isFinite(i) ? Ns(i, e.min, e.max) : null;
      return l !== null && c !== null && l > c && ([l, c] = [c, l]), { kind: "range", min: l, max: c };
    }
    case "toggle":
      return { kind: "toggle", on: n === "1" || n === "true" };
  }
}
function Ko(e, t) {
  switch (e.kind) {
    case "chips":
      return e.selected.length ? (t.kind === "chips" ? t.options.filter((a) => e.selected.includes(a)) : e.selected).join($r) : null;
    case "range":
      return e.min === null && e.max === null ? null : `${e.min ?? ""}${Sa}${e.max ?? ""}`;
    case "toggle":
      return e.on ? "1" : null;
  }
}
function Wo(e, t, n = {}) {
  const a = Ha(t, n), s = new Map(Ga(e)), r = s.get(pn), o = r === void 0 ? a.entity : at(r), i = o === br ? null : It(t, o), l = s.get(Gn), c = l && sr(at(l)) ? at(l) : rn(i?.key ?? null, n), u = s.get(Wa), m = mt(i, u ? at(u) : n.sort, t), k = s.get(ja), g = k ? at(k) === "asc" ? "asc" : "desc" : a.dir, _ = s.get(Mt), y = s.get(Qn), $ = y === void 0 ? 1 : Number(at(y)), x = Number.isFinite($) ? Math.max(1, Math.floor($)) : 1, M = {};
  for (const b of i?.facets ?? []) {
    const S = s.get(`${Ua}${b.key}`);
    M[b.key] = S === void 0 ? Ba(b) : Vo(b, S);
  }
  return {
    entity: i?.key ?? null,
    view: c,
    sort: m.key,
    dir: g,
    expr: _ === void 0 ? "" : at(_),
    facets: ur(i, M),
    page: x
  };
}
function ua(e, t, n = {}, a = "") {
  const s = Ha(t, n), r = It(t, e.entity), o = Ga(a).filter(([m]) => !Ho(m)), i = [], l = (m, k) => i.push([m, en(k)]), c = r?.key ?? null;
  c !== s.entity && l(pn, c ?? br), e.view !== rn(c, n) && l(Gn, e.view), e.sort !== s.sort && l(Wa, e.sort), e.dir !== s.dir && l(ja, e.dir), e.expr.trim() !== "" && l(Mt, e.expr);
  for (const m of r?.facets ?? []) {
    const k = e.facets[m.key];
    if (!k) continue;
    const g = Ko(k, m);
    g !== null && i.push([`${Ua}${m.key}`, en(g)]);
  }
  e.page > 1 && l(Qn, String(e.page));
  const u = [
    ...o.map(([m, k]) => [en(m), k]),
    ...i
  ];
  return u.length ? `?${u.map(([m, k]) => k === "" ? m : `${m}=${k}`).join("&")}` : "";
}
function jv(e) {
  const t = [];
  for (const [n, a] of Object.entries(e))
    for (const s of Array.isArray(a) ? a : [a]) {
      if (typeof s != "string") continue;
      const r = en(n);
      t.push(s === "" ? r : `${r}=${en(s)}`);
    }
  return t.length ? `?${t.join("&")}` : "";
}
function Uv(e) {
  const t = new Map(Ga(e)).get(Mt);
  return t === void 0 ? "" : at(t);
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
function Gv(e, t) {
  const n = typeof e == "string" ? e : e?.scope;
  if (!n) return null;
  const a = t.filter((s) => s.replace(/"/g, "") !== "").map((s) => Cr(n, s));
  return a.length ? a.join(" ") : null;
}
function Yn(e, t) {
  if (e.kind !== "field" || t.kind !== "field") return xa(e, t);
  const n = (a) => a.comparator === ":" || a.comparator === "=";
  return xa(e, { ...t, comparator: n(e) && n(t) ? e.comparator : t.comparator });
}
function Nn(e, t) {
  return Yn(e, $o(t));
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
  return s.some((i) => i.some((l) => Yn(l, a))) ? n : s.some((i) => i.some((l) => Nn(l, a))) ? ct(
    s.map(
      (i) => i.map((l) => Nn(l, a) ? a : l)
    )
  ) : `${n} ${t}`;
}
function Sr(e) {
  if (!e) return null;
  const t = e.trim();
  return t ? t.startsWith("-") ? t.slice(1) : `-${t}` : null;
}
function Qa(e, t) {
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
    (r) => r.filter((o) => !Yn(o, n) && !Nn(o, n))
  );
  return s.every((r, o) => r.length === a[o]?.length) ? e : ct(s);
}
function Ma(e, t, n) {
  return t ? n === null ? Mr(e, t) : vn(e, n === "out" ? Sr(t) : t) : e;
}
function Er(e) {
  return e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0;
}
function Zn(e) {
  return e.altKey ? { exclude: !0 } : {};
}
function da(e, t, n, a = {}) {
  const s = Bn(e, n);
  return vn(t.expr, a.exclude ? Sr(s) : s);
}
function Pr(e, t) {
  const n = e?.scope?.toLowerCase();
  if (!n || e?.keepsScope || !t.trim()) return t;
  const a = Ne(t), s = a.map(
    (r) => r.filter((o) => o.kind !== "field" || o.field !== n)
  );
  return s.every((r, o) => r.length === a[o]?.length) ? t : ct(s);
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
function jo(e, t) {
  const n = [], a = /* @__PURE__ */ new Set();
  for (const s of t)
    for (const r of Ne(s).flat()) {
      if (r.kind !== "field" || r.negated) continue;
      const o = Tr(e, r.field, r.value);
      if (!o) continue;
      const i = `${o.entity.key}:${o.id.toLowerCase()}`;
      a.has(i) || (a.add(i), n.push({ entityKey: o.entity.key, id: o.id }));
    }
  return n;
}
function Qv(e, t, n = "cards") {
  return {
    // An expression with nothing in it is no parameter, as the shell writes it.
    [Mt]: vn(e, t) || void 0,
    [pn]: void 0,
    [Gn]: n,
    [Qn]: void 0
  };
}
const Lr = Symbol("dc.shellContext");
function Uo(e) {
  const t = e.liveQuery ? e : Go(e);
  return cn(Lr, t), t;
}
function Go(e) {
  const t = e.draft ?? B("");
  return {
    draft: t,
    liveQuery: e.query,
    drafting: p(() => !1),
    commitDraft() {
      const n = t.value.trim();
      n && (e.setExpression(
        Ca(e.query.value.expr, On(n, e.entity.value))
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
function Ea(e) {
  return {
    read: () => ({
      theme: it(e.theme),
      accent: it(e.accent),
      tokens: it(e.tokens)
    })
  };
}
function Qo(e, t) {
  t ? t.provide(Dn, Ea(e)) : cn(Dn, Ea(e));
}
function Xo(e) {
  const t = er();
  cn(Dn, {
    ...Ea(e),
    element: () => t?.proxy?.$el ?? null
  });
}
function Xa(e) {
  const t = er(), n = St(Dn, null), a = dt(null);
  function s() {
    const l = t?.proxy?.$el, u = (l instanceof Element ? l : l?.parentElement)?.closest(".dc-shell");
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
    const l = a.value;
    if (!n) return l;
    const c = n.element?.();
    return l && c && l.shell !== c && c.contains(l.shell) ? l : n.read();
  }), o = p(() => e.theme ?? r.value?.theme ?? "minimal"), i = p(() => {
    const l = r.value, c = {
      ...l?.tokens,
      ...l?.accent ? { "--dc-accent": l.accent } : {},
      ...e.tokens,
      ...e.accent ? { "--dc-accent": e.accent } : {}
    };
    return Object.keys(c).length ? c : void 0;
  });
  return { theme: o, style: i, adopt: s };
}
const qn = "entity", ln = "expr";
function Yo(e, t) {
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
function Ya(e, t) {
  const n = [];
  t && n.push({
    id: qn,
    label: `entity:${t.key}`,
    facetKey: qn
  });
  for (const a of t?.facets ?? []) {
    const s = e.facets[a.key];
    s && ir(s) && n.push(...Yo(a, s));
  }
  return Ne(e.expr).forEach((a, s) => {
    a.forEach((r, o) => {
      n.push({
        id: `${ln}:${s}:${o}`,
        label: fn(r),
        facetKey: ln,
        group: s,
        index: o,
        ...r.kind === "field" ? { field: r.field, value: r.value } : {},
        ...r.negated ? { negated: !0 } : {}
      });
    });
  }), n;
}
function Zo(e, t, n = null) {
  if (Da(e)) {
    const r = mt(t, e.sort, n);
    return `everything · ${e.view} · ${r.label}`;
  }
  const a = Ya(e, t).filter((r) => r.facetKey !== ln).map((r) => r.label), s = e.expr.trim();
  return s && a.push(`"${s}"`), a.join(" · ");
}
function Jo(e) {
  const { adapter: t } = e, n = p(() => it(e.schema)), a = p(() => it(e.defaults) ?? {}), s = p(() => Wo(t.search.value, n.value, a.value)), r = p(() => It(n.value, s.value.entity)), o = p(() => r.value ?? rr(n.value, a.value)), i = p(() => or(r.value, n.value)), l = p(() => mt(r.value, s.value.sort, n.value)), c = (x, M) => {
    const b = ua(x, n.value, a.value, t.search.value);
    return b === t.search.value ? !1 : (M === "push" ? t.push(b) : t.replace(b), !0);
  }, u = () => it(e.navigationMode) ?? "push", m = () => it(e.facetNavigationMode) ?? "replace", k = (x, M) => {
    const b = x.page ?? (ia(x) ? 1 : s.value.page);
    return c({ ...s.value, ...x, page: b }, M);
  }, g = (x) => {
    const M = x.page ?? (ia(x) ? 1 : s.value.page), b = ua({ ...s.value, ...x, page: M }, n.value, a.value, t.search.value);
    return t.href ? t.href(b) : `${t.path.value}${b}`;
  }, _ = (x, M) => {
    const b = s.value.facets[x];
    if (!b) return;
    const S = { ...s.value.facets, [x]: M(b) };
    k({ facets: S }, m());
  }, y = (x) => {
    const M = x === null ? null : It(n.value, x);
    return (M?.key ?? null) === s.value.entity ? {} : {
      entity: M?.key ?? null,
      view: Cs(s.value.view, s.value.entity, M?.key ?? null, a.value),
      sort: mt(M, s.value.sort, n.value).key,
      facets: qt(M)
    };
  }, $ = (x) => {
    const M = y(x);
    Object.keys(M).length && k(M, u());
  };
  return {
    query: s,
    entity: r,
    focus: o,
    sort: l,
    sorts: i,
    summary: p(() => Zo(s.value, r.value, n.value)),
    terms: p(() => Ya(s.value, r.value)),
    isPristine: p(() => Da(s.value)),
    isEverything: p(() => s.value.entity === null),
    hasFacets: p(() => cr(s.value.facets)),
    setEntity: $,
    entityHref: (x) => g(y(x)),
    clearEntity: () => $(null),
    setView(x) {
      k({ view: x }, u());
    },
    setSort(x) {
      k({ sort: mt(r.value, x, n.value).key }, u());
    },
    toggleDirection() {
      k({ dir: s.value.dir === "desc" ? "asc" : "desc" }, u());
    },
    setExpression(x) {
      return k({ expr: x }, u());
    },
    narrow(x, M, b) {
      return k({ expr: x, ...y(M), ...b ? { view: b } : {} }, u());
    },
    narrowHref(x, M, b) {
      return g({ expr: x, ...y(M), ...b ? { view: b } : {} });
    },
    setPage(x, M) {
      k({ page: Math.max(1, Math.floor(x)) }, M ?? u());
    },
    setFacet(x, M) {
      _(x, () => M);
    },
    toggleChip(x, M) {
      _(x, (b) => b.kind !== "chips" ? b : { kind: "chips", selected: b.selected.includes(M) ? b.selected.filter((T) => T !== M) : [...b.selected, M] });
    },
    setRange(x, M, b) {
      _(x, (S) => S.kind === "range" ? { kind: "range", min: M, max: b } : S);
    },
    toggleFlag(x) {
      _(
        x,
        (M) => M.kind === "toggle" ? { kind: "toggle", on: !M.on } : M
      );
    },
    removeTerm(x) {
      if (x.facetKey === qn) {
        $(null);
        return;
      }
      if (x.facetKey === ln) {
        const M = xo(Ne(s.value.expr), x.group ?? 0, x.index ?? 0);
        k({ expr: ct(M) }, u());
        return;
      }
      _(x.facetKey, (M) => M.kind === "chips" && x.option ? { kind: "chips", selected: M.selected.filter((b) => b !== x.option) } : M.kind === "range" ? { kind: "range", min: null, max: null } : M.kind === "toggle" ? { kind: "toggle", on: !1 } : M);
    },
    clearFilters() {
      k({ ...y(null), expr: "", facets: qt(null) }, u());
    },
    reset() {
      c(Ha(n.value, a.value), u());
    },
    hrefFor(x) {
      const M = { ...s.value, ...x };
      return "entity" in x && !("view" in x) && (M.view = Cs(s.value.view, s.value.entity, M.entity, a.value)), M.page = x.page ?? (ia(x) ? 1 : s.value.page), M.facets = ur(It(n.value, M.entity), M.facets), `${t.path.value}${ua(M, n.value, a.value, t.search.value)}`;
    }
  };
}
function ei(e) {
  const t = dt([]), n = B(0), a = B(!1), s = B(!1), r = dt(null);
  let o = 0, i = null, l = null;
  const c = p(() => (e.query.value.page - 1) * e.limit.value), u = p(() => Zl(n.value, e.limit.value)), m = () => {
    const S = e.query.value, T = e.within?.value.trim(), N = Pr(e.entity.value, S.expr);
    return T ? { ...S, expr: Ka(T, N) } : N === S.expr ? S : { ...S, expr: N };
  }, k = (S, T) => {
    t.value = S.rows, n.value = S.total, r.value = null, g(T);
  }, g = (S) => {
    i = { key: S, total: n.value }, s.value = !1;
  }, _ = (S) => {
    r.value = S, t.value = [], n.value = 0, i = null, s.value = !1;
  }, y = (S, T, N, L) => {
    let z = !0;
    const E = () => S === o;
    let H = 0, q = !1;
    const Q = (fe) => {
      H = fe, q = !0, L === void 0 && (n.value = fe);
    }, ve = () => {
      z && (z = !1, t.value = [], Q(0)), r.value = null;
    };
    return {
      get open() {
        return E();
      },
      insert(fe, Be) {
        if (!E()) return;
        const D = Array.isArray(fe) ? fe : [fe];
        if (!D.length) return;
        ve();
        const j = [...t.value];
        j.splice(Be ?? j.length, 0, ...D), t.value = T > 0 ? j.slice(0, T) : j, Q(H + D.length);
      },
      set(fe) {
        E() && (fe.rows && (ve(), t.value = T > 0 ? fe.rows.slice(0, T) : fe.rows, Q(fe.rows.length)), fe.total !== void 0 && Q(fe.total));
      },
      close() {
        E() && (a.value = !1, q && (n.value = H), g(N));
      },
      fail(fe) {
        E() && (_(fe), a.value = !1);
      }
    };
  }, $ = () => {
    const S = l;
    l = null, S?.();
  }, x = () => {
    const S = ++o;
    $();
    const T = M.value, N = i?.key === T ? i.total : void 0;
    s.value = N === void 0;
    const L = {
      query: m(),
      schema: e.schema.value,
      entity: e.entity.value,
      limit: e.limit.value,
      offset: c.value
    }, z = e.source.value;
    if (z.stream) {
      a.value = !0;
      try {
        l = z.stream(L, y(S, L.limit, T, N)) ?? null;
      } catch (H) {
        _(H), a.value = !1;
      }
      return;
    }
    let E;
    try {
      E = z.query(L);
    } catch (H) {
      _(H);
      return;
    }
    if (!(E instanceof Promise)) {
      k(E, T), a.value = !1;
      return;
    }
    a.value = !0, E.then((H) => {
      S === o && k(H, T);
    }).catch((H) => {
      S === o && _(H);
    }).finally(() => {
      S === o && (a.value = !1);
    });
  }, M = p(() => {
    const S = m();
    return `${e.entity.value?.key ?? e.schema.value.entities[0]?.key ?? ""}|${JSON.stringify(Va.map((N) => S[N]))}`;
  }), b = p(() => `${M.value}|${e.query.value.page}`);
  return be([e.source, b, e.limit], x, {
    immediate: !0
  }), Kt(() => {
    o++, $();
  }, !0), { rows: t, total: n, offset: c, pageCount: u, pending: a, counting: s, error: r, refresh: x };
}
const ti = 150;
function ni(e) {
  const t = e.delay ?? ti, n = B(""), a = B("");
  let s = !1, r;
  const o = () => {
    clearTimeout(r), r = void 0;
  }, i = p(() => On(Po(a.value), e.entity.value)), l = p(() => i.value.trim() !== ""), c = p(
    () => JSON.stringify([i.value, ...Va.map((g) => e.query.value[g])])
  ), u = dt(null), m = p(() => {
    const g = e.query.value;
    if (!l.value) return g;
    const _ = u.value?.of === c.value ? u.value.page : 1;
    return { ...g, expr: Ca(g.expr, i.value), page: _ };
  });
  be(n, (g) => {
    if (o(), !g.trim()) {
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
    o(), s = !0, n.value = "", !g() && s && (s = !1, a.value = "");
  };
  return Kn() && Kt(o), {
    text: n,
    live: m,
    drafting: l,
    setPage(g) {
      u.value = { of: c.value, page: Math.max(1, Math.floor(g)) };
    },
    commit() {
      const g = n.value.trim();
      if (!g) return;
      const _ = Ca(
        e.query.value.expr,
        On(g, e.entity.value)
      );
      a.value = g, k(() => e.setExpression(_));
    },
    abandon() {
      o(), s = !1, n.value = "", a.value = "";
    },
    release: k
  };
}
const tn = (e) => e.separator !== !0 && e.heading !== !0 && e.disabled !== !0, ai = ["aria-label"], si = ["role", "aria-label"], ri = ["data-dc-item"], li = {
  key: 0,
  class: "dc-menu__rule",
  role: "separator"
}, oi = ["role", "aria-checked", "aria-haspopup", "aria-expanded", "aria-disabled", "disabled", "data-dc-item", "onClick", "onMouseenter"], ii = {
  class: "dc-menu__mark",
  "aria-hidden": "true"
}, ci = { class: "dc-menu__label dc-truncate" }, ui = {
  key: 0,
  class: "dc-menu__key dc-mono"
}, di = {
  key: 1,
  class: "dc-menu__more",
  "aria-hidden": "true"
}, fi = /* @__PURE__ */ te({
  __name: "MenuList",
  props: {
    items: {},
    at: {},
    label: {},
    autofocus: { type: Boolean }
  },
  emits: ["choose", "dismiss"],
  setup(e, { expose: t, emit: n }) {
    const a = e, s = n, r = B(null), o = B([]), i = B(null), l = B(null), c = B(null), u = B(!1), m = p(
      () => a.items.flatMap((L, z) => tn(L) ? [z] : [])
    ), k = p(() => {
      const L = [{ entries: [] }];
      return a.items.forEach((z, E) => {
        z.heading ? L.push({ heading: z, entries: [] }) : L[L.length - 1]?.entries.push({ item: z, index: E });
      }), L.filter((z) => z.entries.length > 0);
    }), g = B({ x: a.at.x, y: a.at.y });
    async function _() {
      g.value = { x: a.at.x, y: a.at.y }, await ft();
      const L = r.value?.getBoundingClientRect();
      if (!L) return;
      const z = 8;
      let E = a.at.x, H = a.at.y;
      if (E + L.width > window.innerWidth - z) {
        const q = a.at.mirrorX === void 0 ? null : a.at.mirrorX - L.width;
        E = q !== null && q >= z ? q : window.innerWidth - L.width - z;
      }
      H + L.height > window.innerHeight - z && (H = window.innerHeight - L.height - z), g.value = { x: Math.max(z, E), y: Math.max(z, H) };
    }
    const y = p(() => ({ left: `${g.value.x}px`, top: `${g.value.y}px` }));
    function $(L) {
      i.value = L, L !== null && ft(() => o.value[L]?.focus());
    }
    function x(L, z) {
      const E = m.value;
      if (E.length === 0) return null;
      if (L === null) return z === 1 ? E[0] ?? null : E[E.length - 1] ?? null;
      const H = E.indexOf(L);
      return H === -1 ? E[0] ?? null : E[(H + z + E.length) % E.length] ?? null;
    }
    function M(L, z) {
      if (!a.items[L]?.items?.length) return;
      const H = o.value[L]?.getBoundingClientRect(), q = r.value?.getBoundingClientRect();
      !H || !q || (c.value = { x: q.right - 4, y: H.top - 4, mirrorX: q.left + 4 }, l.value = L, u.value = z);
    }
    function b(L) {
      const z = l.value;
      l.value = null, c.value = null, L && z !== null && $(z);
    }
    function S(L) {
      const z = a.items[L];
      if (!(!z || !tn(z))) {
        if (z.items?.length) {
          M(L, !0);
          return;
        }
        s("choose", z);
      }
    }
    function T(L) {
      const z = L.key;
      if (z === "Escape") {
        L.preventDefault(), L.stopPropagation(), l.value !== null ? b(!0) : s("dismiss");
        return;
      }
      if (z === "ArrowDown" || z === "ArrowUp") {
        L.preventDefault(), L.stopPropagation(), b(!1), $(x(i.value, z === "ArrowDown" ? 1 : -1));
        return;
      }
      if (z === "Home" || z === "End") {
        L.preventDefault(), L.stopPropagation(), b(!1), $(x(null, z === "Home" ? 1 : -1));
        return;
      }
      if (z === "ArrowRight") {
        const E = i.value;
        E !== null && a.items[E]?.items?.length && (L.preventDefault(), L.stopPropagation(), M(E, !0));
        return;
      }
      if (z === "ArrowLeft") {
        l.value !== null && (L.preventDefault(), L.stopPropagation(), b(!0));
        return;
      }
      if (z === "Enter" || z === " ") {
        const E = i.value;
        if (E === null) return;
        L.preventDefault(), L.stopPropagation(), S(E);
      }
    }
    function N(L) {
      const z = a.items[L];
      !z || !tn(z) || (l.value !== null && l.value !== L && b(!1), $(L), z.items?.length && M(L, !1));
    }
    return un(() => {
      _(), a.autofocus && $(x(null, 1));
    }), be(() => a.at, _, { deep: !0 }), be(() => a.items, () => void _(), { deep: !0 }), Ke(() => {
      l.value = null;
    }), t({ root: r }), (L, z) => {
      const E = tr("MenuList", !0);
      return d(), v("div", {
        ref_key: "root",
        ref: r,
        class: "dc-menu",
        role: "menu",
        "aria-label": e.label,
        style: Se(y.value),
        onKeydown: T
      }, [
        (d(!0), v(Z, null, de(k.value, (H, q) => (d(), v("div", {
          key: `${q}-${H.heading?.label ?? ""}`,
          class: "dc-menu__group",
          role: H.heading ? "group" : "none",
          "aria-label": H.heading?.label
        }, [
          H.heading ? (d(), v("div", {
            key: 0,
            class: "dc-menu__heading dc-truncate",
            "aria-hidden": "true",
            "data-dc-item": H.heading.id
          }, R(H.heading.label), 9, ri)) : A("", !0),
          (d(!0), v(Z, null, de(H.entries, ({ item: Q, index: ve }) => (d(), v(Z, {
            key: Q.id ?? `${ve}-${Q.label ?? ""}`
          }, [
            Q.separator ? (d(), v("div", li)) : (d(), v("button", {
              key: 1,
              ref_for: !0,
              ref: (fe) => {
                fe && (o.value[ve] = fe);
              },
              type: "button",
              class: "dc-menu__item",
              role: Q.checked === void 0 ? "menuitem" : "menuitemcheckbox",
              "aria-checked": Q.checked === void 0 ? void 0 : Q.checked,
              "aria-haspopup": Q.items?.length ? "menu" : void 0,
              "aria-expanded": Q.items?.length ? l.value === ve : void 0,
              "aria-disabled": Q.disabled ? "true" : void 0,
              disabled: Q.disabled,
              "data-dc-item": Q.id,
              tabindex: "-1",
              onClick: (fe) => S(ve),
              onMouseenter: (fe) => N(ve)
            }, [
              C("span", ii, R(Q.checked ? "✓" : ""), 1),
              C("span", ci, R(Q.label), 1),
              Q.shortcut ? (d(), v("span", ui, R(Q.shortcut), 1)) : Q.items?.length ? (d(), v("span", di, "›")) : A("", !0)
            ], 40, oi))
          ], 64))), 128))
        ], 8, si))), 128)),
        l.value !== null && c.value ? (d(), G(E, {
          key: l.value,
          items: e.items[l.value]?.items ?? [],
          at: c.value,
          label: e.items[l.value]?.label,
          autofocus: u.value,
          onChoose: z[0] || (z[0] = (H) => s("choose", H)),
          onDismiss: z[1] || (z[1] = (H) => b(!0))
        }, null, 8, ["items", "at", "label", "autofocus"])) : A("", !0)
      ], 44, ai);
    };
  }
}), re = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [a, s] of t)
    n[a] = s;
  return n;
}, Za = /* @__PURE__ */ re(fi, [["__scopeId", "data-v-9b1413fa"]]), pi = { class: "dc-pick" }, vi = ["id"], hi = ["id", "aria-expanded", "aria-labelledby", "data-dc-value"], mi = { class: "dc-pick__label" }, gi = /* @__PURE__ */ te({
  __name: "PickControl",
  props: {
    modelValue: {},
    options: {},
    label: {},
    mono: { type: Boolean }
  },
  emits: ["update:modelValue", "open", "close"],
  setup(e, { emit: t }) {
    const n = e, a = t, s = dn() ?? "dc-pick", r = B(null), o = B(null), i = B(null), l = B(!1), c = p(() => i.value !== null), u = B(null), m = p(
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
    function _(S) {
      const T = r.value?.getBoundingClientRect();
      T && (u.value = r.value?.closest(".dc-shell") ?? document.body, i.value = { x: T.left, y: T.bottom + 4, mirrorX: T.right }, l.value = S, a("open"));
    }
    function y(S) {
      i.value && a("close"), i.value = null, S && r.value?.focus();
    }
    function $() {
      c.value ? y(!0) : _(!1);
    }
    function x(S) {
      S.key !== "ArrowDown" && S.key !== "ArrowUp" || c.value || (S.preventDefault(), _(!0));
    }
    function M(S) {
      const T = S.target;
      T && (r.value?.contains(T) || o.value?.root?.contains(T) || y(!1));
    }
    be(c, (S) => {
      S ? window.addEventListener("pointerdown", M, !0) : window.removeEventListener("pointerdown", M, !0);
    }), Ke(() => window.removeEventListener("pointerdown", M, !0));
    function b(S) {
      y(!0), !(S.id === void 0 || S.id === n.modelValue) && a("update:modelValue", S.id);
    }
    return (S, T) => (d(), v("span", pi, [
      C("span", {
        id: `${P(s)}-name`,
        class: "dc-pick__name"
      }, R(e.label), 9, vi),
      C("button", {
        id: `${P(s)}-value`,
        ref_key: "trigger",
        ref: r,
        type: "button",
        class: rt(["dc-pick__button", { "dc-mono": e.mono }]),
        "aria-haspopup": "menu",
        "aria-expanded": c.value,
        "aria-labelledby": `${P(s)}-name ${P(s)}-value`,
        "data-dc-value": e.modelValue,
        onClick: $,
        onKeydown: x
      }, [
        C("span", mi, R(m.value?.label), 1)
      ], 42, hi),
      T[1] || (T[1] = C("span", {
        class: "dc-pick__mark",
        "aria-hidden": "true"
      }, "▾", -1)),
      i.value && u.value ? (d(), G(Wn, {
        key: 0,
        to: u.value
      }, [
        oe(Za, {
          ref_key: "menu",
          ref: o,
          class: "dc-pick__list",
          style: Se(g.value),
          items: k.value,
          at: i.value,
          label: e.label,
          autofocus: l.value,
          onChoose: b,
          onDismiss: T[0] || (T[0] = (N) => y(!0))
        }, null, 8, ["style", "items", "at", "label", "autofocus"])
      ], 8, ["to"])) : A("", !0)
    ]));
  }
}), Bs = /* @__PURE__ */ re(gi, [["__scopeId", "data-v-d21ebf1b"]]);
function yi(e) {
  const t = dt(/* @__PURE__ */ new Map()), n = B(!0);
  let a = 0, s;
  const r = () => {
    a++, s?.abort(), s = void 0;
  }, o = () => {
    r();
    const i = a, { signal: l } = s = new AbortController(), c = e.query.value, u = e.schema.value, m = e.entities.value, k = e.within?.value.trim() ?? "";
    n.value = c.expr.trim() === "" && !k;
    const g = /* @__PURE__ */ new Map();
    let _ = !0;
    for (const y of m) {
      const $ = Pr(y, c.expr), x = k ? Ka(k, $) : $;
      let M = !1;
      const b = (T) => {
        if (i !== a) return;
        if (_) {
          g.set(y.key, T);
          return;
        }
        const N = new Map(t.value);
        N.set(y.key, T), t.value = N;
      }, S = e.source.value.query({
        query: { ...c, entity: y.key, expr: x, facets: qt(y), page: 1 },
        schema: u,
        entity: y,
        limit: 0,
        offset: 0,
        signal: l,
        progress: (T) => {
          M || b({ total: T, pending: !0, counted: !0 });
        }
      });
      S instanceof Promise ? (g.has(y.key) || g.set(y.key, { total: 0, pending: !0, counted: !1 }), S.then((T) => {
        M = !0, b({ total: T.total, pending: !1, counted: !0 });
      })) : (M = !0, g.set(y.key, { total: S.total, pending: !1, counted: !0 }));
    }
    _ = !1, t.value = g;
  };
  return Kn() && Kt(r), { counts: t, pristine: n, refresh: o, cancel: r };
}
const _i = 25, Rr = (e, t) => e.toLowerCase() === t.toLowerCase();
function wi(e, t) {
  return e.find((n) => Rr(n.id, t));
}
function ki(e) {
  const t = dt(/* @__PURE__ */ new Map()), n = /* @__PURE__ */ new Set(), a = (i) => {
    if (i.facetKey !== ln) return null;
    const l = Tr(e.schema.value, i.field, i.value);
    return l ? { ...l, key: `${l.entity.key}:${l.id}` } : null;
  }, s = (i) => {
    const { entity: l, id: c } = i, u = e.query.value;
    return e.source.value.query({
      query: {
        ...u,
        entity: l.key,
        // The reference on its own. The rest of the query is about the rows on
        // screen, which are of another type entirely.
        expr: xr(l, c) ?? "",
        facets: qt(l),
        sort: mt(l, u.sort, e.schema.value).key,
        page: 1
      },
      schema: e.schema.value,
      entity: l,
      limit: _i,
      offset: 0
    });
  }, r = (i, l) => {
    const c = En(Ze(i.columns ?? [], "identity"), l);
    return c === lt || Rr(c, l.id) ? "" : c;
  }, o = () => {
    const i = /* @__PURE__ */ new Map();
    for (const u of e.terms.value) {
      const m = a(u);
      m && !t.value.has(m.key) && !n.has(m.key) && i.set(m.key, m);
    }
    if (!i.size) return;
    const l = [...i.values()].map((u) => ({
      reference: u,
      outcome: s(u)
    })), c = (u) => {
      const m = new Map(t.value);
      u.forEach((k, g) => {
        const { reference: _ } = l[g], y = wi(k.rows, _.id);
        m.set(_.key, y ? r(_.entity, y) : "");
      }), t.value = m;
    };
    if (l.every(({ outcome: u }) => !(u instanceof Promise))) {
      c(l.map(({ outcome: u }) => u));
      return;
    }
    for (const { reference: u } of l) n.add(u.key);
    Promise.all(l.map(({ outcome: u }) => Promise.resolve(u))).then(c).catch(() => {
    }).finally(() => {
      for (const { reference: u } of l) n.delete(u.key);
    });
  };
  return be([e.source, e.schema, e.terms], () => {
    try {
      o();
    } catch {
    }
  }, { immediate: !0 }), {
    names: t,
    nameOf(i) {
      const l = a(i);
      return l && t.value.get(l.key) || null;
    }
  };
}
const bi = ["data-dc-expanded"], $i = {
  key: 0,
  class: "dc-header__domain",
  "data-dc-brand": ""
}, xi = {
  class: "dc-header__brand",
  "aria-hidden": "true"
}, Ci = { class: "dc-header__sr" }, Si = {
  key: 1,
  class: "dc-header__domain"
}, Mi = {
  key: 2,
  class: "dc-header__within"
}, Ei = ["title"], Pi = ["data-dc-more", "title"], Ai = {
  key: 0,
  class: "dc-header__or dc-mono",
  "aria-hidden": "true"
}, Ti = ["title", "aria-label", "onClick"], Li = ["onKeydown"], Ri = ["aria-expanded", "aria-controls"], zi = {
  class: "dc-header__chevron",
  "aria-hidden": "true"
}, Ii = { class: "dc-header__sr" }, Oi = {
  key: 0,
  class: "dc-header__pages",
  "aria-label": "Pages"
}, Fi = ["disabled"], Ni = ["title"], Bi = ["value", "onKeydown"], Di = {
  class: "dc-header__page-total",
  "aria-hidden": "true"
}, qi = {
  class: "dc-header__sr",
  "aria-live": "polite"
}, Hi = ["disabled"], Vi = {
  key: 1,
  class: "dc-header__actions"
}, Ki = "…", Wi = /* @__PURE__ */ te({
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
    const n = e, a = t, s = Wt(), r = Ee(), o = p(() => r.schema.value), i = p(
      () => r.hasFacets.value || !!r.liveQuery.value.expr.trim() || !!r.within.value
    ), l = p(() => o.value.formatCount ?? Lt), c = yi({
      source: r.source,
      schema: r.schema,
      // What each type holds of what is on screen, the draft's results included:
      // a count of the committed query would disagree with the rows under it.
      query: r.liveQuery,
      entities: r.entities,
      within: r.within
    });
    function u(V) {
      if (n.hideCount) return V.count;
      if (V.key === r.query.value.entity && i.value) return l.value(r.total.value);
      if (c.pristine.value) return V.count;
      const Y = c.counts.value.get(V.key);
      return Y ? Y.counted ? `${Y.pending ? "~" : ""}${l.value(Y.total)}` : Ki : V.count;
    }
    function m(V) {
      return `${V.label} · ${u(V)}`;
    }
    const k = p(() => [
      { key: "", label: "Everything" },
      ...r.entities.value.map((V) => ({ key: V.key, label: m(V) }))
    ]), g = p(() => {
      const V = r.within.value.trim();
      return V ? Ya({ ...r.query.value, expr: V, facets: {} }, null) : [];
    }), _ = p(
      () => (n.views ?? [...ar]).map((V) => ({ key: V, label: Xl[V] }))
    ), y = p(() => Un(r.query.value.view, n.views)), $ = p(() => !n.hideViews && _.value.length > 1), x = p(() => n.typeChooser === "always" || r.query.value.entity !== null);
    function M(V) {
      r.setView(V);
    }
    const b = p(() => {
      const V = r.entity.value, J = V?.keepsScope ? void 0 : V?.scope?.toLowerCase();
      return r.terms.value.filter((Y) => Y.facetKey !== qn).map((Y, Ge, K) => {
        const X = K[Ge - 1];
        return {
          term: Y,
          or: X?.group !== void 0 && Y.group !== void 0 && Y.group !== X.group,
          idle: !!J && Y.field?.toLowerCase() === J
        };
      });
    }), S = ki({
      source: r.source,
      schema: r.schema,
      query: r.query,
      // The scope's parts as well as the query's: it names a record more often
      // than a typed term does, being what a record's own page is built on.
      terms: p(() => [...g.value, ...r.terms.value])
    });
    function T(V) {
      return Ar(o.value, V)?.scopeLabel ?? V;
    }
    function N(V) {
      return V.replace(/\s*\([^()]*\)\s*$/, "");
    }
    function L(V) {
      const J = S.nameOf(V);
      return J ? `${V.negated ? "-" : ""}${T(V.field)}: ${N(J)}` : V.label;
    }
    function z(V) {
      r.setEntity(V || null);
    }
    const E = B(null);
    function H() {
      r.abandonDraft(), E.value?.blur();
    }
    function q(V) {
      if (r.draft.value) return;
      const J = b.value.at(-1);
      J && (V.preventDefault(), r.removeTerm(J.term));
    }
    function Q(V) {
      V.target?.closest("button, select, label, input") || a("toggle");
    }
    const ve = B(null), fe = B("");
    function Be() {
      const V = ve.value;
      if (!V) {
        fe.value = "";
        return;
      }
      const J = V.scrollLeft > 1, Y = V.scrollWidth - V.clientWidth - V.scrollLeft > 1;
      fe.value = J && Y ? "both" : J ? "start" : Y ? "end" : "";
    }
    let D = null;
    be(
      ve,
      (V) => {
        D?.disconnect(), D = null, Be(), !(!V || typeof ResizeObserver > "u") && (D = new ResizeObserver(Be), D.observe(V));
      },
      { flush: "post" }
    ), be(b, Be, { flush: "post" }), Ke(() => D?.disconnect());
    const j = p(() => r.liveQuery.value.page), me = p(
      () => !n.hidePages && (r.pageCount.value > 1 || !!n.pagesNote) && !qa(r.query.value, n.views)
    ), le = p(
      () => `${r.counting.value ? "~" : ""}${Lt(r.pageCount.value)}`
    ), xe = p(() => {
      let V = `Page ${Lt(j.value)} of ${le.value}`;
      const J = r.rows.value.length;
      if (J) {
        const Y = r.offset.value + 1, Ge = `${r.counting.value ? "~" : ""}${Lt(r.total.value)}`;
        V += ` — rows ${Lt(Y)} to ${Lt(Y + J - 1)} of ${Ge}`;
      }
      return n.pagesNote ? `${V}
${n.pagesNote}` : V;
    }), Me = B(null), Re = p(() => Me.value ?? String(j.value)), Ue = p(
      () => `calc(${Math.max(2, String(r.pageCount.value).length)}ch + 10px)`
    );
    function O(V) {
      V.target.select();
    }
    function ae(V) {
      const J = V.target, Y = J.value.replace(/[^0-9]/g, "");
      J.value !== Y && (J.value = Y), Me.value = Y;
    }
    function pe(V) {
      const J = V.target, Y = Number(Me.value);
      Me.value = null;
      const Ge = Number.isFinite(Y) && Y >= 1 ? Math.min(Math.trunc(Y), Math.max(1, r.pageCount.value)) : j.value;
      J.value = String(Ge), Ge !== j.value && r.setPage(Ge);
    }
    function We(V) {
      const J = V.target;
      Me.value = null, J.value = String(j.value), J.blur();
    }
    return (V, J) => (d(), v("div", {
      class: "dc-header",
      "data-dc-expanded": e.expanded ? "true" : "false"
    }, [
      C("div", {
        class: "dc-header__trigger",
        onClick: Q
      }, [
        s.brand ? (d(), v("span", $i, [
          C("span", xi, [
            ye(V.$slots, "brand", {
              label: o.value.label
            }, void 0, !0)
          ]),
          C("span", Ci, R(o.value.label), 1)
        ])) : (d(), v("span", Si, R(o.value.label), 1)),
        g.value.length ? (d(), v("span", Mi, [
          J[5] || (J[5] = C("span", { class: "dc-header__sr" }, "Within", -1)),
          (d(!0), v(Z, null, de(g.value, (Y) => (d(), v("span", {
            key: `scope:${Y.id}`,
            class: "dc-within dc-mono dc-truncate",
            title: L(Y)
          }, R(L(Y)), 9, Ei))), 128))
        ])) : A("", !0),
        C("div", {
          ref_key: "termBar",
          ref: ve,
          class: "dc-header__query dc-header__terms",
          "data-dc-more": fe.value,
          title: P(r).summary.value,
          onScroll: Be
        }, [
          x.value ? (d(), G(Bs, {
            key: 0,
            class: "dc-header__pick dc-header__scope-select",
            label: "Type",
            "model-value": P(r).query.value.entity ?? "",
            options: k.value,
            onOpen: P(c).refresh,
            onClose: P(c).cancel,
            "onUpdate:modelValue": z
          }, null, 8, ["model-value", "options", "onOpen", "onClose"])) : A("", !0),
          $.value ? (d(), G(Bs, {
            key: 1,
            class: "dc-header__pick dc-header__view-select",
            label: "View",
            "model-value": y.value,
            options: _.value,
            "onUpdate:modelValue": M
          }, null, 8, ["model-value", "options"])) : A("", !0),
          (d(!0), v(Z, null, de(b.value, (Y) => (d(), v(Z, {
            key: Y.term.id
          }, [
            Y.or ? (d(), v("span", Ai, "or")) : A("", !0),
            C("button", {
              type: "button",
              class: rt(["dc-term dc-mono", { "dc-term--idle": Y.idle }]),
              title: Y.idle ? `Not applied to ${P(r).entity.value?.label} — remove ${L(Y.term)}` : `Remove ${L(Y.term)}`,
              "aria-label": `Remove ${L(Y.term)}`,
              onClick: (Ge) => P(r).removeTerm(Y.term)
            }, R(L(Y.term)), 11, Ti)
          ], 64))), 128)),
          yt(C("input", {
            ref_key: "searchBox",
            ref: E,
            "onUpdate:modelValue": J[0] || (J[0] = (Y) => P(r).draft.value = Y),
            class: "dc-header__search dc-mono",
            type: "text",
            autocomplete: "off",
            spellcheck: "false",
            placeholder: "Search…",
            "aria-label": "Search",
            onKeydown: [
              J[1] || (J[1] = st(Ve(
                //@ts-ignore
                (...Y) => P(r).commitDraft && P(r).commitDraft(...Y),
                ["prevent"]
              ), ["enter"])),
              st(Ve(H, ["prevent"]), ["esc"]),
              st(q, ["backspace"])
            ]
          }, null, 40, Li), [
            [Rn, P(r).draft.value]
          ])
        ], 40, Pi),
        C("button", {
          type: "button",
          class: "dc-header__toggle",
          "aria-expanded": e.expanded,
          "aria-controls": e.panelId,
          onClick: J[2] || (J[2] = (Y) => a("toggle"))
        }, [
          C("span", zi, R(e.expanded ? "▲" : "▼"), 1),
          C("span", Ii, R(e.expanded ? "Hide query panel" : "Edit query"), 1)
        ], 8, Ri)
      ]),
      me.value ? (d(), v("nav", Oi, [
        C("button", {
          type: "button",
          class: "dc-header__step",
          "aria-label": "Previous page",
          disabled: j.value <= 1,
          onClick: J[3] || (J[3] = (Y) => P(r).setPage(j.value - 1))
        }, [...J[6] || (J[6] = [
          C("span", { "aria-hidden": "true" }, "‹", -1)
        ])], 8, Fi),
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
            onFocus: O,
            onInput: ae,
            onKeydown: [
              st(Ve(pe, ["prevent"]), ["enter"]),
              st(Ve(We, ["prevent"]), ["esc"])
            ],
            onBlur: pe
          }, null, 44, Bi),
          C("span", Di, "/ " + R(le.value), 1)
        ], 8, Ni),
        C("span", qi, R(xe.value), 1),
        C("button", {
          type: "button",
          class: "dc-header__step",
          "aria-label": "Next page",
          disabled: j.value >= P(r).pageCount.value,
          onClick: J[4] || (J[4] = (Y) => P(r).setPage(j.value + 1))
        }, [...J[7] || (J[7] = [
          C("span", { "aria-hidden": "true" }, "›", -1)
        ])], 8, Hi)
      ])) : A("", !0),
      s.actions ? (d(), v("div", Vi, [
        ye(V.$slots, "actions", {}, void 0, !0)
      ])) : A("", !0)
    ], 8, bi));
  }
}), zr = /* @__PURE__ */ re(Wi, [["__scopeId", "data-v-866943d8"]]), ji = { class: "dc-facet" }, Ui = ["id"], Gi = { class: "dc-facet__body" }, Qi = ["aria-labelledby", "data-dc-max-rows", "data-dc-truncate"], Xi = ["aria-pressed", "data-dc-active", "title", "onClick"], Yi = ["aria-labelledby"], Zi = ["aria-label", "placeholder", "onKeydown"], Ji = ["aria-label", "placeholder", "onKeydown"], ec = ["aria-checked"], tc = { class: "dc-switch__text" }, nc = ["data-dc-active"], ac = /* @__PURE__ */ te({
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
      const _ = s.value.has(g) ? n.value.selected.filter((y) => y !== g) : [...n.value.selected, g];
      a("update", { kind: "chips", selected: _ });
    }
    const o = B(""), i = B("");
    be(
      () => n.value,
      (g) => {
        g.kind === "range" && (o.value = g.min === null ? "" : g.min, i.value = g.max === null ? "" : g.max);
      },
      { immediate: !0, deep: !0 }
    );
    function l(g) {
      if (typeof g == "number") return Number.isFinite(g) ? g : null;
      const _ = g.trim();
      if (!_) return null;
      const y = Number(_);
      return Number.isFinite(y) ? y : null;
    }
    function c() {
      if (n.value.kind !== "range") return;
      const g = l(o.value), _ = l(i.value);
      g === n.value.min && _ === n.value.max || a("update", { kind: "range", min: g, max: _ });
    }
    const u = p(() => {
      if (n.facet.kind !== "chips" || n.facet.maxRows === void 0) return null;
      const g = Math.floor(n.facet.maxRows);
      return Number.isFinite(g) && g >= 1 ? g : null;
    }), m = p(() => n.facet.kind === "chips" ? n.facet.truncate : void 0);
    function k() {
      n.value.kind === "toggle" && a("update", { kind: "toggle", on: !n.value.on });
    }
    return (g, _) => (d(), v("div", ji, [
      C("span", {
        id: `dc-facet-${e.facet.key}`,
        class: "dc-facet__label"
      }, R(e.facet.label), 9, Ui),
      C("div", Gi, [
        e.facet.kind === "chips" && e.value.kind === "chips" ? (d(), v("div", {
          key: 0,
          class: "dc-facet__chips",
          role: "group",
          "aria-labelledby": `dc-facet-${e.facet.key}`,
          "data-dc-max-rows": u.value ?? void 0,
          "data-dc-truncate": m.value,
          style: Se(u.value ? { "--dc-facet-rows": u.value } : void 0)
        }, [
          (d(!0), v(Z, null, de(e.facet.options, (y) => (d(), v("button", {
            key: y,
            type: "button",
            class: "dc-chip",
            "aria-pressed": s.value.has(y),
            "data-dc-active": s.value.has(y) ? "true" : "false",
            title: m.value ? y : void 0,
            onClick: ($) => r(y)
          }, R(y), 9, Xi))), 128))
        ], 12, Qi)) : e.facet.kind === "range" && e.value.kind === "range" ? (d(), v("div", {
          key: 1,
          class: "dc-facet__range",
          role: "group",
          "aria-labelledby": `dc-facet-${e.facet.key}`
        }, [
          yt(C("input", {
            "onUpdate:modelValue": _[0] || (_[0] = (y) => o.value = y),
            class: "dc-input dc-mono",
            type: "number",
            inputmode: "numeric",
            "aria-label": `${e.facet.label} minimum`,
            placeholder: String(e.facet.min),
            onChange: c,
            onBlur: c,
            onKeydown: st(Ve(c, ["prevent"]), ["enter"])
          }, null, 40, Zi), [
            [Rn, o.value]
          ]),
          _[2] || (_[2] = C("span", {
            class: "dc-facet__dash",
            "aria-hidden": "true"
          }, "–", -1)),
          yt(C("input", {
            "onUpdate:modelValue": _[1] || (_[1] = (y) => i.value = y),
            class: "dc-input dc-mono",
            type: "number",
            inputmode: "numeric",
            "aria-label": `${e.facet.label} maximum`,
            placeholder: String(e.facet.max),
            onChange: c,
            onBlur: c,
            onKeydown: st(Ve(c, ["prevent"]), ["enter"])
          }, null, 40, Ji), [
            [Rn, i.value]
          ])
        ], 8, Yi)) : e.facet.kind === "toggle" && e.value.kind === "toggle" ? (d(), v("button", {
          key: 2,
          type: "button",
          class: "dc-switch",
          role: "switch",
          "aria-checked": e.value.on,
          onClick: k
        }, [
          C("span", tc, R(e.facet.text), 1),
          C("span", {
            class: "dc-switch__track",
            "data-dc-active": e.value.on ? "true" : "false",
            "aria-hidden": "true"
          }, [..._[3] || (_[3] = [
            C("span", { class: "dc-switch__knob" }, null, -1)
          ])], 8, nc)
        ], 8, ec)) : A("", !0)
      ])
    ]));
  }
}), Ir = /* @__PURE__ */ re(ac, [["__scopeId", "data-v-9fa4911a"]]), sc = ["id"], rc = { class: "dc-panel__section dc-panel__rows" }, lc = { class: "dc-panel__row" }, oc = ["for"], ic = ["title", "aria-label", "onClick"], cc = ["id", "placeholder", "onKeydown"], uc = { class: "dc-panel__actions" }, dc = ["disabled"], fc = {
  key: 0,
  class: "dc-panel__section"
}, pc = /* @__PURE__ */ te({
  __name: "QueryPanel",
  props: {
    panelId: {}
  },
  emits: ["close"],
  setup(e, { emit: t }) {
    const n = t, a = Wt(), s = Ee(), r = p(() => Co(s.query.value.expr)), o = p(() => r.value.parts.map(fn)), i = B(r.value.text), l = B(null);
    be(
      () => r.value.text,
      (y) => {
        i.value = y;
      }
    );
    const c = p(() => i.value !== r.value.text);
    function u() {
      if (c.value) {
        const y = On(i.value, s.entity.value);
        s.setExpression(Is(r.value.parts, y));
      }
      n("close");
    }
    function m(y) {
      const { parts: $, text: x } = r.value;
      s.setExpression(Is($.filter((M, b) => b !== y), x));
    }
    function k(y) {
      const { parts: $ } = r.value;
      i.value || !$.length || (y.preventDefault(), m($.length - 1));
    }
    function g() {
      i.value = "", s.clearFilters();
    }
    function _(y, $) {
      s.setFacet(y, $);
    }
    return ft(() => l.value?.focus()), (y, $) => (d(), v("div", {
      id: e.panelId,
      class: "dc-panel",
      role: "dialog",
      "aria-label": "Query",
      onKeydown: $[2] || ($[2] = st(Ve((x) => n("close"), ["stop"]), ["esc"]))
    }, [
      C("section", rc, [
        C("div", lc, [
          C("label", {
            class: "dc-panel__field-label",
            for: `${e.panelId}-expr`
          }, "Expression", 8, oc),
          C("div", {
            class: "dc-field",
            onMousedown: $[1] || ($[1] = Ve((x) => l.value?.focus(), ["self", "prevent"]))
          }, [
            (d(!0), v(Z, null, de(o.value, (x, M) => (d(), v("button", {
              key: `${M}:${x}`,
              type: "button",
              class: "dc-part dc-mono",
              title: `Remove ${x}`,
              "aria-label": `Remove ${x}`,
              onClick: (b) => m(M)
            }, R(x), 9, ic))), 128)),
            yt(C("input", {
              id: `${e.panelId}-expr`,
              ref_key: "expressionField",
              ref: l,
              "onUpdate:modelValue": $[0] || ($[0] = (x) => i.value = x),
              class: "dc-expression dc-mono",
              type: "text",
              autocomplete: "off",
              spellcheck: "false",
              placeholder: o.value.length ? "" : P(s).schema.value.placeholder,
              onKeydown: [
                st(Ve(u, ["prevent"]), ["enter"]),
                st(k, ["backspace"])
              ]
            }, null, 40, cc), [
              [Rn, i.value]
            ])
          ], 32)
        ]),
        P(s).entity.value ? (d(!0), v(Z, { key: 0 }, de(P(s).entity.value.facets, (x) => (d(), G(Ir, {
          key: x.key,
          facet: x,
          value: P(s).query.value.facets[x.key],
          onUpdate: (M) => _(x.key, M)
        }, null, 8, ["facet", "value", "onUpdate"]))), 128)) : A("", !0),
        C("div", uc, [
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
          }, " Reset ", 8, dc)
        ])
      ]),
      a["panel-section"] ? (d(), v("section", fc, [
        ye(y.$slots, "panel-section", {}, void 0, !0)
      ])) : A("", !0)
    ], 40, sc));
  }
}), Or = /* @__PURE__ */ re(pc, [["__scopeId", "data-v-640ae2f5"]]), vc = ["checked", "indeterminate"], Fr = /* @__PURE__ */ te({
  __name: "PageTick",
  setup(e) {
    const t = Ee(), n = p(() => t.rows.value.filter((r) => t.isSelected(r)).length), a = p(
      () => t.rows.value.length > 0 && n.value === t.rows.value.length
    ), s = p(() => n.value > 0 && !a.value);
    return (r, o) => (d(), v("input", {
      class: "dc-tick",
      type: "checkbox",
      checked: a.value,
      indeterminate: s.value,
      "aria-label": "Select every row on this page",
      title: "Select every row on this page",
      onChange: o[0] || (o[0] = (i) => P(t).selectPage(!a.value))
    }, null, 40, vc));
  }
}), hc = {
  key: 0,
  class: "dc-actions"
}, mc = {
  key: 0,
  class: "dc-actions__select"
}, gc = {
  key: 0,
  class: "dc-actions__all"
}, yc = {
  class: "dc-actions__count",
  "aria-live": "polite"
}, _c = {
  key: 1,
  class: "dc-actions__count dc-actions__all",
  "aria-live": "polite"
}, wc = { class: "dc-actions__ops" }, kc = ["disabled"], bc = ["data-dc-operation", "disabled", "onClick"], $c = ["disabled"], xc = /* @__PURE__ */ te({
  __name: "RecordActions",
  props: {
    views: {}
  },
  setup(e) {
    const t = e, n = Ee(), a = p(() => n.entity.value), s = p(() => !qa(n.query.value, t.views)), r = p(() => s.value && n.selectable.value), o = p(
      () => Un(n.query.value.view, t.views) === "table"
    ), i = p(
      () => s.value && (r.value || !!(a.value?.create || a.value?.duplicate || a.value?.delete || a.value?.operations?.length))
    ), l = p(() => n.selection.value.ids.length), c = p(() => l.value ? `${l.value} selected` : o.value ? "None selected" : "Select all");
    function u(m) {
      return l.value ? `${m} ${l.value}` : m;
    }
    return (m, k) => i.value ? (d(), v("div", hc, [
      r.value ? (d(), v("div", mc, [
        o.value ? (d(), v("span", _c, R(c.value), 1)) : (d(), v("label", gc, [
          oe(Fr),
          C("span", yc, R(c.value), 1)
        ])),
        l.value ? (d(), v("button", {
          key: 2,
          type: "button",
          class: "dc-actions__clear",
          onClick: k[0] || (k[0] = (g) => P(n).clearSelection())
        }, " Clear ")) : A("", !0)
      ])) : A("", !0),
      C("div", wc, [
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
          Te(" " + R(a.value.create), 1)
        ])) : A("", !0),
        a.value?.duplicate ? (d(), v("button", {
          key: 1,
          type: "button",
          class: "dc-actions__op",
          disabled: !l.value,
          onClick: k[2] || (k[2] = (g) => P(n).duplicate())
        }, R(u(a.value.duplicate)), 9, kc)) : A("", !0),
        (d(!0), v(Z, null, de(a.value?.operations ?? [], (g) => (d(), v("button", {
          key: g.key,
          type: "button",
          class: "dc-actions__op",
          "data-dc-operation": g.key,
          disabled: !l.value,
          onClick: (_) => P(n).operate(g.key)
        }, R(u(g.label)), 9, bc))), 128)),
        a.value?.delete ? (d(), v("button", {
          key: 2,
          type: "button",
          class: "dc-actions__op dc-actions__danger",
          disabled: !l.value,
          onClick: k[3] || (k[3] = (g) => P(n).delete())
        }, R(u(a.value.delete)), 9, $c)) : A("", !0)
      ])
    ])) : A("", !0);
  }
}), Nr = /* @__PURE__ */ re(xc, [["__scopeId", "data-v-8548a5bf"]]), Cc = ["href"], Sc = /* @__PURE__ */ te({
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
    return (r, o) => e.href ? (d(), v("a", {
      key: 0,
      href: e.href,
      class: "dc-press",
      onClick: s
    }, [
      ye(r.$slots, "default", {}, void 0, !0)
    ], 8, Cc)) : (d(), v("button", {
      key: 1,
      type: "button",
      class: "dc-press",
      onClick: s
    }, [
      ye(r.$slots, "default", {}, void 0, !0)
    ]));
  }
}), et = /* @__PURE__ */ re(Sc, [["__scopeId", "data-v-a9383f64"]]);
function Mc(e, t) {
  if (!e) return null;
  const n = je(e, t);
  return typeof n == "string" && n.trim() ? n : null;
}
const Ec = (e) => e == null || typeof e == "string" && !e.trim();
function Pc(e, t) {
  const n = Ze(t, "state"), a = Ze(t, "tint");
  return {
    identity: En(Ze(t, "identity"), e),
    reference: En(Ze(t, "reference"), e),
    metrics: dr(t, "metric").map((s) => ({
      column: s,
      label: s.label ?? "",
      text: Ht(s, e)
    })),
    facts: t.filter((s) => s.cardLabel && !Ec(je(s, e))).map((s) => ({
      column: s,
      label: s.cardLabel,
      title: [s.label, s.hint].filter(Boolean).join(" — "),
      text: Ht(s, e)
    })),
    state: n ? je(n, e) ?? null : null,
    updated: En(Ze(t, "updated"), e),
    image: Mc(Ze(t, "image"), e),
    tint: a ? je(a, e) ?? null : null
  };
}
function Br(e, t, n, a, s = !1) {
  const r = n?.columns ?? [];
  return {
    row: e,
    key: co(e, t),
    entityLabel: e.entityLabel,
    entity: n,
    columns: r,
    ordinal: to(t),
    parts: Pc(e, r),
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
const Ac = ["data-dc-status", "data-dc-tone"], Tc = /* @__PURE__ */ te({
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
    }, R(n.value), 9, Ac));
  }
}), hn = /* @__PURE__ */ re(Tc, [["__scopeId", "data-v-686eb9b6"]]), Lc = { key: 1 }, Rc = /* @__PURE__ */ te({
  __name: "MetricDrill",
  props: {
    entry: {},
    column: {}
  },
  setup(e) {
    const t = e, n = Ee(), a = p(() => !t.entry.entity?.scope || !t.column.drill ? null : n.entities.value.find((c) => c.key === t.column.drill) ?? null), s = p(() => t.column.label ?? ""), r = p(() => Ht(t.column, t.entry.row)), o = p(() => a.value ? n.drillHref(t.entry.row, a.value) : null);
    function i(l, c) {
      c.stopPropagation(), a.value && n.drill(t.entry.row, a.value, l);
    }
    return (l, c) => a.value ? (d(), G(et, {
      key: 0,
      class: "dc-drill",
      href: o.value,
      title: `${s.value} of ${e.entry.parts.identity} — show the ${a.value.label.toLowerCase()}`,
      onPress: i
    }, {
      default: Pe(() => [
        ye(l.$slots, "default", {}, () => [
          Te(R(r.value), 1)
        ], !0)
      ]),
      _: 3
    }, 8, ["href", "title"])) : (d(), v("span", Lc, [
      ye(l.$slots, "default", {}, () => [
        Te(R(r.value), 1)
      ], !0)
    ]));
  }
}), mn = /* @__PURE__ */ re(Rc, [["__scopeId", "data-v-d3e7f4e0"]]), zc = ["data-dc-active", "aria-pressed", "aria-label"], Ic = /* @__PURE__ */ te({
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
    }, R(e.pinned ? "★" : "☆"), 9, zc));
  }
}), Ja = /* @__PURE__ */ re(Ic, [["__scopeId", "data-v-ef63d763"]]), Oc = ["src"], Fc = /* @__PURE__ */ te({
  __name: "RowPicture",
  props: {
    src: {}
  },
  setup(e) {
    const t = e, n = B(!1);
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
    }, null, 40, Oc)) : A("", !0);
  }
}), Jn = /* @__PURE__ */ re(Fc, [["__scopeId", "data-v-afaab300"]]), Nc = ["data-dc-standing", "title", "aria-label"], Bc = /* @__PURE__ */ te({
  __name: "QueryMark",
  props: {
    entry: {}
  },
  setup(e) {
    const t = e, n = Ee(), a = p(() => Xn(t.entry.entity, t.entry.row)), s = p(() => Qa(n.query.value.expr, a.value)), r = p(
      () => s.value === "in" ? `The query narrows to ${t.entry.parts.identity} — press to lift that` : `The query leaves out ${t.entry.parts.identity} — press to lift that`
    );
    function o(i) {
      i.stopPropagation(), n.setExpression(Mr(n.query.value.expr, a.value));
    }
    return (i, l) => s.value ? (d(), v("button", {
      key: 0,
      type: "button",
      class: "dc-standing",
      "data-dc-standing": s.value,
      title: r.value,
      "aria-label": r.value,
      onClick: o
    }, R(s.value === "in" ? "+" : "−"), 9, Nc)) : A("", !0);
  }
}), es = /* @__PURE__ */ re(Bc, [["__scopeId", "data-v-4b8d4166"]]), Dc = ["aria-label"], qc = ["data-dc-standing", "data-dc-active", "aria-checked", "title", "aria-label", "onClick"], Hc = /* @__PURE__ */ te({
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
    function o(i, l) {
      i.stopPropagation(), a("set", l);
    }
    return (i, l) => (d(), v("span", {
      class: "dc-standing-control",
      role: "radiogroup",
      "aria-label": `Where the query stands on ${e.name}`
    }, [
      (d(!0), v(Z, null, de(s.value, (c) => (d(), v("button", {
        key: c.sign,
        type: "button",
        role: "radio",
        class: "dc-standing-control__choice",
        "data-dc-standing": c.standing ?? "none",
        "data-dc-active": r(c.standing) ? "true" : "false",
        "aria-checked": r(c.standing),
        title: c.hint,
        "aria-label": c.hint,
        onClick: (u) => o(u, c.standing)
      }, R(c.sign), 9, qc))), 128))
    ], 8, Dc));
  }
}), Pa = /* @__PURE__ */ re(Hc, [["__scopeId", "data-v-adaa8412"]]), Dr = /* @__PURE__ */ te({
  __name: "RowStanding",
  props: {
    entry: {}
  },
  setup(e) {
    const t = e, n = Ee(), a = p(() => Xn(t.entry.entity, t.entry.row)), s = p(() => Qa(n.query.value.expr, a.value));
    function r(o) {
      n.setExpression(Ma(n.query.value.expr, a.value, o));
    }
    return (o, i) => a.value !== null ? (d(), G(Pa, {
      key: 0,
      class: "dc-row-standing",
      standing: s.value,
      name: e.entry.parts.identity,
      onSet: r
    }, null, 8, ["standing", "name"])) : A("", !0);
  }
}), Vc = ["href", "title", "aria-label"], Kc = /* @__PURE__ */ te({
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
    }, "↗", 8, Vc)) : A("", !0);
  }
}), gn = /* @__PURE__ */ re(Kc, [["__scopeId", "data-v-b00f390d"]]), Wc = /* @__PURE__ */ te({
  __name: "ScopeMark",
  props: {
    entry: {}
  },
  setup(e) {
    const t = e, n = Ee(), a = p(
      () => n.narrowsOnPress.value ? null : t.entry.entity?.scope ?? null
    ), s = B(null);
    function r(u) {
      s.value = Zn(u).exclude ? "out" : "in";
    }
    function o(u) {
      r(u), window.addEventListener("keydown", r), window.addEventListener("keyup", r);
    }
    function i() {
      s.value = null, window.removeEventListener("keydown", r), window.removeEventListener("keyup", r);
    }
    Ke(i);
    const l = p(() => a.value ? n.drillHref(t.entry.row, null) : null);
    function c(u, m) {
      m.stopPropagation(), n.drill(t.entry.row, null, u);
    }
    return (u, m) => a.value ? (d(), G(et, {
      key: 0,
      class: "dc-scope",
      href: l.value,
      "data-dc-pending": s.value ?? void 0,
      title: `Narrow everything to ${a.value}: ${e.entry.row.id} — ⌥-click to leave it out`,
      "aria-label": `Narrow everything to ${e.entry.parts.identity}`,
      onPointerenter: o,
      onPointermove: r,
      onPointerleave: i,
      onPress: c
    }, {
      default: Pe(() => [...m[0] || (m[0] = [
        Te(" → ", -1)
      ])]),
      _: 1
    }, 8, ["href", "data-dc-pending", "title", "aria-label"])) : A("", !0);
  }
}), yn = /* @__PURE__ */ re(Wc, [["__scopeId", "data-v-05d2c233"]]), jc = ["checked", "aria-label"], At = /* @__PURE__ */ te({
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
    }, null, 8, jc));
  }
}), Uc = { class: "dc-card__top dc-mono" }, Gc = { class: "dc-card__lead" }, Qc = {
  key: 2,
  class: "dc-card__entity"
}, Xc = { class: "dc-card__top-right" }, Yc = { class: "dc-card__names" }, Zc = { class: "dc-card__primary" }, Jc = {
  key: 0,
  class: "dc-card__secondary dc-mono"
}, eu = {
  key: 1,
  class: "dc-card__facts dc-mono"
}, tu = ["title"], nu = { class: "dc-card__fact-label" }, au = {
  key: 0,
  class: "dc-card__metrics dc-mono"
}, su = {
  key: 0,
  class: "dc-card__date"
}, ru = /* @__PURE__ */ te({
  __name: "CardsView",
  setup(e) {
    const t = Ee(), n = Pt(), a = p(() => t.isEverything.value), s = (o) => o.entity?.card === "picture", r = p(() => n.value.length > 0 && n.value.every(s));
    return (o, i) => (d(), v("div", {
      class: rt(["dc-cards", { "dc-cards--pictures": r.value }])
    }, [
      (d(!0), v(Z, null, de(P(n), (l) => (d(), v("div", {
        key: l.key,
        class: rt(["dc-card", { "dc-card--picture": s(l) }])
      }, [
        C("div", Uc, [
          C("span", Gc, [
            P(t).selectable.value ? (d(), G(At, {
              key: 0,
              row: l.row,
              selected: l.selected,
              name: l.parts.identity
            }, null, 8, ["row", "selected", "name"])) : A("", !0),
            s(l) ? A("", !0) : (d(), v(Z, { key: 1 }, [
              Te(R(l.ordinal), 1)
            ], 64)),
            a.value ? (d(), v("span", Qc, R(l.entityLabel), 1)) : A("", !0)
          ]),
          C("span", Xc, [
            l.parts.state && !s(l) ? (d(), G(hn, {
              key: 0,
              status: l.parts.state
            }, null, 8, ["status"])) : A("", !0),
            s(l) ? (d(), G(es, {
              key: 1,
              entry: l
            }, null, 8, ["entry"])) : (d(), G(Dr, {
              key: 2,
              entry: l
            }, null, 8, ["entry"])),
            oe(yn, { entry: l }, null, 8, ["entry"]),
            oe(gn, { entry: l }, null, 8, ["entry"]),
            P(t).pinnable.value ? (d(), G(Ja, {
              key: 3,
              row: l.row,
              name: l.parts.identity,
              pinned: l.pinned
            }, null, 8, ["row", "name", "pinned"])) : A("", !0)
          ])
        ]),
        oe(et, {
          class: "dc-card__open",
          href: P(t).pressHref(l.row),
          onPress: (c) => P(t).activate(l.row, c)
        }, {
          default: Pe(() => [
            l.parts.image ? (d(), G(Jn, {
              key: 0,
              class: "dc-card__image",
              src: l.parts.image
            }, null, 8, ["src"])) : A("", !0),
            C("span", Yc, [
              C("span", Zc, R(l.parts.identity), 1),
              s(l) ? A("", !0) : (d(), v("span", Jc, R(l.parts.reference), 1)),
              l.parts.facts.length ? (d(), v("span", eu, [
                (d(!0), v(Z, null, de(l.parts.facts, (c) => (d(), v("span", {
                  key: c.column.key ?? c.label,
                  class: "dc-card__fact",
                  title: c.title || void 0
                }, [
                  C("span", nu, R(c.label), 1),
                  Te(" " + R(c.text), 1)
                ], 8, tu))), 128))
              ])) : A("", !0)
            ])
          ]),
          _: 2
        }, 1032, ["href", "onPress"]),
        s(l) ? A("", !0) : (d(), v("div", au, [
          (d(!0), v(Z, null, de(l.parts.metrics.slice(0, 2), (c) => (d(), G(mn, {
            key: c.column.key ?? c.label,
            entry: l,
            column: c.column
          }, {
            default: Pe(() => [
              Te(R(c.label) + " " + R(c.text), 1)
            ]),
            _: 2
          }, 1032, ["entry", "column"]))), 128)),
          l.parts.updated ? (d(), v("span", su, R(l.parts.updated), 1)) : A("", !0)
        ]))
      ], 2))), 128))
    ], 2));
  }
}), qr = /* @__PURE__ */ re(ru, [["__scopeId", "data-v-e9bd4d6c"]]), lu = { class: "dc-grid" }, ou = { class: "dc-tile__scrim" }, iu = { class: "dc-tile__top dc-mono" }, cu = { class: "dc-tile__chip" }, uu = { class: "dc-tile__caption" }, du = { class: "dc-tile__secondary dc-truncate" }, fu = { class: "dc-tile__primary" }, pu = /* @__PURE__ */ te({
  __name: "GridView",
  setup(e) {
    const t = Ee(), n = Pt();
    return (a, s) => (d(), v("div", lu, [
      (d(!0), v(Z, null, de(P(n), (r) => (d(), v("div", {
        key: r.key,
        class: "dc-grid__cell"
      }, [
        oe(et, {
          class: "dc-tile",
          style: Se({ "--dc-tile-tint": r.parts.tint ?? void 0 }),
          href: P(t).pressHref(r.row),
          onPress: (o) => P(t).activate(r.row, o)
        }, {
          default: Pe(() => [
            r.parts.image ? (d(), G(Jn, {
              key: 0,
              class: "dc-tile__image",
              src: r.parts.image
            }, null, 8, ["src"])) : A("", !0),
            C("span", ou, [
              C("span", iu, [
                C("span", cu, R(r.ordinal), 1)
              ]),
              C("span", uu, [
                C("span", du, R(r.parts.reference), 1),
                C("span", fu, R(r.parts.identity), 1)
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
}), Hr = /* @__PURE__ */ re(pu, [["__scopeId", "data-v-12dd4d94"]]);
function Ds(e, t, n, a) {
  return (n - a * (t - 1)) / e;
}
function fa(e, t) {
  return e > 0 ? Math.min(t, e) : t;
}
function vu(e) {
  return e > 0 ? e : 1 / 0;
}
function hu(e, t, n) {
  const { width: a, height: s, gap: r = 0 } = n;
  if (!e.length) return [];
  if (!(a > 0) || !(s > 0)) return [{ items: [...e], height: s, filled: !1 }];
  const o = [];
  let i = [], l = 0, c = 0;
  for (const u of e) {
    const m = t(u), k = Math.max(m.ratio, Number.EPSILON), g = m.height && m.height > 0 ? Math.max(c, m.height) : c, _ = fa(g, s), y = Ds(l + k, i.length + 1, a, r);
    if (y > _) {
      i.push(u), l += k, c = g;
      continue;
    }
    const $ = fa(c, s), x = i.length ? Ds(l, i.length, a, r) : 1 / 0;
    x <= vu(c) && x - $ < _ - y ? (o.push({ items: i, height: x, filled: !0 }), i = [u], l = k, c = m.height && m.height > 0 ? m.height : 0) : (o.push({ items: [...i, u], height: y, filled: !0 }), i = [], l = 0, c = 0);
  }
  return i.length && o.push({ items: i, height: fa(c, s), filled: !1 }), o;
}
const mu = { class: "dc-images" }, gu = {
  key: 1,
  class: "dc-images__blank",
  "aria-hidden": "true"
}, yu = 240, xn = 8, _u = 1, wu = /* @__PURE__ */ te({
  __name: "ImagesView",
  setup(e) {
    const t = Ee(), n = Pt(), a = xs(/* @__PURE__ */ new Map()), s = xs(/* @__PURE__ */ new Set());
    function r(_, y) {
      const $ = y.target;
      $.naturalWidth > 0 && $.naturalHeight > 0 && a.set(_, { width: $.naturalWidth, height: $.naturalHeight });
    }
    function o(_) {
      const y = _.parts.image;
      return y && !s.has(y) ? y : null;
    }
    function i(_) {
      const y = o(_);
      return y ? a.get(y) : void 0;
    }
    function l(_) {
      const y = i(_);
      return y ? { ratio: y.width / y.height, height: y.height } : { ratio: _u };
    }
    const c = B(null), u = B(0);
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
      const _ = hu(n.value, l, {
        width: u.value,
        height: yu,
        gap: xn
      }), y = [];
      let $ = 0;
      for (const x of _) {
        let M = 0;
        for (const b of x.items) {
          const S = l(b).ratio * x.height, T = i(b), N = T !== void 0 && T.height < x.height;
          y.push({
            entry: b,
            style: {
              top: `${$}px`,
              left: `${M}px`,
              width: `${S}px`,
              height: `${x.height}px`
            },
            picture: N ? { width: `${T.width}px`, height: `${T.height}px` } : { width: "100%", height: "100%" }
          }), M += S + xn;
        }
        $ += x.height + xn;
      }
      return { boxes: y, height: _.length ? $ - xn : 0 };
    });
    return (_, y) => (d(), v("div", mu, [
      C("div", {
        ref_key: "wall",
        ref: c,
        class: "dc-images__wall",
        style: Se({ height: `${g.value.height}px` })
      }, [
        (d(!0), v(Z, null, de(g.value.boxes, ({ entry: $, style: x, picture: M }) => (d(), v("div", {
          key: $.key,
          class: "dc-images__cell",
          style: Se(x)
        }, [
          oe(et, {
            class: "dc-images__open",
            title: $.parts.identity,
            "aria-label": $.parts.identity,
            href: P(t).pressHref($.row),
            onPress: (b) => P(t).activate($.row, b)
          }, {
            default: Pe(() => [
              o($) ? (d(), G(Jn, {
                key: 0,
                class: "dc-images__picture",
                style: Se(M),
                src: o($),
                onLoad: (b) => r(o($), b),
                onError: (b) => s.add(o($))
              }, null, 8, ["style", "src", "onLoad", "onError"])) : (d(), v("span", gu, R($.parts.identity), 1))
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
}), Vr = /* @__PURE__ */ re(wu, [["__scopeId", "data-v-d77205b8"]]), ku = { class: "dc-links" }, bu = { class: "dc-link__primary dc-truncate" }, $u = { class: "dc-link__secondary dc-mono dc-truncate" }, xu = /* @__PURE__ */ te({
  __name: "LinksView",
  setup(e) {
    const t = Ee(), n = Pt();
    return (a, s) => (d(), v("div", ku, [
      (d(!0), v(Z, null, de(P(n), (r) => (d(), v("span", {
        key: r.key,
        class: "dc-links__item"
      }, [
        P(t).selectable.value ? (d(), G(At, {
          key: 0,
          row: r.row,
          selected: r.selected,
          name: r.parts.identity
        }, null, 8, ["row", "selected", "name"])) : A("", !0),
        oe(et, {
          class: "dc-link",
          href: P(t).pressHref(r.row),
          onPress: (o) => P(t).activate(r.row, o)
        }, {
          default: Pe(() => [
            C("span", bu, R(r.parts.identity), 1),
            C("span", $u, R(r.parts.reference), 1)
          ]),
          _: 2
        }, 1032, ["href", "onPress"])
      ]))), 128))
    ]));
  }
}), Kr = /* @__PURE__ */ re(xu, [["__scopeId", "data-v-f47b75cf"]]), Cu = {
  class: "dc-list",
  role: "list"
}, Su = { class: "dc-list__ordinal dc-mono" }, Mu = { class: "dc-list__identity" }, Eu = { class: "dc-list__primary dc-truncate" }, Pu = { class: "dc-list__secondary dc-mono dc-truncate" }, Au = {
  key: 1,
  class: "dc-list__entity dc-mono"
}, Tu = { class: "dc-list__metrics dc-mono" }, Lu = { class: "dc-list__trailing" }, Ru = /* @__PURE__ */ te({
  __name: "ListView",
  setup(e) {
    const t = Ee(), n = Pt(), a = p(() => t.isEverything.value);
    return (s, r) => (d(), v("div", Cu, [
      (d(!0), v(Z, null, de(P(n), (o) => (d(), v("div", {
        key: o.key,
        class: "dc-list__row",
        role: "listitem"
      }, [
        P(t).selectable.value ? (d(), G(At, {
          key: 0,
          class: "dc-list__tick",
          row: o.row,
          selected: o.selected,
          name: o.parts.identity
        }, null, 8, ["row", "selected", "name"])) : A("", !0),
        oe(Dr, {
          class: "dc-list__standing",
          entry: o
        }, null, 8, ["entry"]),
        oe(et, {
          class: "dc-list__open",
          href: P(t).pressHref(o.row),
          onPress: (i) => P(t).activate(o.row, i)
        }, {
          default: Pe(() => [
            C("span", Su, R(o.ordinal), 1),
            C("span", Mu, [
              C("span", Eu, R(o.parts.identity), 1),
              C("span", Pu, R(o.parts.reference), 1)
            ])
          ]),
          _: 2
        }, 1032, ["href", "onPress"]),
        a.value ? (d(), v("span", Au, R(o.entityLabel), 1)) : A("", !0),
        C("span", Tu, [
          (d(!0), v(Z, null, de(o.parts.metrics.slice(0, 2), (i) => (d(), G(mn, {
            key: i.column.key ?? i.label,
            entry: o,
            column: i.column
          }, null, 8, ["entry", "column"]))), 128))
        ]),
        C("span", Lu, [
          o.parts.state ? (d(), G(hn, {
            key: 0,
            status: o.parts.state
          }, null, 8, ["status"])) : A("", !0),
          oe(yn, { entry: o }, null, 8, ["entry"]),
          oe(gn, { entry: o }, null, 8, ["entry"]),
          P(t).pinnable.value ? (d(), G(Ja, {
            key: 1,
            row: o.row,
            name: o.parts.identity,
            pinned: o.pinned
          }, null, 8, ["row", "name", "pinned"])) : A("", !0)
        ])
      ]))), 128))
    ]));
  }
}), Aa = /* @__PURE__ */ re(Ru, [["__scopeId", "data-v-21065d56"]]), zu = { class: "dc-preview" }, Iu = { class: "dc-preview__pager dc-mono" }, Ou = ["disabled"], Fu = { "aria-live": "polite" }, Nu = ["disabled"], Bu = {
  key: 0,
  class: "dc-preview__card"
}, Du = ["src"], qu = { class: "dc-preview__body" }, Hu = { class: "dc-preview__top" }, Vu = { class: "dc-preview__badges" }, Ku = { class: "dc-preview__entity dc-mono" }, Wu = { class: "dc-preview__marks" }, ju = { class: "dc-preview__primary" }, Uu = { class: "dc-preview__secondary dc-mono" }, Gu = { class: "dc-preview__fields" }, Qu = { class: "dc-preview__key" }, Xu = { class: "dc-preview__value dc-mono" }, Yu = /* @__PURE__ */ te({
  __name: "PreviewView",
  setup(e) {
    const t = Ee(), n = Pt(), a = B(0);
    be(n, (l) => {
      a.value > l.length - 1 && (a.value = Math.max(0, l.length - 1));
    });
    const s = p(() => n.value[a.value]), r = p(() => {
      const l = s.value;
      if (!l) return [];
      const c = Ze(l.columns, "reference"), u = Ze(l.columns, "updated");
      return [
        ...c ? [{ key: c.label ?? "Reference", value: l.parts.reference, column: null }] : [],
        ...l.parts.metrics.map((m) => ({
          key: m.label,
          value: m.text,
          column: m.column
        })),
        ...u ? [{ key: u.label ?? "Updated", value: l.parts.updated, column: null }] : []
      ];
    }), o = p(() => {
      if (!n.value.length) return "0 / 0";
      const l = t.total.value > n.value.length ? ` of ${t.total.value}` : "";
      return `${a.value + 1} / ${n.value.length}${l}`;
    }), i = (l) => {
      const c = n.value.length;
      c && (a.value = Math.min(c - 1, Math.max(0, a.value + l)));
    };
    return (l, c) => (d(), v("div", zu, [
      C("div", Iu, [
        C("button", {
          type: "button",
          class: "dc-preview__step",
          "aria-label": "Previous result",
          disabled: a.value === 0,
          onClick: c[0] || (c[0] = (u) => i(-1))
        }, " ‹ ", 8, Ou),
        C("span", Fu, R(o.value), 1),
        C("button", {
          type: "button",
          class: "dc-preview__step",
          "aria-label": "Next result",
          disabled: a.value >= P(n).length - 1,
          onClick: c[1] || (c[1] = (u) => i(1))
        }, " › ", 8, Nu)
      ]),
      s.value ? (d(), v("div", Bu, [
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
          }, null, 8, Du)) : (d(), v(Z, { key: 1 }, [
            Te(" preview ")
          ], 64))
        ], 4),
        C("div", qu, [
          C("div", Hu, [
            C("span", Vu, [
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
              C("span", Ku, R(s.value.entityLabel), 1)
            ]),
            C("span", Wu, [
              oe(es, { entry: s.value }, null, 8, ["entry"]),
              oe(yn, { entry: s.value }, null, 8, ["entry"]),
              oe(gn, { entry: s.value }, null, 8, ["entry"]),
              P(t).pinnable.value ? (d(), G(Ja, {
                key: 0,
                row: s.value.row,
                name: s.value.parts.identity,
                pinned: s.value.pinned
              }, null, 8, ["row", "name", "pinned"])) : A("", !0)
            ])
          ]),
          C("div", null, [
            C("div", ju, R(s.value.parts.identity), 1),
            C("div", Uu, R(s.value.parts.reference), 1)
          ]),
          C("dl", Gu, [
            (d(!0), v(Z, null, de(r.value, (u) => (d(), v("div", {
              key: u.key,
              class: "dc-preview__field"
            }, [
              C("dt", Qu, R(u.key), 1),
              C("dd", Xu, [
                u.column && s.value ? (d(), G(mn, {
                  key: 0,
                  entry: s.value,
                  column: u.column
                }, null, 8, ["entry", "column"])) : (d(), v(Z, { key: 1 }, [
                  Te(R(u.value), 1)
                ], 64))
              ])
            ]))), 128))
          ]),
          oe(et, {
            class: "dc-preview__open",
            href: s.value ? P(t).pressHref(s.value.row) : null,
            onPress: c[2] || (c[2] = (u) => s.value && P(t).activate(s.value.row, u))
          }, {
            default: Pe(() => [...c[3] || (c[3] = [
              Te(" Open record → ", -1)
            ])]),
            _: 1
          }, 8, ["href"])
        ])
      ])) : A("", !0)
    ]));
  }
}), Wr = /* @__PURE__ */ re(Yu, [["__scopeId", "data-v-59e0d33b"]]);
function Zu() {
  const e = Ee();
  return p(() => oo(e.schema.value, e.entity.value));
}
const Ju = {
  key: 5,
  class: "dc-cell__text"
}, ed = /* @__PURE__ */ te({
  __name: "ColumnCell",
  props: {
    column: {},
    entry: {}
  },
  setup(e) {
    const t = e, n = Ee(), a = p(() => t.column.kind ?? "text"), s = p(() => je(t.column, t.entry.row)), r = p(
      () => a.value === "ordinal" ? t.entry.ordinal : Ht(t.column, t.entry.row)
    ), o = p(() => s.value), i = p(() => t.column.activate === !0 || !!t.column.click), l = p(() => $a(t.column)), c = p(() => fr(t.column, t.entry.row));
    function u(g) {
      i.value && (g.stopPropagation(), m(Zn(g)));
    }
    function m(g) {
      t.column.click?.(t.entry.row, g), t.column.activate && n.activate(t.entry.row, g);
    }
    const k = p(
      () => t.column.activate && !t.column.click ? n.pressHref(t.entry.row) : null
    );
    return (g, _) => a.value === "component" && e.column.component ? (d(), G(jn(e.column.component), {
      key: 0,
      row: e.entry.row,
      entry: e.entry,
      value: s.value,
      column: e.column
    }, null, 8, ["row", "entry", "value", "column"])) : a.value === "status" ? (d(), G(hn, {
      key: 1,
      status: o.value
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
    }, null, 8, ["entry", "column"])) : i.value ? (d(), G(et, {
      key: 4,
      class: rt(["dc-table__open", { "dc-truncate": l.value }]),
      href: k.value,
      title: c.value,
      onPress: _[0] || (_[0] = (y, $) => {
        $.stopPropagation(), m(y);
      })
    }, {
      default: Pe(() => [
        Te(R(r.value), 1)
      ]),
      _: 1
    }, 8, ["class", "href", "title"])) : (d(), v("span", Ju, R(r.value), 1));
  }
}), qs = /* @__PURE__ */ re(ed, [["__scopeId", "data-v-af24c370"]]), td = {
  key: 0,
  class: "dc-table__none"
}, nd = { class: "dc-table__detail" }, ad = ["data-dc-wrap"], sd = {
  key: 0,
  class: "dc-table__pick",
  scope: "col"
}, rd = {
  key: 1,
  class: "dc-table__standing",
  scope: "col"
}, ld = ["data-dc-align", "data-dc-hide", "aria-sort", "title"], od = ["onClick"], id = {
  key: 2,
  class: "dc-table__head"
}, cd = ["onClick"], ud = {
  key: 0,
  class: "dc-table__pick"
}, dd = {
  key: 1,
  class: "dc-table__standing"
}, fd = ["data-dc-align", "data-dc-hide", "title"], pd = {
  key: 0,
  class: "dc-table__name"
}, vd = /* @__PURE__ */ te({
  __name: "TableView",
  setup(e) {
    const t = Ee(), n = Pt(), a = Zu();
    function s(E, H) {
      const q = t.pressHref(E);
      if (q && Er(H)) {
        const Q = H.shiftKey ? `noopener,popup,width=${window.outerWidth},height=${window.outerHeight}` : "noopener";
        window.open(q, "_blank", Q);
        return;
      }
      t.activate(E, Zn(H));
    }
    function r(E) {
      const H = yo(E, t.entity.value), q = H ? `Shortcut: ${H}` : void 0;
      return [E.hint, q].filter(Boolean).join(`
`) || void 0;
    }
    const o = p(() => {
      const E = a.value.find((q) => q.scope);
      return E || ((t.entity.value ? !!t.entity.value.href : t.entities.value.some((q) => q.href)) ? a.value.find((q) => q.activate) : void 0);
    }), i = p(
      () => t.entity.value ? !!t.entity.value.scope : t.entities.value.some((E) => E.scope)
    ), l = (E) => Xn(E.entity, E.row), c = (E) => Qa(t.query.value.expr, l(E));
    function u(E, H) {
      t.setExpression(Ma(t.query.value.expr, l(E), H));
    }
    const m = p(() => {
      const E = n.value.filter((q) => l(q) !== null), H = E.filter((q) => q.selected);
      return H.length ? H : E;
    }), k = p(() => m.value.some((E) => E.selected)), g = p(() => {
      const E = m.value[0];
      return E ? c(E) : null;
    }), _ = p(
      () => m.value.some((E) => c(E) !== g.value)
    ), y = p(
      () => k.value ? "the ticked rows" : "every row on this page"
    );
    function $(E) {
      t.setExpression(
        m.value.reduce(
          (H, q) => Ma(H, l(q), E),
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
    const b = p(() => t.entity.value?.label ?? "The result set"), S = p(() => new Set(t.sorts.value.map((E) => E.key))), T = (E) => E.sort !== void 0 && S.value.has(E.sort), N = (E) => {
      if (T(E))
        return t.query.value.sort !== E.sort ? "none" : t.query.value.dir === "desc" ? "descending" : "ascending";
    };
    function L(E) {
      return [
        Es(E),
        E.muted ? "dc-table__muted" : "",
        E.mono ? "dc-mono" : "",
        $a(E) ? "dc-truncate" : ""
      ].filter(Boolean).join(" ");
    }
    function z(E, H) {
      if (!(!$a(E) || E.activate || E.click))
        return fr(E, H.row);
    }
    return (E, H) => P(a).length ? (d(), v("table", {
      key: 1,
      class: "dc-table",
      "data-dc-wrap": x.value ? "" : void 0
    }, [
      C("thead", null, [
        C("tr", null, [
          P(t).selectable.value ? (d(), v("th", sd, [
            oe(Fr)
          ])) : A("", !0),
          i.value ? (d(), v("th", rd, [
            m.value.length ? (d(), G(Pa, {
              key: 0,
              standing: g.value,
              mixed: _.value,
              name: y.value,
              onSet: $
            }, null, 8, ["standing", "mixed", "name"])) : A("", !0)
          ])) : A("", !0),
          (d(!0), v(Z, null, de(P(a), (q, Q) => (d(), v("th", {
            key: P(Ss)(q, Q),
            scope: "col",
            class: rt(P(Es)(q)),
            style: Se({ width: q.width }),
            "data-dc-align": P(Ms)(q),
            "data-dc-hide": q.hideBelow,
            "aria-sort": N(q),
            title: r(q)
          }, [
            T(q) ? (d(), v("button", {
              key: 0,
              type: "button",
              class: "dc-table__sort",
              onClick: (ve) => M(q.sort)
            }, R(q.label), 9, od)) : (d(), v(Z, { key: 1 }, [
              Te(R(q.label), 1)
            ], 64)),
            q.header ? (d(), v("span", id, [
              (d(), G(jn(q.header), {
                column: q,
                entity: P(t).entity.value
              }, null, 8, ["column", "entity"]))
            ])) : A("", !0)
          ], 14, ld))), 128))
        ])
      ]),
      C("tbody", null, [
        (d(!0), v(Z, null, de(P(n), (q) => (d(), v("tr", {
          key: q.key,
          class: "dc-table__row",
          onClick: (Q) => s(q.row, Q)
        }, [
          P(t).selectable.value ? (d(), v("td", ud, [
            oe(At, {
              row: q.row,
              selected: q.selected,
              name: q.parts.identity
            }, null, 8, ["row", "selected", "name"])
          ])) : A("", !0),
          i.value ? (d(), v("td", dd, [
            l(q) !== null ? (d(), G(Pa, {
              key: 0,
              standing: c(q),
              name: q.parts.identity,
              onSet: (Q) => u(q, Q)
            }, null, 8, ["standing", "name", "onSet"])) : A("", !0)
          ])) : A("", !0),
          (d(!0), v(Z, null, de(P(a), (Q, ve) => (d(), v("td", {
            key: P(Ss)(Q, ve),
            class: rt(L(Q)),
            "data-dc-align": P(Ms)(Q),
            "data-dc-hide": Q.hideBelow,
            title: z(Q, q)
          }, [
            Q === o.value ? (d(), v("span", pd, [
              oe(qs, {
                column: Q,
                entry: q
              }, null, 8, ["column", "entry"]),
              oe(yn, { entry: q }, null, 8, ["entry"]),
              oe(gn, { entry: q }, null, 8, ["entry"])
            ])) : (d(), G(qs, {
              key: 1,
              column: Q,
              entry: q
            }, null, 8, ["column", "entry"]))
          ], 10, fd))), 128))
        ], 8, cd))), 128))
      ])
    ], 8, ad)) : (d(), v("p", td, [
      H[2] || (H[2] = C("span", { class: "dc-table__headline" }, "No columns declared", -1)),
      C("span", nd, [
        Te(R(b.value) + " has no ", 1),
        H[0] || (H[0] = C("code", null, "columns", -1)),
        H[1] || (H[1] = Te(" in the schema, so there is no table to draw. ", -1))
      ])
    ]));
  }
}), jr = /* @__PURE__ */ re(vd, [["__scopeId", "data-v-3c4caecf"]]);
function hd(e) {
  const t = dt([]), n = B(!1), a = dt(null);
  let s = 0;
  const r = (l, c, u, m, k) => ({
    entity: l,
    rows: e.limit.value > 0 ? c.rows.map((g, _) => Br(g, _, l, e.isPinned(g.id))) : [],
    total: c.total,
    count: u ? l.count : String(c.total),
    pinned: md(m, c, k)
  }), o = () => {
    const l = ++s, c = e.query.value, u = e.schema.value, m = e.entities.value, k = e.limit.value, g = e.within?.value.trim() ?? "", _ = Da(c) && !g, y = g ? Ka(g, c.expr) : c.expr, $ = m.map((x) => ({
      entity: x,
      // Scope the query to this entity, keeping the expression and ordering
      // but dropping facets, which belong to whichever entity is selected.
      outcome: e.source.value.query({
        // Each card is the top few of its type, wherever the shell's own
        // result set has been paged to — so this asks for the first page.
        query: { ...c, entity: x.key, expr: y, facets: qt(x), page: 1 },
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
        ({ entity: x, outcome: M }) => r(x, M, _, u, y)
      ), a.value = null, n.value = !1;
      return;
    }
    n.value = !0, Promise.all($.map(({ outcome: x }) => Promise.resolve(x))).then((x) => {
      l === s && (t.value = x.map(
        (M, b) => r($[b].entity, M, _, u, y)
      ), a.value = null);
    }).catch((x) => {
      l === s && (a.value = x, t.value = []);
    }).finally(() => {
      l === s && (n.value = !1);
    });
  }, i = () => {
    try {
      o();
    } catch (l) {
      a.value = l, t.value = [], n.value = !1;
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
function md(e, t, n) {
  const a = t.rows[0];
  if (t.total !== 1 || t.rows.length !== 1 || !a)
    return !1;
  const s = n.trim();
  if (!s)
    return !1;
  const r = Bn(e, a);
  return !!r && vn(s, r) === s;
}
const gd = ["data-dc-pending", "data-dc-heads-only"], yd = {
  key: 0,
  class: "dc-types__state",
  role: "alert"
}, _d = {
  key: 1,
  class: "dc-types__state",
  "aria-live": "polite"
}, wd = {
  key: 2,
  class: "dc-types__state"
}, kd = ["data-dc-empty"], bd = { class: "dc-type__name" }, $d = { class: "dc-type__count dc-mono" }, xd = { class: "dc-type__sr" }, Cd = {
  key: 0,
  class: "dc-type__description"
}, Sd = {
  key: 0,
  class: "dc-type__empty"
}, Md = { class: "dc-type__identity" }, Ed = { class: "dc-type__primary dc-truncate" }, Pd = { class: "dc-type__secondary dc-mono dc-truncate" }, Ad = { class: "dc-type__trailing dc-mono" }, Td = { class: "dc-type__metric-value" }, Ld = { class: "dc-type__metric-label" }, Rd = {
  key: 0,
  class: "dc-type__date"
}, zd = ["onClick"], Id = /* @__PURE__ */ te({
  __name: "TypeCardsView",
  setup(e) {
    const t = Ee(), { previews: n, pending: a, error: s } = hd({
      source: t.source,
      schema: t.schema,
      // The query as the results are read under it, so a word being typed in the
      // header narrows the cards as it narrows any list — see `liveQuery`.
      query: t.liveQuery,
      entities: t.entities,
      limit: t.previewsPerType,
      within: t.within,
      isPinned: (l) => t.isPinnedId(l)
    }), r = p(
      () => !t.isPristine.value || !!t.within.value || t.drafting.value
    ), o = p(() => t.previewsPerType.value <= 0), i = p(
      () => n.value.filter(
        (l) => !l.pinned && (l.total > 0 || !o.value && l.entity.create)
      )
    );
    return (l, c) => (d(), v("div", {
      class: "dc-types",
      "data-dc-pending": P(a) ? "true" : "false",
      "data-dc-heads-only": o.value ? "true" : "false"
    }, [
      ye(l.$slots, "before", {}, void 0, !0),
      P(s) ? (d(), v("p", yd, " Could not load results: " + R(P(s) instanceof Error ? P(s).message : "the data source failed."), 1)) : !i.value.length && P(a) ? (d(), v("p", _d, " Running query… ")) : i.value.length ? A("", !0) : (d(), v("p", wd, R(r.value ? "Nothing matches this query" : "Nothing here yet"), 1)),
      (d(!0), v(Z, null, de(i.value, (u) => (d(), v("section", {
        key: u.entity.key,
        class: "dc-type",
        "data-dc-empty": u.total ? "false" : "true"
      }, [
        oe(et, {
          class: "dc-type__head",
          href: P(t).entityHref(u.entity.key),
          onPress: (m) => P(t).setEntity(u.entity.key)
        }, {
          default: Pe(() => [
            C("span", bd, R(u.entity.label), 1),
            C("span", $d, R(u.count), 1),
            c[0] || (c[0] = C("span", {
              class: "dc-type__go",
              "aria-hidden": "true"
            }, "→", -1)),
            C("span", xd, "Show only " + R(u.entity.label.toLowerCase()), 1),
            u.entity.description ? (d(), v("span", Cd, R(u.entity.description), 1)) : A("", !0)
          ]),
          _: 2
        }, 1032, ["href", "onPress"]),
        u.total ? A("", !0) : (d(), v("p", Sd, R(r.value ? "No matches" : "Nothing here yet"), 1)),
        (d(!0), v(Z, null, de(u.rows, (m) => (d(), v("div", {
          key: m.key,
          class: "dc-type__row"
        }, [
          oe(et, {
            class: "dc-type__open",
            href: P(t).pressHref(m.row),
            onPress: (k) => P(t).activate(m.row, k)
          }, {
            default: Pe(() => [
              C("span", Md, [
                C("span", Ed, R(m.parts.identity), 1),
                C("span", Pd, R(m.parts.reference), 1)
              ])
            ]),
            _: 2
          }, 1032, ["href", "onPress"]),
          C("span", Ad, [
            (d(!0), v(Z, null, de(m.parts.metrics.slice(0, 1), (k) => (d(), G(mn, {
              key: k.column.key ?? k.label,
              class: "dc-type__metric",
              entry: m,
              column: k.column
            }, {
              default: Pe(() => [
                C("span", Td, R(k.text), 1),
                C("span", Ld, R(k.label), 1)
              ]),
              _: 2
            }, 1032, ["entry", "column"]))), 128)),
            m.parts.updated ? (d(), v("span", Rd, R(m.parts.updated), 1)) : A("", !0),
            oe(es, { entry: m }, null, 8, ["entry"]),
            oe(yn, { entry: m }, null, 8, ["entry"]),
            oe(gn, { entry: m }, null, 8, ["entry"])
          ])
        ]))), 128)),
        u.entity.create && !o.value ? (d(), v("button", {
          key: 1,
          type: "button",
          class: "dc-type__new",
          onClick: (m) => P(t).create(u.entity)
        }, [
          c[1] || (c[1] = C("span", {
            class: "dc-type__plus",
            "aria-hidden": "true"
          }, "+", -1)),
          Te(" " + R(u.entity.create), 1)
        ], 8, zd)) : A("", !0)
      ], 8, kd))), 128)),
      ye(l.$slots, "after", {}, void 0, !0)
    ], 8, gd));
  }
}), Ur = /* @__PURE__ */ re(Id, [["__scopeId", "data-v-91923a83"]]), Od = ["data-dc-pending"], Fd = {
  key: 0,
  class: "dc-results__state dc-results__state--loading",
  "aria-live": "polite"
}, Nd = {
  key: 2,
  class: "dc-results__state",
  role: "alert"
}, Bd = { class: "dc-results__detail" }, Dd = {
  key: 3,
  class: "dc-results__state",
  "aria-live": "polite"
}, qd = {
  key: 4,
  class: "dc-results__state"
}, Hd = { class: "dc-results__detail" }, Vd = /* @__PURE__ */ te({
  __name: "ResultsArea",
  props: {
    views: {},
    loading: { type: Boolean }
  },
  setup(e) {
    const t = e, n = Ee(), a = Wt(), s = {
      list: Aa,
      cards: qr,
      grid: Hr,
      images: Vr,
      table: jr,
      links: Kr,
      preview: Wr
    }, r = p(() => qa(n.query.value, t.views)), o = p(() => Un(n.query.value.view, t.views)), i = p(() => s[o.value] ?? Aa), l = p(() => n.rows.value.length > 0), c = p(() => n.error.value !== null), u = B(null);
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
      e.loading ? (d(), v("p", Fd, [...k[1] || (k[1] = [
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
      ]), 1024)) : c.value ? (d(), v("p", Nd, [
        k[2] || (k[2] = C("span", { class: "dc-results__headline" }, "Could not load results", -1)),
        C("span", Bd, R(P(n).error.value instanceof Error ? P(n).error.value.message : "The data source failed."), 1)
      ])) : !l.value && P(n).pending.value ? (d(), v("p", Dd, [...k[3] || (k[3] = [
        C("span", { class: "dc-results__detail" }, "Running query…", -1)
      ])])) : l.value ? (d(), G(jn(i.value), { key: 5 })) : (d(), v("div", qd, [
        k[4] || (k[4] = C("span", { class: "dc-results__headline" }, "Nothing matches this query", -1)),
        C("span", Hd, R(P(n).summary.value), 1),
        P(n).isPristine.value ? A("", !0) : (d(), v("button", {
          key: 0,
          type: "button",
          class: "dc-results__clear",
          onClick: k[0] || (k[0] = (g) => P(n).clearFilters())
        }, R(P(n).isEverything.value ? "Clear filters" : "Search everything instead"), 1))
      ]))
    ], 8, Od));
  }
}), Gr = /* @__PURE__ */ re(Vd, [["__scopeId", "data-v-eef33cd7"]]), Kd = ["data-dc-theme"], Wd = ["data-dc-width", "data-dc-align"], jd = { class: "dc-shell__panel" }, Ud = {
  key: 0,
  class: "dc-shell__page"
}, Gd = /* @__PURE__ */ te({
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
    const a = e, s = n, r = Zt(e, "open"), o = Zt(e, "pinned"), i = Zt(e, "selected"), l = Wt(), c = St(nr, null), u = a.route || c ? null : jl(), m = a.route ?? c ?? u;
    Ke(() => u?.dispose?.());
    const k = B(!!l.page);
    Fl(() => {
      k.value = !!l.page;
    });
    const g = Ul(m, {
      detached: () => k.value && a.pageQuery === "detached",
      path: () => a.listPath
    }), _ = p(() => Bo({ seed: a.schema.key })), y = p(() => a.source ?? _.value), $ = Jo({
      schema: () => a.schema,
      adapter: g,
      defaults: () => a.defaults,
      navigationMode: () => a.navigationMode,
      facetNavigationMode: () => a.facetNavigationMode
    }), x = p(() => a.within?.trim() ?? ""), M = ni({
      query: $.query,
      entity: $.entity,
      setExpression: $.setExpression
    }), b = ei({
      source: y,
      query: M.live,
      schema: p(() => a.schema),
      entity: $.entity,
      limit: p(() => a.limit),
      within: x
    });
    be($.query, (O) => s("query-change", O));
    const S = p(() => jo(a.schema, [$.query.value.expr])), T = p(
      () => S.value.flatMap((O) => {
        const ae = a.schema.entities.find((pe) => pe.key === O.entityKey);
        return ae ? [{ ...O, entity: ae }] : [];
      })
    );
    function N() {
      if (l.record) return T.value;
      const O = a.recordCards;
      return O ? T.value.filter((ae) => O[ae.entityKey]) : [];
    }
    const L = p(() => {
      const O = a.views;
      return typeof O != "function" ? O : O({ entity: $.entity.value, records: S.value });
    });
    be(
      [b.pageCount, b.pending, $.query, M.drafting, () => a.loading, k],
      () => {
        if (b.pending.value || M.drafting.value || a.loading || k.value) return;
        const O = b.pageCount.value;
        $.query.value.page > O && $.setPage(O, "replace");
      },
      // Immediately, since a pasted URL is past the end before anything changes;
      // and after the render, so the correction is a navigation the mounted shell
      // makes rather than one it makes on the way up. An async source is still
      // pending here and corrects itself when its count lands.
      { immediate: !0, flush: "post" }
    );
    const z = dn() ?? "dc-query-panel", E = B(null);
    function H() {
      r.value && (r.value = !1, ft(() => {
        E.value?.$el?.querySelector(".dc-header__toggle")?.focus();
      }));
    }
    const q = p(() => new Set(o.value));
    function Q(O) {
      const ae = new Set(q.value);
      ae.has(O.id) ? ae.delete(O.id) : ae.add(O.id), o.value = [...ae], s("toggle-pin", O);
    }
    const ve = p(() => {
      if (a.selectable === !0) return !0;
      const O = $.entity.value;
      return !!(O?.duplicate || O?.delete || O?.operations?.length);
    }), fe = p(() => new Set(i.value));
    function Be(O) {
      const ae = new Set(fe.value);
      ae.has(O.id) ? ae.delete(O.id) : ae.add(O.id), i.value = [...ae];
    }
    function D(O) {
      const ae = new Set(fe.value);
      for (const pe of b.rows.value)
        O ? ae.add(pe.id) : ae.delete(pe.id);
      i.value = [...ae];
    }
    function j() {
      i.value.length && (i.value = []);
    }
    const me = p(() => ({
      ids: [...i.value],
      rows: b.rows.value.filter((O) => fe.value.has(O.id)),
      entity: $.entity.value
    }));
    be(() => $.query.value.entity, j);
    function le(O, ae, pe = {}) {
      const We = da(a.schema, $.query.value, O, pe);
      pe.exclude ? $.narrow(We, ae?.key ?? $.query.value.entity) : M.release(() => $.narrow(We, ae?.key ?? null, ae ? void 0 : "cards")), s("drill", O, ae, pe);
    }
    function xe(O) {
      return a.rowPress === "narrow" && Bn(a.schema, O) !== null;
    }
    function Me(O) {
      return a.schema.entities.find((pe) => pe.key === O.entityKey)?.href?.(O) || null;
    }
    const Re = Uo({
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
      setPage: (O, ae) => {
        M.drafting.value ? M.setPage(O) : $.setPage(O, ae);
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
      source: y,
      previewsPerType: p(() => a.previewsPerType),
      within: x,
      pinnable: p(() => a.pinnable === !0),
      isPinned: (O) => q.value.has(O.id),
      isPinnedId: (O) => q.value.has(O),
      togglePin: Q,
      selectable: ve,
      selection: me,
      isSelected: (O) => fe.value.has(O.id),
      toggleSelect: Be,
      selectPage: D,
      clearSelection: j,
      narrowsOnPress: p(() => a.rowPress === "narrow"),
      /*
       * The one place a press is read, so every view gets the same answer without
       * knowing which of the two it is: they all call this.
       */
      activate: (O, ae = {}) => {
        if (xe(O)) {
          le(O, null, ae);
          return;
        }
        const pe = Me(O);
        if (pe) {
          window.open(pe, "_blank", "noopener");
          return;
        }
        s("activate", O);
      },
      pressHref: (O) => xe(O) ? $.narrowHref(da(a.schema, $.query.value, O), null, "cards") : Me(O),
      recordHref: Me,
      drillHref: (O, ae) => Bn(a.schema, O) ? $.narrowHref(
        da(a.schema, $.query.value, O),
        ae?.key ?? null,
        ae ? void 0 : "cards"
      ) : null,
      create: (O) => s("create", O),
      duplicate: () => s("duplicate", me.value),
      delete: () => s("delete", me.value),
      operate: (O) => s("operate", O, me.value),
      drill: le
    });
    Xo({ theme: () => a.theme, accent: () => a.accent, tokens: () => a.tokens });
    const Ue = p(() => {
      if (!(!a.accent && !a.tokens))
        return { ...a.tokens, ...a.accent ? { "--dc-accent": a.accent } : {} };
    });
    return t({
      query: $.query,
      openPanel: () => {
        r.value = !0;
      },
      closePanel: H
    }), (O, ae) => (d(), v("div", {
      class: "dc-shell",
      "data-dc-theme": e.theme,
      style: Se(Ue.value)
    }, [
      C("div", {
        class: "dc-shell__head",
        "data-dc-width": e.matchWidth,
        "data-dc-align": e.matchWidth === "shrink" ? e.headAlign : void 0
      }, [
        oe(zr, {
          ref_key: "headerRef",
          ref: E,
          expanded: r.value,
          "panel-id": P(z),
          views: L.value,
          "type-chooser": e.typeChooser,
          "pages-note": e.pagesNote,
          "hide-pages": e.loading || k.value,
          "hide-views": k.value,
          onToggle: ae[0] || (ae[0] = (pe) => r.value = !r.value)
        }, Mn({ _: 2 }, [
          l.brand ? {
            name: "brand",
            fn: Pe((pe) => [
              ye(O.$slots, "brand", Nl(Bl(pe)), void 0, !0)
            ]),
            key: "0"
          } : void 0,
          l.actions ? {
            name: "actions",
            fn: Pe(() => [
              ye(O.$slots, "actions", {}, void 0, !0)
            ]),
            key: "1"
          } : void 0
        ]), 1032, ["expanded", "panel-id", "views", "type-chooser", "pages-note", "hide-pages", "hide-views"]),
        r.value ? (d(), v(Z, { key: 0 }, [
          C("div", {
            class: "dc-shell__scrim",
            onClick: H
          }),
          C("div", jd, [
            oe(Or, {
              "panel-id": P(z),
              onClose: H
            }, Mn({ _: 2 }, [
              l["panel-section"] ? {
                name: "panel-section",
                fn: Pe(() => [
                  ye(O.$slots, "panel-section", {}, void 0, !0)
                ]),
                key: "0"
              } : void 0
            ]), 1032, ["panel-id"])
          ])
        ], 64)) : A("", !0)
      ], 8, Wd),
      l.page ? (d(), v("div", Ud, [
        ye(O.$slots, "page", {
          query: P(Re).query.value
        }, void 0, !0)
      ])) : A("", !0),
      l.page ? A("", !0) : (d(), G(Nr, {
        key: 1,
        views: L.value
      }, null, 8, ["views"])),
      l.page ? A("", !0) : ye(O.$slots, "results", {
        rows: P(Re).rows.value,
        total: P(Re).total.value,
        offset: P(Re).offset.value,
        pageCount: P(Re).pageCount.value,
        query: P(Re).liveQuery.value,
        pending: P(Re).pending.value,
        loading: e.loading
      }, () => [
        oe(Gr, {
          views: L.value,
          loading: e.loading
        }, Mn({ _: 2 }, [
          l["cards-before"] || N().length ? {
            name: "cards-before",
            fn: Pe(() => [
              (d(!0), v(Z, null, de(N(), (pe) => (d(), v(Z, {
                key: `${pe.entityKey}:${pe.id}`
              }, [
                l.record ? ye(O.$slots, "record", {
                  id: pe.id,
                  entity: pe.entity
                }, void 0, !0, 0) : (d(), G(jn(e.recordCards?.[pe.entityKey]), {
                  key: 1,
                  id: pe.id
                }, null, 8, ["id"]))
              ], 64))), 128)),
              ye(O.$slots, "cards-before", {}, void 0, !0)
            ]),
            key: "0"
          } : void 0,
          l["cards-after"] ? {
            name: "cards-after",
            fn: Pe(() => [
              ye(O.$slots, "cards-after", {}, void 0, !0)
            ]),
            key: "1"
          } : void 0
        ]), 1032, ["views", "loading"])
      ], !0, 2)
    ], 12, Kd));
  }
}), Qd = /* @__PURE__ */ re(Gd, [["__scopeId", "data-v-47aa93fc"]]), Xd = ["data-dc-muted", "data-dc-collapsed"], Yd = ["data-dc-collapsible"], Zd = ["aria-expanded", "aria-controls"], Jd = { class: "dc-shell-card__sr" }, ef = {
  key: 0,
  class: "dc-shell-card__identity"
}, tf = { class: "dc-shell-card__title dc-shell-card__name" }, nf = {
  key: 0,
  class: "dc-shell-card__ref dc-mono"
}, af = {
  key: 1,
  class: "dc-shell-card__title"
}, sf = {
  key: 2,
  class: "dc-shell-card__count dc-mono"
}, rf = {
  key: 1,
  class: "dc-shell-card__aside"
}, lf = ["data-dc-flush"], of = /* @__PURE__ */ te({
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
    const n = e, a = t, s = B(n.defaultCollapsed === !0), r = p(() => n.span === "all" ? { gridColumn: "1 / -1" } : void 0), o = Wt();
    function i(z) {
      return l(z?.() ?? []);
    }
    function l(z) {
      return z.some((E) => E.type === Dl ? !1 : E.type === ql ? String(E.children ?? "").trim().length > 0 : E.type === Z ? l(E.children ?? []) : !0);
    }
    const c = p(
      () => !!n.title || !!n.name || u.value || i(o.head)
    ), u = p(() => i(o.aside)), m = p(() => i(o.default)), k = p(() => i(o.foot)), g = p(
      () => !!n.name && (!!n.reference || i(o.reference))
    ), _ = p(() => n.collapsible === !0 && c.value), y = p(() => _.value && (n.collapsed ?? s.value));
    function $() {
      const z = !y.value;
      s.value = z, a("update:collapsed", z);
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
    ].join(", "), N = B(null);
    function L(z) {
      if (!_.value) return;
      const E = z.target?.closest(T);
      E && N.value?.contains(E) || typeof window < "u" && window.getSelection()?.toString() || $();
    }
    return (z, E) => (d(), v("section", {
      class: "dc-shell-card",
      style: Se(r.value),
      "data-dc-muted": e.muted ? "true" : "false",
      "data-dc-collapsed": y.value ? "true" : "false"
    }, [
      c.value ? (d(), v("header", {
        key: 0,
        ref_key: "head",
        ref: N,
        class: "dc-shell-card__head",
        "data-dc-collapsible": _.value ? "true" : "false",
        onClick: L
      }, [
        _.value ? (d(), v("button", {
          key: 0,
          type: "button",
          class: "dc-shell-card__toggle",
          "aria-expanded": y.value ? "false" : "true",
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
          C("span", Jd, R(e.name || e.title || "Card"), 1)
        ], 8, Zd)) : A("", !0),
        ye(z.$slots, "head", {}, () => [
          e.name ? (d(), v("div", ef, [
            C("h2", tf, R(e.name), 1),
            g.value ? (d(), v("span", nf, [
              ye(z.$slots, "reference", {}, () => [
                Te(R(e.reference), 1)
              ], !0)
            ])) : A("", !0)
          ])) : (d(), v("h2", af, R(e.title), 1)),
          e.count !== void 0 ? (d(), v("span", sf, R(e.count), 1)) : A("", !0)
        ], !0),
        u.value ? (d(), v("span", rf, [
          ye(z.$slots, "aside", {}, void 0, !0)
        ])) : A("", !0)
      ], 8, Yd)) : A("", !0),
      m.value ? yt((d(), v("div", {
        key: 1,
        id: M,
        class: "dc-shell-card__body",
        "data-dc-flush": e.flush ? "true" : "false"
      }, [
        ye(z.$slots, "default", {}, void 0, !0)
      ], 8, lf)), [
        [In, !y.value]
      ]) : A("", !0),
      k.value ? yt((d(), v("footer", {
        key: 2,
        id: b,
        class: "dc-shell-card__foot"
      }, [
        ye(z.$slots, "foot", {}, void 0, !0)
      ], 512)), [
        [In, !y.value]
      ]) : A("", !0)
    ], 12, Xd));
  }
}), Xv = /* @__PURE__ */ re(of, [["__scopeId", "data-v-3a7425d2"]]), cf = ["aria-label"], uf = ["aria-checked", "data-dc-active", "tabindex", "onClick", "onKeydown"], df = /* @__PURE__ */ te({
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
    function r(o, i) {
      const l = n.options.length;
      let c = null;
      if (o.key === "ArrowRight" || o.key === "ArrowDown" ? c = (i + 1) % l : o.key === "ArrowLeft" || o.key === "ArrowUp" ? c = (i - 1 + l) % l : o.key === "Home" ? c = 0 : o.key === "End" && (c = l - 1), c === null) return;
      o.preventDefault();
      const u = n.options[c];
      u && (a("update:modelValue", u.key), s.value[c]?.focus());
    }
    return (o, i) => (d(), v("div", {
      class: "dc-segmented",
      role: "radiogroup",
      "aria-label": e.label
    }, [
      (d(!0), v(Z, null, de(e.options, (l, c) => (d(), v("button", {
        key: l.key,
        ref_for: !0,
        ref_key: "buttons",
        ref: s,
        type: "button",
        role: "radio",
        class: rt(["dc-segmented__item", { "dc-segmented__item--mono": e.mono }]),
        "aria-checked": l.key === e.modelValue,
        "data-dc-active": l.key === e.modelValue ? "true" : "false",
        tabindex: l.key === e.modelValue ? 0 : -1,
        onClick: (u) => a("update:modelValue", l.key),
        onKeydown: (u) => r(u, c)
      }, R(l.label), 43, uf))), 128))
    ], 8, cf));
  }
}), ff = /* @__PURE__ */ re(df, [["__scopeId", "data-v-63fb5482"]]), pf = ["data-dc-theme", "aria-label"], vf = ["aria-expanded", "aria-disabled", "disabled", "data-dc-menu", "tabindex", "onClick", "onMouseenter"], hf = /* @__PURE__ */ te({
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
    }), s = t, r = B(null), o = B([]), i = B(null), l = B(null), c = B(!1), u = p(
      () => n.menus.flatMap((S, T) => tn(S) ? [T] : [])
    );
    function m(S, T) {
      const N = o.value[S]?.getBoundingClientRect(), L = n.menus[S];
      !N || !L || !tn(L) || (l.value = { x: N.left, y: N.bottom + 2, mirrorX: N.right }, i.value = S, c.value = T);
    }
    function k(S) {
      const T = i.value;
      i.value = null, l.value = null, S && T !== null && o.value[T]?.focus();
    }
    function g(S) {
      i.value === S ? k(!0) : m(S, !1);
    }
    function _(S) {
      i.value === null || i.value === S || m(S, !1);
    }
    function y(S, T) {
      const N = u.value;
      if (N.length === 0) return null;
      if (S === null) return T === 1 ? N[0] ?? null : N[N.length - 1] ?? null;
      const L = N.indexOf(S);
      return L === -1 ? N[0] ?? null : N[(L + T + N.length) % N.length] ?? null;
    }
    function $(S) {
      const T = S.key;
      if (T === "Escape") {
        if (i.value === null) return;
        S.preventDefault(), k(!0);
        return;
      }
      if (T === "ArrowDown" && i.value === null) {
        const z = x();
        if (z === null) return;
        S.preventDefault(), m(z, !0);
        return;
      }
      if (T !== "ArrowLeft" && T !== "ArrowRight") return;
      const N = i.value ?? x(), L = y(N, T === "ArrowRight" ? 1 : -1);
      L !== null && (S.preventDefault(), i.value !== null ? m(L, !0) : o.value[L]?.focus());
    }
    function x() {
      const S = o.value.findIndex((T) => T === document.activeElement);
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
      (d(!0), v(Z, null, de(e.menus, (N, L) => (d(), v("button", {
        key: N.id ?? N.label ?? L,
        ref_for: !0,
        ref: (z) => {
          z && (o.value[L] = z);
        },
        type: "button",
        class: "dc-menubar__item",
        role: "menuitem",
        "aria-haspopup": "menu",
        "aria-expanded": i.value === L,
        "aria-disabled": N.disabled ? "true" : void 0,
        disabled: N.disabled,
        "data-dc-menu": N.id ?? N.label,
        tabindex: L === (u.value[0] ?? 0) ? 0 : -1,
        onClick: (z) => g(L),
        onMouseenter: (z) => _(L)
      }, R(N.label), 41, vf))), 128)),
      i.value !== null && l.value ? (d(), G(Za, {
        key: i.value,
        items: e.menus[i.value]?.items ?? [],
        at: l.value,
        label: e.menus[i.value]?.label,
        autofocus: c.value,
        onChoose: b,
        onDismiss: T[0] || (T[0] = (N) => k(!0))
      }, null, 8, ["items", "at", "label", "autofocus"])) : A("", !0)
    ], 44, pf));
  }
}), Yv = /* @__PURE__ */ re(hf, [["__scopeId", "data-v-93dbd2e4"]]), mf = ["aria-label", "aria-expanded", "disabled"], gf = { "aria-hidden": "true" }, yf = /* @__PURE__ */ te({
  __name: "MenuButton",
  props: {
    items: {},
    label: {},
    glyph: { default: "⋯" }
  },
  emits: ["choose"],
  setup(e, { emit: t }) {
    const n = t, a = B(null), s = B(null), r = B(null), o = B(!1), i = p(() => r.value !== null);
    function l(_) {
      const y = a.value?.getBoundingClientRect();
      y && (r.value = { x: y.left, y: y.bottom + 4, mirrorX: y.right }, o.value = _);
    }
    function c(_) {
      r.value = null, _ && a.value?.focus();
    }
    function u() {
      i.value ? c(!0) : l(!1);
    }
    function m(_) {
      _.key !== "ArrowDown" || i.value || (_.preventDefault(), l(!0));
    }
    function k(_) {
      const y = _.target;
      y && (a.value?.contains(y) || s.value?.root?.contains(y) || c(!1));
    }
    be(i, (_) => {
      _ ? window.addEventListener("pointerdown", k, !0) : window.removeEventListener("pointerdown", k, !0);
    }), Ke(() => window.removeEventListener("pointerdown", k, !0));
    function g(_) {
      c(!0), _.action?.(), n("choose", _);
    }
    return (_, y) => (d(), v(Z, null, [
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
        C("span", gf, R(e.glyph), 1)
      ], 40, mf),
      r.value ? (d(), G(Za, {
        key: 0,
        ref_key: "menu",
        ref: s,
        items: e.items,
        at: r.value,
        label: e.label,
        autofocus: o.value,
        onChoose: g,
        onDismiss: y[0] || (y[0] = ($) => c(!0))
      }, null, 8, ["items", "at", "label", "autofocus"])) : A("", !0)
    ], 64));
  }
}), ts = /* @__PURE__ */ re(yf, [["__scopeId", "data-v-48f5ada5"]]), _f = { class: "dc-fact__label" }, wf = ["title"], kf = /* @__PURE__ */ te({
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
      if (s == null || s === "") return [lt];
      if (Array.isArray(s)) {
        const r = s.filter((o) => o != null && o !== "");
        return r.length ? r.map(String) : [lt];
      }
      return [String(s)];
    }), a = p(() => t.wide ? { gridColumn: "1 / -1" } : void 0);
    return (s, r) => (d(), v("div", {
      class: "dc-fact",
      style: Se(a.value)
    }, [
      C("dt", _f, [
        ye(s.$slots, "label", {}, () => [
          Te(R(e.label), 1)
        ], !0)
      ]),
      C("dd", {
        class: "dc-fact__value dc-mono",
        title: e.title
      }, [
        ye(s.$slots, "default", {}, () => [
          n.value.length === 1 ? (d(), v(Z, { key: 0 }, [
            Te(R(n.value[0]), 1)
          ], 64)) : (d(!0), v(Z, { key: 1 }, de(n.value, (o, i) => (d(), v("span", {
            key: i,
            class: "dc-fact__line"
          }, R(o), 1))), 128))
        ], !0)
      ], 8, wf)
    ], 4));
  }
}), bf = /* @__PURE__ */ re(kf, [["__scopeId", "data-v-1f6d25e6"]]), $f = /* @__PURE__ */ te({
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
      (d(!0), v(Z, null, de(e.items, (r, o) => (d(), G(bf, {
        key: `${o}:${r.label}`,
        label: r.label,
        value: r.value,
        title: r.title,
        wide: r.wide
      }, null, 8, ["label", "value", "title", "wide"]))), 128)),
      ye(a.$slots, "default", {}, void 0, !0)
    ], 4));
  }
}), Zv = /* @__PURE__ */ re($f, [["__scopeId", "data-v-17455afa"]]), xf = { class: "dc-counts" }, Cf = ["data-dc-tone"], Sf = {
  key: 0,
  class: "dc-counts__empty"
}, Mf = /* @__PURE__ */ te({
  __name: "StatusCounts",
  props: {
    counts: {},
    empty: { default: lt }
  },
  setup(e) {
    const t = e, n = p(() => t.counts.filter((a) => a.count > 0));
    return (a, s) => (d(), v("span", xf, [
      (d(!0), v(Z, null, de(n.value, (r) => (d(), v("span", {
        key: r.label,
        class: "dc-counts__count",
        "data-dc-tone": r.tone ?? "neutral"
      }, R(r.count) + " " + R(r.label), 9, Cf))), 128)),
      n.value.length === 0 ? (d(), v("span", Sf, R(e.empty), 1)) : A("", !0)
    ]));
  }
}), Jv = /* @__PURE__ */ re(Mf, [["__scopeId", "data-v-5553a9e2"]]), Ef = ["data-dc-copied", "title", "aria-label"], Pf = {
  key: 0,
  class: "dc-copy__mark",
  viewBox: "0 0 16 16",
  "aria-hidden": "true"
}, Af = {
  key: 1,
  class: "dc-copy__mark",
  viewBox: "0 0 16 16",
  "aria-hidden": "true"
}, Tf = 1500, Lf = /* @__PURE__ */ te({
  __name: "CopyButton",
  props: {
    text: {},
    label: { default: "Copy to clipboard" }
  },
  emits: ["copied", "error"],
  setup(e, { emit: t }) {
    const n = e, a = t, s = B(!1);
    let r;
    async function o() {
      const i = typeof n.text == "function" ? n.text() : n.text;
      try {
        if (!navigator.clipboard) throw new Error("The clipboard is not available here");
        await navigator.clipboard.writeText(i);
      } catch (l) {
        a("error", l);
        return;
      }
      s.value = !0, clearTimeout(r), r = setTimeout(() => {
        s.value = !1;
      }, Tf), a("copied", i);
    }
    return Ke(() => clearTimeout(r)), (i, l) => (d(), v("button", {
      type: "button",
      class: "dc-copy",
      "data-dc-copied": s.value ? "true" : "false",
      title: s.value ? "Copied" : e.label,
      "aria-label": e.label,
      onClick: o
    }, [
      s.value ? (d(), v("svg", Af, [...l[1] || (l[1] = [
        C("path", { d: "M3 8.5l3.2 3L13 4.5" }, null, -1)
      ])])) : (d(), v("svg", Pf, [...l[0] || (l[0] = [
        C("rect", {
          x: "5.5",
          y: "5.5",
          width: "8",
          height: "9",
          rx: "1.5"
        }, null, -1),
        C("path", { d: "M10.5 3.5v-1a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h1" }, null, -1)
      ])]))
    ], 8, Ef));
  }
}), Rf = /* @__PURE__ */ re(Lf, [["__scopeId", "data-v-f4249d7f"]]), zf = ["data-dc-copy", "data-dc-wrap", "data-dc-tone"], If = /* @__PURE__ */ te({
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
    const n = e, a = t, s = B(null), r = p(() => n.maxHeight === void 0 ? void 0 : { maxHeight: typeof n.maxHeight == "number" ? `${n.maxHeight}px` : n.maxHeight });
    function o() {
      return n.code ?? s.value?.textContent ?? "";
    }
    return (i, l) => (d(), v("div", {
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
          Te(R(e.code), 1)
        ], !0)
      ], 4),
      e.copy ? (d(), G(Rf, {
        key: 0,
        class: "dc-code__copy",
        text: o,
        label: e.copyLabel,
        onCopied: l[0] || (l[0] = (c) => a("copied", c)),
        onError: l[1] || (l[1] = (c) => a("error", c))
      }, null, 8, ["label"])) : A("", !0)
    ], 8, zf));
  }
}), eh = /* @__PURE__ */ re(If, [["__scopeId", "data-v-67b371dd"]]), Of = 24, Ff = /* @__PURE__ */ te({
  __name: "ShellLog",
  props: {
    fetchChunk: {},
    stripAnsi: { type: Boolean },
    maxHeight: { default: "460px" }
  },
  setup(e, { expose: t }) {
    const n = e, a = B(""), s = p(() => n.stripAnsi ? lo(a.value) : a.value), r = B(null);
    let o = 0, i = null;
    function l() {
      return i ??= c().finally(() => {
        i = null;
      }), i;
    }
    async function c() {
      const { chunk: k, offset: g } = await n.fetchChunk(o);
      if (o = g, !k) return;
      const _ = r.value, y = !_ || _.scrollTop + _.clientHeight >= _.scrollHeight - Of;
      a.value += k, y && (await ft(), r.value && (r.value.scrollTop = r.value.scrollHeight));
    }
    function u() {
      a.value = "", o = 0;
    }
    const m = p(() => n.maxHeight === void 0 ? void 0 : { maxHeight: typeof n.maxHeight == "number" ? `${n.maxHeight}px` : n.maxHeight });
    return t({ poll: l, reset: u }), (k, g) => (d(), v("pre", {
      ref_key: "pane",
      ref: r,
      class: "dc-log dc-mono",
      style: Se(m.value)
    }, R(s.value), 5));
  }
}), th = /* @__PURE__ */ re(Ff, [["__scopeId", "data-v-2c86947e"]]), Nf = ["data-dc-theme"], Bf = ["aria-labelledby", "aria-label"], Df = {
  key: 1,
  class: "dc-dialog__actions"
}, Qt = [], qf = /* @__PURE__ */ te({
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
    const n = e, a = t, { theme: s, style: r, adopt: o } = Xa(n), i = `${dn() ?? "dc-dialog"}-title`, l = B(null);
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
    function _(b) {
      b.target === b.currentTarget && k && c(), k = !1;
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
    async function x() {
      Qt.push(u), document.addEventListener("keydown", m), $ = document.activeElement instanceof HTMLElement ? document.activeElement : null, o(), await ft(), (l.value?.querySelector("[autofocus]") ?? l.value?.querySelector(y) ?? l.value)?.focus();
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
        onClick: _
      }, [
        C("div", {
          ref_key: "panel",
          ref: l,
          class: rt(["dc-dialog__panel", e.panelClass]),
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
          }, R(e.title), 1)) : A("", !0),
          C("div", {
            class: rt(["dc-dialog__body", e.bodyClass])
          }, [
            ye(b.$slots, "default", {}, void 0, !0)
          ], 2),
          b.$slots.actions ? (d(), v("div", Df, [
            ye(b.$slots, "actions", {}, void 0, !0)
          ])) : A("", !0)
        ], 10, Bf)
      ], 44, Nf)
    ], 8, ["to"])) : A("", !0);
  }
}), nh = /* @__PURE__ */ re(qf, [["__scopeId", "data-v-1e126064"]]), Hf = 4500, Vf = 9e3, on = B([]);
let Hs = 0;
function Qr(e) {
  on.value = on.value.filter((t) => t.id !== e);
}
function Xr(e, t = "ok") {
  Hs += 1;
  const n = Hs;
  on.value = [...on.value, { id: n, message: e, kind: t }], setTimeout(() => Qr(n), t === "err" ? Vf : Hf);
}
function Kf(e) {
  Xr(e instanceof Error ? e.message : String(e), "err");
}
function Wf() {
  return { toasts: Hl(on), toast: Xr, toastError: Kf, dismiss: Qr };
}
const jf = ["data-dc-theme"], Uf = ["data-dc-kind", "role"], Gf = /* @__PURE__ */ te({
  __name: "ShellToasts",
  props: {
    to: { default: "body" },
    theme: { default: void 0 },
    accent: { default: void 0 },
    tokens: { default: void 0 }
  },
  setup(e) {
    const t = e, { toasts: n } = Wf(), { theme: a, style: s, adopt: r } = Xa(t);
    return un(r), (o, i) => (d(), G(Wn, { to: e.to }, [
      C("div", {
        class: "dc-shell dc-layer dc-toasts",
        "data-dc-theme": P(a),
        style: Se(P(s)),
        "aria-live": "polite"
      }, [
        (d(!0), v(Z, null, de(P(n), (l) => (d(), v("div", {
          key: l.id,
          class: "dc-toast",
          "data-dc-kind": l.kind,
          role: l.kind === "err" ? "alert" : void 0
        }, R(l.message), 9, Uf))), 128))
      ], 12, jf)
    ], 8, ["to"]));
  }
}), ah = /* @__PURE__ */ re(Gf, [["__scopeId", "data-v-6fb044ee"]]), Qf = 4, Xf = 8, Yf = 180;
function Zf(e, t, n, a = {}) {
  const s = a.gap ?? Qf, r = a.margin ?? Xf, o = a.flipBelow ?? Yf, i = a.side ?? "below", l = {
    below: n.height - e.bottom - s - r,
    above: e.top - s - r
  }, c = i === "below" ? "above" : "below", u = l[i] < o && l[c] > l[i] ? c : i, m = Math.min(a.maxHeight ?? 1 / 0, Math.max(0, l[u])), k = Math.max(0, n.width - r * 2), g = Math.min(e.width, k), _ = Math.min(Math.max(t, g), k), y = a.align === "end" ? e.right - _ : e.left, $ = Math.max(r, Math.min(y, n.width - _ - r));
  return u === "below" ? { side: u, left: $, top: e.bottom + s, maxHeight: m, minWidth: g, maxWidth: k } : { side: u, left: $, bottom: n.height - e.top + s, maxHeight: m, minWidth: g, maxWidth: k };
}
const Jf = ["data-dc-theme", "data-dc-side"], vt = [], ep = /* @__PURE__ */ te({
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
    const n = e, a = t, { theme: s, style: r, adopt: o } = Xa(n), i = B(null), l = B(null), c = { root: () => i.value };
    function u() {
      const b = n.anchor;
      b && (l.value = Zf(
        b.getBoundingClientRect(),
        i.value?.offsetWidth ?? 0,
        { width: window.innerWidth, height: window.innerHeight },
        { side: n.side, align: n.align, maxHeight: n.maxHeight }
      ));
    }
    const m = p(() => {
      const b = l.value, S = b ? {
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
      return i.value?.contains(b) || n.anchor?.contains(b) ? !0 : vt.slice(vt.indexOf(c) + 1).some((T) => T.root()?.contains(b));
    }
    function _(b) {
      const S = b.target;
      S && !g(S) && k();
    }
    function y(b) {
      b.key !== "Escape" || b.defaultPrevented || vt[vt.length - 1] === c && (b.preventDefault(), i.value?.contains(document.activeElement) && n.anchor?.focus(), k());
    }
    let $ = null;
    async function x() {
      vt.includes(c) || (vt.push(c), o(), l.value = null, await ft(), u(), window.addEventListener("pointerdown", _, !0), document.addEventListener("keydown", y, !0), window.addEventListener("resize", u), window.addEventListener("scroll", u, !0), typeof ResizeObserver < "u" && i.value && ($ = new ResizeObserver(() => u()), $.observe(i.value)));
    }
    function M() {
      const b = vt.indexOf(c);
      b !== -1 && (vt.splice(b, 1), window.removeEventListener("pointerdown", _, !0), document.removeEventListener("keydown", y, !0), window.removeEventListener("resize", u), window.removeEventListener("scroll", u, !0), $?.disconnect(), $ = null);
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
      C("div", Vl({
        ref_key: "root",
        ref: i
      }, b.$attrs, {
        class: "dc-shell dc-layer dc-popover",
        "data-dc-theme": P(s),
        "data-dc-side": l.value?.side,
        style: m.value
      }), [
        ye(b.$slots, "default", {}, void 0, !0)
      ], 16, Jf)
    ], 8, ["to"])) : A("", !0);
  }
}), sh = /* @__PURE__ */ re(ep, [["__scopeId", "data-v-65ca5cb0"]]), jt = (e) => e.kind === "split", ee = (e) => e.kind === "group", ue = (e) => e.kind === "float", $t = { x: 16, y: 16, w: 360, h: 260 }, Hn = 28, Yr = 120, Ta = 220, Zr = 38, Rt = 6;
function _n(e, t) {
  let n = !1;
  const a = e.frames.map((s, r) => {
    const o = t(s.node, r);
    return o === s.node ? s : (n = !0, { ...s, node: o });
  });
  return n ? { ...e, frames: a } : e;
}
function Je(e) {
  return { kind: "group", panels: [e] };
}
function rh(e, t, n) {
  return {
    kind: "group",
    panels: e,
    ...t ? { active: t } : {},
    ...n ? { title: n } : {}
  };
}
const $e = (e) => typeof e == "string", ns = (e) => $e(e) ? Je(e) : e, wn = (e) => $e(e) ? [e] : Ye(e), Vs = (e) => e.panels.filter($e), tp = (e) => e.panels.filter((t) => !$e(t)), Xe = (e, t) => e.panels.includes(t);
function kn(e, t, n) {
  let a = !1;
  const s = e.panels.map((r) => {
    if ($e(r) || !_e(r, t)) return r;
    const o = n(r);
    return o !== r && (a = !0), o;
  });
  return a ? { ...e, panels: s } : e;
}
function ea(e, t) {
  return { node: e, rect: { ...$t, ...t } };
}
function as(e, t) {
  return t ? { kind: "float", frames: e, title: t } : { kind: "float", frames: e };
}
function ss(e, t) {
  const n = { ...$t, ...t };
  return as(
    e.map(
      (a, s) => ea(a, {
        ...n,
        x: n.x + s * Hn,
        y: n.y + s * Hn
      })
    )
  );
}
function rs(e, t, n, a) {
  return {
    kind: "split",
    direction: e,
    children: t,
    ...n ? { sizes: n } : {},
    ...a ? { title: a } : {}
  };
}
const ls = (e, t, n) => rs("row", e, t, n), lh = (e, t, n) => rs("column", e, t, n);
function Ae(e) {
  return {
    ...e.title ? { title: e.title } : {},
    ...e.fixedView ? { fixedView: !0 } : {},
    ...e.headless ? { headless: !0 } : {}
  };
}
const Et = (e) => e.fixedView === !0 || e.headless === !0 || !!e.title, np = (e) => ({ ...e, headless: !0 }), oh = (e) => ({ ...e, fixedView: !0 }), ap = (e) => e === "left" || e === "right" ? "row" : "column";
function Ye(e) {
  return ee(e) ? e.panels.flatMap(wn) : ue(e) ? e.frames.flatMap((t) => Ye(t.node)) : e.children.flatMap(Ye);
}
function _e(e, t) {
  return ee(e) ? e.panels.some((n) => $e(n) ? n === t : _e(n, t)) : ue(e) ? e.frames.some((n) => _e(n.node, t)) : e.children.some((n) => _e(n, t));
}
const Jr = (e) => Ye(e).length === 0, La = (e) => !ee(e) && Et(e), Ra = (e) => Jr(e) && !La(e);
function ta(e) {
  return jt(e) ? e.children.map((t, n) => ({ node: t, index: n })) : ue(e) ? e.frames.map((t, n) => ({ node: t.node, index: n })) : e.panels.flatMap((t, n) => $e(t) ? [] : [{ node: t, index: n }]);
}
const os = (e) => ta(e).map((t) => t.node);
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
function el(e) {
  const t = e.panels[Tt(e)];
  return t !== void 0 && $e(t) ? t : "";
}
function Fe(e) {
  if ($e(e)) return e;
  if (ee(e)) {
    const n = e.panels[Tt(e)];
    return n === void 0 ? "" : Fe(n);
  }
  if (ue(e)) {
    const n = e.frames[e.frames.length - 1];
    return n ? Fe(n.node) : "";
  }
  const t = e.children[0];
  return t ? Fe(t) : "";
}
function Ft(e, t) {
  if (ee(e) && Xe(e, t)) return e;
  for (const n of os(e)) {
    const a = Ft(n, t);
    if (a) return a;
  }
  return null;
}
function sp(e) {
  const t = os(e).flatMap(sp);
  return ee(e) ? [e, ...t] : t;
}
function Ie(e, t) {
  if (ee(e)) {
    for (const n of tp(e)) {
      const a = Ie(n, t);
      if (a) return a;
    }
    return null;
  }
  if (ue(e)) {
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
function pa(e, t, n = Yr) {
  const a = (i, l) => l > 0 ? Math.max(Math.min(i, l), Math.min(n, l)) : Math.max(i, n), s = a(e.w, t.w), r = a(e.h, t.h), o = (i, l, c) => Math.min(Math.max(i, 0), Math.max(c - l, 0));
  return {
    x: Math.round(o(e.x, s, t.w)),
    y: Math.round(o(e.y, r, t.h)),
    w: Math.round(s),
    h: Math.round(r)
  };
}
function Ks(e, t, n, a, s = Yr) {
  let { x: r, y: o, w: i, h: l } = e;
  return t.includes("e") && (i = e.w + n), t.includes("w") && (i = e.w - n, r = e.x + n), t.includes("s") && (l = e.h + a), t.includes("n") && (l = e.h - a, o = e.y + a), i < s && (t.includes("w") && (r = e.x + e.w - s), i = s), l < s && (t.includes("n") && (o = e.y + e.h - s), l = s), { x: r, y: o, w: i, h: l };
}
const tl = (e, t) => e.x === t.x && e.y === t.y && e.w === t.w && e.h === t.h;
function Nt(e, t, n) {
  if (ee(e)) return kn(e, t, (r) => Nt(r, t, n));
  if (ue(e)) {
    let r = !1;
    const o = e.frames.map((i) => {
      if (!_e(i.node, t)) return i;
      if (Ie(i.node, t)) {
        const c = Nt(i.node, t, n);
        return c === i.node ? i : (r = !0, { ...i, node: c });
      }
      const l = n(i);
      return l === i ? i : (r = !0, l);
    });
    return r ? { ...e, frames: o } : e;
  }
  if (!_e(e, t)) return e;
  let a = !1;
  const s = e.children.map((r) => {
    const o = Nt(r, t, n);
    return o !== r && (a = !0), o;
  });
  return a ? { ...e, children: s } : e;
}
function rp(e, t, n) {
  return Nt(e, t, (a) => tl(a.rect, n) ? a : { ...a, rect: n });
}
const ht = (e) => e.maximized === !0, nl = (e) => (t) => {
  if (ht(t) === e) return t;
  if (e) {
    const { minimized: s, ...r } = t;
    return { ...r, maximized: !0 };
  }
  const { maximized: n, ...a } = t;
  return a;
};
function lp(e, t, n = !0) {
  return Nt(e, t, nl(n));
}
function ih(e, t) {
  const n = Ie(e, t);
  return n ? lp(e, t, !ht(n)) : e;
}
const bt = (e) => e.minimized === !0, al = (e) => (t) => {
  if (bt(t) === e) return t;
  if (e) {
    const { maximized: s, ...r } = t;
    return { ...r, minimized: !0 };
  }
  const { minimized: n, ...a } = t;
  return a;
};
function op(e, t, n = !0) {
  return Nt(e, t, al(n));
}
function ch(e, t) {
  const n = Ie(e, t);
  return n ? op(e, t, !bt(n)) : e;
}
function kt(e, t) {
  const n = t[t.length - 1];
  if (n === void 0) return null;
  const a = gt(e, t.slice(0, -1));
  return !a || !ue(a) ? null : a.frames[n] ?? null;
}
function za(e, t) {
  if (ue(e)) {
    for (const [n, a] of e.frames.entries()) {
      if (!_e(a.node, t)) continue;
      const s = za(a.node, t);
      return s ? [n, ...s] : [n];
    }
    return null;
  }
  for (const { node: n, index: a } of ta(e)) {
    if (!_e(n, t)) continue;
    const s = za(n, t);
    return s ? [a, ...s] : null;
  }
  return null;
}
function is(e, t, n) {
  const a = t[t.length - 1];
  if (a === void 0) return e;
  const s = t.slice(0, -1), r = gt(e, s);
  if (!r || !ue(r)) return e;
  const o = r.frames[a];
  if (!o) return e;
  const i = n(o);
  if (i === o) return e;
  const l = [...r.frames];
  return l[a] = i, Ct(e, s, { ...r, frames: l });
}
function Ws(e, t, n) {
  return is(
    e,
    t,
    (a) => tl(a.rect, n) ? a : { ...a, rect: n }
  );
}
function ip(e, t, n = !0) {
  return is(e, t, nl(n));
}
function cp(e, t, n = !0) {
  return is(e, t, al(n));
}
function nn(e, t) {
  const [n, ...a] = t;
  if (n === void 0) return e;
  if (ue(e)) {
    const o = e.frames[n];
    if (!o) return e;
    const i = nn(o.node, a), l = i === o.node ? o : { ...o, node: i };
    if (n === e.frames.length - 1 && l === o) return e;
    const c = [...e.frames];
    return c.splice(n, 1), c.push(l), { ...e, frames: c };
  }
  const s = gt(e, [n]);
  if (!s) return e;
  const r = nn(s, a);
  return r === s ? e : Ct(e, [n], r);
}
function up(e, t) {
  const n = [...t];
  let a = e;
  return t.forEach((s, r) => {
    a && (ue(a) && (n[r] = a.frames.length - 1), a = gt(a, [s]));
  }), n;
}
function Pn(e, t, n, a) {
  if (ee(e)) return kn(e, n, (o) => Pn(o, t, n, a));
  if (ue(e)) {
    const o = e.frames.findIndex((l) => _e(l.node, n)), i = e.frames[o];
    if (!i) return e;
    if (Ie(i.node, n)) {
      const l = Pn(i.node, t, n, a);
      if (l === i.node) return e;
      const c = [...e.frames];
      return c[o] = { ...i, node: l }, { ...e, frames: c };
    }
    return { ...e, frames: [...e.frames, ea(Je(t), a)] };
  }
  if (!_e(e, n)) return e;
  let s = !1;
  const r = e.children.map((o) => {
    const i = Pn(o, t, n, a);
    return i !== o && (s = !0), i;
  });
  return s ? { ...e, children: r } : e;
}
function js(e, t, n, a) {
  if (t === n || !_e(e, t) || !_e(e, n) || !Ie(e, n)) return e;
  const s = xt(e, t);
  if (!s) return e;
  const r = Pn(s, t, n, a);
  return r === s ? e : Le(r);
}
function dp(e, t, n) {
  return ue(e) ? { ...e, frames: [...e.frames, ea(Je(t), n)] } : ee(e) ? rl(e, t) : {
    kind: "split",
    direction: e.direction,
    children: [...e.children, Je(t)],
    sizes: [...ut(e), 1],
    ...Ae(e)
  };
}
function sl(e, t, n, a) {
  const s = n[0];
  if (s === void 0) return dp(e, t, a);
  const r = n.slice(1), o = (u, m) => m === s ? sl(u, t, r, a) : xt(u, t);
  if (ue(e)) {
    const u = e.frames.flatMap((m, k) => {
      const g = o(m.node, k);
      return g ? [g === m.node ? m : { ...m, node: g }] : [];
    });
    return { ...e, frames: u };
  }
  if (ee(e)) {
    const u = Tt(e), m = [];
    e.panels.forEach((_, y) => {
      if ($e(_)) {
        _ !== t && m.push(_);
        return;
      }
      const $ = o(_, y);
      $ && m.push($);
    });
    const g = e.active && m.some((_) => wn(_).includes(e.active)) ? e.active : Fe(m[u] ?? m[m.length - 1]);
    return {
      kind: "group",
      panels: m,
      ...g ? { active: g } : {},
      ...Ae(e)
    };
  }
  const i = ut(e), l = [], c = [];
  return e.children.forEach((u, m) => {
    const k = o(u, m);
    k && (l.push(k), c.push(i[m] ?? 0));
  }), { kind: "split", direction: e.direction, children: l, sizes: c, ...Ae(e) };
}
function Us(e, t, n, a) {
  const s = gt(e, n);
  return !s || !Jr(s) || !_e(e, t) ? e : Le(sl(e, t, n, a));
}
function va(e, t) {
  if (ee(e)) return kn(e, t, (s) => va(s, t));
  if (ue(e)) {
    const s = e.frames.findIndex((c) => _e(c.node, t)), r = e.frames[s];
    if (!r) return e;
    const o = va(r.node, t), i = o === r.node ? r : { ...r, node: o };
    if (s === e.frames.length - 1 && i === r) return e;
    const l = [...e.frames];
    return l.splice(s, 1), l.push(i), { ...e, frames: l };
  }
  if (!_e(e, t)) return e;
  let n = !1;
  const a = e.children.map((s) => {
    const r = va(s, t);
    return r !== s && (n = !0), r;
  });
  return n ? { ...e, children: a } : e;
}
function cs(e, t) {
  if (e <= 0) return [];
  const n = () => Array.from({ length: e }, () => 1 / e);
  if (!t || t.length !== e) return n();
  const a = t.map((r) => Number.isFinite(r) && r > 0 ? r : 0), s = a.reduce((r, o) => r + o, 0);
  return s <= 0 ? n() : a.map((r) => r / s);
}
const ut = (e) => cs(e.children.length, e.sizes), tt = (e) => {
  const t = ee(e) ? e.panels.length : e.children.length;
  return e.places?.length === t ? e.places : void 0;
};
function Le(e) {
  if (ee(e)) return fp(e);
  if (ue(e)) {
    const i = e.frames.flatMap((l) => {
      const c = Le(l.node);
      return Ra(c) ? [] : [c === l.node ? l : { ...l, node: c }];
    });
    return i.length === e.frames.length && i.every((l, c) => l === e.frames[c]) ? e : { ...e, frames: i };
  }
  if (e.children.length === 0) return e;
  const t = ut(e), n = tt(e), a = [], s = [], r = [];
  e.children.forEach((i, l) => {
    const c = Le(i), u = t[l] ?? 0;
    if (Ra(c)) return;
    if (!n && jt(c) && c.direction === e.direction && !tt(c) && !Et(c)) {
      const k = ut(c);
      c.children.forEach((g, _) => {
        a.push(g), s.push(u * (k[_] ?? 0));
      });
      return;
    }
    a.push(c), s.push(u);
    const m = n?.[l];
    m && r.push(m);
  });
  const o = a[0];
  return a.length === 1 && o && !Et(e) ? o : {
    kind: "split",
    direction: e.direction,
    children: a,
    sizes: cs(a.length, s),
    ...Ae(e),
    ...r.length === a.length && r.length > 0 ? { places: r } : {}
  };
}
function fp(e) {
  if (e.panels.every($e)) return e;
  const t = Fe(e), n = tt(e), a = [], s = [];
  e.panels.forEach((i, l) => {
    const c = n?.[l];
    if ($e(i)) {
      a.push(i), c && s.push(c);
      return;
    }
    const u = Le(i);
    if (!Ra(u)) {
      if (ee(u) && !Et(u) && !tt(u)) {
        a.push(...u.panels);
        return;
      }
      a.push(u), c && s.push(c);
    }
  });
  const r = a[0];
  if (a.length === 1 && r !== void 0 && !$e(r) && !Et(e))
    return r;
  if (a.length === e.panels.length && a.every((i, l) => i === e.panels[l]))
    return e;
  const o = t && a.some((i) => wn(i).includes(t)) ? t : void 0;
  return {
    kind: "group",
    panels: a,
    ...o ? { active: o } : {},
    ...Ae(e),
    ...s.length === a.length && s.length > 0 ? { places: s } : {}
  };
}
function xt(e, t) {
  if (ue(e)) {
    const o = e.frames.flatMap((i) => {
      const l = xt(i.node, t);
      return l ? [l === i.node ? i : { ...i, node: l }] : [];
    });
    return o.length === 0 && !La(e) ? null : { ...e, frames: o };
  }
  if (ee(e)) {
    if (!_e(e, t)) return e;
    const o = Tt(e), i = [];
    for (const u of e.panels) {
      if ($e(u)) {
        u !== t && i.push(u);
        continue;
      }
      const m = xt(u, t);
      m && i.push(m);
    }
    if (i.length === 0) return null;
    const c = e.active && i.some((u) => wn(u).includes(e.active)) ? e.active : Fe(i[o] ?? i[i.length - 1]);
    return c ? { kind: "group", panels: i, active: c, ...Ae(e) } : { kind: "group", panels: i, ...Ae(e) };
  }
  const n = ut(e), a = [], s = [];
  if (e.children.forEach((o, i) => {
    const l = xt(o, t);
    l && (a.push(l), s.push(n[i] ?? 0));
  }), a.length === 0)
    return La(e) ? { kind: "split", direction: e.direction, children: a, sizes: [], ...Ae(e) } : null;
  const r = a[0];
  return a.length === 1 && r && !Et(e) ? r : Le({
    kind: "split",
    direction: e.direction,
    children: a,
    sizes: s,
    ...Ae(e)
  });
}
function rl(e, t, n) {
  const a = e.panels.filter((r) => r !== t), s = n === void 0 ? a.length : Math.max(0, Math.min(n, a.length));
  return a.splice(s, 0, t), { kind: "group", panels: a, active: t, ...Ae(e) };
}
function Yt(e, t, n, a, s) {
  const r = (g) => _n(
    g,
    (_) => _e(_, n) ? Yt(_, t, n, a, s) : _
  );
  if (a === "float") return e;
  const o = (g) => kn(g, n, (_) => Yt(_, t, n, a, s));
  if (a === "center")
    return ee(e) ? Xe(e, n) ? rl(e, t, s) : o(e) : ue(e) ? r(e) : {
      ...e,
      children: e.children.map(
        (g) => _e(g, n) ? Yt(g, t, n, a, s) : g
      )
    };
  const i = ap(a), l = a === "left" || a === "top", c = (g) => ({
    kind: "split",
    direction: i,
    children: l ? [Je(t), g] : [g, Je(t)],
    sizes: [0.5, 0.5]
  });
  if (ee(e)) return Xe(e, n) ? c(e) : o(e);
  if (ue(e)) return r(e);
  const u = ut(e), m = e.children.findIndex(
    (g) => ee(g) && Xe(g, n)
  );
  if (m >= 0 && e.direction === i) {
    const g = (u[m] ?? 0) / 2, _ = [...e.children], y = [...u];
    return _.splice(l ? m : m + 1, 0, Je(t)), y.splice(m, 1, g, g), {
      kind: "split",
      direction: i,
      children: _,
      sizes: y,
      ...Ae(e)
    };
  }
  const k = e.children.map((g) => _e(g, n) ? ee(g) && Xe(g, n) ? c(g) : Yt(g, t, n, a) : g);
  return {
    kind: "split",
    direction: e.direction,
    children: k,
    sizes: u,
    ...Ae(e)
  };
}
function Bt(e, t) {
  if (ee(e)) {
    if (Xe(e, t))
      return el(e) === t ? e : { ...e, active: t };
    const s = e.panels.findIndex((l) => !$e(l) && _e(l, t)), r = e.panels[s];
    if (r === void 0 || $e(r)) return e;
    const o = Bt(r, t);
    if (o === r && e.active === t) return e;
    const i = [...e.panels];
    return i[s] = o, { ...e, panels: i, active: t };
  }
  if (!_e(e, t)) return e;
  if (ue(e)) return _n(e, (s) => Bt(s, t));
  let n = !1;
  const a = e.children.map((s) => {
    const r = Bt(s, t);
    return r !== s && (n = !0), r;
  });
  return n ? { ...e, children: a } : e;
}
function an(e, t, n) {
  if (ee(e)) {
    if (!Xe(e, t)) return kn(e, t, (c) => an(c, t, n));
    const a = e.panels.indexOf(t), s = Math.max(0, Math.min(n, e.panels.length - 1));
    if (a === s) return e;
    const r = [...e.panels];
    r.splice(a, 1), r.splice(s, 0, t);
    const o = tt(e), i = o ? [...o] : void 0;
    i && i.splice(s, 0, ...i.splice(a, 1));
    const l = Fe(e);
    return {
      kind: "group",
      panels: r,
      ...l ? { active: l } : {},
      ...Ae(e),
      ...i ? { places: i } : {}
    };
  }
  return _e(e, t) ? ue(e) ? _n(e, (a) => an(a, t, n)) : { ...e, children: e.children.map((a) => an(a, t, n)) } : e;
}
function An(e, t, n) {
  if (t === n) return e;
  if (ee(e)) {
    if (!_e(e, t) && !_e(e, n)) return e;
    const a = (r) => r === t ? n : r === n ? t : r, s = e.panels.map((r) => $e(r) ? a(r) : An(r, t, n));
    return { ...e, panels: s, ...e.active ? { active: a(e.active) } : {} };
  }
  return ue(e) ? _n(e, (a) => An(a, t, n)) : { ...e, children: e.children.map((a) => An(a, t, n)) };
}
function Cn(e, t, n, a, s) {
  if (a === "float" || !_e(e, t) || !_e(e, n)) return e;
  const r = Ft(e, t);
  if (a === "center" && r && Xe(r, n)) {
    if (s === void 0) return e;
    const i = r.panels.indexOf(t), l = s > i ? s - 1 : s;
    return l === i ? e : Bt(an(e, t, l), t);
  }
  if (t === n) return e;
  const o = xt(e, t);
  return o ? Le(Yt(o, t, n, a, s)) : e;
}
function ll(e, t, n) {
  if (ee(e)) {
    const s = e.panels[t];
    if (s === void 0 || $e(s)) return e;
    const r = [...e.panels];
    return r[t] = n, { ...e, panels: r };
  }
  if (ue(e)) {
    const s = e.frames[t];
    if (!s) return e;
    const r = [...e.frames];
    return r[t] = { ...s, node: n }, { ...e, frames: r };
  }
  const a = [...e.children];
  return a[t] = n, { ...e, children: a };
}
function bn(e, t, n) {
  const a = ta(e);
  if (!ee(e) && a.some(({ node: s }) => ee(s) && Xe(s, t))) {
    const s = n(e);
    return s === e ? null : s;
  }
  for (const { node: s, index: r } of a) {
    if (!_e(s, t)) continue;
    const o = bn(s, t, n);
    return o ? ll(e, r, o) : null;
  }
  return null;
}
function uh(e, t, n) {
  const a = bn(
    e,
    t,
    (s) => jt(s) && s.direction !== n ? { ...s, direction: n } : s
  );
  return a ? Le(a) : e;
}
function ol(e) {
  return ue(e) ? [e] : tt(e) || Et(e) ? [e] : ee(e) ? [...e.panels] : e.children.flatMap(ol);
}
function il(e, t) {
  if (ee(e)) return e;
  const n = os(e).map(ol), a = n.flat(), s = t && a.some((o) => wn(o).includes(t)) ? t : void 0, r = pp(e, n);
  return Le({
    kind: "group",
    panels: a,
    ...s ? { active: s } : {},
    ...Ae(e),
    ...r ? { places: r } : {}
  });
}
function pp(e, t) {
  const n = ue(e) ? e.frames.map(({ node: a, ...s }) => s) : tt(e);
  if (n)
    return t.every((a) => a.length === 1) ? n : void 0;
}
function vp(e, t) {
  const n = bn(e, t, (a) => il(a, t));
  return n ? Le(n) : e;
}
function us(e, t, n) {
  if (ee(e) && Xe(e, t)) {
    const a = n(e);
    return a === e ? null : a;
  }
  for (const { node: a, index: s } of ta(e)) {
    if (!_e(a, t)) continue;
    const r = us(a, t, n);
    return r ? ll(e, s, r) : null;
  }
  return null;
}
function Gs(e, t, n) {
  const a = us(e, t, (s) => {
    if (s.panels.length < 2) return s;
    const r = tt(s);
    return {
      ...rs(n, s.panels.map(ns)),
      ...Ae(s),
      ...r ? { places: r } : {}
    };
  });
  return a ? Le(a) : e;
}
function Ia(e, t) {
  if (ee(e)) return e;
  if (ue(e)) {
    const s = e.frames.findIndex(
      (i) => ee(i.node) && i.node.panels.includes(t)
    ), r = e.frames[s], o = r && ee(r.node) ? r.node : null;
    if (r && o && o.panels.length > 1) {
      const i = ss(o.panels.map(ns), r.rect).frames;
      return {
        ...e,
        frames: [...e.frames.slice(0, s), ...i, ...e.frames.slice(s + 1)]
      };
    }
    return _n(e, (i) => Ia(i, t));
  }
  if (!_e(e, t)) return e;
  let n = !1;
  const a = e.children.map((s) => {
    const r = Ia(s, t);
    return r !== s && (n = !0), r;
  });
  return n ? { ...e, children: a } : e;
}
function hp(e, t, n) {
  const a = Ft(e, t);
  if (!a || a.panels.length < 2) return e;
  if (Ie(e, t)?.node === a) {
    const o = Ia(e, t);
    return o === e ? e : Le(o);
  }
  const r = us(e, t, (o) => ({
    ...as(cl(o.panels.map(ns), tt(o), n)),
    ...Ae(o)
  }));
  return r ? Le(r) : e;
}
function cl(e, t, n) {
  return t ? e.map((a, s) => ({ ...t[s], node: a })) : ss(e, n).frames;
}
function ul(e, t) {
  return { ...as(cl(e.children, tt(e), t)), ...Ae(e) };
}
function dh(e, t, n) {
  const a = bn(
    e,
    t,
    (s) => ue(s) ? s : ul(s, n)
  );
  return a ? Le(a) : ee(e) && Xe(e, t) ? ss([e], n) : e;
}
function mp(e, t) {
  const n = (s) => t === "column" ? s.rect.y : s.rect.x, a = (s) => t === "column" ? s.rect.x : s.rect.y;
  return [...e].sort((s, r) => n(s) - n(r) || a(s) - a(r));
}
function dl(e, t) {
  const n = mp(e.frames, t);
  return {
    kind: "split",
    direction: t,
    children: n.map((a) => a.node),
    ...Ae(e),
    places: n.map(({ node: a, ...s }) => s)
  };
}
function fh(e, t, n = "row") {
  const a = bn(
    e,
    t,
    (s) => ue(s) ? dl(s, n) : s
  );
  return a ? Le(a) : e;
}
function fl(e) {
  if (ue(e)) return null;
  const t = ee(e) ? e.panels.length === 1 ? e.panels[0] : void 0 : e.children.length === 1 ? e.children[0] : void 0;
  return t === void 0 || $e(t) || ee(t) && t.panels.length === 1 && $e(t.panels[0]) ? null : t;
}
const gp = (e) => {
  const { title: t, fixedView: n, headless: a, ...s } = e;
  return s;
};
function yp(e, t) {
  const n = fl(e);
  return n ? t === "inner" ? n : { ...gp(n), ...Ae(e) } : e;
}
function Vt(e) {
  return e.title ? e.title : ee(e) ? "" : ue(e) ? "Desktop" : e.direction === "row" ? "Row" : "Column";
}
function sn(e, t) {
  if (ee(e)) {
    const a = e.panels[Tt(e)];
    return a === void 0 ? "" : $e(a) ? t(a) ?? a : Vt(a) || sn(a, t);
  }
  if (e.title) return e.title;
  if (ue(e)) {
    const a = e.frames[e.frames.length - 1];
    return a ? a.title ?? sn(a.node, t) : "";
  }
  const n = e.children[0];
  return n ? sn(n, t) : "";
}
function gt(e, t) {
  let n = e;
  for (const a of t) {
    if (!n) return null;
    if (jt(n)) n = n.children[a];
    else if (ue(n)) n = n.frames[a]?.node;
    else {
      const s = n.panels[a];
      n = s === void 0 || $e(s) ? void 0 : s;
    }
  }
  return n ?? null;
}
function Ct(e, t, n) {
  if (t.length === 0) return n;
  const [a, ...s] = t;
  if (a === void 0) return e;
  if (ue(e)) {
    const l = e.frames[a];
    if (!l) return e;
    const c = Ct(l.node, s, n);
    if (c === l.node) return e;
    const u = [...e.frames];
    return u[a] = { ...l, node: c }, { ...e, frames: u };
  }
  if (ee(e)) {
    const l = e.panels[a];
    if (l === void 0 || $e(l)) return e;
    const c = Ct(l, s, n);
    if (c === l) return e;
    const u = [...e.panels];
    return u[a] = c, { ...e, panels: u };
  }
  const r = e.children[a];
  if (!r) return e;
  const o = Ct(r, s, n);
  if (o === r) return e;
  const i = [...e.children];
  return i[a] = o, { ...e, children: i };
}
function Tn(e, t, n) {
  if (t.length === 0)
    return jt(e) ? { ...e, sizes: cs(e.children.length, n) } : e;
  const [a, ...s] = t;
  if (a === void 0) return e;
  if (ue(e)) {
    const i = e.frames[a];
    if (!i) return e;
    const l = Tn(i.node, s, n);
    if (l === i.node) return e;
    const c = [...e.frames];
    return c[a] = { ...i, node: l }, { ...e, frames: c };
  }
  if (ee(e)) {
    const i = e.panels[a];
    if (i === void 0 || $e(i)) return e;
    const l = Tn(i, s, n);
    if (l === i) return e;
    const c = [...e.panels];
    return c[a] = l, { ...e, panels: c };
  }
  const r = e.children[a];
  if (!r) return e;
  const o = [...e.children];
  return o[a] = Tn(r, s, n), { ...e, children: o };
}
function Qs(e, t, n, a = 0.02) {
  const s = e[t], r = e[t + 1];
  if (s === void 0 || r === void 0) return e;
  const o = s + r;
  if (o < a * 2) return e;
  const i = [...e], l = Math.min(Math.max(s + n, a), o - a);
  return i[t] = l, i[t + 1] = o - l, i;
}
function Vn(e) {
  if (!ee(e) || e.panels.length >= 2) return e;
  const t = e.panels[0];
  return t !== void 0 && !$e(t) ? e : { ...ls([_p(e)]), ...Ae(e) };
}
const _p = (e) => {
  if (!e.title) return e;
  const { title: t, ...n } = e;
  return n;
};
function Xs(e) {
  return e.length === 0 ? null : ls(e.map(Je));
}
function wp(e, t) {
  if (!e) return Xs(t);
  const n = new Set(t), a = /* @__PURE__ */ new Set(), s = /* @__PURE__ */ new Set();
  for (const l of Ye(e))
    !n.has(l) || a.has(l) ? s.add(l) : a.add(l);
  let r = e;
  for (const l of s)
    r = r ? xt(r, l) : null;
  const o = new Set(r ? Ye(r) : []), i = t.filter((l) => !o.has(l));
  if (i.length === 0) return r ? Vn(Le(r)) : null;
  if (!r) return Xs(i);
  if (ue(r)) {
    const l = r.frames.length;
    return {
      ...r,
      frames: [
        ...r.frames,
        ...i.map(
          (c, u) => ea(Je(c), {
            x: $t.x + (l + u) * Hn,
            y: $t.y + (l + u) * Hn
          })
        )
      ]
    };
  }
  return Vn(Le(ls([r, ...i.map(Je)])));
}
const ds = Symbol("dc.windowContext");
function kp(e) {
  return cn(ds, e), e;
}
function na() {
  const e = St(ds, null);
  if (!e)
    throw new Error(
      "[header-content-layout] No window context found. Render this component inside <WindowFrame>."
    );
  return e;
}
const bp = 320, $p = 240;
function xp(e) {
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
function Cp(e, t) {
  if (typeof window > "u") return null;
  const n = Math.max(bp, Math.round(t?.width ?? window.innerWidth)), a = Math.max($p, Math.round(t?.height ?? window.innerHeight)), s = ["popup", `width=${n}`, `height=${a}`];
  t?.left !== void 0 && s.push(`left=${t.left}`), t?.top !== void 0 && s.push(`top=${t.top}`);
  const r = window.open(e, "_blank", s.join(","));
  if (r)
    try {
      r.opener = null;
    } catch {
    }
  return r;
}
const Sp = ["data-dc-glyph"], Mp = { class: "dc-glyph__line" }, Ep = ["d"], Pp = {
  key: 0,
  class: "dc-glyph__aqua"
}, Ap = ["d"], Tp = /* @__PURE__ */ te({
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
      C("g", Mp, [
        (d(!0), v(Z, null, de(t[e.kind], (r) => (d(), v("path", {
          key: r,
          d: r
        }, null, 8, Ep))), 128))
      ]),
      n[e.kind] ? (d(), v("g", Pp, [
        (d(!0), v(Z, null, de(n[e.kind], (r) => (d(), v("path", {
          key: r,
          d: r
        }, null, 8, Ap))), 128))
      ])) : A("", !0)
    ], 8, Sp));
  }
}), Dt = /* @__PURE__ */ re(Tp, [["__scopeId", "data-v-4d2872c0"]]), Lp = ["data-dc-order", "data-dc-path", "data-dc-maximized", "data-dc-minimized", "data-dc-dragging"], Rp = ["data-dc-movable"], zp = { class: "dc-float__title dc-truncate" }, Ip = {
  key: 1,
  class: "dc-float__controls dc-controls"
}, Op = ["aria-label", "aria-pressed", "data-dc-minimize"], Fp = ["aria-label", "aria-pressed", "data-dc-maximize"], Np = ["aria-label", "data-dc-close"], Bp = { class: "dc-float__content" }, Dp = ["data-dc-handle", "onPointerdown"], qp = /* @__PURE__ */ te({
  __name: "WindowFloat",
  props: {
    frame: {},
    path: {},
    order: {},
    place: {}
  },
  setup(e) {
    const t = e, n = na(), a = p(() => Fe(t.frame.node)), s = p(() => n.panelFor(a.value)?.fixed === !0), r = p(() => ht(t.frame)), o = p(() => bt(t.frame)), i = p(() => r.value || o.value), l = p(() => n.resizable.value && !s.value && !i.value), c = p(() => n.movable.value && !s.value && !i.value), u = p(() => {
      const T = Ye(t.frame.node);
      return T.length === 1 ? T[0] ?? null : null;
    }), m = p(() => u.value !== null && n.closable(u.value)), k = p(() => t.frame.node.headless === !0), g = p(
      () => !k.value && (!ee(t.frame.node) || o.value)
    ), _ = p(
      () => t.frame.title || Vt(t.frame.node) || sn(t.frame.node, (T) => n.panelFor(T)?.title)
    ), y = p(() => n.spaceMenu(t.path));
    function $(T) {
      T.target?.closest("button, a, input, select, textarea, label") || n.beginFrameDragAt(t.path, T, "move");
    }
    function x(T) {
      T.target?.closest("button, a, input, select, textarea, label") || (o.value ? n.toggleMinimizeAt(t.path) : n.toggleMaximizeAt(t.path));
    }
    const M = p(() => {
      const T = n.framing.value;
      return T !== null && _e(t.frame.node, T);
    }), b = p(() => ({
      // Neither maximizing nor rolling up overwrites the rect: it is where the
      // window goes back to, and both are a way of not being there for a while.
      ...r.value ? { inset: "0" } : o.value && t.place ? {
        left: `${t.place.x}px`,
        bottom: `${t.place.bottom}px`,
        width: `${Ta}px`,
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
    return (T, N) => (d(), v("div", {
      class: "dc-float",
      style: Se(b.value),
      "data-dc-order": e.order,
      "data-dc-path": e.path.join("/"),
      "data-dc-maximized": r.value ? "true" : "false",
      "data-dc-minimized": o.value ? "true" : "false",
      "data-dc-dragging": M.value ? "true" : "false",
      onPointerdown: N[3] || (N[3] = (L) => P(n).raiseAt(e.path))
    }, [
      g.value ? (d(), v("header", {
        key: 0,
        class: "dc-float__bar",
        "data-dc-movable": c.value ? "true" : "false",
        onPointerdown: $,
        onDblclick: x
      }, [
        C("span", zp, R(_.value), 1),
        y.value.length ? (d(), G(ts, {
          key: 0,
          items: y.value,
          label: `${_.value} menu`
        }, null, 8, ["items", "label"])) : A("", !0),
        !s.value || o.value && m.value && u.value ? (d(), v("div", Ip, [
          s.value ? A("", !0) : (d(), v("button", {
            key: 0,
            type: "button",
            class: "dc-float__button dc-control",
            "aria-label": `${o.value ? "Unroll" : "Minimize"} ${_.value}`,
            "aria-pressed": o.value,
            "data-dc-minimize": a.value,
            onClick: N[0] || (N[0] = (L) => P(n).toggleMinimizeAt(e.path))
          }, [
            oe(Dt, {
              kind: o.value ? "unroll" : "minimize"
            }, null, 8, ["kind"])
          ], 8, Op)),
          s.value ? A("", !0) : (d(), v("button", {
            key: 1,
            type: "button",
            class: "dc-float__button dc-control",
            "aria-label": `${r.value ? "Restore" : "Maximize"} ${_.value}`,
            "aria-pressed": r.value,
            "data-dc-maximize": a.value,
            onClick: N[1] || (N[1] = (L) => P(n).toggleMaximizeAt(e.path))
          }, [
            oe(Dt, {
              kind: r.value ? "restore" : "maximize"
            }, null, 8, ["kind"])
          ], 8, Fp)),
          o.value && m.value && u.value ? (d(), v("button", {
            key: 2,
            type: "button",
            class: "dc-float__button dc-control",
            "aria-label": `Close ${_.value}`,
            "data-dc-close": u.value,
            onClick: N[2] || (N[2] = (L) => P(n).close(u.value))
          }, [
            oe(Dt, { kind: "close" })
          ], 8, Np)) : A("", !0)
        ])) : A("", !0)
      ], 40, Rp)) : A("", !0),
      C("div", Bp, [
        ye(T.$slots, "default", {}, void 0, !0)
      ]),
      (d(!0), v(Z, null, de(l.value ? S : [], (L) => (d(), v("span", {
        key: L,
        class: "dc-float__grip",
        "data-dc-handle": L,
        "aria-hidden": "true",
        onPointerdown: Ve((z) => P(n).beginFrameDragAt(e.path, z, L), ["stop"])
      }, null, 40, Dp))), 128))
    ], 44, Lp));
  }
}), Hp = /* @__PURE__ */ re(qp, [["__scopeId", "data-v-f035684c"]]), fs = Symbol("dc.paneContext");
function pl(e) {
  return cn(fs, e), e;
}
function ph() {
  return St(fs, null);
}
function vh(e) {
  const t = St(ds, null), n = St(fs, null);
  if (!t || !n) return () => {
  };
  const a = t.registerMenu(
    () => n.panel.value,
    () => it(e)
  );
  return Kn() && Kt(a), a;
}
const Vp = ["data-dc-panel"], Kp = /* @__PURE__ */ te({
  __name: "WindowPaneBody",
  props: {
    panel: {},
    active: { type: Boolean }
  },
  setup(e) {
    const t = e, n = na();
    pl({ panel: p(() => t.panel) });
    const a = () => {
      const s = n.panelFor(t.panel);
      return s ? n.renderContent(s, n.viewFor(t.panel), t.active) ?? null : null;
    };
    return (s, r) => (d(), v("div", {
      class: "dc-pane__content",
      "data-dc-panel": t.panel
    }, [
      oe(a)
    ], 8, Vp));
  }
}), Wp = /* @__PURE__ */ re(Kp, [["__scopeId", "data-v-31c655fd"]]), jp = ["data-dc-panel", "data-dc-panels", "data-dc-tabbed", "data-dc-floating", "data-dc-maximized", "data-dc-headless", "data-dc-active", "data-dc-dragging", "aria-label"], Up = ["data-dc-movable"], Gp = ["aria-label", "aria-pressed"], Qp = ["data-dc-space-name"], Xp = { class: "dc-truncate" }, Yp = ["aria-label"], Zp = {
  key: 0,
  class: "dc-pane__insert",
  "aria-hidden": "true"
}, Jp = ["id", "data-dc-panel", "data-dc-space", "aria-selected", "aria-controls", "tabindex", "onPointerdown", "onClick", "onKeydown"], ev = { class: "dc-tab__name dc-truncate" }, tv = {
  key: 0,
  class: "dc-pane__sub dc-mono dc-truncate"
}, nv = ["aria-label", "data-dc-close", "onClick"], av = {
  key: 0,
  class: "dc-pane__insert",
  "aria-hidden": "true"
}, sv = { class: "dc-pane__tools" }, rv = {
  key: 2,
  class: "dc-pane__controls dc-controls"
}, lv = ["aria-label", "data-dc-minimize"], ov = ["aria-label", "aria-pressed", "data-dc-maximize"], iv = ["aria-label", "data-dc-close"], cv = ["id", "role", "aria-labelledby"], uv = ["id", "role", "aria-labelledby"], dv = ["data-dc-edge"], fv = /* @__PURE__ */ te({
  __name: "WindowPane",
  props: {
    group: {},
    path: {}
  },
  setup(e) {
    const t = e, n = na(), a = dn() ?? "dc-pane", s = p(
      () => t.group.panels.flatMap((K, X) => {
        if (!$e(K)) {
          const Oe = Vt(K) || sn(K, (De) => n.panelFor(De)?.title);
          return [{ kind: "space", index: X, id: `space-${X}`, title: Oe, node: K }];
        }
        const ne = n.panelFor(K);
        return ne ? [{ kind: "panel", index: X, id: K, title: ne.title, panel: ne }] : [];
      })
    ), r = p(() => s.value.length > 1), o = p(() => {
      const K = Tt(t.group);
      return s.value.find((X) => X.index === K) ?? s.value[0] ?? null;
    }), i = p(() => o.value?.kind === "space" ? o.value.node : null), l = p(() => i.value ? "" : el(t.group)), c = p(() => i.value ? null : n.panelFor(l.value)), u = p(() => o.value?.title ?? ""), m = p(() => n.spaceNames.value ? t.group.title ?? "" : ""), k = p(() => [...t.path, o.value?.index ?? 0]), g = p(() => l.value || Vs(t.group)[0] || ""), _ = p(() => n.viewFor(l.value)), y = p(() => t.group.headless === !0), $ = p(() => n.focused.value === l.value), x = p(() => n.dragging.value === l.value), M = p(() => n.moving.value === l.value), b = p(() => n.frameOf(g.value) !== null), S = p(() => n.panelFor(g.value)?.fixed === !0), T = p(
      () => !i.value && (n.canMove(l.value) || b.value && n.movable.value && !S.value)
    ), N = p(
      () => i.value ? n.spaceMenu(k.value) : n.menuFor(l.value)
    ), L = (K) => n.closable(K);
    pl({ panel: l });
    const z = p(() => n.maximized(g.value)), E = p(
      () => b.value && !S.value || !r.value && !!c.value && L(c.value.id)
    ), H = (K) => `${a}-tab-${K}`, q = p(() => `${a}-body`), Q = p(() => {
      const K = n.dropTarget.value;
      return !K || !Xe(t.group, K.panel) || K.edge === "float" ? null : K;
    }), ve = p(() => Q.value?.index === void 0 ? Q.value?.edge ?? null : null), fe = p(() => Q.value?.index ?? null), Be = p(
      () => s.value.flatMap(
        (K) => K.kind === "panel" && (K.id === l.value || K.panel.keepAlive === !0) ? [K.id] : []
      )
    ), D = B(null), j = /* @__PURE__ */ new Map();
    be(
      l,
      (K, X) => {
        const ne = D.value;
        if (!ne || (X && j.set(X, ne.scrollTop), !n.panelFor(K)?.keepAlive || !j.has(K))) return;
        const Oe = j.get(K);
        ft(() => {
          D.value && (D.value.scrollTop = Oe);
        });
      },
      { flush: "pre" }
    );
    const me = () => c.value ? n.renderActions(c.value, _.value, $.value) ?? null : null;
    let le = null;
    function xe(K) {
      const X = le !== null && Math.hypot(K.clientX - le.x, K.clientY - le.y) >= 4;
      return le = null, X;
    }
    const Me = (K) => K.kind === "panel" ? K.id : Fe(K.node);
    function Re(K, X) {
      X.kind !== "space" && (n.focus(X.id), le = { x: K.clientX, y: K.clientY }, n.beginDrag(X.id, K));
    }
    function Ue(K, X) {
      if (xe(K)) return;
      const ne = Me(X);
      ne && n.selectPanel(ne);
    }
    function O(K) {
      l.value && n.focus(l.value), !K.target?.closest(".dc-tab, button, a, input, select, textarea, label") && (b.value ? n.beginFrameDrag(g.value, K, "move") : n.beginDrag(l.value, K));
    }
    function ae(K) {
      le = { x: K.clientX, y: K.clientY }, n.beginDrag(l.value, K);
    }
    function pe(K) {
      xe(K) || n.toggleMoveMode(l.value);
    }
    const We = {
      ArrowLeft: "left",
      ArrowRight: "right",
      ArrowUp: "up",
      ArrowDown: "down"
    };
    function V(K) {
      if (!M.value) return;
      if (K.key === "Escape") {
        K.preventDefault(), n.toggleMoveMode(l.value);
        return;
      }
      const X = We[K.key];
      X && (K.preventDefault(), b.value ? n.nudgeFrame(l.value, X, K.shiftKey) : n.nudge(l.value, X, K.shiftKey));
    }
    function J(K) {
      !b.value || K.target?.closest(".dc-tab, button, a, input, select, textarea, label") || n.toggleMaximize(g.value);
    }
    function Y(K, X) {
      K.stopPropagation(), le = null, n.close(X);
    }
    function Ge(K, X) {
      const ne = s.value.length;
      let Oe = null;
      if (K.key === "ArrowRight" ? Oe = (X + 1) % ne : K.key === "ArrowLeft" ? Oe = (X - 1 + ne) % ne : K.key === "Home" ? Oe = 0 : K.key === "End" && (Oe = ne - 1), Oe === null) return;
      K.preventDefault();
      const De = s.value[Oe];
      if (!De) return;
      const Ut = Me(De);
      Ut && n.selectPanel(Ut);
    }
    return (K, X) => o.value ? (d(), v("section", {
      key: 0,
      class: "dc-pane",
      "data-dc-panel": l.value || void 0,
      "data-dc-panels": P(Vs)(e.group).join(" ") || void 0,
      "data-dc-tabbed": r.value ? "true" : "false",
      "data-dc-floating": b.value ? "true" : "false",
      "data-dc-maximized": z.value ? "true" : "false",
      "data-dc-headless": y.value ? "true" : "false",
      "data-dc-active": $.value ? "true" : "false",
      "data-dc-dragging": x.value ? "true" : "false",
      "aria-label": u.value,
      onFocusin: X[7] || (X[7] = (ne) => l.value && P(n).focus(l.value))
    }, [
      y.value ? A("", !0) : (d(), v("header", {
        key: 0,
        class: "dc-pane__head",
        "data-dc-movable": T.value ? "true" : "false",
        onPointerdown: O,
        onDblclick: J
      }, [
        T.value ? (d(), v("button", {
          key: 0,
          type: "button",
          class: "dc-pane__grip",
          "aria-label": `Move ${u.value}`,
          "aria-pressed": M.value,
          onPointerdown: ae,
          onClick: pe,
          onKeydown: V
        }, [...X[8] || (X[8] = [
          C("span", { "aria-hidden": "true" }, "⠿", -1)
        ])], 40, Gp)) : A("", !0),
        m.value ? (d(), v("span", {
          key: 1,
          class: "dc-pane__name",
          "data-dc-space-name": m.value
        }, [
          C("span", Xp, R(m.value), 1)
        ], 8, Qp)) : A("", !0),
        C("div", {
          class: "dc-pane__tabs",
          role: "tablist",
          "aria-label": `${u.value} panels`
        }, [
          (d(!0), v(Z, null, de(s.value, (ne, Oe) => (d(), v(Z, {
            key: ne.id
          }, [
            fe.value === Oe ? (d(), v("span", Zp)) : A("", !0),
            C("button", {
              id: H(ne.id),
              type: "button",
              role: "tab",
              class: "dc-tab",
              "data-dc-panel": ne.kind === "panel" ? ne.id : void 0,
              "data-dc-space": ne.kind === "space" ? ne.title : void 0,
              "aria-selected": ne.index === o.value.index,
              "aria-controls": q.value,
              tabindex: ne.index === o.value.index ? 0 : -1,
              onPointerdown: (De) => Re(De, ne),
              onClick: (De) => Ue(De, ne),
              onKeydown: (De) => Ge(De, Oe)
            }, [
              C("span", ev, R(ne.title), 1),
              ne.kind === "panel" && ne.panel.subtitle ? (d(), v("span", tv, R(ne.panel.subtitle), 1)) : A("", !0),
              r.value && ne.kind === "panel" && L(ne.id) ? (d(), v("span", {
                key: 1,
                class: "dc-tab__close",
                role: "button",
                tabindex: "-1",
                "aria-label": `Close ${ne.title}`,
                "data-dc-close": ne.id,
                onPointerdown: X[0] || (X[0] = Ve(() => {
                }, ["stop"])),
                onClick: (De) => Y(De, ne.id)
              }, [...X[9] || (X[9] = [
                C("span", { "aria-hidden": "true" }, "×", -1)
              ])], 40, nv)) : A("", !0)
            ], 40, Jp)
          ], 64))), 128)),
          fe.value === s.value.length ? (d(), v("span", av)) : A("", !0)
        ], 8, Yp),
        C("div", sv, [
          oe(me),
          N.value.length ? (d(), G(ts, {
            key: 0,
            items: N.value,
            label: `${u.value} menu`
          }, null, 8, ["items", "label"])) : A("", !0)
        ]),
        E.value ? (d(), v("div", rv, [
          b.value && !S.value ? (d(), v("button", {
            key: 0,
            type: "button",
            class: "dc-pane__button dc-control",
            "aria-label": `Minimize ${u.value}`,
            "data-dc-minimize": g.value,
            onPointerdown: X[1] || (X[1] = Ve(() => {
            }, ["stop"])),
            onClick: X[2] || (X[2] = (ne) => P(n).toggleMinimize(g.value))
          }, [
            oe(Dt, { kind: "minimize" })
          ], 40, lv)) : A("", !0),
          b.value && !S.value ? (d(), v("button", {
            key: 1,
            type: "button",
            class: "dc-pane__button dc-control",
            "aria-label": `${z.value ? "Restore" : "Maximize"} ${u.value}`,
            "aria-pressed": z.value,
            "data-dc-maximize": g.value,
            onPointerdown: X[3] || (X[3] = Ve(() => {
            }, ["stop"])),
            onClick: X[4] || (X[4] = (ne) => P(n).toggleMaximize(g.value))
          }, [
            oe(Dt, {
              kind: z.value ? "restore" : "maximize"
            }, null, 8, ["kind"])
          ], 40, ov)) : A("", !0),
          !r.value && c.value && L(c.value.id) ? (d(), v("button", {
            key: 2,
            type: "button",
            class: "dc-pane__close dc-control",
            "aria-label": `Close ${u.value}`,
            "data-dc-close": c.value.id,
            onPointerdown: X[5] || (X[5] = Ve(() => {
            }, ["stop"])),
            onClick: X[6] || (X[6] = (ne) => P(n).close(c.value.id))
          }, [
            oe(Dt, { kind: "close" })
          ], 40, iv)) : A("", !0)
        ])) : A("", !0)
      ], 40, Up)),
      i.value ? (d(), v("div", {
        key: 1,
        id: q.value,
        class: "dc-pane__space",
        role: y.value ? void 0 : "tabpanel",
        "aria-labelledby": y.value ? void 0 : H(o.value.id)
      }, [
        ye(K.$slots, "space", {
          node: i.value,
          path: k.value
        }, void 0, !0)
      ], 8, cv)) : A("", !0),
      !i.value || Be.value.length ? yt((d(), v("div", {
        key: 2,
        id: i.value ? void 0 : q.value,
        ref_key: "body",
        ref: D,
        class: "dc-pane__body",
        role: y.value || i.value ? void 0 : "tabpanel",
        "aria-labelledby": y.value || i.value ? void 0 : H(l.value)
      }, [
        (d(!0), v(Z, null, de(Be.value, (ne) => yt((d(), G(Wp, {
          key: ne,
          panel: ne,
          active: ne === l.value && $.value
        }, null, 8, ["panel", "active"])), [
          [In, ne === l.value]
        ])), 128))
      ], 8, uv)), [
        [In, !i.value]
      ]) : A("", !0),
      ve.value ? (d(), v("div", {
        key: 3,
        class: "dc-pane__drop",
        "data-dc-edge": ve.value,
        "aria-hidden": "true"
      }, null, 8, dv)) : A("", !0)
    ], 40, jp)) : A("", !0);
  }
}), vl = /* @__PURE__ */ re(fv, [["__scopeId", "data-v-2c3c5ecf"]]), pv = ["data-dc-space", "data-dc-path", "data-dc-bare", "aria-label"], vv = {
  key: 0,
  class: "dc-space__head"
}, hv = { class: "dc-space__title dc-truncate" }, mv = ["data-dc-direction"], gv = {
  key: 0,
  class: "dc-space__drop",
  "aria-hidden": "true"
}, yv = ["aria-orientation", "aria-label", "aria-valuenow", "aria-disabled", "tabindex", "onPointerdown", "onKeydown"], _v = /* @__PURE__ */ te({
  __name: "WindowNode",
  props: {
    node: {},
    path: {},
    framed: { type: Boolean }
  },
  setup(e) {
    const t = e, n = na(), a = B(null), s = p(() => ee(t.node) ? t.node : null), r = p(() => jt(t.node) ? t.node : null), o = p(() => ue(t.node) ? t.node : null), i = p(
      () => r.value ? r.value.children : o.value?.frames.map((D) => D.node) ?? []
    ), l = p(() => r.value ? ut(r.value) : []), c = p(
      () => (o.value?.frames ?? []).map((D, j) => ({
        held: D,
        /** Place in the stack, counted from the back — what `z-index` follows. */
        order: j,
        key: z(D.node),
        path: [...t.path, j]
      })).sort((D, j) => D.key < j.key ? -1 : D.key > j.key ? 1 : 0)
    ), u = p(() => Vt(t.node)), m = p(() => n.spaceMenu(t.path)), k = p(() => t.node.headless === !0), g = p(() => t.path.length === 0 && !n.rootBar.value), _ = p(() => o.value ? "desktop" : r.value?.direction ?? ""), y = B(null), $ = B(0);
    let x = null;
    be(
      y,
      (D) => {
        x?.disconnect(), x = null, !(!D || typeof ResizeObserver > "u") && ($.value = D.clientWidth, x = new ResizeObserver(([j]) => {
          $.value = j?.contentRect.width ?? 0;
        }), x.observe(D));
      },
      { immediate: !0 }
    ), Ke(() => x?.disconnect());
    const M = p(() => {
      const D = Math.max(
        1,
        Math.floor(($.value + Rt) / (Ta + Rt))
      ), j = /* @__PURE__ */ new Map();
      let me = 0;
      for (const le of c.value)
        le.held.minimized === !0 && (j.set(le.key, {
          x: Rt + me % D * (Ta + Rt),
          bottom: Rt + Math.floor(me / D) * (Zr + Rt)
        }), me += 1);
      return j;
    }), b = (D) => !!D && D.join("/") === t.path.join("/"), S = p(() => {
      const D = n.dropTarget.value, j = o.value;
      if (!j || !D?.rect || D.edge !== "float") return null;
      if (D.space) return b(D.space) ? D.rect : null;
      const me = Ie(j, D.panel);
      return me && j.frames.includes(me) ? D.rect : null;
    }), T = p(() => {
      const D = n.dropTarget.value;
      return !!D && !D.rect && b(D.space);
    }), N = p(() => r.value?.direction === "row"), L = p(() => i.value.map((D, j) => [...t.path, j])), z = (D) => [...Ye(D)].sort().join("/"), E = (D) => {
      const j = Ye(D)[0];
      return (j ? n.panelFor(j)?.title : null) ?? j ?? "panel";
    }, H = (D) => {
      const j = i.value[D], me = i.value[D + 1];
      return !j || !me ? "Resize panels" : `Resize ${E(j)} and ${E(me)}`;
    }, q = (D) => {
      const j = l.value[D] ?? 0, me = l.value[D + 1] ?? 0, le = j + me;
      return le > 0 ? Math.round(j / le * 100) : 50;
    };
    function Q() {
      const D = a.value, j = D ? N.value ? D.clientWidth : D.clientHeight : 0;
      return j <= 0 ? 0.05 : Math.min(n.minPanelSize.value / j, 0.4);
    }
    let ve = null;
    function fe(D, j) {
      const me = r.value, le = a.value;
      if (!n.resizable.value || !me || !le || D.button !== 0) return;
      const xe = N.value ? le.clientWidth : le.clientHeight;
      if (xe <= 0) return;
      const Me = N.value ? D.clientX : D.clientY, Re = ut(me), Ue = Math.min(n.minPanelSize.value / xe, 0.4);
      D.preventDefault();
      const O = (We) => {
        const V = ((N.value ? We.clientX : We.clientY) - Me) / xe;
        n.setSizes(t.path, Qs(Re, j, V, Ue));
      }, ae = () => ve?.(), pe = (We) => {
        We.key === "Escape" && (n.setSizes(t.path, Re), ve?.());
      };
      ve = () => {
        window.removeEventListener("pointermove", O), window.removeEventListener("pointerup", ae), window.removeEventListener("pointercancel", ae), window.removeEventListener("keydown", pe), ve = null;
      }, window.addEventListener("pointermove", O), window.addEventListener("pointerup", ae), window.addEventListener("pointercancel", ae), window.addEventListener("keydown", pe);
    }
    Ke(() => ve?.());
    function Be(D, j) {
      const me = r.value;
      if (!n.resizable.value || !me) return;
      const le = N.value ? "ArrowRight" : "ArrowDown", xe = N.value ? "ArrowLeft" : "ArrowUp", Me = D.shiftKey ? 0.1 : 0.02;
      if (D.key !== le && D.key !== xe) return;
      const Re = D.key === le ? Me : -Me;
      D.preventDefault(), n.setSizes(t.path, Qs(ut(me), j, Re, Q()));
    }
    return (D, j) => {
      const me = tr("WindowNode", !0);
      return s.value ? (d(), G(vl, {
        key: 0,
        group: s.value,
        path: e.path
      }, {
        space: Pe(({ node: le, path: xe }) => [
          oe(me, {
            node: le,
            path: xe,
            framed: ""
          }, null, 8, ["node", "path"])
        ]),
        _: 1
      }, 8, ["group", "path"])) : (d(), v("section", {
        key: 1,
        class: "dc-space",
        "data-dc-space": _.value,
        "data-dc-path": e.path.join("/"),
        "data-dc-bare": g.value ? "true" : void 0,
        "aria-label": u.value
      }, [
        !e.framed && !k.value && !g.value ? (d(), v("header", vv, [
          C("span", hv, R(u.value), 1),
          m.value.length ? (d(), G(ts, {
            key: 0,
            items: m.value,
            label: `${u.value} menu`
          }, null, 8, ["items", "label"])) : A("", !0)
        ])) : A("", !0),
        o.value ? (d(), v("div", {
          key: 1,
          ref_key: "desktop",
          ref: y,
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
          (d(!0), v(Z, null, de(c.value, (le) => (d(), G(Hp, {
            key: le.key,
            frame: le.held,
            path: le.path,
            order: le.order,
            place: M.value.get(le.key) ?? null
          }, {
            default: Pe(() => [
              oe(me, {
                node: le.held.node,
                path: le.path,
                framed: le.held.node.kind !== "group"
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
          T.value ? (d(), v("div", gv)) : A("", !0),
          (d(!0), v(Z, null, de(i.value, (le, xe) => (d(), v(Z, {
            key: z(le)
          }, [
            C("div", {
              class: "dc-window__cell",
              style: Se({ flexGrow: l.value[xe] ?? 1 })
            }, [
              oe(me, {
                node: le,
                path: L.value[xe] ?? []
              }, null, 8, ["node", "path"])
            ], 4),
            xe < i.value.length - 1 ? (d(), v("div", {
              key: 0,
              class: "dc-window__gutter",
              role: "separator",
              "aria-orientation": N.value ? "vertical" : "horizontal",
              "aria-label": H(xe),
              "aria-valuenow": q(xe),
              "aria-valuemin": "0",
              "aria-valuemax": "100",
              "aria-disabled": P(n).resizable.value ? void 0 : "true",
              tabindex: P(n).resizable.value ? 0 : -1,
              onPointerdown: (Me) => fe(Me, xe),
              onKeydown: (Me) => Be(Me, xe)
            }, null, 40, yv)) : A("", !0)
          ], 64))), 128))
        ], 8, mv)) : A("", !0)
      ], 8, pv));
    };
  }
}), wv = /* @__PURE__ */ re(_v, [["__scopeId", "data-v-0d942d5e"]]), kv = ["data-dc-theme", "data-dc-dragging", "data-dc-docking"], bv = {
  key: 1,
  class: "dc-window__empty"
}, $v = {
  class: "dc-window__live",
  "aria-live": "polite",
  role: "status"
}, Sn = 16, xv = /* @__PURE__ */ te({
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
    const a = e, s = n, r = Zt(e, "layout"), o = Zt(e, "views"), i = Wt(), l = p(() => new Map(a.panels.map((f) => [f.id, f]))), c = p(() => a.panels.map((f) => f.id)), u = p(() => wp(r.value, m.value)), m = p(() => {
      if (!a.solo || !r.value) return c.value;
      const f = new Set(Ye(r.value)), h = c.value.filter((w) => f.has(w));
      return h.length ? h : c.value;
    }), k = B(null), g = B(null), _ = B(null), y = B(!0), $ = B(null), x = B(null), M = B(null), b = B(""), S = B(null);
    function T() {
      const f = S.value;
      return f ? [...f.querySelectorAll(".dc-pane[data-dc-panels]")].filter((w) => w.closest(".dc-window") === f).map((w) => ({ panels: (w.dataset.dcPanels ?? "").split(" "), element: w })) : [];
    }
    function N(f) {
      const h = [];
      let w = f.closest(".dc-float");
      for (; w; )
        h.unshift(Number(w.dataset.dcOrder ?? 0)), w = w.parentElement?.closest(".dc-float") ?? null;
      return h;
    }
    function L() {
      return T().map((f) => ({ pane: f, order: N(f.element) })).sort((f, h) => {
        const w = Math.max(f.order.length, h.order.length);
        for (let I = 0; I < w; I += 1) {
          const F = (f.order[I] ?? -1) - (h.order[I] ?? -1);
          if (F !== 0) return F;
        }
        return 0;
      }).map((f) => f.pane);
    }
    const z = (f) => T().find((h) => h.panels.includes(f)) ?? null;
    function E(f) {
      const h = l.value.get(f);
      if (!h) return "";
      const w = o.value[f];
      return w && h.views?.some((I) => I.key === w) ? w : h.defaultView ?? h.views?.[0]?.key ?? "";
    }
    function H(f, h) {
      o.value = { ...o.value, [f]: h }, s("view-change", { panel: f, view: h });
    }
    const q = p(
      () => a.panels.filter((f) => f.fixed !== !0).length
    );
    function Q(f) {
      return !a.movable || q.value < 1 || a.panels.length < 2 ? !1 : l.value.get(f)?.fixed !== !0;
    }
    function ve(f, h) {
      const w = u.value;
      !f || !w || f === w || (r.value = f, h && s("panel-move", h));
    }
    function fe(f, h, w) {
      if (f.width <= 0 || f.height <= 0) return "center";
      const I = (h - f.left) / f.width, F = (w - f.top) / f.height, W = 0.3;
      return I > W && I < 1 - W && F > W && F < 1 - W ? "center" : [
        { edge: "left", distance: I },
        { edge: "right", distance: 1 - I },
        { edge: "top", distance: F },
        { edge: "bottom", distance: 1 - F }
      ].reduce(
        (he, U) => U.distance < he.distance ? U : he
      ).edge;
    }
    function Be(f, h) {
      const w = [...f.querySelectorAll(".dc-tab")], I = w.findIndex((F) => {
        const W = F.getBoundingClientRect();
        return h < W.left + W.width / 2;
      });
      return I === -1 ? w.length : I;
    }
    function D(f, h, w) {
      for (const { panels: I, element: F } of L().reverse()) {
        const W = F.getBoundingClientRect();
        if (f < W.left || f > W.right || h < W.top || h > W.bottom) continue;
        const ge = I.find((ie) => ie !== w), he = F.querySelector(".dc-pane__tabs"), U = he?.getBoundingClientRect();
        if (he && U && h >= U.top && h <= U.bottom)
          return ge ? { panel: ge, edge: "center", index: Be(he, f) } : null;
        const se = F.querySelector(":scope > .dc-pane__space");
        if (se) {
          const ie = se.getBoundingClientRect();
          if (f >= ie.left && f <= ie.right && h >= ie.top && h <= ie.bottom) continue;
        }
        return ge ? { panel: ge, edge: fe(W, f, h) } : null;
      }
      return me(f, h, w) ?? Me(f, h);
    }
    function j() {
      const f = S.value;
      return f ? [...f.querySelectorAll(".dc-window__desktop")].filter((h) => h.closest(".dc-window") === f).reverse() : [];
    }
    function me(f, h, w) {
      const I = u.value;
      if (!I) return null;
      for (const F of j()) {
        const W = F.getBoundingClientRect();
        if (f < W.left || f > W.right || h < W.top || h > W.bottom) continue;
        const ge = Re(F), he = ge.flatMap((we) => we.panels).find((we) => we !== w);
        if (!he && ge.length > 0) return null;
        const U = Ie(I, w)?.rect, se = pa(
          {
            x: f - W.left - 24,
            y: h - W.top - 12,
            w: U?.w ?? $t.w,
            h: U?.h ?? $t.h
          },
          { w: F.clientWidth, h: F.clientHeight },
          a.minPanelSize
        );
        if (he) return { panel: he, edge: "float", rect: se };
        const ie = le(F);
        return ie ? { panel: "", space: ie, edge: "float", rect: se } : null;
      }
      return null;
    }
    function le(f) {
      const h = f.closest(".dc-space")?.getAttribute("data-dc-path");
      return h == null ? null : h === "" ? [] : h.split("/").map(Number);
    }
    function xe() {
      const f = S.value;
      return f ? [...f.querySelectorAll(".dc-space")].filter((h) => h.closest(".dc-window") === f).filter((h) => !h.querySelector(".dc-pane")).reverse().flatMap((h) => {
        const w = le(h);
        return w ? [{ element: h, path: w }] : [];
      }) : [];
    }
    function Me(f, h) {
      for (const { element: w, path: I } of xe()) {
        if (w.dataset.dcSpace === "desktop") continue;
        const F = w.getBoundingClientRect();
        if (!(f < F.left || f > F.right || h < F.top || h > F.bottom))
          return { panel: "", space: I, edge: "center" };
      }
      return null;
    }
    function Re(f) {
      return T().filter(
        (h) => h.element.closest(".dc-window__desktop") === f
      );
    }
    let Ue = null;
    const O = (f) => f.altKey;
    function ae(f, h) {
      if (!Q(f) || g.value || x.value || h.button !== 0) return;
      const w = h.clientX, I = h.clientY;
      let F = !1, W = O(h);
      const ge = () => {
        const ke = M.value;
        ke && (_.value = W ? me(ke.x, ke.y, f) : D(ke.x, ke.y, f));
      }, he = (ke) => {
        if (!F) {
          if (Math.hypot(ke.clientX - w, ke.clientY - I) < 4) return;
          F = !0, g.value = f, $.value = null;
        }
        W = O(ke), y.value = !W, M.value = { x: ke.clientX, y: ke.clientY }, ge();
      }, U = (ke) => {
        O(ke) !== W && (W = !W, y.value = !W, F && ge());
      }, se = (ke) => {
        Ue?.();
        const ce = _.value, qe = u.value;
        if (ke && F && ce && qe) {
          const pt = ce.space ? Us(qe, f, ce.space, ce.rect) : ce.edge === "float" && ce.rect ? js(qe, f, ce.panel, ce.rect) : Cn(qe, f, ce.panel, ce.edge, ce.index);
          ve(pt, {
            panel: f,
            target: ce.panel,
            edge: ce.edge,
            ...ce.space === void 0 ? {} : { space: ce.space },
            ...ce.index === void 0 ? {} : { index: ce.index },
            ...ce.rect === void 0 ? {} : { rect: ce.rect }
          });
        }
        g.value = null, _.value = null, M.value = null, y.value = !0;
      }, ie = () => se(!0), we = () => se(!1), Ce = (ke) => {
        if (ke.key === "Escape") {
          se(!1);
          return;
        }
        U(ke);
      };
      Ue = () => {
        window.removeEventListener("pointermove", he), window.removeEventListener("pointerup", ie), window.removeEventListener("pointercancel", we), window.removeEventListener("keydown", Ce), window.removeEventListener("keyup", U), Ue = null;
      }, window.addEventListener("pointermove", he), window.addEventListener("pointerup", ie), window.addEventListener("pointercancel", we), window.addEventListener("keydown", Ce), window.addEventListener("keyup", U);
    }
    Ke(() => Ue?.());
    let pe = null;
    function We(f) {
      const h = S.value;
      return h ? [...h.querySelectorAll(
        `.dc-float[data-dc-path="${f.join("/")}"]`
      )].find((F) => F.closest(".dc-window") === h)?.parentElement ?? null : null;
    }
    function V(f) {
      const h = u.value;
      return h ? za(h, f) : null;
    }
    function J(f) {
      const h = u.value;
      if (!h) return;
      const w = nn(h, f);
      w !== h && (r.value = w);
    }
    function Y(f) {
      const h = V(f);
      h && J(h);
    }
    function Ge(f) {
      const h = u.value, w = h ? Ie(h, f) : null;
      return w !== null && ht(w);
    }
    function K(f) {
      const h = u.value, w = h ? Ie(h, f) : null;
      return w !== null && bt(w);
    }
    function X(f) {
      const h = u.value, w = h ? kt(h, f) : null;
      return w ? Fe(w.node) : "";
    }
    function ne(f) {
      const h = u.value, w = h ? kt(h, f) : null;
      if (!h || !w) return;
      const I = Fe(w.node);
      if (l.value.get(I)?.fixed === !0) return;
      const F = !bt(w);
      let W = cp(h, f, F);
      W !== h && (F || (W = nn(W, f)), r.value = W, s("frame-minimize", { panel: I, minimized: F }));
    }
    function Oe(f) {
      const h = V(f);
      h && ne(h);
    }
    function De(f) {
      const h = u.value, w = h ? kt(h, f) : null;
      if (!h || !w) return;
      const I = Fe(w.node);
      if (l.value.get(I)?.fixed === !0) return;
      const F = !ht(w);
      let W = ip(h, f, F);
      W !== h && (F && (W = nn(W, f)), r.value = W, s("frame-maximize", { panel: I, maximized: F }));
    }
    function Ut(f) {
      const h = V(f);
      h && De(h);
    }
    function hs(f, h, w) {
      const I = u.value, F = I ? kt(I, f) : null;
      if (!I || !F || h.button !== 0 || g.value || x.value) return;
      const W = Fe(F.node);
      if (l.value.get(W)?.fixed === !0 || ht(F) || bt(F) || (w === "move" ? !a.movable : !a.resizable)) return;
      const ge = We(f), he = up(I, f);
      J(f);
      const U = { w: ge?.clientWidth ?? 0, h: ge?.clientHeight ?? 0 }, se = { ...F.rect }, ie = h.clientX, we = h.clientY, Ce = a.minPanelSize;
      x.value = W;
      const ke = (Qe) => {
        const ot = u.value;
        if (!ot) return;
        const Gt = Ws(ot, he, pa(Qe, U, Ce));
        Gt !== ot && (r.value = Gt);
      }, ce = (Qe) => {
        Qe.preventDefault();
        const ot = Qe.clientX - ie, Gt = Qe.clientY - we;
        ke(
          w === "move" ? { ...se, x: se.x + ot, y: se.y + Gt } : Ks(se, w, ot, Gt, Ce)
        );
      }, qe = (Qe) => {
        if (pe?.(), x.value = null, !Qe) {
          ke(se);
          return;
        }
        const ot = u.value ? kt(u.value, he) : null;
        ot && s("frame-change", { panel: X(he), rect: ot.rect });
      }, pt = () => qe(!0), _t = () => qe(!1), wt = (Qe) => {
        Qe.key === "Escape" && qe(!1);
      };
      pe = () => {
        window.removeEventListener("pointermove", ce), window.removeEventListener("pointerup", pt), window.removeEventListener("pointercancel", _t), window.removeEventListener("keydown", wt), pe = null;
      }, window.addEventListener("pointermove", ce), window.addEventListener("pointerup", pt), window.addEventListener("pointercancel", _t), window.addEventListener("keydown", wt);
    }
    function _l(f, h, w) {
      const I = V(f);
      I && hs(I, h, w);
    }
    function wl(f, h, w = !1) {
      const I = u.value, F = V(f), W = I && F ? kt(I, F) : null;
      if (!I || !F || !W || l.value.get(f)?.fixed === !0 || (w ? !a.resizable : !a.movable)) return;
      if (ht(W) || bt(W)) {
        b.value = `${nt(f)} is ${ht(W) ? "maximized" : "minimized"}, so it cannot be moved.`;
        return;
      }
      const ge = h === "left" ? -Sn : h === "right" ? Sn : 0, he = h === "up" ? -Sn : h === "down" ? Sn : 0, U = We(F), se = { w: U?.clientWidth ?? 0, h: U?.clientHeight ?? 0 }, ie = w ? Ks(W.rect, "se", ge, he, a.minPanelSize) : { ...W.rect, x: W.rect.x + ge, y: W.rect.y + he }, we = Ws(I, F, pa(ie, se, a.minPanelSize));
      if (we === I) {
        b.value = w ? `${nt(f)} cannot be resized further.` : `${nt(f)} cannot move ${h}.`;
        return;
      }
      r.value = we;
      const Ce = kt(we, F);
      Ce && (s("frame-change", { panel: f, rect: Ce.rect }), b.value = w ? `${nt(f)} resized to ${Ce.rect.w} by ${Ce.rect.h}.` : `${nt(f)} moved to ${Ce.rect.x}, ${Ce.rect.y}.`);
    }
    Ke(() => pe?.());
    function kl(f, h) {
      const w = z(f), I = w?.element.getBoundingClientRect();
      if (!w || !I) return null;
      const F = h === "left" || h === "right", W = (U) => {
        if (!(F ? U.bottom > I.top + 1 && U.top < I.bottom - 1 : U.right > I.left + 1 && U.left < I.right - 1)) return null;
        const ie = h === "left" ? I.left - U.right : h === "right" ? U.left - I.right : h === "up" ? I.top - U.bottom : U.top - I.bottom;
        return ie < -1 ? null : ie;
      }, ge = [];
      for (const U of T()) {
        if (U === w || U.element === w.element) continue;
        const se = W(U.element.getBoundingClientRect());
        if (se === null) continue;
        const ie = U.panels.find((we) => we !== f);
        ie && ge.push({ to: { panel: ie }, distance: se });
      }
      for (const { element: U, path: se } of xe()) {
        const ie = W(U.getBoundingClientRect());
        ie !== null && ge.push({ to: { space: se }, distance: ie });
      }
      return ge.reduce(
        (U, se) => U && U.distance <= se.distance ? U : se,
        null
      )?.to ?? null;
    }
    function bl(f) {
      const h = u.value ? Ie(u.value, f) !== null : !1;
      if (!h && !Q(f)) return;
      $.value = $.value === f ? null : f;
      const w = nt(f);
      if (!$.value) {
        b.value = `${w}: move mode off.`;
        return;
      }
      b.value = h ? `${w}: move mode on. Arrow keys move the window, shift and an arrow resize it, Escape leaves move mode.` : `${w}: move mode on. Arrow keys move the panel, shift and an arrow make it a tab of the panel that way, Escape leaves move mode.`;
    }
    const nt = (f) => l.value.get(f)?.title ?? f, $l = {
      left: "left",
      right: "right",
      up: "top",
      down: "bottom"
    };
    function xl(f, h, w = !1) {
      if (!Q(f)) return;
      const I = u.value;
      if (!I) return;
      const F = nt(f), W = Ft(I, f);
      if (!w && W && (h === "left" || h === "right") && W.panels.length > 1) {
        const we = W.panels.indexOf(f), Ce = h === "left" ? we - 1 : we + 1;
        if (Ce >= 0 && Ce < W.panels.length) {
          ve(an(I, f, Ce), { panel: f, target: f, edge: "center", index: Ce }), b.value = `${F} moved ${h}, now tab ${Ce + 1} of ${W.panels.length}.`, sa(f);
          return;
        }
      }
      const he = kl(f, h);
      if (!he || he.panel !== void 0 && !Q(he.panel)) {
        b.value = `${F} cannot move ${h}.`;
        return;
      }
      const U = $l[h];
      if (he.space) {
        const we = he.space, Ce = gt(I, we), ke = Ie(I, f)?.rect, ce = { ...$t, ...ke ? { w: ke.w, h: ke.h } : {} };
        ve(Us(I, f, we, ce), { panel: f, target: "", space: we, edge: U }), b.value = `${F} moved ${h}, into ${Ce ? Vt(Ce) : "the space"}.`, sa(f);
        return;
      }
      const se = he.panel, ie = W?.panels.length === 1 && Ft(I, se)?.panels.length === 1;
      w ? (ve(Cn(I, f, se, "center"), {
        panel: f,
        target: se,
        edge: "center"
      }), b.value = `${F} joined ${nt(se)} as a tab.`) : ie ? (ve(An(I, f, se), { panel: f, target: se, edge: U }), b.value = `${F} moved ${h}, trading places with ${nt(se)}.`) : (ve(Cn(I, f, se, U), { panel: f, target: se, edge: U }), b.value = `${F} moved ${h}, beside ${nt(se)}.`), sa(f);
    }
    function sa(f) {
      ft(() => {
        z(f)?.element.querySelector(".dc-pane__grip")?.focus();
      });
    }
    function Cl(f, h) {
      const w = u.value;
      w && (r.value = Tn(w, f, h));
    }
    function ra(f) {
      const h = u.value;
      if (!h) return;
      const w = Bt(h, f);
      w !== h && (r.value = w, s("tab-select", { panel: f }));
    }
    function la(f) {
      return l.value.get(f)?.closable ?? a.closable;
    }
    function ms(f) {
      la(f) && s("panel-close", f);
    }
    const oa = B(/* @__PURE__ */ new Map());
    let Sl = 0;
    function Ml(f, h) {
      const w = Sl += 1;
      return oa.value.set(w, { panel: f, items: h }), () => {
        oa.value.delete(w);
      };
    }
    function El(f) {
      const h = [];
      for (const w of oa.value.values())
        w.panel() === f && h.push(...w.items());
      return h;
    }
    function gs(f) {
      const h = f.filter((w) => w.items.length > 0);
      return h.length < 2 ? h.flatMap((w) => w.items) : h.flatMap((w) => [
        { id: w.id, heading: !0, label: w.title },
        ...w.items
      ]);
    }
    const ys = (f) => f.title || "These tabs";
    function _s(f, h) {
      const w = h.id, I = Ft(f, w), F = (I?.panels.length ?? 0) > 1, W = I?.fixedView === !0, ge = (ie) => ({
        action: () => {
          ie !== f && (r.value = ie);
        }
      }), he = [], U = [], se = h.views ?? [];
      if (se.length > 1 && !W) {
        const ie = E(w);
        he.push({
          id: "view",
          label: "View",
          items: se.map((we) => ({
            id: `view-${we.key}`,
            label: we.label,
            checked: we.key === ie,
            action: () => H(w, we.key)
          }))
        });
      }
      return F && !W && U.push(
        { id: "show-row", label: "Row", checked: !1, ...ge(Gs(f, w, "row")) },
        {
          id: "show-column",
          label: "Column",
          checked: !1,
          ...ge(Gs(f, w, "column"))
        },
        // Already true, and nothing to collapse: these panes are tabs. Ticked
        // and choosable all the same — collapsing a strip into a strip hands
        // back the tree it was given, so it is the no-op it looks like.
        {
          id: "show-tabs",
          label: "Tabs",
          checked: !0,
          ...ge(vp(f, w))
        },
        {
          id: "show-desktop",
          label: "Desktop",
          checked: !1,
          ...ge(hp(f, w))
        }
      ), F && I && (U.length && U.push({ separator: !0 }), U.push(...ws(I, w))), { panel: he, tabs: U, tabsTitle: I ? ys(I) : "" };
    }
    function ws(f, h) {
      const w = Tt(f), I = (F) => {
        const W = f.panels[(w + F + f.panels.length) % f.panels.length];
        return (W === void 0 ? "" : Fe(W)) || h;
      };
      return [
        { id: "next-tab", label: "Next tab", action: () => ra(I(1)) },
        { id: "previous-tab", label: "Previous tab", action: () => ra(I(-1)) },
        ...Pl(f)
      ];
    }
    function Pl(f) {
      const h = Ye(f).filter(la);
      return h.length ? [
        { separator: !0 },
        { id: "close-all", label: "Close all", action: () => h.forEach(ms) }
      ] : [];
    }
    function $n(f) {
      return f.title ? f.title : ee(f) ? f.panels.length > 1 ? "these tabs" : "the strip" : Vt(f);
    }
    function ks(f) {
      if (!f || ue(f) || f.fixedView === !0 || !f.title && f.headless !== !0 || tt(f)) return null;
      const h = fl(f);
      return h && h.fixedView !== !0 ? h : null;
    }
    function bs(f) {
      const h = u.value;
      if (!a.menu || !h) return [];
      const w = gt(h, f);
      if (!w || ee(w)) return [];
      if (w.fixedView) return [];
      const I = ue(w) ? "desktop" : w.direction, F = (ce, qe, pt) => ({
        id: `show-${ce}`,
        label: qe,
        checked: I === ce,
        action: () => {
          const _t = u.value, wt = pt();
          !_t || wt === w || (r.value = Vn(Le(Ct(_t, f, wt))));
        }
      }), W = () => {
        const ce = il(w, Al(w));
        if (ee(ce) && ce.panels.length === 0) return w;
        const qe = ee(ce) && ce.panels.length === 1 ? ce.panels[0] : void 0;
        return qe !== void 0 && $e(qe) ? w : ce;
      }, ge = (ce) => () => ue(w) ? dl(w, ce) : w.direction === ce ? w : { ...w, direction: ce }, he = f.slice(0, -1), U = f.length > 0 ? gt(h, he) : null, se = U && ee(U) && U.panels.length > 1 ? U : null, ie = U && ks(U) === w ? U : null, we = ks(w), Ce = w.title || "this space", ke = (ce, qe, pt, _t, wt) => ({
        id: ce,
        label: wt,
        action: () => {
          const Qe = u.value;
          Qe && (r.value = Vn(Le(Ct(Qe, qe, yp(pt, _t)))));
        }
      });
      return gs([
        {
          id: "about-space",
          /*
           * Its own name, or what it is rather than how it is shown: `spaceTitle`
           * would answer "Row" for an unnamed row, which is the item directly
           * under it and the one already ticked.
           */
          title: w.title || "This space",
          items: [
            F("row", "Row", ge("row")),
            F("column", "Column", ge("column")),
            // Everything in this space in one strip: the panes as tabs, and a
            // desktop among them as a tab of its own, keeping the windows on it.
            F("tabs", "Tabs", () => W()),
            F("desktop", "Desktop", () => ue(w) ? w : ul(w))
          ]
        },
        {
          id: "about-around",
          title: we ? `Around ${$n(we)}` : "",
          items: we ? [
            // Keeping this space's bar drops the one inside, so it is offered
            // only where the space inside has no name to be dropped with it.
            ...we.title ? [] : [ke("merge-around-keep-this", f, w, "outer", `Keep ${Ce}`)],
            ...w.title ? [] : [ke("merge-around-keep-that", f, w, "inner", `Keep ${$n(we)}`)]
          ] : []
        },
        {
          id: "about-inside",
          title: ie ? `Inside ${$n(ie)}` : "",
          items: ie ? [
            ...w.title ? [] : [ke("merge-inside-keep-that", he, ie, "outer", `Keep ${$n(ie)}`)],
            ...ie.title ? [] : [ke("merge-inside-keep-this", he, ie, "inner", `Keep ${Ce}`)]
          ] : []
        },
        {
          id: "about-tabs",
          title: se ? ys(se) : "",
          items: se ? ws(se, Fe(w)) : []
        }
      ]);
    }
    function Al(f) {
      const h = k.value;
      return h && _e(f, h) ? h : void 0;
    }
    function Tl(f) {
      const h = u.value, w = l.value.get(f);
      if (!h || !w) return [];
      const I = a.menu ? _s(h, w) : null, F = El(f);
      F.length && I?.panel.length && F.push({ separator: !0 }), I && F.push(...I.panel);
      const W = Rl(w);
      W && (F.length && F.push({ separator: !0 }), F.push(W));
      const ge = gs([
        { id: "about-panel", title: w.title, items: F },
        { id: "about-tabs", title: I?.tabsTitle ?? "", items: I?.tabs ?? [] }
      ]);
      return a.paneMenu ? a.paneMenu(w, ge) : ge;
    }
    const Ll = p(() => {
      const f = u.value;
      if (!f) return [];
      if (!ee(f)) return bs([]);
      const h = l.value.get(Fe(f));
      return a.menu && h ? _s(f, h).tabs : [];
    });
    function Rl(f) {
      const h = a.popOut?.(f);
      return !h || a.solo && u.value && Ye(u.value).length <= 1 ? null : {
        id: "pop-out",
        label: "Pop out to new window",
        action: () => {
          const w = S.value?.querySelector(`.dc-pane[data-dc-panel="${CSS.escape(f.id)}"]`);
          Cp(h, xp(w)) && s("panel-pop-out", { panel: f.id, href: h });
        }
      };
    }
    function zl(f, h) {
      return i[`${f}-${h}`] ?? i[f];
    }
    function $s(f, h, w, I) {
      return zl(f, h.id)?.({ panel: h, view: w, active: I });
    }
    kp({
      panelFor: (f) => l.value.get(f) ?? null,
      viewFor: E,
      setView: H,
      movable: p(() => a.movable),
      resizable: p(() => a.resizable),
      minPanelSize: p(() => a.minPanelSize),
      spaceNames: p(() => a.spaceNames),
      rootBar: p(() => a.rootBar),
      focused: k,
      dragging: g,
      dropTarget: _,
      moving: $,
      framing: x,
      canMove: Q,
      focus(f) {
        k.value !== f && (k.value = f, s("panel-activate", f));
      },
      selectPanel: ra,
      beginDrag: ae,
      toggleMoveMode: bl,
      nudge: xl,
      setSizes: Cl,
      frameOf: (f) => u.value ? Ie(u.value, f) : null,
      beginFrameDrag: _l,
      nudgeFrame: wl,
      raise: Y,
      maximized: Ge,
      toggleMaximize: Ut,
      minimized: K,
      toggleMinimize: Oe,
      beginFrameDragAt: hs,
      raiseAt: J,
      toggleMaximizeAt: De,
      toggleMinimizeAt: ne,
      menuFor: Tl,
      spaceMenu: bs,
      registerMenu: Ml,
      closable: la,
      close: ms,
      renderContent: (f, h, w) => $s("panel", f, h, w),
      renderActions: (f, h, w) => $s("actions", f, h, w),
      layout: u
    });
    const Il = p(() => {
      if (!(!a.accent && !a.tokens))
        return { ...a.tokens, ...a.accent ? { "--dc-accent": a.accent } : {} };
    }), Ol = () => {
      const f = g.value, h = M.value;
      return !f || !h ? null : Kl(
        "div",
        {
          class: "dc-window__ghost",
          style: { left: `${h.x}px`, top: `${h.y}px` },
          "aria-hidden": "true"
        },
        l.value.get(f)?.title ?? f
      );
    };
    return t({
      /** The layout as rendered, reconciled against the current panels. */
      layout: u,
      /** Moves a panel programmatically — the same operation a drag performs. */
      move(f, h, w, I) {
        const F = u.value;
        F && ve(Cn(F, f, h, w, I), {
          panel: f,
          target: h,
          edge: w,
          ...I === void 0 ? {} : { index: I }
        });
      },
      /** Brings a panel's tab to the top of its group. */
      select(f) {
        const h = u.value;
        h && (r.value = Bt(h, f));
      },
      /** Lifts a panel onto the float holding `near`, as a window of its own. */
      float(f, h, w) {
        const I = u.value;
        I && ve(js(I, f, h, w), {
          panel: f,
          target: h,
          edge: "float",
          rect: w
        });
      },
      /** Puts a floating frame somewhere else, or makes it another size. */
      setRect(f, h) {
        const w = u.value;
        if (!w) return;
        const I = rp(w, f, h);
        if (I === w) return;
        r.value = I;
        const F = Ie(I, f);
        F && s("frame-change", { panel: f, rect: F.rect });
      },
      /**
       * Puts a panel on one of its views, the way its menu would — the way a pane
       * whose space fixed its view, or took its bar away, is switched at all.
       */
      setView: H,
      /**
       * The menu of the space at the root: how the whole window is shown. For a
       * host's menu bar, when `rootBar` takes away the bar it was on.
       */
      rootMenu: Ll,
      /** Brings a floating frame to the front of its stack. */
      raise: Y,
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
      "data-dc-docking": y.value ? "true" : "false",
      style: Se(Il.value)
    }, [
      u.value ? (d(), G(wv, {
        key: 0,
        node: u.value,
        path: []
      }, null, 8, ["node"])) : (d(), v("p", bv, " This window has no panels. ")),
      oe(Ol),
      C("p", $v, R(b.value), 1)
    ], 12, kv));
  }
}), Cv = /* @__PURE__ */ re(xv, [["__scopeId", "data-v-a7bf2b5c"]]);
function hh(e, t) {
  const n = B(!1);
  let a = null, s = !1, r = 0;
  const o = () => {
    r++, n.value = !1, a !== null && (clearTimeout(a), a = null);
  };
  function i(u) {
    a = setTimeout(() => void l(u), t);
  }
  async function l(u) {
    if (s || u !== r) return;
    let m;
    try {
      m = await e();
    } catch {
      m = !1;
    }
    s || u !== r || (m ? i(u) : o());
  }
  const c = () => {
    n.value || (n.value = !0, l(++r));
  };
  return Kt(() => {
    s = !0, o();
  }, !0), { start: c, stop: o, polling: n };
}
function mh(e, t = {}) {
  const n = t.key ?? ((r) => JSON.stringify(r)), a = dt();
  let s = null;
  return Wl(() => {
    const r = e(), o = n(r);
    o !== s && (s = o, a.value = r);
  }), a;
}
const Sv = (e) => Math.round(e * 1e3) / 1e3;
function ha(e, t) {
  return e.title && (t.t = e.title), e.headless && (t.h = !0), e.fixedView && (t.v = !0), t;
}
function Mv(e) {
  return [Math.round(e.x), Math.round(e.y), Math.round(e.w), Math.round(e.h)];
}
function ma(e) {
  const t = { b: Mv(e.rect) };
  return e.title && (t.t = e.title), e.maximized && (t.M = !0), e.minimized && (t.m = !0), t;
}
function Ev(e) {
  if (e.kind !== "group" || e.panels.length !== 1) return null;
  const t = e.panels[0];
  return typeof t != "string" || e.title || e.headless || e.fixedView || e.places ? null : t;
}
function Oa(e) {
  const t = Ev(e);
  return t !== null ? t : hl(e);
}
function hl(e) {
  if (e.kind === "group") {
    const n = { g: e.panels.map((a) => typeof a == "string" ? a : hl(a)) };
    return e.active !== void 0 && e.active !== e.panels[0] && (n.a = e.active), e.places && (n.p = e.places.map(ma)), ha(e, n);
  }
  if (e.kind === "split") {
    const n = { [e.direction === "row" ? "r" : "c"]: e.children.map(Oa) };
    return e.sizes && (n.z = e.sizes.map(Sv)), e.places && (n.p = e.places.map(ma)), ha(e, n);
  }
  const t = {
    f: e.frames.map((n) => ({ n: Oa(n.node), ...ma(n) }))
  };
  return ha(e, t);
}
class ml extends Error {
}
const ze = () => {
  throw new ml();
}, Fa = (e) => typeof e == "object" && e !== null && !Array.isArray(e), zt = (e) => Array.isArray(e) ? e : ze(), ps = (e) => e === void 0 ? void 0 : typeof e == "string" ? e : ze(), gl = (e) => zt(e).map((t) => typeof t == "number" && Number.isFinite(t) ? t : ze());
function Pv(e) {
  const [t, n, a, s] = gl(e);
  return s === void 0 && ze(), { x: t, y: n, w: a, h: s };
}
function ga(e) {
  if (!Fa(e)) return ze();
  const t = { rect: Pv(e.b) }, n = ps(e.t);
  return n && (t.title = n), e.M === !0 && (t.maximized = !0), e.m === !0 && (t.minimized = !0), t;
}
function ya(e, t) {
  const n = ps(e.t);
  return n && (t.title = n), e.h === !0 && (t.headless = !0), e.v === !0 && (t.fixedView = !0), t;
}
function Ln(e) {
  if (typeof e == "string") return { kind: "group", panels: [e] };
  if (!Fa(e)) return ze();
  if (e.g !== void 0) {
    const n = zt(e.g).map((r) => typeof r == "string" ? r : Ln(r));
    n.length === 0 && ze();
    const a = { kind: "group", panels: n }, s = ps(e.a);
    return s !== void 0 && (a.active = s), e.p !== void 0 && (a.places = zt(e.p).map(ga)), ya(e, a);
  }
  const t = e.r !== void 0 ? "row" : e.c !== void 0 ? "column" : null;
  if (t) {
    const n = zt(t === "row" ? e.r : e.c).map(Ln), a = { kind: "split", direction: t, children: n };
    return e.z !== void 0 && (a.sizes = gl(e.z)), e.p !== void 0 && (a.places = zt(e.p).map(ga)), ya(e, a);
  }
  if (e.f !== void 0) {
    const a = { kind: "float", frames: zt(e.f).map((s) => !Fa(s) || s.n === void 0 ? ze() : { node: Ln(s.n), ...ga(s) }) };
    return ya(e, a);
  }
  return ze();
}
const yl = /[ '!:(),*@$]/, Av = /^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][-+]?\d+)?$/;
function Ys(e) {
  return e !== "" && !yl.test(e) && !/^[-\d]/.test(e) ? e : `'${e.replace(/[!']/g, (n) => `!${n}`)}'`;
}
function Na(e) {
  return e === null ? "!n" : e === !0 ? "!t" : e === !1 ? "!f" : typeof e == "number" ? Number.isFinite(e) ? String(e) : "!n" : typeof e == "string" ? Ys(e) : Array.isArray(e) ? `!(${e.map(Na).join(",")})` : `(${Object.entries(e).map(([t, n]) => `${Ys(t)}:${Na(n)}`).join(",")})`;
}
function Tv(e) {
  let t = 0;
  const n = () => e[t], a = (i) => e[t++] === i ? void 0 : ze(), s = () => {
    if (n() === "'") {
      t++;
      let l = "";
      for (; ; ) {
        const c = e[t++];
        if (c === void 0) return ze();
        if (c === "'") return l;
        if (c === "!") {
          const u = e[t++];
          u !== "!" && u !== "'" && ze(), l += u;
        } else l += c;
      }
    }
    const i = t;
    for (; t < e.length && !yl.test(e[t]); ) t++;
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
    const l = s();
    return Av.test(l) ? Number(l) : l;
  }, o = r();
  return t !== e.length && ze(), o;
}
function _a(e) {
  return Na(Oa(e));
}
function Lv(e) {
  try {
    return Ln(Tv(e));
  } catch (t) {
    if (t instanceof ml) return null;
    throw t;
  }
}
function wa(e, t) {
  for (const n of e.replace(/^[?]/, "").split("&")) {
    const a = n.indexOf("="), s = a === -1 ? n : n.slice(0, a);
    if (vs(s) === t) return a === -1 ? "" : n.slice(a + 1);
  }
  return null;
}
function ka(e, t, n) {
  const a = e.replace(/^[?]/, "").split("&").filter(Boolean), s = a.findIndex((o) => {
    const i = o.indexOf("=");
    return vs(i === -1 ? o : o.slice(0, i)) === t;
  }), r = n === null ? null : `${encodeURIComponent(t)}=${n}`;
  return s === -1 ? r && a.push(r) : r ? a[s] = r : a.splice(s, 1), a.length ? `?${a.join("&")}` : "";
}
function vs(e) {
  try {
    return decodeURIComponent(e.replace(/\+/g, " "));
  } catch {
    return e;
  }
}
const Rv = [
  [/%2C/g, ","],
  [/%3A/g, ":"],
  [/%2F/g, "/"],
  [/%40/g, "@"],
  [/%24/g, "$"],
  [/%20/g, "+"]
], Zs = (e) => {
  let t = encodeURIComponent(e);
  for (const [n, a] of Rv) t = t.replace(n, a);
  return t;
};
function gh(e, t) {
  const { adapter: n } = t, a = t.param ?? "w", s = t.soloParam ?? "solo", r = t.delay ?? 200, o = () => it(t.home) ?? null;
  let i = wa(n.search.value, a), l = null;
  const c = () => {
    l !== null && clearTimeout(l), l = null;
  }, u = (_) => _ === null ? o() : Lv(vs(_)) ?? o(), m = () => {
    c();
    const _ = e.value, y = o(), $ = _ ? _a(_) : null, x = $ === null || y && $ === _a(y) ? null : Zs($);
    i = x;
    const M = ka(n.search.value, a, x);
    M !== n.search.value && n.replace(M);
  }, k = u(i);
  return k && (e.value = k), be(e, () => {
    c(), l = setTimeout(m, r);
  }), be(n.search, (_) => {
    const y = wa(_, a);
    if (y === i) return;
    c(), i = y;
    const $ = u(y);
    $ && (e.value = $);
  }), Kn() && Kt(() => l !== null ? m() : void 0), {
    flush: () => l !== null ? m() : void 0,
    popOutHref: (_) => {
      let y = ka(n.search.value, a, Zs(_a(np(Je(_)))));
      return y = ka(y, s, "1"), n.href ? n.href(y) : `${n.path.value}${y}`;
    },
    solo: p(() => wa(n.search.value, s) !== null)
  };
}
function yh(e = {}) {
  return { key: "ordinal", kind: "ordinal", label: "#", width: "52px", ...e };
}
function _h(e = {}) {
  return { key: "status", role: "state", kind: "status", label: "State", width: "104px", ...e };
}
function wh(e = {}) {
  return { key: "tint", role: "tint", ...e };
}
function kh(e = {}) {
  return { key: "picture", role: "image", kind: "image", width: "56px", height: "40px", ...e };
}
function bh(e, t = {}) {
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
function $h(e, t = {}) {
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
function xh(e, t, n = {}) {
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
function Ch(e, t, n = {}) {
  return { key: e, kind: "date", label: t, sort: e, width: "104px", mono: !0, muted: !0, ...n };
}
function Sh(e = {}) {
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
function Mh(e, t, n = {}) {
  return { key: e, label: t, truncate: !0, hideBelow: 900, ...n };
}
function Eh(e, t, n, a = {}) {
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
function aa(e) {
  return typeof e == "number" ? e : typeof e == "string" && e.trim() !== "" ? Number(e) : Number.NaN;
}
function Ph(e) {
  const t = aa(e);
  return Number.isFinite(t) && t > 0 ? no(t) : lt;
}
function Ah(e) {
  const t = aa(e);
  return Number.isFinite(t) && t > 0 ? ao(t) : lt;
}
function Th(e) {
  const t = aa(e);
  return Number.isFinite(t) && t > 0 ? so(t) : lt;
}
function Lh(e) {
  const t = aa(e);
  return Number.isFinite(t) ? ro(t) : lt;
}
function zv(e) {
  if (e <= 0) return 0;
  const t = 10 ** Math.floor(Math.log10(e));
  for (const n of [1, 2, 5])
    if (e <= n * t) return n * t;
  return 10 * t;
}
function Iv(e, t) {
  const n = /* @__PURE__ */ new Set();
  for (const a of e) {
    const s = a.fields[t];
    for (const r of Array.isArray(s) ? s : [s])
      typeof r == "string" && r && n.add(r);
  }
  return [...n].sort((a, s) => a.localeCompare(s));
}
function Ov(e, t) {
  let n = 0;
  for (const a of e) {
    const s = a.fields[t];
    typeof s == "number" && s > n && (n = s);
  }
  return n;
}
function Rh(e, t, n, a = {}) {
  return {
    kind: "chips",
    key: t,
    label: n,
    options: Iv(e, t),
    ...a.multiple ? { multiple: !0 } : {}
  };
}
function zh(e, t, n) {
  return { kind: "range", key: t, label: n, min: 0, max: zv(Ov(e, t)) };
}
function Ih(e, t, n) {
  return { kind: "toggle", key: e, label: t, text: n };
}
function Oh(e) {
  return e.filter((t) => t.kind === "chips" ? t.options.length > 1 : t.kind === "range" ? t.max > 0 : !0);
}
function Fh(e = "", t = "/") {
  const n = B(He(e)), a = B(t), s = [`${a.value}${n.value}`];
  return {
    search: n,
    path: a,
    history: s,
    href(r, o) {
      return `${o ?? a.value}${He(r)}`;
    },
    push(r, o) {
      o !== void 0 && (a.value = o), n.value = He(r), s.push(`${a.value}${n.value}`);
    },
    replace(r, o) {
      o !== void 0 && (a.value = o), n.value = He(r), s[s.length - 1] = `${a.value}${n.value}`;
    }
  };
}
function Js(e) {
  const t = e.indexOf("?");
  if (t === -1) return "";
  const n = e.slice(t), a = n.indexOf("#");
  return He(a === -1 ? n : n.slice(0, a));
}
function Nh(e) {
  const t = B(Js(e.currentRoute.value.fullPath)), n = p(() => e.currentRoute.value.path), a = be(
    () => e.currentRoute.value.fullPath,
    (s) => {
      t.value = Js(s);
    }
  );
  return {
    search: t,
    path: n,
    push: (s, r) => e.push(`${r ?? n.value}${He(s)}`),
    replace: (s, r) => e.replace(`${r ?? n.value}${He(s)}`),
    href: (s, r) => {
      const o = `${r ?? n.value}${He(s)}`;
      return e.resolve?.(o).href ?? o;
    },
    dispose: a
  };
}
function Bh(e, t, n = "/") {
  return (a) => {
    const s = a.params[t], r = Array.isArray(s) ? s.join("/") : s ?? "", o = a.query[Mt], i = typeof o == "string" ? o : "", l = `${e}="${r.replace(/"/g, "")}"`;
    return { path: n, query: { ...a.query, [Mt]: vn(i, l) } };
  };
}
function Dh(e, t = "/") {
  return (n) => ({ path: t, query: { ...n.query, [pn]: e } });
}
function qh(e) {
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
function Hh(e, t) {
  return e.query({ ...t, limit: Number.MAX_SAFE_INTEGER, offset: 0 }).rows;
}
const Fv = {
  DataShell: Qd,
  ShellHeader: zr,
  QueryPanel: Or,
  RecordActions: Nr,
  ResultsArea: Gr,
  FacetControl: Ir,
  SegmentedControl: ff,
  StatusPill: hn,
  WindowFrame: Cv,
  WindowPane: vl,
  ListView: Aa,
  CardsView: qr,
  GridView: Hr,
  ImagesView: Vr,
  TableView: jr,
  LinksView: Kr,
  PreviewView: Wr,
  TypeCardsView: Ur
}, Vh = {
  install(e, t = {}) {
    const n = t.prefix ?? "";
    for (const [a, s] of Object.entries(Fv))
      e.component(`${n}${a}`, s);
    t.route && e.provide(nr, t.route), (t.theme || t.accent || t.tokens) && Qo({ theme: t.theme, accent: t.accent, tokens: t.tokens }, e);
  }
};
export {
  Hn as CASCADE_STEP,
  Hv as COLUMN_BREAKPOINTS,
  qv as COLUMN_ROLES,
  qr as CardsView,
  qs as ColumnCell,
  Rf as CopyButton,
  Ql as DEFAULT_ENTITY_VIEW,
  $t as DEFAULT_FRAME,
  ba as DEFAULT_SORT,
  Gl as DEFAULT_VIEW,
  ti as DRAFT_DELAY,
  Qd as DataShell,
  lt as EMPTY_CELL,
  br as ENTITY_ALL,
  qn as ENTITY_TERM,
  ln as EXPRESSION_TERM,
  Ua as FACET_PREFIX,
  Ir as FacetControl,
  Hr as GridView,
  Vh as HeaderContentLayoutPlugin,
  Vr as ImagesView,
  Kr as LinksView,
  Aa as ListView,
  Rt as MINIMIZED_GAP,
  Zr as MINIMIZED_HEIGHT,
  Ta as MINIMIZED_WIDTH,
  Yr as MIN_FRAME,
  Fn as MOCK_TINTS,
  Yv as MenuBar,
  ts as MenuButton,
  Za as MenuList,
  mn as MetricDrill,
  gn as OpenMark,
  fs as PANE_CONTEXT_KEY,
  ja as PARAM_DIR,
  pn as PARAM_ENTITY,
  Mt as PARAM_EXPR,
  Qn as PARAM_PAGE,
  Wa as PARAM_SORT,
  Gn as PARAM_VIEW,
  Dv as PILL_TONES,
  Yf as POPOVER_FLIP_BELOW,
  Qf as POPOVER_GAP,
  Xf as POPOVER_MARGIN,
  Ja as PinStar,
  Wr as PreviewView,
  es as QueryMark,
  Or as QueryPanel,
  Xt as RECORD_STATUSES,
  Va as RESULT_FIELDS,
  nr as ROUTE_ADAPTER_KEY,
  Nr as RecordActions,
  Gr as ResultsArea,
  Lr as SHELL_CONTEXT_KEY,
  Bv as SHELL_THEMES,
  Dn as SHELL_THEME_KEY,
  yn as ScopeMark,
  ff as SegmentedControl,
  At as SelectTick,
  Xv as ShellCard,
  eh as ShellCode,
  nh as ShellDialog,
  bf as ShellFact,
  Zv as ShellFacts,
  zr as ShellHeader,
  th as ShellLog,
  sh as ShellPopover,
  ah as ShellToasts,
  Pa as StandingControl,
  Jv as StatusCounts,
  hn as StatusPill,
  Vf as TOAST_ERROR_MS,
  Hf as TOAST_MS,
  jr as TableView,
  Ur as TypeCardsView,
  ar as VIEW_KINDS,
  Xl as VIEW_LABELS,
  ds as WINDOW_CONTEXT_KEY,
  Cv as WindowFrame,
  vl as WindowPane,
  el as activePanel,
  Tt as activeTab,
  vn as addTerm,
  Ka as andExpression,
  ap as axisOf,
  Ph as bytesCell,
  ss as cascade,
  fr as cellFull,
  Ht as cellText,
  En as cellTextOf,
  je as cellValue,
  ia as changesResults,
  Rh as chipsFrom,
  pa as clampRect,
  il as collapseSpace,
  vp as collapseToTabs,
  lh as column,
  Ms as columnAlign,
  Es as columnClass,
  Ss as columnKey,
  vr as columnShortcut,
  yo as columnShortcutOf,
  $a as columnTruncates,
  oo as columnsFor,
  Zl as countPages,
  jl as createHistoryAdapter,
  Fh as createMemoryAdapter,
  qh as createMemoryDataSource,
  Bo as createMockDataSource,
  Nh as createVueRouterAdapter,
  Ch as dateColumn,
  Lv as decodeLayout,
  uo as defaultCellText,
  Xs as defaultLayout,
  Ha as defaultQuery,
  rn as defaultViewFor,
  Ul as detachableAdapter,
  da as drillExpression,
  Us as dropIntoSpace,
  Ah as durationCell,
  Th as elapsedCell,
  qt as emptyFacetState,
  Ba as emptyFacetValue,
  _a as encodeLayout,
  Sh as entityColumn,
  Dh as entityRedirect,
  Sr as excludingTerm,
  On as expandShortcuts,
  Mh as facetColumn,
  Cr as fieldTerm,
  It as findEntity,
  mt as findSort,
  oh as fixedView,
  Eh as flagColumn,
  as as float,
  js as floatPanel,
  ul as floatSplit,
  hp as floatTabs,
  Jt as fnv1a,
  rr as focusEntity,
  no as formatBytes,
  Lt as formatCount,
  eo as formatDate,
  Kv as formatDateTime,
  ao as formatDuration,
  so as formatElapsed,
  ct as formatExpression,
  Jl as formatMetric,
  to as formatOrdinal,
  ro as formatPercent,
  fn as formatTerm,
  ea as frame,
  kt as frameAt,
  Ie as frameOf,
  za as framePathOf,
  Fe as frontPanel,
  No as generateRows,
  rh as group,
  Ft as groupOf,
  sp as groups,
  cr as hasActiveFacets,
  _e as hasPanel,
  np as headless,
  bh as identityColumn,
  Gv as idsExpression,
  Yt as insertPanel,
  tn as isChoosable,
  Vv as isEntityScoped,
  ir as isFacetActive,
  ue as isFloat,
  ee as isGroup,
  ht as isMaximized,
  bt as isMinimized,
  $e as isPanelTab,
  Da as isPristineQuery,
  jt as isSplit,
  Xe as isTabOf,
  qa as isTypeCardsQuery,
  sr as isViewKind,
  Is as joinExpression,
  Mr as liftTerm,
  bo as matchesExpression,
  Ao as matchesFacets,
  lp as maximizeFrame,
  ip as maximizeFrameAt,
  yp as mergeSpace,
  xh as metricColumn,
  op as minimizeFrame,
  cp as minimizeFrameAt,
  Cn as movePanel,
  an as moveTab,
  Qv as narrowPatch,
  $o as negateTerm,
  zv as niceMax,
  gt as nodeAt,
  sn as nodeTitle,
  Le as normalizeLayout,
  He as normalizeSearch,
  cs as normalizeSizes,
  fl as onlySpace,
  Cp as openPopOut,
  So as oppositeTerm,
  yh as ordinalColumn,
  Ye as panelIds,
  Je as panelNode,
  Vs as panelTabs,
  Ne as parseExpression,
  Wo as parseQuery,
  Lh as percentCell,
  kh as pictureColumn,
  Zf as placePopover,
  xp as popOutRect,
  Pc as presentParts,
  Br as presentRow,
  Zn as pressOptions,
  pl as providePaneContext,
  Uo as provideShellContext,
  Qo as provideShellTheme,
  kp as provideWindowContext,
  Hh as queryAll,
  va as raiseFrame,
  nn as raiseFrameAt,
  up as raisedPath,
  zh as rangeFrom,
  Po as readDraft,
  Uv as readExpression,
  ur as reconcileFacets,
  wp as reconcileLayout,
  Bh as recordRedirect,
  xr as recordTerm,
  jo as recordsIn,
  $h as referenceColumn,
  Ca as refineExpression,
  xt as removePanel,
  Ct as replaceAt,
  Ks as resizeRect,
  Qs as resizeSplit,
  Un as resolveView,
  Ze as roleColumn,
  dr as roleColumns,
  Vn as rootSpace,
  ls as row,
  co as rowKey,
  xa as sameTerm,
  Xn as scopeTerm,
  Bn as scopeTermFor,
  Ar as scopedEntity,
  jv as searchFromQuery,
  ua as serializeQuery,
  Bt as setActivePanel,
  rp as setFrameRect,
  Ws as setFrameRectAt,
  Tn as setSizesAt,
  uh as setSplitDirection,
  ut as sizesOf,
  or as sortsFor,
  Ae as spaceChrome,
  Vt as spaceTitle,
  rs as split,
  Co as splitExpression,
  Gs as spreadTabs,
  _h as stateColumn,
  lo as stripAnsi,
  Zo as summarizeQuery,
  Ya as summaryTerms,
  An as swapPanels,
  ns as tabNode,
  wn as tabPanels,
  Qa as termStanding,
  dl as tileFloat,
  wh as tintColumn,
  Wv as tintFor,
  dh as toFloat,
  fh as toTiled,
  Ih as toggleFacet,
  ih as toggleMaximized,
  ch as toggleMinimized,
  Zu as useColumns,
  ni as useDraft,
  yi as useEntityCounts,
  hd as useEntityPreviews,
  Xa as useLayerTheme,
  gh as useLayoutRoute,
  ph as usePaneContext,
  vh as usePaneMenu,
  hh as usePoll,
  Pt as usePresentedRows,
  Jo as useQueryState,
  ki as useRecordNames,
  ei as useResults,
  Ee as useShellContext,
  mh as useStableSchema,
  Wf as useToasts,
  na as useWindowContext,
  Oh as usefulFacets,
  Cs as viewAcross,
  Ma as withStanding,
  Pr as withoutOwnScope,
  xo as withoutTerm
};
