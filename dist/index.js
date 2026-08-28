import { ref as B, inject as rt, provide as un, computed as _, toValue as ft, shallowRef as Tt, watch as Ee, defineComponent as le, openBlock as m, createElementBlock as h, createElementVNode as p, toDisplayString as M, createCommentVNode as V, unref as C, renderSlot as yt, Fragment as te, renderList as ue, withDirectives as Qt, withKeys as vt, withModifiers as Se, vModelText as Zt, normalizeClass as ua, nextTick as wt, createBlock as ge, createVNode as ce, createTextVNode as At, normalizeStyle as ze, resolveDynamicComponent as da, useModel as Lt, useSlots as ss, onBeforeUnmount as Ve, useId as as, createSlots as fa, withCtx as Jt, mergeModels as Dt, onMounted as pa, resolveComponent as rs, getCurrentScope as va, onScopeDispose as ma, h as ha } from "vue";
const ls = Symbol("dc.routeAdapter");
function Le(e) {
  if (!e) return "";
  const t = e.replace(/^[?]/, "");
  return t ? `?${t}` : "";
}
function _a() {
  const e = typeof window < "u", t = B(e ? Le(window.location.search) : ""), n = B(e ? window.location.pathname : "/"), s = () => {
    t.value = Le(window.location.search), n.value = window.location.pathname;
  };
  e && window.addEventListener("popstate", s);
  const a = (r, o) => {
    const i = Le(r);
    if (!e) {
      t.value = i;
      return;
    }
    const l = `${window.location.pathname}${i}${window.location.hash}`;
    o === "push" ? window.history.pushState(window.history.state, "", l) : window.history.replaceState(window.history.state, "", l), t.value = i, n.value = window.location.pathname;
  };
  return {
    search: t,
    path: n,
    push: (r) => a(r, "push"),
    replace: (r) => a(r, "replace"),
    dispose: () => {
      e && window.removeEventListener("popstate", s);
    }
  };
}
const os = ["list", "cards", "grid", "table", "links", "preview"], Cc = [
  "minimal",
  "mono-size",
  "dark",
  "light",
  "auto",
  "macos",
  "windows",
  "inherit"
], qn = ["ok", "running", "queued", "review", "failed"], ga = "cards", Ec = "updated";
function is(e) {
  return typeof e == "string" && os.includes(e);
}
function Ze(e, t) {
  return t ? e.entities.find((n) => n.key === t) ?? null : null;
}
function cs(e, t = {}) {
  const n = Ze(e, t.entity), s = e.entities[0];
  if (!n && !s) throw new Error(`Schema "${e.key}" declares no entities`);
  return n ?? s;
}
function us(e) {
  return e?.sorts?.length ? e.sorts : [
    { key: "updated", label: "updated" },
    { key: "score", label: "score" },
    { key: "metric1", label: e ? e.labels.metric1.toLowerCase() : "value" },
    { key: "name", label: "name" }
  ];
}
function Xe(e, t) {
  const n = us(e);
  return (t ? n.find((a) => a.key === t) : void 0) ?? n[0];
}
function dn(e) {
  switch (e.kind) {
    case "chips":
      return { kind: "chips", selected: [] };
    case "range":
      return { kind: "range", min: null, max: null };
    case "toggle":
      return { kind: "toggle", on: !1 };
  }
}
function It(e) {
  const t = {};
  for (const n of e?.facets ?? []) t[n.key] = dn(n);
  return t;
}
function ds(e) {
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
function fs(e) {
  return Object.values(e).some(ds);
}
function fn(e) {
  return e.entity === null && e.expr.trim() === "" && !fs(e.facets);
}
function Pc(e) {
  return e.entity !== null;
}
function pn(e, t = {}) {
  const s = t.landing === "entity" ? cs(e, t) : null;
  return {
    entity: s?.key ?? null,
    view: t.view && is(t.view) ? t.view : ga,
    sort: Xe(s, t.sort).key,
    dir: t.dir === "asc" ? "asc" : "desc",
    expr: "",
    facets: It(s)
  };
}
function ps(e, t) {
  const n = {};
  for (const s of e?.facets ?? []) {
    const a = t[s.key];
    n[s.key] = a && a.kind === s.kind ? a : dn(s);
  }
  return n;
}
const ya = /^([A-Za-z_][\w.-]*)\s*(>=|<=|:|=|>|<)\s*(.*)$/;
function wa(e) {
  const t = [];
  let n = "", s = null;
  const a = () => {
    n && t.push(n), n = "";
  };
  for (let r = 0; r < e.length; r++) {
    const o = e[r];
    if (s) {
      o === s ? s = null : n += o;
      continue;
    }
    if (o === '"' || o === "'") {
      s = o;
      continue;
    }
    if (/\s/.test(o)) {
      if (/(?:>=|<=|[:=><])$/.test(n) || e.slice(r + 1).match(/^\s*(>=|<=|[:=><])/) && n) continue;
      a();
      continue;
    }
    n += o;
  }
  return a(), t;
}
function ba(e) {
  const t = e.trim();
  if (!t) return [];
  const n = [];
  let s = [];
  for (const a of wa(t)) {
    const r = a.toUpperCase();
    if (r === "AND" || r === "&&") continue;
    if (r === "OR" || r === "||") {
      s.length && n.push(s), s = [];
      continue;
    }
    const o = ya.exec(a);
    o && o[3] !== "" ? s.push({
      kind: "field",
      field: o[1].toLowerCase(),
      comparator: o[2],
      value: o[3]
    }) : s.push({ kind: "text", value: a });
  }
  return s.length && n.push(s), n;
}
function ka(e, t, n) {
  const s = n.labels, a = (i) => i.toLowerCase().replace(/\s+/g, ""), r = e.replace(/\s+/g, "");
  if (r === "entity") return t.entityKey;
  if (r === "status" || r === "state") return t.status;
  if (r === "score") return t.score;
  if (r === "updated" || r === "date") return t.updatedAt;
  if (r === "name" || r === a(s.primary)) return t.primary;
  if (r === "ref" || r === a(s.secondary)) return t.secondary;
  if (r === "metric1" || r === a(s.metric1)) return t.metric1;
  if (r === "metric2" || r === a(s.metric2)) return t.metric2;
  if (e in t.facets) return t.facets[e];
  const o = n.facets.find((i) => a(i.label) === r);
  return o ? t.facets[o.key] : void 0;
}
function Xt(e, t) {
  const n = e.toLowerCase(), s = t.toLowerCase();
  if (!s.includes("*")) return n.includes(s);
  const a = s.replace(/[.+?^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*");
  return new RegExp(a).test(n);
}
function $a(e, t, n) {
  if (e.kind === "text")
    return Xt(t.primary, e.value) || Xt(t.secondary, e.value);
  const s = ka(e.field, t, n);
  if (s === void 0) return !0;
  if (e.comparator === ":" || e.comparator === "=") {
    if (typeof s == "boolean") {
      const o = e.value.toLowerCase();
      return o === "true" || o === "yes" ? s : o === "false" || o === "no" ? !s : !0;
    }
    if (typeof s == "number") {
      const o = Number(e.value);
      return Number.isFinite(o) ? s === o : !0;
    }
    return Xt(s, e.value);
  }
  const a = Number(e.value), r = typeof s == "number" ? s : Number(s);
  if (!Number.isFinite(a) || !Number.isFinite(r)) return !0;
  switch (e.comparator) {
    case ">":
      return r > a;
    case ">=":
      return r >= a;
    case "<":
      return r < a;
    case "<=":
      return r <= a;
  }
}
function xa(e, t, n) {
  return e.length ? e.some((s) => s.every((a) => $a(a, t, n))) : !0;
}
function Wn(e) {
  let t = 2166136261;
  for (let n = 0; n < e.length; n++)
    t ^= e.charCodeAt(n), t = Math.imul(t, 16777619);
  return Math.abs(t);
}
function Un(e) {
  if (!Number.isFinite(e)) return "—";
  const t = Math.abs(e);
  return t >= 1e6 ? `${(e / 1e6).toFixed(1)}m` : t >= 1e3 ? `${(e / 1e3).toFixed(1)}k` : String(Math.round(e));
}
function Ma(e) {
  const t = new Date(e);
  if (Number.isNaN(t.getTime())) return "—";
  const n = String(t.getUTCDate()).padStart(2, "0"), s = String(t.getUTCMonth() + 1).padStart(2, "0");
  return `${n}.${s}.${t.getUTCFullYear()}`;
}
function Ca(e) {
  return String(e + 1).padStart(2, "0");
}
function vs(e) {
  return `${Math.round(Math.min(1, Math.max(0, e)) * 100)}%`;
}
const Hn = [
  "oklch(0.36 0.06 240)",
  "oklch(0.34 0.07 290)",
  "oklch(0.36 0.06 160)",
  "oklch(0.38 0.06 80)",
  "oklch(0.35 0.07 30)",
  "oklch(0.34 0.05 200)"
];
function Ea(e, t) {
  switch (e.kind) {
    case "chips":
      return e.options[t % e.options.length] ?? "";
    case "range": {
      const n = Math.max(0, e.max - e.min);
      return e.min + (n === 0 ? 0 : t % (n + 1));
    }
    case "toggle":
      return t % 3 === 0;
  }
}
function Pa(e, t = {}) {
  const n = t.population ?? 48, s = t.seed ?? "", a = t.now ?? /* @__PURE__ */ new Date("2026-08-25T00:00:00Z"), r = e.samples;
  if (!r.length) return [];
  const o = [];
  for (let i = 0; i < n; i++) {
    const l = r[i % r.length], u = Math.floor(i / r.length), f = Wn(`${s}:${e.key}:${l[0]}:${i}`), E = {};
    for (const g of e.facets)
      E[g.key] = Ea(g, Wn(`${f}:${g.key}`));
    const b = new Date(a.getTime() - f % 900 * 36e5).toISOString();
    o.push({
      id: `${e.key}_${1e4 + i * 7}`,
      entityKey: e.key,
      entityLabel: e.label,
      primary: u ? `${l[0]} · rev ${u + 1}` : l[0],
      secondary: u ? `${l[1]}-${u + 1}` : l[1],
      status: qn[f % qn.length],
      score: Number((0.35 + f % 64 / 100).toFixed(3)),
      metric1: 1 + f % 940,
      metric2: 1 + (f >> 3) % 320,
      updatedAt: b,
      tint: Hn[f % Hn.length],
      facets: E
    });
  }
  return o;
}
function Sa(e, t) {
  for (const [n, s] of Object.entries(t)) {
    const a = e.facets[n];
    switch (s.kind) {
      case "chips": {
        if (!s.selected.length) break;
        if (typeof a != "string" || !s.selected.includes(a)) return !1;
        break;
      }
      case "range": {
        if (s.min === null && s.max === null) break;
        const r = typeof a == "number" ? a : Number(a);
        if (!Number.isFinite(r) || s.min !== null && r < s.min || s.max !== null && r > s.max) return !1;
        break;
      }
      case "toggle": {
        if (!s.on) break;
        if (a !== !0) return !1;
        break;
      }
    }
  }
  return !0;
}
function Aa(e) {
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
function za(e = {}) {
  const t = /* @__PURE__ */ new Map(), n = (s) => {
    const a = t.get(s.key);
    if (a) return a;
    const r = Pa(s, e);
    return t.set(s.key, r), r;
  };
  return {
    query({ query: s, schema: a, entity: r, limit: o }) {
      const i = ba(s.expr), l = r ? [r] : a.entities, u = [], f = [];
      for (const g of l)
        for (const x of n(g))
          u.push(x), (r ? Sa(x, s.facets) : !0) && xa(i, x, g) && f.push(x);
      const E = Xe(r, s.sort), b = f.sort(Aa(E.key));
      return s.dir === "asc" && b.reverse(), {
        rows: b.slice(0, o),
        total: f.length,
        unfiltered: f.length === u.length
      };
    }
  };
}
const ms = Symbol("dc.shellContext");
function Fa(e) {
  return un(ms, e), e;
}
function $e() {
  const e = rt(ms, null);
  if (!e)
    throw new Error(
      "[header-content-layout] No shell context found. Render this component inside <DataShell>."
    );
  return e;
}
const vn = "e", mn = "v", hn = "s", _n = "d", gn = "q", yn = "f_", hs = "*", Ra = [vn, mn, hn, _n, gn], en = "..", _s = ",", Ta = [
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
function Gt(e) {
  let t = encodeURIComponent(e);
  for (const [n, s] of Ta) t = t.replace(n, s);
  return t;
}
function Ie(e) {
  try {
    return decodeURIComponent(e.replace(/\+/g, " "));
  } catch {
    return e.replace(/\+/g, " ");
  }
}
function gs(e) {
  const t = e.replace(/^[?]/, "");
  if (!t) return [];
  const n = [];
  for (const s of t.split("&")) {
    if (!s) continue;
    const a = s.indexOf("="), r = a === -1 ? s : s.slice(0, a), o = a === -1 ? "" : s.slice(a + 1);
    n.push([Ie(r), o]);
  }
  return n;
}
function La(e) {
  return Ra.includes(e) || e.startsWith(yn);
}
function Xn(e, t, n) {
  return Math.min(n, Math.max(t, e));
}
function Da(e, t) {
  const n = Ie(t);
  switch (e.kind) {
    case "chips": {
      const s = new Set(
        n.split(_s).map((r) => r.trim()).filter(Boolean)
      );
      return { kind: "chips", selected: e.options.filter((r) => s.has(r)) };
    }
    case "range": {
      const s = n.indexOf(en), a = (s === -1 ? n : n.slice(0, s)).trim(), r = (s === -1 ? "" : n.slice(s + en.length)).trim(), o = a === "" ? null : Number(a), i = r === "" ? null : Number(r);
      let l = o !== null && Number.isFinite(o) ? Xn(o, e.min, e.max) : null, u = i !== null && Number.isFinite(i) ? Xn(i, e.min, e.max) : null;
      return l !== null && u !== null && l > u && ([l, u] = [u, l]), { kind: "range", min: l, max: u };
    }
    case "toggle":
      return { kind: "toggle", on: n === "1" || n === "true" };
  }
}
function Ia(e, t) {
  switch (e.kind) {
    case "chips":
      return e.selected.length ? (t.kind === "chips" ? t.options.filter((s) => e.selected.includes(s)) : e.selected).join(_s) : null;
    case "range":
      return e.min === null && e.max === null ? null : `${e.min ?? ""}${en}${e.max ?? ""}`;
    case "toggle":
      return e.on ? "1" : null;
  }
}
function Na(e, t, n = {}) {
  const s = pn(t, n), a = new Map(gs(e)), r = a.get(vn), o = r === void 0 ? s.entity : Ie(r), i = o === hs ? null : Ze(t, o), l = a.get(mn), u = l && is(Ie(l)) ? Ie(l) : s.view, f = a.get(hn), E = Xe(i, f ? Ie(f) : n.sort), b = a.get(_n), g = b ? Ie(b) === "asc" ? "asc" : "desc" : s.dir, x = a.get(gn), y = {};
  for (const w of i?.facets ?? []) {
    const z = a.get(`${yn}${w.key}`);
    y[w.key] = z === void 0 ? dn(w) : Da(w, z);
  }
  return {
    entity: i?.key ?? null,
    view: u,
    sort: E.key,
    dir: g,
    expr: x === void 0 ? "" : Ie(x),
    facets: ps(i, y)
  };
}
function Gn(e, t, n = {}, s = "") {
  const a = pn(t, n), r = Ze(t, e.entity), o = gs(s).filter(([E]) => !La(E)), i = [], l = (E, b) => i.push([E, Gt(b)]), u = r?.key ?? null;
  u !== a.entity && l(vn, u ?? hs), e.view !== a.view && l(mn, e.view), e.sort !== a.sort && l(hn, e.sort), e.dir !== a.dir && l(_n, e.dir), e.expr.trim() !== "" && l(gn, e.expr);
  for (const E of r?.facets ?? []) {
    const b = e.facets[E.key];
    if (!b) continue;
    const g = Ia(b, E);
    g !== null && i.push([`${yn}${E.key}`, Gt(g)]);
  }
  const f = [
    ...o.map(([E, b]) => [Gt(E), b]),
    ...i
  ];
  return f.length ? `?${f.map(([E, b]) => b === "" ? E : `${E}=${b}`).join("&")}` : "";
}
const tn = "entity";
function Oa(e, t) {
  const n = e.label.toLowerCase();
  switch (t.kind) {
    case "chips":
      return t.selected.map((s) => ({
        id: `${e.key}:${s}`,
        label: `${n}:${s}`,
        facetKey: e.key,
        option: s
      }));
    case "range": {
      if (t.min === null && t.max === null) return [];
      const s = t.min ?? "", a = t.max ?? "";
      return [{ id: e.key, label: `${n}:${s}..${a}`, facetKey: e.key }];
    }
    case "toggle":
      return t.on ? [{ id: e.key, label: `${n}:on`, facetKey: e.key }] : [];
  }
}
function ys(e, t) {
  const n = [];
  t && n.push({
    id: tn,
    label: `entity:${t.key}`,
    facetKey: tn
  });
  for (const s of t?.facets ?? []) {
    const a = e.facets[s.key];
    a && ds(a) && n.push(...Oa(s, a));
  }
  return n;
}
function Va(e, t) {
  if (fn(e)) {
    const a = Xe(t, e.sort);
    return `everything · ${e.view} · ${a.label}`;
  }
  const n = ys(e, t).map((a) => a.label), s = e.expr.trim();
  return s && n.push(`"${s}"`), n.join(" · ");
}
function Ka(e) {
  const { adapter: t } = e, n = _(() => ft(e.schema)), s = _(() => ft(e.defaults) ?? {}), a = _(() => Na(t.search.value, n.value, s.value)), r = _(() => Ze(n.value, a.value.entity)), o = _(() => r.value ?? cs(n.value, s.value)), i = _(() => us(r.value)), l = _(() => Xe(r.value, a.value.sort)), u = (y, w) => {
    const z = Gn(y, n.value, s.value, t.search.value);
    z !== t.search.value && (w === "push" ? t.push(z) : t.replace(z));
  }, f = () => ft(e.navigationMode) ?? "push", E = () => ft(e.facetNavigationMode) ?? "replace", b = (y, w) => {
    u({ ...a.value, ...y }, w);
  }, g = (y, w) => {
    const z = a.value.facets[y];
    if (!z) return;
    const O = { ...a.value.facets, [y]: w(z) };
    b({ facets: O }, E());
  }, x = (y) => {
    const w = y === null ? null : Ze(n.value, y);
    (w?.key ?? null) !== a.value.entity && b(
      {
        entity: w?.key ?? null,
        sort: Xe(w, a.value.sort).key,
        facets: It(w)
      },
      f()
    );
  };
  return {
    query: a,
    entity: r,
    focus: o,
    sort: l,
    sorts: i,
    summary: _(() => Va(a.value, r.value)),
    terms: _(() => ys(a.value, r.value)),
    isPristine: _(() => fn(a.value)),
    isEverything: _(() => a.value.entity === null),
    hasFacets: _(() => fs(a.value.facets)),
    setEntity: x,
    clearEntity: () => x(null),
    setView(y) {
      b({ view: y }, f());
    },
    setSort(y) {
      b({ sort: Xe(r.value, y).key }, f());
    },
    toggleDirection() {
      b({ dir: a.value.dir === "desc" ? "asc" : "desc" }, f());
    },
    setExpression(y) {
      b({ expr: y }, f());
    },
    setFacet(y, w) {
      g(y, () => w);
    },
    toggleChip(y, w) {
      g(y, (z) => z.kind !== "chips" ? z : { kind: "chips", selected: z.selected.includes(w) ? z.selected.filter((U) => U !== w) : [...z.selected, w] });
    },
    setRange(y, w, z) {
      g(y, (O) => O.kind === "range" ? { kind: "range", min: w, max: z } : O);
    },
    toggleFlag(y) {
      g(
        y,
        (w) => w.kind === "toggle" ? { kind: "toggle", on: !w.on } : w
      );
    },
    removeTerm(y) {
      if (y.facetKey === tn) {
        x(null);
        return;
      }
      g(y.facetKey, (w) => w.kind === "chips" && y.option ? { kind: "chips", selected: w.selected.filter((z) => z !== y.option) } : w.kind === "range" ? { kind: "range", min: null, max: null } : w.kind === "toggle" ? { kind: "toggle", on: !1 } : w);
    },
    clearFilters() {
      b({ entity: null, expr: "", facets: It(null) }, f());
    },
    reset() {
      u(pn(n.value, s.value), f());
    },
    hrefFor(y) {
      const w = { ...a.value, ...y };
      return w.facets = ps(Ze(n.value, w.entity), w.facets), `${t.path.value}${Gn(w, n.value, s.value, t.search.value)}`;
    }
  };
}
function Ba(e) {
  const t = Tt([]), n = B(0), s = B(!1), a = Tt(null);
  let r = 0;
  const o = (l) => {
    t.value = l.rows, n.value = l.total, a.value = null;
  }, i = () => {
    const l = ++r, u = {
      query: e.query.value,
      schema: e.schema.value,
      entity: e.entity.value,
      limit: e.limit.value
    };
    let f;
    try {
      f = e.source.value.query(u);
    } catch (E) {
      a.value = E, t.value = [], n.value = 0;
      return;
    }
    if (!(f instanceof Promise)) {
      o(f), s.value = !1;
      return;
    }
    s.value = !0, f.then((E) => {
      l === r && o(E);
    }).catch((E) => {
      l === r && (a.value = E, t.value = [], n.value = 0);
    }).finally(() => {
      l === r && (s.value = !1);
    });
  };
  return Ee([e.source, e.query, e.schema, e.entity, e.limit], i, {
    immediate: !0
  }), { rows: t, total: n, pending: s, error: a, refresh: i };
}
const qa = ["data-dc-expanded"], Wa = ["aria-expanded", "aria-controls"], Ua = { class: "dc-header__domain" }, Ha = { class: "dc-header__crumb" }, Xa = { class: "dc-header__crumb-root" }, Ga = {
  key: 0,
  class: "dc-header__count dc-mono"
}, Ya = { class: "dc-header__query" }, ja = ["data-dc-active", "title"], Qa = {
  class: "dc-header__chevron",
  "aria-hidden": "true"
}, Za = { class: "dc-header__sr" }, Ja = {
  key: 0,
  class: "dc-header__actions"
}, er = /* @__PURE__ */ le({
  __name: "ShellHeader",
  props: {
    expanded: { type: Boolean },
    panelId: {},
    hideCount: { type: Boolean }
  },
  emits: ["toggle"],
  setup(e, { emit: t }) {
    const n = e, s = t, a = $e(), r = _(() => a.schema.value), o = _(() => a.entity.value?.label ?? "Everything"), i = _(() => {
      if (n.hideCount) return "";
      const l = a.entity.value;
      return l && !a.hasFacets.value && !a.query.value.expr.trim() ? l.count : String(a.total.value);
    });
    return (l, u) => (m(), h("div", {
      class: "dc-header",
      "data-dc-expanded": e.expanded ? "true" : "false"
    }, [
      p("button", {
        type: "button",
        class: "dc-header__trigger",
        "aria-expanded": e.expanded,
        "aria-controls": e.panelId,
        onClick: u[0] || (u[0] = (f) => s("toggle"))
      }, [
        u[2] || (u[2] = p("span", {
          class: "dc-header__badge",
          "aria-hidden": "true"
        }, "◆", -1)),
        p("span", Ua, M(r.value.label), 1),
        p("span", Ha, [
          p("span", Xa, M(o.value), 1),
          i.value ? (m(), h("span", Ga, M(i.value), 1)) : V("", !0)
        ]),
        p("span", Ya, [
          u[1] || (u[1] = p("span", { class: "dc-header__query-label" }, "Query", -1)),
          p("span", {
            class: "dc-header__summary dc-mono dc-truncate",
            "data-dc-active": C(a).isPristine.value ? "false" : "true",
            title: C(a).summary.value
          }, M(C(a).summary.value), 9, ja)
        ]),
        p("span", Qa, M(e.expanded ? "▲" : "▼"), 1),
        p("span", Za, M(e.expanded ? "Hide query panel" : "Edit query"), 1)
      ], 8, Wa),
      l.$slots.actions ? (m(), h("div", Ja, [
        yt(l.$slots, "actions", {}, void 0, !0)
      ])) : V("", !0)
    ], 8, qa));
  }
}), oe = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [s, a] of t)
    n[s] = a;
  return n;
}, ws = /* @__PURE__ */ oe(er, [["__scopeId", "data-v-1d24c7a9"]]), tr = { class: "dc-facet" }, nr = { class: "dc-facet__head" }, sr = ["id"], ar = { class: "dc-facet__hint dc-mono" }, rr = ["aria-labelledby"], lr = ["aria-pressed", "data-dc-active", "onClick"], or = ["aria-labelledby"], ir = ["aria-label", "placeholder", "onKeydown"], cr = ["aria-label", "placeholder", "onKeydown"], ur = ["aria-checked"], dr = { class: "dc-switch__text" }, fr = ["data-dc-active"], pr = /* @__PURE__ */ le({
  __name: "FacetControl",
  props: {
    facet: {},
    value: {}
  },
  emits: ["update"],
  setup(e, { emit: t }) {
    const n = e, s = t, a = _(() => {
      const { facet: b, value: g } = n;
      return b.kind === "chips" && g.kind === "chips" ? g.selected.length ? `${g.selected.length} of ${b.options.length}` : "any" : b.kind === "range" && g.kind === "range" ? g.min === null && g.max === null ? `${b.min}–${b.max}` : `${g.min ?? b.min}–${g.max ?? b.max}` : g.kind === "toggle" ? g.on ? "on" : "off" : "";
    }), r = _(
      () => n.value.kind === "chips" ? new Set(n.value.selected) : /* @__PURE__ */ new Set()
    );
    function o(b) {
      if (n.value.kind !== "chips") return;
      const g = r.value.has(b) ? n.value.selected.filter((x) => x !== b) : [...n.value.selected, b];
      s("update", { kind: "chips", selected: g });
    }
    const i = B(""), l = B("");
    Ee(
      () => n.value,
      (b) => {
        b.kind === "range" && (i.value = b.min === null ? "" : b.min, l.value = b.max === null ? "" : b.max);
      },
      { immediate: !0, deep: !0 }
    );
    function u(b) {
      if (typeof b == "number") return Number.isFinite(b) ? b : null;
      const g = b.trim();
      if (!g) return null;
      const x = Number(g);
      return Number.isFinite(x) ? x : null;
    }
    function f() {
      if (n.value.kind !== "range") return;
      const b = u(i.value), g = u(l.value);
      b === n.value.min && g === n.value.max || s("update", { kind: "range", min: b, max: g });
    }
    function E() {
      n.value.kind === "toggle" && s("update", { kind: "toggle", on: !n.value.on });
    }
    return (b, g) => (m(), h("div", tr, [
      p("div", nr, [
        p("span", {
          id: `dc-facet-${e.facet.key}`,
          class: "dc-facet__label"
        }, M(e.facet.label), 9, sr),
        p("span", ar, M(a.value), 1)
      ]),
      e.facet.kind === "chips" && e.value.kind === "chips" ? (m(), h("div", {
        key: 0,
        class: "dc-facet__chips",
        role: "group",
        "aria-labelledby": `dc-facet-${e.facet.key}`
      }, [
        (m(!0), h(te, null, ue(e.facet.options, (x) => (m(), h("button", {
          key: x,
          type: "button",
          class: "dc-chip",
          "aria-pressed": r.value.has(x),
          "data-dc-active": r.value.has(x) ? "true" : "false",
          onClick: (y) => o(x)
        }, M(x), 9, lr))), 128))
      ], 8, rr)) : e.facet.kind === "range" && e.value.kind === "range" ? (m(), h("div", {
        key: 1,
        class: "dc-facet__range",
        role: "group",
        "aria-labelledby": `dc-facet-${e.facet.key}`
      }, [
        Qt(p("input", {
          "onUpdate:modelValue": g[0] || (g[0] = (x) => i.value = x),
          class: "dc-input dc-mono",
          type: "number",
          inputmode: "numeric",
          "aria-label": `${e.facet.label} minimum`,
          placeholder: String(e.facet.min),
          onChange: f,
          onBlur: f,
          onKeydown: vt(Se(f, ["prevent"]), ["enter"])
        }, null, 40, ir), [
          [Zt, i.value]
        ]),
        g[2] || (g[2] = p("span", {
          class: "dc-facet__dash",
          "aria-hidden": "true"
        }, "–", -1)),
        Qt(p("input", {
          "onUpdate:modelValue": g[1] || (g[1] = (x) => l.value = x),
          class: "dc-input dc-mono",
          type: "number",
          inputmode: "numeric",
          "aria-label": `${e.facet.label} maximum`,
          placeholder: String(e.facet.max),
          onChange: f,
          onBlur: f,
          onKeydown: vt(Se(f, ["prevent"]), ["enter"])
        }, null, 40, cr), [
          [Zt, l.value]
        ])
      ], 8, or)) : e.facet.kind === "toggle" && e.value.kind === "toggle" ? (m(), h("button", {
        key: 2,
        type: "button",
        class: "dc-switch",
        role: "switch",
        "aria-checked": e.value.on,
        onClick: E
      }, [
        p("span", dr, M(e.facet.text), 1),
        p("span", {
          class: "dc-switch__track",
          "data-dc-active": e.value.on ? "true" : "false",
          "aria-hidden": "true"
        }, [...g[3] || (g[3] = [
          p("span", { class: "dc-switch__knob" }, null, -1)
        ])], 8, fr)
      ], 8, ur)) : V("", !0)
    ]));
  }
}), bs = /* @__PURE__ */ oe(pr, [["__scopeId", "data-v-c2efbd0c"]]), vr = ["aria-label"], mr = ["aria-checked", "data-dc-active", "tabindex", "onClick", "onKeydown"], hr = /* @__PURE__ */ le({
  __name: "SegmentedControl",
  props: {
    modelValue: {},
    options: {},
    label: {},
    mono: { type: Boolean }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const n = e, s = t, a = B([]);
    function r(o, i) {
      const l = n.options.length;
      let u = null;
      if (o.key === "ArrowRight" || o.key === "ArrowDown" ? u = (i + 1) % l : o.key === "ArrowLeft" || o.key === "ArrowUp" ? u = (i - 1 + l) % l : o.key === "Home" ? u = 0 : o.key === "End" && (u = l - 1), u === null) return;
      o.preventDefault();
      const f = n.options[u];
      f && (s("update:modelValue", f.key), a.value[u]?.focus());
    }
    return (o, i) => (m(), h("div", {
      class: "dc-segmented",
      role: "radiogroup",
      "aria-label": e.label
    }, [
      (m(!0), h(te, null, ue(e.options, (l, u) => (m(), h("button", {
        key: l.key,
        ref_for: !0,
        ref_key: "buttons",
        ref: a,
        type: "button",
        role: "radio",
        class: ua(["dc-segmented__item", { "dc-segmented__item--mono": e.mono }]),
        "aria-checked": l.key === e.modelValue,
        "data-dc-active": l.key === e.modelValue ? "true" : "false",
        tabindex: l.key === e.modelValue ? 0 : -1,
        onClick: (f) => s("update:modelValue", l.key),
        onKeydown: (f) => r(f, u)
      }, M(l.label), 43, mr))), 128))
    ], 8, vr));
  }
}), nn = /* @__PURE__ */ oe(hr, [["__scopeId", "data-v-63fb5482"]]), _r = ["id"], gr = { class: "dc-panel__section" }, yr = { class: "dc-panel__head" }, wr = { class: "dc-panel__note" }, br = { class: "dc-panel__query" }, kr = { class: "dc-panel__expression" }, $r = ["for"], xr = ["id", "placeholder", "onKeydown"], Mr = { class: "dc-panel__actions" }, Cr = ["disabled"], Er = {
  key: 0,
  class: "dc-panel__facets"
}, Pr = {
  key: 1,
  class: "dc-panel__hint"
}, Sr = { class: "dc-panel__section dc-panel__section--row" }, Ar = { class: "dc-panel__control" }, zr = { class: "dc-panel__control" }, Fr = ["title", "aria-label"], Rr = { class: "dc-panel__section" }, Tr = { class: "dc-panel__head" }, Lr = { class: "dc-panel__note" }, Dr = { class: "dc-panel__entities" }, Ir = ["data-dc-active", "aria-current"], Nr = { class: "dc-entity__head" }, Or = { class: "dc-entity__count dc-mono" }, Vr = ["data-dc-active", "aria-current", "onClick"], Kr = { class: "dc-entity__head" }, Br = { class: "dc-entity__label" }, qr = { class: "dc-entity__count dc-mono" }, Wr = { class: "dc-entity__preview dc-mono" }, Ur = /* @__PURE__ */ le({
  __name: "QueryPanel",
  props: {
    panelId: {},
    views: {}
  },
  emits: ["close"],
  setup(e, { emit: t }) {
    const n = e, s = t, a = $e(), r = {
      list: "List",
      cards: "Cards",
      grid: "Grid",
      table: "Table",
      links: "Links",
      preview: "Preview"
    }, o = _(
      () => (n.views ?? [...os]).map((y) => ({ key: y, label: r[y] }))
    ), i = _(
      () => a.sorts.value.map((y) => ({ key: y.key, label: y.label }))
    ), l = B(a.query.value.expr), u = B(null);
    Ee(
      () => a.query.value.expr,
      (y) => {
        l.value = y;
      }
    );
    const f = _(() => l.value !== a.query.value.expr), E = _(() => {
      const y = a.entity.value;
      return y ? `applies to ${y.label.toLowerCase()} · results stay behind this panel` : "applies to every entity · results stay behind this panel";
    });
    function b() {
      a.setExpression(l.value), s("close");
    }
    function g() {
      l.value = "", a.clearFilters();
    }
    function x(y, w) {
      a.setFacet(y, w);
    }
    return wt(() => u.value?.focus()), (y, w) => (m(), h("div", {
      id: e.panelId,
      class: "dc-panel",
      role: "dialog",
      "aria-label": "Query",
      onKeydown: w[5] || (w[5] = vt(Se((z) => s("close"), ["stop"]), ["esc"]))
    }, [
      p("section", gr, [
        p("header", yr, [
          w[6] || (w[6] = p("span", { class: "dc-eyebrow" }, "Query", -1)),
          p("span", wr, M(E.value), 1)
        ]),
        p("div", br, [
          p("div", kr, [
            p("label", {
              class: "dc-panel__field-label",
              for: `${e.panelId}-expr`
            }, "Expression", 8, $r),
            Qt(p("textarea", {
              id: `${e.panelId}-expr`,
              ref_key: "expressionField",
              ref: u,
              "onUpdate:modelValue": w[0] || (w[0] = (z) => l.value = z),
              class: "dc-textarea dc-mono",
              rows: "4",
              spellcheck: "false",
              placeholder: C(a).schema.value.placeholder,
              onKeydown: [
                vt(Se(b, ["meta", "prevent"]), ["enter"]),
                vt(Se(b, ["ctrl", "prevent"]), ["enter"])
              ]
            }, null, 40, xr), [
              [Zt, l.value]
            ]),
            p("div", Mr, [
              p("button", {
                type: "button",
                class: "dc-button dc-button--primary",
                onClick: b
              }, " Run query "),
              p("button", {
                type: "button",
                class: "dc-button",
                disabled: C(a).isPristine.value && !f.value,
                onClick: g
              }, " Reset ", 8, Cr)
            ])
          ]),
          C(a).entity.value ? (m(), h("div", Er, [
            (m(!0), h(te, null, ue(C(a).entity.value.facets, (z) => (m(), ge(bs, {
              key: z.key,
              facet: z,
              value: C(a).query.value.facets[z.key],
              onUpdate: (O) => x(z.key, O)
            }, null, 8, ["facet", "value", "onUpdate"]))), 128))
          ])) : (m(), h("p", Pr, " Results span every entity — logs and settings included. Pick one below to narrow to it and to get its own filters. "))
        ])
      ]),
      p("section", Sr, [
        p("div", Ar, [
          w[7] || (w[7] = p("span", { class: "dc-eyebrow" }, "View", -1)),
          ce(nn, {
            label: "Result view",
            "model-value": C(a).query.value.view,
            options: o.value,
            "onUpdate:modelValue": w[1] || (w[1] = (z) => C(a).setView(z))
          }, null, 8, ["model-value", "options"])
        ]),
        p("div", zr, [
          w[8] || (w[8] = p("span", { class: "dc-eyebrow" }, "Sort", -1)),
          ce(nn, {
            mono: "",
            label: "Sort field",
            "model-value": C(a).query.value.sort,
            options: i.value,
            "onUpdate:modelValue": w[2] || (w[2] = (z) => C(a).setSort(z))
          }, null, 8, ["model-value", "options"]),
          p("button", {
            type: "button",
            class: "dc-button dc-button--icon dc-mono",
            title: C(a).query.value.dir === "desc" ? "Descending — click to reverse" : "Ascending — click to reverse",
            "aria-label": `Sort direction: ${C(a).query.value.dir === "desc" ? "descending" : "ascending"}`,
            onClick: w[3] || (w[3] = (z) => C(a).toggleDirection())
          }, M(C(a).query.value.dir === "desc" ? "↓" : "↑"), 9, Fr)
        ])
      ]),
      p("section", Rr, [
        p("header", Tr, [
          w[9] || (w[9] = p("span", { class: "dc-eyebrow" }, "Entities", -1)),
          p("span", Lr, M(C(a).schema.value.kicker), 1)
        ]),
        p("div", Dr, [
          p("button", {
            type: "button",
            class: "dc-entity dc-entity--all",
            "data-dc-active": C(a).isEverything.value ? "true" : "false",
            "aria-current": C(a).isEverything.value ? "true" : void 0,
            onClick: w[4] || (w[4] = (z) => C(a).clearEntity())
          }, [
            p("span", Nr, [
              w[10] || (w[10] = p("span", { class: "dc-entity__label" }, "Everything", -1)),
              p("span", Or, M(C(a).entities.value.length) + " kinds", 1)
            ]),
            w[11] || (w[11] = p("span", { class: "dc-entity__preview dc-mono" }, [
              p("span", { class: "dc-truncate" }, "no entity filter"),
              p("span", { class: "dc-truncate" }, "logs and settings included")
            ], -1))
          ], 8, Ir),
          (m(!0), h(te, null, ue(C(a).entities.value, (z) => (m(), h("button", {
            key: z.key,
            type: "button",
            class: "dc-entity",
            "data-dc-active": z.key === C(a).entity.value?.key ? "true" : "false",
            "aria-current": z.key === C(a).entity.value?.key ? "true" : void 0,
            onClick: (O) => C(a).setEntity(z.key)
          }, [
            p("span", Kr, [
              p("span", Br, M(z.label), 1),
              p("span", qr, M(z.count), 1)
            ]),
            p("span", Wr, [
              (m(!0), h(te, null, ue(z.samples.slice(0, 3), (O) => (m(), h("span", {
                key: O[1],
                class: "dc-truncate"
              }, M(O[1]), 1))), 128))
            ])
          ], 8, Vr))), 128))
        ])
      ])
    ], 40, _r));
  }
}), ks = /* @__PURE__ */ oe(Ur, [["__scopeId", "data-v-22d2adf1"]]), $s = {
  primary: "Item",
  secondary: "Reference",
  metric1: "Metric",
  metric2: "Metric 2"
};
function Hr() {
  const e = $e();
  return _(() => e.entity.value?.labels ?? $s);
}
function xs(e, t, n, s) {
  return {
    row: e,
    entityLabel: e.entityLabel,
    labels: n,
    ordinal: Ca(t),
    metric1: Un(e.metric1),
    metric2: Un(e.metric2),
    date: Ma(e.updatedAt),
    score: e.score.toFixed(2),
    percent: vs(e.score),
    pinned: s
  };
}
function ct() {
  const e = $e(), t = _(
    () => new Map(e.entities.value.map((n) => [n.key, n.labels]))
  );
  return _(
    () => e.rows.value.map(
      (n, s) => xs(n, s, t.value.get(n.entityKey) ?? $s, e.isPinned(n))
    )
  );
}
const Xr = ["data-dc-status"], Gr = /* @__PURE__ */ le({
  __name: "StatusPill",
  props: {
    status: {}
  },
  setup(e) {
    return (t, n) => (m(), h("span", {
      class: "dc-pill",
      "data-dc-status": e.status
    }, M(e.status), 9, Xr));
  }
}), bt = /* @__PURE__ */ oe(Gr, [["__scopeId", "data-v-23e59fbf"]]), Yr = ["data-dc-active", "aria-pressed", "aria-label"], jr = /* @__PURE__ */ le({
  __name: "PinStar",
  props: {
    row: {},
    pinned: { type: Boolean }
  },
  setup(e) {
    const t = e, n = $e();
    function s(a) {
      a.stopPropagation(), n.togglePin(t.row);
    }
    return (a, r) => (m(), h("button", {
      type: "button",
      class: "dc-star",
      "data-dc-active": e.pinned ? "true" : "false",
      "aria-pressed": e.pinned,
      "aria-label": e.pinned ? `Unpin ${e.row.primary}` : `Pin ${e.row.primary}`,
      onClick: s
    }, M(e.pinned ? "★" : "☆"), 9, Yr));
  }
}), wn = /* @__PURE__ */ oe(jr, [["__scopeId", "data-v-890e0fb5"]]), Qr = { class: "dc-cards" }, Zr = { class: "dc-card__top dc-mono" }, Jr = {
  key: 0,
  class: "dc-card__entity"
}, el = { class: "dc-card__top-right" }, tl = ["onClick"], nl = { class: "dc-card__primary" }, sl = { class: "dc-card__secondary dc-mono" }, al = { class: "dc-card__metrics dc-mono" }, rl = { class: "dc-card__date" }, ll = /* @__PURE__ */ le({
  __name: "CardsView",
  setup(e) {
    const t = $e(), n = ct(), s = _(() => t.isEverything.value);
    return (a, r) => (m(), h("div", Qr, [
      (m(!0), h(te, null, ue(C(n), (o) => (m(), h("div", {
        key: o.row.id,
        class: "dc-card"
      }, [
        p("div", Zr, [
          p("span", null, [
            At(M(o.ordinal) + " ", 1),
            s.value ? (m(), h("span", Jr, M(o.entityLabel), 1)) : V("", !0)
          ]),
          p("span", el, [
            ce(bt, {
              status: o.row.status
            }, null, 8, ["status"]),
            C(t).pinnable.value ? (m(), ge(wn, {
              key: 0,
              row: o.row,
              pinned: o.pinned
            }, null, 8, ["row", "pinned"])) : V("", !0)
          ])
        ]),
        p("button", {
          type: "button",
          class: "dc-card__open",
          onClick: (i) => C(t).activate(o.row)
        }, [
          p("span", nl, M(o.row.primary), 1),
          p("span", sl, M(o.row.secondary), 1)
        ], 8, tl),
        p("div", al, [
          p("span", null, M(o.labels.metric1) + " " + M(o.metric1), 1),
          p("span", null, M(o.labels.metric2) + " " + M(o.metric2), 1),
          p("span", rl, M(o.date), 1)
        ])
      ]))), 128))
    ]));
  }
}), Ms = /* @__PURE__ */ oe(ll, [["__scopeId", "data-v-47fffd2f"]]), ol = { class: "dc-grid" }, il = ["onClick"], cl = { class: "dc-tile__scrim" }, ul = { class: "dc-tile__top dc-mono" }, dl = { class: "dc-tile__chip" }, fl = { class: "dc-tile__chip" }, pl = { class: "dc-tile__caption" }, vl = { class: "dc-tile__secondary dc-truncate" }, ml = { class: "dc-tile__primary" }, hl = /* @__PURE__ */ le({
  __name: "GridView",
  setup(e) {
    const t = $e(), n = ct();
    return (s, a) => (m(), h("div", ol, [
      (m(!0), h(te, null, ue(C(n), (r) => (m(), h("button", {
        key: r.row.id,
        type: "button",
        class: "dc-tile",
        style: ze({ "--dc-tile-tint": r.row.tint }),
        onClick: (o) => C(t).activate(r.row)
      }, [
        p("span", cl, [
          p("span", ul, [
            p("span", dl, M(r.ordinal), 1),
            p("span", fl, M(r.score), 1)
          ]),
          p("span", pl, [
            p("span", vl, M(r.row.secondary), 1),
            p("span", ml, M(r.row.primary), 1)
          ])
        ])
      ], 12, il))), 128))
    ]));
  }
}), Cs = /* @__PURE__ */ oe(hl, [["__scopeId", "data-v-c39dab2f"]]), _l = { class: "dc-links" }, gl = ["onClick"], yl = { class: "dc-link__primary dc-truncate" }, wl = { class: "dc-link__secondary dc-mono dc-truncate" }, bl = /* @__PURE__ */ le({
  __name: "LinksView",
  setup(e) {
    const t = $e(), n = ct();
    return (s, a) => (m(), h("div", _l, [
      (m(!0), h(te, null, ue(C(n), (r) => (m(), h("button", {
        key: r.row.id,
        type: "button",
        class: "dc-link",
        onClick: (o) => C(t).activate(r.row)
      }, [
        p("span", yl, M(r.row.primary), 1),
        p("span", wl, M(r.row.secondary), 1)
      ], 8, gl))), 128))
    ]));
  }
}), Es = /* @__PURE__ */ oe(bl, [["__scopeId", "data-v-e21922c7"]]), kl = ["aria-valuenow", "aria-label", "title"], $l = /* @__PURE__ */ le({
  __name: "ScoreMeter",
  props: {
    value: {},
    label: {}
  },
  setup(e) {
    const t = e, n = _(() => vs(t.value));
    return (s, a) => (m(), h("span", {
      class: "dc-meter",
      role: "meter",
      "aria-valuemin": "0",
      "aria-valuemax": "100",
      "aria-valuenow": Math.round(e.value * 100),
      "aria-label": e.label ?? "Score",
      title: `${e.label ?? "Score"} ${n.value}`
    }, [
      p("span", {
        class: "dc-meter__fill",
        style: ze({ width: n.value })
      }, null, 4)
    ], 8, kl));
  }
}), Ps = /* @__PURE__ */ oe($l, [["__scopeId", "data-v-ab794776"]]), xl = {
  class: "dc-list",
  role: "list"
}, Ml = ["onClick"], Cl = { class: "dc-list__ordinal dc-mono" }, El = { class: "dc-list__identity" }, Pl = { class: "dc-list__primary dc-truncate" }, Sl = { class: "dc-list__secondary dc-mono dc-truncate" }, Al = {
  key: 0,
  class: "dc-list__entity dc-mono"
}, zl = { class: "dc-list__metrics dc-mono" }, Fl = ["title"], Rl = ["title"], Tl = { class: "dc-list__trailing" }, Ll = /* @__PURE__ */ le({
  __name: "ListView",
  setup(e) {
    const t = $e(), n = ct(), s = _(() => t.isEverything.value);
    return (a, r) => (m(), h("div", xl, [
      (m(!0), h(te, null, ue(C(n), (o) => (m(), h("div", {
        key: o.row.id,
        class: "dc-list__row",
        role: "listitem"
      }, [
        p("button", {
          type: "button",
          class: "dc-list__open",
          onClick: (i) => C(t).activate(o.row)
        }, [
          p("span", Cl, M(o.ordinal), 1),
          p("span", El, [
            p("span", Pl, M(o.row.primary), 1),
            p("span", Sl, M(o.row.secondary), 1)
          ]),
          s.value ? (m(), h("span", Al, M(o.entityLabel), 1)) : V("", !0),
          p("span", zl, [
            p("span", {
              title: o.labels.metric1
            }, M(o.metric1), 9, Fl),
            p("span", {
              title: o.labels.metric2
            }, M(o.metric2), 9, Rl),
            ce(Ps, {
              value: o.row.score
            }, null, 8, ["value"])
          ])
        ], 8, Ml),
        p("span", Tl, [
          ce(bt, {
            status: o.row.status
          }, null, 8, ["status"]),
          C(t).pinnable.value ? (m(), ge(wn, {
            key: 0,
            row: o.row,
            pinned: o.pinned
          }, null, 8, ["row", "pinned"])) : V("", !0)
        ])
      ]))), 128))
    ]));
  }
}), sn = /* @__PURE__ */ oe(Ll, [["__scopeId", "data-v-922176e3"]]), Dl = { class: "dc-preview" }, Il = { class: "dc-preview__pager dc-mono" }, Nl = ["disabled"], Ol = { "aria-live": "polite" }, Vl = ["disabled"], Kl = {
  key: 0,
  class: "dc-preview__card"
}, Bl = { class: "dc-preview__body" }, ql = { class: "dc-preview__top" }, Wl = { class: "dc-preview__badges" }, Ul = { class: "dc-preview__entity dc-mono" }, Hl = { class: "dc-preview__primary" }, Xl = { class: "dc-preview__secondary dc-mono" }, Gl = { class: "dc-preview__fields" }, Yl = { class: "dc-preview__key" }, jl = { class: "dc-preview__value dc-mono" }, Ql = /* @__PURE__ */ le({
  __name: "PreviewView",
  setup(e) {
    const t = $e(), n = ct(), s = B(0);
    Ee(n, (l) => {
      s.value > l.length - 1 && (s.value = Math.max(0, l.length - 1));
    });
    const a = _(() => n.value[s.value]), r = _(() => {
      const l = a.value;
      return l ? [
        { key: l.labels.secondary, value: l.row.secondary },
        { key: l.labels.metric1, value: l.metric1 },
        { key: l.labels.metric2, value: l.metric2 },
        { key: "Updated", value: l.date }
      ] : [];
    }), o = _(() => {
      if (!n.value.length) return "0 / 0";
      const l = t.total.value > n.value.length ? ` of ${t.total.value}` : "";
      return `${s.value + 1} / ${n.value.length}${l}`;
    }), i = (l) => {
      const u = n.value.length;
      u && (s.value = Math.min(u - 1, Math.max(0, s.value + l)));
    };
    return (l, u) => (m(), h("div", Dl, [
      p("div", Il, [
        p("button", {
          type: "button",
          class: "dc-preview__step",
          "aria-label": "Previous result",
          disabled: s.value === 0,
          onClick: u[0] || (u[0] = (f) => i(-1))
        }, " ‹ ", 8, Nl),
        p("span", Ol, M(o.value), 1),
        p("button", {
          type: "button",
          class: "dc-preview__step",
          "aria-label": "Next result",
          disabled: s.value >= C(n).length - 1,
          onClick: u[1] || (u[1] = (f) => i(1))
        }, " › ", 8, Vl)
      ]),
      a.value ? (m(), h("div", Kl, [
        p("div", {
          class: "dc-preview__media",
          style: ze({ background: a.value.row.tint }),
          "aria-hidden": "true"
        }, " preview ", 4),
        p("div", Bl, [
          p("div", ql, [
            p("span", Wl, [
              ce(bt, {
                status: a.value.row.status
              }, null, 8, ["status"]),
              p("span", Ul, M(a.value.entityLabel), 1)
            ]),
            C(t).pinnable.value ? (m(), ge(wn, {
              key: 0,
              row: a.value.row,
              pinned: a.value.pinned
            }, null, 8, ["row", "pinned"])) : V("", !0)
          ]),
          p("div", null, [
            p("div", Hl, M(a.value.row.primary), 1),
            p("div", Xl, M(a.value.row.secondary), 1)
          ]),
          p("dl", Gl, [
            (m(!0), h(te, null, ue(r.value, (f) => (m(), h("div", {
              key: f.key,
              class: "dc-preview__field"
            }, [
              p("dt", Yl, M(f.key), 1),
              p("dd", jl, M(f.value), 1)
            ]))), 128))
          ]),
          p("button", {
            type: "button",
            class: "dc-preview__open",
            onClick: u[2] || (u[2] = (f) => C(t).activate(a.value.row))
          }, " Open record → ")
        ])
      ])) : V("", !0)
    ]));
  }
}), Ss = /* @__PURE__ */ oe(Ql, [["__scopeId", "data-v-35517a68"]]), Zl = { class: "dc-table" }, Jl = ["aria-sort"], eo = { scope: "col" }, to = {
  key: 0,
  class: "dc-table__entity",
  scope: "col"
}, no = ["aria-sort"], so = {
  class: "dc-table__number",
  scope: "col"
}, ao = ["aria-sort"], ro = ["onClick"], lo = { class: "dc-table__num dc-mono" }, oo = { class: "dc-table__primary" }, io = ["onClick"], co = { class: "dc-table__muted dc-mono" }, uo = {
  key: 0,
  class: "dc-table__entity dc-mono"
}, fo = { class: "dc-table__number dc-mono" }, po = { class: "dc-table__number dc-mono" }, vo = { class: "dc-table__muted dc-mono" }, mo = /* @__PURE__ */ le({
  __name: "TableView",
  setup(e) {
    const t = $e(), n = ct(), s = Hr(), a = _(() => t.isEverything.value);
    function r(l) {
      t.query.value.sort === l ? t.toggleDirection() : t.setSort(l);
    }
    const o = (l) => t.query.value.sort !== l ? "none" : t.query.value.dir === "desc" ? "descending" : "ascending", i = _(() => new Set(t.sorts.value.map((l) => l.key)));
    return (l, u) => (m(), h("table", Zl, [
      p("thead", null, [
        p("tr", null, [
          u[3] || (u[3] = p("th", {
            class: "dc-table__num",
            scope: "col"
          }, " # ", -1)),
          p("th", {
            scope: "col",
            "aria-sort": o("name")
          }, [
            i.value.has("name") ? (m(), h("button", {
              key: 0,
              type: "button",
              class: "dc-table__sort",
              onClick: u[0] || (u[0] = (f) => r("name"))
            }, M(C(s).primary), 1)) : (m(), h(te, { key: 1 }, [
              At(M(C(s).primary), 1)
            ], 64))
          ], 8, Jl),
          p("th", eo, M(C(s).secondary), 1),
          a.value ? (m(), h("th", to, " Entity ")) : V("", !0),
          p("th", {
            class: "dc-table__number",
            scope: "col",
            "aria-sort": o("metric1")
          }, [
            i.value.has("metric1") ? (m(), h("button", {
              key: 0,
              type: "button",
              class: "dc-table__sort",
              onClick: u[1] || (u[1] = (f) => r("metric1"))
            }, M(C(s).metric1), 1)) : (m(), h(te, { key: 1 }, [
              At(M(C(s).metric1), 1)
            ], 64))
          ], 8, no),
          p("th", so, M(C(s).metric2), 1),
          p("th", {
            class: "dc-table__date",
            scope: "col",
            "aria-sort": o("updated")
          }, [
            i.value.has("updated") ? (m(), h("button", {
              key: 0,
              type: "button",
              class: "dc-table__sort",
              onClick: u[2] || (u[2] = (f) => r("updated"))
            }, " Updated ")) : (m(), h(te, { key: 1 }, [
              At(" Updated ")
            ], 64))
          ], 8, ao),
          u[4] || (u[4] = p("th", {
            class: "dc-table__state",
            scope: "col"
          }, " State ", -1))
        ])
      ]),
      p("tbody", null, [
        (m(!0), h(te, null, ue(C(n), (f) => (m(), h("tr", {
          key: f.row.id,
          class: "dc-table__row",
          onClick: (E) => C(t).activate(f.row)
        }, [
          p("td", lo, M(f.ordinal), 1),
          p("td", oo, [
            p("button", {
              type: "button",
              class: "dc-table__open",
              onClick: Se((E) => C(t).activate(f.row), ["stop"])
            }, M(f.row.primary), 9, io)
          ]),
          p("td", co, M(f.row.secondary), 1),
          a.value ? (m(), h("td", uo, M(f.entityLabel), 1)) : V("", !0),
          p("td", fo, M(f.metric1), 1),
          p("td", po, M(f.metric2), 1),
          p("td", vo, M(f.date), 1),
          p("td", null, [
            ce(bt, {
              status: f.row.status
            }, null, 8, ["status"])
          ])
        ], 8, ro))), 128))
      ])
    ]));
  }
}), As = /* @__PURE__ */ oe(mo, [["__scopeId", "data-v-2b15b09a"]]);
function ho(e) {
  const t = Tt([]), n = B(!1), s = Tt(null);
  let a = 0;
  const r = (l, u, f) => ({
    entity: l,
    rows: u.rows.map(
      (E, b) => xs(E, b, l.labels, e.isPinned(E.id))
    ),
    total: u.total,
    count: f ? l.count : String(u.total)
  }), o = () => {
    const l = ++a, u = e.query.value, f = e.schema.value, E = e.entities.value, b = e.limit.value, g = fn(u), x = E.map((y) => ({
      entity: y,
      // Scope the query to this entity, keeping the expression and ordering
      // but dropping facets, which belong to whichever entity is selected.
      outcome: e.source.value.query({
        query: { ...u, entity: y.key, facets: It(y) },
        schema: f,
        entity: y,
        limit: b
      })
    }));
    if (x.every(({ outcome: y }) => !(y instanceof Promise))) {
      t.value = x.map(
        ({ entity: y, outcome: w }) => r(y, w, g)
      ), s.value = null, n.value = !1;
      return;
    }
    n.value = !0, Promise.all(x.map(({ outcome: y }) => Promise.resolve(y))).then((y) => {
      l === a && (t.value = y.map(
        (w, z) => r(x[z].entity, w, g)
      ), s.value = null);
    }).catch((y) => {
      l === a && (s.value = y, t.value = []);
    }).finally(() => {
      l === a && (n.value = !1);
    });
  }, i = () => {
    try {
      o();
    } catch (l) {
      s.value = l, t.value = [], n.value = !1;
    }
  };
  return Ee(
    [e.source, e.schema, e.query, e.entities, e.limit],
    i,
    { immediate: !0 }
  ), { previews: t, pending: n, error: s, refresh: i };
}
const _o = {
  key: 0,
  class: "dc-types__state",
  role: "alert"
}, go = {
  key: 1,
  class: "dc-types__state",
  "aria-live": "polite"
}, yo = ["data-dc-pending"], wo = ["data-dc-empty"], bo = ["onClick"], ko = { class: "dc-type__name" }, $o = { class: "dc-type__count dc-mono" }, xo = { class: "dc-type__sr" }, Mo = {
  key: 0,
  class: "dc-type__empty"
}, Co = ["onClick"], Eo = { class: "dc-type__identity" }, Po = { class: "dc-type__primary dc-truncate" }, So = { class: "dc-type__secondary dc-mono dc-truncate" }, Ao = { class: "dc-type__trailing dc-mono" }, zo = { class: "dc-type__metric" }, Fo = { class: "dc-type__metric-value" }, Ro = { class: "dc-type__metric-label" }, To = { class: "dc-type__date" }, Lo = /* @__PURE__ */ le({
  __name: "TypeCardsView",
  setup(e) {
    const t = $e(), { previews: n, pending: s, error: a } = ho({
      source: t.source,
      schema: t.schema,
      query: t.query,
      entities: t.entities,
      limit: t.previewsPerType,
      isPinned: (o) => t.isPinnedId(o)
    }), r = _(() => !t.isPristine.value);
    return (o, i) => C(a) ? (m(), h("p", _o, " Could not load results: " + M(C(a) instanceof Error ? C(a).message : "the data source failed."), 1)) : !C(n).length && C(s) ? (m(), h("p", go, " Running query… ")) : (m(), h("div", {
      key: 2,
      class: "dc-types",
      "data-dc-pending": C(s) ? "true" : "false"
    }, [
      (m(!0), h(te, null, ue(C(n), (l) => (m(), h("section", {
        key: l.entity.key,
        class: "dc-type",
        "data-dc-empty": l.rows.length ? "false" : "true"
      }, [
        p("button", {
          type: "button",
          class: "dc-type__head",
          onClick: (u) => C(t).setEntity(l.entity.key)
        }, [
          p("span", ko, M(l.entity.label), 1),
          p("span", $o, M(l.count), 1),
          i[0] || (i[0] = p("span", {
            class: "dc-type__go",
            "aria-hidden": "true"
          }, "→", -1)),
          p("span", xo, "Show only " + M(l.entity.label.toLowerCase()), 1)
        ], 8, bo),
        l.rows.length ? V("", !0) : (m(), h("p", Mo, M(r.value ? "No matches" : "Nothing here yet"), 1)),
        (m(!0), h(te, null, ue(l.rows, (u) => (m(), h("button", {
          key: u.row.id,
          type: "button",
          class: "dc-type__row",
          onClick: (f) => C(t).activate(u.row)
        }, [
          p("span", Eo, [
            p("span", Po, M(u.row.primary), 1),
            p("span", So, M(u.row.secondary), 1)
          ]),
          p("span", Ao, [
            p("span", zo, [
              p("span", Fo, M(u.metric1), 1),
              p("span", Ro, M(u.labels.metric1), 1)
            ]),
            p("span", To, M(u.date), 1)
          ])
        ], 8, Co))), 128))
      ], 8, wo))), 128))
    ], 8, yo));
  }
}), zs = /* @__PURE__ */ oe(Lo, [["__scopeId", "data-v-887d72ab"]]), Do = ["data-dc-pending"], Io = {
  key: 0,
  class: "dc-results__state",
  role: "alert"
}, No = { class: "dc-results__detail" }, Oo = {
  key: 2,
  class: "dc-results__state",
  "aria-live": "polite"
}, Vo = {
  key: 3,
  class: "dc-results__state"
}, Ko = { class: "dc-results__detail" }, Bo = /* @__PURE__ */ le({
  __name: "ResultsArea",
  setup(e) {
    const t = $e(), n = {
      list: sn,
      cards: Ms,
      grid: Cs,
      table: As,
      links: Es,
      preview: Ss
    }, s = _(
      () => t.isEverything.value && t.query.value.view === "cards"
    ), a = _(() => n[t.query.value.view] ?? sn), r = _(() => t.rows.value.length > 0), o = _(() => t.error.value !== null);
    return (i, l) => (m(), h("div", {
      class: "dc-results",
      "data-dc-pending": C(t).pending.value ? "true" : "false"
    }, [
      o.value ? (m(), h("p", Io, [
        l[1] || (l[1] = p("span", { class: "dc-results__headline" }, "Could not load results", -1)),
        p("span", No, M(C(t).error.value instanceof Error ? C(t).error.value.message : "The data source failed."), 1)
      ])) : s.value ? (m(), ge(zs, { key: 1 })) : !r.value && C(t).pending.value ? (m(), h("p", Oo, [...l[2] || (l[2] = [
        p("span", { class: "dc-results__detail" }, "Running query…", -1)
      ])])) : r.value ? (m(), ge(da(a.value), { key: 4 })) : (m(), h("div", Vo, [
        l[3] || (l[3] = p("span", { class: "dc-results__headline" }, "Nothing matches this query", -1)),
        p("span", Ko, M(C(t).summary.value), 1),
        C(t).isPristine.value ? V("", !0) : (m(), h("button", {
          key: 0,
          type: "button",
          class: "dc-results__clear",
          onClick: l[0] || (l[0] = (u) => C(t).clearFilters())
        }, M(C(t).isEverything.value ? "Clear filters" : "Search everything instead"), 1))
      ]))
    ], 8, Do));
  }
}), Fs = /* @__PURE__ */ oe(Bo, [["__scopeId", "data-v-85cfe37a"]]), qo = ["data-dc-theme"], Wo = { class: "dc-shell__head" }, Uo = { class: "dc-shell__panel" }, Ho = /* @__PURE__ */ le({
  __name: "DataShell",
  props: /* @__PURE__ */ Dt({
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
    pinnable: { type: Boolean },
    navigationMode: { default: "push" },
    facetNavigationMode: { default: "replace" }
  }, {
    open: { type: Boolean, default: !1 },
    openModifiers: {},
    pinned: { default: () => [] },
    pinnedModifiers: {}
  }),
  emits: /* @__PURE__ */ Dt(["activate", "query-change", "toggle-pin"], ["update:open", "update:pinned"]),
  setup(e, { expose: t, emit: n }) {
    const s = e, a = n, r = Lt(e, "open"), o = Lt(e, "pinned"), i = ss(), l = rt(ls, null), u = s.route || l ? null : _a(), f = s.route ?? l ?? u;
    Ve(() => u?.dispose?.());
    const E = _(() => za({ seed: s.schema.key })), b = _(() => s.source ?? E.value), g = Ka({
      schema: () => s.schema,
      adapter: f,
      defaults: () => s.defaults,
      navigationMode: () => s.navigationMode,
      facetNavigationMode: () => s.facetNavigationMode
    }), x = Ba({
      source: b,
      query: g.query,
      schema: _(() => s.schema),
      entity: g.entity,
      limit: _(() => s.limit)
    });
    Ee(g.query, (F) => a("query-change", F));
    const y = as() ?? "dc-query-panel", w = B(null);
    function z() {
      r.value && (r.value = !1, wt(() => {
        w.value?.$el?.querySelector(".dc-header__trigger")?.focus();
      }));
    }
    const O = _(() => new Set(o.value));
    function U(F) {
      const $ = new Set(O.value);
      $.has(F.id) ? $.delete(F.id) : $.add(F.id), o.value = [...$], a("toggle-pin", F);
    }
    const L = Fa({
      ...g,
      schema: _(() => s.schema),
      entities: _(() => s.schema.entities),
      rows: x.rows,
      total: x.total,
      pending: x.pending,
      error: x.error,
      source: b,
      previewsPerType: _(() => s.previewsPerType),
      pinnable: _(() => s.pinnable === !0),
      isPinned: (F) => O.value.has(F.id),
      isPinnedId: (F) => O.value.has(F),
      togglePin: U,
      activate: (F) => a("activate", F)
    }), D = _(() => {
      if (!(!s.accent && !s.tokens))
        return { ...s.tokens, ...s.accent ? { "--dc-accent": s.accent } : {} };
    });
    return t({
      query: g.query,
      openPanel: () => {
        r.value = !0;
      },
      closePanel: z
    }), (F, $) => (m(), h("div", {
      class: "dc-shell",
      "data-dc-theme": e.theme,
      style: ze(D.value)
    }, [
      p("div", Wo, [
        ce(ws, {
          ref_key: "headerRef",
          ref: w,
          expanded: r.value,
          "panel-id": C(y),
          onToggle: $[0] || ($[0] = (A) => r.value = !r.value)
        }, fa({ _: 2 }, [
          i.actions ? {
            name: "actions",
            fn: Jt(() => [
              yt(F.$slots, "actions", {}, void 0, !0)
            ]),
            key: "0"
          } : void 0
        ]), 1032, ["expanded", "panel-id"]),
        r.value ? (m(), h(te, { key: 0 }, [
          p("div", {
            class: "dc-shell__scrim",
            onClick: z
          }),
          p("div", Uo, [
            ce(ks, {
              "panel-id": C(y),
              views: e.views,
              onClose: z
            }, null, 8, ["panel-id", "views"])
          ])
        ], 64)) : V("", !0)
      ]),
      yt(F.$slots, "results", {
        rows: C(L).rows.value,
        total: C(L).total.value,
        query: C(L).query.value,
        pending: C(L).pending.value
      }, () => [
        ce(Fs)
      ], !0)
    ], 12, qo));
  }
}), Xo = /* @__PURE__ */ oe(Ho, [["__scopeId", "data-v-45a48e94"]]), mt = (e) => e.separator !== !0 && e.heading !== !0 && e.disabled !== !0, Go = ["aria-label"], Yo = ["role", "aria-label"], jo = ["data-dc-item"], Qo = {
  key: 0,
  class: "dc-menu__rule",
  role: "separator"
}, Zo = ["role", "aria-checked", "aria-haspopup", "aria-expanded", "aria-disabled", "disabled", "data-dc-item", "onClick", "onMouseenter"], Jo = {
  class: "dc-menu__mark",
  "aria-hidden": "true"
}, ei = { class: "dc-menu__label dc-truncate" }, ti = {
  key: 0,
  class: "dc-menu__key dc-mono"
}, ni = {
  key: 1,
  class: "dc-menu__more",
  "aria-hidden": "true"
}, si = /* @__PURE__ */ le({
  __name: "MenuList",
  props: {
    items: {},
    at: {},
    label: {},
    autofocus: { type: Boolean }
  },
  emits: ["choose", "dismiss"],
  setup(e, { expose: t, emit: n }) {
    const s = e, a = n, r = B(null), o = B([]), i = B(null), l = B(null), u = B(null), f = B(!1), E = _(
      () => s.items.flatMap(($, A) => mt($) ? [A] : [])
    ), b = _(() => {
      const $ = [{ entries: [] }];
      return s.items.forEach((A, G) => {
        A.heading ? $.push({ heading: A, entries: [] }) : $[$.length - 1]?.entries.push({ item: A, index: G });
      }), $.filter((A) => A.entries.length > 0);
    }), g = B({ x: s.at.x, y: s.at.y });
    async function x() {
      g.value = { x: s.at.x, y: s.at.y }, await wt();
      const $ = r.value?.getBoundingClientRect();
      if (!$) return;
      const A = 8;
      let G = s.at.x, j = s.at.y;
      if (G + $.width > window.innerWidth - A) {
        const de = s.at.mirrorX === void 0 ? null : s.at.mirrorX - $.width;
        G = de !== null && de >= A ? de : window.innerWidth - $.width - A;
      }
      j + $.height > window.innerHeight - A && (j = window.innerHeight - $.height - A), g.value = { x: Math.max(A, G), y: Math.max(A, j) };
    }
    const y = _(() => ({ left: `${g.value.x}px`, top: `${g.value.y}px` }));
    function w($) {
      i.value = $, $ !== null && wt(() => o.value[$]?.focus());
    }
    function z($, A) {
      const G = E.value;
      if (G.length === 0) return null;
      if ($ === null) return A === 1 ? G[0] ?? null : G[G.length - 1] ?? null;
      const j = G.indexOf($);
      return j === -1 ? G[0] ?? null : G[(j + A + G.length) % G.length] ?? null;
    }
    function O($, A) {
      if (!s.items[$]?.items?.length) return;
      const j = o.value[$]?.getBoundingClientRect(), de = r.value?.getBoundingClientRect();
      !j || !de || (u.value = { x: de.right - 4, y: j.top - 4, mirrorX: de.left + 4 }, l.value = $, f.value = A);
    }
    function U($) {
      const A = l.value;
      l.value = null, u.value = null, $ && A !== null && w(A);
    }
    function L($) {
      const A = s.items[$];
      if (!(!A || !mt(A))) {
        if (A.items?.length) {
          O($, !0);
          return;
        }
        a("choose", A);
      }
    }
    function D($) {
      const A = $.key;
      if (A === "Escape") {
        $.preventDefault(), $.stopPropagation(), l.value !== null ? U(!0) : a("dismiss");
        return;
      }
      if (A === "ArrowDown" || A === "ArrowUp") {
        $.preventDefault(), $.stopPropagation(), U(!1), w(z(i.value, A === "ArrowDown" ? 1 : -1));
        return;
      }
      if (A === "Home" || A === "End") {
        $.preventDefault(), $.stopPropagation(), U(!1), w(z(null, A === "Home" ? 1 : -1));
        return;
      }
      if (A === "ArrowRight") {
        const G = i.value;
        G !== null && s.items[G]?.items?.length && ($.preventDefault(), $.stopPropagation(), O(G, !0));
        return;
      }
      if (A === "ArrowLeft") {
        l.value !== null && ($.preventDefault(), $.stopPropagation(), U(!0));
        return;
      }
      if (A === "Enter" || A === " ") {
        const G = i.value;
        if (G === null) return;
        $.preventDefault(), $.stopPropagation(), L(G);
      }
    }
    function F($) {
      const A = s.items[$];
      !A || !mt(A) || (l.value !== null && l.value !== $ && U(!1), w($), A.items?.length && O($, !1));
    }
    return pa(() => {
      x(), s.autofocus && w(z(null, 1));
    }), Ee(() => s.at, x, { deep: !0 }), Ee(() => s.items, () => void x(), { deep: !0 }), Ve(() => {
      l.value = null;
    }), t({ root: r }), ($, A) => {
      const G = rs("MenuList", !0);
      return m(), h("div", {
        ref_key: "root",
        ref: r,
        class: "dc-menu",
        role: "menu",
        "aria-label": e.label,
        style: ze(y.value),
        onKeydown: D
      }, [
        (m(!0), h(te, null, ue(b.value, (j, de) => (m(), h("div", {
          key: `${de}-${j.heading?.label ?? ""}`,
          class: "dc-menu__group",
          role: j.heading ? "group" : "none",
          "aria-label": j.heading?.label
        }, [
          j.heading ? (m(), h("div", {
            key: 0,
            class: "dc-menu__heading dc-truncate",
            "aria-hidden": "true",
            "data-dc-item": j.heading.id
          }, M(j.heading.label), 9, jo)) : V("", !0),
          (m(!0), h(te, null, ue(j.entries, ({ item: Z, index: T }) => (m(), h(te, {
            key: Z.id ?? `${T}-${Z.label ?? ""}`
          }, [
            Z.separator ? (m(), h("div", Qo)) : (m(), h("button", {
              key: 1,
              ref_for: !0,
              ref: (K) => {
                K && (o.value[T] = K);
              },
              type: "button",
              class: "dc-menu__item",
              role: Z.checked === void 0 ? "menuitem" : "menuitemcheckbox",
              "aria-checked": Z.checked === void 0 ? void 0 : Z.checked,
              "aria-haspopup": Z.items?.length ? "menu" : void 0,
              "aria-expanded": Z.items?.length ? l.value === T : void 0,
              "aria-disabled": Z.disabled ? "true" : void 0,
              disabled: Z.disabled,
              "data-dc-item": Z.id,
              tabindex: "-1",
              onClick: (K) => L(T),
              onMouseenter: (K) => F(T)
            }, [
              p("span", Jo, M(Z.checked ? "✓" : ""), 1),
              p("span", ei, M(Z.label), 1),
              Z.shortcut ? (m(), h("span", ti, M(Z.shortcut), 1)) : Z.items?.length ? (m(), h("span", ni, "›")) : V("", !0)
            ], 40, Zo))
          ], 64))), 128))
        ], 8, Yo))), 128)),
        l.value !== null && u.value ? (m(), ge(G, {
          key: l.value,
          items: e.items[l.value]?.items ?? [],
          at: u.value,
          label: e.items[l.value]?.label,
          autofocus: f.value,
          onChoose: A[0] || (A[0] = (j) => a("choose", j)),
          onDismiss: A[1] || (A[1] = (j) => U(!0))
        }, null, 8, ["items", "at", "label", "autofocus"])) : V("", !0)
      ], 44, Go);
    };
  }
}), Rs = /* @__PURE__ */ oe(si, [["__scopeId", "data-v-9b1413fa"]]), ai = ["data-dc-theme", "aria-label"], ri = ["aria-expanded", "aria-disabled", "disabled", "data-dc-menu", "tabindex", "onClick", "onMouseenter"], li = /* @__PURE__ */ le({
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
    const n = e, s = _(() => {
      if (!(!n.accent && !n.tokens))
        return { ...n.tokens, ...n.accent ? { "--dc-accent": n.accent } : {} };
    }), a = t, r = B(null), o = B([]), i = B(null), l = B(null), u = B(!1), f = _(
      () => n.menus.flatMap((L, D) => mt(L) ? [D] : [])
    );
    function E(L, D) {
      const F = o.value[L]?.getBoundingClientRect(), $ = n.menus[L];
      !F || !$ || !mt($) || (l.value = { x: F.left, y: F.bottom + 2, mirrorX: F.right }, i.value = L, u.value = D);
    }
    function b(L) {
      const D = i.value;
      i.value = null, l.value = null, L && D !== null && o.value[D]?.focus();
    }
    function g(L) {
      i.value === L ? b(!0) : E(L, !1);
    }
    function x(L) {
      i.value === null || i.value === L || E(L, !1);
    }
    function y(L, D) {
      const F = f.value;
      if (F.length === 0) return null;
      if (L === null) return D === 1 ? F[0] ?? null : F[F.length - 1] ?? null;
      const $ = F.indexOf(L);
      return $ === -1 ? F[0] ?? null : F[($ + D + F.length) % F.length] ?? null;
    }
    function w(L) {
      const D = L.key;
      if (D === "Escape") {
        if (i.value === null) return;
        L.preventDefault(), b(!0);
        return;
      }
      if (D === "ArrowDown" && i.value === null) {
        const A = z();
        if (A === null) return;
        L.preventDefault(), E(A, !0);
        return;
      }
      if (D !== "ArrowLeft" && D !== "ArrowRight") return;
      const F = i.value ?? z(), $ = y(F, D === "ArrowRight" ? 1 : -1);
      $ !== null && (L.preventDefault(), i.value !== null ? E($, !0) : o.value[$]?.focus());
    }
    function z() {
      const L = o.value.findIndex((D) => D === document.activeElement);
      return L === -1 ? f.value[0] ?? null : L;
    }
    function O(L) {
      const D = L.target;
      !D || r.value?.contains(D) || b(!1);
    }
    Ee(i, (L) => {
      L !== null ? window.addEventListener("pointerdown", O, !0) : window.removeEventListener("pointerdown", O, !0);
    }), Ve(() => window.removeEventListener("pointerdown", O, !0));
    function U(L) {
      b(!0), L.action?.(), a("choose", L);
    }
    return (L, D) => (m(), h("div", {
      ref_key: "bar",
      ref: r,
      class: "dc-shell dc-menubar",
      role: "menubar",
      "data-dc-theme": e.theme,
      "aria-label": e.label ?? "Main menu",
      style: ze(s.value),
      onKeydown: w
    }, [
      (m(!0), h(te, null, ue(e.menus, (F, $) => (m(), h("button", {
        key: F.id ?? F.label ?? $,
        ref_for: !0,
        ref: (A) => {
          A && (o.value[$] = A);
        },
        type: "button",
        class: "dc-menubar__item",
        role: "menuitem",
        "aria-haspopup": "menu",
        "aria-expanded": i.value === $,
        "aria-disabled": F.disabled ? "true" : void 0,
        disabled: F.disabled,
        "data-dc-menu": F.id ?? F.label,
        tabindex: $ === (f.value[0] ?? 0) ? 0 : -1,
        onClick: (A) => g($),
        onMouseenter: (A) => x($)
      }, M(F.label), 41, ri))), 128)),
      i.value !== null && l.value ? (m(), ge(Rs, {
        key: i.value,
        items: e.menus[i.value]?.items ?? [],
        at: l.value,
        label: e.menus[i.value]?.label,
        autofocus: u.value,
        onChoose: U,
        onDismiss: D[0] || (D[0] = (F) => b(!0))
      }, null, 8, ["items", "at", "label", "autofocus"])) : V("", !0)
    ], 44, ai));
  }
}), Sc = /* @__PURE__ */ oe(li, [["__scopeId", "data-v-93dbd2e4"]]), oi = ["aria-label", "aria-expanded", "disabled"], ii = { "aria-hidden": "true" }, ci = /* @__PURE__ */ le({
  __name: "MenuButton",
  props: {
    items: {},
    label: {},
    glyph: { default: "⋯" }
  },
  emits: ["choose"],
  setup(e, { emit: t }) {
    const n = t, s = B(null), a = B(null), r = B(null), o = B(!1), i = _(() => r.value !== null);
    function l(x) {
      const y = s.value?.getBoundingClientRect();
      y && (r.value = { x: y.left, y: y.bottom + 4, mirrorX: y.right }, o.value = x);
    }
    function u(x) {
      r.value = null, x && s.value?.focus();
    }
    function f() {
      i.value ? u(!0) : l(!1);
    }
    function E(x) {
      x.key !== "ArrowDown" || i.value || (x.preventDefault(), l(!0));
    }
    function b(x) {
      const y = x.target;
      y && (s.value?.contains(y) || a.value?.root?.contains(y) || u(!1));
    }
    Ee(i, (x) => {
      x ? window.addEventListener("pointerdown", b, !0) : window.removeEventListener("pointerdown", b, !0);
    }), Ve(() => window.removeEventListener("pointerdown", b, !0));
    function g(x) {
      u(!0), x.action?.(), n("choose", x);
    }
    return (x, y) => (m(), h(te, null, [
      p("button", {
        ref_key: "trigger",
        ref: s,
        type: "button",
        class: "dc-menu-button",
        "aria-label": e.label,
        "aria-haspopup": "menu",
        "aria-expanded": i.value,
        disabled: e.items.length === 0,
        onClick: f,
        onKeydown: E
      }, [
        p("span", ii, M(e.glyph), 1)
      ], 40, oi),
      r.value ? (m(), ge(Rs, {
        key: 0,
        ref_key: "menu",
        ref: a,
        items: e.items,
        at: r.value,
        label: e.label,
        autofocus: o.value,
        onChoose: g,
        onDismiss: y[0] || (y[0] = (w) => u(!0))
      }, null, 8, ["items", "at", "label", "autofocus"])) : V("", !0)
    ], 64));
  }
}), bn = /* @__PURE__ */ oe(ci, [["__scopeId", "data-v-48f5ada5"]]), Ye = (e) => e.kind === "split", q = (e) => e.kind === "group", X = (e) => e.kind === "float", lt = { x: 16, y: 16, w: 360, h: 260 }, Nt = 28, Ts = 120, an = 220, Ls = 38, Qe = 6;
function kt(e, t) {
  let n = !1;
  const s = e.frames.map((a, r) => {
    const o = t(a.node, r);
    return o === a.node ? a : (n = !0, { ...a, node: o });
  });
  return n ? { ...e, frames: s } : e;
}
function Oe(e) {
  return { kind: "group", panels: [e] };
}
function Ac(e, t, n) {
  return {
    kind: "group",
    panels: e,
    ...t ? { active: t } : {},
    ...n ? { title: n } : {}
  };
}
const re = (e) => typeof e == "string", kn = (e) => re(e) ? Oe(e) : e, Ot = (e) => re(e) ? [e] : De(e), Yn = (e) => e.panels.filter(re), ui = (e) => e.panels.filter((t) => !re(t)), Ce = (e, t) => e.panels.includes(t);
function $t(e, t, n) {
  let s = !1;
  const a = e.panels.map((r) => {
    if (re(r) || !Q(r, t)) return r;
    const o = n(r);
    return o !== r && (s = !0), o;
  });
  return s ? { ...e, panels: a } : e;
}
function $n(e, t) {
  return { node: e, rect: { ...lt, ...t } };
}
function xn(e, t) {
  return t ? { kind: "float", frames: e, title: t } : { kind: "float", frames: e };
}
function Mn(e, t) {
  const n = { ...lt, ...t };
  return xn(
    e.map(
      (s, a) => $n(s, {
        ...n,
        x: n.x + a * Nt,
        y: n.y + a * Nt
      })
    )
  );
}
function Cn(e, t, n, s) {
  return {
    kind: "split",
    direction: e,
    children: t,
    ...n ? { sizes: n } : {},
    ...s ? { title: s } : {}
  };
}
const En = (e, t, n) => Cn("row", e, t, n), zc = (e, t, n) => Cn("column", e, t, n);
function ye(e) {
  return {
    ...e.title ? { title: e.title } : {},
    ...e.fixedView ? { fixedView: !0 } : {},
    ...e.headless ? { headless: !0 } : {}
  };
}
const ot = (e) => e.fixedView === !0 || e.headless === !0 || !!e.title, Fc = (e) => ({ ...e, headless: !0 }), Rc = (e) => ({ ...e, fixedView: !0 }), di = (e) => e === "left" || e === "right" ? "row" : "column";
function De(e) {
  return q(e) ? e.panels.flatMap(Ot) : X(e) ? e.frames.flatMap((t) => De(t.node)) : e.children.flatMap(De);
}
function Q(e, t) {
  return q(e) ? e.panels.some((n) => re(n) ? n === t : Q(n, t)) : X(e) ? e.frames.some((n) => Q(n.node, t)) : e.children.some((n) => Q(n, t));
}
const rn = (e) => De(e).length === 0;
function Vt(e) {
  return Ye(e) ? e.children.map((t, n) => ({ node: t, index: n })) : X(e) ? e.frames.map((t, n) => ({ node: t.node, index: n })) : e.panels.flatMap((t, n) => re(t) ? [] : [{ node: t, index: n }]);
}
const Pn = (e) => Vt(e).map((t) => t.node);
function ut(e) {
  const t = e.active;
  if (t) {
    const n = e.panels.findIndex(
      (s) => re(s) ? s === t : Q(s, t)
    );
    if (n >= 0) return n;
  }
  return 0;
}
function Ds(e) {
  const t = e.panels[ut(e)];
  return t !== void 0 && re(t) ? t : "";
}
function be(e) {
  if (re(e)) return e;
  if (q(e)) {
    const n = e.panels[ut(e)];
    return n === void 0 ? "" : be(n);
  }
  if (X(e)) {
    const n = e.frames[e.frames.length - 1];
    return n ? be(n.node) : "";
  }
  const t = e.children[0];
  return t ? be(t) : "";
}
function Je(e, t) {
  if (q(e) && Ce(e, t)) return e;
  for (const n of Pn(e)) {
    const s = Je(n, t);
    if (s) return s;
  }
  return null;
}
function fi(e) {
  const t = Pn(e).flatMap(fi);
  return q(e) ? [e, ...t] : t;
}
function me(e, t) {
  if (q(e)) {
    for (const n of ui(e)) {
      const s = me(n, t);
      if (s) return s;
    }
    return null;
  }
  if (X(e)) {
    for (const n of e.frames)
      if (Q(n.node, t))
        return me(n.node, t) ?? n;
    return null;
  }
  for (const n of e.children) {
    const s = me(n, t);
    if (s) return s;
  }
  return null;
}
function Yt(e, t, n = Ts) {
  const s = (i, l) => l > 0 ? Math.max(Math.min(i, l), Math.min(n, l)) : Math.max(i, n), a = s(e.w, t.w), r = s(e.h, t.h), o = (i, l, u) => Math.min(Math.max(i, 0), Math.max(u - l, 0));
  return {
    x: Math.round(o(e.x, a, t.w)),
    y: Math.round(o(e.y, r, t.h)),
    w: Math.round(a),
    h: Math.round(r)
  };
}
function jn(e, t, n, s, a = Ts) {
  let { x: r, y: o, w: i, h: l } = e;
  return t.includes("e") && (i = e.w + n), t.includes("w") && (i = e.w - n, r = e.x + n), t.includes("s") && (l = e.h + s), t.includes("n") && (l = e.h - s, o = e.y + s), i < a && (t.includes("w") && (r = e.x + e.w - a), i = a), l < a && (t.includes("n") && (o = e.y + e.h - a), l = a), { x: r, y: o, w: i, h: l };
}
const Is = (e, t) => e.x === t.x && e.y === t.y && e.w === t.w && e.h === t.h;
function et(e, t, n) {
  if (q(e)) return $t(e, t, (r) => et(r, t, n));
  if (X(e)) {
    let r = !1;
    const o = e.frames.map((i) => {
      if (!Q(i.node, t)) return i;
      if (me(i.node, t)) {
        const u = et(i.node, t, n);
        return u === i.node ? i : (r = !0, { ...i, node: u });
      }
      const l = n(i);
      return l === i ? i : (r = !0, l);
    });
    return r ? { ...e, frames: o } : e;
  }
  if (!Q(e, t)) return e;
  let s = !1;
  const a = e.children.map((r) => {
    const o = et(r, t, n);
    return o !== r && (s = !0), o;
  });
  return s ? { ...e, children: a } : e;
}
function pi(e, t, n) {
  return et(e, t, (s) => Is(s.rect, n) ? s : { ...s, rect: n });
}
const Ne = (e) => e.maximized === !0, Ns = (e) => (t) => {
  if (Ne(t) === e) return t;
  if (e) {
    const { minimized: a, ...r } = t;
    return { ...r, maximized: !0 };
  }
  const { maximized: n, ...s } = t;
  return s;
};
function vi(e, t, n = !0) {
  return et(e, t, Ns(n));
}
function Tc(e, t) {
  const n = me(e, t);
  return n ? vi(e, t, !Ne(n)) : e;
}
const He = (e) => e.minimized === !0, Os = (e) => (t) => {
  if (He(t) === e) return t;
  if (e) {
    const { maximized: a, ...r } = t;
    return { ...r, minimized: !0 };
  }
  const { minimized: n, ...s } = t;
  return s;
};
function mi(e, t, n = !0) {
  return et(e, t, Os(n));
}
function Lc(e, t) {
  const n = me(e, t);
  return n ? mi(e, t, !He(n)) : e;
}
function Ue(e, t) {
  const n = t[t.length - 1];
  if (n === void 0) return null;
  const s = it(e, t.slice(0, -1));
  return !s || !X(s) ? null : s.frames[n] ?? null;
}
function ln(e, t) {
  if (X(e)) {
    for (const [n, s] of e.frames.entries()) {
      if (!Q(s.node, t)) continue;
      const a = ln(s.node, t);
      return a ? [n, ...a] : [n];
    }
    return null;
  }
  for (const { node: n, index: s } of Vt(e)) {
    if (!Q(n, t)) continue;
    const a = ln(n, t);
    return a ? [s, ...a] : null;
  }
  return null;
}
function Sn(e, t, n) {
  const s = t[t.length - 1];
  if (s === void 0) return e;
  const a = t.slice(0, -1), r = it(e, a);
  if (!r || !X(r)) return e;
  const o = r.frames[s];
  if (!o) return e;
  const i = n(o);
  if (i === o) return e;
  const l = [...r.frames];
  return l[s] = i, st(e, a, { ...r, frames: l });
}
function Qn(e, t, n) {
  return Sn(
    e,
    t,
    (s) => Is(s.rect, n) ? s : { ...s, rect: n }
  );
}
function hi(e, t, n = !0) {
  return Sn(e, t, Ns(n));
}
function _i(e, t, n = !0) {
  return Sn(e, t, Os(n));
}
function ht(e, t) {
  const [n, ...s] = t;
  if (n === void 0) return e;
  if (X(e)) {
    const o = e.frames[n];
    if (!o) return e;
    const i = ht(o.node, s), l = i === o.node ? o : { ...o, node: i };
    if (n === e.frames.length - 1 && l === o) return e;
    const u = [...e.frames];
    return u.splice(n, 1), u.push(l), { ...e, frames: u };
  }
  const a = it(e, [n]);
  if (!a) return e;
  const r = ht(a, s);
  return r === a ? e : st(e, [n], r);
}
function gi(e, t) {
  const n = [...t];
  let s = e;
  return t.forEach((a, r) => {
    s && (X(s) && (n[r] = s.frames.length - 1), s = it(s, [a]));
  }), n;
}
function zt(e, t, n, s) {
  if (q(e)) return $t(e, n, (o) => zt(o, t, n, s));
  if (X(e)) {
    const o = e.frames.findIndex((l) => Q(l.node, n)), i = e.frames[o];
    if (!i) return e;
    if (me(i.node, n)) {
      const l = zt(i.node, t, n, s);
      if (l === i.node) return e;
      const u = [...e.frames];
      return u[o] = { ...i, node: l }, { ...e, frames: u };
    }
    return { ...e, frames: [...e.frames, $n(Oe(t), s)] };
  }
  if (!Q(e, n)) return e;
  let a = !1;
  const r = e.children.map((o) => {
    const i = zt(o, t, n, s);
    return i !== o && (a = !0), i;
  });
  return a ? { ...e, children: r } : e;
}
function Zn(e, t, n, s) {
  if (t === n || !Q(e, t) || !Q(e, n) || !me(e, n)) return e;
  const a = tt(e, t);
  if (!a) return e;
  const r = zt(a, t, n, s);
  return r === a ? e : ve(r);
}
function jt(e, t) {
  if (q(e)) return $t(e, t, (a) => jt(a, t));
  if (X(e)) {
    const a = e.frames.findIndex((u) => Q(u.node, t)), r = e.frames[a];
    if (!r) return e;
    const o = jt(r.node, t), i = o === r.node ? r : { ...r, node: o };
    if (a === e.frames.length - 1 && i === r) return e;
    const l = [...e.frames];
    return l.splice(a, 1), l.push(i), { ...e, frames: l };
  }
  if (!Q(e, t)) return e;
  let n = !1;
  const s = e.children.map((a) => {
    const r = jt(a, t);
    return r !== a && (n = !0), r;
  });
  return n ? { ...e, children: s } : e;
}
function An(e, t) {
  if (e <= 0) return [];
  const n = () => Array.from({ length: e }, () => 1 / e);
  if (!t || t.length !== e) return n();
  const s = t.map((r) => Number.isFinite(r) && r > 0 ? r : 0), a = s.reduce((r, o) => r + o, 0);
  return a <= 0 ? n() : s.map((r) => r / a);
}
const Ge = (e) => An(e.children.length, e.sizes), Fe = (e) => {
  const t = q(e) ? e.panels.length : e.children.length;
  return e.places?.length === t ? e.places : void 0;
};
function ve(e) {
  if (q(e)) return yi(e);
  if (X(e)) {
    const i = e.frames.flatMap((l) => {
      const u = ve(l.node);
      return rn(u) ? [] : [u === l.node ? l : { ...l, node: u }];
    });
    return i.length === e.frames.length && i.every((l, u) => l === e.frames[u]) ? e : { ...e, frames: i };
  }
  if (e.children.length === 0) return e;
  const t = Ge(e), n = Fe(e), s = [], a = [], r = [];
  e.children.forEach((i, l) => {
    const u = ve(i), f = t[l] ?? 0;
    if (rn(u)) return;
    if (!n && Ye(u) && u.direction === e.direction && !Fe(u) && !ot(u)) {
      const b = Ge(u);
      u.children.forEach((g, x) => {
        s.push(g), a.push(f * (b[x] ?? 0));
      });
      return;
    }
    s.push(u), a.push(f);
    const E = n?.[l];
    E && r.push(E);
  });
  const o = s[0];
  return s.length === 1 && o && !ot(e) ? o : {
    kind: "split",
    direction: e.direction,
    children: s,
    sizes: An(s.length, a),
    ...ye(e),
    ...r.length === s.length && r.length > 0 ? { places: r } : {}
  };
}
function yi(e) {
  if (e.panels.every(re)) return e;
  const t = be(e), n = Fe(e), s = [], a = [];
  e.panels.forEach((i, l) => {
    const u = n?.[l];
    if (re(i)) {
      s.push(i), u && a.push(u);
      return;
    }
    const f = ve(i);
    if (!rn(f)) {
      if (q(f) && !ot(f) && !Fe(f)) {
        s.push(...f.panels);
        return;
      }
      s.push(f), u && a.push(u);
    }
  });
  const r = s[0];
  if (s.length === 1 && r !== void 0 && !re(r) && !ot(e))
    return r;
  if (s.length === e.panels.length && s.every((i, l) => i === e.panels[l]))
    return e;
  const o = t && s.some((i) => Ot(i).includes(t)) ? t : void 0;
  return {
    kind: "group",
    panels: s,
    ...o ? { active: o } : {},
    ...ye(e),
    ...a.length === s.length && a.length > 0 ? { places: a } : {}
  };
}
function tt(e, t) {
  if (X(e)) {
    const o = e.frames.flatMap((i) => {
      const l = tt(i.node, t);
      return l ? [l === i.node ? i : { ...i, node: l }] : [];
    });
    return o.length === 0 ? null : { ...e, frames: o };
  }
  if (q(e)) {
    if (!Q(e, t)) return e;
    const o = ut(e), i = [];
    for (const f of e.panels) {
      if (re(f)) {
        f !== t && i.push(f);
        continue;
      }
      const E = tt(f, t);
      E && i.push(E);
    }
    if (i.length === 0) return null;
    const u = e.active && i.some((f) => Ot(f).includes(e.active)) ? e.active : be(i[o] ?? i[i.length - 1]);
    return u ? { kind: "group", panels: i, active: u, ...ye(e) } : { kind: "group", panels: i, ...ye(e) };
  }
  const n = Ge(e), s = [], a = [];
  if (e.children.forEach((o, i) => {
    const l = tt(o, t);
    l && (s.push(l), a.push(n[i] ?? 0));
  }), s.length === 0) return null;
  const r = s[0];
  return s.length === 1 && r && !ot(e) ? r : ve({
    kind: "split",
    direction: e.direction,
    children: s,
    sizes: a,
    ...ye(e)
  });
}
function wi(e, t, n) {
  const s = e.panels.filter((r) => r !== t), a = n === void 0 ? s.length : Math.max(0, Math.min(n, s.length));
  return s.splice(a, 0, t), { kind: "group", panels: s, active: t, ...ye(e) };
}
function pt(e, t, n, s, a) {
  const r = (g) => kt(
    g,
    (x) => Q(x, n) ? pt(x, t, n, s, a) : x
  );
  if (s === "float") return e;
  const o = (g) => $t(g, n, (x) => pt(x, t, n, s, a));
  if (s === "center")
    return q(e) ? Ce(e, n) ? wi(e, t, a) : o(e) : X(e) ? r(e) : {
      ...e,
      children: e.children.map(
        (g) => Q(g, n) ? pt(g, t, n, s, a) : g
      )
    };
  const i = di(s), l = s === "left" || s === "top", u = (g) => ({
    kind: "split",
    direction: i,
    children: l ? [Oe(t), g] : [g, Oe(t)],
    sizes: [0.5, 0.5]
  });
  if (q(e)) return Ce(e, n) ? u(e) : o(e);
  if (X(e)) return r(e);
  const f = Ge(e), E = e.children.findIndex(
    (g) => q(g) && Ce(g, n)
  );
  if (E >= 0 && e.direction === i) {
    const g = (f[E] ?? 0) / 2, x = [...e.children], y = [...f];
    return x.splice(l ? E : E + 1, 0, Oe(t)), y.splice(E, 1, g, g), {
      kind: "split",
      direction: i,
      children: x,
      sizes: y,
      ...ye(e)
    };
  }
  const b = e.children.map((g) => Q(g, n) ? q(g) && Ce(g, n) ? u(g) : pt(g, t, n, s) : g);
  return {
    kind: "split",
    direction: e.direction,
    children: b,
    sizes: f,
    ...ye(e)
  };
}
function nt(e, t) {
  if (q(e)) {
    if (Ce(e, t))
      return Ds(e) === t ? e : { ...e, active: t };
    const a = e.panels.findIndex((l) => !re(l) && Q(l, t)), r = e.panels[a];
    if (r === void 0 || re(r)) return e;
    const o = nt(r, t);
    if (o === r && e.active === t) return e;
    const i = [...e.panels];
    return i[a] = o, { ...e, panels: i, active: t };
  }
  if (!Q(e, t)) return e;
  if (X(e)) return kt(e, (a) => nt(a, t));
  let n = !1;
  const s = e.children.map((a) => {
    const r = nt(a, t);
    return r !== a && (n = !0), r;
  });
  return n ? { ...e, children: s } : e;
}
function _t(e, t, n) {
  if (q(e)) {
    if (!Ce(e, t)) return $t(e, t, (u) => _t(u, t, n));
    const s = e.panels.indexOf(t), a = Math.max(0, Math.min(n, e.panels.length - 1));
    if (s === a) return e;
    const r = [...e.panels];
    r.splice(s, 1), r.splice(a, 0, t);
    const o = Fe(e), i = o ? [...o] : void 0;
    i && i.splice(a, 0, ...i.splice(s, 1));
    const l = be(e);
    return {
      kind: "group",
      panels: r,
      ...l ? { active: l } : {},
      ...ye(e),
      ...i ? { places: i } : {}
    };
  }
  return Q(e, t) ? X(e) ? kt(e, (s) => _t(s, t, n)) : { ...e, children: e.children.map((s) => _t(s, t, n)) } : e;
}
function Ft(e, t, n) {
  if (t === n) return e;
  if (q(e)) {
    if (!Q(e, t) && !Q(e, n)) return e;
    const s = (r) => r === t ? n : r === n ? t : r, a = e.panels.map((r) => re(r) ? s(r) : Ft(r, t, n));
    return { ...e, panels: a, ...e.active ? { active: s(e.active) } : {} };
  }
  return X(e) ? kt(e, (s) => Ft(s, t, n)) : { ...e, children: e.children.map((s) => Ft(s, t, n)) };
}
function Pt(e, t, n, s, a) {
  if (s === "float" || !Q(e, t) || !Q(e, n)) return e;
  const r = Je(e, t);
  if (s === "center" && r && Ce(r, n)) {
    if (a === void 0) return e;
    const i = r.panels.indexOf(t), l = a > i ? a - 1 : a;
    return l === i ? e : nt(_t(e, t, l), t);
  }
  if (t === n) return e;
  const o = tt(e, t);
  return o ? ve(pt(o, t, n, s, a)) : e;
}
function Vs(e, t, n) {
  if (q(e)) {
    const a = e.panels[t];
    if (a === void 0 || re(a)) return e;
    const r = [...e.panels];
    return r[t] = n, { ...e, panels: r };
  }
  if (X(e)) {
    const a = e.frames[t];
    if (!a) return e;
    const r = [...e.frames];
    return r[t] = { ...a, node: n }, { ...e, frames: r };
  }
  const s = [...e.children];
  return s[t] = n, { ...e, children: s };
}
function xt(e, t, n) {
  const s = Vt(e);
  if (!q(e) && s.some(({ node: a }) => q(a) && Ce(a, t))) {
    const a = n(e);
    return a === e ? null : a;
  }
  for (const { node: a, index: r } of s) {
    if (!Q(a, t)) continue;
    const o = xt(a, t, n);
    return o ? Vs(e, r, o) : null;
  }
  return null;
}
function Dc(e, t, n) {
  const s = xt(
    e,
    t,
    (a) => Ye(a) && a.direction !== n ? { ...a, direction: n } : a
  );
  return s ? ve(s) : e;
}
function Ks(e) {
  return X(e) ? [e] : Fe(e) || ot(e) ? [e] : q(e) ? [...e.panels] : e.children.flatMap(Ks);
}
function Bs(e, t) {
  if (q(e)) return e;
  const n = Pn(e).map(Ks), s = n.flat(), a = t && s.some((o) => Ot(o).includes(t)) ? t : void 0, r = bi(e, n);
  return ve({
    kind: "group",
    panels: s,
    ...a ? { active: a } : {},
    ...ye(e),
    ...r ? { places: r } : {}
  });
}
function bi(e, t) {
  const n = X(e) ? e.frames.map(({ node: s, ...a }) => a) : Fe(e);
  if (n)
    return t.every((s) => s.length === 1) ? n : void 0;
}
function Ic(e, t) {
  const n = xt(e, t, (s) => Bs(s, t));
  return n ? ve(n) : e;
}
function zn(e, t, n) {
  if (q(e) && Ce(e, t)) {
    const s = n(e);
    return s === e ? null : s;
  }
  for (const { node: s, index: a } of Vt(e)) {
    if (!Q(s, t)) continue;
    const r = zn(s, t, n);
    return r ? Vs(e, a, r) : null;
  }
  return null;
}
function Jn(e, t, n) {
  const s = zn(e, t, (a) => {
    if (a.panels.length < 2) return a;
    const r = Fe(a);
    return {
      ...Cn(n, a.panels.map(kn)),
      ...ye(a),
      ...r ? { places: r } : {}
    };
  });
  return s ? ve(s) : e;
}
function on(e, t) {
  if (q(e)) return e;
  if (X(e)) {
    const a = e.frames.findIndex(
      (i) => q(i.node) && i.node.panels.includes(t)
    ), r = e.frames[a], o = r && q(r.node) ? r.node : null;
    if (r && o && o.panels.length > 1) {
      const i = Mn(o.panels.map(kn), r.rect).frames;
      return {
        ...e,
        frames: [...e.frames.slice(0, a), ...i, ...e.frames.slice(a + 1)]
      };
    }
    return kt(e, (i) => on(i, t));
  }
  if (!Q(e, t)) return e;
  let n = !1;
  const s = e.children.map((a) => {
    const r = on(a, t);
    return r !== a && (n = !0), r;
  });
  return n ? { ...e, children: s } : e;
}
function ki(e, t, n) {
  const s = Je(e, t);
  if (!s || s.panels.length < 2) return e;
  if (me(e, t)?.node === s) {
    const o = on(e, t);
    return o === e ? e : ve(o);
  }
  const r = zn(e, t, (o) => ({
    ...xn(qs(o.panels.map(kn), Fe(o), n)),
    ...ye(o)
  }));
  return r ? ve(r) : e;
}
function qs(e, t, n) {
  return t ? e.map((s, a) => ({ ...t[a], node: s })) : Mn(e, n).frames;
}
function Ws(e, t) {
  return { ...xn(qs(e.children, Fe(e), t)), ...ye(e) };
}
function Nc(e, t, n) {
  const s = xt(
    e,
    t,
    (a) => X(a) ? a : Ws(a, n)
  );
  return s ? ve(s) : q(e) && Ce(e, t) ? Mn([e], n) : e;
}
function $i(e, t) {
  const n = (a) => t === "column" ? a.rect.y : a.rect.x, s = (a) => t === "column" ? a.rect.x : a.rect.y;
  return [...e].sort((a, r) => n(a) - n(r) || s(a) - s(r));
}
function Us(e, t) {
  const n = $i(e.frames, t);
  return {
    kind: "split",
    direction: t,
    children: n.map((s) => s.node),
    ...ye(e),
    places: n.map(({ node: s, ...a }) => a)
  };
}
function Oc(e, t, n = "row") {
  const s = xt(
    e,
    t,
    (a) => X(a) ? Us(a, n) : a
  );
  return s ? ve(s) : e;
}
function Kt(e) {
  return e.title ? e.title : q(e) ? "" : X(e) ? "Desktop" : e.direction === "row" ? "Row" : "Column";
}
function gt(e, t) {
  if (q(e)) {
    const s = e.panels[ut(e)];
    return s === void 0 ? "" : re(s) ? t(s) ?? s : Kt(s) || gt(s, t);
  }
  if (e.title) return e.title;
  if (X(e)) {
    const s = e.frames[e.frames.length - 1];
    return s ? s.title ?? gt(s.node, t) : "";
  }
  const n = e.children[0];
  return n ? gt(n, t) : "";
}
function it(e, t) {
  let n = e;
  for (const s of t) {
    if (!n) return null;
    if (Ye(n)) n = n.children[s];
    else if (X(n)) n = n.frames[s]?.node;
    else {
      const a = n.panels[s];
      n = a === void 0 || re(a) ? void 0 : a;
    }
  }
  return n ?? null;
}
function st(e, t, n) {
  if (t.length === 0) return n;
  const [s, ...a] = t;
  if (s === void 0) return e;
  if (X(e)) {
    const l = e.frames[s];
    if (!l) return e;
    const u = st(l.node, a, n);
    if (u === l.node) return e;
    const f = [...e.frames];
    return f[s] = { ...l, node: u }, { ...e, frames: f };
  }
  if (q(e)) {
    const l = e.panels[s];
    if (l === void 0 || re(l)) return e;
    const u = st(l, a, n);
    if (u === l) return e;
    const f = [...e.panels];
    return f[s] = u, { ...e, panels: f };
  }
  const r = e.children[s];
  if (!r) return e;
  const o = st(r, a, n);
  if (o === r) return e;
  const i = [...e.children];
  return i[s] = o, { ...e, children: i };
}
function Rt(e, t, n) {
  if (t.length === 0)
    return Ye(e) ? { ...e, sizes: An(e.children.length, n) } : e;
  const [s, ...a] = t;
  if (s === void 0) return e;
  if (X(e)) {
    const i = e.frames[s];
    if (!i) return e;
    const l = Rt(i.node, a, n);
    if (l === i.node) return e;
    const u = [...e.frames];
    return u[s] = { ...i, node: l }, { ...e, frames: u };
  }
  if (q(e)) {
    const i = e.panels[s];
    if (i === void 0 || re(i)) return e;
    const l = Rt(i, a, n);
    if (l === i) return e;
    const u = [...e.panels];
    return u[s] = l, { ...e, panels: u };
  }
  const r = e.children[s];
  if (!r) return e;
  const o = [...e.children];
  return o[s] = Rt(r, a, n), { ...e, children: o };
}
function es(e, t, n, s = 0.02) {
  const a = e[t], r = e[t + 1];
  if (a === void 0 || r === void 0) return e;
  const o = a + r;
  if (o < s * 2) return e;
  const i = [...e], l = Math.min(Math.max(a + n, s), o - s);
  return i[t] = l, i[t + 1] = o - l, i;
}
function cn(e) {
  if (!q(e) || e.panels.length >= 2) return e;
  const t = e.panels[0];
  return t !== void 0 && !re(t) ? e : { ...En([xi(e)]), ...ye(e) };
}
const xi = (e) => {
  if (!e.title) return e;
  const { title: t, ...n } = e;
  return n;
};
function ts(e) {
  return e.length === 0 ? null : En(e.map(Oe));
}
function Mi(e, t) {
  if (!e) return ts(t);
  const n = new Set(t), s = /* @__PURE__ */ new Set(), a = /* @__PURE__ */ new Set();
  for (const l of De(e))
    !n.has(l) || s.has(l) ? a.add(l) : s.add(l);
  let r = e;
  for (const l of a)
    r = r ? tt(r, l) : null;
  const o = new Set(r ? De(r) : []), i = t.filter((l) => !o.has(l));
  if (i.length === 0) return r ? cn(ve(r)) : null;
  if (!r) return ts(i);
  if (X(r)) {
    const l = r.frames.length;
    return {
      ...r,
      frames: [
        ...r.frames,
        ...i.map(
          (u, f) => $n(Oe(u), {
            x: lt.x + (l + f) * Nt,
            y: lt.y + (l + f) * Nt
          })
        )
      ]
    };
  }
  return cn(ve(En([r, ...i.map(Oe)])));
}
const Fn = Symbol("dc.windowContext");
function Ci(e) {
  return un(Fn, e), e;
}
function Rn() {
  const e = rt(Fn, null);
  if (!e)
    throw new Error(
      "[header-content-layout] No window context found. Render this component inside <WindowFrame>."
    );
  return e;
}
const Ei = ["data-dc-glyph"], Pi = { class: "dc-glyph__line" }, Si = ["d"], Ai = {
  key: 0,
  class: "dc-glyph__aqua"
}, zi = ["d"], Fi = /* @__PURE__ */ le({
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
    return (s, a) => (m(), h("svg", {
      class: "dc-glyph",
      "data-dc-glyph": e.kind,
      viewBox: "0 0 10 10",
      "aria-hidden": "true",
      focusable: "false"
    }, [
      p("g", Pi, [
        (m(!0), h(te, null, ue(t[e.kind], (r) => (m(), h("path", {
          key: r,
          d: r
        }, null, 8, Si))), 128))
      ]),
      n[e.kind] ? (m(), h("g", Ai, [
        (m(!0), h(te, null, ue(n[e.kind], (r) => (m(), h("path", {
          key: r,
          d: r
        }, null, 8, zi))), 128))
      ])) : V("", !0)
    ], 8, Ei));
  }
}), at = /* @__PURE__ */ oe(Fi, [["__scopeId", "data-v-4d2872c0"]]), Ri = ["data-dc-order", "data-dc-path", "data-dc-maximized", "data-dc-minimized", "data-dc-dragging"], Ti = ["data-dc-movable"], Li = { class: "dc-float__title dc-truncate" }, Di = {
  key: 1,
  class: "dc-float__controls dc-controls"
}, Ii = ["aria-label", "aria-pressed", "data-dc-minimize"], Ni = ["aria-label", "aria-pressed", "data-dc-maximize"], Oi = ["aria-label", "data-dc-close"], Vi = { class: "dc-float__content" }, Ki = ["data-dc-handle", "onPointerdown"], Bi = /* @__PURE__ */ le({
  __name: "WindowFloat",
  props: {
    frame: {},
    path: {},
    order: {},
    place: {}
  },
  setup(e) {
    const t = e, n = Rn(), s = _(() => be(t.frame.node)), a = _(() => n.panelFor(s.value)?.fixed === !0), r = _(() => Ne(t.frame)), o = _(() => He(t.frame)), i = _(() => r.value || o.value), l = _(() => n.resizable.value && !a.value && !i.value), u = _(() => n.movable.value && !a.value && !i.value), f = _(() => {
      const D = De(t.frame.node);
      return D.length === 1 ? D[0] ?? null : null;
    }), E = _(() => f.value !== null && n.closable(f.value)), b = _(() => t.frame.node.headless === !0), g = _(
      () => !b.value && (!q(t.frame.node) || o.value)
    ), x = _(
      () => t.frame.title || Kt(t.frame.node) || gt(t.frame.node, (D) => n.panelFor(D)?.title)
    ), y = _(() => n.spaceMenu(t.path));
    function w(D) {
      D.target?.closest("button, a, input, select, textarea, label") || n.beginFrameDragAt(t.path, D, "move");
    }
    function z(D) {
      D.target?.closest("button, a, input, select, textarea, label") || (o.value ? n.toggleMinimizeAt(t.path) : n.toggleMaximizeAt(t.path));
    }
    const O = _(() => {
      const D = n.framing.value;
      return D !== null && Q(t.frame.node, D);
    }), U = _(() => ({
      // Neither maximizing nor rolling up overwrites the rect: it is where the
      // window goes back to, and both are a way of not being there for a while.
      ...r.value ? { inset: "0" } : o.value && t.place ? {
        left: `${t.place.x}px`,
        bottom: `${t.place.bottom}px`,
        width: `${an}px`,
        height: `${Ls}px`
      } : {
        left: `${t.frame.rect.x}px`,
        top: `${t.frame.rect.y}px`,
        width: `${t.frame.rect.w}px`,
        height: `${t.frame.rect.h}px`
      },
      // Back to front. The DOM order says the same thing, but a frame that paints
      // a shadow over its neighbour should not depend on that being noticed.
      zIndex: t.order + 1
    })), L = ["n", "s", "e", "w", "nw", "ne", "sw", "se"];
    return (D, F) => (m(), h("div", {
      class: "dc-float",
      style: ze(U.value),
      "data-dc-order": e.order,
      "data-dc-path": e.path.join("/"),
      "data-dc-maximized": r.value ? "true" : "false",
      "data-dc-minimized": o.value ? "true" : "false",
      "data-dc-dragging": O.value ? "true" : "false",
      onPointerdown: F[3] || (F[3] = ($) => C(n).raiseAt(e.path))
    }, [
      g.value ? (m(), h("header", {
        key: 0,
        class: "dc-float__bar",
        "data-dc-movable": u.value ? "true" : "false",
        onPointerdown: w,
        onDblclick: z
      }, [
        p("span", Li, M(x.value), 1),
        y.value.length ? (m(), ge(bn, {
          key: 0,
          items: y.value,
          label: `${x.value} menu`
        }, null, 8, ["items", "label"])) : V("", !0),
        !a.value || o.value && E.value && f.value ? (m(), h("div", Di, [
          a.value ? V("", !0) : (m(), h("button", {
            key: 0,
            type: "button",
            class: "dc-float__button dc-control",
            "aria-label": `${o.value ? "Unroll" : "Minimize"} ${x.value}`,
            "aria-pressed": o.value,
            "data-dc-minimize": s.value,
            onClick: F[0] || (F[0] = ($) => C(n).toggleMinimizeAt(e.path))
          }, [
            ce(at, {
              kind: o.value ? "unroll" : "minimize"
            }, null, 8, ["kind"])
          ], 8, Ii)),
          a.value ? V("", !0) : (m(), h("button", {
            key: 1,
            type: "button",
            class: "dc-float__button dc-control",
            "aria-label": `${r.value ? "Restore" : "Maximize"} ${x.value}`,
            "aria-pressed": r.value,
            "data-dc-maximize": s.value,
            onClick: F[1] || (F[1] = ($) => C(n).toggleMaximizeAt(e.path))
          }, [
            ce(at, {
              kind: r.value ? "restore" : "maximize"
            }, null, 8, ["kind"])
          ], 8, Ni)),
          o.value && E.value && f.value ? (m(), h("button", {
            key: 2,
            type: "button",
            class: "dc-float__button dc-control",
            "aria-label": `Close ${x.value}`,
            "data-dc-close": f.value,
            onClick: F[2] || (F[2] = ($) => C(n).close(f.value))
          }, [
            ce(at, { kind: "close" })
          ], 8, Oi)) : V("", !0)
        ])) : V("", !0)
      ], 40, Ti)) : V("", !0),
      p("div", Vi, [
        yt(D.$slots, "default", {}, void 0, !0)
      ]),
      (m(!0), h(te, null, ue(l.value ? L : [], ($) => (m(), h("span", {
        key: $,
        class: "dc-float__grip",
        "data-dc-handle": $,
        "aria-hidden": "true",
        onPointerdown: Se((A) => C(n).beginFrameDragAt(e.path, A, $), ["stop"])
      }, null, 40, Ki))), 128))
    ], 44, Ri));
  }
}), qi = /* @__PURE__ */ oe(Bi, [["__scopeId", "data-v-f035684c"]]), Tn = Symbol("dc.paneContext");
function Wi(e) {
  return un(Tn, e), e;
}
function Vc() {
  return rt(Tn, null);
}
function Kc(e) {
  const t = rt(Fn, null), n = rt(Tn, null);
  if (!t || !n) return () => {
  };
  const s = t.registerMenu(
    () => n.panel.value,
    () => ft(e)
  );
  return va() && ma(s), s;
}
const Ui = ["data-dc-panel", "data-dc-panels", "data-dc-tabbed", "data-dc-floating", "data-dc-maximized", "data-dc-headless", "data-dc-active", "data-dc-dragging", "aria-label"], Hi = ["data-dc-movable"], Xi = ["aria-label", "aria-pressed"], Gi = ["data-dc-space-name"], Yi = { class: "dc-truncate" }, ji = ["aria-label"], Qi = {
  key: 0,
  class: "dc-pane__insert",
  "aria-hidden": "true"
}, Zi = ["id", "data-dc-panel", "data-dc-space", "aria-selected", "aria-controls", "tabindex", "onPointerdown", "onClick", "onKeydown"], Ji = { class: "dc-tab__name dc-truncate" }, ec = {
  key: 0,
  class: "dc-pane__sub dc-mono dc-truncate"
}, tc = ["aria-label", "data-dc-close", "onClick"], nc = {
  key: 0,
  class: "dc-pane__insert",
  "aria-hidden": "true"
}, sc = { class: "dc-pane__tools" }, ac = {
  key: 2,
  class: "dc-pane__controls dc-controls"
}, rc = ["aria-label", "data-dc-minimize"], lc = ["aria-label", "aria-pressed", "data-dc-maximize"], oc = ["aria-label", "data-dc-close"], ic = ["id", "role", "aria-labelledby"], cc = ["id", "role", "aria-labelledby"], uc = ["data-dc-edge"], dc = /* @__PURE__ */ le({
  __name: "WindowPane",
  props: {
    group: {},
    path: {}
  },
  setup(e) {
    const t = e, n = Rn(), s = as() ?? "dc-pane", a = _(
      () => t.group.panels.flatMap((R, N) => {
        if (!re(R)) {
          const we = Kt(R) || gt(R, (he) => n.panelFor(he)?.title);
          return [{ kind: "space", index: N, id: `space-${N}`, title: we, node: R }];
        }
        const W = n.panelFor(R);
        return W ? [{ kind: "panel", index: N, id: R, title: W.title, panel: W }] : [];
      })
    ), r = _(() => a.value.length > 1), o = _(() => {
      const R = ut(t.group);
      return a.value.find((N) => N.index === R) ?? a.value[0] ?? null;
    }), i = _(() => o.value?.kind === "space" ? o.value.node : null), l = _(() => i.value ? "" : Ds(t.group)), u = _(() => i.value ? null : n.panelFor(l.value)), f = _(() => o.value?.title ?? ""), E = _(() => n.spaceNames.value ? t.group.title ?? "" : ""), b = _(() => [...t.path, o.value?.index ?? 0]), g = _(() => l.value || Yn(t.group)[0] || ""), x = _(() => n.viewFor(l.value)), y = _(() => t.group.headless === !0), w = _(() => n.focused.value === l.value), z = _(() => n.dragging.value === l.value), O = _(() => n.moving.value === l.value), U = _(() => n.frameOf(g.value) !== null), L = _(() => n.panelFor(g.value)?.fixed === !0), D = _(
      () => !i.value && (n.canMove(l.value) || U.value && n.movable.value && !L.value)
    ), F = _(
      () => i.value ? n.spaceMenu(b.value) : n.menuFor(l.value)
    ), $ = (R) => n.closable(R);
    Wi({ panel: l });
    const A = _(() => n.maximized(g.value)), G = _(
      () => U.value && !L.value || !r.value && !!u.value && $(u.value.id)
    ), j = (R) => `${s}-tab-${R}`, de = _(() => `${s}-body`), Z = _(() => {
      const R = n.dropTarget.value;
      return !R || !Ce(t.group, R.panel) || R.edge === "float" ? null : R;
    }), T = _(() => Z.value?.index === void 0 ? Z.value?.edge ?? null : null), K = _(() => Z.value?.index ?? null), ae = () => u.value ? n.renderContent(u.value, x.value, w.value) ?? null : null, J = () => u.value ? n.renderActions(u.value, x.value, w.value) ?? null : null;
    let se = null;
    function ke(R) {
      const N = se !== null && Math.hypot(R.clientX - se.x, R.clientY - se.y) >= 4;
      return se = null, N;
    }
    const xe = (R) => R.kind === "panel" ? R.id : be(R.node);
    function Ke(R, N) {
      N.kind !== "space" && (n.focus(N.id), se = { x: R.clientX, y: R.clientY }, n.beginDrag(N.id, R));
    }
    function je(R, N) {
      if (ke(R)) return;
      const W = xe(N);
      W && n.selectPanel(W);
    }
    function Pe(R) {
      l.value && n.focus(l.value), !R.target?.closest(".dc-tab, button, a, input, select, textarea, label") && (U.value ? n.beginFrameDrag(g.value, R, "move") : n.beginDrag(l.value, R));
    }
    function Be(R) {
      se = { x: R.clientX, y: R.clientY }, n.beginDrag(l.value, R);
    }
    function Me(R) {
      ke(R) || n.toggleMoveMode(l.value);
    }
    const qe = {
      ArrowLeft: "left",
      ArrowRight: "right",
      ArrowUp: "up",
      ArrowDown: "down"
    };
    function Mt(R) {
      if (!O.value) return;
      if (R.key === "Escape") {
        R.preventDefault(), n.toggleMoveMode(l.value);
        return;
      }
      const N = qe[R.key];
      N && (R.preventDefault(), U.value ? n.nudgeFrame(l.value, N, R.shiftKey) : n.nudge(l.value, N, R.shiftKey));
    }
    function Bt(R) {
      !U.value || R.target?.closest(".dc-tab, button, a, input, select, textarea, label") || n.toggleMaximize(g.value);
    }
    function qt(R, N) {
      R.stopPropagation(), se = null, n.close(N);
    }
    function Wt(R, N) {
      const W = a.value.length;
      let we = null;
      if (R.key === "ArrowRight" ? we = (N + 1) % W : R.key === "ArrowLeft" ? we = (N - 1 + W) % W : R.key === "Home" ? we = 0 : R.key === "End" && (we = W - 1), we === null) return;
      R.preventDefault();
      const he = a.value[we];
      if (!he) return;
      const Ct = xe(he);
      Ct && n.selectPanel(Ct);
    }
    return (R, N) => o.value ? (m(), h("section", {
      key: 0,
      class: "dc-pane",
      "data-dc-panel": l.value || void 0,
      "data-dc-panels": C(Yn)(e.group).join(" ") || void 0,
      "data-dc-tabbed": r.value ? "true" : "false",
      "data-dc-floating": U.value ? "true" : "false",
      "data-dc-maximized": A.value ? "true" : "false",
      "data-dc-headless": y.value ? "true" : "false",
      "data-dc-active": w.value ? "true" : "false",
      "data-dc-dragging": z.value ? "true" : "false",
      "aria-label": f.value,
      onFocusin: N[7] || (N[7] = (W) => l.value && C(n).focus(l.value))
    }, [
      y.value ? V("", !0) : (m(), h("header", {
        key: 0,
        class: "dc-pane__head",
        "data-dc-movable": D.value ? "true" : "false",
        onPointerdown: Pe,
        onDblclick: Bt
      }, [
        D.value ? (m(), h("button", {
          key: 0,
          type: "button",
          class: "dc-pane__grip",
          "aria-label": `Move ${f.value}`,
          "aria-pressed": O.value,
          onPointerdown: Be,
          onClick: Me,
          onKeydown: Mt
        }, [...N[8] || (N[8] = [
          p("span", { "aria-hidden": "true" }, "⠿", -1)
        ])], 40, Xi)) : V("", !0),
        E.value ? (m(), h("span", {
          key: 1,
          class: "dc-pane__name",
          "data-dc-space-name": E.value
        }, [
          p("span", Yi, M(E.value), 1)
        ], 8, Gi)) : V("", !0),
        p("div", {
          class: "dc-pane__tabs",
          role: "tablist",
          "aria-label": `${f.value} panels`
        }, [
          (m(!0), h(te, null, ue(a.value, (W, we) => (m(), h(te, {
            key: W.id
          }, [
            K.value === we ? (m(), h("span", Qi)) : V("", !0),
            p("button", {
              id: j(W.id),
              type: "button",
              role: "tab",
              class: "dc-tab",
              "data-dc-panel": W.kind === "panel" ? W.id : void 0,
              "data-dc-space": W.kind === "space" ? W.title : void 0,
              "aria-selected": W.index === o.value.index,
              "aria-controls": de.value,
              tabindex: W.index === o.value.index ? 0 : -1,
              onPointerdown: (he) => Ke(he, W),
              onClick: (he) => je(he, W),
              onKeydown: (he) => Wt(he, we)
            }, [
              p("span", Ji, M(W.title), 1),
              W.kind === "panel" && W.panel.subtitle ? (m(), h("span", ec, M(W.panel.subtitle), 1)) : V("", !0),
              r.value && W.kind === "panel" && $(W.id) ? (m(), h("span", {
                key: 1,
                class: "dc-tab__close",
                role: "button",
                tabindex: "-1",
                "aria-label": `Close ${W.title}`,
                "data-dc-close": W.id,
                onPointerdown: N[0] || (N[0] = Se(() => {
                }, ["stop"])),
                onClick: (he) => qt(he, W.id)
              }, [...N[9] || (N[9] = [
                p("span", { "aria-hidden": "true" }, "×", -1)
              ])], 40, tc)) : V("", !0)
            ], 40, Zi)
          ], 64))), 128)),
          K.value === a.value.length ? (m(), h("span", nc)) : V("", !0)
        ], 8, ji),
        p("div", sc, [
          ce(J),
          F.value.length ? (m(), ge(bn, {
            key: 0,
            items: F.value,
            label: `${f.value} menu`
          }, null, 8, ["items", "label"])) : V("", !0)
        ]),
        G.value ? (m(), h("div", ac, [
          U.value && !L.value ? (m(), h("button", {
            key: 0,
            type: "button",
            class: "dc-pane__button dc-control",
            "aria-label": `Minimize ${f.value}`,
            "data-dc-minimize": g.value,
            onPointerdown: N[1] || (N[1] = Se(() => {
            }, ["stop"])),
            onClick: N[2] || (N[2] = (W) => C(n).toggleMinimize(g.value))
          }, [
            ce(at, { kind: "minimize" })
          ], 40, rc)) : V("", !0),
          U.value && !L.value ? (m(), h("button", {
            key: 1,
            type: "button",
            class: "dc-pane__button dc-control",
            "aria-label": `${A.value ? "Restore" : "Maximize"} ${f.value}`,
            "aria-pressed": A.value,
            "data-dc-maximize": g.value,
            onPointerdown: N[3] || (N[3] = Se(() => {
            }, ["stop"])),
            onClick: N[4] || (N[4] = (W) => C(n).toggleMaximize(g.value))
          }, [
            ce(at, {
              kind: A.value ? "restore" : "maximize"
            }, null, 8, ["kind"])
          ], 40, lc)) : V("", !0),
          !r.value && u.value && $(u.value.id) ? (m(), h("button", {
            key: 2,
            type: "button",
            class: "dc-pane__close dc-control",
            "aria-label": `Close ${f.value}`,
            "data-dc-close": u.value.id,
            onPointerdown: N[5] || (N[5] = Se(() => {
            }, ["stop"])),
            onClick: N[6] || (N[6] = (W) => C(n).close(u.value.id))
          }, [
            ce(at, { kind: "close" })
          ], 40, oc)) : V("", !0)
        ])) : V("", !0)
      ], 40, Hi)),
      i.value ? (m(), h("div", {
        key: 1,
        id: de.value,
        class: "dc-pane__space",
        role: y.value ? void 0 : "tabpanel",
        "aria-labelledby": y.value ? void 0 : j(o.value.id)
      }, [
        yt(R.$slots, "space", {
          node: i.value,
          path: b.value
        }, void 0, !0)
      ], 8, ic)) : (m(), h("div", {
        key: 2,
        id: de.value,
        class: "dc-pane__body",
        role: y.value ? void 0 : "tabpanel",
        "aria-labelledby": y.value ? void 0 : j(l.value)
      }, [
        ce(ae)
      ], 8, cc)),
      T.value ? (m(), h("div", {
        key: 3,
        class: "dc-pane__drop",
        "data-dc-edge": T.value,
        "aria-hidden": "true"
      }, null, 8, uc)) : V("", !0)
    ], 40, Ui)) : V("", !0);
  }
}), Hs = /* @__PURE__ */ oe(dc, [["__scopeId", "data-v-44fd2b2d"]]), fc = ["data-dc-space", "data-dc-path", "aria-label"], pc = {
  key: 0,
  class: "dc-space__head"
}, vc = { class: "dc-space__title dc-truncate" }, mc = ["data-dc-direction"], hc = ["aria-orientation", "aria-label", "aria-valuenow", "aria-disabled", "tabindex", "onPointerdown", "onKeydown"], _c = /* @__PURE__ */ le({
  __name: "WindowNode",
  props: {
    node: {},
    path: {},
    framed: { type: Boolean }
  },
  setup(e) {
    const t = e, n = Rn(), s = B(null), a = _(() => q(t.node) ? t.node : null), r = _(() => Ye(t.node) ? t.node : null), o = _(() => X(t.node) ? t.node : null), i = _(
      () => r.value ? r.value.children : o.value?.frames.map((T) => T.node) ?? []
    ), l = _(() => r.value ? Ge(r.value) : []), u = _(
      () => (o.value?.frames ?? []).map((T, K) => ({
        held: T,
        /** Place in the stack, counted from the back — what `z-index` follows. */
        order: K,
        key: D(T.node),
        path: [...t.path, K]
      })).sort((T, K) => T.key < K.key ? -1 : T.key > K.key ? 1 : 0)
    ), f = _(() => Kt(t.node)), E = _(() => n.spaceMenu(t.path)), b = _(() => t.node.headless === !0), g = _(() => o.value ? "desktop" : r.value?.direction ?? ""), x = B(null), y = B(0);
    let w = null;
    Ee(
      x,
      (T) => {
        w?.disconnect(), w = null, !(!T || typeof ResizeObserver > "u") && (y.value = T.clientWidth, w = new ResizeObserver(([K]) => {
          y.value = K?.contentRect.width ?? 0;
        }), w.observe(T));
      },
      { immediate: !0 }
    ), Ve(() => w?.disconnect());
    const z = _(() => {
      const T = Math.max(
        1,
        Math.floor((y.value + Qe) / (an + Qe))
      ), K = /* @__PURE__ */ new Map();
      let ae = 0;
      for (const J of u.value)
        J.held.minimized === !0 && (K.set(J.key, {
          x: Qe + ae % T * (an + Qe),
          bottom: Qe + Math.floor(ae / T) * (Ls + Qe)
        }), ae += 1);
      return K;
    }), O = _(() => {
      const T = n.dropTarget.value, K = o.value;
      if (!K || !T?.rect || T.edge !== "float") return null;
      const ae = me(K, T.panel);
      return ae && K.frames.includes(ae) ? T.rect : null;
    }), U = _(() => r.value?.direction === "row"), L = _(() => i.value.map((T, K) => [...t.path, K])), D = (T) => [...De(T)].sort().join("/"), F = (T) => {
      const K = De(T)[0];
      return (K ? n.panelFor(K)?.title : null) ?? K ?? "panel";
    }, $ = (T) => {
      const K = i.value[T], ae = i.value[T + 1];
      return !K || !ae ? "Resize panels" : `Resize ${F(K)} and ${F(ae)}`;
    }, A = (T) => {
      const K = l.value[T] ?? 0, ae = l.value[T + 1] ?? 0, J = K + ae;
      return J > 0 ? Math.round(K / J * 100) : 50;
    };
    function G() {
      const T = s.value, K = T ? U.value ? T.clientWidth : T.clientHeight : 0;
      return K <= 0 ? 0.05 : Math.min(n.minPanelSize.value / K, 0.4);
    }
    let j = null;
    function de(T, K) {
      const ae = r.value, J = s.value;
      if (!n.resizable.value || !ae || !J || T.button !== 0) return;
      const se = U.value ? J.clientWidth : J.clientHeight;
      if (se <= 0) return;
      const ke = U.value ? T.clientX : T.clientY, xe = Ge(ae), Ke = Math.min(n.minPanelSize.value / se, 0.4);
      T.preventDefault();
      const je = (Me) => {
        const qe = ((U.value ? Me.clientX : Me.clientY) - ke) / se;
        n.setSizes(t.path, es(xe, K, qe, Ke));
      }, Pe = () => j?.(), Be = (Me) => {
        Me.key === "Escape" && (n.setSizes(t.path, xe), j?.());
      };
      j = () => {
        window.removeEventListener("pointermove", je), window.removeEventListener("pointerup", Pe), window.removeEventListener("pointercancel", Pe), window.removeEventListener("keydown", Be), j = null;
      }, window.addEventListener("pointermove", je), window.addEventListener("pointerup", Pe), window.addEventListener("pointercancel", Pe), window.addEventListener("keydown", Be);
    }
    Ve(() => j?.());
    function Z(T, K) {
      const ae = r.value;
      if (!n.resizable.value || !ae) return;
      const J = U.value ? "ArrowRight" : "ArrowDown", se = U.value ? "ArrowLeft" : "ArrowUp", ke = T.shiftKey ? 0.1 : 0.02;
      if (T.key !== J && T.key !== se) return;
      const xe = T.key === J ? ke : -ke;
      T.preventDefault(), n.setSizes(t.path, es(Ge(ae), K, xe, G()));
    }
    return (T, K) => {
      const ae = rs("WindowNode", !0);
      return a.value ? (m(), ge(Hs, {
        key: 0,
        group: a.value,
        path: e.path
      }, {
        space: Jt(({ node: J, path: se }) => [
          ce(ae, {
            node: J,
            path: se,
            framed: ""
          }, null, 8, ["node", "path"])
        ]),
        _: 1
      }, 8, ["group", "path"])) : (m(), h("section", {
        key: 1,
        class: "dc-space",
        "data-dc-space": g.value,
        "data-dc-path": e.path.join("/"),
        "aria-label": f.value
      }, [
        !e.framed && !b.value ? (m(), h("header", pc, [
          p("span", vc, M(f.value), 1),
          E.value.length ? (m(), ge(bn, {
            key: 0,
            items: E.value,
            label: `${f.value} menu`
          }, null, 8, ["items", "label"])) : V("", !0)
        ])) : V("", !0),
        o.value ? (m(), h("div", {
          key: 1,
          ref_key: "desktop",
          ref: x,
          class: "dc-window__desktop"
        }, [
          O.value ? (m(), h("div", {
            key: 0,
            class: "dc-window__drop",
            style: ze({
              left: `${O.value.x}px`,
              top: `${O.value.y}px`,
              width: `${O.value.w}px`,
              height: `${O.value.h}px`
            }),
            "aria-hidden": "true"
          }, null, 4)) : V("", !0),
          (m(!0), h(te, null, ue(u.value, (J) => (m(), ge(qi, {
            key: J.key,
            frame: J.held,
            path: J.path,
            order: J.order,
            place: z.value.get(J.key) ?? null
          }, {
            default: Jt(() => [
              ce(ae, {
                node: J.held.node,
                path: J.path,
                framed: J.held.node.kind !== "group"
              }, null, 8, ["node", "path", "framed"])
            ]),
            _: 2
          }, 1032, ["frame", "path", "order", "place"]))), 128))
        ], 512)) : r.value ? (m(), h("div", {
          key: 2,
          ref_key: "container",
          ref: s,
          class: "dc-window__split",
          "data-dc-direction": r.value.direction
        }, [
          (m(!0), h(te, null, ue(i.value, (J, se) => (m(), h(te, {
            key: D(J)
          }, [
            p("div", {
              class: "dc-window__cell",
              style: ze({ flexGrow: l.value[se] ?? 1 })
            }, [
              ce(ae, {
                node: J,
                path: L.value[se] ?? []
              }, null, 8, ["node", "path"])
            ], 4),
            se < i.value.length - 1 ? (m(), h("div", {
              key: 0,
              class: "dc-window__gutter",
              role: "separator",
              "aria-orientation": U.value ? "vertical" : "horizontal",
              "aria-label": $(se),
              "aria-valuenow": A(se),
              "aria-valuemin": "0",
              "aria-valuemax": "100",
              "aria-disabled": C(n).resizable.value ? void 0 : "true",
              tabindex: C(n).resizable.value ? 0 : -1,
              onPointerdown: (ke) => de(ke, se),
              onKeydown: (ke) => Z(ke, se)
            }, null, 40, hc)) : V("", !0)
          ], 64))), 128))
        ], 8, mc)) : V("", !0)
      ], 8, fc));
    };
  }
}), gc = /* @__PURE__ */ oe(_c, [["__scopeId", "data-v-75dfd4c3"]]), yc = ["data-dc-theme", "data-dc-dragging", "data-dc-docking"], wc = {
  key: 1,
  class: "dc-window__empty"
}, bc = {
  class: "dc-window__live",
  "aria-live": "polite",
  role: "status"
}, St = 16, kc = /* @__PURE__ */ le({
  __name: "WindowFrame",
  props: /* @__PURE__ */ Dt({
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
  emits: /* @__PURE__ */ Dt(["panel-move", "view-change", "panel-activate", "tab-select", "frame-change", "frame-maximize", "frame-minimize", "panel-close"], ["update:layout", "update:views"]),
  setup(e, { expose: t, emit: n }) {
    const s = e, a = n, r = Lt(e, "layout"), o = Lt(e, "views"), i = ss(), l = _(() => new Map(s.panels.map((c) => [c.id, c]))), u = _(() => s.panels.map((c) => c.id)), f = _(() => Mi(r.value, u.value)), E = B(null), b = B(null), g = B(null), x = B(!0), y = B(null), w = B(null), z = B(null), O = B(""), U = B(null);
    function L() {
      const c = U.value;
      return c ? [...c.querySelectorAll(".dc-pane[data-dc-panels]")].filter((v) => v.closest(".dc-window") === c).map((v) => ({ panels: (v.dataset.dcPanels ?? "").split(" "), element: v })) : [];
    }
    function D(c) {
      const d = [];
      let v = c.closest(".dc-float");
      for (; v; )
        d.unshift(Number(v.dataset.dcOrder ?? 0)), v = v.parentElement?.closest(".dc-float") ?? null;
      return d;
    }
    function F() {
      return L().map((c) => ({ pane: c, order: D(c.element) })).sort((c, d) => {
        const v = Math.max(c.order.length, d.order.length);
        for (let k = 0; k < v; k += 1) {
          const S = (c.order[k] ?? -1) - (d.order[k] ?? -1);
          if (S !== 0) return S;
        }
        return 0;
      }).map((c) => c.pane);
    }
    const $ = (c) => L().find((d) => d.panels.includes(c)) ?? null;
    function A(c) {
      const d = l.value.get(c);
      if (!d) return "";
      const v = o.value[c];
      return v && d.views?.some((k) => k.key === v) ? v : d.defaultView ?? d.views?.[0]?.key ?? "";
    }
    function G(c, d) {
      o.value = { ...o.value, [c]: d }, a("view-change", { panel: c, view: d });
    }
    const j = _(
      () => s.panels.filter((c) => c.fixed !== !0).length
    );
    function de(c) {
      return !s.movable || j.value < 1 || s.panels.length < 2 ? !1 : l.value.get(c)?.fixed !== !0;
    }
    function Z(c, d) {
      const v = f.value;
      !c || !v || c === v || (r.value = c, d && a("panel-move", d));
    }
    function T(c, d, v) {
      if (c.width <= 0 || c.height <= 0) return "center";
      const k = (d - c.left) / c.width, S = (v - c.top) / c.height, P = 0.3;
      return k > P && k < 1 - P && S > P && S < 1 - P ? "center" : [
        { edge: "left", distance: k },
        { edge: "right", distance: 1 - k },
        { edge: "top", distance: S },
        { edge: "bottom", distance: 1 - S }
      ].reduce(
        (I, Y) => Y.distance < I.distance ? Y : I
      ).edge;
    }
    function K(c, d) {
      const v = [...c.querySelectorAll(".dc-tab")], k = v.findIndex((S) => {
        const P = S.getBoundingClientRect();
        return d < P.left + P.width / 2;
      });
      return k === -1 ? v.length : k;
    }
    function ae(c, d, v) {
      for (const { panels: k, element: S } of F().reverse()) {
        const P = S.getBoundingClientRect();
        if (c < P.left || c > P.right || d < P.top || d > P.bottom) continue;
        const ee = k.find((ne) => ne !== v), I = S.querySelector(".dc-pane__tabs"), Y = I?.getBoundingClientRect();
        if (I && Y && d >= Y.top && d <= Y.bottom)
          return ee ? { panel: ee, edge: "center", index: K(I, c) } : null;
        const H = S.querySelector(":scope > .dc-pane__space");
        if (H) {
          const ne = H.getBoundingClientRect();
          if (c >= ne.left && c <= ne.right && d >= ne.top && d <= ne.bottom) continue;
        }
        return ee ? { panel: ee, edge: T(P, c, d) } : null;
      }
      return se(c, d, v);
    }
    function J() {
      const c = U.value;
      return c ? [...c.querySelectorAll(".dc-window__desktop")].filter((d) => d.closest(".dc-window") === c).reverse() : [];
    }
    function se(c, d, v) {
      const k = f.value;
      if (!k) return null;
      for (const S of J()) {
        const P = S.getBoundingClientRect();
        if (c < P.left || c > P.right || d < P.top || d > P.bottom) continue;
        const ee = ke(S).flatMap((H) => H.panels).find((H) => H !== v);
        if (!ee) return null;
        const I = me(k, v)?.rect, Y = Yt(
          {
            x: c - P.left - 24,
            y: d - P.top - 12,
            w: I?.w ?? lt.w,
            h: I?.h ?? lt.h
          },
          { w: S.clientWidth, h: S.clientHeight },
          s.minPanelSize
        );
        return { panel: ee, edge: "float", rect: Y };
      }
      return null;
    }
    function ke(c) {
      return L().filter(
        (d) => d.element.closest(".dc-window__desktop") === c
      );
    }
    let xe = null;
    const Ke = (c) => c.altKey;
    function je(c, d) {
      if (!de(c) || b.value || w.value || d.button !== 0) return;
      const v = d.clientX, k = d.clientY;
      let S = !1, P = Ke(d);
      const ee = () => {
        const fe = z.value;
        fe && (g.value = P ? se(fe.x, fe.y, c) : ae(fe.x, fe.y, c));
      }, I = (fe) => {
        if (!S) {
          if (Math.hypot(fe.clientX - v, fe.clientY - k) < 4) return;
          S = !0, b.value = c, y.value = null;
        }
        P = Ke(fe), x.value = !P, z.value = { x: fe.clientX, y: fe.clientY }, ee();
      }, Y = (fe) => {
        Ke(fe) !== P && (P = !P, x.value = !P, S && ee());
      }, H = (fe) => {
        xe?.();
        const pe = g.value, We = f.value;
        if (fe && S && pe && We) {
          const Et = pe.edge === "float" && pe.rect ? Zn(We, c, pe.panel, pe.rect) : Pt(We, c, pe.panel, pe.edge, pe.index);
          Z(Et, {
            panel: c,
            target: pe.panel,
            edge: pe.edge,
            ...pe.index === void 0 ? {} : { index: pe.index },
            ...pe.rect === void 0 ? {} : { rect: pe.rect }
          });
        }
        b.value = null, g.value = null, z.value = null, x.value = !0;
      }, ne = () => H(!0), ie = () => H(!1), _e = (fe) => {
        if (fe.key === "Escape") {
          H(!1);
          return;
        }
        Y(fe);
      };
      xe = () => {
        window.removeEventListener("pointermove", I), window.removeEventListener("pointerup", ne), window.removeEventListener("pointercancel", ie), window.removeEventListener("keydown", _e), window.removeEventListener("keyup", Y), xe = null;
      }, window.addEventListener("pointermove", I), window.addEventListener("pointerup", ne), window.addEventListener("pointercancel", ie), window.addEventListener("keydown", _e), window.addEventListener("keyup", Y);
    }
    Ve(() => xe?.());
    let Pe = null;
    function Be(c) {
      const d = U.value;
      return d ? [...d.querySelectorAll(
        `.dc-float[data-dc-path="${c.join("/")}"]`
      )].find((S) => S.closest(".dc-window") === d)?.parentElement ?? null : null;
    }
    function Me(c) {
      const d = f.value;
      return d ? ln(d, c) : null;
    }
    function qe(c) {
      const d = f.value;
      if (!d) return;
      const v = ht(d, c);
      v !== d && (r.value = v);
    }
    function Mt(c) {
      const d = Me(c);
      d && qe(d);
    }
    function Bt(c) {
      const d = f.value, v = d ? me(d, c) : null;
      return v !== null && Ne(v);
    }
    function qt(c) {
      const d = f.value, v = d ? me(d, c) : null;
      return v !== null && He(v);
    }
    function Wt(c) {
      const d = f.value, v = d ? Ue(d, c) : null;
      return v ? be(v.node) : "";
    }
    function R(c) {
      const d = f.value, v = d ? Ue(d, c) : null;
      if (!d || !v) return;
      const k = be(v.node);
      if (l.value.get(k)?.fixed === !0) return;
      const S = !He(v);
      let P = _i(d, c, S);
      P !== d && (S || (P = ht(P, c)), r.value = P, a("frame-minimize", { panel: k, minimized: S }));
    }
    function N(c) {
      const d = Me(c);
      d && R(d);
    }
    function W(c) {
      const d = f.value, v = d ? Ue(d, c) : null;
      if (!d || !v) return;
      const k = be(v.node);
      if (l.value.get(k)?.fixed === !0) return;
      const S = !Ne(v);
      let P = hi(d, c, S);
      P !== d && (S && (P = ht(P, c)), r.value = P, a("frame-maximize", { panel: k, maximized: S }));
    }
    function we(c) {
      const d = Me(c);
      d && W(d);
    }
    function he(c, d, v) {
      const k = f.value, S = k ? Ue(k, c) : null;
      if (!k || !S || d.button !== 0 || b.value || w.value) return;
      const P = be(S.node);
      if (l.value.get(P)?.fixed === !0 || Ne(S) || He(S) || (v === "move" ? !s.movable : !s.resizable)) return;
      const ee = Be(c), I = gi(k, c);
      qe(c);
      const Y = { w: ee?.clientWidth ?? 0, h: ee?.clientHeight ?? 0 }, H = { ...S.rect }, ne = d.clientX, ie = d.clientY, _e = s.minPanelSize;
      w.value = P;
      const fe = (Re) => {
        const Te = f.value;
        if (!Te) return;
        const dt = Qn(Te, I, Yt(Re, Y, _e));
        dt !== Te && (r.value = dt);
      }, pe = (Re) => {
        Re.preventDefault();
        const Te = Re.clientX - ne, dt = Re.clientY - ie;
        fe(
          v === "move" ? { ...H, x: H.x + Te, y: H.y + dt } : jn(H, v, Te, dt, _e)
        );
      }, We = (Re) => {
        if (Pe?.(), w.value = null, !Re) {
          fe(H);
          return;
        }
        const Te = f.value ? Ue(f.value, I) : null;
        Te && a("frame-change", { panel: Wt(I), rect: Te.rect });
      }, Et = () => We(!0), Kn = () => We(!1), Bn = (Re) => {
        Re.key === "Escape" && We(!1);
      };
      Pe = () => {
        window.removeEventListener("pointermove", pe), window.removeEventListener("pointerup", Et), window.removeEventListener("pointercancel", Kn), window.removeEventListener("keydown", Bn), Pe = null;
      }, window.addEventListener("pointermove", pe), window.addEventListener("pointerup", Et), window.addEventListener("pointercancel", Kn), window.addEventListener("keydown", Bn);
    }
    function Ct(c, d, v) {
      const k = Me(c);
      k && he(k, d, v);
    }
    function Xs(c, d, v = !1) {
      const k = f.value, S = Me(c), P = k && S ? Ue(k, S) : null;
      if (!k || !S || !P || l.value.get(c)?.fixed === !0 || (v ? !s.resizable : !s.movable)) return;
      if (Ne(P) || He(P)) {
        O.value = `${Ae(c)} is ${Ne(P) ? "maximized" : "minimized"}, so it cannot be moved.`;
        return;
      }
      const ee = d === "left" ? -St : d === "right" ? St : 0, I = d === "up" ? -St : d === "down" ? St : 0, Y = Be(S), H = { w: Y?.clientWidth ?? 0, h: Y?.clientHeight ?? 0 }, ne = v ? jn(P.rect, "se", ee, I, s.minPanelSize) : { ...P.rect, x: P.rect.x + ee, y: P.rect.y + I }, ie = Qn(k, S, Yt(ne, H, s.minPanelSize));
      if (ie === k) {
        O.value = v ? `${Ae(c)} cannot be resized further.` : `${Ae(c)} cannot move ${d}.`;
        return;
      }
      r.value = ie;
      const _e = Ue(ie, S);
      _e && (a("frame-change", { panel: c, rect: _e.rect }), O.value = v ? `${Ae(c)} resized to ${_e.rect.w} by ${_e.rect.h}.` : `${Ae(c)} moved to ${_e.rect.x}, ${_e.rect.y}.`);
    }
    Ve(() => Pe?.());
    function Gs(c, d) {
      const v = $(c), k = v?.element.getBoundingClientRect();
      if (!v || !k) return null;
      const S = d === "left" || d === "right";
      let P = null;
      for (const ee of L()) {
        if (ee === v || ee.element === v.element) continue;
        const I = ee.element.getBoundingClientRect();
        if (!(S ? I.bottom > k.top + 1 && I.top < k.bottom - 1 : I.right > k.left + 1 && I.left < k.right - 1)) continue;
        const H = d === "left" ? k.left - I.right : d === "right" ? I.left - k.right : d === "up" ? k.top - I.bottom : I.top - k.bottom;
        if (H < -1) continue;
        const ne = ee.panels.find((ie) => ie !== c);
        ne && (!P || H < P.distance) && (P = { id: ne, distance: H });
      }
      return P?.id ?? null;
    }
    function Ys(c) {
      const d = f.value ? me(f.value, c) !== null : !1;
      if (!d && !de(c)) return;
      y.value = y.value === c ? null : c;
      const v = Ae(c);
      if (!y.value) {
        O.value = `${v}: move mode off.`;
        return;
      }
      O.value = d ? `${v}: move mode on. Arrow keys move the window, shift and an arrow resize it, Escape leaves move mode.` : `${v}: move mode on. Arrow keys move the panel, shift and an arrow make it a tab of the panel that way, Escape leaves move mode.`;
    }
    const Ae = (c) => l.value.get(c)?.title ?? c, js = {
      left: "left",
      right: "right",
      up: "top",
      down: "bottom"
    };
    function Qs(c, d, v = !1) {
      if (!de(c)) return;
      const k = f.value;
      if (!k) return;
      const S = Ae(c), P = Je(k, c);
      if (!v && P && (d === "left" || d === "right") && P.panels.length > 1) {
        const ne = P.panels.indexOf(c), ie = d === "left" ? ne - 1 : ne + 1;
        if (ie >= 0 && ie < P.panels.length) {
          Z(_t(k, c, ie), { panel: c, target: c, edge: "center", index: ie }), O.value = `${S} moved ${d}, now tab ${ie + 1} of ${P.panels.length}.`, Ln(c);
          return;
        }
      }
      const I = Gs(c, d);
      if (!I || !de(I)) {
        O.value = `${S} cannot move ${d}.`;
        return;
      }
      const Y = js[d], H = P?.panels.length === 1 && Je(k, I)?.panels.length === 1;
      v ? (Z(Pt(k, c, I, "center"), {
        panel: c,
        target: I,
        edge: "center"
      }), O.value = `${S} joined ${Ae(I)} as a tab.`) : H ? (Z(Ft(k, c, I), { panel: c, target: I, edge: Y }), O.value = `${S} moved ${d}, trading places with ${Ae(I)}.`) : (Z(Pt(k, c, I, Y), { panel: c, target: I, edge: Y }), O.value = `${S} moved ${d}, beside ${Ae(I)}.`), Ln(c);
    }
    function Ln(c) {
      wt(() => {
        $(c)?.element.querySelector(".dc-pane__grip")?.focus();
      });
    }
    function Zs(c, d) {
      const v = f.value;
      v && (r.value = Rt(v, c, d));
    }
    function Ut(c) {
      const d = f.value;
      if (!d) return;
      const v = nt(d, c);
      v !== d && (r.value = v, a("tab-select", { panel: c }));
    }
    function Dn(c) {
      return l.value.get(c)?.closable ?? s.closable;
    }
    function Js(c) {
      Dn(c) && a("panel-close", c);
    }
    const Ht = B(/* @__PURE__ */ new Map());
    let ea = 0;
    function ta(c, d) {
      const v = ea += 1;
      return Ht.value.set(v, { panel: c, items: d }), () => {
        Ht.value.delete(v);
      };
    }
    function na(c) {
      const d = [];
      for (const v of Ht.value.values())
        v.panel() === c && d.push(...v.items());
      return d;
    }
    function In(c) {
      const d = c.filter((v) => v.items.length > 0);
      return d.length < 2 ? d.flatMap((v) => v.items) : d.flatMap((v) => [
        { id: v.id, heading: !0, label: v.title },
        ...v.items
      ]);
    }
    const Nn = (c) => c.title || "These tabs";
    function sa(c, d) {
      const v = d.id, k = Je(c, v), S = (k?.panels.length ?? 0) > 1, P = k?.fixedView === !0, ee = (ne) => ({
        disabled: ne === c,
        action: () => {
          ne !== c && (r.value = ne);
        }
      }), I = [], Y = [], H = d.views ?? [];
      if (H.length > 1 && !P) {
        const ne = A(v);
        I.push({
          id: "view",
          label: "View",
          items: H.map((ie) => ({
            id: `view-${ie.key}`,
            label: ie.label,
            checked: ie.key === ne,
            action: () => G(v, ie.key)
          }))
        });
      }
      return S && !P && Y.push(
        { id: "show-row", label: "Row", checked: !1, ...ee(Jn(c, v, "row")) },
        {
          id: "show-column",
          label: "Column",
          checked: !1,
          ...ee(Jn(c, v, "column"))
        },
        // Already true, and nothing to collapse: these panes are tabs.
        { id: "show-tabs", label: "Tabs", checked: !0, disabled: !0 },
        {
          id: "show-desktop",
          label: "Desktop",
          checked: !1,
          ...ee(ki(c, v))
        }
      ), S && k && (Y.length && Y.push({ separator: !0 }), Y.push(...On(k, v))), { panel: I, tabs: Y, tabsTitle: k ? Nn(k) : "" };
    }
    function On(c, d) {
      const v = ut(c), k = (S) => {
        const P = c.panels[(v + S + c.panels.length) % c.panels.length];
        return (P === void 0 ? "" : be(P)) || d;
      };
      return [
        { id: "next-tab", label: "Next tab", action: () => Ut(k(1)) },
        { id: "previous-tab", label: "Previous tab", action: () => Ut(k(-1)) }
      ];
    }
    function aa(c) {
      const d = f.value;
      if (!s.menu || !d) return [];
      const v = it(d, c);
      if (!v || q(v)) return [];
      if (v.fixedView) return [];
      const k = X(v) ? "desktop" : v.direction, S = Ye(v) && v.children.length === 1, P = (H, ne, ie) => k === H || S && H !== "desktop" ? { id: `show-${H}`, label: ne, checked: k === H, disabled: !0 } : {
        id: `show-${H}`,
        label: ne,
        checked: !1,
        action: () => {
          const _e = f.value;
          _e && (r.value = cn(ve(st(_e, c, ie()))));
        }
      }, ee = (H) => () => X(v) ? Us(v, H) : { ...v, direction: H }, I = c.length > 0 ? it(d, c.slice(0, -1)) : null, Y = I && q(I) && I.panels.length > 1 ? I : null;
      return In([
        {
          id: "about-space",
          /*
           * Its own name, or what it is rather than how it is shown: `spaceTitle`
           * would answer "Row" for an unnamed row, which is the item directly
           * under it and the one already ticked.
           */
          title: v.title || "This space",
          items: [
            P("row", "Row", ee("row")),
            P("column", "Column", ee("column")),
            // Everything in this space in one strip: the panes as tabs, and a
            // desktop among them as a tab of its own, keeping the windows on it.
            P("tabs", "Tabs", () => Bs(v, ra(v))),
            P("desktop", "Desktop", () => X(v) ? v : Ws(v))
          ]
        },
        {
          id: "about-tabs",
          title: Y ? Nn(Y) : "",
          items: Y ? On(Y, be(v)) : []
        }
      ]);
    }
    function ra(c) {
      const d = E.value;
      return d && Q(c, d) ? d : void 0;
    }
    function la(c) {
      const d = f.value, v = l.value.get(c);
      if (!d || !v) return [];
      const k = s.menu ? sa(d, v) : null, S = na(c);
      S.length && k?.panel.length && S.push({ separator: !0 }), k && S.push(...k.panel);
      const P = In([
        { id: "about-panel", title: v.title, items: S },
        { id: "about-tabs", title: k?.tabsTitle ?? "", items: k?.tabs ?? [] }
      ]);
      return s.paneMenu ? s.paneMenu(v, P) : P;
    }
    function oa(c, d) {
      return i[`${c}-${d}`] ?? i[c];
    }
    function Vn(c, d, v, k) {
      return oa(c, d.id)?.({ panel: d, view: v, active: k });
    }
    Ci({
      panelFor: (c) => l.value.get(c) ?? null,
      viewFor: A,
      setView: G,
      movable: _(() => s.movable),
      resizable: _(() => s.resizable),
      minPanelSize: _(() => s.minPanelSize),
      spaceNames: _(() => s.spaceNames),
      focused: E,
      dragging: b,
      dropTarget: g,
      moving: y,
      framing: w,
      canMove: de,
      focus(c) {
        E.value !== c && (E.value = c, a("panel-activate", c));
      },
      selectPanel: Ut,
      beginDrag: je,
      toggleMoveMode: Ys,
      nudge: Qs,
      setSizes: Zs,
      frameOf: (c) => f.value ? me(f.value, c) : null,
      beginFrameDrag: Ct,
      nudgeFrame: Xs,
      raise: Mt,
      maximized: Bt,
      toggleMaximize: we,
      minimized: qt,
      toggleMinimize: N,
      beginFrameDragAt: he,
      raiseAt: qe,
      toggleMaximizeAt: W,
      toggleMinimizeAt: R,
      menuFor: la,
      spaceMenu: aa,
      registerMenu: ta,
      closable: Dn,
      close: Js,
      renderContent: (c, d, v) => Vn("panel", c, d, v),
      renderActions: (c, d, v) => Vn("actions", c, d, v),
      layout: f
    });
    const ia = _(() => {
      if (!(!s.accent && !s.tokens))
        return { ...s.tokens, ...s.accent ? { "--dc-accent": s.accent } : {} };
    }), ca = () => {
      const c = b.value, d = z.value;
      return !c || !d ? null : ha(
        "div",
        {
          class: "dc-window__ghost",
          style: { left: `${d.x}px`, top: `${d.y}px` },
          "aria-hidden": "true"
        },
        l.value.get(c)?.title ?? c
      );
    };
    return t({
      /** The layout as rendered, reconciled against the current panels. */
      layout: f,
      /** Moves a panel programmatically — the same operation a drag performs. */
      move(c, d, v, k) {
        const S = f.value;
        S && Z(Pt(S, c, d, v, k), {
          panel: c,
          target: d,
          edge: v,
          ...k === void 0 ? {} : { index: k }
        });
      },
      /** Brings a panel's tab to the top of its group. */
      select(c) {
        const d = f.value;
        d && (r.value = nt(d, c));
      },
      /** Lifts a panel onto the float holding `near`, as a window of its own. */
      float(c, d, v) {
        const k = f.value;
        k && Z(Zn(k, c, d, v), {
          panel: c,
          target: d,
          edge: "float",
          rect: v
        });
      },
      /** Puts a floating frame somewhere else, or makes it another size. */
      setRect(c, d) {
        const v = f.value;
        if (!v) return;
        const k = pi(v, c, d);
        if (k === v) return;
        r.value = k;
        const S = me(k, c);
        S && a("frame-change", { panel: c, rect: S.rect });
      },
      /**
       * Puts a panel on one of its views, the way its menu would — the way a pane
       * whose space fixed its view, or took its bar away, is switched at all.
       */
      setView: G,
      /** Brings a floating frame to the front of its stack. */
      raise: Mt,
      /** Fills the float with a window, or puts it back where it was. */
      toggleMaximize: we,
      /** Rolls a window up to its title bar, or unrolls it. */
      toggleMinimize: N
    }), (c, d) => (m(), h("div", {
      ref_key: "root",
      ref: U,
      class: "dc-shell dc-window",
      "data-dc-theme": e.theme,
      "data-dc-dragging": b.value ? "true" : "false",
      "data-dc-docking": x.value ? "true" : "false",
      style: ze(ia.value)
    }, [
      f.value ? (m(), ge(gc, {
        key: 0,
        node: f.value,
        path: []
      }, null, 8, ["node"])) : (m(), h("p", wc, " This window has no panels. ")),
      ce(ca),
      p("p", bc, M(O.value), 1)
    ], 12, yc));
  }
}), $c = /* @__PURE__ */ oe(kc, [["__scopeId", "data-v-159bdf48"]]);
function Bc(e = "", t = "/") {
  const n = B(Le(e)), s = B(t), a = [`${s.value}${n.value}`];
  return {
    search: n,
    path: s,
    history: a,
    push(r) {
      n.value = Le(r), a.push(`${s.value}${n.value}`);
    },
    replace(r) {
      n.value = Le(r), a[a.length - 1] = `${s.value}${n.value}`;
    }
  };
}
function ns(e) {
  const t = e.indexOf("?");
  if (t === -1) return "";
  const n = e.slice(t), s = n.indexOf("#");
  return Le(s === -1 ? n : n.slice(0, s));
}
function qc(e) {
  const t = B(ns(e.currentRoute.value.fullPath)), n = _(() => e.currentRoute.value.path), s = Ee(
    () => e.currentRoute.value.fullPath,
    (a) => {
      t.value = ns(a);
    }
  );
  return {
    search: t,
    path: n,
    push: (a) => e.push(`${n.value}${Le(a)}`),
    replace: (a) => e.replace(`${n.value}${Le(a)}`),
    dispose: s
  };
}
const xc = {
  DataShell: Xo,
  ShellHeader: ws,
  QueryPanel: ks,
  ResultsArea: Fs,
  FacetControl: bs,
  SegmentedControl: nn,
  StatusPill: bt,
  ScoreMeter: Ps,
  WindowFrame: $c,
  WindowPane: Hs,
  ListView: sn,
  CardsView: Ms,
  GridView: Cs,
  TableView: As,
  LinksView: Es,
  PreviewView: Ss,
  TypeCardsView: zs
}, Wc = {
  install(e, t = {}) {
    const n = t.prefix ?? "";
    for (const [s, a] of Object.entries(xc))
      e.component(`${n}${s}`, a);
    t.route && e.provide(ls, t.route);
  }
};
export {
  Nt as CASCADE_STEP,
  Ms as CardsView,
  lt as DEFAULT_FRAME,
  Ec as DEFAULT_SORT,
  ga as DEFAULT_VIEW,
  Xo as DataShell,
  hs as ENTITY_ALL,
  tn as ENTITY_TERM,
  yn as FACET_PREFIX,
  bs as FacetControl,
  $s as GENERIC_LABELS,
  Cs as GridView,
  Wc as HeaderContentLayoutPlugin,
  Es as LinksView,
  sn as ListView,
  Qe as MINIMIZED_GAP,
  Ls as MINIMIZED_HEIGHT,
  an as MINIMIZED_WIDTH,
  Ts as MIN_FRAME,
  Hn as MOCK_TINTS,
  Sc as MenuBar,
  bn as MenuButton,
  Rs as MenuList,
  Tn as PANE_CONTEXT_KEY,
  _n as PARAM_DIR,
  vn as PARAM_ENTITY,
  gn as PARAM_EXPR,
  hn as PARAM_SORT,
  mn as PARAM_VIEW,
  wn as PinStar,
  Ss as PreviewView,
  ks as QueryPanel,
  qn as RECORD_STATUSES,
  ls as ROUTE_ADAPTER_KEY,
  Fs as ResultsArea,
  ms as SHELL_CONTEXT_KEY,
  Cc as SHELL_THEMES,
  Ps as ScoreMeter,
  nn as SegmentedControl,
  ws as ShellHeader,
  bt as StatusPill,
  As as TableView,
  zs as TypeCardsView,
  os as VIEW_KINDS,
  Fn as WINDOW_CONTEXT_KEY,
  $c as WindowFrame,
  Hs as WindowPane,
  Ds as activePanel,
  ut as activeTab,
  di as axisOf,
  Mn as cascade,
  Yt as clampRect,
  Bs as collapseSpace,
  Ic as collapseToTabs,
  zc as column,
  _a as createHistoryAdapter,
  Bc as createMemoryAdapter,
  za as createMockDataSource,
  qc as createVueRouterAdapter,
  ts as defaultLayout,
  pn as defaultQuery,
  It as emptyFacetState,
  dn as emptyFacetValue,
  Ze as findEntity,
  Xe as findSort,
  Rc as fixedView,
  xn as float,
  Zn as floatPanel,
  Ws as floatSplit,
  ki as floatTabs,
  Wn as fnv1a,
  cs as focusEntity,
  Ma as formatDate,
  Un as formatMetric,
  Ca as formatOrdinal,
  vs as formatPercent,
  $n as frame,
  Ue as frameAt,
  me as frameOf,
  ln as framePathOf,
  be as frontPanel,
  Pa as generateRows,
  Ac as group,
  Je as groupOf,
  fi as groups,
  fs as hasActiveFacets,
  Q as hasPanel,
  Fc as headless,
  pt as insertPanel,
  mt as isChoosable,
  Pc as isEntityScoped,
  ds as isFacetActive,
  X as isFloat,
  q as isGroup,
  Ne as isMaximized,
  He as isMinimized,
  re as isPanelTab,
  fn as isPristineQuery,
  Ye as isSplit,
  Ce as isTabOf,
  is as isViewKind,
  xa as matchesExpression,
  Sa as matchesFacets,
  vi as maximizeFrame,
  hi as maximizeFrameAt,
  mi as minimizeFrame,
  _i as minimizeFrameAt,
  Pt as movePanel,
  _t as moveTab,
  it as nodeAt,
  gt as nodeTitle,
  ve as normalizeLayout,
  Le as normalizeSearch,
  An as normalizeSizes,
  De as panelIds,
  Oe as panelNode,
  Yn as panelTabs,
  ba as parseExpression,
  Na as parseQuery,
  xs as presentRow,
  Wi as providePaneContext,
  Fa as provideShellContext,
  Ci as provideWindowContext,
  jt as raiseFrame,
  ht as raiseFrameAt,
  gi as raisedPath,
  ps as reconcileFacets,
  Mi as reconcileLayout,
  tt as removePanel,
  st as replaceAt,
  jn as resizeRect,
  es as resizeSplit,
  cn as rootSpace,
  En as row,
  Gn as serializeQuery,
  nt as setActivePanel,
  pi as setFrameRect,
  Qn as setFrameRectAt,
  Rt as setSizesAt,
  Dc as setSplitDirection,
  Ge as sizesOf,
  us as sortsFor,
  ye as spaceChrome,
  Kt as spaceTitle,
  Cn as split,
  Jn as spreadTabs,
  Va as summarizeQuery,
  ys as summaryTerms,
  Ft as swapPanels,
  kn as tabNode,
  Ot as tabPanels,
  Us as tileFloat,
  Nc as toFloat,
  Oc as toTiled,
  Tc as toggleMaximized,
  Lc as toggleMinimized,
  ho as useEntityPreviews,
  Vc as usePaneContext,
  Kc as usePaneMenu,
  ct as usePresentedRows,
  Ka as useQueryState,
  Ba as useResults,
  $e as useShellContext,
  Hr as useViewLabels,
  Rn as useWindowContext
};
