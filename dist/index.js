import { ref as B, inject as vt, provide as hn, computed as g, toValue as bt, shallowRef as Bt, watch as Se, defineComponent as ce, openBlock as m, createElementBlock as h, createElementVNode as v, toDisplayString as C, createCommentVNode as O, unref as E, renderSlot as tt, Fragment as se, renderList as fe, withDirectives as an, withKeys as xt, withModifiers as Pe, vModelText as rn, normalizeClass as ka, useSlots as _n, nextTick as At, createBlock as be, createVNode as de, createTextVNode as kt, normalizeStyle as Te, resolveDynamicComponent as $a, useModel as Wt, onBeforeUnmount as je, useId as ds, createSlots as Yn, withCtx as Ut, mergeModels as Ht, onMounted as xa, resolveComponent as fs, getCurrentScope as Ma, onScopeDispose as Ca, h as Ea } from "vue";
const ps = Symbol("dc.routeAdapter");
function Ve(e) {
  if (!e) return "";
  const t = e.replace(/^[?]/, "");
  return t ? `?${t}` : "";
}
function Sa() {
  const e = typeof window < "u", t = B(e ? Ve(window.location.search) : ""), n = B(e ? window.location.pathname : "/"), s = () => {
    t.value = Ve(window.location.search), n.value = window.location.pathname;
  };
  e && window.addEventListener("popstate", s);
  const a = (r, o) => {
    const c = Ve(r);
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
const vs = ["list", "cards", "grid", "table", "links", "preview"], Bc = [
  "minimal",
  "mono-size",
  "dark",
  "light",
  "auto",
  "macos",
  "windows",
  "inherit"
], jn = ["ok", "running", "queued", "review", "failed"], Aa = "cards", Wc = "updated";
function ms(e) {
  return typeof e == "string" && vs.includes(e);
}
function ct(e, t) {
  return t ? e.entities.find((n) => n.key === t) ?? null : null;
}
function hs(e, t = {}) {
  const n = ct(e, t.entity), s = e.entities[0];
  if (!n && !s) throw new Error(`Schema "${e.key}" declares no entities`);
  return n ?? s;
}
function _s(e) {
  return e?.sorts?.length ? e.sorts : [
    { key: "updated", label: "updated" },
    { key: "score", label: "score" },
    { key: "metric1", label: e ? e.labels.metric1.toLowerCase() : "value" },
    { key: "metric2", label: e ? e.labels.metric2.toLowerCase() : "second value" },
    { key: "name", label: "name" }
  ];
}
function nt(e, t) {
  const n = _s(e);
  return (t ? n.find((a) => a.key === t) : void 0) ?? n[0];
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
function Xt(e) {
  const t = {};
  for (const n of e?.facets ?? []) t[n.key] = gn(n);
  return t;
}
function gs(e) {
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
function ys(e) {
  return Object.values(e).some(gs);
}
function yn(e) {
  return e.entity === null && e.expr.trim() === "" && !ys(e.facets);
}
function Uc(e) {
  return e.entity !== null;
}
function wn(e, t = {}) {
  const s = t.landing === "entity" ? hs(e, t) : null;
  return {
    entity: s?.key ?? null,
    view: t.view && ms(t.view) ? t.view : Aa,
    sort: nt(s, t.sort).key,
    dir: t.dir === "asc" ? "asc" : "desc",
    expr: "",
    facets: Xt(s)
  };
}
function ws(e, t) {
  const n = {};
  for (const s of e?.facets ?? []) {
    const a = t[s.key];
    n[s.key] = a && a.kind === s.kind ? a : gn(s);
  }
  return n;
}
const Pa = /^([A-Za-z_][\w.-]*)\s*(>=|<=|:|=|>|<)\s*(.*)$/;
function za(e) {
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
function Ra(e) {
  const t = e.trim();
  if (!t) return [];
  const n = [];
  let s = [];
  for (const a of za(t)) {
    const r = a.toUpperCase();
    if (r === "AND" || r === "&&") continue;
    if (r === "OR" || r === "||") {
      s.length && n.push(s), s = [];
      continue;
    }
    const o = Pa.exec(a);
    o && o[3] !== "" ? s.push({
      kind: "field",
      field: o[1].toLowerCase(),
      comparator: o[2],
      value: o[3]
    }) : s.push({ kind: "text", value: a });
  }
  return s.length && n.push(s), n;
}
function Fa(e, t, n) {
  const s = n.labels, a = (c) => c.toLowerCase().replace(/\s+/g, ""), r = e.replace(/\s+/g, "");
  if (r === "entity") return t.entityKey;
  if (r === "status" || r === "state") return t.status;
  if (r === "score") return t.score;
  if (r === "updated" || r === "date") return t.updatedAt;
  if (r === "name" || r === a(s.primary)) return t.primary;
  if (r === "ref" || r === a(s.secondary)) return t.secondary;
  if (r === "metric1" || r === a(s.metric1)) return t.metric1;
  if (r === "metric2" || r === a(s.metric2)) return t.metric2;
  if (e in t.facets) return t.facets[e];
  const o = n.facets.find((c) => a(c.label) === r);
  return o ? t.facets[o.key] : void 0;
}
function It(e, t) {
  const n = e.toLowerCase(), s = t.toLowerCase();
  if (!s.includes("*")) return n.includes(s);
  const a = s.replace(/[.+?^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*");
  return new RegExp(a).test(n);
}
function Ta(e, t, n) {
  if (e.kind === "text")
    return It(t.primary, e.value) || It(t.secondary, e.value);
  const s = Fa(e.field, t, n);
  if (s === void 0) return !0;
  if (Array.isArray(s))
    return e.comparator === ":" || e.comparator === "=" ? s.some((c) => It(c, e.value)) : !0;
  if (e.comparator === ":" || e.comparator === "=") {
    if (typeof s == "boolean") {
      const o = e.value.toLowerCase();
      return o === "true" || o === "yes" ? s : o === "false" || o === "no" ? !s : !0;
    }
    if (typeof s == "number") {
      const o = Number(e.value);
      return Number.isFinite(o) ? s === o : !0;
    }
    return It(s, e.value);
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
function La(e, t, n) {
  return e.length ? e.some((s) => s.every((a) => Ta(a, t, n))) : !0;
}
function Qn(e) {
  let t = 2166136261;
  for (let n = 0; n < e.length; n++)
    t ^= e.charCodeAt(n), t = Math.imul(t, 16777619);
  return Math.abs(t);
}
function Zn(e) {
  if (!Number.isFinite(e)) return "—";
  const t = Math.abs(e);
  return t >= 1e6 ? `${(e / 1e6).toFixed(1)}m` : t >= 1e3 ? `${(e / 1e3).toFixed(1)}k` : String(Math.round(e));
}
function Da(e) {
  const t = new Date(e);
  if (Number.isNaN(t.getTime())) return "—";
  const n = String(t.getUTCDate()).padStart(2, "0"), s = String(t.getUTCMonth() + 1).padStart(2, "0");
  return `${n}.${s}.${t.getUTCFullYear()}`;
}
function Ia(e) {
  return String(e + 1).padStart(2, "0");
}
function bs(e) {
  return `${Math.round(Math.min(1, Math.max(0, e)) * 100)}%`;
}
const Jn = [
  "oklch(0.36 0.06 240)",
  "oklch(0.34 0.07 290)",
  "oklch(0.36 0.06 160)",
  "oklch(0.38 0.06 80)",
  "oklch(0.35 0.07 30)",
  "oklch(0.34 0.05 200)"
];
function Na(e, t) {
  switch (e.kind) {
    case "chips":
      return e.multiple ? Va(e.options, t) : e.options[t % e.options.length] ?? "";
    case "range": {
      const n = Math.max(0, e.max - e.min);
      return e.min + (n === 0 ? 0 : t % (n + 1));
    }
    case "toggle":
      return t % 3 === 0;
  }
}
function Va(e, t) {
  if (!e.length) return [];
  const n = 1 + (t >> 5) % Math.min(3, e.length), s = t % e.length, a = /* @__PURE__ */ new Set();
  for (let r = 0; r < n; r++) a.add((s + r) % e.length);
  return [...a].sort((r, o) => r - o).map((r) => e[r]);
}
function Oa(e, t = {}) {
  const n = t.population ?? 48, s = t.seed ?? "", a = t.now ?? /* @__PURE__ */ new Date("2026-08-25T00:00:00Z"), r = e.samples;
  if (!r.length) return [];
  const o = [];
  for (let c = 0; c < n; c++) {
    const l = r[c % r.length], d = Math.floor(c / r.length), f = Qn(`${s}:${e.key}:${l[0]}:${c}`), k = {};
    for (const _ of e.facets)
      k[_.key] = Na(_, Qn(`${f}:${_.key}`));
    const y = new Date(a.getTime() - f % 900 * 36e5).toISOString();
    o.push({
      id: `${e.key}_${1e4 + c * 7}`,
      entityKey: e.key,
      entityLabel: e.label,
      primary: d ? `${l[0]} · rev ${d + 1}` : l[0],
      secondary: d ? `${l[1]}-${d + 1}` : l[1],
      status: jn[f % jn.length],
      score: Number((0.35 + f % 64 / 100).toFixed(3)),
      metric1: 1 + f % 940,
      metric2: 1 + (f >> 3) % 320,
      updatedAt: y,
      tint: Jn[f % Jn.length],
      facets: k
    });
  }
  return o;
}
function Ka(e, t) {
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
function qa(e) {
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
function Ba(e = {}) {
  const t = /* @__PURE__ */ new Map(), n = (s) => {
    const a = t.get(s.key);
    if (a) return a;
    const r = Oa(s, e);
    return t.set(s.key, r), r;
  };
  return {
    query({ query: s, schema: a, entity: r, limit: o }) {
      const c = Ra(s.expr), l = r ? [r] : a.entities, d = [], f = [];
      for (const _ of l)
        for (const $ of n(_))
          d.push($), (r ? Ka($, s.facets) : !0) && La(c, $, _) && f.push($);
      const k = nt(r, s.sort), y = f.sort(qa(k.key));
      return s.dir === "asc" && y.reverse(), {
        rows: y.slice(0, o),
        total: f.length,
        unfiltered: f.length === d.length
      };
    }
  };
}
const ks = Symbol("dc.shellContext");
function Wa(e) {
  return hn(ks, e), e;
}
function $e() {
  const e = vt(ks, null);
  if (!e)
    throw new Error(
      "[header-content-layout] No shell context found. Render this component inside <DataShell>."
    );
  return e;
}
const bn = "e", kn = "v", $n = "s", xn = "d", Mn = "q", Cn = "f_", $s = "*", Ua = [bn, kn, $n, xn, Mn], ln = "..", xs = ",", Ha = [
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
  for (const [n, s] of Ha) t = t.replace(n, s);
  return t;
}
function Xe(e) {
  try {
    return decodeURIComponent(e.replace(/\+/g, " "));
  } catch {
    return e.replace(/\+/g, " ");
  }
}
function Ms(e) {
  const t = e.replace(/^[?]/, "");
  if (!t) return [];
  const n = [];
  for (const s of t.split("&")) {
    if (!s) continue;
    const a = s.indexOf("="), r = a === -1 ? s : s.slice(0, a), o = a === -1 ? "" : s.slice(a + 1);
    n.push([Xe(r), o]);
  }
  return n;
}
function Xa(e) {
  return Ua.includes(e) || e.startsWith(Cn);
}
function es(e, t, n) {
  return Math.min(n, Math.max(t, e));
}
function Ga(e, t) {
  const n = Xe(t);
  switch (e.kind) {
    case "chips": {
      const s = new Set(
        n.split(xs).map((r) => r.trim()).filter(Boolean)
      );
      return { kind: "chips", selected: e.options.filter((r) => s.has(r)) };
    }
    case "range": {
      const s = n.indexOf(ln), a = (s === -1 ? n : n.slice(0, s)).trim(), r = (s === -1 ? "" : n.slice(s + ln.length)).trim(), o = a === "" ? null : Number(a), c = r === "" ? null : Number(r);
      let l = o !== null && Number.isFinite(o) ? es(o, e.min, e.max) : null, d = c !== null && Number.isFinite(c) ? es(c, e.min, e.max) : null;
      return l !== null && d !== null && l > d && ([l, d] = [d, l]), { kind: "range", min: l, max: d };
    }
    case "toggle":
      return { kind: "toggle", on: n === "1" || n === "true" };
  }
}
function Ya(e, t) {
  switch (e.kind) {
    case "chips":
      return e.selected.length ? (t.kind === "chips" ? t.options.filter((s) => e.selected.includes(s)) : e.selected).join(xs) : null;
    case "range":
      return e.min === null && e.max === null ? null : `${e.min ?? ""}${ln}${e.max ?? ""}`;
    case "toggle":
      return e.on ? "1" : null;
  }
}
function ja(e, t, n = {}) {
  const s = wn(t, n), a = new Map(Ms(e)), r = a.get(bn), o = r === void 0 ? s.entity : Xe(r), c = o === $s ? null : ct(t, o), l = a.get(kn), d = l && ms(Xe(l)) ? Xe(l) : s.view, f = a.get($n), k = nt(c, f ? Xe(f) : n.sort), y = a.get(xn), _ = y ? Xe(y) === "asc" ? "asc" : "desc" : s.dir, $ = a.get(Mn), w = {};
  for (const M of c?.facets ?? []) {
    const z = a.get(`${Cn}${M.key}`);
    w[M.key] = z === void 0 ? gn(M) : Ga(M, z);
  }
  return {
    entity: c?.key ?? null,
    view: d,
    sort: k.key,
    dir: _,
    expr: $ === void 0 ? "" : Xe($),
    facets: ws(c, w)
  };
}
function ts(e, t, n = {}, s = "") {
  const a = wn(t, n), r = ct(t, e.entity), o = Ms(s).filter(([k]) => !Xa(k)), c = [], l = (k, y) => c.push([k, tn(y)]), d = r?.key ?? null;
  d !== a.entity && l(bn, d ?? $s), e.view !== a.view && l(kn, e.view), e.sort !== a.sort && l($n, e.sort), e.dir !== a.dir && l(xn, e.dir), e.expr.trim() !== "" && l(Mn, e.expr);
  for (const k of r?.facets ?? []) {
    const y = e.facets[k.key];
    if (!y) continue;
    const _ = Ya(y, k);
    _ !== null && c.push([`${Cn}${k.key}`, tn(_)]);
  }
  const f = [
    ...o.map(([k, y]) => [tn(k), y]),
    ...c
  ];
  return f.length ? `?${f.map(([k, y]) => y === "" ? k : `${k}=${y}`).join("&")}` : "";
}
const on = "entity";
function Qa(e, t) {
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
function Cs(e, t) {
  const n = [];
  t && n.push({
    id: on,
    label: `entity:${t.key}`,
    facetKey: on
  });
  for (const s of t?.facets ?? []) {
    const a = e.facets[s.key];
    a && gs(a) && n.push(...Qa(s, a));
  }
  return n;
}
function Za(e, t) {
  if (yn(e)) {
    const a = nt(t, e.sort);
    return `everything · ${e.view} · ${a.label}`;
  }
  const n = Cs(e, t).map((a) => a.label), s = e.expr.trim();
  return s && n.push(`"${s}"`), n.join(" · ");
}
function Ja(e) {
  const { adapter: t } = e, n = g(() => bt(e.schema)), s = g(() => bt(e.defaults) ?? {}), a = g(() => ja(t.search.value, n.value, s.value)), r = g(() => ct(n.value, a.value.entity)), o = g(() => r.value ?? hs(n.value, s.value)), c = g(() => _s(r.value)), l = g(() => nt(r.value, a.value.sort)), d = (w, M) => {
    const z = ts(w, n.value, s.value, t.search.value);
    z !== t.search.value && (M === "push" ? t.push(z) : t.replace(z));
  }, f = () => bt(e.navigationMode) ?? "push", k = () => bt(e.facetNavigationMode) ?? "replace", y = (w, M) => {
    d({ ...a.value, ...w }, M);
  }, _ = (w, M) => {
    const z = a.value.facets[w];
    if (!z) return;
    const T = { ...a.value.facets, [w]: M(z) };
    y({ facets: T }, k());
  }, $ = (w) => {
    const M = w === null ? null : ct(n.value, w);
    (M?.key ?? null) !== a.value.entity && y(
      {
        entity: M?.key ?? null,
        sort: nt(M, a.value.sort).key,
        facets: Xt(M)
      },
      f()
    );
  };
  return {
    query: a,
    entity: r,
    focus: o,
    sort: l,
    sorts: c,
    summary: g(() => Za(a.value, r.value)),
    terms: g(() => Cs(a.value, r.value)),
    isPristine: g(() => yn(a.value)),
    isEverything: g(() => a.value.entity === null),
    hasFacets: g(() => ys(a.value.facets)),
    setEntity: $,
    clearEntity: () => $(null),
    setView(w) {
      y({ view: w }, f());
    },
    setSort(w) {
      y({ sort: nt(r.value, w).key }, f());
    },
    toggleDirection() {
      y({ dir: a.value.dir === "desc" ? "asc" : "desc" }, f());
    },
    setExpression(w) {
      y({ expr: w }, f());
    },
    setFacet(w, M) {
      _(w, () => M);
    },
    toggleChip(w, M) {
      _(w, (z) => z.kind !== "chips" ? z : { kind: "chips", selected: z.selected.includes(M) ? z.selected.filter((W) => W !== M) : [...z.selected, M] });
    },
    setRange(w, M, z) {
      _(w, (T) => T.kind === "range" ? { kind: "range", min: M, max: z } : T);
    },
    toggleFlag(w) {
      _(
        w,
        (M) => M.kind === "toggle" ? { kind: "toggle", on: !M.on } : M
      );
    },
    removeTerm(w) {
      if (w.facetKey === on) {
        $(null);
        return;
      }
      _(w.facetKey, (M) => M.kind === "chips" && w.option ? { kind: "chips", selected: M.selected.filter((z) => z !== w.option) } : M.kind === "range" ? { kind: "range", min: null, max: null } : M.kind === "toggle" ? { kind: "toggle", on: !1 } : M);
    },
    clearFilters() {
      y({ entity: null, expr: "", facets: Xt(null) }, f());
    },
    reset() {
      d(wn(n.value, s.value), f());
    },
    hrefFor(w) {
      const M = { ...a.value, ...w };
      return M.facets = ws(ct(n.value, M.entity), M.facets), `${t.path.value}${ts(M, n.value, s.value, t.search.value)}`;
    }
  };
}
function er(e) {
  const t = Bt([]), n = B(0), s = B(!1), a = Bt(null);
  let r = 0;
  const o = (l) => {
    t.value = l.rows, n.value = l.total, a.value = null;
  }, c = () => {
    const l = ++r, d = {
      query: e.query.value,
      schema: e.schema.value,
      entity: e.entity.value,
      limit: e.limit.value
    };
    let f;
    try {
      f = e.source.value.query(d);
    } catch (k) {
      a.value = k, t.value = [], n.value = 0;
      return;
    }
    if (!(f instanceof Promise)) {
      o(f), s.value = !1;
      return;
    }
    s.value = !0, f.then((k) => {
      l === r && o(k);
    }).catch((k) => {
      l === r && (a.value = k, t.value = [], n.value = 0);
    }).finally(() => {
      l === r && (s.value = !1);
    });
  };
  return Se([e.source, e.query, e.schema, e.entity, e.limit], c, {
    immediate: !0
  }), { rows: t, total: n, pending: s, error: a, refresh: c };
}
const tr = ["data-dc-expanded"], nr = ["aria-expanded", "aria-controls"], sr = { class: "dc-header__domain" }, ar = { class: "dc-header__crumb" }, rr = { class: "dc-header__crumb-root" }, lr = {
  key: 0,
  class: "dc-header__count dc-mono"
}, or = { class: "dc-header__query" }, ir = ["data-dc-active", "title"], cr = {
  class: "dc-header__chevron",
  "aria-hidden": "true"
}, ur = { class: "dc-header__sr" }, dr = {
  key: 0,
  class: "dc-header__actions"
}, fr = /* @__PURE__ */ ce({
  __name: "ShellHeader",
  props: {
    expanded: { type: Boolean },
    panelId: {},
    hideCount: { type: Boolean }
  },
  emits: ["toggle"],
  setup(e, { emit: t }) {
    const n = e, s = t, a = $e(), r = g(() => a.schema.value), o = g(() => a.entity.value?.label ?? "Everything"), c = g(() => {
      if (n.hideCount) return "";
      const l = a.entity.value;
      return l && !a.hasFacets.value && !a.query.value.expr.trim() ? l.count : String(a.total.value);
    });
    return (l, d) => (m(), h("div", {
      class: "dc-header",
      "data-dc-expanded": e.expanded ? "true" : "false"
    }, [
      v("button", {
        type: "button",
        class: "dc-header__trigger",
        "aria-expanded": e.expanded,
        "aria-controls": e.panelId,
        onClick: d[0] || (d[0] = (f) => s("toggle"))
      }, [
        d[2] || (d[2] = v("span", {
          class: "dc-header__badge",
          "aria-hidden": "true"
        }, "◆", -1)),
        v("span", sr, C(r.value.label), 1),
        v("span", ar, [
          v("span", rr, C(o.value), 1),
          c.value ? (m(), h("span", lr, C(c.value), 1)) : O("", !0)
        ]),
        v("span", or, [
          d[1] || (d[1] = v("span", { class: "dc-header__query-label" }, "Query", -1)),
          v("span", {
            class: "dc-header__summary dc-mono dc-truncate",
            "data-dc-active": E(a).isPristine.value ? "false" : "true",
            title: E(a).summary.value
          }, C(E(a).summary.value), 9, ir)
        ]),
        v("span", cr, C(e.expanded ? "▲" : "▼"), 1),
        v("span", ur, C(e.expanded ? "Hide query panel" : "Edit query"), 1)
      ], 8, nr),
      l.$slots.actions ? (m(), h("div", dr, [
        tt(l.$slots, "actions", {}, void 0, !0)
      ])) : O("", !0)
    ], 8, tr));
  }
}), ue = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [s, a] of t)
    n[s] = a;
  return n;
}, Es = /* @__PURE__ */ ue(fr, [["__scopeId", "data-v-1d24c7a9"]]), pr = { class: "dc-facet" }, vr = { class: "dc-facet__head" }, mr = ["id"], hr = { class: "dc-facet__hint dc-mono" }, _r = ["aria-labelledby"], gr = ["aria-pressed", "data-dc-active", "onClick"], yr = ["aria-labelledby"], wr = ["aria-label", "placeholder", "onKeydown"], br = ["aria-label", "placeholder", "onKeydown"], kr = ["aria-checked"], $r = { class: "dc-switch__text" }, xr = ["data-dc-active"], Mr = /* @__PURE__ */ ce({
  __name: "FacetControl",
  props: {
    facet: {},
    value: {}
  },
  emits: ["update"],
  setup(e, { emit: t }) {
    const n = e, s = t, a = g(() => {
      const { facet: y, value: _ } = n;
      return y.kind === "chips" && _.kind === "chips" ? _.selected.length ? `${_.selected.length} of ${y.options.length}` : "any" : y.kind === "range" && _.kind === "range" ? _.min === null && _.max === null ? `${y.min}–${y.max}` : `${_.min ?? y.min}–${_.max ?? y.max}` : _.kind === "toggle" ? _.on ? "on" : "off" : "";
    }), r = g(
      () => n.value.kind === "chips" ? new Set(n.value.selected) : /* @__PURE__ */ new Set()
    );
    function o(y) {
      if (n.value.kind !== "chips") return;
      const _ = r.value.has(y) ? n.value.selected.filter(($) => $ !== y) : [...n.value.selected, y];
      s("update", { kind: "chips", selected: _ });
    }
    const c = B(""), l = B("");
    Se(
      () => n.value,
      (y) => {
        y.kind === "range" && (c.value = y.min === null ? "" : y.min, l.value = y.max === null ? "" : y.max);
      },
      { immediate: !0, deep: !0 }
    );
    function d(y) {
      if (typeof y == "number") return Number.isFinite(y) ? y : null;
      const _ = y.trim();
      if (!_) return null;
      const $ = Number(_);
      return Number.isFinite($) ? $ : null;
    }
    function f() {
      if (n.value.kind !== "range") return;
      const y = d(c.value), _ = d(l.value);
      y === n.value.min && _ === n.value.max || s("update", { kind: "range", min: y, max: _ });
    }
    function k() {
      n.value.kind === "toggle" && s("update", { kind: "toggle", on: !n.value.on });
    }
    return (y, _) => (m(), h("div", pr, [
      v("div", vr, [
        v("span", {
          id: `dc-facet-${e.facet.key}`,
          class: "dc-facet__label"
        }, C(e.facet.label), 9, mr),
        v("span", hr, C(a.value), 1)
      ]),
      e.facet.kind === "chips" && e.value.kind === "chips" ? (m(), h("div", {
        key: 0,
        class: "dc-facet__chips",
        role: "group",
        "aria-labelledby": `dc-facet-${e.facet.key}`
      }, [
        (m(!0), h(se, null, fe(e.facet.options, ($) => (m(), h("button", {
          key: $,
          type: "button",
          class: "dc-chip",
          "aria-pressed": r.value.has($),
          "data-dc-active": r.value.has($) ? "true" : "false",
          onClick: (w) => o($)
        }, C($), 9, gr))), 128))
      ], 8, _r)) : e.facet.kind === "range" && e.value.kind === "range" ? (m(), h("div", {
        key: 1,
        class: "dc-facet__range",
        role: "group",
        "aria-labelledby": `dc-facet-${e.facet.key}`
      }, [
        an(v("input", {
          "onUpdate:modelValue": _[0] || (_[0] = ($) => c.value = $),
          class: "dc-input dc-mono",
          type: "number",
          inputmode: "numeric",
          "aria-label": `${e.facet.label} minimum`,
          placeholder: String(e.facet.min),
          onChange: f,
          onBlur: f,
          onKeydown: xt(Pe(f, ["prevent"]), ["enter"])
        }, null, 40, wr), [
          [rn, c.value]
        ]),
        _[2] || (_[2] = v("span", {
          class: "dc-facet__dash",
          "aria-hidden": "true"
        }, "–", -1)),
        an(v("input", {
          "onUpdate:modelValue": _[1] || (_[1] = ($) => l.value = $),
          class: "dc-input dc-mono",
          type: "number",
          inputmode: "numeric",
          "aria-label": `${e.facet.label} maximum`,
          placeholder: String(e.facet.max),
          onChange: f,
          onBlur: f,
          onKeydown: xt(Pe(f, ["prevent"]), ["enter"])
        }, null, 40, br), [
          [rn, l.value]
        ])
      ], 8, yr)) : e.facet.kind === "toggle" && e.value.kind === "toggle" ? (m(), h("button", {
        key: 2,
        type: "button",
        class: "dc-switch",
        role: "switch",
        "aria-checked": e.value.on,
        onClick: k
      }, [
        v("span", $r, C(e.facet.text), 1),
        v("span", {
          class: "dc-switch__track",
          "data-dc-active": e.value.on ? "true" : "false",
          "aria-hidden": "true"
        }, [..._[3] || (_[3] = [
          v("span", { class: "dc-switch__knob" }, null, -1)
        ])], 8, xr)
      ], 8, kr)) : O("", !0)
    ]));
  }
}), Ss = /* @__PURE__ */ ue(Mr, [["__scopeId", "data-v-c2efbd0c"]]), Cr = ["aria-label"], Er = ["aria-checked", "data-dc-active", "tabindex", "onClick", "onKeydown"], Sr = /* @__PURE__ */ ce({
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
      let d = null;
      if (o.key === "ArrowRight" || o.key === "ArrowDown" ? d = (c + 1) % l : o.key === "ArrowLeft" || o.key === "ArrowUp" ? d = (c - 1 + l) % l : o.key === "Home" ? d = 0 : o.key === "End" && (d = l - 1), d === null) return;
      o.preventDefault();
      const f = n.options[d];
      f && (s("update:modelValue", f.key), a.value[d]?.focus());
    }
    return (o, c) => (m(), h("div", {
      class: "dc-segmented",
      role: "radiogroup",
      "aria-label": e.label
    }, [
      (m(!0), h(se, null, fe(e.options, (l, d) => (m(), h("button", {
        key: l.key,
        ref_for: !0,
        ref_key: "buttons",
        ref: a,
        type: "button",
        role: "radio",
        class: ka(["dc-segmented__item", { "dc-segmented__item--mono": e.mono }]),
        "aria-checked": l.key === e.modelValue,
        "data-dc-active": l.key === e.modelValue ? "true" : "false",
        tabindex: l.key === e.modelValue ? 0 : -1,
        onClick: (f) => s("update:modelValue", l.key),
        onKeydown: (f) => r(f, d)
      }, C(l.label), 43, Er))), 128))
    ], 8, Cr));
  }
}), cn = /* @__PURE__ */ ue(Sr, [["__scopeId", "data-v-63fb5482"]]), Ar = ["id"], Pr = { class: "dc-panel__section" }, zr = { class: "dc-panel__head" }, Rr = { class: "dc-panel__note" }, Fr = { class: "dc-panel__query" }, Tr = { class: "dc-panel__expression" }, Lr = ["for"], Dr = ["id", "placeholder", "onKeydown"], Ir = { class: "dc-panel__actions" }, Nr = ["disabled"], Vr = {
  key: 0,
  class: "dc-panel__facets"
}, Or = {
  key: 1,
  class: "dc-panel__hint"
}, Kr = { class: "dc-panel__section dc-panel__section--row" }, qr = { class: "dc-panel__control" }, Br = { class: "dc-panel__control" }, Wr = ["title", "aria-label"], Ur = { class: "dc-panel__section" }, Hr = { class: "dc-panel__head" }, Xr = { class: "dc-panel__note" }, Gr = { class: "dc-panel__entities" }, Yr = ["data-dc-active", "aria-current"], jr = { class: "dc-entity__head" }, Qr = { class: "dc-entity__count dc-mono" }, Zr = ["data-dc-active", "aria-current", "onClick"], Jr = { class: "dc-entity__head" }, el = { class: "dc-entity__label" }, tl = { class: "dc-entity__count dc-mono" }, nl = { class: "dc-entity__preview dc-mono" }, sl = {
  key: 0,
  class: "dc-panel__section"
}, al = /* @__PURE__ */ ce({
  __name: "QueryPanel",
  props: {
    panelId: {},
    views: {}
  },
  emits: ["close"],
  setup(e, { emit: t }) {
    const n = e, s = t, a = _n(), r = $e(), o = {
      list: "List",
      cards: "Cards",
      grid: "Grid",
      table: "Table",
      links: "Links",
      preview: "Preview"
    }, c = g(
      () => (n.views ?? [...vs]).map((M) => ({ key: M, label: o[M] }))
    ), l = g(
      () => r.sorts.value.map((M) => ({ key: M.key, label: M.label }))
    ), d = B(r.query.value.expr), f = B(null);
    Se(
      () => r.query.value.expr,
      (M) => {
        d.value = M;
      }
    );
    const k = g(() => d.value !== r.query.value.expr), y = g(() => {
      const M = r.entity.value;
      return M ? `applies to ${M.label.toLowerCase()} · results stay behind this panel` : "applies to every entity · results stay behind this panel";
    });
    function _() {
      r.setExpression(d.value), s("close");
    }
    function $() {
      d.value = "", r.clearFilters();
    }
    function w(M, z) {
      r.setFacet(M, z);
    }
    return At(() => f.value?.focus()), (M, z) => (m(), h("div", {
      id: e.panelId,
      class: "dc-panel",
      role: "dialog",
      "aria-label": "Query",
      onKeydown: z[5] || (z[5] = xt(Pe((T) => s("close"), ["stop"]), ["esc"]))
    }, [
      v("section", Pr, [
        v("header", zr, [
          z[6] || (z[6] = v("span", { class: "dc-eyebrow" }, "Query", -1)),
          v("span", Rr, C(y.value), 1)
        ]),
        v("div", Fr, [
          v("div", Tr, [
            v("label", {
              class: "dc-panel__field-label",
              for: `${e.panelId}-expr`
            }, "Expression", 8, Lr),
            an(v("textarea", {
              id: `${e.panelId}-expr`,
              ref_key: "expressionField",
              ref: f,
              "onUpdate:modelValue": z[0] || (z[0] = (T) => d.value = T),
              class: "dc-textarea dc-mono",
              rows: "4",
              spellcheck: "false",
              placeholder: E(r).schema.value.placeholder,
              onKeydown: [
                xt(Pe(_, ["meta", "prevent"]), ["enter"]),
                xt(Pe(_, ["ctrl", "prevent"]), ["enter"])
              ]
            }, null, 40, Dr), [
              [rn, d.value]
            ]),
            v("div", Ir, [
              v("button", {
                type: "button",
                class: "dc-button dc-button--primary",
                onClick: _
              }, " Run query "),
              v("button", {
                type: "button",
                class: "dc-button",
                disabled: E(r).isPristine.value && !k.value,
                onClick: $
              }, " Reset ", 8, Nr)
            ])
          ]),
          E(r).entity.value ? (m(), h("div", Vr, [
            (m(!0), h(se, null, fe(E(r).entity.value.facets, (T) => (m(), be(Ss, {
              key: T.key,
              facet: T,
              value: E(r).query.value.facets[T.key],
              onUpdate: (W) => w(T.key, W)
            }, null, 8, ["facet", "value", "onUpdate"]))), 128))
          ])) : (m(), h("p", Or, " Results span every entity — logs and settings included. Pick one below to narrow to it and to get its own filters. "))
        ])
      ]),
      v("section", Kr, [
        v("div", qr, [
          z[7] || (z[7] = v("span", { class: "dc-eyebrow" }, "View", -1)),
          de(cn, {
            label: "Result view",
            "model-value": E(r).query.value.view,
            options: c.value,
            "onUpdate:modelValue": z[1] || (z[1] = (T) => E(r).setView(T))
          }, null, 8, ["model-value", "options"])
        ]),
        v("div", Br, [
          z[8] || (z[8] = v("span", { class: "dc-eyebrow" }, "Sort", -1)),
          de(cn, {
            mono: "",
            label: "Sort field",
            "model-value": E(r).query.value.sort,
            options: l.value,
            "onUpdate:modelValue": z[2] || (z[2] = (T) => E(r).setSort(T))
          }, null, 8, ["model-value", "options"]),
          v("button", {
            type: "button",
            class: "dc-button dc-button--icon dc-mono",
            title: E(r).query.value.dir === "desc" ? "Descending — click to reverse" : "Ascending — click to reverse",
            "aria-label": `Sort direction: ${E(r).query.value.dir === "desc" ? "descending" : "ascending"}`,
            onClick: z[3] || (z[3] = (T) => E(r).toggleDirection())
          }, C(E(r).query.value.dir === "desc" ? "↓" : "↑"), 9, Wr)
        ])
      ]),
      v("section", Ur, [
        v("header", Hr, [
          z[9] || (z[9] = v("span", { class: "dc-eyebrow" }, "Entities", -1)),
          v("span", Xr, C(E(r).schema.value.kicker), 1)
        ]),
        v("div", Gr, [
          v("button", {
            type: "button",
            class: "dc-entity dc-entity--all",
            "data-dc-active": E(r).isEverything.value ? "true" : "false",
            "aria-current": E(r).isEverything.value ? "true" : void 0,
            onClick: z[4] || (z[4] = (T) => E(r).clearEntity())
          }, [
            v("span", jr, [
              z[10] || (z[10] = v("span", { class: "dc-entity__label" }, "Everything", -1)),
              v("span", Qr, C(E(r).entities.value.length) + " kinds", 1)
            ]),
            z[11] || (z[11] = v("span", { class: "dc-entity__preview dc-mono" }, [
              v("span", { class: "dc-truncate" }, "no entity filter"),
              v("span", { class: "dc-truncate" }, "logs and settings included")
            ], -1))
          ], 8, Yr),
          (m(!0), h(se, null, fe(E(r).entities.value, (T) => (m(), h("button", {
            key: T.key,
            type: "button",
            class: "dc-entity",
            "data-dc-active": T.key === E(r).entity.value?.key ? "true" : "false",
            "aria-current": T.key === E(r).entity.value?.key ? "true" : void 0,
            onClick: (W) => E(r).setEntity(T.key)
          }, [
            v("span", Jr, [
              v("span", el, C(T.label), 1),
              v("span", tl, C(T.count), 1)
            ]),
            v("span", nl, [
              (m(!0), h(se, null, fe(T.samples.slice(0, 3), (W) => (m(), h("span", {
                key: W[1],
                class: "dc-truncate"
              }, C(W[1]), 1))), 128))
            ])
          ], 8, Zr))), 128))
        ])
      ]),
      a["panel-section"] ? (m(), h("section", sl, [
        tt(M.$slots, "panel-section", {}, void 0, !0)
      ])) : O("", !0)
    ], 40, Ar));
  }
}), As = /* @__PURE__ */ ue(al, [["__scopeId", "data-v-c80fd80b"]]), Ps = {
  primary: "Item",
  secondary: "Reference",
  metric1: "Metric",
  metric2: "Metric 2"
};
function rl() {
  const e = $e();
  return g(() => e.entity.value?.labels ?? Ps);
}
function zs(e, t, n, s) {
  return {
    row: e,
    entityLabel: e.entityLabel,
    labels: n,
    ordinal: Ia(t),
    metric1: Zn(e.metric1),
    metric2: Zn(e.metric2),
    date: Da(e.updatedAt),
    score: e.score.toFixed(2),
    percent: bs(e.score),
    pinned: s
  };
}
function ht() {
  const e = $e(), t = g(
    () => new Map(e.entities.value.map((n) => [n.key, n.labels]))
  );
  return g(
    () => e.rows.value.map(
      (n, s) => zs(n, s, t.value.get(n.entityKey) ?? Ps, e.isPinned(n))
    )
  );
}
const ll = ["data-dc-status"], ol = /* @__PURE__ */ ce({
  __name: "StatusPill",
  props: {
    status: {}
  },
  setup(e) {
    return (t, n) => (m(), h("span", {
      class: "dc-pill",
      "data-dc-status": e.status
    }, C(e.status), 9, ll));
  }
}), Pt = /* @__PURE__ */ ue(ol, [["__scopeId", "data-v-23e59fbf"]]), il = ["data-dc-active", "aria-pressed", "aria-label"], cl = /* @__PURE__ */ ce({
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
    }, C(e.pinned ? "★" : "☆"), 9, il));
  }
}), En = /* @__PURE__ */ ue(cl, [["__scopeId", "data-v-890e0fb5"]]), ul = { class: "dc-cards" }, dl = { class: "dc-card__top dc-mono" }, fl = {
  key: 0,
  class: "dc-card__entity"
}, pl = { class: "dc-card__top-right" }, vl = ["onClick"], ml = { class: "dc-card__primary" }, hl = { class: "dc-card__secondary dc-mono" }, _l = { class: "dc-card__metrics dc-mono" }, gl = { class: "dc-card__date" }, yl = /* @__PURE__ */ ce({
  __name: "CardsView",
  setup(e) {
    const t = $e(), n = ht(), s = g(() => t.isEverything.value);
    return (a, r) => (m(), h("div", ul, [
      (m(!0), h(se, null, fe(E(n), (o) => (m(), h("div", {
        key: o.row.id,
        class: "dc-card"
      }, [
        v("div", dl, [
          v("span", null, [
            kt(C(o.ordinal) + " ", 1),
            s.value ? (m(), h("span", fl, C(o.entityLabel), 1)) : O("", !0)
          ]),
          v("span", pl, [
            de(Pt, {
              status: o.row.status
            }, null, 8, ["status"]),
            E(t).pinnable.value ? (m(), be(En, {
              key: 0,
              row: o.row,
              pinned: o.pinned
            }, null, 8, ["row", "pinned"])) : O("", !0)
          ])
        ]),
        v("button", {
          type: "button",
          class: "dc-card__open",
          onClick: (c) => E(t).activate(o.row)
        }, [
          v("span", ml, C(o.row.primary), 1),
          v("span", hl, C(o.row.secondary), 1)
        ], 8, vl),
        v("div", _l, [
          v("span", null, C(o.labels.metric1) + " " + C(o.metric1), 1),
          v("span", null, C(o.labels.metric2) + " " + C(o.metric2), 1),
          v("span", gl, C(o.date), 1)
        ])
      ]))), 128))
    ]));
  }
}), Rs = /* @__PURE__ */ ue(yl, [["__scopeId", "data-v-47fffd2f"]]), wl = { class: "dc-grid" }, bl = ["onClick"], kl = { class: "dc-tile__scrim" }, $l = { class: "dc-tile__top dc-mono" }, xl = { class: "dc-tile__chip" }, Ml = { class: "dc-tile__chip" }, Cl = { class: "dc-tile__caption" }, El = { class: "dc-tile__secondary dc-truncate" }, Sl = { class: "dc-tile__primary" }, Al = /* @__PURE__ */ ce({
  __name: "GridView",
  setup(e) {
    const t = $e(), n = ht();
    return (s, a) => (m(), h("div", wl, [
      (m(!0), h(se, null, fe(E(n), (r) => (m(), h("button", {
        key: r.row.id,
        type: "button",
        class: "dc-tile",
        style: Te({ "--dc-tile-tint": r.row.tint }),
        onClick: (o) => E(t).activate(r.row)
      }, [
        v("span", kl, [
          v("span", $l, [
            v("span", xl, C(r.ordinal), 1),
            v("span", Ml, C(r.score), 1)
          ]),
          v("span", Cl, [
            v("span", El, C(r.row.secondary), 1),
            v("span", Sl, C(r.row.primary), 1)
          ])
        ])
      ], 12, bl))), 128))
    ]));
  }
}), Fs = /* @__PURE__ */ ue(Al, [["__scopeId", "data-v-c39dab2f"]]), Pl = { class: "dc-links" }, zl = ["onClick"], Rl = { class: "dc-link__primary dc-truncate" }, Fl = { class: "dc-link__secondary dc-mono dc-truncate" }, Tl = /* @__PURE__ */ ce({
  __name: "LinksView",
  setup(e) {
    const t = $e(), n = ht();
    return (s, a) => (m(), h("div", Pl, [
      (m(!0), h(se, null, fe(E(n), (r) => (m(), h("button", {
        key: r.row.id,
        type: "button",
        class: "dc-link",
        onClick: (o) => E(t).activate(r.row)
      }, [
        v("span", Rl, C(r.row.primary), 1),
        v("span", Fl, C(r.row.secondary), 1)
      ], 8, zl))), 128))
    ]));
  }
}), Ts = /* @__PURE__ */ ue(Tl, [["__scopeId", "data-v-e21922c7"]]), Ll = ["aria-valuenow", "aria-label", "title"], Dl = /* @__PURE__ */ ce({
  __name: "ScoreMeter",
  props: {
    value: {},
    label: {}
  },
  setup(e) {
    const t = e, n = g(() => bs(t.value));
    return (s, a) => (m(), h("span", {
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
    ], 8, Ll));
  }
}), Ls = /* @__PURE__ */ ue(Dl, [["__scopeId", "data-v-ab794776"]]), Il = {
  class: "dc-list",
  role: "list"
}, Nl = ["onClick"], Vl = { class: "dc-list__ordinal dc-mono" }, Ol = { class: "dc-list__identity" }, Kl = { class: "dc-list__primary dc-truncate" }, ql = { class: "dc-list__secondary dc-mono dc-truncate" }, Bl = {
  key: 0,
  class: "dc-list__entity dc-mono"
}, Wl = { class: "dc-list__metrics dc-mono" }, Ul = ["title"], Hl = ["title"], Xl = { class: "dc-list__trailing" }, Gl = /* @__PURE__ */ ce({
  __name: "ListView",
  setup(e) {
    const t = $e(), n = ht(), s = g(() => t.isEverything.value);
    return (a, r) => (m(), h("div", Il, [
      (m(!0), h(se, null, fe(E(n), (o) => (m(), h("div", {
        key: o.row.id,
        class: "dc-list__row",
        role: "listitem"
      }, [
        v("button", {
          type: "button",
          class: "dc-list__open",
          onClick: (c) => E(t).activate(o.row)
        }, [
          v("span", Vl, C(o.ordinal), 1),
          v("span", Ol, [
            v("span", Kl, C(o.row.primary), 1),
            v("span", ql, C(o.row.secondary), 1)
          ]),
          s.value ? (m(), h("span", Bl, C(o.entityLabel), 1)) : O("", !0),
          v("span", Wl, [
            v("span", {
              title: o.labels.metric1
            }, C(o.metric1), 9, Ul),
            v("span", {
              title: o.labels.metric2
            }, C(o.metric2), 9, Hl),
            de(Ls, {
              value: o.row.score
            }, null, 8, ["value"])
          ])
        ], 8, Nl),
        v("span", Xl, [
          de(Pt, {
            status: o.row.status
          }, null, 8, ["status"]),
          E(t).pinnable.value ? (m(), be(En, {
            key: 0,
            row: o.row,
            pinned: o.pinned
          }, null, 8, ["row", "pinned"])) : O("", !0)
        ])
      ]))), 128))
    ]));
  }
}), un = /* @__PURE__ */ ue(Gl, [["__scopeId", "data-v-922176e3"]]), Yl = { class: "dc-preview" }, jl = { class: "dc-preview__pager dc-mono" }, Ql = ["disabled"], Zl = { "aria-live": "polite" }, Jl = ["disabled"], eo = {
  key: 0,
  class: "dc-preview__card"
}, to = { class: "dc-preview__body" }, no = { class: "dc-preview__top" }, so = { class: "dc-preview__badges" }, ao = { class: "dc-preview__entity dc-mono" }, ro = { class: "dc-preview__primary" }, lo = { class: "dc-preview__secondary dc-mono" }, oo = { class: "dc-preview__fields" }, io = { class: "dc-preview__key" }, co = { class: "dc-preview__value dc-mono" }, uo = /* @__PURE__ */ ce({
  __name: "PreviewView",
  setup(e) {
    const t = $e(), n = ht(), s = B(0);
    Se(n, (l) => {
      s.value > l.length - 1 && (s.value = Math.max(0, l.length - 1));
    });
    const a = g(() => n.value[s.value]), r = g(() => {
      const l = a.value;
      return l ? [
        { key: l.labels.secondary, value: l.row.secondary },
        { key: l.labels.metric1, value: l.metric1 },
        { key: l.labels.metric2, value: l.metric2 },
        { key: "Updated", value: l.date }
      ] : [];
    }), o = g(() => {
      if (!n.value.length) return "0 / 0";
      const l = t.total.value > n.value.length ? ` of ${t.total.value}` : "";
      return `${s.value + 1} / ${n.value.length}${l}`;
    }), c = (l) => {
      const d = n.value.length;
      d && (s.value = Math.min(d - 1, Math.max(0, s.value + l)));
    };
    return (l, d) => (m(), h("div", Yl, [
      v("div", jl, [
        v("button", {
          type: "button",
          class: "dc-preview__step",
          "aria-label": "Previous result",
          disabled: s.value === 0,
          onClick: d[0] || (d[0] = (f) => c(-1))
        }, " ‹ ", 8, Ql),
        v("span", Zl, C(o.value), 1),
        v("button", {
          type: "button",
          class: "dc-preview__step",
          "aria-label": "Next result",
          disabled: s.value >= E(n).length - 1,
          onClick: d[1] || (d[1] = (f) => c(1))
        }, " › ", 8, Jl)
      ]),
      a.value ? (m(), h("div", eo, [
        v("div", {
          class: "dc-preview__media",
          style: Te({ background: a.value.row.tint }),
          "aria-hidden": "true"
        }, " preview ", 4),
        v("div", to, [
          v("div", no, [
            v("span", so, [
              de(Pt, {
                status: a.value.row.status
              }, null, 8, ["status"]),
              v("span", ao, C(a.value.entityLabel), 1)
            ]),
            E(t).pinnable.value ? (m(), be(En, {
              key: 0,
              row: a.value.row,
              pinned: a.value.pinned
            }, null, 8, ["row", "pinned"])) : O("", !0)
          ]),
          v("div", null, [
            v("div", ro, C(a.value.row.primary), 1),
            v("div", lo, C(a.value.row.secondary), 1)
          ]),
          v("dl", oo, [
            (m(!0), h(se, null, fe(r.value, (f) => (m(), h("div", {
              key: f.key,
              class: "dc-preview__field"
            }, [
              v("dt", io, C(f.key), 1),
              v("dd", co, C(f.value), 1)
            ]))), 128))
          ]),
          v("button", {
            type: "button",
            class: "dc-preview__open",
            onClick: d[2] || (d[2] = (f) => E(t).activate(a.value.row))
          }, " Open record → ")
        ])
      ])) : O("", !0)
    ]));
  }
}), Ds = /* @__PURE__ */ ue(uo, [["__scopeId", "data-v-35517a68"]]), fo = { class: "dc-table" }, po = ["aria-sort"], vo = { scope: "col" }, mo = {
  key: 0,
  class: "dc-table__entity",
  scope: "col"
}, ho = ["aria-sort"], _o = ["aria-sort"], go = ["aria-sort"], yo = ["onClick"], wo = { class: "dc-table__num dc-mono" }, bo = { class: "dc-table__primary" }, ko = ["onClick"], $o = { class: "dc-table__muted dc-mono" }, xo = {
  key: 0,
  class: "dc-table__entity dc-mono"
}, Mo = { class: "dc-table__number dc-mono" }, Co = { class: "dc-table__number dc-mono" }, Eo = { class: "dc-table__muted dc-mono" }, So = /* @__PURE__ */ ce({
  __name: "TableView",
  setup(e) {
    const t = $e(), n = ht(), s = rl(), a = g(() => t.isEverything.value);
    function r(l) {
      t.query.value.sort === l ? t.toggleDirection() : t.setSort(l);
    }
    const o = (l) => t.query.value.sort !== l ? "none" : t.query.value.dir === "desc" ? "descending" : "ascending", c = g(() => new Set(t.sorts.value.map((l) => l.key)));
    return (l, d) => (m(), h("table", fo, [
      v("thead", null, [
        v("tr", null, [
          d[4] || (d[4] = v("th", {
            class: "dc-table__num",
            scope: "col"
          }, " # ", -1)),
          v("th", {
            scope: "col",
            "aria-sort": o("name")
          }, [
            c.value.has("name") ? (m(), h("button", {
              key: 0,
              type: "button",
              class: "dc-table__sort",
              onClick: d[0] || (d[0] = (f) => r("name"))
            }, C(E(s).primary), 1)) : (m(), h(se, { key: 1 }, [
              kt(C(E(s).primary), 1)
            ], 64))
          ], 8, po),
          v("th", vo, C(E(s).secondary), 1),
          a.value ? (m(), h("th", mo, " Entity ")) : O("", !0),
          v("th", {
            class: "dc-table__number",
            scope: "col",
            "aria-sort": o("metric1")
          }, [
            c.value.has("metric1") ? (m(), h("button", {
              key: 0,
              type: "button",
              class: "dc-table__sort",
              onClick: d[1] || (d[1] = (f) => r("metric1"))
            }, C(E(s).metric1), 1)) : (m(), h(se, { key: 1 }, [
              kt(C(E(s).metric1), 1)
            ], 64))
          ], 8, ho),
          v("th", {
            class: "dc-table__number",
            scope: "col",
            "aria-sort": o("metric2")
          }, [
            c.value.has("metric2") ? (m(), h("button", {
              key: 0,
              type: "button",
              class: "dc-table__sort",
              onClick: d[2] || (d[2] = (f) => r("metric2"))
            }, C(E(s).metric2), 1)) : (m(), h(se, { key: 1 }, [
              kt(C(E(s).metric2), 1)
            ], 64))
          ], 8, _o),
          v("th", {
            class: "dc-table__date",
            scope: "col",
            "aria-sort": o("updated")
          }, [
            c.value.has("updated") ? (m(), h("button", {
              key: 0,
              type: "button",
              class: "dc-table__sort",
              onClick: d[3] || (d[3] = (f) => r("updated"))
            }, " Updated ")) : (m(), h(se, { key: 1 }, [
              kt(" Updated ")
            ], 64))
          ], 8, go),
          d[5] || (d[5] = v("th", {
            class: "dc-table__state",
            scope: "col"
          }, " State ", -1))
        ])
      ]),
      v("tbody", null, [
        (m(!0), h(se, null, fe(E(n), (f) => (m(), h("tr", {
          key: f.row.id,
          class: "dc-table__row",
          onClick: (k) => E(t).activate(f.row)
        }, [
          v("td", wo, C(f.ordinal), 1),
          v("td", bo, [
            v("button", {
              type: "button",
              class: "dc-table__open",
              onClick: Pe((k) => E(t).activate(f.row), ["stop"])
            }, C(f.row.primary), 9, ko)
          ]),
          v("td", $o, C(f.row.secondary), 1),
          a.value ? (m(), h("td", xo, C(f.entityLabel), 1)) : O("", !0),
          v("td", Mo, C(f.metric1), 1),
          v("td", Co, C(f.metric2), 1),
          v("td", Eo, C(f.date), 1),
          v("td", null, [
            de(Pt, {
              status: f.row.status
            }, null, 8, ["status"])
          ])
        ], 8, yo))), 128))
      ])
    ]));
  }
}), Is = /* @__PURE__ */ ue(So, [["__scopeId", "data-v-b72dd50e"]]);
function Ao(e) {
  const t = Bt([]), n = B(!1), s = Bt(null);
  let a = 0;
  const r = (l, d, f) => ({
    entity: l,
    rows: d.rows.map(
      (k, y) => zs(k, y, l.labels, e.isPinned(k.id))
    ),
    total: d.total,
    count: f ? l.count : String(d.total)
  }), o = () => {
    const l = ++a, d = e.query.value, f = e.schema.value, k = e.entities.value, y = e.limit.value, _ = yn(d), $ = k.map((w) => ({
      entity: w,
      // Scope the query to this entity, keeping the expression and ordering
      // but dropping facets, which belong to whichever entity is selected.
      outcome: e.source.value.query({
        query: { ...d, entity: w.key, facets: Xt(w) },
        schema: f,
        entity: w,
        limit: y
      })
    }));
    if ($.every(({ outcome: w }) => !(w instanceof Promise))) {
      t.value = $.map(
        ({ entity: w, outcome: M }) => r(w, M, _)
      ), s.value = null, n.value = !1;
      return;
    }
    n.value = !0, Promise.all($.map(({ outcome: w }) => Promise.resolve(w))).then((w) => {
      l === a && (t.value = w.map(
        (M, z) => r($[z].entity, M, _)
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
  return Se(
    [e.source, e.schema, e.query, e.entities, e.limit],
    c,
    { immediate: !0 }
  ), { previews: t, pending: n, error: s, refresh: c };
}
const Po = {
  key: 0,
  class: "dc-types__state",
  role: "alert"
}, zo = {
  key: 1,
  class: "dc-types__state",
  "aria-live": "polite"
}, Ro = ["data-dc-pending"], Fo = ["data-dc-empty"], To = ["onClick"], Lo = { class: "dc-type__name" }, Do = { class: "dc-type__count dc-mono" }, Io = { class: "dc-type__sr" }, No = {
  key: 0,
  class: "dc-type__empty"
}, Vo = ["onClick"], Oo = { class: "dc-type__identity" }, Ko = { class: "dc-type__primary dc-truncate" }, qo = { class: "dc-type__secondary dc-mono dc-truncate" }, Bo = { class: "dc-type__trailing dc-mono" }, Wo = { class: "dc-type__metric" }, Uo = { class: "dc-type__metric-value" }, Ho = { class: "dc-type__metric-label" }, Xo = { class: "dc-type__date" }, Go = /* @__PURE__ */ ce({
  __name: "TypeCardsView",
  setup(e) {
    const t = $e(), { previews: n, pending: s, error: a } = Ao({
      source: t.source,
      schema: t.schema,
      query: t.query,
      entities: t.entities,
      limit: t.previewsPerType,
      isPinned: (o) => t.isPinnedId(o)
    }), r = g(() => !t.isPristine.value);
    return (o, c) => E(a) ? (m(), h("p", Po, " Could not load results: " + C(E(a) instanceof Error ? E(a).message : "the data source failed."), 1)) : !E(n).length && E(s) ? (m(), h("p", zo, " Running query… ")) : (m(), h("div", {
      key: 2,
      class: "dc-types",
      "data-dc-pending": E(s) ? "true" : "false"
    }, [
      (m(!0), h(se, null, fe(E(n), (l) => (m(), h("section", {
        key: l.entity.key,
        class: "dc-type",
        "data-dc-empty": l.rows.length ? "false" : "true"
      }, [
        v("button", {
          type: "button",
          class: "dc-type__head",
          onClick: (d) => E(t).setEntity(l.entity.key)
        }, [
          v("span", Lo, C(l.entity.label), 1),
          v("span", Do, C(l.count), 1),
          c[0] || (c[0] = v("span", {
            class: "dc-type__go",
            "aria-hidden": "true"
          }, "→", -1)),
          v("span", Io, "Show only " + C(l.entity.label.toLowerCase()), 1)
        ], 8, To),
        l.rows.length ? O("", !0) : (m(), h("p", No, C(r.value ? "No matches" : "Nothing here yet"), 1)),
        (m(!0), h(se, null, fe(l.rows, (d) => (m(), h("button", {
          key: d.row.id,
          type: "button",
          class: "dc-type__row",
          onClick: (f) => E(t).activate(d.row)
        }, [
          v("span", Oo, [
            v("span", Ko, C(d.row.primary), 1),
            v("span", qo, C(d.row.secondary), 1)
          ]),
          v("span", Bo, [
            v("span", Wo, [
              v("span", Uo, C(d.metric1), 1),
              v("span", Ho, C(d.labels.metric1), 1)
            ]),
            v("span", Xo, C(d.date), 1)
          ])
        ], 8, Vo))), 128))
      ], 8, Fo))), 128))
    ], 8, Ro));
  }
}), Ns = /* @__PURE__ */ ue(Go, [["__scopeId", "data-v-887d72ab"]]), Yo = ["data-dc-pending"], jo = {
  key: 0,
  class: "dc-results__state",
  role: "alert"
}, Qo = { class: "dc-results__detail" }, Zo = {
  key: 2,
  class: "dc-results__state",
  "aria-live": "polite"
}, Jo = {
  key: 3,
  class: "dc-results__state"
}, ei = { class: "dc-results__detail" }, ti = /* @__PURE__ */ ce({
  __name: "ResultsArea",
  setup(e) {
    const t = $e(), n = {
      list: un,
      cards: Rs,
      grid: Fs,
      table: Is,
      links: Ts,
      preview: Ds
    }, s = g(
      () => t.isEverything.value && t.query.value.view === "cards"
    ), a = g(() => n[t.query.value.view] ?? un), r = g(() => t.rows.value.length > 0), o = g(() => t.error.value !== null);
    return (c, l) => (m(), h("div", {
      class: "dc-results",
      "data-dc-pending": E(t).pending.value ? "true" : "false"
    }, [
      o.value ? (m(), h("p", jo, [
        l[1] || (l[1] = v("span", { class: "dc-results__headline" }, "Could not load results", -1)),
        v("span", Qo, C(E(t).error.value instanceof Error ? E(t).error.value.message : "The data source failed."), 1)
      ])) : s.value ? (m(), be(Ns, { key: 1 })) : !r.value && E(t).pending.value ? (m(), h("p", Zo, [...l[2] || (l[2] = [
        v("span", { class: "dc-results__detail" }, "Running query…", -1)
      ])])) : r.value ? (m(), be($a(a.value), { key: 4 })) : (m(), h("div", Jo, [
        l[3] || (l[3] = v("span", { class: "dc-results__headline" }, "Nothing matches this query", -1)),
        v("span", ei, C(E(t).summary.value), 1),
        E(t).isPristine.value ? O("", !0) : (m(), h("button", {
          key: 0,
          type: "button",
          class: "dc-results__clear",
          onClick: l[0] || (l[0] = (d) => E(t).clearFilters())
        }, C(E(t).isEverything.value ? "Clear filters" : "Search everything instead"), 1))
      ]))
    ], 8, Yo));
  }
}), Vs = /* @__PURE__ */ ue(ti, [["__scopeId", "data-v-85cfe37a"]]), ni = ["data-dc-theme"], si = { class: "dc-shell__head" }, ai = { class: "dc-shell__panel" }, ri = /* @__PURE__ */ ce({
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
    const s = e, a = n, r = Wt(e, "open"), o = Wt(e, "pinned"), c = _n(), l = vt(ps, null), d = s.route || l ? null : Sa(), f = s.route ?? l ?? d;
    je(() => d?.dispose?.());
    const k = g(() => Ba({ seed: s.schema.key })), y = g(() => s.source ?? k.value), _ = Ja({
      schema: () => s.schema,
      adapter: f,
      defaults: () => s.defaults,
      navigationMode: () => s.navigationMode,
      facetNavigationMode: () => s.facetNavigationMode
    }), $ = er({
      source: y,
      query: _.query,
      schema: g(() => s.schema),
      entity: _.entity,
      limit: g(() => s.limit)
    });
    Se(_.query, (R) => a("query-change", R));
    const w = ds() ?? "dc-query-panel", M = B(null);
    function z() {
      r.value && (r.value = !1, At(() => {
        M.value?.$el?.querySelector(".dc-header__trigger")?.focus();
      }));
    }
    const T = g(() => new Set(o.value));
    function W(R) {
      const x = new Set(T.value);
      x.has(R.id) ? x.delete(R.id) : x.add(R.id), o.value = [...x], a("toggle-pin", R);
    }
    const N = Wa({
      ..._,
      schema: g(() => s.schema),
      entities: g(() => s.schema.entities),
      rows: $.rows,
      total: $.total,
      pending: $.pending,
      error: $.error,
      source: y,
      previewsPerType: g(() => s.previewsPerType),
      pinnable: g(() => s.pinnable === !0),
      isPinned: (R) => T.value.has(R.id),
      isPinnedId: (R) => T.value.has(R),
      togglePin: W,
      activate: (R) => a("activate", R)
    }), I = g(() => {
      if (!(!s.accent && !s.tokens))
        return { ...s.tokens, ...s.accent ? { "--dc-accent": s.accent } : {} };
    });
    return t({
      query: _.query,
      openPanel: () => {
        r.value = !0;
      },
      closePanel: z
    }), (R, x) => (m(), h("div", {
      class: "dc-shell",
      "data-dc-theme": e.theme,
      style: Te(I.value)
    }, [
      v("div", si, [
        de(Es, {
          ref_key: "headerRef",
          ref: M,
          expanded: r.value,
          "panel-id": E(w),
          onToggle: x[0] || (x[0] = (A) => r.value = !r.value)
        }, Yn({ _: 2 }, [
          c.actions ? {
            name: "actions",
            fn: Ut(() => [
              tt(R.$slots, "actions", {}, void 0, !0)
            ]),
            key: "0"
          } : void 0
        ]), 1032, ["expanded", "panel-id"]),
        r.value ? (m(), h(se, { key: 0 }, [
          v("div", {
            class: "dc-shell__scrim",
            onClick: z
          }),
          v("div", ai, [
            de(As, {
              "panel-id": E(w),
              views: e.views,
              onClose: z
            }, Yn({ _: 2 }, [
              c["panel-section"] ? {
                name: "panel-section",
                fn: Ut(() => [
                  tt(R.$slots, "panel-section", {}, void 0, !0)
                ]),
                key: "0"
              } : void 0
            ]), 1032, ["panel-id", "views"])
          ])
        ], 64)) : O("", !0)
      ]),
      tt(R.$slots, "results", {
        rows: E(N).rows.value,
        total: E(N).total.value,
        query: E(N).query.value,
        pending: E(N).pending.value
      }, () => [
        de(Vs)
      ], !0)
    ], 12, ni));
  }
}), li = /* @__PURE__ */ ue(ri, [["__scopeId", "data-v-5738ca29"]]), Mt = (e) => e.separator !== !0 && e.heading !== !0 && e.disabled !== !0, oi = ["aria-label"], ii = ["role", "aria-label"], ci = ["data-dc-item"], ui = {
  key: 0,
  class: "dc-menu__rule",
  role: "separator"
}, di = ["role", "aria-checked", "aria-haspopup", "aria-expanded", "aria-disabled", "disabled", "data-dc-item", "onClick", "onMouseenter"], fi = {
  class: "dc-menu__mark",
  "aria-hidden": "true"
}, pi = { class: "dc-menu__label dc-truncate" }, vi = {
  key: 0,
  class: "dc-menu__key dc-mono"
}, mi = {
  key: 1,
  class: "dc-menu__more",
  "aria-hidden": "true"
}, hi = /* @__PURE__ */ ce({
  __name: "MenuList",
  props: {
    items: {},
    at: {},
    label: {},
    autofocus: { type: Boolean }
  },
  emits: ["choose", "dismiss"],
  setup(e, { expose: t, emit: n }) {
    const s = e, a = n, r = B(null), o = B([]), c = B(null), l = B(null), d = B(null), f = B(!1), k = g(
      () => s.items.flatMap((x, A) => Mt(x) ? [A] : [])
    ), y = g(() => {
      const x = [{ entries: [] }];
      return s.items.forEach((A, Z) => {
        A.heading ? x.push({ heading: A, entries: [] }) : x[x.length - 1]?.entries.push({ item: A, index: Z });
      }), x.filter((A) => A.entries.length > 0);
    }), _ = B({ x: s.at.x, y: s.at.y });
    async function $() {
      _.value = { x: s.at.x, y: s.at.y }, await At();
      const x = r.value?.getBoundingClientRect();
      if (!x) return;
      const A = 8;
      let Z = s.at.x, le = s.at.y;
      if (Z + x.width > window.innerWidth - A) {
        const pe = s.at.mirrorX === void 0 ? null : s.at.mirrorX - x.width;
        Z = pe !== null && pe >= A ? pe : window.innerWidth - x.width - A;
      }
      le + x.height > window.innerHeight - A && (le = window.innerHeight - x.height - A), _.value = { x: Math.max(A, Z), y: Math.max(A, le) };
    }
    const w = g(() => ({ left: `${_.value.x}px`, top: `${_.value.y}px` }));
    function M(x) {
      c.value = x, x !== null && At(() => o.value[x]?.focus());
    }
    function z(x, A) {
      const Z = k.value;
      if (Z.length === 0) return null;
      if (x === null) return A === 1 ? Z[0] ?? null : Z[Z.length - 1] ?? null;
      const le = Z.indexOf(x);
      return le === -1 ? Z[0] ?? null : Z[(le + A + Z.length) % Z.length] ?? null;
    }
    function T(x, A) {
      if (!s.items[x]?.items?.length) return;
      const le = o.value[x]?.getBoundingClientRect(), pe = r.value?.getBoundingClientRect();
      !le || !pe || (d.value = { x: pe.right - 4, y: le.top - 4, mirrorX: pe.left + 4 }, l.value = x, f.value = A);
    }
    function W(x) {
      const A = l.value;
      l.value = null, d.value = null, x && A !== null && M(A);
    }
    function N(x) {
      const A = s.items[x];
      if (!(!A || !Mt(A))) {
        if (A.items?.length) {
          T(x, !0);
          return;
        }
        a("choose", A);
      }
    }
    function I(x) {
      const A = x.key;
      if (A === "Escape") {
        x.preventDefault(), x.stopPropagation(), l.value !== null ? W(!0) : a("dismiss");
        return;
      }
      if (A === "ArrowDown" || A === "ArrowUp") {
        x.preventDefault(), x.stopPropagation(), W(!1), M(z(c.value, A === "ArrowDown" ? 1 : -1));
        return;
      }
      if (A === "Home" || A === "End") {
        x.preventDefault(), x.stopPropagation(), W(!1), M(z(null, A === "Home" ? 1 : -1));
        return;
      }
      if (A === "ArrowRight") {
        const Z = c.value;
        Z !== null && s.items[Z]?.items?.length && (x.preventDefault(), x.stopPropagation(), T(Z, !0));
        return;
      }
      if (A === "ArrowLeft") {
        l.value !== null && (x.preventDefault(), x.stopPropagation(), W(!0));
        return;
      }
      if (A === "Enter" || A === " ") {
        const Z = c.value;
        if (Z === null) return;
        x.preventDefault(), x.stopPropagation(), N(Z);
      }
    }
    function R(x) {
      const A = s.items[x];
      !A || !Mt(A) || (l.value !== null && l.value !== x && W(!1), M(x), A.items?.length && T(x, !1));
    }
    return xa(() => {
      $(), s.autofocus && M(z(null, 1));
    }), Se(() => s.at, $, { deep: !0 }), Se(() => s.items, () => void $(), { deep: !0 }), je(() => {
      l.value = null;
    }), t({ root: r }), (x, A) => {
      const Z = fs("MenuList", !0);
      return m(), h("div", {
        ref_key: "root",
        ref: r,
        class: "dc-menu",
        role: "menu",
        "aria-label": e.label,
        style: Te(w.value),
        onKeydown: I
      }, [
        (m(!0), h(se, null, fe(y.value, (le, pe) => (m(), h("div", {
          key: `${pe}-${le.heading?.label ?? ""}`,
          class: "dc-menu__group",
          role: le.heading ? "group" : "none",
          "aria-label": le.heading?.label
        }, [
          le.heading ? (m(), h("div", {
            key: 0,
            class: "dc-menu__heading dc-truncate",
            "aria-hidden": "true",
            "data-dc-item": le.heading.id
          }, C(le.heading.label), 9, ci)) : O("", !0),
          (m(!0), h(se, null, fe(le.entries, ({ item: j, index: xe }) => (m(), h(se, {
            key: j.id ?? `${xe}-${j.label ?? ""}`
          }, [
            j.separator ? (m(), h("div", ui)) : (m(), h("button", {
              key: 1,
              ref_for: !0,
              ref: (Ae) => {
                Ae && (o.value[xe] = Ae);
              },
              type: "button",
              class: "dc-menu__item",
              role: j.checked === void 0 ? "menuitem" : "menuitemcheckbox",
              "aria-checked": j.checked === void 0 ? void 0 : j.checked,
              "aria-haspopup": j.items?.length ? "menu" : void 0,
              "aria-expanded": j.items?.length ? l.value === xe : void 0,
              "aria-disabled": j.disabled ? "true" : void 0,
              disabled: j.disabled,
              "data-dc-item": j.id,
              tabindex: "-1",
              onClick: (Ae) => N(xe),
              onMouseenter: (Ae) => R(xe)
            }, [
              v("span", fi, C(j.checked ? "✓" : ""), 1),
              v("span", pi, C(j.label), 1),
              j.shortcut ? (m(), h("span", vi, C(j.shortcut), 1)) : j.items?.length ? (m(), h("span", mi, "›")) : O("", !0)
            ], 40, di))
          ], 64))), 128))
        ], 8, ii))), 128)),
        l.value !== null && d.value ? (m(), be(Z, {
          key: l.value,
          items: e.items[l.value]?.items ?? [],
          at: d.value,
          label: e.items[l.value]?.label,
          autofocus: f.value,
          onChoose: A[0] || (A[0] = (le) => a("choose", le)),
          onDismiss: A[1] || (A[1] = (le) => W(!0))
        }, null, 8, ["items", "at", "label", "autofocus"])) : O("", !0)
      ], 44, oi);
    };
  }
}), Os = /* @__PURE__ */ ue(hi, [["__scopeId", "data-v-9b1413fa"]]), _i = ["data-dc-theme", "aria-label"], gi = ["aria-expanded", "aria-disabled", "disabled", "data-dc-menu", "tabindex", "onClick", "onMouseenter"], yi = /* @__PURE__ */ ce({
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
    }), a = t, r = B(null), o = B([]), c = B(null), l = B(null), d = B(!1), f = g(
      () => n.menus.flatMap((N, I) => Mt(N) ? [I] : [])
    );
    function k(N, I) {
      const R = o.value[N]?.getBoundingClientRect(), x = n.menus[N];
      !R || !x || !Mt(x) || (l.value = { x: R.left, y: R.bottom + 2, mirrorX: R.right }, c.value = N, d.value = I);
    }
    function y(N) {
      const I = c.value;
      c.value = null, l.value = null, N && I !== null && o.value[I]?.focus();
    }
    function _(N) {
      c.value === N ? y(!0) : k(N, !1);
    }
    function $(N) {
      c.value === null || c.value === N || k(N, !1);
    }
    function w(N, I) {
      const R = f.value;
      if (R.length === 0) return null;
      if (N === null) return I === 1 ? R[0] ?? null : R[R.length - 1] ?? null;
      const x = R.indexOf(N);
      return x === -1 ? R[0] ?? null : R[(x + I + R.length) % R.length] ?? null;
    }
    function M(N) {
      const I = N.key;
      if (I === "Escape") {
        if (c.value === null) return;
        N.preventDefault(), y(!0);
        return;
      }
      if (I === "ArrowDown" && c.value === null) {
        const A = z();
        if (A === null) return;
        N.preventDefault(), k(A, !0);
        return;
      }
      if (I !== "ArrowLeft" && I !== "ArrowRight") return;
      const R = c.value ?? z(), x = w(R, I === "ArrowRight" ? 1 : -1);
      x !== null && (N.preventDefault(), c.value !== null ? k(x, !0) : o.value[x]?.focus());
    }
    function z() {
      const N = o.value.findIndex((I) => I === document.activeElement);
      return N === -1 ? f.value[0] ?? null : N;
    }
    function T(N) {
      const I = N.target;
      !I || r.value?.contains(I) || y(!1);
    }
    Se(c, (N) => {
      N !== null ? window.addEventListener("pointerdown", T, !0) : window.removeEventListener("pointerdown", T, !0);
    }), je(() => window.removeEventListener("pointerdown", T, !0));
    function W(N) {
      y(!0), N.action?.(), a("choose", N);
    }
    return (N, I) => (m(), h("div", {
      ref_key: "bar",
      ref: r,
      class: "dc-shell dc-menubar",
      role: "menubar",
      "data-dc-theme": e.theme,
      "aria-label": e.label ?? "Main menu",
      style: Te(s.value),
      onKeydown: M
    }, [
      (m(!0), h(se, null, fe(e.menus, (R, x) => (m(), h("button", {
        key: R.id ?? R.label ?? x,
        ref_for: !0,
        ref: (A) => {
          A && (o.value[x] = A);
        },
        type: "button",
        class: "dc-menubar__item",
        role: "menuitem",
        "aria-haspopup": "menu",
        "aria-expanded": c.value === x,
        "aria-disabled": R.disabled ? "true" : void 0,
        disabled: R.disabled,
        "data-dc-menu": R.id ?? R.label,
        tabindex: x === (f.value[0] ?? 0) ? 0 : -1,
        onClick: (A) => _(x),
        onMouseenter: (A) => $(x)
      }, C(R.label), 41, gi))), 128)),
      c.value !== null && l.value ? (m(), be(Os, {
        key: c.value,
        items: e.menus[c.value]?.items ?? [],
        at: l.value,
        label: e.menus[c.value]?.label,
        autofocus: d.value,
        onChoose: W,
        onDismiss: I[0] || (I[0] = (R) => y(!0))
      }, null, 8, ["items", "at", "label", "autofocus"])) : O("", !0)
    ], 44, _i));
  }
}), Hc = /* @__PURE__ */ ue(yi, [["__scopeId", "data-v-93dbd2e4"]]), wi = ["aria-label", "aria-expanded", "disabled"], bi = { "aria-hidden": "true" }, ki = /* @__PURE__ */ ce({
  __name: "MenuButton",
  props: {
    items: {},
    label: {},
    glyph: { default: "⋯" }
  },
  emits: ["choose"],
  setup(e, { emit: t }) {
    const n = t, s = B(null), a = B(null), r = B(null), o = B(!1), c = g(() => r.value !== null);
    function l($) {
      const w = s.value?.getBoundingClientRect();
      w && (r.value = { x: w.left, y: w.bottom + 4, mirrorX: w.right }, o.value = $);
    }
    function d($) {
      r.value = null, $ && s.value?.focus();
    }
    function f() {
      c.value ? d(!0) : l(!1);
    }
    function k($) {
      $.key !== "ArrowDown" || c.value || ($.preventDefault(), l(!0));
    }
    function y($) {
      const w = $.target;
      w && (s.value?.contains(w) || a.value?.root?.contains(w) || d(!1));
    }
    Se(c, ($) => {
      $ ? window.addEventListener("pointerdown", y, !0) : window.removeEventListener("pointerdown", y, !0);
    }), je(() => window.removeEventListener("pointerdown", y, !0));
    function _($) {
      d(!0), $.action?.(), n("choose", $);
    }
    return ($, w) => (m(), h(se, null, [
      v("button", {
        ref_key: "trigger",
        ref: s,
        type: "button",
        class: "dc-menu-button",
        "aria-label": e.label,
        "aria-haspopup": "menu",
        "aria-expanded": c.value,
        disabled: e.items.length === 0,
        onClick: f,
        onKeydown: k
      }, [
        v("span", bi, C(e.glyph), 1)
      ], 40, wi),
      r.value ? (m(), be(Os, {
        key: 0,
        ref_key: "menu",
        ref: a,
        items: e.items,
        at: r.value,
        label: e.label,
        autofocus: o.value,
        onChoose: _,
        onDismiss: w[0] || (w[0] = (M) => d(!0))
      }, null, 8, ["items", "at", "label", "autofocus"])) : O("", !0)
    ], 64));
  }
}), Sn = /* @__PURE__ */ ue(ki, [["__scopeId", "data-v-48f5ada5"]]), _t = (e) => e.kind === "split", K = (e) => e.kind === "group", X = (e) => e.kind === "float", st = { x: 16, y: 16, w: 360, h: 260 }, Gt = 28, Ks = 120, dn = 220, qs = 38, it = 6;
function zt(e, t) {
  let n = !1;
  const s = e.frames.map((a, r) => {
    const o = t(a.node, r);
    return o === a.node ? a : (n = !0, { ...a, node: o });
  });
  return n ? { ...e, frames: s } : e;
}
function Fe(e) {
  return { kind: "group", panels: [e] };
}
function Xc(e, t, n) {
  return {
    kind: "group",
    panels: e,
    ...t ? { active: t } : {},
    ...n ? { title: n } : {}
  };
}
const oe = (e) => typeof e == "string", An = (e) => oe(e) ? Fe(e) : e, Rt = (e) => oe(e) ? [e] : Ke(e), ns = (e) => e.panels.filter(oe), $i = (e) => e.panels.filter((t) => !oe(t)), Ee = (e, t) => e.panels.includes(t);
function Ft(e, t, n) {
  let s = !1;
  const a = e.panels.map((r) => {
    if (oe(r) || !J(r, t)) return r;
    const o = n(r);
    return o !== r && (s = !0), o;
  });
  return s ? { ...e, panels: a } : e;
}
function jt(e, t) {
  return { node: e, rect: { ...st, ...t } };
}
function Pn(e, t) {
  return t ? { kind: "float", frames: e, title: t } : { kind: "float", frames: e };
}
function zn(e, t) {
  const n = { ...st, ...t };
  return Pn(
    e.map(
      (s, a) => jt(s, {
        ...n,
        x: n.x + a * Gt,
        y: n.y + a * Gt
      })
    )
  );
}
function Rn(e, t, n, s) {
  return {
    kind: "split",
    direction: e,
    children: t,
    ...n ? { sizes: n } : {},
    ...s ? { title: s } : {}
  };
}
const Fn = (e, t, n) => Rn("row", e, t, n), Gc = (e, t, n) => Rn("column", e, t, n);
function me(e) {
  return {
    ...e.title ? { title: e.title } : {},
    ...e.fixedView ? { fixedView: !0 } : {},
    ...e.headless ? { headless: !0 } : {}
  };
}
const lt = (e) => e.fixedView === !0 || e.headless === !0 || !!e.title, Yc = (e) => ({ ...e, headless: !0 }), jc = (e) => ({ ...e, fixedView: !0 }), xi = (e) => e === "left" || e === "right" ? "row" : "column";
function Ke(e) {
  return K(e) ? e.panels.flatMap(Rt) : X(e) ? e.frames.flatMap((t) => Ke(t.node)) : e.children.flatMap(Ke);
}
function J(e, t) {
  return K(e) ? e.panels.some((n) => oe(n) ? n === t : J(n, t)) : X(e) ? e.frames.some((n) => J(n.node, t)) : e.children.some((n) => J(n, t));
}
const Bs = (e) => Ke(e).length === 0, fn = (e) => !K(e) && lt(e), pn = (e) => Bs(e) && !fn(e);
function Qt(e) {
  return _t(e) ? e.children.map((t, n) => ({ node: t, index: n })) : X(e) ? e.frames.map((t, n) => ({ node: t.node, index: n })) : e.panels.flatMap((t, n) => oe(t) ? [] : [{ node: t, index: n }]);
}
const Tn = (e) => Qt(e).map((t) => t.node);
function ot(e) {
  const t = e.active;
  if (t) {
    const n = e.panels.findIndex(
      (s) => oe(s) ? s === t : J(s, t)
    );
    if (n >= 0) return n;
  }
  return 0;
}
function Ws(e) {
  const t = e.panels[ot(e)];
  return t !== void 0 && oe(t) ? t : "";
}
function we(e) {
  if (oe(e)) return e;
  if (K(e)) {
    const n = e.panels[ot(e)];
    return n === void 0 ? "" : we(n);
  }
  if (X(e)) {
    const n = e.frames[e.frames.length - 1];
    return n ? we(n.node) : "";
  }
  const t = e.children[0];
  return t ? we(t) : "";
}
function ut(e, t) {
  if (K(e) && Ee(e, t)) return e;
  for (const n of Tn(e)) {
    const s = ut(n, t);
    if (s) return s;
  }
  return null;
}
function Mi(e) {
  const t = Tn(e).flatMap(Mi);
  return K(e) ? [e, ...t] : t;
}
function _e(e, t) {
  if (K(e)) {
    for (const n of $i(e)) {
      const s = _e(n, t);
      if (s) return s;
    }
    return null;
  }
  if (X(e)) {
    for (const n of e.frames)
      if (J(n.node, t))
        return _e(n.node, t) ?? n;
    return null;
  }
  for (const n of e.children) {
    const s = _e(n, t);
    if (s) return s;
  }
  return null;
}
function nn(e, t, n = Ks) {
  const s = (c, l) => l > 0 ? Math.max(Math.min(c, l), Math.min(n, l)) : Math.max(c, n), a = s(e.w, t.w), r = s(e.h, t.h), o = (c, l, d) => Math.min(Math.max(c, 0), Math.max(d - l, 0));
  return {
    x: Math.round(o(e.x, a, t.w)),
    y: Math.round(o(e.y, r, t.h)),
    w: Math.round(a),
    h: Math.round(r)
  };
}
function ss(e, t, n, s, a = Ks) {
  let { x: r, y: o, w: c, h: l } = e;
  return t.includes("e") && (c = e.w + n), t.includes("w") && (c = e.w - n, r = e.x + n), t.includes("s") && (l = e.h + s), t.includes("n") && (l = e.h - s, o = e.y + s), c < a && (t.includes("w") && (r = e.x + e.w - a), c = a), l < a && (t.includes("n") && (o = e.y + e.h - a), l = a), { x: r, y: o, w: c, h: l };
}
const Us = (e, t) => e.x === t.x && e.y === t.y && e.w === t.w && e.h === t.h;
function dt(e, t, n) {
  if (K(e)) return Ft(e, t, (r) => dt(r, t, n));
  if (X(e)) {
    let r = !1;
    const o = e.frames.map((c) => {
      if (!J(c.node, t)) return c;
      if (_e(c.node, t)) {
        const d = dt(c.node, t, n);
        return d === c.node ? c : (r = !0, { ...c, node: d });
      }
      const l = n(c);
      return l === c ? c : (r = !0, l);
    });
    return r ? { ...e, frames: o } : e;
  }
  if (!J(e, t)) return e;
  let s = !1;
  const a = e.children.map((r) => {
    const o = dt(r, t, n);
    return o !== r && (s = !0), o;
  });
  return s ? { ...e, children: a } : e;
}
function Ci(e, t, n) {
  return dt(e, t, (s) => Us(s.rect, n) ? s : { ...s, rect: n });
}
const Ge = (e) => e.maximized === !0, Hs = (e) => (t) => {
  if (Ge(t) === e) return t;
  if (e) {
    const { minimized: a, ...r } = t;
    return { ...r, maximized: !0 };
  }
  const { maximized: n, ...s } = t;
  return s;
};
function Ei(e, t, n = !0) {
  return dt(e, t, Hs(n));
}
function Qc(e, t) {
  const n = _e(e, t);
  return n ? Ei(e, t, !Ge(n)) : e;
}
const et = (e) => e.minimized === !0, Xs = (e) => (t) => {
  if (et(t) === e) return t;
  if (e) {
    const { maximized: a, ...r } = t;
    return { ...r, minimized: !0 };
  }
  const { minimized: n, ...s } = t;
  return s;
};
function Si(e, t, n = !0) {
  return dt(e, t, Xs(n));
}
function Zc(e, t) {
  const n = _e(e, t);
  return n ? Si(e, t, !et(n)) : e;
}
function Je(e, t) {
  const n = t[t.length - 1];
  if (n === void 0) return null;
  const s = Ye(e, t.slice(0, -1));
  return !s || !X(s) ? null : s.frames[n] ?? null;
}
function vn(e, t) {
  if (X(e)) {
    for (const [n, s] of e.frames.entries()) {
      if (!J(s.node, t)) continue;
      const a = vn(s.node, t);
      return a ? [n, ...a] : [n];
    }
    return null;
  }
  for (const { node: n, index: s } of Qt(e)) {
    if (!J(n, t)) continue;
    const a = vn(n, t);
    return a ? [s, ...a] : null;
  }
  return null;
}
function Ln(e, t, n) {
  const s = t[t.length - 1];
  if (s === void 0) return e;
  const a = t.slice(0, -1), r = Ye(e, a);
  if (!r || !X(r)) return e;
  const o = r.frames[s];
  if (!o) return e;
  const c = n(o);
  if (c === o) return e;
  const l = [...r.frames];
  return l[s] = c, rt(e, a, { ...r, frames: l });
}
function as(e, t, n) {
  return Ln(
    e,
    t,
    (s) => Us(s.rect, n) ? s : { ...s, rect: n }
  );
}
function Ai(e, t, n = !0) {
  return Ln(e, t, Hs(n));
}
function Pi(e, t, n = !0) {
  return Ln(e, t, Xs(n));
}
function Ct(e, t) {
  const [n, ...s] = t;
  if (n === void 0) return e;
  if (X(e)) {
    const o = e.frames[n];
    if (!o) return e;
    const c = Ct(o.node, s), l = c === o.node ? o : { ...o, node: c };
    if (n === e.frames.length - 1 && l === o) return e;
    const d = [...e.frames];
    return d.splice(n, 1), d.push(l), { ...e, frames: d };
  }
  const a = Ye(e, [n]);
  if (!a) return e;
  const r = Ct(a, s);
  return r === a ? e : rt(e, [n], r);
}
function zi(e, t) {
  const n = [...t];
  let s = e;
  return t.forEach((a, r) => {
    s && (X(s) && (n[r] = s.frames.length - 1), s = Ye(s, [a]));
  }), n;
}
function Ot(e, t, n, s) {
  if (K(e)) return Ft(e, n, (o) => Ot(o, t, n, s));
  if (X(e)) {
    const o = e.frames.findIndex((l) => J(l.node, n)), c = e.frames[o];
    if (!c) return e;
    if (_e(c.node, n)) {
      const l = Ot(c.node, t, n, s);
      if (l === c.node) return e;
      const d = [...e.frames];
      return d[o] = { ...c, node: l }, { ...e, frames: d };
    }
    return { ...e, frames: [...e.frames, jt(Fe(t), s)] };
  }
  if (!J(e, n)) return e;
  let a = !1;
  const r = e.children.map((o) => {
    const c = Ot(o, t, n, s);
    return c !== o && (a = !0), c;
  });
  return a ? { ...e, children: r } : e;
}
function rs(e, t, n, s) {
  if (t === n || !J(e, t) || !J(e, n) || !_e(e, n)) return e;
  const a = at(e, t);
  if (!a) return e;
  const r = Ot(a, t, n, s);
  return r === a ? e : he(r);
}
function Ri(e, t, n) {
  return X(e) ? { ...e, frames: [...e.frames, jt(Fe(t), n)] } : K(e) ? Ys(e, t) : {
    kind: "split",
    direction: e.direction,
    children: [...e.children, Fe(t)],
    sizes: [...Oe(e), 1],
    ...me(e)
  };
}
function Gs(e, t, n, s) {
  const a = n[0];
  if (a === void 0) return Ri(e, t, s);
  const r = n.slice(1), o = (f, k) => k === a ? Gs(f, t, r, s) : at(f, t);
  if (X(e)) {
    const f = e.frames.flatMap((k, y) => {
      const _ = o(k.node, y);
      return _ ? [_ === k.node ? k : { ...k, node: _ }] : [];
    });
    return { ...e, frames: f };
  }
  if (K(e)) {
    const f = ot(e), k = [];
    e.panels.forEach(($, w) => {
      if (oe($)) {
        $ !== t && k.push($);
        return;
      }
      const M = o($, w);
      M && k.push(M);
    });
    const _ = e.active && k.some(($) => Rt($).includes(e.active)) ? e.active : we(k[f] ?? k[k.length - 1]);
    return {
      kind: "group",
      panels: k,
      ..._ ? { active: _ } : {},
      ...me(e)
    };
  }
  const c = Oe(e), l = [], d = [];
  return e.children.forEach((f, k) => {
    const y = o(f, k);
    y && (l.push(y), d.push(c[k] ?? 0));
  }), { kind: "split", direction: e.direction, children: l, sizes: d, ...me(e) };
}
function ls(e, t, n, s) {
  const a = Ye(e, n);
  return !a || !Bs(a) || !J(e, t) ? e : he(Gs(e, t, n, s));
}
function sn(e, t) {
  if (K(e)) return Ft(e, t, (a) => sn(a, t));
  if (X(e)) {
    const a = e.frames.findIndex((d) => J(d.node, t)), r = e.frames[a];
    if (!r) return e;
    const o = sn(r.node, t), c = o === r.node ? r : { ...r, node: o };
    if (a === e.frames.length - 1 && c === r) return e;
    const l = [...e.frames];
    return l.splice(a, 1), l.push(c), { ...e, frames: l };
  }
  if (!J(e, t)) return e;
  let n = !1;
  const s = e.children.map((a) => {
    const r = sn(a, t);
    return r !== a && (n = !0), r;
  });
  return n ? { ...e, children: s } : e;
}
function Dn(e, t) {
  if (e <= 0) return [];
  const n = () => Array.from({ length: e }, () => 1 / e);
  if (!t || t.length !== e) return n();
  const s = t.map((r) => Number.isFinite(r) && r > 0 ? r : 0), a = s.reduce((r, o) => r + o, 0);
  return a <= 0 ? n() : s.map((r) => r / a);
}
const Oe = (e) => Dn(e.children.length, e.sizes), ze = (e) => {
  const t = K(e) ? e.panels.length : e.children.length;
  return e.places?.length === t ? e.places : void 0;
};
function he(e) {
  if (K(e)) return Fi(e);
  if (X(e)) {
    const c = e.frames.flatMap((l) => {
      const d = he(l.node);
      return pn(d) ? [] : [d === l.node ? l : { ...l, node: d }];
    });
    return c.length === e.frames.length && c.every((l, d) => l === e.frames[d]) ? e : { ...e, frames: c };
  }
  if (e.children.length === 0) return e;
  const t = Oe(e), n = ze(e), s = [], a = [], r = [];
  e.children.forEach((c, l) => {
    const d = he(c), f = t[l] ?? 0;
    if (pn(d)) return;
    if (!n && _t(d) && d.direction === e.direction && !ze(d) && !lt(d)) {
      const y = Oe(d);
      d.children.forEach((_, $) => {
        s.push(_), a.push(f * (y[$] ?? 0));
      });
      return;
    }
    s.push(d), a.push(f);
    const k = n?.[l];
    k && r.push(k);
  });
  const o = s[0];
  return s.length === 1 && o && !lt(e) ? o : {
    kind: "split",
    direction: e.direction,
    children: s,
    sizes: Dn(s.length, a),
    ...me(e),
    ...r.length === s.length && r.length > 0 ? { places: r } : {}
  };
}
function Fi(e) {
  if (e.panels.every(oe)) return e;
  const t = we(e), n = ze(e), s = [], a = [];
  e.panels.forEach((c, l) => {
    const d = n?.[l];
    if (oe(c)) {
      s.push(c), d && a.push(d);
      return;
    }
    const f = he(c);
    if (!pn(f)) {
      if (K(f) && !lt(f) && !ze(f)) {
        s.push(...f.panels);
        return;
      }
      s.push(f), d && a.push(d);
    }
  });
  const r = s[0];
  if (s.length === 1 && r !== void 0 && !oe(r) && !lt(e))
    return r;
  if (s.length === e.panels.length && s.every((c, l) => c === e.panels[l]))
    return e;
  const o = t && s.some((c) => Rt(c).includes(t)) ? t : void 0;
  return {
    kind: "group",
    panels: s,
    ...o ? { active: o } : {},
    ...me(e),
    ...a.length === s.length && a.length > 0 ? { places: a } : {}
  };
}
function at(e, t) {
  if (X(e)) {
    const o = e.frames.flatMap((c) => {
      const l = at(c.node, t);
      return l ? [l === c.node ? c : { ...c, node: l }] : [];
    });
    return o.length === 0 && !fn(e) ? null : { ...e, frames: o };
  }
  if (K(e)) {
    if (!J(e, t)) return e;
    const o = ot(e), c = [];
    for (const f of e.panels) {
      if (oe(f)) {
        f !== t && c.push(f);
        continue;
      }
      const k = at(f, t);
      k && c.push(k);
    }
    if (c.length === 0) return null;
    const d = e.active && c.some((f) => Rt(f).includes(e.active)) ? e.active : we(c[o] ?? c[c.length - 1]);
    return d ? { kind: "group", panels: c, active: d, ...me(e) } : { kind: "group", panels: c, ...me(e) };
  }
  const n = Oe(e), s = [], a = [];
  if (e.children.forEach((o, c) => {
    const l = at(o, t);
    l && (s.push(l), a.push(n[c] ?? 0));
  }), s.length === 0)
    return fn(e) ? { kind: "split", direction: e.direction, children: s, sizes: [], ...me(e) } : null;
  const r = s[0];
  return s.length === 1 && r && !lt(e) ? r : he({
    kind: "split",
    direction: e.direction,
    children: s,
    sizes: a,
    ...me(e)
  });
}
function Ys(e, t, n) {
  const s = e.panels.filter((r) => r !== t), a = n === void 0 ? s.length : Math.max(0, Math.min(n, s.length));
  return s.splice(a, 0, t), { kind: "group", panels: s, active: t, ...me(e) };
}
function $t(e, t, n, s, a) {
  const r = (_) => zt(
    _,
    ($) => J($, n) ? $t($, t, n, s, a) : $
  );
  if (s === "float") return e;
  const o = (_) => Ft(_, n, ($) => $t($, t, n, s, a));
  if (s === "center")
    return K(e) ? Ee(e, n) ? Ys(e, t, a) : o(e) : X(e) ? r(e) : {
      ...e,
      children: e.children.map(
        (_) => J(_, n) ? $t(_, t, n, s, a) : _
      )
    };
  const c = xi(s), l = s === "left" || s === "top", d = (_) => ({
    kind: "split",
    direction: c,
    children: l ? [Fe(t), _] : [_, Fe(t)],
    sizes: [0.5, 0.5]
  });
  if (K(e)) return Ee(e, n) ? d(e) : o(e);
  if (X(e)) return r(e);
  const f = Oe(e), k = e.children.findIndex(
    (_) => K(_) && Ee(_, n)
  );
  if (k >= 0 && e.direction === c) {
    const _ = (f[k] ?? 0) / 2, $ = [...e.children], w = [...f];
    return $.splice(l ? k : k + 1, 0, Fe(t)), w.splice(k, 1, _, _), {
      kind: "split",
      direction: c,
      children: $,
      sizes: w,
      ...me(e)
    };
  }
  const y = e.children.map((_) => J(_, n) ? K(_) && Ee(_, n) ? d(_) : $t(_, t, n, s) : _);
  return {
    kind: "split",
    direction: e.direction,
    children: y,
    sizes: f,
    ...me(e)
  };
}
function ft(e, t) {
  if (K(e)) {
    if (Ee(e, t))
      return Ws(e) === t ? e : { ...e, active: t };
    const a = e.panels.findIndex((l) => !oe(l) && J(l, t)), r = e.panels[a];
    if (r === void 0 || oe(r)) return e;
    const o = ft(r, t);
    if (o === r && e.active === t) return e;
    const c = [...e.panels];
    return c[a] = o, { ...e, panels: c, active: t };
  }
  if (!J(e, t)) return e;
  if (X(e)) return zt(e, (a) => ft(a, t));
  let n = !1;
  const s = e.children.map((a) => {
    const r = ft(a, t);
    return r !== a && (n = !0), r;
  });
  return n ? { ...e, children: s } : e;
}
function Et(e, t, n) {
  if (K(e)) {
    if (!Ee(e, t)) return Ft(e, t, (d) => Et(d, t, n));
    const s = e.panels.indexOf(t), a = Math.max(0, Math.min(n, e.panels.length - 1));
    if (s === a) return e;
    const r = [...e.panels];
    r.splice(s, 1), r.splice(a, 0, t);
    const o = ze(e), c = o ? [...o] : void 0;
    c && c.splice(a, 0, ...c.splice(s, 1));
    const l = we(e);
    return {
      kind: "group",
      panels: r,
      ...l ? { active: l } : {},
      ...me(e),
      ...c ? { places: c } : {}
    };
  }
  return J(e, t) ? X(e) ? zt(e, (s) => Et(s, t, n)) : { ...e, children: e.children.map((s) => Et(s, t, n)) } : e;
}
function Kt(e, t, n) {
  if (t === n) return e;
  if (K(e)) {
    if (!J(e, t) && !J(e, n)) return e;
    const s = (r) => r === t ? n : r === n ? t : r, a = e.panels.map((r) => oe(r) ? s(r) : Kt(r, t, n));
    return { ...e, panels: a, ...e.active ? { active: s(e.active) } : {} };
  }
  return X(e) ? zt(e, (s) => Kt(s, t, n)) : { ...e, children: e.children.map((s) => Kt(s, t, n)) };
}
function Nt(e, t, n, s, a) {
  if (s === "float" || !J(e, t) || !J(e, n)) return e;
  const r = ut(e, t);
  if (s === "center" && r && Ee(r, n)) {
    if (a === void 0) return e;
    const c = r.panels.indexOf(t), l = a > c ? a - 1 : a;
    return l === c ? e : ft(Et(e, t, l), t);
  }
  if (t === n) return e;
  const o = at(e, t);
  return o ? he($t(o, t, n, s, a)) : e;
}
function js(e, t, n) {
  if (K(e)) {
    const a = e.panels[t];
    if (a === void 0 || oe(a)) return e;
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
function Tt(e, t, n) {
  const s = Qt(e);
  if (!K(e) && s.some(({ node: a }) => K(a) && Ee(a, t))) {
    const a = n(e);
    return a === e ? null : a;
  }
  for (const { node: a, index: r } of s) {
    if (!J(a, t)) continue;
    const o = Tt(a, t, n);
    return o ? js(e, r, o) : null;
  }
  return null;
}
function Jc(e, t, n) {
  const s = Tt(
    e,
    t,
    (a) => _t(a) && a.direction !== n ? { ...a, direction: n } : a
  );
  return s ? he(s) : e;
}
function Qs(e) {
  return X(e) ? [e] : ze(e) || lt(e) ? [e] : K(e) ? [...e.panels] : e.children.flatMap(Qs);
}
function Zs(e, t) {
  if (K(e)) return e;
  const n = Tn(e).map(Qs), s = n.flat(), a = t && s.some((o) => Rt(o).includes(t)) ? t : void 0, r = Ti(e, n);
  return he({
    kind: "group",
    panels: s,
    ...a ? { active: a } : {},
    ...me(e),
    ...r ? { places: r } : {}
  });
}
function Ti(e, t) {
  const n = X(e) ? e.frames.map(({ node: s, ...a }) => a) : ze(e);
  if (n)
    return t.every((s) => s.length === 1) ? n : void 0;
}
function Li(e, t) {
  const n = Tt(e, t, (s) => Zs(s, t));
  return n ? he(n) : e;
}
function In(e, t, n) {
  if (K(e) && Ee(e, t)) {
    const s = n(e);
    return s === e ? null : s;
  }
  for (const { node: s, index: a } of Qt(e)) {
    if (!J(s, t)) continue;
    const r = In(s, t, n);
    return r ? js(e, a, r) : null;
  }
  return null;
}
function os(e, t, n) {
  const s = In(e, t, (a) => {
    if (a.panels.length < 2) return a;
    const r = ze(a);
    return {
      ...Rn(n, a.panels.map(An)),
      ...me(a),
      ...r ? { places: r } : {}
    };
  });
  return s ? he(s) : e;
}
function mn(e, t) {
  if (K(e)) return e;
  if (X(e)) {
    const a = e.frames.findIndex(
      (c) => K(c.node) && c.node.panels.includes(t)
    ), r = e.frames[a], o = r && K(r.node) ? r.node : null;
    if (r && o && o.panels.length > 1) {
      const c = zn(o.panels.map(An), r.rect).frames;
      return {
        ...e,
        frames: [...e.frames.slice(0, a), ...c, ...e.frames.slice(a + 1)]
      };
    }
    return zt(e, (c) => mn(c, t));
  }
  if (!J(e, t)) return e;
  let n = !1;
  const s = e.children.map((a) => {
    const r = mn(a, t);
    return r !== a && (n = !0), r;
  });
  return n ? { ...e, children: s } : e;
}
function Di(e, t, n) {
  const s = ut(e, t);
  if (!s || s.panels.length < 2) return e;
  if (_e(e, t)?.node === s) {
    const o = mn(e, t);
    return o === e ? e : he(o);
  }
  const r = In(e, t, (o) => ({
    ...Pn(Js(o.panels.map(An), ze(o), n)),
    ...me(o)
  }));
  return r ? he(r) : e;
}
function Js(e, t, n) {
  return t ? e.map((s, a) => ({ ...t[a], node: s })) : zn(e, n).frames;
}
function ea(e, t) {
  return { ...Pn(Js(e.children, ze(e), t)), ...me(e) };
}
function eu(e, t, n) {
  const s = Tt(
    e,
    t,
    (a) => X(a) ? a : ea(a, n)
  );
  return s ? he(s) : K(e) && Ee(e, t) ? zn([e], n) : e;
}
function Ii(e, t) {
  const n = (a) => t === "column" ? a.rect.y : a.rect.x, s = (a) => t === "column" ? a.rect.x : a.rect.y;
  return [...e].sort((a, r) => n(a) - n(r) || s(a) - s(r));
}
function ta(e, t) {
  const n = Ii(e.frames, t);
  return {
    kind: "split",
    direction: t,
    children: n.map((s) => s.node),
    ...me(e),
    places: n.map(({ node: s, ...a }) => a)
  };
}
function tu(e, t, n = "row") {
  const s = Tt(
    e,
    t,
    (a) => X(a) ? ta(a, n) : a
  );
  return s ? he(s) : e;
}
function na(e) {
  if (X(e)) return null;
  const t = K(e) ? e.panels.length === 1 ? e.panels[0] : void 0 : e.children.length === 1 ? e.children[0] : void 0;
  return t === void 0 || oe(t) || K(t) && t.panels.length === 1 && oe(t.panels[0]) ? null : t;
}
const Ni = (e) => {
  const { title: t, fixedView: n, headless: s, ...a } = e;
  return a;
};
function Vi(e, t) {
  const n = na(e);
  return n ? t === "inner" ? n : { ...Ni(n), ...me(e) } : e;
}
function mt(e) {
  return e.title ? e.title : K(e) ? "" : X(e) ? "Desktop" : e.direction === "row" ? "Row" : "Column";
}
function St(e, t) {
  if (K(e)) {
    const s = e.panels[ot(e)];
    return s === void 0 ? "" : oe(s) ? t(s) ?? s : mt(s) || St(s, t);
  }
  if (e.title) return e.title;
  if (X(e)) {
    const s = e.frames[e.frames.length - 1];
    return s ? s.title ?? St(s.node, t) : "";
  }
  const n = e.children[0];
  return n ? St(n, t) : "";
}
function Ye(e, t) {
  let n = e;
  for (const s of t) {
    if (!n) return null;
    if (_t(n)) n = n.children[s];
    else if (X(n)) n = n.frames[s]?.node;
    else {
      const a = n.panels[s];
      n = a === void 0 || oe(a) ? void 0 : a;
    }
  }
  return n ?? null;
}
function rt(e, t, n) {
  if (t.length === 0) return n;
  const [s, ...a] = t;
  if (s === void 0) return e;
  if (X(e)) {
    const l = e.frames[s];
    if (!l) return e;
    const d = rt(l.node, a, n);
    if (d === l.node) return e;
    const f = [...e.frames];
    return f[s] = { ...l, node: d }, { ...e, frames: f };
  }
  if (K(e)) {
    const l = e.panels[s];
    if (l === void 0 || oe(l)) return e;
    const d = rt(l, a, n);
    if (d === l) return e;
    const f = [...e.panels];
    return f[s] = d, { ...e, panels: f };
  }
  const r = e.children[s];
  if (!r) return e;
  const o = rt(r, a, n);
  if (o === r) return e;
  const c = [...e.children];
  return c[s] = o, { ...e, children: c };
}
function qt(e, t, n) {
  if (t.length === 0)
    return _t(e) ? { ...e, sizes: Dn(e.children.length, n) } : e;
  const [s, ...a] = t;
  if (s === void 0) return e;
  if (X(e)) {
    const c = e.frames[s];
    if (!c) return e;
    const l = qt(c.node, a, n);
    if (l === c.node) return e;
    const d = [...e.frames];
    return d[s] = { ...c, node: l }, { ...e, frames: d };
  }
  if (K(e)) {
    const c = e.panels[s];
    if (c === void 0 || oe(c)) return e;
    const l = qt(c, a, n);
    if (l === c) return e;
    const d = [...e.panels];
    return d[s] = l, { ...e, panels: d };
  }
  const r = e.children[s];
  if (!r) return e;
  const o = [...e.children];
  return o[s] = qt(r, a, n), { ...e, children: o };
}
function is(e, t, n, s = 0.02) {
  const a = e[t], r = e[t + 1];
  if (a === void 0 || r === void 0) return e;
  const o = a + r;
  if (o < s * 2) return e;
  const c = [...e], l = Math.min(Math.max(a + n, s), o - s);
  return c[t] = l, c[t + 1] = o - l, c;
}
function Yt(e) {
  if (!K(e) || e.panels.length >= 2) return e;
  const t = e.panels[0];
  return t !== void 0 && !oe(t) ? e : { ...Fn([Oi(e)]), ...me(e) };
}
const Oi = (e) => {
  if (!e.title) return e;
  const { title: t, ...n } = e;
  return n;
};
function cs(e) {
  return e.length === 0 ? null : Fn(e.map(Fe));
}
function Ki(e, t) {
  if (!e) return cs(t);
  const n = new Set(t), s = /* @__PURE__ */ new Set(), a = /* @__PURE__ */ new Set();
  for (const l of Ke(e))
    !n.has(l) || s.has(l) ? a.add(l) : s.add(l);
  let r = e;
  for (const l of a)
    r = r ? at(r, l) : null;
  const o = new Set(r ? Ke(r) : []), c = t.filter((l) => !o.has(l));
  if (c.length === 0) return r ? Yt(he(r)) : null;
  if (!r) return cs(c);
  if (X(r)) {
    const l = r.frames.length;
    return {
      ...r,
      frames: [
        ...r.frames,
        ...c.map(
          (d, f) => jt(Fe(d), {
            x: st.x + (l + f) * Gt,
            y: st.y + (l + f) * Gt
          })
        )
      ]
    };
  }
  return Yt(he(Fn([r, ...c.map(Fe)])));
}
const Nn = Symbol("dc.windowContext");
function qi(e) {
  return hn(Nn, e), e;
}
function Vn() {
  const e = vt(Nn, null);
  if (!e)
    throw new Error(
      "[header-content-layout] No window context found. Render this component inside <WindowFrame>."
    );
  return e;
}
const Bi = ["data-dc-glyph"], Wi = { class: "dc-glyph__line" }, Ui = ["d"], Hi = {
  key: 0,
  class: "dc-glyph__aqua"
}, Xi = ["d"], Gi = /* @__PURE__ */ ce({
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
      v("g", Wi, [
        (m(!0), h(se, null, fe(t[e.kind], (r) => (m(), h("path", {
          key: r,
          d: r
        }, null, 8, Ui))), 128))
      ]),
      n[e.kind] ? (m(), h("g", Hi, [
        (m(!0), h(se, null, fe(n[e.kind], (r) => (m(), h("path", {
          key: r,
          d: r
        }, null, 8, Xi))), 128))
      ])) : O("", !0)
    ], 8, Bi));
  }
}), pt = /* @__PURE__ */ ue(Gi, [["__scopeId", "data-v-4d2872c0"]]), Yi = ["data-dc-order", "data-dc-path", "data-dc-maximized", "data-dc-minimized", "data-dc-dragging"], ji = ["data-dc-movable"], Qi = { class: "dc-float__title dc-truncate" }, Zi = {
  key: 1,
  class: "dc-float__controls dc-controls"
}, Ji = ["aria-label", "aria-pressed", "data-dc-minimize"], ec = ["aria-label", "aria-pressed", "data-dc-maximize"], tc = ["aria-label", "data-dc-close"], nc = { class: "dc-float__content" }, sc = ["data-dc-handle", "onPointerdown"], ac = /* @__PURE__ */ ce({
  __name: "WindowFloat",
  props: {
    frame: {},
    path: {},
    order: {},
    place: {}
  },
  setup(e) {
    const t = e, n = Vn(), s = g(() => we(t.frame.node)), a = g(() => n.panelFor(s.value)?.fixed === !0), r = g(() => Ge(t.frame)), o = g(() => et(t.frame)), c = g(() => r.value || o.value), l = g(() => n.resizable.value && !a.value && !c.value), d = g(() => n.movable.value && !a.value && !c.value), f = g(() => {
      const I = Ke(t.frame.node);
      return I.length === 1 ? I[0] ?? null : null;
    }), k = g(() => f.value !== null && n.closable(f.value)), y = g(() => t.frame.node.headless === !0), _ = g(
      () => !y.value && (!K(t.frame.node) || o.value)
    ), $ = g(
      () => t.frame.title || mt(t.frame.node) || St(t.frame.node, (I) => n.panelFor(I)?.title)
    ), w = g(() => n.spaceMenu(t.path));
    function M(I) {
      I.target?.closest("button, a, input, select, textarea, label") || n.beginFrameDragAt(t.path, I, "move");
    }
    function z(I) {
      I.target?.closest("button, a, input, select, textarea, label") || (o.value ? n.toggleMinimizeAt(t.path) : n.toggleMaximizeAt(t.path));
    }
    const T = g(() => {
      const I = n.framing.value;
      return I !== null && J(t.frame.node, I);
    }), W = g(() => ({
      // Neither maximizing nor rolling up overwrites the rect: it is where the
      // window goes back to, and both are a way of not being there for a while.
      ...r.value ? { inset: "0" } : o.value && t.place ? {
        left: `${t.place.x}px`,
        bottom: `${t.place.bottom}px`,
        width: `${dn}px`,
        height: `${qs}px`
      } : {
        left: `${t.frame.rect.x}px`,
        top: `${t.frame.rect.y}px`,
        width: `${t.frame.rect.w}px`,
        height: `${t.frame.rect.h}px`
      },
      // Back to front. The DOM order says the same thing, but a frame that paints
      // a shadow over its neighbour should not depend on that being noticed.
      zIndex: t.order + 1
    })), N = ["n", "s", "e", "w", "nw", "ne", "sw", "se"];
    return (I, R) => (m(), h("div", {
      class: "dc-float",
      style: Te(W.value),
      "data-dc-order": e.order,
      "data-dc-path": e.path.join("/"),
      "data-dc-maximized": r.value ? "true" : "false",
      "data-dc-minimized": o.value ? "true" : "false",
      "data-dc-dragging": T.value ? "true" : "false",
      onPointerdown: R[3] || (R[3] = (x) => E(n).raiseAt(e.path))
    }, [
      _.value ? (m(), h("header", {
        key: 0,
        class: "dc-float__bar",
        "data-dc-movable": d.value ? "true" : "false",
        onPointerdown: M,
        onDblclick: z
      }, [
        v("span", Qi, C($.value), 1),
        w.value.length ? (m(), be(Sn, {
          key: 0,
          items: w.value,
          label: `${$.value} menu`
        }, null, 8, ["items", "label"])) : O("", !0),
        !a.value || o.value && k.value && f.value ? (m(), h("div", Zi, [
          a.value ? O("", !0) : (m(), h("button", {
            key: 0,
            type: "button",
            class: "dc-float__button dc-control",
            "aria-label": `${o.value ? "Unroll" : "Minimize"} ${$.value}`,
            "aria-pressed": o.value,
            "data-dc-minimize": s.value,
            onClick: R[0] || (R[0] = (x) => E(n).toggleMinimizeAt(e.path))
          }, [
            de(pt, {
              kind: o.value ? "unroll" : "minimize"
            }, null, 8, ["kind"])
          ], 8, Ji)),
          a.value ? O("", !0) : (m(), h("button", {
            key: 1,
            type: "button",
            class: "dc-float__button dc-control",
            "aria-label": `${r.value ? "Restore" : "Maximize"} ${$.value}`,
            "aria-pressed": r.value,
            "data-dc-maximize": s.value,
            onClick: R[1] || (R[1] = (x) => E(n).toggleMaximizeAt(e.path))
          }, [
            de(pt, {
              kind: r.value ? "restore" : "maximize"
            }, null, 8, ["kind"])
          ], 8, ec)),
          o.value && k.value && f.value ? (m(), h("button", {
            key: 2,
            type: "button",
            class: "dc-float__button dc-control",
            "aria-label": `Close ${$.value}`,
            "data-dc-close": f.value,
            onClick: R[2] || (R[2] = (x) => E(n).close(f.value))
          }, [
            de(pt, { kind: "close" })
          ], 8, tc)) : O("", !0)
        ])) : O("", !0)
      ], 40, ji)) : O("", !0),
      v("div", nc, [
        tt(I.$slots, "default", {}, void 0, !0)
      ]),
      (m(!0), h(se, null, fe(l.value ? N : [], (x) => (m(), h("span", {
        key: x,
        class: "dc-float__grip",
        "data-dc-handle": x,
        "aria-hidden": "true",
        onPointerdown: Pe((A) => E(n).beginFrameDragAt(e.path, A, x), ["stop"])
      }, null, 40, sc))), 128))
    ], 44, Yi));
  }
}), rc = /* @__PURE__ */ ue(ac, [["__scopeId", "data-v-f035684c"]]), On = Symbol("dc.paneContext");
function lc(e) {
  return hn(On, e), e;
}
function nu() {
  return vt(On, null);
}
function su(e) {
  const t = vt(Nn, null), n = vt(On, null);
  if (!t || !n) return () => {
  };
  const s = t.registerMenu(
    () => n.panel.value,
    () => bt(e)
  );
  return Ma() && Ca(s), s;
}
const oc = ["data-dc-panel", "data-dc-panels", "data-dc-tabbed", "data-dc-floating", "data-dc-maximized", "data-dc-headless", "data-dc-active", "data-dc-dragging", "aria-label"], ic = ["data-dc-movable"], cc = ["aria-label", "aria-pressed"], uc = ["data-dc-space-name"], dc = { class: "dc-truncate" }, fc = ["aria-label"], pc = {
  key: 0,
  class: "dc-pane__insert",
  "aria-hidden": "true"
}, vc = ["id", "data-dc-panel", "data-dc-space", "aria-selected", "aria-controls", "tabindex", "onPointerdown", "onClick", "onKeydown"], mc = { class: "dc-tab__name dc-truncate" }, hc = {
  key: 0,
  class: "dc-pane__sub dc-mono dc-truncate"
}, _c = ["aria-label", "data-dc-close", "onClick"], gc = {
  key: 0,
  class: "dc-pane__insert",
  "aria-hidden": "true"
}, yc = { class: "dc-pane__tools" }, wc = {
  key: 2,
  class: "dc-pane__controls dc-controls"
}, bc = ["aria-label", "data-dc-minimize"], kc = ["aria-label", "aria-pressed", "data-dc-maximize"], $c = ["aria-label", "data-dc-close"], xc = ["id", "role", "aria-labelledby"], Mc = ["id", "role", "aria-labelledby"], Cc = ["data-dc-edge"], Ec = /* @__PURE__ */ ce({
  __name: "WindowPane",
  props: {
    group: {},
    path: {}
  },
  setup(e) {
    const t = e, n = Vn(), s = ds() ?? "dc-pane", a = g(
      () => t.group.panels.flatMap((F, V) => {
        if (!oe(F)) {
          const ke = mt(F) || St(F, (ge) => n.panelFor(ge)?.title);
          return [{ kind: "space", index: V, id: `space-${V}`, title: ke, node: F }];
        }
        const Y = n.panelFor(F);
        return Y ? [{ kind: "panel", index: V, id: F, title: Y.title, panel: Y }] : [];
      })
    ), r = g(() => a.value.length > 1), o = g(() => {
      const F = ot(t.group);
      return a.value.find((V) => V.index === F) ?? a.value[0] ?? null;
    }), c = g(() => o.value?.kind === "space" ? o.value.node : null), l = g(() => c.value ? "" : Ws(t.group)), d = g(() => c.value ? null : n.panelFor(l.value)), f = g(() => o.value?.title ?? ""), k = g(() => n.spaceNames.value ? t.group.title ?? "" : ""), y = g(() => [...t.path, o.value?.index ?? 0]), _ = g(() => l.value || ns(t.group)[0] || ""), $ = g(() => n.viewFor(l.value)), w = g(() => t.group.headless === !0), M = g(() => n.focused.value === l.value), z = g(() => n.dragging.value === l.value), T = g(() => n.moving.value === l.value), W = g(() => n.frameOf(_.value) !== null), N = g(() => n.panelFor(_.value)?.fixed === !0), I = g(
      () => !c.value && (n.canMove(l.value) || W.value && n.movable.value && !N.value)
    ), R = g(
      () => c.value ? n.spaceMenu(y.value) : n.menuFor(l.value)
    ), x = (F) => n.closable(F);
    lc({ panel: l });
    const A = g(() => n.maximized(_.value)), Z = g(
      () => W.value && !N.value || !r.value && !!d.value && x(d.value.id)
    ), le = (F) => `${s}-tab-${F}`, pe = g(() => `${s}-body`), j = g(() => {
      const F = n.dropTarget.value;
      return !F || !Ee(t.group, F.panel) || F.edge === "float" ? null : F;
    }), xe = g(() => j.value?.index === void 0 ? j.value?.edge ?? null : null), Ae = g(() => j.value?.index ?? null), L = () => d.value ? n.renderContent(d.value, $.value, M.value) ?? null : null, G = () => d.value ? n.renderActions(d.value, $.value, M.value) ?? null : null;
    let ee = null;
    function te(F) {
      const V = ee !== null && Math.hypot(F.clientX - ee.x, F.clientY - ee.y) >= 4;
      return ee = null, V;
    }
    const ve = (F) => F.kind === "panel" ? F.id : we(F.node);
    function Me(F, V) {
      V.kind !== "space" && (n.focus(V.id), ee = { x: F.clientX, y: F.clientY }, n.beginDrag(V.id, F));
    }
    function qe(F, V) {
      if (te(F)) return;
      const Y = ve(V);
      Y && n.selectPanel(Y);
    }
    function Be(F) {
      l.value && n.focus(l.value), !F.target?.closest(".dc-tab, button, a, input, select, textarea, label") && (W.value ? n.beginFrameDrag(_.value, F, "move") : n.beginDrag(l.value, F));
    }
    function We(F) {
      ee = { x: F.clientX, y: F.clientY }, n.beginDrag(l.value, F);
    }
    function Ue(F) {
      te(F) || n.toggleMoveMode(l.value);
    }
    const Le = {
      ArrowLeft: "left",
      ArrowRight: "right",
      ArrowUp: "up",
      ArrowDown: "down"
    };
    function De(F) {
      if (!T.value) return;
      if (F.key === "Escape") {
        F.preventDefault(), n.toggleMoveMode(l.value);
        return;
      }
      const V = Le[F.key];
      V && (F.preventDefault(), W.value ? n.nudgeFrame(l.value, V, F.shiftKey) : n.nudge(l.value, V, F.shiftKey));
    }
    function Ie(F) {
      !W.value || F.target?.closest(".dc-tab, button, a, input, select, textarea, label") || n.toggleMaximize(_.value);
    }
    function gt(F, V) {
      F.stopPropagation(), ee = null, n.close(V);
    }
    function Lt(F, V) {
      const Y = a.value.length;
      let ke = null;
      if (F.key === "ArrowRight" ? ke = (V + 1) % Y : F.key === "ArrowLeft" ? ke = (V - 1 + Y) % Y : F.key === "Home" ? ke = 0 : F.key === "End" && (ke = Y - 1), ke === null) return;
      F.preventDefault();
      const ge = a.value[ke];
      if (!ge) return;
      const yt = ve(ge);
      yt && n.selectPanel(yt);
    }
    return (F, V) => o.value ? (m(), h("section", {
      key: 0,
      class: "dc-pane",
      "data-dc-panel": l.value || void 0,
      "data-dc-panels": E(ns)(e.group).join(" ") || void 0,
      "data-dc-tabbed": r.value ? "true" : "false",
      "data-dc-floating": W.value ? "true" : "false",
      "data-dc-maximized": A.value ? "true" : "false",
      "data-dc-headless": w.value ? "true" : "false",
      "data-dc-active": M.value ? "true" : "false",
      "data-dc-dragging": z.value ? "true" : "false",
      "aria-label": f.value,
      onFocusin: V[7] || (V[7] = (Y) => l.value && E(n).focus(l.value))
    }, [
      w.value ? O("", !0) : (m(), h("header", {
        key: 0,
        class: "dc-pane__head",
        "data-dc-movable": I.value ? "true" : "false",
        onPointerdown: Be,
        onDblclick: Ie
      }, [
        I.value ? (m(), h("button", {
          key: 0,
          type: "button",
          class: "dc-pane__grip",
          "aria-label": `Move ${f.value}`,
          "aria-pressed": T.value,
          onPointerdown: We,
          onClick: Ue,
          onKeydown: De
        }, [...V[8] || (V[8] = [
          v("span", { "aria-hidden": "true" }, "⠿", -1)
        ])], 40, cc)) : O("", !0),
        k.value ? (m(), h("span", {
          key: 1,
          class: "dc-pane__name",
          "data-dc-space-name": k.value
        }, [
          v("span", dc, C(k.value), 1)
        ], 8, uc)) : O("", !0),
        v("div", {
          class: "dc-pane__tabs",
          role: "tablist",
          "aria-label": `${f.value} panels`
        }, [
          (m(!0), h(se, null, fe(a.value, (Y, ke) => (m(), h(se, {
            key: Y.id
          }, [
            Ae.value === ke ? (m(), h("span", pc)) : O("", !0),
            v("button", {
              id: le(Y.id),
              type: "button",
              role: "tab",
              class: "dc-tab",
              "data-dc-panel": Y.kind === "panel" ? Y.id : void 0,
              "data-dc-space": Y.kind === "space" ? Y.title : void 0,
              "aria-selected": Y.index === o.value.index,
              "aria-controls": pe.value,
              tabindex: Y.index === o.value.index ? 0 : -1,
              onPointerdown: (ge) => Me(ge, Y),
              onClick: (ge) => qe(ge, Y),
              onKeydown: (ge) => Lt(ge, ke)
            }, [
              v("span", mc, C(Y.title), 1),
              Y.kind === "panel" && Y.panel.subtitle ? (m(), h("span", hc, C(Y.panel.subtitle), 1)) : O("", !0),
              r.value && Y.kind === "panel" && x(Y.id) ? (m(), h("span", {
                key: 1,
                class: "dc-tab__close",
                role: "button",
                tabindex: "-1",
                "aria-label": `Close ${Y.title}`,
                "data-dc-close": Y.id,
                onPointerdown: V[0] || (V[0] = Pe(() => {
                }, ["stop"])),
                onClick: (ge) => gt(ge, Y.id)
              }, [...V[9] || (V[9] = [
                v("span", { "aria-hidden": "true" }, "×", -1)
              ])], 40, _c)) : O("", !0)
            ], 40, vc)
          ], 64))), 128)),
          Ae.value === a.value.length ? (m(), h("span", gc)) : O("", !0)
        ], 8, fc),
        v("div", yc, [
          de(G),
          R.value.length ? (m(), be(Sn, {
            key: 0,
            items: R.value,
            label: `${f.value} menu`
          }, null, 8, ["items", "label"])) : O("", !0)
        ]),
        Z.value ? (m(), h("div", wc, [
          W.value && !N.value ? (m(), h("button", {
            key: 0,
            type: "button",
            class: "dc-pane__button dc-control",
            "aria-label": `Minimize ${f.value}`,
            "data-dc-minimize": _.value,
            onPointerdown: V[1] || (V[1] = Pe(() => {
            }, ["stop"])),
            onClick: V[2] || (V[2] = (Y) => E(n).toggleMinimize(_.value))
          }, [
            de(pt, { kind: "minimize" })
          ], 40, bc)) : O("", !0),
          W.value && !N.value ? (m(), h("button", {
            key: 1,
            type: "button",
            class: "dc-pane__button dc-control",
            "aria-label": `${A.value ? "Restore" : "Maximize"} ${f.value}`,
            "aria-pressed": A.value,
            "data-dc-maximize": _.value,
            onPointerdown: V[3] || (V[3] = Pe(() => {
            }, ["stop"])),
            onClick: V[4] || (V[4] = (Y) => E(n).toggleMaximize(_.value))
          }, [
            de(pt, {
              kind: A.value ? "restore" : "maximize"
            }, null, 8, ["kind"])
          ], 40, kc)) : O("", !0),
          !r.value && d.value && x(d.value.id) ? (m(), h("button", {
            key: 2,
            type: "button",
            class: "dc-pane__close dc-control",
            "aria-label": `Close ${f.value}`,
            "data-dc-close": d.value.id,
            onPointerdown: V[5] || (V[5] = Pe(() => {
            }, ["stop"])),
            onClick: V[6] || (V[6] = (Y) => E(n).close(d.value.id))
          }, [
            de(pt, { kind: "close" })
          ], 40, $c)) : O("", !0)
        ])) : O("", !0)
      ], 40, ic)),
      c.value ? (m(), h("div", {
        key: 1,
        id: pe.value,
        class: "dc-pane__space",
        role: w.value ? void 0 : "tabpanel",
        "aria-labelledby": w.value ? void 0 : le(o.value.id)
      }, [
        tt(F.$slots, "space", {
          node: c.value,
          path: y.value
        }, void 0, !0)
      ], 8, xc)) : (m(), h("div", {
        key: 2,
        id: pe.value,
        class: "dc-pane__body",
        role: w.value ? void 0 : "tabpanel",
        "aria-labelledby": w.value ? void 0 : le(l.value)
      }, [
        de(L)
      ], 8, Mc)),
      xe.value ? (m(), h("div", {
        key: 3,
        class: "dc-pane__drop",
        "data-dc-edge": xe.value,
        "aria-hidden": "true"
      }, null, 8, Cc)) : O("", !0)
    ], 40, oc)) : O("", !0);
  }
}), sa = /* @__PURE__ */ ue(Ec, [["__scopeId", "data-v-44fd2b2d"]]), Sc = ["data-dc-space", "data-dc-path", "aria-label"], Ac = {
  key: 0,
  class: "dc-space__head"
}, Pc = { class: "dc-space__title dc-truncate" }, zc = ["data-dc-direction"], Rc = {
  key: 0,
  class: "dc-space__drop",
  "aria-hidden": "true"
}, Fc = ["aria-orientation", "aria-label", "aria-valuenow", "aria-disabled", "tabindex", "onPointerdown", "onKeydown"], Tc = /* @__PURE__ */ ce({
  __name: "WindowNode",
  props: {
    node: {},
    path: {},
    framed: { type: Boolean }
  },
  setup(e) {
    const t = e, n = Vn(), s = B(null), a = g(() => K(t.node) ? t.node : null), r = g(() => _t(t.node) ? t.node : null), o = g(() => X(t.node) ? t.node : null), c = g(
      () => r.value ? r.value.children : o.value?.frames.map((L) => L.node) ?? []
    ), l = g(() => r.value ? Oe(r.value) : []), d = g(
      () => (o.value?.frames ?? []).map((L, G) => ({
        held: L,
        /** Place in the stack, counted from the back — what `z-index` follows. */
        order: G,
        key: x(L.node),
        path: [...t.path, G]
      })).sort((L, G) => L.key < G.key ? -1 : L.key > G.key ? 1 : 0)
    ), f = g(() => mt(t.node)), k = g(() => n.spaceMenu(t.path)), y = g(() => t.node.headless === !0), _ = g(() => o.value ? "desktop" : r.value?.direction ?? ""), $ = B(null), w = B(0);
    let M = null;
    Se(
      $,
      (L) => {
        M?.disconnect(), M = null, !(!L || typeof ResizeObserver > "u") && (w.value = L.clientWidth, M = new ResizeObserver(([G]) => {
          w.value = G?.contentRect.width ?? 0;
        }), M.observe(L));
      },
      { immediate: !0 }
    ), je(() => M?.disconnect());
    const z = g(() => {
      const L = Math.max(
        1,
        Math.floor((w.value + it) / (dn + it))
      ), G = /* @__PURE__ */ new Map();
      let ee = 0;
      for (const te of d.value)
        te.held.minimized === !0 && (G.set(te.key, {
          x: it + ee % L * (dn + it),
          bottom: it + Math.floor(ee / L) * (qs + it)
        }), ee += 1);
      return G;
    }), T = (L) => !!L && L.join("/") === t.path.join("/"), W = g(() => {
      const L = n.dropTarget.value, G = o.value;
      if (!G || !L?.rect || L.edge !== "float") return null;
      if (L.space) return T(L.space) ? L.rect : null;
      const ee = _e(G, L.panel);
      return ee && G.frames.includes(ee) ? L.rect : null;
    }), N = g(() => {
      const L = n.dropTarget.value;
      return !!L && !L.rect && T(L.space);
    }), I = g(() => r.value?.direction === "row"), R = g(() => c.value.map((L, G) => [...t.path, G])), x = (L) => [...Ke(L)].sort().join("/"), A = (L) => {
      const G = Ke(L)[0];
      return (G ? n.panelFor(G)?.title : null) ?? G ?? "panel";
    }, Z = (L) => {
      const G = c.value[L], ee = c.value[L + 1];
      return !G || !ee ? "Resize panels" : `Resize ${A(G)} and ${A(ee)}`;
    }, le = (L) => {
      const G = l.value[L] ?? 0, ee = l.value[L + 1] ?? 0, te = G + ee;
      return te > 0 ? Math.round(G / te * 100) : 50;
    };
    function pe() {
      const L = s.value, G = L ? I.value ? L.clientWidth : L.clientHeight : 0;
      return G <= 0 ? 0.05 : Math.min(n.minPanelSize.value / G, 0.4);
    }
    let j = null;
    function xe(L, G) {
      const ee = r.value, te = s.value;
      if (!n.resizable.value || !ee || !te || L.button !== 0) return;
      const ve = I.value ? te.clientWidth : te.clientHeight;
      if (ve <= 0) return;
      const Me = I.value ? L.clientX : L.clientY, qe = Oe(ee), Be = Math.min(n.minPanelSize.value / ve, 0.4);
      L.preventDefault();
      const We = (De) => {
        const Ie = ((I.value ? De.clientX : De.clientY) - Me) / ve;
        n.setSizes(t.path, is(qe, G, Ie, Be));
      }, Ue = () => j?.(), Le = (De) => {
        De.key === "Escape" && (n.setSizes(t.path, qe), j?.());
      };
      j = () => {
        window.removeEventListener("pointermove", We), window.removeEventListener("pointerup", Ue), window.removeEventListener("pointercancel", Ue), window.removeEventListener("keydown", Le), j = null;
      }, window.addEventListener("pointermove", We), window.addEventListener("pointerup", Ue), window.addEventListener("pointercancel", Ue), window.addEventListener("keydown", Le);
    }
    je(() => j?.());
    function Ae(L, G) {
      const ee = r.value;
      if (!n.resizable.value || !ee) return;
      const te = I.value ? "ArrowRight" : "ArrowDown", ve = I.value ? "ArrowLeft" : "ArrowUp", Me = L.shiftKey ? 0.1 : 0.02;
      if (L.key !== te && L.key !== ve) return;
      const qe = L.key === te ? Me : -Me;
      L.preventDefault(), n.setSizes(t.path, is(Oe(ee), G, qe, pe()));
    }
    return (L, G) => {
      const ee = fs("WindowNode", !0);
      return a.value ? (m(), be(sa, {
        key: 0,
        group: a.value,
        path: e.path
      }, {
        space: Ut(({ node: te, path: ve }) => [
          de(ee, {
            node: te,
            path: ve,
            framed: ""
          }, null, 8, ["node", "path"])
        ]),
        _: 1
      }, 8, ["group", "path"])) : (m(), h("section", {
        key: 1,
        class: "dc-space",
        "data-dc-space": _.value,
        "data-dc-path": e.path.join("/"),
        "aria-label": f.value
      }, [
        !e.framed && !y.value ? (m(), h("header", Ac, [
          v("span", Pc, C(f.value), 1),
          k.value.length ? (m(), be(Sn, {
            key: 0,
            items: k.value,
            label: `${f.value} menu`
          }, null, 8, ["items", "label"])) : O("", !0)
        ])) : O("", !0),
        o.value ? (m(), h("div", {
          key: 1,
          ref_key: "desktop",
          ref: $,
          class: "dc-window__desktop"
        }, [
          W.value ? (m(), h("div", {
            key: 0,
            class: "dc-window__drop",
            style: Te({
              left: `${W.value.x}px`,
              top: `${W.value.y}px`,
              width: `${W.value.w}px`,
              height: `${W.value.h}px`
            }),
            "aria-hidden": "true"
          }, null, 4)) : O("", !0),
          (m(!0), h(se, null, fe(d.value, (te) => (m(), be(rc, {
            key: te.key,
            frame: te.held,
            path: te.path,
            order: te.order,
            place: z.value.get(te.key) ?? null
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
        ], 512)) : r.value ? (m(), h("div", {
          key: 2,
          ref_key: "container",
          ref: s,
          class: "dc-window__split",
          "data-dc-direction": r.value.direction
        }, [
          N.value ? (m(), h("div", Rc)) : O("", !0),
          (m(!0), h(se, null, fe(c.value, (te, ve) => (m(), h(se, {
            key: x(te)
          }, [
            v("div", {
              class: "dc-window__cell",
              style: Te({ flexGrow: l.value[ve] ?? 1 })
            }, [
              de(ee, {
                node: te,
                path: R.value[ve] ?? []
              }, null, 8, ["node", "path"])
            ], 4),
            ve < c.value.length - 1 ? (m(), h("div", {
              key: 0,
              class: "dc-window__gutter",
              role: "separator",
              "aria-orientation": I.value ? "vertical" : "horizontal",
              "aria-label": Z(ve),
              "aria-valuenow": le(ve),
              "aria-valuemin": "0",
              "aria-valuemax": "100",
              "aria-disabled": E(n).resizable.value ? void 0 : "true",
              tabindex: E(n).resizable.value ? 0 : -1,
              onPointerdown: (Me) => xe(Me, ve),
              onKeydown: (Me) => Ae(Me, ve)
            }, null, 40, Fc)) : O("", !0)
          ], 64))), 128))
        ], 8, zc)) : O("", !0)
      ], 8, Sc));
    };
  }
}), Lc = /* @__PURE__ */ ue(Tc, [["__scopeId", "data-v-fb5b403f"]]), Dc = ["data-dc-theme", "data-dc-dragging", "data-dc-docking"], Ic = {
  key: 1,
  class: "dc-window__empty"
}, Nc = {
  class: "dc-window__live",
  "aria-live": "polite",
  role: "status"
}, Vt = 16, Vc = /* @__PURE__ */ ce({
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
    const s = e, a = n, r = Wt(e, "layout"), o = Wt(e, "views"), c = _n(), l = g(() => new Map(s.panels.map((i) => [i.id, i]))), d = g(() => s.panels.map((i) => i.id)), f = g(() => Ki(r.value, d.value)), k = B(null), y = B(null), _ = B(null), $ = B(!0), w = B(null), M = B(null), z = B(null), T = B(""), W = B(null);
    function N() {
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
    function R() {
      return N().map((i) => ({ pane: i, order: I(i.element) })).sort((i, u) => {
        const p = Math.max(i.order.length, u.order.length);
        for (let b = 0; b < p; b += 1) {
          const S = (i.order[b] ?? -1) - (u.order[b] ?? -1);
          if (S !== 0) return S;
        }
        return 0;
      }).map((i) => i.pane);
    }
    const x = (i) => N().find((u) => u.panels.includes(i)) ?? null;
    function A(i) {
      const u = l.value.get(i);
      if (!u) return "";
      const p = o.value[i];
      return p && u.views?.some((b) => b.key === p) ? p : u.defaultView ?? u.views?.[0]?.key ?? "";
    }
    function Z(i, u) {
      o.value = { ...o.value, [i]: u }, a("view-change", { panel: i, view: u });
    }
    const le = g(
      () => s.panels.filter((i) => i.fixed !== !0).length
    );
    function pe(i) {
      return !s.movable || le.value < 1 || s.panels.length < 2 ? !1 : l.value.get(i)?.fixed !== !0;
    }
    function j(i, u) {
      const p = f.value;
      !i || !p || i === p || (r.value = i, u && a("panel-move", u));
    }
    function xe(i, u, p) {
      if (i.width <= 0 || i.height <= 0) return "center";
      const b = (u - i.left) / i.width, S = (p - i.top) / i.height, P = 0.3;
      return b > P && b < 1 - P && S > P && S < 1 - P ? "center" : [
        { edge: "left", distance: b },
        { edge: "right", distance: 1 - b },
        { edge: "top", distance: S },
        { edge: "bottom", distance: 1 - S }
      ].reduce(
        (Q, D) => D.distance < Q.distance ? D : Q
      ).edge;
    }
    function Ae(i, u) {
      const p = [...i.querySelectorAll(".dc-tab")], b = p.findIndex((S) => {
        const P = S.getBoundingClientRect();
        return u < P.left + P.width / 2;
      });
      return b === -1 ? p.length : b;
    }
    function L(i, u, p) {
      for (const { panels: b, element: S } of R().reverse()) {
        const P = S.getBoundingClientRect();
        if (i < P.left || i > P.right || u < P.top || u > P.bottom) continue;
        const ae = b.find((U) => U !== p), Q = S.querySelector(".dc-pane__tabs"), D = Q?.getBoundingClientRect();
        if (Q && D && u >= D.top && u <= D.bottom)
          return ae ? { panel: ae, edge: "center", index: Ae(Q, i) } : null;
        const q = S.querySelector(":scope > .dc-pane__space");
        if (q) {
          const U = q.getBoundingClientRect();
          if (i >= U.left && i <= U.right && u >= U.top && u <= U.bottom) continue;
        }
        return ae ? { panel: ae, edge: xe(P, i, u) } : null;
      }
      return ee(i, u, p) ?? Me(i, u);
    }
    function G() {
      const i = W.value;
      return i ? [...i.querySelectorAll(".dc-window__desktop")].filter((u) => u.closest(".dc-window") === i).reverse() : [];
    }
    function ee(i, u, p) {
      const b = f.value;
      if (!b) return null;
      for (const S of G()) {
        const P = S.getBoundingClientRect();
        if (i < P.left || i > P.right || u < P.top || u > P.bottom) continue;
        const ae = qe(S), Q = ae.flatMap((ne) => ne.panels).find((ne) => ne !== p);
        if (!Q && ae.length > 0) return null;
        const D = _e(b, p)?.rect, q = nn(
          {
            x: i - P.left - 24,
            y: u - P.top - 12,
            w: D?.w ?? st.w,
            h: D?.h ?? st.h
          },
          { w: S.clientWidth, h: S.clientHeight },
          s.minPanelSize
        );
        if (Q) return { panel: Q, edge: "float", rect: q };
        const U = te(S);
        return U ? { panel: "", space: U, edge: "float", rect: q } : null;
      }
      return null;
    }
    function te(i) {
      const u = i.closest(".dc-space")?.getAttribute("data-dc-path");
      return u == null ? null : u === "" ? [] : u.split("/").map(Number);
    }
    function ve() {
      const i = W.value;
      return i ? [...i.querySelectorAll(".dc-space")].filter((u) => u.closest(".dc-window") === i).filter((u) => !u.querySelector(".dc-pane")).reverse().flatMap((u) => {
        const p = te(u);
        return p ? [{ element: u, path: p }] : [];
      }) : [];
    }
    function Me(i, u) {
      for (const { element: p, path: b } of ve()) {
        if (p.dataset.dcSpace === "desktop") continue;
        const S = p.getBoundingClientRect();
        if (!(i < S.left || i > S.right || u < S.top || u > S.bottom))
          return { panel: "", space: b, edge: "center" };
      }
      return null;
    }
    function qe(i) {
      return N().filter(
        (u) => u.element.closest(".dc-window__desktop") === i
      );
    }
    let Be = null;
    const We = (i) => i.altKey;
    function Ue(i, u) {
      if (!pe(i) || y.value || M.value || u.button !== 0) return;
      const p = u.clientX, b = u.clientY;
      let S = !1, P = We(u);
      const ae = () => {
        const re = z.value;
        re && (_.value = P ? ee(re.x, re.y, i) : L(re.x, re.y, i));
      }, Q = (re) => {
        if (!S) {
          if (Math.hypot(re.clientX - p, re.clientY - b) < 4) return;
          S = !0, y.value = i, w.value = null;
        }
        P = We(re), $.value = !P, z.value = { x: re.clientX, y: re.clientY }, ae();
      }, D = (re) => {
        We(re) !== P && (P = !P, $.value = !P, S && ae());
      }, q = (re) => {
        Be?.();
        const H = _.value, ye = f.value;
        if (re && S && H && ye) {
          const He = H.space ? ls(ye, i, H.space, H.rect) : H.edge === "float" && H.rect ? rs(ye, i, H.panel, H.rect) : Nt(ye, i, H.panel, H.edge, H.index);
          j(He, {
            panel: i,
            target: H.panel,
            edge: H.edge,
            ...H.space === void 0 ? {} : { space: H.space },
            ...H.index === void 0 ? {} : { index: H.index },
            ...H.rect === void 0 ? {} : { rect: H.rect }
          });
        }
        y.value = null, _.value = null, z.value = null, $.value = !0;
      }, U = () => q(!0), ne = () => q(!1), ie = (re) => {
        if (re.key === "Escape") {
          q(!1);
          return;
        }
        D(re);
      };
      Be = () => {
        window.removeEventListener("pointermove", Q), window.removeEventListener("pointerup", U), window.removeEventListener("pointercancel", ne), window.removeEventListener("keydown", ie), window.removeEventListener("keyup", D), Be = null;
      }, window.addEventListener("pointermove", Q), window.addEventListener("pointerup", U), window.addEventListener("pointercancel", ne), window.addEventListener("keydown", ie), window.addEventListener("keyup", D);
    }
    je(() => Be?.());
    let Le = null;
    function De(i) {
      const u = W.value;
      return u ? [...u.querySelectorAll(
        `.dc-float[data-dc-path="${i.join("/")}"]`
      )].find((S) => S.closest(".dc-window") === u)?.parentElement ?? null : null;
    }
    function Ie(i) {
      const u = f.value;
      return u ? vn(u, i) : null;
    }
    function gt(i) {
      const u = f.value;
      if (!u) return;
      const p = Ct(u, i);
      p !== u && (r.value = p);
    }
    function Lt(i) {
      const u = Ie(i);
      u && gt(u);
    }
    function F(i) {
      const u = f.value, p = u ? _e(u, i) : null;
      return p !== null && Ge(p);
    }
    function V(i) {
      const u = f.value, p = u ? _e(u, i) : null;
      return p !== null && et(p);
    }
    function Y(i) {
      const u = f.value, p = u ? Je(u, i) : null;
      return p ? we(p.node) : "";
    }
    function ke(i) {
      const u = f.value, p = u ? Je(u, i) : null;
      if (!u || !p) return;
      const b = we(p.node);
      if (l.value.get(b)?.fixed === !0) return;
      const S = !et(p);
      let P = Pi(u, i, S);
      P !== u && (S || (P = Ct(P, i)), r.value = P, a("frame-minimize", { panel: b, minimized: S }));
    }
    function ge(i) {
      const u = Ie(i);
      u && ke(u);
    }
    function yt(i) {
      const u = f.value, p = u ? Je(u, i) : null;
      if (!u || !p) return;
      const b = we(p.node);
      if (l.value.get(b)?.fixed === !0) return;
      const S = !Ge(p);
      let P = Ai(u, i, S);
      P !== u && (S && (P = Ct(P, i)), r.value = P, a("frame-maximize", { panel: b, maximized: S }));
    }
    function Kn(i) {
      const u = Ie(i);
      u && yt(u);
    }
    function qn(i, u, p) {
      const b = f.value, S = b ? Je(b, i) : null;
      if (!b || !S || u.button !== 0 || y.value || M.value) return;
      const P = we(S.node);
      if (l.value.get(P)?.fixed === !0 || Ge(S) || et(S) || (p === "move" ? !s.movable : !s.resizable)) return;
      const ae = De(i), Q = zi(b, i);
      gt(i);
      const D = { w: ae?.clientWidth ?? 0, h: ae?.clientHeight ?? 0 }, q = { ...S.rect }, U = u.clientX, ne = u.clientY, ie = s.minPanelSize;
      M.value = P;
      const re = (Ce) => {
        const Ne = f.value;
        if (!Ne) return;
        const wt = as(Ne, Q, nn(Ce, D, ie));
        wt !== Ne && (r.value = wt);
      }, H = (Ce) => {
        Ce.preventDefault();
        const Ne = Ce.clientX - U, wt = Ce.clientY - ne;
        re(
          p === "move" ? { ...q, x: q.x + Ne, y: q.y + wt } : ss(q, p, Ne, wt, ie)
        );
      }, ye = (Ce) => {
        if (Le?.(), M.value = null, !Ce) {
          re(q);
          return;
        }
        const Ne = f.value ? Je(f.value, Q) : null;
        Ne && a("frame-change", { panel: Y(Q), rect: Ne.rect });
      }, He = () => ye(!0), Qe = () => ye(!1), Ze = (Ce) => {
        Ce.key === "Escape" && ye(!1);
      };
      Le = () => {
        window.removeEventListener("pointermove", H), window.removeEventListener("pointerup", He), window.removeEventListener("pointercancel", Qe), window.removeEventListener("keydown", Ze), Le = null;
      }, window.addEventListener("pointermove", H), window.addEventListener("pointerup", He), window.addEventListener("pointercancel", Qe), window.addEventListener("keydown", Ze);
    }
    function aa(i, u, p) {
      const b = Ie(i);
      b && qn(b, u, p);
    }
    function ra(i, u, p = !1) {
      const b = f.value, S = Ie(i), P = b && S ? Je(b, S) : null;
      if (!b || !S || !P || l.value.get(i)?.fixed === !0 || (p ? !s.resizable : !s.movable)) return;
      if (Ge(P) || et(P)) {
        T.value = `${Re(i)} is ${Ge(P) ? "maximized" : "minimized"}, so it cannot be moved.`;
        return;
      }
      const ae = u === "left" ? -Vt : u === "right" ? Vt : 0, Q = u === "up" ? -Vt : u === "down" ? Vt : 0, D = De(S), q = { w: D?.clientWidth ?? 0, h: D?.clientHeight ?? 0 }, U = p ? ss(P.rect, "se", ae, Q, s.minPanelSize) : { ...P.rect, x: P.rect.x + ae, y: P.rect.y + Q }, ne = as(b, S, nn(U, q, s.minPanelSize));
      if (ne === b) {
        T.value = p ? `${Re(i)} cannot be resized further.` : `${Re(i)} cannot move ${u}.`;
        return;
      }
      r.value = ne;
      const ie = Je(ne, S);
      ie && (a("frame-change", { panel: i, rect: ie.rect }), T.value = p ? `${Re(i)} resized to ${ie.rect.w} by ${ie.rect.h}.` : `${Re(i)} moved to ${ie.rect.x}, ${ie.rect.y}.`);
    }
    je(() => Le?.());
    function la(i, u) {
      const p = x(i), b = p?.element.getBoundingClientRect();
      if (!p || !b) return null;
      const S = u === "left" || u === "right", P = (D) => {
        if (!(S ? D.bottom > b.top + 1 && D.top < b.bottom - 1 : D.right > b.left + 1 && D.left < b.right - 1)) return null;
        const U = u === "left" ? b.left - D.right : u === "right" ? D.left - b.right : u === "up" ? b.top - D.bottom : D.top - b.bottom;
        return U < -1 ? null : U;
      }, ae = [];
      for (const D of N()) {
        if (D === p || D.element === p.element) continue;
        const q = P(D.element.getBoundingClientRect());
        if (q === null) continue;
        const U = D.panels.find((ne) => ne !== i);
        U && ae.push({ to: { panel: U }, distance: q });
      }
      for (const { element: D, path: q } of ve()) {
        const U = P(D.getBoundingClientRect());
        U !== null && ae.push({ to: { space: q }, distance: U });
      }
      return ae.reduce(
        (D, q) => D && D.distance <= q.distance ? D : q,
        null
      )?.to ?? null;
    }
    function oa(i) {
      const u = f.value ? _e(f.value, i) !== null : !1;
      if (!u && !pe(i)) return;
      w.value = w.value === i ? null : i;
      const p = Re(i);
      if (!w.value) {
        T.value = `${p}: move mode off.`;
        return;
      }
      T.value = u ? `${p}: move mode on. Arrow keys move the window, shift and an arrow resize it, Escape leaves move mode.` : `${p}: move mode on. Arrow keys move the panel, shift and an arrow make it a tab of the panel that way, Escape leaves move mode.`;
    }
    const Re = (i) => l.value.get(i)?.title ?? i, ia = {
      left: "left",
      right: "right",
      up: "top",
      down: "bottom"
    };
    function ca(i, u, p = !1) {
      if (!pe(i)) return;
      const b = f.value;
      if (!b) return;
      const S = Re(i), P = ut(b, i);
      if (!p && P && (u === "left" || u === "right") && P.panels.length > 1) {
        const ne = P.panels.indexOf(i), ie = u === "left" ? ne - 1 : ne + 1;
        if (ie >= 0 && ie < P.panels.length) {
          j(Et(b, i, ie), { panel: i, target: i, edge: "center", index: ie }), T.value = `${S} moved ${u}, now tab ${ie + 1} of ${P.panels.length}.`, Zt(i);
          return;
        }
      }
      const Q = la(i, u);
      if (!Q || Q.panel !== void 0 && !pe(Q.panel)) {
        T.value = `${S} cannot move ${u}.`;
        return;
      }
      const D = ia[u];
      if (Q.space) {
        const ne = Q.space, ie = Ye(b, ne), re = _e(b, i)?.rect, H = { ...st, ...re ? { w: re.w, h: re.h } : {} };
        j(ls(b, i, ne, H), { panel: i, target: "", space: ne, edge: D }), T.value = `${S} moved ${u}, into ${ie ? mt(ie) : "the space"}.`, Zt(i);
        return;
      }
      const q = Q.panel, U = P?.panels.length === 1 && ut(b, q)?.panels.length === 1;
      p ? (j(Nt(b, i, q, "center"), {
        panel: i,
        target: q,
        edge: "center"
      }), T.value = `${S} joined ${Re(q)} as a tab.`) : U ? (j(Kt(b, i, q), { panel: i, target: q, edge: D }), T.value = `${S} moved ${u}, trading places with ${Re(q)}.`) : (j(Nt(b, i, q, D), { panel: i, target: q, edge: D }), T.value = `${S} moved ${u}, beside ${Re(q)}.`), Zt(i);
    }
    function Zt(i) {
      At(() => {
        x(i)?.element.querySelector(".dc-pane__grip")?.focus();
      });
    }
    function ua(i, u) {
      const p = f.value;
      p && (r.value = qt(p, i, u));
    }
    function Jt(i) {
      const u = f.value;
      if (!u) return;
      const p = ft(u, i);
      p !== u && (r.value = p, a("tab-select", { panel: i }));
    }
    function Bn(i) {
      return l.value.get(i)?.closable ?? s.closable;
    }
    function da(i) {
      Bn(i) && a("panel-close", i);
    }
    const en = B(/* @__PURE__ */ new Map());
    let fa = 0;
    function pa(i, u) {
      const p = fa += 1;
      return en.value.set(p, { panel: i, items: u }), () => {
        en.value.delete(p);
      };
    }
    function va(i) {
      const u = [];
      for (const p of en.value.values())
        p.panel() === i && u.push(...p.items());
      return u;
    }
    function Wn(i) {
      const u = i.filter((p) => p.items.length > 0);
      return u.length < 2 ? u.flatMap((p) => p.items) : u.flatMap((p) => [
        { id: p.id, heading: !0, label: p.title },
        ...p.items
      ]);
    }
    const Un = (i) => i.title || "These tabs";
    function ma(i, u) {
      const p = u.id, b = ut(i, p), S = (b?.panels.length ?? 0) > 1, P = b?.fixedView === !0, ae = (U) => ({
        action: () => {
          U !== i && (r.value = U);
        }
      }), Q = [], D = [], q = u.views ?? [];
      if (q.length > 1 && !P) {
        const U = A(p);
        Q.push({
          id: "view",
          label: "View",
          items: q.map((ne) => ({
            id: `view-${ne.key}`,
            label: ne.label,
            checked: ne.key === U,
            action: () => Z(p, ne.key)
          }))
        });
      }
      return S && !P && D.push(
        { id: "show-row", label: "Row", checked: !1, ...ae(os(i, p, "row")) },
        {
          id: "show-column",
          label: "Column",
          checked: !1,
          ...ae(os(i, p, "column"))
        },
        // Already true, and nothing to collapse: these panes are tabs. Ticked
        // and choosable all the same — collapsing a strip into a strip hands
        // back the tree it was given, so it is the no-op it looks like.
        {
          id: "show-tabs",
          label: "Tabs",
          checked: !0,
          ...ae(Li(i, p))
        },
        {
          id: "show-desktop",
          label: "Desktop",
          checked: !1,
          ...ae(Di(i, p))
        }
      ), S && b && (D.length && D.push({ separator: !0 }), D.push(...Hn(b, p))), { panel: Q, tabs: D, tabsTitle: b ? Un(b) : "" };
    }
    function Hn(i, u) {
      const p = ot(i), b = (S) => {
        const P = i.panels[(p + S + i.panels.length) % i.panels.length];
        return (P === void 0 ? "" : we(P)) || u;
      };
      return [
        { id: "next-tab", label: "Next tab", action: () => Jt(b(1)) },
        { id: "previous-tab", label: "Previous tab", action: () => Jt(b(-1)) }
      ];
    }
    function Dt(i) {
      return i.title ? i.title : K(i) ? i.panels.length > 1 ? "these tabs" : "the strip" : mt(i);
    }
    function Xn(i) {
      if (!i || X(i) || i.fixedView === !0 || !i.title && i.headless !== !0 || ze(i)) return null;
      const u = na(i);
      return u && u.fixedView !== !0 ? u : null;
    }
    function ha(i) {
      const u = f.value;
      if (!s.menu || !u) return [];
      const p = Ye(u, i);
      if (!p || K(p)) return [];
      if (p.fixedView) return [];
      const b = X(p) ? "desktop" : p.direction, S = (H, ye, He) => ({
        id: `show-${H}`,
        label: ye,
        checked: b === H,
        action: () => {
          const Qe = f.value, Ze = He();
          !Qe || Ze === p || (r.value = Yt(he(rt(Qe, i, Ze))));
        }
      }), P = () => {
        const H = Zs(p, _a(p));
        if (K(H) && H.panels.length === 0) return p;
        const ye = K(H) && H.panels.length === 1 ? H.panels[0] : void 0;
        return ye !== void 0 && oe(ye) ? p : H;
      }, ae = (H) => () => X(p) ? ta(p, H) : p.direction === H ? p : { ...p, direction: H }, Q = i.slice(0, -1), D = i.length > 0 ? Ye(u, Q) : null, q = D && K(D) && D.panels.length > 1 ? D : null, U = D && Xn(D) === p ? D : null, ne = Xn(p), ie = p.title || "this space", re = (H, ye, He, Qe, Ze) => ({
        id: H,
        label: Ze,
        action: () => {
          const Ce = f.value;
          Ce && (r.value = Yt(he(rt(Ce, ye, Vi(He, Qe)))));
        }
      });
      return Wn([
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
            S("tabs", "Tabs", () => P()),
            S("desktop", "Desktop", () => X(p) ? p : ea(p))
          ]
        },
        {
          id: "about-around",
          title: ne ? `Around ${Dt(ne)}` : "",
          items: ne ? [
            // Keeping this space's bar drops the one inside, so it is offered
            // only where the space inside has no name to be dropped with it.
            ...ne.title ? [] : [re("merge-around-keep-this", i, p, "outer", `Keep ${ie}`)],
            ...p.title ? [] : [re("merge-around-keep-that", i, p, "inner", `Keep ${Dt(ne)}`)]
          ] : []
        },
        {
          id: "about-inside",
          title: U ? `Inside ${Dt(U)}` : "",
          items: U ? [
            ...p.title ? [] : [re("merge-inside-keep-that", Q, U, "outer", `Keep ${Dt(U)}`)],
            ...U.title ? [] : [re("merge-inside-keep-this", Q, U, "inner", `Keep ${ie}`)]
          ] : []
        },
        {
          id: "about-tabs",
          title: q ? Un(q) : "",
          items: q ? Hn(q, we(p)) : []
        }
      ]);
    }
    function _a(i) {
      const u = k.value;
      return u && J(i, u) ? u : void 0;
    }
    function ga(i) {
      const u = f.value, p = l.value.get(i);
      if (!u || !p) return [];
      const b = s.menu ? ma(u, p) : null, S = va(i);
      S.length && b?.panel.length && S.push({ separator: !0 }), b && S.push(...b.panel);
      const P = Wn([
        { id: "about-panel", title: p.title, items: S },
        { id: "about-tabs", title: b?.tabsTitle ?? "", items: b?.tabs ?? [] }
      ]);
      return s.paneMenu ? s.paneMenu(p, P) : P;
    }
    function ya(i, u) {
      return c[`${i}-${u}`] ?? c[i];
    }
    function Gn(i, u, p, b) {
      return ya(i, u.id)?.({ panel: u, view: p, active: b });
    }
    qi({
      panelFor: (i) => l.value.get(i) ?? null,
      viewFor: A,
      setView: Z,
      movable: g(() => s.movable),
      resizable: g(() => s.resizable),
      minPanelSize: g(() => s.minPanelSize),
      spaceNames: g(() => s.spaceNames),
      focused: k,
      dragging: y,
      dropTarget: _,
      moving: w,
      framing: M,
      canMove: pe,
      focus(i) {
        k.value !== i && (k.value = i, a("panel-activate", i));
      },
      selectPanel: Jt,
      beginDrag: Ue,
      toggleMoveMode: oa,
      nudge: ca,
      setSizes: ua,
      frameOf: (i) => f.value ? _e(f.value, i) : null,
      beginFrameDrag: aa,
      nudgeFrame: ra,
      raise: Lt,
      maximized: F,
      toggleMaximize: Kn,
      minimized: V,
      toggleMinimize: ge,
      beginFrameDragAt: qn,
      raiseAt: gt,
      toggleMaximizeAt: yt,
      toggleMinimizeAt: ke,
      menuFor: ga,
      spaceMenu: ha,
      registerMenu: pa,
      closable: Bn,
      close: da,
      renderContent: (i, u, p) => Gn("panel", i, u, p),
      renderActions: (i, u, p) => Gn("actions", i, u, p),
      layout: f
    });
    const wa = g(() => {
      if (!(!s.accent && !s.tokens))
        return { ...s.tokens, ...s.accent ? { "--dc-accent": s.accent } : {} };
    }), ba = () => {
      const i = y.value, u = z.value;
      return !i || !u ? null : Ea(
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
      layout: f,
      /** Moves a panel programmatically — the same operation a drag performs. */
      move(i, u, p, b) {
        const S = f.value;
        S && j(Nt(S, i, u, p, b), {
          panel: i,
          target: u,
          edge: p,
          ...b === void 0 ? {} : { index: b }
        });
      },
      /** Brings a panel's tab to the top of its group. */
      select(i) {
        const u = f.value;
        u && (r.value = ft(u, i));
      },
      /** Lifts a panel onto the float holding `near`, as a window of its own. */
      float(i, u, p) {
        const b = f.value;
        b && j(rs(b, i, u, p), {
          panel: i,
          target: u,
          edge: "float",
          rect: p
        });
      },
      /** Puts a floating frame somewhere else, or makes it another size. */
      setRect(i, u) {
        const p = f.value;
        if (!p) return;
        const b = Ci(p, i, u);
        if (b === p) return;
        r.value = b;
        const S = _e(b, i);
        S && a("frame-change", { panel: i, rect: S.rect });
      },
      /**
       * Puts a panel on one of its views, the way its menu would — the way a pane
       * whose space fixed its view, or took its bar away, is switched at all.
       */
      setView: Z,
      /** Brings a floating frame to the front of its stack. */
      raise: Lt,
      /** Fills the float with a window, or puts it back where it was. */
      toggleMaximize: Kn,
      /** Rolls a window up to its title bar, or unrolls it. */
      toggleMinimize: ge
    }), (i, u) => (m(), h("div", {
      ref_key: "root",
      ref: W,
      class: "dc-shell dc-window",
      "data-dc-theme": e.theme,
      "data-dc-dragging": y.value ? "true" : "false",
      "data-dc-docking": $.value ? "true" : "false",
      style: Te(wa.value)
    }, [
      f.value ? (m(), be(Lc, {
        key: 0,
        node: f.value,
        path: []
      }, null, 8, ["node"])) : (m(), h("p", Ic, " This window has no panels. ")),
      de(ba),
      v("p", Nc, C(T.value), 1)
    ], 12, Dc));
  }
}), Oc = /* @__PURE__ */ ue(Vc, [["__scopeId", "data-v-711565af"]]);
function au(e = "", t = "/") {
  const n = B(Ve(e)), s = B(t), a = [`${s.value}${n.value}`];
  return {
    search: n,
    path: s,
    history: a,
    push(r) {
      n.value = Ve(r), a.push(`${s.value}${n.value}`);
    },
    replace(r) {
      n.value = Ve(r), a[a.length - 1] = `${s.value}${n.value}`;
    }
  };
}
function us(e) {
  const t = e.indexOf("?");
  if (t === -1) return "";
  const n = e.slice(t), s = n.indexOf("#");
  return Ve(s === -1 ? n : n.slice(0, s));
}
function ru(e) {
  const t = B(us(e.currentRoute.value.fullPath)), n = g(() => e.currentRoute.value.path), s = Se(
    () => e.currentRoute.value.fullPath,
    (a) => {
      t.value = us(a);
    }
  );
  return {
    search: t,
    path: n,
    push: (a) => e.push(`${n.value}${Ve(a)}`),
    replace: (a) => e.replace(`${n.value}${Ve(a)}`),
    dispose: s
  };
}
const Kc = {
  DataShell: li,
  ShellHeader: Es,
  QueryPanel: As,
  ResultsArea: Vs,
  FacetControl: Ss,
  SegmentedControl: cn,
  StatusPill: Pt,
  ScoreMeter: Ls,
  WindowFrame: Oc,
  WindowPane: sa,
  ListView: un,
  CardsView: Rs,
  GridView: Fs,
  TableView: Is,
  LinksView: Ts,
  PreviewView: Ds,
  TypeCardsView: Ns
}, lu = {
  install(e, t = {}) {
    const n = t.prefix ?? "";
    for (const [s, a] of Object.entries(Kc))
      e.component(`${n}${s}`, a);
    t.route && e.provide(ps, t.route);
  }
};
export {
  Gt as CASCADE_STEP,
  Rs as CardsView,
  st as DEFAULT_FRAME,
  Wc as DEFAULT_SORT,
  Aa as DEFAULT_VIEW,
  li as DataShell,
  $s as ENTITY_ALL,
  on as ENTITY_TERM,
  Cn as FACET_PREFIX,
  Ss as FacetControl,
  Ps as GENERIC_LABELS,
  Fs as GridView,
  lu as HeaderContentLayoutPlugin,
  Ts as LinksView,
  un as ListView,
  it as MINIMIZED_GAP,
  qs as MINIMIZED_HEIGHT,
  dn as MINIMIZED_WIDTH,
  Ks as MIN_FRAME,
  Jn as MOCK_TINTS,
  Hc as MenuBar,
  Sn as MenuButton,
  Os as MenuList,
  On as PANE_CONTEXT_KEY,
  xn as PARAM_DIR,
  bn as PARAM_ENTITY,
  Mn as PARAM_EXPR,
  $n as PARAM_SORT,
  kn as PARAM_VIEW,
  En as PinStar,
  Ds as PreviewView,
  As as QueryPanel,
  jn as RECORD_STATUSES,
  ps as ROUTE_ADAPTER_KEY,
  Vs as ResultsArea,
  ks as SHELL_CONTEXT_KEY,
  Bc as SHELL_THEMES,
  Ls as ScoreMeter,
  cn as SegmentedControl,
  Es as ShellHeader,
  Pt as StatusPill,
  Is as TableView,
  Ns as TypeCardsView,
  vs as VIEW_KINDS,
  Nn as WINDOW_CONTEXT_KEY,
  Oc as WindowFrame,
  sa as WindowPane,
  Ws as activePanel,
  ot as activeTab,
  xi as axisOf,
  zn as cascade,
  nn as clampRect,
  Zs as collapseSpace,
  Li as collapseToTabs,
  Gc as column,
  Sa as createHistoryAdapter,
  au as createMemoryAdapter,
  Ba as createMockDataSource,
  ru as createVueRouterAdapter,
  cs as defaultLayout,
  wn as defaultQuery,
  ls as dropIntoSpace,
  Xt as emptyFacetState,
  gn as emptyFacetValue,
  ct as findEntity,
  nt as findSort,
  jc as fixedView,
  Pn as float,
  rs as floatPanel,
  ea as floatSplit,
  Di as floatTabs,
  Qn as fnv1a,
  hs as focusEntity,
  Da as formatDate,
  Zn as formatMetric,
  Ia as formatOrdinal,
  bs as formatPercent,
  jt as frame,
  Je as frameAt,
  _e as frameOf,
  vn as framePathOf,
  we as frontPanel,
  Oa as generateRows,
  Xc as group,
  ut as groupOf,
  Mi as groups,
  ys as hasActiveFacets,
  J as hasPanel,
  Yc as headless,
  $t as insertPanel,
  Mt as isChoosable,
  Uc as isEntityScoped,
  gs as isFacetActive,
  X as isFloat,
  K as isGroup,
  Ge as isMaximized,
  et as isMinimized,
  oe as isPanelTab,
  yn as isPristineQuery,
  _t as isSplit,
  Ee as isTabOf,
  ms as isViewKind,
  La as matchesExpression,
  Ka as matchesFacets,
  Ei as maximizeFrame,
  Ai as maximizeFrameAt,
  Vi as mergeSpace,
  Si as minimizeFrame,
  Pi as minimizeFrameAt,
  Nt as movePanel,
  Et as moveTab,
  Ye as nodeAt,
  St as nodeTitle,
  he as normalizeLayout,
  Ve as normalizeSearch,
  Dn as normalizeSizes,
  na as onlySpace,
  Ke as panelIds,
  Fe as panelNode,
  ns as panelTabs,
  Ra as parseExpression,
  ja as parseQuery,
  zs as presentRow,
  lc as providePaneContext,
  Wa as provideShellContext,
  qi as provideWindowContext,
  sn as raiseFrame,
  Ct as raiseFrameAt,
  zi as raisedPath,
  ws as reconcileFacets,
  Ki as reconcileLayout,
  at as removePanel,
  rt as replaceAt,
  ss as resizeRect,
  is as resizeSplit,
  Yt as rootSpace,
  Fn as row,
  ts as serializeQuery,
  ft as setActivePanel,
  Ci as setFrameRect,
  as as setFrameRectAt,
  qt as setSizesAt,
  Jc as setSplitDirection,
  Oe as sizesOf,
  _s as sortsFor,
  me as spaceChrome,
  mt as spaceTitle,
  Rn as split,
  os as spreadTabs,
  Za as summarizeQuery,
  Cs as summaryTerms,
  Kt as swapPanels,
  An as tabNode,
  Rt as tabPanels,
  ta as tileFloat,
  eu as toFloat,
  tu as toTiled,
  Qc as toggleMaximized,
  Zc as toggleMinimized,
  Ao as useEntityPreviews,
  nu as usePaneContext,
  su as usePaneMenu,
  ht as usePresentedRows,
  Ja as useQueryState,
  er as useResults,
  $e as useShellContext,
  rl as useViewLabels,
  Vn as useWindowContext
};
