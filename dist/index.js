import { ref as B, inject as vt, provide as hn, computed as g, toValue as bt, shallowRef as qt, watch as $e, defineComponent as ce, openBlock as m, createElementBlock as _, createElementVNode as v, toDisplayString as E, createCommentVNode as N, unref as C, renderSlot as tt, Fragment as re, renderList as ve, withDirectives as sn, withKeys as Bt, withModifiers as Re, vModelText as rn, normalizeClass as Ms, useSlots as _n, nextTick as St, createBlock as be, createVNode as de, createTextVNode as kt, normalizeStyle as Te, resolveDynamicComponent as Cs, useModel as Wt, onBeforeUnmount as je, useId as pa, createSlots as jn, withCtx as Ut, mergeModels as Ht, onMounted as Es, resolveComponent as va, getCurrentScope as Ss, onScopeDispose as Ps, h as As } from "vue";
const ma = Symbol("dc.routeAdapter");
function Oe(e) {
  if (!e) return "";
  const t = e.replace(/^[?]/, "");
  return t ? `?${t}` : "";
}
function zs() {
  const e = typeof window < "u", t = B(e ? Oe(window.location.search) : ""), n = B(e ? window.location.pathname : "/"), a = () => {
    t.value = Oe(window.location.search), n.value = window.location.pathname;
  };
  e && window.addEventListener("popstate", a);
  const s = (r, o) => {
    const c = Oe(r);
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
    push: (r) => s(r, "push"),
    replace: (r) => s(r, "replace"),
    dispose: () => {
      e && window.removeEventListener("popstate", a);
    }
  };
}
const ha = ["list", "cards", "grid", "table", "links", "preview"], Gc = [
  "minimal",
  "mono-size",
  "dark",
  "light",
  "auto",
  "macos",
  "windows",
  "inherit"
], Qn = ["ok", "running", "queued", "review", "failed"], Rs = "cards", Xc = "updated";
function _a(e) {
  return typeof e == "string" && ha.includes(e);
}
function ct(e, t) {
  return t ? e.entities.find((n) => n.key === t) ?? null : null;
}
function ga(e, t = {}) {
  const n = ct(e, t.entity), a = e.entities[0];
  if (!n && !a) throw new Error(`Schema "${e.key}" declares no entities`);
  return n ?? a;
}
function ya(e) {
  return e?.sorts?.length ? e.sorts : [
    { key: "updated", label: "updated" },
    { key: "score", label: "score" },
    { key: "metric1", label: e ? e.labels.metric1.toLowerCase() : "value" },
    { key: "metric2", label: e ? e.labels.metric2.toLowerCase() : "second value" },
    { key: "name", label: "name" }
  ];
}
function nt(e, t) {
  const n = ya(e);
  return (t ? n.find((s) => s.key === t) : void 0) ?? n[0];
}
function gn(e) {
  switch (e.kind) {
    case "chips":
      return { kind: "chips", selected: [] };
    case "range":
      return { kind: "range", min: null, max: null };
    case "toggle":
      return { kind: "toggle", on: !1 };
  }
}
function Gt(e) {
  const t = {};
  for (const n of e?.facets ?? []) t[n.key] = gn(n);
  return t;
}
function wa(e) {
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
function ba(e) {
  return Object.values(e).some(wa);
}
function yn(e) {
  return e.entity === null && e.expr.trim() === "" && !ba(e.facets);
}
function Yc(e) {
  return e.entity !== null;
}
function ka(e) {
  return e.entity === null && e.view === "cards";
}
function Fs(e, t) {
  return t <= 0 ? 1 : Math.max(1, Math.ceil(e / t));
}
function wn(e, t = {}) {
  const a = t.landing === "entity" ? ga(e, t) : null;
  return {
    entity: a?.key ?? null,
    view: t.view && _a(t.view) ? t.view : Rs,
    sort: nt(a, t.sort).key,
    dir: t.dir === "asc" ? "asc" : "desc",
    expr: "",
    facets: Gt(a),
    page: 1
  };
}
const Ts = ["entity", "sort", "dir", "expr", "facets"];
function Zn(e) {
  return Ts.some((t) => t in e);
}
function $a(e, t) {
  const n = {};
  for (const a of e?.facets ?? []) {
    const s = t[a.key];
    n[a.key] = s && s.kind === a.kind ? s : gn(a);
  }
  return n;
}
const Ls = /^([A-Za-z_][\w.-]*)\s*(>=|<=|:|=|>|<)\s*(.*)$/;
function Ds(e) {
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
function Is(e) {
  const t = e.trim();
  if (!t) return [];
  const n = [];
  let a = [];
  for (const s of Ds(t)) {
    const r = s.toUpperCase();
    if (r === "AND" || r === "&&") continue;
    if (r === "OR" || r === "||") {
      a.length && n.push(a), a = [];
      continue;
    }
    const o = Ls.exec(s);
    o && o[3] !== "" ? a.push({
      kind: "field",
      field: o[1].toLowerCase(),
      comparator: o[2],
      value: o[3]
    }) : a.push({ kind: "text", value: s });
  }
  return a.length && n.push(a), n;
}
function Ns(e, t, n) {
  const a = n.labels, s = (c) => c.toLowerCase().replace(/\s+/g, ""), r = e.replace(/\s+/g, "");
  if (r === "entity") return t.entityKey;
  if (r === "status" || r === "state") return t.status;
  if (r === "score") return t.score;
  if (r === "updated" || r === "date") return t.updatedAt;
  if (r === "name" || r === s(a.primary)) return t.primary;
  if (r === "ref" || r === s(a.secondary)) return t.secondary;
  if (r === "metric1" || r === s(a.metric1)) return t.metric1;
  if (r === "metric2" || r === s(a.metric2)) return t.metric2;
  if (e in t.facets) return t.facets[e];
  const o = n.facets.find((c) => s(c.label) === r);
  return o ? t.facets[o.key] : void 0;
}
function Dt(e, t) {
  const n = e.toLowerCase(), a = t.toLowerCase();
  if (!a.includes("*")) return n.includes(a);
  const s = a.replace(/[.+?^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*");
  return new RegExp(s).test(n);
}
function Vs(e, t, n) {
  if (e.kind === "text")
    return Dt(t.primary, e.value) || Dt(t.secondary, e.value);
  const a = Ns(e.field, t, n);
  if (a === void 0) return !0;
  if (Array.isArray(a))
    return e.comparator === ":" || e.comparator === "=" ? a.some((c) => Dt(c, e.value)) : !0;
  if (e.comparator === ":" || e.comparator === "=") {
    if (typeof a == "boolean") {
      const o = e.value.toLowerCase();
      return o === "true" || o === "yes" ? a : o === "false" || o === "no" ? !a : !0;
    }
    if (typeof a == "number") {
      const o = Number(e.value);
      return Number.isFinite(o) ? a === o : !0;
    }
    return Dt(a, e.value);
  }
  const s = Number(e.value), r = typeof a == "number" ? a : Number(a);
  if (!Number.isFinite(s) || !Number.isFinite(r)) return !0;
  switch (e.comparator) {
    case ">":
      return r > s;
    case ">=":
      return r >= s;
    case "<":
      return r < s;
    case "<=":
      return r <= s;
  }
}
function Os(e, t, n) {
  return e.length ? e.some((a) => a.every((s) => Vs(s, t, n))) : !0;
}
function Jn(e) {
  let t = 2166136261;
  for (let n = 0; n < e.length; n++)
    t ^= e.charCodeAt(n), t = Math.imul(t, 16777619);
  return Math.abs(t);
}
function ea(e) {
  if (!Number.isFinite(e)) return "—";
  const t = Math.abs(e);
  return t >= 1e6 ? `${(e / 1e6).toFixed(1)}m` : t >= 1e3 ? `${(e / 1e3).toFixed(1)}k` : String(Math.round(e));
}
function Ks(e) {
  const t = new Date(e);
  if (Number.isNaN(t.getTime())) return "—";
  const n = String(t.getUTCDate()).padStart(2, "0"), a = String(t.getUTCMonth() + 1).padStart(2, "0");
  return `${n}.${a}.${t.getUTCFullYear()}`;
}
function qs(e) {
  return String(e + 1).padStart(2, "0");
}
function xa(e) {
  return `${Math.round(Math.min(1, Math.max(0, e)) * 100)}%`;
}
const ta = [
  "oklch(0.36 0.06 240)",
  "oklch(0.34 0.07 290)",
  "oklch(0.36 0.06 160)",
  "oklch(0.38 0.06 80)",
  "oklch(0.35 0.07 30)",
  "oklch(0.34 0.05 200)"
];
function Bs(e, t) {
  switch (e.kind) {
    case "chips":
      return e.multiple ? Ws(e.options, t) : e.options[t % e.options.length] ?? "";
    case "range": {
      const n = Math.max(0, e.max - e.min);
      return e.min + (n === 0 ? 0 : t % (n + 1));
    }
    case "toggle":
      return t % 3 === 0;
  }
}
function Ws(e, t) {
  if (!e.length) return [];
  const n = 1 + (t >> 5) % Math.min(3, e.length), a = t % e.length, s = /* @__PURE__ */ new Set();
  for (let r = 0; r < n; r++) s.add((a + r) % e.length);
  return [...s].sort((r, o) => r - o).map((r) => e[r]);
}
function Us(e, t = {}) {
  const n = t.population ?? 48, a = t.seed ?? "", s = t.now ?? /* @__PURE__ */ new Date("2026-08-25T00:00:00Z"), r = e.samples;
  if (!r.length) return [];
  const o = [];
  for (let c = 0; c < n; c++) {
    const l = r[c % r.length], f = Math.floor(c / r.length), d = Jn(`${a}:${e.key}:${l[0]}:${c}`), b = {};
    for (const h of e.facets)
      b[h.key] = Bs(h, Jn(`${d}:${h.key}`));
    const y = new Date(s.getTime() - d % 900 * 36e5).toISOString();
    o.push({
      id: `${e.key}_${1e4 + c * 7}`,
      entityKey: e.key,
      entityLabel: e.label,
      primary: f ? `${l[0]} · rev ${f + 1}` : l[0],
      secondary: f ? `${l[1]}-${f + 1}` : l[1],
      status: Qn[d % Qn.length],
      score: Number((0.35 + d % 64 / 100).toFixed(3)),
      metric1: 1 + d % 940,
      metric2: 1 + (d >> 3) % 320,
      updatedAt: y,
      tint: ta[d % ta.length],
      facets: b
    });
  }
  return o;
}
function Hs(e, t) {
  for (const [n, a] of Object.entries(t)) {
    const s = e.facets[n];
    switch (a.kind) {
      case "chips": {
        if (!a.selected.length) break;
        if (Array.isArray(s)) {
          if (!s.some((r) => a.selected.includes(r))) return !1;
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
function Gs(e) {
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
function Xs(e = {}) {
  const t = /* @__PURE__ */ new Map(), n = (a) => {
    const s = t.get(a.key);
    if (s) return s;
    const r = Us(a, e);
    return t.set(a.key, r), r;
  };
  return {
    query({ query: a, schema: s, entity: r, limit: o, offset: c }) {
      const l = Is(a.expr), f = r ? [r] : s.entities, d = [], b = [];
      for (const k of f)
        for (const w of n(k))
          d.push(w), (r ? Hs(w, a.facets) : !0) && Os(l, w, k) && b.push(w);
      const y = nt(r, a.sort), h = b.sort(Gs(y.key));
      return a.dir === "asc" && h.reverse(), {
        // One page out of the middle. `total` stays the whole match, which is
        // what the shell counts pages with.
        rows: h.slice(c, c + o),
        total: b.length,
        unfiltered: b.length === d.length
      };
    }
  };
}
const Ma = Symbol("dc.shellContext");
function Ys(e) {
  return hn(Ma, e), e;
}
function xe() {
  const e = vt(Ma, null);
  if (!e)
    throw new Error(
      "[header-content-layout] No shell context found. Render this component inside <DataShell>."
    );
  return e;
}
const bn = "e", kn = "v", $n = "s", xn = "d", Mn = "q", Cn = "p", En = "f_", Ca = "*", js = [
  bn,
  kn,
  $n,
  xn,
  Mn,
  Cn
], ln = "..", Ea = ",", Qs = [
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
function tn(e) {
  let t = encodeURIComponent(e);
  for (const [n, a] of Qs) t = t.replace(n, a);
  return t;
}
function Ve(e) {
  try {
    return decodeURIComponent(e.replace(/\+/g, " "));
  } catch {
    return e.replace(/\+/g, " ");
  }
}
function Sa(e) {
  const t = e.replace(/^[?]/, "");
  if (!t) return [];
  const n = [];
  for (const a of t.split("&")) {
    if (!a) continue;
    const s = a.indexOf("="), r = s === -1 ? a : a.slice(0, s), o = s === -1 ? "" : a.slice(s + 1);
    n.push([Ve(r), o]);
  }
  return n;
}
function Zs(e) {
  return js.includes(e) || e.startsWith(En);
}
function na(e, t, n) {
  return Math.min(n, Math.max(t, e));
}
function Js(e, t) {
  const n = Ve(t);
  switch (e.kind) {
    case "chips": {
      const a = new Set(
        n.split(Ea).map((r) => r.trim()).filter(Boolean)
      );
      return { kind: "chips", selected: e.options.filter((r) => a.has(r)) };
    }
    case "range": {
      const a = n.indexOf(ln), s = (a === -1 ? n : n.slice(0, a)).trim(), r = (a === -1 ? "" : n.slice(a + ln.length)).trim(), o = s === "" ? null : Number(s), c = r === "" ? null : Number(r);
      let l = o !== null && Number.isFinite(o) ? na(o, e.min, e.max) : null, f = c !== null && Number.isFinite(c) ? na(c, e.min, e.max) : null;
      return l !== null && f !== null && l > f && ([l, f] = [f, l]), { kind: "range", min: l, max: f };
    }
    case "toggle":
      return { kind: "toggle", on: n === "1" || n === "true" };
  }
}
function er(e, t) {
  switch (e.kind) {
    case "chips":
      return e.selected.length ? (t.kind === "chips" ? t.options.filter((a) => e.selected.includes(a)) : e.selected).join(Ea) : null;
    case "range":
      return e.min === null && e.max === null ? null : `${e.min ?? ""}${ln}${e.max ?? ""}`;
    case "toggle":
      return e.on ? "1" : null;
  }
}
function tr(e, t, n = {}) {
  const a = wn(t, n), s = new Map(Sa(e)), r = s.get(bn), o = r === void 0 ? a.entity : Ve(r), c = o === Ca ? null : ct(t, o), l = s.get(kn), f = l && _a(Ve(l)) ? Ve(l) : a.view, d = s.get($n), b = nt(c, d ? Ve(d) : n.sort), y = s.get(xn), h = y ? Ve(y) === "asc" ? "asc" : "desc" : a.dir, k = s.get(Mn), w = s.get(Cn), $ = w === void 0 ? 1 : Number(Ve(w)), R = Number.isFinite($) ? Math.max(1, Math.floor($)) : 1, q = {};
  for (const W of c?.facets ?? []) {
    const L = s.get(`${En}${W.key}`);
    q[W.key] = L === void 0 ? gn(W) : Js(W, L);
  }
  return {
    entity: c?.key ?? null,
    view: f,
    sort: b.key,
    dir: h,
    expr: k === void 0 ? "" : Ve(k),
    facets: $a(c, q),
    page: R
  };
}
function aa(e, t, n = {}, a = "") {
  const s = wn(t, n), r = ct(t, e.entity), o = Sa(a).filter(([b]) => !Zs(b)), c = [], l = (b, y) => c.push([b, tn(y)]), f = r?.key ?? null;
  f !== s.entity && l(bn, f ?? Ca), e.view !== s.view && l(kn, e.view), e.sort !== s.sort && l($n, e.sort), e.dir !== s.dir && l(xn, e.dir), e.expr.trim() !== "" && l(Mn, e.expr);
  for (const b of r?.facets ?? []) {
    const y = e.facets[b.key];
    if (!y) continue;
    const h = er(y, b);
    h !== null && c.push([`${En}${b.key}`, tn(h)]);
  }
  e.page > 1 && l(Cn, String(e.page));
  const d = [
    ...o.map(([b, y]) => [tn(b), y]),
    ...c
  ];
  return d.length ? `?${d.map(([b, y]) => y === "" ? b : `${b}=${y}`).join("&")}` : "";
}
const on = "entity";
function nr(e, t) {
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
function Pa(e, t) {
  const n = [];
  t && n.push({
    id: on,
    label: `entity:${t.key}`,
    facetKey: on
  });
  for (const a of t?.facets ?? []) {
    const s = e.facets[a.key];
    s && wa(s) && n.push(...nr(a, s));
  }
  return n;
}
function ar(e, t) {
  if (yn(e)) {
    const s = nt(t, e.sort);
    return `everything · ${e.view} · ${s.label}`;
  }
  const n = Pa(e, t).map((s) => s.label), a = e.expr.trim();
  return a && n.push(`"${a}"`), n.join(" · ");
}
function sr(e) {
  const { adapter: t } = e, n = g(() => bt(e.schema)), a = g(() => bt(e.defaults) ?? {}), s = g(() => tr(t.search.value, n.value, a.value)), r = g(() => ct(n.value, s.value.entity)), o = g(() => r.value ?? ga(n.value, a.value)), c = g(() => ya(r.value)), l = g(() => nt(r.value, s.value.sort)), f = (w, $) => {
    const R = aa(w, n.value, a.value, t.search.value);
    R !== t.search.value && ($ === "push" ? t.push(R) : t.replace(R));
  }, d = () => bt(e.navigationMode) ?? "push", b = () => bt(e.facetNavigationMode) ?? "replace", y = (w, $) => {
    const R = w.page ?? (Zn(w) ? 1 : s.value.page);
    f({ ...s.value, ...w, page: R }, $);
  }, h = (w, $) => {
    const R = s.value.facets[w];
    if (!R) return;
    const q = { ...s.value.facets, [w]: $(R) };
    y({ facets: q }, b());
  }, k = (w) => {
    const $ = w === null ? null : ct(n.value, w);
    ($?.key ?? null) !== s.value.entity && y(
      {
        entity: $?.key ?? null,
        sort: nt($, s.value.sort).key,
        facets: Gt($)
      },
      d()
    );
  };
  return {
    query: s,
    entity: r,
    focus: o,
    sort: l,
    sorts: c,
    summary: g(() => ar(s.value, r.value)),
    terms: g(() => Pa(s.value, r.value)),
    isPristine: g(() => yn(s.value)),
    isEverything: g(() => s.value.entity === null),
    hasFacets: g(() => ba(s.value.facets)),
    setEntity: k,
    clearEntity: () => k(null),
    setView(w) {
      y({ view: w }, d());
    },
    setSort(w) {
      y({ sort: nt(r.value, w).key }, d());
    },
    toggleDirection() {
      y({ dir: s.value.dir === "desc" ? "asc" : "desc" }, d());
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
      h(w, (R) => R.kind !== "chips" ? R : { kind: "chips", selected: R.selected.includes($) ? R.selected.filter((W) => W !== $) : [...R.selected, $] });
    },
    setRange(w, $, R) {
      h(w, (q) => q.kind === "range" ? { kind: "range", min: $, max: R } : q);
    },
    toggleFlag(w) {
      h(
        w,
        ($) => $.kind === "toggle" ? { kind: "toggle", on: !$.on } : $
      );
    },
    removeTerm(w) {
      if (w.facetKey === on) {
        k(null);
        return;
      }
      h(w.facetKey, ($) => $.kind === "chips" && w.option ? { kind: "chips", selected: $.selected.filter((R) => R !== w.option) } : $.kind === "range" ? { kind: "range", min: null, max: null } : $.kind === "toggle" ? { kind: "toggle", on: !1 } : $);
    },
    clearFilters() {
      y({ entity: null, expr: "", facets: Gt(null) }, d());
    },
    reset() {
      f(wn(n.value, a.value), d());
    },
    hrefFor(w) {
      const $ = { ...s.value, ...w };
      return $.page = w.page ?? (Zn(w) ? 1 : s.value.page), $.facets = $a(ct(n.value, $.entity), $.facets), `${t.path.value}${aa($, n.value, a.value, t.search.value)}`;
    }
  };
}
function rr(e) {
  const t = qt([]), n = B(0), a = B(!1), s = qt(null);
  let r = 0;
  const o = g(() => (e.query.value.page - 1) * e.limit.value), c = g(() => Fs(n.value, e.limit.value)), l = (d) => {
    t.value = d.rows, n.value = d.total, s.value = null;
  }, f = () => {
    const d = ++r, b = {
      query: e.query.value,
      schema: e.schema.value,
      entity: e.entity.value,
      limit: e.limit.value,
      offset: o.value
    };
    let y;
    try {
      y = e.source.value.query(b);
    } catch (h) {
      s.value = h, t.value = [], n.value = 0;
      return;
    }
    if (!(y instanceof Promise)) {
      l(y), a.value = !1;
      return;
    }
    a.value = !0, y.then((h) => {
      d === r && l(h);
    }).catch((h) => {
      d === r && (s.value = h, t.value = [], n.value = 0);
    }).finally(() => {
      d === r && (a.value = !1);
    });
  };
  return $e([e.source, e.query, e.schema, e.entity, e.limit], f, {
    immediate: !0
  }), { rows: t, total: n, offset: o, pageCount: c, pending: a, error: s, refresh: f };
}
const lr = ["data-dc-expanded"], or = ["aria-expanded", "aria-controls"], ir = { class: "dc-header__domain" }, cr = { class: "dc-header__crumb" }, ur = { class: "dc-header__crumb-root" }, dr = {
  key: 0,
  class: "dc-header__count dc-mono"
}, fr = { class: "dc-header__query" }, pr = ["data-dc-active", "title"], vr = {
  class: "dc-header__chevron",
  "aria-hidden": "true"
}, mr = { class: "dc-header__sr" }, hr = {
  key: 0,
  class: "dc-header__pages",
  "aria-label": "Pages"
}, _r = ["disabled"], gr = ["title"], yr = {
  class: "dc-header__sr",
  "aria-live": "polite"
}, wr = ["disabled"], br = {
  key: 1,
  class: "dc-header__actions"
}, kr = /* @__PURE__ */ ce({
  __name: "ShellHeader",
  props: {
    expanded: { type: Boolean },
    panelId: {},
    hideCount: { type: Boolean }
  },
  emits: ["toggle"],
  setup(e, { emit: t }) {
    const n = e, a = t, s = xe(), r = g(() => s.schema.value), o = g(() => s.entity.value?.label ?? "Everything"), c = g(() => {
      if (n.hideCount) return "";
      const b = s.entity.value;
      return b && !s.hasFacets.value && !s.query.value.expr.trim() ? b.count : String(s.total.value);
    }), l = g(() => s.query.value.page), f = g(
      () => s.pageCount.value > 1 && !ka(s.query.value)
    ), d = g(() => {
      const b = `Page ${l.value} of ${s.pageCount.value}`, y = s.rows.value.length;
      if (!y) return b;
      const h = s.offset.value + 1;
      return `${b} — rows ${h} to ${h + y - 1} of ${s.total.value}`;
    });
    return (b, y) => (m(), _("div", {
      class: "dc-header",
      "data-dc-expanded": e.expanded ? "true" : "false"
    }, [
      v("button", {
        type: "button",
        class: "dc-header__trigger",
        "aria-expanded": e.expanded,
        "aria-controls": e.panelId,
        onClick: y[0] || (y[0] = (h) => a("toggle"))
      }, [
        y[4] || (y[4] = v("span", {
          class: "dc-header__badge",
          "aria-hidden": "true"
        }, "◆", -1)),
        v("span", ir, E(r.value.label), 1),
        v("span", cr, [
          v("span", ur, E(o.value), 1),
          c.value ? (m(), _("span", dr, E(c.value), 1)) : N("", !0)
        ]),
        v("span", fr, [
          y[3] || (y[3] = v("span", { class: "dc-header__query-label" }, "Query", -1)),
          v("span", {
            class: "dc-header__summary dc-mono dc-truncate",
            "data-dc-active": C(s).isPristine.value ? "false" : "true",
            title: C(s).summary.value
          }, E(C(s).summary.value), 9, pr)
        ]),
        v("span", vr, E(e.expanded ? "▲" : "▼"), 1),
        v("span", mr, E(e.expanded ? "Hide query panel" : "Edit query"), 1)
      ], 8, or),
      f.value ? (m(), _("nav", hr, [
        v("button", {
          type: "button",
          class: "dc-header__step",
          "aria-label": "Previous page",
          disabled: l.value <= 1,
          onClick: y[1] || (y[1] = (h) => C(s).setPage(l.value - 1))
        }, [...y[5] || (y[5] = [
          v("span", { "aria-hidden": "true" }, "‹", -1)
        ])], 8, _r),
        v("span", {
          class: "dc-header__page dc-mono",
          title: d.value,
          "aria-hidden": "true"
        }, E(l.value) + " / " + E(C(s).pageCount.value), 9, gr),
        v("span", yr, E(d.value), 1),
        v("button", {
          type: "button",
          class: "dc-header__step",
          "aria-label": "Next page",
          disabled: l.value >= C(s).pageCount.value,
          onClick: y[2] || (y[2] = (h) => C(s).setPage(l.value + 1))
        }, [...y[6] || (y[6] = [
          v("span", { "aria-hidden": "true" }, "›", -1)
        ])], 8, wr)
      ])) : N("", !0),
      b.$slots.actions ? (m(), _("div", br, [
        tt(b.$slots, "actions", {}, void 0, !0)
      ])) : N("", !0)
    ], 8, lr));
  }
}), ue = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [a, s] of t)
    n[a] = s;
  return n;
}, Aa = /* @__PURE__ */ ue(kr, [["__scopeId", "data-v-cdaaadf4"]]), $r = { class: "dc-facet" }, xr = { class: "dc-facet__head" }, Mr = ["id"], Cr = { class: "dc-facet__hint dc-mono" }, Er = ["aria-labelledby"], Sr = ["aria-pressed", "data-dc-active", "onClick"], Pr = ["aria-labelledby"], Ar = ["aria-label", "placeholder", "onKeydown"], zr = ["aria-label", "placeholder", "onKeydown"], Rr = ["aria-checked"], Fr = { class: "dc-switch__text" }, Tr = ["data-dc-active"], Lr = /* @__PURE__ */ ce({
  __name: "FacetControl",
  props: {
    facet: {},
    value: {}
  },
  emits: ["update"],
  setup(e, { emit: t }) {
    const n = e, a = t, s = g(() => {
      const { facet: y, value: h } = n;
      return y.kind === "chips" && h.kind === "chips" ? h.selected.length ? `${h.selected.length} of ${y.options.length}` : "any" : y.kind === "range" && h.kind === "range" ? h.min === null && h.max === null ? `${y.min}–${y.max}` : `${h.min ?? y.min}–${h.max ?? y.max}` : h.kind === "toggle" ? h.on ? "on" : "off" : "";
    }), r = g(
      () => n.value.kind === "chips" ? new Set(n.value.selected) : /* @__PURE__ */ new Set()
    );
    function o(y) {
      if (n.value.kind !== "chips") return;
      const h = r.value.has(y) ? n.value.selected.filter((k) => k !== y) : [...n.value.selected, y];
      a("update", { kind: "chips", selected: h });
    }
    const c = B(""), l = B("");
    $e(
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
      const k = Number(h);
      return Number.isFinite(k) ? k : null;
    }
    function d() {
      if (n.value.kind !== "range") return;
      const y = f(c.value), h = f(l.value);
      y === n.value.min && h === n.value.max || a("update", { kind: "range", min: y, max: h });
    }
    function b() {
      n.value.kind === "toggle" && a("update", { kind: "toggle", on: !n.value.on });
    }
    return (y, h) => (m(), _("div", $r, [
      v("div", xr, [
        v("span", {
          id: `dc-facet-${e.facet.key}`,
          class: "dc-facet__label"
        }, E(e.facet.label), 9, Mr),
        v("span", Cr, E(s.value), 1)
      ]),
      e.facet.kind === "chips" && e.value.kind === "chips" ? (m(), _("div", {
        key: 0,
        class: "dc-facet__chips",
        role: "group",
        "aria-labelledby": `dc-facet-${e.facet.key}`
      }, [
        (m(!0), _(re, null, ve(e.facet.options, (k) => (m(), _("button", {
          key: k,
          type: "button",
          class: "dc-chip",
          "aria-pressed": r.value.has(k),
          "data-dc-active": r.value.has(k) ? "true" : "false",
          onClick: (w) => o(k)
        }, E(k), 9, Sr))), 128))
      ], 8, Er)) : e.facet.kind === "range" && e.value.kind === "range" ? (m(), _("div", {
        key: 1,
        class: "dc-facet__range",
        role: "group",
        "aria-labelledby": `dc-facet-${e.facet.key}`
      }, [
        sn(v("input", {
          "onUpdate:modelValue": h[0] || (h[0] = (k) => c.value = k),
          class: "dc-input dc-mono",
          type: "number",
          inputmode: "numeric",
          "aria-label": `${e.facet.label} minimum`,
          placeholder: String(e.facet.min),
          onChange: d,
          onBlur: d,
          onKeydown: Bt(Re(d, ["prevent"]), ["enter"])
        }, null, 40, Ar), [
          [rn, c.value]
        ]),
        h[2] || (h[2] = v("span", {
          class: "dc-facet__dash",
          "aria-hidden": "true"
        }, "–", -1)),
        sn(v("input", {
          "onUpdate:modelValue": h[1] || (h[1] = (k) => l.value = k),
          class: "dc-input dc-mono",
          type: "number",
          inputmode: "numeric",
          "aria-label": `${e.facet.label} maximum`,
          placeholder: String(e.facet.max),
          onChange: d,
          onBlur: d,
          onKeydown: Bt(Re(d, ["prevent"]), ["enter"])
        }, null, 40, zr), [
          [rn, l.value]
        ])
      ], 8, Pr)) : e.facet.kind === "toggle" && e.value.kind === "toggle" ? (m(), _("button", {
        key: 2,
        type: "button",
        class: "dc-switch",
        role: "switch",
        "aria-checked": e.value.on,
        onClick: b
      }, [
        v("span", Fr, E(e.facet.text), 1),
        v("span", {
          class: "dc-switch__track",
          "data-dc-active": e.value.on ? "true" : "false",
          "aria-hidden": "true"
        }, [...h[3] || (h[3] = [
          v("span", { class: "dc-switch__knob" }, null, -1)
        ])], 8, Tr)
      ], 8, Rr)) : N("", !0)
    ]));
  }
}), za = /* @__PURE__ */ ue(Lr, [["__scopeId", "data-v-c2efbd0c"]]), Dr = ["aria-label"], Ir = ["aria-checked", "data-dc-active", "tabindex", "onClick", "onKeydown"], Nr = /* @__PURE__ */ ce({
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
    function r(o, c) {
      const l = n.options.length;
      let f = null;
      if (o.key === "ArrowRight" || o.key === "ArrowDown" ? f = (c + 1) % l : o.key === "ArrowLeft" || o.key === "ArrowUp" ? f = (c - 1 + l) % l : o.key === "Home" ? f = 0 : o.key === "End" && (f = l - 1), f === null) return;
      o.preventDefault();
      const d = n.options[f];
      d && (a("update:modelValue", d.key), s.value[f]?.focus());
    }
    return (o, c) => (m(), _("div", {
      class: "dc-segmented",
      role: "radiogroup",
      "aria-label": e.label
    }, [
      (m(!0), _(re, null, ve(e.options, (l, f) => (m(), _("button", {
        key: l.key,
        ref_for: !0,
        ref_key: "buttons",
        ref: s,
        type: "button",
        role: "radio",
        class: Ms(["dc-segmented__item", { "dc-segmented__item--mono": e.mono }]),
        "aria-checked": l.key === e.modelValue,
        "data-dc-active": l.key === e.modelValue ? "true" : "false",
        tabindex: l.key === e.modelValue ? 0 : -1,
        onClick: (d) => a("update:modelValue", l.key),
        onKeydown: (d) => r(d, f)
      }, E(l.label), 43, Ir))), 128))
    ], 8, Dr));
  }
}), cn = /* @__PURE__ */ ue(Nr, [["__scopeId", "data-v-63fb5482"]]), Vr = ["id"], Or = { class: "dc-panel__section" }, Kr = { class: "dc-panel__query" }, qr = { class: "dc-panel__expression" }, Br = ["for"], Wr = ["id", "placeholder", "onKeydown"], Ur = {
  key: 0,
  class: "dc-panel__facets"
}, Hr = {
  key: 1,
  class: "dc-panel__hint"
}, Gr = { class: "dc-panel__scope" }, Xr = ["id"], Yr = ["aria-labelledby"], jr = ["data-dc-active", "aria-current"], Qr = { class: "dc-entity__count dc-mono" }, Zr = ["data-dc-active", "aria-current", "onClick"], Jr = { class: "dc-entity__label" }, el = { class: "dc-entity__count dc-mono" }, tl = { class: "dc-panel__actions" }, nl = ["disabled"], al = { class: "dc-panel__section dc-panel__section--row" }, sl = { class: "dc-panel__control" }, rl = { class: "dc-panel__control" }, ll = ["title", "aria-label"], ol = {
  key: 0,
  class: "dc-panel__section"
}, il = /* @__PURE__ */ ce({
  __name: "QueryPanel",
  props: {
    panelId: {},
    views: {}
  },
  emits: ["close"],
  setup(e, { emit: t }) {
    const n = e, a = t, s = _n(), r = xe(), o = {
      list: "List",
      cards: "Cards",
      grid: "Grid",
      table: "Table",
      links: "Links",
      preview: "Preview"
    }, c = g(
      () => (n.views ?? [...ha]).map((w) => ({ key: w, label: o[w] }))
    ), l = g(
      () => r.sorts.value.map((w) => ({ key: w.key, label: w.label }))
    ), f = B(r.query.value.expr), d = B(null);
    $e(
      () => r.query.value.expr,
      (w) => {
        f.value = w;
      }
    );
    const b = g(() => f.value !== r.query.value.expr);
    function y() {
      r.setExpression(f.value), a("close");
    }
    function h() {
      f.value = "", r.clearFilters();
    }
    function k(w, $) {
      r.setFacet(w, $);
    }
    return St(() => d.value?.focus()), (w, $) => (m(), _("div", {
      id: e.panelId,
      class: "dc-panel",
      role: "dialog",
      "aria-label": "Query",
      onKeydown: $[5] || ($[5] = Bt(Re((R) => a("close"), ["stop"]), ["esc"]))
    }, [
      v("section", Or, [
        v("div", Kr, [
          v("div", qr, [
            v("label", {
              class: "dc-panel__field-label",
              for: `${e.panelId}-expr`
            }, "Expression", 8, Br),
            sn(v("input", {
              id: `${e.panelId}-expr`,
              ref_key: "expressionField",
              ref: d,
              "onUpdate:modelValue": $[0] || ($[0] = (R) => f.value = R),
              class: "dc-expression dc-mono",
              type: "text",
              autocomplete: "off",
              spellcheck: "false",
              placeholder: C(r).schema.value.placeholder,
              onKeydown: Bt(Re(y, ["prevent"]), ["enter"])
            }, null, 40, Wr), [
              [rn, f.value]
            ])
          ]),
          C(r).entity.value ? (m(), _("div", Ur, [
            (m(!0), _(re, null, ve(C(r).entity.value.facets, (R) => (m(), be(za, {
              key: R.key,
              facet: R,
              value: C(r).query.value.facets[R.key],
              onUpdate: (q) => k(R.key, q)
            }, null, 8, ["facet", "value", "onUpdate"]))), 128))
          ])) : (m(), _("p", Hr, " Results span every entity — logs and settings included. Pick one below to narrow to it and to get its own filters. "))
        ]),
        v("div", Gr, [
          v("span", {
            id: `${e.panelId}-entities`,
            class: "dc-panel__field-label"
          }, "Entities", 8, Xr),
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
              onClick: $[1] || ($[1] = (R) => C(r).clearEntity())
            }, [
              $[6] || ($[6] = v("span", { class: "dc-entity__label" }, "Everything", -1)),
              v("span", Qr, E(C(r).entities.value.length) + " kinds", 1)
            ], 8, jr),
            (m(!0), _(re, null, ve(C(r).entities.value, (R) => (m(), _("button", {
              key: R.key,
              type: "button",
              class: "dc-entity",
              "data-dc-active": R.key === C(r).entity.value?.key ? "true" : "false",
              "aria-current": R.key === C(r).entity.value?.key ? "true" : void 0,
              onClick: (q) => C(r).setEntity(R.key)
            }, [
              v("span", Jr, E(R.label), 1),
              v("span", el, E(R.count), 1)
            ], 8, Zr))), 128))
          ], 8, Yr)
        ]),
        v("div", tl, [
          v("button", {
            type: "button",
            class: "dc-button dc-button--primary",
            onClick: y
          }, " Run query "),
          v("button", {
            type: "button",
            class: "dc-button",
            disabled: C(r).isPristine.value && !b.value,
            onClick: h
          }, " Reset ", 8, nl)
        ])
      ]),
      v("section", al, [
        v("div", sl, [
          $[7] || ($[7] = v("span", { class: "dc-eyebrow" }, "View", -1)),
          de(cn, {
            label: "Result view",
            "model-value": C(r).query.value.view,
            options: c.value,
            "onUpdate:modelValue": $[2] || ($[2] = (R) => C(r).setView(R))
          }, null, 8, ["model-value", "options"])
        ]),
        v("div", rl, [
          $[8] || ($[8] = v("span", { class: "dc-eyebrow" }, "Sort", -1)),
          de(cn, {
            mono: "",
            label: "Sort field",
            "model-value": C(r).query.value.sort,
            options: l.value,
            "onUpdate:modelValue": $[3] || ($[3] = (R) => C(r).setSort(R))
          }, null, 8, ["model-value", "options"]),
          v("button", {
            type: "button",
            class: "dc-button dc-button--icon dc-mono",
            title: C(r).query.value.dir === "desc" ? "Descending — click to reverse" : "Ascending — click to reverse",
            "aria-label": `Sort direction: ${C(r).query.value.dir === "desc" ? "descending" : "ascending"}`,
            onClick: $[4] || ($[4] = (R) => C(r).toggleDirection())
          }, E(C(r).query.value.dir === "desc" ? "↓" : "↑"), 9, ll)
        ])
      ]),
      s["panel-section"] ? (m(), _("section", ol, [
        tt(w.$slots, "panel-section", {}, void 0, !0)
      ])) : N("", !0)
    ], 40, Vr));
  }
}), Ra = /* @__PURE__ */ ue(il, [["__scopeId", "data-v-d8a6ac01"]]), Fa = {
  primary: "Item",
  secondary: "Reference",
  metric1: "Metric",
  metric2: "Metric 2"
};
function cl() {
  const e = xe();
  return g(() => e.entity.value?.labels ?? Fa);
}
function Ta(e, t, n, a) {
  return {
    row: e,
    entityLabel: e.entityLabel,
    labels: n,
    ordinal: qs(t),
    metric1: ea(e.metric1),
    metric2: ea(e.metric2),
    date: Ks(e.updatedAt),
    score: e.score.toFixed(2),
    percent: xa(e.score),
    pinned: a
  };
}
function ht() {
  const e = xe(), t = g(
    () => new Map(e.entities.value.map((n) => [n.key, n.labels]))
  );
  return g(
    () => e.rows.value.map(
      (n, a) => Ta(
        n,
        e.offset.value + a,
        t.value.get(n.entityKey) ?? Fa,
        e.isPinned(n)
      )
    )
  );
}
const ul = ["data-dc-status"], dl = /* @__PURE__ */ ce({
  __name: "StatusPill",
  props: {
    status: {}
  },
  setup(e) {
    return (t, n) => (m(), _("span", {
      class: "dc-pill",
      "data-dc-status": e.status
    }, E(e.status), 9, ul));
  }
}), Pt = /* @__PURE__ */ ue(dl, [["__scopeId", "data-v-23e59fbf"]]), fl = ["data-dc-active", "aria-pressed", "aria-label"], pl = /* @__PURE__ */ ce({
  __name: "PinStar",
  props: {
    row: {},
    pinned: { type: Boolean }
  },
  setup(e) {
    const t = e, n = xe();
    function a(s) {
      s.stopPropagation(), n.togglePin(t.row);
    }
    return (s, r) => (m(), _("button", {
      type: "button",
      class: "dc-star",
      "data-dc-active": e.pinned ? "true" : "false",
      "aria-pressed": e.pinned,
      "aria-label": e.pinned ? `Unpin ${e.row.primary}` : `Pin ${e.row.primary}`,
      onClick: a
    }, E(e.pinned ? "★" : "☆"), 9, fl));
  }
}), Sn = /* @__PURE__ */ ue(pl, [["__scopeId", "data-v-890e0fb5"]]), vl = { class: "dc-cards" }, ml = { class: "dc-card__top dc-mono" }, hl = {
  key: 0,
  class: "dc-card__entity"
}, _l = { class: "dc-card__top-right" }, gl = ["onClick"], yl = { class: "dc-card__primary" }, wl = { class: "dc-card__secondary dc-mono" }, bl = { class: "dc-card__metrics dc-mono" }, kl = { class: "dc-card__date" }, $l = /* @__PURE__ */ ce({
  __name: "CardsView",
  setup(e) {
    const t = xe(), n = ht(), a = g(() => t.isEverything.value);
    return (s, r) => (m(), _("div", vl, [
      (m(!0), _(re, null, ve(C(n), (o) => (m(), _("div", {
        key: o.row.id,
        class: "dc-card"
      }, [
        v("div", ml, [
          v("span", null, [
            kt(E(o.ordinal) + " ", 1),
            a.value ? (m(), _("span", hl, E(o.entityLabel), 1)) : N("", !0)
          ]),
          v("span", _l, [
            de(Pt, {
              status: o.row.status
            }, null, 8, ["status"]),
            C(t).pinnable.value ? (m(), be(Sn, {
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
          v("span", yl, E(o.row.primary), 1),
          v("span", wl, E(o.row.secondary), 1)
        ], 8, gl),
        v("div", bl, [
          v("span", null, E(o.labels.metric1) + " " + E(o.metric1), 1),
          v("span", null, E(o.labels.metric2) + " " + E(o.metric2), 1),
          v("span", kl, E(o.date), 1)
        ])
      ]))), 128))
    ]));
  }
}), La = /* @__PURE__ */ ue($l, [["__scopeId", "data-v-47fffd2f"]]), xl = { class: "dc-grid" }, Ml = ["onClick"], Cl = { class: "dc-tile__scrim" }, El = { class: "dc-tile__top dc-mono" }, Sl = { class: "dc-tile__chip" }, Pl = { class: "dc-tile__chip" }, Al = { class: "dc-tile__caption" }, zl = { class: "dc-tile__secondary dc-truncate" }, Rl = { class: "dc-tile__primary" }, Fl = /* @__PURE__ */ ce({
  __name: "GridView",
  setup(e) {
    const t = xe(), n = ht();
    return (a, s) => (m(), _("div", xl, [
      (m(!0), _(re, null, ve(C(n), (r) => (m(), _("button", {
        key: r.row.id,
        type: "button",
        class: "dc-tile",
        style: Te({ "--dc-tile-tint": r.row.tint }),
        onClick: (o) => C(t).activate(r.row)
      }, [
        v("span", Cl, [
          v("span", El, [
            v("span", Sl, E(r.ordinal), 1),
            v("span", Pl, E(r.score), 1)
          ]),
          v("span", Al, [
            v("span", zl, E(r.row.secondary), 1),
            v("span", Rl, E(r.row.primary), 1)
          ])
        ])
      ], 12, Ml))), 128))
    ]));
  }
}), Da = /* @__PURE__ */ ue(Fl, [["__scopeId", "data-v-c39dab2f"]]), Tl = { class: "dc-links" }, Ll = ["onClick"], Dl = { class: "dc-link__primary dc-truncate" }, Il = { class: "dc-link__secondary dc-mono dc-truncate" }, Nl = /* @__PURE__ */ ce({
  __name: "LinksView",
  setup(e) {
    const t = xe(), n = ht();
    return (a, s) => (m(), _("div", Tl, [
      (m(!0), _(re, null, ve(C(n), (r) => (m(), _("button", {
        key: r.row.id,
        type: "button",
        class: "dc-link",
        onClick: (o) => C(t).activate(r.row)
      }, [
        v("span", Dl, E(r.row.primary), 1),
        v("span", Il, E(r.row.secondary), 1)
      ], 8, Ll))), 128))
    ]));
  }
}), Ia = /* @__PURE__ */ ue(Nl, [["__scopeId", "data-v-e21922c7"]]), Vl = ["aria-valuenow", "aria-label", "title"], Ol = /* @__PURE__ */ ce({
  __name: "ScoreMeter",
  props: {
    value: {},
    label: {}
  },
  setup(e) {
    const t = e, n = g(() => xa(t.value));
    return (a, s) => (m(), _("span", {
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
        style: Te({ width: n.value })
      }, null, 4)
    ], 8, Vl));
  }
}), Na = /* @__PURE__ */ ue(Ol, [["__scopeId", "data-v-ab794776"]]), Kl = {
  class: "dc-list",
  role: "list"
}, ql = ["onClick"], Bl = { class: "dc-list__ordinal dc-mono" }, Wl = { class: "dc-list__identity" }, Ul = { class: "dc-list__primary dc-truncate" }, Hl = { class: "dc-list__secondary dc-mono dc-truncate" }, Gl = {
  key: 0,
  class: "dc-list__entity dc-mono"
}, Xl = { class: "dc-list__metrics dc-mono" }, Yl = ["title"], jl = ["title"], Ql = { class: "dc-list__trailing" }, Zl = /* @__PURE__ */ ce({
  __name: "ListView",
  setup(e) {
    const t = xe(), n = ht(), a = g(() => t.isEverything.value);
    return (s, r) => (m(), _("div", Kl, [
      (m(!0), _(re, null, ve(C(n), (o) => (m(), _("div", {
        key: o.row.id,
        class: "dc-list__row",
        role: "listitem"
      }, [
        v("button", {
          type: "button",
          class: "dc-list__open",
          onClick: (c) => C(t).activate(o.row)
        }, [
          v("span", Bl, E(o.ordinal), 1),
          v("span", Wl, [
            v("span", Ul, E(o.row.primary), 1),
            v("span", Hl, E(o.row.secondary), 1)
          ]),
          a.value ? (m(), _("span", Gl, E(o.entityLabel), 1)) : N("", !0),
          v("span", Xl, [
            v("span", {
              title: o.labels.metric1
            }, E(o.metric1), 9, Yl),
            v("span", {
              title: o.labels.metric2
            }, E(o.metric2), 9, jl),
            de(Na, {
              value: o.row.score
            }, null, 8, ["value"])
          ])
        ], 8, ql),
        v("span", Ql, [
          de(Pt, {
            status: o.row.status
          }, null, 8, ["status"]),
          C(t).pinnable.value ? (m(), be(Sn, {
            key: 0,
            row: o.row,
            pinned: o.pinned
          }, null, 8, ["row", "pinned"])) : N("", !0)
        ])
      ]))), 128))
    ]));
  }
}), un = /* @__PURE__ */ ue(Zl, [["__scopeId", "data-v-922176e3"]]), Jl = { class: "dc-preview" }, eo = { class: "dc-preview__pager dc-mono" }, to = ["disabled"], no = { "aria-live": "polite" }, ao = ["disabled"], so = {
  key: 0,
  class: "dc-preview__card"
}, ro = { class: "dc-preview__body" }, lo = { class: "dc-preview__top" }, oo = { class: "dc-preview__badges" }, io = { class: "dc-preview__entity dc-mono" }, co = { class: "dc-preview__primary" }, uo = { class: "dc-preview__secondary dc-mono" }, fo = { class: "dc-preview__fields" }, po = { class: "dc-preview__key" }, vo = { class: "dc-preview__value dc-mono" }, mo = /* @__PURE__ */ ce({
  __name: "PreviewView",
  setup(e) {
    const t = xe(), n = ht(), a = B(0);
    $e(n, (l) => {
      a.value > l.length - 1 && (a.value = Math.max(0, l.length - 1));
    });
    const s = g(() => n.value[a.value]), r = g(() => {
      const l = s.value;
      return l ? [
        { key: l.labels.secondary, value: l.row.secondary },
        { key: l.labels.metric1, value: l.metric1 },
        { key: l.labels.metric2, value: l.metric2 },
        { key: "Updated", value: l.date }
      ] : [];
    }), o = g(() => {
      if (!n.value.length) return "0 / 0";
      const l = t.total.value > n.value.length ? ` of ${t.total.value}` : "";
      return `${a.value + 1} / ${n.value.length}${l}`;
    }), c = (l) => {
      const f = n.value.length;
      f && (a.value = Math.min(f - 1, Math.max(0, a.value + l)));
    };
    return (l, f) => (m(), _("div", Jl, [
      v("div", eo, [
        v("button", {
          type: "button",
          class: "dc-preview__step",
          "aria-label": "Previous result",
          disabled: a.value === 0,
          onClick: f[0] || (f[0] = (d) => c(-1))
        }, " ‹ ", 8, to),
        v("span", no, E(o.value), 1),
        v("button", {
          type: "button",
          class: "dc-preview__step",
          "aria-label": "Next result",
          disabled: a.value >= C(n).length - 1,
          onClick: f[1] || (f[1] = (d) => c(1))
        }, " › ", 8, ao)
      ]),
      s.value ? (m(), _("div", so, [
        v("div", {
          class: "dc-preview__media",
          style: Te({ background: s.value.row.tint }),
          "aria-hidden": "true"
        }, " preview ", 4),
        v("div", ro, [
          v("div", lo, [
            v("span", oo, [
              de(Pt, {
                status: s.value.row.status
              }, null, 8, ["status"]),
              v("span", io, E(s.value.entityLabel), 1)
            ]),
            C(t).pinnable.value ? (m(), be(Sn, {
              key: 0,
              row: s.value.row,
              pinned: s.value.pinned
            }, null, 8, ["row", "pinned"])) : N("", !0)
          ]),
          v("div", null, [
            v("div", co, E(s.value.row.primary), 1),
            v("div", uo, E(s.value.row.secondary), 1)
          ]),
          v("dl", fo, [
            (m(!0), _(re, null, ve(r.value, (d) => (m(), _("div", {
              key: d.key,
              class: "dc-preview__field"
            }, [
              v("dt", po, E(d.key), 1),
              v("dd", vo, E(d.value), 1)
            ]))), 128))
          ]),
          v("button", {
            type: "button",
            class: "dc-preview__open",
            onClick: f[2] || (f[2] = (d) => C(t).activate(s.value.row))
          }, " Open record → ")
        ])
      ])) : N("", !0)
    ]));
  }
}), Va = /* @__PURE__ */ ue(mo, [["__scopeId", "data-v-35517a68"]]), ho = { class: "dc-table" }, _o = ["aria-sort"], go = { scope: "col" }, yo = {
  key: 0,
  class: "dc-table__entity",
  scope: "col"
}, wo = ["aria-sort"], bo = ["aria-sort"], ko = ["aria-sort"], $o = ["onClick"], xo = { class: "dc-table__num dc-mono" }, Mo = { class: "dc-table__primary" }, Co = ["onClick"], Eo = { class: "dc-table__muted dc-mono" }, So = {
  key: 0,
  class: "dc-table__entity dc-mono"
}, Po = { class: "dc-table__number dc-mono" }, Ao = { class: "dc-table__number dc-mono" }, zo = { class: "dc-table__muted dc-mono" }, Ro = /* @__PURE__ */ ce({
  __name: "TableView",
  setup(e) {
    const t = xe(), n = ht(), a = cl(), s = g(() => t.isEverything.value);
    function r(l) {
      t.query.value.sort === l ? t.toggleDirection() : t.setSort(l);
    }
    const o = (l) => t.query.value.sort !== l ? "none" : t.query.value.dir === "desc" ? "descending" : "ascending", c = g(() => new Set(t.sorts.value.map((l) => l.key)));
    return (l, f) => (m(), _("table", ho, [
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
              onClick: f[0] || (f[0] = (d) => r("name"))
            }, E(C(a).primary), 1)) : (m(), _(re, { key: 1 }, [
              kt(E(C(a).primary), 1)
            ], 64))
          ], 8, _o),
          v("th", go, E(C(a).secondary), 1),
          s.value ? (m(), _("th", yo, " Entity ")) : N("", !0),
          v("th", {
            class: "dc-table__number",
            scope: "col",
            "aria-sort": o("metric1")
          }, [
            c.value.has("metric1") ? (m(), _("button", {
              key: 0,
              type: "button",
              class: "dc-table__sort",
              onClick: f[1] || (f[1] = (d) => r("metric1"))
            }, E(C(a).metric1), 1)) : (m(), _(re, { key: 1 }, [
              kt(E(C(a).metric1), 1)
            ], 64))
          ], 8, wo),
          v("th", {
            class: "dc-table__number",
            scope: "col",
            "aria-sort": o("metric2")
          }, [
            c.value.has("metric2") ? (m(), _("button", {
              key: 0,
              type: "button",
              class: "dc-table__sort",
              onClick: f[2] || (f[2] = (d) => r("metric2"))
            }, E(C(a).metric2), 1)) : (m(), _(re, { key: 1 }, [
              kt(E(C(a).metric2), 1)
            ], 64))
          ], 8, bo),
          v("th", {
            class: "dc-table__date",
            scope: "col",
            "aria-sort": o("updated")
          }, [
            c.value.has("updated") ? (m(), _("button", {
              key: 0,
              type: "button",
              class: "dc-table__sort",
              onClick: f[3] || (f[3] = (d) => r("updated"))
            }, " Updated ")) : (m(), _(re, { key: 1 }, [
              kt(" Updated ")
            ], 64))
          ], 8, ko),
          f[5] || (f[5] = v("th", {
            class: "dc-table__state",
            scope: "col"
          }, " State ", -1))
        ])
      ]),
      v("tbody", null, [
        (m(!0), _(re, null, ve(C(n), (d) => (m(), _("tr", {
          key: d.row.id,
          class: "dc-table__row",
          onClick: (b) => C(t).activate(d.row)
        }, [
          v("td", xo, E(d.ordinal), 1),
          v("td", Mo, [
            v("button", {
              type: "button",
              class: "dc-table__open",
              onClick: Re((b) => C(t).activate(d.row), ["stop"])
            }, E(d.row.primary), 9, Co)
          ]),
          v("td", Eo, E(d.row.secondary), 1),
          s.value ? (m(), _("td", So, E(d.entityLabel), 1)) : N("", !0),
          v("td", Po, E(d.metric1), 1),
          v("td", Ao, E(d.metric2), 1),
          v("td", zo, E(d.date), 1),
          v("td", null, [
            de(Pt, {
              status: d.row.status
            }, null, 8, ["status"])
          ])
        ], 8, $o))), 128))
      ])
    ]));
  }
}), Oa = /* @__PURE__ */ ue(Ro, [["__scopeId", "data-v-b72dd50e"]]);
function Fo(e) {
  const t = qt([]), n = B(!1), a = qt(null);
  let s = 0;
  const r = (l, f, d) => ({
    entity: l,
    rows: f.rows.map(
      (b, y) => Ta(b, y, l.labels, e.isPinned(b.id))
    ),
    total: f.total,
    count: d ? l.count : String(f.total)
  }), o = () => {
    const l = ++s, f = e.query.value, d = e.schema.value, b = e.entities.value, y = e.limit.value, h = yn(f), k = b.map((w) => ({
      entity: w,
      // Scope the query to this entity, keeping the expression and ordering
      // but dropping facets, which belong to whichever entity is selected.
      outcome: e.source.value.query({
        // Each card is the top few of its type, wherever the shell's own
        // result set has been paged to — so this asks for the first page.
        query: { ...f, entity: w.key, facets: Gt(w), page: 1 },
        schema: d,
        entity: w,
        limit: y,
        offset: 0
      })
    }));
    if (k.every(({ outcome: w }) => !(w instanceof Promise))) {
      t.value = k.map(
        ({ entity: w, outcome: $ }) => r(w, $, h)
      ), a.value = null, n.value = !1;
      return;
    }
    n.value = !0, Promise.all(k.map(({ outcome: w }) => Promise.resolve(w))).then((w) => {
      l === s && (t.value = w.map(
        ($, R) => r(k[R].entity, $, h)
      ), a.value = null);
    }).catch((w) => {
      l === s && (a.value = w, t.value = []);
    }).finally(() => {
      l === s && (n.value = !1);
    });
  }, c = () => {
    try {
      o();
    } catch (l) {
      a.value = l, t.value = [], n.value = !1;
    }
  };
  return $e(
    [e.source, e.schema, e.query, e.entities, e.limit],
    c,
    { immediate: !0 }
  ), { previews: t, pending: n, error: a, refresh: c };
}
const To = {
  key: 0,
  class: "dc-types__state",
  role: "alert"
}, Lo = {
  key: 1,
  class: "dc-types__state",
  "aria-live": "polite"
}, Do = ["data-dc-pending"], Io = ["data-dc-empty"], No = ["onClick"], Vo = { class: "dc-type__name" }, Oo = { class: "dc-type__count dc-mono" }, Ko = { class: "dc-type__sr" }, qo = {
  key: 0,
  class: "dc-type__empty"
}, Bo = ["onClick"], Wo = { class: "dc-type__identity" }, Uo = { class: "dc-type__primary dc-truncate" }, Ho = { class: "dc-type__secondary dc-mono dc-truncate" }, Go = { class: "dc-type__trailing dc-mono" }, Xo = { class: "dc-type__metric" }, Yo = { class: "dc-type__metric-value" }, jo = { class: "dc-type__metric-label" }, Qo = { class: "dc-type__date" }, Zo = /* @__PURE__ */ ce({
  __name: "TypeCardsView",
  setup(e) {
    const t = xe(), { previews: n, pending: a, error: s } = Fo({
      source: t.source,
      schema: t.schema,
      query: t.query,
      entities: t.entities,
      limit: t.previewsPerType,
      isPinned: (o) => t.isPinnedId(o)
    }), r = g(() => !t.isPristine.value);
    return (o, c) => C(s) ? (m(), _("p", To, " Could not load results: " + E(C(s) instanceof Error ? C(s).message : "the data source failed."), 1)) : !C(n).length && C(a) ? (m(), _("p", Lo, " Running query… ")) : (m(), _("div", {
      key: 2,
      class: "dc-types",
      "data-dc-pending": C(a) ? "true" : "false"
    }, [
      (m(!0), _(re, null, ve(C(n), (l) => (m(), _("section", {
        key: l.entity.key,
        class: "dc-type",
        "data-dc-empty": l.rows.length ? "false" : "true"
      }, [
        v("button", {
          type: "button",
          class: "dc-type__head",
          onClick: (f) => C(t).setEntity(l.entity.key)
        }, [
          v("span", Vo, E(l.entity.label), 1),
          v("span", Oo, E(l.count), 1),
          c[0] || (c[0] = v("span", {
            class: "dc-type__go",
            "aria-hidden": "true"
          }, "→", -1)),
          v("span", Ko, "Show only " + E(l.entity.label.toLowerCase()), 1)
        ], 8, No),
        l.rows.length ? N("", !0) : (m(), _("p", qo, E(r.value ? "No matches" : "Nothing here yet"), 1)),
        (m(!0), _(re, null, ve(l.rows, (f) => (m(), _("button", {
          key: f.row.id,
          type: "button",
          class: "dc-type__row",
          onClick: (d) => C(t).activate(f.row)
        }, [
          v("span", Wo, [
            v("span", Uo, E(f.row.primary), 1),
            v("span", Ho, E(f.row.secondary), 1)
          ]),
          v("span", Go, [
            v("span", Xo, [
              v("span", Yo, E(f.metric1), 1),
              v("span", jo, E(f.labels.metric1), 1)
            ]),
            v("span", Qo, E(f.date), 1)
          ])
        ], 8, Bo))), 128))
      ], 8, Io))), 128))
    ], 8, Do));
  }
}), Ka = /* @__PURE__ */ ue(Zo, [["__scopeId", "data-v-887d72ab"]]), Jo = ["data-dc-pending"], ei = {
  key: 0,
  class: "dc-results__state",
  role: "alert"
}, ti = { class: "dc-results__detail" }, ni = {
  key: 2,
  class: "dc-results__state",
  "aria-live": "polite"
}, ai = {
  key: 3,
  class: "dc-results__state"
}, si = { class: "dc-results__detail" }, ri = /* @__PURE__ */ ce({
  __name: "ResultsArea",
  setup(e) {
    const t = xe(), n = {
      list: un,
      cards: La,
      grid: Da,
      table: Oa,
      links: Ia,
      preview: Va
    }, a = g(() => ka(t.query.value)), s = g(() => n[t.query.value.view] ?? un), r = g(() => t.rows.value.length > 0), o = g(() => t.error.value !== null);
    return (c, l) => (m(), _("div", {
      class: "dc-results",
      "data-dc-pending": C(t).pending.value ? "true" : "false"
    }, [
      o.value ? (m(), _("p", ei, [
        l[1] || (l[1] = v("span", { class: "dc-results__headline" }, "Could not load results", -1)),
        v("span", ti, E(C(t).error.value instanceof Error ? C(t).error.value.message : "The data source failed."), 1)
      ])) : a.value ? (m(), be(Ka, { key: 1 })) : !r.value && C(t).pending.value ? (m(), _("p", ni, [...l[2] || (l[2] = [
        v("span", { class: "dc-results__detail" }, "Running query…", -1)
      ])])) : r.value ? (m(), be(Cs(s.value), { key: 4 })) : (m(), _("div", ai, [
        l[3] || (l[3] = v("span", { class: "dc-results__headline" }, "Nothing matches this query", -1)),
        v("span", si, E(C(t).summary.value), 1),
        C(t).isPristine.value ? N("", !0) : (m(), _("button", {
          key: 0,
          type: "button",
          class: "dc-results__clear",
          onClick: l[0] || (l[0] = (f) => C(t).clearFilters())
        }, E(C(t).isEverything.value ? "Clear filters" : "Search everything instead"), 1))
      ]))
    ], 8, Jo));
  }
}), qa = /* @__PURE__ */ ue(ri, [["__scopeId", "data-v-1ccb2731"]]), li = ["data-dc-theme"], oi = ["data-dc-width", "data-dc-align"], ii = { class: "dc-shell__panel" }, ci = /* @__PURE__ */ ce({
  __name: "DataShell",
  props: /* @__PURE__ */ Ht({
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
  emits: /* @__PURE__ */ Ht(["activate", "query-change", "toggle-pin"], ["update:open", "update:pinned"]),
  setup(e, { expose: t, emit: n }) {
    const a = e, s = n, r = Wt(e, "open"), o = Wt(e, "pinned"), c = _n(), l = vt(ma, null), f = a.route || l ? null : zs(), d = a.route ?? l ?? f;
    je(() => f?.dispose?.());
    const b = g(() => Xs({ seed: a.schema.key })), y = g(() => a.source ?? b.value), h = sr({
      schema: () => a.schema,
      adapter: d,
      defaults: () => a.defaults,
      navigationMode: () => a.navigationMode,
      facetNavigationMode: () => a.facetNavigationMode
    }), k = rr({
      source: y,
      query: h.query,
      schema: g(() => a.schema),
      entity: h.entity,
      limit: g(() => a.limit)
    });
    $e(h.query, (z) => s("query-change", z)), $e(
      [k.pageCount, k.pending, h.query],
      () => {
        if (k.pending.value) return;
        const z = k.pageCount.value;
        h.query.value.page > z && h.setPage(z, "replace");
      },
      // Immediately, since a pasted URL is past the end before anything changes;
      // and after the render, so the correction is a navigation the mounted shell
      // makes rather than one it makes on the way up. An async source is still
      // pending here and corrects itself when its count lands.
      { immediate: !0, flush: "post" }
    );
    const w = pa() ?? "dc-query-panel", $ = B(null);
    function R() {
      r.value && (r.value = !1, St(() => {
        $.value?.$el?.querySelector(".dc-header__trigger")?.focus();
      }));
    }
    const q = g(() => new Set(o.value));
    function W(z) {
      const M = new Set(q.value);
      M.has(z.id) ? M.delete(z.id) : M.add(z.id), o.value = [...M], s("toggle-pin", z);
    }
    const L = Ys({
      ...h,
      schema: g(() => a.schema),
      entities: g(() => a.schema.entities),
      rows: k.rows,
      total: k.total,
      limit: g(() => a.limit),
      offset: k.offset,
      pageCount: k.pageCount,
      pending: k.pending,
      error: k.error,
      source: y,
      previewsPerType: g(() => a.previewsPerType),
      pinnable: g(() => a.pinnable === !0),
      isPinned: (z) => q.value.has(z.id),
      isPinnedId: (z) => q.value.has(z),
      togglePin: W,
      activate: (z) => s("activate", z)
    }), I = g(() => {
      if (!(!a.accent && !a.tokens))
        return { ...a.tokens, ...a.accent ? { "--dc-accent": a.accent } : {} };
    });
    return t({
      query: h.query,
      openPanel: () => {
        r.value = !0;
      },
      closePanel: R
    }), (z, M) => (m(), _("div", {
      class: "dc-shell",
      "data-dc-theme": e.theme,
      style: Te(I.value)
    }, [
      v("div", {
        class: "dc-shell__head",
        "data-dc-width": e.matchWidth,
        "data-dc-align": e.matchWidth === "shrink" ? e.headAlign : void 0
      }, [
        de(Aa, {
          ref_key: "headerRef",
          ref: $,
          expanded: r.value,
          "panel-id": C(w),
          onToggle: M[0] || (M[0] = (P) => r.value = !r.value)
        }, jn({ _: 2 }, [
          c.actions ? {
            name: "actions",
            fn: Ut(() => [
              tt(z.$slots, "actions", {}, void 0, !0)
            ]),
            key: "0"
          } : void 0
        ]), 1032, ["expanded", "panel-id"]),
        r.value ? (m(), _(re, { key: 0 }, [
          v("div", {
            class: "dc-shell__scrim",
            onClick: R
          }),
          v("div", ii, [
            de(Ra, {
              "panel-id": C(w),
              views: e.views,
              onClose: R
            }, jn({ _: 2 }, [
              c["panel-section"] ? {
                name: "panel-section",
                fn: Ut(() => [
                  tt(z.$slots, "panel-section", {}, void 0, !0)
                ]),
                key: "0"
              } : void 0
            ]), 1032, ["panel-id", "views"])
          ])
        ], 64)) : N("", !0)
      ], 8, oi),
      tt(z.$slots, "results", {
        rows: C(L).rows.value,
        total: C(L).total.value,
        offset: C(L).offset.value,
        pageCount: C(L).pageCount.value,
        query: C(L).query.value,
        pending: C(L).pending.value
      }, () => [
        de(qa)
      ], !0)
    ], 12, li));
  }
}), ui = /* @__PURE__ */ ue(ci, [["__scopeId", "data-v-5c8fb29f"]]), xt = (e) => e.separator !== !0 && e.heading !== !0 && e.disabled !== !0, di = ["aria-label"], fi = ["role", "aria-label"], pi = ["data-dc-item"], vi = {
  key: 0,
  class: "dc-menu__rule",
  role: "separator"
}, mi = ["role", "aria-checked", "aria-haspopup", "aria-expanded", "aria-disabled", "disabled", "data-dc-item", "onClick", "onMouseenter"], hi = {
  class: "dc-menu__mark",
  "aria-hidden": "true"
}, _i = { class: "dc-menu__label dc-truncate" }, gi = {
  key: 0,
  class: "dc-menu__key dc-mono"
}, yi = {
  key: 1,
  class: "dc-menu__more",
  "aria-hidden": "true"
}, wi = /* @__PURE__ */ ce({
  __name: "MenuList",
  props: {
    items: {},
    at: {},
    label: {},
    autofocus: { type: Boolean }
  },
  emits: ["choose", "dismiss"],
  setup(e, { expose: t, emit: n }) {
    const a = e, s = n, r = B(null), o = B([]), c = B(null), l = B(null), f = B(null), d = B(!1), b = g(
      () => a.items.flatMap((M, P) => xt(M) ? [P] : [])
    ), y = g(() => {
      const M = [{ entries: [] }];
      return a.items.forEach((P, Z) => {
        P.heading ? M.push({ heading: P, entries: [] }) : M[M.length - 1]?.entries.push({ item: P, index: Z });
      }), M.filter((P) => P.entries.length > 0);
    }), h = B({ x: a.at.x, y: a.at.y });
    async function k() {
      h.value = { x: a.at.x, y: a.at.y }, await St();
      const M = r.value?.getBoundingClientRect();
      if (!M) return;
      const P = 8;
      let Z = a.at.x, le = a.at.y;
      if (Z + M.width > window.innerWidth - P) {
        const fe = a.at.mirrorX === void 0 ? null : a.at.mirrorX - M.width;
        Z = fe !== null && fe >= P ? fe : window.innerWidth - M.width - P;
      }
      le + M.height > window.innerHeight - P && (le = window.innerHeight - M.height - P), h.value = { x: Math.max(P, Z), y: Math.max(P, le) };
    }
    const w = g(() => ({ left: `${h.value.x}px`, top: `${h.value.y}px` }));
    function $(M) {
      c.value = M, M !== null && St(() => o.value[M]?.focus());
    }
    function R(M, P) {
      const Z = b.value;
      if (Z.length === 0) return null;
      if (M === null) return P === 1 ? Z[0] ?? null : Z[Z.length - 1] ?? null;
      const le = Z.indexOf(M);
      return le === -1 ? Z[0] ?? null : Z[(le + P + Z.length) % Z.length] ?? null;
    }
    function q(M, P) {
      if (!a.items[M]?.items?.length) return;
      const le = o.value[M]?.getBoundingClientRect(), fe = r.value?.getBoundingClientRect();
      !le || !fe || (f.value = { x: fe.right - 4, y: le.top - 4, mirrorX: fe.left + 4 }, l.value = M, d.value = P);
    }
    function W(M) {
      const P = l.value;
      l.value = null, f.value = null, M && P !== null && $(P);
    }
    function L(M) {
      const P = a.items[M];
      if (!(!P || !xt(P))) {
        if (P.items?.length) {
          q(M, !0);
          return;
        }
        s("choose", P);
      }
    }
    function I(M) {
      const P = M.key;
      if (P === "Escape") {
        M.preventDefault(), M.stopPropagation(), l.value !== null ? W(!0) : s("dismiss");
        return;
      }
      if (P === "ArrowDown" || P === "ArrowUp") {
        M.preventDefault(), M.stopPropagation(), W(!1), $(R(c.value, P === "ArrowDown" ? 1 : -1));
        return;
      }
      if (P === "Home" || P === "End") {
        M.preventDefault(), M.stopPropagation(), W(!1), $(R(null, P === "Home" ? 1 : -1));
        return;
      }
      if (P === "ArrowRight") {
        const Z = c.value;
        Z !== null && a.items[Z]?.items?.length && (M.preventDefault(), M.stopPropagation(), q(Z, !0));
        return;
      }
      if (P === "ArrowLeft") {
        l.value !== null && (M.preventDefault(), M.stopPropagation(), W(!0));
        return;
      }
      if (P === "Enter" || P === " ") {
        const Z = c.value;
        if (Z === null) return;
        M.preventDefault(), M.stopPropagation(), L(Z);
      }
    }
    function z(M) {
      const P = a.items[M];
      !P || !xt(P) || (l.value !== null && l.value !== M && W(!1), $(M), P.items?.length && q(M, !1));
    }
    return Es(() => {
      k(), a.autofocus && $(R(null, 1));
    }), $e(() => a.at, k, { deep: !0 }), $e(() => a.items, () => void k(), { deep: !0 }), je(() => {
      l.value = null;
    }), t({ root: r }), (M, P) => {
      const Z = va("MenuList", !0);
      return m(), _("div", {
        ref_key: "root",
        ref: r,
        class: "dc-menu",
        role: "menu",
        "aria-label": e.label,
        style: Te(w.value),
        onKeydown: I
      }, [
        (m(!0), _(re, null, ve(y.value, (le, fe) => (m(), _("div", {
          key: `${fe}-${le.heading?.label ?? ""}`,
          class: "dc-menu__group",
          role: le.heading ? "group" : "none",
          "aria-label": le.heading?.label
        }, [
          le.heading ? (m(), _("div", {
            key: 0,
            class: "dc-menu__heading dc-truncate",
            "aria-hidden": "true",
            "data-dc-item": le.heading.id
          }, E(le.heading.label), 9, pi)) : N("", !0),
          (m(!0), _(re, null, ve(le.entries, ({ item: j, index: Me }) => (m(), _(re, {
            key: j.id ?? `${Me}-${j.label ?? ""}`
          }, [
            j.separator ? (m(), _("div", vi)) : (m(), _("button", {
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
              onClick: (Pe) => L(Me),
              onMouseenter: (Pe) => z(Me)
            }, [
              v("span", hi, E(j.checked ? "✓" : ""), 1),
              v("span", _i, E(j.label), 1),
              j.shortcut ? (m(), _("span", gi, E(j.shortcut), 1)) : j.items?.length ? (m(), _("span", yi, "›")) : N("", !0)
            ], 40, mi))
          ], 64))), 128))
        ], 8, fi))), 128)),
        l.value !== null && f.value ? (m(), be(Z, {
          key: l.value,
          items: e.items[l.value]?.items ?? [],
          at: f.value,
          label: e.items[l.value]?.label,
          autofocus: d.value,
          onChoose: P[0] || (P[0] = (le) => s("choose", le)),
          onDismiss: P[1] || (P[1] = (le) => W(!0))
        }, null, 8, ["items", "at", "label", "autofocus"])) : N("", !0)
      ], 44, di);
    };
  }
}), Ba = /* @__PURE__ */ ue(wi, [["__scopeId", "data-v-9b1413fa"]]), bi = ["data-dc-theme", "aria-label"], ki = ["aria-expanded", "aria-disabled", "disabled", "data-dc-menu", "tabindex", "onClick", "onMouseenter"], $i = /* @__PURE__ */ ce({
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
    }), s = t, r = B(null), o = B([]), c = B(null), l = B(null), f = B(!1), d = g(
      () => n.menus.flatMap((L, I) => xt(L) ? [I] : [])
    );
    function b(L, I) {
      const z = o.value[L]?.getBoundingClientRect(), M = n.menus[L];
      !z || !M || !xt(M) || (l.value = { x: z.left, y: z.bottom + 2, mirrorX: z.right }, c.value = L, f.value = I);
    }
    function y(L) {
      const I = c.value;
      c.value = null, l.value = null, L && I !== null && o.value[I]?.focus();
    }
    function h(L) {
      c.value === L ? y(!0) : b(L, !1);
    }
    function k(L) {
      c.value === null || c.value === L || b(L, !1);
    }
    function w(L, I) {
      const z = d.value;
      if (z.length === 0) return null;
      if (L === null) return I === 1 ? z[0] ?? null : z[z.length - 1] ?? null;
      const M = z.indexOf(L);
      return M === -1 ? z[0] ?? null : z[(M + I + z.length) % z.length] ?? null;
    }
    function $(L) {
      const I = L.key;
      if (I === "Escape") {
        if (c.value === null) return;
        L.preventDefault(), y(!0);
        return;
      }
      if (I === "ArrowDown" && c.value === null) {
        const P = R();
        if (P === null) return;
        L.preventDefault(), b(P, !0);
        return;
      }
      if (I !== "ArrowLeft" && I !== "ArrowRight") return;
      const z = c.value ?? R(), M = w(z, I === "ArrowRight" ? 1 : -1);
      M !== null && (L.preventDefault(), c.value !== null ? b(M, !0) : o.value[M]?.focus());
    }
    function R() {
      const L = o.value.findIndex((I) => I === document.activeElement);
      return L === -1 ? d.value[0] ?? null : L;
    }
    function q(L) {
      const I = L.target;
      !I || r.value?.contains(I) || y(!1);
    }
    $e(c, (L) => {
      L !== null ? window.addEventListener("pointerdown", q, !0) : window.removeEventListener("pointerdown", q, !0);
    }), je(() => window.removeEventListener("pointerdown", q, !0));
    function W(L) {
      y(!0), L.action?.(), s("choose", L);
    }
    return (L, I) => (m(), _("div", {
      ref_key: "bar",
      ref: r,
      class: "dc-shell dc-menubar",
      role: "menubar",
      "data-dc-theme": e.theme,
      "aria-label": e.label ?? "Main menu",
      style: Te(a.value),
      onKeydown: $
    }, [
      (m(!0), _(re, null, ve(e.menus, (z, M) => (m(), _("button", {
        key: z.id ?? z.label ?? M,
        ref_for: !0,
        ref: (P) => {
          P && (o.value[M] = P);
        },
        type: "button",
        class: "dc-menubar__item",
        role: "menuitem",
        "aria-haspopup": "menu",
        "aria-expanded": c.value === M,
        "aria-disabled": z.disabled ? "true" : void 0,
        disabled: z.disabled,
        "data-dc-menu": z.id ?? z.label,
        tabindex: M === (d.value[0] ?? 0) ? 0 : -1,
        onClick: (P) => h(M),
        onMouseenter: (P) => k(M)
      }, E(z.label), 41, ki))), 128)),
      c.value !== null && l.value ? (m(), be(Ba, {
        key: c.value,
        items: e.menus[c.value]?.items ?? [],
        at: l.value,
        label: e.menus[c.value]?.label,
        autofocus: f.value,
        onChoose: W,
        onDismiss: I[0] || (I[0] = (z) => y(!0))
      }, null, 8, ["items", "at", "label", "autofocus"])) : N("", !0)
    ], 44, bi));
  }
}), jc = /* @__PURE__ */ ue($i, [["__scopeId", "data-v-93dbd2e4"]]), xi = ["aria-label", "aria-expanded", "disabled"], Mi = { "aria-hidden": "true" }, Ci = /* @__PURE__ */ ce({
  __name: "MenuButton",
  props: {
    items: {},
    label: {},
    glyph: { default: "⋯" }
  },
  emits: ["choose"],
  setup(e, { emit: t }) {
    const n = t, a = B(null), s = B(null), r = B(null), o = B(!1), c = g(() => r.value !== null);
    function l(k) {
      const w = a.value?.getBoundingClientRect();
      w && (r.value = { x: w.left, y: w.bottom + 4, mirrorX: w.right }, o.value = k);
    }
    function f(k) {
      r.value = null, k && a.value?.focus();
    }
    function d() {
      c.value ? f(!0) : l(!1);
    }
    function b(k) {
      k.key !== "ArrowDown" || c.value || (k.preventDefault(), l(!0));
    }
    function y(k) {
      const w = k.target;
      w && (a.value?.contains(w) || s.value?.root?.contains(w) || f(!1));
    }
    $e(c, (k) => {
      k ? window.addEventListener("pointerdown", y, !0) : window.removeEventListener("pointerdown", y, !0);
    }), je(() => window.removeEventListener("pointerdown", y, !0));
    function h(k) {
      f(!0), k.action?.(), n("choose", k);
    }
    return (k, w) => (m(), _(re, null, [
      v("button", {
        ref_key: "trigger",
        ref: a,
        type: "button",
        class: "dc-menu-button",
        "aria-label": e.label,
        "aria-haspopup": "menu",
        "aria-expanded": c.value,
        disabled: e.items.length === 0,
        onClick: d,
        onKeydown: b
      }, [
        v("span", Mi, E(e.glyph), 1)
      ], 40, xi),
      r.value ? (m(), be(Ba, {
        key: 0,
        ref_key: "menu",
        ref: s,
        items: e.items,
        at: r.value,
        label: e.label,
        autofocus: o.value,
        onChoose: h,
        onDismiss: w[0] || (w[0] = ($) => f(!0))
      }, null, 8, ["items", "at", "label", "autofocus"])) : N("", !0)
    ], 64));
  }
}), Pn = /* @__PURE__ */ ue(Ci, [["__scopeId", "data-v-48f5ada5"]]), _t = (e) => e.kind === "split", O = (e) => e.kind === "group", G = (e) => e.kind === "float", at = { x: 16, y: 16, w: 360, h: 260 }, Xt = 28, Wa = 120, dn = 220, Ua = 38, it = 6;
function At(e, t) {
  let n = !1;
  const a = e.frames.map((s, r) => {
    const o = t(s.node, r);
    return o === s.node ? s : (n = !0, { ...s, node: o });
  });
  return n ? { ...e, frames: a } : e;
}
function Fe(e) {
  return { kind: "group", panels: [e] };
}
function Qc(e, t, n) {
  return {
    kind: "group",
    panels: e,
    ...t ? { active: t } : {},
    ...n ? { title: n } : {}
  };
}
const oe = (e) => typeof e == "string", An = (e) => oe(e) ? Fe(e) : e, zt = (e) => oe(e) ? [e] : qe(e), sa = (e) => e.panels.filter(oe), Ei = (e) => e.panels.filter((t) => !oe(t)), Se = (e, t) => e.panels.includes(t);
function Rt(e, t, n) {
  let a = !1;
  const s = e.panels.map((r) => {
    if (oe(r) || !J(r, t)) return r;
    const o = n(r);
    return o !== r && (a = !0), o;
  });
  return a ? { ...e, panels: s } : e;
}
function jt(e, t) {
  return { node: e, rect: { ...at, ...t } };
}
function zn(e, t) {
  return t ? { kind: "float", frames: e, title: t } : { kind: "float", frames: e };
}
function Rn(e, t) {
  const n = { ...at, ...t };
  return zn(
    e.map(
      (a, s) => jt(a, {
        ...n,
        x: n.x + s * Xt,
        y: n.y + s * Xt
      })
    )
  );
}
function Fn(e, t, n, a) {
  return {
    kind: "split",
    direction: e,
    children: t,
    ...n ? { sizes: n } : {},
    ...a ? { title: a } : {}
  };
}
const Tn = (e, t, n) => Fn("row", e, t, n), Zc = (e, t, n) => Fn("column", e, t, n);
function me(e) {
  return {
    ...e.title ? { title: e.title } : {},
    ...e.fixedView ? { fixedView: !0 } : {},
    ...e.headless ? { headless: !0 } : {}
  };
}
const lt = (e) => e.fixedView === !0 || e.headless === !0 || !!e.title, Jc = (e) => ({ ...e, headless: !0 }), eu = (e) => ({ ...e, fixedView: !0 }), Si = (e) => e === "left" || e === "right" ? "row" : "column";
function qe(e) {
  return O(e) ? e.panels.flatMap(zt) : G(e) ? e.frames.flatMap((t) => qe(t.node)) : e.children.flatMap(qe);
}
function J(e, t) {
  return O(e) ? e.panels.some((n) => oe(n) ? n === t : J(n, t)) : G(e) ? e.frames.some((n) => J(n.node, t)) : e.children.some((n) => J(n, t));
}
const Ha = (e) => qe(e).length === 0, fn = (e) => !O(e) && lt(e), pn = (e) => Ha(e) && !fn(e);
function Qt(e) {
  return _t(e) ? e.children.map((t, n) => ({ node: t, index: n })) : G(e) ? e.frames.map((t, n) => ({ node: t.node, index: n })) : e.panels.flatMap((t, n) => oe(t) ? [] : [{ node: t, index: n }]);
}
const Ln = (e) => Qt(e).map((t) => t.node);
function ot(e) {
  const t = e.active;
  if (t) {
    const n = e.panels.findIndex(
      (a) => oe(a) ? a === t : J(a, t)
    );
    if (n >= 0) return n;
  }
  return 0;
}
function Ga(e) {
  const t = e.panels[ot(e)];
  return t !== void 0 && oe(t) ? t : "";
}
function we(e) {
  if (oe(e)) return e;
  if (O(e)) {
    const n = e.panels[ot(e)];
    return n === void 0 ? "" : we(n);
  }
  if (G(e)) {
    const n = e.frames[e.frames.length - 1];
    return n ? we(n.node) : "";
  }
  const t = e.children[0];
  return t ? we(t) : "";
}
function ut(e, t) {
  if (O(e) && Se(e, t)) return e;
  for (const n of Ln(e)) {
    const a = ut(n, t);
    if (a) return a;
  }
  return null;
}
function Pi(e) {
  const t = Ln(e).flatMap(Pi);
  return O(e) ? [e, ...t] : t;
}
function _e(e, t) {
  if (O(e)) {
    for (const n of Ei(e)) {
      const a = _e(n, t);
      if (a) return a;
    }
    return null;
  }
  if (G(e)) {
    for (const n of e.frames)
      if (J(n.node, t))
        return _e(n.node, t) ?? n;
    return null;
  }
  for (const n of e.children) {
    const a = _e(n, t);
    if (a) return a;
  }
  return null;
}
function nn(e, t, n = Wa) {
  const a = (c, l) => l > 0 ? Math.max(Math.min(c, l), Math.min(n, l)) : Math.max(c, n), s = a(e.w, t.w), r = a(e.h, t.h), o = (c, l, f) => Math.min(Math.max(c, 0), Math.max(f - l, 0));
  return {
    x: Math.round(o(e.x, s, t.w)),
    y: Math.round(o(e.y, r, t.h)),
    w: Math.round(s),
    h: Math.round(r)
  };
}
function ra(e, t, n, a, s = Wa) {
  let { x: r, y: o, w: c, h: l } = e;
  return t.includes("e") && (c = e.w + n), t.includes("w") && (c = e.w - n, r = e.x + n), t.includes("s") && (l = e.h + a), t.includes("n") && (l = e.h - a, o = e.y + a), c < s && (t.includes("w") && (r = e.x + e.w - s), c = s), l < s && (t.includes("n") && (o = e.y + e.h - s), l = s), { x: r, y: o, w: c, h: l };
}
const Xa = (e, t) => e.x === t.x && e.y === t.y && e.w === t.w && e.h === t.h;
function dt(e, t, n) {
  if (O(e)) return Rt(e, t, (r) => dt(r, t, n));
  if (G(e)) {
    let r = !1;
    const o = e.frames.map((c) => {
      if (!J(c.node, t)) return c;
      if (_e(c.node, t)) {
        const f = dt(c.node, t, n);
        return f === c.node ? c : (r = !0, { ...c, node: f });
      }
      const l = n(c);
      return l === c ? c : (r = !0, l);
    });
    return r ? { ...e, frames: o } : e;
  }
  if (!J(e, t)) return e;
  let a = !1;
  const s = e.children.map((r) => {
    const o = dt(r, t, n);
    return o !== r && (a = !0), o;
  });
  return a ? { ...e, children: s } : e;
}
function Ai(e, t, n) {
  return dt(e, t, (a) => Xa(a.rect, n) ? a : { ...a, rect: n });
}
const Xe = (e) => e.maximized === !0, Ya = (e) => (t) => {
  if (Xe(t) === e) return t;
  if (e) {
    const { minimized: s, ...r } = t;
    return { ...r, maximized: !0 };
  }
  const { maximized: n, ...a } = t;
  return a;
};
function zi(e, t, n = !0) {
  return dt(e, t, Ya(n));
}
function tu(e, t) {
  const n = _e(e, t);
  return n ? zi(e, t, !Xe(n)) : e;
}
const et = (e) => e.minimized === !0, ja = (e) => (t) => {
  if (et(t) === e) return t;
  if (e) {
    const { maximized: s, ...r } = t;
    return { ...r, minimized: !0 };
  }
  const { minimized: n, ...a } = t;
  return a;
};
function Ri(e, t, n = !0) {
  return dt(e, t, ja(n));
}
function nu(e, t) {
  const n = _e(e, t);
  return n ? Ri(e, t, !et(n)) : e;
}
function Je(e, t) {
  const n = t[t.length - 1];
  if (n === void 0) return null;
  const a = Ye(e, t.slice(0, -1));
  return !a || !G(a) ? null : a.frames[n] ?? null;
}
function vn(e, t) {
  if (G(e)) {
    for (const [n, a] of e.frames.entries()) {
      if (!J(a.node, t)) continue;
      const s = vn(a.node, t);
      return s ? [n, ...s] : [n];
    }
    return null;
  }
  for (const { node: n, index: a } of Qt(e)) {
    if (!J(n, t)) continue;
    const s = vn(n, t);
    return s ? [a, ...s] : null;
  }
  return null;
}
function Dn(e, t, n) {
  const a = t[t.length - 1];
  if (a === void 0) return e;
  const s = t.slice(0, -1), r = Ye(e, s);
  if (!r || !G(r)) return e;
  const o = r.frames[a];
  if (!o) return e;
  const c = n(o);
  if (c === o) return e;
  const l = [...r.frames];
  return l[a] = c, rt(e, s, { ...r, frames: l });
}
function la(e, t, n) {
  return Dn(
    e,
    t,
    (a) => Xa(a.rect, n) ? a : { ...a, rect: n }
  );
}
function Fi(e, t, n = !0) {
  return Dn(e, t, Ya(n));
}
function Ti(e, t, n = !0) {
  return Dn(e, t, ja(n));
}
function Mt(e, t) {
  const [n, ...a] = t;
  if (n === void 0) return e;
  if (G(e)) {
    const o = e.frames[n];
    if (!o) return e;
    const c = Mt(o.node, a), l = c === o.node ? o : { ...o, node: c };
    if (n === e.frames.length - 1 && l === o) return e;
    const f = [...e.frames];
    return f.splice(n, 1), f.push(l), { ...e, frames: f };
  }
  const s = Ye(e, [n]);
  if (!s) return e;
  const r = Mt(s, a);
  return r === s ? e : rt(e, [n], r);
}
function Li(e, t) {
  const n = [...t];
  let a = e;
  return t.forEach((s, r) => {
    a && (G(a) && (n[r] = a.frames.length - 1), a = Ye(a, [s]));
  }), n;
}
function Vt(e, t, n, a) {
  if (O(e)) return Rt(e, n, (o) => Vt(o, t, n, a));
  if (G(e)) {
    const o = e.frames.findIndex((l) => J(l.node, n)), c = e.frames[o];
    if (!c) return e;
    if (_e(c.node, n)) {
      const l = Vt(c.node, t, n, a);
      if (l === c.node) return e;
      const f = [...e.frames];
      return f[o] = { ...c, node: l }, { ...e, frames: f };
    }
    return { ...e, frames: [...e.frames, jt(Fe(t), a)] };
  }
  if (!J(e, n)) return e;
  let s = !1;
  const r = e.children.map((o) => {
    const c = Vt(o, t, n, a);
    return c !== o && (s = !0), c;
  });
  return s ? { ...e, children: r } : e;
}
function oa(e, t, n, a) {
  if (t === n || !J(e, t) || !J(e, n) || !_e(e, n)) return e;
  const s = st(e, t);
  if (!s) return e;
  const r = Vt(s, t, n, a);
  return r === s ? e : he(r);
}
function Di(e, t, n) {
  return G(e) ? { ...e, frames: [...e.frames, jt(Fe(t), n)] } : O(e) ? Za(e, t) : {
    kind: "split",
    direction: e.direction,
    children: [...e.children, Fe(t)],
    sizes: [...Ke(e), 1],
    ...me(e)
  };
}
function Qa(e, t, n, a) {
  const s = n[0];
  if (s === void 0) return Di(e, t, a);
  const r = n.slice(1), o = (d, b) => b === s ? Qa(d, t, r, a) : st(d, t);
  if (G(e)) {
    const d = e.frames.flatMap((b, y) => {
      const h = o(b.node, y);
      return h ? [h === b.node ? b : { ...b, node: h }] : [];
    });
    return { ...e, frames: d };
  }
  if (O(e)) {
    const d = ot(e), b = [];
    e.panels.forEach((k, w) => {
      if (oe(k)) {
        k !== t && b.push(k);
        return;
      }
      const $ = o(k, w);
      $ && b.push($);
    });
    const h = e.active && b.some((k) => zt(k).includes(e.active)) ? e.active : we(b[d] ?? b[b.length - 1]);
    return {
      kind: "group",
      panels: b,
      ...h ? { active: h } : {},
      ...me(e)
    };
  }
  const c = Ke(e), l = [], f = [];
  return e.children.forEach((d, b) => {
    const y = o(d, b);
    y && (l.push(y), f.push(c[b] ?? 0));
  }), { kind: "split", direction: e.direction, children: l, sizes: f, ...me(e) };
}
function ia(e, t, n, a) {
  const s = Ye(e, n);
  return !s || !Ha(s) || !J(e, t) ? e : he(Qa(e, t, n, a));
}
function an(e, t) {
  if (O(e)) return Rt(e, t, (s) => an(s, t));
  if (G(e)) {
    const s = e.frames.findIndex((f) => J(f.node, t)), r = e.frames[s];
    if (!r) return e;
    const o = an(r.node, t), c = o === r.node ? r : { ...r, node: o };
    if (s === e.frames.length - 1 && c === r) return e;
    const l = [...e.frames];
    return l.splice(s, 1), l.push(c), { ...e, frames: l };
  }
  if (!J(e, t)) return e;
  let n = !1;
  const a = e.children.map((s) => {
    const r = an(s, t);
    return r !== s && (n = !0), r;
  });
  return n ? { ...e, children: a } : e;
}
function In(e, t) {
  if (e <= 0) return [];
  const n = () => Array.from({ length: e }, () => 1 / e);
  if (!t || t.length !== e) return n();
  const a = t.map((r) => Number.isFinite(r) && r > 0 ? r : 0), s = a.reduce((r, o) => r + o, 0);
  return s <= 0 ? n() : a.map((r) => r / s);
}
const Ke = (e) => In(e.children.length, e.sizes), Ae = (e) => {
  const t = O(e) ? e.panels.length : e.children.length;
  return e.places?.length === t ? e.places : void 0;
};
function he(e) {
  if (O(e)) return Ii(e);
  if (G(e)) {
    const c = e.frames.flatMap((l) => {
      const f = he(l.node);
      return pn(f) ? [] : [f === l.node ? l : { ...l, node: f }];
    });
    return c.length === e.frames.length && c.every((l, f) => l === e.frames[f]) ? e : { ...e, frames: c };
  }
  if (e.children.length === 0) return e;
  const t = Ke(e), n = Ae(e), a = [], s = [], r = [];
  e.children.forEach((c, l) => {
    const f = he(c), d = t[l] ?? 0;
    if (pn(f)) return;
    if (!n && _t(f) && f.direction === e.direction && !Ae(f) && !lt(f)) {
      const y = Ke(f);
      f.children.forEach((h, k) => {
        a.push(h), s.push(d * (y[k] ?? 0));
      });
      return;
    }
    a.push(f), s.push(d);
    const b = n?.[l];
    b && r.push(b);
  });
  const o = a[0];
  return a.length === 1 && o && !lt(e) ? o : {
    kind: "split",
    direction: e.direction,
    children: a,
    sizes: In(a.length, s),
    ...me(e),
    ...r.length === a.length && r.length > 0 ? { places: r } : {}
  };
}
function Ii(e) {
  if (e.panels.every(oe)) return e;
  const t = we(e), n = Ae(e), a = [], s = [];
  e.panels.forEach((c, l) => {
    const f = n?.[l];
    if (oe(c)) {
      a.push(c), f && s.push(f);
      return;
    }
    const d = he(c);
    if (!pn(d)) {
      if (O(d) && !lt(d) && !Ae(d)) {
        a.push(...d.panels);
        return;
      }
      a.push(d), f && s.push(f);
    }
  });
  const r = a[0];
  if (a.length === 1 && r !== void 0 && !oe(r) && !lt(e))
    return r;
  if (a.length === e.panels.length && a.every((c, l) => c === e.panels[l]))
    return e;
  const o = t && a.some((c) => zt(c).includes(t)) ? t : void 0;
  return {
    kind: "group",
    panels: a,
    ...o ? { active: o } : {},
    ...me(e),
    ...s.length === a.length && s.length > 0 ? { places: s } : {}
  };
}
function st(e, t) {
  if (G(e)) {
    const o = e.frames.flatMap((c) => {
      const l = st(c.node, t);
      return l ? [l === c.node ? c : { ...c, node: l }] : [];
    });
    return o.length === 0 && !fn(e) ? null : { ...e, frames: o };
  }
  if (O(e)) {
    if (!J(e, t)) return e;
    const o = ot(e), c = [];
    for (const d of e.panels) {
      if (oe(d)) {
        d !== t && c.push(d);
        continue;
      }
      const b = st(d, t);
      b && c.push(b);
    }
    if (c.length === 0) return null;
    const f = e.active && c.some((d) => zt(d).includes(e.active)) ? e.active : we(c[o] ?? c[c.length - 1]);
    return f ? { kind: "group", panels: c, active: f, ...me(e) } : { kind: "group", panels: c, ...me(e) };
  }
  const n = Ke(e), a = [], s = [];
  if (e.children.forEach((o, c) => {
    const l = st(o, t);
    l && (a.push(l), s.push(n[c] ?? 0));
  }), a.length === 0)
    return fn(e) ? { kind: "split", direction: e.direction, children: a, sizes: [], ...me(e) } : null;
  const r = a[0];
  return a.length === 1 && r && !lt(e) ? r : he({
    kind: "split",
    direction: e.direction,
    children: a,
    sizes: s,
    ...me(e)
  });
}
function Za(e, t, n) {
  const a = e.panels.filter((r) => r !== t), s = n === void 0 ? a.length : Math.max(0, Math.min(n, a.length));
  return a.splice(s, 0, t), { kind: "group", panels: a, active: t, ...me(e) };
}
function $t(e, t, n, a, s) {
  const r = (h) => At(
    h,
    (k) => J(k, n) ? $t(k, t, n, a, s) : k
  );
  if (a === "float") return e;
  const o = (h) => Rt(h, n, (k) => $t(k, t, n, a, s));
  if (a === "center")
    return O(e) ? Se(e, n) ? Za(e, t, s) : o(e) : G(e) ? r(e) : {
      ...e,
      children: e.children.map(
        (h) => J(h, n) ? $t(h, t, n, a, s) : h
      )
    };
  const c = Si(a), l = a === "left" || a === "top", f = (h) => ({
    kind: "split",
    direction: c,
    children: l ? [Fe(t), h] : [h, Fe(t)],
    sizes: [0.5, 0.5]
  });
  if (O(e)) return Se(e, n) ? f(e) : o(e);
  if (G(e)) return r(e);
  const d = Ke(e), b = e.children.findIndex(
    (h) => O(h) && Se(h, n)
  );
  if (b >= 0 && e.direction === c) {
    const h = (d[b] ?? 0) / 2, k = [...e.children], w = [...d];
    return k.splice(l ? b : b + 1, 0, Fe(t)), w.splice(b, 1, h, h), {
      kind: "split",
      direction: c,
      children: k,
      sizes: w,
      ...me(e)
    };
  }
  const y = e.children.map((h) => J(h, n) ? O(h) && Se(h, n) ? f(h) : $t(h, t, n, a) : h);
  return {
    kind: "split",
    direction: e.direction,
    children: y,
    sizes: d,
    ...me(e)
  };
}
function ft(e, t) {
  if (O(e)) {
    if (Se(e, t))
      return Ga(e) === t ? e : { ...e, active: t };
    const s = e.panels.findIndex((l) => !oe(l) && J(l, t)), r = e.panels[s];
    if (r === void 0 || oe(r)) return e;
    const o = ft(r, t);
    if (o === r && e.active === t) return e;
    const c = [...e.panels];
    return c[s] = o, { ...e, panels: c, active: t };
  }
  if (!J(e, t)) return e;
  if (G(e)) return At(e, (s) => ft(s, t));
  let n = !1;
  const a = e.children.map((s) => {
    const r = ft(s, t);
    return r !== s && (n = !0), r;
  });
  return n ? { ...e, children: a } : e;
}
function Ct(e, t, n) {
  if (O(e)) {
    if (!Se(e, t)) return Rt(e, t, (f) => Ct(f, t, n));
    const a = e.panels.indexOf(t), s = Math.max(0, Math.min(n, e.panels.length - 1));
    if (a === s) return e;
    const r = [...e.panels];
    r.splice(a, 1), r.splice(s, 0, t);
    const o = Ae(e), c = o ? [...o] : void 0;
    c && c.splice(s, 0, ...c.splice(a, 1));
    const l = we(e);
    return {
      kind: "group",
      panels: r,
      ...l ? { active: l } : {},
      ...me(e),
      ...c ? { places: c } : {}
    };
  }
  return J(e, t) ? G(e) ? At(e, (a) => Ct(a, t, n)) : { ...e, children: e.children.map((a) => Ct(a, t, n)) } : e;
}
function Ot(e, t, n) {
  if (t === n) return e;
  if (O(e)) {
    if (!J(e, t) && !J(e, n)) return e;
    const a = (r) => r === t ? n : r === n ? t : r, s = e.panels.map((r) => oe(r) ? a(r) : Ot(r, t, n));
    return { ...e, panels: s, ...e.active ? { active: a(e.active) } : {} };
  }
  return G(e) ? At(e, (a) => Ot(a, t, n)) : { ...e, children: e.children.map((a) => Ot(a, t, n)) };
}
function It(e, t, n, a, s) {
  if (a === "float" || !J(e, t) || !J(e, n)) return e;
  const r = ut(e, t);
  if (a === "center" && r && Se(r, n)) {
    if (s === void 0) return e;
    const c = r.panels.indexOf(t), l = s > c ? s - 1 : s;
    return l === c ? e : ft(Ct(e, t, l), t);
  }
  if (t === n) return e;
  const o = st(e, t);
  return o ? he($t(o, t, n, a, s)) : e;
}
function Ja(e, t, n) {
  if (O(e)) {
    const s = e.panels[t];
    if (s === void 0 || oe(s)) return e;
    const r = [...e.panels];
    return r[t] = n, { ...e, panels: r };
  }
  if (G(e)) {
    const s = e.frames[t];
    if (!s) return e;
    const r = [...e.frames];
    return r[t] = { ...s, node: n }, { ...e, frames: r };
  }
  const a = [...e.children];
  return a[t] = n, { ...e, children: a };
}
function Ft(e, t, n) {
  const a = Qt(e);
  if (!O(e) && a.some(({ node: s }) => O(s) && Se(s, t))) {
    const s = n(e);
    return s === e ? null : s;
  }
  for (const { node: s, index: r } of a) {
    if (!J(s, t)) continue;
    const o = Ft(s, t, n);
    return o ? Ja(e, r, o) : null;
  }
  return null;
}
function au(e, t, n) {
  const a = Ft(
    e,
    t,
    (s) => _t(s) && s.direction !== n ? { ...s, direction: n } : s
  );
  return a ? he(a) : e;
}
function es(e) {
  return G(e) ? [e] : Ae(e) || lt(e) ? [e] : O(e) ? [...e.panels] : e.children.flatMap(es);
}
function ts(e, t) {
  if (O(e)) return e;
  const n = Ln(e).map(es), a = n.flat(), s = t && a.some((o) => zt(o).includes(t)) ? t : void 0, r = Ni(e, n);
  return he({
    kind: "group",
    panels: a,
    ...s ? { active: s } : {},
    ...me(e),
    ...r ? { places: r } : {}
  });
}
function Ni(e, t) {
  const n = G(e) ? e.frames.map(({ node: a, ...s }) => s) : Ae(e);
  if (n)
    return t.every((a) => a.length === 1) ? n : void 0;
}
function Vi(e, t) {
  const n = Ft(e, t, (a) => ts(a, t));
  return n ? he(n) : e;
}
function Nn(e, t, n) {
  if (O(e) && Se(e, t)) {
    const a = n(e);
    return a === e ? null : a;
  }
  for (const { node: a, index: s } of Qt(e)) {
    if (!J(a, t)) continue;
    const r = Nn(a, t, n);
    return r ? Ja(e, s, r) : null;
  }
  return null;
}
function ca(e, t, n) {
  const a = Nn(e, t, (s) => {
    if (s.panels.length < 2) return s;
    const r = Ae(s);
    return {
      ...Fn(n, s.panels.map(An)),
      ...me(s),
      ...r ? { places: r } : {}
    };
  });
  return a ? he(a) : e;
}
function mn(e, t) {
  if (O(e)) return e;
  if (G(e)) {
    const s = e.frames.findIndex(
      (c) => O(c.node) && c.node.panels.includes(t)
    ), r = e.frames[s], o = r && O(r.node) ? r.node : null;
    if (r && o && o.panels.length > 1) {
      const c = Rn(o.panels.map(An), r.rect).frames;
      return {
        ...e,
        frames: [...e.frames.slice(0, s), ...c, ...e.frames.slice(s + 1)]
      };
    }
    return At(e, (c) => mn(c, t));
  }
  if (!J(e, t)) return e;
  let n = !1;
  const a = e.children.map((s) => {
    const r = mn(s, t);
    return r !== s && (n = !0), r;
  });
  return n ? { ...e, children: a } : e;
}
function Oi(e, t, n) {
  const a = ut(e, t);
  if (!a || a.panels.length < 2) return e;
  if (_e(e, t)?.node === a) {
    const o = mn(e, t);
    return o === e ? e : he(o);
  }
  const r = Nn(e, t, (o) => ({
    ...zn(ns(o.panels.map(An), Ae(o), n)),
    ...me(o)
  }));
  return r ? he(r) : e;
}
function ns(e, t, n) {
  return t ? e.map((a, s) => ({ ...t[s], node: a })) : Rn(e, n).frames;
}
function as(e, t) {
  return { ...zn(ns(e.children, Ae(e), t)), ...me(e) };
}
function su(e, t, n) {
  const a = Ft(
    e,
    t,
    (s) => G(s) ? s : as(s, n)
  );
  return a ? he(a) : O(e) && Se(e, t) ? Rn([e], n) : e;
}
function Ki(e, t) {
  const n = (s) => t === "column" ? s.rect.y : s.rect.x, a = (s) => t === "column" ? s.rect.x : s.rect.y;
  return [...e].sort((s, r) => n(s) - n(r) || a(s) - a(r));
}
function ss(e, t) {
  const n = Ki(e.frames, t);
  return {
    kind: "split",
    direction: t,
    children: n.map((a) => a.node),
    ...me(e),
    places: n.map(({ node: a, ...s }) => s)
  };
}
function ru(e, t, n = "row") {
  const a = Ft(
    e,
    t,
    (s) => G(s) ? ss(s, n) : s
  );
  return a ? he(a) : e;
}
function rs(e) {
  if (G(e)) return null;
  const t = O(e) ? e.panels.length === 1 ? e.panels[0] : void 0 : e.children.length === 1 ? e.children[0] : void 0;
  return t === void 0 || oe(t) || O(t) && t.panels.length === 1 && oe(t.panels[0]) ? null : t;
}
const qi = (e) => {
  const { title: t, fixedView: n, headless: a, ...s } = e;
  return s;
};
function Bi(e, t) {
  const n = rs(e);
  return n ? t === "inner" ? n : { ...qi(n), ...me(e) } : e;
}
function mt(e) {
  return e.title ? e.title : O(e) ? "" : G(e) ? "Desktop" : e.direction === "row" ? "Row" : "Column";
}
function Et(e, t) {
  if (O(e)) {
    const a = e.panels[ot(e)];
    return a === void 0 ? "" : oe(a) ? t(a) ?? a : mt(a) || Et(a, t);
  }
  if (e.title) return e.title;
  if (G(e)) {
    const a = e.frames[e.frames.length - 1];
    return a ? a.title ?? Et(a.node, t) : "";
  }
  const n = e.children[0];
  return n ? Et(n, t) : "";
}
function Ye(e, t) {
  let n = e;
  for (const a of t) {
    if (!n) return null;
    if (_t(n)) n = n.children[a];
    else if (G(n)) n = n.frames[a]?.node;
    else {
      const s = n.panels[a];
      n = s === void 0 || oe(s) ? void 0 : s;
    }
  }
  return n ?? null;
}
function rt(e, t, n) {
  if (t.length === 0) return n;
  const [a, ...s] = t;
  if (a === void 0) return e;
  if (G(e)) {
    const l = e.frames[a];
    if (!l) return e;
    const f = rt(l.node, s, n);
    if (f === l.node) return e;
    const d = [...e.frames];
    return d[a] = { ...l, node: f }, { ...e, frames: d };
  }
  if (O(e)) {
    const l = e.panels[a];
    if (l === void 0 || oe(l)) return e;
    const f = rt(l, s, n);
    if (f === l) return e;
    const d = [...e.panels];
    return d[a] = f, { ...e, panels: d };
  }
  const r = e.children[a];
  if (!r) return e;
  const o = rt(r, s, n);
  if (o === r) return e;
  const c = [...e.children];
  return c[a] = o, { ...e, children: c };
}
function Kt(e, t, n) {
  if (t.length === 0)
    return _t(e) ? { ...e, sizes: In(e.children.length, n) } : e;
  const [a, ...s] = t;
  if (a === void 0) return e;
  if (G(e)) {
    const c = e.frames[a];
    if (!c) return e;
    const l = Kt(c.node, s, n);
    if (l === c.node) return e;
    const f = [...e.frames];
    return f[a] = { ...c, node: l }, { ...e, frames: f };
  }
  if (O(e)) {
    const c = e.panels[a];
    if (c === void 0 || oe(c)) return e;
    const l = Kt(c, s, n);
    if (l === c) return e;
    const f = [...e.panels];
    return f[a] = l, { ...e, panels: f };
  }
  const r = e.children[a];
  if (!r) return e;
  const o = [...e.children];
  return o[a] = Kt(r, s, n), { ...e, children: o };
}
function ua(e, t, n, a = 0.02) {
  const s = e[t], r = e[t + 1];
  if (s === void 0 || r === void 0) return e;
  const o = s + r;
  if (o < a * 2) return e;
  const c = [...e], l = Math.min(Math.max(s + n, a), o - a);
  return c[t] = l, c[t + 1] = o - l, c;
}
function Yt(e) {
  if (!O(e) || e.panels.length >= 2) return e;
  const t = e.panels[0];
  return t !== void 0 && !oe(t) ? e : { ...Tn([Wi(e)]), ...me(e) };
}
const Wi = (e) => {
  if (!e.title) return e;
  const { title: t, ...n } = e;
  return n;
};
function da(e) {
  return e.length === 0 ? null : Tn(e.map(Fe));
}
function Ui(e, t) {
  if (!e) return da(t);
  const n = new Set(t), a = /* @__PURE__ */ new Set(), s = /* @__PURE__ */ new Set();
  for (const l of qe(e))
    !n.has(l) || a.has(l) ? s.add(l) : a.add(l);
  let r = e;
  for (const l of s)
    r = r ? st(r, l) : null;
  const o = new Set(r ? qe(r) : []), c = t.filter((l) => !o.has(l));
  if (c.length === 0) return r ? Yt(he(r)) : null;
  if (!r) return da(c);
  if (G(r)) {
    const l = r.frames.length;
    return {
      ...r,
      frames: [
        ...r.frames,
        ...c.map(
          (f, d) => jt(Fe(f), {
            x: at.x + (l + d) * Xt,
            y: at.y + (l + d) * Xt
          })
        )
      ]
    };
  }
  return Yt(he(Tn([r, ...c.map(Fe)])));
}
const Vn = Symbol("dc.windowContext");
function Hi(e) {
  return hn(Vn, e), e;
}
function On() {
  const e = vt(Vn, null);
  if (!e)
    throw new Error(
      "[header-content-layout] No window context found. Render this component inside <WindowFrame>."
    );
  return e;
}
const Gi = ["data-dc-glyph"], Xi = { class: "dc-glyph__line" }, Yi = ["d"], ji = {
  key: 0,
  class: "dc-glyph__aqua"
}, Qi = ["d"], Zi = /* @__PURE__ */ ce({
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
    return (a, s) => (m(), _("svg", {
      class: "dc-glyph",
      "data-dc-glyph": e.kind,
      viewBox: "0 0 10 10",
      "aria-hidden": "true",
      focusable: "false"
    }, [
      v("g", Xi, [
        (m(!0), _(re, null, ve(t[e.kind], (r) => (m(), _("path", {
          key: r,
          d: r
        }, null, 8, Yi))), 128))
      ]),
      n[e.kind] ? (m(), _("g", ji, [
        (m(!0), _(re, null, ve(n[e.kind], (r) => (m(), _("path", {
          key: r,
          d: r
        }, null, 8, Qi))), 128))
      ])) : N("", !0)
    ], 8, Gi));
  }
}), pt = /* @__PURE__ */ ue(Zi, [["__scopeId", "data-v-4d2872c0"]]), Ji = ["data-dc-order", "data-dc-path", "data-dc-maximized", "data-dc-minimized", "data-dc-dragging"], ec = ["data-dc-movable"], tc = { class: "dc-float__title dc-truncate" }, nc = {
  key: 1,
  class: "dc-float__controls dc-controls"
}, ac = ["aria-label", "aria-pressed", "data-dc-minimize"], sc = ["aria-label", "aria-pressed", "data-dc-maximize"], rc = ["aria-label", "data-dc-close"], lc = { class: "dc-float__content" }, oc = ["data-dc-handle", "onPointerdown"], ic = /* @__PURE__ */ ce({
  __name: "WindowFloat",
  props: {
    frame: {},
    path: {},
    order: {},
    place: {}
  },
  setup(e) {
    const t = e, n = On(), a = g(() => we(t.frame.node)), s = g(() => n.panelFor(a.value)?.fixed === !0), r = g(() => Xe(t.frame)), o = g(() => et(t.frame)), c = g(() => r.value || o.value), l = g(() => n.resizable.value && !s.value && !c.value), f = g(() => n.movable.value && !s.value && !c.value), d = g(() => {
      const I = qe(t.frame.node);
      return I.length === 1 ? I[0] ?? null : null;
    }), b = g(() => d.value !== null && n.closable(d.value)), y = g(() => t.frame.node.headless === !0), h = g(
      () => !y.value && (!O(t.frame.node) || o.value)
    ), k = g(
      () => t.frame.title || mt(t.frame.node) || Et(t.frame.node, (I) => n.panelFor(I)?.title)
    ), w = g(() => n.spaceMenu(t.path));
    function $(I) {
      I.target?.closest("button, a, input, select, textarea, label") || n.beginFrameDragAt(t.path, I, "move");
    }
    function R(I) {
      I.target?.closest("button, a, input, select, textarea, label") || (o.value ? n.toggleMinimizeAt(t.path) : n.toggleMaximizeAt(t.path));
    }
    const q = g(() => {
      const I = n.framing.value;
      return I !== null && J(t.frame.node, I);
    }), W = g(() => ({
      // Neither maximizing nor rolling up overwrites the rect: it is where the
      // window goes back to, and both are a way of not being there for a while.
      ...r.value ? { inset: "0" } : o.value && t.place ? {
        left: `${t.place.x}px`,
        bottom: `${t.place.bottom}px`,
        width: `${dn}px`,
        height: `${Ua}px`
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
    return (I, z) => (m(), _("div", {
      class: "dc-float",
      style: Te(W.value),
      "data-dc-order": e.order,
      "data-dc-path": e.path.join("/"),
      "data-dc-maximized": r.value ? "true" : "false",
      "data-dc-minimized": o.value ? "true" : "false",
      "data-dc-dragging": q.value ? "true" : "false",
      onPointerdown: z[3] || (z[3] = (M) => C(n).raiseAt(e.path))
    }, [
      h.value ? (m(), _("header", {
        key: 0,
        class: "dc-float__bar",
        "data-dc-movable": f.value ? "true" : "false",
        onPointerdown: $,
        onDblclick: R
      }, [
        v("span", tc, E(k.value), 1),
        w.value.length ? (m(), be(Pn, {
          key: 0,
          items: w.value,
          label: `${k.value} menu`
        }, null, 8, ["items", "label"])) : N("", !0),
        !s.value || o.value && b.value && d.value ? (m(), _("div", nc, [
          s.value ? N("", !0) : (m(), _("button", {
            key: 0,
            type: "button",
            class: "dc-float__button dc-control",
            "aria-label": `${o.value ? "Unroll" : "Minimize"} ${k.value}`,
            "aria-pressed": o.value,
            "data-dc-minimize": a.value,
            onClick: z[0] || (z[0] = (M) => C(n).toggleMinimizeAt(e.path))
          }, [
            de(pt, {
              kind: o.value ? "unroll" : "minimize"
            }, null, 8, ["kind"])
          ], 8, ac)),
          s.value ? N("", !0) : (m(), _("button", {
            key: 1,
            type: "button",
            class: "dc-float__button dc-control",
            "aria-label": `${r.value ? "Restore" : "Maximize"} ${k.value}`,
            "aria-pressed": r.value,
            "data-dc-maximize": a.value,
            onClick: z[1] || (z[1] = (M) => C(n).toggleMaximizeAt(e.path))
          }, [
            de(pt, {
              kind: r.value ? "restore" : "maximize"
            }, null, 8, ["kind"])
          ], 8, sc)),
          o.value && b.value && d.value ? (m(), _("button", {
            key: 2,
            type: "button",
            class: "dc-float__button dc-control",
            "aria-label": `Close ${k.value}`,
            "data-dc-close": d.value,
            onClick: z[2] || (z[2] = (M) => C(n).close(d.value))
          }, [
            de(pt, { kind: "close" })
          ], 8, rc)) : N("", !0)
        ])) : N("", !0)
      ], 40, ec)) : N("", !0),
      v("div", lc, [
        tt(I.$slots, "default", {}, void 0, !0)
      ]),
      (m(!0), _(re, null, ve(l.value ? L : [], (M) => (m(), _("span", {
        key: M,
        class: "dc-float__grip",
        "data-dc-handle": M,
        "aria-hidden": "true",
        onPointerdown: Re((P) => C(n).beginFrameDragAt(e.path, P, M), ["stop"])
      }, null, 40, oc))), 128))
    ], 44, Ji));
  }
}), cc = /* @__PURE__ */ ue(ic, [["__scopeId", "data-v-f035684c"]]), Kn = Symbol("dc.paneContext");
function uc(e) {
  return hn(Kn, e), e;
}
function lu() {
  return vt(Kn, null);
}
function ou(e) {
  const t = vt(Vn, null), n = vt(Kn, null);
  if (!t || !n) return () => {
  };
  const a = t.registerMenu(
    () => n.panel.value,
    () => bt(e)
  );
  return Ss() && Ps(a), a;
}
const dc = ["data-dc-panel", "data-dc-panels", "data-dc-tabbed", "data-dc-floating", "data-dc-maximized", "data-dc-headless", "data-dc-active", "data-dc-dragging", "aria-label"], fc = ["data-dc-movable"], pc = ["aria-label", "aria-pressed"], vc = ["data-dc-space-name"], mc = { class: "dc-truncate" }, hc = ["aria-label"], _c = {
  key: 0,
  class: "dc-pane__insert",
  "aria-hidden": "true"
}, gc = ["id", "data-dc-panel", "data-dc-space", "aria-selected", "aria-controls", "tabindex", "onPointerdown", "onClick", "onKeydown"], yc = { class: "dc-tab__name dc-truncate" }, wc = {
  key: 0,
  class: "dc-pane__sub dc-mono dc-truncate"
}, bc = ["aria-label", "data-dc-close", "onClick"], kc = {
  key: 0,
  class: "dc-pane__insert",
  "aria-hidden": "true"
}, $c = { class: "dc-pane__tools" }, xc = {
  key: 2,
  class: "dc-pane__controls dc-controls"
}, Mc = ["aria-label", "data-dc-minimize"], Cc = ["aria-label", "aria-pressed", "data-dc-maximize"], Ec = ["aria-label", "data-dc-close"], Sc = ["id", "role", "aria-labelledby"], Pc = ["id", "role", "aria-labelledby"], Ac = ["data-dc-edge"], zc = /* @__PURE__ */ ce({
  __name: "WindowPane",
  props: {
    group: {},
    path: {}
  },
  setup(e) {
    const t = e, n = On(), a = pa() ?? "dc-pane", s = g(
      () => t.group.panels.flatMap((F, V) => {
        if (!oe(F)) {
          const ke = mt(F) || Et(F, (ge) => n.panelFor(ge)?.title);
          return [{ kind: "space", index: V, id: `space-${V}`, title: ke, node: F }];
        }
        const Y = n.panelFor(F);
        return Y ? [{ kind: "panel", index: V, id: F, title: Y.title, panel: Y }] : [];
      })
    ), r = g(() => s.value.length > 1), o = g(() => {
      const F = ot(t.group);
      return s.value.find((V) => V.index === F) ?? s.value[0] ?? null;
    }), c = g(() => o.value?.kind === "space" ? o.value.node : null), l = g(() => c.value ? "" : Ga(t.group)), f = g(() => c.value ? null : n.panelFor(l.value)), d = g(() => o.value?.title ?? ""), b = g(() => n.spaceNames.value ? t.group.title ?? "" : ""), y = g(() => [...t.path, o.value?.index ?? 0]), h = g(() => l.value || sa(t.group)[0] || ""), k = g(() => n.viewFor(l.value)), w = g(() => t.group.headless === !0), $ = g(() => n.focused.value === l.value), R = g(() => n.dragging.value === l.value), q = g(() => n.moving.value === l.value), W = g(() => n.frameOf(h.value) !== null), L = g(() => n.panelFor(h.value)?.fixed === !0), I = g(
      () => !c.value && (n.canMove(l.value) || W.value && n.movable.value && !L.value)
    ), z = g(
      () => c.value ? n.spaceMenu(y.value) : n.menuFor(l.value)
    ), M = (F) => n.closable(F);
    uc({ panel: l });
    const P = g(() => n.maximized(h.value)), Z = g(
      () => W.value && !L.value || !r.value && !!f.value && M(f.value.id)
    ), le = (F) => `${a}-tab-${F}`, fe = g(() => `${a}-body`), j = g(() => {
      const F = n.dropTarget.value;
      return !F || !Se(t.group, F.panel) || F.edge === "float" ? null : F;
    }), Me = g(() => j.value?.index === void 0 ? j.value?.edge ?? null : null), Pe = g(() => j.value?.index ?? null), T = () => f.value ? n.renderContent(f.value, k.value, $.value) ?? null : null, X = () => f.value ? n.renderActions(f.value, k.value, $.value) ?? null : null;
    let ee = null;
    function te(F) {
      const V = ee !== null && Math.hypot(F.clientX - ee.x, F.clientY - ee.y) >= 4;
      return ee = null, V;
    }
    const pe = (F) => F.kind === "panel" ? F.id : we(F.node);
    function Ce(F, V) {
      V.kind !== "space" && (n.focus(V.id), ee = { x: F.clientX, y: F.clientY }, n.beginDrag(V.id, F));
    }
    function Be(F, V) {
      if (te(F)) return;
      const Y = pe(V);
      Y && n.selectPanel(Y);
    }
    function We(F) {
      l.value && n.focus(l.value), !F.target?.closest(".dc-tab, button, a, input, select, textarea, label") && (W.value ? n.beginFrameDrag(h.value, F, "move") : n.beginDrag(l.value, F));
    }
    function Ue(F) {
      ee = { x: F.clientX, y: F.clientY }, n.beginDrag(l.value, F);
    }
    function He(F) {
      te(F) || n.toggleMoveMode(l.value);
    }
    const Le = {
      ArrowLeft: "left",
      ArrowRight: "right",
      ArrowUp: "up",
      ArrowDown: "down"
    };
    function De(F) {
      if (!q.value) return;
      if (F.key === "Escape") {
        F.preventDefault(), n.toggleMoveMode(l.value);
        return;
      }
      const V = Le[F.key];
      V && (F.preventDefault(), W.value ? n.nudgeFrame(l.value, V, F.shiftKey) : n.nudge(l.value, V, F.shiftKey));
    }
    function Ie(F) {
      !W.value || F.target?.closest(".dc-tab, button, a, input, select, textarea, label") || n.toggleMaximize(h.value);
    }
    function gt(F, V) {
      F.stopPropagation(), ee = null, n.close(V);
    }
    function Tt(F, V) {
      const Y = s.value.length;
      let ke = null;
      if (F.key === "ArrowRight" ? ke = (V + 1) % Y : F.key === "ArrowLeft" ? ke = (V - 1 + Y) % Y : F.key === "Home" ? ke = 0 : F.key === "End" && (ke = Y - 1), ke === null) return;
      F.preventDefault();
      const ge = s.value[ke];
      if (!ge) return;
      const yt = pe(ge);
      yt && n.selectPanel(yt);
    }
    return (F, V) => o.value ? (m(), _("section", {
      key: 0,
      class: "dc-pane",
      "data-dc-panel": l.value || void 0,
      "data-dc-panels": C(sa)(e.group).join(" ") || void 0,
      "data-dc-tabbed": r.value ? "true" : "false",
      "data-dc-floating": W.value ? "true" : "false",
      "data-dc-maximized": P.value ? "true" : "false",
      "data-dc-headless": w.value ? "true" : "false",
      "data-dc-active": $.value ? "true" : "false",
      "data-dc-dragging": R.value ? "true" : "false",
      "aria-label": d.value,
      onFocusin: V[7] || (V[7] = (Y) => l.value && C(n).focus(l.value))
    }, [
      w.value ? N("", !0) : (m(), _("header", {
        key: 0,
        class: "dc-pane__head",
        "data-dc-movable": I.value ? "true" : "false",
        onPointerdown: We,
        onDblclick: Ie
      }, [
        I.value ? (m(), _("button", {
          key: 0,
          type: "button",
          class: "dc-pane__grip",
          "aria-label": `Move ${d.value}`,
          "aria-pressed": q.value,
          onPointerdown: Ue,
          onClick: He,
          onKeydown: De
        }, [...V[8] || (V[8] = [
          v("span", { "aria-hidden": "true" }, "⠿", -1)
        ])], 40, pc)) : N("", !0),
        b.value ? (m(), _("span", {
          key: 1,
          class: "dc-pane__name",
          "data-dc-space-name": b.value
        }, [
          v("span", mc, E(b.value), 1)
        ], 8, vc)) : N("", !0),
        v("div", {
          class: "dc-pane__tabs",
          role: "tablist",
          "aria-label": `${d.value} panels`
        }, [
          (m(!0), _(re, null, ve(s.value, (Y, ke) => (m(), _(re, {
            key: Y.id
          }, [
            Pe.value === ke ? (m(), _("span", _c)) : N("", !0),
            v("button", {
              id: le(Y.id),
              type: "button",
              role: "tab",
              class: "dc-tab",
              "data-dc-panel": Y.kind === "panel" ? Y.id : void 0,
              "data-dc-space": Y.kind === "space" ? Y.title : void 0,
              "aria-selected": Y.index === o.value.index,
              "aria-controls": fe.value,
              tabindex: Y.index === o.value.index ? 0 : -1,
              onPointerdown: (ge) => Ce(ge, Y),
              onClick: (ge) => Be(ge, Y),
              onKeydown: (ge) => Tt(ge, ke)
            }, [
              v("span", yc, E(Y.title), 1),
              Y.kind === "panel" && Y.panel.subtitle ? (m(), _("span", wc, E(Y.panel.subtitle), 1)) : N("", !0),
              r.value && Y.kind === "panel" && M(Y.id) ? (m(), _("span", {
                key: 1,
                class: "dc-tab__close",
                role: "button",
                tabindex: "-1",
                "aria-label": `Close ${Y.title}`,
                "data-dc-close": Y.id,
                onPointerdown: V[0] || (V[0] = Re(() => {
                }, ["stop"])),
                onClick: (ge) => gt(ge, Y.id)
              }, [...V[9] || (V[9] = [
                v("span", { "aria-hidden": "true" }, "×", -1)
              ])], 40, bc)) : N("", !0)
            ], 40, gc)
          ], 64))), 128)),
          Pe.value === s.value.length ? (m(), _("span", kc)) : N("", !0)
        ], 8, hc),
        v("div", $c, [
          de(X),
          z.value.length ? (m(), be(Pn, {
            key: 0,
            items: z.value,
            label: `${d.value} menu`
          }, null, 8, ["items", "label"])) : N("", !0)
        ]),
        Z.value ? (m(), _("div", xc, [
          W.value && !L.value ? (m(), _("button", {
            key: 0,
            type: "button",
            class: "dc-pane__button dc-control",
            "aria-label": `Minimize ${d.value}`,
            "data-dc-minimize": h.value,
            onPointerdown: V[1] || (V[1] = Re(() => {
            }, ["stop"])),
            onClick: V[2] || (V[2] = (Y) => C(n).toggleMinimize(h.value))
          }, [
            de(pt, { kind: "minimize" })
          ], 40, Mc)) : N("", !0),
          W.value && !L.value ? (m(), _("button", {
            key: 1,
            type: "button",
            class: "dc-pane__button dc-control",
            "aria-label": `${P.value ? "Restore" : "Maximize"} ${d.value}`,
            "aria-pressed": P.value,
            "data-dc-maximize": h.value,
            onPointerdown: V[3] || (V[3] = Re(() => {
            }, ["stop"])),
            onClick: V[4] || (V[4] = (Y) => C(n).toggleMaximize(h.value))
          }, [
            de(pt, {
              kind: P.value ? "restore" : "maximize"
            }, null, 8, ["kind"])
          ], 40, Cc)) : N("", !0),
          !r.value && f.value && M(f.value.id) ? (m(), _("button", {
            key: 2,
            type: "button",
            class: "dc-pane__close dc-control",
            "aria-label": `Close ${d.value}`,
            "data-dc-close": f.value.id,
            onPointerdown: V[5] || (V[5] = Re(() => {
            }, ["stop"])),
            onClick: V[6] || (V[6] = (Y) => C(n).close(f.value.id))
          }, [
            de(pt, { kind: "close" })
          ], 40, Ec)) : N("", !0)
        ])) : N("", !0)
      ], 40, fc)),
      c.value ? (m(), _("div", {
        key: 1,
        id: fe.value,
        class: "dc-pane__space",
        role: w.value ? void 0 : "tabpanel",
        "aria-labelledby": w.value ? void 0 : le(o.value.id)
      }, [
        tt(F.$slots, "space", {
          node: c.value,
          path: y.value
        }, void 0, !0)
      ], 8, Sc)) : (m(), _("div", {
        key: 2,
        id: fe.value,
        class: "dc-pane__body",
        role: w.value ? void 0 : "tabpanel",
        "aria-labelledby": w.value ? void 0 : le(l.value)
      }, [
        de(T)
      ], 8, Pc)),
      Me.value ? (m(), _("div", {
        key: 3,
        class: "dc-pane__drop",
        "data-dc-edge": Me.value,
        "aria-hidden": "true"
      }, null, 8, Ac)) : N("", !0)
    ], 40, dc)) : N("", !0);
  }
}), ls = /* @__PURE__ */ ue(zc, [["__scopeId", "data-v-44fd2b2d"]]), Rc = ["data-dc-space", "data-dc-path", "aria-label"], Fc = {
  key: 0,
  class: "dc-space__head"
}, Tc = { class: "dc-space__title dc-truncate" }, Lc = ["data-dc-direction"], Dc = {
  key: 0,
  class: "dc-space__drop",
  "aria-hidden": "true"
}, Ic = ["aria-orientation", "aria-label", "aria-valuenow", "aria-disabled", "tabindex", "onPointerdown", "onKeydown"], Nc = /* @__PURE__ */ ce({
  __name: "WindowNode",
  props: {
    node: {},
    path: {},
    framed: { type: Boolean }
  },
  setup(e) {
    const t = e, n = On(), a = B(null), s = g(() => O(t.node) ? t.node : null), r = g(() => _t(t.node) ? t.node : null), o = g(() => G(t.node) ? t.node : null), c = g(
      () => r.value ? r.value.children : o.value?.frames.map((T) => T.node) ?? []
    ), l = g(() => r.value ? Ke(r.value) : []), f = g(
      () => (o.value?.frames ?? []).map((T, X) => ({
        held: T,
        /** Place in the stack, counted from the back — what `z-index` follows. */
        order: X,
        key: M(T.node),
        path: [...t.path, X]
      })).sort((T, X) => T.key < X.key ? -1 : T.key > X.key ? 1 : 0)
    ), d = g(() => mt(t.node)), b = g(() => n.spaceMenu(t.path)), y = g(() => t.node.headless === !0), h = g(() => o.value ? "desktop" : r.value?.direction ?? ""), k = B(null), w = B(0);
    let $ = null;
    $e(
      k,
      (T) => {
        $?.disconnect(), $ = null, !(!T || typeof ResizeObserver > "u") && (w.value = T.clientWidth, $ = new ResizeObserver(([X]) => {
          w.value = X?.contentRect.width ?? 0;
        }), $.observe(T));
      },
      { immediate: !0 }
    ), je(() => $?.disconnect());
    const R = g(() => {
      const T = Math.max(
        1,
        Math.floor((w.value + it) / (dn + it))
      ), X = /* @__PURE__ */ new Map();
      let ee = 0;
      for (const te of f.value)
        te.held.minimized === !0 && (X.set(te.key, {
          x: it + ee % T * (dn + it),
          bottom: it + Math.floor(ee / T) * (Ua + it)
        }), ee += 1);
      return X;
    }), q = (T) => !!T && T.join("/") === t.path.join("/"), W = g(() => {
      const T = n.dropTarget.value, X = o.value;
      if (!X || !T?.rect || T.edge !== "float") return null;
      if (T.space) return q(T.space) ? T.rect : null;
      const ee = _e(X, T.panel);
      return ee && X.frames.includes(ee) ? T.rect : null;
    }), L = g(() => {
      const T = n.dropTarget.value;
      return !!T && !T.rect && q(T.space);
    }), I = g(() => r.value?.direction === "row"), z = g(() => c.value.map((T, X) => [...t.path, X])), M = (T) => [...qe(T)].sort().join("/"), P = (T) => {
      const X = qe(T)[0];
      return (X ? n.panelFor(X)?.title : null) ?? X ?? "panel";
    }, Z = (T) => {
      const X = c.value[T], ee = c.value[T + 1];
      return !X || !ee ? "Resize panels" : `Resize ${P(X)} and ${P(ee)}`;
    }, le = (T) => {
      const X = l.value[T] ?? 0, ee = l.value[T + 1] ?? 0, te = X + ee;
      return te > 0 ? Math.round(X / te * 100) : 50;
    };
    function fe() {
      const T = a.value, X = T ? I.value ? T.clientWidth : T.clientHeight : 0;
      return X <= 0 ? 0.05 : Math.min(n.minPanelSize.value / X, 0.4);
    }
    let j = null;
    function Me(T, X) {
      const ee = r.value, te = a.value;
      if (!n.resizable.value || !ee || !te || T.button !== 0) return;
      const pe = I.value ? te.clientWidth : te.clientHeight;
      if (pe <= 0) return;
      const Ce = I.value ? T.clientX : T.clientY, Be = Ke(ee), We = Math.min(n.minPanelSize.value / pe, 0.4);
      T.preventDefault();
      const Ue = (De) => {
        const Ie = ((I.value ? De.clientX : De.clientY) - Ce) / pe;
        n.setSizes(t.path, ua(Be, X, Ie, We));
      }, He = () => j?.(), Le = (De) => {
        De.key === "Escape" && (n.setSizes(t.path, Be), j?.());
      };
      j = () => {
        window.removeEventListener("pointermove", Ue), window.removeEventListener("pointerup", He), window.removeEventListener("pointercancel", He), window.removeEventListener("keydown", Le), j = null;
      }, window.addEventListener("pointermove", Ue), window.addEventListener("pointerup", He), window.addEventListener("pointercancel", He), window.addEventListener("keydown", Le);
    }
    je(() => j?.());
    function Pe(T, X) {
      const ee = r.value;
      if (!n.resizable.value || !ee) return;
      const te = I.value ? "ArrowRight" : "ArrowDown", pe = I.value ? "ArrowLeft" : "ArrowUp", Ce = T.shiftKey ? 0.1 : 0.02;
      if (T.key !== te && T.key !== pe) return;
      const Be = T.key === te ? Ce : -Ce;
      T.preventDefault(), n.setSizes(t.path, ua(Ke(ee), X, Be, fe()));
    }
    return (T, X) => {
      const ee = va("WindowNode", !0);
      return s.value ? (m(), be(ls, {
        key: 0,
        group: s.value,
        path: e.path
      }, {
        space: Ut(({ node: te, path: pe }) => [
          de(ee, {
            node: te,
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
        "aria-label": d.value
      }, [
        !e.framed && !y.value ? (m(), _("header", Fc, [
          v("span", Tc, E(d.value), 1),
          b.value.length ? (m(), be(Pn, {
            key: 0,
            items: b.value,
            label: `${d.value} menu`
          }, null, 8, ["items", "label"])) : N("", !0)
        ])) : N("", !0),
        o.value ? (m(), _("div", {
          key: 1,
          ref_key: "desktop",
          ref: k,
          class: "dc-window__desktop"
        }, [
          W.value ? (m(), _("div", {
            key: 0,
            class: "dc-window__drop",
            style: Te({
              left: `${W.value.x}px`,
              top: `${W.value.y}px`,
              width: `${W.value.w}px`,
              height: `${W.value.h}px`
            }),
            "aria-hidden": "true"
          }, null, 4)) : N("", !0),
          (m(!0), _(re, null, ve(f.value, (te) => (m(), be(cc, {
            key: te.key,
            frame: te.held,
            path: te.path,
            order: te.order,
            place: R.value.get(te.key) ?? null
          }, {
            default: Ut(() => [
              de(ee, {
                node: te.held.node,
                path: te.path,
                framed: te.held.node.kind !== "group"
              }, null, 8, ["node", "path", "framed"])
            ]),
            _: 2
          }, 1032, ["frame", "path", "order", "place"]))), 128))
        ], 512)) : r.value ? (m(), _("div", {
          key: 2,
          ref_key: "container",
          ref: a,
          class: "dc-window__split",
          "data-dc-direction": r.value.direction
        }, [
          L.value ? (m(), _("div", Dc)) : N("", !0),
          (m(!0), _(re, null, ve(c.value, (te, pe) => (m(), _(re, {
            key: M(te)
          }, [
            v("div", {
              class: "dc-window__cell",
              style: Te({ flexGrow: l.value[pe] ?? 1 })
            }, [
              de(ee, {
                node: te,
                path: z.value[pe] ?? []
              }, null, 8, ["node", "path"])
            ], 4),
            pe < c.value.length - 1 ? (m(), _("div", {
              key: 0,
              class: "dc-window__gutter",
              role: "separator",
              "aria-orientation": I.value ? "vertical" : "horizontal",
              "aria-label": Z(pe),
              "aria-valuenow": le(pe),
              "aria-valuemin": "0",
              "aria-valuemax": "100",
              "aria-disabled": C(n).resizable.value ? void 0 : "true",
              tabindex: C(n).resizable.value ? 0 : -1,
              onPointerdown: (Ce) => Me(Ce, pe),
              onKeydown: (Ce) => Pe(Ce, pe)
            }, null, 40, Ic)) : N("", !0)
          ], 64))), 128))
        ], 8, Lc)) : N("", !0)
      ], 8, Rc));
    };
  }
}), Vc = /* @__PURE__ */ ue(Nc, [["__scopeId", "data-v-fb5b403f"]]), Oc = ["data-dc-theme", "data-dc-dragging", "data-dc-docking"], Kc = {
  key: 1,
  class: "dc-window__empty"
}, qc = {
  class: "dc-window__live",
  "aria-live": "polite",
  role: "status"
}, Nt = 16, Bc = /* @__PURE__ */ ce({
  __name: "WindowFrame",
  props: /* @__PURE__ */ Ht({
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
  emits: /* @__PURE__ */ Ht(["panel-move", "view-change", "panel-activate", "tab-select", "frame-change", "frame-maximize", "frame-minimize", "panel-close"], ["update:layout", "update:views"]),
  setup(e, { expose: t, emit: n }) {
    const a = e, s = n, r = Wt(e, "layout"), o = Wt(e, "views"), c = _n(), l = g(() => new Map(a.panels.map((i) => [i.id, i]))), f = g(() => a.panels.map((i) => i.id)), d = g(() => Ui(r.value, f.value)), b = B(null), y = B(null), h = B(null), k = B(!0), w = B(null), $ = B(null), R = B(null), q = B(""), W = B(null);
    function L() {
      const i = W.value;
      return i ? [...i.querySelectorAll(".dc-pane[data-dc-panels]")].filter((p) => p.closest(".dc-window") === i).map((p) => ({ panels: (p.dataset.dcPanels ?? "").split(" "), element: p })) : [];
    }
    function I(i) {
      const u = [];
      let p = i.closest(".dc-float");
      for (; p; )
        u.unshift(Number(p.dataset.dcOrder ?? 0)), p = p.parentElement?.closest(".dc-float") ?? null;
      return u;
    }
    function z() {
      return L().map((i) => ({ pane: i, order: I(i.element) })).sort((i, u) => {
        const p = Math.max(i.order.length, u.order.length);
        for (let x = 0; x < p; x += 1) {
          const S = (i.order[x] ?? -1) - (u.order[x] ?? -1);
          if (S !== 0) return S;
        }
        return 0;
      }).map((i) => i.pane);
    }
    const M = (i) => L().find((u) => u.panels.includes(i)) ?? null;
    function P(i) {
      const u = l.value.get(i);
      if (!u) return "";
      const p = o.value[i];
      return p && u.views?.some((x) => x.key === p) ? p : u.defaultView ?? u.views?.[0]?.key ?? "";
    }
    function Z(i, u) {
      o.value = { ...o.value, [i]: u }, s("view-change", { panel: i, view: u });
    }
    const le = g(
      () => a.panels.filter((i) => i.fixed !== !0).length
    );
    function fe(i) {
      return !a.movable || le.value < 1 || a.panels.length < 2 ? !1 : l.value.get(i)?.fixed !== !0;
    }
    function j(i, u) {
      const p = d.value;
      !i || !p || i === p || (r.value = i, u && s("panel-move", u));
    }
    function Me(i, u, p) {
      if (i.width <= 0 || i.height <= 0) return "center";
      const x = (u - i.left) / i.width, S = (p - i.top) / i.height, A = 0.3;
      return x > A && x < 1 - A && S > A && S < 1 - A ? "center" : [
        { edge: "left", distance: x },
        { edge: "right", distance: 1 - x },
        { edge: "top", distance: S },
        { edge: "bottom", distance: 1 - S }
      ].reduce(
        (Q, D) => D.distance < Q.distance ? D : Q
      ).edge;
    }
    function Pe(i, u) {
      const p = [...i.querySelectorAll(".dc-tab")], x = p.findIndex((S) => {
        const A = S.getBoundingClientRect();
        return u < A.left + A.width / 2;
      });
      return x === -1 ? p.length : x;
    }
    function T(i, u, p) {
      for (const { panels: x, element: S } of z().reverse()) {
        const A = S.getBoundingClientRect();
        if (i < A.left || i > A.right || u < A.top || u > A.bottom) continue;
        const ae = x.find((U) => U !== p), Q = S.querySelector(".dc-pane__tabs"), D = Q?.getBoundingClientRect();
        if (Q && D && u >= D.top && u <= D.bottom)
          return ae ? { panel: ae, edge: "center", index: Pe(Q, i) } : null;
        const K = S.querySelector(":scope > .dc-pane__space");
        if (K) {
          const U = K.getBoundingClientRect();
          if (i >= U.left && i <= U.right && u >= U.top && u <= U.bottom) continue;
        }
        return ae ? { panel: ae, edge: Me(A, i, u) } : null;
      }
      return ee(i, u, p) ?? Ce(i, u);
    }
    function X() {
      const i = W.value;
      return i ? [...i.querySelectorAll(".dc-window__desktop")].filter((u) => u.closest(".dc-window") === i).reverse() : [];
    }
    function ee(i, u, p) {
      const x = d.value;
      if (!x) return null;
      for (const S of X()) {
        const A = S.getBoundingClientRect();
        if (i < A.left || i > A.right || u < A.top || u > A.bottom) continue;
        const ae = Be(S), Q = ae.flatMap((ne) => ne.panels).find((ne) => ne !== p);
        if (!Q && ae.length > 0) return null;
        const D = _e(x, p)?.rect, K = nn(
          {
            x: i - A.left - 24,
            y: u - A.top - 12,
            w: D?.w ?? at.w,
            h: D?.h ?? at.h
          },
          { w: S.clientWidth, h: S.clientHeight },
          a.minPanelSize
        );
        if (Q) return { panel: Q, edge: "float", rect: K };
        const U = te(S);
        return U ? { panel: "", space: U, edge: "float", rect: K } : null;
      }
      return null;
    }
    function te(i) {
      const u = i.closest(".dc-space")?.getAttribute("data-dc-path");
      return u == null ? null : u === "" ? [] : u.split("/").map(Number);
    }
    function pe() {
      const i = W.value;
      return i ? [...i.querySelectorAll(".dc-space")].filter((u) => u.closest(".dc-window") === i).filter((u) => !u.querySelector(".dc-pane")).reverse().flatMap((u) => {
        const p = te(u);
        return p ? [{ element: u, path: p }] : [];
      }) : [];
    }
    function Ce(i, u) {
      for (const { element: p, path: x } of pe()) {
        if (p.dataset.dcSpace === "desktop") continue;
        const S = p.getBoundingClientRect();
        if (!(i < S.left || i > S.right || u < S.top || u > S.bottom))
          return { panel: "", space: x, edge: "center" };
      }
      return null;
    }
    function Be(i) {
      return L().filter(
        (u) => u.element.closest(".dc-window__desktop") === i
      );
    }
    let We = null;
    const Ue = (i) => i.altKey;
    function He(i, u) {
      if (!fe(i) || y.value || $.value || u.button !== 0) return;
      const p = u.clientX, x = u.clientY;
      let S = !1, A = Ue(u);
      const ae = () => {
        const se = R.value;
        se && (h.value = A ? ee(se.x, se.y, i) : T(se.x, se.y, i));
      }, Q = (se) => {
        if (!S) {
          if (Math.hypot(se.clientX - p, se.clientY - x) < 4) return;
          S = !0, y.value = i, w.value = null;
        }
        A = Ue(se), k.value = !A, R.value = { x: se.clientX, y: se.clientY }, ae();
      }, D = (se) => {
        Ue(se) !== A && (A = !A, k.value = !A, S && ae());
      }, K = (se) => {
        We?.();
        const H = h.value, ye = d.value;
        if (se && S && H && ye) {
          const Ge = H.space ? ia(ye, i, H.space, H.rect) : H.edge === "float" && H.rect ? oa(ye, i, H.panel, H.rect) : It(ye, i, H.panel, H.edge, H.index);
          j(Ge, {
            panel: i,
            target: H.panel,
            edge: H.edge,
            ...H.space === void 0 ? {} : { space: H.space },
            ...H.index === void 0 ? {} : { index: H.index },
            ...H.rect === void 0 ? {} : { rect: H.rect }
          });
        }
        y.value = null, h.value = null, R.value = null, k.value = !0;
      }, U = () => K(!0), ne = () => K(!1), ie = (se) => {
        if (se.key === "Escape") {
          K(!1);
          return;
        }
        D(se);
      };
      We = () => {
        window.removeEventListener("pointermove", Q), window.removeEventListener("pointerup", U), window.removeEventListener("pointercancel", ne), window.removeEventListener("keydown", ie), window.removeEventListener("keyup", D), We = null;
      }, window.addEventListener("pointermove", Q), window.addEventListener("pointerup", U), window.addEventListener("pointercancel", ne), window.addEventListener("keydown", ie), window.addEventListener("keyup", D);
    }
    je(() => We?.());
    let Le = null;
    function De(i) {
      const u = W.value;
      return u ? [...u.querySelectorAll(
        `.dc-float[data-dc-path="${i.join("/")}"]`
      )].find((S) => S.closest(".dc-window") === u)?.parentElement ?? null : null;
    }
    function Ie(i) {
      const u = d.value;
      return u ? vn(u, i) : null;
    }
    function gt(i) {
      const u = d.value;
      if (!u) return;
      const p = Mt(u, i);
      p !== u && (r.value = p);
    }
    function Tt(i) {
      const u = Ie(i);
      u && gt(u);
    }
    function F(i) {
      const u = d.value, p = u ? _e(u, i) : null;
      return p !== null && Xe(p);
    }
    function V(i) {
      const u = d.value, p = u ? _e(u, i) : null;
      return p !== null && et(p);
    }
    function Y(i) {
      const u = d.value, p = u ? Je(u, i) : null;
      return p ? we(p.node) : "";
    }
    function ke(i) {
      const u = d.value, p = u ? Je(u, i) : null;
      if (!u || !p) return;
      const x = we(p.node);
      if (l.value.get(x)?.fixed === !0) return;
      const S = !et(p);
      let A = Ti(u, i, S);
      A !== u && (S || (A = Mt(A, i)), r.value = A, s("frame-minimize", { panel: x, minimized: S }));
    }
    function ge(i) {
      const u = Ie(i);
      u && ke(u);
    }
    function yt(i) {
      const u = d.value, p = u ? Je(u, i) : null;
      if (!u || !p) return;
      const x = we(p.node);
      if (l.value.get(x)?.fixed === !0) return;
      const S = !Xe(p);
      let A = Fi(u, i, S);
      A !== u && (S && (A = Mt(A, i)), r.value = A, s("frame-maximize", { panel: x, maximized: S }));
    }
    function qn(i) {
      const u = Ie(i);
      u && yt(u);
    }
    function Bn(i, u, p) {
      const x = d.value, S = x ? Je(x, i) : null;
      if (!x || !S || u.button !== 0 || y.value || $.value) return;
      const A = we(S.node);
      if (l.value.get(A)?.fixed === !0 || Xe(S) || et(S) || (p === "move" ? !a.movable : !a.resizable)) return;
      const ae = De(i), Q = Li(x, i);
      gt(i);
      const D = { w: ae?.clientWidth ?? 0, h: ae?.clientHeight ?? 0 }, K = { ...S.rect }, U = u.clientX, ne = u.clientY, ie = a.minPanelSize;
      $.value = A;
      const se = (Ee) => {
        const Ne = d.value;
        if (!Ne) return;
        const wt = la(Ne, Q, nn(Ee, D, ie));
        wt !== Ne && (r.value = wt);
      }, H = (Ee) => {
        Ee.preventDefault();
        const Ne = Ee.clientX - U, wt = Ee.clientY - ne;
        se(
          p === "move" ? { ...K, x: K.x + Ne, y: K.y + wt } : ra(K, p, Ne, wt, ie)
        );
      }, ye = (Ee) => {
        if (Le?.(), $.value = null, !Ee) {
          se(K);
          return;
        }
        const Ne = d.value ? Je(d.value, Q) : null;
        Ne && s("frame-change", { panel: Y(Q), rect: Ne.rect });
      }, Ge = () => ye(!0), Qe = () => ye(!1), Ze = (Ee) => {
        Ee.key === "Escape" && ye(!1);
      };
      Le = () => {
        window.removeEventListener("pointermove", H), window.removeEventListener("pointerup", Ge), window.removeEventListener("pointercancel", Qe), window.removeEventListener("keydown", Ze), Le = null;
      }, window.addEventListener("pointermove", H), window.addEventListener("pointerup", Ge), window.addEventListener("pointercancel", Qe), window.addEventListener("keydown", Ze);
    }
    function os(i, u, p) {
      const x = Ie(i);
      x && Bn(x, u, p);
    }
    function is(i, u, p = !1) {
      const x = d.value, S = Ie(i), A = x && S ? Je(x, S) : null;
      if (!x || !S || !A || l.value.get(i)?.fixed === !0 || (p ? !a.resizable : !a.movable)) return;
      if (Xe(A) || et(A)) {
        q.value = `${ze(i)} is ${Xe(A) ? "maximized" : "minimized"}, so it cannot be moved.`;
        return;
      }
      const ae = u === "left" ? -Nt : u === "right" ? Nt : 0, Q = u === "up" ? -Nt : u === "down" ? Nt : 0, D = De(S), K = { w: D?.clientWidth ?? 0, h: D?.clientHeight ?? 0 }, U = p ? ra(A.rect, "se", ae, Q, a.minPanelSize) : { ...A.rect, x: A.rect.x + ae, y: A.rect.y + Q }, ne = la(x, S, nn(U, K, a.minPanelSize));
      if (ne === x) {
        q.value = p ? `${ze(i)} cannot be resized further.` : `${ze(i)} cannot move ${u}.`;
        return;
      }
      r.value = ne;
      const ie = Je(ne, S);
      ie && (s("frame-change", { panel: i, rect: ie.rect }), q.value = p ? `${ze(i)} resized to ${ie.rect.w} by ${ie.rect.h}.` : `${ze(i)} moved to ${ie.rect.x}, ${ie.rect.y}.`);
    }
    je(() => Le?.());
    function cs(i, u) {
      const p = M(i), x = p?.element.getBoundingClientRect();
      if (!p || !x) return null;
      const S = u === "left" || u === "right", A = (D) => {
        if (!(S ? D.bottom > x.top + 1 && D.top < x.bottom - 1 : D.right > x.left + 1 && D.left < x.right - 1)) return null;
        const U = u === "left" ? x.left - D.right : u === "right" ? D.left - x.right : u === "up" ? x.top - D.bottom : D.top - x.bottom;
        return U < -1 ? null : U;
      }, ae = [];
      for (const D of L()) {
        if (D === p || D.element === p.element) continue;
        const K = A(D.element.getBoundingClientRect());
        if (K === null) continue;
        const U = D.panels.find((ne) => ne !== i);
        U && ae.push({ to: { panel: U }, distance: K });
      }
      for (const { element: D, path: K } of pe()) {
        const U = A(D.getBoundingClientRect());
        U !== null && ae.push({ to: { space: K }, distance: U });
      }
      return ae.reduce(
        (D, K) => D && D.distance <= K.distance ? D : K,
        null
      )?.to ?? null;
    }
    function us(i) {
      const u = d.value ? _e(d.value, i) !== null : !1;
      if (!u && !fe(i)) return;
      w.value = w.value === i ? null : i;
      const p = ze(i);
      if (!w.value) {
        q.value = `${p}: move mode off.`;
        return;
      }
      q.value = u ? `${p}: move mode on. Arrow keys move the window, shift and an arrow resize it, Escape leaves move mode.` : `${p}: move mode on. Arrow keys move the panel, shift and an arrow make it a tab of the panel that way, Escape leaves move mode.`;
    }
    const ze = (i) => l.value.get(i)?.title ?? i, ds = {
      left: "left",
      right: "right",
      up: "top",
      down: "bottom"
    };
    function fs(i, u, p = !1) {
      if (!fe(i)) return;
      const x = d.value;
      if (!x) return;
      const S = ze(i), A = ut(x, i);
      if (!p && A && (u === "left" || u === "right") && A.panels.length > 1) {
        const ne = A.panels.indexOf(i), ie = u === "left" ? ne - 1 : ne + 1;
        if (ie >= 0 && ie < A.panels.length) {
          j(Ct(x, i, ie), { panel: i, target: i, edge: "center", index: ie }), q.value = `${S} moved ${u}, now tab ${ie + 1} of ${A.panels.length}.`, Zt(i);
          return;
        }
      }
      const Q = cs(i, u);
      if (!Q || Q.panel !== void 0 && !fe(Q.panel)) {
        q.value = `${S} cannot move ${u}.`;
        return;
      }
      const D = ds[u];
      if (Q.space) {
        const ne = Q.space, ie = Ye(x, ne), se = _e(x, i)?.rect, H = { ...at, ...se ? { w: se.w, h: se.h } : {} };
        j(ia(x, i, ne, H), { panel: i, target: "", space: ne, edge: D }), q.value = `${S} moved ${u}, into ${ie ? mt(ie) : "the space"}.`, Zt(i);
        return;
      }
      const K = Q.panel, U = A?.panels.length === 1 && ut(x, K)?.panels.length === 1;
      p ? (j(It(x, i, K, "center"), {
        panel: i,
        target: K,
        edge: "center"
      }), q.value = `${S} joined ${ze(K)} as a tab.`) : U ? (j(Ot(x, i, K), { panel: i, target: K, edge: D }), q.value = `${S} moved ${u}, trading places with ${ze(K)}.`) : (j(It(x, i, K, D), { panel: i, target: K, edge: D }), q.value = `${S} moved ${u}, beside ${ze(K)}.`), Zt(i);
    }
    function Zt(i) {
      St(() => {
        M(i)?.element.querySelector(".dc-pane__grip")?.focus();
      });
    }
    function ps(i, u) {
      const p = d.value;
      p && (r.value = Kt(p, i, u));
    }
    function Jt(i) {
      const u = d.value;
      if (!u) return;
      const p = ft(u, i);
      p !== u && (r.value = p, s("tab-select", { panel: i }));
    }
    function Wn(i) {
      return l.value.get(i)?.closable ?? a.closable;
    }
    function vs(i) {
      Wn(i) && s("panel-close", i);
    }
    const en = B(/* @__PURE__ */ new Map());
    let ms = 0;
    function hs(i, u) {
      const p = ms += 1;
      return en.value.set(p, { panel: i, items: u }), () => {
        en.value.delete(p);
      };
    }
    function _s(i) {
      const u = [];
      for (const p of en.value.values())
        p.panel() === i && u.push(...p.items());
      return u;
    }
    function Un(i) {
      const u = i.filter((p) => p.items.length > 0);
      return u.length < 2 ? u.flatMap((p) => p.items) : u.flatMap((p) => [
        { id: p.id, heading: !0, label: p.title },
        ...p.items
      ]);
    }
    const Hn = (i) => i.title || "These tabs";
    function gs(i, u) {
      const p = u.id, x = ut(i, p), S = (x?.panels.length ?? 0) > 1, A = x?.fixedView === !0, ae = (U) => ({
        action: () => {
          U !== i && (r.value = U);
        }
      }), Q = [], D = [], K = u.views ?? [];
      if (K.length > 1 && !A) {
        const U = P(p);
        Q.push({
          id: "view",
          label: "View",
          items: K.map((ne) => ({
            id: `view-${ne.key}`,
            label: ne.label,
            checked: ne.key === U,
            action: () => Z(p, ne.key)
          }))
        });
      }
      return S && !A && D.push(
        { id: "show-row", label: "Row", checked: !1, ...ae(ca(i, p, "row")) },
        {
          id: "show-column",
          label: "Column",
          checked: !1,
          ...ae(ca(i, p, "column"))
        },
        // Already true, and nothing to collapse: these panes are tabs. Ticked
        // and choosable all the same — collapsing a strip into a strip hands
        // back the tree it was given, so it is the no-op it looks like.
        {
          id: "show-tabs",
          label: "Tabs",
          checked: !0,
          ...ae(Vi(i, p))
        },
        {
          id: "show-desktop",
          label: "Desktop",
          checked: !1,
          ...ae(Oi(i, p))
        }
      ), S && x && (D.length && D.push({ separator: !0 }), D.push(...Gn(x, p))), { panel: Q, tabs: D, tabsTitle: x ? Hn(x) : "" };
    }
    function Gn(i, u) {
      const p = ot(i), x = (S) => {
        const A = i.panels[(p + S + i.panels.length) % i.panels.length];
        return (A === void 0 ? "" : we(A)) || u;
      };
      return [
        { id: "next-tab", label: "Next tab", action: () => Jt(x(1)) },
        { id: "previous-tab", label: "Previous tab", action: () => Jt(x(-1)) }
      ];
    }
    function Lt(i) {
      return i.title ? i.title : O(i) ? i.panels.length > 1 ? "these tabs" : "the strip" : mt(i);
    }
    function Xn(i) {
      if (!i || G(i) || i.fixedView === !0 || !i.title && i.headless !== !0 || Ae(i)) return null;
      const u = rs(i);
      return u && u.fixedView !== !0 ? u : null;
    }
    function ys(i) {
      const u = d.value;
      if (!a.menu || !u) return [];
      const p = Ye(u, i);
      if (!p || O(p)) return [];
      if (p.fixedView) return [];
      const x = G(p) ? "desktop" : p.direction, S = (H, ye, Ge) => ({
        id: `show-${H}`,
        label: ye,
        checked: x === H,
        action: () => {
          const Qe = d.value, Ze = Ge();
          !Qe || Ze === p || (r.value = Yt(he(rt(Qe, i, Ze))));
        }
      }), A = () => {
        const H = ts(p, ws(p));
        if (O(H) && H.panels.length === 0) return p;
        const ye = O(H) && H.panels.length === 1 ? H.panels[0] : void 0;
        return ye !== void 0 && oe(ye) ? p : H;
      }, ae = (H) => () => G(p) ? ss(p, H) : p.direction === H ? p : { ...p, direction: H }, Q = i.slice(0, -1), D = i.length > 0 ? Ye(u, Q) : null, K = D && O(D) && D.panels.length > 1 ? D : null, U = D && Xn(D) === p ? D : null, ne = Xn(p), ie = p.title || "this space", se = (H, ye, Ge, Qe, Ze) => ({
        id: H,
        label: Ze,
        action: () => {
          const Ee = d.value;
          Ee && (r.value = Yt(he(rt(Ee, ye, Bi(Ge, Qe)))));
        }
      });
      return Un([
        {
          id: "about-space",
          /*
           * Its own name, or what it is rather than how it is shown: `spaceTitle`
           * would answer "Row" for an unnamed row, which is the item directly
           * under it and the one already ticked.
           */
          title: p.title || "This space",
          items: [
            S("row", "Row", ae("row")),
            S("column", "Column", ae("column")),
            // Everything in this space in one strip: the panes as tabs, and a
            // desktop among them as a tab of its own, keeping the windows on it.
            S("tabs", "Tabs", () => A()),
            S("desktop", "Desktop", () => G(p) ? p : as(p))
          ]
        },
        {
          id: "about-around",
          title: ne ? `Around ${Lt(ne)}` : "",
          items: ne ? [
            // Keeping this space's bar drops the one inside, so it is offered
            // only where the space inside has no name to be dropped with it.
            ...ne.title ? [] : [se("merge-around-keep-this", i, p, "outer", `Keep ${ie}`)],
            ...p.title ? [] : [se("merge-around-keep-that", i, p, "inner", `Keep ${Lt(ne)}`)]
          ] : []
        },
        {
          id: "about-inside",
          title: U ? `Inside ${Lt(U)}` : "",
          items: U ? [
            ...p.title ? [] : [se("merge-inside-keep-that", Q, U, "outer", `Keep ${Lt(U)}`)],
            ...U.title ? [] : [se("merge-inside-keep-this", Q, U, "inner", `Keep ${ie}`)]
          ] : []
        },
        {
          id: "about-tabs",
          title: K ? Hn(K) : "",
          items: K ? Gn(K, we(p)) : []
        }
      ]);
    }
    function ws(i) {
      const u = b.value;
      return u && J(i, u) ? u : void 0;
    }
    function bs(i) {
      const u = d.value, p = l.value.get(i);
      if (!u || !p) return [];
      const x = a.menu ? gs(u, p) : null, S = _s(i);
      S.length && x?.panel.length && S.push({ separator: !0 }), x && S.push(...x.panel);
      const A = Un([
        { id: "about-panel", title: p.title, items: S },
        { id: "about-tabs", title: x?.tabsTitle ?? "", items: x?.tabs ?? [] }
      ]);
      return a.paneMenu ? a.paneMenu(p, A) : A;
    }
    function ks(i, u) {
      return c[`${i}-${u}`] ?? c[i];
    }
    function Yn(i, u, p, x) {
      return ks(i, u.id)?.({ panel: u, view: p, active: x });
    }
    Hi({
      panelFor: (i) => l.value.get(i) ?? null,
      viewFor: P,
      setView: Z,
      movable: g(() => a.movable),
      resizable: g(() => a.resizable),
      minPanelSize: g(() => a.minPanelSize),
      spaceNames: g(() => a.spaceNames),
      focused: b,
      dragging: y,
      dropTarget: h,
      moving: w,
      framing: $,
      canMove: fe,
      focus(i) {
        b.value !== i && (b.value = i, s("panel-activate", i));
      },
      selectPanel: Jt,
      beginDrag: He,
      toggleMoveMode: us,
      nudge: fs,
      setSizes: ps,
      frameOf: (i) => d.value ? _e(d.value, i) : null,
      beginFrameDrag: os,
      nudgeFrame: is,
      raise: Tt,
      maximized: F,
      toggleMaximize: qn,
      minimized: V,
      toggleMinimize: ge,
      beginFrameDragAt: Bn,
      raiseAt: gt,
      toggleMaximizeAt: yt,
      toggleMinimizeAt: ke,
      menuFor: bs,
      spaceMenu: ys,
      registerMenu: hs,
      closable: Wn,
      close: vs,
      renderContent: (i, u, p) => Yn("panel", i, u, p),
      renderActions: (i, u, p) => Yn("actions", i, u, p),
      layout: d
    });
    const $s = g(() => {
      if (!(!a.accent && !a.tokens))
        return { ...a.tokens, ...a.accent ? { "--dc-accent": a.accent } : {} };
    }), xs = () => {
      const i = y.value, u = R.value;
      return !i || !u ? null : As(
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
      move(i, u, p, x) {
        const S = d.value;
        S && j(It(S, i, u, p, x), {
          panel: i,
          target: u,
          edge: p,
          ...x === void 0 ? {} : { index: x }
        });
      },
      /** Brings a panel's tab to the top of its group. */
      select(i) {
        const u = d.value;
        u && (r.value = ft(u, i));
      },
      /** Lifts a panel onto the float holding `near`, as a window of its own. */
      float(i, u, p) {
        const x = d.value;
        x && j(oa(x, i, u, p), {
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
        const x = Ai(p, i, u);
        if (x === p) return;
        r.value = x;
        const S = _e(x, i);
        S && s("frame-change", { panel: i, rect: S.rect });
      },
      /**
       * Puts a panel on one of its views, the way its menu would — the way a pane
       * whose space fixed its view, or took its bar away, is switched at all.
       */
      setView: Z,
      /** Brings a floating frame to the front of its stack. */
      raise: Tt,
      /** Fills the float with a window, or puts it back where it was. */
      toggleMaximize: qn,
      /** Rolls a window up to its title bar, or unrolls it. */
      toggleMinimize: ge
    }), (i, u) => (m(), _("div", {
      ref_key: "root",
      ref: W,
      class: "dc-shell dc-window",
      "data-dc-theme": e.theme,
      "data-dc-dragging": y.value ? "true" : "false",
      "data-dc-docking": k.value ? "true" : "false",
      style: Te($s.value)
    }, [
      d.value ? (m(), be(Vc, {
        key: 0,
        node: d.value,
        path: []
      }, null, 8, ["node"])) : (m(), _("p", Kc, " This window has no panels. ")),
      de(xs),
      v("p", qc, E(q.value), 1)
    ], 12, Oc));
  }
}), Wc = /* @__PURE__ */ ue(Bc, [["__scopeId", "data-v-711565af"]]);
function iu(e = "", t = "/") {
  const n = B(Oe(e)), a = B(t), s = [`${a.value}${n.value}`];
  return {
    search: n,
    path: a,
    history: s,
    push(r) {
      n.value = Oe(r), s.push(`${a.value}${n.value}`);
    },
    replace(r) {
      n.value = Oe(r), s[s.length - 1] = `${a.value}${n.value}`;
    }
  };
}
function fa(e) {
  const t = e.indexOf("?");
  if (t === -1) return "";
  const n = e.slice(t), a = n.indexOf("#");
  return Oe(a === -1 ? n : n.slice(0, a));
}
function cu(e) {
  const t = B(fa(e.currentRoute.value.fullPath)), n = g(() => e.currentRoute.value.path), a = $e(
    () => e.currentRoute.value.fullPath,
    (s) => {
      t.value = fa(s);
    }
  );
  return {
    search: t,
    path: n,
    push: (s) => e.push(`${n.value}${Oe(s)}`),
    replace: (s) => e.replace(`${n.value}${Oe(s)}`),
    dispose: a
  };
}
const Uc = {
  DataShell: ui,
  ShellHeader: Aa,
  QueryPanel: Ra,
  ResultsArea: qa,
  FacetControl: za,
  SegmentedControl: cn,
  StatusPill: Pt,
  ScoreMeter: Na,
  WindowFrame: Wc,
  WindowPane: ls,
  ListView: un,
  CardsView: La,
  GridView: Da,
  TableView: Oa,
  LinksView: Ia,
  PreviewView: Va,
  TypeCardsView: Ka
}, uu = {
  install(e, t = {}) {
    const n = t.prefix ?? "";
    for (const [a, s] of Object.entries(Uc))
      e.component(`${n}${a}`, s);
    t.route && e.provide(ma, t.route);
  }
};
export {
  Xt as CASCADE_STEP,
  La as CardsView,
  at as DEFAULT_FRAME,
  Xc as DEFAULT_SORT,
  Rs as DEFAULT_VIEW,
  ui as DataShell,
  Ca as ENTITY_ALL,
  on as ENTITY_TERM,
  En as FACET_PREFIX,
  za as FacetControl,
  Fa as GENERIC_LABELS,
  Da as GridView,
  uu as HeaderContentLayoutPlugin,
  Ia as LinksView,
  un as ListView,
  it as MINIMIZED_GAP,
  Ua as MINIMIZED_HEIGHT,
  dn as MINIMIZED_WIDTH,
  Wa as MIN_FRAME,
  ta as MOCK_TINTS,
  jc as MenuBar,
  Pn as MenuButton,
  Ba as MenuList,
  Kn as PANE_CONTEXT_KEY,
  xn as PARAM_DIR,
  bn as PARAM_ENTITY,
  Mn as PARAM_EXPR,
  Cn as PARAM_PAGE,
  $n as PARAM_SORT,
  kn as PARAM_VIEW,
  Sn as PinStar,
  Va as PreviewView,
  Ra as QueryPanel,
  Qn as RECORD_STATUSES,
  Ts as RESULT_FIELDS,
  ma as ROUTE_ADAPTER_KEY,
  qa as ResultsArea,
  Ma as SHELL_CONTEXT_KEY,
  Gc as SHELL_THEMES,
  Na as ScoreMeter,
  cn as SegmentedControl,
  Aa as ShellHeader,
  Pt as StatusPill,
  Oa as TableView,
  Ka as TypeCardsView,
  ha as VIEW_KINDS,
  Vn as WINDOW_CONTEXT_KEY,
  Wc as WindowFrame,
  ls as WindowPane,
  Ga as activePanel,
  ot as activeTab,
  Si as axisOf,
  Rn as cascade,
  Zn as changesResults,
  nn as clampRect,
  ts as collapseSpace,
  Vi as collapseToTabs,
  Zc as column,
  Fs as countPages,
  zs as createHistoryAdapter,
  iu as createMemoryAdapter,
  Xs as createMockDataSource,
  cu as createVueRouterAdapter,
  da as defaultLayout,
  wn as defaultQuery,
  ia as dropIntoSpace,
  Gt as emptyFacetState,
  gn as emptyFacetValue,
  ct as findEntity,
  nt as findSort,
  eu as fixedView,
  zn as float,
  oa as floatPanel,
  as as floatSplit,
  Oi as floatTabs,
  Jn as fnv1a,
  ga as focusEntity,
  Ks as formatDate,
  ea as formatMetric,
  qs as formatOrdinal,
  xa as formatPercent,
  jt as frame,
  Je as frameAt,
  _e as frameOf,
  vn as framePathOf,
  we as frontPanel,
  Us as generateRows,
  Qc as group,
  ut as groupOf,
  Pi as groups,
  ba as hasActiveFacets,
  J as hasPanel,
  Jc as headless,
  $t as insertPanel,
  xt as isChoosable,
  Yc as isEntityScoped,
  wa as isFacetActive,
  G as isFloat,
  O as isGroup,
  Xe as isMaximized,
  et as isMinimized,
  oe as isPanelTab,
  yn as isPristineQuery,
  _t as isSplit,
  Se as isTabOf,
  ka as isTypeCardsQuery,
  _a as isViewKind,
  Os as matchesExpression,
  Hs as matchesFacets,
  zi as maximizeFrame,
  Fi as maximizeFrameAt,
  Bi as mergeSpace,
  Ri as minimizeFrame,
  Ti as minimizeFrameAt,
  It as movePanel,
  Ct as moveTab,
  Ye as nodeAt,
  Et as nodeTitle,
  he as normalizeLayout,
  Oe as normalizeSearch,
  In as normalizeSizes,
  rs as onlySpace,
  qe as panelIds,
  Fe as panelNode,
  sa as panelTabs,
  Is as parseExpression,
  tr as parseQuery,
  Ta as presentRow,
  uc as providePaneContext,
  Ys as provideShellContext,
  Hi as provideWindowContext,
  an as raiseFrame,
  Mt as raiseFrameAt,
  Li as raisedPath,
  $a as reconcileFacets,
  Ui as reconcileLayout,
  st as removePanel,
  rt as replaceAt,
  ra as resizeRect,
  ua as resizeSplit,
  Yt as rootSpace,
  Tn as row,
  aa as serializeQuery,
  ft as setActivePanel,
  Ai as setFrameRect,
  la as setFrameRectAt,
  Kt as setSizesAt,
  au as setSplitDirection,
  Ke as sizesOf,
  ya as sortsFor,
  me as spaceChrome,
  mt as spaceTitle,
  Fn as split,
  ca as spreadTabs,
  ar as summarizeQuery,
  Pa as summaryTerms,
  Ot as swapPanels,
  An as tabNode,
  zt as tabPanels,
  ss as tileFloat,
  su as toFloat,
  ru as toTiled,
  tu as toggleMaximized,
  nu as toggleMinimized,
  Fo as useEntityPreviews,
  lu as usePaneContext,
  ou as usePaneMenu,
  ht as usePresentedRows,
  sr as useQueryState,
  rr as useResults,
  xe as useShellContext,
  cl as useViewLabels,
  On as useWindowContext
};
