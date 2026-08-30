import { ref as W, inject as _t, provide as yn, computed as g, toValue as xt, shallowRef as Ut, watch as xe, defineComponent as ce, openBlock as m, createElementBlock as _, createElementVNode as v, toDisplayString as S, createCommentVNode as N, unref as C, renderSlot as Ke, Fragment as ae, renderList as ve, withDirectives as ln, withKeys as Ht, withModifiers as Fe, vModelText as on, normalizeClass as Sa, useSlots as wn, nextTick as At, createBlock as ge, createVNode as J, createTextVNode as Ae, withCtx as it, normalizeStyle as Le, resolveDynamicComponent as Pa, useModel as Gt, onBeforeUnmount as Ze, useId as ms, createSlots as Jn, mergeModels as Xt, onMounted as Aa, resolveComponent as hs, getCurrentScope as za, onScopeDispose as Ra, h as Fa } from "vue";
const _s = Symbol("dc.routeAdapter");
function qe(e) {
  if (!e) return "";
  const t = e.replace(/^[?]/, "");
  return t ? `?${t}` : "";
}
function Ta() {
  const e = typeof window < "u", t = W(e ? qe(window.location.search) : ""), n = W(e ? window.location.pathname : "/"), s = () => {
    t.value = qe(window.location.search), n.value = window.location.pathname;
  };
  e && window.addEventListener("popstate", s);
  const a = (r, o) => {
    const c = qe(r);
    if (!e) {
      t.value = c;
      return;
    }
    const l = `${window.location.pathname}${c}${window.location.hash}`;
    o === "push" ? window.history.pushState(window.history.state, "", l) : window.history.replaceState(window.history.state, "", l), t.value = c, n.value = window.location.pathname;
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
const gs = ["list", "cards", "grid", "table", "links", "preview"], iu = [
  "minimal",
  "mono-size",
  "dark",
  "light",
  "auto",
  "macos",
  "windows",
  "inherit"
], es = ["ok", "running", "queued", "review", "failed"], La = "cards", cu = "updated";
function ys(e) {
  return typeof e == "string" && gs.includes(e);
}
function ft(e, t) {
  return t ? e.entities.find((n) => n.key === t) ?? null : null;
}
function ws(e, t = {}) {
  const n = ft(e, t.entity), s = e.entities[0];
  if (!n && !s) throw new Error(`Schema "${e.key}" declares no entities`);
  return n ?? s;
}
function bs(e) {
  return e?.sorts?.length ? e.sorts : [
    { key: "updated", label: "updated" },
    { key: "score", label: "score" },
    { key: "metric1", label: e ? e.labels.metric1.toLowerCase() : "value" },
    { key: "metric2", label: e ? e.labels.metric2.toLowerCase() : "second value" },
    { key: "name", label: "name" }
  ];
}
function at(e, t) {
  const n = bs(e);
  return (t ? n.find((a) => a.key === t) : void 0) ?? n[0];
}
function bn(e) {
  switch (e.kind) {
    case "chips":
      return { kind: "chips", selected: [] };
    case "range":
      return { kind: "range", min: null, max: null };
    case "toggle":
      return { kind: "toggle", on: !1 };
  }
}
function Yt(e) {
  const t = {};
  for (const n of e?.facets ?? []) t[n.key] = bn(n);
  return t;
}
function ks(e) {
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
function $s(e) {
  return Object.values(e).some(ks);
}
function kn(e) {
  return e.entity === null && e.expr.trim() === "" && !$s(e.facets);
}
function uu(e) {
  return e.entity !== null;
}
function xs(e) {
  return e.entity === null && e.view === "cards";
}
function Da(e, t) {
  return t <= 0 ? 1 : Math.max(1, Math.ceil(e / t));
}
function $n(e, t = {}) {
  const s = t.landing === "entity" ? ws(e, t) : null;
  return {
    entity: s?.key ?? null,
    view: t.view && ys(t.view) ? t.view : La,
    sort: at(s, t.sort).key,
    dir: t.dir === "asc" ? "asc" : "desc",
    expr: "",
    facets: Yt(s),
    page: 1
  };
}
const Ia = ["entity", "sort", "dir", "expr", "facets"];
function ts(e) {
  return Ia.some((t) => t in e);
}
function Ms(e, t) {
  const n = {};
  for (const s of e?.facets ?? []) {
    const a = t[s.key];
    n[s.key] = a && a.kind === s.kind ? a : bn(s);
  }
  return n;
}
const Na = /^([A-Za-z_][\w.-]*)\s*(>=|<=|:|=|>|<)\s*(.*)$/;
function Va(e) {
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
function Oa(e) {
  const t = e.trim();
  if (!t) return [];
  const n = [];
  let s = [];
  for (const a of Va(t)) {
    const r = a.toUpperCase();
    if (r === "AND" || r === "&&") continue;
    if (r === "OR" || r === "||") {
      s.length && n.push(s), s = [];
      continue;
    }
    const o = Na.exec(a);
    o && o[3] !== "" ? s.push({
      kind: "field",
      field: o[1].toLowerCase(),
      comparator: o[2],
      value: o[3]
    }) : s.push({ kind: "text", value: a });
  }
  return s.length && n.push(s), n;
}
function Ka(e, t, n) {
  const s = n.labels, a = (c) => c.toLowerCase().replace(/\s+/g, ""), r = e.replace(/\s+/g, "");
  if (r === "entity") return t.entityKey;
  if (r === "status" || r === "state") return t.status;
  if (r === "score") return t.score;
  if (r === "updated" || r === "date") return t.updatedAt;
  if (r === "name") return t.primary;
  if (r === "ref") return t.secondary;
  if (r === "metric1") return t.metric1;
  if (r === "metric2") return t.metric2;
  if (e in t.facets) return t.facets[e];
  if (r === a(s.primary)) return t.primary;
  if (r === a(s.secondary)) return t.secondary;
  if (r === a(s.metric1)) return t.metric1;
  if (r === a(s.metric2)) return t.metric2;
  const o = n.facets.find((c) => a(c.label) === r);
  return o ? t.facets[o.key] : void 0;
}
function Vt(e, t) {
  const n = e.toLowerCase(), s = t.toLowerCase();
  if (!s.includes("*")) return n.includes(s);
  const a = s.replace(/[.+?^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*");
  return new RegExp(a).test(n);
}
function qa(e, t, n) {
  if (e.kind === "text")
    return Vt(t.primary, e.value) || Vt(t.secondary, e.value);
  const s = Ka(e.field, t, n);
  if (s === void 0) return !0;
  if (Array.isArray(s))
    return e.comparator === ":" || e.comparator === "=" ? s.some((c) => Vt(c, e.value)) : !0;
  if (e.comparator === ":" || e.comparator === "=") {
    if (typeof s == "boolean") {
      const o = e.value.toLowerCase();
      return o === "true" || o === "yes" ? s : o === "false" || o === "no" ? !s : !0;
    }
    if (typeof s == "number") {
      const o = Number(e.value);
      return Number.isFinite(o) ? s === o : !0;
    }
    return Vt(s, e.value);
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
function Ba(e, t, n) {
  return e.length ? e.some((s) => s.every((a) => qa(a, t, n))) : !0;
}
function cn(e) {
  let t = 2166136261;
  for (let n = 0; n < e.length; n++)
    t ^= e.charCodeAt(n), t = Math.imul(t, 16777619);
  return Math.abs(t);
}
function ns(e) {
  if (!Number.isFinite(e)) return "—";
  const t = Math.abs(e);
  return t >= 1e6 ? `${(e / 1e6).toFixed(1)}m` : t >= 1e3 ? `${(e / 1e3).toFixed(1)}k` : String(Math.round(e));
}
function Wa(e) {
  const t = new Date(e);
  if (Number.isNaN(t.getTime())) return "—";
  const n = String(t.getUTCDate()).padStart(2, "0"), s = String(t.getUTCMonth() + 1).padStart(2, "0");
  return `${n}.${s}.${t.getUTCFullYear()}`;
}
function Ua(e) {
  return String(e + 1).padStart(2, "0");
}
function Cs(e) {
  return `${Math.round(Math.min(1, Math.max(0, e)) * 100)}%`;
}
const ss = [
  "oklch(0.36 0.06 240)",
  "oklch(0.34 0.07 290)",
  "oklch(0.36 0.06 160)",
  "oklch(0.38 0.06 80)",
  "oklch(0.35 0.07 30)",
  "oklch(0.34 0.05 200)"
];
function Es(e, t) {
  return `${e}_${1e4 + t * 7}`;
}
const Ha = 7, Ga = 3;
function Xa(e, t, n, s) {
  const a = (t * Ha + cn(n)) % s, r = [];
  for (let o = 0; o < Math.min(Ga, s); o++)
    r.push(Es(e, (a + o) % s));
  return r;
}
function Ya(e, t) {
  switch (e.kind) {
    case "chips":
      return e.multiple ? ja(e.options, t) : e.options[t % e.options.length] ?? "";
    case "range": {
      const n = Math.max(0, e.max - e.min);
      return e.min + (n === 0 ? 0 : t % (n + 1));
    }
    case "toggle":
      return t % 3 === 0;
  }
}
function ja(e, t) {
  if (!e.length) return [];
  const n = 1 + (t >> 5) % Math.min(3, e.length), s = t % e.length, a = /* @__PURE__ */ new Set();
  for (let r = 0; r < n; r++) a.add((s + r) % e.length);
  return [...a].sort((r, o) => r - o).map((r) => e[r]);
}
function Qa(e, t = {}) {
  const n = t.population ?? 48, s = t.seed ?? "", a = t.now ?? /* @__PURE__ */ new Date("2026-08-25T00:00:00Z"), r = e.samples, o = t.scopes ?? [];
  if (!r.length) return [];
  const c = [];
  for (let l = 0; l < n; l++) {
    const f = r[l % r.length], u = Math.floor(l / r.length), w = cn(`${s}:${e.key}:${f[0]}:${l}`), y = Es(e.key, l), h = {};
    for (const M of e.facets)
      h[M.key] = Ya(M, cn(`${w}:${M.key}`));
    for (const [M, k] of o)
      h[M] = k === e.key ? y : Xa(k, l, M, n);
    const $ = new Date(a.getTime() - w % 900 * 36e5).toISOString();
    c.push({
      id: y,
      entityKey: e.key,
      entityLabel: e.label,
      primary: u ? `${f[0]} · rev ${u + 1}` : f[0],
      secondary: u ? `${f[1]}-${u + 1}` : f[1],
      status: es[w % es.length],
      score: Number((0.35 + w % 64 / 100).toFixed(3)),
      metric1: 1 + w % 940,
      metric2: 1 + (w >> 3) % 320,
      updatedAt: $,
      tint: ss[w % ss.length],
      facets: h
    });
  }
  return c;
}
function Za(e, t) {
  for (const [n, s] of Object.entries(t)) {
    const a = e.facets[n];
    switch (s.kind) {
      case "chips": {
        if (!s.selected.length) break;
        if (Array.isArray(a)) {
          if (!a.some((r) => s.selected.includes(r))) return !1;
          break;
        }
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
function Ja(e) {
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
function er(e = {}) {
  const t = /* @__PURE__ */ new Map(), n = (s, a) => {
    const r = t.get(s.key);
    if (r) return r;
    const o = e.scopes ?? a.entities.flatMap(
      (l) => l.scope ? [[l.scope, l.key]] : []
    ), c = Qa(s, { ...e, scopes: o });
    return t.set(s.key, c), c;
  };
  return {
    query({ query: s, schema: a, entity: r, limit: o, offset: c }) {
      const l = Oa(s.expr), f = r ? [r] : a.entities, u = [], w = [];
      for (const $ of f)
        for (const M of n($, a))
          u.push(M), (r ? Za(M, s.facets) : !0) && Ba(l, M, $) && w.push(M);
      const y = at(r, s.sort), h = w.sort(Ja(y.key));
      return s.dir === "asc" && h.reverse(), {
        // One page out of the middle. `total` stays the whole match, which is
        // what the shell counts pages with.
        rows: h.slice(c, c + o),
        total: w.length,
        unfiltered: w.length === u.length
      };
    }
  };
}
function tr(e, t) {
  const n = e?.scope;
  return n ? `${n}:"${t.id.replace(/"/g, "")}"` : null;
}
function nr(e, t) {
  return tr(
    e.entities.find((n) => n.key === t.entityKey),
    t
  );
}
function sr(e, t) {
  if (!t) return e;
  const n = e.trim();
  return n ? n.split(/\s+/).includes(t) ? n : `${n} ${t}` : t;
}
function ar(e, t, n) {
  return sr(t.expr, nr(e, n));
}
const Ss = Symbol("dc.shellContext");
function rr(e) {
  return yn(Ss, e), e;
}
function ke() {
  const e = _t(Ss, null);
  if (!e)
    throw new Error(
      "[header-content-layout] No shell context found. Render this component inside <DataShell>."
    );
  return e;
}
const xn = "e", Mn = "v", Cn = "s", En = "d", Sn = "q", Pn = "p", An = "f_", Ps = "*", lr = [
  xn,
  Mn,
  Cn,
  En,
  Sn,
  Pn
], un = "..", As = ",", or = [
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
function sn(e) {
  let t = encodeURIComponent(e);
  for (const [n, s] of or) t = t.replace(n, s);
  return t;
}
function Oe(e) {
  try {
    return decodeURIComponent(e.replace(/\+/g, " "));
  } catch {
    return e.replace(/\+/g, " ");
  }
}
function zs(e) {
  const t = e.replace(/^[?]/, "");
  if (!t) return [];
  const n = [];
  for (const s of t.split("&")) {
    if (!s) continue;
    const a = s.indexOf("="), r = a === -1 ? s : s.slice(0, a), o = a === -1 ? "" : s.slice(a + 1);
    n.push([Oe(r), o]);
  }
  return n;
}
function ir(e) {
  return lr.includes(e) || e.startsWith(An);
}
function as(e, t, n) {
  return Math.min(n, Math.max(t, e));
}
function cr(e, t) {
  const n = Oe(t);
  switch (e.kind) {
    case "chips": {
      const s = new Set(
        n.split(As).map((r) => r.trim()).filter(Boolean)
      );
      return { kind: "chips", selected: e.options.filter((r) => s.has(r)) };
    }
    case "range": {
      const s = n.indexOf(un), a = (s === -1 ? n : n.slice(0, s)).trim(), r = (s === -1 ? "" : n.slice(s + un.length)).trim(), o = a === "" ? null : Number(a), c = r === "" ? null : Number(r);
      let l = o !== null && Number.isFinite(o) ? as(o, e.min, e.max) : null, f = c !== null && Number.isFinite(c) ? as(c, e.min, e.max) : null;
      return l !== null && f !== null && l > f && ([l, f] = [f, l]), { kind: "range", min: l, max: f };
    }
    case "toggle":
      return { kind: "toggle", on: n === "1" || n === "true" };
  }
}
function ur(e, t) {
  switch (e.kind) {
    case "chips":
      return e.selected.length ? (t.kind === "chips" ? t.options.filter((s) => e.selected.includes(s)) : e.selected).join(As) : null;
    case "range":
      return e.min === null && e.max === null ? null : `${e.min ?? ""}${un}${e.max ?? ""}`;
    case "toggle":
      return e.on ? "1" : null;
  }
}
function dr(e, t, n = {}) {
  const s = $n(t, n), a = new Map(zs(e)), r = a.get(xn), o = r === void 0 ? s.entity : Oe(r), c = o === Ps ? null : ft(t, o), l = a.get(Mn), f = l && ys(Oe(l)) ? Oe(l) : s.view, u = a.get(Cn), w = at(c, u ? Oe(u) : n.sort), y = a.get(En), h = y ? Oe(y) === "asc" ? "asc" : "desc" : s.dir, $ = a.get(Sn), M = a.get(Pn), k = M === void 0 ? 1 : Number(Oe(M)), E = Number.isFinite(k) ? Math.max(1, Math.floor(k)) : 1, L = {};
  for (const B of c?.facets ?? []) {
    const I = a.get(`${An}${B.key}`);
    L[B.key] = I === void 0 ? bn(B) : cr(B, I);
  }
  return {
    entity: c?.key ?? null,
    view: f,
    sort: w.key,
    dir: h,
    expr: $ === void 0 ? "" : Oe($),
    facets: Ms(c, L),
    page: E
  };
}
function rs(e, t, n = {}, s = "") {
  const a = $n(t, n), r = ft(t, e.entity), o = zs(s).filter(([w]) => !ir(w)), c = [], l = (w, y) => c.push([w, sn(y)]), f = r?.key ?? null;
  f !== a.entity && l(xn, f ?? Ps), e.view !== a.view && l(Mn, e.view), e.sort !== a.sort && l(Cn, e.sort), e.dir !== a.dir && l(En, e.dir), e.expr.trim() !== "" && l(Sn, e.expr);
  for (const w of r?.facets ?? []) {
    const y = e.facets[w.key];
    if (!y) continue;
    const h = ur(y, w);
    h !== null && c.push([`${An}${w.key}`, sn(h)]);
  }
  e.page > 1 && l(Pn, String(e.page));
  const u = [
    ...o.map(([w, y]) => [sn(w), y]),
    ...c
  ];
  return u.length ? `?${u.map(([w, y]) => y === "" ? w : `${w}=${y}`).join("&")}` : "";
}
const dn = "entity";
function fr(e, t) {
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
function Rs(e, t) {
  const n = [];
  t && n.push({
    id: dn,
    label: `entity:${t.key}`,
    facetKey: dn
  });
  for (const s of t?.facets ?? []) {
    const a = e.facets[s.key];
    a && ks(a) && n.push(...fr(s, a));
  }
  return n;
}
function pr(e, t) {
  if (kn(e)) {
    const a = at(t, e.sort);
    return `everything · ${e.view} · ${a.label}`;
  }
  const n = Rs(e, t).map((a) => a.label), s = e.expr.trim();
  return s && n.push(`"${s}"`), n.join(" · ");
}
function vr(e) {
  const { adapter: t } = e, n = g(() => xt(e.schema)), s = g(() => xt(e.defaults) ?? {}), a = g(() => dr(t.search.value, n.value, s.value)), r = g(() => ft(n.value, a.value.entity)), o = g(() => r.value ?? ws(n.value, s.value)), c = g(() => bs(r.value)), l = g(() => at(r.value, a.value.sort)), f = (k, E) => {
    const L = rs(k, n.value, s.value, t.search.value);
    L !== t.search.value && (E === "push" ? t.push(L) : t.replace(L));
  }, u = () => xt(e.navigationMode) ?? "push", w = () => xt(e.facetNavigationMode) ?? "replace", y = (k, E) => {
    const L = k.page ?? (ts(k) ? 1 : a.value.page);
    f({ ...a.value, ...k, page: L }, E);
  }, h = (k, E) => {
    const L = a.value.facets[k];
    if (!L) return;
    const B = { ...a.value.facets, [k]: E(L) };
    y({ facets: B }, w());
  }, $ = (k) => {
    const E = k === null ? null : ft(n.value, k);
    return (E?.key ?? null) === a.value.entity ? {} : {
      entity: E?.key ?? null,
      sort: at(E, a.value.sort).key,
      facets: Yt(E)
    };
  }, M = (k) => {
    const E = $(k);
    Object.keys(E).length && y(E, u());
  };
  return {
    query: a,
    entity: r,
    focus: o,
    sort: l,
    sorts: c,
    summary: g(() => pr(a.value, r.value)),
    terms: g(() => Rs(a.value, r.value)),
    isPristine: g(() => kn(a.value)),
    isEverything: g(() => a.value.entity === null),
    hasFacets: g(() => $s(a.value.facets)),
    setEntity: M,
    clearEntity: () => M(null),
    setView(k) {
      y({ view: k }, u());
    },
    setSort(k) {
      y({ sort: at(r.value, k).key }, u());
    },
    toggleDirection() {
      y({ dir: a.value.dir === "desc" ? "asc" : "desc" }, u());
    },
    setExpression(k) {
      y({ expr: k }, u());
    },
    narrow(k, E) {
      y({ expr: k, ...$(E) }, u());
    },
    setPage(k, E) {
      y({ page: Math.max(1, Math.floor(k)) }, E ?? u());
    },
    setFacet(k, E) {
      h(k, () => E);
    },
    toggleChip(k, E) {
      h(k, (L) => L.kind !== "chips" ? L : { kind: "chips", selected: L.selected.includes(E) ? L.selected.filter((I) => I !== E) : [...L.selected, E] });
    },
    setRange(k, E, L) {
      h(k, (B) => B.kind === "range" ? { kind: "range", min: E, max: L } : B);
    },
    toggleFlag(k) {
      h(
        k,
        (E) => E.kind === "toggle" ? { kind: "toggle", on: !E.on } : E
      );
    },
    removeTerm(k) {
      if (k.facetKey === dn) {
        M(null);
        return;
      }
      h(k.facetKey, (E) => E.kind === "chips" && k.option ? { kind: "chips", selected: E.selected.filter((L) => L !== k.option) } : E.kind === "range" ? { kind: "range", min: null, max: null } : E.kind === "toggle" ? { kind: "toggle", on: !1 } : E);
    },
    clearFilters() {
      y({ entity: null, expr: "", facets: Yt(null) }, u());
    },
    reset() {
      f($n(n.value, s.value), u());
    },
    hrefFor(k) {
      const E = { ...a.value, ...k };
      return E.page = k.page ?? (ts(k) ? 1 : a.value.page), E.facets = Ms(ft(n.value, E.entity), E.facets), `${t.path.value}${rs(E, n.value, s.value, t.search.value)}`;
    }
  };
}
function mr(e) {
  const t = Ut([]), n = W(0), s = W(!1), a = Ut(null);
  let r = 0;
  const o = g(() => (e.query.value.page - 1) * e.limit.value), c = g(() => Da(n.value, e.limit.value)), l = (u) => {
    t.value = u.rows, n.value = u.total, a.value = null;
  }, f = () => {
    const u = ++r, w = {
      query: e.query.value,
      schema: e.schema.value,
      entity: e.entity.value,
      limit: e.limit.value,
      offset: o.value
    };
    let y;
    try {
      y = e.source.value.query(w);
    } catch (h) {
      a.value = h, t.value = [], n.value = 0;
      return;
    }
    if (!(y instanceof Promise)) {
      l(y), s.value = !1;
      return;
    }
    s.value = !0, y.then((h) => {
      u === r && l(h);
    }).catch((h) => {
      u === r && (a.value = h, t.value = [], n.value = 0);
    }).finally(() => {
      u === r && (s.value = !1);
    });
  };
  return xe([e.source, e.query, e.schema, e.entity, e.limit], f, {
    immediate: !0
  }), { rows: t, total: n, offset: o, pageCount: c, pending: s, error: a, refresh: f };
}
const hr = ["data-dc-expanded"], _r = ["aria-expanded", "aria-controls"], gr = { class: "dc-header__domain" }, yr = { class: "dc-header__crumb" }, wr = { class: "dc-header__crumb-root" }, br = {
  key: 0,
  class: "dc-header__count dc-mono"
}, kr = { class: "dc-header__query" }, $r = ["data-dc-active", "title"], xr = {
  class: "dc-header__chevron",
  "aria-hidden": "true"
}, Mr = { class: "dc-header__sr" }, Cr = {
  key: 0,
  class: "dc-header__pages",
  "aria-label": "Pages"
}, Er = ["disabled"], Sr = ["title"], Pr = {
  class: "dc-header__sr",
  "aria-live": "polite"
}, Ar = ["disabled"], zr = {
  key: 1,
  class: "dc-header__actions"
}, Rr = /* @__PURE__ */ ce({
  __name: "ShellHeader",
  props: {
    expanded: { type: Boolean },
    panelId: {},
    hideCount: { type: Boolean }
  },
  emits: ["toggle"],
  setup(e, { emit: t }) {
    const n = e, s = t, a = ke(), r = g(() => a.schema.value), o = g(() => a.entity.value?.label ?? "Everything"), c = g(() => {
      if (n.hideCount) return "";
      const w = a.entity.value;
      return w && !a.hasFacets.value && !a.query.value.expr.trim() ? w.count : String(a.total.value);
    }), l = g(() => a.query.value.page), f = g(
      () => a.pageCount.value > 1 && !xs(a.query.value)
    ), u = g(() => {
      const w = `Page ${l.value} of ${a.pageCount.value}`, y = a.rows.value.length;
      if (!y) return w;
      const h = a.offset.value + 1;
      return `${w} — rows ${h} to ${h + y - 1} of ${a.total.value}`;
    });
    return (w, y) => (m(), _("div", {
      class: "dc-header",
      "data-dc-expanded": e.expanded ? "true" : "false"
    }, [
      v("button", {
        type: "button",
        class: "dc-header__trigger",
        "aria-expanded": e.expanded,
        "aria-controls": e.panelId,
        onClick: y[0] || (y[0] = (h) => s("toggle"))
      }, [
        y[4] || (y[4] = v("span", {
          class: "dc-header__badge",
          "aria-hidden": "true"
        }, "◆", -1)),
        v("span", gr, S(r.value.label), 1),
        v("span", yr, [
          v("span", wr, S(o.value), 1),
          c.value ? (m(), _("span", br, S(c.value), 1)) : N("", !0)
        ]),
        v("span", kr, [
          y[3] || (y[3] = v("span", { class: "dc-header__query-label" }, "Query", -1)),
          v("span", {
            class: "dc-header__summary dc-mono dc-truncate",
            "data-dc-active": C(a).isPristine.value ? "false" : "true",
            title: C(a).summary.value
          }, S(C(a).summary.value), 9, $r)
        ]),
        v("span", xr, S(e.expanded ? "▲" : "▼"), 1),
        v("span", Mr, S(e.expanded ? "Hide query panel" : "Edit query"), 1)
      ], 8, _r),
      f.value ? (m(), _("nav", Cr, [
        v("button", {
          type: "button",
          class: "dc-header__step",
          "aria-label": "Previous page",
          disabled: l.value <= 1,
          onClick: y[1] || (y[1] = (h) => C(a).setPage(l.value - 1))
        }, [...y[5] || (y[5] = [
          v("span", { "aria-hidden": "true" }, "‹", -1)
        ])], 8, Er),
        v("span", {
          class: "dc-header__page dc-mono",
          title: u.value,
          "aria-hidden": "true"
        }, S(l.value) + " / " + S(C(a).pageCount.value), 9, Sr),
        v("span", Pr, S(u.value), 1),
        v("button", {
          type: "button",
          class: "dc-header__step",
          "aria-label": "Next page",
          disabled: l.value >= C(a).pageCount.value,
          onClick: y[2] || (y[2] = (h) => C(a).setPage(l.value + 1))
        }, [...y[6] || (y[6] = [
          v("span", { "aria-hidden": "true" }, "›", -1)
        ])], 8, Ar)
      ])) : N("", !0),
      w.$slots.actions ? (m(), _("div", zr, [
        Ke(w.$slots, "actions", {}, void 0, !0)
      ])) : N("", !0)
    ], 8, hr));
  }
}), ue = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [s, a] of t)
    n[s] = a;
  return n;
}, Fs = /* @__PURE__ */ ue(Rr, [["__scopeId", "data-v-cdaaadf4"]]), Fr = { class: "dc-facet" }, Tr = { class: "dc-facet__head" }, Lr = ["id"], Dr = { class: "dc-facet__hint dc-mono" }, Ir = ["aria-labelledby"], Nr = ["aria-pressed", "data-dc-active", "onClick"], Vr = ["aria-labelledby"], Or = ["aria-label", "placeholder", "onKeydown"], Kr = ["aria-label", "placeholder", "onKeydown"], qr = ["aria-checked"], Br = { class: "dc-switch__text" }, Wr = ["data-dc-active"], Ur = /* @__PURE__ */ ce({
  __name: "FacetControl",
  props: {
    facet: {},
    value: {}
  },
  emits: ["update"],
  setup(e, { emit: t }) {
    const n = e, s = t, a = g(() => {
      const { facet: y, value: h } = n;
      return y.kind === "chips" && h.kind === "chips" ? h.selected.length ? `${h.selected.length} of ${y.options.length}` : "any" : y.kind === "range" && h.kind === "range" ? h.min === null && h.max === null ? `${y.min}–${y.max}` : `${h.min ?? y.min}–${h.max ?? y.max}` : h.kind === "toggle" ? h.on ? "on" : "off" : "";
    }), r = g(
      () => n.value.kind === "chips" ? new Set(n.value.selected) : /* @__PURE__ */ new Set()
    );
    function o(y) {
      if (n.value.kind !== "chips") return;
      const h = r.value.has(y) ? n.value.selected.filter(($) => $ !== y) : [...n.value.selected, y];
      s("update", { kind: "chips", selected: h });
    }
    const c = W(""), l = W("");
    xe(
      () => n.value,
      (y) => {
        y.kind === "range" && (c.value = y.min === null ? "" : y.min, l.value = y.max === null ? "" : y.max);
      },
      { immediate: !0, deep: !0 }
    );
    function f(y) {
      if (typeof y == "number") return Number.isFinite(y) ? y : null;
      const h = y.trim();
      if (!h) return null;
      const $ = Number(h);
      return Number.isFinite($) ? $ : null;
    }
    function u() {
      if (n.value.kind !== "range") return;
      const y = f(c.value), h = f(l.value);
      y === n.value.min && h === n.value.max || s("update", { kind: "range", min: y, max: h });
    }
    function w() {
      n.value.kind === "toggle" && s("update", { kind: "toggle", on: !n.value.on });
    }
    return (y, h) => (m(), _("div", Fr, [
      v("div", Tr, [
        v("span", {
          id: `dc-facet-${e.facet.key}`,
          class: "dc-facet__label"
        }, S(e.facet.label), 9, Lr),
        v("span", Dr, S(a.value), 1)
      ]),
      e.facet.kind === "chips" && e.value.kind === "chips" ? (m(), _("div", {
        key: 0,
        class: "dc-facet__chips",
        role: "group",
        "aria-labelledby": `dc-facet-${e.facet.key}`
      }, [
        (m(!0), _(ae, null, ve(e.facet.options, ($) => (m(), _("button", {
          key: $,
          type: "button",
          class: "dc-chip",
          "aria-pressed": r.value.has($),
          "data-dc-active": r.value.has($) ? "true" : "false",
          onClick: (M) => o($)
        }, S($), 9, Nr))), 128))
      ], 8, Ir)) : e.facet.kind === "range" && e.value.kind === "range" ? (m(), _("div", {
        key: 1,
        class: "dc-facet__range",
        role: "group",
        "aria-labelledby": `dc-facet-${e.facet.key}`
      }, [
        ln(v("input", {
          "onUpdate:modelValue": h[0] || (h[0] = ($) => c.value = $),
          class: "dc-input dc-mono",
          type: "number",
          inputmode: "numeric",
          "aria-label": `${e.facet.label} minimum`,
          placeholder: String(e.facet.min),
          onChange: u,
          onBlur: u,
          onKeydown: Ht(Fe(u, ["prevent"]), ["enter"])
        }, null, 40, Or), [
          [on, c.value]
        ]),
        h[2] || (h[2] = v("span", {
          class: "dc-facet__dash",
          "aria-hidden": "true"
        }, "–", -1)),
        ln(v("input", {
          "onUpdate:modelValue": h[1] || (h[1] = ($) => l.value = $),
          class: "dc-input dc-mono",
          type: "number",
          inputmode: "numeric",
          "aria-label": `${e.facet.label} maximum`,
          placeholder: String(e.facet.max),
          onChange: u,
          onBlur: u,
          onKeydown: Ht(Fe(u, ["prevent"]), ["enter"])
        }, null, 40, Kr), [
          [on, l.value]
        ])
      ], 8, Vr)) : e.facet.kind === "toggle" && e.value.kind === "toggle" ? (m(), _("button", {
        key: 2,
        type: "button",
        class: "dc-switch",
        role: "switch",
        "aria-checked": e.value.on,
        onClick: w
      }, [
        v("span", Br, S(e.facet.text), 1),
        v("span", {
          class: "dc-switch__track",
          "data-dc-active": e.value.on ? "true" : "false",
          "aria-hidden": "true"
        }, [...h[3] || (h[3] = [
          v("span", { class: "dc-switch__knob" }, null, -1)
        ])], 8, Wr)
      ], 8, qr)) : N("", !0)
    ]));
  }
}), Ts = /* @__PURE__ */ ue(Ur, [["__scopeId", "data-v-c2efbd0c"]]), Hr = ["aria-label"], Gr = ["aria-checked", "data-dc-active", "tabindex", "onClick", "onKeydown"], Xr = /* @__PURE__ */ ce({
  __name: "SegmentedControl",
  props: {
    modelValue: {},
    options: {},
    label: {},
    mono: { type: Boolean }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const n = e, s = t, a = W([]);
    function r(o, c) {
      const l = n.options.length;
      let f = null;
      if (o.key === "ArrowRight" || o.key === "ArrowDown" ? f = (c + 1) % l : o.key === "ArrowLeft" || o.key === "ArrowUp" ? f = (c - 1 + l) % l : o.key === "Home" ? f = 0 : o.key === "End" && (f = l - 1), f === null) return;
      o.preventDefault();
      const u = n.options[f];
      u && (s("update:modelValue", u.key), a.value[f]?.focus());
    }
    return (o, c) => (m(), _("div", {
      class: "dc-segmented",
      role: "radiogroup",
      "aria-label": e.label
    }, [
      (m(!0), _(ae, null, ve(e.options, (l, f) => (m(), _("button", {
        key: l.key,
        ref_for: !0,
        ref_key: "buttons",
        ref: a,
        type: "button",
        role: "radio",
        class: Sa(["dc-segmented__item", { "dc-segmented__item--mono": e.mono }]),
        "aria-checked": l.key === e.modelValue,
        "data-dc-active": l.key === e.modelValue ? "true" : "false",
        tabindex: l.key === e.modelValue ? 0 : -1,
        onClick: (u) => s("update:modelValue", l.key),
        onKeydown: (u) => r(u, f)
      }, S(l.label), 43, Gr))), 128))
    ], 8, Hr));
  }
}), fn = /* @__PURE__ */ ue(Xr, [["__scopeId", "data-v-63fb5482"]]), Yr = ["id"], jr = { class: "dc-panel__section" }, Qr = { class: "dc-panel__query" }, Zr = { class: "dc-panel__expression" }, Jr = ["for"], el = ["id", "placeholder", "onKeydown"], tl = {
  key: 0,
  class: "dc-panel__facets"
}, nl = {
  key: 1,
  class: "dc-panel__hint"
}, sl = { class: "dc-panel__scope" }, al = ["id"], rl = ["aria-labelledby"], ll = ["data-dc-active", "aria-current"], ol = { class: "dc-entity__count dc-mono" }, il = ["data-dc-active", "aria-current", "onClick"], cl = { class: "dc-entity__label" }, ul = { class: "dc-entity__count dc-mono" }, dl = { class: "dc-panel__actions" }, fl = ["disabled"], pl = { class: "dc-panel__section dc-panel__section--row" }, vl = { class: "dc-panel__control" }, ml = { class: "dc-panel__control" }, hl = ["title", "aria-label"], _l = {
  key: 0,
  class: "dc-panel__section"
}, gl = /* @__PURE__ */ ce({
  __name: "QueryPanel",
  props: {
    panelId: {},
    views: {}
  },
  emits: ["close"],
  setup(e, { emit: t }) {
    const n = e, s = t, a = wn(), r = ke(), o = {
      list: "List",
      cards: "Cards",
      grid: "Grid",
      table: "Table",
      links: "Links",
      preview: "Preview"
    }, c = g(
      () => (n.views ?? [...gs]).map((M) => ({ key: M, label: o[M] }))
    ), l = g(
      () => r.sorts.value.map((M) => ({ key: M.key, label: M.label }))
    ), f = W(r.query.value.expr), u = W(null);
    xe(
      () => r.query.value.expr,
      (M) => {
        f.value = M;
      }
    );
    const w = g(() => f.value !== r.query.value.expr);
    function y() {
      r.setExpression(f.value), s("close");
    }
    function h() {
      f.value = "", r.clearFilters();
    }
    function $(M, k) {
      r.setFacet(M, k);
    }
    return At(() => u.value?.focus()), (M, k) => (m(), _("div", {
      id: e.panelId,
      class: "dc-panel",
      role: "dialog",
      "aria-label": "Query",
      onKeydown: k[5] || (k[5] = Ht(Fe((E) => s("close"), ["stop"]), ["esc"]))
    }, [
      v("section", jr, [
        v("div", Qr, [
          v("div", Zr, [
            v("label", {
              class: "dc-panel__field-label",
              for: `${e.panelId}-expr`
            }, "Expression", 8, Jr),
            ln(v("input", {
              id: `${e.panelId}-expr`,
              ref_key: "expressionField",
              ref: u,
              "onUpdate:modelValue": k[0] || (k[0] = (E) => f.value = E),
              class: "dc-expression dc-mono",
              type: "text",
              autocomplete: "off",
              spellcheck: "false",
              placeholder: C(r).schema.value.placeholder,
              onKeydown: Ht(Fe(y, ["prevent"]), ["enter"])
            }, null, 40, el), [
              [on, f.value]
            ])
          ]),
          C(r).entity.value ? (m(), _("div", tl, [
            (m(!0), _(ae, null, ve(C(r).entity.value.facets, (E) => (m(), ge(Ts, {
              key: E.key,
              facet: E,
              value: C(r).query.value.facets[E.key],
              onUpdate: (L) => $(E.key, L)
            }, null, 8, ["facet", "value", "onUpdate"]))), 128))
          ])) : (m(), _("p", nl, " Results span every entity — logs and settings included. Pick one below to narrow to it and to get its own filters. "))
        ]),
        v("div", sl, [
          v("span", {
            id: `${e.panelId}-entities`,
            class: "dc-panel__field-label"
          }, "Entities", 8, al),
          v("div", {
            class: "dc-panel__entities",
            role: "group",
            "aria-labelledby": `${e.panelId}-entities`
          }, [
            v("button", {
              type: "button",
              class: "dc-entity dc-entity--all",
              "data-dc-active": C(r).isEverything.value ? "true" : "false",
              "aria-current": C(r).isEverything.value ? "true" : void 0,
              onClick: k[1] || (k[1] = (E) => C(r).clearEntity())
            }, [
              k[6] || (k[6] = v("span", { class: "dc-entity__label" }, "Everything", -1)),
              v("span", ol, S(C(r).entities.value.length) + " kinds", 1)
            ], 8, ll),
            (m(!0), _(ae, null, ve(C(r).entities.value, (E) => (m(), _("button", {
              key: E.key,
              type: "button",
              class: "dc-entity",
              "data-dc-active": E.key === C(r).entity.value?.key ? "true" : "false",
              "aria-current": E.key === C(r).entity.value?.key ? "true" : void 0,
              onClick: (L) => C(r).setEntity(E.key)
            }, [
              v("span", cl, S(E.label), 1),
              v("span", ul, S(E.count), 1)
            ], 8, il))), 128))
          ], 8, rl)
        ]),
        v("div", dl, [
          v("button", {
            type: "button",
            class: "dc-button dc-button--primary",
            onClick: y
          }, " Run query "),
          v("button", {
            type: "button",
            class: "dc-button",
            disabled: C(r).isPristine.value && !w.value,
            onClick: h
          }, " Reset ", 8, fl)
        ])
      ]),
      v("section", pl, [
        v("div", vl, [
          k[7] || (k[7] = v("span", { class: "dc-eyebrow" }, "View", -1)),
          J(fn, {
            label: "Result view",
            "model-value": C(r).query.value.view,
            options: c.value,
            "onUpdate:modelValue": k[2] || (k[2] = (E) => C(r).setView(E))
          }, null, 8, ["model-value", "options"])
        ]),
        v("div", ml, [
          k[8] || (k[8] = v("span", { class: "dc-eyebrow" }, "Sort", -1)),
          J(fn, {
            mono: "",
            label: "Sort field",
            "model-value": C(r).query.value.sort,
            options: l.value,
            "onUpdate:modelValue": k[3] || (k[3] = (E) => C(r).setSort(E))
          }, null, 8, ["model-value", "options"]),
          v("button", {
            type: "button",
            class: "dc-button dc-button--icon dc-mono",
            title: C(r).query.value.dir === "desc" ? "Descending — click to reverse" : "Ascending — click to reverse",
            "aria-label": `Sort direction: ${C(r).query.value.dir === "desc" ? "descending" : "ascending"}`,
            onClick: k[4] || (k[4] = (E) => C(r).toggleDirection())
          }, S(C(r).query.value.dir === "desc" ? "↓" : "↑"), 9, hl)
        ])
      ]),
      a["panel-section"] ? (m(), _("section", _l, [
        Ke(M.$slots, "panel-section", {}, void 0, !0)
      ])) : N("", !0)
    ], 40, Yr));
  }
}), Ls = /* @__PURE__ */ ue(gl, [["__scopeId", "data-v-d8a6ac01"]]), Ds = {
  primary: "Item",
  secondary: "Reference",
  metric1: "Metric",
  metric2: "Metric 2"
};
function yl() {
  const e = ke();
  return g(() => e.entity.value?.labels ?? Ds);
}
function Is(e, t, n, s) {
  return {
    row: e,
    entityLabel: e.entityLabel,
    entity: n,
    labels: n?.labels ?? Ds,
    ordinal: Ua(t),
    metric1: ns(e.metric1),
    metric2: ns(e.metric2),
    date: Wa(e.updatedAt),
    score: e.score.toFixed(2),
    percent: Cs(e.score),
    pinned: s
  };
}
function yt() {
  const e = ke(), t = g(
    () => new Map(e.entities.value.map((n) => [n.key, n]))
  );
  return g(
    () => e.rows.value.map(
      (n, s) => Is(
        n,
        e.offset.value + s,
        t.value.get(n.entityKey) ?? null,
        e.isPinned(n)
      )
    )
  );
}
const wl = ["data-dc-status"], bl = /* @__PURE__ */ ce({
  __name: "StatusPill",
  props: {
    status: {}
  },
  setup(e) {
    return (t, n) => (m(), _("span", {
      class: "dc-pill",
      "data-dc-status": e.status
    }, S(e.status), 9, wl));
  }
}), zt = /* @__PURE__ */ ue(bl, [["__scopeId", "data-v-23e59fbf"]]), kl = ["title"], $l = { key: 1 }, xl = /* @__PURE__ */ ce({
  __name: "MetricDrill",
  props: {
    entry: {},
    metric: {}
  },
  setup(e) {
    const t = e, n = ke(), s = g(() => {
      const o = t.entry.entity;
      if (!o?.scope) return null;
      const c = o.drills?.[t.metric];
      return n.entities.value.find((l) => l.key === c) ?? null;
    }), a = g(() => t.entry[t.metric]);
    function r(o) {
      o.stopPropagation(), s.value && n.drill(t.entry.row, s.value);
    }
    return (o, c) => s.value ? (m(), _("button", {
      key: 0,
      type: "button",
      class: "dc-drill",
      title: `${e.entry.labels[e.metric]} of ${e.entry.row.primary} — show the ${s.value.label.toLowerCase()}`,
      onClick: r
    }, [
      Ke(o.$slots, "default", {}, () => [
        Ae(S(a.value), 1)
      ], !0)
    ], 8, kl)) : (m(), _("span", $l, [
      Ke(o.$slots, "default", {}, () => [
        Ae(S(a.value), 1)
      ], !0)
    ]));
  }
}), Je = /* @__PURE__ */ ue(xl, [["__scopeId", "data-v-34d73bba"]]), Ml = ["data-dc-active", "aria-pressed", "aria-label"], Cl = /* @__PURE__ */ ce({
  __name: "PinStar",
  props: {
    row: {},
    pinned: { type: Boolean }
  },
  setup(e) {
    const t = e, n = ke();
    function s(a) {
      a.stopPropagation(), n.togglePin(t.row);
    }
    return (a, r) => (m(), _("button", {
      type: "button",
      class: "dc-star",
      "data-dc-active": e.pinned ? "true" : "false",
      "aria-pressed": e.pinned,
      "aria-label": e.pinned ? `Unpin ${e.row.primary}` : `Pin ${e.row.primary}`,
      onClick: s
    }, S(e.pinned ? "★" : "☆"), 9, Ml));
  }
}), zn = /* @__PURE__ */ ue(Cl, [["__scopeId", "data-v-890e0fb5"]]), El = ["title", "aria-label"], Sl = /* @__PURE__ */ ce({
  __name: "ScopeMark",
  props: {
    entry: {}
  },
  setup(e) {
    const t = e, n = ke(), s = g(() => t.entry.entity?.scope ?? null);
    function a(r) {
      r.stopPropagation(), n.drill(t.entry.row, null);
    }
    return (r, o) => s.value ? (m(), _("button", {
      key: 0,
      type: "button",
      class: "dc-scope",
      title: `Narrow everything to ${s.value}: ${e.entry.row.id}`,
      "aria-label": `Narrow everything to ${e.entry.row.primary}`,
      onClick: a
    }, " → ", 8, El)) : N("", !0);
  }
}), Rt = /* @__PURE__ */ ue(Sl, [["__scopeId", "data-v-15dce1c0"]]), Pl = { class: "dc-cards" }, Al = { class: "dc-card__top dc-mono" }, zl = {
  key: 0,
  class: "dc-card__entity"
}, Rl = { class: "dc-card__top-right" }, Fl = ["onClick"], Tl = { class: "dc-card__primary" }, Ll = { class: "dc-card__secondary dc-mono" }, Dl = { class: "dc-card__metrics dc-mono" }, Il = { class: "dc-card__date" }, Nl = /* @__PURE__ */ ce({
  __name: "CardsView",
  setup(e) {
    const t = ke(), n = yt(), s = g(() => t.isEverything.value);
    return (a, r) => (m(), _("div", Pl, [
      (m(!0), _(ae, null, ve(C(n), (o) => (m(), _("div", {
        key: o.row.id,
        class: "dc-card"
      }, [
        v("div", Al, [
          v("span", null, [
            Ae(S(o.ordinal) + " ", 1),
            s.value ? (m(), _("span", zl, S(o.entityLabel), 1)) : N("", !0)
          ]),
          v("span", Rl, [
            J(zt, {
              status: o.row.status
            }, null, 8, ["status"]),
            J(Rt, { entry: o }, null, 8, ["entry"]),
            C(t).pinnable.value ? (m(), ge(zn, {
              key: 0,
              row: o.row,
              pinned: o.pinned
            }, null, 8, ["row", "pinned"])) : N("", !0)
          ])
        ]),
        v("button", {
          type: "button",
          class: "dc-card__open",
          onClick: (c) => C(t).activate(o.row)
        }, [
          v("span", Tl, S(o.row.primary), 1),
          v("span", Ll, S(o.row.secondary), 1)
        ], 8, Fl),
        v("div", Dl, [
          J(Je, {
            entry: o,
            metric: "metric1"
          }, {
            default: it(() => [
              Ae(S(o.labels.metric1) + " " + S(o.metric1), 1)
            ]),
            _: 2
          }, 1032, ["entry"]),
          J(Je, {
            entry: o,
            metric: "metric2"
          }, {
            default: it(() => [
              Ae(S(o.labels.metric2) + " " + S(o.metric2), 1)
            ]),
            _: 2
          }, 1032, ["entry"]),
          v("span", Il, S(o.date), 1)
        ])
      ]))), 128))
    ]));
  }
}), Ns = /* @__PURE__ */ ue(Nl, [["__scopeId", "data-v-6096ce5b"]]), Vl = { class: "dc-grid" }, Ol = ["onClick"], Kl = { class: "dc-tile__scrim" }, ql = { class: "dc-tile__top dc-mono" }, Bl = { class: "dc-tile__chip" }, Wl = { class: "dc-tile__chip" }, Ul = { class: "dc-tile__caption" }, Hl = { class: "dc-tile__secondary dc-truncate" }, Gl = { class: "dc-tile__primary" }, Xl = /* @__PURE__ */ ce({
  __name: "GridView",
  setup(e) {
    const t = ke(), n = yt();
    return (s, a) => (m(), _("div", Vl, [
      (m(!0), _(ae, null, ve(C(n), (r) => (m(), _("button", {
        key: r.row.id,
        type: "button",
        class: "dc-tile",
        style: Le({ "--dc-tile-tint": r.row.tint }),
        onClick: (o) => C(t).activate(r.row)
      }, [
        v("span", Kl, [
          v("span", ql, [
            v("span", Bl, S(r.ordinal), 1),
            v("span", Wl, S(r.score), 1)
          ]),
          v("span", Ul, [
            v("span", Hl, S(r.row.secondary), 1),
            v("span", Gl, S(r.row.primary), 1)
          ])
        ])
      ], 12, Ol))), 128))
    ]));
  }
}), Vs = /* @__PURE__ */ ue(Xl, [["__scopeId", "data-v-c39dab2f"]]), Yl = { class: "dc-links" }, jl = ["onClick"], Ql = { class: "dc-link__primary dc-truncate" }, Zl = { class: "dc-link__secondary dc-mono dc-truncate" }, Jl = /* @__PURE__ */ ce({
  __name: "LinksView",
  setup(e) {
    const t = ke(), n = yt();
    return (s, a) => (m(), _("div", Yl, [
      (m(!0), _(ae, null, ve(C(n), (r) => (m(), _("button", {
        key: r.row.id,
        type: "button",
        class: "dc-link",
        onClick: (o) => C(t).activate(r.row)
      }, [
        v("span", Ql, S(r.row.primary), 1),
        v("span", Zl, S(r.row.secondary), 1)
      ], 8, jl))), 128))
    ]));
  }
}), Os = /* @__PURE__ */ ue(Jl, [["__scopeId", "data-v-e21922c7"]]), eo = ["aria-valuenow", "aria-label", "title"], to = /* @__PURE__ */ ce({
  __name: "ScoreMeter",
  props: {
    value: {},
    label: {}
  },
  setup(e) {
    const t = e, n = g(() => Cs(t.value));
    return (s, a) => (m(), _("span", {
      class: "dc-meter",
      role: "meter",
      "aria-valuemin": "0",
      "aria-valuemax": "100",
      "aria-valuenow": Math.round(e.value * 100),
      "aria-label": e.label ?? "Score",
      title: `${e.label ?? "Score"} ${n.value}`
    }, [
      v("span", {
        class: "dc-meter__fill",
        style: Le({ width: n.value })
      }, null, 4)
    ], 8, eo));
  }
}), Ks = /* @__PURE__ */ ue(to, [["__scopeId", "data-v-ab794776"]]), no = {
  class: "dc-list",
  role: "list"
}, so = ["onClick"], ao = { class: "dc-list__ordinal dc-mono" }, ro = { class: "dc-list__identity" }, lo = { class: "dc-list__primary dc-truncate" }, oo = { class: "dc-list__secondary dc-mono dc-truncate" }, io = {
  key: 0,
  class: "dc-list__entity dc-mono"
}, co = { class: "dc-list__metrics dc-mono" }, uo = { class: "dc-list__trailing" }, fo = /* @__PURE__ */ ce({
  __name: "ListView",
  setup(e) {
    const t = ke(), n = yt(), s = g(() => t.isEverything.value);
    return (a, r) => (m(), _("div", no, [
      (m(!0), _(ae, null, ve(C(n), (o) => (m(), _("div", {
        key: o.row.id,
        class: "dc-list__row",
        role: "listitem"
      }, [
        v("button", {
          type: "button",
          class: "dc-list__open",
          onClick: (c) => C(t).activate(o.row)
        }, [
          v("span", ao, S(o.ordinal), 1),
          v("span", ro, [
            v("span", lo, S(o.row.primary), 1),
            v("span", oo, S(o.row.secondary), 1)
          ])
        ], 8, so),
        s.value ? (m(), _("span", io, S(o.entityLabel), 1)) : N("", !0),
        v("span", co, [
          J(Je, {
            entry: o,
            metric: "metric1"
          }, null, 8, ["entry"]),
          J(Je, {
            entry: o,
            metric: "metric2"
          }, null, 8, ["entry"]),
          J(Ks, {
            value: o.row.score
          }, null, 8, ["value"])
        ]),
        v("span", uo, [
          J(zt, {
            status: o.row.status
          }, null, 8, ["status"]),
          J(Rt, { entry: o }, null, 8, ["entry"]),
          C(t).pinnable.value ? (m(), ge(zn, {
            key: 0,
            row: o.row,
            pinned: o.pinned
          }, null, 8, ["row", "pinned"])) : N("", !0)
        ])
      ]))), 128))
    ]));
  }
}), pn = /* @__PURE__ */ ue(fo, [["__scopeId", "data-v-06747b55"]]), po = { class: "dc-preview" }, vo = { class: "dc-preview__pager dc-mono" }, mo = ["disabled"], ho = { "aria-live": "polite" }, _o = ["disabled"], go = {
  key: 0,
  class: "dc-preview__card"
}, yo = { class: "dc-preview__body" }, wo = { class: "dc-preview__top" }, bo = { class: "dc-preview__badges" }, ko = { class: "dc-preview__entity dc-mono" }, $o = { class: "dc-preview__marks" }, xo = { class: "dc-preview__primary" }, Mo = { class: "dc-preview__secondary dc-mono" }, Co = { class: "dc-preview__fields" }, Eo = { class: "dc-preview__key" }, So = { class: "dc-preview__value dc-mono" }, Po = /* @__PURE__ */ ce({
  __name: "PreviewView",
  setup(e) {
    const t = ke(), n = yt(), s = W(0);
    xe(n, (l) => {
      s.value > l.length - 1 && (s.value = Math.max(0, l.length - 1));
    });
    const a = g(() => n.value[s.value]), r = g(() => {
      const l = a.value;
      return l ? [
        { key: l.labels.secondary, value: l.row.secondary, metric: null },
        // Named, so the value renders as the drill it may be rather than as text.
        { key: l.labels.metric1, value: l.metric1, metric: "metric1" },
        { key: l.labels.metric2, value: l.metric2, metric: "metric2" },
        { key: "Updated", value: l.date, metric: null }
      ] : [];
    }), o = g(() => {
      if (!n.value.length) return "0 / 0";
      const l = t.total.value > n.value.length ? ` of ${t.total.value}` : "";
      return `${s.value + 1} / ${n.value.length}${l}`;
    }), c = (l) => {
      const f = n.value.length;
      f && (s.value = Math.min(f - 1, Math.max(0, s.value + l)));
    };
    return (l, f) => (m(), _("div", po, [
      v("div", vo, [
        v("button", {
          type: "button",
          class: "dc-preview__step",
          "aria-label": "Previous result",
          disabled: s.value === 0,
          onClick: f[0] || (f[0] = (u) => c(-1))
        }, " ‹ ", 8, mo),
        v("span", ho, S(o.value), 1),
        v("button", {
          type: "button",
          class: "dc-preview__step",
          "aria-label": "Next result",
          disabled: s.value >= C(n).length - 1,
          onClick: f[1] || (f[1] = (u) => c(1))
        }, " › ", 8, _o)
      ]),
      a.value ? (m(), _("div", go, [
        v("div", {
          class: "dc-preview__media",
          style: Le({ background: a.value.row.tint }),
          "aria-hidden": "true"
        }, " preview ", 4),
        v("div", yo, [
          v("div", wo, [
            v("span", bo, [
              J(zt, {
                status: a.value.row.status
              }, null, 8, ["status"]),
              v("span", ko, S(a.value.entityLabel), 1)
            ]),
            v("span", $o, [
              J(Rt, { entry: a.value }, null, 8, ["entry"]),
              C(t).pinnable.value ? (m(), ge(zn, {
                key: 0,
                row: a.value.row,
                pinned: a.value.pinned
              }, null, 8, ["row", "pinned"])) : N("", !0)
            ])
          ]),
          v("div", null, [
            v("div", xo, S(a.value.row.primary), 1),
            v("div", Mo, S(a.value.row.secondary), 1)
          ]),
          v("dl", Co, [
            (m(!0), _(ae, null, ve(r.value, (u) => (m(), _("div", {
              key: u.key,
              class: "dc-preview__field"
            }, [
              v("dt", Eo, S(u.key), 1),
              v("dd", So, [
                u.metric && a.value ? (m(), ge(Je, {
                  key: 0,
                  entry: a.value,
                  metric: u.metric
                }, null, 8, ["entry", "metric"])) : (m(), _(ae, { key: 1 }, [
                  Ae(S(u.value), 1)
                ], 64))
              ])
            ]))), 128))
          ]),
          v("button", {
            type: "button",
            class: "dc-preview__open",
            onClick: f[2] || (f[2] = (u) => C(t).activate(a.value.row))
          }, " Open record → ")
        ])
      ])) : N("", !0)
    ]));
  }
}), qs = /* @__PURE__ */ ue(Po, [["__scopeId", "data-v-405dfdb6"]]), Ao = { class: "dc-table" }, zo = ["aria-sort"], Ro = { scope: "col" }, Fo = {
  key: 0,
  class: "dc-table__entity",
  scope: "col"
}, To = ["aria-sort"], Lo = ["aria-sort"], Do = ["aria-sort"], Io = ["onClick"], No = { class: "dc-table__num dc-mono" }, Vo = { class: "dc-table__primary" }, Oo = { class: "dc-table__name" }, Ko = ["title", "onClick"], qo = ["title"], Bo = {
  key: 0,
  class: "dc-table__entity dc-truncate dc-mono"
}, Wo = { class: "dc-table__number dc-mono" }, Uo = { class: "dc-table__number dc-mono" }, Ho = { class: "dc-table__muted dc-table__date dc-mono" }, Go = /* @__PURE__ */ ce({
  __name: "TableView",
  setup(e) {
    const t = ke(), n = yt(), s = yl(), a = g(() => t.isEverything.value);
    function r(l) {
      t.query.value.sort === l ? t.toggleDirection() : t.setSort(l);
    }
    const o = (l) => t.query.value.sort !== l ? "none" : t.query.value.dir === "desc" ? "descending" : "ascending", c = g(() => new Set(t.sorts.value.map((l) => l.key)));
    return (l, f) => (m(), _("table", Ao, [
      v("thead", null, [
        v("tr", null, [
          f[4] || (f[4] = v("th", {
            class: "dc-table__num",
            scope: "col"
          }, " # ", -1)),
          v("th", {
            scope: "col",
            "aria-sort": o("name")
          }, [
            c.value.has("name") ? (m(), _("button", {
              key: 0,
              type: "button",
              class: "dc-table__sort",
              onClick: f[0] || (f[0] = (u) => r("name"))
            }, S(C(s).primary), 1)) : (m(), _(ae, { key: 1 }, [
              Ae(S(C(s).primary), 1)
            ], 64))
          ], 8, zo),
          v("th", Ro, S(C(s).secondary), 1),
          a.value ? (m(), _("th", Fo, " Entity ")) : N("", !0),
          v("th", {
            class: "dc-table__number",
            scope: "col",
            "aria-sort": o("metric1")
          }, [
            c.value.has("metric1") ? (m(), _("button", {
              key: 0,
              type: "button",
              class: "dc-table__sort",
              onClick: f[1] || (f[1] = (u) => r("metric1"))
            }, S(C(s).metric1), 1)) : (m(), _(ae, { key: 1 }, [
              Ae(S(C(s).metric1), 1)
            ], 64))
          ], 8, To),
          v("th", {
            class: "dc-table__number",
            scope: "col",
            "aria-sort": o("metric2")
          }, [
            c.value.has("metric2") ? (m(), _("button", {
              key: 0,
              type: "button",
              class: "dc-table__sort",
              onClick: f[2] || (f[2] = (u) => r("metric2"))
            }, S(C(s).metric2), 1)) : (m(), _(ae, { key: 1 }, [
              Ae(S(C(s).metric2), 1)
            ], 64))
          ], 8, Lo),
          v("th", {
            class: "dc-table__date",
            scope: "col",
            "aria-sort": o("updated")
          }, [
            c.value.has("updated") ? (m(), _("button", {
              key: 0,
              type: "button",
              class: "dc-table__sort",
              onClick: f[3] || (f[3] = (u) => r("updated"))
            }, " Updated ")) : (m(), _(ae, { key: 1 }, [
              Ae(" Updated ")
            ], 64))
          ], 8, Do),
          f[5] || (f[5] = v("th", {
            class: "dc-table__state",
            scope: "col"
          }, " State ", -1))
        ])
      ]),
      v("tbody", null, [
        (m(!0), _(ae, null, ve(C(n), (u) => (m(), _("tr", {
          key: u.row.id,
          class: "dc-table__row",
          onClick: (w) => C(t).activate(u.row)
        }, [
          v("td", No, S(u.ordinal), 1),
          v("td", Vo, [
            v("div", Oo, [
              v("button", {
                type: "button",
                class: "dc-table__open dc-truncate",
                title: u.row.primary,
                onClick: Fe((w) => C(t).activate(u.row), ["stop"])
              }, S(u.row.primary), 9, Ko),
              J(Rt, { entry: u }, null, 8, ["entry"])
            ])
          ]),
          v("td", {
            class: "dc-table__muted dc-truncate dc-mono",
            title: u.row.secondary
          }, S(u.row.secondary), 9, qo),
          a.value ? (m(), _("td", Bo, S(u.entityLabel), 1)) : N("", !0),
          v("td", Wo, [
            J(Je, {
              entry: u,
              metric: "metric1"
            }, null, 8, ["entry"])
          ]),
          v("td", Uo, [
            J(Je, {
              entry: u,
              metric: "metric2"
            }, null, 8, ["entry"])
          ]),
          v("td", Ho, S(u.date), 1),
          v("td", null, [
            J(zt, {
              status: u.row.status
            }, null, 8, ["status"])
          ])
        ], 8, Io))), 128))
      ])
    ]));
  }
}), Bs = /* @__PURE__ */ ue(Go, [["__scopeId", "data-v-f25ee529"]]);
function Xo(e) {
  const t = Ut([]), n = W(!1), s = Ut(null);
  let a = 0;
  const r = (l, f, u) => ({
    entity: l,
    rows: f.rows.map(
      (w, y) => Is(w, y, l, e.isPinned(w.id))
    ),
    total: f.total,
    count: u ? l.count : String(f.total)
  }), o = () => {
    const l = ++a, f = e.query.value, u = e.schema.value, w = e.entities.value, y = e.limit.value, h = kn(f), $ = w.map((M) => ({
      entity: M,
      // Scope the query to this entity, keeping the expression and ordering
      // but dropping facets, which belong to whichever entity is selected.
      outcome: e.source.value.query({
        // Each card is the top few of its type, wherever the shell's own
        // result set has been paged to — so this asks for the first page.
        query: { ...f, entity: M.key, facets: Yt(M), page: 1 },
        schema: u,
        entity: M,
        limit: y,
        offset: 0
      })
    }));
    if ($.every(({ outcome: M }) => !(M instanceof Promise))) {
      t.value = $.map(
        ({ entity: M, outcome: k }) => r(M, k, h)
      ), s.value = null, n.value = !1;
      return;
    }
    n.value = !0, Promise.all($.map(({ outcome: M }) => Promise.resolve(M))).then((M) => {
      l === a && (t.value = M.map(
        (k, E) => r($[E].entity, k, h)
      ), s.value = null);
    }).catch((M) => {
      l === a && (s.value = M, t.value = []);
    }).finally(() => {
      l === a && (n.value = !1);
    });
  }, c = () => {
    try {
      o();
    } catch (l) {
      s.value = l, t.value = [], n.value = !1;
    }
  };
  return xe(
    [e.source, e.schema, e.query, e.entities, e.limit],
    c,
    { immediate: !0 }
  ), { previews: t, pending: n, error: s, refresh: c };
}
const Yo = {
  key: 0,
  class: "dc-types__state",
  role: "alert"
}, jo = {
  key: 1,
  class: "dc-types__state",
  "aria-live": "polite"
}, Qo = ["data-dc-pending"], Zo = ["data-dc-empty"], Jo = ["onClick"], ei = { class: "dc-type__name" }, ti = { class: "dc-type__count dc-mono" }, ni = { class: "dc-type__sr" }, si = {
  key: 0,
  class: "dc-type__empty"
}, ai = ["onClick"], ri = { class: "dc-type__identity" }, li = { class: "dc-type__primary dc-truncate" }, oi = { class: "dc-type__secondary dc-mono dc-truncate" }, ii = { class: "dc-type__trailing dc-mono" }, ci = { class: "dc-type__metric-value" }, ui = { class: "dc-type__metric-label" }, di = { class: "dc-type__date" }, fi = ["onClick"], pi = /* @__PURE__ */ ce({
  __name: "TypeCardsView",
  setup(e) {
    const t = ke(), { previews: n, pending: s, error: a } = Xo({
      source: t.source,
      schema: t.schema,
      query: t.query,
      entities: t.entities,
      limit: t.previewsPerType,
      isPinned: (o) => t.isPinnedId(o)
    }), r = g(() => !t.isPristine.value);
    return (o, c) => C(a) ? (m(), _("p", Yo, " Could not load results: " + S(C(a) instanceof Error ? C(a).message : "the data source failed."), 1)) : !C(n).length && C(s) ? (m(), _("p", jo, " Running query… ")) : (m(), _("div", {
      key: 2,
      class: "dc-types",
      "data-dc-pending": C(s) ? "true" : "false"
    }, [
      (m(!0), _(ae, null, ve(C(n), (l) => (m(), _("section", {
        key: l.entity.key,
        class: "dc-type",
        "data-dc-empty": l.rows.length ? "false" : "true"
      }, [
        v("button", {
          type: "button",
          class: "dc-type__head",
          onClick: (f) => C(t).setEntity(l.entity.key)
        }, [
          v("span", ei, S(l.entity.label), 1),
          v("span", ti, S(l.count), 1),
          c[0] || (c[0] = v("span", {
            class: "dc-type__go",
            "aria-hidden": "true"
          }, "→", -1)),
          v("span", ni, "Show only " + S(l.entity.label.toLowerCase()), 1)
        ], 8, Jo),
        l.rows.length ? N("", !0) : (m(), _("p", si, S(r.value ? "No matches" : "Nothing here yet"), 1)),
        (m(!0), _(ae, null, ve(l.rows, (f) => (m(), _("div", {
          key: f.row.id,
          class: "dc-type__row"
        }, [
          v("button", {
            type: "button",
            class: "dc-type__open",
            onClick: (u) => C(t).activate(f.row)
          }, [
            v("span", ri, [
              v("span", li, S(f.row.primary), 1),
              v("span", oi, S(f.row.secondary), 1)
            ])
          ], 8, ai),
          v("span", ii, [
            J(Je, {
              class: "dc-type__metric",
              entry: f,
              metric: "metric1"
            }, {
              default: it(() => [
                v("span", ci, S(f.metric1), 1),
                v("span", ui, S(f.labels.metric1), 1)
              ]),
              _: 2
            }, 1032, ["entry"]),
            v("span", di, S(f.date), 1),
            J(Rt, { entry: f }, null, 8, ["entry"])
          ])
        ]))), 128)),
        l.entity.create ? (m(), _("button", {
          key: 1,
          type: "button",
          class: "dc-type__new",
          onClick: (f) => C(t).create(l.entity)
        }, [
          c[1] || (c[1] = v("span", {
            class: "dc-type__plus",
            "aria-hidden": "true"
          }, "+", -1)),
          Ae(" " + S(l.entity.create), 1)
        ], 8, fi)) : N("", !0)
      ], 8, Zo))), 128))
    ], 8, Qo));
  }
}), Ws = /* @__PURE__ */ ue(pi, [["__scopeId", "data-v-79bdfbd9"]]), vi = ["data-dc-pending"], mi = {
  key: 0,
  class: "dc-results__state",
  role: "alert"
}, hi = { class: "dc-results__detail" }, _i = {
  key: 2,
  class: "dc-results__state",
  "aria-live": "polite"
}, gi = {
  key: 3,
  class: "dc-results__state"
}, yi = { class: "dc-results__detail" }, wi = /* @__PURE__ */ ce({
  __name: "ResultsArea",
  props: {
    views: {}
  },
  setup(e) {
    const t = e, n = ke(), s = {
      list: pn,
      cards: Ns,
      grid: Vs,
      table: Bs,
      links: Os,
      preview: qs
    }, a = g(() => xs(n.query.value)), r = g(() => {
      const f = n.query.value.view, u = t.views ?? [], [w] = u;
      return w === void 0 || u.includes(f) ? f : w;
    }), o = g(() => s[r.value] ?? pn), c = g(() => n.rows.value.length > 0), l = g(() => n.error.value !== null);
    return (f, u) => (m(), _("div", {
      class: "dc-results",
      "data-dc-pending": C(n).pending.value ? "true" : "false"
    }, [
      l.value ? (m(), _("p", mi, [
        u[1] || (u[1] = v("span", { class: "dc-results__headline" }, "Could not load results", -1)),
        v("span", hi, S(C(n).error.value instanceof Error ? C(n).error.value.message : "The data source failed."), 1)
      ])) : a.value ? (m(), ge(Ws, { key: 1 })) : !c.value && C(n).pending.value ? (m(), _("p", _i, [...u[2] || (u[2] = [
        v("span", { class: "dc-results__detail" }, "Running query…", -1)
      ])])) : c.value ? (m(), ge(Pa(o.value), { key: 4 })) : (m(), _("div", gi, [
        u[3] || (u[3] = v("span", { class: "dc-results__headline" }, "Nothing matches this query", -1)),
        v("span", yi, S(C(n).summary.value), 1),
        C(n).isPristine.value ? N("", !0) : (m(), _("button", {
          key: 0,
          type: "button",
          class: "dc-results__clear",
          onClick: u[0] || (u[0] = (w) => C(n).clearFilters())
        }, S(C(n).isEverything.value ? "Clear filters" : "Search everything instead"), 1))
      ]))
    ], 8, vi));
  }
}), Us = /* @__PURE__ */ ue(wi, [["__scopeId", "data-v-c00573c8"]]), bi = ["data-dc-theme"], ki = ["data-dc-width", "data-dc-align"], $i = { class: "dc-shell__panel" }, xi = /* @__PURE__ */ ce({
  __name: "DataShell",
  props: /* @__PURE__ */ Xt({
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
  emits: /* @__PURE__ */ Xt(["activate", "create", "drill", "query-change", "toggle-pin"], ["update:open", "update:pinned"]),
  setup(e, { expose: t, emit: n }) {
    const s = e, a = n, r = Gt(e, "open"), o = Gt(e, "pinned"), c = wn(), l = _t(_s, null), f = s.route || l ? null : Ta(), u = s.route ?? l ?? f;
    Ze(() => f?.dispose?.());
    const w = g(() => er({ seed: s.schema.key })), y = g(() => s.source ?? w.value), h = vr({
      schema: () => s.schema,
      adapter: u,
      defaults: () => s.defaults,
      navigationMode: () => s.navigationMode,
      facetNavigationMode: () => s.facetNavigationMode
    }), $ = mr({
      source: y,
      query: h.query,
      schema: g(() => s.schema),
      entity: h.entity,
      limit: g(() => s.limit)
    });
    xe(h.query, (b) => a("query-change", b)), xe(
      [$.pageCount, $.pending, h.query],
      () => {
        if ($.pending.value) return;
        const b = $.pageCount.value;
        h.query.value.page > b && h.setPage(b, "replace");
      },
      // Immediately, since a pasted URL is past the end before anything changes;
      // and after the render, so the correction is a navigation the mounted shell
      // makes rather than one it makes on the way up. An async source is still
      // pending here and corrects itself when its count lands.
      { immediate: !0, flush: "post" }
    );
    const M = ms() ?? "dc-query-panel", k = W(null);
    function E() {
      r.value && (r.value = !1, At(() => {
        k.value?.$el?.querySelector(".dc-header__trigger")?.focus();
      }));
    }
    const L = g(() => new Set(o.value));
    function B(b) {
      const A = new Set(L.value);
      A.has(b.id) ? A.delete(b.id) : A.add(b.id), o.value = [...A], a("toggle-pin", b);
    }
    function I(b, A) {
      h.narrow(ar(s.schema, h.query.value, b), A?.key ?? null), a("drill", b, A);
    }
    const F = rr({
      ...h,
      schema: g(() => s.schema),
      entities: g(() => s.schema.entities),
      rows: $.rows,
      total: $.total,
      limit: g(() => s.limit),
      offset: $.offset,
      pageCount: $.pageCount,
      pending: $.pending,
      error: $.error,
      source: y,
      previewsPerType: g(() => s.previewsPerType),
      pinnable: g(() => s.pinnable === !0),
      isPinned: (b) => L.value.has(b.id),
      isPinnedId: (b) => L.value.has(b),
      togglePin: B,
      activate: (b) => a("activate", b),
      create: (b) => a("create", b),
      drill: I
    }), V = g(() => {
      if (!(!s.accent && !s.tokens))
        return { ...s.tokens, ...s.accent ? { "--dc-accent": s.accent } : {} };
    });
    return t({
      query: h.query,
      openPanel: () => {
        r.value = !0;
      },
      closePanel: E
    }), (b, A) => (m(), _("div", {
      class: "dc-shell",
      "data-dc-theme": e.theme,
      style: Le(V.value)
    }, [
      v("div", {
        class: "dc-shell__head",
        "data-dc-width": e.matchWidth,
        "data-dc-align": e.matchWidth === "shrink" ? e.headAlign : void 0
      }, [
        J(Fs, {
          ref_key: "headerRef",
          ref: k,
          expanded: r.value,
          "panel-id": C(M),
          onToggle: A[0] || (A[0] = (Z) => r.value = !r.value)
        }, Jn({ _: 2 }, [
          c.actions ? {
            name: "actions",
            fn: it(() => [
              Ke(b.$slots, "actions", {}, void 0, !0)
            ]),
            key: "0"
          } : void 0
        ]), 1032, ["expanded", "panel-id"]),
        r.value ? (m(), _(ae, { key: 0 }, [
          v("div", {
            class: "dc-shell__scrim",
            onClick: E
          }),
          v("div", $i, [
            J(Ls, {
              "panel-id": C(M),
              views: e.views,
              onClose: E
            }, Jn({ _: 2 }, [
              c["panel-section"] ? {
                name: "panel-section",
                fn: it(() => [
                  Ke(b.$slots, "panel-section", {}, void 0, !0)
                ]),
                key: "0"
              } : void 0
            ]), 1032, ["panel-id", "views"])
          ])
        ], 64)) : N("", !0)
      ], 8, ki),
      Ke(b.$slots, "results", {
        rows: C(F).rows.value,
        total: C(F).total.value,
        offset: C(F).offset.value,
        pageCount: C(F).pageCount.value,
        query: C(F).query.value,
        pending: C(F).pending.value
      }, () => [
        J(Us, { views: e.views }, null, 8, ["views"])
      ], !0)
    ], 12, bi));
  }
}), Mi = /* @__PURE__ */ ue(xi, [["__scopeId", "data-v-737c7342"]]), Ct = (e) => e.separator !== !0 && e.heading !== !0 && e.disabled !== !0, Ci = ["aria-label"], Ei = ["role", "aria-label"], Si = ["data-dc-item"], Pi = {
  key: 0,
  class: "dc-menu__rule",
  role: "separator"
}, Ai = ["role", "aria-checked", "aria-haspopup", "aria-expanded", "aria-disabled", "disabled", "data-dc-item", "onClick", "onMouseenter"], zi = {
  class: "dc-menu__mark",
  "aria-hidden": "true"
}, Ri = { class: "dc-menu__label dc-truncate" }, Fi = {
  key: 0,
  class: "dc-menu__key dc-mono"
}, Ti = {
  key: 1,
  class: "dc-menu__more",
  "aria-hidden": "true"
}, Li = /* @__PURE__ */ ce({
  __name: "MenuList",
  props: {
    items: {},
    at: {},
    label: {},
    autofocus: { type: Boolean }
  },
  emits: ["choose", "dismiss"],
  setup(e, { expose: t, emit: n }) {
    const s = e, a = n, r = W(null), o = W([]), c = W(null), l = W(null), f = W(null), u = W(!1), w = g(
      () => s.items.flatMap((b, A) => Ct(b) ? [A] : [])
    ), y = g(() => {
      const b = [{ entries: [] }];
      return s.items.forEach((A, Z) => {
        A.heading ? b.push({ heading: A, entries: [] }) : b[b.length - 1]?.entries.push({ item: A, index: Z });
      }), b.filter((A) => A.entries.length > 0);
    }), h = W({ x: s.at.x, y: s.at.y });
    async function $() {
      h.value = { x: s.at.x, y: s.at.y }, await At();
      const b = r.value?.getBoundingClientRect();
      if (!b) return;
      const A = 8;
      let Z = s.at.x, oe = s.at.y;
      if (Z + b.width > window.innerWidth - A) {
        const fe = s.at.mirrorX === void 0 ? null : s.at.mirrorX - b.width;
        Z = fe !== null && fe >= A ? fe : window.innerWidth - b.width - A;
      }
      oe + b.height > window.innerHeight - A && (oe = window.innerHeight - b.height - A), h.value = { x: Math.max(A, Z), y: Math.max(A, oe) };
    }
    const M = g(() => ({ left: `${h.value.x}px`, top: `${h.value.y}px` }));
    function k(b) {
      c.value = b, b !== null && At(() => o.value[b]?.focus());
    }
    function E(b, A) {
      const Z = w.value;
      if (Z.length === 0) return null;
      if (b === null) return A === 1 ? Z[0] ?? null : Z[Z.length - 1] ?? null;
      const oe = Z.indexOf(b);
      return oe === -1 ? Z[0] ?? null : Z[(oe + A + Z.length) % Z.length] ?? null;
    }
    function L(b, A) {
      if (!s.items[b]?.items?.length) return;
      const oe = o.value[b]?.getBoundingClientRect(), fe = r.value?.getBoundingClientRect();
      !oe || !fe || (f.value = { x: fe.right - 4, y: oe.top - 4, mirrorX: fe.left + 4 }, l.value = b, u.value = A);
    }
    function B(b) {
      const A = l.value;
      l.value = null, f.value = null, b && A !== null && k(A);
    }
    function I(b) {
      const A = s.items[b];
      if (!(!A || !Ct(A))) {
        if (A.items?.length) {
          L(b, !0);
          return;
        }
        a("choose", A);
      }
    }
    function F(b) {
      const A = b.key;
      if (A === "Escape") {
        b.preventDefault(), b.stopPropagation(), l.value !== null ? B(!0) : a("dismiss");
        return;
      }
      if (A === "ArrowDown" || A === "ArrowUp") {
        b.preventDefault(), b.stopPropagation(), B(!1), k(E(c.value, A === "ArrowDown" ? 1 : -1));
        return;
      }
      if (A === "Home" || A === "End") {
        b.preventDefault(), b.stopPropagation(), B(!1), k(E(null, A === "Home" ? 1 : -1));
        return;
      }
      if (A === "ArrowRight") {
        const Z = c.value;
        Z !== null && s.items[Z]?.items?.length && (b.preventDefault(), b.stopPropagation(), L(Z, !0));
        return;
      }
      if (A === "ArrowLeft") {
        l.value !== null && (b.preventDefault(), b.stopPropagation(), B(!0));
        return;
      }
      if (A === "Enter" || A === " ") {
        const Z = c.value;
        if (Z === null) return;
        b.preventDefault(), b.stopPropagation(), I(Z);
      }
    }
    function V(b) {
      const A = s.items[b];
      !A || !Ct(A) || (l.value !== null && l.value !== b && B(!1), k(b), A.items?.length && L(b, !1));
    }
    return Aa(() => {
      $(), s.autofocus && k(E(null, 1));
    }), xe(() => s.at, $, { deep: !0 }), xe(() => s.items, () => void $(), { deep: !0 }), Ze(() => {
      l.value = null;
    }), t({ root: r }), (b, A) => {
      const Z = hs("MenuList", !0);
      return m(), _("div", {
        ref_key: "root",
        ref: r,
        class: "dc-menu",
        role: "menu",
        "aria-label": e.label,
        style: Le(M.value),
        onKeydown: F
      }, [
        (m(!0), _(ae, null, ve(y.value, (oe, fe) => (m(), _("div", {
          key: `${fe}-${oe.heading?.label ?? ""}`,
          class: "dc-menu__group",
          role: oe.heading ? "group" : "none",
          "aria-label": oe.heading?.label
        }, [
          oe.heading ? (m(), _("div", {
            key: 0,
            class: "dc-menu__heading dc-truncate",
            "aria-hidden": "true",
            "data-dc-item": oe.heading.id
          }, S(oe.heading.label), 9, Si)) : N("", !0),
          (m(!0), _(ae, null, ve(oe.entries, ({ item: j, index: Me }) => (m(), _(ae, {
            key: j.id ?? `${Me}-${j.label ?? ""}`
          }, [
            j.separator ? (m(), _("div", Pi)) : (m(), _("button", {
              key: 1,
              ref_for: !0,
              ref: (Pe) => {
                Pe && (o.value[Me] = Pe);
              },
              type: "button",
              class: "dc-menu__item",
              role: j.checked === void 0 ? "menuitem" : "menuitemcheckbox",
              "aria-checked": j.checked === void 0 ? void 0 : j.checked,
              "aria-haspopup": j.items?.length ? "menu" : void 0,
              "aria-expanded": j.items?.length ? l.value === Me : void 0,
              "aria-disabled": j.disabled ? "true" : void 0,
              disabled: j.disabled,
              "data-dc-item": j.id,
              tabindex: "-1",
              onClick: (Pe) => I(Me),
              onMouseenter: (Pe) => V(Me)
            }, [
              v("span", zi, S(j.checked ? "✓" : ""), 1),
              v("span", Ri, S(j.label), 1),
              j.shortcut ? (m(), _("span", Fi, S(j.shortcut), 1)) : j.items?.length ? (m(), _("span", Ti, "›")) : N("", !0)
            ], 40, Ai))
          ], 64))), 128))
        ], 8, Ei))), 128)),
        l.value !== null && f.value ? (m(), ge(Z, {
          key: l.value,
          items: e.items[l.value]?.items ?? [],
          at: f.value,
          label: e.items[l.value]?.label,
          autofocus: u.value,
          onChoose: A[0] || (A[0] = (oe) => a("choose", oe)),
          onDismiss: A[1] || (A[1] = (oe) => B(!0))
        }, null, 8, ["items", "at", "label", "autofocus"])) : N("", !0)
      ], 44, Ci);
    };
  }
}), Hs = /* @__PURE__ */ ue(Li, [["__scopeId", "data-v-9b1413fa"]]), Di = ["data-dc-theme", "aria-label"], Ii = ["aria-expanded", "aria-disabled", "disabled", "data-dc-menu", "tabindex", "onClick", "onMouseenter"], Ni = /* @__PURE__ */ ce({
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
    const n = e, s = g(() => {
      if (!(!n.accent && !n.tokens))
        return { ...n.tokens, ...n.accent ? { "--dc-accent": n.accent } : {} };
    }), a = t, r = W(null), o = W([]), c = W(null), l = W(null), f = W(!1), u = g(
      () => n.menus.flatMap((I, F) => Ct(I) ? [F] : [])
    );
    function w(I, F) {
      const V = o.value[I]?.getBoundingClientRect(), b = n.menus[I];
      !V || !b || !Ct(b) || (l.value = { x: V.left, y: V.bottom + 2, mirrorX: V.right }, c.value = I, f.value = F);
    }
    function y(I) {
      const F = c.value;
      c.value = null, l.value = null, I && F !== null && o.value[F]?.focus();
    }
    function h(I) {
      c.value === I ? y(!0) : w(I, !1);
    }
    function $(I) {
      c.value === null || c.value === I || w(I, !1);
    }
    function M(I, F) {
      const V = u.value;
      if (V.length === 0) return null;
      if (I === null) return F === 1 ? V[0] ?? null : V[V.length - 1] ?? null;
      const b = V.indexOf(I);
      return b === -1 ? V[0] ?? null : V[(b + F + V.length) % V.length] ?? null;
    }
    function k(I) {
      const F = I.key;
      if (F === "Escape") {
        if (c.value === null) return;
        I.preventDefault(), y(!0);
        return;
      }
      if (F === "ArrowDown" && c.value === null) {
        const A = E();
        if (A === null) return;
        I.preventDefault(), w(A, !0);
        return;
      }
      if (F !== "ArrowLeft" && F !== "ArrowRight") return;
      const V = c.value ?? E(), b = M(V, F === "ArrowRight" ? 1 : -1);
      b !== null && (I.preventDefault(), c.value !== null ? w(b, !0) : o.value[b]?.focus());
    }
    function E() {
      const I = o.value.findIndex((F) => F === document.activeElement);
      return I === -1 ? u.value[0] ?? null : I;
    }
    function L(I) {
      const F = I.target;
      !F || r.value?.contains(F) || y(!1);
    }
    xe(c, (I) => {
      I !== null ? window.addEventListener("pointerdown", L, !0) : window.removeEventListener("pointerdown", L, !0);
    }), Ze(() => window.removeEventListener("pointerdown", L, !0));
    function B(I) {
      y(!0), I.action?.(), a("choose", I);
    }
    return (I, F) => (m(), _("div", {
      ref_key: "bar",
      ref: r,
      class: "dc-shell dc-menubar",
      role: "menubar",
      "data-dc-theme": e.theme,
      "aria-label": e.label ?? "Main menu",
      style: Le(s.value),
      onKeydown: k
    }, [
      (m(!0), _(ae, null, ve(e.menus, (V, b) => (m(), _("button", {
        key: V.id ?? V.label ?? b,
        ref_for: !0,
        ref: (A) => {
          A && (o.value[b] = A);
        },
        type: "button",
        class: "dc-menubar__item",
        role: "menuitem",
        "aria-haspopup": "menu",
        "aria-expanded": c.value === b,
        "aria-disabled": V.disabled ? "true" : void 0,
        disabled: V.disabled,
        "data-dc-menu": V.id ?? V.label,
        tabindex: b === (u.value[0] ?? 0) ? 0 : -1,
        onClick: (A) => h(b),
        onMouseenter: (A) => $(b)
      }, S(V.label), 41, Ii))), 128)),
      c.value !== null && l.value ? (m(), ge(Hs, {
        key: c.value,
        items: e.menus[c.value]?.items ?? [],
        at: l.value,
        label: e.menus[c.value]?.label,
        autofocus: f.value,
        onChoose: B,
        onDismiss: F[0] || (F[0] = (V) => y(!0))
      }, null, 8, ["items", "at", "label", "autofocus"])) : N("", !0)
    ], 44, Di));
  }
}), du = /* @__PURE__ */ ue(Ni, [["__scopeId", "data-v-93dbd2e4"]]), Vi = ["aria-label", "aria-expanded", "disabled"], Oi = { "aria-hidden": "true" }, Ki = /* @__PURE__ */ ce({
  __name: "MenuButton",
  props: {
    items: {},
    label: {},
    glyph: { default: "⋯" }
  },
  emits: ["choose"],
  setup(e, { emit: t }) {
    const n = t, s = W(null), a = W(null), r = W(null), o = W(!1), c = g(() => r.value !== null);
    function l($) {
      const M = s.value?.getBoundingClientRect();
      M && (r.value = { x: M.left, y: M.bottom + 4, mirrorX: M.right }, o.value = $);
    }
    function f($) {
      r.value = null, $ && s.value?.focus();
    }
    function u() {
      c.value ? f(!0) : l(!1);
    }
    function w($) {
      $.key !== "ArrowDown" || c.value || ($.preventDefault(), l(!0));
    }
    function y($) {
      const M = $.target;
      M && (s.value?.contains(M) || a.value?.root?.contains(M) || f(!1));
    }
    xe(c, ($) => {
      $ ? window.addEventListener("pointerdown", y, !0) : window.removeEventListener("pointerdown", y, !0);
    }), Ze(() => window.removeEventListener("pointerdown", y, !0));
    function h($) {
      f(!0), $.action?.(), n("choose", $);
    }
    return ($, M) => (m(), _(ae, null, [
      v("button", {
        ref_key: "trigger",
        ref: s,
        type: "button",
        class: "dc-menu-button",
        "aria-label": e.label,
        "aria-haspopup": "menu",
        "aria-expanded": c.value,
        disabled: e.items.length === 0,
        onClick: u,
        onKeydown: w
      }, [
        v("span", Oi, S(e.glyph), 1)
      ], 40, Vi),
      r.value ? (m(), ge(Hs, {
        key: 0,
        ref_key: "menu",
        ref: a,
        items: e.items,
        at: r.value,
        label: e.label,
        autofocus: o.value,
        onChoose: h,
        onDismiss: M[0] || (M[0] = (k) => f(!0))
      }, null, 8, ["items", "at", "label", "autofocus"])) : N("", !0)
    ], 64));
  }
}), Rn = /* @__PURE__ */ ue(Ki, [["__scopeId", "data-v-48f5ada5"]]), wt = (e) => e.kind === "split", K = (e) => e.kind === "group", G = (e) => e.kind === "float", rt = { x: 16, y: 16, w: 360, h: 260 }, jt = 28, Gs = 120, vn = 220, Xs = 38, dt = 6;
function Ft(e, t) {
  let n = !1;
  const s = e.frames.map((a, r) => {
    const o = t(a.node, r);
    return o === a.node ? a : (n = !0, { ...a, node: o });
  });
  return n ? { ...e, frames: s } : e;
}
function Te(e) {
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
const ie = (e) => typeof e == "string", Fn = (e) => ie(e) ? Te(e) : e, Tt = (e) => ie(e) ? [e] : We(e), ls = (e) => e.panels.filter(ie), qi = (e) => e.panels.filter((t) => !ie(t)), Se = (e, t) => e.panels.includes(t);
function Lt(e, t, n) {
  let s = !1;
  const a = e.panels.map((r) => {
    if (ie(r) || !ee(r, t)) return r;
    const o = n(r);
    return o !== r && (s = !0), o;
  });
  return s ? { ...e, panels: a } : e;
}
function Zt(e, t) {
  return { node: e, rect: { ...rt, ...t } };
}
function Tn(e, t) {
  return t ? { kind: "float", frames: e, title: t } : { kind: "float", frames: e };
}
function Ln(e, t) {
  const n = { ...rt, ...t };
  return Tn(
    e.map(
      (s, a) => Zt(s, {
        ...n,
        x: n.x + a * jt,
        y: n.y + a * jt
      })
    )
  );
}
function Dn(e, t, n, s) {
  return {
    kind: "split",
    direction: e,
    children: t,
    ...n ? { sizes: n } : {},
    ...s ? { title: s } : {}
  };
}
const In = (e, t, n) => Dn("row", e, t, n), pu = (e, t, n) => Dn("column", e, t, n);
function me(e) {
  return {
    ...e.title ? { title: e.title } : {},
    ...e.fixedView ? { fixedView: !0 } : {},
    ...e.headless ? { headless: !0 } : {}
  };
}
const ct = (e) => e.fixedView === !0 || e.headless === !0 || !!e.title, vu = (e) => ({ ...e, headless: !0 }), mu = (e) => ({ ...e, fixedView: !0 }), Bi = (e) => e === "left" || e === "right" ? "row" : "column";
function We(e) {
  return K(e) ? e.panels.flatMap(Tt) : G(e) ? e.frames.flatMap((t) => We(t.node)) : e.children.flatMap(We);
}
function ee(e, t) {
  return K(e) ? e.panels.some((n) => ie(n) ? n === t : ee(n, t)) : G(e) ? e.frames.some((n) => ee(n.node, t)) : e.children.some((n) => ee(n, t));
}
const Ys = (e) => We(e).length === 0, mn = (e) => !K(e) && ct(e), hn = (e) => Ys(e) && !mn(e);
function Jt(e) {
  return wt(e) ? e.children.map((t, n) => ({ node: t, index: n })) : G(e) ? e.frames.map((t, n) => ({ node: t.node, index: n })) : e.panels.flatMap((t, n) => ie(t) ? [] : [{ node: t, index: n }]);
}
const Nn = (e) => Jt(e).map((t) => t.node);
function ut(e) {
  const t = e.active;
  if (t) {
    const n = e.panels.findIndex(
      (s) => ie(s) ? s === t : ee(s, t)
    );
    if (n >= 0) return n;
  }
  return 0;
}
function js(e) {
  const t = e.panels[ut(e)];
  return t !== void 0 && ie(t) ? t : "";
}
function be(e) {
  if (ie(e)) return e;
  if (K(e)) {
    const n = e.panels[ut(e)];
    return n === void 0 ? "" : be(n);
  }
  if (G(e)) {
    const n = e.frames[e.frames.length - 1];
    return n ? be(n.node) : "";
  }
  const t = e.children[0];
  return t ? be(t) : "";
}
function pt(e, t) {
  if (K(e) && Se(e, t)) return e;
  for (const n of Nn(e)) {
    const s = pt(n, t);
    if (s) return s;
  }
  return null;
}
function Wi(e) {
  const t = Nn(e).flatMap(Wi);
  return K(e) ? [e, ...t] : t;
}
function _e(e, t) {
  if (K(e)) {
    for (const n of qi(e)) {
      const s = _e(n, t);
      if (s) return s;
    }
    return null;
  }
  if (G(e)) {
    for (const n of e.frames)
      if (ee(n.node, t))
        return _e(n.node, t) ?? n;
    return null;
  }
  for (const n of e.children) {
    const s = _e(n, t);
    if (s) return s;
  }
  return null;
}
function an(e, t, n = Gs) {
  const s = (c, l) => l > 0 ? Math.max(Math.min(c, l), Math.min(n, l)) : Math.max(c, n), a = s(e.w, t.w), r = s(e.h, t.h), o = (c, l, f) => Math.min(Math.max(c, 0), Math.max(f - l, 0));
  return {
    x: Math.round(o(e.x, a, t.w)),
    y: Math.round(o(e.y, r, t.h)),
    w: Math.round(a),
    h: Math.round(r)
  };
}
function os(e, t, n, s, a = Gs) {
  let { x: r, y: o, w: c, h: l } = e;
  return t.includes("e") && (c = e.w + n), t.includes("w") && (c = e.w - n, r = e.x + n), t.includes("s") && (l = e.h + s), t.includes("n") && (l = e.h - s, o = e.y + s), c < a && (t.includes("w") && (r = e.x + e.w - a), c = a), l < a && (t.includes("n") && (o = e.y + e.h - a), l = a), { x: r, y: o, w: c, h: l };
}
const Qs = (e, t) => e.x === t.x && e.y === t.y && e.w === t.w && e.h === t.h;
function vt(e, t, n) {
  if (K(e)) return Lt(e, t, (r) => vt(r, t, n));
  if (G(e)) {
    let r = !1;
    const o = e.frames.map((c) => {
      if (!ee(c.node, t)) return c;
      if (_e(c.node, t)) {
        const f = vt(c.node, t, n);
        return f === c.node ? c : (r = !0, { ...c, node: f });
      }
      const l = n(c);
      return l === c ? c : (r = !0, l);
    });
    return r ? { ...e, frames: o } : e;
  }
  if (!ee(e, t)) return e;
  let s = !1;
  const a = e.children.map((r) => {
    const o = vt(r, t, n);
    return o !== r && (s = !0), o;
  });
  return s ? { ...e, children: a } : e;
}
function Ui(e, t, n) {
  return vt(e, t, (s) => Qs(s.rect, n) ? s : { ...s, rect: n });
}
const je = (e) => e.maximized === !0, Zs = (e) => (t) => {
  if (je(t) === e) return t;
  if (e) {
    const { minimized: a, ...r } = t;
    return { ...r, maximized: !0 };
  }
  const { maximized: n, ...s } = t;
  return s;
};
function Hi(e, t, n = !0) {
  return vt(e, t, Zs(n));
}
function hu(e, t) {
  const n = _e(e, t);
  return n ? Hi(e, t, !je(n)) : e;
}
const st = (e) => e.minimized === !0, Js = (e) => (t) => {
  if (st(t) === e) return t;
  if (e) {
    const { maximized: a, ...r } = t;
    return { ...r, minimized: !0 };
  }
  const { minimized: n, ...s } = t;
  return s;
};
function Gi(e, t, n = !0) {
  return vt(e, t, Js(n));
}
function _u(e, t) {
  const n = _e(e, t);
  return n ? Gi(e, t, !st(n)) : e;
}
function nt(e, t) {
  const n = t[t.length - 1];
  if (n === void 0) return null;
  const s = Qe(e, t.slice(0, -1));
  return !s || !G(s) ? null : s.frames[n] ?? null;
}
function _n(e, t) {
  if (G(e)) {
    for (const [n, s] of e.frames.entries()) {
      if (!ee(s.node, t)) continue;
      const a = _n(s.node, t);
      return a ? [n, ...a] : [n];
    }
    return null;
  }
  for (const { node: n, index: s } of Jt(e)) {
    if (!ee(n, t)) continue;
    const a = _n(n, t);
    return a ? [s, ...a] : null;
  }
  return null;
}
function Vn(e, t, n) {
  const s = t[t.length - 1];
  if (s === void 0) return e;
  const a = t.slice(0, -1), r = Qe(e, a);
  if (!r || !G(r)) return e;
  const o = r.frames[s];
  if (!o) return e;
  const c = n(o);
  if (c === o) return e;
  const l = [...r.frames];
  return l[s] = c, ot(e, a, { ...r, frames: l });
}
function is(e, t, n) {
  return Vn(
    e,
    t,
    (s) => Qs(s.rect, n) ? s : { ...s, rect: n }
  );
}
function Xi(e, t, n = !0) {
  return Vn(e, t, Zs(n));
}
function Yi(e, t, n = !0) {
  return Vn(e, t, Js(n));
}
function Et(e, t) {
  const [n, ...s] = t;
  if (n === void 0) return e;
  if (G(e)) {
    const o = e.frames[n];
    if (!o) return e;
    const c = Et(o.node, s), l = c === o.node ? o : { ...o, node: c };
    if (n === e.frames.length - 1 && l === o) return e;
    const f = [...e.frames];
    return f.splice(n, 1), f.push(l), { ...e, frames: f };
  }
  const a = Qe(e, [n]);
  if (!a) return e;
  const r = Et(a, s);
  return r === a ? e : ot(e, [n], r);
}
function ji(e, t) {
  const n = [...t];
  let s = e;
  return t.forEach((a, r) => {
    s && (G(s) && (n[r] = s.frames.length - 1), s = Qe(s, [a]));
  }), n;
}
function qt(e, t, n, s) {
  if (K(e)) return Lt(e, n, (o) => qt(o, t, n, s));
  if (G(e)) {
    const o = e.frames.findIndex((l) => ee(l.node, n)), c = e.frames[o];
    if (!c) return e;
    if (_e(c.node, n)) {
      const l = qt(c.node, t, n, s);
      if (l === c.node) return e;
      const f = [...e.frames];
      return f[o] = { ...c, node: l }, { ...e, frames: f };
    }
    return { ...e, frames: [...e.frames, Zt(Te(t), s)] };
  }
  if (!ee(e, n)) return e;
  let a = !1;
  const r = e.children.map((o) => {
    const c = qt(o, t, n, s);
    return c !== o && (a = !0), c;
  });
  return a ? { ...e, children: r } : e;
}
function cs(e, t, n, s) {
  if (t === n || !ee(e, t) || !ee(e, n) || !_e(e, n)) return e;
  const a = lt(e, t);
  if (!a) return e;
  const r = qt(a, t, n, s);
  return r === a ? e : he(r);
}
function Qi(e, t, n) {
  return G(e) ? { ...e, frames: [...e.frames, Zt(Te(t), n)] } : K(e) ? ta(e, t) : {
    kind: "split",
    direction: e.direction,
    children: [...e.children, Te(t)],
    sizes: [...Be(e), 1],
    ...me(e)
  };
}
function ea(e, t, n, s) {
  const a = n[0];
  if (a === void 0) return Qi(e, t, s);
  const r = n.slice(1), o = (u, w) => w === a ? ea(u, t, r, s) : lt(u, t);
  if (G(e)) {
    const u = e.frames.flatMap((w, y) => {
      const h = o(w.node, y);
      return h ? [h === w.node ? w : { ...w, node: h }] : [];
    });
    return { ...e, frames: u };
  }
  if (K(e)) {
    const u = ut(e), w = [];
    e.panels.forEach(($, M) => {
      if (ie($)) {
        $ !== t && w.push($);
        return;
      }
      const k = o($, M);
      k && w.push(k);
    });
    const h = e.active && w.some(($) => Tt($).includes(e.active)) ? e.active : be(w[u] ?? w[w.length - 1]);
    return {
      kind: "group",
      panels: w,
      ...h ? { active: h } : {},
      ...me(e)
    };
  }
  const c = Be(e), l = [], f = [];
  return e.children.forEach((u, w) => {
    const y = o(u, w);
    y && (l.push(y), f.push(c[w] ?? 0));
  }), { kind: "split", direction: e.direction, children: l, sizes: f, ...me(e) };
}
function us(e, t, n, s) {
  const a = Qe(e, n);
  return !a || !Ys(a) || !ee(e, t) ? e : he(ea(e, t, n, s));
}
function rn(e, t) {
  if (K(e)) return Lt(e, t, (a) => rn(a, t));
  if (G(e)) {
    const a = e.frames.findIndex((f) => ee(f.node, t)), r = e.frames[a];
    if (!r) return e;
    const o = rn(r.node, t), c = o === r.node ? r : { ...r, node: o };
    if (a === e.frames.length - 1 && c === r) return e;
    const l = [...e.frames];
    return l.splice(a, 1), l.push(c), { ...e, frames: l };
  }
  if (!ee(e, t)) return e;
  let n = !1;
  const s = e.children.map((a) => {
    const r = rn(a, t);
    return r !== a && (n = !0), r;
  });
  return n ? { ...e, children: s } : e;
}
function On(e, t) {
  if (e <= 0) return [];
  const n = () => Array.from({ length: e }, () => 1 / e);
  if (!t || t.length !== e) return n();
  const s = t.map((r) => Number.isFinite(r) && r > 0 ? r : 0), a = s.reduce((r, o) => r + o, 0);
  return a <= 0 ? n() : s.map((r) => r / a);
}
const Be = (e) => On(e.children.length, e.sizes), ze = (e) => {
  const t = K(e) ? e.panels.length : e.children.length;
  return e.places?.length === t ? e.places : void 0;
};
function he(e) {
  if (K(e)) return Zi(e);
  if (G(e)) {
    const c = e.frames.flatMap((l) => {
      const f = he(l.node);
      return hn(f) ? [] : [f === l.node ? l : { ...l, node: f }];
    });
    return c.length === e.frames.length && c.every((l, f) => l === e.frames[f]) ? e : { ...e, frames: c };
  }
  if (e.children.length === 0) return e;
  const t = Be(e), n = ze(e), s = [], a = [], r = [];
  e.children.forEach((c, l) => {
    const f = he(c), u = t[l] ?? 0;
    if (hn(f)) return;
    if (!n && wt(f) && f.direction === e.direction && !ze(f) && !ct(f)) {
      const y = Be(f);
      f.children.forEach((h, $) => {
        s.push(h), a.push(u * (y[$] ?? 0));
      });
      return;
    }
    s.push(f), a.push(u);
    const w = n?.[l];
    w && r.push(w);
  });
  const o = s[0];
  return s.length === 1 && o && !ct(e) ? o : {
    kind: "split",
    direction: e.direction,
    children: s,
    sizes: On(s.length, a),
    ...me(e),
    ...r.length === s.length && r.length > 0 ? { places: r } : {}
  };
}
function Zi(e) {
  if (e.panels.every(ie)) return e;
  const t = be(e), n = ze(e), s = [], a = [];
  e.panels.forEach((c, l) => {
    const f = n?.[l];
    if (ie(c)) {
      s.push(c), f && a.push(f);
      return;
    }
    const u = he(c);
    if (!hn(u)) {
      if (K(u) && !ct(u) && !ze(u)) {
        s.push(...u.panels);
        return;
      }
      s.push(u), f && a.push(f);
    }
  });
  const r = s[0];
  if (s.length === 1 && r !== void 0 && !ie(r) && !ct(e))
    return r;
  if (s.length === e.panels.length && s.every((c, l) => c === e.panels[l]))
    return e;
  const o = t && s.some((c) => Tt(c).includes(t)) ? t : void 0;
  return {
    kind: "group",
    panels: s,
    ...o ? { active: o } : {},
    ...me(e),
    ...a.length === s.length && a.length > 0 ? { places: a } : {}
  };
}
function lt(e, t) {
  if (G(e)) {
    const o = e.frames.flatMap((c) => {
      const l = lt(c.node, t);
      return l ? [l === c.node ? c : { ...c, node: l }] : [];
    });
    return o.length === 0 && !mn(e) ? null : { ...e, frames: o };
  }
  if (K(e)) {
    if (!ee(e, t)) return e;
    const o = ut(e), c = [];
    for (const u of e.panels) {
      if (ie(u)) {
        u !== t && c.push(u);
        continue;
      }
      const w = lt(u, t);
      w && c.push(w);
    }
    if (c.length === 0) return null;
    const f = e.active && c.some((u) => Tt(u).includes(e.active)) ? e.active : be(c[o] ?? c[c.length - 1]);
    return f ? { kind: "group", panels: c, active: f, ...me(e) } : { kind: "group", panels: c, ...me(e) };
  }
  const n = Be(e), s = [], a = [];
  if (e.children.forEach((o, c) => {
    const l = lt(o, t);
    l && (s.push(l), a.push(n[c] ?? 0));
  }), s.length === 0)
    return mn(e) ? { kind: "split", direction: e.direction, children: s, sizes: [], ...me(e) } : null;
  const r = s[0];
  return s.length === 1 && r && !ct(e) ? r : he({
    kind: "split",
    direction: e.direction,
    children: s,
    sizes: a,
    ...me(e)
  });
}
function ta(e, t, n) {
  const s = e.panels.filter((r) => r !== t), a = n === void 0 ? s.length : Math.max(0, Math.min(n, s.length));
  return s.splice(a, 0, t), { kind: "group", panels: s, active: t, ...me(e) };
}
function Mt(e, t, n, s, a) {
  const r = (h) => Ft(
    h,
    ($) => ee($, n) ? Mt($, t, n, s, a) : $
  );
  if (s === "float") return e;
  const o = (h) => Lt(h, n, ($) => Mt($, t, n, s, a));
  if (s === "center")
    return K(e) ? Se(e, n) ? ta(e, t, a) : o(e) : G(e) ? r(e) : {
      ...e,
      children: e.children.map(
        (h) => ee(h, n) ? Mt(h, t, n, s, a) : h
      )
    };
  const c = Bi(s), l = s === "left" || s === "top", f = (h) => ({
    kind: "split",
    direction: c,
    children: l ? [Te(t), h] : [h, Te(t)],
    sizes: [0.5, 0.5]
  });
  if (K(e)) return Se(e, n) ? f(e) : o(e);
  if (G(e)) return r(e);
  const u = Be(e), w = e.children.findIndex(
    (h) => K(h) && Se(h, n)
  );
  if (w >= 0 && e.direction === c) {
    const h = (u[w] ?? 0) / 2, $ = [...e.children], M = [...u];
    return $.splice(l ? w : w + 1, 0, Te(t)), M.splice(w, 1, h, h), {
      kind: "split",
      direction: c,
      children: $,
      sizes: M,
      ...me(e)
    };
  }
  const y = e.children.map((h) => ee(h, n) ? K(h) && Se(h, n) ? f(h) : Mt(h, t, n, s) : h);
  return {
    kind: "split",
    direction: e.direction,
    children: y,
    sizes: u,
    ...me(e)
  };
}
function mt(e, t) {
  if (K(e)) {
    if (Se(e, t))
      return js(e) === t ? e : { ...e, active: t };
    const a = e.panels.findIndex((l) => !ie(l) && ee(l, t)), r = e.panels[a];
    if (r === void 0 || ie(r)) return e;
    const o = mt(r, t);
    if (o === r && e.active === t) return e;
    const c = [...e.panels];
    return c[a] = o, { ...e, panels: c, active: t };
  }
  if (!ee(e, t)) return e;
  if (G(e)) return Ft(e, (a) => mt(a, t));
  let n = !1;
  const s = e.children.map((a) => {
    const r = mt(a, t);
    return r !== a && (n = !0), r;
  });
  return n ? { ...e, children: s } : e;
}
function St(e, t, n) {
  if (K(e)) {
    if (!Se(e, t)) return Lt(e, t, (f) => St(f, t, n));
    const s = e.panels.indexOf(t), a = Math.max(0, Math.min(n, e.panels.length - 1));
    if (s === a) return e;
    const r = [...e.panels];
    r.splice(s, 1), r.splice(a, 0, t);
    const o = ze(e), c = o ? [...o] : void 0;
    c && c.splice(a, 0, ...c.splice(s, 1));
    const l = be(e);
    return {
      kind: "group",
      panels: r,
      ...l ? { active: l } : {},
      ...me(e),
      ...c ? { places: c } : {}
    };
  }
  return ee(e, t) ? G(e) ? Ft(e, (s) => St(s, t, n)) : { ...e, children: e.children.map((s) => St(s, t, n)) } : e;
}
function Bt(e, t, n) {
  if (t === n) return e;
  if (K(e)) {
    if (!ee(e, t) && !ee(e, n)) return e;
    const s = (r) => r === t ? n : r === n ? t : r, a = e.panels.map((r) => ie(r) ? s(r) : Bt(r, t, n));
    return { ...e, panels: a, ...e.active ? { active: s(e.active) } : {} };
  }
  return G(e) ? Ft(e, (s) => Bt(s, t, n)) : { ...e, children: e.children.map((s) => Bt(s, t, n)) };
}
function Ot(e, t, n, s, a) {
  if (s === "float" || !ee(e, t) || !ee(e, n)) return e;
  const r = pt(e, t);
  if (s === "center" && r && Se(r, n)) {
    if (a === void 0) return e;
    const c = r.panels.indexOf(t), l = a > c ? a - 1 : a;
    return l === c ? e : mt(St(e, t, l), t);
  }
  if (t === n) return e;
  const o = lt(e, t);
  return o ? he(Mt(o, t, n, s, a)) : e;
}
function na(e, t, n) {
  if (K(e)) {
    const a = e.panels[t];
    if (a === void 0 || ie(a)) return e;
    const r = [...e.panels];
    return r[t] = n, { ...e, panels: r };
  }
  if (G(e)) {
    const a = e.frames[t];
    if (!a) return e;
    const r = [...e.frames];
    return r[t] = { ...a, node: n }, { ...e, frames: r };
  }
  const s = [...e.children];
  return s[t] = n, { ...e, children: s };
}
function Dt(e, t, n) {
  const s = Jt(e);
  if (!K(e) && s.some(({ node: a }) => K(a) && Se(a, t))) {
    const a = n(e);
    return a === e ? null : a;
  }
  for (const { node: a, index: r } of s) {
    if (!ee(a, t)) continue;
    const o = Dt(a, t, n);
    return o ? na(e, r, o) : null;
  }
  return null;
}
function gu(e, t, n) {
  const s = Dt(
    e,
    t,
    (a) => wt(a) && a.direction !== n ? { ...a, direction: n } : a
  );
  return s ? he(s) : e;
}
function sa(e) {
  return G(e) ? [e] : ze(e) || ct(e) ? [e] : K(e) ? [...e.panels] : e.children.flatMap(sa);
}
function aa(e, t) {
  if (K(e)) return e;
  const n = Nn(e).map(sa), s = n.flat(), a = t && s.some((o) => Tt(o).includes(t)) ? t : void 0, r = Ji(e, n);
  return he({
    kind: "group",
    panels: s,
    ...a ? { active: a } : {},
    ...me(e),
    ...r ? { places: r } : {}
  });
}
function Ji(e, t) {
  const n = G(e) ? e.frames.map(({ node: s, ...a }) => a) : ze(e);
  if (n)
    return t.every((s) => s.length === 1) ? n : void 0;
}
function ec(e, t) {
  const n = Dt(e, t, (s) => aa(s, t));
  return n ? he(n) : e;
}
function Kn(e, t, n) {
  if (K(e) && Se(e, t)) {
    const s = n(e);
    return s === e ? null : s;
  }
  for (const { node: s, index: a } of Jt(e)) {
    if (!ee(s, t)) continue;
    const r = Kn(s, t, n);
    return r ? na(e, a, r) : null;
  }
  return null;
}
function ds(e, t, n) {
  const s = Kn(e, t, (a) => {
    if (a.panels.length < 2) return a;
    const r = ze(a);
    return {
      ...Dn(n, a.panels.map(Fn)),
      ...me(a),
      ...r ? { places: r } : {}
    };
  });
  return s ? he(s) : e;
}
function gn(e, t) {
  if (K(e)) return e;
  if (G(e)) {
    const a = e.frames.findIndex(
      (c) => K(c.node) && c.node.panels.includes(t)
    ), r = e.frames[a], o = r && K(r.node) ? r.node : null;
    if (r && o && o.panels.length > 1) {
      const c = Ln(o.panels.map(Fn), r.rect).frames;
      return {
        ...e,
        frames: [...e.frames.slice(0, a), ...c, ...e.frames.slice(a + 1)]
      };
    }
    return Ft(e, (c) => gn(c, t));
  }
  if (!ee(e, t)) return e;
  let n = !1;
  const s = e.children.map((a) => {
    const r = gn(a, t);
    return r !== a && (n = !0), r;
  });
  return n ? { ...e, children: s } : e;
}
function tc(e, t, n) {
  const s = pt(e, t);
  if (!s || s.panels.length < 2) return e;
  if (_e(e, t)?.node === s) {
    const o = gn(e, t);
    return o === e ? e : he(o);
  }
  const r = Kn(e, t, (o) => ({
    ...Tn(ra(o.panels.map(Fn), ze(o), n)),
    ...me(o)
  }));
  return r ? he(r) : e;
}
function ra(e, t, n) {
  return t ? e.map((s, a) => ({ ...t[a], node: s })) : Ln(e, n).frames;
}
function la(e, t) {
  return { ...Tn(ra(e.children, ze(e), t)), ...me(e) };
}
function yu(e, t, n) {
  const s = Dt(
    e,
    t,
    (a) => G(a) ? a : la(a, n)
  );
  return s ? he(s) : K(e) && Se(e, t) ? Ln([e], n) : e;
}
function nc(e, t) {
  const n = (a) => t === "column" ? a.rect.y : a.rect.x, s = (a) => t === "column" ? a.rect.x : a.rect.y;
  return [...e].sort((a, r) => n(a) - n(r) || s(a) - s(r));
}
function oa(e, t) {
  const n = nc(e.frames, t);
  return {
    kind: "split",
    direction: t,
    children: n.map((s) => s.node),
    ...me(e),
    places: n.map(({ node: s, ...a }) => a)
  };
}
function wu(e, t, n = "row") {
  const s = Dt(
    e,
    t,
    (a) => G(a) ? oa(a, n) : a
  );
  return s ? he(s) : e;
}
function ia(e) {
  if (G(e)) return null;
  const t = K(e) ? e.panels.length === 1 ? e.panels[0] : void 0 : e.children.length === 1 ? e.children[0] : void 0;
  return t === void 0 || ie(t) || K(t) && t.panels.length === 1 && ie(t.panels[0]) ? null : t;
}
const sc = (e) => {
  const { title: t, fixedView: n, headless: s, ...a } = e;
  return a;
};
function ac(e, t) {
  const n = ia(e);
  return n ? t === "inner" ? n : { ...sc(n), ...me(e) } : e;
}
function gt(e) {
  return e.title ? e.title : K(e) ? "" : G(e) ? "Desktop" : e.direction === "row" ? "Row" : "Column";
}
function Pt(e, t) {
  if (K(e)) {
    const s = e.panels[ut(e)];
    return s === void 0 ? "" : ie(s) ? t(s) ?? s : gt(s) || Pt(s, t);
  }
  if (e.title) return e.title;
  if (G(e)) {
    const s = e.frames[e.frames.length - 1];
    return s ? s.title ?? Pt(s.node, t) : "";
  }
  const n = e.children[0];
  return n ? Pt(n, t) : "";
}
function Qe(e, t) {
  let n = e;
  for (const s of t) {
    if (!n) return null;
    if (wt(n)) n = n.children[s];
    else if (G(n)) n = n.frames[s]?.node;
    else {
      const a = n.panels[s];
      n = a === void 0 || ie(a) ? void 0 : a;
    }
  }
  return n ?? null;
}
function ot(e, t, n) {
  if (t.length === 0) return n;
  const [s, ...a] = t;
  if (s === void 0) return e;
  if (G(e)) {
    const l = e.frames[s];
    if (!l) return e;
    const f = ot(l.node, a, n);
    if (f === l.node) return e;
    const u = [...e.frames];
    return u[s] = { ...l, node: f }, { ...e, frames: u };
  }
  if (K(e)) {
    const l = e.panels[s];
    if (l === void 0 || ie(l)) return e;
    const f = ot(l, a, n);
    if (f === l) return e;
    const u = [...e.panels];
    return u[s] = f, { ...e, panels: u };
  }
  const r = e.children[s];
  if (!r) return e;
  const o = ot(r, a, n);
  if (o === r) return e;
  const c = [...e.children];
  return c[s] = o, { ...e, children: c };
}
function Wt(e, t, n) {
  if (t.length === 0)
    return wt(e) ? { ...e, sizes: On(e.children.length, n) } : e;
  const [s, ...a] = t;
  if (s === void 0) return e;
  if (G(e)) {
    const c = e.frames[s];
    if (!c) return e;
    const l = Wt(c.node, a, n);
    if (l === c.node) return e;
    const f = [...e.frames];
    return f[s] = { ...c, node: l }, { ...e, frames: f };
  }
  if (K(e)) {
    const c = e.panels[s];
    if (c === void 0 || ie(c)) return e;
    const l = Wt(c, a, n);
    if (l === c) return e;
    const f = [...e.panels];
    return f[s] = l, { ...e, panels: f };
  }
  const r = e.children[s];
  if (!r) return e;
  const o = [...e.children];
  return o[s] = Wt(r, a, n), { ...e, children: o };
}
function fs(e, t, n, s = 0.02) {
  const a = e[t], r = e[t + 1];
  if (a === void 0 || r === void 0) return e;
  const o = a + r;
  if (o < s * 2) return e;
  const c = [...e], l = Math.min(Math.max(a + n, s), o - s);
  return c[t] = l, c[t + 1] = o - l, c;
}
function Qt(e) {
  if (!K(e) || e.panels.length >= 2) return e;
  const t = e.panels[0];
  return t !== void 0 && !ie(t) ? e : { ...In([rc(e)]), ...me(e) };
}
const rc = (e) => {
  if (!e.title) return e;
  const { title: t, ...n } = e;
  return n;
};
function ps(e) {
  return e.length === 0 ? null : In(e.map(Te));
}
function lc(e, t) {
  if (!e) return ps(t);
  const n = new Set(t), s = /* @__PURE__ */ new Set(), a = /* @__PURE__ */ new Set();
  for (const l of We(e))
    !n.has(l) || s.has(l) ? a.add(l) : s.add(l);
  let r = e;
  for (const l of a)
    r = r ? lt(r, l) : null;
  const o = new Set(r ? We(r) : []), c = t.filter((l) => !o.has(l));
  if (c.length === 0) return r ? Qt(he(r)) : null;
  if (!r) return ps(c);
  if (G(r)) {
    const l = r.frames.length;
    return {
      ...r,
      frames: [
        ...r.frames,
        ...c.map(
          (f, u) => Zt(Te(f), {
            x: rt.x + (l + u) * jt,
            y: rt.y + (l + u) * jt
          })
        )
      ]
    };
  }
  return Qt(he(In([r, ...c.map(Te)])));
}
const qn = Symbol("dc.windowContext");
function oc(e) {
  return yn(qn, e), e;
}
function Bn() {
  const e = _t(qn, null);
  if (!e)
    throw new Error(
      "[header-content-layout] No window context found. Render this component inside <WindowFrame>."
    );
  return e;
}
const ic = ["data-dc-glyph"], cc = { class: "dc-glyph__line" }, uc = ["d"], dc = {
  key: 0,
  class: "dc-glyph__aqua"
}, fc = ["d"], pc = /* @__PURE__ */ ce({
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
    return (s, a) => (m(), _("svg", {
      class: "dc-glyph",
      "data-dc-glyph": e.kind,
      viewBox: "0 0 10 10",
      "aria-hidden": "true",
      focusable: "false"
    }, [
      v("g", cc, [
        (m(!0), _(ae, null, ve(t[e.kind], (r) => (m(), _("path", {
          key: r,
          d: r
        }, null, 8, uc))), 128))
      ]),
      n[e.kind] ? (m(), _("g", dc, [
        (m(!0), _(ae, null, ve(n[e.kind], (r) => (m(), _("path", {
          key: r,
          d: r
        }, null, 8, fc))), 128))
      ])) : N("", !0)
    ], 8, ic));
  }
}), ht = /* @__PURE__ */ ue(pc, [["__scopeId", "data-v-4d2872c0"]]), vc = ["data-dc-order", "data-dc-path", "data-dc-maximized", "data-dc-minimized", "data-dc-dragging"], mc = ["data-dc-movable"], hc = { class: "dc-float__title dc-truncate" }, _c = {
  key: 1,
  class: "dc-float__controls dc-controls"
}, gc = ["aria-label", "aria-pressed", "data-dc-minimize"], yc = ["aria-label", "aria-pressed", "data-dc-maximize"], wc = ["aria-label", "data-dc-close"], bc = { class: "dc-float__content" }, kc = ["data-dc-handle", "onPointerdown"], $c = /* @__PURE__ */ ce({
  __name: "WindowFloat",
  props: {
    frame: {},
    path: {},
    order: {},
    place: {}
  },
  setup(e) {
    const t = e, n = Bn(), s = g(() => be(t.frame.node)), a = g(() => n.panelFor(s.value)?.fixed === !0), r = g(() => je(t.frame)), o = g(() => st(t.frame)), c = g(() => r.value || o.value), l = g(() => n.resizable.value && !a.value && !c.value), f = g(() => n.movable.value && !a.value && !c.value), u = g(() => {
      const F = We(t.frame.node);
      return F.length === 1 ? F[0] ?? null : null;
    }), w = g(() => u.value !== null && n.closable(u.value)), y = g(() => t.frame.node.headless === !0), h = g(
      () => !y.value && (!K(t.frame.node) || o.value)
    ), $ = g(
      () => t.frame.title || gt(t.frame.node) || Pt(t.frame.node, (F) => n.panelFor(F)?.title)
    ), M = g(() => n.spaceMenu(t.path));
    function k(F) {
      F.target?.closest("button, a, input, select, textarea, label") || n.beginFrameDragAt(t.path, F, "move");
    }
    function E(F) {
      F.target?.closest("button, a, input, select, textarea, label") || (o.value ? n.toggleMinimizeAt(t.path) : n.toggleMaximizeAt(t.path));
    }
    const L = g(() => {
      const F = n.framing.value;
      return F !== null && ee(t.frame.node, F);
    }), B = g(() => ({
      // Neither maximizing nor rolling up overwrites the rect: it is where the
      // window goes back to, and both are a way of not being there for a while.
      ...r.value ? { inset: "0" } : o.value && t.place ? {
        left: `${t.place.x}px`,
        bottom: `${t.place.bottom}px`,
        width: `${vn}px`,
        height: `${Xs}px`
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
    return (F, V) => (m(), _("div", {
      class: "dc-float",
      style: Le(B.value),
      "data-dc-order": e.order,
      "data-dc-path": e.path.join("/"),
      "data-dc-maximized": r.value ? "true" : "false",
      "data-dc-minimized": o.value ? "true" : "false",
      "data-dc-dragging": L.value ? "true" : "false",
      onPointerdown: V[3] || (V[3] = (b) => C(n).raiseAt(e.path))
    }, [
      h.value ? (m(), _("header", {
        key: 0,
        class: "dc-float__bar",
        "data-dc-movable": f.value ? "true" : "false",
        onPointerdown: k,
        onDblclick: E
      }, [
        v("span", hc, S($.value), 1),
        M.value.length ? (m(), ge(Rn, {
          key: 0,
          items: M.value,
          label: `${$.value} menu`
        }, null, 8, ["items", "label"])) : N("", !0),
        !a.value || o.value && w.value && u.value ? (m(), _("div", _c, [
          a.value ? N("", !0) : (m(), _("button", {
            key: 0,
            type: "button",
            class: "dc-float__button dc-control",
            "aria-label": `${o.value ? "Unroll" : "Minimize"} ${$.value}`,
            "aria-pressed": o.value,
            "data-dc-minimize": s.value,
            onClick: V[0] || (V[0] = (b) => C(n).toggleMinimizeAt(e.path))
          }, [
            J(ht, {
              kind: o.value ? "unroll" : "minimize"
            }, null, 8, ["kind"])
          ], 8, gc)),
          a.value ? N("", !0) : (m(), _("button", {
            key: 1,
            type: "button",
            class: "dc-float__button dc-control",
            "aria-label": `${r.value ? "Restore" : "Maximize"} ${$.value}`,
            "aria-pressed": r.value,
            "data-dc-maximize": s.value,
            onClick: V[1] || (V[1] = (b) => C(n).toggleMaximizeAt(e.path))
          }, [
            J(ht, {
              kind: r.value ? "restore" : "maximize"
            }, null, 8, ["kind"])
          ], 8, yc)),
          o.value && w.value && u.value ? (m(), _("button", {
            key: 2,
            type: "button",
            class: "dc-float__button dc-control",
            "aria-label": `Close ${$.value}`,
            "data-dc-close": u.value,
            onClick: V[2] || (V[2] = (b) => C(n).close(u.value))
          }, [
            J(ht, { kind: "close" })
          ], 8, wc)) : N("", !0)
        ])) : N("", !0)
      ], 40, mc)) : N("", !0),
      v("div", bc, [
        Ke(F.$slots, "default", {}, void 0, !0)
      ]),
      (m(!0), _(ae, null, ve(l.value ? I : [], (b) => (m(), _("span", {
        key: b,
        class: "dc-float__grip",
        "data-dc-handle": b,
        "aria-hidden": "true",
        onPointerdown: Fe((A) => C(n).beginFrameDragAt(e.path, A, b), ["stop"])
      }, null, 40, kc))), 128))
    ], 44, vc));
  }
}), xc = /* @__PURE__ */ ue($c, [["__scopeId", "data-v-f035684c"]]), Wn = Symbol("dc.paneContext");
function Mc(e) {
  return yn(Wn, e), e;
}
function bu() {
  return _t(Wn, null);
}
function ku(e) {
  const t = _t(qn, null), n = _t(Wn, null);
  if (!t || !n) return () => {
  };
  const s = t.registerMenu(
    () => n.panel.value,
    () => xt(e)
  );
  return za() && Ra(s), s;
}
const Cc = ["data-dc-panel", "data-dc-panels", "data-dc-tabbed", "data-dc-floating", "data-dc-maximized", "data-dc-headless", "data-dc-active", "data-dc-dragging", "aria-label"], Ec = ["data-dc-movable"], Sc = ["aria-label", "aria-pressed"], Pc = ["data-dc-space-name"], Ac = { class: "dc-truncate" }, zc = ["aria-label"], Rc = {
  key: 0,
  class: "dc-pane__insert",
  "aria-hidden": "true"
}, Fc = ["id", "data-dc-panel", "data-dc-space", "aria-selected", "aria-controls", "tabindex", "onPointerdown", "onClick", "onKeydown"], Tc = { class: "dc-tab__name dc-truncate" }, Lc = {
  key: 0,
  class: "dc-pane__sub dc-mono dc-truncate"
}, Dc = ["aria-label", "data-dc-close", "onClick"], Ic = {
  key: 0,
  class: "dc-pane__insert",
  "aria-hidden": "true"
}, Nc = { class: "dc-pane__tools" }, Vc = {
  key: 2,
  class: "dc-pane__controls dc-controls"
}, Oc = ["aria-label", "data-dc-minimize"], Kc = ["aria-label", "aria-pressed", "data-dc-maximize"], qc = ["aria-label", "data-dc-close"], Bc = ["id", "role", "aria-labelledby"], Wc = ["id", "role", "aria-labelledby"], Uc = ["data-dc-edge"], Hc = /* @__PURE__ */ ce({
  __name: "WindowPane",
  props: {
    group: {},
    path: {}
  },
  setup(e) {
    const t = e, n = Bn(), s = ms() ?? "dc-pane", a = g(
      () => t.group.panels.flatMap((R, O) => {
        if (!ie(R)) {
          const $e = gt(R) || Pt(R, (ye) => n.panelFor(ye)?.title);
          return [{ kind: "space", index: O, id: `space-${O}`, title: $e, node: R }];
        }
        const Y = n.panelFor(R);
        return Y ? [{ kind: "panel", index: O, id: R, title: Y.title, panel: Y }] : [];
      })
    ), r = g(() => a.value.length > 1), o = g(() => {
      const R = ut(t.group);
      return a.value.find((O) => O.index === R) ?? a.value[0] ?? null;
    }), c = g(() => o.value?.kind === "space" ? o.value.node : null), l = g(() => c.value ? "" : js(t.group)), f = g(() => c.value ? null : n.panelFor(l.value)), u = g(() => o.value?.title ?? ""), w = g(() => n.spaceNames.value ? t.group.title ?? "" : ""), y = g(() => [...t.path, o.value?.index ?? 0]), h = g(() => l.value || ls(t.group)[0] || ""), $ = g(() => n.viewFor(l.value)), M = g(() => t.group.headless === !0), k = g(() => n.focused.value === l.value), E = g(() => n.dragging.value === l.value), L = g(() => n.moving.value === l.value), B = g(() => n.frameOf(h.value) !== null), I = g(() => n.panelFor(h.value)?.fixed === !0), F = g(
      () => !c.value && (n.canMove(l.value) || B.value && n.movable.value && !I.value)
    ), V = g(
      () => c.value ? n.spaceMenu(y.value) : n.menuFor(l.value)
    ), b = (R) => n.closable(R);
    Mc({ panel: l });
    const A = g(() => n.maximized(h.value)), Z = g(
      () => B.value && !I.value || !r.value && !!f.value && b(f.value.id)
    ), oe = (R) => `${s}-tab-${R}`, fe = g(() => `${s}-body`), j = g(() => {
      const R = n.dropTarget.value;
      return !R || !Se(t.group, R.panel) || R.edge === "float" ? null : R;
    }), Me = g(() => j.value?.index === void 0 ? j.value?.edge ?? null : null), Pe = g(() => j.value?.index ?? null), T = () => f.value ? n.renderContent(f.value, $.value, k.value) ?? null : null, X = () => f.value ? n.renderActions(f.value, $.value, k.value) ?? null : null;
    let te = null;
    function ne(R) {
      const O = te !== null && Math.hypot(R.clientX - te.x, R.clientY - te.y) >= 4;
      return te = null, O;
    }
    const pe = (R) => R.kind === "panel" ? R.id : be(R.node);
    function Ce(R, O) {
      O.kind !== "space" && (n.focus(O.id), te = { x: R.clientX, y: R.clientY }, n.beginDrag(O.id, R));
    }
    function Ue(R, O) {
      if (ne(R)) return;
      const Y = pe(O);
      Y && n.selectPanel(Y);
    }
    function He(R) {
      l.value && n.focus(l.value), !R.target?.closest(".dc-tab, button, a, input, select, textarea, label") && (B.value ? n.beginFrameDrag(h.value, R, "move") : n.beginDrag(l.value, R));
    }
    function Ge(R) {
      te = { x: R.clientX, y: R.clientY }, n.beginDrag(l.value, R);
    }
    function Xe(R) {
      ne(R) || n.toggleMoveMode(l.value);
    }
    const De = {
      ArrowLeft: "left",
      ArrowRight: "right",
      ArrowUp: "up",
      ArrowDown: "down"
    };
    function Ie(R) {
      if (!L.value) return;
      if (R.key === "Escape") {
        R.preventDefault(), n.toggleMoveMode(l.value);
        return;
      }
      const O = De[R.key];
      O && (R.preventDefault(), B.value ? n.nudgeFrame(l.value, O, R.shiftKey) : n.nudge(l.value, O, R.shiftKey));
    }
    function Ne(R) {
      !B.value || R.target?.closest(".dc-tab, button, a, input, select, textarea, label") || n.toggleMaximize(h.value);
    }
    function bt(R, O) {
      R.stopPropagation(), te = null, n.close(O);
    }
    function It(R, O) {
      const Y = a.value.length;
      let $e = null;
      if (R.key === "ArrowRight" ? $e = (O + 1) % Y : R.key === "ArrowLeft" ? $e = (O - 1 + Y) % Y : R.key === "Home" ? $e = 0 : R.key === "End" && ($e = Y - 1), $e === null) return;
      R.preventDefault();
      const ye = a.value[$e];
      if (!ye) return;
      const kt = pe(ye);
      kt && n.selectPanel(kt);
    }
    return (R, O) => o.value ? (m(), _("section", {
      key: 0,
      class: "dc-pane",
      "data-dc-panel": l.value || void 0,
      "data-dc-panels": C(ls)(e.group).join(" ") || void 0,
      "data-dc-tabbed": r.value ? "true" : "false",
      "data-dc-floating": B.value ? "true" : "false",
      "data-dc-maximized": A.value ? "true" : "false",
      "data-dc-headless": M.value ? "true" : "false",
      "data-dc-active": k.value ? "true" : "false",
      "data-dc-dragging": E.value ? "true" : "false",
      "aria-label": u.value,
      onFocusin: O[7] || (O[7] = (Y) => l.value && C(n).focus(l.value))
    }, [
      M.value ? N("", !0) : (m(), _("header", {
        key: 0,
        class: "dc-pane__head",
        "data-dc-movable": F.value ? "true" : "false",
        onPointerdown: He,
        onDblclick: Ne
      }, [
        F.value ? (m(), _("button", {
          key: 0,
          type: "button",
          class: "dc-pane__grip",
          "aria-label": `Move ${u.value}`,
          "aria-pressed": L.value,
          onPointerdown: Ge,
          onClick: Xe,
          onKeydown: Ie
        }, [...O[8] || (O[8] = [
          v("span", { "aria-hidden": "true" }, "⠿", -1)
        ])], 40, Sc)) : N("", !0),
        w.value ? (m(), _("span", {
          key: 1,
          class: "dc-pane__name",
          "data-dc-space-name": w.value
        }, [
          v("span", Ac, S(w.value), 1)
        ], 8, Pc)) : N("", !0),
        v("div", {
          class: "dc-pane__tabs",
          role: "tablist",
          "aria-label": `${u.value} panels`
        }, [
          (m(!0), _(ae, null, ve(a.value, (Y, $e) => (m(), _(ae, {
            key: Y.id
          }, [
            Pe.value === $e ? (m(), _("span", Rc)) : N("", !0),
            v("button", {
              id: oe(Y.id),
              type: "button",
              role: "tab",
              class: "dc-tab",
              "data-dc-panel": Y.kind === "panel" ? Y.id : void 0,
              "data-dc-space": Y.kind === "space" ? Y.title : void 0,
              "aria-selected": Y.index === o.value.index,
              "aria-controls": fe.value,
              tabindex: Y.index === o.value.index ? 0 : -1,
              onPointerdown: (ye) => Ce(ye, Y),
              onClick: (ye) => Ue(ye, Y),
              onKeydown: (ye) => It(ye, $e)
            }, [
              v("span", Tc, S(Y.title), 1),
              Y.kind === "panel" && Y.panel.subtitle ? (m(), _("span", Lc, S(Y.panel.subtitle), 1)) : N("", !0),
              r.value && Y.kind === "panel" && b(Y.id) ? (m(), _("span", {
                key: 1,
                class: "dc-tab__close",
                role: "button",
                tabindex: "-1",
                "aria-label": `Close ${Y.title}`,
                "data-dc-close": Y.id,
                onPointerdown: O[0] || (O[0] = Fe(() => {
                }, ["stop"])),
                onClick: (ye) => bt(ye, Y.id)
              }, [...O[9] || (O[9] = [
                v("span", { "aria-hidden": "true" }, "×", -1)
              ])], 40, Dc)) : N("", !0)
            ], 40, Fc)
          ], 64))), 128)),
          Pe.value === a.value.length ? (m(), _("span", Ic)) : N("", !0)
        ], 8, zc),
        v("div", Nc, [
          J(X),
          V.value.length ? (m(), ge(Rn, {
            key: 0,
            items: V.value,
            label: `${u.value} menu`
          }, null, 8, ["items", "label"])) : N("", !0)
        ]),
        Z.value ? (m(), _("div", Vc, [
          B.value && !I.value ? (m(), _("button", {
            key: 0,
            type: "button",
            class: "dc-pane__button dc-control",
            "aria-label": `Minimize ${u.value}`,
            "data-dc-minimize": h.value,
            onPointerdown: O[1] || (O[1] = Fe(() => {
            }, ["stop"])),
            onClick: O[2] || (O[2] = (Y) => C(n).toggleMinimize(h.value))
          }, [
            J(ht, { kind: "minimize" })
          ], 40, Oc)) : N("", !0),
          B.value && !I.value ? (m(), _("button", {
            key: 1,
            type: "button",
            class: "dc-pane__button dc-control",
            "aria-label": `${A.value ? "Restore" : "Maximize"} ${u.value}`,
            "aria-pressed": A.value,
            "data-dc-maximize": h.value,
            onPointerdown: O[3] || (O[3] = Fe(() => {
            }, ["stop"])),
            onClick: O[4] || (O[4] = (Y) => C(n).toggleMaximize(h.value))
          }, [
            J(ht, {
              kind: A.value ? "restore" : "maximize"
            }, null, 8, ["kind"])
          ], 40, Kc)) : N("", !0),
          !r.value && f.value && b(f.value.id) ? (m(), _("button", {
            key: 2,
            type: "button",
            class: "dc-pane__close dc-control",
            "aria-label": `Close ${u.value}`,
            "data-dc-close": f.value.id,
            onPointerdown: O[5] || (O[5] = Fe(() => {
            }, ["stop"])),
            onClick: O[6] || (O[6] = (Y) => C(n).close(f.value.id))
          }, [
            J(ht, { kind: "close" })
          ], 40, qc)) : N("", !0)
        ])) : N("", !0)
      ], 40, Ec)),
      c.value ? (m(), _("div", {
        key: 1,
        id: fe.value,
        class: "dc-pane__space",
        role: M.value ? void 0 : "tabpanel",
        "aria-labelledby": M.value ? void 0 : oe(o.value.id)
      }, [
        Ke(R.$slots, "space", {
          node: c.value,
          path: y.value
        }, void 0, !0)
      ], 8, Bc)) : (m(), _("div", {
        key: 2,
        id: fe.value,
        class: "dc-pane__body",
        role: M.value ? void 0 : "tabpanel",
        "aria-labelledby": M.value ? void 0 : oe(l.value)
      }, [
        J(T)
      ], 8, Wc)),
      Me.value ? (m(), _("div", {
        key: 3,
        class: "dc-pane__drop",
        "data-dc-edge": Me.value,
        "aria-hidden": "true"
      }, null, 8, Uc)) : N("", !0)
    ], 40, Cc)) : N("", !0);
  }
}), ca = /* @__PURE__ */ ue(Hc, [["__scopeId", "data-v-44fd2b2d"]]), Gc = ["data-dc-space", "data-dc-path", "aria-label"], Xc = {
  key: 0,
  class: "dc-space__head"
}, Yc = { class: "dc-space__title dc-truncate" }, jc = ["data-dc-direction"], Qc = {
  key: 0,
  class: "dc-space__drop",
  "aria-hidden": "true"
}, Zc = ["aria-orientation", "aria-label", "aria-valuenow", "aria-disabled", "tabindex", "onPointerdown", "onKeydown"], Jc = /* @__PURE__ */ ce({
  __name: "WindowNode",
  props: {
    node: {},
    path: {},
    framed: { type: Boolean }
  },
  setup(e) {
    const t = e, n = Bn(), s = W(null), a = g(() => K(t.node) ? t.node : null), r = g(() => wt(t.node) ? t.node : null), o = g(() => G(t.node) ? t.node : null), c = g(
      () => r.value ? r.value.children : o.value?.frames.map((T) => T.node) ?? []
    ), l = g(() => r.value ? Be(r.value) : []), f = g(
      () => (o.value?.frames ?? []).map((T, X) => ({
        held: T,
        /** Place in the stack, counted from the back — what `z-index` follows. */
        order: X,
        key: b(T.node),
        path: [...t.path, X]
      })).sort((T, X) => T.key < X.key ? -1 : T.key > X.key ? 1 : 0)
    ), u = g(() => gt(t.node)), w = g(() => n.spaceMenu(t.path)), y = g(() => t.node.headless === !0), h = g(() => o.value ? "desktop" : r.value?.direction ?? ""), $ = W(null), M = W(0);
    let k = null;
    xe(
      $,
      (T) => {
        k?.disconnect(), k = null, !(!T || typeof ResizeObserver > "u") && (M.value = T.clientWidth, k = new ResizeObserver(([X]) => {
          M.value = X?.contentRect.width ?? 0;
        }), k.observe(T));
      },
      { immediate: !0 }
    ), Ze(() => k?.disconnect());
    const E = g(() => {
      const T = Math.max(
        1,
        Math.floor((M.value + dt) / (vn + dt))
      ), X = /* @__PURE__ */ new Map();
      let te = 0;
      for (const ne of f.value)
        ne.held.minimized === !0 && (X.set(ne.key, {
          x: dt + te % T * (vn + dt),
          bottom: dt + Math.floor(te / T) * (Xs + dt)
        }), te += 1);
      return X;
    }), L = (T) => !!T && T.join("/") === t.path.join("/"), B = g(() => {
      const T = n.dropTarget.value, X = o.value;
      if (!X || !T?.rect || T.edge !== "float") return null;
      if (T.space) return L(T.space) ? T.rect : null;
      const te = _e(X, T.panel);
      return te && X.frames.includes(te) ? T.rect : null;
    }), I = g(() => {
      const T = n.dropTarget.value;
      return !!T && !T.rect && L(T.space);
    }), F = g(() => r.value?.direction === "row"), V = g(() => c.value.map((T, X) => [...t.path, X])), b = (T) => [...We(T)].sort().join("/"), A = (T) => {
      const X = We(T)[0];
      return (X ? n.panelFor(X)?.title : null) ?? X ?? "panel";
    }, Z = (T) => {
      const X = c.value[T], te = c.value[T + 1];
      return !X || !te ? "Resize panels" : `Resize ${A(X)} and ${A(te)}`;
    }, oe = (T) => {
      const X = l.value[T] ?? 0, te = l.value[T + 1] ?? 0, ne = X + te;
      return ne > 0 ? Math.round(X / ne * 100) : 50;
    };
    function fe() {
      const T = s.value, X = T ? F.value ? T.clientWidth : T.clientHeight : 0;
      return X <= 0 ? 0.05 : Math.min(n.minPanelSize.value / X, 0.4);
    }
    let j = null;
    function Me(T, X) {
      const te = r.value, ne = s.value;
      if (!n.resizable.value || !te || !ne || T.button !== 0) return;
      const pe = F.value ? ne.clientWidth : ne.clientHeight;
      if (pe <= 0) return;
      const Ce = F.value ? T.clientX : T.clientY, Ue = Be(te), He = Math.min(n.minPanelSize.value / pe, 0.4);
      T.preventDefault();
      const Ge = (Ie) => {
        const Ne = ((F.value ? Ie.clientX : Ie.clientY) - Ce) / pe;
        n.setSizes(t.path, fs(Ue, X, Ne, He));
      }, Xe = () => j?.(), De = (Ie) => {
        Ie.key === "Escape" && (n.setSizes(t.path, Ue), j?.());
      };
      j = () => {
        window.removeEventListener("pointermove", Ge), window.removeEventListener("pointerup", Xe), window.removeEventListener("pointercancel", Xe), window.removeEventListener("keydown", De), j = null;
      }, window.addEventListener("pointermove", Ge), window.addEventListener("pointerup", Xe), window.addEventListener("pointercancel", Xe), window.addEventListener("keydown", De);
    }
    Ze(() => j?.());
    function Pe(T, X) {
      const te = r.value;
      if (!n.resizable.value || !te) return;
      const ne = F.value ? "ArrowRight" : "ArrowDown", pe = F.value ? "ArrowLeft" : "ArrowUp", Ce = T.shiftKey ? 0.1 : 0.02;
      if (T.key !== ne && T.key !== pe) return;
      const Ue = T.key === ne ? Ce : -Ce;
      T.preventDefault(), n.setSizes(t.path, fs(Be(te), X, Ue, fe()));
    }
    return (T, X) => {
      const te = hs("WindowNode", !0);
      return a.value ? (m(), ge(ca, {
        key: 0,
        group: a.value,
        path: e.path
      }, {
        space: it(({ node: ne, path: pe }) => [
          J(te, {
            node: ne,
            path: pe,
            framed: ""
          }, null, 8, ["node", "path"])
        ]),
        _: 1
      }, 8, ["group", "path"])) : (m(), _("section", {
        key: 1,
        class: "dc-space",
        "data-dc-space": h.value,
        "data-dc-path": e.path.join("/"),
        "aria-label": u.value
      }, [
        !e.framed && !y.value ? (m(), _("header", Xc, [
          v("span", Yc, S(u.value), 1),
          w.value.length ? (m(), ge(Rn, {
            key: 0,
            items: w.value,
            label: `${u.value} menu`
          }, null, 8, ["items", "label"])) : N("", !0)
        ])) : N("", !0),
        o.value ? (m(), _("div", {
          key: 1,
          ref_key: "desktop",
          ref: $,
          class: "dc-window__desktop"
        }, [
          B.value ? (m(), _("div", {
            key: 0,
            class: "dc-window__drop",
            style: Le({
              left: `${B.value.x}px`,
              top: `${B.value.y}px`,
              width: `${B.value.w}px`,
              height: `${B.value.h}px`
            }),
            "aria-hidden": "true"
          }, null, 4)) : N("", !0),
          (m(!0), _(ae, null, ve(f.value, (ne) => (m(), ge(xc, {
            key: ne.key,
            frame: ne.held,
            path: ne.path,
            order: ne.order,
            place: E.value.get(ne.key) ?? null
          }, {
            default: it(() => [
              J(te, {
                node: ne.held.node,
                path: ne.path,
                framed: ne.held.node.kind !== "group"
              }, null, 8, ["node", "path", "framed"])
            ]),
            _: 2
          }, 1032, ["frame", "path", "order", "place"]))), 128))
        ], 512)) : r.value ? (m(), _("div", {
          key: 2,
          ref_key: "container",
          ref: s,
          class: "dc-window__split",
          "data-dc-direction": r.value.direction
        }, [
          I.value ? (m(), _("div", Qc)) : N("", !0),
          (m(!0), _(ae, null, ve(c.value, (ne, pe) => (m(), _(ae, {
            key: b(ne)
          }, [
            v("div", {
              class: "dc-window__cell",
              style: Le({ flexGrow: l.value[pe] ?? 1 })
            }, [
              J(te, {
                node: ne,
                path: V.value[pe] ?? []
              }, null, 8, ["node", "path"])
            ], 4),
            pe < c.value.length - 1 ? (m(), _("div", {
              key: 0,
              class: "dc-window__gutter",
              role: "separator",
              "aria-orientation": F.value ? "vertical" : "horizontal",
              "aria-label": Z(pe),
              "aria-valuenow": oe(pe),
              "aria-valuemin": "0",
              "aria-valuemax": "100",
              "aria-disabled": C(n).resizable.value ? void 0 : "true",
              tabindex: C(n).resizable.value ? 0 : -1,
              onPointerdown: (Ce) => Me(Ce, pe),
              onKeydown: (Ce) => Pe(Ce, pe)
            }, null, 40, Zc)) : N("", !0)
          ], 64))), 128))
        ], 8, jc)) : N("", !0)
      ], 8, Gc));
    };
  }
}), eu = /* @__PURE__ */ ue(Jc, [["__scopeId", "data-v-fb5b403f"]]), tu = ["data-dc-theme", "data-dc-dragging", "data-dc-docking"], nu = {
  key: 1,
  class: "dc-window__empty"
}, su = {
  class: "dc-window__live",
  "aria-live": "polite",
  role: "status"
}, Kt = 16, au = /* @__PURE__ */ ce({
  __name: "WindowFrame",
  props: /* @__PURE__ */ Xt({
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
  emits: /* @__PURE__ */ Xt(["panel-move", "view-change", "panel-activate", "tab-select", "frame-change", "frame-maximize", "frame-minimize", "panel-close"], ["update:layout", "update:views"]),
  setup(e, { expose: t, emit: n }) {
    const s = e, a = n, r = Gt(e, "layout"), o = Gt(e, "views"), c = wn(), l = g(() => new Map(s.panels.map((i) => [i.id, i]))), f = g(() => s.panels.map((i) => i.id)), u = g(() => lc(r.value, f.value)), w = W(null), y = W(null), h = W(null), $ = W(!0), M = W(null), k = W(null), E = W(null), L = W(""), B = W(null);
    function I() {
      const i = B.value;
      return i ? [...i.querySelectorAll(".dc-pane[data-dc-panels]")].filter((p) => p.closest(".dc-window") === i).map((p) => ({ panels: (p.dataset.dcPanels ?? "").split(" "), element: p })) : [];
    }
    function F(i) {
      const d = [];
      let p = i.closest(".dc-float");
      for (; p; )
        d.unshift(Number(p.dataset.dcOrder ?? 0)), p = p.parentElement?.closest(".dc-float") ?? null;
      return d;
    }
    function V() {
      return I().map((i) => ({ pane: i, order: F(i.element) })).sort((i, d) => {
        const p = Math.max(i.order.length, d.order.length);
        for (let x = 0; x < p; x += 1) {
          const P = (i.order[x] ?? -1) - (d.order[x] ?? -1);
          if (P !== 0) return P;
        }
        return 0;
      }).map((i) => i.pane);
    }
    const b = (i) => I().find((d) => d.panels.includes(i)) ?? null;
    function A(i) {
      const d = l.value.get(i);
      if (!d) return "";
      const p = o.value[i];
      return p && d.views?.some((x) => x.key === p) ? p : d.defaultView ?? d.views?.[0]?.key ?? "";
    }
    function Z(i, d) {
      o.value = { ...o.value, [i]: d }, a("view-change", { panel: i, view: d });
    }
    const oe = g(
      () => s.panels.filter((i) => i.fixed !== !0).length
    );
    function fe(i) {
      return !s.movable || oe.value < 1 || s.panels.length < 2 ? !1 : l.value.get(i)?.fixed !== !0;
    }
    function j(i, d) {
      const p = u.value;
      !i || !p || i === p || (r.value = i, d && a("panel-move", d));
    }
    function Me(i, d, p) {
      if (i.width <= 0 || i.height <= 0) return "center";
      const x = (d - i.left) / i.width, P = (p - i.top) / i.height, z = 0.3;
      return x > z && x < 1 - z && P > z && P < 1 - z ? "center" : [
        { edge: "left", distance: x },
        { edge: "right", distance: 1 - x },
        { edge: "top", distance: P },
        { edge: "bottom", distance: 1 - P }
      ].reduce(
        (Q, D) => D.distance < Q.distance ? D : Q
      ).edge;
    }
    function Pe(i, d) {
      const p = [...i.querySelectorAll(".dc-tab")], x = p.findIndex((P) => {
        const z = P.getBoundingClientRect();
        return d < z.left + z.width / 2;
      });
      return x === -1 ? p.length : x;
    }
    function T(i, d, p) {
      for (const { panels: x, element: P } of V().reverse()) {
        const z = P.getBoundingClientRect();
        if (i < z.left || i > z.right || d < z.top || d > z.bottom) continue;
        const re = x.find((U) => U !== p), Q = P.querySelector(".dc-pane__tabs"), D = Q?.getBoundingClientRect();
        if (Q && D && d >= D.top && d <= D.bottom)
          return re ? { panel: re, edge: "center", index: Pe(Q, i) } : null;
        const q = P.querySelector(":scope > .dc-pane__space");
        if (q) {
          const U = q.getBoundingClientRect();
          if (i >= U.left && i <= U.right && d >= U.top && d <= U.bottom) continue;
        }
        return re ? { panel: re, edge: Me(z, i, d) } : null;
      }
      return te(i, d, p) ?? Ce(i, d);
    }
    function X() {
      const i = B.value;
      return i ? [...i.querySelectorAll(".dc-window__desktop")].filter((d) => d.closest(".dc-window") === i).reverse() : [];
    }
    function te(i, d, p) {
      const x = u.value;
      if (!x) return null;
      for (const P of X()) {
        const z = P.getBoundingClientRect();
        if (i < z.left || i > z.right || d < z.top || d > z.bottom) continue;
        const re = Ue(P), Q = re.flatMap((se) => se.panels).find((se) => se !== p);
        if (!Q && re.length > 0) return null;
        const D = _e(x, p)?.rect, q = an(
          {
            x: i - z.left - 24,
            y: d - z.top - 12,
            w: D?.w ?? rt.w,
            h: D?.h ?? rt.h
          },
          { w: P.clientWidth, h: P.clientHeight },
          s.minPanelSize
        );
        if (Q) return { panel: Q, edge: "float", rect: q };
        const U = ne(P);
        return U ? { panel: "", space: U, edge: "float", rect: q } : null;
      }
      return null;
    }
    function ne(i) {
      const d = i.closest(".dc-space")?.getAttribute("data-dc-path");
      return d == null ? null : d === "" ? [] : d.split("/").map(Number);
    }
    function pe() {
      const i = B.value;
      return i ? [...i.querySelectorAll(".dc-space")].filter((d) => d.closest(".dc-window") === i).filter((d) => !d.querySelector(".dc-pane")).reverse().flatMap((d) => {
        const p = ne(d);
        return p ? [{ element: d, path: p }] : [];
      }) : [];
    }
    function Ce(i, d) {
      for (const { element: p, path: x } of pe()) {
        if (p.dataset.dcSpace === "desktop") continue;
        const P = p.getBoundingClientRect();
        if (!(i < P.left || i > P.right || d < P.top || d > P.bottom))
          return { panel: "", space: x, edge: "center" };
      }
      return null;
    }
    function Ue(i) {
      return I().filter(
        (d) => d.element.closest(".dc-window__desktop") === i
      );
    }
    let He = null;
    const Ge = (i) => i.altKey;
    function Xe(i, d) {
      if (!fe(i) || y.value || k.value || d.button !== 0) return;
      const p = d.clientX, x = d.clientY;
      let P = !1, z = Ge(d);
      const re = () => {
        const le = E.value;
        le && (h.value = z ? te(le.x, le.y, i) : T(le.x, le.y, i));
      }, Q = (le) => {
        if (!P) {
          if (Math.hypot(le.clientX - p, le.clientY - x) < 4) return;
          P = !0, y.value = i, M.value = null;
        }
        z = Ge(le), $.value = !z, E.value = { x: le.clientX, y: le.clientY }, re();
      }, D = (le) => {
        Ge(le) !== z && (z = !z, $.value = !z, P && re());
      }, q = (le) => {
        He?.();
        const H = h.value, we = u.value;
        if (le && P && H && we) {
          const Ye = H.space ? us(we, i, H.space, H.rect) : H.edge === "float" && H.rect ? cs(we, i, H.panel, H.rect) : Ot(we, i, H.panel, H.edge, H.index);
          j(Ye, {
            panel: i,
            target: H.panel,
            edge: H.edge,
            ...H.space === void 0 ? {} : { space: H.space },
            ...H.index === void 0 ? {} : { index: H.index },
            ...H.rect === void 0 ? {} : { rect: H.rect }
          });
        }
        y.value = null, h.value = null, E.value = null, $.value = !0;
      }, U = () => q(!0), se = () => q(!1), de = (le) => {
        if (le.key === "Escape") {
          q(!1);
          return;
        }
        D(le);
      };
      He = () => {
        window.removeEventListener("pointermove", Q), window.removeEventListener("pointerup", U), window.removeEventListener("pointercancel", se), window.removeEventListener("keydown", de), window.removeEventListener("keyup", D), He = null;
      }, window.addEventListener("pointermove", Q), window.addEventListener("pointerup", U), window.addEventListener("pointercancel", se), window.addEventListener("keydown", de), window.addEventListener("keyup", D);
    }
    Ze(() => He?.());
    let De = null;
    function Ie(i) {
      const d = B.value;
      return d ? [...d.querySelectorAll(
        `.dc-float[data-dc-path="${i.join("/")}"]`
      )].find((P) => P.closest(".dc-window") === d)?.parentElement ?? null : null;
    }
    function Ne(i) {
      const d = u.value;
      return d ? _n(d, i) : null;
    }
    function bt(i) {
      const d = u.value;
      if (!d) return;
      const p = Et(d, i);
      p !== d && (r.value = p);
    }
    function It(i) {
      const d = Ne(i);
      d && bt(d);
    }
    function R(i) {
      const d = u.value, p = d ? _e(d, i) : null;
      return p !== null && je(p);
    }
    function O(i) {
      const d = u.value, p = d ? _e(d, i) : null;
      return p !== null && st(p);
    }
    function Y(i) {
      const d = u.value, p = d ? nt(d, i) : null;
      return p ? be(p.node) : "";
    }
    function $e(i) {
      const d = u.value, p = d ? nt(d, i) : null;
      if (!d || !p) return;
      const x = be(p.node);
      if (l.value.get(x)?.fixed === !0) return;
      const P = !st(p);
      let z = Yi(d, i, P);
      z !== d && (P || (z = Et(z, i)), r.value = z, a("frame-minimize", { panel: x, minimized: P }));
    }
    function ye(i) {
      const d = Ne(i);
      d && $e(d);
    }
    function kt(i) {
      const d = u.value, p = d ? nt(d, i) : null;
      if (!d || !p) return;
      const x = be(p.node);
      if (l.value.get(x)?.fixed === !0) return;
      const P = !je(p);
      let z = Xi(d, i, P);
      z !== d && (P && (z = Et(z, i)), r.value = z, a("frame-maximize", { panel: x, maximized: P }));
    }
    function Un(i) {
      const d = Ne(i);
      d && kt(d);
    }
    function Hn(i, d, p) {
      const x = u.value, P = x ? nt(x, i) : null;
      if (!x || !P || d.button !== 0 || y.value || k.value) return;
      const z = be(P.node);
      if (l.value.get(z)?.fixed === !0 || je(P) || st(P) || (p === "move" ? !s.movable : !s.resizable)) return;
      const re = Ie(i), Q = ji(x, i);
      bt(i);
      const D = { w: re?.clientWidth ?? 0, h: re?.clientHeight ?? 0 }, q = { ...P.rect }, U = d.clientX, se = d.clientY, de = s.minPanelSize;
      k.value = z;
      const le = (Ee) => {
        const Ve = u.value;
        if (!Ve) return;
        const $t = is(Ve, Q, an(Ee, D, de));
        $t !== Ve && (r.value = $t);
      }, H = (Ee) => {
        Ee.preventDefault();
        const Ve = Ee.clientX - U, $t = Ee.clientY - se;
        le(
          p === "move" ? { ...q, x: q.x + Ve, y: q.y + $t } : os(q, p, Ve, $t, de)
        );
      }, we = (Ee) => {
        if (De?.(), k.value = null, !Ee) {
          le(q);
          return;
        }
        const Ve = u.value ? nt(u.value, Q) : null;
        Ve && a("frame-change", { panel: Y(Q), rect: Ve.rect });
      }, Ye = () => we(!0), et = () => we(!1), tt = (Ee) => {
        Ee.key === "Escape" && we(!1);
      };
      De = () => {
        window.removeEventListener("pointermove", H), window.removeEventListener("pointerup", Ye), window.removeEventListener("pointercancel", et), window.removeEventListener("keydown", tt), De = null;
      }, window.addEventListener("pointermove", H), window.addEventListener("pointerup", Ye), window.addEventListener("pointercancel", et), window.addEventListener("keydown", tt);
    }
    function ua(i, d, p) {
      const x = Ne(i);
      x && Hn(x, d, p);
    }
    function da(i, d, p = !1) {
      const x = u.value, P = Ne(i), z = x && P ? nt(x, P) : null;
      if (!x || !P || !z || l.value.get(i)?.fixed === !0 || (p ? !s.resizable : !s.movable)) return;
      if (je(z) || st(z)) {
        L.value = `${Re(i)} is ${je(z) ? "maximized" : "minimized"}, so it cannot be moved.`;
        return;
      }
      const re = d === "left" ? -Kt : d === "right" ? Kt : 0, Q = d === "up" ? -Kt : d === "down" ? Kt : 0, D = Ie(P), q = { w: D?.clientWidth ?? 0, h: D?.clientHeight ?? 0 }, U = p ? os(z.rect, "se", re, Q, s.minPanelSize) : { ...z.rect, x: z.rect.x + re, y: z.rect.y + Q }, se = is(x, P, an(U, q, s.minPanelSize));
      if (se === x) {
        L.value = p ? `${Re(i)} cannot be resized further.` : `${Re(i)} cannot move ${d}.`;
        return;
      }
      r.value = se;
      const de = nt(se, P);
      de && (a("frame-change", { panel: i, rect: de.rect }), L.value = p ? `${Re(i)} resized to ${de.rect.w} by ${de.rect.h}.` : `${Re(i)} moved to ${de.rect.x}, ${de.rect.y}.`);
    }
    Ze(() => De?.());
    function fa(i, d) {
      const p = b(i), x = p?.element.getBoundingClientRect();
      if (!p || !x) return null;
      const P = d === "left" || d === "right", z = (D) => {
        if (!(P ? D.bottom > x.top + 1 && D.top < x.bottom - 1 : D.right > x.left + 1 && D.left < x.right - 1)) return null;
        const U = d === "left" ? x.left - D.right : d === "right" ? D.left - x.right : d === "up" ? x.top - D.bottom : D.top - x.bottom;
        return U < -1 ? null : U;
      }, re = [];
      for (const D of I()) {
        if (D === p || D.element === p.element) continue;
        const q = z(D.element.getBoundingClientRect());
        if (q === null) continue;
        const U = D.panels.find((se) => se !== i);
        U && re.push({ to: { panel: U }, distance: q });
      }
      for (const { element: D, path: q } of pe()) {
        const U = z(D.getBoundingClientRect());
        U !== null && re.push({ to: { space: q }, distance: U });
      }
      return re.reduce(
        (D, q) => D && D.distance <= q.distance ? D : q,
        null
      )?.to ?? null;
    }
    function pa(i) {
      const d = u.value ? _e(u.value, i) !== null : !1;
      if (!d && !fe(i)) return;
      M.value = M.value === i ? null : i;
      const p = Re(i);
      if (!M.value) {
        L.value = `${p}: move mode off.`;
        return;
      }
      L.value = d ? `${p}: move mode on. Arrow keys move the window, shift and an arrow resize it, Escape leaves move mode.` : `${p}: move mode on. Arrow keys move the panel, shift and an arrow make it a tab of the panel that way, Escape leaves move mode.`;
    }
    const Re = (i) => l.value.get(i)?.title ?? i, va = {
      left: "left",
      right: "right",
      up: "top",
      down: "bottom"
    };
    function ma(i, d, p = !1) {
      if (!fe(i)) return;
      const x = u.value;
      if (!x) return;
      const P = Re(i), z = pt(x, i);
      if (!p && z && (d === "left" || d === "right") && z.panels.length > 1) {
        const se = z.panels.indexOf(i), de = d === "left" ? se - 1 : se + 1;
        if (de >= 0 && de < z.panels.length) {
          j(St(x, i, de), { panel: i, target: i, edge: "center", index: de }), L.value = `${P} moved ${d}, now tab ${de + 1} of ${z.panels.length}.`, en(i);
          return;
        }
      }
      const Q = fa(i, d);
      if (!Q || Q.panel !== void 0 && !fe(Q.panel)) {
        L.value = `${P} cannot move ${d}.`;
        return;
      }
      const D = va[d];
      if (Q.space) {
        const se = Q.space, de = Qe(x, se), le = _e(x, i)?.rect, H = { ...rt, ...le ? { w: le.w, h: le.h } : {} };
        j(us(x, i, se, H), { panel: i, target: "", space: se, edge: D }), L.value = `${P} moved ${d}, into ${de ? gt(de) : "the space"}.`, en(i);
        return;
      }
      const q = Q.panel, U = z?.panels.length === 1 && pt(x, q)?.panels.length === 1;
      p ? (j(Ot(x, i, q, "center"), {
        panel: i,
        target: q,
        edge: "center"
      }), L.value = `${P} joined ${Re(q)} as a tab.`) : U ? (j(Bt(x, i, q), { panel: i, target: q, edge: D }), L.value = `${P} moved ${d}, trading places with ${Re(q)}.`) : (j(Ot(x, i, q, D), { panel: i, target: q, edge: D }), L.value = `${P} moved ${d}, beside ${Re(q)}.`), en(i);
    }
    function en(i) {
      At(() => {
        b(i)?.element.querySelector(".dc-pane__grip")?.focus();
      });
    }
    function ha(i, d) {
      const p = u.value;
      p && (r.value = Wt(p, i, d));
    }
    function tn(i) {
      const d = u.value;
      if (!d) return;
      const p = mt(d, i);
      p !== d && (r.value = p, a("tab-select", { panel: i }));
    }
    function Gn(i) {
      return l.value.get(i)?.closable ?? s.closable;
    }
    function _a(i) {
      Gn(i) && a("panel-close", i);
    }
    const nn = W(/* @__PURE__ */ new Map());
    let ga = 0;
    function ya(i, d) {
      const p = ga += 1;
      return nn.value.set(p, { panel: i, items: d }), () => {
        nn.value.delete(p);
      };
    }
    function wa(i) {
      const d = [];
      for (const p of nn.value.values())
        p.panel() === i && d.push(...p.items());
      return d;
    }
    function Xn(i) {
      const d = i.filter((p) => p.items.length > 0);
      return d.length < 2 ? d.flatMap((p) => p.items) : d.flatMap((p) => [
        { id: p.id, heading: !0, label: p.title },
        ...p.items
      ]);
    }
    const Yn = (i) => i.title || "These tabs";
    function ba(i, d) {
      const p = d.id, x = pt(i, p), P = (x?.panels.length ?? 0) > 1, z = x?.fixedView === !0, re = (U) => ({
        action: () => {
          U !== i && (r.value = U);
        }
      }), Q = [], D = [], q = d.views ?? [];
      if (q.length > 1 && !z) {
        const U = A(p);
        Q.push({
          id: "view",
          label: "View",
          items: q.map((se) => ({
            id: `view-${se.key}`,
            label: se.label,
            checked: se.key === U,
            action: () => Z(p, se.key)
          }))
        });
      }
      return P && !z && D.push(
        { id: "show-row", label: "Row", checked: !1, ...re(ds(i, p, "row")) },
        {
          id: "show-column",
          label: "Column",
          checked: !1,
          ...re(ds(i, p, "column"))
        },
        // Already true, and nothing to collapse: these panes are tabs. Ticked
        // and choosable all the same — collapsing a strip into a strip hands
        // back the tree it was given, so it is the no-op it looks like.
        {
          id: "show-tabs",
          label: "Tabs",
          checked: !0,
          ...re(ec(i, p))
        },
        {
          id: "show-desktop",
          label: "Desktop",
          checked: !1,
          ...re(tc(i, p))
        }
      ), P && x && (D.length && D.push({ separator: !0 }), D.push(...jn(x, p))), { panel: Q, tabs: D, tabsTitle: x ? Yn(x) : "" };
    }
    function jn(i, d) {
      const p = ut(i), x = (P) => {
        const z = i.panels[(p + P + i.panels.length) % i.panels.length];
        return (z === void 0 ? "" : be(z)) || d;
      };
      return [
        { id: "next-tab", label: "Next tab", action: () => tn(x(1)) },
        { id: "previous-tab", label: "Previous tab", action: () => tn(x(-1)) }
      ];
    }
    function Nt(i) {
      return i.title ? i.title : K(i) ? i.panels.length > 1 ? "these tabs" : "the strip" : gt(i);
    }
    function Qn(i) {
      if (!i || G(i) || i.fixedView === !0 || !i.title && i.headless !== !0 || ze(i)) return null;
      const d = ia(i);
      return d && d.fixedView !== !0 ? d : null;
    }
    function ka(i) {
      const d = u.value;
      if (!s.menu || !d) return [];
      const p = Qe(d, i);
      if (!p || K(p)) return [];
      if (p.fixedView) return [];
      const x = G(p) ? "desktop" : p.direction, P = (H, we, Ye) => ({
        id: `show-${H}`,
        label: we,
        checked: x === H,
        action: () => {
          const et = u.value, tt = Ye();
          !et || tt === p || (r.value = Qt(he(ot(et, i, tt))));
        }
      }), z = () => {
        const H = aa(p, $a(p));
        if (K(H) && H.panels.length === 0) return p;
        const we = K(H) && H.panels.length === 1 ? H.panels[0] : void 0;
        return we !== void 0 && ie(we) ? p : H;
      }, re = (H) => () => G(p) ? oa(p, H) : p.direction === H ? p : { ...p, direction: H }, Q = i.slice(0, -1), D = i.length > 0 ? Qe(d, Q) : null, q = D && K(D) && D.panels.length > 1 ? D : null, U = D && Qn(D) === p ? D : null, se = Qn(p), de = p.title || "this space", le = (H, we, Ye, et, tt) => ({
        id: H,
        label: tt,
        action: () => {
          const Ee = u.value;
          Ee && (r.value = Qt(he(ot(Ee, we, ac(Ye, et)))));
        }
      });
      return Xn([
        {
          id: "about-space",
          /*
           * Its own name, or what it is rather than how it is shown: `spaceTitle`
           * would answer "Row" for an unnamed row, which is the item directly
           * under it and the one already ticked.
           */
          title: p.title || "This space",
          items: [
            P("row", "Row", re("row")),
            P("column", "Column", re("column")),
            // Everything in this space in one strip: the panes as tabs, and a
            // desktop among them as a tab of its own, keeping the windows on it.
            P("tabs", "Tabs", () => z()),
            P("desktop", "Desktop", () => G(p) ? p : la(p))
          ]
        },
        {
          id: "about-around",
          title: se ? `Around ${Nt(se)}` : "",
          items: se ? [
            // Keeping this space's bar drops the one inside, so it is offered
            // only where the space inside has no name to be dropped with it.
            ...se.title ? [] : [le("merge-around-keep-this", i, p, "outer", `Keep ${de}`)],
            ...p.title ? [] : [le("merge-around-keep-that", i, p, "inner", `Keep ${Nt(se)}`)]
          ] : []
        },
        {
          id: "about-inside",
          title: U ? `Inside ${Nt(U)}` : "",
          items: U ? [
            ...p.title ? [] : [le("merge-inside-keep-that", Q, U, "outer", `Keep ${Nt(U)}`)],
            ...U.title ? [] : [le("merge-inside-keep-this", Q, U, "inner", `Keep ${de}`)]
          ] : []
        },
        {
          id: "about-tabs",
          title: q ? Yn(q) : "",
          items: q ? jn(q, be(p)) : []
        }
      ]);
    }
    function $a(i) {
      const d = w.value;
      return d && ee(i, d) ? d : void 0;
    }
    function xa(i) {
      const d = u.value, p = l.value.get(i);
      if (!d || !p) return [];
      const x = s.menu ? ba(d, p) : null, P = wa(i);
      P.length && x?.panel.length && P.push({ separator: !0 }), x && P.push(...x.panel);
      const z = Xn([
        { id: "about-panel", title: p.title, items: P },
        { id: "about-tabs", title: x?.tabsTitle ?? "", items: x?.tabs ?? [] }
      ]);
      return s.paneMenu ? s.paneMenu(p, z) : z;
    }
    function Ma(i, d) {
      return c[`${i}-${d}`] ?? c[i];
    }
    function Zn(i, d, p, x) {
      return Ma(i, d.id)?.({ panel: d, view: p, active: x });
    }
    oc({
      panelFor: (i) => l.value.get(i) ?? null,
      viewFor: A,
      setView: Z,
      movable: g(() => s.movable),
      resizable: g(() => s.resizable),
      minPanelSize: g(() => s.minPanelSize),
      spaceNames: g(() => s.spaceNames),
      focused: w,
      dragging: y,
      dropTarget: h,
      moving: M,
      framing: k,
      canMove: fe,
      focus(i) {
        w.value !== i && (w.value = i, a("panel-activate", i));
      },
      selectPanel: tn,
      beginDrag: Xe,
      toggleMoveMode: pa,
      nudge: ma,
      setSizes: ha,
      frameOf: (i) => u.value ? _e(u.value, i) : null,
      beginFrameDrag: ua,
      nudgeFrame: da,
      raise: It,
      maximized: R,
      toggleMaximize: Un,
      minimized: O,
      toggleMinimize: ye,
      beginFrameDragAt: Hn,
      raiseAt: bt,
      toggleMaximizeAt: kt,
      toggleMinimizeAt: $e,
      menuFor: xa,
      spaceMenu: ka,
      registerMenu: ya,
      closable: Gn,
      close: _a,
      renderContent: (i, d, p) => Zn("panel", i, d, p),
      renderActions: (i, d, p) => Zn("actions", i, d, p),
      layout: u
    });
    const Ca = g(() => {
      if (!(!s.accent && !s.tokens))
        return { ...s.tokens, ...s.accent ? { "--dc-accent": s.accent } : {} };
    }), Ea = () => {
      const i = y.value, d = E.value;
      return !i || !d ? null : Fa(
        "div",
        {
          class: "dc-window__ghost",
          style: { left: `${d.x}px`, top: `${d.y}px` },
          "aria-hidden": "true"
        },
        l.value.get(i)?.title ?? i
      );
    };
    return t({
      /** The layout as rendered, reconciled against the current panels. */
      layout: u,
      /** Moves a panel programmatically — the same operation a drag performs. */
      move(i, d, p, x) {
        const P = u.value;
        P && j(Ot(P, i, d, p, x), {
          panel: i,
          target: d,
          edge: p,
          ...x === void 0 ? {} : { index: x }
        });
      },
      /** Brings a panel's tab to the top of its group. */
      select(i) {
        const d = u.value;
        d && (r.value = mt(d, i));
      },
      /** Lifts a panel onto the float holding `near`, as a window of its own. */
      float(i, d, p) {
        const x = u.value;
        x && j(cs(x, i, d, p), {
          panel: i,
          target: d,
          edge: "float",
          rect: p
        });
      },
      /** Puts a floating frame somewhere else, or makes it another size. */
      setRect(i, d) {
        const p = u.value;
        if (!p) return;
        const x = Ui(p, i, d);
        if (x === p) return;
        r.value = x;
        const P = _e(x, i);
        P && a("frame-change", { panel: i, rect: P.rect });
      },
      /**
       * Puts a panel on one of its views, the way its menu would — the way a pane
       * whose space fixed its view, or took its bar away, is switched at all.
       */
      setView: Z,
      /** Brings a floating frame to the front of its stack. */
      raise: It,
      /** Fills the float with a window, or puts it back where it was. */
      toggleMaximize: Un,
      /** Rolls a window up to its title bar, or unrolls it. */
      toggleMinimize: ye
    }), (i, d) => (m(), _("div", {
      ref_key: "root",
      ref: B,
      class: "dc-shell dc-window",
      "data-dc-theme": e.theme,
      "data-dc-dragging": y.value ? "true" : "false",
      "data-dc-docking": $.value ? "true" : "false",
      style: Le(Ca.value)
    }, [
      u.value ? (m(), ge(eu, {
        key: 0,
        node: u.value,
        path: []
      }, null, 8, ["node"])) : (m(), _("p", nu, " This window has no panels. ")),
      J(Ea),
      v("p", su, S(L.value), 1)
    ], 12, tu));
  }
}), ru = /* @__PURE__ */ ue(au, [["__scopeId", "data-v-711565af"]]);
function $u(e = "", t = "/") {
  const n = W(qe(e)), s = W(t), a = [`${s.value}${n.value}`];
  return {
    search: n,
    path: s,
    history: a,
    push(r) {
      n.value = qe(r), a.push(`${s.value}${n.value}`);
    },
    replace(r) {
      n.value = qe(r), a[a.length - 1] = `${s.value}${n.value}`;
    }
  };
}
function vs(e) {
  const t = e.indexOf("?");
  if (t === -1) return "";
  const n = e.slice(t), s = n.indexOf("#");
  return qe(s === -1 ? n : n.slice(0, s));
}
function xu(e) {
  const t = W(vs(e.currentRoute.value.fullPath)), n = g(() => e.currentRoute.value.path), s = xe(
    () => e.currentRoute.value.fullPath,
    (a) => {
      t.value = vs(a);
    }
  );
  return {
    search: t,
    path: n,
    push: (a) => e.push(`${n.value}${qe(a)}`),
    replace: (a) => e.replace(`${n.value}${qe(a)}`),
    dispose: s
  };
}
const lu = {
  DataShell: Mi,
  ShellHeader: Fs,
  QueryPanel: Ls,
  ResultsArea: Us,
  FacetControl: Ts,
  SegmentedControl: fn,
  StatusPill: zt,
  ScoreMeter: Ks,
  WindowFrame: ru,
  WindowPane: ca,
  ListView: pn,
  CardsView: Ns,
  GridView: Vs,
  TableView: Bs,
  LinksView: Os,
  PreviewView: qs,
  TypeCardsView: Ws
}, Mu = {
  install(e, t = {}) {
    const n = t.prefix ?? "";
    for (const [s, a] of Object.entries(lu))
      e.component(`${n}${s}`, a);
    t.route && e.provide(_s, t.route);
  }
};
export {
  jt as CASCADE_STEP,
  Ns as CardsView,
  rt as DEFAULT_FRAME,
  cu as DEFAULT_SORT,
  La as DEFAULT_VIEW,
  Mi as DataShell,
  Ps as ENTITY_ALL,
  dn as ENTITY_TERM,
  An as FACET_PREFIX,
  Ts as FacetControl,
  Ds as GENERIC_LABELS,
  Vs as GridView,
  Mu as HeaderContentLayoutPlugin,
  Os as LinksView,
  pn as ListView,
  dt as MINIMIZED_GAP,
  Xs as MINIMIZED_HEIGHT,
  vn as MINIMIZED_WIDTH,
  Gs as MIN_FRAME,
  ss as MOCK_TINTS,
  du as MenuBar,
  Rn as MenuButton,
  Hs as MenuList,
  Je as MetricDrill,
  Wn as PANE_CONTEXT_KEY,
  En as PARAM_DIR,
  xn as PARAM_ENTITY,
  Sn as PARAM_EXPR,
  Pn as PARAM_PAGE,
  Cn as PARAM_SORT,
  Mn as PARAM_VIEW,
  zn as PinStar,
  qs as PreviewView,
  Ls as QueryPanel,
  es as RECORD_STATUSES,
  Ia as RESULT_FIELDS,
  _s as ROUTE_ADAPTER_KEY,
  Us as ResultsArea,
  Ss as SHELL_CONTEXT_KEY,
  iu as SHELL_THEMES,
  Rt as ScopeMark,
  Ks as ScoreMeter,
  fn as SegmentedControl,
  Fs as ShellHeader,
  zt as StatusPill,
  Bs as TableView,
  Ws as TypeCardsView,
  gs as VIEW_KINDS,
  qn as WINDOW_CONTEXT_KEY,
  ru as WindowFrame,
  ca as WindowPane,
  js as activePanel,
  ut as activeTab,
  sr as addTerm,
  Bi as axisOf,
  Ln as cascade,
  ts as changesResults,
  an as clampRect,
  aa as collapseSpace,
  ec as collapseToTabs,
  pu as column,
  Da as countPages,
  Ta as createHistoryAdapter,
  $u as createMemoryAdapter,
  er as createMockDataSource,
  xu as createVueRouterAdapter,
  ps as defaultLayout,
  $n as defaultQuery,
  ar as drillExpression,
  us as dropIntoSpace,
  Yt as emptyFacetState,
  bn as emptyFacetValue,
  ft as findEntity,
  at as findSort,
  mu as fixedView,
  Tn as float,
  cs as floatPanel,
  la as floatSplit,
  tc as floatTabs,
  cn as fnv1a,
  ws as focusEntity,
  Wa as formatDate,
  ns as formatMetric,
  Ua as formatOrdinal,
  Cs as formatPercent,
  Zt as frame,
  nt as frameAt,
  _e as frameOf,
  _n as framePathOf,
  be as frontPanel,
  Qa as generateRows,
  fu as group,
  pt as groupOf,
  Wi as groups,
  $s as hasActiveFacets,
  ee as hasPanel,
  vu as headless,
  Mt as insertPanel,
  Ct as isChoosable,
  uu as isEntityScoped,
  ks as isFacetActive,
  G as isFloat,
  K as isGroup,
  je as isMaximized,
  st as isMinimized,
  ie as isPanelTab,
  kn as isPristineQuery,
  wt as isSplit,
  Se as isTabOf,
  xs as isTypeCardsQuery,
  ys as isViewKind,
  Ba as matchesExpression,
  Za as matchesFacets,
  Hi as maximizeFrame,
  Xi as maximizeFrameAt,
  ac as mergeSpace,
  Gi as minimizeFrame,
  Yi as minimizeFrameAt,
  Ot as movePanel,
  St as moveTab,
  Qe as nodeAt,
  Pt as nodeTitle,
  he as normalizeLayout,
  qe as normalizeSearch,
  On as normalizeSizes,
  ia as onlySpace,
  We as panelIds,
  Te as panelNode,
  ls as panelTabs,
  Oa as parseExpression,
  dr as parseQuery,
  Is as presentRow,
  Mc as providePaneContext,
  rr as provideShellContext,
  oc as provideWindowContext,
  rn as raiseFrame,
  Et as raiseFrameAt,
  ji as raisedPath,
  Ms as reconcileFacets,
  lc as reconcileLayout,
  lt as removePanel,
  ot as replaceAt,
  os as resizeRect,
  fs as resizeSplit,
  Qt as rootSpace,
  In as row,
  tr as scopeTerm,
  nr as scopeTermFor,
  rs as serializeQuery,
  mt as setActivePanel,
  Ui as setFrameRect,
  is as setFrameRectAt,
  Wt as setSizesAt,
  gu as setSplitDirection,
  Be as sizesOf,
  bs as sortsFor,
  me as spaceChrome,
  gt as spaceTitle,
  Dn as split,
  ds as spreadTabs,
  pr as summarizeQuery,
  Rs as summaryTerms,
  Bt as swapPanels,
  Fn as tabNode,
  Tt as tabPanels,
  oa as tileFloat,
  yu as toFloat,
  wu as toTiled,
  hu as toggleMaximized,
  _u as toggleMinimized,
  Xo as useEntityPreviews,
  bu as usePaneContext,
  ku as usePaneMenu,
  yt as usePresentedRows,
  vr as useQueryState,
  mr as useResults,
  ke as useShellContext,
  yl as useViewLabels,
  Bn as useWindowContext
};
