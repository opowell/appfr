import { ref as B, inject as _t, provide as yn, computed as g, toValue as xt, shallowRef as Ut, watch as xe, defineComponent as ce, openBlock as v, createElementBlock as _, createElementVNode as m, toDisplayString as E, createCommentVNode as I, unref as C, renderSlot as Ke, Fragment as ae, renderList as ve, withDirectives as ln, withKeys as Ht, withModifiers as Fe, vModelText as on, normalizeClass as Sa, useSlots as wn, nextTick as At, createBlock as ge, createVNode as J, createTextVNode as Ae, withCtx as it, normalizeStyle as Le, resolveDynamicComponent as Pa, useModel as Gt, onBeforeUnmount as Ze, useId as ms, createSlots as Jn, mergeModels as Xt, onMounted as Aa, resolveComponent as hs, getCurrentScope as za, onScopeDispose as Ra, h as Fa } from "vue";
const _s = Symbol("dc.routeAdapter");
function qe(e) {
  if (!e) return "";
  const t = e.replace(/^[?]/, "");
  return t ? `?${t}` : "";
}
function Ta() {
  const e = typeof window < "u", t = B(e ? qe(window.location.search) : ""), n = B(e ? window.location.pathname : "/"), s = () => {
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
const gs = ["list", "cards", "grid", "table", "links", "preview"], ou = [
  "minimal",
  "mono-size",
  "dark",
  "light",
  "auto",
  "macos",
  "windows",
  "inherit"
], es = ["ok", "running", "queued", "review", "failed"], La = "cards", iu = "updated";
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
function cu(e) {
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
    const f = r[l % r.length], d = Math.floor(l / r.length), k = cn(`${s}:${e.key}:${f[0]}:${l}`), y = Es(e.key, l), h = {};
    for (const w of e.facets)
      h[w.key] = Ya(w, cn(`${k}:${w.key}`));
    for (const [w, $] of o)
      h[w] = $ === e.key ? y : Xa($, l, w, n);
    const x = new Date(a.getTime() - k % 900 * 36e5).toISOString();
    c.push({
      id: y,
      entityKey: e.key,
      entityLabel: e.label,
      primary: d ? `${f[0]} · rev ${d + 1}` : f[0],
      secondary: d ? `${f[1]}-${d + 1}` : f[1],
      status: es[k % es.length],
      score: Number((0.35 + k % 64 / 100).toFixed(3)),
      metric1: 1 + k % 940,
      metric2: 1 + (k >> 3) % 320,
      updatedAt: x,
      tint: ss[k % ss.length],
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
      const l = Oa(s.expr), f = r ? [r] : a.entities, d = [], k = [];
      for (const x of f)
        for (const w of n(x, a))
          d.push(w), (r ? Za(w, s.facets) : !0) && Ba(l, w, x) && k.push(w);
      const y = at(r, s.sort), h = k.sort(Ja(y.key));
      return s.dir === "asc" && h.reverse(), {
        // One page out of the middle. `total` stays the whole match, which is
        // what the shell counts pages with.
        rows: h.slice(c, c + o),
        total: k.length,
        unfiltered: k.length === d.length
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
  const s = $n(t, n), a = new Map(zs(e)), r = a.get(xn), o = r === void 0 ? s.entity : Oe(r), c = o === Ps ? null : ft(t, o), l = a.get(Mn), f = l && ys(Oe(l)) ? Oe(l) : s.view, d = a.get(Cn), k = at(c, d ? Oe(d) : n.sort), y = a.get(En), h = y ? Oe(y) === "asc" ? "asc" : "desc" : s.dir, x = a.get(Sn), w = a.get(Pn), $ = w === void 0 ? 1 : Number(Oe(w)), z = Number.isFinite($) ? Math.max(1, Math.floor($)) : 1, q = {};
  for (const W of c?.facets ?? []) {
    const D = a.get(`${An}${W.key}`);
    q[W.key] = D === void 0 ? bn(W) : cr(W, D);
  }
  return {
    entity: c?.key ?? null,
    view: f,
    sort: k.key,
    dir: h,
    expr: x === void 0 ? "" : Oe(x),
    facets: Ms(c, q),
    page: z
  };
}
function rs(e, t, n = {}, s = "") {
  const a = $n(t, n), r = ft(t, e.entity), o = zs(s).filter(([k]) => !ir(k)), c = [], l = (k, y) => c.push([k, sn(y)]), f = r?.key ?? null;
  f !== a.entity && l(xn, f ?? Ps), e.view !== a.view && l(Mn, e.view), e.sort !== a.sort && l(Cn, e.sort), e.dir !== a.dir && l(En, e.dir), e.expr.trim() !== "" && l(Sn, e.expr);
  for (const k of r?.facets ?? []) {
    const y = e.facets[k.key];
    if (!y) continue;
    const h = ur(y, k);
    h !== null && c.push([`${An}${k.key}`, sn(h)]);
  }
  e.page > 1 && l(Pn, String(e.page));
  const d = [
    ...o.map(([k, y]) => [sn(k), y]),
    ...c
  ];
  return d.length ? `?${d.map(([k, y]) => y === "" ? k : `${k}=${y}`).join("&")}` : "";
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
  const { adapter: t } = e, n = g(() => xt(e.schema)), s = g(() => xt(e.defaults) ?? {}), a = g(() => dr(t.search.value, n.value, s.value)), r = g(() => ft(n.value, a.value.entity)), o = g(() => r.value ?? ws(n.value, s.value)), c = g(() => bs(r.value)), l = g(() => at(r.value, a.value.sort)), f = (w, $) => {
    const z = rs(w, n.value, s.value, t.search.value);
    z !== t.search.value && ($ === "push" ? t.push(z) : t.replace(z));
  }, d = () => xt(e.navigationMode) ?? "push", k = () => xt(e.facetNavigationMode) ?? "replace", y = (w, $) => {
    const z = w.page ?? (ts(w) ? 1 : a.value.page);
    f({ ...a.value, ...w, page: z }, $);
  }, h = (w, $) => {
    const z = a.value.facets[w];
    if (!z) return;
    const q = { ...a.value.facets, [w]: $(z) };
    y({ facets: q }, k());
  }, x = (w) => {
    const $ = w === null ? null : ft(n.value, w);
    ($?.key ?? null) !== a.value.entity && y(
      {
        entity: $?.key ?? null,
        sort: at($, a.value.sort).key,
        facets: Yt($)
      },
      d()
    );
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
    setEntity: x,
    clearEntity: () => x(null),
    setView(w) {
      y({ view: w }, d());
    },
    setSort(w) {
      y({ sort: at(r.value, w).key }, d());
    },
    toggleDirection() {
      y({ dir: a.value.dir === "desc" ? "asc" : "desc" }, d());
    },
    setExpression(w) {
      y({ expr: w }, d());
    },
    setPage(w, $) {
      y({ page: Math.max(1, Math.floor(w)) }, $ ?? d());
    },
    setFacet(w, $) {
      h(w, () => $);
    },
    toggleChip(w, $) {
      h(w, (z) => z.kind !== "chips" ? z : { kind: "chips", selected: z.selected.includes($) ? z.selected.filter((W) => W !== $) : [...z.selected, $] });
    },
    setRange(w, $, z) {
      h(w, (q) => q.kind === "range" ? { kind: "range", min: $, max: z } : q);
    },
    toggleFlag(w) {
      h(
        w,
        ($) => $.kind === "toggle" ? { kind: "toggle", on: !$.on } : $
      );
    },
    removeTerm(w) {
      if (w.facetKey === dn) {
        x(null);
        return;
      }
      h(w.facetKey, ($) => $.kind === "chips" && w.option ? { kind: "chips", selected: $.selected.filter((z) => z !== w.option) } : $.kind === "range" ? { kind: "range", min: null, max: null } : $.kind === "toggle" ? { kind: "toggle", on: !1 } : $);
    },
    clearFilters() {
      y({ entity: null, expr: "", facets: Yt(null) }, d());
    },
    reset() {
      f($n(n.value, s.value), d());
    },
    hrefFor(w) {
      const $ = { ...a.value, ...w };
      return $.page = w.page ?? (ts(w) ? 1 : a.value.page), $.facets = Ms(ft(n.value, $.entity), $.facets), `${t.path.value}${rs($, n.value, s.value, t.search.value)}`;
    }
  };
}
function mr(e) {
  const t = Ut([]), n = B(0), s = B(!1), a = Ut(null);
  let r = 0;
  const o = g(() => (e.query.value.page - 1) * e.limit.value), c = g(() => Da(n.value, e.limit.value)), l = (d) => {
    t.value = d.rows, n.value = d.total, a.value = null;
  }, f = () => {
    const d = ++r, k = {
      query: e.query.value,
      schema: e.schema.value,
      entity: e.entity.value,
      limit: e.limit.value,
      offset: o.value
    };
    let y;
    try {
      y = e.source.value.query(k);
    } catch (h) {
      a.value = h, t.value = [], n.value = 0;
      return;
    }
    if (!(y instanceof Promise)) {
      l(y), s.value = !1;
      return;
    }
    s.value = !0, y.then((h) => {
      d === r && l(h);
    }).catch((h) => {
      d === r && (a.value = h, t.value = [], n.value = 0);
    }).finally(() => {
      d === r && (s.value = !1);
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
      const k = a.entity.value;
      return k && !a.hasFacets.value && !a.query.value.expr.trim() ? k.count : String(a.total.value);
    }), l = g(() => a.query.value.page), f = g(
      () => a.pageCount.value > 1 && !xs(a.query.value)
    ), d = g(() => {
      const k = `Page ${l.value} of ${a.pageCount.value}`, y = a.rows.value.length;
      if (!y) return k;
      const h = a.offset.value + 1;
      return `${k} — rows ${h} to ${h + y - 1} of ${a.total.value}`;
    });
    return (k, y) => (v(), _("div", {
      class: "dc-header",
      "data-dc-expanded": e.expanded ? "true" : "false"
    }, [
      m("button", {
        type: "button",
        class: "dc-header__trigger",
        "aria-expanded": e.expanded,
        "aria-controls": e.panelId,
        onClick: y[0] || (y[0] = (h) => s("toggle"))
      }, [
        y[4] || (y[4] = m("span", {
          class: "dc-header__badge",
          "aria-hidden": "true"
        }, "◆", -1)),
        m("span", gr, E(r.value.label), 1),
        m("span", yr, [
          m("span", wr, E(o.value), 1),
          c.value ? (v(), _("span", br, E(c.value), 1)) : I("", !0)
        ]),
        m("span", kr, [
          y[3] || (y[3] = m("span", { class: "dc-header__query-label" }, "Query", -1)),
          m("span", {
            class: "dc-header__summary dc-mono dc-truncate",
            "data-dc-active": C(a).isPristine.value ? "false" : "true",
            title: C(a).summary.value
          }, E(C(a).summary.value), 9, $r)
        ]),
        m("span", xr, E(e.expanded ? "▲" : "▼"), 1),
        m("span", Mr, E(e.expanded ? "Hide query panel" : "Edit query"), 1)
      ], 8, _r),
      f.value ? (v(), _("nav", Cr, [
        m("button", {
          type: "button",
          class: "dc-header__step",
          "aria-label": "Previous page",
          disabled: l.value <= 1,
          onClick: y[1] || (y[1] = (h) => C(a).setPage(l.value - 1))
        }, [...y[5] || (y[5] = [
          m("span", { "aria-hidden": "true" }, "‹", -1)
        ])], 8, Er),
        m("span", {
          class: "dc-header__page dc-mono",
          title: d.value,
          "aria-hidden": "true"
        }, E(l.value) + " / " + E(C(a).pageCount.value), 9, Sr),
        m("span", Pr, E(d.value), 1),
        m("button", {
          type: "button",
          class: "dc-header__step",
          "aria-label": "Next page",
          disabled: l.value >= C(a).pageCount.value,
          onClick: y[2] || (y[2] = (h) => C(a).setPage(l.value + 1))
        }, [...y[6] || (y[6] = [
          m("span", { "aria-hidden": "true" }, "›", -1)
        ])], 8, Ar)
      ])) : I("", !0),
      k.$slots.actions ? (v(), _("div", zr, [
        Ke(k.$slots, "actions", {}, void 0, !0)
      ])) : I("", !0)
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
      const h = r.value.has(y) ? n.value.selected.filter((x) => x !== y) : [...n.value.selected, y];
      s("update", { kind: "chips", selected: h });
    }
    const c = B(""), l = B("");
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
      const x = Number(h);
      return Number.isFinite(x) ? x : null;
    }
    function d() {
      if (n.value.kind !== "range") return;
      const y = f(c.value), h = f(l.value);
      y === n.value.min && h === n.value.max || s("update", { kind: "range", min: y, max: h });
    }
    function k() {
      n.value.kind === "toggle" && s("update", { kind: "toggle", on: !n.value.on });
    }
    return (y, h) => (v(), _("div", Fr, [
      m("div", Tr, [
        m("span", {
          id: `dc-facet-${e.facet.key}`,
          class: "dc-facet__label"
        }, E(e.facet.label), 9, Lr),
        m("span", Dr, E(a.value), 1)
      ]),
      e.facet.kind === "chips" && e.value.kind === "chips" ? (v(), _("div", {
        key: 0,
        class: "dc-facet__chips",
        role: "group",
        "aria-labelledby": `dc-facet-${e.facet.key}`
      }, [
        (v(!0), _(ae, null, ve(e.facet.options, (x) => (v(), _("button", {
          key: x,
          type: "button",
          class: "dc-chip",
          "aria-pressed": r.value.has(x),
          "data-dc-active": r.value.has(x) ? "true" : "false",
          onClick: (w) => o(x)
        }, E(x), 9, Nr))), 128))
      ], 8, Ir)) : e.facet.kind === "range" && e.value.kind === "range" ? (v(), _("div", {
        key: 1,
        class: "dc-facet__range",
        role: "group",
        "aria-labelledby": `dc-facet-${e.facet.key}`
      }, [
        ln(m("input", {
          "onUpdate:modelValue": h[0] || (h[0] = (x) => c.value = x),
          class: "dc-input dc-mono",
          type: "number",
          inputmode: "numeric",
          "aria-label": `${e.facet.label} minimum`,
          placeholder: String(e.facet.min),
          onChange: d,
          onBlur: d,
          onKeydown: Ht(Fe(d, ["prevent"]), ["enter"])
        }, null, 40, Or), [
          [on, c.value]
        ]),
        h[2] || (h[2] = m("span", {
          class: "dc-facet__dash",
          "aria-hidden": "true"
        }, "–", -1)),
        ln(m("input", {
          "onUpdate:modelValue": h[1] || (h[1] = (x) => l.value = x),
          class: "dc-input dc-mono",
          type: "number",
          inputmode: "numeric",
          "aria-label": `${e.facet.label} maximum`,
          placeholder: String(e.facet.max),
          onChange: d,
          onBlur: d,
          onKeydown: Ht(Fe(d, ["prevent"]), ["enter"])
        }, null, 40, Kr), [
          [on, l.value]
        ])
      ], 8, Vr)) : e.facet.kind === "toggle" && e.value.kind === "toggle" ? (v(), _("button", {
        key: 2,
        type: "button",
        class: "dc-switch",
        role: "switch",
        "aria-checked": e.value.on,
        onClick: k
      }, [
        m("span", Br, E(e.facet.text), 1),
        m("span", {
          class: "dc-switch__track",
          "data-dc-active": e.value.on ? "true" : "false",
          "aria-hidden": "true"
        }, [...h[3] || (h[3] = [
          m("span", { class: "dc-switch__knob" }, null, -1)
        ])], 8, Wr)
      ], 8, qr)) : I("", !0)
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
    const n = e, s = t, a = B([]);
    function r(o, c) {
      const l = n.options.length;
      let f = null;
      if (o.key === "ArrowRight" || o.key === "ArrowDown" ? f = (c + 1) % l : o.key === "ArrowLeft" || o.key === "ArrowUp" ? f = (c - 1 + l) % l : o.key === "Home" ? f = 0 : o.key === "End" && (f = l - 1), f === null) return;
      o.preventDefault();
      const d = n.options[f];
      d && (s("update:modelValue", d.key), a.value[f]?.focus());
    }
    return (o, c) => (v(), _("div", {
      class: "dc-segmented",
      role: "radiogroup",
      "aria-label": e.label
    }, [
      (v(!0), _(ae, null, ve(e.options, (l, f) => (v(), _("button", {
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
        onClick: (d) => s("update:modelValue", l.key),
        onKeydown: (d) => r(d, f)
      }, E(l.label), 43, Gr))), 128))
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
      () => (n.views ?? [...gs]).map((w) => ({ key: w, label: o[w] }))
    ), l = g(
      () => r.sorts.value.map((w) => ({ key: w.key, label: w.label }))
    ), f = B(r.query.value.expr), d = B(null);
    xe(
      () => r.query.value.expr,
      (w) => {
        f.value = w;
      }
    );
    const k = g(() => f.value !== r.query.value.expr);
    function y() {
      r.setExpression(f.value), s("close");
    }
    function h() {
      f.value = "", r.clearFilters();
    }
    function x(w, $) {
      r.setFacet(w, $);
    }
    return At(() => d.value?.focus()), (w, $) => (v(), _("div", {
      id: e.panelId,
      class: "dc-panel",
      role: "dialog",
      "aria-label": "Query",
      onKeydown: $[5] || ($[5] = Ht(Fe((z) => s("close"), ["stop"]), ["esc"]))
    }, [
      m("section", jr, [
        m("div", Qr, [
          m("div", Zr, [
            m("label", {
              class: "dc-panel__field-label",
              for: `${e.panelId}-expr`
            }, "Expression", 8, Jr),
            ln(m("input", {
              id: `${e.panelId}-expr`,
              ref_key: "expressionField",
              ref: d,
              "onUpdate:modelValue": $[0] || ($[0] = (z) => f.value = z),
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
          C(r).entity.value ? (v(), _("div", tl, [
            (v(!0), _(ae, null, ve(C(r).entity.value.facets, (z) => (v(), ge(Ts, {
              key: z.key,
              facet: z,
              value: C(r).query.value.facets[z.key],
              onUpdate: (q) => x(z.key, q)
            }, null, 8, ["facet", "value", "onUpdate"]))), 128))
          ])) : (v(), _("p", nl, " Results span every entity — logs and settings included. Pick one below to narrow to it and to get its own filters. "))
        ]),
        m("div", sl, [
          m("span", {
            id: `${e.panelId}-entities`,
            class: "dc-panel__field-label"
          }, "Entities", 8, al),
          m("div", {
            class: "dc-panel__entities",
            role: "group",
            "aria-labelledby": `${e.panelId}-entities`
          }, [
            m("button", {
              type: "button",
              class: "dc-entity dc-entity--all",
              "data-dc-active": C(r).isEverything.value ? "true" : "false",
              "aria-current": C(r).isEverything.value ? "true" : void 0,
              onClick: $[1] || ($[1] = (z) => C(r).clearEntity())
            }, [
              $[6] || ($[6] = m("span", { class: "dc-entity__label" }, "Everything", -1)),
              m("span", ol, E(C(r).entities.value.length) + " kinds", 1)
            ], 8, ll),
            (v(!0), _(ae, null, ve(C(r).entities.value, (z) => (v(), _("button", {
              key: z.key,
              type: "button",
              class: "dc-entity",
              "data-dc-active": z.key === C(r).entity.value?.key ? "true" : "false",
              "aria-current": z.key === C(r).entity.value?.key ? "true" : void 0,
              onClick: (q) => C(r).setEntity(z.key)
            }, [
              m("span", cl, E(z.label), 1),
              m("span", ul, E(z.count), 1)
            ], 8, il))), 128))
          ], 8, rl)
        ]),
        m("div", dl, [
          m("button", {
            type: "button",
            class: "dc-button dc-button--primary",
            onClick: y
          }, " Run query "),
          m("button", {
            type: "button",
            class: "dc-button",
            disabled: C(r).isPristine.value && !k.value,
            onClick: h
          }, " Reset ", 8, fl)
        ])
      ]),
      m("section", pl, [
        m("div", vl, [
          $[7] || ($[7] = m("span", { class: "dc-eyebrow" }, "View", -1)),
          J(fn, {
            label: "Result view",
            "model-value": C(r).query.value.view,
            options: c.value,
            "onUpdate:modelValue": $[2] || ($[2] = (z) => C(r).setView(z))
          }, null, 8, ["model-value", "options"])
        ]),
        m("div", ml, [
          $[8] || ($[8] = m("span", { class: "dc-eyebrow" }, "Sort", -1)),
          J(fn, {
            mono: "",
            label: "Sort field",
            "model-value": C(r).query.value.sort,
            options: l.value,
            "onUpdate:modelValue": $[3] || ($[3] = (z) => C(r).setSort(z))
          }, null, 8, ["model-value", "options"]),
          m("button", {
            type: "button",
            class: "dc-button dc-button--icon dc-mono",
            title: C(r).query.value.dir === "desc" ? "Descending — click to reverse" : "Ascending — click to reverse",
            "aria-label": `Sort direction: ${C(r).query.value.dir === "desc" ? "descending" : "ascending"}`,
            onClick: $[4] || ($[4] = (z) => C(r).toggleDirection())
          }, E(C(r).query.value.dir === "desc" ? "↓" : "↑"), 9, hl)
        ])
      ]),
      a["panel-section"] ? (v(), _("section", _l, [
        Ke(w.$slots, "panel-section", {}, void 0, !0)
      ])) : I("", !0)
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
    return (t, n) => (v(), _("span", {
      class: "dc-pill",
      "data-dc-status": e.status
    }, E(e.status), 9, wl));
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
    return (o, c) => s.value ? (v(), _("button", {
      key: 0,
      type: "button",
      class: "dc-drill",
      title: `${e.entry.labels[e.metric]} of ${e.entry.row.primary} — show the ${s.value.label.toLowerCase()}`,
      onClick: r
    }, [
      Ke(o.$slots, "default", {}, () => [
        Ae(E(a.value), 1)
      ], !0)
    ], 8, kl)) : (v(), _("span", $l, [
      Ke(o.$slots, "default", {}, () => [
        Ae(E(a.value), 1)
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
    return (a, r) => (v(), _("button", {
      type: "button",
      class: "dc-star",
      "data-dc-active": e.pinned ? "true" : "false",
      "aria-pressed": e.pinned,
      "aria-label": e.pinned ? `Unpin ${e.row.primary}` : `Pin ${e.row.primary}`,
      onClick: s
    }, E(e.pinned ? "★" : "☆"), 9, Ml));
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
    return (r, o) => s.value ? (v(), _("button", {
      key: 0,
      type: "button",
      class: "dc-scope",
      title: `Narrow everything to ${s.value}: ${e.entry.row.id}`,
      "aria-label": `Narrow everything to ${e.entry.row.primary}`,
      onClick: a
    }, " → ", 8, El)) : I("", !0);
  }
}), Rt = /* @__PURE__ */ ue(Sl, [["__scopeId", "data-v-15dce1c0"]]), Pl = { class: "dc-cards" }, Al = { class: "dc-card__top dc-mono" }, zl = {
  key: 0,
  class: "dc-card__entity"
}, Rl = { class: "dc-card__top-right" }, Fl = ["onClick"], Tl = { class: "dc-card__primary" }, Ll = { class: "dc-card__secondary dc-mono" }, Dl = { class: "dc-card__metrics dc-mono" }, Il = { class: "dc-card__date" }, Nl = /* @__PURE__ */ ce({
  __name: "CardsView",
  setup(e) {
    const t = ke(), n = yt(), s = g(() => t.isEverything.value);
    return (a, r) => (v(), _("div", Pl, [
      (v(!0), _(ae, null, ve(C(n), (o) => (v(), _("div", {
        key: o.row.id,
        class: "dc-card"
      }, [
        m("div", Al, [
          m("span", null, [
            Ae(E(o.ordinal) + " ", 1),
            s.value ? (v(), _("span", zl, E(o.entityLabel), 1)) : I("", !0)
          ]),
          m("span", Rl, [
            J(zt, {
              status: o.row.status
            }, null, 8, ["status"]),
            J(Rt, { entry: o }, null, 8, ["entry"]),
            C(t).pinnable.value ? (v(), ge(zn, {
              key: 0,
              row: o.row,
              pinned: o.pinned
            }, null, 8, ["row", "pinned"])) : I("", !0)
          ])
        ]),
        m("button", {
          type: "button",
          class: "dc-card__open",
          onClick: (c) => C(t).activate(o.row)
        }, [
          m("span", Tl, E(o.row.primary), 1),
          m("span", Ll, E(o.row.secondary), 1)
        ], 8, Fl),
        m("div", Dl, [
          J(Je, {
            entry: o,
            metric: "metric1"
          }, {
            default: it(() => [
              Ae(E(o.labels.metric1) + " " + E(o.metric1), 1)
            ]),
            _: 2
          }, 1032, ["entry"]),
          J(Je, {
            entry: o,
            metric: "metric2"
          }, {
            default: it(() => [
              Ae(E(o.labels.metric2) + " " + E(o.metric2), 1)
            ]),
            _: 2
          }, 1032, ["entry"]),
          m("span", Il, E(o.date), 1)
        ])
      ]))), 128))
    ]));
  }
}), Ns = /* @__PURE__ */ ue(Nl, [["__scopeId", "data-v-6096ce5b"]]), Vl = { class: "dc-grid" }, Ol = ["onClick"], Kl = { class: "dc-tile__scrim" }, ql = { class: "dc-tile__top dc-mono" }, Bl = { class: "dc-tile__chip" }, Wl = { class: "dc-tile__chip" }, Ul = { class: "dc-tile__caption" }, Hl = { class: "dc-tile__secondary dc-truncate" }, Gl = { class: "dc-tile__primary" }, Xl = /* @__PURE__ */ ce({
  __name: "GridView",
  setup(e) {
    const t = ke(), n = yt();
    return (s, a) => (v(), _("div", Vl, [
      (v(!0), _(ae, null, ve(C(n), (r) => (v(), _("button", {
        key: r.row.id,
        type: "button",
        class: "dc-tile",
        style: Le({ "--dc-tile-tint": r.row.tint }),
        onClick: (o) => C(t).activate(r.row)
      }, [
        m("span", Kl, [
          m("span", ql, [
            m("span", Bl, E(r.ordinal), 1),
            m("span", Wl, E(r.score), 1)
          ]),
          m("span", Ul, [
            m("span", Hl, E(r.row.secondary), 1),
            m("span", Gl, E(r.row.primary), 1)
          ])
        ])
      ], 12, Ol))), 128))
    ]));
  }
}), Vs = /* @__PURE__ */ ue(Xl, [["__scopeId", "data-v-c39dab2f"]]), Yl = { class: "dc-links" }, jl = ["onClick"], Ql = { class: "dc-link__primary dc-truncate" }, Zl = { class: "dc-link__secondary dc-mono dc-truncate" }, Jl = /* @__PURE__ */ ce({
  __name: "LinksView",
  setup(e) {
    const t = ke(), n = yt();
    return (s, a) => (v(), _("div", Yl, [
      (v(!0), _(ae, null, ve(C(n), (r) => (v(), _("button", {
        key: r.row.id,
        type: "button",
        class: "dc-link",
        onClick: (o) => C(t).activate(r.row)
      }, [
        m("span", Ql, E(r.row.primary), 1),
        m("span", Zl, E(r.row.secondary), 1)
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
    return (s, a) => (v(), _("span", {
      class: "dc-meter",
      role: "meter",
      "aria-valuemin": "0",
      "aria-valuemax": "100",
      "aria-valuenow": Math.round(e.value * 100),
      "aria-label": e.label ?? "Score",
      title: `${e.label ?? "Score"} ${n.value}`
    }, [
      m("span", {
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
    return (a, r) => (v(), _("div", no, [
      (v(!0), _(ae, null, ve(C(n), (o) => (v(), _("div", {
        key: o.row.id,
        class: "dc-list__row",
        role: "listitem"
      }, [
        m("button", {
          type: "button",
          class: "dc-list__open",
          onClick: (c) => C(t).activate(o.row)
        }, [
          m("span", ao, E(o.ordinal), 1),
          m("span", ro, [
            m("span", lo, E(o.row.primary), 1),
            m("span", oo, E(o.row.secondary), 1)
          ])
        ], 8, so),
        s.value ? (v(), _("span", io, E(o.entityLabel), 1)) : I("", !0),
        m("span", co, [
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
        m("span", uo, [
          J(zt, {
            status: o.row.status
          }, null, 8, ["status"]),
          J(Rt, { entry: o }, null, 8, ["entry"]),
          C(t).pinnable.value ? (v(), ge(zn, {
            key: 0,
            row: o.row,
            pinned: o.pinned
          }, null, 8, ["row", "pinned"])) : I("", !0)
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
    const t = ke(), n = yt(), s = B(0);
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
    return (l, f) => (v(), _("div", po, [
      m("div", vo, [
        m("button", {
          type: "button",
          class: "dc-preview__step",
          "aria-label": "Previous result",
          disabled: s.value === 0,
          onClick: f[0] || (f[0] = (d) => c(-1))
        }, " ‹ ", 8, mo),
        m("span", ho, E(o.value), 1),
        m("button", {
          type: "button",
          class: "dc-preview__step",
          "aria-label": "Next result",
          disabled: s.value >= C(n).length - 1,
          onClick: f[1] || (f[1] = (d) => c(1))
        }, " › ", 8, _o)
      ]),
      a.value ? (v(), _("div", go, [
        m("div", {
          class: "dc-preview__media",
          style: Le({ background: a.value.row.tint }),
          "aria-hidden": "true"
        }, " preview ", 4),
        m("div", yo, [
          m("div", wo, [
            m("span", bo, [
              J(zt, {
                status: a.value.row.status
              }, null, 8, ["status"]),
              m("span", ko, E(a.value.entityLabel), 1)
            ]),
            m("span", $o, [
              J(Rt, { entry: a.value }, null, 8, ["entry"]),
              C(t).pinnable.value ? (v(), ge(zn, {
                key: 0,
                row: a.value.row,
                pinned: a.value.pinned
              }, null, 8, ["row", "pinned"])) : I("", !0)
            ])
          ]),
          m("div", null, [
            m("div", xo, E(a.value.row.primary), 1),
            m("div", Mo, E(a.value.row.secondary), 1)
          ]),
          m("dl", Co, [
            (v(!0), _(ae, null, ve(r.value, (d) => (v(), _("div", {
              key: d.key,
              class: "dc-preview__field"
            }, [
              m("dt", Eo, E(d.key), 1),
              m("dd", So, [
                d.metric && a.value ? (v(), ge(Je, {
                  key: 0,
                  entry: a.value,
                  metric: d.metric
                }, null, 8, ["entry", "metric"])) : (v(), _(ae, { key: 1 }, [
                  Ae(E(d.value), 1)
                ], 64))
              ])
            ]))), 128))
          ]),
          m("button", {
            type: "button",
            class: "dc-preview__open",
            onClick: f[2] || (f[2] = (d) => C(t).activate(a.value.row))
          }, " Open record → ")
        ])
      ])) : I("", !0)
    ]));
  }
}), qs = /* @__PURE__ */ ue(Po, [["__scopeId", "data-v-405dfdb6"]]), Ao = { class: "dc-table" }, zo = ["aria-sort"], Ro = { scope: "col" }, Fo = {
  key: 0,
  class: "dc-table__entity",
  scope: "col"
}, To = ["aria-sort"], Lo = ["aria-sort"], Do = ["aria-sort"], Io = ["onClick"], No = { class: "dc-table__num dc-mono" }, Vo = { class: "dc-table__primary" }, Oo = ["onClick"], Ko = { class: "dc-table__muted dc-mono" }, qo = {
  key: 0,
  class: "dc-table__entity dc-mono"
}, Bo = { class: "dc-table__number dc-mono" }, Wo = { class: "dc-table__number dc-mono" }, Uo = { class: "dc-table__muted dc-mono" }, Ho = /* @__PURE__ */ ce({
  __name: "TableView",
  setup(e) {
    const t = ke(), n = yt(), s = yl(), a = g(() => t.isEverything.value);
    function r(l) {
      t.query.value.sort === l ? t.toggleDirection() : t.setSort(l);
    }
    const o = (l) => t.query.value.sort !== l ? "none" : t.query.value.dir === "desc" ? "descending" : "ascending", c = g(() => new Set(t.sorts.value.map((l) => l.key)));
    return (l, f) => (v(), _("table", Ao, [
      m("thead", null, [
        m("tr", null, [
          f[4] || (f[4] = m("th", {
            class: "dc-table__num",
            scope: "col"
          }, " # ", -1)),
          m("th", {
            scope: "col",
            "aria-sort": o("name")
          }, [
            c.value.has("name") ? (v(), _("button", {
              key: 0,
              type: "button",
              class: "dc-table__sort",
              onClick: f[0] || (f[0] = (d) => r("name"))
            }, E(C(s).primary), 1)) : (v(), _(ae, { key: 1 }, [
              Ae(E(C(s).primary), 1)
            ], 64))
          ], 8, zo),
          m("th", Ro, E(C(s).secondary), 1),
          a.value ? (v(), _("th", Fo, " Entity ")) : I("", !0),
          m("th", {
            class: "dc-table__number",
            scope: "col",
            "aria-sort": o("metric1")
          }, [
            c.value.has("metric1") ? (v(), _("button", {
              key: 0,
              type: "button",
              class: "dc-table__sort",
              onClick: f[1] || (f[1] = (d) => r("metric1"))
            }, E(C(s).metric1), 1)) : (v(), _(ae, { key: 1 }, [
              Ae(E(C(s).metric1), 1)
            ], 64))
          ], 8, To),
          m("th", {
            class: "dc-table__number",
            scope: "col",
            "aria-sort": o("metric2")
          }, [
            c.value.has("metric2") ? (v(), _("button", {
              key: 0,
              type: "button",
              class: "dc-table__sort",
              onClick: f[2] || (f[2] = (d) => r("metric2"))
            }, E(C(s).metric2), 1)) : (v(), _(ae, { key: 1 }, [
              Ae(E(C(s).metric2), 1)
            ], 64))
          ], 8, Lo),
          m("th", {
            class: "dc-table__date",
            scope: "col",
            "aria-sort": o("updated")
          }, [
            c.value.has("updated") ? (v(), _("button", {
              key: 0,
              type: "button",
              class: "dc-table__sort",
              onClick: f[3] || (f[3] = (d) => r("updated"))
            }, " Updated ")) : (v(), _(ae, { key: 1 }, [
              Ae(" Updated ")
            ], 64))
          ], 8, Do),
          f[5] || (f[5] = m("th", {
            class: "dc-table__state",
            scope: "col"
          }, " State ", -1))
        ])
      ]),
      m("tbody", null, [
        (v(!0), _(ae, null, ve(C(n), (d) => (v(), _("tr", {
          key: d.row.id,
          class: "dc-table__row",
          onClick: (k) => C(t).activate(d.row)
        }, [
          m("td", No, E(d.ordinal), 1),
          m("td", Vo, [
            m("button", {
              type: "button",
              class: "dc-table__open",
              onClick: Fe((k) => C(t).activate(d.row), ["stop"])
            }, E(d.row.primary), 9, Oo),
            J(Rt, { entry: d }, null, 8, ["entry"])
          ]),
          m("td", Ko, E(d.row.secondary), 1),
          a.value ? (v(), _("td", qo, E(d.entityLabel), 1)) : I("", !0),
          m("td", Bo, [
            J(Je, {
              entry: d,
              metric: "metric1"
            }, null, 8, ["entry"])
          ]),
          m("td", Wo, [
            J(Je, {
              entry: d,
              metric: "metric2"
            }, null, 8, ["entry"])
          ]),
          m("td", Uo, E(d.date), 1),
          m("td", null, [
            J(zt, {
              status: d.row.status
            }, null, 8, ["status"])
          ])
        ], 8, Io))), 128))
      ])
    ]));
  }
}), Bs = /* @__PURE__ */ ue(Ho, [["__scopeId", "data-v-db41c5bb"]]);
function Go(e) {
  const t = Ut([]), n = B(!1), s = Ut(null);
  let a = 0;
  const r = (l, f, d) => ({
    entity: l,
    rows: f.rows.map(
      (k, y) => Is(k, y, l, e.isPinned(k.id))
    ),
    total: f.total,
    count: d ? l.count : String(f.total)
  }), o = () => {
    const l = ++a, f = e.query.value, d = e.schema.value, k = e.entities.value, y = e.limit.value, h = kn(f), x = k.map((w) => ({
      entity: w,
      // Scope the query to this entity, keeping the expression and ordering
      // but dropping facets, which belong to whichever entity is selected.
      outcome: e.source.value.query({
        // Each card is the top few of its type, wherever the shell's own
        // result set has been paged to — so this asks for the first page.
        query: { ...f, entity: w.key, facets: Yt(w), page: 1 },
        schema: d,
        entity: w,
        limit: y,
        offset: 0
      })
    }));
    if (x.every(({ outcome: w }) => !(w instanceof Promise))) {
      t.value = x.map(
        ({ entity: w, outcome: $ }) => r(w, $, h)
      ), s.value = null, n.value = !1;
      return;
    }
    n.value = !0, Promise.all(x.map(({ outcome: w }) => Promise.resolve(w))).then((w) => {
      l === a && (t.value = w.map(
        ($, z) => r(x[z].entity, $, h)
      ), s.value = null);
    }).catch((w) => {
      l === a && (s.value = w, t.value = []);
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
const Xo = {
  key: 0,
  class: "dc-types__state",
  role: "alert"
}, Yo = {
  key: 1,
  class: "dc-types__state",
  "aria-live": "polite"
}, jo = ["data-dc-pending"], Qo = ["data-dc-empty"], Zo = ["onClick"], Jo = { class: "dc-type__name" }, ei = { class: "dc-type__count dc-mono" }, ti = { class: "dc-type__sr" }, ni = {
  key: 0,
  class: "dc-type__empty"
}, si = ["onClick"], ai = { class: "dc-type__identity" }, ri = { class: "dc-type__primary dc-truncate" }, li = { class: "dc-type__secondary dc-mono dc-truncate" }, oi = { class: "dc-type__trailing dc-mono" }, ii = { class: "dc-type__metric-value" }, ci = { class: "dc-type__metric-label" }, ui = { class: "dc-type__date" }, di = ["onClick"], fi = /* @__PURE__ */ ce({
  __name: "TypeCardsView",
  setup(e) {
    const t = ke(), { previews: n, pending: s, error: a } = Go({
      source: t.source,
      schema: t.schema,
      query: t.query,
      entities: t.entities,
      limit: t.previewsPerType,
      isPinned: (o) => t.isPinnedId(o)
    }), r = g(() => !t.isPristine.value);
    return (o, c) => C(a) ? (v(), _("p", Xo, " Could not load results: " + E(C(a) instanceof Error ? C(a).message : "the data source failed."), 1)) : !C(n).length && C(s) ? (v(), _("p", Yo, " Running query… ")) : (v(), _("div", {
      key: 2,
      class: "dc-types",
      "data-dc-pending": C(s) ? "true" : "false"
    }, [
      (v(!0), _(ae, null, ve(C(n), (l) => (v(), _("section", {
        key: l.entity.key,
        class: "dc-type",
        "data-dc-empty": l.rows.length ? "false" : "true"
      }, [
        m("button", {
          type: "button",
          class: "dc-type__head",
          onClick: (f) => C(t).setEntity(l.entity.key)
        }, [
          m("span", Jo, E(l.entity.label), 1),
          m("span", ei, E(l.count), 1),
          c[0] || (c[0] = m("span", {
            class: "dc-type__go",
            "aria-hidden": "true"
          }, "→", -1)),
          m("span", ti, "Show only " + E(l.entity.label.toLowerCase()), 1)
        ], 8, Zo),
        l.rows.length ? I("", !0) : (v(), _("p", ni, E(r.value ? "No matches" : "Nothing here yet"), 1)),
        (v(!0), _(ae, null, ve(l.rows, (f) => (v(), _("div", {
          key: f.row.id,
          class: "dc-type__row"
        }, [
          m("button", {
            type: "button",
            class: "dc-type__open",
            onClick: (d) => C(t).activate(f.row)
          }, [
            m("span", ai, [
              m("span", ri, E(f.row.primary), 1),
              m("span", li, E(f.row.secondary), 1)
            ])
          ], 8, si),
          m("span", oi, [
            J(Je, {
              class: "dc-type__metric",
              entry: f,
              metric: "metric1"
            }, {
              default: it(() => [
                m("span", ii, E(f.metric1), 1),
                m("span", ci, E(f.labels.metric1), 1)
              ]),
              _: 2
            }, 1032, ["entry"]),
            m("span", ui, E(f.date), 1),
            J(Rt, { entry: f }, null, 8, ["entry"])
          ])
        ]))), 128)),
        l.entity.create ? (v(), _("button", {
          key: 1,
          type: "button",
          class: "dc-type__new",
          onClick: (f) => C(t).create(l.entity)
        }, [
          c[1] || (c[1] = m("span", {
            class: "dc-type__plus",
            "aria-hidden": "true"
          }, "+", -1)),
          Ae(" " + E(l.entity.create), 1)
        ], 8, di)) : I("", !0)
      ], 8, Qo))), 128))
    ], 8, jo));
  }
}), Ws = /* @__PURE__ */ ue(fi, [["__scopeId", "data-v-79bdfbd9"]]), pi = ["data-dc-pending"], vi = {
  key: 0,
  class: "dc-results__state",
  role: "alert"
}, mi = { class: "dc-results__detail" }, hi = {
  key: 2,
  class: "dc-results__state",
  "aria-live": "polite"
}, _i = {
  key: 3,
  class: "dc-results__state"
}, gi = { class: "dc-results__detail" }, yi = /* @__PURE__ */ ce({
  __name: "ResultsArea",
  setup(e) {
    const t = ke(), n = {
      list: pn,
      cards: Ns,
      grid: Vs,
      table: Bs,
      links: Os,
      preview: qs
    }, s = g(() => xs(t.query.value)), a = g(() => n[t.query.value.view] ?? pn), r = g(() => t.rows.value.length > 0), o = g(() => t.error.value !== null);
    return (c, l) => (v(), _("div", {
      class: "dc-results",
      "data-dc-pending": C(t).pending.value ? "true" : "false"
    }, [
      o.value ? (v(), _("p", vi, [
        l[1] || (l[1] = m("span", { class: "dc-results__headline" }, "Could not load results", -1)),
        m("span", mi, E(C(t).error.value instanceof Error ? C(t).error.value.message : "The data source failed."), 1)
      ])) : s.value ? (v(), ge(Ws, { key: 1 })) : !r.value && C(t).pending.value ? (v(), _("p", hi, [...l[2] || (l[2] = [
        m("span", { class: "dc-results__detail" }, "Running query…", -1)
      ])])) : r.value ? (v(), ge(Pa(a.value), { key: 4 })) : (v(), _("div", _i, [
        l[3] || (l[3] = m("span", { class: "dc-results__headline" }, "Nothing matches this query", -1)),
        m("span", gi, E(C(t).summary.value), 1),
        C(t).isPristine.value ? I("", !0) : (v(), _("button", {
          key: 0,
          type: "button",
          class: "dc-results__clear",
          onClick: l[0] || (l[0] = (f) => C(t).clearFilters())
        }, E(C(t).isEverything.value ? "Clear filters" : "Search everything instead"), 1))
      ]))
    ], 8, pi));
  }
}), Us = /* @__PURE__ */ ue(yi, [["__scopeId", "data-v-1ccb2731"]]), wi = ["data-dc-theme"], bi = ["data-dc-width", "data-dc-align"], ki = { class: "dc-shell__panel" }, $i = /* @__PURE__ */ ce({
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
    const s = e, a = n, r = Gt(e, "open"), o = Gt(e, "pinned"), c = wn(), l = _t(_s, null), f = s.route || l ? null : Ta(), d = s.route ?? l ?? f;
    Ze(() => f?.dispose?.());
    const k = g(() => er({ seed: s.schema.key })), y = g(() => s.source ?? k.value), h = vr({
      schema: () => s.schema,
      adapter: d,
      defaults: () => s.defaults,
      navigationMode: () => s.navigationMode,
      facetNavigationMode: () => s.facetNavigationMode
    }), x = mr({
      source: y,
      query: h.query,
      schema: g(() => s.schema),
      entity: h.entity,
      limit: g(() => s.limit)
    });
    xe(h.query, (b) => a("query-change", b)), xe(
      [x.pageCount, x.pending, h.query],
      () => {
        if (x.pending.value) return;
        const b = x.pageCount.value;
        h.query.value.page > b && h.setPage(b, "replace");
      },
      // Immediately, since a pasted URL is past the end before anything changes;
      // and after the render, so the correction is a navigation the mounted shell
      // makes rather than one it makes on the way up. An async source is still
      // pending here and corrects itself when its count lands.
      { immediate: !0, flush: "post" }
    );
    const w = ms() ?? "dc-query-panel", $ = B(null);
    function z() {
      r.value && (r.value = !1, At(() => {
        $.value?.$el?.querySelector(".dc-header__trigger")?.focus();
      }));
    }
    const q = g(() => new Set(o.value));
    function W(b) {
      const P = new Set(q.value);
      P.has(b.id) ? P.delete(b.id) : P.add(b.id), o.value = [...P], a("toggle-pin", b);
    }
    function D(b, P) {
      h.setExpression(ar(s.schema, h.query.value, b)), h.setEntity(P?.key ?? null), a("drill", b, P);
    }
    const F = rr({
      ...h,
      schema: g(() => s.schema),
      entities: g(() => s.schema.entities),
      rows: x.rows,
      total: x.total,
      limit: g(() => s.limit),
      offset: x.offset,
      pageCount: x.pageCount,
      pending: x.pending,
      error: x.error,
      source: y,
      previewsPerType: g(() => s.previewsPerType),
      pinnable: g(() => s.pinnable === !0),
      isPinned: (b) => q.value.has(b.id),
      isPinnedId: (b) => q.value.has(b),
      togglePin: W,
      activate: (b) => a("activate", b),
      create: (b) => a("create", b),
      drill: D
    }), N = g(() => {
      if (!(!s.accent && !s.tokens))
        return { ...s.tokens, ...s.accent ? { "--dc-accent": s.accent } : {} };
    });
    return t({
      query: h.query,
      openPanel: () => {
        r.value = !0;
      },
      closePanel: z
    }), (b, P) => (v(), _("div", {
      class: "dc-shell",
      "data-dc-theme": e.theme,
      style: Le(N.value)
    }, [
      m("div", {
        class: "dc-shell__head",
        "data-dc-width": e.matchWidth,
        "data-dc-align": e.matchWidth === "shrink" ? e.headAlign : void 0
      }, [
        J(Fs, {
          ref_key: "headerRef",
          ref: $,
          expanded: r.value,
          "panel-id": C(w),
          onToggle: P[0] || (P[0] = (Z) => r.value = !r.value)
        }, Jn({ _: 2 }, [
          c.actions ? {
            name: "actions",
            fn: it(() => [
              Ke(b.$slots, "actions", {}, void 0, !0)
            ]),
            key: "0"
          } : void 0
        ]), 1032, ["expanded", "panel-id"]),
        r.value ? (v(), _(ae, { key: 0 }, [
          m("div", {
            class: "dc-shell__scrim",
            onClick: z
          }),
          m("div", ki, [
            J(Ls, {
              "panel-id": C(w),
              views: e.views,
              onClose: z
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
        ], 64)) : I("", !0)
      ], 8, bi),
      Ke(b.$slots, "results", {
        rows: C(F).rows.value,
        total: C(F).total.value,
        offset: C(F).offset.value,
        pageCount: C(F).pageCount.value,
        query: C(F).query.value,
        pending: C(F).pending.value
      }, () => [
        J(Us)
      ], !0)
    ], 12, wi));
  }
}), xi = /* @__PURE__ */ ue($i, [["__scopeId", "data-v-19114348"]]), Ct = (e) => e.separator !== !0 && e.heading !== !0 && e.disabled !== !0, Mi = ["aria-label"], Ci = ["role", "aria-label"], Ei = ["data-dc-item"], Si = {
  key: 0,
  class: "dc-menu__rule",
  role: "separator"
}, Pi = ["role", "aria-checked", "aria-haspopup", "aria-expanded", "aria-disabled", "disabled", "data-dc-item", "onClick", "onMouseenter"], Ai = {
  class: "dc-menu__mark",
  "aria-hidden": "true"
}, zi = { class: "dc-menu__label dc-truncate" }, Ri = {
  key: 0,
  class: "dc-menu__key dc-mono"
}, Fi = {
  key: 1,
  class: "dc-menu__more",
  "aria-hidden": "true"
}, Ti = /* @__PURE__ */ ce({
  __name: "MenuList",
  props: {
    items: {},
    at: {},
    label: {},
    autofocus: { type: Boolean }
  },
  emits: ["choose", "dismiss"],
  setup(e, { expose: t, emit: n }) {
    const s = e, a = n, r = B(null), o = B([]), c = B(null), l = B(null), f = B(null), d = B(!1), k = g(
      () => s.items.flatMap((b, P) => Ct(b) ? [P] : [])
    ), y = g(() => {
      const b = [{ entries: [] }];
      return s.items.forEach((P, Z) => {
        P.heading ? b.push({ heading: P, entries: [] }) : b[b.length - 1]?.entries.push({ item: P, index: Z });
      }), b.filter((P) => P.entries.length > 0);
    }), h = B({ x: s.at.x, y: s.at.y });
    async function x() {
      h.value = { x: s.at.x, y: s.at.y }, await At();
      const b = r.value?.getBoundingClientRect();
      if (!b) return;
      const P = 8;
      let Z = s.at.x, oe = s.at.y;
      if (Z + b.width > window.innerWidth - P) {
        const fe = s.at.mirrorX === void 0 ? null : s.at.mirrorX - b.width;
        Z = fe !== null && fe >= P ? fe : window.innerWidth - b.width - P;
      }
      oe + b.height > window.innerHeight - P && (oe = window.innerHeight - b.height - P), h.value = { x: Math.max(P, Z), y: Math.max(P, oe) };
    }
    const w = g(() => ({ left: `${h.value.x}px`, top: `${h.value.y}px` }));
    function $(b) {
      c.value = b, b !== null && At(() => o.value[b]?.focus());
    }
    function z(b, P) {
      const Z = k.value;
      if (Z.length === 0) return null;
      if (b === null) return P === 1 ? Z[0] ?? null : Z[Z.length - 1] ?? null;
      const oe = Z.indexOf(b);
      return oe === -1 ? Z[0] ?? null : Z[(oe + P + Z.length) % Z.length] ?? null;
    }
    function q(b, P) {
      if (!s.items[b]?.items?.length) return;
      const oe = o.value[b]?.getBoundingClientRect(), fe = r.value?.getBoundingClientRect();
      !oe || !fe || (f.value = { x: fe.right - 4, y: oe.top - 4, mirrorX: fe.left + 4 }, l.value = b, d.value = P);
    }
    function W(b) {
      const P = l.value;
      l.value = null, f.value = null, b && P !== null && $(P);
    }
    function D(b) {
      const P = s.items[b];
      if (!(!P || !Ct(P))) {
        if (P.items?.length) {
          q(b, !0);
          return;
        }
        a("choose", P);
      }
    }
    function F(b) {
      const P = b.key;
      if (P === "Escape") {
        b.preventDefault(), b.stopPropagation(), l.value !== null ? W(!0) : a("dismiss");
        return;
      }
      if (P === "ArrowDown" || P === "ArrowUp") {
        b.preventDefault(), b.stopPropagation(), W(!1), $(z(c.value, P === "ArrowDown" ? 1 : -1));
        return;
      }
      if (P === "Home" || P === "End") {
        b.preventDefault(), b.stopPropagation(), W(!1), $(z(null, P === "Home" ? 1 : -1));
        return;
      }
      if (P === "ArrowRight") {
        const Z = c.value;
        Z !== null && s.items[Z]?.items?.length && (b.preventDefault(), b.stopPropagation(), q(Z, !0));
        return;
      }
      if (P === "ArrowLeft") {
        l.value !== null && (b.preventDefault(), b.stopPropagation(), W(!0));
        return;
      }
      if (P === "Enter" || P === " ") {
        const Z = c.value;
        if (Z === null) return;
        b.preventDefault(), b.stopPropagation(), D(Z);
      }
    }
    function N(b) {
      const P = s.items[b];
      !P || !Ct(P) || (l.value !== null && l.value !== b && W(!1), $(b), P.items?.length && q(b, !1));
    }
    return Aa(() => {
      x(), s.autofocus && $(z(null, 1));
    }), xe(() => s.at, x, { deep: !0 }), xe(() => s.items, () => void x(), { deep: !0 }), Ze(() => {
      l.value = null;
    }), t({ root: r }), (b, P) => {
      const Z = hs("MenuList", !0);
      return v(), _("div", {
        ref_key: "root",
        ref: r,
        class: "dc-menu",
        role: "menu",
        "aria-label": e.label,
        style: Le(w.value),
        onKeydown: F
      }, [
        (v(!0), _(ae, null, ve(y.value, (oe, fe) => (v(), _("div", {
          key: `${fe}-${oe.heading?.label ?? ""}`,
          class: "dc-menu__group",
          role: oe.heading ? "group" : "none",
          "aria-label": oe.heading?.label
        }, [
          oe.heading ? (v(), _("div", {
            key: 0,
            class: "dc-menu__heading dc-truncate",
            "aria-hidden": "true",
            "data-dc-item": oe.heading.id
          }, E(oe.heading.label), 9, Ei)) : I("", !0),
          (v(!0), _(ae, null, ve(oe.entries, ({ item: j, index: Me }) => (v(), _(ae, {
            key: j.id ?? `${Me}-${j.label ?? ""}`
          }, [
            j.separator ? (v(), _("div", Si)) : (v(), _("button", {
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
              onClick: (Pe) => D(Me),
              onMouseenter: (Pe) => N(Me)
            }, [
              m("span", Ai, E(j.checked ? "✓" : ""), 1),
              m("span", zi, E(j.label), 1),
              j.shortcut ? (v(), _("span", Ri, E(j.shortcut), 1)) : j.items?.length ? (v(), _("span", Fi, "›")) : I("", !0)
            ], 40, Pi))
          ], 64))), 128))
        ], 8, Ci))), 128)),
        l.value !== null && f.value ? (v(), ge(Z, {
          key: l.value,
          items: e.items[l.value]?.items ?? [],
          at: f.value,
          label: e.items[l.value]?.label,
          autofocus: d.value,
          onChoose: P[0] || (P[0] = (oe) => a("choose", oe)),
          onDismiss: P[1] || (P[1] = (oe) => W(!0))
        }, null, 8, ["items", "at", "label", "autofocus"])) : I("", !0)
      ], 44, Mi);
    };
  }
}), Hs = /* @__PURE__ */ ue(Ti, [["__scopeId", "data-v-9b1413fa"]]), Li = ["data-dc-theme", "aria-label"], Di = ["aria-expanded", "aria-disabled", "disabled", "data-dc-menu", "tabindex", "onClick", "onMouseenter"], Ii = /* @__PURE__ */ ce({
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
    }), a = t, r = B(null), o = B([]), c = B(null), l = B(null), f = B(!1), d = g(
      () => n.menus.flatMap((D, F) => Ct(D) ? [F] : [])
    );
    function k(D, F) {
      const N = o.value[D]?.getBoundingClientRect(), b = n.menus[D];
      !N || !b || !Ct(b) || (l.value = { x: N.left, y: N.bottom + 2, mirrorX: N.right }, c.value = D, f.value = F);
    }
    function y(D) {
      const F = c.value;
      c.value = null, l.value = null, D && F !== null && o.value[F]?.focus();
    }
    function h(D) {
      c.value === D ? y(!0) : k(D, !1);
    }
    function x(D) {
      c.value === null || c.value === D || k(D, !1);
    }
    function w(D, F) {
      const N = d.value;
      if (N.length === 0) return null;
      if (D === null) return F === 1 ? N[0] ?? null : N[N.length - 1] ?? null;
      const b = N.indexOf(D);
      return b === -1 ? N[0] ?? null : N[(b + F + N.length) % N.length] ?? null;
    }
    function $(D) {
      const F = D.key;
      if (F === "Escape") {
        if (c.value === null) return;
        D.preventDefault(), y(!0);
        return;
      }
      if (F === "ArrowDown" && c.value === null) {
        const P = z();
        if (P === null) return;
        D.preventDefault(), k(P, !0);
        return;
      }
      if (F !== "ArrowLeft" && F !== "ArrowRight") return;
      const N = c.value ?? z(), b = w(N, F === "ArrowRight" ? 1 : -1);
      b !== null && (D.preventDefault(), c.value !== null ? k(b, !0) : o.value[b]?.focus());
    }
    function z() {
      const D = o.value.findIndex((F) => F === document.activeElement);
      return D === -1 ? d.value[0] ?? null : D;
    }
    function q(D) {
      const F = D.target;
      !F || r.value?.contains(F) || y(!1);
    }
    xe(c, (D) => {
      D !== null ? window.addEventListener("pointerdown", q, !0) : window.removeEventListener("pointerdown", q, !0);
    }), Ze(() => window.removeEventListener("pointerdown", q, !0));
    function W(D) {
      y(!0), D.action?.(), a("choose", D);
    }
    return (D, F) => (v(), _("div", {
      ref_key: "bar",
      ref: r,
      class: "dc-shell dc-menubar",
      role: "menubar",
      "data-dc-theme": e.theme,
      "aria-label": e.label ?? "Main menu",
      style: Le(s.value),
      onKeydown: $
    }, [
      (v(!0), _(ae, null, ve(e.menus, (N, b) => (v(), _("button", {
        key: N.id ?? N.label ?? b,
        ref_for: !0,
        ref: (P) => {
          P && (o.value[b] = P);
        },
        type: "button",
        class: "dc-menubar__item",
        role: "menuitem",
        "aria-haspopup": "menu",
        "aria-expanded": c.value === b,
        "aria-disabled": N.disabled ? "true" : void 0,
        disabled: N.disabled,
        "data-dc-menu": N.id ?? N.label,
        tabindex: b === (d.value[0] ?? 0) ? 0 : -1,
        onClick: (P) => h(b),
        onMouseenter: (P) => x(b)
      }, E(N.label), 41, Di))), 128)),
      c.value !== null && l.value ? (v(), ge(Hs, {
        key: c.value,
        items: e.menus[c.value]?.items ?? [],
        at: l.value,
        label: e.menus[c.value]?.label,
        autofocus: f.value,
        onChoose: W,
        onDismiss: F[0] || (F[0] = (N) => y(!0))
      }, null, 8, ["items", "at", "label", "autofocus"])) : I("", !0)
    ], 44, Li));
  }
}), uu = /* @__PURE__ */ ue(Ii, [["__scopeId", "data-v-93dbd2e4"]]), Ni = ["aria-label", "aria-expanded", "disabled"], Vi = { "aria-hidden": "true" }, Oi = /* @__PURE__ */ ce({
  __name: "MenuButton",
  props: {
    items: {},
    label: {},
    glyph: { default: "⋯" }
  },
  emits: ["choose"],
  setup(e, { emit: t }) {
    const n = t, s = B(null), a = B(null), r = B(null), o = B(!1), c = g(() => r.value !== null);
    function l(x) {
      const w = s.value?.getBoundingClientRect();
      w && (r.value = { x: w.left, y: w.bottom + 4, mirrorX: w.right }, o.value = x);
    }
    function f(x) {
      r.value = null, x && s.value?.focus();
    }
    function d() {
      c.value ? f(!0) : l(!1);
    }
    function k(x) {
      x.key !== "ArrowDown" || c.value || (x.preventDefault(), l(!0));
    }
    function y(x) {
      const w = x.target;
      w && (s.value?.contains(w) || a.value?.root?.contains(w) || f(!1));
    }
    xe(c, (x) => {
      x ? window.addEventListener("pointerdown", y, !0) : window.removeEventListener("pointerdown", y, !0);
    }), Ze(() => window.removeEventListener("pointerdown", y, !0));
    function h(x) {
      f(!0), x.action?.(), n("choose", x);
    }
    return (x, w) => (v(), _(ae, null, [
      m("button", {
        ref_key: "trigger",
        ref: s,
        type: "button",
        class: "dc-menu-button",
        "aria-label": e.label,
        "aria-haspopup": "menu",
        "aria-expanded": c.value,
        disabled: e.items.length === 0,
        onClick: d,
        onKeydown: k
      }, [
        m("span", Vi, E(e.glyph), 1)
      ], 40, Ni),
      r.value ? (v(), ge(Hs, {
        key: 0,
        ref_key: "menu",
        ref: a,
        items: e.items,
        at: r.value,
        label: e.label,
        autofocus: o.value,
        onChoose: h,
        onDismiss: w[0] || (w[0] = ($) => f(!0))
      }, null, 8, ["items", "at", "label", "autofocus"])) : I("", !0)
    ], 64));
  }
}), Rn = /* @__PURE__ */ ue(Oi, [["__scopeId", "data-v-48f5ada5"]]), wt = (e) => e.kind === "split", O = (e) => e.kind === "group", G = (e) => e.kind === "float", rt = { x: 16, y: 16, w: 360, h: 260 }, jt = 28, Gs = 120, vn = 220, Xs = 38, dt = 6;
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
function du(e, t, n) {
  return {
    kind: "group",
    panels: e,
    ...t ? { active: t } : {},
    ...n ? { title: n } : {}
  };
}
const ie = (e) => typeof e == "string", Fn = (e) => ie(e) ? Te(e) : e, Tt = (e) => ie(e) ? [e] : We(e), ls = (e) => e.panels.filter(ie), Ki = (e) => e.panels.filter((t) => !ie(t)), Se = (e, t) => e.panels.includes(t);
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
const In = (e, t, n) => Dn("row", e, t, n), fu = (e, t, n) => Dn("column", e, t, n);
function me(e) {
  return {
    ...e.title ? { title: e.title } : {},
    ...e.fixedView ? { fixedView: !0 } : {},
    ...e.headless ? { headless: !0 } : {}
  };
}
const ct = (e) => e.fixedView === !0 || e.headless === !0 || !!e.title, pu = (e) => ({ ...e, headless: !0 }), vu = (e) => ({ ...e, fixedView: !0 }), qi = (e) => e === "left" || e === "right" ? "row" : "column";
function We(e) {
  return O(e) ? e.panels.flatMap(Tt) : G(e) ? e.frames.flatMap((t) => We(t.node)) : e.children.flatMap(We);
}
function ee(e, t) {
  return O(e) ? e.panels.some((n) => ie(n) ? n === t : ee(n, t)) : G(e) ? e.frames.some((n) => ee(n.node, t)) : e.children.some((n) => ee(n, t));
}
const Ys = (e) => We(e).length === 0, mn = (e) => !O(e) && ct(e), hn = (e) => Ys(e) && !mn(e);
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
  if (O(e)) {
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
  if (O(e) && Se(e, t)) return e;
  for (const n of Nn(e)) {
    const s = pt(n, t);
    if (s) return s;
  }
  return null;
}
function Bi(e) {
  const t = Nn(e).flatMap(Bi);
  return O(e) ? [e, ...t] : t;
}
function _e(e, t) {
  if (O(e)) {
    for (const n of Ki(e)) {
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
  if (O(e)) return Lt(e, t, (r) => vt(r, t, n));
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
function Wi(e, t, n) {
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
function Ui(e, t, n = !0) {
  return vt(e, t, Zs(n));
}
function mu(e, t) {
  const n = _e(e, t);
  return n ? Ui(e, t, !je(n)) : e;
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
function Hi(e, t, n = !0) {
  return vt(e, t, Js(n));
}
function hu(e, t) {
  const n = _e(e, t);
  return n ? Hi(e, t, !st(n)) : e;
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
function Gi(e, t, n = !0) {
  return Vn(e, t, Zs(n));
}
function Xi(e, t, n = !0) {
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
function Yi(e, t) {
  const n = [...t];
  let s = e;
  return t.forEach((a, r) => {
    s && (G(s) && (n[r] = s.frames.length - 1), s = Qe(s, [a]));
  }), n;
}
function qt(e, t, n, s) {
  if (O(e)) return Lt(e, n, (o) => qt(o, t, n, s));
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
function ji(e, t, n) {
  return G(e) ? { ...e, frames: [...e.frames, Zt(Te(t), n)] } : O(e) ? ta(e, t) : {
    kind: "split",
    direction: e.direction,
    children: [...e.children, Te(t)],
    sizes: [...Be(e), 1],
    ...me(e)
  };
}
function ea(e, t, n, s) {
  const a = n[0];
  if (a === void 0) return ji(e, t, s);
  const r = n.slice(1), o = (d, k) => k === a ? ea(d, t, r, s) : lt(d, t);
  if (G(e)) {
    const d = e.frames.flatMap((k, y) => {
      const h = o(k.node, y);
      return h ? [h === k.node ? k : { ...k, node: h }] : [];
    });
    return { ...e, frames: d };
  }
  if (O(e)) {
    const d = ut(e), k = [];
    e.panels.forEach((x, w) => {
      if (ie(x)) {
        x !== t && k.push(x);
        return;
      }
      const $ = o(x, w);
      $ && k.push($);
    });
    const h = e.active && k.some((x) => Tt(x).includes(e.active)) ? e.active : be(k[d] ?? k[k.length - 1]);
    return {
      kind: "group",
      panels: k,
      ...h ? { active: h } : {},
      ...me(e)
    };
  }
  const c = Be(e), l = [], f = [];
  return e.children.forEach((d, k) => {
    const y = o(d, k);
    y && (l.push(y), f.push(c[k] ?? 0));
  }), { kind: "split", direction: e.direction, children: l, sizes: f, ...me(e) };
}
function us(e, t, n, s) {
  const a = Qe(e, n);
  return !a || !Ys(a) || !ee(e, t) ? e : he(ea(e, t, n, s));
}
function rn(e, t) {
  if (O(e)) return Lt(e, t, (a) => rn(a, t));
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
  const t = O(e) ? e.panels.length : e.children.length;
  return e.places?.length === t ? e.places : void 0;
};
function he(e) {
  if (O(e)) return Qi(e);
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
    const f = he(c), d = t[l] ?? 0;
    if (hn(f)) return;
    if (!n && wt(f) && f.direction === e.direction && !ze(f) && !ct(f)) {
      const y = Be(f);
      f.children.forEach((h, x) => {
        s.push(h), a.push(d * (y[x] ?? 0));
      });
      return;
    }
    s.push(f), a.push(d);
    const k = n?.[l];
    k && r.push(k);
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
function Qi(e) {
  if (e.panels.every(ie)) return e;
  const t = be(e), n = ze(e), s = [], a = [];
  e.panels.forEach((c, l) => {
    const f = n?.[l];
    if (ie(c)) {
      s.push(c), f && a.push(f);
      return;
    }
    const d = he(c);
    if (!hn(d)) {
      if (O(d) && !ct(d) && !ze(d)) {
        s.push(...d.panels);
        return;
      }
      s.push(d), f && a.push(f);
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
  if (O(e)) {
    if (!ee(e, t)) return e;
    const o = ut(e), c = [];
    for (const d of e.panels) {
      if (ie(d)) {
        d !== t && c.push(d);
        continue;
      }
      const k = lt(d, t);
      k && c.push(k);
    }
    if (c.length === 0) return null;
    const f = e.active && c.some((d) => Tt(d).includes(e.active)) ? e.active : be(c[o] ?? c[c.length - 1]);
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
    (x) => ee(x, n) ? Mt(x, t, n, s, a) : x
  );
  if (s === "float") return e;
  const o = (h) => Lt(h, n, (x) => Mt(x, t, n, s, a));
  if (s === "center")
    return O(e) ? Se(e, n) ? ta(e, t, a) : o(e) : G(e) ? r(e) : {
      ...e,
      children: e.children.map(
        (h) => ee(h, n) ? Mt(h, t, n, s, a) : h
      )
    };
  const c = qi(s), l = s === "left" || s === "top", f = (h) => ({
    kind: "split",
    direction: c,
    children: l ? [Te(t), h] : [h, Te(t)],
    sizes: [0.5, 0.5]
  });
  if (O(e)) return Se(e, n) ? f(e) : o(e);
  if (G(e)) return r(e);
  const d = Be(e), k = e.children.findIndex(
    (h) => O(h) && Se(h, n)
  );
  if (k >= 0 && e.direction === c) {
    const h = (d[k] ?? 0) / 2, x = [...e.children], w = [...d];
    return x.splice(l ? k : k + 1, 0, Te(t)), w.splice(k, 1, h, h), {
      kind: "split",
      direction: c,
      children: x,
      sizes: w,
      ...me(e)
    };
  }
  const y = e.children.map((h) => ee(h, n) ? O(h) && Se(h, n) ? f(h) : Mt(h, t, n, s) : h);
  return {
    kind: "split",
    direction: e.direction,
    children: y,
    sizes: d,
    ...me(e)
  };
}
function mt(e, t) {
  if (O(e)) {
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
  if (O(e)) {
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
  if (O(e)) {
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
  if (O(e)) {
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
  if (!O(e) && s.some(({ node: a }) => O(a) && Se(a, t))) {
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
function _u(e, t, n) {
  const s = Dt(
    e,
    t,
    (a) => wt(a) && a.direction !== n ? { ...a, direction: n } : a
  );
  return s ? he(s) : e;
}
function sa(e) {
  return G(e) ? [e] : ze(e) || ct(e) ? [e] : O(e) ? [...e.panels] : e.children.flatMap(sa);
}
function aa(e, t) {
  if (O(e)) return e;
  const n = Nn(e).map(sa), s = n.flat(), a = t && s.some((o) => Tt(o).includes(t)) ? t : void 0, r = Zi(e, n);
  return he({
    kind: "group",
    panels: s,
    ...a ? { active: a } : {},
    ...me(e),
    ...r ? { places: r } : {}
  });
}
function Zi(e, t) {
  const n = G(e) ? e.frames.map(({ node: s, ...a }) => a) : ze(e);
  if (n)
    return t.every((s) => s.length === 1) ? n : void 0;
}
function Ji(e, t) {
  const n = Dt(e, t, (s) => aa(s, t));
  return n ? he(n) : e;
}
function Kn(e, t, n) {
  if (O(e) && Se(e, t)) {
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
  if (O(e)) return e;
  if (G(e)) {
    const a = e.frames.findIndex(
      (c) => O(c.node) && c.node.panels.includes(t)
    ), r = e.frames[a], o = r && O(r.node) ? r.node : null;
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
function ec(e, t, n) {
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
function gu(e, t, n) {
  const s = Dt(
    e,
    t,
    (a) => G(a) ? a : la(a, n)
  );
  return s ? he(s) : O(e) && Se(e, t) ? Ln([e], n) : e;
}
function tc(e, t) {
  const n = (a) => t === "column" ? a.rect.y : a.rect.x, s = (a) => t === "column" ? a.rect.x : a.rect.y;
  return [...e].sort((a, r) => n(a) - n(r) || s(a) - s(r));
}
function oa(e, t) {
  const n = tc(e.frames, t);
  return {
    kind: "split",
    direction: t,
    children: n.map((s) => s.node),
    ...me(e),
    places: n.map(({ node: s, ...a }) => a)
  };
}
function yu(e, t, n = "row") {
  const s = Dt(
    e,
    t,
    (a) => G(a) ? oa(a, n) : a
  );
  return s ? he(s) : e;
}
function ia(e) {
  if (G(e)) return null;
  const t = O(e) ? e.panels.length === 1 ? e.panels[0] : void 0 : e.children.length === 1 ? e.children[0] : void 0;
  return t === void 0 || ie(t) || O(t) && t.panels.length === 1 && ie(t.panels[0]) ? null : t;
}
const nc = (e) => {
  const { title: t, fixedView: n, headless: s, ...a } = e;
  return a;
};
function sc(e, t) {
  const n = ia(e);
  return n ? t === "inner" ? n : { ...nc(n), ...me(e) } : e;
}
function gt(e) {
  return e.title ? e.title : O(e) ? "" : G(e) ? "Desktop" : e.direction === "row" ? "Row" : "Column";
}
function Pt(e, t) {
  if (O(e)) {
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
    const d = [...e.frames];
    return d[s] = { ...l, node: f }, { ...e, frames: d };
  }
  if (O(e)) {
    const l = e.panels[s];
    if (l === void 0 || ie(l)) return e;
    const f = ot(l, a, n);
    if (f === l) return e;
    const d = [...e.panels];
    return d[s] = f, { ...e, panels: d };
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
  if (O(e)) {
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
  if (!O(e) || e.panels.length >= 2) return e;
  const t = e.panels[0];
  return t !== void 0 && !ie(t) ? e : { ...In([ac(e)]), ...me(e) };
}
const ac = (e) => {
  if (!e.title) return e;
  const { title: t, ...n } = e;
  return n;
};
function ps(e) {
  return e.length === 0 ? null : In(e.map(Te));
}
function rc(e, t) {
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
          (f, d) => Zt(Te(f), {
            x: rt.x + (l + d) * jt,
            y: rt.y + (l + d) * jt
          })
        )
      ]
    };
  }
  return Qt(he(In([r, ...c.map(Te)])));
}
const qn = Symbol("dc.windowContext");
function lc(e) {
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
const oc = ["data-dc-glyph"], ic = { class: "dc-glyph__line" }, cc = ["d"], uc = {
  key: 0,
  class: "dc-glyph__aqua"
}, dc = ["d"], fc = /* @__PURE__ */ ce({
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
    return (s, a) => (v(), _("svg", {
      class: "dc-glyph",
      "data-dc-glyph": e.kind,
      viewBox: "0 0 10 10",
      "aria-hidden": "true",
      focusable: "false"
    }, [
      m("g", ic, [
        (v(!0), _(ae, null, ve(t[e.kind], (r) => (v(), _("path", {
          key: r,
          d: r
        }, null, 8, cc))), 128))
      ]),
      n[e.kind] ? (v(), _("g", uc, [
        (v(!0), _(ae, null, ve(n[e.kind], (r) => (v(), _("path", {
          key: r,
          d: r
        }, null, 8, dc))), 128))
      ])) : I("", !0)
    ], 8, oc));
  }
}), ht = /* @__PURE__ */ ue(fc, [["__scopeId", "data-v-4d2872c0"]]), pc = ["data-dc-order", "data-dc-path", "data-dc-maximized", "data-dc-minimized", "data-dc-dragging"], vc = ["data-dc-movable"], mc = { class: "dc-float__title dc-truncate" }, hc = {
  key: 1,
  class: "dc-float__controls dc-controls"
}, _c = ["aria-label", "aria-pressed", "data-dc-minimize"], gc = ["aria-label", "aria-pressed", "data-dc-maximize"], yc = ["aria-label", "data-dc-close"], wc = { class: "dc-float__content" }, bc = ["data-dc-handle", "onPointerdown"], kc = /* @__PURE__ */ ce({
  __name: "WindowFloat",
  props: {
    frame: {},
    path: {},
    order: {},
    place: {}
  },
  setup(e) {
    const t = e, n = Bn(), s = g(() => be(t.frame.node)), a = g(() => n.panelFor(s.value)?.fixed === !0), r = g(() => je(t.frame)), o = g(() => st(t.frame)), c = g(() => r.value || o.value), l = g(() => n.resizable.value && !a.value && !c.value), f = g(() => n.movable.value && !a.value && !c.value), d = g(() => {
      const F = We(t.frame.node);
      return F.length === 1 ? F[0] ?? null : null;
    }), k = g(() => d.value !== null && n.closable(d.value)), y = g(() => t.frame.node.headless === !0), h = g(
      () => !y.value && (!O(t.frame.node) || o.value)
    ), x = g(
      () => t.frame.title || gt(t.frame.node) || Pt(t.frame.node, (F) => n.panelFor(F)?.title)
    ), w = g(() => n.spaceMenu(t.path));
    function $(F) {
      F.target?.closest("button, a, input, select, textarea, label") || n.beginFrameDragAt(t.path, F, "move");
    }
    function z(F) {
      F.target?.closest("button, a, input, select, textarea, label") || (o.value ? n.toggleMinimizeAt(t.path) : n.toggleMaximizeAt(t.path));
    }
    const q = g(() => {
      const F = n.framing.value;
      return F !== null && ee(t.frame.node, F);
    }), W = g(() => ({
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
    })), D = ["n", "s", "e", "w", "nw", "ne", "sw", "se"];
    return (F, N) => (v(), _("div", {
      class: "dc-float",
      style: Le(W.value),
      "data-dc-order": e.order,
      "data-dc-path": e.path.join("/"),
      "data-dc-maximized": r.value ? "true" : "false",
      "data-dc-minimized": o.value ? "true" : "false",
      "data-dc-dragging": q.value ? "true" : "false",
      onPointerdown: N[3] || (N[3] = (b) => C(n).raiseAt(e.path))
    }, [
      h.value ? (v(), _("header", {
        key: 0,
        class: "dc-float__bar",
        "data-dc-movable": f.value ? "true" : "false",
        onPointerdown: $,
        onDblclick: z
      }, [
        m("span", mc, E(x.value), 1),
        w.value.length ? (v(), ge(Rn, {
          key: 0,
          items: w.value,
          label: `${x.value} menu`
        }, null, 8, ["items", "label"])) : I("", !0),
        !a.value || o.value && k.value && d.value ? (v(), _("div", hc, [
          a.value ? I("", !0) : (v(), _("button", {
            key: 0,
            type: "button",
            class: "dc-float__button dc-control",
            "aria-label": `${o.value ? "Unroll" : "Minimize"} ${x.value}`,
            "aria-pressed": o.value,
            "data-dc-minimize": s.value,
            onClick: N[0] || (N[0] = (b) => C(n).toggleMinimizeAt(e.path))
          }, [
            J(ht, {
              kind: o.value ? "unroll" : "minimize"
            }, null, 8, ["kind"])
          ], 8, _c)),
          a.value ? I("", !0) : (v(), _("button", {
            key: 1,
            type: "button",
            class: "dc-float__button dc-control",
            "aria-label": `${r.value ? "Restore" : "Maximize"} ${x.value}`,
            "aria-pressed": r.value,
            "data-dc-maximize": s.value,
            onClick: N[1] || (N[1] = (b) => C(n).toggleMaximizeAt(e.path))
          }, [
            J(ht, {
              kind: r.value ? "restore" : "maximize"
            }, null, 8, ["kind"])
          ], 8, gc)),
          o.value && k.value && d.value ? (v(), _("button", {
            key: 2,
            type: "button",
            class: "dc-float__button dc-control",
            "aria-label": `Close ${x.value}`,
            "data-dc-close": d.value,
            onClick: N[2] || (N[2] = (b) => C(n).close(d.value))
          }, [
            J(ht, { kind: "close" })
          ], 8, yc)) : I("", !0)
        ])) : I("", !0)
      ], 40, vc)) : I("", !0),
      m("div", wc, [
        Ke(F.$slots, "default", {}, void 0, !0)
      ]),
      (v(!0), _(ae, null, ve(l.value ? D : [], (b) => (v(), _("span", {
        key: b,
        class: "dc-float__grip",
        "data-dc-handle": b,
        "aria-hidden": "true",
        onPointerdown: Fe((P) => C(n).beginFrameDragAt(e.path, P, b), ["stop"])
      }, null, 40, bc))), 128))
    ], 44, pc));
  }
}), $c = /* @__PURE__ */ ue(kc, [["__scopeId", "data-v-f035684c"]]), Wn = Symbol("dc.paneContext");
function xc(e) {
  return yn(Wn, e), e;
}
function wu() {
  return _t(Wn, null);
}
function bu(e) {
  const t = _t(qn, null), n = _t(Wn, null);
  if (!t || !n) return () => {
  };
  const s = t.registerMenu(
    () => n.panel.value,
    () => xt(e)
  );
  return za() && Ra(s), s;
}
const Mc = ["data-dc-panel", "data-dc-panels", "data-dc-tabbed", "data-dc-floating", "data-dc-maximized", "data-dc-headless", "data-dc-active", "data-dc-dragging", "aria-label"], Cc = ["data-dc-movable"], Ec = ["aria-label", "aria-pressed"], Sc = ["data-dc-space-name"], Pc = { class: "dc-truncate" }, Ac = ["aria-label"], zc = {
  key: 0,
  class: "dc-pane__insert",
  "aria-hidden": "true"
}, Rc = ["id", "data-dc-panel", "data-dc-space", "aria-selected", "aria-controls", "tabindex", "onPointerdown", "onClick", "onKeydown"], Fc = { class: "dc-tab__name dc-truncate" }, Tc = {
  key: 0,
  class: "dc-pane__sub dc-mono dc-truncate"
}, Lc = ["aria-label", "data-dc-close", "onClick"], Dc = {
  key: 0,
  class: "dc-pane__insert",
  "aria-hidden": "true"
}, Ic = { class: "dc-pane__tools" }, Nc = {
  key: 2,
  class: "dc-pane__controls dc-controls"
}, Vc = ["aria-label", "data-dc-minimize"], Oc = ["aria-label", "aria-pressed", "data-dc-maximize"], Kc = ["aria-label", "data-dc-close"], qc = ["id", "role", "aria-labelledby"], Bc = ["id", "role", "aria-labelledby"], Wc = ["data-dc-edge"], Uc = /* @__PURE__ */ ce({
  __name: "WindowPane",
  props: {
    group: {},
    path: {}
  },
  setup(e) {
    const t = e, n = Bn(), s = ms() ?? "dc-pane", a = g(
      () => t.group.panels.flatMap((R, V) => {
        if (!ie(R)) {
          const $e = gt(R) || Pt(R, (ye) => n.panelFor(ye)?.title);
          return [{ kind: "space", index: V, id: `space-${V}`, title: $e, node: R }];
        }
        const Y = n.panelFor(R);
        return Y ? [{ kind: "panel", index: V, id: R, title: Y.title, panel: Y }] : [];
      })
    ), r = g(() => a.value.length > 1), o = g(() => {
      const R = ut(t.group);
      return a.value.find((V) => V.index === R) ?? a.value[0] ?? null;
    }), c = g(() => o.value?.kind === "space" ? o.value.node : null), l = g(() => c.value ? "" : js(t.group)), f = g(() => c.value ? null : n.panelFor(l.value)), d = g(() => o.value?.title ?? ""), k = g(() => n.spaceNames.value ? t.group.title ?? "" : ""), y = g(() => [...t.path, o.value?.index ?? 0]), h = g(() => l.value || ls(t.group)[0] || ""), x = g(() => n.viewFor(l.value)), w = g(() => t.group.headless === !0), $ = g(() => n.focused.value === l.value), z = g(() => n.dragging.value === l.value), q = g(() => n.moving.value === l.value), W = g(() => n.frameOf(h.value) !== null), D = g(() => n.panelFor(h.value)?.fixed === !0), F = g(
      () => !c.value && (n.canMove(l.value) || W.value && n.movable.value && !D.value)
    ), N = g(
      () => c.value ? n.spaceMenu(y.value) : n.menuFor(l.value)
    ), b = (R) => n.closable(R);
    xc({ panel: l });
    const P = g(() => n.maximized(h.value)), Z = g(
      () => W.value && !D.value || !r.value && !!f.value && b(f.value.id)
    ), oe = (R) => `${s}-tab-${R}`, fe = g(() => `${s}-body`), j = g(() => {
      const R = n.dropTarget.value;
      return !R || !Se(t.group, R.panel) || R.edge === "float" ? null : R;
    }), Me = g(() => j.value?.index === void 0 ? j.value?.edge ?? null : null), Pe = g(() => j.value?.index ?? null), T = () => f.value ? n.renderContent(f.value, x.value, $.value) ?? null : null, X = () => f.value ? n.renderActions(f.value, x.value, $.value) ?? null : null;
    let te = null;
    function ne(R) {
      const V = te !== null && Math.hypot(R.clientX - te.x, R.clientY - te.y) >= 4;
      return te = null, V;
    }
    const pe = (R) => R.kind === "panel" ? R.id : be(R.node);
    function Ce(R, V) {
      V.kind !== "space" && (n.focus(V.id), te = { x: R.clientX, y: R.clientY }, n.beginDrag(V.id, R));
    }
    function Ue(R, V) {
      if (ne(R)) return;
      const Y = pe(V);
      Y && n.selectPanel(Y);
    }
    function He(R) {
      l.value && n.focus(l.value), !R.target?.closest(".dc-tab, button, a, input, select, textarea, label") && (W.value ? n.beginFrameDrag(h.value, R, "move") : n.beginDrag(l.value, R));
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
      if (!q.value) return;
      if (R.key === "Escape") {
        R.preventDefault(), n.toggleMoveMode(l.value);
        return;
      }
      const V = De[R.key];
      V && (R.preventDefault(), W.value ? n.nudgeFrame(l.value, V, R.shiftKey) : n.nudge(l.value, V, R.shiftKey));
    }
    function Ne(R) {
      !W.value || R.target?.closest(".dc-tab, button, a, input, select, textarea, label") || n.toggleMaximize(h.value);
    }
    function bt(R, V) {
      R.stopPropagation(), te = null, n.close(V);
    }
    function It(R, V) {
      const Y = a.value.length;
      let $e = null;
      if (R.key === "ArrowRight" ? $e = (V + 1) % Y : R.key === "ArrowLeft" ? $e = (V - 1 + Y) % Y : R.key === "Home" ? $e = 0 : R.key === "End" && ($e = Y - 1), $e === null) return;
      R.preventDefault();
      const ye = a.value[$e];
      if (!ye) return;
      const kt = pe(ye);
      kt && n.selectPanel(kt);
    }
    return (R, V) => o.value ? (v(), _("section", {
      key: 0,
      class: "dc-pane",
      "data-dc-panel": l.value || void 0,
      "data-dc-panels": C(ls)(e.group).join(" ") || void 0,
      "data-dc-tabbed": r.value ? "true" : "false",
      "data-dc-floating": W.value ? "true" : "false",
      "data-dc-maximized": P.value ? "true" : "false",
      "data-dc-headless": w.value ? "true" : "false",
      "data-dc-active": $.value ? "true" : "false",
      "data-dc-dragging": z.value ? "true" : "false",
      "aria-label": d.value,
      onFocusin: V[7] || (V[7] = (Y) => l.value && C(n).focus(l.value))
    }, [
      w.value ? I("", !0) : (v(), _("header", {
        key: 0,
        class: "dc-pane__head",
        "data-dc-movable": F.value ? "true" : "false",
        onPointerdown: He,
        onDblclick: Ne
      }, [
        F.value ? (v(), _("button", {
          key: 0,
          type: "button",
          class: "dc-pane__grip",
          "aria-label": `Move ${d.value}`,
          "aria-pressed": q.value,
          onPointerdown: Ge,
          onClick: Xe,
          onKeydown: Ie
        }, [...V[8] || (V[8] = [
          m("span", { "aria-hidden": "true" }, "⠿", -1)
        ])], 40, Ec)) : I("", !0),
        k.value ? (v(), _("span", {
          key: 1,
          class: "dc-pane__name",
          "data-dc-space-name": k.value
        }, [
          m("span", Pc, E(k.value), 1)
        ], 8, Sc)) : I("", !0),
        m("div", {
          class: "dc-pane__tabs",
          role: "tablist",
          "aria-label": `${d.value} panels`
        }, [
          (v(!0), _(ae, null, ve(a.value, (Y, $e) => (v(), _(ae, {
            key: Y.id
          }, [
            Pe.value === $e ? (v(), _("span", zc)) : I("", !0),
            m("button", {
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
              m("span", Fc, E(Y.title), 1),
              Y.kind === "panel" && Y.panel.subtitle ? (v(), _("span", Tc, E(Y.panel.subtitle), 1)) : I("", !0),
              r.value && Y.kind === "panel" && b(Y.id) ? (v(), _("span", {
                key: 1,
                class: "dc-tab__close",
                role: "button",
                tabindex: "-1",
                "aria-label": `Close ${Y.title}`,
                "data-dc-close": Y.id,
                onPointerdown: V[0] || (V[0] = Fe(() => {
                }, ["stop"])),
                onClick: (ye) => bt(ye, Y.id)
              }, [...V[9] || (V[9] = [
                m("span", { "aria-hidden": "true" }, "×", -1)
              ])], 40, Lc)) : I("", !0)
            ], 40, Rc)
          ], 64))), 128)),
          Pe.value === a.value.length ? (v(), _("span", Dc)) : I("", !0)
        ], 8, Ac),
        m("div", Ic, [
          J(X),
          N.value.length ? (v(), ge(Rn, {
            key: 0,
            items: N.value,
            label: `${d.value} menu`
          }, null, 8, ["items", "label"])) : I("", !0)
        ]),
        Z.value ? (v(), _("div", Nc, [
          W.value && !D.value ? (v(), _("button", {
            key: 0,
            type: "button",
            class: "dc-pane__button dc-control",
            "aria-label": `Minimize ${d.value}`,
            "data-dc-minimize": h.value,
            onPointerdown: V[1] || (V[1] = Fe(() => {
            }, ["stop"])),
            onClick: V[2] || (V[2] = (Y) => C(n).toggleMinimize(h.value))
          }, [
            J(ht, { kind: "minimize" })
          ], 40, Vc)) : I("", !0),
          W.value && !D.value ? (v(), _("button", {
            key: 1,
            type: "button",
            class: "dc-pane__button dc-control",
            "aria-label": `${P.value ? "Restore" : "Maximize"} ${d.value}`,
            "aria-pressed": P.value,
            "data-dc-maximize": h.value,
            onPointerdown: V[3] || (V[3] = Fe(() => {
            }, ["stop"])),
            onClick: V[4] || (V[4] = (Y) => C(n).toggleMaximize(h.value))
          }, [
            J(ht, {
              kind: P.value ? "restore" : "maximize"
            }, null, 8, ["kind"])
          ], 40, Oc)) : I("", !0),
          !r.value && f.value && b(f.value.id) ? (v(), _("button", {
            key: 2,
            type: "button",
            class: "dc-pane__close dc-control",
            "aria-label": `Close ${d.value}`,
            "data-dc-close": f.value.id,
            onPointerdown: V[5] || (V[5] = Fe(() => {
            }, ["stop"])),
            onClick: V[6] || (V[6] = (Y) => C(n).close(f.value.id))
          }, [
            J(ht, { kind: "close" })
          ], 40, Kc)) : I("", !0)
        ])) : I("", !0)
      ], 40, Cc)),
      c.value ? (v(), _("div", {
        key: 1,
        id: fe.value,
        class: "dc-pane__space",
        role: w.value ? void 0 : "tabpanel",
        "aria-labelledby": w.value ? void 0 : oe(o.value.id)
      }, [
        Ke(R.$slots, "space", {
          node: c.value,
          path: y.value
        }, void 0, !0)
      ], 8, qc)) : (v(), _("div", {
        key: 2,
        id: fe.value,
        class: "dc-pane__body",
        role: w.value ? void 0 : "tabpanel",
        "aria-labelledby": w.value ? void 0 : oe(l.value)
      }, [
        J(T)
      ], 8, Bc)),
      Me.value ? (v(), _("div", {
        key: 3,
        class: "dc-pane__drop",
        "data-dc-edge": Me.value,
        "aria-hidden": "true"
      }, null, 8, Wc)) : I("", !0)
    ], 40, Mc)) : I("", !0);
  }
}), ca = /* @__PURE__ */ ue(Uc, [["__scopeId", "data-v-44fd2b2d"]]), Hc = ["data-dc-space", "data-dc-path", "aria-label"], Gc = {
  key: 0,
  class: "dc-space__head"
}, Xc = { class: "dc-space__title dc-truncate" }, Yc = ["data-dc-direction"], jc = {
  key: 0,
  class: "dc-space__drop",
  "aria-hidden": "true"
}, Qc = ["aria-orientation", "aria-label", "aria-valuenow", "aria-disabled", "tabindex", "onPointerdown", "onKeydown"], Zc = /* @__PURE__ */ ce({
  __name: "WindowNode",
  props: {
    node: {},
    path: {},
    framed: { type: Boolean }
  },
  setup(e) {
    const t = e, n = Bn(), s = B(null), a = g(() => O(t.node) ? t.node : null), r = g(() => wt(t.node) ? t.node : null), o = g(() => G(t.node) ? t.node : null), c = g(
      () => r.value ? r.value.children : o.value?.frames.map((T) => T.node) ?? []
    ), l = g(() => r.value ? Be(r.value) : []), f = g(
      () => (o.value?.frames ?? []).map((T, X) => ({
        held: T,
        /** Place in the stack, counted from the back — what `z-index` follows. */
        order: X,
        key: b(T.node),
        path: [...t.path, X]
      })).sort((T, X) => T.key < X.key ? -1 : T.key > X.key ? 1 : 0)
    ), d = g(() => gt(t.node)), k = g(() => n.spaceMenu(t.path)), y = g(() => t.node.headless === !0), h = g(() => o.value ? "desktop" : r.value?.direction ?? ""), x = B(null), w = B(0);
    let $ = null;
    xe(
      x,
      (T) => {
        $?.disconnect(), $ = null, !(!T || typeof ResizeObserver > "u") && (w.value = T.clientWidth, $ = new ResizeObserver(([X]) => {
          w.value = X?.contentRect.width ?? 0;
        }), $.observe(T));
      },
      { immediate: !0 }
    ), Ze(() => $?.disconnect());
    const z = g(() => {
      const T = Math.max(
        1,
        Math.floor((w.value + dt) / (vn + dt))
      ), X = /* @__PURE__ */ new Map();
      let te = 0;
      for (const ne of f.value)
        ne.held.minimized === !0 && (X.set(ne.key, {
          x: dt + te % T * (vn + dt),
          bottom: dt + Math.floor(te / T) * (Xs + dt)
        }), te += 1);
      return X;
    }), q = (T) => !!T && T.join("/") === t.path.join("/"), W = g(() => {
      const T = n.dropTarget.value, X = o.value;
      if (!X || !T?.rect || T.edge !== "float") return null;
      if (T.space) return q(T.space) ? T.rect : null;
      const te = _e(X, T.panel);
      return te && X.frames.includes(te) ? T.rect : null;
    }), D = g(() => {
      const T = n.dropTarget.value;
      return !!T && !T.rect && q(T.space);
    }), F = g(() => r.value?.direction === "row"), N = g(() => c.value.map((T, X) => [...t.path, X])), b = (T) => [...We(T)].sort().join("/"), P = (T) => {
      const X = We(T)[0];
      return (X ? n.panelFor(X)?.title : null) ?? X ?? "panel";
    }, Z = (T) => {
      const X = c.value[T], te = c.value[T + 1];
      return !X || !te ? "Resize panels" : `Resize ${P(X)} and ${P(te)}`;
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
      return a.value ? (v(), ge(ca, {
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
      }, 8, ["group", "path"])) : (v(), _("section", {
        key: 1,
        class: "dc-space",
        "data-dc-space": h.value,
        "data-dc-path": e.path.join("/"),
        "aria-label": d.value
      }, [
        !e.framed && !y.value ? (v(), _("header", Gc, [
          m("span", Xc, E(d.value), 1),
          k.value.length ? (v(), ge(Rn, {
            key: 0,
            items: k.value,
            label: `${d.value} menu`
          }, null, 8, ["items", "label"])) : I("", !0)
        ])) : I("", !0),
        o.value ? (v(), _("div", {
          key: 1,
          ref_key: "desktop",
          ref: x,
          class: "dc-window__desktop"
        }, [
          W.value ? (v(), _("div", {
            key: 0,
            class: "dc-window__drop",
            style: Le({
              left: `${W.value.x}px`,
              top: `${W.value.y}px`,
              width: `${W.value.w}px`,
              height: `${W.value.h}px`
            }),
            "aria-hidden": "true"
          }, null, 4)) : I("", !0),
          (v(!0), _(ae, null, ve(f.value, (ne) => (v(), ge($c, {
            key: ne.key,
            frame: ne.held,
            path: ne.path,
            order: ne.order,
            place: z.value.get(ne.key) ?? null
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
        ], 512)) : r.value ? (v(), _("div", {
          key: 2,
          ref_key: "container",
          ref: s,
          class: "dc-window__split",
          "data-dc-direction": r.value.direction
        }, [
          D.value ? (v(), _("div", jc)) : I("", !0),
          (v(!0), _(ae, null, ve(c.value, (ne, pe) => (v(), _(ae, {
            key: b(ne)
          }, [
            m("div", {
              class: "dc-window__cell",
              style: Le({ flexGrow: l.value[pe] ?? 1 })
            }, [
              J(te, {
                node: ne,
                path: N.value[pe] ?? []
              }, null, 8, ["node", "path"])
            ], 4),
            pe < c.value.length - 1 ? (v(), _("div", {
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
            }, null, 40, Qc)) : I("", !0)
          ], 64))), 128))
        ], 8, Yc)) : I("", !0)
      ], 8, Hc));
    };
  }
}), Jc = /* @__PURE__ */ ue(Zc, [["__scopeId", "data-v-fb5b403f"]]), eu = ["data-dc-theme", "data-dc-dragging", "data-dc-docking"], tu = {
  key: 1,
  class: "dc-window__empty"
}, nu = {
  class: "dc-window__live",
  "aria-live": "polite",
  role: "status"
}, Kt = 16, su = /* @__PURE__ */ ce({
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
    const s = e, a = n, r = Gt(e, "layout"), o = Gt(e, "views"), c = wn(), l = g(() => new Map(s.panels.map((i) => [i.id, i]))), f = g(() => s.panels.map((i) => i.id)), d = g(() => rc(r.value, f.value)), k = B(null), y = B(null), h = B(null), x = B(!0), w = B(null), $ = B(null), z = B(null), q = B(""), W = B(null);
    function D() {
      const i = W.value;
      return i ? [...i.querySelectorAll(".dc-pane[data-dc-panels]")].filter((p) => p.closest(".dc-window") === i).map((p) => ({ panels: (p.dataset.dcPanels ?? "").split(" "), element: p })) : [];
    }
    function F(i) {
      const u = [];
      let p = i.closest(".dc-float");
      for (; p; )
        u.unshift(Number(p.dataset.dcOrder ?? 0)), p = p.parentElement?.closest(".dc-float") ?? null;
      return u;
    }
    function N() {
      return D().map((i) => ({ pane: i, order: F(i.element) })).sort((i, u) => {
        const p = Math.max(i.order.length, u.order.length);
        for (let M = 0; M < p; M += 1) {
          const S = (i.order[M] ?? -1) - (u.order[M] ?? -1);
          if (S !== 0) return S;
        }
        return 0;
      }).map((i) => i.pane);
    }
    const b = (i) => D().find((u) => u.panels.includes(i)) ?? null;
    function P(i) {
      const u = l.value.get(i);
      if (!u) return "";
      const p = o.value[i];
      return p && u.views?.some((M) => M.key === p) ? p : u.defaultView ?? u.views?.[0]?.key ?? "";
    }
    function Z(i, u) {
      o.value = { ...o.value, [i]: u }, a("view-change", { panel: i, view: u });
    }
    const oe = g(
      () => s.panels.filter((i) => i.fixed !== !0).length
    );
    function fe(i) {
      return !s.movable || oe.value < 1 || s.panels.length < 2 ? !1 : l.value.get(i)?.fixed !== !0;
    }
    function j(i, u) {
      const p = d.value;
      !i || !p || i === p || (r.value = i, u && a("panel-move", u));
    }
    function Me(i, u, p) {
      if (i.width <= 0 || i.height <= 0) return "center";
      const M = (u - i.left) / i.width, S = (p - i.top) / i.height, A = 0.3;
      return M > A && M < 1 - A && S > A && S < 1 - A ? "center" : [
        { edge: "left", distance: M },
        { edge: "right", distance: 1 - M },
        { edge: "top", distance: S },
        { edge: "bottom", distance: 1 - S }
      ].reduce(
        (Q, L) => L.distance < Q.distance ? L : Q
      ).edge;
    }
    function Pe(i, u) {
      const p = [...i.querySelectorAll(".dc-tab")], M = p.findIndex((S) => {
        const A = S.getBoundingClientRect();
        return u < A.left + A.width / 2;
      });
      return M === -1 ? p.length : M;
    }
    function T(i, u, p) {
      for (const { panels: M, element: S } of N().reverse()) {
        const A = S.getBoundingClientRect();
        if (i < A.left || i > A.right || u < A.top || u > A.bottom) continue;
        const re = M.find((U) => U !== p), Q = S.querySelector(".dc-pane__tabs"), L = Q?.getBoundingClientRect();
        if (Q && L && u >= L.top && u <= L.bottom)
          return re ? { panel: re, edge: "center", index: Pe(Q, i) } : null;
        const K = S.querySelector(":scope > .dc-pane__space");
        if (K) {
          const U = K.getBoundingClientRect();
          if (i >= U.left && i <= U.right && u >= U.top && u <= U.bottom) continue;
        }
        return re ? { panel: re, edge: Me(A, i, u) } : null;
      }
      return te(i, u, p) ?? Ce(i, u);
    }
    function X() {
      const i = W.value;
      return i ? [...i.querySelectorAll(".dc-window__desktop")].filter((u) => u.closest(".dc-window") === i).reverse() : [];
    }
    function te(i, u, p) {
      const M = d.value;
      if (!M) return null;
      for (const S of X()) {
        const A = S.getBoundingClientRect();
        if (i < A.left || i > A.right || u < A.top || u > A.bottom) continue;
        const re = Ue(S), Q = re.flatMap((se) => se.panels).find((se) => se !== p);
        if (!Q && re.length > 0) return null;
        const L = _e(M, p)?.rect, K = an(
          {
            x: i - A.left - 24,
            y: u - A.top - 12,
            w: L?.w ?? rt.w,
            h: L?.h ?? rt.h
          },
          { w: S.clientWidth, h: S.clientHeight },
          s.minPanelSize
        );
        if (Q) return { panel: Q, edge: "float", rect: K };
        const U = ne(S);
        return U ? { panel: "", space: U, edge: "float", rect: K } : null;
      }
      return null;
    }
    function ne(i) {
      const u = i.closest(".dc-space")?.getAttribute("data-dc-path");
      return u == null ? null : u === "" ? [] : u.split("/").map(Number);
    }
    function pe() {
      const i = W.value;
      return i ? [...i.querySelectorAll(".dc-space")].filter((u) => u.closest(".dc-window") === i).filter((u) => !u.querySelector(".dc-pane")).reverse().flatMap((u) => {
        const p = ne(u);
        return p ? [{ element: u, path: p }] : [];
      }) : [];
    }
    function Ce(i, u) {
      for (const { element: p, path: M } of pe()) {
        if (p.dataset.dcSpace === "desktop") continue;
        const S = p.getBoundingClientRect();
        if (!(i < S.left || i > S.right || u < S.top || u > S.bottom))
          return { panel: "", space: M, edge: "center" };
      }
      return null;
    }
    function Ue(i) {
      return D().filter(
        (u) => u.element.closest(".dc-window__desktop") === i
      );
    }
    let He = null;
    const Ge = (i) => i.altKey;
    function Xe(i, u) {
      if (!fe(i) || y.value || $.value || u.button !== 0) return;
      const p = u.clientX, M = u.clientY;
      let S = !1, A = Ge(u);
      const re = () => {
        const le = z.value;
        le && (h.value = A ? te(le.x, le.y, i) : T(le.x, le.y, i));
      }, Q = (le) => {
        if (!S) {
          if (Math.hypot(le.clientX - p, le.clientY - M) < 4) return;
          S = !0, y.value = i, w.value = null;
        }
        A = Ge(le), x.value = !A, z.value = { x: le.clientX, y: le.clientY }, re();
      }, L = (le) => {
        Ge(le) !== A && (A = !A, x.value = !A, S && re());
      }, K = (le) => {
        He?.();
        const H = h.value, we = d.value;
        if (le && S && H && we) {
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
        y.value = null, h.value = null, z.value = null, x.value = !0;
      }, U = () => K(!0), se = () => K(!1), de = (le) => {
        if (le.key === "Escape") {
          K(!1);
          return;
        }
        L(le);
      };
      He = () => {
        window.removeEventListener("pointermove", Q), window.removeEventListener("pointerup", U), window.removeEventListener("pointercancel", se), window.removeEventListener("keydown", de), window.removeEventListener("keyup", L), He = null;
      }, window.addEventListener("pointermove", Q), window.addEventListener("pointerup", U), window.addEventListener("pointercancel", se), window.addEventListener("keydown", de), window.addEventListener("keyup", L);
    }
    Ze(() => He?.());
    let De = null;
    function Ie(i) {
      const u = W.value;
      return u ? [...u.querySelectorAll(
        `.dc-float[data-dc-path="${i.join("/")}"]`
      )].find((S) => S.closest(".dc-window") === u)?.parentElement ?? null : null;
    }
    function Ne(i) {
      const u = d.value;
      return u ? _n(u, i) : null;
    }
    function bt(i) {
      const u = d.value;
      if (!u) return;
      const p = Et(u, i);
      p !== u && (r.value = p);
    }
    function It(i) {
      const u = Ne(i);
      u && bt(u);
    }
    function R(i) {
      const u = d.value, p = u ? _e(u, i) : null;
      return p !== null && je(p);
    }
    function V(i) {
      const u = d.value, p = u ? _e(u, i) : null;
      return p !== null && st(p);
    }
    function Y(i) {
      const u = d.value, p = u ? nt(u, i) : null;
      return p ? be(p.node) : "";
    }
    function $e(i) {
      const u = d.value, p = u ? nt(u, i) : null;
      if (!u || !p) return;
      const M = be(p.node);
      if (l.value.get(M)?.fixed === !0) return;
      const S = !st(p);
      let A = Xi(u, i, S);
      A !== u && (S || (A = Et(A, i)), r.value = A, a("frame-minimize", { panel: M, minimized: S }));
    }
    function ye(i) {
      const u = Ne(i);
      u && $e(u);
    }
    function kt(i) {
      const u = d.value, p = u ? nt(u, i) : null;
      if (!u || !p) return;
      const M = be(p.node);
      if (l.value.get(M)?.fixed === !0) return;
      const S = !je(p);
      let A = Gi(u, i, S);
      A !== u && (S && (A = Et(A, i)), r.value = A, a("frame-maximize", { panel: M, maximized: S }));
    }
    function Un(i) {
      const u = Ne(i);
      u && kt(u);
    }
    function Hn(i, u, p) {
      const M = d.value, S = M ? nt(M, i) : null;
      if (!M || !S || u.button !== 0 || y.value || $.value) return;
      const A = be(S.node);
      if (l.value.get(A)?.fixed === !0 || je(S) || st(S) || (p === "move" ? !s.movable : !s.resizable)) return;
      const re = Ie(i), Q = Yi(M, i);
      bt(i);
      const L = { w: re?.clientWidth ?? 0, h: re?.clientHeight ?? 0 }, K = { ...S.rect }, U = u.clientX, se = u.clientY, de = s.minPanelSize;
      $.value = A;
      const le = (Ee) => {
        const Ve = d.value;
        if (!Ve) return;
        const $t = is(Ve, Q, an(Ee, L, de));
        $t !== Ve && (r.value = $t);
      }, H = (Ee) => {
        Ee.preventDefault();
        const Ve = Ee.clientX - U, $t = Ee.clientY - se;
        le(
          p === "move" ? { ...K, x: K.x + Ve, y: K.y + $t } : os(K, p, Ve, $t, de)
        );
      }, we = (Ee) => {
        if (De?.(), $.value = null, !Ee) {
          le(K);
          return;
        }
        const Ve = d.value ? nt(d.value, Q) : null;
        Ve && a("frame-change", { panel: Y(Q), rect: Ve.rect });
      }, Ye = () => we(!0), et = () => we(!1), tt = (Ee) => {
        Ee.key === "Escape" && we(!1);
      };
      De = () => {
        window.removeEventListener("pointermove", H), window.removeEventListener("pointerup", Ye), window.removeEventListener("pointercancel", et), window.removeEventListener("keydown", tt), De = null;
      }, window.addEventListener("pointermove", H), window.addEventListener("pointerup", Ye), window.addEventListener("pointercancel", et), window.addEventListener("keydown", tt);
    }
    function ua(i, u, p) {
      const M = Ne(i);
      M && Hn(M, u, p);
    }
    function da(i, u, p = !1) {
      const M = d.value, S = Ne(i), A = M && S ? nt(M, S) : null;
      if (!M || !S || !A || l.value.get(i)?.fixed === !0 || (p ? !s.resizable : !s.movable)) return;
      if (je(A) || st(A)) {
        q.value = `${Re(i)} is ${je(A) ? "maximized" : "minimized"}, so it cannot be moved.`;
        return;
      }
      const re = u === "left" ? -Kt : u === "right" ? Kt : 0, Q = u === "up" ? -Kt : u === "down" ? Kt : 0, L = Ie(S), K = { w: L?.clientWidth ?? 0, h: L?.clientHeight ?? 0 }, U = p ? os(A.rect, "se", re, Q, s.minPanelSize) : { ...A.rect, x: A.rect.x + re, y: A.rect.y + Q }, se = is(M, S, an(U, K, s.minPanelSize));
      if (se === M) {
        q.value = p ? `${Re(i)} cannot be resized further.` : `${Re(i)} cannot move ${u}.`;
        return;
      }
      r.value = se;
      const de = nt(se, S);
      de && (a("frame-change", { panel: i, rect: de.rect }), q.value = p ? `${Re(i)} resized to ${de.rect.w} by ${de.rect.h}.` : `${Re(i)} moved to ${de.rect.x}, ${de.rect.y}.`);
    }
    Ze(() => De?.());
    function fa(i, u) {
      const p = b(i), M = p?.element.getBoundingClientRect();
      if (!p || !M) return null;
      const S = u === "left" || u === "right", A = (L) => {
        if (!(S ? L.bottom > M.top + 1 && L.top < M.bottom - 1 : L.right > M.left + 1 && L.left < M.right - 1)) return null;
        const U = u === "left" ? M.left - L.right : u === "right" ? L.left - M.right : u === "up" ? M.top - L.bottom : L.top - M.bottom;
        return U < -1 ? null : U;
      }, re = [];
      for (const L of D()) {
        if (L === p || L.element === p.element) continue;
        const K = A(L.element.getBoundingClientRect());
        if (K === null) continue;
        const U = L.panels.find((se) => se !== i);
        U && re.push({ to: { panel: U }, distance: K });
      }
      for (const { element: L, path: K } of pe()) {
        const U = A(L.getBoundingClientRect());
        U !== null && re.push({ to: { space: K }, distance: U });
      }
      return re.reduce(
        (L, K) => L && L.distance <= K.distance ? L : K,
        null
      )?.to ?? null;
    }
    function pa(i) {
      const u = d.value ? _e(d.value, i) !== null : !1;
      if (!u && !fe(i)) return;
      w.value = w.value === i ? null : i;
      const p = Re(i);
      if (!w.value) {
        q.value = `${p}: move mode off.`;
        return;
      }
      q.value = u ? `${p}: move mode on. Arrow keys move the window, shift and an arrow resize it, Escape leaves move mode.` : `${p}: move mode on. Arrow keys move the panel, shift and an arrow make it a tab of the panel that way, Escape leaves move mode.`;
    }
    const Re = (i) => l.value.get(i)?.title ?? i, va = {
      left: "left",
      right: "right",
      up: "top",
      down: "bottom"
    };
    function ma(i, u, p = !1) {
      if (!fe(i)) return;
      const M = d.value;
      if (!M) return;
      const S = Re(i), A = pt(M, i);
      if (!p && A && (u === "left" || u === "right") && A.panels.length > 1) {
        const se = A.panels.indexOf(i), de = u === "left" ? se - 1 : se + 1;
        if (de >= 0 && de < A.panels.length) {
          j(St(M, i, de), { panel: i, target: i, edge: "center", index: de }), q.value = `${S} moved ${u}, now tab ${de + 1} of ${A.panels.length}.`, en(i);
          return;
        }
      }
      const Q = fa(i, u);
      if (!Q || Q.panel !== void 0 && !fe(Q.panel)) {
        q.value = `${S} cannot move ${u}.`;
        return;
      }
      const L = va[u];
      if (Q.space) {
        const se = Q.space, de = Qe(M, se), le = _e(M, i)?.rect, H = { ...rt, ...le ? { w: le.w, h: le.h } : {} };
        j(us(M, i, se, H), { panel: i, target: "", space: se, edge: L }), q.value = `${S} moved ${u}, into ${de ? gt(de) : "the space"}.`, en(i);
        return;
      }
      const K = Q.panel, U = A?.panels.length === 1 && pt(M, K)?.panels.length === 1;
      p ? (j(Ot(M, i, K, "center"), {
        panel: i,
        target: K,
        edge: "center"
      }), q.value = `${S} joined ${Re(K)} as a tab.`) : U ? (j(Bt(M, i, K), { panel: i, target: K, edge: L }), q.value = `${S} moved ${u}, trading places with ${Re(K)}.`) : (j(Ot(M, i, K, L), { panel: i, target: K, edge: L }), q.value = `${S} moved ${u}, beside ${Re(K)}.`), en(i);
    }
    function en(i) {
      At(() => {
        b(i)?.element.querySelector(".dc-pane__grip")?.focus();
      });
    }
    function ha(i, u) {
      const p = d.value;
      p && (r.value = Wt(p, i, u));
    }
    function tn(i) {
      const u = d.value;
      if (!u) return;
      const p = mt(u, i);
      p !== u && (r.value = p, a("tab-select", { panel: i }));
    }
    function Gn(i) {
      return l.value.get(i)?.closable ?? s.closable;
    }
    function _a(i) {
      Gn(i) && a("panel-close", i);
    }
    const nn = B(/* @__PURE__ */ new Map());
    let ga = 0;
    function ya(i, u) {
      const p = ga += 1;
      return nn.value.set(p, { panel: i, items: u }), () => {
        nn.value.delete(p);
      };
    }
    function wa(i) {
      const u = [];
      for (const p of nn.value.values())
        p.panel() === i && u.push(...p.items());
      return u;
    }
    function Xn(i) {
      const u = i.filter((p) => p.items.length > 0);
      return u.length < 2 ? u.flatMap((p) => p.items) : u.flatMap((p) => [
        { id: p.id, heading: !0, label: p.title },
        ...p.items
      ]);
    }
    const Yn = (i) => i.title || "These tabs";
    function ba(i, u) {
      const p = u.id, M = pt(i, p), S = (M?.panels.length ?? 0) > 1, A = M?.fixedView === !0, re = (U) => ({
        action: () => {
          U !== i && (r.value = U);
        }
      }), Q = [], L = [], K = u.views ?? [];
      if (K.length > 1 && !A) {
        const U = P(p);
        Q.push({
          id: "view",
          label: "View",
          items: K.map((se) => ({
            id: `view-${se.key}`,
            label: se.label,
            checked: se.key === U,
            action: () => Z(p, se.key)
          }))
        });
      }
      return S && !A && L.push(
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
          ...re(Ji(i, p))
        },
        {
          id: "show-desktop",
          label: "Desktop",
          checked: !1,
          ...re(ec(i, p))
        }
      ), S && M && (L.length && L.push({ separator: !0 }), L.push(...jn(M, p))), { panel: Q, tabs: L, tabsTitle: M ? Yn(M) : "" };
    }
    function jn(i, u) {
      const p = ut(i), M = (S) => {
        const A = i.panels[(p + S + i.panels.length) % i.panels.length];
        return (A === void 0 ? "" : be(A)) || u;
      };
      return [
        { id: "next-tab", label: "Next tab", action: () => tn(M(1)) },
        { id: "previous-tab", label: "Previous tab", action: () => tn(M(-1)) }
      ];
    }
    function Nt(i) {
      return i.title ? i.title : O(i) ? i.panels.length > 1 ? "these tabs" : "the strip" : gt(i);
    }
    function Qn(i) {
      if (!i || G(i) || i.fixedView === !0 || !i.title && i.headless !== !0 || ze(i)) return null;
      const u = ia(i);
      return u && u.fixedView !== !0 ? u : null;
    }
    function ka(i) {
      const u = d.value;
      if (!s.menu || !u) return [];
      const p = Qe(u, i);
      if (!p || O(p)) return [];
      if (p.fixedView) return [];
      const M = G(p) ? "desktop" : p.direction, S = (H, we, Ye) => ({
        id: `show-${H}`,
        label: we,
        checked: M === H,
        action: () => {
          const et = d.value, tt = Ye();
          !et || tt === p || (r.value = Qt(he(ot(et, i, tt))));
        }
      }), A = () => {
        const H = aa(p, $a(p));
        if (O(H) && H.panels.length === 0) return p;
        const we = O(H) && H.panels.length === 1 ? H.panels[0] : void 0;
        return we !== void 0 && ie(we) ? p : H;
      }, re = (H) => () => G(p) ? oa(p, H) : p.direction === H ? p : { ...p, direction: H }, Q = i.slice(0, -1), L = i.length > 0 ? Qe(u, Q) : null, K = L && O(L) && L.panels.length > 1 ? L : null, U = L && Qn(L) === p ? L : null, se = Qn(p), de = p.title || "this space", le = (H, we, Ye, et, tt) => ({
        id: H,
        label: tt,
        action: () => {
          const Ee = d.value;
          Ee && (r.value = Qt(he(ot(Ee, we, sc(Ye, et)))));
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
            S("row", "Row", re("row")),
            S("column", "Column", re("column")),
            // Everything in this space in one strip: the panes as tabs, and a
            // desktop among them as a tab of its own, keeping the windows on it.
            S("tabs", "Tabs", () => A()),
            S("desktop", "Desktop", () => G(p) ? p : la(p))
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
          title: K ? Yn(K) : "",
          items: K ? jn(K, be(p)) : []
        }
      ]);
    }
    function $a(i) {
      const u = k.value;
      return u && ee(i, u) ? u : void 0;
    }
    function xa(i) {
      const u = d.value, p = l.value.get(i);
      if (!u || !p) return [];
      const M = s.menu ? ba(u, p) : null, S = wa(i);
      S.length && M?.panel.length && S.push({ separator: !0 }), M && S.push(...M.panel);
      const A = Xn([
        { id: "about-panel", title: p.title, items: S },
        { id: "about-tabs", title: M?.tabsTitle ?? "", items: M?.tabs ?? [] }
      ]);
      return s.paneMenu ? s.paneMenu(p, A) : A;
    }
    function Ma(i, u) {
      return c[`${i}-${u}`] ?? c[i];
    }
    function Zn(i, u, p, M) {
      return Ma(i, u.id)?.({ panel: u, view: p, active: M });
    }
    lc({
      panelFor: (i) => l.value.get(i) ?? null,
      viewFor: P,
      setView: Z,
      movable: g(() => s.movable),
      resizable: g(() => s.resizable),
      minPanelSize: g(() => s.minPanelSize),
      spaceNames: g(() => s.spaceNames),
      focused: k,
      dragging: y,
      dropTarget: h,
      moving: w,
      framing: $,
      canMove: fe,
      focus(i) {
        k.value !== i && (k.value = i, a("panel-activate", i));
      },
      selectPanel: tn,
      beginDrag: Xe,
      toggleMoveMode: pa,
      nudge: ma,
      setSizes: ha,
      frameOf: (i) => d.value ? _e(d.value, i) : null,
      beginFrameDrag: ua,
      nudgeFrame: da,
      raise: It,
      maximized: R,
      toggleMaximize: Un,
      minimized: V,
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
      renderContent: (i, u, p) => Zn("panel", i, u, p),
      renderActions: (i, u, p) => Zn("actions", i, u, p),
      layout: d
    });
    const Ca = g(() => {
      if (!(!s.accent && !s.tokens))
        return { ...s.tokens, ...s.accent ? { "--dc-accent": s.accent } : {} };
    }), Ea = () => {
      const i = y.value, u = z.value;
      return !i || !u ? null : Fa(
        "div",
        {
          class: "dc-window__ghost",
          style: { left: `${u.x}px`, top: `${u.y}px` },
          "aria-hidden": "true"
        },
        l.value.get(i)?.title ?? i
      );
    };
    return t({
      /** The layout as rendered, reconciled against the current panels. */
      layout: d,
      /** Moves a panel programmatically — the same operation a drag performs. */
      move(i, u, p, M) {
        const S = d.value;
        S && j(Ot(S, i, u, p, M), {
          panel: i,
          target: u,
          edge: p,
          ...M === void 0 ? {} : { index: M }
        });
      },
      /** Brings a panel's tab to the top of its group. */
      select(i) {
        const u = d.value;
        u && (r.value = mt(u, i));
      },
      /** Lifts a panel onto the float holding `near`, as a window of its own. */
      float(i, u, p) {
        const M = d.value;
        M && j(cs(M, i, u, p), {
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
        const M = Wi(p, i, u);
        if (M === p) return;
        r.value = M;
        const S = _e(M, i);
        S && a("frame-change", { panel: i, rect: S.rect });
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
    }), (i, u) => (v(), _("div", {
      ref_key: "root",
      ref: W,
      class: "dc-shell dc-window",
      "data-dc-theme": e.theme,
      "data-dc-dragging": y.value ? "true" : "false",
      "data-dc-docking": x.value ? "true" : "false",
      style: Le(Ca.value)
    }, [
      d.value ? (v(), ge(Jc, {
        key: 0,
        node: d.value,
        path: []
      }, null, 8, ["node"])) : (v(), _("p", tu, " This window has no panels. ")),
      J(Ea),
      m("p", nu, E(q.value), 1)
    ], 12, eu));
  }
}), au = /* @__PURE__ */ ue(su, [["__scopeId", "data-v-711565af"]]);
function ku(e = "", t = "/") {
  const n = B(qe(e)), s = B(t), a = [`${s.value}${n.value}`];
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
function $u(e) {
  const t = B(vs(e.currentRoute.value.fullPath)), n = g(() => e.currentRoute.value.path), s = xe(
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
const ru = {
  DataShell: xi,
  ShellHeader: Fs,
  QueryPanel: Ls,
  ResultsArea: Us,
  FacetControl: Ts,
  SegmentedControl: fn,
  StatusPill: zt,
  ScoreMeter: Ks,
  WindowFrame: au,
  WindowPane: ca,
  ListView: pn,
  CardsView: Ns,
  GridView: Vs,
  TableView: Bs,
  LinksView: Os,
  PreviewView: qs,
  TypeCardsView: Ws
}, xu = {
  install(e, t = {}) {
    const n = t.prefix ?? "";
    for (const [s, a] of Object.entries(ru))
      e.component(`${n}${s}`, a);
    t.route && e.provide(_s, t.route);
  }
};
export {
  jt as CASCADE_STEP,
  Ns as CardsView,
  rt as DEFAULT_FRAME,
  iu as DEFAULT_SORT,
  La as DEFAULT_VIEW,
  xi as DataShell,
  Ps as ENTITY_ALL,
  dn as ENTITY_TERM,
  An as FACET_PREFIX,
  Ts as FacetControl,
  Ds as GENERIC_LABELS,
  Vs as GridView,
  xu as HeaderContentLayoutPlugin,
  Os as LinksView,
  pn as ListView,
  dt as MINIMIZED_GAP,
  Xs as MINIMIZED_HEIGHT,
  vn as MINIMIZED_WIDTH,
  Gs as MIN_FRAME,
  ss as MOCK_TINTS,
  uu as MenuBar,
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
  ou as SHELL_THEMES,
  Rt as ScopeMark,
  Ks as ScoreMeter,
  fn as SegmentedControl,
  Fs as ShellHeader,
  zt as StatusPill,
  Bs as TableView,
  Ws as TypeCardsView,
  gs as VIEW_KINDS,
  qn as WINDOW_CONTEXT_KEY,
  au as WindowFrame,
  ca as WindowPane,
  js as activePanel,
  ut as activeTab,
  sr as addTerm,
  qi as axisOf,
  Ln as cascade,
  ts as changesResults,
  an as clampRect,
  aa as collapseSpace,
  Ji as collapseToTabs,
  fu as column,
  Da as countPages,
  Ta as createHistoryAdapter,
  ku as createMemoryAdapter,
  er as createMockDataSource,
  $u as createVueRouterAdapter,
  ps as defaultLayout,
  $n as defaultQuery,
  ar as drillExpression,
  us as dropIntoSpace,
  Yt as emptyFacetState,
  bn as emptyFacetValue,
  ft as findEntity,
  at as findSort,
  vu as fixedView,
  Tn as float,
  cs as floatPanel,
  la as floatSplit,
  ec as floatTabs,
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
  du as group,
  pt as groupOf,
  Bi as groups,
  $s as hasActiveFacets,
  ee as hasPanel,
  pu as headless,
  Mt as insertPanel,
  Ct as isChoosable,
  cu as isEntityScoped,
  ks as isFacetActive,
  G as isFloat,
  O as isGroup,
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
  Ui as maximizeFrame,
  Gi as maximizeFrameAt,
  sc as mergeSpace,
  Hi as minimizeFrame,
  Xi as minimizeFrameAt,
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
  xc as providePaneContext,
  rr as provideShellContext,
  lc as provideWindowContext,
  rn as raiseFrame,
  Et as raiseFrameAt,
  Yi as raisedPath,
  Ms as reconcileFacets,
  rc as reconcileLayout,
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
  Wi as setFrameRect,
  is as setFrameRectAt,
  Wt as setSizesAt,
  _u as setSplitDirection,
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
  gu as toFloat,
  yu as toTiled,
  mu as toggleMaximized,
  hu as toggleMinimized,
  Go as useEntityPreviews,
  wu as usePaneContext,
  bu as usePaneMenu,
  yt as usePresentedRows,
  vr as useQueryState,
  mr as useResults,
  ke as useShellContext,
  yl as useViewLabels,
  Bn as useWindowContext
};
