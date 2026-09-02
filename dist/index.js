import { ref as W, inject as ht, provide as bn, computed as _, toValue as $t, shallowRef as Ht, watch as Me, onScopeDispose as ba, defineComponent as ce, openBlock as v, createElementBlock as w, createElementVNode as y, toDisplayString as A, createCommentVNode as O, unref as E, renderSlot as Ke, Fragment as se, renderList as fe, withDirectives as rn, withKeys as Ut, withModifiers as Oe, vModelText as on, normalizeClass as Gt, useSlots as kn, nextTick as At, createBlock as me, createVNode as ae, createTextVNode as xe, withCtx as Ze, normalizeStyle as Ae, resolveDynamicComponent as ka, useModel as Xt, onBeforeUnmount as Je, useId as $a, createSlots as ta, mergeModels as jt, onMounted as As, resolveComponent as xa, getCurrentScope as zs, h as Rs } from "vue";
import { f as dt, a as cn, R as na, b as $n, c as Mt, i as Ts, e as Fs, r as Ma, g as xn, h as Ls, j as Ds, s as Is, k as aa, l as un, m as Ns, n as Vs, o as Os, p as Ca, V as Ks, G as Ea, q as Pa, t as qs, u as sa, v as Bs, w as Ws, x as Hs, y as Us, z as Sa, A as dn, B as la, C as ra, D as oa } from "./columns.js";
import { E as Su, F as Au, H as zu, I as Ru, S as Tu, J as Fu, d as Lu, K as Du } from "./columns.js";
const Aa = Symbol("dc.routeAdapter");
function qe(e) {
  if (!e) return "";
  const t = e.replace(/^[?]/, "");
  return t ? `?${t}` : "";
}
function Gs() {
  const e = typeof window < "u", t = W(e ? qe(window.location.search) : ""), n = W(e ? window.location.pathname : "/"), a = () => {
    t.value = qe(window.location.search), n.value = window.location.pathname;
  };
  e && window.addEventListener("popstate", a);
  const s = (l, o) => {
    const c = qe(l);
    if (!e) {
      t.value = c;
      return;
    }
    const r = `${window.location.pathname}${c}${window.location.hash}`;
    o === "push" ? window.history.pushState(window.history.state, "", r) : window.history.replaceState(window.history.state, "", r), t.value = c, n.value = window.location.pathname;
  };
  return {
    search: t,
    path: n,
    push: (l) => s(l, "push"),
    replace: (l) => s(l, "replace"),
    dispose: () => {
      e && window.removeEventListener("popstate", a);
    }
  };
}
const Xs = /^([A-Za-z_][\w.-]*)\s*(>=|<=|:|=|>|<)\s*(.*)$/;
function js(e) {
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
function Ys(e) {
  const t = e.trim();
  if (!t) return [];
  const n = [];
  let a = [];
  for (const s of js(t)) {
    const l = s.toUpperCase();
    if (l === "AND" || l === "&&") continue;
    if (l === "OR" || l === "||") {
      a.length && n.push(a), a = [];
      continue;
    }
    const o = Xs.exec(s);
    o && o[3] !== "" ? a.push({
      kind: "field",
      field: o[1].toLowerCase(),
      comparator: o[2],
      value: o[3]
    }) : a.push({ kind: "text", value: s });
  }
  return a.length && n.push(a), n;
}
function Qs(e, t, n) {
  const a = n.labels, s = (c) => c.toLowerCase().replace(/\s+/g, ""), l = e.replace(/\s+/g, "");
  if (l === "entity") return t.entityKey;
  if (l === "status" || l === "state") return t.status;
  if (l === "score") return t.score;
  if (l === "updated" || l === "date") return t.updatedAt;
  if (l === "name") return t.primary;
  if (l === "ref") return t.secondary;
  if (l === "metric1") return t.metric1;
  if (l === "metric2") return t.metric2;
  if (e in t.facets) return t.facets[e];
  if (l === s(a.primary)) return t.primary;
  if (l === s(a.secondary)) return t.secondary;
  if (l === s(a.metric1)) return t.metric1;
  if (l === s(a.metric2)) return t.metric2;
  const o = n.facets.find((c) => s(c.label) === l);
  return o ? t.facets[o.key] : void 0;
}
function Vt(e, t) {
  const n = e.toLowerCase(), a = t.toLowerCase();
  if (!a.includes("*")) return n.includes(a);
  const s = a.replace(/[.+?^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*");
  return new RegExp(s).test(n);
}
function Zs(e, t, n) {
  if (e.kind === "text")
    return Vt(t.primary, e.value) || Vt(t.secondary, e.value);
  const a = Qs(e.field, t, n);
  if (a === void 0) return !0;
  if (Array.isArray(a))
    return e.comparator === ":" || e.comparator === "=" ? a.some((c) => Vt(c, e.value)) : !0;
  if (e.comparator === ":" || e.comparator === "=") {
    if (typeof a == "boolean") {
      const o = e.value.toLowerCase();
      return o === "true" || o === "yes" ? a : o === "false" || o === "no" ? !a : !0;
    }
    if (typeof a == "number") {
      const o = Number(e.value);
      return Number.isFinite(o) ? a === o : !0;
    }
    return Vt(a, e.value);
  }
  const s = Number(e.value), l = typeof a == "number" ? a : Number(a);
  if (!Number.isFinite(s) || !Number.isFinite(l)) return !0;
  switch (e.comparator) {
    case ">":
      return l > s;
    case ">=":
      return l >= s;
    case "<":
      return l < s;
    case "<=":
      return l <= s;
  }
}
function Js(e, t, n) {
  return e.length ? e.some((a) => a.every((s) => Zs(s, t, n))) : !0;
}
const ia = [
  "oklch(0.36 0.06 240)",
  "oklch(0.34 0.07 290)",
  "oklch(0.36 0.06 160)",
  "oklch(0.38 0.06 80)",
  "oklch(0.35 0.07 30)",
  "oklch(0.34 0.05 200)"
];
function za(e, t) {
  return `${e}_${1e4 + t * 7}`;
}
const el = 7, tl = 3;
function nl(e, t, n, a) {
  const s = (t * el + cn(n)) % a, l = [];
  for (let o = 0; o < Math.min(tl, a); o++)
    l.push(za(e, (s + o) % a));
  return l;
}
function al(e, t) {
  switch (e.kind) {
    case "chips":
      return e.multiple ? sl(e.options, t) : e.options[t % e.options.length] ?? "";
    case "range": {
      const n = Math.max(0, e.max - e.min);
      return e.min + (n === 0 ? 0 : t % (n + 1));
    }
    case "toggle":
      return t % 3 === 0;
  }
}
function sl(e, t) {
  if (!e.length) return [];
  const n = 1 + (t >> 5) % Math.min(3, e.length), a = t % e.length, s = /* @__PURE__ */ new Set();
  for (let l = 0; l < n; l++) s.add((a + l) % e.length);
  return [...s].sort((l, o) => l - o).map((l) => e[l]);
}
function ll(e, t = {}) {
  const n = t.population ?? 48, a = t.seed ?? "", s = t.now ?? /* @__PURE__ */ new Date("2026-08-25T00:00:00Z"), l = e.samples, o = t.scopes ?? [];
  if (!l.length) return [];
  const c = [];
  for (let r = 0; r < n; r++) {
    const f = l[r % l.length], d = Math.floor(r / l.length), h = cn(`${a}:${e.key}:${f[0]}:${r}`), g = za(e.key, r), m = {};
    for (const x of e.facets)
      m[x.key] = al(x, cn(`${h}:${x.key}`));
    for (const [x, k] of o)
      m[x] = k === e.key ? g : nl(k, r, x, n);
    const $ = new Date(s.getTime() - h % 900 * 36e5).toISOString();
    c.push({
      id: g,
      entityKey: e.key,
      entityLabel: e.label,
      primary: d ? `${f[0]} · rev ${d + 1}` : f[0],
      secondary: d ? `${f[1]}-${d + 1}` : f[1],
      status: na[h % na.length],
      score: Number((0.35 + h % 64 / 100).toFixed(3)),
      metric1: 1 + h % 940,
      metric2: 1 + (h >> 3) % 320,
      updatedAt: $,
      tint: ia[h % ia.length],
      facets: m
    });
  }
  return c;
}
function rl(e, t) {
  for (const [n, a] of Object.entries(t)) {
    const s = e.facets[n];
    switch (a.kind) {
      case "chips": {
        if (!a.selected.length) break;
        if (Array.isArray(s)) {
          if (!s.some((l) => a.selected.includes(l))) return !1;
          break;
        }
        if (typeof s != "string" || !a.selected.includes(s)) return !1;
        break;
      }
      case "range": {
        if (a.min === null && a.max === null) break;
        const l = typeof s == "number" ? s : Number(s);
        if (!Number.isFinite(l) || a.min !== null && l < a.min || a.max !== null && l > a.max) return !1;
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
function ol(e) {
  switch (e) {
    case "score":
      return (t, n) => n.score - t.score;
    case "metric1":
      return (t, n) => n.metric1 - t.metric1;
    case "metric2":
      return (t, n) => n.metric2 - t.metric2;
    case "name":
      return (t, n) => n.primary.localeCompare(t.primary);
    case "updated":
    default:
      return (t, n) => Date.parse(n.updatedAt) - Date.parse(t.updatedAt);
  }
}
function il(e = {}) {
  const t = /* @__PURE__ */ new Map(), n = (a, s) => {
    const l = t.get(a.key);
    if (l) return l;
    const o = e.scopes ?? s.entities.flatMap(
      (r) => r.scope ? [[r.scope, r.key]] : []
    ), c = ll(a, { ...e, scopes: o });
    return t.set(a.key, c), c;
  };
  return {
    query({ query: a, schema: s, entity: l, limit: o, offset: c }) {
      const r = Ys(a.expr), f = l ? [l] : s.entities, d = [], h = [];
      for (const $ of f)
        for (const x of n($, s))
          d.push(x), (l ? rl(x, a.facets) : !0) && Js(r, x, $) && h.push(x);
      const g = dt(l, a.sort), m = h.sort(ol(g.key));
      return a.dir === "asc" && m.reverse(), {
        // One page out of the middle. `total` stays the whole match, which is
        // what the shell counts pages with.
        rows: m.slice(c, c + o),
        total: h.length,
        unfiltered: h.length === d.length
      };
    }
  };
}
function cl(e, t) {
  const n = e?.scope;
  return n ? `${n}:"${t.id.replace(/"/g, "")}"` : null;
}
function ul(e, t) {
  return cl(
    e.entities.find((n) => n.key === t.entityKey),
    t
  );
}
function dl(e, t) {
  if (!t) return e;
  const n = e.trim();
  return n ? n.split(/\s+/).includes(t) ? n : `${n} ${t}` : t;
}
function fl(e, t, n) {
  return dl(t.expr, ul(e, n));
}
const Ra = Symbol("dc.shellContext");
function pl(e) {
  return bn(Ra, e), e;
}
function ye() {
  const e = ht(Ra, null);
  if (!e)
    throw new Error(
      "[header-content-layout] No shell context found. Render this component inside <DataShell>."
    );
  return e;
}
const Mn = "e", Cn = "v", En = "s", Pn = "d", Sn = "q", An = "p", zn = "f_", Ta = "*", vl = [
  Mn,
  Cn,
  En,
  Pn,
  Sn,
  An
], fn = "..", Fa = ",", ml = [
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
function an(e) {
  let t = encodeURIComponent(e);
  for (const [n, a] of ml) t = t.replace(n, a);
  return t;
}
function Ve(e) {
  try {
    return decodeURIComponent(e.replace(/\+/g, " "));
  } catch {
    return e.replace(/\+/g, " ");
  }
}
function La(e) {
  const t = e.replace(/^[?]/, "");
  if (!t) return [];
  const n = [];
  for (const a of t.split("&")) {
    if (!a) continue;
    const s = a.indexOf("="), l = s === -1 ? a : a.slice(0, s), o = s === -1 ? "" : a.slice(s + 1);
    n.push([Ve(l), o]);
  }
  return n;
}
function hl(e) {
  return vl.includes(e) || e.startsWith(zn);
}
function ca(e, t, n) {
  return Math.min(n, Math.max(t, e));
}
function _l(e, t) {
  const n = Ve(t);
  switch (e.kind) {
    case "chips": {
      const a = new Set(
        n.split(Fa).map((l) => l.trim()).filter(Boolean)
      );
      return { kind: "chips", selected: e.options.filter((l) => a.has(l)) };
    }
    case "range": {
      const a = n.indexOf(fn), s = (a === -1 ? n : n.slice(0, a)).trim(), l = (a === -1 ? "" : n.slice(a + fn.length)).trim(), o = s === "" ? null : Number(s), c = l === "" ? null : Number(l);
      let r = o !== null && Number.isFinite(o) ? ca(o, e.min, e.max) : null, f = c !== null && Number.isFinite(c) ? ca(c, e.min, e.max) : null;
      return r !== null && f !== null && r > f && ([r, f] = [f, r]), { kind: "range", min: r, max: f };
    }
    case "toggle":
      return { kind: "toggle", on: n === "1" || n === "true" };
  }
}
function gl(e, t) {
  switch (e.kind) {
    case "chips":
      return e.selected.length ? (t.kind === "chips" ? t.options.filter((a) => e.selected.includes(a)) : e.selected).join(Fa) : null;
    case "range":
      return e.min === null && e.max === null ? null : `${e.min ?? ""}${fn}${e.max ?? ""}`;
    case "toggle":
      return e.on ? "1" : null;
  }
}
function yl(e, t, n = {}) {
  const a = $n(t, n), s = new Map(La(e)), l = s.get(Mn), o = l === void 0 ? a.entity : Ve(l), c = o === Ta ? null : Mt(t, o), r = s.get(Cn), f = r && Ts(Ve(r)) ? Ve(r) : a.view, d = s.get(En), h = dt(c, d ? Ve(d) : n.sort), g = s.get(Pn), m = g ? Ve(g) === "asc" ? "asc" : "desc" : a.dir, $ = s.get(Sn), x = s.get(An), k = x === void 0 ? 1 : Number(Ve(x)), C = Number.isFinite(k) ? Math.max(1, Math.floor(k)) : 1, T = {};
  for (const N of c?.facets ?? []) {
    const R = s.get(`${zn}${N.key}`);
    T[N.key] = R === void 0 ? Fs(N) : _l(N, R);
  }
  return {
    entity: c?.key ?? null,
    view: f,
    sort: h.key,
    dir: m,
    expr: $ === void 0 ? "" : Ve($),
    facets: Ma(c, T),
    page: C
  };
}
function ua(e, t, n = {}, a = "") {
  const s = $n(t, n), l = Mt(t, e.entity), o = La(a).filter(([h]) => !hl(h)), c = [], r = (h, g) => c.push([h, an(g)]), f = l?.key ?? null;
  f !== s.entity && r(Mn, f ?? Ta), e.view !== s.view && r(Cn, e.view), e.sort !== s.sort && r(En, e.sort), e.dir !== s.dir && r(Pn, e.dir), e.expr.trim() !== "" && r(Sn, e.expr);
  for (const h of l?.facets ?? []) {
    const g = e.facets[h.key];
    if (!g) continue;
    const m = gl(g, h);
    m !== null && c.push([`${zn}${h.key}`, an(m)]);
  }
  e.page > 1 && r(An, String(e.page));
  const d = [
    ...o.map(([h, g]) => [an(h), g]),
    ...c
  ];
  return d.length ? `?${d.map(([h, g]) => g === "" ? h : `${h}=${g}`).join("&")}` : "";
}
const pn = "entity";
function wl(e, t) {
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
      const a = t.min ?? "", s = t.max ?? "";
      return [{ id: e.key, label: `${n}:${a}..${s}`, facetKey: e.key }];
    }
    case "toggle":
      return t.on ? [{ id: e.key, label: `${n}:on`, facetKey: e.key }] : [];
  }
}
function Da(e, t) {
  const n = [];
  t && n.push({
    id: pn,
    label: `entity:${t.key}`,
    facetKey: pn
  });
  for (const a of t?.facets ?? []) {
    const s = e.facets[a.key];
    s && Ls(s) && n.push(...wl(a, s));
  }
  return n;
}
function bl(e, t) {
  if (xn(e)) {
    const s = dt(t, e.sort);
    return `everything · ${e.view} · ${s.label}`;
  }
  const n = Da(e, t).map((s) => s.label), a = e.expr.trim();
  return a && n.push(`"${a}"`), n.join(" · ");
}
function kl(e) {
  const { adapter: t } = e, n = _(() => $t(e.schema)), a = _(() => $t(e.defaults) ?? {}), s = _(() => yl(t.search.value, n.value, a.value)), l = _(() => Mt(n.value, s.value.entity)), o = _(() => l.value ?? Ds(n.value, a.value)), c = _(() => Is(l.value)), r = _(() => dt(l.value, s.value.sort)), f = (k, C) => {
    const T = ua(k, n.value, a.value, t.search.value);
    T !== t.search.value && (C === "push" ? t.push(T) : t.replace(T));
  }, d = () => $t(e.navigationMode) ?? "push", h = () => $t(e.facetNavigationMode) ?? "replace", g = (k, C) => {
    const T = k.page ?? (aa(k) ? 1 : s.value.page);
    f({ ...s.value, ...k, page: T }, C);
  }, m = (k, C) => {
    const T = s.value.facets[k];
    if (!T) return;
    const N = { ...s.value.facets, [k]: C(T) };
    g({ facets: N }, h());
  }, $ = (k) => {
    const C = k === null ? null : Mt(n.value, k);
    return (C?.key ?? null) === s.value.entity ? {} : {
      entity: C?.key ?? null,
      sort: dt(C, s.value.sort).key,
      facets: un(C)
    };
  }, x = (k) => {
    const C = $(k);
    Object.keys(C).length && g(C, d());
  };
  return {
    query: s,
    entity: l,
    focus: o,
    sort: r,
    sorts: c,
    summary: _(() => bl(s.value, l.value)),
    terms: _(() => Da(s.value, l.value)),
    isPristine: _(() => xn(s.value)),
    isEverything: _(() => s.value.entity === null),
    hasFacets: _(() => Ns(s.value.facets)),
    setEntity: x,
    clearEntity: () => x(null),
    setView(k) {
      g({ view: k }, d());
    },
    setSort(k) {
      g({ sort: dt(l.value, k).key }, d());
    },
    toggleDirection() {
      g({ dir: s.value.dir === "desc" ? "asc" : "desc" }, d());
    },
    setExpression(k) {
      g({ expr: k }, d());
    },
    narrow(k, C) {
      g({ expr: k, ...$(C) }, d());
    },
    setPage(k, C) {
      g({ page: Math.max(1, Math.floor(k)) }, C ?? d());
    },
    setFacet(k, C) {
      m(k, () => C);
    },
    toggleChip(k, C) {
      m(k, (T) => T.kind !== "chips" ? T : { kind: "chips", selected: T.selected.includes(C) ? T.selected.filter((R) => R !== C) : [...T.selected, C] });
    },
    setRange(k, C, T) {
      m(k, (N) => N.kind === "range" ? { kind: "range", min: C, max: T } : N);
    },
    toggleFlag(k) {
      m(
        k,
        (C) => C.kind === "toggle" ? { kind: "toggle", on: !C.on } : C
      );
    },
    removeTerm(k) {
      if (k.facetKey === pn) {
        x(null);
        return;
      }
      m(k.facetKey, (C) => C.kind === "chips" && k.option ? { kind: "chips", selected: C.selected.filter((T) => T !== k.option) } : C.kind === "range" ? { kind: "range", min: null, max: null } : C.kind === "toggle" ? { kind: "toggle", on: !1 } : C);
    },
    clearFilters() {
      g({ entity: null, expr: "", facets: un(null) }, d());
    },
    reset() {
      f($n(n.value, a.value), d());
    },
    hrefFor(k) {
      const C = { ...s.value, ...k };
      return C.page = k.page ?? (aa(k) ? 1 : s.value.page), C.facets = Ma(Mt(n.value, C.entity), C.facets), `${t.path.value}${ua(C, n.value, a.value, t.search.value)}`;
    }
  };
}
function $l(e) {
  const t = Ht([]), n = W(0), a = W(!1), s = Ht(null);
  let l = 0, o = null;
  const c = _(() => (e.query.value.page - 1) * e.limit.value), r = _(() => Vs(n.value, e.limit.value)), f = (x) => {
    t.value = x.rows, n.value = x.total, s.value = null;
  }, d = (x) => {
    s.value = x, t.value = [], n.value = 0;
  }, h = (x, k) => {
    let C = !0;
    const T = () => x === l, N = () => {
      C && (C = !1, t.value = [], n.value = 0), s.value = null;
    };
    return {
      get open() {
        return T();
      },
      insert(R, F) {
        if (!T()) return;
        const V = Array.isArray(R) ? R : [R];
        if (!V.length) return;
        N();
        const b = [...t.value];
        b.splice(F ?? b.length, 0, ...V), t.value = k > 0 ? b.slice(0, k) : b, n.value += V.length;
      },
      set(R) {
        T() && (R.rows && (N(), t.value = k > 0 ? R.rows.slice(0, k) : R.rows, n.value = R.rows.length), R.total !== void 0 && (n.value = R.total));
      },
      close() {
        T() && (a.value = !1);
      },
      fail(R) {
        T() && (d(R), a.value = !1);
      }
    };
  }, g = () => {
    const x = o;
    o = null, x?.();
  }, m = () => {
    const x = ++l;
    g();
    const k = {
      query: e.query.value,
      schema: e.schema.value,
      entity: e.entity.value,
      limit: e.limit.value,
      offset: c.value
    }, C = e.source.value;
    if (C.stream) {
      a.value = !0;
      try {
        o = C.stream(k, h(x, k.limit)) ?? null;
      } catch (N) {
        d(N), a.value = !1;
      }
      return;
    }
    let T;
    try {
      T = C.query(k);
    } catch (N) {
      d(N);
      return;
    }
    if (!(T instanceof Promise)) {
      f(T), a.value = !1;
      return;
    }
    a.value = !0, T.then((N) => {
      x === l && f(N);
    }).catch((N) => {
      x === l && d(N);
    }).finally(() => {
      x === l && (a.value = !1);
    });
  }, $ = _(
    () => `${JSON.stringify(Os.map((x) => e.query.value[x]))}|${e.query.value.page}`
  );
  return Me([e.source, $, e.schema, e.entity, e.limit], m, {
    immediate: !0
  }), ba(() => {
    l++, g();
  }, !0), { rows: t, total: n, offset: c, pageCount: r, pending: a, error: s, refresh: m };
}
const xl = ["data-dc-expanded"], Ml = ["aria-expanded", "aria-controls"], Cl = { class: "dc-header__domain" }, El = { class: "dc-header__crumb" }, Pl = { class: "dc-header__crumb-root" }, Sl = {
  key: 0,
  class: "dc-header__count dc-mono"
}, Al = { class: "dc-header__query" }, zl = ["data-dc-active", "title"], Rl = {
  class: "dc-header__chevron",
  "aria-hidden": "true"
}, Tl = { class: "dc-header__sr" }, Fl = {
  key: 0,
  class: "dc-header__pages",
  "aria-label": "Pages"
}, Ll = ["disabled"], Dl = ["title"], Il = {
  class: "dc-header__sr",
  "aria-live": "polite"
}, Nl = ["disabled"], Vl = {
  key: 1,
  class: "dc-header__actions"
}, Ol = /* @__PURE__ */ ce({
  __name: "ShellHeader",
  props: {
    expanded: { type: Boolean },
    panelId: {},
    hideCount: { type: Boolean }
  },
  emits: ["toggle"],
  setup(e, { emit: t }) {
    const n = e, a = t, s = ye(), l = _(() => s.schema.value), o = _(() => s.entity.value?.label ?? "Everything"), c = _(() => {
      if (n.hideCount) return "";
      const h = s.entity.value;
      return h && !s.hasFacets.value && !s.query.value.expr.trim() ? h.count : String(s.total.value);
    }), r = _(() => s.query.value.page), f = _(
      () => s.pageCount.value > 1 && !Ca(s.query.value)
    ), d = _(() => {
      const h = `Page ${r.value} of ${s.pageCount.value}`, g = s.rows.value.length;
      if (!g) return h;
      const m = s.offset.value + 1;
      return `${h} — rows ${m} to ${m + g - 1} of ${s.total.value}`;
    });
    return (h, g) => (v(), w("div", {
      class: "dc-header",
      "data-dc-expanded": e.expanded ? "true" : "false"
    }, [
      y("button", {
        type: "button",
        class: "dc-header__trigger",
        "aria-expanded": e.expanded,
        "aria-controls": e.panelId,
        onClick: g[0] || (g[0] = (m) => a("toggle"))
      }, [
        g[4] || (g[4] = y("span", {
          class: "dc-header__badge",
          "aria-hidden": "true"
        }, "◆", -1)),
        y("span", Cl, A(l.value.label), 1),
        y("span", El, [
          y("span", Pl, A(o.value), 1),
          c.value ? (v(), w("span", Sl, A(c.value), 1)) : O("", !0)
        ]),
        y("span", Al, [
          g[3] || (g[3] = y("span", { class: "dc-header__query-label" }, "Query", -1)),
          y("span", {
            class: "dc-header__summary dc-mono dc-truncate",
            "data-dc-active": E(s).isPristine.value ? "false" : "true",
            title: E(s).summary.value
          }, A(E(s).summary.value), 9, zl)
        ]),
        y("span", Rl, A(e.expanded ? "▲" : "▼"), 1),
        y("span", Tl, A(e.expanded ? "Hide query panel" : "Edit query"), 1)
      ], 8, Ml),
      f.value ? (v(), w("nav", Fl, [
        y("button", {
          type: "button",
          class: "dc-header__step",
          "aria-label": "Previous page",
          disabled: r.value <= 1,
          onClick: g[1] || (g[1] = (m) => E(s).setPage(r.value - 1))
        }, [...g[5] || (g[5] = [
          y("span", { "aria-hidden": "true" }, "‹", -1)
        ])], 8, Ll),
        y("span", {
          class: "dc-header__page dc-mono",
          title: d.value,
          "aria-hidden": "true"
        }, A(r.value) + " / " + A(E(s).pageCount.value), 9, Dl),
        y("span", Il, A(d.value), 1),
        y("button", {
          type: "button",
          class: "dc-header__step",
          "aria-label": "Next page",
          disabled: r.value >= E(s).pageCount.value,
          onClick: g[2] || (g[2] = (m) => E(s).setPage(r.value + 1))
        }, [...g[6] || (g[6] = [
          y("span", { "aria-hidden": "true" }, "›", -1)
        ])], 8, Nl)
      ])) : O("", !0),
      h.$slots.actions ? (v(), w("div", Vl, [
        Ke(h.$slots, "actions", {}, void 0, !0)
      ])) : O("", !0)
    ], 8, xl));
  }
}), ue = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [a, s] of t)
    n[a] = s;
  return n;
}, Ia = /* @__PURE__ */ ue(Ol, [["__scopeId", "data-v-cdaaadf4"]]), Kl = { class: "dc-facet" }, ql = { class: "dc-facet__head" }, Bl = ["id"], Wl = { class: "dc-facet__hint dc-mono" }, Hl = ["aria-labelledby"], Ul = ["aria-pressed", "data-dc-active", "onClick"], Gl = ["aria-labelledby"], Xl = ["aria-label", "placeholder", "onKeydown"], jl = ["aria-label", "placeholder", "onKeydown"], Yl = ["aria-checked"], Ql = { class: "dc-switch__text" }, Zl = ["data-dc-active"], Jl = /* @__PURE__ */ ce({
  __name: "FacetControl",
  props: {
    facet: {},
    value: {}
  },
  emits: ["update"],
  setup(e, { emit: t }) {
    const n = e, a = t, s = _(() => {
      const { facet: g, value: m } = n;
      return g.kind === "chips" && m.kind === "chips" ? m.selected.length ? `${m.selected.length} of ${g.options.length}` : "any" : g.kind === "range" && m.kind === "range" ? m.min === null && m.max === null ? `${g.min}–${g.max}` : `${m.min ?? g.min}–${m.max ?? g.max}` : m.kind === "toggle" ? m.on ? "on" : "off" : "";
    }), l = _(
      () => n.value.kind === "chips" ? new Set(n.value.selected) : /* @__PURE__ */ new Set()
    );
    function o(g) {
      if (n.value.kind !== "chips") return;
      const m = l.value.has(g) ? n.value.selected.filter(($) => $ !== g) : [...n.value.selected, g];
      a("update", { kind: "chips", selected: m });
    }
    const c = W(""), r = W("");
    Me(
      () => n.value,
      (g) => {
        g.kind === "range" && (c.value = g.min === null ? "" : g.min, r.value = g.max === null ? "" : g.max);
      },
      { immediate: !0, deep: !0 }
    );
    function f(g) {
      if (typeof g == "number") return Number.isFinite(g) ? g : null;
      const m = g.trim();
      if (!m) return null;
      const $ = Number(m);
      return Number.isFinite($) ? $ : null;
    }
    function d() {
      if (n.value.kind !== "range") return;
      const g = f(c.value), m = f(r.value);
      g === n.value.min && m === n.value.max || a("update", { kind: "range", min: g, max: m });
    }
    function h() {
      n.value.kind === "toggle" && a("update", { kind: "toggle", on: !n.value.on });
    }
    return (g, m) => (v(), w("div", Kl, [
      y("div", ql, [
        y("span", {
          id: `dc-facet-${e.facet.key}`,
          class: "dc-facet__label"
        }, A(e.facet.label), 9, Bl),
        y("span", Wl, A(s.value), 1)
      ]),
      e.facet.kind === "chips" && e.value.kind === "chips" ? (v(), w("div", {
        key: 0,
        class: "dc-facet__chips",
        role: "group",
        "aria-labelledby": `dc-facet-${e.facet.key}`
      }, [
        (v(!0), w(se, null, fe(e.facet.options, ($) => (v(), w("button", {
          key: $,
          type: "button",
          class: "dc-chip",
          "aria-pressed": l.value.has($),
          "data-dc-active": l.value.has($) ? "true" : "false",
          onClick: (x) => o($)
        }, A($), 9, Ul))), 128))
      ], 8, Hl)) : e.facet.kind === "range" && e.value.kind === "range" ? (v(), w("div", {
        key: 1,
        class: "dc-facet__range",
        role: "group",
        "aria-labelledby": `dc-facet-${e.facet.key}`
      }, [
        rn(y("input", {
          "onUpdate:modelValue": m[0] || (m[0] = ($) => c.value = $),
          class: "dc-input dc-mono",
          type: "number",
          inputmode: "numeric",
          "aria-label": `${e.facet.label} minimum`,
          placeholder: String(e.facet.min),
          onChange: d,
          onBlur: d,
          onKeydown: Ut(Oe(d, ["prevent"]), ["enter"])
        }, null, 40, Xl), [
          [on, c.value]
        ]),
        m[2] || (m[2] = y("span", {
          class: "dc-facet__dash",
          "aria-hidden": "true"
        }, "–", -1)),
        rn(y("input", {
          "onUpdate:modelValue": m[1] || (m[1] = ($) => r.value = $),
          class: "dc-input dc-mono",
          type: "number",
          inputmode: "numeric",
          "aria-label": `${e.facet.label} maximum`,
          placeholder: String(e.facet.max),
          onChange: d,
          onBlur: d,
          onKeydown: Ut(Oe(d, ["prevent"]), ["enter"])
        }, null, 40, jl), [
          [on, r.value]
        ])
      ], 8, Gl)) : e.facet.kind === "toggle" && e.value.kind === "toggle" ? (v(), w("button", {
        key: 2,
        type: "button",
        class: "dc-switch",
        role: "switch",
        "aria-checked": e.value.on,
        onClick: h
      }, [
        y("span", Ql, A(e.facet.text), 1),
        y("span", {
          class: "dc-switch__track",
          "data-dc-active": e.value.on ? "true" : "false",
          "aria-hidden": "true"
        }, [...m[3] || (m[3] = [
          y("span", { class: "dc-switch__knob" }, null, -1)
        ])], 8, Zl)
      ], 8, Yl)) : O("", !0)
    ]));
  }
}), Na = /* @__PURE__ */ ue(Jl, [["__scopeId", "data-v-c2efbd0c"]]), er = ["aria-label"], tr = ["aria-checked", "data-dc-active", "tabindex", "onClick", "onKeydown"], nr = /* @__PURE__ */ ce({
  __name: "SegmentedControl",
  props: {
    modelValue: {},
    options: {},
    label: {},
    mono: { type: Boolean }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const n = e, a = t, s = W([]);
    function l(o, c) {
      const r = n.options.length;
      let f = null;
      if (o.key === "ArrowRight" || o.key === "ArrowDown" ? f = (c + 1) % r : o.key === "ArrowLeft" || o.key === "ArrowUp" ? f = (c - 1 + r) % r : o.key === "Home" ? f = 0 : o.key === "End" && (f = r - 1), f === null) return;
      o.preventDefault();
      const d = n.options[f];
      d && (a("update:modelValue", d.key), s.value[f]?.focus());
    }
    return (o, c) => (v(), w("div", {
      class: "dc-segmented",
      role: "radiogroup",
      "aria-label": e.label
    }, [
      (v(!0), w(se, null, fe(e.options, (r, f) => (v(), w("button", {
        key: r.key,
        ref_for: !0,
        ref_key: "buttons",
        ref: s,
        type: "button",
        role: "radio",
        class: Gt(["dc-segmented__item", { "dc-segmented__item--mono": e.mono }]),
        "aria-checked": r.key === e.modelValue,
        "data-dc-active": r.key === e.modelValue ? "true" : "false",
        tabindex: r.key === e.modelValue ? 0 : -1,
        onClick: (d) => a("update:modelValue", r.key),
        onKeydown: (d) => l(d, f)
      }, A(r.label), 43, tr))), 128))
    ], 8, er));
  }
}), vn = /* @__PURE__ */ ue(nr, [["__scopeId", "data-v-63fb5482"]]), ar = ["id"], sr = { class: "dc-panel__section" }, lr = { class: "dc-panel__query" }, rr = { class: "dc-panel__expression" }, or = ["for"], ir = ["id", "placeholder", "onKeydown"], cr = {
  key: 0,
  class: "dc-panel__facets"
}, ur = {
  key: 1,
  class: "dc-panel__hint"
}, dr = { class: "dc-panel__scope" }, fr = ["id"], pr = ["aria-labelledby"], vr = ["data-dc-active", "aria-current"], mr = { class: "dc-entity__count dc-mono" }, hr = ["data-dc-active", "aria-current", "onClick"], _r = { class: "dc-entity__label" }, gr = { class: "dc-entity__count dc-mono" }, yr = { class: "dc-panel__actions" }, wr = ["disabled"], br = { class: "dc-panel__section dc-panel__section--row" }, kr = { class: "dc-panel__control" }, $r = { class: "dc-panel__control" }, xr = ["title", "aria-label"], Mr = {
  key: 0,
  class: "dc-panel__section"
}, Cr = /* @__PURE__ */ ce({
  __name: "QueryPanel",
  props: {
    panelId: {},
    views: {}
  },
  emits: ["close"],
  setup(e, { emit: t }) {
    const n = e, a = t, s = kn(), l = ye(), o = {
      list: "List",
      cards: "Cards",
      grid: "Grid",
      table: "Table",
      links: "Links",
      preview: "Preview"
    }, c = _(
      () => (n.views ?? [...Ks]).map((x) => ({ key: x, label: o[x] }))
    ), r = _(
      () => l.sorts.value.map((x) => ({ key: x.key, label: x.label }))
    ), f = W(l.query.value.expr), d = W(null);
    Me(
      () => l.query.value.expr,
      (x) => {
        f.value = x;
      }
    );
    const h = _(() => f.value !== l.query.value.expr);
    function g() {
      l.setExpression(f.value), a("close");
    }
    function m() {
      f.value = "", l.clearFilters();
    }
    function $(x, k) {
      l.setFacet(x, k);
    }
    return At(() => d.value?.focus()), (x, k) => (v(), w("div", {
      id: e.panelId,
      class: "dc-panel",
      role: "dialog",
      "aria-label": "Query",
      onKeydown: k[5] || (k[5] = Ut(Oe((C) => a("close"), ["stop"]), ["esc"]))
    }, [
      y("section", sr, [
        y("div", lr, [
          y("div", rr, [
            y("label", {
              class: "dc-panel__field-label",
              for: `${e.panelId}-expr`
            }, "Expression", 8, or),
            rn(y("input", {
              id: `${e.panelId}-expr`,
              ref_key: "expressionField",
              ref: d,
              "onUpdate:modelValue": k[0] || (k[0] = (C) => f.value = C),
              class: "dc-expression dc-mono",
              type: "text",
              autocomplete: "off",
              spellcheck: "false",
              placeholder: E(l).schema.value.placeholder,
              onKeydown: Ut(Oe(g, ["prevent"]), ["enter"])
            }, null, 40, ir), [
              [on, f.value]
            ])
          ]),
          E(l).entity.value ? (v(), w("div", cr, [
            (v(!0), w(se, null, fe(E(l).entity.value.facets, (C) => (v(), me(Na, {
              key: C.key,
              facet: C,
              value: E(l).query.value.facets[C.key],
              onUpdate: (T) => $(C.key, T)
            }, null, 8, ["facet", "value", "onUpdate"]))), 128))
          ])) : (v(), w("p", ur, " Results span every entity — logs and settings included. Pick one below to narrow to it and to get its own filters. "))
        ]),
        y("div", dr, [
          y("span", {
            id: `${e.panelId}-entities`,
            class: "dc-panel__field-label"
          }, "Entities", 8, fr),
          y("div", {
            class: "dc-panel__entities",
            role: "group",
            "aria-labelledby": `${e.panelId}-entities`
          }, [
            y("button", {
              type: "button",
              class: "dc-entity dc-entity--all",
              "data-dc-active": E(l).isEverything.value ? "true" : "false",
              "aria-current": E(l).isEverything.value ? "true" : void 0,
              onClick: k[1] || (k[1] = (C) => E(l).clearEntity())
            }, [
              k[6] || (k[6] = y("span", { class: "dc-entity__label" }, "Everything", -1)),
              y("span", mr, A(E(l).entities.value.length) + " kinds", 1)
            ], 8, vr),
            (v(!0), w(se, null, fe(E(l).entities.value, (C) => (v(), w("button", {
              key: C.key,
              type: "button",
              class: "dc-entity",
              "data-dc-active": C.key === E(l).entity.value?.key ? "true" : "false",
              "aria-current": C.key === E(l).entity.value?.key ? "true" : void 0,
              onClick: (T) => E(l).setEntity(C.key)
            }, [
              y("span", _r, A(C.label), 1),
              y("span", gr, A(C.count), 1)
            ], 8, hr))), 128))
          ], 8, pr)
        ]),
        y("div", yr, [
          y("button", {
            type: "button",
            class: "dc-button dc-button--primary",
            onClick: g
          }, " Run query "),
          y("button", {
            type: "button",
            class: "dc-button",
            disabled: E(l).isPristine.value && !h.value,
            onClick: m
          }, " Reset ", 8, wr)
        ])
      ]),
      y("section", br, [
        y("div", kr, [
          k[7] || (k[7] = y("span", { class: "dc-eyebrow" }, "View", -1)),
          ae(vn, {
            label: "Result view",
            "model-value": E(l).query.value.view,
            options: c.value,
            "onUpdate:modelValue": k[2] || (k[2] = (C) => E(l).setView(C))
          }, null, 8, ["model-value", "options"])
        ]),
        y("div", $r, [
          k[8] || (k[8] = y("span", { class: "dc-eyebrow" }, "Sort", -1)),
          ae(vn, {
            mono: "",
            label: "Sort field",
            "model-value": E(l).query.value.sort,
            options: r.value,
            "onUpdate:modelValue": k[3] || (k[3] = (C) => E(l).setSort(C))
          }, null, 8, ["model-value", "options"]),
          y("button", {
            type: "button",
            class: "dc-button dc-button--icon dc-mono",
            title: E(l).query.value.dir === "desc" ? "Descending — click to reverse" : "Ascending — click to reverse",
            "aria-label": `Sort direction: ${E(l).query.value.dir === "desc" ? "descending" : "ascending"}`,
            onClick: k[4] || (k[4] = (C) => E(l).toggleDirection())
          }, A(E(l).query.value.dir === "desc" ? "↓" : "↑"), 9, xr)
        ])
      ]),
      s["panel-section"] ? (v(), w("section", Mr, [
        Ke(x.$slots, "panel-section", {}, void 0, !0)
      ])) : O("", !0)
    ], 40, ar));
  }
}), Va = /* @__PURE__ */ ue(Cr, [["__scopeId", "data-v-d8a6ac01"]]);
function du() {
  const e = ye();
  return _(() => e.entity.value?.labels ?? Ea);
}
function Oa(e, t, n, a) {
  return {
    row: e,
    key: Ws(e, t),
    entityLabel: e.entityLabel,
    entity: n,
    labels: n?.labels ?? Ea,
    ordinal: Bs(t),
    metric1: sa(e.metric1),
    metric2: sa(e.metric2),
    date: qs(e.updatedAt),
    score: e.score.toFixed(2),
    percent: Pa(e.score),
    pinned: a
  };
}
function gt() {
  const e = ye(), t = _(
    () => new Map(e.entities.value.map((n) => [n.key, n]))
  );
  return _(
    () => e.rows.value.map(
      (n, a) => Oa(
        n,
        e.offset.value + a,
        t.value.get(n.entityKey) ?? null,
        e.isPinned(n)
      )
    )
  );
}
const Er = ["data-dc-status"], Pr = /* @__PURE__ */ ce({
  __name: "StatusPill",
  props: {
    status: {}
  },
  setup(e) {
    return (t, n) => (v(), w("span", {
      class: "dc-pill",
      "data-dc-status": e.status
    }, A(e.status), 9, Er));
  }
}), zt = /* @__PURE__ */ ue(Pr, [["__scopeId", "data-v-23e59fbf"]]), Sr = ["title"], Ar = { key: 1 }, zr = /* @__PURE__ */ ce({
  __name: "MetricDrill",
  props: {
    entry: {},
    metric: {},
    to: {},
    label: {}
  },
  setup(e) {
    const t = e, n = ye(), a = _(() => {
      const c = t.entry.entity;
      if (!c?.scope) return null;
      const r = t.to ?? (t.metric ? c.drills?.[t.metric] : void 0);
      return n.entities.value.find((f) => f.key === r) ?? null;
    }), s = _(() => t.label ?? (t.metric ? t.entry.labels[t.metric] : "")), l = _(() => t.metric ? t.entry[t.metric] : "");
    function o(c) {
      c.stopPropagation(), a.value && n.drill(t.entry.row, a.value);
    }
    return (c, r) => a.value ? (v(), w("button", {
      key: 0,
      type: "button",
      class: "dc-drill",
      title: `${s.value} of ${e.entry.row.primary} — show the ${a.value.label.toLowerCase()}`,
      onClick: o
    }, [
      Ke(c.$slots, "default", {}, () => [
        xe(A(l.value), 1)
      ], !0)
    ], 8, Sr)) : (v(), w("span", Ar, [
      Ke(c.$slots, "default", {}, () => [
        xe(A(l.value), 1)
      ], !0)
    ]));
  }
}), ot = /* @__PURE__ */ ue(zr, [["__scopeId", "data-v-ced2ff08"]]), Rr = ["data-dc-active", "aria-pressed", "aria-label"], Tr = /* @__PURE__ */ ce({
  __name: "PinStar",
  props: {
    row: {},
    pinned: { type: Boolean }
  },
  setup(e) {
    const t = e, n = ye();
    function a(s) {
      s.stopPropagation(), n.togglePin(t.row);
    }
    return (s, l) => (v(), w("button", {
      type: "button",
      class: "dc-star",
      "data-dc-active": e.pinned ? "true" : "false",
      "aria-pressed": e.pinned,
      "aria-label": e.pinned ? `Unpin ${e.row.primary}` : `Pin ${e.row.primary}`,
      onClick: a
    }, A(e.pinned ? "★" : "☆"), 9, Rr));
  }
}), Rn = /* @__PURE__ */ ue(Tr, [["__scopeId", "data-v-890e0fb5"]]), Fr = ["title", "aria-label"], Lr = /* @__PURE__ */ ce({
  __name: "ScopeMark",
  props: {
    entry: {}
  },
  setup(e) {
    const t = e, n = ye(), a = _(() => t.entry.entity?.scope ?? null);
    function s(l) {
      l.stopPropagation(), n.drill(t.entry.row, null);
    }
    return (l, o) => a.value ? (v(), w("button", {
      key: 0,
      type: "button",
      class: "dc-scope",
      title: `Narrow everything to ${a.value}: ${e.entry.row.id}`,
      "aria-label": `Narrow everything to ${e.entry.row.primary}`,
      onClick: s
    }, " → ", 8, Fr)) : O("", !0);
  }
}), Rt = /* @__PURE__ */ ue(Lr, [["__scopeId", "data-v-15dce1c0"]]), Dr = { class: "dc-cards" }, Ir = { class: "dc-card__top dc-mono" }, Nr = {
  key: 0,
  class: "dc-card__entity"
}, Vr = { class: "dc-card__top-right" }, Or = ["onClick"], Kr = { class: "dc-card__primary" }, qr = { class: "dc-card__secondary dc-mono" }, Br = { class: "dc-card__metrics dc-mono" }, Wr = { class: "dc-card__date" }, Hr = /* @__PURE__ */ ce({
  __name: "CardsView",
  setup(e) {
    const t = ye(), n = gt(), a = _(() => t.isEverything.value);
    return (s, l) => (v(), w("div", Dr, [
      (v(!0), w(se, null, fe(E(n), (o) => (v(), w("div", {
        key: o.key,
        class: "dc-card"
      }, [
        y("div", Ir, [
          y("span", null, [
            xe(A(o.ordinal) + " ", 1),
            a.value ? (v(), w("span", Nr, A(o.entityLabel), 1)) : O("", !0)
          ]),
          y("span", Vr, [
            ae(zt, {
              status: o.row.status
            }, null, 8, ["status"]),
            ae(Rt, { entry: o }, null, 8, ["entry"]),
            E(t).pinnable.value ? (v(), me(Rn, {
              key: 0,
              row: o.row,
              pinned: o.pinned
            }, null, 8, ["row", "pinned"])) : O("", !0)
          ])
        ]),
        y("button", {
          type: "button",
          class: "dc-card__open",
          onClick: (c) => E(t).activate(o.row)
        }, [
          y("span", Kr, A(o.row.primary), 1),
          y("span", qr, A(o.row.secondary), 1)
        ], 8, Or),
        y("div", Br, [
          ae(ot, {
            entry: o,
            metric: "metric1"
          }, {
            default: Ze(() => [
              xe(A(o.labels.metric1) + " " + A(o.metric1), 1)
            ]),
            _: 2
          }, 1032, ["entry"]),
          ae(ot, {
            entry: o,
            metric: "metric2"
          }, {
            default: Ze(() => [
              xe(A(o.labels.metric2) + " " + A(o.metric2), 1)
            ]),
            _: 2
          }, 1032, ["entry"]),
          y("span", Wr, A(o.date), 1)
        ])
      ]))), 128))
    ]));
  }
}), Ka = /* @__PURE__ */ ue(Hr, [["__scopeId", "data-v-4b30c513"]]), Ur = { class: "dc-grid" }, Gr = ["onClick"], Xr = { class: "dc-tile__scrim" }, jr = { class: "dc-tile__top dc-mono" }, Yr = { class: "dc-tile__chip" }, Qr = { class: "dc-tile__chip" }, Zr = { class: "dc-tile__caption" }, Jr = { class: "dc-tile__secondary dc-truncate" }, eo = { class: "dc-tile__primary" }, to = /* @__PURE__ */ ce({
  __name: "GridView",
  setup(e) {
    const t = ye(), n = gt();
    return (a, s) => (v(), w("div", Ur, [
      (v(!0), w(se, null, fe(E(n), (l) => (v(), w("button", {
        key: l.key,
        type: "button",
        class: "dc-tile",
        style: Ae({ "--dc-tile-tint": l.row.tint }),
        onClick: (o) => E(t).activate(l.row)
      }, [
        y("span", Xr, [
          y("span", jr, [
            y("span", Yr, A(l.ordinal), 1),
            y("span", Qr, A(l.score), 1)
          ]),
          y("span", Zr, [
            y("span", Jr, A(l.row.secondary), 1),
            y("span", eo, A(l.row.primary), 1)
          ])
        ])
      ], 12, Gr))), 128))
    ]));
  }
}), qa = /* @__PURE__ */ ue(to, [["__scopeId", "data-v-adddef0c"]]), no = { class: "dc-links" }, ao = ["onClick"], so = { class: "dc-link__primary dc-truncate" }, lo = { class: "dc-link__secondary dc-mono dc-truncate" }, ro = /* @__PURE__ */ ce({
  __name: "LinksView",
  setup(e) {
    const t = ye(), n = gt();
    return (a, s) => (v(), w("div", no, [
      (v(!0), w(se, null, fe(E(n), (l) => (v(), w("button", {
        key: l.key,
        type: "button",
        class: "dc-link",
        onClick: (o) => E(t).activate(l.row)
      }, [
        y("span", so, A(l.row.primary), 1),
        y("span", lo, A(l.row.secondary), 1)
      ], 8, ao))), 128))
    ]));
  }
}), Ba = /* @__PURE__ */ ue(ro, [["__scopeId", "data-v-98d0e211"]]), oo = ["aria-valuenow", "aria-label", "title"], io = /* @__PURE__ */ ce({
  __name: "ScoreMeter",
  props: {
    value: {},
    label: {}
  },
  setup(e) {
    const t = e, n = _(() => Pa(t.value));
    return (a, s) => (v(), w("span", {
      class: "dc-meter",
      role: "meter",
      "aria-valuemin": "0",
      "aria-valuemax": "100",
      "aria-valuenow": Math.round(e.value * 100),
      "aria-label": e.label ?? "Score",
      title: `${e.label ?? "Score"} ${n.value}`
    }, [
      y("span", {
        class: "dc-meter__fill",
        style: Ae({ width: n.value })
      }, null, 4)
    ], 8, oo));
  }
}), Tn = /* @__PURE__ */ ue(io, [["__scopeId", "data-v-ab794776"]]), co = {
  class: "dc-list",
  role: "list"
}, uo = ["onClick"], fo = { class: "dc-list__ordinal dc-mono" }, po = { class: "dc-list__identity" }, vo = { class: "dc-list__primary dc-truncate" }, mo = { class: "dc-list__secondary dc-mono dc-truncate" }, ho = {
  key: 0,
  class: "dc-list__entity dc-mono"
}, _o = { class: "dc-list__metrics dc-mono" }, go = { class: "dc-list__trailing" }, yo = /* @__PURE__ */ ce({
  __name: "ListView",
  setup(e) {
    const t = ye(), n = gt(), a = _(() => t.isEverything.value);
    return (s, l) => (v(), w("div", co, [
      (v(!0), w(se, null, fe(E(n), (o) => (v(), w("div", {
        key: o.key,
        class: "dc-list__row",
        role: "listitem"
      }, [
        y("button", {
          type: "button",
          class: "dc-list__open",
          onClick: (c) => E(t).activate(o.row)
        }, [
          y("span", fo, A(o.ordinal), 1),
          y("span", po, [
            y("span", vo, A(o.row.primary), 1),
            y("span", mo, A(o.row.secondary), 1)
          ])
        ], 8, uo),
        a.value ? (v(), w("span", ho, A(o.entityLabel), 1)) : O("", !0),
        y("span", _o, [
          ae(ot, {
            entry: o,
            metric: "metric1"
          }, null, 8, ["entry"]),
          ae(ot, {
            entry: o,
            metric: "metric2"
          }, null, 8, ["entry"]),
          ae(Tn, {
            value: o.row.score
          }, null, 8, ["value"])
        ]),
        y("span", go, [
          ae(zt, {
            status: o.row.status
          }, null, 8, ["status"]),
          ae(Rt, { entry: o }, null, 8, ["entry"]),
          E(t).pinnable.value ? (v(), me(Rn, {
            key: 0,
            row: o.row,
            pinned: o.pinned
          }, null, 8, ["row", "pinned"])) : O("", !0)
        ])
      ]))), 128))
    ]));
  }
}), mn = /* @__PURE__ */ ue(yo, [["__scopeId", "data-v-7bbe825a"]]), wo = { class: "dc-preview" }, bo = { class: "dc-preview__pager dc-mono" }, ko = ["disabled"], $o = { "aria-live": "polite" }, xo = ["disabled"], Mo = {
  key: 0,
  class: "dc-preview__card"
}, Co = { class: "dc-preview__body" }, Eo = { class: "dc-preview__top" }, Po = { class: "dc-preview__badges" }, So = { class: "dc-preview__entity dc-mono" }, Ao = { class: "dc-preview__marks" }, zo = { class: "dc-preview__primary" }, Ro = { class: "dc-preview__secondary dc-mono" }, To = { class: "dc-preview__fields" }, Fo = { class: "dc-preview__key" }, Lo = { class: "dc-preview__value dc-mono" }, Do = /* @__PURE__ */ ce({
  __name: "PreviewView",
  setup(e) {
    const t = ye(), n = gt(), a = W(0);
    Me(n, (r) => {
      a.value > r.length - 1 && (a.value = Math.max(0, r.length - 1));
    });
    const s = _(() => n.value[a.value]), l = _(() => {
      const r = s.value;
      return r ? [
        { key: r.labels.secondary, value: r.row.secondary, metric: null },
        // Named, so the value renders as the drill it may be rather than as text.
        { key: r.labels.metric1, value: r.metric1, metric: "metric1" },
        { key: r.labels.metric2, value: r.metric2, metric: "metric2" },
        { key: "Updated", value: r.date, metric: null }
      ] : [];
    }), o = _(() => {
      if (!n.value.length) return "0 / 0";
      const r = t.total.value > n.value.length ? ` of ${t.total.value}` : "";
      return `${a.value + 1} / ${n.value.length}${r}`;
    }), c = (r) => {
      const f = n.value.length;
      f && (a.value = Math.min(f - 1, Math.max(0, a.value + r)));
    };
    return (r, f) => (v(), w("div", wo, [
      y("div", bo, [
        y("button", {
          type: "button",
          class: "dc-preview__step",
          "aria-label": "Previous result",
          disabled: a.value === 0,
          onClick: f[0] || (f[0] = (d) => c(-1))
        }, " ‹ ", 8, ko),
        y("span", $o, A(o.value), 1),
        y("button", {
          type: "button",
          class: "dc-preview__step",
          "aria-label": "Next result",
          disabled: a.value >= E(n).length - 1,
          onClick: f[1] || (f[1] = (d) => c(1))
        }, " › ", 8, xo)
      ]),
      s.value ? (v(), w("div", Mo, [
        y("div", {
          class: "dc-preview__media",
          style: Ae({ background: s.value.row.tint }),
          "aria-hidden": "true"
        }, " preview ", 4),
        y("div", Co, [
          y("div", Eo, [
            y("span", Po, [
              ae(zt, {
                status: s.value.row.status
              }, null, 8, ["status"]),
              y("span", So, A(s.value.entityLabel), 1)
            ]),
            y("span", Ao, [
              ae(Rt, { entry: s.value }, null, 8, ["entry"]),
              E(t).pinnable.value ? (v(), me(Rn, {
                key: 0,
                row: s.value.row,
                pinned: s.value.pinned
              }, null, 8, ["row", "pinned"])) : O("", !0)
            ])
          ]),
          y("div", null, [
            y("div", zo, A(s.value.row.primary), 1),
            y("div", Ro, A(s.value.row.secondary), 1)
          ]),
          y("dl", To, [
            (v(!0), w(se, null, fe(l.value, (d) => (v(), w("div", {
              key: d.key,
              class: "dc-preview__field"
            }, [
              y("dt", Fo, A(d.key), 1),
              y("dd", Lo, [
                d.metric && s.value ? (v(), me(ot, {
                  key: 0,
                  entry: s.value,
                  metric: d.metric
                }, null, 8, ["entry", "metric"])) : (v(), w(se, { key: 1 }, [
                  xe(A(d.value), 1)
                ], 64))
              ])
            ]))), 128))
          ]),
          y("button", {
            type: "button",
            class: "dc-preview__open",
            onClick: f[2] || (f[2] = (d) => E(t).activate(s.value.row))
          }, " Open record → ")
        ])
      ])) : O("", !0)
    ]));
  }
}), Wa = /* @__PURE__ */ ue(Do, [["__scopeId", "data-v-405dfdb6"]]);
function Io() {
  const e = ye();
  return _(() => Hs(e.schema.value, e.entity.value));
}
const No = ["src", "alt"], Vo = ["title"], Oo = /* @__PURE__ */ ce({
  __name: "ColumnCell",
  props: {
    column: {},
    entry: {}
  },
  setup(e) {
    const t = e, n = ye(), a = _(() => t.column.kind ?? "text"), s = _(() => Us(t.column, t.entry.row)), l = _(
      () => a.value === "ordinal" ? t.entry.ordinal : Sa(t.column, t.entry.row)
    ), o = _(() => s.value), c = _(() => {
      const h = Number(s.value);
      return Number.isFinite(h) ? h : 0;
    }), r = _(() => t.column.activate === !0 || !!t.column.click), f = _(() => dn(t.column));
    function d(h) {
      r.value && (h.stopPropagation(), t.column.click?.(t.entry.row), t.column.activate && n.activate(t.entry.row));
    }
    return (h, g) => a.value === "component" && e.column.component ? (v(), me(ka(e.column.component), {
      key: 0,
      row: e.entry.row,
      entry: e.entry,
      value: s.value,
      column: e.column
    }, null, 8, ["row", "entry", "value", "column"])) : a.value === "status" ? (v(), me(zt, {
      key: 1,
      status: o.value
    }, null, 8, ["status"])) : a.value === "score" ? (v(), me(Tn, {
      key: 2,
      value: c.value,
      label: e.column.label
    }, null, 8, ["value", "label"])) : a.value === "image" ? (v(), w("img", {
      key: 3,
      class: "dc-cell__image",
      src: String(s.value ?? ""),
      alt: e.entry.row.primary,
      loading: "lazy",
      style: Ae({ maxHeight: e.column.height }),
      onClick: d
    }, null, 12, No)) : e.column.drill ? (v(), me(ot, {
      key: 4,
      entry: e.entry,
      to: e.column.drill,
      label: e.column.label
    }, {
      default: Ze(() => [
        xe(A(l.value), 1)
      ]),
      _: 1
    }, 8, ["entry", "to", "label"])) : r.value ? (v(), w("button", {
      key: 5,
      type: "button",
      class: Gt(["dc-table__open", { "dc-truncate": f.value }]),
      title: l.value,
      onClick: d
    }, A(l.value), 11, Vo)) : (v(), w(se, { key: 6 }, [
      xe(A(l.value), 1)
    ], 64));
  }
}), da = /* @__PURE__ */ ue(Oo, [["__scopeId", "data-v-24af1027"]]), Ko = {
  key: 0,
  class: "dc-table__none"
}, qo = { class: "dc-table__detail" }, Bo = {
  key: 1,
  class: "dc-table"
}, Wo = ["data-dc-align", "data-dc-hide", "aria-sort"], Ho = ["onClick"], Uo = ["onClick"], Go = ["data-dc-align", "data-dc-hide", "title"], Xo = {
  key: 0,
  class: "dc-table__name"
}, jo = /* @__PURE__ */ ce({
  __name: "TableView",
  setup(e) {
    const t = ye(), n = gt(), a = Io();
    function s(h) {
      h && (t.query.value.sort === h ? t.toggleDirection() : t.setSort(h));
    }
    const l = _(() => t.entity.value?.label ?? "The result set"), o = _(() => new Set(t.sorts.value.map((h) => h.key))), c = (h) => h.sort !== void 0 && o.value.has(h.sort), r = (h) => {
      if (c(h))
        return t.query.value.sort !== h.sort ? "none" : t.query.value.dir === "desc" ? "descending" : "ascending";
    };
    function f(h) {
      return [
        ra(h),
        h.muted ? "dc-table__muted" : "",
        h.mono ? "dc-mono" : "",
        dn(h) ? "dc-truncate" : ""
      ].filter(Boolean).join(" ");
    }
    function d(h, g) {
      if (!(!dn(h) || h.activate || h.click))
        return Sa(h, g.row);
    }
    return (h, g) => E(a).length ? (v(), w("table", Bo, [
      y("thead", null, [
        y("tr", null, [
          (v(!0), w(se, null, fe(E(a), (m, $) => (v(), w("th", {
            key: E(oa)(m, $),
            scope: "col",
            class: Gt(E(ra)(m)),
            style: Ae({ width: m.width }),
            "data-dc-align": E(la)(m),
            "data-dc-hide": m.hideBelow,
            "aria-sort": r(m)
          }, [
            c(m) ? (v(), w("button", {
              key: 0,
              type: "button",
              class: "dc-table__sort",
              onClick: (x) => s(m.sort)
            }, A(m.label), 9, Ho)) : (v(), w(se, { key: 1 }, [
              xe(A(m.label), 1)
            ], 64))
          ], 14, Wo))), 128))
        ])
      ]),
      y("tbody", null, [
        (v(!0), w(se, null, fe(E(n), (m) => (v(), w("tr", {
          key: m.key,
          class: "dc-table__row",
          onClick: ($) => E(t).activate(m.row)
        }, [
          (v(!0), w(se, null, fe(E(a), ($, x) => (v(), w("td", {
            key: E(oa)($, x),
            class: Gt(f($)),
            "data-dc-align": E(la)($),
            "data-dc-hide": $.hideBelow,
            title: d($, m)
          }, [
            $.scope ? (v(), w("span", Xo, [
              ae(da, {
                column: $,
                entry: m
              }, null, 8, ["column", "entry"]),
              ae(Rt, { entry: m }, null, 8, ["entry"])
            ])) : (v(), me(da, {
              key: 1,
              column: $,
              entry: m
            }, null, 8, ["column", "entry"]))
          ], 10, Go))), 128))
        ], 8, Uo))), 128))
      ])
    ])) : (v(), w("p", Ko, [
      g[4] || (g[4] = y("span", { class: "dc-table__headline" }, "No columns declared", -1)),
      y("span", qo, [
        xe(A(l.value) + " has no ", 1),
        g[0] || (g[0] = y("code", null, "columns", -1)),
        g[1] || (g[1] = xe(" in the schema, so there is no table to draw. ", -1)),
        g[2] || (g[2] = y("code", null, "defaultColumns()", -1)),
        g[3] || (g[3] = xe(" is the familiar eight. ", -1))
      ])
    ]));
  }
}), Ha = /* @__PURE__ */ ue(jo, [["__scopeId", "data-v-aa11c81b"]]);
function Yo(e) {
  const t = Ht([]), n = W(!1), a = Ht(null);
  let s = 0;
  const l = (r, f, d) => ({
    entity: r,
    rows: f.rows.map(
      (h, g) => Oa(h, g, r, e.isPinned(h.id))
    ),
    total: f.total,
    count: d ? r.count : String(f.total)
  }), o = () => {
    const r = ++s, f = e.query.value, d = e.schema.value, h = e.entities.value, g = e.limit.value, m = xn(f), $ = h.map((x) => ({
      entity: x,
      // Scope the query to this entity, keeping the expression and ordering
      // but dropping facets, which belong to whichever entity is selected.
      outcome: e.source.value.query({
        // Each card is the top few of its type, wherever the shell's own
        // result set has been paged to — so this asks for the first page.
        query: { ...f, entity: x.key, facets: un(x), page: 1 },
        schema: d,
        entity: x,
        limit: g,
        offset: 0
      })
    }));
    if ($.every(({ outcome: x }) => !(x instanceof Promise))) {
      t.value = $.map(
        ({ entity: x, outcome: k }) => l(x, k, m)
      ), a.value = null, n.value = !1;
      return;
    }
    n.value = !0, Promise.all($.map(({ outcome: x }) => Promise.resolve(x))).then((x) => {
      r === s && (t.value = x.map(
        (k, C) => l($[C].entity, k, m)
      ), a.value = null);
    }).catch((x) => {
      r === s && (a.value = x, t.value = []);
    }).finally(() => {
      r === s && (n.value = !1);
    });
  }, c = () => {
    try {
      o();
    } catch (r) {
      a.value = r, t.value = [], n.value = !1;
    }
  };
  return Me(
    [e.source, e.schema, e.query, e.entities, e.limit],
    c,
    { immediate: !0 }
  ), { previews: t, pending: n, error: a, refresh: c };
}
const Qo = {
  key: 0,
  class: "dc-types__state",
  role: "alert"
}, Zo = {
  key: 1,
  class: "dc-types__state",
  "aria-live": "polite"
}, Jo = ["data-dc-pending"], ei = ["data-dc-empty"], ti = ["onClick"], ni = { class: "dc-type__name" }, ai = { class: "dc-type__count dc-mono" }, si = { class: "dc-type__sr" }, li = {
  key: 0,
  class: "dc-type__empty"
}, ri = ["onClick"], oi = { class: "dc-type__identity" }, ii = { class: "dc-type__primary dc-truncate" }, ci = { class: "dc-type__secondary dc-mono dc-truncate" }, ui = { class: "dc-type__trailing dc-mono" }, di = { class: "dc-type__metric-value" }, fi = { class: "dc-type__metric-label" }, pi = { class: "dc-type__date" }, vi = ["onClick"], mi = /* @__PURE__ */ ce({
  __name: "TypeCardsView",
  setup(e) {
    const t = ye(), { previews: n, pending: a, error: s } = Yo({
      source: t.source,
      schema: t.schema,
      query: t.query,
      entities: t.entities,
      limit: t.previewsPerType,
      isPinned: (o) => t.isPinnedId(o)
    }), l = _(() => !t.isPristine.value);
    return (o, c) => E(s) ? (v(), w("p", Qo, " Could not load results: " + A(E(s) instanceof Error ? E(s).message : "the data source failed."), 1)) : !E(n).length && E(a) ? (v(), w("p", Zo, " Running query… ")) : (v(), w("div", {
      key: 2,
      class: "dc-types",
      "data-dc-pending": E(a) ? "true" : "false"
    }, [
      (v(!0), w(se, null, fe(E(n), (r) => (v(), w("section", {
        key: r.entity.key,
        class: "dc-type",
        "data-dc-empty": r.rows.length ? "false" : "true"
      }, [
        y("button", {
          type: "button",
          class: "dc-type__head",
          onClick: (f) => E(t).setEntity(r.entity.key)
        }, [
          y("span", ni, A(r.entity.label), 1),
          y("span", ai, A(r.count), 1),
          c[0] || (c[0] = y("span", {
            class: "dc-type__go",
            "aria-hidden": "true"
          }, "→", -1)),
          y("span", si, "Show only " + A(r.entity.label.toLowerCase()), 1)
        ], 8, ti),
        r.rows.length ? O("", !0) : (v(), w("p", li, A(l.value ? "No matches" : "Nothing here yet"), 1)),
        (v(!0), w(se, null, fe(r.rows, (f) => (v(), w("div", {
          key: f.key,
          class: "dc-type__row"
        }, [
          y("button", {
            type: "button",
            class: "dc-type__open",
            onClick: (d) => E(t).activate(f.row)
          }, [
            y("span", oi, [
              y("span", ii, A(f.row.primary), 1),
              y("span", ci, A(f.row.secondary), 1)
            ])
          ], 8, ri),
          y("span", ui, [
            ae(ot, {
              class: "dc-type__metric",
              entry: f,
              metric: "metric1"
            }, {
              default: Ze(() => [
                y("span", di, A(f.metric1), 1),
                y("span", fi, A(f.labels.metric1), 1)
              ]),
              _: 2
            }, 1032, ["entry"]),
            y("span", pi, A(f.date), 1),
            ae(Rt, { entry: f }, null, 8, ["entry"])
          ])
        ]))), 128)),
        r.entity.create ? (v(), w("button", {
          key: 1,
          type: "button",
          class: "dc-type__new",
          onClick: (f) => E(t).create(r.entity)
        }, [
          c[1] || (c[1] = y("span", {
            class: "dc-type__plus",
            "aria-hidden": "true"
          }, "+", -1)),
          xe(" " + A(r.entity.create), 1)
        ], 8, vi)) : O("", !0)
      ], 8, ei))), 128))
    ], 8, Jo));
  }
}), Ua = /* @__PURE__ */ ue(mi, [["__scopeId", "data-v-372c8f5e"]]), hi = ["data-dc-pending"], _i = {
  key: 0,
  class: "dc-results__state",
  role: "alert"
}, gi = { class: "dc-results__detail" }, yi = {
  key: 2,
  class: "dc-results__state",
  "aria-live": "polite"
}, wi = {
  key: 3,
  class: "dc-results__state"
}, bi = { class: "dc-results__detail" }, ki = /* @__PURE__ */ ce({
  __name: "ResultsArea",
  props: {
    views: {}
  },
  setup(e) {
    const t = e, n = ye(), a = {
      list: mn,
      cards: Ka,
      grid: qa,
      table: Ha,
      links: Ba,
      preview: Wa
    }, s = _(() => Ca(n.query.value)), l = _(() => {
      const f = n.query.value.view, d = t.views ?? [], [h] = d;
      return h === void 0 || d.includes(f) ? f : h;
    }), o = _(() => a[l.value] ?? mn), c = _(() => n.rows.value.length > 0), r = _(() => n.error.value !== null);
    return (f, d) => (v(), w("div", {
      class: "dc-results",
      "data-dc-pending": E(n).pending.value ? "true" : "false"
    }, [
      r.value ? (v(), w("p", _i, [
        d[1] || (d[1] = y("span", { class: "dc-results__headline" }, "Could not load results", -1)),
        y("span", gi, A(E(n).error.value instanceof Error ? E(n).error.value.message : "The data source failed."), 1)
      ])) : s.value ? (v(), me(Ua, { key: 1 })) : !c.value && E(n).pending.value ? (v(), w("p", yi, [...d[2] || (d[2] = [
        y("span", { class: "dc-results__detail" }, "Running query…", -1)
      ])])) : c.value ? (v(), me(ka(o.value), { key: 4 })) : (v(), w("div", wi, [
        d[3] || (d[3] = y("span", { class: "dc-results__headline" }, "Nothing matches this query", -1)),
        y("span", bi, A(E(n).summary.value), 1),
        E(n).isPristine.value ? O("", !0) : (v(), w("button", {
          key: 0,
          type: "button",
          class: "dc-results__clear",
          onClick: d[0] || (d[0] = (h) => E(n).clearFilters())
        }, A(E(n).isEverything.value ? "Clear filters" : "Search everything instead"), 1))
      ]))
    ], 8, hi));
  }
}), Ga = /* @__PURE__ */ ue(ki, [["__scopeId", "data-v-c00573c8"]]), $i = ["data-dc-theme"], xi = ["data-dc-width", "data-dc-align"], Mi = { class: "dc-shell__panel" }, Ci = /* @__PURE__ */ ce({
  __name: "DataShell",
  props: /* @__PURE__ */ jt({
    schema: {},
    source: {},
    route: {},
    defaults: {},
    limit: { default: 50 },
    previewsPerType: { default: 3 },
    views: {},
    accent: {},
    tokens: {},
    theme: { default: "minimal" },
    matchWidth: { default: "grow" },
    headAlign: { default: "center" },
    pinnable: { type: Boolean },
    navigationMode: { default: "push" },
    facetNavigationMode: { default: "replace" }
  }, {
    open: { type: Boolean, default: !1 },
    openModifiers: {},
    pinned: { default: () => [] },
    pinnedModifiers: {}
  }),
  emits: /* @__PURE__ */ jt(["activate", "create", "drill", "query-change", "toggle-pin"], ["update:open", "update:pinned"]),
  setup(e, { expose: t, emit: n }) {
    const a = e, s = n, l = Xt(e, "open"), o = Xt(e, "pinned"), c = kn(), r = ht(Aa, null), f = a.route || r ? null : Gs(), d = a.route ?? r ?? f;
    Je(() => f?.dispose?.());
    const h = _(() => il({ seed: a.schema.key })), g = _(() => a.source ?? h.value), m = kl({
      schema: () => a.schema,
      adapter: d,
      defaults: () => a.defaults,
      navigationMode: () => a.navigationMode,
      facetNavigationMode: () => a.facetNavigationMode
    }), $ = $l({
      source: g,
      query: m.query,
      schema: _(() => a.schema),
      entity: m.entity,
      limit: _(() => a.limit)
    });
    Me(m.query, (b) => s("query-change", b)), Me(
      [$.pageCount, $.pending, m.query],
      () => {
        if ($.pending.value) return;
        const b = $.pageCount.value;
        m.query.value.page > b && m.setPage(b, "replace");
      },
      // Immediately, since a pasted URL is past the end before anything changes;
      // and after the render, so the correction is a navigation the mounted shell
      // makes rather than one it makes on the way up. An async source is still
      // pending here and corrects itself when its count lands.
      { immediate: !0, flush: "post" }
    );
    const x = $a() ?? "dc-query-panel", k = W(null);
    function C() {
      l.value && (l.value = !1, At(() => {
        k.value?.$el?.querySelector(".dc-header__trigger")?.focus();
      }));
    }
    const T = _(() => new Set(o.value));
    function N(b) {
      const S = new Set(T.value);
      S.has(b.id) ? S.delete(b.id) : S.add(b.id), o.value = [...S], s("toggle-pin", b);
    }
    function R(b, S) {
      m.narrow(fl(a.schema, m.query.value, b), S?.key ?? null), s("drill", b, S);
    }
    const F = pl({
      ...m,
      schema: _(() => a.schema),
      entities: _(() => a.schema.entities),
      rows: $.rows,
      total: $.total,
      limit: _(() => a.limit),
      offset: $.offset,
      pageCount: $.pageCount,
      pending: $.pending,
      error: $.error,
      source: g,
      previewsPerType: _(() => a.previewsPerType),
      pinnable: _(() => a.pinnable === !0),
      isPinned: (b) => T.value.has(b.id),
      isPinnedId: (b) => T.value.has(b),
      togglePin: N,
      activate: (b) => s("activate", b),
      create: (b) => s("create", b),
      drill: R
    }), V = _(() => {
      if (!(!a.accent && !a.tokens))
        return { ...a.tokens, ...a.accent ? { "--dc-accent": a.accent } : {} };
    });
    return t({
      query: m.query,
      openPanel: () => {
        l.value = !0;
      },
      closePanel: C
    }), (b, S) => (v(), w("div", {
      class: "dc-shell",
      "data-dc-theme": e.theme,
      style: Ae(V.value)
    }, [
      y("div", {
        class: "dc-shell__head",
        "data-dc-width": e.matchWidth,
        "data-dc-align": e.matchWidth === "shrink" ? e.headAlign : void 0
      }, [
        ae(Ia, {
          ref_key: "headerRef",
          ref: k,
          expanded: l.value,
          "panel-id": E(x),
          onToggle: S[0] || (S[0] = (Z) => l.value = !l.value)
        }, ta({ _: 2 }, [
          c.actions ? {
            name: "actions",
            fn: Ze(() => [
              Ke(b.$slots, "actions", {}, void 0, !0)
            ]),
            key: "0"
          } : void 0
        ]), 1032, ["expanded", "panel-id"]),
        l.value ? (v(), w(se, { key: 0 }, [
          y("div", {
            class: "dc-shell__scrim",
            onClick: C
          }),
          y("div", Mi, [
            ae(Va, {
              "panel-id": E(x),
              views: e.views,
              onClose: C
            }, ta({ _: 2 }, [
              c["panel-section"] ? {
                name: "panel-section",
                fn: Ze(() => [
                  Ke(b.$slots, "panel-section", {}, void 0, !0)
                ]),
                key: "0"
              } : void 0
            ]), 1032, ["panel-id", "views"])
          ])
        ], 64)) : O("", !0)
      ], 8, xi),
      Ke(b.$slots, "results", {
        rows: E(F).rows.value,
        total: E(F).total.value,
        offset: E(F).offset.value,
        pageCount: E(F).pageCount.value,
        query: E(F).query.value,
        pending: E(F).pending.value
      }, () => [
        ae(Ga, { views: e.views }, null, 8, ["views"])
      ], !0)
    ], 12, $i));
  }
}), Ei = /* @__PURE__ */ ue(Ci, [["__scopeId", "data-v-737c7342"]]), Ct = (e) => e.separator !== !0 && e.heading !== !0 && e.disabled !== !0, Pi = ["aria-label"], Si = ["role", "aria-label"], Ai = ["data-dc-item"], zi = {
  key: 0,
  class: "dc-menu__rule",
  role: "separator"
}, Ri = ["role", "aria-checked", "aria-haspopup", "aria-expanded", "aria-disabled", "disabled", "data-dc-item", "onClick", "onMouseenter"], Ti = {
  class: "dc-menu__mark",
  "aria-hidden": "true"
}, Fi = { class: "dc-menu__label dc-truncate" }, Li = {
  key: 0,
  class: "dc-menu__key dc-mono"
}, Di = {
  key: 1,
  class: "dc-menu__more",
  "aria-hidden": "true"
}, Ii = /* @__PURE__ */ ce({
  __name: "MenuList",
  props: {
    items: {},
    at: {},
    label: {},
    autofocus: { type: Boolean }
  },
  emits: ["choose", "dismiss"],
  setup(e, { expose: t, emit: n }) {
    const a = e, s = n, l = W(null), o = W([]), c = W(null), r = W(null), f = W(null), d = W(!1), h = _(
      () => a.items.flatMap((b, S) => Ct(b) ? [S] : [])
    ), g = _(() => {
      const b = [{ entries: [] }];
      return a.items.forEach((S, Z) => {
        S.heading ? b.push({ heading: S, entries: [] }) : b[b.length - 1]?.entries.push({ item: S, index: Z });
      }), b.filter((S) => S.entries.length > 0);
    }), m = W({ x: a.at.x, y: a.at.y });
    async function $() {
      m.value = { x: a.at.x, y: a.at.y }, await At();
      const b = l.value?.getBoundingClientRect();
      if (!b) return;
      const S = 8;
      let Z = a.at.x, oe = a.at.y;
      if (Z + b.width > window.innerWidth - S) {
        const pe = a.at.mirrorX === void 0 ? null : a.at.mirrorX - b.width;
        Z = pe !== null && pe >= S ? pe : window.innerWidth - b.width - S;
      }
      oe + b.height > window.innerHeight - S && (oe = window.innerHeight - b.height - S), m.value = { x: Math.max(S, Z), y: Math.max(S, oe) };
    }
    const x = _(() => ({ left: `${m.value.x}px`, top: `${m.value.y}px` }));
    function k(b) {
      c.value = b, b !== null && At(() => o.value[b]?.focus());
    }
    function C(b, S) {
      const Z = h.value;
      if (Z.length === 0) return null;
      if (b === null) return S === 1 ? Z[0] ?? null : Z[Z.length - 1] ?? null;
      const oe = Z.indexOf(b);
      return oe === -1 ? Z[0] ?? null : Z[(oe + S + Z.length) % Z.length] ?? null;
    }
    function T(b, S) {
      if (!a.items[b]?.items?.length) return;
      const oe = o.value[b]?.getBoundingClientRect(), pe = l.value?.getBoundingClientRect();
      !oe || !pe || (f.value = { x: pe.right - 4, y: oe.top - 4, mirrorX: pe.left + 4 }, r.value = b, d.value = S);
    }
    function N(b) {
      const S = r.value;
      r.value = null, f.value = null, b && S !== null && k(S);
    }
    function R(b) {
      const S = a.items[b];
      if (!(!S || !Ct(S))) {
        if (S.items?.length) {
          T(b, !0);
          return;
        }
        s("choose", S);
      }
    }
    function F(b) {
      const S = b.key;
      if (S === "Escape") {
        b.preventDefault(), b.stopPropagation(), r.value !== null ? N(!0) : s("dismiss");
        return;
      }
      if (S === "ArrowDown" || S === "ArrowUp") {
        b.preventDefault(), b.stopPropagation(), N(!1), k(C(c.value, S === "ArrowDown" ? 1 : -1));
        return;
      }
      if (S === "Home" || S === "End") {
        b.preventDefault(), b.stopPropagation(), N(!1), k(C(null, S === "Home" ? 1 : -1));
        return;
      }
      if (S === "ArrowRight") {
        const Z = c.value;
        Z !== null && a.items[Z]?.items?.length && (b.preventDefault(), b.stopPropagation(), T(Z, !0));
        return;
      }
      if (S === "ArrowLeft") {
        r.value !== null && (b.preventDefault(), b.stopPropagation(), N(!0));
        return;
      }
      if (S === "Enter" || S === " ") {
        const Z = c.value;
        if (Z === null) return;
        b.preventDefault(), b.stopPropagation(), R(Z);
      }
    }
    function V(b) {
      const S = a.items[b];
      !S || !Ct(S) || (r.value !== null && r.value !== b && N(!1), k(b), S.items?.length && T(b, !1));
    }
    return As(() => {
      $(), a.autofocus && k(C(null, 1));
    }), Me(() => a.at, $, { deep: !0 }), Me(() => a.items, () => void $(), { deep: !0 }), Je(() => {
      r.value = null;
    }), t({ root: l }), (b, S) => {
      const Z = xa("MenuList", !0);
      return v(), w("div", {
        ref_key: "root",
        ref: l,
        class: "dc-menu",
        role: "menu",
        "aria-label": e.label,
        style: Ae(x.value),
        onKeydown: F
      }, [
        (v(!0), w(se, null, fe(g.value, (oe, pe) => (v(), w("div", {
          key: `${pe}-${oe.heading?.label ?? ""}`,
          class: "dc-menu__group",
          role: oe.heading ? "group" : "none",
          "aria-label": oe.heading?.label
        }, [
          oe.heading ? (v(), w("div", {
            key: 0,
            class: "dc-menu__heading dc-truncate",
            "aria-hidden": "true",
            "data-dc-item": oe.heading.id
          }, A(oe.heading.label), 9, Ai)) : O("", !0),
          (v(!0), w(se, null, fe(oe.entries, ({ item: Y, index: Ce }) => (v(), w(se, {
            key: Y.id ?? `${Ce}-${Y.label ?? ""}`
          }, [
            Y.separator ? (v(), w("div", zi)) : (v(), w("button", {
              key: 1,
              ref_for: !0,
              ref: (ze) => {
                ze && (o.value[Ce] = ze);
              },
              type: "button",
              class: "dc-menu__item",
              role: Y.checked === void 0 ? "menuitem" : "menuitemcheckbox",
              "aria-checked": Y.checked === void 0 ? void 0 : Y.checked,
              "aria-haspopup": Y.items?.length ? "menu" : void 0,
              "aria-expanded": Y.items?.length ? r.value === Ce : void 0,
              "aria-disabled": Y.disabled ? "true" : void 0,
              disabled: Y.disabled,
              "data-dc-item": Y.id,
              tabindex: "-1",
              onClick: (ze) => R(Ce),
              onMouseenter: (ze) => V(Ce)
            }, [
              y("span", Ti, A(Y.checked ? "✓" : ""), 1),
              y("span", Fi, A(Y.label), 1),
              Y.shortcut ? (v(), w("span", Li, A(Y.shortcut), 1)) : Y.items?.length ? (v(), w("span", Di, "›")) : O("", !0)
            ], 40, Ri))
          ], 64))), 128))
        ], 8, Si))), 128)),
        r.value !== null && f.value ? (v(), me(Z, {
          key: r.value,
          items: e.items[r.value]?.items ?? [],
          at: f.value,
          label: e.items[r.value]?.label,
          autofocus: d.value,
          onChoose: S[0] || (S[0] = (oe) => s("choose", oe)),
          onDismiss: S[1] || (S[1] = (oe) => N(!0))
        }, null, 8, ["items", "at", "label", "autofocus"])) : O("", !0)
      ], 44, Pi);
    };
  }
}), Xa = /* @__PURE__ */ ue(Ii, [["__scopeId", "data-v-9b1413fa"]]), Ni = ["data-dc-theme", "aria-label"], Vi = ["aria-expanded", "aria-disabled", "disabled", "data-dc-menu", "tabindex", "onClick", "onMouseenter"], Oi = /* @__PURE__ */ ce({
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
    const n = e, a = _(() => {
      if (!(!n.accent && !n.tokens))
        return { ...n.tokens, ...n.accent ? { "--dc-accent": n.accent } : {} };
    }), s = t, l = W(null), o = W([]), c = W(null), r = W(null), f = W(!1), d = _(
      () => n.menus.flatMap((R, F) => Ct(R) ? [F] : [])
    );
    function h(R, F) {
      const V = o.value[R]?.getBoundingClientRect(), b = n.menus[R];
      !V || !b || !Ct(b) || (r.value = { x: V.left, y: V.bottom + 2, mirrorX: V.right }, c.value = R, f.value = F);
    }
    function g(R) {
      const F = c.value;
      c.value = null, r.value = null, R && F !== null && o.value[F]?.focus();
    }
    function m(R) {
      c.value === R ? g(!0) : h(R, !1);
    }
    function $(R) {
      c.value === null || c.value === R || h(R, !1);
    }
    function x(R, F) {
      const V = d.value;
      if (V.length === 0) return null;
      if (R === null) return F === 1 ? V[0] ?? null : V[V.length - 1] ?? null;
      const b = V.indexOf(R);
      return b === -1 ? V[0] ?? null : V[(b + F + V.length) % V.length] ?? null;
    }
    function k(R) {
      const F = R.key;
      if (F === "Escape") {
        if (c.value === null) return;
        R.preventDefault(), g(!0);
        return;
      }
      if (F === "ArrowDown" && c.value === null) {
        const S = C();
        if (S === null) return;
        R.preventDefault(), h(S, !0);
        return;
      }
      if (F !== "ArrowLeft" && F !== "ArrowRight") return;
      const V = c.value ?? C(), b = x(V, F === "ArrowRight" ? 1 : -1);
      b !== null && (R.preventDefault(), c.value !== null ? h(b, !0) : o.value[b]?.focus());
    }
    function C() {
      const R = o.value.findIndex((F) => F === document.activeElement);
      return R === -1 ? d.value[0] ?? null : R;
    }
    function T(R) {
      const F = R.target;
      !F || l.value?.contains(F) || g(!1);
    }
    Me(c, (R) => {
      R !== null ? window.addEventListener("pointerdown", T, !0) : window.removeEventListener("pointerdown", T, !0);
    }), Je(() => window.removeEventListener("pointerdown", T, !0));
    function N(R) {
      g(!0), R.action?.(), s("choose", R);
    }
    return (R, F) => (v(), w("div", {
      ref_key: "bar",
      ref: l,
      class: "dc-shell dc-menubar",
      role: "menubar",
      "data-dc-theme": e.theme,
      "aria-label": e.label ?? "Main menu",
      style: Ae(a.value),
      onKeydown: k
    }, [
      (v(!0), w(se, null, fe(e.menus, (V, b) => (v(), w("button", {
        key: V.id ?? V.label ?? b,
        ref_for: !0,
        ref: (S) => {
          S && (o.value[b] = S);
        },
        type: "button",
        class: "dc-menubar__item",
        role: "menuitem",
        "aria-haspopup": "menu",
        "aria-expanded": c.value === b,
        "aria-disabled": V.disabled ? "true" : void 0,
        disabled: V.disabled,
        "data-dc-menu": V.id ?? V.label,
        tabindex: b === (d.value[0] ?? 0) ? 0 : -1,
        onClick: (S) => m(b),
        onMouseenter: (S) => $(b)
      }, A(V.label), 41, Vi))), 128)),
      c.value !== null && r.value ? (v(), me(Xa, {
        key: c.value,
        items: e.menus[c.value]?.items ?? [],
        at: r.value,
        label: e.menus[c.value]?.label,
        autofocus: f.value,
        onChoose: N,
        onDismiss: F[0] || (F[0] = (V) => g(!0))
      }, null, 8, ["items", "at", "label", "autofocus"])) : O("", !0)
    ], 44, Ni));
  }
}), fu = /* @__PURE__ */ ue(Oi, [["__scopeId", "data-v-93dbd2e4"]]), Ki = ["aria-label", "aria-expanded", "disabled"], qi = { "aria-hidden": "true" }, Bi = /* @__PURE__ */ ce({
  __name: "MenuButton",
  props: {
    items: {},
    label: {},
    glyph: { default: "⋯" }
  },
  emits: ["choose"],
  setup(e, { emit: t }) {
    const n = t, a = W(null), s = W(null), l = W(null), o = W(!1), c = _(() => l.value !== null);
    function r($) {
      const x = a.value?.getBoundingClientRect();
      x && (l.value = { x: x.left, y: x.bottom + 4, mirrorX: x.right }, o.value = $);
    }
    function f($) {
      l.value = null, $ && a.value?.focus();
    }
    function d() {
      c.value ? f(!0) : r(!1);
    }
    function h($) {
      $.key !== "ArrowDown" || c.value || ($.preventDefault(), r(!0));
    }
    function g($) {
      const x = $.target;
      x && (a.value?.contains(x) || s.value?.root?.contains(x) || f(!1));
    }
    Me(c, ($) => {
      $ ? window.addEventListener("pointerdown", g, !0) : window.removeEventListener("pointerdown", g, !0);
    }), Je(() => window.removeEventListener("pointerdown", g, !0));
    function m($) {
      f(!0), $.action?.(), n("choose", $);
    }
    return ($, x) => (v(), w(se, null, [
      y("button", {
        ref_key: "trigger",
        ref: a,
        type: "button",
        class: "dc-menu-button",
        "aria-label": e.label,
        "aria-haspopup": "menu",
        "aria-expanded": c.value,
        disabled: e.items.length === 0,
        onClick: d,
        onKeydown: h
      }, [
        y("span", qi, A(e.glyph), 1)
      ], 40, Ki),
      l.value ? (v(), me(Xa, {
        key: 0,
        ref_key: "menu",
        ref: s,
        items: e.items,
        at: l.value,
        label: e.label,
        autofocus: o.value,
        onChoose: m,
        onDismiss: x[0] || (x[0] = (k) => f(!0))
      }, null, 8, ["items", "at", "label", "autofocus"])) : O("", !0)
    ], 64));
  }
}), Fn = /* @__PURE__ */ ue(Bi, [["__scopeId", "data-v-48f5ada5"]]), yt = (e) => e.kind === "split", q = (e) => e.kind === "group", G = (e) => e.kind === "float", st = { x: 16, y: 16, w: 360, h: 260 }, Yt = 28, ja = 120, hn = 220, Ya = 38, ut = 6;
function Tt(e, t) {
  let n = !1;
  const a = e.frames.map((s, l) => {
    const o = t(s.node, l);
    return o === s.node ? s : (n = !0, { ...s, node: o });
  });
  return n ? { ...e, frames: a } : e;
}
function Fe(e) {
  return { kind: "group", panels: [e] };
}
function pu(e, t, n) {
  return {
    kind: "group",
    panels: e,
    ...t ? { active: t } : {},
    ...n ? { title: n } : {}
  };
}
const ie = (e) => typeof e == "string", Ln = (e) => ie(e) ? Fe(e) : e, Ft = (e) => ie(e) ? [e] : We(e), fa = (e) => e.panels.filter(ie), Wi = (e) => e.panels.filter((t) => !ie(t)), Se = (e, t) => e.panels.includes(t);
function Lt(e, t, n) {
  let a = !1;
  const s = e.panels.map((l) => {
    if (ie(l) || !J(l, t)) return l;
    const o = n(l);
    return o !== l && (a = !0), o;
  });
  return a ? { ...e, panels: s } : e;
}
function Zt(e, t) {
  return { node: e, rect: { ...st, ...t } };
}
function Dn(e, t) {
  return t ? { kind: "float", frames: e, title: t } : { kind: "float", frames: e };
}
function In(e, t) {
  const n = { ...st, ...t };
  return Dn(
    e.map(
      (a, s) => Zt(a, {
        ...n,
        x: n.x + s * Yt,
        y: n.y + s * Yt
      })
    )
  );
}
function Nn(e, t, n, a) {
  return {
    kind: "split",
    direction: e,
    children: t,
    ...n ? { sizes: n } : {},
    ...a ? { title: a } : {}
  };
}
const Vn = (e, t, n) => Nn("row", e, t, n), vu = (e, t, n) => Nn("column", e, t, n);
function he(e) {
  return {
    ...e.title ? { title: e.title } : {},
    ...e.fixedView ? { fixedView: !0 } : {},
    ...e.headless ? { headless: !0 } : {}
  };
}
const it = (e) => e.fixedView === !0 || e.headless === !0 || !!e.title, mu = (e) => ({ ...e, headless: !0 }), hu = (e) => ({ ...e, fixedView: !0 }), Hi = (e) => e === "left" || e === "right" ? "row" : "column";
function We(e) {
  return q(e) ? e.panels.flatMap(Ft) : G(e) ? e.frames.flatMap((t) => We(t.node)) : e.children.flatMap(We);
}
function J(e, t) {
  return q(e) ? e.panels.some((n) => ie(n) ? n === t : J(n, t)) : G(e) ? e.frames.some((n) => J(n.node, t)) : e.children.some((n) => J(n, t));
}
const Qa = (e) => We(e).length === 0, _n = (e) => !q(e) && it(e), gn = (e) => Qa(e) && !_n(e);
function Jt(e) {
  return yt(e) ? e.children.map((t, n) => ({ node: t, index: n })) : G(e) ? e.frames.map((t, n) => ({ node: t.node, index: n })) : e.panels.flatMap((t, n) => ie(t) ? [] : [{ node: t, index: n }]);
}
const On = (e) => Jt(e).map((t) => t.node);
function ct(e) {
  const t = e.active;
  if (t) {
    const n = e.panels.findIndex(
      (a) => ie(a) ? a === t : J(a, t)
    );
    if (n >= 0) return n;
  }
  return 0;
}
function Za(e) {
  const t = e.panels[ct(e)];
  return t !== void 0 && ie(t) ? t : "";
}
function ke(e) {
  if (ie(e)) return e;
  if (q(e)) {
    const n = e.panels[ct(e)];
    return n === void 0 ? "" : ke(n);
  }
  if (G(e)) {
    const n = e.frames[e.frames.length - 1];
    return n ? ke(n.node) : "";
  }
  const t = e.children[0];
  return t ? ke(t) : "";
}
function ft(e, t) {
  if (q(e) && Se(e, t)) return e;
  for (const n of On(e)) {
    const a = ft(n, t);
    if (a) return a;
  }
  return null;
}
function Ui(e) {
  const t = On(e).flatMap(Ui);
  return q(e) ? [e, ...t] : t;
}
function ge(e, t) {
  if (q(e)) {
    for (const n of Wi(e)) {
      const a = ge(n, t);
      if (a) return a;
    }
    return null;
  }
  if (G(e)) {
    for (const n of e.frames)
      if (J(n.node, t))
        return ge(n.node, t) ?? n;
    return null;
  }
  for (const n of e.children) {
    const a = ge(n, t);
    if (a) return a;
  }
  return null;
}
function sn(e, t, n = ja) {
  const a = (c, r) => r > 0 ? Math.max(Math.min(c, r), Math.min(n, r)) : Math.max(c, n), s = a(e.w, t.w), l = a(e.h, t.h), o = (c, r, f) => Math.min(Math.max(c, 0), Math.max(f - r, 0));
  return {
    x: Math.round(o(e.x, s, t.w)),
    y: Math.round(o(e.y, l, t.h)),
    w: Math.round(s),
    h: Math.round(l)
  };
}
function pa(e, t, n, a, s = ja) {
  let { x: l, y: o, w: c, h: r } = e;
  return t.includes("e") && (c = e.w + n), t.includes("w") && (c = e.w - n, l = e.x + n), t.includes("s") && (r = e.h + a), t.includes("n") && (r = e.h - a, o = e.y + a), c < s && (t.includes("w") && (l = e.x + e.w - s), c = s), r < s && (t.includes("n") && (o = e.y + e.h - s), r = s), { x: l, y: o, w: c, h: r };
}
const Ja = (e, t) => e.x === t.x && e.y === t.y && e.w === t.w && e.h === t.h;
function pt(e, t, n) {
  if (q(e)) return Lt(e, t, (l) => pt(l, t, n));
  if (G(e)) {
    let l = !1;
    const o = e.frames.map((c) => {
      if (!J(c.node, t)) return c;
      if (ge(c.node, t)) {
        const f = pt(c.node, t, n);
        return f === c.node ? c : (l = !0, { ...c, node: f });
      }
      const r = n(c);
      return r === c ? c : (l = !0, r);
    });
    return l ? { ...e, frames: o } : e;
  }
  if (!J(e, t)) return e;
  let a = !1;
  const s = e.children.map((l) => {
    const o = pt(l, t, n);
    return o !== l && (a = !0), o;
  });
  return a ? { ...e, children: s } : e;
}
function Gi(e, t, n) {
  return pt(e, t, (a) => Ja(a.rect, n) ? a : { ...a, rect: n });
}
const Ye = (e) => e.maximized === !0, es = (e) => (t) => {
  if (Ye(t) === e) return t;
  if (e) {
    const { minimized: s, ...l } = t;
    return { ...l, maximized: !0 };
  }
  const { maximized: n, ...a } = t;
  return a;
};
function Xi(e, t, n = !0) {
  return pt(e, t, es(n));
}
function _u(e, t) {
  const n = ge(e, t);
  return n ? Xi(e, t, !Ye(n)) : e;
}
const at = (e) => e.minimized === !0, ts = (e) => (t) => {
  if (at(t) === e) return t;
  if (e) {
    const { maximized: s, ...l } = t;
    return { ...l, minimized: !0 };
  }
  const { minimized: n, ...a } = t;
  return a;
};
function ji(e, t, n = !0) {
  return pt(e, t, ts(n));
}
function gu(e, t) {
  const n = ge(e, t);
  return n ? ji(e, t, !at(n)) : e;
}
function nt(e, t) {
  const n = t[t.length - 1];
  if (n === void 0) return null;
  const a = Qe(e, t.slice(0, -1));
  return !a || !G(a) ? null : a.frames[n] ?? null;
}
function yn(e, t) {
  if (G(e)) {
    for (const [n, a] of e.frames.entries()) {
      if (!J(a.node, t)) continue;
      const s = yn(a.node, t);
      return s ? [n, ...s] : [n];
    }
    return null;
  }
  for (const { node: n, index: a } of Jt(e)) {
    if (!J(n, t)) continue;
    const s = yn(n, t);
    return s ? [a, ...s] : null;
  }
  return null;
}
function Kn(e, t, n) {
  const a = t[t.length - 1];
  if (a === void 0) return e;
  const s = t.slice(0, -1), l = Qe(e, s);
  if (!l || !G(l)) return e;
  const o = l.frames[a];
  if (!o) return e;
  const c = n(o);
  if (c === o) return e;
  const r = [...l.frames];
  return r[a] = c, rt(e, s, { ...l, frames: r });
}
function va(e, t, n) {
  return Kn(
    e,
    t,
    (a) => Ja(a.rect, n) ? a : { ...a, rect: n }
  );
}
function Yi(e, t, n = !0) {
  return Kn(e, t, es(n));
}
function Qi(e, t, n = !0) {
  return Kn(e, t, ts(n));
}
function Et(e, t) {
  const [n, ...a] = t;
  if (n === void 0) return e;
  if (G(e)) {
    const o = e.frames[n];
    if (!o) return e;
    const c = Et(o.node, a), r = c === o.node ? o : { ...o, node: c };
    if (n === e.frames.length - 1 && r === o) return e;
    const f = [...e.frames];
    return f.splice(n, 1), f.push(r), { ...e, frames: f };
  }
  const s = Qe(e, [n]);
  if (!s) return e;
  const l = Et(s, a);
  return l === s ? e : rt(e, [n], l);
}
function Zi(e, t) {
  const n = [...t];
  let a = e;
  return t.forEach((s, l) => {
    a && (G(a) && (n[l] = a.frames.length - 1), a = Qe(a, [s]));
  }), n;
}
function qt(e, t, n, a) {
  if (q(e)) return Lt(e, n, (o) => qt(o, t, n, a));
  if (G(e)) {
    const o = e.frames.findIndex((r) => J(r.node, n)), c = e.frames[o];
    if (!c) return e;
    if (ge(c.node, n)) {
      const r = qt(c.node, t, n, a);
      if (r === c.node) return e;
      const f = [...e.frames];
      return f[o] = { ...c, node: r }, { ...e, frames: f };
    }
    return { ...e, frames: [...e.frames, Zt(Fe(t), a)] };
  }
  if (!J(e, n)) return e;
  let s = !1;
  const l = e.children.map((o) => {
    const c = qt(o, t, n, a);
    return c !== o && (s = !0), c;
  });
  return s ? { ...e, children: l } : e;
}
function ma(e, t, n, a) {
  if (t === n || !J(e, t) || !J(e, n) || !ge(e, n)) return e;
  const s = lt(e, t);
  if (!s) return e;
  const l = qt(s, t, n, a);
  return l === s ? e : _e(l);
}
function Ji(e, t, n) {
  return G(e) ? { ...e, frames: [...e.frames, Zt(Fe(t), n)] } : q(e) ? as(e, t) : {
    kind: "split",
    direction: e.direction,
    children: [...e.children, Fe(t)],
    sizes: [...Be(e), 1],
    ...he(e)
  };
}
function ns(e, t, n, a) {
  const s = n[0];
  if (s === void 0) return Ji(e, t, a);
  const l = n.slice(1), o = (d, h) => h === s ? ns(d, t, l, a) : lt(d, t);
  if (G(e)) {
    const d = e.frames.flatMap((h, g) => {
      const m = o(h.node, g);
      return m ? [m === h.node ? h : { ...h, node: m }] : [];
    });
    return { ...e, frames: d };
  }
  if (q(e)) {
    const d = ct(e), h = [];
    e.panels.forEach(($, x) => {
      if (ie($)) {
        $ !== t && h.push($);
        return;
      }
      const k = o($, x);
      k && h.push(k);
    });
    const m = e.active && h.some(($) => Ft($).includes(e.active)) ? e.active : ke(h[d] ?? h[h.length - 1]);
    return {
      kind: "group",
      panels: h,
      ...m ? { active: m } : {},
      ...he(e)
    };
  }
  const c = Be(e), r = [], f = [];
  return e.children.forEach((d, h) => {
    const g = o(d, h);
    g && (r.push(g), f.push(c[h] ?? 0));
  }), { kind: "split", direction: e.direction, children: r, sizes: f, ...he(e) };
}
function ha(e, t, n, a) {
  const s = Qe(e, n);
  return !s || !Qa(s) || !J(e, t) ? e : _e(ns(e, t, n, a));
}
function ln(e, t) {
  if (q(e)) return Lt(e, t, (s) => ln(s, t));
  if (G(e)) {
    const s = e.frames.findIndex((f) => J(f.node, t)), l = e.frames[s];
    if (!l) return e;
    const o = ln(l.node, t), c = o === l.node ? l : { ...l, node: o };
    if (s === e.frames.length - 1 && c === l) return e;
    const r = [...e.frames];
    return r.splice(s, 1), r.push(c), { ...e, frames: r };
  }
  if (!J(e, t)) return e;
  let n = !1;
  const a = e.children.map((s) => {
    const l = ln(s, t);
    return l !== s && (n = !0), l;
  });
  return n ? { ...e, children: a } : e;
}
function qn(e, t) {
  if (e <= 0) return [];
  const n = () => Array.from({ length: e }, () => 1 / e);
  if (!t || t.length !== e) return n();
  const a = t.map((l) => Number.isFinite(l) && l > 0 ? l : 0), s = a.reduce((l, o) => l + o, 0);
  return s <= 0 ? n() : a.map((l) => l / s);
}
const Be = (e) => qn(e.children.length, e.sizes), Re = (e) => {
  const t = q(e) ? e.panels.length : e.children.length;
  return e.places?.length === t ? e.places : void 0;
};
function _e(e) {
  if (q(e)) return ec(e);
  if (G(e)) {
    const c = e.frames.flatMap((r) => {
      const f = _e(r.node);
      return gn(f) ? [] : [f === r.node ? r : { ...r, node: f }];
    });
    return c.length === e.frames.length && c.every((r, f) => r === e.frames[f]) ? e : { ...e, frames: c };
  }
  if (e.children.length === 0) return e;
  const t = Be(e), n = Re(e), a = [], s = [], l = [];
  e.children.forEach((c, r) => {
    const f = _e(c), d = t[r] ?? 0;
    if (gn(f)) return;
    if (!n && yt(f) && f.direction === e.direction && !Re(f) && !it(f)) {
      const g = Be(f);
      f.children.forEach((m, $) => {
        a.push(m), s.push(d * (g[$] ?? 0));
      });
      return;
    }
    a.push(f), s.push(d);
    const h = n?.[r];
    h && l.push(h);
  });
  const o = a[0];
  return a.length === 1 && o && !it(e) ? o : {
    kind: "split",
    direction: e.direction,
    children: a,
    sizes: qn(a.length, s),
    ...he(e),
    ...l.length === a.length && l.length > 0 ? { places: l } : {}
  };
}
function ec(e) {
  if (e.panels.every(ie)) return e;
  const t = ke(e), n = Re(e), a = [], s = [];
  e.panels.forEach((c, r) => {
    const f = n?.[r];
    if (ie(c)) {
      a.push(c), f && s.push(f);
      return;
    }
    const d = _e(c);
    if (!gn(d)) {
      if (q(d) && !it(d) && !Re(d)) {
        a.push(...d.panels);
        return;
      }
      a.push(d), f && s.push(f);
    }
  });
  const l = a[0];
  if (a.length === 1 && l !== void 0 && !ie(l) && !it(e))
    return l;
  if (a.length === e.panels.length && a.every((c, r) => c === e.panels[r]))
    return e;
  const o = t && a.some((c) => Ft(c).includes(t)) ? t : void 0;
  return {
    kind: "group",
    panels: a,
    ...o ? { active: o } : {},
    ...he(e),
    ...s.length === a.length && s.length > 0 ? { places: s } : {}
  };
}
function lt(e, t) {
  if (G(e)) {
    const o = e.frames.flatMap((c) => {
      const r = lt(c.node, t);
      return r ? [r === c.node ? c : { ...c, node: r }] : [];
    });
    return o.length === 0 && !_n(e) ? null : { ...e, frames: o };
  }
  if (q(e)) {
    if (!J(e, t)) return e;
    const o = ct(e), c = [];
    for (const d of e.panels) {
      if (ie(d)) {
        d !== t && c.push(d);
        continue;
      }
      const h = lt(d, t);
      h && c.push(h);
    }
    if (c.length === 0) return null;
    const f = e.active && c.some((d) => Ft(d).includes(e.active)) ? e.active : ke(c[o] ?? c[c.length - 1]);
    return f ? { kind: "group", panels: c, active: f, ...he(e) } : { kind: "group", panels: c, ...he(e) };
  }
  const n = Be(e), a = [], s = [];
  if (e.children.forEach((o, c) => {
    const r = lt(o, t);
    r && (a.push(r), s.push(n[c] ?? 0));
  }), a.length === 0)
    return _n(e) ? { kind: "split", direction: e.direction, children: a, sizes: [], ...he(e) } : null;
  const l = a[0];
  return a.length === 1 && l && !it(e) ? l : _e({
    kind: "split",
    direction: e.direction,
    children: a,
    sizes: s,
    ...he(e)
  });
}
function as(e, t, n) {
  const a = e.panels.filter((l) => l !== t), s = n === void 0 ? a.length : Math.max(0, Math.min(n, a.length));
  return a.splice(s, 0, t), { kind: "group", panels: a, active: t, ...he(e) };
}
function xt(e, t, n, a, s) {
  const l = (m) => Tt(
    m,
    ($) => J($, n) ? xt($, t, n, a, s) : $
  );
  if (a === "float") return e;
  const o = (m) => Lt(m, n, ($) => xt($, t, n, a, s));
  if (a === "center")
    return q(e) ? Se(e, n) ? as(e, t, s) : o(e) : G(e) ? l(e) : {
      ...e,
      children: e.children.map(
        (m) => J(m, n) ? xt(m, t, n, a, s) : m
      )
    };
  const c = Hi(a), r = a === "left" || a === "top", f = (m) => ({
    kind: "split",
    direction: c,
    children: r ? [Fe(t), m] : [m, Fe(t)],
    sizes: [0.5, 0.5]
  });
  if (q(e)) return Se(e, n) ? f(e) : o(e);
  if (G(e)) return l(e);
  const d = Be(e), h = e.children.findIndex(
    (m) => q(m) && Se(m, n)
  );
  if (h >= 0 && e.direction === c) {
    const m = (d[h] ?? 0) / 2, $ = [...e.children], x = [...d];
    return $.splice(r ? h : h + 1, 0, Fe(t)), x.splice(h, 1, m, m), {
      kind: "split",
      direction: c,
      children: $,
      sizes: x,
      ...he(e)
    };
  }
  const g = e.children.map((m) => J(m, n) ? q(m) && Se(m, n) ? f(m) : xt(m, t, n, a) : m);
  return {
    kind: "split",
    direction: e.direction,
    children: g,
    sizes: d,
    ...he(e)
  };
}
function vt(e, t) {
  if (q(e)) {
    if (Se(e, t))
      return Za(e) === t ? e : { ...e, active: t };
    const s = e.panels.findIndex((r) => !ie(r) && J(r, t)), l = e.panels[s];
    if (l === void 0 || ie(l)) return e;
    const o = vt(l, t);
    if (o === l && e.active === t) return e;
    const c = [...e.panels];
    return c[s] = o, { ...e, panels: c, active: t };
  }
  if (!J(e, t)) return e;
  if (G(e)) return Tt(e, (s) => vt(s, t));
  let n = !1;
  const a = e.children.map((s) => {
    const l = vt(s, t);
    return l !== s && (n = !0), l;
  });
  return n ? { ...e, children: a } : e;
}
function Pt(e, t, n) {
  if (q(e)) {
    if (!Se(e, t)) return Lt(e, t, (f) => Pt(f, t, n));
    const a = e.panels.indexOf(t), s = Math.max(0, Math.min(n, e.panels.length - 1));
    if (a === s) return e;
    const l = [...e.panels];
    l.splice(a, 1), l.splice(s, 0, t);
    const o = Re(e), c = o ? [...o] : void 0;
    c && c.splice(s, 0, ...c.splice(a, 1));
    const r = ke(e);
    return {
      kind: "group",
      panels: l,
      ...r ? { active: r } : {},
      ...he(e),
      ...c ? { places: c } : {}
    };
  }
  return J(e, t) ? G(e) ? Tt(e, (a) => Pt(a, t, n)) : { ...e, children: e.children.map((a) => Pt(a, t, n)) } : e;
}
function Bt(e, t, n) {
  if (t === n) return e;
  if (q(e)) {
    if (!J(e, t) && !J(e, n)) return e;
    const a = (l) => l === t ? n : l === n ? t : l, s = e.panels.map((l) => ie(l) ? a(l) : Bt(l, t, n));
    return { ...e, panels: s, ...e.active ? { active: a(e.active) } : {} };
  }
  return G(e) ? Tt(e, (a) => Bt(a, t, n)) : { ...e, children: e.children.map((a) => Bt(a, t, n)) };
}
function Ot(e, t, n, a, s) {
  if (a === "float" || !J(e, t) || !J(e, n)) return e;
  const l = ft(e, t);
  if (a === "center" && l && Se(l, n)) {
    if (s === void 0) return e;
    const c = l.panels.indexOf(t), r = s > c ? s - 1 : s;
    return r === c ? e : vt(Pt(e, t, r), t);
  }
  if (t === n) return e;
  const o = lt(e, t);
  return o ? _e(xt(o, t, n, a, s)) : e;
}
function ss(e, t, n) {
  if (q(e)) {
    const s = e.panels[t];
    if (s === void 0 || ie(s)) return e;
    const l = [...e.panels];
    return l[t] = n, { ...e, panels: l };
  }
  if (G(e)) {
    const s = e.frames[t];
    if (!s) return e;
    const l = [...e.frames];
    return l[t] = { ...s, node: n }, { ...e, frames: l };
  }
  const a = [...e.children];
  return a[t] = n, { ...e, children: a };
}
function Dt(e, t, n) {
  const a = Jt(e);
  if (!q(e) && a.some(({ node: s }) => q(s) && Se(s, t))) {
    const s = n(e);
    return s === e ? null : s;
  }
  for (const { node: s, index: l } of a) {
    if (!J(s, t)) continue;
    const o = Dt(s, t, n);
    return o ? ss(e, l, o) : null;
  }
  return null;
}
function yu(e, t, n) {
  const a = Dt(
    e,
    t,
    (s) => yt(s) && s.direction !== n ? { ...s, direction: n } : s
  );
  return a ? _e(a) : e;
}
function ls(e) {
  return G(e) ? [e] : Re(e) || it(e) ? [e] : q(e) ? [...e.panels] : e.children.flatMap(ls);
}
function rs(e, t) {
  if (q(e)) return e;
  const n = On(e).map(ls), a = n.flat(), s = t && a.some((o) => Ft(o).includes(t)) ? t : void 0, l = tc(e, n);
  return _e({
    kind: "group",
    panels: a,
    ...s ? { active: s } : {},
    ...he(e),
    ...l ? { places: l } : {}
  });
}
function tc(e, t) {
  const n = G(e) ? e.frames.map(({ node: a, ...s }) => s) : Re(e);
  if (n)
    return t.every((a) => a.length === 1) ? n : void 0;
}
function nc(e, t) {
  const n = Dt(e, t, (a) => rs(a, t));
  return n ? _e(n) : e;
}
function Bn(e, t, n) {
  if (q(e) && Se(e, t)) {
    const a = n(e);
    return a === e ? null : a;
  }
  for (const { node: a, index: s } of Jt(e)) {
    if (!J(a, t)) continue;
    const l = Bn(a, t, n);
    return l ? ss(e, s, l) : null;
  }
  return null;
}
function _a(e, t, n) {
  const a = Bn(e, t, (s) => {
    if (s.panels.length < 2) return s;
    const l = Re(s);
    return {
      ...Nn(n, s.panels.map(Ln)),
      ...he(s),
      ...l ? { places: l } : {}
    };
  });
  return a ? _e(a) : e;
}
function wn(e, t) {
  if (q(e)) return e;
  if (G(e)) {
    const s = e.frames.findIndex(
      (c) => q(c.node) && c.node.panels.includes(t)
    ), l = e.frames[s], o = l && q(l.node) ? l.node : null;
    if (l && o && o.panels.length > 1) {
      const c = In(o.panels.map(Ln), l.rect).frames;
      return {
        ...e,
        frames: [...e.frames.slice(0, s), ...c, ...e.frames.slice(s + 1)]
      };
    }
    return Tt(e, (c) => wn(c, t));
  }
  if (!J(e, t)) return e;
  let n = !1;
  const a = e.children.map((s) => {
    const l = wn(s, t);
    return l !== s && (n = !0), l;
  });
  return n ? { ...e, children: a } : e;
}
function ac(e, t, n) {
  const a = ft(e, t);
  if (!a || a.panels.length < 2) return e;
  if (ge(e, t)?.node === a) {
    const o = wn(e, t);
    return o === e ? e : _e(o);
  }
  const l = Bn(e, t, (o) => ({
    ...Dn(os(o.panels.map(Ln), Re(o), n)),
    ...he(o)
  }));
  return l ? _e(l) : e;
}
function os(e, t, n) {
  return t ? e.map((a, s) => ({ ...t[s], node: a })) : In(e, n).frames;
}
function is(e, t) {
  return { ...Dn(os(e.children, Re(e), t)), ...he(e) };
}
function wu(e, t, n) {
  const a = Dt(
    e,
    t,
    (s) => G(s) ? s : is(s, n)
  );
  return a ? _e(a) : q(e) && Se(e, t) ? In([e], n) : e;
}
function sc(e, t) {
  const n = (s) => t === "column" ? s.rect.y : s.rect.x, a = (s) => t === "column" ? s.rect.x : s.rect.y;
  return [...e].sort((s, l) => n(s) - n(l) || a(s) - a(l));
}
function cs(e, t) {
  const n = sc(e.frames, t);
  return {
    kind: "split",
    direction: t,
    children: n.map((a) => a.node),
    ...he(e),
    places: n.map(({ node: a, ...s }) => s)
  };
}
function bu(e, t, n = "row") {
  const a = Dt(
    e,
    t,
    (s) => G(s) ? cs(s, n) : s
  );
  return a ? _e(a) : e;
}
function us(e) {
  if (G(e)) return null;
  const t = q(e) ? e.panels.length === 1 ? e.panels[0] : void 0 : e.children.length === 1 ? e.children[0] : void 0;
  return t === void 0 || ie(t) || q(t) && t.panels.length === 1 && ie(t.panels[0]) ? null : t;
}
const lc = (e) => {
  const { title: t, fixedView: n, headless: a, ...s } = e;
  return s;
};
function rc(e, t) {
  const n = us(e);
  return n ? t === "inner" ? n : { ...lc(n), ...he(e) } : e;
}
function _t(e) {
  return e.title ? e.title : q(e) ? "" : G(e) ? "Desktop" : e.direction === "row" ? "Row" : "Column";
}
function St(e, t) {
  if (q(e)) {
    const a = e.panels[ct(e)];
    return a === void 0 ? "" : ie(a) ? t(a) ?? a : _t(a) || St(a, t);
  }
  if (e.title) return e.title;
  if (G(e)) {
    const a = e.frames[e.frames.length - 1];
    return a ? a.title ?? St(a.node, t) : "";
  }
  const n = e.children[0];
  return n ? St(n, t) : "";
}
function Qe(e, t) {
  let n = e;
  for (const a of t) {
    if (!n) return null;
    if (yt(n)) n = n.children[a];
    else if (G(n)) n = n.frames[a]?.node;
    else {
      const s = n.panels[a];
      n = s === void 0 || ie(s) ? void 0 : s;
    }
  }
  return n ?? null;
}
function rt(e, t, n) {
  if (t.length === 0) return n;
  const [a, ...s] = t;
  if (a === void 0) return e;
  if (G(e)) {
    const r = e.frames[a];
    if (!r) return e;
    const f = rt(r.node, s, n);
    if (f === r.node) return e;
    const d = [...e.frames];
    return d[a] = { ...r, node: f }, { ...e, frames: d };
  }
  if (q(e)) {
    const r = e.panels[a];
    if (r === void 0 || ie(r)) return e;
    const f = rt(r, s, n);
    if (f === r) return e;
    const d = [...e.panels];
    return d[a] = f, { ...e, panels: d };
  }
  const l = e.children[a];
  if (!l) return e;
  const o = rt(l, s, n);
  if (o === l) return e;
  const c = [...e.children];
  return c[a] = o, { ...e, children: c };
}
function Wt(e, t, n) {
  if (t.length === 0)
    return yt(e) ? { ...e, sizes: qn(e.children.length, n) } : e;
  const [a, ...s] = t;
  if (a === void 0) return e;
  if (G(e)) {
    const c = e.frames[a];
    if (!c) return e;
    const r = Wt(c.node, s, n);
    if (r === c.node) return e;
    const f = [...e.frames];
    return f[a] = { ...c, node: r }, { ...e, frames: f };
  }
  if (q(e)) {
    const c = e.panels[a];
    if (c === void 0 || ie(c)) return e;
    const r = Wt(c, s, n);
    if (r === c) return e;
    const f = [...e.panels];
    return f[a] = r, { ...e, panels: f };
  }
  const l = e.children[a];
  if (!l) return e;
  const o = [...e.children];
  return o[a] = Wt(l, s, n), { ...e, children: o };
}
function ga(e, t, n, a = 0.02) {
  const s = e[t], l = e[t + 1];
  if (s === void 0 || l === void 0) return e;
  const o = s + l;
  if (o < a * 2) return e;
  const c = [...e], r = Math.min(Math.max(s + n, a), o - a);
  return c[t] = r, c[t + 1] = o - r, c;
}
function Qt(e) {
  if (!q(e) || e.panels.length >= 2) return e;
  const t = e.panels[0];
  return t !== void 0 && !ie(t) ? e : { ...Vn([oc(e)]), ...he(e) };
}
const oc = (e) => {
  if (!e.title) return e;
  const { title: t, ...n } = e;
  return n;
};
function ya(e) {
  return e.length === 0 ? null : Vn(e.map(Fe));
}
function ic(e, t) {
  if (!e) return ya(t);
  const n = new Set(t), a = /* @__PURE__ */ new Set(), s = /* @__PURE__ */ new Set();
  for (const r of We(e))
    !n.has(r) || a.has(r) ? s.add(r) : a.add(r);
  let l = e;
  for (const r of s)
    l = l ? lt(l, r) : null;
  const o = new Set(l ? We(l) : []), c = t.filter((r) => !o.has(r));
  if (c.length === 0) return l ? Qt(_e(l)) : null;
  if (!l) return ya(c);
  if (G(l)) {
    const r = l.frames.length;
    return {
      ...l,
      frames: [
        ...l.frames,
        ...c.map(
          (f, d) => Zt(Fe(f), {
            x: st.x + (r + d) * Yt,
            y: st.y + (r + d) * Yt
          })
        )
      ]
    };
  }
  return Qt(_e(Vn([l, ...c.map(Fe)])));
}
const Wn = Symbol("dc.windowContext");
function cc(e) {
  return bn(Wn, e), e;
}
function Hn() {
  const e = ht(Wn, null);
  if (!e)
    throw new Error(
      "[header-content-layout] No window context found. Render this component inside <WindowFrame>."
    );
  return e;
}
const uc = ["data-dc-glyph"], dc = { class: "dc-glyph__line" }, fc = ["d"], pc = {
  key: 0,
  class: "dc-glyph__aqua"
}, vc = ["d"], mc = /* @__PURE__ */ ce({
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
    return (a, s) => (v(), w("svg", {
      class: "dc-glyph",
      "data-dc-glyph": e.kind,
      viewBox: "0 0 10 10",
      "aria-hidden": "true",
      focusable: "false"
    }, [
      y("g", dc, [
        (v(!0), w(se, null, fe(t[e.kind], (l) => (v(), w("path", {
          key: l,
          d: l
        }, null, 8, fc))), 128))
      ]),
      n[e.kind] ? (v(), w("g", pc, [
        (v(!0), w(se, null, fe(n[e.kind], (l) => (v(), w("path", {
          key: l,
          d: l
        }, null, 8, vc))), 128))
      ])) : O("", !0)
    ], 8, uc));
  }
}), mt = /* @__PURE__ */ ue(mc, [["__scopeId", "data-v-4d2872c0"]]), hc = ["data-dc-order", "data-dc-path", "data-dc-maximized", "data-dc-minimized", "data-dc-dragging"], _c = ["data-dc-movable"], gc = { class: "dc-float__title dc-truncate" }, yc = {
  key: 1,
  class: "dc-float__controls dc-controls"
}, wc = ["aria-label", "aria-pressed", "data-dc-minimize"], bc = ["aria-label", "aria-pressed", "data-dc-maximize"], kc = ["aria-label", "data-dc-close"], $c = { class: "dc-float__content" }, xc = ["data-dc-handle", "onPointerdown"], Mc = /* @__PURE__ */ ce({
  __name: "WindowFloat",
  props: {
    frame: {},
    path: {},
    order: {},
    place: {}
  },
  setup(e) {
    const t = e, n = Hn(), a = _(() => ke(t.frame.node)), s = _(() => n.panelFor(a.value)?.fixed === !0), l = _(() => Ye(t.frame)), o = _(() => at(t.frame)), c = _(() => l.value || o.value), r = _(() => n.resizable.value && !s.value && !c.value), f = _(() => n.movable.value && !s.value && !c.value), d = _(() => {
      const F = We(t.frame.node);
      return F.length === 1 ? F[0] ?? null : null;
    }), h = _(() => d.value !== null && n.closable(d.value)), g = _(() => t.frame.node.headless === !0), m = _(
      () => !g.value && (!q(t.frame.node) || o.value)
    ), $ = _(
      () => t.frame.title || _t(t.frame.node) || St(t.frame.node, (F) => n.panelFor(F)?.title)
    ), x = _(() => n.spaceMenu(t.path));
    function k(F) {
      F.target?.closest("button, a, input, select, textarea, label") || n.beginFrameDragAt(t.path, F, "move");
    }
    function C(F) {
      F.target?.closest("button, a, input, select, textarea, label") || (o.value ? n.toggleMinimizeAt(t.path) : n.toggleMaximizeAt(t.path));
    }
    const T = _(() => {
      const F = n.framing.value;
      return F !== null && J(t.frame.node, F);
    }), N = _(() => ({
      // Neither maximizing nor rolling up overwrites the rect: it is where the
      // window goes back to, and both are a way of not being there for a while.
      ...l.value ? { inset: "0" } : o.value && t.place ? {
        left: `${t.place.x}px`,
        bottom: `${t.place.bottom}px`,
        width: `${hn}px`,
        height: `${Ya}px`
      } : {
        left: `${t.frame.rect.x}px`,
        top: `${t.frame.rect.y}px`,
        width: `${t.frame.rect.w}px`,
        height: `${t.frame.rect.h}px`
      },
      // Back to front. The DOM order says the same thing, but a frame that paints
      // a shadow over its neighbour should not depend on that being noticed.
      zIndex: t.order + 1
    })), R = ["n", "s", "e", "w", "nw", "ne", "sw", "se"];
    return (F, V) => (v(), w("div", {
      class: "dc-float",
      style: Ae(N.value),
      "data-dc-order": e.order,
      "data-dc-path": e.path.join("/"),
      "data-dc-maximized": l.value ? "true" : "false",
      "data-dc-minimized": o.value ? "true" : "false",
      "data-dc-dragging": T.value ? "true" : "false",
      onPointerdown: V[3] || (V[3] = (b) => E(n).raiseAt(e.path))
    }, [
      m.value ? (v(), w("header", {
        key: 0,
        class: "dc-float__bar",
        "data-dc-movable": f.value ? "true" : "false",
        onPointerdown: k,
        onDblclick: C
      }, [
        y("span", gc, A($.value), 1),
        x.value.length ? (v(), me(Fn, {
          key: 0,
          items: x.value,
          label: `${$.value} menu`
        }, null, 8, ["items", "label"])) : O("", !0),
        !s.value || o.value && h.value && d.value ? (v(), w("div", yc, [
          s.value ? O("", !0) : (v(), w("button", {
            key: 0,
            type: "button",
            class: "dc-float__button dc-control",
            "aria-label": `${o.value ? "Unroll" : "Minimize"} ${$.value}`,
            "aria-pressed": o.value,
            "data-dc-minimize": a.value,
            onClick: V[0] || (V[0] = (b) => E(n).toggleMinimizeAt(e.path))
          }, [
            ae(mt, {
              kind: o.value ? "unroll" : "minimize"
            }, null, 8, ["kind"])
          ], 8, wc)),
          s.value ? O("", !0) : (v(), w("button", {
            key: 1,
            type: "button",
            class: "dc-float__button dc-control",
            "aria-label": `${l.value ? "Restore" : "Maximize"} ${$.value}`,
            "aria-pressed": l.value,
            "data-dc-maximize": a.value,
            onClick: V[1] || (V[1] = (b) => E(n).toggleMaximizeAt(e.path))
          }, [
            ae(mt, {
              kind: l.value ? "restore" : "maximize"
            }, null, 8, ["kind"])
          ], 8, bc)),
          o.value && h.value && d.value ? (v(), w("button", {
            key: 2,
            type: "button",
            class: "dc-float__button dc-control",
            "aria-label": `Close ${$.value}`,
            "data-dc-close": d.value,
            onClick: V[2] || (V[2] = (b) => E(n).close(d.value))
          }, [
            ae(mt, { kind: "close" })
          ], 8, kc)) : O("", !0)
        ])) : O("", !0)
      ], 40, _c)) : O("", !0),
      y("div", $c, [
        Ke(F.$slots, "default", {}, void 0, !0)
      ]),
      (v(!0), w(se, null, fe(r.value ? R : [], (b) => (v(), w("span", {
        key: b,
        class: "dc-float__grip",
        "data-dc-handle": b,
        "aria-hidden": "true",
        onPointerdown: Oe((S) => E(n).beginFrameDragAt(e.path, S, b), ["stop"])
      }, null, 40, xc))), 128))
    ], 44, hc));
  }
}), Cc = /* @__PURE__ */ ue(Mc, [["__scopeId", "data-v-f035684c"]]), Un = Symbol("dc.paneContext");
function Ec(e) {
  return bn(Un, e), e;
}
function ku() {
  return ht(Un, null);
}
function $u(e) {
  const t = ht(Wn, null), n = ht(Un, null);
  if (!t || !n) return () => {
  };
  const a = t.registerMenu(
    () => n.panel.value,
    () => $t(e)
  );
  return zs() && ba(a), a;
}
const Pc = ["data-dc-panel", "data-dc-panels", "data-dc-tabbed", "data-dc-floating", "data-dc-maximized", "data-dc-headless", "data-dc-active", "data-dc-dragging", "aria-label"], Sc = ["data-dc-movable"], Ac = ["aria-label", "aria-pressed"], zc = ["data-dc-space-name"], Rc = { class: "dc-truncate" }, Tc = ["aria-label"], Fc = {
  key: 0,
  class: "dc-pane__insert",
  "aria-hidden": "true"
}, Lc = ["id", "data-dc-panel", "data-dc-space", "aria-selected", "aria-controls", "tabindex", "onPointerdown", "onClick", "onKeydown"], Dc = { class: "dc-tab__name dc-truncate" }, Ic = {
  key: 0,
  class: "dc-pane__sub dc-mono dc-truncate"
}, Nc = ["aria-label", "data-dc-close", "onClick"], Vc = {
  key: 0,
  class: "dc-pane__insert",
  "aria-hidden": "true"
}, Oc = { class: "dc-pane__tools" }, Kc = {
  key: 2,
  class: "dc-pane__controls dc-controls"
}, qc = ["aria-label", "data-dc-minimize"], Bc = ["aria-label", "aria-pressed", "data-dc-maximize"], Wc = ["aria-label", "data-dc-close"], Hc = ["id", "role", "aria-labelledby"], Uc = ["id", "role", "aria-labelledby"], Gc = ["data-dc-edge"], Xc = /* @__PURE__ */ ce({
  __name: "WindowPane",
  props: {
    group: {},
    path: {}
  },
  setup(e) {
    const t = e, n = Hn(), a = $a() ?? "dc-pane", s = _(
      () => t.group.panels.flatMap((L, K) => {
        if (!ie(L)) {
          const $e = _t(L) || St(L, (we) => n.panelFor(we)?.title);
          return [{ kind: "space", index: K, id: `space-${K}`, title: $e, node: L }];
        }
        const j = n.panelFor(L);
        return j ? [{ kind: "panel", index: K, id: L, title: j.title, panel: j }] : [];
      })
    ), l = _(() => s.value.length > 1), o = _(() => {
      const L = ct(t.group);
      return s.value.find((K) => K.index === L) ?? s.value[0] ?? null;
    }), c = _(() => o.value?.kind === "space" ? o.value.node : null), r = _(() => c.value ? "" : Za(t.group)), f = _(() => c.value ? null : n.panelFor(r.value)), d = _(() => o.value?.title ?? ""), h = _(() => n.spaceNames.value ? t.group.title ?? "" : ""), g = _(() => [...t.path, o.value?.index ?? 0]), m = _(() => r.value || fa(t.group)[0] || ""), $ = _(() => n.viewFor(r.value)), x = _(() => t.group.headless === !0), k = _(() => n.focused.value === r.value), C = _(() => n.dragging.value === r.value), T = _(() => n.moving.value === r.value), N = _(() => n.frameOf(m.value) !== null), R = _(() => n.panelFor(m.value)?.fixed === !0), F = _(
      () => !c.value && (n.canMove(r.value) || N.value && n.movable.value && !R.value)
    ), V = _(
      () => c.value ? n.spaceMenu(g.value) : n.menuFor(r.value)
    ), b = (L) => n.closable(L);
    Ec({ panel: r });
    const S = _(() => n.maximized(m.value)), Z = _(
      () => N.value && !R.value || !l.value && !!f.value && b(f.value.id)
    ), oe = (L) => `${a}-tab-${L}`, pe = _(() => `${a}-body`), Y = _(() => {
      const L = n.dropTarget.value;
      return !L || !Se(t.group, L.panel) || L.edge === "float" ? null : L;
    }), Ce = _(() => Y.value?.index === void 0 ? Y.value?.edge ?? null : null), ze = _(() => Y.value?.index ?? null), D = () => f.value ? n.renderContent(f.value, $.value, k.value) ?? null : null, X = () => f.value ? n.renderActions(f.value, $.value, k.value) ?? null : null;
    let ee = null;
    function te(L) {
      const K = ee !== null && Math.hypot(L.clientX - ee.x, L.clientY - ee.y) >= 4;
      return ee = null, K;
    }
    const ve = (L) => L.kind === "panel" ? L.id : ke(L.node);
    function Ee(L, K) {
      K.kind !== "space" && (n.focus(K.id), ee = { x: L.clientX, y: L.clientY }, n.beginDrag(K.id, L));
    }
    function He(L, K) {
      if (te(L)) return;
      const j = ve(K);
      j && n.selectPanel(j);
    }
    function Ue(L) {
      r.value && n.focus(r.value), !L.target?.closest(".dc-tab, button, a, input, select, textarea, label") && (N.value ? n.beginFrameDrag(m.value, L, "move") : n.beginDrag(r.value, L));
    }
    function Ge(L) {
      ee = { x: L.clientX, y: L.clientY }, n.beginDrag(r.value, L);
    }
    function Xe(L) {
      te(L) || n.toggleMoveMode(r.value);
    }
    const Le = {
      ArrowLeft: "left",
      ArrowRight: "right",
      ArrowUp: "up",
      ArrowDown: "down"
    };
    function De(L) {
      if (!T.value) return;
      if (L.key === "Escape") {
        L.preventDefault(), n.toggleMoveMode(r.value);
        return;
      }
      const K = Le[L.key];
      K && (L.preventDefault(), N.value ? n.nudgeFrame(r.value, K, L.shiftKey) : n.nudge(r.value, K, L.shiftKey));
    }
    function Ie(L) {
      !N.value || L.target?.closest(".dc-tab, button, a, input, select, textarea, label") || n.toggleMaximize(m.value);
    }
    function wt(L, K) {
      L.stopPropagation(), ee = null, n.close(K);
    }
    function It(L, K) {
      const j = s.value.length;
      let $e = null;
      if (L.key === "ArrowRight" ? $e = (K + 1) % j : L.key === "ArrowLeft" ? $e = (K - 1 + j) % j : L.key === "Home" ? $e = 0 : L.key === "End" && ($e = j - 1), $e === null) return;
      L.preventDefault();
      const we = s.value[$e];
      if (!we) return;
      const bt = ve(we);
      bt && n.selectPanel(bt);
    }
    return (L, K) => o.value ? (v(), w("section", {
      key: 0,
      class: "dc-pane",
      "data-dc-panel": r.value || void 0,
      "data-dc-panels": E(fa)(e.group).join(" ") || void 0,
      "data-dc-tabbed": l.value ? "true" : "false",
      "data-dc-floating": N.value ? "true" : "false",
      "data-dc-maximized": S.value ? "true" : "false",
      "data-dc-headless": x.value ? "true" : "false",
      "data-dc-active": k.value ? "true" : "false",
      "data-dc-dragging": C.value ? "true" : "false",
      "aria-label": d.value,
      onFocusin: K[7] || (K[7] = (j) => r.value && E(n).focus(r.value))
    }, [
      x.value ? O("", !0) : (v(), w("header", {
        key: 0,
        class: "dc-pane__head",
        "data-dc-movable": F.value ? "true" : "false",
        onPointerdown: Ue,
        onDblclick: Ie
      }, [
        F.value ? (v(), w("button", {
          key: 0,
          type: "button",
          class: "dc-pane__grip",
          "aria-label": `Move ${d.value}`,
          "aria-pressed": T.value,
          onPointerdown: Ge,
          onClick: Xe,
          onKeydown: De
        }, [...K[8] || (K[8] = [
          y("span", { "aria-hidden": "true" }, "⠿", -1)
        ])], 40, Ac)) : O("", !0),
        h.value ? (v(), w("span", {
          key: 1,
          class: "dc-pane__name",
          "data-dc-space-name": h.value
        }, [
          y("span", Rc, A(h.value), 1)
        ], 8, zc)) : O("", !0),
        y("div", {
          class: "dc-pane__tabs",
          role: "tablist",
          "aria-label": `${d.value} panels`
        }, [
          (v(!0), w(se, null, fe(s.value, (j, $e) => (v(), w(se, {
            key: j.id
          }, [
            ze.value === $e ? (v(), w("span", Fc)) : O("", !0),
            y("button", {
              id: oe(j.id),
              type: "button",
              role: "tab",
              class: "dc-tab",
              "data-dc-panel": j.kind === "panel" ? j.id : void 0,
              "data-dc-space": j.kind === "space" ? j.title : void 0,
              "aria-selected": j.index === o.value.index,
              "aria-controls": pe.value,
              tabindex: j.index === o.value.index ? 0 : -1,
              onPointerdown: (we) => Ee(we, j),
              onClick: (we) => He(we, j),
              onKeydown: (we) => It(we, $e)
            }, [
              y("span", Dc, A(j.title), 1),
              j.kind === "panel" && j.panel.subtitle ? (v(), w("span", Ic, A(j.panel.subtitle), 1)) : O("", !0),
              l.value && j.kind === "panel" && b(j.id) ? (v(), w("span", {
                key: 1,
                class: "dc-tab__close",
                role: "button",
                tabindex: "-1",
                "aria-label": `Close ${j.title}`,
                "data-dc-close": j.id,
                onPointerdown: K[0] || (K[0] = Oe(() => {
                }, ["stop"])),
                onClick: (we) => wt(we, j.id)
              }, [...K[9] || (K[9] = [
                y("span", { "aria-hidden": "true" }, "×", -1)
              ])], 40, Nc)) : O("", !0)
            ], 40, Lc)
          ], 64))), 128)),
          ze.value === s.value.length ? (v(), w("span", Vc)) : O("", !0)
        ], 8, Tc),
        y("div", Oc, [
          ae(X),
          V.value.length ? (v(), me(Fn, {
            key: 0,
            items: V.value,
            label: `${d.value} menu`
          }, null, 8, ["items", "label"])) : O("", !0)
        ]),
        Z.value ? (v(), w("div", Kc, [
          N.value && !R.value ? (v(), w("button", {
            key: 0,
            type: "button",
            class: "dc-pane__button dc-control",
            "aria-label": `Minimize ${d.value}`,
            "data-dc-minimize": m.value,
            onPointerdown: K[1] || (K[1] = Oe(() => {
            }, ["stop"])),
            onClick: K[2] || (K[2] = (j) => E(n).toggleMinimize(m.value))
          }, [
            ae(mt, { kind: "minimize" })
          ], 40, qc)) : O("", !0),
          N.value && !R.value ? (v(), w("button", {
            key: 1,
            type: "button",
            class: "dc-pane__button dc-control",
            "aria-label": `${S.value ? "Restore" : "Maximize"} ${d.value}`,
            "aria-pressed": S.value,
            "data-dc-maximize": m.value,
            onPointerdown: K[3] || (K[3] = Oe(() => {
            }, ["stop"])),
            onClick: K[4] || (K[4] = (j) => E(n).toggleMaximize(m.value))
          }, [
            ae(mt, {
              kind: S.value ? "restore" : "maximize"
            }, null, 8, ["kind"])
          ], 40, Bc)) : O("", !0),
          !l.value && f.value && b(f.value.id) ? (v(), w("button", {
            key: 2,
            type: "button",
            class: "dc-pane__close dc-control",
            "aria-label": `Close ${d.value}`,
            "data-dc-close": f.value.id,
            onPointerdown: K[5] || (K[5] = Oe(() => {
            }, ["stop"])),
            onClick: K[6] || (K[6] = (j) => E(n).close(f.value.id))
          }, [
            ae(mt, { kind: "close" })
          ], 40, Wc)) : O("", !0)
        ])) : O("", !0)
      ], 40, Sc)),
      c.value ? (v(), w("div", {
        key: 1,
        id: pe.value,
        class: "dc-pane__space",
        role: x.value ? void 0 : "tabpanel",
        "aria-labelledby": x.value ? void 0 : oe(o.value.id)
      }, [
        Ke(L.$slots, "space", {
          node: c.value,
          path: g.value
        }, void 0, !0)
      ], 8, Hc)) : (v(), w("div", {
        key: 2,
        id: pe.value,
        class: "dc-pane__body",
        role: x.value ? void 0 : "tabpanel",
        "aria-labelledby": x.value ? void 0 : oe(r.value)
      }, [
        ae(D)
      ], 8, Uc)),
      Ce.value ? (v(), w("div", {
        key: 3,
        class: "dc-pane__drop",
        "data-dc-edge": Ce.value,
        "aria-hidden": "true"
      }, null, 8, Gc)) : O("", !0)
    ], 40, Pc)) : O("", !0);
  }
}), ds = /* @__PURE__ */ ue(Xc, [["__scopeId", "data-v-44fd2b2d"]]), jc = ["data-dc-space", "data-dc-path", "aria-label"], Yc = {
  key: 0,
  class: "dc-space__head"
}, Qc = { class: "dc-space__title dc-truncate" }, Zc = ["data-dc-direction"], Jc = {
  key: 0,
  class: "dc-space__drop",
  "aria-hidden": "true"
}, eu = ["aria-orientation", "aria-label", "aria-valuenow", "aria-disabled", "tabindex", "onPointerdown", "onKeydown"], tu = /* @__PURE__ */ ce({
  __name: "WindowNode",
  props: {
    node: {},
    path: {},
    framed: { type: Boolean }
  },
  setup(e) {
    const t = e, n = Hn(), a = W(null), s = _(() => q(t.node) ? t.node : null), l = _(() => yt(t.node) ? t.node : null), o = _(() => G(t.node) ? t.node : null), c = _(
      () => l.value ? l.value.children : o.value?.frames.map((D) => D.node) ?? []
    ), r = _(() => l.value ? Be(l.value) : []), f = _(
      () => (o.value?.frames ?? []).map((D, X) => ({
        held: D,
        /** Place in the stack, counted from the back — what `z-index` follows. */
        order: X,
        key: b(D.node),
        path: [...t.path, X]
      })).sort((D, X) => D.key < X.key ? -1 : D.key > X.key ? 1 : 0)
    ), d = _(() => _t(t.node)), h = _(() => n.spaceMenu(t.path)), g = _(() => t.node.headless === !0), m = _(() => o.value ? "desktop" : l.value?.direction ?? ""), $ = W(null), x = W(0);
    let k = null;
    Me(
      $,
      (D) => {
        k?.disconnect(), k = null, !(!D || typeof ResizeObserver > "u") && (x.value = D.clientWidth, k = new ResizeObserver(([X]) => {
          x.value = X?.contentRect.width ?? 0;
        }), k.observe(D));
      },
      { immediate: !0 }
    ), Je(() => k?.disconnect());
    const C = _(() => {
      const D = Math.max(
        1,
        Math.floor((x.value + ut) / (hn + ut))
      ), X = /* @__PURE__ */ new Map();
      let ee = 0;
      for (const te of f.value)
        te.held.minimized === !0 && (X.set(te.key, {
          x: ut + ee % D * (hn + ut),
          bottom: ut + Math.floor(ee / D) * (Ya + ut)
        }), ee += 1);
      return X;
    }), T = (D) => !!D && D.join("/") === t.path.join("/"), N = _(() => {
      const D = n.dropTarget.value, X = o.value;
      if (!X || !D?.rect || D.edge !== "float") return null;
      if (D.space) return T(D.space) ? D.rect : null;
      const ee = ge(X, D.panel);
      return ee && X.frames.includes(ee) ? D.rect : null;
    }), R = _(() => {
      const D = n.dropTarget.value;
      return !!D && !D.rect && T(D.space);
    }), F = _(() => l.value?.direction === "row"), V = _(() => c.value.map((D, X) => [...t.path, X])), b = (D) => [...We(D)].sort().join("/"), S = (D) => {
      const X = We(D)[0];
      return (X ? n.panelFor(X)?.title : null) ?? X ?? "panel";
    }, Z = (D) => {
      const X = c.value[D], ee = c.value[D + 1];
      return !X || !ee ? "Resize panels" : `Resize ${S(X)} and ${S(ee)}`;
    }, oe = (D) => {
      const X = r.value[D] ?? 0, ee = r.value[D + 1] ?? 0, te = X + ee;
      return te > 0 ? Math.round(X / te * 100) : 50;
    };
    function pe() {
      const D = a.value, X = D ? F.value ? D.clientWidth : D.clientHeight : 0;
      return X <= 0 ? 0.05 : Math.min(n.minPanelSize.value / X, 0.4);
    }
    let Y = null;
    function Ce(D, X) {
      const ee = l.value, te = a.value;
      if (!n.resizable.value || !ee || !te || D.button !== 0) return;
      const ve = F.value ? te.clientWidth : te.clientHeight;
      if (ve <= 0) return;
      const Ee = F.value ? D.clientX : D.clientY, He = Be(ee), Ue = Math.min(n.minPanelSize.value / ve, 0.4);
      D.preventDefault();
      const Ge = (De) => {
        const Ie = ((F.value ? De.clientX : De.clientY) - Ee) / ve;
        n.setSizes(t.path, ga(He, X, Ie, Ue));
      }, Xe = () => Y?.(), Le = (De) => {
        De.key === "Escape" && (n.setSizes(t.path, He), Y?.());
      };
      Y = () => {
        window.removeEventListener("pointermove", Ge), window.removeEventListener("pointerup", Xe), window.removeEventListener("pointercancel", Xe), window.removeEventListener("keydown", Le), Y = null;
      }, window.addEventListener("pointermove", Ge), window.addEventListener("pointerup", Xe), window.addEventListener("pointercancel", Xe), window.addEventListener("keydown", Le);
    }
    Je(() => Y?.());
    function ze(D, X) {
      const ee = l.value;
      if (!n.resizable.value || !ee) return;
      const te = F.value ? "ArrowRight" : "ArrowDown", ve = F.value ? "ArrowLeft" : "ArrowUp", Ee = D.shiftKey ? 0.1 : 0.02;
      if (D.key !== te && D.key !== ve) return;
      const He = D.key === te ? Ee : -Ee;
      D.preventDefault(), n.setSizes(t.path, ga(Be(ee), X, He, pe()));
    }
    return (D, X) => {
      const ee = xa("WindowNode", !0);
      return s.value ? (v(), me(ds, {
        key: 0,
        group: s.value,
        path: e.path
      }, {
        space: Ze(({ node: te, path: ve }) => [
          ae(ee, {
            node: te,
            path: ve,
            framed: ""
          }, null, 8, ["node", "path"])
        ]),
        _: 1
      }, 8, ["group", "path"])) : (v(), w("section", {
        key: 1,
        class: "dc-space",
        "data-dc-space": m.value,
        "data-dc-path": e.path.join("/"),
        "aria-label": d.value
      }, [
        !e.framed && !g.value ? (v(), w("header", Yc, [
          y("span", Qc, A(d.value), 1),
          h.value.length ? (v(), me(Fn, {
            key: 0,
            items: h.value,
            label: `${d.value} menu`
          }, null, 8, ["items", "label"])) : O("", !0)
        ])) : O("", !0),
        o.value ? (v(), w("div", {
          key: 1,
          ref_key: "desktop",
          ref: $,
          class: "dc-window__desktop"
        }, [
          N.value ? (v(), w("div", {
            key: 0,
            class: "dc-window__drop",
            style: Ae({
              left: `${N.value.x}px`,
              top: `${N.value.y}px`,
              width: `${N.value.w}px`,
              height: `${N.value.h}px`
            }),
            "aria-hidden": "true"
          }, null, 4)) : O("", !0),
          (v(!0), w(se, null, fe(f.value, (te) => (v(), me(Cc, {
            key: te.key,
            frame: te.held,
            path: te.path,
            order: te.order,
            place: C.value.get(te.key) ?? null
          }, {
            default: Ze(() => [
              ae(ee, {
                node: te.held.node,
                path: te.path,
                framed: te.held.node.kind !== "group"
              }, null, 8, ["node", "path", "framed"])
            ]),
            _: 2
          }, 1032, ["frame", "path", "order", "place"]))), 128))
        ], 512)) : l.value ? (v(), w("div", {
          key: 2,
          ref_key: "container",
          ref: a,
          class: "dc-window__split",
          "data-dc-direction": l.value.direction
        }, [
          R.value ? (v(), w("div", Jc)) : O("", !0),
          (v(!0), w(se, null, fe(c.value, (te, ve) => (v(), w(se, {
            key: b(te)
          }, [
            y("div", {
              class: "dc-window__cell",
              style: Ae({ flexGrow: r.value[ve] ?? 1 })
            }, [
              ae(ee, {
                node: te,
                path: V.value[ve] ?? []
              }, null, 8, ["node", "path"])
            ], 4),
            ve < c.value.length - 1 ? (v(), w("div", {
              key: 0,
              class: "dc-window__gutter",
              role: "separator",
              "aria-orientation": F.value ? "vertical" : "horizontal",
              "aria-label": Z(ve),
              "aria-valuenow": oe(ve),
              "aria-valuemin": "0",
              "aria-valuemax": "100",
              "aria-disabled": E(n).resizable.value ? void 0 : "true",
              tabindex: E(n).resizable.value ? 0 : -1,
              onPointerdown: (Ee) => Ce(Ee, ve),
              onKeydown: (Ee) => ze(Ee, ve)
            }, null, 40, eu)) : O("", !0)
          ], 64))), 128))
        ], 8, Zc)) : O("", !0)
      ], 8, jc));
    };
  }
}), nu = /* @__PURE__ */ ue(tu, [["__scopeId", "data-v-fb5b403f"]]), au = ["data-dc-theme", "data-dc-dragging", "data-dc-docking"], su = {
  key: 1,
  class: "dc-window__empty"
}, lu = {
  class: "dc-window__live",
  "aria-live": "polite",
  role: "status"
}, Kt = 16, ru = /* @__PURE__ */ ce({
  __name: "WindowFrame",
  props: /* @__PURE__ */ jt({
    panels: {},
    movable: { type: Boolean, default: !1 },
    resizable: { type: Boolean, default: !0 },
    minPanelSize: { default: 120 },
    closable: { type: Boolean, default: !1 },
    menu: { type: Boolean, default: !0 },
    spaceNames: { type: Boolean, default: !0 },
    paneMenu: {},
    accent: {},
    tokens: {},
    theme: { default: "minimal" }
  }, {
    layout: { default: null },
    layoutModifiers: {},
    views: { default: () => ({}) },
    viewsModifiers: {}
  }),
  emits: /* @__PURE__ */ jt(["panel-move", "view-change", "panel-activate", "tab-select", "frame-change", "frame-maximize", "frame-minimize", "panel-close"], ["update:layout", "update:views"]),
  setup(e, { expose: t, emit: n }) {
    const a = e, s = n, l = Xt(e, "layout"), o = Xt(e, "views"), c = kn(), r = _(() => new Map(a.panels.map((i) => [i.id, i]))), f = _(() => a.panels.map((i) => i.id)), d = _(() => ic(l.value, f.value)), h = W(null), g = W(null), m = W(null), $ = W(!0), x = W(null), k = W(null), C = W(null), T = W(""), N = W(null);
    function R() {
      const i = N.value;
      return i ? [...i.querySelectorAll(".dc-pane[data-dc-panels]")].filter((p) => p.closest(".dc-window") === i).map((p) => ({ panels: (p.dataset.dcPanels ?? "").split(" "), element: p })) : [];
    }
    function F(i) {
      const u = [];
      let p = i.closest(".dc-float");
      for (; p; )
        u.unshift(Number(p.dataset.dcOrder ?? 0)), p = p.parentElement?.closest(".dc-float") ?? null;
      return u;
    }
    function V() {
      return R().map((i) => ({ pane: i, order: F(i.element) })).sort((i, u) => {
        const p = Math.max(i.order.length, u.order.length);
        for (let M = 0; M < p; M += 1) {
          const P = (i.order[M] ?? -1) - (u.order[M] ?? -1);
          if (P !== 0) return P;
        }
        return 0;
      }).map((i) => i.pane);
    }
    const b = (i) => R().find((u) => u.panels.includes(i)) ?? null;
    function S(i) {
      const u = r.value.get(i);
      if (!u) return "";
      const p = o.value[i];
      return p && u.views?.some((M) => M.key === p) ? p : u.defaultView ?? u.views?.[0]?.key ?? "";
    }
    function Z(i, u) {
      o.value = { ...o.value, [i]: u }, s("view-change", { panel: i, view: u });
    }
    const oe = _(
      () => a.panels.filter((i) => i.fixed !== !0).length
    );
    function pe(i) {
      return !a.movable || oe.value < 1 || a.panels.length < 2 ? !1 : r.value.get(i)?.fixed !== !0;
    }
    function Y(i, u) {
      const p = d.value;
      !i || !p || i === p || (l.value = i, u && s("panel-move", u));
    }
    function Ce(i, u, p) {
      if (i.width <= 0 || i.height <= 0) return "center";
      const M = (u - i.left) / i.width, P = (p - i.top) / i.height, z = 0.3;
      return M > z && M < 1 - z && P > z && P < 1 - z ? "center" : [
        { edge: "left", distance: M },
        { edge: "right", distance: 1 - M },
        { edge: "top", distance: P },
        { edge: "bottom", distance: 1 - P }
      ].reduce(
        (Q, I) => I.distance < Q.distance ? I : Q
      ).edge;
    }
    function ze(i, u) {
      const p = [...i.querySelectorAll(".dc-tab")], M = p.findIndex((P) => {
        const z = P.getBoundingClientRect();
        return u < z.left + z.width / 2;
      });
      return M === -1 ? p.length : M;
    }
    function D(i, u, p) {
      for (const { panels: M, element: P } of V().reverse()) {
        const z = P.getBoundingClientRect();
        if (i < z.left || i > z.right || u < z.top || u > z.bottom) continue;
        const le = M.find((H) => H !== p), Q = P.querySelector(".dc-pane__tabs"), I = Q?.getBoundingClientRect();
        if (Q && I && u >= I.top && u <= I.bottom)
          return le ? { panel: le, edge: "center", index: ze(Q, i) } : null;
        const B = P.querySelector(":scope > .dc-pane__space");
        if (B) {
          const H = B.getBoundingClientRect();
          if (i >= H.left && i <= H.right && u >= H.top && u <= H.bottom) continue;
        }
        return le ? { panel: le, edge: Ce(z, i, u) } : null;
      }
      return ee(i, u, p) ?? Ee(i, u);
    }
    function X() {
      const i = N.value;
      return i ? [...i.querySelectorAll(".dc-window__desktop")].filter((u) => u.closest(".dc-window") === i).reverse() : [];
    }
    function ee(i, u, p) {
      const M = d.value;
      if (!M) return null;
      for (const P of X()) {
        const z = P.getBoundingClientRect();
        if (i < z.left || i > z.right || u < z.top || u > z.bottom) continue;
        const le = He(P), Q = le.flatMap((ne) => ne.panels).find((ne) => ne !== p);
        if (!Q && le.length > 0) return null;
        const I = ge(M, p)?.rect, B = sn(
          {
            x: i - z.left - 24,
            y: u - z.top - 12,
            w: I?.w ?? st.w,
            h: I?.h ?? st.h
          },
          { w: P.clientWidth, h: P.clientHeight },
          a.minPanelSize
        );
        if (Q) return { panel: Q, edge: "float", rect: B };
        const H = te(P);
        return H ? { panel: "", space: H, edge: "float", rect: B } : null;
      }
      return null;
    }
    function te(i) {
      const u = i.closest(".dc-space")?.getAttribute("data-dc-path");
      return u == null ? null : u === "" ? [] : u.split("/").map(Number);
    }
    function ve() {
      const i = N.value;
      return i ? [...i.querySelectorAll(".dc-space")].filter((u) => u.closest(".dc-window") === i).filter((u) => !u.querySelector(".dc-pane")).reverse().flatMap((u) => {
        const p = te(u);
        return p ? [{ element: u, path: p }] : [];
      }) : [];
    }
    function Ee(i, u) {
      for (const { element: p, path: M } of ve()) {
        if (p.dataset.dcSpace === "desktop") continue;
        const P = p.getBoundingClientRect();
        if (!(i < P.left || i > P.right || u < P.top || u > P.bottom))
          return { panel: "", space: M, edge: "center" };
      }
      return null;
    }
    function He(i) {
      return R().filter(
        (u) => u.element.closest(".dc-window__desktop") === i
      );
    }
    let Ue = null;
    const Ge = (i) => i.altKey;
    function Xe(i, u) {
      if (!pe(i) || g.value || k.value || u.button !== 0) return;
      const p = u.clientX, M = u.clientY;
      let P = !1, z = Ge(u);
      const le = () => {
        const re = C.value;
        re && (m.value = z ? ee(re.x, re.y, i) : D(re.x, re.y, i));
      }, Q = (re) => {
        if (!P) {
          if (Math.hypot(re.clientX - p, re.clientY - M) < 4) return;
          P = !0, g.value = i, x.value = null;
        }
        z = Ge(re), $.value = !z, C.value = { x: re.clientX, y: re.clientY }, le();
      }, I = (re) => {
        Ge(re) !== z && (z = !z, $.value = !z, P && le());
      }, B = (re) => {
        Ue?.();
        const U = m.value, be = d.value;
        if (re && P && U && be) {
          const je = U.space ? ha(be, i, U.space, U.rect) : U.edge === "float" && U.rect ? ma(be, i, U.panel, U.rect) : Ot(be, i, U.panel, U.edge, U.index);
          Y(je, {
            panel: i,
            target: U.panel,
            edge: U.edge,
            ...U.space === void 0 ? {} : { space: U.space },
            ...U.index === void 0 ? {} : { index: U.index },
            ...U.rect === void 0 ? {} : { rect: U.rect }
          });
        }
        g.value = null, m.value = null, C.value = null, $.value = !0;
      }, H = () => B(!0), ne = () => B(!1), de = (re) => {
        if (re.key === "Escape") {
          B(!1);
          return;
        }
        I(re);
      };
      Ue = () => {
        window.removeEventListener("pointermove", Q), window.removeEventListener("pointerup", H), window.removeEventListener("pointercancel", ne), window.removeEventListener("keydown", de), window.removeEventListener("keyup", I), Ue = null;
      }, window.addEventListener("pointermove", Q), window.addEventListener("pointerup", H), window.addEventListener("pointercancel", ne), window.addEventListener("keydown", de), window.addEventListener("keyup", I);
    }
    Je(() => Ue?.());
    let Le = null;
    function De(i) {
      const u = N.value;
      return u ? [...u.querySelectorAll(
        `.dc-float[data-dc-path="${i.join("/")}"]`
      )].find((P) => P.closest(".dc-window") === u)?.parentElement ?? null : null;
    }
    function Ie(i) {
      const u = d.value;
      return u ? yn(u, i) : null;
    }
    function wt(i) {
      const u = d.value;
      if (!u) return;
      const p = Et(u, i);
      p !== u && (l.value = p);
    }
    function It(i) {
      const u = Ie(i);
      u && wt(u);
    }
    function L(i) {
      const u = d.value, p = u ? ge(u, i) : null;
      return p !== null && Ye(p);
    }
    function K(i) {
      const u = d.value, p = u ? ge(u, i) : null;
      return p !== null && at(p);
    }
    function j(i) {
      const u = d.value, p = u ? nt(u, i) : null;
      return p ? ke(p.node) : "";
    }
    function $e(i) {
      const u = d.value, p = u ? nt(u, i) : null;
      if (!u || !p) return;
      const M = ke(p.node);
      if (r.value.get(M)?.fixed === !0) return;
      const P = !at(p);
      let z = Qi(u, i, P);
      z !== u && (P || (z = Et(z, i)), l.value = z, s("frame-minimize", { panel: M, minimized: P }));
    }
    function we(i) {
      const u = Ie(i);
      u && $e(u);
    }
    function bt(i) {
      const u = d.value, p = u ? nt(u, i) : null;
      if (!u || !p) return;
      const M = ke(p.node);
      if (r.value.get(M)?.fixed === !0) return;
      const P = !Ye(p);
      let z = Yi(u, i, P);
      z !== u && (P && (z = Et(z, i)), l.value = z, s("frame-maximize", { panel: M, maximized: P }));
    }
    function Gn(i) {
      const u = Ie(i);
      u && bt(u);
    }
    function Xn(i, u, p) {
      const M = d.value, P = M ? nt(M, i) : null;
      if (!M || !P || u.button !== 0 || g.value || k.value) return;
      const z = ke(P.node);
      if (r.value.get(z)?.fixed === !0 || Ye(P) || at(P) || (p === "move" ? !a.movable : !a.resizable)) return;
      const le = De(i), Q = Zi(M, i);
      wt(i);
      const I = { w: le?.clientWidth ?? 0, h: le?.clientHeight ?? 0 }, B = { ...P.rect }, H = u.clientX, ne = u.clientY, de = a.minPanelSize;
      k.value = z;
      const re = (Pe) => {
        const Ne = d.value;
        if (!Ne) return;
        const kt = va(Ne, Q, sn(Pe, I, de));
        kt !== Ne && (l.value = kt);
      }, U = (Pe) => {
        Pe.preventDefault();
        const Ne = Pe.clientX - H, kt = Pe.clientY - ne;
        re(
          p === "move" ? { ...B, x: B.x + Ne, y: B.y + kt } : pa(B, p, Ne, kt, de)
        );
      }, be = (Pe) => {
        if (Le?.(), k.value = null, !Pe) {
          re(B);
          return;
        }
        const Ne = d.value ? nt(d.value, Q) : null;
        Ne && s("frame-change", { panel: j(Q), rect: Ne.rect });
      }, je = () => be(!0), et = () => be(!1), tt = (Pe) => {
        Pe.key === "Escape" && be(!1);
      };
      Le = () => {
        window.removeEventListener("pointermove", U), window.removeEventListener("pointerup", je), window.removeEventListener("pointercancel", et), window.removeEventListener("keydown", tt), Le = null;
      }, window.addEventListener("pointermove", U), window.addEventListener("pointerup", je), window.addEventListener("pointercancel", et), window.addEventListener("keydown", tt);
    }
    function fs(i, u, p) {
      const M = Ie(i);
      M && Xn(M, u, p);
    }
    function ps(i, u, p = !1) {
      const M = d.value, P = Ie(i), z = M && P ? nt(M, P) : null;
      if (!M || !P || !z || r.value.get(i)?.fixed === !0 || (p ? !a.resizable : !a.movable)) return;
      if (Ye(z) || at(z)) {
        T.value = `${Te(i)} is ${Ye(z) ? "maximized" : "minimized"}, so it cannot be moved.`;
        return;
      }
      const le = u === "left" ? -Kt : u === "right" ? Kt : 0, Q = u === "up" ? -Kt : u === "down" ? Kt : 0, I = De(P), B = { w: I?.clientWidth ?? 0, h: I?.clientHeight ?? 0 }, H = p ? pa(z.rect, "se", le, Q, a.minPanelSize) : { ...z.rect, x: z.rect.x + le, y: z.rect.y + Q }, ne = va(M, P, sn(H, B, a.minPanelSize));
      if (ne === M) {
        T.value = p ? `${Te(i)} cannot be resized further.` : `${Te(i)} cannot move ${u}.`;
        return;
      }
      l.value = ne;
      const de = nt(ne, P);
      de && (s("frame-change", { panel: i, rect: de.rect }), T.value = p ? `${Te(i)} resized to ${de.rect.w} by ${de.rect.h}.` : `${Te(i)} moved to ${de.rect.x}, ${de.rect.y}.`);
    }
    Je(() => Le?.());
    function vs(i, u) {
      const p = b(i), M = p?.element.getBoundingClientRect();
      if (!p || !M) return null;
      const P = u === "left" || u === "right", z = (I) => {
        if (!(P ? I.bottom > M.top + 1 && I.top < M.bottom - 1 : I.right > M.left + 1 && I.left < M.right - 1)) return null;
        const H = u === "left" ? M.left - I.right : u === "right" ? I.left - M.right : u === "up" ? M.top - I.bottom : I.top - M.bottom;
        return H < -1 ? null : H;
      }, le = [];
      for (const I of R()) {
        if (I === p || I.element === p.element) continue;
        const B = z(I.element.getBoundingClientRect());
        if (B === null) continue;
        const H = I.panels.find((ne) => ne !== i);
        H && le.push({ to: { panel: H }, distance: B });
      }
      for (const { element: I, path: B } of ve()) {
        const H = z(I.getBoundingClientRect());
        H !== null && le.push({ to: { space: B }, distance: H });
      }
      return le.reduce(
        (I, B) => I && I.distance <= B.distance ? I : B,
        null
      )?.to ?? null;
    }
    function ms(i) {
      const u = d.value ? ge(d.value, i) !== null : !1;
      if (!u && !pe(i)) return;
      x.value = x.value === i ? null : i;
      const p = Te(i);
      if (!x.value) {
        T.value = `${p}: move mode off.`;
        return;
      }
      T.value = u ? `${p}: move mode on. Arrow keys move the window, shift and an arrow resize it, Escape leaves move mode.` : `${p}: move mode on. Arrow keys move the panel, shift and an arrow make it a tab of the panel that way, Escape leaves move mode.`;
    }
    const Te = (i) => r.value.get(i)?.title ?? i, hs = {
      left: "left",
      right: "right",
      up: "top",
      down: "bottom"
    };
    function _s(i, u, p = !1) {
      if (!pe(i)) return;
      const M = d.value;
      if (!M) return;
      const P = Te(i), z = ft(M, i);
      if (!p && z && (u === "left" || u === "right") && z.panels.length > 1) {
        const ne = z.panels.indexOf(i), de = u === "left" ? ne - 1 : ne + 1;
        if (de >= 0 && de < z.panels.length) {
          Y(Pt(M, i, de), { panel: i, target: i, edge: "center", index: de }), T.value = `${P} moved ${u}, now tab ${de + 1} of ${z.panels.length}.`, en(i);
          return;
        }
      }
      const Q = vs(i, u);
      if (!Q || Q.panel !== void 0 && !pe(Q.panel)) {
        T.value = `${P} cannot move ${u}.`;
        return;
      }
      const I = hs[u];
      if (Q.space) {
        const ne = Q.space, de = Qe(M, ne), re = ge(M, i)?.rect, U = { ...st, ...re ? { w: re.w, h: re.h } : {} };
        Y(ha(M, i, ne, U), { panel: i, target: "", space: ne, edge: I }), T.value = `${P} moved ${u}, into ${de ? _t(de) : "the space"}.`, en(i);
        return;
      }
      const B = Q.panel, H = z?.panels.length === 1 && ft(M, B)?.panels.length === 1;
      p ? (Y(Ot(M, i, B, "center"), {
        panel: i,
        target: B,
        edge: "center"
      }), T.value = `${P} joined ${Te(B)} as a tab.`) : H ? (Y(Bt(M, i, B), { panel: i, target: B, edge: I }), T.value = `${P} moved ${u}, trading places with ${Te(B)}.`) : (Y(Ot(M, i, B, I), { panel: i, target: B, edge: I }), T.value = `${P} moved ${u}, beside ${Te(B)}.`), en(i);
    }
    function en(i) {
      At(() => {
        b(i)?.element.querySelector(".dc-pane__grip")?.focus();
      });
    }
    function gs(i, u) {
      const p = d.value;
      p && (l.value = Wt(p, i, u));
    }
    function tn(i) {
      const u = d.value;
      if (!u) return;
      const p = vt(u, i);
      p !== u && (l.value = p, s("tab-select", { panel: i }));
    }
    function jn(i) {
      return r.value.get(i)?.closable ?? a.closable;
    }
    function ys(i) {
      jn(i) && s("panel-close", i);
    }
    const nn = W(/* @__PURE__ */ new Map());
    let ws = 0;
    function bs(i, u) {
      const p = ws += 1;
      return nn.value.set(p, { panel: i, items: u }), () => {
        nn.value.delete(p);
      };
    }
    function ks(i) {
      const u = [];
      for (const p of nn.value.values())
        p.panel() === i && u.push(...p.items());
      return u;
    }
    function Yn(i) {
      const u = i.filter((p) => p.items.length > 0);
      return u.length < 2 ? u.flatMap((p) => p.items) : u.flatMap((p) => [
        { id: p.id, heading: !0, label: p.title },
        ...p.items
      ]);
    }
    const Qn = (i) => i.title || "These tabs";
    function $s(i, u) {
      const p = u.id, M = ft(i, p), P = (M?.panels.length ?? 0) > 1, z = M?.fixedView === !0, le = (H) => ({
        action: () => {
          H !== i && (l.value = H);
        }
      }), Q = [], I = [], B = u.views ?? [];
      if (B.length > 1 && !z) {
        const H = S(p);
        Q.push({
          id: "view",
          label: "View",
          items: B.map((ne) => ({
            id: `view-${ne.key}`,
            label: ne.label,
            checked: ne.key === H,
            action: () => Z(p, ne.key)
          }))
        });
      }
      return P && !z && I.push(
        { id: "show-row", label: "Row", checked: !1, ...le(_a(i, p, "row")) },
        {
          id: "show-column",
          label: "Column",
          checked: !1,
          ...le(_a(i, p, "column"))
        },
        // Already true, and nothing to collapse: these panes are tabs. Ticked
        // and choosable all the same — collapsing a strip into a strip hands
        // back the tree it was given, so it is the no-op it looks like.
        {
          id: "show-tabs",
          label: "Tabs",
          checked: !0,
          ...le(nc(i, p))
        },
        {
          id: "show-desktop",
          label: "Desktop",
          checked: !1,
          ...le(ac(i, p))
        }
      ), P && M && (I.length && I.push({ separator: !0 }), I.push(...Zn(M, p))), { panel: Q, tabs: I, tabsTitle: M ? Qn(M) : "" };
    }
    function Zn(i, u) {
      const p = ct(i), M = (P) => {
        const z = i.panels[(p + P + i.panels.length) % i.panels.length];
        return (z === void 0 ? "" : ke(z)) || u;
      };
      return [
        { id: "next-tab", label: "Next tab", action: () => tn(M(1)) },
        { id: "previous-tab", label: "Previous tab", action: () => tn(M(-1)) }
      ];
    }
    function Nt(i) {
      return i.title ? i.title : q(i) ? i.panels.length > 1 ? "these tabs" : "the strip" : _t(i);
    }
    function Jn(i) {
      if (!i || G(i) || i.fixedView === !0 || !i.title && i.headless !== !0 || Re(i)) return null;
      const u = us(i);
      return u && u.fixedView !== !0 ? u : null;
    }
    function xs(i) {
      const u = d.value;
      if (!a.menu || !u) return [];
      const p = Qe(u, i);
      if (!p || q(p)) return [];
      if (p.fixedView) return [];
      const M = G(p) ? "desktop" : p.direction, P = (U, be, je) => ({
        id: `show-${U}`,
        label: be,
        checked: M === U,
        action: () => {
          const et = d.value, tt = je();
          !et || tt === p || (l.value = Qt(_e(rt(et, i, tt))));
        }
      }), z = () => {
        const U = rs(p, Ms(p));
        if (q(U) && U.panels.length === 0) return p;
        const be = q(U) && U.panels.length === 1 ? U.panels[0] : void 0;
        return be !== void 0 && ie(be) ? p : U;
      }, le = (U) => () => G(p) ? cs(p, U) : p.direction === U ? p : { ...p, direction: U }, Q = i.slice(0, -1), I = i.length > 0 ? Qe(u, Q) : null, B = I && q(I) && I.panels.length > 1 ? I : null, H = I && Jn(I) === p ? I : null, ne = Jn(p), de = p.title || "this space", re = (U, be, je, et, tt) => ({
        id: U,
        label: tt,
        action: () => {
          const Pe = d.value;
          Pe && (l.value = Qt(_e(rt(Pe, be, rc(je, et)))));
        }
      });
      return Yn([
        {
          id: "about-space",
          /*
           * Its own name, or what it is rather than how it is shown: `spaceTitle`
           * would answer "Row" for an unnamed row, which is the item directly
           * under it and the one already ticked.
           */
          title: p.title || "This space",
          items: [
            P("row", "Row", le("row")),
            P("column", "Column", le("column")),
            // Everything in this space in one strip: the panes as tabs, and a
            // desktop among them as a tab of its own, keeping the windows on it.
            P("tabs", "Tabs", () => z()),
            P("desktop", "Desktop", () => G(p) ? p : is(p))
          ]
        },
        {
          id: "about-around",
          title: ne ? `Around ${Nt(ne)}` : "",
          items: ne ? [
            // Keeping this space's bar drops the one inside, so it is offered
            // only where the space inside has no name to be dropped with it.
            ...ne.title ? [] : [re("merge-around-keep-this", i, p, "outer", `Keep ${de}`)],
            ...p.title ? [] : [re("merge-around-keep-that", i, p, "inner", `Keep ${Nt(ne)}`)]
          ] : []
        },
        {
          id: "about-inside",
          title: H ? `Inside ${Nt(H)}` : "",
          items: H ? [
            ...p.title ? [] : [re("merge-inside-keep-that", Q, H, "outer", `Keep ${Nt(H)}`)],
            ...H.title ? [] : [re("merge-inside-keep-this", Q, H, "inner", `Keep ${de}`)]
          ] : []
        },
        {
          id: "about-tabs",
          title: B ? Qn(B) : "",
          items: B ? Zn(B, ke(p)) : []
        }
      ]);
    }
    function Ms(i) {
      const u = h.value;
      return u && J(i, u) ? u : void 0;
    }
    function Cs(i) {
      const u = d.value, p = r.value.get(i);
      if (!u || !p) return [];
      const M = a.menu ? $s(u, p) : null, P = ks(i);
      P.length && M?.panel.length && P.push({ separator: !0 }), M && P.push(...M.panel);
      const z = Yn([
        { id: "about-panel", title: p.title, items: P },
        { id: "about-tabs", title: M?.tabsTitle ?? "", items: M?.tabs ?? [] }
      ]);
      return a.paneMenu ? a.paneMenu(p, z) : z;
    }
    function Es(i, u) {
      return c[`${i}-${u}`] ?? c[i];
    }
    function ea(i, u, p, M) {
      return Es(i, u.id)?.({ panel: u, view: p, active: M });
    }
    cc({
      panelFor: (i) => r.value.get(i) ?? null,
      viewFor: S,
      setView: Z,
      movable: _(() => a.movable),
      resizable: _(() => a.resizable),
      minPanelSize: _(() => a.minPanelSize),
      spaceNames: _(() => a.spaceNames),
      focused: h,
      dragging: g,
      dropTarget: m,
      moving: x,
      framing: k,
      canMove: pe,
      focus(i) {
        h.value !== i && (h.value = i, s("panel-activate", i));
      },
      selectPanel: tn,
      beginDrag: Xe,
      toggleMoveMode: ms,
      nudge: _s,
      setSizes: gs,
      frameOf: (i) => d.value ? ge(d.value, i) : null,
      beginFrameDrag: fs,
      nudgeFrame: ps,
      raise: It,
      maximized: L,
      toggleMaximize: Gn,
      minimized: K,
      toggleMinimize: we,
      beginFrameDragAt: Xn,
      raiseAt: wt,
      toggleMaximizeAt: bt,
      toggleMinimizeAt: $e,
      menuFor: Cs,
      spaceMenu: xs,
      registerMenu: bs,
      closable: jn,
      close: ys,
      renderContent: (i, u, p) => ea("panel", i, u, p),
      renderActions: (i, u, p) => ea("actions", i, u, p),
      layout: d
    });
    const Ps = _(() => {
      if (!(!a.accent && !a.tokens))
        return { ...a.tokens, ...a.accent ? { "--dc-accent": a.accent } : {} };
    }), Ss = () => {
      const i = g.value, u = C.value;
      return !i || !u ? null : Rs(
        "div",
        {
          class: "dc-window__ghost",
          style: { left: `${u.x}px`, top: `${u.y}px` },
          "aria-hidden": "true"
        },
        r.value.get(i)?.title ?? i
      );
    };
    return t({
      /** The layout as rendered, reconciled against the current panels. */
      layout: d,
      /** Moves a panel programmatically — the same operation a drag performs. */
      move(i, u, p, M) {
        const P = d.value;
        P && Y(Ot(P, i, u, p, M), {
          panel: i,
          target: u,
          edge: p,
          ...M === void 0 ? {} : { index: M }
        });
      },
      /** Brings a panel's tab to the top of its group. */
      select(i) {
        const u = d.value;
        u && (l.value = vt(u, i));
      },
      /** Lifts a panel onto the float holding `near`, as a window of its own. */
      float(i, u, p) {
        const M = d.value;
        M && Y(ma(M, i, u, p), {
          panel: i,
          target: u,
          edge: "float",
          rect: p
        });
      },
      /** Puts a floating frame somewhere else, or makes it another size. */
      setRect(i, u) {
        const p = d.value;
        if (!p) return;
        const M = Gi(p, i, u);
        if (M === p) return;
        l.value = M;
        const P = ge(M, i);
        P && s("frame-change", { panel: i, rect: P.rect });
      },
      /**
       * Puts a panel on one of its views, the way its menu would — the way a pane
       * whose space fixed its view, or took its bar away, is switched at all.
       */
      setView: Z,
      /** Brings a floating frame to the front of its stack. */
      raise: It,
      /** Fills the float with a window, or puts it back where it was. */
      toggleMaximize: Gn,
      /** Rolls a window up to its title bar, or unrolls it. */
      toggleMinimize: we
    }), (i, u) => (v(), w("div", {
      ref_key: "root",
      ref: N,
      class: "dc-shell dc-window",
      "data-dc-theme": e.theme,
      "data-dc-dragging": g.value ? "true" : "false",
      "data-dc-docking": $.value ? "true" : "false",
      style: Ae(Ps.value)
    }, [
      d.value ? (v(), me(nu, {
        key: 0,
        node: d.value,
        path: []
      }, null, 8, ["node"])) : (v(), w("p", su, " This window has no panels. ")),
      ae(Ss),
      y("p", lu, A(T.value), 1)
    ], 12, au));
  }
}), ou = /* @__PURE__ */ ue(ru, [["__scopeId", "data-v-711565af"]]);
function xu(e = "", t = "/") {
  const n = W(qe(e)), a = W(t), s = [`${a.value}${n.value}`];
  return {
    search: n,
    path: a,
    history: s,
    push(l) {
      n.value = qe(l), s.push(`${a.value}${n.value}`);
    },
    replace(l) {
      n.value = qe(l), s[s.length - 1] = `${a.value}${n.value}`;
    }
  };
}
function wa(e) {
  const t = e.indexOf("?");
  if (t === -1) return "";
  const n = e.slice(t), a = n.indexOf("#");
  return qe(a === -1 ? n : n.slice(0, a));
}
function Mu(e) {
  const t = W(wa(e.currentRoute.value.fullPath)), n = _(() => e.currentRoute.value.path), a = Me(
    () => e.currentRoute.value.fullPath,
    (s) => {
      t.value = wa(s);
    }
  );
  return {
    search: t,
    path: n,
    push: (s) => e.push(`${n.value}${qe(s)}`),
    replace: (s) => e.replace(`${n.value}${qe(s)}`),
    dispose: a
  };
}
const iu = {
  DataShell: Ei,
  ShellHeader: Ia,
  QueryPanel: Va,
  ResultsArea: Ga,
  FacetControl: Na,
  SegmentedControl: vn,
  StatusPill: zt,
  ScoreMeter: Tn,
  WindowFrame: ou,
  WindowPane: ds,
  ListView: mn,
  CardsView: Ka,
  GridView: qa,
  TableView: Ha,
  LinksView: Ba,
  PreviewView: Wa,
  TypeCardsView: Ua
}, Cu = {
  install(e, t = {}) {
    const n = t.prefix ?? "";
    for (const [a, s] of Object.entries(iu))
      e.component(`${n}${a}`, s);
    t.route && e.provide(Aa, t.route);
  }
};
export {
  Yt as CASCADE_STEP,
  Su as COLUMN_BREAKPOINTS,
  Ka as CardsView,
  da as ColumnCell,
  st as DEFAULT_FRAME,
  Au as DEFAULT_SORT,
  zu as DEFAULT_VIEW,
  Ei as DataShell,
  Ru as EMPTY_CELL,
  Ta as ENTITY_ALL,
  pn as ENTITY_TERM,
  zn as FACET_PREFIX,
  Na as FacetControl,
  Ea as GENERIC_LABELS,
  qa as GridView,
  Cu as HeaderContentLayoutPlugin,
  Ba as LinksView,
  mn as ListView,
  ut as MINIMIZED_GAP,
  Ya as MINIMIZED_HEIGHT,
  hn as MINIMIZED_WIDTH,
  ja as MIN_FRAME,
  ia as MOCK_TINTS,
  fu as MenuBar,
  Fn as MenuButton,
  Xa as MenuList,
  ot as MetricDrill,
  Un as PANE_CONTEXT_KEY,
  Pn as PARAM_DIR,
  Mn as PARAM_ENTITY,
  Sn as PARAM_EXPR,
  An as PARAM_PAGE,
  En as PARAM_SORT,
  Cn as PARAM_VIEW,
  Rn as PinStar,
  Wa as PreviewView,
  Va as QueryPanel,
  na as RECORD_STATUSES,
  Os as RESULT_FIELDS,
  Aa as ROUTE_ADAPTER_KEY,
  Ga as ResultsArea,
  Ra as SHELL_CONTEXT_KEY,
  Tu as SHELL_THEMES,
  Rt as ScopeMark,
  Tn as ScoreMeter,
  vn as SegmentedControl,
  Ia as ShellHeader,
  zt as StatusPill,
  Ha as TableView,
  Ua as TypeCardsView,
  Ks as VIEW_KINDS,
  Wn as WINDOW_CONTEXT_KEY,
  ou as WindowFrame,
  ds as WindowPane,
  Za as activePanel,
  ct as activeTab,
  dl as addTerm,
  Hi as axisOf,
  In as cascade,
  Sa as cellText,
  Us as cellValue,
  aa as changesResults,
  sn as clampRect,
  rs as collapseSpace,
  nc as collapseToTabs,
  vu as column,
  la as columnAlign,
  ra as columnClass,
  oa as columnKey,
  dn as columnTruncates,
  Hs as columnsFor,
  Vs as countPages,
  Gs as createHistoryAdapter,
  xu as createMemoryAdapter,
  il as createMockDataSource,
  Mu as createVueRouterAdapter,
  Fu as defaultCellText,
  Lu as defaultColumns,
  ya as defaultLayout,
  $n as defaultQuery,
  fl as drillExpression,
  ha as dropIntoSpace,
  un as emptyFacetState,
  Fs as emptyFacetValue,
  Mt as findEntity,
  dt as findSort,
  hu as fixedView,
  Dn as float,
  ma as floatPanel,
  is as floatSplit,
  ac as floatTabs,
  cn as fnv1a,
  Ds as focusEntity,
  qs as formatDate,
  sa as formatMetric,
  Bs as formatOrdinal,
  Pa as formatPercent,
  Zt as frame,
  nt as frameAt,
  ge as frameOf,
  yn as framePathOf,
  ke as frontPanel,
  ll as generateRows,
  pu as group,
  ft as groupOf,
  Ui as groups,
  Ns as hasActiveFacets,
  J as hasPanel,
  mu as headless,
  xt as insertPanel,
  Ct as isChoosable,
  Du as isEntityScoped,
  Ls as isFacetActive,
  G as isFloat,
  q as isGroup,
  Ye as isMaximized,
  at as isMinimized,
  ie as isPanelTab,
  xn as isPristineQuery,
  yt as isSplit,
  Se as isTabOf,
  Ca as isTypeCardsQuery,
  Ts as isViewKind,
  Js as matchesExpression,
  rl as matchesFacets,
  Xi as maximizeFrame,
  Yi as maximizeFrameAt,
  rc as mergeSpace,
  ji as minimizeFrame,
  Qi as minimizeFrameAt,
  Ot as movePanel,
  Pt as moveTab,
  Qe as nodeAt,
  St as nodeTitle,
  _e as normalizeLayout,
  qe as normalizeSearch,
  qn as normalizeSizes,
  us as onlySpace,
  We as panelIds,
  Fe as panelNode,
  fa as panelTabs,
  Ys as parseExpression,
  yl as parseQuery,
  Oa as presentRow,
  Ec as providePaneContext,
  pl as provideShellContext,
  cc as provideWindowContext,
  ln as raiseFrame,
  Et as raiseFrameAt,
  Zi as raisedPath,
  Ma as reconcileFacets,
  ic as reconcileLayout,
  lt as removePanel,
  rt as replaceAt,
  pa as resizeRect,
  ga as resizeSplit,
  Qt as rootSpace,
  Vn as row,
  Ws as rowKey,
  cl as scopeTerm,
  ul as scopeTermFor,
  ua as serializeQuery,
  vt as setActivePanel,
  Gi as setFrameRect,
  va as setFrameRectAt,
  Wt as setSizesAt,
  yu as setSplitDirection,
  Be as sizesOf,
  Is as sortsFor,
  he as spaceChrome,
  _t as spaceTitle,
  Nn as split,
  _a as spreadTabs,
  bl as summarizeQuery,
  Da as summaryTerms,
  Bt as swapPanels,
  Ln as tabNode,
  Ft as tabPanels,
  cs as tileFloat,
  wu as toFloat,
  bu as toTiled,
  _u as toggleMaximized,
  gu as toggleMinimized,
  Io as useColumns,
  Yo as useEntityPreviews,
  ku as usePaneContext,
  $u as usePaneMenu,
  gt as usePresentedRows,
  kl as useQueryState,
  $l as useResults,
  ye as useShellContext,
  du as useViewLabels,
  Hn as useWindowContext
};
