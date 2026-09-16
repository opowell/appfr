import { ref as U, inject as xt, provide as Dn, computed as v, toValue as zt, shallowRef as Ot, watch as $e, onScopeDispose as qs, defineComponent as fe, onBeforeUnmount as et, openBlock as f, createElementBlock as m, createElementVNode as w, toDisplayString as z, Fragment as Q, renderList as ce, createCommentVNode as T, unref as E, withKeys as dt, withModifiers as Fe, normalizeStyle as Re, renderSlot as be, withDirectives as Cn, vModelText as Mn, useSlots as qt, nextTick as Bt, createBlock as le, createTextVNode as je, createVNode as ye, withCtx as He, resolveDynamicComponent as In, normalizeClass as un, createSlots as sn, useModel as Rt, useId as Ws, mergeModels as dn, Comment as dl, Text as fl, onMounted as pl, resolveComponent as Us, getCurrentScope as vl, h as ml } from "vue";
const Hs = Symbol("dc.routeAdapter");
function Ze(e) {
  if (!e) return "";
  const t = e.replace(/^[?]/, "");
  return t ? `?${t}` : "";
}
function hl() {
  const e = typeof window < "u", t = U(e ? Ze(window.location.search) : ""), n = U(e ? window.location.pathname : "/"), s = () => {
    t.value = Ze(window.location.search), n.value = window.location.pathname;
  };
  e && window.addEventListener("popstate", s);
  const a = (l, r) => {
    const o = Ze(l);
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
], Ad = [480, 620, 760, 900, 1100], _l = "cards", Sn = "updated";
function Xs(e) {
  return typeof e == "string" && js.includes(e);
}
const gl = {
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
function yt(e, t) {
  return t ? e.entities.find((n) => n.key === t) ?? null : null;
}
function Ys(e, t = {}) {
  const n = yt(e, t.entity), s = e.entities[0];
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
const yl = { key: Sn, label: Sn };
function at(e, t, n = null) {
  const s = Zs(e, n);
  return (t ? s.find((l) => l.key === t) : void 0) ?? s.find((l) => l.key === Sn) ?? s[0] ?? yl;
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
function Kt(e) {
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
function wl(e, t) {
  return t <= 0 ? 1 : Math.max(1, Math.ceil(e / t));
}
function Vn(e, t = {}) {
  const s = t.landing === "entity" ? Ys(e, t) : null;
  return {
    entity: s?.key ?? null,
    view: t.view && Xs(t.view) ? t.view : _l,
    sort: at(s, t.sort).key,
    dir: t.dir === "asc" ? "asc" : "desc",
    expr: "",
    facets: Kt(s),
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
function kl(e) {
  if (!Number.isFinite(e)) return "—";
  const t = Math.abs(e);
  return t >= 1e6 ? `${(e / 1e6).toFixed(1)}m` : t >= 1e3 ? `${(e / 1e3).toFixed(1)}k` : String(Math.round(e));
}
function _t(e) {
  return Number.isFinite(e) ? Math.round(e).toLocaleString("en-US") : "—";
}
function bl(e) {
  const t = new Date(e);
  if (Number.isNaN(t.getTime())) return "—";
  const n = String(t.getUTCDate()).padStart(2, "0"), s = String(t.getUTCMonth() + 1).padStart(2, "0");
  return `${n}.${s}.${t.getUTCFullYear()}`;
}
function $l(e) {
  return String(e + 1).padStart(2, "0");
}
const En = "—";
function Be(e, t) {
  return e.find((n) => n.role === t);
}
function sa(e, t) {
  return e.filter((n) => n.role === t);
}
function xl(e, t) {
  const n = (t ? t.columns : e?.columns) ?? [], s = t ? "scoped" : "everything";
  return n.filter(
    (a) => a.role !== "tint" && ((a.when ?? "always") === "always" || a.when === s)
  );
}
const Cl = ["id", "entityKey", "entityLabel"];
function De(e, t) {
  if (e.value) return e.value(t);
  const n = e.field ?? e.key;
  if (n !== void 0) {
    if (t.fields && n in t.fields) return t.fields[n];
    if (Cl.includes(n))
      return t[n];
  }
}
function bs(e, t) {
  const n = e.key ?? e.field ?? e.label;
  return n?.trim() ? n.trim() : `column-${t}`;
}
function Ml(e, t) {
  return e.id?.trim() ? e.id : `${e.entityKey || "row"}-${t}`;
}
function Sl(e, t) {
  if (e == null || e === "") return En;
  if (t === "number") {
    const n = typeof e == "number" ? e : Number(e);
    return Number.isFinite(n) ? kl(n) : String(e);
  }
  return t === "date" ? bl(String(e)) : Array.isArray(e) ? e.length ? e.join(", ") : En : String(e);
}
function Wt(e, t) {
  const n = De(e, t);
  return e.format ? e.format(n, t) : Sl(n, e.kind);
}
function El(e) {
  return typeof e == "number" ? Number.isFinite(e) ? String(e) : "" : typeof e == "string" ? e : Array.isArray(e) ? e.join(", ") : "";
}
function aa(e, t) {
  const n = Wt(e, t), s = El(De(e, t));
  return s && s !== n ? s : n;
}
function ln(e, t) {
  return e ? Wt(e, t) : "";
}
function $s(e) {
  return e.align ? e.align : e.kind === "number" || e.kind === "ordinal" ? "right" : "left";
}
const Pl = {
  ordinal: "dc-table__num",
  number: "dc-table__number",
  date: "dc-table__date",
  status: "dc-table__state"
};
function xs(e) {
  return [Pl[e.kind ?? "text"], e.class].filter(Boolean).join(" ");
}
function Pn(e) {
  if (e.truncate !== void 0) return e.truncate;
  const t = e.kind ?? "text";
  return t === "text" || t === "number" || t === "date";
}
const Al = /^([A-Za-z_][\w.-]*)\s*(>=|<=|:|=|>|<)\s*(.*)$/;
function zl(e) {
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
function rt(e) {
  const t = e.trim();
  if (!t) return [];
  const n = [];
  let s = [];
  for (const a of zl(t)) {
    const l = a.toUpperCase();
    if (l === "AND" || l === "&&") continue;
    if (l === "OR" || l === "||") {
      s.length && n.push(s), s = [];
      continue;
    }
    const r = a.length > 1 && a.startsWith("-"), o = r ? a.slice(1) : a, i = r ? { negated: !0 } : {}, u = Al.exec(o);
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
const wn = (e) => e.toLowerCase().replace(/\s+/g, ""), Tl = [
  ["status", "state"],
  ["state", "state"],
  ["updated", "updated"],
  ["date", "updated"],
  ["name", "identity"],
  ["ref", "reference"]
];
function Rl(e, t, n) {
  const s = wn(e), a = n.columns ?? [];
  if (s === "entity") return t.entityKey;
  if (e in t.fields) return t.fields[e];
  const l = a.find(
    (u) => u.key === e || u.field === e || u.label !== void 0 && wn(u.label) === s
  );
  if (l) return De(l, t);
  const r = n.facets.find((u) => wn(u.label) === s);
  if (r && r.key in t.fields) return t.fields[r.key];
  const o = Tl.find(([u]) => u === s)?.[1];
  if (o) {
    const u = Be(a, o);
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
function Ll(e, t, n) {
  if (e.kind === "text") {
    const r = n.columns ?? [];
    return ["identity", "reference"].some((o) => {
      const i = Be(r, o), u = i ? De(i, t) : void 0;
      return typeof u == "string" && kn(u, e.value);
    });
  }
  const s = Rl(e.field, t, n);
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
  return !Number.isFinite(a) || !Number.isFinite(l) ? null : Nl(e.comparator, l, a);
}
function Fl(e, t, n) {
  const s = Ll(e, t, n);
  return s === null ? !0 : e.negated ? !s : s;
}
function Nl(e, t, n) {
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
function Dl(e, t, n) {
  return e.length ? e.some((s) => s.every((a) => Fl(a, t, n))) : !0;
}
function Ms(e) {
  return /[\s"']/.test(e) ? `"${e.replace(/["']/g, "")}"` : e;
}
function Ut(e) {
  const t = e.negated ? "-" : "";
  return e.kind === "text" ? t + Ms(e.value) : `${t}${e.field}${e.comparator}${Ms(e.value)}`;
}
function Td(e) {
  if (!e.negated) return { ...e, negated: !0 };
  const { negated: t, ...n } = e;
  return n;
}
function Lt(e) {
  return e.filter((t) => t.length).map((t) => t.map(Ut).join(" ")).join(" OR ");
}
function Il(e, t, n) {
  return e.map((s, a) => a === t ? s.filter((l, r) => r !== n) : s).filter((s) => s.length);
}
function Ol(e) {
  const t = rt(e);
  if (t.length > 1) return { parts: [], text: e.trim() };
  const n = t[0] ?? [];
  return {
    parts: n.filter((s) => s.kind === "field"),
    text: n.filter((s) => s.kind === "text").map(Ut).join(" ")
  };
}
function Ss(e, t) {
  return [...e.map(Ut), t.trim()].filter(Boolean).join(" ");
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
function Bl(e, t) {
  return t.filter((n) => !e.some((s) => la(s, n)));
}
function oa(e, t) {
  const n = rt(e), s = rt(t);
  return n.length ? s.length ? Lt(
    n.flatMap((a) => s.map((l) => [...a, ...Bl(a, l)]))
  ) : Lt(n) : Lt(s);
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
const Kl = 7, Vl = 3;
function ql(e, t, n, s) {
  const a = (t * Kl + an(n)) % s, l = [];
  for (let r = 0; r < Math.min(Vl, s); r++)
    l.push(ia(e, (a + r) % s));
  return l;
}
function Wl(e, t) {
  switch (e.kind) {
    case "chips":
      return e.multiple ? Ul(e.options, t) : e.options[t % e.options.length] ?? "";
    case "range": {
      const n = Math.max(0, e.max - e.min);
      return e.min + (n === 0 ? 0 : t % (n + 1));
    }
    case "toggle":
      return t % 3 === 0;
  }
}
function Ul(e, t) {
  if (!e.length) return [];
  const n = 1 + (t >> 5) % Math.min(3, e.length), s = t % e.length, a = /* @__PURE__ */ new Set();
  for (let l = 0; l < n; l++) a.add((s + l) % e.length);
  return [...a].sort((l, r) => l - r).map((l) => e[l]);
}
function Hl(e, t) {
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
function jl(e, t = {}) {
  const n = t.population ?? 48, s = t.seed ?? "", a = t.now ?? /* @__PURE__ */ new Date("2026-08-25T00:00:00Z"), l = e.samples, r = t.scopes ?? [];
  if (!l.length) return [];
  const o = [];
  for (let i = 0; i < n; i++) {
    const u = l[i % l.length], d = Math.floor(i / l.length), _ = an(`${s}:${e.key}:${u[0]}:${i}`), y = ia(e.key, i), k = new Date(a.getTime() - _ % 900 * 36e5).toISOString(), b = {};
    for (const C of e.columns ?? []) {
      const g = C.field ?? C.key;
      if (!g || C.value) continue;
      const $ = Hl(C, {
        hash: an(`${_}:${g}`),
        sample: u,
        revision: d,
        updatedAt: k
      });
      $ !== void 0 && (b[g] = $);
    }
    for (const C of e.facets)
      b[C.key] = Wl(C, an(`${_}:${C.key}`));
    for (const [C, g] of r)
      b[C] = g === e.key ? y : ql(g, i, C, n);
    o.push({ id: y, entityKey: e.key, entityLabel: e.label, fields: b });
  }
  return o;
}
function Xl(e, t) {
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
function Gl(e, t) {
  const n = e.find((r) => r.sort === t);
  if (!n) return () => 0;
  const s = n.kind ?? "text", a = s === "number" || n.role === "metric", l = s === "date" || n.role === "updated";
  return (r, o) => {
    const i = De(n, r), u = De(n, o);
    return a ? Number(u ?? 0) - Number(i ?? 0) : l ? Date.parse(String(u ?? "")) - Date.parse(String(i ?? "")) : String(u ?? "").localeCompare(String(i ?? ""));
  };
}
function Yl(e = {}) {
  const t = /* @__PURE__ */ new Map(), n = (s, a) => {
    const l = t.get(s.key);
    if (l) return l;
    const r = e.scopes ?? a.entities.flatMap(
      (i) => i.scope ? [[i.scope, i.key]] : []
    ), o = jl(s, { ...e, scopes: r });
    return t.set(s.key, o), o;
  };
  return {
    query({ query: s, schema: a, entity: l, limit: r, offset: o }) {
      const i = rt(s.expr), u = l ? [l] : a.entities, d = [], _ = [];
      for (const b of u)
        for (const C of n(b, a))
          d.push(C), (l ? Xl(C, s.facets) : !0) && Dl(i, C, b) && _.push(C);
      const y = at(l, s.sort, a), k = _.sort(Gl(Qs(l, a), y.key));
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
function Ql(e, t) {
  return ca(e, t.id);
}
function ca(e, t) {
  const n = e?.scope;
  return n ? `${n}:"${t.replace(/"/g, "")}"` : null;
}
function qn(e, t) {
  return Ql(
    e.entities.find((n) => n.key === t.entityKey),
    t
  );
}
function ua(e, t) {
  if (!t) return e;
  const n = e.trim();
  if (!n) return t;
  const [s] = rt(t).flat();
  if (!s) return n;
  const a = rt(n);
  return a.some((o) => o.some((i) => la(i, s))) ? n : a.some((o) => o.some((i) => Ps(i, s))) ? Lt(
    a.map(
      (o) => o.map((i) => Ps(i, s) ? s : i)
    )
  ) : `${n} ${t}`;
}
function Zl(e) {
  if (!e) return null;
  const t = e.trim();
  return t ? t.startsWith("-") ? t.slice(1) : `-${t}` : null;
}
function Ge(e) {
  return e.metaKey || e.ctrlKey ? { exclude: !0 } : {};
}
function Jl(e, t, n, s = {}) {
  const a = qn(e, n);
  return ua(t.expr, s.exclude ? Zl(a) : a);
}
function da(e, t) {
  const n = t.toLowerCase();
  return e.entities.find((s) => s.scope?.toLowerCase() === n) ?? null;
}
const fa = Symbol("dc.shellContext");
function er(e) {
  return Dn(fa, e), e;
}
function Ce() {
  const e = xt(fa, null);
  if (!e)
    throw new Error(
      "[header-content-layout] No shell context found. Render this component inside <DataShell>."
    );
  return e;
}
const Wn = "e", Un = "v", Hn = "s", jn = "d", Xn = "q", Gn = "p", Yn = "f_", pa = "*", tr = [
  Wn,
  Un,
  Hn,
  jn,
  Xn,
  Gn
], An = "..", va = ",", nr = [
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
function Qe(e) {
  try {
    return decodeURIComponent(e.replace(/\+/g, " "));
  } catch {
    return e.replace(/\+/g, " ");
  }
}
function ma(e) {
  const t = e.replace(/^[?]/, "");
  if (!t) return [];
  const n = [];
  for (const s of t.split("&")) {
    if (!s) continue;
    const a = s.indexOf("="), l = a === -1 ? s : s.slice(0, a), r = a === -1 ? "" : s.slice(a + 1);
    n.push([Qe(l), r]);
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
  const n = Qe(t);
  switch (e.kind) {
    case "chips": {
      const s = new Set(
        n.split(va).map((l) => l.trim()).filter(Boolean)
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
      return e.selected.length ? (t.kind === "chips" ? t.options.filter((s) => e.selected.includes(s)) : e.selected).join(va) : null;
    case "range":
      return e.min === null && e.max === null ? null : `${e.min ?? ""}${An}${e.max ?? ""}`;
    case "toggle":
      return e.on ? "1" : null;
  }
}
function rr(e, t, n = {}) {
  const s = Vn(t, n), a = new Map(ma(e)), l = a.get(Wn), r = l === void 0 ? s.entity : Qe(l), o = r === pa ? null : yt(t, r), i = a.get(Un), u = i && Xs(Qe(i)) ? Qe(i) : s.view, d = a.get(Hn), _ = at(o, d ? Qe(d) : n.sort, t), y = a.get(jn), k = y ? Qe(y) === "asc" ? "asc" : "desc" : s.dir, b = a.get(Xn), C = a.get(Gn), g = C === void 0 ? 1 : Number(Qe(C)), $ = Number.isFinite(g) ? Math.max(1, Math.floor(g)) : 1, R = {};
  for (const I of o?.facets ?? []) {
    const L = a.get(`${Yn}${I.key}`);
    R[I.key] = L === void 0 ? On(I) : ar(I, L);
  }
  return {
    entity: o?.key ?? null,
    view: u,
    sort: _.key,
    dir: k,
    expr: b === void 0 ? "" : Qe(b),
    facets: na(o, R),
    page: $
  };
}
function Ts(e, t, n = {}, s = "") {
  const a = Vn(t, n), l = yt(t, e.entity), r = ma(s).filter(([_]) => !sr(_)), o = [], i = (_, y) => o.push([_, bn(y)]), u = l?.key ?? null;
  u !== a.entity && i(Wn, u ?? pa), e.view !== a.view && i(Un, e.view), e.sort !== a.sort && i(Hn, e.sort), e.dir !== a.dir && i(jn, e.dir), e.expr.trim() !== "" && i(Xn, e.expr);
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
const fn = "entity", Vt = "expr";
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
  return rt(e.expr).forEach((s, a) => {
    s.forEach((l, r) => {
      n.push({
        id: `${Vt}:${a}:${r}`,
        label: Ut(l),
        facetKey: Vt,
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
    const l = at(t, e.sort, n);
    return `everything · ${e.view} · ${l.label}`;
  }
  const s = Qn(e, t).filter((l) => l.facetKey !== Vt).map((l) => l.label), a = e.expr.trim();
  return a && s.push(`"${a}"`), s.join(" · ");
}
function cr(e) {
  const { adapter: t } = e, n = v(() => zt(e.schema)), s = v(() => zt(e.defaults) ?? {}), a = v(() => rr(t.search.value, n.value, s.value)), l = v(() => yt(n.value, a.value.entity)), r = v(() => l.value ?? Ys(n.value, s.value)), o = v(() => Zs(l.value, n.value)), i = v(() => at(l.value, a.value.sort, n.value)), u = (g, $) => {
    const R = Ts(g, n.value, s.value, t.search.value);
    R !== t.search.value && ($ === "push" ? t.push(R) : t.replace(R));
  }, d = () => zt(e.navigationMode) ?? "push", _ = () => zt(e.facetNavigationMode) ?? "replace", y = (g, $) => {
    const R = g.page ?? (ks(g) ? 1 : a.value.page);
    u({ ...a.value, ...g, page: R }, $);
  }, k = (g, $) => {
    const R = a.value.facets[g];
    if (!R) return;
    const I = { ...a.value.facets, [g]: $(R) };
    y({ facets: I }, _());
  }, b = (g) => {
    const $ = g === null ? null : yt(n.value, g);
    return ($?.key ?? null) === a.value.entity ? {} : {
      entity: $?.key ?? null,
      sort: at($, a.value.sort, n.value).key,
      facets: Kt($)
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
      y({ sort: at(l.value, g, n.value).key }, d());
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
      if (g.facetKey === Vt) {
        const $ = Il(rt(a.value.expr), g.group ?? 0, g.index ?? 0);
        y({ expr: Lt($) }, d());
        return;
      }
      k(g.facetKey, ($) => $.kind === "chips" && g.option ? { kind: "chips", selected: $.selected.filter((R) => R !== g.option) } : $.kind === "range" ? { kind: "range", min: null, max: null } : $.kind === "toggle" ? { kind: "toggle", on: !1 } : $);
    },
    clearFilters() {
      y({ entity: null, expr: "", facets: Kt(null) }, d());
    },
    reset() {
      u(Vn(n.value, s.value), d());
    },
    hrefFor(g) {
      const $ = { ...a.value, ...g };
      return $.page = g.page ?? (ks(g) ? 1 : a.value.page), $.facets = na(yt(n.value, $.entity), $.facets), `${t.path.value}${Ts($, n.value, s.value, t.search.value)}`;
    }
  };
}
function ur(e) {
  const t = Ot([]), n = U(0), s = U(!1), a = Ot(null);
  let l = 0, r = null;
  const o = v(() => (e.query.value.page - 1) * e.limit.value), i = v(() => wl(n.value, e.limit.value)), u = () => {
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
      insert(D, q) {
        if (!I()) return;
        const S = Array.isArray(D) ? D : [D];
        if (!S.length) return;
        L();
        const P = [...t.value];
        P.splice(q ?? P.length, 0, ...S), t.value = $ > 0 ? P.slice(0, $) : P, n.value += S.length;
      },
      set(D) {
        I() && (D.rows && (L(), t.value = $ > 0 ? D.rows.slice(0, $) : D.rows, n.value = D.rows.length), D.total !== void 0 && (n.value = D.total));
      },
      close() {
        I() && (s.value = !1);
      },
      fail(D) {
        I() && (_(D), s.value = !1);
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
const dr = 25, ha = (e, t) => e.toLowerCase() === t.toLowerCase();
function fr(e, t) {
  return e.find((n) => ha(n.id, t));
}
function pr(e) {
  const t = Ot(/* @__PURE__ */ new Map()), n = (r) => {
    if (r.facetKey !== Vt || !r.field || !r.value) return null;
    const o = da(e.schema.value, r.field);
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
        facets: Kt(o),
        sort: at(o, u.sort, e.schema.value).key,
        page: 1
      },
      schema: e.schema.value,
      entity: o,
      limit: dr,
      offset: 0
    });
  }, a = (r, o) => {
    const i = ln(Be(r.columns ?? [], "identity"), o);
    return i === En || ha(i, o.id) ? "" : i;
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
}, Hr = /* @__PURE__ */ fe({
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
    ), o = v(() => l.value.formatCount ?? _t);
    function i(F) {
      return F.key === a.query.value.entity && r.value && !n.hideCount ? o.value(a.total.value) : F.count;
    }
    function u(F) {
      return `${F.label} · ${i(F)}`;
    }
    const d = v(() => a.query.value.entity !== null || n.hideCount ? "Everything" : `Everything · ${o.value(a.total.value)}`), _ = v(() => {
      const F = a.within.value.trim();
      return F ? Qn({ ...a.query.value, expr: F, facets: {} }, null) : [];
    }), y = v(
      () => (n.views ?? [...js]).map((F) => ({ key: F, label: gl[F] }))
    ), k = v(() => Gs(a.query.value.view, n.views)), b = v(
      () => !(a.within.value && a.query.value.entity === null && k.value === "cards")
    );
    function C(F) {
      a.setView(F.target.value);
    }
    const g = v(
      () => a.sorts.value.map((F) => ({ key: F.key, label: F.label }))
    ), $ = v(
      () => g.value.length > 0 && a.query.value.entity !== null && !a.within.value
    );
    function R(F) {
      a.setSort(F.target.value);
    }
    const I = v(() => a.query.value.dir === "desc"), L = v(
      () => a.terms.value.filter((F) => F.facetKey !== fn).map((F, K, W) => {
        const ze = W[K - 1];
        return {
          term: F,
          or: ze?.group !== void 0 && F.group !== void 0 && F.group !== ze.group
        };
      })
    ), D = pr({
      source: a.source,
      schema: a.schema,
      query: a.query,
      // The scope's parts as well as the query's: it names a record more often
      // than a typed term does, being what a record's own page is built on.
      terms: v(() => [..._.value, ...a.terms.value])
    });
    function q(F) {
      return da(l.value, F)?.scopeLabel ?? F;
    }
    function S(F) {
      return F.replace(/\s*\([^()]*\)\s*$/, "");
    }
    function P(F) {
      const K = D.nameOf(F);
      return K ? `${F.negated ? "-" : ""}${q(F.field)}: ${S(K)}` : F.label;
    }
    function ne(F) {
      const K = F.target.value;
      a.setEntity(K || null);
    }
    function re(F) {
      F.target?.closest("button, select, label") || s("toggle");
    }
    const pe = U(null), Y = U("");
    function _e() {
      const F = pe.value;
      if (!F) {
        Y.value = "";
        return;
      }
      const K = F.scrollLeft > 1, W = F.scrollWidth - F.clientWidth - F.scrollLeft > 1;
      Y.value = K && W ? "both" : K ? "start" : W ? "end" : "";
    }
    let ke = null;
    $e(
      pe,
      (F) => {
        ke?.disconnect(), ke = null, _e(), !(!F || typeof ResizeObserver > "u") && (ke = new ResizeObserver(_e), ke.observe(F));
      },
      { flush: "post" }
    ), $e(L, _e, { flush: "post" }), et(() => ke?.disconnect());
    const x = v(() => a.query.value.page), O = v(
      () => (a.pageCount.value > 1 || !!n.pagesNote) && !Kn(a.query.value)
    ), G = v(
      () => `${a.pending.value ? "~" : ""}${_t(a.pageCount.value)}`
    ), te = v(() => {
      let F = `Page ${_t(x.value)} of ${G.value}`;
      const K = a.rows.value.length;
      if (K) {
        const W = a.offset.value + 1, ze = `${a.pending.value ? "~" : ""}${_t(a.total.value)}`;
        F += ` — rows ${_t(W)} to ${_t(W + K - 1)} of ${ze}`;
      }
      return n.pagesNote ? `${F}
${n.pagesNote}` : F;
    }), he = U(null), Ae = v(() => he.value ?? String(x.value)), Ve = v(
      () => `calc(${Math.max(2, String(a.pageCount.value).length)}ch + 10px)`
    );
    function qe(F) {
      F.target.select();
    }
    function We(F) {
      const K = F.target, W = K.value.replace(/[^0-9]/g, "");
      K.value !== W && (K.value = W), he.value = W;
    }
    function Ie(F) {
      const K = F.target, W = Number(he.value);
      he.value = null;
      const ze = Number.isFinite(W) && W >= 1 ? Math.min(Math.trunc(W), Math.max(1, a.pageCount.value)) : x.value;
      K.value = String(ze), ze !== x.value && a.setPage(ze);
    }
    function Oe(F) {
      const K = F.target;
      he.value = null, K.value = String(x.value), K.blur();
    }
    return (F, K) => (f(), m("div", {
      class: "dc-header",
      "data-dc-expanded": e.expanded ? "true" : "false"
    }, [
      w("div", {
        class: "dc-header__trigger",
        onClick: re
      }, [
        w("span", mr, z(l.value.label), 1),
        _.value.length ? (f(), m("span", hr, [
          K[4] || (K[4] = w("span", { class: "dc-header__sr" }, "Within", -1)),
          (f(!0), m(Q, null, ce(_.value, (W) => (f(), m("span", {
            key: `scope:${W.id}`,
            class: "dc-within dc-mono dc-truncate",
            title: P(W)
          }, z(P(W)), 9, _r))), 128))
        ])) : T("", !0),
        w("div", {
          ref_key: "termBar",
          ref: pe,
          class: "dc-header__query dc-header__terms",
          "data-dc-more": Y.value,
          title: E(a).summary.value,
          onScroll: _e
        }, [
          b.value ? (f(), m("label", yr, [
            K[6] || (K[6] = w("span", { class: "dc-header__sr" }, "Type", -1)),
            w("span", wr, [
              w("select", {
                class: "dc-header__pick-select dc-header__scope-select",
                value: E(a).query.value.entity ?? "",
                onChange: ne
              }, [
                w("option", br, z(d.value), 1),
                (f(!0), m(Q, null, ce(E(a).entities.value, (W) => (f(), m("option", {
                  key: W.key,
                  value: W.key
                }, z(u(W)), 9, $r))), 128))
              ], 40, kr),
              K[5] || (K[5] = w("span", {
                class: "dc-header__pick-mark",
                "aria-hidden": "true"
              }, "▾", -1))
            ])
          ])) : T("", !0),
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
                }, z(W.label), 9, Sr))), 128))
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
                  }, z(W.label), 9, zr))), 128))
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
            }, z(I.value ? "↓" : "↑"), 9, Tr)
          ], 64)) : T("", !0),
          (f(!0), m(Q, null, ce(L.value, (W) => (f(), m(Q, {
            key: W.term.id
          }, [
            W.or ? (f(), m("span", Rr, "or")) : T("", !0),
            w("button", {
              type: "button",
              class: "dc-term dc-mono",
              title: `Remove ${P(W.term)}`,
              "aria-label": `Remove ${P(W.term)}`,
              onClick: (ze) => E(a).removeTerm(W.term)
            }, z(P(W.term)), 9, Lr)
          ], 64))), 128))
        ], 40, gr),
        w("button", {
          type: "button",
          class: "dc-header__toggle",
          "aria-expanded": e.expanded,
          "aria-controls": e.panelId,
          onClick: K[1] || (K[1] = (W) => s("toggle"))
        }, [
          w("span", Nr, z(e.expanded ? "▲" : "▼"), 1),
          w("span", Dr, z(e.expanded ? "Hide query panel" : "Edit query"), 1)
        ], 8, Fr)
      ]),
      O.value ? (f(), m("nav", Ir, [
        w("button", {
          type: "button",
          class: "dc-header__step",
          "aria-label": "Previous page",
          disabled: x.value <= 1,
          onClick: K[2] || (K[2] = (W) => E(a).setPage(x.value - 1))
        }, [...K[11] || (K[11] = [
          w("span", { "aria-hidden": "true" }, "‹", -1)
        ])], 8, Or),
        w("span", {
          class: "dc-header__page dc-mono",
          title: te.value
        }, [
          w("input", {
            class: "dc-header__page-box dc-mono",
            type: "text",
            inputmode: "numeric",
            autocomplete: "off",
            "aria-label": "Page",
            style: Re({ width: Ve.value }),
            value: Ae.value,
            onFocus: qe,
            onInput: We,
            onKeydown: [
              dt(Fe(Ie, ["prevent"]), ["enter"]),
              dt(Fe(Oe, ["prevent"]), ["esc"])
            ],
            onBlur: Ie
          }, null, 44, Kr),
          w("span", Vr, "/ " + z(G.value), 1)
        ], 8, Br),
        w("span", qr, z(te.value), 1),
        w("button", {
          type: "button",
          class: "dc-header__step",
          "aria-label": "Next page",
          disabled: x.value >= E(a).pageCount.value,
          onClick: K[3] || (K[3] = (W) => E(a).setPage(x.value + 1))
        }, [...K[12] || (K[12] = [
          w("span", { "aria-hidden": "true" }, "›", -1)
        ])], 8, Wr)
      ])) : T("", !0),
      F.$slots.actions ? (f(), m("div", Ur, [
        be(F.$slots, "actions", {}, void 0, !0)
      ])) : T("", !0)
    ], 8, vr));
  }
}), ve = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [s, a] of t)
    n[s] = a;
  return n;
}, _a = /* @__PURE__ */ ve(Hr, [["__scopeId", "data-v-c80a5482"]]), jr = { class: "dc-facet" }, Xr = ["id"], Gr = { class: "dc-facet__body" }, Yr = ["aria-labelledby"], Qr = ["aria-pressed", "data-dc-active", "onClick"], Zr = ["aria-labelledby"], Jr = ["aria-label", "placeholder", "onKeydown"], eo = ["aria-label", "placeholder", "onKeydown"], to = ["aria-checked"], no = { class: "dc-switch__text" }, so = ["data-dc-active"], ao = /* @__PURE__ */ fe({
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
      }, z(e.facet.label), 9, Xr),
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
          }, z(k), 9, Qr))), 128))
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
            onKeydown: dt(Fe(u, ["prevent"]), ["enter"])
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
            onKeydown: dt(Fe(u, ["prevent"]), ["enter"])
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
          w("span", no, z(e.facet.text), 1),
          w("span", {
            class: "dc-switch__track",
            "data-dc-active": e.value.on ? "true" : "false",
            "aria-hidden": "true"
          }, [...y[3] || (y[3] = [
            w("span", { class: "dc-switch__knob" }, null, -1)
          ])], 8, so)
        ], 8, to)) : T("", !0)
      ])
    ]));
  }
}), ga = /* @__PURE__ */ ve(ao, [["__scopeId", "data-v-36d1334b"]]), lo = ["id"], ro = { class: "dc-panel__section dc-panel__rows" }, oo = { class: "dc-panel__row" }, io = ["for"], co = ["title", "aria-label", "onClick"], uo = ["id", "placeholder", "onKeydown"], fo = { class: "dc-panel__actions" }, po = ["disabled"], vo = {
  key: 0,
  class: "dc-panel__section"
}, mo = /* @__PURE__ */ fe({
  __name: "QueryPanel",
  props: {
    panelId: {}
  },
  emits: ["close"],
  setup(e, { emit: t }) {
    const n = t, s = qt(), a = Ce(), l = v(() => Ol(a.query.value.expr)), r = v(() => l.value.parts.map(Ut)), o = U(l.value.text), i = U(null);
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
    return Bt(() => i.value?.focus()), (C, g) => (f(), m("div", {
      id: e.panelId,
      class: "dc-panel",
      role: "dialog",
      "aria-label": "Query",
      onKeydown: g[2] || (g[2] = dt(Fe(($) => n("close"), ["stop"]), ["esc"]))
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
            }, z($), 9, co))), 128)),
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
                dt(Fe(d, ["prevent"]), ["enter"]),
                dt(y, ["backspace"])
              ]
            }, null, 40, uo), [
              [Mn, o.value]
            ])
          ], 32)
        ]),
        E(a).entity.value ? (f(!0), m(Q, { key: 0 }, ce(E(a).entity.value.facets, ($) => (f(), le(ga, {
          key: $.key,
          facet: $,
          value: E(a).query.value.facets[$.key],
          onUpdate: (R) => b($.key, R)
        }, null, 8, ["facet", "value", "onUpdate"]))), 128)) : T("", !0),
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
      ])) : T("", !0)
    ], 40, lo));
  }
}), ya = /* @__PURE__ */ ve(mo, [["__scopeId", "data-v-2642c02d"]]), ho = {
  key: 0,
  class: "dc-actions"
}, _o = {
  key: 0,
  class: "dc-actions__select"
}, go = { class: "dc-actions__all" }, yo = ["checked", "indeterminate"], wo = {
  class: "dc-actions__count",
  "aria-live": "polite"
}, ko = { class: "dc-actions__ops" }, bo = ["disabled"], $o = ["disabled"], xo = /* @__PURE__ */ fe({
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
          w("span", wo, z(d.value), 1)
        ]),
        r.value ? (f(), m("button", {
          key: 0,
          type: "button",
          class: "dc-actions__clear",
          onClick: k[1] || (k[1] = (b) => E(t).clearSelection())
        }, " Clear ")) : T("", !0)
      ])) : T("", !0),
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
          je(" " + z(n.value.create), 1)
        ])) : T("", !0),
        n.value?.duplicate ? (f(), m("button", {
          key: 1,
          type: "button",
          class: "dc-actions__op",
          disabled: !r.value,
          onClick: k[3] || (k[3] = (b) => E(t).duplicate())
        }, z(_(n.value.duplicate)), 9, bo)) : T("", !0),
        n.value?.delete ? (f(), m("button", {
          key: 2,
          type: "button",
          class: "dc-actions__op dc-actions__danger",
          disabled: !r.value,
          onClick: k[4] || (k[4] = (b) => E(t).delete())
        }, z(_(n.value.delete)), 9, $o)) : T("", !0)
      ])
    ])) : T("", !0);
  }
}), wa = /* @__PURE__ */ ve(xo, [["__scopeId", "data-v-ca4aca14"]]);
function Co(e, t) {
  if (!e) return null;
  const n = De(e, t);
  return typeof n == "string" && n.trim() ? n : null;
}
function Mo(e, t) {
  const n = Be(t, "state"), s = Be(t, "tint");
  return {
    identity: ln(Be(t, "identity"), e),
    reference: ln(Be(t, "reference"), e),
    metrics: sa(t, "metric").map((a) => ({
      column: a,
      label: a.label ?? "",
      text: Wt(a, e)
    })),
    state: n ? De(n, e) ?? null : null,
    updated: ln(Be(t, "updated"), e),
    image: Co(Be(t, "image"), e),
    tint: s ? De(s, e) ?? null : null
  };
}
function ka(e, t, n, s, a = !1) {
  const l = n?.columns ?? [];
  return {
    row: e,
    key: Ml(e, t),
    entityLabel: e.entityLabel,
    entity: n,
    columns: l,
    ordinal: $l(t),
    parts: Mo(e, l),
    pinned: s,
    selected: a
  };
}
function Mt() {
  const e = Ce(), t = v(
    () => new Map(e.entities.value.map((n) => [n.key, n]))
  );
  return v(
    () => e.rows.value.map(
      (n, s) => ka(
        n,
        e.offset.value + s,
        t.value.get(n.entityKey) ?? null,
        e.isPinned(n),
        e.isSelected(n)
      )
    )
  );
}
const So = ["data-dc-status"], Eo = /* @__PURE__ */ fe({
  __name: "StatusPill",
  props: {
    status: {}
  },
  setup(e) {
    return (t, n) => (f(), m("span", {
      class: "dc-pill",
      "data-dc-status": e.status
    }, z(e.status), 9, So));
  }
}), Ht = /* @__PURE__ */ ve(Eo, [["__scopeId", "data-v-23e59fbf"]]), Po = ["title"], Ao = { key: 1 }, zo = /* @__PURE__ */ fe({
  __name: "MetricDrill",
  props: {
    entry: {},
    column: {}
  },
  setup(e) {
    const t = e, n = Ce(), s = v(() => !t.entry.entity?.scope || !t.column.drill ? null : n.entities.value.find((i) => i.key === t.column.drill) ?? null), a = v(() => t.column.label ?? ""), l = v(() => Wt(t.column, t.entry.row));
    function r(o) {
      o.stopPropagation(), s.value && n.drill(t.entry.row, s.value, Ge(o));
    }
    return (o, i) => s.value ? (f(), m("button", {
      key: 0,
      type: "button",
      class: "dc-drill",
      title: `${a.value} of ${e.entry.parts.identity} — show the ${s.value.label.toLowerCase()}`,
      onClick: r
    }, [
      be(o.$slots, "default", {}, () => [
        je(z(l.value), 1)
      ], !0)
    ], 8, Po)) : (f(), m("span", Ao, [
      be(o.$slots, "default", {}, () => [
        je(z(l.value), 1)
      ], !0)
    ]));
  }
}), jt = /* @__PURE__ */ ve(zo, [["__scopeId", "data-v-f2501b17"]]), To = ["data-dc-active", "aria-pressed", "aria-label"], Ro = /* @__PURE__ */ fe({
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
    }, z(e.pinned ? "★" : "☆"), 9, To));
  }
}), Zn = /* @__PURE__ */ ve(Ro, [["__scopeId", "data-v-ef63d763"]]), Lo = ["src"], Fo = /* @__PURE__ */ fe({
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
    }, null, 40, Lo)) : T("", !0);
  }
}), Jn = /* @__PURE__ */ ve(Fo, [["__scopeId", "data-v-afaab300"]]), No = ["title", "aria-label"], Do = /* @__PURE__ */ fe({
  __name: "ScopeMark",
  props: {
    entry: {}
  },
  setup(e) {
    const t = e, n = Ce(), s = v(
      () => n.narrowsOnPress.value ? null : t.entry.entity?.scope ?? null
    );
    function a(l) {
      l.stopPropagation(), n.drill(t.entry.row, null, Ge(l));
    }
    return (l, r) => s.value ? (f(), m("button", {
      key: 0,
      type: "button",
      class: "dc-scope",
      title: `Narrow everything to ${s.value}: ${e.entry.row.id} — ⌘-click to leave it out`,
      "aria-label": `Narrow everything to ${e.entry.parts.identity}`,
      onClick: a
    }, " → ", 8, No)) : T("", !0);
  }
}), Xt = /* @__PURE__ */ ve(Do, [["__scopeId", "data-v-feb1c62d"]]), Io = ["checked", "aria-label"], St = /* @__PURE__ */ fe({
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
}, Yo = /* @__PURE__ */ fe({
  __name: "CardsView",
  setup(e) {
    const t = Ce(), n = Mt(), s = v(() => t.isEverything.value);
    return (a, l) => (f(), m("div", Oo, [
      (f(!0), m(Q, null, ce(E(n), (r) => (f(), m("div", {
        key: r.key,
        class: "dc-card"
      }, [
        w("div", Bo, [
          w("span", Ko, [
            E(t).selectable.value ? (f(), le(St, {
              key: 0,
              row: r.row,
              selected: r.selected,
              name: r.parts.identity
            }, null, 8, ["row", "selected", "name"])) : T("", !0),
            je(" " + z(r.ordinal) + " ", 1),
            s.value ? (f(), m("span", Vo, z(r.entityLabel), 1)) : T("", !0)
          ]),
          w("span", qo, [
            r.parts.state ? (f(), le(Ht, {
              key: 0,
              status: r.parts.state
            }, null, 8, ["status"])) : T("", !0),
            ye(Xt, { entry: r }, null, 8, ["entry"]),
            E(t).pinnable.value ? (f(), le(Zn, {
              key: 1,
              row: r.row,
              name: r.parts.identity,
              pinned: r.pinned
            }, null, 8, ["row", "name", "pinned"])) : T("", !0)
          ])
        ]),
        w("button", {
          type: "button",
          class: "dc-card__open",
          onClick: (o) => E(t).activate(r.row, E(Ge)(o))
        }, [
          r.parts.image ? (f(), le(Jn, {
            key: 0,
            class: "dc-card__image",
            src: r.parts.image
          }, null, 8, ["src"])) : T("", !0),
          w("span", Uo, [
            w("span", Ho, z(r.parts.identity), 1),
            w("span", jo, z(r.parts.reference), 1)
          ])
        ], 8, Wo),
        w("div", Xo, [
          (f(!0), m(Q, null, ce(r.parts.metrics.slice(0, 2), (o) => (f(), le(jt, {
            key: o.column.key ?? o.label,
            entry: r,
            column: o.column
          }, {
            default: He(() => [
              je(z(o.label) + " " + z(o.text), 1)
            ]),
            _: 2
          }, 1032, ["entry", "column"]))), 128)),
          r.parts.updated ? (f(), m("span", Go, z(r.parts.updated), 1)) : T("", !0)
        ])
      ]))), 128))
    ]));
  }
}), ba = /* @__PURE__ */ ve(Yo, [["__scopeId", "data-v-434bd32f"]]), Qo = { class: "dc-grid" }, Zo = ["onClick"], Jo = { class: "dc-tile__scrim" }, ei = { class: "dc-tile__top dc-mono" }, ti = { class: "dc-tile__chip" }, ni = { class: "dc-tile__caption" }, si = { class: "dc-tile__secondary dc-truncate" }, ai = { class: "dc-tile__primary" }, li = /* @__PURE__ */ fe({
  __name: "GridView",
  setup(e) {
    const t = Ce(), n = Mt();
    return (s, a) => (f(), m("div", Qo, [
      (f(!0), m(Q, null, ce(E(n), (l) => (f(), m("div", {
        key: l.key,
        class: "dc-grid__cell"
      }, [
        w("button", {
          type: "button",
          class: "dc-tile",
          style: Re({ "--dc-tile-tint": l.parts.tint ?? void 0 }),
          onClick: (r) => E(t).activate(l.row, E(Ge)(r))
        }, [
          l.parts.image ? (f(), le(Jn, {
            key: 0,
            class: "dc-tile__image",
            src: l.parts.image
          }, null, 8, ["src"])) : T("", !0),
          w("span", Jo, [
            w("span", ei, [
              w("span", ti, z(l.ordinal), 1)
            ]),
            w("span", ni, [
              w("span", si, z(l.parts.reference), 1),
              w("span", ai, z(l.parts.identity), 1)
            ])
          ])
        ], 12, Zo),
        E(t).selectable.value ? (f(), le(St, {
          key: 0,
          class: "dc-grid__tick",
          row: l.row,
          selected: l.selected,
          name: l.parts.identity
        }, null, 8, ["row", "selected", "name"])) : T("", !0)
      ]))), 128))
    ]));
  }
}), $a = /* @__PURE__ */ ve(li, [["__scopeId", "data-v-7df25d40"]]), ri = { class: "dc-links" }, oi = ["onClick"], ii = { class: "dc-link__primary dc-truncate" }, ci = { class: "dc-link__secondary dc-mono dc-truncate" }, ui = /* @__PURE__ */ fe({
  __name: "LinksView",
  setup(e) {
    const t = Ce(), n = Mt();
    return (s, a) => (f(), m("div", ri, [
      (f(!0), m(Q, null, ce(E(n), (l) => (f(), m("span", {
        key: l.key,
        class: "dc-links__item"
      }, [
        E(t).selectable.value ? (f(), le(St, {
          key: 0,
          row: l.row,
          selected: l.selected,
          name: l.parts.identity
        }, null, 8, ["row", "selected", "name"])) : T("", !0),
        w("button", {
          type: "button",
          class: "dc-link",
          onClick: (r) => E(t).activate(l.row, E(Ge)(r))
        }, [
          w("span", ii, z(l.parts.identity), 1),
          w("span", ci, z(l.parts.reference), 1)
        ], 8, oi)
      ]))), 128))
    ]));
  }
}), xa = /* @__PURE__ */ ve(ui, [["__scopeId", "data-v-08d0266c"]]), di = {
  class: "dc-list",
  role: "list"
}, fi = ["onClick"], pi = { class: "dc-list__ordinal dc-mono" }, vi = { class: "dc-list__identity" }, mi = { class: "dc-list__primary dc-truncate" }, hi = { class: "dc-list__secondary dc-mono dc-truncate" }, _i = {
  key: 1,
  class: "dc-list__entity dc-mono"
}, gi = { class: "dc-list__metrics dc-mono" }, yi = { class: "dc-list__trailing" }, wi = /* @__PURE__ */ fe({
  __name: "ListView",
  setup(e) {
    const t = Ce(), n = Mt(), s = v(() => t.isEverything.value);
    return (a, l) => (f(), m("div", di, [
      (f(!0), m(Q, null, ce(E(n), (r) => (f(), m("div", {
        key: r.key,
        class: "dc-list__row",
        role: "listitem"
      }, [
        E(t).selectable.value ? (f(), le(St, {
          key: 0,
          class: "dc-list__tick",
          row: r.row,
          selected: r.selected,
          name: r.parts.identity
        }, null, 8, ["row", "selected", "name"])) : T("", !0),
        w("button", {
          type: "button",
          class: "dc-list__open",
          onClick: (o) => E(t).activate(r.row, E(Ge)(o))
        }, [
          w("span", pi, z(r.ordinal), 1),
          w("span", vi, [
            w("span", mi, z(r.parts.identity), 1),
            w("span", hi, z(r.parts.reference), 1)
          ])
        ], 8, fi),
        s.value ? (f(), m("span", _i, z(r.entityLabel), 1)) : T("", !0),
        w("span", gi, [
          (f(!0), m(Q, null, ce(r.parts.metrics.slice(0, 2), (o) => (f(), le(jt, {
            key: o.column.key ?? o.label,
            entry: r,
            column: o.column
          }, null, 8, ["entry", "column"]))), 128))
        ]),
        w("span", yi, [
          r.parts.state ? (f(), le(Ht, {
            key: 0,
            status: r.parts.state
          }, null, 8, ["status"])) : T("", !0),
          ye(Xt, { entry: r }, null, 8, ["entry"]),
          E(t).pinnable.value ? (f(), le(Zn, {
            key: 1,
            row: r.row,
            name: r.parts.identity,
            pinned: r.pinned
          }, null, 8, ["row", "name", "pinned"])) : T("", !0)
        ])
      ]))), 128))
    ]));
  }
}), zn = /* @__PURE__ */ ve(wi, [["__scopeId", "data-v-8e3fd7b4"]]), ki = { class: "dc-preview" }, bi = { class: "dc-preview__pager dc-mono" }, $i = ["disabled"], xi = { "aria-live": "polite" }, Ci = ["disabled"], Mi = {
  key: 0,
  class: "dc-preview__card"
}, Si = { class: "dc-preview__body" }, Ei = { class: "dc-preview__top" }, Pi = { class: "dc-preview__badges" }, Ai = { class: "dc-preview__entity dc-mono" }, zi = { class: "dc-preview__marks" }, Ti = { class: "dc-preview__primary" }, Ri = { class: "dc-preview__secondary dc-mono" }, Li = { class: "dc-preview__fields" }, Fi = { class: "dc-preview__key" }, Ni = { class: "dc-preview__value dc-mono" }, Di = /* @__PURE__ */ fe({
  __name: "PreviewView",
  setup(e) {
    const t = Ce(), n = Mt(), s = U(0);
    $e(n, (i) => {
      s.value > i.length - 1 && (s.value = Math.max(0, i.length - 1));
    });
    const a = v(() => n.value[s.value]), l = v(() => {
      const i = a.value;
      if (!i) return [];
      const u = Be(i.columns, "reference"), d = Be(i.columns, "updated");
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
        w("span", xi, z(r.value), 1),
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
              E(t).selectable.value ? (f(), le(St, {
                key: 0,
                row: a.value.row,
                selected: a.value.selected,
                name: a.value.parts.identity
              }, null, 8, ["row", "selected", "name"])) : T("", !0),
              a.value.parts.state ? (f(), le(Ht, {
                key: 1,
                status: a.value.parts.state
              }, null, 8, ["status"])) : T("", !0),
              w("span", Ai, z(a.value.entityLabel), 1)
            ]),
            w("span", zi, [
              ye(Xt, { entry: a.value }, null, 8, ["entry"]),
              E(t).pinnable.value ? (f(), le(Zn, {
                key: 0,
                row: a.value.row,
                name: a.value.parts.identity,
                pinned: a.value.pinned
              }, null, 8, ["row", "name", "pinned"])) : T("", !0)
            ])
          ]),
          w("div", null, [
            w("div", Ti, z(a.value.parts.identity), 1),
            w("div", Ri, z(a.value.parts.reference), 1)
          ]),
          w("dl", Li, [
            (f(!0), m(Q, null, ce(l.value, (d) => (f(), m("div", {
              key: d.key,
              class: "dc-preview__field"
            }, [
              w("dt", Fi, z(d.key), 1),
              w("dd", Ni, [
                d.column && a.value ? (f(), le(jt, {
                  key: 0,
                  entry: a.value,
                  column: d.column
                }, null, 8, ["entry", "column"])) : (f(), m(Q, { key: 1 }, [
                  je(z(d.value), 1)
                ], 64))
              ])
            ]))), 128))
          ]),
          w("button", {
            type: "button",
            class: "dc-preview__open",
            onClick: u[2] || (u[2] = (d) => E(t).activate(a.value.row, E(Ge)(d)))
          }, " Open record → ")
        ])
      ])) : T("", !0)
    ]));
  }
}), Ca = /* @__PURE__ */ ve(Di, [["__scopeId", "data-v-b14eee6d"]]);
function Ii() {
  const e = Ce();
  return v(() => xl(e.schema.value, e.entity.value));
}
const Oi = ["title"], Bi = {
  key: 5,
  class: "dc-cell__text"
}, Ki = /* @__PURE__ */ fe({
  __name: "ColumnCell",
  props: {
    column: {},
    entry: {}
  },
  setup(e) {
    const t = e, n = Ce(), s = v(() => t.column.kind ?? "text"), a = v(() => De(t.column, t.entry.row)), l = v(
      () => s.value === "ordinal" ? t.entry.ordinal : Wt(t.column, t.entry.row)
    ), r = v(() => a.value), o = v(() => t.column.activate === !0 || !!t.column.click), i = v(() => Pn(t.column)), u = v(() => aa(t.column, t.entry.row));
    function d(_) {
      if (!o.value) return;
      _.stopPropagation();
      const y = Ge(_);
      t.column.click?.(t.entry.row, y), t.column.activate && n.activate(t.entry.row, y);
    }
    return (_, y) => s.value === "component" && e.column.component ? (f(), le(In(e.column.component), {
      key: 0,
      row: e.entry.row,
      entry: e.entry,
      value: a.value,
      column: e.column
    }, null, 8, ["row", "entry", "value", "column"])) : s.value === "status" ? (f(), le(Ht, {
      key: 1,
      status: r.value
    }, null, 8, ["status"])) : s.value === "image" ? (f(), le(Jn, {
      key: 2,
      class: "dc-cell__image",
      src: typeof a.value == "string" ? a.value : "",
      style: Re({ maxHeight: e.column.height }),
      onClick: d
    }, null, 8, ["src", "style"])) : e.column.drill ? (f(), le(jt, {
      key: 3,
      entry: e.entry,
      column: e.column
    }, null, 8, ["entry", "column"])) : o.value ? (f(), m("button", {
      key: 4,
      type: "button",
      class: un(["dc-table__open", { "dc-truncate": i.value }]),
      title: u.value,
      onClick: d
    }, z(l.value), 11, Oi)) : (f(), m("span", Bi, z(l.value), 1));
  }
}), Rs = /* @__PURE__ */ ve(Ki, [["__scopeId", "data-v-70ba8aa2"]]), Vi = {
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
}, Ji = /* @__PURE__ */ fe({
  __name: "TableView",
  setup(e) {
    const t = Ce(), n = Mt(), s = Ii(), a = v(
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
          ])])) : T("", !0),
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
            }, z(b.label), 9, ji)) : (f(), m(Q, { key: 1 }, [
              je(z(b.label), 1)
            ], 64)),
            b.header ? (f(), m("span", Xi, [
              (f(), le(In(b.header), {
                column: b,
                entity: E(t).entity.value
              }, null, 8, ["column", "entity"]))
            ])) : T("", !0)
          ], 14, Hi))), 128))
        ])
      ]),
      w("tbody", null, [
        (f(!0), m(Q, null, ce(E(n), (b) => (f(), m("tr", {
          key: b.key,
          class: "dc-table__row",
          onClick: (C) => E(t).activate(b.row, E(Ge)(C))
        }, [
          E(t).selectable.value ? (f(), m("td", Yi, [
            ye(St, {
              row: b.row,
              selected: b.selected,
              name: b.parts.identity
            }, null, 8, ["row", "selected", "name"])
          ])) : T("", !0),
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
              ye(Xt, { entry: b }, null, 8, ["entry"])
            ])) : (f(), le(Rs, {
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
        je(z(r.value) + " has no ", 1),
        k[0] || (k[0] = w("code", null, "columns", -1)),
        k[1] || (k[1] = je(" in the schema, so there is no table to draw. ", -1))
      ])
    ]));
  }
}), Ma = /* @__PURE__ */ ve(Ji, [["__scopeId", "data-v-25251288"]]);
function ec(e) {
  const t = Ot([]), n = U(!1), s = Ot(null);
  let a = 0;
  const l = (i, u, d, _, y) => ({
    entity: i,
    rows: u.rows.map(
      (k, b) => ka(k, b, i, e.isPinned(k.id))
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
        query: { ...u, entity: $.key, expr: C, facets: Kt($), page: 1 },
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
}, wc = ["onClick"], kc = /* @__PURE__ */ fe({
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
      E(a) ? (f(), m("p", sc, " Could not load results: " + z(E(a) instanceof Error ? E(a).message : "the data source failed."), 1)) : !r.value.length && E(s) ? (f(), m("p", ac, " Running query… ")) : r.value.length ? T("", !0) : (f(), m("p", lc, z(l.value ? "Nothing matches this query" : "Nothing here yet"), 1)),
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
          w("span", ic, z(u.entity.label), 1),
          w("span", cc, z(u.count), 1),
          i[0] || (i[0] = w("span", {
            class: "dc-type__go",
            "aria-hidden": "true"
          }, "→", -1)),
          w("span", uc, "Show only " + z(u.entity.label.toLowerCase()), 1)
        ], 8, oc),
        u.rows.length ? T("", !0) : (f(), m("p", dc, z(l.value ? "No matches" : "Nothing here yet"), 1)),
        (f(!0), m(Q, null, ce(u.rows, (d) => (f(), m("div", {
          key: d.key,
          class: "dc-type__row"
        }, [
          w("button", {
            type: "button",
            class: "dc-type__open",
            onClick: (_) => E(t).activate(d.row, E(Ge)(_))
          }, [
            w("span", pc, [
              w("span", vc, z(d.parts.identity), 1),
              w("span", mc, z(d.parts.reference), 1)
            ])
          ], 8, fc),
          w("span", hc, [
            (f(!0), m(Q, null, ce(d.parts.metrics.slice(0, 1), (_) => (f(), le(jt, {
              key: _.column.key ?? _.label,
              class: "dc-type__metric",
              entry: d,
              column: _.column
            }, {
              default: He(() => [
                w("span", _c, z(_.text), 1),
                w("span", gc, z(_.label), 1)
              ]),
              _: 2
            }, 1032, ["entry", "column"]))), 128)),
            d.parts.updated ? (f(), m("span", yc, z(d.parts.updated), 1)) : T("", !0),
            ye(Xt, { entry: d }, null, 8, ["entry"])
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
          je(" " + z(u.entity.create), 1)
        ], 8, wc)) : T("", !0)
      ], 8, rc))), 128)),
      be(o.$slots, "after", {}, void 0, !0)
    ], 8, nc));
  }
}), Sa = /* @__PURE__ */ ve(kc, [["__scopeId", "data-v-eb7e0cec"]]), bc = ["data-dc-pending"], $c = {
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
}, Sc = { class: "dc-results__detail" }, Ec = /* @__PURE__ */ fe({
  __name: "ResultsArea",
  props: {
    views: {}
  },
  setup(e) {
    const t = e, n = Ce(), s = qt(), a = {
      list: zn,
      cards: ba,
      grid: $a,
      table: Ma,
      links: xa,
      preview: Ca
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
      l.value ? (f(), le(Sa, { key: 0 }, sn({ _: 2 }, [
        s["cards-before"] ? {
          name: "before",
          fn: He(() => [
            be(_.$slots, "cards-before", {}, void 0, !0)
          ]),
          key: "0"
        } : void 0,
        s["cards-after"] ? {
          name: "after",
          fn: He(() => [
            be(_.$slots, "cards-after", {}, void 0, !0)
          ]),
          key: "1"
        } : void 0
      ]), 1024)) : u.value ? (f(), m("p", $c, [
        y[1] || (y[1] = w("span", { class: "dc-results__headline" }, "Could not load results", -1)),
        w("span", xc, z(E(n).error.value instanceof Error ? E(n).error.value.message : "The data source failed."), 1)
      ])) : !i.value && E(n).pending.value ? (f(), m("p", Cc, [...y[2] || (y[2] = [
        w("span", { class: "dc-results__detail" }, "Running query…", -1)
      ])])) : i.value ? (f(), le(In(o.value), { key: 4 })) : (f(), m("div", Mc, [
        y[3] || (y[3] = w("span", { class: "dc-results__headline" }, "Nothing matches this query", -1)),
        w("span", Sc, z(E(n).summary.value), 1),
        E(n).isPristine.value ? T("", !0) : (f(), m("button", {
          key: 0,
          type: "button",
          class: "dc-results__clear",
          onClick: y[0] || (y[0] = (k) => E(n).clearFilters())
        }, z(E(n).isEverything.value ? "Clear filters" : "Search everything instead"), 1))
      ]))
    ], 8, bc));
  }
}), Ea = /* @__PURE__ */ ve(Ec, [["__scopeId", "data-v-41f54508"]]), Pc = ["data-dc-theme"], Ac = ["data-dc-width", "data-dc-align"], zc = { class: "dc-shell__panel" }, Tc = /* @__PURE__ */ fe({
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
    const s = e, a = n, l = Rt(e, "open"), r = Rt(e, "pinned"), o = Rt(e, "selected"), i = qt(), u = xt(Hs, null), d = s.route || u ? null : hl(), _ = s.route ?? u ?? d;
    et(() => d?.dispose?.());
    const y = v(() => Yl({ seed: s.schema.key })), k = v(() => s.source ?? y.value), b = cr({
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
      l.value && (l.value = !1, Bt(() => {
        R.value?.$el?.querySelector(".dc-header__toggle")?.focus();
      }));
    }
    const L = v(() => new Set(r.value));
    function D(x) {
      const O = new Set(L.value);
      O.has(x.id) ? O.delete(x.id) : O.add(x.id), r.value = [...O], a("toggle-pin", x);
    }
    const q = v(() => {
      if (s.selectable === !0) return !0;
      const x = b.entity.value;
      return !!(x?.duplicate || x?.delete);
    }), S = v(() => new Set(o.value));
    function P(x) {
      const O = new Set(S.value);
      O.has(x.id) ? O.delete(x.id) : O.add(x.id), o.value = [...O];
    }
    function ne(x) {
      const O = new Set(S.value);
      for (const G of g.rows.value)
        x ? O.add(G.id) : O.delete(G.id);
      o.value = [...O];
    }
    function re() {
      o.value.length && (o.value = []);
    }
    const pe = v(() => ({
      ids: [...o.value],
      rows: g.rows.value.filter((x) => S.value.has(x.id)),
      entity: b.entity.value
    }));
    $e(() => b.query.value.entity, re);
    function Y(x, O, G = {}) {
      const te = Jl(s.schema, b.query.value, x, G);
      G.exclude ? b.narrow(te, O?.key ?? b.query.value.entity) : b.narrow(te, O?.key ?? null, O ? void 0 : "cards"), a("drill", x, O, G);
    }
    const _e = er({
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
      togglePin: D,
      selectable: q,
      selection: pe,
      isSelected: (x) => S.value.has(x.id),
      toggleSelect: P,
      selectPage: ne,
      clearSelection: re,
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
      duplicate: () => a("duplicate", pe.value),
      delete: () => a("delete", pe.value),
      drill: Y
    }), ke = v(() => {
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
      style: Re(ke.value)
    }, [
      w("div", {
        class: "dc-shell__head",
        "data-dc-width": e.matchWidth,
        "data-dc-align": e.matchWidth === "shrink" ? e.headAlign : void 0
      }, [
        ye(_a, {
          ref_key: "headerRef",
          ref: R,
          expanded: l.value,
          "panel-id": E($),
          views: e.views,
          "pages-note": e.pagesNote,
          onToggle: O[0] || (O[0] = (G) => l.value = !l.value)
        }, sn({ _: 2 }, [
          i.actions ? {
            name: "actions",
            fn: He(() => [
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
            ye(ya, {
              "panel-id": E($),
              onClose: I
            }, sn({ _: 2 }, [
              i["panel-section"] ? {
                name: "panel-section",
                fn: He(() => [
                  be(x.$slots, "panel-section", {}, void 0, !0)
                ]),
                key: "0"
              } : void 0
            ]), 1032, ["panel-id"])
          ])
        ], 64)) : T("", !0)
      ], 8, Ac),
      ye(wa),
      be(x.$slots, "results", {
        rows: E(_e).rows.value,
        total: E(_e).total.value,
        offset: E(_e).offset.value,
        pageCount: E(_e).pageCount.value,
        query: E(_e).query.value,
        pending: E(_e).pending.value
      }, () => [
        ye(Ea, { views: e.views }, sn({ _: 2 }, [
          i["cards-before"] ? {
            name: "cards-before",
            fn: He(() => [
              be(x.$slots, "cards-before", {}, void 0, !0)
            ]),
            key: "0"
          } : void 0,
          i["cards-after"] ? {
            name: "cards-after",
            fn: He(() => [
              be(x.$slots, "cards-after", {}, void 0, !0)
            ]),
            key: "1"
          } : void 0
        ]), 1032, ["views"])
      ], !0)
    ], 12, Pc));
  }
}), Rc = /* @__PURE__ */ ve(Tc, [["__scopeId", "data-v-7b71d70f"]]), Lc = ["data-dc-muted"], Fc = {
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
}, Kc = /* @__PURE__ */ fe({
  __name: "ShellCard",
  props: {
    title: {},
    count: {},
    span: {},
    flush: { type: Boolean },
    muted: { type: Boolean }
  },
  setup(e) {
    const t = e, n = v(() => t.span === "all" ? { gridColumn: "1 / -1" } : void 0), s = qt();
    function a(d) {
      return l(d?.() ?? []);
    }
    function l(d) {
      return d.some((_) => _.type === dl ? !1 : _.type === fl ? String(_.children ?? "").trim().length > 0 : _.type === Q ? l(_.children ?? []) : !0);
    }
    const r = v(() => !!t.title || o.value || a(s.head)), o = v(() => a(s.aside)), i = v(() => a(s.default)), u = v(() => a(s.foot));
    return (d, _) => (f(), m("section", {
      class: "dc-shell-card",
      style: Re(n.value),
      "data-dc-muted": e.muted ? "true" : "false"
    }, [
      r.value ? (f(), m("header", Fc, [
        be(d.$slots, "head", {}, () => [
          w("h2", Nc, z(e.title), 1),
          e.count !== void 0 ? (f(), m("span", Dc, z(e.count), 1)) : T("", !0)
        ], !0),
        o.value ? (f(), m("span", Ic, [
          be(d.$slots, "aside", {}, void 0, !0)
        ])) : T("", !0)
      ])) : T("", !0),
      i.value ? (f(), m("div", {
        key: 1,
        class: "dc-shell-card__body",
        "data-dc-flush": e.flush ? "true" : "false"
      }, [
        be(d.$slots, "default", {}, void 0, !0)
      ], 8, Oc)) : T("", !0),
      u.value ? (f(), m("footer", Bc, [
        be(d.$slots, "foot", {}, void 0, !0)
      ])) : T("", !0)
    ], 12, Lc));
  }
}), Rd = /* @__PURE__ */ ve(Kc, [["__scopeId", "data-v-75f2ef0b"]]), Vc = ["aria-label"], qc = ["aria-checked", "data-dc-active", "tabindex", "onClick", "onKeydown"], Wc = /* @__PURE__ */ fe({
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
      }, z(i.label), 43, qc))), 128))
    ], 8, Vc));
  }
}), Uc = /* @__PURE__ */ ve(Wc, [["__scopeId", "data-v-63fb5482"]]), Ft = (e) => e.separator !== !0 && e.heading !== !0 && e.disabled !== !0, Hc = ["aria-label"], jc = ["role", "aria-label"], Xc = ["data-dc-item"], Gc = {
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
}, tu = /* @__PURE__ */ fe({
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
      () => s.items.flatMap((S, P) => Ft(S) ? [P] : [])
    ), y = v(() => {
      const S = [{ entries: [] }];
      return s.items.forEach((P, ne) => {
        P.heading ? S.push({ heading: P, entries: [] }) : S[S.length - 1]?.entries.push({ item: P, index: ne });
      }), S.filter((P) => P.entries.length > 0);
    }), k = U({ x: s.at.x, y: s.at.y });
    async function b() {
      k.value = { x: s.at.x, y: s.at.y }, await Bt();
      const S = l.value?.getBoundingClientRect();
      if (!S) return;
      const P = 8;
      let ne = s.at.x, re = s.at.y;
      if (ne + S.width > window.innerWidth - P) {
        const pe = s.at.mirrorX === void 0 ? null : s.at.mirrorX - S.width;
        ne = pe !== null && pe >= P ? pe : window.innerWidth - S.width - P;
      }
      re + S.height > window.innerHeight - P && (re = window.innerHeight - S.height - P), k.value = { x: Math.max(P, ne), y: Math.max(P, re) };
    }
    const C = v(() => ({ left: `${k.value.x}px`, top: `${k.value.y}px` }));
    function g(S) {
      o.value = S, S !== null && Bt(() => r.value[S]?.focus());
    }
    function $(S, P) {
      const ne = _.value;
      if (ne.length === 0) return null;
      if (S === null) return P === 1 ? ne[0] ?? null : ne[ne.length - 1] ?? null;
      const re = ne.indexOf(S);
      return re === -1 ? ne[0] ?? null : ne[(re + P + ne.length) % ne.length] ?? null;
    }
    function R(S, P) {
      if (!s.items[S]?.items?.length) return;
      const re = r.value[S]?.getBoundingClientRect(), pe = l.value?.getBoundingClientRect();
      !re || !pe || (u.value = { x: pe.right - 4, y: re.top - 4, mirrorX: pe.left + 4 }, i.value = S, d.value = P);
    }
    function I(S) {
      const P = i.value;
      i.value = null, u.value = null, S && P !== null && g(P);
    }
    function L(S) {
      const P = s.items[S];
      if (!(!P || !Ft(P))) {
        if (P.items?.length) {
          R(S, !0);
          return;
        }
        a("choose", P);
      }
    }
    function D(S) {
      const P = S.key;
      if (P === "Escape") {
        S.preventDefault(), S.stopPropagation(), i.value !== null ? I(!0) : a("dismiss");
        return;
      }
      if (P === "ArrowDown" || P === "ArrowUp") {
        S.preventDefault(), S.stopPropagation(), I(!1), g($(o.value, P === "ArrowDown" ? 1 : -1));
        return;
      }
      if (P === "Home" || P === "End") {
        S.preventDefault(), S.stopPropagation(), I(!1), g($(null, P === "Home" ? 1 : -1));
        return;
      }
      if (P === "ArrowRight") {
        const ne = o.value;
        ne !== null && s.items[ne]?.items?.length && (S.preventDefault(), S.stopPropagation(), R(ne, !0));
        return;
      }
      if (P === "ArrowLeft") {
        i.value !== null && (S.preventDefault(), S.stopPropagation(), I(!0));
        return;
      }
      if (P === "Enter" || P === " ") {
        const ne = o.value;
        if (ne === null) return;
        S.preventDefault(), S.stopPropagation(), L(ne);
      }
    }
    function q(S) {
      const P = s.items[S];
      !P || !Ft(P) || (i.value !== null && i.value !== S && I(!1), g(S), P.items?.length && R(S, !1));
    }
    return pl(() => {
      b(), s.autofocus && g($(null, 1));
    }), $e(() => s.at, b, { deep: !0 }), $e(() => s.items, () => void b(), { deep: !0 }), et(() => {
      i.value = null;
    }), t({ root: l }), (S, P) => {
      const ne = Us("MenuList", !0);
      return f(), m("div", {
        ref_key: "root",
        ref: l,
        class: "dc-menu",
        role: "menu",
        "aria-label": e.label,
        style: Re(C.value),
        onKeydown: D
      }, [
        (f(!0), m(Q, null, ce(y.value, (re, pe) => (f(), m("div", {
          key: `${pe}-${re.heading?.label ?? ""}`,
          class: "dc-menu__group",
          role: re.heading ? "group" : "none",
          "aria-label": re.heading?.label
        }, [
          re.heading ? (f(), m("div", {
            key: 0,
            class: "dc-menu__heading dc-truncate",
            "aria-hidden": "true",
            "data-dc-item": re.heading.id
          }, z(re.heading.label), 9, Xc)) : T("", !0),
          (f(!0), m(Q, null, ce(re.entries, ({ item: Y, index: _e }) => (f(), m(Q, {
            key: Y.id ?? `${_e}-${Y.label ?? ""}`
          }, [
            Y.separator ? (f(), m("div", Gc)) : (f(), m("button", {
              key: 1,
              ref_for: !0,
              ref: (ke) => {
                ke && (r.value[_e] = ke);
              },
              type: "button",
              class: "dc-menu__item",
              role: Y.checked === void 0 ? "menuitem" : "menuitemcheckbox",
              "aria-checked": Y.checked === void 0 ? void 0 : Y.checked,
              "aria-haspopup": Y.items?.length ? "menu" : void 0,
              "aria-expanded": Y.items?.length ? i.value === _e : void 0,
              "aria-disabled": Y.disabled ? "true" : void 0,
              disabled: Y.disabled,
              "data-dc-item": Y.id,
              tabindex: "-1",
              onClick: (ke) => L(_e),
              onMouseenter: (ke) => q(_e)
            }, [
              w("span", Qc, z(Y.checked ? "✓" : ""), 1),
              w("span", Zc, z(Y.label), 1),
              Y.shortcut ? (f(), m("span", Jc, z(Y.shortcut), 1)) : Y.items?.length ? (f(), m("span", eu, "›")) : T("", !0)
            ], 40, Yc))
          ], 64))), 128))
        ], 8, jc))), 128)),
        i.value !== null && u.value ? (f(), le(ne, {
          key: i.value,
          items: e.items[i.value]?.items ?? [],
          at: u.value,
          label: e.items[i.value]?.label,
          autofocus: d.value,
          onChoose: P[0] || (P[0] = (re) => a("choose", re)),
          onDismiss: P[1] || (P[1] = (re) => I(!0))
        }, null, 8, ["items", "at", "label", "autofocus"])) : T("", !0)
      ], 44, Hc);
    };
  }
}), Pa = /* @__PURE__ */ ve(tu, [["__scopeId", "data-v-9b1413fa"]]), nu = ["data-dc-theme", "aria-label"], su = ["aria-expanded", "aria-disabled", "disabled", "data-dc-menu", "tabindex", "onClick", "onMouseenter"], au = /* @__PURE__ */ fe({
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
      () => n.menus.flatMap((L, D) => Ft(L) ? [D] : [])
    );
    function _(L, D) {
      const q = r.value[L]?.getBoundingClientRect(), S = n.menus[L];
      !q || !S || !Ft(S) || (i.value = { x: q.left, y: q.bottom + 2, mirrorX: q.right }, o.value = L, u.value = D);
    }
    function y(L) {
      const D = o.value;
      o.value = null, i.value = null, L && D !== null && r.value[D]?.focus();
    }
    function k(L) {
      o.value === L ? y(!0) : _(L, !1);
    }
    function b(L) {
      o.value === null || o.value === L || _(L, !1);
    }
    function C(L, D) {
      const q = d.value;
      if (q.length === 0) return null;
      if (L === null) return D === 1 ? q[0] ?? null : q[q.length - 1] ?? null;
      const S = q.indexOf(L);
      return S === -1 ? q[0] ?? null : q[(S + D + q.length) % q.length] ?? null;
    }
    function g(L) {
      const D = L.key;
      if (D === "Escape") {
        if (o.value === null) return;
        L.preventDefault(), y(!0);
        return;
      }
      if (D === "ArrowDown" && o.value === null) {
        const P = $();
        if (P === null) return;
        L.preventDefault(), _(P, !0);
        return;
      }
      if (D !== "ArrowLeft" && D !== "ArrowRight") return;
      const q = o.value ?? $(), S = C(q, D === "ArrowRight" ? 1 : -1);
      S !== null && (L.preventDefault(), o.value !== null ? _(S, !0) : r.value[S]?.focus());
    }
    function $() {
      const L = r.value.findIndex((D) => D === document.activeElement);
      return L === -1 ? d.value[0] ?? null : L;
    }
    function R(L) {
      const D = L.target;
      !D || l.value?.contains(D) || y(!1);
    }
    $e(o, (L) => {
      L !== null ? window.addEventListener("pointerdown", R, !0) : window.removeEventListener("pointerdown", R, !0);
    }), et(() => window.removeEventListener("pointerdown", R, !0));
    function I(L) {
      y(!0), L.action?.(), a("choose", L);
    }
    return (L, D) => (f(), m("div", {
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
        ref: (P) => {
          P && (r.value[S] = P);
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
        onClick: (P) => k(S),
        onMouseenter: (P) => b(S)
      }, z(q.label), 41, su))), 128)),
      o.value !== null && i.value ? (f(), le(Pa, {
        key: o.value,
        items: e.menus[o.value]?.items ?? [],
        at: i.value,
        label: e.menus[o.value]?.label,
        autofocus: u.value,
        onChoose: I,
        onDismiss: D[0] || (D[0] = (q) => y(!0))
      }, null, 8, ["items", "at", "label", "autofocus"])) : T("", !0)
    ], 44, nu));
  }
}), Ld = /* @__PURE__ */ ve(au, [["__scopeId", "data-v-93dbd2e4"]]), lu = ["aria-label", "aria-expanded", "disabled"], ru = { "aria-hidden": "true" }, ou = /* @__PURE__ */ fe({
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
    }), et(() => window.removeEventListener("pointerdown", y, !0));
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
        w("span", ru, z(e.glyph), 1)
      ], 40, lu),
      l.value ? (f(), le(Pa, {
        key: 0,
        ref_key: "menu",
        ref: a,
        items: e.items,
        at: l.value,
        label: e.label,
        autofocus: r.value,
        onChoose: k,
        onDismiss: C[0] || (C[0] = (g) => u(!0))
      }, null, 8, ["items", "at", "label", "autofocus"])) : T("", !0)
    ], 64));
  }
}), es = /* @__PURE__ */ ve(ou, [["__scopeId", "data-v-48f5ada5"]]), Et = (e) => e.kind === "split", j = (e) => e.kind === "group", ee = (e) => e.kind === "float", ft = { x: 16, y: 16, w: 360, h: 260 }, pn = 28, Aa = 120, Tn = 220, za = 38, gt = 6;
function Gt(e, t) {
  let n = !1;
  const s = e.frames.map((a, l) => {
    const r = t(a.node, l);
    return r === a.node ? a : (n = !0, { ...a, node: r });
  });
  return n ? { ...e, frames: s } : e;
}
function Xe(e) {
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
const me = (e) => typeof e == "string", ts = (e) => me(e) ? Xe(e) : e, Yt = (e) => me(e) ? [e] : tt(e), Ls = (e) => e.panels.filter(me), iu = (e) => e.panels.filter((t) => !me(t)), Ne = (e, t) => e.panels.includes(t);
function Qt(e, t, n) {
  let s = !1;
  const a = e.panels.map((l) => {
    if (me(l) || !oe(l, t)) return l;
    const r = n(l);
    return r !== l && (s = !0), r;
  });
  return s ? { ...e, panels: a } : e;
}
function mn(e, t) {
  return { node: e, rect: { ...ft, ...t } };
}
function ns(e, t) {
  return t ? { kind: "float", frames: e, title: t } : { kind: "float", frames: e };
}
function ss(e, t) {
  const n = { ...ft, ...t };
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
const mt = (e) => e.fixedView === !0 || e.headless === !0 || !!e.title, Dd = (e) => ({ ...e, headless: !0 }), Id = (e) => ({ ...e, fixedView: !0 }), cu = (e) => e === "left" || e === "right" ? "row" : "column";
function tt(e) {
  return j(e) ? e.panels.flatMap(Yt) : ee(e) ? e.frames.flatMap((t) => tt(t.node)) : e.children.flatMap(tt);
}
function oe(e, t) {
  return j(e) ? e.panels.some((n) => me(n) ? n === t : oe(n, t)) : ee(e) ? e.frames.some((n) => oe(n.node, t)) : e.children.some((n) => oe(n, t));
}
const Ta = (e) => tt(e).length === 0, Rn = (e) => !j(e) && mt(e), Ln = (e) => Ta(e) && !Rn(e);
function hn(e) {
  return Et(e) ? e.children.map((t, n) => ({ node: t, index: n })) : ee(e) ? e.frames.map((t, n) => ({ node: t.node, index: n })) : e.panels.flatMap((t, n) => me(t) ? [] : [{ node: t, index: n }]);
}
const rs = (e) => hn(e).map((t) => t.node);
function ht(e) {
  const t = e.active;
  if (t) {
    const n = e.panels.findIndex(
      (s) => me(s) ? s === t : oe(s, t)
    );
    if (n >= 0) return n;
  }
  return 0;
}
function Ra(e) {
  const t = e.panels[ht(e)];
  return t !== void 0 && me(t) ? t : "";
}
function Pe(e) {
  if (me(e)) return e;
  if (j(e)) {
    const n = e.panels[ht(e)];
    return n === void 0 ? "" : Pe(n);
  }
  if (ee(e)) {
    const n = e.frames[e.frames.length - 1];
    return n ? Pe(n.node) : "";
  }
  const t = e.children[0];
  return t ? Pe(t) : "";
}
function wt(e, t) {
  if (j(e) && Ne(e, t)) return e;
  for (const n of rs(e)) {
    const s = wt(n, t);
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
function $n(e, t, n = Aa) {
  const s = (o, i) => i > 0 ? Math.max(Math.min(o, i), Math.min(n, i)) : Math.max(o, n), a = s(e.w, t.w), l = s(e.h, t.h), r = (o, i, u) => Math.min(Math.max(o, 0), Math.max(u - i, 0));
  return {
    x: Math.round(r(e.x, a, t.w)),
    y: Math.round(r(e.y, l, t.h)),
    w: Math.round(a),
    h: Math.round(l)
  };
}
function Fs(e, t, n, s, a = Aa) {
  let { x: l, y: r, w: o, h: i } = e;
  return t.includes("e") && (o = e.w + n), t.includes("w") && (o = e.w - n, l = e.x + n), t.includes("s") && (i = e.h + s), t.includes("n") && (i = e.h - s, r = e.y + s), o < a && (t.includes("w") && (l = e.x + e.w - a), o = a), i < a && (t.includes("n") && (r = e.y + e.h - a), i = a), { x: l, y: r, w: o, h: i };
}
const La = (e, t) => e.x === t.x && e.y === t.y && e.w === t.w && e.h === t.h;
function kt(e, t, n) {
  if (j(e)) return Qt(e, t, (l) => kt(l, t, n));
  if (ee(e)) {
    let l = !1;
    const r = e.frames.map((o) => {
      if (!oe(o.node, t)) return o;
      if (Me(o.node, t)) {
        const u = kt(o.node, t, n);
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
    const r = kt(l, t, n);
    return r !== l && (s = !0), r;
  });
  return s ? { ...e, children: a } : e;
}
function du(e, t, n) {
  return kt(e, t, (s) => La(s.rect, n) ? s : { ...s, rect: n });
}
const st = (e) => e.maximized === !0, Fa = (e) => (t) => {
  if (st(t) === e) return t;
  if (e) {
    const { minimized: a, ...l } = t;
    return { ...l, maximized: !0 };
  }
  const { maximized: n, ...s } = t;
  return s;
};
function fu(e, t, n = !0) {
  return kt(e, t, Fa(n));
}
function Od(e, t) {
  const n = Me(e, t);
  return n ? fu(e, t, !st(n)) : e;
}
const ut = (e) => e.minimized === !0, Na = (e) => (t) => {
  if (ut(t) === e) return t;
  if (e) {
    const { maximized: a, ...l } = t;
    return { ...l, minimized: !0 };
  }
  const { minimized: n, ...s } = t;
  return s;
};
function pu(e, t, n = !0) {
  return kt(e, t, Na(n));
}
function Bd(e, t) {
  const n = Me(e, t);
  return n ? pu(e, t, !ut(n)) : e;
}
function ct(e, t) {
  const n = t[t.length - 1];
  if (n === void 0) return null;
  const s = lt(e, t.slice(0, -1));
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
  const a = t.slice(0, -1), l = lt(e, a);
  if (!l || !ee(l)) return e;
  const r = l.frames[s];
  if (!r) return e;
  const o = n(r);
  if (o === r) return e;
  const i = [...l.frames];
  return i[s] = o, vt(e, a, { ...l, frames: i });
}
function Ns(e, t, n) {
  return os(
    e,
    t,
    (s) => La(s.rect, n) ? s : { ...s, rect: n }
  );
}
function vu(e, t, n = !0) {
  return os(e, t, Fa(n));
}
function mu(e, t, n = !0) {
  return os(e, t, Na(n));
}
function Nt(e, t) {
  const [n, ...s] = t;
  if (n === void 0) return e;
  if (ee(e)) {
    const r = e.frames[n];
    if (!r) return e;
    const o = Nt(r.node, s), i = o === r.node ? r : { ...r, node: o };
    if (n === e.frames.length - 1 && i === r) return e;
    const u = [...e.frames];
    return u.splice(n, 1), u.push(i), { ...e, frames: u };
  }
  const a = lt(e, [n]);
  if (!a) return e;
  const l = Nt(a, s);
  return l === a ? e : vt(e, [n], l);
}
function hu(e, t) {
  const n = [...t];
  let s = e;
  return t.forEach((a, l) => {
    s && (ee(s) && (n[l] = s.frames.length - 1), s = lt(s, [a]));
  }), n;
}
function rn(e, t, n, s) {
  if (j(e)) return Qt(e, n, (r) => rn(r, t, n, s));
  if (ee(e)) {
    const r = e.frames.findIndex((i) => oe(i.node, n)), o = e.frames[r];
    if (!o) return e;
    if (Me(o.node, n)) {
      const i = rn(o.node, t, n, s);
      if (i === o.node) return e;
      const u = [...e.frames];
      return u[r] = { ...o, node: i }, { ...e, frames: u };
    }
    return { ...e, frames: [...e.frames, mn(Xe(t), s)] };
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
  const a = pt(e, t);
  if (!a) return e;
  const l = rn(a, t, n, s);
  return l === a ? e : xe(l);
}
function _u(e, t, n) {
  return ee(e) ? { ...e, frames: [...e.frames, mn(Xe(t), n)] } : j(e) ? Ia(e, t) : {
    kind: "split",
    direction: e.direction,
    children: [...e.children, Xe(t)],
    sizes: [...Je(e), 1],
    ...we(e)
  };
}
function Da(e, t, n, s) {
  const a = n[0];
  if (a === void 0) return _u(e, t, s);
  const l = n.slice(1), r = (d, _) => _ === a ? Da(d, t, l, s) : pt(d, t);
  if (ee(e)) {
    const d = e.frames.flatMap((_, y) => {
      const k = r(_.node, y);
      return k ? [k === _.node ? _ : { ..._, node: k }] : [];
    });
    return { ...e, frames: d };
  }
  if (j(e)) {
    const d = ht(e), _ = [];
    e.panels.forEach((b, C) => {
      if (me(b)) {
        b !== t && _.push(b);
        return;
      }
      const g = r(b, C);
      g && _.push(g);
    });
    const k = e.active && _.some((b) => Yt(b).includes(e.active)) ? e.active : Pe(_[d] ?? _[_.length - 1]);
    return {
      kind: "group",
      panels: _,
      ...k ? { active: k } : {},
      ...we(e)
    };
  }
  const o = Je(e), i = [], u = [];
  return e.children.forEach((d, _) => {
    const y = r(d, _);
    y && (i.push(y), u.push(o[_] ?? 0));
  }), { kind: "split", direction: e.direction, children: i, sizes: u, ...we(e) };
}
function Is(e, t, n, s) {
  const a = lt(e, n);
  return !a || !Ta(a) || !oe(e, t) ? e : xe(Da(e, t, n, s));
}
function xn(e, t) {
  if (j(e)) return Qt(e, t, (a) => xn(a, t));
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
const Je = (e) => is(e.children.length, e.sizes), Ke = (e) => {
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
  const t = Je(e), n = Ke(e), s = [], a = [], l = [];
  e.children.forEach((o, i) => {
    const u = xe(o), d = t[i] ?? 0;
    if (Ln(u)) return;
    if (!n && Et(u) && u.direction === e.direction && !Ke(u) && !mt(u)) {
      const y = Je(u);
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
  return s.length === 1 && r && !mt(e) ? r : {
    kind: "split",
    direction: e.direction,
    children: s,
    sizes: is(s.length, a),
    ...we(e),
    ...l.length === s.length && l.length > 0 ? { places: l } : {}
  };
}
function gu(e) {
  if (e.panels.every(me)) return e;
  const t = Pe(e), n = Ke(e), s = [], a = [];
  e.panels.forEach((o, i) => {
    const u = n?.[i];
    if (me(o)) {
      s.push(o), u && a.push(u);
      return;
    }
    const d = xe(o);
    if (!Ln(d)) {
      if (j(d) && !mt(d) && !Ke(d)) {
        s.push(...d.panels);
        return;
      }
      s.push(d), u && a.push(u);
    }
  });
  const l = s[0];
  if (s.length === 1 && l !== void 0 && !me(l) && !mt(e))
    return l;
  if (s.length === e.panels.length && s.every((o, i) => o === e.panels[i]))
    return e;
  const r = t && s.some((o) => Yt(o).includes(t)) ? t : void 0;
  return {
    kind: "group",
    panels: s,
    ...r ? { active: r } : {},
    ...we(e),
    ...a.length === s.length && a.length > 0 ? { places: a } : {}
  };
}
function pt(e, t) {
  if (ee(e)) {
    const r = e.frames.flatMap((o) => {
      const i = pt(o.node, t);
      return i ? [i === o.node ? o : { ...o, node: i }] : [];
    });
    return r.length === 0 && !Rn(e) ? null : { ...e, frames: r };
  }
  if (j(e)) {
    if (!oe(e, t)) return e;
    const r = ht(e), o = [];
    for (const d of e.panels) {
      if (me(d)) {
        d !== t && o.push(d);
        continue;
      }
      const _ = pt(d, t);
      _ && o.push(_);
    }
    if (o.length === 0) return null;
    const u = e.active && o.some((d) => Yt(d).includes(e.active)) ? e.active : Pe(o[r] ?? o[o.length - 1]);
    return u ? { kind: "group", panels: o, active: u, ...we(e) } : { kind: "group", panels: o, ...we(e) };
  }
  const n = Je(e), s = [], a = [];
  if (e.children.forEach((r, o) => {
    const i = pt(r, t);
    i && (s.push(i), a.push(n[o] ?? 0));
  }), s.length === 0)
    return Rn(e) ? { kind: "split", direction: e.direction, children: s, sizes: [], ...we(e) } : null;
  const l = s[0];
  return s.length === 1 && l && !mt(e) ? l : xe({
    kind: "split",
    direction: e.direction,
    children: s,
    sizes: a,
    ...we(e)
  });
}
function Ia(e, t, n) {
  const s = e.panels.filter((l) => l !== t), a = n === void 0 ? s.length : Math.max(0, Math.min(n, s.length));
  return s.splice(a, 0, t), { kind: "group", panels: s, active: t, ...we(e) };
}
function Tt(e, t, n, s, a) {
  const l = (k) => Gt(
    k,
    (b) => oe(b, n) ? Tt(b, t, n, s, a) : b
  );
  if (s === "float") return e;
  const r = (k) => Qt(k, n, (b) => Tt(b, t, n, s, a));
  if (s === "center")
    return j(e) ? Ne(e, n) ? Ia(e, t, a) : r(e) : ee(e) ? l(e) : {
      ...e,
      children: e.children.map(
        (k) => oe(k, n) ? Tt(k, t, n, s, a) : k
      )
    };
  const o = cu(s), i = s === "left" || s === "top", u = (k) => ({
    kind: "split",
    direction: o,
    children: i ? [Xe(t), k] : [k, Xe(t)],
    sizes: [0.5, 0.5]
  });
  if (j(e)) return Ne(e, n) ? u(e) : r(e);
  if (ee(e)) return l(e);
  const d = Je(e), _ = e.children.findIndex(
    (k) => j(k) && Ne(k, n)
  );
  if (_ >= 0 && e.direction === o) {
    const k = (d[_] ?? 0) / 2, b = [...e.children], C = [...d];
    return b.splice(i ? _ : _ + 1, 0, Xe(t)), C.splice(_, 1, k, k), {
      kind: "split",
      direction: o,
      children: b,
      sizes: C,
      ...we(e)
    };
  }
  const y = e.children.map((k) => oe(k, n) ? j(k) && Ne(k, n) ? u(k) : Tt(k, t, n, s) : k);
  return {
    kind: "split",
    direction: e.direction,
    children: y,
    sizes: d,
    ...we(e)
  };
}
function bt(e, t) {
  if (j(e)) {
    if (Ne(e, t))
      return Ra(e) === t ? e : { ...e, active: t };
    const a = e.panels.findIndex((i) => !me(i) && oe(i, t)), l = e.panels[a];
    if (l === void 0 || me(l)) return e;
    const r = bt(l, t);
    if (r === l && e.active === t) return e;
    const o = [...e.panels];
    return o[a] = r, { ...e, panels: o, active: t };
  }
  if (!oe(e, t)) return e;
  if (ee(e)) return Gt(e, (a) => bt(a, t));
  let n = !1;
  const s = e.children.map((a) => {
    const l = bt(a, t);
    return l !== a && (n = !0), l;
  });
  return n ? { ...e, children: s } : e;
}
function Dt(e, t, n) {
  if (j(e)) {
    if (!Ne(e, t)) return Qt(e, t, (u) => Dt(u, t, n));
    const s = e.panels.indexOf(t), a = Math.max(0, Math.min(n, e.panels.length - 1));
    if (s === a) return e;
    const l = [...e.panels];
    l.splice(s, 1), l.splice(a, 0, t);
    const r = Ke(e), o = r ? [...r] : void 0;
    o && o.splice(a, 0, ...o.splice(s, 1));
    const i = Pe(e);
    return {
      kind: "group",
      panels: l,
      ...i ? { active: i } : {},
      ...we(e),
      ...o ? { places: o } : {}
    };
  }
  return oe(e, t) ? ee(e) ? Gt(e, (s) => Dt(s, t, n)) : { ...e, children: e.children.map((s) => Dt(s, t, n)) } : e;
}
function on(e, t, n) {
  if (t === n) return e;
  if (j(e)) {
    if (!oe(e, t) && !oe(e, n)) return e;
    const s = (l) => l === t ? n : l === n ? t : l, a = e.panels.map((l) => me(l) ? s(l) : on(l, t, n));
    return { ...e, panels: a, ...e.active ? { active: s(e.active) } : {} };
  }
  return ee(e) ? Gt(e, (s) => on(s, t, n)) : { ...e, children: e.children.map((s) => on(s, t, n)) };
}
function tn(e, t, n, s, a) {
  if (s === "float" || !oe(e, t) || !oe(e, n)) return e;
  const l = wt(e, t);
  if (s === "center" && l && Ne(l, n)) {
    if (a === void 0) return e;
    const o = l.panels.indexOf(t), i = a > o ? a - 1 : a;
    return i === o ? e : bt(Dt(e, t, i), t);
  }
  if (t === n) return e;
  const r = pt(e, t);
  return r ? xe(Tt(r, t, n, s, a)) : e;
}
function Oa(e, t, n) {
  if (j(e)) {
    const a = e.panels[t];
    if (a === void 0 || me(a)) return e;
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
function Zt(e, t, n) {
  const s = hn(e);
  if (!j(e) && s.some(({ node: a }) => j(a) && Ne(a, t))) {
    const a = n(e);
    return a === e ? null : a;
  }
  for (const { node: a, index: l } of s) {
    if (!oe(a, t)) continue;
    const r = Zt(a, t, n);
    return r ? Oa(e, l, r) : null;
  }
  return null;
}
function Kd(e, t, n) {
  const s = Zt(
    e,
    t,
    (a) => Et(a) && a.direction !== n ? { ...a, direction: n } : a
  );
  return s ? xe(s) : e;
}
function Ba(e) {
  return ee(e) ? [e] : Ke(e) || mt(e) ? [e] : j(e) ? [...e.panels] : e.children.flatMap(Ba);
}
function Ka(e, t) {
  if (j(e)) return e;
  const n = rs(e).map(Ba), s = n.flat(), a = t && s.some((r) => Yt(r).includes(t)) ? t : void 0, l = yu(e, n);
  return xe({
    kind: "group",
    panels: s,
    ...a ? { active: a } : {},
    ...we(e),
    ...l ? { places: l } : {}
  });
}
function yu(e, t) {
  const n = ee(e) ? e.frames.map(({ node: s, ...a }) => a) : Ke(e);
  if (n)
    return t.every((s) => s.length === 1) ? n : void 0;
}
function wu(e, t) {
  const n = Zt(e, t, (s) => Ka(s, t));
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
    return l ? Oa(e, a, l) : null;
  }
  return null;
}
function Os(e, t, n) {
  const s = cs(e, t, (a) => {
    if (a.panels.length < 2) return a;
    const l = Ke(a);
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
    return Gt(e, (o) => Nn(o, t));
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
  const s = wt(e, t);
  if (!s || s.panels.length < 2) return e;
  if (Me(e, t)?.node === s) {
    const r = Nn(e, t);
    return r === e ? e : xe(r);
  }
  const l = cs(e, t, (r) => ({
    ...ns(Va(r.panels.map(ts), Ke(r), n)),
    ...we(r)
  }));
  return l ? xe(l) : e;
}
function Va(e, t, n) {
  return t ? e.map((s, a) => ({ ...t[a], node: s })) : ss(e, n).frames;
}
function qa(e, t) {
  return { ...ns(Va(e.children, Ke(e), t)), ...we(e) };
}
function Vd(e, t, n) {
  const s = Zt(
    e,
    t,
    (a) => ee(a) ? a : qa(a, n)
  );
  return s ? xe(s) : j(e) && Ne(e, t) ? ss([e], n) : e;
}
function bu(e, t) {
  const n = (a) => t === "column" ? a.rect.y : a.rect.x, s = (a) => t === "column" ? a.rect.x : a.rect.y;
  return [...e].sort((a, l) => n(a) - n(l) || s(a) - s(l));
}
function Wa(e, t) {
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
  const s = Zt(
    e,
    t,
    (a) => ee(a) ? Wa(a, n) : a
  );
  return s ? xe(s) : e;
}
function Ua(e) {
  if (ee(e)) return null;
  const t = j(e) ? e.panels.length === 1 ? e.panels[0] : void 0 : e.children.length === 1 ? e.children[0] : void 0;
  return t === void 0 || me(t) || j(t) && t.panels.length === 1 && me(t.panels[0]) ? null : t;
}
const $u = (e) => {
  const { title: t, fixedView: n, headless: s, ...a } = e;
  return a;
};
function xu(e, t) {
  const n = Ua(e);
  return n ? t === "inner" ? n : { ...$u(n), ...we(e) } : e;
}
function Ct(e) {
  return e.title ? e.title : j(e) ? "" : ee(e) ? "Desktop" : e.direction === "row" ? "Row" : "Column";
}
function It(e, t) {
  if (j(e)) {
    const s = e.panels[ht(e)];
    return s === void 0 ? "" : me(s) ? t(s) ?? s : Ct(s) || It(s, t);
  }
  if (e.title) return e.title;
  if (ee(e)) {
    const s = e.frames[e.frames.length - 1];
    return s ? s.title ?? It(s.node, t) : "";
  }
  const n = e.children[0];
  return n ? It(n, t) : "";
}
function lt(e, t) {
  let n = e;
  for (const s of t) {
    if (!n) return null;
    if (Et(n)) n = n.children[s];
    else if (ee(n)) n = n.frames[s]?.node;
    else {
      const a = n.panels[s];
      n = a === void 0 || me(a) ? void 0 : a;
    }
  }
  return n ?? null;
}
function vt(e, t, n) {
  if (t.length === 0) return n;
  const [s, ...a] = t;
  if (s === void 0) return e;
  if (ee(e)) {
    const i = e.frames[s];
    if (!i) return e;
    const u = vt(i.node, a, n);
    if (u === i.node) return e;
    const d = [...e.frames];
    return d[s] = { ...i, node: u }, { ...e, frames: d };
  }
  if (j(e)) {
    const i = e.panels[s];
    if (i === void 0 || me(i)) return e;
    const u = vt(i, a, n);
    if (u === i) return e;
    const d = [...e.panels];
    return d[s] = u, { ...e, panels: d };
  }
  const l = e.children[s];
  if (!l) return e;
  const r = vt(l, a, n);
  if (r === l) return e;
  const o = [...e.children];
  return o[s] = r, { ...e, children: o };
}
function cn(e, t, n) {
  if (t.length === 0)
    return Et(e) ? { ...e, sizes: is(e.children.length, n) } : e;
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
    if (o === void 0 || me(o)) return e;
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
  return t !== void 0 && !me(t) ? e : { ...ls([Cu(e)]), ...we(e) };
}
const Cu = (e) => {
  if (!e.title) return e;
  const { title: t, ...n } = e;
  return n;
};
function Ks(e) {
  return e.length === 0 ? null : ls(e.map(Xe));
}
function Mu(e, t) {
  if (!e) return Ks(t);
  const n = new Set(t), s = /* @__PURE__ */ new Set(), a = /* @__PURE__ */ new Set();
  for (const i of tt(e))
    !n.has(i) || s.has(i) ? a.add(i) : s.add(i);
  let l = e;
  for (const i of a)
    l = l ? pt(l, i) : null;
  const r = new Set(l ? tt(l) : []), o = t.filter((i) => !r.has(i));
  if (o.length === 0) return l ? vn(xe(l)) : null;
  if (!l) return Ks(o);
  if (ee(l)) {
    const i = l.frames.length;
    return {
      ...l,
      frames: [
        ...l.frames,
        ...o.map(
          (u, d) => mn(Xe(u), {
            x: ft.x + (i + d) * pn,
            y: ft.y + (i + d) * pn
          })
        )
      ]
    };
  }
  return vn(xe(ls([l, ...o.map(Xe)])));
}
const us = Symbol("dc.windowContext");
function Su(e) {
  return Dn(us, e), e;
}
function ds() {
  const e = xt(us, null);
  if (!e)
    throw new Error(
      "[header-content-layout] No window context found. Render this component inside <WindowFrame>."
    );
  return e;
}
const Eu = ["data-dc-glyph"], Pu = { class: "dc-glyph__line" }, Au = ["d"], zu = {
  key: 0,
  class: "dc-glyph__aqua"
}, Tu = ["d"], Ru = /* @__PURE__ */ fe({
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
      ])) : T("", !0)
    ], 8, Eu));
  }
}), $t = /* @__PURE__ */ ve(Ru, [["__scopeId", "data-v-4d2872c0"]]), Lu = ["data-dc-order", "data-dc-path", "data-dc-maximized", "data-dc-minimized", "data-dc-dragging"], Fu = ["data-dc-movable"], Nu = { class: "dc-float__title dc-truncate" }, Du = {
  key: 1,
  class: "dc-float__controls dc-controls"
}, Iu = ["aria-label", "aria-pressed", "data-dc-minimize"], Ou = ["aria-label", "aria-pressed", "data-dc-maximize"], Bu = ["aria-label", "data-dc-close"], Ku = { class: "dc-float__content" }, Vu = ["data-dc-handle", "onPointerdown"], qu = /* @__PURE__ */ fe({
  __name: "WindowFloat",
  props: {
    frame: {},
    path: {},
    order: {},
    place: {}
  },
  setup(e) {
    const t = e, n = ds(), s = v(() => Pe(t.frame.node)), a = v(() => n.panelFor(s.value)?.fixed === !0), l = v(() => st(t.frame)), r = v(() => ut(t.frame)), o = v(() => l.value || r.value), i = v(() => n.resizable.value && !a.value && !o.value), u = v(() => n.movable.value && !a.value && !o.value), d = v(() => {
      const D = tt(t.frame.node);
      return D.length === 1 ? D[0] ?? null : null;
    }), _ = v(() => d.value !== null && n.closable(d.value)), y = v(() => t.frame.node.headless === !0), k = v(
      () => !y.value && (!j(t.frame.node) || r.value)
    ), b = v(
      () => t.frame.title || Ct(t.frame.node) || It(t.frame.node, (D) => n.panelFor(D)?.title)
    ), C = v(() => n.spaceMenu(t.path));
    function g(D) {
      D.target?.closest("button, a, input, select, textarea, label") || n.beginFrameDragAt(t.path, D, "move");
    }
    function $(D) {
      D.target?.closest("button, a, input, select, textarea, label") || (r.value ? n.toggleMinimizeAt(t.path) : n.toggleMaximizeAt(t.path));
    }
    const R = v(() => {
      const D = n.framing.value;
      return D !== null && oe(t.frame.node, D);
    }), I = v(() => ({
      // Neither maximizing nor rolling up overwrites the rect: it is where the
      // window goes back to, and both are a way of not being there for a while.
      ...l.value ? { inset: "0" } : r.value && t.place ? {
        left: `${t.place.x}px`,
        bottom: `${t.place.bottom}px`,
        width: `${Tn}px`,
        height: `${za}px`
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
    return (D, q) => (f(), m("div", {
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
        w("span", Nu, z(b.value), 1),
        C.value.length ? (f(), le(es, {
          key: 0,
          items: C.value,
          label: `${b.value} menu`
        }, null, 8, ["items", "label"])) : T("", !0),
        !a.value || r.value && _.value && d.value ? (f(), m("div", Du, [
          a.value ? T("", !0) : (f(), m("button", {
            key: 0,
            type: "button",
            class: "dc-float__button dc-control",
            "aria-label": `${r.value ? "Unroll" : "Minimize"} ${b.value}`,
            "aria-pressed": r.value,
            "data-dc-minimize": s.value,
            onClick: q[0] || (q[0] = (S) => E(n).toggleMinimizeAt(e.path))
          }, [
            ye($t, {
              kind: r.value ? "unroll" : "minimize"
            }, null, 8, ["kind"])
          ], 8, Iu)),
          a.value ? T("", !0) : (f(), m("button", {
            key: 1,
            type: "button",
            class: "dc-float__button dc-control",
            "aria-label": `${l.value ? "Restore" : "Maximize"} ${b.value}`,
            "aria-pressed": l.value,
            "data-dc-maximize": s.value,
            onClick: q[1] || (q[1] = (S) => E(n).toggleMaximizeAt(e.path))
          }, [
            ye($t, {
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
            ye($t, { kind: "close" })
          ], 8, Bu)) : T("", !0)
        ])) : T("", !0)
      ], 40, Fu)) : T("", !0),
      w("div", Ku, [
        be(D.$slots, "default", {}, void 0, !0)
      ]),
      (f(!0), m(Q, null, ce(i.value ? L : [], (S) => (f(), m("span", {
        key: S,
        class: "dc-float__grip",
        "data-dc-handle": S,
        "aria-hidden": "true",
        onPointerdown: Fe((P) => E(n).beginFrameDragAt(e.path, P, S), ["stop"])
      }, null, 40, Vu))), 128))
    ], 44, Lu));
  }
}), Wu = /* @__PURE__ */ ve(qu, [["__scopeId", "data-v-f035684c"]]), fs = Symbol("dc.paneContext");
function Uu(e) {
  return Dn(fs, e), e;
}
function Wd() {
  return xt(fs, null);
}
function Ud(e) {
  const t = xt(us, null), n = xt(fs, null);
  if (!t || !n) return () => {
  };
  const s = t.registerMenu(
    () => n.panel.value,
    () => zt(e)
  );
  return vl() && qs(s), s;
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
}, rd = ["aria-label", "data-dc-minimize"], od = ["aria-label", "aria-pressed", "data-dc-maximize"], id = ["aria-label", "data-dc-close"], cd = ["id", "role", "aria-labelledby"], ud = ["id", "role", "aria-labelledby"], dd = ["data-dc-edge"], fd = /* @__PURE__ */ fe({
  __name: "WindowPane",
  props: {
    group: {},
    path: {}
  },
  setup(e) {
    const t = e, n = ds(), s = Ws() ?? "dc-pane", a = v(
      () => t.group.panels.flatMap((B, H) => {
        if (!me(B)) {
          const Te = Ct(B) || It(B, (Se) => n.panelFor(Se)?.title);
          return [{ kind: "space", index: H, id: `space-${H}`, title: Te, node: B }];
        }
        const se = n.panelFor(B);
        return se ? [{ kind: "panel", index: H, id: B, title: se.title, panel: se }] : [];
      })
    ), l = v(() => a.value.length > 1), r = v(() => {
      const B = ht(t.group);
      return a.value.find((H) => H.index === B) ?? a.value[0] ?? null;
    }), o = v(() => r.value?.kind === "space" ? r.value.node : null), i = v(() => o.value ? "" : Ra(t.group)), u = v(() => o.value ? null : n.panelFor(i.value)), d = v(() => r.value?.title ?? ""), _ = v(() => n.spaceNames.value ? t.group.title ?? "" : ""), y = v(() => [...t.path, r.value?.index ?? 0]), k = v(() => i.value || Ls(t.group)[0] || ""), b = v(() => n.viewFor(i.value)), C = v(() => t.group.headless === !0), g = v(() => n.focused.value === i.value), $ = v(() => n.dragging.value === i.value), R = v(() => n.moving.value === i.value), I = v(() => n.frameOf(k.value) !== null), L = v(() => n.panelFor(k.value)?.fixed === !0), D = v(
      () => !o.value && (n.canMove(i.value) || I.value && n.movable.value && !L.value)
    ), q = v(
      () => o.value ? n.spaceMenu(y.value) : n.menuFor(i.value)
    ), S = (B) => n.closable(B);
    Uu({ panel: i });
    const P = v(() => n.maximized(k.value)), ne = v(
      () => I.value && !L.value || !l.value && !!u.value && S(u.value.id)
    ), re = (B) => `${s}-tab-${B}`, pe = v(() => `${s}-body`), Y = v(() => {
      const B = n.dropTarget.value;
      return !B || !Ne(t.group, B.panel) || B.edge === "float" ? null : B;
    }), _e = v(() => Y.value?.index === void 0 ? Y.value?.edge ?? null : null), ke = v(() => Y.value?.index ?? null), x = () => u.value ? n.renderContent(u.value, b.value, g.value) ?? null : null, O = () => u.value ? n.renderActions(u.value, b.value, g.value) ?? null : null;
    let G = null;
    function te(B) {
      const H = G !== null && Math.hypot(B.clientX - G.x, B.clientY - G.y) >= 4;
      return G = null, H;
    }
    const he = (B) => B.kind === "panel" ? B.id : Pe(B.node);
    function Ae(B, H) {
      H.kind !== "space" && (n.focus(H.id), G = { x: B.clientX, y: B.clientY }, n.beginDrag(H.id, B));
    }
    function Ve(B, H) {
      if (te(B)) return;
      const se = he(H);
      se && n.selectPanel(se);
    }
    function qe(B) {
      i.value && n.focus(i.value), !B.target?.closest(".dc-tab, button, a, input, select, textarea, label") && (I.value ? n.beginFrameDrag(k.value, B, "move") : n.beginDrag(i.value, B));
    }
    function We(B) {
      G = { x: B.clientX, y: B.clientY }, n.beginDrag(i.value, B);
    }
    function Ie(B) {
      te(B) || n.toggleMoveMode(i.value);
    }
    const Oe = {
      ArrowLeft: "left",
      ArrowRight: "right",
      ArrowUp: "up",
      ArrowDown: "down"
    };
    function F(B) {
      if (!R.value) return;
      if (B.key === "Escape") {
        B.preventDefault(), n.toggleMoveMode(i.value);
        return;
      }
      const H = Oe[B.key];
      H && (B.preventDefault(), I.value ? n.nudgeFrame(i.value, H, B.shiftKey) : n.nudge(i.value, H, B.shiftKey));
    }
    function K(B) {
      !I.value || B.target?.closest(".dc-tab, button, a, input, select, textarea, label") || n.toggleMaximize(k.value);
    }
    function W(B, H) {
      B.stopPropagation(), G = null, n.close(H);
    }
    function ze(B, H) {
      const se = a.value.length;
      let Te = null;
      if (B.key === "ArrowRight" ? Te = (H + 1) % se : B.key === "ArrowLeft" ? Te = (H - 1 + se) % se : B.key === "Home" ? Te = 0 : B.key === "End" && (Te = se - 1), Te === null) return;
      B.preventDefault();
      const Se = a.value[Te];
      if (!Se) return;
      const Pt = he(Se);
      Pt && n.selectPanel(Pt);
    }
    return (B, H) => r.value ? (f(), m("section", {
      key: 0,
      class: "dc-pane",
      "data-dc-panel": i.value || void 0,
      "data-dc-panels": E(Ls)(e.group).join(" ") || void 0,
      "data-dc-tabbed": l.value ? "true" : "false",
      "data-dc-floating": I.value ? "true" : "false",
      "data-dc-maximized": P.value ? "true" : "false",
      "data-dc-headless": C.value ? "true" : "false",
      "data-dc-active": g.value ? "true" : "false",
      "data-dc-dragging": $.value ? "true" : "false",
      "aria-label": d.value,
      onFocusin: H[7] || (H[7] = (se) => i.value && E(n).focus(i.value))
    }, [
      C.value ? T("", !0) : (f(), m("header", {
        key: 0,
        class: "dc-pane__head",
        "data-dc-movable": D.value ? "true" : "false",
        onPointerdown: qe,
        onDblclick: K
      }, [
        D.value ? (f(), m("button", {
          key: 0,
          type: "button",
          class: "dc-pane__grip",
          "aria-label": `Move ${d.value}`,
          "aria-pressed": R.value,
          onPointerdown: We,
          onClick: Ie,
          onKeydown: F
        }, [...H[8] || (H[8] = [
          w("span", { "aria-hidden": "true" }, "⠿", -1)
        ])], 40, Xu)) : T("", !0),
        _.value ? (f(), m("span", {
          key: 1,
          class: "dc-pane__name",
          "data-dc-space-name": _.value
        }, [
          w("span", Yu, z(_.value), 1)
        ], 8, Gu)) : T("", !0),
        w("div", {
          class: "dc-pane__tabs",
          role: "tablist",
          "aria-label": `${d.value} panels`
        }, [
          (f(!0), m(Q, null, ce(a.value, (se, Te) => (f(), m(Q, {
            key: se.id
          }, [
            ke.value === Te ? (f(), m("span", Zu)) : T("", !0),
            w("button", {
              id: re(se.id),
              type: "button",
              role: "tab",
              class: "dc-tab",
              "data-dc-panel": se.kind === "panel" ? se.id : void 0,
              "data-dc-space": se.kind === "space" ? se.title : void 0,
              "aria-selected": se.index === r.value.index,
              "aria-controls": pe.value,
              tabindex: se.index === r.value.index ? 0 : -1,
              onPointerdown: (Se) => Ae(Se, se),
              onClick: (Se) => Ve(Se, se),
              onKeydown: (Se) => ze(Se, Te)
            }, [
              w("span", ed, z(se.title), 1),
              se.kind === "panel" && se.panel.subtitle ? (f(), m("span", td, z(se.panel.subtitle), 1)) : T("", !0),
              l.value && se.kind === "panel" && S(se.id) ? (f(), m("span", {
                key: 1,
                class: "dc-tab__close",
                role: "button",
                tabindex: "-1",
                "aria-label": `Close ${se.title}`,
                "data-dc-close": se.id,
                onPointerdown: H[0] || (H[0] = Fe(() => {
                }, ["stop"])),
                onClick: (Se) => W(Se, se.id)
              }, [...H[9] || (H[9] = [
                w("span", { "aria-hidden": "true" }, "×", -1)
              ])], 40, nd)) : T("", !0)
            ], 40, Ju)
          ], 64))), 128)),
          ke.value === a.value.length ? (f(), m("span", sd)) : T("", !0)
        ], 8, Qu),
        w("div", ad, [
          ye(O),
          q.value.length ? (f(), le(es, {
            key: 0,
            items: q.value,
            label: `${d.value} menu`
          }, null, 8, ["items", "label"])) : T("", !0)
        ]),
        ne.value ? (f(), m("div", ld, [
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
            ye($t, { kind: "minimize" })
          ], 40, rd)) : T("", !0),
          I.value && !L.value ? (f(), m("button", {
            key: 1,
            type: "button",
            class: "dc-pane__button dc-control",
            "aria-label": `${P.value ? "Restore" : "Maximize"} ${d.value}`,
            "aria-pressed": P.value,
            "data-dc-maximize": k.value,
            onPointerdown: H[3] || (H[3] = Fe(() => {
            }, ["stop"])),
            onClick: H[4] || (H[4] = (se) => E(n).toggleMaximize(k.value))
          }, [
            ye($t, {
              kind: P.value ? "restore" : "maximize"
            }, null, 8, ["kind"])
          ], 40, od)) : T("", !0),
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
            ye($t, { kind: "close" })
          ], 40, id)) : T("", !0)
        ])) : T("", !0)
      ], 40, ju)),
      o.value ? (f(), m("div", {
        key: 1,
        id: pe.value,
        class: "dc-pane__space",
        role: C.value ? void 0 : "tabpanel",
        "aria-labelledby": C.value ? void 0 : re(r.value.id)
      }, [
        be(B.$slots, "space", {
          node: o.value,
          path: y.value
        }, void 0, !0)
      ], 8, cd)) : (f(), m("div", {
        key: 2,
        id: pe.value,
        class: "dc-pane__body",
        role: C.value ? void 0 : "tabpanel",
        "aria-labelledby": C.value ? void 0 : re(i.value)
      }, [
        ye(x)
      ], 8, ud)),
      _e.value ? (f(), m("div", {
        key: 3,
        class: "dc-pane__drop",
        "data-dc-edge": _e.value,
        "aria-hidden": "true"
      }, null, 8, dd)) : T("", !0)
    ], 40, Hu)) : T("", !0);
  }
}), Ha = /* @__PURE__ */ ve(fd, [["__scopeId", "data-v-44fd2b2d"]]), pd = ["data-dc-space", "data-dc-path", "aria-label"], vd = {
  key: 0,
  class: "dc-space__head"
}, md = { class: "dc-space__title dc-truncate" }, hd = ["data-dc-direction"], _d = {
  key: 0,
  class: "dc-space__drop",
  "aria-hidden": "true"
}, gd = ["aria-orientation", "aria-label", "aria-valuenow", "aria-disabled", "tabindex", "onPointerdown", "onKeydown"], yd = /* @__PURE__ */ fe({
  __name: "WindowNode",
  props: {
    node: {},
    path: {},
    framed: { type: Boolean }
  },
  setup(e) {
    const t = e, n = ds(), s = U(null), a = v(() => j(t.node) ? t.node : null), l = v(() => Et(t.node) ? t.node : null), r = v(() => ee(t.node) ? t.node : null), o = v(
      () => l.value ? l.value.children : r.value?.frames.map((x) => x.node) ?? []
    ), i = v(() => l.value ? Je(l.value) : []), u = v(
      () => (r.value?.frames ?? []).map((x, O) => ({
        held: x,
        /** Place in the stack, counted from the back — what `z-index` follows. */
        order: O,
        key: S(x.node),
        path: [...t.path, O]
      })).sort((x, O) => x.key < O.key ? -1 : x.key > O.key ? 1 : 0)
    ), d = v(() => Ct(t.node)), _ = v(() => n.spaceMenu(t.path)), y = v(() => t.node.headless === !0), k = v(() => r.value ? "desktop" : l.value?.direction ?? ""), b = U(null), C = U(0);
    let g = null;
    $e(
      b,
      (x) => {
        g?.disconnect(), g = null, !(!x || typeof ResizeObserver > "u") && (C.value = x.clientWidth, g = new ResizeObserver(([O]) => {
          C.value = O?.contentRect.width ?? 0;
        }), g.observe(x));
      },
      { immediate: !0 }
    ), et(() => g?.disconnect());
    const $ = v(() => {
      const x = Math.max(
        1,
        Math.floor((C.value + gt) / (Tn + gt))
      ), O = /* @__PURE__ */ new Map();
      let G = 0;
      for (const te of u.value)
        te.held.minimized === !0 && (O.set(te.key, {
          x: gt + G % x * (Tn + gt),
          bottom: gt + Math.floor(G / x) * (za + gt)
        }), G += 1);
      return O;
    }), R = (x) => !!x && x.join("/") === t.path.join("/"), I = v(() => {
      const x = n.dropTarget.value, O = r.value;
      if (!O || !x?.rect || x.edge !== "float") return null;
      if (x.space) return R(x.space) ? x.rect : null;
      const G = Me(O, x.panel);
      return G && O.frames.includes(G) ? x.rect : null;
    }), L = v(() => {
      const x = n.dropTarget.value;
      return !!x && !x.rect && R(x.space);
    }), D = v(() => l.value?.direction === "row"), q = v(() => o.value.map((x, O) => [...t.path, O])), S = (x) => [...tt(x)].sort().join("/"), P = (x) => {
      const O = tt(x)[0];
      return (O ? n.panelFor(O)?.title : null) ?? O ?? "panel";
    }, ne = (x) => {
      const O = o.value[x], G = o.value[x + 1];
      return !O || !G ? "Resize panels" : `Resize ${P(O)} and ${P(G)}`;
    }, re = (x) => {
      const O = i.value[x] ?? 0, G = i.value[x + 1] ?? 0, te = O + G;
      return te > 0 ? Math.round(O / te * 100) : 50;
    };
    function pe() {
      const x = s.value, O = x ? D.value ? x.clientWidth : x.clientHeight : 0;
      return O <= 0 ? 0.05 : Math.min(n.minPanelSize.value / O, 0.4);
    }
    let Y = null;
    function _e(x, O) {
      const G = l.value, te = s.value;
      if (!n.resizable.value || !G || !te || x.button !== 0) return;
      const he = D.value ? te.clientWidth : te.clientHeight;
      if (he <= 0) return;
      const Ae = D.value ? x.clientX : x.clientY, Ve = Je(G), qe = Math.min(n.minPanelSize.value / he, 0.4);
      x.preventDefault();
      const We = (F) => {
        const K = ((D.value ? F.clientX : F.clientY) - Ae) / he;
        n.setSizes(t.path, Bs(Ve, O, K, qe));
      }, Ie = () => Y?.(), Oe = (F) => {
        F.key === "Escape" && (n.setSizes(t.path, Ve), Y?.());
      };
      Y = () => {
        window.removeEventListener("pointermove", We), window.removeEventListener("pointerup", Ie), window.removeEventListener("pointercancel", Ie), window.removeEventListener("keydown", Oe), Y = null;
      }, window.addEventListener("pointermove", We), window.addEventListener("pointerup", Ie), window.addEventListener("pointercancel", Ie), window.addEventListener("keydown", Oe);
    }
    et(() => Y?.());
    function ke(x, O) {
      const G = l.value;
      if (!n.resizable.value || !G) return;
      const te = D.value ? "ArrowRight" : "ArrowDown", he = D.value ? "ArrowLeft" : "ArrowUp", Ae = x.shiftKey ? 0.1 : 0.02;
      if (x.key !== te && x.key !== he) return;
      const Ve = x.key === te ? Ae : -Ae;
      x.preventDefault(), n.setSizes(t.path, Bs(Je(G), O, Ve, pe()));
    }
    return (x, O) => {
      const G = Us("WindowNode", !0);
      return a.value ? (f(), le(Ha, {
        key: 0,
        group: a.value,
        path: e.path
      }, {
        space: He(({ node: te, path: he }) => [
          ye(G, {
            node: te,
            path: he,
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
          w("span", md, z(d.value), 1),
          _.value.length ? (f(), le(es, {
            key: 0,
            items: _.value,
            label: `${d.value} menu`
          }, null, 8, ["items", "label"])) : T("", !0)
        ])) : T("", !0),
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
          }, null, 4)) : T("", !0),
          (f(!0), m(Q, null, ce(u.value, (te) => (f(), le(Wu, {
            key: te.key,
            frame: te.held,
            path: te.path,
            order: te.order,
            place: $.value.get(te.key) ?? null
          }, {
            default: He(() => [
              ye(G, {
                node: te.held.node,
                path: te.path,
                framed: te.held.node.kind !== "group"
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
          L.value ? (f(), m("div", _d)) : T("", !0),
          (f(!0), m(Q, null, ce(o.value, (te, he) => (f(), m(Q, {
            key: S(te)
          }, [
            w("div", {
              class: "dc-window__cell",
              style: Re({ flexGrow: i.value[he] ?? 1 })
            }, [
              ye(G, {
                node: te,
                path: q.value[he] ?? []
              }, null, 8, ["node", "path"])
            ], 4),
            he < o.value.length - 1 ? (f(), m("div", {
              key: 0,
              class: "dc-window__gutter",
              role: "separator",
              "aria-orientation": D.value ? "vertical" : "horizontal",
              "aria-label": ne(he),
              "aria-valuenow": re(he),
              "aria-valuemin": "0",
              "aria-valuemax": "100",
              "aria-disabled": E(n).resizable.value ? void 0 : "true",
              tabindex: E(n).resizable.value ? 0 : -1,
              onPointerdown: (Ae) => _e(Ae, he),
              onKeydown: (Ae) => ke(Ae, he)
            }, null, 40, gd)) : T("", !0)
          ], 64))), 128))
        ], 8, hd)) : T("", !0)
      ], 8, pd));
    };
  }
}), wd = /* @__PURE__ */ ve(yd, [["__scopeId", "data-v-fb5b403f"]]), kd = ["data-dc-theme", "data-dc-dragging", "data-dc-docking"], bd = {
  key: 1,
  class: "dc-window__empty"
}, $d = {
  class: "dc-window__live",
  "aria-live": "polite",
  role: "status"
}, nn = 16, xd = /* @__PURE__ */ fe({
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
    const s = e, a = n, l = Rt(e, "layout"), r = Rt(e, "views"), o = qt(), i = v(() => new Map(s.panels.map((c) => [c.id, c]))), u = v(() => s.panels.map((c) => c.id)), d = v(() => Mu(l.value, u.value)), _ = U(null), y = U(null), k = U(null), b = U(!0), C = U(null), g = U(null), $ = U(null), R = U(""), I = U(null);
    function L() {
      const c = I.value;
      return c ? [...c.querySelectorAll(".dc-pane[data-dc-panels]")].filter((h) => h.closest(".dc-window") === c).map((h) => ({ panels: (h.dataset.dcPanels ?? "").split(" "), element: h })) : [];
    }
    function D(c) {
      const p = [];
      let h = c.closest(".dc-float");
      for (; h; )
        p.unshift(Number(h.dataset.dcOrder ?? 0)), h = h.parentElement?.closest(".dc-float") ?? null;
      return p;
    }
    function q() {
      return L().map((c) => ({ pane: c, order: D(c.element) })).sort((c, p) => {
        const h = Math.max(c.order.length, p.order.length);
        for (let M = 0; M < h; M += 1) {
          const A = (c.order[M] ?? -1) - (p.order[M] ?? -1);
          if (A !== 0) return A;
        }
        return 0;
      }).map((c) => c.pane);
    }
    const S = (c) => L().find((p) => p.panels.includes(c)) ?? null;
    function P(c) {
      const p = i.value.get(c);
      if (!p) return "";
      const h = r.value[c];
      return h && p.views?.some((M) => M.key === h) ? h : p.defaultView ?? p.views?.[0]?.key ?? "";
    }
    function ne(c, p) {
      r.value = { ...r.value, [c]: p }, a("view-change", { panel: c, view: p });
    }
    const re = v(
      () => s.panels.filter((c) => c.fixed !== !0).length
    );
    function pe(c) {
      return !s.movable || re.value < 1 || s.panels.length < 2 ? !1 : i.value.get(c)?.fixed !== !0;
    }
    function Y(c, p) {
      const h = d.value;
      !c || !h || c === h || (l.value = c, p && a("panel-move", p));
    }
    function _e(c, p, h) {
      if (c.width <= 0 || c.height <= 0) return "center";
      const M = (p - c.left) / c.width, A = (h - c.top) / c.height, N = 0.3;
      return M > N && M < 1 - N && A > N && A < 1 - N ? "center" : [
        { edge: "left", distance: M },
        { edge: "right", distance: 1 - M },
        { edge: "top", distance: A },
        { edge: "bottom", distance: 1 - A }
      ].reduce(
        (ae, V) => V.distance < ae.distance ? V : ae
      ).edge;
    }
    function ke(c, p) {
      const h = [...c.querySelectorAll(".dc-tab")], M = h.findIndex((A) => {
        const N = A.getBoundingClientRect();
        return p < N.left + N.width / 2;
      });
      return M === -1 ? h.length : M;
    }
    function x(c, p, h) {
      for (const { panels: M, element: A } of q().reverse()) {
        const N = A.getBoundingClientRect();
        if (c < N.left || c > N.right || p < N.top || p > N.bottom) continue;
        const ue = M.find((Z) => Z !== h), ae = A.querySelector(".dc-pane__tabs"), V = ae?.getBoundingClientRect();
        if (ae && V && p >= V.top && p <= V.bottom)
          return ue ? { panel: ue, edge: "center", index: ke(ae, c) } : null;
        const X = A.querySelector(":scope > .dc-pane__space");
        if (X) {
          const Z = X.getBoundingClientRect();
          if (c >= Z.left && c <= Z.right && p >= Z.top && p <= Z.bottom) continue;
        }
        return ue ? { panel: ue, edge: _e(N, c, p) } : null;
      }
      return G(c, p, h) ?? Ae(c, p);
    }
    function O() {
      const c = I.value;
      return c ? [...c.querySelectorAll(".dc-window__desktop")].filter((p) => p.closest(".dc-window") === c).reverse() : [];
    }
    function G(c, p, h) {
      const M = d.value;
      if (!M) return null;
      for (const A of O()) {
        const N = A.getBoundingClientRect();
        if (c < N.left || c > N.right || p < N.top || p > N.bottom) continue;
        const ue = Ve(A), ae = ue.flatMap((ie) => ie.panels).find((ie) => ie !== h);
        if (!ae && ue.length > 0) return null;
        const V = Me(M, h)?.rect, X = $n(
          {
            x: c - N.left - 24,
            y: p - N.top - 12,
            w: V?.w ?? ft.w,
            h: V?.h ?? ft.h
          },
          { w: A.clientWidth, h: A.clientHeight },
          s.minPanelSize
        );
        if (ae) return { panel: ae, edge: "float", rect: X };
        const Z = te(A);
        return Z ? { panel: "", space: Z, edge: "float", rect: X } : null;
      }
      return null;
    }
    function te(c) {
      const p = c.closest(".dc-space")?.getAttribute("data-dc-path");
      return p == null ? null : p === "" ? [] : p.split("/").map(Number);
    }
    function he() {
      const c = I.value;
      return c ? [...c.querySelectorAll(".dc-space")].filter((p) => p.closest(".dc-window") === c).filter((p) => !p.querySelector(".dc-pane")).reverse().flatMap((p) => {
        const h = te(p);
        return h ? [{ element: p, path: h }] : [];
      }) : [];
    }
    function Ae(c, p) {
      for (const { element: h, path: M } of he()) {
        if (h.dataset.dcSpace === "desktop") continue;
        const A = h.getBoundingClientRect();
        if (!(c < A.left || c > A.right || p < A.top || p > A.bottom))
          return { panel: "", space: M, edge: "center" };
      }
      return null;
    }
    function Ve(c) {
      return L().filter(
        (p) => p.element.closest(".dc-window__desktop") === c
      );
    }
    let qe = null;
    const We = (c) => c.altKey;
    function Ie(c, p) {
      if (!pe(c) || y.value || g.value || p.button !== 0) return;
      const h = p.clientX, M = p.clientY;
      let A = !1, N = We(p);
      const ue = () => {
        const de = $.value;
        de && (k.value = N ? G(de.x, de.y, c) : x(de.x, de.y, c));
      }, ae = (de) => {
        if (!A) {
          if (Math.hypot(de.clientX - h, de.clientY - M) < 4) return;
          A = !0, y.value = c, C.value = null;
        }
        N = We(de), b.value = !N, $.value = { x: de.clientX, y: de.clientY }, ue();
      }, V = (de) => {
        We(de) !== N && (N = !N, b.value = !N, A && ue());
      }, X = (de) => {
        qe?.();
        const J = k.value, Ee = d.value;
        if (de && A && J && Ee) {
          const nt = J.space ? Is(Ee, c, J.space, J.rect) : J.edge === "float" && J.rect ? Ds(Ee, c, J.panel, J.rect) : tn(Ee, c, J.panel, J.edge, J.index);
          Y(nt, {
            panel: c,
            target: J.panel,
            edge: J.edge,
            ...J.space === void 0 ? {} : { space: J.space },
            ...J.index === void 0 ? {} : { index: J.index },
            ...J.rect === void 0 ? {} : { rect: J.rect }
          });
        }
        y.value = null, k.value = null, $.value = null, b.value = !0;
      }, Z = () => X(!0), ie = () => X(!1), ge = (de) => {
        if (de.key === "Escape") {
          X(!1);
          return;
        }
        V(de);
      };
      qe = () => {
        window.removeEventListener("pointermove", ae), window.removeEventListener("pointerup", Z), window.removeEventListener("pointercancel", ie), window.removeEventListener("keydown", ge), window.removeEventListener("keyup", V), qe = null;
      }, window.addEventListener("pointermove", ae), window.addEventListener("pointerup", Z), window.addEventListener("pointercancel", ie), window.addEventListener("keydown", ge), window.addEventListener("keyup", V);
    }
    et(() => qe?.());
    let Oe = null;
    function F(c) {
      const p = I.value;
      return p ? [...p.querySelectorAll(
        `.dc-float[data-dc-path="${c.join("/")}"]`
      )].find((A) => A.closest(".dc-window") === p)?.parentElement ?? null : null;
    }
    function K(c) {
      const p = d.value;
      return p ? Fn(p, c) : null;
    }
    function W(c) {
      const p = d.value;
      if (!p) return;
      const h = Nt(p, c);
      h !== p && (l.value = h);
    }
    function ze(c) {
      const p = K(c);
      p && W(p);
    }
    function B(c) {
      const p = d.value, h = p ? Me(p, c) : null;
      return h !== null && st(h);
    }
    function H(c) {
      const p = d.value, h = p ? Me(p, c) : null;
      return h !== null && ut(h);
    }
    function se(c) {
      const p = d.value, h = p ? ct(p, c) : null;
      return h ? Pe(h.node) : "";
    }
    function Te(c) {
      const p = d.value, h = p ? ct(p, c) : null;
      if (!p || !h) return;
      const M = Pe(h.node);
      if (i.value.get(M)?.fixed === !0) return;
      const A = !ut(h);
      let N = mu(p, c, A);
      N !== p && (A || (N = Nt(N, c)), l.value = N, a("frame-minimize", { panel: M, minimized: A }));
    }
    function Se(c) {
      const p = K(c);
      p && Te(p);
    }
    function Pt(c) {
      const p = d.value, h = p ? ct(p, c) : null;
      if (!p || !h) return;
      const M = Pe(h.node);
      if (i.value.get(M)?.fixed === !0) return;
      const A = !st(h);
      let N = vu(p, c, A);
      N !== p && (A && (N = Nt(N, c)), l.value = N, a("frame-maximize", { panel: M, maximized: A }));
    }
    function ps(c) {
      const p = K(c);
      p && Pt(p);
    }
    function vs(c, p, h) {
      const M = d.value, A = M ? ct(M, c) : null;
      if (!M || !A || p.button !== 0 || y.value || g.value) return;
      const N = Pe(A.node);
      if (i.value.get(N)?.fixed === !0 || st(A) || ut(A) || (h === "move" ? !s.movable : !s.resizable)) return;
      const ue = F(c), ae = hu(M, c);
      W(c);
      const V = { w: ue?.clientWidth ?? 0, h: ue?.clientHeight ?? 0 }, X = { ...A.rect }, Z = p.clientX, ie = p.clientY, ge = s.minPanelSize;
      g.value = N;
      const de = (Le) => {
        const Ye = d.value;
        if (!Ye) return;
        const At = Ns(Ye, ae, $n(Le, V, ge));
        At !== Ye && (l.value = At);
      }, J = (Le) => {
        Le.preventDefault();
        const Ye = Le.clientX - Z, At = Le.clientY - ie;
        de(
          h === "move" ? { ...X, x: X.x + Ye, y: X.y + At } : Fs(X, h, Ye, At, ge)
        );
      }, Ee = (Le) => {
        if (Oe?.(), g.value = null, !Le) {
          de(X);
          return;
        }
        const Ye = d.value ? ct(d.value, ae) : null;
        Ye && a("frame-change", { panel: se(ae), rect: Ye.rect });
      }, nt = () => Ee(!0), ot = () => Ee(!1), it = (Le) => {
        Le.key === "Escape" && Ee(!1);
      };
      Oe = () => {
        window.removeEventListener("pointermove", J), window.removeEventListener("pointerup", nt), window.removeEventListener("pointercancel", ot), window.removeEventListener("keydown", it), Oe = null;
      }, window.addEventListener("pointermove", J), window.addEventListener("pointerup", nt), window.addEventListener("pointercancel", ot), window.addEventListener("keydown", it);
    }
    function ja(c, p, h) {
      const M = K(c);
      M && vs(M, p, h);
    }
    function Xa(c, p, h = !1) {
      const M = d.value, A = K(c), N = M && A ? ct(M, A) : null;
      if (!M || !A || !N || i.value.get(c)?.fixed === !0 || (h ? !s.resizable : !s.movable)) return;
      if (st(N) || ut(N)) {
        R.value = `${Ue(c)} is ${st(N) ? "maximized" : "minimized"}, so it cannot be moved.`;
        return;
      }
      const ue = p === "left" ? -nn : p === "right" ? nn : 0, ae = p === "up" ? -nn : p === "down" ? nn : 0, V = F(A), X = { w: V?.clientWidth ?? 0, h: V?.clientHeight ?? 0 }, Z = h ? Fs(N.rect, "se", ue, ae, s.minPanelSize) : { ...N.rect, x: N.rect.x + ue, y: N.rect.y + ae }, ie = Ns(M, A, $n(Z, X, s.minPanelSize));
      if (ie === M) {
        R.value = h ? `${Ue(c)} cannot be resized further.` : `${Ue(c)} cannot move ${p}.`;
        return;
      }
      l.value = ie;
      const ge = ct(ie, A);
      ge && (a("frame-change", { panel: c, rect: ge.rect }), R.value = h ? `${Ue(c)} resized to ${ge.rect.w} by ${ge.rect.h}.` : `${Ue(c)} moved to ${ge.rect.x}, ${ge.rect.y}.`);
    }
    et(() => Oe?.());
    function Ga(c, p) {
      const h = S(c), M = h?.element.getBoundingClientRect();
      if (!h || !M) return null;
      const A = p === "left" || p === "right", N = (V) => {
        if (!(A ? V.bottom > M.top + 1 && V.top < M.bottom - 1 : V.right > M.left + 1 && V.left < M.right - 1)) return null;
        const Z = p === "left" ? M.left - V.right : p === "right" ? V.left - M.right : p === "up" ? M.top - V.bottom : V.top - M.bottom;
        return Z < -1 ? null : Z;
      }, ue = [];
      for (const V of L()) {
        if (V === h || V.element === h.element) continue;
        const X = N(V.element.getBoundingClientRect());
        if (X === null) continue;
        const Z = V.panels.find((ie) => ie !== c);
        Z && ue.push({ to: { panel: Z }, distance: X });
      }
      for (const { element: V, path: X } of he()) {
        const Z = N(V.getBoundingClientRect());
        Z !== null && ue.push({ to: { space: X }, distance: Z });
      }
      return ue.reduce(
        (V, X) => V && V.distance <= X.distance ? V : X,
        null
      )?.to ?? null;
    }
    function Ya(c) {
      const p = d.value ? Me(d.value, c) !== null : !1;
      if (!p && !pe(c)) return;
      C.value = C.value === c ? null : c;
      const h = Ue(c);
      if (!C.value) {
        R.value = `${h}: move mode off.`;
        return;
      }
      R.value = p ? `${h}: move mode on. Arrow keys move the window, shift and an arrow resize it, Escape leaves move mode.` : `${h}: move mode on. Arrow keys move the panel, shift and an arrow make it a tab of the panel that way, Escape leaves move mode.`;
    }
    const Ue = (c) => i.value.get(c)?.title ?? c, Qa = {
      left: "left",
      right: "right",
      up: "top",
      down: "bottom"
    };
    function Za(c, p, h = !1) {
      if (!pe(c)) return;
      const M = d.value;
      if (!M) return;
      const A = Ue(c), N = wt(M, c);
      if (!h && N && (p === "left" || p === "right") && N.panels.length > 1) {
        const ie = N.panels.indexOf(c), ge = p === "left" ? ie - 1 : ie + 1;
        if (ge >= 0 && ge < N.panels.length) {
          Y(Dt(M, c, ge), { panel: c, target: c, edge: "center", index: ge }), R.value = `${A} moved ${p}, now tab ${ge + 1} of ${N.panels.length}.`, _n(c);
          return;
        }
      }
      const ae = Ga(c, p);
      if (!ae || ae.panel !== void 0 && !pe(ae.panel)) {
        R.value = `${A} cannot move ${p}.`;
        return;
      }
      const V = Qa[p];
      if (ae.space) {
        const ie = ae.space, ge = lt(M, ie), de = Me(M, c)?.rect, J = { ...ft, ...de ? { w: de.w, h: de.h } : {} };
        Y(Is(M, c, ie, J), { panel: c, target: "", space: ie, edge: V }), R.value = `${A} moved ${p}, into ${ge ? Ct(ge) : "the space"}.`, _n(c);
        return;
      }
      const X = ae.panel, Z = N?.panels.length === 1 && wt(M, X)?.panels.length === 1;
      h ? (Y(tn(M, c, X, "center"), {
        panel: c,
        target: X,
        edge: "center"
      }), R.value = `${A} joined ${Ue(X)} as a tab.`) : Z ? (Y(on(M, c, X), { panel: c, target: X, edge: V }), R.value = `${A} moved ${p}, trading places with ${Ue(X)}.`) : (Y(tn(M, c, X, V), { panel: c, target: X, edge: V }), R.value = `${A} moved ${p}, beside ${Ue(X)}.`), _n(c);
    }
    function _n(c) {
      Bt(() => {
        S(c)?.element.querySelector(".dc-pane__grip")?.focus();
      });
    }
    function Ja(c, p) {
      const h = d.value;
      h && (l.value = cn(h, c, p));
    }
    function gn(c) {
      const p = d.value;
      if (!p) return;
      const h = bt(p, c);
      h !== p && (l.value = h, a("tab-select", { panel: c }));
    }
    function ms(c) {
      return i.value.get(c)?.closable ?? s.closable;
    }
    function el(c) {
      ms(c) && a("panel-close", c);
    }
    const yn = U(/* @__PURE__ */ new Map());
    let tl = 0;
    function nl(c, p) {
      const h = tl += 1;
      return yn.value.set(h, { panel: c, items: p }), () => {
        yn.value.delete(h);
      };
    }
    function sl(c) {
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
    function al(c, p) {
      const h = p.id, M = wt(c, h), A = (M?.panels.length ?? 0) > 1, N = M?.fixedView === !0, ue = (Z) => ({
        action: () => {
          Z !== c && (l.value = Z);
        }
      }), ae = [], V = [], X = p.views ?? [];
      if (X.length > 1 && !N) {
        const Z = P(h);
        ae.push({
          id: "view",
          label: "View",
          items: X.map((ie) => ({
            id: `view-${ie.key}`,
            label: ie.label,
            checked: ie.key === Z,
            action: () => ne(h, ie.key)
          }))
        });
      }
      return A && !N && V.push(
        { id: "show-row", label: "Row", checked: !1, ...ue(Os(c, h, "row")) },
        {
          id: "show-column",
          label: "Column",
          checked: !1,
          ...ue(Os(c, h, "column"))
        },
        // Already true, and nothing to collapse: these panes are tabs. Ticked
        // and choosable all the same — collapsing a strip into a strip hands
        // back the tree it was given, so it is the no-op it looks like.
        {
          id: "show-tabs",
          label: "Tabs",
          checked: !0,
          ...ue(wu(c, h))
        },
        {
          id: "show-desktop",
          label: "Desktop",
          checked: !1,
          ...ue(ku(c, h))
        }
      ), A && M && (V.length && V.push({ separator: !0 }), V.push(...gs(M, h))), { panel: ae, tabs: V, tabsTitle: M ? _s(M) : "" };
    }
    function gs(c, p) {
      const h = ht(c), M = (A) => {
        const N = c.panels[(h + A + c.panels.length) % c.panels.length];
        return (N === void 0 ? "" : Pe(N)) || p;
      };
      return [
        { id: "next-tab", label: "Next tab", action: () => gn(M(1)) },
        { id: "previous-tab", label: "Previous tab", action: () => gn(M(-1)) }
      ];
    }
    function Jt(c) {
      return c.title ? c.title : j(c) ? c.panels.length > 1 ? "these tabs" : "the strip" : Ct(c);
    }
    function ys(c) {
      if (!c || ee(c) || c.fixedView === !0 || !c.title && c.headless !== !0 || Ke(c)) return null;
      const p = Ua(c);
      return p && p.fixedView !== !0 ? p : null;
    }
    function ll(c) {
      const p = d.value;
      if (!s.menu || !p) return [];
      const h = lt(p, c);
      if (!h || j(h)) return [];
      if (h.fixedView) return [];
      const M = ee(h) ? "desktop" : h.direction, A = (J, Ee, nt) => ({
        id: `show-${J}`,
        label: Ee,
        checked: M === J,
        action: () => {
          const ot = d.value, it = nt();
          !ot || it === h || (l.value = vn(xe(vt(ot, c, it))));
        }
      }), N = () => {
        const J = Ka(h, rl(h));
        if (j(J) && J.panels.length === 0) return h;
        const Ee = j(J) && J.panels.length === 1 ? J.panels[0] : void 0;
        return Ee !== void 0 && me(Ee) ? h : J;
      }, ue = (J) => () => ee(h) ? Wa(h, J) : h.direction === J ? h : { ...h, direction: J }, ae = c.slice(0, -1), V = c.length > 0 ? lt(p, ae) : null, X = V && j(V) && V.panels.length > 1 ? V : null, Z = V && ys(V) === h ? V : null, ie = ys(h), ge = h.title || "this space", de = (J, Ee, nt, ot, it) => ({
        id: J,
        label: it,
        action: () => {
          const Le = d.value;
          Le && (l.value = vn(xe(vt(Le, Ee, xu(nt, ot)))));
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
            A("row", "Row", ue("row")),
            A("column", "Column", ue("column")),
            // Everything in this space in one strip: the panes as tabs, and a
            // desktop among them as a tab of its own, keeping the windows on it.
            A("tabs", "Tabs", () => N()),
            A("desktop", "Desktop", () => ee(h) ? h : qa(h))
          ]
        },
        {
          id: "about-around",
          title: ie ? `Around ${Jt(ie)}` : "",
          items: ie ? [
            // Keeping this space's bar drops the one inside, so it is offered
            // only where the space inside has no name to be dropped with it.
            ...ie.title ? [] : [de("merge-around-keep-this", c, h, "outer", `Keep ${ge}`)],
            ...h.title ? [] : [de("merge-around-keep-that", c, h, "inner", `Keep ${Jt(ie)}`)]
          ] : []
        },
        {
          id: "about-inside",
          title: Z ? `Inside ${Jt(Z)}` : "",
          items: Z ? [
            ...h.title ? [] : [de("merge-inside-keep-that", ae, Z, "outer", `Keep ${Jt(Z)}`)],
            ...Z.title ? [] : [de("merge-inside-keep-this", ae, Z, "inner", `Keep ${ge}`)]
          ] : []
        },
        {
          id: "about-tabs",
          title: X ? _s(X) : "",
          items: X ? gs(X, Pe(h)) : []
        }
      ]);
    }
    function rl(c) {
      const p = _.value;
      return p && oe(c, p) ? p : void 0;
    }
    function ol(c) {
      const p = d.value, h = i.value.get(c);
      if (!p || !h) return [];
      const M = s.menu ? al(p, h) : null, A = sl(c);
      A.length && M?.panel.length && A.push({ separator: !0 }), M && A.push(...M.panel);
      const N = hs([
        { id: "about-panel", title: h.title, items: A },
        { id: "about-tabs", title: M?.tabsTitle ?? "", items: M?.tabs ?? [] }
      ]);
      return s.paneMenu ? s.paneMenu(h, N) : N;
    }
    function il(c, p) {
      return o[`${c}-${p}`] ?? o[c];
    }
    function ws(c, p, h, M) {
      return il(c, p.id)?.({ panel: p, view: h, active: M });
    }
    Su({
      panelFor: (c) => i.value.get(c) ?? null,
      viewFor: P,
      setView: ne,
      movable: v(() => s.movable),
      resizable: v(() => s.resizable),
      minPanelSize: v(() => s.minPanelSize),
      spaceNames: v(() => s.spaceNames),
      focused: _,
      dragging: y,
      dropTarget: k,
      moving: C,
      framing: g,
      canMove: pe,
      focus(c) {
        _.value !== c && (_.value = c, a("panel-activate", c));
      },
      selectPanel: gn,
      beginDrag: Ie,
      toggleMoveMode: Ya,
      nudge: Za,
      setSizes: Ja,
      frameOf: (c) => d.value ? Me(d.value, c) : null,
      beginFrameDrag: ja,
      nudgeFrame: Xa,
      raise: ze,
      maximized: B,
      toggleMaximize: ps,
      minimized: H,
      toggleMinimize: Se,
      beginFrameDragAt: vs,
      raiseAt: W,
      toggleMaximizeAt: Pt,
      toggleMinimizeAt: Te,
      menuFor: ol,
      spaceMenu: ll,
      registerMenu: nl,
      closable: ms,
      close: el,
      renderContent: (c, p, h) => ws("panel", c, p, h),
      renderActions: (c, p, h) => ws("actions", c, p, h),
      layout: d
    });
    const cl = v(() => {
      if (!(!s.accent && !s.tokens))
        return { ...s.tokens, ...s.accent ? { "--dc-accent": s.accent } : {} };
    }), ul = () => {
      const c = y.value, p = $.value;
      return !c || !p ? null : ml(
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
        const A = d.value;
        A && Y(tn(A, c, p, h, M), {
          panel: c,
          target: p,
          edge: h,
          ...M === void 0 ? {} : { index: M }
        });
      },
      /** Brings a panel's tab to the top of its group. */
      select(c) {
        const p = d.value;
        p && (l.value = bt(p, c));
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
        const A = Me(M, c);
        A && a("frame-change", { panel: c, rect: A.rect });
      },
      /**
       * Puts a panel on one of its views, the way its menu would — the way a pane
       * whose space fixed its view, or took its bar away, is switched at all.
       */
      setView: ne,
      /** Brings a floating frame to the front of its stack. */
      raise: ze,
      /** Fills the float with a window, or puts it back where it was. */
      toggleMaximize: ps,
      /** Rolls a window up to its title bar, or unrolls it. */
      toggleMinimize: Se
    }), (c, p) => (f(), m("div", {
      ref_key: "root",
      ref: I,
      class: "dc-shell dc-window",
      "data-dc-theme": e.theme,
      "data-dc-dragging": y.value ? "true" : "false",
      "data-dc-docking": b.value ? "true" : "false",
      style: Re(cl.value)
    }, [
      d.value ? (f(), le(wd, {
        key: 0,
        node: d.value,
        path: []
      }, null, 8, ["node"])) : (f(), m("p", bd, " This window has no panels. ")),
      ye(ul),
      w("p", $d, z(R.value), 1)
    ], 12, kd));
  }
}), Cd = /* @__PURE__ */ ve(xd, [["__scopeId", "data-v-711565af"]]);
function Hd(e = "", t = "/") {
  const n = U(Ze(e)), s = U(t), a = [`${s.value}${n.value}`];
  return {
    search: n,
    path: s,
    history: a,
    push(l) {
      n.value = Ze(l), a.push(`${s.value}${n.value}`);
    },
    replace(l) {
      n.value = Ze(l), a[a.length - 1] = `${s.value}${n.value}`;
    }
  };
}
function Vs(e) {
  const t = e.indexOf("?");
  if (t === -1) return "";
  const n = e.slice(t), s = n.indexOf("#");
  return Ze(s === -1 ? n : n.slice(0, s));
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
    push: (a) => e.push(`${n.value}${Ze(a)}`),
    replace: (a) => e.replace(`${n.value}${Ze(a)}`),
    dispose: s
  };
}
const Md = {
  DataShell: Rc,
  ShellHeader: _a,
  QueryPanel: ya,
  RecordActions: wa,
  ResultsArea: Ea,
  FacetControl: ga,
  SegmentedControl: Uc,
  StatusPill: Ht,
  WindowFrame: Cd,
  WindowPane: Ha,
  ListView: zn,
  CardsView: ba,
  GridView: $a,
  TableView: Ma,
  LinksView: xa,
  PreviewView: Ca,
  TypeCardsView: Sa
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
  ba as CardsView,
  Rs as ColumnCell,
  ft as DEFAULT_FRAME,
  Sn as DEFAULT_SORT,
  _l as DEFAULT_VIEW,
  Rc as DataShell,
  En as EMPTY_CELL,
  pa as ENTITY_ALL,
  fn as ENTITY_TERM,
  Vt as EXPRESSION_TERM,
  Yn as FACET_PREFIX,
  ga as FacetControl,
  $a as GridView,
  Xd as HeaderContentLayoutPlugin,
  xa as LinksView,
  zn as ListView,
  gt as MINIMIZED_GAP,
  za as MINIMIZED_HEIGHT,
  Tn as MINIMIZED_WIDTH,
  Aa as MIN_FRAME,
  As as MOCK_TINTS,
  Ld as MenuBar,
  es as MenuButton,
  Pa as MenuList,
  jt as MetricDrill,
  fs as PANE_CONTEXT_KEY,
  jn as PARAM_DIR,
  Wn as PARAM_ENTITY,
  Xn as PARAM_EXPR,
  Gn as PARAM_PAGE,
  Hn as PARAM_SORT,
  Un as PARAM_VIEW,
  Zn as PinStar,
  Ca as PreviewView,
  ya as QueryPanel,
  en as RECORD_STATUSES,
  ta as RESULT_FIELDS,
  Hs as ROUTE_ADAPTER_KEY,
  wa as RecordActions,
  Ea as ResultsArea,
  fa as SHELL_CONTEXT_KEY,
  Ed as SHELL_THEMES,
  Xt as ScopeMark,
  Uc as SegmentedControl,
  St as SelectTick,
  Rd as ShellCard,
  _a as ShellHeader,
  Ht as StatusPill,
  Ma as TableView,
  Sa as TypeCardsView,
  js as VIEW_KINDS,
  gl as VIEW_LABELS,
  us as WINDOW_CONTEXT_KEY,
  Cd as WindowFrame,
  Ha as WindowPane,
  Ra as activePanel,
  ht as activeTab,
  ua as addTerm,
  oa as andExpression,
  cu as axisOf,
  ss as cascade,
  aa as cellFull,
  Wt as cellText,
  ln as cellTextOf,
  De as cellValue,
  ks as changesResults,
  $n as clampRect,
  Ka as collapseSpace,
  wu as collapseToTabs,
  Nd as column,
  $s as columnAlign,
  xs as columnClass,
  bs as columnKey,
  Pn as columnTruncates,
  xl as columnsFor,
  wl as countPages,
  hl as createHistoryAdapter,
  Hd as createMemoryAdapter,
  Yl as createMockDataSource,
  jd as createVueRouterAdapter,
  Sl as defaultCellText,
  Ks as defaultLayout,
  Vn as defaultQuery,
  Jl as drillExpression,
  Is as dropIntoSpace,
  Kt as emptyFacetState,
  On as emptyFacetValue,
  Zl as excludingTerm,
  yt as findEntity,
  at as findSort,
  Id as fixedView,
  ns as float,
  Ds as floatPanel,
  qa as floatSplit,
  ku as floatTabs,
  an as fnv1a,
  Ys as focusEntity,
  _t as formatCount,
  bl as formatDate,
  Lt as formatExpression,
  kl as formatMetric,
  $l as formatOrdinal,
  Ut as formatTerm,
  mn as frame,
  ct as frameAt,
  Me as frameOf,
  Fn as framePathOf,
  Pe as frontPanel,
  jl as generateRows,
  Fd as group,
  wt as groupOf,
  uu as groups,
  ea as hasActiveFacets,
  oe as hasPanel,
  Dd as headless,
  Tt as insertPanel,
  Ft as isChoosable,
  zd as isEntityScoped,
  Js as isFacetActive,
  ee as isFloat,
  j as isGroup,
  st as isMaximized,
  ut as isMinimized,
  me as isPanelTab,
  Bn as isPristineQuery,
  Et as isSplit,
  Ne as isTabOf,
  Kn as isTypeCardsQuery,
  Xs as isViewKind,
  Ss as joinExpression,
  Dl as matchesExpression,
  Xl as matchesFacets,
  fu as maximizeFrame,
  vu as maximizeFrameAt,
  xu as mergeSpace,
  pu as minimizeFrame,
  mu as minimizeFrameAt,
  tn as movePanel,
  Dt as moveTab,
  Td as negateTerm,
  lt as nodeAt,
  It as nodeTitle,
  xe as normalizeLayout,
  Ze as normalizeSearch,
  is as normalizeSizes,
  Ua as onlySpace,
  Ps as oppositeTerm,
  tt as panelIds,
  Xe as panelNode,
  Ls as panelTabs,
  rt as parseExpression,
  rr as parseQuery,
  Mo as presentParts,
  ka as presentRow,
  Ge as pressOptions,
  Uu as providePaneContext,
  er as provideShellContext,
  Su as provideWindowContext,
  xn as raiseFrame,
  Nt as raiseFrameAt,
  hu as raisedPath,
  na as reconcileFacets,
  Mu as reconcileLayout,
  ca as recordTerm,
  pt as removePanel,
  vt as replaceAt,
  Fs as resizeRect,
  Bs as resizeSplit,
  Gs as resolveView,
  Be as roleColumn,
  sa as roleColumns,
  vn as rootSpace,
  ls as row,
  Ml as rowKey,
  la as sameTerm,
  Ql as scopeTerm,
  qn as scopeTermFor,
  da as scopedEntity,
  Ts as serializeQuery,
  bt as setActivePanel,
  du as setFrameRect,
  Ns as setFrameRectAt,
  cn as setSizesAt,
  Kd as setSplitDirection,
  Je as sizesOf,
  Zs as sortsFor,
  we as spaceChrome,
  Ct as spaceTitle,
  as as split,
  Ol as splitExpression,
  Os as spreadTabs,
  ir as summarizeQuery,
  Qn as summaryTerms,
  on as swapPanels,
  ts as tabNode,
  Yt as tabPanels,
  Wa as tileFloat,
  Vd as toFloat,
  qd as toTiled,
  Od as toggleMaximized,
  Bd as toggleMinimized,
  Ii as useColumns,
  ec as useEntityPreviews,
  Wd as usePaneContext,
  Ud as usePaneMenu,
  Mt as usePresentedRows,
  cr as useQueryState,
  pr as useRecordNames,
  ur as useResults,
  Ce as useShellContext,
  ds as useWindowContext,
  Il as withoutTerm
};
