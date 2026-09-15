import { ref as U, inject as bt, provide as Dn, computed as v, toValue as At, shallowRef as It, watch as $e, onScopeDispose as qs, defineComponent as pe, onBeforeUnmount as Ze, openBlock as f, createElementBlock as m, createElementVNode as w, toDisplayString as A, Fragment as Q, renderList as ce, createCommentVNode as z, unref as E, withKeys as ct, withModifiers as Fe, normalizeStyle as Re, renderSlot as be, withDirectives as Cn, vModelText as Mn, useSlots as Vt, nextTick as Ot, createBlock as re, createTextVNode as Ue, createVNode as ye, withCtx as We, resolveDynamicComponent as In, normalizeClass as un, createSlots as sn, useModel as Tt, useId as Ws, mergeModels as dn, Comment as ul, Text as dl, onMounted as fl, resolveComponent as Us, getCurrentScope as pl, h as vl } from "vue";
const Hs = Symbol("dc.routeAdapter");
function Ye(e) {
  if (!e) return "";
  const t = e.replace(/^[?]/, "");
  return t ? `?${t}` : "";
}
function ml() {
  const e = typeof window < "u", t = U(e ? Ye(window.location.search) : ""), n = U(e ? window.location.pathname : "/"), s = () => {
    t.value = Ye(window.location.search), n.value = window.location.pathname;
  };
  e && window.addEventListener("popstate", s);
  const a = (l, r) => {
    const o = Ye(l);
    if (!e) {
      t.value = o;
      return;
    }
    const i = `${window.location.pathname}${o}${window.location.hash}`;
    r === "push" ? window.history.pushState(window.history.state, "", i) : window.history.replaceState(window.history.state, "", i), t.value = o, n.value = window.location.pathname;
  };
  return {
    search: t,
    path: n,
    push: (l) => a(l, "push"),
    replace: (l) => a(l, "replace"),
    dispose: () => {
      e && window.removeEventListener("popstate", s);
    }
  };
}
const js = ["list", "cards", "grid", "table", "links", "preview"], Ed = [
  "minimal",
  "mono-size",
  "dark",
  "light",
  "auto",
  "macos",
  "windows",
  "inherit"
], en = ["ok", "running", "queued", "review", "failed"], Pd = [
  "identity",
  "reference",
  "metric",
  "state",
  "updated",
  "image",
  "tint"
], Ad = [480, 620, 760, 900, 1100], hl = "cards", Sn = "updated";
function Xs(e) {
  return typeof e == "string" && js.includes(e);
}
const _l = {
  list: "List",
  cards: "Cards",
  grid: "Grid",
  table: "Table",
  links: "Links",
  preview: "Preview"
};
function Gs(e, t) {
  const [n] = t ?? [];
  return n === void 0 || t?.includes(e) ? e : n;
}
function _t(e, t) {
  return t ? e.entities.find((n) => n.key === t) ?? null : null;
}
function Ys(e, t = {}) {
  const n = _t(e, t.entity), s = e.entities[0];
  if (!n && !s) throw new Error(`Schema "${e.key}" declares no entities`);
  return n ?? s;
}
function Qs(e, t = null) {
  return e?.columns ?? t?.columns ?? [];
}
function Zs(e, t = null) {
  if (e?.sorts?.length) return e.sorts;
  const n = /* @__PURE__ */ new Set(), s = [];
  for (const a of Qs(e, t))
    !a.sort || n.has(a.sort) || (n.add(a.sort), s.push({ key: a.sort, label: (a.label ?? a.sort).toLowerCase() }));
  return s;
}
const gl = { key: Sn, label: Sn };
function nt(e, t, n = null) {
  const s = Zs(e, n);
  return (t ? s.find((l) => l.key === t) : void 0) ?? s.find((l) => l.key === Sn) ?? s[0] ?? gl;
}
function On(e) {
  switch (e.kind) {
    case "chips":
      return { kind: "chips", selected: [] };
    case "range":
      return { kind: "range", min: null, max: null };
    case "toggle":
      return { kind: "toggle", on: !1 };
  }
}
function Bt(e) {
  const t = {};
  for (const n of e?.facets ?? []) t[n.key] = On(n);
  return t;
}
function Js(e) {
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
function ea(e) {
  return Object.values(e).some(Js);
}
function Bn(e) {
  return e.entity === null && e.expr.trim() === "" && !ea(e.facets);
}
function zd(e) {
  return e.entity !== null;
}
function Kn(e) {
  return e.entity === null && e.view === "cards";
}
function yl(e, t) {
  return t <= 0 ? 1 : Math.max(1, Math.ceil(e / t));
}
function Vn(e, t = {}) {
  const s = t.landing === "entity" ? Ys(e, t) : null;
  return {
    entity: s?.key ?? null,
    view: t.view && Xs(t.view) ? t.view : hl,
    sort: nt(s, t.sort).key,
    dir: t.dir === "asc" ? "asc" : "desc",
    expr: "",
    facets: Bt(s),
    page: 1
  };
}
const ta = ["entity", "sort", "dir", "expr", "facets"];
function ks(e) {
  return ta.some((t) => t in e);
}
function na(e, t) {
  const n = {};
  for (const s of e?.facets ?? []) {
    const a = t[s.key];
    n[s.key] = a && a.kind === s.kind ? a : On(s);
  }
  return n;
}
function an(e) {
  let t = 2166136261;
  for (let n = 0; n < e.length; n++)
    t ^= e.charCodeAt(n), t = Math.imul(t, 16777619);
  return Math.abs(t);
}
function wl(e) {
  if (!Number.isFinite(e)) return "—";
  const t = Math.abs(e);
  return t >= 1e6 ? `${(e / 1e6).toFixed(1)}m` : t >= 1e3 ? `${(e / 1e3).toFixed(1)}k` : String(Math.round(e));
}
function mt(e) {
  return Number.isFinite(e) ? Math.round(e).toLocaleString("en-US") : "—";
}
function kl(e) {
  const t = new Date(e);
  if (Number.isNaN(t.getTime())) return "—";
  const n = String(t.getUTCDate()).padStart(2, "0"), s = String(t.getUTCMonth() + 1).padStart(2, "0");
  return `${n}.${s}.${t.getUTCFullYear()}`;
}
function bl(e) {
  return String(e + 1).padStart(2, "0");
}
const En = "—";
function Oe(e, t) {
  return e.find((n) => n.role === t);
}
function sa(e, t) {
  return e.filter((n) => n.role === t);
}
function $l(e, t) {
  const n = (t ? t.columns : e?.columns) ?? [], s = t ? "scoped" : "everything";
  return n.filter(
    (a) => a.role !== "tint" && ((a.when ?? "always") === "always" || a.when === s)
  );
}
const xl = ["id", "entityKey", "entityLabel"];
function De(e, t) {
  if (e.value) return e.value(t);
  const n = e.field ?? e.key;
  if (n !== void 0) {
    if (t.fields && n in t.fields) return t.fields[n];
    if (xl.includes(n))
      return t[n];
  }
}
function bs(e, t) {
  const n = e.key ?? e.field ?? e.label;
  return n?.trim() ? n.trim() : `column-${t}`;
}
function Cl(e, t) {
  return e.id?.trim() ? e.id : `${e.entityKey || "row"}-${t}`;
}
function Ml(e, t) {
  if (e == null || e === "") return En;
  if (t === "number") {
    const n = typeof e == "number" ? e : Number(e);
    return Number.isFinite(n) ? wl(n) : String(e);
  }
  return t === "date" ? kl(String(e)) : Array.isArray(e) ? e.length ? e.join(", ") : En : String(e);
}
function qt(e, t) {
  const n = De(e, t);
  return e.format ? e.format(n, t) : Ml(n, e.kind);
}
function Sl(e) {
  return typeof e == "number" ? Number.isFinite(e) ? String(e) : "" : typeof e == "string" ? e : Array.isArray(e) ? e.join(", ") : "";
}
function aa(e, t) {
  const n = qt(e, t), s = Sl(De(e, t));
  return s && s !== n ? s : n;
}
function ln(e, t) {
  return e ? qt(e, t) : "";
}
function $s(e) {
  return e.align ? e.align : e.kind === "number" || e.kind === "ordinal" ? "right" : "left";
}
const El = {
  ordinal: "dc-table__num",
  number: "dc-table__number",
  date: "dc-table__date",
  status: "dc-table__state"
};
function xs(e) {
  return [El[e.kind ?? "text"], e.class].filter(Boolean).join(" ");
}
function Pn(e) {
  if (e.truncate !== void 0) return e.truncate;
  const t = e.kind ?? "text";
  return t === "text" || t === "number" || t === "date";
}
const Pl = /^([A-Za-z_][\w.-]*)\s*(>=|<=|:|=|>|<)\s*(.*)$/;
function Al(e) {
  const t = [];
  let n = "", s = null;
  const a = () => {
    n && t.push(n), n = "";
  };
  for (let l = 0; l < e.length; l++) {
    const r = e[l];
    if (s) {
      r === s ? s = null : n += r;
      continue;
    }
    if (r === '"' || r === "'") {
      s = r;
      continue;
    }
    if (/\s/.test(r)) {
      if (/(?:>=|<=|[:=><])$/.test(n) || e.slice(l + 1).match(/^\s*(>=|<=|[:=><])/) && n) continue;
      a();
      continue;
    }
    n += r;
  }
  return a(), t;
}
function at(e) {
  const t = e.trim();
  if (!t) return [];
  const n = [];
  let s = [];
  for (const a of Al(t)) {
    const l = a.toUpperCase();
    if (l === "AND" || l === "&&") continue;
    if (l === "OR" || l === "||") {
      s.length && n.push(s), s = [];
      continue;
    }
    const r = a.length > 1 && a.startsWith("-"), o = r ? a.slice(1) : a, i = r ? { negated: !0 } : {}, u = Pl.exec(o);
    u && u[3] !== "" ? s.push({
      kind: "field",
      field: u[1].toLowerCase(),
      comparator: u[2],
      value: u[3],
      ...i
    }) : s.push({ kind: "text", value: o, ...i });
  }
  return s.length && n.push(s), n;
}
const wn = (e) => e.toLowerCase().replace(/\s+/g, ""), zl = [
  ["status", "state"],
  ["state", "state"],
  ["updated", "updated"],
  ["date", "updated"],
  ["name", "identity"],
  ["ref", "reference"]
];
function Tl(e, t, n) {
  const s = wn(e), a = n.columns ?? [];
  if (s === "entity") return t.entityKey;
  if (e in t.fields) return t.fields[e];
  const l = a.find(
    (u) => u.key === e || u.field === e || u.label !== void 0 && wn(u.label) === s
  );
  if (l) return De(l, t);
  const r = n.facets.find((u) => wn(u.label) === s);
  if (r && r.key in t.fields) return t.fields[r.key];
  const o = zl.find(([u]) => u === s)?.[1];
  if (o) {
    const u = Oe(a, o);
    if (u) return De(u, t);
  }
  const i = /^metric(\d+)$/.exec(s);
  if (i) {
    const u = sa(a, "metric")[Number(i[1]) - 1];
    if (u) return De(u, t);
  }
}
function kn(e, t) {
  const n = e.toLowerCase(), s = t.toLowerCase();
  if (!s.includes("*")) return n.includes(s);
  const a = s.replace(/[.+?^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*");
  return new RegExp(a).test(n);
}
function Cs(e, t) {
  return e.toLowerCase() === t.toLowerCase();
}
function Rl(e, t, n) {
  if (e.kind === "text") {
    const r = n.columns ?? [];
    return ["identity", "reference"].some((o) => {
      const i = Oe(r, o), u = i ? De(i, t) : void 0;
      return typeof u == "string" && kn(u, e.value);
    });
  }
  const s = Tl(e.field, t, n);
  if (s === void 0) return null;
  if (Array.isArray(s))
    return e.comparator === ":" || e.comparator === "=" ? s.some(
      (o) => e.comparator === "=" ? Cs(String(o), e.value) : kn(String(o), e.value)
    ) : null;
  if (e.comparator === ":" || e.comparator === "=") {
    if (typeof s == "boolean") {
      const r = e.value.toLowerCase();
      return r === "true" || r === "yes" ? s : r === "false" || r === "no" ? !s : null;
    }
    if (typeof s == "number") {
      const r = Number(e.value);
      return Number.isFinite(r) ? s === r : null;
    }
    return e.comparator === "=" ? Cs(String(s), e.value) : kn(String(s), e.value);
  }
  const a = Number(e.value), l = typeof s == "number" ? s : Number(s);
  return !Number.isFinite(a) || !Number.isFinite(l) ? null : Fl(e.comparator, l, a);
}
function Ll(e, t, n) {
  const s = Rl(e, t, n);
  return s === null ? !0 : e.negated ? !s : s;
}
function Fl(e, t, n) {
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
function Nl(e, t, n) {
  return e.length ? e.some((s) => s.every((a) => Ll(a, t, n))) : !0;
}
function Ms(e) {
  return /[\s"']/.test(e) ? `"${e.replace(/["']/g, "")}"` : e;
}
function Wt(e) {
  const t = e.negated ? "-" : "";
  return e.kind === "text" ? t + Ms(e.value) : `${t}${e.field}${e.comparator}${Ms(e.value)}`;
}
function Td(e) {
  if (!e.negated) return { ...e, negated: !0 };
  const { negated: t, ...n } = e;
  return n;
}
function Rt(e) {
  return e.filter((t) => t.length).map((t) => t.map(Wt).join(" ")).join(" OR ");
}
function Dl(e, t, n) {
  return e.map((s, a) => a === t ? s.filter((l, r) => r !== n) : s).filter((s) => s.length);
}
function Il(e) {
  const t = at(e);
  if (t.length > 1) return { parts: [], text: e.trim() };
  const n = t[0] ?? [];
  return {
    parts: n.filter((s) => s.kind === "field"),
    text: n.filter((s) => s.kind === "text").map(Wt).join(" ")
  };
}
function Ss(e, t) {
  return [...e.map(Wt), t.trim()].filter(Boolean).join(" ");
}
const Es = (e, t) => e.toLowerCase() === t.toLowerCase();
function la(e, t) {
  return !!e.negated == !!t.negated && ra(e, t);
}
function Ps(e, t) {
  return !!e.negated != !!t.negated && ra(e, t);
}
function ra(e, t) {
  return e.kind === "field" ? t.kind === "field" && e.field === t.field && e.comparator === t.comparator && Es(e.value, t.value) : t.kind === "text" && Es(e.value, t.value);
}
function Ol(e, t) {
  return t.filter((n) => !e.some((s) => la(s, n)));
}
function oa(e, t) {
  const n = at(e), s = at(t);
  return n.length ? s.length ? Rt(
    n.flatMap((a) => s.map((l) => [...a, ...Ol(a, l)]))
  ) : Rt(n) : Rt(s);
}
const As = [
  "oklch(0.36 0.06 240)",
  "oklch(0.34 0.07 290)",
  "oklch(0.36 0.06 160)",
  "oklch(0.38 0.06 80)",
  "oklch(0.35 0.07 30)",
  "oklch(0.34 0.05 200)"
];
function ia(e, t) {
  return `${e}_${1e4 + t * 7}`;
}
const Bl = 7, Kl = 3;
function Vl(e, t, n, s) {
  const a = (t * Bl + an(n)) % s, l = [];
  for (let r = 0; r < Math.min(Kl, s); r++)
    l.push(ia(e, (a + r) % s));
  return l;
}
function ql(e, t) {
  switch (e.kind) {
    case "chips":
      return e.multiple ? Wl(e.options, t) : e.options[t % e.options.length] ?? "";
    case "range": {
      const n = Math.max(0, e.max - e.min);
      return e.min + (n === 0 ? 0 : t % (n + 1));
    }
    case "toggle":
      return t % 3 === 0;
  }
}
function Wl(e, t) {
  if (!e.length) return [];
  const n = 1 + (t >> 5) % Math.min(3, e.length), s = t % e.length, a = /* @__PURE__ */ new Set();
  for (let l = 0; l < n; l++) a.add((s + l) % e.length);
  return [...a].sort((l, r) => l - r).map((l) => e[l]);
}
function Ul(e, t) {
  const { hash: n, sample: s, revision: a, updatedAt: l } = t, r = a ? ` · rev ${a + 1}` : "";
  switch (e.role) {
    case "identity":
      return `${s[0]}${r}`;
    case "reference":
      return a ? `${s[1]}-${a + 1}` : s[1];
    case "state":
      return en[n % en.length];
    case "updated":
      return l;
    case "tint":
      return As[n % As.length];
    case "metric":
      return 1 + n % 940;
  }
  switch (e.kind) {
    case "number":
      return 1 + n % 940;
    case "status":
      return en[n % en.length];
    case "date":
      return l;
    default:
      return;
  }
}
function Hl(e, t = {}) {
  const n = t.population ?? 48, s = t.seed ?? "", a = t.now ?? /* @__PURE__ */ new Date("2026-08-25T00:00:00Z"), l = e.samples, r = t.scopes ?? [];
  if (!l.length) return [];
  const o = [];
  for (let i = 0; i < n; i++) {
    const u = l[i % l.length], d = Math.floor(i / l.length), _ = an(`${s}:${e.key}:${u[0]}:${i}`), y = ia(e.key, i), k = new Date(a.getTime() - _ % 900 * 36e5).toISOString(), b = {};
    for (const C of e.columns ?? []) {
      const g = C.field ?? C.key;
      if (!g || C.value) continue;
      const $ = Ul(C, {
        hash: an(`${_}:${g}`),
        sample: u,
        revision: d,
        updatedAt: k
      });
      $ !== void 0 && (b[g] = $);
    }
    for (const C of e.facets)
      b[C.key] = ql(C, an(`${_}:${C.key}`));
    for (const [C, g] of r)
      b[C] = g === e.key ? y : Vl(g, i, C, n);
    o.push({ id: y, entityKey: e.key, entityLabel: e.label, fields: b });
  }
  return o;
}
function jl(e, t) {
  for (const [n, s] of Object.entries(t)) {
    const a = e.fields[n];
    switch (s.kind) {
      case "chips": {
        if (!s.selected.length) break;
        if (Array.isArray(a)) {
          if (!a.some((l) => s.selected.includes(String(l)))) return !1;
          break;
        }
        if (typeof a != "string" || !s.selected.includes(a)) return !1;
        break;
      }
      case "range": {
        if (s.min === null && s.max === null) break;
        const l = typeof a == "number" ? a : Number(a);
        if (!Number.isFinite(l) || s.min !== null && l < s.min || s.max !== null && l > s.max) return !1;
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
function Xl(e, t) {
  const n = e.find((r) => r.sort === t);
  if (!n) return () => 0;
  const s = n.kind ?? "text", a = s === "number" || n.role === "metric", l = s === "date" || n.role === "updated";
  return (r, o) => {
    const i = De(n, r), u = De(n, o);
    return a ? Number(u ?? 0) - Number(i ?? 0) : l ? Date.parse(String(u ?? "")) - Date.parse(String(i ?? "")) : String(u ?? "").localeCompare(String(i ?? ""));
  };
}
function Gl(e = {}) {
  const t = /* @__PURE__ */ new Map(), n = (s, a) => {
    const l = t.get(s.key);
    if (l) return l;
    const r = e.scopes ?? a.entities.flatMap(
      (i) => i.scope ? [[i.scope, i.key]] : []
    ), o = Hl(s, { ...e, scopes: r });
    return t.set(s.key, o), o;
  };
  return {
    query({ query: s, schema: a, entity: l, limit: r, offset: o }) {
      const i = at(s.expr), u = l ? [l] : a.entities, d = [], _ = [];
      for (const b of u)
        for (const C of n(b, a))
          d.push(C), (l ? jl(C, s.facets) : !0) && Nl(i, C, b) && _.push(C);
      const y = nt(l, s.sort, a), k = _.sort(Xl(Qs(l, a), y.key));
      return s.dir === "asc" && k.reverse(), {
        // One page out of the middle. `total` stays the whole match, which is
        // what the shell counts pages with.
        rows: k.slice(o, o + r),
        total: _.length,
        unfiltered: _.length === d.length
      };
    }
  };
}
function Yl(e, t) {
  return ca(e, t.id);
}
function ca(e, t) {
  const n = e?.scope;
  return n ? `${n}:"${t.replace(/"/g, "")}"` : null;
}
function qn(e, t) {
  return Yl(
    e.entities.find((n) => n.key === t.entityKey),
    t
  );
}
function ua(e, t) {
  if (!t) return e;
  const n = e.trim();
  if (!n) return t;
  const [s] = at(t).flat();
  if (!s) return n;
  const a = at(n);
  return a.some((o) => o.some((i) => la(i, s))) ? n : a.some((o) => o.some((i) => Ps(i, s))) ? Rt(
    a.map(
      (o) => o.map((i) => Ps(i, s) ? s : i)
    )
  ) : `${n} ${t}`;
}
function Ql(e) {
  if (!e) return null;
  const t = e.trim();
  return t ? t.startsWith("-") ? t.slice(1) : `-${t}` : null;
}
function je(e) {
  return e.metaKey || e.ctrlKey ? { exclude: !0 } : {};
}
function Zl(e, t, n, s = {}) {
  const a = qn(e, n);
  return ua(t.expr, s.exclude ? Ql(a) : a);
}
function Jl(e, t) {
  const n = t.toLowerCase();
  return e.entities.find((s) => s.scope?.toLowerCase() === n) ?? null;
}
const da = Symbol("dc.shellContext");
function er(e) {
  return Dn(da, e), e;
}
function Ce() {
  const e = bt(da, null);
  if (!e)
    throw new Error(
      "[header-content-layout] No shell context found. Render this component inside <DataShell>."
    );
  return e;
}
const Wn = "e", Un = "v", Hn = "s", jn = "d", Xn = "q", Gn = "p", Yn = "f_", fa = "*", tr = [
  Wn,
  Un,
  Hn,
  jn,
  Xn,
  Gn
], An = "..", pa = ",", nr = [
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
function bn(e) {
  let t = encodeURIComponent(e);
  for (const [n, s] of nr) t = t.replace(n, s);
  return t;
}
function Ge(e) {
  try {
    return decodeURIComponent(e.replace(/\+/g, " "));
  } catch {
    return e.replace(/\+/g, " ");
  }
}
function va(e) {
  const t = e.replace(/^[?]/, "");
  if (!t) return [];
  const n = [];
  for (const s of t.split("&")) {
    if (!s) continue;
    const a = s.indexOf("="), l = a === -1 ? s : s.slice(0, a), r = a === -1 ? "" : s.slice(a + 1);
    n.push([Ge(l), r]);
  }
  return n;
}
function sr(e) {
  return tr.includes(e) || e.startsWith(Yn);
}
function zs(e, t, n) {
  return Math.min(n, Math.max(t, e));
}
function ar(e, t) {
  const n = Ge(t);
  switch (e.kind) {
    case "chips": {
      const s = new Set(
        n.split(pa).map((l) => l.trim()).filter(Boolean)
      );
      return { kind: "chips", selected: e.options.filter((l) => s.has(l)) };
    }
    case "range": {
      const s = n.indexOf(An), a = (s === -1 ? n : n.slice(0, s)).trim(), l = (s === -1 ? "" : n.slice(s + An.length)).trim(), r = a === "" ? null : Number(a), o = l === "" ? null : Number(l);
      let i = r !== null && Number.isFinite(r) ? zs(r, e.min, e.max) : null, u = o !== null && Number.isFinite(o) ? zs(o, e.min, e.max) : null;
      return i !== null && u !== null && i > u && ([i, u] = [u, i]), { kind: "range", min: i, max: u };
    }
    case "toggle":
      return { kind: "toggle", on: n === "1" || n === "true" };
  }
}
function lr(e, t) {
  switch (e.kind) {
    case "chips":
      return e.selected.length ? (t.kind === "chips" ? t.options.filter((s) => e.selected.includes(s)) : e.selected).join(pa) : null;
    case "range":
      return e.min === null && e.max === null ? null : `${e.min ?? ""}${An}${e.max ?? ""}`;
    case "toggle":
      return e.on ? "1" : null;
  }
}
function rr(e, t, n = {}) {
  const s = Vn(t, n), a = new Map(va(e)), l = a.get(Wn), r = l === void 0 ? s.entity : Ge(l), o = r === fa ? null : _t(t, r), i = a.get(Un), u = i && Xs(Ge(i)) ? Ge(i) : s.view, d = a.get(Hn), _ = nt(o, d ? Ge(d) : n.sort, t), y = a.get(jn), k = y ? Ge(y) === "asc" ? "asc" : "desc" : s.dir, b = a.get(Xn), C = a.get(Gn), g = C === void 0 ? 1 : Number(Ge(C)), $ = Number.isFinite(g) ? Math.max(1, Math.floor(g)) : 1, R = {};
  for (const I of o?.facets ?? []) {
    const L = a.get(`${Yn}${I.key}`);
    R[I.key] = L === void 0 ? On(I) : ar(I, L);
  }
  return {
    entity: o?.key ?? null,
    view: u,
    sort: _.key,
    dir: k,
    expr: b === void 0 ? "" : Ge(b),
    facets: na(o, R),
    page: $
  };
}
function Ts(e, t, n = {}, s = "") {
  const a = Vn(t, n), l = _t(t, e.entity), r = va(s).filter(([_]) => !sr(_)), o = [], i = (_, y) => o.push([_, bn(y)]), u = l?.key ?? null;
  u !== a.entity && i(Wn, u ?? fa), e.view !== a.view && i(Un, e.view), e.sort !== a.sort && i(Hn, e.sort), e.dir !== a.dir && i(jn, e.dir), e.expr.trim() !== "" && i(Xn, e.expr);
  for (const _ of l?.facets ?? []) {
    const y = e.facets[_.key];
    if (!y) continue;
    const k = lr(y, _);
    k !== null && o.push([`${Yn}${_.key}`, bn(k)]);
  }
  e.page > 1 && i(Gn, String(e.page));
  const d = [
    ...r.map(([_, y]) => [bn(_), y]),
    ...o
  ];
  return d.length ? `?${d.map(([_, y]) => y === "" ? _ : `${_}=${y}`).join("&")}` : "";
}
const fn = "entity", Kt = "expr";
function or(e, t) {
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
      const s = t.min !== null && t.max !== null ? `${t.min} ≤ ${n} ≤ ${t.max}` : t.max !== null ? `${n} ≤ ${t.max}` : `${n} ≥ ${t.min}`;
      return [{ id: e.key, label: s, facetKey: e.key }];
    }
    case "toggle":
      return t.on ? [{ id: e.key, label: `${n}:on`, facetKey: e.key }] : [];
  }
}
function Qn(e, t) {
  const n = [];
  t && n.push({
    id: fn,
    label: `entity:${t.key}`,
    facetKey: fn
  });
  for (const s of t?.facets ?? []) {
    const a = e.facets[s.key];
    a && Js(a) && n.push(...or(s, a));
  }
  return at(e.expr).forEach((s, a) => {
    s.forEach((l, r) => {
      n.push({
        id: `${Kt}:${a}:${r}`,
        label: Wt(l),
        facetKey: Kt,
        group: a,
        index: r,
        ...l.kind === "field" ? { field: l.field, value: l.value } : {},
        ...l.negated ? { negated: !0 } : {}
      });
    });
  }), n;
}
function ir(e, t, n = null) {
  if (Bn(e)) {
    const l = nt(t, e.sort, n);
    return `everything · ${e.view} · ${l.label}`;
  }
  const s = Qn(e, t).filter((l) => l.facetKey !== Kt).map((l) => l.label), a = e.expr.trim();
  return a && s.push(`"${a}"`), s.join(" · ");
}
function cr(e) {
  const { adapter: t } = e, n = v(() => At(e.schema)), s = v(() => At(e.defaults) ?? {}), a = v(() => rr(t.search.value, n.value, s.value)), l = v(() => _t(n.value, a.value.entity)), r = v(() => l.value ?? Ys(n.value, s.value)), o = v(() => Zs(l.value, n.value)), i = v(() => nt(l.value, a.value.sort, n.value)), u = (g, $) => {
    const R = Ts(g, n.value, s.value, t.search.value);
    R !== t.search.value && ($ === "push" ? t.push(R) : t.replace(R));
  }, d = () => At(e.navigationMode) ?? "push", _ = () => At(e.facetNavigationMode) ?? "replace", y = (g, $) => {
    const R = g.page ?? (ks(g) ? 1 : a.value.page);
    u({ ...a.value, ...g, page: R }, $);
  }, k = (g, $) => {
    const R = a.value.facets[g];
    if (!R) return;
    const I = { ...a.value.facets, [g]: $(R) };
    y({ facets: I }, _());
  }, b = (g) => {
    const $ = g === null ? null : _t(n.value, g);
    return ($?.key ?? null) === a.value.entity ? {} : {
      entity: $?.key ?? null,
      sort: nt($, a.value.sort, n.value).key,
      facets: Bt($)
    };
  }, C = (g) => {
    const $ = b(g);
    Object.keys($).length && y($, d());
  };
  return {
    query: a,
    entity: l,
    focus: r,
    sort: i,
    sorts: o,
    summary: v(() => ir(a.value, l.value, n.value)),
    terms: v(() => Qn(a.value, l.value)),
    isPristine: v(() => Bn(a.value)),
    isEverything: v(() => a.value.entity === null),
    hasFacets: v(() => ea(a.value.facets)),
    setEntity: C,
    clearEntity: () => C(null),
    setView(g) {
      y({ view: g }, d());
    },
    setSort(g) {
      y({ sort: nt(l.value, g, n.value).key }, d());
    },
    toggleDirection() {
      y({ dir: a.value.dir === "desc" ? "asc" : "desc" }, d());
    },
    setExpression(g) {
      y({ expr: g }, d());
    },
    narrow(g, $, R) {
      y({ expr: g, ...b($), ...R ? { view: R } : {} }, d());
    },
    setPage(g, $) {
      y({ page: Math.max(1, Math.floor(g)) }, $ ?? d());
    },
    setFacet(g, $) {
      k(g, () => $);
    },
    toggleChip(g, $) {
      k(g, (R) => R.kind !== "chips" ? R : { kind: "chips", selected: R.selected.includes($) ? R.selected.filter((L) => L !== $) : [...R.selected, $] });
    },
    setRange(g, $, R) {
      k(g, (I) => I.kind === "range" ? { kind: "range", min: $, max: R } : I);
    },
    toggleFlag(g) {
      k(
        g,
        ($) => $.kind === "toggle" ? { kind: "toggle", on: !$.on } : $
      );
    },
    removeTerm(g) {
      if (g.facetKey === fn) {
        C(null);
        return;
      }
      if (g.facetKey === Kt) {
        const $ = Dl(at(a.value.expr), g.group ?? 0, g.index ?? 0);
        y({ expr: Rt($) }, d());
        return;
      }
      k(g.facetKey, ($) => $.kind === "chips" && g.option ? { kind: "chips", selected: $.selected.filter((R) => R !== g.option) } : $.kind === "range" ? { kind: "range", min: null, max: null } : $.kind === "toggle" ? { kind: "toggle", on: !1 } : $);
    },
    clearFilters() {
      y({ entity: null, expr: "", facets: Bt(null) }, d());
    },
    reset() {
      u(Vn(n.value, s.value), d());
    },
    hrefFor(g) {
      const $ = { ...a.value, ...g };
      return $.page = g.page ?? (ks(g) ? 1 : a.value.page), $.facets = na(_t(n.value, $.entity), $.facets), `${t.path.value}${Ts($, n.value, s.value, t.search.value)}`;
    }
  };
}
function ur(e) {
  const t = It([]), n = U(0), s = U(!1), a = It(null);
  let l = 0, r = null;
  const o = v(() => (e.query.value.page - 1) * e.limit.value), i = v(() => yl(n.value, e.limit.value)), u = () => {
    const g = e.query.value, $ = e.within?.value.trim();
    return $ ? { ...g, expr: oa($, g.expr) } : g;
  }, d = (g) => {
    t.value = g.rows, n.value = g.total, a.value = null;
  }, _ = (g) => {
    a.value = g, t.value = [], n.value = 0;
  }, y = (g, $) => {
    let R = !0;
    const I = () => g === l, L = () => {
      R && (R = !1, t.value = [], n.value = 0), a.value = null;
    };
    return {
      get open() {
        return I();
      },
      insert(N, q) {
        if (!I()) return;
        const S = Array.isArray(N) ? N : [N];
        if (!S.length) return;
        L();
        const T = [...t.value];
        T.splice(q ?? T.length, 0, ...S), t.value = $ > 0 ? T.slice(0, $) : T, n.value += S.length;
      },
      set(N) {
        I() && (N.rows && (L(), t.value = $ > 0 ? N.rows.slice(0, $) : N.rows, n.value = N.rows.length), N.total !== void 0 && (n.value = N.total));
      },
      close() {
        I() && (s.value = !1);
      },
      fail(N) {
        I() && (_(N), s.value = !1);
      }
    };
  }, k = () => {
    const g = r;
    r = null, g?.();
  }, b = () => {
    const g = ++l;
    k();
    const $ = {
      query: u(),
      schema: e.schema.value,
      entity: e.entity.value,
      limit: e.limit.value,
      offset: o.value
    }, R = e.source.value;
    if (R.stream) {
      s.value = !0;
      try {
        r = R.stream($, y(g, $.limit)) ?? null;
      } catch (L) {
        _(L), s.value = !1;
      }
      return;
    }
    let I;
    try {
      I = R.query($);
    } catch (L) {
      _(L);
      return;
    }
    if (!(I instanceof Promise)) {
      d(I), s.value = !1;
      return;
    }
    s.value = !0, I.then((L) => {
      g === l && d(L);
    }).catch((L) => {
      g === l && _(L);
    }).finally(() => {
      g === l && (s.value = !1);
    });
  }, C = v(() => {
    const g = u();
    return `${JSON.stringify(ta.map(($) => g[$]))}|${g.page}`;
  });
  return $e([e.source, C, e.schema, e.entity, e.limit], b, {
    immediate: !0
  }), qs(() => {
    l++, k();
  }, !0), { rows: t, total: n, offset: o, pageCount: i, pending: s, error: a, refresh: b };
}
const dr = 25, ma = (e, t) => e.toLowerCase() === t.toLowerCase();
function fr(e, t) {
  return e.find((n) => ma(n.id, t));
}
function pr(e) {
  const t = It(/* @__PURE__ */ new Map()), n = (r) => {
    if (r.facetKey !== Kt || !r.field || !r.value) return null;
    const o = Jl(e.schema.value, r.field);
    return o ? { entity: o, id: r.value, key: `${o.key}:${r.value}` } : null;
  }, s = (r) => {
    const { entity: o, id: i } = r, u = e.query.value;
    return e.source.value.query({
      query: {
        ...u,
        entity: o.key,
        // The reference on its own. The rest of the query is about the rows on
        // screen, which are of another type entirely.
        expr: ca(o, i) ?? "",
        facets: Bt(o),
        sort: nt(o, u.sort, e.schema.value).key,
        page: 1
      },
      schema: e.schema.value,
      entity: o,
      limit: dr,
      offset: 0
    });
  }, a = (r, o) => {
    const i = ln(Oe(r.columns ?? [], "identity"), o);
    return i === En || ma(i, o.id) ? "" : i;
  }, l = () => {
    const r = /* @__PURE__ */ new Map();
    for (const u of e.terms.value) {
      const d = n(u);
      d && !t.value.has(d.key) && r.set(d.key, d);
    }
    if (!r.size) return;
    const o = [...r.values()].map((u) => ({
      reference: u,
      outcome: s(u)
    })), i = (u) => {
      const d = new Map(t.value);
      u.forEach((_, y) => {
        const { reference: k } = o[y], b = fr(_.rows, k.id);
        d.set(k.key, b ? a(k.entity, b) : "");
      }), t.value = d;
    };
    if (o.every(({ outcome: u }) => !(u instanceof Promise))) {
      i(o.map(({ outcome: u }) => u));
      return;
    }
    Promise.all(o.map(({ outcome: u }) => Promise.resolve(u))).then(i).catch(() => {
    });
  };
  return $e([e.source, e.schema, e.terms], () => {
    try {
      l();
    } catch {
    }
  }, { immediate: !0 }), {
    names: t,
    nameOf(r) {
      const o = n(r);
      return o && t.value.get(o.key) || null;
    }
  };
}
const vr = ["data-dc-expanded"], mr = { class: "dc-header__domain" }, hr = {
  key: 0,
  class: "dc-header__within"
}, _r = ["title"], gr = ["data-dc-more", "title"], yr = {
  key: 0,
  class: "dc-header__pick"
}, wr = { class: "dc-header__pick-box" }, kr = ["value"], br = { value: "" }, $r = ["value"], xr = { class: "dc-header__pick" }, Cr = { class: "dc-header__pick-box" }, Mr = ["value"], Sr = ["value"], Er = { class: "dc-header__pick" }, Pr = { class: "dc-header__pick-box" }, Ar = ["value"], zr = ["value"], Tr = ["title", "aria-label"], Rr = {
  key: 0,
  class: "dc-header__or dc-mono",
  "aria-hidden": "true"
}, Lr = ["title", "aria-label", "onClick"], Fr = ["aria-expanded", "aria-controls"], Nr = {
  class: "dc-header__chevron",
  "aria-hidden": "true"
}, Dr = { class: "dc-header__sr" }, Ir = {
  key: 0,
  class: "dc-header__pages",
  "aria-label": "Pages"
}, Or = ["disabled"], Br = ["title"], Kr = ["value", "onKeydown"], Vr = {
  class: "dc-header__page-total",
  "aria-hidden": "true"
}, qr = {
  class: "dc-header__sr",
  "aria-live": "polite"
}, Wr = ["disabled"], Ur = {
  key: 1,
  class: "dc-header__actions"
}, Hr = /* @__PURE__ */ pe({
  __name: "ShellHeader",
  props: {
    expanded: { type: Boolean },
    panelId: {},
    hideCount: { type: Boolean },
    views: {},
    pagesNote: {}
  },
  emits: ["toggle"],
  setup(e, { emit: t }) {
    const n = e, s = t, a = Ce(), l = v(() => a.schema.value), r = v(
      () => a.hasFacets.value || !!a.query.value.expr.trim() || !!a.within.value
    ), o = v(() => l.value.formatCount ?? mt);
    function i(D) {
      return D.key === a.query.value.entity && r.value && !n.hideCount ? o.value(a.total.value) : D.count;
    }
    function u(D) {
      return `${D.label} · ${i(D)}`;
    }
    const d = v(() => a.query.value.entity !== null || n.hideCount ? "Everything" : `Everything · ${o.value(a.total.value)}`), _ = v(() => {
      const D = a.within.value.trim();
      return D ? Qn({ ...a.query.value, expr: D, facets: {} }, null) : [];
    }), y = v(
      () => (n.views ?? [...js]).map((D) => ({ key: D, label: _l[D] }))
    ), k = v(() => Gs(a.query.value.view, n.views)), b = v(
      () => !(a.within.value && a.query.value.entity === null && k.value === "cards")
    );
    function C(D) {
      a.setView(D.target.value);
    }
    const g = v(
      () => a.sorts.value.map((D) => ({ key: D.key, label: D.label }))
    ), $ = v(
      () => g.value.length > 0 && a.query.value.entity !== null && !a.within.value
    );
    function R(D) {
      a.setSort(D.target.value);
    }
    const I = v(() => a.query.value.dir === "desc"), L = v(
      () => a.terms.value.filter((D) => D.facetKey !== fn).map((D, K, W) => {
        const ke = W[K - 1];
        return {
          term: D,
          or: ke?.group !== void 0 && D.group !== void 0 && D.group !== ke.group
        };
      })
    ), N = pr({
      source: a.source,
      schema: a.schema,
      query: a.query,
      // The scope's parts as well as the query's: it names a record more often
      // than a typed term does, being what a record's own page is built on.
      terms: v(() => [..._.value, ...a.terms.value])
    });
    function q(D) {
      const K = N.nameOf(D);
      return K ? `${D.negated ? "-" : ""}${D.field}:${K} (${D.value})` : D.label;
    }
    function S(D) {
      const K = D.target.value;
      a.setEntity(K || null);
    }
    function T(D) {
      D.target?.closest("button, select, label") || s("toggle");
    }
    const te = U(null), ae = U("");
    function ue() {
      const D = te.value;
      if (!D) {
        ae.value = "";
        return;
      }
      const K = D.scrollLeft > 1, W = D.scrollWidth - D.clientWidth - D.scrollLeft > 1;
      ae.value = K && W ? "both" : K ? "start" : W ? "end" : "";
    }
    let Y = null;
    $e(
      te,
      (D) => {
        Y?.disconnect(), Y = null, ue(), !(!D || typeof ResizeObserver > "u") && (Y = new ResizeObserver(ue), Y.observe(D));
      },
      { flush: "post" }
    ), $e(L, ue, { flush: "post" }), Ze(() => Y?.disconnect());
    const ve = v(() => a.query.value.page), Se = v(
      () => (a.pageCount.value > 1 || !!n.pagesNote) && !Kn(a.query.value)
    ), x = v(
      () => `${a.pending.value ? "~" : ""}${mt(a.pageCount.value)}`
    ), O = v(() => {
      let D = `Page ${mt(ve.value)} of ${x.value}`;
      const K = a.rows.value.length;
      if (K) {
        const W = a.offset.value + 1, ke = `${a.pending.value ? "~" : ""}${mt(a.total.value)}`;
        D += ` — rows ${mt(W)} to ${mt(W + K - 1)} of ${ke}`;
      }
      return n.pagesNote ? `${D}
${n.pagesNote}` : D;
    }), X = U(null), ne = v(() => X.value ?? String(ve.value)), ge = v(
      () => `calc(${Math.max(2, String(a.pageCount.value).length)}ch + 10px)`
    );
    function ze(D) {
      D.target.select();
    }
    function Ke(D) {
      const K = D.target, W = K.value.replace(/[^0-9]/g, "");
      K.value !== W && (K.value = W), X.value = W;
    }
    function Ie(D) {
      const K = D.target, W = Number(X.value);
      X.value = null;
      const ke = Number.isFinite(W) && W >= 1 ? Math.min(Math.trunc(W), Math.max(1, a.pageCount.value)) : ve.value;
      K.value = String(ke), ke !== ve.value && a.setPage(ke);
    }
    function Ve(D) {
      const K = D.target;
      X.value = null, K.value = String(ve.value), K.blur();
    }
    return (D, K) => (f(), m("div", {
      class: "dc-header",
      "data-dc-expanded": e.expanded ? "true" : "false"
    }, [
      w("div", {
        class: "dc-header__trigger",
        onClick: T
      }, [
        w("span", mr, A(l.value.label), 1),
        _.value.length ? (f(), m("span", hr, [
          K[4] || (K[4] = w("span", { class: "dc-header__sr" }, "Within", -1)),
          (f(!0), m(Q, null, ce(_.value, (W) => (f(), m("span", {
            key: `scope:${W.id}`,
            class: "dc-within dc-mono dc-truncate",
            title: q(W)
          }, A(q(W)), 9, _r))), 128))
        ])) : z("", !0),
        w("div", {
          ref_key: "termBar",
          ref: te,
          class: "dc-header__query dc-header__terms",
          "data-dc-more": ae.value,
          title: E(a).summary.value,
          onScroll: ue
        }, [
          b.value ? (f(), m("label", yr, [
            K[6] || (K[6] = w("span", { class: "dc-header__sr" }, "Type", -1)),
            w("span", wr, [
              w("select", {
                class: "dc-header__pick-select dc-header__scope-select",
                value: E(a).query.value.entity ?? "",
                onChange: S
              }, [
                w("option", br, A(d.value), 1),
                (f(!0), m(Q, null, ce(E(a).entities.value, (W) => (f(), m("option", {
                  key: W.key,
                  value: W.key
                }, A(u(W)), 9, $r))), 128))
              ], 40, kr),
              K[5] || (K[5] = w("span", {
                class: "dc-header__pick-mark",
                "aria-hidden": "true"
              }, "▾", -1))
            ])
          ])) : z("", !0),
          w("label", xr, [
            K[8] || (K[8] = w("span", { class: "dc-header__sr" }, "View", -1)),
            w("span", Cr, [
              w("select", {
                class: "dc-header__pick-select dc-header__view-select",
                value: k.value,
                onChange: C
              }, [
                (f(!0), m(Q, null, ce(y.value, (W) => (f(), m("option", {
                  key: W.key,
                  value: W.key
                }, A(W.label), 9, Sr))), 128))
              ], 40, Mr),
              K[7] || (K[7] = w("span", {
                class: "dc-header__pick-mark",
                "aria-hidden": "true"
              }, "▾", -1))
            ])
          ]),
          $.value ? (f(), m(Q, { key: 1 }, [
            w("label", Er, [
              K[10] || (K[10] = w("span", { class: "dc-header__sr" }, "Sort", -1)),
              w("span", Pr, [
                w("select", {
                  class: "dc-header__pick-select dc-header__sort-select dc-mono",
                  value: E(a).sort.value.key,
                  onChange: R
                }, [
                  (f(!0), m(Q, null, ce(g.value, (W) => (f(), m("option", {
                    key: W.key,
                    value: W.key
                  }, A(W.label), 9, zr))), 128))
                ], 40, Ar),
                K[9] || (K[9] = w("span", {
                  class: "dc-header__pick-mark",
                  "aria-hidden": "true"
                }, "▾", -1))
              ])
            ]),
            w("button", {
              type: "button",
              class: "dc-header__dir dc-mono",
              title: I.value ? "Descending — click to reverse" : "Ascending — click to reverse",
              "aria-label": `Sort direction: ${I.value ? "descending" : "ascending"}`,
              onClick: K[0] || (K[0] = (W) => E(a).toggleDirection())
            }, A(I.value ? "↓" : "↑"), 9, Tr)
          ], 64)) : z("", !0),
          (f(!0), m(Q, null, ce(L.value, (W) => (f(), m(Q, {
            key: W.term.id
          }, [
            W.or ? (f(), m("span", Rr, "or")) : z("", !0),
            w("button", {
              type: "button",
              class: "dc-term dc-mono",
              title: `Remove ${q(W.term)}`,
              "aria-label": `Remove ${q(W.term)}`,
              onClick: (ke) => E(a).removeTerm(W.term)
            }, A(q(W.term)), 9, Lr)
          ], 64))), 128))
        ], 40, gr),
        w("button", {
          type: "button",
          class: "dc-header__toggle",
          "aria-expanded": e.expanded,
          "aria-controls": e.panelId,
          onClick: K[1] || (K[1] = (W) => s("toggle"))
        }, [
          w("span", Nr, A(e.expanded ? "▲" : "▼"), 1),
          w("span", Dr, A(e.expanded ? "Hide query panel" : "Edit query"), 1)
        ], 8, Fr)
      ]),
      Se.value ? (f(), m("nav", Ir, [
        w("button", {
          type: "button",
          class: "dc-header__step",
          "aria-label": "Previous page",
          disabled: ve.value <= 1,
          onClick: K[2] || (K[2] = (W) => E(a).setPage(ve.value - 1))
        }, [...K[11] || (K[11] = [
          w("span", { "aria-hidden": "true" }, "‹", -1)
        ])], 8, Or),
        w("span", {
          class: "dc-header__page dc-mono",
          title: O.value
        }, [
          w("input", {
            class: "dc-header__page-box dc-mono",
            type: "text",
            inputmode: "numeric",
            autocomplete: "off",
            "aria-label": "Page",
            style: Re({ width: ge.value }),
            value: ne.value,
            onFocus: ze,
            onInput: Ke,
            onKeydown: [
              ct(Fe(Ie, ["prevent"]), ["enter"]),
              ct(Fe(Ve, ["prevent"]), ["esc"])
            ],
            onBlur: Ie
          }, null, 44, Kr),
          w("span", Vr, "/ " + A(x.value), 1)
        ], 8, Br),
        w("span", qr, A(O.value), 1),
        w("button", {
          type: "button",
          class: "dc-header__step",
          "aria-label": "Next page",
          disabled: ve.value >= E(a).pageCount.value,
          onClick: K[3] || (K[3] = (W) => E(a).setPage(ve.value + 1))
        }, [...K[12] || (K[12] = [
          w("span", { "aria-hidden": "true" }, "›", -1)
        ])], 8, Wr)
      ])) : z("", !0),
      D.$slots.actions ? (f(), m("div", Ur, [
        be(D.$slots, "actions", {}, void 0, !0)
      ])) : z("", !0)
    ], 8, vr));
  }
}), me = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [s, a] of t)
    n[s] = a;
  return n;
}, ha = /* @__PURE__ */ me(Hr, [["__scopeId", "data-v-65416b2f"]]), jr = { class: "dc-facet" }, Xr = ["id"], Gr = { class: "dc-facet__body" }, Yr = ["aria-labelledby"], Qr = ["aria-pressed", "data-dc-active", "onClick"], Zr = ["aria-labelledby"], Jr = ["aria-label", "placeholder", "onKeydown"], eo = ["aria-label", "placeholder", "onKeydown"], to = ["aria-checked"], no = { class: "dc-switch__text" }, so = ["data-dc-active"], ao = /* @__PURE__ */ pe({
  __name: "FacetControl",
  props: {
    facet: {},
    value: {}
  },
  emits: ["update"],
  setup(e, { emit: t }) {
    const n = e, s = t, a = v(
      () => n.value.kind === "chips" ? new Set(n.value.selected) : /* @__PURE__ */ new Set()
    );
    function l(_) {
      if (n.value.kind !== "chips") return;
      const y = a.value.has(_) ? n.value.selected.filter((k) => k !== _) : [...n.value.selected, _];
      s("update", { kind: "chips", selected: y });
    }
    const r = U(""), o = U("");
    $e(
      () => n.value,
      (_) => {
        _.kind === "range" && (r.value = _.min === null ? "" : _.min, o.value = _.max === null ? "" : _.max);
      },
      { immediate: !0, deep: !0 }
    );
    function i(_) {
      if (typeof _ == "number") return Number.isFinite(_) ? _ : null;
      const y = _.trim();
      if (!y) return null;
      const k = Number(y);
      return Number.isFinite(k) ? k : null;
    }
    function u() {
      if (n.value.kind !== "range") return;
      const _ = i(r.value), y = i(o.value);
      _ === n.value.min && y === n.value.max || s("update", { kind: "range", min: _, max: y });
    }
    function d() {
      n.value.kind === "toggle" && s("update", { kind: "toggle", on: !n.value.on });
    }
    return (_, y) => (f(), m("div", jr, [
      w("span", {
        id: `dc-facet-${e.facet.key}`,
        class: "dc-facet__label"
      }, A(e.facet.label), 9, Xr),
      w("div", Gr, [
        e.facet.kind === "chips" && e.value.kind === "chips" ? (f(), m("div", {
          key: 0,
          class: "dc-facet__chips",
          role: "group",
          "aria-labelledby": `dc-facet-${e.facet.key}`
        }, [
          (f(!0), m(Q, null, ce(e.facet.options, (k) => (f(), m("button", {
            key: k,
            type: "button",
            class: "dc-chip",
            "aria-pressed": a.value.has(k),
            "data-dc-active": a.value.has(k) ? "true" : "false",
            onClick: (b) => l(k)
          }, A(k), 9, Qr))), 128))
        ], 8, Yr)) : e.facet.kind === "range" && e.value.kind === "range" ? (f(), m("div", {
          key: 1,
          class: "dc-facet__range",
          role: "group",
          "aria-labelledby": `dc-facet-${e.facet.key}`
        }, [
          Cn(w("input", {
            "onUpdate:modelValue": y[0] || (y[0] = (k) => r.value = k),
            class: "dc-input dc-mono",
            type: "number",
            inputmode: "numeric",
            "aria-label": `${e.facet.label} minimum`,
            placeholder: String(e.facet.min),
            onChange: u,
            onBlur: u,
            onKeydown: ct(Fe(u, ["prevent"]), ["enter"])
          }, null, 40, Jr), [
            [Mn, r.value]
          ]),
          y[2] || (y[2] = w("span", {
            class: "dc-facet__dash",
            "aria-hidden": "true"
          }, "–", -1)),
          Cn(w("input", {
            "onUpdate:modelValue": y[1] || (y[1] = (k) => o.value = k),
            class: "dc-input dc-mono",
            type: "number",
            inputmode: "numeric",
            "aria-label": `${e.facet.label} maximum`,
            placeholder: String(e.facet.max),
            onChange: u,
            onBlur: u,
            onKeydown: ct(Fe(u, ["prevent"]), ["enter"])
          }, null, 40, eo), [
            [Mn, o.value]
          ])
        ], 8, Zr)) : e.facet.kind === "toggle" && e.value.kind === "toggle" ? (f(), m("button", {
          key: 2,
          type: "button",
          class: "dc-switch",
          role: "switch",
          "aria-checked": e.value.on,
          onClick: d
        }, [
          w("span", no, A(e.facet.text), 1),
          w("span", {
            class: "dc-switch__track",
            "data-dc-active": e.value.on ? "true" : "false",
            "aria-hidden": "true"
          }, [...y[3] || (y[3] = [
            w("span", { class: "dc-switch__knob" }, null, -1)
          ])], 8, so)
        ], 8, to)) : z("", !0)
      ])
    ]));
  }
}), _a = /* @__PURE__ */ me(ao, [["__scopeId", "data-v-36d1334b"]]), lo = ["id"], ro = { class: "dc-panel__section dc-panel__rows" }, oo = { class: "dc-panel__row" }, io = ["for"], co = ["title", "aria-label", "onClick"], uo = ["id", "placeholder", "onKeydown"], fo = { class: "dc-panel__actions" }, po = ["disabled"], vo = {
  key: 0,
  class: "dc-panel__section"
}, mo = /* @__PURE__ */ pe({
  __name: "QueryPanel",
  props: {
    panelId: {}
  },
  emits: ["close"],
  setup(e, { emit: t }) {
    const n = t, s = Vt(), a = Ce(), l = v(() => Il(a.query.value.expr)), r = v(() => l.value.parts.map(Wt)), o = U(l.value.text), i = U(null);
    $e(
      () => l.value.text,
      (C) => {
        o.value = C;
      }
    );
    const u = v(() => o.value !== l.value.text);
    function d() {
      u.value && a.setExpression(Ss(l.value.parts, o.value)), n("close");
    }
    function _(C) {
      const { parts: g, text: $ } = l.value;
      a.setExpression(Ss(g.filter((R, I) => I !== C), $));
    }
    function y(C) {
      const { parts: g } = l.value;
      o.value || !g.length || (C.preventDefault(), _(g.length - 1));
    }
    function k() {
      o.value = "", a.clearFilters();
    }
    function b(C, g) {
      a.setFacet(C, g);
    }
    return Ot(() => i.value?.focus()), (C, g) => (f(), m("div", {
      id: e.panelId,
      class: "dc-panel",
      role: "dialog",
      "aria-label": "Query",
      onKeydown: g[2] || (g[2] = ct(Fe(($) => n("close"), ["stop"]), ["esc"]))
    }, [
      w("section", ro, [
        w("div", oo, [
          w("label", {
            class: "dc-panel__field-label",
            for: `${e.panelId}-expr`
          }, "Expression", 8, io),
          w("div", {
            class: "dc-field",
            onMousedown: g[1] || (g[1] = Fe(($) => i.value?.focus(), ["self", "prevent"]))
          }, [
            (f(!0), m(Q, null, ce(r.value, ($, R) => (f(), m("button", {
              key: `${R}:${$}`,
              type: "button",
              class: "dc-part dc-mono",
              title: `Remove ${$}`,
              "aria-label": `Remove ${$}`,
              onClick: (I) => _(R)
            }, A($), 9, co))), 128)),
            Cn(w("input", {
              id: `${e.panelId}-expr`,
              ref_key: "expressionField",
              ref: i,
              "onUpdate:modelValue": g[0] || (g[0] = ($) => o.value = $),
              class: "dc-expression dc-mono",
              type: "text",
              autocomplete: "off",
              spellcheck: "false",
              placeholder: r.value.length ? "" : E(a).schema.value.placeholder,
              onKeydown: [
                ct(Fe(d, ["prevent"]), ["enter"]),
                ct(y, ["backspace"])
              ]
            }, null, 40, uo), [
              [Mn, o.value]
            ])
          ], 32)
        ]),
        E(a).entity.value ? (f(!0), m(Q, { key: 0 }, ce(E(a).entity.value.facets, ($) => (f(), re(_a, {
          key: $.key,
          facet: $,
          value: E(a).query.value.facets[$.key],
          onUpdate: (R) => b($.key, R)
        }, null, 8, ["facet", "value", "onUpdate"]))), 128)) : z("", !0),
        w("div", fo, [
          w("button", {
            type: "button",
            class: "dc-button dc-button--primary",
            onClick: d
          }, " Run query "),
          w("button", {
            type: "button",
            class: "dc-button",
            disabled: E(a).isPristine.value && !u.value,
            onClick: k
          }, " Reset ", 8, po)
        ])
      ]),
      s["panel-section"] ? (f(), m("section", vo, [
        be(C.$slots, "panel-section", {}, void 0, !0)
      ])) : z("", !0)
    ], 40, lo));
  }
}), ga = /* @__PURE__ */ me(mo, [["__scopeId", "data-v-2642c02d"]]), ho = {
  key: 0,
  class: "dc-actions"
}, _o = {
  key: 0,
  class: "dc-actions__select"
}, go = { class: "dc-actions__all" }, yo = ["checked", "indeterminate"], wo = {
  class: "dc-actions__count",
  "aria-live": "polite"
}, ko = { class: "dc-actions__ops" }, bo = ["disabled"], $o = ["disabled"], xo = /* @__PURE__ */ pe({
  __name: "RecordActions",
  setup(e) {
    const t = Ce(), n = v(() => t.entity.value), s = v(() => !Kn(t.query.value)), a = v(() => s.value && t.selectable.value), l = v(
      () => s.value && (a.value || !!(n.value?.create || n.value?.duplicate || n.value?.delete))
    ), r = v(() => t.selection.value.ids.length), o = v(() => t.rows.value.filter((y) => t.isSelected(y)).length), i = v(
      () => t.rows.value.length > 0 && o.value === t.rows.value.length
    ), u = v(() => o.value > 0 && !i.value), d = v(() => r.value ? `${r.value} selected` : "Select all");
    function _(y) {
      return r.value ? `${y} ${r.value}` : y;
    }
    return (y, k) => l.value ? (f(), m("div", ho, [
      a.value ? (f(), m("div", _o, [
        w("label", go, [
          w("input", {
            class: "dc-tick",
            type: "checkbox",
            checked: i.value,
            indeterminate: u.value,
            title: "Select every row on this page",
            onChange: k[0] || (k[0] = (b) => E(t).selectPage(!i.value))
          }, null, 40, yo),
          w("span", wo, A(d.value), 1)
        ]),
        r.value ? (f(), m("button", {
          key: 0,
          type: "button",
          class: "dc-actions__clear",
          onClick: k[1] || (k[1] = (b) => E(t).clearSelection())
        }, " Clear ")) : z("", !0)
      ])) : z("", !0),
      w("div", ko, [
        n.value?.create ? (f(), m("button", {
          key: 0,
          type: "button",
          class: "dc-actions__op dc-actions__new",
          onClick: k[2] || (k[2] = (b) => E(t).create(n.value))
        }, [
          k[5] || (k[5] = w("span", {
            class: "dc-actions__plus",
            "aria-hidden": "true"
          }, "+", -1)),
          Ue(" " + A(n.value.create), 1)
        ])) : z("", !0),
        n.value?.duplicate ? (f(), m("button", {
          key: 1,
          type: "button",
          class: "dc-actions__op",
          disabled: !r.value,
          onClick: k[3] || (k[3] = (b) => E(t).duplicate())
        }, A(_(n.value.duplicate)), 9, bo)) : z("", !0),
        n.value?.delete ? (f(), m("button", {
          key: 2,
          type: "button",
          class: "dc-actions__op dc-actions__danger",
          disabled: !r.value,
          onClick: k[4] || (k[4] = (b) => E(t).delete())
        }, A(_(n.value.delete)), 9, $o)) : z("", !0)
      ])
    ])) : z("", !0);
  }
}), ya = /* @__PURE__ */ me(xo, [["__scopeId", "data-v-ca4aca14"]]);
function Co(e, t) {
  if (!e) return null;
  const n = De(e, t);
  return typeof n == "string" && n.trim() ? n : null;
}
function Mo(e, t) {
  const n = Oe(t, "state"), s = Oe(t, "tint");
  return {
    identity: ln(Oe(t, "identity"), e),
    reference: ln(Oe(t, "reference"), e),
    metrics: sa(t, "metric").map((a) => ({
      column: a,
      label: a.label ?? "",
      text: qt(a, e)
    })),
    state: n ? De(n, e) ?? null : null,
    updated: ln(Oe(t, "updated"), e),
    image: Co(Oe(t, "image"), e),
    tint: s ? De(s, e) ?? null : null
  };
}
function wa(e, t, n, s, a = !1) {
  const l = n?.columns ?? [];
  return {
    row: e,
    key: Cl(e, t),
    entityLabel: e.entityLabel,
    entity: n,
    columns: l,
    ordinal: bl(t),
    parts: Mo(e, l),
    pinned: s,
    selected: a
  };
}
function xt() {
  const e = Ce(), t = v(
    () => new Map(e.entities.value.map((n) => [n.key, n]))
  );
  return v(
    () => e.rows.value.map(
      (n, s) => wa(
        n,
        e.offset.value + s,
        t.value.get(n.entityKey) ?? null,
        e.isPinned(n),
        e.isSelected(n)
      )
    )
  );
}
const So = ["data-dc-status"], Eo = /* @__PURE__ */ pe({
  __name: "StatusPill",
  props: {
    status: {}
  },
  setup(e) {
    return (t, n) => (f(), m("span", {
      class: "dc-pill",
      "data-dc-status": e.status
    }, A(e.status), 9, So));
  }
}), Ut = /* @__PURE__ */ me(Eo, [["__scopeId", "data-v-23e59fbf"]]), Po = ["title"], Ao = { key: 1 }, zo = /* @__PURE__ */ pe({
  __name: "MetricDrill",
  props: {
    entry: {},
    column: {}
  },
  setup(e) {
    const t = e, n = Ce(), s = v(() => !t.entry.entity?.scope || !t.column.drill ? null : n.entities.value.find((i) => i.key === t.column.drill) ?? null), a = v(() => t.column.label ?? ""), l = v(() => qt(t.column, t.entry.row));
    function r(o) {
      o.stopPropagation(), s.value && n.drill(t.entry.row, s.value, je(o));
    }
    return (o, i) => s.value ? (f(), m("button", {
      key: 0,
      type: "button",
      class: "dc-drill",
      title: `${a.value} of ${e.entry.parts.identity} — show the ${s.value.label.toLowerCase()}`,
      onClick: r
    }, [
      be(o.$slots, "default", {}, () => [
        Ue(A(l.value), 1)
      ], !0)
    ], 8, Po)) : (f(), m("span", Ao, [
      be(o.$slots, "default", {}, () => [
        Ue(A(l.value), 1)
      ], !0)
    ]));
  }
}), Ht = /* @__PURE__ */ me(zo, [["__scopeId", "data-v-f2501b17"]]), To = ["data-dc-active", "aria-pressed", "aria-label"], Ro = /* @__PURE__ */ pe({
  __name: "PinStar",
  props: {
    row: {},
    pinned: { type: Boolean },
    name: {}
  },
  setup(e) {
    const t = e, n = Ce();
    function s(a) {
      a.stopPropagation(), n.togglePin(t.row);
    }
    return (a, l) => (f(), m("button", {
      type: "button",
      class: "dc-star",
      "data-dc-active": e.pinned ? "true" : "false",
      "aria-pressed": e.pinned,
      "aria-label": e.pinned ? `Unpin ${e.name}` : `Pin ${e.name}`,
      onClick: s
    }, A(e.pinned ? "★" : "☆"), 9, To));
  }
}), Zn = /* @__PURE__ */ me(Ro, [["__scopeId", "data-v-ef63d763"]]), Lo = ["src"], Fo = /* @__PURE__ */ pe({
  __name: "RowPicture",
  props: {
    src: {}
  },
  setup(e) {
    const t = e, n = U(!1);
    return $e(
      () => t.src,
      () => {
        n.value = !1;
      }
    ), (s, a) => e.src.trim() && !n.value ? (f(), m("img", {
      key: 0,
      class: "dc-picture",
      src: e.src,
      alt: "",
      loading: "lazy",
      decoding: "async",
      onError: a[0] || (a[0] = (l) => n.value = !0)
    }, null, 40, Lo)) : z("", !0);
  }
}), Jn = /* @__PURE__ */ me(Fo, [["__scopeId", "data-v-afaab300"]]), No = ["title", "aria-label"], Do = /* @__PURE__ */ pe({
  __name: "ScopeMark",
  props: {
    entry: {}
  },
  setup(e) {
    const t = e, n = Ce(), s = v(
      () => n.narrowsOnPress.value ? null : t.entry.entity?.scope ?? null
    );
    function a(l) {
      l.stopPropagation(), n.drill(t.entry.row, null, je(l));
    }
    return (l, r) => s.value ? (f(), m("button", {
      key: 0,
      type: "button",
      class: "dc-scope",
      title: `Narrow everything to ${s.value}: ${e.entry.row.id} — ⌘-click to leave it out`,
      "aria-label": `Narrow everything to ${e.entry.parts.identity}`,
      onClick: a
    }, " → ", 8, No)) : z("", !0);
  }
}), jt = /* @__PURE__ */ me(Do, [["__scopeId", "data-v-feb1c62d"]]), Io = ["checked", "aria-label"], Ct = /* @__PURE__ */ pe({
  __name: "SelectTick",
  props: {
    row: {},
    selected: { type: Boolean },
    name: {}
  },
  setup(e) {
    const t = e, n = Ce();
    function s(a) {
      a.stopPropagation(), n.toggleSelect(t.row);
    }
    return (a, l) => (f(), m("input", {
      class: "dc-tick",
      type: "checkbox",
      checked: e.selected,
      "aria-label": `Select ${e.name}`,
      onClick: s
    }, null, 8, Io));
  }
}), Oo = { class: "dc-cards" }, Bo = { class: "dc-card__top dc-mono" }, Ko = { class: "dc-card__lead" }, Vo = {
  key: 1,
  class: "dc-card__entity"
}, qo = { class: "dc-card__top-right" }, Wo = ["onClick"], Uo = { class: "dc-card__names" }, Ho = { class: "dc-card__primary" }, jo = { class: "dc-card__secondary dc-mono" }, Xo = { class: "dc-card__metrics dc-mono" }, Go = {
  key: 0,
  class: "dc-card__date"
}, Yo = /* @__PURE__ */ pe({
  __name: "CardsView",
  setup(e) {
    const t = Ce(), n = xt(), s = v(() => t.isEverything.value);
    return (a, l) => (f(), m("div", Oo, [
      (f(!0), m(Q, null, ce(E(n), (r) => (f(), m("div", {
        key: r.key,
        class: "dc-card"
      }, [
        w("div", Bo, [
          w("span", Ko, [
            E(t).selectable.value ? (f(), re(Ct, {
              key: 0,
              row: r.row,
              selected: r.selected,
              name: r.parts.identity
            }, null, 8, ["row", "selected", "name"])) : z("", !0),
            Ue(" " + A(r.ordinal) + " ", 1),
            s.value ? (f(), m("span", Vo, A(r.entityLabel), 1)) : z("", !0)
          ]),
          w("span", qo, [
            r.parts.state ? (f(), re(Ut, {
              key: 0,
              status: r.parts.state
            }, null, 8, ["status"])) : z("", !0),
            ye(jt, { entry: r }, null, 8, ["entry"]),
            E(t).pinnable.value ? (f(), re(Zn, {
              key: 1,
              row: r.row,
              name: r.parts.identity,
              pinned: r.pinned
            }, null, 8, ["row", "name", "pinned"])) : z("", !0)
          ])
        ]),
        w("button", {
          type: "button",
          class: "dc-card__open",
          onClick: (o) => E(t).activate(r.row, E(je)(o))
        }, [
          r.parts.image ? (f(), re(Jn, {
            key: 0,
            class: "dc-card__image",
            src: r.parts.image
          }, null, 8, ["src"])) : z("", !0),
          w("span", Uo, [
            w("span", Ho, A(r.parts.identity), 1),
            w("span", jo, A(r.parts.reference), 1)
          ])
        ], 8, Wo),
        w("div", Xo, [
          (f(!0), m(Q, null, ce(r.parts.metrics.slice(0, 2), (o) => (f(), re(Ht, {
            key: o.column.key ?? o.label,
            entry: r,
            column: o.column
          }, {
            default: We(() => [
              Ue(A(o.label) + " " + A(o.text), 1)
            ]),
            _: 2
          }, 1032, ["entry", "column"]))), 128)),
          r.parts.updated ? (f(), m("span", Go, A(r.parts.updated), 1)) : z("", !0)
        ])
      ]))), 128))
    ]));
  }
}), ka = /* @__PURE__ */ me(Yo, [["__scopeId", "data-v-434bd32f"]]), Qo = { class: "dc-grid" }, Zo = ["onClick"], Jo = { class: "dc-tile__scrim" }, ei = { class: "dc-tile__top dc-mono" }, ti = { class: "dc-tile__chip" }, ni = { class: "dc-tile__caption" }, si = { class: "dc-tile__secondary dc-truncate" }, ai = { class: "dc-tile__primary" }, li = /* @__PURE__ */ pe({
  __name: "GridView",
  setup(e) {
    const t = Ce(), n = xt();
    return (s, a) => (f(), m("div", Qo, [
      (f(!0), m(Q, null, ce(E(n), (l) => (f(), m("div", {
        key: l.key,
        class: "dc-grid__cell"
      }, [
        w("button", {
          type: "button",
          class: "dc-tile",
          style: Re({ "--dc-tile-tint": l.parts.tint ?? void 0 }),
          onClick: (r) => E(t).activate(l.row, E(je)(r))
        }, [
          l.parts.image ? (f(), re(Jn, {
            key: 0,
            class: "dc-tile__image",
            src: l.parts.image
          }, null, 8, ["src"])) : z("", !0),
          w("span", Jo, [
            w("span", ei, [
              w("span", ti, A(l.ordinal), 1)
            ]),
            w("span", ni, [
              w("span", si, A(l.parts.reference), 1),
              w("span", ai, A(l.parts.identity), 1)
            ])
          ])
        ], 12, Zo),
        E(t).selectable.value ? (f(), re(Ct, {
          key: 0,
          class: "dc-grid__tick",
          row: l.row,
          selected: l.selected,
          name: l.parts.identity
        }, null, 8, ["row", "selected", "name"])) : z("", !0)
      ]))), 128))
    ]));
  }
}), ba = /* @__PURE__ */ me(li, [["__scopeId", "data-v-7df25d40"]]), ri = { class: "dc-links" }, oi = ["onClick"], ii = { class: "dc-link__primary dc-truncate" }, ci = { class: "dc-link__secondary dc-mono dc-truncate" }, ui = /* @__PURE__ */ pe({
  __name: "LinksView",
  setup(e) {
    const t = Ce(), n = xt();
    return (s, a) => (f(), m("div", ri, [
      (f(!0), m(Q, null, ce(E(n), (l) => (f(), m("span", {
        key: l.key,
        class: "dc-links__item"
      }, [
        E(t).selectable.value ? (f(), re(Ct, {
          key: 0,
          row: l.row,
          selected: l.selected,
          name: l.parts.identity
        }, null, 8, ["row", "selected", "name"])) : z("", !0),
        w("button", {
          type: "button",
          class: "dc-link",
          onClick: (r) => E(t).activate(l.row, E(je)(r))
        }, [
          w("span", ii, A(l.parts.identity), 1),
          w("span", ci, A(l.parts.reference), 1)
        ], 8, oi)
      ]))), 128))
    ]));
  }
}), $a = /* @__PURE__ */ me(ui, [["__scopeId", "data-v-08d0266c"]]), di = {
  class: "dc-list",
  role: "list"
}, fi = ["onClick"], pi = { class: "dc-list__ordinal dc-mono" }, vi = { class: "dc-list__identity" }, mi = { class: "dc-list__primary dc-truncate" }, hi = { class: "dc-list__secondary dc-mono dc-truncate" }, _i = {
  key: 1,
  class: "dc-list__entity dc-mono"
}, gi = { class: "dc-list__metrics dc-mono" }, yi = { class: "dc-list__trailing" }, wi = /* @__PURE__ */ pe({
  __name: "ListView",
  setup(e) {
    const t = Ce(), n = xt(), s = v(() => t.isEverything.value);
    return (a, l) => (f(), m("div", di, [
      (f(!0), m(Q, null, ce(E(n), (r) => (f(), m("div", {
        key: r.key,
        class: "dc-list__row",
        role: "listitem"
      }, [
        E(t).selectable.value ? (f(), re(Ct, {
          key: 0,
          class: "dc-list__tick",
          row: r.row,
          selected: r.selected,
          name: r.parts.identity
        }, null, 8, ["row", "selected", "name"])) : z("", !0),
        w("button", {
          type: "button",
          class: "dc-list__open",
          onClick: (o) => E(t).activate(r.row, E(je)(o))
        }, [
          w("span", pi, A(r.ordinal), 1),
          w("span", vi, [
            w("span", mi, A(r.parts.identity), 1),
            w("span", hi, A(r.parts.reference), 1)
          ])
        ], 8, fi),
        s.value ? (f(), m("span", _i, A(r.entityLabel), 1)) : z("", !0),
        w("span", gi, [
          (f(!0), m(Q, null, ce(r.parts.metrics.slice(0, 2), (o) => (f(), re(Ht, {
            key: o.column.key ?? o.label,
            entry: r,
            column: o.column
          }, null, 8, ["entry", "column"]))), 128))
        ]),
        w("span", yi, [
          r.parts.state ? (f(), re(Ut, {
            key: 0,
            status: r.parts.state
          }, null, 8, ["status"])) : z("", !0),
          ye(jt, { entry: r }, null, 8, ["entry"]),
          E(t).pinnable.value ? (f(), re(Zn, {
            key: 1,
            row: r.row,
            name: r.parts.identity,
            pinned: r.pinned
          }, null, 8, ["row", "name", "pinned"])) : z("", !0)
        ])
      ]))), 128))
    ]));
  }
}), zn = /* @__PURE__ */ me(wi, [["__scopeId", "data-v-8e3fd7b4"]]), ki = { class: "dc-preview" }, bi = { class: "dc-preview__pager dc-mono" }, $i = ["disabled"], xi = { "aria-live": "polite" }, Ci = ["disabled"], Mi = {
  key: 0,
  class: "dc-preview__card"
}, Si = { class: "dc-preview__body" }, Ei = { class: "dc-preview__top" }, Pi = { class: "dc-preview__badges" }, Ai = { class: "dc-preview__entity dc-mono" }, zi = { class: "dc-preview__marks" }, Ti = { class: "dc-preview__primary" }, Ri = { class: "dc-preview__secondary dc-mono" }, Li = { class: "dc-preview__fields" }, Fi = { class: "dc-preview__key" }, Ni = { class: "dc-preview__value dc-mono" }, Di = /* @__PURE__ */ pe({
  __name: "PreviewView",
  setup(e) {
    const t = Ce(), n = xt(), s = U(0);
    $e(n, (i) => {
      s.value > i.length - 1 && (s.value = Math.max(0, i.length - 1));
    });
    const a = v(() => n.value[s.value]), l = v(() => {
      const i = a.value;
      if (!i) return [];
      const u = Oe(i.columns, "reference"), d = Oe(i.columns, "updated");
      return [
        ...u ? [{ key: u.label ?? "Reference", value: i.parts.reference, column: null }] : [],
        ...i.parts.metrics.map((_) => ({
          key: _.label,
          value: _.text,
          column: _.column
        })),
        ...d ? [{ key: d.label ?? "Updated", value: i.parts.updated, column: null }] : []
      ];
    }), r = v(() => {
      if (!n.value.length) return "0 / 0";
      const i = t.total.value > n.value.length ? ` of ${t.total.value}` : "";
      return `${s.value + 1} / ${n.value.length}${i}`;
    }), o = (i) => {
      const u = n.value.length;
      u && (s.value = Math.min(u - 1, Math.max(0, s.value + i)));
    };
    return (i, u) => (f(), m("div", ki, [
      w("div", bi, [
        w("button", {
          type: "button",
          class: "dc-preview__step",
          "aria-label": "Previous result",
          disabled: s.value === 0,
          onClick: u[0] || (u[0] = (d) => o(-1))
        }, " ‹ ", 8, $i),
        w("span", xi, A(r.value), 1),
        w("button", {
          type: "button",
          class: "dc-preview__step",
          "aria-label": "Next result",
          disabled: s.value >= E(n).length - 1,
          onClick: u[1] || (u[1] = (d) => o(1))
        }, " › ", 8, Ci)
      ]),
      a.value ? (f(), m("div", Mi, [
        w("div", {
          class: "dc-preview__media",
          style: Re({ background: a.value.parts.tint ?? void 0 }),
          "aria-hidden": "true"
        }, " preview ", 4),
        w("div", Si, [
          w("div", Ei, [
            w("span", Pi, [
              E(t).selectable.value ? (f(), re(Ct, {
                key: 0,
                row: a.value.row,
                selected: a.value.selected,
                name: a.value.parts.identity
              }, null, 8, ["row", "selected", "name"])) : z("", !0),
              a.value.parts.state ? (f(), re(Ut, {
                key: 1,
                status: a.value.parts.state
              }, null, 8, ["status"])) : z("", !0),
              w("span", Ai, A(a.value.entityLabel), 1)
            ]),
            w("span", zi, [
              ye(jt, { entry: a.value }, null, 8, ["entry"]),
              E(t).pinnable.value ? (f(), re(Zn, {
                key: 0,
                row: a.value.row,
                name: a.value.parts.identity,
                pinned: a.value.pinned
              }, null, 8, ["row", "name", "pinned"])) : z("", !0)
            ])
          ]),
          w("div", null, [
            w("div", Ti, A(a.value.parts.identity), 1),
            w("div", Ri, A(a.value.parts.reference), 1)
          ]),
          w("dl", Li, [
            (f(!0), m(Q, null, ce(l.value, (d) => (f(), m("div", {
              key: d.key,
              class: "dc-preview__field"
            }, [
              w("dt", Fi, A(d.key), 1),
              w("dd", Ni, [
                d.column && a.value ? (f(), re(Ht, {
                  key: 0,
                  entry: a.value,
                  column: d.column
                }, null, 8, ["entry", "column"])) : (f(), m(Q, { key: 1 }, [
                  Ue(A(d.value), 1)
                ], 64))
              ])
            ]))), 128))
          ]),
          w("button", {
            type: "button",
            class: "dc-preview__open",
            onClick: u[2] || (u[2] = (d) => E(t).activate(a.value.row, E(je)(d)))
          }, " Open record → ")
        ])
      ])) : z("", !0)
    ]));
  }
}), xa = /* @__PURE__ */ me(Di, [["__scopeId", "data-v-b14eee6d"]]);
function Ii() {
  const e = Ce();
  return v(() => $l(e.schema.value, e.entity.value));
}
const Oi = ["title"], Bi = {
  key: 5,
  class: "dc-cell__text"
}, Ki = /* @__PURE__ */ pe({
  __name: "ColumnCell",
  props: {
    column: {},
    entry: {}
  },
  setup(e) {
    const t = e, n = Ce(), s = v(() => t.column.kind ?? "text"), a = v(() => De(t.column, t.entry.row)), l = v(
      () => s.value === "ordinal" ? t.entry.ordinal : qt(t.column, t.entry.row)
    ), r = v(() => a.value), o = v(() => t.column.activate === !0 || !!t.column.click), i = v(() => Pn(t.column)), u = v(() => aa(t.column, t.entry.row));
    function d(_) {
      if (!o.value) return;
      _.stopPropagation();
      const y = je(_);
      t.column.click?.(t.entry.row, y), t.column.activate && n.activate(t.entry.row, y);
    }
    return (_, y) => s.value === "component" && e.column.component ? (f(), re(In(e.column.component), {
      key: 0,
      row: e.entry.row,
      entry: e.entry,
      value: a.value,
      column: e.column
    }, null, 8, ["row", "entry", "value", "column"])) : s.value === "status" ? (f(), re(Ut, {
      key: 1,
      status: r.value
    }, null, 8, ["status"])) : s.value === "image" ? (f(), re(Jn, {
      key: 2,
      class: "dc-cell__image",
      src: typeof a.value == "string" ? a.value : "",
      style: Re({ maxHeight: e.column.height }),
      onClick: d
    }, null, 8, ["src", "style"])) : e.column.drill ? (f(), re(Ht, {
      key: 3,
      entry: e.entry,
      column: e.column
    }, null, 8, ["entry", "column"])) : o.value ? (f(), m("button", {
      key: 4,
      type: "button",
      class: un(["dc-table__open", { "dc-truncate": i.value }]),
      title: u.value,
      onClick: d
    }, A(l.value), 11, Oi)) : (f(), m("span", Bi, A(l.value), 1));
  }
}), Rs = /* @__PURE__ */ me(Ki, [["__scopeId", "data-v-70ba8aa2"]]), Vi = {
  key: 0,
  class: "dc-table__none"
}, qi = { class: "dc-table__detail" }, Wi = ["data-dc-wrap"], Ui = {
  key: 0,
  class: "dc-table__pick",
  scope: "col"
}, Hi = ["data-dc-align", "data-dc-hide", "aria-sort", "title"], ji = ["onClick"], Xi = {
  key: 2,
  class: "dc-table__head"
}, Gi = ["onClick"], Yi = {
  key: 0,
  class: "dc-table__pick"
}, Qi = ["data-dc-align", "data-dc-hide", "title"], Zi = {
  key: 0,
  class: "dc-table__name"
}, Ji = /* @__PURE__ */ pe({
  __name: "TableView",
  setup(e) {
    const t = Ce(), n = xt(), s = Ii(), a = v(
      () => s.value.some((y) => y.kind === "image" || y.height !== void 0)
    );
    function l(y) {
      y && (t.query.value.sort === y ? t.toggleDirection() : t.setSort(y));
    }
    const r = v(() => t.entity.value?.label ?? "The result set"), o = v(() => new Set(t.sorts.value.map((y) => y.key))), i = (y) => y.sort !== void 0 && o.value.has(y.sort), u = (y) => {
      if (i(y))
        return t.query.value.sort !== y.sort ? "none" : t.query.value.dir === "desc" ? "descending" : "ascending";
    };
    function d(y) {
      return [
        xs(y),
        y.muted ? "dc-table__muted" : "",
        y.mono ? "dc-mono" : "",
        Pn(y) ? "dc-truncate" : ""
      ].filter(Boolean).join(" ");
    }
    function _(y, k) {
      if (!(!Pn(y) || y.activate || y.click))
        return aa(y, k.row);
    }
    return (y, k) => E(s).length ? (f(), m("table", {
      key: 1,
      class: "dc-table",
      "data-dc-wrap": a.value ? "" : void 0
    }, [
      w("thead", null, [
        w("tr", null, [
          E(t).selectable.value ? (f(), m("th", Ui, [...k[3] || (k[3] = [
            w("span", { class: "dc-table__sr" }, "Select", -1)
          ])])) : z("", !0),
          (f(!0), m(Q, null, ce(E(s), (b, C) => (f(), m("th", {
            key: E(bs)(b, C),
            scope: "col",
            class: un(E(xs)(b)),
            style: Re({ width: b.width }),
            "data-dc-align": E($s)(b),
            "data-dc-hide": b.hideBelow,
            "aria-sort": u(b),
            title: b.hint
          }, [
            i(b) ? (f(), m("button", {
              key: 0,
              type: "button",
              class: "dc-table__sort",
              onClick: (g) => l(b.sort)
            }, A(b.label), 9, ji)) : (f(), m(Q, { key: 1 }, [
              Ue(A(b.label), 1)
            ], 64)),
            b.header ? (f(), m("span", Xi, [
              (f(), re(In(b.header), {
                column: b,
                entity: E(t).entity.value
              }, null, 8, ["column", "entity"]))
            ])) : z("", !0)
          ], 14, Hi))), 128))
        ])
      ]),
      w("tbody", null, [
        (f(!0), m(Q, null, ce(E(n), (b) => (f(), m("tr", {
          key: b.key,
          class: "dc-table__row",
          onClick: (C) => E(t).activate(b.row, E(je)(C))
        }, [
          E(t).selectable.value ? (f(), m("td", Yi, [
            ye(Ct, {
              row: b.row,
              selected: b.selected,
              name: b.parts.identity
            }, null, 8, ["row", "selected", "name"])
          ])) : z("", !0),
          (f(!0), m(Q, null, ce(E(s), (C, g) => (f(), m("td", {
            key: E(bs)(C, g),
            class: un(d(C)),
            "data-dc-align": E($s)(C),
            "data-dc-hide": C.hideBelow,
            title: _(C, b)
          }, [
            C.scope ? (f(), m("span", Zi, [
              ye(Rs, {
                column: C,
                entry: b
              }, null, 8, ["column", "entry"]),
              ye(jt, { entry: b }, null, 8, ["entry"])
            ])) : (f(), re(Rs, {
              key: 1,
              column: C,
              entry: b
            }, null, 8, ["column", "entry"]))
          ], 10, Qi))), 128))
        ], 8, Gi))), 128))
      ])
    ], 8, Wi)) : (f(), m("p", Vi, [
      k[2] || (k[2] = w("span", { class: "dc-table__headline" }, "No columns declared", -1)),
      w("span", qi, [
        Ue(A(r.value) + " has no ", 1),
        k[0] || (k[0] = w("code", null, "columns", -1)),
        k[1] || (k[1] = Ue(" in the schema, so there is no table to draw. ", -1))
      ])
    ]));
  }
}), Ca = /* @__PURE__ */ me(Ji, [["__scopeId", "data-v-25251288"]]);
function ec(e) {
  const t = It([]), n = U(!1), s = It(null);
  let a = 0;
  const l = (i, u, d, _, y) => ({
    entity: i,
    rows: u.rows.map(
      (k, b) => wa(k, b, i, e.isPinned(k.id))
    ),
    total: u.total,
    count: d ? i.count : String(u.total),
    pinned: tc(_, u, y)
  }), r = () => {
    const i = ++a, u = e.query.value, d = e.schema.value, _ = e.entities.value, y = e.limit.value, k = e.within?.value.trim() ?? "", b = Bn(u) && !k, C = k ? oa(k, u.expr) : u.expr, g = _.map(($) => ({
      entity: $,
      // Scope the query to this entity, keeping the expression and ordering
      // but dropping facets, which belong to whichever entity is selected.
      outcome: e.source.value.query({
        // Each card is the top few of its type, wherever the shell's own
        // result set has been paged to — so this asks for the first page.
        query: { ...u, entity: $.key, expr: C, facets: Bt($), page: 1 },
        schema: d,
        entity: $,
        limit: y,
        offset: 0
      })
    }));
    if (g.every(({ outcome: $ }) => !($ instanceof Promise))) {
      t.value = g.map(
        ({ entity: $, outcome: R }) => l($, R, b, d, C)
      ), s.value = null, n.value = !1;
      return;
    }
    n.value = !0, Promise.all(g.map(({ outcome: $ }) => Promise.resolve($))).then(($) => {
      i === a && (t.value = $.map(
        (R, I) => l(g[I].entity, R, b, d, C)
      ), s.value = null);
    }).catch(($) => {
      i === a && (s.value = $, t.value = []);
    }).finally(() => {
      i === a && (n.value = !1);
    });
  }, o = () => {
    try {
      r();
    } catch (i) {
      s.value = i, t.value = [], n.value = !1;
    }
  };
  return $e(
    [
      e.source,
      e.schema,
      e.query,
      e.entities,
      e.limit,
      () => e.within?.value
    ],
    o,
    { immediate: !0 }
  ), { previews: t, pending: n, error: s, refresh: o };
}
function tc(e, t, n) {
  const s = t.rows[0];
  if (t.total !== 1 || t.rows.length !== 1 || !s)
    return !1;
  const a = n.trim();
  if (!a)
    return !1;
  const l = qn(e, s);
  return !!l && ua(a, l) === a;
}
const nc = ["data-dc-pending"], sc = {
  key: 0,
  class: "dc-types__state",
  role: "alert"
}, ac = {
  key: 1,
  class: "dc-types__state",
  "aria-live": "polite"
}, lc = {
  key: 2,
  class: "dc-types__state"
}, rc = ["data-dc-empty"], oc = ["onClick"], ic = { class: "dc-type__name" }, cc = { class: "dc-type__count dc-mono" }, uc = { class: "dc-type__sr" }, dc = {
  key: 0,
  class: "dc-type__empty"
}, fc = ["onClick"], pc = { class: "dc-type__identity" }, vc = { class: "dc-type__primary dc-truncate" }, mc = { class: "dc-type__secondary dc-mono dc-truncate" }, hc = { class: "dc-type__trailing dc-mono" }, _c = { class: "dc-type__metric-value" }, gc = { class: "dc-type__metric-label" }, yc = {
  key: 0,
  class: "dc-type__date"
}, wc = ["onClick"], kc = /* @__PURE__ */ pe({
  __name: "TypeCardsView",
  setup(e) {
    const t = Ce(), { previews: n, pending: s, error: a } = ec({
      source: t.source,
      schema: t.schema,
      query: t.query,
      entities: t.entities,
      limit: t.previewsPerType,
      within: t.within,
      isPinned: (o) => t.isPinnedId(o)
    }), l = v(() => !t.isPristine.value || !!t.within.value), r = v(
      () => n.value.filter(
        (o) => !o.pinned && (o.rows.length > 0 || o.entity.create)
      )
    );
    return (o, i) => (f(), m("div", {
      class: "dc-types",
      "data-dc-pending": E(s) ? "true" : "false"
    }, [
      be(o.$slots, "before", {}, void 0, !0),
      E(a) ? (f(), m("p", sc, " Could not load results: " + A(E(a) instanceof Error ? E(a).message : "the data source failed."), 1)) : !r.value.length && E(s) ? (f(), m("p", ac, " Running query… ")) : r.value.length ? z("", !0) : (f(), m("p", lc, A(l.value ? "Nothing matches this query" : "Nothing here yet"), 1)),
      (f(!0), m(Q, null, ce(r.value, (u) => (f(), m("section", {
        key: u.entity.key,
        class: "dc-type",
        "data-dc-empty": u.rows.length ? "false" : "true"
      }, [
        w("button", {
          type: "button",
          class: "dc-type__head",
          onClick: (d) => E(t).setEntity(u.entity.key)
        }, [
          w("span", ic, A(u.entity.label), 1),
          w("span", cc, A(u.count), 1),
          i[0] || (i[0] = w("span", {
            class: "dc-type__go",
            "aria-hidden": "true"
          }, "→", -1)),
          w("span", uc, "Show only " + A(u.entity.label.toLowerCase()), 1)
        ], 8, oc),
        u.rows.length ? z("", !0) : (f(), m("p", dc, A(l.value ? "No matches" : "Nothing here yet"), 1)),
        (f(!0), m(Q, null, ce(u.rows, (d) => (f(), m("div", {
          key: d.key,
          class: "dc-type__row"
        }, [
          w("button", {
            type: "button",
            class: "dc-type__open",
            onClick: (_) => E(t).activate(d.row, E(je)(_))
          }, [
            w("span", pc, [
              w("span", vc, A(d.parts.identity), 1),
              w("span", mc, A(d.parts.reference), 1)
            ])
          ], 8, fc),
          w("span", hc, [
            (f(!0), m(Q, null, ce(d.parts.metrics.slice(0, 1), (_) => (f(), re(Ht, {
              key: _.column.key ?? _.label,
              class: "dc-type__metric",
              entry: d,
              column: _.column
            }, {
              default: We(() => [
                w("span", _c, A(_.text), 1),
                w("span", gc, A(_.label), 1)
              ]),
              _: 2
            }, 1032, ["entry", "column"]))), 128)),
            d.parts.updated ? (f(), m("span", yc, A(d.parts.updated), 1)) : z("", !0),
            ye(jt, { entry: d }, null, 8, ["entry"])
          ])
        ]))), 128)),
        u.entity.create ? (f(), m("button", {
          key: 1,
          type: "button",
          class: "dc-type__new",
          onClick: (d) => E(t).create(u.entity)
        }, [
          i[1] || (i[1] = w("span", {
            class: "dc-type__plus",
            "aria-hidden": "true"
          }, "+", -1)),
          Ue(" " + A(u.entity.create), 1)
        ], 8, wc)) : z("", !0)
      ], 8, rc))), 128)),
      be(o.$slots, "after", {}, void 0, !0)
    ], 8, nc));
  }
}), Ma = /* @__PURE__ */ me(kc, [["__scopeId", "data-v-eb7e0cec"]]), bc = ["data-dc-pending"], $c = {
  key: 1,
  class: "dc-results__state",
  role: "alert"
}, xc = { class: "dc-results__detail" }, Cc = {
  key: 2,
  class: "dc-results__state",
  "aria-live": "polite"
}, Mc = {
  key: 3,
  class: "dc-results__state"
}, Sc = { class: "dc-results__detail" }, Ec = /* @__PURE__ */ pe({
  __name: "ResultsArea",
  props: {
    views: {}
  },
  setup(e) {
    const t = e, n = Ce(), s = Vt(), a = {
      list: zn,
      cards: ka,
      grid: ba,
      table: Ca,
      links: $a,
      preview: xa
    }, l = v(() => Kn(n.query.value)), r = v(() => Gs(n.query.value.view, t.views)), o = v(() => a[r.value] ?? zn), i = v(() => n.rows.value.length > 0), u = v(() => n.error.value !== null), d = U(null);
    return $e(
      () => n.query.value.page,
      () => {
        d.value && (d.value.scrollTop = 0);
      }
    ), (_, y) => (f(), m("div", {
      ref_key: "scroller",
      ref: d,
      class: "dc-results",
      "data-dc-pending": E(n).pending.value ? "true" : "false"
    }, [
      l.value ? (f(), re(Ma, { key: 0 }, sn({ _: 2 }, [
        s["cards-before"] ? {
          name: "before",
          fn: We(() => [
            be(_.$slots, "cards-before", {}, void 0, !0)
          ]),
          key: "0"
        } : void 0,
        s["cards-after"] ? {
          name: "after",
          fn: We(() => [
            be(_.$slots, "cards-after", {}, void 0, !0)
          ]),
          key: "1"
        } : void 0
      ]), 1024)) : u.value ? (f(), m("p", $c, [
        y[1] || (y[1] = w("span", { class: "dc-results__headline" }, "Could not load results", -1)),
        w("span", xc, A(E(n).error.value instanceof Error ? E(n).error.value.message : "The data source failed."), 1)
      ])) : !i.value && E(n).pending.value ? (f(), m("p", Cc, [...y[2] || (y[2] = [
        w("span", { class: "dc-results__detail" }, "Running query…", -1)
      ])])) : i.value ? (f(), re(In(o.value), { key: 4 })) : (f(), m("div", Mc, [
        y[3] || (y[3] = w("span", { class: "dc-results__headline" }, "Nothing matches this query", -1)),
        w("span", Sc, A(E(n).summary.value), 1),
        E(n).isPristine.value ? z("", !0) : (f(), m("button", {
          key: 0,
          type: "button",
          class: "dc-results__clear",
          onClick: y[0] || (y[0] = (k) => E(n).clearFilters())
        }, A(E(n).isEverything.value ? "Clear filters" : "Search everything instead"), 1))
      ]))
    ], 8, bc));
  }
}), Sa = /* @__PURE__ */ me(Ec, [["__scopeId", "data-v-41f54508"]]), Pc = ["data-dc-theme"], Ac = ["data-dc-width", "data-dc-align"], zc = { class: "dc-shell__panel" }, Tc = /* @__PURE__ */ pe({
  __name: "DataShell",
  props: /* @__PURE__ */ dn({
    schema: {},
    source: {},
    route: {},
    defaults: {},
    within: {},
    limit: { default: 50 },
    previewsPerType: { default: 3 },
    views: {},
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
  emits: /* @__PURE__ */ dn(["activate", "create", "duplicate", "delete", "drill", "query-change", "toggle-pin"], ["update:open", "update:pinned", "update:selected"]),
  setup(e, { expose: t, emit: n }) {
    const s = e, a = n, l = Tt(e, "open"), r = Tt(e, "pinned"), o = Tt(e, "selected"), i = Vt(), u = bt(Hs, null), d = s.route || u ? null : ml(), _ = s.route ?? u ?? d;
    Ze(() => d?.dispose?.());
    const y = v(() => Gl({ seed: s.schema.key })), k = v(() => s.source ?? y.value), b = cr({
      schema: () => s.schema,
      adapter: _,
      defaults: () => s.defaults,
      navigationMode: () => s.navigationMode,
      facetNavigationMode: () => s.facetNavigationMode
    }), C = v(() => s.within?.trim() ?? ""), g = ur({
      source: k,
      query: b.query,
      schema: v(() => s.schema),
      entity: b.entity,
      limit: v(() => s.limit),
      within: C
    });
    $e(b.query, (x) => a("query-change", x)), $e(
      [g.pageCount, g.pending, b.query],
      () => {
        if (g.pending.value) return;
        const x = g.pageCount.value;
        b.query.value.page > x && b.setPage(x, "replace");
      },
      // Immediately, since a pasted URL is past the end before anything changes;
      // and after the render, so the correction is a navigation the mounted shell
      // makes rather than one it makes on the way up. An async source is still
      // pending here and corrects itself when its count lands.
      { immediate: !0, flush: "post" }
    );
    const $ = Ws() ?? "dc-query-panel", R = U(null);
    function I() {
      l.value && (l.value = !1, Ot(() => {
        R.value?.$el?.querySelector(".dc-header__toggle")?.focus();
      }));
    }
    const L = v(() => new Set(r.value));
    function N(x) {
      const O = new Set(L.value);
      O.has(x.id) ? O.delete(x.id) : O.add(x.id), r.value = [...O], a("toggle-pin", x);
    }
    const q = v(() => {
      if (s.selectable === !0) return !0;
      const x = b.entity.value;
      return !!(x?.duplicate || x?.delete);
    }), S = v(() => new Set(o.value));
    function T(x) {
      const O = new Set(S.value);
      O.has(x.id) ? O.delete(x.id) : O.add(x.id), o.value = [...O];
    }
    function te(x) {
      const O = new Set(S.value);
      for (const X of g.rows.value)
        x ? O.add(X.id) : O.delete(X.id);
      o.value = [...O];
    }
    function ae() {
      o.value.length && (o.value = []);
    }
    const ue = v(() => ({
      ids: [...o.value],
      rows: g.rows.value.filter((x) => S.value.has(x.id)),
      entity: b.entity.value
    }));
    $e(() => b.query.value.entity, ae);
    function Y(x, O, X = {}) {
      const ne = Zl(s.schema, b.query.value, x, X);
      X.exclude ? b.narrow(ne, O?.key ?? b.query.value.entity) : b.narrow(ne, O?.key ?? null, O ? void 0 : "cards"), a("drill", x, O, X);
    }
    const ve = er({
      ...b,
      schema: v(() => s.schema),
      entities: v(() => s.schema.entities),
      rows: g.rows,
      total: g.total,
      limit: v(() => s.limit),
      offset: g.offset,
      pageCount: g.pageCount,
      pending: g.pending,
      error: g.error,
      source: k,
      previewsPerType: v(() => s.previewsPerType),
      within: C,
      pinnable: v(() => s.pinnable === !0),
      isPinned: (x) => L.value.has(x.id),
      isPinnedId: (x) => L.value.has(x),
      togglePin: N,
      selectable: q,
      selection: ue,
      isSelected: (x) => S.value.has(x.id),
      toggleSelect: T,
      selectPage: te,
      clearSelection: ae,
      narrowsOnPress: v(() => s.rowPress === "narrow"),
      /*
       * The one place a press is read, so every view gets the same answer without
       * knowing which of the two it is: they all call this.
       */
      activate: (x, O = {}) => {
        if (s.rowPress === "narrow" && qn(s.schema, x)) {
          Y(x, null, O);
          return;
        }
        a("activate", x);
      },
      create: (x) => a("create", x),
      duplicate: () => a("duplicate", ue.value),
      delete: () => a("delete", ue.value),
      drill: Y
    }), Se = v(() => {
      if (!(!s.accent && !s.tokens))
        return { ...s.tokens, ...s.accent ? { "--dc-accent": s.accent } : {} };
    });
    return t({
      query: b.query,
      openPanel: () => {
        l.value = !0;
      },
      closePanel: I
    }), (x, O) => (f(), m("div", {
      class: "dc-shell",
      "data-dc-theme": e.theme,
      style: Re(Se.value)
    }, [
      w("div", {
        class: "dc-shell__head",
        "data-dc-width": e.matchWidth,
        "data-dc-align": e.matchWidth === "shrink" ? e.headAlign : void 0
      }, [
        ye(ha, {
          ref_key: "headerRef",
          ref: R,
          expanded: l.value,
          "panel-id": E($),
          views: e.views,
          "pages-note": e.pagesNote,
          onToggle: O[0] || (O[0] = (X) => l.value = !l.value)
        }, sn({ _: 2 }, [
          i.actions ? {
            name: "actions",
            fn: We(() => [
              be(x.$slots, "actions", {}, void 0, !0)
            ]),
            key: "0"
          } : void 0
        ]), 1032, ["expanded", "panel-id", "views", "pages-note"]),
        l.value ? (f(), m(Q, { key: 0 }, [
          w("div", {
            class: "dc-shell__scrim",
            onClick: I
          }),
          w("div", zc, [
            ye(ga, {
              "panel-id": E($),
              onClose: I
            }, sn({ _: 2 }, [
              i["panel-section"] ? {
                name: "panel-section",
                fn: We(() => [
                  be(x.$slots, "panel-section", {}, void 0, !0)
                ]),
                key: "0"
              } : void 0
            ]), 1032, ["panel-id"])
          ])
        ], 64)) : z("", !0)
      ], 8, Ac),
      ye(ya),
      be(x.$slots, "results", {
        rows: E(ve).rows.value,
        total: E(ve).total.value,
        offset: E(ve).offset.value,
        pageCount: E(ve).pageCount.value,
        query: E(ve).query.value,
        pending: E(ve).pending.value
      }, () => [
        ye(Sa, { views: e.views }, sn({ _: 2 }, [
          i["cards-before"] ? {
            name: "cards-before",
            fn: We(() => [
              be(x.$slots, "cards-before", {}, void 0, !0)
            ]),
            key: "0"
          } : void 0,
          i["cards-after"] ? {
            name: "cards-after",
            fn: We(() => [
              be(x.$slots, "cards-after", {}, void 0, !0)
            ]),
            key: "1"
          } : void 0
        ]), 1032, ["views"])
      ], !0)
    ], 12, Pc));
  }
}), Rc = /* @__PURE__ */ me(Tc, [["__scopeId", "data-v-7b71d70f"]]), Lc = ["data-dc-muted"], Fc = {
  key: 0,
  class: "dc-shell-card__head"
}, Nc = { class: "dc-shell-card__title" }, Dc = {
  key: 0,
  class: "dc-shell-card__count dc-mono"
}, Ic = {
  key: 0,
  class: "dc-shell-card__aside"
}, Oc = ["data-dc-flush"], Bc = {
  key: 2,
  class: "dc-shell-card__foot"
}, Kc = /* @__PURE__ */ pe({
  __name: "ShellCard",
  props: {
    title: {},
    count: {},
    span: {},
    flush: { type: Boolean },
    muted: { type: Boolean }
  },
  setup(e) {
    const t = e, n = v(() => t.span === "all" ? { gridColumn: "1 / -1" } : void 0), s = Vt();
    function a(d) {
      return l(d?.() ?? []);
    }
    function l(d) {
      return d.some((_) => _.type === ul ? !1 : _.type === dl ? String(_.children ?? "").trim().length > 0 : _.type === Q ? l(_.children ?? []) : !0);
    }
    const r = v(() => !!t.title || o.value || a(s.head)), o = v(() => a(s.aside)), i = v(() => a(s.default)), u = v(() => a(s.foot));
    return (d, _) => (f(), m("section", {
      class: "dc-shell-card",
      style: Re(n.value),
      "data-dc-muted": e.muted ? "true" : "false"
    }, [
      r.value ? (f(), m("header", Fc, [
        be(d.$slots, "head", {}, () => [
          w("h2", Nc, A(e.title), 1),
          e.count !== void 0 ? (f(), m("span", Dc, A(e.count), 1)) : z("", !0)
        ], !0),
        o.value ? (f(), m("span", Ic, [
          be(d.$slots, "aside", {}, void 0, !0)
        ])) : z("", !0)
      ])) : z("", !0),
      i.value ? (f(), m("div", {
        key: 1,
        class: "dc-shell-card__body",
        "data-dc-flush": e.flush ? "true" : "false"
      }, [
        be(d.$slots, "default", {}, void 0, !0)
      ], 8, Oc)) : z("", !0),
      u.value ? (f(), m("footer", Bc, [
        be(d.$slots, "foot", {}, void 0, !0)
      ])) : z("", !0)
    ], 12, Lc));
  }
}), Rd = /* @__PURE__ */ me(Kc, [["__scopeId", "data-v-75f2ef0b"]]), Vc = ["aria-label"], qc = ["aria-checked", "data-dc-active", "tabindex", "onClick", "onKeydown"], Wc = /* @__PURE__ */ pe({
  __name: "SegmentedControl",
  props: {
    modelValue: {},
    options: {},
    label: {},
    mono: { type: Boolean }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const n = e, s = t, a = U([]);
    function l(r, o) {
      const i = n.options.length;
      let u = null;
      if (r.key === "ArrowRight" || r.key === "ArrowDown" ? u = (o + 1) % i : r.key === "ArrowLeft" || r.key === "ArrowUp" ? u = (o - 1 + i) % i : r.key === "Home" ? u = 0 : r.key === "End" && (u = i - 1), u === null) return;
      r.preventDefault();
      const d = n.options[u];
      d && (s("update:modelValue", d.key), a.value[u]?.focus());
    }
    return (r, o) => (f(), m("div", {
      class: "dc-segmented",
      role: "radiogroup",
      "aria-label": e.label
    }, [
      (f(!0), m(Q, null, ce(e.options, (i, u) => (f(), m("button", {
        key: i.key,
        ref_for: !0,
        ref_key: "buttons",
        ref: a,
        type: "button",
        role: "radio",
        class: un(["dc-segmented__item", { "dc-segmented__item--mono": e.mono }]),
        "aria-checked": i.key === e.modelValue,
        "data-dc-active": i.key === e.modelValue ? "true" : "false",
        tabindex: i.key === e.modelValue ? 0 : -1,
        onClick: (d) => s("update:modelValue", i.key),
        onKeydown: (d) => l(d, u)
      }, A(i.label), 43, qc))), 128))
    ], 8, Vc));
  }
}), Uc = /* @__PURE__ */ me(Wc, [["__scopeId", "data-v-63fb5482"]]), Lt = (e) => e.separator !== !0 && e.heading !== !0 && e.disabled !== !0, Hc = ["aria-label"], jc = ["role", "aria-label"], Xc = ["data-dc-item"], Gc = {
  key: 0,
  class: "dc-menu__rule",
  role: "separator"
}, Yc = ["role", "aria-checked", "aria-haspopup", "aria-expanded", "aria-disabled", "disabled", "data-dc-item", "onClick", "onMouseenter"], Qc = {
  class: "dc-menu__mark",
  "aria-hidden": "true"
}, Zc = { class: "dc-menu__label dc-truncate" }, Jc = {
  key: 0,
  class: "dc-menu__key dc-mono"
}, eu = {
  key: 1,
  class: "dc-menu__more",
  "aria-hidden": "true"
}, tu = /* @__PURE__ */ pe({
  __name: "MenuList",
  props: {
    items: {},
    at: {},
    label: {},
    autofocus: { type: Boolean }
  },
  emits: ["choose", "dismiss"],
  setup(e, { expose: t, emit: n }) {
    const s = e, a = n, l = U(null), r = U([]), o = U(null), i = U(null), u = U(null), d = U(!1), _ = v(
      () => s.items.flatMap((S, T) => Lt(S) ? [T] : [])
    ), y = v(() => {
      const S = [{ entries: [] }];
      return s.items.forEach((T, te) => {
        T.heading ? S.push({ heading: T, entries: [] }) : S[S.length - 1]?.entries.push({ item: T, index: te });
      }), S.filter((T) => T.entries.length > 0);
    }), k = U({ x: s.at.x, y: s.at.y });
    async function b() {
      k.value = { x: s.at.x, y: s.at.y }, await Ot();
      const S = l.value?.getBoundingClientRect();
      if (!S) return;
      const T = 8;
      let te = s.at.x, ae = s.at.y;
      if (te + S.width > window.innerWidth - T) {
        const ue = s.at.mirrorX === void 0 ? null : s.at.mirrorX - S.width;
        te = ue !== null && ue >= T ? ue : window.innerWidth - S.width - T;
      }
      ae + S.height > window.innerHeight - T && (ae = window.innerHeight - S.height - T), k.value = { x: Math.max(T, te), y: Math.max(T, ae) };
    }
    const C = v(() => ({ left: `${k.value.x}px`, top: `${k.value.y}px` }));
    function g(S) {
      o.value = S, S !== null && Ot(() => r.value[S]?.focus());
    }
    function $(S, T) {
      const te = _.value;
      if (te.length === 0) return null;
      if (S === null) return T === 1 ? te[0] ?? null : te[te.length - 1] ?? null;
      const ae = te.indexOf(S);
      return ae === -1 ? te[0] ?? null : te[(ae + T + te.length) % te.length] ?? null;
    }
    function R(S, T) {
      if (!s.items[S]?.items?.length) return;
      const ae = r.value[S]?.getBoundingClientRect(), ue = l.value?.getBoundingClientRect();
      !ae || !ue || (u.value = { x: ue.right - 4, y: ae.top - 4, mirrorX: ue.left + 4 }, i.value = S, d.value = T);
    }
    function I(S) {
      const T = i.value;
      i.value = null, u.value = null, S && T !== null && g(T);
    }
    function L(S) {
      const T = s.items[S];
      if (!(!T || !Lt(T))) {
        if (T.items?.length) {
          R(S, !0);
          return;
        }
        a("choose", T);
      }
    }
    function N(S) {
      const T = S.key;
      if (T === "Escape") {
        S.preventDefault(), S.stopPropagation(), i.value !== null ? I(!0) : a("dismiss");
        return;
      }
      if (T === "ArrowDown" || T === "ArrowUp") {
        S.preventDefault(), S.stopPropagation(), I(!1), g($(o.value, T === "ArrowDown" ? 1 : -1));
        return;
      }
      if (T === "Home" || T === "End") {
        S.preventDefault(), S.stopPropagation(), I(!1), g($(null, T === "Home" ? 1 : -1));
        return;
      }
      if (T === "ArrowRight") {
        const te = o.value;
        te !== null && s.items[te]?.items?.length && (S.preventDefault(), S.stopPropagation(), R(te, !0));
        return;
      }
      if (T === "ArrowLeft") {
        i.value !== null && (S.preventDefault(), S.stopPropagation(), I(!0));
        return;
      }
      if (T === "Enter" || T === " ") {
        const te = o.value;
        if (te === null) return;
        S.preventDefault(), S.stopPropagation(), L(te);
      }
    }
    function q(S) {
      const T = s.items[S];
      !T || !Lt(T) || (i.value !== null && i.value !== S && I(!1), g(S), T.items?.length && R(S, !1));
    }
    return fl(() => {
      b(), s.autofocus && g($(null, 1));
    }), $e(() => s.at, b, { deep: !0 }), $e(() => s.items, () => void b(), { deep: !0 }), Ze(() => {
      i.value = null;
    }), t({ root: l }), (S, T) => {
      const te = Us("MenuList", !0);
      return f(), m("div", {
        ref_key: "root",
        ref: l,
        class: "dc-menu",
        role: "menu",
        "aria-label": e.label,
        style: Re(C.value),
        onKeydown: N
      }, [
        (f(!0), m(Q, null, ce(y.value, (ae, ue) => (f(), m("div", {
          key: `${ue}-${ae.heading?.label ?? ""}`,
          class: "dc-menu__group",
          role: ae.heading ? "group" : "none",
          "aria-label": ae.heading?.label
        }, [
          ae.heading ? (f(), m("div", {
            key: 0,
            class: "dc-menu__heading dc-truncate",
            "aria-hidden": "true",
            "data-dc-item": ae.heading.id
          }, A(ae.heading.label), 9, Xc)) : z("", !0),
          (f(!0), m(Q, null, ce(ae.entries, ({ item: Y, index: ve }) => (f(), m(Q, {
            key: Y.id ?? `${ve}-${Y.label ?? ""}`
          }, [
            Y.separator ? (f(), m("div", Gc)) : (f(), m("button", {
              key: 1,
              ref_for: !0,
              ref: (Se) => {
                Se && (r.value[ve] = Se);
              },
              type: "button",
              class: "dc-menu__item",
              role: Y.checked === void 0 ? "menuitem" : "menuitemcheckbox",
              "aria-checked": Y.checked === void 0 ? void 0 : Y.checked,
              "aria-haspopup": Y.items?.length ? "menu" : void 0,
              "aria-expanded": Y.items?.length ? i.value === ve : void 0,
              "aria-disabled": Y.disabled ? "true" : void 0,
              disabled: Y.disabled,
              "data-dc-item": Y.id,
              tabindex: "-1",
              onClick: (Se) => L(ve),
              onMouseenter: (Se) => q(ve)
            }, [
              w("span", Qc, A(Y.checked ? "✓" : ""), 1),
              w("span", Zc, A(Y.label), 1),
              Y.shortcut ? (f(), m("span", Jc, A(Y.shortcut), 1)) : Y.items?.length ? (f(), m("span", eu, "›")) : z("", !0)
            ], 40, Yc))
          ], 64))), 128))
        ], 8, jc))), 128)),
        i.value !== null && u.value ? (f(), re(te, {
          key: i.value,
          items: e.items[i.value]?.items ?? [],
          at: u.value,
          label: e.items[i.value]?.label,
          autofocus: d.value,
          onChoose: T[0] || (T[0] = (ae) => a("choose", ae)),
          onDismiss: T[1] || (T[1] = (ae) => I(!0))
        }, null, 8, ["items", "at", "label", "autofocus"])) : z("", !0)
      ], 44, Hc);
    };
  }
}), Ea = /* @__PURE__ */ me(tu, [["__scopeId", "data-v-9b1413fa"]]), nu = ["data-dc-theme", "aria-label"], su = ["aria-expanded", "aria-disabled", "disabled", "data-dc-menu", "tabindex", "onClick", "onMouseenter"], au = /* @__PURE__ */ pe({
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
    const n = e, s = v(() => {
      if (!(!n.accent && !n.tokens))
        return { ...n.tokens, ...n.accent ? { "--dc-accent": n.accent } : {} };
    }), a = t, l = U(null), r = U([]), o = U(null), i = U(null), u = U(!1), d = v(
      () => n.menus.flatMap((L, N) => Lt(L) ? [N] : [])
    );
    function _(L, N) {
      const q = r.value[L]?.getBoundingClientRect(), S = n.menus[L];
      !q || !S || !Lt(S) || (i.value = { x: q.left, y: q.bottom + 2, mirrorX: q.right }, o.value = L, u.value = N);
    }
    function y(L) {
      const N = o.value;
      o.value = null, i.value = null, L && N !== null && r.value[N]?.focus();
    }
    function k(L) {
      o.value === L ? y(!0) : _(L, !1);
    }
    function b(L) {
      o.value === null || o.value === L || _(L, !1);
    }
    function C(L, N) {
      const q = d.value;
      if (q.length === 0) return null;
      if (L === null) return N === 1 ? q[0] ?? null : q[q.length - 1] ?? null;
      const S = q.indexOf(L);
      return S === -1 ? q[0] ?? null : q[(S + N + q.length) % q.length] ?? null;
    }
    function g(L) {
      const N = L.key;
      if (N === "Escape") {
        if (o.value === null) return;
        L.preventDefault(), y(!0);
        return;
      }
      if (N === "ArrowDown" && o.value === null) {
        const T = $();
        if (T === null) return;
        L.preventDefault(), _(T, !0);
        return;
      }
      if (N !== "ArrowLeft" && N !== "ArrowRight") return;
      const q = o.value ?? $(), S = C(q, N === "ArrowRight" ? 1 : -1);
      S !== null && (L.preventDefault(), o.value !== null ? _(S, !0) : r.value[S]?.focus());
    }
    function $() {
      const L = r.value.findIndex((N) => N === document.activeElement);
      return L === -1 ? d.value[0] ?? null : L;
    }
    function R(L) {
      const N = L.target;
      !N || l.value?.contains(N) || y(!1);
    }
    $e(o, (L) => {
      L !== null ? window.addEventListener("pointerdown", R, !0) : window.removeEventListener("pointerdown", R, !0);
    }), Ze(() => window.removeEventListener("pointerdown", R, !0));
    function I(L) {
      y(!0), L.action?.(), a("choose", L);
    }
    return (L, N) => (f(), m("div", {
      ref_key: "bar",
      ref: l,
      class: "dc-shell dc-menubar",
      role: "menubar",
      "data-dc-theme": e.theme,
      "aria-label": e.label ?? "Main menu",
      style: Re(s.value),
      onKeydown: g
    }, [
      (f(!0), m(Q, null, ce(e.menus, (q, S) => (f(), m("button", {
        key: q.id ?? q.label ?? S,
        ref_for: !0,
        ref: (T) => {
          T && (r.value[S] = T);
        },
        type: "button",
        class: "dc-menubar__item",
        role: "menuitem",
        "aria-haspopup": "menu",
        "aria-expanded": o.value === S,
        "aria-disabled": q.disabled ? "true" : void 0,
        disabled: q.disabled,
        "data-dc-menu": q.id ?? q.label,
        tabindex: S === (d.value[0] ?? 0) ? 0 : -1,
        onClick: (T) => k(S),
        onMouseenter: (T) => b(S)
      }, A(q.label), 41, su))), 128)),
      o.value !== null && i.value ? (f(), re(Ea, {
        key: o.value,
        items: e.menus[o.value]?.items ?? [],
        at: i.value,
        label: e.menus[o.value]?.label,
        autofocus: u.value,
        onChoose: I,
        onDismiss: N[0] || (N[0] = (q) => y(!0))
      }, null, 8, ["items", "at", "label", "autofocus"])) : z("", !0)
    ], 44, nu));
  }
}), Ld = /* @__PURE__ */ me(au, [["__scopeId", "data-v-93dbd2e4"]]), lu = ["aria-label", "aria-expanded", "disabled"], ru = { "aria-hidden": "true" }, ou = /* @__PURE__ */ pe({
  __name: "MenuButton",
  props: {
    items: {},
    label: {},
    glyph: { default: "⋯" }
  },
  emits: ["choose"],
  setup(e, { emit: t }) {
    const n = t, s = U(null), a = U(null), l = U(null), r = U(!1), o = v(() => l.value !== null);
    function i(b) {
      const C = s.value?.getBoundingClientRect();
      C && (l.value = { x: C.left, y: C.bottom + 4, mirrorX: C.right }, r.value = b);
    }
    function u(b) {
      l.value = null, b && s.value?.focus();
    }
    function d() {
      o.value ? u(!0) : i(!1);
    }
    function _(b) {
      b.key !== "ArrowDown" || o.value || (b.preventDefault(), i(!0));
    }
    function y(b) {
      const C = b.target;
      C && (s.value?.contains(C) || a.value?.root?.contains(C) || u(!1));
    }
    $e(o, (b) => {
      b ? window.addEventListener("pointerdown", y, !0) : window.removeEventListener("pointerdown", y, !0);
    }), Ze(() => window.removeEventListener("pointerdown", y, !0));
    function k(b) {
      u(!0), b.action?.(), n("choose", b);
    }
    return (b, C) => (f(), m(Q, null, [
      w("button", {
        ref_key: "trigger",
        ref: s,
        type: "button",
        class: "dc-menu-button",
        "aria-label": e.label,
        "aria-haspopup": "menu",
        "aria-expanded": o.value,
        disabled: e.items.length === 0,
        onClick: d,
        onKeydown: _
      }, [
        w("span", ru, A(e.glyph), 1)
      ], 40, lu),
      l.value ? (f(), re(Ea, {
        key: 0,
        ref_key: "menu",
        ref: a,
        items: e.items,
        at: l.value,
        label: e.label,
        autofocus: r.value,
        onChoose: k,
        onDismiss: C[0] || (C[0] = (g) => u(!0))
      }, null, 8, ["items", "at", "label", "autofocus"])) : z("", !0)
    ], 64));
  }
}), es = /* @__PURE__ */ me(ou, [["__scopeId", "data-v-48f5ada5"]]), Mt = (e) => e.kind === "split", j = (e) => e.kind === "group", ee = (e) => e.kind === "float", ut = { x: 16, y: 16, w: 360, h: 260 }, pn = 28, Pa = 120, Tn = 220, Aa = 38, ht = 6;
function Xt(e, t) {
  let n = !1;
  const s = e.frames.map((a, l) => {
    const r = t(a.node, l);
    return r === a.node ? a : (n = !0, { ...a, node: r });
  });
  return n ? { ...e, frames: s } : e;
}
function He(e) {
  return { kind: "group", panels: [e] };
}
function Fd(e, t, n) {
  return {
    kind: "group",
    panels: e,
    ...t ? { active: t } : {},
    ...n ? { title: n } : {}
  };
}
const he = (e) => typeof e == "string", ts = (e) => he(e) ? He(e) : e, Gt = (e) => he(e) ? [e] : Je(e), Ls = (e) => e.panels.filter(he), iu = (e) => e.panels.filter((t) => !he(t)), Ne = (e, t) => e.panels.includes(t);
function Yt(e, t, n) {
  let s = !1;
  const a = e.panels.map((l) => {
    if (he(l) || !oe(l, t)) return l;
    const r = n(l);
    return r !== l && (s = !0), r;
  });
  return s ? { ...e, panels: a } : e;
}
function mn(e, t) {
  return { node: e, rect: { ...ut, ...t } };
}
function ns(e, t) {
  return t ? { kind: "float", frames: e, title: t } : { kind: "float", frames: e };
}
function ss(e, t) {
  const n = { ...ut, ...t };
  return ns(
    e.map(
      (s, a) => mn(s, {
        ...n,
        x: n.x + a * pn,
        y: n.y + a * pn
      })
    )
  );
}
function as(e, t, n, s) {
  return {
    kind: "split",
    direction: e,
    children: t,
    ...n ? { sizes: n } : {},
    ...s ? { title: s } : {}
  };
}
const ls = (e, t, n) => as("row", e, t, n), Nd = (e, t, n) => as("column", e, t, n);
function we(e) {
  return {
    ...e.title ? { title: e.title } : {},
    ...e.fixedView ? { fixedView: !0 } : {},
    ...e.headless ? { headless: !0 } : {}
  };
}
const pt = (e) => e.fixedView === !0 || e.headless === !0 || !!e.title, Dd = (e) => ({ ...e, headless: !0 }), Id = (e) => ({ ...e, fixedView: !0 }), cu = (e) => e === "left" || e === "right" ? "row" : "column";
function Je(e) {
  return j(e) ? e.panels.flatMap(Gt) : ee(e) ? e.frames.flatMap((t) => Je(t.node)) : e.children.flatMap(Je);
}
function oe(e, t) {
  return j(e) ? e.panels.some((n) => he(n) ? n === t : oe(n, t)) : ee(e) ? e.frames.some((n) => oe(n.node, t)) : e.children.some((n) => oe(n, t));
}
const za = (e) => Je(e).length === 0, Rn = (e) => !j(e) && pt(e), Ln = (e) => za(e) && !Rn(e);
function hn(e) {
  return Mt(e) ? e.children.map((t, n) => ({ node: t, index: n })) : ee(e) ? e.frames.map((t, n) => ({ node: t.node, index: n })) : e.panels.flatMap((t, n) => he(t) ? [] : [{ node: t, index: n }]);
}
const rs = (e) => hn(e).map((t) => t.node);
function vt(e) {
  const t = e.active;
  if (t) {
    const n = e.panels.findIndex(
      (s) => he(s) ? s === t : oe(s, t)
    );
    if (n >= 0) return n;
  }
  return 0;
}
function Ta(e) {
  const t = e.panels[vt(e)];
  return t !== void 0 && he(t) ? t : "";
}
function Ae(e) {
  if (he(e)) return e;
  if (j(e)) {
    const n = e.panels[vt(e)];
    return n === void 0 ? "" : Ae(n);
  }
  if (ee(e)) {
    const n = e.frames[e.frames.length - 1];
    return n ? Ae(n.node) : "";
  }
  const t = e.children[0];
  return t ? Ae(t) : "";
}
function gt(e, t) {
  if (j(e) && Ne(e, t)) return e;
  for (const n of rs(e)) {
    const s = gt(n, t);
    if (s) return s;
  }
  return null;
}
function uu(e) {
  const t = rs(e).flatMap(uu);
  return j(e) ? [e, ...t] : t;
}
function Me(e, t) {
  if (j(e)) {
    for (const n of iu(e)) {
      const s = Me(n, t);
      if (s) return s;
    }
    return null;
  }
  if (ee(e)) {
    for (const n of e.frames)
      if (oe(n.node, t))
        return Me(n.node, t) ?? n;
    return null;
  }
  for (const n of e.children) {
    const s = Me(n, t);
    if (s) return s;
  }
  return null;
}
function $n(e, t, n = Pa) {
  const s = (o, i) => i > 0 ? Math.max(Math.min(o, i), Math.min(n, i)) : Math.max(o, n), a = s(e.w, t.w), l = s(e.h, t.h), r = (o, i, u) => Math.min(Math.max(o, 0), Math.max(u - i, 0));
  return {
    x: Math.round(r(e.x, a, t.w)),
    y: Math.round(r(e.y, l, t.h)),
    w: Math.round(a),
    h: Math.round(l)
  };
}
function Fs(e, t, n, s, a = Pa) {
  let { x: l, y: r, w: o, h: i } = e;
  return t.includes("e") && (o = e.w + n), t.includes("w") && (o = e.w - n, l = e.x + n), t.includes("s") && (i = e.h + s), t.includes("n") && (i = e.h - s, r = e.y + s), o < a && (t.includes("w") && (l = e.x + e.w - a), o = a), i < a && (t.includes("n") && (r = e.y + e.h - a), i = a), { x: l, y: r, w: o, h: i };
}
const Ra = (e, t) => e.x === t.x && e.y === t.y && e.w === t.w && e.h === t.h;
function yt(e, t, n) {
  if (j(e)) return Yt(e, t, (l) => yt(l, t, n));
  if (ee(e)) {
    let l = !1;
    const r = e.frames.map((o) => {
      if (!oe(o.node, t)) return o;
      if (Me(o.node, t)) {
        const u = yt(o.node, t, n);
        return u === o.node ? o : (l = !0, { ...o, node: u });
      }
      const i = n(o);
      return i === o ? o : (l = !0, i);
    });
    return l ? { ...e, frames: r } : e;
  }
  if (!oe(e, t)) return e;
  let s = !1;
  const a = e.children.map((l) => {
    const r = yt(l, t, n);
    return r !== l && (s = !0), r;
  });
  return s ? { ...e, children: a } : e;
}
function du(e, t, n) {
  return yt(e, t, (s) => Ra(s.rect, n) ? s : { ...s, rect: n });
}
const tt = (e) => e.maximized === !0, La = (e) => (t) => {
  if (tt(t) === e) return t;
  if (e) {
    const { minimized: a, ...l } = t;
    return { ...l, maximized: !0 };
  }
  const { maximized: n, ...s } = t;
  return s;
};
function fu(e, t, n = !0) {
  return yt(e, t, La(n));
}
function Od(e, t) {
  const n = Me(e, t);
  return n ? fu(e, t, !tt(n)) : e;
}
const it = (e) => e.minimized === !0, Fa = (e) => (t) => {
  if (it(t) === e) return t;
  if (e) {
    const { maximized: a, ...l } = t;
    return { ...l, minimized: !0 };
  }
  const { minimized: n, ...s } = t;
  return s;
};
function pu(e, t, n = !0) {
  return yt(e, t, Fa(n));
}
function Bd(e, t) {
  const n = Me(e, t);
  return n ? pu(e, t, !it(n)) : e;
}
function ot(e, t) {
  const n = t[t.length - 1];
  if (n === void 0) return null;
  const s = st(e, t.slice(0, -1));
  return !s || !ee(s) ? null : s.frames[n] ?? null;
}
function Fn(e, t) {
  if (ee(e)) {
    for (const [n, s] of e.frames.entries()) {
      if (!oe(s.node, t)) continue;
      const a = Fn(s.node, t);
      return a ? [n, ...a] : [n];
    }
    return null;
  }
  for (const { node: n, index: s } of hn(e)) {
    if (!oe(n, t)) continue;
    const a = Fn(n, t);
    return a ? [s, ...a] : null;
  }
  return null;
}
function os(e, t, n) {
  const s = t[t.length - 1];
  if (s === void 0) return e;
  const a = t.slice(0, -1), l = st(e, a);
  if (!l || !ee(l)) return e;
  const r = l.frames[s];
  if (!r) return e;
  const o = n(r);
  if (o === r) return e;
  const i = [...l.frames];
  return i[s] = o, ft(e, a, { ...l, frames: i });
}
function Ns(e, t, n) {
  return os(
    e,
    t,
    (s) => Ra(s.rect, n) ? s : { ...s, rect: n }
  );
}
function vu(e, t, n = !0) {
  return os(e, t, La(n));
}
function mu(e, t, n = !0) {
  return os(e, t, Fa(n));
}
function Ft(e, t) {
  const [n, ...s] = t;
  if (n === void 0) return e;
  if (ee(e)) {
    const r = e.frames[n];
    if (!r) return e;
    const o = Ft(r.node, s), i = o === r.node ? r : { ...r, node: o };
    if (n === e.frames.length - 1 && i === r) return e;
    const u = [...e.frames];
    return u.splice(n, 1), u.push(i), { ...e, frames: u };
  }
  const a = st(e, [n]);
  if (!a) return e;
  const l = Ft(a, s);
  return l === a ? e : ft(e, [n], l);
}
function hu(e, t) {
  const n = [...t];
  let s = e;
  return t.forEach((a, l) => {
    s && (ee(s) && (n[l] = s.frames.length - 1), s = st(s, [a]));
  }), n;
}
function rn(e, t, n, s) {
  if (j(e)) return Yt(e, n, (r) => rn(r, t, n, s));
  if (ee(e)) {
    const r = e.frames.findIndex((i) => oe(i.node, n)), o = e.frames[r];
    if (!o) return e;
    if (Me(o.node, n)) {
      const i = rn(o.node, t, n, s);
      if (i === o.node) return e;
      const u = [...e.frames];
      return u[r] = { ...o, node: i }, { ...e, frames: u };
    }
    return { ...e, frames: [...e.frames, mn(He(t), s)] };
  }
  if (!oe(e, n)) return e;
  let a = !1;
  const l = e.children.map((r) => {
    const o = rn(r, t, n, s);
    return o !== r && (a = !0), o;
  });
  return a ? { ...e, children: l } : e;
}
function Ds(e, t, n, s) {
  if (t === n || !oe(e, t) || !oe(e, n) || !Me(e, n)) return e;
  const a = dt(e, t);
  if (!a) return e;
  const l = rn(a, t, n, s);
  return l === a ? e : xe(l);
}
function _u(e, t, n) {
  return ee(e) ? { ...e, frames: [...e.frames, mn(He(t), n)] } : j(e) ? Da(e, t) : {
    kind: "split",
    direction: e.direction,
    children: [...e.children, He(t)],
    sizes: [...Qe(e), 1],
    ...we(e)
  };
}
function Na(e, t, n, s) {
  const a = n[0];
  if (a === void 0) return _u(e, t, s);
  const l = n.slice(1), r = (d, _) => _ === a ? Na(d, t, l, s) : dt(d, t);
  if (ee(e)) {
    const d = e.frames.flatMap((_, y) => {
      const k = r(_.node, y);
      return k ? [k === _.node ? _ : { ..._, node: k }] : [];
    });
    return { ...e, frames: d };
  }
  if (j(e)) {
    const d = vt(e), _ = [];
    e.panels.forEach((b, C) => {
      if (he(b)) {
        b !== t && _.push(b);
        return;
      }
      const g = r(b, C);
      g && _.push(g);
    });
    const k = e.active && _.some((b) => Gt(b).includes(e.active)) ? e.active : Ae(_[d] ?? _[_.length - 1]);
    return {
      kind: "group",
      panels: _,
      ...k ? { active: k } : {},
      ...we(e)
    };
  }
  const o = Qe(e), i = [], u = [];
  return e.children.forEach((d, _) => {
    const y = r(d, _);
    y && (i.push(y), u.push(o[_] ?? 0));
  }), { kind: "split", direction: e.direction, children: i, sizes: u, ...we(e) };
}
function Is(e, t, n, s) {
  const a = st(e, n);
  return !a || !za(a) || !oe(e, t) ? e : xe(Na(e, t, n, s));
}
function xn(e, t) {
  if (j(e)) return Yt(e, t, (a) => xn(a, t));
  if (ee(e)) {
    const a = e.frames.findIndex((u) => oe(u.node, t)), l = e.frames[a];
    if (!l) return e;
    const r = xn(l.node, t), o = r === l.node ? l : { ...l, node: r };
    if (a === e.frames.length - 1 && o === l) return e;
    const i = [...e.frames];
    return i.splice(a, 1), i.push(o), { ...e, frames: i };
  }
  if (!oe(e, t)) return e;
  let n = !1;
  const s = e.children.map((a) => {
    const l = xn(a, t);
    return l !== a && (n = !0), l;
  });
  return n ? { ...e, children: s } : e;
}
function is(e, t) {
  if (e <= 0) return [];
  const n = () => Array.from({ length: e }, () => 1 / e);
  if (!t || t.length !== e) return n();
  const s = t.map((l) => Number.isFinite(l) && l > 0 ? l : 0), a = s.reduce((l, r) => l + r, 0);
  return a <= 0 ? n() : s.map((l) => l / a);
}
const Qe = (e) => is(e.children.length, e.sizes), Be = (e) => {
  const t = j(e) ? e.panels.length : e.children.length;
  return e.places?.length === t ? e.places : void 0;
};
function xe(e) {
  if (j(e)) return gu(e);
  if (ee(e)) {
    const o = e.frames.flatMap((i) => {
      const u = xe(i.node);
      return Ln(u) ? [] : [u === i.node ? i : { ...i, node: u }];
    });
    return o.length === e.frames.length && o.every((i, u) => i === e.frames[u]) ? e : { ...e, frames: o };
  }
  if (e.children.length === 0) return e;
  const t = Qe(e), n = Be(e), s = [], a = [], l = [];
  e.children.forEach((o, i) => {
    const u = xe(o), d = t[i] ?? 0;
    if (Ln(u)) return;
    if (!n && Mt(u) && u.direction === e.direction && !Be(u) && !pt(u)) {
      const y = Qe(u);
      u.children.forEach((k, b) => {
        s.push(k), a.push(d * (y[b] ?? 0));
      });
      return;
    }
    s.push(u), a.push(d);
    const _ = n?.[i];
    _ && l.push(_);
  });
  const r = s[0];
  return s.length === 1 && r && !pt(e) ? r : {
    kind: "split",
    direction: e.direction,
    children: s,
    sizes: is(s.length, a),
    ...we(e),
    ...l.length === s.length && l.length > 0 ? { places: l } : {}
  };
}
function gu(e) {
  if (e.panels.every(he)) return e;
  const t = Ae(e), n = Be(e), s = [], a = [];
  e.panels.forEach((o, i) => {
    const u = n?.[i];
    if (he(o)) {
      s.push(o), u && a.push(u);
      return;
    }
    const d = xe(o);
    if (!Ln(d)) {
      if (j(d) && !pt(d) && !Be(d)) {
        s.push(...d.panels);
        return;
      }
      s.push(d), u && a.push(u);
    }
  });
  const l = s[0];
  if (s.length === 1 && l !== void 0 && !he(l) && !pt(e))
    return l;
  if (s.length === e.panels.length && s.every((o, i) => o === e.panels[i]))
    return e;
  const r = t && s.some((o) => Gt(o).includes(t)) ? t : void 0;
  return {
    kind: "group",
    panels: s,
    ...r ? { active: r } : {},
    ...we(e),
    ...a.length === s.length && a.length > 0 ? { places: a } : {}
  };
}
function dt(e, t) {
  if (ee(e)) {
    const r = e.frames.flatMap((o) => {
      const i = dt(o.node, t);
      return i ? [i === o.node ? o : { ...o, node: i }] : [];
    });
    return r.length === 0 && !Rn(e) ? null : { ...e, frames: r };
  }
  if (j(e)) {
    if (!oe(e, t)) return e;
    const r = vt(e), o = [];
    for (const d of e.panels) {
      if (he(d)) {
        d !== t && o.push(d);
        continue;
      }
      const _ = dt(d, t);
      _ && o.push(_);
    }
    if (o.length === 0) return null;
    const u = e.active && o.some((d) => Gt(d).includes(e.active)) ? e.active : Ae(o[r] ?? o[o.length - 1]);
    return u ? { kind: "group", panels: o, active: u, ...we(e) } : { kind: "group", panels: o, ...we(e) };
  }
  const n = Qe(e), s = [], a = [];
  if (e.children.forEach((r, o) => {
    const i = dt(r, t);
    i && (s.push(i), a.push(n[o] ?? 0));
  }), s.length === 0)
    return Rn(e) ? { kind: "split", direction: e.direction, children: s, sizes: [], ...we(e) } : null;
  const l = s[0];
  return s.length === 1 && l && !pt(e) ? l : xe({
    kind: "split",
    direction: e.direction,
    children: s,
    sizes: a,
    ...we(e)
  });
}
function Da(e, t, n) {
  const s = e.panels.filter((l) => l !== t), a = n === void 0 ? s.length : Math.max(0, Math.min(n, s.length));
  return s.splice(a, 0, t), { kind: "group", panels: s, active: t, ...we(e) };
}
function zt(e, t, n, s, a) {
  const l = (k) => Xt(
    k,
    (b) => oe(b, n) ? zt(b, t, n, s, a) : b
  );
  if (s === "float") return e;
  const r = (k) => Yt(k, n, (b) => zt(b, t, n, s, a));
  if (s === "center")
    return j(e) ? Ne(e, n) ? Da(e, t, a) : r(e) : ee(e) ? l(e) : {
      ...e,
      children: e.children.map(
        (k) => oe(k, n) ? zt(k, t, n, s, a) : k
      )
    };
  const o = cu(s), i = s === "left" || s === "top", u = (k) => ({
    kind: "split",
    direction: o,
    children: i ? [He(t), k] : [k, He(t)],
    sizes: [0.5, 0.5]
  });
  if (j(e)) return Ne(e, n) ? u(e) : r(e);
  if (ee(e)) return l(e);
  const d = Qe(e), _ = e.children.findIndex(
    (k) => j(k) && Ne(k, n)
  );
  if (_ >= 0 && e.direction === o) {
    const k = (d[_] ?? 0) / 2, b = [...e.children], C = [...d];
    return b.splice(i ? _ : _ + 1, 0, He(t)), C.splice(_, 1, k, k), {
      kind: "split",
      direction: o,
      children: b,
      sizes: C,
      ...we(e)
    };
  }
  const y = e.children.map((k) => oe(k, n) ? j(k) && Ne(k, n) ? u(k) : zt(k, t, n, s) : k);
  return {
    kind: "split",
    direction: e.direction,
    children: y,
    sizes: d,
    ...we(e)
  };
}
function wt(e, t) {
  if (j(e)) {
    if (Ne(e, t))
      return Ta(e) === t ? e : { ...e, active: t };
    const a = e.panels.findIndex((i) => !he(i) && oe(i, t)), l = e.panels[a];
    if (l === void 0 || he(l)) return e;
    const r = wt(l, t);
    if (r === l && e.active === t) return e;
    const o = [...e.panels];
    return o[a] = r, { ...e, panels: o, active: t };
  }
  if (!oe(e, t)) return e;
  if (ee(e)) return Xt(e, (a) => wt(a, t));
  let n = !1;
  const s = e.children.map((a) => {
    const l = wt(a, t);
    return l !== a && (n = !0), l;
  });
  return n ? { ...e, children: s } : e;
}
function Nt(e, t, n) {
  if (j(e)) {
    if (!Ne(e, t)) return Yt(e, t, (u) => Nt(u, t, n));
    const s = e.panels.indexOf(t), a = Math.max(0, Math.min(n, e.panels.length - 1));
    if (s === a) return e;
    const l = [...e.panels];
    l.splice(s, 1), l.splice(a, 0, t);
    const r = Be(e), o = r ? [...r] : void 0;
    o && o.splice(a, 0, ...o.splice(s, 1));
    const i = Ae(e);
    return {
      kind: "group",
      panels: l,
      ...i ? { active: i } : {},
      ...we(e),
      ...o ? { places: o } : {}
    };
  }
  return oe(e, t) ? ee(e) ? Xt(e, (s) => Nt(s, t, n)) : { ...e, children: e.children.map((s) => Nt(s, t, n)) } : e;
}
function on(e, t, n) {
  if (t === n) return e;
  if (j(e)) {
    if (!oe(e, t) && !oe(e, n)) return e;
    const s = (l) => l === t ? n : l === n ? t : l, a = e.panels.map((l) => he(l) ? s(l) : on(l, t, n));
    return { ...e, panels: a, ...e.active ? { active: s(e.active) } : {} };
  }
  return ee(e) ? Xt(e, (s) => on(s, t, n)) : { ...e, children: e.children.map((s) => on(s, t, n)) };
}
function tn(e, t, n, s, a) {
  if (s === "float" || !oe(e, t) || !oe(e, n)) return e;
  const l = gt(e, t);
  if (s === "center" && l && Ne(l, n)) {
    if (a === void 0) return e;
    const o = l.panels.indexOf(t), i = a > o ? a - 1 : a;
    return i === o ? e : wt(Nt(e, t, i), t);
  }
  if (t === n) return e;
  const r = dt(e, t);
  return r ? xe(zt(r, t, n, s, a)) : e;
}
function Ia(e, t, n) {
  if (j(e)) {
    const a = e.panels[t];
    if (a === void 0 || he(a)) return e;
    const l = [...e.panels];
    return l[t] = n, { ...e, panels: l };
  }
  if (ee(e)) {
    const a = e.frames[t];
    if (!a) return e;
    const l = [...e.frames];
    return l[t] = { ...a, node: n }, { ...e, frames: l };
  }
  const s = [...e.children];
  return s[t] = n, { ...e, children: s };
}
function Qt(e, t, n) {
  const s = hn(e);
  if (!j(e) && s.some(({ node: a }) => j(a) && Ne(a, t))) {
    const a = n(e);
    return a === e ? null : a;
  }
  for (const { node: a, index: l } of s) {
    if (!oe(a, t)) continue;
    const r = Qt(a, t, n);
    return r ? Ia(e, l, r) : null;
  }
  return null;
}
function Kd(e, t, n) {
  const s = Qt(
    e,
    t,
    (a) => Mt(a) && a.direction !== n ? { ...a, direction: n } : a
  );
  return s ? xe(s) : e;
}
function Oa(e) {
  return ee(e) ? [e] : Be(e) || pt(e) ? [e] : j(e) ? [...e.panels] : e.children.flatMap(Oa);
}
function Ba(e, t) {
  if (j(e)) return e;
  const n = rs(e).map(Oa), s = n.flat(), a = t && s.some((r) => Gt(r).includes(t)) ? t : void 0, l = yu(e, n);
  return xe({
    kind: "group",
    panels: s,
    ...a ? { active: a } : {},
    ...we(e),
    ...l ? { places: l } : {}
  });
}
function yu(e, t) {
  const n = ee(e) ? e.frames.map(({ node: s, ...a }) => a) : Be(e);
  if (n)
    return t.every((s) => s.length === 1) ? n : void 0;
}
function wu(e, t) {
  const n = Qt(e, t, (s) => Ba(s, t));
  return n ? xe(n) : e;
}
function cs(e, t, n) {
  if (j(e) && Ne(e, t)) {
    const s = n(e);
    return s === e ? null : s;
  }
  for (const { node: s, index: a } of hn(e)) {
    if (!oe(s, t)) continue;
    const l = cs(s, t, n);
    return l ? Ia(e, a, l) : null;
  }
  return null;
}
function Os(e, t, n) {
  const s = cs(e, t, (a) => {
    if (a.panels.length < 2) return a;
    const l = Be(a);
    return {
      ...as(n, a.panels.map(ts)),
      ...we(a),
      ...l ? { places: l } : {}
    };
  });
  return s ? xe(s) : e;
}
function Nn(e, t) {
  if (j(e)) return e;
  if (ee(e)) {
    const a = e.frames.findIndex(
      (o) => j(o.node) && o.node.panels.includes(t)
    ), l = e.frames[a], r = l && j(l.node) ? l.node : null;
    if (l && r && r.panels.length > 1) {
      const o = ss(r.panels.map(ts), l.rect).frames;
      return {
        ...e,
        frames: [...e.frames.slice(0, a), ...o, ...e.frames.slice(a + 1)]
      };
    }
    return Xt(e, (o) => Nn(o, t));
  }
  if (!oe(e, t)) return e;
  let n = !1;
  const s = e.children.map((a) => {
    const l = Nn(a, t);
    return l !== a && (n = !0), l;
  });
  return n ? { ...e, children: s } : e;
}
function ku(e, t, n) {
  const s = gt(e, t);
  if (!s || s.panels.length < 2) return e;
  if (Me(e, t)?.node === s) {
    const r = Nn(e, t);
    return r === e ? e : xe(r);
  }
  const l = cs(e, t, (r) => ({
    ...ns(Ka(r.panels.map(ts), Be(r), n)),
    ...we(r)
  }));
  return l ? xe(l) : e;
}
function Ka(e, t, n) {
  return t ? e.map((s, a) => ({ ...t[a], node: s })) : ss(e, n).frames;
}
function Va(e, t) {
  return { ...ns(Ka(e.children, Be(e), t)), ...we(e) };
}
function Vd(e, t, n) {
  const s = Qt(
    e,
    t,
    (a) => ee(a) ? a : Va(a, n)
  );
  return s ? xe(s) : j(e) && Ne(e, t) ? ss([e], n) : e;
}
function bu(e, t) {
  const n = (a) => t === "column" ? a.rect.y : a.rect.x, s = (a) => t === "column" ? a.rect.x : a.rect.y;
  return [...e].sort((a, l) => n(a) - n(l) || s(a) - s(l));
}
function qa(e, t) {
  const n = bu(e.frames, t);
  return {
    kind: "split",
    direction: t,
    children: n.map((s) => s.node),
    ...we(e),
    places: n.map(({ node: s, ...a }) => a)
  };
}
function qd(e, t, n = "row") {
  const s = Qt(
    e,
    t,
    (a) => ee(a) ? qa(a, n) : a
  );
  return s ? xe(s) : e;
}
function Wa(e) {
  if (ee(e)) return null;
  const t = j(e) ? e.panels.length === 1 ? e.panels[0] : void 0 : e.children.length === 1 ? e.children[0] : void 0;
  return t === void 0 || he(t) || j(t) && t.panels.length === 1 && he(t.panels[0]) ? null : t;
}
const $u = (e) => {
  const { title: t, fixedView: n, headless: s, ...a } = e;
  return a;
};
function xu(e, t) {
  const n = Wa(e);
  return n ? t === "inner" ? n : { ...$u(n), ...we(e) } : e;
}
function $t(e) {
  return e.title ? e.title : j(e) ? "" : ee(e) ? "Desktop" : e.direction === "row" ? "Row" : "Column";
}
function Dt(e, t) {
  if (j(e)) {
    const s = e.panels[vt(e)];
    return s === void 0 ? "" : he(s) ? t(s) ?? s : $t(s) || Dt(s, t);
  }
  if (e.title) return e.title;
  if (ee(e)) {
    const s = e.frames[e.frames.length - 1];
    return s ? s.title ?? Dt(s.node, t) : "";
  }
  const n = e.children[0];
  return n ? Dt(n, t) : "";
}
function st(e, t) {
  let n = e;
  for (const s of t) {
    if (!n) return null;
    if (Mt(n)) n = n.children[s];
    else if (ee(n)) n = n.frames[s]?.node;
    else {
      const a = n.panels[s];
      n = a === void 0 || he(a) ? void 0 : a;
    }
  }
  return n ?? null;
}
function ft(e, t, n) {
  if (t.length === 0) return n;
  const [s, ...a] = t;
  if (s === void 0) return e;
  if (ee(e)) {
    const i = e.frames[s];
    if (!i) return e;
    const u = ft(i.node, a, n);
    if (u === i.node) return e;
    const d = [...e.frames];
    return d[s] = { ...i, node: u }, { ...e, frames: d };
  }
  if (j(e)) {
    const i = e.panels[s];
    if (i === void 0 || he(i)) return e;
    const u = ft(i, a, n);
    if (u === i) return e;
    const d = [...e.panels];
    return d[s] = u, { ...e, panels: d };
  }
  const l = e.children[s];
  if (!l) return e;
  const r = ft(l, a, n);
  if (r === l) return e;
  const o = [...e.children];
  return o[s] = r, { ...e, children: o };
}
function cn(e, t, n) {
  if (t.length === 0)
    return Mt(e) ? { ...e, sizes: is(e.children.length, n) } : e;
  const [s, ...a] = t;
  if (s === void 0) return e;
  if (ee(e)) {
    const o = e.frames[s];
    if (!o) return e;
    const i = cn(o.node, a, n);
    if (i === o.node) return e;
    const u = [...e.frames];
    return u[s] = { ...o, node: i }, { ...e, frames: u };
  }
  if (j(e)) {
    const o = e.panels[s];
    if (o === void 0 || he(o)) return e;
    const i = cn(o, a, n);
    if (i === o) return e;
    const u = [...e.panels];
    return u[s] = i, { ...e, panels: u };
  }
  const l = e.children[s];
  if (!l) return e;
  const r = [...e.children];
  return r[s] = cn(l, a, n), { ...e, children: r };
}
function Bs(e, t, n, s = 0.02) {
  const a = e[t], l = e[t + 1];
  if (a === void 0 || l === void 0) return e;
  const r = a + l;
  if (r < s * 2) return e;
  const o = [...e], i = Math.min(Math.max(a + n, s), r - s);
  return o[t] = i, o[t + 1] = r - i, o;
}
function vn(e) {
  if (!j(e) || e.panels.length >= 2) return e;
  const t = e.panels[0];
  return t !== void 0 && !he(t) ? e : { ...ls([Cu(e)]), ...we(e) };
}
const Cu = (e) => {
  if (!e.title) return e;
  const { title: t, ...n } = e;
  return n;
};
function Ks(e) {
  return e.length === 0 ? null : ls(e.map(He));
}
function Mu(e, t) {
  if (!e) return Ks(t);
  const n = new Set(t), s = /* @__PURE__ */ new Set(), a = /* @__PURE__ */ new Set();
  for (const i of Je(e))
    !n.has(i) || s.has(i) ? a.add(i) : s.add(i);
  let l = e;
  for (const i of a)
    l = l ? dt(l, i) : null;
  const r = new Set(l ? Je(l) : []), o = t.filter((i) => !r.has(i));
  if (o.length === 0) return l ? vn(xe(l)) : null;
  if (!l) return Ks(o);
  if (ee(l)) {
    const i = l.frames.length;
    return {
      ...l,
      frames: [
        ...l.frames,
        ...o.map(
          (u, d) => mn(He(u), {
            x: ut.x + (i + d) * pn,
            y: ut.y + (i + d) * pn
          })
        )
      ]
    };
  }
  return vn(xe(ls([l, ...o.map(He)])));
}
const us = Symbol("dc.windowContext");
function Su(e) {
  return Dn(us, e), e;
}
function ds() {
  const e = bt(us, null);
  if (!e)
    throw new Error(
      "[header-content-layout] No window context found. Render this component inside <WindowFrame>."
    );
  return e;
}
const Eu = ["data-dc-glyph"], Pu = { class: "dc-glyph__line" }, Au = ["d"], zu = {
  key: 0,
  class: "dc-glyph__aqua"
}, Tu = ["d"], Ru = /* @__PURE__ */ pe({
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
    return (s, a) => (f(), m("svg", {
      class: "dc-glyph",
      "data-dc-glyph": e.kind,
      viewBox: "0 0 10 10",
      "aria-hidden": "true",
      focusable: "false"
    }, [
      w("g", Pu, [
        (f(!0), m(Q, null, ce(t[e.kind], (l) => (f(), m("path", {
          key: l,
          d: l
        }, null, 8, Au))), 128))
      ]),
      n[e.kind] ? (f(), m("g", zu, [
        (f(!0), m(Q, null, ce(n[e.kind], (l) => (f(), m("path", {
          key: l,
          d: l
        }, null, 8, Tu))), 128))
      ])) : z("", !0)
    ], 8, Eu));
  }
}), kt = /* @__PURE__ */ me(Ru, [["__scopeId", "data-v-4d2872c0"]]), Lu = ["data-dc-order", "data-dc-path", "data-dc-maximized", "data-dc-minimized", "data-dc-dragging"], Fu = ["data-dc-movable"], Nu = { class: "dc-float__title dc-truncate" }, Du = {
  key: 1,
  class: "dc-float__controls dc-controls"
}, Iu = ["aria-label", "aria-pressed", "data-dc-minimize"], Ou = ["aria-label", "aria-pressed", "data-dc-maximize"], Bu = ["aria-label", "data-dc-close"], Ku = { class: "dc-float__content" }, Vu = ["data-dc-handle", "onPointerdown"], qu = /* @__PURE__ */ pe({
  __name: "WindowFloat",
  props: {
    frame: {},
    path: {},
    order: {},
    place: {}
  },
  setup(e) {
    const t = e, n = ds(), s = v(() => Ae(t.frame.node)), a = v(() => n.panelFor(s.value)?.fixed === !0), l = v(() => tt(t.frame)), r = v(() => it(t.frame)), o = v(() => l.value || r.value), i = v(() => n.resizable.value && !a.value && !o.value), u = v(() => n.movable.value && !a.value && !o.value), d = v(() => {
      const N = Je(t.frame.node);
      return N.length === 1 ? N[0] ?? null : null;
    }), _ = v(() => d.value !== null && n.closable(d.value)), y = v(() => t.frame.node.headless === !0), k = v(
      () => !y.value && (!j(t.frame.node) || r.value)
    ), b = v(
      () => t.frame.title || $t(t.frame.node) || Dt(t.frame.node, (N) => n.panelFor(N)?.title)
    ), C = v(() => n.spaceMenu(t.path));
    function g(N) {
      N.target?.closest("button, a, input, select, textarea, label") || n.beginFrameDragAt(t.path, N, "move");
    }
    function $(N) {
      N.target?.closest("button, a, input, select, textarea, label") || (r.value ? n.toggleMinimizeAt(t.path) : n.toggleMaximizeAt(t.path));
    }
    const R = v(() => {
      const N = n.framing.value;
      return N !== null && oe(t.frame.node, N);
    }), I = v(() => ({
      // Neither maximizing nor rolling up overwrites the rect: it is where the
      // window goes back to, and both are a way of not being there for a while.
      ...l.value ? { inset: "0" } : r.value && t.place ? {
        left: `${t.place.x}px`,
        bottom: `${t.place.bottom}px`,
        width: `${Tn}px`,
        height: `${Aa}px`
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
    return (N, q) => (f(), m("div", {
      class: "dc-float",
      style: Re(I.value),
      "data-dc-order": e.order,
      "data-dc-path": e.path.join("/"),
      "data-dc-maximized": l.value ? "true" : "false",
      "data-dc-minimized": r.value ? "true" : "false",
      "data-dc-dragging": R.value ? "true" : "false",
      onPointerdown: q[3] || (q[3] = (S) => E(n).raiseAt(e.path))
    }, [
      k.value ? (f(), m("header", {
        key: 0,
        class: "dc-float__bar",
        "data-dc-movable": u.value ? "true" : "false",
        onPointerdown: g,
        onDblclick: $
      }, [
        w("span", Nu, A(b.value), 1),
        C.value.length ? (f(), re(es, {
          key: 0,
          items: C.value,
          label: `${b.value} menu`
        }, null, 8, ["items", "label"])) : z("", !0),
        !a.value || r.value && _.value && d.value ? (f(), m("div", Du, [
          a.value ? z("", !0) : (f(), m("button", {
            key: 0,
            type: "button",
            class: "dc-float__button dc-control",
            "aria-label": `${r.value ? "Unroll" : "Minimize"} ${b.value}`,
            "aria-pressed": r.value,
            "data-dc-minimize": s.value,
            onClick: q[0] || (q[0] = (S) => E(n).toggleMinimizeAt(e.path))
          }, [
            ye(kt, {
              kind: r.value ? "unroll" : "minimize"
            }, null, 8, ["kind"])
          ], 8, Iu)),
          a.value ? z("", !0) : (f(), m("button", {
            key: 1,
            type: "button",
            class: "dc-float__button dc-control",
            "aria-label": `${l.value ? "Restore" : "Maximize"} ${b.value}`,
            "aria-pressed": l.value,
            "data-dc-maximize": s.value,
            onClick: q[1] || (q[1] = (S) => E(n).toggleMaximizeAt(e.path))
          }, [
            ye(kt, {
              kind: l.value ? "restore" : "maximize"
            }, null, 8, ["kind"])
          ], 8, Ou)),
          r.value && _.value && d.value ? (f(), m("button", {
            key: 2,
            type: "button",
            class: "dc-float__button dc-control",
            "aria-label": `Close ${b.value}`,
            "data-dc-close": d.value,
            onClick: q[2] || (q[2] = (S) => E(n).close(d.value))
          }, [
            ye(kt, { kind: "close" })
          ], 8, Bu)) : z("", !0)
        ])) : z("", !0)
      ], 40, Fu)) : z("", !0),
      w("div", Ku, [
        be(N.$slots, "default", {}, void 0, !0)
      ]),
      (f(!0), m(Q, null, ce(i.value ? L : [], (S) => (f(), m("span", {
        key: S,
        class: "dc-float__grip",
        "data-dc-handle": S,
        "aria-hidden": "true",
        onPointerdown: Fe((T) => E(n).beginFrameDragAt(e.path, T, S), ["stop"])
      }, null, 40, Vu))), 128))
    ], 44, Lu));
  }
}), Wu = /* @__PURE__ */ me(qu, [["__scopeId", "data-v-f035684c"]]), fs = Symbol("dc.paneContext");
function Uu(e) {
  return Dn(fs, e), e;
}
function Wd() {
  return bt(fs, null);
}
function Ud(e) {
  const t = bt(us, null), n = bt(fs, null);
  if (!t || !n) return () => {
  };
  const s = t.registerMenu(
    () => n.panel.value,
    () => At(e)
  );
  return pl() && qs(s), s;
}
const Hu = ["data-dc-panel", "data-dc-panels", "data-dc-tabbed", "data-dc-floating", "data-dc-maximized", "data-dc-headless", "data-dc-active", "data-dc-dragging", "aria-label"], ju = ["data-dc-movable"], Xu = ["aria-label", "aria-pressed"], Gu = ["data-dc-space-name"], Yu = { class: "dc-truncate" }, Qu = ["aria-label"], Zu = {
  key: 0,
  class: "dc-pane__insert",
  "aria-hidden": "true"
}, Ju = ["id", "data-dc-panel", "data-dc-space", "aria-selected", "aria-controls", "tabindex", "onPointerdown", "onClick", "onKeydown"], ed = { class: "dc-tab__name dc-truncate" }, td = {
  key: 0,
  class: "dc-pane__sub dc-mono dc-truncate"
}, nd = ["aria-label", "data-dc-close", "onClick"], sd = {
  key: 0,
  class: "dc-pane__insert",
  "aria-hidden": "true"
}, ad = { class: "dc-pane__tools" }, ld = {
  key: 2,
  class: "dc-pane__controls dc-controls"
}, rd = ["aria-label", "data-dc-minimize"], od = ["aria-label", "aria-pressed", "data-dc-maximize"], id = ["aria-label", "data-dc-close"], cd = ["id", "role", "aria-labelledby"], ud = ["id", "role", "aria-labelledby"], dd = ["data-dc-edge"], fd = /* @__PURE__ */ pe({
  __name: "WindowPane",
  props: {
    group: {},
    path: {}
  },
  setup(e) {
    const t = e, n = ds(), s = Ws() ?? "dc-pane", a = v(
      () => t.group.panels.flatMap((B, H) => {
        if (!he(B)) {
          const Te = $t(B) || Dt(B, (Ee) => n.panelFor(Ee)?.title);
          return [{ kind: "space", index: H, id: `space-${H}`, title: Te, node: B }];
        }
        const se = n.panelFor(B);
        return se ? [{ kind: "panel", index: H, id: B, title: se.title, panel: se }] : [];
      })
    ), l = v(() => a.value.length > 1), r = v(() => {
      const B = vt(t.group);
      return a.value.find((H) => H.index === B) ?? a.value[0] ?? null;
    }), o = v(() => r.value?.kind === "space" ? r.value.node : null), i = v(() => o.value ? "" : Ta(t.group)), u = v(() => o.value ? null : n.panelFor(i.value)), d = v(() => r.value?.title ?? ""), _ = v(() => n.spaceNames.value ? t.group.title ?? "" : ""), y = v(() => [...t.path, r.value?.index ?? 0]), k = v(() => i.value || Ls(t.group)[0] || ""), b = v(() => n.viewFor(i.value)), C = v(() => t.group.headless === !0), g = v(() => n.focused.value === i.value), $ = v(() => n.dragging.value === i.value), R = v(() => n.moving.value === i.value), I = v(() => n.frameOf(k.value) !== null), L = v(() => n.panelFor(k.value)?.fixed === !0), N = v(
      () => !o.value && (n.canMove(i.value) || I.value && n.movable.value && !L.value)
    ), q = v(
      () => o.value ? n.spaceMenu(y.value) : n.menuFor(i.value)
    ), S = (B) => n.closable(B);
    Uu({ panel: i });
    const T = v(() => n.maximized(k.value)), te = v(
      () => I.value && !L.value || !l.value && !!u.value && S(u.value.id)
    ), ae = (B) => `${s}-tab-${B}`, ue = v(() => `${s}-body`), Y = v(() => {
      const B = n.dropTarget.value;
      return !B || !Ne(t.group, B.panel) || B.edge === "float" ? null : B;
    }), ve = v(() => Y.value?.index === void 0 ? Y.value?.edge ?? null : null), Se = v(() => Y.value?.index ?? null), x = () => u.value ? n.renderContent(u.value, b.value, g.value) ?? null : null, O = () => u.value ? n.renderActions(u.value, b.value, g.value) ?? null : null;
    let X = null;
    function ne(B) {
      const H = X !== null && Math.hypot(B.clientX - X.x, B.clientY - X.y) >= 4;
      return X = null, H;
    }
    const ge = (B) => B.kind === "panel" ? B.id : Ae(B.node);
    function ze(B, H) {
      H.kind !== "space" && (n.focus(H.id), X = { x: B.clientX, y: B.clientY }, n.beginDrag(H.id, B));
    }
    function Ke(B, H) {
      if (ne(B)) return;
      const se = ge(H);
      se && n.selectPanel(se);
    }
    function Ie(B) {
      i.value && n.focus(i.value), !B.target?.closest(".dc-tab, button, a, input, select, textarea, label") && (I.value ? n.beginFrameDrag(k.value, B, "move") : n.beginDrag(i.value, B));
    }
    function Ve(B) {
      X = { x: B.clientX, y: B.clientY }, n.beginDrag(i.value, B);
    }
    function D(B) {
      ne(B) || n.toggleMoveMode(i.value);
    }
    const K = {
      ArrowLeft: "left",
      ArrowRight: "right",
      ArrowUp: "up",
      ArrowDown: "down"
    };
    function W(B) {
      if (!R.value) return;
      if (B.key === "Escape") {
        B.preventDefault(), n.toggleMoveMode(i.value);
        return;
      }
      const H = K[B.key];
      H && (B.preventDefault(), I.value ? n.nudgeFrame(i.value, H, B.shiftKey) : n.nudge(i.value, H, B.shiftKey));
    }
    function ke(B) {
      !I.value || B.target?.closest(".dc-tab, button, a, input, select, textarea, label") || n.toggleMaximize(k.value);
    }
    function St(B, H) {
      B.stopPropagation(), X = null, n.close(H);
    }
    function Zt(B, H) {
      const se = a.value.length;
      let Te = null;
      if (B.key === "ArrowRight" ? Te = (H + 1) % se : B.key === "ArrowLeft" ? Te = (H - 1 + se) % se : B.key === "Home" ? Te = 0 : B.key === "End" && (Te = se - 1), Te === null) return;
      B.preventDefault();
      const Ee = a.value[Te];
      if (!Ee) return;
      const Et = ge(Ee);
      Et && n.selectPanel(Et);
    }
    return (B, H) => r.value ? (f(), m("section", {
      key: 0,
      class: "dc-pane",
      "data-dc-panel": i.value || void 0,
      "data-dc-panels": E(Ls)(e.group).join(" ") || void 0,
      "data-dc-tabbed": l.value ? "true" : "false",
      "data-dc-floating": I.value ? "true" : "false",
      "data-dc-maximized": T.value ? "true" : "false",
      "data-dc-headless": C.value ? "true" : "false",
      "data-dc-active": g.value ? "true" : "false",
      "data-dc-dragging": $.value ? "true" : "false",
      "aria-label": d.value,
      onFocusin: H[7] || (H[7] = (se) => i.value && E(n).focus(i.value))
    }, [
      C.value ? z("", !0) : (f(), m("header", {
        key: 0,
        class: "dc-pane__head",
        "data-dc-movable": N.value ? "true" : "false",
        onPointerdown: Ie,
        onDblclick: ke
      }, [
        N.value ? (f(), m("button", {
          key: 0,
          type: "button",
          class: "dc-pane__grip",
          "aria-label": `Move ${d.value}`,
          "aria-pressed": R.value,
          onPointerdown: Ve,
          onClick: D,
          onKeydown: W
        }, [...H[8] || (H[8] = [
          w("span", { "aria-hidden": "true" }, "⠿", -1)
        ])], 40, Xu)) : z("", !0),
        _.value ? (f(), m("span", {
          key: 1,
          class: "dc-pane__name",
          "data-dc-space-name": _.value
        }, [
          w("span", Yu, A(_.value), 1)
        ], 8, Gu)) : z("", !0),
        w("div", {
          class: "dc-pane__tabs",
          role: "tablist",
          "aria-label": `${d.value} panels`
        }, [
          (f(!0), m(Q, null, ce(a.value, (se, Te) => (f(), m(Q, {
            key: se.id
          }, [
            Se.value === Te ? (f(), m("span", Zu)) : z("", !0),
            w("button", {
              id: ae(se.id),
              type: "button",
              role: "tab",
              class: "dc-tab",
              "data-dc-panel": se.kind === "panel" ? se.id : void 0,
              "data-dc-space": se.kind === "space" ? se.title : void 0,
              "aria-selected": se.index === r.value.index,
              "aria-controls": ue.value,
              tabindex: se.index === r.value.index ? 0 : -1,
              onPointerdown: (Ee) => ze(Ee, se),
              onClick: (Ee) => Ke(Ee, se),
              onKeydown: (Ee) => Zt(Ee, Te)
            }, [
              w("span", ed, A(se.title), 1),
              se.kind === "panel" && se.panel.subtitle ? (f(), m("span", td, A(se.panel.subtitle), 1)) : z("", !0),
              l.value && se.kind === "panel" && S(se.id) ? (f(), m("span", {
                key: 1,
                class: "dc-tab__close",
                role: "button",
                tabindex: "-1",
                "aria-label": `Close ${se.title}`,
                "data-dc-close": se.id,
                onPointerdown: H[0] || (H[0] = Fe(() => {
                }, ["stop"])),
                onClick: (Ee) => St(Ee, se.id)
              }, [...H[9] || (H[9] = [
                w("span", { "aria-hidden": "true" }, "×", -1)
              ])], 40, nd)) : z("", !0)
            ], 40, Ju)
          ], 64))), 128)),
          Se.value === a.value.length ? (f(), m("span", sd)) : z("", !0)
        ], 8, Qu),
        w("div", ad, [
          ye(O),
          q.value.length ? (f(), re(es, {
            key: 0,
            items: q.value,
            label: `${d.value} menu`
          }, null, 8, ["items", "label"])) : z("", !0)
        ]),
        te.value ? (f(), m("div", ld, [
          I.value && !L.value ? (f(), m("button", {
            key: 0,
            type: "button",
            class: "dc-pane__button dc-control",
            "aria-label": `Minimize ${d.value}`,
            "data-dc-minimize": k.value,
            onPointerdown: H[1] || (H[1] = Fe(() => {
            }, ["stop"])),
            onClick: H[2] || (H[2] = (se) => E(n).toggleMinimize(k.value))
          }, [
            ye(kt, { kind: "minimize" })
          ], 40, rd)) : z("", !0),
          I.value && !L.value ? (f(), m("button", {
            key: 1,
            type: "button",
            class: "dc-pane__button dc-control",
            "aria-label": `${T.value ? "Restore" : "Maximize"} ${d.value}`,
            "aria-pressed": T.value,
            "data-dc-maximize": k.value,
            onPointerdown: H[3] || (H[3] = Fe(() => {
            }, ["stop"])),
            onClick: H[4] || (H[4] = (se) => E(n).toggleMaximize(k.value))
          }, [
            ye(kt, {
              kind: T.value ? "restore" : "maximize"
            }, null, 8, ["kind"])
          ], 40, od)) : z("", !0),
          !l.value && u.value && S(u.value.id) ? (f(), m("button", {
            key: 2,
            type: "button",
            class: "dc-pane__close dc-control",
            "aria-label": `Close ${d.value}`,
            "data-dc-close": u.value.id,
            onPointerdown: H[5] || (H[5] = Fe(() => {
            }, ["stop"])),
            onClick: H[6] || (H[6] = (se) => E(n).close(u.value.id))
          }, [
            ye(kt, { kind: "close" })
          ], 40, id)) : z("", !0)
        ])) : z("", !0)
      ], 40, ju)),
      o.value ? (f(), m("div", {
        key: 1,
        id: ue.value,
        class: "dc-pane__space",
        role: C.value ? void 0 : "tabpanel",
        "aria-labelledby": C.value ? void 0 : ae(r.value.id)
      }, [
        be(B.$slots, "space", {
          node: o.value,
          path: y.value
        }, void 0, !0)
      ], 8, cd)) : (f(), m("div", {
        key: 2,
        id: ue.value,
        class: "dc-pane__body",
        role: C.value ? void 0 : "tabpanel",
        "aria-labelledby": C.value ? void 0 : ae(i.value)
      }, [
        ye(x)
      ], 8, ud)),
      ve.value ? (f(), m("div", {
        key: 3,
        class: "dc-pane__drop",
        "data-dc-edge": ve.value,
        "aria-hidden": "true"
      }, null, 8, dd)) : z("", !0)
    ], 40, Hu)) : z("", !0);
  }
}), Ua = /* @__PURE__ */ me(fd, [["__scopeId", "data-v-44fd2b2d"]]), pd = ["data-dc-space", "data-dc-path", "aria-label"], vd = {
  key: 0,
  class: "dc-space__head"
}, md = { class: "dc-space__title dc-truncate" }, hd = ["data-dc-direction"], _d = {
  key: 0,
  class: "dc-space__drop",
  "aria-hidden": "true"
}, gd = ["aria-orientation", "aria-label", "aria-valuenow", "aria-disabled", "tabindex", "onPointerdown", "onKeydown"], yd = /* @__PURE__ */ pe({
  __name: "WindowNode",
  props: {
    node: {},
    path: {},
    framed: { type: Boolean }
  },
  setup(e) {
    const t = e, n = ds(), s = U(null), a = v(() => j(t.node) ? t.node : null), l = v(() => Mt(t.node) ? t.node : null), r = v(() => ee(t.node) ? t.node : null), o = v(
      () => l.value ? l.value.children : r.value?.frames.map((x) => x.node) ?? []
    ), i = v(() => l.value ? Qe(l.value) : []), u = v(
      () => (r.value?.frames ?? []).map((x, O) => ({
        held: x,
        /** Place in the stack, counted from the back — what `z-index` follows. */
        order: O,
        key: S(x.node),
        path: [...t.path, O]
      })).sort((x, O) => x.key < O.key ? -1 : x.key > O.key ? 1 : 0)
    ), d = v(() => $t(t.node)), _ = v(() => n.spaceMenu(t.path)), y = v(() => t.node.headless === !0), k = v(() => r.value ? "desktop" : l.value?.direction ?? ""), b = U(null), C = U(0);
    let g = null;
    $e(
      b,
      (x) => {
        g?.disconnect(), g = null, !(!x || typeof ResizeObserver > "u") && (C.value = x.clientWidth, g = new ResizeObserver(([O]) => {
          C.value = O?.contentRect.width ?? 0;
        }), g.observe(x));
      },
      { immediate: !0 }
    ), Ze(() => g?.disconnect());
    const $ = v(() => {
      const x = Math.max(
        1,
        Math.floor((C.value + ht) / (Tn + ht))
      ), O = /* @__PURE__ */ new Map();
      let X = 0;
      for (const ne of u.value)
        ne.held.minimized === !0 && (O.set(ne.key, {
          x: ht + X % x * (Tn + ht),
          bottom: ht + Math.floor(X / x) * (Aa + ht)
        }), X += 1);
      return O;
    }), R = (x) => !!x && x.join("/") === t.path.join("/"), I = v(() => {
      const x = n.dropTarget.value, O = r.value;
      if (!O || !x?.rect || x.edge !== "float") return null;
      if (x.space) return R(x.space) ? x.rect : null;
      const X = Me(O, x.panel);
      return X && O.frames.includes(X) ? x.rect : null;
    }), L = v(() => {
      const x = n.dropTarget.value;
      return !!x && !x.rect && R(x.space);
    }), N = v(() => l.value?.direction === "row"), q = v(() => o.value.map((x, O) => [...t.path, O])), S = (x) => [...Je(x)].sort().join("/"), T = (x) => {
      const O = Je(x)[0];
      return (O ? n.panelFor(O)?.title : null) ?? O ?? "panel";
    }, te = (x) => {
      const O = o.value[x], X = o.value[x + 1];
      return !O || !X ? "Resize panels" : `Resize ${T(O)} and ${T(X)}`;
    }, ae = (x) => {
      const O = i.value[x] ?? 0, X = i.value[x + 1] ?? 0, ne = O + X;
      return ne > 0 ? Math.round(O / ne * 100) : 50;
    };
    function ue() {
      const x = s.value, O = x ? N.value ? x.clientWidth : x.clientHeight : 0;
      return O <= 0 ? 0.05 : Math.min(n.minPanelSize.value / O, 0.4);
    }
    let Y = null;
    function ve(x, O) {
      const X = l.value, ne = s.value;
      if (!n.resizable.value || !X || !ne || x.button !== 0) return;
      const ge = N.value ? ne.clientWidth : ne.clientHeight;
      if (ge <= 0) return;
      const ze = N.value ? x.clientX : x.clientY, Ke = Qe(X), Ie = Math.min(n.minPanelSize.value / ge, 0.4);
      x.preventDefault();
      const Ve = (W) => {
        const ke = ((N.value ? W.clientX : W.clientY) - ze) / ge;
        n.setSizes(t.path, Bs(Ke, O, ke, Ie));
      }, D = () => Y?.(), K = (W) => {
        W.key === "Escape" && (n.setSizes(t.path, Ke), Y?.());
      };
      Y = () => {
        window.removeEventListener("pointermove", Ve), window.removeEventListener("pointerup", D), window.removeEventListener("pointercancel", D), window.removeEventListener("keydown", K), Y = null;
      }, window.addEventListener("pointermove", Ve), window.addEventListener("pointerup", D), window.addEventListener("pointercancel", D), window.addEventListener("keydown", K);
    }
    Ze(() => Y?.());
    function Se(x, O) {
      const X = l.value;
      if (!n.resizable.value || !X) return;
      const ne = N.value ? "ArrowRight" : "ArrowDown", ge = N.value ? "ArrowLeft" : "ArrowUp", ze = x.shiftKey ? 0.1 : 0.02;
      if (x.key !== ne && x.key !== ge) return;
      const Ke = x.key === ne ? ze : -ze;
      x.preventDefault(), n.setSizes(t.path, Bs(Qe(X), O, Ke, ue()));
    }
    return (x, O) => {
      const X = Us("WindowNode", !0);
      return a.value ? (f(), re(Ua, {
        key: 0,
        group: a.value,
        path: e.path
      }, {
        space: We(({ node: ne, path: ge }) => [
          ye(X, {
            node: ne,
            path: ge,
            framed: ""
          }, null, 8, ["node", "path"])
        ]),
        _: 1
      }, 8, ["group", "path"])) : (f(), m("section", {
        key: 1,
        class: "dc-space",
        "data-dc-space": k.value,
        "data-dc-path": e.path.join("/"),
        "aria-label": d.value
      }, [
        !e.framed && !y.value ? (f(), m("header", vd, [
          w("span", md, A(d.value), 1),
          _.value.length ? (f(), re(es, {
            key: 0,
            items: _.value,
            label: `${d.value} menu`
          }, null, 8, ["items", "label"])) : z("", !0)
        ])) : z("", !0),
        r.value ? (f(), m("div", {
          key: 1,
          ref_key: "desktop",
          ref: b,
          class: "dc-window__desktop"
        }, [
          I.value ? (f(), m("div", {
            key: 0,
            class: "dc-window__drop",
            style: Re({
              left: `${I.value.x}px`,
              top: `${I.value.y}px`,
              width: `${I.value.w}px`,
              height: `${I.value.h}px`
            }),
            "aria-hidden": "true"
          }, null, 4)) : z("", !0),
          (f(!0), m(Q, null, ce(u.value, (ne) => (f(), re(Wu, {
            key: ne.key,
            frame: ne.held,
            path: ne.path,
            order: ne.order,
            place: $.value.get(ne.key) ?? null
          }, {
            default: We(() => [
              ye(X, {
                node: ne.held.node,
                path: ne.path,
                framed: ne.held.node.kind !== "group"
              }, null, 8, ["node", "path", "framed"])
            ]),
            _: 2
          }, 1032, ["frame", "path", "order", "place"]))), 128))
        ], 512)) : l.value ? (f(), m("div", {
          key: 2,
          ref_key: "container",
          ref: s,
          class: "dc-window__split",
          "data-dc-direction": l.value.direction
        }, [
          L.value ? (f(), m("div", _d)) : z("", !0),
          (f(!0), m(Q, null, ce(o.value, (ne, ge) => (f(), m(Q, {
            key: S(ne)
          }, [
            w("div", {
              class: "dc-window__cell",
              style: Re({ flexGrow: i.value[ge] ?? 1 })
            }, [
              ye(X, {
                node: ne,
                path: q.value[ge] ?? []
              }, null, 8, ["node", "path"])
            ], 4),
            ge < o.value.length - 1 ? (f(), m("div", {
              key: 0,
              class: "dc-window__gutter",
              role: "separator",
              "aria-orientation": N.value ? "vertical" : "horizontal",
              "aria-label": te(ge),
              "aria-valuenow": ae(ge),
              "aria-valuemin": "0",
              "aria-valuemax": "100",
              "aria-disabled": E(n).resizable.value ? void 0 : "true",
              tabindex: E(n).resizable.value ? 0 : -1,
              onPointerdown: (ze) => ve(ze, ge),
              onKeydown: (ze) => Se(ze, ge)
            }, null, 40, gd)) : z("", !0)
          ], 64))), 128))
        ], 8, hd)) : z("", !0)
      ], 8, pd));
    };
  }
}), wd = /* @__PURE__ */ me(yd, [["__scopeId", "data-v-fb5b403f"]]), kd = ["data-dc-theme", "data-dc-dragging", "data-dc-docking"], bd = {
  key: 1,
  class: "dc-window__empty"
}, $d = {
  class: "dc-window__live",
  "aria-live": "polite",
  role: "status"
}, nn = 16, xd = /* @__PURE__ */ pe({
  __name: "WindowFrame",
  props: /* @__PURE__ */ dn({
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
  emits: /* @__PURE__ */ dn(["panel-move", "view-change", "panel-activate", "tab-select", "frame-change", "frame-maximize", "frame-minimize", "panel-close"], ["update:layout", "update:views"]),
  setup(e, { expose: t, emit: n }) {
    const s = e, a = n, l = Tt(e, "layout"), r = Tt(e, "views"), o = Vt(), i = v(() => new Map(s.panels.map((c) => [c.id, c]))), u = v(() => s.panels.map((c) => c.id)), d = v(() => Mu(l.value, u.value)), _ = U(null), y = U(null), k = U(null), b = U(!0), C = U(null), g = U(null), $ = U(null), R = U(""), I = U(null);
    function L() {
      const c = I.value;
      return c ? [...c.querySelectorAll(".dc-pane[data-dc-panels]")].filter((h) => h.closest(".dc-window") === c).map((h) => ({ panels: (h.dataset.dcPanels ?? "").split(" "), element: h })) : [];
    }
    function N(c) {
      const p = [];
      let h = c.closest(".dc-float");
      for (; h; )
        p.unshift(Number(h.dataset.dcOrder ?? 0)), h = h.parentElement?.closest(".dc-float") ?? null;
      return p;
    }
    function q() {
      return L().map((c) => ({ pane: c, order: N(c.element) })).sort((c, p) => {
        const h = Math.max(c.order.length, p.order.length);
        for (let M = 0; M < h; M += 1) {
          const P = (c.order[M] ?? -1) - (p.order[M] ?? -1);
          if (P !== 0) return P;
        }
        return 0;
      }).map((c) => c.pane);
    }
    const S = (c) => L().find((p) => p.panels.includes(c)) ?? null;
    function T(c) {
      const p = i.value.get(c);
      if (!p) return "";
      const h = r.value[c];
      return h && p.views?.some((M) => M.key === h) ? h : p.defaultView ?? p.views?.[0]?.key ?? "";
    }
    function te(c, p) {
      r.value = { ...r.value, [c]: p }, a("view-change", { panel: c, view: p });
    }
    const ae = v(
      () => s.panels.filter((c) => c.fixed !== !0).length
    );
    function ue(c) {
      return !s.movable || ae.value < 1 || s.panels.length < 2 ? !1 : i.value.get(c)?.fixed !== !0;
    }
    function Y(c, p) {
      const h = d.value;
      !c || !h || c === h || (l.value = c, p && a("panel-move", p));
    }
    function ve(c, p, h) {
      if (c.width <= 0 || c.height <= 0) return "center";
      const M = (p - c.left) / c.width, P = (h - c.top) / c.height, F = 0.3;
      return M > F && M < 1 - F && P > F && P < 1 - F ? "center" : [
        { edge: "left", distance: M },
        { edge: "right", distance: 1 - M },
        { edge: "top", distance: P },
        { edge: "bottom", distance: 1 - P }
      ].reduce(
        (le, V) => V.distance < le.distance ? V : le
      ).edge;
    }
    function Se(c, p) {
      const h = [...c.querySelectorAll(".dc-tab")], M = h.findIndex((P) => {
        const F = P.getBoundingClientRect();
        return p < F.left + F.width / 2;
      });
      return M === -1 ? h.length : M;
    }
    function x(c, p, h) {
      for (const { panels: M, element: P } of q().reverse()) {
        const F = P.getBoundingClientRect();
        if (c < F.left || c > F.right || p < F.top || p > F.bottom) continue;
        const de = M.find((Z) => Z !== h), le = P.querySelector(".dc-pane__tabs"), V = le?.getBoundingClientRect();
        if (le && V && p >= V.top && p <= V.bottom)
          return de ? { panel: de, edge: "center", index: Se(le, c) } : null;
        const G = P.querySelector(":scope > .dc-pane__space");
        if (G) {
          const Z = G.getBoundingClientRect();
          if (c >= Z.left && c <= Z.right && p >= Z.top && p <= Z.bottom) continue;
        }
        return de ? { panel: de, edge: ve(F, c, p) } : null;
      }
      return X(c, p, h) ?? ze(c, p);
    }
    function O() {
      const c = I.value;
      return c ? [...c.querySelectorAll(".dc-window__desktop")].filter((p) => p.closest(".dc-window") === c).reverse() : [];
    }
    function X(c, p, h) {
      const M = d.value;
      if (!M) return null;
      for (const P of O()) {
        const F = P.getBoundingClientRect();
        if (c < F.left || c > F.right || p < F.top || p > F.bottom) continue;
        const de = Ke(P), le = de.flatMap((ie) => ie.panels).find((ie) => ie !== h);
        if (!le && de.length > 0) return null;
        const V = Me(M, h)?.rect, G = $n(
          {
            x: c - F.left - 24,
            y: p - F.top - 12,
            w: V?.w ?? ut.w,
            h: V?.h ?? ut.h
          },
          { w: P.clientWidth, h: P.clientHeight },
          s.minPanelSize
        );
        if (le) return { panel: le, edge: "float", rect: G };
        const Z = ne(P);
        return Z ? { panel: "", space: Z, edge: "float", rect: G } : null;
      }
      return null;
    }
    function ne(c) {
      const p = c.closest(".dc-space")?.getAttribute("data-dc-path");
      return p == null ? null : p === "" ? [] : p.split("/").map(Number);
    }
    function ge() {
      const c = I.value;
      return c ? [...c.querySelectorAll(".dc-space")].filter((p) => p.closest(".dc-window") === c).filter((p) => !p.querySelector(".dc-pane")).reverse().flatMap((p) => {
        const h = ne(p);
        return h ? [{ element: p, path: h }] : [];
      }) : [];
    }
    function ze(c, p) {
      for (const { element: h, path: M } of ge()) {
        if (h.dataset.dcSpace === "desktop") continue;
        const P = h.getBoundingClientRect();
        if (!(c < P.left || c > P.right || p < P.top || p > P.bottom))
          return { panel: "", space: M, edge: "center" };
      }
      return null;
    }
    function Ke(c) {
      return L().filter(
        (p) => p.element.closest(".dc-window__desktop") === c
      );
    }
    let Ie = null;
    const Ve = (c) => c.altKey;
    function D(c, p) {
      if (!ue(c) || y.value || g.value || p.button !== 0) return;
      const h = p.clientX, M = p.clientY;
      let P = !1, F = Ve(p);
      const de = () => {
        const fe = $.value;
        fe && (k.value = F ? X(fe.x, fe.y, c) : x(fe.x, fe.y, c));
      }, le = (fe) => {
        if (!P) {
          if (Math.hypot(fe.clientX - h, fe.clientY - M) < 4) return;
          P = !0, y.value = c, C.value = null;
        }
        F = Ve(fe), b.value = !F, $.value = { x: fe.clientX, y: fe.clientY }, de();
      }, V = (fe) => {
        Ve(fe) !== F && (F = !F, b.value = !F, P && de());
      }, G = (fe) => {
        Ie?.();
        const J = k.value, Pe = d.value;
        if (fe && P && J && Pe) {
          const et = J.space ? Is(Pe, c, J.space, J.rect) : J.edge === "float" && J.rect ? Ds(Pe, c, J.panel, J.rect) : tn(Pe, c, J.panel, J.edge, J.index);
          Y(et, {
            panel: c,
            target: J.panel,
            edge: J.edge,
            ...J.space === void 0 ? {} : { space: J.space },
            ...J.index === void 0 ? {} : { index: J.index },
            ...J.rect === void 0 ? {} : { rect: J.rect }
          });
        }
        y.value = null, k.value = null, $.value = null, b.value = !0;
      }, Z = () => G(!0), ie = () => G(!1), _e = (fe) => {
        if (fe.key === "Escape") {
          G(!1);
          return;
        }
        V(fe);
      };
      Ie = () => {
        window.removeEventListener("pointermove", le), window.removeEventListener("pointerup", Z), window.removeEventListener("pointercancel", ie), window.removeEventListener("keydown", _e), window.removeEventListener("keyup", V), Ie = null;
      }, window.addEventListener("pointermove", le), window.addEventListener("pointerup", Z), window.addEventListener("pointercancel", ie), window.addEventListener("keydown", _e), window.addEventListener("keyup", V);
    }
    Ze(() => Ie?.());
    let K = null;
    function W(c) {
      const p = I.value;
      return p ? [...p.querySelectorAll(
        `.dc-float[data-dc-path="${c.join("/")}"]`
      )].find((P) => P.closest(".dc-window") === p)?.parentElement ?? null : null;
    }
    function ke(c) {
      const p = d.value;
      return p ? Fn(p, c) : null;
    }
    function St(c) {
      const p = d.value;
      if (!p) return;
      const h = Ft(p, c);
      h !== p && (l.value = h);
    }
    function Zt(c) {
      const p = ke(c);
      p && St(p);
    }
    function B(c) {
      const p = d.value, h = p ? Me(p, c) : null;
      return h !== null && tt(h);
    }
    function H(c) {
      const p = d.value, h = p ? Me(p, c) : null;
      return h !== null && it(h);
    }
    function se(c) {
      const p = d.value, h = p ? ot(p, c) : null;
      return h ? Ae(h.node) : "";
    }
    function Te(c) {
      const p = d.value, h = p ? ot(p, c) : null;
      if (!p || !h) return;
      const M = Ae(h.node);
      if (i.value.get(M)?.fixed === !0) return;
      const P = !it(h);
      let F = mu(p, c, P);
      F !== p && (P || (F = Ft(F, c)), l.value = F, a("frame-minimize", { panel: M, minimized: P }));
    }
    function Ee(c) {
      const p = ke(c);
      p && Te(p);
    }
    function Et(c) {
      const p = d.value, h = p ? ot(p, c) : null;
      if (!p || !h) return;
      const M = Ae(h.node);
      if (i.value.get(M)?.fixed === !0) return;
      const P = !tt(h);
      let F = vu(p, c, P);
      F !== p && (P && (F = Ft(F, c)), l.value = F, a("frame-maximize", { panel: M, maximized: P }));
    }
    function ps(c) {
      const p = ke(c);
      p && Et(p);
    }
    function vs(c, p, h) {
      const M = d.value, P = M ? ot(M, c) : null;
      if (!M || !P || p.button !== 0 || y.value || g.value) return;
      const F = Ae(P.node);
      if (i.value.get(F)?.fixed === !0 || tt(P) || it(P) || (h === "move" ? !s.movable : !s.resizable)) return;
      const de = W(c), le = hu(M, c);
      St(c);
      const V = { w: de?.clientWidth ?? 0, h: de?.clientHeight ?? 0 }, G = { ...P.rect }, Z = p.clientX, ie = p.clientY, _e = s.minPanelSize;
      g.value = F;
      const fe = (Le) => {
        const Xe = d.value;
        if (!Xe) return;
        const Pt = Ns(Xe, le, $n(Le, V, _e));
        Pt !== Xe && (l.value = Pt);
      }, J = (Le) => {
        Le.preventDefault();
        const Xe = Le.clientX - Z, Pt = Le.clientY - ie;
        fe(
          h === "move" ? { ...G, x: G.x + Xe, y: G.y + Pt } : Fs(G, h, Xe, Pt, _e)
        );
      }, Pe = (Le) => {
        if (K?.(), g.value = null, !Le) {
          fe(G);
          return;
        }
        const Xe = d.value ? ot(d.value, le) : null;
        Xe && a("frame-change", { panel: se(le), rect: Xe.rect });
      }, et = () => Pe(!0), lt = () => Pe(!1), rt = (Le) => {
        Le.key === "Escape" && Pe(!1);
      };
      K = () => {
        window.removeEventListener("pointermove", J), window.removeEventListener("pointerup", et), window.removeEventListener("pointercancel", lt), window.removeEventListener("keydown", rt), K = null;
      }, window.addEventListener("pointermove", J), window.addEventListener("pointerup", et), window.addEventListener("pointercancel", lt), window.addEventListener("keydown", rt);
    }
    function Ha(c, p, h) {
      const M = ke(c);
      M && vs(M, p, h);
    }
    function ja(c, p, h = !1) {
      const M = d.value, P = ke(c), F = M && P ? ot(M, P) : null;
      if (!M || !P || !F || i.value.get(c)?.fixed === !0 || (h ? !s.resizable : !s.movable)) return;
      if (tt(F) || it(F)) {
        R.value = `${qe(c)} is ${tt(F) ? "maximized" : "minimized"}, so it cannot be moved.`;
        return;
      }
      const de = p === "left" ? -nn : p === "right" ? nn : 0, le = p === "up" ? -nn : p === "down" ? nn : 0, V = W(P), G = { w: V?.clientWidth ?? 0, h: V?.clientHeight ?? 0 }, Z = h ? Fs(F.rect, "se", de, le, s.minPanelSize) : { ...F.rect, x: F.rect.x + de, y: F.rect.y + le }, ie = Ns(M, P, $n(Z, G, s.minPanelSize));
      if (ie === M) {
        R.value = h ? `${qe(c)} cannot be resized further.` : `${qe(c)} cannot move ${p}.`;
        return;
      }
      l.value = ie;
      const _e = ot(ie, P);
      _e && (a("frame-change", { panel: c, rect: _e.rect }), R.value = h ? `${qe(c)} resized to ${_e.rect.w} by ${_e.rect.h}.` : `${qe(c)} moved to ${_e.rect.x}, ${_e.rect.y}.`);
    }
    Ze(() => K?.());
    function Xa(c, p) {
      const h = S(c), M = h?.element.getBoundingClientRect();
      if (!h || !M) return null;
      const P = p === "left" || p === "right", F = (V) => {
        if (!(P ? V.bottom > M.top + 1 && V.top < M.bottom - 1 : V.right > M.left + 1 && V.left < M.right - 1)) return null;
        const Z = p === "left" ? M.left - V.right : p === "right" ? V.left - M.right : p === "up" ? M.top - V.bottom : V.top - M.bottom;
        return Z < -1 ? null : Z;
      }, de = [];
      for (const V of L()) {
        if (V === h || V.element === h.element) continue;
        const G = F(V.element.getBoundingClientRect());
        if (G === null) continue;
        const Z = V.panels.find((ie) => ie !== c);
        Z && de.push({ to: { panel: Z }, distance: G });
      }
      for (const { element: V, path: G } of ge()) {
        const Z = F(V.getBoundingClientRect());
        Z !== null && de.push({ to: { space: G }, distance: Z });
      }
      return de.reduce(
        (V, G) => V && V.distance <= G.distance ? V : G,
        null
      )?.to ?? null;
    }
    function Ga(c) {
      const p = d.value ? Me(d.value, c) !== null : !1;
      if (!p && !ue(c)) return;
      C.value = C.value === c ? null : c;
      const h = qe(c);
      if (!C.value) {
        R.value = `${h}: move mode off.`;
        return;
      }
      R.value = p ? `${h}: move mode on. Arrow keys move the window, shift and an arrow resize it, Escape leaves move mode.` : `${h}: move mode on. Arrow keys move the panel, shift and an arrow make it a tab of the panel that way, Escape leaves move mode.`;
    }
    const qe = (c) => i.value.get(c)?.title ?? c, Ya = {
      left: "left",
      right: "right",
      up: "top",
      down: "bottom"
    };
    function Qa(c, p, h = !1) {
      if (!ue(c)) return;
      const M = d.value;
      if (!M) return;
      const P = qe(c), F = gt(M, c);
      if (!h && F && (p === "left" || p === "right") && F.panels.length > 1) {
        const ie = F.panels.indexOf(c), _e = p === "left" ? ie - 1 : ie + 1;
        if (_e >= 0 && _e < F.panels.length) {
          Y(Nt(M, c, _e), { panel: c, target: c, edge: "center", index: _e }), R.value = `${P} moved ${p}, now tab ${_e + 1} of ${F.panels.length}.`, _n(c);
          return;
        }
      }
      const le = Xa(c, p);
      if (!le || le.panel !== void 0 && !ue(le.panel)) {
        R.value = `${P} cannot move ${p}.`;
        return;
      }
      const V = Ya[p];
      if (le.space) {
        const ie = le.space, _e = st(M, ie), fe = Me(M, c)?.rect, J = { ...ut, ...fe ? { w: fe.w, h: fe.h } : {} };
        Y(Is(M, c, ie, J), { panel: c, target: "", space: ie, edge: V }), R.value = `${P} moved ${p}, into ${_e ? $t(_e) : "the space"}.`, _n(c);
        return;
      }
      const G = le.panel, Z = F?.panels.length === 1 && gt(M, G)?.panels.length === 1;
      h ? (Y(tn(M, c, G, "center"), {
        panel: c,
        target: G,
        edge: "center"
      }), R.value = `${P} joined ${qe(G)} as a tab.`) : Z ? (Y(on(M, c, G), { panel: c, target: G, edge: V }), R.value = `${P} moved ${p}, trading places with ${qe(G)}.`) : (Y(tn(M, c, G, V), { panel: c, target: G, edge: V }), R.value = `${P} moved ${p}, beside ${qe(G)}.`), _n(c);
    }
    function _n(c) {
      Ot(() => {
        S(c)?.element.querySelector(".dc-pane__grip")?.focus();
      });
    }
    function Za(c, p) {
      const h = d.value;
      h && (l.value = cn(h, c, p));
    }
    function gn(c) {
      const p = d.value;
      if (!p) return;
      const h = wt(p, c);
      h !== p && (l.value = h, a("tab-select", { panel: c }));
    }
    function ms(c) {
      return i.value.get(c)?.closable ?? s.closable;
    }
    function Ja(c) {
      ms(c) && a("panel-close", c);
    }
    const yn = U(/* @__PURE__ */ new Map());
    let el = 0;
    function tl(c, p) {
      const h = el += 1;
      return yn.value.set(h, { panel: c, items: p }), () => {
        yn.value.delete(h);
      };
    }
    function nl(c) {
      const p = [];
      for (const h of yn.value.values())
        h.panel() === c && p.push(...h.items());
      return p;
    }
    function hs(c) {
      const p = c.filter((h) => h.items.length > 0);
      return p.length < 2 ? p.flatMap((h) => h.items) : p.flatMap((h) => [
        { id: h.id, heading: !0, label: h.title },
        ...h.items
      ]);
    }
    const _s = (c) => c.title || "These tabs";
    function sl(c, p) {
      const h = p.id, M = gt(c, h), P = (M?.panels.length ?? 0) > 1, F = M?.fixedView === !0, de = (Z) => ({
        action: () => {
          Z !== c && (l.value = Z);
        }
      }), le = [], V = [], G = p.views ?? [];
      if (G.length > 1 && !F) {
        const Z = T(h);
        le.push({
          id: "view",
          label: "View",
          items: G.map((ie) => ({
            id: `view-${ie.key}`,
            label: ie.label,
            checked: ie.key === Z,
            action: () => te(h, ie.key)
          }))
        });
      }
      return P && !F && V.push(
        { id: "show-row", label: "Row", checked: !1, ...de(Os(c, h, "row")) },
        {
          id: "show-column",
          label: "Column",
          checked: !1,
          ...de(Os(c, h, "column"))
        },
        // Already true, and nothing to collapse: these panes are tabs. Ticked
        // and choosable all the same — collapsing a strip into a strip hands
        // back the tree it was given, so it is the no-op it looks like.
        {
          id: "show-tabs",
          label: "Tabs",
          checked: !0,
          ...de(wu(c, h))
        },
        {
          id: "show-desktop",
          label: "Desktop",
          checked: !1,
          ...de(ku(c, h))
        }
      ), P && M && (V.length && V.push({ separator: !0 }), V.push(...gs(M, h))), { panel: le, tabs: V, tabsTitle: M ? _s(M) : "" };
    }
    function gs(c, p) {
      const h = vt(c), M = (P) => {
        const F = c.panels[(h + P + c.panels.length) % c.panels.length];
        return (F === void 0 ? "" : Ae(F)) || p;
      };
      return [
        { id: "next-tab", label: "Next tab", action: () => gn(M(1)) },
        { id: "previous-tab", label: "Previous tab", action: () => gn(M(-1)) }
      ];
    }
    function Jt(c) {
      return c.title ? c.title : j(c) ? c.panels.length > 1 ? "these tabs" : "the strip" : $t(c);
    }
    function ys(c) {
      if (!c || ee(c) || c.fixedView === !0 || !c.title && c.headless !== !0 || Be(c)) return null;
      const p = Wa(c);
      return p && p.fixedView !== !0 ? p : null;
    }
    function al(c) {
      const p = d.value;
      if (!s.menu || !p) return [];
      const h = st(p, c);
      if (!h || j(h)) return [];
      if (h.fixedView) return [];
      const M = ee(h) ? "desktop" : h.direction, P = (J, Pe, et) => ({
        id: `show-${J}`,
        label: Pe,
        checked: M === J,
        action: () => {
          const lt = d.value, rt = et();
          !lt || rt === h || (l.value = vn(xe(ft(lt, c, rt))));
        }
      }), F = () => {
        const J = Ba(h, ll(h));
        if (j(J) && J.panels.length === 0) return h;
        const Pe = j(J) && J.panels.length === 1 ? J.panels[0] : void 0;
        return Pe !== void 0 && he(Pe) ? h : J;
      }, de = (J) => () => ee(h) ? qa(h, J) : h.direction === J ? h : { ...h, direction: J }, le = c.slice(0, -1), V = c.length > 0 ? st(p, le) : null, G = V && j(V) && V.panels.length > 1 ? V : null, Z = V && ys(V) === h ? V : null, ie = ys(h), _e = h.title || "this space", fe = (J, Pe, et, lt, rt) => ({
        id: J,
        label: rt,
        action: () => {
          const Le = d.value;
          Le && (l.value = vn(xe(ft(Le, Pe, xu(et, lt)))));
        }
      });
      return hs([
        {
          id: "about-space",
          /*
           * Its own name, or what it is rather than how it is shown: `spaceTitle`
           * would answer "Row" for an unnamed row, which is the item directly
           * under it and the one already ticked.
           */
          title: h.title || "This space",
          items: [
            P("row", "Row", de("row")),
            P("column", "Column", de("column")),
            // Everything in this space in one strip: the panes as tabs, and a
            // desktop among them as a tab of its own, keeping the windows on it.
            P("tabs", "Tabs", () => F()),
            P("desktop", "Desktop", () => ee(h) ? h : Va(h))
          ]
        },
        {
          id: "about-around",
          title: ie ? `Around ${Jt(ie)}` : "",
          items: ie ? [
            // Keeping this space's bar drops the one inside, so it is offered
            // only where the space inside has no name to be dropped with it.
            ...ie.title ? [] : [fe("merge-around-keep-this", c, h, "outer", `Keep ${_e}`)],
            ...h.title ? [] : [fe("merge-around-keep-that", c, h, "inner", `Keep ${Jt(ie)}`)]
          ] : []
        },
        {
          id: "about-inside",
          title: Z ? `Inside ${Jt(Z)}` : "",
          items: Z ? [
            ...h.title ? [] : [fe("merge-inside-keep-that", le, Z, "outer", `Keep ${Jt(Z)}`)],
            ...Z.title ? [] : [fe("merge-inside-keep-this", le, Z, "inner", `Keep ${_e}`)]
          ] : []
        },
        {
          id: "about-tabs",
          title: G ? _s(G) : "",
          items: G ? gs(G, Ae(h)) : []
        }
      ]);
    }
    function ll(c) {
      const p = _.value;
      return p && oe(c, p) ? p : void 0;
    }
    function rl(c) {
      const p = d.value, h = i.value.get(c);
      if (!p || !h) return [];
      const M = s.menu ? sl(p, h) : null, P = nl(c);
      P.length && M?.panel.length && P.push({ separator: !0 }), M && P.push(...M.panel);
      const F = hs([
        { id: "about-panel", title: h.title, items: P },
        { id: "about-tabs", title: M?.tabsTitle ?? "", items: M?.tabs ?? [] }
      ]);
      return s.paneMenu ? s.paneMenu(h, F) : F;
    }
    function ol(c, p) {
      return o[`${c}-${p}`] ?? o[c];
    }
    function ws(c, p, h, M) {
      return ol(c, p.id)?.({ panel: p, view: h, active: M });
    }
    Su({
      panelFor: (c) => i.value.get(c) ?? null,
      viewFor: T,
      setView: te,
      movable: v(() => s.movable),
      resizable: v(() => s.resizable),
      minPanelSize: v(() => s.minPanelSize),
      spaceNames: v(() => s.spaceNames),
      focused: _,
      dragging: y,
      dropTarget: k,
      moving: C,
      framing: g,
      canMove: ue,
      focus(c) {
        _.value !== c && (_.value = c, a("panel-activate", c));
      },
      selectPanel: gn,
      beginDrag: D,
      toggleMoveMode: Ga,
      nudge: Qa,
      setSizes: Za,
      frameOf: (c) => d.value ? Me(d.value, c) : null,
      beginFrameDrag: Ha,
      nudgeFrame: ja,
      raise: Zt,
      maximized: B,
      toggleMaximize: ps,
      minimized: H,
      toggleMinimize: Ee,
      beginFrameDragAt: vs,
      raiseAt: St,
      toggleMaximizeAt: Et,
      toggleMinimizeAt: Te,
      menuFor: rl,
      spaceMenu: al,
      registerMenu: tl,
      closable: ms,
      close: Ja,
      renderContent: (c, p, h) => ws("panel", c, p, h),
      renderActions: (c, p, h) => ws("actions", c, p, h),
      layout: d
    });
    const il = v(() => {
      if (!(!s.accent && !s.tokens))
        return { ...s.tokens, ...s.accent ? { "--dc-accent": s.accent } : {} };
    }), cl = () => {
      const c = y.value, p = $.value;
      return !c || !p ? null : vl(
        "div",
        {
          class: "dc-window__ghost",
          style: { left: `${p.x}px`, top: `${p.y}px` },
          "aria-hidden": "true"
        },
        i.value.get(c)?.title ?? c
      );
    };
    return t({
      /** The layout as rendered, reconciled against the current panels. */
      layout: d,
      /** Moves a panel programmatically — the same operation a drag performs. */
      move(c, p, h, M) {
        const P = d.value;
        P && Y(tn(P, c, p, h, M), {
          panel: c,
          target: p,
          edge: h,
          ...M === void 0 ? {} : { index: M }
        });
      },
      /** Brings a panel's tab to the top of its group. */
      select(c) {
        const p = d.value;
        p && (l.value = wt(p, c));
      },
      /** Lifts a panel onto the float holding `near`, as a window of its own. */
      float(c, p, h) {
        const M = d.value;
        M && Y(Ds(M, c, p, h), {
          panel: c,
          target: p,
          edge: "float",
          rect: h
        });
      },
      /** Puts a floating frame somewhere else, or makes it another size. */
      setRect(c, p) {
        const h = d.value;
        if (!h) return;
        const M = du(h, c, p);
        if (M === h) return;
        l.value = M;
        const P = Me(M, c);
        P && a("frame-change", { panel: c, rect: P.rect });
      },
      /**
       * Puts a panel on one of its views, the way its menu would — the way a pane
       * whose space fixed its view, or took its bar away, is switched at all.
       */
      setView: te,
      /** Brings a floating frame to the front of its stack. */
      raise: Zt,
      /** Fills the float with a window, or puts it back where it was. */
      toggleMaximize: ps,
      /** Rolls a window up to its title bar, or unrolls it. */
      toggleMinimize: Ee
    }), (c, p) => (f(), m("div", {
      ref_key: "root",
      ref: I,
      class: "dc-shell dc-window",
      "data-dc-theme": e.theme,
      "data-dc-dragging": y.value ? "true" : "false",
      "data-dc-docking": b.value ? "true" : "false",
      style: Re(il.value)
    }, [
      d.value ? (f(), re(wd, {
        key: 0,
        node: d.value,
        path: []
      }, null, 8, ["node"])) : (f(), m("p", bd, " This window has no panels. ")),
      ye(cl),
      w("p", $d, A(R.value), 1)
    ], 12, kd));
  }
}), Cd = /* @__PURE__ */ me(xd, [["__scopeId", "data-v-711565af"]]);
function Hd(e = "", t = "/") {
  const n = U(Ye(e)), s = U(t), a = [`${s.value}${n.value}`];
  return {
    search: n,
    path: s,
    history: a,
    push(l) {
      n.value = Ye(l), a.push(`${s.value}${n.value}`);
    },
    replace(l) {
      n.value = Ye(l), a[a.length - 1] = `${s.value}${n.value}`;
    }
  };
}
function Vs(e) {
  const t = e.indexOf("?");
  if (t === -1) return "";
  const n = e.slice(t), s = n.indexOf("#");
  return Ye(s === -1 ? n : n.slice(0, s));
}
function jd(e) {
  const t = U(Vs(e.currentRoute.value.fullPath)), n = v(() => e.currentRoute.value.path), s = $e(
    () => e.currentRoute.value.fullPath,
    (a) => {
      t.value = Vs(a);
    }
  );
  return {
    search: t,
    path: n,
    push: (a) => e.push(`${n.value}${Ye(a)}`),
    replace: (a) => e.replace(`${n.value}${Ye(a)}`),
    dispose: s
  };
}
const Md = {
  DataShell: Rc,
  ShellHeader: ha,
  QueryPanel: ga,
  RecordActions: ya,
  ResultsArea: Sa,
  FacetControl: _a,
  SegmentedControl: Uc,
  StatusPill: Ut,
  WindowFrame: Cd,
  WindowPane: Ua,
  ListView: zn,
  CardsView: ka,
  GridView: ba,
  TableView: Ca,
  LinksView: $a,
  PreviewView: xa,
  TypeCardsView: Ma
}, Xd = {
  install(e, t = {}) {
    const n = t.prefix ?? "";
    for (const [s, a] of Object.entries(Md))
      e.component(`${n}${s}`, a);
    t.route && e.provide(Hs, t.route);
  }
};
export {
  pn as CASCADE_STEP,
  Ad as COLUMN_BREAKPOINTS,
  Pd as COLUMN_ROLES,
  ka as CardsView,
  Rs as ColumnCell,
  ut as DEFAULT_FRAME,
  Sn as DEFAULT_SORT,
  hl as DEFAULT_VIEW,
  Rc as DataShell,
  En as EMPTY_CELL,
  fa as ENTITY_ALL,
  fn as ENTITY_TERM,
  Kt as EXPRESSION_TERM,
  Yn as FACET_PREFIX,
  _a as FacetControl,
  ba as GridView,
  Xd as HeaderContentLayoutPlugin,
  $a as LinksView,
  zn as ListView,
  ht as MINIMIZED_GAP,
  Aa as MINIMIZED_HEIGHT,
  Tn as MINIMIZED_WIDTH,
  Pa as MIN_FRAME,
  As as MOCK_TINTS,
  Ld as MenuBar,
  es as MenuButton,
  Ea as MenuList,
  Ht as MetricDrill,
  fs as PANE_CONTEXT_KEY,
  jn as PARAM_DIR,
  Wn as PARAM_ENTITY,
  Xn as PARAM_EXPR,
  Gn as PARAM_PAGE,
  Hn as PARAM_SORT,
  Un as PARAM_VIEW,
  Zn as PinStar,
  xa as PreviewView,
  ga as QueryPanel,
  en as RECORD_STATUSES,
  ta as RESULT_FIELDS,
  Hs as ROUTE_ADAPTER_KEY,
  ya as RecordActions,
  Sa as ResultsArea,
  da as SHELL_CONTEXT_KEY,
  Ed as SHELL_THEMES,
  jt as ScopeMark,
  Uc as SegmentedControl,
  Ct as SelectTick,
  Rd as ShellCard,
  ha as ShellHeader,
  Ut as StatusPill,
  Ca as TableView,
  Ma as TypeCardsView,
  js as VIEW_KINDS,
  _l as VIEW_LABELS,
  us as WINDOW_CONTEXT_KEY,
  Cd as WindowFrame,
  Ua as WindowPane,
  Ta as activePanel,
  vt as activeTab,
  ua as addTerm,
  oa as andExpression,
  cu as axisOf,
  ss as cascade,
  aa as cellFull,
  qt as cellText,
  ln as cellTextOf,
  De as cellValue,
  ks as changesResults,
  $n as clampRect,
  Ba as collapseSpace,
  wu as collapseToTabs,
  Nd as column,
  $s as columnAlign,
  xs as columnClass,
  bs as columnKey,
  Pn as columnTruncates,
  $l as columnsFor,
  yl as countPages,
  ml as createHistoryAdapter,
  Hd as createMemoryAdapter,
  Gl as createMockDataSource,
  jd as createVueRouterAdapter,
  Ml as defaultCellText,
  Ks as defaultLayout,
  Vn as defaultQuery,
  Zl as drillExpression,
  Is as dropIntoSpace,
  Bt as emptyFacetState,
  On as emptyFacetValue,
  Ql as excludingTerm,
  _t as findEntity,
  nt as findSort,
  Id as fixedView,
  ns as float,
  Ds as floatPanel,
  Va as floatSplit,
  ku as floatTabs,
  an as fnv1a,
  Ys as focusEntity,
  mt as formatCount,
  kl as formatDate,
  Rt as formatExpression,
  wl as formatMetric,
  bl as formatOrdinal,
  Wt as formatTerm,
  mn as frame,
  ot as frameAt,
  Me as frameOf,
  Fn as framePathOf,
  Ae as frontPanel,
  Hl as generateRows,
  Fd as group,
  gt as groupOf,
  uu as groups,
  ea as hasActiveFacets,
  oe as hasPanel,
  Dd as headless,
  zt as insertPanel,
  Lt as isChoosable,
  zd as isEntityScoped,
  Js as isFacetActive,
  ee as isFloat,
  j as isGroup,
  tt as isMaximized,
  it as isMinimized,
  he as isPanelTab,
  Bn as isPristineQuery,
  Mt as isSplit,
  Ne as isTabOf,
  Kn as isTypeCardsQuery,
  Xs as isViewKind,
  Ss as joinExpression,
  Nl as matchesExpression,
  jl as matchesFacets,
  fu as maximizeFrame,
  vu as maximizeFrameAt,
  xu as mergeSpace,
  pu as minimizeFrame,
  mu as minimizeFrameAt,
  tn as movePanel,
  Nt as moveTab,
  Td as negateTerm,
  st as nodeAt,
  Dt as nodeTitle,
  xe as normalizeLayout,
  Ye as normalizeSearch,
  is as normalizeSizes,
  Wa as onlySpace,
  Ps as oppositeTerm,
  Je as panelIds,
  He as panelNode,
  Ls as panelTabs,
  at as parseExpression,
  rr as parseQuery,
  Mo as presentParts,
  wa as presentRow,
  je as pressOptions,
  Uu as providePaneContext,
  er as provideShellContext,
  Su as provideWindowContext,
  xn as raiseFrame,
  Ft as raiseFrameAt,
  hu as raisedPath,
  na as reconcileFacets,
  Mu as reconcileLayout,
  ca as recordTerm,
  dt as removePanel,
  ft as replaceAt,
  Fs as resizeRect,
  Bs as resizeSplit,
  Gs as resolveView,
  Oe as roleColumn,
  sa as roleColumns,
  vn as rootSpace,
  ls as row,
  Cl as rowKey,
  la as sameTerm,
  Yl as scopeTerm,
  qn as scopeTermFor,
  Jl as scopedEntity,
  Ts as serializeQuery,
  wt as setActivePanel,
  du as setFrameRect,
  Ns as setFrameRectAt,
  cn as setSizesAt,
  Kd as setSplitDirection,
  Qe as sizesOf,
  Zs as sortsFor,
  we as spaceChrome,
  $t as spaceTitle,
  as as split,
  Il as splitExpression,
  Os as spreadTabs,
  ir as summarizeQuery,
  Qn as summaryTerms,
  on as swapPanels,
  ts as tabNode,
  Gt as tabPanels,
  qa as tileFloat,
  Vd as toFloat,
  qd as toTiled,
  Od as toggleMaximized,
  Bd as toggleMinimized,
  Ii as useColumns,
  ec as useEntityPreviews,
  Wd as usePaneContext,
  Ud as usePaneMenu,
  xt as usePresentedRows,
  cr as useQueryState,
  pr as useRecordNames,
  ur as useResults,
  Ce as useShellContext,
  ds as useWindowContext,
  Dl as withoutTerm
};
