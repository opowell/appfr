import { ref as W, inject as ht, provide as bn, computed as g, toValue as $t, shallowRef as Ht, watch as Me, defineComponent as ce, openBlock as v, createElementBlock as w, createElementVNode as y, toDisplayString as A, createCommentVNode as N, unref as C, renderSlot as Ke, Fragment as se, renderList as fe, withDirectives as rn, withKeys as Ut, withModifiers as Oe, vModelText as on, normalizeClass as Gt, useSlots as kn, nextTick as At, createBlock as me, createVNode as ae, createTextVNode as xe, withCtx as Ze, normalizeStyle as Ae, resolveDynamicComponent as ba, useModel as Xt, onBeforeUnmount as Je, useId as ka, createSlots as ta, mergeModels as jt, onMounted as Ss, resolveComponent as $a, getCurrentScope as As, onScopeDispose as zs, h as Rs } from "vue";
import { f as dt, a as cn, R as na, b as $n, c as Mt, i as Ts, e as Fs, r as xa, g as xn, h as Ls, j as Ds, s as Is, k as aa, l as un, m as Ns, n as Vs, o as Ma, V as Os, G as Ca, p as Ea, q as Ks, t as sa, u as qs, v as Bs, w as Ws, x as Hs, y as Pa, z as dn, A as la, B as ra, C as oa } from "./columns.js";
import { D as Pu, E as Su, F as Au, H as zu, I as Ru, S as Tu, J as Fu, d as Lu, K as Du } from "./columns.js";
const Sa = Symbol("dc.routeAdapter");
function qe(e) {
  if (!e) return "";
  const t = e.replace(/^[?]/, "");
  return t ? `?${t}` : "";
}
function Us() {
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
const Gs = /^([A-Za-z_][\w.-]*)\s*(>=|<=|:|=|>|<)\s*(.*)$/;
function Xs(e) {
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
function js(e) {
  const t = e.trim();
  if (!t) return [];
  const n = [];
  let a = [];
  for (const s of Xs(t)) {
    const l = s.toUpperCase();
    if (l === "AND" || l === "&&") continue;
    if (l === "OR" || l === "||") {
      a.length && n.push(a), a = [];
      continue;
    }
    const o = Gs.exec(s);
    o && o[3] !== "" ? a.push({
      kind: "field",
      field: o[1].toLowerCase(),
      comparator: o[2],
      value: o[3]
    }) : a.push({ kind: "text", value: s });
  }
  return a.length && n.push(a), n;
}
function Ys(e, t, n) {
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
function Qs(e, t, n) {
  if (e.kind === "text")
    return Vt(t.primary, e.value) || Vt(t.secondary, e.value);
  const a = Ys(e.field, t, n);
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
function Zs(e, t, n) {
  return e.length ? e.some((a) => a.every((s) => Qs(s, t, n))) : !0;
}
const ia = [
  "oklch(0.36 0.06 240)",
  "oklch(0.34 0.07 290)",
  "oklch(0.36 0.06 160)",
  "oklch(0.38 0.06 80)",
  "oklch(0.35 0.07 30)",
  "oklch(0.34 0.05 200)"
];
function Aa(e, t) {
  return `${e}_${1e4 + t * 7}`;
}
const Js = 7, el = 3;
function tl(e, t, n, a) {
  const s = (t * Js + cn(n)) % a, l = [];
  for (let o = 0; o < Math.min(el, a); o++)
    l.push(Aa(e, (s + o) % a));
  return l;
}
function nl(e, t) {
  switch (e.kind) {
    case "chips":
      return e.multiple ? al(e.options, t) : e.options[t % e.options.length] ?? "";
    case "range": {
      const n = Math.max(0, e.max - e.min);
      return e.min + (n === 0 ? 0 : t % (n + 1));
    }
    case "toggle":
      return t % 3 === 0;
  }
}
function al(e, t) {
  if (!e.length) return [];
  const n = 1 + (t >> 5) % Math.min(3, e.length), a = t % e.length, s = /* @__PURE__ */ new Set();
  for (let l = 0; l < n; l++) s.add((a + l) % e.length);
  return [...s].sort((l, o) => l - o).map((l) => e[l]);
}
function sl(e, t = {}) {
  const n = t.population ?? 48, a = t.seed ?? "", s = t.now ?? /* @__PURE__ */ new Date("2026-08-25T00:00:00Z"), l = e.samples, o = t.scopes ?? [];
  if (!l.length) return [];
  const c = [];
  for (let r = 0; r < n; r++) {
    const f = l[r % l.length], d = Math.floor(r / l.length), h = cn(`${a}:${e.key}:${f[0]}:${r}`), _ = Aa(e.key, r), m = {};
    for (const M of e.facets)
      m[M.key] = nl(M, cn(`${h}:${M.key}`));
    for (const [M, $] of o)
      m[M] = $ === e.key ? _ : tl($, r, M, n);
    const b = new Date(s.getTime() - h % 900 * 36e5).toISOString();
    c.push({
      id: _,
      entityKey: e.key,
      entityLabel: e.label,
      primary: d ? `${f[0]} · rev ${d + 1}` : f[0],
      secondary: d ? `${f[1]}-${d + 1}` : f[1],
      status: na[h % na.length],
      score: Number((0.35 + h % 64 / 100).toFixed(3)),
      metric1: 1 + h % 940,
      metric2: 1 + (h >> 3) % 320,
      updatedAt: b,
      tint: ia[h % ia.length],
      facets: m
    });
  }
  return c;
}
function ll(e, t) {
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
function rl(e) {
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
function ol(e = {}) {
  const t = /* @__PURE__ */ new Map(), n = (a, s) => {
    const l = t.get(a.key);
    if (l) return l;
    const o = e.scopes ?? s.entities.flatMap(
      (r) => r.scope ? [[r.scope, r.key]] : []
    ), c = sl(a, { ...e, scopes: o });
    return t.set(a.key, c), c;
  };
  return {
    query({ query: a, schema: s, entity: l, limit: o, offset: c }) {
      const r = js(a.expr), f = l ? [l] : s.entities, d = [], h = [];
      for (const b of f)
        for (const M of n(b, s))
          d.push(M), (l ? ll(M, a.facets) : !0) && Zs(r, M, b) && h.push(M);
      const _ = dt(l, a.sort), m = h.sort(rl(_.key));
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
function il(e, t) {
  const n = e?.scope;
  return n ? `${n}:"${t.id.replace(/"/g, "")}"` : null;
}
function cl(e, t) {
  return il(
    e.entities.find((n) => n.key === t.entityKey),
    t
  );
}
function ul(e, t) {
  if (!t) return e;
  const n = e.trim();
  return n ? n.split(/\s+/).includes(t) ? n : `${n} ${t}` : t;
}
function dl(e, t, n) {
  return ul(t.expr, cl(e, n));
}
const za = Symbol("dc.shellContext");
function fl(e) {
  return bn(za, e), e;
}
function ye() {
  const e = ht(za, null);
  if (!e)
    throw new Error(
      "[header-content-layout] No shell context found. Render this component inside <DataShell>."
    );
  return e;
}
const Mn = "e", Cn = "v", En = "s", Pn = "d", Sn = "q", An = "p", zn = "f_", Ra = "*", pl = [
  Mn,
  Cn,
  En,
  Pn,
  Sn,
  An
], fn = "..", Ta = ",", vl = [
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
  for (const [n, a] of vl) t = t.replace(n, a);
  return t;
}
function Ve(e) {
  try {
    return decodeURIComponent(e.replace(/\+/g, " "));
  } catch {
    return e.replace(/\+/g, " ");
  }
}
function Fa(e) {
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
function ml(e) {
  return pl.includes(e) || e.startsWith(zn);
}
function ca(e, t, n) {
  return Math.min(n, Math.max(t, e));
}
function hl(e, t) {
  const n = Ve(t);
  switch (e.kind) {
    case "chips": {
      const a = new Set(
        n.split(Ta).map((l) => l.trim()).filter(Boolean)
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
function _l(e, t) {
  switch (e.kind) {
    case "chips":
      return e.selected.length ? (t.kind === "chips" ? t.options.filter((a) => e.selected.includes(a)) : e.selected).join(Ta) : null;
    case "range":
      return e.min === null && e.max === null ? null : `${e.min ?? ""}${fn}${e.max ?? ""}`;
    case "toggle":
      return e.on ? "1" : null;
  }
}
function gl(e, t, n = {}) {
  const a = $n(t, n), s = new Map(Fa(e)), l = s.get(Mn), o = l === void 0 ? a.entity : Ve(l), c = o === Ra ? null : Mt(t, o), r = s.get(Cn), f = r && Ts(Ve(r)) ? Ve(r) : a.view, d = s.get(En), h = dt(c, d ? Ve(d) : n.sort), _ = s.get(Pn), m = _ ? Ve(_) === "asc" ? "asc" : "desc" : a.dir, b = s.get(Sn), M = s.get(An), $ = M === void 0 ? 1 : Number(Ve(M)), E = Number.isFinite($) ? Math.max(1, Math.floor($)) : 1, L = {};
  for (const B of c?.facets ?? []) {
    const I = s.get(`${zn}${B.key}`);
    L[B.key] = I === void 0 ? Fs(B) : hl(B, I);
  }
  return {
    entity: c?.key ?? null,
    view: f,
    sort: h.key,
    dir: m,
    expr: b === void 0 ? "" : Ve(b),
    facets: xa(c, L),
    page: E
  };
}
function ua(e, t, n = {}, a = "") {
  const s = $n(t, n), l = Mt(t, e.entity), o = Fa(a).filter(([h]) => !ml(h)), c = [], r = (h, _) => c.push([h, an(_)]), f = l?.key ?? null;
  f !== s.entity && r(Mn, f ?? Ra), e.view !== s.view && r(Cn, e.view), e.sort !== s.sort && r(En, e.sort), e.dir !== s.dir && r(Pn, e.dir), e.expr.trim() !== "" && r(Sn, e.expr);
  for (const h of l?.facets ?? []) {
    const _ = e.facets[h.key];
    if (!_) continue;
    const m = _l(_, h);
    m !== null && c.push([`${zn}${h.key}`, an(m)]);
  }
  e.page > 1 && r(An, String(e.page));
  const d = [
    ...o.map(([h, _]) => [an(h), _]),
    ...c
  ];
  return d.length ? `?${d.map(([h, _]) => _ === "" ? h : `${h}=${_}`).join("&")}` : "";
}
const pn = "entity";
function yl(e, t) {
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
function La(e, t) {
  const n = [];
  t && n.push({
    id: pn,
    label: `entity:${t.key}`,
    facetKey: pn
  });
  for (const a of t?.facets ?? []) {
    const s = e.facets[a.key];
    s && Ls(s) && n.push(...yl(a, s));
  }
  return n;
}
function wl(e, t) {
  if (xn(e)) {
    const s = dt(t, e.sort);
    return `everything · ${e.view} · ${s.label}`;
  }
  const n = La(e, t).map((s) => s.label), a = e.expr.trim();
  return a && n.push(`"${a}"`), n.join(" · ");
}
function bl(e) {
  const { adapter: t } = e, n = g(() => $t(e.schema)), a = g(() => $t(e.defaults) ?? {}), s = g(() => gl(t.search.value, n.value, a.value)), l = g(() => Mt(n.value, s.value.entity)), o = g(() => l.value ?? Ds(n.value, a.value)), c = g(() => Is(l.value)), r = g(() => dt(l.value, s.value.sort)), f = ($, E) => {
    const L = ua($, n.value, a.value, t.search.value);
    L !== t.search.value && (E === "push" ? t.push(L) : t.replace(L));
  }, d = () => $t(e.navigationMode) ?? "push", h = () => $t(e.facetNavigationMode) ?? "replace", _ = ($, E) => {
    const L = $.page ?? (aa($) ? 1 : s.value.page);
    f({ ...s.value, ...$, page: L }, E);
  }, m = ($, E) => {
    const L = s.value.facets[$];
    if (!L) return;
    const B = { ...s.value.facets, [$]: E(L) };
    _({ facets: B }, h());
  }, b = ($) => {
    const E = $ === null ? null : Mt(n.value, $);
    return (E?.key ?? null) === s.value.entity ? {} : {
      entity: E?.key ?? null,
      sort: dt(E, s.value.sort).key,
      facets: un(E)
    };
  }, M = ($) => {
    const E = b($);
    Object.keys(E).length && _(E, d());
  };
  return {
    query: s,
    entity: l,
    focus: o,
    sort: r,
    sorts: c,
    summary: g(() => wl(s.value, l.value)),
    terms: g(() => La(s.value, l.value)),
    isPristine: g(() => xn(s.value)),
    isEverything: g(() => s.value.entity === null),
    hasFacets: g(() => Ns(s.value.facets)),
    setEntity: M,
    clearEntity: () => M(null),
    setView($) {
      _({ view: $ }, d());
    },
    setSort($) {
      _({ sort: dt(l.value, $).key }, d());
    },
    toggleDirection() {
      _({ dir: s.value.dir === "desc" ? "asc" : "desc" }, d());
    },
    setExpression($) {
      _({ expr: $ }, d());
    },
    narrow($, E) {
      _({ expr: $, ...b(E) }, d());
    },
    setPage($, E) {
      _({ page: Math.max(1, Math.floor($)) }, E ?? d());
    },
    setFacet($, E) {
      m($, () => E);
    },
    toggleChip($, E) {
      m($, (L) => L.kind !== "chips" ? L : { kind: "chips", selected: L.selected.includes(E) ? L.selected.filter((I) => I !== E) : [...L.selected, E] });
    },
    setRange($, E, L) {
      m($, (B) => B.kind === "range" ? { kind: "range", min: E, max: L } : B);
    },
    toggleFlag($) {
      m(
        $,
        (E) => E.kind === "toggle" ? { kind: "toggle", on: !E.on } : E
      );
    },
    removeTerm($) {
      if ($.facetKey === pn) {
        M(null);
        return;
      }
      m($.facetKey, (E) => E.kind === "chips" && $.option ? { kind: "chips", selected: E.selected.filter((L) => L !== $.option) } : E.kind === "range" ? { kind: "range", min: null, max: null } : E.kind === "toggle" ? { kind: "toggle", on: !1 } : E);
    },
    clearFilters() {
      _({ entity: null, expr: "", facets: un(null) }, d());
    },
    reset() {
      f($n(n.value, a.value), d());
    },
    hrefFor($) {
      const E = { ...s.value, ...$ };
      return E.page = $.page ?? (aa($) ? 1 : s.value.page), E.facets = xa(Mt(n.value, E.entity), E.facets), `${t.path.value}${ua(E, n.value, a.value, t.search.value)}`;
    }
  };
}
function kl(e) {
  const t = Ht([]), n = W(0), a = W(!1), s = Ht(null);
  let l = 0;
  const o = g(() => (e.query.value.page - 1) * e.limit.value), c = g(() => Vs(n.value, e.limit.value)), r = (d) => {
    t.value = d.rows, n.value = d.total, s.value = null;
  }, f = () => {
    const d = ++l, h = {
      query: e.query.value,
      schema: e.schema.value,
      entity: e.entity.value,
      limit: e.limit.value,
      offset: o.value
    };
    let _;
    try {
      _ = e.source.value.query(h);
    } catch (m) {
      s.value = m, t.value = [], n.value = 0;
      return;
    }
    if (!(_ instanceof Promise)) {
      r(_), a.value = !1;
      return;
    }
    a.value = !0, _.then((m) => {
      d === l && r(m);
    }).catch((m) => {
      d === l && (s.value = m, t.value = [], n.value = 0);
    }).finally(() => {
      d === l && (a.value = !1);
    });
  };
  return Me([e.source, e.query, e.schema, e.entity, e.limit], f, {
    immediate: !0
  }), { rows: t, total: n, offset: o, pageCount: c, pending: a, error: s, refresh: f };
}
const $l = ["data-dc-expanded"], xl = ["aria-expanded", "aria-controls"], Ml = { class: "dc-header__domain" }, Cl = { class: "dc-header__crumb" }, El = { class: "dc-header__crumb-root" }, Pl = {
  key: 0,
  class: "dc-header__count dc-mono"
}, Sl = { class: "dc-header__query" }, Al = ["data-dc-active", "title"], zl = {
  class: "dc-header__chevron",
  "aria-hidden": "true"
}, Rl = { class: "dc-header__sr" }, Tl = {
  key: 0,
  class: "dc-header__pages",
  "aria-label": "Pages"
}, Fl = ["disabled"], Ll = ["title"], Dl = {
  class: "dc-header__sr",
  "aria-live": "polite"
}, Il = ["disabled"], Nl = {
  key: 1,
  class: "dc-header__actions"
}, Vl = /* @__PURE__ */ ce({
  __name: "ShellHeader",
  props: {
    expanded: { type: Boolean },
    panelId: {},
    hideCount: { type: Boolean }
  },
  emits: ["toggle"],
  setup(e, { emit: t }) {
    const n = e, a = t, s = ye(), l = g(() => s.schema.value), o = g(() => s.entity.value?.label ?? "Everything"), c = g(() => {
      if (n.hideCount) return "";
      const h = s.entity.value;
      return h && !s.hasFacets.value && !s.query.value.expr.trim() ? h.count : String(s.total.value);
    }), r = g(() => s.query.value.page), f = g(
      () => s.pageCount.value > 1 && !Ma(s.query.value)
    ), d = g(() => {
      const h = `Page ${r.value} of ${s.pageCount.value}`, _ = s.rows.value.length;
      if (!_) return h;
      const m = s.offset.value + 1;
      return `${h} — rows ${m} to ${m + _ - 1} of ${s.total.value}`;
    });
    return (h, _) => (v(), w("div", {
      class: "dc-header",
      "data-dc-expanded": e.expanded ? "true" : "false"
    }, [
      y("button", {
        type: "button",
        class: "dc-header__trigger",
        "aria-expanded": e.expanded,
        "aria-controls": e.panelId,
        onClick: _[0] || (_[0] = (m) => a("toggle"))
      }, [
        _[4] || (_[4] = y("span", {
          class: "dc-header__badge",
          "aria-hidden": "true"
        }, "◆", -1)),
        y("span", Ml, A(l.value.label), 1),
        y("span", Cl, [
          y("span", El, A(o.value), 1),
          c.value ? (v(), w("span", Pl, A(c.value), 1)) : N("", !0)
        ]),
        y("span", Sl, [
          _[3] || (_[3] = y("span", { class: "dc-header__query-label" }, "Query", -1)),
          y("span", {
            class: "dc-header__summary dc-mono dc-truncate",
            "data-dc-active": C(s).isPristine.value ? "false" : "true",
            title: C(s).summary.value
          }, A(C(s).summary.value), 9, Al)
        ]),
        y("span", zl, A(e.expanded ? "▲" : "▼"), 1),
        y("span", Rl, A(e.expanded ? "Hide query panel" : "Edit query"), 1)
      ], 8, xl),
      f.value ? (v(), w("nav", Tl, [
        y("button", {
          type: "button",
          class: "dc-header__step",
          "aria-label": "Previous page",
          disabled: r.value <= 1,
          onClick: _[1] || (_[1] = (m) => C(s).setPage(r.value - 1))
        }, [..._[5] || (_[5] = [
          y("span", { "aria-hidden": "true" }, "‹", -1)
        ])], 8, Fl),
        y("span", {
          class: "dc-header__page dc-mono",
          title: d.value,
          "aria-hidden": "true"
        }, A(r.value) + " / " + A(C(s).pageCount.value), 9, Ll),
        y("span", Dl, A(d.value), 1),
        y("button", {
          type: "button",
          class: "dc-header__step",
          "aria-label": "Next page",
          disabled: r.value >= C(s).pageCount.value,
          onClick: _[2] || (_[2] = (m) => C(s).setPage(r.value + 1))
        }, [..._[6] || (_[6] = [
          y("span", { "aria-hidden": "true" }, "›", -1)
        ])], 8, Il)
      ])) : N("", !0),
      h.$slots.actions ? (v(), w("div", Nl, [
        Ke(h.$slots, "actions", {}, void 0, !0)
      ])) : N("", !0)
    ], 8, $l));
  }
}), ue = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [a, s] of t)
    n[a] = s;
  return n;
}, Da = /* @__PURE__ */ ue(Vl, [["__scopeId", "data-v-cdaaadf4"]]), Ol = { class: "dc-facet" }, Kl = { class: "dc-facet__head" }, ql = ["id"], Bl = { class: "dc-facet__hint dc-mono" }, Wl = ["aria-labelledby"], Hl = ["aria-pressed", "data-dc-active", "onClick"], Ul = ["aria-labelledby"], Gl = ["aria-label", "placeholder", "onKeydown"], Xl = ["aria-label", "placeholder", "onKeydown"], jl = ["aria-checked"], Yl = { class: "dc-switch__text" }, Ql = ["data-dc-active"], Zl = /* @__PURE__ */ ce({
  __name: "FacetControl",
  props: {
    facet: {},
    value: {}
  },
  emits: ["update"],
  setup(e, { emit: t }) {
    const n = e, a = t, s = g(() => {
      const { facet: _, value: m } = n;
      return _.kind === "chips" && m.kind === "chips" ? m.selected.length ? `${m.selected.length} of ${_.options.length}` : "any" : _.kind === "range" && m.kind === "range" ? m.min === null && m.max === null ? `${_.min}–${_.max}` : `${m.min ?? _.min}–${m.max ?? _.max}` : m.kind === "toggle" ? m.on ? "on" : "off" : "";
    }), l = g(
      () => n.value.kind === "chips" ? new Set(n.value.selected) : /* @__PURE__ */ new Set()
    );
    function o(_) {
      if (n.value.kind !== "chips") return;
      const m = l.value.has(_) ? n.value.selected.filter((b) => b !== _) : [...n.value.selected, _];
      a("update", { kind: "chips", selected: m });
    }
    const c = W(""), r = W("");
    Me(
      () => n.value,
      (_) => {
        _.kind === "range" && (c.value = _.min === null ? "" : _.min, r.value = _.max === null ? "" : _.max);
      },
      { immediate: !0, deep: !0 }
    );
    function f(_) {
      if (typeof _ == "number") return Number.isFinite(_) ? _ : null;
      const m = _.trim();
      if (!m) return null;
      const b = Number(m);
      return Number.isFinite(b) ? b : null;
    }
    function d() {
      if (n.value.kind !== "range") return;
      const _ = f(c.value), m = f(r.value);
      _ === n.value.min && m === n.value.max || a("update", { kind: "range", min: _, max: m });
    }
    function h() {
      n.value.kind === "toggle" && a("update", { kind: "toggle", on: !n.value.on });
    }
    return (_, m) => (v(), w("div", Ol, [
      y("div", Kl, [
        y("span", {
          id: `dc-facet-${e.facet.key}`,
          class: "dc-facet__label"
        }, A(e.facet.label), 9, ql),
        y("span", Bl, A(s.value), 1)
      ]),
      e.facet.kind === "chips" && e.value.kind === "chips" ? (v(), w("div", {
        key: 0,
        class: "dc-facet__chips",
        role: "group",
        "aria-labelledby": `dc-facet-${e.facet.key}`
      }, [
        (v(!0), w(se, null, fe(e.facet.options, (b) => (v(), w("button", {
          key: b,
          type: "button",
          class: "dc-chip",
          "aria-pressed": l.value.has(b),
          "data-dc-active": l.value.has(b) ? "true" : "false",
          onClick: (M) => o(b)
        }, A(b), 9, Hl))), 128))
      ], 8, Wl)) : e.facet.kind === "range" && e.value.kind === "range" ? (v(), w("div", {
        key: 1,
        class: "dc-facet__range",
        role: "group",
        "aria-labelledby": `dc-facet-${e.facet.key}`
      }, [
        rn(y("input", {
          "onUpdate:modelValue": m[0] || (m[0] = (b) => c.value = b),
          class: "dc-input dc-mono",
          type: "number",
          inputmode: "numeric",
          "aria-label": `${e.facet.label} minimum`,
          placeholder: String(e.facet.min),
          onChange: d,
          onBlur: d,
          onKeydown: Ut(Oe(d, ["prevent"]), ["enter"])
        }, null, 40, Gl), [
          [on, c.value]
        ]),
        m[2] || (m[2] = y("span", {
          class: "dc-facet__dash",
          "aria-hidden": "true"
        }, "–", -1)),
        rn(y("input", {
          "onUpdate:modelValue": m[1] || (m[1] = (b) => r.value = b),
          class: "dc-input dc-mono",
          type: "number",
          inputmode: "numeric",
          "aria-label": `${e.facet.label} maximum`,
          placeholder: String(e.facet.max),
          onChange: d,
          onBlur: d,
          onKeydown: Ut(Oe(d, ["prevent"]), ["enter"])
        }, null, 40, Xl), [
          [on, r.value]
        ])
      ], 8, Ul)) : e.facet.kind === "toggle" && e.value.kind === "toggle" ? (v(), w("button", {
        key: 2,
        type: "button",
        class: "dc-switch",
        role: "switch",
        "aria-checked": e.value.on,
        onClick: h
      }, [
        y("span", Yl, A(e.facet.text), 1),
        y("span", {
          class: "dc-switch__track",
          "data-dc-active": e.value.on ? "true" : "false",
          "aria-hidden": "true"
        }, [...m[3] || (m[3] = [
          y("span", { class: "dc-switch__knob" }, null, -1)
        ])], 8, Ql)
      ], 8, jl)) : N("", !0)
    ]));
  }
}), Ia = /* @__PURE__ */ ue(Zl, [["__scopeId", "data-v-c2efbd0c"]]), Jl = ["aria-label"], er = ["aria-checked", "data-dc-active", "tabindex", "onClick", "onKeydown"], tr = /* @__PURE__ */ ce({
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
      }, A(r.label), 43, er))), 128))
    ], 8, Jl));
  }
}), vn = /* @__PURE__ */ ue(tr, [["__scopeId", "data-v-63fb5482"]]), nr = ["id"], ar = { class: "dc-panel__section" }, sr = { class: "dc-panel__query" }, lr = { class: "dc-panel__expression" }, rr = ["for"], or = ["id", "placeholder", "onKeydown"], ir = {
  key: 0,
  class: "dc-panel__facets"
}, cr = {
  key: 1,
  class: "dc-panel__hint"
}, ur = { class: "dc-panel__scope" }, dr = ["id"], fr = ["aria-labelledby"], pr = ["data-dc-active", "aria-current"], vr = { class: "dc-entity__count dc-mono" }, mr = ["data-dc-active", "aria-current", "onClick"], hr = { class: "dc-entity__label" }, _r = { class: "dc-entity__count dc-mono" }, gr = { class: "dc-panel__actions" }, yr = ["disabled"], wr = { class: "dc-panel__section dc-panel__section--row" }, br = { class: "dc-panel__control" }, kr = { class: "dc-panel__control" }, $r = ["title", "aria-label"], xr = {
  key: 0,
  class: "dc-panel__section"
}, Mr = /* @__PURE__ */ ce({
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
    }, c = g(
      () => (n.views ?? [...Os]).map((M) => ({ key: M, label: o[M] }))
    ), r = g(
      () => l.sorts.value.map((M) => ({ key: M.key, label: M.label }))
    ), f = W(l.query.value.expr), d = W(null);
    Me(
      () => l.query.value.expr,
      (M) => {
        f.value = M;
      }
    );
    const h = g(() => f.value !== l.query.value.expr);
    function _() {
      l.setExpression(f.value), a("close");
    }
    function m() {
      f.value = "", l.clearFilters();
    }
    function b(M, $) {
      l.setFacet(M, $);
    }
    return At(() => d.value?.focus()), (M, $) => (v(), w("div", {
      id: e.panelId,
      class: "dc-panel",
      role: "dialog",
      "aria-label": "Query",
      onKeydown: $[5] || ($[5] = Ut(Oe((E) => a("close"), ["stop"]), ["esc"]))
    }, [
      y("section", ar, [
        y("div", sr, [
          y("div", lr, [
            y("label", {
              class: "dc-panel__field-label",
              for: `${e.panelId}-expr`
            }, "Expression", 8, rr),
            rn(y("input", {
              id: `${e.panelId}-expr`,
              ref_key: "expressionField",
              ref: d,
              "onUpdate:modelValue": $[0] || ($[0] = (E) => f.value = E),
              class: "dc-expression dc-mono",
              type: "text",
              autocomplete: "off",
              spellcheck: "false",
              placeholder: C(l).schema.value.placeholder,
              onKeydown: Ut(Oe(_, ["prevent"]), ["enter"])
            }, null, 40, or), [
              [on, f.value]
            ])
          ]),
          C(l).entity.value ? (v(), w("div", ir, [
            (v(!0), w(se, null, fe(C(l).entity.value.facets, (E) => (v(), me(Ia, {
              key: E.key,
              facet: E,
              value: C(l).query.value.facets[E.key],
              onUpdate: (L) => b(E.key, L)
            }, null, 8, ["facet", "value", "onUpdate"]))), 128))
          ])) : (v(), w("p", cr, " Results span every entity — logs and settings included. Pick one below to narrow to it and to get its own filters. "))
        ]),
        y("div", ur, [
          y("span", {
            id: `${e.panelId}-entities`,
            class: "dc-panel__field-label"
          }, "Entities", 8, dr),
          y("div", {
            class: "dc-panel__entities",
            role: "group",
            "aria-labelledby": `${e.panelId}-entities`
          }, [
            y("button", {
              type: "button",
              class: "dc-entity dc-entity--all",
              "data-dc-active": C(l).isEverything.value ? "true" : "false",
              "aria-current": C(l).isEverything.value ? "true" : void 0,
              onClick: $[1] || ($[1] = (E) => C(l).clearEntity())
            }, [
              $[6] || ($[6] = y("span", { class: "dc-entity__label" }, "Everything", -1)),
              y("span", vr, A(C(l).entities.value.length) + " kinds", 1)
            ], 8, pr),
            (v(!0), w(se, null, fe(C(l).entities.value, (E) => (v(), w("button", {
              key: E.key,
              type: "button",
              class: "dc-entity",
              "data-dc-active": E.key === C(l).entity.value?.key ? "true" : "false",
              "aria-current": E.key === C(l).entity.value?.key ? "true" : void 0,
              onClick: (L) => C(l).setEntity(E.key)
            }, [
              y("span", hr, A(E.label), 1),
              y("span", _r, A(E.count), 1)
            ], 8, mr))), 128))
          ], 8, fr)
        ]),
        y("div", gr, [
          y("button", {
            type: "button",
            class: "dc-button dc-button--primary",
            onClick: _
          }, " Run query "),
          y("button", {
            type: "button",
            class: "dc-button",
            disabled: C(l).isPristine.value && !h.value,
            onClick: m
          }, " Reset ", 8, yr)
        ])
      ]),
      y("section", wr, [
        y("div", br, [
          $[7] || ($[7] = y("span", { class: "dc-eyebrow" }, "View", -1)),
          ae(vn, {
            label: "Result view",
            "model-value": C(l).query.value.view,
            options: c.value,
            "onUpdate:modelValue": $[2] || ($[2] = (E) => C(l).setView(E))
          }, null, 8, ["model-value", "options"])
        ]),
        y("div", kr, [
          $[8] || ($[8] = y("span", { class: "dc-eyebrow" }, "Sort", -1)),
          ae(vn, {
            mono: "",
            label: "Sort field",
            "model-value": C(l).query.value.sort,
            options: r.value,
            "onUpdate:modelValue": $[3] || ($[3] = (E) => C(l).setSort(E))
          }, null, 8, ["model-value", "options"]),
          y("button", {
            type: "button",
            class: "dc-button dc-button--icon dc-mono",
            title: C(l).query.value.dir === "desc" ? "Descending — click to reverse" : "Ascending — click to reverse",
            "aria-label": `Sort direction: ${C(l).query.value.dir === "desc" ? "descending" : "ascending"}`,
            onClick: $[4] || ($[4] = (E) => C(l).toggleDirection())
          }, A(C(l).query.value.dir === "desc" ? "↓" : "↑"), 9, $r)
        ])
      ]),
      s["panel-section"] ? (v(), w("section", xr, [
        Ke(M.$slots, "panel-section", {}, void 0, !0)
      ])) : N("", !0)
    ], 40, nr));
  }
}), Na = /* @__PURE__ */ ue(Mr, [["__scopeId", "data-v-d8a6ac01"]]);
function uu() {
  const e = ye();
  return g(() => e.entity.value?.labels ?? Ca);
}
function Va(e, t, n, a) {
  return {
    row: e,
    key: Bs(e, t),
    entityLabel: e.entityLabel,
    entity: n,
    labels: n?.labels ?? Ca,
    ordinal: qs(t),
    metric1: sa(e.metric1),
    metric2: sa(e.metric2),
    date: Ks(e.updatedAt),
    score: e.score.toFixed(2),
    percent: Ea(e.score),
    pinned: a
  };
}
function gt() {
  const e = ye(), t = g(
    () => new Map(e.entities.value.map((n) => [n.key, n]))
  );
  return g(
    () => e.rows.value.map(
      (n, a) => Va(
        n,
        e.offset.value + a,
        t.value.get(n.entityKey) ?? null,
        e.isPinned(n)
      )
    )
  );
}
const Cr = ["data-dc-status"], Er = /* @__PURE__ */ ce({
  __name: "StatusPill",
  props: {
    status: {}
  },
  setup(e) {
    return (t, n) => (v(), w("span", {
      class: "dc-pill",
      "data-dc-status": e.status
    }, A(e.status), 9, Cr));
  }
}), zt = /* @__PURE__ */ ue(Er, [["__scopeId", "data-v-23e59fbf"]]), Pr = ["title"], Sr = { key: 1 }, Ar = /* @__PURE__ */ ce({
  __name: "MetricDrill",
  props: {
    entry: {},
    metric: {},
    to: {},
    label: {}
  },
  setup(e) {
    const t = e, n = ye(), a = g(() => {
      const c = t.entry.entity;
      if (!c?.scope) return null;
      const r = t.to ?? (t.metric ? c.drills?.[t.metric] : void 0);
      return n.entities.value.find((f) => f.key === r) ?? null;
    }), s = g(() => t.label ?? (t.metric ? t.entry.labels[t.metric] : "")), l = g(() => t.metric ? t.entry[t.metric] : "");
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
    ], 8, Pr)) : (v(), w("span", Sr, [
      Ke(c.$slots, "default", {}, () => [
        xe(A(l.value), 1)
      ], !0)
    ]));
  }
}), ot = /* @__PURE__ */ ue(Ar, [["__scopeId", "data-v-ced2ff08"]]), zr = ["data-dc-active", "aria-pressed", "aria-label"], Rr = /* @__PURE__ */ ce({
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
    }, A(e.pinned ? "★" : "☆"), 9, zr));
  }
}), Rn = /* @__PURE__ */ ue(Rr, [["__scopeId", "data-v-890e0fb5"]]), Tr = ["title", "aria-label"], Fr = /* @__PURE__ */ ce({
  __name: "ScopeMark",
  props: {
    entry: {}
  },
  setup(e) {
    const t = e, n = ye(), a = g(() => t.entry.entity?.scope ?? null);
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
    }, " → ", 8, Tr)) : N("", !0);
  }
}), Rt = /* @__PURE__ */ ue(Fr, [["__scopeId", "data-v-15dce1c0"]]), Lr = { class: "dc-cards" }, Dr = { class: "dc-card__top dc-mono" }, Ir = {
  key: 0,
  class: "dc-card__entity"
}, Nr = { class: "dc-card__top-right" }, Vr = ["onClick"], Or = { class: "dc-card__primary" }, Kr = { class: "dc-card__secondary dc-mono" }, qr = { class: "dc-card__metrics dc-mono" }, Br = { class: "dc-card__date" }, Wr = /* @__PURE__ */ ce({
  __name: "CardsView",
  setup(e) {
    const t = ye(), n = gt(), a = g(() => t.isEverything.value);
    return (s, l) => (v(), w("div", Lr, [
      (v(!0), w(se, null, fe(C(n), (o) => (v(), w("div", {
        key: o.key,
        class: "dc-card"
      }, [
        y("div", Dr, [
          y("span", null, [
            xe(A(o.ordinal) + " ", 1),
            a.value ? (v(), w("span", Ir, A(o.entityLabel), 1)) : N("", !0)
          ]),
          y("span", Nr, [
            ae(zt, {
              status: o.row.status
            }, null, 8, ["status"]),
            ae(Rt, { entry: o }, null, 8, ["entry"]),
            C(t).pinnable.value ? (v(), me(Rn, {
              key: 0,
              row: o.row,
              pinned: o.pinned
            }, null, 8, ["row", "pinned"])) : N("", !0)
          ])
        ]),
        y("button", {
          type: "button",
          class: "dc-card__open",
          onClick: (c) => C(t).activate(o.row)
        }, [
          y("span", Or, A(o.row.primary), 1),
          y("span", Kr, A(o.row.secondary), 1)
        ], 8, Vr),
        y("div", qr, [
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
          y("span", Br, A(o.date), 1)
        ])
      ]))), 128))
    ]));
  }
}), Oa = /* @__PURE__ */ ue(Wr, [["__scopeId", "data-v-4b30c513"]]), Hr = { class: "dc-grid" }, Ur = ["onClick"], Gr = { class: "dc-tile__scrim" }, Xr = { class: "dc-tile__top dc-mono" }, jr = { class: "dc-tile__chip" }, Yr = { class: "dc-tile__chip" }, Qr = { class: "dc-tile__caption" }, Zr = { class: "dc-tile__secondary dc-truncate" }, Jr = { class: "dc-tile__primary" }, eo = /* @__PURE__ */ ce({
  __name: "GridView",
  setup(e) {
    const t = ye(), n = gt();
    return (a, s) => (v(), w("div", Hr, [
      (v(!0), w(se, null, fe(C(n), (l) => (v(), w("button", {
        key: l.key,
        type: "button",
        class: "dc-tile",
        style: Ae({ "--dc-tile-tint": l.row.tint }),
        onClick: (o) => C(t).activate(l.row)
      }, [
        y("span", Gr, [
          y("span", Xr, [
            y("span", jr, A(l.ordinal), 1),
            y("span", Yr, A(l.score), 1)
          ]),
          y("span", Qr, [
            y("span", Zr, A(l.row.secondary), 1),
            y("span", Jr, A(l.row.primary), 1)
          ])
        ])
      ], 12, Ur))), 128))
    ]));
  }
}), Ka = /* @__PURE__ */ ue(eo, [["__scopeId", "data-v-adddef0c"]]), to = { class: "dc-links" }, no = ["onClick"], ao = { class: "dc-link__primary dc-truncate" }, so = { class: "dc-link__secondary dc-mono dc-truncate" }, lo = /* @__PURE__ */ ce({
  __name: "LinksView",
  setup(e) {
    const t = ye(), n = gt();
    return (a, s) => (v(), w("div", to, [
      (v(!0), w(se, null, fe(C(n), (l) => (v(), w("button", {
        key: l.key,
        type: "button",
        class: "dc-link",
        onClick: (o) => C(t).activate(l.row)
      }, [
        y("span", ao, A(l.row.primary), 1),
        y("span", so, A(l.row.secondary), 1)
      ], 8, no))), 128))
    ]));
  }
}), qa = /* @__PURE__ */ ue(lo, [["__scopeId", "data-v-98d0e211"]]), ro = ["aria-valuenow", "aria-label", "title"], oo = /* @__PURE__ */ ce({
  __name: "ScoreMeter",
  props: {
    value: {},
    label: {}
  },
  setup(e) {
    const t = e, n = g(() => Ea(t.value));
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
    ], 8, ro));
  }
}), Tn = /* @__PURE__ */ ue(oo, [["__scopeId", "data-v-ab794776"]]), io = {
  class: "dc-list",
  role: "list"
}, co = ["onClick"], uo = { class: "dc-list__ordinal dc-mono" }, fo = { class: "dc-list__identity" }, po = { class: "dc-list__primary dc-truncate" }, vo = { class: "dc-list__secondary dc-mono dc-truncate" }, mo = {
  key: 0,
  class: "dc-list__entity dc-mono"
}, ho = { class: "dc-list__metrics dc-mono" }, _o = { class: "dc-list__trailing" }, go = /* @__PURE__ */ ce({
  __name: "ListView",
  setup(e) {
    const t = ye(), n = gt(), a = g(() => t.isEverything.value);
    return (s, l) => (v(), w("div", io, [
      (v(!0), w(se, null, fe(C(n), (o) => (v(), w("div", {
        key: o.key,
        class: "dc-list__row",
        role: "listitem"
      }, [
        y("button", {
          type: "button",
          class: "dc-list__open",
          onClick: (c) => C(t).activate(o.row)
        }, [
          y("span", uo, A(o.ordinal), 1),
          y("span", fo, [
            y("span", po, A(o.row.primary), 1),
            y("span", vo, A(o.row.secondary), 1)
          ])
        ], 8, co),
        a.value ? (v(), w("span", mo, A(o.entityLabel), 1)) : N("", !0),
        y("span", ho, [
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
        y("span", _o, [
          ae(zt, {
            status: o.row.status
          }, null, 8, ["status"]),
          ae(Rt, { entry: o }, null, 8, ["entry"]),
          C(t).pinnable.value ? (v(), me(Rn, {
            key: 0,
            row: o.row,
            pinned: o.pinned
          }, null, 8, ["row", "pinned"])) : N("", !0)
        ])
      ]))), 128))
    ]));
  }
}), mn = /* @__PURE__ */ ue(go, [["__scopeId", "data-v-7bbe825a"]]), yo = { class: "dc-preview" }, wo = { class: "dc-preview__pager dc-mono" }, bo = ["disabled"], ko = { "aria-live": "polite" }, $o = ["disabled"], xo = {
  key: 0,
  class: "dc-preview__card"
}, Mo = { class: "dc-preview__body" }, Co = { class: "dc-preview__top" }, Eo = { class: "dc-preview__badges" }, Po = { class: "dc-preview__entity dc-mono" }, So = { class: "dc-preview__marks" }, Ao = { class: "dc-preview__primary" }, zo = { class: "dc-preview__secondary dc-mono" }, Ro = { class: "dc-preview__fields" }, To = { class: "dc-preview__key" }, Fo = { class: "dc-preview__value dc-mono" }, Lo = /* @__PURE__ */ ce({
  __name: "PreviewView",
  setup(e) {
    const t = ye(), n = gt(), a = W(0);
    Me(n, (r) => {
      a.value > r.length - 1 && (a.value = Math.max(0, r.length - 1));
    });
    const s = g(() => n.value[a.value]), l = g(() => {
      const r = s.value;
      return r ? [
        { key: r.labels.secondary, value: r.row.secondary, metric: null },
        // Named, so the value renders as the drill it may be rather than as text.
        { key: r.labels.metric1, value: r.metric1, metric: "metric1" },
        { key: r.labels.metric2, value: r.metric2, metric: "metric2" },
        { key: "Updated", value: r.date, metric: null }
      ] : [];
    }), o = g(() => {
      if (!n.value.length) return "0 / 0";
      const r = t.total.value > n.value.length ? ` of ${t.total.value}` : "";
      return `${a.value + 1} / ${n.value.length}${r}`;
    }), c = (r) => {
      const f = n.value.length;
      f && (a.value = Math.min(f - 1, Math.max(0, a.value + r)));
    };
    return (r, f) => (v(), w("div", yo, [
      y("div", wo, [
        y("button", {
          type: "button",
          class: "dc-preview__step",
          "aria-label": "Previous result",
          disabled: a.value === 0,
          onClick: f[0] || (f[0] = (d) => c(-1))
        }, " ‹ ", 8, bo),
        y("span", ko, A(o.value), 1),
        y("button", {
          type: "button",
          class: "dc-preview__step",
          "aria-label": "Next result",
          disabled: a.value >= C(n).length - 1,
          onClick: f[1] || (f[1] = (d) => c(1))
        }, " › ", 8, $o)
      ]),
      s.value ? (v(), w("div", xo, [
        y("div", {
          class: "dc-preview__media",
          style: Ae({ background: s.value.row.tint }),
          "aria-hidden": "true"
        }, " preview ", 4),
        y("div", Mo, [
          y("div", Co, [
            y("span", Eo, [
              ae(zt, {
                status: s.value.row.status
              }, null, 8, ["status"]),
              y("span", Po, A(s.value.entityLabel), 1)
            ]),
            y("span", So, [
              ae(Rt, { entry: s.value }, null, 8, ["entry"]),
              C(t).pinnable.value ? (v(), me(Rn, {
                key: 0,
                row: s.value.row,
                pinned: s.value.pinned
              }, null, 8, ["row", "pinned"])) : N("", !0)
            ])
          ]),
          y("div", null, [
            y("div", Ao, A(s.value.row.primary), 1),
            y("div", zo, A(s.value.row.secondary), 1)
          ]),
          y("dl", Ro, [
            (v(!0), w(se, null, fe(l.value, (d) => (v(), w("div", {
              key: d.key,
              class: "dc-preview__field"
            }, [
              y("dt", To, A(d.key), 1),
              y("dd", Fo, [
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
            onClick: f[2] || (f[2] = (d) => C(t).activate(s.value.row))
          }, " Open record → ")
        ])
      ])) : N("", !0)
    ]));
  }
}), Ba = /* @__PURE__ */ ue(Lo, [["__scopeId", "data-v-405dfdb6"]]);
function Do() {
  const e = ye();
  return g(() => Ws(e.schema.value, e.entity.value));
}
const Io = ["src", "alt"], No = ["title"], Vo = /* @__PURE__ */ ce({
  __name: "ColumnCell",
  props: {
    column: {},
    entry: {}
  },
  setup(e) {
    const t = e, n = ye(), a = g(() => t.column.kind ?? "text"), s = g(() => Hs(t.column, t.entry.row)), l = g(
      () => a.value === "ordinal" ? t.entry.ordinal : Pa(t.column, t.entry.row)
    ), o = g(() => s.value), c = g(() => {
      const h = Number(s.value);
      return Number.isFinite(h) ? h : 0;
    }), r = g(() => t.column.activate === !0 || !!t.column.click), f = g(() => dn(t.column));
    function d(h) {
      r.value && (h.stopPropagation(), t.column.click?.(t.entry.row), t.column.activate && n.activate(t.entry.row));
    }
    return (h, _) => a.value === "component" && e.column.component ? (v(), me(ba(e.column.component), {
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
    }, null, 12, Io)) : e.column.drill ? (v(), me(ot, {
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
    }, A(l.value), 11, No)) : (v(), w(se, { key: 6 }, [
      xe(A(l.value), 1)
    ], 64));
  }
}), da = /* @__PURE__ */ ue(Vo, [["__scopeId", "data-v-24af1027"]]), Oo = {
  key: 0,
  class: "dc-table__none"
}, Ko = { class: "dc-table__detail" }, qo = {
  key: 1,
  class: "dc-table"
}, Bo = ["data-dc-align", "data-dc-hide", "aria-sort"], Wo = ["onClick"], Ho = ["onClick"], Uo = ["data-dc-align", "data-dc-hide", "title"], Go = {
  key: 0,
  class: "dc-table__name"
}, Xo = /* @__PURE__ */ ce({
  __name: "TableView",
  setup(e) {
    const t = ye(), n = gt(), a = Do();
    function s(h) {
      h && (t.query.value.sort === h ? t.toggleDirection() : t.setSort(h));
    }
    const l = g(() => t.entity.value?.label ?? "The result set"), o = g(() => new Set(t.sorts.value.map((h) => h.key))), c = (h) => h.sort !== void 0 && o.value.has(h.sort), r = (h) => {
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
    function d(h, _) {
      if (!(!dn(h) || h.activate || h.click))
        return Pa(h, _.row);
    }
    return (h, _) => C(a).length ? (v(), w("table", qo, [
      y("thead", null, [
        y("tr", null, [
          (v(!0), w(se, null, fe(C(a), (m, b) => (v(), w("th", {
            key: C(oa)(m, b),
            scope: "col",
            class: Gt(C(ra)(m)),
            style: Ae({ width: m.width }),
            "data-dc-align": C(la)(m),
            "data-dc-hide": m.hideBelow,
            "aria-sort": r(m)
          }, [
            c(m) ? (v(), w("button", {
              key: 0,
              type: "button",
              class: "dc-table__sort",
              onClick: (M) => s(m.sort)
            }, A(m.label), 9, Wo)) : (v(), w(se, { key: 1 }, [
              xe(A(m.label), 1)
            ], 64))
          ], 14, Bo))), 128))
        ])
      ]),
      y("tbody", null, [
        (v(!0), w(se, null, fe(C(n), (m) => (v(), w("tr", {
          key: m.key,
          class: "dc-table__row",
          onClick: (b) => C(t).activate(m.row)
        }, [
          (v(!0), w(se, null, fe(C(a), (b, M) => (v(), w("td", {
            key: C(oa)(b, M),
            class: Gt(f(b)),
            "data-dc-align": C(la)(b),
            "data-dc-hide": b.hideBelow,
            title: d(b, m)
          }, [
            b.scope ? (v(), w("span", Go, [
              ae(da, {
                column: b,
                entry: m
              }, null, 8, ["column", "entry"]),
              ae(Rt, { entry: m }, null, 8, ["entry"])
            ])) : (v(), me(da, {
              key: 1,
              column: b,
              entry: m
            }, null, 8, ["column", "entry"]))
          ], 10, Uo))), 128))
        ], 8, Ho))), 128))
      ])
    ])) : (v(), w("p", Oo, [
      _[4] || (_[4] = y("span", { class: "dc-table__headline" }, "No columns declared", -1)),
      y("span", Ko, [
        xe(A(l.value) + " has no ", 1),
        _[0] || (_[0] = y("code", null, "columns", -1)),
        _[1] || (_[1] = xe(" in the schema, so there is no table to draw. ", -1)),
        _[2] || (_[2] = y("code", null, "defaultColumns()", -1)),
        _[3] || (_[3] = xe(" is the familiar eight. ", -1))
      ])
    ]));
  }
}), Wa = /* @__PURE__ */ ue(Xo, [["__scopeId", "data-v-aa11c81b"]]);
function jo(e) {
  const t = Ht([]), n = W(!1), a = Ht(null);
  let s = 0;
  const l = (r, f, d) => ({
    entity: r,
    rows: f.rows.map(
      (h, _) => Va(h, _, r, e.isPinned(h.id))
    ),
    total: f.total,
    count: d ? r.count : String(f.total)
  }), o = () => {
    const r = ++s, f = e.query.value, d = e.schema.value, h = e.entities.value, _ = e.limit.value, m = xn(f), b = h.map((M) => ({
      entity: M,
      // Scope the query to this entity, keeping the expression and ordering
      // but dropping facets, which belong to whichever entity is selected.
      outcome: e.source.value.query({
        // Each card is the top few of its type, wherever the shell's own
        // result set has been paged to — so this asks for the first page.
        query: { ...f, entity: M.key, facets: un(M), page: 1 },
        schema: d,
        entity: M,
        limit: _,
        offset: 0
      })
    }));
    if (b.every(({ outcome: M }) => !(M instanceof Promise))) {
      t.value = b.map(
        ({ entity: M, outcome: $ }) => l(M, $, m)
      ), a.value = null, n.value = !1;
      return;
    }
    n.value = !0, Promise.all(b.map(({ outcome: M }) => Promise.resolve(M))).then((M) => {
      r === s && (t.value = M.map(
        ($, E) => l(b[E].entity, $, m)
      ), a.value = null);
    }).catch((M) => {
      r === s && (a.value = M, t.value = []);
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
const Yo = {
  key: 0,
  class: "dc-types__state",
  role: "alert"
}, Qo = {
  key: 1,
  class: "dc-types__state",
  "aria-live": "polite"
}, Zo = ["data-dc-pending"], Jo = ["data-dc-empty"], ei = ["onClick"], ti = { class: "dc-type__name" }, ni = { class: "dc-type__count dc-mono" }, ai = { class: "dc-type__sr" }, si = {
  key: 0,
  class: "dc-type__empty"
}, li = ["onClick"], ri = { class: "dc-type__identity" }, oi = { class: "dc-type__primary dc-truncate" }, ii = { class: "dc-type__secondary dc-mono dc-truncate" }, ci = { class: "dc-type__trailing dc-mono" }, ui = { class: "dc-type__metric-value" }, di = { class: "dc-type__metric-label" }, fi = { class: "dc-type__date" }, pi = ["onClick"], vi = /* @__PURE__ */ ce({
  __name: "TypeCardsView",
  setup(e) {
    const t = ye(), { previews: n, pending: a, error: s } = jo({
      source: t.source,
      schema: t.schema,
      query: t.query,
      entities: t.entities,
      limit: t.previewsPerType,
      isPinned: (o) => t.isPinnedId(o)
    }), l = g(() => !t.isPristine.value);
    return (o, c) => C(s) ? (v(), w("p", Yo, " Could not load results: " + A(C(s) instanceof Error ? C(s).message : "the data source failed."), 1)) : !C(n).length && C(a) ? (v(), w("p", Qo, " Running query… ")) : (v(), w("div", {
      key: 2,
      class: "dc-types",
      "data-dc-pending": C(a) ? "true" : "false"
    }, [
      (v(!0), w(se, null, fe(C(n), (r) => (v(), w("section", {
        key: r.entity.key,
        class: "dc-type",
        "data-dc-empty": r.rows.length ? "false" : "true"
      }, [
        y("button", {
          type: "button",
          class: "dc-type__head",
          onClick: (f) => C(t).setEntity(r.entity.key)
        }, [
          y("span", ti, A(r.entity.label), 1),
          y("span", ni, A(r.count), 1),
          c[0] || (c[0] = y("span", {
            class: "dc-type__go",
            "aria-hidden": "true"
          }, "→", -1)),
          y("span", ai, "Show only " + A(r.entity.label.toLowerCase()), 1)
        ], 8, ei),
        r.rows.length ? N("", !0) : (v(), w("p", si, A(l.value ? "No matches" : "Nothing here yet"), 1)),
        (v(!0), w(se, null, fe(r.rows, (f) => (v(), w("div", {
          key: f.key,
          class: "dc-type__row"
        }, [
          y("button", {
            type: "button",
            class: "dc-type__open",
            onClick: (d) => C(t).activate(f.row)
          }, [
            y("span", ri, [
              y("span", oi, A(f.row.primary), 1),
              y("span", ii, A(f.row.secondary), 1)
            ])
          ], 8, li),
          y("span", ci, [
            ae(ot, {
              class: "dc-type__metric",
              entry: f,
              metric: "metric1"
            }, {
              default: Ze(() => [
                y("span", ui, A(f.metric1), 1),
                y("span", di, A(f.labels.metric1), 1)
              ]),
              _: 2
            }, 1032, ["entry"]),
            y("span", fi, A(f.date), 1),
            ae(Rt, { entry: f }, null, 8, ["entry"])
          ])
        ]))), 128)),
        r.entity.create ? (v(), w("button", {
          key: 1,
          type: "button",
          class: "dc-type__new",
          onClick: (f) => C(t).create(r.entity)
        }, [
          c[1] || (c[1] = y("span", {
            class: "dc-type__plus",
            "aria-hidden": "true"
          }, "+", -1)),
          xe(" " + A(r.entity.create), 1)
        ], 8, pi)) : N("", !0)
      ], 8, Jo))), 128))
    ], 8, Zo));
  }
}), Ha = /* @__PURE__ */ ue(vi, [["__scopeId", "data-v-372c8f5e"]]), mi = ["data-dc-pending"], hi = {
  key: 0,
  class: "dc-results__state",
  role: "alert"
}, _i = { class: "dc-results__detail" }, gi = {
  key: 2,
  class: "dc-results__state",
  "aria-live": "polite"
}, yi = {
  key: 3,
  class: "dc-results__state"
}, wi = { class: "dc-results__detail" }, bi = /* @__PURE__ */ ce({
  __name: "ResultsArea",
  props: {
    views: {}
  },
  setup(e) {
    const t = e, n = ye(), a = {
      list: mn,
      cards: Oa,
      grid: Ka,
      table: Wa,
      links: qa,
      preview: Ba
    }, s = g(() => Ma(n.query.value)), l = g(() => {
      const f = n.query.value.view, d = t.views ?? [], [h] = d;
      return h === void 0 || d.includes(f) ? f : h;
    }), o = g(() => a[l.value] ?? mn), c = g(() => n.rows.value.length > 0), r = g(() => n.error.value !== null);
    return (f, d) => (v(), w("div", {
      class: "dc-results",
      "data-dc-pending": C(n).pending.value ? "true" : "false"
    }, [
      r.value ? (v(), w("p", hi, [
        d[1] || (d[1] = y("span", { class: "dc-results__headline" }, "Could not load results", -1)),
        y("span", _i, A(C(n).error.value instanceof Error ? C(n).error.value.message : "The data source failed."), 1)
      ])) : s.value ? (v(), me(Ha, { key: 1 })) : !c.value && C(n).pending.value ? (v(), w("p", gi, [...d[2] || (d[2] = [
        y("span", { class: "dc-results__detail" }, "Running query…", -1)
      ])])) : c.value ? (v(), me(ba(o.value), { key: 4 })) : (v(), w("div", yi, [
        d[3] || (d[3] = y("span", { class: "dc-results__headline" }, "Nothing matches this query", -1)),
        y("span", wi, A(C(n).summary.value), 1),
        C(n).isPristine.value ? N("", !0) : (v(), w("button", {
          key: 0,
          type: "button",
          class: "dc-results__clear",
          onClick: d[0] || (d[0] = (h) => C(n).clearFilters())
        }, A(C(n).isEverything.value ? "Clear filters" : "Search everything instead"), 1))
      ]))
    ], 8, mi));
  }
}), Ua = /* @__PURE__ */ ue(bi, [["__scopeId", "data-v-c00573c8"]]), ki = ["data-dc-theme"], $i = ["data-dc-width", "data-dc-align"], xi = { class: "dc-shell__panel" }, Mi = /* @__PURE__ */ ce({
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
    const a = e, s = n, l = Xt(e, "open"), o = Xt(e, "pinned"), c = kn(), r = ht(Sa, null), f = a.route || r ? null : Us(), d = a.route ?? r ?? f;
    Je(() => f?.dispose?.());
    const h = g(() => ol({ seed: a.schema.key })), _ = g(() => a.source ?? h.value), m = bl({
      schema: () => a.schema,
      adapter: d,
      defaults: () => a.defaults,
      navigationMode: () => a.navigationMode,
      facetNavigationMode: () => a.facetNavigationMode
    }), b = kl({
      source: _,
      query: m.query,
      schema: g(() => a.schema),
      entity: m.entity,
      limit: g(() => a.limit)
    });
    Me(m.query, (k) => s("query-change", k)), Me(
      [b.pageCount, b.pending, m.query],
      () => {
        if (b.pending.value) return;
        const k = b.pageCount.value;
        m.query.value.page > k && m.setPage(k, "replace");
      },
      // Immediately, since a pasted URL is past the end before anything changes;
      // and after the render, so the correction is a navigation the mounted shell
      // makes rather than one it makes on the way up. An async source is still
      // pending here and corrects itself when its count lands.
      { immediate: !0, flush: "post" }
    );
    const M = ka() ?? "dc-query-panel", $ = W(null);
    function E() {
      l.value && (l.value = !1, At(() => {
        $.value?.$el?.querySelector(".dc-header__trigger")?.focus();
      }));
    }
    const L = g(() => new Set(o.value));
    function B(k) {
      const S = new Set(L.value);
      S.has(k.id) ? S.delete(k.id) : S.add(k.id), o.value = [...S], s("toggle-pin", k);
    }
    function I(k, S) {
      m.narrow(dl(a.schema, m.query.value, k), S?.key ?? null), s("drill", k, S);
    }
    const T = fl({
      ...m,
      schema: g(() => a.schema),
      entities: g(() => a.schema.entities),
      rows: b.rows,
      total: b.total,
      limit: g(() => a.limit),
      offset: b.offset,
      pageCount: b.pageCount,
      pending: b.pending,
      error: b.error,
      source: _,
      previewsPerType: g(() => a.previewsPerType),
      pinnable: g(() => a.pinnable === !0),
      isPinned: (k) => L.value.has(k.id),
      isPinnedId: (k) => L.value.has(k),
      togglePin: B,
      activate: (k) => s("activate", k),
      create: (k) => s("create", k),
      drill: I
    }), V = g(() => {
      if (!(!a.accent && !a.tokens))
        return { ...a.tokens, ...a.accent ? { "--dc-accent": a.accent } : {} };
    });
    return t({
      query: m.query,
      openPanel: () => {
        l.value = !0;
      },
      closePanel: E
    }), (k, S) => (v(), w("div", {
      class: "dc-shell",
      "data-dc-theme": e.theme,
      style: Ae(V.value)
    }, [
      y("div", {
        class: "dc-shell__head",
        "data-dc-width": e.matchWidth,
        "data-dc-align": e.matchWidth === "shrink" ? e.headAlign : void 0
      }, [
        ae(Da, {
          ref_key: "headerRef",
          ref: $,
          expanded: l.value,
          "panel-id": C(M),
          onToggle: S[0] || (S[0] = (Z) => l.value = !l.value)
        }, ta({ _: 2 }, [
          c.actions ? {
            name: "actions",
            fn: Ze(() => [
              Ke(k.$slots, "actions", {}, void 0, !0)
            ]),
            key: "0"
          } : void 0
        ]), 1032, ["expanded", "panel-id"]),
        l.value ? (v(), w(se, { key: 0 }, [
          y("div", {
            class: "dc-shell__scrim",
            onClick: E
          }),
          y("div", xi, [
            ae(Na, {
              "panel-id": C(M),
              views: e.views,
              onClose: E
            }, ta({ _: 2 }, [
              c["panel-section"] ? {
                name: "panel-section",
                fn: Ze(() => [
                  Ke(k.$slots, "panel-section", {}, void 0, !0)
                ]),
                key: "0"
              } : void 0
            ]), 1032, ["panel-id", "views"])
          ])
        ], 64)) : N("", !0)
      ], 8, $i),
      Ke(k.$slots, "results", {
        rows: C(T).rows.value,
        total: C(T).total.value,
        offset: C(T).offset.value,
        pageCount: C(T).pageCount.value,
        query: C(T).query.value,
        pending: C(T).pending.value
      }, () => [
        ae(Ua, { views: e.views }, null, 8, ["views"])
      ], !0)
    ], 12, ki));
  }
}), Ci = /* @__PURE__ */ ue(Mi, [["__scopeId", "data-v-737c7342"]]), Ct = (e) => e.separator !== !0 && e.heading !== !0 && e.disabled !== !0, Ei = ["aria-label"], Pi = ["role", "aria-label"], Si = ["data-dc-item"], Ai = {
  key: 0,
  class: "dc-menu__rule",
  role: "separator"
}, zi = ["role", "aria-checked", "aria-haspopup", "aria-expanded", "aria-disabled", "disabled", "data-dc-item", "onClick", "onMouseenter"], Ri = {
  class: "dc-menu__mark",
  "aria-hidden": "true"
}, Ti = { class: "dc-menu__label dc-truncate" }, Fi = {
  key: 0,
  class: "dc-menu__key dc-mono"
}, Li = {
  key: 1,
  class: "dc-menu__more",
  "aria-hidden": "true"
}, Di = /* @__PURE__ */ ce({
  __name: "MenuList",
  props: {
    items: {},
    at: {},
    label: {},
    autofocus: { type: Boolean }
  },
  emits: ["choose", "dismiss"],
  setup(e, { expose: t, emit: n }) {
    const a = e, s = n, l = W(null), o = W([]), c = W(null), r = W(null), f = W(null), d = W(!1), h = g(
      () => a.items.flatMap((k, S) => Ct(k) ? [S] : [])
    ), _ = g(() => {
      const k = [{ entries: [] }];
      return a.items.forEach((S, Z) => {
        S.heading ? k.push({ heading: S, entries: [] }) : k[k.length - 1]?.entries.push({ item: S, index: Z });
      }), k.filter((S) => S.entries.length > 0);
    }), m = W({ x: a.at.x, y: a.at.y });
    async function b() {
      m.value = { x: a.at.x, y: a.at.y }, await At();
      const k = l.value?.getBoundingClientRect();
      if (!k) return;
      const S = 8;
      let Z = a.at.x, oe = a.at.y;
      if (Z + k.width > window.innerWidth - S) {
        const pe = a.at.mirrorX === void 0 ? null : a.at.mirrorX - k.width;
        Z = pe !== null && pe >= S ? pe : window.innerWidth - k.width - S;
      }
      oe + k.height > window.innerHeight - S && (oe = window.innerHeight - k.height - S), m.value = { x: Math.max(S, Z), y: Math.max(S, oe) };
    }
    const M = g(() => ({ left: `${m.value.x}px`, top: `${m.value.y}px` }));
    function $(k) {
      c.value = k, k !== null && At(() => o.value[k]?.focus());
    }
    function E(k, S) {
      const Z = h.value;
      if (Z.length === 0) return null;
      if (k === null) return S === 1 ? Z[0] ?? null : Z[Z.length - 1] ?? null;
      const oe = Z.indexOf(k);
      return oe === -1 ? Z[0] ?? null : Z[(oe + S + Z.length) % Z.length] ?? null;
    }
    function L(k, S) {
      if (!a.items[k]?.items?.length) return;
      const oe = o.value[k]?.getBoundingClientRect(), pe = l.value?.getBoundingClientRect();
      !oe || !pe || (f.value = { x: pe.right - 4, y: oe.top - 4, mirrorX: pe.left + 4 }, r.value = k, d.value = S);
    }
    function B(k) {
      const S = r.value;
      r.value = null, f.value = null, k && S !== null && $(S);
    }
    function I(k) {
      const S = a.items[k];
      if (!(!S || !Ct(S))) {
        if (S.items?.length) {
          L(k, !0);
          return;
        }
        s("choose", S);
      }
    }
    function T(k) {
      const S = k.key;
      if (S === "Escape") {
        k.preventDefault(), k.stopPropagation(), r.value !== null ? B(!0) : s("dismiss");
        return;
      }
      if (S === "ArrowDown" || S === "ArrowUp") {
        k.preventDefault(), k.stopPropagation(), B(!1), $(E(c.value, S === "ArrowDown" ? 1 : -1));
        return;
      }
      if (S === "Home" || S === "End") {
        k.preventDefault(), k.stopPropagation(), B(!1), $(E(null, S === "Home" ? 1 : -1));
        return;
      }
      if (S === "ArrowRight") {
        const Z = c.value;
        Z !== null && a.items[Z]?.items?.length && (k.preventDefault(), k.stopPropagation(), L(Z, !0));
        return;
      }
      if (S === "ArrowLeft") {
        r.value !== null && (k.preventDefault(), k.stopPropagation(), B(!0));
        return;
      }
      if (S === "Enter" || S === " ") {
        const Z = c.value;
        if (Z === null) return;
        k.preventDefault(), k.stopPropagation(), I(Z);
      }
    }
    function V(k) {
      const S = a.items[k];
      !S || !Ct(S) || (r.value !== null && r.value !== k && B(!1), $(k), S.items?.length && L(k, !1));
    }
    return Ss(() => {
      b(), a.autofocus && $(E(null, 1));
    }), Me(() => a.at, b, { deep: !0 }), Me(() => a.items, () => void b(), { deep: !0 }), Je(() => {
      r.value = null;
    }), t({ root: l }), (k, S) => {
      const Z = $a("MenuList", !0);
      return v(), w("div", {
        ref_key: "root",
        ref: l,
        class: "dc-menu",
        role: "menu",
        "aria-label": e.label,
        style: Ae(M.value),
        onKeydown: T
      }, [
        (v(!0), w(se, null, fe(_.value, (oe, pe) => (v(), w("div", {
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
          }, A(oe.heading.label), 9, Si)) : N("", !0),
          (v(!0), w(se, null, fe(oe.entries, ({ item: Y, index: Ce }) => (v(), w(se, {
            key: Y.id ?? `${Ce}-${Y.label ?? ""}`
          }, [
            Y.separator ? (v(), w("div", Ai)) : (v(), w("button", {
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
              onClick: (ze) => I(Ce),
              onMouseenter: (ze) => V(Ce)
            }, [
              y("span", Ri, A(Y.checked ? "✓" : ""), 1),
              y("span", Ti, A(Y.label), 1),
              Y.shortcut ? (v(), w("span", Fi, A(Y.shortcut), 1)) : Y.items?.length ? (v(), w("span", Li, "›")) : N("", !0)
            ], 40, zi))
          ], 64))), 128))
        ], 8, Pi))), 128)),
        r.value !== null && f.value ? (v(), me(Z, {
          key: r.value,
          items: e.items[r.value]?.items ?? [],
          at: f.value,
          label: e.items[r.value]?.label,
          autofocus: d.value,
          onChoose: S[0] || (S[0] = (oe) => s("choose", oe)),
          onDismiss: S[1] || (S[1] = (oe) => B(!0))
        }, null, 8, ["items", "at", "label", "autofocus"])) : N("", !0)
      ], 44, Ei);
    };
  }
}), Ga = /* @__PURE__ */ ue(Di, [["__scopeId", "data-v-9b1413fa"]]), Ii = ["data-dc-theme", "aria-label"], Ni = ["aria-expanded", "aria-disabled", "disabled", "data-dc-menu", "tabindex", "onClick", "onMouseenter"], Vi = /* @__PURE__ */ ce({
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
    const n = e, a = g(() => {
      if (!(!n.accent && !n.tokens))
        return { ...n.tokens, ...n.accent ? { "--dc-accent": n.accent } : {} };
    }), s = t, l = W(null), o = W([]), c = W(null), r = W(null), f = W(!1), d = g(
      () => n.menus.flatMap((I, T) => Ct(I) ? [T] : [])
    );
    function h(I, T) {
      const V = o.value[I]?.getBoundingClientRect(), k = n.menus[I];
      !V || !k || !Ct(k) || (r.value = { x: V.left, y: V.bottom + 2, mirrorX: V.right }, c.value = I, f.value = T);
    }
    function _(I) {
      const T = c.value;
      c.value = null, r.value = null, I && T !== null && o.value[T]?.focus();
    }
    function m(I) {
      c.value === I ? _(!0) : h(I, !1);
    }
    function b(I) {
      c.value === null || c.value === I || h(I, !1);
    }
    function M(I, T) {
      const V = d.value;
      if (V.length === 0) return null;
      if (I === null) return T === 1 ? V[0] ?? null : V[V.length - 1] ?? null;
      const k = V.indexOf(I);
      return k === -1 ? V[0] ?? null : V[(k + T + V.length) % V.length] ?? null;
    }
    function $(I) {
      const T = I.key;
      if (T === "Escape") {
        if (c.value === null) return;
        I.preventDefault(), _(!0);
        return;
      }
      if (T === "ArrowDown" && c.value === null) {
        const S = E();
        if (S === null) return;
        I.preventDefault(), h(S, !0);
        return;
      }
      if (T !== "ArrowLeft" && T !== "ArrowRight") return;
      const V = c.value ?? E(), k = M(V, T === "ArrowRight" ? 1 : -1);
      k !== null && (I.preventDefault(), c.value !== null ? h(k, !0) : o.value[k]?.focus());
    }
    function E() {
      const I = o.value.findIndex((T) => T === document.activeElement);
      return I === -1 ? d.value[0] ?? null : I;
    }
    function L(I) {
      const T = I.target;
      !T || l.value?.contains(T) || _(!1);
    }
    Me(c, (I) => {
      I !== null ? window.addEventListener("pointerdown", L, !0) : window.removeEventListener("pointerdown", L, !0);
    }), Je(() => window.removeEventListener("pointerdown", L, !0));
    function B(I) {
      _(!0), I.action?.(), s("choose", I);
    }
    return (I, T) => (v(), w("div", {
      ref_key: "bar",
      ref: l,
      class: "dc-shell dc-menubar",
      role: "menubar",
      "data-dc-theme": e.theme,
      "aria-label": e.label ?? "Main menu",
      style: Ae(a.value),
      onKeydown: $
    }, [
      (v(!0), w(se, null, fe(e.menus, (V, k) => (v(), w("button", {
        key: V.id ?? V.label ?? k,
        ref_for: !0,
        ref: (S) => {
          S && (o.value[k] = S);
        },
        type: "button",
        class: "dc-menubar__item",
        role: "menuitem",
        "aria-haspopup": "menu",
        "aria-expanded": c.value === k,
        "aria-disabled": V.disabled ? "true" : void 0,
        disabled: V.disabled,
        "data-dc-menu": V.id ?? V.label,
        tabindex: k === (d.value[0] ?? 0) ? 0 : -1,
        onClick: (S) => m(k),
        onMouseenter: (S) => b(k)
      }, A(V.label), 41, Ni))), 128)),
      c.value !== null && r.value ? (v(), me(Ga, {
        key: c.value,
        items: e.menus[c.value]?.items ?? [],
        at: r.value,
        label: e.menus[c.value]?.label,
        autofocus: f.value,
        onChoose: B,
        onDismiss: T[0] || (T[0] = (V) => _(!0))
      }, null, 8, ["items", "at", "label", "autofocus"])) : N("", !0)
    ], 44, Ii));
  }
}), du = /* @__PURE__ */ ue(Vi, [["__scopeId", "data-v-93dbd2e4"]]), Oi = ["aria-label", "aria-expanded", "disabled"], Ki = { "aria-hidden": "true" }, qi = /* @__PURE__ */ ce({
  __name: "MenuButton",
  props: {
    items: {},
    label: {},
    glyph: { default: "⋯" }
  },
  emits: ["choose"],
  setup(e, { emit: t }) {
    const n = t, a = W(null), s = W(null), l = W(null), o = W(!1), c = g(() => l.value !== null);
    function r(b) {
      const M = a.value?.getBoundingClientRect();
      M && (l.value = { x: M.left, y: M.bottom + 4, mirrorX: M.right }, o.value = b);
    }
    function f(b) {
      l.value = null, b && a.value?.focus();
    }
    function d() {
      c.value ? f(!0) : r(!1);
    }
    function h(b) {
      b.key !== "ArrowDown" || c.value || (b.preventDefault(), r(!0));
    }
    function _(b) {
      const M = b.target;
      M && (a.value?.contains(M) || s.value?.root?.contains(M) || f(!1));
    }
    Me(c, (b) => {
      b ? window.addEventListener("pointerdown", _, !0) : window.removeEventListener("pointerdown", _, !0);
    }), Je(() => window.removeEventListener("pointerdown", _, !0));
    function m(b) {
      f(!0), b.action?.(), n("choose", b);
    }
    return (b, M) => (v(), w(se, null, [
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
        y("span", Ki, A(e.glyph), 1)
      ], 40, Oi),
      l.value ? (v(), me(Ga, {
        key: 0,
        ref_key: "menu",
        ref: s,
        items: e.items,
        at: l.value,
        label: e.label,
        autofocus: o.value,
        onChoose: m,
        onDismiss: M[0] || (M[0] = ($) => f(!0))
      }, null, 8, ["items", "at", "label", "autofocus"])) : N("", !0)
    ], 64));
  }
}), Fn = /* @__PURE__ */ ue(qi, [["__scopeId", "data-v-48f5ada5"]]), yt = (e) => e.kind === "split", K = (e) => e.kind === "group", G = (e) => e.kind === "float", st = { x: 16, y: 16, w: 360, h: 260 }, Yt = 28, Xa = 120, hn = 220, ja = 38, ut = 6;
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
function fu(e, t, n) {
  return {
    kind: "group",
    panels: e,
    ...t ? { active: t } : {},
    ...n ? { title: n } : {}
  };
}
const ie = (e) => typeof e == "string", Ln = (e) => ie(e) ? Fe(e) : e, Ft = (e) => ie(e) ? [e] : We(e), fa = (e) => e.panels.filter(ie), Bi = (e) => e.panels.filter((t) => !ie(t)), Se = (e, t) => e.panels.includes(t);
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
const Vn = (e, t, n) => Nn("row", e, t, n), pu = (e, t, n) => Nn("column", e, t, n);
function he(e) {
  return {
    ...e.title ? { title: e.title } : {},
    ...e.fixedView ? { fixedView: !0 } : {},
    ...e.headless ? { headless: !0 } : {}
  };
}
const it = (e) => e.fixedView === !0 || e.headless === !0 || !!e.title, vu = (e) => ({ ...e, headless: !0 }), mu = (e) => ({ ...e, fixedView: !0 }), Wi = (e) => e === "left" || e === "right" ? "row" : "column";
function We(e) {
  return K(e) ? e.panels.flatMap(Ft) : G(e) ? e.frames.flatMap((t) => We(t.node)) : e.children.flatMap(We);
}
function J(e, t) {
  return K(e) ? e.panels.some((n) => ie(n) ? n === t : J(n, t)) : G(e) ? e.frames.some((n) => J(n.node, t)) : e.children.some((n) => J(n, t));
}
const Ya = (e) => We(e).length === 0, _n = (e) => !K(e) && it(e), gn = (e) => Ya(e) && !_n(e);
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
function Qa(e) {
  const t = e.panels[ct(e)];
  return t !== void 0 && ie(t) ? t : "";
}
function ke(e) {
  if (ie(e)) return e;
  if (K(e)) {
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
  if (K(e) && Se(e, t)) return e;
  for (const n of On(e)) {
    const a = ft(n, t);
    if (a) return a;
  }
  return null;
}
function Hi(e) {
  const t = On(e).flatMap(Hi);
  return K(e) ? [e, ...t] : t;
}
function ge(e, t) {
  if (K(e)) {
    for (const n of Bi(e)) {
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
function sn(e, t, n = Xa) {
  const a = (c, r) => r > 0 ? Math.max(Math.min(c, r), Math.min(n, r)) : Math.max(c, n), s = a(e.w, t.w), l = a(e.h, t.h), o = (c, r, f) => Math.min(Math.max(c, 0), Math.max(f - r, 0));
  return {
    x: Math.round(o(e.x, s, t.w)),
    y: Math.round(o(e.y, l, t.h)),
    w: Math.round(s),
    h: Math.round(l)
  };
}
function pa(e, t, n, a, s = Xa) {
  let { x: l, y: o, w: c, h: r } = e;
  return t.includes("e") && (c = e.w + n), t.includes("w") && (c = e.w - n, l = e.x + n), t.includes("s") && (r = e.h + a), t.includes("n") && (r = e.h - a, o = e.y + a), c < s && (t.includes("w") && (l = e.x + e.w - s), c = s), r < s && (t.includes("n") && (o = e.y + e.h - s), r = s), { x: l, y: o, w: c, h: r };
}
const Za = (e, t) => e.x === t.x && e.y === t.y && e.w === t.w && e.h === t.h;
function pt(e, t, n) {
  if (K(e)) return Lt(e, t, (l) => pt(l, t, n));
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
function Ui(e, t, n) {
  return pt(e, t, (a) => Za(a.rect, n) ? a : { ...a, rect: n });
}
const Ye = (e) => e.maximized === !0, Ja = (e) => (t) => {
  if (Ye(t) === e) return t;
  if (e) {
    const { minimized: s, ...l } = t;
    return { ...l, maximized: !0 };
  }
  const { maximized: n, ...a } = t;
  return a;
};
function Gi(e, t, n = !0) {
  return pt(e, t, Ja(n));
}
function hu(e, t) {
  const n = ge(e, t);
  return n ? Gi(e, t, !Ye(n)) : e;
}
const at = (e) => e.minimized === !0, es = (e) => (t) => {
  if (at(t) === e) return t;
  if (e) {
    const { maximized: s, ...l } = t;
    return { ...l, minimized: !0 };
  }
  const { minimized: n, ...a } = t;
  return a;
};
function Xi(e, t, n = !0) {
  return pt(e, t, es(n));
}
function _u(e, t) {
  const n = ge(e, t);
  return n ? Xi(e, t, !at(n)) : e;
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
    (a) => Za(a.rect, n) ? a : { ...a, rect: n }
  );
}
function ji(e, t, n = !0) {
  return Kn(e, t, Ja(n));
}
function Yi(e, t, n = !0) {
  return Kn(e, t, es(n));
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
function Qi(e, t) {
  const n = [...t];
  let a = e;
  return t.forEach((s, l) => {
    a && (G(a) && (n[l] = a.frames.length - 1), a = Qe(a, [s]));
  }), n;
}
function qt(e, t, n, a) {
  if (K(e)) return Lt(e, n, (o) => qt(o, t, n, a));
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
function Zi(e, t, n) {
  return G(e) ? { ...e, frames: [...e.frames, Zt(Fe(t), n)] } : K(e) ? ns(e, t) : {
    kind: "split",
    direction: e.direction,
    children: [...e.children, Fe(t)],
    sizes: [...Be(e), 1],
    ...he(e)
  };
}
function ts(e, t, n, a) {
  const s = n[0];
  if (s === void 0) return Zi(e, t, a);
  const l = n.slice(1), o = (d, h) => h === s ? ts(d, t, l, a) : lt(d, t);
  if (G(e)) {
    const d = e.frames.flatMap((h, _) => {
      const m = o(h.node, _);
      return m ? [m === h.node ? h : { ...h, node: m }] : [];
    });
    return { ...e, frames: d };
  }
  if (K(e)) {
    const d = ct(e), h = [];
    e.panels.forEach((b, M) => {
      if (ie(b)) {
        b !== t && h.push(b);
        return;
      }
      const $ = o(b, M);
      $ && h.push($);
    });
    const m = e.active && h.some((b) => Ft(b).includes(e.active)) ? e.active : ke(h[d] ?? h[h.length - 1]);
    return {
      kind: "group",
      panels: h,
      ...m ? { active: m } : {},
      ...he(e)
    };
  }
  const c = Be(e), r = [], f = [];
  return e.children.forEach((d, h) => {
    const _ = o(d, h);
    _ && (r.push(_), f.push(c[h] ?? 0));
  }), { kind: "split", direction: e.direction, children: r, sizes: f, ...he(e) };
}
function ha(e, t, n, a) {
  const s = Qe(e, n);
  return !s || !Ya(s) || !J(e, t) ? e : _e(ts(e, t, n, a));
}
function ln(e, t) {
  if (K(e)) return Lt(e, t, (s) => ln(s, t));
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
  const t = K(e) ? e.panels.length : e.children.length;
  return e.places?.length === t ? e.places : void 0;
};
function _e(e) {
  if (K(e)) return Ji(e);
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
      const _ = Be(f);
      f.children.forEach((m, b) => {
        a.push(m), s.push(d * (_[b] ?? 0));
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
function Ji(e) {
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
      if (K(d) && !it(d) && !Re(d)) {
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
  if (K(e)) {
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
function ns(e, t, n) {
  const a = e.panels.filter((l) => l !== t), s = n === void 0 ? a.length : Math.max(0, Math.min(n, a.length));
  return a.splice(s, 0, t), { kind: "group", panels: a, active: t, ...he(e) };
}
function xt(e, t, n, a, s) {
  const l = (m) => Tt(
    m,
    (b) => J(b, n) ? xt(b, t, n, a, s) : b
  );
  if (a === "float") return e;
  const o = (m) => Lt(m, n, (b) => xt(b, t, n, a, s));
  if (a === "center")
    return K(e) ? Se(e, n) ? ns(e, t, s) : o(e) : G(e) ? l(e) : {
      ...e,
      children: e.children.map(
        (m) => J(m, n) ? xt(m, t, n, a, s) : m
      )
    };
  const c = Wi(a), r = a === "left" || a === "top", f = (m) => ({
    kind: "split",
    direction: c,
    children: r ? [Fe(t), m] : [m, Fe(t)],
    sizes: [0.5, 0.5]
  });
  if (K(e)) return Se(e, n) ? f(e) : o(e);
  if (G(e)) return l(e);
  const d = Be(e), h = e.children.findIndex(
    (m) => K(m) && Se(m, n)
  );
  if (h >= 0 && e.direction === c) {
    const m = (d[h] ?? 0) / 2, b = [...e.children], M = [...d];
    return b.splice(r ? h : h + 1, 0, Fe(t)), M.splice(h, 1, m, m), {
      kind: "split",
      direction: c,
      children: b,
      sizes: M,
      ...he(e)
    };
  }
  const _ = e.children.map((m) => J(m, n) ? K(m) && Se(m, n) ? f(m) : xt(m, t, n, a) : m);
  return {
    kind: "split",
    direction: e.direction,
    children: _,
    sizes: d,
    ...he(e)
  };
}
function vt(e, t) {
  if (K(e)) {
    if (Se(e, t))
      return Qa(e) === t ? e : { ...e, active: t };
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
  if (K(e)) {
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
  if (K(e)) {
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
function as(e, t, n) {
  if (K(e)) {
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
  if (!K(e) && a.some(({ node: s }) => K(s) && Se(s, t))) {
    const s = n(e);
    return s === e ? null : s;
  }
  for (const { node: s, index: l } of a) {
    if (!J(s, t)) continue;
    const o = Dt(s, t, n);
    return o ? as(e, l, o) : null;
  }
  return null;
}
function gu(e, t, n) {
  const a = Dt(
    e,
    t,
    (s) => yt(s) && s.direction !== n ? { ...s, direction: n } : s
  );
  return a ? _e(a) : e;
}
function ss(e) {
  return G(e) ? [e] : Re(e) || it(e) ? [e] : K(e) ? [...e.panels] : e.children.flatMap(ss);
}
function ls(e, t) {
  if (K(e)) return e;
  const n = On(e).map(ss), a = n.flat(), s = t && a.some((o) => Ft(o).includes(t)) ? t : void 0, l = ec(e, n);
  return _e({
    kind: "group",
    panels: a,
    ...s ? { active: s } : {},
    ...he(e),
    ...l ? { places: l } : {}
  });
}
function ec(e, t) {
  const n = G(e) ? e.frames.map(({ node: a, ...s }) => s) : Re(e);
  if (n)
    return t.every((a) => a.length === 1) ? n : void 0;
}
function tc(e, t) {
  const n = Dt(e, t, (a) => ls(a, t));
  return n ? _e(n) : e;
}
function Bn(e, t, n) {
  if (K(e) && Se(e, t)) {
    const a = n(e);
    return a === e ? null : a;
  }
  for (const { node: a, index: s } of Jt(e)) {
    if (!J(a, t)) continue;
    const l = Bn(a, t, n);
    return l ? as(e, s, l) : null;
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
  if (K(e)) return e;
  if (G(e)) {
    const s = e.frames.findIndex(
      (c) => K(c.node) && c.node.panels.includes(t)
    ), l = e.frames[s], o = l && K(l.node) ? l.node : null;
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
function nc(e, t, n) {
  const a = ft(e, t);
  if (!a || a.panels.length < 2) return e;
  if (ge(e, t)?.node === a) {
    const o = wn(e, t);
    return o === e ? e : _e(o);
  }
  const l = Bn(e, t, (o) => ({
    ...Dn(rs(o.panels.map(Ln), Re(o), n)),
    ...he(o)
  }));
  return l ? _e(l) : e;
}
function rs(e, t, n) {
  return t ? e.map((a, s) => ({ ...t[s], node: a })) : In(e, n).frames;
}
function os(e, t) {
  return { ...Dn(rs(e.children, Re(e), t)), ...he(e) };
}
function yu(e, t, n) {
  const a = Dt(
    e,
    t,
    (s) => G(s) ? s : os(s, n)
  );
  return a ? _e(a) : K(e) && Se(e, t) ? In([e], n) : e;
}
function ac(e, t) {
  const n = (s) => t === "column" ? s.rect.y : s.rect.x, a = (s) => t === "column" ? s.rect.x : s.rect.y;
  return [...e].sort((s, l) => n(s) - n(l) || a(s) - a(l));
}
function is(e, t) {
  const n = ac(e.frames, t);
  return {
    kind: "split",
    direction: t,
    children: n.map((a) => a.node),
    ...he(e),
    places: n.map(({ node: a, ...s }) => s)
  };
}
function wu(e, t, n = "row") {
  const a = Dt(
    e,
    t,
    (s) => G(s) ? is(s, n) : s
  );
  return a ? _e(a) : e;
}
function cs(e) {
  if (G(e)) return null;
  const t = K(e) ? e.panels.length === 1 ? e.panels[0] : void 0 : e.children.length === 1 ? e.children[0] : void 0;
  return t === void 0 || ie(t) || K(t) && t.panels.length === 1 && ie(t.panels[0]) ? null : t;
}
const sc = (e) => {
  const { title: t, fixedView: n, headless: a, ...s } = e;
  return s;
};
function lc(e, t) {
  const n = cs(e);
  return n ? t === "inner" ? n : { ...sc(n), ...he(e) } : e;
}
function _t(e) {
  return e.title ? e.title : K(e) ? "" : G(e) ? "Desktop" : e.direction === "row" ? "Row" : "Column";
}
function St(e, t) {
  if (K(e)) {
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
  if (K(e)) {
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
  if (K(e)) {
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
  if (!K(e) || e.panels.length >= 2) return e;
  const t = e.panels[0];
  return t !== void 0 && !ie(t) ? e : { ...Vn([rc(e)]), ...he(e) };
}
const rc = (e) => {
  if (!e.title) return e;
  const { title: t, ...n } = e;
  return n;
};
function ya(e) {
  return e.length === 0 ? null : Vn(e.map(Fe));
}
function oc(e, t) {
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
function ic(e) {
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
const cc = ["data-dc-glyph"], uc = { class: "dc-glyph__line" }, dc = ["d"], fc = {
  key: 0,
  class: "dc-glyph__aqua"
}, pc = ["d"], vc = /* @__PURE__ */ ce({
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
      y("g", uc, [
        (v(!0), w(se, null, fe(t[e.kind], (l) => (v(), w("path", {
          key: l,
          d: l
        }, null, 8, dc))), 128))
      ]),
      n[e.kind] ? (v(), w("g", fc, [
        (v(!0), w(se, null, fe(n[e.kind], (l) => (v(), w("path", {
          key: l,
          d: l
        }, null, 8, pc))), 128))
      ])) : N("", !0)
    ], 8, cc));
  }
}), mt = /* @__PURE__ */ ue(vc, [["__scopeId", "data-v-4d2872c0"]]), mc = ["data-dc-order", "data-dc-path", "data-dc-maximized", "data-dc-minimized", "data-dc-dragging"], hc = ["data-dc-movable"], _c = { class: "dc-float__title dc-truncate" }, gc = {
  key: 1,
  class: "dc-float__controls dc-controls"
}, yc = ["aria-label", "aria-pressed", "data-dc-minimize"], wc = ["aria-label", "aria-pressed", "data-dc-maximize"], bc = ["aria-label", "data-dc-close"], kc = { class: "dc-float__content" }, $c = ["data-dc-handle", "onPointerdown"], xc = /* @__PURE__ */ ce({
  __name: "WindowFloat",
  props: {
    frame: {},
    path: {},
    order: {},
    place: {}
  },
  setup(e) {
    const t = e, n = Hn(), a = g(() => ke(t.frame.node)), s = g(() => n.panelFor(a.value)?.fixed === !0), l = g(() => Ye(t.frame)), o = g(() => at(t.frame)), c = g(() => l.value || o.value), r = g(() => n.resizable.value && !s.value && !c.value), f = g(() => n.movable.value && !s.value && !c.value), d = g(() => {
      const T = We(t.frame.node);
      return T.length === 1 ? T[0] ?? null : null;
    }), h = g(() => d.value !== null && n.closable(d.value)), _ = g(() => t.frame.node.headless === !0), m = g(
      () => !_.value && (!K(t.frame.node) || o.value)
    ), b = g(
      () => t.frame.title || _t(t.frame.node) || St(t.frame.node, (T) => n.panelFor(T)?.title)
    ), M = g(() => n.spaceMenu(t.path));
    function $(T) {
      T.target?.closest("button, a, input, select, textarea, label") || n.beginFrameDragAt(t.path, T, "move");
    }
    function E(T) {
      T.target?.closest("button, a, input, select, textarea, label") || (o.value ? n.toggleMinimizeAt(t.path) : n.toggleMaximizeAt(t.path));
    }
    const L = g(() => {
      const T = n.framing.value;
      return T !== null && J(t.frame.node, T);
    }), B = g(() => ({
      // Neither maximizing nor rolling up overwrites the rect: it is where the
      // window goes back to, and both are a way of not being there for a while.
      ...l.value ? { inset: "0" } : o.value && t.place ? {
        left: `${t.place.x}px`,
        bottom: `${t.place.bottom}px`,
        width: `${hn}px`,
        height: `${ja}px`
      } : {
        left: `${t.frame.rect.x}px`,
        top: `${t.frame.rect.y}px`,
        width: `${t.frame.rect.w}px`,
        height: `${t.frame.rect.h}px`
      },
      // Back to front. The DOM order says the same thing, but a frame that paints
      // a shadow over its neighbour should not depend on that being noticed.
      zIndex: t.order + 1
    })), I = ["n", "s", "e", "w", "nw", "ne", "sw", "se"];
    return (T, V) => (v(), w("div", {
      class: "dc-float",
      style: Ae(B.value),
      "data-dc-order": e.order,
      "data-dc-path": e.path.join("/"),
      "data-dc-maximized": l.value ? "true" : "false",
      "data-dc-minimized": o.value ? "true" : "false",
      "data-dc-dragging": L.value ? "true" : "false",
      onPointerdown: V[3] || (V[3] = (k) => C(n).raiseAt(e.path))
    }, [
      m.value ? (v(), w("header", {
        key: 0,
        class: "dc-float__bar",
        "data-dc-movable": f.value ? "true" : "false",
        onPointerdown: $,
        onDblclick: E
      }, [
        y("span", _c, A(b.value), 1),
        M.value.length ? (v(), me(Fn, {
          key: 0,
          items: M.value,
          label: `${b.value} menu`
        }, null, 8, ["items", "label"])) : N("", !0),
        !s.value || o.value && h.value && d.value ? (v(), w("div", gc, [
          s.value ? N("", !0) : (v(), w("button", {
            key: 0,
            type: "button",
            class: "dc-float__button dc-control",
            "aria-label": `${o.value ? "Unroll" : "Minimize"} ${b.value}`,
            "aria-pressed": o.value,
            "data-dc-minimize": a.value,
            onClick: V[0] || (V[0] = (k) => C(n).toggleMinimizeAt(e.path))
          }, [
            ae(mt, {
              kind: o.value ? "unroll" : "minimize"
            }, null, 8, ["kind"])
          ], 8, yc)),
          s.value ? N("", !0) : (v(), w("button", {
            key: 1,
            type: "button",
            class: "dc-float__button dc-control",
            "aria-label": `${l.value ? "Restore" : "Maximize"} ${b.value}`,
            "aria-pressed": l.value,
            "data-dc-maximize": a.value,
            onClick: V[1] || (V[1] = (k) => C(n).toggleMaximizeAt(e.path))
          }, [
            ae(mt, {
              kind: l.value ? "restore" : "maximize"
            }, null, 8, ["kind"])
          ], 8, wc)),
          o.value && h.value && d.value ? (v(), w("button", {
            key: 2,
            type: "button",
            class: "dc-float__button dc-control",
            "aria-label": `Close ${b.value}`,
            "data-dc-close": d.value,
            onClick: V[2] || (V[2] = (k) => C(n).close(d.value))
          }, [
            ae(mt, { kind: "close" })
          ], 8, bc)) : N("", !0)
        ])) : N("", !0)
      ], 40, hc)) : N("", !0),
      y("div", kc, [
        Ke(T.$slots, "default", {}, void 0, !0)
      ]),
      (v(!0), w(se, null, fe(r.value ? I : [], (k) => (v(), w("span", {
        key: k,
        class: "dc-float__grip",
        "data-dc-handle": k,
        "aria-hidden": "true",
        onPointerdown: Oe((S) => C(n).beginFrameDragAt(e.path, S, k), ["stop"])
      }, null, 40, $c))), 128))
    ], 44, mc));
  }
}), Mc = /* @__PURE__ */ ue(xc, [["__scopeId", "data-v-f035684c"]]), Un = Symbol("dc.paneContext");
function Cc(e) {
  return bn(Un, e), e;
}
function bu() {
  return ht(Un, null);
}
function ku(e) {
  const t = ht(Wn, null), n = ht(Un, null);
  if (!t || !n) return () => {
  };
  const a = t.registerMenu(
    () => n.panel.value,
    () => $t(e)
  );
  return As() && zs(a), a;
}
const Ec = ["data-dc-panel", "data-dc-panels", "data-dc-tabbed", "data-dc-floating", "data-dc-maximized", "data-dc-headless", "data-dc-active", "data-dc-dragging", "aria-label"], Pc = ["data-dc-movable"], Sc = ["aria-label", "aria-pressed"], Ac = ["data-dc-space-name"], zc = { class: "dc-truncate" }, Rc = ["aria-label"], Tc = {
  key: 0,
  class: "dc-pane__insert",
  "aria-hidden": "true"
}, Fc = ["id", "data-dc-panel", "data-dc-space", "aria-selected", "aria-controls", "tabindex", "onPointerdown", "onClick", "onKeydown"], Lc = { class: "dc-tab__name dc-truncate" }, Dc = {
  key: 0,
  class: "dc-pane__sub dc-mono dc-truncate"
}, Ic = ["aria-label", "data-dc-close", "onClick"], Nc = {
  key: 0,
  class: "dc-pane__insert",
  "aria-hidden": "true"
}, Vc = { class: "dc-pane__tools" }, Oc = {
  key: 2,
  class: "dc-pane__controls dc-controls"
}, Kc = ["aria-label", "data-dc-minimize"], qc = ["aria-label", "aria-pressed", "data-dc-maximize"], Bc = ["aria-label", "data-dc-close"], Wc = ["id", "role", "aria-labelledby"], Hc = ["id", "role", "aria-labelledby"], Uc = ["data-dc-edge"], Gc = /* @__PURE__ */ ce({
  __name: "WindowPane",
  props: {
    group: {},
    path: {}
  },
  setup(e) {
    const t = e, n = Hn(), a = ka() ?? "dc-pane", s = g(
      () => t.group.panels.flatMap((R, O) => {
        if (!ie(R)) {
          const $e = _t(R) || St(R, (we) => n.panelFor(we)?.title);
          return [{ kind: "space", index: O, id: `space-${O}`, title: $e, node: R }];
        }
        const j = n.panelFor(R);
        return j ? [{ kind: "panel", index: O, id: R, title: j.title, panel: j }] : [];
      })
    ), l = g(() => s.value.length > 1), o = g(() => {
      const R = ct(t.group);
      return s.value.find((O) => O.index === R) ?? s.value[0] ?? null;
    }), c = g(() => o.value?.kind === "space" ? o.value.node : null), r = g(() => c.value ? "" : Qa(t.group)), f = g(() => c.value ? null : n.panelFor(r.value)), d = g(() => o.value?.title ?? ""), h = g(() => n.spaceNames.value ? t.group.title ?? "" : ""), _ = g(() => [...t.path, o.value?.index ?? 0]), m = g(() => r.value || fa(t.group)[0] || ""), b = g(() => n.viewFor(r.value)), M = g(() => t.group.headless === !0), $ = g(() => n.focused.value === r.value), E = g(() => n.dragging.value === r.value), L = g(() => n.moving.value === r.value), B = g(() => n.frameOf(m.value) !== null), I = g(() => n.panelFor(m.value)?.fixed === !0), T = g(
      () => !c.value && (n.canMove(r.value) || B.value && n.movable.value && !I.value)
    ), V = g(
      () => c.value ? n.spaceMenu(_.value) : n.menuFor(r.value)
    ), k = (R) => n.closable(R);
    Cc({ panel: r });
    const S = g(() => n.maximized(m.value)), Z = g(
      () => B.value && !I.value || !l.value && !!f.value && k(f.value.id)
    ), oe = (R) => `${a}-tab-${R}`, pe = g(() => `${a}-body`), Y = g(() => {
      const R = n.dropTarget.value;
      return !R || !Se(t.group, R.panel) || R.edge === "float" ? null : R;
    }), Ce = g(() => Y.value?.index === void 0 ? Y.value?.edge ?? null : null), ze = g(() => Y.value?.index ?? null), F = () => f.value ? n.renderContent(f.value, b.value, $.value) ?? null : null, X = () => f.value ? n.renderActions(f.value, b.value, $.value) ?? null : null;
    let ee = null;
    function te(R) {
      const O = ee !== null && Math.hypot(R.clientX - ee.x, R.clientY - ee.y) >= 4;
      return ee = null, O;
    }
    const ve = (R) => R.kind === "panel" ? R.id : ke(R.node);
    function Ee(R, O) {
      O.kind !== "space" && (n.focus(O.id), ee = { x: R.clientX, y: R.clientY }, n.beginDrag(O.id, R));
    }
    function He(R, O) {
      if (te(R)) return;
      const j = ve(O);
      j && n.selectPanel(j);
    }
    function Ue(R) {
      r.value && n.focus(r.value), !R.target?.closest(".dc-tab, button, a, input, select, textarea, label") && (B.value ? n.beginFrameDrag(m.value, R, "move") : n.beginDrag(r.value, R));
    }
    function Ge(R) {
      ee = { x: R.clientX, y: R.clientY }, n.beginDrag(r.value, R);
    }
    function Xe(R) {
      te(R) || n.toggleMoveMode(r.value);
    }
    const Le = {
      ArrowLeft: "left",
      ArrowRight: "right",
      ArrowUp: "up",
      ArrowDown: "down"
    };
    function De(R) {
      if (!L.value) return;
      if (R.key === "Escape") {
        R.preventDefault(), n.toggleMoveMode(r.value);
        return;
      }
      const O = Le[R.key];
      O && (R.preventDefault(), B.value ? n.nudgeFrame(r.value, O, R.shiftKey) : n.nudge(r.value, O, R.shiftKey));
    }
    function Ie(R) {
      !B.value || R.target?.closest(".dc-tab, button, a, input, select, textarea, label") || n.toggleMaximize(m.value);
    }
    function wt(R, O) {
      R.stopPropagation(), ee = null, n.close(O);
    }
    function It(R, O) {
      const j = s.value.length;
      let $e = null;
      if (R.key === "ArrowRight" ? $e = (O + 1) % j : R.key === "ArrowLeft" ? $e = (O - 1 + j) % j : R.key === "Home" ? $e = 0 : R.key === "End" && ($e = j - 1), $e === null) return;
      R.preventDefault();
      const we = s.value[$e];
      if (!we) return;
      const bt = ve(we);
      bt && n.selectPanel(bt);
    }
    return (R, O) => o.value ? (v(), w("section", {
      key: 0,
      class: "dc-pane",
      "data-dc-panel": r.value || void 0,
      "data-dc-panels": C(fa)(e.group).join(" ") || void 0,
      "data-dc-tabbed": l.value ? "true" : "false",
      "data-dc-floating": B.value ? "true" : "false",
      "data-dc-maximized": S.value ? "true" : "false",
      "data-dc-headless": M.value ? "true" : "false",
      "data-dc-active": $.value ? "true" : "false",
      "data-dc-dragging": E.value ? "true" : "false",
      "aria-label": d.value,
      onFocusin: O[7] || (O[7] = (j) => r.value && C(n).focus(r.value))
    }, [
      M.value ? N("", !0) : (v(), w("header", {
        key: 0,
        class: "dc-pane__head",
        "data-dc-movable": T.value ? "true" : "false",
        onPointerdown: Ue,
        onDblclick: Ie
      }, [
        T.value ? (v(), w("button", {
          key: 0,
          type: "button",
          class: "dc-pane__grip",
          "aria-label": `Move ${d.value}`,
          "aria-pressed": L.value,
          onPointerdown: Ge,
          onClick: Xe,
          onKeydown: De
        }, [...O[8] || (O[8] = [
          y("span", { "aria-hidden": "true" }, "⠿", -1)
        ])], 40, Sc)) : N("", !0),
        h.value ? (v(), w("span", {
          key: 1,
          class: "dc-pane__name",
          "data-dc-space-name": h.value
        }, [
          y("span", zc, A(h.value), 1)
        ], 8, Ac)) : N("", !0),
        y("div", {
          class: "dc-pane__tabs",
          role: "tablist",
          "aria-label": `${d.value} panels`
        }, [
          (v(!0), w(se, null, fe(s.value, (j, $e) => (v(), w(se, {
            key: j.id
          }, [
            ze.value === $e ? (v(), w("span", Tc)) : N("", !0),
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
              y("span", Lc, A(j.title), 1),
              j.kind === "panel" && j.panel.subtitle ? (v(), w("span", Dc, A(j.panel.subtitle), 1)) : N("", !0),
              l.value && j.kind === "panel" && k(j.id) ? (v(), w("span", {
                key: 1,
                class: "dc-tab__close",
                role: "button",
                tabindex: "-1",
                "aria-label": `Close ${j.title}`,
                "data-dc-close": j.id,
                onPointerdown: O[0] || (O[0] = Oe(() => {
                }, ["stop"])),
                onClick: (we) => wt(we, j.id)
              }, [...O[9] || (O[9] = [
                y("span", { "aria-hidden": "true" }, "×", -1)
              ])], 40, Ic)) : N("", !0)
            ], 40, Fc)
          ], 64))), 128)),
          ze.value === s.value.length ? (v(), w("span", Nc)) : N("", !0)
        ], 8, Rc),
        y("div", Vc, [
          ae(X),
          V.value.length ? (v(), me(Fn, {
            key: 0,
            items: V.value,
            label: `${d.value} menu`
          }, null, 8, ["items", "label"])) : N("", !0)
        ]),
        Z.value ? (v(), w("div", Oc, [
          B.value && !I.value ? (v(), w("button", {
            key: 0,
            type: "button",
            class: "dc-pane__button dc-control",
            "aria-label": `Minimize ${d.value}`,
            "data-dc-minimize": m.value,
            onPointerdown: O[1] || (O[1] = Oe(() => {
            }, ["stop"])),
            onClick: O[2] || (O[2] = (j) => C(n).toggleMinimize(m.value))
          }, [
            ae(mt, { kind: "minimize" })
          ], 40, Kc)) : N("", !0),
          B.value && !I.value ? (v(), w("button", {
            key: 1,
            type: "button",
            class: "dc-pane__button dc-control",
            "aria-label": `${S.value ? "Restore" : "Maximize"} ${d.value}`,
            "aria-pressed": S.value,
            "data-dc-maximize": m.value,
            onPointerdown: O[3] || (O[3] = Oe(() => {
            }, ["stop"])),
            onClick: O[4] || (O[4] = (j) => C(n).toggleMaximize(m.value))
          }, [
            ae(mt, {
              kind: S.value ? "restore" : "maximize"
            }, null, 8, ["kind"])
          ], 40, qc)) : N("", !0),
          !l.value && f.value && k(f.value.id) ? (v(), w("button", {
            key: 2,
            type: "button",
            class: "dc-pane__close dc-control",
            "aria-label": `Close ${d.value}`,
            "data-dc-close": f.value.id,
            onPointerdown: O[5] || (O[5] = Oe(() => {
            }, ["stop"])),
            onClick: O[6] || (O[6] = (j) => C(n).close(f.value.id))
          }, [
            ae(mt, { kind: "close" })
          ], 40, Bc)) : N("", !0)
        ])) : N("", !0)
      ], 40, Pc)),
      c.value ? (v(), w("div", {
        key: 1,
        id: pe.value,
        class: "dc-pane__space",
        role: M.value ? void 0 : "tabpanel",
        "aria-labelledby": M.value ? void 0 : oe(o.value.id)
      }, [
        Ke(R.$slots, "space", {
          node: c.value,
          path: _.value
        }, void 0, !0)
      ], 8, Wc)) : (v(), w("div", {
        key: 2,
        id: pe.value,
        class: "dc-pane__body",
        role: M.value ? void 0 : "tabpanel",
        "aria-labelledby": M.value ? void 0 : oe(r.value)
      }, [
        ae(F)
      ], 8, Hc)),
      Ce.value ? (v(), w("div", {
        key: 3,
        class: "dc-pane__drop",
        "data-dc-edge": Ce.value,
        "aria-hidden": "true"
      }, null, 8, Uc)) : N("", !0)
    ], 40, Ec)) : N("", !0);
  }
}), us = /* @__PURE__ */ ue(Gc, [["__scopeId", "data-v-44fd2b2d"]]), Xc = ["data-dc-space", "data-dc-path", "aria-label"], jc = {
  key: 0,
  class: "dc-space__head"
}, Yc = { class: "dc-space__title dc-truncate" }, Qc = ["data-dc-direction"], Zc = {
  key: 0,
  class: "dc-space__drop",
  "aria-hidden": "true"
}, Jc = ["aria-orientation", "aria-label", "aria-valuenow", "aria-disabled", "tabindex", "onPointerdown", "onKeydown"], eu = /* @__PURE__ */ ce({
  __name: "WindowNode",
  props: {
    node: {},
    path: {},
    framed: { type: Boolean }
  },
  setup(e) {
    const t = e, n = Hn(), a = W(null), s = g(() => K(t.node) ? t.node : null), l = g(() => yt(t.node) ? t.node : null), o = g(() => G(t.node) ? t.node : null), c = g(
      () => l.value ? l.value.children : o.value?.frames.map((F) => F.node) ?? []
    ), r = g(() => l.value ? Be(l.value) : []), f = g(
      () => (o.value?.frames ?? []).map((F, X) => ({
        held: F,
        /** Place in the stack, counted from the back — what `z-index` follows. */
        order: X,
        key: k(F.node),
        path: [...t.path, X]
      })).sort((F, X) => F.key < X.key ? -1 : F.key > X.key ? 1 : 0)
    ), d = g(() => _t(t.node)), h = g(() => n.spaceMenu(t.path)), _ = g(() => t.node.headless === !0), m = g(() => o.value ? "desktop" : l.value?.direction ?? ""), b = W(null), M = W(0);
    let $ = null;
    Me(
      b,
      (F) => {
        $?.disconnect(), $ = null, !(!F || typeof ResizeObserver > "u") && (M.value = F.clientWidth, $ = new ResizeObserver(([X]) => {
          M.value = X?.contentRect.width ?? 0;
        }), $.observe(F));
      },
      { immediate: !0 }
    ), Je(() => $?.disconnect());
    const E = g(() => {
      const F = Math.max(
        1,
        Math.floor((M.value + ut) / (hn + ut))
      ), X = /* @__PURE__ */ new Map();
      let ee = 0;
      for (const te of f.value)
        te.held.minimized === !0 && (X.set(te.key, {
          x: ut + ee % F * (hn + ut),
          bottom: ut + Math.floor(ee / F) * (ja + ut)
        }), ee += 1);
      return X;
    }), L = (F) => !!F && F.join("/") === t.path.join("/"), B = g(() => {
      const F = n.dropTarget.value, X = o.value;
      if (!X || !F?.rect || F.edge !== "float") return null;
      if (F.space) return L(F.space) ? F.rect : null;
      const ee = ge(X, F.panel);
      return ee && X.frames.includes(ee) ? F.rect : null;
    }), I = g(() => {
      const F = n.dropTarget.value;
      return !!F && !F.rect && L(F.space);
    }), T = g(() => l.value?.direction === "row"), V = g(() => c.value.map((F, X) => [...t.path, X])), k = (F) => [...We(F)].sort().join("/"), S = (F) => {
      const X = We(F)[0];
      return (X ? n.panelFor(X)?.title : null) ?? X ?? "panel";
    }, Z = (F) => {
      const X = c.value[F], ee = c.value[F + 1];
      return !X || !ee ? "Resize panels" : `Resize ${S(X)} and ${S(ee)}`;
    }, oe = (F) => {
      const X = r.value[F] ?? 0, ee = r.value[F + 1] ?? 0, te = X + ee;
      return te > 0 ? Math.round(X / te * 100) : 50;
    };
    function pe() {
      const F = a.value, X = F ? T.value ? F.clientWidth : F.clientHeight : 0;
      return X <= 0 ? 0.05 : Math.min(n.minPanelSize.value / X, 0.4);
    }
    let Y = null;
    function Ce(F, X) {
      const ee = l.value, te = a.value;
      if (!n.resizable.value || !ee || !te || F.button !== 0) return;
      const ve = T.value ? te.clientWidth : te.clientHeight;
      if (ve <= 0) return;
      const Ee = T.value ? F.clientX : F.clientY, He = Be(ee), Ue = Math.min(n.minPanelSize.value / ve, 0.4);
      F.preventDefault();
      const Ge = (De) => {
        const Ie = ((T.value ? De.clientX : De.clientY) - Ee) / ve;
        n.setSizes(t.path, ga(He, X, Ie, Ue));
      }, Xe = () => Y?.(), Le = (De) => {
        De.key === "Escape" && (n.setSizes(t.path, He), Y?.());
      };
      Y = () => {
        window.removeEventListener("pointermove", Ge), window.removeEventListener("pointerup", Xe), window.removeEventListener("pointercancel", Xe), window.removeEventListener("keydown", Le), Y = null;
      }, window.addEventListener("pointermove", Ge), window.addEventListener("pointerup", Xe), window.addEventListener("pointercancel", Xe), window.addEventListener("keydown", Le);
    }
    Je(() => Y?.());
    function ze(F, X) {
      const ee = l.value;
      if (!n.resizable.value || !ee) return;
      const te = T.value ? "ArrowRight" : "ArrowDown", ve = T.value ? "ArrowLeft" : "ArrowUp", Ee = F.shiftKey ? 0.1 : 0.02;
      if (F.key !== te && F.key !== ve) return;
      const He = F.key === te ? Ee : -Ee;
      F.preventDefault(), n.setSizes(t.path, ga(Be(ee), X, He, pe()));
    }
    return (F, X) => {
      const ee = $a("WindowNode", !0);
      return s.value ? (v(), me(us, {
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
        !e.framed && !_.value ? (v(), w("header", jc, [
          y("span", Yc, A(d.value), 1),
          h.value.length ? (v(), me(Fn, {
            key: 0,
            items: h.value,
            label: `${d.value} menu`
          }, null, 8, ["items", "label"])) : N("", !0)
        ])) : N("", !0),
        o.value ? (v(), w("div", {
          key: 1,
          ref_key: "desktop",
          ref: b,
          class: "dc-window__desktop"
        }, [
          B.value ? (v(), w("div", {
            key: 0,
            class: "dc-window__drop",
            style: Ae({
              left: `${B.value.x}px`,
              top: `${B.value.y}px`,
              width: `${B.value.w}px`,
              height: `${B.value.h}px`
            }),
            "aria-hidden": "true"
          }, null, 4)) : N("", !0),
          (v(!0), w(se, null, fe(f.value, (te) => (v(), me(Mc, {
            key: te.key,
            frame: te.held,
            path: te.path,
            order: te.order,
            place: E.value.get(te.key) ?? null
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
          I.value ? (v(), w("div", Zc)) : N("", !0),
          (v(!0), w(se, null, fe(c.value, (te, ve) => (v(), w(se, {
            key: k(te)
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
              "aria-orientation": T.value ? "vertical" : "horizontal",
              "aria-label": Z(ve),
              "aria-valuenow": oe(ve),
              "aria-valuemin": "0",
              "aria-valuemax": "100",
              "aria-disabled": C(n).resizable.value ? void 0 : "true",
              tabindex: C(n).resizable.value ? 0 : -1,
              onPointerdown: (Ee) => Ce(Ee, ve),
              onKeydown: (Ee) => ze(Ee, ve)
            }, null, 40, Jc)) : N("", !0)
          ], 64))), 128))
        ], 8, Qc)) : N("", !0)
      ], 8, Xc));
    };
  }
}), tu = /* @__PURE__ */ ue(eu, [["__scopeId", "data-v-fb5b403f"]]), nu = ["data-dc-theme", "data-dc-dragging", "data-dc-docking"], au = {
  key: 1,
  class: "dc-window__empty"
}, su = {
  class: "dc-window__live",
  "aria-live": "polite",
  role: "status"
}, Kt = 16, lu = /* @__PURE__ */ ce({
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
    const a = e, s = n, l = Xt(e, "layout"), o = Xt(e, "views"), c = kn(), r = g(() => new Map(a.panels.map((i) => [i.id, i]))), f = g(() => a.panels.map((i) => i.id)), d = g(() => oc(l.value, f.value)), h = W(null), _ = W(null), m = W(null), b = W(!0), M = W(null), $ = W(null), E = W(null), L = W(""), B = W(null);
    function I() {
      const i = B.value;
      return i ? [...i.querySelectorAll(".dc-pane[data-dc-panels]")].filter((p) => p.closest(".dc-window") === i).map((p) => ({ panels: (p.dataset.dcPanels ?? "").split(" "), element: p })) : [];
    }
    function T(i) {
      const u = [];
      let p = i.closest(".dc-float");
      for (; p; )
        u.unshift(Number(p.dataset.dcOrder ?? 0)), p = p.parentElement?.closest(".dc-float") ?? null;
      return u;
    }
    function V() {
      return I().map((i) => ({ pane: i, order: T(i.element) })).sort((i, u) => {
        const p = Math.max(i.order.length, u.order.length);
        for (let x = 0; x < p; x += 1) {
          const P = (i.order[x] ?? -1) - (u.order[x] ?? -1);
          if (P !== 0) return P;
        }
        return 0;
      }).map((i) => i.pane);
    }
    const k = (i) => I().find((u) => u.panels.includes(i)) ?? null;
    function S(i) {
      const u = r.value.get(i);
      if (!u) return "";
      const p = o.value[i];
      return p && u.views?.some((x) => x.key === p) ? p : u.defaultView ?? u.views?.[0]?.key ?? "";
    }
    function Z(i, u) {
      o.value = { ...o.value, [i]: u }, s("view-change", { panel: i, view: u });
    }
    const oe = g(
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
      const x = (u - i.left) / i.width, P = (p - i.top) / i.height, z = 0.3;
      return x > z && x < 1 - z && P > z && P < 1 - z ? "center" : [
        { edge: "left", distance: x },
        { edge: "right", distance: 1 - x },
        { edge: "top", distance: P },
        { edge: "bottom", distance: 1 - P }
      ].reduce(
        (Q, D) => D.distance < Q.distance ? D : Q
      ).edge;
    }
    function ze(i, u) {
      const p = [...i.querySelectorAll(".dc-tab")], x = p.findIndex((P) => {
        const z = P.getBoundingClientRect();
        return u < z.left + z.width / 2;
      });
      return x === -1 ? p.length : x;
    }
    function F(i, u, p) {
      for (const { panels: x, element: P } of V().reverse()) {
        const z = P.getBoundingClientRect();
        if (i < z.left || i > z.right || u < z.top || u > z.bottom) continue;
        const le = x.find((H) => H !== p), Q = P.querySelector(".dc-pane__tabs"), D = Q?.getBoundingClientRect();
        if (Q && D && u >= D.top && u <= D.bottom)
          return le ? { panel: le, edge: "center", index: ze(Q, i) } : null;
        const q = P.querySelector(":scope > .dc-pane__space");
        if (q) {
          const H = q.getBoundingClientRect();
          if (i >= H.left && i <= H.right && u >= H.top && u <= H.bottom) continue;
        }
        return le ? { panel: le, edge: Ce(z, i, u) } : null;
      }
      return ee(i, u, p) ?? Ee(i, u);
    }
    function X() {
      const i = B.value;
      return i ? [...i.querySelectorAll(".dc-window__desktop")].filter((u) => u.closest(".dc-window") === i).reverse() : [];
    }
    function ee(i, u, p) {
      const x = d.value;
      if (!x) return null;
      for (const P of X()) {
        const z = P.getBoundingClientRect();
        if (i < z.left || i > z.right || u < z.top || u > z.bottom) continue;
        const le = He(P), Q = le.flatMap((ne) => ne.panels).find((ne) => ne !== p);
        if (!Q && le.length > 0) return null;
        const D = ge(x, p)?.rect, q = sn(
          {
            x: i - z.left - 24,
            y: u - z.top - 12,
            w: D?.w ?? st.w,
            h: D?.h ?? st.h
          },
          { w: P.clientWidth, h: P.clientHeight },
          a.minPanelSize
        );
        if (Q) return { panel: Q, edge: "float", rect: q };
        const H = te(P);
        return H ? { panel: "", space: H, edge: "float", rect: q } : null;
      }
      return null;
    }
    function te(i) {
      const u = i.closest(".dc-space")?.getAttribute("data-dc-path");
      return u == null ? null : u === "" ? [] : u.split("/").map(Number);
    }
    function ve() {
      const i = B.value;
      return i ? [...i.querySelectorAll(".dc-space")].filter((u) => u.closest(".dc-window") === i).filter((u) => !u.querySelector(".dc-pane")).reverse().flatMap((u) => {
        const p = te(u);
        return p ? [{ element: u, path: p }] : [];
      }) : [];
    }
    function Ee(i, u) {
      for (const { element: p, path: x } of ve()) {
        if (p.dataset.dcSpace === "desktop") continue;
        const P = p.getBoundingClientRect();
        if (!(i < P.left || i > P.right || u < P.top || u > P.bottom))
          return { panel: "", space: x, edge: "center" };
      }
      return null;
    }
    function He(i) {
      return I().filter(
        (u) => u.element.closest(".dc-window__desktop") === i
      );
    }
    let Ue = null;
    const Ge = (i) => i.altKey;
    function Xe(i, u) {
      if (!pe(i) || _.value || $.value || u.button !== 0) return;
      const p = u.clientX, x = u.clientY;
      let P = !1, z = Ge(u);
      const le = () => {
        const re = E.value;
        re && (m.value = z ? ee(re.x, re.y, i) : F(re.x, re.y, i));
      }, Q = (re) => {
        if (!P) {
          if (Math.hypot(re.clientX - p, re.clientY - x) < 4) return;
          P = !0, _.value = i, M.value = null;
        }
        z = Ge(re), b.value = !z, E.value = { x: re.clientX, y: re.clientY }, le();
      }, D = (re) => {
        Ge(re) !== z && (z = !z, b.value = !z, P && le());
      }, q = (re) => {
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
        _.value = null, m.value = null, E.value = null, b.value = !0;
      }, H = () => q(!0), ne = () => q(!1), de = (re) => {
        if (re.key === "Escape") {
          q(!1);
          return;
        }
        D(re);
      };
      Ue = () => {
        window.removeEventListener("pointermove", Q), window.removeEventListener("pointerup", H), window.removeEventListener("pointercancel", ne), window.removeEventListener("keydown", de), window.removeEventListener("keyup", D), Ue = null;
      }, window.addEventListener("pointermove", Q), window.addEventListener("pointerup", H), window.addEventListener("pointercancel", ne), window.addEventListener("keydown", de), window.addEventListener("keyup", D);
    }
    Je(() => Ue?.());
    let Le = null;
    function De(i) {
      const u = B.value;
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
    function R(i) {
      const u = d.value, p = u ? ge(u, i) : null;
      return p !== null && Ye(p);
    }
    function O(i) {
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
      const x = ke(p.node);
      if (r.value.get(x)?.fixed === !0) return;
      const P = !at(p);
      let z = Yi(u, i, P);
      z !== u && (P || (z = Et(z, i)), l.value = z, s("frame-minimize", { panel: x, minimized: P }));
    }
    function we(i) {
      const u = Ie(i);
      u && $e(u);
    }
    function bt(i) {
      const u = d.value, p = u ? nt(u, i) : null;
      if (!u || !p) return;
      const x = ke(p.node);
      if (r.value.get(x)?.fixed === !0) return;
      const P = !Ye(p);
      let z = ji(u, i, P);
      z !== u && (P && (z = Et(z, i)), l.value = z, s("frame-maximize", { panel: x, maximized: P }));
    }
    function Gn(i) {
      const u = Ie(i);
      u && bt(u);
    }
    function Xn(i, u, p) {
      const x = d.value, P = x ? nt(x, i) : null;
      if (!x || !P || u.button !== 0 || _.value || $.value) return;
      const z = ke(P.node);
      if (r.value.get(z)?.fixed === !0 || Ye(P) || at(P) || (p === "move" ? !a.movable : !a.resizable)) return;
      const le = De(i), Q = Qi(x, i);
      wt(i);
      const D = { w: le?.clientWidth ?? 0, h: le?.clientHeight ?? 0 }, q = { ...P.rect }, H = u.clientX, ne = u.clientY, de = a.minPanelSize;
      $.value = z;
      const re = (Pe) => {
        const Ne = d.value;
        if (!Ne) return;
        const kt = va(Ne, Q, sn(Pe, D, de));
        kt !== Ne && (l.value = kt);
      }, U = (Pe) => {
        Pe.preventDefault();
        const Ne = Pe.clientX - H, kt = Pe.clientY - ne;
        re(
          p === "move" ? { ...q, x: q.x + Ne, y: q.y + kt } : pa(q, p, Ne, kt, de)
        );
      }, be = (Pe) => {
        if (Le?.(), $.value = null, !Pe) {
          re(q);
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
    function ds(i, u, p) {
      const x = Ie(i);
      x && Xn(x, u, p);
    }
    function fs(i, u, p = !1) {
      const x = d.value, P = Ie(i), z = x && P ? nt(x, P) : null;
      if (!x || !P || !z || r.value.get(i)?.fixed === !0 || (p ? !a.resizable : !a.movable)) return;
      if (Ye(z) || at(z)) {
        L.value = `${Te(i)} is ${Ye(z) ? "maximized" : "minimized"}, so it cannot be moved.`;
        return;
      }
      const le = u === "left" ? -Kt : u === "right" ? Kt : 0, Q = u === "up" ? -Kt : u === "down" ? Kt : 0, D = De(P), q = { w: D?.clientWidth ?? 0, h: D?.clientHeight ?? 0 }, H = p ? pa(z.rect, "se", le, Q, a.minPanelSize) : { ...z.rect, x: z.rect.x + le, y: z.rect.y + Q }, ne = va(x, P, sn(H, q, a.minPanelSize));
      if (ne === x) {
        L.value = p ? `${Te(i)} cannot be resized further.` : `${Te(i)} cannot move ${u}.`;
        return;
      }
      l.value = ne;
      const de = nt(ne, P);
      de && (s("frame-change", { panel: i, rect: de.rect }), L.value = p ? `${Te(i)} resized to ${de.rect.w} by ${de.rect.h}.` : `${Te(i)} moved to ${de.rect.x}, ${de.rect.y}.`);
    }
    Je(() => Le?.());
    function ps(i, u) {
      const p = k(i), x = p?.element.getBoundingClientRect();
      if (!p || !x) return null;
      const P = u === "left" || u === "right", z = (D) => {
        if (!(P ? D.bottom > x.top + 1 && D.top < x.bottom - 1 : D.right > x.left + 1 && D.left < x.right - 1)) return null;
        const H = u === "left" ? x.left - D.right : u === "right" ? D.left - x.right : u === "up" ? x.top - D.bottom : D.top - x.bottom;
        return H < -1 ? null : H;
      }, le = [];
      for (const D of I()) {
        if (D === p || D.element === p.element) continue;
        const q = z(D.element.getBoundingClientRect());
        if (q === null) continue;
        const H = D.panels.find((ne) => ne !== i);
        H && le.push({ to: { panel: H }, distance: q });
      }
      for (const { element: D, path: q } of ve()) {
        const H = z(D.getBoundingClientRect());
        H !== null && le.push({ to: { space: q }, distance: H });
      }
      return le.reduce(
        (D, q) => D && D.distance <= q.distance ? D : q,
        null
      )?.to ?? null;
    }
    function vs(i) {
      const u = d.value ? ge(d.value, i) !== null : !1;
      if (!u && !pe(i)) return;
      M.value = M.value === i ? null : i;
      const p = Te(i);
      if (!M.value) {
        L.value = `${p}: move mode off.`;
        return;
      }
      L.value = u ? `${p}: move mode on. Arrow keys move the window, shift and an arrow resize it, Escape leaves move mode.` : `${p}: move mode on. Arrow keys move the panel, shift and an arrow make it a tab of the panel that way, Escape leaves move mode.`;
    }
    const Te = (i) => r.value.get(i)?.title ?? i, ms = {
      left: "left",
      right: "right",
      up: "top",
      down: "bottom"
    };
    function hs(i, u, p = !1) {
      if (!pe(i)) return;
      const x = d.value;
      if (!x) return;
      const P = Te(i), z = ft(x, i);
      if (!p && z && (u === "left" || u === "right") && z.panels.length > 1) {
        const ne = z.panels.indexOf(i), de = u === "left" ? ne - 1 : ne + 1;
        if (de >= 0 && de < z.panels.length) {
          Y(Pt(x, i, de), { panel: i, target: i, edge: "center", index: de }), L.value = `${P} moved ${u}, now tab ${de + 1} of ${z.panels.length}.`, en(i);
          return;
        }
      }
      const Q = ps(i, u);
      if (!Q || Q.panel !== void 0 && !pe(Q.panel)) {
        L.value = `${P} cannot move ${u}.`;
        return;
      }
      const D = ms[u];
      if (Q.space) {
        const ne = Q.space, de = Qe(x, ne), re = ge(x, i)?.rect, U = { ...st, ...re ? { w: re.w, h: re.h } : {} };
        Y(ha(x, i, ne, U), { panel: i, target: "", space: ne, edge: D }), L.value = `${P} moved ${u}, into ${de ? _t(de) : "the space"}.`, en(i);
        return;
      }
      const q = Q.panel, H = z?.panels.length === 1 && ft(x, q)?.panels.length === 1;
      p ? (Y(Ot(x, i, q, "center"), {
        panel: i,
        target: q,
        edge: "center"
      }), L.value = `${P} joined ${Te(q)} as a tab.`) : H ? (Y(Bt(x, i, q), { panel: i, target: q, edge: D }), L.value = `${P} moved ${u}, trading places with ${Te(q)}.`) : (Y(Ot(x, i, q, D), { panel: i, target: q, edge: D }), L.value = `${P} moved ${u}, beside ${Te(q)}.`), en(i);
    }
    function en(i) {
      At(() => {
        k(i)?.element.querySelector(".dc-pane__grip")?.focus();
      });
    }
    function _s(i, u) {
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
    function gs(i) {
      jn(i) && s("panel-close", i);
    }
    const nn = W(/* @__PURE__ */ new Map());
    let ys = 0;
    function ws(i, u) {
      const p = ys += 1;
      return nn.value.set(p, { panel: i, items: u }), () => {
        nn.value.delete(p);
      };
    }
    function bs(i) {
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
    function ks(i, u) {
      const p = u.id, x = ft(i, p), P = (x?.panels.length ?? 0) > 1, z = x?.fixedView === !0, le = (H) => ({
        action: () => {
          H !== i && (l.value = H);
        }
      }), Q = [], D = [], q = u.views ?? [];
      if (q.length > 1 && !z) {
        const H = S(p);
        Q.push({
          id: "view",
          label: "View",
          items: q.map((ne) => ({
            id: `view-${ne.key}`,
            label: ne.label,
            checked: ne.key === H,
            action: () => Z(p, ne.key)
          }))
        });
      }
      return P && !z && D.push(
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
          ...le(tc(i, p))
        },
        {
          id: "show-desktop",
          label: "Desktop",
          checked: !1,
          ...le(nc(i, p))
        }
      ), P && x && (D.length && D.push({ separator: !0 }), D.push(...Zn(x, p))), { panel: Q, tabs: D, tabsTitle: x ? Qn(x) : "" };
    }
    function Zn(i, u) {
      const p = ct(i), x = (P) => {
        const z = i.panels[(p + P + i.panels.length) % i.panels.length];
        return (z === void 0 ? "" : ke(z)) || u;
      };
      return [
        { id: "next-tab", label: "Next tab", action: () => tn(x(1)) },
        { id: "previous-tab", label: "Previous tab", action: () => tn(x(-1)) }
      ];
    }
    function Nt(i) {
      return i.title ? i.title : K(i) ? i.panels.length > 1 ? "these tabs" : "the strip" : _t(i);
    }
    function Jn(i) {
      if (!i || G(i) || i.fixedView === !0 || !i.title && i.headless !== !0 || Re(i)) return null;
      const u = cs(i);
      return u && u.fixedView !== !0 ? u : null;
    }
    function $s(i) {
      const u = d.value;
      if (!a.menu || !u) return [];
      const p = Qe(u, i);
      if (!p || K(p)) return [];
      if (p.fixedView) return [];
      const x = G(p) ? "desktop" : p.direction, P = (U, be, je) => ({
        id: `show-${U}`,
        label: be,
        checked: x === U,
        action: () => {
          const et = d.value, tt = je();
          !et || tt === p || (l.value = Qt(_e(rt(et, i, tt))));
        }
      }), z = () => {
        const U = ls(p, xs(p));
        if (K(U) && U.panels.length === 0) return p;
        const be = K(U) && U.panels.length === 1 ? U.panels[0] : void 0;
        return be !== void 0 && ie(be) ? p : U;
      }, le = (U) => () => G(p) ? is(p, U) : p.direction === U ? p : { ...p, direction: U }, Q = i.slice(0, -1), D = i.length > 0 ? Qe(u, Q) : null, q = D && K(D) && D.panels.length > 1 ? D : null, H = D && Jn(D) === p ? D : null, ne = Jn(p), de = p.title || "this space", re = (U, be, je, et, tt) => ({
        id: U,
        label: tt,
        action: () => {
          const Pe = d.value;
          Pe && (l.value = Qt(_e(rt(Pe, be, lc(je, et)))));
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
            P("desktop", "Desktop", () => G(p) ? p : os(p))
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
          title: q ? Qn(q) : "",
          items: q ? Zn(q, ke(p)) : []
        }
      ]);
    }
    function xs(i) {
      const u = h.value;
      return u && J(i, u) ? u : void 0;
    }
    function Ms(i) {
      const u = d.value, p = r.value.get(i);
      if (!u || !p) return [];
      const x = a.menu ? ks(u, p) : null, P = bs(i);
      P.length && x?.panel.length && P.push({ separator: !0 }), x && P.push(...x.panel);
      const z = Yn([
        { id: "about-panel", title: p.title, items: P },
        { id: "about-tabs", title: x?.tabsTitle ?? "", items: x?.tabs ?? [] }
      ]);
      return a.paneMenu ? a.paneMenu(p, z) : z;
    }
    function Cs(i, u) {
      return c[`${i}-${u}`] ?? c[i];
    }
    function ea(i, u, p, x) {
      return Cs(i, u.id)?.({ panel: u, view: p, active: x });
    }
    ic({
      panelFor: (i) => r.value.get(i) ?? null,
      viewFor: S,
      setView: Z,
      movable: g(() => a.movable),
      resizable: g(() => a.resizable),
      minPanelSize: g(() => a.minPanelSize),
      spaceNames: g(() => a.spaceNames),
      focused: h,
      dragging: _,
      dropTarget: m,
      moving: M,
      framing: $,
      canMove: pe,
      focus(i) {
        h.value !== i && (h.value = i, s("panel-activate", i));
      },
      selectPanel: tn,
      beginDrag: Xe,
      toggleMoveMode: vs,
      nudge: hs,
      setSizes: _s,
      frameOf: (i) => d.value ? ge(d.value, i) : null,
      beginFrameDrag: ds,
      nudgeFrame: fs,
      raise: It,
      maximized: R,
      toggleMaximize: Gn,
      minimized: O,
      toggleMinimize: we,
      beginFrameDragAt: Xn,
      raiseAt: wt,
      toggleMaximizeAt: bt,
      toggleMinimizeAt: $e,
      menuFor: Ms,
      spaceMenu: $s,
      registerMenu: ws,
      closable: jn,
      close: gs,
      renderContent: (i, u, p) => ea("panel", i, u, p),
      renderActions: (i, u, p) => ea("actions", i, u, p),
      layout: d
    });
    const Es = g(() => {
      if (!(!a.accent && !a.tokens))
        return { ...a.tokens, ...a.accent ? { "--dc-accent": a.accent } : {} };
    }), Ps = () => {
      const i = _.value, u = E.value;
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
      move(i, u, p, x) {
        const P = d.value;
        P && Y(Ot(P, i, u, p, x), {
          panel: i,
          target: u,
          edge: p,
          ...x === void 0 ? {} : { index: x }
        });
      },
      /** Brings a panel's tab to the top of its group. */
      select(i) {
        const u = d.value;
        u && (l.value = vt(u, i));
      },
      /** Lifts a panel onto the float holding `near`, as a window of its own. */
      float(i, u, p) {
        const x = d.value;
        x && Y(ma(x, i, u, p), {
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
        const x = Ui(p, i, u);
        if (x === p) return;
        l.value = x;
        const P = ge(x, i);
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
      ref: B,
      class: "dc-shell dc-window",
      "data-dc-theme": e.theme,
      "data-dc-dragging": _.value ? "true" : "false",
      "data-dc-docking": b.value ? "true" : "false",
      style: Ae(Es.value)
    }, [
      d.value ? (v(), me(tu, {
        key: 0,
        node: d.value,
        path: []
      }, null, 8, ["node"])) : (v(), w("p", au, " This window has no panels. ")),
      ae(Ps),
      y("p", su, A(L.value), 1)
    ], 12, nu));
  }
}), ru = /* @__PURE__ */ ue(lu, [["__scopeId", "data-v-711565af"]]);
function $u(e = "", t = "/") {
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
function xu(e) {
  const t = W(wa(e.currentRoute.value.fullPath)), n = g(() => e.currentRoute.value.path), a = Me(
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
const ou = {
  DataShell: Ci,
  ShellHeader: Da,
  QueryPanel: Na,
  ResultsArea: Ua,
  FacetControl: Ia,
  SegmentedControl: vn,
  StatusPill: zt,
  ScoreMeter: Tn,
  WindowFrame: ru,
  WindowPane: us,
  ListView: mn,
  CardsView: Oa,
  GridView: Ka,
  TableView: Wa,
  LinksView: qa,
  PreviewView: Ba,
  TypeCardsView: Ha
}, Mu = {
  install(e, t = {}) {
    const n = t.prefix ?? "";
    for (const [a, s] of Object.entries(ou))
      e.component(`${n}${a}`, s);
    t.route && e.provide(Sa, t.route);
  }
};
export {
  Yt as CASCADE_STEP,
  Pu as COLUMN_BREAKPOINTS,
  Oa as CardsView,
  da as ColumnCell,
  st as DEFAULT_FRAME,
  Su as DEFAULT_SORT,
  Au as DEFAULT_VIEW,
  Ci as DataShell,
  zu as EMPTY_CELL,
  Ra as ENTITY_ALL,
  pn as ENTITY_TERM,
  zn as FACET_PREFIX,
  Ia as FacetControl,
  Ca as GENERIC_LABELS,
  Ka as GridView,
  Mu as HeaderContentLayoutPlugin,
  qa as LinksView,
  mn as ListView,
  ut as MINIMIZED_GAP,
  ja as MINIMIZED_HEIGHT,
  hn as MINIMIZED_WIDTH,
  Xa as MIN_FRAME,
  ia as MOCK_TINTS,
  du as MenuBar,
  Fn as MenuButton,
  Ga as MenuList,
  ot as MetricDrill,
  Un as PANE_CONTEXT_KEY,
  Pn as PARAM_DIR,
  Mn as PARAM_ENTITY,
  Sn as PARAM_EXPR,
  An as PARAM_PAGE,
  En as PARAM_SORT,
  Cn as PARAM_VIEW,
  Rn as PinStar,
  Ba as PreviewView,
  Na as QueryPanel,
  na as RECORD_STATUSES,
  Ru as RESULT_FIELDS,
  Sa as ROUTE_ADAPTER_KEY,
  Ua as ResultsArea,
  za as SHELL_CONTEXT_KEY,
  Tu as SHELL_THEMES,
  Rt as ScopeMark,
  Tn as ScoreMeter,
  vn as SegmentedControl,
  Da as ShellHeader,
  zt as StatusPill,
  Wa as TableView,
  Ha as TypeCardsView,
  Os as VIEW_KINDS,
  Wn as WINDOW_CONTEXT_KEY,
  ru as WindowFrame,
  us as WindowPane,
  Qa as activePanel,
  ct as activeTab,
  ul as addTerm,
  Wi as axisOf,
  In as cascade,
  Pa as cellText,
  Hs as cellValue,
  aa as changesResults,
  sn as clampRect,
  ls as collapseSpace,
  tc as collapseToTabs,
  pu as column,
  la as columnAlign,
  ra as columnClass,
  oa as columnKey,
  dn as columnTruncates,
  Ws as columnsFor,
  Vs as countPages,
  Us as createHistoryAdapter,
  $u as createMemoryAdapter,
  ol as createMockDataSource,
  xu as createVueRouterAdapter,
  Fu as defaultCellText,
  Lu as defaultColumns,
  ya as defaultLayout,
  $n as defaultQuery,
  dl as drillExpression,
  ha as dropIntoSpace,
  un as emptyFacetState,
  Fs as emptyFacetValue,
  Mt as findEntity,
  dt as findSort,
  mu as fixedView,
  Dn as float,
  ma as floatPanel,
  os as floatSplit,
  nc as floatTabs,
  cn as fnv1a,
  Ds as focusEntity,
  Ks as formatDate,
  sa as formatMetric,
  qs as formatOrdinal,
  Ea as formatPercent,
  Zt as frame,
  nt as frameAt,
  ge as frameOf,
  yn as framePathOf,
  ke as frontPanel,
  sl as generateRows,
  fu as group,
  ft as groupOf,
  Hi as groups,
  Ns as hasActiveFacets,
  J as hasPanel,
  vu as headless,
  xt as insertPanel,
  Ct as isChoosable,
  Du as isEntityScoped,
  Ls as isFacetActive,
  G as isFloat,
  K as isGroup,
  Ye as isMaximized,
  at as isMinimized,
  ie as isPanelTab,
  xn as isPristineQuery,
  yt as isSplit,
  Se as isTabOf,
  Ma as isTypeCardsQuery,
  Ts as isViewKind,
  Zs as matchesExpression,
  ll as matchesFacets,
  Gi as maximizeFrame,
  ji as maximizeFrameAt,
  lc as mergeSpace,
  Xi as minimizeFrame,
  Yi as minimizeFrameAt,
  Ot as movePanel,
  Pt as moveTab,
  Qe as nodeAt,
  St as nodeTitle,
  _e as normalizeLayout,
  qe as normalizeSearch,
  qn as normalizeSizes,
  cs as onlySpace,
  We as panelIds,
  Fe as panelNode,
  fa as panelTabs,
  js as parseExpression,
  gl as parseQuery,
  Va as presentRow,
  Cc as providePaneContext,
  fl as provideShellContext,
  ic as provideWindowContext,
  ln as raiseFrame,
  Et as raiseFrameAt,
  Qi as raisedPath,
  xa as reconcileFacets,
  oc as reconcileLayout,
  lt as removePanel,
  rt as replaceAt,
  pa as resizeRect,
  ga as resizeSplit,
  Qt as rootSpace,
  Vn as row,
  Bs as rowKey,
  il as scopeTerm,
  cl as scopeTermFor,
  ua as serializeQuery,
  vt as setActivePanel,
  Ui as setFrameRect,
  va as setFrameRectAt,
  Wt as setSizesAt,
  gu as setSplitDirection,
  Be as sizesOf,
  Is as sortsFor,
  he as spaceChrome,
  _t as spaceTitle,
  Nn as split,
  _a as spreadTabs,
  wl as summarizeQuery,
  La as summaryTerms,
  Bt as swapPanels,
  Ln as tabNode,
  Ft as tabPanels,
  is as tileFloat,
  yu as toFloat,
  wu as toTiled,
  hu as toggleMaximized,
  _u as toggleMinimized,
  Do as useColumns,
  jo as useEntityPreviews,
  bu as usePaneContext,
  ku as usePaneMenu,
  gt as usePresentedRows,
  bl as useQueryState,
  kl as useResults,
  ye as useShellContext,
  uu as useViewLabels,
  Hn as useWindowContext
};
